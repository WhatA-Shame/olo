// 找最差拉伸边的细节：两端点绑了哪根骨、权重多少、边长多少。
// node tools/_diag3.mjs dist/kart/maggot.bin dance 20
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { kartDecode } from '../src/47-kart-decode.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const d = kartDecode(fs.readFileSync(path.resolve(root, process.argv[2])));
const clipName = process.argv[3] || 'dance';
const fr = +(process.argv[4] || 0);
const N = d.rig.names.length;

const qrot = (q, qi, x, y, z, o, oi) => {
  const qx = q[qi], qy = q[qi + 1], qz = q[qi + 2], qw = q[qi + 3];
  const tx = 2 * (qy * z - qz * y), ty = 2 * (qz * x - qx * z), tz = 2 * (qx * y - qy * x);
  o[oi] = x + qw * tx + (qy * tz - qz * ty);
  o[oi + 1] = y + qw * ty + (qz * tx - qx * tz);
  o[oi + 2] = z + qw * tz + (qx * ty - qy * tx);
};
const qmul = (a, ai, b, bi, o, oi) => {
  const ax = a[ai], ay = a[ai + 1], az = a[ai + 2], aw = a[ai + 3];
  const bx = b[bi], by = b[bi + 1], bz = b[bi + 2], bw = b[bi + 3];
  o[oi] = aw * bx + ax * bw + ay * bz - az * by;
  o[oi + 1] = aw * by - ax * bz + ay * bw + az * bx;
  o[oi + 2] = aw * bz + ax * by - ay * bx + az * bw;
  o[oi + 3] = aw * bw - ax * bx - ay * by - az * bz;
};

const order = [];
{
  const kids = Array.from({ length: N }, () => []);
  const roots = [];
  for (let j = 0; j < N; j++) (d.rig.parent[j] < 0 ? roots : kids[d.rig.parent[j]]).push(j);
  const st = [...roots], seen = new Uint8Array(N);
  while (st.length) {
    const j = st.pop();
    if (seen[j]) continue;
    seen[j] = 1; order.push(j);
    for (const c of kids[j]) st.push(c);
  }
  for (let j = 0; j < N; j++) if (!seen[j]) order.push(j);
}

const P = d.mesh.pos, BW = d.rig.bindWorld, BQ = d.rig.bindWQ, SK = d.mesh.skin;
const wp = new Float64Array(N * 3), wq = new Float64Array(N * 4), ws = new Float64Array(N * 3);
const tmp = [0, 0, 0];
const clip = d.anim[clipName];
const t3 = new Float32Array(N * 3), q4 = new Float32Array(N * 4), s3 = new Float32Array(N * 3);
for (let j = 0; j < N; j++) {
  const o = (fr * N + j) * 10;
  t3[j * 3] = d.rig.localPos[j * 3] + clip.data[o];
  t3[j * 3 + 1] = d.rig.localPos[j * 3 + 1] + clip.data[o + 1];
  t3[j * 3 + 2] = d.rig.localPos[j * 3 + 2] + clip.data[o + 2];
  for (let k = 0; k < 4; k++) q4[j * 4 + k] = clip.data[o + 3 + k];
  for (let k = 0; k < 3; k++) s3[j * 3 + k] = clip.data[o + 7 + k];
}
for (const j of order) {
  const p = d.rig.parent[j];
  if (p < 0) {
    for (let k = 0; k < 3; k++) { wp[j * 3 + k] = t3[j * 3 + k]; ws[j * 3 + k] = s3[j * 3 + k]; }
    for (let k = 0; k < 4; k++) wq[j * 4 + k] = q4[j * 4 + k];
  } else {
    const kx = ws[p * 3], ky = ws[p * 3 + 1], kz = ws[p * 3 + 2];
    qrot(wq, p * 4, t3[j * 3] * kx, t3[j * 3 + 1] * ky, t3[j * 3 + 2] * kz, tmp, 0);
    for (let k = 0; k < 3; k++) wp[j * 3 + k] = wp[p * 3 + k] + tmp[k];
    qmul(wq, p * 4, q4, j * 4, wq, j * 4);
    ws[j * 3] = kx * s3[j * 3]; ws[j * 3 + 1] = ky * s3[j * 3 + 1]; ws[j * 3 + 2] = kz * s3[j * 3 + 2];
  }
}

