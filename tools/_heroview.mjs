// 离线全角色渲染：直接调用游戏里的 bNw / bNm / bNm2 拿到「成品几何 + 骨架 + 姿态函数」，
// 在 Node 里跑 FK + 蒙皮 + 软光栅，用顶点色上色。用来快速迭代握斧/握剑姿势，不用起浏览器。
//
// 用法:
//   node tools/_heroview.mjs --hero=nw --anim=idle --t=0 --view=front,side,q34 --zoom=0.6 --out=grip
//   --hero nw|nm|nm2   --anim idle|walk|run|attack|cast_s1|...   --t 秒   --pose=k:v,k:v (额外 add 角度)
//   --view front|side|back|q34|top      --zoom 视野半高(米)      --look x,y,z 注视点
//   --lines 画出柄轴/手部局部轴          --mark 标出虎口两点
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
await import('./_stub.mjs');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(root, '.herocheck');
const argv = process.argv.slice(2);
const arg = (k, d) => { const a = argv.find((x) => x.startsWith(k + '=')); return a ? a.slice(k.length + 1) : d; };
const flag = (k) => argv.includes('--' + k);
const HERO = arg('--hero', 'nw');
const NAME = arg('--out', 'heroview');
const ANIM = arg('--anim', 'idle');
const TIME = Number(arg('--t', '0'));
const VIEWS = arg('--view', 'front,side,q34').split(',');
const EXTRA = arg('--pose', '');

const core = await import('../src/26-core-5.js');
const build = { nw: core.bNw, nm: core.bNm, nm2: core.bNm2 }[HERO];
if (!build) throw new Error('未知 hero: ' + HERO);
const H = build();
const G = H.geometry;
const R = H.rig;
const N = R.count;
const J = (k) => R.names.indexOf(k);

// ---------- 小工具 ----------
const CH = Math.PI / 180;
const qMul = (a, b) => [a[3]*b[0]+a[0]*b[3]+a[1]*b[2]-a[2]*b[1], a[3]*b[1]-a[0]*b[2]+a[1]*b[3]+a[2]*b[0], a[3]*b[2]+a[0]*b[1]-a[1]*b[0]+a[2]*b[3], a[3]*b[3]-a[0]*b[0]-a[1]*b[1]-a[2]*b[2]];
const qConj = (q) => [-q[0], -q[1], -q[2], q[3]];
const qRot = (q, v) => { const [x, y, z, w] = q; const t = [2*(y*v[2]-z*v[1]), 2*(z*v[0]-x*v[2]), 2*(x*v[1]-y*v[0])];
  return [v[0]+w*t[0]+(y*t[2]-z*t[1]), v[1]+w*t[1]+(z*t[0]-x*t[2]), v[2]+w*t[2]+(x*t[1]-y*t[0])]; };
const sub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]];
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const norm=(a)=>{const l=Math.hypot(...a)||1;return [a[0]/l,a[1]/l,a[2]/l];};

// ---------- pose（与引擎 bU 的输入同构）----------
class Pose {
  constructor(n) { this.n = n; this.q = new Float32Array(n*4); this.t = new Float32Array(n*3); this.s = new Float32Array(n); this.reset(); }
  reset() { this.q.fill(0); this.t.fill(0); this.s.fill(1); for (let i=0;i<this.n;i++) this.q[i*4+3]=1; return this; }
  add(j, dx, dy, dz) { this.q.set(qMul([this.q[j*4],this.q[j*4+1],this.q[j*4+2],this.q[j*4+3]], eulerQ(dx||0,dy||0,dz||0)), j*4); return this; }
  rot(j, dx, dy, dz) { this.q.set(eulerQ(dx||0,dy||0,dz||0), j*4); return this; }
  pos(j, x, y, z) { this.t[j*3]=x; this.t[j*3+1]=y; this.t[j*3+2]=z; return this; }
  move(j, x, y, z) { this.t[j*3]+=x; this.t[j*3+1]+=y; this.t[j*3+2]+=z; return this; }
  scale(j, v) { this.s[j]=v; return this; }
  copy(o) { this.q.set(o.q); this.t.set(o.t); this.s.set(o.s); return this; }
  blendFrom() { return this; }
}
function eulerQ(dx, dy, dz) {
  const a=dx*CH*0.5, o=dy*CH*0.5, r=dz*CH*0.5;
  const l=Math.cos(a), c=Math.cos(o), f=Math.cos(r);
  const d=Math.sin(a), h=Math.sin(o), u=Math.sin(r);
  return [d*c*f+l*h*u, l*h*f-d*c*u, l*c*u-d*h*f, l*c*f+d*h*u];
}

