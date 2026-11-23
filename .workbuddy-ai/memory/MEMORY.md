# 项目长期笔记

## 项目
星陨战纪 Starfall v0.1 —— 从线上单文件构建恢复的网页 5v5 MOBA（Three.js + WebAudio，全程序化美术音效）。
仓库：`G:/github/olo`。结构见 README：`src/`（44 个 ES 模块，可编辑）、`modular/`（开发入口）、`dist/`（构建产物）、`_recover/`（原始 bundle + 格式化单文件）、`tools/`（analyze/split/scc/build）。

## 用户偏好
- **后台任务要静音且尽量少占用**：需要看渲染结果时用一次性 `chrome --headless --screenshot`，不要开长驻 CDP 会话；浏览器实例一律加 `--mute-audio`；本地服务器只在验证期间起，用完立刻停，不挂着；长时间任务先说明耗时和资源占用再跑。
- 中文交流。
