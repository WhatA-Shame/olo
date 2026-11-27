// 47-kart-poses.js —— 角色专属特殊动作系统（基于原版骨架的实时姿态与逆向动力学覆盖）
//
// 不改模型、不新建网格，直接在原版 .bin 骨架的每帧局部变换 (R.t / R.q / R.s) 上叠加：
//   1. 全身特殊动作 (override)：如小肥石「练功」时的实打实俯卧撑（双手 IK 死锁地面、脚尖支地、穿插普攻时单手撑地出拳）
//   2. 局部/单肢体实时覆盖 (post)：如小肥石「抓起来锤」期间左手一直伸向敌人胸口并死扣五指抓牢，右手自由挥锤；击杀后双手高举准备扔

const _qA = new Float32Array(4),
  _qB = new Float32Array(4),
  _qC = new Float32Array(4),
  _qD = new Float32Array(4),
  _qInv = new Float32Array(4),
  _vA = new Float32Array(3),
  _vB = new Float32Array(3),
  _vC = new Float32Array(3),
  _fkP = new Float32Array(3),
  _fkQ = new Float32Array(4),
  _fkS = new Float32Array(3);

function qMul(a, b, out) {
  const ax = a[0],
    ay = a[1],
    az = a[2],
    aw = a[3],
    bx = b[0],
    by = b[1],
    bz = b[2],
    bw = b[3];
  out[0] = aw * bx + ax * bw + ay * bz - az * by;
  out[1] = aw * by - ax * bz + ay * bw + az * bx;
  out[2] = aw * bz + ax * by - ay * bx + az * bw;
  out[3] = aw * bw - ax * bx - ay * by - az * bz;
}

function qRot(q, x, y, z, out) {
  const qx = q[0],
    qy = q[1],
    qz = q[2],
    qw = q[3],
    tx = 2 * (qy * z - qz * y),
    ty = 2 * (qz * x - qx * z),
    tz = 2 * (qx * y - qy * x);
  out[0] = x + qw * tx + (qy * tz - qz * ty);
  out[1] = y + qw * ty + (qz * tx - qx * tz);
  out[2] = z + qw * tz + (qx * ty - qy * tx);
}

function qFromEuler(rx, ry, rz, out) {
  const cx = Math.cos(rx * 0.5),
    sx = Math.sin(rx * 0.5),
    cy = Math.cos(ry * 0.5),
    sy = Math.sin(ry * 0.5),
    cz = Math.cos(rz * 0.5),
    sz = Math.sin(rz * 0.5);
  // XYZ 顺序
  out[0] = sx * cy * cz + cx * sy * sz;
  out[1] = cx * sy * cz - sx * cy * sz;
  out[2] = cx * cy * sz + sx * sy * cz;
  out[3] = cx * cy * cz - sx * sy * sz;
}

function qFromTo(ax, ay, az, bx, by, bz, out) {
  const al = Math.hypot(ax, ay, az) || 1,
    bl = Math.hypot(bx, by, bz) || 1;
  ax /= al;
  ay /= al;
  az /= al;
  bx /= bl;
  by /= bl;
  bz /= bl;
  const dot = ax * bx + ay * by + az * bz;
  if (dot < -0.9999) {
    let ox = 1,
      oy = 0,
      oz = 0;
    if (Math.abs(ax) > 0.9) ((ox = 0), (oy = 1));
    const cx = ay * oz - az * oy,
      cy = az * ox - ax * oz,
      cz = ax * oy - ay * ox,
      cl = Math.hypot(cx, cy, cz) || 1;
    ((out[0] = cx / cl), (out[1] = cy / cl), (out[2] = cz / cl), (out[3] = 0));
    return;
  }
  const cx = ay * bz - az * by,
    cy = az * bx - ax * bz,
    cz = ax * by - ay * bx,
    w = 1 + dot,
    l = Math.hypot(cx, cy, cz, w) || 1;
  ((out[0] = cx / l), (out[1] = cy / l), (out[2] = cz / l), (out[3] = w / l));
}

function setQ(R, j, q) {
  const o = j * 4;
  ((R.q[o] = q[0]), (R.q[o + 1] = q[1]), (R.q[o + 2] = q[2]), (R.q[o + 3] = q[3]));
}

function setEuler(R, j, rx, ry, rz) {
  qFromEuler(rx, ry, rz, _qA);
  setQ(R, j, _qA);
}

function addEuler(R, j, rx, ry, rz) {
  const o = j * 4;
  ((_qA[0] = R.q[o]), (_qA[1] = R.q[o + 1]), (_qA[2] = R.q[o + 2]), (_qA[3] = R.q[o + 3]));
  qFromEuler(rx, ry, rz, _qB);
  qMul(_qA, _qB, _qC);
  setQ(R, j, _qC);
}

function setId(R, j) {
  const o = j * 4;
  ((R.q[o] = 0), (R.q[o + 1] = 0), (R.q[o + 2] = 0), (R.q[o + 3] = 1));
}

// 沿着给定祖先链计算目标骨骼在模型局部空间里的实时位置与旋转（零 GC）
function evalChainFK(rig, R, chain, outPos, outQuat, outScale) {
  const L = rig.local;
  ((outPos[0] = 0), (outPos[1] = 0), (outPos[2] = 0));
  ((outQuat[0] = 0), (outQuat[1] = 0), (outQuat[2] = 0), (outQuat[3] = 1));
  ((outScale[0] = 1), (outScale[1] = 1), (outScale[2] = 1));
  for (let i = 0; i < chain.length; i++) {
    const j = chain[i],
      p3 = j * 3,
      p4 = j * 4,
      lx = (L[p3] + R.t[p3]) * outScale[0],
      ly = (L[p3 + 1] + R.t[p3 + 1]) * outScale[1],
      lz = (L[p3 + 2] + R.t[p3 + 2]) * outScale[2];
    qRot(outQuat, lx, ly, lz, _vA);
    outPos[0] += _vA[0];
    outPos[1] += _vA[1];
    outPos[2] += _vA[2];
    ((_qB[0] = R.q[p4]), (_qB[1] = R.q[p4 + 1]), (_qB[2] = R.q[p4 + 2]), (_qB[3] = R.q[p4 + 3]));
    qMul(outQuat, _qB, _qC);
    ((outQuat[0] = _qC[0]), (outQuat[1] = _qC[1]), (outQuat[2] = _qC[2]), (outQuat[3] = _qC[3]));
    outScale[0] *= R.s[p3];
    outScale[1] *= R.s[p3 + 1];
    outScale[2] *= R.s[p3 + 2];
  }
}

// 通用两骨臂部 IK（骨骼自然朝向为局部 -Y）：
//   把 palmJ 精准送到模型局部空间目标点 (tx, ty, tz)，肘部朝极向量 (px, py, pz) 弯曲；
//   开启 allowStretch 时，目标超出臂长则顺着臂长拉长并反向补偿手掌缩放，避免手变形。
function solveArmIK(
  rig,
  R,
  parentChain,
  shldJ,
  midClear,
  elbJ,
  foreClear,
  palmJ,
  tx,
  ty,
  tz,
  px,
  py,
  pz,
  L1,
  L2,
  allowStretch = false,
) {
  evalChainFK(rig, R, parentChain, _fkP, _fkQ, _fkS);
  const L = rig.local,
    sp = shldJ * 3;
  // 肩膀在模型空间里的实时位置
  qRot(
    _fkQ,
    (L[sp] + R.t[sp]) * _fkS[0],
    (L[sp + 1] + R.t[sp + 1]) * _fkS[1],
    (L[sp + 2] + R.t[sp + 2]) * _fkS[2],
    _vA,
  );
  const sx = _fkP[0] + _vA[0],
    sy = _fkP[1] + _vA[1],
    sz = _fkP[2] + _vA[2];
  // 转到胸骨局部空间
  ((_qInv[0] = -_fkQ[0]), (_qInv[1] = -_fkQ[1]), (_qInv[2] = -_fkQ[2]), (_qInv[3] = _fkQ[3]));
  qRot(_qInv, tx - sx, ty - sy, tz - sz, _vA);
  qRot(_qInv, px, py, pz, _vB);

  const rawD = Math.hypot(_vA[0], _vA[1], _vA[2]) || 1e-4,
    maxReach = L1 + L2 - 0.015,
    minReach = Math.abs(L1 - L2) + 0.02;
  let stretch = 1,
    d = rawD;
  if (allowStretch && rawD > maxReach) {
    stretch = Math.min(2.35, rawD / (L1 + L2));
    d = maxReach;
  } else {
    d = Math.min(maxReach, Math.max(minReach, rawD));
  }

  const dx = _vA[0] / rawD,
    dy = _vA[1] / rawD,
    dz = _vA[2] / rawD,
    pdot = _vB[0] * dx + _vB[1] * dy + _vB[2] * dz;
  let bx = _vB[0] - dx * pdot,
    by = _vB[1] - dy * pdot,
    bz = _vB[2] - dz * pdot,
    bl = Math.hypot(bx, by, bz);
  if (bl < 1e-4) {
    bx = 0;
    by = 1;
    bz = 0;
    bl = 1;
  }
  bx /= bl;
  by /= bl;
  bz /= bl;

  const cosA = Math.min(1, Math.max(-1, (L1 * L1 + d * d - L2 * L2) / (2 * L1 * d))),
    sinA = Math.sqrt(Math.max(0, 1 - cosA * cosA)),
    ux = dx * cosA + bx * sinA,
    uy = dy * cosA + by * sinA,
    uz = dz * cosA + bz * sinA;

  // 肩膀旋转：局部 [0, -1, 0] -> 上臂方向 u
  qFromTo(0, -1, 0, ux, uy, uz, _qA);
  setQ(R, shldJ, _qA);
  for (let i = 0; i < midClear.length; i++) setId(R, midClear[i]);

  // 小臂方向 f 转到肩膀局部空间
  const fx = dx * d - ux * L1,
    fy = dy * d - uy * L1,
    fz = dz * d - uz * L1,
    fl = Math.hypot(fx, fy, fz) || 1;
  ((_qInv[0] = -_qA[0]), (_qInv[1] = -_qA[1]), (_qInv[2] = -_qA[2]), (_qInv[3] = _qA[3]));
  qRot(_qInv, fx / fl, fy / fl, fz / fl, _vC);
  qFromTo(0, -1, 0, _vC[0], _vC[1], _vC[2], _qB);
  setQ(R, elbJ, _qB);
  for (let i = 0; i < foreClear.length; i++) setId(R, foreClear[i]);

  // 拉伸与手掌比例补偿
  R.s[shldJ * 3] = 1;
  R.s[shldJ * 3 + 1] = stretch;
  R.s[shldJ * 3 + 2] = 1;
  if (palmJ >= 0) {
    R.s[palmJ * 3] = 1;
    R.s[palmJ * 3 + 1] = 1 / stretch;
    R.s[palmJ * 3 + 2] = 1;
  }
}

