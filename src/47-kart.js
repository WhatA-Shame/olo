// 47-kart.js —— 「搞怪卡丁车」原版角色模型接入
//
// 模型来自那个项目的 src/core/entities/*.ts（每个角色一个类，用 three 图元现场拼），
// 由它的 glbExporter 导出成 GLB（带动作），再用 tools/glb2kart.mjs 转成
// dist/kart/<id>.bin —— 一个量化过的自描述数据块，由 47-kart-decode.js 解回来。
//
// 为什么是运行时 fetch 而不是打进 bundle：
//   20 个角色加起来 16MB，全打进来会让首页从 6.5MB 涨到 22MB。只有玩家选的那个
//   角色需要加载，所以进对局前按需拉一次（200KB~1MB），加载完再登记进模型表。
//
// 骨架约定：原版模型的"零件 = three 的 node"，节点层级直接当骨架用，
// 每个零件的顶点刚性绑到自己那根骨（权重 1）。所以这里不需要重算权重，也不会撕裂。
import { Ls } from './26-core-5.js';
import { Vs } from './05-three.js';
import { K } from './25-render-9.js';
import { registerModel } from './31-render-10.js';
import { kartDecode } from './47-kart-decode.js';

// id 就是 .bin 文件名；name 用项目里的原名（"原版"就该原样）
// kit = 借哪个英雄的技能包（技能逻辑按 heroId 注册，这里只换外观）
export const KART_SPECS = [
  { id: 'frog', name: '丑黄蛤蟆', kit: 'yeque' },
  { id: 'mannequin', name: '跑步假人', kit: 'chijin' },
  { id: 'boxman', name: '多脚纸箱', kit: 'panyue' },
  { id: 'scallion', name: '葱仔仔', kit: 'fengling' },
  { id: 'maggot', name: '白色大肥蛆', kit: 'mushroom' },
  { id: 'slime', name: '黄色史莱姆', kit: 'mushroom' },
  { id: 'monkey', name: '轮椅大圣', kit: 'chijin' },
  { id: 'mushroom', name: '杯杯菇', kit: 'mushroom' },
  { id: 'cow', name: '大脚牛', kit: 'niumo' },
  { id: 'stone', name: '小肥石', kit: 'panyue' },
  { id: 'kangaroo', name: '袋鼠单王', kit: 'yeque' },
  { id: 'magnet', name: '智慧磁铁', kit: 'xingli' },
  { id: 'boxtree', name: '雪松老师', kit: 'xingli' },
  { id: 'bighead', name: '漂浮大脑袋', kit: 'fengling' },
  { id: 'girlhead', name: '漂浮女脑袋', kit: 'fengling' },
  { id: 'horseman', name: '半马人', kit: 'chijin' },
  { id: 'skeleton', name: '暴走骷髅', kit: 'yeque' },
  { id: 'coconut', name: '椰子保龄球', kit: 'panyue' },
  { id: 'panda', name: '熊猫警察', kit: 'niumo' },
  { id: 'bear', name: '狗熊警官', kit: 'niumo' },
];

export const KART_IDS = KART_SPECS.map((s) => s.id);
const BY_ID = new Map(KART_SPECS.map((s) => [s.id, s]));
export function kartSpec(id) {
  return (id && BY_ID.get(id)) || null;
}

const DATA = new Map();

// 立绘/头像的画布尺寸：竖版。选将卡、加载卡都是竖的（约 10:13），
// 方图被 object-fit:cover 裁掉两侧会把蛤蟆裁成一条。3D 渲染仍是方图，合成时按宽度居中放。
export const ART_W = 320,
  ART_H = 416;

