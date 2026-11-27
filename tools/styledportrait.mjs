// 把编辑器烘的风格化头像（波普撞色 + 网点 + 描边）落成游戏选将台用的 PNG。
// 用法: node tools/styledportrait.mjs
//
// 输入 .kart/portraits-rect/<id>.webp（320×560 竖版），
// 裁成 320×416（保留顶部，头肩完整），输出 dist/images/portrait/<kartId>.png。
// 只覆盖有波普头像的角色；「跑步假人」这类编辑器里没有的保留原图。
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(root, '.kart', 'portraits-rect');
const OUT = path.join(root, 'dist', 'images', 'portrait');
const BASE = 'http://127.0.0.1:8820';
const CDP = 9477;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// 游戏里的 kart id → 编辑器里的模型 id
const ALIAS = { doll: 'mannequin', boxman: 'box' };

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
].find((p) => fs.existsSync(p));

const profile = path.join(root, '.herocheck', 'profile-styled');
fs.mkdirSync(profile, { recursive: true });
const ch = spawn(
  CHROME,
  ['--headless=new', '--disable-gpu', `--remote-debugging-port=${CDP}`, `--user-data-dir=${profile}`, 'about:blank'],
  { stdio: 'ignore' },
);

for (let i = 0; i < 80; i++) {
  await sleep(250);
  try {
    if (await fetch(`http://127.0.0.1:${CDP}/json/version`)) break;
  } catch {}
}
const list = await (await fetch(`http://127.0.0.1:${CDP}/json`)).json();
const page = list.find((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
ws.addEventListener('message', (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m);
    pending.delete(m.id);
  }
});
await new Promise((r) => ws.addEventListener('open', r));
const send = (method, params = {}) =>
  new Promise((res) => {
    const i = ++id;
    pending.set(i, res);
    ws.send(JSON.stringify({ id: i, method, params }));
  });
const ev = async (expression, awaitPromise = false) => {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise });
  const ex = r.result?.exceptionDetails;
  if (ex) throw new Error((ex.exception?.description || ex.text || '').slice(0, 300));
  return r.result?.result?.value;
};

await send('Runtime.enable');
await send('Page.enable');
await send('Page.navigate', { url: BASE + '/' });

// 游戏里的 id 列表：从 KART_ART 里挑，保证和游戏一致
const kartIds = (() => {
  const s = fs.readFileSync(path.join(root, 'src', '47-kart-art.js'), 'utf8');
  return [...s.matchAll(/^  (\w+):/gm)].map((m) => m[1]);
})();

let n = 0;
for (const kartId of kartIds) {
  const srcId = ALIAS[kartId] || kartId;
  const p = path.join(SRC, srcId + '.webp');
  if (!fs.existsSync(p)) {
    console.log(`  · ${kartId.padEnd(13)} 无波普头像，保留原图`);
    continue;
  }
  // 320×560 竖版 → 裁顶部 320×416
  let url = '';
  for (let attempt = 0; attempt < 3 && !url; attempt++) {
    try {
      url = await ev(
        `(async () => {
           const img = new Image();
           img.src = ${JSON.stringify(`/.kart/portraits-rect/${srcId}.webp?r=${attempt}`)} + '&t=' + Date.now();
           await img.decode();
           const c = document.createElement('canvas');
           c.width = 320; c.height = 416;
           const g = c.getContext('2d');
           g.imageSmoothingQuality = 'high';
           g.drawImage(img, 0, 0, 320, 416, 0, 0, 320, 416);
           return c.toDataURL('image/webp', 0.92);
         })()`,
        true,
      );
    } catch { url = ''; }
    if (typeof url === 'string' && !url.startsWith('data:image/webp')) url = '';
  }
  if (typeof url !== 'string' || !url.startsWith('data:image/webp')) {
    console.log(`  ✗ ${kartId} 转换失败`);
    continue;
  }
  const buf = Buffer.from(url.slice(url.indexOf(',') + 1), 'base64');
  fs.writeFileSync(path.join(OUT, kartId + '.webp'), buf);
  console.log(`  ✓ ${kartId.padEnd(13)} ← ${srcId.padEnd(11)} ${(buf.length / 1024).toFixed(0)}KB`);
  n++;
}
console.log(`\n完成：${n} 张风格化头像 → dist/images/portrait/`);
ws.close();
ch.kill('SIGTERM');
process.exit(0);
