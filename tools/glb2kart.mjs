// 把"搞怪卡丁车"导出的原版角色 GLB 转成游戏内的模型数据块。
// 用法: node tools/glb2kart.mjs .kart/glb/00-丑黄蛤蟆.glb dist/kart/frog.bin
//
// 和 glb2hero.mjs 的区别（很重要）：
//   卡丁车这批**大部分是节点动画**（每个零件是一个 node，动画是 node 的 TRS 关键帧，没有 skin），
//   所以这里把"节点层级"直接当成骨架：每个 node = 一根骨，挂在它下面的网格顶点权重 1 绑到那根骨。
//   节点动画的 TRS 关键帧就是骨骼动画。
//   但有 7 个模型的**身体是真蒙皮网格**（带 JOINTS_0/WEIGHTS_0）—— 蠕动全靠那条骨链的 scale，
//   只按节点刚性绑一根骨的话身体就是一块死肉，只剩脑袋在动。所以带 JOINTS_0 的 primitive
//   走 glTF skin，四骨权重原样保留，绑定姿态取 inverseBindMatrices（见下面的说明）。
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const [, , src, out, ...rest] = process.argv;
if (!src || !out) {
  console.error('用法: node tools/glb2kart.mjs <in.glb> <out.bin> [--scale=1] [--fps=24]');
  process.exit(1);
}
const argOf = (k, d) => {
  const i = rest.indexOf(k);
  return i >= 0 ? Number(rest[i + 1]) : d;
};
const SCALE = argOf('--scale', 1);
const FPS = argOf('--fps', 24);
// --no-tex：退回"贴图烘进顶点色"的老做法，用来 A/B 对比（.bin 里 texW=0，也不写 png）
const NO_TEX = rest.includes('--no-tex');

const buf = fs.readFileSync(src);
if (buf.readUInt32LE(0) !== 0x46546c67) throw new Error('不是 GLB');
let off = 12,
  json = null,
  bin = null;
while (off < buf.length) {
  const len = buf.readUInt32LE(off);
  const type = buf.toString('ascii', off + 4, off + 8);
  if (type.startsWith('JSON')) json = JSON.parse(buf.toString('utf8', off + 8, off + 8 + len));
  else if (type.startsWith('BIN')) bin = buf.subarray(off + 8, off + 8 + len);
  off += 8 + len + ((4 - (len % 4)) % 4);
}

// 这套卡丁车模型大多是"节点动画"（零件 = node，动画 = node 的 TRS 关键帧）。
// 但有几个的**身体**是真蒙皮网格（大肥蛆/杯杯菇/大脚牛…），蠕动全靠骨链 ——
// 只按节点刚性绑一根骨的话身体就是一块死肉，只剩脑袋在动。所以这里两种都支持：
// 带 JOINTS_0 的 primitive 走 glTF skin（取权重最大的两根骨），顶点留在绑定世界空间。
if (json.skins && json.skins.length) {
  const nSkinPrim = (json.meshes || []).reduce(
    (a, m) => a + (m.primitives || []).filter((p) => p.attributes.JOINTS_0 != null).length,
    0,
  );
  if (nSkinPrim) console.log(`· ${path.basename(src)}: ${nSkinPrim} 个蒙皮 primitive，按 skin 绑骨`);
}

const COMP = { 5120: Int8Array, 5121: Uint8Array, 5122: Int16Array, 5123: Uint16Array, 5125: Uint32Array, 5126: Float32Array };
const NUM = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT4: 16 };
const READ = {
  5120: (v, o) => v.getInt8(o),
  5121: (v, o) => v.getUint8(o),
  5122: (v, o) => v.getInt16(o, true),
  5123: (v, o) => v.getUint16(o, true),
  5125: (v, o) => v.getUint32(o, true),
  5126: (v, o) => v.getFloat32(o, true),
};
function acc(i) {
  const a = json.accessors[i];
  const bv = json.bufferViews[a.bufferView];
  const n = NUM[a.type];
  const base = (bv.byteOffset || 0) + (a.byteOffset || 0);
  const el = COMP[a.componentType].BYTES_PER_ELEMENT;
  const stride = bv.byteStride || n * el;
  const dv = new DataView(bin.buffer, bin.byteOffset + base, bv.byteLength);
  const rd = READ[a.componentType];
  const out = new Float64Array(a.count * n);
  for (let k = 0; k < a.count; k++) for (let c = 0; c < n; c++) out[k * n + c] = rd(dv, k * stride + c * el);
  return out;
}

// ── 四元数 ───────────────────────────────────────────────
const qmul = (a, b) => [
  a[3] * b[0] + a[0] * b[3] + a[1] * b[2] - a[2] * b[1],
  a[3] * b[1] - a[0] * b[2] + a[1] * b[3] + a[2] * b[0],
  a[3] * b[2] + a[0] * b[1] - a[1] * b[0] + a[2] * b[3],
  a[3] * b[3] - a[0] * b[0] - a[1] * b[1] - a[2] * b[2],
];
const qnorm = (q) => {
  const l = Math.hypot(q[0], q[1], q[2], q[3]) || 1;
  return [q[0] / l, q[1] / l, q[2] / l, q[3] / l];
};
const qrot = (q, v) => {
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
};
const qslerp = (a, b, t) => {
  let d = a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
  let bb = b;
  if (d < 0) {
    d = -d;
    bb = [-b[0], -b[1], -b[2], -b[3]];
  }
  if (d > 0.9995) return qnorm([a[0] + (bb[0] - a[0]) * t, a[1] + (bb[1] - a[1]) * t, a[2] + (bb[2] - a[2]) * t, a[3] + (bb[3] - a[3]) * t]);
  const th = Math.acos(d),
    s = Math.sin(th);
  const w0 = Math.sin((1 - t) * th) / s,
    w1 = Math.sin(t * th) / s;
  return [a[0] * w0 + bb[0] * w1, a[1] * w0 + bb[1] * w1, a[2] * w0 + bb[2] * w1, a[3] * w0 + bb[3] * w1];
};

