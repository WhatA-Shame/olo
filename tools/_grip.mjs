// 牛伟握斧探针 v2：离线分析 R_Hand 顶点分布，找出「虎口」方向，给出柄轴建议位置。
// 不渲染、不起浏览器。用法: node tools/_grip.mjs [下放角] [腕角]
import { heroRig, heroMesh } from '../src/45-niuwei-mesh.js';

const R = heroRig();
const M = heroMesh();
const N = R.names.length;
const J = (k) => R.names.indexOf(k);

const qMul = (a, b) => {
  const [x1, y1, z1, w1] = a, [x2, y2, z2, w2] = b;
  return [
    w1 * x2 + x1 * w2 + y1 * z2 - z1 * y2,
    w1 * y2 - x1 * z2 + y1 * w2 + z1 * x2,
    w1 * z2 + x1 * y2 - y1 * x2 + z1 * w2,
    w1 * w2 - x1 * x2 - y1 * y2 - z1 * z2,
  ];
};
const qConj = (q) => [-q[0], -q[1], -q[2], q[3]];
const qRot = (q, v) => {
  const [x, y, z, w] = q;
  const t = [2 * (y * v[2] - z * v[1]), 2 * (z * v[0] - x * v[2]), 2 * (x * v[1] - y * v[0])];
  return [
    v[0] + w * t[0] + (y * t[2] - z * t[1]),
    v[1] + w * t[1] + (z * t[0] - x * t[2]),
    v[2] + w * t[2] + (x * t[1] - y * t[0]),
  ];
};
const handJ = J('R_Hand');
const HB = [R.bindWorld[handJ * 3], R.bindWorld[handJ * 3 + 1], R.bindWorld[handJ * 3 + 2]];
// 手骨绑定姿态的世界旋转（列向量就是局部轴的世界方向）
const BWQ = [R.bindWQ[handJ * 4], R.bindWQ[handJ * 4 + 1], R.bindWQ[handJ * 4 + 2], R.bindWQ[handJ * 4 + 3]];
const AX = qRot(BWQ, [1, 0, 0]);
const AY = qRot(BWQ, [0, 1, 0]);
const AZ = qRot(BWQ, [0, 0, 1]);

// 取主导骨骼是 R_Hand 的顶点
const verts = [];
const seenV = new Set();
for (let i = 0; i < M.pos.length / 3; i++) {
  const w = M.skin[i * 3 + 2];
  // 着色器是 mix(boneB, boneA, aSkin.z) → aSkin.z 是**第一根**骨骼的权重
  const d = w > 0.5 ? M.skin[i * 3] : M.skin[i * 3 + 1];
  if (d !== handJ) continue;
  const v = [M.pos[i * 3], M.pos[i * 3 + 1], M.pos[i * 3 + 2]];
  const k = v.map((x) => x.toFixed(4)).join(',');
  if (seenV.has(k)) continue;
  seenV.add(k);
  verts.push(v);
}
// 转到手骨局部坐标
const toLocal = (v) => {
  const d = [v[0] - HB[0], v[1] - HB[1], v[2] - HB[2]];
  return [
    d[0] * AX[0] + d[1] * AX[1] + d[2] * AX[2],
    d[0] * AY[0] + d[1] * AY[1] + d[2] * AY[2],
    d[0] * AZ[0] + d[1] * AZ[1] + d[2] * AZ[2],
  ];
};
const f = (v, n = 3) => '[' + v.map((x) => x.toFixed(n)).join(', ') + ']';

console.log(`R_Hand 骨点(世界) ${f(HB)}   顶点数 ${verts.length}`);
console.log(`局部轴世界方向  X=${f(AX)}  Y=${f(AY)}  Z=${f(AZ)}`);

const L = verts.map(toLocal);
const bb = [0, 1, 2].map((k) => [Math.min(...L.map((v) => v[k])), Math.max(...L.map((v) => v[k]))]);
console.log(`局部包围盒  X ${f(bb[0])}  Y ${f(bb[1])}  Z ${f(bb[2])}`);

const c = [0, 0, 0];
for (const v of L) for (let k = 0; k < 3; k++) c[k] += v[k] / L.length;
console.log(`局部质心    ${f(c)}`);

