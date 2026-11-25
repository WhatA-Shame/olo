// 39-ui-7.js — ui｜18 个顶层语句｜55KB
// 对应 game.pretty.js 第 73220–74450 行
// 关键内容：
//   mG                    小地图：按住拖动可观察战场
//   Rk                    金币不足
//   vG                    竖屏：装备换到第二行，其余列收窄 */
//   bG                    关闭战况
//   K4                    商店按钮 + 快捷购买气泡 / 自动出装提示条（小地图
//   Dm                    boots
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { rn } from './01-audio.js';
import { Se, kr, z0 } from './02-data.js';
import { Jn, Qe, T0, Zn, _e, z } from './32-ui.js';
import { BB, Yh, ln } from './33-data-2.js';
import { Ar, Po, Qx, Tf, Vt, kl } from './34-ui-2.js';
import { D2, JH, Na, Vn, gk, is, vo } from './36-ui-4.js';
import { W2, Y4, hG, j2, pG, uG } from './38-ui-6.js';
import { kartSpec, lookId } from './47-kart.js';

function mG(n) {
  Zn("sf-hud-mini", hG);
  const { host: t } = n,
    e = n.state.map,
    s = e.bound + 3,
    i = document.createElement("canvas"),
    a = z("div", "sf-hud__mini", i);
  (a.setAttribute("data-hud-hit", ""),
    a.setAttribute("role", "img"),
    a.setAttribute("aria-label", "小地图：按住拖动可观察战场"));
  const o = i.getContext("2d"),
    r = document.createElement("canvas"),
    l = JH(t);
  let c = 0,
    f = 1,
    d = 1,
    h = !0,
    u = -1,
    m = -1,
    x = 0;
  const p = new Map(),
    g = new Map(),
    y = [],
    v = { on: !1, x: 0, y: 0, t0: 0 },
    _ = new Map(),
    k = new Set();
  for (const N of n.state.units)
    (N.kind === "tower" || N.kind === "core") && N.team === n.team && k.add(N.id);
  const M = [],
    S = [],
    b = (N) => (N + s) * f,
    w = (N) => (N + s) * f;
  function T(N, J) {
    N.beginPath();
    for (let Z = 0; Z < J.length; Z++)
      Z === 0 ? N.moveTo(b(J[Z].x), w(J[Z].y)) : N.lineTo(b(J[Z].x), w(J[Z].y));
    N.closePath();
  }
  function E(N, J) {
    N.beginPath();
    for (let Z = 0; Z < J.length; Z++)
      Z === 0 ? N.moveTo(b(J[Z].x), w(J[Z].y)) : N.lineTo(b(J[Z].x), w(J[Z].y));
  }
  function A() {
    r.width = r.height = c;
    const N = r.getContext("2d");
    if (!N) return;
    const J = e.bound;
    ((N.fillStyle = "#070d1a"), N.fillRect(0, 0, c, c));
    const Z = b(-J),
      ot = w(-J),
      j = 2 * J * f,
      at = 4 * f;
    (N.save(),
      N.beginPath(),
      N.moveTo(Z + at, ot),
      N.arcTo(Z + j, ot, Z + j, ot + j, at),
      N.arcTo(Z + j, ot + j, Z, ot + j, at),
      N.arcTo(Z, ot + j, Z, ot, at),
      N.arcTo(Z, ot, Z + j, ot, at),
      N.closePath(),
      N.clip());
    const Rt = N.createRadialGradient(c / 2, c / 2, c * 0.05, c / 2, c / 2, c * 0.72);
    (Rt.addColorStop(0, "#2c6a50"),
      Rt.addColorStop(1, "#1b4238"),
      (N.fillStyle = Rt),
      N.fillRect(0, 0, c, c),
      (N.lineCap = "round"),
      (N.lineJoin = "round"),
      E(N, e.river),
      (N.strokeStyle = "#236f95"),
      (N.lineWidth = e.riverWidth * f),
      N.stroke(),
      E(N, e.river),
      (N.strokeStyle = "rgba(110, 205, 235, 0.55)"),
      (N.lineWidth = e.riverWidth * f * 0.5),
      N.stroke());
    for (const V of [e.lanes.top, e.lanes.bot, e.lanes.mid])
      (E(N, V),
        (N.strokeStyle = "#8f7d55"),
        (N.lineWidth = e.laneWidth * f * 0.78),
        N.stroke(),
        E(N, V),
        (N.strokeStyle = "#b9a577"),
        (N.lineWidth = e.laneWidth * f * 0.5),
        N.stroke());
    for (const V of e.bases) {
      const U = V.team === 0 ? "77, 163, 255" : "255, 93, 93";
      (T(N, V.area),
        (N.fillStyle = `rgba(${U}, 0.32)`),
        N.fill(),
        (N.strokeStyle = `rgba(${U}, 0.75)`),
        (N.lineWidth = Math.max(1, 1.2 * d)),
        N.stroke(),
        N.beginPath(),
        N.arc(b(V.fountain.x), w(V.fountain.y), V.fountainRadius * f, 0, Math.PI * 2),
        (N.fillStyle = `rgba(${U}, 0.55)`),
        N.fill());
    }
    N.fillStyle = "rgba(132, 178, 74, 0.9)";
    for (const V of e.bushes) (T(N, V), N.fill());
    for (const V of e.walls)
      (T(N, V),
        (N.fillStyle = "#131d30"),
        N.fill(),
        (N.strokeStyle = "#42557a"),
        (N.lineWidth = Math.max(1, 1.1 * d)),
        N.stroke());
    N.restore();
    const kt = N.createRadialGradient(c / 2, c / 2, c * 0.42, c / 2, c / 2, c * 0.74);
    (kt.addColorStop(0, "rgba(4, 8, 22, 0)"),
      kt.addColorStop(1, "rgba(4, 8, 22, 0.55)"),
      (N.fillStyle = kt),
      N.fillRect(0, 0, c, c));
  }
  function C() {
    const N = x > 0 ? x : i.clientWidth;
    if (N <= 0) return;
    const J = Math.min(2, window.devicePixelRatio || 1),
      Z = Math.max(64, Math.round(N * J));
    ((h = !1),
      Z !== c &&
        ((c = Z),
        (i.width = i.height = Z),
        (f = c / (2 * s)),
        (d = c / 172),
        p.clear(),
        g.clear(),
        A(),
        (m = -1)));
  }
  function R(N) {
    let J = g.get(N);
    if (J) return J;
    g.size > 6 && g.clear();
    const Z = Math.round(8.5 * d),
      ot = Math.ceil(2.4 * d) + 1;
    ((J = document.createElement("canvas")),
      (J.width = Math.ceil(Z * 0.62 * N.length) + ot * 2),
      (J.height = Z + ot * 2));
    const j = J.getContext("2d");
    return j
      ? ((j.font = `700 ${Z}px "DIN Alternate", "Roboto Condensed", sans-serif`),
        (j.textAlign = "center"),
        (j.textBaseline = "middle"),
        (j.lineWidth = Math.max(2, 2.4 * d)),
        (j.strokeStyle = "rgba(6, 10, 22, 0.9)"),
        j.strokeText(N, J.width / 2, J.height / 2),
        (j.fillStyle = "#f4ecff"),
        j.fillText(N, J.width / 2, J.height / 2),
        g.set(N, J),
        J)
      : null;
  }
  function I(N, J) {
    const Z = `${N.heroId}|${J ? "me" : N.team}`;
    let ot = p.get(Z);
    if (ot) return ot;
    const j = l(N.heroId);
    if (!j) return null;
    const at = (J ? 7.4 : 6.2) * d,
      Rt = at + 1.4 * d,
      kt = Math.ceil(Rt * 2) + 2,
      V = kt / 2;
    ((ot = document.createElement("canvas")), (ot.width = ot.height = kt));
    const U = ot.getContext("2d");
    return U
      ? (U.beginPath(),
        U.arc(V, V, Rt, 0, Math.PI * 2),
        (U.fillStyle = "rgba(6, 10, 22, 0.92)"),
        U.fill(),
        U.save(),
        U.beginPath(),
        U.arc(V, V, at, 0, Math.PI * 2),
        U.clip(),
        U.drawImage(j, V - at, V - at, at * 2, at * 2),
        U.restore(),
        U.beginPath(),
        U.arc(V, V, at, 0, Math.PI * 2),
        (U.strokeStyle = J ? Qe.me : W2[N.team]),
        (U.lineWidth = Math.max(1.2, 1.7 * d)),
        U.stroke(),
        p.set(Z, ot),
        ot)
      : null;
  }
  function P(N, J, Z, ot) {
    (N.beginPath(),
      N.moveTo(J, Z - ot),
      N.lineTo(J + ot, Z),
      N.lineTo(J, Z + ot),
      N.lineTo(J - ot, Z),
      N.closePath());
  }
  function F(N, J, Z, ot) {
    (N.beginPath(),
      N.moveTo(J, Z - ot * 1.1),
      N.lineTo(J + ot, Z + ot * 0.8),
      N.lineTo(J - ot, Z + ot * 0.8),
      N.closePath());
  }
  function L(N, J, Z, ot, j) {
    J === "dot"
      ? (N.beginPath(), N.arc(Z, ot, j, 0, Math.PI * 2))
      : J === "triangle"
        ? F(N, Z, ot, j)
        : P(N, Z, ot, j);
  }
  function B(N) {
    const J = n.state.camps;
    for (const Z of e.camps) {
      const ot = J[Z.id] && J[Z.id].campId === Z.id ? J[Z.id] : J.find((Y) => Y.campId === Z.id),
        j = rn[Z.monsterType].epic,
        at = uG[Z.monsterType],
        Rt = at === "dot",
        kt = (j ? 5.2 : Rt ? 2.9 : 2.6) * d,
        V = b(Z.pos.x),
        U = w(Z.pos.y),
        ht = Y4[Z.monsterType];
      if (!ot || ot.alive) {
        (L(N, at, V, U, kt),
          (N.fillStyle = ht),
          N.fill(),
          (N.lineWidth = Math.max(1, 1.2 * d)),
          (N.strokeStyle = "rgba(6, 10, 22, 0.9)"),
          N.stroke(),
          Rt
            ? (N.beginPath(),
              N.arc(V, U, kt + 2 * d, 0, Math.PI * 2),
              (N.strokeStyle = ht),
              (N.lineWidth = Math.max(1, d)),
              N.stroke())
            : j &&
              (L(N, at, V, U, kt + 2.4 * d),
              (N.strokeStyle = ht),
              (N.lineWidth = Math.max(1, d)),
              N.stroke(),
              Z.monsterType === "star_colossus" &&
                (L(N, at, V, U, kt + 4.6 * d), (N.globalAlpha = 0.7), N.stroke(), (N.globalAlpha = 1))));
        continue;
      }
      (L(N, at, V, U, kt),
        (N.fillStyle = "rgba(6, 10, 22, 0.6)"),
        N.fill(),
        (N.strokeStyle = ht),
        (N.globalAlpha = 0.55),
        (N.lineWidth = Math.max(1, d)),
        N.stroke(),
        (N.globalAlpha = 1));
      const lt = Math.max(Z.respawn, Z.firstSpawn, 1),
        O = D2(1 - ot.respawnIn / lt, 0, 1);
      if (
        (N.beginPath(),
        N.arc(V, U, kt + (Rt ? 2 : 1.8) * d, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * O),
        (N.strokeStyle = ht),
        (N.lineWidth = Math.max(1, 1.3 * d)),
        N.stroke(),
        j)
      ) {
        const Y = Math.ceil(ot.respawnIn),
          gt = Y >= 60 ? `${Math.floor(Y / 60)}:${String(Y % 60).padStart(2, "0")}` : String(Y),
          ft = R(gt);
        ft && N.drawImage(ft, Math.round(V - ft.width / 2), Math.round(U + kt + 8 * d - ft.height / 2));
      }
    }
  }
  function G(N) {
    for (const J of S) {
      const Z = b(J.pos.x),
        ot = w(J.pos.y),
        j = W2[J.team === 1 ? 1 : 0];
      if (J.kind === "core") {
        const at = 6.4 * d;
        (P(N, Z, ot, at + 2 * d),
          (N.fillStyle = "rgba(6, 10, 22, 0.85)"),
          N.fill(),
          P(N, Z, ot, at),
          (N.fillStyle = j),
          N.fill(),
          P(N, Z, ot, at * 0.45),
          (N.fillStyle = "#ffffff"),
          N.fill());
      } else {
        const at = 3.3 * d;
        ((N.fillStyle = "rgba(6, 10, 22, 0.9)"),
          N.fillRect(Z - at - d, ot - at - d, (at + d) * 2, (at + d) * 2),
          (N.fillStyle = j),
          N.fillRect(Z - at, ot - at, at * 2, at * 2),
          (N.fillStyle = "rgba(255, 255, 255, 0.85)"),
          N.fillRect(Z - at * 0.38, ot - at * 0.38, at * 0.76, at * 0.76));
      }
    }
  }
  function q(N, J, Z) {
    const ot = b(J.pos.x),
      j = w(J.pos.y),
      at = J.id === n.state.playerId,
      Rt = (at ? 7.4 : 6.2) * d,
      kt = at ? Qe.me : W2[J.team];
    if (at) {
      const U = 0.5 + 0.5 * Math.sin(Z * 4);
      (N.beginPath(),
        N.arc(ot, j, Rt + (3 + U * 2.5) * d, 0, Math.PI * 2),
        (N.strokeStyle = `rgba(183, 243, 107, ${0.55 - U * 0.3})`),
        (N.lineWidth = Math.max(1, 1.4 * d)),
        N.stroke());
      const ht = Math.cos(J.facing),
        lt = Math.sin(J.facing),
        O = Rt + 5.5 * d,
        Y = Rt + 1.2 * d,
        gt = 3.2 * d;
      (N.beginPath(),
        N.moveTo(ot + ht * O, j + lt * O),
        N.lineTo(ot + ht * Y - lt * gt, j + lt * Y + ht * gt),
        N.lineTo(ot + ht * Y + lt * gt, j + lt * Y - ht * gt),
        N.closePath(),
        (N.fillStyle = Qe.me),
        N.fill());
    }
    const V = I(J, at);
    if (V) {
      N.drawImage(V, Math.round(ot - V.width / 2), Math.round(j - V.height / 2));
      return;
    }
    (N.beginPath(),
      N.arc(ot, j, Rt + 1.4 * d, 0, Math.PI * 2),
      (N.fillStyle = "rgba(6, 10, 22, 0.92)"),
      N.fill(),
      N.beginPath(),
      N.arc(ot, j, Rt, 0, Math.PI * 2),
      (N.fillStyle = Se[J.heroId].palette.primary),
      N.fill(),
      (N.strokeStyle = kt),
      (N.lineWidth = Math.max(1.2, 1.7 * d)),
      N.stroke());
  }
  function et(N) {
    const J = window.innerWidth,
      Z = window.innerHeight,
      ot = t.screenToGround(0, 0),
      j = t.screenToGround(J, 0),
      at = t.screenToGround(J, Z),
      Rt = t.screenToGround(0, Z);
    !ot ||
      !j ||
      !at ||
      !Rt ||
      (N.beginPath(),
      N.moveTo(b(ot.x), w(ot.y)),
      N.lineTo(b(j.x), w(j.y)),
      N.lineTo(b(at.x), w(at.y)),
      N.lineTo(b(Rt.x), w(Rt.y)),
      N.closePath(),
      (N.fillStyle = "rgba(255, 255, 255, 0.07)"),
      N.fill(),
      (N.strokeStyle = "rgba(255, 255, 255, 0.85)"),
      (N.lineWidth = Math.max(1, 1.1 * d)),
      N.stroke());
  }
  function ct(N, J) {
    for (let Z = y.length - 1; Z >= 0; Z--) {
      const ot = y[Z],
        j = pG[ot.kind],
        at = (J - ot.t0) / j;
      if (at >= 1) {
        y.splice(Z, 1);
        continue;
      }
      const Rt = b(ot.x),
        kt = w(ot.y),
        V = ot.kind === "kill" ? 2 : 3;
      for (let U = 0; U < V; U++) {
        const ht = at * V - U;
        ht <= 0 ||
          ht >= 1 ||
          (N.beginPath(),
          N.arc(Rt, kt, (3 + ht * (ot.kind === "kill" ? 13 : 18)) * d, 0, Math.PI * 2),
          (N.strokeStyle = ot.color),
          (N.globalAlpha = (1 - ht) * 0.95),
          (N.lineWidth = Math.max(1.2, (2.4 - ht * 1.4) * d)),
          N.stroke());
      }
      if (((N.globalAlpha = Math.min(1, (1 - at) * 2.5)), ot.kind === "kill")) {
        const U = 3.6 * d;
        (N.beginPath(),
          N.moveTo(Rt - U, kt - U),
          N.lineTo(Rt + U, kt + U),
          N.moveTo(Rt + U, kt - U),
          N.lineTo(Rt - U, kt + U),
          (N.lineWidth = Math.max(2.4, 3.4 * d)),
          (N.strokeStyle = "rgba(6, 10, 22, 0.9)"),
          N.stroke(),
          (N.lineWidth = Math.max(1.4, 1.9 * d)),
          (N.strokeStyle = ot.color),
          N.stroke());
      } else
        ot.kind === "alert" &&
          Math.floor((J - ot.t0) * 6) % 2 === 0 &&
          ((N.fillStyle = "#fff1f1"),
          N.fillRect(Rt - d, kt - 11 * d, 2 * d, 6 * d),
          N.fillRect(Rt - d, kt - 4 * d, 2 * d, 2 * d));
      N.globalAlpha = 1;
    }
  }
  function rt(N, J, Z) {
    const ot = b(v.x),
      j = w(v.y);
    if (Z) {
      const Rt = b(Z.pos.x),
        kt = w(Z.pos.y);
      Math.hypot(ot - Rt, j - kt) > 12 * d &&
        (N.save(),
        N.setLineDash([4 * d, 3.5 * d]),
        (N.lineDashOffset = -((J - v.t0) * 14 * d)),
        N.beginPath(),
        N.moveTo(Rt, kt),
        N.lineTo(ot, j),
        (N.lineWidth = Math.max(2.6, 3.2 * d)),
        (N.strokeStyle = "rgba(6, 10, 22, 0.75)"),
        N.stroke(),
        (N.lineWidth = Math.max(1.4, 1.7 * d)),
        (N.strokeStyle = `rgba(${j2}, 0.95)`),
        N.stroke(),
        N.restore());
    }
    const at = 1.2;
    for (let Rt = 0; Rt < 2; Rt++) {
      const kt = ((((J - v.t0) / at + Rt * 0.5) % 1) + 1) % 1;
      (N.beginPath(),
        N.arc(ot, j, (4 + kt * 11) * d, 0, Math.PI * 2),
        (N.strokeStyle = `rgba(${j2}, ${(1 - kt) * 0.95})`),
        (N.lineWidth = Math.max(1.4, (2.6 - kt * 1.4) * d)),
        N.stroke());
    }
    (N.beginPath(),
      N.arc(ot, j, 5.6 * d, 0, Math.PI * 2),
      (N.lineWidth = Math.max(2.4, 2.8 * d)),
      (N.strokeStyle = "rgba(6, 10, 22, 0.8)"),
      N.stroke(),
      (N.lineWidth = Math.max(1.2, 1.5 * d)),
      (N.strokeStyle = `rgb(${j2})`),
      N.stroke());
  }
  function mt(N) {
    if (!o || c === 0) return;
    const J = n.state;
    (o.setTransform(1, 0, 0, 1, 0, 0), o.drawImage(r, 0, 0), B(o), (M.length = 0), (S.length = 0));
    const Z = n.team,
      ot = Math.max(1.6, 2 * d);
    for (const at of J.units)
      if (at.alive) {
        if (at.kind === "tower" || at.kind === "core") {
          S.push(at);
          continue;
        }
        at.kind !== "monster" &&
          ((at.team !== Z && !at.visible[Z]) ||
            (at.kind === "hero"
              ? M.push(at)
              : ((o.fillStyle = at.team === 0 ? "#7fc0ff" : "#ff8a8a"),
                o.fillRect(b(at.pos.x) - ot / 2, w(at.pos.y) - ot / 2, ot, ot))));
      }
    (G(o), et(o));
    let j = null;
    for (const at of M) at.team !== Z && q(o, at, N);
    for (const at of M) at.team === Z && (at.id === J.playerId ? (j = at) : q(o, at, N));
    (v.on && rt(o, N, j), j && q(o, j, N), ct(o, N));
  }
  function nt(N, J, Z) {
    (y.length > 12 && y.shift(), y.push({ x: N.x, y: N.y, t0: n.now, kind: J, color: Z }));
  }
  let H = null;
  const st = (N) => {
      const J = i.getBoundingClientRect(),
        Z = e.bound;
      return {
        x: D2(((N.clientX - J.left) / Math.max(1, J.width)) * 2 * s - s, -Z, Z),
        y: D2(((N.clientY - J.top) / Math.max(1, J.height)) * 2 * s - s, -Z, Z),
      };
    },
    tt = () => {
      H !== null && ((H = null), a.classList.remove("is-peek"), t.setCameraPeek(null));
    },
    it = (N) => {
      if ((N.preventDefault(), N.pointerType === "mouse" && N.button === 2)) {
        n.inputBlocked() || t.command({ type: "moveTo", pos: st(N) });
        return;
      }
      if (!(N.pointerType === "mouse" && N.button !== 0) && H === null) {
        H = N.pointerId;
        try {
          a.setPointerCapture(N.pointerId);
        } catch {}
        (a.classList.add("is-peek"), t.setCameraPeek(st(N)));
      }
    },
    D = (N) => {
      N.pointerId === H && t.setCameraPeek(st(N));
    },
    Q = (N) => {
      N.pointerId === H && tt();
    };
  (a.addEventListener("pointerdown", it),
    a.addEventListener("pointermove", D),
    a.addEventListener("pointerup", Q),
    a.addEventListener("pointercancel", Q),
    a.addEventListener("lostpointercapture", (N) => {
      N.target === a && Q(N);
    }));
  const $ = () => {
    h = !0;
  };
  window.addEventListener("resize", $);
  const ut =
    typeof ResizeObserver == "function"
      ? new ResizeObserver((N) => {
          const J = N.length > 0 ? N[N.length - 1].contentRect.width : 0;
          J > 0 && J !== x && ((x = J), (h = !0));
        })
      : null;
  return (
    ut?.observe(i),
    {
      el: a,
      setGuide(N) {
        if (!N) {
          (v.on && (m = -1), (v.on = !1));
          return;
        }
        const J = !v.on;
        (J && (v.t0 = n.now), (v.on = !0), (v.x = N.x), (v.y = N.y), J && c > 0 && ((m = n.now), mt(n.now)));
      },
      update(N) {
        const J = N.now;
        (h || (!ut && J - u > 1)) && ((u = J), C());
        const Z = y.length > 0 || H !== null || v.on ? 1 / 30 : 1 / 12;
        J - m >= Z && ((m = J), mt(J));
      },
      handleEvent(N, J) {
        switch (N.type) {
          case "heroKill": {
            const Z = J.hero(N.victimId);
            Z && nt(Z.pos, "kill", Z.team === J.team ? Qe.red : Qe.gold200);
            break;
          }
          case "damage": {
            if (!k.has(N.targetId)) break;
            const Z = _.get(N.targetId) ?? -99;
            if (J.now - Z < 5) break;
            const ot = J.unit(N.sourceId);
            if (!ot || ot.kind !== "hero") break;
            (_.set(N.targetId, J.now), nt(N.pos, "alert", Qe.red));
            break;
          }
          case "towerDestroyed":
            (k.delete(N.unitId), nt(N.pos, "tower", N.team === J.team ? Qe.red : Qe.gold200));
            break;
          case "monsterSpawn":
            rn[N.monsterType].epic && nt(N.pos, "epic", Y4[N.monsterType]);
            break;
          case "epicSlain":
            nt(N.pos, "epic", N.team === J.team ? Qe.gold200 : Qe.red);
            break;
        }
      },
      dispose() {
        (tt(), ut?.disconnect(), window.removeEventListener("resize", $), p.clear(), g.clear());
      },
    }
  );
}