function localTRS(n) {
  if (n.matrix) {
    const m = n.matrix;
    const sx = Math.hypot(m[0], m[1], m[2]),
      sy = Math.hypot(m[4], m[5], m[6]),
      sz = Math.hypot(m[8], m[9], m[10]);
    // glTF 的 matrix 是**列主序**，这里先摆成行主序 R[r][c] 再用标准公式。
    // 以前直接按列主序的 r[] 套公式，三个反对称项（R21−R12 之类）全部反号，
    // 解出来的是**共轭四元数** = 逆旋转。只影响 n.matrix 的节点，平时几乎不触发，
    // 但 inverseBindMatrices 反解绑定姿态正好走这条路 —— 雪松老师的绑定旋转就是这么错的。
    const R = [
      m[0] / sx, m[4] / sy, m[8] / sz,
      m[1] / sx, m[5] / sy, m[9] / sz,
      m[2] / sx, m[6] / sy, m[10] / sz,
    ];
    let q;
    const tr = R[0] + R[4] + R[8];
    if (tr > 0) {
      const s = Math.sqrt(1 + tr) * 2;
      q = [(R[7] - R[5]) / s, (R[2] - R[6]) / s, (R[3] - R[1]) / s, 0.25 * s];
    } else if (R[0] > R[4] && R[0] > R[8]) {
      const s = Math.sqrt(1 + R[0] - R[4] - R[8]) * 2;
      q = [0.25 * s, (R[1] + R[3]) / s, (R[2] + R[6]) / s, (R[7] - R[5]) / s];
    } else if (R[4] > R[8]) {
      const s = Math.sqrt(1 + R[4] - R[0] - R[8]) * 2;
      q = [(R[1] + R[3]) / s, 0.25 * s, (R[5] + R[7]) / s, (R[2] - R[6]) / s];
    } else {
      const s = Math.sqrt(1 + R[8] - R[0] - R[4]) * 2;
      q = [(R[2] + R[6]) / s, (R[5] + R[7]) / s, 0.25 * s, (R[3] - R[1]) / s];
    }
    return { t: [m[12], m[13], m[14]], q, s: [sx, sy, sz] };
  }
  return { t: n.translation || [0, 0, 0], q: n.rotation || [0, 0, 0, 1], s: n.scale || [1, 1, 1] };
}

const nodeParent = new Array(json.nodes.length).fill(-1);
json.nodes.forEach((n, i) => (n.children || []).forEach((c) => (nodeParent[c] = i)));

// ── 骨架：把节点层级当骨架用 ─────────────────────────────
// 只保留"有网格 / 有子节点 / 有动画"的节点，中间的空壳节点压掉
const used = new Set();
const markUp = (i) => {
  while (i >= 0 && !used.has(i)) {
    used.add(i);
    i = nodeParent[i];
  }
};
json.nodes.forEach((n, i) => {
  if (n.mesh != null) markUp(i);
});
for (const a of json.animations || [])
  for (const ch of a.channels) markUp(ch.target.node);
// 蒙皮关节一定要留：它们可能不带动画通道（虽然这批是有的），漏了就会绑到错骨
for (const sk of json.skins || []) for (const jn of sk.joints) markUp(jn);
// 有子节点的也要留（层级关系要完整）
json.nodes.forEach((n, i) => {
  if ((n.children || []).length) used.add(i);
});
const nodes = [...used].sort((a, b) => a - b);
const jidx = new Map(nodes.map((n, i) => [n, i]));
const parent = nodes.map((n) => {
  let p = nodeParent[n];
  while (p >= 0 && !jidx.has(p)) p = nodeParent[p];
  return p >= 0 ? jidx.get(p) : -1;
});

// 退化缩放的节点：原版拿 `scale = 0.0001` 当"隐藏开关"（21 个，全是叶子且带网格）。
// 烘焙尺度不能照搬，否则两个后果：
//   ① 顶点被缩到 1e-4 量级，i16/2000 量化后整块零件塌成 0（看不见了）；
//   ② 动画把它拉回 1 时缩放比是 10000，而 i16/10000 上限只有 3.27 —— 直接截断成 3.28，
//      零件被放大 3.28 倍而不是 1 倍（蛤蟆"站起来走"时腿脚分开就是这个）。
// 所以这类轴的烘焙尺度取 1，"隐藏"改由动画默认值（静置/烘焙 = 0.0001）表达。
// 这 21 个节点都没有子节点，换尺度只影响它们自己的顶点，不动任何骨的位置。
const bakeS = json.nodes.map((n) => localTRS(n).s.map((v) => (Math.abs(v) < 0.02 ? 1 : v)));

// 每根骨的静置缩放。动画里的 scale 是节点的**绝对**缩放，而引擎姿势里的 s 是乘在子骨偏移上的
// 系数（静置时是 1）。所以这里存 animScale / restScale：静置那一刻正好等于 1，模型和以前一模一样，
// 只有"比静置大/小多少"这部分的挤压才起作用。
// 三轴各存一份：动画里的缩放是三轴的，静置值也得三轴，否则归一化之后轴向比例会歪。
const restS = new Float32Array(nodes.length * 3);
// 无通道时的默认缩放 = 静置 / 烘焙（正常节点是 1，退化节点是 0.0001 → 保持隐藏）
const restNorm = new Float32Array(nodes.length * 3);
const nz = (v) => (Math.abs(v) < 1e-6 ? (v < 0 ? -1e-6 : 1e-6) : v);
nodes.forEach((n, i) => {
  const s = bakeS[n],
    rs = localTRS(json.nodes[n]).s;
  for (let k = 0; k < 3; k++) {
    restS[i * 3 + k] = nz(s[k]);
    restNorm[i * 3 + k] = rs[k] / s[k];
  }
});

const cache = {};function worldOf(i) {
  if (cache[i]) return cache[i];
  const { t, q } = localTRS(json.nodes[i]);
  const s = bakeS[i];
  const p = nodeParent[i];
  if (p < 0) return (cache[i] = { pos: [...t], q: [...q], s: [...s] });
  const pw = worldOf(p);
  const v = qrot(pw.q, [t[0] * pw.s[0], t[1] * pw.s[1], t[2] * pw.s[2]]);
  return (cache[i] = {
    pos: [pw.pos[0] + v[0], pw.pos[1] + v[1], pw.pos[2] + v[2]],
    q: qmul(pw.q, q),
    s: [pw.s[0] * s[0], pw.s[1] * s[1], pw.s[2] * s[2]],
  });
}

const names = nodes.map((n) => json.nodes[n].name || `j${n}`);
const bindWorld = [],
  bindQ = [],
  localPos = [],
  bindWQ = [];
for (let i = 0; i < nodes.length; i++) {
  const n = nodes[i],
    w = worldOf(n),
    lt = localTRS(json.nodes[n]);
  bindWorld.push(w.pos[0] * SCALE, w.pos[1] * SCALE, w.pos[2] * SCALE);
  const wq = qnorm(w.q);
  bindWQ.push(wq[0], wq[1], wq[2], wq[3]);
  const lq = qnorm(lt.q);
  bindQ.push(lq[0], lq[1], lq[2], lq[3]);
  localPos.push(lt.t[0] * SCALE, lt.t[1] * SCALE, lt.t[2] * SCALE);
}

