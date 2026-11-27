// 43-data-3.js — data｜151 个顶层语句｜67KB
// 对应 game.pretty.js 第 80196–82715 行
// 关键内容：
//   Hm                    interrupted
//   fW                    interrupted
//   dW                    airborne
//   _o                    slow
//   D0                    gold
//   bW                    levelUp
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { K6, Qd, Xm, Y6, Z6, eo, rn, ui, v0, va, wS, yn, yr } from './01-audio.js';
import { Nh, Se, ea, eh, f5, lm } from './02-data.js';
import { xo } from './18-core.js';
import { Yh, ln } from './33-data-2.js';
import { $f, Gf, Sk, Tk, zm } from './39-ui-7.js';
import { $a, Ck } from './40-ui-8.js';
import { Fk, iy } from './41-ai.js';
import { BV, Bm, CV, F3, G0, HV, Hl, Jh, Kk, LV, M6, N3, Oi, Ok, Qh, Ss, Ui, Wk, Xk, ZV, Zo, aW, cW, cy, dy, em, eu, fy, gW, h6, hy, iu, jk, ly, mW, oW, pW, pe, py, ry, tW, tu, uW, uy } from './42-ai-2.js';

function Hm(n, t, e) {
  if (!t.alive) return !1;
  const s = t.rt;
  (s.dash && iu(n, t, "interrupted"), Ga(t));
  let i = e.dir.x,
    a = e.dir.y;
  const o = Math.hypot(i, a);
  o < 1e-6 ? ((i = Math.cos(t.facing)), (a = Math.sin(t.facing))) : ((i /= o), (a /= o));
  const r = uy(n, "dash");
  return (
    (r.dirX = i),
    (r.dirY = a),
    (r.speed = Math.max(0.1, e.speed)),
    (r.left = Math.max(0, e.distance)),
    (r.dur = r.left / r.speed),
    (r.ignoreWalls = e.ignoreWalls === !0),
    (r.hitRadius = e.onHit ? (e.hitRadius ?? t.radius) : -1),
    (r.filter = e.filter ?? null),
    (r.onHit = e.onHit ?? null),
    (r.onEnd = e.onEnd ?? null),
    (r.anim = e.anim === void 0 ? "dash" : e.anim),
    (s.dash = r),
    (s.path = null),
    (t.facing = Math.atan2(a, i)),
    !0
  );
}

function fW(n, t, e, s, i, a) {
  if (!t.alive) return !1;
  const o = t.rt;
  (o.dash && iu(n, t, "interrupted"), Ga(t));
  const r = { x: t.pos.x, y: t.pos.y };
  n.nav.nearestFree(e, s, o.navR, r, fy);
  const l = uy(n, "leap");
  return (
    (l.fromX = t.pos.x),
    (l.fromY = t.pos.y),
    (l.toX = r.x),
    (l.toY = r.y),
    (l.dur = Math.max(0.05, i)),
    (l.ignoreWalls = !0),
    (l.onEnd = a ?? null),
    (l.anim = "leap"),
    (o.dash = l),
    (o.path = null),
    Bm(t, r.x, r.y),
    !0
  );
}

function dW(n, t, e, s, i, a, onEnd = null) {
  if (!t.alive || t.rt.weight === 0 || iS(t, "airborne") || Ba(t, "slime_cling")) return !1;
  const o = Math.hypot(e, s);
  if (o < 1e-6 || i <= 0) return !1;
  const r = t.rt;
  (r.dash && iu(n, t, "interrupted"), Ga(t));
  const l = uy(n, "forced");
  return (
    (l.dirX = e / o),
    (l.dirY = s / o),
    (l.speed = Math.max(0.1, a)),
    (l.left = i),
    (l.dur = i / l.speed),
    (l.onEnd = onEnd),
    (r.dash = l),
    (r.path = null),
    !0
  );
}

function _o(n, t) {
  gW();
  const e = t.rt;
  let s = !1,
    i = !1;
  const a = t.buffs;
  for (let f = 0; f < a.length; f++) {
    const d = a[f];
    switch (d.id) {
      case "slow":
        d.value > pe.slow && (pe.slow = d.value);
        break;
      case "haste":
        pe.movePct += d.value;
        break;
      case "attack_speed":
        pe.asPct += d.value;
        break;
      // 消耗品的持续增益：都是"加多少"的绝对值，和装备属性同一个出口累加
      case "ad_up":
        pe.ad += d.value;
        break;
      case "ap_up":
        pe.ap += d.value;
        break;
      case "armor_up":
        pe.armor += d.value;
        break;
      case "mr_up":
        pe.mr += d.value;
        break;
      // 每秒回复按最大值的比例算，不是定值
      case "hp_regen":
        pe.hpRegenPct += d.value;
        break;
      case "mana_regen":
        pe.manaRegenPct += d.value;
        break;
      case "scallion_shred":
        pe.armorShred += d.value * d.stacks;
        break;
      case "maggot_aura":
        pe.asPct += d.value * d.stacks;
        break;
      case "frost_insight":
        s = !0;
        break;
      case "star_blessing":
        i = !0;
        break;
    }
  }
  if (t.kind === "hero") {
    t.h.baseLevel !== t.level && ((e.base = f5(t.h.def, t.level)), (t.h.baseLevel = t.level));
    for (let d = 0; d < t.items.length; d++) {
      const h = t.items[d];
      if (!h) continue;
      const u = ln[h].stats;
      ((pe.hp += u.hp ?? 0),
        (pe.mana += u.mana ?? 0),
        (pe.ad += u.ad ?? 0),
        (pe.ap += u.ap ?? 0),
        (pe.apPct += u.apPct ?? 0),
        (pe.armor += u.armor ?? 0),
        (pe.mr += u.mr ?? 0),
        (pe.asPct += u.attackSpeedPct ?? 0),
        (pe.moveFlat += u.moveSpeed ?? 0),
        (pe.cdr += u.cdr ?? 0),
        (pe.lifesteal += u.lifesteal ?? 0),
        (pe.crit += u.critChance ?? 0),
        (pe.critDmg += u.critDamage ?? 0),
        (pe.armorPen += u.armorPen ?? 0),
        (pe.magicPen += u.magicPen ?? 0),
        (pe.hpRegen += u.hpRegen ?? 0),
        (pe.manaRegen += u.manaRegen ?? 0),
        (pe.hpToAdPct += u.hpToAdPct ?? 0),
        (pe.shieldPower += u.shieldPower ?? 0),
        (pe.healPower += u.healPower ?? 0));
    }
    s && (pe.cdr += yn.frostCdr);
    const f = t.h.hooks;
    for (let d = 0; d < f.length; d++) {
      const h = f[d].statMods;
      h && h.call(f[d], n, t, pe);
    }
  } else
    t.kind === "minion" &&
      n.state.teams[t.team].blessingLeft > 0 &&
      ((pe.hpPct += yn.blessingMinionBoost), (pe.adPct += yn.blessingMinionBoost));
  const o = e.base,
    r = t.stats,
    l = r.maxHp,
    c = r.maxMana;
  if (
    ((r.maxHp = (o.maxHp + pe.hp) * (1 + pe.hpPct)),
    (r.maxMana = o.maxMana + pe.mana),
    // 哑铃：最大生命的一部分直接换成物攻（先算 maxHp，再算 ad，顺序不能反）
    (r.ad = (o.ad + pe.ad + r.maxHp * pe.hpToAdPct) * (1 + pe.adPct)),
    (r.ap = (o.ap + pe.ap) * (1 + pe.apPct)),
    (r.armor = Math.max(0, (o.armor + pe.armor) * Math.max(0.2, 1 - pe.armorShred))),
    (r.mr = o.mr + pe.mr),
    (r.attackSpeed = Math.min(uW, o.attackSpeed * Math.max(0.2, 1 + pe.asPct))),
    o.moveSpeed > 0)
  ) {
    const f = pe.slowResist < 0 ? 0 : pe.slowResist > 1 ? 1 : pe.slowResist,
      d = Math.min(0.9, pe.slow * (1 - f));
    r.moveSpeed = Math.max(pW, (o.moveSpeed + pe.moveFlat) * Math.max(0.1, 1 + pe.movePct) * (1 - d));
  } else r.moveSpeed = 0;
  ((r.attackRange = o.attackRange + pe.attackRange),
    (r.cdr = Math.min(mW, o.cdr + pe.cdr)),
    (r.lifesteal = o.lifesteal + pe.lifesteal),
    (r.critChance = Math.min(1, o.critChance + pe.crit)),
    (r.critDamage = o.critDamage + pe.critDmg),
    (r.armorPen = Math.min(M6, o.armorPen + pe.armorPen)),
    (r.magicPen = Math.min(M6, o.magicPen + pe.magicPen)),
    (r.hpRegen = o.hpRegen + pe.hpRegen + r.maxHp * (pe.hpRegenPct + (i ? yn.blessingRegen : 0))),
    (r.manaRegen = o.manaRegen + pe.manaRegen + r.maxMana * (pe.manaRegenPct + (s ? yn.frostManaRegen : 0))),
    // 护盾效率 / 治疗加成：裸装是 0，装备叠上来（小兵/塔的 base 里没有这两个字段）
    (r.shieldPower = (o.shieldPower ?? 0) + pe.shieldPower),
    (r.healPower = (o.healPower ?? 0) + pe.healPower),
    t.alive && (r.maxHp > l && (t.hp += r.maxHp - l), r.maxMana > c && (t.mana += r.maxMana - c)),
    t.hp > r.maxHp && (t.hp = r.maxHp),
    t.mana > r.maxMana && (t.mana = r.maxMana));
}

const k6 = 0.2,
  xW = 40,
  yW = ["s1", "s2", "ult"];

function D0(n, t, e, s, i, a = !1) {
  const o = Math.round(e);
  o <= 0 ||
    ((t.gold += o),
    (t.goldEarned += o),
    (n.state.teams[t.team].gold += o),
    a || n.emit({ type: "gold", unitId: t.id, amount: o, pos: { x: i.x, y: i.y }, reason: s }));
}

function vW(n) {
  const t = lm(n.level),
    e = Se[n.heroId];
  for (const s of yW) {
    const i = n.skills[s],
      a = e.skills[s];
    i.level = t[s];
    const o = Math.max(0, i.level - 1);
    ((i.cost = a.manaCost[o]), i.cd <= 0 && (i.cdMax = a.cooldown[o]));
  }
}

function bW(n, t) {
  (t.level++,
    (t.xpToNext = Z6(t.level)),
    _o(n, t),
    t.alive && ((t.hp += (t.stats.maxHp - t.hp) * k6), (t.mana += (t.stats.maxMana - t.mana) * k6)),
    vW(t),
    n.emit({ type: "levelUp", unitId: t.id, level: t.level }),
    n.fx("level_up", t.pos, t.team, { unitId: t.id }));
}

function nm(n, t, e) {
  if (!(t.level >= eh || !(e > 0))) {
    for (t.xp += e; t.level < eh && t.xp >= t.xpToNext;) ((t.xp -= t.xpToNext), bW(n, t));
    t.level >= eh && ((t.xp = 0), (t.xpToNext = 0));
  }
}

const Qk = (n) => va.xpShare[Math.min(n, va.xpShare.length) - 1];

function _W(n, t, e) {
  if (e && e.kind === "hero" && e.team !== t.team) return e;
  let s = null,
    i = n.state.time - va.assistWindow;
  for (const [a, o] of t.h.damagers) {
    if (o < i) continue;
    const r = n.byId.get(a);
    r && r.kind === "hero" && r.team !== t.team && ((s = r), (i = o));
  }
  return s;
}

function wW(n, t, e, s) {
  const i = n.state,
    a = i.time,
    o = va,
    r = t.streak;
  (t.deaths++, (t.streak = 0), (t.respawnIn = wS(t.level, a)), (t.h.atkOrder = !1), (t.h.pendingCast = null));
  const l = [];
  for (const [y, v] of t.h.damagers) {
    if (a - v > o.assistWindow) continue;
    const _ = n.byId.get(y);
    _ && _.kind === "hero" && _ !== e && _.team !== t.team && l.push(_);
  }
  t.h.damagers.clear();
  let c = 0,
    f = !1,
    d = !1,
    h = 0,
    u = 0;
  if (e) {
    ((c = o.killGold + o.killGoldPerStreak * r - xW * t.h.deathStreak),
      (c = Math.max(o.killGoldMin, Math.min(o.killGoldMax, c))),
      n.firstBlood || ((n.firstBlood = !0), (f = !0), (c += o.firstBloodBonus)),
      (d = r >= 3));
    const y = e.h;
    if (
      (e.kills++,
      e.streak++,
      (u = e.streak),
      (y.multiKill = a - y.lastKillTime <= o.multiKillWindow ? Math.min(5, y.multiKill + 1) : 1),
      (y.lastKillTime = a),
      (y.deathStreak = 0),
      (h = y.multiKill),
      i.teams[e.team].kills++,
      D0(n, e, c, "kill", t.pos),
      l.length > 0)
    ) {
      const v = (c * o.assistRatio) / l.length;
      for (const _ of l) (_.assists++, (_.h.deathStreak = 0), D0(n, _, v, "assist", t.pos));
    }
  }
  t.h.deathStreak++;
  const m = o.shareRadius * o.shareRadius,
    x = [];
  e && x.push(e);
  for (const y of l) x.push(y);
  for (const y of n.heroes) {
    if (y.team === t.team || !y.alive || x.indexOf(y) >= 0) continue;
    const v = y.pos.x - t.pos.x,
      _ = y.pos.y - t.pos.y;
    v * v + _ * _ <= m && x.push(y);
  }
  if (x.length > 0) {
    const y = (o.killXp + o.killXpPerLevel * t.level) * Qk(x.length);
    for (const v of x) nm(n, v, y);
  }
  n.emit({
    type: "heroKill",
    victimId: t.id,
    killerId: e ? e.id : s ? s.id : -1,
    assistIds: l.map((y) => y.id),
    multiKill: h,
    streak: u,
    firstBlood: f,
    shutdown: d,
    bounty: c,
  });
  for (const y of t.h.hooks) y.onDeath && y.onDeath(n, t, e ?? s);
  if (e)
    for (const y of e.h.hooks) (y.onKill && y.onKill(n, e, t), y.onTakedown && y.onTakedown(n, e, t, !0));
  for (const y of l) for (const v of y.h.hooks) v.onTakedown && v.onTakedown(n, y, t, !1);
  const p = t.team === 0 ? 1 : 0;
  if (e) {
    let y = null;
    (f
      ? (y = "first_blood")
      : h >= 5
        ? (y = "penta_kill")
        : h === 4
          ? (y = "quadra_kill")
          : h === 3
            ? (y = "triple_kill")
            : h === 2
              ? (y = "double_kill")
              : d
                ? (y = "shutdown")
                : u >= 7
                  ? (y = "legendary")
                  : u === 5
                    ? (y = "unstoppable")
                    : u === 3 && (y = "killing_spree"),
      y && n.emit({ type: "announce", key: y, team: e.team, unitId: e.id, victimId: t.id }));
  }
  let g = !1;
  for (const y of n.heroes) y.team === t.team && y.alive && (g = !0);
  g || n.emit({ type: "announce", key: "ace", team: p, unitId: e ? e.id : void 0 });
}