// ── 小肥石 (stone) 骨架索引与专属动作 ───────────────────────────────
const ST = {
  body: 2,
  tilt: 3,
  hips: 4,
  chest: 5,
  head: 8,
  chestChain: [0, 1, 2, 3, 4, 5],
  lShld: 39,
  lMid: [40, 41, 42],
  lElb: 44,
  lFore: [45, 46],
  lPalm: 47,
  lFingers: [53, 56, 59, 65, 68, 71, 77, 80, 83, 89, 92, 95],
  lThumb: [100, 103],
  rShld: 108,
  rMid: [109, 110, 111],
  rElb: 113,
  rFore: [114, 115],
  rPalm: 116,
  rFingers: [122, 125, 128, 134, 137, 140, 146, 149, 152, 158, 161, 164],
  rThumb: [169, 172],
  lHip: 177,
  lKnee: 180,
  rHip: 183,
  rKnee: 186,
  L1: 0.58,
  L2: 0.5,
};

function curlHand(R, fingers, thumb, curl, side) {
  for (let i = 0; i < fingers.length; i++) setEuler(R, fingers[i], -curl, 0, 0);
  setEuler(R, thumb[0], -curl * 0.72, -side * 0.42, side * 0.58);
  setEuler(R, thumb[1], -curl * 0.8, 0, 0);
}

// 动作一：原地做俯卧撑（穿插普攻时左手撑地、右手甩拳）
function stonePushup(R, I, out, rig, resetPose) {
  resetPose(R);
  const st = I.anim,
    isAttack = st === 'attack' || st === 'attack2' || st === 'cast_s2';
  // 带发力停顿的俯卧撑曲线：降下去憋半拍再顶起来
  const cyc = (I.time * 1.6) % 1;
  let dip;
  if (cyc < 0.42) {
    const u = cyc / 0.42;
    dip = u * u * (3 - 2 * u);
  } else if (cyc < 0.56) {
    dip = 1;
  } else {
    const u = (cyc - 0.56) / 0.44;
    dip = 1 - u * u * (3 - 2 * u);
  }
  if (isAttack) dip = 0.25;

  // 以身后双脚为支点做俯仰：top 56° -> bottom 80°，双脚始终踩稳地面
  const pitch = 0.96 + dip * 0.43,
    bodyY = 0.06 + 0.92 * Math.cos(pitch),
    bodyZ = -0.82 + 0.92 * Math.sin(pitch),
    roll = isAttack ? 0.28 * Math.sin(Math.min(1, I.p) * Math.PI) : 0;

  R.t[ST.body * 3] = 0;
  R.t[ST.body * 3 + 1] = bodyY - 0.963;
  R.t[ST.body * 3 + 2] = bodyZ;
  setEuler(R, ST.body, pitch, 0, roll);
  setId(R, ST.tilt);
  setId(R, ST.hips);
  // 下压到底时胸腹略微压扁发力
  setEuler(R, ST.chest, -0.06 + dip * 0.04, 0, 0);
  R.s[ST.chest * 3] = 1 + dip * 0.06;
  R.s[ST.chest * 3 + 1] = 1 - dip * 0.05;
  R.s[ST.chest * 3 + 2] = 1 + dip * 0.04;
  // 脑袋抬着往前看，推起来时跟着安全帽微微晃动
  setEuler(R, ST.head, -pitch * 0.72 + Math.sin(I.time * 10) * 0.03 * dip, 0, 0);

  // 双腿伸直脚尖顶地
  setEuler(R, ST.lHip, 0.05, 0, 0.09);
  setEuler(R, ST.lKnee, 0.06, 0, 0);
  setEuler(R, ST.rHip, 0.05, 0, -0.09);
  setEuler(R, ST.rKnee, 0.06, 0, 0);

  // 左手死锁地面做俯卧撑（若同时在抓人，后面 post 会接管左手去抓敌人）
  solveArmIK(
    rig,
    R,
    ST.chestChain,
    ST.lShld,
    ST.lMid,
    ST.lElb,
    ST.lFore,
    ST.lPalm,
    0.86,
    0.15,
    0.44,
    0.95,
    0.26,
    -0.35,
    ST.L1,
    ST.L2,
    false,
  );
  setEuler(R, ST.lPalm, 0.45, 0, 0);
  curlHand(R, ST.lFingers, ST.lThumb, 1.35, 1);

  if (isAttack) {
    // 练功中穿插普攻：单手撑地，右手狠狠向前甩一记重拳
    const p = Math.min(1, Math.max(0, I.p)),
      wind = p < 0.3 ? p / 0.3 : 1 - (p - 0.3) / 0.7,
      punch = p < 0.3 ? -0.35 * wind : Math.sin(Math.min(1, (p - 0.3) / 0.35) * Math.PI);
    solveArmIK(
      rig,
      R,
      ST.chestChain,
      ST.rShld,
      ST.rMid,
      ST.rElb,
      ST.rFore,
      ST.rPalm,
      -0.45 + punch * 0.25,
      0.55 + punch * 0.45,
      0.45 + punch * 1.15,
      -0.9,
      0.2,
      -0.2,
      ST.L1,
      ST.L2,
      true,
    );
    setEuler(R, ST.rPalm, 0.1, 0, 0);
    curlHand(R, ST.rFingers, ST.rThumb, 1.45, -1);
    out.glow = 1.45 + 1.1 * Math.max(0, punch);
  } else {
    // 右手同步死锁地面撑起俯卧撑
    solveArmIK(
      rig,
      R,
      ST.chestChain,
      ST.rShld,
      ST.rMid,
      ST.rElb,
      ST.rFore,
      ST.rPalm,
      -0.86,
      0.15,
      0.44,
      -0.95,
      0.26,
      -0.35,
      ST.L1,
      ST.L2,
      false,
    );
    setEuler(R, ST.rPalm, 0.45, 0, 0);
    curlHand(R, ST.rFingers, ST.rThumb, 1.35, -1);
    out.glow = 1.3 + 0.35 * dip;
  }
  I.clip = 'pushup';
  return true;
}

// 动作二：抓起来锤（左手始终伸向目标胸口死死抓着，右手自由锤人）
function stoneGrabOverlay(R, I, out, rig) {
  const jitter = Math.sin(I.time * 18) * 0.035,
    gx = I.grabOn ? I.grabX : 0.18,
    gy = (I.grabOn ? I.grabY : 1.05) + jitter,
    gz = I.grabOn ? I.grabZ : 1.45;
  solveArmIK(
    rig,
    R,
    ST.chestChain,
    ST.lShld,
    ST.lMid,
    ST.lElb,
    ST.lFore,
    ST.lPalm,
    gx,
    gy,
    gz,
    0.85,
    -0.25,
    0.2,
    ST.L1,
    ST.L2,
    true,
  );
  // 手掌扣向目标、五指全力死抓
  setEuler(R, ST.lPalm, 0.28, -0.45, 0.15);
  curlHand(R, ST.lFingers, ST.lThumb, 1.52, 1);

  // 非攻击期间（比如正被敌人拖着走），右手举高握拳蓄势准备接着锤
  const st = I.anim;
  if (st !== 'attack' && st !== 'attack2' && st !== 'cast_s2' && !(I.mode & 16)) {
    const bob = Math.sin(I.time * 9) * 0.06;
    solveArmIK(
      rig,
      R,
      ST.chestChain,
      ST.rShld,
      ST.rMid,
      ST.rElb,
      ST.rFore,
      ST.rPalm,
      -0.72,
      1.68 + bob,
      0.22,
      -0.9,
      -0.2,
      -0.4,
      ST.L1,
      ST.L2,
      false,
    );
    setEuler(R, ST.rPalm, 0.15, 0.35, 0);
    curlHand(R, ST.rFingers, ST.rThumb, 1.5, -1);
  }
  out.glow = Math.max(out.glow, 1.35 + 0.15 * Math.sin(I.time * 10));
}