// ── 顶点动画网格 ────────────────────────────────────────────
// 有些网格的形变是**逐帧直接改顶点几何**（蛤蟆的"连体融合肉套"：从髋到膝现算一整条管），
// 节点 TRS 里根本没有这份形变 —— GLTFExporter 只导出了导出那一刻的几何，动画里整块被冻住。
// 导出器会把这类网格的名字写进同名 .dyn.json。这里给它们按到骨骼的距离绑最近两根骨，
// 走真正的蒙皮（引擎的四骨 LBS 本来就支持），腿一抬肉套就跟着弯，不会再断开。
const dynNames = (() => {
  const f = src.replace(/\.glb$/i, '.dyn.json');
  if (!fs.existsSync(f)) return new Set();
  try {
    const list = JSON.parse(fs.readFileSync(f, 'utf8'));
    if (list.length) console.log(`· ${list.length} 块顶点动画网格 → 改成按距离绑骨`);
    return new Set(list);
  } catch {
    return new Set();
  }
})();
// 哪些骨能当"结构骨"：不带网格的纯关节，或者自己网格足够大（四肢/躯干）。
// 必须排掉"斑点/贴片"——这批模型里每一个小圆点都是一个独立网格节点，
// 它们本身就是骨，按距离选会选到一堆斑点，肉套会被拉成刀片。
const 结构骨 = nodes.map((n, i) => {
  const nd = json.nodes[n];
  if (nd.mesh == null) return true;
  let cnt = 0;
  for (const pr of json.meshes[nd.mesh].primitives)
    if (pr.attributes.POSITION != null) cnt += json.accessors[pr.attributes.POSITION].count;
  return cnt >= 80;
});
// 离某点最近的结构骨（skipJ 用于避开已经选过的那根；minSep 要求两根骨别挤在一起）
function 最近骨(vx, vy, vz, skipJ = -1, minSep = 0) {
  let bd = Infinity, bj = -1;
  for (let j = 0; j < nodes.length; j++) {
    if (j === skipJ || !结构骨[j]) continue;
    const dx = vx - bindWorld[j * 3], dy = vy - bindWorld[j * 3 + 1], dz = vz - bindWorld[j * 3 + 2];
    if (minSep > 0 && skipJ >= 0) {
      const ex = bindWorld[j * 3] - bindWorld[skipJ * 3],
        ey = bindWorld[j * 3 + 1] - bindWorld[skipJ * 3 + 1],
        ez = bindWorld[j * 3 + 2] - bindWorld[skipJ * 3 + 2];
      if (ex * ex + ey * ey + ez * ez < minSep * minSep) continue;
    }
    const d = dx * dx + dy * dy + dz * dz;
    if (d < bd) { bd = d; bj = j; }
  }
  return bj;
}

// 顶点动画网格的权重：**整块网格共用一对骨**，顶点权重沿两骨连线平滑插值。
// 逐顶点各自选骨是错的 —— 表面上的骨对会跳变，整条管子会被撕成刀片（试过）。
function 轴向权重(V, cnt) {
  // 两端点：先取最下方顶点做种子，再两遍最远点扫描
  let seed = 0;
  for (let i = 1; i < cnt; i++) if (V[i * 3 + 1] < V[seed * 3 + 1]) seed = i;
  const 距2 = (i, j) => {
    const dx = V[i * 3] - V[j * 3], dy = V[i * 3 + 1] - V[j * 3 + 1], dz = V[i * 3 + 2] - V[j * 3 + 2];
    return dx * dx + dy * dy + dz * dz;
  };
  let p1 = 0, best = -1;
  for (let i = 0; i < cnt; i++) { const d = 距2(seed, i); if (d > best) { best = d; p1 = i; } }
  let p0 = 0; best = -1;
  for (let i = 0; i < cnt; i++) { const d = 距2(p1, i); if (d > best) { best = d; p0 = i; } }
  const jA = 最近骨(V[p0 * 3], V[p0 * 3 + 1], V[p0 * 3 + 2]);
  const jB = 最近骨(V[p1 * 3], V[p1 * 3 + 1], V[p1 * 3 + 2], jA, 0.2);
  const ax = bindWorld[jA * 3], ay = bindWorld[jA * 3 + 1], az = bindWorld[jA * 3 + 2];
  const bx = bindWorld[jB * 3], by = bindWorld[jB * 3 + 1], bz = bindWorld[jB * 3 + 2];
  const ex = bx - ax, ey = by - ay, ez = bz - az;
  const len2 = ex * ex + ey * ey + ez * ez || 1;
  const out = new Float32Array(cnt * 3);
  for (let i = 0; i < cnt; i++) {
    let t = ((V[i * 3] - ax) * ex + (V[i * 3 + 1] - ay) * ey + (V[i * 3 + 2] - az) * ez) / len2;
    t = t < 0 ? 0 : t > 1 ? 1 : t;
    // smoothstep：两端刚性、中间平滑过渡。t=0 在 jA 那一端，所以 jA 的权重是 1−w
    const w = t * t * (3 - 2 * t);
    out[i * 3] = jA; out[i * 3 + 1] = jB; out[i * 3 + 2] = 1 - w;
  }
  return out;
}

