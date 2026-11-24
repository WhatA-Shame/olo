// 程序化动作的离线核对工具：不开浏览器就把动作算出来，看斧尖/剑尖的世界轨迹。
// 摆动作时改一个角度就重跑一次（一秒出结果），比开无头浏览器截图快一个数量级。
// 用法:
//   node tools/_posetest.mjs chop  nw                     劈砍轨迹（nw=牛伟 / nm=牛魔）
//   node tools/_posetest.mjs chop  nm '{"yaw":-50}'       带参数
//   node tools/_posetest.mjs spin  nw                     旋身
//   node tools/_posetest.mjs chant nm                     咏唱
//   node tools/_posetest.mjs axes  nm                     单轴 +60° 时手和武器往哪动（摸骨架轴向用）
//   node tools/_posetest.mjs solve nm '{"tilt":12,"x":-0.2,"z":0.75}' rest
//   node tools/_posetest.mjs endsolve nm '{"x":-0.3,"z":1.15,"y":0.3}'
import { heroRig as nwRig } from '../src/45-niuwei-mesh.js';
import { heroRig as nmRig } from '../src/45-niumo-mesh.js';
import { chopPose, spinPose, chantPose } from '../src/26-pose.js';

const which = process.argv[2] || 'chop';
const rigName = process.argv[3] || 'nw';
const R = rigName === 'nm' ? nmRig() : nwRig();
const N = R.names.length;
const J = (k) => R.names.indexOf(k);

const qMul = (a, b) => {
  const [x1, y1, z1, w1] = a,
    [x2, y2, z2, w2] = b;
  return [
    w1 * x2 + x1 * w2 + y1 * z2 - z1 * y2,
    w1 * y2 - x1 * z2 + y1 * w2 + z1 * x2,
    w1 * z2 + x1 * y2 - y1 * x2 + z1 * w2,
    w1 * w2 - x1 * x2 - y1 * y2 - z1 * z2,
  ];
};
const qAxis = (ax, ay, az, deg) => {
  const h = (deg * Math.PI) / 360,
    s = Math.sin(h);
  return [ax * s, ay * s, az * s, Math.cos(h)];
};
// 与 three 的 Euler 'XYZ' 一致：R = Rx·Ry·Rz
const qEuler = (x, y, z) => qMul(qMul(qAxis(1, 0, 0, x), qAxis(0, 1, 0, y)), qAxis(0, 0, 1, z));
const qRot = (q, v) => {
  const [x, y, z, w] = q,
    tx = 2 * (y * v[2] - z * v[1]),
    ty = 2 * (z * v[0] - x * v[2]),
    tz = 2 * (x * v[1] - y * v[0]);
  return [
    v[0] + w * tx + (y * tz - z * ty),
    v[1] + w * ty + (z * tx - x * tz),
    v[2] + w * tz + (x * ty - y * tx),
  ];
};

// 和 sw 一样的接口，但初始值铺成绑定姿态
class Pose {
  constructor(n) {
    this.n = n;
    this.q = new Float32Array(n * 4);
    this.t = new Float32Array(n * 3);
    this.reset();
  }
  reset() {
    for (let i = 0; i < this.n; i++) {
      const o = i * 4;
      ((this.q[o] = R.bindQ[o]),
        (this.q[o + 1] = R.bindQ[o + 1]),
        (this.q[o + 2] = R.bindQ[o + 2]),
        (this.q[o + 3] = R.bindQ[o + 3]));
    }
    this.t.fill(0);
    return this;
  }
  add(j, x, y, z) {
    const o = j * 4,
      q = [this.q[o], this.q[o + 1], this.q[o + 2], this.q[o + 3]],
      r = qMul(q, qEuler(x, y, z));
    ((this.q[o] = r[0]), (this.q[o + 1] = r[1]), (this.q[o + 2] = r[2]), (this.q[o + 3] = r[3]));
    return this;
  }
  pre(j, x, y, z) {
    const o = j * 4,
      q = [this.q[o], this.q[o + 1], this.q[o + 2], this.q[o + 3]],
      r = qMul(qEuler(x, y, z), q);
    ((this.q[o] = r[0]), (this.q[o + 1] = r[1]), (this.q[o + 2] = r[2]), (this.q[o + 3] = r[3]));
    return this;
  }
  rot(j, x, y, z) {
    const o = j * 4,
      r = qEuler(x, y, z);
    ((this.q[o] = r[0]), (this.q[o + 1] = r[1]), (this.q[o + 2] = r[2]), (this.q[o + 3] = r[3]));
    return this;
  }
  move(j, x, y, z) {
    ((this.t[j * 3] += x), (this.t[j * 3 + 1] += y), (this.t[j * 3 + 2] += z));
    return this;
  }
}

