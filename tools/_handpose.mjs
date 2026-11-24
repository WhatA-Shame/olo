// 读取 GLB 绑定姿态下指定骨骼的世界变换（位置 + 四元数 + 局部坐标轴）
import fs from 'fs';
const file = process.argv[2];
const want = process.argv.slice(3);
const buf = fs.readFileSync(file);
let off = 12, json = null, bin = null;
while (off < buf.length) {
  const len = buf.readUInt32LE(off);
  const type = buf.toString('ascii', off + 4, off + 8);
  if (type === 'JSON') json = JSON.parse(buf.toString('utf8', off + 8, off + 8 + len));
  else if (type.startsWith('BIN')) bin = buf.subarray(off + 8, off + 8 + len);
  off += 8 + len;
}
const N = json.nodes;
const parentOf = new Map();
N.forEach((n, i) => (n.children || []).forEach((c) => parentOf.set(c, i)));

// 四元数/矩阵工具
const qMul = (a, b) => [
  a[3] * b[0] + a[0] * b[3] + a[1] * b[2] - a[2] * b[1],
  a[3] * b[1] - a[0] * b[2] + a[1] * b[3] + a[2] * b[0],
  a[3] * b[2] + a[0] * b[1] - a[1] * b[0] + a[2] * b[3],
  a[3] * b[3] - a[0] * b[0] - a[1] * b[1] - a[2] * b[2],
];
const qRot = (q, v) => {
  const [x, y, z, w] = q;
  const t = [2 * (y * v[2] - z * v[1]), 2 * (z * v[0] - x * v[2]), 2 * (x * v[1] - y * v[0])];
  return [
    v[0] + w * t[0] + (y * t[2] - z * t[1]),
    v[1] + w * t[1] + (z * t[0] - x * t[2]),
    v[2] + w * t[2] + (x * t[1] - y * t[0]),
  ];
};
const local = (n) => {
  if (n.matrix) {
    const m = n.matrix;
    // 列主序
    const pos = [m[12], m[13], m[14]];
    const sx = Math.hypot(m[0], m[1], m[2]);
    const r = [m[0] / sx, m[1] / sx, m[2] / sx, m[4] / sx, m[5] / sx, m[6] / sx, m[8] / sx, m[9] / sx, m[10] / sx];
    const tr = r[0] + r[4] + r[8];
    let q;
    if (tr > 0) {
      const s = Math.sqrt(tr + 1) * 2;
      q = [(r[7] - r[5]) / s, (r[2] - r[6]) / s, (r[3] - r[1]) / s, s / 4];
    } else if (r[0] > r[4] && r[0] > r[8]) {
      const s = Math.sqrt(1 + r[0] - r[4] - r[8]) * 2;
      q = [s / 4, (r[1] + r[3]) / s, (r[2] + r[6]) / s, (r[7] - r[5]) / s];
    } else if (r[4] > r[8]) {
      const s = Math.sqrt(1 + r[4] - r[0] - r[8]) * 2;
      q = [(r[1] + r[3]) / s, s / 4, (r[5] + r[7]) / s, (r[2] - r[6]) / s];
    } else {
      const s = Math.sqrt(1 + r[8] - r[0] - r[4]) * 2;
      q = [(r[2] + r[6]) / s, (r[5] + r[7]) / s, s / 4, (r[3] - r[1]) / s];
    }
    return { pos, q };
  }
  return { pos: n.translation || [0, 0, 0], q: n.rotation || [0, 0, 0, 1] };
};
const world = (i) => {
  const chain = [];
  let c = i;
  while (c != null) { chain.unshift(c); c = parentOf.get(c); }
  let p = [0, 0, 0], q = [0, 0, 0, 1];
  for (const k of chain) {
    const L = local(N[k]);
    const rp = qRot(q, L.pos);
    p = [p[0] + rp[0], p[1] + rp[1], p[2] + rp[2]];
    q = qMul(q, L.q);
  }
  return { p, q };
};
const f = (v) => v.map((x) => x.toFixed(3)).join(', ');
for (const name of want) {
  const i = N.findIndex((n) => n.name === name);
  if (i < 0) { console.log(name, '未找到'); continue; }
  const { p, q } = world(i);
  const ax = qRot(q, [1, 0, 0]), ay = qRot(q, [0, 1, 0]), az = qRot(q, [0, 0, 1]);
  console.log(`${name.padEnd(16)} pos[${f(p)}]  q[${f(q)}]`);
  console.log(`   localX→[${f(ax)}]  localY→[${f(ay)}]  localZ→[${f(az)}]`);
}