// ── 蒙皮关节的绑定姿态必须来自 inverseBindMatrices ──────────
// glTF 里"绑定姿态"是 IBM 定义的，和节点的静置 TRS **不一定是同一个姿势**。
// 雪松老师 / 大脚牛 / 小肥石 / 椰子 / 杯杯菇 的绑定姿态是"所有旋转归零的直骨"，
// 节点静置姿态却是已经摆好的 —— 拿静置姿态当绑定姿态，LBS 会在相邻顶点权重不同处炸开
// （实测雪松老师跳舞 8.3× 拉伸，原版只有 1.7×；大肥蛆恰好两者一致，所以之前没暴露）。
// 关节矩阵是 inv(meshWorld)·jointWorld·IBM，而顶点已经被 meshWorld 烘成世界坐标，
// 所以绑定矩阵取 meshWorld·inverse(IBM)。
{
  const mul4 = (a, b) => {
    const o = new Array(16).fill(0);
    for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) {
      let s = 0;
      for (let k = 0; k < 4; k++) s += a[k * 4 + r] * b[c * 4 + k];
      o[c * 4 + r] = s;
    }
    return o;
  };
  const inv4 = (m) => {
    const o = new Array(16).fill(0);
    const a00=m[0],a01=m[1],a02=m[2],a03=m[3], a10=m[4],a11=m[5],a12=m[6],a13=m[7];
    const a20=m[8],a21=m[9],a22=m[10],a23=m[11], a30=m[12],a31=m[13],a32=m[14],a33=m[15];
    const b00=a00*a11-a01*a10, b01=a00*a12-a02*a10, b02=a00*a13-a03*a10;
    const b03=a01*a12-a02*a11, b04=a01*a13-a03*a11, b05=a02*a13-a03*a12;
    const b06=a20*a31-a21*a30, b07=a20*a32-a22*a30, b08=a20*a33-a23*a30;
    const b09=a21*a32-a22*a31, b10=a21*a33-a23*a31, b11=a22*a33-a23*a32;
    let det = b00*b11-b01*b10+b02*b09+b03*b08-b04*b07+b05*b06;
    if (!det) return o;
    det = 1 / det;
    o[0]=(a11*b11-a12*b10+a13*b09)*det; o[1]=(a02*b10-a01*b11-a03*b09)*det;
    o[2]=(a31*b05-a32*b04+a33*b03)*det; o[3]=(a22*b04-a21*b05-a23*b03)*det;
    o[4]=(a12*b08-a10*b11-a13*b07)*det; o[5]=(a00*b11-a02*b08+a03*b07)*det;
    o[6]=(a32*b02-a30*b05-a33*b01)*det; o[7]=(a20*b05-a22*b02+a23*b01)*det;
    o[8]=(a10*b10-a11*b08+a13*b06)*det; o[9]=(a01*b08-a00*b10-a03*b06)*det;
    o[10]=(a30*b04-a31*b02+a33*b00)*det; o[11]=(a21*b02-a20*b04-a23*b00)*det;
    o[12]=(a11*b07-a10*b09-a12*b06)*det; o[13]=(a00*b09-a01*b07+a02*b06)*det;
    o[14]=(a31*b01-a30*b03-a32*b00)*det; o[15]=(a20*b03-a21*b01+a22*b00)*det;
    return o;
  };
  const trsM = ({ pos, q, s }) => {
    const [x, y, z, w] = q, x2 = x + x, y2 = y + y, z2 = z + z;
    const xx = x * x2, xy = x * y2, xz = x * z2, yy = y * y2, yz = y * z2, zz = z * z2;
    const wx = w * x2, wy = w * y2, wz = w * z2;
    return [
      (1 - (yy + zz)) * s[0], (xy + wz) * s[0], (xz - wy) * s[0], 0,
      (xy - wz) * s[1], (1 - (xx + zz)) * s[1], (yz + wx) * s[1], 0,
      (xz + wy) * s[2], (yz - wx) * s[2], (1 - (xx + yy)) * s[2], 0,
      pos[0], pos[1], pos[2], 1,
    ];
  };
  let nb = 0;
  (json.skins || []).forEach((sk, si) => {
    if (sk.inverseBindMatrices == null) return;
    const ibm = acc(sk.inverseBindMatrices);
    let meshNode = -1;
    json.nodes.forEach((nd, i) => {
      if (meshNode < 0 && nd.skin === si && nd.mesh != null) meshNode = i;
    });
    const meshM = meshNode >= 0 ? trsM(worldOf(meshNode)) : null;
    sk.joints.forEach((jn, k) => {
      const j = jidx.get(jn);
      if (j == null) return;
      let b = inv4(Array.from(ibm.subarray(k * 16, k * 16 + 16)));
      if (meshM) b = mul4(meshM, b);
      const d = localTRS({ matrix: b });
      bindWorld[j * 3] = d.t[0] * SCALE;
      bindWorld[j * 3 + 1] = d.t[1] * SCALE;
      bindWorld[j * 3 + 2] = d.t[2] * SCALE;
      const q = qnorm(d.q);
      bindWQ[j * 4] = q[0]; bindWQ[j * 4 + 1] = q[1]; bindWQ[j * 4 + 2] = q[2]; bindWQ[j * 4 + 3] = q[3];
      nb++;
    });
  });
  if (nb) console.log(`· ${nb} 根蒙皮关节的绑定姿态取自 inverseBindMatrices`);
}

// ── PNG 解码（只支持 8bit 非隔行的 RGB/RGBA，GLTFExporter 就是这种）──
function pngRGBA(bytes) {
  let p = 8,
    w = 0,
    h = 0,
    ct = 6,
    bd = 8;
  const idat = [];
  while (p < bytes.length) {
    const len = bytes.readUInt32BE(p),
      type = bytes.toString('ascii', p + 4, p + 8);
    const data = bytes.subarray(p + 8, p + 8 + len);
    if (type === 'IHDR') {
      w = data.readUInt32BE(0);
      h = data.readUInt32BE(4);
      bd = data[8];
      ct = data[9];
      if (data[12] !== 0) throw new Error('隔行 PNG 不支持');
    } else if (type === 'IDAT') idat.push(data);
    else if (type === 'IEND') break;
    p += 12 + len;
  }
  if (bd !== 8) throw new Error('只支持 8bit PNG');
  const ch = ct === 6 ? 4 : ct === 2 ? 3 : ct === 0 ? 1 : 0;
  if (!ch) throw new Error(`不支持的 PNG colorType ${ct}`);
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const stride = w * ch;
  const out = new Uint8Array(w * h * 4);
  const cur = new Uint8Array(stride),
    prev = new Uint8Array(stride);
  for (let y = 0; y < h; y++) {
    const f = raw[y * (stride + 1)];
    const line = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    for (let x = 0; x < stride; x++) {
      const a = x >= ch ? cur[x - ch] : 0,
        b = prev[x],
        c = x >= ch ? prev[x - ch] : 0;
      let v = line[x];
      if (f === 1) v += a;
      else if (f === 2) v += b;
      else if (f === 3) v += (a + b) >> 1;
      else if (f === 4) {
        const pa = Math.abs(b - c),
          pb = Math.abs(a - c),
          pc = Math.abs(a + b - 2 * c);
        v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      }
      cur[x] = v & 255;
    }
    for (let x = 0; x < w; x++) {
      const o = (y * w + x) * 4,
        s = x * ch;
      out[o] = cur[s];
      out[o + 1] = ch > 1 ? cur[s + 1] : cur[s];
      out[o + 2] = ch > 2 ? cur[s + 2] : cur[s];
      out[o + 3] = ch === 4 ? cur[s + 3] : 255;
    }
    prev.set(cur);
  }
  return { w, h, data: out };
}

