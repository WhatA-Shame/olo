// 35-ui-3.js — ui｜28 个顶层语句｜62KB
// 对应 game.pretty.js 第 67535–68806 行
// 关键内容：
//   I2                    被动
//   R4                    物攻
//   AH                    能力雷达图
//   RH                    返回标题
//   CH                    键盘示意 */
//   LH                    空格
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { rn, va, yn } from './01-audio.js';
import { Se, US, ea } from './02-data.js';
import { u8 } from './21-core-4.js';
import { $8, G8, Hf, Jn, Kx, M0, Sf, T0, V8, W8, Wx, X8, Xx, Zn, _e, jx, po, q8, qx, ro, z, za, zi } from './32-ui.js';
import { Ia, K1, X1, Y1, ln } from './33-data-2.js';
import { Ad, Ar, Jx, Ml, Po, Qx, S3, T4, Tf, Vt, Zh, ck, dH, ey, fH, fk, hH, hh, k3, ks, ny, rk, ty, uH } from './34-ui-2.js';

const I2 = { passive: "被动", s1: "一技能", s2: "二技能", ult: "大招" },
  MH = { s1: "Q", s2: "E", ult: "R" },
  kH = ["passive", "s1", "s2", "ult"],
  SH = ["flash", "heal", "recall"],
  TH = Jn(`
.sf-select { display: flex; flex-direction: column; padding: max(8u, var(--sf-safe-t)) max(20u, var(--sf-safe-r)) max(14u, var(--sf-safe-b)) max(20u, var(--sf-safe-l)); --hero: #8fe9ff; }
.sf-select__top { display: flex; align-items: center; gap: 14u; flex: none; height: max(44px, 58u); }
.sf-select__top .sf-title { flex: none; font-size: max(19px, 30u); white-space: nowrap; }
.sf-select__lead { min-width: 0; margin: 0 0 0 4u; padding-left: 14u; font-size: var(--sf-fs-sm); letter-spacing: 0.1em; color: var(--sf-c-text-2); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; box-shadow: inset 1px 0 0 var(--sf-c-line-strong); }
.sf-select__top-right { margin-left: auto; flex: none; display: flex; align-items: center; gap: 14u; }
.sf-select__hint { display: flex; align-items: center; gap: 6u; font-size: var(--sf-fs-xs); color: var(--sf-c-text-3); letter-spacing: 0.08em; white-space: nowrap; }
.sf-select__main {
  flex: 1; min-height: 0; display: grid; gap: 12u 18u;
  grid-template-columns: clamp(150px, 268u, 30vw) minmax(0, 1fr) clamp(272px, 424u, 38vw);
  grid-template-rows: minmax(0, 1fr) auto;
  grid-template-areas: 'roster stage detail' 'roster go detail';
}

/* ── 英雄卡 ── */
.sf-select__roster { grid-area: roster; display: flex; flex-direction: column; gap: max(5px, 9u); min-height: 0; }
.sf-hcard {
  --hero: #8fe9ff;
  position: relative; flex: 1 1 0; min-height: 0; max-height: 122u; display: flex; align-items: center; gap: 12u; padding: 0 12u 0 9u; margin: 0; border: 0; cursor: pointer; text-align: left;
  color: var(--sf-c-text); border-radius: 9u; overflow: hidden;
  background: linear-gradient(90deg, rgba(20, 34, 72, 0.82), rgba(10, 17, 40, 0.72));
  box-shadow: inset 0 0 0 1px var(--sf-c-line-strong);
  transition: transform var(--sf-t-mid) var(--sf-ease-out), box-shadow var(--sf-t-mid) linear, background var(--sf-t-mid) linear;
  animation: sf-left-in 0.5s var(--sf-ease-out) both;
}
.sf-hcard::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3u; background: var(--hero); opacity: 0.5; transition: opacity var(--sf-t-mid) linear, width var(--sf-t-mid) var(--sf-ease-out); }
.sf-hcard::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, color-mix(in srgb, var(--hero) 30%, transparent), transparent 70%); opacity: 0; transition: opacity var(--sf-t-mid) linear; pointer-events: none; }
.sf-hcard > * { position: relative; z-index: 1; }
@media (hover: hover) { .sf-hcard:hover { transform: translateX(3u); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hero) 60%, transparent); } .sf-hcard:hover::after { opacity: 0.5; } }
.sf-hcard:active { transform: scale(0.985); }
.sf-hcard.is-active { transform: translateX(6u); box-shadow: inset 0 0 0 max(1px, 1.5u) var(--sf-c-gold-200), 0 0 18u color-mix(in srgb, var(--hero) 45%, transparent), var(--sf-shadow-1); }
.sf-hcard.is-active::before { opacity: 1; width: 5u; box-shadow: 0 0 10u var(--hero); }
.sf-hcard.is-active::after { opacity: 1; }
.sf-hcard__pic { height: min(84u, 76%); width: auto; aspect-ratio: 1; border-radius: 8u; box-shadow: 0 0 0 1px rgba(8, 13, 31, 0.9), 0 0 0 max(2px, 2u) color-mix(in srgb, var(--hero) 55%, #5a6a90); }
.sf-hcard__pic-wrap { position: relative; flex: none; height: 100%; display: flex; align-items: center; }
.sf-hcard__role { position: absolute; right: -7u; bottom: 10%; display: grid; place-items: center; width: max(18px, 24u); height: max(18px, 24u); border-radius: 50%; color: #08101f; background: var(--role); box-shadow: 0 0 0 max(1.5px, 2u) #0a1128; }
.sf-hcard__role .sf-i { width: 62%; height: 62%; }
.sf-hcard__info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 5u; }
.sf-hcard__name { font-weight: 800; font-size: max(15px, 22u); line-height: 1.15; letter-spacing: 0.1em; white-space: nowrap; }
.sf-hcard__name .sf-heroname__role { font-size: 0.62em; font-weight: 700; letter-spacing: 0.06em; }
.sf-hcard__title { font-size: var(--sf-fs-xs); line-height: 1.2; letter-spacing: 0.22em; color: var(--sf-c-text-3); white-space: nowrap; }
.sf-hcard.is-active .sf-hcard__name { color: var(--sf-c-gold-100); }
.sf-hcard.is-active .sf-hcard__title { color: var(--sf-c-text-2); }
.sf-hcard__meta { display: flex; align-items: center; flex-wrap: wrap; gap: 3u 10u; font-size: var(--sf-fs-xs); color: var(--sf-c-text-2); line-height: 1.2; white-space: nowrap; }
.sf-hcard__meta > span { display: inline-flex; align-items: center; gap: 4u; }
.sf-hcard__meta .sf-i { width: 1.2em; height: 1.2em; }
.sf-hcard__meta .sf-stars { font-size: var(--sf-fs-xs); }

/* ── 立绘舞台 ── */
.sf-select__stage { grid-area: stage; position: relative; min-height: 0; min-width: 0; }
.sf-select__glow { position: absolute; left: 8%; right: 8%; bottom: 2%; height: 34%; border-radius: 50%; background: radial-gradient(ellipse at center, color-mix(in srgb, var(--hero) 46%, transparent), transparent 68%); filter: blur(6u); opacity: 0.8; transition: background 0.4s linear; pointer-events: none; }
/* 立绘背后的星轨环（立绘画布透明时可见）：只做 transform 动画 */
.sf-select__rings { position: absolute; inset: 0 0 6% 0; display: grid; place-items: center; pointer-events: none; }
.sf-select__ring { grid-area: 1 / 1; height: min(82%, 96vw); aspect-ratio: 1; border-radius: 50%; opacity: 0.6;
  background: conic-gradient(from 0deg, color-mix(in srgb, var(--hero) 80%, transparent) 0deg, transparent 70deg, transparent 180deg, color-mix(in srgb, var(--hero) 55%, transparent) 200deg, transparent 290deg, color-mix(in srgb, var(--hero) 80%, transparent) 360deg);
  -webkit-mask: radial-gradient(closest-side, transparent calc(100% - 2px), #000 calc(100% - 1.5px)); mask: radial-gradient(closest-side, transparent calc(100% - 2px), #000 calc(100% - 1.5px));
  animation: sf-spin 48s linear infinite; }
.sf-select__ring--in { height: min(62%, 72vw); opacity: 0.4; animation-duration: 36s; animation-direction: reverse; }
/* 画布蒙版三层相交：四角的椭圆渐隐 + 左右两边、底边的线性渐隐。椭圆那层在边的中段几乎不透明，
   长兵器(牛伟的斧、樊哙的盾)伸出画布时会被边缘一刀切断；加上线性渐隐后是渐渐淡出 */
.sf-select__canvas {
  position: absolute; inset: 0; width: 100%; height: 100%; display: block; touch-action: none;
  -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 9%, #000 91%, transparent 100%), linear-gradient(180deg, #000 0, #000 93%, transparent 100%), radial-gradient(ellipse 72% 78% at 50% 50%, #000 62%, transparent 100%);
  mask-image: linear-gradient(90deg, transparent 0, #000 9%, #000 91%, transparent 100%), linear-gradient(180deg, #000 0, #000 93%, transparent 100%), radial-gradient(ellipse 72% 78% at 50% 50%, #000 62%, transparent 100%);
  -webkit-mask-composite: source-in; mask-composite: intersect;
}
.sf-select__plate { position: absolute; left: 0; top: 4u; right: 0; display: flex; flex-direction: column; align-items: flex-start; gap: 4u; pointer-events: none; }
.sf-select__plate.is-swap { animation: sf-plate-in 0.45s var(--sf-ease-out) both; }
@keyframes sf-plate-in { from { opacity: 0; transform: translateX(-16u); } to { opacity: 1; transform: none; } }
.sf-select__name { display: flex; align-items: baseline; margin: 0; font-weight: 900; font-size: max(30px, 62u); line-height: 1.05; letter-spacing: 0.12em; white-space: nowrap; }
/* 「 · 坦克」：约 0.5em、职业色，带职业图标 */
.sf-select__name-role { display: inline-flex; align-items: center; gap: 0.18em; margin-left: 0.1em; font-size: 0.5em; font-weight: 800; letter-spacing: 0.1em; color: var(--role); text-shadow: 0 1px 4px rgba(0, 0, 0, 0.8); }
.sf-select__name-role .sf-i { width: 1em; height: 1em; vertical-align: 0; }
.sf-select__name-role::before { content: '·'; margin-right: 0.1em; color: var(--sf-c-text-3); }
.sf-select__sub { display: flex; align-items: center; gap: 10u; font-size: var(--sf-fs-md); letter-spacing: 0.3em; color: var(--sf-c-text); text-shadow: 0 1px 4px rgba(0, 0, 0, 0.9); }
.sf-select__sub::before { content: ''; width: 26u; height: 2px; background: linear-gradient(90deg, var(--hero), transparent); }
.sf-select__nav { position: absolute; top: 50%; transform: translateY(-50%); }
.sf-select__nav--prev { left: 0; }
.sf-select__nav--next { right: 0; }
.sf-select__nav .sf-iconbtn { border-radius: 50%; }

/* ── 难度 + 开始 ── */
.sf-select__go { grid-area: go; display: flex; align-items: stretch; gap: 14u; padding: 10u 12u; border-radius: var(--sf-r-md); background: linear-gradient(180deg, rgba(20, 34, 72, 0.78), rgba(8, 14, 34, 0.86)); box-shadow: inset 0 0 0 1px var(--sf-c-line-strong), inset 0 1px 0 rgba(143, 233, 255, 0.12); }
.sf-select__diff { flex: 1; min-width: 0; display: flex; flex-direction: column; justify-content: center; gap: 5u; }
.sf-select__diff-head { display: flex; align-items: center; gap: 10u; }
.sf-select__diff-head .sf-heading { flex: none; }
.sf-select__diff-head .sf-heading::after { display: none; }
.sf-select__diff-head .sf-seg { flex: 1; max-width: 300u; }
.sf-select__diff-head .sf-seg__opt { padding: 0 6u; }
.sf-select__diff-desc { margin: 0; min-height: 1.5em; font-size: var(--sf-fs-xs); line-height: 1.5; color: var(--sf-c-text-2); }
.sf-select__go .sf-btn--lg { flex: none; align-self: center; padding: 0 30u; }

/* ── 详情 ── */
.sf-select__detail { grid-area: detail; display: flex; flex-direction: column; min-height: 0; min-width: 0; animation: sf-right-in 0.5s 0.1s var(--sf-ease-out) both; }
.sf-select__detail-body { flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 10u; padding: 14u 18u 14u; }
.sf-select__detail-body > * { flex: none; }
.sf-select__detail-body.is-swap > * { animation: sf-rise-in 0.4s var(--sf-ease-out) both; }
.sf-select__detail-body.is-swap > *:nth-child(2) { animation-delay: 0.04s; }
.sf-select__detail-body.is-swap > *:nth-child(3) { animation-delay: 0.08s; }
.sf-select__detail-body.is-swap > *:nth-child(4) { animation-delay: 0.12s; }
.sf-select__detail-body.is-swap > *:nth-child(n + 5) { animation-delay: 0.16s; }
.sf-select__tags { display: flex; flex-wrap: wrap; align-items: center; gap: 6u; }
.sf-select__tags .sf-stars { margin-left: 2u; }
.sf-select__lore { margin: 0; padding-left: 10u; font-size: var(--sf-fs-sm); line-height: 1.65; color: var(--sf-c-text-2); box-shadow: inset max(2px, 2u) 0 0 color-mix(in srgb, var(--hero) 70%, transparent); }
/* 职业一句大白话：详情的第一句话 */
.sf-select__rolebrief { margin: 0; font-size: var(--sf-fs-md); font-weight: 700; line-height: 1.45; color: var(--sf-c-text); }
.sf-select__rolebrief b { color: var(--role); font-weight: 800; }
.sf-select__tips { margin: 0; display: flex; gap: 8u; padding: 7u 10u; font-size: var(--sf-fs-sm); line-height: 1.6; color: var(--sf-c-text); }
.sf-select__tips .sf-i { flex: none; margin-top: 0.2em; color: var(--sf-c-gold-300); }
.sf-select__abil { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 4u 14u; }
.sf-radar { width: max(140px, 158u); margin: -4u 0 -6u; }
.sf-radar svg { display: block; width: 100%; height: auto; overflow: visible; }
.sf-radar text { font-family: var(--sf-font); font-size: 12.5px; font-weight: 600; fill: var(--sf-c-text-2); }
.sf-statlist { flex: 1 1 max(126px, 160u); min-width: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 3u 10u; margin: 0; }
.sf-statlist div { display: flex; align-items: baseline; justify-content: space-between; gap: 6u; padding-bottom: 2u; font-size: var(--sf-fs-xs); box-shadow: inset 0 -1px 0 var(--sf-c-line); white-space: nowrap; }
.sf-statlist dt { color: var(--sf-c-text-3); }
.sf-statlist dd { margin: 0; font-size: var(--sf-fs-sm); color: var(--sf-c-text); }
.sf-skills { display: flex; flex-wrap: wrap; align-items: flex-start; gap: 8u 10u; }
.sf-skills__sum { margin-left: auto; display: flex; align-items: center; gap: max(4px, 6u); height: max(42px, 54u); padding-left: 10u; box-shadow: inset 1px 0 0 var(--sf-c-line-strong); }
.sf-skills__sum .sf-slot { --sf-slot: max(26px, 32u); cursor: help; box-shadow: 0 0 0 1px rgba(8, 13, 31, 0.95), 0 0 0 max(1.5px, 2u) rgba(150, 178, 235, 0.5); }
.sf-skill { display: flex; flex-direction: column; align-items: center; gap: 5u; padding: 0; margin: 0; border: 0; background: none; cursor: pointer; color: var(--sf-c-text-3); font-size: var(--sf-fs-xs); letter-spacing: 0.06em; }
.sf-skill .sf-slot { --sf-slot: max(42px, 54u); transition: transform var(--sf-t-fast) var(--sf-ease-out), box-shadow var(--sf-t-fast) linear; }
.sf-skill[data-slot='passive'] .sf-slot { border-radius: 50%; }
@media (hover: hover) { .sf-skill:hover .sf-slot { transform: translateY(-2u); filter: brightness(1.12); } }
.sf-skill:active .sf-slot { transform: scale(0.94); }
.sf-skill.is-active { color: var(--sf-c-gold-200); }
.sf-skill.is-active .sf-slot { box-shadow: 0 0 0 1px rgba(8, 13, 31, 0.95), 0 0 0 max(2px, 2.5u) var(--sf-c-gold-100), 0 0 16u color-mix(in srgb, var(--hero) 80%, transparent); }
.sf-skill__tag { font-weight: 700; }
.sf-skilldesc { padding: 9u 12u 10u; min-height: 6.6em; }
.sf-skilldesc__head { display: flex; align-items: center; flex-wrap: wrap; gap: 4u 8u; margin-bottom: 5u; }
.sf-skilldesc__name { font-weight: 800; font-size: var(--sf-fs-lg); color: var(--sf-c-gold-100); letter-spacing: 0.1em; margin-right: 2u; }
.sf-skilldesc__slot { margin-left: auto; font-size: var(--sf-fs-xs); color: var(--sf-c-text-3); letter-spacing: 0.08em; white-space: nowrap; }
.sf-skilldesc__tags { display: flex; flex-wrap: wrap; align-items: center; gap: 4u 8u; }
.sf-skilldesc__cast { font-size: var(--sf-fs-xs); color: var(--sf-c-text-3); letter-spacing: 0.06em; }
/* 一句大白话：比正文大一号、主文字色，排在数值与详细描述前面 */
.sf-skilldesc__brief { margin: 5u 0 0; font-size: var(--sf-fs-md); font-weight: 700; line-height: 1.5; color: var(--sf-c-text); }
.sf-skilldesc__meta { display: flex; flex-wrap: wrap; gap: 4u 6u; margin: 7u 0 5u; padding-top: 7u; box-shadow: inset 0 1px 0 var(--sf-c-line); }
.sf-skilldesc__text { margin: 0; font-size: var(--sf-fs-sm); line-height: 1.7; color: var(--sf-c-text-2); }
.sf-skilldesc__text b { font-family: var(--sf-font-num); font-weight: 700; color: var(--sf-c-gold-200); }
.sf-skilldesc__text i { font-style: normal; font-weight: 600; white-space: nowrap; }
.sf-skilldesc__text i[data-k='ad'] { color: #ffa066; }
.sf-skilldesc__text i[data-k='ap'] { color: #9cb4ff; }
.sf-skilldesc__text i[data-k='hp'] { color: #7fe6a0; }
.sf-build { display: flex; flex-wrap: wrap; align-items: center; gap: max(5px, 8u); }
.sf-build .sf-slot { --sf-slot: max(38px, 46u); cursor: help; }
.sf-build__cost { margin-left: auto; display: inline-flex; align-items: center; gap: 4u; font-size: var(--sf-fs-sm); color: var(--sf-c-gold-200); white-space: nowrap; }

/* ── 矮屏（横屏手机） ── */
@media (max-height: 520px) and (orientation: landscape) {
  .sf-select { padding-top: max(4u, var(--sf-safe-t)); padding-bottom: max(8u, var(--sf-safe-b)); }
  .sf-select__main { gap: 8u 12u; }
  .sf-hcard { gap: 9u; padding: 0 8u 0 7u; }
  .sf-hcard__info { gap: 3u; }
  .sf-hcard__title { display: none; }
  .sf-select__lead { display: none; }
  .sf-select__name { font-size: max(26px, 46u); }
  .sf-select__main { grid-template-columns: clamp(150px, 232u, 26vw) minmax(0, 1fr) clamp(272px, 400u, 37vw); }
  .sf-select__go { display: grid; grid-template-columns: minmax(0, 1fr) auto; grid-template-areas: 'seg btn' 'desc desc'; align-items: center; gap: 5u 9u; padding: 7u 9u 6u; }
  .sf-select__diff, .sf-select__diff-head { display: contents; }
  .sf-select__diff-head .sf-heading { display: none; }
  .sf-select__diff-head .sf-seg { grid-area: seg; max-width: none; }
  .sf-select__diff-desc { grid-area: desc; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .sf-select__diff-desc::before { content: '对手难度 · '; color: var(--sf-c-gold-300); }
  .sf-select__go .sf-btn--lg { grid-area: btn; --sf-btn-h: max(40px, 50u); padding: 0 18u; font-size: max(15px, 20u); letter-spacing: 0.14em; }
  .sf-select__detail-body { padding: 12u 14u; gap: 10u; }
  .sf-select__hint { display: none; }
  /* 详情栏窄：技能图标与通用技能收小一点，四个技能 + 三个通用技能排在同一行 */
  .sf-skills { gap: 6px 6px; }
  .sf-skill .sf-slot { --sf-slot: 40px; }
  .sf-skills__sum { gap: 3px; height: 40px; padding-left: 7px; }
  .sf-skills__sum .sf-slot { --sf-slot: 22px; }
}

/* ── 小横屏（如 667×375）：英雄卡只留头像与名字，给立绘和详情腾地方 ── */
@media (max-height: 520px) and (orientation: landscape) and (max-width: 780px) {
  .sf-select__main { grid-template-columns: max(60px, 78u) minmax(0, 1fr) clamp(250px, 39vw, 300px); }
  .sf-select__roster { gap: 4px; }
  .sf-hcard { flex-direction: column; justify-content: center; gap: 1px; padding: 2px; text-align: center; }
  .sf-hcard__pic-wrap { height: auto; flex: 0 1 auto; min-height: 0; }
  .sf-hcard__pic { height: max(30px, 38u); }
  .sf-hcard__role { display: none; }
  .sf-hcard__info { flex: none; align-items: center; }
  .sf-hcard__name { font-size: var(--sf-fs-sm); letter-spacing: 0.04em; }
  .sf-hcard__name .sf-heroname__role { display: none; }
  .sf-hcard__meta { display: none; }
  .sf-select__go .sf-seg__opt { padding: 0 2u; letter-spacing: 0.02em; }
  .sf-select__go .sf-btn--lg { padding: 0 12u; letter-spacing: 0.06em; }
  .sf-select__nav .sf-iconbtn { width: 36px; height: 36px; }
}

/* ── 竖屏：纵向堆叠 ── */
@media (orientation: portrait) {
  .sf-select { padding-left: max(12u, var(--sf-safe-l)); padding-right: max(12u, var(--sf-safe-r)); }
  .sf-select__hint { display: none; }
  .sf-select__main {
    grid-template-columns: minmax(0, 1fr); gap: 10u;
    grid-template-rows: auto minmax(120px, 30fr) minmax(0, 44fr) auto;
    grid-template-areas: 'roster' 'stage' 'detail' 'go';
  }
  .sf-select__roster { flex-direction: row; gap: max(5px, 8u); }
  .sf-hcard { flex-direction: column; justify-content: center; max-height: none; gap: 5u; padding: 8u 2u 7u; text-align: center; animation-name: sf-drop-in; }
  .sf-hcard::before { left: 0; right: 0; top: auto; bottom: 0; width: auto; height: 3u; }
  .sf-hcard.is-active::before { width: auto; height: 4u; }
  .sf-hcard::after { background: linear-gradient(0deg, color-mix(in srgb, var(--hero) 30%, transparent), transparent 80%); }
  .sf-hcard.is-active, .sf-hcard:hover { transform: translateY(-3u); }
  .sf-hcard__pic-wrap { height: auto; }
  .sf-hcard__pic { width: max(44px, 58u); height: auto; }
  .sf-hcard__role { right: -5u; bottom: -3u; }
  .sf-hcard__info { flex: none; align-items: center; gap: 0; }
  .sf-hcard__name { font-size: var(--sf-fs-md); }
  /* 竖屏的卡片窄：只写名字，职业看头像右下角的职业徽标 */
  .sf-hcard__name .sf-heroname__role, .sf-hcard__title, .sf-hcard__meta { display: none; }
  .sf-select__lead { display: none; }
  .sf-select__name { font-size: max(28px, 48u); }
  .sf-select__nav { top: auto; bottom: 2u; transform: none; }
  .sf-select__go { flex-direction: column; gap: 9u; padding: 10u; }
  .sf-select__diff-head .sf-seg { max-width: none; }
  .sf-select__go .sf-btn--lg { align-self: stretch; }
  .sf-select__detail-body { padding: 12u 12u; gap: 10u; }
}
`),
  A4 = (n) => {
    const t = n[0],
      e = n[n.length - 1];
    return t === e ? String(t) : `${t}~${e}`;
  };

