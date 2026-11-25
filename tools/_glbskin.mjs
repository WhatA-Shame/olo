// 基准核对：直接用原始 GLB 做**完整 4 骨 LBS + 完整矩阵**（不做任何 TRS 近似），
// 量蒙皮网格的边长拉伸，判断撕裂到底是源模型本身如此、还是我们导出链的近似造成的。
//
// node tools/_glbskin.mjs "路径.glb" [clip] [frame]
import fs from 'node:fs';

const file = process.argv[2];
const wantClip = process.argv[3];
const wantFrame = +(process.argv[4] ?? 0);
if (!file) { console.error('用法: node tools/_glbskin.mjs x.glb [clip] [frame]'); process.exit(2); }

// ---------- GLB 容器 ----------
const buf = fs.readFileSync(file);
if (buf.readUInt32LE(0) !== 0x46546c67) throw new Error('不是 GLB');
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
  const a = json.accessors[i];
  const n = NC[a.type], C = CT[a.componentType];
  const bv = json.bufferViews[a.bufferView];
  const base = (bv.byteOffset || 0) + (a.byteOffset || 0);
  const stride = bv.byteStride || n * C.BYTES_PER_ELEMENT;
  const out = new Float64Array(a.count * n);
  const dv = new DataView(bin.buffer, bin.byteOffset);
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
      if (a.normalized) {
        const m = { 5121: 255, 5123: 65535, 5120: 127, 5122: 32767 }[a.componentType];
        if (m) v = Math.max(v / m, -1);
      }
      out[k * n + c] = v;
    }
  return out;
}

// ---------- 4x4 矩阵（列主序，和 glTF 一致） ----------
const M4 = () => new Float64Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]);
function mul(a, b) {
  const o = new Float64Array(16);
  for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) {
    let s = 0;
    for (let k = 0; k < 4; k++) s += a[k * 4 + r] * b[c * 4 + k];
    o[c * 4 + r] = s;
  }
  return o;
}
function inv(m) {
  const o = new Float64Array(16);
  const a00=m[0],a01=m[1],a02=m[2],a03=m[3], a10=m[4],a11=m[5],a12=m[6],a13=m[7];
  const a20=m[8],a21=m[9],a22=m[10],a23=m[11], a30=m[12],a31=m[13],a32=m[14],a33=m[15];
  const b00=a00*a11-a01*a10, b01=a00*a12-a02*a10, b02=a00*a13-a03*a10;
  const b03=a01*a12-a02*a11, b04=a01*a13-a03*a11, b05=a02*a13-a03*a12;
  const b06=a20*a31-a21*a30, b07=a20*a32-a22*a30, b08=a20*a33-a23*a30;
  const b09=a21*a32-a22*a31, b10=a21*a33-a23*a31, b11=a22*a33-a23*a32;
  let det = b00*b11-b01*b10+b02*b09+b03*b08-b04*b07+b05*b06;
  if (!det) return M4();
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
}
const xform = (m, x, y, z, o, oi) => {
  o[oi] = m[0]*x + m[4]*y + m[8]*z + m[12];
  o[oi+1] = m[1]*x + m[5]*y + m[9]*z + m[13];
  o[oi+2] = m[2]*x + m[6]*y + m[10]*z + m[14];
};
function trs(t, r, s) {
  const [x,y,z,w] = r;
  const x2=x+x, y2=y+y, z2=z+z;
  const xx=x*x2, xy=x*y2, xz=x*z2, yy=y*y2, yz=y*z2, zz=z*z2;
  const wx=w*x2, wy=w*y2, wz=w*z2;
  const [sx,sy,sz] = s;
  return new Float64Array([
    (1-(yy+zz))*sx, (xy+wz)*sx, (xz-wy)*sx, 0,
    (xy-wz)*sy, (1-(xx+zz))*sy, (yz+wx)*sy, 0,
    (xz+wy)*sz, (yz-wx)*sz, (1-(xx+yy))*sz, 0,
    t[0], t[1], t[2], 1,
  ]);
}