function Dm(n) {
  let t = null;
  for (const e of n) e && ln[e].category === "boots" && (t = e);
  return t;
}

function $f(n) {
  const t = Se[n.heroId].build,
    e = n.items,
    s = Dm(e),
    i = e.indexOf(null) < 0,
    a = e.map(() => !1);
  let o = !1;
  for (const r of t) {
    const l = ln[r];
    if (l.category === "boots") {
      if (s && (ln[s].tier === 2 || l.tier === 1)) continue;
      return o && !s ? null : r;
    }
    let c = !1;
    for (let f = 0; f < e.length; f++)
      if (!a[f] && e[f] === r) {
        ((a[f] = !0), (c = !0));
        break;
      }
    if (!c) {
      if (!i) return r;
      o = !0;
    }
  }
  return null;
}

// 合成：背包里凑齐 from 列出的组件时，买成品只需付差价。
// 返回 { slots, value }（slots = 要消耗的装备栏下标，value = 这些组件的总价），凑不齐返回 null。
function Sk(n, t) {
  const e = ln[t];
  if (!e || !e.from || !e.from.length) return null;
  const a = n.items,
    used = [];
  let v = 0;
  for (const c of e.from) {
    let k = -1;
    for (let i = 0; i < a.length; i++)
      if (a[i] === c && !used.includes(i)) {
        k = i;
        break;
      }
    if (k < 0) return null;
    (used.push(k), (v += ln[c].cost));
  }
  return { slots: used, value: v };
}

