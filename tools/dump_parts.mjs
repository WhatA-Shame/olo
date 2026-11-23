import fs from 'fs';
const src = fs.readFileSync('src/45-mushroom-mesh.js', 'utf8');
const toF32 = (b) => {
  const x = Buffer.from(b, 'base64');
  return new Float32Array(x.buffer.slice(x.byteOffset, x.byteOffset + x.length));
};
const toU32 = (b) => {
  const x = Buffer.from(b, 'base64');
  return new Uint32Array(x.buffer.slice(x.byteOffset, x.byteOffset + x.length));
};
const grabF = (k) => toF32(new RegExp(k + ':\\s*"([^"]+)"').exec(src)[1]);
const names = JSON.parse(/names:\s*(\[[^\]]+\])/.exec(src)[1]);
const pos = grabF('pos');
const idx = toU32(new RegExp('idx:\\s*"([^"]+)"').exec(src)[1]);
const skin = grabF('skin');
const n = pos.length / 3;

// union-find
const par = new Int32Array(n);
for (let i = 0; i < n; i++) par[i] = i;
const find = (a) => {
  while (par[a] !== a) {
    par[a] = par[par[a]];
    a = par[a];
  }
  return a;
};
const uni = (a, b) => {
  const ra = find(a), rb = find(b);
  if (ra !== rb) par[ra] = rb;
};
for (let i = 0; i < idx.length; i += 3) {
  uni(idx[i], idx[i + 1]);
  uni(idx[i + 1], idx[i + 2]);
  uni(idx[i], idx[i + 2]);
}
const comps = new Map();
for (let v = 0; v < n; v++) {
  const r = find(v);
  let c = comps.get(r);
  if (!c) comps.set(r, (c = { verts: [], bones: new Map() }));
  c.verts.push(v);
  const a = Math.round(skin[v * 3]);
  c.bones.set(a, (c.bones.get(a) || 0) + 1);
}
const list = [...comps.values()].sort((a, b) => b.verts.length - a.verts.length);
console.log(`连通块 ${list.length} 个`);
for (const c of list) {
  let x0 = 9, x1 = -9, y0 = 9, y1 = -9, z0 = 9, z1 = -9;
  for (const v of c.verts) {
    const x = pos[v * 3], y = pos[v * 3 + 1], z = pos[v * 3 + 2];
    (x0 = Math.min(x0, x)), (x1 = Math.max(x1, x));
    (y0 = Math.min(y0, y)), (y1 = Math.max(y1, y));
    (z0 = Math.min(z0, z)), (z1 = Math.max(z1, z));
  }
  const top = [...c.bones.entries()].sort((a, b) => b[1] - a[1]).slice(0, 4)
    .map(([b, k]) => `${names[b]}:${k}`).join(' ');
  console.log(
    `  ${String(c.verts.length).padStart(5)} verts  y[${y0.toFixed(2)},${y1.toFixed(2)}] x[${x0.toFixed(2)},${x1.toFixed(2)}] z[${z0.toFixed(2)},${z1.toFixed(2)}]  ${top}`,
  );
}
