# 星陨战纪 · Starfall (v0.1)

原创网页 5v5 MOBA：1 名玩家 + 9 个 AI 的三路对决。英雄包括樊哙、程咬金、王昭君、李广、荆轲。
全部美术与音效均为**程序化生成**（Three.js 几何体 + WebAudio 合成），没有任何外部贴图、模型或音频文件。

> 本仓库是从线上部署副本恢复出来的可用工程，不是最初的源码仓库。详见「恢复说明」。
> 线上唯一副本：<https://sanwan.ai/games/xingyun-moba/>（同游戏的 `xingyun-moba.sanwan.ai`、`xingyun-moba-dev.sanwan.ai` 均已 502）

## 三个入口

| 入口 | 说明 |
| --- | --- |
| `index.html` | **原始恢复基准**。单文件构建，双击即玩，保持抓取时的原样，不建议改 |
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
├─ index.html                  原始单文件构建（2.0 MB），恢复基准，勿改
├─ modular/index.html          模块版入口
├─ dist/index.html             构建产物（2.6 MB）
├─ src/                        ★ 源码：44 个 ES 模块 + entry.js（约 8.7 万行）
├─ _recover/
│  ├─ game.bundle.js           从 index.html 原样提取的压缩代码（1.96 MB）
│  └─ game.pretty.js           格式化后的可读单文件（8.5 万行，拆分与回溯都以它为准）
├─ tools/
│  ├─ analyze.mjs              解析顶层语句、绑定、依赖关系 → report.json
│  ├─ split.mjs                依赖排序 + 切分为模块（可重复执行）
│  ├─ scc.mjs                  依赖图强连通分量统计
│  └─ build.mjs                用 esbuild 把 src/ 重新打包成 dist/index.html
├─ docs/
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
| 装备表（17 件） | `src/33-data-2.js` 的 `ln` 对象 |
| buff 表（28 种） | `src/34-ui-2.js` 的 `T3` 对象 |
| 兵线/防御塔数值 | `src/01-audio.js` 开头的 `Y6` / `v0` / `K6` |
| AI 画像（逃跑血量、开团倾向） | `src/41-ai.js` 的 `jG` 对象 |

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

## 恢复说明

**能恢复的**：完整可运行的游戏本体；格式化后的可读代码；按依赖关系重建的模块结构。

**找不回的**：原始 TypeScript 源码（模块划分与注释在打包时已丢失）、构建配置、git 历史、角色编辑器（开发期工具，不会进生产包）。

**对原文件做过的唯一改动**：页脚图标绝对路径 `/images/beian-gongan.png` → 相对路径 `images/beian-gongan.png`。

## 许可

原作为个人作品，版权归原作者所有。
