// 从「搞怪卡丁车」编辑器导出风格化肖像（波普撞色 + 网点 + 描边）
// 用法: node tools/_portraits.mjs
// 产物: .kart/portraits/<id>.webp（320×320 方图）、.kart/portraits-rect/<id>.webp（320×560 竖图）
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_SQ = path.join(root, '.kart', 'portraits');
const OUT_RECT = path.join(root, '.kart', 'portraits-rect');
const URL_ED = 'http://127.0.0.1:3007/';
const CDP = 9455;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
].find((p) => fs.existsSync(p));

const profile = path.join(root, '.herocheck', 'profile-portraits');
fs.mkdirSync(profile, { recursive: true });
const ch = spawn(
  CHROME,
  [
    '--headless=new',
    '--mute-audio',
    '--enable-unsafe-swiftshader',
    `--remote-debugging-port=${CDP}`,
    `--user-data-dir=${profile}`,
    '--window-size=1280,900',
    'about:blank',
  ],
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
  if (ex) throw new Error((ex.exception?.description || ex.text || '').slice(0, 400));
  return r.result?.result?.value;
};

await send('Runtime.enable');
await send('Page.enable');
await send('Page.navigate', { url: URL_ED });

// 等编辑器就绪（能 import 肖像模块）
let ready = false;
for (let i = 0; i < 80; i++) {
  await sleep(500);
  try {
    ready = !!(await ev(`(async()=>{ const m = await import('/src/core/portraitStudio.ts'); return typeof m.确保全员肖像生成 === 'function'; })()`, true));
  } catch {}
  if (ready) break;
}
if (!ready) throw new Error('编辑器没起来');

fs.mkdirSync(OUT_SQ, { recursive: true });
fs.mkdirSync(OUT_RECT, { recursive: true });

console.log('· 开始渲染 27 个风格化肖像…');
const t0 = Date.now();
await ev(`(async()=>{ const m = await import('/src/core/portraitStudio.ts'); await m.确保全员肖像生成(); return 1; })()`, true);
console.log(`· 渲染完成 ${((Date.now() - t0) / 1000).toFixed(1)}s`);

const ids = await ev(`(async()=>{ const m = await import('/src/core/portraitStudio.ts'); return Object.keys(m.获取全部已拍肖像()); })()`, true);
console.log('· 共', ids.length, '个:', ids.join(', '));

const save = (obj, dir, tag) => {
  let n = 0;
  for (const [k, url] of Object.entries(obj)) {
    if (typeof url !== 'string' || !url.startsWith('data:image/')) continue;
    fs.writeFileSync(path.join(dir, `${k}.webp`), Buffer.from(url.slice(url.indexOf(',') + 1), 'base64'));
    n++;
  }
  console.log(`  ✓ ${tag} ${n} 张`);
};

// 分块取，避免一次大 payload 把 CDP 拖死
const chunk = (arr, size) => Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));
const sq = {};
const rect = {};
for (const part of chunk(ids, 5)) {
  const keys = JSON.stringify(part);
  const a = await ev(`(async()=>{ const m = await import('/src/core/portraitStudio.ts'); const all = m.获取全部已拍肖像(); const o={}; for (const k of ${keys}) if(all[k]) o[k]=all[k]; return o; })()`, true);
  Object.assign(sq, a);
  const b = await ev(`(async()=>{ const m = await import('/src/core/portraitStudio.ts'); const all = m.获取全部已拍竖版肖像(); const o={}; for (const k of ${keys}) if(all[k]) o[k]=all[k]; return o; })()`, true);
  Object.assign(rect, b);
  process.stdout.write('.');
}
console.log('');
save(sq, OUT_SQ, '方图');
save(rect, OUT_RECT, '竖图');

ws.close();
ch.kill('SIGTERM');
process.exit(0);
