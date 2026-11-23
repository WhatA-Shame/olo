// 把 src/ 模块重新打包成单文件 dist/index.html
// 用法: node tools/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

console.log('打包 src/entry.js …');
const result = await build({
  entryPoints: [path.join(root, 'src', 'entry.js')],
  bundle: true,
  format: 'esm',
  target: 'es2022',
  write: false,
  logLevel: 'warning',
});

const bundle = result.outputFiles[0].text;
const shell = fs.readFileSync(path.join(root, 'modular', 'index.html'), 'utf8');

const marker = /<script type="module" src="\.\.\/src\/entry\.js"><\/script>/;
if (!marker.test(shell)) throw new Error('modular/index.html 里找不到外链脚本标签');

let html = shell.replace(marker, () => `<script type="module" crossorigin>${bundle}</script>`);
html = html.replace('src="../images/beian-gongan.png"', 'src="images/beian-gongan.png"');

fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
fs.mkdirSync(path.join(root, 'dist', 'images'), { recursive: true });
fs.writeFileSync(path.join(root, 'dist', 'index.html'), html);
fs.copyFileSync(
  path.join(root, 'images', 'beian-gongan.png'),
  path.join(root, 'dist', 'images', 'beian-gongan.png'),
);

console.log(`完成: dist/index.html (${(html.length / 1024 / 1024).toFixed(2)} MB)`);
