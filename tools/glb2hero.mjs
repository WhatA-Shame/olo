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

// ── 骨骼邻接表 ───────────────────────────────────────────
// 判断两根骨骼是否"相邻"（父子或兄弟），用于决定能否安全双骨骼混合。
// 引擎 shader 只混两根骨骼，非相邻骨骼的 bindWorld 相差太大，mix 会撕裂。
const ca = Math.cos(ROTY), sa = Math.sin(ROTY);
const skin = json.skins && json.skins[0];
let RIG = null;
let boneAdj = null; // Set<"a:b">（a<b）
let twistToMain = null; // Map<boneIndex, mainBoneIndex>
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

  // 构建邻接表
  boneAdj = new Set();
  const adjKey = (a, b) => Math.min(a, b) + ':' + Math.max(a, b);
  for (let i = 0; i < joints.length; i++) {
    if (parent[i] >= 0) boneAdj.add(adjKey(i, parent[i]));
  }
  // 兄弟关系
  const siblings = new Map();
  for (let i = 0; i < joints.length; i++) {
    const p = parent[i];
    if (p < 0) continue;
    if (!siblings.has(p)) siblings.set(p, []);
    siblings.get(p).push(i);
  }
  for (const [, sibs] of siblings)
    for (let a = 0; a < sibs.length; a++)
      for (let b = a + 1; b < sibs.length; b++)
        boneAdj.add(adjKey(sibs[a], sibs[b]));

  // 找 Twist 骨骼的主骨骼：沿 parent 链向上直到找到非 Twist 骨骼
  twistToMain = new Map();
  for (let i = 0; i < joints.length; i++) {
    const nm = json.nodes[joints[i]].name || '';
    if (!nm.includes('Twist')) continue;
    let p = parent[i];
    while (p >= 0 && (json.nodes[joints[p]].name || '').includes('Twist')) p = parent[p];
    if (p >= 0) twistToMain.set(i, p);
  }

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
// 1. Twist 骨骼权重合并到主骨骼（沿 parent 链向上找到的第一个非 Twist 骨骼）
// 2. 合并后取权重最大的两根骨骼；若它们在骨架里不相邻（非父子/兄弟），
//    则把第二根的权重也并入主骨骼 → 单骨骼，避免 mix 撕裂
// 3. 相邻骨骼对（如 Foot/Toe、Upperarm/Twist01）保留双骨骼混合
const P = [], N = [], U = [], I = [], SK = [];
let vBase = 0;
const adjKey = (a, b) => Math.min(a, b) + ':' + Math.max(a, b);
let skinSingle = 0, skinDual = 0, skinMerged = 0;
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

      if (jt && wt && skin) {
        // 1. 合并 Twist 骨骼权重到主骨骼
        const origIdx = [jt[i * 4], jt[i * 4 + 1], jt[i * 4 + 2], jt[i * 4 + 3]];
        const origW = [wt[i * 4], wt[i * 4 + 1], wt[i * 4 + 2], wt[i * 4 + 3]];
        const merged = new Map();
        for (let k = 0; k < 4; k++) {
          if (origW[k] < 1e-4) continue;
          const target = twistToMain.get(origIdx[k]) ?? origIdx[k];
          merged.set(target, (merged.get(target) || 0) + origW[k]);
        }
        // 2. 取权重最大的两根
        const sorted = [...merged.entries()].sort((a, b) => b[1] - a[1]);
        if (sorted.length === 0 || sorted[0][1] < 1e-4) {
          SK.push(0, 0, 1);
          skinSingle++;
        } else if (sorted.length === 1 || (sorted.length >= 2 && sorted[1][1] < 1e-4)) {
          SK.push(sorted[0][0], sorted[0][0], 1);
          skinSingle++;
        } else {
          const a = sorted[0][0], b = sorted[1][0];
          // 3. 检查邻接性：非相邻骨骼对回退单骨骼，避免 mix 撕裂
          if (boneAdj.has(adjKey(a, b))) {
            const sum = sorted[0][1] + sorted[1][1];
            SK.push(a, b, sorted[0][1] / sum);
            skinDual++;
          } else {
            // 非相邻：第二根权重并入主骨骼
            SK.push(a, a, 1);
            skinMerged++;
          }
        }
      } else SK.push(0, 0, 1);
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
let texData = '';
const mat0 = (json.materials || []).find((m) => m.pbrMetallicRoughness && m.pbrMetallicRoughness.baseColorTexture);
if (mat0) {
  const tex = json.textures[mat0.pbrMetallicRoughness.baseColorTexture.index];
  const img = json.images[tex.source];
  const bv = json.bufferViews[img.bufferView];
  const bytes = bin.subarray(bv.byteOffset || 0, (bv.byteOffset || 0) + bv.byteLength);
  texData = `data:${img.mimeType || 'image/jpeg'};base64,${Buffer.from(bytes).toString('base64')}`;
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
  c.width = c.height = 1;
  const g = c.getContext('2d');
  g.fillStyle = '#fff';
  g.fillRect(0, 0, 1, 1);
  tex.image = c;
  tex.needsUpdate = true;
  if (HERO_MESH.tex) {
    const img = new Image();
    img.onload = () => ((tex.image = img), (tex.needsUpdate = true));
    img.src = HERO_MESH.tex;
  }
  return (_map = tex);
}

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
const skinInfo = skin ? `单骨${skinSingle}(${(skinSingle/totalVerts*100).toFixed(0)}%) 双骨${skinDual}(${(skinDual/totalVerts*100).toFixed(0)}%) 合并${skinMerged}(${(skinMerged/totalVerts*100).toFixed(0)}%)` : '无骨骼';
console.log(
  `写出 ${out}\n  顶点 ${totalVerts}  三角 ${I.length / 3}  关节 ${RIG ? RIG.names.length : 0}  动画 ${Object.keys(ANIMS).join('/') || '无'}  文件 ${Math.round(body.length / 1024)}KB\n  蒙皮 ${skinInfo}`,
);
