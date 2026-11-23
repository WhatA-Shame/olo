// 32-ui.js — ui｜57 个顶层语句｜66KB
// 对应 game.pretty.js 第 63708–65486 行
// 关键内容：
//   gB                    high-performance
//   l4                    canvas
//   N8                    canvas
//   F8                    function
//   Jn                    ${e}calc(var(--sf-u) * ${s})
//   bB                    color-mix(
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { Se, kr } from './02-data.js';
import { P1 } from './04-audio-2.js';
import { Ut } from './06-three-2.js';
import { Sn } from './07-three-3.js';
import { Yt, cx } from './14-three-7.js';
import { Qc, sh, ux } from './15-render-4.js';
import { II, PI } from './16-render-5.js';
import { Nz, cz } from './21-core-4.js';
import { mU } from './25-render-9.js';
import { Ac, D8, I8, P8, Vx, a4, cB, fB, hB, lB, mB, of, pB, qc, uB, v3 } from './31-render-10.js';

function gB(n, t) {
  let e;
  try {
    e = new cx({
      canvas: n,
      antialias: !0,
      alpha: !0,
      premultipliedAlpha: !0,
      powerPreference: "high-performance",
    });
  } catch {
    return mB(n, t);
  }
  (P8(e), (e.shadowMap.enabled = !0), (e.shadowMap.type = P1));
  const s = I8(!0),
    i = Qc({ vertexColors: !0, steps: 2, rim: 0.2, specular: 0.7, gloss: 40, fog: !1 });
  let a = null,
    o,
    r,
    l = null;
  const c = sh();
  c.team.set(Yt.blue.main);
  let f = t,
    d = "idle",
    h = 0,
    u = 0,
    m = 0,
    x = 0,
    p = 0.3,
    g = !1,
    y = 0,
    v = performance.now();
  const _ = (b) => {
      ((f = b),
        (o = qc(Vx(b))),
        (r = new of(o, 0.37)),
        l && (l.removeFrom(s.scene), l.dispose()),
        (l = new ux(o.geometry, o.rig.count, 1, { outline: 1.6 }, `preview:${b}`)),
        l.addTo(s.scene));
      const w = new Ut(Se[b].palette.glow);
      (s.rim.color.copy(w).lerp(new Ut(1, 1, 1), 0.35),
        a && (s.scene.remove(a), a.geometry.dispose()),
        (a = new Sn(pB(w, b === "panyue" ? 1.5 : 1.12), i)),
        (a.receiveShadow = !0),
        s.scene.add(a),
        (d = "idle"),
        (h = 0),
        r.snap(),
        k());
    },
    k = () => {
      const b = e.domElement.width / Math.max(1, e.domElement.height),
        w = uB(f, o),
        T = s.camera,
        E = Math.tan((T.fov * Math.PI) / 360),
        A = E * b,
        C = (w.minX + w.maxX) / 2,
        R = (w.maxX - w.minX) / 2,
        I = -0.36,
        F = w.maxY - I,
        L = Math.max(0, w.maxZ),
        B = Math.max(1, n.clientHeight || e.domElement.height / e.getPixelRatio()),
        G = Math.min(0.24, Math.max(Ac.top, hB / B + 0.015)),
        q = R / (A * (1 - 2 * Ac.side)) + L * 0.6,
        et = F / (2 * E * (1 - G - Ac.bottom)) + L * 0.5,
        ct = Math.max(a4.halfW / (A * (1 - 2 * Ac.side)), (a4.top - I) / (2 * E * (1 - G - Ac.bottom))),
        rt = Math.max(q, et, ct),
        mt = I + E * rt * (1 - 2 * Ac.bottom);
      ((T.aspect = b), T.position.set(C, mt + rt * 0.12, rt), T.lookAt(C, mt, 0), T.updateProjectionMatrix());
    },
    M = () => {
      if (g) return;
      const b = Math.max(1, n.clientWidth || n.width),
        w = Math.max(1, n.clientHeight || n.height),
        T = Math.min(2, window.devicePixelRatio || 1);
      (e.setPixelRatio(T), e.setSize(b, w, !1), k());
    },
    S = (b) => {
      if (g) return;
      y = requestAnimationFrame(S);
      const w = Math.min(0.1, Math.max(0, (b - v) / 1e3));
      if (((v = b), !n.isConnected || document.hidden || !l)) return;
      ((x += w), (p = v3[f][0] + Math.sin(x * 0.5) * v3[f][1]));
      const T = r.input;
      (d !== "idle" && ((h += w), h >= u && ((d = "idle"), (h = 0))),
        (T.anim = d),
        (T.time = x),
        (T.t = d === "idle" ? x : h),
        (T.p = d === "idle" ? 0 : Math.min(1, h / u)),
        (T.variant = m),
        (T.windup = 0.35),
        (T.stride = 0),
        (T.speed = 0));
      const E = d === "leap" ? 4 * 1.5 * T.p * (1 - T.p) : 0;
      (r.update(m * 10 + (d === "idle" ? 0 : 1), w, 0, E, 0, p, 1),
        (c.glow = r.output.glow),
        l.begin(),
        l.push(r.skeleton, c),
        l.end(),
        e.render(s.scene, s.camera));
    };
  return (
    _(t),
    M(),
    (y = requestAnimationFrame(S)),
    {
      setHero(b) {
        g || b === f || _(b);
      },
      play(b) {
        if (g) return;
        const w = cB[f][b] ?? [b, 0.9];
        ((d = w[0]), (u = w[1]), (h = 0), b === "attack" && m++);
      },
      resize: M,
      dispose() {
        g ||
          ((g = !0),
          cancelAnimationFrame(y),
          l?.dispose(),
          a?.geometry.dispose(),
          i.dispose(),
          s.key.shadow.map?.dispose(),
          e.dispose(),
          e.forceContextLoss());
      },
    }
  );
}

const jd = 192,
  j1 = new Map();

function l4(n, t) {
  const e = Se[n],
    s = document.createElement("canvas");
  s.width = s.height = jd;
  const i = s.getContext("2d");
  if (!i) return "";
  if (!t) return (D8(i, jd, jd, n, !0), s.toDataURL("image/png"));
  const a = jd,
    o = new Ut(e.palette.primary).lerp(new Ut(659494), 0.72),
    r = new Ut(e.palette.primary).lerp(new Ut(1055292), 0.35),
    l = i.createLinearGradient(0, 0, 0, a);
  (l.addColorStop(0, `#${r.getHexString()}`),
    l.addColorStop(1, `#${o.getHexString()}`),
    (i.fillStyle = l),
    i.fillRect(0, 0, a, a));
  const c = new Ut(e.palette.glow),
    f = i.createRadialGradient(a * 0.5, a * 0.42, a * 0.05, a * 0.5, a * 0.46, a * 0.62);
  (f.addColorStop(0, `rgba(${Math.round(c.r * 255)},${Math.round(c.g * 255)},${Math.round(c.b * 255)},0.55)`),
    f.addColorStop(1, "rgba(0,0,0,0)"),
    (i.fillStyle = f),
    i.fillRect(0, 0, a, a),
    (i.strokeStyle = "rgba(255,255,255,0.08)"),
    (i.lineWidth = 1));
  for (let h = 0; h < 5; h++)
    (i.beginPath(), i.moveTo(-20 + h * 52, a), i.lineTo(60 + h * 52, 0), i.stroke());
  ((i.imageSmoothingQuality = "high"), i.drawImage(t, 0, 0, a, a));
  const d = i.createLinearGradient(0, a * 0.7, 0, a);
  return (
    d.addColorStop(0, "rgba(6,10,26,0)"),
    d.addColorStop(1, "rgba(6,10,26,0.5)"),
    (i.fillStyle = d),
    i.fillRect(0, 0, a, a),
    s.toDataURL("image/png")
  );
}

let dh = null,
  c4 = !1,
  k2 = !1;

function z8() {
  const n = dh;
  ((dh = null), n && (n.renderer.dispose(), n.renderer.forceContextLoss()));
}

function N8(n) {
  let t = "";
  if (!c4)
    try {
      if (!dh) {
        const r = Math.round(jd * 1.5),
          l = document.createElement("canvas");
        l.width = l.height = r;
        const c = new cx({
          canvas: l,
          antialias: !0,
          alpha: !0,
          premultipliedAlpha: !0,
          preserveDrawingBuffer: !0,
        });
        (P8(c), c.setPixelRatio(1), c.setSize(r, r, !1), (dh = { renderer: c, stage: I8(!1) }));
      }
      const { renderer: e, stage: s } = dh,
        i = qc(Vx(n)),
        a = new of(i, 0.37),
        o = new ux(i.geometry, i.rig.count, 1, { outline: 1.7 }, `portrait:${n}`);
      (o.setShadows(!1), o.addTo(s.scene));
      try {
        const r = new Ut(Se[n].palette.glow);
        s.rim.color.copy(r).lerp(new Ut(1, 1, 1), 0.3);
        const l = fB[n],
          c = a.input;
        ((c.anim = l.anim ?? "idle"),
          (c.time = 1.3),
          (c.p = l.p ?? 0),
          (c.t = c.anim === "idle" || c.anim === "channel" ? 1.3 : c.p * 0.8),
          (c.windup = 0.35),
          (c.variant = l.variant ?? 0),
          a.update(0, 0, 0, 0, 0, (l.yaw * Math.PI) / 180, 1),
          a.settle());
        const f = sh();
        (f.team.set(Yt.blue.main), (f.glow = a.output.glow), o.begin(), o.push(a.skeleton, f), o.end());
        const d = { x: 0, y: 0, z: 0 };
        a.attach("head", d) || (d.y = i.height * i.scale * 0.86);
        const h = s.camera,
          u = d.y - l.drop;
        ((h.aspect = 1),
          (h.fov = 24),
          h.position.set(d.x + l.x, u + 0.1, d.z + l.dist),
          h.lookAt(d.x + l.x, u, d.z),
          h.updateProjectionMatrix(),
          e.clear(),
          e.render(s.scene, h),
          (t = l4(n, e.domElement)));
      } finally {
        (o.removeFrom(s.scene), o.dispose());
      }
    } catch {
      ((c4 = !0), z8());
    }
  return (t || (t = l4(n, null)), j1.set(n, t), t);
}

function F8() {
  if (k2) return;
  if (kr.find((e) => !j1.has(e)) === void 0) {
    z8();
    return;
  }
  k2 = !0;
  const t = () => {
    k2 = !1;
    const e = kr.find((s) => !j1.has(s));
    (e !== void 0 && N8(e), F8());
  };
  typeof window.requestIdleCallback == "function"
    ? window.requestIdleCallback(t, { timeout: 400 })
    : window.setTimeout(t, 60);
}

function xB(n) {
  const t = j1.get(n);
  if (t !== void 0) return t;
  const e = N8(n);
  return (F8(), e);
}

const U8 = [mU, lB, cz, Nz];

function yB(n, t, e) {
  return II(n, t, e, U8);
}

async function vB(n, t, e, s) {
  return await PI(n, t, e, U8, s);
}

