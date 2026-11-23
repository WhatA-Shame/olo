// 重算杯杯菇蒙皮权重（不需要原始 GLB，直接改写 src/45-mushroom-mesh.js 里的 skin 字段）
//
// ⚠ 只能跑一次：族判定是拿"当前 skin 的主导骨骼票数"来投票的，跑完权重就变了，
//   再跑一遍族判定会跟着漂。要重跑请先 git checkout src/45-mushroom-mesh.js
//   （或从 tools/glb2hero.mjs 重新生成）。
//
// 背景：该模型是 70 个互不相连的碎片（纸片风格）。原版权重把整片左侧身体面板
// 判给了 L_Thigh（y 0.26~1.05 全归大腿），跑动时大腿一摆，同一碎块内部的顶点
// 被拉到不同骨骼上，碎块就被撕开了。
//
// 做法：
//   1. 按连通块划分碎片，统计每块的骨骼票数，判定它的"族"（头/躯干/左臂/右臂/左腿/右腿）
//   2. 每块只允许该族相关的骨骼参与（菌盖碎块绝不会被手臂骨抢走）
//   3. 权重 = 1/(到骨骼线段距离)^2，取前两根，归一化
//      —— 纯几何权重是位置的连续函数，同一碎块内不会有突变，因此不可能撕裂
import fs from 'fs';

const FILE = 'src/45-mushroom-mesh.js';
let src = fs.readFileSync(FILE, 'utf8');

const decF = (b) => {
  const x = Buffer.from(b, 'base64');
  return new Float32Array(x.buffer.slice(x.byteOffset, x.byteOffset + x.length));
};
const decU = (b) => {
  const x = Buffer.from(b, 'base64');
  return new Uint32Array(x.buffer.slice(x.byteOffset, x.byteOffset + x.length));
};
const field = (k) => {
  const m = new RegExp(k + ':\\s*"([^"]+)"').exec(src);
  if (!m) throw new Error('找不到字段 ' + k);
  return m;
};
const names = JSON.parse(/names:\s*(\[[^\]]+\])/.exec(src)[1]);
const parent = JSON.parse(/parent:\s*(\[[^\]]+\])/.exec(src)[1]);
const posM = field('pos');
const idxM = field('idx');
const skinM = field('skin');
const pos = decF(posM[1]);
const idx = decU(idxM[1]);
const oldSkin = decF(skinM[1]);
const bindWorld = decF(field('bindWorld')[1]);
const N = names.length;
const V = pos.length / 3;

const isTwist = (n) => /Twist/i.test(n);

// ── 骨骼线段 ────────────────────────────────────────────
const children = Array.from({ length: N }, () => []);
for (let i = 0; i < N; i++) if (parent[i] >= 0) children[parent[i]].push(i);
const P = (i) => [bindWorld[i * 3], bindWorld[i * 3 + 1], bindWorld[i * 3 + 2]];
const dist3 = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

// 主轴子节点：取距离最远的子节点（对脊柱=继续向上，对大腿=膝盖，对锁骨=上臂）
function primaryChild(i) {
  let best = -1, bd = -1;
  for (const c of children[i]) {
    const d = dist3(P(i), P(c));
    if (d > bd) ((bd = d), (best = c));
  }
  return best;
}
const SEG = [];
for (let i = 0; i < N; i++) {
  const a = P(i);
  const c = primaryChild(i);
  if (c >= 0 && dist3(a, P(c)) > 0.02) SEG.push([a, P(c)]);
  else {
    // 叶骨骼：沿 父→自身 方向向外延长一小段，给它一点体积
    const pp = parent[i] >= 0 ? P(parent[i]) : [a[0], a[1] - 1, a[2]];
    let d = [a[0] - pp[0], a[1] - pp[1], a[2] - pp[2]];
    const L = Math.hypot(...d) || 1;
    d = d.map((v) => v / L);
    SEG.push([a, [a[0] + d[0] * 0.30, a[1] + d[1] * 0.30, a[2] + d[2] * 0.30]]);
  }
}
function segDist(v, s) {
  const [a, b] = s;
  const ab = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
  const ap = [v[0] - a[0], v[1] - a[1], v[2] - a[2]];
  const L2 = ab[0] ** 2 + ab[1] ** 2 + ab[2] ** 2 || 1;
  let t = (ap[0] * ab[0] + ap[1] * ab[1] + ap[2] * ab[2]) / L2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(ap[0] - ab[0] * t, ap[1] - ab[1] * t, ap[2] - ab[2] * t);
}

// ── 连通块 ──────────────────────────────────────────────
const uf = new Int32Array(V);
for (let i = 0; i < V; i++) uf[i] = i;
const find = (a) => {
  while (uf[a] !== a) ((uf[a] = uf[uf[a]]), (a = uf[a]));
  return a;
};
for (let i = 0; i < idx.length; i += 3) {
  const a = find(idx[i]);
  uf[find(idx[i + 1])] = a;
  uf[find(idx[i + 2])] = a;
}
// 再压一遍保证一致
for (let i = 0; i < V; i++) uf[i] = find(i);
const isl = new Map();
for (let v = 0; v < V; v++) {
  const r = uf[v];
  if (!isl.has(r)) isl.set(r, []);
  isl.get(r).push(v);
}

