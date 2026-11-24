// 离线软渲染：把牛头人右手单独画出来，看「虎口」朝哪、柄怎么穿才像握住。
// 纯 Node 光栅化 + 手写 PNG，不依赖 three.js / 浏览器。
//
// 用法: node tools/_handview.mjs [视野半径] [中心x,y,z] [--rot=dx,dy,dz] [--out=名字]
//   --rot  绕手骨局部轴旋转手部顶点（度），模拟转手腕；只转「主导骨骼是 R_Hand」的顶点
// 输出: .herocheck/<out>.png —— 3×2 的六视角拼图（正/背/左/右/上/下）
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(root, '.herocheck');
const argv = process.argv.slice(2);
const arg = (k, d) => {
  const a = argv.find((x) => x.startsWith(k + '='));
  return a ? a.slice(k.length + 1) : d;
};
const MESH_MOD = arg('--mesh', '45-niuwei-mesh.js');
const { heroRig, heroMesh } = await import(`../src/${MESH_MOD}`);
const ROT = arg('--rot', '0,0,0').split(',').map(Number);
const NAME = arg('--out', 'hand');

const R = heroRig();
const M = heroMesh();
const J = (k) => R.names.indexOf(k);
const handJ = J('R_Hand');
const HP = [R.bindWorld[handJ * 3], R.bindWorld[handJ * 3 + 1], R.bindWorld[handJ * 3 + 2]];

