// 36-ui-4.js — ui｜36 个顶层语句｜65KB
// 对应 game.pretty.js 第 68807–70021 行
// 关键内容：
//   jH                    进度条不走缓动：加载的每一步都是同步的重活，两步之间主
//   XH                    蓝色方
//   ZH                    标题横幅 ── */
//   QH                    胜利
//   t$                    阵亡：去色层 + 面板 ── */
//   e$                    你已阵亡
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { rn } from './01-audio.js';
import { Nh, Se, lm, z0 } from './02-data.js';
import { AB, H8, Hf, Jn, Kx, M0, Sf, Wx, Xx, Zn, _e, po, qx, ro, z, za, zi } from './32-ui.js';
import { NB, PB, ln } from './33-data-2.js';
import { Ar, Ml, Po, Qx, S3, Tf, Vt, Zh, ey, hh, k3, kl, ks, rk, ty } from './34-ui-2.js';
import { WH, uk } from './35-ui-3.js';
import { kartSpec, lookId, setPlayerSkin } from './47-kart.js';

const jH = Jn(`
.sf-loading { display: grid; grid-template-rows: auto minmax(0, 1fr) auto; gap: 10u; padding: max(18u, var(--sf-safe-t)) max(36u, var(--sf-safe-r)) max(22u, var(--sf-safe-b)) max(36u, var(--sf-safe-l)); background: rgba(3, 6, 16, 0.5); }
.sf-loading__head { display: flex; flex-direction: column; align-items: center; gap: 3u; animation: sf-drop-in 0.6s var(--sf-ease-out) both; }
.sf-loading__head .sf-title { font-size: max(20px, 32u); letter-spacing: 0.4em; margin-right: -0.4em; }
.sf-loading__mode { display: flex; align-items: center; gap: 10u; font-size: var(--sf-fs-sm); letter-spacing: 0.24em; color: var(--sf-c-text-2); }
.sf-loading__mode i { width: 4px; height: 4px; transform: rotate(45deg); background: var(--sf-c-gold-300); }

.sf-loading__versus { display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); align-items: center; gap: 14u; min-height: 0; }
.sf-loading__team { display: flex; flex-direction: column; gap: 10u; min-width: 0; --team: var(--sf-c-blue); }
.sf-loading__team--red { --team: var(--sf-c-red); }
.sf-loading__team-name { display: flex; align-items: center; gap: 10u; margin: 0; font-weight: 800; font-size: var(--sf-fs-lg); letter-spacing: 0.24em; color: var(--team); text-shadow: 0 0 12u color-mix(in srgb, var(--team) 60%, transparent); }
.sf-loading__team-name small { font-weight: 500; font-size: var(--sf-fs-xs); letter-spacing: 0.12em; color: var(--sf-c-text-2); text-shadow: none; }
.sf-loading__team-name::after { content: ''; flex: 1; height: 1px; background: linear-gradient(90deg, var(--team), transparent); opacity: 0.7; }
.sf-loading__team--red .sf-loading__team-name { flex-direction: row-reverse; }
.sf-loading__team--red .sf-loading__team-name::after { background: linear-gradient(270deg, var(--team), transparent); }
.sf-loading__cards { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: max(5px, 10u); }

.sf-lcard {
  --hero: #8fe9ff;
  position: relative; aspect-ratio: 10 / 27; min-width: 0; border-radius: 7u; overflow: hidden; isolation: isolate;
  background: #0a1128; box-shadow: 0 0 0 1px rgba(8, 13, 31, 0.9), 0 0 0 max(1.5px, 2u) color-mix(in srgb, var(--team) 55%, #1c2f60), var(--sf-shadow-1);
  animation: sf-left-in 0.6s var(--sf-ease-out) both;
}
.sf-loading__team--red .sf-lcard { animation-name: sf-right-in; }
.sf-lcard__pic { position: absolute; inset: 0 0 24% 0; }
.sf-lcard__pic.sf-portrait > img { object-position: 50% 20%; }
.sf-lcard::before { content: ''; position: absolute; inset: 0; z-index: 1; background: linear-gradient(180deg, color-mix(in srgb, var(--team) 34%, transparent) 0, transparent 22%, transparent 46%, rgba(8, 13, 31, 0.94) 72%, #080d1f 100%); pointer-events: none; }
.sf-lcard::after { content: ''; position: absolute; left: 0; right: 0; top: 0; height: max(2px, 3u); z-index: 2; background: var(--team); box-shadow: 0 0 10u var(--team); }
.sf-lcard__tag { position: absolute; left: 50%; top: 7u; z-index: 3; transform: translateX(-50%); }
.sf-lcard__info { position: absolute; left: 0; right: 0; bottom: 0; z-index: 3; display: flex; flex-direction: column; align-items: center; gap: 2u; padding: 0 3u 9u; text-align: center; }
.sf-lcard__role { display: inline-flex; align-items: center; gap: 3u; height: max(18px, 22u); margin-bottom: 2u; padding: 0 7u 0 3u; border-radius: 99px; font-size: var(--sf-fs-xs); font-weight: 800; line-height: 1; letter-spacing: 0.08em; white-space: nowrap; color: #08101f; background: var(--role); box-shadow: 0 0 0 max(1.5px, 2u) #0a1128, 0 0 10u color-mix(in srgb, var(--role) 60%, transparent); }
.sf-lcard__role .sf-i { width: max(13px, 15u); height: max(13px, 15u); vertical-align: 0; }
.sf-lcard__name { font-weight: 800; font-size: max(13px, 19u); line-height: 1.2; letter-spacing: 0.12em; margin-right: -0.12em; color: var(--sf-c-text); white-space: nowrap; }
.sf-lcard__title { font-size: var(--sf-fs-xs); line-height: 1.3; color: var(--sf-c-text-3); white-space: nowrap; }
.sf-lcard__lane { display: inline-flex; align-items: center; gap: 3u; font-size: var(--sf-fs-xs); line-height: 1.3; color: var(--sf-c-text-2); white-space: nowrap; }
.sf-lcard__lane .sf-i { width: 1.15em; height: 1.15em; }
.sf-lcard.is-me { transform: translateY(-8u); box-shadow: 0 0 0 1px rgba(8, 13, 31, 0.9), 0 0 0 max(2px, 2.5u) var(--sf-c-gold-200), 0 0 26u rgba(255, 214, 130, 0.5), var(--sf-shadow-2); animation-name: sf-lcard-me; }
.sf-lcard.is-me::after { background: var(--sf-c-gold-200); box-shadow: 0 0 12u var(--sf-c-gold-200); }
.sf-lcard.is-me .sf-lcard__name { color: var(--sf-c-gold-100); }
@keyframes sf-lcard-me { from { opacity: 0; transform: translate(-28u, 0); } to { opacity: 1; transform: translateY(-8u); } }

.sf-loading__vs { position: relative; display: grid; place-items: center; width: max(64px, 108u); align-self: stretch; animation: sf-vs-in 0.7s 0.35s var(--sf-ease-spring) both; }
.sf-loading__vs::before, .sf-loading__vs::after { content: ''; position: absolute; left: 50%; width: 1px; height: 30%; background: linear-gradient(180deg, transparent, var(--sf-c-gold-300)); }
.sf-loading__vs::before { top: 6%; }
.sf-loading__vs::after { bottom: 6%; transform: scaleY(-1); }
.sf-loading__vs b { position: relative; font-family: var(--sf-font-num); font-weight: 900; font-style: italic; font-size: max(34px, 64u); line-height: 1; letter-spacing: 0.02em; padding: 0 0.12em; }
.sf-loading__vs span { position: absolute; width: max(70px, 128u); height: max(70px, 128u); border-radius: 50%; background: radial-gradient(circle, rgba(255, 214, 130, 0.38), rgba(255, 214, 130, 0) 68%); animation: sf-vs-pulse 2.4s ease-in-out infinite; }
@keyframes sf-vs-in { from { opacity: 0; transform: scale(2.2); } to { opacity: 1; transform: none; } }
@keyframes sf-vs-pulse { 0%, 100% { transform: scale(0.9); opacity: 0.7; } 50% { transform: scale(1.15); opacity: 1; } }

.sf-loading__foot { display: flex; flex-direction: column; align-items: center; gap: 10u; animation: sf-rise-in 0.6s 0.3s var(--sf-ease-out) both; }
.sf-loading__tip { display: block; min-height: 3em; margin: 0; max-width: 760u; font-size: var(--sf-fs-md); line-height: 1.5; color: var(--sf-c-text); text-align: center; text-shadow: 0 1px 4px rgba(0, 0, 0, 0.9); }
.sf-loading__tip .sf-i { margin-right: 0.4em; color: var(--sf-c-gold-300); }
.sf-loading__tip span { transition: opacity 0.35s linear; }
.sf-loading__tip.is-out span { opacity: 0; }
.sf-loading__bar { width: min(100%, 900u); display: grid; grid-template-columns: 1fr auto; gap: 6u 12u; align-items: baseline; }
.sf-loading__bar .sf-progress { grid-column: 1 / -1; }
/* 进度条不走缓动：加载的每一步都是同步的重活，两步之间主线程只让出一帧，缓动根本来不及播——百分比到了 100%，条还停在开头 */
.sf-loading__bar .sf-progress__fill, .sf-loading__bar .sf-progress__spark { transition: none; }
.sf-loading__label { font-size: var(--sf-fs-sm); letter-spacing: 0.1em; color: var(--sf-c-text-2); }
.sf-loading__pct { font-size: var(--sf-fs-lg); color: var(--sf-c-gold-200); }
.sf-loading-root.is-closing { animation: sf-fade-out 0.4s linear both; pointer-events: none; }

@media (max-height: 520px) and (orientation: landscape) {
  .sf-loading { gap: 6u; padding-top: max(8u, var(--sf-safe-t)); padding-bottom: max(10u, var(--sf-safe-b)); }
  .sf-loading__head { flex-direction: row; justify-content: center; gap: 18u; }
  .sf-loading__team { gap: 6u; }
  .sf-lcard { aspect-ratio: 10 / 19.5; }
  .sf-lcard__title { display: none; }
  .sf-lcard__info { padding-bottom: 6u; }
  .sf-loading__foot { gap: 5u; }
  .sf-loading__tip { min-height: 1.5em; font-size: var(--sf-fs-sm); }
}
@media (max-height: 520px) and (orientation: landscape) and (max-width: 780px) {
  .sf-loading { padding-left: max(16u, var(--sf-safe-l)); padding-right: max(16u, var(--sf-safe-r)); }
  .sf-loading__mode { letter-spacing: 0.08em; }
  .sf-loading__vs { width: 56px; }
  .sf-lcard { aspect-ratio: 10 / 18; }
  .sf-lcard__lane { display: none; }
  .sf-lcard__tag { top: 3px; }
  .sf-lcard__tag .sf-badge { height: 15px; padding: 0 4px; font-size: 10px; }
  .sf-lcard__role { height: 16px; padding: 0 5px 0 2px; font-size: 10px; letter-spacing: 0.02em; }
  .sf-lcard__role .sf-i { width: 12px; height: 12px; }
  .sf-lcard__name { font-size: 12px; letter-spacing: 0.04em; margin-right: 0; }
}
@media (orientation: portrait) {
  .sf-loading { padding-left: max(12u, var(--sf-safe-l)); padding-right: max(12u, var(--sf-safe-r)); }
  .sf-loading__versus { grid-template-columns: minmax(0, 1fr); grid-template-rows: auto auto auto; align-content: center; gap: 6u; }
  .sf-loading__vs { width: auto; height: max(52px, 76u); }
  .sf-loading__vs::before, .sf-loading__vs::after { left: auto; top: 50%; bottom: auto; width: 34%; height: 1px; }
  .sf-loading__vs::before { left: 4%; background: linear-gradient(90deg, transparent, var(--sf-c-gold-300)); }
  .sf-loading__vs::after { right: 4%; transform: none; background: linear-gradient(270deg, transparent, var(--sf-c-gold-300)); }
  .sf-lcard { aspect-ratio: 10 / 24; }
  .sf-lcard__title { display: none; }
  .sf-loading__team--red .sf-loading__team-name { flex-direction: row; }
  .sf-loading__team--red .sf-loading__team-name::after { background: linear-gradient(90deg, var(--team), transparent); }
  /* 顶部那行字窄屏放不下：收紧字距，整段整段地换行 */
  .sf-loading__mode { flex-wrap: wrap; justify-content: center; gap: 2u 8u; letter-spacing: 0.08em; white-space: nowrap; }
}
`);

