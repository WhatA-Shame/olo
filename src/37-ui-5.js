// 37-ui-5.js — ui｜38 个顶层语句｜59KB
// 对应 game.pretty.js 第 70022–71631 行
// 关键内容：
//   p$                    普通攻击
//   y$                    虚拟摇杆：空闲时半透明停在左下角提示位置；按下后跳到手
//   A$                    技能尚未学会
//   R$                    底带：中间实、两端渐隐；上沿一道亮的星轨线，下沿一道淡
//   D$                    我方
//   z$                    不设 z-index：与宿主里别的界面(加载/结算)按
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { rn } from './01-audio.js';
import { Se, ea } from './02-data.js';
import { Fp, Jn, Sf, T2, Zn, _e, z, zi } from './32-ui.js';
import { E2, J8, OB, Pl, X1, Y1, _3, p4, zB } from './33-data-2.js';
import { Ar, Jx, Vt, cH, ck, ey, ks, lk, ty } from './34-ui-2.js';
import { A3, Dl, Ef, F4, N2, N4, Na, Rl, br, d$, f$, h$, is, uo, vo, z2, z4 } from './36-ui-4.js';

function p$(n) {
  (Zn("sf-hud-skills", f$), Jx());
  const t = n.me.heroId,
    e = Se[t],
    s = z("div", "sf-hud__skills"),
    i = {},
    a = {},
    o = (p, g) => {
      (p.style.setProperty("--x", N4[g].x.toFixed(3)),
        p.style.setProperty("--y", N4[g].y.toFixed(3)),
        (g === "recall" || g === "heal" || g === "flash") &&
          (p.style.setProperty("--xp", F4[g].x.toFixed(3)), p.style.setProperty("--yp", F4[g].y.toFixed(3))));
    },
    r =
      e.attackType === "melee"
        ? Vt("kill")
        : e.role === "mage"
          ? Ar("mage")
          : e.role === "support"
            ? Ar("support")
            : Ar("marksman"),
    l = z(
      "button",
      "sf-hud__sk is-atk",
      z("span", "sf-hud__atk-face", _e(r)),
      z("span", "sf-hud__key", N2.attack),
    );
  ((l.type = "button"),
    (l.tabIndex = -1),
    (l.dataset.btn = "attack"),
    l.setAttribute("aria-label", "普通攻击"),
    o(l, "attack"),
    (a.attack = l));
  for (const p of A3) {
    const g = p === "s1" || p === "s2" || p === "ult",
      y = z("span", "sf-hud__sk-face");
    y.innerHTML = cH(t, p);
    const v = z("b", "sf-hud__sk-sec sf-num"),
      _ = g ? z("span", "sf-hud__sk-pips") : null,
      k = [];
    if (_) {
      const w = e.skills[p].maxLevel;
      for (let T = 0; T < w; T++) {
        const E = z("i");
        (k.push(E), _.appendChild(E));
      }
    }
    const M = g ? ck(p, e.skills[p].tags) : null;
    let S = null;
    M &&
      ((S = z("i", `sf-hud__sk-tag${p === "ult" ? " is-ult" : ""}`, M.text)),
      S.style.setProperty("--tag", lk(M.color)));
    const b = z(
      "button",
      `sf-hud__sk ${p === "ult" ? "is-ult" : g ? "" : "is-sum"}`,
      y,
      z("i", "sf-hud__sk-cd"),
      z("span", "sf-hud__sk-mark is-mana", _e(Vt("mana"))),
      z("span", "sf-hud__sk-mark is-ban", _e(Vt("cancel"))),
      z("span", "sf-hud__sk-mark is-lock", _e(Vt("lock"))),
      v,
      z("i", "sf-hud__sk-fx"),
      _,
      z("span", "sf-hud__key", N2[p]),
      S,
      g ? null : z("i", "sf-hud__sk-name", ea[p].name),
    );
    ((b.type = "button"),
      (b.tabIndex = -1),
      (b.dataset.btn = p),
      b.setAttribute("aria-label", g ? `${z4[p]} ${e.skills[p].name}` : ea[p].name),
      o(b, p),
      (a[p] = b),
      (i[p] = {
        el: b,
        setCd: br(b, "--cd", 1 / 360),
        setSec: vo(v),
        setOnCd: is(b, "is-cd"),
        setLocked: is(b, "is-locked"),
        setNoMana: is(b, "is-nomana"),
        setForbid: is(b, "is-forbid"),
        pips: k,
        level: -1,
        wasCd: !1,
      }));
  }
  s.append(a.recall, a.heal, a.flash, a.s1, a.s2, a.ult, l);
  const c = z("div", "sf-hud__cancel", z("span", null, _e(Vt("close")), "取消"));
  s.appendChild(c);
  const f = is(s, "is-dead"),
    d = is(l, "is-forbid"),
    h = is(a.recall, "is-active"),
    u = is(a.heal, "is-active");
  let m = null;
  function x(p) {
    const g = n.me.skills[p],
      y = n.mode === "kbm" ? `<span class="sf-kbd">${N2[p]}</span>` : "",
      v =
        g.cd > 0.05
          ? `<span class="is-warn">剩余 ${g.cd >= 10 ? Math.ceil(g.cd) : g.cd.toFixed(1)} 秒</span>`
          : "";
    if (p === "s1" || p === "s2" || p === "ult") {
      const M = e.skills[p],
        S = g.level,
        b = Math.max(0, Math.min(M.maxLevel, Math.max(1, S)) - 1),
        w = S > 0 && g.cdMax > 0 && g.cd > 0 ? g.cdMax : M.cooldown[b] * (1 - n.me.stats.cdr),
        T = S > 0 ? g.cost : M.manaCost[b],
        E = S > 0 ? `Lv.${S}/${M.maxLevel}` : `${d$(p)} 级解锁`,
        A = S > 0 && n.me.mana < T ? '<span class="is-warn">法力不足</span>' : "",
        C =
          M.brief || M.tags?.length
            ? `<div class="sf-hud-tiptags">${ty(p, M.tags)}<span class="sf-hud-tipcast">${X1(M.cast)}</span></div>`
            : "",
        R = C ? Y1(M.cast) : OB(M.cast);
      return (
        `<div class="sf-tip__title"><span>${ks(M.name)}</span><span class="sf-tip__meta sf-num">${z4[p]} · ${E}</span></div>` +
        C +
        (M.brief ? `<div class="sf-hud-tipbrief">${ks(M.brief)}</div>` : "") +
        `<div class="sf-hud-tipline"><span>冷却 <b class="sf-num">${Math.round(w * 10) / 10}</b> 秒</span><span>消耗 <b class="sf-num">${T}</b> 法力</span>${R ? `<span>${R}</span>` : ""}${v}${A}${y}</div><div class="sf-hud-tipdesc">${h$(M, S)}</div>`
      );
    }
    const _ = ea[p],
      k = Y1(J8[p]);
    return `<div class="sf-tip__title"><span>${ks(_.name)}</span><span class="sf-tip__meta">通用技能</span></div><div class="sf-hud-tipbrief">${ks(_.brief)}</div><div class="sf-hud-tipline"><span>冷却 <b class="sf-num">${_.cooldown}</b> 秒</span>${k ? `<span>${k}</span>` : ""}${v}${y}</div><div class="sf-hud-tipdesc">${ks(_.desc)}</div>`;
  }
  return {
    el: s,
    buttons: a,
    cancelZone: c,
    tipHtml: x,
    setDown(p, g) {
      a[p].classList.toggle("is-down", g);
    },
    setAiming(p, g) {
      (m && m !== p && a[m].classList.remove("is-aim"),
        (m = p),
        p && a[p].classList.add("is-aim"),
        c.classList.toggle("is-on", !!p && g),
        (!p || !g) && c.classList.remove("is-hot"));
    },
    setCancelHot(p) {
      c.classList.toggle("is-hot", p);
    },
    update(p) {
      const g = p.me;
      f(!g.alive);
      let y = !1,
        v = !1,
        _ = !1,
        k = !1,
        onPole = !1,
        noAtk = !1;
      for (const M of g.buffs)
        M.id === "stun" || M.id === "airborne" || M.id === "xuesong_lifted"
          ? (y = !0)
          : M.id === "silence"
            ? (v = !0)
            : M.id === "recall"
              ? (_ = !0)
              : M.id === "restore"
                ? (k = !0)
                : M.id === "xuesong_pole"
                  ? (onPole = !0)
                  : (M.id === "horseman_kick_charge" || M.id === "niumo_march" || M.id === "slime_ball_charge") && (noAtk = !0);
      (d(g.alive && (y || onPole || noAtk)), h(_), u(k));
      for (const M of A3) {
        const S = i[M],
          b = g.skills[M],
          hasWallBounce = g.heroId === "slime" && M === "s2" && g.buffs.some((bf) => bf.id === "slime_wall_bounce"),
          w = b.cd > 0.03 && !hasWallBounce,
          T = b.level <= 0,
          skDef = M === "s1" || M === "s2" || M === "ult" ? e.skills[M] : null,
          isRecast = !!(skDef?.recastBuff && g.buffs.some((bf) => bf.id === skDef.recastBuff));
        if (
          (S.setOnCd(w),
          w
            ? (S.setCd(b.cdMax > 0 ? Ef(b.cd / b.cdMax) : 1),
              S.setSec(b.cd >= 9.95 ? String(Math.ceil(b.cd)) : b.cd.toFixed(1)))
            : (S.setSec(""), S.wasCd && g.alive && uo(S.el, "is-ready")),
          (S.wasCd = w),
          S.setLocked(T),
          S.setNoMana(!T && !isRecast && !hasWallBounce && b.cost > 0 && g.mana < b.cost),
          S.setForbid(g.alive && !T && (y || v)),
          b.level !== S.level)
        ) {
          for (let E = 0; E < S.pips.length; E++) S.pips[E].classList.toggle("is-on", E < b.level);
          (S.level >= 0 && b.level > S.level && uo(S.el, "is-lvup"), (S.level = b.level));
        }
      }
    },
  };
}

function Cd(n, t) {
  if (t === "s1" || t === "s2" || t === "ult") {
    const s = Se[n.heroId].skills[t];
    if (n.heroId === "slime" && t === "s1" && n.buffs && n.buffs.some((b) => b.id === "slime_puddle")) {
      return { type: "self", radius: s.values.absorbRadius };
    }
    if (n.heroId === "slime" && t === "s2" && n.buffs && n.buffs.some((b) => b.id === "slime_wall_bounce")) {
      return { type: "direction", range: s.values.maxRange, width: s.cast.width };
    }
    if (s.recastBuff && s.recastCast && n.buffs) {
      const bf = n.buffs.find((b) => b.id === s.recastBuff);
      if (bf) {
        if (s.values && typeof s.values.minRange === "number" && typeof s.values.maxRange === "number") {
          const fc = s.values.fullCharge || 0.9,
            p = Math.max(0, Math.min(1, (bf.duration - bf.timeLeft) / Math.max(0.1, fc)));
          return { ...s.recastCast, range: s.values.minRange + (s.values.maxRange - s.values.minRange) * p };
        }
        return s.recastCast;
      }
    }
    if (s.holdCharge && s.values && typeof s.values.minRange === "number") {
      return { ...s.cast, range: s.values.minRange };
    }
    if (n.heroId === "cow" && t === "s2" && n.stats) {
      const ms = n.stats.moveSpeed || 5.5,
        r = Math.max(4.0, Math.min(13.0, 5.5 + (ms - 4.5) * 0.95));
      return { ...s.cast, range: r };
    }
    return s.cast;
  }
  return J8[t];
}

