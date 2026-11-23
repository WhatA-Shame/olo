# 星陨战纪 · Starfall (v0.1)

原创网页 5v5 MOBA：1 名玩家 + 9 个 AI 的三路对决。英雄包括樊哙、程咬金、王昭君、李广、荆轲。
全部美术与音效均为**程序化生成**（Three.js 几何体 + WebAudio 合成），没有任何外部贴图、模型或音频文件。

> 本仓库是从线上部署副本恢复出来的可用工程，不是最初的源码仓库。详见下方「恢复说明」。

## 快速开始

| 方式 | 命令 | 说明 |
| --- | --- | --- |
| 双击 | 打开 `index.html` | 单文件构建，无需服务器，直接开玩 |
| 一键脚本 | 双击 `start.cmd` | 起本地服务器并自动打开浏览器 |
| 开发入口 | `dev/index.html` | 加载可读版代码，**必须**通过本地服务器访问 |

起服务器（任选其一）：

```bash
python -m http.server 8787
# 或
npx serve .
```

然后访问 <http://127.0.0.1:8787/index.html>。

## 目录结构

```
olo/
├─ index.html                 单文件构建（2.0 MB）：three.js + 全部逻辑内联，可直接双击运行
├─ images/beian-gongan.png    页脚备案图标（原页面唯一的外部资源）
├─ dev/
│  └─ index.html              开发入口：与 index.html 同一套 DOM/样式，但把游戏逻辑外链到可读版
├─ _recover/
│  ├─ game.bundle.js          从 index.html 原样提取的压缩代码（1.96 MB，还原保真，勿手改）
│  └─ game.pretty.js          Prettier 格式化后的可读版（约 8.5 万行），dev 入口用的就是它
├─ docs/                      运行截图（标题页 / 选将 / 战场）
└─ start.cmd
```

## 恢复说明

**来源**：<https://sanwan.ai/games/xingyun-moba/>
（同一游戏的 `xingyun-moba.sanwan.ai` 和 `xingyun-moba-dev.sanwan.ai` 目前均返回 502，线上唯一可用副本就是这个页面。）

**能恢复的**

- 完整的可运行游戏本体：页面把 three.js、游戏逻辑、UI 全部内联在一个 HTML 里，抓下来即完整。
- 可读代码：提取内联模块并用 Prettier 格式化，得到 `_recover/game.pretty.js`。变量名被压缩器改写过（`Y6`、`v0` 之类），但所有数值表、技能描述、中文文案、UI 结构都完整可读，足以继续调参和改玩法。

**找不回的**

- 原始 TypeScript 源码（`app/shell.ts` 等模块划分）。构建时已被打包合并，模块边界和注释都没保留。
- 构建配置（vite 配置、依赖版本）、git 历史。
- 线上后端：留言板、访问统计、管理删除走的是 sanwan.ai 上的接口，离线不可用（不影响游戏本体）。

**做过的唯一改动**：把页脚图标的绝对路径 `/images/beian-gongan.png` 改为相对路径 `images/beian-gongan.png`，使其能离线加载。

## 验证结果

已在本地用无头 Chrome 走通完整链路：

1. 标题页正常渲染（星陨战纪 / STARFALL / 开始对战）
2. 选将页 3D 英雄模型、技能面板、属性雷达图正常
3. 进入战场：小地图、防御塔、泉水、血蓝条、技能键、新手引导全部正常

截图见 `docs/`。

## 继续开发

改玩法参数 → 编辑 `_recover/game.pretty.js` → 刷新 `dev/index.html` 看效果。
觉得满意后，把改动同步回 `index.html` 的内联脚本（或直接用 `dev/index.html` + 外链文件作为新的主入口部署）。

压缩后的变量名不直观，但结构清晰：数值配置集中在文件开头（兵线、防御塔、英雄属性），之后依次是 Three.js 渲染层、实体系统、AI、UI。

## 许可

原作为个人作品，版权归原作者所有。