function qH(n, t, e, s, i, lnIn) {
  // t 可能是占位皮 id（frog/boxman…）：定位/分路/称号退回它借的那个英雄，名字用皮自己的
  const sp = kartSpec(t),
    a = Se[sp?.kit ?? t],
    nm = sp?.name ?? a.name,
    o = z("span", "sf-lcard__role", _e(Ar(a.role)), a.roleName),
    // 分路以对局阵容为准（AI 是自由分路），没给就退回推荐分路
    ln = lnIn || a.lane,
    r = z(
      "div",
      `sf-lcard${s ? " is-me" : ""}`,
      Zh(n, t, "sf-lcard__pic"),
      z("span", "sf-lcard__tag", s ? za("你", "me") : za("AI", "mute")),
      z(
        "span",
        "sf-lcard__info",
        o,
        z("span", "sf-lcard__name", nm),
        z("span", "sf-lcard__title", a.title),
        z("span", "sf-lcard__lane", _e(k3(ln)), S3[ln]),
      ),
    );
  return (
    r.setAttribute("aria-label", `${nm}，${a.title}`),
    r.style.setProperty("--hero", a.palette.glow),
    r.style.setProperty("--role", Tf[a.role]),
    (r.style.animationDelay = `${0.1 + (e === 0 ? i : 4 - i) * 0.07}s`),
    r
  );
}

function XH(n, t, e, lu) {
  // 玩家选的占位皮要在这里登记一次：后面加载卡、HUD 头像、战绩表、结算都靠 lookId() 查
  setPlayerSkin(t.skin ?? null);
  (Hf(), Zn("sf-menu-loading", jH));
  // 只列真实参战的 5 人，不是整本花名册；没传阵容时退回蓝/红各 5 个
  const roster = (y) => (y === 0 ? lu?.blue : lu?.red) || Ml.slice(0, 5),
    me = lu?.me || t.heroId;
  const s = (y) =>
      z(
        "section",
        `sf-loading__team sf-loading__team--${y === 0 ? "blue" : "red"}`,
        z(
          "h3",
          "sf-loading__team-name",
          y === 0 ? "蓝色方" : "红色方",
          z("small", null, y === 0 ? "我方" : `敌方 · AI ${hh[t.difficulty].label}`),
        ),
        z(
          "div",
          "sf-loading__cards",
          ...roster(y).map((v, _) => {
            const isMe = y === 0 && v === me;
            // 玩家选了角色皮：这张卡连头像带名字都换成皮的
            return qH(e, isMe ? lookId(v, !0) : v, y, isMe, _, (y === 0 ? lu?.blueLanes : lu?.redLanes)?.[_]);
          }),
        ),
      ),
    i = z("span"),
    a = z("p", "sf-loading__tip", _e(Vt("info")), i),
    o = z("span", "sf-loading__label", "正在准备战场…"),
    r = z("span", "sf-loading__pct sf-num", "0%"),
    l = AB(),
    c = z(
      "div",
      "sf-screen sf-loading",
      z(
        "header",
        "sf-loading__head",
        z("h2", "sf-title sf-metal", "星陨高原"),
        z(
          "p",
          "sf-loading__mode",
          "5v5 对战",
          z("i"),
          `你的英雄：${(() => {
            const sp = kartSpec(lookId(me, !0));
            return sp ? `${sp.name} · ${Se[sp.kit].roleName}` : z0(me);
          })()}`,
          z("i"),
          `对手难度：${hh[t.difficulty].label}`,
        ),
      ),
      z(
        "div",
        "sf-loading__versus",
        s(0),
        z("div", "sf-loading__vs", z("span"), z("b", "sf-metal", "VS")),
        s(1),
      ),
      z("footer", "sf-loading__foot", a, z("div", "sf-loading__bar", o, r, l.el)),
    ),
    f = z("div", "sf-root sf-loading-root", c),
    d = Kx(f, "menu");
  n.appendChild(f);
  const h = WH(ey());
  let u = (Ml.indexOf(t.heroId) * 5 + Math.floor(Math.random() * h.length)) % h.length;
  i.textContent = h[u];
  let m = 0;
  const x = window.setInterval(() => {
    (a.classList.add("is-out"),
      (m = window.setTimeout(() => {
        ((u = (u + 1) % h.length), (i.textContent = h[u]), a.classList.remove("is-out"));
      }, 360)));
  }, 4200);
  let p = !1,
    g = 0;
  return {
    setProgress(y, v) {
      p ||
        ((g = Math.max(g, Math.max(0, Math.min(1, y)))),
        l.set(g),
        (r.textContent = `${Math.round(g * 100)}%`),
        v && (o.textContent = v));
    },
    close() {
      p ||
        ((p = !0),
        window.clearInterval(x),
        window.clearTimeout(m),
        f.classList.add("is-closing"),
        window.setTimeout(() => {
          (d.dispose(), f.remove());
        }, 400));
    },
  };
}

const P4 = 3,
  mk = 16;

function YH(n) {
  const t = ((n - P4) / (mk - P4)) * 10;
  return Math.max(0, Math.min(10, t)).toFixed(1);
}

function KH(n) {
  const t = new Map(),
    e = Math.max(1, (n.endTime ?? n.time) / 60);
  for (const s of [0, 1]) {
    const i = n.heroes.filter((f) => f.team === s),
      a = (f) =>
        Math.max(
          1,
          i.reduce((d, h) => d + f(h), 0),
        ),
      o = a((f) => f.kills),
      r = a((f) => f.dmgDealt),
      l = a((f) => f.dmgTaken),
      c = a((f) => f.dmgTower);
    for (const f of i) {
      const d = (f.kills + f.assists * 0.6) / Math.max(1, f.deaths),
        h = Math.min(1, (f.kills + f.assists) / o),
        u =
          3 +
          Math.min(4, d * 0.8) +
          h * 2.5 +
          (f.dmgDealt / r) * 6 +
          (f.dmgTaken / l) * 3 +
          (f.dmgTower / c) * 2.5 +
          Math.min(1, f.cs / (e * 6)) +
          (n.winner === s ? 1 : 0);
      t.set(f.id, { score: Math.max(0, Math.min(mk, u)), participation: h });
    }
  }
  return t;
}

