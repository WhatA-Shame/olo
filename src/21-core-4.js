// 21-core-4.js — core｜58 个顶层语句｜67KB
// 对应 game.pretty.js 第 40648–42948 行
// 关键内容：
//   Eh                    不可用
//   Ez                    升级 Lv.${o.level}
//   Nz                    不可用
//   cz                    hit_
//   jb                    PingFang SC
//   fz                    center
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { rn } from './01-audio.js';
import { Se } from './02-data.js';
import { Gs, Ki, Ns, co, mi } from './04-audio-2.js';
import { Je, dt } from './05-three.js';
import { Ke, Ut } from './06-three-2.js';
import { Ae, Bn, On, Sn, hm, um, zr } from './07-three-3.js';
import { Yt } from './14-three-7.js';
import { $I, Lt, W, Xt, ws } from './17-three-8.js';
import { $n, AP, MP, PP } from './18-core.js';
import { FP, HP, bD, vD, yD, zP } from './19-core-2.js';
import { $D, Jr, QD, l8, rz } from './20-core-3.js';

function cz(n) {
  const t = new l8(n),
    e = new QD(t),
    s = new AP(t),
    i = new rz(t),
    a = new MP(t),
    o = { state: n.frame.state, playerId: n.frame.state.playerId, playerTeam: n.frame.playerTeam },
    r = new HP(t),
    l = {
      particlesSpawned: 0,
      particleCapacity: 0,
      decals: 0,
      projectiles: 0,
      areas: 0,
      statuses: 0,
      drawCalls: 0,
      particlesLive: 0,
    },
    c = new Map();
  let f = !1,
    d = 0;
  const h = (y) => {
      if (!f && d === 0) return;
      let v = !1;
      for (const M of y.state.heroes) M.id === y.state.playerId && (v = !M.alive);
      const _ = f && v ? 0.82 : 0;
      if (d === _) return;
      const k = y.dt * (_ > d ? 1.6 : 3);
      ((d = Math.abs(_ - d) <= k ? _ : d + Math.sign(_ - d) * k), (n.grade.desaturate = d));
    },
    u = (y) => {
      ((o.state = y), (o.playerId = y.playerId));
      let v = 0;
      for (const _ of y.heroes) _.id === y.playerId && (v = _.team);
      o.playerTeam = v;
    },
    m = (y) => {
      if (y.targetId !== void 0 && y.key.startsWith("hit_") && t.anchor(y.targetId)) {
        const v = t.a.unit;
        if (v && v.team !== o.playerTeam && v.team !== 2 && v.id !== o.playerId && !v.visible[o.playerTeam])
          return !1;
      }
      return y.team === o.playerTeam ||
        (t.anchor(y.unitId) && t.a.visible) ||
        (t.anchor(y.targetId) && t.a.visible) ||
        t.anchors.pointVisible(y.pos.x, y.pos.y)
        ? !0
        : y.to !== void 0 && t.anchors.pointVisible(y.to.x, y.to.y);
    },
    x = (y) => {
      const v = $D[y.key];
      v && v(t, y, o);
    },
    p = (y, v) => {
      switch (y.type) {
        case "fx":
          if ((t.focusDist(y.pos.x, y.pos.y) > Jr && !(y.to && t.focusDist(y.to.x, y.to.y) <= Jr)) || !m(y))
            return;
          x(y);
          break;
        case "projectileHit":
        case "projectileEnd":
          if (t.focusDist(y.pos.x, y.pos.y) > Jr) return;
          e.handle(y, o.playerId, o.playerTeam);
          break;
        case "attack": {
          if (!t.anchor(y.unitId) || !t.a.visible) return;
          const _ = t.a.unit;
          if (
            !_ ||
            _.kind !== "hero" ||
            Se[_.heroId].attackType === "ranged" ||
            t.focusDist(t.a.x, t.a.z) > Jr
          )
            return;
          const k = ws[_.heroId],
            M = _.id,
            S = (c.get(M) ?? 0) + 1;
          c.set(M, S);
          const b = Math.max(
            0.03,
            (_.animDur > 0 ? _.animDur : 0.5) * Se[_.heroId].basicAttack.windup - 0.05,
          );
          t.after(b, () => {
            if (!t.anchor(M) || !t.a.unit || !t.a.unit.alive || t.a.unit.anim !== "attack") return;
            const w = t.a.unit.facing;
            bD(
              t,
              t.a.x + Math.cos(w) * 0.3,
              t.a.y + t.a.height * 0.5,
              t.a.z + Math.sin(w) * 0.3,
              w,
              k.glow,
              k.deep,
              _.stats.attackRange * 0.72 + 0.3,
              S,
            );
          });
          break;
        }
        case "death": {
          if (
            t.focusDist(y.pos.x, y.pos.y) > Jr ||
            (y.team !== o.playerTeam && !t.anchors.pointVisible(y.pos.x, y.pos.y))
          )
            return;
          y.kind === "hero"
            ? yD(t, y.pos.x, y.pos.y, y.team, y.unitId === o.playerId || y.killerId === o.playerId)
            : y.kind === "minion" && vD(t, y.pos.x, y.pos.y, y.team);
          break;
        }
        case "monsterSpawn":
          if (v.time < 1 || t.focusDist(y.pos.x, y.pos.y) > Jr) return;
          zP(t, y.pos.x, y.pos.y, y.monsterType);
          break;
        case "epicSlain":
          if (t.focusDist(y.pos.x, y.pos.y) > Jr + (rn[y.monsterType].epic ? 20 : 0)) return;
          FP(t, y.pos.x, y.pos.y, y.team, y.monsterType, v);
          break;
        case "damage":
          if (y.dtype === "magic" && t.focusDist(y.pos.x, y.pos.y) <= Jr) {
            const _ = t.anchors.unit(y.sourceId);
            _ && _.kind === "monster" && _.monsterType === "abyss_drake" && PP(t, y.sourceId, y.targetId);
          }
          break;
      }
    },
    g = () => {
      let y = 0;
      return (
        n.layers.fx.traverse((v) => {
          const _ = v;
          _.isMesh && _.visible && (!_.parent || _.parent.visible) && y++;
        }),
        y
      );
    };
  return {
    name: "fx",
    kit: t,
    update(y) {
      (u(y.state),
        t.begin(y),
        e.update(y),
        s.update(y),
        i.update(y),
        r.update(y),
        a.update(y),
        h(y),
        t.flush(y));
    },
    handleEvents(y, v) {
      u(v);
      for (const _ of y) p(_, v);
    },
    setAim(y) {
      a.set(y);
    },
    setQuality(y) {
      t.setQuality(y);
    },
    setAnchors(y) {
      t.anchors = y;
    },
    setDeathGrade(y) {
      f = y;
    },
    playFx(y, v) {
      (u(v), x(y));
    },
    reset() {
      (e.reset(), s.reset(), i.reset(), r.reset(), a.reset(), c.clear(), t.clear());
    },
    getStats() {
      return (
        (l.particlesSpawned = t.particles.spawned),
        (l.particleCapacity = t.particles.capacity),
        (l.decals = t.decals.activeCount),
        (l.projectiles = e.count),
        (l.areas = s.count),
        (l.statuses = i.count),
        (l.drawCalls = g()),
        (l.particlesLive = t.particles.liveCount()),
        l
      );
    },
    dispose() {
      (d > 0 && (n.grade.desaturate = 0), e.reset(), s.reset(), i.reset(), a.reset(), t.dispose());
    },
  };
}

const jb = '"PingFang SC","HarmonyOS Sans SC","Microsoft YaHei",sans-serif',
  c3 = '"Trebuchet MS","Arial Black","Helvetica Neue",Arial,sans-serif';

function Eh(n, t, e) {
  const s = document.createElement("canvas");
  ((s.width = Math.max(1, Math.ceil(n * e))), (s.height = Math.max(1, Math.ceil(t * e))));
  const i = s.getContext("2d");
  if (!i) throw new Error("2D canvas 不可用");
  return (i.scale(e, e), [s, i]);
}

class fz {
  map = new Map();
  dpr;
  gen = 0;
  constructor(t) {
    this.dpr = t;
  }
  setDpr(t) {
    t !== this.dpr && ((this.dpr = t), this.map.clear(), this.gen++);
  }
  get dprKey() {
    return this.gen * 16777216;
  }
  get(t, e, s, i, a = 700, o = jb) {
    const r = `${t}|${e}|${s}|${i}|${a}|${o === jb ? 0 : 1}`;
    let l = this.map.get(r);
    if (l) return l;
    this.map.size > 400 && this.map.clear();
    const c = `${a} ${e}px ${o}`,
      [f, d] = Eh(4, 4, 1);
    d.font = c;
    const h = Math.ceil(d.measureText(t).width);
    f.width = 0;
    const u = Math.ceil(e * 0.22) + 2,
      m = h + u * 2,
      x = Math.ceil(e * 1.3) + u,
      [p, g] = Eh(m, x, this.dpr);
    return (
      (g.font = c),
      (g.textAlign = "center"),
      (g.textBaseline = "middle"),
      (g.lineJoin = "round"),
      (g.lineWidth = Math.max(2, e * 0.24)),
      (g.strokeStyle = i),
      g.strokeText(t, m / 2, x / 2 + 0.5),
      (g.fillStyle = s),
      g.fillText(t, m / 2, x / 2 + 0.5),
      (l = { canvas: p, w: m, h: x }),
      this.map.set(r, l),
      l
    );
  }
}

const t0 = "0123456789+-!";

class dz {
  canvas;
  cell;
  height;
  advance = [];
  dpr;
  constructor(t, e) {
    this.dpr = e;
    const s = `${t.italic ? "italic " : ""}900 ${t.size}px ${c3}`,
      i = Math.ceil(t.size * 0.2) + 2,
      [a, o] = Eh(4, 4, 1);
    o.font = s;
    let r = 0;
    for (const d of t0) {
      const h = o.measureText(d).width;
      (this.advance.push(h * 0.92), h > r && (r = h));
    }
    ((a.width = 0), (this.cell = Math.ceil(r) + i * 2), (this.height = Math.ceil(t.size * 1.25) + i));
    const [l, c] = Eh(this.cell * t0.length, this.height, e);
    ((c.font = s), (c.textAlign = "center"), (c.textBaseline = "middle"), (c.lineJoin = "round"));
    const f = c.createLinearGradient(0, this.height * 0.15, 0, this.height * 0.85);
    (f.addColorStop(0, t.top), f.addColorStop(1, t.bottom));
    for (let d = 0; d < t0.length; d++) {
      const h = d * this.cell + this.cell / 2,
        u = this.height / 2 + 0.5;
      ((c.lineWidth = Math.max(3, t.size * 0.26)),
        (c.strokeStyle = "rgba(8,10,20,0.9)"),
        c.strokeText(t0[d], h, u + 1),
        (c.lineWidth = Math.max(2, t.size * 0.14)),
        (c.strokeStyle = t.stroke),
        c.strokeText(t0[d], h, u),
        (c.fillStyle = f),
        c.fillText(t0[d], h, u));
    }
    this.canvas = l;
  }
  measure(t) {
    let e = 0;
    for (let s = 0; s < t.length; s++) {
      const i = t0.indexOf(t[s]);
      i >= 0 && (e += this.advance[i]);
    }
    return e;
  }
  draw(t, e, s, i, a) {
    const o = this.measure(e) * a;
    let r = s - o / 2;
    const l = this.dpr,
      c = this.height * a,
      f = this.cell * a;
    for (let d = 0; d < e.length; d++) {
      const h = t0.indexOf(e[d]);
      if (h < 0) continue;
      const u = this.advance[h] * a;
      (t.drawImage(
        this.canvas,
        h * this.cell * l,
        0,
        this.cell * l,
        this.height * l,
        r + u / 2 - f / 2,
        i - c / 2,
        f,
        c,
      ),
        (r += u));
    }
  }
}

