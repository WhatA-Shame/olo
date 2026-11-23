# 新增英雄手册

照着这份清单做，一个英雄从零到可玩大约 40 分钟，其中写代码 25 分钟、验证 15 分钟。
上一版（杯杯菇）花了近 3 小时，时间几乎全耗在验证环境上——所以**先读第 4 节**。

## 1. 一次改完，再构建

不要改一处构建一次。压缩后的符号名在十几个文件里各有约定，逐处试错会浪费十几次构建。
正确的顺序是：先把下面的接入点**全部**列出来，一次性写完，构建一次，然后用 `herocheck` 跑一遍。

先拿到接入点全集（这一步能省掉最费时的"找地方"）：

```bash
grep -rn "\b<heroId>\b" src/            # 例：grep -rn "\bchijin\b" src/
```

排除两类误报：

- `src/22-render-6.js` / `src/23-render-7.js` 里的 `mushrooms` 是**场景装饰蘑菇**，跟英雄无关；
- `grep -c` 出来的 `mushroom` 也可能命中注释或文案，以带引号的形式再确认一次。

## 1.5 有现成模型时：GLB 直灌

手写 `lathe/ball/limb` 只适合程序化角色。有 glTF/GLB 时走这条路：

```bash
node tools/glb2hero.mjs "模型.glb" src/45-<name>-mesh.js --scale 2.0 --rotY 270
```

然后在模型构建器里把几何段换成：

```js
(t.bone(i.root), t.rawMesh(heroMesh(), { mat: K.skin, gloss: 0.34, line: 1 }));
```

并在返回对象里加 `map: heroMap()`，`31-render-10.js` / `32-ui.js` 建 `ux` 时传 `map: D.map`。

**三个必查项**：

- `--rotY`：glTF 朝向不统一。用 `tools/probe.mjs` 按 UV 反查眼睛顶点在三维空间的位置，能直接算出该转多少度，比逐个试快。
- `flipY = false`：glTF 的 UV 原点在左上，three 默认会翻转，症状是贴图碎成色块。
- 无骨骼模型整只绑 `i.root`：滚动/摇摆都是整体刚性变换，别再去绑 hips。

## 2. 接入点清单（以杯杯菇为例，共 11 个文件）

| 文件 | 位置 | 要做什么 |
| --- | --- | --- |
| `src/02-data.js` | `Se.<id>` | 属性 / `skills` / `palette` / `look` / `passive`，`cast.type` 决定瞄准方式（`direction` / `cone` / `position` / `target` / `self`） |
| | `kr` | 花名册加 id（**AI 分队会按它循环**，6 英雄时每队仍是 5 人，靠 `slice(0,4)`） |
| | `FS` | 音效定义 `At(...)`：`atk_<id>_swing` / `atk_<id>_hit` / `cast_<id>_<slot>` / `fx_<特效键>` |
| `src/26-core-5.js` | 模型构建器 | `Ls` 网格 + `ge` 姿势 + `Zi` 蒙皮 + `TU` 通用姿势组，导出一个 `bXx()` |
| `src/31-render-10.js` | `hero:<id>` | 注册模型；`XO` 镜头高度；`cB` 技能动作映射；`fB` 选将台站位；`v3` 展示框范围 |
| `src/17-three-8.js` | `ws.<id>` | `glow` / `hot` / `deep` / `accent` / `dark`（`Lt(0xRRGGBB)`） |
| `src/20-core-3.js` | 特效函数 | 写好 `(n, t, e)` 形式的函数，再合进 `mMD` → `$D` |
| `src/33-data-2.js` | `XB.<id>` | 四个技能图标 SVG（`passive` / `s1` / `s2` / `ult`）；`FB` buff 文案 |
| `src/34-ui-2.js` | `nH` / `rH` / `hH` | buff 名称、buff 图标、雷达五维（`survive/damage/control/mobility/ease`） |
| `src/40-ui-8.js` | `Oa.<id>` | 技能 spec（`cast` 的 `range/radius/width/angle` 由它提供，**运行时 `n.range` 就是这里来的**）；`OG` 加点顺序 |
| `src/44-data-4.js` | `Oi(<id>, slot, …)` | 技能实现；`tu(<id>, …)` 被动钩子 |
| `src/41-ai.js` | `jG` / `pV` / `nV` `sV` `Uk` `oy` `a6` | AI 画像、动作→技能映射、对拼/收割/消耗/清线/撤退五个 `case` |
| `src/04-audio-2.js` | `ET` / `AT` | 普攻挥击音 / 命中音 |

