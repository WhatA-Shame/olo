// 42-ai-2.js — ai｜72 个顶层语句｜68KB
// 对应 game.pretty.js 第 77942–80420 行
// 关键内容：
//   TV                    init
//   jk                    self
//   em                    recall
//   x6                    hero
//   jV                    hero
//   qV                    airborne
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { K6, Qd, Y6, Z6, eo, rn, ui, va } from './01-audio.js';
import { Se, ea, f5, lm } from './02-data.js';
import { p8, yo } from './21-core-4.js';
import { BG, S1, t6 } from './40-ui-8.js';
import { E1, Fk, JG, KG, Kp, MV, Ms, SV, T1, Uk, VG, XG, YG, a6, bV, d6, dV, e5, e6, f6, hV, jG, kV, n6, nV, qG, sV, se, t5, uV, vV, wV, ye, zk } from './41-ai.js';

class TV {
  interval;
  prof;
  style;
  brain;
  geo;
  act = new VG();
  heroId;
  team;
  ranged;
  home;
  foeHome;
  v;
  me;
  time = 0;
  label = "init";
  foes = [];
  foesAll = [];
  friends = [];
  foeMinions = [];
  myMinions = [];
  nearFoe = null;
  nearFoeD = 1 / 0;
  friendsNear = 0;
  foeStruct = null;
  foeStructD = 1 / 0;
  myStruct = null;
  myStructD = 1 / 0;
  inFoeRange = !1;
  towerOnMe = !1;
  tankers = 0;
  tankHp = 0;
  aggroMinions = 0;
  minionsOnMe = 0;
  heroesOnMe = 0;
  hpR = 1;
  manaR = 1;
  dmgRate = 0;
  adv = 9;
  poker = null;
  pokedUntil = 0;
  danger = 0;
  respect = !1;
  respectUntil = 0;
  fightAdv = 1;
  evalAllyOut = 1;
  fleeUntil = 0;
  fightUntil = 0;
  fightTargetId = -1;
  diving = !1;
  forceFightId = -1;
  tradeStart = -99;
  tradeEnd = -99;
  trading = !1;
  baseStay = !1;
  idleUntil = 0;
  lastThink = 0;
  lastHp = 0;
  moodUntil = [0, 0, 0, 0];
  moodOn = [!1, !1, !1, !1];
  seenSince = new Map();
  seenLast = new Map();
  dodgeRoll = new Map();
  safeAt = -99;
  safe = { x: 0, y: 0 };
  anchorLane = null;
  anchorP = 0;
  side;
  tripX = 1e9;
  tripY = 1e9;
  route = null;
  routeIdx = 0;
  routeAt = -99;
  shakenUntil = 0;
  assistId = -1;
  assistUntil = 0;
  assistBanUntil = 0;
  campId = -1;
  gankId = -1;
  gankSince = 0;
  gankSeenAt = 0;
  nextGankAt = 50;
  nextGankEval = 0;
  gankedAt = new Map();
  gankLaneAt = { top: -999, mid: -999, bot: -999 };
  constructor(t) {
    ((this.prof = zk[t.difficulty]),
      (this.interval = this.prof.think),
      (this.heroId = t.hero.heroId),
      (this.style = jG[this.heroId]),
      (this.team = t.team),
      (this.brain = vV(t)),
      (this.geo = this.brain.geo),
      (this.ranged = Se[this.heroId].attackType === "ranged"),
      (this.home = t.map.bases[t.team].fountain),
      (this.foeHome = t.map.bases[t.enemyTeam].fountain),
      (this.lastHp = t.hero.hp),
      (this.side = t.rng.range(-1, 1) * 1.8),
      (this.nextGankAt = 55 + t.rng.range(0, 25)));
  }
  think(t) {
    this.v = t;
    const e = t.hero;
    if (((this.me = e), (this.time = t.time), this.act.begin(t), uV(t), !t.state.over)) {
      if (!e.alive) {
        this.onDead();
        return;
      }
      if ((this.brain.update(t), this.sense(), (this.lastThink = this.time), !this.idle())) {
        if (e5(e, "recall") && !this.threatened()) {
          this.label = "recall";
          return;
        }
        this.dodge() ||
          this.survive() ||
          (this.finish(), !this.sustain() && (this.combat() || this.assist() || this.doTask()));
      }
    }
  }
  onDead() {
    ((this.label = "dead"),
      (this.fleeUntil = 0),
      (this.fightUntil = 0),
      (this.fightTargetId = -1),
      (this.forceFightId = -1),
      (this.poker = null),
      (this.diving = !1),
      (this.baseStay = !1),
      (this.gankId = -1),
      (this.campId = -1),
      (this.dmgRate = 0),
      (this.lastHp = 0),
      this.act.forget());
  }
  travel(t, e, s = 5, i = !1) {
    const a = this.me,
      o = this.time,
      r = Math.hypot(t - this.tripX, e - this.tripY),
      l = Math.hypot(a.pos.x - this.tripX, a.pos.y - this.tripY) < 3;
    (r > s || l || this.route === null || o - this.routeAt > 4) &&
      ((this.tripX = t),
      (this.tripY = e),
      (this.routeAt = o),
      (this.routeIdx = 0),
      (Ms.x = t),
      (Ms.y = e),
      (this.route = this.diving ? null : this.v.safePath(Ms)));
    const c = this.route;
    if (!c) {
      this.act.moveTo(this.tripX, this.tripY, i);
      return;
    }
    for (
      ;
      this.routeIdx < c.length - 1 &&
      Math.hypot(c[this.routeIdx].x - a.pos.x, c[this.routeIdx].y - a.pos.y) < 1.8;
    )
      this.routeIdx++;
    const f = c[this.routeIdx];
    this.act.moveTo(f.x, f.y, i);
  }
  doTask() {
    const t = this.brain.taskOf(this.heroId);
    switch (t.kind) {
      case "jungle":
        dV(this);
        break;
      case "epic":
        hV(this, t.campId);
        break;
      case "lane":
        E1(this, t.lane, "lane");
        break;
      case "push":
        E1(this, t.lane, "push");
        break;
      case "defend":
        E1(this, t.lane, "defend");
        break;
    }
  }
  sense() {
    const t = this.v,
      e = this.me,
      s = this.time,
      i = se.senseRadius;
    ((this.foes.length = 0),
      (this.foesAll.length = 0),
      (this.friends.length = 0),
      (this.foeMinions.length = 0),
      (this.myMinions.length = 0),
      (this.nearFoe = null),
      (this.nearFoeD = 1 / 0),
      (this.heroesOnMe = 0),
      (this.minionsOnMe = 0),
      (this.aggroMinions = 0),
      (this.friendsNear = 0),
      (s >= this.pokedUntil || (this.poker && (!this.poker.alive || !t.canSee(this.poker)))) &&
        (this.poker = null));
    for (const f of t.enemies()) {
      const d = ye(e.pos, f.pos);
      if (f.kind === "hero") {
        const h = this.seenLast.get(f.id) ?? -99;
        if (
          (s - h > 0.7 && this.seenSince.set(f.id, s),
          this.seenLast.set(f.id, s),
          s - (this.seenSince.get(f.id) ?? s) < this.prof.reaction || (this.foesAll.push(f), d > i))
        )
          continue;
        (this.foes.push(f),
          d < this.nearFoeD && ((this.nearFoeD = d), (this.nearFoe = f)),
          f.targetId === e.id && (this.heroesOnMe++, (this.poker = f), (this.pokedUntil = s + 1.5)));
      } else if (f.kind === "minion") {
        if (d > 13) continue;
        (this.foeMinions.push(f),
          d <= se.minionAggro && this.aggroMinions++,
          f.targetId === e.id && this.minionsOnMe++);
      }
    }
    for (const f of t.allies())
      if (f !== e)
        if (f.kind === "hero") {
          const d = ye(e.pos, f.pos);
          (d <= i && this.friends.push(f), d <= 10 && this.friendsNear++);
        } else f.kind === "minion" && ye(e.pos, f.pos) <= 14 && this.myMinions.push(f);
    ((this.foeStruct = null), (this.foeStructD = 22));
    for (const f of t.enemyStructures()) {
      const d = ye(e.pos, f.pos);
      d < this.foeStructD && ((this.foeStructD = d), (this.foeStruct = f));
    }
    ((this.myStruct = null), (this.myStructD = 22));
    for (const f of t.alliedStructures()) {
      const d = ye(e.pos, f.pos);
      d < this.myStructD && ((this.myStructD = d), (this.myStruct = f));
    }
    ((this.inFoeRange = !1), (this.towerOnMe = !1), (this.tankers = 0), (this.tankHp = 0));
    const a = this.foeStruct;
    if (a) {
      const f = a.stats.attackRange;
      ((this.inFoeRange = this.foeStructD <= f + 0.4), (this.towerOnMe = a.targetId === e.id));
      for (const d of this.myMinions)
        ye(d.pos, a.pos) <= f + d.radius && (this.tankers++, (this.tankHp += d.hp));
    }
    ((this.hpR = e.hp / e.stats.maxHp), (this.manaR = e.stats.maxMana > 0 ? e.mana / e.stats.maxMana : 1));
    const o = Math.max(0.05, s - this.lastThink),
      r = Math.max(0, this.lastHp - e.hp);
    ((this.dmgRate = this.dmgRate * 0.55 + (r / o) * 0.45),
      this.dmgRate < 1 && (this.dmgRate = 0),
      (this.lastHp = e.hp),
      (this.adv = this.advantageAt(e.pos.x, e.pos.y)),
      (this.fightAdv = this.adv));
    let l = 0;
    const c = this.brain;
    for (const f of this.foes)
      ye(e.pos, f.pos) > this.threatReach(f) + 1.5 || (l += YG(f, e, (d) => c.enemyReady(f, d, s)));
    ((this.danger = l / Math.max(1, e.hp + e.shield)),
      this.foes.length > 0 &&
        ((this.danger >= se.respectLethal && this.adv < 1.2) || this.adv < se.advOutgunned) &&
        (this.respectUntil = s + 1.6),
      (this.respect = s < this.respectUntil && this.foes.length > 0));
  }
  threatReach(t) {
    let e = t.stats.attackRange + t.radius + this.me.radius + 0.8;
    const s = f6[t.heroId];
    return (s && this.brain.enemyReady(t, s.slot, this.time) && (e += s.reach), e);
  }
  ghosts(t, e) {
    const s = this.prof.awareness,
      i = this.v,
      a = i.scoreboard(),
      o = Math.hypot(t - this.foeHome.x, e - this.foeHome.y) < se.baseGhostRange;
    let r = 0,
      l = 0;
    for (let c = 0; c < a.length; c++) {
      const f = a[c];
      if (f.team === this.team || !f.alive || i.canSee(f)) continue;
      if (o) {
        l++;
        continue;
      }
      const d = i.lastSeen(f.id);
      if (!d || d.time < 0) continue;
      const h = this.time - d.time;
      h > 25 || Math.hypot(d.x - t, d.y - e) - 6.5 * h > 12 || (r += h < 3 ? 0.8 : h < 10 ? 0.5 : 0.25);
    }
    return r * s + l * se.baseGhost * (0.5 + 0.5 * s);
  }
  advantageAt(t, e) {
    const s = this.v,
      i = this.me,
      a = this.time,
      o = this.brain;
    let r = 0,
      l = 0,
      c = 0,
      f = 0,
      d = 0;
    for (const x of s.alliedHeroes()) {
      const p = x === i ? 1 : qG(Math.hypot(x.pos.x - t, x.pos.y - e));
      if (p <= 0) continue;
      const g = x.skills;
      ((r += Kp(x) * p), (l += e6(x, (y) => g[y].cd <= 0.3 && x.mana >= g[y].cost) * p));
    }
    for (const x of this.foesAll) {
      const p = XG(Math.hypot(x.pos.x - t, x.pos.y - e));
      p <= 0 || ((c += Kp(x) * p), (f += e6(x, (g) => o.enemyReady(x, g, a)) * p), (d += p));
    }
    const h = this.ghosts(t, e);
    if (d <= 0 && h <= 0) return 9;
    if (h > 0) {
      const x = d > 0 ? c / d : Kp(i) / Math.max(0.3, this.hpR),
        p = d > 0 ? f / d : T1(i) * se.fightHorizon * 1.6;
      ((c += x * h), (f += p * h));
    }
    ((Ms.x = t), (Ms.y = e));
    const u = s.enemyStructureCovering(Ms, 0.5);
    u && (f += n6(u));
    for (const x of s.alliedStructures()) {
      const p = x.stats.attackRange;
      if ((x.pos.x - t) * (x.pos.x - t) + (x.pos.y - e) * (x.pos.y - e) <= p * p) {
        l += n6(x);
        break;
      }
    }
    const m = se.minionAggro * se.minionAggro;
    for (const x of this.foeMinions)
      (x.pos.x - t) * (x.pos.x - t) + (x.pos.y - e) * (x.pos.y - e) <= m &&
        (f += T1(x) * se.fightHorizon * 0.6);
    for (const x of this.myMinions)
      (x.pos.x - t) * (x.pos.x - t) + (x.pos.y - e) * (x.pos.y - e) <= m &&
        (l += T1(x) * se.fightHorizon * 0.35);
    return ((this.evalAllyOut = l), KG(r, l, c, f));
  }
  killWindow(t) {
    const e = this.v,
      s = this.me,
      i = Kp(t) / Math.max(1, this.evalAllyOut / se.fightHorizon);
    let a = 60,
      o = null;
    for (const l of e.enemyStructures()) {
      const c = ye(l.pos, t.pos) - l.stats.attackRange;
      c < a && ((a = c), (o = l.pos));
    }
    let r = Math.max(0, a) / Math.max(1, t.stats.moveSpeed) + se.killSlack + d6[this.heroId];
    for (let l = 0; l < t.buffs.length; l++) {
      const c = t.buffs[l];
      c.id === "stun" || c.id === "airborne" || c.id === "root"
        ? (r += c.timeLeft)
        : c.id === "slow" && (r += c.timeLeft * c.value * 1.5);
    }
    if (o) {
      const l = ye(o, t.pos);
      if (ye(o, s.pos) < l - 1) r += 2.5;
      else
        for (const c of this.friends)
          if (
            (ye(c.pos, t.pos) < 12 && (r += d6[c.heroId] * 0.5),
            ye(o, c.pos) < l - 1 && ye(c.pos, t.pos) < 10)
          ) {
            r += 2.5;
            break;
          }
    }
    return i <= r;
  }
  nearFoeFountain(t, e) {
    const s = this.v.map.bases[this.v.enemyTeam].fountainRadius + e,
      i = t.x - this.foeHome.x,
      a = t.y - this.foeHome.y;
    return i * i + a * a <= s * s;
  }
  threatened() {
    return this.dmgRate > 0 || (this.nearFoe && this.nearFoeD < 11) ? !0 : this.minionsOnMe > 0;
  }
  inMood(t, e) {
    return (
      this.time >= this.moodUntil[t] &&
        ((this.moodUntil[t] = this.time + SV[t]), (this.moodOn[t] = this.v.rng.chance(e))),
      this.moodOn[t]
    );
  }
  safeToHit(t) {
    if (this.nearFoeFountain(t.pos, 1.5 - this.me.stats.attackRange)) return !1;
    const e = this.foeStruct;
    return !e || t === e || this.diving || (this.tankers > 0 && this.tankHp > 500 && !this.towerOnMe)
      ? !0
      : ye(t.pos, e.pos) + this.me.stats.attackRange + t.radius > e.stats.attackRange + se.towerMargin + 0.4;
  }
  safeFromFoes(t) {
    if (!this.respect) return !0;
    const e = this.me.stats.attackRange + t.radius;
    for (const s of this.foes) if (ye(s.pos, t.pos) + e < this.threatReach(s)) return !1;
    return !0;
  }
  killable(t) {
    const e = this.me;
    return t6(e, t) + 2 * S1(e, t) >= t.hp + t.shield;
  }
  idle() {
    const t = this.prof;
    return t.idleRate <= 0
      ? !1
      : this.time < this.idleUntil
        ? this.dmgRate > 0 || (this.nearFoe && this.nearFoeD < 6)
          ? ((this.idleUntil = 0), !1)
          : ((this.label = "idle"), !0)
        : this.dmgRate > 0 || this.inFoeRange
          ? !1
          : this.v.rng.chance(t.idleRate * this.interval)
            ? ((this.idleUntil = this.time + this.v.rng.range(t.idleMin, t.idleMax)),
              this.act.halt(),
              (this.label = "idle"),
              !0)
            : !1;
  }
  canStand = (t) => this.v.walkable(t);
  willDodge(t) {
    let e = this.dodgeRoll.get(t);
    return (
      e === void 0 &&
        (this.dodgeRoll.size > 64 && this.dodgeRoll.clear(),
        (e = this.v.rng.chance(this.prof.dodge)),
        this.dodgeRoll.set(t, e)),
      e
    );
  }
  dodge() {
    const t = this.v,
      e = this.me,
      s = this.prof;
    if (t.busy()) return !1;
    let i = 0,
      a = 0,
      o = !1;
    const r = Math.max(1, e.stats.moveSpeed);
    for (const f of t.hostileAreas()) {
      const d = BG[f.visual];
      if ((d !== "incoming" && d !== "damage") || f.followUnitId >= 0 || f.age < s.reaction) continue;
      const h = e.pos.x - f.pos.x,
        u = e.pos.y - f.pos.y,
        m = Math.hypot(h, u),
        x = f.radius + e.radius + 0.35;
      if (m >= x || !this.willDodge(f.id)) continue;
      const p = f.duration - f.age,
        g = (x - m) / r;
      let y, v;
      if (m > 0.3) ((y = h / m), (v = u / m));
      else {
        const _ = ye(this.home, e.pos) || 1;
        ((y = (this.home.x - e.pos.x) / _), (v = (this.home.y - e.pos.y) / _));
      }
      if (d === "incoming" && g > p + 0.12) {
        if (s.dodge >= 0.9 && p > 0.1 && a6(this, y, v)) return ((this.label = "dodge"), !0);
        continue;
      }
      ((i += y), (a += v), (o = !0));
    }
    for (const f of t.hostileCones())
      f.age < s.reaction ||
        (JG(e.pos, e.radius, f, this.home, this.canStand, t5) &&
          this.willDodge(f.id) &&
          ((i += t5.x * 2), (a += t5.y * 2), (o = !0)));
    for (const f of t.hostileProjectiles()) {
      if (f.targetId !== -1 || f.speed <= 0 || f.traveled / f.speed < s.reaction * 0.5) continue;
      const d = e.pos.x - f.pos.x,
        h = e.pos.y - f.pos.y,
        u = d * f.dir.x + h * f.dir.y;
      if (u < 0 || u > f.maxRange - f.traveled + e.radius) continue;
      const m = d * f.dir.y - h * f.dir.x,
        x = f.radius + e.radius + 0.3;
      if (Math.abs(m) >= x || !this.willDodge(f.id) || (x - Math.abs(m)) / r > u / f.speed + 0.05) continue;
      const g = m >= 0 ? 1 : -1;
      let y = f.dir.y * g,
        v = -f.dir.x * g;
      ((Ms.x = e.pos.x + y * 1.6),
        (Ms.y = e.pos.y + v * 1.6),
        t.walkable(Ms) || ((y = -y), (v = -v)),
        (i += y * 1.5),
        (a += v * 1.5),
        (o = !0));
    }
    if (!o) return !1;
    const l = ye(this.home, e.pos) || 1;
    ((i += ((this.home.x - e.pos.x) / l) * 0.3), (a += ((this.home.y - e.pos.y) / l) * 0.3));
    const c = Math.hypot(i, a);
    return c < 0.001 ? !1 : (this.act.moveDir(i / c, a / c, !0), (this.label = "dodge"), !0);
  }
  survive() {
    const t = this.time;
    if (
      ((this.forceFightId = -1),
      t >= this.fightUntil && (this.diving = !1),
      this.nearFoeFountain(this.me.pos, 1.2))
    )
      return (this.travel(this.home.x, this.home.y, 8, !0), (this.label = "leave-fountain"), !0);
    const e = this.foeStruct,
      s =
        e !== null &&
        this.inFoeRange &&
        !this.diving &&
        (this.towerOnMe || this.tankers === 0 || this.tankHp < 450),
      i = this.nearFoe !== null && this.nearFoeD < 12,
      a = this.style.fleeHp;
    let o = t < this.fleeUntil;
    if (
      (o
        ? i &&
          (this.adv < se.advFlee * 1.2 || this.hpR < a) &&
          (this.fleeUntil = Math.max(this.fleeUntil, t + 0.6))
        : (((this.hpR < a && (i || this.inFoeRange || this.dmgRate > 0)) ||
            (i && this.adv < se.advFlee) ||
            (this.heroesOnMe > 0 && this.nearFoeD < 9 && this.adv < se.advPressed) ||
            (i && this.danger >= 1 && this.adv < 1.1 && this.prof.awareness > 0)) &&
            (o = !0),
          o && (this.fleeUntil = t + se.fleeHold)),
      o)
    ) {
      const r = this.nearFoe;
      return r &&
        this.nearFoeD <= this.engageDist(r) &&
        this.killable(r) &&
        this.adv >= 0.55 &&
        !this.v.enemyStructureCovering(r.pos, 0)
        ? ((this.forceFightId = r.id), !1)
        : (this.flee(), !0);
    }
    return s && e ? (this.leaveTower(e), !0) : !1;
  }
  leaveTower(t) {
    const e = this.me;
    let s = e.pos.x - t.pos.x,
      i = e.pos.y - t.pos.y;
    const a = Math.hypot(s, i) || 1,
      o = ye(this.home, e.pos) || 1;
    ((s = s / a + ((this.home.x - e.pos.x) / o) * 0.9), (i = i / a + ((this.home.y - e.pos.y) / o) * 0.9));
    const r = Math.hypot(s, i) || 1,
      l = t.stats.attackRange + 3 - this.foeStructD,
      c = this.v.nearestWalkable({
        x: e.pos.x + (s / r) * Math.max(3, l),
        y: e.pos.y + (i / r) * Math.max(3, l),
      });
    (this.act.moveTo(c.x, c.y, !0), (this.label = "leave-tower"));
  }
  safeSpot() {
    if (this.time - this.safeAt < 1) return this.safe;
    this.safeAt = this.time;
    const t = this.me;
    let e = 1 / 0;
    const s = (i, a, o) => {
      let r = Math.hypot(i - t.pos.x, a - t.pos.y) + o;
      const l = i - t.pos.x,
        c = a - t.pos.y,
        f = Math.hypot(l, c) || 1;
      for (const d of this.foes) {
        const h = d.pos.x - t.pos.x,
          u = d.pos.y - t.pos.y,
          m = (h * l + u * c) / f;
        m <= 0 || m >= f || (Math.abs(h * c - u * l) / f < 5 && (r += 30));
      }
      r < e && ((e = r), (this.safe.x = i), (this.safe.y = a));
    };
    s(this.home.x, this.home.y, 6);
    for (const i of this.v.alliedStructures()) {
      if (i.kind !== "tower") continue;
      const a = ye(i.pos, this.home);
      if (a > ye(t.pos, this.home) + 2) continue;
      const o = 3 / Math.max(1, a);
      s(i.pos.x + (this.home.x - i.pos.x) * o, i.pos.y + (this.home.y - i.pos.y) * o, 0);
    }
    return this.safe;
  }
  flee() {
    const t = this.v,
      e = this.me;
    ((this.label = "flee"), (this.gankId = -1), (this.shakenUntil = this.time + se.shakenTime));
    const s = this.safeSpot();
    let i = s.x - e.pos.x,
      a = s.y - e.pos.y;
    Math.hypot(i, a) < 4 &&
      ((i = this.home.x - e.pos.x),
      (a = this.home.y - e.pos.y),
      (this.safe.x = this.home.x),
      (this.safe.y = this.home.y));
    const r = Math.hypot(i, a) || 1;
    ((i /= r), (a /= r));
    const l = this.nearFoe !== null && this.nearFoeD < 8.5,
      c = this.prof.escapeSense;
    if (
      l &&
      !t.busy() &&
      (this.hpR < 0.5 * c ||
        this.adv < 0.5 ||
        (this.heroesOnMe > 0 && this.nearFoeD < 4.5 && this.hpR < 0.75)) &&
      a6(this, i, a)
    )
      return;
    const f = this.hpR < 0.2 * c,
      d = this.hpR < 0.65 * c && this.adv < 0.5 && this.nearFoeD < 4.5;
    if ((f || d) && this.nearFoe && this.nearFoeD < 6.5 && t.skillReady("flash") && !t.busy())
      for (const h of [0, 0.6, -0.6]) {
        const u = Math.atan2(a, i) + h;
        if (
          ((Ms.x = e.pos.x + Math.cos(u) * 5),
          (Ms.y = e.pos.y + Math.sin(u) * 5),
          !(!t.walkable(Ms) || t.enemyStructureCovering(Ms, 0)))
        ) {
          (this.act.castDir("flash", Math.cos(u), Math.sin(u)), this.act.forget());
          return;
        }
      }
    this.travel(this.safe.x, this.safe.y, 3, !0);
  }
  sustain() {
    const t = this.v,
      e = this.me,
      s = t.map.bases[this.team],
      i = ye(e.pos, this.home),
      a = i <= s.fountainRadius - 0.5;
    if (this.baseStay)
      if (this.hpR >= se.baseHpReady && this.manaR >= se.baseManaReady) this.baseStay = !1;
      else {
        if (((this.label = "base"), a)) this.act.halt();
        else if (i < 26) this.act.moveTo(this.home.x, this.home.y);
        else if (!this.recallNow()) {
          const f = this.safeSpot();
          this.travel(f.x, f.y, 3);
        }
        return !0;
      }
    const o = !this.nearFoe || this.nearFoeD > 10,
      r = e5(e, "restore");
    !r &&
      this.hpR < se.healHp &&
      o &&
      !this.inFoeRange &&
      t.skillReady("heal") &&
      !e.inCombat &&
      this.act.castSelf("heal");
    let l =
      this.hpR < this.style.recallHp ||
      (this.manaR < 0.12 && this.hpR < 0.75) ||
      (this.hpR < 0.55 && this.manaR < 0.2);
    if (
      (l && this.hpR >= 0.2 && (r || (t.skillReady("heal") && o && !e.inCombat)) && (l = !1),
      !l || (this.time < this.fightUntil && this.adv >= 1.3 && this.hpR >= this.style.fleeHp))
    )
      return !1;
    if (((this.label = "go-home"), (this.gankId = -1), a)) return ((this.baseStay = !0), this.act.halt(), !0);
    if (i < 26) return ((this.baseStay = !0), this.act.moveTo(this.home.x, this.home.y), !0);
    if (this.recallNow()) return ((this.baseStay = !0), !0);
    const c = this.safeSpot();
    return (this.travel(c.x, c.y, 3), !0);
  }
  recallNow() {
    const t = this.v;
    return e5(this.me, "recall")
      ? !0
      : !(
            (!this.nearFoe || this.nearFoeD > 14) &&
            !this.inFoeRange &&
            this.dmgRate <= 0 &&
            this.minionsOnMe === 0 &&
            this.foeMinionsWithin(7) === 0
          ) ||
          !t.skillReady("recall") ||
          t.busy()
        ? !1
        : (this.act.castSelf("recall"), this.act.forget(), !0);
  }
  foeMinionsWithin(t) {
    let e = 0;
    for (const s of this.foeMinions) ye(s.pos, this.me.pos) <= t && e++;
    return e;
  }
  engageDist(t) {
    const e = this.me;
    if (this.ranged) return e.stats.attackRange + t.radius + 2.5;
    const s = f6[this.heroId],
      i = s && this.v.skillReady(s.slot) ? s.reach : 0;
    return e.stats.attackRange + t.radius + 3.5 + i;
  }
  diveOk(t, e, s) {
    if (!this.prof.dive || e.kind === "core") return !1;
    const i = this.me,
      a = t6(i, t) + 2 * S1(i, t),
      o = t.hp + t.shield,
      r = (e.stats.ad * 1.5 * 600) / (600 + i.stats.armor);
    return a >= o * 1.15 && i.hp - r * 3 > i.stats.maxHp * 0.3 && s >= 0.9
      ? !0
      : this.tankers >= 2 && s >= 1.8 && this.hpR > 0.5;
  }
  standPoint(t, e) {
    const s = this.me,
      i = s.stats.attackRange + t.radius,
      a = s.pos.x - t.pos.x,
      o = s.pos.y - t.pos.y,
      r = Math.hypot(a, o);
    return (
      r <= i || r < 0.001
        ? ((e.x = s.pos.x), (e.y = s.pos.y))
        : ((e.x = t.pos.x + (a / r) * i), (e.y = t.pos.y + (o / r) * i)),
      e
    );
  }
  pickTarget() {
    const t = this.me,
      e = this.v,
      s = t.stats.attackRange;
    let i = null,
      a = -1 / 0;
    for (const o of this.foes) {
      const r = ye(t.pos, o.pos),
        l = o.hp / o.stats.maxHp;
      let c = 2 - r / 6 + (1 - l) * 2.2;
      const f = Se[o.heroId].role;
      if (
        ((f === "mage" || f === "marksman") && (c += this.style.diveBackline),
        o.id === this.brain.focusId && this.inMood(MV, this.prof.focus) && (c += 1.5),
        o.id === this.fightTargetId && this.time < this.fightUntil + 1 && (c += 0.8),
        o.id === this.forceFightId && (c += 10),
        o.targetId === t.id && (c += 0.4),
        this.ranged && r <= s + o.radius + 0.5 && (c += 1),
        this.style.support)
      )
        for (const d of this.friends) {
          const h = Se[d.heroId].role;
          (h === "mage" || h === "marksman") && ye(d.pos, o.pos) < 4.5 && (c += 1.2);
        }
      (e.enemyStructureCovering(o.pos, -0.5) && (c -= 1.5),
        this.killable(o) && (c += 2),
        c > a && ((a = c), (i = o)));
    }
    return i;
  }
  finish() {
    if (!(this.foes.length === 0 || this.v.busy())) {
      for (const t of this.foes) if (!(t.hp > t.stats.maxHp * 0.3) && sV(this, t)) return;
    }
  }
  combat() {
    if (this.foes.length === 0) return !1;
    const t = this.pickTarget();
    if (!t) return !1;
    const e = this.me,
      s = this.v,
      i = this.time,
      a = ye(e.pos, t.pos),
      o = this.standPoint(t, bV),
      r = this.advantageAt(o.x, o.y);
    this.fightAdv = r;
    let l = (se.advAllIn * this.style.engage) / this.prof.aggression;
    t.id === this.brain.focusId
      ? (l *= se.followUp)
      : !this.style.initiator && this.friendsNear >= 2 && this.brain.focusId < 0 && (l *= se.waitForEngage);
    const c = i < this.shakenUntil;
    c && (l *= se.shakenFactor);
    const f = i < this.fightUntil && this.fightTargetId === t.id,
      d = a <= e.stats.attackRange + t.radius + 1,
      h = this.heroesOnMe > 0 || (e.inCombat && i - e.lastHitTime < 1.2),
      u = this.engageDist(t),
      m = this.killable(t),
      x = this.killWindow(t);
    let p = !1,
      g = !1;
    if (t.id === this.forceFightId) p = !0;
    else if (r >= l && x) p = !0;
    else if (f && !this.trading && r >= Math.max(1, l * 0.85) && x) p = !0;
    else if (m && r >= 0.75 && a <= u && x) p = !0;
    else if (d && r >= se.advPress * (c ? se.shakenFactor : 1) && !this.respect) ((p = !0), (g = !0));
    else if (h && d) {
      const v = i - this.tradeEnd < 3 ? this.tradeStart : i;
      r >= se.advFightBack + (i - v) * se.tradeFatigue &&
        ((p = !0), (g = !0), (this.tradeStart = v), (this.tradeEnd = i));
    }
    if (
      ((this.trading = g),
      !p ||
        (a > u && !(r >= l * 1.2 && a <= 14 && (t.hp < t.stats.maxHp * 0.5 || this.friendsNear >= 1))) ||
        this.nearFoeFountain(o, 1.5))
    )
      return !1;
    const y = s.enemyStructureCovering(o, 0.3);
    if (y) {
      if (this.diveOk(t, y, r)) this.diving = !0;
      else if (!(this.ranged && !s.enemyStructureCovering(e.pos, 0.3) && d)) return !1;
    }
    return (
      (this.fightUntil = i + se.fightHold),
      (this.fightTargetId = t.id),
      this.prof.focus > 0 && !g && this.brain.callFocus(t.id, i),
      this.fight(t, a, !g),
      !0
    );
  }
  fight(t, e, s) {
    const i = this.v,
      a = this.me;
    ((this.label = s ? "fight" : "trade"), i.busy() || (s ? nV(this, t) : Uk(this, t)));
    const o = a.stats.attackRange + t.radius;
    if (
      s &&
      e > o + 0.8 &&
      e < o + 5 &&
      t.hp <= S1(a, t) * 1.6 &&
      i.skillReady("flash") &&
      !i.busy() &&
      this.inMood(kV, this.prof.flashKill)
    ) {
      const r = (t.pos.x - a.pos.x) / e,
        l = (t.pos.y - a.pos.y) / e;
      ((Ms.x = a.pos.x + r * 5),
        (Ms.y = a.pos.y + l * 5),
        i.walkable(Ms) &&
          (this.diving || !i.enemyStructureCovering(Ms, 0)) &&
          (this.act.castDir("flash", r, l), this.act.forget()));
    }
    this.ranged ? this.kite(t) : this.act.attack(t.id);
  }
  meleeThreat() {
    let t = null,
      e = 1 / 0;
    for (const s of this.foes) {
      if (s.stats.attackRange >= 4) continue;
      const i = ye(this.me.pos, s.pos);
      i < s.stats.attackRange + 2.4 && i < e && ((e = i), (t = s));
    }
    return t;
  }
  kite(t) {
    const e = this.v,
      s = this.me,
      i = this.act;
    if (!this.prof.orbwalk || e.attackWindup()) {
      i.attack(t.id);
      return;
    }
    const a = e.attackCooldown(),
      o = this.meleeThreat();
    if (!o || a <= this.interval * 0.7) {
      i.attack(t.id);
      return;
    }
    let r = s.pos.x - o.pos.x,
      l = s.pos.y - o.pos.y;
    const c = Math.hypot(r, l) || 1,
      f = ye(this.home, s.pos) || 1;
    ((r = r / c + ((this.home.x - s.pos.x) / f) * 0.5), (l = l / c + ((this.home.y - s.pos.y) / f) * 0.5));
    const d = Math.hypot(r, l) || 1;
    if (
      ((Ms.x = s.pos.x + (r / d) * 2),
      (Ms.y = s.pos.y + (l / d) * 2),
      !e.walkable(Ms) || e.enemyStructureCovering(Ms, 0))
    ) {
      i.attack(t.id);
      return;
    }
    i.moveDir(r / d, l / d);
  }
  assist() {
    if (this.hpR < 0.5) return !1;
    const t = this.v,
      e = this.me,
      s = this.brain.taskOf(this.heroId),
      i = this.brain.phase === "lane" && s.kind === "lane",
      a = i ? 16 : 30;
    let o = null,
      r = 1 / 0;
    for (const f of t.alliedHeroes()) {
      if (f === e || !f.inCombat) continue;
      const d = ye(e.pos, f.pos);
      if (d < 7) {
        f.id === this.assistId && ((this.assistId = -1), (this.assistBanUntil = this.time + 6));
        continue;
      }
      if (d > a || d >= r) continue;
      let h = !1;
      for (const u of this.foesAll) ye(u.pos, f.pos) < 11 && (h = !0);
      h && ((r = d), (o = f));
    }
    if (!o) return !1;
    const l = this.time;
    if (o.id === this.assistId && l < this.assistUntil) {
      if (this.advantageAt(o.pos.x, o.pos.y) < 0.8)
        return ((this.assistUntil = 0), (this.assistBanUntil = l + 3), !1);
    } else {
      if (l < this.assistBanUntil || (!i && !this.inMood(wV, this.prof.teamwork))) return !1;
      if (this.advantageAt(o.pos.x, o.pos.y) < 1.05 || t.enemyStructureCovering(o.pos, 1))
        return ((this.assistBanUntil = l + 3), !1);
      ((this.assistId = o.id), (this.assistUntil = l + 2.5));
    }
    return (this.travel(o.pos.x, o.pos.y, 2.5), (this.label = "assist"), !0);
  }
}

