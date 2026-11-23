// Offline synthetic skinning check: detect mesh tearing by measuring
// per-triangle edge stretch across animation frames.
//
// Mirrors the engine shader exactly:
//   skinnedPos = mix(bone1(p), bone0(p), w)
// where bone_i(p) = worldPos_i - rot(bindQW_i^-1, bindWorld_i*scale) + scale*rot(worldQ_i*bindQW_i^-1, p)
//
// A well-behaved skinned mesh keeps edge lengths roughly constant over time.
// Tearing shows up as spikes in relative edge length change.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = fs.readFileSync(path.join(root, 'src/45-mushroom-mesh.js'), 'utf8');

const toF32 = (b64) => {
  const b = Buffer.from(b64, 'base64');
  const ab = b.buffer.slice(b.byteOffset, b.byteOffset + b.length);
  return new Float32Array(ab);
};
const toU32 = (b64) => {
  const b = Buffer.from(b64, 'base64');
  const ab = b.buffer.slice(b.byteOffset, b.byteOffset + b.length);
  return new Uint32Array(ab);
};

const names = JSON.parse(/names:\s*(\[[^\]]+\])/.exec(src)[1]);
const parent = JSON.parse(/parent:\s*(\[[^\]]+\])/.exec(src)[1]);
const N = names.length;
const bindWorld = toF32(/bindWorld:\s*"([^"]+)"/.exec(src)[1]);
const bindWQ = toF32(/bindWQ:\s*"([^"]+)"/.exec(src)[1]);
const bindQ = toF32(/bindQ:\s*"([^"]+)"/.exec(src)[1]);
const localPos = toF32(/localPos:\s*"([^"]+)"/.exec(src)[1]);
const pos = toF32(/pos:\s*"([^"]+)"/.exec(src)[1]);
const idx = toU32(/idx:\s*"([^"]+)"/.exec(src)[1]);
const skin = toF32(/skin:\s*"([^"]+)"/.exec(src)[1]);

const anims = {};
const re = /"?(\w+)"?:\s*\{\s*frames:\s*(\d+),\s*dur:\s*([\d.]+),\s*fps:\s*(\d+),\s*data:\s*"([^"]+)"/g;
for (let m; (m = re.exec(src)); ) anims[m[1]] = { frames: +m[2], dur: +m[3], data: toF32(m[5]) };

const qmul = (a, b) => [
  a[3]*b[0]+a[0]*b[3]+a[1]*b[2]-a[2]*b[1],
  a[3]*b[1]-a[0]*b[2]+a[1]*b[3]+a[2]*b[0],
  a[3]*b[2]+a[0]*b[1]-a[1]*b[0]+a[2]*b[3],
  a[3]*b[3]-a[0]*b[0]-a[1]*b[1]-a[2]*b[2],
];
const qnorm = (q) => { const l = Math.hypot(q[0],q[1],q[2],q[3]) || 1; return [q[0]/l,q[1]/l,q[2]/l,q[3]/l]; };
const qrot = (q, v) => {
  const [x,y,z,w] = q;
  const ix = w*v[0]+y*v[2]-z*v[1], iy = w*v[1]+z*v[0]-x*v[2], iz = w*v[2]+x*v[1]-y*v[0], iw = -x*v[0]-y*v[1]-z*v[2];
  return [ix*w+iw*-x+iy*-z-iz*-y, iy*w+iw*-y+iz*-x-ix*-z, iz*w+iw*-z+ix*-y-iy*-x];
};
const qinv = (q) => [-q[0], -q[1], -q[2], q[3]];

// 根关节的 --rotY 修正折叠在 bindQ[root] 里，但子节点的 bindQ 是纯局部的。
// 引擎运行时 pose.q[root] = qy * animQ[root]，所以 worldQ[root] = qy * animQ[root]，
// 向下累积后 worldQ[child] = qy * localWorldQ[child] —— 与 bindWQ 一致。
// 从 bindWQ[root] / bindQ[root] 反推 qy：
const qy = qmul(
  [bindWQ[0], bindWQ[1], bindWQ[2], bindWQ[3]],
  qinv([bindQ[0], bindQ[1], bindQ[2], bindQ[3]]),
);
const rootI = parent.indexOf(-1);