const pose = new Pose(N);
const P = {}; // props
const I = { anim: ANIM, t: TIME, time: TIME, p: 0, move: 0 };
H.animate(pose, I, P);
if (EXTRA) for (const part of EXTRA.split(',')) {
  const [k, v] = part.split(':');
  const j = J(k); if (j < 0) { console.warn('跳过未知骨骼', k); continue; }
  const [dx, dy, dz] = v.split('/').map(Number);
  pose.add(j, dx || 0, dy || 0, dz || 0);
}

// ---------- FK ----------
const wp = new Float32Array(N*3), wq = new Float32Array(N*4), ws = new Float32Array(N);
for (let i = 0; i < N; i++) {
  const p = R.parent[i];
  const lp = [R.local[i*3] + pose.t[i*3], R.local[i*3+1] + pose.t[i*3+1], R.local[i*3+2] + pose.t[i*3+2]];
  const lq = [pose.q[i*4], pose.q[i*4+1], pose.q[i*4+2], pose.q[i*4+3]];
  if (p < 0) { wp.set(lp, i*3); wq.set(lq, i*4); ws[i] = pose.s[i]; }
  else {
    const r = qRot([wq[p*4],wq[p*4+1],wq[p*4+2],wq[p*4+3]], lp.map((v)=>v*ws[p]));
    wp[i*3] = wp[p*3] + r[0]; wp[i*3+1] = wp[p*3+1] + r[1]; wp[i*3+2] = wp[p*3+2] + r[2];
    wq.set(qMul([wq[p*4],wq[p*4+1],wq[p*4+2],wq[p*4+3]], lq), i*4);
    ws[i] = ws[p] * pose.s[i];
  }
}
// 蒙皮用的每骨 (q, t)
const sq = [], st = [];
for (let i = 0; i < N; i++) {
  const bq = [R.bindQW[i*4], R.bindQW[i*4+1], R.bindQW[i*4+2], R.bindQW[i*4+3]];
  const bw = [R.bindWorld[i*3], R.bindWorld[i*3+1], R.bindWorld[i*3+2]];
  const q = qMul([wq[i*4],wq[i*4+1],wq[i*4+2],wq[i*4+3]], qConj(bq));
  const r = qRot(q, bw);
  sq.push(q); st.push([wp[i*3]-r[0], wp[i*3+1]-r[1], wp[i*3+2]-r[2]]);
}
const pos = G.attributes.position.array, col = G.attributes.color.array, skin = G.attributes.aSkin.array;
const NV = G.attributes.position.count;
const SP = new Float32Array(NV*3);
for (let i = 0; i < NV; i++) {
  const b0 = skin[i*3] | 0, b1 = skin[i*3+1] | 0, w = skin[i*3+2];
  const v = [pos[i*3], pos[i*3+1], pos[i*3+2]];
  const r0 = qRot(sq[b0], v), p0 = [st[b0][0]+r0[0], st[b0][1]+r0[1], st[b0][2]+r0[2]];
  if (w > 0.999) { SP[i*3]=p0[0]; SP[i*3+1]=p0[1]; SP[i*3+2]=p0[2]; continue; }
  const r1 = qRot(sq[b1], v), p1 = [st[b1][0]+r1[0], st[b1][1]+r1[1], st[b1][2]+r1[2]];
  SP[i*3] = p1[0] + (p0[0]-p1[0])*w; SP[i*3+1] = p1[1] + (p0[1]-p1[1])*w; SP[i*3+2] = p1[2] + (p0[2]-p1[2])*w;
}
// 法线也用同一变换（粗略：用顶点法线跟主骨骼旋转）
const idx = G.index.array;