// 尺寸：渲染器会按 def.height 把模型归一化到 Np=[3.05,3.55] 的"显示高度"——
// 也就是说最终身高只取决于 height 这个声明值（scale 会被 clamp 约掉），
// 所以 height 不能填真实几何高度，得填"希望它多高"的倒数关系：
//   rendered = 3.05 / declaredHeight   （declaredHeight = 3.05/k，k 是想要的几何缩放）
// 不这么干的话，一只趴着的蛤蟆会被按身高拉满，横向铺成 8 米多宽。
const MAX_H = 3.15; // 别比普通英雄高
const MAX_W = 2.8; // 也别比普通英雄宽太多（横向是这批模型最容易失控的轴）
const MAX_K = 1.6;

function playClip(R, clip, time, loop, N) {
  if (!clip) return;
  const span = clip.dur || 1;
  const fpos = loop
    ? ((time % span) / span) * (clip.frames - 1)
    : Math.min(clip.frames - 1, (time / span) * (clip.frames - 1));
  const f0 = Math.floor(fpos),
    f1 = Math.min(clip.frames - 1, f0 + 1),
    w = fpos - f0,
    d = clip.data;
  for (let j = 0; j < N; j++) {
    const o0 = (f0 * N + j) * 10,
      o1 = (f1 * N + j) * 10,
      p3 = j * 3,
      p4 = j * 4;
    R.t[p3] = d[o0] + (d[o1] - d[o0]) * w;
    R.t[p3 + 1] = d[o0 + 1] + (d[o1 + 1] - d[o0 + 1]) * w;
    R.t[p3 + 2] = d[o0 + 2] + (d[o1 + 2] - d[o0 + 2]) * w;
    const x = d[o0 + 3] + (d[o1 + 3] - d[o0 + 3]) * w,
      y = d[o0 + 4] + (d[o1 + 4] - d[o0 + 4]) * w,
      z = d[o0 + 5] + (d[o1 + 5] - d[o0 + 5]) * w,
      ww = d[o0 + 6] + (d[o1 + 6] - d[o0 + 6]) * w,
      l = Math.hypot(x, y, z, ww) || 1;
    R.q[p4] = x / l;
    R.q[p4 + 1] = y / l;
    R.q[p4 + 2] = z / l;
    R.q[p4 + 3] = ww / l;
    // 原版动作的挤扁/拉长在节点 scale 上，而且是**三轴独立**的
    //（压扁同时横向变宽，轴向差中位 1.26、最大 13 倍）——
    // 只留一个标量会把这种形变抹成几何平均，动作就"不会形变"了。
    for (let k = 0; k < 3; k++)
      R.s[j * 3 + k] = d[o0 + 7 + k] + (d[o1 + 7 + k] - d[o0 + 7 + k]) * w;
  }
}

// 材质风格。?gloss=1 是 A/B 开关：把上一版"打蜡"的样子还原出来做对比
//（gloss 会乘上默认的 uSpec 0.9 变成高光强度，而 cloth 类别的高光是硬边的）。
const GLOSSY = /[?&]gloss=1/.test(typeof location === 'undefined' ? '' : location.search);