function MW(n, t, e) {
  const s = Y6[t.minionType],
    i = va,
    a = e && e.kind === "hero" && e.team !== t.team ? e : null;
  if (a) {
    (a.cs++,
      D0(n, a, s.gold, "lasthit", t.pos),
      n.fx("gold_gain", t.pos, a.team, { unitId: a.id, value: s.gold }));
    for (const l of a.h.hooks) l.onKill && l.onKill(n, a, t);
  }
  const o = i.shareRadius * i.shareRadius,
    r = [];
  a && r.push(a);
  for (const l of n.heroes) {
    if (l.team === t.team || !l.alive || l === a) continue;
    const c = l.pos.x - t.pos.x,
      f = l.pos.y - t.pos.y;
    c * c + f * f > o || (r.push(l), D0(n, l, s.gold * i.proximityGoldRatio, "passive", t.pos));
  }
  if (r.length > 0) {
    const l = s.xp * Qk(r.length);
    for (const c of r) nm(n, c, l);
  }
}

const kW = 0.25,
  SW = 0.05,
  TW = 3,
  EW = 2.5;

function AW(n) {
  for (const t of n.map.camps) n.camps.push({ def: t, members: [], respawnAt: t.firstSpawn });
}

function RW(n, t) {
  const e = t.def;
  for (let s = 0; s < e.spawns.length; s++) {
    const i = tW(n, t, s);
    (t.members.push(i), n.addUnit(i));
  }
  (n.emit({
    type: "monsterSpawn",
    campId: e.id,
    monsterType: e.monsterType,
    pos: { x: e.pos.x, y: e.pos.y },
  }),
    rn[e.monsterType].epic && n.emit({ type: "announce", key: "epic_spawn", team: 2 }));
}

function CW(n) {
  const t = n.state.time,
    e = n.state.camps;
  for (let s = 0; s < n.camps.length; s++) {
    const i = n.camps[s];
    i.members.length === 0 && !n.opts.noCamps && t + 1e-9 >= i.respawnAt && RW(n, i);
    const a = i.members.length > 0;
    ((e[s].alive = a), (e[s].respawnIn = a ? 0 : Math.max(0, i.respawnAt - t)));
  }
}

const S6 = [];

function LW(n, t, e) {
  const s = yn,
    i = n.state.time;
  let a = e.pos.x - t.pos.x,
    o = e.pos.y - t.pos.y;
  const r = Math.hypot(a, o);
  r > 1e-4 ? ((a /= r), (o /= r)) : ((a = Math.cos(t.facing)), (o = Math.sin(t.facing)));
  const l = s.breathWarn + s.breathTime,
    c = {
      id: n.allocId(),
      ownerId: t.id,
      pos: { x: t.pos.x, y: t.pos.y },
      dir: { x: a, y: o },
      radius: s.breathRadius,
      angle: s.breathAngle,
      age: 0,
      warn: s.breathWarn,
      duration: l,
      start: i,
      spraying: !1,
      ticksLeft: s.breathTicks,
      nextTick: i + s.breathWarn,
      tickDamage: (t.stats.ad * s.breathAdRatio) / s.breathTicks,
    };
  ((t.mon.breath = c),
    (t.mon.specialAt = i + s.breathEvery),
    n.cones.push(c),
    (t.facing = Math.atan2(o, a)),
    eu(n, t, "cast_s1", l, !1),
    n.fx("drake_breath_warn", t.pos, 2, {
      unitId: t.id,
      targetId: e.id,
      dir: { x: a, y: o },
      radius: s.breathRadius,
      angle: s.breathAngle,
      value: s.breathWarn,
    }));
}

function Jk(n, t) {
  const e = t.mon.breath;
  if (!e) return;
  t.mon.breath = null;
  const s = n.cones.indexOf(e);
  (s >= 0 && n.cones.splice(s, 1), t.rt.act === "cast_s1" && (t.rt.act = null));
}

function IW(n, t, e) {
  const s = n.grid.query(e.pos.x, e.pos.y, e.radius, S6),
    i = e.angle * 0.5,
    a = [];
  for (let o = 0; o < s; o++) {
    const r = S6[o];
    if (r.team === 2 || !cy(r) || r.kind === "tower" || r.kind === "core") continue;
    const l = r.pos.x - e.pos.x,
      c = r.pos.y - e.pos.y,
      f = Math.hypot(l, c);
    if (!(f > e.radius + r.radius)) {
      if (f > r.radius) {
        const d = (l * e.dir.x + c * e.dir.y) / f;
        if (Math.acos(d > 1 ? 1 : d < -1 ? -1 : d) > i + Math.asin(Math.min(1, r.radius / f))) continue;
      }
      a.push(r);
    }
  }
  for (const o of a) o.alive && Bo(n, t, o, e.tickDamage, "magic", "skill");
}

function PW(n, t, e) {
  const s = t.mon.breath;
  if (!s) return !1;
  const i = yn,
    a = n.state.time;
  return (
    (s.age += e),
    (t.facing = Math.atan2(s.dir.y, s.dir.x)),
    !s.spraying &&
      a + 1e-9 >= s.start + s.warn &&
      ((s.spraying = !0),
      n.fx("drake_breath", s.pos, 2, {
        unitId: t.id,
        dir: { x: s.dir.x, y: s.dir.y },
        radius: s.radius,
        angle: s.angle,
        value: i.breathTime,
      })),
    s.spraying &&
      s.ticksLeft > 0 &&
      a + 1e-9 >= s.nextTick &&
      (s.ticksLeft--, (s.nextTick += i.breathTime / i.breathTicks), IW(n, t, s)),
    a + 1e-9 >= s.start + s.duration
      ? (Jk(n, t), t.rt.atkCd < i.breathRecover && (t.rt.atkCd = i.breathRecover), !1)
      : !0
  );
}

function DW(n, t) {
  if (!(t.team === 2 || !t.alive))
    for (const e of n.mon.camp.members) e.mon.state === ry && ((e.mon.state = N3), (e.targetId = t.id));
}

function zW(n, t, e) {
  const s = t.rt,
    i = t.mon,
    a = t.stats;
  if (($m(n, t, e), i.breath && PW(n, t, e))) return;
  if (s.dash) {
    py(n, t, e);
    return;
  }
  if (s.stunned) return;
  const o = i.camp.def;
  if (
    (i.state !== N3
      ? (i.specialAt = -1)
      : i.specialAt < 0 && t.monsterType === "abyss_drake" && (i.specialAt = n.state.time + yn.breathFirst),
    i.state === N3)
  ) {
    const f = n.byId.get(t.targetId),
      d = yn.leash,
      h = t.pos.x - o.pos.x,
      u = t.pos.y - o.pos.y;
    let m = !!f && Ui(t, f) && h * h + u * u <= d * d;
    if (m && f) {
      const x = f.pos.x - o.pos.x,
        p = f.pos.y - o.pos.y,
        g = d + TW;
      m = x * x + p * p <= g * g;
    }
    if (m && f) {
      if (i.specialAt >= 0 && n.state.time >= i.specialAt && s.windupLeft <= 0) {
        const x = yn.breathRadius - 1,
          p = f.pos.x - t.pos.x,
          g = f.pos.y - t.pos.y;
        if (p * p + g * g <= x * x) {
          LW(n, t, f);
          return;
        }
      }
      Gm(n, t, f, e, !0);
      return;
    }
    if (h * h + u * u <= d * d) {
      const x = n.byId.get(s.lastAttackerId);
      if (x && x !== f && x.team !== 2 && Ui(t, x) && n.state.time - t.lastHitTime < EW) {
        const p = x.pos.x - o.pos.x,
          g = x.pos.y - o.pos.y;
        if (p * p + g * g <= d * d) {
          (Ga(t), (t.targetId = x.id));
          return;
        }
      }
    }
    (Ga(t), (i.state = h6), (t.targetId = -1));
  }
  const r = i.home.x - t.pos.x,
    l = i.home.y - t.pos.y,
    c = r * r + l * l;
  if (i.state === h6) {
    (t.hp < a.maxHp && (t.hp = Math.min(a.maxHp, t.hp + a.maxHp * kW * e)),
      c > 0.3 * 0.3
        ? s.rooted || dy(n, t, i.home.x, i.home.y, e)
        : ((i.state = ry), (t.facing = Math.atan2(-i.home.y, -i.home.x))));
    return;
  }
  (t.hp < a.maxHp && (t.hp = Math.min(a.maxHp, t.hp + a.maxHp * SW * e)),
    c > 0.6 * 0.6 && !s.rooted && Kk(n, t, i.home.x, i.home.y, e));
}

function NW(n, t, e) {
  const s = n.state,
    i = rn[t.monsterType],
    a = t.mon.camp,
    o = a.members.indexOf(t);
  (o >= 0 && a.members.splice(o, 1),
    a.members.length === 0 && (a.respawnAt = s.time + a.def.respawn),
    Jk(n, t),
    n.fx("monster_slain", t.pos, 2, { unitId: t.id }));
  let r = null;
  if (e && e.kind === "hero") r = e;
  else {
    const h = n.byId.get(t.rt.lastAttackerId);
    h && h.kind === "hero" && (r = h);
  }
  if (!r) return;
  (r.cs++, D0(n, r, i.gold, "monster", t.pos));
  const l = va.shareRadius * va.shareRadius,
    c = [r];
  for (const h of n.heroes) {
    if (h === r || h.team !== r.team || !h.alive) continue;
    const u = h.pos.x - t.pos.x,
      m = h.pos.y - t.pos.y;
    u * u + m * m <= l && c.push(h);
  }
  const f = va.xpShare[Math.min(c.length, va.xpShare.length) - 1];
  for (const h of c) nm(n, h, i.xp * f);
  for (const h of r.h.hooks) h.onKill && h.onKill(n, r, t);
  const d = yn;
  switch (t.monsterType) {
    case "frost_golem":
      r.alive &&
        (Wn(n, r, "frost_insight", { duration: d.buffDuration, key: "camp", merge: "replace" }),
        n.fx("buff_gain", r.pos, r.team, { unitId: r.id }));
      break;
    case "ember_golem":
      r.alive &&
        (Wn(n, r, "ember_might", { duration: d.buffDuration, key: "camp", merge: "replace" }),
        n.fx("buff_gain", r.pos, r.team, { unitId: r.id }));
      break;
    case "abyss_drake":
      for (const h of n.heroes)
        h.team === r.team && (D0(n, h, d.drakeTeamGold, "monster", h.pos), nm(n, h, d.drakeTeamXp));
      (n.emit({
        type: "epicSlain",
        monsterType: t.monsterType,
        team: r.team,
        pos: { x: t.pos.x, y: t.pos.y },
      }),
        n.emit({ type: "announce", key: "epic_slain", team: r.team, unitId: r.id }));
      break;
    case "star_colossus":
      for (const h of n.heroes) h.team === r.team && D0(n, h, d.colossusTeamGold, "monster", h.pos);
      s.teams[r.team].blessingLeft = d.blessingDuration;
      for (const h of n.units) h.kind === "minion" && h.team === r.team && h.alive && _o(n, h);
      (n.emit({
        type: "epicSlain",
        monsterType: t.monsterType,
        team: r.team,
        pos: { x: t.pos.x, y: t.pos.y },
      }),
        n.emit({ type: "announce", key: "epic_slain", team: r.team, unitId: r.id }));
      break;
  }
}

function tS(n, t, e, s, i) {
  const a = {
    id: n.allocId(),
    visual: t,
    team: i,
    ownerId: e.id,
    pos: { x: s.x, y: s.y },
    prevPos: { x: s.x, y: s.y },
    dir: { x: 1, y: 0 },
    speed: 0,
    radius: 0.25,
    targetId: -1,
    traveled: 0,
    maxRange: 0,
    homing: !1,
    pierce: !1,
    dead: !1,
    filter: null,
    hitIds: [],
    onHit: null,
    onEnd: null,
    basic: !1,
    ad: 0,
    dtype: "physical",
    vsStructure: 1,
    vsMinion: 1,
  };
  return (
    G0(a, "filter", "onHit", "onEnd", "hitIds"),
    n.projectiles.push(a),
    n.emit({ type: "projectileSpawn", id: a.id, visual: t, pos: { x: s.x, y: s.y }, ownerId: e.id }),
    a
  );
}

function FW(n, t) {
  const e = tS(n, t.visual, t.owner, t.from, t.owner.team);
  ((e.homing = !0),
    (e.speed = Math.max(1, t.speed)),
    (e.radius = t.radius ?? 0.25),
    (e.targetId = t.target.id),
    (e.onHit = t.onHit ?? null),
    (e.onEnd = t.onEnd ?? null));
  const s = t.target.pos.x - t.from.x,
    i = t.target.pos.y - t.from.y,
    a = Math.hypot(s, i);
  return (a > 1e-6 && ((e.dir.x = s / a), (e.dir.y = i / a)), e);
}

function my(n, t) {
  const e = t.team ?? t.owner.team,
    s = tS(n, t.visual, t.owner, t.from, e),
    i = Math.hypot(t.dir.x, t.dir.y);
  return (
    i > 1e-6
      ? ((s.dir.x = t.dir.x / i), (s.dir.y = t.dir.y / i))
      : ((s.dir.x = Math.cos(t.owner.facing)), (s.dir.y = Math.sin(t.owner.facing))),
    (s.speed = Math.max(1, t.speed)),
    (s.radius = t.radius),
    (s.maxRange = t.range),
    (s.pierce = t.pierce === !0),
    (s.filter = t.filter ?? null),
    (s.onHit = t.onHit ?? null),
    (s.onEnd = t.onEnd ?? null),
    s
  );
}