const qb = 16;

function Xb(n, t, e, s, i, a, o = -Math.PI / 2) {
  n.beginPath();
  for (let r = 0; r < s * 2; r++) {
    const l = o + (r * Math.PI) / s,
      c = r % 2 === 0 ? i : a;
    r === 0
      ? n.moveTo(t + Math.cos(l) * c, e + Math.sin(l) * c)
      : n.lineTo(t + Math.cos(l) * c, e + Math.sin(l) * c);
  }
  n.closePath();
}

const hz = {
  stun(n) {
    ((n.fillStyle = "#ffd84a"),
      (n.strokeStyle = "#5a3a00"),
      (n.lineWidth = 1.2),
      Xb(n, 8, 8.4, 5, 7, 3.1),
      n.fill(),
      n.stroke());
  },
  airborne(n) {
    ((n.fillStyle = "#dff3ff"),
      (n.strokeStyle = "#1c3a66"),
      (n.lineWidth = 1.2),
      n.beginPath(),
      n.moveTo(8, 1.5),
      n.lineTo(14, 8),
      n.lineTo(10.4, 8),
      n.lineTo(10.4, 14.5),
      n.lineTo(5.6, 14.5),
      n.lineTo(5.6, 8),
      n.lineTo(2, 8),
      n.closePath(),
      n.fill(),
      n.stroke());
  },
  root(n) {
    ((n.strokeStyle = "#4a3410"), (n.lineWidth = 1.1));
    for (const [t, e, s] of [
      [4, 8, "#c89a4a"],
      [8, 12, "#ffcf70"],
      [12, 7, "#c89a4a"],
    ])
      ((n.fillStyle = s),
        n.beginPath(),
        n.moveTo(t - 2.6, 14.5),
        n.lineTo(t, 14.5 - e),
        n.lineTo(t + 2.6, 14.5),
        n.closePath(),
        n.fill(),
        n.stroke());
  },
  silence(n) {
    ((n.strokeStyle = "#d8b4ff"),
      (n.lineWidth = 2),
      n.beginPath(),
      n.arc(8, 8, 5.6, 0, Math.PI * 2),
      n.moveTo(4.2, 4.2),
      n.lineTo(11.8, 11.8),
      n.stroke());
  },
  slow(n) {
    ((n.strokeStyle = "#b4b8ff"),
      (n.lineWidth = 2.1),
      (n.lineCap = "round"),
      (n.lineJoin = "round"),
      n.beginPath());
    for (const t of [3.4, 8.2]) (n.moveTo(3.2, t), n.lineTo(8, t + 4.4), n.lineTo(12.8, t));
    n.stroke();
  },
  burn(n) {
    ((n.fillStyle = "#ff7a2a"),
      (n.strokeStyle = "#6a1a00"),
      (n.lineWidth = 1.1),
      n.beginPath(),
      n.moveTo(8, 1.5),
      n.quadraticCurveTo(14.5, 8, 11.5, 13),
      n.quadraticCurveTo(8, 16, 4.5, 13),
      n.quadraticCurveTo(1.8, 8.5, 6, 5.5),
      n.quadraticCurveTo(6.5, 8, 8, 8),
      n.quadraticCurveTo(9.5, 5, 8, 1.5),
      n.fill(),
      n.stroke(),
      (n.fillStyle = "#ffd86a"),
      n.beginPath(),
      n.ellipse(8, 11.5, 2.2, 2.8, 0, 0, Math.PI * 2),
      n.fill());
  },
  mark(n) {
    ((n.lineCap = "round"),
      (n.strokeStyle = "#4a3200"),
      (n.lineWidth = 4.6),
      n.beginPath(),
      n.arc(0.5, 8, 9, -0.82, 0.82),
      n.stroke(),
      (n.strokeStyle = "#ffd98a"),
      (n.lineWidth = 2.6),
      n.beginPath(),
      n.arc(0.5, 8, 9, -0.82, 0.82),
      n.stroke(),
      (n.strokeStyle = "#fff6da"),
      (n.lineWidth = 1),
      n.beginPath(),
      n.arc(0.5, 8, 9.3, -0.5, 0.5),
      n.stroke());
  },
  focus(n) {
    ((n.strokeStyle = "#ff4a38"),
      (n.lineWidth = 1.8),
      n.beginPath(),
      n.arc(8, 8, 5, 0, Math.PI * 2),
      n.moveTo(8, 0.8),
      n.lineTo(8, 4.6),
      n.moveTo(8, 11.4),
      n.lineTo(8, 15.2),
      n.moveTo(0.8, 8),
      n.lineTo(4.6, 8),
      n.moveTo(11.4, 8),
      n.lineTo(15.2, 8),
      n.stroke(),
      (n.fillStyle = "#ff4a38"),
      n.beginPath(),
      n.arc(8, 8, 1.5, 0, Math.PI * 2),
      n.fill());
  },
  gale(n) {
    ((n.lineCap = "round"), (n.lineJoin = "round"));
    const t = () => {
      (n.beginPath(),
        n.moveTo(2.6, 13.4),
        n.lineTo(11.2, 4.8),
        n.stroke(),
        n.beginPath(),
        n.moveTo(14.2, 1.8),
        n.lineTo(13.2, 7.2),
        n.lineTo(8.8, 2.8),
        n.closePath(),
        n.fill(),
        n.stroke(),
        n.beginPath(),
        n.moveTo(2.6, 13.4),
        n.lineTo(2.4, 10),
        n.moveTo(2.6, 13.4),
        n.lineTo(6, 13.6),
        n.moveTo(4.6, 11.4),
        n.lineTo(4.4, 8.2),
        n.moveTo(4.6, 11.4),
        n.lineTo(7.8, 11.6),
        n.stroke());
    };
    ((n.strokeStyle = "#0f4a3a"),
      (n.fillStyle = "#0f4a3a"),
      (n.lineWidth = 3.2),
      t(),
      (n.strokeStyle = "#f4fff8"),
      (n.fillStyle = "#9dffd8"),
      (n.lineWidth = 1.4),
      t());
  },
  ghost(n) {
    ((n.fillStyle = "rgba(190,150,255,0.9)"),
      (n.strokeStyle = "#2a1460"),
      (n.lineWidth = 1.1),
      n.beginPath(),
      n.arc(8, 7, 5.2, Math.PI, 0),
      n.lineTo(13.2, 14),
      n.lineTo(10.6, 12),
      n.lineTo(8, 14),
      n.lineTo(5.4, 12),
      n.lineTo(2.8, 14),
      n.closePath(),
      n.fill(),
      n.stroke());
  },
  lock(n) {
    ((n.strokeStyle = "#e8e2cc"),
      (n.fillStyle = "#e8e2cc"),
      (n.lineWidth = 1.8),
      n.beginPath(),
      n.arc(8, 6.2, 3.2, Math.PI, 0),
      n.stroke(),
      n.fillRect(3.6, 6.6, 8.8, 7.4));
  },
  coin(n) {
    ((n.fillStyle = "#ffd84a"),
      (n.strokeStyle = "#7a4a00"),
      (n.lineWidth = 1.3),
      n.beginPath(),
      n.arc(8, 8, 6.2, 0, Math.PI * 2),
      n.fill(),
      n.stroke(),
      (n.fillStyle = "#fff4b8"),
      Xb(n, 8, 8, 4, 3.8, 1.5),
      n.fill());
  },
};

class uz {
  map = new Map();
  dpr;
  constructor(t) {
    this.dpr = t;
  }
  setDpr(t) {
    t !== this.dpr && ((this.dpr = t), this.map.clear());
  }
  draw(t, e, s, i, a) {
    let o = this.map.get(e);
    if (!o) {
      const r = this.dpr * 2,
        [l, c] = Eh(qb, qb, r);
      (hz[e](c), (o = l), this.map.set(e, o));
    }
    t.drawImage(o, s - a / 2, i - a / 2, a, a);
  }
}

const lr = {
    self: { fill: "#58d83e", name: "#c4ff9a" },
    ally: { fill: "#3f9cf6", name: "#a8d6ff" },
    enemy: { fill: "#f0483a", name: "#ff9c8c" },
    neutral: { fill: "#f0a630", name: "#ffe2a0" },
  },
  s2 = "rgba(8,12,24,0.86)",
  Yb = "#ffe6b0",
  pz = "#f4f8ff",
  mz = "#4aa8ff",
  Kb = "rgba(6,10,20,0.72)",
  gz = "#8a8f9c",
  Zb = ["stun", "airborne", "root", "silence"];

function xz(n) {
  const t = n.indexOf(" · ");
  return t > 0 ? n.slice(0, t) : n;
}

