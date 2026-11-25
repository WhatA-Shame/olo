# 星陨战纪 · Starfall (v0.1)

原创网页 5v5 MOBA：1 名玩家 + 9 个 AI 的三路对决。英雄包括樊哙、程咬金、王昭君、李广、荆轲，以及后续新增的坦克「杯杯菇」。
全部美术与音效均为**程序化生成**（Three.js 几何体 + WebAudio 合成），没有任何外部贴图、模型或音频文件。

> 本仓库是从线上部署副本恢复出来的可用工程，不是最初的源码仓库。详见「恢复说明」。
> 线上唯一副本：<https://sanwan.ai/games/xingyun-moba/>（同游戏的 `xingyun-moba.sanwan.ai`、`xingyun-moba-dev.sanwan.ai` 均已 502）

## 三个入口

| 入口 | 说明 |
| --- | --- |
| `play.html` | **快捷入口，双击这个玩**。0 秒跳转到 `dist/index.html` |
| `dist/index.html` | **唯一的游戏本体**。由 `src/` 打包成的单文件，双击即玩，用来部署 |
| `modular/index.html` | **开发调试入口**。加载 `src/` 下的 44 个模块，改完刷新即可生效（需本地服务器） |
| `dist/index.html` | **构建产物**。由 `src/` 重新打包成的单文件，双击即玩，用来部署 |

起本地服务器：

```bash
python -m http.server 8787     # 或双击 start.cmd
```

- 模块版：<http://127.0.0.1:8787/modular/index.html>
- 构建产物：<http://127.0.0.1:8787/dist/index.html>

> ES 模块在 `file://` 下会被浏览器拦截，所以模块版必须走本地服务器；两个单文件版本可以直接双击。

## 目录结构

```
olo/
├─ play.html                   快捷入口，跳到 dist/index.html
├─ modular/index.html          模块版入口（开发调试用，需服务器）
├─ dist/index.html             构建产物（2.6 MB），双击即玩
├─ src/                        ★ 源码：44 个 ES 模块 + entry.js（约 8.7 万行）
├─ _recover/
│  ├─ game.bundle.js           最初从线上副本抓取的压缩代码（1.96 MB，仅作溯源）
│  └─ game.pretty.js           格式化后的可读单文件（8.5 万行，拆分与回溯都以它为准）
├─ tools/
│  ├─ analyze.mjs              解析顶层语句、绑定、依赖关系 → report.json
│  ├─ split.mjs                依赖排序 + 切分为模块（可重复执行）
│  ├─ scc.mjs                  依赖图强连通分量统计
│  ├─ herocheck.mjs            一键验证某个英雄：起服务器+无头浏览器、选将、放技能、查异常
│  └─ build.mjs                用 esbuild 把 src/ 重新打包成 dist/index.html
├─ docs/
│  ├─ ADD-HERO.md              新增英雄手册（接入点清单 + 五个坑）
│  ├─ SYMBOLS.md               符号索引：每个顶层绑定 → 所在模块 + 行号 + 用途线索
│  └─ preview-*.png            运行截图
├─ images/beian-gongan.png     页脚备案图标（原页面唯一外部资源）
└─ start.cmd
```

## 模块化是怎么做的

原 bundle 是单作用域脚本（1690 个顶层语句、3044 个绑定、无 import/export），直接按行切会立刻遇到 TDZ 和跨模块赋值报错。所以拆分走了依赖分析：

1. **解析**：`@babel/parser` 取出每条顶层语句声明的绑定，以及它引用了哪些顶层绑定（区分「初始化期引用」与「函数体内延迟引用」）。
2. **必须同模块**：跨语句**写**引用（`x = ...` 指向别处声明的 `x`）会把两条语句强制合并——ESM 里给导入绑定赋值会抛 TypeError。
3. **排序**：按**全量引用**做拓扑排序（Kahn + 最小原始下标优先，尽量少改动执行顺序）。这样任何跨模块引用都指向更早的模块，既不出现 TDZ，也不会出现模块间循环导入。
4. **切块**：按 70 KB 目标顺序切分，组不可拆，产出 44 个模块（中位 64 KB，最大 100 KB）。
5. **命名**：按模块内信号（`THREE.` / `AudioContext` / `sf-` / `hp:` …）给出 `three` `render` `audio` `ui` `data` `vfx` `ai` `core` 标签，并写进文件头部的「关键内容」注释。