const EV = (n) => new TV(n);

let AV = EV;

function RV(n) {
  return AV(n);
}

const Qh = 0,
  Jh = 1,
  Fm = 2,
  ry = 0,
  N3 = 1,
  h6 = 2;

function G0(n, ...t) {
  for (const e of t) Object.defineProperty(n, e, { enumerable: !1 });
  return n;
}

const F3 = 8,
  Ok = 2,
  CV = 5,
  Bk = 0.35,
  LV = 0.7,
  Vi = 0.5,
  ha = 1 / Vi,
  ss = 58,
  IV = 0.06,
  PV = 1.12,
  u6 = 0.3,
  Hk = 6,
  p6 = Hk,
  DV = 4e4,
  n5 = Math.SQRT2,
  m6 = new Map();

function zV(n, t) {
  const e = `${n.bound}|${JSON.stringify(n.walls)}`,
    s = m6.get(e);
  if (s) return s;
  const i = new Float32Array(t * t),
    a = n.walls,
    o = a.map((l) => {
      let c = 1 / 0,
        f = 1 / 0,
        d = -1 / 0,
        h = -1 / 0;
      for (const u of l)
        (u.x < c && (c = u.x), u.x > d && (d = u.x), u.y < f && (f = u.y), u.y > h && (h = u.y));
      return { minX: c, minY: f, maxX: d, maxY: h };
    }),
    r = { x: 0, y: 0 };
  for (let l = 0; l < t; l++) {
    const c = -ss + l * Vi;
    for (let f = 0; f < t; f++) {
      const d = -ss + f * Vi;
      let h = Math.min(n.bound - Math.abs(d), n.bound - Math.abs(c), Hk);
      ((r.x = d), (r.y = c));
      for (let u = 0; u < a.length; u++) {
        const m = o[u],
          x = Math.max(m.minX - d, 0, d - m.maxX),
          p = Math.max(m.minY - c, 0, c - m.maxY);
        if ((x > 0 || p > 0) && Math.hypot(x, p) >= h) continue;
        const g = p8(r, a[u]),
          y = yo(r, a[u]) ? -g : g;
        y < h && (h = y);
      }
      i[l * t + f] = h;
    }
  }
  return (m6.set(e, i), i);
}