// ── 族判定 ──────────────────────────────────────────────
const famOfBone = (n) => {
  if (n === 'Head') return 'head';
  if (/Thigh|Calf|Foot|ToeBase/.test(n)) return n.startsWith('L_') ? 'legL' : 'legR';
  if (/Upperarm|Forearm|Hand/.test(n)) return n.startsWith('L_') ? 'armL' : 'armR';
  return 'torso';
};
const TORSO = ['Pelvis', 'Waist', 'Spine01', 'Spine02', 'NeckTwist01', 'NeckTwist02', 'Head', 'L_Clavicle', 'R_Clavicle'];
const byName = (n) => names.indexOf(n);
const ALLOW = {
  head: ['Head', 'NeckTwist02', 'NeckTwist01', 'Spine02'],
  armL: ['L_Clavicle', 'L_Upperarm', 'L_Forearm', 'L_Hand'],
  armR: ['R_Clavicle', 'R_Upperarm', 'R_Forearm', 'R_Hand'],
  legL: ['Pelvis', 'Waist', 'Spine01', 'L_Thigh', 'L_Calf', 'L_Foot', 'L_ToeBase'],
  legR: ['Pelvis', 'Waist', 'Spine01', 'R_Thigh', 'R_Calf', 'R_Foot', 'R_ToeBase'],
  torso: TORSO,
};

// ── 逐块算权重 ──────────────────────────────────────────
const newSkin = new Float32Array(V * 3);
let single = 0, dual = 0;
const famCount = {};

for (const [, verts] of isl) {
  // 原版权重投票
  const vote = {};
  for (const v of verts) {
    const b = Math.round(oldSkin[v * 3]);
    vote[b] = (vote[b] || 0) + 1;
  }
  const famVote = {};
  for (const [b, k] of Object.entries(vote)) {
    const f = famOfBone(names[b]);
    famVote[f] = (famVote[f] || 0) + k;
  }
  let fam = 'torso', fv = -1;
  for (const [f, k] of Object.entries(famVote)) if (k > fv) ((fv = k), (fam = f));
  famCount[fam] = (famCount[fam] || 0) + verts.length;

  // 允许的骨骼（ALLOW 里只列主骨，辅助 Twist 骨天然不在其中）
  const candIdx = [...new Set(ALLOW[fam].map(byName).filter((i) => i >= 0))];

  for (const v of verts) {
    const p = [pos[v * 3], pos[v * 3 + 1], pos[v * 3 + 2]];
    const ws = candIdx.map((b) => {
      const d = segDist(p, SEG[b]);
      return [b, 1 / (d + 0.02) ** 2];
    });
    ws.sort((a, b) => b[1] - a[1]);
    const [b0, w0] = ws[0];
    const [b1, w1] = ws[1] || [b0, 0];
    const s = w0 + w1;
    if (w1 / w0 < 0.02) {
      ((newSkin[v * 3] = b0), (newSkin[v * 3 + 1] = b0), (newSkin[v * 3 + 2] = 1));
      single++;
    } else {
      ((newSkin[v * 3] = b0), (newSkin[v * 3 + 1] = b1), (newSkin[v * 3 + 2] = w0 / s));
      dual++;
    }
  }
}

const b64 = (a) => Buffer.from(a.buffer, a.byteOffset, a.byteLength).toString('base64');
src = src.slice(0, skinM.index) + 'skin: "' + b64(newSkin) + '"' + src.slice(skinM.index + skinM[0].length);
fs.writeFileSync(FILE, src);

console.log(`顶点 ${V}，碎块 ${isl.size} 个`);
console.log(`蒙皮：单骨 ${single} (${((single / V) * 100).toFixed(0)}%)  双骨 ${dual} (${((dual / V) * 100).toFixed(0)}%)`);
console.log('族分布：', Object.entries(famCount).map(([k, v]) => `${k}=${v}`).join('  '));

// 每根骨骼最终占多少顶点
const cnt = {};
for (let v = 0; v < V; v++) {
  const a = Math.round(newSkin[v * 3]);
  const w = newSkin[v * 3 + 2];
  if (w >= 0.5) cnt[names[a]] = (cnt[names[a]] || 0) + 1;
  else cnt[names[Math.round(newSkin[v * 3 + 1])]] = (cnt[names[Math.round(newSkin[v * 3 + 1])]] || 0) + 1;
}
console.log('\n主骨顶点数：');
for (const [k, v] of Object.entries(cnt).sort((a, b) => b[1] - a[1])) console.log('  ', k.padEnd(18), v);
