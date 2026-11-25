// 一条命令重建全部"搞怪卡丁车"原版角色资源。
// 用法: node tools/kartbuild.mjs [--only=frog,panda] [--full] [--no-art]
//
// 四步：
//   1. 把 .kart/entry.js 打包成 .kart/bundle.js（浏览器里跑得动的导出器）
//   2. 起无头 Chrome，调它的 glbExporter 把每个原版模型导成 .kart/glb/NN-名字.glb
//   3. 用 tools/glb2kart.mjs 转成 dist/kart/<id>.bin（游戏运行时按需 fetch 的那个）
//   4. 重新打包 dist，再烘 20 张立绘/头像 → dist/images/portrait/（--no-art 可跳过）
//
// 为什么绕这么大一圈：模型类是 three 图元 + canvas 贴图现场拼出来的，node 里没有 canvas，
// 所以只能在浏览器里跑。glb2kart.mjs 那一步才是真正的格式转换，可以在 node 里跑。
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const KART = path.join(root, '.kart');
const OUT = path.join(root, 'dist', 'kart');
const argv = process.argv.slice(2);
const only = (argv.find((a) => a.startsWith('--only=')) || '').split('=')[1] || '';

// 顺序必须和 src/47-kart.js 里的 KART_SPECS 一致（.bin 文件名靠它）
const IDS = [
  'frog',
  'mannequin',
  'boxman',
  'scallion',
  'maggot',
  'slime',
  'monkey',
  'mushroom',
  'cow',
  'stone',
  'kangaroo',
  'magnet',
  'boxtree',
  'bighead',
  'girlhead',
  'horseman',
  'skeleton',
  'coconut',
  'paperboy',
  'panda',
  'bear',
];

const run = (cmd, args, cwd = root) => {
  const r = spawnSync(cmd, args, { cwd, stdio: 'inherit' });
  if (r.status !== 0) throw new Error(`${cmd} ${args.join(' ')} 失败`);
};

// 1) 打包导出器
console.log('· 打包 .kart/entry.js …');
run(process.execPath, ['node_modules/esbuild/bin/esbuild', 'entry.js', '--bundle', '--format=iife', '--target=es2022', '--outfile=bundle.js', '--log-level=warning'], KART);

// 2) 导 GLB
console.log('· 导出 GLB …');
const args = [path.join(root, 'tools', 'kartexport.mjs'), '--force'];
if (only) {
  // --only=frog,panda 是皮 id，导出脚本那边只认中文名，这里翻成序号传过去
  const idx = only
    .split(',')
    .map((s) => IDS.indexOf(s.trim()))
    .filter((i) => i >= 0);
  if (!idx.length) throw new Error(`--only=${only} 里没有一个能对上 KART_SPECS 的 id`);
  args.push(`--only-index=${idx.join(',')}`);
}
if (argv.includes('--full')) args.push('--full');
run(process.execPath, args);

// 3) 转 .bin
console.log('· 转成 dist/kart/*.bin …');
fs.mkdirSync(OUT, { recursive: true });
const glbs = fs.readdirSync(path.join(KART, 'glb')).filter((f) => f.endsWith('.glb')).sort();
let n = 0;
for (const f of glbs) {
  const idx = Number(f.slice(0, 2));
  const id = IDS[idx];
  if (!id) {
    console.log(`  ! ${f} 没有对应的 id（IDS 只有 ${IDS.length} 项）`);
    continue;
  }
  run(process.execPath, [path.join(root, 'tools', 'glb2kart.mjs'), path.join(KART, 'glb', f), path.join(OUT, `${id}.bin`)]);
  n++;
}
console.log(`\n完成: ${n} 个模型 → dist/kart/`);

// 4) 烘立绘/头像
// 头像走的是游戏自己的 N8/l4 管线（离屏 WebGL 渲一遍再合成底板），所以要等 dist/index.html
// 里有新的 .bin 之后才能跑 —— 顺序不能提前。
if (argv.includes('--no-art')) console.log('· 跳过立绘烘焙（--no-art）');
else {
  // 烘焙脚本是拿 dist/index.html 当画布用的，所以得先把 src 打进去
  console.log('· 重新打包 dist（立绘要用它当渲染环境）…');
  run(process.execPath, [path.join(root, 'tools', 'build.mjs')]);
  console.log('· 烘立绘 → dist/images/portrait/ …');
  run(process.execPath, [path.join(root, 'tools', 'kartportrait.mjs')]);
}