class NV {
  n;
  clear;
  base;
  obstacles = [];
  gScore;
  parent;
  opened;
  closed;
  heapNode;
  heapKey;
  heapSize = 0;
  gen = 0;
  nodeBuf;
  gx = 0;
  gy = 0;
  stats = { searches: 0, expansions: 0 };
  lastPathPartial = !1;
  constructor(t) {
    const e = Math.round((ss * 2) / Vi) + 1;
    ((this.n = e), (this.base = zV(t, e)), (this.clear = new Float32Array(this.base)));
    const s = e * e;
    ((this.gScore = new Float32Array(s)),
      (this.parent = new Int32Array(s)),
      (this.opened = new Uint32Array(s)),
      (this.closed = new Uint32Array(s)),
      (this.heapNode = new Int32Array(s * 2)),
      (this.heapKey = new Float32Array(s * 2)),
      (this.nodeBuf = new Int32Array(s)));
  }
  sample(t, e, s) {
    const i = this.n;
    let a = (e + ss) * ha,
      o = (s + ss) * ha;
    (a < 0 ? (a = 0) : a > i - 1 && (a = i - 1), o < 0 ? (o = 0) : o > i - 1 && (o = i - 1));
    let r = a | 0,
      l = o | 0;
    (r > i - 2 && (r = i - 2), l > i - 2 && (l = i - 2));
    const c = a - r,
      f = o - l,
      d = l * i + r,
      h = t[d],
      u = t[d + 1],
      m = t[d + i],
      x = t[d + i + 1];
    return (h + (u - h) * c) * (1 - f) + (m + (x - m) * c) * f;
  }
  clearanceAt(t, e) {
    return this.sample(this.clear, t, e);
  }
  isFree(t, e, s) {
    return this.sample(this.clear, t, e) >= s;
  }
  isFreeTerrain(t, e, s) {
    return this.sample(this.base, t, e) >= s;
  }
  gradient(t, e) {
    const i = this.clear,
      a = this.sample(i, t + 0.25, e) - this.sample(i, t - 0.25, e),
      o = this.sample(i, t, e + 0.25) - this.sample(i, t, e - 0.25),
      r = Math.hypot(a, o);
    r < 1e-6 ? ((this.gx = 0), (this.gy = 0)) : ((this.gx = a / r), (this.gy = o / r));
  }
  trace(t, e, s, i, a, o) {
    const r = i - e,
      l = a - s,
      c = Math.hypot(r, l);
    if (c < 1e-6) return this.sample(t, e, s) >= o;
    const f = r / c,
      d = l / c;
    let h = 0;
    for (;;) {
      const u = this.sample(t, e + f * h, s + d * h);
      if (u < o) return !1;
      if (h >= c) return !0;
      const m = (u - o) * 0.9;
      ((h += m > 0.2 ? m : 0.2), h > c && (h = c));
    }
  }
  segmentFree(t, e, s, i, a) {
    return this.trace(this.clear, t, e, s, i, a);
  }
  lineOfSight(t, e, s, i) {
    return this.trace(this.base, t, e, s, i, 0);
  }
  stamp(t, e, s, i, a) {
    const o = this.n,
      r = t.r + p6,
      l = Math.max(e, Math.floor((t.x - r + ss) * ha)),
      c = Math.min(i, Math.ceil((t.x + r + ss) * ha)),
      f = Math.max(s, Math.floor((t.y - r + ss) * ha)),
      d = Math.min(a, Math.ceil((t.y + r + ss) * ha));
    for (let h = f; h <= d; h++) {
      const u = -ss + h * Vi - t.y;
      for (let m = l; m <= c; m++) {
        const x = -ss + m * Vi - t.x,
          p = Math.hypot(x, u) - t.r,
          g = h * o + m;
        p < this.clear[g] && (this.clear[g] = p);
      }
    }
  }
  addObstacle(t, e, s, i) {
    const a = { id: t, x: e, y: s, r: i };
    (this.obstacles.push(a), this.stamp(a, 0, 0, this.n - 1, this.n - 1));
  }
  removeObstacle(t) {
    const e = this.obstacles.findIndex((f) => f.id === t);
    if (e < 0) return;
    const s = this.obstacles[e];
    this.obstacles.splice(e, 1);
    const i = this.n,
      a = s.r + p6,
      o = Math.max(0, Math.floor((s.x - a + ss) * ha)),
      r = Math.min(i - 1, Math.ceil((s.x + a + ss) * ha)),
      l = Math.max(0, Math.floor((s.y - a + ss) * ha)),
      c = Math.min(i - 1, Math.ceil((s.y + a + ss) * ha));
    for (let f = l; f <= c; f++) {
      const d = f * i;
      for (let h = o; h <= r; h++) this.clear[d + h] = this.base[d + h];
    }
    for (const f of this.obstacles) this.stamp(f, o, l, r, c);
  }
  moveWithCollision(t, e, s, i) {
    const a = Math.hypot(e, s);
    if (a < 1e-9) return !1;
    const o = a > u6 ? Math.ceil(a / u6) : 1,
      r = e / o,
      l = s / o;
    let c = !1;
    for (let f = 0; f < o && this.stepOnce(t, r, l, i); f++) c = !0;
    return c;
  }
  stepOnce(t, e, s, i) {
    const a = this.clear;
    let o = t.x + e,
      r = t.y + s,
      l = this.sample(a, o, r);
    if (l >= i) return ((t.x = o), (t.y = r), !0);
    for (let c = 0; c < 3 && (this.gradient(o, r), !(this.gx === 0 && this.gy === 0)); c++) {
      const f = i - l + 0.004;
      if (((o += this.gx * f), (r += this.gy * f), (l = this.sample(a, o, r)), l >= i))
        return ((t.x = o), (t.y = r), !0);
    }
    return e !== 0 && this.sample(a, t.x + e, t.y) >= i
      ? ((t.x += e), !0)
      : s !== 0 && this.sample(a, t.x, t.y + s) >= i
        ? ((t.y += s), !0)
        : !1;
  }
  moveStraight(t, e, s, i, a) {
    const o = this.clear,
      r = a - 0.05;
    let l = 0;
    for (; l < i;) {
      const c = Math.min(0.2, i - l);
      if (this.sample(o, t.x + e * (l + c), t.y + s * (l + c)) < r) break;
      l += c;
    }
    return ((t.x += e * l), (t.y += s * l), l);
  }
  nearestNode(t, e, s, i) {
    const a = this.n,
      o = this.clear;
    let r = Math.round((t + ss) * ha),
      l = Math.round((e + ss) * ha);
    if (((r = r < 0 ? 0 : r > a - 1 ? a - 1 : r), (l = l < 0 ? 0 : l > a - 1 ? a - 1 : l), o[l * a + r] >= s))
      return l * a + r;
    let c = -1,
      f = 1 / 0,
      d = -1;
    for (let h = 1; h <= i && !(d >= 0 && h > d + 2); h++) {
      const u = r - h,
        m = r + h,
        x = l - h,
        p = l + h;
      for (let g = x; g <= p; g++) {
        if (g < 0 || g >= a) continue;
        const v = g === x || g === p ? 1 : m - u;
        for (let _ = u; _ <= m; _ += v) {
          if (_ < 0 || _ >= a) continue;
          const k = g * a + _;
          if (o[k] < s) continue;
          const M = -ss + _ * Vi - t,
            S = -ss + g * Vi - e,
            b = M * M + S * S;
          b < f && ((f = b), (c = k), d < 0 && (d = h));
        }
      }
    }
    return c;
  }
  nearestFree(t, e, s, i, a = 12) {
    if (this.sample(this.clear, t, e) >= s) return ((i.x = t), (i.y = e), !0);
    const o = this.nearestNode(t, e, s + 0.02, Math.ceil(a * ha));
    return o < 0 ? !1 : ((i.x = -ss + (o % this.n) * Vi), (i.y = -ss + Math.floor(o / this.n) * Vi), !0);
  }
  heapPush(t, e) {
    const s = this.heapNode,
      i = this.heapKey;
    let a = this.heapSize++;
    for (; a > 0;) {
      const o = (a - 1) >> 1;
      if (i[o] <= e) break;
      ((s[a] = s[o]), (i[a] = i[o]), (a = o));
    }
    ((s[a] = t), (i[a] = e));
  }
  heapPop() {
    const t = this.heapNode,
      e = this.heapKey,
      s = t[0],
      i = --this.heapSize;
    if (i > 0) {
      const a = t[i],
        o = e[i];
      let r = 0;
      for (;;) {
        let l = r * 2 + 1;
        if (l >= i || (l + 1 < i && e[l + 1] < e[l] && l++, e[l] >= o)) break;
        ((t[r] = t[l]), (e[r] = e[l]), (r = l));
      }
      ((t[r] = a), (e[r] = o));
    }
    return s;
  }
  findPath(t, e, s, i, a, o, r = PV) {
    const l = this.n,
      c = this.clear,
      f = a + IV,
      d = o && o.length > 0 ? o : null,
      h = this.nearestNode(t, e, f, 8),
      u = this.nearestNode(s, i, f, 40);
    if (h < 0 || u < 0) return null;
    this.stats.searches++;
    const m = u % l,
      x = (u / l) | 0,
      p = ++this.gen,
      g = this.gScore,
      y = this.parent,
      v = this.opened,
      _ = this.closed,
      k = this.heapNode.length - 8;
    ((this.heapSize = 0), (g[h] = 0), (y[h] = -1), (v[h] = p), this.heapPush(h, 0));
    let M = h === u,
      S = h,
      b = 1 / 0,
      w = 0;
    for (; !M && this.heapSize > 0;) {
      const L = this.heapPop();
      if (_[L] === p) continue;
      if (((_[L] = p), L === u)) {
        M = !0;
        break;
      }
      if (++w > DV || this.heapSize > k) break;
      const B = L % l,
        G = (L / l) | 0,
        q = g[L];
      for (let et = -1; et <= 1; et++) {
        const ct = G + et;
        if (!(ct < 0 || ct >= l))
          for (let rt = -1; rt <= 1; rt++) {
            if (rt === 0 && et === 0) continue;
            const mt = B + rt;
            if (mt < 0 || mt >= l) continue;
            const nt = ct * l + mt;
            if (_[nt] === p || c[nt] < f || (d && FV(d, -ss + mt * Vi, -ss + ct * Vi))) continue;
            const H = rt !== 0 && et !== 0;
            if (H && (c[G * l + mt] < f || c[ct * l + B] < f)) continue;
            const st = q + (H ? n5 : 1);
            if (v[nt] === p && st >= g[nt]) continue;
            ((g[nt] = st), (y[nt] = L), (v[nt] = p));
            const tt = mt > m ? mt - m : m - mt,
              it = ct > x ? ct - x : x - ct,
              D = tt > it ? tt + it * (n5 - 1) : it + tt * (n5 - 1);
            (D < b && ((b = D), (S = nt)), this.heapPush(nt, st + D * r));
          }
      }
    }
    ((this.stats.expansions += w), (this.lastPathPartial = !M));
    const T = this.nodeBuf;
    let E = 0;
    for (let L = M ? u : S; L >= 0; L = y[L]) T[E++] = L;
    const A = [];
    for (let L = E - 1; L >= 0; L--) {
      const B = T[L];
      A.push({ x: -ss + (B % l) * Vi, y: -ss + ((B / l) | 0) * Vi });
    }
    if (M && this.sample(c, s, i) >= a) {
      const L = A[A.length - 1];
      this.trace(c, L.x, L.y, s, i, a) && A.push({ x: s, y: i });
    }
    const C = [];
    let R = t,
      I = e,
      P = 0;
    const F = A.length;
    for (; P < F;) {
      let L = P;
      for (
        let B = P + 1;
        B < F && !(!this.trace(c, R, I, A[B].x, A[B].y, f) || (d && $k(d, R, I, A[B].x, A[B].y)));
        B++
      )
        L = B;
      (C.push(A[L]), (R = A[L].x), (I = A[L].y), (P = L + 1));
    }
    return C;
  }
}

