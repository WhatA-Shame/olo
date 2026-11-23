// 生成一个最小可用的蒙皮 GLB，用于冒烟验证 tools/glb2hero.mjs 的整条管线
// 用法: node tools/_toyglb.mjs /tmp/toy.glb
import fs from 'fs';

const out = process.argv[2] || '/tmp/toy.glb';

const pos = new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]);
const nrm = new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1]);
const uv = new Float32Array([0, 0, 1, 0, 0, 1]);
const jnt = new Uint16Array([0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0]); // 顶点2 双骨
const wgt = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 0.5, 0.5, 0, 0]);
const idx = new Uint16Array([0, 1, 2]);

const parts = [
  [pos, 5126, 'VEC3', 'POSITION'],
  [nrm, 5126, 'VEC3', 'NORMAL'],
  [uv, 5126, 'VEC2', 'TEXCOORD_0'],
  [jnt, 5123, 'VEC4', 'JOINTS_0'],
  [wgt, 5126, 'VEC4', 'WEIGHTS_0'],
  [idx, 5123, 'SCALAR', null],
];
const NCOMP = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 };
const CSIZE = { 5123: 2, 5126: 4 };

let off = 0;
const chunks = [];
const bufferViews = [];
const accessors = [];
const attr = {};
parts.forEach(([arr, ct, type, name], i) => {
  const bytes = Buffer.from(arr.buffer, arr.byteOffset, arr.byteLength);
  const pad = (4 - (off % 4)) % 4;
  if (pad) {
    chunks.push(Buffer.alloc(pad));
    off += pad;
  }
  bufferViews.push({ buffer: 0, byteOffset: off, byteLength: bytes.length });
  const count = arr.length / NCOMP[type];
  const a = { bufferView: i, componentType: ct, count, type };
  if (name === 'POSITION') {
    a.min = [Math.min(...pos.filter((_, k) => k % 3 === 0)), Math.min(...pos.filter((_, k) => k % 3 === 1)), Math.min(...pos.filter((_, k) => k % 3 === 2))];
    a.max = [Math.max(...pos.filter((_, k) => k % 3 === 0)), Math.max(...pos.filter((_, k) => k % 3 === 1)), Math.max(...pos.filter((_, k) => k % 3 === 2))];
  }
  accessors.push(a);
  if (name) attr[name] = i;
  chunks.push(bytes);
  off += bytes.length;
  if (CSIZE[ct] === 2 && count % 2 === 1) {
    // 保持 4 字节对齐由上面的 pad 处理
  }
});
const bin = Buffer.concat(chunks);

const json = {
  asset: { version: '2.0' },
  scene: 0,
  scenes: [{ nodes: [0] }],
  nodes: [
    { name: 'Root', translation: [0, 0, 0], children: [1, 2] },
    { name: 'Head', translation: [0, 1, 0] },
    { name: 'Body', mesh: 0, skin: 0 },
  ],
  meshes: [{ primitives: [{ attributes: attr, indices: 5, material: 0 }] }],
  materials: [{ pbrMetallicRoughness: { baseColorFactor: [1, 1, 1, 1] } }],
  skins: [{ joints: [0, 1], skeleton: 0 }],
  accessors,
  bufferViews,
  buffers: [{ byteLength: bin.length }],
};

const jsonBuf = Buffer.from(JSON.stringify(json), 'utf8');
const jsonPad = Buffer.alloc((4 - (jsonBuf.length % 4)) % 4, 0x20);
const binPad = Buffer.alloc((4 - (bin.length % 4)) % 4, 0);
const jb = Buffer.concat([jsonBuf, jsonPad]);
const bb = Buffer.concat([bin, binPad]);

const header = Buffer.alloc(12);
header.write('glTF', 0, 'ascii');
header.writeUInt32LE(2, 4);
header.writeUInt32LE(12 + 8 + jb.length + 8 + bb.length, 8);

const c1 = Buffer.alloc(8);
c1.writeUInt32LE(jb.length, 0);
c1.write('JSON', 4, 'ascii');
const c2 = Buffer.alloc(8);
c2.writeUInt32LE(bb.length, 0);
c2.write('BIN\0', 4, 'ascii');

fs.writeFileSync(out, Buffer.concat([header, c1, jb, c2, bb]));
console.log(`写出 ${out} (${(12 + 8 + jb.length + 8 + bb.length)} bytes)`);
