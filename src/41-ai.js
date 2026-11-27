// 41-ai.js — ai｜71 个顶层语句｜52KB
// 对应 game.pretty.js 第 76276–77941 行
// 关键内容：
//   VG                    moveTo
//   WG                    easy
//   uh                    stun
//   D3                    slow
//   nV                    panyue
//   sV                    panyue
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { rn, yr } from './01-audio.js';
import { Nh, Se, lm } from './02-data.js';
import { xo } from './18-core.js';
import { $f, Gf, xG } from './39-ui-7.js';
import { $G, GG, HG, Nm, Oa, Pk, S1 } from './40-ui-8.js';

class VG {
  v;
  goalX = 1e9;
  goalY = 1e9;
  checkX = 0;
  checkY = 0;
  checkAt = 0;
  stuckCount = 0;
  moved = !1;
  lastCastAt = -99;
  begin(t) {
    ((this.v = t), (this.moved = !1));
  }
  moveTo(t, e, s = !1) {
    if (this.moved) return;
    const i = this.v,
      a = i.hero;
    if (!s && i.attackWindup()) {
      this.moved = !0;
      return;
    }
    if (((this.moved = !0), Math.hypot(t - a.pos.x, e - a.pos.y) < 0.4)) {
      this.halt();
      return;
    }
    const r = i.time,
      l = i.orderState(),
      c = Math.hypot(t - this.goalX, e - this.goalY) < HG;
    if (l === 2 && c) {
      if (r - this.checkAt >= $G) {
        const f = Math.hypot(a.pos.x - this.checkX, a.pos.y - this.checkY) > GG;
        if (((this.checkAt = r), (this.checkX = a.pos.x), (this.checkY = a.pos.y), f || i.busy()))
          this.stuckCount = 0;
        else if ((this.stuckCount++, this.stuckCount >= 2)) {
          const d = i.rng.range(0, Math.PI * 2);
          (i.command({
            type: "moveTo",
            pos: i.nearestWalkable({ x: a.pos.x + Math.cos(d) * 3, y: a.pos.y + Math.sin(d) * 3 }),
          }),
            (this.goalX = 1e9),
            (this.stuckCount = 0));
        } else i.command({ type: "moveTo", pos: i.nearestWalkable({ x: t, y: e }) });
      }
      return;
    }
    ((this.goalX = t),
      (this.goalY = e),
      (this.checkAt = r),
      (this.checkX = a.pos.x),
      (this.checkY = a.pos.y),
      i.command({ type: "moveTo", pos: { x: t, y: e } }));
  }
  moveDir(t, e, s = !1) {
    if (this.moved) return;
    const i = this.v;
    if (!s && i.attackWindup()) {
      this.moved = !0;
      return;
    }
    ((this.moved = !0), (this.goalX = 1e9), i.command({ type: "move", dir: { x: t, y: e } }));
  }
  attack(t) {
    if (this.moved) return;
    this.moved = !0;
    const e = this.v;
    (e.orderState() === 3 && e.orderTargetId() === t) ||
      ((this.goalX = 1e9), e.command({ type: "attack", targetId: t }));
  }
  halt() {
    if (this.moved) return;
    this.moved = !0;
    const t = this.v;
    (t.orderState() !== 0 && !t.attackWindup() && t.command({ type: "stop" }), (this.goalX = 1e9));
  }
  castAt(t, e) {
    ((this.lastCastAt = this.v.time), this.v.command({ type: "cast", slot: t, pos: { x: e.x, y: e.y } }));
  }
  castDir(t, e, s) {
    ((this.lastCastAt = this.v.time), this.v.command({ type: "cast", slot: t, dir: { x: e, y: s } }));
  }
  castTarget(t, e) {
    ((this.lastCastAt = this.v.time), this.v.command({ type: "cast", slot: t, targetId: e }));
  }
  castSelf(t) {
    ((this.lastCastAt = this.v.time), this.v.command({ type: "cast", slot: t }));
  }
  forget() {
    this.goalX = 1e9;
  }
}

const zk = {
  novice: {
    think: 0.4,
    reaction: 0.9,
    aimError: 0.3,
    aimLead: 0,
    dodge: 0.05,
    lastHitError: 0.22,
    lastHitSkip: 0.3,
    aggression: 0.72,
    harass: 0.1,
    dive: !1,
    comboGap: 0.9,
    orbwalk: !1,
    flashKill: 0,
    escapeSense: 0.75,
    focus: 0,
    awareness: 0,
    teamwork: 0.25,
    idleRate: 0.07,
    idleMin: 1,
    idleMax: 2.5,
    gankCooldown: 100,
  },
  easy: {
    think: 0.3,
    reaction: 0.6,
    aimError: 0.2,
    aimLead: 0,
    dodge: 0.15,
    lastHitError: 0.22,
    lastHitSkip: 0.3,
    aggression: 0.8,
    harass: 0.2,
    dive: !1,
    comboGap: 0.6,
    orbwalk: !1,
    flashKill: 0,
    escapeSense: 0.75,
    focus: 0,
    awareness: 0,
    teamwork: 0.4,
    idleRate: 0.035,
    idleMin: 0.7,
    idleMax: 1.8,
    gankCooldown: 70,
  },
  normal: {
    think: 0.16,
    reaction: 0.28,
    aimError: 0.09,
    aimLead: 0.8,
    dodge: 0.6,
    lastHitError: 0.1,
    lastHitSkip: 0.1,
    aggression: 1,
    harass: 0.55,
    dive: !0,
    comboGap: 0.22,
    orbwalk: !0,
    flashKill: 0.45,
    escapeSense: 1,
    focus: 0.6,
    awareness: 0.4,
    teamwork: 0.7,
    idleRate: 0,
    idleMin: 0,
    idleMax: 0,
    gankCooldown: 34,
  },
  hard: {
    think: 0.1,
    reaction: 0.12,
    aimError: 0.03,
    aimLead: 1,
    dodge: 0.85,
    lastHitError: 0.04,
    lastHitSkip: 0,
    aggression: 1.06,
    harass: 0.75,
    dive: !0,
    comboGap: 0.08,
    orbwalk: !0,
    flashKill: 0.9,
    escapeSense: 1.1,
    focus: 1,
    awareness: 0.7,
    teamwork: 1,
    idleRate: 0,
    idleMin: 0,
    idleMax: 0,
    gankCooldown: 30,
  },
};

function WG(n, t) {
  return n === "easy" ? (t === 1 ? "novice" : "easy") : t === 1 ? n : "normal";
}

const jG = {
    panyue: { fleeHp: 0.22, recallHp: 0.33, engage: 0.9, initiator: !0, diveBackline: 0.2, support: !0 },
    chijin: { fleeHp: 0.23, recallHp: 0.34, engage: 0.82, initiator: !0, diveBackline: 0.5, support: !1 },
    niumo: { fleeHp: 0.14, recallHp: 0.25, engage: 0.68, initiator: !0, diveBackline: 0.3, support: !1 },
    xingli: { fleeHp: 0.3, recallHp: 0.38, engage: 1.05, initiator: !1, diveBackline: 0, support: !1 },
    fengling: { fleeHp: 0.3, recallHp: 0.38, engage: 1.05, initiator: !1, diveBackline: 0, support: !1 },
    yeque: { fleeHp: 0.28, recallHp: 0.38, engage: 0.94, initiator: !1, diveBackline: 1.2, support: !1 },
    mushroom: { fleeHp: 0.2, recallHp: 0.3, engage: 0.85, initiator: !0, diveBackline: 0.1, support: !0 },
    xuesong: { fleeHp: 0.24, recallHp: 0.34, engage: 0.84, initiator: !0, diveBackline: 0.85, support: !0 },
    stone: { fleeHp: 0.2, recallHp: 0.32, engage: 0.78, initiator: !0, diveBackline: 0.55, support: !1 },
    scallion: { fleeHp: 0.28, recallHp: 0.36, engage: 1.0, initiator: !1, diveBackline: 0.15, support: !1 },
    paperboy: { fleeHp: 0.1, recallHp: 0.24, engage: 0.72, initiator: !1, diveBackline: 0.15, support: !0 },
    maggot: { fleeHp: 0.28, recallHp: 0.36, engage: 1.0, initiator: !1, diveBackline: 0.1, support: !1 },
    horseman: { fleeHp: 0.2, recallHp: 0.3, engage: 0.84, initiator: !0, diveBackline: 0.55, support: !1 },
    cow: { fleeHp: 0.18, recallHp: 0.3, engage: 0.74, initiator: !0, diveBackline: 0.55, support: !1 },
    monkey: { fleeHp: 0.27, recallHp: 0.36, engage: 0.98, initiator: !1, diveBackline: 0.05, support: !1 },
    slime: { fleeHp: 0.18, recallHp: 0.3, engage: 0.78, initiator: !0, diveBackline: 0.45, support: !1 },
  },
  se = {
    senseRadius: 15,
    allyNear: 10,
    allyFar: 18,
    foeNear: 11,
    foeFar: 18,
    fightHorizon: 5,
    advAllIn: 1.18,
    advPoke: 0.85,
    advFlee: 0.62,
    respectLethal: 0.8,
    advOutgunned: 0.7,
    advPress: 1.08,
    advFightBack: 0.95,
    tradeFatigue: 0.05,
    advPressed: 0.85,
    baseGhostRange: 42,
    baseGhost: 0.75,
    followUp: 0.85,
    waitForEngage: 1.12,
    killSlack: 2.2,
    shakenTime: 4,
    shakenFactor: 1.25,
    fleeHold: 1.4,
    fightHold: 1,
    baseHpReady: 0.92,
    baseManaReady: 0.8,
    healHp: 0.5,
    towerMargin: 1.2,
    minionAggro: 8,
    laneEnd: 270,
    squadTime: 50,
    squadRest: 35,
    lateStart: 570,
    groupMin: 3,
    drakeHeroes: 2,
    drakeLevel: 5,
    colossusHeroes: 3,
    colossusLevel: 8,
    gankSameTarget: 80,
    gankSameLane: 45,
    defendHold: 6,
    regroupBack: 11,
    threatHold: 18,
    massMemory: 25,
    teamTick: 0.8,
    waveclearMana: 0.55,
    groupHarass: 0.3,
    pokeMana: 0.35,
    jungleMana: 0.25,
  },
  J1 = ["s1", "s2", "ult"];

function Nk(n) {
  return n >= 5 ? 0.55 : n > 1 ? 0.75 : 0.85;
}

function Kp(n) {
  return (n.hp + n.shield) * (1 + ((n.stats.armor + n.stats.mr) * 0.5) / 600);
}

function nmStacks(n) {
  for (let t = 0; t < n.buffs.length; t++) if (n.buffs[t].id === "niumo_flame") return n.buffs[t].stacks || 0;
  return 0;
}

function T1(n) {
  const t = n.stats;
  let e = t.ad * t.attackSpeed * (1 + t.critChance * (t.critDamage - 1));
  if (n.heroId === "niumo") {
    const p = Se.niumo.passive.values;
    e *= p.dmgMin + Math.min(1, Math.max(0, (t.maxHp - p.hpBase) / p.hpSpan)) * (p.dmgMax - p.dmgMin);
    const s2Lv = n.skills.s2.level;
    if (s2Lv > 0) e += Nh(Se.niumo.skills.s2, "flameDps", s2Lv) * 2.2;
    if (e5(n, "niumo_ult")) e *= 1.25;
  }
  return e;
}

function e6(n, t) {
  const e = se.fightHorizon;
  let s = T1(n) * e * (n.stats.attackRange < 4 ? 0.8 : 1);
  for (let i = 0; i < J1.length; i++) {
    const a = J1[i];
    if (n.skills[a].level <= 0) continue;
    const o = Oa[n.heroId][a].damage;
    if (!o) continue;
    const r = Pk(n, a) * Nk(o.hits);
    s += t(a) ? r : r * 0.2;
  }
  return s;
}

function qG(n) {
  return n <= se.allyNear ? 1 : n >= se.allyFar ? 0 : 1 - (n - se.allyNear) / (se.allyFar - se.allyNear);
}

function XG(n) {
  return n <= se.foeNear ? 1 : n >= se.foeFar ? 0 : 1 - (n - se.foeNear) / (se.foeFar - se.foeNear);
}

function YG(n, t, e) {
  let s = 2 * S1(n, t);
  for (let i = 0; i < J1.length; i++) {
    const a = J1[i];
    if (n.skills[a].level <= 0 || !e(a)) continue;
    const o = Oa[n.heroId][a].damage;
    o && (s += Nm(n, a, t) * Nk(o.hits));
  }
  return s;
}

function n6(n) {
  return n.stats.ad * n.stats.attackSpeed * 1.4 * se.fightHorizon;
}

function KG(n, t, e, s) {
  const i = n * t,
    a = e * s;
  return a <= 1 ? 9 : Math.min(9, Math.sqrt(i / a));
}

function iy(n, t, e, s, i, a) {
  const o = i - e,
    r = a - s,
    l = o * o + r * r;
  if (l < 1e-12) return 0;
  const c = ((n - e) * o + (t - s) * r) / l;
  return c < 0 ? 0 : c > 1 ? 1 : c;
}

function Fk(n, t, e, s, i, a) {
  const o = iy(n, t, e, s, i, a),
    r = e + (i - e) * o - n,
    l = s + (a - s) * o - t;
  return r * r + l * l;
}

class rf {
  pts;
  cum;
  total;
  tx = 1;
  ty = 0;
  lateral = 0;
  constructor(t) {
    ((this.pts = t), (this.cum = [0]));
    for (let e = 1; e < t.length; e++)
      this.cum.push(this.cum[e - 1] + Math.hypot(t[e].x - t[e - 1].x, t[e].y - t[e - 1].y));
    this.total = this.cum[this.cum.length - 1];
  }
  project(t, e) {
    const s = this.pts;
    let i = 1 / 0,
      a = 0;
    for (let o = 1; o < s.length; o++) {
      const r = s[o - 1],
        l = s[o],
        c = iy(t, e, r.x, r.y, l.x, l.y),
        f = r.x + (l.x - r.x) * c - t,
        d = r.y + (l.y - r.y) * c - e,
        h = f * f + d * d;
      h < i && ((i = h), (a = this.cum[o - 1] + (this.cum[o] - this.cum[o - 1]) * c));
    }
    return ((this.lateral = Math.sqrt(i)), a);
  }
  pointAt(t, e) {
    const s = this.pts,
      i = this.cum,
      a = t < 0 ? 0 : t > this.total ? this.total : t;
    let o = 1;
    for (; o < s.length - 1 && i[o] < a;) o++;
    const r = s[o - 1],
      l = s[o],
      c = i[o] - i[o - 1],
      f = c > 1e-9 ? (a - i[o - 1]) / c : 0;
    return (
      (e.x = r.x + (l.x - r.x) * f),
      (e.y = r.y + (l.y - r.y) * f),
      c > 1e-9 && ((this.tx = (l.x - r.x) / c), (this.ty = (l.y - r.y) / c)),
      e
    );
  }
}

const gr = ["top", "mid", "bot"];

function ye(n, t) {
  return Math.hypot(n.x - t.x, n.y - t.y);
}

function ZG(n, t, e) {
  return n < t ? t : n > e ? e : n;
}

function QG(n, t, e, s = 0) {
  const i = n.x - e.pos.x,
    a = n.y - e.pos.y,
    o = Math.hypot(i, a),
    r = t + s;
  return o > e.radius + r
    ? !1
    : o <= r
      ? !0
      : Math.atan2(Math.abs(a * e.dir.x - i * e.dir.y), i * e.dir.x + a * e.dir.y) <=
        e.angle * 0.5 + Math.asin(r / o);
}

function JG(n, t, e, s, i, a, o = 0.4) {
  if (!QG(n, t, e, o)) return !1;
  const r = n.x - e.pos.x,
    l = n.y - e.pos.y,
    c = Math.hypot(r, l),
    f = t + o,
    d = l * e.dir.x - r * e.dir.y,
    h = Math.atan2(Math.abs(d), r * e.dir.x + l * e.dir.y),
    u = e.angle * 0.5 + (c > f ? Math.asin(f / c) : Math.PI),
    m = c * Math.max(0, u - h);
  if (e.radius + f - c < m && c > 0.3) return ((a.x = r / c), (a.y = l / c), !0);
  let p = d >= 0 ? 1 : -1;
  return (
    Math.abs(d) < 0.25 && (p = (s.y - n.y) * e.dir.x - (s.x - n.x) * e.dir.y >= 0 ? 1 : -1),
    (a.x = -e.dir.y * p),
    (a.y = e.dir.x * p),
    (Q2.x = n.x + a.x * 1.6),
    (Q2.y = n.y + a.y * 1.6),
    i(Q2) || ((a.x = -a.x), (a.y = -a.y)),
    !0
  );
}

const Q2 = { x: 0, y: 0 };

class tV {
  paths;
  lateral = 0;
  constructor(t) {
    this.paths = { top: new rf(t.lanes.top), mid: new rf(t.lanes.mid), bot: new rf(t.lanes.bot) };
  }
  total(t) {
    return this.paths[t].total;
  }
  prog(t, e, s, i) {
    const a = this.paths[e],
      o = a.project(s, i);
    return ((this.lateral = a.lateral), t === 0 ? o : a.total - o);
  }
  point(t, e, s, i, a = 0) {
    const o = this.paths[e];
    if ((o.pointAt(t === 0 ? s : o.total - s, i), a !== 0)) {
      const r = t === 0 ? 1 : -1;
      ((i.x += -o.ty * r * a), (i.y += o.tx * r * a));
    }
    return i;
  }
  nearestLane(t, e) {
    let s = "mid",
      i = 1 / 0;
    for (const a of gr) {
      const o = this.paths[a];
      (o.project(t, e), o.lateral < i && ((i = o.lateral), (s = a)));
    }
    return ((this.lateral = i), s);
  }
}