// ---------- PNG ----------
const crcT = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();
const crc = (b) => {
  let c = -1;
  for (let i = 0; i < b.length; i++) c = crcT[(c ^ b[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
};
function png(w, h, rgb) {
  const raw = Buffer.alloc((w * 3 + 1) * h);
  for (let y = 0; y < h; y++) {
    raw[y * (w * 3 + 1)] = 0;
    rgb.copy(raw, y * (w * 3 + 1) + 1, y * w * 3, (y + 1) * w * 3);
  }
  const chunk = (type, data) => {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length);
    const td = Buffer.concat([Buffer.from(type, 'ascii'), data]);
    const c = Buffer.alloc(4);
    c.writeUInt32BE(crc(td));
    return Buffer.concat([len, td, c]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

// ---------- 几何 ----------
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a) => {
  const l = Math.hypot(...a) || 1;
  return [a[0] / l, a[1] / l, a[2] / l];
};

const NV = M.pos.length / 3;
// 权重方向：着色器 mix(boneB, boneA, aSkin.z) → aSkin.z 是第一根骨骼的权重
const domBone = (i) => (M.skin[i * 3 + 2] > 0.5 ? M.skin[i * 3] : M.skin[i * 3 + 1]);

// 手骨局部轴（世界方向）
const BWQ = [R.bindWQ[handJ * 4], R.bindWQ[handJ * 4 + 1], R.bindWQ[handJ * 4 + 2], R.bindWQ[handJ * 4 + 3]];
const qRot = (q, v) => {
  const [x, y, z, w] = q;
  const t = [2 * (y * v[2] - z * v[1]), 2 * (z * v[0] - x * v[2]), 2 * (x * v[1] - y * v[0])];
  return [
    v[0] + w * t[0] + (y * t[2] - z * t[1]),
    v[1] + w * t[1] + (z * t[0] - x * t[2]),
    v[2] + w * t[2] + (x * t[1] - y * t[0]),
  ];
};
const AX = qRot(BWQ, [1, 0, 0]), AY = qRot(BWQ, [0, 1, 0]), AZ = qRot(BWQ, [0, 0, 1]);

// 手部顶点绕腕关节、按手骨局部轴旋转 ROT 度
const CH = Math.PI / 180;
function rotHand(p) {
  if (!ROT[0] && !ROT[1] && !ROT[2]) return p;
  let v = sub(p, HP);
  const l = [dot(v, AX), dot(v, AY), dot(v, AZ)];
  const [rx, ry, rz] = ROT.map((d) => d * CH);
  // Z → Y → X 顺序
  let [x, y, z] = l;
  let x1 = x * Math.cos(rz) - y * Math.sin(rz), y1 = x * Math.sin(rz) + y * Math.cos(rz);
  let x2 = x1 * Math.cos(ry) + z * Math.sin(ry), z2 = -x1 * Math.sin(ry) + z * Math.cos(ry);
  let y3 = y1 * Math.cos(rx) - z2 * Math.sin(rx), z3 = y1 * Math.sin(rx) + z2 * Math.cos(rx);
  const w = [x2, y3, z3];
  return [0, 1, 2].map((k) => HP[k] + w[0] * AX[k] + w[1] * AY[k] + w[2] * AZ[k]);
}
const POS = new Float32Array(M.pos.length);
for (let i = 0; i < NV; i++) {
  const p = [M.pos[i * 3], M.pos[i * 3 + 1], M.pos[i * 3 + 2]];
  const q = domBone(i) === handJ ? rotHand(p) : p;
  POS[i * 3] = q[0];
  POS[i * 3 + 1] = q[1];
  POS[i * 3 + 2] = q[2];
}

const col = new Uint8Array(NV * 3);
const foreSet = new Set(['R_Forearm', 'R_ForearmTwist01', 'R_ForearmTwist02'].map(J));
for (let i = 0; i < NV; i++) {
  const b = domBone(i);
  let c = [148, 148, 154];
  if (b === handJ) c = [232, 62, 52];
  else if (foreSet.has(b)) c = [58, 128, 232];
  col[i * 3] = c[0];
  col[i * 3 + 1] = c[1];
  col[i * 3 + 2] = c[2];
}

// ---------- 渲染 ----------
const TILE = 300;
const HALF = Number(argv[0] && !argv[0].startsWith('--') ? argv[0] : 0.42);
const cArg = argv[1] && !argv[1].startsWith('--') ? argv[1].split(',').map(Number) : null;
const autoC = [0, 1, 2].map((k) => {
  let lo = Infinity, hi = -Infinity;
  for (let i = 0; i < NV; i++) { const v = M.pos[i * 3 + k]; if (v < lo) lo = v; if (v > hi) hi = v; }
  return (lo + hi) / 2;
});
const C = cArg && cArg.length === 3 && cArg.every((v) => !isNaN(v)) ? cArg : MESH_MOD === '45-niuwei-mesh.js' ? HP : autoC;

const views = [
  ['front', [0, 0, -1], [0, 1, 0]],
  ['back', [0, 0, 1], [0, 1, 0]],
  ['left', [1, 0, 0], [0, 1, 0]],
  ['right', [-1, 0, 0], [0, 1, 0]],
  ['top', [0, -1, 0], [0, 0, -1]],
  ['bottom', [0, 1, 0], [0, 0, 1]],
];
const scale = (TILE / 2) / HALF;

function render(f, up) {
  const r = norm(cross(f, up));
  const u = norm(cross(r, f));
  const buf = Buffer.alloc(TILE * TILE * 3, 0);
  for (let i = 0; i < buf.length; i += 3) {
    buf[i] = 20;
    buf[i + 1] = 26;
    buf[i + 2] = 38;
  }
  const zb = new Float32Array(TILE * TILE).fill(Infinity);
  const light = norm([f[0] - 0.6 * u[0] - 0.55 * r[0], f[1] - 0.6 * u[1] - 0.55 * r[1], f[2] - 0.6 * u[2] - 0.55 * r[2]]);
  const P = (i) => [POS[i * 3], POS[i * 3 + 1], POS[i * 3 + 2]];
  const proj = (p) => {
    const d = sub(p, C);
    return [TILE / 2 + dot(d, r) * scale, TILE / 2 - dot(d, u) * scale, dot(d, f)];
  };
  for (let t = 0; t < M.idx.length; t += 3) {
    const ia = M.idx[t], ib = M.idx[t + 1], ic = M.idx[t + 2];
    const pa = P(ia), pb = P(ib), pc = P(ic);
    const cm = [(pa[0] + pb[0] + pc[0]) / 3, (pa[1] + pb[1] + pc[1]) / 3, (pa[2] + pb[2] + pc[2]) / 3];
    if (Math.hypot(...sub(cm, C)) > HALF * 2.8) continue;
    const A = proj(pa), B = proj(pb), Cc = proj(pc);
    const area = (B[0] - A[0]) * (Cc[1] - A[1]) - (Cc[0] - A[0]) * (B[1] - A[1]);
    if (Math.abs(area) < 1e-9) continue;
    let n = norm(cross(sub(pb, pa), sub(pc, pa)));
    if (dot(n, f) > 0) n = [-n[0], -n[1], -n[2]];
    const lam = Math.max(0, dot(n, light)) * 0.85 + 0.32;
    const cc = [
      Math.min(255, ((col[ia * 3] + col[ib * 3] + col[ic * 3]) / 3) * lam) | 0,
      Math.min(255, ((col[ia * 3 + 1] + col[ib * 3 + 1] + col[ic * 3 + 1]) / 3) * lam) | 0,
      Math.min(255, ((col[ia * 3 + 2] + col[ib * 3 + 2] + col[ic * 3 + 2]) / 3) * lam) | 0,
    ];
    const minx = Math.max(0, Math.floor(Math.min(A[0], B[0], Cc[0])));
    const maxx = Math.min(TILE - 1, Math.ceil(Math.max(A[0], B[0], Cc[0])));
    const miny = Math.max(0, Math.floor(Math.min(A[1], B[1], Cc[1])));
    const maxy = Math.min(TILE - 1, Math.ceil(Math.max(A[1], B[1], Cc[1])));
    for (let y = miny; y <= maxy; y++) {
      for (let x = minx; x <= maxx; x++) {
        const px = x + 0.5, py = y + 0.5;
        const w0 = ((B[0] - A[0]) * (py - A[1]) - (px - A[0]) * (B[1] - A[1])) / area;
        const w1 = ((px - A[0]) * (Cc[1] - A[1]) - (Cc[0] - A[0]) * (py - A[1])) / area;
        const w2 = 1 - w0 - w1;
        if (w0 < 0 || w1 < 0 || w2 < 0) continue;
        const z = A[2] * w2 + B[2] * w1 + Cc[2] * w0;
        const o = y * TILE + x;
        if (z >= zb[o]) continue;
        zb[o] = z;
        buf[o * 3] = cc[0];
        buf[o * 3 + 1] = cc[1];
        buf[o * 3 + 2] = cc[2];
      }
    }
  }
  return { buf, proj, zb };
}

function line(buf, proj, a, b, rgb, thick = 0) {
  // 逐像素插值出 3D 位置再投影，这样能跟 z-buffer 比深度 —— 被手/护腕挡住的部分就不画
  const N = Math.max(2, Math.ceil(Math.hypot(...sub(a, b)) * scale * 2));
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const p = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
    const q = proj(p);
    for (let dy = -thick; dy <= thick; dy++)
      for (let dx = -thick; dx <= thick; dx++) {
        const px = Math.round(q[0]) + dx, py = Math.round(q[1]) + dy;
        if (px < 0 || py < 0 || px >= TILE || py >= TILE) continue;
        if (q[2] > zbuf[py * TILE + px] + 0.002) continue;
        const o = (py * TILE + px) * 3;
        buf[o] = rgb[0];
        buf[o + 1] = rgb[1];
        buf[o + 2] = rgb[2];
      }
  }
}
let zbuf = null;

// 柄轴：默认用代码里的值，可以用 --pole=x,z 覆盖来试位置
const POLE = arg('--pole', '').split(',').map(Number);
const HX = POLE.length === 2 && POLE.every((v) => !isNaN(v)) ? POLE[0] : R.bindWorld[handJ * 3] - 0.07,
  HY = R.bindWorld[handJ * 3 + 1],
  HZ = POLE.length === 2 && POLE.every((v) => !isNaN(v)) ? POLE[1] : R.bindWorld[handJ * 3 + 2] + 0.05;

const COLS = 3, ROWS = 2, PAD = 4;
const SW = COLS * TILE + (COLS + 1) * PAD, SH = ROWS * TILE + (ROWS + 1) * PAD;
const sheet = Buffer.alloc(SW * SH * 3, 0);
for (let i = 0; i < sheet.length; i += 3) {
  sheet[i] = 8;
  sheet[i + 1] = 10;
  sheet[i + 2] = 14;
}
views.forEach(([nm, f, up], k) => {
  const { buf, proj, zb } = render(f, up);
  zbuf = zb;
  line(buf, proj, [HX, HY - 0.32, HZ], [HX, HY + 0.32, HZ], [255, 205, 30], 1);
  // 手骨局部三轴：X 红（掌心法向）、Y 绿（腕→指）、Z 蓝（拇指→小指）
  line(buf, proj, HP, [0, 1, 2].map((k) => HP[k] + AX[k] * 0.22), [255, 70, 70], 1);
  line(buf, proj, HP, [0, 1, 2].map((k) => HP[k] + AY[k] * 0.22), [80, 255, 120], 1);
  line(buf, proj, HP, [0, 1, 2].map((k) => HP[k] + AZ[k] * 0.22), [90, 150, 255], 1);
  const ox = PAD + (k % COLS) * (TILE + PAD), oy = PAD + Math.floor(k / COLS) * (TILE + PAD);
  for (let y = 0; y < TILE; y++)
    buf.copy(sheet, ((oy + y) * SW + ox) * 3, y * TILE * 3, (y + 1) * TILE * 3);
  void nm;
});
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, `${NAME}.png`), png(SW, SH, sheet));
console.log(`已输出 .herocheck/${NAME}.png（正/背/左/右/上/下）  中心 ${C.map((v) => v.toFixed(3)).join(',')}  半径 ${HALF}  手腕旋转 ${ROT.join(',')}°`);