const textures = (json.images || []).map((img) => {
  const bv = json.bufferViews[img.bufferView];
  const bytes = bin.subarray(bv.byteOffset || 0, (bv.byteOffset || 0) + bv.byteLength);
  return pngRGBA(bytes);
});

// ── 贴图图集 ─────────────────────────────────────────────
// 一个模型带 1~5 张贴图，可引擎的批次只有一个 uMap 通道 —— 拼成一张图集，
// 每个 primitive 的 UV 重映射到自己那一小格里。
// 没贴图的 primitive 指向预留的纯白格（乘上去等于没乘），这样不用给"有没有贴图"再加一个顶点属性。
// 以前是把贴图在顶点上采样一次烘成顶点色：512×512 的细节全丢，条纹变成模糊环带，
// 整只模型看着像打蜡 —— 这就是"光滑水润"的来源之一。
const PAD = 2; // 每格四周留 2px 边缘延展，双线性采样时不会串到隔壁格
const ATLAS = (() => {
  if (NO_TEX) return null;
  const used = new Set();
  for (const m of json.meshes || [])
    for (const p of m.primitives) {
      const bt = json.materials?.[p.material ?? 0]?.pbrMetallicRoughness?.baseColorTexture;
      if (bt) used.add(json.textures[bt.index].source);
    }
  const imgs = [...used]
    .map((i) => textures[i])
    .filter((t) => t && t.w > 0);
  if (!imgs.length) return null;
  imgs.sort((a, b) => b.h - a.h || b.w - a.w);
  const white = { w: 4, h: 4, data: new Uint8Array(4 * 4 * 4).fill(255), isWhite: true };
  const items = [white, ...imgs];
  const packAt = (W) => {
    const pos = new Map();
    let x = 0,
      y = 0,
      rowH = 0;
    for (const t of items) {
      const cw = t.w + PAD * 2,
        ch = t.h + PAD * 2;
      if (cw > W) return null; // 这一格比整张图还宽，换更大的宽度重来
      if (x + cw > W) ((x = 0), (y += rowH), (rowH = 0));
      pos.set(t, { x, y });
      x += cw;
      rowH = Math.max(rowH, ch);
    }
    return { pos, h: y + rowH };
  };
  // 宽度从"最宽的那格"起步，按面积估一个接近正方形的初值，放不下再按 1.4 倍放大。
  // 不强行凑 2 的幂：渲染器是 WebGL2，NPOT 带 mipmap 没问题，凑幂会白白浪费几倍显存。
  const minW = Math.max(...items.map((t) => t.w + PAD * 2));
  const area = items.reduce((a, t) => a + (t.w + PAD * 2) * (t.h + PAD * 2), 0);
  let W = Math.max(minW, Math.ceil(Math.sqrt(area))),
    H = 0,
    pos = null;
  for (let i = 0; i < 12 && !pos; i++) {
    const r = packAt(W);
    if (r) ((pos = r.pos), (H = r.h));
    else W = Math.ceil(W * 1.4);
  }
  if (!pos) throw new Error('贴图太多，图集放不下');
  const data = new Uint8Array(W * H * 4).fill(255);
  for (const t of items) {
    const p = pos.get(t);
    for (let y = 0; y < t.h + PAD * 2; y++) {
      const sy = Math.min(t.h - 1, Math.max(0, y - PAD));
      for (let x = 0; x < t.w + PAD * 2; x++) {
        const sx = Math.min(t.w - 1, Math.max(0, x - PAD));
        const so = (sy * t.w + sx) * 4,
          dst = ((p.y + y) * W + (p.x + x)) * 4;
        ((data[dst] = t.data[so]), (data[dst + 1] = t.data[so + 1]), (data[dst + 2] = t.data[so + 2]), (data[dst + 3] = 255));
      }
    }
  }
  return { w: W, h: H, data, pos, white };
})();

// 没贴图的面指向纯白格的中心
const WHITE_UV = ATLAS
  ? [(ATLAS.pos.get(ATLAS.white).x + PAD + 2) / ATLAS.w, (ATLAS.pos.get(ATLAS.white).y + PAD + 2) / ATLAS.h]
  : [0, 0];

const texOf = (mi) => {
  const m = json.materials?.[mi];
  const bt = m?.pbrMetallicRoughness?.baseColorTexture;
  if (!bt) return null;
  const tex = json.textures[bt.index];
  const img = textures[tex.source];
  if (!img) return null;
  const tr = bt.extensions?.KHR_texture_transform || {};
  const scale = tr.scale || [1, 1],
    offset = tr.offset || [0, 0];
  if (NO_TEX) return { img, scale, offset };
  const cell = ATLAS && ATLAS.pos.get(img);
  if (!cell) return null;
  return { img, cell, scale, offset };
};

// UV → 图集里的绝对坐标。超出 [0,1] 的取模（原版是 clamp/repeat，以前烘顶点色也是取模，保持一致；
// 代价是平铺两次以上的模型会丢掉重复，比如雪松老师的树皮）
const atlasUV = (t, u, v) => {
  if (!t) return WHITE_UV;
  const uu = (((u * t.scale[0] + t.offset[0]) % 1) + 1) % 1;
  const vv = (((v * t.scale[1] + t.offset[1]) % 1) + 1) % 1;
  return [(t.cell.x + PAD + uu * t.img.w) / ATLAS.w, (t.cell.y + PAD + vv * t.img.h) / ATLAS.h];
};

