// 离线核对卡丁车模型的形变：不画图，直接算蒙皮后的包围盒和网格边长变化。
// 用法: node tools/_kartdeform.mjs dist/kart/maggot.bin [clip ...] [--old]
//
// 三个指标：
//   1. 包围盒三轴尺寸随帧变化 —— 看"压扁/拉长"到底有没有发生。
//   2. 网格边长最大拉伸比 —— 看会不会被拉断（>2 就很吓人，>3 基本是撕裂）。
//   3. 骨骼自身缩放的最大偏离 —— 包围盒看不出这个（整只模型的尺寸主要靠零件位移撑）。
// --old 会把三轴缩放压成几何平均，还原上一版的行为做对比。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { kartDecode } from '../src/47-kart-decode.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const file = process.argv[2];
const clips = process.argv.slice(3).filter((a) => !a.startsWith('--'));
const OLD = process.argv.includes('--old');
if (!file) {
  console.error('用法: node tools/_kartdeform.mjs dist/kart/maggot.bin [clip ...] [--old]');
  process.exit(2);
}
const d = kartDecode(fs.readFileSync(path.resolve(root, file)));
const N = d.rig.names.length;

// ---------- 四元数 ----------
const qmul = (a, ai, b, bi, o, oi) => {
  const ax = a[ai], ay = a[ai + 1], az = a[ai + 2], aw = a[ai + 3];
  const bx = b[bi], by = b[bi + 1], bz = b[bi + 2], bw = b[bi + 3];
  o[oi] = aw * bx + ax * bw + ay * bz - az * by;
  o[oi + 1] = aw * by - ax * bz + ay * bw + az * bx;
  o[oi + 2] = aw * bz + ax * by - ay * bx + az * bw;
  o[oi + 3] = aw * bw - ax * bx - ay * by - az * bz;
};
const qrot = (q, qi, x, y, z, o, oi) => {
  const qx = q[qi], qy = q[qi + 1], qz = q[qi + 2], qw = q[qi + 3];
  const tx = 2 * (qy * z - qz * y), ty = 2 * (qz * x - qx * z), tz = 2 * (qx * y - qy * x);
  o[oi] = x + qw * tx + (qy * tz - qz * ty);
  o[oi + 1] = y + qw * ty + (qz * tx - qx * tz);
  o[oi + 2] = z + qw * tz + (qx * ty - qy * tx);
};

// 父骨一定在子骨前面吗？GLB 节点顺序不保证，自己排一遍拓扑序
const order = [];
{
  const kids = Array.from({ length: N }, () => []);
  const roots = [];
  for (let j = 0; j < N; j++) (d.rig.parent[j] < 0 ? roots : kids[d.rig.parent[j]]).push(j);
  const stack = [...roots];
  const seen = new Uint8Array(N);
  while (stack.length) {
    const j = stack.pop();
    if (seen[j]) continue;
    seen[j] = 1;
    order.push(j);
    for (const c of kids[j]) stack.push(c);
  }
  for (let j = 0; j < N; j++) if (!seen[j]) order.push(j);
}

// ---------- 顶点：按引擎那套准备 ----------
// 有蒙皮顶点（rig.bindSpace）时顶点留在绑定世界空间；否则预变换到骨骼局部空间
// （每顶点单骨、权重 1 —— 和 src/47-kart.js 的 kartDef 一致）。
const P = d.mesh.pos, BW = d.rig.bindWorld, BQ = d.rig.bindWQ, SK = d.mesh.skin;
const BIND = d.rig.bindSpace;
const local = new Float32Array(P.length);
if (!BIND) {
  const o3 = [0, 0, 0], conj = [0, 0, 0, 0];
  for (let v = 0; v < P.length / 3; v++) {
    const j = SK[v * 3];
    conj[0] = -BQ[j * 4]; conj[1] = -BQ[j * 4 + 1]; conj[2] = -BQ[j * 4 + 2]; conj[3] = BQ[j * 4 + 3];
    qrot(conj, 0, P[v * 3] - BW[j * 3], P[v * 3 + 1] - BW[j * 3 + 1], P[v * 3 + 2] - BW[j * 3 + 2], o3, 0);
    local[v * 3] = o3[0]; local[v * 3 + 1] = o3[1]; local[v * 3 + 2] = o3[2];
  }
}