const s6 = new WeakMap();

function eV(n) {
  let t = s6.get(n);
  return (t || ((t = new tV(n)), s6.set(n, t)), t);
}

const Bt = { x: 0, y: 0 },
  lf = { x: 0, y: 0 };

function P3(n, t) {
  for (let e = 0; e < n.buffs.length; e++) if (n.buffs[e].id === t) return !0;
  return !1;
}

function uh(n) {
  let t = 0;
  for (let e = 0; e < n.buffs.length; e++) {
    const s = n.buffs[e];
    (s.id === "stun" || s.id === "airborne" || s.id === "root") && (t = Math.max(t, s.timeLeft));
  }
  return t;
}

function D3(n) {
  return P3(n, "slow");
}

function wn(n, t, e = !1) {
  return n.v.skillReady(t)
    ? e
      ? !0
      : n.time - n.act.lastCastAt < n.prof.comboGap
        ? !1
        : !n.v.attackWindup()
    : !1;
}

function x0(n, t) {
  return (n.me.mana - n.me.skills[t].cost) / Math.max(1, n.me.stats.maxMana);
}

function _s(n, t, e, s, i) {
  const a = n.me;
  let o = (t.pos.x - t.prevPos.x) / xo,
    r = (t.pos.y - t.prevPos.y) / xo;
  (Math.hypot(o, r) > 12 || uh(t) > 0.05) && ((o = 0), (r = 0));
  let c = e;
  return (
    s > 0 && (c += Math.hypot(t.pos.x - a.pos.x, t.pos.y - a.pos.y) / s),
    (c = Math.min(1, c) * n.prof.aimLead),
    (i.x = t.pos.x + o * c),
    (i.y = t.pos.y + r * c),
    i
  );
}

function $s(n, t, e) {
  const s = n.me,
    i = Math.atan2(e.y - s.pos.y, e.x - s.pos.x) + n.v.rng.range(-1, 1) * n.prof.aimError;
  n.act.castDir(t, Math.cos(i), Math.sin(i));
}

function Bc(n, t, e) {
  const s = n.me,
    a = Math.hypot(e.x - s.pos.x, e.y - s.pos.y) * n.prof.aimError,
    o = n.v.rng.range(0, Math.PI * 2),
    r = n.v.rng.next() * a;
  ((lf.x = e.x + Math.cos(o) * r), (lf.y = e.y + Math.sin(o) * r), n.act.castAt(t, lf));
}

function i6(n, t, e, s) {
  let i = 0;
  for (const a of n.foes)
    (_s(n, a, s, 0, Bt), Math.hypot(Bt.x - t.x, Bt.y - t.y) <= e + a.radius * 0.5 && i++);
  return i;
}

function Zp(n, t, e, s, i, a) {
  const o = n.me;
  _s(n, t, i, 0, a);
  let r = i6(n, a, e, i);
  const l = a.x,
    c = a.y;
  for (const f of n.foes) {
    if (f === t) continue;
    _s(n, f, i, 0, Bt);
    const d = (l + Bt.x) * 0.5,
      h = (c + Bt.y) * 0.5;
    if (Math.hypot(d - l, h - c) > e * 0.8 || Math.hypot(d - o.pos.x, h - o.pos.y) > s) continue;
    ((lf.x = d), (lf.y = h));
    const u = i6(n, lf, e, i);
    u > r && ((r = u), (a.x = d), (a.y = h));
  }
  return r;
}

function ay(n, t, e) {
  const s = n.me,
    i = t.x - s.pos.x,
    a = t.y - s.pos.y,
    o = Math.hypot(i, a);
  if (o < 0.5) return !1;
  const r = i / o,
    l = a / o;
  for (const c of n.foeMinions) {
    const f = c.pos.x - s.pos.x,
      d = c.pos.y - s.pos.y,
      h = f * r + d * l;
    if (!(h < 0.3 || h > o - 0.3) && Math.abs(f * l - d * r) < e + c.radius) return !0;
  }
  return !1;
}

function Dd(n, t, e) {
  if (n.length === 0) return 0;
  let s = 0,
    i = 0;
  for (const o of n) ((s += o.pos.x), (i += o.pos.y));
  ((e.x = s / n.length), (e.y = i / n.length));
  let a = 0;
  for (const o of n) Math.hypot(o.pos.x - e.x, o.pos.y - e.y) <= t + o.radius && a++;
  return a;
}

function J2(n, t, e, s, i, a) {
  const o = n.me,
    r = Math.hypot(e, s) || 1,
    l = e / r,
    c = s / r;
  let f = 0;
  for (const d of t) {
    const h = d.pos.x - o.pos.x,
      u = d.pos.y - o.pos.y,
      m = h * l + u * c;
    m < 0 || m > i + d.radius || (Math.abs(h * c - u * l) <= a + d.radius && f++);
  }
  return f;
}

function Cl(n, t, e, s) {
  const i = n.me;
  return (
    (Bt.x = i.pos.x + t * s),
    (Bt.y = i.pos.y + e * s),
    n.v.lineClear(i.pos, Bt) ? n.diving || n.v.enemyStructureCovering(Bt, se.towerMargin) === null : !1
  );
}

function Ii(n, t, e) {
  return Nh(Se[n.heroId].skills[t], e, Math.max(1, n.me.skills[t].level));
}

function nV(n, t) {
  const e = n.me,
    s = ye(e.pos, t.pos),
    i = t.hp / t.stats.maxHp;
  switch (n.heroId) {
    case "panyue": {
      if (wn(n, "ult") && s <= 13 && s > 3) {
        const a = Oa.panyue.ult,
          o = Zp(n, t, a.aoeRadius, 9.5, a.delay, Bt);
        if (
          (o >= 2 || (o >= 1 && (i < 0.6 || n.fightAdv >= 1.5 || n.friendsNear >= 1))) &&
          (n.diving || n.v.enemyStructureCovering(Bt, 0) === null)
        )
          return (Bc(n, "ult", Bt), !0);
      }
      return wn(n, "s1") && s <= 9.6 && uh(t) < 0.35
        ? (_s(n, t, 0, Ii(n, "s1", "dashSpeed"), Bt), $s(n, "s1", Bt), !0)
        : wn(n, "s2") && (s <= 4.3 + t.radius || (n.hpR < 0.55 && n.heroesOnMe > 0))
          ? (n.act.castSelf("s2"), !0)
          : !1;
    }
    case "chijin": {
      const a = P3(e, "chijin_ember"),
        o = s <= e.stats.attackRange + t.radius + 0.4,
        r = a && o && n.v.attackCooldown() < 0.35 && !P3(e, "chijin_spin");
      if (wn(n, "s2") && s > 3.2 && s <= 8.2) {
        _s(n, t, 0, Ii(n, "s2", "dashSpeed"), Bt);
        const l = Bt.x - e.pos.x,
          c = Bt.y - e.pos.y,
          f = Math.hypot(l, c) || 1;
        if (Cl(n, l / f, c / f, Math.min(5.5, f))) return ($s(n, "s2", Bt), !0);
      }
      if (r) return !1;
      if (wn(n, "ult") && s <= 4.4) {
        let l = 0;
        for (const c of n.foes) ye(e.pos, c.pos) <= 4.2 + c.radius && l++;
        if (l >= 2 || i < 0.7 || n.fightAdv >= 1.4 || n.hpR < 0.5) return (n.act.castSelf("ult"), !0);
      }
      if (wn(n, "s1") && s <= 5.4) return (_s(n, t, 0.1, 0, Bt), $s(n, "s1", Bt), !0);
      if (wn(n, "s2") && o && !a && i > 0.25 && n.me.skills.s1.cd > 1.5) {
        const l = t.pos.x - e.pos.x,
          c = t.pos.y - e.pos.y,
          f = Math.hypot(l, c) || 1;
        if (Cl(n, l / f, c / f, 5.5)) return (n.act.castDir("s2", l / f, c / f), !0);
      }
      return !1;
    }
    case "xingli": {
      const a = uh(t);
      if (wn(n, "s2") && s <= 12) {
        const o = Oa.xingli.s2;
        if (s < 4.5 && t.stats.attackRange < 4)
          return (
            (Bt.x = (e.pos.x + t.pos.x) * 0.5),
            (Bt.y = (e.pos.y + t.pos.y) * 0.5),
            Bc(n, "s2", Bt),
            !0
          );
        if (
          (Zp(n, t, o.aoeRadius, 9, o.delay, Bt),
          Math.hypot(Bt.x - e.pos.x, Bt.y - e.pos.y) <= 9 + o.aoeRadius * 0.5)
        )
          return (Bc(n, "s2", Bt), !0);
      }
      if (wn(n, "ult") && s <= 15) {
        const o = Oa.xingli.ult,
          r = Zp(n, t, o.aoeRadius, 11, o.delay + 0.3, Bt);
        if (r >= 2 || (r >= 1 && (a > 0.2 || D3(t) || i < 0.6 || n.fightAdv >= 1.4)))
          return (Bc(n, "ult", Bt), !0);
      }
      return wn(n, "s1") && s <= 12.2 ? (_s(n, t, 0.08, Ii(n, "s1", "speed"), Bt), $s(n, "s1", Bt), !0) : !1;
    }
    case "fengling": {
      if (
        wn(n, "s2", !0) &&
        n.nearFoe &&
        n.nearFoeD < 3.4 &&
        n.nearFoe.stats.attackRange < 4 &&
        Kd(n, "s2", e.pos.x - n.nearFoe.pos.x, e.pos.y - n.nearFoe.pos.y, 5)
      )
        return !0;
      if (wn(n, "s1") && s <= 13.2) return (_s(n, t, 0.12, Ii(n, "s1", "speed"), Bt), $s(n, "s1", Bt), !0);
      if (wn(n, "ult") && s <= 15) {
        const o = Oa.fengling.ult,
          r = Zp(n, t, o.aoeRadius, 11.5, o.delay + 0.3, Bt);
        if (r >= 2 || (r >= 1 && (D3(t) || uh(t) > 0.2 || i < 0.55 || n.fightAdv >= 1.4)))
          return (Bc(n, "ult", Bt), !0);
      }
      const a = e.stats.attackRange + t.radius;
      if (wn(n, "s2") && s > a + 0.5 && s < a + 5 && i < 0.3 && n.fightAdv >= 1.2) {
        const o = t.pos.x - e.pos.x,
          r = t.pos.y - e.pos.y,
          l = Math.hypot(o, r) || 1;
        if (Cl(n, o / l, r / l, 5)) return (n.act.castDir("s2", o / l, r / l), !0);
      }
      return !1;
    }
    case "mushroom": {
      if (wn(n, "ult") && s <= 15.5 && s > 4.5) {
        const a = Oa.mushroom.ult,
          o = Zp(n, t, a.aoeRadius, 16, a.delay, Bt);
        if (
          (o >= 2 || (o >= 1 && (i < 0.65 || n.fightAdv >= 1.5 || n.friendsNear >= 1))) &&
          (n.diving || n.v.enemyStructureCovering(Bt, 0) === null)
        )
          return (Bc(n, "ult", Bt), !0);
      }
      if (wn(n, "s1") && s <= 12 && s > 2) {
        _s(n, t, 0, Ii(n, "s1", "dashSpeed"), Bt);
        const a = Bt.x - e.pos.x,
          o = Bt.y - e.pos.y,
          r = Math.hypot(a, o) || 1;
        if (Cl(n, a / r, o / r, Math.min(7, r))) return ($s(n, "s1", Bt), !0);
      }
      if (wn(n, "s2") && s <= 5.8) {
        const a = t.pos.x - e.pos.x,
          o = t.pos.y - e.pos.y,
          r = Math.hypot(a, o) || 1;
        return (n.act.castDir("s2", a / r, o / r), !0);
      }
      return !1;
    }
    case "yeque": {
      if (wn(n, "ult") && s <= 8.4 && t.alive) {
        const a = Nm(e, "ult", t),
          o = t.hp + t.shield;
        if (a >= o * 0.9 || (i < 0.45 && a >= o * 0.6 && e.skills.s1.cd > 0.5))
          return (n.act.castTarget("ult", t.id), !0);
      }
      if (wn(n, "s2") && s <= 8.4 && (_s(n, t, 0.06, Ii(n, "s2", "speed"), Bt), s < 4.2 || !ay(n, Bt, 0.5)))
        return ($s(n, "s2", Bt), !0);
      if (wn(n, "s1") && s <= 7.6 && s > 1.2) {
        _s(n, t, 0, Ii(n, "s1", "dashSpeed"), Bt);
        const a = Bt.x - e.pos.x,
          o = Bt.y - e.pos.y,
          r = Math.hypot(a, o) || 1;
        if (Cl(n, a / r, o / r, Math.min(6.5, r + 1))) return ($s(n, "s1", Bt), !0);
      }
      return !1;
    }
    case "xuesong": {
      const hasSand = e5(e, "xuesong_sand"),
        onPole = e5(e, "xuesong_pole"),
        hasScoop = e5(e, "xuesong_scoop");
      if (hasScoop) return xuesongHandleScoop(n);
      if (onPole && wn(n, "s2")) {
        const ally = n.friends.find((f) => ye(f.pos, e.pos) <= 7.5 && f.hp / f.stats.maxHp < 0.75);
        return (Bc(n, "s2", ally ? ally.pos : e.pos), !0);
      }
      if (!hasScoop && wn(n, "ult")) {
        const uTgt = xuesongPickUltTarget(n, !0);
        if (uTgt) {
          n.brain.callFocus(uTgt.id, n.time);
          return (n.act.castTarget("ult", uTgt.id), !0);
        }
      }
      if (hasSand && wn(n, "s1") && s <= 8.5) return (Bc(n, "s1", t.pos), !0);
      // 保留 2 技能给大招「抓人+撑篙跳回」连招，只有在低血保命或给残血队友套盾时才单独开
      if (!onPole && wn(n, "s2") && (!wn(n, "ult") || n.hpR < 0.42)) {
        const lowAlly = n.friends.find((f) => ye(f.pos, e.pos) <= 7.2 && f.hp / f.stats.maxHp < 0.5);
        if (n.hpR < 0.42 || lowAlly) return (n.act.castSelf("s2"), !0);
      }
      // 进攻/打架时不要乱挖洞堵自己队友的路
      return !1;
    }
    case "stone": {
      const training = e5(e, "stone_train"),
        hasCorpse = e5(e, "stone_corpse");
      if (hasCorpse && wn(n, "s2") && s <= 7.5) return (Bc(n, "s2", t.pos), !0);
      if (wn(n, "ult") && s <= 11.5) {
        const a = Oa.stone.ult,
          o = Zp(n, t, a.aoeRadius, 11.5, a.delay, Bt);
        if (
          (o >= 2 || (o >= 1 && s > 3.2 && (i < 0.68 || n.fightAdv >= 1.15 || n.friendsNear >= 1))) &&
          (n.diving || n.v.enemyStructureCovering(Bt, 0) === null)
        )
          return (Bc(n, "ult", Bt), !0);
      }
      if (!hasCorpse && wn(n, "s2") && s <= 5.5 && t.alive) return (n.act.castTarget("s2", t.id), !0);
      if (training && wn(n, "s1") && (n.hpR < 0.34 || s > 5.8)) return (n.act.castSelf("s1"), !0);
      if (!training && wn(n, "s1") && s <= 2.6 && n.hpR > 0.62 && n.foesNear <= 1) return (n.act.castSelf("s1"), !0);
      return !1;
    }
    case "scallion": {
      if (e5(e, "scallion_beam")) {
        // 大招喷射期间若已经打不到人或快被贴脸秒了，立刻按二段中断大招脱身
        if (wn(n, "ult", !0) && (s > 13.8 || (n.hpR < 0.28 && n.nearFoeD < 4.5) || (n.adv < 0.62 && n.nearFoeD < 4.0)))
          return (n.act.castSelf("ult"), !0);
        n.act.moveTo(t.pos.x, t.pos.y, !0);
        return !0;
      }
      if (wn(n, "s2") && s <= e.stats.attackRange + 2.2) return (n.act.castSelf("s2"), !0);
      if (wn(n, "s1") && s <= 8.5) return (_s(n, t, 0.12, 0, Bt), $s(n, "s1", Bt), !0);
      if (wn(n, "ult") && s <= 14 && (i < 0.72 || n.foesNear >= 2 || n.fightAdv >= 1.15)) {
        const ang = Math.atan2(e.pos.y - t.pos.y, e.pos.x - t.pos.x),
          idealD = Math.min(7.5, Math.max(3.2, s > 8 ? 5 : 4.2));
        ((Bt.x = t.pos.x + Math.cos(ang) * Math.min(8.5, Math.max(5.5, idealD))),
          (Bt.y = t.pos.y + Math.sin(ang) * Math.min(8.5, Math.max(5.5, idealD))));
        const land = n.v.nearestWalkable(Bt);
        if (ye(e.pos, land) <= 7.5 && (n.diving || n.v.enemyStructureCovering(land, 0) === null))
          return (n.act.castAt("ult", land), !0);
      }
      return !1;
    }
    case "paperboy": {
      let bestUltAlly = null,
        bestUltScore = 0,
        bestCraneAlly = null,
        bestCraneScore = 0;
      for (const a of n.friends) {
        const d = ye(e.pos, a.pos);
        if (d <= 11.2 && a.hp / a.stats.maxHp < 0.92) {
          const sc = (1.2 - a.hp / a.stats.maxHp) * (a.inCombat ? 1.5 : 1);
          if (sc > bestUltScore) {
            bestUltScore = sc;
            bestUltAlly = a;
          }
        }
        if (d <= 10.8) {
          const cc = D3(a) || uh(a) > 0.2,
            low = a.hp / a.stats.maxHp < 0.65;
          if (cc || low) {
            const sc = (cc ? 3 : 0) + (1 - a.hp / a.stats.maxHp);
            if (sc > bestCraneScore) {
              bestCraneScore = sc;
              bestCraneAlly = a;
            }
          }
        }
      }
      if (wn(n, "s1") && (s <= 8.3 || (n.nearFoe !== null && n.nearFoeD <= 8.3)))
        return (n.act.castSelf("s1"), !0);
      if (wn(n, "ult")) {
        if (bestUltAlly && (n.foesNear >= 1 || bestUltAlly.inCombat))
          return (n.act.castTarget("ult", bestUltAlly.id), !0);
        if (s <= 8.6 && (n.heroesOnMe > 0 || n.hpR < 0.78 || t.stats.attackRange < 4))
          return (n.act.castTarget("ult", e.id), !0);
      }
      if (wn(n, "s2") && bestCraneAlly) return (n.act.castTarget("s2", bestCraneAlly.id), !0);
      if (
        wn(n, "s2") &&
        (D3(e) ||
          uh(e) > 0.15 ||
          (t.stats.attackRange < 4 && s < 5.0) ||
          (s > 6.6 && s <= 11 && n.fightAdv >= 0.95))
      )
        return (n.act.castTarget("s2", e.id), !0);
      return !1;
    }
    case "maggot": {
      if (wn(n, "ult") && s <= 13.2) return (_s(n, t, Oa.maggot.ult.delay, 0, Bt), Bc(n, "ult", Bt), !0);
      if (wn(n, "s1") && s <= 8.2 && !e.buffs.some((b) => b.id === "maggot_spray"))
        return (_s(n, t, 0.15, 0, Bt), $s(n, "s1", Bt), !0);
      if (wn(n, "s2") && s <= 9.5) return (n.act.castSelf("s2"), !0);
      return !1;
    }
    case "horseman": {
      const charging = e5(e, "horseman_kick_charge"),
        hasPassive = e5(e, "horseman_charge");
      if (charging) {
        const ch = e.buffs.find((b) => b.id === "horseman_kick_charge"),
          held = ch ? ch.duration - ch.timeLeft : 0.6,
          curRange = 3.0 + Math.min(1, held / 0.9) * 3.8;
        if (wn(n, "s1") && (held >= 0.92 || (s <= curRange - 0.3 && (held >= 0.55 || i < 0.3)))) return ($s(n, "s1", t.pos), !0);
        return !0;
      }
      if (wn(n, "ult") && (hasPassive || s > 3.8 || n.foesNear >= 2) && s <= 11.5) return (n.act.castSelf("ult"), !0);
      if (wn(n, "s2") && (s <= 5.2 || D3(e) || uh(e) > 0.15) && s <= 6.2) return (n.act.castSelf("s2"), !0);
      if (wn(n, "s1") && !hasPassive && s <= 6.2) return ($s(n, "s1", t.pos), !0);
      return !1;
    }
    case "cow": {
      const kickR = Math.max(4.0, Math.min(13.0, 5.5 + ((e.stats.moveSpeed || 5.5) - 4.5) * 0.95)),
        stompReady = e5(e, "cow_stomp_ready"),
        exhausted = e5(e, "cow_exhaust");
      if (e5(e, "cow_squat") && wn(n, "s1")) return (n.act.castSelf("s1"), !0);
      if (stompReady && wn(n, "ult") && s <= 4.8) return (n.act.castSelf("ult"), !0);
      // 力竭了也不怂：团战/接战直接开大解力竭+拉满移速，立刻接飞踢冲进人群连环跺脚
      if (!stompReady && wn(n, "ult") && exhausted && s <= 12.0) return (n.act.castSelf("ult"), !0);
      // 满血也能主动飞踢进来直接开大开团
      if (wn(n, "s2") && s <= kickR + t.radius) return (n.act.castTarget("s2", t.id), !0);
      if (!stompReady && wn(n, "ult") && (s <= 6.2 || (n.foesNear >= 2 && s <= 9.5) || (n.friendsNear >= 1 && s <= 8.5)))
        return (n.act.castSelf("ult"), !0);
      if (!e5(e, "cow_squat") && !exhausted && wn(n, "s1") && s <= 2.8 && n.hpR > 0.72 && n.foesNear <= 1 && !wn(n, "ult"))
        return (n.act.castSelf("s1"), !0);
      return !1;
    }
    case "niumo": {
      if (e5(e, "niumo_march")) return !0;
      const st = nmStacks(t),
        ulting = e5(e, "niumo_ult");
      if (!ulting && wn(n, "ult") && s <= 5.8 && (st >= 3 || n.foesNear >= 2 || n.hpR < 0.68 || i < 0.55 || D3(e) || uh(e) > 0.2))
        return (n.act.castSelf("ult"), !0);
      if (wn(n, "s1") && s <= 6.7) return (_s(n, t, 0.3, 0, Bt), $s(n, "s1", Bt), !0);
      if (wn(n, "s2") && s <= 5.6 && s >= 1.1) {
        if (!(ulting && st >= 3 && s <= 3.6) && (st < 4 || n.foesNear >= 2 || D3(e) || uh(e) > 0.15 || s >= 2.6)) {
          _s(n, t, 0.22, 0, Bt);
          const dx = Bt.x - e.pos.x,
            dy = Bt.y - e.pos.y,
            d = Math.hypot(dx, dy) || 1;
          if (Cl(n, dx / d, dy / d, Math.min(4.2, s + 1.0))) return ($s(n, "s2", Bt), !0);
        }
      }
      return !1;
    }
    case "monkey": {
      const ulting = e5(e, "monkey_ult");
      if (!ulting && wn(n, "ult") && s <= e.stats.attackRange * 1.35 + 1.5 && (i < 0.72 || n.foesNear >= 2 || n.fightAdv >= 1.05 || uh(t) > 0.2))
        return (n.act.castSelf("ult"), !0);
      if (wn(n, "s2") && s <= 9.0) {
        _s(n, t, 0.2, 21, Bt);
        const dx = Bt.x - e.pos.x,
          dy = Bt.y - e.pos.y,
          d = Math.hypot(dx, dy) || 1,
          far = Math.min(9.0, d + 1.5);
        ((Bt.x = e.pos.x + (dx / d) * far), (Bt.y = e.pos.y + (dy / d) * far));
        return (Bc(n, "s2", Bt), !0);
      }
      if (wn(n, "s1") && n.time - (n._mkPeelAt ?? -99) >= 0.85) {
        const spot = monkeyPickPeelSpot(n, t);
        if (spot) return ((n._mkPeelAt = n.time), Bc(n, "s1", spot), !0);
      }
      return !1;
    }
    case "slime": {
      // 撞墙 0.5 秒窗口：立刻瞬发满额弹球砸脸
      if (e5(e, "slime_wall_bounce") && wn(n, "s2")) {
        _s(n, t, 0.14, 30, Bt);
        return ($s(n, "s2", Bt), !0);
      }
      // 正在蓄力弹球：距离够了或蓄力满 0.85~1.35 秒就松手弹出
      if (e5(e, "slime_ball_charge")) {
        const elapsed = n.time - (e.h?._slBallStart ?? n.time),
          curRange = 4.5 + 7.0 * Math.min(1, elapsed / 3.0);
        if (wn(n, "s2") && (elapsed >= 1.25 || (elapsed >= 0.45 && curRange >= s + 0.8))) {
          _s(n, t, 0.12, 24, Bt);
          return ($s(n, "s2", Bt), !0);
        }
        return !0;
      }
      // 大招期间覆盖到敌人立刻按 1 反吸拖走
      if (e5(e, "slime_puddle")) {
        if (wn(n, "s1") && s <= 2.95 + t.radius) return (n.act.castSelf("s1"), !0);
        return !1;
      }
      // 血量偏低或人堆里开大摊成 4 倍果冻回血 + 准备反吸
      if (wn(n, "ult") && s <= 3.6 && (n.hpR < 0.48 || n.foesNear >= 2 || (n.friendsNear >= 1 && s <= 2.9))) {
        return (n.act.castSelf("ult"), !0);
      }
      // 1 技能贴身吸附黏住目标（还能防击退）
      if (!e5(e, "slime_cling") && wn(n, "s1") && s <= 5.8 + t.radius) {
        return (n.act.castTarget("s1", t.id), !0);
      }
      // 2 技能蓄力弹球开团击飞
      if (!e5(e, "slime_cling") && wn(n, "s2") && s <= 9.2) {
        _s(n, t, 0.25, 22, Bt);
        return ($s(n, "s2", Bt), !0);
      }
      return !1;
    }
  }
}