class yz {
  avoid = null;
  defaults = [
    { left: 0, top: 0, right: 0, bottom: 0 },
    { left: 0, top: 0, right: 0, bottom: 0 },
  ];
  states = new Map();
  stamp = 0;
  text;
  icons;
  a = { x: 0, y: 0, z: 0, height: 2, radius: 0.6, visible: !1, opacity: 1, unit: null };
  p = { x: 0, y: 0 };
  foot = { x: 0, y: 0 };
  order = [];
  heroSlots = [];
  slotPool = [];
  constructor(t, e) {
    ((this.text = t), (this.icons = e));
  }
  stateOf(t) {
    let e = this.states.get(t.id);
    return (
      e ||
        ((e = {
          trail: t.hp,
          hold: 0,
          lastHp: t.hp,
          flash: 0,
          seen: 0,
          name: null,
          nameKey: -1,
          lv: null,
          lvKey: -1,
        }),
        this.states.set(t.id, e)),
      e
    );
  }
  advance(t, e, s) {
    (t.hp < e.lastHp - 0.5 ? ((e.hold = 0.32), (e.flash = 0.14)) : t.hp > e.trail && (e.trail = t.hp),
      (e.lastHp = t.hp),
      e.flash > 0 && (e.flash -= s),
      e.trail > t.hp &&
        (e.hold > 0
          ? (e.hold -= s)
          : (e.trail = Math.max(t.hp, e.trail - t.stats.maxHp * 0.9 * s - (e.trail - t.hp) * 4 * s))));
  }
  draw(t, e, s, i, a, o, r) {
    const l = ++this.stamp,
      c = e.dt,
      f = e.state,
      d = this.order;
    d.length = 0;
    for (const p of f.units) p.kind === "minion" && d.push(p);
    for (const p of f.units) p.kind === "monster" && d.push(p);
    for (const p of f.units) (p.kind === "tower" || p.kind === "core") && d.push(p);
    for (const p of f.units) p.kind === "hero" && p.id !== f.playerId && d.push(p);
    for (const p of f.units) p.id === f.playerId && d.push(p);
    const h = this.a,
      u = this.p,
      m = this.heroSlots;
    m.length = 0;
    let x = this.avoid;
    if (!x) {
      x = this.defaults;
      const p = x[0],
        g = x[1];
      ((p.left = a / 2 - 190 * r),
        (p.right = a / 2 + 190 * r),
        (p.bottom = 52 * r),
        (g.left = a / 2 - 170 * r),
        (g.right = a / 2 + 170 * r),
        (g.top = 58 * r),
        (g.bottom = 98 * r));
    }
    this._vp = !1;
    this._vt = e.playerTeam;
    for (let _i = 0; _i < f.heroes.length; _i++) {
      const _h = f.heroes[_i];
      if (_h.id === f.playerId) {
        this._vp = _h.heroId === "paperboy";
        break;
      }
    }
    for (const p of d) {
      if (!p.alive) continue;
      const g = this.stateOf(p);
      if (
        ((g.seen = l),
        this.advance(p, g, c),
        !s.get(p.id, h) ||
          !h.visible ||
          !i(h.x, h.y + h.height + 0.22, h.z, u) ||
          u.x < -70 ||
          u.x > a + 70 ||
          u.y > o + 60)
      )
        continue;
      const y = p.kind === "tower" || p.kind === "core",
        v = p.kind === "monster" && rn[p.monsterType].epic,
        _ = y || v;
      if (u.y < -30 && (!_ || !i(h.x, h.y + (y ? 2.4 : 1.2), h.z, this.foot) || this.foot.y < 30 * r))
        continue;
      const k = Math.round(u.x);
      let M = Math.max((y ? 20 : 16) * r, u.y);
      if (_ && u.y < 150 * r) {
        const b = (p.kind === "core" ? 64 : v ? 52 : 54) * r,
          w = (v ? 34 : 14) * r;
        for (let T = 0; T < 3; T++) {
          let E = !1;
          for (const A of x)
            k + b <= A.left ||
              k - b >= A.right ||
              M - w >= A.bottom ||
              M <= A.top ||
              ((M = A.bottom + w + 4 * r), (E = !0));
          if (!E) break;
        }
      }
      const S = h.opacity >= 0.4 ? 1 : h.opacity / 0.4;
      if (!(S <= 0.02))
        switch (((t.globalAlpha = S), p.kind)) {
          case "hero": {
            const b =
              this.slotPool[m.length] ??
              (this.slotPool[m.length] = { u: p, bs: g, x: 0, y: 0, fade: 1, self: !1 });
            ((b.u = p),
              (b.bs = g),
              (b.x = k),
              (b.y = M),
              (b.fade = S),
              (b.self = p.id === f.playerId),
              m.push(b));
            break;
          }
          case "minion":
            p.hp < p.stats.maxHp - 0.5 &&
              this.simple(
                t,
                p,
                g,
                k,
                M,
                34 * r,
                4 * r,
                p.team === e.playerTeam ? lr.ally.fill : lr.enemy.fill,
                !1,
              );
            break;
          case "monster": {
            if (!v && p.hp >= p.stats.maxHp - 0.5) break;
            const b = (v ? 96 : 40 + p.radius * 24) * r;
            if ((this.simple(t, p, g, k, M, b, (v ? 8 : 5) * r, lr.neutral.fill, v), v)) {
              const w = this.text.get(
                rn[p.monsterType].name,
                Math.round(12 * r),
                lr.neutral.name,
                "rgba(10,8,2,0.9)",
              );
              t.drawImage(w.canvas, k - w.w / 2, M - 10 * r - w.h, w.w, w.h);
            }
            break;
          }
          case "tower":
          case "core": {
            const b = p.team === e.playerTeam,
              w = (p.kind === "core" ? 128 : 100) * r,
              T = (p.kind === "core" ? 9 : 8) * r;
            (this.simple(t, p, g, k, M, w, T, p.invulnerable ? gz : b ? lr.ally.fill : lr.enemy.fill, !0),
              p.invulnerable && this.icons.draw(t, "lock", k - w / 2 - 9 * r, M - T / 2, 13 * r));
            break;
          }
        }
    }
    this.declutter(m, r);
    for (const p of m) ((t.globalAlpha = p.fade), this.hero(t, p.u, p.bs, p.x, p.y, r, e));
    if (((t.globalAlpha = 1), (l & 63) === 0))
      for (const [p, g] of this.states) g.seen < l - 60 && this.states.delete(p);
  }
  declutter(t, e) {
    if (t.length < 2) return;
    const s = 104 * e,
      i = 31 * e;
    t.sort((a, o) => (a.self ? -1 : o.self ? 1 : o.y - a.y));
    for (let a = 1; a < t.length; a++) {
      const o = t[a],
        r = o.y;
      for (let l = 0; l < 4; l++) {
        let c = !1;
        for (let f = 0; f < a; f++) {
          const d = t[f];
          if (Math.abs(d.x - o.x) >= s || Math.abs(d.y - o.y) >= i) continue;
          const h = d.y - i;
          r - h > i * 2.1 || ((o.y = h), (c = !0));
        }
        if (!c) break;
      }
    }
    t.sort((a, o) => (a.self ? 1 : o.self ? -1 : 0));
  }
  simple(t, e, s, i, a, o, r, l, c) {
    const f = Math.round(i - o / 2),
      d = Math.round(a - r),
      h = e.stats.maxHp;
    ((t.fillStyle = s2), t.fillRect(f - 1, d - 1, o + 2, r + 2));
    const u = (o * Math.max(0, e.hp)) / h;
    if (
      (s.trail > e.hp && ((t.fillStyle = Yb), t.fillRect(f + u, d, (o * (s.trail - e.hp)) / h, r)),
      (t.fillStyle = l),
      t.fillRect(f, d, u, r),
      (t.fillStyle = "rgba(255,255,255,0.24)"),
      t.fillRect(f, d, u, r * 0.4),
      c)
    ) {
      t.fillStyle = Kb;
      const m = h > 9e3 ? 2e3 : 1e3;
      for (let x = m; x < h; x += m) t.fillRect(f + Math.round((o * x) / h), d, 1, r * 0.6);
    }
    if (this._vp && e.team !== this._vt && e.buffs && e.buffs.length > 0) {
      let gs = 0;
      for (let _i = 0; _i < e.buffs.length; _i++) if (e.buffs[_i].id === "paperboy_gloom") { gs = e.buffs[_i].stacks; break; }
      if (gs > 0 && u > 0) {
        const gw = Math.min(u, (o * h * gs * 0.01) / h);
        ((t.fillStyle = "#ffffff"), t.fillRect(f + u - gw, d, gw, r));
      }
    }
    s.flash > 0 &&
      ((t.fillStyle = `rgba(255,255,255,${Math.min(0.75, s.flash * 6)})`), t.fillRect(f, d, u, r));
  }
  hero(t, e, s, i, a, o, r) {
    const l = e.id === r.state.playerId,
      c = l ? lr.self : e.team === r.playerTeam ? lr.ally : lr.enemy,
      f = l ? 1.08 : 1,
      d = Math.round(92 * o * f),
      h = Math.round(9 * o * f),
      u = Math.max(2, Math.round(3 * o)),
      cb = e.chargeBar,
      cH = cb ? Math.max(2, Math.round(3 * o)) : 0,
      barH = h + u + 1 + (cH > 0 ? cH + 1 : 0),
      m = 8.5 * o * f,
      x = Math.round(i - d / 2 + m * 0.5),
      p = Math.round(a - barH),
      g = e.stats.maxHp,
      y = Math.max(g, e.hp + e.shield);
    ((t.fillStyle = s2), t.fillRect(x - 2, p - 2, d + 4, barH + 4));
    const v = (d * Math.max(0, e.hp)) / y,
      _ = (d * e.shield) / y;
    (s.trail > e.hp &&
      ((t.fillStyle = Yb), t.fillRect(x + v + _, p, Math.min(d - v - _, (d * (s.trail - e.hp)) / y), h)),
      (t.fillStyle = c.fill),
      t.fillRect(x, p, v, h),
      _ > 0 && ((t.fillStyle = pz), t.fillRect(x + v, p, _, h)),
      (t.fillStyle = "rgba(255,255,255,0.26)"),
      t.fillRect(x, p, v + _, h * 0.42));
    // 纸札人晦气白条：纸札人可看到所有敌人的白色血条，敌人自己也能看到自己的白色血条
    if ((l || (this._vp && e.team !== r.playerTeam)) && e.buffs && e.buffs.length > 0 && v > 0) {
      let gs = 0;
      for (let _i = 0; _i < e.buffs.length; _i++) {
        if (e.buffs[_i].id === "paperboy_gloom") {
          gs = e.buffs[_i].stacks;
          break;
        }
      }
      if (gs > 0) {
        const gw = Math.min(v, (d * (g * gs * 0.01)) / y);
        if (gw > 0.5) {
          ((t.fillStyle = "#ffffff"),
            t.fillRect(x + v - gw, p, gw, h),
            (t.fillStyle = "rgba(18,24,42,0.55)"),
            t.fillRect(Math.round(x + v - gw), p, 1, h));
        }
      }
    }
    t.fillStyle = Kb;
    for (let R = 1e3; R < y; R += 1e3) {
      const I = R % 5e3 === 0;
      t.fillRect(x + Math.round((d * R) / y) - (I ? 1 : 0), p, I ? 2 : 1, I ? h : h * 0.8);
    }
    (s.flash > 0 &&
      ((t.fillStyle = `rgba(255,255,255,${Math.min(0.8, s.flash * 6)})`), t.fillRect(x, p, v, h)),
      e.stats.maxMana > 0 &&
        ((t.fillStyle = "rgba(20,34,60,0.9)"),
        t.fillRect(x, p + h + 1, d, u),
        (t.fillStyle = mz),
        t.fillRect(x, p + h + 1, (d * Math.max(0, e.mana)) / e.stats.maxMana, u)));
    // 第三条蓄力条（蓝条下方）：平时黄色显示蓄力进度，蓄满变红提示强化就绪
    if (cH > 0) {
      const cy = p + h + u + 2,
        cr = Math.max(0, Math.min(1, cb.ratio || 0)),
        cw = d * cr;
      t.fillStyle = "rgba(28,22,12,0.92)";
      t.fillRect(x, cy, d, cH);
      if (cw > 0.5) {
        t.fillStyle = cb.full ? "#ff382e" : "#f5c838";
        t.fillRect(x, cy, cw, cH);
        t.fillStyle = cb.full ? "rgba(255,210,190,0.55)" : "rgba(255,248,195,0.45)";
        t.fillRect(x, cy, cw, Math.max(1, cH * 0.42));
      }
    }
    const k = x - m * 0.9,
      M = p + barH / 2;
    (t.beginPath(),
      t.arc(k, M, m, 0, Math.PI * 2),
      (t.fillStyle = "#0c1428"),
      t.fill(),
      (t.lineWidth = Math.max(1, 1.4 * o)),
      (t.strokeStyle = l ? "#d8ff7a" : "#f0c860"),
      t.stroke());
    const S = this.text.dprKey,
      b = e.level * 4096 + Math.round(o * f * 100) + S;
    (!s.lv || s.lvKey !== b) &&
      ((s.lv = this.text.get(
        String(e.level),
        Math.round(10.5 * o * f),
        "#ffffff",
        "rgba(8,12,24,0.9)",
        800,
        c3,
      )),
      (s.lvKey = b));
    const w = s.lv;
    t.drawImage(w.canvas, k - w.w / 2, M - w.h / 2, w.w, w.h);
    const T = (l ? 1 : e.team === r.playerTeam ? 2 : 3) * 4096 + Math.round(o * f * 100) + S;
    (!s.name || s.nameKey !== T) &&
      ((s.name = this.text.get(
        xz(e.name),
        Math.round((l ? 12 : 11) * o * f),
        c.name,
        "rgba(6,10,20,0.92)",
        l ? 800 : 600,
      )),
      (s.nameKey = T));
    const E = s.name,
      A = p - 3 * o - E.h,
      C = t.globalAlpha;
    ((t.globalAlpha = C * (l ? 1 : 0.85)),
      t.drawImage(E.canvas, i - E.w / 2, A, E.w, E.h),
      (t.globalAlpha = C),
      this.statusRow(t, e.buffs, i, A - 7 * o, o));
  }
  statusRow(t, e, s, i, a) {
    if (e.length === 0) return;
    const o = vz;
    o.length = 0;
    let r = null,
      l = 0,
      c = 0,
      f = 0;
    for (const p of e)
      switch (p.id) {
        case "stun":
        case "airborne":
        case "root":
        case "silence":
          (o.includes(p.id) || o.push(p.id),
            (!r || Zb.indexOf(p.id) < Zb.indexOf(r.id) || (p.id === r.id && p.timeLeft > r.timeLeft)) &&
              (r = p));
          break;
        case "slow":
        case "burn":
          o.includes(p.id) || o.push(p.id);
          break;
        case "untargetable":
          o.includes("ghost") || o.push("ghost");
          break;
        case "xingli_mark":
          l = Math.max(l, p.stacks);
          break;
        case "tower_focus":
          c = Math.max(c, p.stacks);
          break;
        case "fengling_gale":
          f = Math.max(f, p.stacks);
          break;
      }
    const d = 15 * a,
      h = 2 * a,
      u = o.length + Math.min(3, l) + (c > 0 ? 1 : 0) + (f > 0 ? 1 : 0);
    if (u === 0) return;
    let m = s - ((d + h) * u - h) / 2 + d / 2;
    const x = i - d / 2;
    for (const p of o) (this.icons.draw(t, p, m, x, d), (m += d + h));
    for (let p = 0; p < Math.min(3, l); p++) (this.icons.draw(t, "mark", m, x, d), (m += d + h));
    if (
      (c > 0 && (this.icons.draw(t, "focus", m, x, d), this.stackNum(t, c, m, x, a, "#ff8a78"), (m += d + h)),
      f > 0 && (this.icons.draw(t, "gale", m, x, d), this.stackNum(t, f, m, x, a, "#c8ffe8")),
      r && r.duration > 0 && Number.isFinite(r.duration))
    ) {
      const p = 44 * a,
        g = Math.max(2, 3 * a),
        y = Math.round(s - p / 2),
        v = Math.round(i - d - 5 * a);
      ((t.fillStyle = s2),
        t.fillRect(y - 1, v - 1, p + 2, g + 2),
        (t.fillStyle = "#ffd84a"),
        t.fillRect(y, v, p * Math.max(0, Math.min(1, r.timeLeft / r.duration)), g));
    }
  }
  stackNum(t, e, s, i, a, o) {
    const r = this.text.get(String(e), Math.round(10 * a), o, "rgba(6,10,20,0.95)", 800, c3);
    t.drawImage(r.canvas, s + 2 * a, i + 1 * a, r.w, r.h);
  }
  reset() {
    this.states.clear();
  }
}