// 去离群点（指尖尖刺会把质心拽偏），用 18 个核心顶点算"拳头体积中心"
const mean = [0, 1, 2].map((k) => L.reduce((s, v) => s + v[k], 0) / L.length);
const dev = L.map((v) => Math.hypot(...[0, 1, 2].map((k) => v[k] - mean[k])));
const lim = dev.reduce((a, b) => a + b, 0) / dev.length * 2;
const core = L.filter((_, i) => dev[i] <= lim);
const cc0 = [0, 1, 2].map((k) => core.reduce((s, v) => s + v[k], 0) / core.length);
const ccw = [0, 1, 2].map((k) => HB[k] + cc0[0] * AX[k] + cc0[1] * AY[k] + cc0[2] * AZ[k]);
console.log(`核心 ${core.length} 点质心 局部 ${f(cc0)}   世界 ${f(ccw)}   ← 柄轴应该穿过这里`);

// 只统计"主导骨骼是 R_Hand"会漏掉手背/腕部顶点（它们权重在 R_Forearm 上），
// 而视觉上的拳头是整坨。所以按"越过腕关节、朝手的方向"重新圈一遍：
// 前臂骨 → 手骨的方向就是沿手臂向外的方向，超过腕关节的顶点都属于拳头。
const foreJ = J('R_Forearm');
const FB = [R.bindWorld[foreJ * 3], R.bindWorld[foreJ * 3 + 1], R.bindWorld[foreJ * 3 + 2]];
const ad = [0, 1, 2].map((k) => HB[k] - FB[k]);
const al = Math.hypot(...ad), au = ad.map((x) => x / al);
const near = [];
for (let i = 0; i < M.pos.length / 3; i++) {
  const v = [M.pos[i * 3], M.pos[i * 3 + 1], M.pos[i * 3 + 2]];
  const r = [0, 1, 2].map((k) => v[k] - HB[k]);
  const along = r[0] * au[0] + r[1] * au[1] + r[2] * au[2];
  if (along < -0.06 || Math.hypot(...r) > 0.42) continue;
  near.push(v);
}
const nc = [0, 1, 2].map((k) => near.reduce((s, v) => s + v[k], 0) / near.length);
const nbb = [0, 1, 2].map((k) => [Math.min(...near.map((v) => v[k])), Math.max(...near.map((v) => v[k]))]);
console.log(`腕外 ${near.length} 点质心 世界 ${f(nc)}   包围盒 ${nbb.map((b) => f(b, 2)).join(' ')}`);
console.log(`  换算到局部 ${f(toLocal(nc))}   相对腕关节 ${f([0, 1, 2].map((k) => nc[k] - HB[k]))}`);

// 世界坐标下的质心（= 柄轴该穿过的点）
const cw = [0, 1, 2].map((k) => HB[k] + c[0] * AX[k] + c[1] * AY[k] + c[2] * AZ[k]);
console.log(`质心(世界)  ${f(cw)}`);

// 逐顶点列表（按局部 Y 排序，Y 大概是从腕到指尖）
console.log('\n顶点（局部坐标，按 Y 升序）：');
[...L]
  .sort((a, b) => a[1] - b[1])
  .forEach((v, i) => console.log(`  ${String(i).padStart(2)}  X ${v[0].toFixed(3).padStart(7)}  Y ${v[1].toFixed(3).padStart(7)}  Z ${v[2].toFixed(3).padStart(7)}`));

// 沿各轴看"最突出"的点，判断拇指在哪一侧
for (const [name, k] of [['X', 0], ['Y', 1], ['Z', 2]]) {
  const mx = L.reduce((a, b) => (b[k] > a[k] ? b : a));
  const mn = L.reduce((a, b) => (b[k] < a[k] ? b : a));
  console.log(`\n沿局部 ${name}: 最大 ${f(mx)}   最小 ${f(mn)}`);
}

// 当前代码里的柄轴（绑定空间竖直）
const HX = HB[0] - 0.05, HZ = HB[2] + 0.03;
const curLocal = toLocal([HX, HB[1], HZ]);
console.log(`\n当前柄轴穿过点(世界) [${HX.toFixed(3)}, y, ${HZ.toFixed(3)}] → 局部 ${f(curLocal)}`);
console.log(`  与质心的差(世界)  ΔX ${(HX - cw[0]).toFixed(3)}  ΔZ ${(HZ - cw[2]).toFixed(3)}`);