function m$(n) {
  return n.type !== "self" || n.radius > 0;
}

function U4(n) {
  return n.type === "self"
    ? n.radius > 0
      ? { kind: "self", radius: n.radius }
      : null
    : n.type === "target"
      ? { kind: "target", targetId: -1, range: n.range }
      : { kind: "self", radius: n.range };
}

const yk = 1;

function C3(n, t, e, s, i, a, o = 0, anyUnit = !1, ally = !1) {
  const r = n.me,
    pool = anyUnit && !ally ? n.state.units : n.state.heroes;
  let l = -1,
    c = 1 / 0;
  for (const f of pool) {
    if (ally) {
      if (f.team !== n.team || f.id === r.id || !f.alive) continue;
    } else {
      if (f.team === n.team || !f.alive || (f.visible && !f.visible[n.team])) continue;
      if (anyUnit && (f.kind === "tower" || f.kind === "core")) continue;
    }
    const d = f.pos.x - r.pos.x,
      h = f.pos.y - r.pos.y,
      u = Math.hypot(d, h);
    if (u > s + f.radius + yk) continue;
    let m = !1;
    for (const p of f.buffs) (p.id === "untargetable" || p.id === "xuesong_pole" || p.id === "stasis") && (m = !0);
    if (m) continue;
    let x;
    if (a) {
      const p = Math.hypot(f.pos.x - a.x, f.pos.y - a.y);
      if (p > o + f.radius) continue;
      x = p;
    } else {
      const p = u > 1e-4 ? (d * t + h * e) / u : 1,
        g = Math.acos(Math.max(-1, Math.min(1, p)));
      if (g > i) continue;
      x = g * 12 + u;
    }
    anyUnit && !ally && f.kind !== "hero" && (x += 6);
    x < c && ((c = x), (l = f.id));
  }
  return l;
}

const vk = Math.PI / 180;

function bk(n, t, e, s, i) {
  const a = n.me,
    o = { x: e, y: s };
  switch (t.type) {
    case "direction":
      return { indicator: { kind: "direction", dir: o, range: t.range, width: t.width }, dir: o };
    case "cone":
      return { indicator: { kind: "cone", dir: o, range: t.range, angle: t.angle }, dir: o };
    case "position": {
      const r = t.range * Math.max(0, Math.min(1, i)),
        l = { x: a.pos.x + e * r, y: a.pos.y + s * r };
      return { indicator: { kind: "position", pos: l, range: t.range, radius: t.radius }, pos: l };
    }
    case "target": {
      const r = C3(n, e, s, t.range, 50 * vk, void 0, 0, !!t.anyUnit, !!t.ally);
      return r >= 0
        ? { indicator: { kind: "target", targetId: r, range: t.range }, targetId: r }
        : { indicator: { kind: "target", targetId: -1, range: t.range } };
    }
    default:
      return { indicator: { kind: "self", radius: t.radius } };
  }
}

function g$(n, t, e, s) {
  const i = n.me;
  let a = e.x - i.pos.x,
    o = e.y - i.pos.y;
  const r = Math.hypot(a, o);
  if (
    (r > 0.001 ? ((a /= r), (o /= r)) : ((a = Math.cos(i.facing)), (o = Math.sin(i.facing))),
    t.type === "position")
  ) {
    const l = Math.min(r, t.range),
      c = { x: i.pos.x + a * l, y: i.pos.y + o * l };
    return { indicator: { kind: "position", pos: c, range: t.range, radius: t.radius }, pos: c };
  }
  if (t.type === "target") {
    let l = -1;
    const any = !!t.anyUnit,
      ally = !!t.ally,
      c = s >= 0 ? (any && !ally ? n.unit(s) : n.hero(s)) : void 0;
    return (
      c &&
        (ally
          ? c.team === n.team && c.id !== i.id
          : (!any || (c.kind !== "tower" && c.kind !== "core")) && c.team !== n.team) &&
        c.alive &&
        Math.hypot(c.pos.x - i.pos.x, c.pos.y - i.pos.y) <= t.range + c.radius + yk &&
        (l = c.id),
      l < 0 && (l = C3(n, a, o, t.range, 0, e, 3.5, any, ally)),
      l < 0 && (l = C3(n, a, o, t.range, 22 * vk, void 0, 0, any, ally)),
      l >= 0
        ? { indicator: { kind: "target", targetId: l, range: t.range }, targetId: l }
        : { indicator: { kind: "target", targetId: -1, range: t.range } }
    );
  }
  return bk(n, t, a, o, 1);
}

const _k = 400;

function x$(n, t, e = _k) {
  const s = t - n;
  return !Number.isFinite(s) || s < 0 ? !0 : s <= e;
}

const y$ = Jn(`
/* 虚拟摇杆：空闲时半透明停在左下角提示位置；按下后跳到手指处 */
.sf-hud__joy { position: absolute; z-index: 2; left: calc(var(--hud-l) + var(--hud-sk) * 1.85); bottom: calc(var(--hud-b) + var(--hud-lift) + var(--hud-sk) * 1.65); width: 0; height: 0; pointer-events: none; display: none; opacity: 0.55; transition: opacity 0.25s linear; }
.sf-hud--touch .sf-hud__joy { display: block; }
.sf-hud__joy.is-active { opacity: 1; transition: none; }
.sf-hud.is-dead .sf-hud__joy { filter: grayscale(1); opacity: 0.35; }
.sf-hud__joy-base {
  --d: calc(var(--hud-sk) * 2.3); position: absolute; left: calc(var(--d) / -2); top: calc(var(--d) / -2); width: var(--d); height: var(--d); border-radius: 50%;
  background: radial-gradient(circle, rgba(40, 64, 124, 0.16) 0, rgba(8, 13, 31, 0.42) 60%, rgba(8, 13, 31, 0.6) 100%);
  box-shadow: inset 0 0 0 1.5px rgba(232, 199, 122, 0.6), inset 0 0 0 max(5px, 7u) rgba(8, 13, 31, 0.28), inset 0 0 0 max(6px, 8u) rgba(143, 233, 255, 0.22), 0 4u 18u rgba(2, 4, 12, 0.4);
}
/* 四个方向刻度 */
.sf-hud__joy-base::before { content: ''; position: absolute; inset: 9%; border-radius: 50%;
  background: conic-gradient(from -6deg, rgba(255, 231, 173, 0.85) 0 12deg, transparent 12deg 90deg, rgba(255, 231, 173, 0.85) 90deg 102deg, transparent 102deg 180deg, rgba(255, 231, 173, 0.85) 180deg 192deg, transparent 192deg 270deg, rgba(255, 231, 173, 0.85) 270deg 282deg, transparent 282deg 360deg);
  -webkit-mask-image: radial-gradient(circle closest-side, transparent 0, transparent 86%, #000 88%); mask-image: radial-gradient(circle closest-side, transparent 0, transparent 86%, #000 88%); }
.sf-hud__joy-knob {
  --d: calc(var(--hud-sk) * 0.98); position: absolute; left: calc(var(--d) / -2); top: calc(var(--d) / -2); width: var(--d); height: var(--d); border-radius: 50%; will-change: transform;
  background: radial-gradient(circle at 40% 30%, #7fa2ee, #27459a 52%, #0d1a44);
  box-shadow: 0 0 0 1px rgba(8, 13, 31, 0.9), 0 0 0 max(2px, 2.5u) rgba(255, 231, 173, 0.9), 0 3u 10u rgba(0, 0, 0, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.32);
}
.sf-hud__joy.is-active .sf-hud__joy-knob { box-shadow: 0 0 0 1px rgba(8, 13, 31, 0.9), 0 0 0 max(2px, 2.5u) #fff4d6, 0 0 20u rgba(92, 214, 247, 0.75), inset 0 2px 0 rgba(255, 255, 255, 0.4); }
`),
  v$ = Math.cos((7 * Math.PI) / 180),
  b$ = 0.08,
  _$ = 0.15,
  O4 = 12,
  B4 = 8,
  w$ = 0.09,
  M$ = 0.5,
  Wp = 8,
  k$ = { KeyQ: "s1", KeyE: "s2", KeyR: "ult" },
  S$ = new Set([
    "KeyW",
    "KeyA",
    "KeyS",
    "KeyD",
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "Space",
    "KeyJ",
    "KeyQ",
    "KeyE",
    "KeyR",
    "KeyF",
    "KeyG",
    "KeyB",
    "KeyP",
    "Tab",
  ]),
  B2 = (n, t) => Math.abs(n.x - t.x) < 1e-4 && Math.abs(n.y - t.y) < 1e-4;

function T$(n, t) {
  if (n === t) return !0;
  if (!n || !t || n.kind !== t.kind || !!n.cancel != !!t.cancel || !!n.pointer != !!t.pointer) return !1;
  switch (n.kind) {
    case "direction":
      return t.kind === "direction" && n.range === t.range && n.width === t.width && B2(n.dir, t.dir);
    case "cone":
      return t.kind === "cone" && n.range === t.range && n.angle === t.angle && B2(n.dir, t.dir);
    case "position":
      return t.kind === "position" && n.range === t.range && n.radius === t.radius && B2(n.pos, t.pos);
    case "target":
      return t.kind === "target" && n.range === t.range && n.targetId === t.targetId;
    default:
      return t.kind === "self" && n.radius === t.radius;
  }
}

function E$(n) {
  return n ?? ey();
}