const vz = [],
  Al = { physical: 0, magic: 1, true: 2, crit: 3, heal: 4, gold: 5 },
  bz = [
    { size: 21, top: "#fff6e0", bottom: "#ffb45a", stroke: "#8a3a08" },
    { size: 21, top: "#eafcff", bottom: "#6fd0ff", stroke: "#134a94" },
    { size: 21, top: "#ffffff", bottom: "#dfe4f0", stroke: "#4a5068" },
    { size: 31, top: "#fff8b0", bottom: "#ff9a1e", stroke: "#9a2400", italic: !0 },
    { size: 20, top: "#e6ffe0", bottom: "#5fe87a", stroke: "#0f6a2c" },
    { size: 19, top: "#fff6b8", bottom: "#ffc02a", stroke: "#7a4a00" },
  ],
  Qb = [
    [0, 0],
    [16, -4],
    [-14, -6],
    [24, -2],
    [-22, -4],
    [8, -8],
    [-8, -8],
    [0, -10],
  ],
  Jb = 21,
  _z = 72,
  wz = 0.3,
  Mz = 0.75,
  kz = 8,
  Sz = 2,
  Tz = (n) => {
    const t = n - 1;
    return 1 + t * t * (2.9 * t + 1.9);
  };

class Ez {
  pool = [];
  strips = [];
  dpr = 1;
  stagger = new Map();
  heals = new Map();
  now = 0;
  a = { x: 0, y: 0, z: 0, height: 2, radius: 0.6, visible: !1, opacity: 1, unit: null };
  p = { x: 0, y: 0 };
  text;
  icons;
  team = 0;
  constructor(t, e, s) {
    ((this.text = t), (this.icons = e));
    for (let i = 0; i < _z; i++)
      this.pool.push({
        live: !1,
        style: 0,
        text: "",
        sprite: null,
        wx: 0,
        wy: 0,
        wz: 0,
        ox: 0,
        oy: 0,
        dir: 1,
        t: 0,
        life: 1,
        scale: 1,
        alpha: 1,
        crit: !1,
        coin: !1,
        src: -1,
        dst: -1,
        amount: 0,
        last: 0,
        prio: 2,
        lift: 0,
        liftNow: 0,
      });
    this.setDpr(s);
  }
  setDpr(t) {
    (t === this.dpr && this.strips.length > 0) ||
      ((this.dpr = t), (this.strips = bz.map((e) => new dz(e, t))));
  }
  take() {
    let t = this.pool[0];
    for (const e of this.pool) {
      if (!e.live) return e;
      e.t / e.life > t.t / t.life && (t = e);
    }
    return t;
  }
  spawn(t, e, s, i, a, o, r, l, c) {
    const f = this.a;
    let d = 1.8,
      h = s,
      u = i;
    e.get(t, f) && ((h = f.x), (u = f.z), (d = f.y + Math.min(f.height * 0.62, 3.4)));
    let m = this.stagger.get(t);
    (m || ((m = { t: -9, n: 0 }), this.stagger.set(t, m)),
      (m.n = this.now - m.t < 0.8 ? m.n + 1 : 0),
      (m.t = this.now));
    const x = Qb[m.n % Qb.length];
    if (m.n > 0)
      for (const g of this.pool)
        g.live && g.dst === t && g.t < g.life * 0.85 && (g.lift += c ? Jb * 1.4 : Jb);
    const p = this.take();
    return (
      (p.live = !0),
      (p.style = a),
      (p.text = o),
      (p.sprite = null),
      (p.wx = h),
      (p.wy = d),
      (p.wz = u),
      (p.ox = x[0] + 30),
      (p.oy = x[1]),
      (p.dir = m.n % 2 === 0 ? 1 : -1),
      (p.t = 0),
      (p.life = c ? 1.15 : 0.95),
      (p.scale = r),
      (p.alpha = l),
      (p.crit = c),
      (p.coin = !1),
      (p.src = -1),
      (p.dst = t),
      (p.amount = 0),
      (p.last = 0),
      (p.prio = 2),
      (p.lift = 0),
      (p.liftNow = 0),
      p
    );
  }
  mergeable(t, e, s, i) {
    for (const a of this.pool)
      if (
        !(!a.live || a.src !== t || a.dst !== e || a.style !== s) &&
        (a.t < wz || (a.t < Mz && Math.abs(a.last - i) < 1))
      )
        return a;
    return null;
  }
  minorFull(t) {
    let e = 0,
      s = 0;
    for (const i of this.pool) !i.live || i.prio !== 1 || (e++, i.dst === t && s++);
    return e >= kz || s >= Sz;
  }
  hidden(t, e) {
    return t !== void 0 && t.id !== e && t.team !== this.team && t.team !== 2 && !t.visible[this.team];
  }
  handle(t, e, s, i) {
    const a = e.playerId;
    this.team = i === 1 ? 1 : 0;
    for (const o of t)
      switch (o.type) {
        case "damage": {
          if (o.amount < 1) break;
          const r = o.sourceId === a || o.targetId === a,
            l = s.unit(o.targetId);
          if (this.hidden(l, a) || (!r && (l === void 0 || l.kind !== "hero"))) break;
          const c = o.crit ? Al.crit : Az(o.dtype),
            f = this.mergeable(o.sourceId, o.targetId, c, o.amount);
          if (f) {
            ((f.amount += o.amount), (f.last = o.amount));
            const u = Math.round(f.amount);
            ((f.text = o.crit ? `${u}!` : String(u)), (f.t = Math.min(f.t, 0.04)));
            break;
          }
          if (!r && this.minorFull(o.targetId)) break;
          const d = Math.round(o.amount),
            h = this.spawn(
              o.targetId,
              s,
              o.pos.x,
              o.pos.y,
              c,
              o.crit ? `${d}!` : String(d),
              r ? 1 : 0.7,
              r ? 1 : 0.72,
              o.crit,
            );
          h &&
            ((h.src = o.sourceId),
            (h.amount = o.amount),
            (h.last = o.amount),
            (h.prio = r ? 2 : 1),
            o.targetId === a && o.sourceId !== a && ((h.ox -= 60), (h.dir = -1)));
          break;
        }
        case "heal": {
          const r = this.heals.get(o.targetId);
          r ? (r.sum += o.amount) : this.heals.set(o.targetId, { sum: o.amount, t: this.now });
          break;
        }
        case "gold": {
          if (o.unitId !== a || o.amount < 1) break;
          const r = this.spawn(
            a,
            s,
            o.pos.x,
            o.pos.y,
            Al.gold,
            `+${Math.round(o.amount)}`,
            o.reason === "passive" ? 0.8 : 1,
            1,
            !1,
          );
          r && ((r.coin = !0), (r.life = 1.2), (r.oy -= 26));
          break;
        }
        case "levelUp": {
          if (this.hidden(s.unit(o.unitId), a)) break;
          const r = this.spawn(o.unitId, s, 0, 0, Al.gold, "", 1, 1, !1);
          r &&
            ((r.sprite = this.text.get(`升级 Lv.${o.level}`, 17, "#ffe58a", "rgba(60,34,0,0.95)", 800)),
            (r.life = 1.5),
            (r.oy -= 34));
          break;
        }
      }
  }
  draw(t, e, s, i, a, o, r, l) {
    if (((this.now += e), this.heals.size > 0))
      for (const [d, h] of this.heals) {
        if (this.now - h.t < 0.45) continue;
        this.heals.delete(d);
        const u = i.unit(d);
        if (h.sum >= 15 && u && (d === s.playerId || u.kind === "hero") && !this.hidden(u, s.playerId)) {
          const m = this.spawn(
            d,
            i,
            u.pos.x,
            u.pos.y,
            Al.heal,
            `+${Math.round(h.sum)}`,
            d === s.playerId ? 1 : 0.8,
            1,
            !1,
          );
          m && ((m.ox -= 58), (m.oy -= 14), (m.dir = -1));
        }
      }
    this.stagger.size > 256 && this.stagger.clear();
    const c = this.p,
      f = Math.min(1, e * 14);
    for (const d of this.pool)
      d.live && ((d.t += e), (d.liftNow += (d.lift - d.liftNow) * f), d.t >= d.life && (d.live = !1));
    for (let d = 1; d <= 2; d++) this.drawPass(t, d, a, o, r, l, c);
    t.globalAlpha = 1;
  }
  drawPass(t, e, s, i, a, o, r) {
    for (const l of this.pool) {
      if (!l.live || (e === 1) != (l.prio === 1)) continue;
      const c = l.t / l.life;
      if (!s(l.wx, l.wy, l.wz, r) || r.x < -80 || r.x > i + 80 || r.y < -80 || r.y > a + 80) continue;
      const f = 1 - (1 - c) * (1 - c),
        d = r.x + (l.ox + l.dir * 16 * c) * o,
        h = r.y + (l.oy - 18 - 40 * f - l.liftNow) * o,
        u = l.crit ? 2 - 1 * Tz(Math.min(1, l.t / 0.26)) : 1.4 - 0.4 * Math.min(1, l.t / 0.12),
        m = l.scale * u * o,
        x = l.alpha * (c < 0.62 ? 1 : 1 - (c - 0.62) / 0.38);
      if (((t.globalAlpha = x), l.sprite)) {
        const p = l.sprite.w * m,
          g = l.sprite.h * m;
        t.drawImage(l.sprite.canvas, d - p / 2, h - g / 2, p, g);
      } else {
        const p = this.strips[l.style];
        if (l.coin) {
          const g = p.measure(l.text) * m;
          this.icons.draw(t, "coin", d - g / 2 - 9 * m, h, 15 * m);
        }
        p.draw(t, l.text, d, h, m);
      }
    }
  }
  reset() {
    for (const t of this.pool) t.live = !1;
    (this.stagger.clear(), this.heals.clear());
  }
}