function FV(n, t, e) {
  for (let s = 0; s < n.length; s++) {
    const i = n[s],
      a = t - i.x,
      o = e - i.y;
    if (a * a + o * o < i.r * i.r) return !0;
  }
  return !1;
}

function $k(n, t, e, s, i) {
  const a = s - t,
    o = i - e,
    r = a * a + o * o;
  for (let l = 0; l < n.length; l++) {
    const c = n[l];
    let f = r > 1e-9 ? ((c.x - t) * a + (c.y - e) * o) / r : 0;
    f = f < 0 ? 0 : f > 1 ? 1 : f;
    const d = t + a * f - c.x,
      h = e + o * f - c.y;
    if (d * d + h * h < c.r * c.r) return !0;
  }
  return !1;
}

function UV(n, t) {
  let e = 0,
    s = n.x,
    i = n.y;
  for (const a of t) ((e += Math.hypot(a.x - s, a.y - i)), (s = a.x), (i = a.y));
  return e;
}

const OV = { cast: () => {} },
  tm = new Map(),
  Gk = new Map(),
  Vk = new Map(),
  U3 = new Map();

function Oi(n, t, e) {
  tm.set(`${n}:${t}`, e);
}

function ly(n, t) {
  tm.set(`*:${n}`, t);
}

function Wk(n, t) {
  return tm.get(`${n}:${t}`) ?? tm.get(`*:${t}`) ?? OV;
}

