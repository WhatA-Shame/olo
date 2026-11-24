await import('./_stub.mjs');
const {heroRig}=await import('../src/45-niuwei-mesh.js');
const R=heroRig();
const J=k=>R.names.indexOf(k);
const qRot=(q,v)=>{const[x,y,z,w]=q;const t=[2*(y*v[2]-z*v[1]),2*(z*v[0]-x*v[2]),2*(x*v[1]-y*v[0])];
  return [v[0]+w*t[0]+(y*t[2]-z*t[1]),v[1]+w*t[1]+(z*t[0]-x*t[2]),v[2]+w*t[2]+(x*t[1]-y*t[0])];};
for (const nm of ['R_Clavicle','R_Upperarm','R_Forearm','R_Hand']) {
  const j=J(nm);
  const q=[0,1,2,3].map(k=>R.bindWQ[j*4+k]);
  const ax=[0,1,2].map(k=>qRot(q,[k===0?1:0,k===1?1:0,k===2?1:0]));
  console.log(nm.padEnd(12), 'X',ax[0].map(v=>v.toFixed(2)).join(','), ' Y',ax[1].map(v=>v.toFixed(2)).join(','), ' Z',ax[2].map(v=>v.toFixed(2)).join(','));
}
