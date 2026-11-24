// glb2hero.mjs — 把 glTF/GLB 转成可内联的网格 + 骨架 + 动画数据模块
//
// 用法:
//   node tools/glb2hero.mjs "<模型.glb>" src/45-<name>-mesh.js --scale 2.0 [--rotY 270]
//        [--anims run,box_01,fire,hit_to_head,fall] [--fps 30]
//
// 产出三份数据：
//   HERO_MESH  pos/nor/uv/idx/tex + skin(每顶点 2 骨骼 + 权重)
//   HERO_RIG   names/parent/bindWorld/bindQ（引擎 Wa 骨架用）
//   HERO_ANIM  每段动画按固定帧率重采样，每帧每关节 (pos3 + quat4)
//
// 为什么重采样：glTF 每段动画的 channel 帧数不一致、插值模式也不同，
// 运行时再解 sampler 又慢又容易出错；统一重采样成固定 fps 后，引擎只做线性插值。
import fs from 'node:fs';
import path from 'node:path';

const [, , src, out, ...rest] = process.argv;
if (!src || !out) {
  console.error('用法: node tools/glb2hero.mjs <in.glb> <out.js> [--scale 2] [--rotY deg] [--anims a,b] [--fps 30]');
  process.exit(1);
}
const argOf = (k, d) => {
  const i = rest.indexOf(k);
  return i >= 0 ? Number(rest[i + 1]) : d;
};
const SCALE = argOf('--scale', 2);
const ROTY = (argOf('--rotY', 0) * Math.PI) / 180;
const FPS = argOf('--fps', 30);
const WANT = (() => {
  const i = rest.indexOf('--anims');
  return i >= 0 ? rest[i + 1].split(',') : null;
})();
const FLIP = rest.includes('--flip');

const buf = fs.readFileSync(src);
if (buf.toString('ascii', 0, 4) !== 'glTF') throw new Error('不是 GLB');
let off = 12, json = null, bin = null;
while (off < buf.length) {
  const len = buf.readUInt32LE(off);
  const type = buf.toString('ascii', off + 4, off + 8);
  if (type === 'JSON') json = JSON.parse(buf.toString('utf8', off + 8, off + 8 + len));
  else if (type.startsWith('BIN')) bin = buf.subarray(off + 8, off + 8 + len);
  off += 8 + len;
}

const COMP = { 5120: Int8Array, 5121: Uint8Array, 5122: Int16Array, 5123: Uint16Array, 5125: Uint32Array, 5126: Float32Array };
const NUM = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT4: 16 };
const READ = {
  5120: (dv, o) => dv.getInt8(o), 5121: (dv, o) => dv.getUint8(o),
  5122: (dv, o) => dv.getInt16(o, true), 5123: (dv, o) => dv.getUint16(o, true),
  5125: (dv, o) => dv.getUint32(o, true), 5126: (dv, o) => dv.getFloat32(o, true),
};

function acc(i) {
  const a = json.accessors[i];
  const bv = json.bufferViews[a.bufferView];
  const n = NUM[a.type];
  const base = bin.byteOffset + (bv.byteOffset || 0) + (a.byteOffset || 0);
  const el = COMP[a.componentType].BYTES_PER_ELEMENT;
  const stride = bv.byteStride || n * el;
  const dv = new DataView(bin.buffer);
  const rd = READ[a.componentType];
  const out = new Float64Array(a.count * n);
  for (let k = 0; k < a.count; k++) {
    for (let c = 0; c < n; c++) out[k * n + c] = rd(dv, base + k * stride + c * el);
  }
  return out;
}