// ---------- PNG ----------
const crcT=(()=>{const t=new Int32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;t[n]=c;}return t;})();
const crc=(b)=>{let c=-1;for(let i=0;i<b.length;i++)c=crcT[(c^b[i])&0xff]^(c>>>8);return (c^-1)>>>0;};
function png(w,h,rgb){const raw=Buffer.alloc((w*3+1)*h);
  for(let y=0;y<h;y++){raw[y*(w*3+1)]=0;rgb.copy(raw,y*(w*3+1)+1,y*w*3,(y+1)*w*3);}
  const chunk=(t,d)=>{const len=Buffer.alloc(4);len.writeUInt32BE(d.length);
    const td=Buffer.concat([Buffer.from(t,'ascii'),d]);const c=Buffer.alloc(4);c.writeUInt32BE(crc(td));return Buffer.concat([len,td,c]);};
  const ih=Buffer.alloc(13);ih.writeUInt32BE(w,0);ih.writeUInt32BE(h,4);ih[8]=8;ih[9]=2;
  return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',ih),chunk('IDAT',zlib.deflateSync(raw,{level:9})),chunk('IEND',Buffer.alloc(0))]);}

// ---------- 视图 ----------
const TILE = 620;
const HALF = Number(arg('--zoom', '1.35'));
const lookArg = arg('--look', '').split(',').map(Number);
let C = lookArg.length === 3 && lookArg.every((v)=>!isNaN(v)) ? lookArg : null;
if (!C) { // 自动：取角色包围盒中心
  let lo=[1e9,1e9,1e9], hi=[-1e9,-1e9,-1e9];
  for(let i=0;i<NV;i++) for(let k=0;k<3;k++){ const v=SP[i*3+k]; if(v<lo[k])lo[k]=v; if(v>hi[k])hi[k]=v; }
  C = [0,1,2].map(k=>(lo[k]+hi[k])/2);
  if (!lookArg.length) C[1] = 1.05;
}
const VIEWDEF = {
  front: [[0,0,1],[0,1,0]], back: [[0,0,-1],[0,1,0]],
  side:  [[1,0,0],[0,1,0]], right: [[-1,0,0],[0,1,0]],
  q34:   [[0.72,0.16,0.68],[0,1,0]], q34b: [[-0.72,0.16,0.68],[0,1,0]],
  top:   [[0,1,0.001],[0,0,-1]],
};
const scale = (TILE/2)/HALF;
let zbuf=null;
function render(f, up) {
  const r = norm(cross(f, up)), u = norm(cross(r, f));
  const buf = Buffer.alloc(TILE*TILE*3);
  for (let i=0;i<buf.length;i+=3){ buf[i]=18; buf[i+1]=22; buf[i+2]=32; }
  const zb = new Float32Array(TILE*TILE).fill(Infinity);
  const light = norm([-0.45, -0.72, 0.62]);
  const pr = (i) => { const d=[SP[i*3]-C[0],SP[i*3+1]-C[1],SP[i*3+2]-C[2]];
    return [TILE/2+dot(d,r)*scale, TILE/2-dot(d,u)*scale, dot(d,f)]; };
  for (let t=0;t<idx.length;t+=3){
    const ia=idx[t],ib=idx[t+1],ic=idx[t+2];
    const A=pr(ia),B=pr(ib),Cc=pr(ic);
    if ((A[0]<-40&&B[0]<-40&&Cc[0]<-40)||(A[0]>TILE+40&&B[0]>TILE+40&&Cc[0]>TILE+40)) continue;
    if ((A[1]<-40&&B[1]<-40&&Cc[1]<-40)||(A[1]>TILE+40&&B[1]>TILE+40&&Cc[1]>TILE+40)) continue;
    const area=(B[0]-A[0])*(Cc[1]-A[1])-(Cc[0]-A[0])*(B[1]-A[1]);
    if (Math.abs(area)<1e-9) continue;
    const pa=[SP[ia*3],SP[ia*3+1],SP[ia*3+2]],pb=[SP[ib*3],SP[ib*3+1],SP[ib*3+2]],pc=[SP[ic*3],SP[ic*3+1],SP[ic*3+2]];
    let n = norm(cross(sub(pb,pa),sub(pc,pa)));
    if (dot(n,f) > 0) n = [-n[0],-n[1],-n[2]];
    const lam = 0.34 + 0.78*Math.max(0, dot(n, light));
    const cr = (col[ia*3]+col[ib*3]+col[ic*3])/3*255;
    const cg = (col[ia*3+1]+col[ib*3+1]+col[ic*3+1])/3*255;
    const cb = (col[ia*3+2]+col[ib*3+2]+col[ic*3+2])/3*255;
    const cc=[Math.min(255,cr*lam)|0, Math.min(255,cg*lam)|0, Math.min(255,cb*lam)|0];
    const minx=Math.max(0,Math.floor(Math.min(A[0],B[0],Cc[0]))), maxx=Math.min(TILE-1,Math.ceil(Math.max(A[0],B[0],Cc[0])));
    const miny=Math.max(0,Math.floor(Math.min(A[1],B[1],Cc[1]))), maxy=Math.min(TILE-1,Math.ceil(Math.max(A[1],B[1],Cc[1])));
    for (let y=miny;y<=maxy;y++) for (let x=minx;x<=maxx;x++){
      const px=x+0.5, py=y+0.5;
      const w0=((B[0]-A[0])*(py-A[1])-(px-A[0])*(B[1]-A[1]))/area;
      const w1=((px-A[0])*(Cc[1]-A[1])-(Cc[0]-A[0])*(py-A[1]))/area;
      const w2=1-w0-w1;
      if (w0<0||w1<0||w2<0) continue;
      const z=A[2]*w2+B[2]*w1+Cc[2]*w0;
      const o=y*TILE+x;
      if (z>=zb[o]) continue;
      zb[o]=z; buf[o*3]=cc[0]; buf[o*3+1]=cc[1]; buf[o*3+2]=cc[2];
    }
  }
  return { buf, pr, zb };
}
function line(buf, pr, a, b, rgb, thick=1){
  const N2 = Math.max(2, Math.ceil(Math.hypot(...sub(a,b))*scale*2));
  for (let i=0;i<=N2;i++){
    const t=i/N2;
    const p=[a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t, a[2]+(b[2]-a[2])*t];
    const q=pr ? null : null;
    void q;
    const d=[p[0]-C[0],p[1]-C[1],p[2]-C[2]];
    // 用 render 返回的投影（pr 接受顶点索引，这里另算）
    const sx = prX(p), sy = prY(p), sz = prZ(p);
    for (let dy=-thick;dy<=thick;dy++) for (let dx=-thick;dx<=thick;dx++){
      const px=Math.round(sx)+dx, py=Math.round(sy)+dy;
      if (px<0||py<0||px>=TILE||py>=TILE) continue;
      if (sz > zbuf[py*TILE+px] + 0.004) continue;
      const o=(py*TILE+px)*3; buf[o]=rgb[0]; buf[o+1]=rgb[1]; buf[o+2]=rgb[2];
    }
  }
}
let prX=()=>0, prY=()=>0, prZ=()=>0, camR=[1,0,0], camU=[0,1,0], camF=[0,0,1];
function setupCam(f, up){
  camR = norm(cross(f, up)); camU = norm(cross(camR, f)); camF = f;
  prX = (p)=> TILE/2 + dot([p[0]-C[0],p[1]-C[1],p[2]-C[2]], camR)*scale;
  prY = (p)=> TILE/2 - dot([p[0]-C[0],p[1]-C[1],p[2]-C[2]], camU)*scale;
  prZ = (p)=> dot([p[0]-C[0],p[1]-C[1],p[2]-C[2]], camF);
}

const COLS = Math.min(3, VIEWS.length), ROWS = Math.ceil(VIEWS.length/COLS), PAD = 5;
const SW = COLS*TILE + (COLS+1)*PAD, SH = ROWS*TILE + (ROWS+1)*PAD;
const sheet = Buffer.alloc(SW*SH*3, 0);
for (let i=0;i<sheet.length;i+=3){ sheet[i]=6; sheet[i+1]=8; sheet[i+2]=12; }

// 标线：柄轴 / 手部局部轴
const handJ = J('R_Hand');
const HW = [wp[handJ*3], wp[handJ*3+1], wp[handJ*3+2]];
const HWQ = [wq[handJ*4], wq[handJ*4+1], wq[handJ*4+2], wq[handJ*4+3]];
const hax = [0,1,2].map((k)=>qRot(HWQ, [k===0?1:0, k===1?1:0, k===2?1:0]));
const grip = globalThis.__GRIP__ || null; // 由调用方注入的两点（世界坐标）

VIEWS.forEach((v, k) => {
  const [f, up] = VIEWDEF[v] || VIEWDEF.front;
  setupCam(f, up);
  const { buf, zb } = render(f, up);
  zbuf = zb;
  if (flag('lines')) {
    line(buf, null, HW, [0,1,2].map((i)=>HW[i]+hax[0][i]*0.25), [255,70,70], 1);
    line(buf, null, HW, [0,1,2].map((i)=>HW[i]+hax[1][i]*0.25), [80,255,120], 1);
    line(buf, null, HW, [0,1,2].map((i)=>HW[i]+hax[2][i]*0.25), [90,150,255], 1);
  }
  if (flag('mark') && grip) {
    line(buf, null, grip[0], grip[1], [255,255,255], 2);
    for (const p of grip) {
      const sx=prX(p), sy=prY(p);
      for (let dy=-6;dy<=6;dy++) for (let dx=-6;dx<=6;dx++){
        if (dx*dx+dy*dy>36) continue;
        const px=Math.round(sx)+dx, py=Math.round(sy)+dy;
        if (px<0||py<0||px>=TILE||py>=TILE) continue;
        const o=(py*TILE+px)*3; buf[o]=255; buf[o+1]=40; buf[o+2]=200;
      }
    }
  }
  const ox = PAD + (k%COLS)*(TILE+PAD), oy = PAD + Math.floor(k/COLS)*(TILE+PAD);
  for (let y=0;y<TILE;y++) buf.copy(sheet, ((oy+y)*SW+ox)*3, y*TILE*3, (y+1)*TILE*3);
});

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, `${NAME}.png`), png(SW, SH, sheet));
console.log(`已输出 .herocheck/${NAME}.png  hero=${HERO} anim=${ANIM} t=${TIME} 视角=${VIEWS.join('/')} 半高=${HALF} 中心=${C.map(v=>v.toFixed(2)).join(',')}`);
console.log(`右手世界位置 ${HW.map(v=>v.toFixed(3)).join(',')}  局部轴 X[${hax[0].map(v=>v.toFixed(2))}] Y[${hax[1].map(v=>v.toFixed(2))}] Z[${hax[2].map(v=>v.toFixed(2))}]`);