function sm(n, t) {
  t.dead ||
    ((t.dead = !0),
    n.emit({ type: "projectileEnd", id: t.id, visual: t.visual, pos: { x: t.pos.x, y: t.pos.y } }),
    t.onEnd && t.onEnd(n, t));
}

function eS(n, t, e) {
  return (
    n.emit({
      type: "projectileHit",
      id: t.id,
      visual: t.visual,
      pos: { x: t.pos.x, y: t.pos.y },
      targetId: e.id,
    }),
    t.onHit ? t.onHit(n, t, e) === !0 : !1
  );
}

function UW(n, t) {
  return t.team !== n.team && (t.kind === "hero" || t.kind === "minion" || t.kind === "monster") && cy(t);
}

const T6 = [],
  h0 = [],
  fl = [];

function OW(n, t, e) {
  const s = n.byId.get(t.targetId);
  if (!s || !s.alive || s.rt.untargetable) {
    sm(n, t);
    return;
  }
  const i = s.pos.x - t.pos.x,
    a = s.pos.y - t.pos.y,
    o = Math.hypot(i, a),
    r = t.speed * e;
  if (o <= r + s.radius * 0.5) {
    ((t.pos.x = s.pos.x), (t.pos.y = s.pos.y), (t.traveled += o), eS(n, t, s), sm(n, t));
    return;
  }
  ((t.dir.x = i / o),
    (t.dir.y = a / o),
    (t.pos.x += t.dir.x * r),
    (t.pos.y += t.dir.y * r),
    (t.traveled += r));
}

function BW(n, t, e) {
  const s = t.maxRange - t.traveled,
    i = Math.min(t.speed * e, s),
    a = t.pos.x,
    o = t.pos.y,
    r = a + t.dir.x * i,
    l = o + t.dir.y * i,
    c = n.grid.query((a + r) * 0.5, (o + l) * 0.5, i * 0.5 + t.radius, T6);
  ((h0.length = 0), (fl.length = 0));
  for (let f = 0; f < c; f++) {
    const d = T6[f];
    if (
      !d.alive ||
      d.id === t.ownerId ||
      t.hitIds.indexOf(d.id) >= 0 ||
      (t.filter ? !t.filter(d) : !UW(t, d))
    )
      continue;
    const h = t.radius + d.radius;
    if (Fk(d.pos.x, d.pos.y, a, o, r, l) > h * h) continue;
    const u = iy(d.pos.x, d.pos.y, a, o, r, l);
    let m = h0.length;
    for (h0.push(d), fl.push(u); m > 0 && fl[m - 1] > u;) ((h0[m] = h0[m - 1]), (fl[m] = fl[m - 1]), m--);
    ((h0[m] = d), (fl[m] = u));
  }
  if (h0.length > 0) {
    const f = h0.slice(),
      d = fl.slice();
    for (let h = 0; h < f.length; h++) {
      const u = f[h];
      if (!u.alive) continue;
      (t.hitIds.push(u.id), (t.pos.x = a + (r - a) * d[h]), (t.pos.y = o + (l - o) * d[h]));
      const m = eS(n, t, u);
      if (t.dead) return;
      if (m || !t.pierce) {
        ((t.traveled += i * d[h]), sm(n, t));
        return;
      }
    }
  }
  ((t.pos.x = r), (t.pos.y = l), (t.traveled += i), t.traveled >= t.maxRange - 1e-6 && sm(n, t));
}

function HW(n, t) {
  const e = n.projectiles,
    s = e.length;
  for (let a = 0; a < s; a++) {
    const o = e[a];
    o.dead || ((o.prevPos.x = o.pos.x), (o.prevPos.y = o.pos.y), o.homing ? OW(n, o, t) : BW(n, o, t));
  }
  let i = 0;
  for (let a = 0; a < e.length; a++) {
    const o = e[a];
    o.dead || (e[i++] = o);
  }
  e.length = i;
}

const $W = ["top", "mid", "bot"],
  GW = 0.1,
  E6 = 10,
  VW = 0.5,
  im = [];

function nS(n) {
  for (const t of [0, 1]) {
    let e = !1;
    for (const i of $W) {
      const [a, o, r] = n.towers[t][i];
      (a && (a.invulnerable = !1),
        o && (o.invulnerable = a !== null),
        r && (r.invulnerable = a !== null || o !== null),
        r || (e = !0));
    }
    const s = n.cores[t];
    s.alive && (s.invulnerable = !e);
  }
}

function WW(n, t) {
  const e = t.stats.attackRange,
    s = n.state.time - Ok;
  let i = !1,
    a = null,
    o = 1 / 0,
    r = null,
    l = 1 / 0,
    c = null,
    f = 1 / 0;
  const d = n.grid.query(t.pos.x, t.pos.y, Math.max(e, E6), im);
  for (let m = 0; m < d; m++) {
    const x = im[m];
    if (!x.alive || x.team === t.team || x.team === 2) continue;
    const p = Math.hypot(x.pos.x - t.pos.x, x.pos.y - t.pos.y);
    if ((x.kind === "minion" && p <= E6 && (i = !0), !(p - x.radius > e || !Ui(t, x)))) {
      if (x.kind === "hero")
        (x.rt.hitHeroTime >= s && p < o && ((a = x), (o = p)), p < f && ((c = x), (f = p)));
      else if (x.kind === "minion") {
        const g = p + (x.minionType === "siege" || x.minionType === "super" ? 0 : 1e3);
        g < l && ((r = x), (l = g));
      }
    }
  }
  t.rt.backdoor = !i;
  const h = t.targetId >= 0 ? n.byId.get(t.targetId) : void 0,
    u = !!h && Ui(t, h) && Math.hypot(h.pos.x - t.pos.x, h.pos.y - t.pos.y) - h.radius <= e;
  if (a && !(u && h && h.kind === "hero" && h.rt.hitHeroTime >= s)) t.targetId = a.id;
  else if (!u) {
    const m = r ?? c;
    t.targetId = m ? m.id : -1;
  }
}

function jW(n, t, e) {
  const s = t.rt,
    i = n.state.time;
  if (($m(n, t, e), i >= s.thinkAt && ((s.thinkAt = i + GW), WW(n, t)), t.targetId >= 0)) {
    const a = n.byId.get(t.targetId);
    a && Ui(t, a) ? Gm(n, t, a, e, !1) : (t.targetId = -1);
  }
  t.kind === "core" &&
    t.hp < t.stats.maxHp &&
    i - t.lastHitTime >= eo.regenDelay &&
    (t.hp = Math.min(t.stats.maxHp, t.hp + eo.regen * e));
}

function qW(n, t, e) {
  const s = n.state,
    i = t.team === 0 ? 1 : 0,
    a = K6[t.tier];
  ((n.towers[t.team][t.lane][t.tier - 1] = null), n.nav.removeObstacle(t.id), s.teams[i].towersDestroyed++);
  const o = { x: t.pos.x, y: t.pos.y };
  (n.emit({ type: "towerDestroyed", unitId: t.id, team: t.team, lane: t.lane, tier: t.tier, pos: o }),
    n.fx("tower_destroyed", t.pos, t.team, { unitId: t.id }));
  const r = e && e.kind === "hero" ? e : null;
  n.emit({ type: "announce", key: "tower_destroyed", team: i, unitId: r ? r.id : void 0 });
  for (const l of n.heroes)
    l.team === i && D0(n, l, a.teamGold + (l === r ? a.lastHitGold : 0), "tower", t.pos);
  if (r) for (const l of r.h.hooks) l.onKill && l.onKill(n, r, t);
  nS(n);
}

function XW(n, t) {
  const e = n.state,
    s = t.team === 0 ? 1 : 0;
  (n.nav.removeObstacle(t.id),
    (e.over = !0),
    (e.winner = s),
    (e.endTime = e.time),
    n.fx("core_destroyed", t.pos, t.team, { unitId: t.id }),
    n.emit({ type: "gameOver", winner: s }),
    n.emit({ type: "announce", key: s === 0 ? "victory" : "defeat", team: s }));
  // 胜利方自动庆祝：动作一直循环到结算界面关掉（dur 0 = 不过期）
  for (const i of n.heroes) if (i.alive && i.team === s) eu(n, i, "cheer", 0, !0);
}

function YW(n, t) {
  const e = n.state,
    s = n.map.bases;
  for (const i of n.heroes) {
    if (!i.alive) continue;
    const a = s[i.team],
      o = i.pos.x - a.fountain.x,
      r = i.pos.y - a.fountain.y;
    if (o * o + r * r > a.fountainRadius * a.fountainRadius) continue;
    const l = i.stats;
    (i.hp < l.maxHp && (i.hp = Math.min(l.maxHp, i.hp + l.maxHp * Xm.regenRatio * t)),
      i.mana < l.maxMana && (i.mana = Math.min(l.maxMana, i.mana + l.maxMana * Xm.regenRatio * t)));
    const c = Dh(i, "fountain");
    c ? (c.timeLeft = 0.3) : Wn(n, i, "fountain", { duration: 0.3 });
    // 晦气只有在泉水里才会慢慢消解
    const gl = Dh(i, "paperboy_gloom");
    if (gl && gl.stacks > 0) {
      i.h._pbFountainDecay = (i.h._pbFountainDecay ?? 0) + t * 2.5;
      if (i.h._pbFountainDecay >= 1) {
        const drop = Math.floor(i.h._pbFountainDecay);
        i.h._pbFountainDecay -= drop;
        gl.stacks -= drop;
        gl.stacks <= 0 && Va(n, i, "paperboy_gloom");
      }
    }
  }
  if (e.tick % Math.round(VW / t) === 0)
    for (const i of s) {
      if (n.grid.query(i.fountain.x, i.fountain.y, i.fountainRadius, im) === 0) continue;
      const o = im.slice();
      for (const r of o) {
        if (!r.alive || r.team === i.team || r.team === 2) continue;
        const l = r.pos.x - i.fountain.x,
          c = r.pos.y - i.fountain.y;
        l * l + c * c > i.fountainRadius * i.fountainRadius ||
          Bo(n, null, r, r.stats.maxHp * Xm.enemyDamageRatio, "true", "env");
      }
    }
}

const KW = 2,
  ZW = 2,
  QW = 1,
  JW = 0.5,
  tj = 3,
  ej = 0.2;

function Bo(n, t, e, s, i, a = "skill", o = null, r = !1) {
  const l = n.state;
  if (l.over || !e.alive || !(s > 0) || e.invulnerable || e.rt.untargetable) return 0;
  const c = l.time,
    f = { amount: s, dtype: i, kind: a, slot: o, crit: r };
  if (t && t.kind === "hero") {
    const g = t.h.hooks;
    for (let y = 0; y < g.length; y++) {
      const v = g[y];
      v.modifyDamageDealt && v.modifyDamageDealt(n, t, e, f);
    }
    l.teams[t.team].blessingLeft > 0 && Ba(t, "star_blessing") && (f.amount *= 1 + yn.blessingDamage);
  }
  if (e.kind === "hero") {
    const g = e.h.hooks;
    for (let y = 0; y < g.length; y++) {
      const v = g[y];
      v.modifyDamageTaken && v.modifyDamageTaken(n, e, t, f);
    }
    // 纸札人大招「扎筋点睛」：绑定友军分摊 30% 伤害并叠晦气；绑定自己时不减伤，只给攻击者叠晦气
    if (a !== "redirect" && a !== "env") {
      const pb = Dh(e, "paperboy_bound");
      if (pb && pb.sourceId >= 0) {
        const caster = n.byId.get(pb.sourceId);
        if (caster && caster.alive && Ba(caster, "paperboy_bind")) {
          const isSelf = caster.id === e.id,
            share = isSelf ? 0 : (pb.value ?? 0.3),
            rawAmt = f.amount,
            xfer = rawAmt * share;
          if (!isSelf && xfer > 0) f.amount -= xfer;
          if (t && t.alive && t.team !== e.team && !Ss(t)) {
            const addStacks = Math.max(1, Math.min(6, Math.round(rawAmt / 95)));
            Wn(n, t, "paperboy_gloom", {
              duration: 1 / 0,
              stacks: addStacks,
              maxStacks: 99,
              sourceId: caster.id,
              key: "paperboy_gloom",
            });
            n.fx("paperboy_curse_link", e.pos, caster.team, {
              unitId: caster.id,
              from: { x: e.pos.x, y: e.pos.y },
              to: { x: t.pos.x, y: t.pos.y },
            });
          }
          !isSelf && xfer > 0 && Bo(n, t, caster, xfer, i, "redirect", o, !1);
        }
      }
    }
  } else
    Ss(e) &&
      (e.rt.backdoor && (f.amount *= 1 - yr.backdoorReduction),
      c > Qd.start && (f.amount *= 1 + ((c - Qd.start) / 60) * Qd.structureVulnPerMin));
  if (t && t.buffs && t.buffs.length > 0 && a !== "env") {
    let w = 1;
    for (let g = 0; g < t.buffs.length; g++)
      t.buffs[g].id === "horseman_weak" && (w *= 1 - Math.min(0.8, Math.max(0, t.buffs[g].value)));
    w < 1 && (f.amount *= Math.max(0.2, w));
  }
  let d = 1;
  const h = e.buffs;
  for (let g = 0; g < h.length; g++)
    h[g].id === "dmg_reduction" && (d *= 1 - Math.min(1, Math.max(0, h[g].value)));
  d < 1 && (f.amount *= Math.max(ej, d));
  let u = f.amount;
  if (i === "physical") {
    const g = e.stats.armor * (1 - (t ? t.stats.armorPen : 0));
    u *= 600 / (600 + Math.max(0, g));
  } else if (i === "magic") {
    const g = e.stats.mr * (1 - (t ? t.stats.magicPen : 0));
    u *= 600 / (600 + Math.max(0, g));
  }
  if (!(u > 0)) return 0;
  const m = e.shield > 0 ? uj(n, e, u) : u,
    x = Math.min(e.hp, m);
  e.hp -= m;
  const p = u - m + x;
  let saved = !1;
  if (e.hp <= 0 && e.kind === "hero") {
    const g = e.h.hooks;
    for (let y = 0; y < g.length; y++) {
      const v = g[y];
      if (v.onLethal && v.onLethal(n, e, t)) {
        saved = !0;
        break;
      }
    }
  }
  if (
    ((e.lastHitTime = c),
    t &&
      ((e.rt.lastAttackerId = t.id),
      e.kind === "hero"
        ? ((e.dmgTaken += p),
          t.team !== e.team && ((t.rt.hitHeroTime = c), (t.rt.hitHeroId = e.id)),
          t.kind === "hero"
            ? ((t.dmgDealt += p),
              (t.h.lastCombatTime = c),
              (e.h.lastCombatTime = c),
              e.h.damagers.set(t.id, c))
            : Ss(t) && (e.h.lastCombatTime = c))
        : t.kind === "hero" && Ss(e)
          ? (t.dmgTower += p)
          : e.kind === "monster" && DW(e, t)),
    n.emit({
      type: "damage",
      targetId: e.id,
      sourceId: t ? t.id : -1,
      amount: p,
      dtype: i,
      crit: r,
      pos: { x: e.pos.x, y: e.pos.y },
      skill: a === "skill",
    }),
    e.kind === "hero" &&
      (Ba(e, "recall") && Va(n, e, "recall"),
      t && (t.kind === "hero" || Ss(t)) && Ba(e, "restore") && Va(n, e, "restore")),
    !saved && e.hp <= 0 && ((e.hp = 0), nj(n, e, t)),
    e.kind === "hero" && a !== "env")
  ) {
    const g = e.h.hooks;
    for (let y = 0; y < g.length; y++) {
      const v = g[y];
      v.onDamageTaken && v.onDamageTaken(n, e, t, p, f);
    }
  }
  if (t && t.kind === "hero")
    if (a === "skill") {
      const g = t.h.hooks;
      for (let y = 0; y < g.length; y++) {
        const v = g[y];
        v.onSkillHit && v.onSkillHit(n, t, e, p, f);
      }
    } else a === "basic" && t.alive && t.stats.lifesteal > 0 && !Ss(e) && gy(n, t, t, p * t.stats.lifesteal);
  return p;
}