// ── 四元数 ───────────────────────────────────────────────
function qmul(a, b) {
  return [
    a[3] * b[0] + a[0] * b[3] + a[1] * b[2] - a[2] * b[1],
    a[3] * b[1] - a[0] * b[2] + a[1] * b[3] + a[2] * b[0],
    a[3] * b[2] + a[0] * b[1] - a[1] * b[0] + a[2] * b[3],
    a[3] * b[3] - a[0] * b[0] - a[1] * b[1] - a[2] * b[2],
  ];
}
function rot(q, v) {
  const [x, y, z, w] = q;
  const ix = w * v[0] + y * v[2] - z * v[1];
  const iy = w * v[1] + z * v[0] - x * v[2];
  const iz = w * v[2] + x * v[1] - y * v[0];
  const iw = -x * v[0] - y * v[1] - z * v[2];
  return [
    ix * w + iw * -x + iy * -z - iz * -y,
    iy * w + iw * -y + iz * -x - ix * -z,
    iz * w + iw * -z + ix * -y - iy * -x,
  ];
}
function qnorm(q) {
  const l = Math.hypot(q[0], q[1], q[2], q[3]) || 1;
  return [q[0] / l, q[1] / l, q[2] / l, q[3] / l];
}

// ── 节点变换 ─────────────────────────────────────────────
function localTRS(n) {
  if (n.matrix) {
    const m = n.matrix;
    const sx = Math.hypot(m[0], m[1], m[2]);
    const sy = Math.hypot(m[4], m[5], m[6]);
    const sz = Math.hypot(m[8], m[9], m[10]);
    const r = [m[0] / sx, m[1] / sx, m[2] / sx, m[4] / sy, m[5] / sy, m[6] / sy, m[8] / sz, m[9] / sz, m[10] / sz];
    const tr = r[0] + r[4] + r[8];
    let q;
    if (tr > 0) {
      const s = Math.sqrt(tr + 1) * 2;
      q = [(r[7] - r[5]) / s, (r[2] - r[6]) / s, (r[3] - r[1]) / s, 0.25 * s];
    } else if (r[0] > r[4] && r[0] > r[8]) {
      const s = Math.sqrt(1 + r[0] - r[4] - r[8]) * 2;
      q = [0.25 * s, (r[1] + r[3]) / s, (r[2] + r[6]) / s, (r[7] - r[5]) / s];
    } else if (r[4] > r[8]) {
      const s = Math.sqrt(1 + r[4] - r[0] - r[8]) * 2;
      q = [(r[1] + r[3]) / s, 0.25 * s, (r[5] + r[7]) / s, (r[2] - r[6]) / s];
    } else {
      const s = Math.sqrt(1 + r[8] - r[0] - r[4]) * 2;
      q = [(r[2] + r[6]) / s, (r[5] + r[7]) / s, 0.25 * s, (r[3] - r[1]) / s];
    }
    return { t: [m[12], m[13], m[14]], q, s: [sx, sy, sz] };
  }
  return {
    t: n.translation || [0, 0, 0],
    q: n.rotation || [0, 0, 0, 1],
    s: n.scale || [1, 1, 1],
  };
}

const nodeParent = new Array(json.nodes.length).fill(-1);
json.nodes.forEach((n, i) => (n.children || []).forEach((c) => (nodeParent[c] = i)));

function worldOf(i, cache) {
  if (cache[i]) return cache[i];
  const { t, q, s } = localTRS(json.nodes[i]);
  const p = nodeParent[i];
  if (p < 0) return (cache[i] = { pos: [...t], q: [...q], s: [...s] });
  const pw = worldOf(p, cache);
  const v = rot(pw.q, [t[0] * pw.s[0], t[1] * pw.s[1], t[2] * pw.s[2]]);
  return (cache[i] = {
    pos: [pw.pos[0] + v[0], pw.pos[1] + v[1], pw.pos[2] + v[2]],
    q: qmul(pw.q, q),
    s: [pw.s[0] * s[0], pw.s[1] * s[1], pw.s[2] * s[2]],
  });
}