// Solve world transforms for a given animation frame (same as engine)
function solveFrame(anim, frame) {
  const a = anims[anim];
  const wp = new Float64Array(N * 3);
  const wq = new Float64Array(N * 4);
  for (let j = 0; j < N; j++) {
    const o = (frame * N + j) * 7;
    let q = [a.data[o+3], a.data[o+4], a.data[o+5], a.data[o+6]];
    // 动画数据里的根四元数已折叠 qy，不要再叠一次
    const lp = [
      localPos[j*3] + a.data[o],
      localPos[j*3+1] + a.data[o+1],
      localPos[j*3+2] + a.data[o+2],
    ];
    const p = parent[j];
    if (p < 0) {
      wp[j*3] = lp[0]; wp[j*3+1] = lp[1]; wp[j*3+2] = lp[2];
      wq[j*4] = q[0]; wq[j*4+1] = q[1]; wq[j*4+2] = q[2]; wq[j*4+3] = q[3];
    } else {
      const pq = [wq[p*4], wq[p*4+1], wq[p*4+2], wq[p*4+3]];
      const r = qrot(pq, lp);
      wp[j*3] = wp[p*3] + r[0];
      wp[j*3+1] = wp[p*3+1] + r[1];
      wp[j*3+2] = wp[p*3+2] + r[2];
      const mq = qmul(pq, q);
      wq[j*4] = mq[0]; wq[j*4+1] = mq[1]; wq[j*4+2] = mq[2]; wq[j*4+3] = mq[3];
    }
  }
  return { wp, wq };
}

// 绑定姿态的 world 变换（pose.q = bindQ，根要叠 qy）
function solveBind() {
  const wp = new Float64Array(N * 3);
  const wq = new Float64Array(N * 4);
  for (let j = 0; j < N; j++) {
    let q = [bindQ[j*4], bindQ[j*4+1], bindQ[j*4+2], bindQ[j*4+3]];
    if (j === rootI) q = qmul(qy, q);
    const lp = [localPos[j*3], localPos[j*3+1], localPos[j*3+2]];
    const p = parent[j];
    if (p < 0) {
      wp[j*3] = lp[0]; wp[j*3+1] = lp[1]; wp[j*3+2] = lp[2];
      wq[j*4] = q[0]; wq[j*4+1] = q[1]; wq[j*4+2] = q[2]; wq[j*4+3] = q[3];
    } else {
      const pq = [wq[p*4], wq[p*4+1], wq[p*4+2], wq[p*4+3]];
      const r = qrot(pq, lp);
      wp[j*3] = wp[p*3] + r[0];
      wp[j*3+1] = wp[p*3+1] + r[1];
      wp[j*3+2] = wp[p*3+2] + r[2];
      const mq = qmul(pq, q);
      wq[j*4] = mq[0]; wq[j*4+1] = mq[1]; wq[j*4+2] = mq[2]; wq[j*4+3] = mq[3];
    }
  }
  return { wp, wq };
}

// Skin matrix for bone c: T(worldPos)·R(worldQ·bindWQ⁻¹)·T(-bindWorld)
// 引擎 pack()：Ua(o, c*4, pb, 0, qb, 0) → qb = worldQ * bindWQ⁻¹
//           Da(qb, 0, bindWorld*scale, Aa, 0) → Aa = rot(qb, bindWorld*scale)
// 着色器：   skinned = ps.xyz + ps.w * rot(qb, vertexPos)
//           ps.xyz = worldPos - Aa
function boneXf(c, wp, wq) {
  const inv = qinv([bindWQ[c*4], bindWQ[c*4+1], bindWQ[c*4+2], bindWQ[c*4+3]]);
  const rel = qmul([wq[c*4], wq[c*4+1], wq[c*4+2], wq[c*4+3]], inv);
  const off = qrot(rel, [bindWorld[c*3], bindWorld[c*3+1], bindWorld[c*3+2]]);
  return {
    rel,
    ox: wp[c*3] - off[0],
    oy: wp[c*3+1] - off[1],
    oz: wp[c*3+2] - off[2],
  };
}

function skinVertex(v, wp, wq) {
  const p = [pos[v*3], pos[v*3+1], pos[v*3+2]];
  const a = Math.round(skin[v*3]), b = Math.round(skin[v*3+1]), w = skin[v*3+2];
  const xa = boneXf(a, wp, wq);
  const ra = qrot(xa.rel, p);
  let out = [xa.ox + ra[0], xa.oy + ra[1], xa.oz + ra[2]];
  if (w < 0.999) {
    const xb = boneXf(b, wp, wq);
    const rb = qrot(xb.rel, p);
    const pb = [xb.ox + rb[0], xb.oy + rb[1], xb.oz + rb[2]];
    out = [pb[0] + (out[0]-pb[0])*w, pb[1] + (out[1]-pb[1])*w, pb[2] + (out[2]-pb[2])*w];
  }
  return out;
}

// Collect unique edges from triangles
const edges = new Map();
for (let i = 0; i < idx.length; i += 3) {
  const t = [idx[i], idx[i+1], idx[i+2]];
  for (let k = 0; k < 3; k++) {
    const a = t[k], b = t[(k+1)%3];
    const key = a < b ? a + ':' + b : b + ':' + a;
    if (!edges.has(key)) edges.set(key, [a, b]);
  }
}
const edgeList = [...edges.values()];