// ── 顶点 ─────────────────────────────────────────────────
const P = [], N = [], U = [], C = [], I = [], SK = [];
let vBase = 0;
// 这个模型有没有蒙皮网格（大肥蛆/杯杯菇/大脚牛… 的**身体**是蒙皮网格，
// 蠕动全靠 22 根骨链；只按节点刚性绑一根骨的话，身体就是一块死肉，只剩脑袋在动）
let skinned = 0;
// sRGB → 线性
const s2l = (v) => (v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
json.nodes.forEach((nd, ni) => {
  if (nd.mesh == null) return;
  const j = jidx.get(ni);
  if (j == null) return;
  const w = worldOf(ni);
  const mesh = json.meshes[nd.mesh];
  for (const prim of mesh.primitives) {
    const at = prim.attributes;
    if (at.POSITION == null) continue;
    const pos = acc(at.POSITION);
    const nor = at.NORMAL != null ? acc(at.NORMAL) : null;
    const uv = at.TEXCOORD_0 != null ? acc(at.TEXCOORD_0) : null;
    const mat = json.materials[prim.material ?? 0] || {};
    const base = mat.pbrMetallicRoughness?.baseColorFactor || [1, 1, 1, 1];
    const tex = texOf(prim.material ?? 0);
    const cnt = pos.length / 3;
    // 蒙皮：JOINTS_0/WEIGHTS_0 走 glTF 的 skin。
    // 四根骨的权重**全部保留**（引擎的 aSkin/aSkin2 支持 4 骨混合）。
    // 砍成两根骨会撕裂：大肥蛆肚子上的顶点普遍是 0.27/0.59/0.13 这种三骨分布，
    // 重新归一化后相邻顶点的混合比例差异被放大 4 倍（实测跳舞 5.9× → 18.8×）。
    const skin = at.JOINTS_0 != null && at.WEIGHTS_0 != null ? json.skins?.[nd.skin ?? 0] : null;
    const jAcc = skin ? acc(at.JOINTS_0) : null,
      wAcc = skin ? acc(at.WEIGHTS_0) : null,
      wDiv = skin && json.accessors[at.WEIGHTS_0].normalized ? (json.accessors[at.WEIGHTS_0].componentType === 5121 ? 255 : 65535) : 1;
    const isDyn = dynNames.has(nd.name);
    if (skin) skinned += cnt;
    if (isDyn) skinned += cnt;
    let dynW = null;
    if (isDyn) {
      const V = new Float32Array(cnt * 3);
      for (let i = 0; i < cnt; i++) {
        const lp2 = [pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]];
        const wp2 = qrot(w.q, [lp2[0] * w.s[0], lp2[1] * w.s[1], lp2[2] * w.s[2]]);
        V[i * 3] = (wp2[0] + w.pos[0]) * SCALE;
        V[i * 3 + 1] = (wp2[1] + w.pos[1]) * SCALE;
        V[i * 3 + 2] = (wp2[2] + w.pos[2]) * SCALE;
      }
      dynW = 轴向权重(V, cnt);
    }
    for (let i = 0; i < cnt; i++) {
      const lp = [pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]];
      const wp = qrot(w.q, [lp[0] * w.s[0], lp[1] * w.s[1], lp[2] * w.s[2]]);
      const vwx = (wp[0] + w.pos[0]) * SCALE,
        vwy = (wp[1] + w.pos[1]) * SCALE,
        vwz = (wp[2] + w.pos[2]) * SCALE;
      P.push(vwx, vwy, vwz);
      if (nor) {
        const nn = qrot(w.q, [nor[i * 3], nor[i * 3 + 1], nor[i * 3 + 2]]);
        const l = Math.hypot(nn[0], nn[1], nn[2]) || 1;
        N.push(nn[0] / l, nn[1] / l, nn[2] / l);
      } else N.push(0, 1, 0);
      const uu = uv ? uv[i * 2] : 0,
        vv = uv ? uv[i * 2 + 1] : 0,
        auv = NO_TEX ? [uu, vv] : atlasUV(tex, uu, vv);
      U.push(auv[0], auv[1]);
      // 有图集时顶点色只放 baseColorFactor（贴图由 uMap 提供）；
      // 走 --no-tex 才把贴图采样烘进顶点色（sRGB → 线性，否则整批发白）
      let c = [base[0], base[1], base[2]];
      if (NO_TEX && tex) {
        const x = Math.floor((((uu * tex.scale[0] + tex.offset[0]) % 1) + 1) % 1 * tex.img.w),
          y = Math.floor((((vv * tex.scale[1] + tex.offset[1]) % 1) + 1) % 1 * tex.img.h),
          so = (Math.min(tex.img.h - 1, y) * tex.img.w + Math.min(tex.img.w - 1, x)) * 4,
          d = tex.img.data;
        c = [c[0] * s2l(d[so] / 255), c[1] * s2l(d[so + 1] / 255), c[2] * s2l(d[so + 2] / 255)];
      }
      C.push(c[0], c[1], c[2]);
      if (skin) {
        // 四根骨的权重原样保留，只做两件事：按权重降序排（骨A 是主导骨）、归一化到 1。
        // 归一化是必须的 —— 源数据的权重和偶尔是 0.9999 或 1.0002。
        const jj = [0, 0, 0, 0],
          ww = [0, 0, 0, 0];
        for (let k = 0; k < 4; k++) {
          jj[k] = jidx.get(skin.joints[jAcc[i * 4 + k]]) ?? j;
          ww[k] = Math.max(0, wAcc[i * 4 + k] / wDiv);
        }
        for (let a = 1; a < 4; a++)
          for (let b = a; b > 0 && ww[b] > ww[b - 1]; b--) {
            const tw = ww[b]; ww[b] = ww[b - 1]; ww[b - 1] = tw;
            const tj = jj[b]; jj[b] = jj[b - 1]; jj[b - 1] = tj;
          }
        const sum = ww[0] + ww[1] + ww[2] + ww[3] || 1;
        SK.push(jj[0], jj[1], jj[2], jj[3], ww[0] / sum, ww[1] / sum, ww[2] / sum, ww[3] / sum);
      } else if (isDyn) {
        // 顶点动画网格：整块共用一对骨，权重沿轴向插值（权重和恒为 1）
        const jA2 = dynW[i * 3], jB2 = dynW[i * 3 + 1], wA2 = dynW[i * 3 + 2];
        SK.push(jA2, jB2, jA2, jA2, wA2, 1 - wA2, 0, 0);
      } else SK.push(j, j, j, j, 1, 0, 0, 0);
    }
    const idx = prim.indices != null ? acc(prim.indices) : null;
    if (idx) for (let i = 0; i < idx.length; i += 3) I.push(idx[i] + vBase, idx[i + 1] + vBase, idx[i + 2] + vBase);
    else for (let i = 0; i < cnt; i += 3) I.push(i + vBase, i + vBase + 1, i + vBase + 2);
    vBase += cnt;
  }
});