function Az(n) {
  return n === "magic" ? Al.magic : n === "true" ? Al.true : Al.physical;
}

const Rz = Lt(Yt.player.main),
  Cz = Lt(16730682),
  Lz = Lt(16762954),
  Iz = Lt(16753210),
  i2 = Lt(16725542),
  t_ = Lt(3803142),
  a2 = 6,
  Pz = 2;

class Dz {
  k;
  pointer = -1;
  lock = -1;
  warn = -1;
  towers = [];
  facing = 0;
  stamp = 0;
  enabled = !0;
  constructor(t) {
    this.k = t;
  }
  drop(t) {
    this[t] >= 0 && (this.k.decals.release(this[t], 0.15), (this[t] = -1));
  }
  update(t) {
    const e = this.k,
      s = e.decals,
      i = t.state,
      a = ++this.stamp,
      o = this.enabled && e.anchor(i.playerId) && e.a.unit && e.a.unit.alive ? e.a.unit : null;
    if (!o) {
      (this.drop("pointer"), this.drop("lock"), this.drop("warn"));
      for (const v of this.towers) s.release(v.slot, 0.15);
      this.towers.length = 0;
      return;
    }
    const r = e.a.x,
      l = e.a.y,
      c = e.a.z,
      f = e.a.radius,
      d = e.a.height;
    let h = o.facing - this.facing;
    ((h = Math.atan2(Math.sin(h), Math.cos(h))),
      (this.facing += h * Math.min(1, t.dt * 16)),
      this.pointer < 0 && ((this.pointer = s.hold(Xt.pointer, 0.2)), (this.facing = o.facing)),
      s
        .at(this.pointer)
        .at(r, c)
        .y(0.07)
        .radius(f + 0.95)
        .rot(this.facing)
        .color(Rz, 1.5, 0.9)
        .under(W.shadow, 0.35));
    let u = !1;
    if (o.targetId >= 0 && e.anchor(o.targetId) && e.a.visible) {
      const v = e.a.unit;
      v &&
        v.team !== o.team &&
        (this.lock < 0 && (this.lock = s.hold(Xt.lock, 0.1)),
        s
          .at(this.lock)
          .at(e.a.x, e.a.z)
          .y(0.08)
          .radius(e.a.radius + 0.7)
          .color(v.team === 2 ? Lz : Cz, 1.9, 0.95)
          .under(W.shadow, 0.4),
        (u = !0));
    }
    u || this.drop("lock");
    let m = null,
      x = null,
      p = 1 / 0,
      g = 1 / 0;
    for (const v of i.units) {
      if ((v.kind !== "tower" && v.kind !== "core") || !v.alive || v.team === o.team) continue;
      const _ = Math.hypot(v.pos.x - o.pos.x, v.pos.y - o.pos.y);
      _ >= v.stats.attackRange + a2 ||
        (_ < p ? ((x = m), (g = p), (m = v), (p = _)) : _ < g && ((x = v), (g = _)));
    }
    let y = !1;
    for (let v = 0; v < Pz; v++) {
      const _ = v === 0 ? m : x;
      if (!_) break;
      const k = v === 0 ? p : g,
        M = _.stats.attackRange;
      let S = null;
      for (const C of this.towers) C.id === _.id && (S = C);
      (S || ((S = { id: _.id, slot: s.hold(Xt.range, 0.25), seen: a }), this.towers.push(S)), (S.seen = a));
      const b = _.targetId === i.playerId,
        w = k <= M + f,
        T = $I(M + a2, M + a2 - 3, k),
        E = b || w ? i2 : Iz,
        A = b ? 0.8 + 0.2 * Math.sin(e.now * 12) : 1;
      if (
        (s
          .at(S.slot)
          .at(_.pos.x, _.pos.y)
          .y(0.08)
          .radius(M)
          .params(b ? 0.016 : w ? 0.013 : 0.011, b ? 0 : 40)
          .color(E, b ? 2.2 : w ? 1.8 : 1.6, T * A * (w ? 1 : 0.9))
          .under(t_, b ? 0.5 : 0.3),
        b && e.anchor(_.id))
      ) {
        y = !0;
        let C = e.a.x,
          R = e.a.y + e.a.height * 0.82,
          I = e.a.z;
        e.anchors.attach?.(_.id, "core", e.v) && ((C = e.v.x), (R = e.v.y), (I = e.v.z));
        const P = (e.now % 0.3) / 0.3;
        e.ribbons.line($n.warn, C, R, I, r, l + d * 0.5, c, i2, 0.3 + 0.7 * (1 - P) * (1 - P));
      }
    }
    for (let v = this.towers.length - 1; v >= 0; v--)
      this.towers[v].seen !== a && (s.release(this.towers[v].slot, 0.25), this.towers.splice(v, 1));
    y
      ? (this.warn < 0 && (this.warn = s.hold(Xt.glow, 0.1)),
        s
          .at(this.warn)
          .at(r, c)
          .y(0.065)
          .radius(f + 1.5)
          .params(1.2)
          .color(i2, 1.2, 0.55 + 0.35 * Math.sin(e.now * 12))
          .under(t_, 0.5))
      : this.drop("warn");
  }
  reset() {
    ((this.pointer = -1), (this.lock = -1), (this.warn = -1), (this.towers.length = 0));
  }
  dispose() {
    (this.drop("pointer"), this.drop("lock"), this.drop("warn"));
    for (const t of this.towers) this.k.decals.release(t.slot, 0);
    this.towers.length = 0;
  }
}

const zz = 2;

function Nz(n) {
  const t = document.createElement("canvas");
  ((t.style.cssText = "position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;"),
    n.overlayRoot.appendChild(t));
  const e = t.getContext("2d");
  if (!e) throw new Error("2D canvas 不可用");
  let s = 1,
    i = 1,
    a = 1;
  const o = new fz(1),
    r = new uz(1),
    l = new yz(o, r),
    c = new Ez(o, r, 1),
    f = { bars: !0, floaters: !0, marks: !0 },
    d = n.getModule("fx")?.kit,
    h = d ? null : new l8(n),
    u = d ?? h,
    m = new Dz(u),
    x = (k) => m.update(k);
  u.hooks.push(x);
  const p = () => m.reset();
  u.onClear.push(p);
  const g = () => u.anchors,
    y = () => {
      ((i = Math.max(1, n.viewport.width)),
        (a = Math.max(1, n.viewport.height)),
        (s = Math.min(zz, Math.max(1, window.devicePixelRatio || 1))));
      const k = Math.round(i * s),
        M = Math.round(a * s);
      (t.width !== k && (t.width = k),
        t.height !== M && (t.height = M),
        o.setDpr(s),
        r.setDpr(s),
        c.setDpr(s));
    };
  y();
  const v = new Ke(),
    _ = (k, M, S, b) => {
      const w = v.elements,
        T = w[3] * k + w[7] * M + w[11] * S + w[15];
      return T <= 0.05
        ? !1
        : ((b.x = (((w[0] * k + w[4] * M + w[8] * S + w[12]) / T) * 0.5 + 0.5) * i),
          (b.y = (0.5 - ((w[1] * k + w[5] * M + w[9] * S + w[13]) / T) * 0.5) * a),
          !0);
    };
  return {
    name: "overlay",
    update(k) {
      (h && (h.begin(k), h.flush(k)), (i !== n.viewport.width || a !== n.viewport.height) && y());
      const M = n.camera;
      (v.multiplyMatrices(M.projectionMatrix, M.matrixWorldInverse),
        e.setTransform(s, 0, 0, s, 0, 0),
        e.clearRect(0, 0, i, a));
      const S = Math.min(1.4, Math.max(0.7, Math.min(i / 1280, a / 720)));
      (f.bars && l.draw(e, k, g(), _, i, a, S), f.floaters && c.draw(e, k.dt, k.state, g(), _, i, a, S));
    },
    handleEvents(k, M) {
      f.floaters && c.handle(k, M, g(), n.frame.playerTeam);
    },
    resize: y,
    setVisible(k, M) {
      ((f[k] = M), k === "marks" && (m.enabled = M));
    },
    reset() {
      (l.reset(), c.reset(), m.reset());
    },
    setAvoid(k) {
      if (!k) {
        l.avoid = null;
        return;
      }
      const M = n.container.getBoundingClientRect();
      l.avoid = k.map((S) => ({
        left: S.left - M.left,
        top: S.top - M.top,
        right: S.right - M.left,
        bottom: S.bottom - M.top,
      }));
    },
    dispose() {
      const k = u.hooks.indexOf(x);
      k >= 0 && u.hooks.splice(k, 1);
      const M = u.onClear.indexOf(p);
      (M >= 0 && u.onClear.splice(M, 1), m.dispose(), h?.dispose(), t.remove());
    },
  };
}

const Fz = 57.5,
  Uz = 76,
  $t = (n, t) => ({ x: n, y: t }),
  $h = (n) => ({ x: n.y, y: n.x }),
  I0 = (n) => ({ x: -n.y, y: -n.x }),
  Ax = (n) => ({ x: n.x, y: n.y }),
  h8 = (n) => $h(I0(n));

function e_(n) {
  return [Ax, I0, $h, h8].map((t) => n.map(t));
}

const Oz = [
    [$t(-46.5, 35), $t(-42.5, 35), $t(-30.5, 23), $t(-34, 17.5), $t(-46.5, 19)],
    [$t(-46.5, 13), $t(-41.5, 12.5), $t(-41, -11.5), $t(-46.5, -12)],
    [$t(-46.5, -18), $t(-40.5, -18.5), $t(-34, -19.5), $t(-30.5, -23), $t(-46.5, -39)],
    [$t(-26, 18.5), $t(-14, 6.5), $t(-17.5, 3), $t(-29.5, 15)],
    [$t(-14, -6.5), $t(-25, -17.5), $t(-28.5, -14), $t(-17.5, -3)],
    [$t(-36, 6), $t(-30, 7), $t(-24.5, 1.5), $t(-25, -3), $t(-31, -7.5), $t(-36, -6.5)],
  ],
  Bz = [
    [$t(-57.3, -40), $t(-54.6, -40), $t(-54.6, -31), $t(-57.3, -31)],
    [$t(-46.3, 13.6), $t(-42.2, 13.4), $t(-42.2, 18.6), $t(-46.3, 18.6)],
    [$t(-30, 22.5), $t(-26.5, 19), $t(-29, 16.5), $t(-32, 20)],
    [$t(-25.5, -18), $t(-30, -22.5), $t(-32, -20.5), $t(-27.5, -16)],
    [$t(-14, 4), $t(-10.5, 1.2), $t(-10.5, -1.2), $t(-14, -4)],
  ],
  n_ = [$t(-57.3, -57.3), $t(-51, -57.3), $t(-57.3, -51)],
  Hz = [
    { monsterType: "frost_golem", pos: $t(-36.5, 12.5), spawns: [$t(0, 0)], firstSpawn: 25, respawn: 90 },
    {
      monsterType: "glimwing",
      pos: $t(-35, -13),
      spawns: [$t(-1, -0.2), $t(1, 0.3)],
      firstSpawn: 25,
      respawn: 55,
    },
    { monsterType: "mossback", pos: $t(-20.5, 0), spawns: [$t(0, 0)], firstSpawn: 25, respawn: 55 },
  ];