function tu(n, t) {
  Gk.set(n, t);
}

function BV(n) {
  return Gk.get(n);
}

function ql(n, t) {
  (Vk.set(n, t), U3.clear());
}

function HV(n) {
  if (!n.passive) return;
  let t = U3.get(n.id);
  if (!t) {
    const e = Vk.get(n.passive.id);
    if (!e) return;
    ((t = e(n)), U3.set(n.id, t));
  }
  return t;
}

const jk = {
  recall: { type: "self", radius: 0 },
  heal: { type: "self", radius: 0 },
  flash: { type: "direction", range: ea.flash.range, width: 0 },
};

function em(n) {
  return n === "recall" || n === "heal" || n === "flash";
}

const g6 = new WeakMap();

function $V(n) {
  let t = g6.get(n);
  return (
    t ||
      ((t = n.bushes.map((e) => {
        const s = { minX: 1 / 0, minY: 1 / 0, maxX: -1 / 0, maxY: -1 / 0 };
        for (const i of e)
          ((s.minX = Math.min(s.minX, i.x)),
            (s.minY = Math.min(s.minY, i.y)),
            (s.maxX = Math.max(s.maxX, i.x)),
            (s.maxY = Math.max(s.maxY, i.y)));
        return s;
      })),
      g6.set(n, t)),
    t
  );
}

function qk(n, t) {
  const e = $V(n);
  for (let s = 0; s < e.length; s++) {
    const i = e[s];
    if (!(t.x < i.minX || t.x > i.maxX || t.y < i.minY || t.y > i.maxY) && yo(t, n.bushes[s])) return s;
  }
  return -1;
}

const Jp = [];

function x6(n) {
  const t = n.units,
    e = n.map,
    s = n.state.time,
    i = ui.bushReveal * ui.bushReveal;
  for (let a = 0; a < t.length; a++) {
    const o = t[a];
    (o.kind === "hero" || o.kind === "minion" || o.kind === "monster") &&
      (o.bushId = o.alive ? qk(e, o.pos) : -1);
  }
  for (const a of [0, 1]) {
    Jp.length = 0;
    for (let o = 0; o < t.length; o++) {
      const r = t[o];
      r.alive && r.team === a && r.rt.sight > 0 && Jp.push(r);
    }
    for (let o = 0; o < t.length; o++) {
      const r = t[o];
      if (r.team === a || r.kind === "tower" || r.kind === "core" || r.kind === "monster" || !r.alive) {
        r.visible[a] = !0;
        continue;
      }
      const l = r.bushId >= 0 && r.rt.revealUntil <= s;
      let c = !1;
      const f = r.pos.x,
        d = r.pos.y;
      for (let h = 0; h < Jp.length; h++) {
        const u = Jp[h],
          m = u.pos.x - f,
          x = u.pos.y - d,
          p = m * m + x * x,
          g = u.rt.sight;
        if (!(p > g * g) && !(l && u.bushId !== r.bushId && p > i)) {
          c = !0;
          break;
        }
      }
      if (((r.visible[a] = c), c && r.kind === "hero")) {
        const h = n.lastSeen[a][r.h.index];
        ((h.x = f), (h.y = d), (h.time = s));
      }
    }
  }
}

const GV = 1.6,
  VV = 13,
  WV = [];