function sV(n, t) {
  const e = n.me,
    s = ye(e.pos, t.pos),
    i = (t.hp + t.shield) * 1.08,
    a = (o, r) => wn(n, o) && Nm(e, o, t, r) >= i;
  switch (n.heroId) {
    case "panyue":
      if (s <= 9.4 && a("s1")) {
        _s(n, t, 0, Ii(n, "s1", "dashSpeed"), Bt);
        const o = Math.hypot(Bt.x - e.pos.x, Bt.y - e.pos.y) || 1;
        if (Cl(n, (Bt.x - e.pos.x) / o, (Bt.y - e.pos.y) / o, Math.min(7.5, o))) return ($s(n, "s1", Bt), !0);
      }
      return !1;
    case "chijin":
      if (s <= 5.3 && a("s1")) return (_s(n, t, 0.1, 0, Bt), $s(n, "s1", Bt), !0);
      if (s <= 6.3 && a("s2")) {
        _s(n, t, 0, Ii(n, "s2", "dashSpeed"), Bt);
        const o = Math.hypot(Bt.x - e.pos.x, Bt.y - e.pos.y) || 1;
        if (Cl(n, (Bt.x - e.pos.x) / o, (Bt.y - e.pos.y) / o, 5.5)) return ($s(n, "s2", Bt), !0);
      }
      return !1;
    case "xingli":
      return s <= 12.2 && a("s1") ? (_s(n, t, 0.08, Ii(n, "s1", "speed"), Bt), $s(n, "s1", Bt), !0) : !1;
    case "fengling":
      return s <= 13.6 && a("s1") ? (_s(n, t, 0.12, Ii(n, "s1", "speed"), Bt), $s(n, "s1", Bt), !0) : !1;
    case "mushroom":
      if (s <= 9.6 && a("s1")) {
        _s(n, t, 0, Ii(n, "s1", "dashSpeed"), Bt);
        const o = Math.hypot(Bt.x - e.pos.x, Bt.y - e.pos.y) || 1;
        if (Cl(n, (Bt.x - e.pos.x) / o, (Bt.y - e.pos.y) / o, Math.min(7, o))) return ($s(n, "s1", Bt), !0);
      }
      return !1;
    case "yeque":
      return s <= 8.4 && a("s2", 1) && (_s(n, t, 0.06, Ii(n, "s2", "speed"), Bt), !ay(n, Bt, 0.5))
        ? ($s(n, "s2", Bt), !0)
        : s <= 8.3 &&
            a("ult") &&
            (n.diving || n.v.enemyStructureCovering(t.pos, 0.5) === null) &&
            n.advantageAt(t.pos.x, t.pos.y) >= 0.8
          ? (n.act.castTarget("ult", t.id), !0)
          : !1;
    case "xuesong":
      return e.buffs.some((b) => b.id === "xuesong_sand") && s <= 8.5 && a("s1")
        ? (Bc(n, "s1", t.pos), !0)
        : !e.buffs.some((b) => b.id === "xuesong_scoop") && s <= 6.2 && a("ult")
          ? (n.act.castTarget("ult", t.id), !0)
          : !1;
    case "stone":
      return e.buffs.some((b) => b.id === "stone_corpse") && s <= 7.5 && a("s2")
        ? (Bc(n, "s2", t.pos), !0)
        : s <= 11.5 && a("ult") && (n.diving || n.v.enemyStructureCovering(t.pos, 0) === null)
          ? (Bc(n, "ult", t.pos), !0)
          : !1;
    case "scallion":
      return s <= 8.6 && a("s1") ? (_s(n, t, 0.12, 0, Bt), $s(n, "s1", Bt), !0) : !1;
    case "paperboy":
      return !1;
    case "maggot":
      return s <= 13.2 && a("ult") ? (_s(n, t, Oa.maggot.ult.delay, 0, Bt), Bc(n, "ult", Bt), !0) : !1;
    case "horseman":
      return s <= 4.3 && a("s1") ? ($s(n, "s1", t.pos), !0) : s <= 5.2 && a("s2") ? (n.act.castSelf("s2"), !0) : !1;
    case "cow": {
      const kickR = Math.max(4.0, Math.min(13.0, 5.5 + ((e.stats.moveSpeed || 5.5) - 4.5) * 0.95));
      if (e5(e, "cow_stomp_ready") && wn(n, "ult") && s <= 4.7) return (n.act.castSelf("ult"), !0);
      return s <= kickR + t.radius && a("s2") ? (n.act.castTarget("s2", t.id), !0) : !1;
    }
    case "niumo": {
      if (e5(e, "niumo_march")) return !1;
      if (s <= 6.8 && a("s1")) return (_s(n, t, 0.3, 0, Bt), $s(n, "s1", Bt), !0);
      const st = nmStacks(t);
      if (!e5(e, "niumo_ult") && wn(n, "ult") && s <= 3.8 && st >= 2 && Nm(e, "ult", t, st) + S1(e, t) >= i)
        return (n.act.castSelf("ult"), !0);
      if (s <= 5.6 && !e5(e, "niumo_ult") && a("s2", 4)) {
        _s(n, t, 0.2, 0, Bt);
        const dx = Bt.x - e.pos.x,
          dy = Bt.y - e.pos.y,
          d = Math.hypot(dx, dy) || 1;
        if (Cl(n, dx / d, dy / d, Math.min(4.0, s + 0.8))) return ($s(n, "s2", Bt), !0);
      }
      return !1;
    }
    case "monkey": {
      if (s <= 9.0 && a("s2")) return (_s(n, t, 0.18, 21, Bt), Bc(n, "s2", Bt), !0);
      if (a("s1") && n.time - (n._mkPeelAt ?? -99) >= 0.85) {
        const spot = monkeyPickPeelSpot(n, t);
        if (spot) return ((n._mkPeelAt = n.time), Bc(n, "s1", spot), !0);
      }
      if (!e5(e, "monkey_ult") && wn(n, "ult") && s <= e.stats.attackRange * 1.35 + t.radius && i <= S1(e, t) * 2.4 + Nm(e, "ult", t, 2))
        return (n.act.castSelf("ult"), !0);
      return !1;
    }
    case "slime": {
      if (e5(e, "slime_wall_bounce") && wn(n, "s2")) return (_s(n, t, 0.12, 30, Bt), $s(n, "s2", Bt), !0);
      if (e5(e, "slime_ball_charge") && wn(n, "s2")) return (_s(n, t, 0.12, 24, Bt), $s(n, "s2", Bt), !0);
      if (e5(e, "slime_puddle") && wn(n, "s1") && s <= 2.95 + t.radius) return (n.act.castSelf("s1"), !0);
      if (!e5(e, "slime_cling") && a("s1") && s <= 5.8 + t.radius) return (n.act.castTarget("s1", t.id), !0);
      if (!e5(e, "slime_cling") && a("s2") && s <= 7.5) return (_s(n, t, 0.2, 20, Bt), $s(n, "s2", Bt), !0);
      return !1;
    }
  }
}