// ---------- FK ----------
const wp = new Float64Array(N * 3), wq = new Float64Array(N * 4), ws = new Float64Array(N * 3);
const tmp = [0, 0, 0];
function pose(t3, q4, s3) {
  for (const j of order) {
    const p = d.rig.parent[j];
    if (p < 0) {
      wp[j * 3] = t3[j * 3]; wp[j * 3 + 1] = t3[j * 3 + 1]; wp[j * 3 + 2] = t3[j * 3 + 2];
      wq[j * 4] = q4[j * 4]; wq[j * 4 + 1] = q4[j * 4 + 1]; wq[j * 4 + 2] = q4[j * 4 + 2]; wq[j * 4 + 3] = q4[j * 4 + 3];
      ws[j * 3] = s3[j * 3]; ws[j * 3 + 1] = s3[j * 3 + 1]; ws[j * 3 + 2] = s3[j * 3 + 2];
    } else {
      const kx = ws[p * 3], ky = ws[p * 3 + 1], kz = ws[p * 3 + 2];
      qrot(wq, p * 4, t3[j * 3] * kx, t3[j * 3 + 1] * ky, t3[j * 3 + 2] * kz, tmp, 0);
      wp[j * 3] = wp[p * 3] + tmp[0]; wp[j * 3 + 1] = wp[p * 3 + 1] + tmp[1]; wp[j * 3 + 2] = wp[p * 3 + 2] + tmp[2];
      qmul(wq, p * 4, q4, j * 4, wq, j * 4);
      ws[j * 3] = kx * s3[j * 3]; ws[j * 3 + 1] = ky * s3[j * 3 + 1]; ws[j * 3 + 2] = kz * s3[j * 3 + 2];
    }
  }
}
const out = new Float32Array(P.length);
const t1 = [0, 0, 0], t2 = [0, 0, 0];
// 单根骨对顶点的变换：wp + R(wq)·(S(s)·(R(bindQW)⁻¹·(v − bindWorld)))
// localVerts 时 v 已经在骨骼局部空间，跳过 q2 和 bindWorld
const cq = [0, 0, 0, 0];
function bonePos(j, v, o, oi) {
  const sx = ws[j * 3], sy = ws[j * 3 + 1], sz = ws[j * 3 + 2];
  if (BIND) {
    // 必须用逆绑定旋转（conj），正着转等于把顶点在绑定空间里多转一次
    cq[0] = -BQ[j * 4]; cq[1] = -BQ[j * 4 + 1]; cq[2] = -BQ[j * 4 + 2]; cq[3] = BQ[j * 4 + 3];
    qrot(cq, 0, v[0] - BW[j * 3], v[1] - BW[j * 3 + 1], v[2] - BW[j * 3 + 2], t1, 0);
    t1[0] *= sx; t1[1] *= sy; t1[2] *= sz;
    qrot(wq, j * 4, t1[0], t1[1], t1[2], t2, 0);
  } else qrot(wq, j * 4, v[0] * sx, v[1] * sy, v[2] * sz, t2, 0);
  o[oi] = wp[j * 3] + t2[0];
  o[oi + 1] = wp[j * 3 + 1] + t2[1];
  o[oi + 2] = wp[j * 3 + 2] + t2[2];
}
const a3 = [0, 0, 0], b3 = [0, 0, 0], vv = [0, 0, 0];
const SK2 = d.mesh.skin2;
// 四骨混合，和着色器一致：骨B 的权重按 1−wA−wC−wD 反推
function skin() {
  for (let v = 0; v < P.length / 3; v++) {
    if (BIND) (vv[0] = P[v * 3]), (vv[1] = P[v * 3 + 1]), (vv[2] = P[v * 3 + 2]);
    else (vv[0] = local[v * 3]), (vv[1] = local[v * 3 + 1]), (vv[2] = local[v * 3 + 2]);
    const wA = SK[v * 3 + 2], wC = SK2[v * 4 + 2], wD = SK2[v * 4 + 3];
    const wB = Math.max(0, 1 - wA - wC - wD);
    let ax = 0, ay = 0, az = 0;
    for (const [j, w] of [[SK[v * 3], wA], [SK[v * 3 + 1], wB], [SK2[v * 4], wC], [SK2[v * 4 + 1], wD]]) {
      if (w <= 5e-4) continue;
      bonePos(j, vv, b3, 0);
      ax += b3[0] * w; ay += b3[1] * w; az += b3[2] * w;
    }
    out[v * 3] = ax; out[v * 3 + 1] = ay; out[v * 3 + 2] = az;
  }
}
const bbox = () => {
  const b = [1e9, 1e9, 1e9, -1e9, -1e9, -1e9];
  for (let v = 0; v < out.length / 3; v++)
    for (let k = 0; k < 3; k++) {
      const x = out[v * 3 + k];
      if (x < b[k]) b[k] = x;
      if (x > b[k + 3]) b[k + 3] = x;
    }
  return [b[3] - b[0], b[4] - b[1], b[5] - b[2]];
};

