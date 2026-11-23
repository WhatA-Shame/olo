// probe.mjs — 按 UV 定位贴图上的特征，反查它在三维空间的位置（用来确定模型朝向）
import fs from 'node:fs';
const [, , file, ...boxes] = process.argv;
const buf = fs.readFileSync(file);
let off = 12, json = null, bin = null;
while (off < buf.length) {
  const len = buf.readUInt32LE(off), type = buf.toString('ascii', off + 4, off + 8);
  if (type === 'JSON') json = JSON.parse(buf.toString('utf8', off + 8, off + 8 + len));
  else if (type.startsWith('BIN')) bin = buf.subarray(off + 8, off + 8 + len);
  off += 8 + len;
}
const COMP = { 5126: Float32Array, 5123: Uint16Array, 5125: Uint32Array };
const NUM = { SCALAR: 1, VEC2: 2, VEC3: 3 };
function acc(i) {
  const a = json.accessors[i], bv = json.bufferViews[a.bufferView];
  const TA = COMP[a.componentType], n = NUM[a.type];
  return new TA(bin.buffer, bin.byteOffset + (bv.byteOffset || 0) + (a.byteOffset || 0), a.count * n);
}
const prim = json.meshes[0].primitives[0];
const pos = acc(prim.attributes.POSITION);
const uv = acc(prim.attributes.TEXCOORD_0);
const n = pos.length / 3;
// 收集 UV 落在指定矩形里的顶点
const ranges = boxes.length
  ? boxes.map((s) => s.split(',').map(Number))
  : [[0.48, 0.58, 0.30, 0.40], [0.82, 0.90, 0.62, 0.72]];
for (const [u0, u1, v0, v1] of ranges) {
  let sx = 0, sy = 0, sz = 0, c = 0, minY = 9, maxY = -9;
  for (let i = 0; i < n; i++) {
    const u = uv[i * 2], v = uv[i * 2 + 1];
    if (u >= u0 && u <= u1 && v >= v0 && v <= v1) {
      sx += pos[i * 3]; sy += pos[i * 3 + 1]; sz += pos[i * 3 + 2]; c++;
      minY = Math.min(minY, pos[i * 3 + 1]); maxY = Math.max(maxY, pos[i * 3 + 1]);
    }
  }
  if (!c) { console.log(`UV[${u0}-${u1},${v0}-${v1}] 无顶点`); continue; }
  const x = sx / c, y = sy / c, z = sz / c;
  console.log(
    `UV[${u0}-${u1},${v0}-${v1}] n=${c} 中心(${x.toFixed(3)}, ${y.toFixed(3)}, ${z.toFixed(3)})  y范围 ${minY.toFixed(2)}~${maxY.toFixed(2)}  朝向=${Math.abs(x) > Math.abs(z) ? (x > 0 ? '+X' : '-X') : z > 0 ? '+Z' : '-Z'}`,
  );
}
