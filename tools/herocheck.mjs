// 一键验证某个英雄：起服务器 + 无头 Chrome，选将进战场，放三个技能，检查特效与错误
// 用法: node tools/herocheck.mjs <heroId> [--shots] [--modular] [--port 8787] [--cdp 9223]
//
// 退出码: 0 全通过 / 1 有失败项 / 2 环境起不来
import fs from 'node:fs';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const heroId = argv.find((a) => !a.startsWith('--'));
if (!heroId) {
  console.error('用法: node tools/herocheck.mjs <heroId> [--shots] [--modular]');
  process.exit(2);
}
const shots = argv.includes('--shots');
const debug = argv.includes('--debug');
const modular = argv.includes('--modular');
const argOf = (k, d) => {
  const i = argv.indexOf(k);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : d;
};
const PORT = Number(argOf('--port', 8787));
const CDP = Number(argOf('--cdp', 9223));
const BASE = `http://127.0.0.1:${PORT}`;
const URL_ = modular ? `${BASE}/modular/index.html` : `${BASE}/dist/index.html`;
const SHOT_DIR = path.join(root, '.herocheck');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const results = [];
const ok = (name, pass, detail = '') => {
  results.push({ name, pass, detail });
  console.log(`${pass ? '  ✓' : '  ✗'} ${name}${detail ? ' — ' + detail : ''}`);
};
const fail = (msg) => {
  console.error(`\n✗ ${msg}`);
  cleanup(2);
};

// ---------- 环境 ----------
const spawned = [];
async function cleanup(code) {
  for (const c of spawned.reverse()) {
    try {
      if (process.platform === 'win32') spawnSync('taskkill', ['/PID', String(c.pid), '/T', '/F'], { stdio: 'ignore' });
      else c.kill('SIGKILL');
    } catch {}
  }
  const bad = results.filter((r) => !r.pass);
  if (code === 2 || results.length === 0) console.log('\n✗ 验证流程中断，未完成检查');
  else console.log(`\n${bad.length === 0 ? '全部通过' : `${bad.length} 项失败`} (${results.length} 项检查)`);
  process.exit(code ?? (bad.length === 0 ? 0 : 1));}
process.on('SIGINT', () => cleanup(2));

const http = async (url, opt) => {
  try {
    return await fetch(url, opt);
  } catch {
    return null;
  }
};
const up = async (url) => !!(await http(url));

async function ensureServer() {
  if (await up(`${BASE}/dist/index.html`)) return console.log('· 服务器已在运行');
  const py = spawn(process.platform === 'win32' ? 'python' : 'python3', ['-m', 'http.server', String(PORT)], {
    cwd: root,
    stdio: 'ignore',
  });
  spawned.push(py);
  for (let i = 0; i < 40; i++) {
    await sleep(250);
    if (await up(`${BASE}/dist/index.html`)) return console.log('· 已启动本地服务器');
  }
  fail('本地服务器起不来（端口被占？python 不在 PATH？）');
}

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].find((p) => fs.existsSync(p));

async function ensureChrome() {
  if (await up(`http://127.0.0.1:${CDP}/json/version`)) return console.log('· 无头浏览器已在运行');
  if (!CHROME) fail('找不到 Chrome，请手动指定路径');
  // 浏览器配置目录放在仓库内（.herocheck/profile），避免在 C 盘临时目录里堆积占满磁盘
  const profile = path.join(SHOT_DIR, 'profile');
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
    if (await up(`http://127.0.0.1:${CDP}/json/version`)) return console.log('· 已启动无头浏览器（静音）');
  }
  fail('无头浏览器起不来');
}