const ZH = Jn(`
.sf-result { display: grid; grid-template-rows: auto minmax(0, 1fr) auto; gap: 10u; padding: max(10u, var(--sf-safe-t)) max(28u, var(--sf-safe-r)) max(14u, var(--sf-safe-b)) max(28u, var(--sf-safe-l)); background: rgba(3, 6, 16, 0.35); --tone: var(--sf-c-gold-200); --tone-rgb: 255, 214, 130; }
.sf-result--lose { --tone: #9fb0d0; --tone-rgb: 150, 170, 215; }

/* ── 标题横幅 ── */
.sf-result__banner { position: relative; display: flex; flex-direction: column; align-items: center; gap: 2u; padding-top: 2u; isolation: isolate; }
.sf-result__rays { --r: max(190px, 380u); position: absolute; left: calc(50% - var(--r)); top: calc(46% - var(--r)); width: calc(var(--r) * 2); height: calc(var(--r) * 2); z-index: -1; border-radius: 50%; pointer-events: none;
  background: repeating-conic-gradient(from 0deg, rgba(var(--tone-rgb), 0.2) 0deg 5deg, rgba(var(--tone-rgb), 0) 5deg 15deg);
  -webkit-mask-image: radial-gradient(circle, #000 0, rgba(0, 0, 0, 0.5) 22%, transparent 62%); mask-image: radial-gradient(circle, #000 0, rgba(0, 0, 0, 0.5) 22%, transparent 62%);
  animation: sf-spin 60s linear infinite; }
.sf-result--lose .sf-result__rays { display: none; }
.sf-result__titlewrap { position: relative; }
.sf-result__title { position: relative; margin: 0; font-weight: 900; font-size: max(44px, 84u); line-height: 1.08; letter-spacing: 0.34em; margin-right: -0.34em; white-space: nowrap; }
.sf-result--win .sf-result__title { filter: drop-shadow(0 max(1px, 2u) 0 #6b4614) drop-shadow(0 max(2px, 5u) 0 rgba(24, 12, 0, 0.75)) drop-shadow(0 0 34u rgba(255, 200, 110, 0.6)); animation: sf-result-win 0.9s var(--sf-ease-out) both; }
.sf-result--lose .sf-result__title { background-image: linear-gradient(180deg, #e3ebfb 0%, #9fb0d0 38%, #56648a 56%, #3a4566 62%, #8a6470 84%, #c98a92 100%); filter: drop-shadow(0 max(1px, 2u) 0 #10162c) drop-shadow(0 max(2px, 5u) 0 rgba(0, 0, 0, 0.7)) drop-shadow(0 0 26u rgba(182, 60, 70, 0.35)); animation: sf-result-lose 1.1s var(--sf-ease-out) both; }
@keyframes sf-result-win { 0% { opacity: 0; transform: scale(2.4); filter: brightness(3); } 55% { opacity: 1; transform: scale(0.96); } 100% { opacity: 1; transform: none; } }
@keyframes sf-result-lose { 0% { opacity: 0; transform: translateY(-40u) rotate(-2deg); } 55% { opacity: 1; transform: translateY(4u) rotate(0.6deg); } 100% { opacity: 1; transform: none; } }
.sf-result__wing { position: absolute; top: 50%; width: max(60px, 190u); height: 2px; background: linear-gradient(90deg, rgba(var(--tone-rgb), 0), var(--tone)); animation: sf-fade-in 0.8s 0.5s linear both; }
.sf-result__wing::after { content: ''; position: absolute; right: -4u; top: 50%; width: 8u; height: 8u; margin-top: -4u; transform: rotate(45deg); background: var(--tone); box-shadow: 0 0 10u var(--tone); }
.sf-result__wing--l { right: calc(100% + 26u); }
.sf-result__wing--r { left: calc(100% + 26u - 0.34em); transform: scaleX(-1); }
.sf-result__sub { display: none; margin: 0; font-size: var(--sf-fs-sm); letter-spacing: 0.4em; margin-right: -0.4em; color: var(--sf-c-text-2); text-shadow: 0 1px 4px rgba(0, 0, 0, 0.9); animation: sf-rise-in 0.6s 0.45s var(--sf-ease-out) both; }
.sf-result__summary { display: flex; align-items: center; gap: 18u; margin-top: 2u; animation: sf-rise-in 0.6s 0.55s var(--sf-ease-out) both; }
.sf-result__vs { display: flex; align-items: center; gap: 12u; font-size: max(20px, 30u); font-weight: 800; line-height: 1; }
.sf-result__vs b { font-family: var(--sf-font-num); }
.sf-result__vs .is-blue { color: var(--sf-c-blue); text-shadow: 0 0 12u rgba(77, 163, 255, 0.6); }
.sf-result__vs .is-red { color: var(--sf-c-red); text-shadow: 0 0 12u rgba(255, 93, 93, 0.6); }
.sf-result__vs .sf-i { width: 0.8em; height: 0.8em; color: var(--sf-c-text-3); }
.sf-result__vs small { font-weight: 600; font-size: var(--sf-fs-xs); letter-spacing: 0.14em; color: var(--sf-c-text-3); }
.sf-result__chip { display: inline-flex; align-items: center; gap: 6u; font-size: var(--sf-fs-sm); letter-spacing: 0.08em; color: var(--sf-c-text-2); white-space: nowrap; }
.sf-result__chip .sf-i { color: var(--sf-c-gold-300); }
.sf-result__chip b { font-family: var(--sf-font-num); font-size: var(--sf-fs-md); color: var(--sf-c-text); }

/* ── 战绩表 ── */
.sf-result__board { display: flex; flex-direction: column; min-height: 0; animation: sf-rise-in 0.6s 0.65s var(--sf-ease-out) both; }
.sf-result__scroll { flex: 1; min-height: 0; padding: 6u 12u 8u; }
.sf-rt { --cols: minmax(0, 1.7fr) 100u 52u 74u minmax(0, 1.05fr) minmax(0, 0.9fr) 70u auto 62u; display: flex; flex-direction: column; gap: 3u; min-width: 0; }
.sf-rt__head, .sf-rt__row { display: grid; grid-template-columns: var(--cols); align-items: center; column-gap: 10u; padding: 0 10u; }
.sf-rt__head { position: sticky; top: 0; z-index: 2; height: max(22px, 24u); font-size: var(--sf-fs-xs); letter-spacing: 0.12em; color: var(--sf-c-text-3); background: linear-gradient(180deg, #0d1736 70%, rgba(13, 23, 54, 0)); }
.sf-rt__head > span { white-space: nowrap; }
.sf-rt__c { text-align: center; }
.sf-rt__items-h { width: calc(max(24px, 29u) * 6 + max(3px, 4u) * 5); text-align: center; }
.sf-rt__h-short { display: none; }
.sf-rt__team { display: flex; align-items: center; gap: 14u; height: max(22px, 26u); padding: 0 10u; margin-top: 4u; border-radius: 5u; font-size: var(--sf-fs-xs); letter-spacing: 0.1em; color: var(--sf-c-text-2); background: linear-gradient(90deg, rgba(var(--team-rgb), 0.3), rgba(var(--team-rgb), 0.04) 70%); box-shadow: inset max(3px, 3u) 0 0 rgb(var(--team-rgb)); }
.sf-rt__team:first-of-type { margin-top: 0; }
.sf-rt__team b { font-weight: 800; font-size: var(--sf-fs-sm); letter-spacing: 0.2em; color: rgb(var(--team-rgb)); }
.sf-rt__team span { display: inline-flex; align-items: center; gap: 4u; white-space: nowrap; }
.sf-rt__team .sf-num { font-size: var(--sf-fs-sm); color: var(--sf-c-text); }
.sf-rt__team .sf-badge { margin-left: auto; }
.sf-rt__row { position: relative; min-height: max(34px, 37u); border-radius: 6u; background: rgba(20, 34, 72, 0.4); box-shadow: inset 0 0 0 1px rgba(150, 178, 235, 0.08); font-size: var(--sf-fs-sm); animation: sf-rise-in 0.4s var(--sf-ease-out) both; }
.sf-rt__row.is-me { background: linear-gradient(90deg, rgba(183, 243, 107, 0.2), rgba(183, 243, 107, 0.05) 60%, rgba(20, 34, 72, 0.4)); box-shadow: inset 0 0 0 1px rgba(183, 243, 107, 0.5), inset max(3px, 3u) 0 0 var(--sf-c-me); }
.sf-rt__row.is-mvp:not(.is-me) { background: linear-gradient(90deg, rgba(255, 214, 130, 0.16), rgba(20, 34, 72, 0.4) 55%); box-shadow: inset 0 0 0 1px rgba(255, 214, 130, 0.38); }
.sf-rt__hero { display: flex; align-items: center; gap: 9u; min-width: 0; }
.sf-rt__pic-wrap { position: relative; flex: none; }
.sf-rt__pic { width: max(28px, 31u); height: max(28px, 31u); border-radius: 6u; box-shadow: 0 0 0 1px rgba(8, 13, 31, 0.9), 0 0 0 max(1.5px, 2u) rgba(var(--team-rgb), 0.8); }
.sf-rt__lv { position: absolute; right: -5u; bottom: -4u; min-width: max(15px, 17u); height: max(15px, 17u); padding: 0 3u; display: grid; place-items: center; border-radius: 99px; font-family: var(--sf-font-num); font-weight: 700; font-size: max(10px, 11u); line-height: 1; color: var(--sf-c-gold-100); background: #0a1128; box-shadow: 0 0 0 1px var(--sf-c-gold-500); }
.sf-rt__name { flex: none; font-weight: 700; font-size: var(--sf-fs-md); letter-spacing: 0.08em; color: var(--sf-c-text); white-space: nowrap; }
.sf-rt__badges { display: flex; align-items: center; gap: 4u; min-width: 0; overflow: hidden; }
.sf-rt__cell { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2u; min-width: 0; text-align: center; }
.sf-rt__lab { display: none; font-size: var(--sf-fs-xs); color: var(--sf-c-text-3); letter-spacing: 0.06em; }
.sf-rt__val { font-family: var(--sf-font-num); font-variant-numeric: tabular-nums; font-size: var(--sf-fs-md); color: var(--sf-c-text); white-space: nowrap; }
.sf-rt__kda { letter-spacing: 0.04em; }
.sf-rt__kda i { font-style: normal; color: var(--sf-c-text-4); margin: 0 0.18em; }
.sf-rt__kda .is-d { color: #ff9a9a; }
.sf-rt__kda .is-a { color: var(--sf-c-text-2); }
.sf-rt__gold { color: var(--sf-c-gold-200); }
.sf-rt__bar { width: 100%; max-width: 110u; height: max(3px, 4u); border-radius: 99px; background: rgba(4, 8, 22, 0.7); overflow: hidden; }
.sf-rt__bar i { display: block; height: 100%; width: calc(var(--v) * 100%); border-radius: inherit; background: rgb(var(--team-rgb)); transform-origin: 0 50%; animation: sf-bar-grow 0.9s 0.9s var(--sf-ease-out) both; }
.sf-rt__bar--taken i { background: #9fb0d0; }
@keyframes sf-bar-grow { from { transform: scaleX(0); } to { transform: none; } }
.sf-rt__items { display: flex; gap: max(3px, 4u); }
.sf-rt__items .sf-slot { --sf-slot: max(24px, 29u); border-radius: 5u; box-shadow: 0 0 0 1px rgba(150, 178, 235, 0.3); }
.sf-rt__items .sf-slot--empty { box-shadow: inset 0 0 0 1px rgba(150, 178, 235, 0.16); }
.sf-rt__score .sf-rt__val { font-weight: 700; font-size: var(--sf-fs-lg); color: var(--sf-c-text); }
.sf-rt__row.is-mvp .sf-rt__score .sf-rt__val { color: var(--sf-c-gold-200); text-shadow: 0 0 10u rgba(255, 214, 130, 0.6); }

.sf-result__actions { display: flex; justify-content: center; gap: 16u; animation: sf-rise-in 0.6s 0.8s var(--sf-ease-out) both; }
.sf-result__actions .sf-btn { min-width: max(150px, 220u); }
.sf-result-root.is-closing { animation: sf-fade-out 0.35s linear both; pointer-events: none; }

/* ── 矮屏（横屏手机）：横幅压成一行 ── */
@media (max-height: 520px) and (orientation: landscape) {
  .sf-result { gap: 6u; padding-top: max(4u, var(--sf-safe-t)); padding-bottom: max(8u, var(--sf-safe-b)); }
  .sf-result__banner { flex-direction: row; justify-content: center; gap: 22u; }
  .sf-result__title { font-size: max(34px, 52u); }
  .sf-result__wing { display: none; }
  .sf-rt__h-full { display: none; }
  .sf-rt__h-short { display: inline; }
  .sf-result__summary { margin-top: 0; }
  .sf-result__rays { top: calc(50% - var(--r)); }
  .sf-rt { --cols: minmax(0, 1.5fr) 92u 46u 66u minmax(0, 1fr) minmax(0, 0.85fr) 62u auto 54u; }
  .sf-rt__head, .sf-rt__row { column-gap: 7u; padding: 0 8u; }
  .sf-result__actions .sf-btn { --sf-btn-h: max(40px, 46u); }
  /* 英雄列窄：只留名字(职业看头像)，把地方让给「你 / MVP」徽标 */
  .sf-rt__name .sf-heroname__role { display: none; }
}

/* ── 小横屏（如 667×375）：去掉补兵与推塔两列，保持一行一人 ── */
@media (orientation: landscape) and (max-width: 780px) {
  .sf-rt { --cols: minmax(0, 1.5fr) 84u minmax(0, 0.8fr) minmax(0, 1fr) minmax(0, 0.9fr) auto 50u; }
  .sf-rt__cell[data-c='cs'], .sf-rt__cell[data-c='tower'], .sf-rt__head > [data-c='cs'], .sf-rt__head > [data-c='tower'] { display: none; }
  .sf-rt__items { gap: 2px; }
  .sf-rt__items .sf-slot { --sf-slot: 22px; }
  .sf-rt__items-h { width: 142px; }
  .sf-rt__badges .sf-badge { padding: 0 4u; }
  .sf-result__chip:last-child { display: none; }
}

/* ── 竖屏：每位英雄一张卡片 ── */
@media (orientation: portrait) {
  .sf-result { padding-left: max(10u, var(--sf-safe-l)); padding-right: max(10u, var(--sf-safe-r)); }
  .sf-result__sub { display: block; }
  .sf-result__summary { flex-wrap: wrap; justify-content: center; gap: 6u 16u; margin-top: 6u; }
  .sf-result__wing { display: none; }
  .sf-result__scroll { padding: 8u; }
  .sf-rt { gap: 6u; }
  .sf-rt__head { display: none; }
  .sf-rt__row { grid-template-columns: repeat(3, minmax(0, 1fr)); grid-template-areas: 'hero hero score' 'kda cs gold' 'dmg taken tower' 'items items items'; row-gap: 7u; padding: 9u 10u; }
  .sf-rt__hero { grid-area: hero; }
  .sf-rt__score { grid-area: score; align-items: flex-end; }
  .sf-rt__cell[data-c='kda'] { grid-area: kda; }
  .sf-rt__cell[data-c='cs'] { grid-area: cs; }
  .sf-rt__cell[data-c='gold'] { grid-area: gold; }
  .sf-rt__cell[data-c='dmg'] { grid-area: dmg; }
  .sf-rt__cell[data-c='taken'] { grid-area: taken; }
  .sf-rt__cell[data-c='tower'] { grid-area: tower; }
  .sf-rt__items { grid-area: items; justify-content: flex-start; }
  .sf-rt__items .sf-slot { --sf-slot: max(30px, 36u); }
  .sf-rt__lab { display: block; }
  .sf-rt__cell { flex-direction: row; justify-content: flex-start; gap: 6u; flex-wrap: wrap; }
  .sf-rt__score { flex-direction: row; justify-content: flex-end; }
  .sf-rt__bar { flex-basis: 100%; max-width: none; }
  .sf-result__actions { gap: 10u; }
  .sf-result__actions .sf-btn { flex: 1; min-width: 0; padding: 0 10u; }
}
`);