function R4(n) {
  return ks(n).replace(/\(\+[^)]*\)|\d+(?:\.\d+)?%?(?:\/\d+(?:\.\d+)?%?)*/g, (t) =>
    t.startsWith("(")
      ? `<i data-k="${t.includes("物攻") ? "ad" : t.includes("法强") ? "ap" : "hp"}">${t}</i>`
      : `<b>${t.replace(/\//g, "/<wbr>")}</b>`,
  );
}

function uk(n) {
  return fk(n);
}

function EH(n) {
  const t = n.build.some((e) => ln[e].category === "boots" && ln[e].tier === 2);
  return n.build.filter((e) => !(t && e === "boots")).slice(0, 6);
}

function AH(n) {
  const t = hH[n],
    e = Se[n].palette.glow,
    s = 88,
    i = 82,
    a = 54,
    o = (d, h) => {
      const u = (-90 + d * 72) * (Math.PI / 180);
      return [
        Math.round((s + Math.cos(u) * a * h) * 10) / 10,
        Math.round((i + Math.sin(u) * a * h) * 10) / 10,
      ];
    },
    r = (d) => Ad.map((h, u) => o(u, d).join(",")).join(" "),
    l = Ad.map((d, h) => o(h, Math.max(0.12, t[d] / 10)).join(",")).join(" "),
    c = Ad.map((d, h) => {
      const [u, m] = o(h, 1.25),
        x = Math.abs(u - s) < 6 ? "middle" : u > s ? "start" : "end";
      return `<text x="${u + (x === "start" ? -8 : x === "end" ? 8 : 0)}" y="${m + 4.5}" text-anchor="${x}">${fH[d]}</text>`;
    }).join(""),
    f = Ad.map((d, h) => {
      const [u, m] = o(h, Math.max(0.12, t[d] / 10));
      return `<circle cx="${u}" cy="${m}" r="2.6" fill="#fff"/>`;
    }).join("");
  return (
    `<svg viewBox="0 0 176 160" role="img" aria-label="能力雷达图"><polygon points="${r(1)}" fill="rgba(4,8,22,.55)" stroke="rgba(150,178,235,.4)" stroke-width="1"/><polygon points="${r(0.66)}" fill="none" stroke="rgba(150,178,235,.2)" stroke-width="1"/><polygon points="${r(0.33)}" fill="none" stroke="rgba(150,178,235,.2)" stroke-width="1"/>` +
    Ad.map(
      (d, h) =>
        `<line x1="${s}" y1="${i}" x2="${o(h, 1)[0]}" y2="${o(h, 1)[1]}" stroke="rgba(150,178,235,.2)" stroke-width="1"/>`,
    ).join("") +
    `<polygon points="${l}" fill="${e}" fill-opacity=".34" stroke="${e}" stroke-width="2" stroke-linejoin="round"/>` +
    f +
    c +
    "</svg>"
  );
}

