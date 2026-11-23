// 量两件事：
// 1) 原始网格里，不同碎块之间的最近距离是多少 —— 判断"裂口"是模型自带的面板缝，还是权重造成的
// 2) 绑定姿态下蒙皮是否等于原样（是的话，静止时看到的缝就一定在模型里）
import fs from 'fs';

const src = fs.readFileSync('src/45-mushroom-mesh.js', 'utf8');
const decF = (b) => {
  const x = Buffer.from(b, 'base64');
  return new Float32Array(x.buffer.slice(x.byteOffset, x.byteOffset + x.length));
};
const decU = (b) => {
  const x = Buffer.from(b, 'base64');
  return new Uint32Array(x.buffer.slice(x.byteOffset, x.byteOffset + x.length));
};
const g = (k) => new RegExp(k + ':\\s*"([^"]+)"').exec(src)[1];
const names = JSON.parse(/names:\s*(\[[^\]]+\])/.exec(src)[1]);
const pos = decF(g('pos'));
const idx = decU(g('idx'));
const V = pos.length / 3;

// 连通块
const uf = new Int32Array(V);
for (let i = 0; i < V; i++) uf[i] = i;
const find = (a) => {
  while (uf[a] !== a) ((uf[a] = uf[uf[a]]), (a = uf[a]));
  return a;
};
for (let i = 0; i < idx.length; i += 3) {
  const r = find(idx[i]);
  uf[find(idx[i + 1])] = r;
  uf[find(idx[i + 2])] = r;
}
for (let i = 0; i < V; i++) uf[i] = find(i);
const comps = [...new Set(uf)];

// 空间哈希，找跨块最近点对
const CELL = 0.08;
const grid = new Map();
const key = (x, y, z) => `${x},${y},${z}`;
for (let v = 0; v < V; v++) {
  const k = key(
    Math.floor(pos[v * 3] / CELL),
    Math.floor(pos[v * 3 + 1] / CELL),
    Math.floor(pos[v * 3 + 2] / CELL),
  );
  if (!grid.has(k)) grid.set(k, []);
  grid.get(k).push(v);
}

let bestOther = new Float64Array(V).fill(Infinity);
let bestSame = new Float64Array(V).fill(Infinity);
for (let v = 0; v < V; v++) {
  const cx = Math.floor(pos[v * 3] / CELL), cy = Math.floor(pos[v * 3 + 1] / CELL), cz = Math.floor(pos[v * 3 + 2] / CELL);
  for (let dx = -1; dx <= 1; dx++)
    for (let dy = -1; dy <= 1; dy++)
      for (let dz = -1; dz <= 1; dz++) {
        const arr = grid.get(key(cx + dx, cy + dy, cz + dz));
        if (!arr) continue;
        for (const u of arr) {
          if (u === v) continue;
          const d = Math.hypot(pos[v * 3] - pos[u * 3], pos[v * 3 + 1] - pos[u * 3 + 1], pos[v * 3 + 2] - pos[u * 3 + 2]);
          if (uf[u] === uf[v]) {
            if (d < bestSame[v]) bestSame[v] = d;
          } else if (d < bestOther[v]) bestOther[v] = d;
        }
      }
}

const hist = (arr, label) => {
  const buckets = [0.0001, 0.005, 0.01, 0.02, 0.05, 0.1, 0.2, 1];
  const cnt = new Array(buckets.length).fill(0);
  let none = 0;
  for (const d of arr) {
    if (!isFinite(d)) { none++; continue; }
    let i = buckets.findIndex((b) => d <= b);
    if (i < 0) i = buckets.length - 1;
    cnt[i]++;
  }
  console.log(`\n${label}`);
  buckets.forEach((b, i) => {
    const lo = i === 0 ? 0 : buckets[i - 1];
    console.log(`  ${(lo * 1000).toFixed(0).padStart(5)}~${(b * 1000).toFixed(0).padStart(5)}mm : ${String(cnt[i]).padStart(5)}`);
  });
  console.log(`  无邻近点            : ${none}`);
};
hist(bestOther, '跨碎块最近距离（每顶点到最近"别的碎块"顶点的距离）');
hist(bestSame, '同碎块内最近邻距离');

const near = [...bestOther].filter((d) => d < 0.02).length;
console.log(`\n跨块最近距离 <20mm 的顶点：${near} / ${V} (${((near / V) * 100).toFixed(0)}%)`);
console.log(`碎块数 ${comps.length}`);