function $z() {
  const n = [],
    t = [
      { f: Ax, side: 0, lower: !1 },
      { f: I0, side: 0, lower: !0 },
      { f: $h, side: 1, lower: !1 },
      { f: h8, side: 1, lower: !0 },
    ];
  for (const e of t)
    for (const s of Hz) {
      const i = s.monsterType === "frost_golem" && e.lower ? "ember_golem" : s.monsterType,
        a = e.f(s.pos);
      n.push({
        id: n.length,
        side: e.side,
        monsterType: i,
        pos: a,
        spawns: s.spawns.map((o) => e.f(o)),
        firstSpawn: s.firstSpawn,
        respawn: s.respawn,
      });
    }
  return (
    n.push({
      id: n.length,
      side: 2,
      monsterType: "abyss_drake",
      pos: $t(-24, -24),
      spawns: [$t(0, 0)],
      firstSpawn: 120,
      respawn: 150,
    }),
    n.push({
      id: n.length,
      side: 2,
      monsterType: "star_colossus",
      pos: $t(24, 24),
      spawns: [$t(0, 0)],
      firstSpawn: 270,
      respawn: 210,
    }),
    n
  );
}

const s_ = [$t(-52, 42), $t(-52, -45), $t(-51, -49), $t(-49, -51), $t(-45, -52), $t(42, -52)],
  Gz = { top: s_, mid: [$t(-43, 43), $t(-36, 36), $t(0, 0), $t(36, -36), $t(43, -43)], bot: s_.map(I0) };

function i_(n) {
  const t = n === 0 ? Ax : $h,
    e = $t(-54, 54),
    s = [$t(0, 0), $t(1.8, 0.6), $t(-0.6, -1.8), $t(1.6, -1.6), $t(2.8, -2.8)];
  return {
    team: n,
    core: t($t(-47, 47)),
    fountain: t(e),
    fountainRadius: 4.5,
    spawns: s.map((i) => t($t(e.x + i.x, e.y + i.y))),
    minionSpawn: { top: t($t(-52, 37)), mid: t($t(-41, 41)), bot: t($t(-37, 52)) },
    area: [$t(-57.5, 32), $t(-39.5, 32), $t(-32, 39.5), $t(-32, 57.5), $t(-57.5, 57.5)].map(t),
  };
}

const a_ = [
  { lane: "top", tier: 3, pos: $t(-48.6, 27) },
  { lane: "top", tier: 2, pos: $t(-55.4, 4) },
  { lane: "top", tier: 1, pos: $t(-48.6, -24) },
  { lane: "mid", tier: 3, pos: $t(-32.4, 27.6) },
  { lane: "mid", tier: 2, pos: $t(-18.6, 23.4) },
  { lane: "mid", tier: 1, pos: $t(-12.9, 8.1) },
  { lane: "bot", tier: 3, pos: I0($t(-48.6, 27)) },
  { lane: "bot", tier: 2, pos: I0($t(-55.4, 4)) },
  { lane: "bot", tier: 1, pos: I0($t(-48.6, -24)) },
];

function Vz() {
  const n = [];
  for (const t of a_) n.push({ team: 0, lane: t.lane, tier: t.tier, pos: t.pos });
  for (const t of a_) n.push({ team: 1, lane: t.lane, tier: t.tier, pos: $h(t.pos) });
  return n;
}

function u8() {
  return {
    bound: Fz,
    half: Uz,
    lanes: Gz,
    laneWidth: 10,
    bases: [i_(0), i_(1)],
    towers: Vz(),
    walls: Oz.flatMap(e_),
    bushes: [...Bz.flatMap(e_), n_, n_.map(I0)],
    camps: $z(),
    river: [$t(-52, -52), $t(0, 0), $t(52, 52)],
    riverWidth: 10.6,
  };
}

function yo(n, t) {
  let e = !1;
  for (let s = 0, i = t.length - 1; s < t.length; i = s++) {
    const a = t[s],
      o = t[i];
    a.y > n.y != o.y > n.y && n.x < ((o.x - a.x) * (n.y - a.y)) / (o.y - a.y) + a.x && (e = !e);
  }
  return e;
}

function Ah(n, t, e) {
  const s = e.x - t.x,
    i = e.y - t.y,
    a = s * s + i * i;
  let o = a > 0 ? ((n.x - t.x) * s + (n.y - t.y) * i) / a : 0;
  return ((o = Math.max(0, Math.min(1, o))), Math.hypot(n.x - (t.x + s * o), n.y - (t.y + i * o)));
}

function p8(n, t) {
  let e = 1 / 0;
  for (let s = 0, i = t.length - 1; s < t.length; i = s++) e = Math.min(e, Ah(n, t[i], t[s]));
  return e;
}

const Fn = -0.13,
  Wz = 0.52,
  mn = 64,
  H1 = { lane: 6, river: 6, solid: 4, base: 6, bush: 3, camp: 6, pad: 6 };

function Bf(n) {
  switch (n) {
    case "abyss_drake":
    case "star_colossus":
      return 5.2;
    case "frost_golem":
    case "ember_golem":
      return 3.6;
    default:
      return 2.8;
  }
}

const Rx = 3.3,
  Sm = 6.6,
  Cx = { frost_golem: 1, ember_golem: 2, mossback: 3, glimwing: 4, abyss_drake: 5, star_colossus: 6 },
  f3 = 14,
  jz = 2.6,
  $1 = (n, t, e) => {
    const s = Math.min(1, Math.max(0, (e - n) / (t - n)));
    return s * s * (3 - 2 * s);
  };

function o2(n) {
  let t = 1 / 0,
    e = -1 / 0,
    s = 1 / 0,
    i = -1 / 0;
  for (const a of n)
    ((t = Math.min(t, a.x)), (e = Math.max(e, a.x)), (s = Math.min(s, a.y)), (i = Math.max(i, a.y)));
  return { poly: n, minX: t, maxX: e, minY: s, maxY: i };
}

function Er(n, t) {
  const e = p8(n, t);
  return yo(n, t) ? -e : e;
}

class qz {
  map;
  walls;
  bushes;
  bases;
  riverLine;
  laneSegs = [];
  pads = [];
  tmp = { x: 0, y: 0 };
  constructor(t) {
    ((this.map = t),
      (this.walls = t.walls.map(o2)),
      (this.bushes = t.bushes.map(o2)),
      (this.bases = t.bases.map((l) => o2(l.area))));
    for (const l of Object.values(t.lanes))
      for (let c = 1; c < l.length; c++) this.laneSegs.push([l[c - 1], l[c]]);
    const e = t.river,
      s = e[0],
      i = e[1],
      a = e[e.length - 1],
      o = e[e.length - 2],
      r = (l, c, f) => {
        const d = l.x - c.x,
          h = l.y - c.y,
          u = Math.hypot(d, h) || 1;
        return { x: l.x + (d / u) * f, y: l.y + (h / u) * f };
      };
    this.riverLine = [r(s, i, 40), ...e, r(a, o, 40)];
    for (const l of t.towers) this.pads.push({ pos: l.pos, r: Rx });
    for (const l of t.bases) this.pads.push({ pos: l.core, r: Sm });
  }
  pt(t, e) {
    return ((this.tmp.x = t), (this.tmp.y = e), this.tmp);
  }
  laneDist(t, e) {
    const s = this.pt(t, e);
    let i = 1 / 0;
    for (const a of this.laneSegs) i = Math.min(i, Ah(s, a[0], a[1]));
    return i - this.map.laneWidth / 2;
  }
  riverDist(t, e) {
    const s = this.pt(t, e);
    let i = 1 / 0;
    const a = this.riverLine;
    for (let o = 1; o < a.length; o++) i = Math.min(i, Ah(s, a[o - 1], a[o]));
    return i - this.map.riverWidth / 2;
  }
  wallDist(t, e, s = 8) {
    const i = this.pt(t, e);
    let a = s;
    for (const o of this.walls)
      t < o.minX - a ||
        t > o.maxX + a ||
        e < o.minY - a ||
        e > o.maxY + a ||
        (a = Math.min(a, Er(i, o.poly)));
    return a;
  }
  boundDist(t, e) {
    return this.map.bound - Math.max(Math.abs(t), Math.abs(e));
  }
  solidDist(t, e, s = 8) {
    return Math.min(this.wallDist(t, e, s), this.boundDist(t, e));
  }
  baseDist(t, e, s = 8) {
    const i = this.pt(t, e);
    let a = s;
    for (const o of this.bases)
      t < o.minX - a ||
        t > o.maxX + a ||
        e < o.minY - a ||
        e > o.maxY + a ||
        (a = Math.min(a, Er(i, o.poly)));
    return a;
  }
  bushDist(t, e, s = 4) {
    const i = this.pt(t, e);
    let a = s;
    for (const o of this.bushes)
      t < o.minX - a ||
        t > o.maxX + a ||
        e < o.minY - a ||
        e > o.maxY + a ||
        (a = Math.min(a, Er(i, o.poly)));
    return a;
  }
  campDist(t, e) {
    let s = 1 / 0;
    for (const i of this.map.camps) s = Math.min(s, Math.hypot(t - i.pos.x, e - i.pos.y) - Bf(i.monsterType));
    return s;
  }
  padDist(t, e) {
    let s = 1 / 0;
    for (const i of this.pads) s = Math.min(s, Math.hypot(t - i.pos.x, e - i.pos.y) - i.r);
    return s;
  }
  fountainDist(t, e) {
    let s = 1 / 0;
    for (const i of this.map.bases)
      s = Math.min(s, Math.hypot(t - i.fountain.x, e - i.fountain.y) - i.fountainRadius);
    return s;
  }
  heightAt(t, e) {
    const s = this.riverDist(t, e);
    if (s > 0.4) return 0;
    const i = $1(1, -1.5, this.laneDist(t, e));
    return -(Wz * (1 - 0.42 * i)) * $1(0.4, -1.9, s);
  }
  inWater(t, e) {
    return this.heightAt(t, e) < Fn && this.boundDist(t, e) > -1;
  }
  clutterOk(t, e, s = 0.3) {
    return !(
      this.solidDist(t, e) < 0.15 ||
      this.laneDist(t, e) < s ||
      this.riverDist(t, e) < 0.8 ||
      this.baseDist(t, e) < 0.6 ||
      this.padDist(t, e) < 0.5
    );
  }
}

function o_(n, t, e, s, i) {
  const a = t / (mn * 2),
    o = Math.max(0, Math.floor((Math.min(e.x, s.x) - i + mn) * a)),
    r = Math.min(t - 1, Math.ceil((Math.max(e.x, s.x) + i + mn) * a)),
    l = Math.max(0, Math.floor((Math.min(e.y, s.y) - i + mn) * a)),
    c = Math.min(t - 1, Math.ceil((Math.max(e.y, s.y) + i + mn) * a)),
    f = { x: 0, y: 0 };
  for (let d = l; d <= c; d++) {
    f.y = (d + 0.5) / a - mn;
    for (let h = o; h <= r; h++) {
      f.x = (h + 0.5) / a - mn;
      const u = Ah(f, e, s),
        m = d * t + h;
      u < n[m] && (n[m] = u);
    }
  }
}

