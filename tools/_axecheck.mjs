// 牛伟握斧探针：离线算「手臂下放角度 → 拳头/斧头世界位置」，不渲染、不起浏览器。
// FK 与引擎一致（localPos + bindQ 逐级累加），误差只在根节点常量偏移上，已补回。
import { heroRig, heroMesh } from '../src/45-niuwei-mesh.js';

const R = heroRig();
const M = heroMesh();
const N = R.names.length;
const J = (k) => R.names.indexOf(k);

// 根节点常量偏移：bindWorld 含它，FK 不含
const ROOT_OFF = [0, 1, 2].map((k) => R.bindWorld[k] - R.localPos[k]);

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
// 引擎 y1(dx,dy,dz) 的 XYZ 欧拉 → 四元数（单位：度）
const CH = Math.PI / 180;
function eulerQ(dx, dy, dz) {
  const a = dx * CH * 0.5, o = dy * CH * 0.5, r = dz * CH * 0.5;
  const l = Math.cos(a), c = Math.cos(o), f = Math.cos(r);
  const d = Math.sin(a), h = Math.sin(o), u = Math.sin(r);
  return [
    d * c * f + l * h * u,
    l * h * f - d * c * u,
    l * c * u - d * h * f,
    l * c * f + d * h * u,
  ];
}

const order = [];
const seen = new Array(N).fill(false);
const visit = (i) => {
  if (seen[i]) return;
  const p = R.parent[i];
  if (p >= 0) visit(p);
  seen[i] = true;
  order.push(i);
};
for (let i = 0; i < N; i++) visit(i);

// deltas: { 骨骼名: [dx,dy,dz] }，与 pose.add 语义一致（右乘，局部轴）
function fk(deltas = {}) {
  const P = new Array(N), Q = new Array(N);
  const dq = new Array(N);
  for (const [k, v] of Object.entries(deltas)) {
    const i = J(k);
    if (i >= 0) dq[i] = eulerQ(v[0] || 0, v[1] || 0, v[2] || 0);
  }
  for (const i of order) {
    const p = R.parent[i];
    const lq = [R.bindQ[i * 4], R.bindQ[i * 4 + 1], R.bindQ[i * 4 + 2], R.bindQ[i * 4 + 3]];
    const q = dq[i] ? qMul(lq, dq[i]) : lq;
    const lp = [R.localPos[i * 3], R.localPos[i * 3 + 1], R.localPos[i * 3 + 2]];
    if (p < 0) {
      P[i] = [lp[0] + ROOT_OFF[0], lp[1] + ROOT_OFF[1], lp[2] + ROOT_OFF[2]];
      Q[i] = q;
    } else {
      const rp = qRot(Q[p], lp);
      P[i] = [P[p][0] + rp[0], P[p][1] + rp[1], P[p][2] + rp[2]];
      Q[i] = qMul(Q[p], q);
    }
  }
  return { P, Q };
}

// 刚性蒙皮：把绑定空间顶点变换到当前姿态
function skinPoint({ P, Q }, j, v) {
  const bw = [R.bindWorld[j * 3], R.bindWorld[j * 3 + 1], R.bindWorld[j * 3 + 2]];
  const bwq = [R.bindWQ[j * 4], R.bindWQ[j * 4 + 1], R.bindWQ[j * 4 + 2], R.bindWQ[j * 4 + 3]];
  const d = qMul(Q[j], qConj(bwq));
  const r = qRot(d, [v[0] - bw[0], v[1] - bw[1], v[2] - bw[2]]);
  return [P[j][0] + r[0], P[j][1] + r[1], P[j][2] + r[2]];
}

const handJ = J('R_Hand');
const HB = [R.bindWorld[handJ * 3], R.bindWorld[handJ * 3 + 1], R.bindWorld[handJ * 3 + 2]];
// 斧头在绑定空间的生成参数（与 bNw 里的 botY/topY 对应，外加握把修正 GX/GZ）
const LIFT = Number(process.argv[3] ?? 0); // 整把斧头沿柄轴上移量
const GX = Number(process.argv[4] ?? 0.052); // 往拳心挪的 x
const GZ = Number(process.argv[5] ?? 0.062); // 往拳心挪的 z
const BOT = HB[1] - 0.72 + LIFT, TOP = HB[1] + 0.66 + LIFT;
const SHX = HB[0] + GX, SHZ = HB[2] + GZ;

