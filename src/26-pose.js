// 程序化动作库：劈砍 / 旋身 / 咏唱。
//
// 为什么不用片段：外部 Tripo 骨架只带了 5 段动画（run / box_03 / chop / dance_05 / defeat_03）。
// 实测 `chop` 是**水平横扫**（斧尖在前后方向扫 1.8 米、柄全程与竖直夹角 64°~104° 即接近水平），
// 拿它当"举过头顶劈下来"根本不是一回事；`dance_05` 是跳舞，也不是抡斧转圈。
// 所以这些动作只能自己摆。
//
// 骨骼局部轴约定（两套 Tripo 骨架一致，用 bindWQ 实测过）：
//   手臂三根骨（上臂 / 前臂 / 手）的局部 **Z ≈ 世界正前方**，局部 **Y = 沿骨骼方向**，
//   局部 **X = 竖直平面内垂直于骨骼**。
//   → 绕 X 转 = 把手臂在「前—下」这个竖直平面里抡（正角度把手臂抬向前上方）
//   → 绕 Z 转 = 手臂上下侧抬（armsDown 用的就是这根轴）
//   手的局部 Z 是**握孔**（斧柄 / 剑柄方向），绕手的 X 转 = 把武器在竖直平面里翻。
// 根骨骼的局部 Z = 世界竖直向上（bindQ = Rx(-90°)），所以 `pre(root, 0, ang, 0)` 是绕竖直轴转。

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smooth = (v) => {
  const t = clamp01(v);
  return t * t * (3 - 2 * t);
};
const lerp = (a, b, t) => a + (b - a) * t;

// ── 劈砍：举过头顶 → 砸下来 ────────────────────────────────
// p = 动作进度 0~1（引擎给的 I.p）。0~0.42 蓄力抬斧，0.42~0.62 下劈（快），之后保持到底姿势，
// 状态切走时由引擎的 blend 混回待机。
// 调用前 R 上必须已经铺好待机底子（rest + armsDown），这里只往上叠旋转。
//
// 手腕角度不手调：柄与竖直的夹角 ≈ `tilt0 - (上臂X + 前臂X + 手腕X)`（实测 牛伟 tilt0≈3°），
// 所以直接给"想要的柄倾角"，反解出手腕要转多少。手调那几个数会跟手臂角度互相打架。
export function chopPose(R, J, p, o = {}) {
  const lift = o.lift ?? 150, // 上臂举到多高（绕局部 X，正=前上方）
    hit = o.hit ?? 28, // 砍到底时上臂的角度
    elbow = o.elbow ?? 52, // 蓄力时屈肘（负值=往脑后折）
    tiltUp = o.tiltUp ?? -18, // 蓄力时柄与竖直的夹角（0=竖直向上，负=后仰）
    tiltDown = o.tiltDown ?? 100, // 砍到底时柄的夹角（90=水平朝前，越大越往下）
    tilt0 = o.tilt0 ?? 3, // 这套骨架待机时柄的固有倾角
    yaw = o.yaw ?? 0, // 砍到底时手腕绕局部 Y 的偏航（把武器从"甩到身侧"收到"身前"）
    lean = o.lean ?? 18, // 砸下去时躯干前倾
    twist = o.twist ?? 12; // 躯干拧转（蓄力往右、下劈转正）
  const up = smooth(p / 0.42),
    down = smooth((p - 0.42) / 0.26),
    w = up * (1 - down), // 举着（蓄力）
    s = down; // 砸下去（冲击）
  const upperX = lift * w + hit * s,
    foreX = -elbow * w - 8 * s,
    tiltWant = lerp(lerp(tilt0, tiltUp, w), tiltDown, s),
    handX = tilt0 - tiltWant - (upperX + foreX);
  R.add(J.upperR, upperX, 0, 0);
  R.add(J.foreR, foreX, 0, 0);
  R.add(J.handR, handX, yaw * s, 0);
  R.add(J.chest, 7 * w - lean * s, -twist * w + twist * 0.6 * s, 0);
  R.add(J.head, -3 * w + 9 * s, twist * 0.5 * w - twist * 0.4 * s, 0);
  R.add(J.upperL, -14 * w + 10 * s, 0, 0); // 左手跟着甩一点，别像断了
  R.move(J.root, 0, -0.07 * s, 0.04 * s); // 砸下去重心沉一点、往前压
  return R;
}