依赖图的强连通分量只有 8 处（1690 条语句里 15 条涉及互引），所以合并代价很小。

## 改代码的工作流

```bash
# 1. 改 src/ 里的模块（模块头注释标了它对应 game.pretty.js 的原始行号）
# 2. 刷新 modular/index.html 看效果
# 3. 满意后重新打包成单文件
node tools/build.mjs        # → dist/index.html
```

需要重新生成模块（比如改了切分策略）：

```bash
cd tools
node analyze.mjs ../_recover/game.pretty.js   # 产出 report.json
node split.mjs ../_recover/game.pretty.js ../src 70000
```

> `split.mjs` 会覆盖 `src/` 下的模块文件，手改前请先提交。

## 找东西的方法

变量名是压缩器产物（`Y6`、`v0`、`Se`），语义全靠字符串和数值。三条路子：

- `docs/SYMBOLS.md`：3044 个顶层绑定按模块列出，附行号和用途线索（中文文案优先，其次首个字符串字面量）。
- 模块头部注释：每个文件开头 3–8 行，标了原始行号范围和关键绑定。
- 直接搜中文：`grep -rn "侧盾闯帐" src/` 比搜变量名有效得多。

已知的重要位置：

| 内容 | 位置 |
| --- | --- |
| 英雄配置（属性/技能/文案/出装/配色） | `src/02-data.js` 的 `Se` 对象 |
| 装备表（63 件，定义在 `tools/itemdesign.mjs`，生成物写回这里） | `src/33-data-2.js` 的 `ln` 对象 |
| buff 表（28 种） | `src/34-ui-2.js` 的 `T3` 对象 |
| 兵线/防御塔数值 | `src/01-audio.js` 开头的 `Y6` / `v0` / `K6` |
| AI 画像（逃跑血量、开团倾向） | `src/41-ai.js` 的 `jG` 对象 |

## 新增英雄：杯杯菇（第 6 位）

> 要再加一个英雄，先看 **[docs/ADD-HERO.md](docs/ADD-HERO.md)**（接入点清单 + 五个坑），改完跑
> `node tools/herocheck.mjs <heroId> --shots` 一条命令验证：自动起服务器和无头浏览器、断言选中的英雄、
> 放三个技能、检查特效事件与运行时异常，跑完自动关。

紫伞盖蘑菇，坦克 / 上路。**模型是外部 glTF（GLB）直接导入的**，不是手写几何；技能、音效、AI 按原工程约定接入。

### 外部模型（GLB）导入管线

原工程的渲染管线是「批量 InstancedMesh + 顶点色卡通着色」，几何由 `Ls` 构建器用 `lathe/ball/limb` 现场车削出来，
**没有 UV，也没有贴图采样**。所以 ququfeiche 那套 three.js `Mesh + MeshPhysicalMaterial`（贴图 + sheen + bump）
不能直接搬过来，需要补通道。已经补好的部分：

| 层 | 改动 |
| --- | --- |
| `tools/glb2hero.mjs` | 解析 GLB（POSITION/NORMAL/TEXCOORD_0/索引 + basecolor JPEG），缩放/转向后内联成 `src/45-*.js`（base64，约 878KB） |
| `Ls`（`src/26-core-5.js`） | 新增 `uv` 缓冲与 `rawMesh()`：外部网格整只灌进来，顶点色留白交给贴图 |
| shader（`src/15-render-4.js`） | 顶点加 `vUv`，片元加 `uMap/uMapOn`，`base *= mix(1, texture, uMapOn)`；`uMapOn=0` 时对原生英雄零影响 |
| 材质 | `TL()` 接受 `map`，每个英雄本来就是一个独立 `ShaderMaterial`，不需要拆 drawcall |

用法：

```bash
node tools/glb2hero.mjs "模型.glb" src/45-<name>-mesh.js --scale 2.0 --rotY 270
```