function RH(n) {
  (Zn("sf-menu-select", TH), Jx());
  const { host: t } = n;
  let e = n.initial.heroId,
    s = n.initial.difficulty,
    i = "s1",
    a = null,
    o = !1;
  const r = [],
    l = z("div", "sf-screen sf-select"),
    c = z(
      "header",
      "sf-select__top",
      T0({ icon: Vt("back"), label: "返回标题", sound: "back", onClick: () => n.onBack() }),
      z("h2", "sf-title sf-metal", "选择英雄"),
      z("p", "sf-select__lead", "星陨高原的坠星之力，召来了不同时代的英杰。"),
      z(
        "div",
        "sf-select__top-right",
        z(
          "span",
          "sf-select__hint",
          z("span", "sf-kbd", "←"),
          z("span", "sf-kbd", "→"),
          "切换英雄",
          z("span", "sf-kbd", "Enter"),
          "开始",
        ),
        T0({
          icon: Vt("settings"),
          label: "设置",
          onClick: () =>
            ny(n.root, {
              get: () => t.getSettings(),
              update: (q) => t.updateSettings(q),
              audio: t.audio,
              mode: "menu",
            }),
        }),
      ),
    ),
    f = z("div", "sf-select__roster");
  (f.setAttribute("role", "listbox"), f.setAttribute("aria-label", "英雄列表"));
  const d = new Map();
  Ml.forEach((q, et) => {
    const ct = Se[q],
      rt = z("span", "sf-hcard__role", _e(Ar(ct.role))),
      mt = z(
        "button",
        "sf-hcard",
        z("span", "sf-hcard__pic-wrap", Zh(t, q, "sf-hcard__pic"), rt),
        z(
          "span",
          "sf-hcard__info",
          z("span", "sf-hcard__name", Qx(q)),
          z("span", "sf-hcard__title", ct.title),
          z(
            "span",
            "sf-hcard__meta",
            z("span", null, _e(k3(ct.lane)), S3[ct.lane]),
            z("span", null, "难度", T4(ct.difficulty)),
          ),
        ),
      );
    ((mt.type = "button"),
      mt.setAttribute("role", "option"),
      (mt.dataset.hero = q),
      (mt.dataset.sfSnd = "select"),
      mt.style.setProperty("--hero", ct.palette.glow),
      mt.style.setProperty("--role", Tf[ct.role]),
      (mt.style.animationDelay = `${0.06 * et}s`),
      mt.addEventListener("click", () => M(q)),
      d.set(q, mt),
      f.appendChild(mt));
  });
  const h = z("canvas", "sf-select__canvas"),
    u = z("div", "sf-select__plate"),
    m = z(
      "div",
      "sf-select__stage",
      z("div", "sf-select__glow"),
      z(
        "div",
        "sf-select__rings",
        z("div", "sf-select__ring"),
        z("div", "sf-select__ring sf-select__ring--in"),
      ),
      h,
      u,
      z(
        "div",
        "sf-select__nav sf-select__nav--prev",
        T0({ icon: Vt("chevron_left"), label: "上一位英雄", sound: "select", onClick: () => k(-1) }),
      ),
      z(
        "div",
        "sf-select__nav sf-select__nav--next",
        T0({ icon: Vt("chevron_right"), label: "下一位英雄", sound: "select", onClick: () => k(1) }),
      ),
    ),
    x = z("p", "sf-select__diff-desc"),
    p = V8({
      options: uH.map((q) => ({ value: q, label: hh[q].label })),
      value: s,
      label: "对手难度",
      onChange: (q) => {
        ((s = q), (x.textContent = hh[q].desc), n.onChange?.({ heroId: e, difficulty: s }));
      },
    });
  x.textContent = hh[s].desc;
  const g = po({
      label: "开始对战",
      variant: "primary",
      size: "lg",
      pulse: !0,
      sound: "ready",
      onClick: () => S(),
    }),
    y = z(
      "div",
      "sf-select__go",
      z(
        "div",
        "sf-select__diff",
        z("div", "sf-select__diff-head", z("h3", "sf-heading", "对手难度"), p.el),
        x,
      ),
      g,
    ),
    v = z("div", "sf-select__detail-body sf-scroll"),
    _ = z("aside", "sf-select__detail sf-panel", v);
  l.append(c, z("div", "sf-select__main", f, m, y, _));
  function k(q) {
    const et = Ml.indexOf(e);
    M(Ml[(et + q + Ml.length) % Ml.length]);
  }
  function M(q) {
    if (q !== e) {
      ((e = q), (i = "s1"), E(!0));
      try {
        a?.setHero(q);
      } catch {}
      n.onChange?.({ heroId: e, difficulty: s });
    }
  }
  function S() {
    o || ((o = !0), (g.disabled = !0), n.onConfirm({ heroId: e, difficulty: s }));
  }
  function b(q) {
    try {
      a?.play(q === "passive" ? "attack" : q === "s1" ? "cast_s1" : q === "s2" ? "cast_s2" : "cast_ult");
    } catch {}
  }
  const w = ey() === "kbm";
  function T(q, et) {
    const ct = z("div", "sf-skilldesc sf-inset"),
      rt = z("div", "sf-skilldesc__head"),
      mt = z("div", "sf-skilldesc__tags"),
      nt = z("p", "sf-skilldesc__text"),
      H = et === "passive" ? null : q.skills[et],
      st = H ?? q.passive;
    if (
      (rt.append(z("span", "sf-skilldesc__name", st.name)),
      H && et !== "passive" && w && rt.append(z("span", "sf-kbd", MH[et])),
      rt.append(z("span", "sf-skilldesc__slot", I2[et])),
      (mt.innerHTML = ty(et, st.tags)),
      H && mt.append(z("span", "sf-skilldesc__cast", X1(H.cast))),
      ct.append(rt, mt),
      st.brief && ct.append(z("p", "sf-skilldesc__brief", st.brief)),
      H)
    ) {
      const tt = Y1(H.cast);
      (ct.append(
        z(
          "div",
          "sf-skilldesc__meta",
          za(`冷却 ${A4(H.cooldown)} 秒`, "cyan", Vt("clock")),
          za(`消耗 ${A4(H.manaCost)}`, "blue", Vt("mana")),
          tt ? za(tt, "mute") : null,
        ),
      ),
        (nt.innerHTML = R4(US(H))));
    } else (ct.append(z("div", "sf-skilldesc__meta")), (nt.innerHTML = R4(q.passive.desc)));
    return (ct.append(nt), ct);
  }
  function E(q) {
    const et = Se[e];
    (l.style.setProperty("--hero", et.palette.glow),
      l.style.setProperty("--role", Tf[et.role]),
      d.forEach((ot, j) => {
        const at = j === e;
        (ot.classList.toggle("is-active", at), ot.setAttribute("aria-selected", String(at)));
      }),
      (u.textContent = ""),
      u.append(
        z(
          "h3",
          "sf-select__name",
          z("span", "sf-metal", et.name),
          z("small", "sf-select__name-role", _e(Ar(et.role)), et.roleName),
        ),
        z("span", "sf-select__sub", et.title),
      ));
    for (const ot of r.splice(0)) ot();
    ((v.textContent = ""), (v.scrollTop = 0));
    const ct = z(
        "div",
        "sf-select__tags",
        za(et.roleName, "gold", Ar(et.role)),
        za(S3[et.lane], "cyan", k3(et.lane)),
        za(et.attackType === "melee" ? "近战" : "远程", "mute"),
        z("span", "sf-dim", "难度"),
        T4(et.difficulty),
      ),
      rt = z("p", "sf-select__rolebrief", z("b", null, `${et.roleName}：`), dH[et.role]),
      mt = z("p", "sf-select__tips sf-inset", _e(Vt("info")), z("span", null, et.tips)),
      nt = z("div", "sf-radar");
    nt.innerHTML = AH(e);
    const H = et.base,
      st = [
        ["生命", String(H.hp)],
        ["法力", String(H.mana)],
        ["物攻", String(H.ad)],
        ["攻速", H.attackSpeed.toFixed(2)],
        ["护甲", String(H.armor)],
        ["魔抗", String(H.mr)],
        ["移速", H.moveSpeed.toFixed(1)],
        ["射程", H.attackRange.toFixed(1)],
      ],
      tt = z(
        "dl",
        "sf-statlist",
        ...st.map(([ot, j]) => z("div", null, z("dt", null, ot), z("dd", "sf-num", j))),
      ),
      it = z("div", "sf-skills"),
      D = z("div"),
      Q = new Map(),
      $ = (ot) => {
        ((i = ot),
          Q.forEach((j, at) => j.classList.toggle("is-active", at === ot)),
          (D.textContent = ""),
          D.appendChild(T(et, ot)));
      };
    for (const ot of kH) {
      const j = ck(ot, ot === "passive" ? et.passive.tags : et.skills[ot].tags),
        at = z("span", "sf-skill__tag", j ? j.text : I2[ot]);
      j && (at.style.color = j.color);
      const Rt = z("button", "sf-skill", ro(Ia(e, ot)), at);
      ((Rt.type = "button"),
        (Rt.dataset.slot = ot),
        (Rt.dataset.sfSnd = "click"),
        Rt.setAttribute(
          "aria-label",
          `${I2[ot]}：${ot === "passive" ? et.passive.name : et.skills[ot].name}`,
        ),
        Rt.addEventListener("click", () => {
          ($(ot), b(ot));
        }),
        Q.set(ot, Rt),
        it.appendChild(Rt));
    }
    $(i);
    const ut = z("div", "sf-skills__sum");
    for (const ot of SH) {
      const j = ea[ot],
        at = ro(K1(ot), { round: !0, label: j.name });
      ((at.tabIndex = 0),
        r.push(
          M0(
            at,
            () =>
              `<div class="sf-tip__title"><span>${j.name}</span><span class="sf-tip__meta sf-num">通用技能 · 冷却 ${j.cooldown} 秒</span></div><div style="font-weight:700;color:var(--sf-c-text)">${ks(j.brief)}</div><div>${ks(j.desc)}</div>`,
          ),
        ),
        ut.appendChild(at));
    }
    it.appendChild(ut);
    const N = EH(et),
      J = z("div", "sf-build");
    let Z = 0;
    for (const ot of N) {
      const j = ln[ot];
      Z += j.cost;
      const at = ro(Po(ot), { label: j.name });
      ((at.tabIndex = 0), r.push(M0(at, () => uk(j))), J.appendChild(at));
    }
    if (
      (J.appendChild(z("span", "sf-build__cost sf-num", _e(Vt("gold")), String(Z))),
      v.append(
        ct,
        rt,
        mt,
        z("h4", "sf-heading", "技能"),
        it,
        D,
        z("h4", "sf-heading", "能力"),
        z("div", "sf-select__abil", nt, tt),
        z("h4", "sf-heading", "推荐出装"),
        J,
        z("h4", "sf-heading", "人物"),
        z("p", "sf-select__lore", et.lore),
      ),
      q)
    )
      for (const ot of [u, v]) (ot.classList.remove("is-swap"), ot.offsetWidth, ot.classList.add("is-swap"));
  }
  const A = (q) => {
    if (Sf() || o) return;
    const et = document.activeElement instanceof HTMLElement ? document.activeElement.tagName : "";
    switch (q.key) {
      case "ArrowLeft":
      case "ArrowUp":
        if (et === "INPUT") return;
        (q.preventDefault(), t.audio.ui("select"), k(-1));
        break;
      case "ArrowRight":
      case "ArrowDown":
        if (et === "INPUT") return;
        (q.preventDefault(), t.audio.ui("select"), k(1));
        break;
      case "Enter":
        if ((Xx(l) && !document.activeElement.classList.contains("sf-hcard")) || q.repeat) return;
        (q.preventDefault(), t.audio.ui("ready"), S());
        break;
      case "Escape":
        (q.preventDefault(), t.audio.ui("back"), n.onBack());
        break;
    }
  };
  window.addEventListener("keydown", A);
  const C = typeof ResizeObserver < "u" ? new ResizeObserver(() => a?.resize()) : null,
    R = () => a?.resize();
  let I = 0;
  const P = () => {
      if (!h.isConnected || h.clientWidth === 0) {
        I = requestAnimationFrame(P);
        return;
      }
      try {
        ((a = t.createHeroPreview(h, e)), a.resize());
      } catch {
        a = null;
      }
      (C?.observe(m), window.addEventListener("resize", R));
    },
    F = window.setTimeout(() => {
      I = requestAnimationFrame(P);
    }, 280);
  let L = null;
  const B = (q) => {
      q.pointerType !== "mouse" && q.target === h && (L = q.clientX);
    },
    G = (q) => {
      if (L === null) return;
      const et = q.clientX - L;
      ((L = null), Math.abs(et) > 48 && (t.audio.ui("select"), k(et < 0 ? 1 : -1)));
    };
  return (
    m.addEventListener("pointerdown", B),
    m.addEventListener("pointerup", G),
    m.addEventListener("pointercancel", () => (L = null)),
    E(!1),
    {
      el: l,
      freeze: () => {
        o = !0;
      },
      dispose: () => {
        (window.clearTimeout(F),
          cancelAnimationFrame(I),
          window.removeEventListener("keydown", A),
          window.removeEventListener("resize", R),
          C?.disconnect());
        for (const q of r.splice(0)) q();
        try {
          a?.dispose();
        } catch {}
        a = null;
      },
    }
  );
}

