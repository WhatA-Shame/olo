import path from 'node:path'; import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const MESH=process.argv[2]||'45-niuwei-mesh.js';
const {heroRig,heroMesh}=await import(`../src/${MESH}`);
const R=heroRig(),M=heroMesh();
const J=k=>R.names.indexOf(k), handJ=J('R_Hand');
const BWQ=[0,1,2,3].map(k=>R.bindWQ[handJ*4+k]);
const qRot=(q,v)=>{const[x,y,z,w]=q;const t=[2*(y*v[2]-z*v[1]),2*(z*v[0]-x*v[2]),2*(x*v[1]-y*v[0])];
  return [v[0]+w*t[0]+(y*t[2]-z*t[1]),v[1]+w*t[1]+(z*t[0]-x*t[2]),v[2]+w*t[2]+(x*t[1]-y*t[0])];};
const AX=qRot(BWQ,[1,0,0]),AY=qRot(BWQ,[0,1,0]),AZ=qRot(BWQ,[0,0,1]);
const HP=[R.bindWorld[handJ*3],R.bindWorld[handJ*3+1],R.bindWorld[handJ*3+2]];
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const NV=M.pos.length/3, domBone=i=>(M.skin[i*3+2]>0.5?M.skin[i*3]:M.skin[i*3+1]);
const L=[];
for(let i=0;i<NV;i++){ if(domBone(i)!==handJ)continue;
  const v=[M.pos[i*3]-HP[0],M.pos[i*3+1]-HP[1],M.pos[i*3+2]-HP[2]];
  L.push([dot(v,AX),dot(v,AY),dot(v,AZ)]); }
// 用三角形截面（更准）：取每个三角形与平面 y=Y0 的交线段
const tri=[];
for(let t=0;t<M.idx.length;t+=3){ const a=M.idx[t],b=M.idx[t+1],c=M.idx[t+2];
  if(domBone(a)!==handJ||domBone(b)!==handJ||domBone(c)!==handJ) continue;
  tri.push([a,b,c]); }
const loc=i=>{const v=[M.pos[i*3]-HP[0],M.pos[i*3+1]-HP[1],M.pos[i*3+2]-HP[2]];
  return [dot(v,AX),dot(v,AY),dot(v,AZ)];};
const Lc=new Map(); for(let i=0;i<NV;i++) Lc.set(i,loc(i));
for(const Y0 of [0.10,0.18,0.24,0.30,0.36,0.42,0.46]){
  const segs=[];
  for(const [a,b,c] of tri){
    const P=[Lc.get(a),Lc.get(b),Lc.get(c)];
    const pts=[];
    for(let k=0;k<3;k++){ const p=P[k],q=P[(k+1)%3];
      if((p[1]-Y0)*(q[1]-Y0)<0){ const t=(Y0-p[1])/(q[1]-p[1]);
        pts.push([p[2]+(q[2]-p[2])*t, p[0]+(q[0]-p[0])*t]); } }
    if(pts.length===2) segs.push(pts);
  }
  // 按 Z 聚类
  const iv=segs.map(s=>[Math.min(s[0][0],s[1][0]),Math.max(s[0][0],s[1][0])]).sort((a,b)=>a[0]-b[0]);
  const merged=[];
  for(const s of iv){ const last=merged[merged.length-1];
    if(last && s[0]<=last[1]+0.012) last[1]=Math.max(last[1],s[1]); else merged.push([s[0],s[1]]); }
  console.log(`y=${Y0.toFixed(2)}  Z 截面 ${merged.length} 段: ` + merged.map(([a,b])=>`[${a.toFixed(3)},${b.toFixed(3)}] 宽${(b-a).toFixed(3)}`).join('  '));
}
// 每段中心的 X（掌心/手背方向）用来判断哪段更靠掌心
console.log('\n各高度最大 Y（指尖高度）分段:');