function A$(n, t) {
  Zn("sf-hud-input", y$);
  const { host: e, root: s } = n,
    { field: i, skills: a } = t,
    o = () => performance.now() / 1e3,
    r = [],
    l = (O, Y, gt, ft) => {
      (O.addEventListener(Y, gt, ft), r.push(() => O.removeEventListener(Y, gt, ft)));
    },
    c = (O, Y, gt) => {
      (window.addEventListener(O, Y, gt), r.push(() => window.removeEventListener(O, Y, gt)));
    },
    f = (O) => e.command(O),
    d = (O) => {
      t.forced || (O === "touch" || O === "pen" ? t.setMode("touch") : O === "mouse" && t.setMode("kbm"));
    },
    h = (O) => O.pointerType !== "mouse" || t.forced === "touch",
    u = { up: !1, down: !1, left: !1, right: !1 };
  let m = null,
    x = 0,
    p = 0,
    g = 0,
    y = 0,
    v = 0,
    _ = 0,
    k = -1;
  const M = z("div", "sf-hud__joy-knob"),
    S = z("div", "sf-hud__joy", z("div", "sf-hud__joy-base"), M);
  function b() {
    if (n.inputBlocked()) return;
    let O = g,
      Y = y;
    m === null &&
      ((O = (u.right ? 1 : 0) - (u.left ? 1 : 0)),
      (Y = (u.down ? 1 : 0) - (u.up ? 1 : 0)),
      O !== 0 && Y !== 0 && ((O *= Math.SQRT1_2), (Y *= Math.SQRT1_2)));
    const gt = O === 0 && Y === 0,
      ft = v === 0 && _ === 0;
    if (gt) {
      ft || ((v = _ = 0), f({ type: "move", dir: { x: 0, y: 0 } }));
      return;
    }
    const _t = o();
    (ft || O * v + Y * _ < v$ || _t - k >= b$) &&
      ((v = O), (_ = Y), (k = _t), f({ type: "move", dir: { x: O, y: Y } }));
  }
  const w = () => a.buttons.s1.offsetWidth || 56;
  function T(O) {
    m = O.pointerId;
    const Y = s.getBoundingClientRect();
    ((x = O.clientX),
      (p = O.clientY),
      (g = y = 0),
      (S.style.left = `${x - Y.left}px`),
      (S.style.top = `${p - Y.top}px`),
      (S.style.bottom = "auto"),
      (M.style.transform = ""),
      S.classList.add("is-active"));
    try {
      i.setPointerCapture(O.pointerId);
    } catch {}
  }
  function E(O) {
    const Y = w() * 1.05;
    let gt = O.clientX - x,
      ft = O.clientY - p,
      _t = Math.hypot(gt, ft);
    if (_t > Y) {
      const Dt = (_t - Y) / _t;
      ((x += gt * Dt), (p += ft * Dt));
      const zt = s.getBoundingClientRect();
      ((S.style.left = `${x - zt.left}px`),
        (S.style.top = `${p - zt.top}px`),
        (gt = O.clientX - x),
        (ft = O.clientY - p),
        (_t = Y));
    }
    ((M.style.transform = `translate(${gt.toFixed(1)}px, ${ft.toFixed(1)}px)`),
      _t < Y * 0.14 ? (g = y = 0) : ((g = gt / _t), (y = ft / _t)),
      b());
  }
  function A() {
    m !== null &&
      ((m = null),
      (g = y = 0),
      S.classList.remove("is-active"),
      (S.style.left = ""),
      (S.style.top = ""),
      (S.style.bottom = ""),
      (M.style.transform = ""),
      b());
  }
  function C(O) {
    const Y = s.getBoundingClientRect(),
      gt = (O.clientX - Y.left) / Math.max(1, Y.width),
      ft = (O.clientY - Y.top) / Math.max(1, Y.height);
    return Y.height >= Y.width ? gt < 0.56 && ft > 0.45 : gt < 0.5 && ft > 0.3;
  }
  let R = null,
    I = null;
  const P = (O) => {
    T$(O, I) || ((I = O), e.setAim(O));
  };
  function F(O) {
    O === null || R !== O || ((R = null), P(null), a.setAiming(null, !1));
  }
  function L(O, Y) {
    if (n.inputBlocked()) return;
    if (n.me.skills[O].level <= 0) {
      (n.toast("技能尚未学会", "warn"), e.audio.ui("error"));
      return;
    }
    const gt = { type: "cast", slot: O };
    (Y &&
      (Y.dir && (gt.dir = Y.dir),
      Y.pos && (gt.pos = Y.pos),
      Y.targetId !== void 0 && (gt.targetId = Y.targetId)),
      f(gt));
  }
  function activeChargeSlot() {
    const sks = Se[n.me.heroId]?.skills;
    if (!sks || !n.me.buffs || n.me.buffs.length === 0) return null;
    for (const slot of ["s1", "s2", "ult"]) {
      const def = sks[slot];
      if (def?.holdCharge && def.recastBuff && n.me.buffs.some((b) => b.id === def.recastBuff)) return slot;
    }
    return null;
  }
  function canHoldStart(O) {
    if (O !== "s1" && O !== "s2" && O !== "ult") return !1;
    if (n.me.heroId === "slime" && O === "s2" && n.me.buffs && n.me.buffs.some((b) => b.id === "slime_wall_bounce")) return !1;
    const def = Se[n.me.heroId]?.skills?.[O];
    if (!def || !def.holdCharge) return !1;
    const sk = n.me.skills[O];
    if (!sk || sk.level <= 0 || sk.cd > 0 || n.me.mana < sk.cost) return !1;
    return !(def.recastBuff && n.me.buffs && n.me.buffs.some((b) => b.id === def.recastBuff));
  }
  // 装备主动：数字键 1~6 对应装备栏的六格。
  // 传送要落点，所以把鼠标在场景里的地面投影一起带过去（拿不到就由引擎退化成朝正前方）。
  function itemActive(ix) {
    if (n.inputBlocked()) return;
    const gp = it.known ? e.screenToGround(it.x, it.y) : null;
    f({ type: "item", index: ix, pos: gp ? { x: gp.x, y: gp.y } : null });
  }
  const B = new Set();
  let G = -1;
  function q() {
    n.inputBlocked() || activeChargeSlot() || ((G = o()), f({ type: "attack" }));
  }
  const et = new Map();
  let ct = null;
  function rt(O, Y) {
    if (!ct) return !1;
    const gt = ct.left + ct.width / 2,
      ft = ct.top + ct.height / 2;
    return Math.hypot(O - gt, Y - ft) <= (ct.width / 2) * 1.2;
  }
  function mt(O) {
    const Y = w(),
      gt = s.getBoundingClientRect();
    let ft = 1 / 0;
    return (
      O.nx > 0.001
        ? (ft = Math.min(ft, (gt.right - Wp - O.x0) / O.nx))
        : O.nx < -0.001 && (ft = Math.min(ft, (O.x0 - gt.left - Wp) / -O.nx)),
      O.ny > 0.001
        ? (ft = Math.min(ft, (gt.bottom - Wp - O.y0) / O.ny))
        : O.ny < -0.001 && (ft = Math.min(ft, (O.y0 - gt.top - Wp) / -O.ny)),
      Math.max(Y * 0.45, Math.min(Y * 1.15, ft))
    );
  }
  let lastAimAt = -1;
  function sendChargeAim(slot, dir) {
    if (!dir) return;
    const def = Se[n.me.heroId]?.skills?.[slot];
    if (!def?.holdCharge || !def.recastBuff) return;
    if (!n.me.buffs || !n.me.buffs.some((b) => b.id === def.recastBuff)) return;
    const now = o();
    if (now - lastAimAt < 0.04) return;
    lastAimAt = now;
    f({ type: "aim", dir });
  }
  function nt(O) {
    if (O.btn === "attack" || O.state !== "aim") return;
    const Y = bk(n, Cd(n.me, O.btn), O.nx, O.ny, O.mag);
    (O.cancel && (Y.indicator.cancel = !0), (O.sol = Y), P(Y.indicator), sendChargeAim(O.btn, Y.dir));
  }
  function H(O, Y, gt = Number.NaN) {
    if ((window.clearTimeout(O.timer), et.delete(O.id), a.setDown(O.btn, !1), O.btn === "attack")) {
      B.delete(O.id);
      return;
    }
    const ft = O.btn,
      _t = a.buttons[ft];
    if (O.state === "aim") {
      const Dt = O.sol,
        zt = O.cancel;
      (F(O.id), Y && !zt && L(ft, Dt));
      return;
    }
    (F(O.id),
      !(O.state === "void" || !Y) &&
        (!O.touch || x$(O.t0, gt)
          ? (O.state === "info" && Fp(_t) && zi(), L(ft, null))
          : O.state === "press" && T2(_t, a.tipHtml(ft), 4200)));
  }
  function st(O) {
    const Y = a.buttons[O];
    (l(Y, "pointerdown", (ft) => {
      if (
        (ft.pointerType === "mouse" && ft.button !== 0) ||
        (ft.preventDefault(), !n.enabled || et.has(ft.pointerId))
      )
        return;
      try {
        Y.setPointerCapture(ft.pointerId);
      } catch {}
      const _t = ft.pointerType !== "mouse",
        Dt = {
          id: ft.pointerId,
          btn: O,
          x0: ft.clientX,
          y0: ft.clientY,
          t0: ft.timeStamp,
          state: "press",
          timer: 0,
          touch: _t,
          nx: 0,
          ny: -1,
          mag: 0,
          sol: null,
          cancel: !1,
        };
      if ((et.set(ft.pointerId, Dt), a.setDown(O, !0), O === "attack")) {
        (B.add(ft.pointerId), q());
        return;
      }
      if (!n.inputBlocked() && canHoldStart(O)) {
        if (!_t) {
          const sol = solveAimForSlot(O);
          L(O, sol);
          Dt.state = "void";
          return;
        }
        L(O, null);
        if (R === null || R === Dt.id) {
          Dt.state = "aim";
          R = Dt.id;
          a.setAiming(O, !0);
          ct = a.cancelZone.getBoundingClientRect();
          nt(Dt);
        }
        return;
      }
      if (!n.inputBlocked() && !_t && activeChargeSlot() === O) {
        L(O, solveAimForSlot(O));
        Dt.state = "void";
        return;
      }
      _t &&
        (Dt.timer = window.setTimeout(() => {
          if (Dt.state !== "press" || !et.has(Dt.id)) return;
          ((Dt.state = "info"), T2(Y, a.tipHtml(O), 4200));
          const zt = Cd(n.me, O),
            Ot = U4(zt);
          Ot && R === null && !n.inputBlocked() && n.me.skills[O].level > 0 && ((R = Dt.id), P(Ot));
        }, _k));
    }),
      l(Y, "pointermove", (ft) => {
        const _t = et.get(ft.pointerId);
        if (!_t || _t.btn === "attack") return;
        const Dt = _t.btn,
          zt = ft.clientX - _t.x0,
          Ot = ft.clientY - _t.y0,
          Jt = Math.hypot(zt, Ot);
        if (_t.state !== "void") {
          if (_t.state !== "aim") {
            if (Jt < (_t.touch ? O4 : B4)) return;
            const ue = Cd(n.me, Dt);
            if (!m$(ue)) {
              Jt >= Math.max(_t.touch ? O4 : B4, Y.offsetWidth * M$) &&
                (window.clearTimeout(_t.timer),
                Fp(Y) && zi(),
                F(_t.id),
                (_t.state = "void"),
                a.setDown(Dt, !1));
              return;
            }
            if (!(R === null || R === _t.id) || n.inputBlocked() || n.me.skills[Dt].level <= 0) return;
            (window.clearTimeout(_t.timer),
              Fp(Y) && zi(),
              (_t.state = "aim"),
              (R = _t.id),
              a.setAiming(Dt, !0),
              (ct = a.cancelZone.getBoundingClientRect()));
          }
          (Jt > 0.5 && ((_t.nx = zt / Jt), (_t.ny = Ot / Jt)),
            (_t.mag = Jt / mt(_t)),
            (_t.cancel = rt(ft.clientX, ft.clientY)),
            a.setCancelHot(_t.cancel),
            nt(_t));
        }
      }));
    const gt = (ft, _t) => {
      const Dt = et.get(ft.pointerId);
      Dt && H(Dt, _t, ft.timeStamp);
    };
    (l(Y, "pointerup", (ft) => gt(ft, !0)),
      l(Y, "pointercancel", (ft) => gt(ft, !1)),
      l(Y, "lostpointercapture", (ft) => {
        ft.target === Y && gt(ft, !1);
      }),
      l(Y, "pointerenter", (ft) => {
        ft.pointerType !== "mouse" ||
          et.size > 0 ||
          T2(
            Y,
            O === "attack"
              ? '<div class="sf-tip__title"><span>普通攻击</span></div><div>自动选择目标：优先射程内的敌方英雄，其次残血小兵、防御塔与野怪。按住可连续攻击。</div>'
              : a.tipHtml(O),
          );
      }),
      l(Y, "pointerleave", (ft) => {
        ft.pointerType === "mouse" && Fp(Y) && zi();
      }));
  }
  st("attack");
  for (const O of A3) st(O);
  let tt = null,
    chargeAimOn = !1;
  const it = { x: 0, y: 0, known: !1 };
  function solveAimForSlot(slot) {
    const O = Cd(n.me, slot),
      Y = it.known ? e.screenToGround(it.x, it.y) : null;
    if (Y) {
      const gt = O.type === "target" ? e.pickUnit(it.x, it.y) : -1;
      return g$(n, O, Y, gt);
    }
    if (O.type === "direction" || O.type === "cone") {
      const rev = n.me.heroId === "horseman" && activeChargeSlot() === slot ? -1 : 1;
      return bk(n, O, Math.cos(n.me.facing) * rev, Math.sin(n.me.facing) * rev, 1);
    }
    return null;
  }
  function D() {
    if (!tt) return null;
    return solveAimForSlot(tt.slot);
  }
  function updateLiveChargeAim(slot) {
    const O = solveAimForSlot(slot),
      Y = O ? O.indicator : U4(Cd(n.me, slot));
    (Y && (Y.pointer = !0), P(Y), O && sendChargeAim(slot, O.dir), (chargeAimOn = !0));
  }
  function Q() {
    if (!tt) return;
    const O = D(),
      Y = O ? O.indicator : U4(Cd(n.me, tt.slot));
    (Y && (Y.pointer = !0), P(Y), O && sendChargeAim(tt.slot, O.dir));
  }
  function $() {
    tt && (a.setDown(tt.slot, !1), (tt = null), F("key"));
  }
  function ut(O, Y) {
    if (!n.inputBlocked()) {
      if (n.me.skills[O].level <= 0) {
        (n.toast("技能尚未学会", "warn"), e.audio.ui("error"));
        return;
      }
      if (activeChargeSlot() === O && !tt) {
        L(O, solveAimForSlot(O));
        return;
      }
      (R !== null && R !== "key") ||
        (tt && a.setDown(tt.slot, !1),
        (tt = { slot: O, code: Y }),
        (R = "key"),
        a.setDown(O, !0),
        a.setAiming(O, !1),
        Q(),
        canHoldStart(O) && L(O, D()));
    }
  }
  function N() {
    if (activeChargeSlot()) return;
    $();
    for (const O of et.values())
      O.btn === "attack" ||
        (O.state !== "aim" && O.state !== "info") ||
        (window.clearTimeout(O.timer), F(O.id), (O.state = "void"));
  }
  function J() {
    if (!it.known) return null;
    const O = e.screenToGround(it.x, it.y);
    if (!O) return null;
    const Y = O.x - n.me.pos.x,
      gt = O.y - n.me.pos.y,
      ft = Math.hypot(Y, gt);
    return ft > 0.001 ? { x: Y / ft, y: gt / ft } : null;
  }
  let Z = null,
    ot = -1;
  function j(O) {
    if (O < 0) return !1;
    const Y = n.unit(O);
    return !!Y && Y.alive && Y.team !== n.team;
  }
  (l(s, "pointerdown", (O) => d(O.pointerType), { capture: !0 }),
    l(i, "pointerdown", (O) => {
      if (n.enabled) {
        if (h(O)) {
          if (O.pointerType === "mouse" && O.button !== 0) return;
          m === null && C(O) && (O.preventDefault(), T(O));
          return;
        }
        if ((O.preventDefault(), O.button === 2)) {
          if (activeChargeSlot()) return;
          if (R !== null) {
            N();
            return;
          }
          if (n.inputBlocked()) return;
          const Y = e.pickUnit(O.clientX, O.clientY);
          if (j(Y)) {
            (f({ type: "attack", targetId: Y }), z2(s, O.clientX, O.clientY, !0));
            return;
          }
          const gt = e.screenToGround(O.clientX, O.clientY);
          if (!gt) return;
          (f({ type: "moveTo", pos: gt }), z2(s, O.clientX, O.clientY, !1), (Z = O.pointerId), (ot = o()));
          try {
            i.setPointerCapture(O.pointerId);
          } catch {}
        } else if (O.button === 0) {
          if (n.inputBlocked() || activeChargeSlot()) return;
          const Y = e.pickUnit(O.clientX, O.clientY);
          j(Y) && (f({ type: "attack", targetId: Y }), z2(s, O.clientX, O.clientY, !0));
        }
      }
    }),
    l(i, "pointermove", (O) => {
      if (O.pointerId === m) {
        E(O);
        return;
      }
      if (O.pointerId === Z && !n.inputBlocked()) {
        const Y = o();
        if (Y - ot < w$) return;
        const gt = e.screenToGround(O.clientX, O.clientY);
        if (!gt) return;
        ((ot = Y), f({ type: "moveTo", pos: gt }));
      }
    }));
  const at = (O) => {
    (O.pointerId === m && A(), O.pointerId === Z && (Z = null));
  };
  (l(i, "pointerup", at),
    l(i, "pointercancel", at),
    l(i, "lostpointercapture", at),
    c("pointermove", (O) => {
      if (O.pointerType === "mouse") {
        ((it.x = O.clientX), (it.y = O.clientY), (it.known = !0));
        if (tt) Q();
        else if (typeof R != "number") {
          const cs = activeChargeSlot();
          cs && updateLiveChargeAim(cs);
        }
      }
    }));
  function Rt(O, Y) {
    switch (O) {
      case "KeyW":
      case "ArrowUp":
        return ((u.up = Y), !0);
      case "KeyS":
      case "ArrowDown":
        return ((u.down = Y), !0);
      case "KeyA":
      case "ArrowLeft":
        return ((u.left = Y), !0);
      case "KeyD":
      case "ArrowRight":
        return ((u.right = Y), !0);
      default:
        return !1;
    }
  }
  const kt = (O) => {
    const Y = O.target;
    return (
      Y instanceof HTMLInputElement || Y instanceof HTMLTextAreaElement || Y instanceof HTMLSelectElement
    );
  };
  (c("keydown", (O) => {
    // 表情快捷键 Ctrl1~4。必须挡在下面那个 return 前面 —— 它一进门就把带修饰键的键全丢了。
    // （浏览器把 Ctrl1~8 拿去切标签页，preventDefault 不一定拦得住，所以按钮/下拉也能点。）
    if (!n.enabled || Sf() || kt(O) || O.metaKey || O.altKey) return;
    if (O.ctrlKey && !O.repeat) {
      const et = { Digit1: "taunt", Digit2: "joke", Digit3: "dance", Digit4: "cheer" }[O.code];
      if (et) {
        (O.preventDefault(), n.actions.emote(et));
        return;
      }
    }
    if (O.ctrlKey) return;
    const Y = O.code;
    if ((!t.forced && S$.has(Y) && t.setMode("kbm"), Rt(Y, !0))) {
      (O.preventDefault(), b());
      return;
    }
    switch (Y) {
      case "Space":
      case "KeyJ":
        if ((O.preventDefault(), O.repeat)) return;
        (B.add(Y), a.setDown("attack", !0), q());
        break;
      case "KeyQ":
      case "KeyE":
      case "KeyR":
        if (O.repeat) return;
        ut(k$[Y], Y);
        break;
      case "KeyF": {
        if (O.repeat || n.inputBlocked()) return;
        const gt = J();
        L("flash", gt ? { dir: gt } : null);
        break;
      }
      case "KeyG":
        O.repeat || L("heal", null);
        break;
      case "KeyB":
        O.repeat || L("recall", null);
        break;
      // 装备主动：1~6 对应装备栏六格（带 Ctrl 的那几个数字键是表情，上面已经 return 掉了）
      case "Digit1":
      case "Digit2":
      case "Digit3":
      case "Digit4":
      case "Digit5":
      case "Digit6":
        O.repeat || itemActive(+Y.slice(5) - 1);
        break;
      case "Tab":
        (O.preventDefault(), !O.repeat && !n.actions.isScoreboardPinned() && n.actions.setScoreboard(!0, !1));
        break;
      case "KeyP":
        O.repeat || (e.audio.ui("click"), n.actions.toggleShop());
        break;
      case "Escape":
        if ((O.preventDefault(), O.repeat)) return;
        R !== null
          ? N()
          : n.actions.isShopOpen()
            ? (e.audio.ui("back"), n.actions.setShop(!1))
            : n.actions.isScoreboardPinned()
              ? n.actions.setScoreboard(!1, !1)
              : n.actions.openSettings();
        break;
    }
  }),
    c("keyup", (O) => {
      const Y = O.code;
      if (Rt(Y, !1)) {
        b();
        return;
      }
      if (Y === "Space" || Y === "KeyJ")
        (B.delete(Y), !B.has("Space") && !B.has("KeyJ") && a.setDown("attack", !1));
      else if (tt && tt.code === Y) {
        const gt = tt.slot,
          ft = D();
        ($(), Sf() || L(gt, ft));
      } else Y === "Tab" && (n.actions.isScoreboardPinned() || n.actions.setScoreboard(!1, !1));
    }));
  function V() {
    u.up = u.down = u.left = u.right = !1;
    for (const Y of Array.from(et.values())) H(Y, !1);
    (B.clear(), a.setDown("attack", !1), $(), F(R), (Z = null));
    const O = m !== null;
    (A(), O || b(), n.actions.isScoreboardPinned() || n.actions.setScoreboard(!1, !1));
  }
  c("blur", V);
  const U = () => {
    document.hidden && V();
  };
  (document.addEventListener("visibilitychange", U),
    r.push(() => document.removeEventListener("visibilitychange", U)),
    l(s, "contextmenu", (O) => O.preventDefault()),
    l(
      s,
      "touchmove",
      (O) => {
        (O.target instanceof Element && O.target.closest(".sf-scroll, input")) ||
          (O.cancelable && O.preventDefault());
      },
      { passive: !1 },
    ));
  const ht = (O) => O.preventDefault();
  for (const O of ["gesturestart", "gesturechange", "gestureend"])
    (s.addEventListener(O, ht), r.push(() => s.removeEventListener(O, ht)));
  (l(s, "dblclick", (O) => {
    (O.target instanceof Element && O.target.closest(".sf-hud__card")) || O.preventDefault();
  }),
    l(s, "selectstart", (O) => O.preventDefault()));
  let lt = n.inputBlocked();
  return {
    joystick: S,
    reset: V,
    isAiming: () => R !== null,
    cancelAim: N,
    update(O) {
      const Y = O.inputBlocked();
      if ((Y !== lt && ((lt = Y), Y && (N(), (v = _ = 0))), !Y)) {
        const cs = activeChargeSlot();
        if ((b(), B.size > 0 && o() - G >= _$ && q(), tt)) Q();
        else if (typeof R == "number") {
          const gt = et.get(R);
          gt && nt(gt);
        } else if (cs) {
          updateLiveChargeAim(cs);
        } else if (chargeAimOn) {
          chargeAimOn = !1;
          R === null && P(null);
        }
      } else if (chargeAimOn) {
        chargeAimOn = !1;
        R === null && P(null);
      }
    },
    onMode() {
      m !== null && A();
    },
    dispose() {
      V();
      for (const O of r) O();
      ((r.length = 0), zi());
    },
  };
}