// 边长拉伸：只取一部分三角形，够用了
const I = d.mesh.idx;
const edges = [];
for (let i = 0; i < I.length; i += 3 * 17) {
  for (const [a, b] of [[I[i], I[i + 1]], [I[i + 1], I[i + 2]], [I[i + 2], I[i]]]) if (a !== b) edges.push(a, b);
}
const edgeLen = () => {
  let m = 0;
  for (let e = 0; e < edges.length; e += 2) {
    const a = edges[e] * 3, b = edges[e + 1] * 3;
    const l = Math.hypot(out[a] - out[b], out[a + 1] - out[b + 1], out[a + 2] - out[b + 2]);
    const l0 = Math.hypot(P[a] - P[b], P[a + 1] - P[b + 1], P[a + 2] - P[b + 2]);
    if (l0 > 1e-4 && l / l0 > m) m = l / l0;
  }
  return m;
};

// 静置
{
  const t3 = new Float32Array(N * 3), q4 = new Float32Array(N * 4), s3 = new Float32Array(N * 3).fill(1);
  for (let j = 0; j < N; j++) {
    t3[j * 3] = d.rig.localPos[j * 3]; t3[j * 3 + 1] = d.rig.localPos[j * 3 + 1]; t3[j * 3 + 2] = d.rig.localPos[j * 3 + 2];
    for (let k = 0; k < 4; k++) q4[j * 4 + k] = d.rig.bindQ[j * 4 + k];
  }
  pose(t3, q4, s3);
  skin();
}
const rest = bbox();
// 自检：静置姿态蒙皮一遍。绑定姿态 = 节点静置姿态的模型应该回到原始顶点（只差 i16 量化）；
// 绑定姿态取自 inverseBindMatrices 的模型（雪松老师/大脚牛/小肥石/椰子/杯杯菇）本来就不为 0，
// 那是源模型的绑定姿态和静置姿态不同，原版渲染出来也是这样，不是 bug。
let restErr = 0;
for (let v = 0; v < P.length / 3; v++) {
  const dx = out[v * 3] - P[v * 3], dy = out[v * 3 + 1] - P[v * 3 + 1], dz = out[v * 3 + 2] - P[v * 3 + 2];
  const e = Math.hypot(dx, dy, dz);
  if (e > restErr) restErr = e;
}
const f = (x) => x.toFixed(2).padStart(6);
let twoBone = 0;
for (let v = 0; v < SK.length / 3; v++) if (SK[v * 3 + 2] < 0.999 || SK2[v * 4 + 2] > 1e-3) twoBone++;
console.log(
  `${path.basename(file)}  骨 ${N}  静置包围盒 ${rest.map(f).join(' ')}  多骨顶点 ${twoBone}/${SK.length / 3}` +
    `  静置偏差 ${restErr.toFixed(4)}` +
    (BIND ? '（绑定世界空间）' : '（骨骼局部空间）'),
);