// 动作三：抓起尸体准备投掷（双手高举过头顶）
function stoneCorpseHoistOverlay(R, I, out, rig) {
  const sway = Math.sin(I.time * 6) * 0.05;
  solveArmIK(
    rig,
    R,
    ST.chestChain,
    ST.lShld,
    ST.lMid,
    ST.lElb,
    ST.lFore,
    ST.lPalm,
    0.42,
    2.25 + sway,
    0.18,
    0.9,
    0.1,
    0.3,
    ST.L1,
    ST.L2,
    false,
  );
  solveArmIK(
    rig,
    R,
    ST.chestChain,
    ST.rShld,
    ST.rMid,
    ST.rElb,
    ST.rFore,
    ST.rPalm,
    -0.42,
    2.25 - sway,
    0.18,
    -0.9,
    0.1,
    0.3,
    ST.L1,
    ST.L2,
    false,
  );
  setEuler(R, ST.lPalm, 0.2, -0.5, 0);
  setEuler(R, ST.rPalm, 0.2, 0.5, 0);
  curlHand(R, ST.lFingers, ST.lThumb, 1.48, 1);
  curlHand(R, ST.rFingers, ST.rThumb, 1.48, -1);
  out.glow = Math.max(out.glow, 1.55 + 0.25 * Math.sin(I.time * 8));
}

const SPECIAL_POSES = new Map();

export function registerSpecialPose(kartId, handler) {
  SPECIAL_POSES.set(kartId, handler);
}

export function getSpecialPose(kartId) {
  return SPECIAL_POSES.get(kartId) || null;
}

// 注册小肥石专属动作组
registerSpecialPose('stone', {
  // 抓人期间普攻固定用右手锤，避免左手乱甩
  pickAttackClip(I, pick) {
    if (I.mode & 32) return pick('attackR', 'attack', 'attackL');
    return null;
  },
  // 全身动作覆盖：练功做俯卧撑
  override(R, I, out, rig, resetPose) {
    if (I.mode & 16 && I.anim !== 'leap' && I.anim !== 'cast_ult') {
      return stonePushup(R, I, out, rig, resetPose);
    }
    return false;
  },
  // 后处理肢体覆盖：单手抓人 / 双手高举准备扔
  post(R, I, out, rig) {
    if (I.mode & 32) {
      stoneGrabOverlay(R, I, out, rig);
    } else if (I.mode & 64 && I.anim !== 'cast_s2' && I.anim !== 'leap') {
      stoneCorpseHoistOverlay(R, I, out, rig);
    }
  },
});

// 葱仔仔专属骨骼常量（源自 dist/kart/scallion.bin，99 根骨）
// [2] 主躯干，[28..30] 左臂(沿 +X 伸展)，[31..33] 右臂(沿 -X 伸展)，[34] 头顶绿葱叶根部，
// [37..43]、[44..50]、[51..57] 等为葱叶分叉链。
const SC = {
  body: 2,
  lArm: 28,
  lMid: 29,
  lTip: 30,
  rArm: 31,
  rMid: 32,
  rTip: 33,
  hairRoot: 34,
  leafBases: [37, 44, 51, 58, 65],
};

// 葱仔仔大招「葱击波」气功波专属动作：
// 扎马步微微后仰顶住后坐力，双臂向前推直聚拢（像发龟派气功一样），高频震颤，头顶绿葱叶被气浪吹得向后狂甩。
function scallionBeamPose(R, I, out, rig, resetPose) {
  resetPose(R);
  const t = I.time,
    vib = Math.sin(t * 42) * 0.032,
    vib2 = Math.cos(t * 35) * 0.024;
  // 躯干微微压低后仰顶住激光后坐力
  R.t[SC.body * 3 + 1] -= 0.06;
  R.t[SC.body * 3 + 2] -= 0.08 + vib * 0.4;
  setEuler(R, SC.body, -0.18 + vib, vib2 * 0.6, 0);

  // 左臂自然朝 +X -> 绕 Y 负转近 92 度推向正前方 +Z，同时微向胸前靠拢聚气
  R.t[SC.lArm * 3] -= 0.08;
  R.t[SC.lArm * 3 + 2] += 0.1;
  setEuler(R, SC.lArm, 0.12 + vib, -1.62, -0.08);
  setEuler(R, SC.lMid, 0, 0, 0);
  setEuler(R, SC.lTip, 0, 0, 0);

  // 右臂自然朝 -X -> 绕 Y 正转近 92 度推向正前方 +Z，与左手并拢托住葱能波
  R.t[SC.rArm * 3] += 0.08;
  R.t[SC.rArm * 3 + 2] += 0.1;
  setEuler(R, SC.rArm, 0.12 - vib, 1.62, 0.08);
  setEuler(R, SC.rMid, 0, 0, 0);
  setEuler(R, SC.rTip, 0, 0, 0);

  // 头顶一簇绿葱叶被强烈气浪向后吹弯并高频抖动
  if (SC.hairRoot < rig.count) {
    setEuler(R, SC.hairRoot, -0.45 + Math.sin(t * 28) * 0.08, 0, Math.cos(t * 22) * 0.06);
  }
  for (let i = 0; i < SC.leafBases.length; i++) {
    const b = SC.leafBases[i];
    if (b < rig.count) {
      setEuler(R, b, -0.28 + Math.sin(t * 24 + i * 1.1) * 0.09, 0, Math.cos(t * 19 + i) * 0.05);
    }
  }
  out.glow = Math.max(out.glow, 1.75 + 0.3 * Math.sin(t * 24));
  return true;
}

// 飘逸刺头高速滑行时，绿葱叶顺风向后飘动
function scallionWindHairOverlay(R, I, out, rig) {
  const t = I.time;
  if (SC.hairRoot < rig.count) {
    setEuler(R, SC.hairRoot, -0.32 + Math.sin(t * 14) * 0.07, 0, Math.cos(t * 11) * 0.06);
  }
  for (let i = 0; i < SC.leafBases.length; i++) {
    const b = SC.leafBases[i];
    if (b < rig.count) {
      setEuler(R, b, -0.18 + Math.sin(t * 16 + i * 0.9) * 0.08, 0, 0);
    }
  }
  out.glow = Math.max(out.glow, 1.25);
}

// 注册葱仔仔专属动作组
registerSpecialPose('scallion', {
  override(R, I, out, rig, resetPose) {
    if (I.mode & 128) {
      return scallionBeamPose(R, I, out, rig, resetPose);
    }
    return false;
  },
  post(R, I, out, rig) {
    if ((I.mode & 256) && !(I.mode & 128)) {
      scallionWindHairOverlay(R, I, out, rig);
    }
  },
});

// 纸札人专属骨骼常量（源自 dist/kart/paperboy.bin，102 根骨）
// [22] 上身枢，[37] 左臂枢 -> [39] 左肘枢 -> [43] 左手枢（标准 -Y 轴双骨臂）
// [45] 右臂枢 -> [47] 右肘枢 -> [51] 右手枢（标准 -Y 轴双骨臂）
// [53] 颈枢 -> [54] 头枢 -> [82] 红唇嘴组
const PB = {
  upper: 22,
  chestChain: [0, 1, 2, 3, 22],
  lShld: 37,
  lMid: [38],
  lElb: 39,
  lFore: [40, 41, 42],
  lPalm: 43,
  rShld: 45,
  rMid: [46],
  rElb: 47,
  rFore: [48, 49, 50],
  rPalm: 51,
  neck: 53,
  head: 54,
  L1: 0.34,
  L2: 0.311,
};

// 纸札人一技能「唢呐齐响」专属动作：
// 上身随节奏左右摇晃，仰头鼓腮，双手用两骨 IK 一前一后举到嘴前死死托着大唢呐吹响！
function paperboySuonaOverlay(R, I, out, rig) {
  const t = I.time,
    sway = Math.sin(t * 7.5),
    bob = Math.sin(t * 15) * 0.04;
  // 上身微微后仰、左右大幅摇晃吹唢呐，下半身继续按原走路/待机动作跑
  setEuler(R, PB.upper, -0.14 + bob, sway * 0.24, sway * 0.12);
  setEuler(R, PB.neck, -0.12, 0, -sway * 0.06);
  setEuler(R, PB.head, -0.18 + bob * 1.2, sway * 0.12, sway * 0.08);

  // 左手靠嘴托住唢呐吹口，右手伸前托住喇叭管身
  solveArmIK(
    rig,
    R,
    PB.chestChain,
    PB.lShld,
    PB.lMid,
    PB.lElb,
    PB.lFore,
    PB.lPalm,
    0.06 + sway * 0.06,
    1.94 + bob * 0.4,
    0.46,
    0.9,
    -0.25,
    0.35,
    PB.L1,
    PB.L2,
    false,
  );
  solveArmIK(
    rig,
    R,
    PB.chestChain,
    PB.rShld,
    PB.rMid,
    PB.rElb,
    PB.rFore,
    PB.rPalm,
    -0.05 + sway * 0.08,
    1.88 + bob * 0.4,
    0.64,
    -0.9,
    -0.25,
    0.35,
    PB.L1,
    PB.L2,
    false,
  );
  out.glow = Math.max(out.glow, 1.5 + 0.25 * Math.sin(t * 14));
}