function Gf(n, t) {
  const e = ln[t],
    s = Sk(n, t);
  if (s) return Math.max(0, e.cost - s.value);
  if (e.category === "boots") {
    const i = Dm(n.items);
    if (i) return e.cost - Math.floor(ln[i].cost * Yh);
  }
  return e.cost;
}

function zm(n, t) {
  const e = ln[t];
  if (Sk(n, t)) return !0; // 能合成就不需要空格子
  if (e.category === "boots") {
    const s = Dm(n.items);
    if (s) return e.tier !== 1 && s !== t;
  }
  return n.items.indexOf(null) >= 0;
}

function Tk(n, t) {
  return Se[n].build.includes(t);
}

function Yd(n) {
  const t = Se[n.heroId].build,
    e = n.items,
    s = Dm(e),
    i = $f(n),
    a = [];
  let o = null,
    r = null;
  for (const c of t) {
    const f = ln[c];
    f.category === "boots" && (f.tier === 1 ? (o = o ?? c) : (r = c));
  }
  if (o || r) {
    const c = r ?? o,
      f = r !== null;
    let d;
    s && (ln[s].tier === 2 || !f) ? (d = "done") : (d = s ? "base" : "todo");
    const h = d === "done" ? null : d === "base" ? c : (o ?? c);
    a.push({
      finalId: c,
      baseId: f ? o : null,
      stage: d,
      buyId: h,
      cost: h ? Gf(n, h) : 0,
      next: !1,
      order: 1,
    });
  }
  const l = e.map(() => !1);
  for (const c of t) {
    if (ln[c].category === "boots") continue;
    let f = !1;
    for (let d = 0; d < e.length; d++)
      if (!l[d] && e[d] === c) {
        ((l[d] = !0), (f = !0));
        break;
      }
    a.push({
      finalId: c,
      baseId: null,
      stage: f ? "done" : "todo",
      buyId: f ? null : c,
      cost: f ? 0 : Gf(n, c),
      next: !1,
      order: a.length + 1,
    });
  }
  if (i) {
    const c = a.find((f) => f.buyId === i);
    c && (c.next = !0);
  }
  return a;
}

function gG(n) {
  return Yd(n).every((t) => t.stage === "done");
}

function q2(n) {
  const t = $f(n);
  return !t || !zm(n, t) ? (gG(n) ? "done" : "paused") : n.gold >= Gf(n, t) ? "ready" : "saving";
}

const xG = Math.min(...kr.flatMap((n) => Se[n].build.map((t) => ln[t].cost))),
  Ek = (n) => Math.floor(ln[n].cost * Yh);

function Ak(n) {
  for (const t of n.items) if (t && ln[t].category === "boots") return t;
  return null;
}

function M1(n, t) {
  const e = ln[t];
  let s = null;
  if (e.category === "boots") {
    const a = Ak(n);
    if (a) {
      if (a === t) return { ok: !1, block: "boots_same", cost: e.cost, replaces: null };
      if (e.tier === 1) return { ok: !1, block: "boots_owned", cost: e.cost, replaces: null };
      s = a;
    }
  }
  const i = Gf(n, t);
  return zm(n, t)
    ? n.gold < i
      ? { ok: !1, block: "gold", cost: i, replaces: s }
      : { ok: !0, block: "ok", cost: i, replaces: s }
    : { ok: !1, block: "full", cost: i, replaces: s };
}

const Rk = { gold: "金币不足", full: "装备栏已满", boots_owned: "已有鞋子", boots_same: "已拥有" };

function X2(n) {
  return $f(n);
}

function yG(n) {
  const t = $f(n);
  if (!t || !zm(n, t)) return -1;
  const e = Gf(n, t);
  return e <= 0 ? 1 : Math.max(0, Math.min(1, n.gold / e));
}