class jV {
  hero;
  team;
  enemyTeam;
  difficulty;
  rng;
  map;
  state;
  sim;
  self;
  cacheTick = -1;
  cAllies = [];
  cAlliedHeroes = [];
  cEnemies = [];
  cEnemyHeroes = [];
  cEnemyStructures = [];
  cAlliedStructures = [];
  cMonsters = [];
  nearBuf = [];
  zones = [];
  constructor(t, e, s, i) {
    ((this.sim = t),
      (this.self = e),
      (this.hero = e),
      (this.team = e.team),
      (this.enemyTeam = e.team === 0 ? 1 : 0),
      (this.difficulty = s),
      (this.rng = i),
      (this.map = t.map),
      (this.state = t.state));
  }
  get time() {
    return this.sim.state.time;
  }
  refresh() {
    const t = this.sim.state.tick;
    if (t === this.cacheTick) return;
    this.cacheTick = t;
    const e = this.team;
    ((this.cAllies.length = 0),
      (this.cAlliedHeroes.length = 0),
      (this.cEnemies.length = 0),
      (this.cEnemyHeroes.length = 0),
      (this.cEnemyStructures.length = 0),
      (this.cAlliedStructures.length = 0),
      (this.cMonsters.length = 0));
    const s = this.sim.units;
    for (let i = 0; i < s.length; i++) {
      const a = s[i];
      a.alive &&
        (a.team === e
          ? (this.cAllies.push(a),
            a.kind === "hero"
              ? this.cAlliedHeroes.push(a)
              : (a.kind === "tower" || a.kind === "core") && this.cAlliedStructures.push(a))
          : a.kind === "monster"
            ? this.cMonsters.push(a)
            : a.kind === "tower" || a.kind === "core"
              ? this.cEnemyStructures.push(a)
              : a.visible[e] &&
                !a.invulnerable &&
                !a.rt.untargetable &&
                (this.cEnemies.push(a), a.kind === "hero" && this.cEnemyHeroes.push(a)));
    }
  }
  allies() {
    return (this.refresh(), this.cAllies);
  }
  alliedHeroes() {
    return (this.refresh(), this.cAlliedHeroes);
  }
  enemies() {
    return (this.refresh(), this.cEnemies);
  }
  enemyHeroes() {
    return (this.refresh(), this.cEnemyHeroes);
  }
  enemyStructures() {
    return (this.refresh(), this.cEnemyStructures);
  }
  alliedStructures() {
    return (this.refresh(), this.cAlliedStructures);
  }
  monsters() {
    return (this.refresh(), this.cMonsters);
  }
  perceivable(t) {
    return (
      t.team === this.team ||
      t.kind === "monster" ||
      t.kind === "tower" ||
      t.kind === "core" ||
      t.visible[this.team]
    );
  }
  unit(t) {
    const e = this.sim.byId.get(t);
    return e && this.perceivable(e) ? e : void 0;
  }
  canSee(t) {
    return t.team === this.team || t.visible[this.team];
  }
  near(t, e) {
    const s = this.sim.grid.query(t.x, t.y, e, this.nearBuf),
      i = [];
    for (let a = 0; a < s; a++) {
      const o = this.nearBuf[a];
      !o.alive ||
        !this.perceivable(o) ||
        (Math.hypot(o.pos.x - t.x, o.pos.y - t.y) - o.radius <= e && i.push(o));
    }
    return i;
  }
  scoreboard() {
    return this.sim.heroes;
  }
  lastSeen(t) {
    const e = this.sim.byId.get(t);
    return !e || e.kind !== "hero" || e.team === this.team ? null : this.sim.lastSeen[this.team][e.h.index];
  }
  botControlled(t) {
    const e = this.sim.byId.get(t.id);
    return !!e && e.kind === "hero" && e.team === this.team && e.h.controller !== null;
  }
  walkable(t, e) {
    return this.sim.nav.isFree(t.x, t.y, e ?? this.self.rt.navR);
  }
  lineClear(t, e, s) {
    return this.sim.nav.segmentFree(t.x, t.y, e.x, e.y, s ?? this.self.rt.navR);
  }
  nearestWalkable(t) {
    const e = { x: t.x, y: t.y };
    return (this.sim.nav.nearestFree(t.x, t.y, this.self.rt.navR, e), e);
  }
  pathDistance(t) {
    const e = this.self.pos,
      s = this.sim.nav,
      i = this.self.rt.navR;
    if (s.segmentFree(e.x, e.y, t.x, t.y, i)) return Math.hypot(t.x - e.x, t.y - e.y);
    const a = s.findPath(e.x, e.y, t.x, t.y, i);
    if (!a || a.length === 0) return 1 / 0;
    const o = a[a.length - 1];
    return Math.hypot(o.x - t.x, o.y - t.y) > 2 ? 1 / 0 : UV(e, a);
  }
  safePath(t, e = 1) {
    this.refresh();
    const s = this.self.pos,
      i = this.sim.nav,
      a = this.self.rt.navR,
      o = this.zones;
    o.length = 0;
    for (const f of this.cEnemyStructures) {
      let d = f.stats.attackRange + e;
      ((d = Math.min(
        d,
        Math.hypot(s.x - f.pos.x, s.y - f.pos.y) - 0.4,
        Math.hypot(t.x - f.pos.x, t.y - f.pos.y) - 0.4,
      )),
        d > f.radius + 1 && o.push({ x: f.pos.x, y: f.pos.y, r: d }));
    }
    const r = this.map.bases[this.enemyTeam],
      l = Math.min(
        r.fountainRadius + e,
        Math.hypot(s.x - r.fountain.x, s.y - r.fountain.y) - 0.4,
        Math.hypot(t.x - r.fountain.x, t.y - r.fountain.y) - 0.4,
      );
    if (
      (l > 1 && o.push({ x: r.fountain.x, y: r.fountain.y, r: l }),
      i.segmentFree(s.x, s.y, t.x, t.y, a) && !$k(o, s.x, s.y, t.x, t.y))
    )
      return [{ x: t.x, y: t.y }];
    const c = i.findPath(s.x, s.y, t.x, t.y, a, o, GV);
    return c && c.length > 0 ? c : null;
  }
  bushAt(t) {
    return qk(this.map, t);
  }
  enemyStructureCovering(t, e = 0) {
    this.refresh();
    for (const s of this.cEnemyStructures) {
      const i = s.stats.attackRange + e,
        a = s.pos.x - t.x,
        o = s.pos.y - t.y;
      if (a * a + o * o <= i * i) return s;
    }
    return null;
  }
  perceivesPoint(t, e, s) {
    this.refresh();
    const i = VV + s;
    for (const a of this.cAlliedHeroes) {
      const o = a.pos.x - t,
        r = a.pos.y - e;
      if (o * o + r * r <= i * i) return !0;
    }
    return !1;
  }
  hostileAreas() {
    const t = [];
    for (const e of this.sim.areas)
      e.team === this.team || e.dead || (this.perceivesPoint(e.pos.x, e.pos.y, e.radius) && t.push(e));
    return t;
  }
  hostileCones() {
    const t = this.sim.cones;
    if (t.length === 0) return WV;
    const e = [];
    for (const s of t) this.perceivesPoint(s.pos.x, s.pos.y, s.radius) && e.push(s);
    return e;
  }
  hostileProjectiles() {
    const t = [];
    for (const e of this.sim.projectiles)
      e.team === this.team || e.dead || (this.perceivesPoint(e.pos.x, e.pos.y, 0) && t.push(e));
    return t;
  }
  castSpec(t) {
    return em(t) ? jk[t] : Se[this.self.heroId].skills[t].cast;
  }
  skillReady(t) {
    const e = this.self,
      s = e.skills[t];
    if (!e.alive || s.level <= 0 || s.cd > 0 || e.mana < s.cost || e.rt.stunned || (!em(t) && e.rt.silenced))
      return !1;
    const i = Wk(e.heroId, t);
    return i.movement && e.rt.rooted ? !1 : !(i.canCast && i.canCast(this.sim, e) !== null);
  }
  orderState() {
    const t = this.self;
    return t.h.atkOrder ? 3 : t.rt.moveMode === Fm ? 2 : t.rt.moveMode === Jh ? 1 : 0;
  }
  orderTargetId() {
    return this.self.h.atkOrder ? this.self.h.atkTargetId : -1;
  }
  attackWindup() {
    return this.self.rt.windupLeft > 0;
  }
  attackCooldown() {
    const t = this.self.rt,
      e = t.disarmUntil - this.sim.state.time;
    return Math.max(0, t.atkCd, e);
  }
  busy() {
    const t = this.self.rt;
    return t.stunned || t.dash !== null || this.sim.state.time < t.lockUntil;
  }
  command(t) {
    this.sim.command(this.self.id, t);
  }
}

function eu(n, t, e, s, i = !0) {
  const a = t.rt,
    o = n.state.time;
  ((a.act = e),
    (a.actStart = o),
    (a.actDur = s),
    (a.actUntil = s > 0 ? o + s : 1 / 0),
    (a.actMoveCancel = i));
}

function zd(n, t, e, s) {
  (n.anim !== t || n.animStart !== e) && ((n.anim = t), (n.animStart = e), (n.animDur = s));
}

function qV(n, t) {
  if (!t.alive) return;
  const e = t.rt,
    s = n.state.time;
  if (e.airborne) {
    zd(t, "airborne", e.airborne.startTime, e.airborne.duration);
    return;
  }
  if (e.stunned) {
    t.anim !== "stunned" && zd(t, "stunned", s, 0);
    return;
  }
  const i = e.dash;
  if (i && i.anim) {
    zd(t, i.anim, i.startTime, i.dur);
    return;
  }
  if (e.act !== null)
    if (s >= e.actUntil || (e.moved && e.actMoveCancel)) e.act = null;
    else {
      zd(t, e.act, e.actStart, e.actDur);
      return;
    }
  const a = e.moved ? "move" : "idle";
  t.anim !== a && zd(t, a, s, 0);
}

function Zo(n, t) {
  const e = t.tickInterval ?? 0,
    s = {
      id: n.allocId(),
      visual: t.visual,
      team: t.team ?? t.owner.team,
      ownerId: t.owner.id,
      pos: { x: t.pos.x, y: t.pos.y },
      radius: t.radius,
      age: 0,
      duration: t.duration,
      followUnitId: t.follow ? t.follow.id : -1,
      tickInterval: e,
      tickLeft: t.firstTick ?? e,
      dead: !1,
      endWithFollow: t.endWithFollow !== !1,
      onTick: t.onTick ?? null,
      onEnd: t.onEnd ?? null,
    };
  return (
    G0(s, "onTick", "onEnd"),
    n.areas.push(s),
    n.emit({
      type: "areaSpawn",
      id: s.id,
      visual: s.visual,
      pos: { x: s.pos.x, y: s.pos.y },
      radius: s.radius,
      duration: s.duration,
    }),
    s
  );
}

function O3(n, t, e) {
  t.dead ||
    ((t.dead = !0),
    n.emit({ type: "areaEnd", id: t.id, visual: t.visual, pos: { x: t.pos.x, y: t.pos.y } }),
    t.onEnd && t.onEnd(n, t, e));
}

function Xk(n, t) {
  O3(n, t, !1);
}

