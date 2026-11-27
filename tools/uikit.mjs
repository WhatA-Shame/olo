// 从 dist/index.html 抓取「原版 UI」快照，生成 docs/ui-kit.html
// 用法: node tools/uikit.mjs
//
// 产物是一个可切换页面的单文件 HTML：
//   主界面 / 设置 / 操作说明 / 选人界面
// 样式直接取自运行时注入的 <style>（已经过 u→calc(var(--sf-u)*n) 与 color-mix 降级处理），
// 因此和游戏里的观感一致。改完把文件发回来，用 tools/uikit-apply.mjs 回灌。
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const BLOCK = new Set(
  'div nav header aside section article footer ul ol li table thead tbody tr td th h1 h2 h3 h4 h5 h6 p button label form'.split(' '),
);

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9499;
process.on('uncaughtException',(e)=>{console.error('UNCAUGHT',e);process.exit(9)});
process.on('unhandledRejection',(e)=>{console.error('REJECT',e);process.exit(8)});
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const profile = path.join(root, '.herocheck', 'profile-uikit');
fs.mkdirSync(profile, { recursive: true });

const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    '--disable-gpu',
    '--allow-file-access-from-files',
    '--hide-scrollbars',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`,
    '--window-size=1440,900',
    'about:blank',
  ],
  { stdio: 'ignore' },
);

let ws;
try {
  for (let i = 0; i < 80; i++) {
    await sleep(250);
    try {
      if (await fetch(`http://127.0.0.1:${PORT}/json/version`)) break;
    } catch {}
  }
  const targets = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json();
  const page = targets.find((t) => t.type === 'page');
  ws = new WebSocket(page.webSocketDebuggerUrl);
  let seq = 0;
  const pending = new Map();
  ws.addEventListener('message', (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) {
      pending.get(m.id)(m);
      pending.delete(m.id);
    }
  });
  await new Promise((r) => ws.addEventListener('open', r));
  const send = (method, params = {}) =>
    new Promise((res) => {
      const id = ++seq;
      pending.set(id, res);
      ws.send(JSON.stringify({ id, method, params }));
    });
  const ev = async (expression) => {
    const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (r.result.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails).slice(0, 800));
    return r.result.result.value;
  };

  console.log('[1] cdp connected');
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: 'file:///G:/github/olo/dist/index.html' });
  for (let i = 0; i < 60; i++) {
    await sleep(500);
    if (await ev("!!document.querySelector('.sf-home')")) break;
  }
  await sleep(2200);

  console.log('[2] home ready');
  // ── 主界面 ──────────────────────────────────────────────
  const backdropHome = await ev(`(() => {
    const c = document.querySelector('canvas.sf-backdrop');
    return c ? c.toDataURL('image/webp', 0.82) : '';
  })()`);

  const home = await ev(`(() => {
    const el = document.querySelector('.sf-screen.sf-home');
    const c = el.cloneNode(true);
    c.querySelectorAll('.has-gb').forEach((n) => n.classList.remove('has-gb'));
    c.querySelectorAll('.sf-btn--gb-entry, .sf-home__stats, .sf-gb-pill').forEach((n) => n.remove());
    c.querySelectorAll('[data-sf-gb-enhanced]').forEach((n) => n.removeAttribute('data-sf-gb-enhanced'));
    return c.outerHTML;
  })()`);

  console.log('[4] home', home.length);
  // ── 设置 ────────────────────────────────────────────────
  await ev(`(() => { [...document.querySelectorAll('.sf-home button')].find((b) => b.textContent.includes('设置')).click(); return true; })()`);
  await sleep(800);
  const settings = await ev(`(() => {
    const d = document.querySelector('.sf-dialog-scrim');
    return d ? d.outerHTML : '';
  })()`);
  await ev(`(() => { document.querySelector('.sf-dialog-scrim .sf-iconbtn--quiet').click(); return true; })()`);
  await sleep(600);

  console.log('[5] settings', settings.length);
  // ── 操作说明 ────────────────────────────────────────────
  await ev(`(() => { [...document.querySelectorAll('.sf-home button')].find((b) => b.textContent.includes('操作说明')).click(); return true; })()`);
  await sleep(800);
  // 三个标签页各抓一次内容；容器先换成占位，稍后按顺序塞回去
  const guidePanels = [];
  for (let i = 0; i < 3; i++) {
    await ev(`(() => {
      const tabs = [...document.querySelectorAll('.sf-dialog .sf-tab')];
      if (tabs[${i}]) tabs[${i}].click();
      return true;
    })()`);
    await sleep(350);
    guidePanels.push(
      await ev(`(() => {
        const howto = document.querySelector('.sf-dialog .sf-howto');
        return howto ? howto.lastElementChild.innerHTML : '';
      })()`),
    );
  }
  const guide = await ev(`(() => {
    const howto = document.querySelector('.sf-dialog .sf-howto');
    document.querySelectorAll('.sf-dialog .sf-tab')[0]?.click();
    howto.lastElementChild.outerHTML = '<div class="kit-tabpanels" data-kit-panels="1"></div>';
    return document.querySelector('.sf-dialog-scrim').outerHTML;
  })()`);
  await ev(`(() => { document.querySelector('.sf-dialog-scrim .sf-iconbtn--quiet').click(); return true; })()`);
  await sleep(600);

  console.log('[6] guide', guide.length, 'panels', guidePanels.map((x) => x.length).join('/'));
  // ── 选人 ────────────────────────────────────────────────
  await ev(`(() => { [...document.querySelectorAll('.sf-home button')].find((b) => b.textContent.includes('开始对战')).click(); return true; })()`);
  for (let i = 0; i < 40; i++) {
    await sleep(400);
    if (await ev("!!document.querySelector('.sf-select')")) break;
  }
  await sleep(2400);

  console.log('[7] select ready');
  const backdropSelect = await ev(`(() => {
    const c = document.querySelector('canvas.sf-backdrop');
    return c ? c.toDataURL('image/webp', 0.82) : '';
  })()`);

  console.log('[7a] backdropSelect', backdropSelect.length);
  // 立绘缩到 2 倍显示尺寸再转 webp：192² PNG ≈ 104KB/张，28 张就是 600KB
  // 分块跑，避免一次 evaluate 卡住渲染进程
  let portraitInfo = { count: 0, bytes: 0 };
  for (let from = 0; from < 28; from += 7) {
    const part = await ev(`(async () => {
      const imgs = [...document.querySelectorAll('.sf-hcard img')].slice(${from}, ${from + 7});
      const ready = (img) => (img.complete && img.naturalWidth)
        ? Promise.resolve()
        : new Promise((r) => {
            const t = setTimeout(r, 1200);
            img.addEventListener('load', () => { clearTimeout(t); r(); }, { once: true });
            img.addEventListener('error', () => { clearTimeout(t); r(); }, { once: true });
          });
      for (const img of imgs) {
        await ready(img);
        const c = document.createElement('canvas');
        c.width = c.height = 128;
        c.getContext('2d').drawImage(img, 0, 0, 128, 128);
        img.src = c.toDataURL('image/webp', 0.86);
      }
      return { count: imgs.length, bytes: imgs.reduce((n, i) => n + i.src.length, 0) };
    })()`);
    portraitInfo.count += part.count;
    portraitInfo.bytes += part.bytes;
  }
  console.log('[7b] portraits done');
  const select = await ev(`(() => {
    const el = document.querySelector('.sf-select');
    const c = el.cloneNode(true);
    const cv = c.querySelector('.sf-select__canvas');
    if (cv) {
      const ph = document.createElement('div');
      ph.className = 'kit-slot';
      ph.dataset.slot = '3d';
      ph.innerHTML = '<b>3D 立绘</b><small>576 × 684 · 实时渲染，非 UI</small>';
      cv.replaceWith(ph);
    }
    return c.outerHTML;
  })()`);

  console.log('[8] select', select.length);
  // ── 样式（选人页加载后再抓，才包含 sf-menu-select） ────────────────────────────────────────────────
  const styles = await ev(`(() => {
    const out = [];
    document.querySelectorAll('style').forEach((s) => {
      if (s.id === 'sf-community-style') return;      // 留言板扩展，不属于原版 UI
      if (!s.id && !out.length) return;                // 第一条无 id 的是启动占位样式
      if (!s.textContent.trim()) return;
      out.push({ id: s.id || 'inline', css: s.textContent });
    });
    return out;
  })()`);

  console.log('[3] styles', styles.length);
  // ── 组装 ────────────────────────────────────────────────
  const html = build({ styles, home, settings, guide, guidePanels, select, backdropHome, backdropSelect });
  const out = path.join(root, 'docs', 'ui-kit.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  try {
    fs.unlinkSync(out);
  } catch {}
  fs.writeFileSync(out, html);
  console.log(`完成 docs/ui-kit.html  ${(html.length / 1024).toFixed(0)} KB`);
  console.log('[9] portraits', JSON.stringify(portraitInfo));
  process.exit(0);
} finally {
  try {
    ws?.close();
  } catch {}
  chrome.kill('SIGTERM');
}