function Xc(n, t) {
  const e = n[t];
  return typeof e == "boolean" ? e : !0;
}

function E3(n, t, e) {
  const s = { [t]: e };
  n.updateSettings(s);
}

const CH = Jn(`
.sf-howto { display: flex; flex-direction: column; gap: 14u; }
.sf-howto__pane { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); gap: 22u; align-items: center; animation: sf-fade-in 0.25s linear both; }
.sf-howto__fig { display: flex; align-items: center; justify-content: center; gap: 18u; padding: 16u; min-width: 0; }
.sf-howto__list { display: flex; flex-direction: column; gap: 9u; margin: 0; padding: 0; list-style: none; min-width: 0; }
.sf-howto__list li { display: grid; grid-template-columns: auto 1fr; gap: 3u 10u; align-items: baseline; font-size: var(--sf-fs-sm); line-height: 1.55; color: var(--sf-c-text-2); }
.sf-howto__list b { font-weight: 700; font-size: var(--sf-fs-md); color: var(--sf-c-text); letter-spacing: 0.08em; white-space: nowrap; }
.sf-howto__list em { font-style: normal; color: var(--sf-c-gold-200); }
.sf-howto__dot { display: inline-grid; place-items: center; width: max(18px, 20u); height: max(18px, 20u); border-radius: 50%; transform: translateY(0.2em); font-family: var(--sf-font-num); font-weight: 700; font-size: var(--sf-fs-xs); color: #08101f; background: var(--tone); box-shadow: 0 0 8u var(--tone); }
.sf-howto [data-tone='move'] { --tone: #5cd6f7; }
.sf-howto [data-tone='atk'] { --tone: #ff8a7a; }
.sf-howto [data-tone='skill'] { --tone: #f3cf85; }
.sf-howto [data-tone='sum'] { --tone: #6fe3a1; }
.sf-howto [data-tone='ui'] { --tone: #b9a2ff; }

/* 键盘示意 */
.sf-keys { display: grid; grid-template-columns: repeat(13, max(13px, 15u)); grid-auto-rows: max(26px, 30u); gap: max(3px, 4u); }
.sf-key {
  display: grid; place-items: center; border-radius: 5u; font-family: var(--sf-font-num); font-weight: 700; font-size: var(--sf-fs-xs); line-height: 1; color: var(--sf-c-text-4);
  background: rgba(20, 34, 72, 0.6); box-shadow: inset 0 0 0 1px rgba(150, 178, 235, 0.16), 0 2u 0 rgba(4, 8, 22, 0.8);
}
.sf-key[data-tone] { color: #08101f; background: linear-gradient(180deg, color-mix(in srgb, var(--tone) 70%, #fff), var(--tone)); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 2u 0 rgba(4, 8, 22, 0.8), 0 0 10u color-mix(in srgb, var(--tone) 55%, transparent); }
.sf-mouse { width: max(58px, 76u); flex: none; }
.sf-mouse svg { display: block; width: 100%; height: auto; overflow: visible; }
.sf-mouse text, .sf-touchfig text { font-family: var(--sf-font-num); font-weight: 700; }

/* 触控示意 */
.sf-touchfig { width: 100%; max-width: max(300px, 430u); }
.sf-touchfig svg { display: block; width: 100%; height: auto; }

/* 「怎么赢」：示意地图 + 带图例记号的说明 */
.sf-winfig { display: flex; flex-direction: column; align-items: center; gap: 4u; width: 100%; }
.sf-winfig svg { display: block; width: 100%; max-width: max(210px, 300u); height: auto; }
.sf-winfig text { font-family: var(--sf-font); font-weight: 700; }
.sf-winfig p { margin: 0; font-size: var(--sf-fs-xs); color: var(--sf-c-text-3); text-align: center; }
.sf-howto__glyph { display: inline-block; width: max(18px, 20u); height: max(18px, 20u); transform: translateY(0.25em); }
.sf-howto__glyph svg { display: block; width: 100%; height: 100%; overflow: visible; }
.sf-howto__pane--win { align-items: start; }
.sf-howto__pane--win .sf-howto__list { gap: 7u; }

@media (orientation: portrait), (max-width: 620px) {
  .sf-howto__pane { grid-template-columns: 1fr; gap: 14u; }
  .sf-winfig svg { max-width: min(62vw, 250px); }
}
@media (max-height: 480px) and (orientation: landscape) {
  .sf-howto { gap: 8u; }
  .sf-howto__fig { padding: 8u; }
  .sf-howto__list { gap: 5u; }
  .sf-howto__pane--win { grid-template-columns: minmax(0, 0.6fr) minmax(0, 1fr); gap: 12u; }
  .sf-howto__pane--win .sf-howto__list { gap: 3u; }
  .sf-howto__pane--win .sf-howto__list li { line-height: 1.4; }
  .sf-winfig svg { max-width: 164px; }
  .sf-winfig p { display: none; }
}
`);

