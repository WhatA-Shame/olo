// 逐骨对照：原始 GLB 的世界变换 vs 我们 .bin 的 FK。
// 专门用来查"零件飞了/腿脚分开/拉长不对"这类节点动画问题 —— 直接指出是哪根骨、差多少。
//
// node tools/_fkcheck.mjs "路径.glb" dist/kart/xxx.bin <clip> <frame> [--top=20]
import fs from 'node:fs';

const glbPath = process.argv[2];
const binPath = process.argv[3];
const wantClip = process.argv[4];
const wantFrame = +(process.argv[5] ?? 0);
const TOP = +(process.argv.find((a) => a.startsWith('--top=')) || '').split('=')[1] || 20;
if (!glbPath || !binPath) {
  console.error('用法: node tools/_fkcheck.mjs x.glb dist/kart/x.bin [clip] [frame]');
  process.exit(2);
}

const { kartDecode } = await import('../src/47-kart-decode.js');

// ---------- GLB ----------
const buf = fs.readFileSync(glbPath);
let o = 12, json = null, bin = null;
while (o < buf.length) {
  const len = buf.readUInt32LE(o), type = buf.readUInt32LE(o + 4);
  const chunk = buf.subarray(o + 8, o + 8 + len);
  if (type === 0x4e4f534a) json = JSON.parse(chunk.toString('utf8'));
  else if (type === 0x004e4942) bin = chunk;
  o += 8 + len + ((4 - (len % 4)) % 4);
}
const CT = { 5120: Int8Array, 5121: Uint8Array, 5122: Int16Array, 5123: Uint16Array, 5125: Uint32Array, 5126: Float32Array };
const NC = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT4: 16 };
function readAcc(i) {
  const a = json.accessors[i], n = NC[a.type], C = CT[a.componentType];
  const bv = json.bufferViews[a.bufferView];
  const base = (bv.byteOffset || 0) + (a.byteOffset || 0);
  const stride = bv.byteStride || n * C.BYTES_PER_ELEMENT;
  const dv = new DataView(bin.buffer, bin.byteOffset);
  const out = new Float64Array(a.count * n);
  for (let k = 0; k < a.count; k++)
    for (let c = 0; c < n; c++) {
      const off = base + k * stride + c * C.BYTES_PER_ELEMENT;
      let v;
      switch (a.componentType) {
        case 5126: v = dv.getFloat32(off, true); break;
        case 5125: v = dv.getUint32(off, true); break;
        case 5123: v = dv.getUint16(off, true); break;
        case 5122: v = dv.getInt16(off, true); break;
        case 5121: v = dv.getUint8(off); break;
        default: v = dv.getInt8(off);
      }
      out[k * n + c] = v;
    }
  return out;
}
const nodes = json.nodes;
const par = new Array(nodes.length).fill(-1);
nodes.forEach((n, i) => (n.children || []).forEach((c) => (par[c] = i)));

function trs(t, r, s) {
  const [x, y, z, w] = r, x2 = x + x, y2 = y + y, z2 = z + z;
  const xx = x * x2, xy = x * y2, xz = x * z2, yy = y * y2, yz = y * z2, zz = z * z2;
  const wx = w * x2, wy = w * y2, wz = w * z2;
  return new Float64Array([
    (1 - (yy + zz)) * s[0], (xy + wz) * s[0], (xz - wy) * s[0], 0,
    (xy - wz) * s[1], (1 - (xx + zz)) * s[1], (yz + wx) * s[1], 0,
    (xz + wy) * s[2], (yz - wx) * s[2], (1 - (xx + yy)) * s[2], 0,
    t[0], t[1], t[2], 1,
  ]);
}
const mul = (a, b) => {
  const o2 = new Float64Array(16);
  for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) {
    let s = 0;
    for (let k = 0; k < 4; k++) s += a[k * 4 + r] * b[c * 4 + k];
    o2[c * 4 + r] = s;
  }
  return o2;
};
const restLocal = nodes.map((n) =>
  n.matrix ? Float64Array.from(n.matrix) : trs(n.translation || [0, 0, 0], n.rotation || [0, 0, 0, 1], n.scale || [1, 1, 1]),
);