registerSpecialPose('paperboy', {
  post(R, I, out, rig) {
    if (I.mode & 512) {
      paperboySuonaOverlay(R, I, out, rig);
    }
  },
});

// 活蛆（maggot.bin，64 骨，bindSpace: true）：21 节体节按从头到尾排在骨 3 下方
const MG_SEGS = [4, 13, 20, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 60];

function maggotSprayOverlay(R, I, out) {
  const t = I.time;
  // 喷吐：前段身子昂起来剧烈抽动鼓肚，像肥蛆使劲往外喷粪
  for (let k = 0; k < MG_SEGS.length; k++) {
    const idx = MG_SEGS[k],
      frac = Math.max(0, 1 - k / 8),
      wave = Math.sin(t * 18 - k * 0.55);
    if (frac > 0) {
      R.t[idx * 3 + 1] += frac * (0.28 + 0.08 * wave);
      R.t[idx * 3 + 2] += frac * 0.09 * wave;
      setEuler(R, idx, -frac * (0.22 + 0.1 * wave), wave * 0.1 * frac, 0);
    }
    const puff = 1 + (0.14 * frac + 0.05) * Math.sin(t * 20 - k * 0.7);
    R.s[idx * 3] *= puff;
    R.s[idx * 3 + 1] *= puff;
  }
  out.glow = Math.max(out.glow, 1.35 + 0.2 * Math.sin(t * 16));
}

function maggotVacuumOverlay(R, I, out) {
  const t = I.time,
    suck = 1 + 0.22 * Math.sin(t * 22);
  // 吸粪机：整条身子像手风琴一样猛鼓起来往里猛吸
  for (let k = 0; k < MG_SEGS.length; k++) {
    const idx = MG_SEGS[k],
      mid = Math.sin((k / (MG_SEGS.length - 1)) * Math.PI),
      s = 1 + mid * 0.34 * suck;
    R.s[idx * 3] *= s;
    R.s[idx * 3 + 1] *= s;
    R.t[idx * 3 + 1] += mid * 0.12 * Math.sin(t * 22);
  }
  out.glow = Math.max(out.glow, 1.7 + 0.25 * Math.sin(t * 20));
}

registerSpecialPose('maggot', {
  post(R, I, out) {
    if (I.mode & 1024) {
      maggotSprayOverlay(R, I, out);
    } else if (I.mode & 2048) {
      maggotVacuumOverlay(R, I, out);
    }
  },
});

// 雪松老师 (boxtree) 骨架动态识别与专属动作：
// 1. 一技能「挖土」(mode 4096)：反复弯腰插锹撬地铲沙（3 次连贯深挖起撬节奏）
// 2. 二技能「立定撑篙」(mode 4)：连贯起跳站立在铲头朝地倒插的铁锹顶端，双臂微张保持平衡
function resolveBoxtreeBones(rig) {
  if (rig._xsBones) return rig._xsBones;
  const names = rig.names || [],
    find = (re) => {
      for (let i = 0; i < names.length; i++) {
        if (re.test(names[i] || '')) return i;
      }
      return -1;
    },
    findAll = (re) => {
      const arr = [];
      for (let i = 0; i < names.length; i++) {
        if (re.test(names[i] || '')) arr.push(i);
      }
      return arr;
    };
  let body = find(/^(body|torso|upper|chest|spine|hips|pelvis|躯干|上身|腰|身体)/i);
  if (body < 0) body = find(/(body|torso|upper|chest|spine|hips|pelvis|躯干|上身|腰)/i);
  if (body < 0) body = Math.min(2, Math.max(0, rig.count - 1));
  const head = find(/(head|neck|头|颈)/i),
    lArm = find(/(l_?arm|left_?arm|l_?shld|left_?shoulder|左臂|左肩|左手)/i),
    rArm = find(/(r_?arm|right_?arm|r_?shld|right_?shoulder|右臂|右肩|右手)/i),
    lLeg = find(/(l_?leg|left_?leg|l_?hip|left_?thigh|左腿|左髋)/i),
    rLeg = find(/(r_?leg|right_?leg|r_?hip|right_?thigh|右腿|右髋)/i),
    shovels = findAll(/(shovel|spade|tool|weapon|铁锹|铲|锹)/i);
  rig._xsBones = { body, head, lArm, rArm, lLeg, rLeg, shovels };
  return rig._xsBones;
}

function mulEuler(R, j, rx, ry, rz) {
  if (j < 0) return;
  const o = j * 4;
  _qB[0] = R.q[o];
  _qB[1] = R.q[o + 1];
  _qB[2] = R.q[o + 2];
  _qB[3] = R.q[o + 3];
  qFromEuler(rx, ry, rz, _qA);
  qMul(_qB, _qA, _qC);
  setQ(R, j, _qC);
}

function boxtreeDigPose(R, I, out, rig, resetPose) {
  resetPose(R);
  const B = resolveBoxtreeBones(rig),
    p = I.digP ?? ((I.time % 2) / 2),
    cyc = (p * 3) % 1;
  // 每次循环：0~0.42 下压扎锹 -> 0.42~0.76 猛力向后撬起 -> 0.76~1.0 回正准备下一锹
  let pitch, dip, pry, twist;
  if (cyc < 0.42) {
    const u = cyc / 0.42,
      e = u * u * (3 - 2 * u);
    pitch = 0.08 + 0.56 * e;
    dip = -0.22 * e;
    pry = -0.35 * e;
    twist = -0.18 * e;
  } else if (cyc < 0.76) {
    const u = (cyc - 0.42) / 0.34,
      e = 1 - Math.pow(1 - u, 3);
    pitch = 0.64 - 0.82 * e;
    dip = -0.22 + 0.28 * e;
    pry = -0.35 + 1.05 * e;
    twist = -0.18 + 0.38 * e;
  } else {
    const u = (cyc - 0.76) / 0.24;
    pitch = -0.18 + 0.26 * u;
    dip = 0.06 * (1 - u);
    pry = 0.7 * (1 - u);
    twist = 0.2 * (1 - u);
  }
  const loadTilt = p * 0.14;
  R.t[B.body * 3 + 1] += dip;
  R.t[B.body * 3 + 2] += pitch * 0.22;
  mulEuler(R, B.body, pitch, twist, 0);
  B.head >= 0 && mulEuler(R, B.head, -pitch * 0.45 + 0.16, -twist * 0.5, 0);
  B.lArm >= 0 && mulEuler(R, B.lArm, -0.55 - pry * 0.55 - loadTilt, 0.22, -0.12);
  B.rArm >= 0 && mulEuler(R, B.rArm, -0.68 - pry * 0.7 - loadTilt, -0.22, 0.14);
  B.lLeg >= 0 && mulEuler(R, B.lLeg, -Math.max(0, pitch) * 0.45, 0, 0);
  B.rLeg >= 0 && mulEuler(R, B.rLeg, -Math.max(0, pitch) * 0.35 + 0.12, 0, 0);
  for (let i = 0; i < B.shovels.length; i++) {
    mulEuler(R, B.shovels[i], 0.45 - pry * 0.95, 0, 0);
  }
  out.glow = Math.max(out.glow, 1.35 + 0.25 * Math.sin(I.time * 12));
  return true;
}

function boxtreePolePose(R, I, out, rig, resetPose) {
  resetPose(R);
  const B = resolveBoxtreeBones(rig),
    p = Math.max(0, Math.min(1, I.poleP ?? 1)),
    hop = Math.sin(p * Math.PI),
    sway = Math.sin(I.time * 3.1) * p,
    sway2 = Math.cos(I.time * 2.4) * p;
  // 起身连贯：前段微蹲蓄力腾空，升到顶端后双腿站稳、双臂平展在铲柄顶部保持平衡
  R.t[B.body * 3 + 1] += -0.18 * hop + 0.04 * Math.sin(I.time * 4.5) * p;
  mulEuler(R, B.body, 0.28 * hop, sway2 * 0.14, sway * 0.08);
  B.head >= 0 && mulEuler(R, B.head, -0.12 * hop + 0.06 * p, Math.sin(I.time * 1.9) * 0.24 * p, 0);
  B.lArm >= 0 && mulEuler(R, B.lArm, -0.18 * p, 0, 0.85 * p + sway * 0.16);
  B.rArm >= 0 && mulEuler(R, B.rArm, -0.18 * p, 0, -0.85 * p + sway * 0.16);
  B.lLeg >= 0 && mulEuler(R, B.lLeg, -0.45 * hop, 0, 0.08 * p);
  B.rLeg >= 0 && mulEuler(R, B.rLeg, -0.45 * hop, 0, -0.08 * p);
  // 手中若有独立铲子骨，在起身瞬间顺滑收进脚下倒插的铁锹里，避免手里和脚下出现两把铲子
  const sHide = Math.max(0.001, 1 - Math.min(1, p * 2.6));
  for (let i = 0; i < B.shovels.length; i++) {
    const j = B.shovels[i];
    R.s[j * 3] *= sHide;
    R.s[j * 3 + 1] *= sHide;
    R.s[j * 3 + 2] *= sHide;
  }
  out.glow = Math.max(out.glow, 1.55 + 0.25 * Math.sin(I.time * 4.5));
  return true;
}

registerSpecialPose('boxtree', {
  override(R, I, out, rig, resetPose) {
    if (I.mode & 4096) {
      return boxtreeDigPose(R, I, out, rig, resetPose);
    }
    if (I.mode & 4) {
      return boxtreePolePose(R, I, out, rig, resetPose);
    }
    return false;
  },
});