function Yn(n, t, e) {
  const s = z("span", "sf-key", n);
  return ((s.style.gridColumn = `span ${t}`), e && (s.dataset.tone = e), s);
}

function Pa(n, t, e, s) {
  const i = z("span", "sf-howto__dot", t);
  i.dataset.tone = n;
  const a = z("span");
  return ((a.innerHTML = s), z("li", null, i, z("span", null, z("b", null, e), " ", a)));
}

function LH() {
  const n = z(
      "div",
      "sf-keys",
      Yn("Esc", 3, "ui"),
      Yn("", 2),
      Yn("", 2),
      Yn("", 2),
      Yn("", 2),
      Yn("", 2),
      Yn("Tab", 3, "ui"),
      Yn("Q", 2, "skill"),
      Yn("W", 2, "move"),
      Yn("E", 2, "skill"),
      Yn("R", 2, "skill"),
      Yn("P", 2, "ui"),
      Yn("", 3),
      Yn("A", 2, "move"),
      Yn("S", 2, "move"),
      Yn("D", 2, "move"),
      Yn("F", 2, "sum"),
      Yn("G", 2, "sum"),
      Yn("", 3),
      Yn("", 2),
      Yn("", 2),
      Yn("", 2),
      Yn("B", 2, "sum"),
      Yn("J", 2, "atk"),
      Yn("", 3),
      Yn("空格", 8, "atk"),
      Yn("", 2),
    ),
    t = z("div", "sf-mouse");
  t.innerHTML =
    '<svg viewBox="0 0 80 124" aria-hidden="true"><rect x="6" y="6" width="68" height="112" rx="34" fill="rgba(20,34,72,.7)" stroke="rgba(150,178,235,.4)" stroke-width="2"/><path d="M40 6C21.200 6 6 21.200 6 40V52H38V6Z" fill="#ff8a7a"/><path d="M40 6C58.800 6 74 21.200 74 40V52H42V6Z" fill="#5cd6f7"/><rect x="35" y="20" width="10" height="22" rx="5" fill="#0a1128" stroke="rgba(255,255,255,.5)" stroke-width="1.500"/><text x="21" y="38" text-anchor="middle" font-size="13" fill="#08101f">左</text><text x="59" y="38" text-anchor="middle" font-size="13" fill="#08101f">右</text></svg>';
  const e = z(
    "ul",
    "sf-howto__list",
    Pa("move", "移", "移动", "<em>W A S D</em> 或方向键；<em>鼠标右键</em>点地面寻路移动"),
    Pa("atk", "攻", "普攻", "<em>空格 / J</em> 自动选择目标；<em>左键或右键</em>点敌人指定攻击"),
    Pa(
      "skill",
      "技",
      "技能",
      "<em>Q</em> 一技能 · <em>E</em> 二技能 · <em>R</em> 大招：按下显示指示器，松开朝鼠标位置施放；<em>Esc / 右键</em>取消",
    ),
    Pa("sum", "通", "通用技能", "<em>F</em> 闪现(朝鼠标) · <em>G</em> 疗伤 · <em>B</em> 回城"),
    Pa("ui", "界", "界面", "<em>Tab</em> 按住看战况 · <em>P</em> 商店 · <em>Esc</em> 设置 / 暂停"),
  );
  return z("div", "sf-howto__pane", z("div", "sf-howto__fig sf-inset", n, t), e);
}