function Uk(n, t) {
  const e = n.me,
    s = ye(e.pos, t.pos);
  switch (n.heroId) {
    case "panyue":
      return wn(n, "s2") && s <= 4 + t.radius && x0(n, "s2") >= se.pokeMana ? (n.act.castSelf("s2"), !0) : !1;
    case "chijin":
      return wn(n, "s1") && s <= 5.2 && x0(n, "s1") >= se.pokeMana
        ? (_s(n, t, 0.1, 0, Bt), $s(n, "s1", Bt), !0)
        : !1;
    case "xingli":
      return wn(n, "s1") && s <= 11.6 && x0(n, "s1") >= se.pokeMana
        ? (_s(n, t, 0.08, Ii(n, "s1", "speed"), Bt), $s(n, "s1", Bt), !0)
        : wn(n, "s2") && s <= 9 && x0(n, "s2") >= 0.5 && (D3(t) || uh(t) > 0.2)
          ? (_s(n, t, Oa.xingli.s2.delay, 0, Bt), Bc(n, "s2", Bt), !0)
          : !1;
    case "fengling":
      return wn(n, "s1") && s <= 12.8 && x0(n, "s1") >= se.pokeMana
        ? (_s(n, t, 0.12, Ii(n, "s1", "speed"), Bt), $s(n, "s1", Bt), !0)
        : !1;
    case "mushroom":
      return wn(n, "s2") && s <= 6 && x0(n, "s2") >= se.pokeMana
        ? (n.act.castDir("s2", t.pos.x - e.pos.x, t.pos.y - e.pos.y), !0)
        : !1;
    case "yeque":
      return wn(n, "s2") &&
        s <= 8 &&
        x0(n, "s2") >= se.pokeMana &&
        (_s(n, t, 0.06, Ii(n, "s2", "speed"), Bt), !ay(n, Bt, 0.5))
        ? ($s(n, "s2", Bt), !0)
        : !1;
    case "xuesong": {
      if (!e5(e, "xuesong_scoop") && wn(n, "ult")) {
        const uTgt = xuesongPickUltTarget(n, !1);
        if (uTgt) {
          n.brain.callFocus(uTgt.id, n.time);
          return (n.act.castTarget("ult", uTgt.id), !0);
        }
      }
      return e5(e, "xuesong_sand") && wn(n, "s1") && s <= 8.5 ? (Bc(n, "s1", t.pos), !0) : !1;
    }
    case "stone": {
      const training = e5(e, "stone_train"),
        hasCorpse = e5(e, "stone_corpse");
      if (hasCorpse && wn(n, "s2") && s <= 7.5) return (Bc(n, "s2", t.pos), !0);
      if (training && wn(n, "s1") && (n.hpR < 0.42 || (n.heroesOnMe > 0 && n.adv < 0.85))) return (n.act.castSelf("s1"), !0);
      if (!training && wn(n, "s1") && s > 6.5 && n.hpR > 0.66 && x0(n, "s1") >= 0.35) return (n.act.castSelf("s1"), !0);
      return !1;
    }
    case "scallion":
      return wn(n, "s1") && s <= 8.5 && x0(n, "s1") >= se.pokeMana
        ? (_s(n, t, 0.12, 0, Bt), $s(n, "s1", Bt), !0)
        : !1;
    case "paperboy":
      return wn(n, "s1") && (s <= 8.3 || (n.nearFoe !== null && n.nearFoeD <= 8.3)) && x0(n, "s1") >= 0.16
        ? (n.act.castSelf("s1"), !0)
        : !1;
    case "maggot":
      return wn(n, "ult") && s <= 13.2 && x0(n, "ult") >= se.pokeMana
        ? (_s(n, t, Oa.maggot.ult.delay, 0, Bt), Bc(n, "ult", Bt), !0)
        : wn(n, "s1") && s <= 8.2 && x0(n, "s1") >= se.pokeMana && !e.buffs.some((b) => b.id === "maggot_spray")
          ? (_s(n, t, 0.15, 0, Bt), $s(n, "s1", Bt), !0)
          : !1;
    case "horseman":
      if (e5(e, "horseman_kick_charge") && wn(n, "s1")) return ($s(n, "s1", t.pos), !0);
      return wn(n, "s1") && s <= 5.8 && x0(n, "s1") >= se.pokeMana && !e5(e, "horseman_charge")
        ? ($s(n, "s1", t.pos), !0)
        : wn(n, "s2") && s <= 5.0 && x0(n, "s2") >= se.pokeMana
          ? (n.act.castSelf("s2"), !0)
          : !1;
    case "cow": {
      const kickR = Math.max(4.0, Math.min(13.0, 5.5 + ((e.stats.moveSpeed || 5.5) - 4.5) * 0.95));
      if (e5(e, "cow_squat") && wn(n, "s1") && (n.hpR < 0.45 || n.heroesOnMe > 1)) return (n.act.castSelf("s1"), !0);
      if (!e5(e, "cow_squat") && !e5(e, "cow_exhaust") && wn(n, "s1") && s > 6.5 && n.hpR > 0.72 && x0(n, "s1") >= 0.5)
        return (n.act.castSelf("s1"), !0);
      return wn(n, "s2") && s <= kickR && x0(n, "s2") >= se.pokeMana ? (n.act.castTarget("s2", t.id), !0) : !1;
    }
    case "niumo": {
      if (e5(e, "niumo_march")) return !1;
      if (wn(n, "s1") && s <= 6.7 && x0(n, "s1") >= 0.2) return (_s(n, t, 0.3, 0, Bt), $s(n, "s1", Bt), !0);
      if (wn(n, "s2") && s <= 5.0 && x0(n, "s2") >= 0.35 && !e5(e, "niumo_ult") && n.adv >= 0.85) {
        _s(n, t, 0.2, 0, Bt);
        const dx = Bt.x - e.pos.x,
          dy = Bt.y - e.pos.y,
          d = Math.hypot(dx, dy) || 1;
        if (Cl(n, dx / d, dy / d, 4.0)) return ($s(n, "s2", Bt), !0);
      }
      return !1;
    }
    case "monkey": {
      if (wn(n, "s1") && x0(n, "s1") >= 0.26 && n.time - (n._mkPeelAt ?? -99) >= 1.6) {
        const spot = monkeyPickPeelSpot(n, t);
        if (spot) return ((n._mkPeelAt = n.time), Bc(n, "s1", spot), !0);
      }
      if (wn(n, "s2") && s <= 8.8 && x0(n, "s2") >= 0.45 && (uh(t) > 0.2 || n.adv >= 0.95))
        return (_s(n, t, 0.2, 21, Bt), Bc(n, "s2", Bt), !0);
      return !1;
    }
    case "slime": {
      if (e5(e, "slime_wall_bounce") && wn(n, "s2") && s <= 10.5) return (_s(n, t, 0.14, 30, Bt), $s(n, "s2", Bt), !0);
      if (!e5(e, "slime_cling") && wn(n, "s1") && x0(n, "s1") >= 0.35 && s <= 5.6 + t.radius && n.adv >= 0.9)
        return (n.act.castTarget("s1", t.id), !0);
      return !1;
    }
  }
}

function oy(n, t, e) {
  if (t.length === 0) return !1;
  const s = n.me,
    i = e ? se.jungleMana : se.waveclearMana,
    a = e ? 1 : 3,
    o = (l) => wn(n, l) && x0(n, l) >= i,
    r = t[0];
  switch (n.heroId) {
    case "panyue": {
      if (!o("s2")) return !1;
      let l = 0;
      for (const c of t) ye(s.pos, c.pos) <= 4.5 + c.radius && l++;
      return l >= a + (e ? 0 : 1) ? (n.act.castSelf("s2"), !0) : !1;
    }
    case "chijin":
      return o("s1") && Dd(t, 4, Bt) >= a && ye(s.pos, Bt) <= 4.5
        ? (n.act.castDir("s1", Bt.x - s.pos.x, Bt.y - s.pos.y), !0)
        : !1;
    case "xingli": {
      if (o("s1")) {
        Dd(t, 4, Bt);
        const l = Bt.x - s.pos.x,
          c = Bt.y - s.pos.y;
        if (Math.hypot(l, c) <= 11 && J2(n, t, l, c, 12, 0.65) >= a) return (n.act.castDir("s1", l, c), !0);
      }
      return wn(n, "s2") && x0(n, "s2") >= i + 0.1 && Dd(t, 3.4, Bt) >= a + 1 && ye(s.pos, Bt) <= 9
        ? (n.act.castAt("s2", Bt), !0)
        : !1;
    }
    case "fengling": {
      if (!o("s1")) return !1;
      Dd(t, 4, Bt);
      const l = Bt.x - s.pos.x,
        c = Bt.y - s.pos.y;
      return Math.hypot(l, c) <= 12 && J2(n, t, l, c, 14, 0.65) >= a ? (n.act.castDir("s1", l, c), !0) : !1;
    }
    case "mushroom": {
      if (!o("s2")) return !1;
      Dd(t, 4, Bt);
      const l = Bt.x - s.pos.x,
        c = Bt.y - s.pos.y,
        f = Math.hypot(l, c);
      return f <= 6 && J2(n, t, l, c, 6.2, 0.85) >= a + (e ? 0 : 1)
        ? (n.act.castDir("s2", l, c), !0)
        : !1;
    }
    case "yeque": {
      if (o("s2") && ye(s.pos, r.pos) <= 3.6 + r.radius)
        return (n.act.castDir("s2", r.pos.x - s.pos.x, r.pos.y - s.pos.y), !0);
      if (o("s1")) {
        Dd(t, 4, Bt);
        const l = Bt.x - s.pos.x,
          c = Bt.y - s.pos.y,
          f = Math.hypot(l, c);
        if (f > 0.8 && f <= 6 && J2(n, t, l, c, 6.5, 1) >= a && Cl(n, l / f, c / f, 6.5))
          return (n.act.castDir("s1", l, c), !0);
      }
      return !1;
    }
    case "xuesong":
      return s.buffs.some((b) => b.id === "xuesong_sand") && wn(n, "s1") && Dd(t, 3, Bt) >= a && ye(s.pos, Bt) <= 8.5
        ? (n.act.castAt("s1", Bt), !0)
        : !1;
    case "stone": {
      const training = e5(s, "stone_train"),
        hasCorpse = e5(s, "stone_corpse");
      if (hasCorpse && wn(n, "s2") && Dd(t, 2.6, Bt) >= (training ? 1 : a) && ye(s.pos, Bt) <= 7.5)
        return (n.act.castAt("s2", Bt), !0);
      if (!hasCorpse && (training ? wn(n, "s2") && x0(n, "s2") >= 0.16 : o("s2")) && ye(s.pos, r.pos) <= 5.5 + r.radius && t.length >= (e || training ? 1 : 2))
        return (n.act.castTarget("s2", r.id), !0);
      if (!training && wn(n, "s1") && x0(n, "s1") >= 0.25 && n.hpR > 0.58 && (n.foesNear === 0 || (n.foesNear === 1 && n.adv >= 0.95 && n.nearFoeD >= 5.2)) && ye(s.pos, r.pos) <= 2.9)
        return (n.act.castSelf("s1"), !0);
      return !1;
    }
    case "scallion": {
      if (!o("s1")) return !1;
      Dd(t, 3.6, Bt);
      const l = Bt.x - s.pos.x,
        c = Bt.y - s.pos.y;
      return Math.hypot(l, c) <= 8.5 && J2(n, t, l, c, 8.8, 1.15) >= a ? (n.act.castDir("s1", l, c), !0) : !1;
    }
    case "paperboy":
      return !1;
    case "maggot": {
      if (o("ult") && Dd(t, 2.6, Bt) >= a && ye(s.pos, Bt) <= 13) return (n.act.castAt("ult", Bt), !0);
      if (o("s1") && !s.buffs.some((b) => b.id === "maggot_spray")) {
        Dd(t, 3.4, Bt);
        const l = Bt.x - s.pos.x,
          c = Bt.y - s.pos.y;
        if (Math.hypot(l, c) <= 8.2 && J2(n, t, l, c, 8.5, 1.2) >= a) return (n.act.castDir("s1", l, c), !0);
      }
      return !1;
    }
    case "horseman": {
      if (e5(s, "horseman_kick_charge") && wn(n, "s1")) return (n.act.castDir("s1", r.pos.x - s.pos.x, r.pos.y - s.pos.y), !0);
      if (o("s2") && ye(s.pos, r.pos) <= 4.8 && t.length >= a) return (n.act.castSelf("s2"), !0);
      if (o("s1") && Dd(t, 3.4, Bt) >= a && ye(s.pos, Bt) <= 4.0)
        return (n.act.castDir("s1", Bt.x - s.pos.x, Bt.y - s.pos.y), !0);
      return !1;
    }
    case "cow": {
      const kickR = Math.max(4.0, Math.min(13.0, 5.5 + ((s.stats.moveSpeed || 5.5) - 4.5) * 0.95));
      if (o("s2") && ye(s.pos, r.pos) <= kickR + r.radius && t.length >= (e ? 1 : 2))
        return (n.act.castTarget("s2", r.id), !0);
      if (!e5(s, "cow_squat") && !e5(s, "cow_exhaust") && o("s1") && n.hpR > 0.7 && n.foesNear === 0 && ye(s.pos, r.pos) <= 3.0)
        return (n.act.castSelf("s1"), !0);
      return !1;
    }
    case "niumo": {
      if (e5(s, "niumo_march")) return !1;
      if (o("s1") && Dd(t, 3.2, Bt) >= a && ye(s.pos, Bt) <= 6.6)
        return (n.act.castDir("s1", Bt.x - s.pos.x, Bt.y - s.pos.y), !0);
      if (o("s2") && (e || n.foesNear === 0) && Dd(t, 2.8, Bt) >= (e ? 1 : 3) && ye(s.pos, Bt) <= 4.8) {
        const l = Bt.x - s.pos.x,
          c = Bt.y - s.pos.y,
          f = Math.hypot(l, c) || 1;
        if (Cl(n, l / f, c / f, 4.0)) return (n.act.castDir("s2", l, c), !0);
      }
      return !1;
    }
    case "monkey": {
      if (o("s2") && Dd(t, 2.8, Bt) >= a && ye(s.pos, Bt) <= 8.8) return (n.act.castAt("s2", Bt), !0);
      return !1;
    }
    case "slime": {
      if (e5(s, "slime_ball_charge") && wn(n, "s2")) return (n.act.castDir("s2", r.pos.x - s.pos.x, r.pos.y - s.pos.y), !0);
      if (o("s2") && (e || n.foesNear === 0) && Dd(t, 2.6, Bt) >= a && ye(s.pos, Bt) <= 5.8)
        return (n.act.castDir("s2", Bt.x - s.pos.x, Bt.y - s.pos.y), !0);
      return !1;
    }
  }
}

function Kd(n, t, e, s, i) {
  const a = Math.atan2(s, e);
  for (const o of [0, 0.5, -0.5, 1, -1]) {
    const r = a + o,
      l = Math.cos(r),
      c = Math.sin(r);
    if (
      ((Bt.x = n.me.pos.x + l * i),
      (Bt.y = n.me.pos.y + c * i),
      !!n.v.lineClear(n.me.pos, Bt) && n.v.enemyStructureCovering(Bt, 0) === null)
    )
      return (n.act.castDir(t, l, c), !0);
  }
  return !1;
}

function a6(n, t, e) {
  const s = n.nearFoe,
    i = s !== null && n.nearFoeD < 7;
  switch (n.heroId) {
    case "panyue":
      if (i && wn(n, "s2", !0) && n.nearFoeD < 4.5) return (n.act.castSelf("s2"), !0);
      if (wn(n, "s1", !0) && Kd(n, "s1", t, e, 7.5)) return !0;
      if (n.hpR < 0.25 && wn(n, "ult", !0)) {
        const a = Math.hypot(t, e) || 1;
        ((Bt.x = n.me.pos.x + (t / a) * 9.5), (Bt.y = n.me.pos.y + (e / a) * 9.5));
        const o = n.v.nearestWalkable(Bt);
        if (n.v.enemyStructureCovering(o, 0) === null) return (n.act.castAt("ult", o), !0);
      }
      return !1;
    case "chijin":
      return wn(n, "s2", !0) && Kd(n, "s2", t, e, 5.5);
    case "xingli":
      return i && s && wn(n, "s2", !0)
        ? ((Bt.x = s.pos.x + (n.me.pos.x - s.pos.x) * 0.3),
          (Bt.y = s.pos.y + (n.me.pos.y - s.pos.y) * 0.3),
          n.act.castAt("s2", Bt),
          !0)
        : !1;
    case "fengling":
      return wn(n, "s2", !0) && Kd(n, "s2", t, e, 5)
        ? !0
        : i && s && wn(n, "s1", !0) && n.hpR > 0.2
          ? (_s(n, s, 0.12, Ii(n, "s1", "speed"), Bt), $s(n, "s1", Bt), !0)
          : !1;
    case "mushroom":
      if (wn(n, "s1", !0) && Kd(n, "s1", t, e, 8)) return !0;
      return i && s && wn(n, "s2", !0) && n.nearFoeD < 6
        ? (n.act.castDir("s2", s.pos.x - n.me.pos.x, s.pos.y - n.me.pos.y), !0)
        : !1;
    case "yeque":
      return wn(n, "s1", !0) && Kd(n, "s1", t, e, 6.5);
    case "xuesong": {
      const onPole = n.me.buffs.some((b) => b.id === "xuesong_pole"),
        hasSand = n.me.buffs.some((b) => b.id === "xuesong_sand");
      if (onPole && wn(n, "s2", !0)) {
        const a = Math.hypot(t, e) || 1;
        ((Bt.x = n.me.pos.x + (t / a) * 7.2), (Bt.y = n.me.pos.y + (e / a) * 7.2));
        const o = n.v.nearestWalkable(Bt);
        return (n.act.castAt("s2", o), !0);
      }
      if (!onPole && i && wn(n, "s2", !0)) return (n.act.castSelf("s2"), !0);
      if (hasSand && i && s && n.nearFoeD <= 8.5 && wn(n, "s1", !0)) return (Bc(n, "s1", s.pos), !0);
      return !1;
    }
    case "stone": {
      if (n.me.buffs.some((b) => b.id === "stone_train") && wn(n, "s1", !0)) return (n.act.castSelf("s1"), !0);
      if (n.hpR < 0.3 && wn(n, "ult", !0)) {
        const a = Math.hypot(t, e) || 1;
        ((Bt.x = n.me.pos.x + (t / a) * 10.5), (Bt.y = n.me.pos.y + (e / a) * 10.5));
        const o = n.v.nearestWalkable(Bt);
        if (n.v.enemyStructureCovering(o, 0) === null) return (n.act.castAt("ult", o), !0);
      }
      return !1;
    }
    case "scallion": {
      if (e5(n.me, "scallion_beam") && wn(n, "ult", !0)) return (n.act.castSelf("ult"), !0);
      if (i && s && n.nearFoeD <= 8.5 && wn(n, "s1", !0) && n.hpR > 0.22)
        return (_s(n, s, 0.1, 0, Bt), $s(n, "s1", Bt), !0);
      if (!e5(n.me, "scallion_beam") && n.hpR < 0.25 && wn(n, "ult", !0)) {
        const a = Math.hypot(t, e) || 1;
        ((Bt.x = n.me.pos.x + (t / a) * 7.2), (Bt.y = n.me.pos.y + (e / a) * 7.2));
        const o = n.v.nearestWalkable(Bt);
        if (n.v.enemyStructureCovering(o, 0) === null) return (n.act.castAt("ult", o), !0);
      }
      return !1;
    }
    case "paperboy": {
      if (i && wn(n, "s1", !0) && n.nearFoeD <= 8.3) return (n.act.castSelf("s1"), !0);
      if (i && wn(n, "ult", !0) && n.heroesOnMe > 0 && n.nearFoeD <= 8.5)
        return (n.act.castTarget("ult", n.me.id), !0);
      if (wn(n, "s2", !0)) return (n.act.castTarget("s2", n.me.id), !0);
      return !1;
    }
    case "maggot": {
      if (i && s && wn(n, "ult", !0) && n.nearFoeD <= 12) {
        ((Bt.x = s.pos.x + (n.me.pos.x - s.pos.x) * 0.35), (Bt.y = s.pos.y + (n.me.pos.y - s.pos.y) * 0.35));
        return (n.act.castAt("ult", Bt), !0);
      }
      return !1;
    }
    case "horseman": {
      if (e5(n.me, "horseman_kick_charge") && i && s && wn(n, "s1", !0)) return ($s(n, "s1", s.pos), !0);
      if (wn(n, "s2", !0) && (D3(n.me) || uh(n.me) > 0.15 || (i && n.nearFoeD <= 5.2))) return (n.act.castSelf("s2"), !0);
      if (wn(n, "ult", !0) && n.hpR < 0.45) return (n.act.castSelf("ult"), !0);
      return !1;
    }
    case "cow": {
      if (e5(n.me, "cow_squat") && wn(n, "s1", !0)) return (n.act.castSelf("s1"), !0);
      if (e5(n.me, "cow_stomp_ready") && i && n.nearFoeD <= 4.7 && wn(n, "ult", !0)) return (n.act.castSelf("ult"), !0);
      // 大招优先留着满血主动开团，只在快死且被人贴脸时才用来保命
      if (!e5(n.me, "cow_stomp_ready") && wn(n, "ult", !0) && n.hpR < 0.22 && i && n.nearFoeD < 4.5)
        return (n.act.castSelf("ult"), !0);
      return !1;
    }
    case "niumo": {
      if (e5(n.me, "niumo_march")) return !1;
      if (wn(n, "ult", !0) && i && (n.hpR < 0.35 || D3(n.me) || uh(n.me) > 0.25) && (nmStacks(s) >= 2 || n.foesNear >= 2))
        return (n.act.castSelf("ult"), !0);
      if (wn(n, "s2", !0) && (D3(n.me) || uh(n.me) > 0.2) && Kd(n, "s2", t, e, 4.2)) return !0;
      if (i && n.nearFoeD <= 6.6 && wn(n, "s1", !0)) return (_s(n, s, 0.25, 0, Bt), $s(n, "s1", Bt), !0);
      return !1;
    }
    case "monkey": {
      if (i && s && n.nearFoeD <= 7.8) {
        if (wn(n, "s1", !0) && n.time - (n._mkPeelAt ?? -99) >= 0.85 && monkeyPeelCount(n) < (Se.monkey.passive.values.maxPeels || 8)) {
          const spot = monkeyPickPeelSpot(n, s);
          if (spot) return ((n._mkPeelAt = n.time), Bc(n, "s1", spot), !0);
          if (n.nearFoeD >= 3.4) {
            ((Bt.x = s.pos.x + (n.me.pos.x - s.pos.x) * 0.45), (Bt.y = s.pos.y + (n.me.pos.y - s.pos.y) * 0.45));
            if (n.v.walkable(Bt, 0.55) && !monkeyOwnTowerBlocked(n, Bt))
              return ((n._mkPeelAt = n.time), n.act.castAt("s1", Bt), !0);
          }
        }
        if (wn(n, "s2", !0)) {
          ((Bt.x = s.pos.x + (n.me.pos.x - s.pos.x) * 0.45), (Bt.y = s.pos.y + (n.me.pos.y - s.pos.y) * 0.45));
          return (n.act.castAt("s2", Bt), !0);
        }
      }
      return !1;
    }
    case "slime": {
      if (e5(n.me, "slime_wall_bounce") && wn(n, "s2", !0) && Kd(n, "s2", t, e, 10.5)) return !0;
      if (e5(n.me, "slime_ball_charge") && wn(n, "s2", !0)) return (n.act.castDir("s2", t, e), !0);
      if (wn(n, "ult", !0) && (n.hpR < 0.34 || (i && n.nearFoeD < 4.5 && n.hpR < 0.5))) return (n.act.castSelf("ult"), !0);
      if (wn(n, "s2", !0) && Kd(n, "s2", t, e, 5.2)) return !0;
      return !1;
    }
  }
}