`--rotY` 是模型朝向；glTF 的 UV 原点在左上，贴图必须 `flipY = false`（否则会上下翻转，表现为色块错乱）。
模型没有骨骼时，整只网格绑到根关节，翻滚/摇摆都是整体刚性变换——这反而让「侧滚」变得简单。

> 还没做的：法线贴图（`normalMap`）与 PBR 粗糙度通道。当前只接了 basecolor，光照仍走引擎原有的卡通分段着色。

### 原版角色皮（「搞怪卡丁车」那 21 个模型）

选将台花名册里除了 7 个正式英雄，还挂了 21 张「原版角色皮」卡（丑黄蛤蟆、多脚纸箱、杯杯菇、纸札弟……）。
它们**用的就是卡丁车工程里的原版模型**，不是重画的：从那边 `src/core/entities/*.ts` 里由 `glbExporter` 导成 GLB，
再转成本引擎的紧凑数据块。技能包是借的（`KART_SPECS` 里的 `kit`），外观/名字/立绘换掉。

| 层 | 说明 |
| --- | --- |
| `.kart/entry.js` | 浏览器端导出入口，暴露 `window.__kartExport(i)`（模型类要用 canvas 画贴图，只能在浏览器里跑） |
| `tools/kartexport.mjs` | 起静态服务器 + 无头 Chrome，逐个模型导成 `.kart/glb/NN-名字.glb`（导整套 21 段标准动作） |
| `tools/glb2kart.mjs` | GLB → `dist/kart/<id>.bin` + 同名 `.png`：**节点层级直接当骨架**，每个模型 1~5 张贴图拼成一张图集、UV 重映射，量化打包。带 `JOINTS_0` 的 primitive 走 glTF skin，**四骨权重原样保留** |
| `src/47-kart-decode.js` | 运行时解码器（顶点/骨架/动画），所有角色共用 |
| `src/47-kart.js` | `KART_SPECS` 登记表 + `preloadKart(id)` + `animate()`（引擎状态 → 片段名） |

```bash
node tools/kartbuild.mjs              # 一条命令重建全部 21 个（打包导出器 → 导 GLB → 转 .bin → 重打包 + 烘立绘）
node tools/kartbuild.mjs --only=frog  # 只重做一个（参数是皮 id，不是模型中文名）
node tools/kartbuild.mjs --no-art     # 跳过立绘烘焙
node tools/herocheck.mjs yeque --skin=frog   # 选皮进对局验证（36 项，含动作档位与表情）
```

#### 蒙皮：身体会蠕动靠的是真蒙皮，不是节点动画

7 个模型（大肥蛆 / 杯杯菇 / 大脚牛 / 小肥石 / 雪松老师 / 半马人 / 椰子保龄球）的**身体是一整块蒙皮网格**，
其余零件是节点动画。三个坑，踩过一次就不要再踩：

1. **不能砍成两根骨**。大肥蛆肚子上的顶点普遍是 `0.27/0.59/0.13` 这种三骨分布，
   取最大两根重新归一化会把相邻顶点的混合比例差异放大 4 倍（雪松老师跳舞 5.9× → 18.8× 拉伸）。
   引擎顶点属性因此是 `aSkin`(骨A/骨B/权重A) + `aSkin2`(骨C/骨D/权重C/权重D)，**骨B 的权重按 1−wA−wC−wD 反推**，
   所以两骨顶点（原生网格全部）行为和以前完全一致。`aSkin2` 必须**无条件**设在每个几何上 ——
   缺属性会拿到 WebGL 默认值 `(0,0,0,1)`，等于"骨D 权重 1"，整个人会被拽走。
2. **绑定姿态来自 `inverseBindMatrices`，不是节点静置姿态**。这几个模型的绑定姿态是"所有旋转归零的直骨"，
   节点静置姿态却是摆好的；拿静置姿态当绑定姿态，LBS 在相邻顶点权重不同处直接炸开
   （雪松老师 8.2× 拉伸，原版只有 1.7×）。大肥蛆恰好两者一致，所以这个坑拖了很久才暴露。
   顶点已经烘成世界坐标，所以绑定矩阵取 `meshWorld · inverse(IBM)`；关节矩阵是 `inv(meshWorld)·jointWorld·IBM`。