const O8 = new Map();

function B8() {
  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null;
  }
}

function H8(n) {
  const t = O8.get(n);
  if (t !== void 0) return t;
  try {
    return B8()?.getItem(n) ?? null;
  } catch {
    return null;
  }
}

function Wx(n, t) {
  O8.set(n, t);
  try {
    B8()?.setItem(n, t);
  } catch {}
}

function $8(n) {
  const t = H8(n);
  if (t === null || t === "") return null;
  try {
    return JSON.parse(t);
  } catch {
    return null;
  }
}

function Jn(n) {
  return _B(n).replace(
    /(^|[\s(,:])(-?(?:\d+\.?\d*|\.\d+))u(?![\w%])/g,
    (t, e, s) => `${e}calc(var(--sf-u) * ${s})`,
  );
}

function bB(n) {
  let t = "",
    e = 0;
  for (;;) {
    const s = n.indexOf("color-mix(", e);
    if (s < 0) return t + n.slice(e);
    t += n.slice(e, s);
    let i = 0,
      a = s + 9;
    const o = [];
    for (; a < n.length; a++) {
      const l = n[a];
      if (l === "(") i++;
      else if (l === ")") {
        if ((i--, i === 0)) break;
      } else l === "," && i === 1 && o.push(a);
    }
    const r =
      o.length >= 2
        ? n
            .slice(o[0] + 1, o[1])
            .trim()
            .replace(/\s+[\d.]+%$/, "")
        : "currentColor";
    ((t += r), (e = a + 1));
  }
}

function _B(n) {
  return n.replace(
    /([;{]\s*)([\w-]+)(\s*:\s*)([^;{}]*color-mix\([^;{}]*)/g,
    (t, e, s, i, a) => `${e}${s}${i}${bB(a)}; ${s}${i}${a}`,
  );
}

const G8 = (n) => `calc(var(--sf-u) * ${n})`;

function Zn(n, t) {
  if (typeof document > "u" || document.getElementById(n)) return;
  const e = document.createElement("style");
  ((e.id = n), (e.textContent = t), document.head.appendChild(e));
}

function jx(n) {
  return `url("data:image/svg+xml,${encodeURIComponent(n).replace(/'/g, "%27").replace(/"/g, "%22")}")`;
}

const S2 = (n) =>
    jx(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8 0Q8.8 7.2 16 8Q8.8 8.8 8 16Q7.2 8.8 0 8Q7.2 7.2 8 0Z" fill="${n}"/></svg>`,
    ),
  wB = Jn(`
/* ───────────── 根容器 ───────────── */
.sf-root {
  position: absolute; inset: 0; overflow: hidden;
  font-family: var(--sf-font); font-size: var(--sf-fs-md); line-height: 1.5; color: var(--sf-c-text);
  -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%; text-size-adjust: 100%;
  -webkit-user-select: none; user-select: none; -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
}
.sf-root *, .sf-root *::before, .sf-root *::after { box-sizing: border-box; }
.sf-root button, .sf-root input { font-family: inherit; }
.sf-root button { -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
.sf-root :focus { outline: none; }
.sf-root :focus-visible { outline: 2px solid var(--sf-c-cyan-300); outline-offset: 2px; }
.sf-root img { -webkit-user-drag: none; }

.sf-num { font-family: var(--sf-font-num); font-variant-numeric: tabular-nums; letter-spacing: 0.02em; }
.sf-dim { color: var(--sf-c-text-3); }
.sf-gold { color: var(--sf-c-gold-200); }
.sf-cyan { color: var(--sf-c-cyan-300); }
.sf-hidden { display: none !important; }

/* 内联 SVG 图标 */
.sf-ico { display: block; width: 100%; height: 100%; }
.sf-i { display: inline-block; width: 1.25em; height: 1.25em; flex: none; vertical-align: -0.24em; }
.sf-i > svg { display: block; width: 100%; height: 100%; }

/* ───────────── 滚动区 ───────────── */
.sf-scroll {
  overflow: hidden auto; overscroll-behavior: contain; -webkit-overflow-scrolling: touch; touch-action: pan-y;
  scrollbar-width: thin; scrollbar-color: rgba(224, 177, 96, 0.45) transparent;
}
.sf-scroll::-webkit-scrollbar { width: max(4px, 5u); height: max(4px, 5u); }
.sf-scroll::-webkit-scrollbar-thumb { background: rgba(224, 177, 96, 0.45); border-radius: 99px; }
.sf-scroll::-webkit-scrollbar-track { background: transparent; }

/* ───────────── 面板 ───────────── */
.sf-panel {
  position: relative; border-radius: var(--sf-r-md);
  background: var(--sf-bg-panel);
  box-shadow: var(--sf-shadow-2), inset 0 1px 0 rgba(143, 233, 255, 0.14);
}
/* 金色星轨描边：左上、右下两角最亮，沿边缘渐隐 */
.sf-panel::before {
  content: ''; position: absolute; inset: 0; border-radius: inherit; padding: 1px; pointer-events: none;
  background: conic-gradient(from 315deg at 50% 50%,
    rgba(255, 231, 173, 0.95) 0deg, rgba(224, 177, 96, 0.34) 38deg, rgba(160, 180, 230, 0.16) 110deg,
    rgba(224, 177, 96, 0.3) 150deg, rgba(255, 231, 173, 0.8) 180deg, rgba(224, 177, 96, 0.3) 212deg,
    rgba(160, 180, 230, 0.16) 250deg, rgba(224, 177, 96, 0.34) 322deg, rgba(255, 231, 173, 0.95) 360deg);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
}
/* 角上的四芒星 + 顶边一道青色高光 */
.sf-panel::after {
  content: ''; position: absolute; inset: -7u; pointer-events: none;
  background-repeat: no-repeat;
  background-position: left 1u top 1u, right 3u bottom 3u, center top calc(7u + 1px);
  background-size: 15u 15u, 10u 10u, 56% 1px;
}
.sf-panel--plain::after { display: none; }
.sf-panel--flat { box-shadow: inset 0 1px 0 rgba(143, 233, 255, 0.1); }
/* 内嵌小面板：更暗、无装饰，用于面板里的分组 */
.sf-inset {
  border-radius: var(--sf-r-sm); background: var(--sf-bg-inset);
  box-shadow: inset 0 0 0 1px var(--sf-c-line);
}

/* ───────────── 标题字 ───────────── */
.sf-metal {
  background: var(--sf-grad-gold-text); -webkit-background-clip: text; background-clip: text;
  color: transparent; -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 1u 0 rgba(70, 40, 8, 0.9)) drop-shadow(0 3u 8u rgba(0, 0, 0, 0.55));
}
.sf-metal--steel { background-image: var(--sf-grad-steel-text); filter: drop-shadow(0 1u 0 rgba(10, 16, 40, 0.9)) drop-shadow(0 3u 8u rgba(0, 0, 0, 0.55)); }
.sf-title { margin: 0; font-weight: 800; font-size: var(--sf-fs-2xl); line-height: 1.15; letter-spacing: 0.16em; }
.sf-subtitle { margin: 0; font-weight: 700; font-size: var(--sf-fs-xl); line-height: 1.2; letter-spacing: 0.1em; }

/* 分节小标题：菱形 + 渐隐星轨线 */
.sf-heading {
  display: flex; align-items: center; gap: 8u; margin: 0;
  font-weight: 700; font-size: var(--sf-fs-sm); line-height: 1.2; letter-spacing: 0.2em; color: var(--sf-c-gold-300);
}
.sf-heading::before {
  content: ''; flex: none; width: max(5px, 6u); height: max(5px, 6u); transform: rotate(45deg);
  background: var(--sf-grad-gold); box-shadow: 0 0 6u rgba(255, 214, 130, 0.7);
}
.sf-heading::after { content: ''; flex: 1; height: 1px; background: linear-gradient(90deg, var(--sf-c-gold-line), rgba(232, 199, 122, 0)); }

.sf-divider { height: 1px; border: 0; margin: 0; background: linear-gradient(90deg, rgba(150, 178, 235, 0), var(--sf-c-line-strong) 20%, var(--sf-c-line-strong) 80%, rgba(150, 178, 235, 0)); }

/* ───────────── 按钮 ───────────── */
.sf-btn {
  --sf-btn-h: max(40px, 46u); --sf-btn-cut: var(--sf-cut);
  --sf-btn-edge: linear-gradient(180deg, rgba(255, 231, 173, 0.95), rgba(192, 140, 60, 0.5));
  --sf-btn-fill: linear-gradient(180deg, #20356c, #0d1836 70%, #0a1128);
  position: relative; isolation: isolate; display: inline-flex; align-items: center; justify-content: center; gap: 8u;
  min-height: var(--sf-btn-h); min-width: var(--sf-btn-h); padding: 0 24u; margin: 0; border: 0; background: none;
  color: var(--sf-c-gold-200); font-weight: 700; font-size: var(--sf-fs-lg); line-height: 1; letter-spacing: 0.14em;
  white-space: nowrap; cursor: pointer;
  transition: transform var(--sf-t-fast) var(--sf-ease-out), filter var(--sf-t-fast) linear;
}
.sf-btn::before, .sf-btn::after {
  content: ''; position: absolute; z-index: -1; pointer-events: none;
  clip-path: polygon(var(--sf-btn-cut) 0, 100% 0, 100% calc(100% - var(--sf-btn-cut)), calc(100% - var(--sf-btn-cut)) 100%, 0 100%, 0 var(--sf-btn-cut));
}
.sf-btn::before { inset: 0; background: var(--sf-btn-edge); }
.sf-btn::after {
  inset: 1px;
  background:
    linear-gradient(105deg, rgba(255, 255, 255, 0) 42%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 58%) no-repeat 160% 0 / 250% 100%,
    linear-gradient(180deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0) 46%),
    var(--sf-btn-fill);
  transition: background-position 0s;
}
.sf-btn > * { position: relative; }
.sf-btn .sf-i { width: 1.2em; height: 1.2em; margin-left: -0.1em; }
@media (hover: hover) {
  .sf-btn:hover { filter: brightness(1.14) drop-shadow(0 0 8u rgba(255, 214, 130, 0.35)); }
  .sf-btn:hover::after { background-position: -60% 0, 0 0, 0 0; transition: background-position 0.55s var(--sf-ease-out); }
}
.sf-btn:active { transform: translateY(1.5u) scale(0.985); filter: brightness(0.88); }
.sf-btn:disabled, .sf-btn.is-disabled { filter: grayscale(0.9) brightness(0.72); opacity: 0.6; pointer-events: none; cursor: default; }

.sf-btn--primary {
  --sf-btn-edge: linear-gradient(180deg, #fffbe9, #7a5220);
  --sf-btn-fill: var(--sf-grad-gold);
  color: #2b1a04; text-shadow: 0 1px 0 rgba(255, 255, 255, 0.4);
}
@media (hover: hover) { .sf-btn--primary:hover { filter: brightness(1.08) drop-shadow(0 0 12u rgba(255, 214, 130, 0.6)); } }
.sf-btn--ghost {
  --sf-btn-edge: linear-gradient(180deg, rgba(150, 178, 235, 0.5), rgba(150, 178, 235, 0.22));
  --sf-btn-fill: linear-gradient(180deg, rgba(22, 36, 76, 0.92), rgba(10, 17, 40, 0.92));
  color: var(--sf-c-text-2);
}
.sf-btn--danger {
  --sf-btn-edge: linear-gradient(180deg, #ffc3b5, #6e1820);
  --sf-btn-fill: linear-gradient(180deg, #f27262, #c23b40 55%, #8f2331);
  color: #fff5f0; text-shadow: 0 1px 0 rgba(80, 10, 16, 0.6);
}
.sf-btn--sm { --sf-btn-h: max(36px, 36u); --sf-btn-cut: 6u; padding: 0 14u; font-size: var(--sf-fs-sm); letter-spacing: 0.08em; }
.sf-btn--lg { --sf-btn-h: max(48px, 60u); --sf-btn-cut: 13u; padding: 0 40u; font-size: max(17px, 23u); font-weight: 800; letter-spacing: 0.28em; }
.sf-btn--block { display: flex; width: 100%; }
/* 主按钮呼吸光：用于每屏唯一的主行动。只动 opacity（合成层动画），不逐帧重算滤镜 */
.sf-btn__glow {
  position: absolute; inset: -12u -16u; z-index: -2; pointer-events: none; border-radius: 50%;
  background: radial-gradient(closest-side, rgba(255, 214, 130, 0.75), rgba(255, 214, 130, 0.28) 55%, rgba(255, 214, 130, 0));
  animation: sf-btn-pulse 2.4s ease-in-out infinite;
}
@keyframes sf-btn-pulse { 0%, 100% { opacity: 0.25; } 50% { opacity: 1; } }

/* 图标按钮 */
.sf-iconbtn {
  position: relative; display: inline-grid; place-items: center; flex: none;
  width: var(--sf-hit); height: var(--sf-hit); padding: 0; margin: 0; cursor: pointer;
  border: 0; border-radius: 9u; color: var(--sf-c-gold-200);
  background: linear-gradient(180deg, rgba(32, 53, 108, 0.9), rgba(10, 17, 40, 0.92));
  box-shadow: inset 0 0 0 1px var(--sf-c-gold-line), inset 0 1px 0 1px rgba(143, 233, 255, 0.12), var(--sf-shadow-1);
  transition: transform var(--sf-t-fast) var(--sf-ease-out), filter var(--sf-t-fast) linear, color var(--sf-t-fast) linear;
}
.sf-iconbtn > .sf-i { width: 52%; height: 52%; }
@media (hover: hover) { .sf-iconbtn:hover { filter: brightness(1.25); color: var(--sf-c-gold-100); } }
.sf-iconbtn:active { transform: scale(0.94); filter: brightness(0.88); }
.sf-iconbtn:disabled { opacity: 0.45; pointer-events: none; }
.sf-iconbtn--quiet { background: none; box-shadow: none; color: var(--sf-c-text-2); }

/* 文字链接式按钮 */
.sf-link {
  display: inline-flex; align-items: center; gap: 6u; min-height: max(32px, 32u); padding: 0 6u; margin: 0; border: 0; background: none; cursor: pointer;
  color: var(--sf-c-text-3); font-size: var(--sf-fs-sm); letter-spacing: 0.06em;
  transition: color var(--sf-t-fast) linear;
}
@media (hover: hover) { .sf-link:hover { color: var(--sf-c-cyan-300); } }
.sf-link:active { color: var(--sf-c-cyan-200); }

/* ───────────── 分段选择 ───────────── */
.sf-seg {
  display: inline-grid; grid-auto-flow: column; grid-auto-columns: 1fr; gap: 3u; padding: 3u;
  border-radius: 8u; background: var(--sf-bg-inset); box-shadow: inset 0 0 0 1px var(--sf-c-line-strong);
}
.sf-seg--block { display: grid; width: 100%; }
.sf-seg__opt {
  position: relative; min-height: max(34px, 36u); padding: 0 16u; margin: 0; border: 0; border-radius: 6u; cursor: pointer;
  background: transparent; color: var(--sf-c-text-3); font-weight: 700; font-size: var(--sf-fs-md); letter-spacing: 0.1em; white-space: nowrap;
  transition: color var(--sf-t-fast) linear, background var(--sf-t-fast) linear;
}
@media (hover: hover) { .sf-seg__opt:hover { color: var(--sf-c-text); background: var(--sf-bg-raise); } }
.sf-seg__opt.is-active {
  color: #2b1a04; background: var(--sf-grad-gold); text-shadow: 0 1px 0 rgba(255, 255, 255, 0.35);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.65), inset 0 0 0 1px rgba(122, 82, 32, 0.6), 0 2u 10u rgba(255, 200, 100, 0.28);
}

/* ───────────── 标签页 ───────────── */
.sf-tabs { display: flex; gap: 2u; box-shadow: inset 0 -1px 0 var(--sf-c-line-strong); }
.sf-tab {
  position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 6u;
  min-height: var(--sf-hit); padding: 0 18u; margin: 0; border: 0; background: none; cursor: pointer;
  color: var(--sf-c-text-3); font-weight: 700; font-size: var(--sf-fs-md); letter-spacing: 0.12em; white-space: nowrap;
  transition: color var(--sf-t-fast) linear;
}
@media (hover: hover) { .sf-tab:hover { color: var(--sf-c-text); } }
.sf-tab::after {
  content: ''; position: absolute; left: 10u; right: 10u; bottom: 0; height: 2px; opacity: 0; transform: scaleX(0.3);
  background: linear-gradient(90deg, rgba(243, 207, 133, 0), var(--sf-c-gold-200), rgba(243, 207, 133, 0));
  transition: opacity var(--sf-t-mid) linear, transform var(--sf-t-mid) var(--sf-ease-out);
}
.sf-tab::before {
  content: ''; position: absolute; left: 50%; bottom: -3u; width: 7u; height: 7u; margin-left: -3.5u; opacity: 0;
  transform: rotate(45deg) scale(0.4); background: var(--sf-c-gold-200); box-shadow: 0 0 8u rgba(255, 214, 130, 0.9);
  transition: opacity var(--sf-t-mid) linear, transform var(--sf-t-mid) var(--sf-ease-spring);
}
.sf-tab.is-active { color: var(--sf-c-gold-200); }
.sf-tab.is-active::after { opacity: 1; transform: none; }
.sf-tab.is-active::before { opacity: 1; transform: rotate(45deg); }

/* ───────────── 滑块 ───────────── */
.sf-slider {
  --sf-fill: 50%; --sf-sl-track: max(5px, 6u); --sf-sl-thumb: max(20px, 22u);
  -webkit-appearance: none; appearance: none; display: block; width: 100%; height: max(36px, 40u); margin: 0; padding: 0;
  background: transparent; cursor: pointer; touch-action: pan-y;
}
.sf-slider::-webkit-slider-runnable-track {
  height: var(--sf-sl-track); border-radius: 99px;
  background: linear-gradient(90deg, var(--sf-c-cyan-600), var(--sf-c-cyan-300)) no-repeat 0 0 / var(--sf-fill) 100%, rgba(4, 8, 22, 0.7);
  box-shadow: 0 0 0 1px var(--sf-c-line-strong);
}
.sf-slider::-webkit-slider-thumb {
  -webkit-appearance: none; appearance: none; width: var(--sf-sl-thumb); height: var(--sf-sl-thumb);
  margin-top: calc((var(--sf-sl-track) - var(--sf-sl-thumb)) / 2); border: 0; border-radius: 50%;
  background: radial-gradient(circle at 36% 30%, #fffbe9, #f3cf85 46%, #a8742c);
  box-shadow: 0 0 0 2px rgba(8, 14, 34, 0.95), 0 0 0 3px var(--sf-c-gold-400), 0 2u 6u rgba(0, 0, 0, 0.55);
  transition: transform var(--sf-t-fast) var(--sf-ease-out);
}
.sf-slider:active::-webkit-slider-thumb { transform: scale(1.14); }
.sf-slider::-moz-range-track { height: var(--sf-sl-track); border-radius: 99px; background: rgba(4, 8, 22, 0.7); box-shadow: 0 0 0 1px var(--sf-c-line-strong); }
.sf-slider::-moz-range-progress { height: var(--sf-sl-track); border-radius: 99px; background: linear-gradient(90deg, var(--sf-c-cyan-600), var(--sf-c-cyan-300)); }
.sf-slider::-moz-range-thumb {
  width: var(--sf-sl-thumb); height: var(--sf-sl-thumb); border: 0; border-radius: 50%;
  background: radial-gradient(circle at 36% 30%, #fffbe9, #f3cf85 46%, #a8742c);
  box-shadow: 0 0 0 2px rgba(8, 14, 34, 0.95), 0 0 0 3px var(--sf-c-gold-400), 0 2u 6u rgba(0, 0, 0, 0.55);
}

/* ───────────── 开关 ───────────── */
.sf-toggle {
  --sf-tg-h: max(26px, 28u); --sf-tg-w: max(48px, 52u);
  position: relative; flex: none; width: var(--sf-tg-w); height: var(--sf-tg-h); padding: 0; margin: 0; border: 0; border-radius: 99px; cursor: pointer;
  background: rgba(4, 8, 22, 0.7); box-shadow: inset 0 0 0 1px var(--sf-c-line-strong);
  transition: background var(--sf-t-mid) linear, box-shadow var(--sf-t-mid) linear;
}
.sf-toggle::after {
  content: ''; position: absolute; top: 3px; left: 3px; width: calc(var(--sf-tg-h) - 6px); height: calc(var(--sf-tg-h) - 6px); border-radius: 50%;
  background: radial-gradient(circle at 36% 30%, #c5d3ee, #7f8fb4 55%, #44517a);
  box-shadow: 0 1u 4u rgba(0, 0, 0, 0.5);
  transition: transform var(--sf-t-mid) var(--sf-ease-spring), background var(--sf-t-mid) linear;
}
.sf-toggle[aria-checked='true'] {
  background: linear-gradient(90deg, #14506e, var(--sf-c-cyan-500));
  box-shadow: inset 0 0 0 1px var(--sf-c-cyan-300), 0 0 10u rgba(92, 214, 247, 0.35);
}
.sf-toggle[aria-checked='true']::after {
  transform: translateX(calc(var(--sf-tg-w) - var(--sf-tg-h)));
  background: radial-gradient(circle at 36% 30%, #fffbe9, #f3cf85 46%, #a8742c);
}

/* ───────────── 徽标 ───────────── */
.sf-badge {
  --sf-bd: 224, 177, 96;
  display: inline-flex; align-items: center; gap: 4u; flex: none; height: max(18px, 20u); padding: 0 7u; border-radius: 3u;
  font-weight: 700; font-size: var(--sf-fs-xs); line-height: 1; letter-spacing: 0.08em; white-space: nowrap;
  color: rgb(var(--sf-bd)); background: rgba(var(--sf-bd), 0.14); box-shadow: inset 0 0 0 1px rgba(var(--sf-bd), 0.5);
}
.sf-badge .sf-i { width: 1.1em; height: 1.1em; }
.sf-badge--cyan { --sf-bd: 143, 233, 255; }
.sf-badge--blue { --sf-bd: 110, 180, 255; }
.sf-badge--red { --sf-bd: 255, 120, 120; }
.sf-badge--green { --sf-bd: 111, 227, 161; }
.sf-badge--violet { --sf-bd: 190, 160, 255; }
.sf-badge--mute { --sf-bd: 150, 165, 200; }
.sf-badge--solid { color: #2b1a04; background: var(--sf-grad-gold); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 0 8u rgba(255, 214, 130, 0.4); }
.sf-badge--me { color: #14240a; background: linear-gradient(180deg, #e2ffb0, #9bdc4c); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 0 8u rgba(183, 243, 107, 0.45); }

/* ───────────── 进度条 ───────────── */
.sf-progress {
  --sf-p: 0;
  position: relative; height: max(8px, 10u); border-radius: 99px; background: rgba(4, 8, 22, 0.7);
  box-shadow: inset 0 0 0 1px var(--sf-c-line-strong), 0 0 0 3u rgba(8, 13, 31, 0.5);
}
.sf-progress__fill {
  position: absolute; left: 1px; top: 1px; bottom: 1px; width: calc((100% - 2px) * var(--sf-p)); min-width: max(6px, 8u); border-radius: inherit; overflow: hidden;
  background: linear-gradient(90deg, #1c84b0, #5cd6f7 60%, #fff4d6);
  box-shadow: 0 0 12u rgba(92, 214, 247, 0.55);
  transition: width 0.4s var(--sf-ease-out);
}
.sf-progress__fill::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(100deg, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0.65) 50%, rgba(255, 255, 255, 0) 70%) 0 0 / 60% 100% no-repeat;
  animation: sf-shimmer 1.6s linear infinite;
}
.sf-progress__spark {
  position: absolute; top: 50%; left: calc((100% - 2px) * var(--sf-p)); width: 26u; height: 26u; margin: -13u 0 0 -13u; pointer-events: none;
  background-repeat: no-repeat; background-position: center; background-size: contain;
  filter: drop-shadow(0 0 6u rgba(255, 244, 214, 0.9));
  transition: left 0.4s var(--sf-ease-out); animation: sf-twinkle 1.2s ease-in-out infinite;
}

/* ───────────── 图标槽 / 头像框 ───────────── */
.sf-slot {
  --sf-slot: 48u;
  position: relative; display: inline-block; flex: none; width: var(--sf-slot); height: var(--sf-slot); padding: 0; margin: 0; border: 0;
  border-radius: 16%; overflow: hidden; background: #0a1128;
  box-shadow: 0 0 0 1px rgba(8, 13, 31, 0.95), 0 0 0 max(2px, 2u) rgba(224, 177, 96, 0.55), 0 3u 8u rgba(0, 0, 0, 0.5);
}
.sf-slot > svg, .sf-slot > img { display: block; width: 100%; height: 100%; object-fit: cover; }
.sf-slot::after {
  content: ''; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.16), inset 0 -8u 12u rgba(0, 0, 0, 0.28);
}
.sf-slot--round { border-radius: 50%; }
.sf-slot--plain { box-shadow: 0 0 0 1px rgba(150, 178, 235, 0.3); }
.sf-slot--empty { background: rgba(4, 8, 22, 0.6); box-shadow: inset 0 0 0 1px var(--sf-c-line-strong); }
.sf-slot--empty::after { box-shadow: none; }
.sf-slot--cyan { box-shadow: 0 0 0 1px rgba(8, 13, 31, 0.95), 0 0 0 max(2px, 2u) rgba(92, 214, 247, 0.7), 0 3u 8u rgba(0, 0, 0, 0.5); }
button.sf-slot { cursor: pointer; transition: transform var(--sf-t-fast) var(--sf-ease-out), box-shadow var(--sf-t-fast) linear, filter var(--sf-t-fast) linear; }
@media (hover: hover) { button.sf-slot:hover { filter: brightness(1.15); } }
button.sf-slot:active { transform: scale(0.94); }
.sf-slot.is-active { box-shadow: 0 0 0 1px rgba(8, 13, 31, 0.95), 0 0 0 max(2px, 2.5u) var(--sf-c-gold-100), 0 0 16u rgba(255, 214, 130, 0.75); }

/* ───────────── 英雄头像 / 星级 ───────────── */
.sf-portrait {
  position: relative; display: block; flex: none; overflow: hidden;
  background: radial-gradient(circle at 50% 30%, var(--sf-hero-a, #28407c), var(--sf-hero-b, #0a1128) 92%);
}
.sf-portrait > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity 0.3s linear; }
.sf-portrait.is-loaded > img { opacity: 1; }
.sf-portrait__fallback { position: absolute; left: 50%; top: 50%; width: 54%; height: 54%; transform: translate(-50%, -50%); color: var(--sf-hero-c, #c9f6ff); opacity: 0.92; transition: opacity 0.3s linear; }
.sf-portrait.is-loaded > .sf-portrait__fallback { opacity: 0; }
.sf-stars { display: inline-flex; gap: 1u; color: var(--sf-c-text-4); vertical-align: middle; }
.sf-stars .sf-i { width: 1.05em; height: 1.05em; vertical-align: 0; }
.sf-stars .is-on { color: var(--sf-c-gold-300); filter: drop-shadow(0 0 3u rgba(255, 214, 130, 0.6)); }

/* ───────────── 键帽 ───────────── */
.sf-kbd {
  display: inline-grid; place-items: center; flex: none; min-width: max(22px, 24u); height: max(22px, 24u); padding: 0 6u; border-radius: 5u;
  font-family: var(--sf-font-num); font-weight: 700; font-size: var(--sf-fs-xs); line-height: 1; color: var(--sf-c-text); white-space: nowrap;
  background: linear-gradient(180deg, #2a3f7a, #16244c); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22), inset 0 0 0 1px rgba(150, 178, 235, 0.35), 0 2u 0 #070c1c;
}

/* ───────────── 对话框 ───────────── */
.sf-dialog-scrim {
  position: absolute; inset: 0; z-index: var(--sf-z-dialog); display: grid; place-items: center;
  padding: max(12u, var(--sf-safe-t)) max(12u, var(--sf-safe-r)) max(12u, var(--sf-safe-b)) max(12u, var(--sf-safe-l));
  background: radial-gradient(ellipse at center, rgba(8, 14, 34, 0.7), rgba(3, 6, 16, 0.9));
  animation: sf-fade-in 0.2s linear both;
}
.sf-dialog-scrim.is-leaving { animation: sf-fade-out 0.18s linear both; pointer-events: none; }
.sf-dialog {
  --sf-dialog-w: 560u;
  display: flex; flex-direction: column; width: min(100%, max(300px, var(--sf-dialog-w))); max-height: 100%; min-height: 0;
  animation: sf-pop-in 0.3s var(--sf-ease-out) both;
}
.sf-root .sf-dialog:focus, .sf-root .sf-dialog:focus-visible { outline: none; }
.sf-dialog-scrim.is-leaving .sf-dialog { animation: sf-pop-out 0.18s var(--sf-ease-in) both; }
.sf-dialog__head { display: flex; align-items: center; gap: 12u; flex: none; padding: 12u 12u 10u 24u; box-shadow: inset 0 -1px 0 var(--sf-c-line); }
.sf-dialog__title { flex: 1; margin: 0; font-weight: 800; font-size: var(--sf-fs-xl); line-height: 1.3; letter-spacing: 0.2em; }
.sf-dialog__body { flex: 1; min-height: 0; padding: 16u 24u 20u; }
.sf-dialog__foot { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 12u; flex: none; padding: 14u 24u 18u; box-shadow: inset 0 1px 0 var(--sf-c-line); }

/* ───────────── 提示浮层 ───────────── */
.sf-tip {
  position: fixed; left: 0; top: 0; z-index: var(--sf-z-tooltip); width: max-content; max-width: min(max(230px, 300u), calc(100vw - 16px));
  padding: 10u 13u 11u; border-radius: 7u; pointer-events: none;
  font-family: var(--sf-font); font-size: var(--sf-fs-sm); line-height: 1.55; color: var(--sf-c-text-2); text-align: left; white-space: normal;
  background: linear-gradient(180deg, #16254f, #0a1128);
  box-shadow: 0 0 0 1px var(--sf-c-gold-line), inset 0 1px 0 rgba(143, 233, 255, 0.16), var(--sf-shadow-2);
  opacity: 0; transform: translateY(4u) scale(0.98); transition: opacity 0.12s linear, transform 0.16s var(--sf-ease-out);
}
.sf-tip, .sf-tip * { box-sizing: border-box; }
.sf-tip.is-open { opacity: 1; transform: none; }
.sf-tip__title { display: flex; align-items: baseline; justify-content: space-between; gap: 14u; font-weight: 700; font-size: var(--sf-fs-md); color: var(--sf-c-gold-200); letter-spacing: 0.06em; }
.sf-tip__meta { font-weight: 600; font-size: var(--sf-fs-xs); color: var(--sf-c-text-3); letter-spacing: 0.04em; white-space: nowrap; }
.sf-tip__stats { margin-top: 4u; color: var(--sf-c-cyan-300); }
.sf-tip__passive { margin-top: 6u; padding-top: 6u; box-shadow: inset 0 1px 0 var(--sf-c-line); }
.sf-tip__passive b { color: var(--sf-c-amber); font-weight: 700; }

/* ───────────── 表单行（设置面板等） ───────────── */
.sf-field { display: grid; grid-template-columns: minmax(84u, auto) 1fr; align-items: center; column-gap: 16u; min-height: var(--sf-hit); }
.sf-field__label { display: flex; align-items: center; gap: 8u; font-weight: 600; font-size: var(--sf-fs-md); color: var(--sf-c-text); letter-spacing: 0.08em; white-space: nowrap; }
.sf-field__label .sf-i { color: var(--sf-c-gold-300); }
.sf-field__ctl { display: flex; align-items: center; justify-content: flex-end; gap: 12u; min-width: 0; }
.sf-field__hint { grid-column: 1 / -1; margin: -2u 0 6u; font-size: var(--sf-fs-xs); color: var(--sf-c-text-3); line-height: 1.5; }
.sf-field__val { flex: none; width: 3.2em; text-align: right; font-size: var(--sf-fs-md); color: var(--sf-c-gold-200); }
button.sf-field { width: 100%; padding: 0; margin: 0; border: 0; background: none; color: inherit; text-align: left; cursor: pointer; }

/* ───────────── 通用动效 ───────────── */
@keyframes sf-fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes sf-fade-out { from { opacity: 1; } to { opacity: 0; } }
@keyframes sf-pop-in { from { opacity: 0; transform: translateY(14u) scale(0.96); } to { opacity: 1; transform: none; } }
@keyframes sf-pop-out { from { opacity: 1; transform: none; } to { opacity: 0; transform: translateY(8u) scale(0.97); } }
@keyframes sf-rise-in { from { opacity: 0; transform: translateY(18u); } to { opacity: 1; transform: none; } }
@keyframes sf-drop-in { from { opacity: 0; transform: translateY(-18u); } to { opacity: 1; transform: none; } }
@keyframes sf-left-in { from { opacity: 0; transform: translateX(-28u); } to { opacity: 1; transform: none; } }
@keyframes sf-right-in { from { opacity: 0; transform: translateX(28u); } to { opacity: 1; transform: none; } }
@keyframes sf-shimmer { from { background-position: -80% 0; } to { background-position: 240% 0; } }
@keyframes sf-twinkle { 0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); } 50% { opacity: 0.7; transform: scale(0.78) rotate(45deg); } }
@keyframes sf-spin { to { transform: rotate(360deg); } }

/* 整屏界面的进出场 */
.sf-screen { position: absolute; inset: 0; z-index: var(--sf-z-screen); animation: sf-screen-in 0.42s var(--sf-ease-out) both; }
.sf-screen.is-leaving { animation: sf-screen-out 0.26s var(--sf-ease-in) both; pointer-events: none; }
@keyframes sf-screen-in { from { opacity: 0; transform: scale(1.025); } to { opacity: 1; transform: none; } }
@keyframes sf-screen-out { from { opacity: 1; transform: none; } to { opacity: 0; transform: scale(0.985); } }

@media (prefers-reduced-motion: reduce) {
  .sf-root *, .sf-root *::before, .sf-root *::after { animation-duration: 0.01s !important; animation-iteration-count: 1 !important; transition-duration: 0.01s !important; }
}
`),
  MB = `
.sf-panel::after { background-image: ${S2("#ffe7ad")}, ${S2("#f3cf85")}, linear-gradient(90deg, rgba(143,233,255,0), rgba(143,233,255,0.6), rgba(143,233,255,0)); }
.sf-progress__spark { background-image: ${S2("#fff4d6")}; }
`,
  kB = wB + MB,
  Qe = {
    void: "#050814",
    abyss: "#080d1f",
    navy900: "#0a1128",
    navy800: "#0e1836",
    navy700: "#142248",
    navy600: "#1c2f60",
    navy500: "#28407c",
    gold100: "#fff4d6",
    gold200: "#ffe7ad",
    gold300: "#f3cf85",
    gold400: "#e0b160",
    gold500: "#c08c3c",
    gold600: "#8d6226",
    gold700: "#5a3e18",
    cyan200: "#c9f6ff",
    cyan300: "#8fe9ff",
    cyan400: "#5cd6f7",
    cyan500: "#2fb4e0",
    cyan600: "#1c84b0",
    text: "#eaf0ff",
    text2: "#b3c1e0",
    text3: "#7f8fb4",
    text4: "#56648a",
    blue: "#4da3ff",
    blueDeep: "#1e5fc4",
    red: "#ff5d5d",
    redDeep: "#b62a35",
    green: "#6fe3a1",
    amber: "#ffb84d",
    violet: "#b48cff",
    me: "#b7f36b",
  },
  SB = '"PingFang SC","HarmonyOS Sans SC","Microsoft YaHei",sans-serif',
  TB = Jn(`
:root {
  /* ── 缩放基准：横屏 1280×720 为 1u = 1px；下限保证小屏手机上控件不至于过小，上限覆盖 4K ── */
  --sf-u: clamp(0.78px, min(calc(100vw / 1280), calc(100vh / 720)), 3.2px);

  /* ── 颜色 ── */
  --sf-c-void: ${Qe.void};
  --sf-c-abyss: ${Qe.abyss};
  --sf-c-navy-900: ${Qe.navy900};
  --sf-c-navy-800: ${Qe.navy800};
  --sf-c-navy-700: ${Qe.navy700};
  --sf-c-navy-600: ${Qe.navy600};
  --sf-c-navy-500: ${Qe.navy500};
  --sf-c-gold-100: ${Qe.gold100};
  --sf-c-gold-200: ${Qe.gold200};
  --sf-c-gold-300: ${Qe.gold300};
  --sf-c-gold-400: ${Qe.gold400};
  --sf-c-gold-500: ${Qe.gold500};
  --sf-c-gold-600: ${Qe.gold600};
  --sf-c-gold-700: ${Qe.gold700};
  --sf-c-cyan-200: ${Qe.cyan200};
  --sf-c-cyan-300: ${Qe.cyan300};
  --sf-c-cyan-400: ${Qe.cyan400};
  --sf-c-cyan-500: ${Qe.cyan500};
  --sf-c-cyan-600: ${Qe.cyan600};
  --sf-c-text: ${Qe.text};
  --sf-c-text-2: ${Qe.text2};
  --sf-c-text-3: ${Qe.text3};
  --sf-c-text-4: ${Qe.text4};
  --sf-c-blue: ${Qe.blue};
  --sf-c-blue-deep: ${Qe.blueDeep};
  --sf-c-red: ${Qe.red};
  --sf-c-red-deep: ${Qe.redDeep};
  --sf-c-green: ${Qe.green};
  --sf-c-amber: ${Qe.amber};
  --sf-c-violet: ${Qe.violet};
  /* 玩家自己：金绿色（与渲染层脚下光环一致） */
  --sf-c-me: ${Qe.me};
  --sf-c-line: rgba(150, 178, 235, 0.16);
  --sf-c-line-strong: rgba(150, 178, 235, 0.3);
  --sf-c-gold-line: rgba(232, 199, 122, 0.42);
  --sf-c-scrim: rgba(3, 6, 16, 0.72);

  /* 面板底色（深海军蓝半透明） */
  --sf-bg-panel: linear-gradient(180deg, rgba(40, 64, 124, 0.2), rgba(40, 64, 124, 0) 30%), linear-gradient(180deg, rgba(15, 26, 60, 0.9), rgba(8, 14, 34, 0.94));
  --sf-bg-inset: rgba(4, 8, 22, 0.55);
  --sf-bg-raise: rgba(60, 92, 170, 0.14);
  --sf-bg-raise-2: rgba(86, 124, 210, 0.22);

  /* 金属渐变 */
  --sf-grad-gold: linear-gradient(180deg, #fff6d8 0%, #f9dc98 26%, #e2ae55 60%, #b17a2c 100%);
  --sf-grad-gold-text: linear-gradient(180deg, #fffbe9 0%, #ffe9b3 30%, #e7b55b 52%, #a8742c 60%, #f2cf86 80%, #fff3cf 100%);
  --sf-grad-steel-text: linear-gradient(180deg, #f4f8ff 0%, #c5d3ee 34%, #8496bd 54%, #56648a 62%, #a9b9d9 82%, #e3ebfb 100%);
  --sf-grad-cyan: linear-gradient(90deg, #1c84b0, #5cd6f7 60%, #c9f6ff);

  /* ── 字体 ── */
  --sf-font: ${SB};
  --sf-font-num: "DIN Alternate", "Bahnschrift", "Roboto Condensed", "HarmonyOS Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif;
  /* 字号：按 u 缩放，但有像素下限（手机上正文不小于 12px） */
  --sf-fs-xs: max(11px, 11u);
  --sf-fs-sm: max(12px, 13u);
  --sf-fs-md: max(13px, 15u);
  --sf-fs-lg: max(14px, 18u);
  --sf-fs-xl: max(17px, 24u);
  --sf-fs-2xl: max(22px, 34u);
  --sf-fs-3xl: max(30px, 52u);

  /* ── 间距 ── */
  --sf-sp-1: 4u;
  --sf-sp-2: 8u;
  --sf-sp-3: 12u;
  --sf-sp-4: 16u;
  --sf-sp-5: 24u;
  --sf-sp-6: 32u;
  --sf-sp-7: 48u;

  /* ── 圆角 ── */
  --sf-r-xs: 3u;
  --sf-r-sm: 6u;
  --sf-r-md: 10u;
  --sf-r-lg: 16u;
  /* 切角按钮的切角大小 */
  --sf-cut: 9u;

  /* ── 阴影 / 辉光 ── */
  --sf-shadow-1: 0 4u 12u rgba(2, 4, 12, 0.45);
  --sf-shadow-2: 0 14u 40u rgba(2, 4, 12, 0.6);
  --sf-glow-gold: 0 0 14u rgba(255, 214, 130, 0.45);
  --sf-glow-cyan: 0 0 14u rgba(92, 214, 247, 0.5);

  /* ── 动效 ── */
  --sf-ease-out: cubic-bezier(0.2, 0.8, 0.2, 1);
  --sf-ease-in: cubic-bezier(0.6, 0, 0.8, 0.2);
  --sf-ease-spring: cubic-bezier(0.3, 1.5, 0.5, 1);
  --sf-t-fast: 0.12s;
  --sf-t-mid: 0.24s;
  --sf-t-slow: 0.5s;

  /* ── 触控目标下限 ── */
  --sf-hit: max(40px, 44u);

  /* ── 安全区 ── */
  --sf-safe-t: env(safe-area-inset-top, 0px);
  --sf-safe-r: env(safe-area-inset-right, 0px);
  --sf-safe-b: env(safe-area-inset-bottom, 0px);
  --sf-safe-l: env(safe-area-inset-left, 0px);

  /* ── 层级 ── */
  --sf-z-screen: 10;
  --sf-z-dialog: 100;
  --sf-z-tooltip: 200;
}
/* 移动浏览器地址栏伸缩时 vh 不准，优先用动态视口高度 */
@supports (height: 1dvh) {
  :root { --sf-u: clamp(0.78px, min(calc(100vw / 1280), calc(100dvh / 720)), 3.2px); }
}
/* 竖屏以 480×860 为基准 */
@media (orientation: portrait) {
  :root { --sf-u: clamp(0.78px, min(calc(100vw / 480), calc(100vh / 860)), 3.2px); }
}
@supports (height: 1dvh) {
  @media (orientation: portrait) {
    :root { --sf-u: clamp(0.78px, min(calc(100vw / 480), calc(100dvh / 860)), 3.2px); }
  }
}
`);

function z(n, t, ...e) {
  const s = document.createElement(n);
  return (t && (s.className = t), b3(s, ...e), s);
}

function b3(n, ...t) {
  for (const e of t)
    e == null ||
      e === !1 ||
      n.appendChild(typeof e == "string" || typeof e == "number" ? document.createTextNode(String(e)) : e);
}

function _e(n, t) {
  const e = document.createElement("span");
  return ((e.className = t ? `sf-i ${t}` : "sf-i"), (e.innerHTML = n), e);
}

function ro(n, t = {}) {
  const e = document.createElement(t.button ? "button" : "span");
  return (
    (e.className = `sf-slot${t.round ? " sf-slot--round" : ""}${n === null ? " sf-slot--empty" : ""}${t.cls ? ` ${t.cls}` : ""}`),
    t.size && e.style.setProperty("--sf-slot", t.size),
    t.label && e.setAttribute("aria-label", t.label),
    t.button && (e.type = "button"),
    n && (e.innerHTML = n),
    e
  );
}

function po(n) {
  const t = n.variant ?? "secondary",
    e = z(
      "button",
      `sf-btn${t !== "secondary" ? ` sf-btn--${t}` : ""}${n.size && n.size !== "md" ? ` sf-btn--${n.size}` : ""}${n.block ? " sf-btn--block" : ""}${n.pulse ? " sf-btn--pulse" : ""}${n.cls ? ` ${n.cls}` : ""}`,
    );
  return (
    (e.type = "button"),
    (e.dataset.sfSnd = n.sound ?? "click"),
    n.pulse && e.appendChild(z("i", "sf-btn__glow")),
    n.icon && e.appendChild(_e(n.icon)),
    e.appendChild(z("span", "sf-btn__label", n.label)),
    n.onClick && e.addEventListener("click", n.onClick),
    e
  );
}

function T0(n) {
  const t = z(
    "button",
    `sf-iconbtn${n.quiet ? " sf-iconbtn--quiet" : ""}${n.cls ? ` ${n.cls}` : ""}`,
    _e(n.icon),
  );
  return (
    (t.type = "button"),
    t.setAttribute("aria-label", n.label),
    (t.title = n.label),
    (t.dataset.sfSnd = n.sound ?? "click"),
    n.onClick && t.addEventListener("click", n.onClick),
    t
  );
}

function V8(n) {
  let t = n.value;
  const e = z("div", `sf-seg${n.block ? " sf-seg--block" : ""}`);
  (e.setAttribute("role", "radiogroup"), n.label && e.setAttribute("aria-label", n.label));
  const s = n.options.map((a) => {
    const o = z("button", "sf-seg__opt", a.label);
    return (
      (o.type = "button"),
      o.setAttribute("role", "radio"),
      (o.dataset.sfSnd = "select"),
      o.addEventListener("click", () => {
        t !== a.value && (i(a.value), n.onChange(a.value));
      }),
      e.appendChild(o),
      o
    );
  });
  function i(a) {
    ((t = a),
      n.options.forEach((o, r) => {
        const l = o.value === a;
        (s[r].classList.toggle("is-active", l), s[r].setAttribute("aria-checked", String(l)));
      }));
  }
  return (i(t), { el: e, get: () => t, set: i });
}

function W8(n) {
  let t = n.value;
  const e = z("div", "sf-tabs");
  e.setAttribute("role", "tablist");
  const s = n.tabs.map((a) => {
    const o = z("button", "sf-tab", a.icon ? _e(a.icon) : null, a.label);
    return (
      (o.type = "button"),
      o.setAttribute("role", "tab"),
      (o.dataset.sfSnd = "select"),
      o.addEventListener("click", () => {
        t !== a.id && (i(a.id), n.onChange(a.id));
      }),
      e.appendChild(o),
      o
    );
  });
  function i(a) {
    ((t = a),
      n.tabs.forEach((o, r) => {
        const l = o.id === a;
        (s[r].classList.toggle("is-active", l), s[r].setAttribute("aria-selected", String(l)));
      }));
  }
  return (i(t), { el: e, get: () => t, set: i });
}

function EB(n) {
  const t = n.min ?? 0,
    e = n.max ?? 1,
    s = z("input", "sf-slider");
  ((s.type = "range"),
    (s.min = String(t)),
    (s.max = String(e)),
    (s.step = String(n.step ?? 0.01)),
    n.label && s.setAttribute("aria-label", n.label));
  const i = () => {
    const a = Number(s.value);
    s.style.setProperty("--sf-fill", `${((a - t) / (e - t || 1)) * 100}%`);
  };
  return (
    (s.value = String(n.value)),
    i(),
    s.addEventListener("input", () => {
      (i(), n.onInput(Number(s.value)));
    }),
    s.addEventListener("change", () => n.onCommit?.(Number(s.value))),
    {
      el: s,
      get: () => Number(s.value),
      set: (a) => {
        ((s.value = String(a)), i());
      },
    }
  );
}

function j8(n) {
  let t = n.value;
  const e = z("button", "sf-toggle");
  ((e.type = "button"),
    e.setAttribute("role", "switch"),
    n.label && e.setAttribute("aria-label", n.label),
    (e.dataset.sfSnd = "click"));
  const s = (a) => {
      ((t = a), e.setAttribute("aria-checked", String(a)));
    },
    i = () => {
      (s(!t), n.onChange(t));
    };
  return (
    e.addEventListener("click", (a) => {
      (a.stopPropagation(), i());
    }),
    s(t),
    { el: e, get: () => t, set: s, flip: i }
  );
}

function AB() {
  const n = z("div", "sf-progress", z("div", "sf-progress__fill"), z("div", "sf-progress__spark"));
  return (
    n.setAttribute("role", "progressbar"),
    n.setAttribute("aria-valuemin", "0"),
    n.setAttribute("aria-valuemax", "100"),
    {
      el: n,
      set: (t) => {
        const e = Math.max(0, Math.min(1, t));
        (n.style.setProperty("--sf-p", String(e)),
          n.setAttribute("aria-valuenow", String(Math.round(e * 100))));
      },
    }
  );
}

function za(n, t = "gold", e) {
  return z("span", `sf-badge${t !== "gold" ? ` sf-badge--${t}` : ""}`, e ? _e(e) : null, n);
}

const RB = new Set(["click", "hover", "confirm", "back", "select", "buy", "error", "ready", "countdown"]);

function qx(n, t) {
  let e = null;
  const s = (r) => (r instanceof Element ? r.closest("[data-sf-snd]") : null),
    i = () => t.unlock(),
    a = (r) => {
      if (r.pointerType !== "mouse") return;
      const l = s(r.target);
      l !== e && ((e = l), l && !l.disabled && t.ui("hover"));
    },
    o = (r) => {
      const l = s(r.target);
      if (!l || l.disabled) return;
      const c = l.dataset.sfSnd ?? "";
      RB.has(c) && t.ui(c);
    };
  return (
    n.addEventListener("pointerdown", i, !0),
    window.addEventListener("keydown", i, !0),
    n.addEventListener("pointerover", a),
    n.addEventListener("click", o, !0),
    () => {
      (n.removeEventListener("pointerdown", i, !0),
        window.removeEventListener("keydown", i, !0),
        n.removeEventListener("pointerover", a),
        n.removeEventListener("click", o, !0));
    }
  );
}

const CB =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  q1 = new Set();

function Sf() {
  for (const n of q1) if (n.scrim.isConnected) return !0;
  return !1;
}

function q8(n) {
  for (const t of Array.from(q1))
    (n && t.scrim.isConnected && !n.contains(t.scrim)) || (t.close(), t.scrim.remove());
}

function Xx(n) {
  const t = document.activeElement;
  return !(t instanceof HTMLButtonElement) || (n && !n.contains(t)) ? !1 : Yx(t);
}

function Yx(n) {
  try {
    return n.matches(":focus-visible");
  } catch {
    return !0;
  }
}

function X8(n, t) {
  const e = t.closable !== !1;
  let s = !1;
  const i = document.activeElement instanceof HTMLElement ? document.activeElement : null,
    a = i && Yx(i) ? i : null,
    o = z("h2", "sf-dialog__title sf-metal", t.title),
    r = e ? z("button", "sf-iconbtn sf-iconbtn--quiet", _e(CB)) : null;
  r && ((r.type = "button"), r.setAttribute("aria-label", "关闭"), (r.dataset.sfSnd = "back"));
  const l = z("div", "sf-dialog__body sf-scroll");
  b3(l, ...(Array.isArray(t.content) ? t.content : [t.content]));
  const c = t.footer ? z("div", "sf-dialog__foot") : null;
  c && b3(c, ...(Array.isArray(t.footer) ? t.footer : [t.footer]));
  const f = z(
    "div",
    `sf-dialog sf-panel${t.cls ? ` ${t.cls}` : ""}`,
    z("div", "sf-dialog__head", o, r),
    l,
    c,
  );
  (f.setAttribute("role", "dialog"),
    f.setAttribute("aria-modal", "true"),
    f.setAttribute("aria-label", t.title),
    (f.tabIndex = -1),
    t.width && f.style.setProperty("--sf-dialog-w", t.width));
  const d = z("div", "sf-dialog-scrim", f),
    h = { scrim: d, close: () => u() },
    u = () => {
      s ||
        ((s = !0),
        q1.delete(h),
        window.removeEventListener("keydown", m, !0),
        document.removeEventListener("focusin", x),
        d.classList.add("is-leaving"),
        window.setTimeout(() => d.remove(), 180),
        a && a.isConnected
          ? a.focus({ preventScroll: !0 })
          : document.activeElement instanceof HTMLElement &&
            d.contains(document.activeElement) &&
            document.activeElement.blur(),
        t.onClose?.());
    },
    m = (p) => {
      if (!d.isConnected) {
        u();
        return;
      }
      p.key !== "Escape" || !e || (p.stopPropagation(), p.preventDefault(), u());
    },
    x = (p) => {
      s ||
        !d.isConnected ||
        d.nextElementSibling?.classList.contains("sf-dialog-scrim") ||
        (p.target instanceof Node && !d.contains(p.target) && f.focus({ preventScroll: !0 }));
    };
  return (
    d.addEventListener("pointerdown", (p) => {
      p.target === d && e && u();
    }),
    r?.addEventListener("click", u),
    window.addEventListener("keydown", m, !0),
    document.addEventListener("focusin", x),
    n.appendChild(d),
    q1.add(h),
    f.focus({ preventScroll: !0 }),
    { el: d, body: l, close: u }
  );
}

let ms = null,
  lo = null,
  Ih = 0,
  f4 = !1,
  Y8 = NaN,
  K8 = NaN;

if (typeof window < "u") {
  const n = (t) => {
    t.pointerType === "mouse" && ((Y8 = t.clientX), (K8 = t.clientY));
  };
  (window.addEventListener("pointermove", n, { capture: !0, passive: !0 }),
    window.addEventListener("pointerdown", n, { capture: !0, passive: !0 }));
}

function Z8() {
  f4 ||
    ((f4 = !0),
    document.addEventListener(
      "pointerdown",
      (n) => {
        lo && n.target instanceof Node && !lo.contains(n.target) && w0();
      },
      !0,
    ));
}

function w0() {
  (window.clearTimeout(Ih), (lo = null), ms && ms.classList.remove("is-open"));
}

function Q8(n, t) {
  if (!n.isConnected) return;
  const e = n.closest(".sf-root") ?? document.body;
  (ms ||
    ((ms = document.createElement("div")), (ms.className = "sf-tip"), ms.setAttribute("role", "tooltip")),
    ms.parentElement !== e && e.appendChild(ms),
    (ms.textContent = ""),
    typeof t == "string" ? (ms.innerHTML = t) : ms.appendChild(t),
    (lo = n),
    (ms.style.transform = "none"),
    (ms.style.left = "0px"),
    (ms.style.top = "0px"));
  const s = n.getBoundingClientRect(),
    i = ms.offsetWidth,
    a = ms.offsetHeight,
    o = 8,
    r = window.innerWidth,
    l = window.innerHeight;
  let c = s.left + s.width / 2 - i / 2;
  c = Math.max(8, Math.min(r - i - 8, c));
  let f = s.top - a - o;
  (f < 8 && (f = Math.min(l - a - 8, s.bottom + o)),
    (ms.style.left = `${Math.round(c)}px`),
    (ms.style.top = `${Math.round(Math.max(8, f))}px`),
    (ms.style.transform = ""),
    ms.offsetWidth,
    ms.classList.add("is-open"));
}

function M0(n, t, e = {}) {
  const s = e.touch ?? "tap";
  let i = 0,
    a = 0,
    o = 0,
    r = !1;
  const l = () => Q8(n, t()),
    c = (y) => {
      y.pointerType === "mouse" && (y.clientX === Y8 && y.clientY === K8 ? (r = !0) : l());
    },
    f = (y) => {
      ((r = !1), y.pointerType === "mouse" && lo === n && w0());
    },
    d = () => {
      (window.clearTimeout(Ih),
        (Ih = window.setTimeout(() => {
          lo === n && w0();
        }, 4200)));
    },
    h = (y) => {
      y.pointerType !== "mouse" &&
        ((a = y.clientX),
        (o = y.clientY),
        window.clearTimeout(i),
        s === "longpress" &&
          (i = window.setTimeout(() => {
            (l(), d());
          }, 350)));
    },
    u = (y) => {
      if (y.pointerType === "mouse") {
        r && ((r = !1), l());
        return;
      }
      Math.hypot(y.clientX - a, y.clientY - o) > 10 && window.clearTimeout(i);
    },
    m = (y) => {
      y.pointerType !== "mouse" &&
        (window.clearTimeout(i),
        s === "tap" && Math.hypot(y.clientX - a, y.clientY - o) <= 10 && (lo === n ? w0() : (l(), d())));
    },
    x = () => window.clearTimeout(i),
    p = () => {
      Yx(n) && l();
    },
    g = () => {
      lo === n && w0();
    };
  return (
    Z8(),
    n.addEventListener("pointerenter", c),
    n.addEventListener("pointerleave", f),
    n.addEventListener("pointerdown", h),
    n.addEventListener("pointermove", u),
    n.addEventListener("pointerup", m),
    n.addEventListener("pointercancel", x),
    n.addEventListener("focus", p),
    n.addEventListener("blur", g),
    () => {
      (window.clearTimeout(i),
        lo === n && w0(),
        n.removeEventListener("pointerenter", c),
        n.removeEventListener("pointerleave", f),
        n.removeEventListener("pointerdown", h),
        n.removeEventListener("pointermove", u),
        n.removeEventListener("pointerup", m),
        n.removeEventListener("pointercancel", x),
        n.removeEventListener("focus", p),
        n.removeEventListener("blur", g));
    }
  );
}

function zi() {
  w0();
}

function T2(n, t, e = 0) {
  (Z8(),
    window.clearTimeout(Ih),
    Q8(n, t),
    e > 0 &&
      (Ih = window.setTimeout(() => {
        lo === n && w0();
      }, e)));
}

function Fp(n) {
  return lo === n && !!ms && ms.classList.contains("is-open");
}

function Hf() {
  (Zn("sf-theme-tokens", TB), Zn("sf-theme-components", kB));
}

const d4 = {
  menu: {
    sky: [
      [0, "#02040d"],
      [0.34, "#060d2a"],
      [0.62, "#0d2152"],
      [0.8, "#1a4a82"],
      [1, "#27719a"],
    ],
    horizon: "#3aa0c8",
    horizonGlow: "rgba(92, 214, 247, 0.34)",
    beam: "255, 226, 160",
    ridge: ["#16346a", "#0c1d45", "#050a1c"],
    rim: "rgba(160, 220, 255, 0.5)",
    star: "225, 238, 255",
    meteor: "201, 246, 255",
    meteorRate: 0.42,
    mote: "255, 226, 160",
    moteDir: 1,
  },
  victory: {
    sky: [
      [0, "#050410"],
      [0.34, "#0e1034"],
      [0.62, "#262258"],
      [0.8, "#70502e"],
      [1, "#c98d3c"],
    ],
    horizon: "#ffd98a",
    horizonGlow: "rgba(255, 214, 130, 0.42)",
    beam: "255, 240, 200",
    ridge: ["#3c3260", "#1a1838", "#07060f"],
    rim: "rgba(255, 226, 160, 0.6)",
    star: "255, 244, 214",
    meteor: "255, 231, 173",
    meteorRate: 0.9,
    mote: "255, 231, 173",
    moteDir: 1,
  },
  defeat: {
    sky: [
      [0, "#030409"],
      [0.34, "#090c18"],
      [0.62, "#141a2c"],
      [0.8, "#2a2636"],
      [1, "#4a2c34"],
    ],
    horizon: "#8a4a52",
    horizonGlow: "rgba(182, 60, 70, 0.26)",
    beam: "190, 120, 130",
    ridge: ["#1c2234", "#10131f", "#05060b"],
    rim: "rgba(170, 130, 150, 0.35)",
    star: "170, 180, 205",
    meteor: "170, 180, 205",
    meteorRate: 0,
    mote: "150, 150, 165",
    moteDir: -1,
  },
};

function h4(n) {
  let t = n >>> 0;
  return () => {
    t = (t + 1831565813) >>> 0;
    let e = t;
    return (
      (e = Math.imul(e ^ (e >>> 15), e | 1)),
      (e ^= e + Math.imul(e ^ (e >>> 7), e | 61)),
      ((e ^ (e >>> 14)) >>> 0) / 4294967296
    );
  };
}

function LB(n, t, e) {
  let s = 2;
  for (; s + 1 < t;) s *= 2;
  const i = new Array(s + 1).fill(0);
  ((i[0] = n()), (i[s] = n()));
  let a = 0.9;
  for (let c = s; c > 1; c /= 2) {
    const f = c / 2;
    for (let d = f; d < s; d += c) i[d] = (i[d - f] + i[d + f]) / 2 + (n() - 0.5) * a;
    a *= e;
  }
  let o = 1 / 0,
    r = -1 / 0;
  for (const c of i) ((o = Math.min(o, c)), (r = Math.max(r, c)));
  const l = [];
  for (let c = 0; c < t; c++) {
    const f = (c / (t - 1)) * s,
      d = Math.min(s - 1, Math.floor(f)),
      h = i[d] + (i[d + 1] - i[d]) * (f - d);
    l.push((h - o) / (r - o || 1));
  }
  return l;
}

function Kx(n, t = "menu") {
  const e = document.createElement("canvas");
  ((e.className = "sf-backdrop"),
    (e.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;display:block;z-index:0;pointer-events:none;"),
    n.insertBefore(e, n.firstChild));
  const s = e.getContext("2d", { alpha: !1 }),
    i = document.createElement("canvas"),
    a = i.getContext("2d", { alpha: !1 }),
    o = document.createElement("canvas"),
    r = o.getContext("2d");
  let l = t,
    c = 0,
    f = 0,
    d = 1,
    h = 0,
    u = 0,
    m = [],
    x = [];
  const p = [];
  let g = 0,
    y = 0,
    v = 0,
    _ = 0.6,
    k = !1;
  function M() {
    if (!a || !r) return;
    const A = d4[l],
      C = h4(20260511);
    ((i.width = o.width = e.width),
      (i.height = o.height = e.height),
      a.setTransform(d, 0, 0, d, 0, 0),
      r.setTransform(d, 0, 0, d, 0, 0),
      r.clearRect(0, 0, c, f));
    const R = a.createLinearGradient(0, 0, 0, h);
    for (const [nt, H] of A.sky) R.addColorStop(nt, H);
    ((a.fillStyle = R), a.fillRect(0, 0, c, f), a.save(), a.translate(c * 0.5, h * 0.4), a.rotate(-0.42));
    const I = a.createLinearGradient(0, -f * 0.2, 0, f * 0.2);
    (I.addColorStop(0, `rgba(${A.star}, 0)`),
      I.addColorStop(0.5, `rgba(${A.star}, 0.075)`),
      I.addColorStop(1, `rgba(${A.star}, 0)`),
      (a.fillStyle = I),
      a.fillRect(-c, -f * 0.2, c * 2, f * 0.4),
      a.restore());
    const P = c * 0.24,
      F = -f * 0.12;
    a.lineCap = "round";
    for (let nt = 0; nt < 26; nt++) {
      const H = f * (0.3 + C() * 0.95),
        st = 0.15 + C() * 1.5,
        tt = 0.1 + C() * 0.22;
      ((a.strokeStyle = `rgba(${A.star}, ${0.035 + C() * 0.075})`),
        (a.lineWidth = 0.6 + C() * 0.8),
        a.beginPath(),
        a.arc(P, F, H, st, st + tt),
        a.stroke());
    }
    const L = Math.max(c * 0.62, f * 0.75),
      B = a.createRadialGradient(u, h, 0, u, h, L);
    (B.addColorStop(0, A.horizonGlow),
      B.addColorStop(1, "rgba(0, 0, 0, 0)"),
      (a.fillStyle = B),
      a.fillRect(0, 0, c, f));
    const G = [
        { base: 0.015, amp: 0.2, rough: 0.56, top: A.ridge[0], bottom: A.horizon, rim: 1, mist: 0.2 },
        { base: 0.075, amp: 0.15, rough: 0.52, top: A.ridge[1], bottom: A.ridge[0], rim: 0.5, mist: 0.12 },
        { base: 0.16, amp: 0.11, rough: 0.6, top: A.ridge[2], bottom: A.ridge[2], rim: 0.18, mist: 0 },
      ],
      q = Math.max(96, Math.ceil(c / 2.5)),
      et = Math.min(f, c * 1.15);
    G.forEach((nt, H) => {
      const st = LB(C, q, nt.rough),
        tt = (D) => {
          const Q = H === 2 ? ((D * 7) % 5) * 0.0016 * f : 0;
          return h + f * nt.base - st[D] ** 1.25 * et * nt.amp - Q;
        };
      (r.beginPath(), r.moveTo(0, f));
      for (let D = 0; D < q; D++) r.lineTo((D / (q - 1)) * c, tt(D));
      (r.lineTo(c, f), r.closePath());
      const it = r.createLinearGradient(0, h - et * nt.amp, 0, h + f * (nt.base + 0.1));
      (it.addColorStop(0, nt.top),
        it.addColorStop(1, nt.bottom),
        (r.fillStyle = it),
        r.fill(),
        (r.lineWidth = 1.3),
        (r.strokeStyle = A.rim));
      for (let D = 1; D < q; D++) {
        const Q = (D / (q - 1)) * c,
          $ = Math.max(0, 1 - Math.abs(Q - u) / (c * 0.5));
        $ <= 0.02 ||
          ((r.globalAlpha = $ * $ * nt.rim),
          r.beginPath(),
          r.moveTo(((D - 1) / (q - 1)) * c, tt(D - 1)),
          r.lineTo(Q, tt(D)),
          r.stroke());
      }
      if (((r.globalAlpha = 1), nt.mist > 0)) {
        const D = h + f * (nt.base + 0.02),
          Q = r.createLinearGradient(0, D - f * 0.07, 0, D + f * 0.06);
        (Q.addColorStop(0, "rgba(0, 0, 0, 0)"),
          Q.addColorStop(0.6, A.horizonGlow.replace(/[\d.]+\)$/, `${nt.mist})`)),
          Q.addColorStop(1, "rgba(0, 0, 0, 0)"),
          (r.fillStyle = Q),
          r.fillRect(0, D - f * 0.07, c, f * 0.13));
      }
    });
    const ct = (nt, H, st) => {
      const tt = f - H;
      ((r.fillStyle = "#03050c"),
        r.beginPath(),
        r.moveTo(nt - st, f),
        r.lineTo(nt - st * 0.55, tt + H * 0.22),
        r.lineTo(nt, tt),
        r.lineTo(nt + st * 0.55, tt + H * 0.22),
        r.lineTo(nt + st, f),
        r.closePath(),
        r.fill());
      const it = tt - H * 0.07,
        D = r.createRadialGradient(nt, it, 0, nt, it, H * 0.2);
      (D.addColorStop(0, `rgba(${A.beam}, 0.9)`),
        D.addColorStop(0.18, `rgba(${A.beam}, 0.32)`),
        D.addColorStop(1, `rgba(${A.beam}, 0)`),
        (r.fillStyle = D),
        r.fillRect(nt - H * 0.25, it - H * 0.25, H * 0.5, H * 0.5));
      const Q = Math.max(3, H * 0.03);
      ((r.fillStyle = `rgb(${A.beam})`),
        r.beginPath(),
        r.moveTo(nt, it - Q * 1.6),
        r.lineTo(nt + Q, it),
        r.lineTo(nt, it + Q * 1.6),
        r.lineTo(nt - Q, it),
        r.closePath(),
        r.fill());
    };
    (ct(c * 0.055, f * 0.42, Math.max(14, c * 0.022)), ct(c * 0.955, f * 0.33, Math.max(12, c * 0.018)));
    const rt = r.createLinearGradient(0, h, 0, f);
    (rt.addColorStop(0, "rgba(3, 5, 12, 0)"),
      rt.addColorStop(1, "rgba(3, 5, 12, 0.8)"),
      (r.fillStyle = rt),
      r.fillRect(0, h, c, f - h));
    const mt = r.createRadialGradient(
      c / 2,
      f * 0.45,
      Math.min(c, f) * 0.35,
      c / 2,
      f * 0.45,
      Math.hypot(c, f) * 0.62,
    );
    (mt.addColorStop(0, "rgba(0, 0, 0, 0)"),
      mt.addColorStop(1, "rgba(0, 0, 0, 0.55)"),
      (r.fillStyle = mt),
      r.fillRect(0, 0, c, f));
  }
  function S() {
    const A = Math.max(1, n.clientWidth),
      C = Math.max(1, n.clientHeight);
    if (A === c && C === f) return;
    ((c = A),
      (f = C),
      (d = Math.min(window.devicePixelRatio || 1, c * f > 16e5 ? 1 : 1.5)),
      (e.width = Math.round(c * d)),
      (e.height = Math.round(f * d)),
      (h = f * (c >= f ? 0.74 : 0.8)),
      (u = c * 0.79));
    const R = h4(7),
      I = Math.round(Math.min(260, Math.max(90, (c * f) / 5200)));
    m = [];
    for (let F = 0; F < I; F++) {
      const L = R() ** 1.5 * h * 0.96,
        B = R() > 0.94;
      m.push({
        x: R() * c,
        y: L,
        r: B ? 1.3 + R() * 0.9 : 0.45 + R() * 0.8,
        phase: R() * Math.PI * 2,
        speed: 0.6 + R() * 2.2,
        base: 0.35 + R() * 0.5,
        glint: B,
      });
    }
    x = [];
    const P = Math.round(Math.min(46, Math.max(18, c / 34)));
    for (let F = 0; F < P; F++)
      x.push({
        x: R() * c,
        y: R() * f,
        r: 0.6 + R() * 1.5,
        speed: 6 + R() * 16,
        drift: 4 + R() * 10,
        phase: R() * Math.PI * 2,
      });
    (M(), w(0));
  }
  function b() {
    const A = Math.random() > 0.25,
      C = Math.max(c, f) * (0.55 + Math.random() * 0.45),
      R = (A ? Math.PI * 0.8 : Math.PI * 0.22) + (Math.random() - 0.5) * 0.25;
    p.push({
      x: A ? c * (0.35 + Math.random() * 0.7) : c * Math.random() * 0.5,
      y: -20 + Math.random() * h * 0.3,
      vx: Math.cos(R) * C,
      vy: Math.sin(R) * C,
      life: 0,
      max: 0.55 + Math.random() * 0.6,
      len: Math.max(c, f) * (0.1 + Math.random() * 0.12),
      w: 1.1 + Math.random() * 1.6,
    });
  }
  function w(A) {
    if (!s) return;
    const C = d4[l];
    (s.setTransform(1, 0, 0, 1, 0, 0), s.drawImage(i, 0, 0), s.setTransform(d, 0, 0, d, 0, 0));
    for (const et of m) {
      const ct = et.base * (0.62 + 0.38 * Math.sin(v * et.speed + et.phase));
      if (((s.fillStyle = `rgba(${C.star}, ${ct.toFixed(3)})`), et.glint)) {
        const rt = et.r * (3.2 + 1.2 * Math.sin(v * et.speed * 0.7 + et.phase));
        (s.fillRect(et.x - rt, et.y - 0.4, rt * 2, 0.8), s.fillRect(et.x - 0.4, et.y - rt, 0.8, rt * 2));
      }
      (s.beginPath(), s.arc(et.x, et.y, et.r, 0, Math.PI * 2), s.fill());
    }
    const R = 0.8 + 0.2 * Math.sin(v * 0.9),
      I = h * 0.06,
      P = h + f * 0.04,
      F = Math.max(22, Math.min(c, f) * 0.045),
      L = s.createLinearGradient(0, I, 0, h);
    (L.addColorStop(0, `rgba(${C.beam}, 0)`),
      L.addColorStop(0.75, `rgba(${C.beam}, ${(0.1 * R).toFixed(3)})`),
      L.addColorStop(1, `rgba(${C.beam}, ${(0.3 * R).toFixed(3)})`),
      (s.fillStyle = L),
      s.beginPath(),
      s.moveTo(u - F * 0.22, I),
      s.lineTo(u + F * 0.22, I),
      s.lineTo(u + F, P),
      s.lineTo(u - F, P),
      s.closePath(),
      s.fill());
    const B = s.createLinearGradient(0, I, 0, h);
    (B.addColorStop(0, `rgba(${C.beam}, 0)`),
      B.addColorStop(1, `rgba(${C.beam}, ${(0.85 * R).toFixed(3)})`),
      (s.fillStyle = B),
      s.fillRect(u - 1, I, 2, P - I));
    const G = Math.min(c, f) * 0.26 * R,
      q = s.createRadialGradient(u, h, 0, u, h, G);
    (q.addColorStop(0, `rgba(${C.beam}, 0.62)`),
      q.addColorStop(0.3, `rgba(${C.beam}, 0.2)`),
      q.addColorStop(1, `rgba(${C.beam}, 0)`),
      (s.fillStyle = q),
      s.fillRect(u - G, h - G, G * 2, G * 2),
      C.meteorRate > 0 && ((_ -= A), _ <= 0 && (b(), (_ = (0.5 + Math.random()) / C.meteorRate))),
      (s.lineCap = "round"));
    for (let et = p.length - 1; et >= 0; et--) {
      const ct = p[et];
      ((ct.life += A), (ct.x += ct.vx * A), (ct.y += ct.vy * A));
      const rt = ct.life / ct.max;
      if (rt >= 1 || ct.y > h + f * 0.06) {
        p.splice(et, 1);
        continue;
      }
      const mt = Math.sin(Math.PI * Math.min(1, rt * 1.15)) ** 0.7,
        nt = Math.hypot(ct.vx, ct.vy),
        H = ct.x - (ct.vx / nt) * ct.len,
        st = ct.y - (ct.vy / nt) * ct.len,
        tt = s.createLinearGradient(ct.x, ct.y, H, st);
      (tt.addColorStop(0, `rgba(255, 255, 255, ${mt.toFixed(3)})`),
        tt.addColorStop(0.25, `rgba(${C.meteor}, ${(mt * 0.6).toFixed(3)})`),
        tt.addColorStop(1, `rgba(${C.meteor}, 0)`),
        (s.strokeStyle = tt),
        (s.lineWidth = ct.w),
        s.beginPath(),
        s.moveTo(ct.x, ct.y),
        s.lineTo(H, st),
        s.stroke(),
        (s.fillStyle = `rgba(255, 255, 255, ${mt.toFixed(3)})`),
        s.beginPath(),
        s.arc(ct.x, ct.y, ct.w * 1.1, 0, Math.PI * 2),
        s.fill());
    }
    (s.setTransform(1, 0, 0, 1, 0, 0), s.drawImage(o, 0, 0), s.setTransform(d, 0, 0, d, 0, 0));
    for (const et of x) {
      ((et.y -= et.speed * A * C.moteDir),
        (et.x += Math.sin(v * 0.6 + et.phase) * et.drift * A),
        et.y < -6 && (et.y = f + 6),
        et.y > f + 6 && (et.y = -6));
      const rt = (0.12 + 0.4 * (et.y / f)) * (0.6 + 0.4 * Math.sin(v * 1.7 + et.phase));
      ((s.fillStyle = `rgba(${C.mote}, ${rt.toFixed(3)})`),
        s.beginPath(),
        s.arc(et.x, et.y, et.r, 0, Math.PI * 2),
        s.fill());
    }
  }
  function T(A) {
    if (k) return;
    g = requestAnimationFrame(T);
    const C = A - y;
    if (C < 31) return;
    y = A;
    const R = Math.min(0.1, C / 1e3);
    ((v += R), w(R));
  }
  const E = typeof ResizeObserver < "u" ? new ResizeObserver(S) : null;
  return (
    E?.observe(n),
    window.addEventListener("resize", S),
    S(),
    (g = requestAnimationFrame(T)),
    {
      el: e,
      setMood: (A) => {
        A !== l && ((l = A), (p.length = 0), M());
      },
      dispose: () => {
        ((k = !0),
          cancelAnimationFrame(g),
          E?.disconnect(),
          window.removeEventListener("resize", S),
          e.remove());
      },
    }
  );
}
export { gB, xB, yB, vB, H8, Wx, $8, Jn, G8, Zn, jx, Qe, z, _e, ro, po, T0, V8, W8, EB, j8, AB, za, qx, Sf, q8, Xx, X8, M0, zi, T2, Fp, Hf, Kx };