const cl = { x: 0, y: 0 },
  Ao = { kill: null, push: null, wait: null };

function iV(n) {
  if (!n.style.support) return null;
  for (const t of n.friends) {
    const e = Se[t.heroId].role;
    if ((e === "marksman" || e === "mage") && ye(t.pos, n.me.pos) < 13) return t;
  }
  return null;
}

function aV(n, t, e) {
  if (((Ao.kill = null), (Ao.push = null), (Ao.wait = null), n.foeMinions.length === 0)) return Ao;
  const s = n.me,
    i = n.v,
    a = Se[n.heroId].basicAttack,
    o = s.stats.attackRange,
    r = 1 / Math.max(0.1, s.stats.attackSpeed),
    l = Math.min(r, 0.7) * a.windup,
    c = a.projectileSpeed ?? 0,
    f = i.attackCooldown(),
    d = Math.max(1, s.stats.moveSpeed),
    h = n.ranged ? 4.5 : 6,
    u = n.myStruct;
  let m = 1 / 0,
    x = 1 / 0,
    p = 1 / 0;
  for (const g of n.foeMinions) {
    const y = ye(s.pos, g.pos) - g.radius,
      v = Math.max(0, y - o);
    if (
      v > h ||
      !n.safeToHit(g) ||
      !n.safeFromFoes(g) ||
      (e && g.targetId !== s.id && !(u && g.targetId === u.id))
    )
      continue;
    const _ = 600 / (600 + g.stats.armor),
      k = s.stats.ad * _;
    let M = 0;
    for (const T of n.myMinions) T.targetId === g.id && (M += T.stats.ad * T.stats.attackSpeed * _);
    u && u.targetId === g.id && (M += u.stats.ad * yr.minionMult * u.stats.attackSpeed * _);
    const S = v / d + l + (c > 0 ? Math.min(y, o) / c : 0) + f,
      b = g.hp - M * S,
      w = k * (1 + i.rng.range(-1, 1) * n.prof.lastHitError);
    if (b <= w) {
      if (t && (t.targetId === g.id || b > w * 0.4)) continue;
      const T = b - (g.minionType === "siege" || g.minionType === "super" ? 600 : 0);
      T < m && ((m = T), (Ao.kill = g));
      continue;
    }
    if (M > 0) {
      const T = (g.hp - k) / M - S;
      T < r * 1.05 && T < p && ((p = T), (Ao.wait = g));
    }
    g.hp < x && ((x = g.hp), (Ao.push = g));
  }
  return (Ao.kill && n.prof.lastHitSkip > 0 && i.rng.chance(n.prof.lastHitSkip) && (Ao.kill = null), Ao);
}

function oV(n, t, e) {
  const pbAggressive =
      n.heroId === "paperboy" && n.nearFoe !== null && n.nearFoeD <= 8.4 && (n.adv >= 0.52 || e5(n.me, "paperboy_effigy_ready")),
    nmBully =
      n.heroId === "niumo" && n.nearFoe !== null && n.nearFoeD <= 6.8 && n.adv >= 0.72 && !e5(n.me, "niumo_march"),
    bully = pbAggressive || nmBully;
  if (
    n.foes.length === 0 ||
    (!bully && n.adv < se.advPoke) ||
    n.inFoeRange ||
    (!bully && !n.inMood(_V, e ? Math.min(1, n.prof.harass + se.groupHarass) : n.prof.harass))
  )
    return !1;
  const s = n.me,
    i = n.v;
  let a = null,
    o = 1 / 0;
  for (const f of n.foes) {
    const d = ye(s.pos, f.pos);
    if (d > 13.5) continue;
    const h = f.hp / f.stats.maxHp + d * 0.03;
    h < o && ((o = h), (a = f));
  }
  if (!a || (!i.busy() && Uk(n, a) && (n.label = "poke"), t)) return !1;
  const r = ye(s.pos, a.pos) - a.radius,
    l = s.stats.attackRange,
    c = 3 + Math.floor(s.level / 3);
  return n.aggroMinions > c || !n.safeToHit(a)
    ? !1
    : (n.ranged ? r <= l + 0.8 && i.attackCooldown() <= 0.25 : nmBully ? r <= l + 1.4 && n.adv >= 0.78 : r <= l + 0.3 && n.adv >= 1)
      ? (n.act.attack(a.id), (n.label = "harass"), !0)
      : !1;
}

function rV(n, t) {
  const e = t.foeStruct;
  return e.invulnerable ||
    n.foeStruct !== e ||
    n.foeStructD - e.radius > n.me.stats.attackRange + 6 ||
    n.tankers === 0 ||
    n.tankHp < 450 ||
    n.towerOnMe ||
    (n.foes.length > 0 && n.adv < 0.95)
    ? !1
    : (n.act.attack(e.id), (n.label = "siege"), !0);
}

function lV(n, t) {
  const e = n.brain;
  if (e.aliveFoes <= 1) return !0;
  const s = Math.min(se.groupMin, e.pushers(n.v, t));
  return n.friendsNear + 1 >= s;
}

function E1(n, t, e) {
  const s = n.me,
    i = n.geo,
    a = n.team,
    o = n.brain.lanes[t],
    r = s.stats.attackRange,
    l = o.foeStruct,
    c = l.stats.attackRange,
    f = i.total(t),
    d = i.prog(a, t, s.pos.x, s.pos.y),
    h = e === "lane" ? iV(n) : null,
    u = n.ranged ? Math.max(2.5, r - 2.2) : n.style.support ? 1.6 : 1,
    m = o.allyFront >= o.ownP - 6 ? o.allyFront : -1,
    x = o.enemyFront,
    p = ZG(d, o.ownP + 2.5, Math.max(o.ownP + 2.5, f * 0.5 - 4));
  let g;
  e === "defend"
    ? ((g = o.ownP - 1.5),
      x >= 0 && x < o.ownP + 9 && (g = Math.min(x - u, o.ownP + 3)),
      o.threatHeroes >= 3 &&
        n.friendsNear + 1 < Math.min(o.threatHeroes - 1, n.brain.aliveAllies) &&
        (g = Math.min(g, Math.max(0, o.ownP - se.regroupBack))))
    : m >= 0
      ? ((g = (x >= 0 && Math.abs(x - m) < 12 ? (m + x) * 0.5 : m + 0.5) - u),
        g < d - 3 && (x < 0 || x - d > 10) && (g = Math.max(g, Math.min(d, p))))
      : x >= 0
        ? (g = Math.min(x - u - 1.5, p))
        : (g = p);
  const y = n.respect,
    v = n.myMinions.length === 0 && n.foeMinions.length >= 3;
  if (
    (v && x >= 0 && (g = Math.min(g, x > o.ownP + 7 ? x - se.minionAggro - 1.5 : o.ownP - 3)),
    n.adv < 1.15 || n.poker)
  )
    for (const T of n.foes) {
      const E = i.prog(a, t, T.pos.x, T.pos.y);
      if (i.lateral > 9 || E < d - 2) continue;
      let A = n.respect ? n.threatReach(T) + 1 : T.stats.attackRange + T.radius + s.radius + 0.8;
      if (T === n.poker) A = Math.max(A, T.stats.attackRange + T.radius + s.radius + 2.5);
      else if (n.adv >= 1.15) continue;
      g > E - A && (g = E - A);
    }
  (e === "lane" && n.prof.harass < 0.3 && (g = Math.min(g, f * 0.5 + 3)),
    e === "push" && g > o.foeP - c - 9 && !lV(n, t) && (g = o.foeP - c - 9),
    (n.foeStruct === l ? n.tankers > 0 && n.tankHp > 450 && !n.towerOnMe : o.atFoeStruct) ||
      (g = Math.min(g, o.foeP - (c + se.towerMargin + 0.8))),
    (g = Math.max(g, o.ownP - 4)),
    n.anchorLane === t && Math.abs(g - n.anchorP) < 6 && (g = n.anchorP + (g - n.anchorP) * 0.35),
    (n.anchorLane = t),
    (n.anchorP = g),
    i.point(a, t, g, cl, n.side));
  const k = ye(s.pos, cl);
  if (k > 17) {
    if (e === "defend" && k > 60 && ye(n.home, cl) < k - 35 && n.recallNow()) {
      n.label = "defend:recall";
      return;
    }
    (n.travel(cl.x, cl.y), (n.label = `${e}:go`));
    return;
  }
  const M = h !== null,
    S = e !== "lane" || o.foeHeroes === 0 || n.adv >= 1.3 || o.threatMinions > 0;
  if (n.heroId === "monkey") {
    if (monkeyStackUlt(n)) return;
    if (e5(s, "monkey_ult") && n.foeMinions.length > 0 && !M) {
      const mTgt = monkeyUltFarmTarget(n);
      if (mTgt) {
        (n.act.attack(mTgt.id), (n.label = `${e}:stack`));
        return;
      }
    }
  }
  if (n.heroId === "stone" && stoneLaneWorkout(n, e)) return;
  if (n.heroId === "xuesong") {
    if (!e5(s, "xuesong_scoop") && !n.v.busy() && wn(n, "ult")) {
      const uTgt = xuesongPickUltTarget(n, !1);
      if (uTgt) {
        n.brain.callFocus(uTgt.id, n.time);
        n.act.castTarget("ult", uTgt.id);
        n.label = "xuesong:ult-pick";
        return;
      }
    }
    if (xuesongPlanPit(n, t, e)) return;
  }
  const b = aV(n, h, v);
  if (b.kill) {
    (n.act.attack(b.kill.id), (n.label = `${e}:lasthit`));
    return;
  }
  const w = b.wait !== null && !S;
  if (!oV(n, w, e !== "lane") && !rV(n, o)) {
    if (n.heroId === "monkey" && monkeyAnnoyPeel(n)) return;
    if (
      (S && !M && !n.v.busy() && n.foeMinions.length >= 3 && oy(n, n.foeMinions, !1),
      b.push && !M && !y && !w)
    ) {
      (n.act.attack(b.push.id), (n.label = `${e}:push`));
      return;
    }
    if (w && b.wait) {
      const T = b.wait;
      (ye(s.pos, T.pos) - T.radius > r - 0.3 ? n.act.moveTo(T.pos.x, T.pos.y) : n.act.halt(),
        (n.label = `${e}:wait`));
      return;
    }
    (k > 1.5 ? n.act.moveTo(cl.x, cl.y) : n.act.halt(),
      (n.label = y ? `${e}:zoned` : v ? `${e}:wait-wave` : `${e}:hold`));
  }
}

const o6 = 6,
  Qp = [],
  ur = { x: 0, y: 0 };

function r6(n, t) {
  for (let e = 0; e < n.buffs.length; e++) if (n.buffs[e].id === t) return !0;
  return !1;
}

function z3(n, t) {
  Qp.length = 0;
  for (const e of n.v.monsters()) e.campId === t && Qp.push(e);
  return (Qp.sort((e, s) => e.hp - s.hp), Qp);
}

function cV(n) {
  const t = n.v,
    e = n.me,
    s = t.map.camps,
    i = t.state.camps;
  if (
    (n.campId >= 0 && i[n.campId].alive) ||
    (n.campId >= 0 && s[n.campId].side === n.team && i[n.campId].respawnIn <= o6)
  )
    return s[n.campId];
  let a = null,
    o = 1 / 0;
  const r = Math.max(1, e.stats.moveSpeed);
  for (const l of s) {
    if (l.side !== n.team || rn[l.monsterType].epic) continue;
    const c = ye(e.pos, l.pos),
      f = i[l.id],
      d = f.alive ? 0 : Math.max(0, f.respawnIn - c / r);
    if (d > o6 && n.time > 30) continue;
    let h = c + d * r;
    (l.monsterType === "frost_golem" && !r6(e, "frost_insight") && (h -= 10),
      l.monsterType === "ember_golem" && !r6(e, "ember_might") && (h -= 12),
      h < o && ((o = h), (a = l)));
  }
  return ((n.campId = a ? a.id : -1), a);
}

function fV(n) {
  const t = n.me,
    e = n.v;
  if (n.time < n.nextGankAt || t.level < 2 || n.hpR < 0.6 || n.manaR < 0.3) return null;
  let s = null,
    i = 0;
  for (const a of n.foesAll) {
    const o = ye(t.pos, a.pos);
    if (
      o > 48 ||
      e.enemyStructureCovering(a.pos, 5) ||
      n.time - (n.gankedAt.get(a.id) ?? -999) < se.gankSameTarget
    )
      continue;
    const r = n.geo.nearestLane(a.pos.x, a.pos.y);
    if (n.time - n.gankLaneAt[r] < se.gankSameLane) continue;
    let l = !1;
    for (const d of e.alliedHeroes())
      d !== t && d.hp > d.stats.maxHp * 0.4 && ye(d.pos, a.pos) < 14 && (l = !0);
    if (!l) continue;
    const c = n.advantageAt(a.pos.x, a.pos.y);
    if (c < 1.25 / n.prof.aggression) continue;
    const f = c * (1.4 - a.hp / a.stats.maxHp) - o / 60;
    f > i && ((i = f), (s = a));
  }
  return s;
}

function Cc(n, t) {
  return ((n.gankId = -1), (n.nextGankAt = n.time + n.prof.gankCooldown * (t ? 1 : 0.6)), !1);
}

function l6(n) {
  const t = n.v,
    e = n.me,
    s = n.time,
    i = t.unit(n.gankId);
  if (s - n.gankSince > 24) return Cc(n, !1);
  if (!i || i.kind !== "hero" || !i.alive || !t.canSee(i)) {
    const r = t.scoreboard();
    for (let c = 0; c < r.length; c++) if (r[c].id === n.gankId && !r[c].alive) return Cc(n, !0);
    if (s - n.gankSeenAt > 3.5) return Cc(n, !1);
    const l = t.lastSeen(n.gankId);
    return l ? (n.act.moveTo(l.x, l.y), (n.label = "gank"), !0) : Cc(n, !1);
  }
  if (((n.gankSeenAt = s), t.enemyStructureCovering(i.pos, 1.5))) return Cc(n, !1);
  const a = ye(e.pos, i.pos);
  if (a < 10)
    return n.advantageAt(i.pos.x, i.pos.y) < 1
      ? Cc(n, !1)
      : (n.act.moveTo(i.pos.x, i.pos.y), (n.label = "gank"), !0);
  const o = ye(n.foeHome, i.pos) || 1;
  return (
    (ur.x = i.pos.x + ((n.foeHome.x - i.pos.x) / o) * 4),
    (ur.y = i.pos.y + ((n.foeHome.y - i.pos.y) / o) * 4),
    (!t.walkable(ur) || t.enemyStructureCovering(ur, 2) || ye(e.pos, ur) > a + 6) &&
      ((ur.x = i.pos.x), (ur.y = i.pos.y)),
    n.travel(ur.x, ur.y, 2.5),
    (n.label = "gank"),
    !0
  );
}