3. **`localTRS()` 的矩阵分支以前解出的是共轭四元数**（三个反对称项 `R21−R12` 之类全反号）。
   只有 `n.matrix` 的节点会走这条路，平时几乎不触发，但反解 IBM 正好走它。
   改法：先摆成行主序 `R[r][c]` 再用标准公式。

自检工具：`node tools/_kartdeform.mjs dist/kart/maggot.bin walk dance cheer`
（静置偏差 / 轴向尺寸变化 / 最大边长拉伸），基准对照用
`node tools/_glbskin.mjs ".kart/glb/04-白色大肥蛆.glb" 跳舞 20 [--top2] [--node=N]`，
它直接用原始 GLB 做完整 4 骨 + 完整矩阵的 LBS。**两者对不上就是导出链错了**，别靠肉眼看截图猜。

但这两个工具都只能证明**我们忠实复现了 GLB**，证明不了 **GLB 忠实于原版**。
要看原版本身，用 `.kart/shot.js`：它把原版模型步进到指定动作/帧并渲染，和我们的 `.bin` 同机位并排，
或者做**红绿叠加差分**（红=只有原版有，绿=只有我们有，黄=重合）——排查"哪块零件不对"一眼定案：

```bash
cd .kart && node node_modules/esbuild/bin/esbuild shot.js --bundle --format=iife \
  --target=es2022 --outfile=shot.bundle.js      # 改完 shot.js 要重新打包
python -m http.server 8795                       # 在 .kart/ 下起
# ?i=模型序号&a=动作中文名&f=帧，加 &diff=1 出差分图，&side=ours 只看我们那侧
chrome --headless --screenshot=out.png --virtual-time-budget=15000 \
  "http://127.0.0.1:8795/shot.html?i=0&a=%E5%B0%8F%E5%8A%A0%E9%80%9F&f=10&diff=1"
```

#### 顶点动画网格（`.dyn.json`）

卡丁车这批大部分是**节点动画**，但蛤蟆的「连体融合肉套」（4 条腿各 187 顶点）是**每帧在 CPU 上重建顶点几何**，
这份形变不在节点 TRS 里 —— GLTFExporter 只导出了导出那一刻的几何，动画里整块被冻在待机姿态，
表现就是"站起来走时腿脚分开"。所以导出器会在采样前后对比 `geometry.attributes.position.version`，
把这类网格的名字写进同名 `.dyn.json`；`tools/glb2kart.mjs` 读到后把它们改成**真蒙皮**
（整块网格共用一对结构骨，顶点权重沿两骨连线 `smoothstep`，见 `轴向权重()`）。

#### 动作：21 段标准动作怎么对应到引擎状态

卡丁车那边 `所有标准动作` 现在是 21 段（待机和行走已经拆开），`--full` 再加它特有的「跑起来 / 撞车震飞」。**全部照搬，不自己编动作**，
对应关系只有两处，改一边记得改另一边：`tools/glb2kart.mjs` 的 `ANIM_ALIAS`（中文名 → 片段名）和
`src/47-kart.js` 的 `animate()`（状态 → 片段）。

| 引擎状态 | 用的片段 | 触发场景 |
| --- | --- | --- |
| `idle` | 待机 | 真正的原地待机（3.6 秒环视），新包已经补上 |
| `move` | 小加速 | 常规行走一律用小加速 |
| `move` + 减速 buff | 行走 | 只有被减速影响时才用真行走（新包拆出来的那段） |
| `move` + 移速 ≥1.2×基础 / ≥1.55×基础 | 中加速 / 大加速 | 加速类 buff、冲刺 |
| `move` + 急转（>5rad/s） | 左拐 / 右拐 | 只占开头 0.45 秒，不然像原地打转 |
| 走→停的那一瞬 | 急停 | 只占开头 0.6 秒 |
| `attack` / `attack2` | 普通攻击 / 右攻击 | 普攻、普攻第二段 |
| `cast_s1` / `cast_s2` | 左攻击 / 右攻击 | 两个小技能 |
| `cast_ult` / `channel` | 吟唱 | 大招、引导 |
| `airborne` | 滞空 | 被击飞 |
| `stunned` | 眩晕 | 控制 |
| `roll` / `spin` | 失控 | 滚轮冲刺、斧影旋转 |
| `dead` / `revive` | 死亡 / 复活 | 阵亡、泉眼起身 |
| `emote_*` | 嘲讽 / 笑话 / 跳舞 | 右上角表情按钮、`Ctrl 1~4` |
| 对局结束（胜方） | 庆祝 | 核心被推掉时自动触发 |