function gy(n, t, e, s, i = !1) {
  if (!e.alive || !(s > 0)) return 0;
  const a = e.hp;
  e.hp = Math.min(e.stats.maxHp, a + s);
  const o = e.hp - a;
  return (
    o >= 1 && !i && n.emit({ type: "heal", targetId: e.id, amount: o, pos: { x: e.pos.x, y: e.pos.y } }),
    o
  );
}

function nj(n, t, e) {
  if (!t.alive) return;
  const s = n.state;
  ((t.alive = !1), (t.hp = 0));
  const i = t.rt;
  ((i.windupLeft = 0),
    (i.windupTarget = -1),
    i.dash && iu(n, t, "interrupted"),
    dj(n, t),
    Hl(t),
    (i.act = null),
    (i.lockUntil = 0),
    (t.targetId = -1),
    (t.anim = "dead"),
    (t.animStart = s.time),
    (t.animDur = 1.5));
  const a = t.kind === "hero" ? _W(n, t, e) : null,
    o = a ? a.id : e ? e.id : -1;
  switch (
    (n.emit({
      type: "death",
      unitId: t.id,
      kind: t.kind,
      team: t.team,
      killerId: o,
      pos: { x: t.pos.x, y: t.pos.y },
    }),
    t.kind)
  ) {
    case "hero":
      wW(n, t, a, e);
      break;
    case "minion":
      MW(n, t, e);
      break;
    case "monster":
      NW(n, t, e);
      break;
    case "tower":
      qW(n, t, e);
      break;
    case "core":
      XW(n, t);
      break;
  }
}

function xy(n, t) {
  t.rt.revealUntil = n.state.time + ui.revealOnAttack;
}

function yy(n, t, e = 0) {
  const s = n.stats.attackRange + t.radius + e,
    i = n.pos.x - t.pos.x,
    a = n.pos.y - t.pos.y;
  return i * i + a * a <= s * s;
}

function Ga(n) {
  const t = n.rt;
  t.windupLeft <= 0 ||
    ((t.windupLeft = 0), (t.windupTarget = -1), (t.atkCd = 0), t.act === "attack" && (t.act = null));
}

function sj(n, t) {
  const e = t.rt,
    s = n.state.time;
  return (
    t.alive &&
    !e.stunned &&
    !e.highSight &&
    !e.noAttack &&
    e.dash === null &&
    e.windupLeft <= 0 &&
    e.atkCd <= 0 &&
    s >= e.lockUntil &&
    s >= e.disarmUntil
  );
}

function ij(n, t, e) {
  const s = t.rt,
    i = 1 / Math.max(0.1, t.stats.attackSpeed),
    a = Math.min(i, LV);
  if (
    ((s.atkCd = i),
    (s.windupLeft = a * s.atk.windup),
    (s.windupTarget = e.id),
    (t.targetId = e.id),
    Bm(t, e.pos.x, e.pos.y),
    eu(n, t, "attack", a, !0),
    n.emit({ type: "attack", unitId: t.id, targetId: e.id }),
    t.kind === "hero")
  ) {
    Ba(t, "recall") && Va(n, t, "recall");
    const o = t.h.hooks;
    for (let r = 0; r < o.length; r++) {
      const l = o[r];
      l.onBasicAttackStart && l.onBasicAttackStart(n, t, e);
    }
  }
}

function $m(n, t, e) {
  const s = t.rt;
  if ((s.atkCd > 0 && (s.atkCd -= e), s.windupLeft <= 0)) return;
  const i = n.byId.get(s.windupTarget);
  if (s.stunned || !i || !Ui(t, i) || !yy(t, i, KW)) {
    Ga(t);
    return;
  }
  if (((s.windupLeft -= e), s.windupLeft > 1e-9)) return;
  ((s.windupLeft = 0), (s.windupTarget = -1), xy(n, t));
  const a = s.atk;
  if (a.visual) {
    const o = FW(n, { visual: a.visual, owner: t, from: t.pos, target: i, speed: a.projSpeed, onHit: aj });
    ((o.basic = !0),
      (o.ad = t.stats.ad),
      (o.dtype = a.dtype),
      (o.vsStructure = a.vsStructure),
      (o.vsMinion = a.vsMinion));
    if (t.kind === "hero") {
      const hks = t.h.hooks;
      for (let r = 0; r < hks.length; r++) {
        const l = hks[r];
        l.onBasicAttackLaunch && l.onBasicAttackLaunch(n, t, i);
      }
    }
  } else sS(n, t, i, t.stats.ad, a.dtype, a.vsStructure, a.vsMinion);
}

function aj(n, t, e) {
  const s = n.byId.get(t.ownerId) ?? null;
  sS(n, s, e, t.ad, t.dtype, t.vsStructure, t.vsMinion);
}

function oj(n, t, e) {
  Bo(n, n.byId.get(e.sourceId) ?? null, t, e.value, "true", "dot");
}

const _i = { mult: 1, bonus: 0, bonusPhysical: 0, bonusMagic: 0, bonusTrue: 0, forceCrit: !1, noCrit: !1 };

function rj(n, t, e) {
  if (t.rt.blinded) {
    n.fx("xuesong_blind_miss", e.pos, t.team, { unitId: t.id, targetId: e.id });
    return;
  }
  ((_i.mult = 1),
    (_i.bonus = 0),
    (_i.bonusPhysical = 0),
    (_i.bonusMagic = 0),
    (_i.bonusTrue = 0),
    (_i.forceCrit = !1),
    (_i.noCrit = !1));
  const s = t.h.hooks;
  for (let u = 0; u < s.length; u++) {
    const m = s[u];
    m.modifyBasicAttack && m.modifyBasicAttack(n, t, e, _i);
  }
  const i = t.stats,
    a = Ss(e),
    o = !_i.noCrit && !a && (_i.forceCrit || (i.critChance > 0 && n.rng.next() < i.critChance)),
    r = i.ad * _i.mult * (o ? i.critDamage : 1) + _i.bonus,
    l = _i.bonusPhysical,
    c = _i.bonusMagic,
    f = _i.bonusTrue,
    d = t.rt.atk.dtype;
  n.fx(o ? "hit_crit" : d === "magic" ? "hit_magic" : "hit_physical", e.pos, t.team, {
    unitId: t.id,
    targetId: e.id,
  });
  const h = Bo(n, t, e, r, d, "basic", null, o);
  (l > 0 && Bo(n, t, e, l, "physical", "proc"),
    c > 0 && Bo(n, t, e, c, "magic", "proc"),
    f > 0 && Bo(n, t, e, f, "true", "proc"),
    !a &&
      e.alive &&
      Ba(t, "ember_might") &&
      (Wn(n, e, "burn", {
        sourceId: t.id,
        duration: ZW,
        merge: "replace",
        key: "ember",
        value: yn.emberBurnBase + yn.emberBurnPerLevel * t.level,
        tickInterval: JW,
        onTick: oj,
      }),
      Wn(n, e, "slow", { sourceId: t.id, duration: QW, value: yn.emberSlow, key: "ember" })));
  for (let u = 0; u < s.length; u++) {
    const m = s[u];
    m.onBasicAttackHit && m.onBasicAttackHit(n, t, e, h, o);
  }
}

function sS(n, t, e, s, i, a, o) {
  if (!e.alive) return;
  if (t && t.kind === "hero") {
    rj(n, t, e);
    return;
  }
  if (t && t.rt.blinded) {
    n.fx("xuesong_blind_miss", e.pos, t.team, { unitId: t.id, targetId: e.id });
    return;
  }
  let r = s;
  Ss(e) && (r *= a);
  let l = i === "magic" ? "hit_magic" : "hit_physical";
  if (t && Ss(t)) {
    if (((l = "hit_tower"), e.kind === "minion")) r *= yr.minionMult;
    else if (e.kind === "hero") {
      const c = `t${t.id}`,
        f = Dh(e, "tower_focus", c);
      ((r *= 1 + Math.min(yr.rampMax, yr.rampPerHit * (f ? f.stacks : 0))),
        Wn(n, e, "tower_focus", {
          sourceId: t.id,
          duration: tj,
          key: c,
          stacks: 1,
          maxStacks: Math.max(1, Math.round(yr.rampMax / yr.rampPerHit)),
        }));
    }
  } else e.kind === "minion" && (r *= o);
  (n.fx(l, e.pos, t ? t.team : 2, { targetId: e.id }), Bo(n, t, e, r, i, "basic"));
}

function Gm(n, t, e, s, i) {
  const a = t.rt;
  return a.windupLeft > 0
    ? !0
    : yy(t, e)
      ? (sj(n, t) ? ij(n, t, e) : n.state.time >= a.lockUntil && !a.stunned && Bm(t, e.pos.x, e.pos.y), !0)
      : (i &&
          !a.rooted &&
          !a.stunned &&
          a.dash === null &&
          n.state.time >= a.lockUntil &&
          dy(n, t, e.pos.x, e.pos.y, s),
        !1);
}

const lj = new Set(["stun", "airborne", "root", "silence", "xuesong_lifted"]),
  Vm = new Set(["slow", "haste", "attack_speed", "frost_insight", "star_blessing", "scallion_shred", "maggot_aura", "horseman_charge", "horseman_trample", "cow_gains", "cow_exhaust", "cow_giant", "monkey_ult", "monkey_stick_len"]),
  cj = new Set(["chijin_spin"]);

function iS(n, t) {
  return !!(
    n.kind === "tower" ||
    n.kind === "core" ||
    n.invulnerable ||
    n.rt.untargetable ||
    n.rt.unstoppable ||
    (t === "slow" && n.rt.slowImmune) ||
    (n.kind === "monster" && t !== "slow" && rn[n.monsterType].epic)
  );
}

function Dh(n, t, e) {
  const s = n.buffs;
  for (let i = 0; i < s.length; i++) {
    const a = s[i];
    if (a.id === t && (e === void 0 || a.key === e)) return a;
  }
  return null;
}

function Ba(n, t) {
  const e = n.buffs;
  for (let s = 0; s < e.length; s++) if (e[s].id === t) return !0;
  return !1;
}

function am(n, t) {
  let e = 0;
  const s = n.buffs;
  for (let i = 0; i < s.length; i++) s[i].id === t && s[i].stacks > e && (e = s[i].stacks);
  return e;
}

function Vf(n) {
  const t = n.rt;
  let e = !1,
    s = !1,
    i = !1,
    a = !1,
    o = !1,
    r = !1,
    l = !1,
    blinded = !1,
    highSight = !1,
    noAtk = !1,
    c = null,
    f = 0;
  const d = n.buffs;
  for (let h = 0; h < d.length; h++) {
    const u = d[h];
    switch (u.id) {
      case "stun":
        e = !0;
        break;
      case "airborne":
        c = u;
        break;
      case "root":
        s = !0;
        break;
      case "silence":
        i = !0;
        break;
      case "blind":
        blinded = !0;
        break;
      case "xuesong_pole":
        a = !0;
        s = !0;
        highSight = !0;
        break;
      case "xuesong_lifted":
        e = !0;
        s = !0;
        i = !0;
        break;
      case "stone_train":
      case "cow_squat":
        s = !0;
        break;
      case "scallion_beam":
        s = !0;
        i = !0;
        break;
      case "untargetable":
        a = !0;
        break;
      // 金身：不能动不能打（当成眩晕），同时不可选中 + 免疫伤害。
      // Bo() 开头就会因为 invulnerable/untargetable 直接返回 0，所以不用另写免伤分支。
      case "stasis":
        e = !0;
        a = !0;
        r = !0;
        break;
      case "unstoppable":
        o = !0;
        break;
      case "paperboy_crane_guard":
      case "horseman_neigh_guard":
        o = !0;
        l = !0;
        break;
      case "horseman_kick_charge":
      case "slime_ball_charge":
        s = !0;
        noAtk = !0;
        break;
      case "slime_puddle":
        a = !0;
        break;
      case "slime_absorbed":
        s = !0;
        break;
      case "niumo_march":
        o = !0;
        noAtk = !0;
        break;
      case "respawn_guard":
        r = !0;
        break;
      case "shield":
        f += u.value;
        break;
      default:
        cj.has(u.id) && (l = !0);
        break;
    }
  }
  ((t.stunned = e || c !== null),
    (t.airborne = c),
    (t.rooted = s),
    (t.silenced = i),
    (t.untargetable = a),
    (t.unstoppable = o),
    (t.slowImmune = l),
    (t.blinded = blinded),
    (t.highSight = highSight),
    (t.noAttack = noAtk),
    (n.shield = f),
    n.kind === "hero" && (n.invulnerable = r));
}

