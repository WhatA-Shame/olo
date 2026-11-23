// glb2hero.mjs — 把 glTF/GLB 的静态网格 + basecolor 贴图转成可内联的数据模块
//
// 用法: node tools/glb2hero.mjs "<模型.glb>" src/45-<name>-mesh.js [--scale 2.0] [--flip]
//
// 引擎的几何构建器(Ls)只产出 position/normal/color，没有 UV；这个脚本把
// POSITION/NORMAL/TEXCOORD_0/索引 + JPEG 贴图打包成 base64，运行时解码后
// 直接灌进 Ls，配合 shader 里新加的 uMap 采样。
import fs from 'node:fs';
import path from 'node:path';

const [, , src, out, ...rest] = process.argv;
if (!src || !out) {
  console.error('用法: node tools/glb2hero.mjs <in.glb> <out.js> [--scale 2] [--flip] [--rotY deg]');
  process.exit(1);
}
const argOf = (k, d) => {
  const i = rest.indexOf(k);
  return i >= 0 ? Number(rest[i + 1]) : d;
};
const SCALE = argOf('--scale', 2);
const ROTY = (argOf('--rotY', 0) * Math.PI) / 180;
const FLIP = rest.includes('--flip');

const buf = fs.readFileSync(src);
if (buf.toString('ascii', 0, 4) !== 'glTF') throw new Error('不是 GLB');

let off = 12;
let json = null;
let bin = null;
while (off < buf.length) {
  const len = buf.readUInt32LE(off);
  const type = buf.toString('ascii', off + 4, off + 8);
  if (type === 'JSON') json = JSON.parse(buf.toString('utf8', off + 8, off + 8 + len));
  else if (type.startsWith('BIN')) bin = buf.subarray(off + 8, off + 8 + len);
  off += 8 + len;
}

const COMP = { 5120: Int8Array, 5121: Uint8Array, 5122: Int16Array, 5123: Uint16Array, 5125: Uint32Array, 5126: Float32Array };
const NUM = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT4: 16 };

function readAccessor(idx) {
  const a = json.accessors[idx];
  const bv = json.bufferViews[a.bufferView];
  const TA = COMP[a.componentType];
  const n = NUM[a.type];
  const base = (bv.byteOffset || 0) + (a.byteOffset || 0);
  const stride = bv.byteStride || 0;
  if (!stride || stride === n * TA.BYTES_PER_ELEMENT) {
    return new TA(bin.buffer, bin.byteOffset + base, a.count * n);
  }
  // 交错存储：逐元素拷出来
  const out = new TA(a.count * n);
  const el = TA.BYTES_PER_ELEMENT;
  for (let i = 0; i < a.count; i++) {
    const dv = new DataView(bin.buffer, bin.byteOffset + base + i * stride, n * el);
    for (let c = 0; c < n; c++) {
      out[i * n + c] =
        TA === Float32Array ? dv.getFloat32(c * el, true)
        : TA === Uint16Array ? dv.getUint16(c * el, true)
        : TA === Uint32Array ? dv.getUint32(c * el, true)
        : TA === Int16Array ? dv.getInt16(c * el, true)
        : TA === Uint8Array ? dv.getUint8(c * el)
        : dv.getInt8(c * el);
    }
  }
  return out;
}

// 合并所有带 POSITION 的 primitive（本引擎按单一网格渲染，多材质也先并进来）
const P = [], N = [], U = [], I = [];
let vBase = 0;
for (const mesh of json.meshes) {
  for (const prim of mesh.primitives) {
    const at = prim.attributes;
    if (at.POSITION == null) continue;
    const pos = readAccessor(at.POSITION);
    const nor = at.NORMAL != null ? readAccessor(at.NORMAL) : null;
    const uv = at.TEXCOORD_0 != null ? readAccessor(at.TEXCOORD_0) : null;
    const cnt = pos.length / 3;
    const ca = Math.cos(ROTY), sa = Math.sin(ROTY);
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
    }
    const idx = prim.indices != null ? readAccessor(prim.indices) : null;
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

// 贴图：取第一张 baseColorTexture
let texData = '';
const mat0 = (json.materials || []).find((m) => m.pbrMetallicRoughness && m.pbrMetallicRoughness.baseColorTexture);
if (mat0) {
  const tex = json.textures[mat0.pbrMetallicRoughness.baseColorTexture.index];
  const img = json.images[tex.source];
  const bv = json.bufferViews[img.bufferView];
  const bytes = bin.subarray(bv.byteOffset || 0, (bv.byteOffset || 0) + bv.byteLength);
  const mime = img.mimeType || 'image/jpeg';
  texData = `data:${mime};base64,${Buffer.from(bytes).toString('base64')}`;
}

const b64 = (arr) => Buffer.from(arr.buffer, arr.byteOffset, arr.byteLength).toString('base64');
const body = `// ${path.basename(src)} → 内联网格数据（由 tools/glb2hero.mjs 生成，勿手改）
// 顶点 ${P.length / 3}，三角 ${I.length / 3}，贴图 ${texData ? Math.round(texData.length / 1024) + 'KB base64' : '无'}
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
  });
}

let _map = null;
export function heroMap() {
  if (_map) return _map;
  const tex = new Vs();
  // glTF 的 UV 原点在左上，three 默认 flipY=true 会把它上下翻过来
  tex.flipY = false;
  // 先放 1x1 白，贴图解码完再替换，避免首帧采样空纹理
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
  tex: "${texData}",
};
`;
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, body);
console.log(`写出 ${out}  顶点 ${P.length / 3}  三角 ${I.length / 3}  文件 ${Math.round(body.length / 1024)}KB`);