右上角「战况」和「暂停」之间是表情按钮，下拉四个动作，也可以 `Ctrl+1~4` 直接放。
表情是对局里的真实状态（`rt.act = 'emote_xxx'`），一走动/攻击就被打断。

**换新动作包时**：把新包放进 `.kart/`，确认中文动作名没变，跑 `node tools/kartbuild.mjs` 就行。
`glb2kart.mjs` 会自动判断"有『待机』没『行走』= 老包，待机其实是行走"；新包已经带上真正的待机 + 行走，
`idle` 就自动接上，不用改代码。

几个踩过的坑：

- **不能打进 bundle**：21 个角色、每个 21 段动作，`dist/kart` 加起来 60MB，会让首页从 6.5MB 涨到 66MB。
  所以走运行时 `fetch` + `registerModel()` 动态登记，一局只拉玩家那一个（1.4~2.9MB）。
- **贴图不能只烘顶点色**：每个顶点只采一个颜色，512×512 的条纹会退化成模糊环带，模型看着像打了蜡。
  现在是 `.bin` 里存图集尺寸、同目录 `.png` 存图集，走引擎现成的 `uMap`；顶点色只放 `baseColorFactor`。
  `uMapSRGB=1` 是因为 glTF 的 baseColorTexture 是 sRGB 编码，而引擎的顶点色/光照都是线性的。
  没贴图的面指向图集里预留的纯白格（乘上去等于没乘），不用给"有没有贴图"再加顶点属性。
- **`gloss` 必须是 0**：它是 `aFx.x`，会乘上默认的 `uSpec.x=0.9` 变成高光强度，而 cloth 类别的高光是硬边的 ——
  叠起来就是一块又圆又亮的白斑。`?gloss=1` 可以还原旧外观做 A/B。
- **骨索引用 u16**：多脚纸箱有 304 根骨，u8 会截断到 255，那些零件会绑错骨、动起来散架。
- **贴图色要 sRGB→线性**：`baseColorTexture` 是 sRGB 编码，而引擎顶点色按线性用，直接喂会整批发白。
- **`height` 是声明值不是几何高度**：渲染器把 `def.height * def.scale * Z` clamp 到 `[3.05, 3.55]`，
  所以最终大小只由 `height` 决定（`scale` 被约掉）。填真实高度会让趴着的蛤蟆按身高拉满、横向铺成 8 米宽，
  得按 `height = 3.05 / k` 反算，`k` 同时受"别比人高"和"别比人宽"两个上限约束。
- 这些模型自带朝向是 **+Z**（和引擎的 forward 一致），不需要额外 `--rotY`。


| 技能 | 效果 | 实现 |
| --- | --- | --- |
| 被动 菌丝缠缚 | 每 3 次普攻后，第 4 下附带 3.5% 最大生命魔法伤害并减速 25% | `tu("mushroom", …)` 钩子 |
| Q 滚菌冲锋 | 侧倒成菌轮，**持续滚动 10 秒**，速度 11 → 18 递增；滚动中可用移动指令**持续改向**；被碾到的敌人每 0.5 秒受伤（首次被顶飞） | `Hm` 冲刺（`anim:"roll"`）+ 0.08 秒递归转向/加速/清命中表 |
| E 孢子喷吐 | **长按持续喷吐**，每 0.25 秒对 100° 锥形内敌人造成伤害并减速 40%；每秒消耗 30~45 法力，中断后仅 1.5 秒冷却 | 引导循环 + `$j` 锥形判定，再按一次可主动收起 |
| R 天降菌盖 | 指向 16 格内落点，1.8 秒警示后跃起（0.6 秒滞空），落地范围伤害 + 击飞 | `Zo` 预警圈 + `fW` 跳跃 |