// ---------- CDP ----------
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
      return;
    }
    if (!debug) return;
    if (m.method === 'Runtime.exceptionThrown') {
      const d = m.params.exceptionDetails;
      console.log('  ! 异常:', d.text, d.exception?.description?.split('\n').slice(0, 3).join(' / ') || '');
    } else if (m.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(m.params.type)) {
      console.log('  ! 控制台:', (m.params.args || []).map((a) => a.value ?? a.description).join(' ').slice(0, 240));
    } else if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error') {
      console.log('  ! 日志:', m.params.entry.text.slice(0, 240));
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
    if (r.result?.exceptionDetails) return { __err: r.result.exceptionDetails.text };
    return r.result?.result?.value;
  };
  return { ws, send, ev };
}

const main = async () => {
  await ensureServer();
  await ensureChrome();
  const { ws, send, ev } = await connect();
  const shot = async (name, clip) => {
    if (!shots) return;
    fs.mkdirSync(SHOT_DIR, { recursive: true });
    const r = await send('Page.captureScreenshot', { format: 'jpeg', quality: 62, ...(clip ? { clip: { ...clip, scale: 2.4 } } : {}) });
    fs.writeFileSync(path.join(SHOT_DIR, `${heroId}-${name}.jpg`), Buffer.from(r.result.data, 'base64'));
  };
  const clickAt = async (x, y) => {
    for (const type of ['mousePressed', 'mouseReleased'])
      await send('Input.dispatchMouseEvent', { type, x, y, button: 'left', clickCount: 1 });
  };
  const clickText = async (text) => {
    const r = await ev(`(() => { const els=[...document.querySelectorAll('button,div,a,span')];
      const t=els.find(e=>(e.textContent||'').trim()===${JSON.stringify(text)});
      if(!t) return null; const b=t.getBoundingClientRect();
      return JSON.stringify({x:Math.round(b.x+b.width/2),y:Math.round(b.y+b.height/2)}); })()`);
    if (!r || r.__err) return false;
    const p = JSON.parse(r);
    await clickAt(p.x, p.y);
    return true;
  };
  const waitFor = async (expr, label, timeout = 30000) => {
    const t0 = Date.now();
    while (Date.now() - t0 < timeout) {
      if ((await ev(expr)) === true) return true;
      await sleep(100);
    }
    console.log(`  … 超时等待: ${label}`);
    return false;
  };
  const U = `window.__moba.world.byId.get(window.__moba.state.playerId)`;

  // 进战场
  await send('Runtime.enable');
  await send('Page.enable');
  await send('Log.enable');
  // 复用 profile 时浏览器会缓存 dist/index.html，必须关掉缓存，否则截到的是旧版本
  await send('Network.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Page.navigate', { url: URL_ });
  await sleep(6000);
  if (!(await waitFor(`[...document.querySelectorAll('button,div,a,span')].some(e=>(e.textContent||'').trim()==='开始对战')`, '标题页', 45000)))
    fail('标题页没出来，页面可能报错了');
  await clickText('开始对战');
  if (!(await waitFor(`!!document.querySelector('[data-hero="${heroId}"]')`, '选将页', 30000)))
    fail(`选将页没有 [data-hero="${heroId}"] 的卡片——英雄没进 kr 花名册？`);
  await sleep(400);

  const box = await ev(`(() => { const e=document.querySelector('[data-hero="${heroId}"]'); const b=e.getBoundingClientRect();
    return JSON.stringify({x:Math.round(b.x+b.width/2),y:Math.round(b.y+b.height/2)}); })()`);
  const p = JSON.parse(box);
  await clickAt(p.x, p.y);
  await sleep(1000);
  const cls = await ev(`document.querySelector('[data-hero="${heroId}"]').className`);
  ok('选将卡片可点选', typeof cls === 'string' && /active|selected|chosen/i.test(cls), cls);
  await shot('select');
  await shot('model', { x: 340, y: 130, width: 420, height: 340 });

  await clickText('开始对战');
  const inBattle = await waitFor(
    `(() => { const m=window.__moba; if(!m||!m.world||!m.state||m.state.playerId==null) return false;
      const u=m.world.byId.get(m.state.playerId); return !!(u && u.heroId===${JSON.stringify(heroId)}); })()`,
    '战场',
    30000,
  );
  const who = await ev(`(() => { const m=window.__moba; if(!m||!m.state) return 'no-state';
    const u=m.world&&m.world.byId.get(m.state.playerId); return u?u.heroId:'no-unit'; })()`);
  ok('进入战场且玩家英雄正确', inBattle && who === heroId, String(who));
  if (!inBattle || who !== heroId) {
    console.log('\n  提示: 选将页有倒计时，卡片没点中会自动随机。这条断言就是防止"测了别的英雄"。');
    await cleanup(1);
  }
  await sleep(2000);
  await shot('battle');

  // 技能等级 / 蓝量 / 冷却 + 钩子
  const prep = await ev(`(() => { const w=window.__moba.world,u=${U};
    if(!w.__hcHook){ const orig=w.emit.bind(w); window.__hcFx=[]; w.emit=(e)=>{ if(e&&e.type==='fx') window.__hcFx.push(e.key); return orig(e); }; w.__hcHook=1; }
    window.__hcFx=[]; window.__hcErr=[];
    window.addEventListener('error',e=>{ window.__hcErr.push(((e.error&&e.error.stack)||e.message||'').slice(0,300)); });
    u.mana=99999; u.hp=u.stats.maxHp; u.level=Math.max(u.level,12);
    for (const k of ['s1','s2','ult']) { u.skills[k].level=Math.max(1,u.skills[k].level); u.skills[k].cd=0; }
    u.rt.lockUntil=0;
    return JSON.stringify({hero:u.heroId,mana:u.mana,levels:{s1:u.skills.s1.level,s2:u.skills.s2.level,ult:u.skills.ult.level}}); })()`);
  ok('技能已解锁、蓝量充足', !prep?.__err && /"s1":1/.test(prep || ''), String(prep));

  // 挑一个可行走方向
  const dir = await ev(`(() => { const w=window.__moba.world,u=${U};
    for (let i=0;i<16;i++){ const a=i*Math.PI/8, dx=Math.cos(a), dy=Math.sin(a);
      let free=0; for (const d of [4,8,12]) if (w.nav.isFree(u.pos.x+dx*d, u.pos.y+dy*d, 1)) free++;
      if (free===3) return JSON.stringify({x:+dx.toFixed(3),y:+dy.toFixed(3)}); }
    return null; })()`);
  const d = dir && !dir.__err ? JSON.parse(dir) : { x: 1, y: 0 };
  console.log(`· 释放方向 (${d.x}, ${d.y})`);

  const cast = async (slot, kind) => {
    const expr =
      kind === 'pos'
        ? `(()=>{const w=window.__moba.world,u=${U}; u.skills.ult.cd=0; u.rt.lockUntil=0;
            const d=${JSON.stringify(d)};
            w.command(u.id,{type:"cast",slot:"${slot}",pos:{x:u.pos.x+d.x*11,y:u.pos.y+d.y*11}}); return u.skills.${slot}.cd;})()`
        : `(()=>{const w=window.__moba.world,u=${U}; u.skills.${slot}.cd=0; u.rt.lockUntil=0;
            const d=${JSON.stringify(d)};
            w.command(u.id,{type:"cast",slot:"${slot}",dir:{x:d.x,y:d.y}}); return u.skills.${slot}.cd;})()`;
    const cd = await ev(expr);
    await sleep(260);
    // 长持续技能（滚轮/引导）会一直挂着，这里确认它真的进入了状态
    const state = await ev(`(()=>{const u=${U}; return JSON.stringify({
      dash: u.rt.dash ? u.rt.dash.anim : null, s2: !!u.rt.mushS2, anim: u.anim, mana: Math.round(u.mana) });})()`);
    const st = JSON.parse(state && !state.__err ? state : '{}');
    const channeling = st.s2 === true;
    ok(
      `${slot} 释放成功`,
      (typeof cd === 'number' && cd > 0) || channeling,
      channeling ? '引导中（cd 由引导结束设置）' : cd === 0 ? 'cd 仍是 0 = 被静默拒绝（等级/锁定/蓝量）' : `cd ${cd}`,
    );
    if (slot === 's1') ok('Q 进入滚轮状态', st.dash === 'roll', `dash=${st.dash} anim=${st.anim}`);
    if (slot === 's1') {
      // 滚轮要能被移动指令改向：发一个垂直方向的移动指令，看冲刺方向是否跟着转
      const before = await ev(`(()=>{const u=${U}; const d=u.rt.dash; return d?JSON.stringify({x:+d.dirX.toFixed(2),y:+d.dirY.toFixed(2)}):null;})()`);
      await ev(`(()=>{const w=window.__moba.world,u=${U};
        w.command(u.id,{type:"moveTo",pos:{x:u.pos.x - 9, y:u.pos.y - 9}}); return 1;})()`);
      await sleep(420);
      const after = await ev(`(()=>{const u=${U}; const d=u.rt.dash; return d?JSON.stringify({x:+d.dirX.toFixed(2),y:+d.dirY.toFixed(2)}):null;})()`);
      const b = before && !before.__err ? JSON.parse(before) : null;
      const a = after && !after.__err ? JSON.parse(after) : null;
      const turned = !!(b && a && (Math.abs(a.x - b.x) > 0.15 || Math.abs(a.y - b.y) > 0.15));
      ok('Q 可以控制方向', turned, `dir ${b ? `${b.x},${b.y}` : '?'} → ${a ? `${a.x},${a.y}` : '?'}`);
    }
    if (slot === 's2') ok('E 进入持续喷吐', st.s2 === true, `channel=${st.s2} anim=${st.anim}`);
    await shot(slot);
    // 收尾：结束冲刺/引导，避免影响下一个技能
    await ev(`(()=>{const u=${U}; u.rt.dash && (u.rt.dash.left=0); u.rt.mushS2=null; return 1;})()`);
    await sleep(900);
    return cd;
  };

  const before = await ev(`JSON.stringify(window.__hcFx)`);
  const mana0 = await ev(`${U}.mana`);
  await cast('s1');
  const mana1 = await ev(`${U}.mana`);
  await cast('s2');
  await sleep(600);
  const mana2 = await ev(`${U}.mana`);
  ok('E 持续消耗法力', typeof mana2 === 'number' && mana2 < mana1, `${Math.round(mana1)} → ${Math.round(mana2)}`);
  await cast('ult', 'pos');
  await sleep(1800);

  const fx = await ev(`JSON.stringify(window.__hcFx)`);
  const keys = JSON.parse(fx && !fx.__err ? fx : '[]');
  const beforeKeys = JSON.parse(before && !before.__err ? before : '[]');
  const fresh = keys.slice(beforeKeys.length);
  ok('发出了技能特效事件', fresh.length > 0, `${fresh.length} 个: ${[...new Set(fresh)].join(', ')}`);
  const unknown = fresh.filter((k) => !/^(mushroom|chijin|panyue|xingli|fengling|yeque|drake|hit_|heal|shield|level|respawn|recall|flash|gold|tower|core|monster|epic)/.test(k));
  ok('特效键命名规范', unknown.length === 0, unknown.join(', '));

  const errs = await ev(`JSON.stringify({ game: (window.__moba.errors||[]).slice(-4), win: (window.__hcErr||[]).slice(0,3) })`);
  const e = JSON.parse(errs && !errs.__err ? errs : '{}');
  const allErr = [...(e.game || []), ...(e.win || [])];
  ok('无运行时异常', allErr.length === 0, allErr.slice(0, 2).join(' | '));
  ok('对局未中断', (await ev(`!window.__moba.state.over`)) === true);

  await shot('after');
  ws.close();
  await cleanup();
};

main().catch((e) => {
  console.error('\n✗ 脚本异常:', e?.message || e);
  cleanup(2);
});