// 拳头顶点（主导骨骼是 R_Hand）
const fist = [];
for (let i = 0; i < M.pos.length / 3; i++) {
  const w = M.skin[i * 3 + 2];
  const d = w > 0.5 ? M.skin[i * 3 + 1] : M.skin[i * 3];
  if (d !== handJ) continue;
  fist.push([M.pos[i * 3], M.pos[i * 3 + 1], M.pos[i * 3 + 2]]);
}

const f = (v) => v.map((x) => x.toFixed(3)).join(',');
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

function report(label, deltas) {
  const pose = fk(deltas);
  const hp = pose.P[handJ];
  let c = [0, 0, 0];
  for (const v of fist) {
    const p = skinPoint(pose, handJ, v);
    c[0] += p[0]; c[1] += p[1]; c[2] += p[2];
  }
  c = c.map((x) => x / fist.length);
  const butt = skinPoint(pose, handJ, [SHX, BOT, SHZ]);
  const headBase = skinPoint(pose, handJ, [SHX, TOP, SHZ]);
  // 刃口范围（斧刃轮廓相对柄顶的最大外扩：-0.58 外 / +0.24 内，上下 ±0.44）
  const bladeOut = skinPoint(pose, handJ, [SHX - 0.58, TOP + 0.18, SHZ]);
  const bladeIn = skinPoint(pose, handJ, [SHX + 0.24, TOP - 0.1, SHZ]);
  const bladeTop = skinPoint(pose, handJ, [SHX, TOP + 0.4, SHZ]);
  // 柄轴到拳心的距离（把拳心投影到柄轴上算垂距）
  const ax = [0, 1, 2].map((k) => headBase[k] - butt[k]);
  const L = Math.hypot(...ax);
  const u = ax.map((x) => x / L);
  const w = [0, 1, 2].map((k) => c[k] - butt[k]);
  const t = w[0] * u[0] + w[1] * u[1] + w[2] * u[2];
  const foot = [0, 1, 2].map((k) => butt[k] + u[k] * t);
  const perp = dist(c, foot);
  // 刃面离手臂骨骼的最近距离（判断会不会插进前臂/上臂）
  let armGap = 1e9, armWho = '';
  for (const nm of ['R_Forearm', 'R_Upperarm', 'R_Hand']) {
    const j = J(nm);
    const a = pose.P[j], b = pose.P[R.parent[j] >= 0 ? R.parent[j] : j];
    for (const pt of [bladeOut, bladeIn, bladeTop]) {
      // 点到线段距离
      const ab = [0, 1, 2].map((k) => b[k] - a[k]);
      const ap = [0, 1, 2].map((k) => pt[k] - a[k]);
      const ll = ab[0] ** 2 + ab[1] ** 2 + ab[2] ** 2 || 1;
      const tt = Math.max(0, Math.min(1, (ap[0] * ab[0] + ap[1] * ab[1] + ap[2] * ab[2]) / ll));
      const d = dist(pt, [0, 1, 2].map((k) => a[k] + ab[k] * tt));
      if (d < armGap) { armGap = d; armWho = nm; }
    }
  }
  console.log(`\n${label}`);
  console.log(`  拳心   [${f(c)}]  手骨 [${f(hp)}]`);
  console.log(`  柄底   [${f(butt)}]   柄顶 [${f(headBase)}]  柄长 ${L.toFixed(2)}`);
  console.log(`  刃外缘 [${f(bladeOut)}]  刃内缘 [${f(bladeIn)}]  刃顶 [${f(bladeTop)}]`);
  console.log(`  拳心在柄上的位置 ${(t / L * 100).toFixed(0)}%（0=柄底 100=柄顶）  垂距 ${perp.toFixed(3)}`);
  console.log(`  刃面离手臂最近 ${armGap.toFixed(3)}（${armWho}）`);
  return { c, butt, headBase, perp, t, L };
}

const A = Number(process.argv[2] ?? 28);
const W = Number(process.argv[6] ?? Math.round(A * 0.75));
report('绑定姿态（现状）', {});
report(`双臂下放 ${A}°`, { R_Upperarm: [0, 0, A], L_Upperarm: [0, 0, -A] });
report(`双臂下放 ${A}° + 手腕回正 ${W}°`, {
  R_Upperarm: [0, 0, A], L_Upperarm: [0, 0, -A],
  R_Hand: [0, 0, -W], L_Hand: [0, 0, W],
});
