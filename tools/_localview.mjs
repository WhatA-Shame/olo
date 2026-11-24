// 手骨「局部坐标系」下的正投影渲染：图面 x = 局部 Z（拇指↔小指），图面 y = 局部 Y（腕→指），
// 相机沿局部 ±X（掌心法向）。带 0.05 网格 + 候选点标记，用来肉眼判断拇指在哪一端。
import fs from 'node:fs'; import path from 'node:path'; import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(root, '.herocheck');
const argv = process.argv.slice(2);
const arg=(k,d)=>{const a=argv.find(x=>x.startsWith(k+'='));return a?a.slice(k.length+1):d;};
const MESH = arg('--mesh','45-niuwei-mesh.js');
const NAME = arg('--out','local');
const { heroRig, heroMesh } = await import(`../src/${MESH}`);
const R=heroRig(), M=heroMesh();
const J=(k)=>R.names.indexOf(k);
const handJ=J('R_Hand');
const BWQ=[0,1,2,3].map(k=>R.bindWQ[handJ*4+k]);
const qRot=(q,v)=>{const[x,y,z,w]=q;const t=[2*(y*v[2]-z*v[1]),2*(z*v[0]-x*v[2]),2*(x*v[1]-y*v[0])];
  return [v[0]+w*t[0]+(y*t[2]-z*t[1]),v[1]+w*t[1]+(z*t[0]-x*t[2]),v[2]+w*t[2]+(x*t[1]-y*t[0])];};