// ────────────────────────────────────────────────────────────

function build({ styles, home, settings, guide, guidePanels, select, backdropHome, backdropSelect }) {
  const css = styles
    .map((s) => `<style id="ui-${s.id.replace(/[^a-z0-9-]/gi, '')}">\n${s.css.trim()}\n</style>`)
    .join('\n');

  const fmt = (s) => pretty(s);
  const SOURCE = {
    home: 'src/35-ui-3.js · BH()',
    settings: 'src/34-ui-2.js · wH() / ny()',
    guide: 'src/35-ui-3.js · zH()',
    select: 'src/35-ui-3.js · RH()',
  };
  const card = (id, body) =>
    `<!-- ${id} ← ${SOURCE[id]} -->
    <section class="kit-screen" data-screen="${id}"${id === 'home' ? '' : ' hidden'}>
      <div class="sf-root">
        <div class="kit-backdrop" style="background-image:url('${id === 'select' ? backdropSelect : backdropHome}')"></div>
${id === 'settings' || id === 'guide' ? '        <div class="kit-underlay" data-underlay="home"></div>\n' : ''}${body}
      </div>
    </section>`;

  const panelNames = ['keys', 'touch', 'win'];
  const panelsHTML =
    '<div class="kit-tabpanels" data-kit-panels>' +
    guidePanels
      .map((h, i) => `<div class="kit-tabpanel" data-tab="${panelNames[i]}"${i ? ' hidden' : ''}>${h}</div>`)
      .join('') +
    '</div>';
  const guideWithPanels = guide.replace('<div class="kit-tabpanels" data-kit-panels="1"></div>', panelsHTML);

  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>星陨战纪 · UI Kit（原版快照）</title>
<!--
  ════════════════════════════════════════════════════════════════
  星陨战纪 Starfall · UI Kit
  ────────────────────────────────────────────────────────────────
  这是从游戏运行时抓下来的「原版 UI」静态快照，用于改版设计。

  结构：
    1. <style id="ui-*">      原版样式，按注入顺序排列，可直接改
    2. <nav class="kit-nav">  页面切换器（右下角小圆点，按 H 隐藏）
    3. <section class="kit-screen" data-screen="...">  四个页面

  四个页面：
    home      主界面（logo / 开始对战 / 新手引导 / 操作说明 / 设置）
    settings  设置弹窗（对战辅助 / 画面 / 声音）
    guide     操作说明弹窗
    select    选人界面（28 英雄花名册 / 立绘舞台 / 详情面板）

  交互：
    · 右下角切换器，或按 1 / 2 / 3 / 4；按 H 隐藏切换器
    · 主界面的三个按钮可直接跳到对应页面，弹窗右上角 × 回主界面
    · 操作说明的三个标签页可以点，内容都是真的

  约定：
    · 尺寸基准 --sf-u = 视口 / 1280×720，所有 12u 之类都换算成 calc(var(--sf-u)*12)
      改尺寸时请沿用 u，别写死 px，否则不同分辨率会错位
    · 3D 部分已替换成 <div class="kit-slot" data-slot="3d">，不属于 UI 范围
    · 背景是抓下来的一张静态图（.kit-backdrop），可随时替换
    · 页面标记来自源码，改的时候尽量保留类名，回灌时才好对位：
        home      src/35-ui-3.js  BH()
        settings  src/34-ui-2.js  wH()
        guide     src/35-ui-3.js  zH()
        select    src/35-ui-3.js  RH()
  改完直接发回 docs/ui-kit.html，我会把差异回灌到 src/ 里。
  ════════════════════════════════════════════════════════════════
-->
<style>
/* ===== 仅用于本页：重置 + 页面切换器 ===== */
html,body{margin:0;height:100%;background:#070a14;overflow:hidden}
body{font-family:"PingFang SC","HarmonyOS Sans SC","Microsoft YaHei",system-ui,sans-serif;
     -webkit-font-smoothing:antialiased;-webkit-user-select:none;user-select:none}
.kit-screen{position:fixed;inset:0;overflow:hidden}
.kit-screen[hidden]{display:none}
.kit-backdrop{position:absolute;inset:0;background-position:center;background-size:cover;background-repeat:no-repeat}
.kit-backdrop::after{content:"";position:absolute;inset:0;background:radial-gradient(120% 90% at 50% 0%,rgba(6,10,22,.25),rgba(4,7,16,.72))}
.kit-slot{position:absolute;left:50%;top:52%;transform:translate(-50%,-50%);display:grid;place-items:center;gap:4px;
  width:min(34%,330px);aspect-ratio:576/684;border:1px dashed rgba(150,178,235,.24);border-radius:22px;
  background:rgba(8,13,31,.2);color:rgba(196,214,245,.6);text-align:center;pointer-events:none}
.kit-tabpanel[hidden]{display:none}
.kit-slot b{font-size:13px;font-weight:600;letter-spacing:.16em}
.kit-slot small{font-size:11px;letter-spacing:.08em;opacity:.7}
.kit-nav{position:fixed;right:16px;bottom:16px;z-index:9999;display:flex;align-items:center;gap:2px;
  padding:4px;border-radius:999px;background:rgba(10,16,34,.82);backdrop-filter:blur(12px);
  box-shadow:0 6px 24px rgba(0,0,0,.5),inset 0 0 0 1px rgba(150,178,235,.18);transition:opacity .18s;opacity:.55}
.kit-nav:hover{opacity:1}
.kit-nav.is-hidden{opacity:0;pointer-events:none}
.kit-nav__b{appearance:none;border:0;background:transparent;color:#8fa0c4;font:inherit;font-size:12px;
  letter-spacing:.06em;padding:7px 13px;border-radius:999px;cursor:pointer;white-space:nowrap;transition:.15s}
.kit-nav__b:hover{color:#dbe6ff;background:rgba(150,178,235,.1)}
.kit-nav__b[aria-current="true"]{color:#2b1a04;background:linear-gradient(180deg,#ffe7ad,#e0b160);font-weight:700}
.kit-nav__tag{padding:0 8px 0 10px;font-size:10px;letter-spacing:.14em;color:#56648a}
@media (max-width:640px){.kit-nav__b{padding:6px 9px;font-size:11px}.kit-nav__tag{display:none}}
</style>
${css}
</head>
<body>

${card('home', fmt(home))}
${card('settings', fmt(settings))}
${card('guide', fmt(guideWithPanels))}
${card('select', fmt(select))}

<nav class="kit-nav" id="kit-nav" aria-label="页面切换">
  <span class="kit-nav__tag">UI KIT</span>
  <button class="kit-nav__b" data-go="home" aria-current="true">主界面</button>
  <button class="kit-nav__b" data-go="settings">设置</button>
  <button class="kit-nav__b" data-go="guide">操作说明</button>
  <button class="kit-nav__b" data-go="select">选人</button>
</nav>

<script>
(() => {
  const nav = document.getElementById('kit-nav');
  const screens = [...document.querySelectorAll('.kit-screen')];
  const btns = [...nav.querySelectorAll('[data-go]')];
  const go = (id) => {
    screens.forEach((s) => (s.hidden = s.dataset.screen !== id));
    btns.forEach((b) => b.setAttribute('aria-current', String(b.dataset.go === id)));
    if (location.hash.slice(1) !== id) history.replaceState(null, '', '#' + id);
  };
  btns.forEach((b) => b.addEventListener('click', () => go(b.dataset.go)));
  // 主界面按钮直接跳页，弹窗关闭按钮回主界面
  document.querySelectorAll('.sf-screen.sf-home button').forEach((b) => {
    const t = b.textContent;
    if (t.includes('设置')) b.addEventListener('click', () => go('settings'));
    else if (t.includes('操作说明')) b.addEventListener('click', () => go('guide'));
    else if (t.includes('开始对战')) b.addEventListener('click', () => go('select'));
  });
  document.querySelectorAll('.kit-screen:not([data-screen="home"]) .sf-dialog-scrim .sf-iconbtn--quiet')
    .forEach((b) => b.addEventListener('click', () => go('home')));

  // 设置/说明页背后的主界面：运行时克隆一份，避免把同一段标记复制两遍
  const homeHTML = document.querySelector('.sf-screen.sf-home').outerHTML;
  document.querySelectorAll('[data-underlay="home"]').forEach((el) => (el.innerHTML = homeHTML));

  // 操作说明的三个标签页
  document.querySelectorAll('.kit-screen[data-screen="guide"] .sf-howto').forEach((howto) => {
    const tabs = [...howto.querySelectorAll('.sf-tab')];
    const panels = [...howto.querySelectorAll('.kit-tabpanel')];
    tabs.forEach((tab, i) =>
      tab.addEventListener('click', () => {
        tabs.forEach((t, j) => {
          t.classList.toggle('is-active', i === j);
          t.setAttribute('aria-selected', String(i === j));
        });
        panels.forEach((p, j) => (p.hidden = i !== j));
      }),
    );
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'h' || e.key === 'H') nav.classList.toggle('is-hidden');
    const i = '1234'.indexOf(e.key);
    if (i >= 0) go(screens[i].dataset.screen);
  });
  go((location.hash.slice(1) || 'home').replace(/[^a-z]/g, '') || 'home');
})();
</script>
</body>
</html>
`;
}

// 只对块级标签换行缩进；内联标签（span/i/b/small/svg…）一律保持在同一行，
// 否则会在文字之间插入空白，改变排版。
function pretty(html) {
  const tokens = html.replace(/>\s+</g, '><').match(/<[^>]*>|[^<]+/g) || [];
  let depth = 0;
  const out = [];
  for (const tok of tokens) {
    if (!tok) continue;
    const name = (tok.match(/^<\/?([a-zA-Z0-9-]+)/) || [])[1]?.toLowerCase() || '';
    const close = /^<\//.test(tok);
    const selfClose = /\/>$/.test(tok);
    const block = BLOCK.has(name);
    if (block && close) depth = Math.max(0, depth - 1);
    if (block) out.push('  '.repeat(depth) + tok);
    else if (out.length) out[out.length - 1] += tok;
    else out.push(tok);
    if (block && !close && !selfClose) depth++;
  }
  return out.join('\n');
}