// ---------- 采样 clip ----------
const clipNames = (json.animations || []).map((a) => a.name);
const clip = (json.animations || []).find((a) => a.name === wantClip) || json.animations[0];
const dur = Math.max(...clip.samplers.map((s) => readAcc(s.input).at(-1)));
const t = dur > 0 ? (wantFrame / 24) % dur : 0;
const local = restLocal.slice();
// 先把每个节点的通道值收齐再建矩阵 —— 逐通道直接写 local[] 会被后面的通道覆盖
// （translation 被 rotation 覆盖，结果等于用了静置平移，整棵树位置全错）
const chVal = new Map();
for (const ch of clip.channels) {
  const p = ch.target.path;
  if (p !== 'translation' && p !== 'rotation' && p !== 'scale') continue;
  const s = clip.samplers[ch.sampler];
  const inp = readAcc(s.input), outp = readAcc(s.output);
  const n = inp.length, nc = outp.length / n;
  const val = (() => {
    if (t <= inp[0]) return Array.from(outp.slice(0, nc));
    if (t >= inp[n - 1]) return Array.from(outp.slice((n - 1) * nc, n * nc));
    let k = 0;
    while (k < n - 2 && inp[k + 1] < t) k++;
    const u = (t - inp[k]) / (inp[k + 1] - inp[k] || 1);
    const A = Array.from(outp.slice(k * nc, k * nc + nc)), B = Array.from(outp.slice((k + 1) * nc, (k + 1) * nc + nc));
    if (nc === 4) {
      let d = A.reduce((s2, v, i) => s2 + v * B[i], 0);
      if (d < 0) for (let i = 0; i < 4; i++) B[i] = -B[i];
      const r = A.map((v, i) => v + (B[i] - v) * u);
      const L = Math.hypot(...r) || 1;
      return r.map((v) => v / L);
    }
    return A.map((v, i) => v + (B[i] - v) * u);
  })();
  if (!chVal.has(ch.target.node)) chVal.set(ch.target.node, {});
  chVal.get(ch.target.node)[p] = val;
}
for (const [ni, v] of chVal) {
  const nd = nodes[ni];
  local[ni] = trs(
    v.translation || (nd.translation ? [...nd.translation] : [0, 0, 0]),
    v.rotation || (nd.rotation ? [...nd.rotation] : [0, 0, 0, 1]),
    v.scale || (nd.scale ? [...nd.scale] : [1, 1, 1]),
  );
}
const roots = nodes.map((_, i) => i).filter((i) => par[i] < 0);
const world = new Array(nodes.length).fill(null);
const walk = (i, pm) => {
  const m = pm ? mul(pm, local[i]) : local[i];
  world[i] = m;
  for (const c of nodes[i].children || []) walk(c, m);
};
for (const r of roots) walk(r, null);
const gwp = (i) => [world[i][12], world[i][13], world[i][14]];
const gsc = (i) => [0, 1, 2].map((c) => Math.hypot(world[i][c * 4], world[i][c * 4 + 1], world[i][c * 4 + 2]));
// .bin 里的 ws 是"相对烘焙缩放"的比值，不是绝对缩放。这里把 GLB 的绝对缩放换算成同一个口径
// 才能直接比：bakeChain = 沿骨链累乘的烘焙缩放（退化轴按 glb2kart 的规则取 1）。
const bakeS = nodes.map((n) =>
  (n.matrix ? [1, 1, 1] : n.scale || [1, 1, 1]).map((v) => (Math.abs(v) < 0.02 ? 1 : v)),
);
const bakeChain = new Array(nodes.length).fill(null);
const bc = (i) => {
  if (bakeChain[i]) return bakeChain[i];
  const p = par[i];
  const s = bakeS[i];
  if (p < 0) return (bakeChain[i] = [...s]);
  const ps = bc(p);
  return (bakeChain[i] = [ps[0] * s[0], ps[1] * s[1], ps[2] * s[2]]);
};
nodes.forEach((_, i) => bc(i));