const JN = {
  root: R.parent.indexOf(-1),
  chest: J('Spine02'),
  head: J('Head'),
  upperR: J('R_Upperarm'),
  foreR: J('R_Forearm'),
  handR: J('R_Hand'),
  upperL: J('L_Upperarm'),
  foreL: J('L_Forearm'),
  handL: J('L_Hand'),
};

const order = [];
(function walk(j) {
  order.push(j);
  for (let k = 0; k < N; k++) if (R.parent[k] === j) walk(k);
})(JN.root);

function fk(pose) {
  const wq = new Array(N),
    wp = new Array(N);
  for (const j of order) {
    const p = R.parent[j],
      o = j * 4,
      q = [pose.q[o], pose.q[o + 1], pose.q[o + 2], pose.q[o + 3]];
    const lx = R.localPos[j * 3] + pose.t[j * 3],
      ly = R.localPos[j * 3 + 1] + pose.t[j * 3 + 1],
      lz = R.localPos[j * 3 + 2] + pose.t[j * 3 + 2];
    if (p < 0) {
      wq[j] = q;
      wp[j] = [lx, ly, lz];
    } else {
      wq[j] = qMul(wq[p], q);
      const v = qRot(wq[p], [lx, ly, lz]);
      wp[j] = [wp[p][0] + v[0], wp[p][1] + v[1], wp[p][2] + v[2]];
    }
  }
  return { wq, wp };
}

function tipOf(pose) {
  const { wq, wp } = fk(pose);
  const h = wp[JN.handR];
  const shaft = qRot(wq[JN.handR], [0, 0, 1]);
  const gripY = qRot(wq[JN.handR], [0, 1, 0]);
  const tip = [0, 1, 2].map((k) => h[k] + gripY[k] * 0.16 + shaft[k] * 0.92);
  const tilt = (Math.acos(Math.max(-1, Math.min(1, shaft[1]))) * 180) / Math.PI;
  return { hand: h, tip, shaft, tilt };
}

// 待机底子：rest 已经在 Pose.reset() 里，这里补 armsDown（与两个 builder 里一致）
function base(pose, armDown, wrist) {
  pose.add(JN.upperR, 0, 0, armDown);
  pose.add(JN.upperL, 0, 0, -armDown);
  pose.add(JN.handR, 90, 0, -wrist);
  pose.add(JN.handL, 0, 0, wrist);
  return pose;
}

const armDown = rigName === 'nm' ? 74 : 26,
  wrist = rigName === 'nm' ? 55 : 12;

const show = (label, p) => {
  const t = tipOf(p);
  const f = (v) => v.toFixed(2).padStart(6);
  const bar = '#'.repeat(Math.max(0, Math.round(t.tip[1] * 8)));
  console.log(
    `${label.padEnd(8)} 手${f(t.hand[1])} 尖 y${f(t.tip[1])} z${f(t.tip[2])}  x${f(t.tip[0])} 柄倾${t.tilt
      .toFixed(0)
      .padStart(4)}° ${bar}`,
  );
};

if (which === 'chop') {
  const opts = JSON.parse(process.argv[4] || '{}');
  console.log(`== 劈砍 ${rigName} ==（尖 y 越高=举得越高，z 越大=越往前）`);
  for (let i = 0; i <= 20; i++) {
    const p = i / 20,
      pose = base(new Pose(N), armDown, wrist);
    chopPose(pose, JN, p, opts);
    show(`p=${p.toFixed(2)}`, pose);
  }
} else if (which === 'spin') {
  console.log(`== 旋身 ${rigName} ==`);
  for (const t of [0, 0.05, 0.1, 0.2, 0.35, 0.6]) {
    const pose = new Pose(N); // 旋身不铺 armsDown：手臂要甩开
    spinPose(pose, JN, t, { p: Math.min(1, t / 0.33) });
    const r = tipOf(pose);
    const rad = Math.hypot(r.tip[0], r.tip[2]);
    console.log(
      `t=${t.toFixed(2)}  斧尖 (${r.tip.map((v) => v.toFixed(2)).join(',')})  离身 ${rad.toFixed(
        2,
      )}m  高 ${r.tip[1].toFixed(2)}  柄倾 ${r.tilt.toFixed(0)}°`,
    );
  }
} else if (which === 'chant') {
  console.log(`== 咏唱 ${rigName} ==`);
  for (let i = 0; i <= 8; i++) {
    const p = i / 8,
      pose = base(new Pose(N), armDown, wrist);
    chantPose(pose, JN, i * 0.07, p);
    show(`p=${p.toFixed(2)}`, pose);
  }
}