const R$ = Jn(`
.sf-hud__banner-wrap { position: absolute; left: 0; right: 0; top: calc(var(--hud-t) + max(54px, 64u)); z-index: 4; display: flex; justify-content: center; pointer-events: none; }
.sf-hud__banner {
  --tone: 92, 214, 247; --fs: max(14px, 17u); --face: 0px;
  position: relative; isolation: isolate; display: flex; align-items: center; justify-content: center; gap: 12u; min-width: min(300u, 80vw); max-width: 96vw; padding: 5u 64u 6u;
  animation: sf-hud-bn-in 0.4s var(--sf-ease-out) both;
}
.sf-hud__banner.is-ally { --tone: 77, 163, 255; }
.sf-hud__banner.is-foe { --tone: 255, 93, 93; }
.sf-hud__banner.is-out { animation: sf-hud-bn-out 0.22s var(--sf-ease-in) both; }
/* 底带：中间实、两端渐隐；上沿一道亮的星轨线，下沿一道淡的。
   底色留两成通透：镜头拉近后，英雄以北十来米的敌人正好在横幅后面，不能被盖死 */
.sf-hud__banner::before {
  content: ''; position: absolute; inset: 0; z-index: -1;
  background:
    linear-gradient(90deg, rgba(255, 231, 173, 0), rgba(255, 231, 173, 0.95) 28%, #fff4d6 50%, rgba(255, 231, 173, 0.95) 72%, rgba(255, 231, 173, 0)) left top / 100% 1.5px no-repeat,
    linear-gradient(90deg, rgba(255, 231, 173, 0), rgba(255, 231, 173, 0.6) 30%, rgba(255, 231, 173, 0.6) 70%, rgba(255, 231, 173, 0)) left bottom / 100% 1px no-repeat,
    linear-gradient(90deg, rgba(var(--tone), 0), rgba(var(--tone), 0.36) 20%, rgba(8, 13, 31, 0.8) 40%, rgba(8, 13, 31, 0.8) 60%, rgba(var(--tone), 0.36) 80%, rgba(var(--tone), 0));
}
/* 上沿正中的菱形星 */
.sf-hud__banner::after {
  content: ''; position: absolute; left: 50%; top: 0; width: 9u; height: 9u; margin: -4.5u 0 0 -4.5u; transform: rotate(45deg);
  background: linear-gradient(135deg, #fff4d6, #e0b160); box-shadow: 0 0 10u rgba(255, 214, 130, 0.9);
}
.sf-hud__banner-text { display: flex; flex-direction: column; align-items: center; min-width: 0; }
.sf-hud__banner-title {
  margin: 0; font-weight: 900; font-size: var(--fs); line-height: 1.22; letter-spacing: 0.22em; margin-right: -0.22em; white-space: nowrap;
  animation: sf-hud-bn-slam 0.5s var(--sf-ease-out) both;
}
/* 中立播报(开战/兵线/野怪现身)：青白色的星辉金属字 */
.sf-hud__banner.is-neutral .sf-hud__banner-title {
  background-image: linear-gradient(180deg, #ffffff 0%, #d9f8ff 30%, #7fdcf5 54%, #2b8fb8 62%, #a5ebff 82%, #f0fdff 100%);
  filter: drop-shadow(0 1u 0 rgba(6, 30, 48, 0.9)) drop-shadow(0 3u 8u rgba(0, 0, 0, 0.55));
}
.sf-hud__banner.is-foe .sf-hud__banner-title {
  background-image: linear-gradient(180deg, #fff3ee 0%, #ffc2b3 28%, #f25b50 54%, #9c1f2b 62%, #ff8d7a 82%, #ffe6dd 100%);
  filter: drop-shadow(0 1u 0 rgba(60, 6, 12, 0.9)) drop-shadow(0 3u 8u rgba(0, 0, 0, 0.55));
}
.sf-hud__banner-sub { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 0 5u; margin-top: 1u; font-size: var(--sf-fs-sm); font-weight: 600; line-height: 1.35; color: var(--sf-c-text); text-align: center; text-shadow: var(--hud-shadow-text); }
/* 每一段自己不折行，放不下时整段换到下一行 */
.sf-hud__banner-sub > * { white-space: nowrap; }
.sf-hud__banner-sub .is-dim { color: var(--sf-c-text-2); font-weight: 600; }
.sf-hud__banner-sub .is-blue { color: #9ccfff; font-weight: 800; }
.sf-hud__banner-sub .is-red { color: #ff9c9c; font-weight: 800; }
.sf-hud__banner-sub .is-me { color: var(--sf-c-me); font-weight: 800; }
.sf-hud__banner-sub .is-gold { display: inline-flex; align-items: center; gap: 2u; color: var(--sf-c-gold-200); font-weight: 800; }
.sf-hud__banner-sub .sf-i { width: 1.1em; height: 1.1em; vertical-align: 0; }
.sf-hud__banner-face { position: absolute; top: 50%; display: grid; place-items: center; width: var(--face); height: var(--face); margin-top: calc(var(--face) / -2); }
.sf-hud__banner-face.is-l { left: 6u; animation: sf-hud-bn-face-l 0.45s var(--sf-ease-spring) both; }
.sf-hud__banner-face.is-r { right: 6u; animation: sf-hud-bn-face-r 0.45s var(--sf-ease-spring) 0.08s both; }
.sf-hud__banner-face .sf-hud__face { --sz: var(--face); box-shadow: 0 0 0 max(2px, 2.5u) var(--ring), 0 0 0 max(3px, 4u) rgba(8, 13, 31, 0.9), 0 0 14u rgba(var(--tone), 0.8); }
/* 被杀者头像上划一道 */
.sf-hud__banner-face.is-r.is-slain::after { content: ''; position: absolute; left: -8%; right: -8%; top: 50%; height: max(2px, 3u); margin-top: -1.5u; border-radius: 2u; transform: rotate(-38deg); background: linear-gradient(90deg, rgba(255, 255, 255, 0), #fff 30%, #ff8d8d 70%, rgba(255, 93, 93, 0)); box-shadow: 0 0 8u rgba(255, 93, 93, 0.9); }

/* ── 强度分级 ── */
.sf-hud__banner.is-t2 { --fs: min(max(17px, 23u), 6vw); --face: max(34px, 42u); padding: 6u 70u 7u; }
.sf-hud__banner.is-t3 { --fs: min(max(22px, 32u), 7.4vw); --face: max(42px, 54u); padding: 7u 84u 8u; min-width: min(380u, 90vw); }
.sf-hud__banner.is-t4 { --fs: min(max(27px, 42u), 7.6vw); --face: max(48px, 64u); padding: 8u 96u 10u; min-width: min(460u, 94vw); }
.sf-hud__banner.is-t4 .sf-hud__banner-title { letter-spacing: 0.3em; margin-right: -0.3em; }
.sf-hud__banner.is-noface { padding-left: 44u; padding-right: 44u; }
/* 3 级起：标题后面一轮放射光；4 级再加闪烁星点与标题扫光 */
.sf-hud__banner-rays {
  --r: max(110px, 190u); position: absolute; left: 50%; top: 50%; z-index: -2; width: calc(var(--r) * 2); height: calc(var(--r) * 2); margin: calc(var(--r) * -1) 0 0 calc(var(--r) * -1); border-radius: 50%; display: none;
  background: repeating-conic-gradient(from 0deg, rgba(255, 226, 160, 0.34) 0deg 4deg, rgba(255, 226, 160, 0) 4deg 12deg);
  -webkit-mask-image: radial-gradient(ellipse 100% 46% at center, #000 0, rgba(0, 0, 0, 0.55) 30%, transparent 70%); mask-image: radial-gradient(ellipse 100% 46% at center, #000 0, rgba(0, 0, 0, 0.55) 30%, transparent 70%);
  animation: sf-spin 40s linear infinite;
}
.sf-hud__banner.is-foe .sf-hud__banner-rays { background: repeating-conic-gradient(from 0deg, rgba(255, 130, 120, 0.3) 0deg 4deg, rgba(255, 130, 120, 0) 4deg 12deg); }
.sf-hud__banner.is-t3 .sf-hud__banner-rays, .sf-hud__banner.is-t4 .sf-hud__banner-rays { display: block; }
.sf-hud__banner.is-t4 .sf-hud__banner-rays { --r: max(150px, 260u); }
.sf-hud__banner-spark { position: absolute; z-index: -1; width: 16u; height: 16u; display: none; background: radial-gradient(circle, #fff 0, rgba(255, 244, 214, 0.9) 18%, rgba(255, 214, 130, 0) 62%); clip-path: polygon(50% 0, 58% 42%, 100% 50%, 58% 58%, 50% 100%, 42% 58%, 0 50%, 42% 42%); animation: sf-hud-bn-spark 1.1s ease-in-out infinite; }
.sf-hud__banner.is-t4 .sf-hud__banner-spark { display: block; }
.sf-hud__banner-spark:nth-child(2) { left: 20%; top: -12u; }
.sf-hud__banner-spark:nth-child(3) { right: 18%; top: -6u; animation-delay: 0.35s; width: 22u; height: 22u; }
.sf-hud__banner-spark:nth-child(4) { left: 30%; bottom: -10u; animation-delay: 0.6s; width: 12u; height: 12u; }
.sf-hud__banner-spark:nth-child(5) { right: 28%; bottom: -12u; animation-delay: 0.15s; }
.sf-hud__banner.is-t4::before { animation: sf-hud-bn-flash 0.6s ease-out both; }

@keyframes sf-hud-bn-in { from { opacity: 0; transform: scaleX(0.35); } to { opacity: 1; transform: none; } }
@keyframes sf-hud-bn-out { to { opacity: 0; transform: translateY(-10u) scale(0.97); } }
@keyframes sf-hud-bn-slam { 0% { opacity: 0; transform: scale(2.3); filter: brightness(3); } 60% { opacity: 1; transform: scale(0.96); } 100% { transform: none; } }
@keyframes sf-hud-bn-face-l { from { opacity: 0; transform: translateX(-40u) scale(0.6); } to { opacity: 1; transform: none; } }
@keyframes sf-hud-bn-face-r { from { opacity: 0; transform: translateX(40u) scale(0.6); } to { opacity: 1; transform: none; } }
@keyframes sf-hud-bn-spark { 0%, 100% { opacity: 0.2; transform: scale(0.5) rotate(0deg); } 50% { opacity: 1; transform: scale(1.15) rotate(45deg); } }
@keyframes sf-hud-bn-flash { 0% { filter: brightness(3.5); } 100% { filter: none; } }

@media (orientation: portrait) {
  .sf-hud__banner-wrap { top: calc(var(--hud-t) + var(--hud-mini) + max(58px, 68u)); }
  .sf-hud__banner.is-t2 { padding-left: 58u; padding-right: 58u; }
  .sf-hud__banner.is-t3 { padding-left: 70u; padding-right: 70u; }
  .sf-hud__banner.is-t4 { padding-left: 78u; padding-right: 78u; --fs: min(max(24px, 34u), 6.6vw); }
  .sf-hud__banner.is-t4 .sf-hud__banner-title { letter-spacing: 0.14em; margin-right: -0.14em; }
  /* 副行长的横幅(史诗野怪刷新)：屏幕窄，两侧留白收到只让开左边的图标，副行小一号——奖励说明一行、提示一行，不再折成三行 */
  .sf-hud__banner.is-wide { min-width: 96vw; padding-left: calc(var(--face) + 16u); padding-right: 12u; }
  .sf-hud__banner.is-wide .sf-hud__banner-sub { font-size: max(11px, 11.5u); gap: 0 4u; letter-spacing: -0.01em; }
}
/* 横屏手机(屏高不足 480px)：横幅正下方紧挨着玩家英雄头顶的血条(英雄脚在屏高约 46% 处)。各档压矮一号并上提，别盖到自己头上 */
@media (orientation: landscape) and (max-height: 480px) {
  .sf-hud__banner-wrap { top: calc(var(--hud-t) + 46px); }
  .sf-hud__banner.is-t2 { --fs: 15px; --face: 30px; padding-top: 3px; padding-bottom: 4px; }
  .sf-hud__banner.is-t3 { --fs: 18px; --face: 34px; padding-top: 3px; padding-bottom: 4px; }
  .sf-hud__banner.is-t4 { --fs: 21px; --face: 38px; padding-top: 4px; padding-bottom: 5px; }
}
`),
  C$ = { 1: 1.6, 2: 2, 3: 2.4, 4: 3 },
  L$ = { 1: 1, 2: 1.25, 3: 1.6, 4: 2.1 },
  I$ = 4,
  H2 = 2.4,
  H4 = 3.4,
  P$ = 4.2;