// ---------- 我们这边 ----------
const d = kartDecode(fs.readFileSync(binPath));
const N = d.rig.names.length;
const order = [];
{
  const kids = Array.from({ length: N }, () => []);
  const rs = [];
  for (let j = 0; j < N; j++) (d.rig.parent[j] < 0 ? rs : kids[d.rig.parent[j]]).push(j);
  const st = [...rs], seen = new Uint8Array(N);
  while (st.length) {
    const j = st.pop();
    if (seen[j]) continue;
    seen[j] = 1; order.push(j);
    for (const c of kids[j]) st.push(c);
  }
  for (let j = 0; j < N; j++) if (!seen[j]) order.push(j);
}
const qrot = (q, qi, x, y, z, o2, oi) => {
  const qx = q[qi], qy = q[qi + 1], qz = q[qi + 2], qw = q[qi + 3];
  const tx = 2 * (qy * z - qz * y), ty = 2 * (qz * x - qx * z), tz = 2 * (qx * y - qy * x);
  o2[oi] = x + qw * tx + (qy * tz - qz * ty);
  o2[oi + 1] = y + qw * ty + (qz * tx - qx * tz);
  o2[oi + 2] = z + qw * tz + (qx * ty - qy * tx);
};
const qmul = (a, ai, b, bi, o2, oi) => {
  const ax = a[ai], ay = a[ai + 1], az = a[ai + 2], aw = a[ai + 3];
  const bx = b[bi], by = b[bi + 1], bz = b[bi + 2], bw = b[bi + 3];
  o2[oi] = aw * bx + ax * bw + ay * bz - az * by;
  o2[oi + 1] = aw * by - ax * bz + ay * bw + az * bx;
  o2[oi + 2] = aw * bz + ax * by - ay * bx + az * bw;
  o2[oi + 3] = aw * bw - ax * bx - ay * by - az * bz;
};
// 找 clip：GLB 里是中文名，.bin 里是英文别名（和 tools/glb2kart.mjs 的 ANIM_ALIAS 一致）
const ALIAS = {
  待机: 'idle', 行走: 'walk', 嘲讽: 'taunt', 笑话: 'joke', 跳舞: 'dance',
  左拐: 'turnL', 右拐: 'turnR', 急停: 'stop', 眩晕: 'stun',
  小加速: 'accelS', 中加速: 'accelM', 大加速: 'accelL', 失控: 'spin',
  庆祝: 'cheer', 滞空: 'air', 左攻击: 'attackL', 右攻击: 'attackR', 普通攻击: 'attack',
  复活: 'revive', 死亡: 'die', 吟唱: 'chant', 跑起来: 'run', 撞车震飞: 'fall', 起步抖动: 'start',
};
const ourName = ALIAS[clip.name] || clip.name;
const ourClip = d.anim[ourName];
if (!ourClip) {
  console.log(`  ! .bin 里没有 ${clip.name} → ${ourName}，可用: ${Object.keys(d.anim).join(',')}`);
  process.exit(1);
}
const wp = new Float64Array(N * 3), wq = new Float64Array(N * 4), ws = new Float64Array(N * 3);
const tmp = [0, 0, 0];
const fr = Math.min(ourClip.frames - 1, wantFrame);
for (const j of order) {
  const o2 = (fr * N + j) * 10, p = d.rig.parent[j];
  const t3 = [d.rig.localPos[j * 3] + ourClip.data[o2], d.rig.localPos[j * 3 + 1] + ourClip.data[o2 + 1], d.rig.localPos[j * 3 + 2] + ourClip.data[o2 + 2]];
  const s3 = [ourClip.data[o2 + 7], ourClip.data[o2 + 8], ourClip.data[o2 + 9]];
  if (p < 0) {
    for (let k = 0; k < 3; k++) { wp[j * 3 + k] = t3[k]; ws[j * 3 + k] = s3[k]; }
    for (let k = 0; k < 4; k++) wq[j * 4 + k] = ourClip.data[o2 + 3 + k];
  } else {
    const kx = ws[p * 3], ky = ws[p * 3 + 1], kz = ws[p * 3 + 2];
    qrot(wq, p * 4, t3[0] * kx, t3[1] * ky, t3[2] * kz, tmp, 0);
    for (let k = 0; k < 3; k++) wp[j * 3 + k] = wp[p * 3 + k] + tmp[k];
    qmul(wq, p * 4, ourClip.data, o2 + 3, wq, j * 4);
    ws[j * 3] = kx * s3[0]; ws[j * 3 + 1] = ky * s3[1]; ws[j * 3 + 2] = kz * s3[2];
  }
}