console.log(`Vertices: ${pos.length/3}, triangles: ${idx.length/3}, unique edges: ${edgeList.length}`);

// ── 自检：绑定姿态下蒙皮应还原原始顶点位置 ──────────────
// solveBind() 用 pose.q = bindQ, pose.t = 0, yaw = 0 (qy = identity)
// 引擎 rest() 时也是这个状态，所以蒙皮结果应该等于原始顶点位置
{
  const { wp, wq } = solveBind();
  // 验证 solveBind 的 world 变换是否和 bindWorld/bindWQ 一致
  let maxWErr = 0, maxQErr = 0;
  for (let j = 0; j < N; j++) {
    const we = Math.hypot(wp[j*3]-bindWorld[j*3], wp[j*3+1]-bindWorld[j*3+1], wp[j*3+2]-bindWorld[j*3+2]);
    if (we > maxWErr) maxWErr = we;
    const qe = Math.abs(wq[j*4]-bindWQ[j*4]) + Math.abs(wq[j*4+1]-bindWQ[j*4+1]) + Math.abs(wq[j*4+2]-bindWQ[j*4+2]) + Math.abs(wq[j*4+3]-bindWQ[j*4+3]);
    if (qe > maxQErr) maxQErr = qe;
  }
  console.log(`solveBind vs bindWorld/bindWQ: maxPosErr=${maxWErr.toFixed(6)} maxQuatErr=${maxQErr.toFixed(6)}`);

  let maxErr = 0, worstV = -1;
  for (let v = 0; v < pos.length / 3; v++) {
    const p = skinVertex(v, wp, wq);
    const e = Math.hypot(p[0]-pos[v*3], p[1]-pos[v*3+1], p[2]-pos[v*3+2]);
    if (e > maxErr) { maxErr = e; worstV = v; }
  }
  console.log(`自检：绑定姿态蒙皮还原误差 max=${maxErr.toFixed(6)} (顶点 ${worstV})`);
  if (maxErr > 0.01) {
    // 调试：看最差顶点的骨骼信息
    const v = worstV;
    const a = Math.round(skin[v*3]), b = Math.round(skin[v*3+1]), w = skin[v*3+2];
    const p = [pos[v*3], pos[v*3+1], pos[v*3+2]];
    const sp = skinVertex(v, wp, wq);
    console.log(`  顶点 ${v}: pos=[${p.map(x=>x.toFixed(4))}] skinned=[${sp.map(x=>x.toFixed(4))}]`);
    console.log(`  骨骼: A=${names[a]} B=${names[b]} w=${w.toFixed(4)}`);
    const xa = boneXf(a, wp, wq);
    const ra = qrot(xa.rel, p);
    const pa = [xa.ox + ra[0], xa.oy + ra[1], xa.oz + ra[2]];
    console.log(`  主骨骼结果: [${pa.map(x=>x.toFixed(4))}] off=[${[xa.ox,xa.oy,xa.oz].map(x=>x.toFixed(4))}] rel=[${xa.rel.map(x=>x.toFixed(4))}]`);
    if (w < 0.999) {
      const xb = boneXf(b, wp, wq);
      const rb = qrot(xb.rel, p);
      const pb = [xb.ox + rb[0], xb.oy + rb[1], xb.oz + rb[2]];
      console.log(`  次骨骼结果: [${pb.map(x=>x.toFixed(4))}] off=[${[xb.ox,xb.oy,xb.oz].map(x=>x.toFixed(4))}] rel=[${xb.rel.map(x=>x.toFixed(4))}]`);
    }
  }
  // 量级信息
  let maxR = 0;
  for (let v = 0; v < pos.length/3; v++) maxR = Math.max(maxR, Math.hypot(pos[v*3], pos[v*3+1], pos[v*3+2]));
  console.log(`顶点到原点最大距离 ${maxR.toFixed(3)}`);
}