function dV(n) {
  const t = n.v,
    e = n.me,
    s = n.time;
  if (n.gankId >= 0 && l6(n)) return;
  const i = t.state.camps;
  let a = !1;
  if (n.campId >= 0 && i[n.campId].alive && ye(e.pos, t.map.camps[n.campId].pos) < 9)
    for (const c of z3(n, n.campId)) c.hp < c.stats.maxHp * 0.97 && (a = !0);
  if (!a && s >= n.nextGankEval) {
    n.nextGankEval = s + 1;
    const c = fV(n);
    if (
      c &&
      ((n.gankId = c.id),
      (n.gankSince = s),
      (n.gankSeenAt = s),
      n.gankedAt.set(c.id, s),
      (n.gankLaneAt[n.geo.nearestLane(c.pos.x, c.pos.y)] = s),
      l6(n))
    )
      return;
  }
  const o = cV(n);
  if (!o) {
    let c = n.brain.pushLane,
      f = -1;
    for (const d of ["top", "mid", "bot"]) {
      const h = n.brain.lanes[d],
        u = h.threat + h.foeHeroes * 0.5;
      u > f && ((f = u), (c = d));
    }
    E1(n, c, "lane");
    return;
  }
  const r = z3(n, o.id),
    l = ye(e.pos, o.pos);
  if (r.length === 0) {
    (l > 4.5 ? n.travel(o.pos.x, o.pos.y) : n.act.halt(), (n.label = "jungle:wait"));
    return;
  }
  if (l > 9) {
    (n.travel(o.pos.x, o.pos.y), (n.label = "jungle:go"));
    return;
  }
  (t.busy() || oy(n, r, !0), n.act.attack(r[0].id), (n.label = "jungle:clear"));
}

function hV(n, t) {
  const e = n.v,
    s = n.me,
    i = e.map.camps[t],
    a = z3(n, t);
  if (!i || a.length === 0) {
    (n.act.halt(), (n.label = "epic:none"));
    return;
  }
  const o = a[0],
    r = ye(s.pos, i.pos);
  if (r > 11) {
    const d = ye(n.home, i.pos) || 1;
    (n.travel(i.pos.x + ((n.home.x - i.pos.x) / d) * 5, i.pos.y + ((n.home.y - i.pos.y) / d) * 5),
      (n.label = "epic:go"));
    return;
  }
  const c = i.monsterType === "star_colossus" ? se.colossusHeroes : se.drakeHeroes;
  if (o.hp >= o.stats.maxHp * 0.985) {
    let d = 1,
      h = !0;
    for (const u of n.friends) ye(u.pos, i.pos) > 12 || (d++, u.hp > s.hp && (h = !1));
    if (d < c || !h) {
      (r > 6 ? n.act.moveTo(i.pos.x, i.pos.y) : n.act.halt(), (n.label = "epic:wait"));
      return;
    }
  }
  (e.busy() || oy(n, a, !0), n.act.attack(o.id), (n.label = "epic:fight"));
}

function uV(n) {
  const t = n.hero;
  if (t.gold < xG) return !1;
  const e = $f(t);
  return !e || t.gold < Gf(t, e) ? !1 : (n.command({ type: "buy", itemId: e }), !0);
}

const pV = {
    panyue: { cast_s2: "s2", dash: "s1", leap: "ult" },
    chijin: { cast_s1: "s1", dash: "s2", spin: "ult" },
    xingli: { cast_s1: "s1", cast_s2: "s2", cast_ult: "ult" },
    fengling: { cast_s1: "s1", dash: "s2", cast_ult: "ult" },
    yeque: { dash: "s1", cast_s2: "s2", cast_ult: "ult" },
    mushroom: { cast_s1: "s1", spin: "s1", dash: "s1", cast_s2: "s2", leap: "ult" },
    niumo: { cast_s1: "s1", cast_s2: "s2", dash: "s2", cast_ult: "ult" },
    xuesong: { channel: "s1", cast_s1: "s1", leap: "s2", cast_s2: "s2", cast_ult: "ult" },
    stone: { cast_s1: "s1", cast_s2: "s2", leap: "ult" },
    scallion: { cast_s1: "s1", cast_s2: "s2", channel: "ult", cast_ult: "ult" },
    paperboy: { cast_s1: "s1", cast_s2: "s2", cast_ult: "ult" },
    maggot: { cast_s1: "s1", cast_s2: "s2", cast_ult: "ult" },
    horseman: { cast_s1: "s1", cast_s2: "s2", cast_ult: "ult" },
    cow: { cast_s1: "s1", cast_s2: "s2", leap: "s2", cast_ult: "ult" },
    monkey: { cast_s1: "s1", cast_s2: "s2", cast_ult: "ult" },
    slime: { cast_s1: "s1", cast_s2: "s2", dash: "s2", cast_ult: "ult" },
  },
  mV = 20,
  gV = 10,
  xV = 0.1;

class yV {
  team;
  enemyTeam;
  geo;
  profile;
  phase = "lane";
  lanes;
  tasks = new Map();
  pushLane = "mid";
  aliveAllies = 5;
  aliveFoes = 5;
  turtle = !1;
  epicCamp = -1;
  focusId = -1;
  massLane = null;
  massAt = -99;
  squadLane = null;
  squadUntil = 0;
  nextSquadAt = 0;
  focusUntil = 0;
  xsTargetId = -1;
  xsTargetUntil = 0;
  xsDrop = { x: 0, y: 0 };
  epicSince = 0;
  epicRetryAt = 0;
  epicLastHp = new Map();
  nextUpdate = -1;
  lastTime = -1;
  casts = new Map();
  castStamp = new Map();
  defendHold = new Map();
  constructor(t) {
    ((this.team = t.team),
      (this.enemyTeam = t.enemyTeam),
      (this.geo = eV(t.map)),
      (this.profile = zk[t.difficulty]));
    const e = t.alliedStructures().find((a) => a.kind === "core"),
      s = t.enemyStructures().find((a) => a.kind === "core"),
      i = (a) => ({
        lane: a,
        allyFront: -1,
        enemyFront: -1,
        allyMinions: 0,
        enemyMinions: 0,
        ownStruct: e,
        ownP: 0,
        foeStruct: s,
        foeP: 0,
        foeTowers: 3,
        ownTowers: 3,
        threatHeroes: 0,
        threatMinions: 0,
        threat: 0,
        foeHeroes: 0,
        threatUntil: -1,
        threatSeen: 0,
        atFoeStruct: !1,
      });
    this.lanes = { top: i("top"), mid: i("mid"), bot: i("bot") };
  }
  observe(t) {
    if (t.time === this.lastTime) return;
    this.lastTime = t.time;
    const e = t.scoreboard();
    for (let s = 0; s < e.length; s++) {
      const i = e[s];
      if (i.team === this.team || !i.alive || !t.canSee(i)) continue;
      const a = pV[i.heroId][i.anim];
      if (!a || this.castStamp.get(i.id * 4 + (a === "s1" ? 0 : a === "s2" ? 1 : 2)) === i.animStart)
        continue;
      this.castStamp.set(i.id * 4 + (a === "s1" ? 0 : a === "s2" ? 1 : 2), i.animStart);
      let o = this.casts.get(i.id);
      (o || ((o = { s1: -999, s2: -999, ult: -999 }), this.casts.set(i.id, o)), (o[a] = i.animStart));
    }
  }
  enemyReady(t, e, s) {
    const i = lm(t.level)[e];
    if (i <= 0) return !1;
    const a = this.casts.get(t.id);
    if (!a) return !0;
    const o = Se[t.heroId].skills[e].cooldown[i - 1] * (1 - xV);
    return s - a[e] >= o;
  }
  update(t) {
    (this.observe(t),
      !(t.time < this.nextUpdate) &&
        ((this.nextUpdate = t.time + se.teamTick),
        this.refreshLanes(t),
        this.refreshPhase(t),
        this.choosePushLane(t),
        this.refreshEpic(t),
        this.refreshSquad(t),
        this.assign(t),
        t.time >= this.focusUntil && (this.focusId = -1),
        t.time >= this.xsTargetUntil && (this.xsTargetId = -1)));
  }
  taskOf(t) {
    return this.tasks.get(t) ?? { kind: "lane", lane: "mid", campId: -1 };
  }
  callFocus(t, e) {
    ((this.focusId = t), (this.focusUntil = e + 2.5));
  }
  callXuesongCatch(t, x, y, e) {
    ((this.focusId = t),
      (this.focusUntil = Math.max(this.focusUntil, e + 3.6)),
      (this.xsTargetId = t),
      (this.xsTargetUntil = e + 3.6),
      (this.xsDrop.x = x),
      (this.xsDrop.y = y));
  }
  refreshLanes(t) {
    const e = this.geo,
      s = this.team;
    for (const l of gr) {
      const c = this.lanes[l];
      ((c.allyFront = -1),
        (c.enemyFront = -1),
        (c.allyMinions = 0),
        (c.enemyMinions = 0),
        (c.threatHeroes = 0),
        (c.threatMinions = 0),
        (c.foeHeroes = 0),
        (c.atFoeStruct = !1),
        (c.ownTowers = 0),
        (c.foeTowers = 0));
    }
    let i = null,
      a = null;
    const o = { top: 9, mid: 9, bot: 9 },
      r = { top: 9, mid: 9, bot: 9 };
    for (const l of t.alliedStructures()) {
      if (l.kind === "core") {
        i = l;
        continue;
      }
      const c = this.lanes[l.lane];
      (c.ownTowers++, l.tier < o[l.lane] && ((o[l.lane] = l.tier), (c.ownStruct = l)));
    }
    for (const l of t.enemyStructures()) {
      if (l.kind === "core") {
        a = l;
        continue;
      }
      const c = this.lanes[l.lane];
      (c.foeTowers++, l.tier < r[l.lane] && ((r[l.lane] = l.tier), (c.foeStruct = l)));
    }
    for (const l of gr) {
      const c = this.lanes[l];
      (c.ownTowers === 0 && i && (c.ownStruct = i),
        c.foeTowers === 0 && a && (c.foeStruct = a),
        (c.ownP = e.prog(s, l, c.ownStruct.pos.x, c.ownStruct.pos.y)),
        (c.foeP = e.prog(s, l, c.foeStruct.pos.x, c.foeStruct.pos.y)));
    }
    for (const l of t.allies()) {
      if (l.kind !== "minion") continue;
      const c = this.lanes[l.lane],
        f = e.prog(s, l.lane, l.pos.x, l.pos.y);
      (c.allyMinions++,
        f > c.allyFront && (c.allyFront = f),
        ye(l.pos, c.foeStruct.pos) <= c.foeStruct.stats.attackRange && (c.atFoeStruct = !0));
    }
    for (const l of t.enemies())
      if (l.kind === "minion") {
        const c = this.lanes[l.lane],
          f = e.prog(s, l.lane, l.pos.x, l.pos.y);
        (c.enemyMinions++,
          (c.enemyFront < 0 || f < c.enemyFront) && (c.enemyFront = f),
          ye(l.pos, c.ownStruct.pos) <= gV && c.threatMinions++);
      } else if (l.kind === "hero") {
        const c = e.nearestLane(l.pos.x, l.pos.y);
        e.lateral < 10 && this.lanes[c].foeHeroes++;
        for (const f of gr) {
          const d = this.lanes[f];
          ye(l.pos, d.ownStruct.pos) <= mV && d.threatHeroes++;
        }
      }
    for (const l of gr) {
      const c = this.lanes[l];
      c.threatHeroes >= 2
        ? ((c.threatUntil = t.time + se.threatHold), (c.threatSeen = c.threatHeroes))
        : t.time < c.threatUntil && c.threatHeroes < c.threatSeen && (c.threatHeroes = c.threatSeen);
      const f = t.time - c.ownStruct.lastHitTime < 3 ? 1 : 0;
      ((c.threat = c.threatHeroes * 2 + Math.min(c.threatMinions, 6) * 0.35 + f),
        c.foeHeroes >= 3 && ((this.massLane = l), (this.massAt = t.time)));
    }
    if (this.massLane)
      for (const l of gr) l !== this.massLane && this.massAt === t.time && (this.lanes[l].threatUntil = -1);
  }
  refreshPhase(t) {
    const e = t.state,
      s = t.scoreboard();
    let i = 0,
      a = 0;
    for (let r = 0; r < s.length; r++) s[r].alive && (s[r].team === this.team ? i++ : a++);
    ((this.aliveAllies = i),
      (this.aliveFoes = a),
      i <= a - 2 ? (this.turtle = !0) : i >= a && (this.turtle = !1));
    const o = e.teams[0].towersDestroyed + e.teams[1].towersDestroyed;
    (this.phase === "lane" &&
      (t.time >= se.laneEnd || (o >= 1 && t.time >= se.laneEnd * 0.7)) &&
      (this.phase = "mid"),
      this.phase !== "late" &&
        (t.time >= se.lateStart || (o >= 5 && t.time >= se.lateStart * 0.8)) &&
        (this.phase = "late"));
  }
  choosePushLane(t) {
    let e = this.pushLane,
      s = -1 / 0;
    for (const i of gr) {
      const a = this.lanes[i],
        o = a.foeStruct.hp / a.foeStruct.stats.maxHp;
      let r = (3 - a.foeTowers) * 1.2 + (1 - o) * 1.2;
      (i === "mid" && (r += 0.6),
        a.allyFront >= 0 && (r += (a.allyFront - this.geo.total(i) * 0.5) / 30),
        a.atFoeStruct && (r += 0.8),
        i === this.pushLane && (r += 1.2),
        a.ownTowers === 0 && (r -= 0.5),
        i === this.massLane && t.time - this.massAt < se.massMemory && (r += 3),
        r > s && ((s = r), (e = i)));
    }
    this.pushLane = e;
  }
  epicMonster(t, e) {
    for (const s of t.monsters()) if (s.campId === e) return s;
    return null;
  }
  refreshEpic(t) {
    const e = t.time;
    if (this.epicCamp >= 0) {
      (!this.epicMonster(t, this.epicCamp) || e - this.epicSince > 50 || this.turtle) &&
        ((this.epicCamp = -1), (this.epicRetryAt = e + 12));
      return;
    }
    if (e < this.epicRetryAt || this.turtle || e < 140) return;
    this.epicRetryAt = e + 4;
    const s = t.scoreboard();
    for (const i of t.map.camps) {
      if (!rn[i.monsterType].epic) continue;
      const a = this.epicMonster(t, i.id);
      if (!a) {
        this.epicLastHp.delete(i.id);
        continue;
      }
      const o = i.monsterType === "star_colossus",
        r = o ? se.colossusHeroes : se.drakeHeroes,
        l = o ? se.colossusLevel : se.drakeLevel;
      let c = 0,
        f = 0;
      for (let p = 0; p < s.length; p++) {
        const g = s[p];
        g.team !== this.team ||
          !g.alive ||
          g.hp < g.stats.maxHp * 0.55 ||
          ye(g.pos, i.pos) > (t.botControlled(g) ? 48 : 14) ||
          (c++, (f += g.level));
      }
      if (c < r || f / c < l) continue;
      let d = 0;
      for (const p of t.enemyHeroes()) ye(p.pos, i.pos) < 20 && d++;
      const h = this.epicLastHp.get(i.id) ?? a.hp;
      this.epicLastHp.set(i.id, a.hp);
      const u = a.hp < h - 1 && a.hp < a.stats.maxHp * 0.9,
        m = this.aliveAllies - this.aliveFoes;
      let x = !1;
      if (
        (u
          ? (x = this.profile.teamwork >= 0.9 && c >= r + 1)
          : d >= c
            ? (x = !1)
            : m >= 1
              ? (x = !0)
              : this.phase !== "lane" && m >= 0 && (x = t.rng.chance(0.25 * this.profile.teamwork)),
        !!x)
      ) {
        ((this.epicCamp = i.id), (this.epicSince = e));
        return;
      }
    }
  }
  refreshSquad(t) {
    const e = t.time;
    if (this.phase !== "mid" || this.turtle || this.epicCamp >= 0) {
      ((this.squadLane = null), this.phase === "lane" && (this.nextSquadAt = e + 5));
      return;
    }
    if (this.squadLane) {
      const a = this.lanes[this.squadLane];
      (e >= this.squadUntil || a.foeTowers < 3 || this.lanes.mid.threat >= 3) &&
        ((this.squadLane = null),
        (this.nextSquadAt = e + se.squadRest * (1.3 - 0.5 * this.profile.teamwork)));
      return;
    }
    if (e < this.nextSquadAt) return;
    let s = null,
      i = -1 / 0;
    for (const a of ["top", "bot"]) {
      const o = this.lanes[a];
      if (o.foeTowers < 3) continue;
      let l = (1 - o.foeStruct.hp / o.foeStruct.stats.maxHp) * 2 + t.rng.range(0, 1);
      (o.allyFront >= 0 && (l += (o.allyFront - this.geo.total(a) * 0.5) / 25),
        (l += o.foeHeroes * 0.3),
        l > i && ((i = l), (s = a)));
    }
    if (!s) {
      this.nextSquadAt = e + 10;
      return;
    }
    ((this.squadLane = s), (this.squadUntil = e + se.squadTime));
  }
  assign(t) {
    const e = t.scoreboard(),
      s = [];
    for (let c = 0; c < e.length; c++) e[c].team === this.team && s.push(e[c]);
    const i = (c) => t.botControlled(c),
      a = this.aliveAllies - this.aliveFoes,
      o = this.phase !== "lane" && a >= 2;
    for (const c of s) {
      let f;
      const d = c.lane === "jungle" ? "mid" : c.lane;
      (this.phase === "late" || o
        ? (f = { kind: "push", lane: this.pushLane, campId: -1 })
        : this.squadLane && (c.lane === "jungle" || c.lane === "mid")
          ? (f = { kind: "push", lane: this.squadLane, campId: -1 })
          : c.lane === "jungle"
            ? (f = { kind: "jungle", lane: d, campId: -1 })
            : this.phase === "mid" && this.lanes[d].foeTowers < 3
              ? (f = { kind: "push", lane: this.pushLane, campId: -1 })
              : (f = { kind: "lane", lane: d, campId: -1 }),
        this.tasks.set(c.heroId, f));
    }
    if (this.turtle) {
      let c = this.pushLane,
        f = 0;
      for (const d of gr) this.lanes[d].threat > f && ((f = this.lanes[d].threat), (c = d));
      for (const d of s) {
        const h = this.tasks.get(d.heroId);
        h &&
          h.kind === "push" &&
          this.tasks.set(d.heroId, { kind: "defend", lane: f > 0 ? c : h.lane, campId: -1 });
      }
    }
    const r = new Set(),
      l = [...gr].sort((c, f) => this.lanes[f].threat - this.lanes[c].threat);
    for (const c of l) {
      const f = this.lanes[c];
      if (f.threat < 1.2) continue;
      const d = f.ownStruct.kind === "core" || (f.ownStruct.kind === "tower" && f.ownStruct.tier === 3);
      let h;
      if (this.phase === "lane") {
        let m = !1;
        for (const x of s) x.alive && x.lane === c && ye(x.pos, f.ownStruct.pos) < 24 && (m = !0);
        h = m ? 0 : 1;
      } else
        ((h = f.threatHeroes > 0 ? f.threatHeroes + (d ? 1 : 0) : f.threatMinions >= 3 ? 1 : 0),
          d && f.threatHeroes >= 2 && (h = 5));
      for (const m of s) m.alive && !i(m) && ye(m.pos, f.ownStruct.pos) < 18 && h--;
      if (h <= 0) continue;
      const u = s
        .filter((m) => m.alive && i(m) && !r.has(m.heroId))
        .sort((m, x) => ye(m.pos, f.ownStruct.pos) - ye(x.pos, f.ownStruct.pos));
      for (const m of u) {
        if (h <= 0) break;
        (this.phase === "lane" && m.lane !== "jungle" && m.lane !== c) ||
          (ye(m.pos, f.ownStruct.pos) > 70 && !d) ||
          (this.tasks.set(m.heroId, { kind: "defend", lane: c, campId: -1 }),
          this.defendHold.set(m.heroId, { lane: c, until: t.time + se.defendHold }),
          r.add(m.heroId),
          h--);
      }
    }
    for (const c of s) {
      const f = this.defendHold.get(c.heroId);
      if (!(!f || r.has(c.heroId) || !c.alive)) {
        if (t.time >= f.until || this.lanes[f.lane].threat <= 0) {
          this.defendHold.delete(c.heroId);
          continue;
        }
        (this.tasks.set(c.heroId, { kind: "defend", lane: f.lane, campId: -1 }), r.add(c.heroId));
      }
    }
    if (this.epicCamp >= 0) {
      const c = t.map.camps[this.epicCamp],
        f = c.monsterType === "star_colossus",
        d = (f ? se.colossusHeroes : se.drakeHeroes) + 1,
        h = s
          .filter(
            (m) =>
              m.alive &&
              !r.has(m.heroId) &&
              m.hp >= m.stats.maxHp * 0.5 &&
              ye(m.pos, c.pos) < (i(m) ? 55 : 14),
          )
          .sort(
            (m, x) =>
              (m.lane === "jungle" ? -100 : 0) +
              ye(m.pos, c.pos) -
              ((x.lane === "jungle" ? -100 : 0) + ye(x.pos, c.pos)),
          );
      let u = 0;
      for (const m of h) {
        if (u >= d) break;
        (this.tasks.set(m.heroId, { kind: "epic", lane: "mid", campId: this.epicCamp }), u++);
      }
      if (u < (f ? se.colossusHeroes : se.drakeHeroes)) {
        for (const m of h) {
          const x = this.tasks.get(m.heroId);
          x &&
            x.kind === "epic" &&
            this.tasks.set(
              m.heroId,
              m.lane === "jungle"
                ? { kind: "jungle", lane: "mid", campId: -1 }
                : { kind: "lane", lane: m.lane, campId: -1 },
            );
        }
        ((this.epicCamp = -1), (this.epicRetryAt = t.time + 8));
      }
    }
  }
  pushers(t, e) {
    let s = 0;
    for (const i of t.alliedHeroes()) {
      const a = this.tasks.get(i.heroId);
      !a || a.kind !== "push" || a.lane !== e || (!t.botControlled(i) && ye(i.pos, t.hero.pos) > 16) || s++;
    }
    return s;
  }
}