> 漏一个不会报错，只会表现为"这个英雄 AI 不放技能"或"图标空白"。所以清单要对着表勾。

## 3. 五个必踩的坑

**① 模型 DSL：三个顺序问题**

```js
// a) 通用姿势组要用 gripR/aim/gripL，必须自己先补关节，再调 TU
n.rig.add("gripR", i.chest, 0, d.chestY, 0);
TU(n);

// b) Zi 的参数顺序是 (关节数组, 坐标数组, 兜底关节)，且坐标点数必须 = 关节数 + 1
Zi(limbs, pts, rootJoint);   // pts.length === limbs.length + 1

// c) 本模块没有 Rm / hi —— 步态参数要展开成字面量，渐变色用 Xi()
```

**② 音效键要加 `fx_` 前缀**

模拟层发的事件键是 `mushroom_s2_spray`，音频层 `onFx` 查的是 `fx_` + 键。
漏注册会让 `at()` 读 `undefined.range` 抛错，**整局弹"出了点状况"**，而且异常被游戏循环吞掉。
现已给 `at()` / `play()` 加了兜底（漏注册只静音），但仍要按 `fx_<键>` 注册。

**③ 贴花 `params(半角, 内半径比例)`**

内半径比例传 `1` 会把扇形压成零宽度，看起来像"完全没特效"。用 `0.12 ~ 0.35`。
另外 `color(c, 强度, alpha)` 的 alpha 默认是 1，别以为两参数就没 alpha。

**④ 不要传送英雄**

`u.pos.x = ...` 直接赋值不会更新空间网格，之后的 `Pr` / `$j` 范围查询会给出莫名其妙的结果，
还会引出假的崩溃。要换位置就用 `w.command(id, {type:"move", pos})` 走寻路，或者用 `nav.isFree` 挑一个空方向。

**⑤ 无头环境的帧率陷阱**

`--disable-gpu` 下只有 3~5 fps，**0.3~0.5 秒的特效经常一帧都没渲染就过期**。
截图验证短特效时，先把 duration 临时改成 2 秒确认形状，再改回去。

## 4. 验证：一条命令

```bash
node tools/herocheck.mjs mushroom            # 自动起服务器 + 无头 Chrome，跑完自动关
node tools/herocheck.mjs mushroom --shots    # 同时存截图到 .herocheck/
```

它会做这些事，任何一步不对就红字报出来：

1. 起 `python -m http.server 8787` 和无头 Chrome（`--mute-audio`，profile 放临时目录）；
2. 标题页 → 选将页 → 点中目标英雄卡 → **断言卡片选中态**；
3. 进战场后**断言 `playerId` 对应的 `heroId` 就是目标英雄**（上一版就因为没断言，连着测了两轮程咬金）；
4. 把技能等级设为 1、蓝量拉满、冷却清零，然后依次放 Q / E / R；
5. 每次释放后**断言 `cd > 0`**（`cd` 还是 0 说明被静默拒绝了，常见原因是技能等级 0 或还在施法锁定）；
6. 钩住 `world.emit` 记录所有 `fx` 键，断言每个技能都真的发出了特效；
7. 最后检查 `window.__moba.errors`——**这是游戏自己的错误数组，被循环吞掉的异常都在里面**，
   比 `window.onerror` 靠谱；只有需要调用栈时才上 `Debugger.setPauseOnExceptions`。

## 5. 提交前

```bash
node tools/build.mjs        # dist 必须重新打包，否则 dist 还是旧英雄
node tools/herocheck.mjs <id>
git add -A && git commit
```

README 里的「验证结果」表按实际测到的数字填，不要写"应该没问题"。
