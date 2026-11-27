// 把 7 个正式英雄的立绘烘成 PNG，并把技能图标 / buff 图标取成 SVG 字符串，
// 供 docs/hero-design.html 使用。
//
// 用法: node tools/heroart.mjs
//
// 立绘走游戏自己的管线（32-ui.js 的 N8），和选将台是同一套配色与底板；
// 图标走 __sfIcon / __sfBuffIcon 两个离线钩子，取到的 SVG 直接内联进设计表。
// 产物：
//   dist/images/hero/<id>.png   立绘（640×832）
//   .kart/art.json              { icons: {heroId: {passive,s1,s2,ult}}, buffIcons: {id: svg} }
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(root, 'dist', 'images', 'hero');
const ART_JSON = path.join(root, '.kart', 'art.json');
const PORT = 8793;
const CDP = 9333;
const BASE = `http://127.0.0.1:${PORT}`;
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

// 15 个已实装英雄：取游戏内技能图标（键 = 游戏内 heroId）
const HEROES = [
  'panyue', 'chijin', 'niumo', 'xingli', 'fengling', 'yeque', 'mushroom',
  'xuesong', 'stone', 'scallion', 'paperboy', 'maggot', 'horseman', 'cow', 'monkey',
];
// 设计表里用到的全部立绘 id：实装英雄走 Se 管线，其余走卡丁车皮（kartSpec），
// 两者都经 __sfPortrait 出图 —— 同一套配色/取景/底板，风格才统一。
const ART_IDS = [
  'chijin', 'panyue', 'doll', 'fengling', 'yeque', 'boxtree', 'horseman', 'monkey',
  'cow', 'stone', 'panda', 'bear', 'coconut', 'kangaroo', 'skeleton', 'scallion',
  'boxman', 'niumo', 'mushroom', 'xingli', 'maggot', 'thunderdragon', 'paperboy',
  'slime', 'frog', 'magnet', 'bighead', 'girlhead',
];
const SLOTS = ['passive', 's1', 's2', 'ult'];
const BUFFS = [
  'stun', 'airborne', 'root', 'slow', 'silence', 'shield', 'haste', 'attack_speed',
  'dmg_reduction', 'untargetable', 'unstoppable', 'stasis', 'burn', 'recall', 'restore',
  'fountain', 'respawn_guard', 'frost_insight', 'ember_might', 'star_blessing',
  'panyue_passive', 'panyue_bulwark', 'mushroom_passive', 'chijin_ember', 'chijin_blaze',
  'chijin_spin', 'niumo_flame', 'niumo_ult', 'xingli_mark', 'fengling_gale', 'fengling_crit',
  'yeque_shadow', 'tower_focus', 'ad_up', 'ap_up', 'armor_up', 'mr_up', 'hp_regen', 'mana_regen',
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
  const profile = path.join(root, '.herocheck', 'profile-heroart');
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
  for (let i = 0; i < 100; i++) {
    if (await ev('typeof window.__sfPortrait === "function" && typeof window.__sfIcon === "function"')) {
      ok = true;
      break;
    }
    await sleep(250);
  }
  if (!ok) throw new Error('页面里的钩子没起来（dist/index.html 是不是旧的？）');

  fs.mkdirSync(OUT, { recursive: true });
  fs.mkdirSync(path.dirname(ART_JSON), { recursive: true });

  const icons = {};
  for (const id of HEROES) {
    icons[id] = {};
    for (const slot of SLOTS) {
      const svg = await ev(`window.__sfIcon(${JSON.stringify(id)}, ${JSON.stringify(slot)})`);
      if (typeof svg === 'string' && svg.startsWith('<svg')) icons[id][slot] = svg;
      else console.log(`  ✗ ${id}.${slot} 图标缺失`);
    }
  }

  // 立绘：全部走游戏内 __sfPortrait，实装英雄和卡丁车皮共用同一套风格化渲染
  for (const id of ART_IDS) {
    // 原图 640×832 的 PNG 有 700KB；设计表里最大只显示到 200px 宽，
    // 缩到 256×333 再转 webp，一张 40KB 左右。
    const url = await ev(
      `(async () => {
         const u = await window.__sfPortrait(${JSON.stringify(id)}, 640, 832);
         if (typeof u !== 'string' || !u.startsWith('data:image/png;base64,')) return null;
         const img = new Image();
         img.src = u;
         await img.decode();
         const c = document.createElement('canvas');
         c.width = 256; c.height = 333;
         const g = c.getContext('2d');
         g.imageSmoothingQuality = 'high';
         g.drawImage(img, 0, 0, c.width, c.height);
         return c.toDataURL('image/webp', 0.92);
       })()`,
      true,
    );
    if (typeof url === 'string' && url.startsWith('data:image/webp;base64,')) {
      const buf = Buffer.from(url.slice(url.indexOf(',') + 1), 'base64');
      fs.writeFileSync(path.join(OUT, `${id}.webp`), buf);
      console.log(`  ✓ ${id.padEnd(13)} 立绘 ${(buf.length / 1024).toFixed(0)}KB`);
    } else {
      console.log(`  ✗ ${id} 没渲染出立绘`);
    }
  }

  const buffIcons = {};
  for (const id of BUFFS) {
    const svg = await ev(`window.__sfBuffIcon(${JSON.stringify(id)})`);
    if (typeof svg === 'string' && svg.startsWith('<svg')) buffIcons[id] = svg;
    else console.log(`  ✗ buff ${id} 图标缺失`);
  }
  console.log(`  ✓ buff 图标 ${Object.keys(buffIcons).length}/${BUFFS.length}`);

  fs.writeFileSync(ART_JSON, JSON.stringify({ icons, buffIcons }));
  console.log(`\n完成: 立绘 → dist/images/hero/，图标 → .kart/art.json`);
  ws.close();
  cleanup(0);
};

main().catch((e) => {
  console.error('✗', e.message);
  cleanup(1);
});