function D4(n, t) {
  const e = z("span", "sf-rt__c", n);
  return ((e.dataset.c = t), e);
}

function ll(n, t, e, s, i) {
  const a = z(
    "span",
    "sf-rt__cell",
    z("span", "sf-rt__lab", t),
    z("span", `sf-rt__val${i ? ` ${i}` : ""}`, e),
    s,
  );
  return ((a.dataset.c = n), a);
}

function QH(n, t, e, s = {}) {
  if (s.signal?.aborted) return new Promise(() => {});
  (Hf(), Zn("sf-menu-result", ZH));
  const i = t.heroes.find((E) => E.isPlayer) ?? t.heroes[0],
    a = i ? i.team : 0,
    o = t.winner ?? (t.teams[0].kills >= t.teams[1].kills ? 0 : 1),
    r = o === a,
    l = KH({ ...t, winner: o }),
    c = [],
    f = (E) => {
      let A = -1,
        C = -1;
      for (const R of t.heroes) {
        const I = l.get(R.id)?.score ?? 0;
        R.team === E && I > C && ((C = I), (A = R.id));
      }
      return A;
    },
    d = f(o),
    h = f(o === 0 ? 1 : 0),
    u = Math.max(1, ...t.heroes.map((E) => E.dmgDealt)),
    m = Math.max(1, ...t.heroes.map((E) => E.dmgTaken)),
    x = z("h1", "sf-result__title sf-metal", r ? "胜利" : "失败"),
    p = z(
      "div",
      "sf-result__titlewrap",
      z("i", "sf-result__wing sf-result__wing--l"),
      x,
      z("i", "sf-result__wing sf-result__wing--r"),
    ),
    g = t.teams[0],
    y = t.teams[1],
    v = z(
      "header",
      "sf-result__banner",
      z("div", "sf-result__rays"),
      p,
      z("p", "sf-result__sub", r ? "敌方水晶已被摧毁" : "我方水晶被摧毁"),
      z(
        "div",
        "sf-result__summary",
        z(
          "span",
          "sf-result__vs",
          z("small", null, "蓝方"),
          z("b", "is-blue", String(g.kills)),
          _e(Vt("kill")),
          z("b", "is-red", String(y.kills)),
          z("small", null, "红方"),
        ),
        z("span", "sf-result__chip", _e(Vt("clock")), "时长", z("b", null, rk(t.endTime ?? t.time))),
        z(
          "span",
          "sf-result__chip",
          _e(Vt("tower")),
          "推塔",
          z("b", null, `${g.towersDestroyed} : ${y.towersDestroyed}`),
        ),
      ),
    ),
    _ = z(
      "div",
      "sf-rt",
      z(
        "div",
        "sf-rt__head",
        z("span", null, "英雄"),
        z(
          "span",
          "sf-rt__c",
          z("span", "sf-rt__h-full", "击杀 / 阵亡 / 助攻"),
          z("span", "sf-rt__h-short", "战绩"),
        ),
        D4("补兵", "cs"),
        z("span", "sf-rt__c", "经济"),
        z("span", "sf-rt__c", "对英雄伤害"),
        z("span", "sf-rt__c", "承受伤害"),
        D4("推塔伤害", "tower"),
        z("span", "sf-rt__items-h", "装备"),
        z("span", "sf-rt__c", "评分"),
      ),
    );
  let k = 0;
  for (const E of [a, a === 0 ? 1 : 0]) {
    const A = t.teams[E],
      C = t.heroes.filter((F) => F.team === E),
      R = E === 0 ? "77, 163, 255" : "255, 93, 93",
      I = A.gold > 0 ? A.gold : C.reduce((F, L) => F + L.goldEarned, 0),
      P = z(
        "div",
        "sf-rt__team",
        z("b", null, E === 0 ? "蓝色方" : "红色方"),
        z("span", null, E === a ? "我方" : "敌方"),
        z("span", null, _e(Vt("kill")), z("span", "sf-num", String(A.kills))),
        z("span", null, _e(Vt("tower")), z("span", "sf-num", String(A.towersDestroyed))),
        z("span", null, _e(Vt("gold")), z("span", "sf-num", kl(I))),
        za(E === o ? "胜利" : "失败", E === o ? "solid" : "mute"),
      );
    (P.style.setProperty("--team-rgb", R), _.appendChild(P));
    for (const F of C) {
      const L = l.get(F.id)?.score ?? 0,
        B = F.id === d,
        G = F.id === h,
        q = z(
          "span",
          "sf-rt__badges",
          F.isPlayer ? za("你", "me") : null,
          B ? za("MVP", "solid", Vt("crown")) : null,
          G ? za("败方最佳", "mute") : null,
        ),
        et = z(
          "span",
          "sf-rt__hero",
          z(
            "span",
            "sf-rt__pic-wrap",
            Zh(e, lookId(F.heroId, F.isPlayer), "sf-rt__pic"),
            z("span", "sf-rt__lv", String(F.level)),
          ),
          Qx(lookId(F.heroId, F.isPlayer), "sf-rt__name"),
          q,
        ),
        ct = ll("kda", "战绩", "");
      ct.querySelector(".sf-rt__val").innerHTML =
        `<span class="sf-rt__kda">${F.kills}<i>/</i><span class="is-d">${F.deaths}</span><i>/</i><span class="is-a">${F.assists}</span></span>`;
      const rt = (st, tt) => {
          const it = z("span", `sf-rt__bar ${tt}`, z("i"));
          return (it.style.setProperty("--v", String(Math.max(0.02, Math.min(1, st)))), it);
        },
        mt = z("span", "sf-rt__items");
      for (let st = 0; st < 6; st++) {
        const tt = F.items[st] ?? null,
          it = ro(tt ? Po(tt) : null, tt ? { label: ln[tt].name } : {});
        if (tt) {
          const D = ln[tt];
          ((it.tabIndex = 0), c.push(M0(it, () => uk(D))));
        }
        mt.appendChild(it);
      }
      const nt = ll("score", "评分", YH(L));
      nt.classList.add("sf-rt__score");
      const H = z(
        "div",
        `sf-rt__row${F.isPlayer ? " is-me" : ""}${B ? " is-mvp" : ""}`,
        et,
        ct,
        ll("cs", "补兵", String(F.cs)),
        ll("gold", "经济", kl(F.goldEarned), null, "sf-rt__gold"),
        ll("dmg", "伤害", kl(F.dmgDealt), rt(F.dmgDealt / u, "sf-rt__bar--dealt")),
        ll("taken", "承伤", kl(F.dmgTaken), rt(F.dmgTaken / m, "sf-rt__bar--taken")),
        ll("tower", "推塔", kl(F.dmgTower)),
        mt,
        nt,
      );
      (H.style.setProperty("--team-rgb", R),
        (H.style.animationDelay = `${0.7 + k * 0.04}s`),
        k++,
        _.appendChild(H));
    }
  }
  const M = z("section", "sf-result__board sf-panel", z("div", "sf-result__scroll sf-scroll", _)),
    S = z("div", `sf-screen sf-result sf-result--${r ? "win" : "lose"}`, v, M),
    b = z("div", "sf-root sf-result-root", S),
    w = Kx(b, r ? "victory" : "defeat"),
    T = qx(b, e.audio);
  return new Promise((E) => {
    let A = !1,
      C = 0;
    const R = () => {
        (s.signal?.removeEventListener("abort", I),
          window.clearTimeout(C),
          window.removeEventListener("keydown", F));
        for (const L of c.splice(0)) L();
        (T(), w.dispose(), b.remove());
      },
      I = () => {
        ((A = !0), zi(), R());
      };
    s.signal?.addEventListener("abort", I);
    const P = (L) => {
        if (!A) {
          ((A = !0), window.removeEventListener("keydown", F), zi());
          for (const B of c.splice(0)) B();
          (b.classList.add("is-closing"),
            (C = window.setTimeout(() => {
              (R(), E(L));
            }, 350)));
        }
      },
      F = (L) => {
        Sf() ||
          L.repeat ||
          (L.key === "Enter" && Xx(b)) ||
          (L.key === "Enter"
            ? (L.preventDefault(), e.audio.ui("confirm"), P("again"))
            : L.key === "Escape" && (L.preventDefault(), e.audio.ui("back"), P("menu")));
      };
    (S.appendChild(
      z(
        "footer",
        "sf-result__actions",
        po({ label: "返回主菜单", icon: Vt("home"), sound: "back", onClick: () => P("menu") }),
        po({
          label: "再来一局",
          icon: Vt("again"),
          variant: "primary",
          pulse: !0,
          sound: "confirm",
          onClick: () => P("again"),
        }),
      ),
    ),
      window.addEventListener("keydown", F),
      n.appendChild(b),
      e.audio.setMusic(r ? "victory" : "defeat"));
  });
}

const D2 = (n, t, e) => (n < t ? t : n > e ? e : n),
  Ef = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);

function vo(n) {
  let t = null;
  return (e) => {
    e !== t && ((t = e), (n.textContent = e));
  };
}

function Vn(n, t = String) {
  let e = NaN;
  return (s) => {
    s !== e && ((e = s), (n.textContent = t(s)));
  };
}

function br(n, t, e = 0.002) {
  let s = NaN;
  return (i) => {
    const a = Math.round(i / e) * e;
    a !== s && ((s = a), n.style.setProperty(t, a.toFixed(4)));
  };
}

function is(n, t) {
  let e = null;
  return (s) => {
    s !== e && ((e = s), n.classList.toggle(t, s));
  };
}

function uo(n, t) {
  (n.classList.remove(t), n.offsetWidth, n.classList.add(t));
}

function gk(n) {
  const t = Math.max(0, Math.floor(n)),
    e = Math.floor(t / 60),
    s = t % 60;
  return `${e < 10 ? "0" : ""}${e}:${s < 10 ? "0" : ""}${s}`;
}

function JH(n) {
  const t = new Map();
  return (e) => {
    let s = t.get(e);
    if (s === void 0) {
      s = null;
      try {
        const i = n.portrait(e);
        i && ((s = new Image()), (s.decoding = "async"), (s.src = i));
      } catch {
        s = null;
      }
      t.set(e, s);
    }
    return s && s.complete && s.naturalWidth > 0 ? s : null;
  };
}