function A6(n, t, e) {
  const s = t.rt;
  (s.dash && s.dash.mode !== "forced" && iu(n, t, "interrupted"),
    e &&
      (Ga(t),
      s.act !== null && s.act !== "spin" && (s.act = null),
      t.kind === "hero" && ((t.h.pendingCast = null), Ba(t, "recall") && Va(n, t, "recall"))));
}

function Wn(n, t, e, s) {
  if (!t.alive) return null;
  // 护盾效率：按"给盾的人"放大（没有来源就算被套盾的人自己）。
  // 三条套盾路径（jj / 技能 shield / 44-data-4 的保命盾）最后都走这里，所以只改一处就全覆盖。
  if (e === "shield" && (s.value ?? 0) > 0) {
    const src = (s.sourceId ?? -1) >= 0 ? n.byId.get(s.sourceId) : null,
      sp = (src ?? t).stats?.shieldPower ?? 0;
    sp > 0 && (s = { ...s, value: s.value * (1 + sp) });
  }
  const i = lj.has(e);
  if ((i || e === "slow") && iS(t, e)) return null;
  const a = s.sourceId ?? -1,
    o = s.duration,
    r = s.value ?? 0,
    l = s.stacks ?? 1,
    c = s.key ?? (i ? "cc" : e === "shield" ? `#${n.buffSeq++}` : `s${a}`),
    f = n.state.time;
  let d = Dh(t, e, c);
  if (d) {
    const h = s.maxStacks ?? d.maxStacks;
    ((d.maxStacks = h),
      h > 1
        ? ((d.stacks = Math.min(h, d.stacks + l)),
          (d.timeLeft = o),
          (d.duration = o),
          (d.startTime = f),
          s.value !== void 0 && (d.value = r))
        : s.merge === "replace"
          ? ((d.timeLeft = o), (d.duration = o), (d.value = r), (d.startTime = f))
          : (o > d.timeLeft && ((d.timeLeft = o), (d.duration = o), (d.startTime = f)),
            r > d.value && (d.value = r)),
      (d.sourceId = a),
      s.onTick && (d.onTick = s.onTick),
      s.onExpire && (d.onExpire = s.onExpire),
      s.onRemove && (d.onRemove = s.onRemove));
  } else {
    const h = s.maxStacks ?? 1;
    ((d = {
      id: e,
      sourceId: a,
      timeLeft: o,
      duration: o,
      stacks: Math.min(h, Math.max(1, l)),
      value: r,
      key: c,
      maxStacks: h,
      startTime: f,
      tickInterval: s.tickInterval ?? 0,
      tickLeft: s.tickInterval ?? 0,
      onTick: s.onTick ?? null,
      onExpire: s.onExpire ?? null,
      onRemove: s.onRemove ?? null,
    }),
      G0(d, "onTick", "onExpire", "onRemove"),
      t.buffs.push(d));
  }
  return (
    Vf(t),
    i && Ba(t, "stone_train") && Va(n, t, "stone_train"),
    i && Ba(t, "cow_squat") && Va(n, t, "cow_squat"),
    (e === "stun" || e === "airborne" || e === "silence" || e === "xuesong_lifted" || e === "stasis") &&
      Ba(t, "scallion_beam") &&
      Va(n, t, "scallion_beam"),
    e === "stun" || e === "airborne" || e === "stasis" || e === "xuesong_lifted"
      ? A6(n, t, !0)
      : e === "root" && A6(n, t, !1),
    (t.kind === "hero" || Vm.has(e)) && _o(n, t),
    d
  );
}

function au(n, t, e) {
  (e.id === "recall" && t.rt.act === "channel" && (t.rt.act = null), e.onRemove && e.onRemove(n, t, e));
}

function fj(n, t, e) {
  const s = t.buffs.indexOf(e);
  return s < 0
    ? !1
    : (t.buffs.splice(s, 1),
      Vf(t),
      au(n, t, e),
      t.alive && (t.kind === "hero" || Vm.has(e.id)) && _o(n, t),
      !0);
}

function Va(n, t, e, s) {
  const i = t.buffs;
  let a = null;
  for (let o = i.length - 1; o >= 0; o--) {
    const r = i[o];
    r.id !== e || (s !== void 0 && r.key !== s) || (i.splice(o, 1), a ? a.push(r) : (a = [r]));
  }
  if (!a) return !1;
  Vf(t);
  for (const o of a) au(n, t, o);
  return (t.alive && (t.kind === "hero" || Vm.has(e)) && _o(n, t), !0);
}

function dj(n, t) {
  const e = t.buffs;
  if (e.length === 0) return;
  const s = e.slice();
  ((e.length = 0), Vf(t));
  for (const i of s) au(n, t, i);
}

const Nd = [],
  Fd = [];

function hj(n, t, e) {
  const s = t.buffs;
  if (s.length === 0) return;
  ((Nd.length = 0), (Fd.length = 0));
  for (let o = 0; o < s.length; o++) {
    const r = s[o];
    (r.tickInterval > 0 &&
      r.onTick &&
      ((r.tickLeft -= e), r.tickLeft <= 1e-9 && ((r.tickLeft += r.tickInterval), Nd.push(r))),
      (r.timeLeft -= e),
      r.timeLeft <= 1e-9 && Fd.push(r));
  }
  if (Nd.length === 0 && Fd.length === 0) return;
  const i = Nd.length > 0 ? Nd.slice() : null,
    a = Fd.length > 0 ? Fd.slice() : null;
  if (i)
    for (const o of i) {
      if (!t.alive) return;
      s.indexOf(o) >= 0 && o.onTick && o.onTick(n, t, o);
    }
  if (a) {
    let o = !1;
    for (const r of a) {
      if (!t.alive) return;
      const l = s.indexOf(r);
      l < 0 ||
        r.timeLeft > 1e-9 ||
        (s.splice(l, 1),
        Vf(t),
        r.onExpire && r.onExpire(n, t, r),
        au(n, t, r),
        (t.kind === "hero" || Vm.has(r.id)) && (o = !0));
    }
    o && t.alive && _o(n, t);
  }
}

function uj(n, t, e) {
  let s = e;
  for (; s > 0;) {
    let i = null;
    const a = t.buffs;
    for (let r = 0; r < a.length; r++) {
      const l = a[r];
      l.id === "shield" && l.value > 0 && (i === null || l.timeLeft < i.timeLeft) && (i = l);
    }
    if (!i) break;
    const o = Math.min(i.value, s);
    if (((i.value -= o), (s -= o), i.value <= 1e-6)) {
      const r = a.indexOf(i);
      (r >= 0 && a.splice(r, 1), n.fx("shield_break", t.pos, t.team, { unitId: t.id }), au(n, t, i));
    }
  }
  return (Vf(t), s);
}

const R6 = ["s1", "s2", "ult", "recall", "heal", "flash"],
  pj = 7,
  aS = 2.5,
  oS = 0.75,
  C6 = 0.5,
  mj = 0.6,
  gj = 12,
  xj = 0.3,
  yj = 2,
  vj = 15;

function Do(n, t, e, s = !1) {
  return (t.isPlayer && !s && n.emit({ type: "reject", unitId: t.id, reason: e }), !1);
}

function vy(n, t) {
  Ba(t, "recall") && Va(n, t, "recall");
}

function rS(n) {
  const t = [],
    e = BV(n.heroId);
  e && t.push(e);
  const s = new Set();
  for (const i of n.items) {
    if (!i) continue;
    const a = ln[i];
    if (!a.passive || s.has(a.passive.id)) continue;
    const o = HV(a);
    o && (s.add(a.passive.id), t.push(o));
  }
  n.h.hooks = t;
}

function lS(n, t) {
  (rS(t), _o(n, t));
}

function cS(n, t, e, s = !1) {
  const i = ln[e];
  if (!i) return !1;
  const a = t.items;
  // 消耗品走独立分支：优先往已有同 id 的格子里叠，叠满或没有同 id 格才占新格。
  // 它们不参与合成，所以必须放在合成判断之前。
  if (i.stack > 1) {
    if (t.gold < i.cost) return Do(n, t, "gold", s);
    let slot = -1;
    for (let k = 0; k < a.length; k++) if (a[k] === e && (t.rt.itemN[k] ?? 0) < i.stack) { slot = k; break; }
    const fresh = slot < 0;
    if (fresh) slot = a.indexOf(null);
    if (slot < 0) return Do(n, t, "full", s);
    return (
      (t.gold -= i.cost),
      (a[slot] = e),
      (t.rt.itemN[slot] = fresh ? 1 : t.rt.itemN[slot] + 1),
      (t.rt.itemCd[slot] = 0),
      lS(n, t),
      n.emit(s ? { type: "itemBought", unitId: t.id, itemId: e, auto: !0 } : { type: "itemBought", unitId: t.id, itemId: e }),
      !0
    );
  }
  // 合成优先：组件凑齐就吃掉组件、只付差价（成品比组件总价贵一点点，那部分才是这次要付的）
  const comb = Sk(t, e);
  if (comb) {
    const price = Math.max(0, i.cost - comb.value);
    if (t.gold < price) return Do(n, t, "gold", s);
    t.gold -= price;
    for (const k of comb.slots) a[k] = null;
    const slot = comb.slots[0] ?? a.indexOf(null);
    a[slot] = e;
    t.rt.itemCd[slot] = 0;
    lS(n, t);
    return (
      n.emit(
        s
          ? { type: "itemBought", unitId: t.id, itemId: e, auto: !0, combined: comb.slots.map((k) => k) }
          : { type: "itemBought", unitId: t.id, itemId: e, combined: comb.slots.map((k) => k) },
      ),
      !0
    );
  }
  let o = i.cost,
    r = -1;
  if (i.category === "boots") {
    const l = a.findIndex((c) => c !== null && ln[c].category === "boots");
    if (l >= 0) {
      const c = ln[a[l]];
      if (i.tier === 1 || c.id === i.id) return Do(n, t, "full", s);
      ((r = l), (o -= Math.floor(c.cost * Yh)));
    }
  }
  return (
    r < 0 && (r = a.indexOf(null)),
    r < 0
      ? Do(n, t, "full", s)
      : t.gold < o
        ? Do(n, t, "gold", s)
        : ((t.gold -= o),
          (a[r] = e),
          (t.rt.itemCd[r] = 0),
          lS(n, t),
          s
            ? n.emit({ type: "itemBought", unitId: t.id, itemId: e, auto: !0 })
            : n.emit({ type: "itemBought", unitId: t.id, itemId: e }),
          !0)
  );
}

function bj(n, t, e) {
  if (!Number.isInteger(e) || e < 0 || e >= t.items.length) return !1;
  const s = t.items[e];
  // 消耗品一次卖光这一格里的全部个数，按个数退款
  const cnt = Math.max(1, t.rt.itemN[e] ?? 0);
  return s
    ? ((t.gold += Math.floor(ln[s].cost * Yh) * cnt),
      (t.items[e] = null),
      (t.rt.itemCd[e] = 0),
      (t.rt.itemN[e] = 0),
      t.autoBuy && Tk(t.heroId, s) && (t.autoBuy = !1),
      lS(n, t),
      !0)
    : !1;
}

// 装备主动：每格独立冷却，效果按 ln[id].active.kind 分派。
// 主动件是"多一个技能"，所以冷却挂在装备栏下标上而不是装备 id 上：
// 卖掉再买回来是新的一格，冷却跟着格子走（标准做法）。
function useItemActive(n, t, e) {
  const s = e.index;
  if (!t.alive || !Number.isInteger(s) || s < 0 || s >= t.items.length) return !1;
  const id = t.items[s],
    act = id && ln[id] ? ln[id].active : null;
  if (!act) return Do(n, t, "no_active", !1);
  const o = t.rt,
    here = { x: t.pos.x, y: t.pos.y };
  if (o.itemCd[s] > 0) return Do(n, t, "cooldown", !1);
  // 金身可以在被控时按出来（那正是它的用途），别的主动被控就按不了
  if (act.kind !== "stasis" && (o.stunned || o.silenced)) return Do(n, t, "disabled", !1);
  if (o.dash !== null) return Do(n, t, "disabled", !1);
  o.itemCd[s] = act.cd;
  switch (act.kind) {
    case "stasis":
      // 视觉复用"获得增益"的金色法阵（画在脚下），不另造一套美术
      (Wn(n, t, "stasis", { duration: act.duration, sourceId: t.id, key: "item_stasis", merge: "replace" }),
        n.fx("buff_gain", here, t.team, { unitId: t.id }));
      break;
    case "teleport": {
      // 复用回城的引导：同一套"一行动就中断"的逻辑（Ba(t,'recall') 那几个检查点），
      // 只把 onExpire 换成传到指定位置。
      const p = { x: here.x, y: here.y },
        want =
          e.pos && Number.isFinite(e.pos.x) && Number.isFinite(e.pos.y)
            ? e.pos
            : // 没给落点（鼠标不在场景里）就朝正前方飞满射程，总比原地不动强
              { x: here.x + Math.cos(t.facing) * act.range, y: here.y + Math.sin(t.facing) * act.range };
      n.nav.nearestFree(want.x, want.y, o.navR, p, fy);
      const dx = p.x - here.x,
        dy = p.y - here.y,
        len = Math.hypot(dx, dy);
      if (len > act.range) {
        p.x = here.x + (dx / len) * act.range;
        p.y = here.y + (dy / len) * act.range;
        n.nav.nearestFree(p.x, p.y, o.navR, p, fy);
      }
      (Wn(n, t, "recall", {
        duration: act.channel,
        sourceId: t.id,
        merge: "replace",
        onExpire() {
          t.alive && (hy(n, t, p.x, p.y), n.fx("recall_done", p, t.team, { unitId: t.id }));
        },
      }),
        n.fx("recall_start", p, t.team, { unitId: t.id }));
      break;
    }
    case "heal": {
      const amt = (act.amount + t.stats.maxHp * act.hpRatio) * (1 + (t.stats.healPower ?? 0));
      for (const u of Pr(n, here, act.radius, (v) => v.team === t.team && v.alive && (v.kind === "hero" || v.kind === "minion")))
        gy(n, u, u, amt) > 0 && n.fx("heal", u.pos, u.team, { unitId: u.id });
      break;
    }
    case "cleanse":
      (qj(n, t, ["stun", "root", "silence", "slow", "airborne"]),
        Wn(n, t, "unstoppable", { duration: act.duration, sourceId: t.id, key: "item_cleanse", merge: "replace" }),
        n.fx("buff_gain", here, t.team, { unitId: t.id }));
      break;
    case "consume": {
      // 消耗品：三个原子操作按需组合，引擎不需要为每一件单独写分支。
      // ① 立刻回复（定值 + 按最大值比例）
      const hp = (act.heal ?? 0) + t.stats.maxHp * (act.healPct ?? 0),
        mana = (act.mana ?? 0) + t.stats.maxMana * (act.manaPct ?? 0);
      if (hp > 0 && gy(n, t, t, hp * (1 + (t.stats.healPower ?? 0))) > 0) n.fx("heal", here, t.team, { unitId: t.id });
      if (mana > 0) t.mana = Math.min(t.stats.maxMana, t.mana + mana);
      // ② 立刻付出的代价：扣当前生命，永远不会把自己扣死（留 1 点）
      if (act.costHpPct > 0) t.hp = Math.max(1, t.hp - t.hp * act.costHpPct);
      // ③ 持续增益：id 交给 _o() 的属性开关，value 是增量、duration 是秒
      for (const b of act.buffs ?? [])
        Wn(n, t, b.id, { duration: b.duration, value: b.value, sourceId: t.id, key: `item_${id}` });
      n.fx("buff_gain", here, t.team, { unitId: t.id });
      // 用掉一个；这一格空了就把装备栏腾出来
      const left = (t.rt.itemN[s] ?? 1) - 1;
      if (left > 0) t.rt.itemN[s] = left;
      else ((t.items[s] = null), (t.rt.itemN[s] = 0), (t.rt.itemCd[s] = 0));
      lS(n, t);
      if (t.kind === "hero") {
        for (let hi = 0; hi < t.h.hooks.length; hi++) {
          const hk = t.h.hooks[hi];
          hk.onConsumeItem && hk.onConsumeItem(n, t, id);
        }
      }
      break;
    }
    default:
      return ((o.itemCd[s] = 0), Do(n, t, "no_active", !1));
  }
  return (n.emit({ type: "itemActive", unitId: t.id, itemId: id, slot: s, kind: act.kind, pos: here }), !0);
}