function D$() {
  Zn("sf-hud-banner", R$);
  const n = z("div", "sf-hud__banner-wrap");
  n.setAttribute("aria-live", "polite");
  const t = [];
  let e = null;
  const s = [];
  let i = null,
    a = null,
    o = null;
  const r = new Map(),
    l = (p) => {
      (p.type === "announce" && r.set(p, { epic: i, epicPos: a, tower: o }), s.push(p));
    },
    c = new Set();
  function f(p) {
    for (t.push(p); t.length > I$;) {
      let g = 0;
      for (let y = 1; y < t.length; y++) t[y].tier < t[g].tier && (g = y);
      t.splice(g, 1);
    }
  }
  function d(p, g) {
    const v = z(
      "div",
      `sf-hud__banner is-t${p.tier} is-${p.tone}${p.left || p.right ? "" : " is-noface"}${p.wide ? " is-wide" : ""}`,
      z("i", "sf-hud__banner-rays"),
      z("i", "sf-hud__banner-spark"),
      z("i", "sf-hud__banner-spark"),
      z("i", "sf-hud__banner-spark"),
      z("i", "sf-hud__banner-spark"),
      p.left ? z("span", "sf-hud__banner-face is-l", p.left) : null,
      z(
        "div",
        "sf-hud__banner-text",
        z("div", "sf-hud__banner-title sf-metal", p.title),
        p.sub ? z("div", "sf-hud__banner-sub", ...p.sub) : null,
      ),
      p.right ? z("span", `sf-hud__banner-face is-r${p.slain ? " is-slain" : ""}`, p.right) : null,
    );
    (n.appendChild(v),
      (e = { el: v, tier: p.tier, shownAt: g, hideAt: g + Math.max(C$[p.tier], p.hold ?? 0), removeAt: 0 }));
  }
  const h = (p, g) =>
    p.isPlayer
      ? z("span", "is-me", "你")
      : z("span", Dl(p.team, g.team), `${p.team === g.team ? "我方" : "敌方"}${p.name}`);
  function u(p, g, y) {
    const v = y.hero(p.victimId);
    if (!v) return null;
    const _ = y.hero(p.killerId),
      k = v.isPlayer || !!_?.isPlayer || p.assistIds.indexOf(y.state.playerId) >= 0;
    if (!g && (!k || v.isPlayer)) return null;
    const M = Na(y.host, v, y.team, "is-dead");
    if (!_) {
      const C = y.unit(p.killerId)?.kind,
        R =
          C === "tower" || C === "core"
            ? "防御塔"
            : C === "monster"
              ? "野怪"
              : C === "minion"
                ? "小兵"
                : "战场",
        I = Vt(C === "tower" || C === "core" ? "tower" : C === "monster" ? "monster" : "cs"),
        P = v.team === 0 ? 1 : 0;
      return {
        tier: 2,
        tone: v.team === y.team ? "foe" : "ally",
        title: "助攻",
        sub: [h(v, y), `被${R}击杀`],
        left: Rl(I, Dl(P, y.team)),
        right: M,
        slain: !0,
      };
    }
    const S = _.team === y.team ? "ally" : "foe",
      b = g?.key ?? null;
    let w = b ? (E2[b] ?? "击杀") : _.isPlayer ? "击杀" : "助攻",
      T = b ? p4[b] : 2,
      E;
    return (
      b === "shutdown"
        ? (E = [h(_, y), "终结了", h(v, y), "的连杀"])
        : b === "killing_spree" || b === "unstoppable" || b === "legendary"
          ? (E = [h(_, y), `已连续击杀 ${p.streak} 人`])
          : (E = [h(_, y), "击杀了", h(v, y)]),
      b === "legendary" && p.streak > 7 && (w = `${w}·${p.streak}连杀`),
      _.isPlayer && T < 4 && b && (T = T + 1),
      _.isPlayer && p.bounty > 0 && E.push(z("span", "is-gold", _e(Vt("gold")), `+${Math.round(p.bounty)}`)),
      { tier: T, tone: S, title: w, sub: E, left: Na(y.host, _, y.team), right: M, slain: !0 }
    );
  }
  function m(p, g) {
    const y = p.team === g.team,
      v = p.team === 2 ? "neutral" : y ? "ally" : "foe",
      _ = p4[p.key],
      k = p.unitId !== void 0 ? g.hero(p.unitId) : void 0,
      M = { tier: _, tone: v, left: null, right: null, slain: !1 },
      S = r.get(p),
      b = S ? S.epic : i,
      w = S ? S.epicPos : a,
      T = S ? S.tower : o;
    switch (p.key) {
      case "match_start":
        return { ...M, title: "对战开始", sub: ["摧毁敌方水晶就赢"], hold: H2 };
      case "minions_spawn":
        return { ...M, title: "小兵出发", sub: ["跟着小兵去打架更安全"], hold: H2 };
      case "super_minions":
        return {
          ...M,
          title: y ? "我方超级兵出击" : "敌方超级兵出击",
          sub: [y ? "敌方高地塔已破，这一路的兵更强了" : "我方高地塔被破，注意回防"],
          hold: H2,
        };
      case "epic_spawn": {
        const E = b ? rn[b].name : "史诗野怪",
          A = [z("span", null, (b && rn[b].reward) || "打掉它，全队都有奖励")],
          C = !!b && !c.has(b);
        return (
          C && A.push(z("span", "is-dim", w ? `小地图${_3(w)} · 别一个人去` : "别一个人去")),
          b && c.add(b),
          { ...M, title: `${E}已刷新`, sub: A, left: Rl(Vt("monster")), hold: C ? P$ : H4, wide: !0 }
        );
      }
      case "epic_slain": {
        const E = b ? rn[b].name : "史诗野怪",
          A = b ? zB(b, y) : y ? "全队获得奖励" : "敌方获得奖励",
          C = y && k ? [h(k, g), "拿下", "·", A] : [A];
        return {
          ...M,
          title: y ? `我方击败${E}` : `敌方夺得${E}`,
          sub: C,
          left: k ? Na(g.host, k, g.team) : null,
          right: Rl(Vt("monster"), "is-dead"),
          slain: !0,
          hold: H4,
        };
      }
      case "tower_destroyed": {
        const E = T ? Pl(T.lane, T.tier) : "防御塔",
          A = y ? (k ? [h(k, g), "拆掉了这座塔"] : ["我方小兵拆掉了这座塔"]) : ["被敌方拆掉了，注意防守"];
        return {
          ...M,
          title: y ? `敌方${E}告破` : `我方${E}失守`,
          sub: A,
          left: k ? Na(g.host, k, g.team) : null,
          right: Rl(Vt("tower"), `${Dl(y ? (g.team === 0 ? 1 : 0) : g.team, g.team)} is-dead`),
          slain: !0,
        };
      }
      case "ace":
        return { ...M, title: "团灭", sub: [y ? "敌方全员阵亡，趁现在推塔！" : "我方全员阵亡，守住水晶！"] };
      case "victory":
      case "defeat":
        return { ...M, title: y ? "敌方水晶已摧毁" : "我方水晶被摧毁", sub: [y ? "我方获胜" : "敌方获胜"] };
      default: {
        const E = E2[p.key];
        if (!E) return null;
        const A = p.victimId !== void 0 ? g.hero(p.victimId) : void 0;
        return {
          ...M,
          title: E,
          sub: k && A ? [h(k, g), "击杀了", h(A, g)] : null,
          left: k ? Na(g.host, k, g.team) : null,
          right: A ? Na(g.host, A, g.team, "is-dead") : null,
          slain: !!A,
        };
      }
    }
  }
  function x(p) {
    if (s.length === 0) return;
    const g = new Set();
    for (let y = 0; y < s.length; y++) {
      const v = s[y];
      if (v.type === "heroKill") {
        let _ = null;
        for (let M = y + 1; M < s.length; M++) {
          const S = s[M];
          if (
            S.type === "announce" &&
            !g.has(S) &&
            S.key in E2 &&
            S.unitId === v.killerId &&
            S.victimId === v.victimId
          ) {
            _ = S;
            break;
          }
        }
        _ && g.add(_);
        const k = u(v, _, p);
        k && f(k);
      } else if (!g.has(v)) {
        const _ = m(v, p);
        _ && f(_);
      }
    }
    ((s.length = 0), r.clear());
  }
  return {
    el: n,
    handleEvent(p) {
      p.type === "heroKill" || p.type === "announce"
        ? l(p)
        : p.type === "monsterSpawn"
          ? rn[p.monsterType].epic && ((i = p.monsterType), (a = p.pos))
          : p.type === "epicSlain"
            ? (i = p.monsterType)
            : p.type === "towerDestroyed" && (o = p);
    },
    afterEvents(p) {
      x(p);
    },
    demo(p, g) {
      (l(p), x(g));
    },
    isShowing: () => e !== null || t.length > 0,
    update(p) {
      const g = p.now;
      (e &&
        (e.removeAt === 0
          ? (g >= e.hideAt || (t.length > 0 && g >= e.shownAt + L$[e.tier])) &&
            (e.el.classList.add("is-out"), (e.removeAt = g + 0.24))
          : g >= e.removeAt && (e.el.remove(), (e = null))),
        !e && t.length > 0 && d(t.shift(), g));
    },
    dispose() {
      ((t.length = 0), (s.length = 0), r.clear());
    },
  };
}