// ---------- 节点静置局部矩阵 ----------
const nodes = json.nodes;
const restLocal = nodes.map((n) =>
  n.matrix ? Float64Array.from(n.matrix) : trs(n.translation || [0,0,0], n.rotation || [0,0,0,1], n.scale || [1,1,1]),
);

// ---------- 找蒙皮 primitive ----------
// 一个模型可能有好几套 skin（雪松老师有两块 4 关节的），--node=N 指定看哪一块
const wantNode = +(process.argv.find((a) => a.startsWith('--node=')) || '').split('=')[1] || null;
let meshNode = -1, prim = null, skin = null;
for (let i = 0; i < nodes.length; i++) {
  const n = nodes[i];
  if (n.skin == null || n.mesh == null) continue;
  if (wantNode != null && i !== wantNode) continue;
  const p = json.meshes[n.mesh].primitives.find((q) => q.attributes.JOINTS_0 != null);
  if (p) { meshNode = i; prim = p; skin = json.skins[n.skin]; break; }
}
if (!prim) { console.error('没有蒙皮 primitive'); process.exit(1); }
console.log(`${file}\n  蒙皮 primitive: 节点 ${nodes[meshNode].name} mesh#${nodes[meshNode].mesh}  关节 ${skin.joints.length}`);

const POS = readAcc(prim.attributes.POSITION);
const JNT = readAcc(prim.attributes.JOINTS_0);
const WGT = readAcc(prim.attributes.WEIGHTS_0);
const IDX = prim.indices != null ? readAcc(prim.indices) : null;
const IBM = skin.inverseBindMatrices != null ? readAcc(skin.inverseBindMatrices) : null;
const nV = POS.length / 3;

// ---------- 动画：按名字找 clip ----------
const anims = (json.animations || []).map((a) => ({ name: a.name || '', a }));
console.log(`  动画: ${anims.map((x) => x.name).join(' / ')}`);
const pick = anims.find((x) => x.name === wantClip) || anims[0];
console.log(`  用 ${pick.name} frame ${wantFrame}`);
// 采样：把 clip 的每个 sampler 在时间 t 上取值，写到节点 TRS
const samp = (s, t) => {
  const inp = readAcc(s.input), outp = readAcc(s.output);
  const n = inp.length;
  const nc = outp.length / n;
  if (t <= inp[0]) return Array.from(outp.slice(0, nc));
  if (t >= inp[n - 1]) return Array.from(outp.slice((n - 1) * nc, n * nc));
  let i = 0;
  while (i < n - 2 && inp[i + 1] < t) i++;
  const u = (t - inp[i]) / (inp[i + 1] - inp[i] || 1);
  const A = Array.from(outp.slice(i * nc, i * nc + nc)), B = Array.from(outp.slice((i + 1) * nc, (i + 1) * nc + nc));
  if (s.interpolation === 'CUBICSPLINE') {
    const dt = inp[i + 1] - inp[i];
    return A.map((_, k) => {
      const p0 = A[nc / 3 + k], m0 = A[k], m1 = B[k], p1 = B[nc / 3 + k];
      const u2 = u * u, u3 = u2 * u;
      return (2*u3-3*u2+1)*p0 + (u3-2*u2+u)*dt*m0 + (-2*u3+3*u2)*p1 + (u3-u2)*dt*m1;
    });
  }
  if (nc === 4) {
    // 四元数最短弧插值
    let d = A.reduce((s2, v, k) => s2 + v * B[k], 0);
    if (d < 0) B.forEach((v, k) => (B[k] = -v));
    const r = A.map((v, k) => v + (B[k] - v) * u);
    const L = Math.hypot(...r) || 1;
    return r.map((v) => v / L);
  }
  return A.map((v, k) => v + (B[k] - v) * u);
};
const dur = Math.max(...pick.a.samplers.map((s) => readAcc(s.input).at(-1)));
const t = dur > 0 ? (wantFrame / 24) % dur : 0;
const local = restLocal.map((m) => m);
for (const ch of pick.a.channels) {
  const p = ch.target.path;
  if (p !== 'translation' && p !== 'rotation' && p !== 'scale') continue;
  const v = samp(pick.a.samplers[ch.sampler], t);
  const n = nodes[ch.target.node];
  const cur = {
    translation: n.translation ? [...n.translation] : [0,0,0],
    rotation: n.rotation ? [...n.rotation] : [0,0,0,1],
    scale: n.scale ? [...n.scale] : [1,1,1],
  };
  cur[p] = v;
  local[ch.target.node] = trs(cur.translation, cur.rotation, cur.scale);
}