if (which === 'axes') {
  console.log(`== 上臂/前臂/手 单轴 +60° 时手和斧尖怎么动（${rigName}）==`);
  const base0 = () => base(new Pose(N), armDown, wrist);
  const show2 = (label, p) => {
    const t = tipOf(p);
    const f = (v) => v.toFixed(2).padStart(6);
    console.log(`${label.padEnd(16)} 手(${f(t.hand[0])},${f(t.hand[1])},${f(t.hand[2])})  尖(${f(t.tip[0])},${f(t.tip[1])},${f(t.tip[2])}) 柄倾${t.tilt.toFixed(0).padStart(4)}°`);
  };
  show2('基准', base0());
  for (const [jname, j] of [['upperR', JN.upperR], ['foreR', JN.foreR], ['handR', JN.handR]])
    for (const [ax, i] of [['X', 0], ['Y', 1], ['Z', 2]]) {
      const p = base0();
      const v = [0, 0, 0];
      v[i] = 60;
      p.add(j, v[0], v[1], v[2]);
      show2(`${jname} +${ax}60`, p);
    }
}

if (which === 'solve') {
  // 数值求解：给"斧尖应该在哪儿 + 柄倾多少"，搜上臂 / 手腕的组合。
  // 手骨局部轴在手臂动起来之后会跟着转，手调角度纯靠试，直接搜更快。
  // argv[4] = 目标 JSON，argv[5] = 底子（rest | down）
  const want = JSON.parse(process.argv[4] || '{"tilt":15,"x":-0.15,"z":0.9}');
  const mode = process.argv[5] || 'rest';
  let best = null;
  for (let ax = 0; ax <= 130; ax += 5)
    for (let az = -90; az <= 90; az += 10)
      for (let hx = -140; hx <= 140; hx += 10)
        for (let hz = -140; hz <= 140; hz += 10) {
          const p = mode === 'down' ? base(new Pose(N), armDown, wrist) : new Pose(N);
          p.add(JN.upperR, ax, 0, az);
          p.add(JN.handR, hx, 0, hz);
          const t = tipOf(p);
          const cost =
            Math.abs(t.tilt - want.tilt) * 0.012 + Math.abs(t.tip[0] - want.x) + Math.abs(t.tip[2] - want.z);
          if (!best || cost < best.cost) best = { cost, ax, az, hx, hz, t };
        }
  const t = best.t;
  const f = (v) => v.toFixed(2);
  console.log(
    `最优(${mode}): 上臂X ${best.ax}° Z ${best.az}° 手腕X ${best.hx}° Z ${best.hz}°\n  斧尖 (${f(t.tip[0])},${f(
      t.tip[1],
    )},${f(t.tip[2])})  柄倾 ${t.tilt.toFixed(0)}°  代价 ${best.cost.toFixed(2)}`,
  );
}

if (which === 'endsolve') {
  // 给劈砍的"砍到底"姿势找补正角：让剑尖落在身前，而不是甩到身体侧面。
  // 搜三个量：上臂额外的 Z（把手臂收到身前）、手腕额外的 X / Y。
  const want = JSON.parse(process.argv[4] || '{"x":-0.3,"z":1.15,"y":0.3}');
  let best = null;
  for (let az = -60; az <= 60; az += 5)
    for (let hy = -90; hy <= 90; hy += 10)
      for (let hx = -60; hx <= 60; hx += 10) {
        const p = base(new Pose(N), armDown, wrist);
        chopPose(p, JN, 1, { lift: 146, tiltDown: 100, lean: 16, twist: 10 });
        p.add(JN.upperR, 0, 0, az);
        p.add(JN.handR, hx, hy, 0);
        const t = tipOf(p);
        const cost = Math.abs(t.tip[0] - want.x) + Math.abs(t.tip[2] - want.z) + Math.abs(t.tip[1] - want.y) * 0.5;
        if (!best || cost < best.cost) best = { cost, az, hy, hx, t };
      }
  const t = best.t;
  const f = (v) => v.toFixed(2);
  console.log(
    `最优: 上臂额外Z ${best.az}° 手腕Y ${best.hy}° X ${best.hx}°  斧尖 (${f(t.tip[0])},${f(t.tip[1])},${f(t.tip[2])}) 柄倾 ${t.tilt.toFixed(0)}° 代价 ${best.cost.toFixed(2)}`,
  );
}
