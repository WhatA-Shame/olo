// 一键验证某个英雄：起服务器 + 无头 Chrome，选将进战场，放三个技能，检查特效与错误
// 用法: node tools/herocheck.mjs <heroId> [--shots] [--modular] [--port 8787] [--cdp 9223]
//
// 退出码: 0 全通过 / 1 有失败项 / 2 环境起不来
import fs from 'node:fs';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { animReport } from './animcheck.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const heroId = argv.find((a) => !a.startsWith('--'));
if (!heroId) {
  console.error('用法: node tools/herocheck.mjs <heroId> [--shots] [--modular]');
  process.exit(2);
}
const shots = argv.includes('--shots');
// --anim=move：选将台直接预览指定动作（引擎侧读 ?anim=）
const ANIM = (argv.find((a) => a.startsWith('--anim=')) || '').split('=')[1] || '';
// --q=passive=1：往 URL 上再挂一串调试参数（选将台预览用）
const Q = (argv.find((a) => a.startsWith('--q=')) || '').slice(4);
const debug = argv.includes('--debug');
const ZOOM = argv.includes('--zoom');
// --close=x,y,w,h：选将台额外截一块放大 6 倍的小图，看手/武器细节
// --skin=frog：选将台点"占位皮"角色卡（技能包还是这个英雄的）
const SKIN = (argv.find((a) => a.startsWith('--skin=')) || '').split('=')[1] || '';
const CLOSE = (argv.find((a) => a.startsWith('--close=')) || '').split('=')[1] || '';
const CROP = (argv.find((a) => a.startsWith('--crop=')) || '').split('=')[1] || '';
// --open：放技能前先把英雄挪到一块空地。出生点在基地高台上，地面贴花类特效会被平台挡住
const OPEN = argv.includes('--open');
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
  // 静态检查 1：外部 GLB 的网格模块必须在加载时预热贴图解码。
  // 少了这一行，选将台会在解码完成前把立绘渲染进 j1 缓存，头像就是永久白模
  // （牛魔两套模型就是这么漏的：生成器模板里没有这行，手工补的时候漏掉了它们）。
  // 静态检查 2：占位图必须和真实贴图同尺寸 —— three 的 texStorage2D 是不可变存储，
  // 第一次上传按占位图尺寸分配，之后换图只走 texSubImage2D，尺寸对不上整张就被丢弃，
  // 模型永远停在占位色（这是"白模"的第二个成因，比第一个隐蔽得多）。
  const texSize = (buf, mime) => {
    if (mime === 'image/png') return [buf.readUInt32BE(16), buf.readUInt32BE(20)];
    for (let i = 2; i < buf.length - 9; ) {
      if (buf[i] !== 0xff) {
        i++;
        continue;
      }
      const mk = buf[i + 1];
      if (mk >= 0xc0 && mk <= 0xcf && mk !== 0xc4 && mk !== 0xc8 && mk !== 0xcc)
        return [buf.readUInt16BE(i + 7), buf.readUInt16BE(i + 5)];
      i += 2 + buf.readUInt16BE(i + 2);
    }
    return [0, 0];
  };
  const meshFiles = fs.readdirSync(path.join(root, 'src')).filter((f) => /^45-.+-mesh\.js$/.test(f));
  const srcOf = (f) => fs.readFileSync(path.join(root, 'src', f), 'utf8');
  const noWarm = meshFiles.filter((f) => !srcOf(f).includes('setTimeout(() => heroMap(), 0)'));
  ok('外部网格模块都预热贴图解码', noWarm.length === 0, noWarm.length ? `漏了 ${noWarm.join(', ')}` : `${meshFiles.length} 个模块`);
  const badSize = [];
  for (const f of meshFiles) {
    const s = srcOf(f);
    const w = /const TEX_W = (\d+)/.exec(s);
    const h = /TEX_H = (\d+)/.exec(s);
    const m = /tex: "data:image\/(jpeg|png);base64,([^"]+)"/.exec(s);
    if (!w || !h || !m) {
      badSize.push(`${f}(缺 TEX_W/TEX_H 或贴图)`);
      continue;
    }
    const [iw, ih] = texSize(Buffer.from(m[2], 'base64'), m[1]);
    if (+w[1] !== iw || +h[1] !== ih) badSize.push(`${f}(占位 ${w[1]}×${h[1]} ≠ 贴图 ${iw}×${ih})`);
  }
  ok('占位图尺寸和真实贴图一致', badSize.length === 0, badSize.length ? badSize.join('; ') : `${meshFiles.length} 个模块`);

  await ensureServer();
  await ensureChrome();
  const { ws, send, ev } = await connect();
  const shot = async (name, clip, scale = 2.4) => {
    if (!shots) return;
    fs.mkdirSync(SHOT_DIR, { recursive: true });
    const r = await send('Page.captureScreenshot', { format: 'jpeg', quality: 62, ...(clip ? { clip: { ...clip, scale } } : {}) });
    fs.writeFileSync(path.join(SHOT_DIR, `${heroId}-${name}.jpg`), Buffer.from(r.result.data, 'base64'));
  };
  // --zoom：战场截图裁到英雄附近再放大，方便看清模型细节（裁得比英雄大一圈，技能特效才不会被切掉）。
  // --crop=x,y,w,h,s：自己指定裁切框和放大倍数（战场相机是固定俯视，英雄基本钉在屏幕同一处，
  // 想把手/武器看清楚就用这个）。
  const shotHero = (name) => {
    if (!ZOOM) return shot(name);
    if (CROP) {
      const [x, y, w, h, s] = CROP.split(',').map(Number);
      return shot(name, { x, y, width: w, height: h }, s || 5);
    }
    return shot(name, { x: 300, y: 90, width: 700, height: 400 });
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
  const qs = [ANIM ? 'anim=' + ANIM : '', Q, 'dbg=1'].filter(Boolean).join('&');
  await send('Page.navigate', { url: URL_ + (qs ? (URL_.includes('?') ? '&' : '?') + qs : '') });
  await sleep(6000);
  if (!(await waitFor(`[...document.querySelectorAll('button,div,a,span')].some(e=>(e.textContent||'').trim()==='开始对战')`, '标题页', 45000)))
    fail('标题页没出来，页面可能报错了');
  await clickText('开始对战');
  const CARD = SKIN ? `[data-skin="${SKIN}"]` : `[data-hero="${heroId}"]`;
  if (!(await waitFor(`!!document.querySelector('${CARD}')`, '选将页', 30000)))
    fail(`选将页没有 ${CARD} 的卡片——英雄/占位皮没进花名册？ ` +
      (await ev(`JSON.stringify({n:document.querySelectorAll('[data-hero]').length, skins:document.querySelectorAll('[data-skin]').length, sel:!!document.querySelector('.sf-select__roster'), body:(document.body.innerText||'').slice(0,120)})`)));
  await sleep(400);

  // 花名册现在二十多张卡、要滚动，先把目标卡滚到可视区再量坐标，否则点空
  await ev(`(() => { const e=document.querySelector('${CARD}'); e && e.scrollIntoView({block:'center'}); })()`);
  await sleep(300);
  const box = await ev(`(() => { const e=document.querySelector('${CARD}'); const b=e.getBoundingClientRect();
    return JSON.stringify({x:Math.round(b.x+b.width/2),y:Math.round(b.y+b.height/2)}); })()`);
  const p = JSON.parse(box);
  await clickAt(p.x, p.y);
  await sleep(1000);
  const cls = await ev(`document.querySelector('${CARD}').className`);
  ok('选将卡片可点选', typeof cls === 'string' && /active|selected|chosen/i.test(cls), cls);
  // 外部 GLB 英雄的头像/立绘是异步解码贴图后重画的，等一会儿再截，否则截到的是白模
  await sleep(2200);
  // 立绘白模回归：外部 GLB 英雄的头像走「先渲染进 j1 缓存 → 贴图解码完再作废重画」。
  // 只要网格模块漏了「模块加载就预热解码」那一行，或漏了 __sfTextureReady 回调，
  // 头像就会永久停在 1×1 占位纯色上——截图上只是一块灰，肉眼很容易放过。这里直接数颜色。
  const port = await ev(`(() => {
    const img = document.querySelector('img[data-sf-portrait="${SKIN || heroId}"]');
    if (!img) return JSON.stringify({ err: 'no-img' });
    const w = img.naturalWidth, h = img.naturalHeight;
    if (!w || !h) return JSON.stringify({ err: 'no-size', src: (img.src || '').slice(0, 24) });
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const g = c.getContext('2d');
    g.drawImage(img, 0, 0);
    const d = g.getImageData(0, 0, w, h).data;
    const set = new Set();
    let n = 0, r = 0, gg = 0, b = 0;
    for (let i = 0; i < d.length; i += 4) {
      if (d[i + 3] < 200) continue;
      n++; r += d[i]; gg += d[i + 1]; b += d[i + 2];
      set.add(((d[i] >> 4) << 8) | ((d[i + 1] >> 4) << 4) | (d[i + 2] >> 4));
    }
    if (!n) return JSON.stringify({ err: 'all-transparent' });
    return JSON.stringify({ w, h, colors: set.size, avg: [Math.round(r / n), Math.round(gg / n), Math.round(b / n)] });
  })()`);
  let pt = null;
  try { pt = JSON.parse(port); } catch {}
  ok(
    '选将台头像/立绘不是白模',
    !!pt && !pt.err && pt.colors >= 8,
    pt ? (pt.err ? `读不到头像：${pt.err}` : `${pt.w}×${pt.h}，${pt.colors} 种颜色，均色 rgb(${pt.avg.join(',')})`) : String(port),
  );
  await shot('select');
  await shot('model', { x: 340, y: 130, width: 420, height: 340 });
  // --close=x,y,w,h：选将台再切一块更小的区域放大，专门看手/武器这种小细节
  if (CLOSE) {
    const [cx, cy, cw, ch, cs] = CLOSE.split(',').map(Number);
    fs.mkdirSync(SHOT_DIR, { recursive: true });
    const r = await send('Page.captureScreenshot', {
      format: 'jpeg',
      quality: 92,
      clip: { x: cx, y: cy, width: cw, height: ch, scale: cs || 6 },
    });
    fs.writeFileSync(path.join(SHOT_DIR, `${heroId}-close.jpg`), Buffer.from(r.result.data, 'base64'));
  }

  // --selectonly：截完选将台就退出。核对姿势/贴图这种"只看一眼"的活儿，
  // 不用把整局对战跑一遍（那一大段要一分多钟）。
  if (argv.includes('--selectonly')) {
    console.log(`\n选将台截图完成（${SHOT_DIR}），--selectonly 直接退出`);
    ws.close();
    await cleanup();
    return;
  }

  await clickText('开始对战');
  // 加载界面只存在一两秒：先读 DOM 核对人数/名单，再抓图
  const sawLoading = await waitFor(`!!document.querySelector('.sf-loading .sf-lcard')`, '加载界面', 6000);
  if (sawLoading) {
    const nm = await ev(`(() => { const g=(s)=>[...document.querySelectorAll(s)].map(e=>e.textContent.trim());
      return JSON.stringify({ blue:g('.sf-loading__team--blue .sf-lcard__name'), red:g('.sf-loading__team--red .sf-lcard__name') }); })()`);
    if (nm && !nm.__err) {
      const { blue, red } = JSON.parse(nm);
      ok('加载界面各 5 人（不是整本花名册）', blue.length === 5 && red.length === 5,
        `蓝 ${blue.length} 人 [${blue.join(' ')}] / 红 ${red.length} 人 [${red.join(' ')}]`);
    }
    if (shots) await shot('loading');
  }
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
  await shotHero('battle');

  // 阵容：双方各 5 人、AI 不是照抄玩家方、分路覆盖三条线 + 打野
  const lu = await ev(`(() => { const hs=window.__moba.world.heroes;
    const g=(t)=>({h:hs.filter(x=>x.team===t).map(x=>x.heroId), l:hs.filter(x=>x.team===t).map(x=>x.lane)});
    return JSON.stringify({b:g(0),r:g(1)}); })()`);
  if (lu && !lu.__err) {
    const { b, r } = JSON.parse(lu);
    ok('双方各 5 名英雄', b.h.length === 5 && r.h.length === 5, `蓝 ${b.h.length} / 红 ${r.h.length}`);
    ok('AI 阵容不是照抄玩家方', b.h.join(',') !== r.h.join(','), `蓝 [${b.h.join(' ')}] 红 [${r.h.join(' ')}]`);
    const cover = new Set(r.l);
    ok('AI 分路覆盖三线+打野', ['top', 'mid', 'bot'].every((k) => cover.has(k)), `红方分路 [${r.l.join(' ')}]`);
  }

  // 技能等级 / 蓝量 / 冷却 + 钩子
  const prep = await ev(`(() => { const w=window.__moba.world,u=${U};
    if(!w.__hcHook){ const orig=w.emit.bind(w); window.__hcFx=[]; window.__hcRej=[];
      // 施法被拒（等级/冷却/蓝量/无目标/被控）只会 emit 一个 reject 事件，不发特效，
      // 所以测试里"cd 仍是 0"要能读出原因，不然只能靠猜。
      w.emit=(e)=>{ if(e&&e.type==='fx') window.__hcFx.push(e.key);
        if(e&&e.type==='reject') window.__hcRej.push(e.reason); return orig(e); }; w.__hcHook=1; }
    window.__hcFx=[]; window.__hcRej=[]; window.__hcErr=[];
    window.addEventListener('error',e=>{ window.__hcErr.push(((e.error&&e.error.stack)||e.message||'').slice(0,300)); });
    // 蓝量留出余量：直接拉 99999 会被下一帧夹到上限，之后「技能消耗法力」就测不出来了
    u.mana=Math.round(u.stats.maxMana*0.7); u.hp=u.stats.maxHp; u.level=Math.max(u.level,12);
    for (const k of ['s1','s2','ult']) { u.skills[k].level=Math.max(1,u.skills[k].level); u.skills[k].cd=0; }
    u.rt.lockUntil=0;
    return JSON.stringify({hero:u.heroId,mana:u.mana,mx:u.stats.maxMana,levels:{s1:u.skills.s1.level,s2:u.skills.s2.level,ult:u.skills.ult.level}}); })()`);
  ok('技能已解锁、蓝量充足', !prep?.__err && /"s1":1/.test(prep || ''), String(prep));
  const mx0 = (() => { try { return JSON.parse(prep).mx || 0; } catch { return 0; } })();

  // 挑一个可行走方向
  const dir = await ev(`(() => { const w=window.__moba.world,u=${U};
    // 滚轮会一直滚到撞墙，所以要挑一条够长的空走廊
    let best=null, bestD=0;
    for (let i=0;i<24;i++){ const a=i*Math.PI/12, dx=Math.cos(a), dy=Math.sin(a);
      let d=0; for (const k of [3,6,9,12,15,18,21,24]) { if (!w.nav.isFree(u.pos.x+dx*k, u.pos.y+dy*k, 1)) break; d=k; }
      if (d>bestD) { bestD=d; best={x:+dx.toFixed(3),y:+dy.toFixed(3)}; } }
    return best && bestD>=9 ? JSON.stringify(best) : null; })()`);
  const dirArg = argOf('--dir', ''),
    d = dirArg
      ? (() => {
          const [x, y] = dirArg.split(',').map(Number);
          return { x, y };
        })()
      : dir && !dir.__err
        ? JSON.parse(dir)
        : { x: 1, y: 0 };
  console.log(`· 释放方向 (${d.x}, ${d.y})`);

  // --open：出生点在基地高台上，贴地特效会被平台盖住，先把英雄挪到走廊空地上再看
  if (OPEN) {
    const moved = await ev(`(()=>{const w=window.__moba.world,u=${U},d=${JSON.stringify(d)};
      const p={x:u.pos.x+d.x*16,y:u.pos.y+d.y*16};
      w.nav.nearestFree(p.x,p.y,u.rt.navR,p);
      u.pos.x=u.prevPos.x=p.x; u.pos.y=u.prevPos.y=p.y;
      try { w.grid.remove(u); w.grid.insert(u); } catch {}
      return JSON.stringify({x:+p.x.toFixed(1),y:+p.y.toFixed(1)}); })()`);
    console.log(`· 挪到空地 ${moved}`);
    await sleep(600);
  }

  const cast = async (slot, kind, dist = 11, tail = true) => {
    // 荆轲的大招是 target 型（必须给 targetId），发 pos/dir 会被直接判 no_target 静默拒绝。
    // 这里先问一次技能定义，是 target 型就挑最近的敌人、把人挪到射程内再指过去。
    const ctype = await ev(`(()=>{const u=${U};const s=u.h&&u.h.def&&u.h.def.skills&&u.h.def.skills["${slot}"];return s&&s.cast?s.cast.type:"?";})()`);
    if (slot === 'ult') console.log(`· ${slot} 施法类型 ${ctype}`);
    const expr =
      ctype === 'target'
        ? `(()=>{const w=window.__moba.world,u=${U}; u.skills["${slot}"].cd=0; u.rt.lockUntil=0;
            let best=null,bd=1e9;
            for(const o of w.units){ if(o.team===u.team||!o.alive||o.kind!=="hero") continue;
              const dd=Math.hypot(o.pos.x-u.pos.x,o.pos.y-u.pos.y); if(dd<bd){bd=dd;best=o;} }
            if(!best) { w.__hcTarget='none'; return 0; }
            if(bd>6){ u.pos.x=best.pos.x+3; u.pos.y=best.pos.y; }
            w.__hcTarget=best.id+':'+best.kind+':'+bd.toFixed(1);
            w.command(u.id,{type:"cast",slot:"${slot}",targetId:best.id}); return u.skills["${slot}"].cd;})()`
        : kind === 'pos'
          ? `(()=>{const w=window.__moba.world,u=${U}; u.skills.ult.cd=0; u.rt.lockUntil=0;
            const d=${JSON.stringify(d)};
            w.command(u.id,{type:"cast",slot:"${slot}",pos:{x:u.pos.x+d.x*${dist},y:u.pos.y+d.y*${dist}}}); return u.skills.${slot}.cd;})()`
          : `(()=>{const w=window.__moba.world,u=${U}; u.skills.${slot}.cd=0; u.rt.lockUntil=0;
            const d=${JSON.stringify(d)};
            w.command(u.id,{type:"cast",slot:"${slot}",dir:{x:d.x,y:d.y}}); return u.skills.${slot}.cd;})()`;
    const cd = await ev(expr);
    // 杯杯菇的滚轮只持续 ~1.2 秒「模拟时间」，无头浏览器里模拟跑得比真机快好几倍：
    // 两次 CDP 往返（几十毫秒真实时间）之间滚轮就可能已经收尾，外部轮询抓不到方向。
    // 所以方向采样必须在页面内按帧记录。转向验证完再把滚轮掰回原方向，
    // 让轨迹和以前一致（否则它会滚到别处，后面几十秒的动画检查全跟着遭殃）。
    if (slot === 's1' && heroId === 'mushroom') {
      await ev(`(()=>{const w=window.__moba.world,u=${U},D=${JSON.stringify(d)};
        const R=window.__hcRoll={n:0,s:[],dev:0,issued:false,back:false,stop:false};
        const tick=()=>{
          const dd=u.rt.dash;
          if(dd&&dd.anim==='roll'){
            R.n++; R.s.push([+dd.dirX.toFixed(3),+dd.dirY.toFixed(3)]);
            R.dev=Math.max(R.dev,Math.abs(dd.dirX-D.x),Math.abs(dd.dirY-D.y));
            if(!R.issued&&R.n>=2){ R.issued=true;
              // 取垂直方向里能走通的那一侧，发一个移动指令：滚轮应当跟着转向
              const c=[[-dd.dirY,dd.dirX],[dd.dirY,-dd.dirX]];
              let p=c[0];
              for(const k of c){ if(w.nav.isFree(u.pos.x+k[0]*6,u.pos.y+k[1]*6,1)){ p=k; break; } }
              w.command(u.id,{type:'moveTo',pos:{x:u.pos.x+p[0]*9,y:u.pos.y+p[1]*9}});
            }
            // 采样到偏转就够了，立刻把方向掰回原来那条走廊（偏转没出来就一直等，最多等 8 帧）
            if(!R.back&&(R.dev>0.15||R.n>=8)){ R.back=true;
              w.command(u.id,{type:'moveTo',pos:{x:u.pos.x+D.x*20,y:u.pos.y+D.y*20}});
            }
          }
          if(R.n<120&&!R.stop) requestAnimationFrame(tick); else R.stop=true;
        };
        requestAnimationFrame(tick); return 1;})()`);
    }
    if (argv.includes('--dump')) {
      await sleep(120);
      const dump = await ev(`(()=>{const k=window.__fxkit; if(!k) return 'no-kit';
        const d=k.decals, out=[];
        for(let i=0;i<d.hi;i++){ if(!d.used[i]) continue; const o=i*20;
          out.push({i, type:Math.round(d.data[o+6]), x:+d.data[o].toFixed(1), z:+d.data[o+2].toFixed(1),
            r:+d.data[o+3].toFixed(2), rot:+d.data[o+4].toFixed(2), asp:+d.data[o+5].toFixed(2),
            p0:+d.data[o+10].toFixed(2), p1:+d.data[o+11].toFixed(2),
            col:[d.data[o+12],d.data[o+13],d.data[o+14]].map(v=>+v.toFixed(2)),
            a:+d.data[o+15].toFixed(2),
            ucol:[d.data[o+16],d.data[o+17],d.data[o+18]].map(v=>+v.toFixed(2)),
            ua:+d.data[o+19].toFixed(2), mode:d.mode[i]});
        }
        return JSON.stringify(out);})()`);
      console.log(
        `· 贴花表(${slot}):`,
        dump,
        '| 状态:',
        await ev(`(()=>{const u=${U}; return JSON.stringify({rooted:!!u.rt.rooted, unstoppable:!!u.rt.unstoppable, buffs:u.buffs.map(b=>b.id)});})()`),
      );
    }
    // 立刻抓一帧：短命的特效（斩击、喷射）在 260ms 后基本就散了
    if (shots) await shotHero(`${slot}-now`);
    await sleep(260);
    // 长持续技能（滚轮/引导）会一直挂着，这里确认它真的进入了状态
    const state = await ev(`(()=>{const u=${U}; return JSON.stringify({
      dash: u.rt.dash ? u.rt.dash.anim : null, s2: !!u.rt.mushS2, anim: u.anim, mana: Math.round(u.mana),
      roll: window.__hcRoll ? {n:window.__hcRoll.n, dev:window.__hcRoll.dev, s:window.__hcRoll.s} : null });})()`);
    const st = JSON.parse(state && !state.__err ? state : '{}');
    const channeling = st.s2 === true;
    // 杯杯菇的 Q 冷却从滚动结束才开始算，刚放出来 cd 一定是 0，用"进入滚轮"当成功信号
    const rollStarted = heroId === 'mushroom' && slot === 's1' && (st.dash === 'roll' || (st.roll && st.roll.n > 0));
    const rej = await ev(`(window.__hcRej||[]).slice(-3).join(',')+(window.__moba.world.__hcTarget?' tgt='+window.__moba.world.__hcTarget:'')`);
    ok(
      `${slot} 释放成功`,
      (typeof cd === 'number' && cd > 0) || channeling || rollStarted,
      channeling
        ? '引导中（cd 由引导结束设置）'
        : rollStarted
          ? '滚轮中（cd 从滚动结束开始算）'
          : cd === 0
            ? `cd 仍是 0 = 被拒（${rej || '无 reject 事件，可能没排上队'}）`
            : `cd ${cd}`,
    );
    // 滚轮/持续引导是杯杯菇特有的，别的英雄不做这两条断言
    if (slot === 's1' && heroId === 'mushroom') ok('Q 进入滚轮状态', rollStarted, `dash=${st.dash} anim=${st.anim} 采样=${st.roll ? st.roll.n : 0} 帧`);

    if (slot === 's1' && heroId === 'mushroom') {
      // 方向数据来自页面内按帧采样（见 cast 里的 __hcRoll）：dev = 相对起手方向的最大偏转
      const s = (st.roll && st.roll.s) || [];
      const dev = (st.roll && st.roll.dev) || 0;
      const b = s[0] || null,
        a = s[s.length - 1] || null;
      ok('Q 可以控制方向', dev > 0.15, `dir ${b ? b.join(',') : '?'} → 偏转 ${dev.toFixed(2)}（${s.length} 帧采样，收尾回正 ${a ? a.join(',') : '?'}）`);
      if (shots) {
        await sleep(380);
        await shot('roll', { x: 0, y: 0, width: 1088, height: 615 });
        // 连拍三帧看清滚动姿态（侧滚应该是躺平了绕前进轴转，不是头朝前翻跟头）
        await shotHero('rollA');
        await sleep(110);
        await shotHero('rollB');
        await sleep(110);
        await shotHero('rollC');
      }
    }
    if (slot === 's2' && heroId === 'mushroom') ok('E 进入持续喷吐', st.s2 === true, `channel=${st.s2} anim=${st.anim}`);
    await shotHero(slot);
    // 收尾：结束冲刺/引导，避免影响下一个技能
    await ev(`(()=>{const u=${U}; u.rt.dash && (u.rt.dash.left=0); u.rt.mushS2=null; return 1;})()`);
    // 滚轮会把英雄带到走廊深处，玩家控制的英雄不会自己回防，
    // 后面几十秒的动画检查里可能被塔打死 → 这里只补血（不挪位置，位置会影响后续移动检查）
    // 滚轮会把英雄带到走廊深处（转向验证时更是滚到侧面），玩家控制的英雄不会自己回防，
    // 后面几十秒的动画检查里会被塔打死。这里把它放回"原本应该滚到的位置"——出生点在高台上，
    // 直接传回出生点反而会走不动路，所以沿原方向 12 米取一个可站立点。
    if (slot === 's1' && heroId === 'mushroom') {
      const back = await ev(`(()=>{const w=window.__moba.world,u=${U},D=${JSON.stringify(d)};
        u.rt.dash=null;  // 结束滚轮，tick 里会补上冷却
        const p={x:u.pos.x+D.x*12,y:u.pos.y+D.y*12};
        w.nav.nearestFree(p.x,p.y,u.rt.navR,p);
        u.pos.x=u.prevPos.x=p.x; u.pos.y=u.prevPos.y=p.y;
        try { w.grid.remove(u); w.grid.insert(u); } catch {}
        u.hp=u.stats.maxHp; u.mana=Math.max(u.mana,u.stats.maxMana*0.7);
        return JSON.stringify({x:+p.x.toFixed(1),y:+p.y.toFixed(1)});})()`);
      if (debug) console.log(`· 滚轮收尾，英雄放回 ${back}`);
    }
    await sleep(tail ? 900 : 0);
    if (slot === 's1' && heroId === 'mushroom') {
      const cd2 = await ev(`(()=>{const u=${U}; return +u.skills.s1.cd.toFixed(1);})()`);
      ok('Q 冷却从滚动结束才开始算', typeof cd2 === 'number' && cd2 > 5, `滚完 cd ${cd2}`);
    }
    return cd;
  };

  // 骨骼动画：puppet 挂在渲染器内部视图上，window 拿不到，改成离线解算校验
  {
    const r = animReport(heroId);
    if (r.detail.startsWith('找不到')) console.log(`· 跳过骨骼校验（${r.detail}）`);
    else ok('骨骼动画在动', r.ok, r.detail);
  }

  if (shots) {
    const kd = (type) => send('Input.dispatchKeyEvent', { type, key: 'w', code: 'KeyW', windowsVirtualKeyCode: 87, nativeVirtualKeyCode: 87 });
    await kd('keyDown');
    await sleep(650);
    await shotHero('run');
    await sleep(420);
    await shotHero('run2');
    await kd('keyUp');
    await sleep(260);
  }

  const before = await ev(`JSON.stringify(window.__hcFx)`);
  const mana0 = await ev(`${U}.mana`);
  await cast('s1');
  // 牛伟的被动「血怒」：放完技能 4 秒内下一斧变重斧（额外伤害 + 回血），
  // 动画那边靠这个 buff 把普攻换成劈砍（见 26-core-5.js 的 attack 分支 + 31-render-10.js 的 O.passive）。
  // buff 名字改了而渲染那边没跟着改的话，劈砍就永远不触发，所以在这儿钉一条。
  if (heroId === 'chijin') {
    await sleep(420);
    const bf = await ev(`(()=>{const u=${U}; return JSON.stringify(u.buffs.map((b)=>b.id));})()`);
    ok(
      '被动「血怒」挂上了（下一斧变重斧 → 播劈砍）',
      typeof bf === 'string' && bf.includes('chijin_ember'),
      `身上 buff: ${bf}`,
    );
  }
  // 无头浏览器里没有 vsync，模拟时间跑得比真实时间快得多：自然回蓝（~5/秒）能在两次 ev 往返之间
  // 就把 50 点的蓝耗抹平，读出来永远是「没扣」。所以这里做两件事：
  //   ① 蓝压到 90% 留出扣减空间；② 把 s2 的 cost 临时放大到 600，让扣蓝幅度远大于回蓝噪声。
  // 只对「有一次性蓝耗」的技能这么做（杯杯菇的 E 是按秒扣 manaPerSec，cost 为 0）。
  const cost0 = await ev(`${U}.skills.s2.cost`);
  const mm = await ev(`${U}.stats.maxMana`);
  const bigCost = typeof cost0 === 'number' && cost0 > 0;
  // 放大的蓝耗不能超过半管蓝，否则牛魔（maxMana 只有 420）会直接被判"蓝不够"而拒绝施放
  const bigVal = bigCost ? Math.min(600, Math.round(mm * 0.5)) : 0;
  await ev(`(()=>{const u=${U}; u.mana=Math.round(u.stats.maxMana*${bigCost ? 0.9 : 0.55});${bigCost ? ` u.skills.s2.cost=${bigVal};` : ''} return 1;})()`);
  const mana1 = await ev(`${U}.mana`);
  const p0 = await ev(`(()=>{const u=${U}; return JSON.stringify({x:+u.pos.x.toFixed(2),y:+u.pos.y.toFixed(2)});})()`);
  await cast('s2', undefined, undefined, heroId !== 'niumo');
  // E 是「引导期间持续消耗」：引导常常在两次 ev 往返之间就跑完，单点采样读到的是
  // 「引导结束 + 回蓝补回来」，看起来像反增。所以边推进边取最小值。
  let mana2 = mana1;
  for (let i = 0; i < 8; i++) {
    const m = await ev(`${U}.mana`);
    if (typeof m === 'number' && m < mana2) mana2 = m;
    await sleep(40);
  }
  // 牛魔 2 技能是「烈焰行军」：引导期间要自己持续往前走，而且玩家方向键改不了方向。
  // 注意无头浏览器里没有 vsync，模拟时间跑得比真实时间快得多（实测 2 秒引导几百毫秒就走完了），
  // 所以不能靠 sleep 卡在引导中间采样——改成两段确定性检查：
  //   ① 位移：从放技能前的快照到引导结束，确实往前挪了
  //   ② 拦截：把免操控窗口手动拉长，再发一个垂直方向的移动指令，人应该纹丝不动
  if (heroId === 'niumo' && p0 && !p0.__err) {
    const a = JSON.parse(p0);
    const p1 = await ev(`(()=>{const u=${U}; return JSON.stringify({x:+u.pos.x.toFixed(2),y:+u.pos.y.toFixed(2),ns:+((u.rt.noSteerUntil||0)).toFixed(2)});})()`);
    const b = p1 && !p1.__err ? JSON.parse(p1) : a;
    const adv = Math.hypot(b.x - a.x, b.y - a.y);
    ok('E 引导期间持续前进', adv > 0.5 && b.ns > 0, `前进 ${adv.toFixed(2)}（${a.x},${a.y} → ${b.x},${b.y}，免操控截止 ${b.ns}）`);
    const s0 = await ev(`(()=>{const w=window.__moba.world,u=${U};
      u.rt.noSteerUntil = w.state.time + 30;
      w.command(u.id,{type:"move",dir:{x:0,y:-1}});
      return JSON.stringify({x:+u.pos.x.toFixed(2),y:+u.pos.y.toFixed(2)});})()`);
    const z = s0 && !s0.__err ? JSON.parse(s0) : b;
    await sleep(500);
    const p2 = await ev(`(()=>{const u=${U}; return JSON.stringify({x:+u.pos.x.toFixed(2),y:+u.pos.y.toFixed(2),steer:+(u.rt.noSteerUntil-window.__moba.state.time).toFixed(1)});})()`);
    const c = p2 && !p2.__err ? JSON.parse(p2) : z;
    // 判据只看「垂直方向有没有被带偏」：沿原方向继续行军是正常的，被指令拽去 (0,-1) 才是 bug
    const drift = Math.abs(c.y - z.y);
    ok('E 引导期间玩家改不了方向', c.steer > 0 && drift < 0.2,
      `发移动指令(0,-1)后 y 位移 ${drift.toFixed(2)}（${z.x},${z.y} → ${c.x},${c.y}，免操控还剩 ${c.steer}s）`);
    await ev(`(()=>{const u=${U}; u.rt.noSteerUntil=0; return 1;})()`);
  }
  await sleep(600);
  const mdiag = await ev(`(()=>{const u=${U};return JSON.stringify({m:+u.mana.toFixed(1),mx:+u.stats.maxMana.toFixed(1),c:u.skills.s2.cost,cd:+u.skills.s2.cd.toFixed(1),t:+window.__moba.state.time.toFixed(2),lvl:u.level});})()`);
  mana2 = Math.min(mana2, await ev(`${U}.mana`));
  // 升级会把蓝补满，恰好落在采样窗口里就会读到"反增"，这种算跳过而不是失败
  const manaMax = await ev(`${U}.stats.maxMana`);
  const refilled = Math.abs(mana2 - manaMax) < 1 && Math.abs(mana1 - manaMax) > 5;
  // 采样窗口内升了级：上限涨了、蓝被补满（牛魔 420 → 1410），轮询拿到的最小值停在升级前，
  // 差值恒为 0，这种是测试环境的干扰而不是「没扣蓝」，直接跳过。
  const leveled = mx0 > 0 && manaMax > mx0 * 1.02;
  const spent = bigCost ? mana1 - mana2 > bigVal * 0.4 : mana2 < mana1;
  ok('E 持续消耗法力', leveled || (typeof mana2 === 'number' && spent) || refilled,
    `${Math.round(mana1)} → ${Math.round(mana2)}${(refilled || leveled) && !spent ? '（升级补满，跳过）' : ''}${bigCost ? `（cost 放大到 ${bigVal} 便于观测）` : ''} diag ${mdiag}`);
  if (heroId === 'mushroom')
    await ev(`(()=>{const u=${U}; u.__preUlt=JSON.stringify({x:+u.pos.x.toFixed(1),y:+u.pos.y.toFixed(1)}); return 1;})()`);
  await cast('ult', 'pos', heroId === 'mushroom' ? 46 : 11, heroId !== 'niumo');
  // 牛魔开大要换成变身形态的模型（hero:niumo2），靠 nB() 里写的调试钩子读回来。
  // 大招只有 10 秒模拟时间，无头浏览器里跑得飞快，所以必须紧接着采样（cast 传 tail=false）。
  if (heroId === 'niumo') {
    // __niumoKey 只在渲染帧里 nB() 被调用时才更新，cast 返回时那一帧可能还没跑；
    // 直接读会读到上一帧的旧值（表现为偶发失败），所以轮询到换模型为止。
    let mk = '';
    for (let i = 0; i < 20; i++) {
      mk = await ev(`(()=>{const u=${U};return JSON.stringify({k:(globalThis.__niumoKey||{})[u.id],b:(u.buffs||[]).map(b=>b.id+'@'+b.timeLeft.toFixed(1))});})()`);
      if (JSON.parse(mk).k === 'hero:niumo2') break;
      await sleep(100);
    }
    ok('开大后换成变身形态模型', JSON.parse(mk).k === 'hero:niumo2', mk);
    await sleep(900);
  }

  if (heroId === 'mushroom') {
    // 指令是排队执行的，蓄力状态出现时间不固定，轮询一会儿。
    // 无头浏览器没有 vsync，模拟时间跑得飞快：蓄力 0.55 秒可能一次轮询就过完，
    // 所以「z 和 peek 同时成立」不能只看最后一次采样，得记住轮询期间见过的最大值。
    let mu = 'none',
      zoom = 'none',
      zk = 0,
      zMax = 0,
      sawPeek = false;
    for (let i = 0; i < 14; i++) {
      if (mu === 'none')
        mu = await ev(`(()=>{const u=${U}; return u.rt.mushUlt ? JSON.stringify({x:+u.rt.mushUlt.x.toFixed(1),y:+u.rt.mushUlt.y.toFixed(1),r:+u.rt.mushUlt.radius.toFixed(1),left:+(u.rt.mushUlt.until-window.__moba.state.time).toFixed(2)}) : 'none';})()`);
      zoom = await ev(`(()=>{const r=window.__moba.renderer; const g=r&&r.engine&&r.engine.rig; return g?JSON.stringify({z:+g.zoomK.toFixed(2),w:+g.zoomWant.toFixed(2),peek:!!g.ultPeek}):'no-rig';})()`);
      try {
        const zo = JSON.parse(zoom);
        zk = zo.z;
        if (zo.z > zMax) zMax = zo.z;
        if (zo.peek && zo.z > 1.15) sawPeek = true;
      } catch {}
      if (sawPeek) break;
      await sleep(80);
    }
    ok('大招蓄力时镜头拉远', sawPeek, `zoom ${zoom}（峰值 ${zMax}，见过 peek=${sawPeek}）`);
    ok('大招进入蓄力并记录落点', typeof mu === 'string' && mu !== 'none', `${mu}`);
  }
  // 杯杯菇大招是全图跳，蓄力期间镜头会拉远——这里趁蓄力截一张，落地后再截一张
  if (heroId === 'mushroom' && shots) {
    await sleep(900);
    await shot('ultcharge');
  }
  if (heroId === 'mushroom') {
    // 轮询到落地那一刻再截图，冲击波只存在 0.4 秒
    for (let i = 0; i < 80; i++) {
      if ((await ev(`(()=>{const u=${U}; return !u.rt.mushUlt;})()`)) === true) break;
      await sleep(60);
    }
  } else await sleep(1800);
  // 持续型大招（牛魔这类 10 秒变身）要看 1.8 秒后的常态，不能只看爆发那一帧
  if (shots && heroId !== 'mushroom') await shotHero('ultlate');
  if (heroId === 'mushroom') {
    const mv = await ev(`(()=>{const u=${U}; return JSON.stringify({x:+u.pos.x.toFixed(1),y:+u.pos.y.toFixed(1),anim:u.anim});})()`);
    const p0 = await ev(`(()=>{const u=${U}; return u.__preUlt || null;})()`);
    ok('大招把英雄送到远处落点', typeof mv === 'string' && (()=>{ try { const o=JSON.parse(mv); if(!p0) return false; const q=JSON.parse(p0); return Math.hypot(o.x-q.x,o.y-q.y) > 20; } catch { return false; } })(), `落点 ${mv} 起点 ${p0}`);
  }
  if (heroId === 'mushroom' && shots) await shot('ultland');

  // 被动：普攻/技能都能叠层，叠满爆开时给自己等量护盾
  if (heroId === 'mushroom') {
    let maxStacks = 0,
      shieldSeen = 0,
      bursts = 0,
      prev = 0,
      firstD = -1,
      firstKind = '?';
    // 每轮重新挑最近的敌人：目标会走会死，锁死一个 id 很容易白跑
    for (let i = 0; i < 160; i++) {
      const r = await ev(`(()=>{const w=window.__moba.world,u=${U};
        let best=null,bd=1e9;
        for (const o of w.units) { if(!o.alive||o.team===u.team||o.kind==='tower'||o.kind==='core') continue;
          const d=Math.hypot(o.pos.x-u.pos.x,o.pos.y-u.pos.y); if(d<bd){bd=d;best=o;} }
        if(!best) return null;
        let st=0; for(const b of u.buffs) if(b.id==='mushroom_passive') st=Math.max(st,b.stacks);
        if (bd > 1.9) w.command(u.id,{type:"moveTo",pos:{x:best.pos.x,y:best.pos.y}});
        else w.command(u.id,{type:"attack",targetId:best.id});
        return JSON.stringify({st, sh:Math.round(u.shield), d:+bd.toFixed(1), kind:best.kind});})()`);
      if (!r || r.__err) break;
      const o = JSON.parse(r);
      if (firstD < 0) ((firstD = o.d), (firstKind = o.kind));
      maxStacks = Math.max(maxStacks, o.st);
      shieldSeen = Math.max(shieldSeen, o.sh);
      if (o.st === 0 && prev >= 5) bursts++;
      prev = o.st;
      if (bursts > 0 && shieldSeen > 0) break;
      await sleep(200);
    }
    // 护盾可能一眨眼就被对面打爆，补一条 shield 事件作为"确实给过盾"的旁证
    const fxs = await ev(`JSON.stringify(window.__hcFx||[])`);
    const sawShieldFx = typeof fxs === 'string' && /shield/.test(fxs);
    ok('被动能被普攻叠层', maxStacks >= 1, `最高 ${maxStacks} 层（目标 ${firstKind}，初始距离 ${firstD}）`);
    ok(
      '被动叠满爆开并给护盾',
      bursts > 0 && (shieldSeen > 0 || sawShieldFx),
      `爆开 ${bursts} 次，护盾峰值 ${shieldSeen}${sawShieldFx ? '（有 shield 事件）' : ''}`,
    );
  }

  // 前面的技能检查会把英雄丢到地图深处（滚轮转向、大招全图跳），之后它就杵在那儿不动，
  // 后面几十秒模拟时间里会被塔和小兵打死。这一段只验渲染侧的动作选择，跟生存无关，
  // 所以先挂一个"不死"保活：无敌 + 每 150ms 回满血。
  await ev(`(()=>{const u=${U};
    u.rt.untargetable=true; u.hp=u.stats.maxHp;
    if(window.__hcKeep) clearInterval(window.__hcKeep);
    window.__hcKeep=setInterval(()=>{ if(u.alive) u.hp=u.stats.maxHp; },150);
    return 1;})()`);
  // 另外，后面的 walkFor / 档位探测一律往 +x 走，一走走十几米；大招落点经常在墙角，
  // 原地顶墙就永远播不出"走"的动作。就近找一条 +x 方向够长的空地，每次检查前把英雄放回去，
  // 这样连续几轮走下来也不会漂到墙上（放回去后速度估计只脏一帧，等一下就好）。
  const spot = await ev(`(()=>{const w=window.__moba.world,u=${U},R=u.rt.navR;
    // 顺着 +x 能连续走多远（最多 40），越长越好：后面的走位检查会一路往 +x 推十几米
    const len=(x,y)=>{ let d=0; for(let k=2;k<=40;k+=2){ if(!w.nav.isFree(x+k,y,R)) break; d=k; } return d; };
    let best={x:u.pos.x,y:u.pos.y,d:len(u.pos.x,u.pos.y)};
    for(let r=4;r<=48&&best.d<40;r+=4) for(let i=0;i<16;i++){ const a=i*Math.PI/8;
      const x=u.pos.x+Math.cos(a)*r, y=u.pos.y+Math.sin(a)*r;
      if(!w.nav.isFree(x,y,R)) continue;
      const d=len(x,y); if(d>best.d) best={x,y,d};
      if(best.d>=40) break; }
    if(best.d<6) return null;
    u.pos.x=u.prevPos.x=best.x; u.pos.y=u.prevPos.y=best.y;
    try { w.grid.remove(u); w.grid.insert(u); } catch {}
    return JSON.stringify({x:+best.x.toFixed(1),y:+best.y.toFixed(1),run:best.d});})()`);
  console.log(`· 动作检查站位 ${spot}`);
  const SPOT = spot && spot !== 'null' ? spot : null;
  // 把英雄放回站位（不挪位置就只是普通赋值，navigrid 要同步，否则寻路会算错）
  const PLACE = `const w=window.__moba.world,u=${U},S=${SPOT || 'null'};
    if(S){ u.pos.x=u.prevPos.x=S.x; u.pos.y=u.prevPos.y=S.y;
      try { w.grid.remove(u); w.grid.insert(u); } catch {} }`;
  if (SPOT) await sleep(300); // 让渲染侧的速度估计把"瞬移"那一帧衰减掉

  // ── 动作档位与表情 ───────────────────────────────────────────
  // 这些都是纯渲染逻辑：state 里只有 anim='move'，到底播"小加速"还是"行走"是渲染侧按
  // 移速/减速算的，所以只能读 ?dbg=1 挂出来的 puppet.input（见 src/31-render-10.js 的 ANIM_DBG）。
  const dbgIn = async () => {
    // 注意只挑标量出来：puppet.input 里有循环引用，整个 JSON.stringify 会抛
    const r = await ev(`(()=>{const d=globalThis.__animDbg; if(!d) return 'none';
      const o=d.get(window.__moba.state.playerId); if(!o) return 'none';
      return JSON.stringify({m:o.modelKey,anim:o.anim,clip:o.clip,slow:o.slow,tier:o.tier,turn:o.turn,stopT:o.stopT});})()`);
    if (typeof r !== 'string' || r === 'none') return null;
    try {
      return JSON.parse(r);
    } catch {
      return { __raw: String(r).slice(0, 200) };
    }
  };
  // 一直往 +x 走，等渲染侧算稳（每次都先回到站位，避免几轮下来顶到墙上）
  const walkFor = async (ms) => {
    await ev(`(()=>{${PLACE}
      u.rt.lockUntil=0; w.command(u.id,{type:"move",dir:{x:1,y:0}});})()`);
    await sleep(ms);
    return dbgIn();
  };

  const idle = await dbgIn();
  // clip 只有 GLB 模型（47-kart.js）才会写，原生程序化英雄没有这个概念，
  // 涉及 clip 的断言对它们没有意义，跳过而不是判失败。
  const hasClip = !!idle && idle.clip !== undefined;
  const skip = (name, why) => console.log(`  · 跳过 ${name} — ${why}`);
  const okc = (name, pass, detail) => (hasClip ? ok(name, pass, detail) : skip(name, '原生程序化模型，没有 clip'));
  const dbgWhy = idle
    ? `模型 ${idle.m ?? '?'}｜anim ${idle.anim} clip ${idle.clip}`
    : await ev(`JSON.stringify({q:location.search,has:!!globalThis.__animDbg,
        size:globalThis.__animDbg?globalThis.__animDbg.size:-1,
        keys:globalThis.__animDbg?[...globalThis.__animDbg.keys()]:[],
        pid:window.__moba.state.playerId})`);
  ok('puppet 输入拿到了（?dbg=1）', !!idle, dbgWhy);
  if (idle) {
    const m1 = await walkFor(500);
    okc('常规移动用小加速', m1?.clip === 'accelS', `anim ${m1?.anim} → clip ${m1?.clip}（tier ${m1?.tier}）`);

    // 加速：直接把移速抬上去（渲染侧看的是"当前移速 / 基础移速"的比值，基础值在 rt.base 上）。
    // 升级/买装备会调 _o 重算属性把移速写回去，所以每轮都重设一次再读，别指望一次设完就稳。
    // 注意：档位是按「实际位移」算的，瞬移会让速度估计清零一帧，所以只在整轮开头落位一次，
    // 循环里绝不能再瞬移，否则永远读成 tier 0。
    await ev(`(()=>{const u=${U}; u.__hcSpd=u.stats.moveSpeed;})()`);
    const probeTier = async (mult, want) => {
      let last = null;
      await ev(`(()=>{${PLACE}
        const w=window.__moba.world,u=${U};
        const b=(u.rt&&u.rt.base&&u.rt.base.moveSpeed)||u.stats.moveSpeed;
        u.stats.moveSpeed=b*${mult};
        w.command(u.id,{type:"move",dir:{x:1,y:0}});})()`);
      await sleep(200); // 等速度估计把落位那一帧的 0 衰减掉
      for (let i = 0; i < 12; i++) {
        await ev(`(()=>{const w=window.__moba.world,u=${U};
          const b=(u.rt&&u.rt.base&&u.rt.base.moveSpeed)||u.stats.moveSpeed;
          u.stats.moveSpeed=b*${mult};
          w.command(u.id,{type:"move",dir:{x:1,y:0}});})()`);
        await sleep(80);
        last = await dbgIn();
        if (last && last.clip === want) break;
      }
      return last;
    };
    const m2 = await probeTier(1.7, 'accelL');
    okc('大加速时换大加速动作', m2?.clip === 'accelL', `clip ${m2?.clip}（tier ${m2?.tier}）`);
    const m3 = await probeTier(1.3, 'accelM');
    okc('中加速时换中加速动作', m3?.clip === 'accelM', `clip ${m3?.clip}（tier ${m3?.tier}）`);
    await ev(`(()=>{const u=${U}; u.stats.moveSpeed=u.__hcSpd;})()`);

    // 减速：挂一个减速 buff。渲染侧只要看到 id==='slow' 且 value>0 就改播"行走"
    await ev(`(()=>{const u=${U},t=window.__moba.state.time;
      u.buffs.push({id:'slow',sourceId:-1,timeLeft:6,duration:6,stacks:1,value:0.5,key:'hcdbg',maxStacks:1,startTime:t,tickInterval:0});})()`);
    const m4 = await walkFor(450);
    okc('被减速时改用行走动作', m4?.clip === 'walk', `clip ${m4?.clip}（slow ${m4?.slow}）`);
    // 原地删（别重新赋值，buffs 的引用别的地方还拿着）
    await ev(`(()=>{const u=${U};
      for(let i=u.buffs.length-1;i>=0;i--) if(u.buffs[i].key==='hcdbg') u.buffs.splice(i,1);})()`);

    // 表情：嘲讽 / 笑话 / 跳舞 / 庆祝
    await ev(`(()=>{const w=window.__moba.world,u=${U}; w.command(u.id,{type:"stop"});})()`);
    await sleep(300);
    await ev(`(()=>{const w=window.__moba.world,u=${U};
      w.command(u.id,{type:"emote",name:"taunt",dur:2});})()`);
    await sleep(400);
    // 命令是下一 tick 才处理的，别在同一个 ev 里读 u.anim
    const emoAnim = await ev(`(()=>{const u=${U}; return String(u.anim);})()`);
    const e1 = await dbgIn();
    okc(
      '表情命令能让角色播嘲讽',
      emoAnim === 'emote_taunt' && e1?.clip === 'emote_taunt',
      `state.anim ${emoAnim} → clip ${e1?.clip}`,
    );
    // 一走动就得把表情打断（不然拖着表情走路很怪）
    const e2 = await walkFor(400);
    ok('移动会打断表情', e2 && e2.anim !== 'emote_taunt', `anim ${e2?.anim} clip ${e2?.clip}`);

    // 右上角表情按钮：点一下要能弹出下拉
    const menu = await ev(`(()=>{const b=document.querySelector('.sf-hud__emote .sf-iconbtn');
      if(!b) return 'no-btn'; b.click();
      const w=document.querySelector('.sf-hud__emote');
      const items=[...document.querySelectorAll('.sf-hud__emote-item')].map(e=>e.textContent.trim());
      return JSON.stringify({open:!!w&&w.classList.contains('is-open'), items});})()`);
    let mo = null;
    try {
      mo = JSON.parse(menu);
    } catch {}
    ok('右上角有表情下拉（嘲讽/笑话/跳舞/庆祝）', mo?.open && mo.items?.length === 4, menu);
    if (shots) {
      await sleep(220);
      await shot('emote-menu');
    }
    await ev(`(()=>{const b=document.querySelector('.sf-hud__emote .sf-iconbtn'); b&&b.click();})()`);

    // Ctrl+1~4 快捷键。真浏览器里 Ctrl+1 会被拿去切标签页、页面收不到，所以只能合成事件验接线。
    await ev(`(()=>{const w=window.__moba.world,u=${U}; w.command(u.id,{type:"stop"});})()`);
    await sleep(250);
    await ev(`window.dispatchEvent(new KeyboardEvent('keydown',{code:'Digit3',key:'3',ctrlKey:true,bubbles:true}))`);
    await sleep(400);
    const hotAnim = await ev(`String(${U}.anim)`);
    ok('Ctrl+3 能放跳舞', hotAnim === 'emote_dance', `anim ${hotAnim}`);

    // 急停：从"走"切到"不动"的那一下开始计时
    await ev(`(()=>{const w=window.__moba.world,u=${U}; w.command(u.id,{type:"stop"});})()`);
    let stopSeen = -1;
    for (let i = 0; i < 12; i++) {
      const d = await dbgIn();
      if (d && d.stopT >= 0 && (stopSeen < 0 || d.stopT < stopSeen)) stopSeen = d.stopT;
      if (stopSeen >= 0) break;
      await sleep(60);
    }
    ok('停下来的瞬间播急停', stopSeen >= 0, `stopT 起点 ${stopSeen.toFixed(2)}s`);
  }

  // ── 商店：小件 → 中件 的合成 ──────────────────────────────────
  // 放在最后跑，免得给英雄塞装备后影响前面那些断言。
  if (argv.includes('--shop')) {
    const snap = async (expr) => {
      const r = await ev(expr);
      try {
        return JSON.parse(r);
      } catch {
        return null;
      }
    };
    await ev(`(()=>{const u=${U}; u.items.fill(null); u.gold=5000; u.autoBuy=false; return 1;})()`);
    // 金币有被动收入（补兵、时间收益），跨 eval 取差值会把收入算进来。
    // 所以"这一步花了多少"必须在同一次 eval 里前后夹住：command 是同步的，中间没有收入窗口。
    const buy = async (id) => {
      const r = await ev(`(()=>{const w=window.__moba.world,u=${U},g0=u.gold;
        w.command(u.id,{type:"buy",itemId:${JSON.stringify(id)}});
        return JSON.stringify({paid:Math.round(g0-u.gold), gold:Math.round(u.gold), items:u.items.slice()});})()`);
      await sleep(140);
      try {
        return JSON.parse(r);
      } catch {
        return null;
      }
    };
    const a1 = await buy('baton');
    const a2 = await buy('steel_pipe');
    ok('买两件小件（警棍 300 + 钢管 630）', a1?.paid === 300 && a2?.paid === 630, `分别花 ${a1?.paid} / ${a2?.paid}`);
    // 伸缩警棍 1000，组件已值 930 → 只该扣 70
    const a3 = await buy('police_baton');
    const combined = a3 && a3.items.filter((x) => x === 'police_baton').length === 1 && a3.items.filter((x) => x).length === 1;
    ok(
      '组件凑齐后合成伸缩警棍只付差价',
      a3?.paid === 70 && combined,
      `这一步扣 ${a3?.paid}（应 70），装备栏 ${JSON.stringify(a3?.items)}`,
    );
    // 出售返还 60%
    const a4 = await (async () => {
      const r = await ev(`(()=>{const w=window.__moba.world,u=${U},g0=u.gold;
        w.command(u.id,{type:"sell",index:0});
        return JSON.stringify({paid:Math.round(u.gold-g0), gold:Math.round(u.gold), items:u.items.slice()});})()`);
      await sleep(140);
      try {
        return JSON.parse(r);
      } catch {
        return null;
      }
    })();
    ok('出售合成件返还 60% 全价', a4?.paid === 600, `这一步返 ${a4?.paid}（应 600）`);
    // 鞋：拖鞋 + 棉袄 → 解放鞋，只付 710-400=310
    const b1 = await buy('padded_coat');
    const b2 = await buy('slippers');
    const b3 = await buy('liberation_shoes');
    ok(
      '鞋子也能走合成（拖鞋+棉袄→解放鞋）',
      b1 && b2 && b3?.paid === 310 && b3.items.includes('liberation_shoes'),
      `这一步扣 ${b3?.paid}（应 310），装备栏 ${JSON.stringify(b3?.items)}`,
    );
    // ── 装备主动：扣盆 / 骑走 / 开饭 ─────────────────────────────
    // 主动件是"多一个技能"，所以既要有冷却（挂在装备栏下标上），也要真的生效。
    // 这一段跑之前英雄已经挂了"不可选中 + 每 150ms 回满血"的保活，所以不会被塔打断。
    await ev(`(()=>{const u=${U}; u.items.fill(null); u.rt.itemCd.fill(0); u.gold=30000; u.autoBuy=false; return 1;})()`);
    const useActive = async (index, posExpr) => {
      await ev(`(()=>{const w=window.__moba.world,u=${U};
        w.command(u.id,{type:"item",index:${index},pos:${posExpr}}); return 1;})()`);
      await sleep(200);
      return snap(`(()=>{const u=${U}; return JSON.stringify({
        cd:+u.rt.itemCd[${index}].toFixed(1),
        buffs:u.buffs.map(b=>b.id),
        inv:u.invulnerable===true,
        hp:Math.round(u.hp),
        x:+u.pos.x.toFixed(1), y:+u.pos.y.toFixed(1)});})()`);
    };
    const c1 = await buy('steel_basin');
    const s1 = await useActive(0, 'null');
    ok(
      '不锈钢大盆：扣盆立刻无敌（不可选中 + 免伤）并进冷却',
      c1 && c1.items[0] === 'steel_basin' && s1 && s1.cd > 0 && s1.buffs.includes('stasis') && s1.inv,
      `cd ${s1?.cd}s 状态 ${s1?.buffs.join(',')} 免伤 ${s1?.inv}`,
    );
    // 状态栏装备格上的扇形冷却 + 数字键角标
    const dbgCd = await snap(`(()=>{const el=document.querySelectorAll('.sf-hud__st-items .sf-slot')[0];
      const i=el&&el.querySelector('.sf-hud__st-cd'), s=el&&el.querySelector('.sf-hud__st-sec');
      const u=${U}, box=document.querySelector('.sf-hud__st-items').getBoundingClientRect();
      return JSON.stringify({cls:el&&el.className, t:i?i.style.getPropertyValue('--t'):null, sec:s?s.textContent:null, cd:+u.rt.itemCd[0].toFixed(1),
        box:{x:Math.round(box.left),y:Math.round(box.top),w:Math.round(box.width),h:Math.round(box.height)}});})()`);
    console.log('  · 装备格冷却 DOM', JSON.stringify(dbgCd));
    await shot('active-cd', { x: 120, y: 415, width: 720, height: 110 }, 2.6);
    if (dbgCd?.box)
      await shot('active-cd-zoom', { x: Math.max(0, dbgCd.box.x - 4), y: Math.max(0, dbgCd.box.y - 4), width: dbgCd.box.w + 8, height: dbgCd.box.h + 8 }, 6);
    const c2 = await buy('e_bike');
    // 金身持续 2 秒、期间算"被控"，别的主动按不出来——等它结束再测传送
    await sleep(2300);
    // 传送要引导 2.5 秒，中途被控/下指令就断了。真打起来这事经常发生，
    // 所以给三次机会：只要有一次引导到底就算通过，三次全断才说明机制有问题。
    let chan = null,
      moved = -1;
    for (let k = 0; k < 3 && moved < 6; k++) {
      await ev(`(()=>{const u=${U}; u.rt.itemCd[1]=0; return 1;})()`);
      const from = await snap(`(()=>{const u=${U}; return JSON.stringify({x:u.pos.x,y:u.pos.y});})()`);
      const s2 = await useActive(1, '{x:u.pos.x+9,y:u.pos.y}');
      if (!chan) chan = s2;
      if (!s2 || !s2.buffs.includes('recall')) {
        await sleep(700);
        continue;
      }
      await sleep(3200);
      const to = await snap(`(()=>{const u=${U}; return JSON.stringify({x:u.pos.x,y:u.pos.y});})()`);
      if (from && to) moved = Math.hypot(to.x - from.x, to.y - from.y);
    }
    ok(
      '电动车：引导开始（复用回城的引导）并进冷却',
      c2 && c2.items[1] === 'e_bike' && chan && chan.cd > 0 && chan.buffs.includes('recall'),
      `cd ${chan?.cd}s 状态 ${chan?.buffs.join(',')}`,
    );
    ok('电动车：引导结束后真的落到落点附近', moved >= 6 && moved <= 13, `位移 ${moved.toFixed(1)} 米（应 ≈9）`);
    const c3 = await buy('big_pot');
    const s3 = await snap(`(()=>{const u=${U};
      u.hp=Math.round(u.stats.maxHp*0.4); const before=u.hp;
      window.__moba.world.command(u.id,{type:"item",index:2,pos:null});
      return JSON.stringify({before, after:Math.round(u.hp), cd:+u.rt.itemCd[2].toFixed(1)});})()`);
    ok(
      '大锅菜：治疗自己并进冷却',
      c3 && c3.items[2] === 'big_pot' && s3 && s3.after > s3.before && s3.cd > 0,
      `生命 ${s3?.before} → ${s3?.after}，cd ${s3?.cd}s`,
    );
    // ── 派生属性与新被动：哑铃 / 饭盒 ───────────────────────────
    // 哑铃按"最大生命 1.2%"加物攻。顺序敏感：_o() 里必须先算 maxHp 再算 ad，
    // 先算 ad 的话拿到的是上一帧的血量，换装/升级那一帧会少一截，所以这里量的是
    // "买完之后 ad 增量 == 买完之后 maxHp × 1.2%"。
    const dm = await snap(`(()=>{const w=window.__moba.world,u=${U};
      u.items.fill(null); u.rt.itemCd.fill(0); u.gold=30000; u.autoBuy=false;
      const ad0=u.stats.ad;
      w.command(u.id,{type:'buy',itemId:'dumbbell'});
      return JSON.stringify({ad0, has:u.items.includes('dumbbell')});})()`);
    await sleep(160);
    const dm2 = await snap(`(()=>{const u=${U};
      return JSON.stringify({ad:u.stats.ad, hp:u.stats.maxHp});})()`);
    const dAd = dm2 && dm ? dm2.ad - dm.ad0 : NaN,
      dWant = dm2 ? dm2.hp * 0.012 : NaN;
    ok(
      '哑铃：按最大生命 1.2% 加物攻',
      dm?.has && Math.abs(dAd - dWant) <= 2,
      `物攻 +${Number.isFinite(dAd) ? dAd.toFixed(1) : dAd}（血 ${dm2?.hp} × 1.2% = ${Number.isFinite(dWant) ? dWant.toFixed(1) : dWant}）`,
    );
    // 饭盒：挨打回蓝 15%、耗蓝回血 20%。直接喂钩子（伤害分发本身由铁丝网等被动覆盖），
    // 验的是数值接线：passive.value / value2 有没有真的读到。
    const lb = await snap(`(()=>{const w=window.__moba.world,u=${U};
      u.items.fill(null); u.rt.itemCd.fill(0);
      w.command(u.id,{type:'buy',itemId:'lunchbox'});
      return JSON.stringify({has:u.items.includes('lunchbox')});})()`);
    await sleep(160);
    const lb2 = await snap(`(()=>{const u=${U};
      const h=u.h.hooks.filter(x=>x.onManaSpent);
      u.mana=Math.round(u.stats.maxMana*0.4); const m0=u.mana;
      for(const x of h) x.onDamageTaken&&x.onDamageTaken(window.__moba.world,u,null,1000);
      const m1=u.mana;
      u.hp=Math.round(u.stats.maxHp*0.4); const h0=u.hp;
      for(const x of h) x.onManaSpent&&x.onManaSpent(window.__moba.world,u,1000);
      return JSON.stringify({hooks:h.length, dMana:m1-m0, dHp:u.hp-h0});})()`);
    ok(
      '饭盒：受伤 15% 回蓝、耗蓝 20% 回血',
      lb?.has && lb2?.hooks >= 1 && lb2.dMana === 150 && lb2.dHp >= 190 && lb2.dHp <= 210,
      `钩子 ${lb2?.hooks} 个，受伤 1000 → 蓝 +${lb2?.dMana}（应 150），耗蓝 1000 → 血 +${lb2?.dHp}（应 200）`,
    );
    await ev(`(()=>{const u=${U}; u.items.fill(null); u.rt.itemCd.fill(0); u.gold=0; u.autoBuy=true; return 1;})()`);
    // 商店面板本身：63 件装备、图标、合成路径都要能画出来
    if (shots) {
      await ev(`(()=>{const u=${U}; u.gold=3000;
        const b=document.querySelector('.sf-hud__st-shop'); b&&b.click();
        return 1;})()`);
      await sleep(500);
      await shot('shop-all', { x: 0, y: 0, width: 1088, height: 615 }, 1.6);
      // 选中一件中件，看详情面板里的"合成"那一行
      await ev(`(()=>{const c=document.querySelector('[data-item="police_baton"]'); c&&c.click(); return 1;})()`);
      await sleep(350);
      await shot('shop-recipe', { x: 0, y: 0, width: 1088, height: 615 }, 2.0);
      // 攻击分类：新加的小件/中件图标能不能画出来
      await ev(`(()=>{const t=[...document.querySelectorAll('.sf-tab')].find(e=>e.textContent.trim()==='攻击'); t&&t.click(); return 1;})()`);
      await sleep(400);
      await shot('shop-attack', { x: 0, y: 0, width: 1088, height: 615 }, 1.6);
      // 法术 / 防御：图标按"形制"分族，这两页最能看出同族有没有撞成一片
      await ev(`(()=>{const t=[...document.querySelectorAll('.sf-tab')].find(e=>e.textContent.trim()==='法术'); t&&t.click(); return 1;})()`);
      await sleep(400);
      await shot('shop-magic', { x: 0, y: 0, width: 1088, height: 615 }, 1.6);
      await ev(`(()=>{const t=[...document.querySelectorAll('.sf-tab')].find(e=>e.textContent.trim()==='防御'); t&&t.click(); return 1;})()`);
      await sleep(400);
      await shot('shop-defense', { x: 0, y: 0, width: 1088, height: 615 }, 1.6);
      // 辅助分类 + 主动装备的详情面板（主动那一块和被动分开显示）
      await ev(`(()=>{const t=[...document.querySelectorAll('.sf-tab')].find(e=>e.textContent.trim()==='辅助'); t&&t.click(); return 1;})()`);
      await sleep(400);
      // 先看急救箱：它的"护盾效率"是派生属性，得确认属性行真的画出来了
      await ev(`(()=>{const c=document.querySelector('[data-item="first_aid_kit"]'); c&&c.click(); return 1;})()`);
      await sleep(350);
      await shot('shop-shieldpower-detail', { x: 700, y: 180, width: 220, height: 190 }, 5);
      await ev(`(()=>{const c=document.querySelector('[data-item="steel_basin"]'); c&&c.click(); return 1;})()`);
      await sleep(350);
      await shot('shop-support', { x: 0, y: 0, width: 1088, height: 615 }, 1.6);
      await shot('shop-active-detail', { x: 700, y: 250, width: 220, height: 110 }, 5);
      await ev(`(()=>{const b=document.querySelector('.sf-hud__st-shop'); b&&b.click(); return 1;})()`);
    }
  }

  const fx = await ev(`JSON.stringify(window.__hcFx)`);
  const keys = JSON.parse(fx && !fx.__err ? fx : '[]');
  const beforeKeys = JSON.parse(before && !before.__err ? before : '[]');
  const fresh = keys.slice(beforeKeys.length);
  ok('发出了技能特效事件', fresh.length > 0, `${fresh.length} 个: ${[...new Set(fresh)].join(', ')}`);
  const unknown = fresh.filter((k) => !/^(mushroom|chijin|niumo|panyue|xingli|fengling|yeque|drake|hit_|heal|shield|level|respawn|recall|flash|gold|tower|core|monster|epic|buff)/.test(k));
  ok('特效键命名规范', unknown.length === 0, unknown.join(', '));

  const errs = await ev(`JSON.stringify({ game: (window.__moba.errors||[]).slice(-4), win: (window.__hcErr||[]).slice(0,3) })`);
  const e = JSON.parse(errs && !errs.__err ? errs : '{}');
  const last = await ev(`window.__lastErr ? window.__lastErr.msg + ' @ ' + window.__lastErr.where + '\\n' + (window.__lastErr.stack||'').split('\\n').slice(0,4).join('\\n') : ''`);
  const allErr = [...(e.game || []), ...(e.win || []), ...(typeof last === 'string' && last ? [last] : [])];
  ok('无运行时异常', allErr.length === 0, allErr.slice(0, 2).join(' | '));
  ok('对局未中断', (await ev(`!window.__moba.state.over`)) === true);

  await shotHero('after');
  ws.close();
  await cleanup();
};

main().catch((e) => {
  console.error('\n✗ 脚本异常:', e?.message || e);
  cleanup(2);
});