// 把解码出来的数据做成一个英雄模型定义（和 bNm/bBg 那些返回同一种结构）
function kartDef(id) {
  const d = DATA.get(id);
  if (!d) throw new Error(`角色模型没加载: ${id}`);
  const HR = d.rig,
    N = HR.names.length;

  // 骨架：外部骨架直接当 rig 用，local 存父坐标系下的位移（solve 用）。
  // 两种顶点空间：
  //   · 纯节点动画（大多数）：顶点预变换到骨骼局部空间，蒙皮退化成 wp + R(wq)·S(s)·v_local
  //   · 带蒙皮网格（大肥蛆/杯杯菇/大脚牛…）：顶点必须留在**绑定世界空间**，
  //     否则同一根骨的两个权重没法共用一份顶点坐标 —— 这是 LBS 的硬性要求
  const BIND = HR.bindSpace;
  const rig = {
    names: HR.names,
    parent: HR.parent,
    bind: new Float32Array(N * 3),
    localVerts: !BIND,
    bindWorld: BIND ? HR.bindWorld : null,
    bindQW: BIND ? HR.bindWQ : null,
    local: HR.localPos,
    chains: [],
    get count() {
      return N;
    },
  };

  const rootJ = Math.max(0, HR.parent.indexOf(-1));

  // 包围盒定缩放：这些模型原点是脚底（minY≈0），所以不用额外落地下移
  const P = d.mesh.pos;
  let minY = Infinity,
    maxY = -Infinity,
    minX = Infinity,
    maxX = -Infinity,
    minZ = Infinity,
    maxZ = -Infinity;
  for (let i = 0; i < P.length; i += 3) {
    if (P[i + 1] < minY) minY = P[i + 1];
    if (P[i + 1] > maxY) maxY = P[i + 1];
    if (P[i] < minX) minX = P[i];
    if (P[i] > maxX) maxX = P[i];
    if (P[i + 2] < minZ) minZ = P[i + 2];
    if (P[i + 2] > maxZ) maxZ = P[i + 2];
  }
  const rawH = Math.max(0.2, maxY - minY),
    rawW = Math.max(0.2, Math.max(maxX - minX, maxZ - minZ));
  // k = 几何最终缩放；height 声明成 3.05/k，渲染器算出来就是 k
  const k = Math.min(MAX_H / rawH, MAX_W / rawW, MAX_K);

  // 纯节点动画的模型：顶点从"绑定世界空间"搬到各自骨骼的局部空间
  // v_local = R(bindQW[j])⁻¹ · (v_bind − bindWorld[j])。
  // 好处有两个：
  //   ① pack() 不用再减 bindWorld，蒙皮退化成 wp + R(wq)·S(s)·v_local，少一次矩阵折返；
  //   ② 三轴缩放正好作用在**骨骼自己的轴**上 —— 原版 node.scale 就是这个语义。
  // 每个顶点只绑一根骨（权重 1），所以这个"逐顶点反解"是精确的，不是近似。
  // 有蒙皮顶点的模型不能搬：同一根骨下不同权重的顶点得共用一份绑定世界坐标。
  const mesh = {
      pos: new Float32Array(d.mesh.pos),
      nor: new Float32Array(d.mesh.nor),
      uv: d.mesh.uv,
      col: d.mesh.col,
      idx: d.mesh.idx,
      skin: d.mesh.skin,
      // 第三、四根骨（只有真蒙皮网格才有；其余模型全零，走两骨路径）
      skin2: d.mesh.skin2,
    },
    BW = HR.bindWorld,
    BQ = HR.bindWQ,
    o3 = [0, 0, 0];
  if (!BIND)
    for (let v = 0; v < mesh.pos.length / 3; v++) {
      const j = mesh.skin[v * 3],
        qx = -BQ[j * 4],
        qy = -BQ[j * 4 + 1],
        qz = -BQ[j * 4 + 2],
        qw = BQ[j * 4 + 3];
      // 用共轭四元数把世界向量转回骨骼局部（两次旋转，写开省一次函数调用）
      for (let k = 0; k < 2; k++) {
        const src = k === 0 ? mesh.pos : mesh.nor,
          off = k === 0 ? 1 : 0, // 位置要减 bindWorld，法线不用
          x = src[v * 3] - (off ? BW[j * 3] : 0),
          y = src[v * 3 + 1] - (off ? BW[j * 3 + 1] : 0),
          z = src[v * 3 + 2] - (off ? BW[j * 3 + 2] : 0),
          tx = 2 * (qy * z - qz * y),
          ty = 2 * (qz * x - qx * z),
          tz = 2 * (qx * y - qy * x);
        ((o3[0] = x + qw * tx + (qy * tz - qz * ty)),
          (o3[1] = y + qw * ty + (qz * tx - qx * tz)),
          (o3[2] = z + qw * tz + (qx * ty - qy * tx)),
          (src[v * 3] = o3[0]),
          (src[v * 3 + 1] = o3[1]),
          (src[v * 3 + 2] = o3[2]));
      }
    }

  const t = new Ls();
  t.crease = 42;
  t.bone(rootJ);
  // 顶点色只放 baseColorFactor，颜色细节由贴图图集给（.bin 同目录的 .png）。
  // gloss 必须给 0：它是 aFx.x，片元里会乘上 uSpec.x 变成高光强度（默认 0.9），
  // 而材质类别 cloth 的 mp.x 是 0 → 走 `hard = 0.08` 的硬边高光。两者叠起来就是
  // 一块又圆又亮的白斑，整只模型看着像打了蜡 —— 原版是平涂，这里要哑光。
  t.rawMesh(mesh, { mat: K.cloth, gloss: GLOSSY ? 0.34 : 0, ao: 1, line: 1 });
  const geometry = t.build();

  // 贴图：占位图必须和真实图集同尺寸（three 的 texStorage2D 是不可变存储，
  // 尺寸对不上之后换图只会走 texSubImage2D，整张被丢弃 = 白模）。
  // 占位色取顶点色的均值，解码完成前也不会突兀。
  let map = null;
  if (d.tex && d.tex.w > 0) {
    map = new Vs();
    // glTF 的 UV 原点在左上，three 默认 flipY=true 会把它上下翻过来
    map.flipY = false;
    const c = document.createElement('canvas');
    (c.width = d.tex.w), (c.height = d.tex.h);
    const g = c.getContext('2d'),
      n = mesh.col.length / 3;
    let cr = 0,
      cg = 0,
      cb = 0;
    for (let i = 0; i < n; i++) ((cr += mesh.col[i * 3]), (cg += mesh.col[i * 3 + 1]), (cb += mesh.col[i * 3 + 2]));
    const q = (v) => Math.round(Math.min(255, Math.max(0, Math.sqrt(v / n) * 255))); // 顶点色是线性的，画布要 sRGB
    g.fillStyle = `rgb(${q(cr)},${q(cg)},${q(cb)})`;
    g.fillRect(0, 0, d.tex.w, d.tex.h);
    map.image = c;
    map.needsUpdate = !0;
    if (d.texUrl) {
      const img = new Image();
      img.onload = () => {
        ((map.image = img), (map.needsUpdate = !0));
        // 解码是异步的：先渲染出来的立绘/头像会是占位色，通知界面重画
        globalThis.__sfTextureReady?.();
      };
      img.src = d.texUrl;
    }
  }

  // 二十一段标准动作，一个状态一段，全是原版片段，不叠加任何程序化动作：
  //   idle   → 空着（这批包缺真正的待机，现在叫"待机"的其实是行走，等下一个包补）
  //   move   → 小加速；被减速 → 行走；有加速 buff → 中加速 / 大加速
  //   attack → 普通攻击   attack2 → 右攻击
  //   s1 → 左攻击   s2 → 右攻击   ult/channel → 吟唱
  //   airborne → 滞空   stunned/hit → 眩晕   roll → 失控
  //   dead → 死亡   revive → 复活   stop → 急停   turnL/turnR → 左拐/右拐
  //   emote_* → 嘲讽/笑话/跳舞   胜利 → 庆祝
  // 缺哪段就退回同类的另一段（半马人/椰子保龄球是蒙皮网格，片段可能不全）。
  const A = d.anim,
    pick = (...keys) => {
      for (const k of keys) if (A[k]) return A[k];
      return null;
    };
  // 一次性动作按状态时长铺满整段：片段时间 = p × 片段时长。
  // 写死秒数的话，状态比片段短就会播不完、定在末帧，看着像卡住再弹回去。
  const once = (R, clip, p) =>
      clip && playClip(R, clip, Math.max(0, Math.min(1, p)) * (clip.dur || 1), false, N),
    loop = (R, clip, t) => clip && playClip(R, clip, t, true, N),
    // 按"已经过了多少秒"播一次性动作：急停/转向/表情这三类是引擎按真实秒数驱动的，
    // 用 p 的话会被状态的时长拉伸，动作就不是原速了。超过片长就停在末帧。
    hold = (R, clip, t) => clip && playClip(R, clip, Math.min(clip.dur || 1, Math.max(0, t)), false, N);

  const animate = (R, I, out) => {
    const st = I.anim;
    out.glow = 1;
    // 这一帧实际选了哪段（?dbg=1 时 herocheck 读它验档位）。没标到的分支留 null。
    I.clip = null;
    if (st === 'dead') {
      const c = pick('die');
      if (c) playClip(R, c, Math.min(c.dur || 1, I.t), false, N);
      I.clip = 'die';
      out.glow = Math.max(0.15, 1 - I.t * 1.2);
      return;
    }
    // 滞空：被打飞腾空那段，循环着放
    if (st === 'airborne') {
      loop(R, pick('air', 'spin', 'stun'), I.time);
      I.clip = 'air';
      out.glow = 1.2;
      return;
    }
    // 眩晕 / 受击
    if (st === 'stunned' || st === 'hit' || st === 'hurt') {
      loop(R, pick('stun', 'spin'), I.time);
      I.clip = 'stun';
      return;
    }
    // 滚动 / 失控
    if (st === 'roll' || st === 'spin') {
      loop(R, pick('spin', 'accelL', 'walk'), I.time);
      I.clip = 'spin';
      out.glow = 2.2;
      return;
    }
    if (st === 'attack') {
      once(R, pick('attack', 'attackL', 'attackR'), I.p);
      out.glow = 1 + 1.2 * Math.sin(Math.min(1, I.p) * Math.PI);
      return;
    }
    if (st === 'attack2') {
      once(R, pick('attackR', 'attack', 'attackL'), I.p);
      out.glow = 1 + 1.2 * Math.sin(Math.min(1, I.p) * Math.PI);
      return;
    }
    if (st === 'cast_s1') {
      once(R, pick('attackL', 'attack', 'attackR'), I.p);
      out.glow = 1 + 1.6 * Math.sin(Math.min(1, I.p) * Math.PI);
      return;
    }
    if (st === 'cast_s2') {
      once(R, pick('attackR', 'attack', 'attackL'), I.p);
      out.glow = 1 + 1.6 * Math.sin(Math.min(1, I.p) * Math.PI);
      return;
    }
    if (st === 'cast_ult') {
      once(R, pick('chant', 'attack'), I.p);
      out.glow = 1 + 2 * Math.sin(Math.min(1, I.p) * Math.PI);
      return;
    }
    if (st === 'channel') {
      loop(R, pick('chant', 'attack'), I.time);
      out.glow = 1.5 + 0.4 * Math.sin(I.time * 6);
      return;
    }
    // 表情：嘲讽 / 笑话 / 跳舞 / 庆祝。引擎给的是真实秒数，按原速放完停在末帧
    if (st.startsWith('emote_')) {
      hold(R, pick(st.slice(6), 'taunt', 'joke'), I.t);
      I.clip = st;
      out.glow = 1.3;
      return;
    }
    // 胜利庆祝：循环跳到对局结束
    if (st === 'cheer') {
      loop(R, pick('cheer', 'dance'), I.time);
      I.clip = 'cheer';
      out.glow = 1.6;
      return;
    }
    // 复活：复活那一下的起身动作，放完接待机
    if (st === 'revive') {
      once(R, pick('revive', 'cheer'), I.p);
      I.clip = 'revive';
      return;
    }
    if (st === 'stop') {
      once(R, pick('stop', 'stun'), I.p);
      I.clip = 'stop';
      return;
    }
    if (st === 'turnL' || st === 'turnR') {
      once(R, pick(st, 'stop', 'walk'), I.p);
      I.clip = st;
      return;
    }
    if (st === 'move' || st === 'run') {
      // 左拐 / 右拐：移动中航向转得快，就先播转向动作（按真实秒数推进）。
      // 只占开头一小段 —— 这批转向片段有 1.2 秒，整段播完人还在往前走，会看着像在原地打转。
      if (I.turn) {
        const k = I.turn > 0 ? 'turnL' : 'turnR',
          c = pick(k, 'stop', 'walk');
        if (c && I.turnT < Math.min(c.dur || 1, 0.45)) {
          (hold(R, c, I.turnT), (I.clip = k));
          return;
        }
      }
      // 常规行走一律用"小加速"；只有被减速效果影响时才用"行走"（= 这批包里叫"待机"的那段）
      const k = I.slow
          ? 'walk'
          : I.tier >= 2
            ? 'accelL'
            : I.tier >= 1
              ? 'accelM'
              : 'accelS',
        c = pick(k, 'accelS', 'walk');
      (loop(R, c, I.time), (I.clip = k));
      return;
    }
    // 急停：从走到停的那一下播一次，播完（或超过片长）就回待机。
    // 同样只取开头一小段 —— 每次松手都甩一整套 1.2 秒的刹车动作太吵。
    if (I.stopT >= 0) {
      const c = pick('stop', 'stun');
      if (c && I.stopT < Math.min(c.dur || 1, 0.6)) {
        (hold(R, c, I.stopT), (I.clip = 'stop'));
        return;
      }
    }
    // 待机：这个包里没有真正的待机片段，先停在绑定姿势，等下一个包补 idle。
    // 补进来之后这一句自动生效，别的都不用改。
    if (A.idle) loop(R, A.idle, I.time + (I.seed ?? 0) * 3);
    out.glow = 1 + 0.1 * Math.sin(I.time * 2);
  };

  // 挂点：attach 的偏移在关节局部空间（会被关节世界缩放放大），根骨局部空间 = 模型空间，
  // 所以直接写模型原始尺寸的比例即可，缩放由 scale 统一吃。
  const at = (y, z = 0) => ({ joint: rootJ, x: 0, y: rawH * y, z: rawH * z });
  // 立绘取景：正式英雄那套 fB 是按人形身高调的（bust 特写），套到这些奇形怪状的角色上
  // 会直接怼到脸上。这里改成"整只入画"：相机距离按模型自己的最大尺寸算，视点压在腰/胸。
  // fov 24° → 距离 D 处可见高度 ≈ 0.425D，留 10% 余量就是 2.6×最大尺寸。
  const wh = rawH * k,
    ww = rawW * k,
    // 越扁的模型（蛤蟆/椰子球）视觉重心越靠下，视点要跟着压低，不然上方一片空白
    wide = Math.min(1, Math.max(0, ww / Math.max(0.01, wh) - 1));
  const portrait = {
    dist: 2.63 * Math.max(wh, ww),
    drop: wh * (0.45 + 0.12 * wide), // head 挂点在 0.95×wh
    yaw: -16,
    x: 0,
    anim: 'idle',
    p: 0,
  };
  return {
    key: `hero:${id}`,
    geometry,
    rig,
    map,
    // 图集是 sRGB 编码的（glTF baseColorTexture 就是这么定义的），顶点色是线性的，
    // 所以片元里要把贴图转一次线性，否则会比以前的顶点色版亮一截
    mapSRGB: map ? 1 : 0,
    // 原版这批是平涂卡通，不要硬边高光（见上面 rawMesh 的注释）
    specular: GLOSSY ? void 0 : 0,
    height: 3.05 / k,
    radius: Math.min(rawW * 0.42, 1.15),
    scale: 1,
    stride: 3.0,
    triangles: t.triangleCount,
    portrait,
    attach: {
      head: at(0.95),
      chest: at(0.62),
      handR: at(0.5, 0.18),
      handL: at(0.5, 0.18),
      weapon: at(0.5, 0.28),
      muzzle: at(0.5, 0.34),
    },
    blend: () => 0.14,
    animate,
    // 某段动作的原始时长（秒）。表情按钮要按原速播完，得知道播多久。
    animDur: (name) => A[name]?.dur ?? 0,
  };
}