const vG = Jn(`
.sf-hud__sb { position: absolute; inset: 0; z-index: 6; display: none; place-items: center; pointer-events: none;
  padding: max(8u, var(--sf-safe-t)) max(12u, var(--sf-safe-r)) max(8u, var(--sf-safe-b)) max(12u, var(--sf-safe-l)); }
.sf-hud__sb.is-open { display: grid; }
.sf-hud__sb.is-pinned { pointer-events: auto; background: rgba(3, 6, 16, 0.4); }
.sf-hud__sb-panel { display: flex; flex-direction: column; width: min(100%, 780u); max-height: 100%; min-height: 0; animation: sf-pop-in 0.2s var(--sf-ease-out) both; }
.sf-hud__sb-head { display: flex; align-items: center; gap: 12u; flex: none; padding: 7u 8u 5u 20u; box-shadow: inset 0 -1px 0 var(--sf-c-line-strong); }
.sf-hud__sb-title { margin: 0; font-size: var(--sf-fs-lg); font-weight: 800; letter-spacing: 0.24em; line-height: 1.3; }
.sf-hud__sb-time { display: inline-flex; align-items: center; gap: 4u; font-size: var(--sf-fs-sm); font-weight: 700; color: var(--sf-c-text-2); margin-right: auto; }
.sf-hud__sb-time .sf-i { width: 1.1em; height: 1.1em; vertical-align: 0; }
.sf-hud__sb-hint { font-size: var(--sf-fs-xs); color: var(--sf-c-text-3); }
.sf-hud__sb-close { display: none; }
.sf-hud__sb.is-pinned .sf-hud__sb-close { display: inline-grid; }
.sf-hud__sb.is-pinned .sf-hud__sb-hint { display: none; }
.sf-hud__sb-body { flex: 1; min-height: 0; padding: 6u 12u 10u; --cols: minmax(0, 1.5fr) minmax(64u, 0.8fr) minmax(40u, 0.5fr) minmax(52u, 0.6fr) auto; }
.sf-hud__sb-cols, .sf-hud__sb-row { display: grid; grid-template-columns: var(--cols); align-items: center; gap: 0 10u; padding: 0 8u 0 6u; }
.sf-hud__sb-cols { height: 20u; font-size: var(--sf-fs-xs); color: var(--sf-c-text-3); letter-spacing: 0.08em; }
.sf-hud__sb-cols span { white-space: nowrap; }
.sf-hud__sb-short { display: none; }
.sf-hud__sb-cols > :not(:first-child), .sf-hud__sb-row > :not(:first-child) { text-align: center; justify-self: center; }
.sf-hud__sb-team { display: flex; align-items: center; gap: 12u; height: 25u; margin-top: 3u; padding: 0 10u; border-radius: 5u 5u 0 0; font-size: var(--sf-fs-sm); font-weight: 800; letter-spacing: 0.12em; }
.sf-hud__sb-team.is-blue { color: #9ccfff; background: linear-gradient(90deg, rgba(34, 104, 214, 0.5), rgba(34, 104, 214, 0.06)); box-shadow: inset 3px 0 0 var(--sf-c-blue); }
.sf-hud__sb-team.is-red { color: #ff9c9c; background: linear-gradient(90deg, rgba(196, 44, 58, 0.5), rgba(196, 44, 58, 0.06)); box-shadow: inset 3px 0 0 var(--sf-c-red); }
.sf-hud__sb-team span { display: inline-flex; align-items: center; gap: 4u; font-size: var(--sf-fs-xs); font-weight: 700; letter-spacing: 0.02em; color: var(--sf-c-text-2); }
.sf-hud__sb-team .sf-i { width: 1.1em; height: 1.1em; vertical-align: 0; }
.sf-hud__sb-row { height: 36u; background: rgba(20, 34, 72, 0.4); box-shadow: inset 0 -1px 0 var(--sf-c-line); font-size: var(--sf-fs-md); font-weight: 700; }
.sf-hud__sb-row:nth-child(odd) { background: rgba(20, 34, 72, 0.22); }
.sf-hud__sb-row.is-me { background: linear-gradient(90deg, rgba(183, 243, 107, 0.2), rgba(183, 243, 107, 0.04)); box-shadow: inset 0 0 0 1px rgba(183, 243, 107, 0.5); }
.sf-hud__sb-hero { display: flex; align-items: center; gap: 9u; min-width: 0; }
.sf-hud__sb-hero .sf-hud__face { --sz: 28u; }
.sf-hud__sb-facebox { position: relative; flex: none; }
.sf-hud__sb-lv { position: absolute; right: -5u; bottom: -4u; display: grid; place-items: center; min-width: max(14px, 15u); height: max(14px, 15u); padding: 0 2u; border-radius: 99px; font-size: max(10px, 10.5u); font-weight: 800; line-height: 1; color: #2b1a04; background: var(--sf-grad-gold); box-shadow: 0 0 0 1.5px #0a1128; }
.sf-hud__sb-name { display: inline-flex; align-items: center; gap: 3u; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sf-hud__sb-rolei { display: none; flex: none; width: 1.15em; height: 1.15em; vertical-align: 0; color: var(--role); }
.sf-hud__sb-respawn { display: none; align-items: center; gap: 3u; flex: none; font-size: var(--sf-fs-xs); color: #ff9c9c; }
.sf-hud__sb-respawn .sf-i { width: 1.1em; height: 1.1em; vertical-align: 0; }
.sf-hud__sb-row.is-dead .sf-hud__sb-respawn { display: inline-flex; }
.sf-hud__sb-row.is-dead .sf-hud__sb-name { color: var(--sf-c-text-3); }
.sf-hud__sb-row.is-dead .sf-hud__face > img { filter: grayscale(1) brightness(0.6); }
.sf-hud__sb-kda i { font-style: normal; color: var(--sf-c-text-4); margin: 0 3u; }
.sf-hud__sb-kda .is-d { color: #ff8d8d; }
.sf-hud__sb-kda .is-a { color: var(--sf-c-text-2); }
.sf-hud__sb-gold { color: var(--sf-c-gold-200); }
.sf-hud__sb-items { display: flex; gap: 3u; }
.sf-hud__sb-items .sf-slot { --sf-slot: 25u; border-radius: 4u; box-shadow: 0 0 0 1px rgba(224, 177, 96, 0.5); }
.sf-hud__sb-items .sf-slot--empty { box-shadow: inset 0 0 0 1px var(--sf-c-line); }

@media (orientation: landscape) and (max-height: 470px) {
  .sf-hud__sb-row { height: 31u; }
  .sf-hud__sb-team { height: 22u; }
  .sf-hud__sb-head { padding-top: 4u; padding-bottom: 3u; }
  .sf-hud__sb-body { padding-bottom: 6u; }
  .sf-hud__sb-hero .sf-hud__face { --sz: 25u; }
  .sf-hud__sb-items .sf-slot { --sf-slot: 23u; }
}
/* 竖屏：装备换到第二行，其余列收窄 */
@media (orientation: portrait) {
  .sf-hud__sb-body { padding: 6u 8u 10u; --cols: minmax(0, 1.5fr) minmax(70u, 0.9fr) minmax(34u, 0.4fr) minmax(46u, 0.5fr); }
  .sf-hud__sb-cols > :last-child { display: none; }
  .sf-hud__sb-long { display: none; }
  .sf-hud__sb-short { display: inline; }
  .sf-hud__sb-row { height: auto; padding-top: 5u; padding-bottom: 5u; row-gap: 4u; }
  .sf-hud__sb-items { grid-column: 1 / -1; justify-self: start !important; padding-left: 37u; }
  .sf-hud__sb-items .sf-slot { --sf-slot: 22u; }
  .sf-hud__sb-hint { display: none; }
  .sf-hud__sb-name .sf-heroname__role { display: none; }
  .sf-hud__sb-rolei { display: inline-block; }
}
`);