function Dl(n, t, e = !1) {
  return e ? "is-me" : n === t ? "is-blue" : "is-red";
}

function Na(n, t, e, s = "") {
  // 玩家带了角色皮：HUD 头像也换成皮的（AI 永远没有皮）
  return Zh(n, lookId(t.heroId, t.isPlayer), `sf-hud__face ${Dl(t.team, e, t.isPlayer)}${s ? ` ${s}` : ""}`);
}

function Rl(n, t = "") {
  return z("span", `sf-hud__face sf-hud__face--glyph${t ? ` ${t}` : ""}`, _e(n));
}

const t$ = Jn(`
/* ── 阵亡：去色层 + 面板 ── */
/* 宿主没给去色目标时的兜底：用 backdrop-filter 把身后的战场去色（只在阵亡期间存在） */
.sf-hud__gray { position: absolute; inset: 0; z-index: 0; pointer-events: none; opacity: 0; transition: opacity 0.6s linear; background: rgba(8, 12, 24, 0.28);
  -webkit-backdrop-filter: grayscale(0.92) brightness(0.82); backdrop-filter: grayscale(0.92) brightness(0.82); display: none; }
.sf-hud.is-dead .sf-hud__gray { display: block; opacity: 1; }
.sf-hud__gray.is-tint { -webkit-backdrop-filter: none; backdrop-filter: none; background: radial-gradient(ellipse at center, rgba(8, 12, 24, 0.12), rgba(8, 12, 24, 0.5)); }
/* 给宿主的渲染容器用的去色类（createHud 的 dimTarget） */
.sf-hud-dim { transition: filter 0.6s linear; }
.sf-hud-dim.is-on { filter: grayscale(0.92) brightness(0.8); }

/* 位置让开上方的播报横幅区 */
.sf-hud__death { position: absolute; left: 0; right: 0; top: max(19%, calc(var(--hud-t) + 152u)); z-index: 4; isolation: isolate; display: none; flex-direction: column; align-items: center; gap: 6u; pointer-events: none; }
/* 高屏：标题 → 倒计时环 → 「秒后复活」→ 击杀者，纵向一列；矮屏改成环在左、文字在右的一行 */
.sf-hud__death-main { display: contents; }
.sf-hud__death-title { order: 1; }
.sf-hud__death-count { order: 2; }
.sf-hud__death-label { order: 3; }
.sf-hud__death-killer { order: 4; }
.sf-hud__death-tip { order: 5; }
.sf-hud.is-dead .sf-hud__death { display: flex; animation: sf-hud-death-in 0.6s var(--sf-ease-out) both; }
/* 面板背后垫一团柔和的暗影：去色后的战场是中灰色，文字需要更深的底才立得住 */
.sf-hud__death::before { content: ''; position: absolute; left: 50%; top: 50%; z-index: -1; width: max(360px, 560u); height: 150%; transform: translate(-50%, -50%); background: radial-gradient(ellipse closest-side, rgba(4, 7, 18, 0.72), rgba(4, 7, 18, 0.4) 55%, rgba(4, 7, 18, 0)); pointer-events: none; }
.sf-hud__death-title { margin: 0; font-size: max(24px, 38u); font-weight: 900; letter-spacing: 0.4em; margin-right: -0.4em; line-height: 1.2;
  background-image: linear-gradient(180deg, #ffffff 0%, #d5def2 34%, #8e9bbb 54%, #5a6788 61%, #d47f8b 82%, #ffc9cd 100%); filter: drop-shadow(0 1u 0 #0a1020) drop-shadow(0 0 2px rgba(4, 7, 18, 0.9)) drop-shadow(0 3u 12u rgba(0, 0, 0, 0.8)); }
.sf-hud__death-count { --p: 1; position: relative; display: grid; place-items: center; width: max(64px, 84u); height: max(64px, 84u); margin-top: 2u; border-radius: 50%;
  background: radial-gradient(circle, rgba(8, 13, 31, 0.92) 58%, rgba(8, 13, 31, 0) 60%), conic-gradient(#ffe7ad calc(var(--p) * 360deg), rgba(150, 178, 235, 0.22) 0); box-shadow: 0 0 0 1px rgba(8, 13, 31, 0.9), 0 6u 18u rgba(0, 0, 0, 0.5); }
.sf-hud__death-count::before { content: ''; position: absolute; inset: 9%; border-radius: 50%; background: radial-gradient(circle at 50% 35%, #16254f, #070c1e); box-shadow: inset 0 0 0 1px rgba(232, 199, 122, 0.4); }
.sf-hud__death-count > b { position: relative; font-size: max(26px, 36u); font-weight: 800; line-height: 1; color: #fff; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8); }
.sf-hud__death-label { font-size: var(--sf-fs-sm); font-weight: 700; letter-spacing: 0.2em; color: var(--sf-c-text-2); text-shadow: var(--hud-shadow-text); }
.sf-hud__death-killer { display: flex; align-items: center; gap: 8u; margin-top: 4u; padding: 5u 14u 5u 8u; border-radius: 99px; background: rgba(8, 13, 31, 0.82); box-shadow: inset 0 0 0 1px rgba(255, 93, 93, 0.45); font-size: var(--sf-fs-sm); font-weight: 700; color: var(--sf-c-text); white-space: nowrap; }
.sf-hud__death-killer:empty { display: none; }
.sf-hud__death-killer .sf-hud__face { --sz: 30u; }
.sf-hud__death-killer .is-dim { color: var(--sf-c-text-3); font-weight: 600; }
.sf-hud__death-killer .is-red { color: #ff9c9c; }
.sf-hud__death-assists { display: flex; align-items: center; margin-left: 4u; }
.sf-hud__death-assists .sf-hud__face { --sz: 20u; margin-left: -4u; }
.sf-hud__death-tip { font-size: var(--sf-fs-xs); color: var(--sf-c-text-2); text-shadow: var(--hud-shadow-text); }
@keyframes sf-hud-death-in { from { opacity: 0; transform: translateY(-16u) scale(1.06); } to { opacity: 1; transform: none; } }

/* ── 残血红边 ── */
.sf-hud__lowhp { position: absolute; inset: 0; z-index: 0; pointer-events: none; opacity: 0; transition: opacity 0.3s linear;
  background: radial-gradient(ellipse 64% 62% at center, rgba(210, 24, 34, 0) 56%, rgba(210, 24, 34, 0.26) 80%, rgba(210, 24, 34, 0.5) 100%); }
.sf-hud__lowhp.is-on { opacity: 1; animation: sf-hud-lowhp 1.1s ease-in-out infinite; }
@keyframes sf-hud-lowhp { 0%, 100% { opacity: 0.55; } 50% { opacity: 1; } }

/* ── 轻提示 ── */
.sf-hud__toasts { position: absolute; left: 0; right: 0; bottom: calc(var(--hud-b) + var(--hud-lift) + max(118px, 150u)); z-index: 5; display: flex; flex-direction: column-reverse; align-items: center; gap: 5u; pointer-events: none; }
.sf-hud__toast { display: inline-flex; align-items: center; gap: 6u; height: max(26px, 30u); padding: 0 14u 0 10u; border-radius: 99px; font-size: var(--sf-fs-sm); font-weight: 700; letter-spacing: 0.06em; line-height: 1; white-space: nowrap;
  color: #ffd9d9; background: linear-gradient(180deg, rgba(74, 18, 28, 0.94), rgba(30, 8, 16, 0.94)); box-shadow: inset 0 0 0 1px rgba(255, 120, 120, 0.6), 0 4u 12u rgba(0, 0, 0, 0.45); animation: sf-hud-toast-in 0.2s var(--sf-ease-spring) both; }
.sf-hud__toast.is-info { color: var(--sf-c-cyan-200); background: linear-gradient(180deg, rgba(16, 44, 70, 0.94), rgba(7, 16, 30, 0.94)); box-shadow: inset 0 0 0 1px rgba(92, 214, 247, 0.55), 0 4u 12u rgba(0, 0, 0, 0.45); }
.sf-hud__toast.is-good { color: var(--sf-c-gold-100); background: linear-gradient(180deg, rgba(64, 48, 14, 0.94), rgba(22, 16, 6, 0.94)); box-shadow: inset 0 0 0 1px rgba(243, 207, 133, 0.7), 0 4u 12u rgba(0, 0, 0, 0.45); }
.sf-hud__toast .sf-i { width: 1.15em; height: 1.15em; vertical-align: 0; }
.sf-hud__toast.is-out { animation: sf-hud-toast-out 0.25s linear both; }
.sf-hud__toast.is-again { animation: sf-hud-toast-again 0.25s var(--sf-ease-out); }
@keyframes sf-hud-toast-in { from { opacity: 0; transform: translateY(8u) scale(0.9); } to { opacity: 1; transform: none; } }
@keyframes sf-hud-toast-out { to { opacity: 0; transform: translateY(-6u); } }
@keyframes sf-hud-toast-again { 0% { transform: scale(1.12); filter: brightness(1.5); } 100% { transform: none; filter: none; } }

/* ── 回城引导条 ── */
.sf-hud__channel { --p: 0; position: absolute; left: 50%; bottom: calc(var(--hud-b) + var(--hud-lift) + max(92px, 112u)); z-index: 4; width: max(200px, 250u); transform: translateX(-50%); display: none; flex-direction: column; align-items: center; gap: 4u; pointer-events: none; }
.sf-hud__channel.is-on { display: flex; animation: sf-hud-toast-in 0.2s var(--sf-ease-out) both; }
.sf-hud__channel-label { display: flex; align-items: baseline; gap: 8u; font-size: var(--sf-fs-sm); font-weight: 800; letter-spacing: 0.12em; color: var(--sf-c-cyan-200); text-shadow: var(--hud-shadow-text); }
.sf-hud__channel-label small { font-size: var(--sf-fs-xs); font-weight: 600; letter-spacing: 0.02em; color: var(--sf-c-text-2); }
.sf-hud__channel-bar { position: relative; width: 100%; height: max(7px, 9u); border-radius: 99px; overflow: hidden; background: rgba(3, 6, 16, 0.82); box-shadow: inset 0 0 0 1px rgba(143, 233, 255, 0.5), 0 0 12u rgba(92, 214, 247, 0.35); }
.sf-hud__channel-bar > i { position: absolute; inset: 0; transform-origin: left center; transform: scaleX(var(--p)); background: linear-gradient(90deg, #1c84b0, #5cd6f7 70%, #fff); }

/* ── 帧率 ── */
.sf-hud__fps { position: absolute; left: calc(var(--hud-l) + var(--hud-mini) + 10u); top: var(--hud-t); z-index: 3; display: none; font-family: var(--sf-font-num); font-size: max(11px, 12u); font-weight: 700; line-height: 1.4; color: var(--sf-c-green); text-shadow: var(--hud-shadow-text); pointer-events: none; }
.sf-hud__fps.is-on { display: block; }
.sf-hud__fps.is-mid { color: var(--sf-c-amber); }
.sf-hud__fps.is-low { color: var(--sf-c-red); }

/* ── 开局操作提示条 ── */
/* 提示条本身不接指针(只有关闭按钮接)：它盖着的地方照样能起摇杆、点地面。
   width: max-content：绝对定位 + left:50% 时可用宽度只剩半屏，不写的话内容会被挤成一列(竖屏尤其明显)；上限由 max-width 管。
   横屏时提示条与右下技能区同高：宽度再扣掉两侧各一个技能区，居中的条才不会伸到技能键底下 */
.sf-hud__tips { position: absolute; left: 50%; bottom: calc(var(--hud-b) + var(--hud-lift) + max(96px, 116u)); z-index: 5; transform: translateX(-50%); display: none; align-items: center; gap: 4u; width: max-content; max-width: min(94vw, 880u, calc(100vw - 2 * var(--hud-cw) - 20u)); padding: 6u 4u 6u 14u; border-radius: 10u; pointer-events: none;
  background: var(--hud-plate); box-shadow: inset 0 0 0 1px rgba(232, 199, 122, 0.45), 0 6u 18u rgba(2, 4, 12, 0.55); }
.sf-hud__tips.is-on { display: flex; animation: sf-hud-tips-in 0.4s var(--sf-ease-out) both; }
.sf-hud__tips.is-out { animation: sf-hud-tips-out 0.35s var(--sf-ease-in) both; }
.sf-hud__tips-list { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 5u 14u; font-size: var(--sf-fs-xs); color: var(--sf-c-text-2); line-height: 1.2; }
.sf-hud__tips-list > span { display: inline-flex; align-items: center; gap: 4u; white-space: nowrap; }
.sf-hud__tips-list .sf-kbd { min-width: max(19px, 20u); height: max(19px, 20u); padding: 0 4u; font-size: max(10px, 10.5u); }
.sf-hud__tips-list .sf-i { color: var(--sf-c-gold-300); }
.sf-hud__tips-list b { color: var(--sf-c-gold-200); font-weight: 700; }
.sf-hud__tips .sf-iconbtn { width: max(30px, 32u); height: max(30px, 32u); flex: none; }
@keyframes sf-hud-tips-in { from { opacity: 0; transform: translateX(-50%) translateY(14u); } to { opacity: 1; transform: translateX(-50%); } }
@keyframes sf-hud-tips-out { to { opacity: 0; transform: translateX(-50%) translateY(10u); } }

/* ── 点地落点波纹 ── */
.sf-hud__ripple { position: absolute; z-index: 2; width: 0; height: 0; pointer-events: none; }
.sf-hud__ripple::before, .sf-hud__ripple::after { content: ''; position: absolute; left: -15u; top: -9u; width: 30u; height: 18u; border-radius: 50%; border: max(1.5px, 2u) solid var(--col, #b7f36b); animation: sf-hud-ripple 0.5s ease-out both; }
.sf-hud__ripple::after { animation-delay: 0.1s; }
.sf-hud__ripple.is-atk { --col: #ff7a7a; }
@keyframes sf-hud-ripple { from { opacity: 1; transform: scale(1.5); } to { opacity: 0; transform: scale(0.25); } }

/* 窄横屏：帧率挪到商店按钮下方，不和比分牌抢位置 */
@media (orientation: landscape) and (max-width: 700px) {
  .sf-hud__fps { left: var(--hud-l); top: calc(var(--hud-t) + var(--hud-mini) + max(60px, 66u)); }
}
@media (orientation: landscape) and (max-height: 520px) {
  .sf-hud__death { flex-direction: row; justify-content: center; gap: 14u; top: calc(var(--hud-t) + 150u); }
  .sf-hud__death-main { display: flex; flex-direction: column; align-items: flex-start; gap: 3u; }
  .sf-hud__death-title { font-size: max(20px, 28u); letter-spacing: 0.3em; }
  .sf-hud__death-count { order: 0; width: max(60px, 76u); height: max(60px, 76u); margin: 0; }
  .sf-hud__death-main { order: 1; }
  .sf-hud__death-killer { margin-top: 2u; }
  .sf-hud__death-tip { display: none; }
}
@media (orientation: portrait) {
  .sf-hud__death { top: calc(var(--hud-t) + var(--hud-mini) + 150u); }
  .sf-hud__fps { left: var(--hud-l); top: calc(var(--hud-t) + var(--hud-mini) + max(60px, 66u)); }
  /* 顶部指引位(引导卡 / 当前目标)在竖屏下正好占着这一行：有指引时帧率读数挪到小地图右边、右上角按钮的下面 */
  .sf-hud.is-coach .sf-hud__fps { left: calc(var(--hud-l) + var(--hud-mini) + 8u); top: calc(var(--hud-t) + var(--hud-mini) - 6u); }
  .sf-hud__toasts { bottom: calc(var(--hud-ch) + var(--hud-lift) + 40u); }
  .sf-hud__channel { bottom: calc(var(--hud-ch) + var(--hud-lift) + 6u); }
  .sf-hud__tips { bottom: calc(var(--hud-ch) + var(--hud-lift) + 10u); padding-left: 10u; max-width: 94vw; }
}
`);