function XV(n, t) {
  const e = n.areas,
    s = e.length;
  for (let a = 0; a < s; a++) {
    const o = e[a];
    if (!o.dead) {
      if (o.followUnitId >= 0) {
        const r = n.byId.get(o.followUnitId);
        if (r && r.alive) ((o.pos.x = r.pos.x), (o.pos.y = r.pos.y));
        else if (o.endWithFollow) {
          O3(n, o, !1);
          continue;
        }
      }
      ((o.age += t),
        !(
          o.tickInterval > 0 &&
          o.onTick &&
          ((o.tickLeft -= t),
          o.tickLeft <= 1e-9 &&
            o.age <= o.duration + 1e-9 &&
            ((o.tickLeft += o.tickInterval), o.onTick(n, o), o.dead))
        ) &&
          o.age >= o.duration - 1e-9 &&
          O3(n, o, !0));
    }
  }
  let i = 0;
  for (let a = 0; a < e.length; a++) {
    const o = e[a];
    o.dead || (e[i++] = o);
  }
  e.length = i;
}

const YV = 0.8;

function Um(n) {
  return {
    maxHp: 1,
    maxMana: 0,
    ad: 0,
    ap: 0,
    armor: 0,
    mr: 0,
    attackSpeed: 1,
    moveSpeed: 0,
    attackRange: 0,
    hpRegen: 0,
    manaRegen: 0,
    cdr: 0,
    lifesteal: 0,
    critChance: 0,
    critDamage: 2,
    armorPen: 0,
    magicPen: 0,
    ...n,
  };
}

function nu(n, t, e, s, i) {
  return {
    navR: Math.min(n, YV),
    weight: t,
    sight: e,
    base: s,
    atk: i,
    stunned: !1,
    rooted: !1,
    silenced: !1,
    untargetable: !1,
    unstoppable: !1,
    slowImmune: !1,
    airborne: null,
    moveMode: Qh,
    dirX: 0,
    dirY: 0,
    path: null,
    pathIdx: 0,
    goalX: 0,
    goalY: 0,
    pathTime: -999,
    stuck: 0,
    moved: !1,
    pushX: 0,
    pushY: 0,
    dash: null,
    atkCd: 0,
    windupLeft: 0,
    windupTarget: -1,
    disarmUntil: 0,
    lockUntil: 0,
    act: null,
    actStart: 0,
    actDur: 0,
    actUntil: 0,
    actMoveCancel: !0,
    hitHeroTime: -999,
    hitHeroId: -1,
    revealUntil: -999,
    lastAttackerId: -1,
    thinkAt: 0,
    backdoor: !1,
  };
}

function su(n, t, e, s, i, a) {
  return {
    id: n.allocId(),
    team: t,
    pos: { x: e.x, y: e.y },
    prevPos: { x: e.x, y: e.y },
    facing: s,
    radius: i,
    alive: !0,
    hp: a.maxHp,
    mana: a.maxMana,
    stats: a,
    buffs: [],
    shield: 0,
    anim: "idle",
    animStart: n.state.time,
    animDur: 0,
    targetId: -1,
    visible: [t !== 1, t !== 0],
    bushId: -1,
    invulnerable: !1,
    lastHitTime: -999,
  };
}

const Om = (n) => (n === 1 ? Math.PI * 0.75 : -Math.PI * 0.25);

function KV(n, t, e, s, i, laneIn) {
  const a = Se[s],
    o = n.map.bases[e],
    r = o.spawns[t % o.spawns.length],
    l = f5(a, 1),
    c = lm(1),
    f = (x) => ({ level: c[x], cd: 0, cdMax: a.skills[x].cooldown[0], cost: a.skills[x].manaCost[0] }),
    d = (x) => ({ level: 1, cd: 0, cdMax: x, cost: 0 }),
    h = {
      s1: f("s1"),
      s2: f("s2"),
      ult: f("ult"),
      recall: d(ea.recall.cooldown),
      heal: d(ea.heal.cooldown),
      flash: d(ea.flash.cooldown),
    },
    u = {
      windup: a.basicAttack.windup,
      dtype: a.basicAttack.damageType,
      visual: a.basicAttack.projectile ?? null,
      projSpeed: a.basicAttack.projectileSpeed ?? 0,
      vsStructure: 1,
      vsMinion: 1,
    },
    m = {
      ...su(n, e, r, Om(e), a.radius, l),
      kind: "hero",
      team: e,
      heroId: s,
      name: a.name,
      isPlayer: i,
      // 分路由对局阵容指定（AI 会自由分路），没给就退回英雄的推荐分路
      lane: laneIn || a.lane,
      level: 1,
      xp: 0,
      xpToNext: Z6(1),
      gold: va.startGold,
      goldEarned: va.startGold,
      kills: 0,
      deaths: 0,
      assists: 0,
      cs: 0,
      streak: 0,
      skills: h,
      items: [null, null, null, null, null, null],
      respawnIn: 0,
      dmgDealt: 0,
      dmgTaken: 0,
      dmgTower: 0,
      inCombat: !1,
      autoBuy: i && n.state.config.autoBuy === !0,
      buffs: [],
      rt: nu(a.radius, 2, ui.hero, f5(a, 1), u),
      h: {
        def: a,
        index: t,
        spawn: { x: r.x, y: r.y },
        baseLevel: 1,
        atkOrder: !1,
        atkTargetId: -1,
        atkExplicit: !1,
        pendingCast: null,
        pendingUntil: 0,
        goldFrac: 0,
        multiKill: 0,
        lastKillTime: -999,
        deathStreak: 0,
        damagers: new Map(),
        lastCombatTime: -999,
        hooks: [],
        cooldowns: new Map(),
        vars: new Map(),
        controller: null,
        nextThink: 0,
      },
    };
  return G0(m, "rt", "h");
}

function ZV(n, t, e, s, i) {
  const a = Y6[s],
    o = n.state.time / 60,
    r = 1 + (Math.max(0, n.state.time - Qd.start) / 60) * Qd.minionBoostPerMin,
    l = Um({
      maxHp: (a.hp + a.hpPerMin * o) * r,
      ad: (a.ad + a.adPerMin * o) * r,
      armor: a.armor,
      mr: a.mr,
      attackSpeed: a.attackSpeed,
      attackRange: a.attackRange,
      moveSpeed: a.moveSpeed,
    }),
    c = a.projectileSpeed > 0,
    f = {
      windup: Bk,
      dtype: "physical",
      visual: c ? (s === "siege" ? "minion_siege" : "minion_ranged") : null,
      projSpeed: a.projectileSpeed,
      vsStructure: a.towerMult,
      vsMinion: 1,
    },
    d = s === "super" || s === "siege" ? 2 : 1,
    h = {
      ...su(n, t, i, Om(t), a.radius, l),
      kind: "minion",
      team: t,
      minionType: s,
      lane: e,
      buffs: [],
      rt: nu(a.radius, d, ui.minion, { ...l }, f),
      m: { offset: 0, dir: t === 0 ? 1 : -1, goalX: i.x, goalY: i.y, helping: !1, offLane: !1 },
    };
  return G0(h, "rt", "m");
}

function QV(n, t) {
  const e = K6[t.tier],
    s = Um({
      maxHp: e.hp,
      ad: e.ad,
      armor: e.armor,
      mr: e.mr,
      attackSpeed: e.attackSpeed,
      attackRange: e.attackRange,
    }),
    i = {
      windup: 0.3,
      dtype: "physical",
      visual: "tower_bolt",
      projSpeed: e.projectileSpeed,
      vsStructure: 1,
      vsMinion: 1,
    },
    a = {
      ...su(n, t.team, t.pos, Om(t.team), e.radius, s),
      kind: "tower",
      team: t.team,
      lane: t.lane,
      tier: t.tier,
      buffs: [],
      rt: nu(e.radius, 0, ui.tower, { ...s }, i),
    };
  return G0(a, "rt");
}

function JV(n, t) {
  const e = Um({
      maxHp: eo.hp,
      ad: eo.ad,
      armor: eo.armor,
      mr: eo.mr,
      attackSpeed: eo.attackSpeed,
      attackRange: eo.attackRange,
    }),
    s = {
      windup: 0.3,
      dtype: "physical",
      visual: "core_bolt",
      projSpeed: eo.projectileSpeed,
      vsStructure: 1,
      vsMinion: 1,
    },
    i = {
      ...su(n, t.team, t.core, Om(t.team), eo.radius, e),
      kind: "core",
      team: t.team,
      buffs: [],
      rt: nu(eo.radius, 0, ui.core, { ...e }, s),
    };
  return G0(i, "rt");
}

function tW(n, t, e) {
  const s = t.def,
    i = rn[s.monsterType],
    a = n.state.time / 60,
    o = Um({
      maxHp: i.hp + i.hpPerMin * a,
      ad: i.ad + i.adPerMin * a,
      armor: i.armor,
      mr: i.mr,
      attackSpeed: i.attackSpeed,
      attackRange: i.attackRange,
      moveSpeed: i.moveSpeed,
    }),
    r = s.spawns[e],
    l = { x: s.pos.x + r.x, y: s.pos.y + r.y },
    c = {
      windup: Bk,
      dtype: "physical",
      visual: i.projectileSpeed > 0 ? "monster_spit" : null,
      projSpeed: i.projectileSpeed,
      vsStructure: 1,
      vsMinion: 1,
    },
    f = Math.atan2(-l.y, -l.x),
    d = {
      ...su(n, 2, l, f, i.radius, o),
      kind: "monster",
      team: 2,
      monsterType: s.monsterType,
      campId: s.id,
      buffs: [],
      rt: nu(i.radius, i.epic ? 0 : 3, ui.monster, { ...o }, c),
      mon: { home: l, state: ry, camp: t, specialAt: -1, breath: null },
    };
  return G0(d, "rt", "mon");
}

function Ss(n) {
  return n.kind === "tower" || n.kind === "core";
}

function cy(n) {
  return n.alive && !n.invulnerable && !n.rt.untargetable;
}

function Ui(n, t) {
  return !(
    !t.alive ||
    t.invulnerable ||
    t.rt.untargetable ||
    t.team === n.team ||
    (n.team !== 2 && !t.visible[n.team])
  );
}

const y6 = 0.6,
  v6 = 0.25,
  eW = 0.35,
  nW = 1,
  sW = 0.85,
  iW = 0.5,
  s5 = 0.12,
  fy = 24;

function Bm(n, t, e) {
  const s = t - n.pos.x,
    i = e - n.pos.y;
  s * s + i * i > 1e-8 && (n.facing = Math.atan2(i, s));
}

function Hl(n) {
  const t = n.rt;
  ((t.moveMode = Qh), (t.path = null), (t.stuck = 0));
}

function aW(n, t, e) {
  const s = n.rt;
  ((s.moveMode = Jh), (s.dirX = t), (s.dirY = e), (s.path = null));
}

function Ph(n, t, e, s, i) {
  const a = t.rt,
    o = n.nav;
  if (
    ((a.goalX = e),
    (a.goalY = s),
    (a.pathTime = n.state.time),
    (a.pathIdx = 0),
    (a.stuck = 0),
    !i && o.segmentFree(t.pos.x, t.pos.y, e, s, a.navR))
  ) {
    a.path = [{ x: e, y: s }];
    return;
  }
  const r = o.findPath(t.pos.x, t.pos.y, e, s, a.navR);
  ((a.path = r && r.length > 0 ? r : [{ x: e, y: s }]), (!r || o.lastPathPartial) && (a.pathTime += nW));
}

