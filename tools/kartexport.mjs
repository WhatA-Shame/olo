// 从"搞怪卡丁车"项目里导出原版角色模型（GLB）。
// 用法: node tools/kartexport.mjs [--full] [--only=frog,panda]
//
// 为什么走浏览器：模型类用 document.createElement('canvas') 画贴图，node 里没有 canvas；
// 而 three 的 GLTFExporter 本来也是浏览器里的东西。所以这里起一个静态服务器 + 无头 Chrome，
// 在页面里调 .kart/entry.js 暴露的 __kartExport(i)，把 GLB 收回来。
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const KART = path.join(root, '.kart');
const OUT = path.join(KART, 'glb');
const PORT = 8791;
const CDP = 9331;
const BASE = `http://127.0.0.1:${PORT}`;
const argv = process.argv.slice(2);
const FULL = argv.includes('--full');
const ONLY = (argv.find((a) => a.startsWith('--only=')) || '').split('=')[1] || '';
// --only 匹配的是模型中文名（丑黄蛤蟆）；--only-index 是模型序号，kartbuild 用它把
// --only=frog,panda 这种皮 id 翻成序号再传进来 —— 名字和 id 对不上，别让两边各写一份表。
const ONLY_INDEX = (argv.find((a) => a.startsWith('--only-index=')) || '').split('=')[1] || '';
const FORCE = argv.includes('--force');
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

const up = async (url) => {
  try {
    return !!(await fetch(url));
  } catch {
    return false;
  }
};

async function ensureServer() {
  if (await up(`${BASE}/index.html`)) return console.log('· 服务器已在运行');
  const py = spawn(process.platform === 'win32' ? 'python' : 'python3', ['-m', 'http.server', String(PORT)], {
    cwd: KART,
    stdio: 'ignore',
  });
  spawned.push(py);
  for (let i = 0; i < 40; i++) {
    await sleep(250);
    if (await up(`${BASE}/index.html`)) return console.log('· 已启动本地服务器');
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
  const profile = path.join(KART, 'profile');
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
    } else if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') {
      console.log('  ! 控制台:', (m.params.args || []).map((a) => a.value ?? a.description).join(' ').slice(0, 300));
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
    if (r.result?.exceptionDetails) throw new Error(r.result.exceptionDetails.text + ' ' + (r.result.exceptionDetails.exception?.description || ''));
    return r.result?.result?.value;
  };
  return { ws, send, ev };
}

const main = async () => {
  await ensureServer();
  await ensureChrome();
  const { send, ev, ws } = await connect();
  await send('Runtime.enable');
  await send('Page.enable');
  await send('Network.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Page.navigate', { url: `${BASE}/index.html` });
  await sleep(2500);
  let ok = false;
  for (let i = 0; i < 60; i++) {
    if (await ev('!!window.__kartReady')) {
      ok = true;
      break;
    }
    await sleep(250);
  }
  if (!ok) throw new Error('页面里的导出器没起来（bundle.js 报错了？）');
  const names = await ev('JSON.stringify(window.__kartNames)');
  const list = JSON.parse(names);
  console.log(`· 共 ${list.length} 个模型: ${list.join(' / ')}`);

  fs.mkdirSync(OUT, { recursive: true });
  const only = ONLY ? new Set(ONLY.split(',').map((s) => s.trim())) : null;
  const onlyIdx = ONLY_INDEX ? new Set(ONLY_INDEX.split(',').map((s) => Number(s.trim()))) : null;
  let done = 0;
  for (let i = 0; i < list.length; i++) {
    const nm = list[i];
    const file = path.join(OUT, `${String(i).padStart(2, '0')}-${nm}.glb`);
    if (onlyIdx ? !onlyIdx.has(i) : only && !only.has(nm)) continue;
    if (!FORCE && fs.existsSync(file)) {
      console.log(`  = 跳过 ${nm}（已存在）`);
      continue;
    }
    // 一次 Runtime.evaluate 把整个 base64 字符串带回来，会在 4MB 左右把 CDP 卡死
    // （半马人新包 3.2MB GLB → 4.3MB base64，主线程空转、promise 永远不 resolve）。
    // 所以先让页面把结果挂到 window，再分片取回来自己拼。
    const len = await ev(
      `window.__kartExport(${i}, ${FULL}).then(s => (window.__kartPayload = s, s.length))`,
      true
    );
    const CHUNK = 256 * 1024;
    let raw = '';
    for (let p = 0; p < len; p += CHUNK) {
      raw += await ev(`window.__kartPayload.slice(${p}, ${Math.min(len, p + CHUNK)})`);
    }
    await ev('window.__kartPayload = null');
    const o = JSON.parse(raw);
    const buf = Buffer.from(o.data, 'base64');
    fs.writeFileSync(file, buf);
    // 顶点动画网格名单（.glb 同名 .dyn.json）—— 这些网格的形变在几何里、不在节点 TRS 里，
    // glb2kart 看到它就得把它们改成蒙皮，否则会被冻在待机姿态（蛤蟆腿脚分开的根因）
    const dynFile = file.replace(/\.glb$/, '.dyn.json');
    if (o.dyn && o.dyn.length) fs.writeFileSync(dynFile, JSON.stringify(o.dyn, null, 0));
    else if (fs.existsSync(dynFile)) fs.unlinkSync(dynFile);
    done++;
    console.log(
      `  ✓ ${nm} → ${path.basename(file)}  ${(buf.length / 1024).toFixed(0)}KB  动画 ${o.n} 段` +
        (o.dyn && o.dyn.length ? `  顶点动画 ${o.dyn.length} 块` : '')
    );
  }
  console.log(`\n完成: ${done} 个 GLB 写入 ${OUT}`);
  ws.close();
  cleanup(0);
};

main().catch((e) => {
  console.error('✗', e.message);
  cleanup(1);
});