// ── 旋身：整个人绕竖直轴转，武器甩成一条横线 ──────────────
// time = 已经转了多久（秒），degPerSec = 每秒转多少度。用真实时间驱动，越转越顺、不会卡帧。
// 调用前用 rest() 打底就行（**不要** armsDown）：待机底子把手腕翻了 90°，
// 这里要的是"柄沿手臂朝外"，所以 roll=-90 从 rest 的"柄朝前"翻过去。
export function spinPose(R, J, time, o = {}) {
  const dps = o.dps ?? 700,
    ang = (time * dps) % 360,
    wind = clamp01((o.p ?? 1) / 0.33), // 起手 0.33 秒内把手臂甩开
    armZ = o.armZ ?? -38, // 上臂侧抬（A 姿骨架约 -38° 到水平，T 姿给 0）
    roll = o.roll ?? -90; // 手腕翻 90°：柄从"朝前"转到"沿手臂朝外"
  R.add(J.upperR, 0, 0, armZ * wind);
  R.add(J.upperL, 0, 0, -armZ * 0.8 * wind);
  R.add(J.handR, roll * wind, 0, 0);
  R.add(J.chest, -4 * wind, 0, 0);
  R.add(J.head, -5 * wind, 0, 0);
  R.pre(J.root, 0, ang, 0); // 父空间（= 世界竖直轴）左乘
  return R;
}

// ── 咏唱：站定、举剑、身体微微发颤 ─────────────────────────
// 牛魔的「烈焰行军」是定身 2 秒站着喷，所以用咏唱姿态，不要拿跑步片段顶。
// 底子用 rest()（T 姿）而不是 armsDown：T 姿时上臂的局部 X 轴几乎就是世界竖直方向，
// 绕它转等于把手臂在水平面里往前甩，正好摆出"举剑在身前"的施法姿势。
// 下面这组角度是数值搜出来的（斧尖落在身前 0.75m、比头顶高 0.7m）。
export function chantPose(R, J, time, p, o = {}) {
  const k = smooth(p / 0.18), // 起手 0.18 内进入姿态
    s = Math.sin(time * 13.5),
    c = Math.sin(time * 7.3),
    ax = o.ax ?? 110, // 上臂前甩
    az = o.az ?? -50, // 上臂在水平面里往身前收
    hx = o.hx ?? -80, // 手腕抬起，剑尖朝上前方
    hz = o.hz ?? 40;
  R.add(J.upperR, ax * k, 0, az * k);
  R.add(J.foreR, -10 * k, 0, 0);
  R.add(J.handR, hx * k + s * 1.2 * k, 0, hz * k);
  R.add(J.upperL, ax * 0.62 * k, 0, -az * 0.9 * k); // 左手也抬起来，像在托着
  R.add(J.foreL, -14 * k, 0, 0);
  R.add(J.chest, -6 * k + s * 1.6 * k, c * 1.2 * k, 0);
  R.add(J.head, -4 * k + s * 2.2 * k, 0, 0);
  R.move(J.root, 0, s * 0.012 * k, 0);
  return R;
}

// ── 牛魔专属程序化动作库（Tripo 41 骨标准人形骨架） ──────────────────
// 实测本地轴（世界 +Y=上、+Z=前、+X=角色左）：
// - 躯干 (Pelvis/Waist/Spine01/Spine02/Head)：+X=右（正=后仰挺胸，负=前倾）、+Y=上（正=左转，负=右转）、+Z=后（正=右倾）
// - 下放双臂后 (armsDown)：+X=右（上臂正=前抬，前臂负=自然屈肘）、+Z=前（右上臂负=外展，左上臂正=外展）
// - 大腿/小腿：+X=右（大腿负=前抬，小腿正=后屈膝）、+Z=前（左腿负/右腿正=外展站稳）

export function niumoIdlePose(R, J, time) {
  const b = Math.sin(time * 1.85),
    b2 = Math.sin(time * 0.78);
  // 宽大稳重的魔王架势：重心略沉、双膝微曲外展、微微侧身立定
  R.move(J.root, 0, -0.05 + b * 0.012, 0);
  R.add(J.pelvis, 2, 6, -1.5);
  R.add(J.thighL, -10, 8, -7);
  R.add(J.calfL, 15, 0, 0);
  R.add(J.thighR, -12, -9, 8);
  R.add(J.calfR, 17, 0, 0);
  // 挺胸呼吸：腰脊舒展、胸膛随深呼吸起伏、双肩微向前拢方便双臂环抱
  R.add(J.waist, 2 + b * 0.9, 2, 0.5);
  R.add(J.spine1, 3 + b * 1.2, -3, 0);
  R.add(J.chest, 3 + b * 1.6, -4, 0);
  R.add(J.clavR, 22, 0, -3 - b * 1.2);
  R.add(J.clavL, 22, 0, 3 + b * 1.2);
  // 微微昂首缓扫战场，显威严而非木讷
  R.add(J.head, 4.5 - b * 1.1, -2 + b2 * 5.0, b2 * 1.4);
  // 待机大剑背在身后：双手环抱胸前（右小臂叠在上前方、左小臂压在下侧，双拳收拢）
  R.add(J.upperR, 62 + b * 1.4, 0, -2);
  R.add(J.foreR, 8 - b * 1.0, 0, 72);
  R.add(J.handR, -84, 0, 48);
  R.add(J.upperL, 54 + b * 1.4, 0, 2);
  R.add(J.foreL, -16 - b * 1.0, 0, -70);
  R.add(J.handL, 0, 0, -48);
  return R;
}