function IH() {
  const n = z("div", "sf-touchfig"),
    t = (i, a, o, r) =>
      `<circle cx="${i}" cy="${a}" r="10.5" fill="${r}" stroke="#08101f" stroke-width="1.5"/><text x="${i}" y="${a + 5}" text-anchor="middle" font-size="14" fill="#08101f">${o}</text>`,
    e = (i, a, o, r) =>
      `<circle cx="${i}" cy="${a}" r="${o}" fill="${r}" fill-opacity=".22" stroke="${r}" stroke-width="1.600"/>`;
  n.innerHTML =
    '<svg viewBox="0 0 400 200" aria-hidden="true"><rect x="3" y="3" width="394" height="194" rx="22" fill="rgba(10,17,40,.75)" stroke="rgba(232,199,122,.55)" stroke-width="2"/><rect x="12" y="12" width="376" height="176" rx="14" fill="rgba(28,47,96,.35)"/><rect x="22" y="22" width="54" height="54" rx="5" fill="#b9a2ff" fill-opacity=".2" stroke="#b9a2ff" stroke-width="1.600"/><path d="M30 68L68 30" stroke="#b9a2ff" stroke-width="1.400" opacity=".7"/><rect x="150" y="18" width="100" height="16" rx="8" fill="rgba(150,178,235,.16)" stroke="rgba(150,178,235,.35)"/><rect x="330" y="18" width="20" height="16" rx="4" fill="#b9a2ff" fill-opacity=".2" stroke="#b9a2ff" stroke-width="1.400"/><rect x="356" y="18" width="20" height="16" rx="4" fill="#b9a2ff" fill-opacity=".2" stroke="#b9a2ff" stroke-width="1.400"/><circle cx="196" cy="74" r="19" fill="#ff8a7a" fill-opacity=".14" stroke="#ff8a7a" stroke-width="1.400" stroke-dasharray="4 3"/><text x="196" y="78.500" text-anchor="middle" font-size="12" fill="#ff8a7a">取消</text><circle cx="74" cy="140" r="34" fill="#5cd6f7" fill-opacity=".1" stroke="#5cd6f7" stroke-width="1.600"/><circle cx="86" cy="130" r="14" fill="#5cd6f7" fill-opacity=".7"/>' +
    e(340, 150, 30, "#ff8a7a") +
    e(278, 162, 18, "#f3cf85") +
    e(292, 112, 18, "#f3cf85") +
    e(340, 86, 18, "#f3cf85") +
    e(232, 174, 11, "#6fe3a1") +
    e(246, 140, 11, "#6fe3a1") +
    e(264, 80, 11, "#6fe3a1") +
    '<rect x="22" y="88" width="34" height="18" rx="6" fill="#b9a2ff" fill-opacity=".2" stroke="#b9a2ff" stroke-width="1.400"/><path d="M340 86L306 52" stroke="#f3cf85" stroke-width="1.800" stroke-dasharray="3.500 3"/><path d="M301 47l2.500 10 7.500-7.500z" fill="#f3cf85"/>' +
    t(74, 140, "1", "#5cd6f7") +
    t(340, 150, "2", "#ff8a7a") +
    t(340, 86, "3", "#f3cf85") +
    t(246, 140, "4", "#6fe3a1") +
    t(49, 49, "5", "#b9a2ff") +
    t(39, 97, "6", "#b9a2ff") +
    t(353, 40, "7", "#b9a2ff") +
    "</svg>";
  const s = z(
    "ul",
    "sf-howto__list",
    Pa("move", "1", "摇杆", "左下区域按住拖动，控制英雄移动"),
    Pa("atk", "2", "普攻", "按住连续攻击，自动选择最合适的目标"),
    Pa(
      "skill",
      "3",
      "技能",
      "<em>轻点</em> = 智能施法；<em>按住拖动</em> = 手动瞄准，松手施放；拖到<em>「取消」</em>区松手则取消；<em>原地长按</em>查看技能说明",
    ),
    Pa("sum", "4", "通用技能", "闪现(可拖动选方向) · 疗伤 · 回城"),
    Pa("ui", "5", "小地图", "点按并拖动可观察战场，松手回到英雄"),
    Pa(
      "ui",
      "6",
      "商店",
      "金币够了会自动买推荐装备；想自己挑就点开商店(关掉自动出装后，钱够时这里会弹出一键购买)",
    ),
    Pa("ui", "7", "战况 / 暂停", "右上角两个按钮：看双方战况、暂停与设置"),
  );
  return z("div", "sf-howto__pane", z("div", "sf-howto__fig sf-inset", n), s);
}

const PH = {
    mossback: "#e2cf7a",
    glimwing: "#e2cf7a",
    frost_golem: "#4da3ff",
    ember_golem: "#ff5d5d",
    abyss_drake: "#c09bff",
    star_colossus: "#ffd76a",
  },
  _1 = ["#4da3ff", "#ff5d5d"],
  w1 = "#060a16",
  ls = (n) => Math.round(n * 10) / 10;

function Rd(n, t, e, s) {
  const i = PH[n],
    a = (l, c) =>
      `<circle cx="${t}" cy="${e}" r="${ls(s * l)}" fill="none" stroke="${i}" stroke-width="${c}" opacity=".8"/>`;
  if (n === "frost_golem" || n === "ember_golem")
    return `${a(1.7, 1)}<circle cx="${t}" cy="${e}" r="${s}" fill="${i}" stroke="${w1}" stroke-width="1"/>`;
  if (n === "abyss_drake")
    return `${a(1.9, 1.2)}<path d="M${t} ${ls(e - s * 1.25)}L${ls(t + s * 1.1)} ${ls(e + s * 0.85)}H${ls(t - s * 1.1)}Z" fill="${i}" stroke="${w1}" stroke-width="1" stroke-linejoin="round"/>`;
  const o = n === "star_colossus" ? 1.25 : 0.8,
    r = `<path d="M${t} ${ls(e - s * o)}L${ls(t + s * o)} ${e}L${t} ${ls(e + s * o)}L${ls(t - s * o)} ${e}Z" fill="${i}" stroke="${w1}" stroke-width="1" stroke-linejoin="round"/>`;
  return n === "star_colossus" ? `${a(1.75, 1.1)}${a(2.4, 0.9)}${r}` : r;
}

const C4 = (n, t, e, s) =>
    `<rect x="${ls(n - e)}" y="${ls(t - e)}" width="${ls(e * 2)}" height="${ls(e * 2)}" rx="${ls(e * 0.3)}" fill="${_1[s]}" stroke="${w1}" stroke-width="1"/>`,
  L4 = (n, t, e, s) =>
    `<circle cx="${n}" cy="${t}" r="${ls(e * 1.55)}" fill="${_1[s]}" fill-opacity=".22" stroke="${_1[s]}" stroke-width="1.2"/><path d="M${n} ${ls(t - e * 1.2)}L${ls(n + e * 0.8)} ${t}L${n} ${ls(t + e * 1.2)}L${ls(n - e * 0.8)} ${t}Z" fill="#f2feff" stroke="${_1[s]}" stroke-width="1.4" stroke-linejoin="round"/>`;

function ol(n) {
  const t = z("span", "sf-howto__glyph");
  return (
    (t.innerHTML = n.startsWith("<svg") ? n : `<svg viewBox="0 0 20 20" aria-hidden="true">${n}</svg>`),
    t
  );
}

function rl(n, t, e) {
  const s = z("span");
  return ((s.innerHTML = e), z("li", null, n, z("span", null, z("b", null, t), " ", s)));
}

function DH() {
  const n = u8(),
    t = 88 / n.bound,
    e = (u) => `${ls(100 + u.x * t)} ${ls(100 + u.y * t)}`,
    s = (u) => ls(100 + u.x * t),
    i = (u) => ls(100 + u.y * t),
    a = (u) => u.map((m, x) => `${x === 0 ? "M" : "L"}${e(m)}`).join("");
  let o = `<svg viewBox="0 -15 200 230" role="img" aria-label="战场示意图：蓝方在左下，红方在右上，三条路，河道从左上到右下"><rect x="2" y="2" width="196" height="196" rx="12" fill="#0b1630" stroke="rgba(232,199,122,.55)" stroke-width="2"/><path d="${a(n.river)}" fill="none" stroke="#2f86b8" stroke-width="${ls(n.riverWidth * t)}" stroke-linecap="round" stroke-linejoin="round" opacity=".5"/>`;
  for (const u of ["top", "mid", "bot"])
    o += `<path d="${a(n.lanes[u])}" fill="none" stroke="#b9a577" stroke-width="5.500" stroke-linecap="round" stroke-linejoin="round" opacity=".85"/>`;
  for (const u of n.camps)
    o += Rd(
      u.monsterType,
      s(u.pos),
      i(u.pos),
      rn[u.monsterType].epic
        ? 5
        : u.monsterType === "frost_golem" || u.monsterType === "ember_golem"
          ? 3.6
          : 3.2,
    );
  for (const u of n.towers) o += C4(s(u.pos), i(u.pos), 3.4, u.team);
  for (const u of n.bases) o += L4(s(u.core), i(u.core), 6.5, u.team);
  o +=
    '<text x="5" y="211.500" font-size="11.500" fill="#9ccfff">◣ 我方水晶</text><text x="195" y="-4" font-size="11.500" fill="#ff9c9c" text-anchor="end">敌方水晶 ◥</text></svg>';
  const r = z("div", "sf-winfig");
  r.innerHTML = `${o}<p>图上的记号和对局里的小地图是同一套</p>`;
  const l = (u) => {
      const m = n.camps.find((x) => x.monsterType === u);
      return { first: rk(m ? m.firstSpawn : 0).replace(/^0/, ""), reward: rn[u].reward ?? "" };
    },
    c = l("abyss_drake"),
    f = l("star_colossus"),
    d = Math.round(va.proximityGoldRatio * 100),
    h = z(
      "ul",
      "sf-howto__list",
      rl(
        ol(L4(10, 10, 5.4, 1)),
        "怎么赢",
        "摧毁<em>敌方水晶</em>就赢。你在左下角的蓝色方，敌方水晶在右上角。",
      ),
      rl(
        ol(C4(10, 10, 5.5, 1)),
        "推塔",
        "上、中、下三条路，每条路按 <em>一塔 → 二塔 → 高地塔</em> 的顺序拆；拆掉任意一路的高地塔，才打得动水晶。塔先打小兵，跟着小兵进塔。",
      ),
      rl(
        ol(Vt("gold")),
        "补兵",
        `给小兵<em>最后一击</em>拿全额金币，只站在旁边只有约 ${d}%。金币够了会<em>自动买</em>推荐装备。`,
      ),
      rl(
        ol(Rd("frost_golem", 10, 10, 4.6)),
        rn.frost_golem.name,
        `野区的大野怪。${rn.frost_golem.reward ?? ""}。`,
      ),
      rl(
        ol(Rd("ember_golem", 10, 10, 4.6)),
        rn.ember_golem.name,
        `野区的大野怪。${rn.ember_golem.reward ?? ""}。`,
      ),
      rl(
        ol(Rd("abyss_drake", 10, 11, 4.4)),
        rn.abyss_drake.name,
        `左上河道，<em>${c.first}</em> 刷新。${c.reward}。它会吐息：看到地上的扇形预警就走出去。`,
      ),
      rl(
        ol(Rd("star_colossus", 10, 10, 3.6)),
        rn.star_colossus.name,
        `右下河道，<em>${f.first}</em> 刷新。${f.reward}(${yn.blessingDuration} 秒一过就没了，趁这会儿推塔)。`,
      ),
    );
  return z("div", "sf-howto__pane sf-howto__pane--win", z("div", "sf-howto__fig sf-inset", r), h);
}