function e$(n, t) {
  const e = z("div", "sf-hud__gray"),
    s = typeof window.CSS < "u" ? window.CSS : null,
    i =
      !!s &&
      (s.supports("backdrop-filter", "grayscale(1)") ||
        s.supports("-webkit-backdrop-filter", "grayscale(1)"));
  ((t.dimTarget || !i) && e.classList.add("is-tint"), t.dimTarget && t.dimTarget.classList.add("sf-hud-dim"));
  const a = z("div", "sf-hud__lowhp"),
    o = z("b", "sf-num", "0"),
    r = z("div", "sf-hud__death-count", o),
    l = z("div", "sf-hud__death-killer"),
    c = z("div", "sf-hud__death-tip"),
    f = vo(c),
    d = z(
      "div",
      "sf-hud__death",
      r,
      z(
        "div",
        "sf-hud__death-main",
        z("h2", "sf-hud__death-title sf-metal", "你已阵亡"),
        z("div", "sf-hud__death-label", "秒后复活"),
        l,
        c,
      ),
    ),
    h = Vn(o),
    u = br(r, "--p", 1 / 180),
    m = is(a, "is-on");
  let x = !1,
    p = 1;
  function g(y, v) {
    ((x = y),
      n.root.classList.toggle("is-dead", y),
      t.dimTarget?.classList.toggle("is-on", y),
      y
        ? ((p = Math.max(1, v.respawnIn)),
          f(v.autoBuy ? "阵亡期间金币照涨，自动出装照买。" : "阵亡期间金币照涨，可以打开商店买装备。"))
        : (l.textContent = ""),
      t.onDeathChange?.(y));
  }
  return {
    els: [e, a, d],
    update(y) {
      const v = y.me;
      (!v.alive !== x && g(!v.alive, v),
        x && (v.respawnIn > p && (p = v.respawnIn), h(Math.ceil(v.respawnIn)), u(Ef(v.respawnIn / p))),
        m(v.alive && v.hp > 0 && v.hp / Math.max(1, v.stats.maxHp) < 0.25));
    },
    handleEvent(y, v) {
      if (y.type !== "heroKill" || y.victimId !== v.state.playerId) return;
      l.textContent = "";
      const _ = v.hero(y.killerId);
      if ((l.appendChild(z("span", "is-dim", "击杀者")), _))
        l.append(
          Na(v.host, _, v.team),
          z("span", "is-red", `敌方 ${z0(_.heroId)}`),
          z("span", "is-dim sf-num", `Lv.${_.level}`),
        );
      else {
        const M = v.unit(y.killerId),
          S = v.team === 0 ? 1 : 0,
          b = M?.kind,
          w =
            b === "tower"
              ? "敌方防御塔"
              : b === "core"
                ? "敌方水晶"
                : M && M.kind === "monster"
                  ? rn[M.monsterType].name
                  : b === "minion"
                    ? "敌方小兵"
                    : "战场";
        l.append(
          Rl(Vt(b === "tower" || b === "core" ? "tower" : b === "monster" ? "monster" : "cs"), Dl(S, v.team)),
          z("span", "is-red", w),
        );
      }
      const k = y.assistIds.map((M) => v.hero(M)).filter((M) => !!M);
      if (k.length > 0) {
        const M = z("span", "sf-hud__death-assists");
        for (const S of k.slice(0, 4)) M.appendChild(Na(v.host, S, v.team));
        l.append(z("span", "is-dim", "助攻"), M);
      }
    },
    dispose() {
      (n.root.classList.remove("is-dead"), t.dimTarget?.classList.remove("sf-hud-dim", "is-on"));
    },
  };
}

const n$ = 1.7,
  s$ = { warn: Vt("cancel"), info: Vt("info"), good: Vt("check") };

function i$(n) {
  const t = z("div", "sf-hud__toasts");
  t.setAttribute("aria-live", "assertive");
  const e = [];
  function s(i, a = "warn", o = n$) {
    const r = Math.max(o, 0.9 + i.length * 0.12);
    for (const c of e)
      if (c.text === i && !c.leaving) {
        ((c.until = n.now + r),
          c.el.classList.remove("is-again"),
          c.el.offsetWidth,
          c.el.classList.add("is-again"));
        return;
      }
    const l = z("div", `sf-hud__toast${a === "warn" ? "" : ` is-${a}`}`, _e(s$[a]), i);
    for (t.appendChild(l), e.push({ el: l, text: i, until: n.now + r, leaving: !1 }); e.length > 3;)
      e.shift()?.el.remove();
  }
  return {
    el: t,
    show: s,
    update(i) {
      for (let a = e.length - 1; a >= 0; a--) {
        const o = e[a];
        !o.leaving && i.now >= o.until
          ? ((o.leaving = !0), o.el.classList.add("is-out"))
          : o.leaving && i.now >= o.until + 0.26 && (o.el.remove(), e.splice(a, 1));
      }
    },
    handleEvent(i, a) {
      if (i.type === "reject" && i.unitId === a.state.playerId) s(PB[i.reason], "warn");
      else if (i.type === "fx" && i.key === "buff_gain" && i.unitId === a.state.playerId) {
        let o = null,
          r = -1;
        for (const l of a.me.buffs)
          (l.id === "frost_insight" || l.id === "ember_might") &&
            l.timeLeft > r &&
            ((r = l.timeLeft), (o = l.id));
        o && s(NB[o], "info");
      }
    },
  };
}

function a$() {
  const n = z("span", "sf-num"),
    t = z(
      "div",
      "sf-hud__channel",
      z("div", "sf-hud__channel-label", "回城中", n, z("small", null, "移动、攻击或受击会打断")),
      z("div", "sf-hud__channel-bar", z("i")),
    ),
    e = is(t, "is-on"),
    s = br(t, "--p", 1 / 200),
    i = vo(n);
  return {
    el: t,
    update(a) {
      let o = -1,
        r = 1;
      for (const c of a.me.buffs)
        c.id === "recall" && ((o = c.timeLeft), (r = c.duration > 0 ? c.duration : 1));
      const l = o >= 0 && a.me.alive;
      (e(l), l && (s(Ef(1 - o / r)), i(o.toFixed(1))));
    },
  };
}

function o$(n) {
  const t = z("div", "sf-hud__fps"),
    e = is(t, "is-on"),
    s = is(t, "is-mid"),
    i = is(t, "is-low"),
    a = vo(t);
  let o = -1;
  return {
    el: t,
    update(r) {
      const l = n.host.getSettings().showFps;
      if ((e(l), !l || r.now - o < 0.5)) return;
      o = r.now;
      const c = Math.round(n.host.getFps());
      (a(`${c} FPS`), i(c < 28), s(c >= 28 && c < 50));
    },
  };
}