// ── 牛魔大幅度两段普攻：大幅蓄力拧腰跨步 + 全身大开大合重劈/反撩 ──
export function niumoAttackPose(R, J, p, variant = 0) {
  const rev = (variant & 1) === 1;
  if (!rev) {
    // 第一刀：大开大合斜劈（深拧腰高举巨剑 → 猛跨步全躯干砸砍拉满跟随）
    const up = smooth(p / 0.42),
      hit = smooth((p - 0.42) / 0.24),
      rec = smooth((p - 0.76) / 0.24),
      w = up * (1 - hit),
      s = hit * (1 - rec * 0.55);
    const upperX = 12 + 158 * w + 4 * s,
      upperZ = -10 - 20 * w + 24 * s,
      foreX = -22 - 44 * w + 12 * s,
      tiltWant = lerp(lerp(18, -34, w), 124, s),
      handX = 3 - tiltWant - (upperX + foreX);
    R.move(J.root, 0, -0.05 - 0.04 * w - 0.1 * s, -0.09 * w + 0.2 * s);
    R.add(J.pelvis, 4 * w - 6 * s, -12 * w + 16 * s, 3 * w - 5 * s);
    R.add(J.thighL, -10 - 6 * w - 18 * s, 8, -8);
    R.add(J.calfL, 15 + 10 * w + 20 * s, 0, 0);
    R.add(J.thighR, -12 + 8 * w + 14 * s, -8, 9);
    R.add(J.calfR, 17 + 8 * w + 8 * s, 0, 0);
    R.add(J.waist, 7 * w - 10 * s, -12 * w + 14 * s, 4 * w - 5 * s);
    R.add(J.spine1, 8 * w - 12 * s, -10 * w + 12 * s, 0);
    R.add(J.chest, 9 * w - 14 * s, -12 * w + 14 * s, 4 * w - 6 * s);
    R.add(J.clavR, 0, -8 * w + 12 * s, -14 * w + 8 * s);
    R.add(J.head, -2 * w + 14 * s, 14 * w - 14 * s, 0);
    R.add(J.upperR, upperX, -14 * w + 10 * s, upperZ);
    R.add(J.foreR, foreX, 0, 0);
    R.add(J.handR, handX, -16 - 58 * s, 6);
    R.add(J.upperL, 14 + 40 * w - 42 * s, 8, 12 + 12 * w + 14 * s);
    R.add(J.foreL, -26 - 20 * w + 12 * s, 0, 0);
    return R;
  }
  // 第二刀：反手大跨步横扫重斩（低身左蓄力 → 凶猛向右上方甩开一整圆）
  const up = smooth(p / 0.4),
    hit = smooth((p - 0.4) / 0.26),
    rec = smooth((p - 0.76) / 0.24),
    w = up * (1 - hit),
    s = hit * (1 - rec * 0.52);
  R.move(J.root, 0, -0.05 - 0.08 * w - 0.05 * s, -0.06 * w + 0.18 * s);
  R.add(J.pelvis, -6 * w + 4 * s, 16 * w - 18 * s, -5 * w + 5 * s);
  R.add(J.thighL, -10 - 14 * w + 6 * s, 8, -8);
  R.add(J.calfL, 16 + 18 * w + 6 * s, 0, 0);
  R.add(J.thighR, -12 + 4 * w - 16 * s, -8, 9);
  R.add(J.calfR, 18 + 8 * w + 20 * s, 0, 0);
  R.add(J.waist, -8 * w + 6 * s, 14 * w - 16 * s, -5 * w + 6 * s);
  R.add(J.spine1, -6 * w + 8 * s, 12 * w - 16 * s, 0);
  R.add(J.chest, -6 * w + 10 * s, 14 * w - 18 * s, -5 * w + 6 * s);
  R.add(J.clavR, 0, 12 * w - 14 * s, 8 * w - 16 * s);
  R.add(J.head, 4 * w - 4 * s, -18 * w + 16 * s, 0);
  R.add(J.upperR, 12 + 48 * w + 108 * s, 26 * w - 28 * s, -10 + 44 * w - 40 * s);
  R.add(J.foreR, -24 - 28 * w + 14 * s, 0, 0);
  R.add(J.handR, 14 - 32 * w - 44 * s, -18 - 44 * w + 56 * s, 6 - 18 * w + 20 * s);
  R.add(J.upperL, 14 - 22 * w + 46 * s, 8, 12 - 6 * w + 24 * s);
  R.add(J.foreL, -28 - 10 * w + 14 * s, 0, 0);
  return R;
}