// 表情按钮用：这个外观的某个动作有多长。没有模型/没有该动作就返回 0。
export function kartAnimDur(id, name) {
  const d = DATA.get(id);
  return (d && d.anim && d.anim[name] && d.anim[name].dur) || 0;
}

// 加载并登记。返回 true 表示现在就能用。
export async function preloadKart(id) {
  if (!id || !BY_ID.has(id)) return false;
  if (DATA.has(id)) return true;
  // dist/ 下是 kart/xxx.bin；modular/ 开发入口下要往上一级找。
  for (const p of [`kart/${id}.bin`, `../kart/${id}.bin`, `../dist/kart/${id}.bin`]) {
    try {
      const r = await fetch(p);
      if (!r.ok) continue;
      const d = kartDecode(await r.arrayBuffer());
      // 贴图图集是同目录的同名 .png，和 .bin 一起按需拉
      if (d.tex && d.tex.w > 0) d.texUrl = p.replace(/\.bin$/, '.png');
      DATA.set(id, d);
      registerModel(`hero:${id}`, () => kartDef(id));
      return true;
    } catch {}
  }
  console.warn('角色模型加载失败', id);
  return false;
}

export function kartReady(id) {
  return DATA.has(id);
}

// ── 展示层（头像 / 立绘 / 名牌）──────────────────────────────
// 只有真人玩家会带皮，AI 不会。所以"这个英雄该显示成什么外观"只用一个全局变量就够了，
// 不用把 skin 顺着阵容、战绩表、结算数据一层层传下去。
let playerSkin = null;
export function setPlayerSkin(id) {
  playerSkin = id && BY_ID.has(id) ? id : null;
  return playerSkin;
}
export function getPlayerSkin() {
  return playerSkin;
}
// heroId + 是不是玩家 → 展示用的外观 id（有皮就是皮 id）
export function lookId(heroId, isPlayer) {
  return (isPlayer && playerSkin) || heroId;
}