// ── 动画：节点 TRS 关键帧 → 骨骼每帧局部 TRS ─────────────
// 引擎的 anim data 布局：[frame][joint] = 7 个数（t.xyz 相对绑定位移 + q.xyzw 绝对局部四元数）
const nJ = nodes.length;
const ANIMS = {};
// 卡丁车的动作名是中文，引擎这边按 idle/attack/run 分支取片段，这里统一改个名。
// 没列到的动作原样保留（以后导全套动作时直接能用）。
// ★ 换新动作包时这张表就是唯一要对照的地方：只要新包沿用这套中文名，一条命令就能导进来。
const ANIM_ALIAS = {
  待机: 'idle',
  行走: 'walk',
  嘲讽: 'taunt',
  笑话: 'joke',
  跳舞: 'dance',
  左拐: 'turnL',
  右拐: 'turnR',
  急停: 'stop',
  眩晕: 'stun',
  小加速: 'accelS',
  中加速: 'accelM',
  大加速: 'accelL',
  失控: 'spin',
  庆祝: 'cheer',
  滞空: 'air',
  左攻击: 'attackL',
  右攻击: 'attackR',
  普通攻击: 'attack',
  复活: 'revive',
  死亡: 'die',
  吟唱: 'chant',
  // 卡丁车特有的两段（--full 才导）
  跑起来: 'run',
  撞车震飞: 'fall',
  起步抖动: 'start',
};
// 老包的已知错误：里面**没有真正的待机**，被标成"待机"的那段其实是行走。
// 判据很简单 —— 有"待机"却没有"行走"，那就把"待机"当 walk，idle 留空。
// 等新包把真待机补上（同时带"行走"），这条自动失效，不用改代码。
{
  const names = new Set((json.animations || []).map((a) => a.name));
  if (names.has('待机') && !names.has('行走')) ANIM_ALIAS.待机 = 'walk';
}
const clipInfo = [];
for (const a of json.animations || []) {
  const chans = [];
  let dur = 0;
  for (const ch of a.channels) {
    const j = jidx.get(ch.target.node);
    if (j == null) continue;
    const smp = a.samplers[ch.sampler];
    const times = acc(smp.input);
    const vals = acc(smp.output);
    dur = Math.max(dur, times[times.length - 1]);
    chans.push({ j, path: ch.target.path, times, vals, n: times.length });
  }
  const frames = Math.max(2, Math.round(dur * FPS) + 1);
  // 每关节每帧 10 个数：t.xyz + q.xyzw + s.xyz。
  // 卡丁车这批动作的"挤扁/拉长"全靠节点 scale（死亡那段是 0.52~1.75 的脉动），
  // 以前只存平移和旋转，整条挤压力道全丢了，动作看着又僵又假。
  // 缩放必须是**三轴**的 —— 原版的挤压大量是"压扁同时横向变宽"
  // （实测轴向差中位 1.26~2.5、p90 到 2.1、最大 13 倍），取几何平均会把这类形变抹平。
  const data = new Float32Array(frames * nJ * 10);
  for (let f = 0; f < frames; f++) {
    const tt = (f / (frames - 1)) * dur;
    // 先铺绑定值
    for (let j = 0; j < nJ; j++) {
      const o = (f * nJ + j) * 10;
      data[o] = 0;
      data[o + 1] = 0;
      data[o + 2] = 0;
      data[o + 3] = bindQ[j * 4];
      data[o + 4] = bindQ[j * 4 + 1];
      data[o + 5] = bindQ[j * 4 + 2];
      data[o + 6] = bindQ[j * 4 + 3];
      data[o + 7] = restNorm[j * 3];
      data[o + 8] = restNorm[j * 3 + 1];
      data[o + 9] = restNorm[j * 3 + 2];
    }
    for (const c of chans) {
      let k = 0;
      while (k < c.n - 2 && c.times[k + 1] < tt) k++;
      const t0 = c.times[k],
        t1 = c.times[k + 1] ?? t0;
      const w = t1 > t0 ? Math.min(1, Math.max(0, (tt - t0) / (t1 - t0))) : 0;
      const o = (f * nJ + c.j) * 10;
      if (c.path === 'translation') {
        const x = c.vals[k * 3] + (c.vals[(k + 1) * 3] - c.vals[k * 3]) * w;
        const y = c.vals[k * 3 + 1] + (c.vals[(k + 1) * 3 + 1] - c.vals[k * 3 + 1]) * w;
        const z = c.vals[k * 3 + 2] + (c.vals[(k + 1) * 3 + 2] - c.vals[k * 3 + 2]) * w;
        data[o] = (x - localPos[c.j * 3]) * SCALE;
        data[o + 1] = (y - localPos[c.j * 3 + 1]) * SCALE;
        data[o + 2] = (z - localPos[c.j * 3 + 2]) * SCALE;
      } else if (c.path === 'rotation') {
        const qa = [c.vals[k * 4], c.vals[k * 4 + 1], c.vals[k * 4 + 2], c.vals[k * 4 + 3]];
        const qb = [c.vals[(k + 1) * 4], c.vals[(k + 1) * 4 + 1], c.vals[(k + 1) * 4 + 2], c.vals[(k + 1) * 4 + 3]];
        const q = qnorm(qslerp(qnorm(qa), qnorm(qb), w));
        data[o + 3] = q[0];
        data[o + 4] = q[1];
        data[o + 5] = q[2];
        data[o + 6] = q[3];
      } else if (c.path === 'scale') {
        const x = c.vals[k * 3] + (c.vals[(k + 1) * 3] - c.vals[k * 3]) * w;
        const y = c.vals[k * 3 + 1] + (c.vals[(k + 1) * 3 + 1] - c.vals[k * 3 + 1]) * w;
        const z = c.vals[k * 3 + 2] + (c.vals[(k + 1) * 3 + 2] - c.vals[k * 3 + 2]) * w;
        // 存"动画缩放 / 静置缩放"：静置那一刻正好是 1，模型和绑定姿态完全一致
        data[o + 7] = x / restS[c.j * 3];
        data[o + 8] = y / restS[c.j * 3 + 1];
        data[o + 9] = z / restS[c.j * 3 + 2];
      }
    }
  }
  ANIMS[ANIM_ALIAS[a.name] || a.name] = { frames, dur: +dur.toFixed(3), data };
}

// ── 紧凑打包 ─────────────────────────────────────────────
// 20 个角色 × Float32 原始数据 = 20MB 源码，太大。这里量化成整数：
//   位置 i16(×2000) / 法线 i8(×127) / 顶点色 u8(×255) / uv u16 / 骨索引 u8
//   动画 i16（平移 ×1000、四元数 ×32767）
// 解码器在 src/47-kart-decode.js，所有角色共用一份。
const nV = P.length / 3,
  nI = I.length;

const nameBuf = Buffer.from(names.join('\u0000'), 'utf8');
const animList = Object.entries(ANIMS).map(([k, a]) => [k, a, Buffer.from(k, 'utf8')]);

let total = 0;
let animNameBytes = 0;
for (const [, a, nb] of animList) {
  total += a.frames * nJ * 10;
  animNameBytes += 4 + nb.length;
}
const size =
  8 * 4 + nameBuf.length + nJ * 4 + nV * (6 + 3 + 3 + 4 + 12) + nI * 4 + nJ * (6 + 8 + 8 + 6) + 4 + animList.length * 8 + animNameBytes + total * 2;