const z$ = Jn(`
.sf-hud {
  /* 不设 z-index：与宿主里别的界面(加载/结算)按 DOM 顺序叠放；isolation 让内部层级不外溢 */
  isolation: isolate; pointer-events: none; touch-action: none; overscroll-behavior: none;
  --hud-l: max(10u, var(--sf-safe-l)); --hud-r: max(10u, var(--sf-safe-r));
  --hud-t: max(8u, var(--sf-safe-t)); --hud-b: max(6u, var(--sf-safe-b));
  --hud-sk: clamp(46px, 14vmin, 92px);
  --hud-cw: calc(var(--hud-sk) * 3.72 + var(--hud-r));
  --hud-ch: calc(var(--hud-sk) * 3.6 + var(--hud-b));
  --hud-mini: 172u;
  --hud-plate: linear-gradient(180deg, rgba(20, 33, 72, 0.88), rgba(7, 12, 30, 0.92));
  --hud-shadow-text: 0 1px 2px rgba(2, 4, 12, 0.95), 0 0 6u rgba(2, 4, 12, 0.7);
}
.sf-hud--kbm { --hud-sk: clamp(44px, 60u, 132px); }
/* 可交互元素显式恢复点击；其余区域点穿到输入层/战场 */
.sf-hud button, .sf-hud [data-hud-hit], .sf-hud .sf-dialog-scrim { pointer-events: auto; }
.sf-hud [hidden] { display: none !important; }

/* 输入层：铺满全屏的透明面，接住战场上的鼠标/触摸（摇杆、点地移动、点选目标） */
.sf-hud__field { position: absolute; inset: 0; z-index: 1; pointer-events: auto; touch-action: none; cursor: default; }

/* 数值牌：右上 KDA/金币、商店按钮等共用的小底板 */
.sf-hud__chip {
  position: relative; display: inline-flex; align-items: center; gap: 6u; height: max(28px, 32u); padding: 0 11u; border-radius: 7u;
  background: var(--hud-plate); box-shadow: inset 0 0 0 1px rgba(232, 199, 122, 0.3), inset 0 1px 0 1px rgba(143, 233, 255, 0.1), 0 3u 10u rgba(2, 4, 12, 0.45);
  font-size: var(--sf-fs-sm); font-weight: 700; color: var(--sf-c-text); white-space: nowrap; line-height: 1;
}
.sf-hud__chip .sf-i { width: 1.15em; height: 1.15em; color: var(--sf-c-gold-300); vertical-align: 0; }

/* 键位角标（仅键鼠布局显示） */
.sf-hud__key {
  position: absolute; z-index: 3; display: none; place-items: center; min-width: max(17px, 19u); height: max(17px, 19u); padding: 0 4u; border-radius: 4u; pointer-events: none;
  font-family: var(--sf-font-num); font-weight: 800; font-size: max(10px, 11u); line-height: 1; color: var(--sf-c-gold-100); white-space: nowrap;
  background: linear-gradient(180deg, #2a3f7a, #111c3e); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22), inset 0 0 0 1px rgba(232, 199, 122, 0.55), 0 1px 3px rgba(0, 0, 0, 0.6);
}
.sf-hud--kbm .sf-hud__key { display: inline-grid; }

/* 圆头像：击杀播报、战况面板、阵亡面板共用 */
.sf-hud__face { --sz: 28u; display: block; flex: none; width: var(--sz); height: var(--sz); border-radius: 50%; box-shadow: 0 0 0 max(1.5px, 2u) var(--ring, rgba(232, 199, 122, 0.7)), 0 2u 6u rgba(0, 0, 0, 0.55); }
.sf-hud__face.is-blue { --ring: var(--sf-c-blue); }
.sf-hud__face.is-red { --ring: var(--sf-c-red); }
.sf-hud__face.is-me { --ring: var(--sf-c-me); }
.sf-hud__face.is-dead > img { filter: grayscale(1) brightness(0.6); }
.sf-hud__face--glyph { display: grid; place-items: center; background: radial-gradient(circle at 50% 30%, #2a3f7a, #0a1128); color: var(--ring, var(--sf-c-gold-200)); }
.sf-hud__face--glyph > .sf-i { width: 62%; height: 62%; }
`);

