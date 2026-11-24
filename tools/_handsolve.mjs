// 手骨局部空间解剖：判断 Z 轴哪一端是拇指，并给出「拇指内侧点 / 小拇指内侧点」。
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MESH = process.argv[2] || '45-niuwei-mesh.js';
const { heroRig, heroMesh } = await import(`../src/${MESH}`);
const R = heroRig(), M = heroMesh();
const J = (k) => R.names.indexOf(k);
const handJ = J('R_Hand');
const BWQ = [0,1,2,3].map((k) => R.bindWQ[handJ*4+k]);
const qRot = (q,v) => { const [x,y,z,w]=q;
  const t=[2*(y*v[2]-z*v[1]),2*(z*v[0]-x*v[2]),2*(x*v[1]-y*v[0])];
  return [v[0]+w*t[0]+(y*t[2]-z*t[1]), v[1]+w*t[1]+(z*t[0]-x*t[2]), v[2]+w*t[2]+(x*t[1]-y*t[0])]; };
const AX=qRot(BWQ,[1,0,0]), AY=qRot(BWQ,[0,1,0]), AZ=qRot(BWQ,[0,0,1]);
const HP=[R.bindWorld[handJ*3],R.bindWorld[handJ*3+1],R.bindWorld[handJ*3+2]];
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const NV=M.pos.length/3;
const domBone=(i)=>(M.skin[i*3+2]>0.5?M.skin[i*3]:M.skin[i*3+1]);
const L=[]; // 手骨局部坐标
for(let i=0;i<NV;i++){
  if(domBone(i)!==handJ) continue;
  const v=[M.pos[i*3]-HP[0],M.pos[i*3+1]-HP[1],M.pos[i*3+2]-HP[2]];
  L.push([dot(v,AX),dot(v,AY),dot(v,AZ),i]);
}
console.log('手部顶点数',L.length);
const rng=(k)=>{let lo=Infinity,hi=-Infinity;for(const p of L){if(p[k]<lo)lo=p[k];if(p[k]>hi)hi=p[k];}return [lo,hi];};
console.log('局部 X',rng(0).map(v=>v.toFixed(3)).join(' .. '));
console.log('局部 Y',rng(1).map(v=>v.toFixed(3)).join(' .. '));
console.log('局部 Z',rng(2).map(v=>v.toFixed(3)).join(' .. '));

// 按 Z 分箱，看每箱的 maxY / 顶点数 / X 范围
const zlo=rng(2)[0], zhi=rng(2)[1], NB=14;
const bins=Array.from({length:NB},()=>({n:0,maxY:-Infinity,minY:Infinity,xs:[],zs:[]}));
for(const p of L){ const b=Math.min(NB-1,Math.floor((p[2]-zlo)/((zhi-zlo)/NB))); const o=bins[b];
  o.n++; if(p[1]>o.maxY)o.maxY=p[1]; if(p[1]<o.minY)o.minY=p[1]; o.xs.push(p[0]); o.zs.push(p[2]); }
console.log('\nZ 分箱（从 Z 小到大）: 箱中心Z  顶点数  maxY   minY');
bins.forEach((o,b)=>{ if(!o.n) return;
  console.log(`  ${(zlo+(b+0.5)*(zhi-zlo)/NB).toFixed(3)}   ${String(o.n).padStart(3)}   ${o.maxY.toFixed(3)}   ${o.minY.toFixed(3)}`); });

// 各 Z 极端处，找「最靠掌心侧」（X 最小）的若干点
const near=(pred,n)=>L.filter(pred).sort((a,b)=>a[0]-b[0]).slice(0,n);
const fmt=(a)=>a.map(p=>`(${p[0].toFixed(3)},${p[1].toFixed(3)},${p[2].toFixed(3)})`).join(' ');
console.log('\nZ<-0.10 一侧，X 最小的 8 个点:'); console.log(' ',fmt(near(p=>p[2]<-0.10,8)));
console.log('Z>+0.10 一侧，X 最小的 8 个点:'); console.log(' ',fmt(near(p=>p[2]>0.10,8)));
console.log('\nZ<-0.10 一侧，X 最大的 5 个点:'); console.log(' ',fmt(L.filter(p=>p[2]<-0.10).sort((a,b)=>b[0]-a[0]).slice(0,5)));
console.log('Z>+0.10 一侧，X 最大的 5 个点:'); console.log(' ',fmt(L.filter(p=>p[2]>0.10).sort((a,b)=>b[0]-a[0]).slice(0,5)));
// 拇指判据：某 Z 端 maxY 明显更低 = 拇指端
console.log('\n结论提示：maxY 明显偏低的一端是拇指端');
