// 把卡丁车原版角色的立绘/头像离线烘成 PNG。
// 用法: node tools/kartportrait.mjs [--only=frog,panda] [--size=384]
//
// 为什么离线烘：运行时渲染一张立绘要先 fetch 那个角色的模型（几百 KB ~ 1MB），
// 选将台花名册一次要 27 张卡，全拉下来 16MB，光为了头像不值。
// 烘成 PNG 一张几十 KB，运行时 xB(id) 直接给图片路径。
//
// 走的是游戏自己的立绘管线（32-ui.js 的 N8/l4），所以配色、轮廓光、底板渐变
// 和正式英雄是同一套，不会出现"皮是 3D 的、底板是另画的"这种割裂。
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(root, 'dist', 'images', 'portrait');
const ART_JS = path.join(root, 'src', '47-kart-art.js');
const PORT = 8792;
const CDP = 9332;
const BASE = `http://127.0.0.1:${PORT}`;
const argv = process.argv.slice(2);
const ONLY = (argv.find((a) => a.startsWith('--only=')) || '').split('=')[1] || '';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const spawned = [];
const cleanup = (code) => {
  for (const c of spawned) {
    try {
      c.kill('SIGTERM');
    } catch {}
  }
  process.exit(code);
};
process.on('SIGINT', () => cleanup(2));

// 顺序和 src/47-kart.js 的 KART_SPECS 一致
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
  'doll',
  'blackcat',
  'stagbeetle',
  'dungbeetle',
  'tiandongbao',
  'wooddoll',
  'thunderdragon',
];

const up = async (url) => {
  try {
    return !!(await fetch(url));
  } catch {
    return false;
  }
};

async function ensureServer() {
  if (await up(`${BASE}/dist/index.html`)) return console.log('· 服务器已在运行');
  const py = spawn(process.platform === 'win32' ? 'python' : 'python3', ['-m', 'http.server', String(PORT), '--bind', '127.0.0.1'], {
    cwd: root,
    stdio: 'ignore',
  });
  spawned.push(py);
  for (let i = 0; i < 40; i++) {
    await sleep(250);
    if (await up(`${BASE}/dist/index.html`)) return console.log('· 已启动本地服务器');
  }
  throw new Error('本地服务器起不来');
}

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].find((p) => fs.existsSync(p));

async function ensureChrome() {
  if (await up(`http://127.0.0.1:${CDP}/json/version`)) return console.log('· 浏览器已在运行');
  if (!CHROME) throw new Error('找不到 Chrome');
  const profile = path.join(root, '.herocheck', 'profile-portrait');
  fs.mkdirSync(profile, { recursive: true });
  const ch = spawn(
    CHROME,
    [
      '--headless=new',
      '--mute-audio',
      '--disable-gpu',
      `--remote-debugging-port=${CDP}`,
      `--user-data-dir=${profile}`,
      '--window-size=1088,615',
      'about:blank',
    ],
    { stdio: 'ignore' },
  );
  spawned.push(ch);
  for (let i = 0; i < 60; i++) {
    await sleep(250);
    if (await up(`http://127.0.0.1:${CDP}/json/version`)) return console.log('· 已启动无头浏览器');
  }
  throw new Error('浏览器起不来');
}

async function connect() {
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
    } else if (m.method === 'Runtime.exceptionThrown') {
      console.log('  ! 异常:', m.params.exceptionDetails.text);
    } else if (m.method === 'Runtime.consoleAPICalled' && m.params.type !== 'log') {
      console.log(`  ! ${m.params.type}:`, (m.params.args || []).map((a) => a.value ?? a.description).join(' ').slice(0, 400));
    }
  });
  await new Promise((r) => ws.addEventListener('open', r));
  const send = (method, params = {}) =>
    new Promise((res) => {
      const i = ++id;
      pending.set(i, res);
      ws.send(JSON.stringify({ id: i, method, params }));
    });
  const ev = async (expr, awaitPromise = false) => {
    const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise });
    const ex = r.result?.exceptionDetails;
    if (ex) throw new Error(ex.text + ' ' + (ex.exception?.description || ''));
    return r.result?.result?.value;
  };
  return { send, ev, ws };
}

const main = async () => {
  await ensureServer();
  await ensureChrome();
  const { send, ev, ws } = await connect();
  await send('Runtime.enable');
  await send('Page.enable');
  await send('Network.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Page.navigate', { url: `${BASE}/dist/index.html` });
  let ok = false;
  for (let i = 0; i < 80; i++) {
    if (await ev('typeof window.__sfPortrait === "function"')) {
      ok = true;
      break;
    }
    await sleep(250);
  }
  if (!ok) throw new Error('页面里的立绘钩子没起来（dist/index.html 是不是旧的？）');

  fs.mkdirSync(OUT, { recursive: true });
  const only = ONLY ? new Set(ONLY.split(',').map((s) => s.trim())) : null;
  const art = {};
  for (const id of IDS) {
    if (only && !only.has(id)) continue;
    const url = await ev(`window.__sfPortrait(${JSON.stringify(id)})`, true);
    if (typeof url !== 'string' || !url.startsWith('data:image/png;base64,')) {
      console.log(`  ✗ ${id} 没渲染出立绘`);
      continue;
    }
    const buf = Buffer.from(url.slice(url.indexOf(',') + 1), 'base64');
    fs.writeFileSync(path.join(OUT, `${id}.png`), buf);
    art[id] = `images/portrait/${id}.png`;
    console.log(`  ✓ ${id.padEnd(10)} ${(buf.length / 1024).toFixed(0)}KB`);
  }

  // 已经烘过但这次没重新烘的，保留原条目（--only 局部更新时不至于把别的删掉）
  const old = fs.existsSync(ART_JS) ? fs.readFileSync(ART_JS, 'utf8') : '';
  const m = old.match(/export const KART_ART = (\{[\s\S]*?\});/);
  if (m) {
    try {
      const prev = JSON.parse(m[1].replace(/(\w+):/g, '"$1":').replace(/'/g, '"'));
      for (const [k, v] of Object.entries(prev)) if (!(k in art) && fs.existsSync(path.join(root, 'dist', v))) art[k] = v;
    } catch {}
  }

  const body = Object.keys(art)
    .sort()
    .map((k) => `  ${k}: '${art[k]}',`)
    .join('\n');
  fs.writeFileSync(
    ART_JS,
    `// 47-kart-art.js —— 卡丁车原版角色的立绘/头像（由 tools/kartportrait.mjs 生成，勿手改）
//
// id → 相对路径。运行时 xB(id) 直接返回这个路径，不再在浏览器里拉模型 + 开离屏渲染器画一遍：
//   20 个角色光模型就 16MB，为了 27 张选将卡头像全拉下来太亏，烘成 PNG 一张才几十 KB。
//
// 重新生成：node tools/kartportrait.mjs
export const KART_ART = {
${body}
};
`,
  );
  console.log(`\n完成: ${Object.keys(art).length} 张立绘 → dist/images/portrait/，已写回 src/47-kart-art.js`);
  ws.close();
  cleanup(0);
};

main().catch((e) => {
  console.error('✗', e.message);
  cleanup(1);
});