function N$() {
  Zn("sf-hud-base", z$);
}

const F$ = Jn(`
.sf-hud__garrow { position: absolute; left: 0; top: 0; z-index: 2; width: 0; height: 0; display: none; pointer-events: none; }
.sf-hud__garrow.is-on { display: block; }
/* 目标脚下的椭圆光圈(只在目标进了屏幕时显示) */
.sf-hud__garrow-ring { position: absolute; left: 0; top: 0; width: 0; height: 0; will-change: transform; }
.sf-hud__garrow-ring::before, .sf-hud__garrow-ring::after {
  content: ''; position: absolute; left: calc(var(--w) / -2); top: calc(var(--w) * -0.29); width: var(--w); height: calc(var(--w) * 0.58); border-radius: 50%;
  border: max(2px, 2.5u) solid #ffe7ad; box-shadow: 0 0 10u rgba(255, 214, 130, 0.8), inset 0 0 8u rgba(255, 214, 130, 0.5);
  animation: sf-hud-garrow-ring 1.4s ease-out infinite;
}
.sf-hud__garrow-ring { --w: max(72px, 104u); }
.sf-hud__garrow-ring::after { animation-delay: 0.7s; }
.sf-hud__garrow.is-edge .sf-hud__garrow-ring { display: none; }
/* 箭头本体：外层负责对位，中层负责朝向，内层沿朝向弹动 */
.sf-hud__garrow-mark { position: absolute; left: 0; top: 0; width: 0; height: 0; will-change: transform; }
.sf-hud__garrow-rot { position: absolute; left: 0; top: 0; width: 0; height: 0; }
/* 箭头要在亮的石板地、暗的草地上都看得清：饱和的金色实心 + 一圈深色描边(用两层同形裁切叠出来) + 外发光 */
.sf-hud__garrow-tip {
  --s: max(36px, 46u); position: absolute; left: calc(var(--s) * -1); top: calc(var(--s) / -2); width: var(--s); height: var(--s);
  filter: drop-shadow(0 2px 3px rgba(2, 4, 12, 0.7)) drop-shadow(0 0 8u rgba(255, 196, 64, 0.95));
  animation: sf-hud-garrow-bob 0.8s ease-in-out infinite;
}
.sf-hud__garrow-tip::before, .sf-hud__garrow-tip::after { content: ''; position: absolute; inset: 0; clip-path: polygon(0 30%, 44% 30%, 44% 4%, 100% 50%, 44% 96%, 44% 70%, 0 70%); }
.sf-hud__garrow-tip::before { background: #1c1204; }
.sf-hud__garrow-tip::after { inset: 9%; background: linear-gradient(90deg, #d8891a, #ffc93c 45%, #fff3b0); }
.sf-hud__garrow-label {
  position: absolute; left: 0; top: 0; transform: translate(-50%, -50%) translate(var(--lx, 0px), var(--ly, 0px)); display: flex; flex-direction: column; align-items: center; padding: 2u 9u; border-radius: 10u; white-space: nowrap;
  font-size: var(--sf-fs-xs); font-weight: 800; letter-spacing: 0.06em; line-height: 1.5; color: #2b1a04; background: linear-gradient(180deg, #fff4d6, #e0b160);
  box-shadow: 0 0 0 1px rgba(8, 13, 31, 0.85), 0 3u 8u rgba(2, 4, 12, 0.5);
}
/* 第二行：距离(只在贴边时有) */
.sf-hud__garrow-dist { font-family: var(--sf-font-num); font-weight: 800; line-height: 1.2; letter-spacing: 0.02em; opacity: 0.82; }
.sf-hud__garrow-dist:empty { display: none; }
@keyframes sf-hud-garrow-bob { 0%, 100% { transform: translateX(-28%); } 50% { transform: translateX(0); } }
@keyframes sf-hud-garrow-ring { 0% { transform: scale(0.55); opacity: 1; } 100% { transform: scale(1.15); opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .sf-hud__garrow-tip, .sf-hud__garrow-ring::before, .sf-hud__garrow-ring::after { animation: none; } }
`),
  jp = { left: 0.2, right: 0.2, top: 0.22, bottom: 0.32 },
  Ld = { x: 0.07, top: 0.14, bottom: 0.2, relax: 0.035 },
  U$ = 8.5,
  qp = { h: 14, h2: 20 },
  Xp = { halfW: 62, above: 46, height: 3.7 },
  $2 = 12,
  O$ = 0.45;