新增英雄要动的十几处（照此清单即可再复制一个）：

| 位置 | 内容 |
| --- | --- |
| `src/02-data.js` | `Se.mushroom`（属性/技能/配色/文案）、`kr` 花名册、音效表 `FS` 里的 `atk_*` / `cast_*` / `fx_*` |
| `src/26-core-5.js` | 模型构建器 `bBg()`（骨架、蒙皮、步态、各技能姿势）＋ `rawMesh()` 外部网格入口 |
| `src/31-render-10.js` | `hero:mushroom` 模型注册、镜头高度 `XO`、技能动作映射 `cB`、选将台站位 `fB`、展示框 `v3` |
| `src/17-three-8.js` | 配色表 `ws.mushroom`（glow/hot/deep/accent/dark） |
| `src/20-core-3.js` | 特效函数（冲刺、拖尾、撞击、孢子锥、蓄力、落地）并合入 `$D` |
| `src/33-data-2.js` | 技能图标 SVG `mB` → `XB`、buff 文案 `FB` |
| `src/34-ui-2.js` | buff 名称 `nH` / 图标 `rH`、雷达属性 `hH` |
| `src/40-ui-8.js` | 技能行为 spec `Oa`、AI 加点顺序 `OG` |
| `src/44-data-4.js` | `Oi(hero, slot, …)` 技能实现、`tu(hero, …)` 被动钩子 |
| `src/41-ai.js` | AI 画像 `jG`、动作映射 `pV`、对拼/收割/消耗/清线/撤退各 `case` |
| `src/04-audio-2.js` | 普攻挥击/命中音映射 `ET` / `AT` |

> **音效命名坑**：模拟层发出的 `fx` 事件键是 `mushroom_s2_spray`，音频层查表用的是 `fx_` + 键，即 `fx_mushroom_s2_spray`。漏注册会让音频在 `at()` 里读 `undefined.range` 而崩掉整局（表现为「出了点状况」弹窗）。现已给 `at()` / `play()` 加了缺表兜底，漏注册只会静音、不再崩。

## 验证结果

模块版与原始单文件在相同条件下逐项对比通过：

| 检查项 | 结果 |
| --- | --- |
| 标题页渲染 | 一致 |
| 选将页（3D 模型 / 技能面板 / 属性雷达） | 一致 |
| 战场（小地图 / 塔 / 血条 / 技能 / 引导） | 一致 |
| 运行 45 秒后的计时器与金币 | 均为 00:16，金币 75 vs 76（差一帧被动收入） |
| 控制台异常 | 无（唯一 404 是线上留言板接口，离线本就不可用） |
| `dist/index.html` 重新打包后 | 同样可玩 |

新增英雄「杯杯菇」的单独验证：

| 检查项 | 结果 |
| --- | --- |
| 选将页 | 卡片、3D 模型、称号「菌盖如山」、坦克标签、雷达图、三技能图标正常 |
| 战场渲染 | 模型、血条、HUD 技能栏正常，控制台无异常 |
| Q 滚菌冲锋 | 进入 `dash.anim = "roll"`，速度 11 → 18；发一条垂直方向的移动指令后朝向从 `(1,0)` 变为 `(-0.86,-0.5)`，确认可改向 |
| E 孢子喷吐 | 进入引导态（`rt.mushS2`），0.6 秒内法力 1475 → 1452 持续下降；再按一次可收起 |
| R 天降菌盖 | 1.8 秒警示圈 → 跃起 → 落点位移 12 格，落地范围伤害 + 击飞 |
| 自动化 | `node tools/herocheck.mjs mushroom --shots` 14 项检查全过 |

## 恢复说明

**能恢复的**：完整可运行的游戏本体；格式化后的可读代码；按依赖关系重建的模块结构。

**找不回的**：原始 TypeScript 源码（模块划分与注释在打包时已丢失）、构建配置、git 历史、角色编辑器（开发期工具，不会进生产包）。

**对原文件做过的唯一改动**：页脚图标绝对路径 `/images/beian-gongan.png` → 相对路径 `images/beian-gongan.png`。

## 许可

原作为个人作品，版权归原作者所有。