// 半马人 (horseman) 专属动作（基于 horseman.bin 真实骨架索引）：
//   3=马身骨盆, 7=上半身躯干, 61/130=前左/右腿,
//   199/200/201=后左腿髋/膝/蹄, 247/248/249=后右腿髋/膝/蹄, 296/299/301=尾巴
// - mode 16384: 一技能「后腿蹬」蓄力（前腿蹬地稳住，后腿蜷缩蓄力微颤，绝不扭头）
// - anim cast_s1: 后腿猛蹬踢出（前倾压身支地，双后腿向后上方猛力直踢）
// - mode 131072: 被动强化冲锋（前倾冲刺红金光）
// - mode 32768: 大招「践踏」狂奔前倾与强光
// - mode 65536: 二技能「嘶鸣」霸体免控金光
const HM_B = {
  body: 3,
  torso: 7,
  flLeg: 61,
  frLeg: 130,
  hlHip: 199,
  hlKnee: 200,
  hlHoof: 201,
  hrHip: 247,
  hrKnee: 248,
  hrHoof: 249,
  tail0: 296,
  tail1: 299,
  tail2: 301,
};

function horsemanKickChargePose(R, I, out, rig, resetPose) {
  if (rig.count <= HM_B.tail2) return false;
  resetPose(R);
  const t = I.time,
    vib = Math.sin(t * 34) * 0.032,
    vib2 = Math.cos(t * 27) * 0.024;
  // 压低马身，重心沉向后臀蓄势，上身稳住不乱扭
  R.t[HM_B.body * 3 + 1] -= 0.22;
  R.t[HM_B.body * 3 + 2] -= 0.06;
  setEuler(R, HM_B.body, 0.16 + vib, 0, vib2 * 0.7);
  setEuler(R, HM_B.torso, 0.22 - vib * 0.5, 0, 0);
  // 前双腿向前斜撑扎稳地面
  setEuler(R, HM_B.flLeg, -0.24, 0, 0.06);
  setEuler(R, HM_B.frLeg, -0.24, 0, -0.06);
  // 后双腿向腹下收拢曲膝蓄力，带紧绷颤动
  setEuler(R, HM_B.hlHip, -0.62 + vib, 0, 0.09);
  setEuler(R, HM_B.hrHip, -0.62 - vib, 0, -0.09);
  setEuler(R, HM_B.hlKnee, 1.12 - vib, 0, 0);
  setEuler(R, HM_B.hrKnee, 1.12 + vib, 0, 0);
  setEuler(R, HM_B.hlHoof, -0.45, 0, 0);
  setEuler(R, HM_B.hrHoof, -0.45, 0, 0);
  // 马尾紧绷翘起
  setEuler(R, HM_B.tail0, 0.45 + vib * 1.8, 0, vib2 * 1.6);
  setEuler(R, HM_B.tail1, 0.25, 0, -vib2 * 1.2);
  out.glow = Math.max(out.glow, 1.55 + 0.3 * Math.sin(t * 16));
  return true;
}

function horsemanKickBlastPose(R, I, out, rig, resetPose) {
  if (rig.count <= HM_B.tail2) return false;
  resetPose(R);
  const p = Math.max(0, Math.min(1, I.p));
  // 爆发曲线：0~0.22 瞬间甩腿踢直，0.22~0.58 高位定格震颤，0.58~1.0 落地回正
  let k = 0;
  if (p < 0.22) {
    const u = p / 0.22;
    k = 1 - Math.pow(1 - u, 3);
  } else if (p < 0.58) {
    const u = (p - 0.22) / 0.36;
    k = 1 - 0.06 * u + Math.sin(u * Math.PI * 3) * 0.035;
  } else {
    const u = (p - 0.58) / 0.42;
    k = 0.94 * (1 - u * u * (3 - 2 * u));
  }
  const spread = 0.11 * k;
  // 马身猛向前俯冲、后臀高高扬起，双前蹄稳稳撑地
  R.t[HM_B.body * 3 + 1] += 0.16 * k;
  R.t[HM_B.body * 3 + 2] += 0.14 * k;
  setEuler(R, HM_B.body, 0.48 * k, 0, 0);
  setEuler(R, HM_B.torso, -0.18 * k, 0, 0);
  setEuler(R, HM_B.flLeg, -0.46 * k, 0, 0.08 * k);
  setEuler(R, HM_B.frLeg, -0.46 * k, 0, -0.08 * k);
  // 双后腿全力向后上方直踢（+X 旋转把 -Y 后腿高高甩向 -Z 后上方）
  setEuler(R, HM_B.hlHip, 1.66 * k, 0, spread);
  setEuler(R, HM_B.hrHip, 1.66 * k, 0, -spread);
  setEuler(R, HM_B.hlKnee, -0.16 * k, 0, 0);
  setEuler(R, HM_B.hrKnee, -0.16 * k, 0, 0);
  setEuler(R, HM_B.hlHoof, 0.38 * k, 0, 0);
  setEuler(R, HM_B.hrHoof, 0.38 * k, 0, 0);
  // 马尾随着蹬腿高高甩起
  setEuler(R, HM_B.tail0, 0.92 * k, 0, 0);
  setEuler(R, HM_B.tail1, 0.48 * k, 0, 0);
  setEuler(R, HM_B.tail2, 0.25 * k, 0, 0);
  out.glow = Math.max(out.glow, 1.6 + 0.55 * k);
  return true;
}

registerSpecialPose('horseman', {
  override(R, I, out, rig, resetPose) {
    if (I.mode & 16384) {
      return horsemanKickChargePose(R, I, out, rig, resetPose);
    }
    if (I.anim === 'cast_s1') {
      return horsemanKickBlastPose(R, I, out, rig, resetPose);
    }
    return false;
  },
  post(R, I, out, rig) {
    const t = I.time,
      body = rig.count > HM_B.body ? HM_B.body : Math.min(1, Math.max(0, rig.count - 1));
    if (I.mode & 131072) {
      mulEuler(R, body, 0.24, 0, 0);
      rig.count > HM_B.torso && mulEuler(R, HM_B.torso, 0.22, 0, 0);
      out.glow = Math.max(out.glow, 2.25);
      out.tint = Math.max(out.tint, 0.32);
      out.tintColor = 0xff4c24;
    } else if (I.mode & 32768) {
      mulEuler(R, body, 0.16, 0, Math.sin(t * 14) * 0.06);
      out.glow = Math.max(out.glow, 1.65 + 0.25 * Math.sin(t * 12));
    }
    if (I.mode & 65536) {
      out.glow = Math.max(out.glow, 1.9 + 0.25 * Math.sin(t * 10));
    }
  },
});

// 大脚牛 (cow) 专属动作（基于 cow.bin 157 根骨架真实索引）：
//   2=骨盆根(高1.77m), 7/10/14=左腿髋/膝/大脚, 43/46/50=右腿髋/膝/大脚,
//   79=腰, 83=胸, 121/124=左臂/左前臂, 129/132=右臂/右前臂, 137=牛头
// - mode 524288: 一技能「深蹲」（暴力高频深蹲，双大脚贴地，期间照常挥臂普攻）
// - mode 1048576: 二技能「飞踢」（腾空侧身蹬腿飞踹）
// - anim cast_ult: 大招「牛气冲天」跺脚（高举单腿狠狠砸向地面）
// - mode 2097152: 被动「大长腿」跨墙（高抬腿大跨步越障）
// - mode 4194304: 力竭状态（双腿发软打颤的残废跛行与扶膝喘气）
// - mode 262144: 大招变大期间红金气焰发光
const CW_B = {
  pelvis: 2,
  lHip: 7,
  lKnee: 10,
  lFoot: 14,
  rHip: 43,
  rKnee: 46,
  rFoot: 50,
  waist: 79,
  chest: 83,
  lArm: 121,
  lFore: 124,
  rArm: 129,
  rFore: 132,
  head: 137,
};