// ── 骨架 ─────────────────────────────────────────────────
const ca = Math.cos(ROTY), sa = Math.sin(ROTY);
const skin = json.skins && json.skins[0];
let RIG = null;
if (skin) {
  const joints = skin.joints;
  const cache = {};
  const jindex = new Map(joints.map((n, i) => [n, i]));
  // skin.joints 按拓扑序排列（父在前），父不在 joints 里的向上找最近一个
  const parent = joints.map((n) => {
    let p = nodeParent[n];
    while (p >= 0 && !jindex.has(p)) p = nodeParent[p];
    return p >= 0 ? jindex.get(p) : -1;
  });

  const bindWorld = [], bindQ = [], localPos = [], bindWQ = [];
  for (let i = 0; i < joints.length; i++) {
    const w = worldOf(joints[i], cache);
    let [x, y, z] = w.pos.map((v) => v * SCALE);
    if (ROTY) [x, z] = [x * ca + z * sa, -x * sa + z * ca];
    bindWorld.push(x, y, z);
    // 世界四元数：整体旋转作用在左边，所以 q' = qY(ROTY) * q
    const wq = qnorm(ROTY ? qmul([0, Math.sin(ROTY / 2), 0, Math.cos(ROTY / 2)], w.q) : w.q);
    bindWQ.push(...wq);
    const lt = localTRS(json.nodes[joints[i]]);
    bindQ.push(...qnorm(lt.q));
    // 局部位移是父坐标系下的量，整体旋转不影响它
    localPos.push(lt.t[0] * SCALE, lt.t[1] * SCALE, lt.t[2] * SCALE);
  }
  // 整体旋转只能作用在根关节：顶点预变换会把世界旋转抵消掉，
  // 所以要把它重新放进根关节的局部四元数里，骨架才是转过的姿态
  const rootI = parent.indexOf(-1);
  if (ROTY && rootI >= 0) {
    const qy = [0, Math.sin(ROTY / 2), 0, Math.cos(ROTY / 2)];
    const rq = qmul(qy, [bindQ[rootI * 4], bindQ[rootI * 4 + 1], bindQ[rootI * 4 + 2], bindQ[rootI * 4 + 3]]);
    ((bindQ[rootI * 4] = rq[0]), (bindQ[rootI * 4 + 1] = rq[1]),
      (bindQ[rootI * 4 + 2] = rq[2]), (bindQ[rootI * 4 + 3] = rq[3]));
  }
  RIG = {
    names: joints.map((n) => json.nodes[n].name || `j${n}`),
    parent,
    bindWorld,
    bindQ,
    localPos,
    bindWQ,
    rootI,
  };
}

// ── 顶点 ─────────────────────────────────────────────────
// 顶点保持在"绑定世界空间"（只做了 SCALE 和 ROTY）。骨骼侧由引擎现算
// M = T(worldPos)·R(worldQ)·R(bindQW)⁻¹·T(-bindWorld)，等价于标准线性混合蒙皮，
// 两根骨骼吃同一份坐标，所以双骨骼不会撕裂，也不用把顶点预变换到骨骼局部空间。
//
// 权重处理策略（消除撕裂）：
// 这类低模的网格是许多互不相连的碎片。撕裂只可能发生在同一碎片内部 ——
// 同一碎块的相邻顶点被分到完全不同的骨骼，碎块就被拉开。所以分两步：
//   1. 按连通块判定每个碎片的"骨骼族"（头/躯干/左右臂/左右腿）
//   2. 每片只允许本族骨骼参与，权重 = 1/(到骨骼线段距离)²，取前二归一化
// 纯几何权重是顶点位置的连续函数，同一碎块内不可能出现突变 → 结构上不可能撕裂。
const P = [], N = [], U = [], I = [], SK = [];
const domBone = []; // 每个顶点：原版权重最大的那根骨骼，用于按碎块投票
let vBase = 0;
for (const mesh of json.meshes) {
  for (const prim of mesh.primitives) {
    const at = prim.attributes;
    if (at.POSITION == null) continue;
    const pos = acc(at.POSITION);
    const nor = at.NORMAL != null ? acc(at.NORMAL) : null;
    const uv = at.TEXCOORD_0 != null ? acc(at.TEXCOORD_0) : null;
    const jt = at.JOINTS_0 != null ? acc(at.JOINTS_0) : null;
    const wt = at.WEIGHTS_0 != null ? acc(at.WEIGHTS_0) : null;
    const cnt = pos.length / 3;
    for (let i = 0; i < cnt; i++) {
      let x = pos[i * 3] * SCALE, y = pos[i * 3 + 1] * SCALE, z = pos[i * 3 + 2] * SCALE;
      if (ROTY) [x, z] = [x * ca + z * sa, -x * sa + z * ca];
      P.push(x, y, z);
      if (nor) {
        let nx = nor[i * 3], ny = nor[i * 3 + 1], nz = nor[i * 3 + 2];
        if (ROTY) [nx, nz] = [nx * ca + nz * sa, -nx * sa + nz * ca];
        N.push(nx, ny, nz);
      } else N.push(0, 1, 0);
      if (uv) U.push(uv[i * 2], uv[i * 2 + 1]);
      else U.push(0, 0);

      if (jt && wt) {
        let best = 0, bw = -1;
        for (let k = 0; k < 4; k++) {
          const w = wt[i * 4 + k];
          if (w > bw) ((bw = w), (best = jt[i * 4 + k]));
        }
        domBone.push(best);
      } else domBone.push(0);
    }
    const idx = prim.indices != null ? acc(prim.indices) : null;
    if (idx) {
      for (let i = 0; i < idx.length; i += 3) {
        const a = idx[i] + vBase, b = idx[i + 1] + vBase, c = idx[i + 2] + vBase;
        if (FLIP) I.push(a, c, b);
        else I.push(a, b, c);
      }
    } else {
      for (let i = 0; i < cnt; i += 3) I.push(i + vBase, i + vBase + 1, i + vBase + 2);
    }
    vBase += cnt;
  }
}