// ---------- 比对 ----------
console.log(`${glbPath}\n  clip ${clip.name}（${clip.frames} 帧）frame ${wantFrame}  → 我们这边 ${ourClip.frames} 帧`);
const nameIdx = new Map(d.rig.names.map((n, i) => [n, i]));
const rows = [];
for (let i = 0; i < nodes.length; i++) {
  const nm = nodes[i].name;
  const j = nameIdx.get(nm);
  if (j == null) continue;
  const g = gwp(i), m = [wp[j * 3], wp[j * 3 + 1], wp[j * 3 + 2]];
  const dist = Math.hypot(g[0] - m[0], g[1] - m[1], g[2] - m[2]);
  const gs = gsc(i).map((v, k) => v / (bc(i)[k] || 1)), // 换算成"相对烘焙缩放的比值"
    ms = [ws[j * 3], ws[j * 3 + 1], ws[j * 3 + 2]];
  const sErr = Math.max(...[0, 1, 2].map((k) => Math.abs(gs[k] - ms[k]) / Math.max(1e-6, gs[k])));
  rows.push({ nm, dist, g, m, gs, ms, sErr, mesh: nodes[i].mesh != null });
}
rows.sort((a, b) => b.dist - a.dist);
const f = (x) => x.toFixed(3).padStart(8);
console.log(`  位置差最大的 ${TOP} 根骨：`);
for (const r of rows.slice(0, TOP))
  console.log(
    `  ${r.nm.padEnd(10)} 差 ${r.dist.toFixed(3).padStart(7)}  GLB(${r.g.map(f).join(',')})  我们(${r.m.map(f).join(',')})` +
      `  缩放 GLB(${r.gs.map((x) => x.toFixed(3)).join(',')}) 我们(${r.ms.map((x) => x.toFixed(3)).join(',')})${r.mesh ? ' [有网格]' : ''}`,
  );
const bad = rows.filter((r) => r.dist > 0.05);
console.log(`  位置差 >0.05 的骨：${bad.length} / ${rows.length}`);
// 按拓扑序找**第一根**出错的骨：它的父是对的、它自己是错的 —— 问题就在它身上
const byName = new Map(rows.map((r) => [r.nm, r]));
const gIdx = new Map(nodes.map((n, i) => [n.name, i]));
console.log('  拓扑序上第一根错的骨：');
let shown = 0;
for (const j of order) {
  if (shown >= 6) break;
  const nm = d.rig.names[j];
  const r = byName.get(nm);
  if (!r || r.dist <= 0.05) continue;
  const gi = gIdx.get(nm);
  const pnm = gi != null && par[gi] >= 0 ? nodes[par[gi]].name : '(根)';
  const pr = byName.get(pnm);
  console.log(
    `    ${nm.padEnd(10)} 差 ${r.dist.toFixed(3).padStart(7)}  父=${pnm}${pr ? `(父差 ${pr.dist.toFixed(3)})` : ''}` +
      `  GLB(${r.g.map(f).join(',')}) 我们(${r.m.map(f).join(',')})`,
  );
  shown++;
}
// 缩放口径说明：ws 是"相对静置的比值"，不是绝对缩放，别直接和 GLB 比
console.log('  （下面缩放对比已换算成绝对：我们 ws × 静置世界缩放）');
const badS = rows.filter((r) => r.sErr > 0.05);
console.log(`  缩放相对差 >5% 的骨：${badS.length}`);
for (const r of badS.sort((a, b) => b.sErr - a.sErr).slice(0, 8))
  console.log(`    ${r.nm.padEnd(10)} GLB(${r.gs.map((x) => x.toFixed(4)).join(',')}) 我们(${r.ms.map((x) => x.toFixed(4)).join(',')})`);