function zH(n, t) {
  Zn("sf-menu-howto", CH);
  const e = typeof matchMedia == "function" && matchMedia("(pointer: coarse)").matches,
    s = z("div"),
    i = (o) => {
      ((s.textContent = ""), s.appendChild(o === "keys" ? LH() : o === "touch" ? IH() : DH()));
    },
    a = W8({
      tabs: [
        { id: "keys", label: "键盘鼠标", icon: Vt("keyboard") },
        { id: "touch", label: "触控", icon: Vt("touch") },
        { id: "win", label: "怎么赢", icon: Vt("crown") },
      ],
      value: e ? "touch" : "keys",
      onChange: i,
    });
  return (i(a.get()), X8(n, { title: "操作说明", content: z("div", "sf-howto", a.el, s), width: G8(900) }));
}

const NH = jx(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><radialGradient id="g"><stop offset="0" stop-color="#fffdf2"/><stop offset=".16" stop-color="#ffeab5" stop-opacity=".85"/><stop offset=".45" stop-color="#ffd682" stop-opacity=".28"/><stop offset="1" stop-color="#ffd682" stop-opacity="0"/></radialGradient></defs><circle cx="32" cy="32" r="32" fill="url(#g)"/><path d="M32 0Q33.200 30.800 64 32Q33.200 33.200 32 64Q30.800 33.200 0 32Q30.800 30.800 32 0Z" fill="#fff"/><circle cx="32" cy="32" r="4.500" fill="#fff"/></svg>',
  ),
  FH =
    '<svg viewBox="0 0 120 60" aria-hidden="true"><defs><linearGradient id="sfl-a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffbe9"/><stop offset=".55" stop-color="#f3cf85"/><stop offset="1" stop-color="#a8742c"/></linearGradient><radialGradient id="sfl-b"><stop offset="0" stop-color="#ffe7ad" stop-opacity=".7"/><stop offset="1" stop-color="#ffe7ad" stop-opacity="0"/></radialGradient></defs><circle cx="60" cy="30" r="26" fill="url(#sfl-b)"/><ellipse cx="60" cy="31" rx="34" ry="9" transform="rotate(-14 60 31)" fill="none" stroke="#8fe9ff" stroke-width="1" opacity=".75"/><path d="M60 3Q62.600 27.400 87 30Q62.600 32.600 60 57Q57.400 32.600 33 30Q57.400 27.400 60 3Z" fill="url(#sfl-a)" stroke="#5a3e18" stroke-width=".8"/><path d="M60 17Q61.200 28.800 73 30Q61.200 31.200 60 43Q58.800 31.200 47 30Q58.800 28.800 60 17Z" fill="#fffdf2"/><circle cx="27.500" cy="38.800" r="2.200" fill="#c9f6ff"/><circle cx="93" cy="23" r="1.500" fill="#c9f6ff"/></svg>',
  UH = Jn(`
.sf-home { display: grid; grid-template-columns: minmax(0, 1fr); grid-template-rows: minmax(0, 1.5fr) auto minmax(0, 1fr) auto; justify-items: center; padding: max(16u, var(--sf-safe-t)) max(24u, var(--sf-safe-r)) max(12u, var(--sf-safe-b)) max(24u, var(--sf-safe-l)); }
.sf-home__logo { grid-row: 1; align-self: end; display: flex; flex-direction: column; align-items: center; padding-bottom: 22u; }

.sf-logo { position: relative; display: flex; flex-direction: column; align-items: center; isolation: isolate; }
.sf-logo__emblem { width: max(84px, 132u); margin-bottom: -6u; animation: sf-drop-in 0.8s 0.05s var(--sf-ease-out) both; }
.sf-logo__emblem svg { display: block; width: 100%; height: auto; filter: drop-shadow(0 0 8u rgba(255, 214, 130, 0.7)); animation: sf-logo-breathe 3.6s ease-in-out infinite; }
.sf-logo__name {
  position: relative; display: flex; margin: 0; font-weight: 900; line-height: 1.12; white-space: nowrap;
  font-size: max(50px, min(124u, 19.5vw));
  filter: drop-shadow(0 max(1px, 2u) 0 #6b4614) drop-shadow(0 max(2px, 5u) 0 rgba(24, 12, 0, 0.75)) drop-shadow(0 0 30u rgba(255, 200, 110, 0.32));
}
.sf-logo__name span {
  display: block; padding: 0 0.055em;
  background:
    linear-gradient(105deg, rgba(255, 255, 255, 0) 42%, rgba(255, 255, 255, 0.95) 50%, rgba(255, 255, 255, 0) 58%) no-repeat 200% 0 / 300% 100%,
    linear-gradient(180deg, #fffdf2 0%, #ffeab5 26%, #eebb5e 50%, #a26d26 57%, #e9c074 72%, #fff3cf 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-fill-color: transparent;
  -webkit-text-stroke: max(0.6px, 1u) rgba(255, 246, 216, 0.35);
  animation: sf-logo-char 0.9s var(--sf-ease-out) both, sf-logo-sheen 6s 1.6s ease-in-out infinite;
}
.sf-logo__name span:nth-child(1) { animation-delay: 0.25s, 1.6s; }
.sf-logo__name span:nth-child(2) { animation-delay: 0.36s, 1.72s; }
.sf-logo__name span:nth-child(3) { animation-delay: 0.47s, 1.84s; }
.sf-logo__name span:nth-child(4) { animation-delay: 0.58s, 1.96s; }
@keyframes sf-logo-char { from { opacity: 0; transform: translateY(26u) scale(1.18); } 60% { opacity: 1; } to { opacity: 1; transform: none; } }
@keyframes sf-logo-sheen { 0% { background-position: 200% 0, 0 0; } 18%, 100% { background-position: -100% 0, 0 0; } }
@keyframes sf-logo-breathe { 0%, 100% { opacity: 0.86; transform: scale(1); } 50% { opacity: 1; transform: scale(1.05); } }

/* 坠星划痕：自右上斜贯到左下，星头落在「星」字旁 */
.sf-logo__streak { position: absolute; left: -15%; top: 60%; width: 132%; height: 0; z-index: -1; transform: rotate(-13deg); pointer-events: none; }
.sf-logo__streak::before {
  content: ''; position: absolute; left: 0; right: 0; top: -22u; height: 44u; transform-origin: 100% 50%;
  background:
    linear-gradient(90deg, #ffffff 0%, rgba(255, 240, 200, 0.95) 5%, rgba(255, 214, 130, 0.5) 30%, rgba(255, 214, 130, 0) 92%) no-repeat 0 50% / 100% max(2px, 3u),
    linear-gradient(90deg, rgba(255, 226, 160, 0.3) 0%, rgba(143, 233, 255, 0.1) 45%, rgba(143, 233, 255, 0) 85%) no-repeat 0 50% / 100% 100%;
  -webkit-mask: linear-gradient(180deg, transparent, #000 46%, #000 54%, transparent);
  mask: linear-gradient(180deg, transparent, #000 46%, #000 54%, transparent);
  animation: sf-logo-streak 1s 0.1s var(--sf-ease-out) both;
}
.sf-logo__streak::after {
  content: ''; position: absolute; left: -42u; top: -42u; width: 84u; height: 84u;
  background-repeat: no-repeat; background-position: center; background-size: contain;
  animation: sf-logo-head 0.7s 0.95s var(--sf-ease-spring) both, sf-logo-glint 2.8s 1.7s ease-in-out infinite;
}
@keyframes sf-logo-streak { from { transform: scaleX(0); opacity: 0; } 30% { opacity: 1; } to { transform: none; opacity: 1; } }
@keyframes sf-logo-glint { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(0.82); opacity: 0.8; } }
@keyframes sf-logo-head { from { opacity: 0; transform: scale(0.2); } to { opacity: 1; transform: none; } }

.sf-logo__sub { display: flex; align-items: center; justify-content: center; gap: 16u; width: 100%; margin-top: 6u; animation: sf-rise-in 0.8s 0.85s var(--sf-ease-out) both; }
.sf-logo__sub b {
  font-family: var(--sf-font-num); font-weight: 600; font-size: max(15px, 27u); line-height: 1; letter-spacing: 0.72em; margin-right: -0.72em; padding-left: 0.1em;
  background: linear-gradient(180deg, #ffffff, #c9f6ff 45%, #5cd6f7); -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 10u rgba(92, 214, 247, 0.55));
}
.sf-logo__sub i { position: relative; flex: 0 1 max(40px, 92u); min-width: 12u; height: 1px; background: linear-gradient(90deg, rgba(232, 199, 122, 0), var(--sf-c-gold-300)); }
.sf-logo__sub i:last-child { transform: scaleX(-1); }
.sf-logo__sub i::after { content: ''; position: absolute; right: -3u; top: 50%; width: 6u; height: 6u; margin-top: -3u; transform: rotate(45deg); background: var(--sf-c-gold-200); box-shadow: 0 0 6u rgba(255, 214, 130, 0.8); }
.sf-logo__tag { margin: 16u 0 0; font-size: var(--sf-fs-sm); letter-spacing: 0.34em; color: var(--sf-c-text-2); text-align: center; text-shadow: 0 1px 6px rgba(0, 0, 0, 0.8); animation: sf-rise-in 0.8s 1s var(--sf-ease-out) both; }

.sf-home__menu { grid-row: 2; display: flex; flex-direction: column; align-items: stretch; gap: 12u; width: min(100%, max(260px, 330u)); animation: sf-rise-in 0.7s 1.05s var(--sf-ease-out) both; }
.sf-home__row { display: grid; grid-template-columns: 1fr 1fr; gap: 12u; }
/* 「开始对战」+ 它下面的新手引导复选 */
.sf-home__start { display: flex; flex-direction: column; align-items: stretch; gap: 7u; }
.sf-home__guide {
  display: inline-flex; align-items: center; justify-content: center; gap: 7u; align-self: center; min-height: max(30px, 32u); margin: 0; padding: 2u 10u; border: 0; border-radius: 99px; background: none; cursor: pointer;
  font: inherit; font-size: var(--sf-fs-sm); font-weight: 700; line-height: 1.2; color: var(--sf-c-text); text-shadow: 0 1px 4px rgba(0, 0, 0, 0.85); white-space: nowrap;
}
.sf-home__guide small { font-size: var(--sf-fs-xs); font-weight: 500; color: var(--sf-c-text-3); }
.sf-home__guide-box { flex: none; display: grid; place-items: center; width: max(17px, 19u); height: max(17px, 19u); border-radius: 4u; color: transparent; background: rgba(8, 13, 31, 0.7); box-shadow: inset 0 0 0 max(1.5px, 1.5u) rgba(150, 178, 235, 0.7); transition: background 0.12s linear, box-shadow 0.12s linear; }
.sf-home__guide-box .sf-i { width: 82%; height: 82%; vertical-align: 0; }
.sf-home__guide[aria-checked="true"] .sf-home__guide-box { color: #2b1a04; background: linear-gradient(180deg, #fff4d6, #e0b160); box-shadow: inset 0 0 0 1px #6b4614, 0 0 8u rgba(255, 214, 130, 0.6); }
@media (hover: hover) { .sf-home__guide:hover { background: rgba(150, 178, 235, 0.12); } }
.sf-home__guide:focus-visible { outline: 2px solid var(--sf-c-cyan-300); outline-offset: 2px; }
.sf-home__guide:active { transform: scale(0.97); }
.sf-home__foot { grid-row: 4; display: flex; align-items: center; justify-content: center; gap: 10u; margin: 0; font-size: var(--sf-fs-xs); letter-spacing: 0.14em; color: var(--sf-c-text-3); text-align: center; text-shadow: 0 1px 4px rgba(0, 0, 0, 0.9); animation: sf-fade-in 1s 1.4s linear both; }
.sf-home__foot i { width: 3px; height: 3px; border-radius: 50%; background: var(--sf-c-text-4); }

/* 矮屏（横屏手机）：Logo 收紧一些，按钮排成一行 */
@media (max-height: 480px) and (orientation: landscape) {
  .sf-home { grid-template-rows: minmax(0, 1.25fr) auto minmax(0, 0.5fr) auto; }
  .sf-home__logo { padding-bottom: 14u; }
  .sf-logo__name { font-size: max(46px, min(104u, 19.5vw)); }
  .sf-logo__emblem { width: max(64px, 96u); }
  .sf-logo__tag { margin-top: 10u; }
  .sf-home__menu { flex-direction: row; align-items: flex-start; width: min(100%, max(520px, 700u)); }
  .sf-home__start { flex: 1.25; gap: 3u; }
  .sf-home__guide { min-height: max(26px, 28u); }
  .sf-home__row { flex: 2; }
}
@media (orientation: portrait) {
  .sf-home { grid-template-rows: minmax(0, 1.25fr) auto minmax(0, 1fr) auto; }
  .sf-logo__tag { letter-spacing: 0.2em; }
  .sf-home__foot { flex-direction: column; gap: 3u; }
  .sf-home__foot i { display: none; }
}
`),
  OH = `.sf-logo__streak::after { background-image: ${NH}; }`;