function _j(n, t) {
  const e = $f(t);
  !e || !zm(t, e) || t.gold < Gf(t, e) || cS(n, t, e, !0);
}

const L6 = [],
  wj = 0.35;

function fS(n, t) {
  return t.hp <= (n.stats.ad * 600) / (600 + t.stats.armor);
}

function B3(n, t) {
  switch (t.kind) {
    case "hero":
      return 0;
    case "minion":
      return fS(n, t) || t.hp < t.stats.maxHp * wj ? 1 : 3;
    case "monster":
      return 4;
    default:
      return 2;
  }
}

function dS(n, t, e) {
  const s = t.stats.attackRange,
    i = n.grid.query(t.pos.x, t.pos.y, s + e, L6);
  let a = null,
    o = 1 / 0,
    r = 1 / 0,
    l = null,
    c = 1 / 0;
  for (let f = 0; f < i; f++) {
    const d = L6[f];
    if (!Ui(t, d)) continue;
    const h = Math.hypot(d.pos.x - t.pos.x, d.pos.y - t.pos.y) - d.radius;
    if (h <= s + oS) {
      const u = B3(t, d);
      let m;
      (d.kind === "hero"
        ? (m = d.hp / d.stats.maxHp)
        : d.kind === "minion"
          ? (m = fS(t, d) ? d.hp - 1e6 : d.hp)
          : d.kind === "monster"
            ? (m = d.hp)
            : (m = h),
        (u < o || (u === o && m < r)) && ((a = d), (o = u), (r = m)));
    } else if (h <= s + e && h < c) {
      if (d.kind === "monster" && h > s + aS) continue;
      ((c = h), (l = d));
    }
  }
  return a ?? l;
}

function Mj(n, t, e) {
  if (t.rt.noAttack) return;
  const s = t.h;
  vy(n, t);
  let i = null,
    a = !1;
  if (e !== void 0 && e >= 0) {
    const o = n.byId.get(e);
    if (!o || !Ui(t, o)) {
      Do(n, t, "no_target");
      return;
    }
    ((i = o), (a = !0));
  } else {
    const o = dS(n, t, pj);
    if (!o) return;
    const r = s.atkOrder ? n.byId.get(s.atkTargetId) : void 0;
    if (r && Ui(t, r) && (t.rt.windupLeft > 0 || (yy(t, r, oS) && B3(t, r) <= B3(t, o)))) return;
    i = o;
  }
  if (s.atkOrder && s.atkTargetId === i.id) {
    (a && (s.atkExplicit = !0), (t.targetId = i.id));
    return;
  }
  (s.atkTargetId !== i.id && Ga(t),
    (s.atkOrder = !0),
    (s.atkTargetId = i.id),
    (s.atkExplicit = a),
    (t.targetId = i.id),
    Hl(t));
}

function kj(n, t, e) {
  if (t.rt.noAttack) return;
  const s = t.h;
  let i = n.byId.get(s.atkTargetId);
  if (!i || !Ui(t, i)) {
    if (t.rt.windupLeft > 0) return;
    const a = dS(n, t, aS);
    if (!a) {
      ((s.atkOrder = !1), (t.targetId = -1));
      return;
    }
    ((s.atkTargetId = a.id), (s.atkExplicit = !1), (i = a));
  }
  ((t.targetId = i.id), Gm(n, t, i, e, !0));
}

const I6 = [];

function Sj(n, t) {
  if (em(t)) return jk[t];
  const e = n.h.def.skills[t];
  if (n.heroId === "cow" && t === "s2") {
    const ms = n.stats.moveSpeed || 5.5,
      r = Math.max(4.0, Math.min(13.0, 5.5 + (ms - 4.5) * 0.95));
    return { ...e.cast, range: r };
  }
  if (n.heroId === "slime" && t === "s1" && Ba(n, "slime_puddle")) {
    return { type: "self", radius: e.values.absorbRadius };
  }
  if (n.heroId === "slime" && t === "s2" && Ba(n, "slime_wall_bounce")) {
    return { type: "direction", range: e.values.maxRange, width: e.cast.width };
  }
  return e.recastBuff && e.recastCast && Ba(n, e.recastBuff) ? e.recastCast : e.cast;
}

function H3(n, t) {
  const e = (n.pos.x - n.prevPos.x) / xo,
    s = (n.pos.y - n.prevPos.y) / xo;
  return t <= 0 || Math.hypot(e, s) > gj
    ? { x: n.pos.x, y: n.pos.y }
    : { x: n.pos.x + e * t, y: n.pos.y + s * t };
}

function a5(n, t, e, s) {
  const i = n.grid.query(t.pos.x, t.pos.y, e, I6);
  let a = null,
    o = 1 / 0,
    r = null,
    l = 1 / 0;
  for (let c = 0; c < i; c++) {
    const f = I6[c];
    if (f.kind === "tower" || f.kind === "core" || !Ui(t, f)) continue;
    const d = Math.hypot(f.pos.x - t.pos.x, f.pos.y - t.pos.y) - f.radius;
    if (!(d > e))
      if (f.kind === "hero") {
        const h = f.hp / f.stats.maxHp;
        h < o && ((o = h), (a = f));
      } else d < l && ((l = d), (r = f));
  }
  return a ?? (s ? null : r);
}

function Zd(n, t, e, s) {
  const i = t - n.pos.x,
    a = e - n.pos.y,
    o = Math.hypot(i, a);
  return o > 1e-4 ? { x: i / o, y: a / o } : { x: s.x, y: s.y };
}

function Tj(n) {
  const t = n.rt;
  return t.moveMode === Jh ? { x: t.dirX, y: t.dirY } : { x: Math.cos(n.facing), y: Math.sin(n.facing) };
}

function P6(n, t, e, s) {
  let i = e.aimLead ?? 0;
  e.aimSpeed && e.aimSpeed > 0 && (i += Math.hypot(t.pos.x - n.pos.x, t.pos.y - n.pos.y) / e.aimSpeed);
  const a = H3(t, Math.min(i, 0.8));
  return Zd(n, a.x, a.y, s);
}

function Yc(n) {
  return n !== void 0 && Number.isFinite(n.x) && Number.isFinite(n.y);
}

function Ej(n, t, e, s, i) {
  const a = t.pos,
    o = Tj(t);
  let r = null;
  if (i.targetId !== void 0 && i.targetId >= 0) {
    const c = n.byId.get(i.targetId);
    c && (e.ally ? c.team === t.team && c.kind === "hero" && c.alive && !c.rt.untargetable : Ui(t, c)) && (r = c);
  }
  const l = s.aim !== "facing";
  switch (e.type) {
    case "self":
      return { dir: { x: Math.cos(t.facing), y: Math.sin(t.facing) }, pos: { x: a.x, y: a.y }, target: null };
    case "target": {
      const c = e.range + C6;
      if (e.ally) {
        let f = r && r.id !== t.id ? r : null;
        if (f && Math.hypot(f.pos.x - a.x, f.pos.y - a.y) - f.radius > c) f = null;
        if (!f) {
          let bestScore = 1 / 0;
          for (let hi = 0; hi < n.heroes.length; hi++) {
            const h = n.heroes[hi];
            if (!h.alive || h.team !== t.team || h.id === t.id || h.rt.untargetable) continue;
            const d = Math.hypot(h.pos.x - a.x, h.pos.y - a.y) - h.radius;
            if (d > c) continue;
            const ccBonus = h.rt.stunned || h.rt.rooted || h.rt.silenced ? -0.6 : 0,
              score = h.hp / Math.max(1, h.stats.maxHp) + ccBonus;
            score < bestScore && ((bestScore = score), (f = h));
          }
        }
        if (!f && e.selfFallback) f = t;
        return f ? { dir: Zd(t, f.pos.x, f.pos.y, o), pos: { x: f.pos.x, y: f.pos.y }, target: f } : null;
      }
      const any = !!e.anyUnit;
      let f = r;
      return (
        f &&
          ((any ? f.kind === "tower" || f.kind === "core" : f.kind !== "hero") ||
            Math.hypot(f.pos.x - a.x, f.pos.y - a.y) - f.radius > c) &&
          (f = null),
        f || (f = a5(n, t, c, !any)),
        f ? { dir: Zd(t, f.pos.x, f.pos.y, o), pos: { x: f.pos.x, y: f.pos.y }, target: f } : null
      );
    }
    case "direction":
    case "cone": {
      let c;
      if (Yc(i.dir) && Math.hypot(i.dir.x, i.dir.y) > 0.001) c = Zd(t, a.x + i.dir.x, a.y + i.dir.y, o);
      else if (Yc(i.pos)) c = Zd(t, i.pos.x, i.pos.y, o);
      else if (r) c = P6(t, r, s, o);
      else {
        const f = l ? a5(n, t, (s.aimRange ?? e.range) + C6, !1) : null;
        c = f ? P6(t, f, s, o) : o;
      }
      return { dir: c, pos: { x: a.x + c.x * e.range, y: a.y + c.y * e.range }, target: null };
    }
    case "position": {
      let c;
      const f = s.aimLead ?? xj;
      if (Yc(i.pos)) c = { x: i.pos.x, y: i.pos.y };
      else if (Yc(i.dir) && Math.hypot(i.dir.x, i.dir.y) > 0.001) {
        const m = Zd(t, a.x + i.dir.x, a.y + i.dir.y, o);
        c = { x: a.x + m.x * e.range, y: a.y + m.y * e.range };
      } else if (r) c = H3(r, f);
      else {
        const m = l ? a5(n, t, e.range + e.radius * 0.6, !1) : null;
        c = m ? H3(m, f) : { x: a.x + o.x * e.range * 0.6, y: a.y + o.y * e.range * 0.6 };
      }
      const d = c.x - a.x,
        h = c.y - a.y,
        u = Math.hypot(d, h);
      return (
        u > e.range && ((c.x = a.x + (d / u) * e.range), (c.y = a.y + (h / u) * e.range)),
        { dir: u > 1e-4 ? { x: d / u, y: h / u } : o, pos: c, target: null }
      );
    }
  }
}

function hS(n, t, e, s = !1) {
  const i = e.slot,
    a = t.skills[i];
  if (!a || !t.alive) return !1;
  const o = t.rt,
    r = n.state.time;
  if (a.level <= 0) return Do(n, t, "disabled", s);
  const isWallBounce = t.heroId === "slime" && i === "s2" && Ba(t, "slime_wall_bounce");
  if (a.cd > 0 && !isWallBounce) return Do(n, t, "cooldown", s);
  const l = em(i),
    c = Wk(t.heroId, i),
    h = l ? null : t.h.def.skills[i],
    isRecast = !!(h && h.recastBuff && Ba(t, h.recastBuff)),
    canBypassRoot =
      (isRecast && (Ba(t, "xuesong_pole") || Ba(t, "scallion_beam") || Ba(t, "slime_ball_charge"))) ||
      isWallBounce ||
      Ba(t, "stone_train") ||
      Ba(t, "cow_squat"),
    canBypassSilence = isRecast && Ba(t, "scallion_beam");
  if (o.stunned || (o.silenced && !l && !canBypassSilence) || (c.movement && o.rooted && !canBypassRoot)) return Do(n, t, "disabled", s);
  if (o.noSteerUntil > r && i !== "ult") return Do(n, t, "disabled", s);
  if (!isRecast && !isWallBounce && t.mana < a.cost) return Do(n, t, "mana", s);
  if (r < o.lockUntil || o.dash !== null) return ((t.h.pendingCast = e), (t.h.pendingUntil = r + mj), !1);
  if (c.canCast) {
    const v = c.canCast(n, t);
    if (v) return Do(n, t, v, s);
  }
  const f = Sj(t, i),
    d = Ej(n, t, f, c, e);
  if (!d) return Do(n, t, "no_target", s);
  const u = a.level,
    manaCost = isRecast || isWallBounce ? 0 : a.cost;
  ((t.mana -= manaCost),
    (a.cdMax = h ? h.cooldown[u - 1] * (1 - t.stats.cdr) : ea[i].cooldown),
    (a.cd = isWallBounce ? Math.max(a.cd, 0.2) : a.cdMax),
    Ga(t),
    i !== "recall" && vy(n, t),
    f.type !== "self" && (t.facing = Math.atan2(d.dir.y, d.dir.x)),
    xy(n, t));
  // 耗蓝被动（饭盒/野生狗奶）：全游戏只有这一个扣蓝点，挂在这儿最稳
  if (t.kind === "hero" && manaCost > 0)
    for (let hv = 0; hv < t.h.hooks.length; hv++) {
      const hk = t.h.hooks[hv];
      hk.onManaSpent && hk.onManaSpent(n, t, manaCost);
    }
  const m = h ? h.castTime : 0,
    x = c.lockTime ?? m;
  (x > 0 && (o.lockUntil = r + x), h && m > 0 && !c.noAnim && eu(n, t, `cast_${i}`, m, !0));
  const p = { x: t.pos.x, y: t.pos.y };
  n.emit({
    type: "skillCast",
    unitId: t.id,
    heroId: t.heroId,
    slot: i,
    pos: p,
    dir: { x: d.dir.x, y: d.dir.y },
    targetPos: { x: d.pos.x, y: d.pos.y },
    targetId: d.target ? d.target.id : -1,
  });
  const g = {
      sim: n,
      caster: t,
      slot: i,
      level: u,
      def: h,
      isRecast,
      origin: { x: p.x, y: p.y },
      dir: d.dir,
      targetPos: d.pos,
      target: d.target,
      spec: f,
      range: "range" in f ? f.range : 0,
      radius: "radius" in f ? f.radius : 0,
      width: "width" in f ? f.width : 0,
      angle: "angle" in f ? f.angle : 0,
      val: (v) => {
        if (!h) throw new Error(`summoner skill "${i}" has no values`);
        return Nh(h, v, u);
      },
    },
    y = t.h.hooks;
  for (let v = 0; v < y.length; v++) {
    const _ = y[v];
    _.onSkillCast && _.onSkillCast(n, t, i);
  }
  return (c.cast(g), !0);
}