const PAL = new Map();
const s2hex = (v) => {
  const s = v <= 0.0031308 ? v * 12.92 : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
  return Math.round(Math.min(1, Math.max(0, s)) * 255);
};
const hx = (r, g, b) =>
  '#' + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');

// 从模型自己的顶点色里取一套配色（立绘底板、轮廓光、名牌渐变用）。
// 这些模型基本是单色系（黄蛤蟆/橙纸箱/白熊猫），按亮度加权平均就够准。
export function kartPalette(id) {
  const hit = PAL.get(id);
  if (hit) return hit;
  const d = DATA.get(id);
  if (!d) return null;
  const C = d.mesh.col;
  let r = 0,
    g = 0,
    b = 0,
    w = 0;
  for (let i = 0; i < C.length; i += 3) {
    // 亮的顶点权重大：深色描边/阴影不该把代表色压黑
    const k = 0.12 + (0.2126 * C[i] + 0.7152 * C[i + 1] + 0.0722 * C[i + 2]) * 2.4;
    r += C[i] * k;
    g += C[i + 1] * k;
    b += C[i + 2] * k;
    w += k;
  }
  if (!(w > 0)) return null;
  const R = s2hex(r / w),
    G = s2hex(g / w),
    B = s2hex(b / w);
  const p = {
    primary: hx(R, G, B),
    secondary: hx(R * 0.4, G * 0.4, B * 0.5),
    accent: hx(R * 1.2 + 22, G * 1.12 + 16, B * 1.06 + 10),
    glow: hx(R * 1.25 + 46, G * 1.25 + 46, B * 1.2 + 54),
  };
  PAL.set(id, p);
  return p;
}
