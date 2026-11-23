// 重算杯杯菇蒙皮权重 —— 按"坐标重合分组"，缝两侧强制同权重
//
// 关键事实：网格的 70 个"碎块"不是独立部件，而是一整张连续曲面被拆成了重复顶点
// （3268 个顶点里有 1562 个在别的碎块里存在坐标完全相同的孪生点）。
// 所以只要给缝两侧分配了不同的骨骼，曲面就会张开成裂口。
//
// 做法：
//   1. 按坐标量化分组，坐标重合的顶点归为一组
//   2. 每组按原版权重投票判定骨骼族，组内所有顶点共用同一套权重
//   3. 权重 = 1/(到骨骼线段距离)²，取前二归一化
// 缝两侧权重完全相同 → 无论怎么动都不会张开；纯几何权重又是位置的连续函数
// → 碎块内部也不会突变。
//
// 用法: node tools/reweight.mjs [旧权重文件]
// ⚠ 族判定依赖"原版权重"，所以默认从备份读；备份不存在时用当前权重（会漂）。
import fs from 'fs';

const FILE = 'src/45-mushroom-mesh.js';
const OLD_FILE = process.argv[2] || 'C:/Users/MJ-1903/AppData/Local/Temp/45-mushroom-mesh.bak.js';

let src = fs.readFileSync(FILE, 'utf8');
const oldSrc = fs.existsSync(OLD_FILE) ? fs.readFileSync(OLD_FILE, 'utf8') : src;

const decF = (b) => {
  const x = Buffer.from(b, 'base64');
  return new Float32Array(x.buffer.slice(x.byteOffset, x.byteOffset + x.length));
};
const g = (s, k) => new RegExp(k + ':\\s*"([^"]+)"').exec(s)[1];
const names = JSON.parse(/names:\s*(\[[^\]]+\])/.exec(src)[1]);
const parent = JSON.parse(/parent:\s*(\[[^\]]+\])/.exec(src)[1]);
const pos = decF(g(src, 'pos'));
const bindWorld = decF(g(src, 'bindWorld'));
const oldSkin = decF(g(oldSrc, 'skin'));
const N = names.length;
const V = pos.length / 3;

const bp = (i) => [bindWorld[i * 3], bindWorld[i * 3 + 1], bindWorld[i * 3 + 2]];
const d3 = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

// ── 骨骼线段 ────────────────────────────────────────────
const kids = Array.from({ length: N }, () => []);
for (let i = 0; i < N; i++) if (parent[i] >= 0) kids[parent[i]].push(i);
const SEG = [];
for (let i = 0; i < N; i++) {
  const a = bp(i);
  // 主轴子节点：取"最顺着链条方向"的那个（脊柱继续向上、锁骨指向上臂），
  // 单纯取最远的会把 Spine02 的线段甩到肩膀上
  const pa = parent[i] >= 0 ? bp(parent[i]) : [a[0], a[1] - 1, a[2]];
  let dx = a[0] - pa[0], dy = a[1] - pa[1], dz = a[2] - pa[2];
  const dl = Math.hypot(dx, dy, dz) || 1;
  dx /= dl;
  dy /= dl;
  dz /= dl;
  let best = -1, bd = -1, bs = -2;
  for (const c of kids[i]) {
    const b2 = bp(c);
    const d = d3(a, b2);
    if (d < 0.02) continue;
    const s = ((b2[0] - a[0]) * dx + (b2[1] - a[1]) * dy + (b2[2] - a[2]) * dz) / d;
    if (s > bs) ((bs = s), (bd = d), (best = c));
  }
  if (best < 0)
    for (const c of kids[i]) {
      const d = d3(a, bp(c));
      if (d > bd) ((bd = d), (best = c));
    }
  if (best >= 0 && bd > 0.02) SEG.push([a, bp(best)]);
  else {
    const pp = parent[i] >= 0 ? bp(parent[i]) : [a[0], a[1] - 1, a[2]];
    let d = [a[0] - pp[0], a[1] - pp[1], a[2] - pp[2]];
    const L = Math.hypot(d[0], d[1], d[2]) || 1;
    d = [d[0] / L, d[1] / L, d[2] / L];
    SEG.push([a, [a[0] + d[0] * 0.3, a[1] + d[1] * 0.3, a[2] + d[2] * 0.3]]);
  }
}
const segDist = (v, s) => {
  const [a, b] = s;
  const ab = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
  const ap = [v[0] - a[0], v[1] - a[1], v[2] - a[2]];
  const L2 = ab[0] ** 2 + ab[1] ** 2 + ab[2] ** 2 || 1;
  let t = (ap[0] * ab[0] + ap[1] * ab[1] + ap[2] * ab[2]) / L2;
  t = t < 0 ? 0 : t > 1 ? 1 : t;
  return Math.hypot(ap[0] - ab[0] * t, ap[1] - ab[1] * t, ap[2] - ab[2] * t);
};