const t1 = [0, 0, 0], t2 = [0, 0, 0], cq = [0, 0, 0, 0];
const out = new Float32Array(P.length);
const bp = (j, vx, vy, vz, o, oi) => {
  cq[0] = -BQ[j * 4]; cq[1] = -BQ[j * 4 + 1]; cq[2] = -BQ[j * 4 + 2]; cq[3] = BQ[j * 4 + 3];
  qrot(cq, 0, vx - BW[j * 3], vy - BW[j * 3 + 1], vz - BW[j * 3 + 2], t1, 0);
  t1[0] *= ws[j * 3]; t1[1] *= ws[j * 3 + 1]; t1[2] *= ws[j * 3 + 2];
  qrot(wq, j * 4, t1[0], t1[1], t1[2], t2, 0);
  o[oi] = wp[j * 3] + t2[0]; o[oi + 1] = wp[j * 3 + 1] + t2[1]; o[oi + 2] = wp[j * 3 + 2] + t2[2];
};
const a3 = [0, 0, 0], b3 = [0, 0, 0];
const SK2 = d.mesh.skin2;
for (let v = 0; v < P.length / 3; v++) {
  const wA = SK[v * 3 + 2], wC = SK2[v * 4 + 2], wD = SK2[v * 4 + 3];
  const wB = Math.max(0, 1 - wA - wC - wD);
  let ax = 0, ay = 0, az = 0;
  for (const [j, w] of [[SK[v * 3], wA], [SK[v * 3 + 1], wB], [SK2[v * 4], wC], [SK2[v * 4 + 1], wD]]) {
    if (w <= 5e-4) continue;
    bp(j, P[v * 3], P[v * 3 + 1], P[v * 3 + 2], b3, 0);
    ax += b3[0] * w; ay += b3[1] * w; az += b3[2] * w;
  }
  out[v * 3] = ax; out[v * 3 + 1] = ay; out[v * 3 + 2] = az;
}

const I = d.mesh.idx;
const edges = [];
for (let i = 0; i < I.length; i += 3) {
  for (const [a, b] of [[I[i], I[i + 1]], [I[i + 1], I[i + 2]], [I[i + 2], I[i]]]) if (a !== b) edges.push(a, b);
}
const rows = [];
for (let e = 0; e < edges.length; e += 2) {
  const a = edges[e], b = edges[e + 1];
  const l0 = Math.hypot(P[a * 3] - P[b * 3], P[a * 3 + 1] - P[b * 3 + 1], P[a * 3 + 2] - P[b * 3 + 2]);
  const l = Math.hypot(out[a * 3] - out[b * 3], out[a * 3 + 1] - out[b * 3 + 1], out[a * 3 + 2] - out[b * 3 + 2]);
  if (l0 < 1e-5) continue;
  rows.push({ a, b, l0, l, r: l / l0 });
}
rows.sort((x, y) => y.r - x.r);
const nm = (j) => d.rig.names[j];
const bd = (j) => `${nm(j)}@(${wp[j * 3].toFixed(2)},${wp[j * 3 + 1].toFixed(2)},${wp[j * 3 + 2].toFixed(2)})s=${ws[j * 3].toFixed(2)},${ws[j * 3 + 1].toFixed(2)},${ws[j * 3 + 2].toFixed(2)}`;
const vd = (v) => {
  const t = [];
  const wA = SK[v * 3 + 2], wC = SK2[v * 4 + 2], wD = SK2[v * 4 + 3], wB = Math.max(0, 1 - wA - wC - wD);
  for (const [j, w] of [[SK[v * 3], wA], [SK[v * 3 + 1], wB], [SK2[v * 4], wC], [SK2[v * 4 + 1], wD]])
    if (w > 5e-4) t.push(`${nm(j)}:${w.toFixed(2)}`);
  return t.join(' ');
};
console.log(`${clipName} f${fr}  边 ${edges.length / 2} 条，l0>1e-5`);
for (const q of rows.slice(0, 6))
  console.log(`  ${q.r.toFixed(1)}×  l0=${q.l0.toFixed(4)} → ${q.l.toFixed(3)}\n      v${q.a} ${vd(q.a)}\n      v${q.b} ${vd(q.b)}`);
// 有多少条边超过 2×
const bad = rows.filter((q) => q.r > 2);
console.log(`  >2× 的边 ${bad.length} 条 / ${rows.length}；>5× ${rows.filter((q) => q.r > 5).length} 条`);
// 按边长加权：长边撕裂才明显
const wsum = rows.reduce((s, q) => s + q.l0, 0);
console.log(`  按边长加权平均拉伸 ${(rows.reduce((s, q) => s + q.r * q.l0, 0) / wsum).toFixed(2)}×`);

// 指定骨骼的世界位置/缩放（和 GLB 基准对照用）：--bones=节点_173,节点_174
const wantBones = (process.argv.find((a) => a.startsWith('--bones=')) || '').split('=')[1];
if (wantBones)
  for (const nmx of wantBones.split(',')) {
    const j = d.rig.names.indexOf(nmx);
    if (j < 0) { console.log(`  ${nmx} 不存在`); continue; }
    const q = wq.slice(j * 4, j * 4 + 4);
    console.log(`  ${nmx} wp=(${wp[j*3].toFixed(3)},${wp[j*3+1].toFixed(3)},${wp[j*3+2].toFixed(3)}) ws=(${ws[j*3].toFixed(3)},${ws[j*3+1].toFixed(3)},${ws[j*3+2].toFixed(3)}) wq=(${[...q].map((x)=>x.toFixed(3)).join(',')})`);
  }