const AX=qRot(BWQ,[1,0,0]),AY=qRot(BWQ,[0,1,0]),AZ=qRot(BWQ,[0,0,1]);
const HP=[R.bindWorld[handJ*3],R.bindWorld[handJ*3+1],R.bindWorld[handJ*3+2]];
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const NV=M.pos.length/3;
const domBone=(i)=>(M.skin[i*3+2]>0.5?M.skin[i*3]:M.skin[i*3+1]);
// 局部坐标（相对腕关节）
const LP=new Float32Array(NV*3);
const isHand=new Uint8Array(NV);
for(let i=0;i<NV;i++){
  const v=[M.pos[i*3]-HP[0],M.pos[i*3+1]-HP[1],M.pos[i*3+2]-HP[2]];
  LP[i*3]=dot(v,AX); LP[i*3+1]=dot(v,AY); LP[i*3+2]=dot(v,AZ);
  isHand[i]=domBone(i)===handJ?1:0;
}
// ---- PNG ----
const crcT=(()=>{const t=new Int32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;t[n]=c;}return t;})();
const crc=(b)=>{let c=-1;for(let i=0;i<b.length;i++)c=crcT[(c^b[i])&0xff]^(c>>>8);return (c^-1)>>>0;};
function png(w,h,rgb){const raw=Buffer.alloc((w*3+1)*h);
  for(let y=0;y<h;y++){raw[y*(w*3+1)]=0;rgb.copy(raw,y*(w*3+1)+1,y*w*3,(y+1)*w*3);}
  const chunk=(t,d)=>{const len=Buffer.alloc(4);len.writeUInt32BE(d.length);
    const td=Buffer.concat([Buffer.from(t,'ascii'),d]);const c=Buffer.alloc(4);c.writeUInt32BE(crc(td));return Buffer.concat([len,td,c]);};
  const ih=Buffer.alloc(13);ih.writeUInt32BE(w,0);ih.writeUInt32BE(h,4);ih[8]=8;ih[9]=2;
  return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',ih),chunk('IDAT',zlib.deflateSync(raw,{level:9})),chunk('IEND',Buffer.alloc(0))]);}

// ---- 视图：局部 Z 向右、局部 Y 向上，相机沿 ∓X ----
const TILE=560, SC=900;  // px per unit
const CX=0.0, CY=0.22;   // 图心（局部 Z, 局部 Y）
function render(sign){ // sign=+1 相机在 +X 侧（看手背/掌心之一）
  const buf=Buffer.alloc(TILE*TILE*3);
  for(let i=0;i<buf.length;i+=3){buf[i]=16;buf[i+1]=20;buf[i+2]=28;}
  // 网格：每 0.05
  for(let z=-0.4;z<=0.4;z+=0.05){
    const px=Math.round(TILE/2+(z-CX)*SC);
    if(px<0||px>=TILE)continue;
    const maj=Math.abs(Math.round(z*20)%2)===0;
    for(let y=0;y<TILE;y++){const o=(y*TILE+px)*3;const v=maj?46:30;buf[o]=v;buf[o+1]=v+2;buf[o+2]=v+8;}
  }
  for(let yv=-0.2;yv<=0.7;yv+=0.05){
    const py=Math.round(TILE/2-(yv-CY)*SC);
    if(py<0||py>=TILE)continue;
    const maj=Math.abs(Math.round(yv*20)%2)===0;
    for(let x=0;x<TILE;x++){const o=(py*TILE+x)*3;const v=maj?46:30;buf[o]=v;buf[o+1]=v+2;buf[o+2]=v+8;}
  }
  const zb=new Float32Array(TILE*TILE).fill(-Infinity);
  const proj=(z,y,x)=>[TILE/2+(z-CX)*SC, TILE/2-(y-CY)*SC, x*sign];
  for(let t=0;t<M.idx.length;t+=3){
    const ia=M.idx[t],ib=M.idx[t+1],ic=M.idx[t+2];
    if(!isHand[ia]&&!isHand[ib]&&!isHand[ic]) continue;
    const A=proj(LP[ia*3+2],LP[ia*3+1],LP[ia*3]);
    const B=proj(LP[ib*3+2],LP[ib*3+1],LP[ib*3]);
    const Cc=proj(LP[ic*3+2],LP[ic*3+1],LP[ic*3]);
    const area=(B[0]-A[0])*(Cc[1]-A[1])-(Cc[0]-A[0])*(B[1]-A[1]);
    if(Math.abs(area)<1e-9) continue;
    const hand=(isHand[ia]+isHand[ib]+isHand[ic])/3;
    const base=hand>=2/3?[214,88,72]:[110,110,124];
    const minx=Math.max(0,Math.floor(Math.min(A[0],B[0],Cc[0]))), maxx=Math.min(TILE-1,Math.ceil(Math.max(A[0],B[0],Cc[0])));
    const miny=Math.max(0,Math.floor(Math.min(A[1],B[1],Cc[1]))), maxy=Math.min(TILE-1,Math.ceil(Math.max(A[1],B[1],Cc[1])));
    for(let y=miny;y<=maxy;y++)for(let x=minx;x<=maxx;x++){
      const px=x+0.5,py=y+0.5;
      const w0=((B[0]-A[0])*(py-A[1])-(px-A[0])*(B[1]-A[1]))/area;
      const w1=((px-A[0])*(Cc[1]-A[1])-(Cc[0]-A[0])*(py-A[1]))/area;
      const w2=1-w0-w1;
      if(w0<0||w1<0||w2<0)continue;
      const z=A[2]*w2+B[2]*w1+Cc[2]*w0;
      const o=y*TILE+x;
      if(z<=zb[o])continue;
      zb[o]=z;
      const lam=0.55+0.45*Math.min(1,Math.abs(z));
      buf[o*3]=Math.min(255,base[0]*lam)|0;buf[o*3+1]=Math.min(255,base[1]*lam)|0;buf[o*3+2]=Math.min(255,base[2]*lam)|0;
    }
  }
  return {buf,proj};
}
function dotAt(buf,x,y,rgb){for(let dy=-4;dy<=4;dy++)for(let dx=-4;dx<=4;dx++){
  if(dx*dx+dy*dy>16)continue;const px=Math.round(x)+dx,py=Math.round(y)+dy;
  if(px<0||py<0||px>=TILE||py>=TILE)continue;const o=(py*TILE+px)*3;
  buf[o]=rgb[0];buf[o+1]=rgb[1];buf[o+2]=rgb[2];}}
function lineAt(buf,a,b,rgb){ // a,b = [z,y]
  const N=Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])*SC);
  for(let i=0;i<=N;i++){const t=i/N;const z=a[0]+(b[0]-a[0])*t, y=a[1]+(b[1]-a[1])*t;
    const px=Math.round(TILE/2+(z-CX)*SC), py=Math.round(TILE/2-(y-CY)*SC);
    for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const qx=px+dx,qy=py+dy;
      if(qx<0||qy<0||qx>=TILE||qy>=TILE)continue;const o=(qy*TILE+qx)*3;buf[o]=rgb[0];buf[o+1]=rgb[1];buf[o+2]=rgb[2];}}
}
// 候选点
const cands=[
  ['A', -0.143,0.093,-0.238,[255,80,80]],
  ['B', -0.137,0.079, 0.169,[80,200,255]],
  ['C', -0.134,0.186, 0.252,[120,255,140]],
  ['D', -0.155,0.099,-0.148,[255,210,60]],
];
const views=[['cam+X',1],['cam-X',-1]];
const SW=TILE*2+12, SH=TILE+8;
const sheet=Buffer.alloc(SW*SH*3,0);
views.forEach(([nm,s],k)=>{
  const {buf}=render(s);
  cands.forEach(([n,x,y,z,c])=>{
    dotAt(buf, TILE/2+(z-CX)*SC, TILE/2-(y-CY)*SC, c);
  });
  lineAt(buf,[-0.30,0.10],[0.30,0.10],[255,255,255]); // 参考水平线 y=0.10
  const ox=4+k*(TILE+4), oy=4;
  for(let y=0;y<TILE;y++) buf.copy(sheet,((oy+y)*SW+ox)*3,y*TILE*3,(y+1)*TILE*3);
});
fs.mkdirSync(OUT,{recursive:true});
fs.writeFileSync(path.join(OUT,`${NAME}.png`),png(SW,SH,sheet));
console.log(`已输出 .herocheck/${NAME}.png  左=相机在+X侧  右=相机在-X侧  图面右=局部+Z 上=局部+Y`);
console.log('候选点(局部 x,y,z):'); cands.forEach(c=>console.log(' ',c[0],c[1],c[2],c[3],'色',c[4].join(',')));