function D6(n, t) {
  ((t.h.atkOrder = !1), (t.targetId = -1), Ga(t), vy(n, t));
}

// 表情动作的四个名字（右上角按钮 + Ctrl1~4）。都对应卡丁车那套标准动作里的同名片段。
const EMOTE_NAMES = new Set(["taunt", "joke", "dance", "cheer"]);

function Aj(n, t, e) {
  // 表情放在最前面：结算界面（state.over）也想让玩家再跳一次，不然按了没反应
  if (e.type === "emote") {
    // 被控/腾空时别接：qV 会先走眩晕/滞空分支，等控制结束再补播一段表情会很怪
    if (!t.alive || t.rt.stunned || t.rt.airborne || !EMOTE_NAMES.has(e.name)) return;
    // dur 由 UI 按模型片段的真实时长传进来；拿不到就给个兜底，宁可多站一会儿也别截断动作
    const dur = Number.isFinite(e.dur) && e.dur > 0 ? e.dur : 2.4;
    eu(n, t, `emote_${e.name}`, dur, !0);
    return;
  }
  if (n.state.over) return;
  if (e.type === "buy") {
    cS(n, t, e.itemId);
    return;
  }
  if (e.type === "item") {
    useItemActive(n, t, e);
    return;
  }
  if (e.type === "sell") {
    bj(n, t, e.index);
    return;
  }
  if (e.type === "autoBuy") {
    t.autoBuy = e.enabled === !0;
    return;
  }
  if (!t.alive) return;
  const s = t.rt;
  // 强制前进的引导技能（牛魔 2 技能）：期间禁止转向与普攻，移动和攻击指令直接吞掉
  if ((e.type === "move" || e.type === "moveTo" || e.type === "attack") && s.noSteerUntil > n.state.time) return;
  // 葱仔仔大招「葱击波」喷射期间不能移动，但移动/点击指令用来缓慢转向气功波方向
  if (Ba(t, "scallion_beam")) {
    if (e.type === "move") {
      if (Yc(e.dir) && Math.hypot(e.dir.x, e.dir.y) > 0.08) {
        t.h._scBeamAim = Math.atan2(e.dir.y, e.dir.x);
      }
      return;
    }
    if (e.type === "moveTo") {
      if (Yc(e.pos)) {
        const dx = e.pos.x - t.pos.x,
          dy = e.pos.y - t.pos.y;
        if (dx * dx + dy * dy > 0.04) t.h._scBeamAim = Math.atan2(dy, dx);
      }
      return;
    }
    if (e.type === "attack") {
      const target = n.byId.get(e.targetId);
      if (target && target.alive) {
        const dx = target.pos.x - t.pos.x,
          dy = target.pos.y - t.pos.y;
        if (dx * dx + dy * dy > 0.04) t.h._scBeamAim = Math.atan2(dy, dx);
      }
      return;
    }
    if (e.type === "stop") return;
  }
  if ((Ba(t, "horseman_kick_charge") || Ba(t, "slime_ball_charge")) && (e.type === "move" || e.type === "moveTo" || e.type === "attack")) {
    return;
  }
  switch (e.type) {
    case "move": {
      const i = Yc(e.dir) ? Math.hypot(e.dir.x, e.dir.y) : 0;
      if (!(i > 0.05)) {
        s.moveMode === Jh && Hl(t);
        return;
      }
      (D6(n, t), aW(t, e.dir.x / i, e.dir.y / i));
      return;
    }
    case "moveTo":
      if (!Yc(e.pos)) return;
      (D6(n, t), oW(n, t, e.pos.x, e.pos.y));
      return;
    case "stop":
      (Hl(t), (t.h.atkOrder = !1), (t.h.pendingCast = null), (t.targetId = -1), Ga(t));
      return;
    case "attack":
      Mj(n, t, e.targetId);
      return;
    case "cast":
      hS(n, t, e);
      return;
    case "aim": {
      if (Ba(t, "horseman_kick_charge") && Yc(e.dir)) {
        const dl = Math.hypot(e.dir.x, e.dir.y);
        if (dl > 0.01) {
          const nx = e.dir.x / dl,
            ny = e.dir.y / dl;
          t.h._hmKickDir = { x: nx, y: ny };
          // 蓄力时屁股朝向瞄准方向（头朝反方向）
          t.facing = Math.atan2(-ny, -nx);
        }
      } else if (Ba(t, "slime_ball_charge") && Yc(e.dir)) {
        const dl = Math.hypot(e.dir.x, e.dir.y);
        if (dl > 0.01) {
          const nx = e.dir.x / dl,
            ny = e.dir.y / dl;
          t.h._slBallDir = { x: nx, y: ny };
          t.facing = Math.atan2(ny, nx);
        }
      }
      return;
    }
  }
}

function Rj(n, t) {
  const e = t.h,
    s = t.rt;
  ((t.alive = !0),
    (t.respawnIn = 0),
    (t.pos.x = e.spawn.x),
    (t.pos.y = e.spawn.y),
    (t.prevPos.x = e.spawn.x),
    (t.prevPos.y = e.spawn.y),
    (t.facing = t.team === 1 ? Math.PI * 0.75 : -Math.PI * 0.25),
    (t.anim = "idle"),
    (t.animStart = n.state.time),
    (t.animDur = 0),
    (t.targetId = -1),
    Hl(t),
    (s.atkCd = 0),
    (s.windupLeft = 0),
    (s.lockUntil = 0),
    (s.disarmUntil = 0),
    (s.act = null),
    (s.revealUntil = -999),
    (e.atkOrder = !1),
    (e.pendingCast = null),
    // 复活动作：泉眼里起身那一下，播完自动回待机
    eu(n, t, "revive", 1, !0),
    _o(n, t),
    (t.hp = t.stats.maxHp),
    (t.mana = t.stats.maxMana),
    n.grid.insert(t),
    Wn(n, t, "respawn_guard", { duration: yj }),
    n.emit({ type: "respawn", unitId: t.id, pos: { x: t.pos.x, y: t.pos.y } }),
    n.fx("respawn", t.pos, t.team, { unitId: t.id }));
  for (const i of e.hooks) i.onSpawn && i.onSpawn(n, t);
}

function Cj(n, t, e) {
  const s = n.state,
    i = s.time,
    a = t.h,
    o = t.rt;
  if (i >= 10 && ((a.goldFrac += va.passiveGold * e), a.goldFrac >= 1)) {
    const f = Math.floor(a.goldFrac);
    ((a.goldFrac -= f), (t.gold += f), (t.goldEarned += f), (s.teams[t.team].gold += f));
  }
  for (let f = 0; f < R6.length; f++) {
    const d = t.skills[R6[f]];
    d.cd > 0 && (d.cd = d.cd > e ? d.cd - e : 0);
  }
  // 装备主动的冷却
  const icd = t.rt.itemCd;
  for (let f = 0; f < icd.length; f++) icd[f] > 0 && (icd[f] = icd[f] > e ? icd[f] - e : 0);
  if (
    ((t.inCombat = i - a.lastCombatTime < CV),
    t.autoBuy && (s.tick + a.index) % vj === 0 && _j(n, t),
    !t.alive)
  ) {
    ((t.respawnIn -= e), t.respawnIn <= 1e-9 && Rj(n, t));
    return;
  }
  const r = t.stats;
  (t.hp < r.maxHp && (t.hp = Math.min(r.maxHp, t.hp + r.hpRegen * e)),
    t.mana < r.maxMana && (t.mana = Math.min(r.maxMana, t.mana + r.manaRegen * e)));
  const l = s.teams[t.team].blessingLeft;
  l > 0.05 && !Ba(t, "star_blessing") && Wn(n, t, "star_blessing", { duration: l, key: "team" });
  const c = a.hooks;
  for (let f = 0; f < c.length; f++) {
    const d = c[f];
    d.onTick && d.onTick(n, t, e);
  }
  if (t.alive) {
    if (($m(n, t, e), o.dash)) {
      py(n, t, e);
      return;
    }
    if (!(o.stunned || i < o.lockUntil)) {
      if (a.pendingCast) {
        const f = a.pendingCast;
        if (
          ((a.pendingCast = null),
          i <= a.pendingUntil && (hS(n, t, f, !0), i < o.lockUntil || o.dash !== null))
        )
          return;
      }
      if (a.atkOrder) {
        kj(n, t, e);
        return;
      }
      o.windupLeft > 0 || o.rooted || o.moveMode === Qh || cW(n, t, e);
    }
  }
}

function Lj(n, t) {
  (rS(t), _o(n, t), (t.hp = t.stats.maxHp), (t.mana = t.stats.maxMana));
  for (const e of t.h.hooks) e.onSpawn && e.onSpawn(n, t);
}

const Ij = ["top", "mid", "bot"],
  uS = 0.25,
  Pj = 3,
  Dj = 9,
  z6 = F3 + 3,
  N6 = [-0.9, 0.9, 0, -1.7, 1.7, 0.5],
  A1 = { x: 0, y: 0 },
  F6 = [];

function zj(n, t, e, s, i) {
  if (n.state.over) return;
  const a = n.lanes[e],
    o = n.map.bases[t].minionSpawn[e],
    r = a.project(o.x, o.y);
  a.pointAt(r, A1);
  const l = N6[i % N6.length],
    c = { x: o.x - a.ty * l, y: o.y + a.tx * l };
  n.nav.nearestFree(c.x, c.y, 0.8, c);
  const f = ZV(n, t, e, s, c);
  ((f.m.offset = l),
    (f.facing = Math.atan2(a.ty * f.m.dir, a.tx * f.m.dir)),
    n.state.teams[t].blessingLeft > 0 && _o(n, f),
    n.addUnit(f),
    pS(n, f),
    (f.rt.thinkAt = n.state.time + uS));
}

function Nj(n, t) {
  const e = n.state.time;
  for (const s of [0, 1]) {
    const i = s === 0 ? 1 : 0;
    for (const a of Ij) {
      const o = [];
      for (let r = 0; r < v0.melee; r++) o.push("melee");
      n.towers[i][a][2] === null &&
        (o.push("super"),
        n.superAnnounced[s][a] ||
          ((n.superAnnounced[s][a] = !0), n.emit({ type: "announce", key: "super_minions", team: s })));
      for (let r = 0; r < v0.ranged; r++) o.push("ranged");
      (t >= v0.siegeEvery && t % v0.siegeEvery === 0 && o.push("siege"),
        o.forEach((r, l) => {
          n.scheduler.at(e + l * v0.stagger, () => zj(n, s, a, r, l));
        }));
    }
  }
}

function Fj(n) {
  const t = n.state;
  if (n.opts.noWaves) {
    t.nextWaveIn = 0;
    return;
  }
  (t.time + 1e-9 >= n.nextWaveAt &&
    (t.wave++,
    (n.nextWaveAt += v0.interval),
    Nj(n, t.wave),
    n.emit({ type: "waveSpawn", wave: t.wave }),
    t.wave === 1 && n.emit({ type: "announce", key: "minions_spawn", team: 2 })),
    (t.nextWaveIn = Math.max(0, n.nextWaveAt - t.time)));
}

function pS(n, t) {
  const e = t.m,
    s = n.lanes[t.lane],
    i = s.project(t.pos.x, t.pos.y),
    a = s.lateral;
  e.offLane = a > 4;
  const o = a > Dj,
    r = t.targetId >= 0 ? n.byId.get(t.targetId) : void 0;
  let l = !1;
  if (r && Ui(t, r)) {
    const k = r.pos.x - t.pos.x,
      M = r.pos.y - t.pos.y;
    l = k * k + M * M <= z6 * z6 && !(o && r.kind === "hero");
  }
  const c = n.state.time - Ok;
  let f = null,
    d = 1 / 0,
    h = null,
    u = 1 / 0,
    m = null,
    x = 1 / 0,
    p = null,
    g = 1 / 0;
  const y = n.grid.query(t.pos.x, t.pos.y, F3, F6);
  for (let k = 0; k < y; k++) {
    const M = F6[k];
    if (M.kind === "monster" || !Ui(t, M)) continue;
    const S = Math.hypot(M.pos.x - t.pos.x, M.pos.y - t.pos.y) - M.radius;
    S > F3 ||
      (M.rt.hitHeroTime >= c && S < d && !(o && M.kind === "hero") && ((f = M), (d = S)),
      M.kind === "minion"
        ? S < u && ((h = M), (u = S))
        : M.kind === "hero"
          ? S < x && !o && ((m = M), (x = S))
          : S < g && ((p = M), (g = S)));
  }
  let v;
  if (
    (f
      ? ((v = e.helping && l && r ? r : f), (e.helping = !0))
      : ((v = l && r && !e.helping ? r : (h ?? m ?? p)), (e.helping = !1)),
    (t.targetId = v ? v.id : -1),
    v)
  )
    return;
  if (e.dir > 0 ? i >= s.total - 1 : i <= 1) {
    const k = n.cores[t.team === 0 ? 1 : 0];
    ((e.goalX = k.pos.x), (e.goalY = k.pos.y));
  } else
    (s.pointAt(i + e.dir * Pj, A1), (e.goalX = A1.x - s.ty * e.offset), (e.goalY = A1.y + s.tx * e.offset));
}