// 姿态后的柄轴：给上臂/手腕加角度，看柄轴是否还穿过拳头
const CH = Math.PI / 180;
function eulerQ(dx, dy, dz) {
  const a = dx * CH * 0.5, o = dy * CH * 0.5, r = dz * CH * 0.5;
  const l = Math.cos(a), cc = Math.cos(o), ff = Math.cos(r);
  const d = Math.sin(a), h = Math.sin(o), u = Math.sin(r);
  return [d * cc * ff + l * h * u, l * h * ff - d * cc * u, l * cc * u - d * h * ff, l * cc * ff + d * h * u];
}
const ROOT_OFF = [0, 1, 2].map((k) => R.bindWorld[k] - R.localPos[k]);
const order = [];
const seen = new Array(N).fill(false);
const visit = (i) => { if (seen[i]) return; const p = R.parent[i]; if (p >= 0) visit(p); seen[i] = true; order.push(i); };
for (let i = 0; i < N; i++) visit(i);
function fk(deltas = {}) {
  const P = new Array(N), Q = new Array(N), dq = new Array(N);
  for (const [k, v] of Object.entries(deltas)) { const i = J(k); if (i >= 0) dq[i] = eulerQ(v[0] || 0, v[1] || 0, v[2] || 0); }
  for (const i of order) {
    const p = R.parent[i];
    const lq = [R.bindQ[i * 4], R.bindQ[i * 4 + 1], R.bindQ[i * 4 + 2], R.bindQ[i * 4 + 3]];
    const q = dq[i] ? qMul(lq, dq[i]) : lq;
    const lp = [R.localPos[i * 3], R.localPos[i * 3 + 1], R.localPos[i * 3 + 2]];
    if (p < 0) { P[i] = [lp[0] + ROOT_OFF[0], lp[1] + ROOT_OFF[1], lp[2] + ROOT_OFF[2]]; Q[i] = q; }
    else { const rp = qRot(Q[p], lp); P[i] = [P[p][0] + rp[0], P[p][1] + rp[1], P[p][2] + rp[2]]; Q[i] = qMul(Q[p], q); }
  }
  return { P, Q };
}
function skinPoint({ P, Q }, j, v) {
  const bw = [R.bindWorld[j * 3], R.bindWorld[j * 3 + 1], R.bindWorld[j * 3 + 2]];
  const bwq = [R.bindWQ[j * 4], R.bindWQ[j * 4 + 1], R.bindWQ[j * 4 + 2], R.bindWQ[j * 4 + 3]];
  const d = qMul(Q[j], qConj(bwq));
  const r = qRot(d, [v[0] - bw[0], v[1] - bw[1], v[2] - bw[2]]);
  return [P[j][0] + r[0], P[j][1] + r[1], P[j][2] + r[2]];
}

const A = Number(process.argv[2] ?? 26), W = Number(process.argv[3] ?? 12);
const deltas = { R_Upperarm: [0, 0, A], L_Upperarm: [0, 0, -A], R_Hand: [0, 0, -W], L_Hand: [0, 0, W] };
const pose = fk(deltas);
const fistNow = L.map((v) => skinPoint(pose, handJ, [HB[0] + v[0] * AX[0] + v[1] * AY[0] + v[2] * AZ[0], HB[1] + v[0] * AX[1] + v[1] * AY[1] + v[2] * AZ[1], HB[2] + v[0] * AX[2] + v[1] * AY[2] + v[2] * AZ[2]]));
const cc = [0, 0, 0];
for (const v of fistNow) for (let k = 0; k < 3; k++) cc[k] += v[k] / fistNow.length;
console.log(`\n摆好姿势后（下放 ${A}° 腕 ${W}°）拳头质心(世界) ${f(cc)}`);
const buttNow = skinPoint(pose, handJ, [HX, HB[1] - 0.46, HZ]);
const topNow = skinPoint(pose, handJ, [HX, HB[1] + 0.92, HZ]);
const ax = [0, 1, 2].map((k) => topNow[k] - buttNow[k]);
const ln = Math.hypot(...ax), u = ax.map((x) => x / ln);
const wv = [0, 1, 2].map((k) => cc[k] - buttNow[k]);
const t = wv[0] * u[0] + wv[1] * u[1] + wv[2] * u[2];
const foot = [0, 1, 2].map((k) => buttNow[k] + u[k] * t);
console.log(`  柄轴 ${f(buttNow)} → ${f(topNow)}  倾角 ${(Math.acos(Math.abs(u[1])) * 180 / Math.PI).toFixed(1)}° 离竖直`);
console.log(`  质心在柄上的位置 ${(t / ln * 100).toFixed(0)}%   垂距 ${Math.hypot(...[0, 1, 2].map((k) => cc[k] - foot[k])).toFixed(3)}`);