function B$(n, t) {
  Zn("sf-hud-garrow", F$);
  const e = z("i", "sf-hud__garrow-ring"),
    s = z("i", "sf-hud__garrow-tip"),
    i = z("i", "sf-hud__garrow-rot", s),
    a = z("span"),
    o = z("span", "sf-hud__garrow-dist"),
    r = z("span", "sf-hud__garrow-label", a, o),
    l = z("div", "sf-hud__garrow-mark", i, r),
    c = z("div", "sf-hud__garrow", e, l);
  c.setAttribute("aria-hidden", "true");
  const f = is(c, "is-on"),
    d = is(c, "is-edge"),
    h = vo(a),
    u = vo(o);
  let m = 12;
  const x = (R) => (R.length * m * 1.06) / 2 + 11;
  let p = null,
    g = !1,
    y = !1,
    v = { left: 0, top: 0, w: 0, h: 0 },
    _ = !0;
  const k = () => {
    _ = !0;
  };
  window.addEventListener("resize", k);
  let M = NaN,
    S = NaN,
    b = NaN;
  const w = { x: 0, y: 0 };
  let T = 0,
    E = $2,
    A = 1;
  function C(R) {
    if (!p) return;
    if (_ || v.w === 0) {
      const Q = n.root.getBoundingClientRect();
      if (
        ((v = { left: Q.left, top: Q.top, w: Q.width, h: Q.height }),
        (_ = !1),
        (m = parseFloat(getComputedStyle(r).fontSize) || 12),
        (E = $2),
        v.w === 0)
      )
        return;
    }
    if (++E >= $2) {
      E = 0;
      const Q = t?.();
      let $ = 0;
      if (Q) {
        const ut = Q.getBoundingClientRect().top;
        for (const N of Array.from(Q.children))
          N instanceof HTMLElement &&
            N.offsetHeight > 0 &&
            ($ = Math.max($, ut + N.offsetTop + N.offsetHeight));
      }
      T = $ > 0 ? $ - v.top : 0;
    }
    const { host: I } = R,
      P = v.w,
      F = v.h,
      L = Math.max(36, 46 * Math.min(3.2, Math.max(0.78, Math.min(P / 1280, F / 720)))),
      B = I.worldToScreen(p.pos, 0),
      G = B.x - v.left,
      q = B.y - v.top,
      et = g ? 0 : Ld.relax,
      ct =
        B.visible &&
        G >= P * (Ld.x - et) &&
        G <= P * (1 - Ld.x + et) &&
        q >= F * (Ld.top - et) &&
        q <= F * (1 - Ld.bottom + et);
    ((g = !ct), d(g));
    let rt, mt, nt, H, st;
    if (ct) {
      e.style.transform = `translate3d(${G.toFixed(1)}px, ${q.toFixed(1)}px, 0)`;
      const Q = I.worldToScreen(p.pos, U$);
      ((rt = Q.x - v.left),
        (mt = Math.max(F * 0.16, Q.y - v.top, Math.min(T + L + 8 + 2 * qp.h + 4, q - 4))),
        (nt = 90),
        (H = 0),
        (st = -(L + 8 + qp.h)),
        h(p.label),
        u(""));
    } else {
      const Q = R.me.pos;
      let $ = p.pos.x - Q.x,
        ut = p.pos.y - Q.y;
      const N = Math.hypot($, ut),
        J = N > 0.001 ? 1 / N : 0;
      (($ *= J), (ut *= J));
      const Z = I.worldToScreen(Q, 0);
      ((w.x = Q.x + $ * 4), (w.y = Q.y + ut * 4));
      const ot = I.worldToScreen(w, 0);
      let j = ot.x - Z.x,
        at = ot.y - Z.y;
      const Rt = Math.hypot(j, at);
      (Rt < 0.001 ? ((j = $), (at = ut)) : ((j /= Rt), (at /= Rt)), j === 0 && at === 0 && (at = -1));
      const kt = P * jp.left,
        V = P * (1 - jp.right),
        U = Math.min(F * O$, Math.max(F * jp.top, T + 8)),
        ht = F * (1 - jp.bottom),
        lt = (kt + V) / 2,
        O = (U + ht) / 2,
        Y = j !== 0 ? (j > 0 ? V - lt : kt - lt) / j : 1 / 0,
        gt = at !== 0 ? (at > 0 ? ht - O : U - O) / at : 1 / 0,
        ft = Math.min(Y, gt);
      ((rt = lt + j * ft), (mt = O + at * ft));
      const _t = x(p.label),
        Dt = L + 8 + Math.abs(j) * _t + Math.abs(at) * qp.h2;
      if (((H = -j * Dt), (st = -at * Dt), gt <= Y && at < 0)) {
        const zt = I.worldToScreen(Q, Xp.height),
          Ot = zt.x - v.left,
          Jt = zt.y - v.top - Xp.above,
          ue = mt + st + qp.h2,
          Kt = Xp.halfW + L * 0.5 + 6,
          Ie = Xp.halfW + _t + 6;
        Jt < ue + 4 &&
          (Math.abs(rt - Ot) < Kt || Math.abs(rt + H - Ot) < Ie) &&
          (j > 0.1 ? (A = 1) : j < -0.1 && (A = -1),
          (rt = Ot + A * Math.max(Kt, Ie - A * H)),
          (rt = Math.min(P - _t - 8 - H, Math.max(_t + 8 - H, rt))));
      }
      ((nt = (Math.atan2(at, j) * 180) / Math.PI), h(p.label), u(`${Math.max(1, Math.round(N))} 米`));
    }
    l.style.transform = `translate3d(${rt.toFixed(1)}px, ${mt.toFixed(1)}px, 0)`;
    const tt = Math.round(nt);
    tt !== M && ((M = tt), (i.style.transform = `rotate(${tt}deg)`));
    const it = Math.round(H),
      D = Math.round(st);
    (it !== S || D !== b) &&
      ((S = it), (b = D), r.style.setProperty("--lx", `${it}px`), r.style.setProperty("--ly", `${D}px`));
  }
  return {
    el: c,
    set(R) {
      ((p = R), R || ((y = !1), f(!1)));
    },
    mode: () => (y ? (g ? "edge" : "screen") : null),
    update(R) {
      const I = !!p && R.me.alive && !R.state.over;
      (I && C(R), (y = I && v.w > 0), f(y));
    },
    dispose() {
      (window.removeEventListener("resize", k), (p = null));
    },
  };
}

function H$() {
  return {
    epicSince: new Map(),
    epicTold: new Set(),
    epicHelpAt: new Map(),
    epicSoonOff: new Set(),
    lastId: null,
    lastKey: "",
    pushLane: null,
    farmSeenAt: -1 / 0,
    groupLane: null,
    groupAt: -1 / 0,
    groupCand: null,
    groupCandSince: 0,
  };
}

const G2 = 270,
  $$ = 570,
  wk = {
    retreatHp: [0.3, 0.36],
    defendRecent: 3,
    defendRadius: 10,
    pushNowDist: [20, 24],
    aggroPad: [1, 2.5],
    epicFresh: 8,
    epicMates: [14, 20],
    epicHurt: 0.97,
    epicHelpLinger: 6,
    epicNear: [18, 22],
    epicSoon: 15,
    groupDist: [25, 20],
    groupSwitch: 3,
    groupForget: 12,
    backDist: [16, 12],
    farmDist: [14, 17],
    farmUntil: 150,
    farmLinger: 8,
    fountainHp: 0.85,
  },
  Wi = (n, t) => {
    const e = n.x - t.x,
      s = n.y - t.y;
    return e * e + s * s;
  },
  Id = (n, t) => Math.sqrt(Wi(n, t));

function Pd(n, t) {
  for (const e of n.buffs) if (e.id === t) return !0;
  return !1;
}

function qd(n, t) {
  let e = 1 / 0;
  for (let s = 0; s + 1 < t.length; s++) {
    const i = t[s],
      a = t[s + 1],
      o = a.x - i.x,
      r = a.y - i.y,
      l = o * o + r * r;
    let c = l > 0 ? ((n.x - i.x) * o + (n.y - i.y) * r) / l : 0;
    c = c < 0 ? 0 : c > 1 ? 1 : c;
    const f = i.x + o * c - n.x,
      d = i.y + r * c - n.y,
      h = f * f + d * d;
    h < e && (e = h);
  }
  return Math.sqrt(e);
}

const Xd = ["top", "mid", "bot"];

function G$(n, t) {
  let e = "mid",
    s = 1 / 0;
  for (const i of Xd) {
    const a = qd(t, n.map.lanes[i]);
    a < s && ((s = a), (e = i));
  }
  return e;
}

function $4(n) {
  const t = rn[n.monsterType];
  return t.alias || t.epic ? t.name : "小野怪";
}

const V$ = { foeTowers: [], myTowers: [], foeCore: null, myCore: null, myMinions: [], foeMinions: [] };

function W$(n, t) {
  const e = V$;
  ((e.foeTowers.length = 0),
    (e.myTowers.length = 0),
    (e.myMinions.length = 0),
    (e.foeMinions.length = 0),
    (e.foeCore = null),
    (e.myCore = null));
  const s = t.team;
  for (const i of n.units)
    i.alive &&
      (i.kind === "tower"
        ? (i.team === s ? e.myTowers : e.foeTowers).push(i)
        : i.kind === "core"
          ? i.team === s
            ? (e.myCore = i)
            : (e.foeCore = i)
          : i.kind === "minion" &&
            (i.team === s ? e.myMinions.push(i) : i.visible[s] && e.foeMinions.push(i)));
  return e;
}

function Q1(n, t, e = 0) {
  const s = n.stats.attackRange + e,
    i = s * s;
  for (const a of t) if (Wi(a.pos, n.pos) <= i) return !0;
  return !1;
}

const G4 = (n) => `push_lane:${n.lane}:${n.tier}`;

function j$(n, t, e) {
  const s = t.stats.attackRange + n.radius + e;
  return Wi(t.pos, n.pos) <= s * s;
}

function q$(n, t, e, s, i) {
  let a = !1;
  for (const r of n.units)
    r.kind !== "monster" ||
      r.campId !== e.id ||
      !r.alive ||
      !r.visible[t.team] ||
      (r.hp < r.stats.maxHp * i && (a = !0));
  if (!a) return !1;
  const o = s * s;
  for (const r of n.heroes)
    if (r.team === t.team && r.id !== t.id && r.alive && Wi(r.pos, e.pos) <= o) return !0;
  return !1;
}

function Rc(n, t) {
  let e = null;
  for (const s of n.foeTowers) s.lane === t && (!e || s.tier < e.tier) && (e = s);
  return e;
}

function Mk(n, t) {
  let e = null,
    s = 1 / 0;
  for (const i of n.map.camps) {
    if (i.side !== t.team || (i.monsterType !== "frost_golem" && i.monsterType !== "ember_golem")) continue;
    const a = Wi(i.pos, t.pos);
    a < s && ((s = a), (e = i));
  }
  return e;
}

function L3(n, t, e, s = 1) {
  for (const i of n.map.towers) if (i.team === t && i.lane === e && i.tier === s) return i.pos;
  return null;
}

const Yp = (n, t) => {
  const e = n.camps[t];
  return e && e.campId === t ? e : n.camps.find((s) => s.campId === t);
};
export { p$, E$, A$, D$, N$, B$, H$, G2, $$, wk, Wi, Id, Pd, qd, Xd, G$, $4, W$, Q1, G4, j$, q$, Rc, Mk, L3, Yp };