const xk = "starfall.hud.tips.v1";

function r$() {
  return H8(xk) === "1";
}

function l$(n, t) {
  const e = z("div", "sf-hud__tips-list"),
    s = z("button", "sf-iconbtn sf-iconbtn--quiet", _e(Vt("close")));
  ((s.type = "button"),
    (s.tabIndex = -1),
    s.setAttribute("aria-label", "关闭操作提示"),
    (s.dataset.sfSnd = "back"));
  const i = z("div", "sf-hud__tips", e, s);
  let a = -1,
    o = t <= 0 || r$(),
    r = 0;
  const l = (...d) => d.map((h) => z("span", "sf-kbd", h));
  function c(d) {
    ((e.textContent = ""),
      d === "kbm"
        ? e.append(
            z("span", null, ...l("W", "A", "S", "D"), "移动"),
            z("span", null, ...l("右键"), "点地移动 / 攻击"),
            z("span", null, ...l("空格"), "普攻"),
            z("span", null, ...l("Q", "E", "R"), "技能：按住瞄准，松开施放"),
            z("span", null, ...l("F", "G", "B"), "闪现 / 疗伤 / 回城"),
            z("span", null, ...l("P"), "商店"),
            z("span", null, ...l("Tab"), "战况"),
            z("span", null, ...l("Esc"), "暂停"),
          )
        : e.append(
            z("span", null, _e(Vt("joystick")), z("b", null, "左下拖动"), "移动"),
            z("span", null, _e(Vt("touch")), z("b", null, "轻点技能"), "自动瞄准"),
            z("span", null, _e(Vt("target")), z("b", null, "按住拖动"), "手动瞄准，松手施放"),
            z("span", null, _e(Vt("cancel")), "拖到", z("b", null, "取消"), "松手放弃"),
            z("span", null, _e(Vt("info")), z("b", null, "长按技能"), "看说明"),
          ));
  }
  c(n.mode);
  function f() {
    o || ((o = !0), i.classList.add("is-out"), (r = n.now + 0.36));
  }
  return (
    s.addEventListener("click", () => {
      (f(), Wx(xk, "1"));
    }),
    {
      el: i,
      dismiss: f,
      onMode(d) {
        o || c(d);
      },
      update(d) {
        if (o) {
          r > 0 && d.now >= r && ((r = 0), i.classList.remove("is-on"));
          return;
        }
        a < 0 ? ((a = d.now), i.classList.add("is-on")) : d.now - a > t && f();
      },
    }
  );
}

function z2(n, t, e, s) {
  const i = n.getBoundingClientRect(),
    a = z("i", `sf-hud__ripple${s ? " is-atk" : ""}`);
  ((a.style.left = `${t - i.left}px`),
    (a.style.top = `${e - i.top}px`),
    n.appendChild(a),
    window.setTimeout(() => a.remove(), 700));
}

function c$() {
  Zn("sf-hud-overlays", t$);
}