// ── 开大消耗火焰层数的致命一击：腾跃双手高举过顶 → 裂地断岳重砸 ──
export function niumoExecPose(R, J, p) {
  const up = smooth(p / 0.44),
    hit = smooth((p - 0.44) / 0.2),
    rec = smooth((p - 0.78) / 0.22),
    w = up * (1 - hit),
    s = hit * (1 - rec * 0.45),
    leap = Math.sin(clamp01(p / 0.52) * Math.PI);
  const upperX = 12 + 168 * w - 2 * s,
    foreX = -22 - 28 * w + 12 * s,
    tiltWant = lerp(lerp(16, -42, w), 136, s),
    handX = 3 - tiltWant - (upperX + foreX);
  // 蓄力时纵身微跃、下砸时深蹲猛扑狠压地面
  R.move(J.root, 0, -0.05 + 0.26 * leap * (1 - hit * 0.85) - 0.16 * s, -0.1 * w + 0.26 * s);
  R.add(J.pelvis, 10 * w - 12 * s, -6 * w + 10 * s, 0);
  R.add(J.thighL, -10 - 18 * w - 24 * s, 8, -9);
  R.add(J.calfL, 15 + 24 * w + 32 * s, 0, 0);
  R.add(J.thighR, -12 - 14 * w + 18 * s, -8, 9);
  R.add(J.calfR, 17 + 22 * w + 14 * s, 0, 0);
  // 蓄力极度后仰蓄势咆哮，落剑整个人压下去砸裂地面
  R.add(J.waist, 10 * w - 14 * s, -6 * w + 8 * s, 0);
  R.add(J.spine1, 12 * w - 16 * s, -4 * w + 6 * s, 0);
  R.add(J.chest, 15 * w - 20 * s, -6 * w + 10 * s, 0);
  R.add(J.clavR, 0, 0, -18 * w + 10 * s);
  R.add(J.clavL, 0, 0, 18 * w - 10 * s);
  R.add(J.head, 16 * w + 10 * s, 0, 0);
  // 蓄力阶段双臂齐举过头顶作双手巨剑处决势，劈下时右手砸穿地面、左手猛甩稳身
  R.add(J.upperR, upperX, -8 * w + 8 * s, -10 - 6 * w + 18 * s);
  R.add(J.foreR, foreX, 0, 0);
  R.add(J.handR, handX, -14 - 52 * s, 6);
  R.add(J.upperL, 16 + 152 * w - 46 * s, 10 * w, 12 + 12 * w + 24 * s);
  R.add(J.foreL, -28 - 22 * w + 16 * s, 0, 0);
  return R;
}

// ── 烈焰斩（0.3 秒蓄力前摇 → 直线垂直裂地重劈） ──
export function niumoSlashPose(R, J, p) {
  // cast_s1 总长 0.56s，前摇 0.30s 正好对应 p = 0.535 砸地瞬间
  const up = smooth(p / 0.48),
    hit = smooth((p - 0.48) / 0.14),
    rec = smooth((p - 0.76) / 0.24),
    w = up * (1 - hit),
    s = hit * (1 - rec * 0.48);
  const upperX = 12 + 162 * w + 2 * s,
    foreX = -22 - 38 * w + 10 * s,
    tiltWant = lerp(lerp(16, -36, w), 126, s),
    handX = 3 - tiltWant - (upperX + foreX);
  R.move(J.root, 0, -0.05 - 0.06 * w - 0.14 * s, -0.08 * w + 0.2 * s);
  R.add(J.pelvis, 6 * w - 9 * s, -8 * w + 10 * s, 0);
  R.add(J.thighL, -10 - 6 * w - 22 * s, 8, -8);
  R.add(J.calfL, 15 + 12 * w + 28 * s, 0, 0);
  R.add(J.thighR, -12 + 4 * w + 16 * s, -8, 9);
  R.add(J.calfR, 17 + 10 * w + 12 * s, 0, 0);
  R.add(J.waist, 8 * w - 12 * s, -8 * w + 8 * s, 0);
  R.add(J.spine1, 9 * w - 13 * s, -6 * w + 6 * s, 0);
  R.add(J.chest, 10 * w - 15 * s, -8 * w + 10 * s, 0);
  R.add(J.clavR, 0, 0, -16 * w + 8 * s);
  R.add(J.head, 6 * w + 12 * s, 6 * w - 6 * s, 0);
  R.add(J.upperR, upperX, -6 * w + 6 * s, -10 - 10 * w + 16 * s);
  R.add(J.foreR, foreX, 0, 0);
  R.add(J.handR, handX, -14 - 46 * s, 6);
  R.add(J.upperL, 16 + 52 * w - 36 * s, 8, 12 + 14 * w + 16 * s);
  R.add(J.foreL, -28 - 18 * w + 10 * s, 0, 0);
  return R;
}