// ── 骨骼族 ──────────────────────────────────────────────
const famOf = (n) => {
  if (/head/i.test(n)) return 'head';
  const L = /^l([_.]|eft)/i.test(n);
  if (/(thigh|calf|shin|foot|toe|leg)/i.test(n)) return L ? 'legL' : 'legR';
  if (/(upperarm|forearm|hand|arm|clavicle|shoulder)/i.test(n)) return L ? 'armL' : 'armR';
  return 'torso';
};
const famBones = {};
for (let i = 0; i < N; i++) {
  if (/twist/i.test(names[i])) continue; // 辅助 Twist 骨不参与候选
  const f = famOf(names[i]);
  (famBones[f] || (famBones[f] = [])).push(i);
}
const CENTER = [...(famBones.torso || []), ...(famBones.head || [])];
const allow = {};
for (const f of ['head', 'armL', 'armR', 'legL', 'legR']) allow[f] = [...(famBones[f] || []), ...CENTER];
allow.torso = CENTER;
const ALL_BONES = Array.from({ length: N }, (_, i) => i).filter((i) => !/twist/i.test(names[i]));

// ── 按坐标重合分组 ──────────────────────────────────────
const Q = 1e-3; // 量化到 1mm
const groups = new Map();
for (let v = 0; v < V; v++) {
  const k = `${Math.round(pos[v * 3] / Q)},${Math.round(pos[v * 3 + 1] / Q)},${Math.round(pos[v * 3 + 2] / Q)}`;
  if (!groups.has(k)) groups.set(k, []);
  groups.get(k).push(v);
}

const newSkin = new Float32Array(V * 3);
let single = 0, dual = 0;
const famCount = {};

for (const [, verts] of groups) {
  // 族投票：组内所有顶点（含缝两侧的孪生点）一起投票
  const vote = {};
  let cx = 0, cy = 0, cz = 0;
  for (const v of verts) {
    const b = Math.round(oldSkin[v * 3]);
    const f = famOf(names[b] || '');
    vote[f] = (vote[f] || 0) + 1;
    cx += pos[v * 3];
    cy += pos[v * 3 + 1];
    cz += pos[v * 3 + 2];
  }
  let fam = 'torso', fv = -1;
  for (const [f, k] of Object.entries(vote)) if (k > fv) ((fv = k), (fam = f));
  famCount[fam] = (famCount[fam] || 0) + verts.length;

  let cand = allow[fam];
  if (!cand || !cand.length) cand = ALL_BONES.length ? ALL_BONES : Array.from({ length: N }, (_, i) => i);

  const p = [cx / verts.length, cy / verts.length, cz / verts.length];
  let b0 = cand[0], w0 = -1, b1 = cand[0], w1 = -1;
  for (const b of cand) {
    const w = 1 / (segDist(p, SEG[b]) + 0.02) ** 2;
    if (w > w0) ((w1 = w0), (b1 = b0), (w0 = w), (b0 = b));
    else if (w > w1) ((w1 = w), (b1 = b));
  }
  const s = w0 + w1;
  const isSingle = s <= 0 || w1 < w0 * 0.02;
  for (const v of verts) {
    if (isSingle) {
      ((newSkin[v * 3] = b0), (newSkin[v * 3 + 1] = b0), (newSkin[v * 3 + 2] = 1));
    } else {
      ((newSkin[v * 3] = b0), (newSkin[v * 3 + 1] = b1), (newSkin[v * 3 + 2] = w0 / s));
    }
  }
  if (isSingle) single += verts.length;
  else dual += verts.length;
}

const b64 = (a) => Buffer.from(a.buffer, a.byteOffset, a.byteLength).toString('base64');
const skinM = new RegExp('skin:\\s*"([^"]+)"').exec(src);
src = src.slice(0, skinM.index) + 'skin: "' + b64(newSkin) + '"' + src.slice(skinM.index + skinM[0].length);
fs.writeFileSync(FILE, src);

console.log(`顶点 ${V}，坐标分组 ${groups.size} 组（${V - groups.size} 个重复点被合并）`);
console.log(`蒙皮：单骨 ${single} (${((single / V) * 100).toFixed(0)}%)  双骨 ${dual} (${((dual / V) * 100).toFixed(0)}%)`);
console.log('族分布：', Object.entries(famCount).map(([k, v]) => `${k}=${v}`).join('  '));

const cnt = {};
for (let v = 0; v < V; v++) {
  const a = Math.round(newSkin[v * 3]);
  const w = newSkin[v * 3 + 2];
  const b = w >= 0.5 ? a : Math.round(newSkin[v * 3 + 1]);
  cnt[names[b]] = (cnt[names[b]] || 0) + 1;
}
console.log('\n主骨顶点数：');
for (const [k, v] of Object.entries(cnt).sort((a, b) => b[1] - a[1])) console.log('  ', k.padEnd(18), v);