const list = clips.length ? clips : Object.keys(d.anim);
for (const name of list) {
  const clip = d.anim[name];
  if (!clip) { console.log(`  ? 没有 ${name}`); continue; }
  const nJ = N, data = clip.data;
  let maxStretch = 0, worstFrame = 0, minSpan = [9, 9, 9], maxSpan = [0, 0, 0];
  const t3 = new Float32Array(nJ * 3), q4 = new Float32Array(nJ * 4), s3 = new Float32Array(nJ * 3);
  const rows = [];
  for (let fr = 0; fr < clip.frames; fr++) {
    for (let j = 0; j < nJ; j++) {
      const o = (fr * nJ + j) * 10;
      t3[j * 3] = d.rig.localPos[j * 3] + data[o];
      t3[j * 3 + 1] = d.rig.localPos[j * 3 + 1] + data[o + 1];
      t3[j * 3 + 2] = d.rig.localPos[j * 3 + 2] + data[o + 2];
      for (let k = 0; k < 4; k++) q4[j * 4 + k] = data[o + 3 + k];
      for (let k = 0; k < 3; k++) s3[j * 3 + k] = data[o + 7 + k];
      if (OLD) {
        const g = Math.cbrt(Math.max(1e-6, data[o + 7] * data[o + 8] * data[o + 9]));
        s3[j * 3] = s3[j * 3 + 1] = s3[j * 3 + 2] = g;
      }
    }
    pose(t3, q4, s3);
    skin();
    const b = bbox();
    for (let k = 0; k < 3; k++) {
      minSpan[k] = Math.min(minSpan[k], b[k]);
      maxSpan[k] = Math.max(maxSpan[k], b[k]);
    }
    const st = edgeLen();
    if (st > maxStretch) { maxStretch = st; worstFrame = fr; }
    if (fr % Math.ceil(clip.frames / 4) === 0) rows.push(`f${fr}:${b.map((x, k) => (x / rest[k]).toFixed(2)).join('×')}`);
  }
  console.log(
    `  ${name.padEnd(8)} 帧 ${String(clip.frames).padStart(3)}  轴向尺寸/静置 最短 ${minSpan.map((x, k) => (x / rest[k]).toFixed(2)).join('×')}` +
      ` 最长 ${maxSpan.map((x, k) => (x / rest[k]).toFixed(2)).join('×')}  最大边长拉伸 ${maxStretch.toFixed(2)}× (f${worstFrame})`,
  );
  console.log(`           ${rows.join('  ')}`);
  // 骨骼自身缩放到底动了多少
  let best = 0, bestInfo = '';
  for (let fr = 0; fr < clip.frames; fr++)
    for (let j = 0; j < nJ; j++) {
      const o = (fr * nJ + j) * 10;
      const a = data[o + 7], b2 = data[o + 8], c = data[o + 9];
      const dev = Math.max(Math.abs(a - 1), Math.abs(b2 - 1), Math.abs(c - 1));
      if (dev > best) { best = dev; bestInfo = `f${fr} ${d.rig.names[j]} s=${a.toFixed(2)},${b2.toFixed(2)},${c.toFixed(2)}`; }
    }
  console.log(`           骨骼最大缩放偏离 ${(best * 100).toFixed(0)}%  ${bestInfo}`);
}