function r2(n, t, e, s) {
  const i = t / (mn * 2),
    a = Math.max(0, Math.floor((e.minX - s + mn) * i)),
    o = Math.min(t - 1, Math.ceil((e.maxX + s + mn) * i)),
    r = Math.max(0, Math.floor((e.minY - s + mn) * i)),
    l = Math.min(t - 1, Math.ceil((e.maxY + s + mn) * i)),
    c = { x: 0, y: 0 };
  for (let f = r; f <= l; f++) {
    c.y = (f + 0.5) / i - mn;
    for (let d = a; d <= o; d++) {
      c.x = (d + 0.5) / i - mn;
      const h = Er(c, e.poly),
        u = f * t + d;
      h < n[u] && (n[u] = h);
    }
  }
}

function l2(n, t, e, s, i) {
  const a = t / (mn * 2),
    o = Math.max(0, Math.floor((e.x - s - i + mn) * a)),
    r = Math.min(t - 1, Math.ceil((e.x + s + i + mn) * a)),
    l = Math.max(0, Math.floor((e.y - s - i + mn) * a)),
    c = Math.min(t - 1, Math.ceil((e.y + s + i + mn) * a));
  for (let f = l; f <= c; f++) {
    const d = (f + 0.5) / a - mn;
    for (let h = o; h <= r; h++) {
      const u = (h + 0.5) / a - mn,
        m = Math.hypot(u - e.x, d - e.y) - s,
        x = f * t + h;
      m < n[x] && (n[x] = m);
    }
  }
}

function m8(n) {
  const t = Math.hypot(n.x, n.z) || 1;
  return { hx: n.x / t, hz: n.z / t, cot: t / Math.max(0.05, n.y) };
}

function Xz(n, t, e, s) {
  const { hx: i, hz: a, cot: o } = m8(s),
    r = jz * o,
    l = t / (mn * 2),
    c = new Float32Array(t * t).fill(1),
    f = 7;
  for (let h = 0; h < t; h++) {
    const u = (h + 0.5) / l - mn;
    for (let m = 0; m < t; m++) {
      const x = (m + 0.5) / l - mn,
        p = h * t + m,
        g = n[p],
        y = e - Math.max(Math.abs(x), Math.abs(u));
      if (g <= 0 || y < -1 || (g > r + 0.6 && y > r + 0.6)) continue;
      let v = 0;
      for (let _ = 1; _ <= f; _++) {
        const k = (r * _) / f,
          M = x + i * k,
          S = u + a * k;
        let b = 0;
        if (Math.max(Math.abs(M), Math.abs(S)) > e + 0.25) S < e - 9 && (b = 1);
        else {
          const w = Math.min(t - 1, Math.max(0, Math.floor((M + mn) * l))),
            T = Math.min(t - 1, Math.max(0, Math.floor((S + mn) * l)));
          b = Math.min(1, Math.max(0, (-n[T * t + w] - 0.05) / 0.3));
        }
        ((b *= 1 - 0.55 * $1(0.55, 1, _ / f)), b > v && (v = b));
      }
      c[p] = 1 - v;
    }
  }
  const d = new Float32Array(t * t);
  for (let h = 0; h < 2; h++) {
    for (let u = 0; u < t; u++)
      for (let m = 0; m < t; m++) {
        const x = Math.max(0, m - 1),
          p = Math.min(t - 1, m + 1);
        d[u * t + m] = (c[u * t + x] + c[u * t + m] + c[u * t + p]) / 3;
      }
    for (let u = 0; u < t; u++) {
      const m = Math.max(0, u - 1),
        x = Math.min(t - 1, u + 1);
      for (let p = 0; p < t; p++) c[u * t + p] = (d[m * t + p] + d[u * t + p] + d[x * t + p]) / 3;
    }
  }
  return c;
}

function Yz(n, t, e) {
  const s = n.b.image,
    i = s.data,
    a = s.width,
    { hx: o, hz: r, cot: l } = m8(e),
    c = a / (mn * 2);
  for (const f of t) {
    const d = f.x - o * f.height * l,
      h = f.z - r * f.height * l,
      u = f.radius,
      m = Math.max(0, Math.floor((d - u + mn) * c)),
      x = Math.min(a - 1, Math.ceil((d + u + mn) * c)),
      p = Math.max(0, Math.floor((h - u + mn) * c)),
      g = Math.min(a - 1, Math.ceil((h + u + mn) * c));
    for (let y = p; y <= g; y++) {
      const v = (y + 0.5) / c - mn;
      for (let _ = m; _ <= x; _++) {
        const k = (_ + 0.5) / c - mn,
          M = Math.hypot(k - d, v - h) / u;
        if (M >= 1) continue;
        const S = 1 - f.strength * (1 - $1(0.55, 1, M)),
          b = (y * a + _) * 4 + 2;
        i[b] = Math.min(i[b], Math.round(255 * S));
      }
    }
  }
  n.b.needsUpdate = !0;
}

function Kz(n, t, e) {
  const s = t * t,
    i = H1,
    a = n.map,
    o = a.laneWidth / 2,
    r = a.riverWidth / 2,
    l = new Float32Array(s).fill(o + i.lane),
    c = new Float32Array(s).fill(r + i.river),
    f = new Float32Array(s).fill(i.solid),
    d = new Float32Array(s).fill(i.base),
    h = new Float32Array(s).fill(i.bush),
    u = new Float32Array(s).fill(i.camp),
    m = new Float32Array(s).fill(i.pad);
  for (const M of Object.values(a.lanes))
    for (let S = 1; S < M.length; S++) o_(l, t, M[S - 1], M[S], o + i.lane);
  const x = n.riverLine;
  for (let M = 1; M < x.length; M++) o_(c, t, x[M - 1], x[M], r + i.river);
  for (const M of n.walls) r2(f, t, M, i.solid);
  for (const M of n.bases) r2(d, t, M, i.base);
  for (const M of n.bushes) r2(h, t, M, i.bush);
  for (const M of a.camps) l2(u, t, M.pos, Bf(M.monsterType), i.camp);
  for (const M of a.towers) l2(m, t, M.pos, Rx, i.pad);
  for (const M of a.bases) l2(m, t, M.core, Sm, i.pad);
  const p = Xz(f, t, a.bound, e),
    g = new Uint8Array(s * 4),
    y = new Uint8Array(s * 4),
    v = (M, S) => Math.min(255, Math.max(0, Math.round((M / S) * 127.5 + 127.5))),
    _ = (mn * 2) / t;
  for (let M = 0; M < t; M++) {
    const S = (M + 0.5) * _ - mn;
    for (let b = 0; b < t; b++) {
      const w = (b + 0.5) * _ - mn,
        T = M * t + b,
        E = T * 4;
      ((g[E] = v(l[T] - o, i.lane)),
        (g[E + 1] = v(c[T] - r, i.river)),
        (g[E + 2] = v(Math.min(f[T], a.bound - Math.max(Math.abs(w), Math.abs(S))), i.solid)),
        (g[E + 3] = v(d[T], i.base)),
        (y[E] = v(h[T], i.bush)),
        (y[E + 1] = v(u[T], i.camp)),
        (y[E + 2] = Math.round(p[T] * 255)),
        (y[E + 3] = v(m[T], i.pad)));
    }
  }
  const k = (M) => {
    const S = new zr(M, t, t, Gs, mi);
    return (
      (S.wrapS = S.wrapT = co),
      (S.minFilter = Ns),
      (S.magFilter = Ns),
      (S.generateMipmaps = !1),
      (S.colorSpace = Ki),
      (S.needsUpdate = !0),
      S
    );
  };
  return { a: k(g), b: k(y) };
}

function yt(n) {
  const t = new Ut(n);
  return [t.r, t.g, t.b];
}

function Pt(n, t, e) {
  return [n[0] + (t[0] - n[0]) * e, n[1] + (t[1] - n[1]) * e, n[2] + (t[2] - n[2]) * e];
}

function Ht(n, t) {
  return [n[0] * t, n[1] * t, n[2] * t];
}

const g8 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n),
  Mn = (n, t, e) => n + (t - n) * e,
  ci = (n, t, e) => {
    const s = g8((e - n) / (t - n));
    return s * s * (3 - 2 * s);
  },
  ep = new dt(),
  cd = new dt(),
  r_ = new Je(),
  Lx = -1,
  Ir = 0,
  li = 1,
  x8 = 2,
  Ix = 3,
  l_ = 5;

function gs(n, t, e = 0.45, s = 0.3) {
  let i = (Math.imul(Math.round(n * 97) | 0, 374761393) ^ Math.imul(Math.round(t * 89) | 0, 668265263)) | 0;
  i = Math.imul(i ^ (i >>> 13), 1274126177);
  const a = ((i ^ (i >>> 16)) >>> 0) / 4294967296;
  return a < e ? li : a < e + s ? x8 : Ix;
}

function Zz(n, t, e) {
  const s = n.geometry,
    i = s.userData.rankEnds;
  if (!i) return;
  const a = i[Math.min(Ix, Math.max(Ir, t)) + 1];
  if ((s.setDrawRange(0, a), !n.castShadow)) return;
  const o = i[0],
    r = Math.max(o, i[Math.min(t, e) + 1]);
  ((n.onBeforeShadow = () => s.setDrawRange(o, r - o)), (n.onAfterShadow = () => s.setDrawRange(0, a)));
}

