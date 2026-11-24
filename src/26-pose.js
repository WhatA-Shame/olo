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

export { clamp01, smooth, lerp };