// ── 蒙皮权重：按碎片重算 ─────────────────────────────────
const nV = P.length / 3;
let skinSingle = 0, skinDual = 0, islandCount = 0;
SK.length = nV * 3;
if (!skin) {
  for (let v = 0; v < nV; v++) ((SK[v * 3] = 0), (SK[v * 3 + 1] = 0), (SK[v * 3 + 2] = 1));
} else {
  const bname = RIG.names;
  const nB = bname.length;
  const BW = RIG.bindWorld;
  const bp = (i) => [BW[i * 3], BW[i * 3 + 1], BW[i * 3 + 2]];
  const d3 = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

  // 骨骼线段：自身 → 距离最远的子节点（脊柱继续向上、大腿指向膝盖、锁骨指向上臂）。
  // 叶骨骼没有子节点，沿 父→自身 方向外延一小段，给它一点体积。
  const kids = Array.from({ length: nB }, () => []);
  for (let i = 0; i < nB; i++) if (RIG.parent[i] >= 0) kids[RIG.parent[i]].push(i);
  const SEG = [];
  for (let i = 0; i < nB; i++) {
    const a = bp(i);
    let best = -1, bd = -1;
    for (const c of kids[i]) {
      const d = d3(a, bp(c));
      if (d > bd) ((bd = d), (best = c));
    }
    if (best >= 0 && bd > 0.02) SEG.push([a, bp(best)]);
    else {
      const pp = RIG.parent[i] >= 0 ? bp(RIG.parent[i]) : [a[0], a[1] - 1, a[2]];
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

  // 骨骼族（按命名判定，Twist 辅助骨会自然归到它所属的肢体）
  const famOf = (n) => {
    if (/head/i.test(n)) return 'head';
    const L = /^l([_.]|eft)/i.test(n);
    if (/(thigh|calf|shin|foot|toe|leg)/i.test(n)) return L ? 'legL' : 'legR';
    if (/(upperarm|forearm|hand|arm)/i.test(n)) return L ? 'armL' : 'armR';
    return 'torso';
  };
  // 辅助 Twist 骨不参与候选：它和主骨几乎重合，占掉第二个骨骼槽没有意义
  const famBones = {};
  for (let i = 0; i < nB; i++) {
    if (/twist/i.test(bname[i])) continue;
    const f = famOf(bname[i]);
    (famBones[f] || (famBones[f] = [])).push(i);
  }
  // 中轴链 = 躯干 + 头（头紧接脖子，同属中轴，必须能互相过渡）
  const CENTER = [...(famBones.torso || []), ...(famBones.head || [])];
  // 每族允许的骨骼 = 本族 + 中轴（肢体要能平滑过渡到身体）
  const allow = {};
  for (const f of ['head', 'armL', 'armR', 'legL', 'legR']) allow[f] = [...(famBones[f] || []), ...CENTER];
  allow.torso = CENTER;
  const ALL_BONES = Array.from({ length: nB }, (_, i) => i).filter((i) => !/twist/i.test(bname[i]));

  // 连通块
  const uf = new Int32Array(nV);
  for (let i = 0; i < nV; i++) uf[i] = i;
  const find = (a) => {
    while (uf[a] !== a) ((uf[a] = uf[uf[a]]), (a = uf[a]));
    return a;
  };
  for (let i = 0; i < I.length; i += 3) {
    const r = find(I[i]);
    uf[find(I[i + 1])] = r;
    uf[find(I[i + 2])] = r;
  }
  const islands = new Map();
  for (let v = 0; v < nV; v++) {
    const r = find(v);
    if (!islands.has(r)) islands.set(r, []);
    islands.get(r).push(v);
  }
  islandCount = islands.size;

  for (const [, verts] of islands) {
    // 按原版权重投票决定这一碎片的族
    const vote = {};
    for (const v of verts) {
      const f = famOf(bname[domBone[v]] || '');
      vote[f] = (vote[f] || 0) + 1;
    }
    let fam = 'torso', fv = -1;
    for (const [f, k] of Object.entries(vote)) if (k > fv) ((fv = k), (fam = f));
    let cand = allow[fam];
    if (!cand || !cand.length) cand = ALL_BONES.length ? ALL_BONES : Array.from({ length: nB }, (_, i) => i);

    for (const v of verts) {
      const p = [P[v * 3], P[v * 3 + 1], P[v * 3 + 2]];
      let b0 = cand[0], w0 = -1, b1 = cand[0], w1 = -1;
      for (const b of cand) {
        const w = 1 / (segDist(p, SEG[b]) + 0.02) ** 2;
        if (w > w0) ((w1 = w0), (b1 = b0), (w0 = w), (b0 = b));
        else if (w > w1) ((w1 = w), (b1 = b));
      }
      const s = w0 + w1;
      if (s <= 0 || w1 < w0 * 0.02) {
        ((SK[v * 3] = b0), (SK[v * 3 + 1] = b0), (SK[v * 3 + 2] = 1));
        skinSingle++;
      } else {
        ((SK[v * 3] = b0), (SK[v * 3 + 1] = b1), (SK[v * 3 + 2] = w0 / s));
        skinDual++;
      }
    }
  }
}

// ── 动画重采样 ───────────────────────────────────────────
function sampleAnim(anim) {
  const jindex = new Map(skin.joints.map((n, i) => [n, i]));
  const tracks = new Map();
  let dur = 0;
  for (const ch of anim.channels) {
    const p = ch.target.path;
    if (p !== 'translation' && p !== 'rotation') continue;
    const j = jindex.get(ch.target.node);
    if (j == null) continue;
    const s = anim.samplers[ch.sampler];
    const times = acc(s.input);
    const vals = acc(s.output);
    const step = p === 'rotation' ? 4 : 3;
    const arr = [];
    for (let k = 0; k < times.length; k++) arr.push([times[k], Array.from(vals.slice(k * step, k * step + step))]);
    dur = Math.max(dur, times[times.length - 1]);
    const cur = tracks.get(j) || {};
    cur[p === 'rotation' ? 'r' : 't'] = arr;
    tracks.set(j, cur);
  }
  const frames = Math.max(2, Math.round(dur * FPS) + 1);
  const data = new Float32Array(frames * skin.joints.length * 7);
  // 引擎 pose 是"相对绑定姿态的偏移"：位置做差、四元数做相对旋转
  const bindLocal = [], bindQ = [];
  for (const nodeIdx of skin.joints) {
    const lt = localTRS(json.nodes[nodeIdx]);
    bindLocal.push([lt.t[0] * SCALE, lt.t[1] * SCALE, lt.t[2] * SCALE]);
    bindQ.push(qnorm(lt.q));
  }
  const pick = (arr, t, isQuat) => {
    if (!arr || !arr.length) return null;
    if (t <= arr[0][0]) return arr[0][1];
    if (t >= arr[arr.length - 1][0]) return arr[arr.length - 1][1];
    let lo = 0, hi = arr.length - 1;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (arr[mid][0] <= t) lo = mid;
      else hi = mid;
    }
    const [t0, v0] = arr[lo], [t1, v1] = arr[hi];
    const f = t1 === t0 ? 0 : (t - t0) / (t1 - t0);
    const o = new Array(v0.length);
    for (let k = 0; k < v0.length; k++) o[k] = v0[k] + (v1[k] - v0[k]) * f;
    return isQuat ? qnorm(o) : o;
  };
  for (let f = 0; f < frames; f++) {
    const t = (f / (frames - 1)) * dur;
    for (let j = 0; j < skin.joints.length; j++) {
      const tr = tracks.get(j) || {};
      const rest = localTRS(json.nodes[skin.joints[j]]);
      const p = pick(tr.t, t, false) || rest.t;
      const q = pick(tr.r, t, true) || rest.q;
      const o = (f * skin.joints.length + j) * 7;
      const bl = bindLocal[j];
      data[o] = p[0] * SCALE - bl[0];
      data[o + 1] = p[1] * SCALE - bl[1];
      data[o + 2] = p[2] * SCALE - bl[2];
      // 存绝对局部四元数：引擎 solve 里 worldQ = parentWorldQ * pose.q，
      // 绑定姿态下累积出来正好等于 bind 的世界四元数
      let qq = q;
      if (ROTY && j === RIG.rootI) {
        qq = qnorm(qmul([0, Math.sin(ROTY / 2), 0, Math.cos(ROTY / 2)], q));
      }
      data[o + 3] = qq[0];
      data[o + 4] = qq[1];
      data[o + 5] = qq[2];
      data[o + 6] = qq[3];
    }
  }
  // in-place：彻底剥离根位移，只留关节摆动。
  // 问题：Tripo 烘焙在 Hip 上的前进位移不是纯线性的（步态有加速减速），
  // 只减首尾线性漂移会留下非线性残余，让模型在跑步时持续偏移（"位移超出"）。
  // 做法：
  //   a) 减首尾线性漂移（去掉整体平移趋势）
  //   b) 每根骨骼再减去自己的首帧偏移（让循环首帧 = 绑定姿态，消除恒定偏移）
  //   c) 根关节水平归零、垂直只留相对首帧的起伏
  for (let j = 0; j < skin.joints.length; j++) {
    const o0 = j * 7,
      oN = ((frames - 1) * skin.joints.length + j) * 7;
    const dx = data[oN] - data[o0],
      dy = data[oN + 1] - data[o0 + 1],
      dz = data[oN + 2] - data[o0 + 2];
    if (Math.abs(dx) + Math.abs(dy) + Math.abs(dz) < 1e-5) continue;
    for (let f = 0; f < frames; f++) {
      const o = (f * skin.joints.length + j) * 7,
        k = frames > 1 ? f / (frames - 1) : 0;
      ((data[o] -= dx * k), (data[o + 1] -= dy * k), (data[o + 2] -= dz * k));
    }
  }
  // 每根骨骼减去首帧偏移：让动画从绑定姿态开始，消除残余恒定偏移
  for (let j = 0; j < skin.joints.length; j++) {
    const o0 = j * 7,
      bx = data[o0], by = data[o0 + 1], bz = data[o0 + 2];
    for (let f = 0; f < frames; f++) {
      const o = (f * skin.joints.length + j) * 7;
      ((data[o] -= bx), (data[o + 1] -= by), (data[o + 2] -= bz));
    }
  }
  // 根关节归零：水平位移直接不要
  if (RIG) {
    const rj = RIG.rootI;
    for (let f = 0; f < frames; f++) {
      const o = (f * skin.joints.length + rj) * 7;
      ((data[o] = 0), (data[o + 2] = 0));
    }
  }
  return { frames, dur, data };
}

const ANIMS = {};
if (skin && json.animations) {
  for (const a of json.animations) {
    if (WANT && !WANT.includes(a.name)) continue;
    ANIMS[a.name] = sampleAnim(a);
  }
}

// ── 贴图 ─────────────────────────────────────────────────
// 顺便把宽高读出来：heroMap() 的占位图必须和真实贴图同尺寸（见那边的注释）
function imageSize(bytes, mime) {
  if (mime === 'image/png') return [bytes.readUInt32BE(16), bytes.readUInt32BE(20)];
  for (let i = 2; i < bytes.length - 9; ) {
    if (bytes[i] !== 0xff) {
      i++;
      continue;
    }
    const mk = bytes[i + 1];
    // SOF0..SOF15（跳过 DHT/JPG/DAC）
    if (mk >= 0xc0 && mk <= 0xcf && mk !== 0xc4 && mk !== 0xc8 && mk !== 0xcc)
      return [bytes.readUInt16BE(i + 7), bytes.readUInt16BE(i + 5)];
    i += 2 + bytes.readUInt16BE(i + 2);
  }
  return [512, 512];
}

let texData = '';
let texW = 512,
  texH = 512;
const mat0 = (json.materials || []).find((m) => m.pbrMetallicRoughness && m.pbrMetallicRoughness.baseColorTexture);
if (mat0) {
  const tex = json.textures[mat0.pbrMetallicRoughness.baseColorTexture.index];
  const img = json.images[tex.source];
  const bv = json.bufferViews[img.bufferView];
  const bytes = bin.subarray(bv.byteOffset || 0, (bv.byteOffset || 0) + bv.byteLength);
  const mime = img.mimeType || 'image/jpeg';
  [texW, texH] = imageSize(bytes, mime);
  texData = `data:${mime};base64,${Buffer.from(bytes).toString('base64')}`;
}

const b64 = (arr) => Buffer.from(arr.buffer, arr.byteOffset, arr.byteLength).toString('base64');
const animBody = Object.entries(ANIMS)
  .map(([k, v]) => `  ${JSON.stringify(k)}: { frames: ${v.frames}, dur: ${v.dur.toFixed(3)}, fps: ${FPS}, data: "${b64(v.data)}" },`)
  .join('\n');

const body = `// ${path.basename(src)} → 内联网格/骨架/动画（由 tools/glb2hero.mjs 生成，勿手改）
// 顶点 ${P.length / 3}，三角 ${I.length / 3}，关节 ${RIG ? RIG.names.length : 0}，动画 ${Object.keys(ANIMS).length} 段
// 贴图 ${texData ? Math.round(texData.length / 1024) + 'KB base64' : '无'}
import { Vs } from './05-three.js';

const dec = (b64, T) => {
  const bin = atob(b64);
  const u8 = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
  return new T(u8.buffer);
};

let _mesh = null;
// 贴图尺寸：heroMap() 的占位图必须用同一个尺寸（原因见 heroMap 里的注释）
const TEX_W = ${texW},
  TEX_H = ${texH};
export function heroMesh() {
  return (_mesh ??= {
    pos: dec(HERO_MESH.pos, Float32Array),
    nor: dec(HERO_MESH.nor, Float32Array),
    uv: dec(HERO_MESH.uv, Float32Array),
    idx: dec(HERO_MESH.idx, Uint32Array),
    skin: dec(HERO_MESH.skin, Float32Array),
  });
}

let _rig = null;
export function heroRig() {
  return (_rig ??= {
    names: HERO_RIG.names,
    parent: HERO_RIG.parent,
    bindWorld: dec(HERO_RIG.bindWorld, Float32Array),
    bindQ: dec(HERO_RIG.bindQ, Float32Array),
    bindWQ: dec(HERO_RIG.bindWQ, Float32Array),
    localPos: dec(HERO_RIG.localPos, Float32Array),
  });
}

const _anims = {};
export function heroAnim(name) {
  const a = HERO_ANIM[name];
  if (!a) return null;
  return (_anims[name] ??= { frames: a.frames, dur: a.dur, fps: a.fps, data: dec(a.data, Float32Array) });
}
export function heroAnimNames() {
  return Object.keys(HERO_ANIM);
}

let _map = null;
export function heroMap() {
  if (_map) return _map;
  const tex = new Vs();
  // glTF 的 UV 原点在左上，three 默认 flipY=true 会把它上下翻过来
  tex.flipY = false;
  const c = document.createElement('canvas');
  // 占位图必须和真实贴图同尺寸：three 的 texStorage2D 是不可变存储，
  // 第一次上传按占位图尺寸分配，之后换图只走 texSubImage2D ——
  // 尺寸对不上就被整张丢弃，模型永远停在占位色（就是"白模"的由来）。
  c.width = TEX_W;
  c.height = TEX_H;
  const g = c.getContext('2d');
  // 占位色用近似肤色而不是纯白：贴图还没解码完时，立绘/头像至少不是刺眼的白模
  g.fillStyle = '#c9a888';
  g.fillRect(0, 0, TEX_W, TEX_H);
  tex.image = c;
  tex.needsUpdate = true;
  if (HERO_MESH.tex) {
    const img = new Image();
    img.onload = () => {
      ((tex.image = img), (tex.needsUpdate = true));
      // 贴图是异步解码的：先渲染出来的立绘/头像会是白模，通知界面重画。
      // 32-ui.js 的 MAP_HEROES 里必须登记这个英雄，否则回调来了也不会重画。
      globalThis.__sfTextureReady?.();
    };
    img.src = HERO_MESH.tex;
  }
  return (_map = tex);
}
// 模块一加载就开始解码，别等第一次建模时才去拉。
// 少了这行，选将台会在解码完成前就把立绘渲染进缓存，头像永远是白模（牛魔就是这么漏的）。
if (typeof document !== 'undefined') setTimeout(() => heroMap(), 0);

export const HERO_MESH = {
  verts: ${P.length / 3},
  pos: "${b64(Float32Array.from(P))}",
  nor: "${b64(Float32Array.from(N))}",
  uv: "${b64(Float32Array.from(U))}",
  idx: "${b64(Uint32Array.from(I))}",
  skin: "${b64(Float32Array.from(SK))}",
  tex: "${texData}",
};

${RIG ? `export const HERO_RIG = {
  names: ${JSON.stringify(RIG.names)},
  parent: ${JSON.stringify(RIG.parent)},
  bindWorld: "${b64(Float32Array.from(RIG.bindWorld))}",
  bindQ: "${b64(Float32Array.from(RIG.bindQ))}",
  bindWQ: "${b64(Float32Array.from(RIG.bindWQ))}",
  localPos: "${b64(Float32Array.from(RIG.localPos))}",
};` : 'export const HERO_RIG = null;'}

export const HERO_ANIM = {
${animBody}
};
`;
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, body);
const totalVerts = P.length / 3;
const skinInfo = skin ? `单骨${skinSingle}(${(skinSingle/totalVerts*100).toFixed(0)}%) 双骨${skinDual}(${(skinDual/totalVerts*100).toFixed(0)}%) 碎片${islandCount}个` : '无骨骼';
console.log(
  `写出 ${out}\n  顶点 ${totalVerts}  三角 ${I.length / 3}  关节 ${RIG ? RIG.names.length : 0}  动画 ${Object.keys(ANIMS).join('/') || '无'}  文件 ${Math.round(body.length / 1024)}KB\n  蒙皮 ${skinInfo}`,
);