class Be {
  positions = [];
  normals = [];
  colors = [];
  fx = [];
  indices = [];
  rankRuns = [];
  rank = Ir;
  setRank(t) {
    t !== this.rank && ((this.rank = t), this.rankRuns.push(this.indices.length, t));
  }
  get vertexCount() {
    return this.positions.length / 3;
  }
  get triangleCount() {
    return this.indices.length / 3;
  }
  vertex(t, e, s, i, a = 0, o = 1, r = 0, l = 0, c = 0, f = 0, d = 1) {
    const h = this.positions.length / 3;
    return (
      this.positions.push(t, e, s),
      this.normals.push(a, o, r),
      this.colors.push(i[0], i[1], i[2]),
      this.fx.push(l, c, f, d),
      h
    );
  }
  tri(t, e, s) {
    this.indices.push(t, e, s);
  }
  quad(t, e, s, i) {
    this.indices.push(t, e, s, t, s, i);
  }
  append(t, e, s, i = 1, a = 1, o = !1) {
    const r = t.attributes.position,
      l = t.attributes.normal,
      c = t.attributes.color,
      f = t.attributes.aFx,
      d = this.positions.length / 3;
    r_.getNormalMatrix(e);
    for (let u = 0; u < r.count; u++) {
      (ep.fromBufferAttribute(r, u).applyMatrix4(e),
        this.positions.push(ep.x, ep.y, ep.z),
        l ? cd.fromBufferAttribute(l, u).applyMatrix3(r_).normalize() : cd.set(0, 1, 0),
        this.normals.push(cd.x, cd.y, cd.z));
      const m = c ? c.getX(u) : 1,
        x = c ? c.getY(u) : 1,
        p = c ? c.getZ(u) : 1,
        g = o ? (f ? f.getZ(u) : 0) : 1;
      (s && g > 0
        ? this.colors.push(m * (1 + (s[0] - 1) * g), x * (1 + (s[1] - 1) * g), p * (1 + (s[2] - 1) * g))
        : this.colors.push(m, x, p),
        f ? this.fx.push(f.getX(u) * a, f.getY(u) * i, 0, f.getW(u)) : this.fx.push(0, 0, 0, 1));
    }
    const h = t.index;
    if (h) for (let u = 0; u < h.count; u++) this.indices.push(d + h.getX(u));
    else for (let u = 0; u < r.count; u++) this.indices.push(d + u);
  }
  computeNormals(t = 180) {
    const e = this.positions,
      s = this.indices,
      i = s.length / 3,
      a = new Float32Array(i * 3),
      o = new Float32Array(i * 3);
    for (let y = 0; y < i; y++) {
      const v = s[y * 3] * 3,
        _ = s[y * 3 + 1] * 3,
        k = s[y * 3 + 2] * 3,
        M = e[_] - e[v],
        S = e[_ + 1] - e[v + 1],
        b = e[_ + 2] - e[v + 2],
        w = e[k] - e[v],
        T = e[k + 1] - e[v + 1],
        E = e[k + 2] - e[v + 2],
        A = S * E - b * T,
        C = b * w - M * E,
        R = M * T - S * w,
        I = Math.hypot(A, C, R) || 1;
      ((a[y * 3] = A),
        (a[y * 3 + 1] = C),
        (a[y * 3 + 2] = R),
        (o[y * 3] = A / I),
        (o[y * 3 + 1] = C / I),
        (o[y * 3 + 2] = R / I));
    }
    const r = this.normals;
    if (t >= 180) {
      r.fill(0);
      for (let y = 0; y < i; y++)
        for (let v = 0; v < 3; v++) {
          const _ = s[y * 3 + v] * 3;
          ((r[_] += a[y * 3]), (r[_ + 1] += a[y * 3 + 1]), (r[_ + 2] += a[y * 3 + 2]));
        }
      for (let y = 0; y < r.length; y += 3) {
        const v = Math.hypot(r[y], r[y + 1], r[y + 2]) || 1;
        ((r[y] /= v), (r[y + 1] /= v), (r[y + 2] /= v));
      }
      return;
    }
    const l = e.length / 3,
      c = new Uint32Array(l),
      f = new Map();
    let d = 0;
    for (let y = 0; y < l; y++) {
      const v = `${Math.round(e[y * 3] * 500)},${Math.round(e[y * 3 + 1] * 500)},${Math.round(e[y * 3 + 2] * 500)}`;
      let _ = f.get(v);
      (_ === void 0 && ((_ = d++), f.set(v, _)), (c[y] = _));
    }
    const h = new Uint32Array(d + 1);
    for (let y = 0; y < s.length; y++) h[c[s[y]] + 1]++;
    for (let y = 0; y < d; y++) h[y + 1] += h[y];
    const u = h.slice(0, d),
      m = new Uint32Array(s.length);
    for (let y = 0; y < i; y++) for (let v = 0; v < 3; v++) m[u[c[s[y * 3 + v]]]++] = y;
    const x = Math.cos((t * Math.PI) / 180),
      p = new Array(l),
      g = new Uint8Array(l);
    for (let y = 0; y < i; y++) {
      const v = o[y * 3],
        _ = o[y * 3 + 1],
        k = o[y * 3 + 2];
      for (let M = 0; M < 3; M++) {
        const S = s[y * 3 + M];
        let b = 0,
          w = 0,
          T = 0;
        const E = c[S];
        for (let I = h[E]; I < h[E + 1]; I++) {
          const P = m[I];
          o[P * 3] * v + o[P * 3 + 1] * _ + o[P * 3 + 2] * k < x ||
            ((b += a[P * 3]), (w += a[P * 3 + 1]), (T += a[P * 3 + 2]));
        }
        const A = Math.hypot(b, w, T) || 1;
        ((b /= A), (w /= A), (T /= A));
        let C = p[S];
        C || (C = p[S] = []);
        let R = -1;
        for (let I = 0; I < C.length; I += 4)
          if (C[I + 1] * b + C[I + 2] * w + C[I + 3] * T > 0.9995) {
            R = C[I];
            break;
          }
        (R < 0 &&
          (g[S]
            ? ((R = this.positions.length / 3),
              this.positions.push(e[S * 3], e[S * 3 + 1], e[S * 3 + 2]),
              this.normals.push(0, 0, 0),
              this.colors.push(this.colors[S * 3], this.colors[S * 3 + 1], this.colors[S * 3 + 2]),
              this.fx.push(this.fx[S * 4], this.fx[S * 4 + 1], this.fx[S * 4 + 2], this.fx[S * 4 + 3]))
            : ((g[S] = 1), (R = S)),
          (r[R * 3] = b),
          (r[R * 3 + 1] = w),
          (r[R * 3 + 2] = T),
          C.push(R, b, w, T)),
          (s[y * 3 + M] = R));
      }
    }
  }
  build() {
    const t = new Bn();
    (t.setAttribute("position", new Ae(this.positions, 3)),
      t.setAttribute("normal", new Ae(this.normals, 3)),
      t.setAttribute("color", new Ae(this.colors, 3)));
    const e = new Uint8Array(this.fx.length);
    for (let l = 0; l < e.length; l++) e[l] = Math.round(g8(this.fx[l]) * 255);
    t.setAttribute("aFx", new On(e, 4, !0));
    const s = this.positions.length / 3;
    let i = this.indices;
    const a = i.length,
      o = [0, a, a, a, a],
      r = this.rankRuns;
    if (r.length > 0) {
      const l = Array.from({ length: l_ }, () => []);
      let c = Ir,
        f = 0;
      for (let d = 0; d <= r.length; d += 2) {
        const h = d < r.length ? r[d] : a,
          u = l[Math.min(Ix, Math.max(Lx, c)) + 1];
        for (let m = f; m < h; m++) u.push(i[m]);
        ((f = h), d < r.length && (c = r[d + 1]));
      }
      i = [];
      for (let d = 0; d < l_; d++) {
        for (const h of l[d]) i.push(h);
        o[d] = i.length;
      }
    }
    return (
      (t.userData.rankEnds = o),
      t.setIndex(s > 65535 ? new um(i, 1) : new hm(i, 1)),
      t.computeBoundingBox(),
      t.computeBoundingSphere(),
      t
    );
  }
}

class c_ {
  constructor(t = 32) {
    this.cell = t;
  }
  cell;
  cells = new Map();
  builder(t, e, s) {
    const i = `${Math.floor(t / this.cell)},${Math.floor(e / this.cell)},${s ? 1 : 0}`;
    let a = this.cells.get(i);
    return (a || ((a = new Be()), this.cells.set(i, a)), a);
  }
  add(t, e, s = {}) {
    const i = e.elements,
      a = s.shadow ?? !0,
      o = this.builder(i[12], i[14], a);
    (o.setRank(s.rank ?? (a ? Ir : li)),
      o.append(t, e, s.tint, s.glow ?? 1, s.sway ?? 1, s.maskedTint ?? !1));
  }
  at(t, e, s = !0, i = s ? Ir : li) {
    const a = this.builder(t, e, s);
    return (a.setRank(i), a);
  }
  get triangleCount() {
    let t = 0;
    for (const e of this.cells.values()) t += e.triangleCount;
    return t;
  }
  build(t, e, s, i, a = 0) {
    const o = [];
    for (const [r, l] of this.cells) {
      if (l.vertexCount === 0) continue;
      a > 0 && l.computeNormals(a);
      const c = r.endsWith(",1"),
        f = new Sn(l.build(), c ? t : e);
      ((f.name = `${i}:${r}`),
        (f.castShadow = c),
        (f.receiveShadow = !0),
        (f.matrixAutoUpdate = !1),
        s.add(f),
        o.push(f));
    }
    return (this.cells.clear(), o);
  }
}

function Qz(n) {
  let t = 0;
  for (let e = 0, s = n.length - 1; e < n.length; s = e++) t += n[s].x * n[e].y - n[e].x * n[s].y;
  return t / 2;
}

function xf(n) {
  let t = 0,
    e = 0;
  for (const s of n) ((t += s.x), (e += s.y));
  return { x: t / n.length, y: e / n.length };
}

function Jz(n, t, e, s) {
  const i = Qz(n) < 0 ? [...n].reverse() : [...n],
    a = i.length,
    o = [];
  for (let c = 0; c < a; c++) {
    const f = i[(c + a - 1) % a],
      d = i[c],
      h = i[(c + 1) % a],
      u = f.x - d.x,
      m = f.y - d.y,
      x = h.x - d.x,
      p = h.y - d.y,
      g = Math.hypot(u, m),
      y = Math.hypot(x, p),
      _ = -u * p + m * x > 1e-6,
      k = Math.min(e, g * 0.3, y * 0.3);
    if (!_ || k < 0.05) {
      o.push({ x: d.x, y: d.y });
      continue;
    }
    const M = { x: d.x + (u / g) * k, y: d.y + (m / g) * k },
      S = { x: d.x + (x / y) * k, y: d.y + (p / y) * k };
    for (const b of [0, 0.5, 1]) {
      const w = 1 - b;
      o.push({
        x: w * w * M.x + 2 * w * b * d.x + b * b * S.x,
        y: w * w * M.y + 2 * w * b * d.y + b * b * S.y,
      });
    }
  }
  const r = [];
  let l = 0;
  for (let c = 0; c < o.length; c++) {
    const f = o[c],
      d = o[(c + 1) % o.length],
      h = Math.hypot(d.x - f.x, d.y - f.y),
      u = Math.max(1, Math.round(h / t));
    for (let m = 0; m < u; m++) {
      let x = m / u;
      (m > 0 && (x += (s(l) - 0.5) * (0.5 / u)),
        r.push({ x: f.x + (d.x - f.x) * x, y: f.y + (d.y - f.y) * x }),
        l++);
    }
  }
  return Px(r);
}

function Px(n, t) {
  const e = n.length,
    s = [];
  let i = 0;
  for (let a = 0; a < e; a++) {
    const o = n[(a + e - 1) % e],
      r = n[a],
      l = n[(a + 1) % e];
    let c = r.x - o.x,
      f = r.y - o.y,
      d = l.x - r.x,
      h = l.y - r.y;
    const u = Math.hypot(c, f),
      m = Math.hypot(d, h);
    (u < 1e-6 && ((c = d), (f = h)), m < 1e-6 && ((d = c), (h = f)));
    const x = Math.hypot(c, f) || 1,
      p = Math.hypot(d, h) || 1,
      g = -f / x,
      y = c / x,
      v = -h / p,
      _ = d / p;
    let k = g + v,
      M = y + _;
    const S = Math.hypot(k, M) || 1;
    ((k /= S), (M /= S));
    const b = Math.max(0.35, k * g + M * y);
    (a > 0 && (i += Math.hypot(r.x - n[a - 1].x, r.y - n[a - 1].y)),
      s.push({ x: r.x, z: r.y, nx: k, nz: M, s: i, miter: 1 / b }));
  }
  return s;
}

function y8(n, t, e, s, i, a) {
  const o = t.length,
    r = [];
  for (let c = 0; c < s; c++) {
    const f = [];
    for (let d = 0; d < o; d++) {
      const h = t[d],
        u = i(h, d, c);
      f.push(
        n.vertex(
          h.x + h.nx * u.t,
          u.y,
          h.z + h.nz * u.t,
          u.color,
          0,
          1,
          0,
          0,
          u.glow ?? 0,
          u.tex ?? 0,
          u.ao ?? 1,
        ),
      );
    }
    r.push(f);
  }
  const l = e ? o : o - 1;
  for (let c = 0; c < s - 1; c++) {
    a && n.setRank(a(c));
    for (let f = 0; f < l; f++) {
      const d = (f + 1) % o;
      n.quad(r[c][f], r[c + 1][f], r[c + 1][d], r[c][d]);
    }
  }
  return (a && n.setRank(Ir), r);
}
export { cz, Nz, u8, yo, Ah, p8, Fn, mn, H1, Bf, Rx, Sm, Cx, f3, Er, qz, Yz, Kz, yt, Pt, Ht, Mn, ci, Lx, Ir, li, x8, gs, Zz, Be, c_, xf, Jz, Px, y8 };