// ---------- 世界矩阵 ----------
const world = new Array(nodes.length).fill(null);
const kids = nodes.map(() => []);
let rootNode = -1;
nodes.forEach((n, i) => { if (n.children) for (const c of n.children) kids[i].push(c); });
const roots = nodes.map((_, i) => i).filter((i) => !nodes.some((n) => (n.children || []).includes(i)));
rootNode = roots[0];
const walk = (i, parentM) => {
  const m = parentM ? mul(parentM, local[i]) : local[i];
  world[i] = m;
  for (const c of kids[i]) walk(c, m);
};
for (const r of roots) walk(r, null);

// 顶点在 mesh 节点空间 → 世界
const meshW = world[meshNode] || M4();
const meshWInv = inv(meshW);

// jointMat = inv(meshWorld) * jointWorld * IBM
const JM = skin.joints.map((jn, k) => {
  const ibm = IBM ? Float64Array.from(IBM.slice(k * 16, k * 16 + 16)) : M4();
  return mul(mul(meshWInv, world[jn] || M4()), ibm);
});

// ---------- 4 骨 LBS ----------
// --top2 会把权重压成最大的两根重新归一化，模拟引擎的双骨蒙皮，用来判断
// "撕裂是我们砍成两根骨造成的" 还是 "源模型本来就拉"。
const TOP2 = process.argv.includes('--top2');
const out = new Float64Array(nV * 3);
const tmpA = [0,0,0], tmpB = [0,0,0];
for (let v = 0; v < nV; v++) {
  const x = POS[v*3], y = POS[v*3+1], z = POS[v*3+2];
  let ax = 0, ay = 0, az = 0;
  if (TOP2) {
    let i0 = 0, i1 = 0, w0 = 0, w1 = 0;
    for (let k = 0; k < 4; k++) {
      const w = WGT[v*4+k];
      if (w <= w0) { if (w > w1) { w1 = w; i1 = k; } } else { w1 = w0; i1 = i0; w0 = w; i0 = k; }
    }
    const tot = w0 + w1 || 1;
    for (const [k, w] of [[i0, w0 / tot], [i1, w1 / tot]]) {
      if (w <= 0) continue;
      xform(JM[JNT[v*4+k]], x, y, z, tmpA, 0);
      ax += tmpA[0] * w; ay += tmpA[1] * w; az += tmpA[2] * w;
    }
  } else {
    for (let k = 0; k < 4; k++) {
      const w = WGT[v*4+k];
      if (w <= 0) continue;
      const m = JM[JNT[v*4+k]];
      xform(m, x, y, z, tmpA, 0);
      ax += tmpA[0] * w; ay += tmpA[1] * w; az += tmpA[2] * w;
    }
  }
  out[v*3] = ax; out[v*3+1] = ay; out[v*3+2] = az;
}

