// 调试用：用 CDP 打开页面，跑一段表达式并打印控制台报错
// 用法: node tools/_cdp.mjs <url> [expr]
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const url = process.argv[2];
const expr = process.argv[3] || '1';
const CDP = 9444;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].find((p) => fs.existsSync(p));
const profile = path.join(root, '.herocheck', 'profile-cdp');
fs.mkdirSync(profile, { recursive: true });
const ch = spawn(CHROME, ['--headless=new', '--disable-gpu', `--remote-debugging-port=${CDP}`, `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });

for (let i = 0; i < 60; i++) {
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
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  else if (m.method === 'Runtime.exceptionThrown') console.log('EXCEPTION:', JSON.stringify(m.params.exceptionDetails).slice(0, 600));
  else if (m.method === 'Runtime.consoleAPICalled') console.log('CONSOLE:', (m.params.args || []).map((a) => a.value ?? a.description).join(' ').slice(0, 400));
});
await new Promise((r) => ws.addEventListener('open', r));
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
await send('Runtime.enable');
await send('Page.enable');
await send('Network.enable');
await send('Network.setCacheDisabled', { cacheDisabled: true });
await send('Page.navigate', { url });
await sleep(2500);
const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
const val = r.result?.result?.value;
const save = (process.argv[4] || '').replace(/^--save=/, '');
if (save && typeof val === 'string') {
  fs.writeFileSync(save, Buffer.from(val, 'base64'));
  console.log('SAVED:', save, (fs.statSync(save).size / 1024 / 1024).toFixed(2) + 'MB');
} else {
  console.log('EVAL:', JSON.stringify(val ?? r.result?.exceptionDetails, null, 2).slice(0, 2000));
}
ws.close();
ch.kill('SIGTERM');
process.exit(0);