const A3 = ["s1", "s2", "ult", "recall", "heal", "flash"],
  N2 = { attack: "空格", s1: "Q", s2: "E", ult: "R", flash: "F", heal: "G", recall: "B" },
  z4 = { s1: "一技能", s2: "二技能", ult: "大招" },
  R3 = { x: 0.86, y: 0.86 },
  xr = (n, t) => ({
    x: R3.x - Math.cos((n * Math.PI) / 180) * t,
    y: R3.y + Math.sin((n * Math.PI) / 180) * t,
  }),
  F2 = 1.52,
  U2 = 2.62,
  N4 = {
    attack: R3,
    s1: xr(187, F2),
    s2: xr(138.5, F2),
    ult: xr(90, F2),
    recall: xr(159.5, U2),
    heal: xr(138.5, U2),
    flash: xr(117.5, U2),
  },
  O2 = 2.75,
  F4 = { recall: xr(120, O2), heal: xr(102.5, O2), flash: xr(85, O2) },
  f$ = Jn(`
.sf-hud__skills { position: absolute; right: var(--hud-r); bottom: calc(var(--hud-b) + var(--hud-lift)); z-index: 3; width: 0; height: 0; }
.sf-hud__sk {
  --d: var(--hud-sk); --cd: 0; --x: 1; --y: 1;
  position: absolute; right: calc(var(--hud-sk) * var(--x) - var(--d) / 2); bottom: calc(var(--hud-sk) * var(--y) - var(--d) / 2); width: var(--d); height: var(--d);
  padding: 0; margin: 0; border: 0; border-radius: 50%; background: none; color: #fff; cursor: pointer; touch-action: none;
  transition: transform 0.09s var(--sf-ease-out), filter 0.15s linear;
}
/* 设计系统给所有按钮设了 touch-action: manipulation；技能键要自己处理拖动瞄准，必须彻底关掉浏览器手势 */
.sf-hud .sf-hud__sk { touch-action: none; }
.sf-hud__sk:focus-visible { outline: none; }
.sf-hud__sk.is-ult { --d: calc(var(--hud-sk) * 1.07); }
.sf-hud__sk.is-sum { --d: calc(var(--hud-sk) * 0.74); }
.sf-hud__sk.is-atk { --d: calc(var(--hud-sk) * 1.43); }
.sf-hud__sk.is-down { transform: scale(0.93); }
/* 竖屏：通用技能键换到大招键上方那组位置(见 LAYOUT_PORTRAIT)；右下技能区随之高出一截，中下的读条 / 提示条跟着上移 */
@media (orientation: portrait) {
  .sf-hud__sk.is-sum { right: calc(var(--hud-sk) * var(--xp, var(--x)) - var(--d) / 2); bottom: calc(var(--hud-sk) * var(--yp, var(--y)) - var(--d) / 2); }
  .sf-hud { --hud-ch: calc(var(--hud-sk) * 4.1 + var(--hud-b)); }
}

/* 图标面：圆形裁切 + 双层描边（深色隔离线 + 金环） */
.sf-hud__sk-face {
  position: absolute; inset: 0; border-radius: 50%; overflow: hidden; background: #0a1128;
  box-shadow: 0 0 0 1px rgba(8, 13, 31, 0.95), 0 0 0 max(2px, calc(var(--d) * 0.045)) rgba(224, 177, 96, 0.82), 0 calc(var(--d) * 0.06) calc(var(--d) * 0.18) rgba(0, 0, 0, 0.55);
  transition: box-shadow 0.12s linear;
}
.sf-hud__sk-face > svg { display: block; width: 100%; height: 100%; transition: filter 0.15s linear; }
.sf-hud__sk-face::after { content: ''; position: absolute; inset: 0; border-radius: 50%; box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.18), inset 0 calc(var(--d) * -0.14) calc(var(--d) * 0.2) rgba(0, 0, 0, 0.32); pointer-events: none; }
/* 大招：金环外再套一圈青色星轨 */
.sf-hud__sk.is-ult .sf-hud__sk-face { box-shadow: 0 0 0 1px rgba(8, 13, 31, 0.95), 0 0 0 max(2px, calc(var(--d) * 0.045)) #ffe7ad, 0 0 0 max(3px, calc(var(--d) * 0.07)) rgba(8, 13, 31, 0.9), 0 0 0 max(4px, calc(var(--d) * 0.09)) rgba(92, 214, 247, 0.75), 0 0 calc(var(--d) * 0.3) rgba(92, 214, 247, 0.4); }
.sf-hud__sk.is-down .sf-hud__sk-face, .sf-hud__sk.is-aim .sf-hud__sk-face { box-shadow: 0 0 0 1px rgba(8, 13, 31, 0.95), 0 0 0 max(2px, calc(var(--d) * 0.055)) #fff4d6, 0 0 calc(var(--d) * 0.36) rgba(255, 214, 130, 0.95); }
.sf-hud__sk.is-active .sf-hud__sk-face { box-shadow: 0 0 0 1px rgba(8, 13, 31, 0.95), 0 0 0 max(2px, calc(var(--d) * 0.055)) var(--sf-c-cyan-300), 0 0 calc(var(--d) * 0.4) rgba(92, 214, 247, 0.9); }

/* 冷却：暗色扇形从 12 点方向顺时针退去，边界带一道亮线 */
.sf-hud__sk-cd {
  --a: calc((1 - var(--cd)) * 360deg);
  position: absolute; inset: 0; border-radius: 50%; display: none; pointer-events: none;
  background: conic-gradient(rgba(3, 6, 16, 0) 0deg, rgba(3, 6, 16, 0) calc(var(--a) - 2.5deg), rgba(190, 236, 255, 0.9) var(--a), rgba(3, 6, 16, 0.74) calc(var(--a) + 0.8deg), rgba(3, 6, 16, 0.74) 360deg);
}
.sf-hud__sk.is-cd .sf-hud__sk-cd { display: block; }
.sf-hud__sk.is-cd .sf-hud__sk-face > svg { filter: saturate(0.55) brightness(0.8); }
.sf-hud__sk-sec { position: absolute; inset: 0; display: grid; place-items: center; font-size: calc(var(--d) * 0.37); font-weight: 800; line-height: 1; color: #fff; text-shadow: 0 1px 2px #000, 0 0 calc(var(--d) * 0.12) rgba(2, 4, 12, 0.95); pointer-events: none; }

/* 状态角标：未学会(锁)/缺蓝(水滴)/被控(禁止) */
.sf-hud__sk-mark { position: absolute; inset: 0; display: none; place-items: center; border-radius: 50%; pointer-events: none; }
.sf-hud__sk-mark > .sf-i { width: 44%; height: 44%; filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.9)); }
.sf-hud__sk.is-locked .sf-hud__sk-mark.is-lock { display: grid; background: rgba(3, 6, 16, 0.66); color: var(--sf-c-text-2); }
.sf-hud__sk.is-locked .sf-hud__sk-face > svg { filter: grayscale(1) brightness(0.55); }
.sf-hud__sk.is-nomana .sf-hud__sk-face > svg { filter: grayscale(0.9) brightness(0.72); }
.sf-hud__sk.is-nomana .sf-hud__sk-mark.is-mana { display: grid; place-items: end center; background: linear-gradient(180deg, rgba(40, 90, 190, 0.18), rgba(30, 70, 170, 0.55)); color: #9ccfff; }
.sf-hud__sk.is-nomana .sf-hud__sk-mark.is-mana > .sf-i { width: 30%; height: 30%; margin-bottom: 9%; }
.sf-hud__sk.is-forbid .sf-hud__sk-mark.is-ban { display: grid; background: rgba(120, 16, 26, 0.5); color: #ffb3b3; }
.sf-hud__sk.is-forbid .sf-hud__sk-face > svg { filter: grayscale(0.7) brightness(0.65); }
.sf-hud__sk.is-locked .sf-hud__sk-sec, .sf-hud__sk.is-locked .sf-hud__sk-cd { display: none; }

/* 技能等级点 */
.sf-hud__sk-pips { position: absolute; left: 50%; bottom: calc(var(--d) * -0.1); display: flex; gap: max(1.5px, calc(var(--d) * 0.028)); transform: translateX(-50%); pointer-events: none; }
.sf-hud__sk-pips > i { width: max(4px, calc(var(--d) * 0.085)); height: max(4px, calc(var(--d) * 0.085)); border-radius: 50%; background: #0a1128; box-shadow: 0 0 0 1px rgba(150, 178, 235, 0.6); }
.sf-hud__sk-pips > i.is-on { background: #ffe7ad; box-shadow: 0 0 0 1px #6b4614, 0 0 4px rgba(255, 214, 130, 0.9); }
.sf-hud__sk > .sf-hud__key { left: calc(var(--d) * -0.06); top: calc(var(--d) * -0.06); }
.sf-hud__sk.is-atk > .sf-hud__key { left: 6%; top: 6%; }

/* 类型标签角标：右上角两个字(键位角标在左上、等级点在下方，互不重叠)。深色半透明底 + 标签色文字，颜色只是辅助 */
.sf-hud__sk-tag {
  --tag: 243, 207, 133;
  position: absolute; right: calc(var(--d) * -0.07); top: calc(var(--d) * -0.07); z-index: 1; padding: 0.22em 0.42em 0.24em; border-radius: 99px; pointer-events: none;
  font-size: max(10px, calc(var(--d) * 0.175)); font-weight: 800; font-style: normal; line-height: 1; letter-spacing: 0.02em; white-space: nowrap;
  color: rgb(var(--tag)); background: rgba(6, 10, 24, 0.88); box-shadow: 0 0 0 1px rgba(var(--tag), 0.6), 0 1px 3px rgba(0, 0, 0, 0.6);
  transition: color 0.15s linear, box-shadow 0.15s linear, background 0.15s linear;
}
.sf-hud__sk-tag.is-ult { color: #2b1a04; background: var(--sf-grad-gold); box-shadow: 0 0 0 1px rgba(8, 13, 31, 0.9), 0 1px 3px rgba(0, 0, 0, 0.6); }
/* 通用技能键的名字(闪现 / 疗伤 / 回城)：只在触控布局显示——键鼠有 F / G / B 键帽，文案也写「按 B 回城」；
   触控的文案写的是「点『回城』」，键上得有这两个字才对得上。压在键的下沿，不挡图标中心的冷却秒数 */
.sf-hud__sk-name {
  position: absolute; left: 50%; bottom: calc(var(--d) * -0.14); z-index: 1; display: none; transform: translateX(-50%); padding: 0.18em 0.42em 0.2em; border-radius: 99px; pointer-events: none;
  font-size: max(10px, calc(var(--d) * 0.24)); font-weight: 800; font-style: normal; line-height: 1; letter-spacing: 0.04em; white-space: nowrap;
  color: #e9f2ff; background: rgba(6, 10, 24, 0.88); box-shadow: 0 0 0 1px rgba(150, 178, 235, 0.55), 0 1px 3px rgba(0, 0, 0, 0.6);
}
.sf-hud--touch .sf-hud__sk-name { display: block; }
/* 未学会：角标一并变灰 */
.sf-hud__sk.is-locked .sf-hud__sk-tag { color: #8b96b3; background: rgba(6, 10, 24, 0.88); box-shadow: 0 0 0 1px rgba(139, 150, 179, 0.5); }

/* 就绪 / 升级闪光 */
.sf-hud__sk-fx { position: absolute; inset: -18%; border-radius: 50%; opacity: 0; pointer-events: none; }
.sf-hud__sk.is-ready .sf-hud__sk-fx { background: radial-gradient(circle, rgba(255, 255, 255, 0.95) 0, rgba(190, 236, 255, 0.7) 38%, rgba(92, 214, 247, 0) 68%); animation: sf-hud-sk-ready 0.5s ease-out; }
.sf-hud__sk.is-lvup .sf-hud__sk-fx { background: radial-gradient(circle, rgba(255, 244, 214, 0) 46%, rgba(255, 231, 173, 0.95) 56%, rgba(255, 214, 130, 0) 70%); animation: sf-hud-sk-lvup 0.9s ease-out; }
.sf-hud__sk.is-lvup .sf-hud__sk-face { animation: sf-hud-sk-glow 0.9s ease-out; }
@keyframes sf-hud-sk-ready { 0% { opacity: 1; transform: scale(0.5); } 100% { opacity: 0; transform: scale(1.15); } }
@keyframes sf-hud-sk-lvup { 0% { opacity: 1; transform: scale(0.6); } 100% { opacity: 0; transform: scale(1.5); } }
@keyframes sf-hud-sk-glow { 0%, 40% { filter: brightness(1.9) saturate(1.2); } 100% { filter: none; } }

/* 普攻键：金属外环 + 深蓝内面 + 大号武器字形 */
.sf-hud__atk-face {
  position: absolute; inset: 0; border-radius: 50%; display: grid; place-items: center; color: #ffe9b8;
  background: radial-gradient(circle at 50% 38%, rgba(60, 96, 180, 0.95), rgba(16, 28, 66, 0.96) 58%, rgba(6, 10, 26, 0.98));
  box-shadow: 0 0 0 1px rgba(8, 13, 31, 0.95), 0 0 0 max(2.5px, calc(var(--d) * 0.04)) #e0b160, 0 0 0 max(3.5px, calc(var(--d) * 0.055)) rgba(8, 13, 31, 0.9), 0 0 0 max(4.5px, calc(var(--d) * 0.068)) rgba(255, 231, 173, 0.45),
    0 calc(var(--d) * 0.06) calc(var(--d) * 0.2) rgba(0, 0, 0, 0.6), inset 0 0 calc(var(--d) * 0.22) rgba(92, 214, 247, 0.28), inset 0 2px 0 rgba(255, 255, 255, 0.2);
  transition: box-shadow 0.1s linear, background 0.1s linear;
}
.sf-hud__atk-face > .sf-i { width: 50%; height: 50%; filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.7)); }
.sf-hud__sk.is-atk.is-down .sf-hud__atk-face { background: radial-gradient(circle at 50% 38%, #ffe7ad, #b17a2c 62%, #4a2f0c); color: #2b1a04; box-shadow: 0 0 0 1px rgba(8, 13, 31, 0.95), 0 0 0 max(2.5px, calc(var(--d) * 0.04)) #fff4d6, 0 0 calc(var(--d) * 0.36) rgba(255, 214, 130, 0.95); }
.sf-hud__sk.is-atk.is-forbid .sf-hud__atk-face { filter: grayscale(0.8) brightness(0.65); }

.sf-hud__skills.is-dead .sf-hud__sk { filter: grayscale(1) brightness(0.55); }

/* 「取消」区：手动瞄准时出现，拖进去松手 = 不放 */
.sf-hud__cancel {
  --d: calc(var(--hud-sk) * 1.16);
  position: absolute; right: calc(var(--hud-sk) * 4.4); bottom: calc(var(--hud-sk) * 2.7); width: var(--d); height: var(--d); border-radius: 50%; display: grid; place-items: center; pointer-events: none;
  color: #ffd0d0; background: radial-gradient(circle at 50% 35%, rgba(90, 22, 34, 0.9), rgba(30, 8, 16, 0.92)); box-shadow: 0 0 0 1px rgba(8, 13, 31, 0.9), 0 0 0 max(2px, 2.5u) rgba(255, 120, 120, 0.75), 0 4u 14u rgba(0, 0, 0, 0.55);
  opacity: 0; transform: scale(0.6); transition: opacity 0.12s linear, transform 0.16s var(--sf-ease-spring), background 0.1s linear;
}
.sf-hud__cancel.is-on { opacity: 1; transform: none; }
.sf-hud__cancel.is-hot { transform: scale(1.14); color: #fff; background: radial-gradient(circle at 50% 35%, #ff7a6e, #c2262f 62%, #6e1019); box-shadow: 0 0 0 1px rgba(8, 13, 31, 0.9), 0 0 0 max(2px, 3u) #fff, 0 0 22u rgba(255, 93, 93, 0.95); }
.sf-hud__cancel > span { display: flex; flex-direction: column; align-items: center; gap: 1u; font-size: max(10px, 11u); font-weight: 800; letter-spacing: 0.1em; line-height: 1.1; }
.sf-hud__cancel .sf-i { width: calc(var(--d) * 0.36); height: calc(var(--d) * 0.36); }
/* 竖屏：屏幕窄，取消区正好落在摇杆正上方——往上抬一点，别和摇杆底盘叠在一起 */
@media (orientation: portrait) { .sf-hud__cancel { bottom: calc(var(--hud-sk) * 3.12); } }

/* 技能详情浮层：标签行 → 大白话(比正文大一号，主文字色) → 分隔线 → 数值行 → 详细描述(次文字色) */
.sf-tip .sf-hud-v { color: var(--sf-c-gold-200); font-weight: 700; }
.sf-tip .sf-hud-tiptags { display: flex; flex-wrap: wrap; align-items: center; gap: 4u 8u; margin: 4u 0 1u; }
.sf-tip .sf-hud-tipcast { font-size: var(--sf-fs-xs); color: var(--sf-c-text-3); letter-spacing: 0.06em; }
.sf-tip .sf-hud-tipbrief { margin: 4u 0 0; font-size: var(--sf-fs-md); font-weight: 700; line-height: 1.45; color: var(--sf-c-text); }
.sf-tip .sf-hud-tipline { display: flex; flex-wrap: wrap; gap: 3u 10u; margin: 2u 0 5u; font-size: var(--sf-fs-xs); color: var(--sf-c-cyan-300); }
.sf-tip .sf-hud-tipline .is-warn { color: #ff9c9c; }
.sf-tip .sf-hud-tipbrief + .sf-hud-tipline, .sf-tip .sf-hud-tipbrief + .sf-hud-tipdesc { margin-top: 7u; padding-top: 6u; box-shadow: inset 0 1px 0 var(--sf-c-line); }
.sf-tip .sf-hud-tipdesc { color: var(--sf-c-text-2); }
/* 手机横屏(屏高很小)：详细描述最多三行，其余完整 */
@media (max-height: 460px) and (orientation: landscape) {
  .sf-tip .sf-hud-tipdesc { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; overflow: hidden; }
}
`);

function d$(n) {
  for (let t = 1; t <= 15; t++) if (lm(t)[n] >= 1) return t;
  return 1;
}

function h$(n, t) {
  const e = Math.max(1, t);
  return ks(n.desc).replace(/\{(\w+)(%?)\}/g, (s, i, a) => {
    if (n.values[i] === void 0) return "";
    const o = Nh(n, i, e);
    return `<span class="sf-hud-v sf-num">${a === "%" ? `${Math.round(o * 100)}%` : Number.isInteger(o) ? String(o) : String(Math.round(o * 100) / 100)}</span>`;
  });
}

function u$(n) {
  const t = n.passive;
  return (
    `<div class="sf-tip__title"><span>${ks(t.name)}</span><span class="sf-tip__meta">被动</span></div><div class="sf-hud-tiptags">${ty("passive", t.tags)}</div>` +
    (t.brief ? `<div class="sf-hud-tipbrief">${ks(t.brief)}</div>` : "") +
    `<div class="sf-hud-tipdesc">${ks(t.desc)}</div>`
  );
}
export { XH, QH, D2, Ef, vo, Vn, br, is, uo, gk, JH, Dl, Na, Rl, e$, i$, a$, o$, l$, z2, c$, A3, N2, z4, N4, F4, f$, d$, h$, u$ };