function BH(n) {
  Zn("sf-menu-title", UH + OH);
  const t = z("h1", "sf-logo__name", ..."星陨战纪".split("").map((h) => z("span", null, h)));
  t.setAttribute("aria-label", "星陨战纪");
  const e = z("div", "sf-logo__emblem");
  e.innerHTML = FH;
  const s = z(
      "div",
      "sf-logo",
      z("div", "sf-logo__streak"),
      e,
      t,
      z("div", "sf-logo__sub", z("i"), z("b", null, "STARFALL"), z("i")),
      z("p", "sf-logo__tag", "坠星召来历代英杰 · 5v5 对决"),
    ),
    i = po({
      label: "开始对战",
      variant: "primary",
      size: "lg",
      pulse: !0,
      sound: "confirm",
      onClick: () => n.onStart(),
    }),
    a = z(
      "button",
      "sf-home__guide",
      z("i", "sf-home__guide-box", _e(Vt("check"))),
      z("span", null, "新手引导"),
      z("small", null, "(第一次玩建议打开)"),
    );
  ((a.type = "button"), a.setAttribute("role", "checkbox"));
  const o = () => a.setAttribute("aria-checked", Xc(n.host.getSettings(), "tutorial") ? "true" : "false");
  (o(),
    a.addEventListener("click", () => {
      (E3(n.host, "tutorial", !Xc(n.host.getSettings(), "tutorial")), n.host.audio.ui("click"), o());
    }));
  const r = po({ label: "操作说明", icon: Vt("keyboard"), onClick: () => zH(n.root) }),
    l = po({
      label: "设置",
      icon: Vt("settings"),
      onClick: () =>
        ny(n.root, {
          get: () => n.host.getSettings(),
          update: (h) => {
            (n.host.updateSettings(h), o());
          },
          audio: n.host.audio,
          mode: "menu",
        }),
    }),
    c = z(
      "div",
      "sf-screen sf-home",
      z("div", "sf-home__logo", s),
      z("nav", "sf-home__menu", z("div", "sf-home__start", i, a), z("div", "sf-home__row", r, l)),
      z(
        "p",
        "sf-home__foot",
        z("span", null, "1 名玩家 + 9 名 AI"),
        z("i"),
        z("span", null, "全部美术与音效均为程序化生成"),
        z("i"),
        z("span", null, "v0.1"),
      ),
    );
  let f = !1;
  const d = (h) => {
    f ||
      Sf() ||
      h.repeat ||
      Xx(c) ||
      ((h.key === "Enter" || h.key === " ") && (h.preventDefault(), n.host.audio.ui("confirm"), n.onStart()));
  };
  return (
    window.addEventListener("keydown", d),
    {
      el: c,
      freeze: () => {
        f = !0;
      },
      dispose: () => window.removeEventListener("keydown", d),
    }
  );
}

const pk = "starfall.lastChoice.v1",
  P2 = { heroId: "chijin", difficulty: "easy" };

function HH() {
  const n = $8(pk);
  if (!n || typeof n != "object") return { ...P2 };
  const t = typeof n.heroId == "string" && n.heroId in Se ? n.heroId : P2.heroId,
    e = n.difficulty,
    s = e === "easy" || e === "normal" || e === "hard" ? e : P2.difficulty;
  return { heroId: t, difficulty: s };
}

function I4(n) {
  Wx(pk, JSON.stringify({ heroId: n.heroId, difficulty: n.difficulty }));
}

function $H(n, t, e = {}) {
  return (
    Hf(),
    new Promise((s) => {
      if (e.signal?.aborted) return;
      const i = z("div", "sf-root sf-menu-root"),
        a = Kx(i, "menu"),
        o = qx(i, t.audio);
      n.appendChild(i);
      let r = HH(),
        l = null,
        c = !1,
        f = !1,
        d = 0;
      const h = new Map(),
        u = () => {
          if (!f) {
            ((f = !0), e.signal?.removeEventListener("abort", m), window.clearTimeout(d));
            for (const [v, _] of h) (window.clearTimeout(v), _.dispose());
            (h.clear(), l?.dispose(), (l = null), o(), a.dispose(), i.remove());
          }
        },
        m = () => {
          ((c = !0), zi(), q8(i), u());
        };
      e.signal?.addEventListener("abort", m);
      const x = (v) => {
          zi();
          const _ = l;
          if (((l = v), _)) {
            (_.freeze(), _.el.classList.add("is-leaving"));
            const k = window.setTimeout(() => {
              (h.delete(k), _.dispose(), _.el.remove());
            }, 260);
            h.set(k, _);
          }
          i.appendChild(v.el);
        },
        p = () => {
          c || x(BH({ host: t, root: i, onStart: g }));
        },
        g = () => {
          c ||
            x(
              RH({
                host: t,
                root: i,
                initial: r,
                onBack: p,
                onChange: (v) => {
                  ((r = v), I4(v));
                },
                onConfirm: y,
              }),
            );
        },
        y = (v) => {
          c ||
            ((c = !0),
            (r = v),
            I4(v),
            zi(),
            l?.freeze(),
            (i.style.transition = "opacity 0.35s linear"),
            (i.style.opacity = "0"),
            (i.style.pointerEvents = "none"),
            (d = window.setTimeout(() => {
              (u(), s(v));
            }, 360)));
        };
      (t.audio.setMusic("menu"), e.start === "select" ? g() : p());
    })
  );
}

const GH = [
    "摧毁敌方水晶才算胜利——别只顾着击杀，记得带兵线推塔。",
    "防御塔会优先攻击小兵：等己方兵线进塔，再去攻击塔下的敌人。",
    "每条路要按 一塔 → 二塔 → 高地塔 的顺序拆，前面的没破，后面的塔和水晶打不动。",
    "补到最后一击可获得全额金币，只是站在附近只能拿到三成多。",
    "草丛可以隐藏身形，但在草里出手会暴露 1.5 秒。",
    "金币够了会自动购买推荐装备；想自己挑，随时打开商店。",
    "打掉蓝buff：技能冷却更短、回蓝更快；打掉红buff：普攻附带灼烧和减速。",
    "河道巨龙给全队金币和经验；星陨巨灵让全队变强、小兵也更猛。别一个人去打，等队友一起。",
    "残血别硬撑：回城要原地站 5 秒才能回到泉水，移动、攻击或受伤都会打断。",
    "被防御塔连续命中，伤害会越打越高——及时退出攻击范围。",
    "连杀会抬高你的赏金，被终结时对手将获得额外金币。",
    "樊哙的大盾最扛打：让他先冲，其他人跟上。",
    "牛伟放完技能后的下一下普攻会回血，换血别光放技能。",
    "王昭君的技能打中同一个人三次会眩晕，被她连中两下就该躲了。",
    "李广站着不动连续射击会越射越快，优先打断他。",
    "荆轲专挑残血下手：血量低于四成时离他远一点。",
  ],
  VH = {
    kbm: [
      "按住 Q / E / R 能看到技能范围，松开施放；按住时点鼠标右键或按 Esc 取消。",
      "鼠标右键点地面移动、点敌人攻击；按空格会自动打最合适的目标。",
    ],
    touch: [
      "轻点技能键会自动瞄准；按住拖动可以自己瞄准，拖到「取消」圈里松手就不放。",
      "原地按住技能键不动，可以看这个技能的说明。",
    ],
  };

function WH(n) {
  const t = GH.slice(),
    e = VH[n],
    s = Math.floor(t.length / (e.length + 1));
  return (e.forEach((i, a) => t.splice((a + 1) * s + a, 0, i)), t);
}
export { uk, Xc, E3, $H, WH };