// ---------- 边长拉伸 ----------
const rows = [];
for (let i = 0; i < IDX.length; i += 3) {
  const tri = [IDX[i], IDX[i+1], IDX[i+2]];
  for (const [a, b] of [[tri[0],tri[1]],[tri[1],tri[2]],[tri[2],tri[0]]]) {
    if (a === b) continue;
    const l0 = Math.hypot(POS[a*3]-POS[b*3], POS[a*3+1]-POS[b*3+1], POS[a*3+2]-POS[b*3+2]);
    if (l0 < 1e-5) continue;
    const l = Math.hypot(out[a*3]-out[b*3], out[a*3+1]-out[b*3+1], out[a*3+2]-out[b*3+2]);
    rows.push({ a, b, l0, l, r: l / l0 });
  }
}
rows.sort((x, y) => y.r - x.r);
const nmm = (i) => nodes[skin.joints[i]]?.name ?? `j${i}`;
const wstr = (v) => {
  const t = [];
  for (let k = 0; k < 4; k++) if (WGT[v*4+k] > 1e-4) t.push(`${nmm(JNT[v*4+k])}:${WGT[v*4+k].toFixed(2)}`);
  return t.join(' ');
};
console.log(`  边 ${rows.length}  最大拉伸 ${rows[0].r.toFixed(2)}×  >2× ${rows.filter((q)=>q.r>2).length} 条`);
for (const q of rows.slice(0, 5))
  console.log(`    ${q.r.toFixed(1)}×  l0=${q.l0.toFixed(4)}→${q.l.toFixed(3)}  v${q.a}[${wstr(q.a)}] v${q.b}[${wstr(q.b)}]`);
const wsum = rows.reduce((s, q) => s + q.l0, 0);
console.log(`  按边长加权平均 ${(rows.reduce((s, q) => s + q.r * q.l0, 0) / wsum).toFixed(2)}×`);

// --bones=节点_173,节点_174 打印这些节点的世界矩阵（位置/缩放/旋转），和 .bin 那边对照
const wantBones = (process.argv.find((a) => a.startsWith('--bones=')) || '').split('=')[1];
if (wantBones)
  for (const nmx of wantBones.split(',')) {
    const i = nodes.findIndex((n) => n.name === nmx);
    if (i < 0) { console.log(`  ${nmx} 不存在`); continue; }
    const m = world[i];
    // 列主序：平移 m[12..14]；三轴长度 = 列长
    const sx = Math.hypot(m[0], m[1], m[2]), sy = Math.hypot(m[4], m[5], m[6]), sz = Math.hypot(m[8], m[9], m[10]);
    console.log(`  ${nmx} wp=(${m[12].toFixed(3)},${m[13].toFixed(3)},${m[14].toFixed(3)}) ws=(${sx.toFixed(3)},${sy.toFixed(3)},${sz.toFixed(3)})`);
  }

// --edge=a,b 只看这条边（和 .bin 的顶点编号对齐，用来确认同一个位置）
const we = (process.argv.find((a) => a.startsWith('--edge=')) || '').split('=')[1];
if (we) {
  const [a, b] = we.split(',').map(Number);
  const l0 = Math.hypot(POS[a*3]-POS[b*3], POS[a*3+1]-POS[b*3+1], POS[a*3+2]-POS[b*3+2]);
  const l = Math.hypot(out[a*3]-out[b*3], out[a*3+1]-out[b*3+1], out[a*3+2]-out[b*3+2]);
  const t = (v) => { const s=[]; for (let k=0;k<4;k++) if (WGT[v*4+k]>1e-4) s.push(`${nmm(JNT[v*4+k])}:${WGT[v*4+k].toFixed(2)}`); return s.join(' '); };
  console.log(`  边 ${a}-${b}  l0=${l0.toFixed(4)} → ${l.toFixed(4)}  拉伸 ${(l/l0).toFixed(2)}×`);
  console.log(`    v${a} ${t(a)}\n    v${b} ${t(b)}`);
  // 这条边在这个 primitive 里到底存不存在
  let found = false;
  for (let i = 0; i < IDX.length; i += 3) {
    const tri = [IDX[i], IDX[i+1], IDX[i+2]];
    if ((tri.includes(a) && tri.includes(b))) { found = true; break; }
  }
  console.log(`    在索引里相邻: ${found}`);
}