// ── --parts：逐 mesh 节点比顶点世界坐标（GLB vs 我们）────────────────
// 骨位置对但零件看着分开，就是顶点层面错了。这里按节点分组报最大偏差。
if (process.argv.includes('--parts')) {
  const qconj = (q, i) => [-q[i], -q[i + 1], -q[i + 2], q[i + 3]];
  const cq = [0, 0, 0, 0], t1 = [0, 0, 0], t2 = [0, 0, 0];
  const P = d.mesh.pos, BW = d.rig.bindWorld, BQ = d.rig.bindWQ, SK = d.mesh.skin;
  const BIND = d.rig.bindSpace;
  const local = new Float32Array(P.length);
  if (!BIND) {
    for (let v = 0; v < P.length / 3; v++) {
      const j = SK[v * 3];
      cq[0] = -BQ[j * 4]; cq[1] = -BQ[j * 4 + 1]; cq[2] = -BQ[j * 4 + 2]; cq[3] = BQ[j * 4 + 3];
      qrot(cq, 0, P[v * 3] - BW[j * 3], P[v * 3 + 1] - BW[j * 3 + 1], P[v * 3 + 2] - BW[j * 3 + 2], t1, 0);
      local[v * 3] = t1[0]; local[v * 3 + 1] = t1[1]; local[v * 3 + 2] = t1[2];
    }
  }
  const ours = new Float64Array(P.length);
  for (let v = 0; v < P.length / 3; v++) {
    const jA = SK[v * 3], jB = SK[v * 3 + 1], wA = SK[v * 3 + 2];
    const vx = BIND ? P[v * 3] : local[v * 3], vy = BIND ? P[v * 3 + 1] : local[v * 3 + 1], vz = BIND ? P[v * 3 + 2] : local[v * 3 + 2];
    const one = (j, o) => {
      if (BIND) {
        cq[0] = -BQ[j * 4]; cq[1] = -BQ[j * 4 + 1]; cq[2] = -BQ[j * 4 + 2]; cq[3] = BQ[j * 4 + 3];
        qrot(cq, 0, vx - BW[j * 3], vy - BW[j * 3 + 1], vz - BW[j * 3 + 2], t1, 0);
      } else { t1[0] = vx; t1[1] = vy; t1[2] = vz; }
      t1[0] *= ws[j * 3]; t1[1] *= ws[j * 3 + 1]; t1[2] *= ws[j * 3 + 2];
      qrot(wq, j * 4, t1[0], t1[1], t1[2], t2, 0);
      o[0] = wp[j * 3] + t2[0]; o[1] = wp[j * 3 + 1] + t2[1]; o[2] = wp[j * 3 + 2] + t2[2];
    };
    const a3 = [0, 0, 0], b3 = [0, 0, 0];
    one(jA, a3);
    if (wA < 0.999) { one(jB, b3); for (let k = 0; k < 3; k++) a3[k] = b3[k] + (a3[k] - b3[k]) * wA; }
    ours[v * 3] = a3[0]; ours[v * 3 + 1] = a3[1]; ours[v * 3 + 2] = a3[2];
  }
  // GLB 侧：按节点顺序遍历，和 glb2kart 的顶点累加顺序一致
  const groups = [];
  let base = 0;
  for (let i = 0; i < nodes.length; i++) {
    const nd = nodes[i];
    if (nd.mesh == null || !world[i]) continue;
    const m = world[i];
    let n = 0, worst = 0, wx = 0, wy = 0, wz = 0;
    for (const pr of json.meshes[nd.mesh].primitives) {
      if (pr.attributes.POSITION == null) continue;
      const lp = readAcc(pr.attributes.POSITION);
      for (let k = 0; k < lp.length / 3; k++) {
        const x = lp[k * 3], y = lp[k * 3 + 1], z = lp[k * 3 + 2];
        const X = m[0] * x + m[4] * y + m[8] * z + m[12];
        const Y = m[1] * x + m[5] * y + m[9] * z + m[13];
        const Z = m[2] * x + m[6] * y + m[10] * z + m[14];
        const v = base + n;
        const dd = Math.hypot(X - ours[v * 3], Y - ours[v * 3 + 1], Z - ours[v * 3 + 2]);
        if (dd > worst) { worst = dd; wx = X; wy = Y; wz = Z; }
        n++;
      }
    }
    groups.push({ name: nd.name, n, worst, g: [wx, wy, wz] });
    base += n;
  }
  groups.sort((a, b) => b.worst - a.worst);
  console.log(`  顶点总数 ${base}（我们 ${P.length / 3}）`);
  console.log('  顶点偏差最大的零件：');
  for (const g of groups.slice(0, 10))
    console.log(`    ${g.name.padEnd(10)} 顶点 ${String(g.n).padStart(5)}  最大偏差 ${g.worst.toFixed(3).padStart(7)}  GLB 最差点(${g.g.map((x) => x.toFixed(2)).join(',')})`);
  const badG = groups.filter((g) => g.worst > 0.05);
  console.log(`  偏差 >0.05 的零件：${badG.length} / ${groups.length}`);
}