function bG(n) {
  Zn("sf-hud-sb", vG);
  let t = !1,
    e = !1,
    s = -1;
  const i = z("span", "sf-num", "00:00"),
    a = Vn(i, gk),
    o = T0({
      icon: Vt("close"),
      label: "关闭战况",
      quiet: !0,
      sound: "back",
      cls: "sf-hud__sb-close",
      onClick: () => n.actions.setScoreboard(!1, !1),
    }),
    r = z(
      "header",
      "sf-hud__sb-head",
      z("h2", "sf-hud__sb-title sf-metal", "战况"),
      z("span", "sf-hud__sb-time", _e(Vt("clock")), i),
      z("span", "sf-hud__sb-hint", "松开 Tab 关闭"),
      o,
    ),
    l = z(
      "div",
      "sf-hud__sb-body sf-scroll",
      z(
        "div",
        "sf-hud__sb-cols",
        z("span", null, "英雄"),
        z(
          "span",
          null,
          z("span", "sf-hud__sb-long", "击杀 / 阵亡 / 助攻"),
          z("span", "sf-hud__sb-short", "杀 / 亡 / 助"),
        ),
        z("span", null, "补兵"),
        z("span", null, "经济"),
        z("span", null, "装备"),
      ),
    ),
    c = new Map(),
    f = [];
  function d(g) {
    // 玩家带角色皮时，战况里的名字也换成皮的；定位/图标仍按它借的那个英雄
    const A = lookId(g.heroId, g.isPlayer),
      C = kartSpec(A),
      y = Se[C?.kit ?? A],
      v = _e(Ar(y.role), "sf-hud__sb-rolei"),
      _ = z("span", "sf-hud__sb-name", v, Qx(A));
    return (
      _.style.setProperty("--role", Tf[y.role]),
      _.setAttribute("aria-label", C?.name ?? z0(y)),
      _
    );
  }
  function h(g) {
    const y = z("span", "sf-hud__sb-lv sf-num"),
      v = z("span", "sf-num"),
      _ = z("b", "sf-num"),
      k = z("b", "sf-num is-d"),
      M = z("b", "sf-num is-a"),
      S = z("span", "sf-num"),
      b = z("span", "sf-hud__sb-gold sf-num"),
      w = z("span", "sf-hud__sb-items"),
      T = [];
    for (let A = 0; A < g.items.length; A++) {
      const C = z("span", "sf-slot sf-slot--empty");
      (T.push(C), w.appendChild(C));
    }
    const E = z(
      "div",
      `sf-hud__sb-row${g.isPlayer ? " is-me" : ""}`,
      z(
        "span",
        "sf-hud__sb-hero",
        z("span", "sf-hud__sb-facebox", Na(n.host, g, n.team), y),
        d(g),
        g.isPlayer ? z("span", "sf-badge sf-badge--me", "你") : null,
        z("span", "sf-hud__sb-respawn", _e(Vt("hourglass")), v),
      ),
      z("span", "sf-hud__sb-kda", _, z("i", null, "/"), k, z("i", null, "/"), M),
      S,
      b,
      w,
    );
    return {
      el: E,
      setLv: Vn(y),
      setK: Vn(_),
      setD: Vn(k),
      setA: Vn(M),
      setCs: Vn(S),
      setGold: Vn(b, kl),
      setRespawn: Vn(v, (A) => `${A}秒`),
      setDead: is(E, "is-dead"),
      slots: T,
      items: g.items.map(() => null),
    };
  }
  const u = n.team === 0 ? [0, 1] : [1, 0];
  for (const g of u) {
    const y = g === n.team,
      v = z("b", "sf-num"),
      _ = z("b", "sf-num"),
      k = z("b", "sf-num");
    (l.appendChild(
      z(
        "div",
        `sf-hud__sb-team ${y ? "is-blue" : "is-red"}`,
        y ? "我方" : "敌方",
        z("span", null, _e(Vt("kill")), v),
        z("span", null, _e(Vt("tower")), _),
        z("span", null, _e(Vt("gold")), k),
      ),
    ),
      (f[g] = { kills: Vn(v), towers: Vn(_), gold: vo(k) }));
    const M = z("div");
    for (const S of n.state.heroes) {
      if (S.team !== g) continue;
      const b = h(S);
      (c.set(S.id, b), M.appendChild(b.el));
    }
    l.appendChild(M);
  }
  const m = z("div", "sf-hud__sb-panel sf-panel", r, l),
    x = z("div", "sf-hud__sb", m);
  x.addEventListener("pointerdown", (g) => {
    e && g.target === x && n.actions.setScoreboard(!1, !1);
  });
  function p() {
    const g = n.state;
    a(Math.floor(g.time));
    for (const y of u) {
      const v = g.teams[y];
      (f[y].kills(v.kills), f[y].towers(v.towersDestroyed));
      let _ = 0;
      for (const k of g.heroes) k.team === y && (_ += k.goldEarned);
      f[y].gold(kl(_));
    }
    for (const y of g.heroes) {
      const v = c.get(y.id);
      if (v) {
        (v.setLv(y.level),
          v.setK(y.kills),
          v.setD(y.deaths),
          v.setA(y.assists),
          v.setCs(y.cs),
          v.setGold(Math.floor(y.goldEarned)),
          v.setDead(!y.alive),
          y.alive || v.setRespawn(Math.ceil(y.respawnIn)));
        for (let _ = 0; _ < v.slots.length; _++) {
          const k = y.items[_] ?? null;
          k !== v.items[_] &&
            ((v.items[_] = k),
            (v.slots[_].innerHTML = k ? Po(k) : ""),
            v.slots[_].classList.toggle("sf-slot--empty", !k));
        }
      }
    }
  }
  return {
    el: x,
    isOpen: () => t,
    isPinned: () => t && e,
    setOpen(g, y) {
      (g === t && y === e) ||
        ((t = g),
        (e = g && y),
        x.classList.toggle("is-open", t),
        x.classList.toggle("is-pinned", e),
        t && ((s = n.now), p()));
    },
    update(g) {
      !t || g.now - s < 0.25 || ((s = g.now), p());
    },
  };
}