function cowSquatPose(R, I, out, rig, resetPose) {
  if (rig.count <= CW_B.head) return false;
  resetPose(R);
  const st = I.anim,
    isAtk = st === 'attack' || st === 'attack2',
    // 高频暴力深蹲：每秒近 4 下，快蹲快起带弹性回弹
    cyc = (I.time * 3.85) % 1;
  let dip;
  if (cyc < 0.4) {
    const u = cyc / 0.4;
    dip = u * u * (3 - 2 * u);
  } else if (cyc < 0.52) {
    dip = 1;
  } else {
    const u = (cyc - 0.52) / 0.48;
    dip = 1 - u * u * (3 - 2 * u);
  }
  const hipAng = -1.22 * dip,
    kneeAng = 2.14 * dip,
    footAng = -0.92 * dip,
    dropY = -1.02 * dip;
  R.t[CW_B.pelvis * 3 + 1] += dropY;
  R.t[CW_B.pelvis * 3 + 2] -= 0.18 * dip;
  setEuler(R, CW_B.pelvis, 0.26 * dip, 0, Math.sin(I.time * 24) * 0.035 * dip);
  setEuler(R, CW_B.lHip, hipAng, 0.15 * dip, 0.13 * dip);
  setEuler(R, CW_B.rHip, hipAng, -0.15 * dip, -0.13 * dip);
  setEuler(R, CW_B.lKnee, kneeAng, 0, 0);
  setEuler(R, CW_B.rKnee, kneeAng, 0, 0);
  setEuler(R, CW_B.lFoot, footAng, 0, 0);
  setEuler(R, CW_B.rFoot, footAng, 0, 0);
  setEuler(R, CW_B.waist, 0.2 * dip, 0, 0);
  setEuler(R, CW_B.head, -0.24 * dip + Math.sin(I.time * 24) * 0.05, 0, 0);
  if (isAtk) {
    const p = Math.min(1, Math.max(0, I.p)),
      punch = Math.sin(Math.min(1, p / 0.65) * Math.PI);
    setEuler(R, CW_B.chest, 0.08, -0.38 * punch, 0);
    setEuler(R, CW_B.rArm, -1.45 * punch - 0.45, 0, -0.25);
    setEuler(R, CW_B.rFore, -0.35 + 0.3 * punch, 0, 0);
    setEuler(R, CW_B.lArm, -0.8 * dip, 0, 0.32);
    setEuler(R, CW_B.lFore, -0.45, 0, 0);
    out.glow = Math.max(out.glow, 1.55 + 0.55 * punch);
  } else {
    setEuler(R, CW_B.lArm, -1.2 * dip - 0.16, 0, 0.24);
    setEuler(R, CW_B.rArm, -1.2 * dip - 0.16, 0, -0.24);
    setEuler(R, CW_B.lFore, -0.38 * dip, 0, 0);
    setEuler(R, CW_B.rFore, -0.38 * dip, 0, 0);
    out.glow = Math.max(out.glow, 1.32 + 0.48 * dip);
  }
  return true;
}

// 丝滑急停：叠在实时待机帧上，先顺势屈膝后仰踩稳刹车，再按五次缓出曲线丝滑归零回待机，全程零跳帧
function cowStopPose(R, I, out, rig, resetPose) {
  if (rig.count <= CW_B.head) return false;
  resetPose(R, I.time + (I.seed ?? 0) * 3);
  const dur = 0.56,
    t = I.anim === 'stop' ? Math.max(0, Math.min(1, I.p)) * dur : Math.max(0, I.stopT);
  let k = 0;
  if (t < 0.11) {
    const u = t / 0.11;
    k = 1 - Math.pow(1 - u, 3);
  } else if (t < dur) {
    const u = (t - 0.11) / (dur - 0.11);
    k = Math.pow(1 - u, 3) * (1 + 2.1 * u * (1 - u));
  }
  if (k > 1e-4) {
    R.t[CW_B.pelvis * 3 + 1] -= 0.24 * k;
    R.t[CW_B.pelvis * 3 + 2] -= 0.13 * k;
    addEuler(R, CW_B.pelvis, -0.17 * k, 0.08 * k, 0);
    addEuler(R, CW_B.waist, 0.1 * k, -0.06 * k, 0);
    addEuler(R, CW_B.head, 0.13 * k, 0, 0);
    // 右脚前探蹬地刹车，左脚微曲缓冲，结束后顺滑归零回接实时待机
    addEuler(R, CW_B.rHip, -0.46 * k, 0, -0.06 * k);
    addEuler(R, CW_B.rKnee, 0.5 * k, 0, 0);
    addEuler(R, CW_B.rFoot, -0.18 * k, 0, 0);
    addEuler(R, CW_B.lHip, 0.16 * k, 0, 0.08 * k);
    addEuler(R, CW_B.lKnee, 0.54 * k, 0, 0);
    addEuler(R, CW_B.lFoot, -0.32 * k, 0, 0);
    addEuler(R, CW_B.lArm, -0.3 * k, 0, 0.44 * k);
    addEuler(R, CW_B.rArm, 0.22 * k, 0, -0.44 * k);
    addEuler(R, CW_B.lFore, -0.32 * k, 0, 0);
    addEuler(R, CW_B.rFore, -0.32 * k, 0, 0);
  }
  out.glow = 1 + 0.1 * Math.sin(I.time * 2);
  I.clip = 'stop';
  return true;
}

// 力竭残废移动动画：练深蹲把腿练废，双膝打颤发软、弯腰驼背一瘸一拐拖着大脚挪步
function cowExhaustWalkPose(R, I, out, rig, resetPose) {
  if (rig.count <= CW_B.head) return false;
  resetPose(R);
  const t = I.time,
    ph = t * 4.4,
    limp = Math.sin(ph),
    limp2 = Math.cos(ph),
    // 高频腿软抖动
    shakeL = Math.sin(t * 29) * 0.09,
    shakeR = Math.cos(t * 27 + 0.8) * 0.09,
    stepL = Math.max(0, limp),
    stepR = Math.max(0, -limp);
  // 重心塌低、剧烈左右歪斜一瘸一拐
  R.t[CW_B.pelvis * 3 + 1] -= 0.42 + 0.14 * Math.abs(limp2) + 0.08 * stepR;
  R.t[CW_B.pelvis * 3] += limp * 0.14;
  setEuler(R, CW_B.pelvis, 0.34 + 0.08 * Math.abs(limp), limp * 0.18, limp * 0.22);
  setEuler(R, CW_B.waist, 0.32 + 0.08 * Math.sin(t * 8.8), -limp * 0.12, -limp * 0.08);
  setEuler(R, CW_B.chest, 0.14 + 0.06 * Math.sin(t * 8.8), 0, 0);
  // 耷拉脑袋有气无力乱晃
  setEuler(R, CW_B.head, 0.28 + 0.1 * Math.sin(t * 8.8), limp * 0.14, -limp * 0.16);
  // 左腿半瘫内扣拖行，右腿发软打颤硬撑，双膝全程打弯抖个不停
  setEuler(R, CW_B.lHip, -0.66 - 0.32 * stepL + 0.16 * stepR, -0.14, 0.16 + shakeL * 0.5);
  setEuler(R, CW_B.lKnee, 1.24 + 0.24 * stepL + shakeL, 0, 0);
  setEuler(R, CW_B.lFoot, -0.45 - 0.18 * stepL, 0, 0);
  setEuler(R, CW_B.rHip, -0.52 - 0.22 * stepR + 0.18 * stepL, 0.14, -0.18 + shakeR * 0.5);
  setEuler(R, CW_B.rKnee, 1.05 + 0.42 * stepR + shakeR, 0, 0);
  setEuler(R, CW_B.rFoot, -0.38 - 0.15 * stepR, 0, 0);
  // 双手垂下去扶着发抖的大腿/膝盖，无力摆动
  setEuler(R, CW_B.lArm, -0.65 - 0.18 * stepR, 0, 0.18 + limp * 0.08);
  setEuler(R, CW_B.rArm, -0.65 - 0.18 * stepL, 0, -0.18 + limp * 0.08);
  setEuler(R, CW_B.lFore, -0.25, 0, 0);
  setEuler(R, CW_B.rFore, -0.25, 0, 0);
  out.glow = 0.78;
  I.clip = 'walk';
  return true;
}

// 力竭站立/停下：扶膝喘大气、膝盖打软狂颤
function cowExhaustIdlePose(R, I, out, rig, resetPose) {
  if (rig.count <= CW_B.head) return false;
  resetPose(R);
  const t = I.time,
    pant = Math.sin(t * 6.8),
    shake = Math.sin(t * 27) * 0.075;
  R.t[CW_B.pelvis * 3 + 1] -= 0.44 + 0.05 * pant;
  setEuler(R, CW_B.pelvis, 0.38 + 0.05 * pant, 0, shake * 0.25);
  setEuler(R, CW_B.waist, 0.34 + 0.09 * pant, 0, 0);
  setEuler(R, CW_B.chest, 0.16 + 0.08 * pant, 0, 0);
  setEuler(R, CW_B.head, 0.32 + 0.1 * pant, Math.sin(t * 2.4) * 0.08, 0);
  setEuler(R, CW_B.lHip, -0.72, -0.1, 0.14 + shake * 0.5);
  setEuler(R, CW_B.rHip, -0.72, 0.1, -0.14 - shake * 0.5);
  setEuler(R, CW_B.lKnee, 1.32 + shake, 0, 0);
  setEuler(R, CW_B.rKnee, 1.32 - shake, 0, 0);
  setEuler(R, CW_B.lFoot, -0.54, 0, 0);
  setEuler(R, CW_B.rFoot, -0.54, 0, 0);
  setEuler(R, CW_B.lArm, -0.78 - 0.06 * pant, 0, 0.16);
  setEuler(R, CW_B.rArm, -0.78 - 0.06 * pant, 0, -0.16);
  setEuler(R, CW_B.lFore, -0.32, 0, 0);
  setEuler(R, CW_B.rFore, -0.32, 0, 0);
  out.glow = 0.78;
  I.clip = 'idle';
  return true;
}