// ── 烈焰行军（大剑立于胸前、双拳紧护剑身、无畏重步顶进喷火） ──
export function niumoMarchPose(R, J, time, p) {
  const k = smooth(p / 0.14),
    stride = Math.sin(time * 5.8),
    bob = Math.abs(Math.cos(time * 5.8)),
    trem = Math.sin(time * 16) * 1.2;
  R.move(J.root, 0, (-0.06 - 0.03 * (1 - bob)) * k, 0.08 * k);
  R.add(J.pelvis, -5 * k, stride * 6 * k, -stride * 2.5 * k);
  R.add(J.thighL, (-10 + stride * 26) * k, 6 * k, -7 * k);
  R.add(J.calfL, (16 + Math.max(0, -stride) * 26) * k, 0, 0);
  R.add(J.thighR, (-10 - stride * 26) * k, -6 * k, 7 * k);
  R.add(J.calfR, (16 + Math.max(0, stride) * 26) * k, 0, 0);
  R.add(J.waist, -4 * k, -stride * 3.5 * k, 0);
  R.add(J.spine1, -3 * k, 0, 0);
  R.add(J.chest, (-4 + trem * 0.6) * k, -stride * 2.5 * k, 0);
  R.add(J.clavR, 0, 10 * k, 6 * k);
  R.add(J.clavL, 0, -10 * k, -6 * k);
  R.add(J.head, (6 + trem * 0.8) * k, 0, 0);
  // 双臂向胸前合拢屈肘，双拳上下紧握并抵住胸前竖立的火红大剑，无畏前推喷火
  R.add(J.upperR, (52 + trem * 0.6) * k, 24 * k, 32 * k);
  R.add(J.foreR, -62 * k, 18 * k, 0);
  R.add(J.handR, -10 * k, -12 * k, 6 * k);
  R.add(J.upperL, (58 + trem * 0.6) * k, -24 * k, -32 * k);
  R.add(J.foreL, -64 * k, -18 * k, 0);
  R.add(J.handL, 8 * k, 14 * k, -8 * k);
  return R;
}

// ── 烈焰牛魔变身咆哮：沉腰蓄势后昂首扩胸举剑怒吼 ──
export function niumoUltPose(R, J, time, p) {
  const k = smooth(p / 0.28),
    b = Math.sin(time * 12) * 1.8;
  R.move(J.root, 0, -0.09 * k, 0);
  R.add(J.pelvis, 4 * k, 0, 0);
  R.add(J.thighL, -16 * k, 10 * k, -10 * k);
  R.add(J.calfL, 24 * k, 0, 0);
  R.add(J.thighR, -16 * k, -10 * k, 10 * k);
  R.add(J.calfR, 24 * k, 0, 0);
  R.add(J.waist, 8 * k, 0, 0);
  R.add(J.spine1, 10 * k + b * 0.5, 0, 0);
  R.add(J.chest, 14 * k + b, 0, 0);
  R.add(J.clavR, 0, 0, -14 * k);
  R.add(J.clavL, 0, 0, 14 * k);
  R.add(J.head, 18 * k + b, 0, 0);
  R.add(J.upperR, 38 * k, -18 * k, -52 * k);
  R.add(J.foreR, -26 * k, 0, 0);
  R.add(J.handR, -16 * k, -12 * k, 0);
  R.add(J.upperL, 28 * k, 18 * k, 52 * k);
  R.add(J.foreL, -34 * k, 0, 0);
  return R;
}

export { clamp01, smooth, lerp };