const K4 = `
  .sf-hud__shop-grid { flex: none; grid-template-columns: repeat(2, minmax(0, 1fr)); grid-template-rows: none; grid-auto-rows: auto; gap: 6u; }
  .sf-hud__card { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; grid-template-rows: auto auto; align-items: center; gap: 3u 8u; min-height: max(50px, 56u); padding: 5u 8u 5u 9u; }
  .sf-hud__card-top { grid-column: 1; grid-row: 1 / span 2; position: relative; margin: 0; gap: 0; }
  .sf-hud__card .sf-slot { --sf-slot: max(36px, 42u); }
  .sf-hud__card-no { position: absolute; left: -6px; top: -5px; z-index: 1; width: 16px; height: 16px; font-size: 10px; }
  .sf-hud__card-dots { position: absolute; left: 50%; bottom: -5px; z-index: 1; transform: translateX(-50%); padding: 2px 4px; border-radius: 99px; background: rgba(4, 8, 22, 0.92); }
  .sf-hud__card-name { grid-column: 2 / span 2; grid-row: 1; font-size: var(--sf-fs-sm); letter-spacing: 0; }
  .sf-hud__card-brief { display: none; }
  .sf-hud__card-price { grid-column: 2; grid-row: 2; margin: 0; padding: 0; font-size: var(--sf-fs-sm); }
  .sf-hud__card-tag { position: static; grid-column: 3; grid-row: 2; justify-self: end; }
  .sf-hud__card.is-done .sf-hud__card-tag { grid-column: 2 / span 2; justify-self: start; }
  .sf-hud__card-tag-more { display: none; }
  .sf-hud__dt-brief { font-size: var(--sf-fs-sm); }
  .sf-hud__dt-stats { flex-direction: row; flex-wrap: wrap; gap: 2u 14u; margin-top: 5u; padding-top: 5u; }
  .sf-hud__dt-stat { justify-content: flex-start; gap: 5u; }
  .sf-hud__dt-nopassive { display: none; }
  .sf-hud__dt-passive { margin-top: 5u; padding: 5u 8u; font-size: var(--sf-fs-xs); line-height: 1.45; }
  .sf-hud__dt-active { margin-top: 5u; padding: 5u 8u; font-size: var(--sf-fs-xs); line-height: 1.45; }
  .sf-hud__dt-active small { display: none; }
`,
  _G = Jn(`
/* ── 商店按钮 + 快捷购买气泡 / 自动出装提示条（小地图下方） ── */
.sf-hud__shopbar { position: absolute; left: calc(var(--hud-l) + 4u); top: calc(var(--hud-t) + var(--hud-mini) + 12u); z-index: 3; display: flex; align-items: center; gap: 14u; }
/* 商店按钮：金色圆钮。金币数在右上角与状态栏里已经有了，这里不再重复 */
.sf-hud__shopbtn {
  --p: 0; position: relative; display: grid; place-items: center; flex: none; width: max(40px, 46u); height: max(40px, 46u); padding: 0; margin: 0; border: 0; border-radius: 50%; cursor: pointer;
  color: #2b1a04; background: var(--sf-grad-gold);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.65), 0 0 0 1px #6b4614, 0 0 0 max(3px, 4u) rgba(8, 13, 31, 0.82), 0 0 0 max(4px, 5u) rgba(232, 199, 122, 0.55), 0 4u 12u rgba(2, 4, 12, 0.5);
  transition: transform 0.1s var(--sf-ease-out), filter 0.12s linear;
}
@media (hover: hover) { .sf-hud__shopbtn:hover { filter: brightness(1.12); } }
.sf-hud__shopbtn:active { transform: scale(0.93); }
.sf-hud__shopbtn > .sf-i { width: 58%; height: 58%; }
.sf-hud__shopbtn .sf-hud__key { right: -6u; top: -6u; }
.sf-hud__shopbtn.is-open { box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.65), 0 0 0 1px #6b4614, 0 0 0 max(3px, 4u) rgba(8, 13, 31, 0.82), 0 0 0 max(4px, 5u) #fff4d6, 0 0 16u rgba(255, 214, 130, 0.8); }
/* 自动出装关着、有推荐装备可买时：按钮外圈跟着呼吸 */
.sf-hud__shopbtn.is-ready::after { content: ''; position: absolute; inset: -7u; border-radius: 50%; pointer-events: none; box-shadow: 0 0 0 1.5px rgba(255, 231, 173, 0.85); animation: sf-hud-quick-pulse 1.4s ease-out infinite; }
/* 自动出装开着：外圈画攒钱进度环(当前金币 / 下一件的花费)，快满了就知道要自动买了 */
.sf-hud__shopbtn.is-saving::before {
  content: ''; position: absolute; inset: calc(-1 * max(6px, 7.5u)); border-radius: 50%; pointer-events: none;
  background: conic-gradient(#ffe7ad calc(var(--p) * 360deg), rgba(150, 178, 235, 0.3) 0);
  -webkit-mask: radial-gradient(farthest-side, rgba(0, 0, 0, 0) calc(100% - max(3px, 3.5u)), #000 calc(100% - max(3px, 3.5u) + 0.6px));
  mask: radial-gradient(farthest-side, rgba(0, 0, 0, 0) calc(100% - max(3px, 3.5u)), #000 calc(100% - max(3px, 3.5u) + 0.6px));
  filter: drop-shadow(0 0 3u rgba(2, 4, 12, 0.8));
}

.sf-hud__quick {
  position: relative; display: none; align-items: center; gap: 7u; height: max(40px, 46u); padding: 0 12u 0 4u; margin: 0; border: 0; border-radius: 9u; cursor: pointer;
  background: linear-gradient(180deg, rgba(64, 48, 14, 0.94), rgba(22, 16, 6, 0.95)); color: var(--sf-c-gold-100); text-align: left;
  box-shadow: inset 0 0 0 1px #f3cf85, 0 0 0 1px rgba(8, 13, 31, 0.9), 0 0 16u rgba(255, 214, 130, 0.55), 0 4u 12u rgba(2, 4, 12, 0.5);
  animation: sf-hud-quick-in 0.35s var(--sf-ease-spring) both;
}
.sf-hud__quick.is-on { display: inline-flex; }
.sf-hud__quick:active { transform: scale(0.95); }
.sf-hud__quick::before { content: ''; position: absolute; inset: -3u; border-radius: 12u; pointer-events: none; box-shadow: 0 0 0 1.5px rgba(255, 231, 173, 0.8); animation: sf-hud-quick-pulse 1.4s ease-out infinite; }
.sf-hud__quick .sf-slot, .sf-hud__autobuy .sf-slot { --sf-slot: max(32px, 38u); border-radius: 7u; }
.sf-hud__quick-text { display: flex; flex-direction: column; gap: 2u; }
.sf-hud__quick-tag, .sf-hud__autobuy-tag { font-size: max(10px, 11u); font-weight: 800; letter-spacing: 0.08em; color: #2b1a04; background: var(--sf-grad-gold); border-radius: 3u; padding: 0 5u; align-self: flex-start; line-height: 1.5; white-space: nowrap; }
.sf-hud__quick-price { display: inline-flex; align-items: center; gap: 3u; font-size: var(--sf-fs-sm); font-weight: 800; line-height: 1; white-space: nowrap; }
.sf-hud__quick-price .sf-i { width: 1.1em; height: 1.1em; vertical-align: 0; }
.sf-hud__quick-name { margin-right: 2u; }
@keyframes sf-hud-quick-in { from { opacity: 0; transform: translateX(-16u) scale(0.8); } to { opacity: 1; transform: none; } }
@keyframes sf-hud-quick-pulse { 0% { opacity: 0.9; transform: scale(0.96); } 100% { opacity: 0; transform: scale(1.12); } }

/* 自动出装提示条：沿用气泡的金色底板与位置，但不可点、没有呼吸光圈，停一会儿自己淡出 */
.sf-hud__autobuy {
  position: relative; display: none; align-items: center; gap: 7u; height: max(40px, 46u); padding: 0 13u 0 4u; border-radius: 9u; pointer-events: none;
  background: linear-gradient(180deg, rgba(64, 48, 14, 0.94), rgba(22, 16, 6, 0.95)); color: var(--sf-c-gold-100);
  box-shadow: inset 0 0 0 1px rgba(243, 207, 133, 0.7), 0 0 0 1px rgba(8, 13, 31, 0.9), 0 4u 12u rgba(2, 4, 12, 0.5);
}
.sf-hud__autobuy.is-on { display: inline-flex; animation: sf-hud-quick-in 0.35s var(--sf-ease-spring) both; }
.sf-hud__autobuy.is-on.is-out { animation: sf-hud-autobuy-out 0.3s linear both; }
.sf-hud__autobuy-ico { display: grid; place-items: center; flex: none; width: max(32px, 38u); height: max(32px, 38u); border-radius: 7u; color: var(--sf-c-gold-200); background: rgba(255, 214, 130, 0.1); box-shadow: inset 0 0 0 1px rgba(243, 207, 133, 0.4); }
.sf-hud__autobuy-ico > .sf-i { width: 60%; height: 60%; }
.sf-hud__autobuy-text { display: flex; flex-direction: column; gap: 3u; }
.sf-hud__autobuy-name { font-size: var(--sf-fs-sm); font-weight: 800; line-height: 1.1; white-space: nowrap; }
.sf-hud__autobuy.is-warn { color: #ffe2b0; box-shadow: inset 0 0 0 1px rgba(255, 184, 77, 0.8), 0 0 0 1px rgba(8, 13, 31, 0.9), 0 4u 12u rgba(2, 4, 12, 0.5); }
.sf-hud__autobuy.is-warn .sf-hud__autobuy-tag { background: linear-gradient(180deg, #ffe0ae, #ffb454); }
.sf-hud__autobuy.is-warn .sf-hud__autobuy-ico { color: var(--sf-c-amber); background: rgba(255, 184, 77, 0.12); box-shadow: inset 0 0 0 1px rgba(255, 184, 77, 0.45); }
@keyframes sf-hud-autobuy-out { to { opacity: 0; transform: translateY(-5u); } }

/* 面板开着时提示条的停靠位：面板上沿的正上方、水平居中(top 由脚本按面板位置写入)；放不下就不显示 */
.sf-hud__shop-dock { position: absolute; left: 0; right: 0; top: 0; z-index: 1; display: flex; justify-content: center; pointer-events: none; }
.sf-hud__shop-dock.is-off { visibility: hidden; }

/* ── 商店面板 ── */
.sf-hud__shop { position: absolute; inset: 0; z-index: 7; display: none; place-items: center; pointer-events: auto;
  padding: max(10u, var(--sf-safe-t)) max(12u, var(--sf-safe-r)) max(10u, var(--sf-safe-b)) max(12u, var(--sf-safe-l)); background: rgba(3, 6, 16, 0.5); }
.sf-hud__shop.is-open { display: grid; animation: sf-fade-in 0.16s linear both; }
.sf-hud__shop-panel { display: flex; flex-direction: column; width: min(100%, 960u); height: min(100%, 540u); min-height: 0; animation: sf-pop-in 0.26s var(--sf-ease-out) both; }
.sf-hud__shop-head { display: flex; align-items: center; gap: 10u; flex: none; padding: 5u 8u 0 20u; box-shadow: inset 0 -1px 0 var(--sf-c-line-strong); }
.sf-hud__shop-title { margin: 0; font-size: var(--sf-fs-xl); font-weight: 800; letter-spacing: 0.2em; line-height: 1.2; white-space: nowrap; }
.sf-hud__shop-head .sf-tabs { flex: 1; box-shadow: none; min-width: 0; }
.sf-hud__shop-head .sf-tab { padding: 0 14u; }
.sf-hud__shop-gold { color: var(--sf-c-gold-200); font-size: var(--sf-fs-md); }
/* 自动出装开关：上行「自动出装 + 开关」，下行一句小字说明当前状态。整块都是点击热区 */
.sf-hud__shop-auto { flex: none; display: flex; flex-direction: column; align-items: flex-end; gap: 2u; padding: 3u 7u; margin: 0; border: 0; border-radius: 7u; background: none; cursor: pointer; }
.sf-hud__shop-auto-row { display: flex; align-items: center; gap: 8u; font-size: var(--sf-fs-sm); font-weight: 700; letter-spacing: 0.06em; color: var(--sf-c-text); white-space: nowrap; }
.sf-hud__shop-auto .sf-toggle { --sf-tg-h: max(22px, 24u); --sf-tg-w: max(40px, 44u); }
.sf-hud__shop-auto-hint { font-size: max(10px, 11u); line-height: 1.25; color: var(--sf-c-text-3); white-space: nowrap; }
.sf-hud__shop-auto.is-on .sf-hud__shop-auto-hint { color: var(--sf-c-cyan-300); }
.sf-hud__shop-auto.is-warn .sf-hud__shop-auto-hint { color: var(--sf-c-amber); }
.sf-hud__shop-auto.is-flash { animation: sf-hud-auto-flash 0.9s ease-out; }
@keyframes sf-hud-auto-flash { 0% { background: rgba(255, 214, 130, 0.4); } 100% { background: rgba(255, 214, 130, 0); } }

.sf-hud__shop-body { flex: 1; min-height: 0; display: grid; grid-template-columns: minmax(0, 1fr) max(232px, 268u); }
.sf-hud__shop-list { display: flex; flex-direction: column; min-height: 0; padding: 10u 12u 12u 16u; }
.sf-hud__shop-prog { flex: none; display: flex; align-items: center; gap: 10u; min-width: 0; margin-bottom: 8u; font-size: var(--sf-fs-sm); color: var(--sf-c-text-2); white-space: nowrap; }
.sf-hud__shop-prog-who { min-width: 0; overflow: hidden; text-overflow: ellipsis; }
.sf-hud__shop-prog-who > b { color: var(--sf-c-text); font-weight: 700; }
.sf-hud__shop-prog-n { flex: none; margin-left: auto; }
.sf-hud__shop-prog-n > b { color: var(--sf-c-gold-200); }
.sf-hud__shop-steps { flex: none; display: flex; align-items: center; gap: 3u; }
.sf-hud__shop-steps > i { width: 18u; height: max(4px, 5u); border-radius: 3u; background: rgba(4, 8, 22, 0.8); box-shadow: inset 0 0 0 1px var(--sf-c-line-strong); }
.sf-hud__shop-steps > i.is-done { background: var(--sf-grad-gold); box-shadow: 0 0 6u rgba(255, 214, 130, 0.6); }
/* 鞋那一格：草鞋已有、进阶鞋还没买 = 半格 */
.sf-hud__shop-steps > i.is-half { background: linear-gradient(90deg, #f3cf85 0 50%, rgba(4, 8, 22, 0.8) 50% 100%); }
.sf-hud__shop-prog-n > small { margin-left: 4u; font-size: var(--sf-fs-xs); color: var(--sf-c-text-3); }
.sf-hud__shop-steps > i.is-next { background: var(--sf-c-cyan-400); box-shadow: 0 0 6u rgba(92, 214, 247, 0.7); animation: sf-hud-blink 1s steps(2, jump-none) infinite; }
/* 桌面：3 列 2 行铺满(每页最多 6 件，不用滚动)；内容实在放不下时整列可滚 */
.sf-hud__shop-grid { flex: 1 0 auto; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); grid-template-rows: repeat(2, minmax(min-content, 1fr)); gap: 8u; }

/* 卡片：序号 + 图标(+ 鞋的两个阶段点) → 名字 → 一句大白话 → 价格；右上角是状态标签 */
.sf-hud__card {
  position: relative; display: flex; flex-direction: column; align-items: flex-start; gap: 4u; min-width: 0; padding: 11u 12u 10u; margin: 0; border: 0; border-radius: 9u; cursor: pointer; text-align: left; color: var(--sf-c-text);
  background: linear-gradient(180deg, rgba(34, 54, 110, 0.5), rgba(10, 17, 40, 0.6)); box-shadow: inset 0 0 0 1px var(--sf-c-line-strong);
  transition: box-shadow 0.12s linear, background 0.12s linear, transform 0.1s var(--sf-ease-out), opacity 0.2s linear;
}
@media (hover: hover) { .sf-hud__card:hover { background: linear-gradient(180deg, rgba(48, 74, 146, 0.6), rgba(14, 24, 54, 0.7)); } }
.sf-hud__card:active { transform: scale(0.98); }
.sf-hud__card-top { display: flex; align-items: center; gap: 9u; margin-bottom: 5u; }
.sf-hud__card .sf-slot { --sf-slot: max(44px, 60u); }
.sf-hud__card-no { display: grid; place-items: center; flex: none; width: max(18px, 20u); height: max(18px, 20u); border-radius: 50%; font-size: max(10px, 11.5u); font-weight: 800; line-height: 1; color: var(--sf-c-text-2); background: rgba(4, 8, 22, 0.75); box-shadow: inset 0 0 0 1px var(--sf-c-line-strong); }
.sf-hud__card-dots { display: inline-flex; gap: 3u; }
.sf-hud__card-dots > i { width: max(6px, 8u); height: max(6px, 8u); border-radius: 50%; background: rgba(4, 8, 22, 0.8); box-shadow: inset 0 0 0 1px rgba(232, 199, 122, 0.6); }
.sf-hud__card-dots > i.is-on { background: var(--sf-grad-gold); box-shadow: 0 0 5u rgba(255, 214, 130, 0.7); }
.sf-hud__card-name { max-width: 100%; font-size: var(--sf-fs-lg); font-weight: 700; line-height: 1.3; letter-spacing: 0.03em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sf-hud__card-brief { max-width: 100%; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; font-size: var(--sf-fs-sm); line-height: 1.45; color: var(--sf-c-text-2); }
.sf-hud__card-price { display: inline-flex; align-items: center; gap: 4u; flex: none; margin-top: auto; padding-top: 3u; font-size: var(--sf-fs-md); font-weight: 800; line-height: 1.2; color: var(--sf-c-gold-200); }
.sf-hud__card-price .sf-i { width: 1.1em; height: 1.1em; vertical-align: 0; }
.sf-hud__card-tag { position: absolute; right: 7u; top: 7u; display: inline-flex; align-items: center; gap: 2u; padding: 1u 6u; border-radius: 3u; font-size: max(10px, 10.5u); font-weight: 800; line-height: 1.4; letter-spacing: 0.04em; white-space: nowrap; }
.sf-hud__card-tag:empty { display: none; }
.sf-hud__card.is-poor .sf-hud__card-price { color: #ff8d8d; }
.sf-hud__card.is-blocked .sf-slot > svg { filter: saturate(0.5) brightness(0.72); }
.sf-hud__card.is-blocked { opacity: 0.62; }
.sf-hud__card.is-afford { box-shadow: inset 0 0 0 1px rgba(232, 199, 122, 0.55); }
/* 已买：变暗；价格位置空出来 */
.sf-hud__card.is-done { opacity: 0.6; }
.sf-hud__card.is-done .sf-hud__card-price { display: none; }
/* 下一件：金色描边 + 外发光慢呼吸 */
.sf-hud__card.is-next { box-shadow: inset 0 0 0 max(2px, 2u) #f3cf85, 0 0 12u rgba(255, 214, 130, 0.35); }
.sf-hud__card.is-next::after { content: ''; position: absolute; inset: -3u; border-radius: 12u; pointer-events: none; box-shadow: 0 0 0 1.5px rgba(255, 231, 173, 0.85); animation: sf-hud-quick-pulse 1.4s ease-out infinite; }
/* 选中(详情区正在看的那件)：底色提亮 + 浅色描边；与「下一件」叠加时保留金边 */
.sf-hud__card.is-sel { background: linear-gradient(180deg, rgba(86, 124, 210, 0.42), rgba(20, 34, 72, 0.8)); box-shadow: inset 0 0 0 max(1.5px, 2u) #dfe8ff; }
.sf-hud__card.is-sel.is-done, .sf-hud__card.is-sel.is-blocked { opacity: 0.9; }
.sf-hud__card.is-sel.is-next { box-shadow: inset 0 0 0 max(2px, 2.5u) var(--sf-c-gold-100), 0 0 14u rgba(255, 214, 130, 0.5); }
.sf-hud__card-tag.is-own { color: #0f2a1a; background: linear-gradient(180deg, #b8f5cf, #6fe3a1); }
/* 鞋卡：草鞋已经在身上，升级排在后面——淡绿描边的说明标签，不抢「下一件」的风头 */
.sf-hud__card-tag.is-have { color: #b9f5d2; background: rgba(12, 40, 26, 0.75); box-shadow: inset 0 0 0 1px rgba(111, 227, 161, 0.55); }
.sf-hud__card-tag.is-next { color: #06222c; background: linear-gradient(180deg, #c9f6ff, #5cd6f7); }
.sf-hud__card-tag.is-done, .sf-hud__card-tag.is-auto { color: #2b1a04; background: var(--sf-grad-gold); }
.sf-hud__card-tag.is-step { color: var(--sf-c-text-2); background: rgba(4, 8, 22, 0.7); box-shadow: inset 0 0 0 1px var(--sf-c-line-strong); }
.sf-hud__card.is-flash { animation: sf-hud-card-buy 0.5s ease-out; }
@keyframes sf-hud-card-buy { 0% { filter: brightness(2.2); } 100% { filter: none; } }

/* 详情：标题(★ 下一件 / 第 N 件) → 图标 + 名字 → 大白话 → 属性 → 被动 → 提示 → 攒钱进度 → 购买 */
.sf-hud__shop-detail { display: flex; flex-direction: column; min-height: 0; padding: 10u 14u 12u; box-shadow: inset 1px 0 0 var(--sf-c-line-strong); background: rgba(4, 8, 22, 0.35); }
.sf-hud__dt-title { flex: none; display: flex; align-items: center; gap: 5u; margin-bottom: 7u; font-size: var(--sf-fs-sm); font-weight: 800; letter-spacing: 0.12em; line-height: 1.2; color: var(--sf-c-text-2); }
.sf-hud__dt-title.is-next { color: var(--sf-c-gold-200); text-shadow: 0 0 8u rgba(255, 214, 130, 0.45); }
.sf-hud__dt-title .sf-i { width: 1.15em; height: 1.15em; vertical-align: 0; }
.sf-hud__dt-head { display: flex; align-items: center; gap: 10u; flex: none; }
.sf-hud__dt-head .sf-slot { --sf-slot: max(46px, 56u); }
.sf-hud__dt-headtext { flex: 1; min-width: 0; }
.sf-hud__dt-name { font-size: var(--sf-fs-lg); font-weight: 800; color: var(--sf-c-gold-200); line-height: 1.25; letter-spacing: 0.04em; }
.sf-hud__dt-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 5u; margin-top: 3u; }
.sf-hud__dt-price { display: none; align-items: center; gap: 3u; flex: none; align-self: flex-start; font-size: var(--sf-fs-md); font-weight: 800; color: var(--sf-c-gold-200); }
.sf-hud__dt-price .sf-i { width: 1.1em; height: 1.1em; vertical-align: 0; }
.sf-hud__dt-body { flex: 1; min-height: 0; margin: 8u -6u 6u 0; padding-right: 6u; }
.sf-hud__dt-brief { font-size: var(--sf-fs-md); font-weight: 600; line-height: 1.45; color: var(--sf-c-text); }
.sf-hud__dt-stats { display: flex; flex-direction: column; gap: 3u; margin-top: 8u; padding-top: 8u; box-shadow: inset 0 1px 0 var(--sf-c-line); font-size: var(--sf-fs-sm); line-height: 1.35; }
.sf-hud__dt-stat { display: flex; justify-content: space-between; gap: 10u; }
.sf-hud__dt-stat > span { color: var(--sf-c-text-2); }
.sf-hud__dt-stat > b { color: var(--sf-c-cyan-300); font-weight: 700; text-align: right; white-space: nowrap; }
.sf-hud__dt-passive { margin-top: 8u; padding: 7u 9u; border-radius: 6u; background: rgba(255, 184, 77, 0.08); box-shadow: inset 0 0 0 1px rgba(255, 184, 77, 0.28); font-size: var(--sf-fs-sm); line-height: 1.5; color: var(--sf-c-text-2); }
/* 合成路径：一行组件名，已有的高亮 */
.sf-hud__dt-build { margin-top: 8u; display: flex; flex-wrap: wrap; align-items: center; gap: 4u 6u; padding: 7u 9u; border-radius: 6u; background: rgba(120, 190, 255, 0.07); box-shadow: inset 0 0 0 1px rgba(120, 190, 255, 0.22); font-size: var(--sf-fs-sm); }
.sf-hud__dt-build b { flex: none; color: var(--sf-c-text-3); font-weight: 700; letter-spacing: 0.12em; }
.sf-hud__dt-part { display: inline-flex; align-items: center; gap: 2u; padding: 1u 5u; border-radius: 4u; color: var(--sf-c-text-2); box-shadow: inset 0 0 0 1px var(--sf-c-line-strong); }
.sf-hud__dt-part.is-own { color: var(--sf-c-green-300); box-shadow: inset 0 0 0 1px rgba(86, 199, 160, 0.5); background: rgba(86, 199, 160, 0.1); }
.sf-hud__dt-part .sf-i { width: 1em; height: 1em; }
.sf-hud__dt-passive b { display: block; color: var(--sf-c-amber); font-weight: 700; }
/* 主动：冷色块，和被动(琥珀)分开；冷却挂在标题右侧 */
.sf-hud__dt-active { margin-top: 8u; padding: 7u 9u; border-radius: 6u; background: rgba(92, 214, 247, 0.08); box-shadow: inset 0 0 0 1px rgba(92, 214, 247, 0.32); font-size: var(--sf-fs-sm); line-height: 1.5; color: var(--sf-c-text-2); }
.sf-hud__dt-active b { display: flex; align-items: baseline; gap: 8u; margin-bottom: 2u; color: var(--sf-c-cyan-300); font-weight: 700; }
.sf-hud__dt-active-cd { margin-left: auto; font-weight: 700; color: var(--sf-c-text-3); }
.sf-hud__dt-active small { display: block; margin-top: 4u; font-size: var(--sf-fs-xs); color: var(--sf-c-text-3); }
.sf-hud__dt-nopassive { margin-top: 8u; font-size: var(--sf-fs-xs); color: var(--sf-c-text-3); }
.sf-hud__dt-note { flex: none; margin-bottom: 5u; font-size: var(--sf-fs-sm); line-height: 1.4; color: var(--sf-c-text-3); }
.sf-hud__dt-note:empty { display: none; }
.sf-hud__dt-note.is-warn { color: #ff9c9c; }
.sf-hud__dt-note.is-good { color: var(--sf-c-green); }
.sf-hud__dt-note b { font-weight: 800; }
/* 攒钱进度：金币 / 花费，满了变绿 */
.sf-hud__dt-save { --p: 0; flex: none; display: flex; align-items: center; gap: 8u; margin-bottom: 7u; font-size: var(--sf-fs-xs); line-height: 1.2; color: var(--sf-c-text-2); white-space: nowrap; }
.sf-hud__dt-save-bar { position: relative; flex: 1; height: max(6px, 7u); border-radius: 99px; overflow: hidden; background: rgba(3, 6, 16, 0.82); box-shadow: inset 0 0 0 1px rgba(150, 178, 235, 0.3); }
.sf-hud__dt-save-bar > i { position: absolute; inset: 0; transform-origin: left center; transform: scaleX(var(--p)); transition: transform 0.3s var(--sf-ease-out); background: linear-gradient(90deg, #c08c3c, #ffe7ad); }
.sf-hud__dt-save.is-full .sf-hud__dt-save-bar > i { background: linear-gradient(90deg, #1f9d58, #6fe3a1); }
.sf-hud__dt-save-text > b { font-weight: 800; color: #ff9c9c; }
.sf-hud__dt-save.is-full .sf-hud__dt-save-text { font-weight: 700; color: var(--sf-c-green); }
.sf-hud__dt-empty { margin: auto; text-align: center; color: var(--sf-c-text-3); font-size: var(--sf-fs-sm); }
.sf-hud__dt-owned { flex: none; display: flex; align-items: center; justify-content: center; gap: 6u; min-height: max(36px, 40u); border-radius: 7u; font-size: var(--sf-fs-sm); font-weight: 700; color: var(--sf-c-gold-200); background: rgba(255, 214, 130, 0.08); box-shadow: inset 0 0 0 1px rgba(232, 199, 122, 0.3); }
.sf-hud__dt-owned .sf-i { width: 1.15em; height: 1.15em; vertical-align: 0; }
.sf-hud__shop-detail .sf-btn { flex: none; padding: 0 12u; letter-spacing: 0.1em; }
.sf-hud__shop-detail .sf-btn .sf-i { width: 1.15em; height: 1.15em; }
.sf-hud__shop-detail .sf-btn > .sf-hud__key { position: absolute; right: 8u; top: 50%; transform: translateY(-50%); }
/* 「还差 N · 攒够自动买」：一句话比较长，收小字号；此时回车买不了，键位角标与金币图标都不放 */
.sf-hud__shop-detail .sf-btn.is-wait { font-size: var(--sf-fs-sm); letter-spacing: 0.04em; }
.sf-hud__shop-detail .sf-btn.is-wait > .sf-hud__key, .sf-hud__shop-detail .sf-btn.is-wait > .sf-i { display: none; }

/* 装备栏 */
.sf-hud__shop-inv { display: flex; align-items: center; gap: 10u; flex: none; padding: 8u 16u 10u; box-shadow: inset 0 1px 0 var(--sf-c-line-strong); }
.sf-hud__shop-inv > .sf-heading { flex: none; width: auto; }
.sf-hud__shop-inv > .sf-heading::after { display: none; }
.sf-hud__shop-slots { display: flex; gap: 6u; }
.sf-hud__shop-slots .sf-slot { --sf-slot: max(36px, 40u); }
.sf-hud__shop-slots button.sf-slot--empty { cursor: default; }
.sf-hud__shop-hint { margin-left: auto; font-size: var(--sf-fs-xs); color: var(--sf-c-text-3); text-align: right; }

/* 矮横屏(手机)：面板几乎铺满；卡片 2 列 3 行，图标在左、右边 名字 / 大白话(一行) / 价格 */
@media (orientation: landscape) and (max-height: 460px) {
  .sf-hud__shop { padding-top: max(4px, var(--sf-safe-t)); padding-bottom: max(4px, var(--sf-safe-b)); }
  .sf-hud__shop-head { padding: 0 6u 0 14u; gap: 8u; }
  .sf-hud__shop-title { font-size: var(--sf-fs-lg); letter-spacing: 0.14em; }
  .sf-hud__shop-head .sf-tab { padding: 0 10u; min-height: 40px; }
  .sf-hud__shop-auto { padding: 2u 5u; }
  .sf-hud__shop-list { padding: 6u 10u 6u 12u; }
  .sf-hud__shop-prog { margin-bottom: 6u; }
  .sf-hud__shop-inv { padding: 5u 12u 6u; }
  .sf-hud__shop-slots .sf-slot { --sf-slot: 34px; }
  .sf-hud__shop-detail { padding: 6u 12u 8u; }
  .sf-hud__shop-hint { display: none; }
  .sf-hud__dt-title { margin-bottom: 5u; }
  .sf-hud__dt-head .sf-slot { --sf-slot: 40px; }
  .sf-hud__dt-body { margin: 5u -6u 4u 0; }
  .sf-hud__dt-save { margin-bottom: 5u; }
  .sf-hud__shop-detail .sf-btn { --sf-btn-h: 36px; }
  ${K4}
  /* 横屏竖向还有余量：卡片中间多放一行大白话(一行，放不下就省略) */
  .sf-hud__card { grid-template-rows: auto auto auto; gap: 1u 8u; min-height: max(62px, 70u); }
  .sf-hud__card-top { grid-row: 1 / span 3; }
  .sf-hud__card .sf-slot { --sf-slot: max(40px, 48u); }
  .sf-hud__card-brief { display: block; grid-column: 2 / span 2; grid-row: 2; font-size: max(10px, 11u); line-height: 1.35; white-space: nowrap; text-overflow: ellipsis; }
  .sf-hud__card-price, .sf-hud__card-tag { grid-row: 3; }
}
/* 竖屏：「下一件」提到最上面做成一张带购买键的大卡，下面是 2 列 3 行的卡片；提示条收窄(两行：标签 / 装备名)，给右侧击杀流让位 */
@media (orientation: portrait) {
  .sf-hud__quick-name { display: none; }
  .sf-hud__quick-tag, .sf-hud__autobuy-tag { letter-spacing: 0; }
  .sf-hud__shopbar { gap: 11u; }
  .sf-hud__autobuy { padding-right: 9u; gap: 6u; }
  .sf-hud__shop-panel { height: min(100%, 860u); }
  .sf-hud__shop-head { flex-wrap: wrap; padding: 8u 8u 0 14u; gap: 2u 10u; }
  .sf-hud__shop-title { flex: 1; }
  .sf-hud__shop-auto { order: 4; flex: 0 0 100%; flex-direction: row; align-items: center; justify-content: flex-start; gap: 10u; padding: 2u 0 3u; }
  .sf-hud__shop-auto-hint { font-size: var(--sf-fs-xs); }
  .sf-hud__shop-head .sf-tabs { order: 5; flex: 0 0 100%; }
  .sf-hud__shop-head .sf-tab { flex: 1; padding: 0 4u; }
  .sf-hud__shop-body { grid-template-columns: minmax(0, 1fr); grid-template-rows: auto minmax(0, 1fr); }
  .sf-hud__shop-detail { grid-row: 1; max-height: 330u; margin: 10u 10u 0; padding: 9u 12u 11u; border-radius: 10u; background: linear-gradient(180deg, rgba(40, 60, 118, 0.42), rgba(8, 14, 34, 0.55)); box-shadow: inset 0 0 0 1px rgba(232, 199, 122, 0.45), 0 4u 14u rgba(2, 4, 12, 0.35); }
  .sf-hud__shop-list { grid-row: 2; padding: 10u; }
  .sf-hud__dt-title { margin-bottom: 6u; }
  .sf-hud__dt-head .sf-slot { --sf-slot: max(42px, 50u); }
  .sf-hud__dt-price { display: inline-flex; }
  .sf-hud__dt-body { margin: 6u -6u 5u 0; }
  .sf-hud__shop-inv { padding: 8u 12u 10u; }
  .sf-hud__shop-hint { display: none; }
  ${K4}
}
`),
  wG = ["recommend", "attack", "magic", "defense", "support", "boots"],
  MG = { 1: "基础鞋", 2: "进阶鞋" },
  kG = { attack: "攻击装备", magic: "法术装备", defense: "防御装备", support: "辅助装备", boots: "鞋" },
  Y2 = 2.6,
  SG = 1.2,
  TG = 0.3,
  EG = 320,
  Z4 = (n) => n.brief ?? BB(n.stats, 2),
  K2 = (n) => ln[n].name.slice(-2);
export { mG, $f, Gf, zm, Sk, Tk, Yd, q2, xG, Ek, Ak, M1, Rk, X2, yG, bG, _G, wG, MG, kG, Y2, SG, TG, EG, Z4, K2 };