function cowFlyKickPose(R, I, out, rig, resetPose) {
  if (rig.count <= CW_B.head) return false;
  resetPose(R);
  const p = Math.max(0, Math.min(1, I.p)),
    ext = Math.sin(Math.min(1, p * 1.45) * Math.PI * 0.5);
  // 身体腾空后仰侧身，右大脚笔直向前猛踹出去，左腿屈膝收起
  R.t[CW_B.pelvis * 3 + 1] += 0.38;
  setEuler(R, CW_B.pelvis, -0.68 * ext, 0.32 * ext, -0.22 * ext);
  setEuler(R, CW_B.chest, -0.18 * ext, -0.24 * ext, 0);
  setEuler(R, CW_B.head, 0.45 * ext, -0.15 * ext, 0);
  setEuler(R, CW_B.rHip, -1.42 * ext, 0, -0.08);
  setEuler(R, CW_B.rKnee, -0.08 * ext, 0, 0);
  setEuler(R, CW_B.rFoot, 0.55 * ext, 0, 0);
  setEuler(R, CW_B.lHip, -0.45 * ext, 0, 0.22);
  setEuler(R, CW_B.lKnee, 1.65 * ext, 0, 0);
  setEuler(R, CW_B.lArm, -0.65, 0, 0.78);
  setEuler(R, CW_B.rArm, 0.55, 0, -0.68);
  out.glow = Math.max(out.glow, 2.0);
  out.tint = Math.max(out.tint, 0.25);
  out.tintColor = 0xff7722;
  return true;
}

function cowStompPose(R, I, out, rig, resetPose) {
  if (rig.count <= CW_B.head) return false;
  resetPose(R);
  const p = Math.max(0, Math.min(1, I.p));
  let lift = 0,
    slam = 0;
  if (p < 0.36) {
    const u = p / 0.36;
    lift = 1 - Math.pow(1 - u, 2);
  } else if (p < 0.56) {
    const u = (p - 0.36) / 0.2;
    lift = 1 - u * u;
    slam = u * u;
  } else {
    const u = (p - 0.56) / 0.44;
    slam = Math.max(0, 1 - u * 1.35);
  }
  // 高抬大右脚再一脚跺穿地板
  R.t[CW_B.pelvis * 3 + 1] += 0.22 * lift - 0.34 * slam;
  setEuler(R, CW_B.pelvis, -0.22 * lift + 0.28 * slam, 0, -0.1 * lift);
  setEuler(R, CW_B.rHip, -1.55 * lift + 0.12 * slam, 0, -0.12 * lift);
  setEuler(R, CW_B.rKnee, 1.35 * lift + 0.22 * slam, 0, 0);
  setEuler(R, CW_B.rFoot, 0.25 * lift - 0.18 * slam, 0, 0);
  setEuler(R, CW_B.lHip, -0.12 * lift - 0.48 * slam, 0, 0.12);
  setEuler(R, CW_B.lKnee, 0.25 * lift + 0.85 * slam, 0, 0);
  setEuler(R, CW_B.lArm, -1.1 * lift + 0.35 * slam, 0, 0.55);
  setEuler(R, CW_B.rArm, -1.1 * lift + 0.35 * slam, 0, -0.55);
  setEuler(R, CW_B.head, -0.25 * lift + 0.2 * slam, 0, 0);
  out.glow = Math.max(out.glow, 1.7 + 0.8 * slam);
  return true;
}

function cowStridePose(R, I, out, rig, resetPose) {
  if (rig.count <= CW_B.head) return false;
  resetPose(R);
  const p = Math.max(0, Math.min(1, I.p)),
    arc = Math.sin(p * Math.PI);
  R.t[CW_B.pelvis * 3 + 1] += 0.28 * arc;
  setEuler(R, CW_B.pelvis, 0.18 * arc, 0, 0);
  setEuler(R, CW_B.lHip, -1.35 * arc, 0, 0.1);
  setEuler(R, CW_B.lKnee, 1.15 * arc, 0, 0);
  setEuler(R, CW_B.rHip, 0.85 * arc, 0, -0.1);
  setEuler(R, CW_B.rKnee, 0.45 * arc, 0, 0);
  setEuler(R, CW_B.lArm, 0.65 * arc, 0, 0.35);
  setEuler(R, CW_B.rArm, -0.85 * arc, 0, -0.35);
  out.glow = Math.max(out.glow, 1.45);
  return true;
}

registerSpecialPose('cow', {
  override(R, I, out, rig, resetPose) {
    if (I.mode & 1048576) {
      return cowFlyKickPose(R, I, out, rig, resetPose);
    }
    if (I.anim === 'cast_ult') {
      return cowStompPose(R, I, out, rig, resetPose);
    }
    if (I.mode & 2097152) {
      return cowStridePose(R, I, out, rig, resetPose);
    }
    if ((I.mode & 524288) && I.anim !== 'leap') {
      return cowSquatPose(R, I, out, rig, resetPose);
    }
    if (I.mode & 4194304) {
      if (I.anim === 'move' || I.anim === 'run') {
        return cowExhaustWalkPose(R, I, out, rig, resetPose);
      }
      if (I.anim === 'idle' || I.anim === 'stop') {
        return cowExhaustIdlePose(R, I, out, rig, resetPose);
      }
    }
    if (I.anim === 'stop' || (I.anim === 'idle' && I.stopT >= 0 && I.stopT < 0.62)) {
      return cowStopPose(R, I, out, rig, resetPose);
    }
    return false;
  },
  post(R, I, out) {
    if (I.mode & 262144) {
      out.glow = Math.max(out.glow, 1.7 + 0.25 * Math.sin(I.time * 8));
      out.tint = Math.max(out.tint, 0.16);
      out.tintColor = 0xff8830;
    }
  },
});

// 轮椅大圣（monkey）：大招铁棍横扫、二技能甩棍插地、开大翘车头，以及击杀永久变长棍子的视觉缩放
const MK_B = {
  chair: 1,
  wheelL: 32,
  wheelR: 48,
  pelvis: 74,
  tail0: 85,
  tail1: 87,
  tail2: 89,
  tail3: 91,
  torso: 93,
  head: 99,
  lSh: 123,
  lElb: 125,
  lHand: 127,
  lStick: 134,
  rSh: 140,
  rElb: 142,
  rHand: 144,
  rStick: 151,
};

function monkeyHideBone(R, j) {
  const o = j * 3;
  R.s[o] = 0.001;
  R.s[o + 1] = 0.001;
  R.s[o + 2] = 0.001;
}

function monkeyBasicAttackPose(R, I, out, rig, resetPose) {
  if (rig.count <= MK_B.rStick) return false;
  resetPose(R);
  const p = Math.max(0, Math.min(1, I.p)),
    alt = (I.variant & 1) !== 0;
  let lift = 0,
    chop = 0;
  if (p < 0.26) {
    const u = p / 0.26;
    lift = 1 - Math.pow(1 - u, 2);
  } else if (p < 0.52) {
    const u = (p - 0.26) / 0.26,
      e = 1 - Math.pow(1 - u, 3);
    lift = 1 - e;
    chop = e;
  } else if (p < 0.66) {
    chop = 1;
  } else {
    const u = (p - 0.66) / 0.34;
    chop = 1 - u * u * (3 - 2 * u);
  }
  const rest = Math.max(0, 1 - lift - chop),
    active = Math.sin(p * Math.PI);
  // 轮椅顺势微仰再前压，身体前倾发力把金箍棒直直向前劈下去
  addEuler(R, MK_B.chair, -0.05 * lift + 0.08 * chop, 0, 0);
  addEuler(R, MK_B.torso, -0.14 * lift + 0.28 * chop, -0.22 * lift + (alt ? 0.34 : 0.16) * chop, 0);
  addEuler(R, MK_B.head, 0.08 * lift - 0.14 * chop, 0.12 * lift - 0.12 * chop, 0);
  // 右手蓄力抬到前上方，紧接着向前下方狠劈，全程棍尖在身前绝不甩到天上
  const shX = 0.62 * lift + 1.52 * chop + 1.38 * rest,
    shY = -0.16 * lift + (alt ? 0.38 : 0.18) * chop,
    shZ = 0.18 * lift - 0.08 * chop;
  setEuler(R, MK_B.rSh, shX, shY, shZ);
  setEuler(R, MK_B.rElb, 0.26 * lift + 0.08 * chop + 0.12 * rest, 0, 0);
  setEuler(R, MK_B.rHand, 0, 0, 0);
  setEuler(R, MK_B.rStick, 0.18 * lift + 0.36 * chop + 0.25 * rest, 0, 0);
  // 左手扶稳轮椅扶手压住重心
  addEuler(R, MK_B.lSh, -0.22 * active, 0, 0.28 * active);
  addEuler(R, MK_B.lElb, -0.35 * active, 0, 0);
  addEuler(R, MK_B.tail0, 0.22 * chop - 0.12 * lift, 0, 0);
  out.glow = Math.max(out.glow, 1 + 1.1 * active);
  I.clip = 'attack';
  return true;
}