function Uj(n, t, e) {
  const s = t.rt,
    i = n.state.time;
  if (($m(n, t, e), s.dash)) {
    py(n, t, e);
    return;
  }
  if (!s.stunned) {
    if ((i >= s.thinkAt && ((s.thinkAt = i + uS), pS(n, t)), t.targetId >= 0)) {
      const a = n.byId.get(t.targetId);
      if (a && Ui(t, a)) {
        Gm(n, t, a, e, !0);
        return;
      }
      ((t.targetId = -1), (s.thinkAt = i));
    }
    s.windupLeft > 0 ||
      s.rooted ||
      (t.m.offLane ? dy(n, t, t.m.goalX, t.m.goalY, e) : Kk(n, t, t.m.goalX, t.m.goalY, e));
  }
}

class om {
  s;
  constructor(t) {
    this.s = t >>> 0;
  }
  next() {
    const t = (this.s = (this.s + 1831565813) >>> 0);
    let e = Math.imul(t ^ (t >>> 15), t | 1);
    return ((e ^= e + Math.imul(e ^ (e >>> 7), e | 61)), ((e ^ (e >>> 14)) >>> 0) / 4294967296);
  }
  range(t, e) {
    return t + (e - t) * this.next();
  }
  int(t) {
    return Math.floor(this.next() * t);
  }
  chance(t) {
    return this.next() < t;
  }
  pick(t) {
    return t[this.int(t.length)];
  }
  fork() {
    return new om((Math.floor(this.next() * 4294967296) ^ 2654435769) >>> 0);
  }
  get state() {
    return this.s;
  }
}

class Oj {
  tasks = [];
  seq = 0;
  at(t, e) {
    const s = { time: t, seq: this.seq++, fn: e },
      i = this.tasks;
    let a = i.length;
    for (i.push(s); a > 0 && i[a - 1].time > t;) ((i[a] = i[a - 1]), a--);
    return ((i[a] = s), s);
  }
  cancel(t) {
    t && (t.fn = null);
  }
  run(t) {
    const e = this.tasks;
    for (; e.length > 0 && e[0].time <= t + 1e-9;) {
      const s = e.shift(),
        i = s.fn;
      i && ((s.fn = null), i());
    }
  }
  get pending() {
    return this.tasks.length;
  }
}

const mS = 0.5;

function Bj(n, t) {
  if (t.kind !== "hero" || !t.alive) return;
  (Hl(t), (t.h.atkOrder = !1));
  const e = hy(n, t, t.h.spawn.x, t.h.spawn.y);
  ((t.facing = t.team === 1 ? Math.PI * 0.75 : -Math.PI * 0.25),
    n.fx("recall_done", e, t.team, { unitId: t.id }));
}

ly("recall", {
  canCast: (n, t) => (Ba(t, "recall") ? "disabled" : null),
  cast(n) {
    const { sim: t, caster: e } = n;
    (Hl(e),
      (e.h.atkOrder = !1),
      Wn(t, e, "recall", { duration: ea.recall.channel, sourceId: e.id, merge: "replace", onExpire: Bj }),
      eu(t, e, "channel", 0, !1),
      t.fx("recall_start", e.pos, e.team, { unitId: e.id }));
  },
});

function Hj(n, t, e) {
  const s = ea.heal,
    i = Math.round(s.duration / mS);
  (gy(n, t, t, (t.stats.maxHp * s.hpRatio) / i),
    (t.mana = Math.min(t.stats.maxMana, t.mana + (t.stats.maxMana * s.manaRatio) / i)));
}

ly("heal", {
  cast(n) {
    const { sim: t, caster: e } = n;
    (Wn(t, e, "restore", {
      duration: ea.heal.duration,
      sourceId: e.id,
      merge: "replace",
      tickInterval: mS,
      onTick: Hj,
    }),
      t.fx("heal", e.pos, e.team, { unitId: e.id }));
  },
});

ly("flash", {
  aim: "facing",
  cast(n) {
    const { sim: t, caster: e, dir: s } = n,
      i = { x: e.pos.x, y: e.pos.y },
      a = ea.flash.range,
      o = hy(t, e, i.x + s.x * a, i.y + s.y * a);
    t.fx("flash", o, e.team, { unitId: e.id, from: i, to: { x: o.x, y: o.y }, dir: { x: s.x, y: s.y } });
  },
});

function ia(n, t = {}) {
  const e = t.monsters !== !1,
    s = t.structures === !0;
  return (i) =>
    !(
      i.team === n ||
      !cy(i) ||
      i === t.exclude ||
      (t.heroesOnly && i.kind !== "hero") ||
      (!e && i.kind === "monster") ||
      (!s && Ss(i)) ||
      (t.visibleTo !== void 0 && !i.visible[t.visibleTo])
    );
}

const U6 = [];

function Pr(n, t, e, s) {
  const i = n.grid.query(t.x, t.y, e, U6),
    a = [],
    o = [];
  for (let r = 0; r < i; r++) {
    const l = U6[r];
    if (!l.alive) continue;
    const c = Math.hypot(l.pos.x - t.x, l.pos.y - t.y);
    if (c > e + l.radius || (s && !s(l))) continue;
    let f = a.length;
    for (a.push(l), o.push(c); f > 0 && o[f - 1] > c;) ((a[f] = a[f - 1]), (o[f] = o[f - 1]), f--);
    ((a[f] = l), (o[f] = c));
  }
  return a;
}

function $j(n, t, e, s, i, a) {
  const o = Pr(n, t, s, a),
    r = i * 0.5,
    l = Math.hypot(e.x, e.y) || 1,
    c = e.x / l,
    f = e.y / l,
    d = [];
  for (const h of o) {
    const u = h.pos.x - t.x,
      m = h.pos.y - t.y,
      x = Math.hypot(u, m);
    if (x <= h.radius) {
      d.push(h);
      continue;
    }
    const p = (u * c + m * f) / x;
    Math.acos(p > 1 ? 1 : p < -1 ? -1 : p) <= r + Math.asin(Math.min(1, h.radius / x)) && d.push(h);
  }
  return d;
}

function zh(n, t, e, s, i, a = null) {
  return Bo(n, t, e, s, i, "skill", a);
}

function gS(n, t, e, s, i) {
  return Bo(n, t, e, s, i, "proc");
}

function xS(n, t, e, s, i = !1) {
  // 治疗加成按"奶人的那个人"放大。吸血/泉水回复不走这里，所以不会被它放大
  const hp = (t.stats?.healPower ?? 0) > 0 ? s * (1 + t.stats.healPower) : s,
    a = gy(n, t, e, hp);
  return (i && a > 0 && n.fx("heal", e.pos, e.team, { unitId: e.id }), a);
}

function oa(n, t, e = {}) {
  const s = n.caster.stats;
  let i = n.val(t);
  return (
    e.ad && (i += n.val(e.ad) * s.ad),
    e.ap && (i += n.val(e.ap) * s.ap),
    e.hp && (i += n.val(e.hp) * s.maxHp),
    i
  );
}

function Gj(n, t, e, s) {
  return Wn(n, t, "stun", { duration: e, sourceId: s ? s.id : -1 }) !== null;
}

function yS(n, t, e, s) {
  return Wn(n, t, "airborne", { duration: e, sourceId: s ? s.id : -1 }) !== null;
}

function tr(n, t, e, s, i, a) {
  return Wn(n, t, "slow", { duration: s, value: e, sourceId: i ? i.id : -1, key: a }) !== null;
}

function Vj(n, t, e, s, i, a) {
  return Wn(n, t, "haste", { duration: s, value: e, sourceId: i ? i.id : -1, key: a, merge: "replace" });
}

function Wj(n, t, e, s, i, a) {
  return Wn(n, t, "attack_speed", {
    duration: s,
    value: e,
    sourceId: i ? i.id : -1,
    key: a,
    merge: "replace",
  });
}

function jj(n, t, e, s, i, a) {
  return Wn(n, t, "shield", { duration: s, value: e, sourceId: i ? i.id : -1, key: a, merge: "replace" });
}

function qj(n, t, e) {
  let s = !1;
  for (const i of e) Va(n, t, i) && (s = !0);
  return s;
}

function Xj(n, t, e) {
  return hy(n, t, e.x, e.y);
}

function Yj(n, t, e, s, i = 14) {
  const a = e.x - t.pos.x,
    o = e.y - t.pos.y,
    r = Math.hypot(a, o);
  return r < 0.05 ? !1 : dW(n, t, a, o, Math.min(s, r), i);
}

function Kj(n, t, e) {
  return n.schedule(t, e);
}

function Wm(n, t, e, s = !1) {
  const { sim: i, caster: a } = n;
  return i.schedule(t, () => {
    a.alive && ((s && a.rt.stunned) || e());
  });
}

function ds(n, t, e, s, i) {
  n.fx(t, e, s, i);
}

function vS(n, t, e, s, i = !0) {
  eu(n, t, e, s, i);
}

function Zj(n, t, e) {
  const s = n.state.time + e;
  (s > t.rt.disarmUntil && (t.rt.disarmUntil = s), Ga(t));
}

function Qj(n, t) {
  Bm(n, t.x, t.y);
}

function Jj(n, t) {
  xy(n, t);
}

function tq(n, t, e) {
  const s = n.skills[t];
  s.cd = Math.max(0, s.cd - s.cdMax * e);
}

function O6(n, t) {
  n.skills[t].cd = 0;
}

function eq(n, t, e, s) {
  const i = n.state.time,
    a = t.h.cooldowns.get(e) ?? -1 / 0;
  return i < a ? !1 : (t.h.cooldowns.set(e, i + s), !0);
}

function Cs(n) {
  return { x: n.x, y: n.y };
}

function nq(n, t, e, s) {
  n.fx(s === "magic" ? "hit_magic" : "hit_physical", e.pos, t.team, { unitId: t.id, targetId: e.id });
}

function wo(n, t, e, s) {
  return (nq(n.sim, n.caster, t, s), zh(n.sim, n.caster, t, e, s, n.slot));
}

function by(n, t, e, s) {
  const i = { x: t.pos.x, y: t.pos.y };
  return (n.nav.moveStraight(i, e.x, e.y, s, t.rt.navR), i);
}

const Lc = Se.panyue.passive.values,
  sq = 0.25,
  iq = 0.5,
  aq = 0.1,
  oq = 0.6;

tu("panyue", {
  modifyBasicAttack(n, t, e, s) {
    Ss(e) || (am(t, "panyue_passive") >= Lc.hits - 1 && (s.bonusMagic += t.stats.maxHp * Lc.hpRatio));
  },
  onBasicAttackHit(n, t, e) {
    if (!Ss(e)) {
      if (am(t, "panyue_passive") >= Lc.hits - 1) {
        (Va(n, t, "panyue_passive"),
          ds(n, "panyue_passive_hit", e.pos, t.team, { unitId: t.id, targetId: e.id }),
          e.alive && tr(n, e, Lc.slow, Lc.slowDur, t, "panyue_passive"));
        return;
      }
      Wn(n, t, "panyue_passive", { duration: 1 / 0, maxStacks: Lc.hits - 1, sourceId: t.id });
    }
  },
});

Oi("panyue", "s1", {
  movement: !0,
  noAnim: !0,
  lockTime: 0,
  aimSpeed: $a("panyue", "s1", "dashSpeed"),
  aimRange: Ck("panyue", "s1") + $a("panyue", "s1", "impactRadius") * oq,
  cast(n) {
    const { sim: t, caster: e } = n,
      s = ia(e.team);
    (ds(t, "panyue_s1_dash", n.origin, e.team, { unitId: e.id, dir: Cs(n.dir) }),
      Hm(t, e, {
        dir: n.dir,
        distance: n.range,
        speed: n.val("dashSpeed"),
        hitRadius: n.width * 0.5,
        filter: ia(e.team, { heroesOnly: !0 }),
        onHit: () => !0,
        onEnd(i) {
          if (i === "interrupted" || !e.alive) return;
          const a = n.val("impactRadius"),
            o = oa(n, "damage", { ad: "adRatio" });
          ds(t, "panyue_s1_impact", e.pos, e.team, { unitId: e.id, radius: a });
          for (const r of Pr(t, e.pos, a, s)) (wo(n, r, o, "physical"), yS(t, r, n.val("knockup"), e));
        },
      }));
  },
});

Oi("panyue", "s2", {
  cast(n) {
    const { sim: t, caster: e } = n,
      s = n.val("duration");
    (ds(t, "panyue_s2_cast", e.pos, e.team, { unitId: e.id, radius: n.radius }),
      Va(t, e, "shield", "panyue_s2"),
      Wn(t, e, "panyue_bulwark", { duration: s, sourceId: e.id, merge: "replace" }));
    const i = Zo(t, {
      visual: "panyue_s2_aura",
      owner: e,
      pos: e.pos,
      radius: n.radius,
      duration: s,
      follow: e,
    });
    Wn(t, e, "shield", {
      duration: s,
      value: oa(n, "shield", { hp: "hpRatio" }),
      sourceId: e.id,
      key: "panyue_s2",
      merge: "replace",
      onRemove(o, r) {
        (Va(o, r, "panyue_bulwark"), Xk(o, i));
      },
    });
    const a = n.val("damage");
    for (const o of Pr(t, e.pos, n.radius, ia(e.team)))
      (wo(n, o, a, "magic"), tr(t, o, n.val("slow"), n.val("slowDur"), e, "panyue_s2"));
  },
});
export { Bo, Hm, fW, _o, AW, CW, zW, FW, my, HW, nS, jW, YW, Dh, Ba, am, Wn, fj, Va, hj, Aj, Cj, Lj, Fj, Uj, om, Oj, ia, Pr, $j, zh, gS, xS, oa, Gj, yS, tr, Vj, Wj, jj, qj, Xj, Yj, Kj, Wm, ds, vS, Zj, Qj, Jj, tq, O6, eq, Cs, wo, by, sq, iq, aq };
