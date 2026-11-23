// 临时排错脚本：把选将页每个英雄都点一遍、再进战场放技能，抓异常栈
import fs from 'node:fs';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 8791;
const CDP = 9231;
const BASE = `http://127.0.0.1:${PORT}`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const up = async (u) => {
  try {
    return !!(await fetch(u));
  } catch {
    return false;
  }
};
const spawned = [];
const kill = () => {
  for (const c of spawned.reverse()) {
    try {
      if (process.platform === 'win32') spawnSync('taskkill', ['/PID', String(c.pid), '/T', '/F'], { stdio: 'ignore' });
      else c.kill('SIGKILL');
    } catch {}
  }
};

const errors = [];
async function main() {
  if (!(await up(`${BASE}/dist/index.html`))) {
    const py = spawn(process.platform === 'win32' ? 'python' : 'python3', ['-m', 'http.server', String(PORT)], {
      cwd: root,
      stdio: 'ignore',
    });
    spawned.push(py);
    for (let i = 0; i < 40 && !(await up(`${BASE}/dist/index.html`)); i++) await sleep(250);
  }
  const CHROME = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'].find(
    (p) => fs.existsSync(p),
  );
  const profile = path.join(root, '.herocheck/profile');
  fs.mkdirSync(profile, { recursive: true });
  const ch = spawn(
    CHROME,
    ['--headless=new', '--mute-audio', '--disable-gpu', `--remote-debugging-port=${CDP}`, `--user-data-dir=${profile}`, '--window-size=1088,615', 'about:blank'],
    { stdio: 'ignore' },
  );
  spawned.push(ch);
  for (let i = 0; i < 60 && !(await up(`http://127.0.0.1:${CDP}/json/version`)); i++) await sleep(250);

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
      return;
    }
    if (m.method === 'Runtime.exceptionThrown') {
      const d = m.params.exceptionDetails;
      const desc = d.exception?.description || d.text;
      errors.push(desc.split('\n').slice(0, 6).join('\n'));
    }
  });
  await new Promise((r) => ws.addEventListener('open', r));
  const send = (method, params = {}) =>
    new Promise((res) => {
      const i = ++id;
      pending.set(i, res);
      ws.send(JSON.stringify({ id: i, method, params }));
    });
  const ev = async (expr) => {
    const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: false });
    if (r.result?.exceptionDetails) return { __err: r.result.exceptionDetails.exception?.description || r.result.exceptionDetails.text };
    return r.result?.result?.value;
  };

  await send('Runtime.enable');
  await send('Page.enable');
  await send('Network.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  // 模拟窄屏（预览面板里的宽度）
  const NARROW = process.argv.includes('--narrow');
  if (NARROW) await send('Emulation.setDeviceMetricsOverride', { width: 430, height: 780, deviceScaleFactor: 1, mobile: false });
  const TARGET = process.argv.includes('--modular') ? `${BASE}/modular/index.html` : `${BASE}/dist/index.html`;
  console.log('打开', TARGET);
  await send('Page.navigate', { url: TARGET });
  await sleep(6000);

  await ev(`(()=>{const b=[...document.querySelectorAll('button,div,a,span')].find(x=>(x.textContent||'').trim()==='开始对战'); b&&b.click(); return !!b;})()`);
  for (let i = 0; i < 40; i++) {
    const n = await ev(`document.querySelectorAll('[data-hero]').length`);
    if (n > 0) break;
    await sleep(500);
  }
  const heroes = await ev(`[...document.querySelectorAll('[data-hero]')].map(e=>e.dataset.hero)`);
  console.log('卡片:', heroes);
  for (const h of heroes || []) {
    await ev(`(()=>{const e=document.querySelector('[data-hero="${h}"]'); e&&e.click(); return 1;})()`);
    await sleep(1200);
    console.log(`· 点击 ${h} → 异常数 ${errors.length}`);
  }
  // 再逐个 hover 一遍
  for (const h of heroes || []) {
    await ev(`(()=>{const e=document.querySelector('[data-hero="${h}"]'); if(!e) return 0;
      e.dispatchEvent(new PointerEvent('pointerenter',{bubbles:true}));
      e.dispatchEvent(new MouseEvent('mouseenter',{bubbles:true}));
      return 1;})()`);
    await sleep(600);
  }
  console.log(`hover 完成 → 异常数 ${errors.length}`);

  // 进战场
  await ev(`(()=>{const b=[...document.querySelectorAll('button,div,a,span')].find(x=>(x.textContent||'').trim()==='开始对战'); b&&b.click(); return !!b;})()`);
  await sleep(9000);
  console.log('战场异常数:', errors.length);

  // 战场压力测试：反复放技能 + 打死自己 + 复活
  const U = `window.__moba.world.byId.get(window.__moba.state.playerId)`;
  await ev(`(()=>{const u=${U}; if(!u) return 0; u.level=15; for(const k of ['s1','s2','ult']) u.skills[k].level=3; u.mana=99999; return 1;})()`);
  for (let round = 0; round < 6; round++) {
    for (const slot of ['s1', 's2', 'ult']) {
      await ev(`(()=>{const w=window.__moba.world,u=${U}; if(!u) return 0;
        u.skills['${slot}'].cd=0; u.rt.lockUntil=0;
        w.command(u.id,{type:'cast',slot:'${slot}',dir:{x:1,y:0},pos:{x:u.pos.x+6,y:u.pos.y}}); return 1;})()`);
      await sleep(700);
    }
    console.log(`  回合 ${round + 1} 放完 → 异常 ${errors.length}`);
  }
  // 真实键盘输入（走 UI 路径，而不是 world.command）
  const keyMap = { q: ['KeyQ', 81], w: ['KeyW', 87], e: ['KeyE', 69], r: ['KeyR', 82] };
  for (let i = 0; i < 4; i++) {
    for (const [k, [code, vk]] of Object.entries(keyMap)) {
      await send('Input.dispatchKeyEvent', { type: 'keyDown', key: k, code, windowsVirtualKeyCode: vk, nativeVirtualKeyCode: vk });
      await send('Input.dispatchKeyEvent', { type: 'keyUp', key: k, code, windowsVirtualKeyCode: vk, nativeVirtualKeyCode: vk });
      await sleep(450);
    }
    console.log(`  键盘第 ${i + 1} 轮 → 异常 ${errors.length}`);
  }

  // 把界面上所有带 title / aria-label 的按钮点一遍（设置、帮助、暂停等）
  const btns = await ev(`(()=>{const a=[...document.querySelectorAll('button,[role=button],[title],[aria-label]')]
    .filter(e=>e.offsetParent!==null).map((e,i)=>({i,label:(e.getAttribute('aria-label')||e.title||e.textContent||'').trim().slice(0,12)})).slice(0,24); return JSON.stringify(a);})()`);
  const btnList = btns && !btns.__err ? JSON.parse(btns) : [];
  for (const b of btnList) {
    await ev(`(()=>{const a=[...document.querySelectorAll('button,[role=button],[title],[aria-label]')].filter(e=>e.offsetParent!==null);
      const e=a[${b.i}]; if(!e) return 0; e.click(); return 1;})()`);
    await sleep(500);
    if (errors.length) { console.log(`点击「${b.label}」后出现异常`); break; }
  }
  console.log('UI 按钮扫完 → 异常', errors.length);
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
  await sleep(400);

  // 死亡 / 复活
  await ev(`(()=>{const u=${U}; if(!u) return 0; u.hp=0; u.dead=!0; return 1;})()`);
  await sleep(3000);
  console.log('死亡后异常数:', errors.length);
  await sleep(4000);
  console.log('等待复活后异常数:', errors.length);

  if (errors.length) {
    console.log('\n===== 异常 =====');
    for (const e of [...new Set(errors)]) console.log(e + '\n---');
  } else console.log('\n没有异常');
  kill();
  process.exit(0);
}
main().catch((e) => {
  console.error(e);
  kill();
  process.exit(1);
});