const pack = Buffer.alloc(size);
let o = 0;
const u32 = (v) => {
  pack.writeUInt32LE(v >>> 0, o);
  o += 4;
};
const i32 = (v) => {
  pack.writeInt32LE(v | 0, o);
  o += 4;
};
const i16 = (v) => {
  pack.writeInt16LE(Math.max(-32767, Math.min(32767, Math.round(v))), o);
  o += 2;
};
const i8 = (v) => {
  pack.writeInt8(Math.max(-127, Math.min(127, Math.round(v))), o);
  o += 1;
};
const u8 = (v) => {
  pack.writeUInt8(Math.max(0, Math.min(255, Math.round(v))), o);
  o += 1;
};
const u16 = (v) => {
  pack.writeUInt16LE(Math.max(0, Math.min(65535, Math.round(v))), o);
  o += 2;
};

u32(0x4b415254); // 'KART'
u32(nV);
u32(nI);
u32(nJ);
u32(nameBuf.length);
nameBuf.copy(pack, o);
o += nameBuf.length;
// 图集尺寸（0 = 没有贴图）。解码器要按这个尺寸先建一张同尺寸的占位图，
// 尺寸对不上 three 会整张丢弃 —— 就是"白模"那个坑。
u32(ATLAS ? ATLAS.w : 0);
u32(ATLAS ? ATLAS.h : 0);
// bit0 = 有蒙皮顶点：这时顶点留在**绑定世界空间**（蒙皮必须这样算），
// 运行时不能再把它们预变换到骨骼局部空间
u32(skinned > 0 ? 1 : 0);
for (let j = 0; j < nJ; j++) i32(parent[j]);
for (let v = 0; v < nV; v++) {
  i16(P[v * 3] * 2000);
  i16(P[v * 3 + 1] * 2000);
  i16(P[v * 3 + 2] * 2000);
  i8(N[v * 3] * 127);
  i8(N[v * 3 + 1] * 127);
  i8(N[v * 3 + 2] * 127);
  u8(C[v * 3] * 255);
  u8(C[v * 3 + 1] * 255);
  u8(C[v * 3 + 2] * 255);
  u16(U[v * 2] * 65535);
  u16(U[v * 2 + 1] * 65535);
  // 骨：4 个索引 + 4 个权重。骨B 的权重不存 —— 引擎按 1−wA−wC−wD 反推，
  // 这样四骨顶点用满 4 根，两骨顶点（绝大多数原生网格）还是老样子。
  u16(SK[v * 8]);
  u16(SK[v * 8 + 1]);
  u16(SK[v * 8 + 2]);
  u16(SK[v * 8 + 3]);
  u8(SK[v * 8 + 4] * 255);
  u8(SK[v * 8 + 5] * 255);
  u8(SK[v * 8 + 6] * 255);
  u8(SK[v * 8 + 7] * 255);
}
for (let k = 0; k < nI; k++) u32(I[k]);
for (let j = 0; j < nJ; j++) {
  i16(bindWorld[j * 3] * 2000);
  i16(bindWorld[j * 3 + 1] * 2000);
  i16(bindWorld[j * 3 + 2] * 2000);
  for (let k = 0; k < 4; k++) i16(bindQ[j * 4 + k] * 32767);
  for (let k = 0; k < 4; k++) i16(bindWQ[j * 4 + k] * 32767);
  i16(localPos[j * 3] * 2000);
  i16(localPos[j * 3 + 1] * 2000);
  i16(localPos[j * 3 + 2] * 2000);
}
u32(animList.length);
for (const [, a, nb] of animList) {
  u32(a.frames);
  pack.writeFloatLE(a.dur, o);
  o += 4;
  u32(nb.length);
  nb.copy(pack, o);
  o += nb.length;
  for (let k = 0; k < a.frames * nJ; k++) {
    const b = k * 10;
    i16(a.data[b] * 1000);
    i16(a.data[b + 1] * 1000);
    i16(a.data[b + 2] * 1000);
    for (let q = 3; q < 7; q++) i16(a.data[b + q] * 32767);
    // 三轴缩放，±3.27 够用。前提是分母用**烘焙缩放**而不是静置缩放 ——
    // 静置 0.0001 那种"隐藏开关"会让比值冲到 10000，直接截断（见上面 bakeS 的说明）。
    i16(a.data[b + 7] * 10000);
    i16(a.data[b + 8] * 10000);
    i16(a.data[b + 9] * 10000);
  }
}
if (o !== size) throw new Error(`打包长度对不上 ${o} != ${size}`);

// ── PNG 编码（图集写盘用；zlib 是内置的，不用额外依赖）──
const CRC_T = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
const crc32 = (b) => {
  let c = 0xffffffff;
  for (let i = 0; i < b.length; i++) c = CRC_T[(c ^ b[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
const chunk = (type, data) => {
  const h = Buffer.alloc(8);
  (h.writeUInt32BE(data.length, 0), h.write(type, 4, 'ascii'));
  const c = Buffer.alloc(4);
  c.writeUInt32BE(crc32(Buffer.concat([h.subarray(4), data])), 0);
  return Buffer.concat([h, data, c]);
};
function pngWrite(w, h, rgba) {
  const stride = w * 4,
    raw = Buffer.alloc((stride + 1) * h);
  const srcBuf = Buffer.from(rgba.buffer, rgba.byteOffset, rgba.byteLength);
  for (let y = 0; y < h; y++) srcBuf.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  const ihdr = Buffer.alloc(13);
  (ihdr.writeUInt32BE(w, 0), ihdr.writeUInt32BE(h, 4), (ihdr[8] = 8), (ihdr[9] = 6));
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

const clipTxt = animList.map(([k, a]) => `${k}(${a.frames}帧)`);

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, pack);
// 图集和 .bin 放一起，运行时按同名 .png 去拉（只有玩家选的那个皮会被拉一次）
let pngSize = 0;
if (ATLAS) {
  const png = pngWrite(ATLAS.w, ATLAS.h, ATLAS.data);
  fs.writeFileSync(out.replace(/\.bin$/, '.png'), png);
  pngSize = png.length;
}
const kb = (n) => (n / 1024).toFixed(0) + 'KB';
console.log(
  `${path.basename(out)}: 顶点 ${nV} 三角 ${nI / 3} 骨 ${nJ} 动画 ${animList.length} 段 [${clipTxt.join(' ')}] ${kb(size)}` +
    (ATLAS ? ` + 图集 ${ATLAS.w}×${ATLAS.h} ${kb(pngSize)}` : '（无贴图）') +
    (skinned ? ` · 蒙皮顶点 ${skinned}` : ''),
);