function monkeyUltSweepPose(R, I, out, rig, resetPose) {
  if (rig.count <= MK_B.rStick) return false;
  resetPose(R);
  const p = Math.max(0, Math.min(1, I.p)),
    dir = (I.variant & 1) ? -1 : 1;
  let yaw = 0,
    fwd = 0;
  if (p < 0.26) {
    const u = p / 0.26,
      e = 1 - Math.pow(1 - u, 2);
    yaw = -dir * 1.05 * e;
    fwd = -0.1 * e;
  } else if (p < 0.62) {
    const u = (p - 0.26) / 0.36,
      e = 1 - Math.pow(1 - u, 3);
    yaw = dir * (-1.05 + 2.25 * e);
    fwd = 0.28 * Math.sin(u * Math.PI);
  } else {
    const u = (p - 0.62) / 0.38,
      e = u * u * (3 - 2 * u);
    yaw = dir * 1.2 * (1 - e);
    fwd = 0.06 * (1 - e);
  }
  const active = Math.sin(Math.min(1, p) * Math.PI);
  addEuler(R, MK_B.chair, 0.1 * Math.max(0, fwd), 0, 0);
  addEuler(R, MK_B.wheelL, 0.85 * p, 0, 0);
  addEuler(R, MK_B.wheelR, 0.85 * p, 0, 0);
  addEuler(R, MK_B.torso, 0.2 * active + fwd * 0.3, yaw * 0.72, -dir * 0.08 * active);
  addEuler(R, MK_B.head, -0.12 * active, -yaw * 0.3, 0);
  // 右手平举前伸，大开大合横向抡扫正前方扇面
  setEuler(R, MK_B.rSh, 1.48, yaw * 0.55, -0.15 * active);
  setEuler(R, MK_B.rElb, 0.12, 0, 0);
  setEuler(R, MK_B.rHand, 0, 0, 0);
  setEuler(R, MK_B.rStick, 0.15, 0, yaw * 0.22);
  addEuler(R, MK_B.lSh, -0.35 * active, -yaw * 0.25, 0.42 * active);
  addEuler(R, MK_B.lElb, -0.55 * active, 0, 0);
  addEuler(R, MK_B.tail0, 0.25 * active, -yaw * 0.45, 0);
  out.glow = Math.max(out.glow, 1.9 + 1.15 * active);
  out.tint = Math.max(out.tint, 0.24 * active);
  out.tintColor = 0xffc638;
  I.clip = 'attack';
  return true;
}

function monkeyStickThrowPose(R, I, out, rig, resetPose) {
  if (rig.count <= MK_B.rStick) return false;
  resetPose(R);
  const p = Math.max(0, Math.min(1, I.p));
  let wind = 0,
    fling = 0;
  if (p < 0.34) {
    const u = p / 0.34;
    wind = 1 - Math.pow(1 - u, 2);
  } else if (p < 0.68) {
    const u = (p - 0.34) / 0.34;
    wind = 1 - u;
    fling = 1 - Math.pow(1 - u, 3);
  } else {
    const u = (p - 0.68) / 0.32;
    fling = 1 - u * u;
  }
  // 蓄力后仰掏出金箍棒高举，再狠狠朝前甩出
  addEuler(R, MK_B.chair, -0.14 * wind + 0.16 * fling, 0, 0);
  addEuler(R, MK_B.torso, -0.24 * wind + 0.36 * fling, -0.52 * wind + 0.62 * fling, 0);
  addEuler(R, MK_B.head, 0.12 * wind - 0.14 * fling, 0.28 * wind - 0.28 * fling, 0);
  addEuler(R, MK_B.rSh, -2.15 * wind - 1.38 * fling, -0.25 * wind + 0.35 * fling, -0.35 * wind);
  addEuler(R, MK_B.rElb, -0.95 * wind - 0.15 * fling, 0, 0);
  addEuler(R, MK_B.rStick, -0.35 * wind + 0.95 * fling, 0, 0);
  addEuler(R, MK_B.lSh, 0.25 * wind - 0.35 * fling, 0, 0.28);
  addEuler(R, MK_B.lElb, -0.45, 0, 0);
  out.glow = Math.max(out.glow, 1.55 + 0.95 * Math.sin(p * Math.PI));
  I.clip = 'attackR';
  return true;
}

function monkeyUltWheeliePose(R, I, out, rig, resetPose) {
  if (rig.count <= MK_B.rStick) return false;
  resetPose(R);
  const p = Math.max(0, Math.min(1, I.p)),
    arc = Math.sin(p * Math.PI);
  // 翘轮椅车头、轮子猛转、右手单举变长金箍棒冲天进入铁棍修行
  R.t[MK_B.chair * 3 + 1] += 0.24 * arc;
  addEuler(R, MK_B.chair, -0.42 * arc, 0, 0);
  addEuler(R, MK_B.wheelL, p * 5.2, 0, 0);
  addEuler(R, MK_B.wheelR, p * 5.2, 0, 0);
  addEuler(R, MK_B.torso, -0.18 * arc, 0, 0);
  addEuler(R, MK_B.head, -0.28 * arc, 0, 0);
  addEuler(R, MK_B.lSh, -0.85 * arc, 0, 0.52 * arc);
  addEuler(R, MK_B.lElb, -0.8 * arc, 0, 0);
  addEuler(R, MK_B.rSh, -2.42 * arc, 0, -0.32 * arc);
  addEuler(R, MK_B.rElb, -0.28 * arc, 0, 0);
  addEuler(R, MK_B.tail0, 0.45 * arc, 0, 0);
  addEuler(R, MK_B.tail1, 0.35 * arc, 0, 0);
  out.glow = Math.max(out.glow, 2.1 + 0.9 * arc);
  out.tint = Math.max(out.tint, 0.28 * arc);
  out.tintColor = 0xffc638;
  I.clip = 'chant';
  return true;
}

registerSpecialPose('monkey', {
  pickAttackClip(I, pick) {
    // 只有右手一根金箍棒，普攻一律走右手挥棍片段
    return pick('attackR', 'attack');
  },
  override(R, I, out, rig, resetPose) {
    if (I.anim === 'cast_ult') {
      return monkeyUltWheeliePose(R, I, out, rig, resetPose);
    }
    if (I.anim === 'cast_s2') {
      return monkeyStickThrowPose(R, I, out, rig, resetPose);
    }
    if (I.anim === 'attack' || I.anim === 'attack2') {
      return (I.mode & 16777216)
        ? monkeyUltSweepPose(R, I, out, rig, resetPose)
        : monkeyBasicAttackPose(R, I, out, rig, resetPose);
    }
    return false;
  },
  always(R, I, out, rig) {
    if (rig.count <= MK_B.rStick) return;
    // 眩晕/滞空/死亡等非攻击状态一律收起金箍棒
    monkeyHideBone(R, MK_B.lStick);
    monkeyHideBone(R, MK_B.rStick);
  },
  post(R, I, out, rig) {
    if (rig.count <= MK_B.rStick) return;
    // 只有一根金箍棒：左手棍子永远隐藏
    monkeyHideBone(R, MK_B.lStick);

    const bonus = Math.max(0, I.stickBonus || 0),
      inUlt = !!(I.mode & 16777216),
      eating = !!(I.mode & 67108864),
      p = Math.max(0, Math.min(1, I.p || 0)),
      isAttack = I.anim === 'attack' || I.anim === 'attack2',
      isThrow = I.anim === 'cast_s2' && p <= 0.44,
      isUltCast = I.anim === 'cast_ult',
      showStick = isAttack || isThrow || isUltCast;

    if (showStick) {
      // 攻击/甩棍/开大时才掏出这根金箍棒，动作头尾顺滑伸缩收放
      const popIn = Math.min(1, p / 0.12),
        popOut = isThrow ? 1 : p > 0.88 ? Math.max(0.001, (1 - p) / 0.12) : 1,
        vis = Math.max(0.001, popIn * popOut),
        yScale = (1 + bonus * 0.38 + (inUlt ? 0.36 : 0)) * vis,
        xzScale = (1 + Math.min(0.55, bonus * 0.06) + (inUlt ? 0.16 : 0)) * vis,
        ro = MK_B.rStick * 3;
      R.s[ro] *= xzScale;
      R.s[ro + 1] *= yScale;
      R.s[ro + 2] *= xzScale;
    } else {
      monkeyHideBone(R, MK_B.rStick);
    }

    // 被动吃香蕉（1秒）：前 0.72 秒左手举香蕉到嘴边大口啃，后 0.28 秒顺手往轮椅底下甩香蕉皮
    if (eating && !isAttack && I.anim !== 'cast_s2' && !isUltCast) {
      const u = Math.max(0, Math.min(1, I.eatP || 0));
      if (u < 0.72) {
        const bIn = Math.min(1, u / 0.14),
          chomp = Math.sin(u * Math.PI * 10);
        setEuler(R, MK_B.lSh, -1.62 * bIn + 0.16 * chomp, 0.36 * bIn, -0.3 * bIn);
        setEuler(R, MK_B.lElb, -1.42 * bIn + 0.22 * chomp, 0, 0);
        addEuler(R, MK_B.head, -0.2 * bIn + 0.2 * chomp, 0.15 * bIn, 0.05 * chomp);
        addEuler(R, MK_B.torso, -0.1 * bIn, 0.08 * bIn, 0);
      } else {
        const tu = (u - 0.72) / 0.28,
          toss = Math.sin(tu * Math.PI),
          fade = tu > 0.78 ? Math.max(0, (1 - tu) / 0.22) : 1;
        setEuler(
          R,
          MK_B.lSh,
          (-1.62 * (1 - tu) + 0.58 * toss) * fade,
          (0.36 - 0.88 * tu) * fade,
          0.92 * toss * fade,
        );
        setEuler(R, MK_B.lElb, (-1.42 * (1 - tu) - 0.15 * toss) * fade, 0, 0);
        addEuler(R, MK_B.head, 0.22 * toss, 0.3 * toss, 0);
      }
      out.glow = Math.max(out.glow, 1.35 + 0.22 * Math.sin(u * Math.PI * 6));
    }

    if (inUlt) {
      out.glow = Math.max(out.glow, 1.85 + 0.28 * Math.sin(I.time * 8.5));
      out.tint = Math.max(out.tint, 0.18);
      out.tintColor = 0xffb830;
    }
  },
});

export { evalChainFK, solveArmIK, setEuler, setQ, setId };