const c6 = new WeakMap();

function vV(n) {
  let t = c6.get(n.state);
  t || ((t = [null, null]), c6.set(n.state, t));
  let e = t[n.team];
  return (e || ((e = new yV(n)), (t[n.team] = e)), e);
}

const Ms = { x: 0, y: 0 },
  t5 = { x: 0, y: 0 },
  bV = { x: 0, y: 0 },
  _V = 0,
  wV = 1,
  MV = 2,
  kV = 3,
  SV = [2.5, 4, 3, 6];

function e5(n, t) {
  for (let e = 0; e < n.buffs.length; e++) if (n.buffs[e].id === t) return !0;
  return !1;
}

const f6 = {
    panyue: { slot: "s1", reach: 9 },
    chijin: { slot: "s2", reach: 5.5 },
    niumo: { slot: "s1", reach: 4.5 },
    xingli: null,
    fengling: null,
    yeque: { slot: "s1", reach: 6.5 },
    xuesong: { slot: "ult", reach: 6.5 },
    stone: { slot: "ult", reach: 10.5 },
    horseman: { slot: "s1", reach: 6.8 },
    cow: { slot: "s2", reach: 7.5 },
    monkey: { slot: "s2", reach: 9.0 },
    slime: { slot: "s2", reach: 8.5 },
  },
  d6 = { panyue: 1.2, chijin: 0.7, niumo: 0.7, xingli: 0.8, fengling: 0.6, yeque: 0.9, xuesong: 0.85, stone: 0.85, horseman: 0.75, cow: 0.85, monkey: 0.85, slime: 0.9 };
function monkeyOwnPeels(n) {
  const e = n.me,
    areas = n.v.sim ? n.v.sim.areas : [],
    out = [];
  for (let i = 0; i < areas.length; i++) {
    const a = areas[i];
    if (!a.dead && a.ownerId === e.id && a.visual === "monkey_peel") out.push(a);
  }
  return out;
}

function monkeyPeelCount(n) {
  const e = n.me,
    active = monkeyOwnPeels(n).length,
    recList = e.h?._mkPeels;
  let recActive = 0;
  if (recList) {
    for (let i = 0; i < recList.length; i++) if (recList[i].active) recActive++;
  }
  return Math.max(active, recActive) + (e.h?._mkPeelsInFlight || 0);
}

// 己方泉水/己方防御塔周围默认禁扔香蕉皮；只有该塔正被敌人或小兵推塔时才允许塔下防守埋雷
function monkeyOwnTowerBlocked(n, pt) {
  const v = n.v;
  if (ye(pt, n.home) <= 24) {
    let baseInvaded = !1;
    for (let i = 0; i < n.foesAll.length; i++) {
      if (ye(n.foesAll[i].pos, n.home) <= 28) {
        baseInvaded = !0;
        break;
      }
    }
    if (!baseInvaded) return !0;
  }
  const ownStructs = v.alliedStructures();
  for (let i = 0; i < ownStructs.length; i++) {
    const st = ownStructs[i],
      guardR = (st.stats.attackRange || 8.5) + 2.5;
    if (ye(pt, st.pos) > guardR) continue;
    let underSiege = st.lastHitTime > 0 && n.time - st.lastHitTime < 4.5;
    if (!underSiege) {
      for (let k = 0; k < n.foesAll.length; k++) {
        if (ye(n.foesAll[k].pos, st.pos) <= guardR + 4.5) {
          underSiege = !0;
          break;
        }
      }
    }
    if (!underSiege) {
      let foeM = 0;
      for (let k = 0; k < n.foeMinions.length; k++) {
        if (ye(n.foeMinions[k].pos, st.pos) <= guardR + 2.5 && ++foeM >= 2) {
          underSiege = !0;
          break;
        }
      }
    }
    if (!underSiege) return !0;
  }
  return !1;
}

function monkeyPickPeelSpot(n, focusFoe, reservePassive = !1) {
  const e = n.me,
    v = n.v,
    maxPeels = Se.monkey.passive.values.maxPeels || 8,
    ownPeels = monkeyOwnPeels(n),
    totalPeels = monkeyPeelCount(n) + (reservePassive && e5(e, "monkey_eating") ? 1 : 0);
  // 满上限（含飞行中）绝不继续浪费一技能
  if (totalPeels >= maxPeels) return null;
  let best = null,
    bestScore = -1e9;
  const cand = { x: 0, y: 0 },
    trySpot = (px, py, base) => {
      let dx = px - e.pos.x,
        dy = py - e.pos.y,
        dist = Math.hypot(dx, dy);
      if (dist < 1.2) return;
      if (dist > 8.3) {
        px = e.pos.x + (dx / dist) * 8.3;
        py = e.pos.y + (dy / dist) * 8.3;
        dist = 8.3;
      }
      cand.x = px;
      cand.y = py;
      if (!v.walkable(cand, 0.55) || n.nearFoeFountain(cand, 1.5)) return;
      if (monkeyOwnTowerBlocked(n, cand)) return;
      for (let i = 0; i < ownPeels.length; i++) {
        const p = ownPeels[i];
        if (Math.hypot(px - p.pos.x, py - p.pos.y) < 2.6) return;
      }
      for (let i = 0; i < n.foeMinions.length; i++) {
        const m = n.foeMinions[i];
        if (Math.hypot(px - m.pos.x, py - m.pos.y) < 2.1) return;
      }
      let score = base;
      // 核心：避开敌方英雄 1 秒内能轻松踩烂的范围，丢在对方目前踩不到、之后走位/撤退/追击大概率踩中的点
      for (let i = 0; i < n.foesAll.length; i++) {
        const f = n.foesAll[i],
          fd = Math.hypot(px - f.pos.x, py - f.pos.y);
        if (uh(f) >= 0.85 && fd <= 1.2) {
          score += 5;
          continue;
        }
        if (fd < 4.2) return;
        if (fd >= 4.6 && fd <= 8.6) score += 3.2 - Math.abs(fd - 5.8) * 0.35;
      }
      if (v.bushAt(cand) >= 0) score += 2.6;
      if (v.enemyStructureCovering(cand, 0.4)) score -= 2.5;
      if (score > bestScore) {
        bestScore = score;
        best = { x: px, y: py };
      }
    };
  const foe = focusFoe || n.nearFoe,
    foeDist = foe ? ye(e.pos, foe.pos) : 1 / 0;
  if (foe && foeDist <= 16) {
    // 1. 敌人身后撤退必经路
    const rx = n.foeHome.x - foe.pos.x,
      ry = n.foeHome.y - foe.pos.y,
      rl = Math.hypot(rx, ry) || 1;
    trySpot(foe.pos.x + (rx / rl) * 5.2, foe.pos.y + (ry / rl) * 5.2, 4.8);
    trySpot(foe.pos.x + (rx / rl) * 6.5, foe.pos.y + (ry / rl) * 6.5, 4.2);
    // 2. 敌人追击/压进路线与左右走位侧翼（隔开 4.8~5.6 米让对方没法直接踩烂）
    const ax = e.pos.x - foe.pos.x,
      ay = e.pos.y - foe.pos.y,
      al = Math.hypot(ax, ay) || 1;
    trySpot(foe.pos.x + (ax / al) * 5.0, foe.pos.y + (ay / al) * 5.0, 4.4);
    trySpot(foe.pos.x + (ax / al) * 5.2 - (ay / al) * 2.3, foe.pos.y + (ay / al) * 5.2 + (ax / al) * 2.3, 4.0);
    trySpot(foe.pos.x + (ax / al) * 5.2 + (ay / al) * 2.3, foe.pos.y + (ay / al) * 5.2 - (ax / al) * 2.3, 4.0);
    trySpot(foe.pos.x - (ay / al) * 5.0, foe.pos.y + (ax / al) * 5.0, 3.8);
    trySpot(foe.pos.x + (ay / al) * 5.0, foe.pos.y - (ax / al) * 5.0, 3.8);
    // 3. 只有真被压血/追击时才往自己撤退路径预埋，平时不往自家塔方向瞎扔
    if (foeDist <= 10.5 && (n.hpR < 0.72 || n.adv < 1.05 || n.heroesOnMe > 0)) {
      const hx = n.home.x - e.pos.x,
        hy = n.home.y - e.pos.y,
        hl = Math.hypot(hx, hy) || 1;
      trySpot(e.pos.x + (hx / hl) * 2.8, e.pos.y + (hy / hl) * 2.8, 3.3);
    }
  }
  // 4. 附近草丛与河道/野区路口埋雷烦人
  const bushes = v.map.bushes;
  for (let i = 0; i < bushes.length; i++) {
    const poly = bushes[i];
    let sx = 0,
      sy = 0;
    for (let k = 0; k < poly.length; k++) ((sx += poly[k].x), (sy += poly[k].y));
    const cx = sx / poly.length,
      cy = sy / poly.length;
    if (Math.hypot(cx - e.pos.x, cy - e.pos.y) <= 8.3) trySpot(cx, cy, 4.8);
  }
  const river = v.map.river;
  if (river) {
    for (let i = 0; i < river.length; i++) {
      const rp = river[i];
      if (Math.hypot(rp.x - e.pos.x, rp.y - e.pos.y) <= 8.3) trySpot(rp.x, rp.y, 4.0);
    }
  }
  // 5. 只有走出自家外塔到线上交战区（或附近有敌人）时，才往前方兵线边缘埋雷，绝不往身后自家塔下扔
  const lane = n.anchorLane || (e.lane === "mid" || e.lane === "bot" ? e.lane : "mid"),
    laneInfo = n.brain.lanes[lane],
    ownP = laneInfo ? laneInfo.ownP : 0,
    curP = n.geo.prog(n.team, lane, e.pos.x, e.pos.y);
  if (curP >= ownP + 5 || foeDist <= 15) {
    const pt = { x: 0, y: 0 };
    for (const dp of [4.2, 6.4]) {
      for (const lat of [-2.4, 2.4]) {
        n.geo.point(n.team, lane, Math.max(4, Math.min(n.geo.total(lane) - 4, curP + dp)), pt, lat);
        if (Math.hypot(pt.x - e.pos.x, pt.y - e.pos.y) <= 8.3) trySpot(pt.x, pt.y, 3.4);
      }
    }
  }
  return bestScore >= 2.8 ? best : null;
}

function monkeyAnnoyPeel(n) {
  if (n.heroId !== "monkey" || n.v.busy() || !wn(n, "s1")) return !1;
  const e = n.me,
    maxPeels = Se.monkey.passive.values.maxPeels || 8;
  if (monkeyPeelCount(n) + (e5(e, "monkey_eating") ? 1 : 0) >= maxPeels) return !1;
  if (ye(e.pos, n.home) < 24 && (!n.nearFoe || n.nearFoeD > 16)) return !1;
  const ammoB = e.buffs.find((b) => b.id === "monkey_peel_ammo"),
    ammo = ammoB ? ammoB.stacks : 0,
    gap = ammo >= 3 ? 1.5 : 3.0;
  if (n.time - (n._mkPeelAt ?? -99) < gap) return !1;
  if (x0(n, "s1") < (ammo >= 3 ? 0.22 : 0.34)) return !1;
  const spot = monkeyPickPeelSpot(n, n.nearFoe, !0);
  if (!spot) return !1;
  n._mkPeelAt = n.time;
  Bc(n, "s1", spot);
  return !0;
}

function monkeyStackUlt(n) {
  const e = n.me;
  if (n.heroId !== "monkey" || n.v.busy() || e5(e, "monkey_ult") || !wn(n, "ult")) return !1;
  if (n.hpR < 0.35 || n.time < n.fleeUntil || x0(n, "ult") < 0.14) return !1;
  if (n.foeStruct && n.inFoeRange && n.tankers === 0) return !1;
  const stacks = e.h?.monkeyStickStacks || 0;
  // 前中期努力叠层，不强求杀人：我方小兵和敌方小兵汇集时果断开大补兵刷层
  if (n.time > 720 && stacks >= 30 && n.foesNear > 0) return !1;
  if (n.myMinions.length < 1 && !(n.myStruct && ye(e.pos, n.myStruct.pos) < 11)) return !1;
  const ultR = e.stats.attackRange * 1.4 + 2.8;
  let nearCount = 0,
    lowCount = 0;
  for (let i = 0; i < n.foeMinions.length; i++) {
    const m = n.foeMinions[i];
    if (ye(e.pos, m.pos) - m.radius <= ultR) {
      nearCount++;
      if (m.hp <= e.stats.ad * 3.4) lowCount++;
    }
  }
  if (nearCount >= 3 || (nearCount >= 2 && lowCount >= 1)) {
    n.act.castSelf("ult");
    n.label = "monkey:ult-stack";
    return !0;
  }
  return !1;
}