function oW(n, t, e, s) {
  ((t.rt.moveMode = Fm), Ph(n, t, e, s, !1));
}

function Yk(n, t, e) {
  const s = t.rt,
    i = s.path;
  if (!i) return !1;
  const a = n.nav,
    o = t.stats.moveSpeed * e;
  let r = o;
  const l = t.pos.x,
    c = t.pos.y;
  for (; r > 1e-6 && s.pathIdx < i.length;) {
    const m = i[s.pathIdx],
      x = m.x - t.pos.x,
      p = m.y - t.pos.y,
      g = Math.hypot(x, p);
    g <= r
      ? (g > 1e-6 && a.moveWithCollision(t.pos, x, p, s.navR), (r -= g), s.pathIdx++)
      : (a.moveWithCollision(t.pos, (x / g) * r, (p / g) * r, s.navR), (r = 0));
  }
  const f = t.pos.x - l,
    d = t.pos.y - c,
    h = Math.hypot(f, d);
  h > 1e-5 && ((t.facing = Math.atan2(d, f)), (s.moved = !0));
  const u = s.pathIdx >= i.length;
  return (
    !u && h < o * 0.35 ? ((s.stuck += e), s.stuck > eW && Ph(n, t, s.goalX, s.goalY, !0)) : (s.stuck = 0),
    u ? ((s.path = null), !1) : !0
  );
}

const b6 = 0.35,
  t1 = 0.6,
  rW = 0.02;

function lW(n, t, e) {
  const s = t.rt,
    i = n.nav,
    a = -s.dirY,
    o = s.dirX,
    r = i.clearanceAt(t.pos.x, t.pos.y),
    l = i.clearanceAt(t.pos.x + a * t1, t.pos.y + o * t1),
    c = i.clearanceAt(t.pos.x - a * t1, t.pos.y - o * t1);
  if (Math.max(l, c) - r < rW) return !1;
  const f = l >= c ? e : -e;
  return i.moveWithCollision(t.pos, a * f, o * f, s.navR);
}

function cW(n, t, e) {
  const s = t.rt;
  if (s.moveMode === Jh) {
    const i = t.stats.moveSpeed * e,
      a = t.pos.x,
      o = t.pos.y;
    (n.nav.moveWithCollision(t.pos, s.dirX * i, s.dirY * i, s.navR), (t.facing = Math.atan2(s.dirY, s.dirX)));
    const r = t.pos.x - a,
      l = t.pos.y - o,
      c = r * r + l * l;
    (c > 1e-10 && (s.moved = !0), c < i * i * b6 * b6 && lW(n, t, i) && (s.moved = !0));
  } else
    s.moveMode === Fm &&
      (s.path === null && Ph(n, t, s.goalX, s.goalY, !1), Yk(n, t, e) || (s.moveMode = Qh));
}

function dy(n, t, e, s, i) {
  const a = t.rt,
    o = n.state.time,
    r = e - a.goalX,
    l = s - a.goalY,
    c = o - a.pathTime,
    f = a.path;
  if (f === null) {
    if (c < v6) return;
    Ph(n, t, e, s, !1);
  } else
    c > 2 || (c >= v6 && r * r + l * l > y6 * y6)
      ? Ph(n, t, e, s, !1)
      : f.length === 1 && a.pathIdx === 0 && ((f[0].x = e), (f[0].y = s));
  Yk(n, t, i);
}

function Kk(n, t, e, s, i) {
  const a = e - t.pos.x,
    o = s - t.pos.y,
    r = Math.hypot(a, o);
  if (r < 0.05) return !1;
  const l = Math.min(r, t.stats.moveSpeed * i),
    c = t.pos.x,
    f = t.pos.y;
  n.nav.moveWithCollision(t.pos, (a / r) * l, (o / r) * l, t.rt.navR);
  const d = t.pos.x - c,
    h = t.pos.y - f;
  return d * d + h * h > 1e-10 ? ((t.facing = Math.atan2(o, a)), (t.rt.moved = !0), !0) : !1;
}

function hy(n, t, e, s) {
  const i = t.rt;
  return (
    n.nav.nearestFree(e, s, i.navR, t.pos, fy),
    (t.prevPos.x = t.pos.x),
    (t.prevPos.y = t.pos.y),
    (i.path = null),
    i.moveMode === Fm && (i.moveMode = Qh),
    n.grid.rebuild(n.units),
    t.pos
  );
}

function uy(n, t) {
  return {
    mode: t,
    dirX: 1,
    dirY: 0,
    speed: 0,
    left: 0,
    fromX: 0,
    fromY: 0,
    toX: 0,
    toY: 0,
    t: 0,
    dur: 0,
    startTime: n.state.time,
    ignoreWalls: !1,
    hitRadius: -1,
    filter: null,
    hitIds: [],
    onHit: null,
    onEnd: null,
    anim: null,
  };
}

function Zk(n, t, e, s) {
  const i = t.rt;
  i.dash === e &&
    ((i.dash = null),
    e.ignoreWalls &&
      !n.nav.isFree(t.pos.x, t.pos.y, i.navR - 0.05) &&
      n.nav.nearestFree(t.pos.x, t.pos.y, i.navR, t.pos, fy),
    e.onEnd && e.onEnd(s));
}

function iu(n, t, e = "interrupted") {
  const s = t.rt.dash;
  s && Zk(n, t, s, e);
}

const i5 = [];

function py(n, t, e) {
  const s = t.rt,
    i = s.dash;
  if (!i) return;
  const a = t.pos.x,
    o = t.pos.y;
  let r = null;
  if (i.mode === "leap") {
    i.t += e;
    const l = i.t >= i.dur ? 1 : i.t / i.dur;
    ((t.pos.x = i.fromX + (i.toX - i.fromX) * l),
      (t.pos.y = i.fromY + (i.toY - i.fromY) * l),
      l >= 1 && (r = "arrived"));
  } else {
    const l = Math.min(i.left, i.speed * e);
    (i.ignoreWalls
      ? ((t.pos.x += i.dirX * l), (t.pos.y += i.dirY * l))
      : n.nav.moveStraight(t.pos, i.dirX, i.dirY, l, s.navR) < l - 1e-4 && (r = "wall"),
      (i.left -= l),
      !r && i.left <= 1e-6 && (r = "arrived"));
  }
  if (i.onHit && i.hitRadius >= 0) {
    const l = (a + t.pos.x) * 0.5,
      c = (o + t.pos.y) * 0.5,
      f = Math.hypot(t.pos.x - a, t.pos.y - o) * 0.5,
      h = n.grid.query(l, c, f + i.hitRadius, i5) > 0 ? i5.slice() : i5;
    for (let u = 0; u < h.length; u++) {
      const m = h[u];
      if (m === t || !m.alive || i.hitIds.indexOf(m.id) >= 0 || (i.filter && !i.filter(m))) continue;
      const x = i.hitRadius + m.radius;
      if (Fk(m.pos.x, m.pos.y, a, o, t.pos.x, t.pos.y) > x * x) continue;
      i.hitIds.push(m.id);
      const p = i.onHit(m);
      if (s.dash !== i) return;
      if (p === !0) {
        r = "hit";
        break;
      }
    }
  }
  r && Zk(n, t, i, r);
}

const _6 = [];

function w6(n) {
  return n.alive && n.kind !== "tower" && n.kind !== "core" && n.rt.dash === null;
}

function hW(n) {
  const t = n.units,
    e = n.grid;
  for (let i = 0; i < t.length; i++) {
    const a = t[i];
    if (!w6(a)) continue;
    const o = e.query(a.pos.x, a.pos.y, a.radius, _6);
    for (let r = 0; r < o; r++) {
      const l = _6[r];
      if (l.id <= a.id || !w6(l)) continue;
      const c = a.rt.weight,
        f = l.rt.weight;
      if (c === 0 && f === 0) continue;
      let d = a.pos.x - l.pos.x,
        h = a.pos.y - l.pos.y;
      const u = (a.radius + l.radius) * sW,
        m = d * d + h * h;
      if (m >= u * u) continue;
      let x = Math.sqrt(m);
      if (x < 1e-4) {
        const k = (a.id * 2.399963 + l.id) % (Math.PI * 2);
        ((d = Math.cos(k)), (h = Math.sin(k)), (x = 1));
      }
      const p = (u - x) * iW,
        g = c === 0 ? 0 : f === 0 ? 1 : f / (c + f),
        y = f === 0 ? 0 : c === 0 ? 1 : c / (c + f),
        v = d / x,
        _ = h / x;
      ((a.rt.pushX += v * p * g),
        (a.rt.pushY += _ * p * g),
        (l.rt.pushX -= v * p * y),
        (l.rt.pushY -= _ * p * y));
    }
  }
  const s = n.nav;
  for (let i = 0; i < t.length; i++) {
    const a = t[i],
      o = a.rt;
    if (o.pushX === 0 && o.pushY === 0) continue;
    let r = o.pushX,
      l = o.pushY;
    if (((o.pushX = 0), (o.pushY = 0), !a.alive)) continue;
    const c = Math.hypot(r, l);
    (c > s5 && ((r = (r / c) * s5), (l = (l / c) * s5)), s.moveWithCollision(a.pos, r, l, o.navR));
  }
}

const uW = 2.5,
  pW = 1.2,
  mW = 0.4,
  M6 = 0.8,
  pe = {
    hp: 0,
    mana: 0,
    ad: 0,
    ap: 0,
    apPct: 0,
    armor: 0,
    mr: 0,
    asPct: 0,
    moveFlat: 0,
    movePct: 0,
    slow: 0,
    slowResist: 0,
    cdr: 0,
    lifesteal: 0,
    crit: 0,
    critDmg: 0,
    armorPen: 0,
    magicPen: 0,
    hpRegen: 0,
    manaRegen: 0,
    adPct: 0,
    hpPct: 0,
  };

function gW() {
  ((pe.hp = 0),
    (pe.mana = 0),
    (pe.ad = 0),
    (pe.ap = 0),
    (pe.apPct = 0),
    (pe.armor = 0),
    (pe.mr = 0),
    (pe.asPct = 0),
    (pe.moveFlat = 0),
    (pe.movePct = 0),
    (pe.slow = 0),
    (pe.slowResist = 0),
    (pe.cdr = 0),
    (pe.lifesteal = 0),
    (pe.crit = 0),
    (pe.critDmg = 0),
    (pe.armorPen = 0),
    (pe.magicPen = 0),
    (pe.hpRegen = 0),
    (pe.manaRegen = 0),
    (pe.adPct = 0),
    (pe.hpPct = 0));
}
export { RV, Qh, Jh, ry, N3, h6, G0, F3, Ok, CV, LV, NV, Oi, ly, Wk, tu, BV, ql, HV, jk, em, x6, jV, eu, qV, Zo, Xk, XV, KV, ZV, QV, JV, tW, Ss, cy, Ui, fy, Bm, Hl, aW, oW, cW, dy, Kk, hy, uy, iu, py, hW, uW, pW, mW, M6, pe, gW };