// ── 撕裂检测（更准的方法）────────────────────────────────
// 对每个双骨骼顶点，比较"只主骨骼"和"只按次骨骼"两种结果。
// 正常情况下两者应当在绑定姿态附近重合（权重小的那根影响很弱）；
// 如果撕裂，说明两根骨骼在该顶点处的 bindWorld 差得太远，
// 混合出来位置落在两根骨骼之间的"虚空"，既不属于 A 也不属于 B。
// 用「主骨骼位置与混合位置的偏差」相对顶点自身到主骨骼距离的比值来衡量。
function tearScore(anim) {
  const a = anims[anim];
  let worst = 0, worstInfo = '', sum = 0, cnt = 0;
  const step = Math.max(1, Math.floor(a.frames / 10));
  for (let f = 0; f < a.frames; f += step) {
    const { wp, wq } = solveFrame(anim, f);
    for (let v = 0; v < pos.length / 3; v++) {
      const bIdx = Math.round(skin[v*3+1]), w = skin[v*3+2];
      if (w >= 0.999) continue;         // 单骨骼顶点不会撕裂
      const p = [pos[v*3], pos[v*3+1], pos[v*3+2]];
      const xa = boneXf(Math.round(skin[v*3]), wp, wq);
      const xb = boneXf(bIdx, wp, wq);
      const pa = [xa.ox + qrot(xa.rel,p)[0], xa.oy + qrot(xa.rel,p)[1], xa.oz + qrot(xa.rel,p)[2]];
      const pb = [xb.ox + qrot(xb.rel,p)[0], xb.oy + qrot(xb.rel,p)[1], xb.oz + qrot(xb.rel,p)[2]];
      const mixed = [pb[0]+(pa[0]-pb[0])*w, pb[1]+(pa[1]-pb[1])*w, pb[2]+(pa[2]-pb[2])*w];
      // 混合结果离主骨骼有多远（绝对值）
      const dev = Math.hypot(mixed[0]-pa[0], mixed[1]-pa[1], mixed[2]-pa[2]);
      // 两根骨骼在该顶点处的绑定空间距离（撕裂的根因）
      const sep = Math.hypot(
        bindWorld[Math.round(skin[v*3])*3] - bindWorld[bIdx*3],
        bindWorld[Math.round(skin[v*3])*3+1] - bindWorld[bIdx*3+1],
        bindWorld[Math.round(skin[v*3])*3+2] - bindWorld[bIdx*3+2]);
      if (sep < 0.05) continue;         // 绑定位置几乎重合，不可能有撕裂
      const ratio = dev / sep;         // 归一化：1 = 完全撕裂
      sum += ratio; cnt++;
      if (ratio > worst) {
        worst = ratio;
        worstInfo = `${names[Math.round(skin[v*3])]}/${names[bIdx]} w=${w.toFixed(2)} sep=${sep.toFixed(2)}`;
      }
    }
  }
  return { worst, avg: cnt ? sum/cnt : 0, worstInfo, cnt };
}

// For each animation, measure edge length stability
console.log('\n=== 撕裂检测（混合结果偏离主骨骼的比例）===');
for (const name of Object.keys(anims)) {
  const r = tearScore(name);
  console.log(`${name.padEnd(16)} 双骨顶点 ${String(r.cnt).padStart(4)}  平均 ${(r.avg*100).toFixed(1)}%  最差 ${(r.worst*100).toFixed(1)}%  ${r.worstInfo}`);
}

console.log('\n=== 边长稳定性（相对首帧，仅看 >0.05 的边）===');
for (const name of Object.keys(anims)) {
  const a = anims[name];
  const frames = a.frames;
  const f0 = solveFrame(name, 0);
  const base = new Map();
  for (const [ea, eb] of edgeList) {
    const pa = skinVertex(ea, f0.wp, f0.wq);
    const pb = skinVertex(eb, f0.wp, f0.wq);
    const len = Math.hypot(pa[0]-pb[0], pa[1]-pb[1], pa[2]-pb[2]);
    if (len > 0.05) base.set(ea + ':' + eb, len); // 忽略短边
  }
  let worst = 0, worstEdge = '', worstAbs = 0;
  let sumRel = 0, cnt = 0;
  const step = Math.max(1, Math.floor(frames / 8));
  for (let f = step; f < frames; f += step) {
    const ff = solveFrame(name, f);
    for (const [ea, eb] of edgeList) {
      const key = ea + ':' + eb;
      const b0 = base.get(key);
      if (!b0) continue;
      const pa = skinVertex(ea, ff.wp, ff.wq);
      const pb = skinVertex(eb, ff.wp, ff.wq);
      const d = Math.hypot(pa[0]-pb[0], pa[1]-pb[1], pa[2]-pb[2]);
      const absDiff = Math.abs(d - b0);
      const rel = absDiff / b0;
      sumRel += rel; cnt++;
      if (rel > worst) { worst = rel; worstEdge = names[Math.round(skin[ea*3])] + '/' + names[Math.round(skin[eb*3])]; worstAbs = absDiff; }
    }
  }
  console.log(`${name.padEnd(16)} 平均变化 ${(sumRel/cnt*100).toFixed(2)}%  最大 ${(worst*100).toFixed(1)}% (Δ=${worstAbs.toFixed(4)}) (${worstEdge})`);
}