function monkeyUltFarmTarget(n) {
  const e = n.me,
    r = e.stats.attackRange,
    ultLv = Math.max(1, e.skills.ult.level),
    ub = e.buffs.find((b) => b.id === "monkey_ult"),
    crit = ub && ub.stacks > 0 ? e.stats.critDamage : 1,
    estDmg = e.stats.ad * crit + Nh(Se.monkey.skills.ult, "bonusDmg", ultLv) + e.stats.ad * 0.45;
  let best = null,
    bestScore = -1e9;
  for (let i = 0; i < n.foeMinions.length; i++) {
    const m = n.foeMinions[i],
      d = ye(e.pos, m.pos) - m.radius;
    if (d > r + 4.5) continue;
    if (n.v.enemyStructureCovering(m.pos, 0.3) && n.tankers === 0) continue;
    // 优先打一棍能直接收掉拿层的小兵，其次顺着直线多穿几个小兵
    let sc = m.hp <= estDmg * 0.95 ? 50 - m.hp * 0.02 : 20 - (m.hp / Math.max(1, m.stats.maxHp)) * 18;
    sc -= Math.max(0, d - r) * 3;
    if (sc > bestScore) {
      bestScore = sc;
      best = m;
    }
  }
  return best;
}

const XS_NO_DASH = new Set(["xingli", "paperboy", "maggot", "monkey"]);

// 小肥石：前中期安全时走到小兵堆里开练功边健身边清兵刷额外层数
function stoneLaneWorkout(n, mode) {
  const s = n.me;
  if (n.heroId !== "stone" || n.v.busy() || n.foeMinions.length === 0) return !1;
  const training = e5(s, "stone_train"),
    hasCorpse = e5(s, "stone_corpse");
  if (training) {
    if (wn(n, "s1") && (n.hpR < 0.38 || (n.heroesOnMe >= 2 && n.adv < 0.85) || n.towerOnMe)) {
      n.act.castSelf("s1");
      return !0;
    }
    if (hasCorpse && wn(n, "s2") && Dd(n.foeMinions, 2.6, Bt) >= 1 && ye(s.pos, Bt) <= 7.5) {
      n.act.castAt("s2", Bt);
      n.label = "stone:workout-throw";
      return !0;
    }
    let bestM = null,
      bestHp = 1 / 0,
      grabM = null;
    for (let i = 0; i < n.foeMinions.length; i++) {
      const m = n.foeMinions[i],
        d = ye(s.pos, m.pos) - m.radius;
      if (d <= s.stats.attackRange + 0.35 && m.hp < bestHp) {
        bestHp = m.hp;
        bestM = m;
      }
      if (!grabM && d <= 5.4 && m.hp > s.stats.ad * 0.9) grabM = m;
    }
    if (!hasCorpse && grabM && wn(n, "s2") && x0(n, "s2") >= 0.16 && n.foeMinions.length >= 2) {
      n.act.castTarget("s2", grabM.id);
      n.label = "stone:workout-grab";
      return !0;
    }
    if (bestM) {
      n.act.attack(bestM.id);
      n.label = "stone:workout";
      return !0;
    }
    return !1;
  }
  if (!wn(n, "s1") || n.hpR < 0.56 || x0(n, "s1") < 0.22 || n.towerOnMe || (n.foeStruct && n.inFoeRange)) return !1;
  const safe = n.foesNear === 0 || (n.foesNear === 1 && n.adv >= 0.92 && n.nearFoeD >= 5.2);
  if (!safe) return !1;
  let inMelee = 0;
  for (let i = 0; i < n.foeMinions.length; i++) {
    const m = n.foeMinions[i];
    if (ye(s.pos, m.pos) - m.radius <= s.stats.attackRange + 0.45) inMelee++;
  }
  if (inMelee >= 2 || (inMelee >= 1 && n.foeMinions.length >= 2 && wn(n, "s2"))) {
    n.act.castSelf("s1");
    n.label = `${mode}:workout`;
    return !0;
  }
  // 兵堆就在附近且不在敌方塔下：主动走进去开练功清兵
  const clump = Dd(n.foeMinions, 2.5, Bt);
  if (
    clump >= 2 &&
    ye(s.pos, Bt) <= 6.8 &&
    ye(s.pos, Bt) > 1.3 &&
    n.v.enemyStructureCovering(Bt, 0.8) === null &&
    (!n.nearFoe || ye(Bt, n.nearFoe.pos) >= 5.2)
  ) {
    n.act.moveTo(Bt.x, Bt.y);
    n.label = `${mode}:walk-workout`;
    return !0;
  }
  return !1;
}

// 雪松大招选人（支持隔墙抓取）：前期抓无位移/残血拉回塔下，中后期团战优先抓一切非坦克 C 位
function xuesongPickUltTarget(n, inFight) {
  const e = n.me,
    early = n.brain.phase === "lane" || n.time < 420,
    nearTower = n.myStruct && ye(e.pos, n.myStruct.pos) <= 15.5,
    hasTeam = n.friendsNear >= 1;
  if (!nearTower && !hasTeam && !inFight) return null;
  let best = null,
    bestScore = -1e9;
  for (let i = 0; i < n.foesAll.length; i++) {
    const f = n.foesAll[i],
      d = ye(e.pos, f.pos);
    if (d > 6.5 || !f.alive || f.rt?.untargetable) continue;
    const role = Se[f.heroId].role,
      hpR = f.hp / f.stats.maxHp,
      noDash = XS_NO_DASH.has(f.heroId);
    let sc = 0;
    if (early && nearTower && !hasTeam) {
      // 前期在自家塔附近，专挑无位移或残血目标拉回塔下堵起来打
      if (!noDash && hpR > 0.68) continue;
      sc = (noDash ? 4.5 : 0) + (1 - hpR) * 5 + (role !== "tank" ? 2.2 : -2.5);
    } else {
      // 中后期团战 / 有队友配合：只要不是坦克就往死里抓，最优先远程 C 位
      if (role === "tank") {
        if (hpR > 0.35 || n.foesAll.some((o) => o.alive && Se[o.heroId].role !== "tank" && ye(e.pos, o.pos) <= 7.5)) continue;
        sc = 1.2 + (1 - hpR) * 3;
      } else {
        sc =
          (role === "marksman" || role === "mage" ? 7.5 : role === "assassin" ? 6.2 : 4.5) +
          (noDash ? 1.8 : 0) +
          (1 - hpR) * 2.5;
      }
    }
    // 隔墙抓人往往是必杀偷袭，额外加分
    if (!n.v.lineClear(e.pos, f.pos)) sc += 1.6;
    if (sc > bestScore) {
      bestScore = sc;
      best = f;
    }
  }
  return bestScore >= 3.2 ? best : null;
}

// 雪松大招举起敌人后的完整连招：喊队友集火 -> 2 技能好了直接撑篙跳回塔下/人堆 -> 憋到控制最大再丢回去
function xuesongHandleScoop(n) {
  const e = n.me,
    v = n.v,
    scoopBuf = e.buffs.find((b) => b.id === "xuesong_scoop");
  if (!scoopBuf) return !1;
  const scoopLeft = scoopBuf.timeLeft,
    onPole = e5(e, "xuesong_pole"),
    tid = e.h?._xsScoopId ?? -1;
  // 计算最阴间的丢人目的地：有队友优先丢回自家输出人堆，前期塔下优先丢回自家防御塔内+沙坑后
  let dropX = n.home.x,
    dropY = n.home.y,
    hasDrop = !1;
  let ax = 0,
    ay = 0,
    aw = 0;
  for (let i = 0; i < n.friends.length; i++) {
    const f = n.friends[i],
      fd = ye(e.pos, f.pos);
    if (fd > 17) continue;
    const role = Se[f.heroId].role,
      w = role === "marksman" || role === "mage" ? 2.2 : 1.4;
    ((ax += f.pos.x * w), (ay += f.pos.y * w), (aw += w));
  }
  const nearOwnTower = n.myStruct && ye(e.pos, n.myStruct.pos) <= 17.5 ? n.myStruct : null;
  if (aw > 0 && (!nearOwnTower || n.friendsNear >= 2 || n.time >= 360)) {
    dropX = ax / aw;
    dropY = ay / aw;
    hasDrop = !0;
  } else if (nearOwnTower) {
    const hx = n.home.x - nearOwnTower.pos.x,
      hy = n.home.y - nearOwnTower.pos.y,
      hl = Math.hypot(hx, hy) || 1;
    // 丢到自家塔下偏内侧，刚好让塔一直打且被提前挖好的洞堵住逃路
    dropX = nearOwnTower.pos.x + (hx / hl) * 2.2;
    dropY = nearOwnTower.pos.y + (hy / hl) * 2.2;
    hasDrop = !0;
  }
  if (!hasDrop) {
    const hx = n.home.x - e.pos.x,
      hy = n.home.y - e.pos.y,
      hl = Math.hypot(hx, hy) || 1;
    dropX = e.pos.x + (hx / hl) * 9;
    dropY = e.pos.y + (hy / hl) * 9;
  }
  tid >= 0 && n.brain.callXuesongCatch(tid, dropX, dropY, n.time);
  const dx = dropX - e.pos.x,
    dy = dropY - e.pos.y,
    distDrop = Math.hypot(dx, dy) || 1;
  // 正在撑篙：立刻朝塔下/人堆二段跳满 7.3 米（人会跟着铁锹一起飞回去！）
  if (onPole) {
    if (wn(n, "s2", !0)) {
      const jumpD = Math.min(7.3, distDrop),
        raw = { x: e.pos.x + (dx / distDrop) * jumpD, y: e.pos.y + (dy / distDrop) * jumpD },
        land = v.nearestWalkable(raw);
      n.act.castAt("s2", land);
      n.label = "xuesong:scoop-jump";
      return !0;
    }
    return !0;
  }
  // 2 技能好了且离目标点还远、压制时间还充足：先撑篙准备把敌人带跳回去
  if (wn(n, "s2", !0) && scoopLeft >= 0.78 && distDrop >= 4.2) {
    n.act.castSelf("s2");
    n.label = "xuesong:scoop-pole";
    return !0;
  }
  // 等到压制快结束（最大控制时间）或自己快死前，再把敌人朝目标点狠狠丢出去
  if (wn(n, "ult", !0) && (scoopLeft <= 0.42 || n.hpR <= 0.22)) {
    const throwD = Math.min(6.8, distDrop),
      raw = { x: e.pos.x + (dx / distDrop) * throwD, y: e.pos.y + (dy / distDrop) * throwD },
      land = v.nearestWalkable(raw);
    n.act.castAt("ult", land);
    n.label = "xuesong:scoop-throw";
    return !0;
  }
  // 压制期间一直往自家塔下/人堆猛拖
  n.act.moveTo(dropX, dropY, !0);
  n.label = "xuesong:scoop-drag";
  return !0;
}

// 雪松挖洞规划：前期塔前提前挖两个洞封路方便拉人关门打狗；大劣势没大招时挖洞堵敌方兵线防推塔；进攻绝不乱挖堵队友
function xuesongPlanPit(n, lane, mode) {
  const e = n.me,
    v = n.v;
  if (n.heroId !== "xuesong" || v.busy() || !wn(n, "s1") || e5(e, "xuesong_sand") || e5(e, "xuesong_scoop") || e5(e, "xuesong_pole"))
    return !1;
  if (x0(n, "s1") < 0.32 || n.dmgRate > 0) return !1;
  const laneInfo = n.brain.lanes[lane];
  if (!laneInfo || !laneInfo.ownStruct || laneInfo.ownStruct.kind !== "tower") return !1;
  const earlyPrep = n.time < 460 && mode === "lane" && n.hpR > 0.65 && (!n.nearFoe || n.nearFoeD >= 7.5),
    underDogBlock =
      !wn(n, "ult") &&
      (mode === "defend" || laneInfo.threatMinions >= 2 || n.adv < 0.76) &&
      n.hpR > 0.45 &&
      (!n.nearFoe || n.nearFoeD >= 6.4);
  if (!earlyPrep && !underDogBlock) return !1;
  // 正在压进/推塔时绝不挖洞堵自己人
  if (mode === "push" || (n.adv >= 1.25 && n.friendsNear >= 1)) return !1;
  const ownP = laneInfo.ownP,
    curP = n.geo.prog(n.team, lane, e.pos.x, e.pos.y);
  if (Math.abs(curP - ownP) > 16) return !1;
  const pitP = Math.min(n.geo.total(lane) - 6, ownP + (underDogBlock ? 6.4 : 4.8)),
    areas = v.sim ? v.sim.areas : [],
    ownPits = [];
  for (let i = 0; i < areas.length; i++) {
    const a = areas[i];
    if (!a.dead && a.ownerId === e.id && a.visual === "xuesong_pit") ownPits.push(a);
  }
  // 规划两个并排洞口堵住路，冷却长不乱挖第三个
  const slots = [-2.1, 2.1];
  let targetSpot = null;
  for (let i = 0; i < slots.length; i++) {
    const pt = { x: 0, y: 0 };
    n.geo.point(n.team, lane, pitP, pt, slots[i]);
    if (!v.walkable(pt, 0.6)) continue;
    let covered = !1;
    for (let k = 0; k < ownPits.length; k++) {
      if (ye(pt, ownPits[k].pos) < 3.4) {
        covered = !0;
        break;
      }
    }
    if (covered) continue;
    // 别把冲锋中的队友堵在洞口
    let blocksAlly = !1;
    for (let k = 0; k < n.friends.length; k++) {
      if (ye(pt, n.friends[k].pos) < 3.2) {
        blocksAlly = !0;
        break;
      }
    }
    if (blocksAlly) continue;
    targetSpot = pt;
    break;
  }
  if (!targetSpot) return !1;
  // 站在洞口偏自家一侧 3.05 米处面朝洞口开挖（沙坑正好生成在面朝方向 3.07 米处）
  const toHomeX = laneInfo.ownStruct.pos.x - targetSpot.x,
    toHomeY = laneInfo.ownStruct.pos.y - targetSpot.y,
    toHomeL = Math.hypot(toHomeX, toHomeY) || 1,
    standPt = v.nearestWalkable({
      x: targetSpot.x + (toHomeX / toHomeL) * 3.05,
      y: targetSpot.y + (toHomeY / toHomeL) * 3.05,
    });
  const dSpot = ye(e.pos, targetSpot),
    ang = Math.atan2(targetSpot.y - e.pos.y, targetSpot.x - e.pos.x),
    adiff = Math.abs(Math.atan2(Math.sin(ang - e.facing), Math.cos(ang - e.facing)));
  if (dSpot >= 2.35 && dSpot <= 3.75 && adiff <= 0.35) {
    n.act.castSelf("s1");
    n.label = underDogBlock ? "xuesong:block-pit" : "xuesong:prep-pit";
    return !0;
  }
  if (dSpot >= 2.35 && dSpot <= 3.75) {
    // 站位到了但朝向不对：朝洞口轻挪一步把脸转正
    n.act.moveDir(Math.cos(ang), Math.sin(ang));
    n.label = "xuesong:aim-pit";
    return !0;
  }
  if (ye(e.pos, standPt) <= 12) {
    n.act.moveTo(standPt.x, standPt.y);
    n.label = "xuesong:go-pit";
    return !0;
  }
  return !1;
}

function slimeHandlePuddle(n) {
  const e = n.me,
    v = n.v;
  if (!e5(e, "slime_puddle")) return !1;
  const abs = e.h?._slAbsorbed;
  let hasHeroAbsorbed = !1;
  if (abs && abs.length > 0) {
    for (let i = 0; i < abs.length; i++) {
      const u = v.sim?.byId?.get(abs[i].id);
      if (u && u.alive && u.kind === "hero") {
        hasHeroAbsorbed = !0;
        break;
      }
    }
  }
  // 已经反吸到敌方英雄：立刻往自家塔下或队友堆里拖
  if (hasHeroAbsorbed) {
    let dest = null;
    const lane = n.brain?.lanes?.[n.lane];
    if (lane && lane.ownStruct && ye(e.pos, lane.ownStruct.pos) <= 18) {
      dest = lane.ownStruct.pos;
    } else if (n.friends.length > 0) {
      let best = n.friends[0],
        bd = ye(e.pos, best.pos);
      for (let i = 1; i < n.friends.length; i++) {
        const d = ye(e.pos, n.friends[i].pos);
        if (d < bd) ((bd = d), (best = n.friends[i]));
      }
      dest = best.pos;
    } else {
      dest = n.home;
    }
    if (dest) {
      n.act.moveTo(dest.x, dest.y, !0);
      n.label = "slime:drag-home";
      return !0;
    }
  }
  // 还没反吸：大滩覆盖到敌方英雄立刻按 1 反吸，否则主动往最近敌方英雄脚下挪
  if (wn(n, "s1")) {
    let covered = 0;
    for (const f of n.foes) {
      if (ye(e.pos, f.pos) <= 2.95 + f.radius) covered++;
    }
    if (covered > 0) {
      n.act.castSelf("s1");
      n.label = "slime:absorb";
      return !0;
    }
  }
  if (n.foes.length > 0 && n.hpR >= 0.28) {
    let near = n.foes[0],
      nd = ye(e.pos, near.pos);
    for (let i = 1; i < n.foes.length; i++) {
      const d = ye(e.pos, n.foes[i].pos);
      if (d < nd) ((nd = d), (near = n.foes[i]));
    }
    if (nd <= 7.5) {
      n.act.moveTo(near.pos.x, near.pos.y, !0);
      n.label = "slime:puddle-chase";
      return !0;
    }
  }
  return !1;
}

export { VG, zk, WG, jG, se, Kp, T1, e6, qG, XG, YG, n6, KG, iy, Fk, rf, ye, JG, nV, sV, Uk, a6, E1, dV, hV, uV, vV, Ms, t5, bV, wV, MV, kV, SV, e5, f6, d6, monkeyAnnoyPeel, xuesongHandleScoop, xuesongPickUltTarget, slimeHandlePuddle };
