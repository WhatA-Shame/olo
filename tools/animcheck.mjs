// 离线校验生成的骨骼动画数据：解出 HERO_RIG / HERO_ANIM，按引擎同一套层级解算算骨骼世界坐标，
// 比较不同帧之间的位移。不依赖浏览器，纯数据检查。
// 用法: node tools/animcheck.mjs [mushroom]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const toF32 = (b64) => {
  const b = Buffer.from(b64, 'base64');
  const ab = b.buffer.slice(b.byteOffset, b.byteOffset + b.length);
  return new Float32Array(ab);
};
const qmul = (a, b) => [
  a[3] * b[0] + a[0] * b[3] + a[1] * b[2] - a[2] * b[1],
  a[3] * b[1] - a[0] * b[2] + a[1] * b[3] + a[2] * b[0],
  a[3] * b[2] + a[0] * b[1] - a[1] * b[0] + a[2] * b[3],
  a[3] * b[3] - a[0] * b[0] - a[1] * b[1] - a[2] * b[2],
];
// v 绕单位四元数 q 旋转
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

// heroId → 网格模块名。多数英雄同名前缀，但牛伟（chijin）换皮后文件叫 niuwei，
// 牛魔开大形态和本体共用 niumo 的骨架，这里都按「骨架所在文件」映射。
const MESH_FILE = { chijin: 'niuwei' };

export function loadModel(heroId = 'mushroom') {
  const file = path.join(root, 'src', `45-${MESH_FILE[heroId] || heroId}-mesh.js`);
  if (!fs.existsSync(file)) return null;
  const src = fs.readFileSync(file, 'utf8');
  const arr = (key) => {
    const m = new RegExp(`${key}:\\s*\\[([^\\]]*)\\]`).exec(src);
    return m ? m[1].split(',').map((s) => s.trim().replace(/^"|"$/g, '')) : null;
  };
  const names = arr('names');
  const parent = (arr('parent') || []).map(Number);
  const localM = /localPos:\s*"([^"]+)"/.exec(src);
  if (!names || !parent.length || !localM) return null;
  const localPos = toF32(localM[1]);

  const anims = {};
  const re = /"?(\w+)"?:\s*\{\s*frames:\s*(\d+),\s*dur:\s*([\d.]+),\s*fps:\s*(\d+),\s*data:\s*"([^"]+)"/g;
  for (let m; (m = re.exec(src)); ) {
    anims[m[1]] = { frames: +m[2], dur: +m[3], fps: +m[4], data: toF32(m[5]) };
  }
  return { names, parent, localPos, anims, joints: names.length };
}

// 与引擎一致：worldPos = parentWorldPos + rot(parentWorldQ, localPos*scale)；worldQ = parentWorldQ * q
export function solveAt(model, anim, frame) {
  const N = model.joints;
  const a = model.anims[anim];
  const stride = N * 7;
  const o = frame * stride;
  const wp = new Float32Array(N * 3);
  const wq = new Float32Array(N * 4);
  for (let j = 0; j < N; j++) {
    const b = o + j * 7;
    // 布局：pos(3) + quat(4)，共 7 个浮点数一个骨（与引擎 play() 一致）；
    // 引擎里 pose.t 是叠加在绑定局部位移上的增量（solve: local + t）
    const q = [a.data[b + 3], a.data[b + 4], a.data[b + 5], a.data[b + 6]];
    const lp = [
      model.localPos[j * 3] + a.data[b],
      model.localPos[j * 3 + 1] + a.data[b + 1],
      model.localPos[j * 3 + 2] + a.data[b + 2],
    ];
    const p = model.parent[j];
    if (p < 0) {
      wp[j * 3] = lp[0];
      wp[j * 3 + 1] = lp[1];
      wp[j * 3 + 2] = lp[2];
      wq[j * 4] = q[0];
      wq[j * 4 + 1] = q[1];
      wq[j * 4 + 2] = q[2];
      wq[j * 4 + 3] = q[3];
    } else {
      const pq = [wq[p * 4], wq[p * 4 + 1], wq[p * 4 + 2], wq[p * 4 + 3]];
      const r = qrot(pq, lp);
      wp[j * 3] = wp[p * 3] + r[0];
      wp[j * 3 + 1] = wp[p * 3 + 1] + r[1];
      wp[j * 3 + 2] = wp[p * 3 + 2] + r[2];
      const mq = qmul(pq, q);
      wq[j * 4] = mq[0];
      wq[j * 4 + 1] = mq[1];
      wq[j * 4 + 2] = mq[2];
      wq[j * 4 + 3] = mq[3];
    }
  }
  return wp;
}

// 引擎状态用到的片段，必须真的能动（fire 例外：原片段几乎是静止持势，引擎里另叠了抖动）
// 每个英雄的片段名不一样（牛魔只有 walk/defeat_03，没有 run），所以按英雄列。
const REQUIRED_BY_HERO = {
  mushroom: ['run', 'box_01', 'fall', 'front_kick_02', 'hit_to_head'],
  niumo: ['walk', 'defeat_03'],
  chijin: ['run', 'box_03', 'chop', 'dance_05', 'defeat_03'],
};
const REQUIRED = [];
const MIN_MOVE = 0.3;

// 返回 { ok, detail }，供 herocheck 汇总
export function animReport(heroId = 'mushroom') {
  const model = loadModel(heroId);
  if (!model) return { ok: false, detail: `找不到 src/45-${MESH_FILE[heroId] || heroId}-mesh.js` };
  const names = Object.keys(model.anims);
  if (!names.length) return { ok: false, detail: '模型里没有动画数据' };

  const lines = [];
  const dead = [];
  const REQUIRED = REQUIRED_BY_HERO[heroId] || [];
  for (const n of names) {
    const a = model.anims[n];
    if (a.frames < 2) return { ok: false, detail: `${n} 只有 ${a.frames} 帧` };
    const f0 = solveAt(model, n, 0);
    let mx = 0;
    const step = Math.max(1, (a.frames / 12) | 0);
    for (let f = 1; f < a.frames; f += step) {
      const ff = solveAt(model, n, f);
      for (let i = 0; i < f0.length; i += 3) {
        const d = Math.hypot(ff[i] - f0[i], ff[i + 1] - f0[i + 1], ff[i + 2] - f0[i + 2]);
        if (d > mx) mx = d;
      }
    }
    lines.push(`${n} ${a.frames}帧/${a.dur.toFixed(2)}s→${mx.toFixed(2)}`);
    if (REQUIRED.includes(n) && mx < MIN_MOVE) dead.push(`${n}(${mx.toFixed(2)})`);
  }
  const missing = REQUIRED.filter((n) => !model.anims[n]);
  if (missing.length) dead.push(`缺少片段 ${missing.join('/')}`);
  return {
    ok: dead.length === 0,
    detail: dead.length ? `不动: ${dead.join(',')}｜${lines.join('，')}` : `${model.joints} 骨 / ${names.length} 段｜${lines.join('，')}`,
    model,
  };
}

if (process.argv[1] && process.argv[1].endsWith('animcheck.mjs')) {
  const r = animReport(process.argv[2] || 'mushroom');
  console.log(`${r.ok ? '✓' : '✗'} ${r.detail}`);
  process.exit(r.ok ? 0 : 1);
}
