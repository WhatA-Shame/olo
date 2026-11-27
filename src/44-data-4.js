// 44-data-4.js — data｜61 个顶层语句｜56KB
// 对应 game.pretty.js 第 82716–84668 行
// 关键内容：
//   kq                    必须为正数
//   Uq                    集结双方英雄…
//   Xq                    重新开始
//   e1                    chijin
//   Ic                    xingli
//   G6                    damage
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { rn, v0 } from './01-audio.js';
import { Nh, Se, kr } from './02-data.js';
import { zT } from './04-audio-2.js';
import { MI } from './16-render-5.js';
import { xo } from './18-core.js';
import { u8 } from './21-core-4.js';
import { Hf, gB, q8, vB, xB, yB, zi } from './32-ui.js';
import { pH, vH, yH } from './34-ui-2.js';
import { $H } from './35-ui-3.js';
import { QH, XH } from './36-ui-4.js';
import { $a, E0, FG } from './40-ui-8.js';
import { WG, rf } from './41-ai.js';
import { JV, KV, NV, Oi, QV, RV, Ss, XV, Xk, Zo, hW, iu, jV, qV, ql, tu, x6 } from './42-ai-2.js';
import { heroKartId, kartSpec, preloadKart } from './47-kart.js';
import { $j, AW, Aj, Ba, Bo, CW, Cj, Cs, Dh, FW, Fj, Gj, HW, Hm, Jj, Kj, Lj, O6, Oj, Pr, Qj, Uj, Va, Vj, Wj, Wm, Wn, Xj, YW, Yj, Zj, _o, am, aq, by, ds, eq, fW, fj, gS, hj, ia, iq, jW, jj, my, nS, oa, om, qj, sq, tq, tr, vS, wo, xS, yS, zW, zh } from './43-data-3.js';

Oi("panyue", "ult", {
  movement: !0,
  noAnim: !0,
  aimLead: $a("panyue", "ult", "leapTime"),
  cast(n) {
    const { sim: t, caster: e } = n,
      s = n.val("leapTime"),
      i = Cs(e.pos),
      a = ia(e.team);
    let o = null;
    fW(t, e, n.targetPos.x, n.targetPos.y, s, (c) => {
      if ((Va(t, e, "unstoppable", "panyue_ult"), c !== "arrived" || !e.alive)) {
        o && Xk(t, o);
        return;
      }
      const f = Cs(e.pos),
        d = oa(n, "damage", { hp: "hpRatio" });
      ds(t, "panyue_ult_land", f, e.team, { unitId: e.id, radius: n.radius });
      for (const h of Pr(t, f, n.radius, a)) (wo(n, h, d, "physical"), yS(t, h, n.val("knockup"), e));
      Zo(t, {
        visual: "panyue_ult_fissure",
        owner: e,
        pos: f,
        radius: n.radius,
        duration: n.val("zoneDur"),
        tickInterval: sq,
        firstTick: 0,
        onTick(h, u) {
          for (const m of Pr(h, u.pos, u.radius, a)) tr(h, m, n.val("slow"), iq, e, "panyue_fissure");
        },
      });
    });
    const r = e.rt.dash,
      l = r ? { x: r.toX, y: r.toY } : Cs(e.pos);
    (Wn(t, e, "unstoppable", { duration: s + aq, sourceId: e.id, key: "panyue_ult", merge: "replace" }),
      ds(t, "panyue_ult_leap", i, e.team, { unitId: e.id, from: i, to: Cs(l) }),
      (o = Zo(t, { visual: "telegraph", owner: e, pos: l, radius: n.radius, duration: s })));
  },
});

const mP = Se.mushroom.passive.values;

// 被动：普攻与技能命中都攒 1 层菌丝，叠满爆开（额外魔法伤害 + 等量护盾）
// 注意 Wn/Va/tr/ds 的第一个参数都是 sim，不是施法上下文；wo 要的是 {sim,caster,slot}
function mushStack(t, e, s) {
  if (!e.alive || !s || !s.alive || Ss(e) || Ss(s)) return;
  const i = am(e, "mushroom_passive");
  if (i < mP.hits - 1) {
    Wn(t, e, "mushroom_passive", { duration: 1 / 0, maxStacks: mP.hits - 1, sourceId: e.id });
    return;
  }
  Va(t, e, "mushroom_passive");
  const a = wo({ sim: t, caster: e, slot: "passive" }, s, e.stats.maxHp * mP.hpRatio, "magic");
  (s.alive && tr(t, s, mP.slow, mP.slowDur, e, "mushroom_passive"),
    a > 0 &&
      // 每层护盾用独立 key，Vf 会把同类护盾的 value 累加，等于"伤害多少盾就多少"
      Wn(t, e, "shield", { duration: mP.shieldDur, value: a, sourceId: e.id }),
    ds(t, "mushroom_passive_burst", e.pos, e.team, { unitId: e.id, targetId: s.id, amount: a }));
}

tu("mushroom", {
  // 叠满那一击的额外伤害统一由 mushStack 里的 wo() 结算，这里不再往普攻里加 bonusMagic，否则会算两遍
  onBasicAttackHit(n, t, e) {
    Ss(e) || mushStack(n, t, e);
  },
});

Oi("mushroom", "s1", {
  movement: !0,
  noAnim: !0,
  lockTime: 0,
  aimSpeed: $a("mushroom", "s1", "dashSpeed"),
  aimRange: 9,
  cast(n) {
    const { sim: t, caster: e } = n,
      s = n.val("rollTime"),
      i = n.val("dashSpeed"),
      a = n.val("maxSpeed"),
      o = n.val("accel"),
      r = oa(n, "damage", { hp: "hpRatio" }),
      l = n.val("impactRadius"),
      c = n.val("tickInterval"),
      weak = n.val("followRatio"),
      // 冷却从滚动结束后才开始算：cast 里先把 cd 清掉，等滚动收尾再补上（cdMax 已经含 CDR）
      cdMax = e.skills.s1.cdMax,
      hitCount = new Map(),
      foe = ia(e.team),
      hitOk = (u) => u.kind !== "tower" && u.kind !== "core" && foe(u);
    let settled = !1;
    const settle = () => {
      settled || ((settled = !0), (e.skills.s1.cd = cdMax));
    };
    e.skills.s1.cd = 0;
    (ds(t, "mushroom_s1_dash", n.origin, e.team, { unitId: e.id, dir: Cs(n.dir) }),
      Hm(t, e, {
        dir: n.dir,
        distance: 9999,
        speed: i,
        hitRadius: e.radius + 0.7,
        filter: hitOk,
        anim: "roll",
        onHit(d) {
          const h = Cs(d.pos);
          ds(t, "mushroom_s1_impact", h, e.team, { unitId: e.id, radius: l });
          for (const u of Pr(t, d.pos, l, hitOk)) {
            // 每个单位第一次被撞：满额伤害 + 满额击飞；之后每次只有 40%
            const m = hitCount.get(u.id) ?? 0;
            hitCount.set(u.id, m + 1);
            const x = m === 0 ? 1 : weak;
            (wo(n, u, r * x, "physical"), u.alive && yS(t, u, n.val("knockup") * x, e), mushStack(t, e, u));
          }
          return !1;
        },
      }),
      vS(t, e, "roll", s, !1));
    // 每 0.08 秒：加速、跟随移动指令转向、周期性清空命中记录（同一目标可被反复碾）
    const f0 = t.state.time;
    let resetAt = 0,
      tick = 0;
    const f = () => {
      const d = e.rt.dash;
      // 被打断（不再处于 roll 冲刺）也要把冷却补上，否则会白嫖一个 0cd 的滚
      if (!e.alive || !d || d.anim !== "roll") return void settle();
      const h = t.state.time - f0;
      if (h >= s) return (settle(), void iu(t, e, "arrived"));
      d.speed = Math.min(a, i + h * o);
      const p = e.rt.path;
      if (p && e.rt.pathIdx < p.length) {
        const g = p[e.rt.pathIdx],
          y = g.x - e.pos.x,
          k = g.y - e.pos.y,
          v = Math.hypot(y, k);
        v > 0.5 && ((d.dirX = y / v), (d.dirY = k / v), (e.facing = Math.atan2(k, y)));
      }
      if (h >= resetAt) {
        (d.hitIds.length = 0, (resetAt = h + c));
      }
      (tick++ % 2 === 0 && ds(t, "mushroom_s1_trail", e.pos, e.team, { unitId: e.id }), t.schedule(0.08, f));
    };
    t.schedule(0.08, f);
  },
});

function stopMushS2(n, t, e) {
  t.rt.mushS2 = null;
  t.skills.s2.cd = e;
}

Oi("mushroom", "s2", {
  lockTime: 0,
  cast(n) {
    const { sim: t, caster: e } = n,
      s = e.rt;
    if (s.mushS2) {
      // 再按一次 = 主动收起（把这次按键的法力退回去）
      return void (n.def && (e.mana = Math.min(e.stats.maxMana, e.mana + n.def.manaCost[n.level - 1])),
      stopMushS2(t, e, 1.2));
    }
    const i = n.val("manaPerSec"),
      a = oa(n, "damage", { ap: "apRatio" }),
      o = n.val("slow"),
      r = n.val("slowDur"),
      l = n.val("channelTime"),
      c = n.val("tickInterval"),
      f = Cs(n.dir);
    (e.skills.s2.cd = 0, (s.mushS2 = { until: t.state.time + l, nextTick: 0, nextFx: 0, dir: f }));
    (e.facing = Math.atan2(f.y, f.x), vS(t, e, "cast_s2", l, !1));
    const d = () => ds(t, "mushroom_s2_spray", e.pos, e.team, {
      unitId: e.id,
      dir: Cs(s.mushS2 ? s.mushS2.dir : f),
      radius: n.range,
      angle: n.angle,
    });
    d();
    const h = () => {
      const u = s.mushS2;
      if (!u) return;
      if (!e.alive || s.stunned || t.state.time >= u.until) return void stopMushS2(t, e, 1.5);
      const m = i * 0.1;
      if (e.mana < m) return void stopMushS2(t, e, 1.5);
      if (
        ((e.mana -= m),
        t.state.time >= u.nextTick &&
          ((u.nextTick = t.state.time + c),
          (() => {
            // 每段（每 tick）最多叠 1 层被动，不管锥形里有几个目标
            let stacked = !1;
            for (const x of $j(t, e.pos, u.dir, n.range, n.angle, ia(e.team)))
              (wo(n, x, a, "magic"),
                tr(t, x, o, r, e, "mushroom_s2"),
                stacked || ((stacked = !0), mushStack(t, e, x)));
          })()),
        t.state.time >= u.nextFx)
      ) {
        u.nextFx = t.state.time + 0.3;
        d();
      }
      t.schedule(0.1, h);
    };
    t.schedule(0.1, h);
  },
});

Oi("mushroom", "ult", {
  movement: !0,
  noAnim: !0,
  aimLead: $a("mushroom", "ult", "warnTime"),
  cast(n) {
    const { sim: t, caster: e } = n,
      s = n.val("warnTime"),
      i = n.val("leapTime"),
      a = Cs(n.origin),
      o = { x: n.targetPos.x, y: n.targetPos.y },
      // 全图范围：飞得越远，落地半径越大、伤害越高、滞空越久
      dist = Math.hypot(o.x - a.x, o.y - a.y),
      k = Math.min(1, dist / Math.max(1, n.val("farRange"))),
      radius = n.val("radiusMin") + (n.val("radiusMax") - n.val("radiusMin")) * k,
      dmg = oa(n, "damage", { hp: "hpRatio" }) * (1 + n.val("farDamage") * k),
      leap = i + k * 0.55,
      knock = n.val("knockup");
    (Wn(t, e, "unstoppable", {
      duration: s + leap + 0.1,
      sourceId: e.id,
      key: "mushroom_ult",
      merge: "replace",
    }),
      ds(t, "mushroom_ult_charge", a, e.team, { unitId: e.id }),
      vS(t, e, "channel", s, !1),
      Zo(t, { visual: "telegraph", owner: e, pos: o, radius, duration: s + leap }),
      // 蓄力期间把镜头拉远并把焦点挪到"人—落点"中间，全图跳的时候才看得见落点
      (e.rt.mushUlt = { until: t.state.time + s + leap, x: o.x, y: o.y, fromX: a.x, fromY: a.y, radius }),
      t.schedule(s, () => {
        e.alive &&
          fW(t, e, o.x, o.y, leap, (r) => {
            if (r !== "arrived" || !e.alive) return void (e.rt.mushUlt = null);
            const l = Cs(e.pos);
            ds(t, "mushroom_ult_land", l, e.team, { unitId: e.id, radius });
            for (const f of Pr(t, l, radius, ia(e.team)))
              (wo(n, f, dmg, "magic"), f.alive && yS(t, f, knock, e), mushStack(t, e, f));
            e.rt.mushUlt = null;
          });
      }));
  },
});

const e1 = Se.chijin.passive.values,
  B6 = E0("chijin", "s1");

tu("chijin", {
  onSkillCast(n, t, e) {
    (e !== "s1" && e !== "s2" && e !== "ult") ||
      Wn(n, t, "chijin_ember", { duration: e1.window, sourceId: t.id, merge: "replace" });
  },
  modifyBasicAttack(n, t, e, s) {
    Ss(e) || !Ba(t, "chijin_ember") || (s.bonus += e1.damage + e1.adRatio * t.stats.ad);
  },
  onBasicAttackHit(n, t, e) {
    Ss(e) ||
      !Ba(t, "chijin_ember") ||
      (Va(n, t, "chijin_ember"),
      ds(n, "chijin_passive_hit", e.pos, t.team, { unitId: t.id, targetId: e.id }),
      xS(n, t, t, t.stats.maxHp * e1.healHpRatio));
  },
  statMods(n, t, e) {
    const s = Dh(t, "chijin_blaze");
    s && (e.asPct += s.value);
  },
  onTick(n, t) {
    if (t.rt.act !== null) return;
    const e = Dh(t, "chijin_spin");
    e && vS(n, t, "spin", e.timeLeft, !1);
  },
});

Oi("chijin", "s1", {
  aimLead: B6,
  cast(n) {
    const { sim: t, caster: e } = n;
    Wm(n, B6, () => {
      const s = oa(n, "damage", { ad: "adRatio" });
      ds(t, "chijin_s1_slash", e.pos, e.team, {
        unitId: e.id,
        dir: Cs(n.dir),
        radius: n.range,
        angle: n.angle,
      });
      for (const i of $j(t, e.pos, n.dir, n.range, n.angle, ia(e.team)))
        (wo(n, i, s, "physical"), tr(t, i, n.val("slow"), n.val("slowDur"), e, "chijin_s1"));
    });
  },
});

Oi("chijin", "s2", {
  movement: !0,
  noAnim: !0,
  lockTime: 0,
  aimSpeed: $a("chijin", "s2", "dashSpeed"),
  cast(n) {
    const { sim: t, caster: e } = n,
      s = Cs(e.pos);
    (ds(t, "chijin_s2_dash", s, e.team, {
      unitId: e.id,
      from: s,
      to: by(t, e, n.dir, n.range),
      dir: Cs(n.dir),
    }),
      Wn(t, e, "chijin_blaze", {
        duration: n.val("asDur"),
        value: n.val("asBonus"),
        sourceId: e.id,
        merge: "replace",
      }),
      Hm(t, e, {
        dir: n.dir,
        distance: n.range,
        speed: n.val("dashSpeed"),
        hitRadius: n.width * 0.5,
        filter: ia(e.team),
        onHit(i) {
          wo(n, i, oa(n, "damage", { ad: "adRatio" }), "physical");
        },
      }));
  },
});

Oi("chijin", "ult", {
  noAnim: !0,
  lockTime: 0,
  cast(n) {
    const { sim: t, caster: e } = n,
      s = n.val("duration"),
      i = n.val("tick"),
      a = Math.round(s / i),
      o = ia(e.team);
    let r = 0;
    (ds(t, "chijin_ult_start", e.pos, e.team, { unitId: e.id }),
      Wn(t, e, "chijin_spin", { duration: s, sourceId: e.id, merge: "replace" }),
      qj(t, e, ["slow"]),
      Wn(t, e, "dmg_reduction", {
        duration: s,
        value: n.val("reduction"),
        sourceId: e.id,
        key: "chijin_ult",
        merge: "replace",
      }),
      vS(t, e, "spin", s, !1),
      Zj(t, e, s),
      Zo(t, {
        visual: "chijin_ult_spin",
        owner: e,
        pos: e.pos,
        radius: n.radius,
        duration: s,
        follow: e,
        tickInterval: i,
        firstTick: n.def ? n.def.castTime : 0,
        onTick(l, c) {
          if (r >= a) return;
          r++;
          const f = oa(n, "damage", { ad: "adRatio" });
          ds(l, "chijin_ult_tick", c.pos, e.team, { unitId: e.id, radius: c.radius });
          for (const d of Pr(l, c.pos, c.radius, o)) wo(n, d, f, "physical");
          Jj(l, e);
        },
      }));
  },
});

// ── 牛魔 ────────────────────────────────────────────────────
// 火焰层数「磨砂火焰」是 s2 的被动部分，但 s1 的火路和 ult 的火路也会叠，
// 所以单独抽成 nmFlame() 给三个技能共用。
const NMP = Se.niumo.passive.values,
  NMS1 = Se.niumo.skills.s1,
  NMS2 = Se.niumo.skills.s2,
  NMSU = Se.niumo.skills.ult;

const nmS2Lv = (t) => Math.max(1, t.skills.s2.level),
  nmUltLv = (t) => Math.max(1, t.skills.ult.level),
  nmFlameDps = (t) => Nh(NMS2, "flameDps", nmS2Lv(t));

function nmFlammable(u) {
  return u.kind === "hero" || u.kind === "minion" || u.kind === "monster";
}

// 叠一层火焰：每层每秒掉 dps 点魔法伤害，最多 7 层，重复施加会刷新持续时间并把 dps 更新到当前等级
function nmFlame(sim, src, u, dps) {
  if (!u.alive || !nmFlammable(u)) return;
  Wn(sim, u, "niumo_flame", {
    sourceId: src.id,
    duration: Nh(NMS2, "flameDur", nmS2Lv(src)),
    value: dps,
    maxStacks: Nh(NMS2, "maxStacks", 1),
    stacks: 1,
    tickInterval: 1,
    onTick(s, b) {
      const o = s.byId.get(b.sourceId);
      o && o.alive && u.alive && zh(s, o, u, b.value * b.stacks, "magic", "s2");
    },
  });
}

// 直线命中：先按半径粗筛，再算「点到线段」的距离，避免用锥形近似出来的边角误差
function nmLine(sim, from, dir, range, halfW, filter) {
  const out = [],
    seen = new Set();
  for (let i = 0; i <= 6; i++) {
    const k = (i / 6) * range,
      p = { x: from.x + dir.x * k, y: from.y + dir.y * k };
    for (const u of Pr(sim, p, halfW + 1.5, filter)) {
      if (seen.has(u.id)) continue;
      const ex = u.pos.x - from.x,
        ey = u.pos.y - from.y,
        proj = ex * dir.x + ey * dir.y,
        c = proj < 0 ? 0 : proj > range ? range : proj,
        dx = from.x + dir.x * c - u.pos.x,
        dy = from.y + dir.y * c - u.pos.y;
      if (Math.hypot(dx, dy) > halfW + u.radius) continue;
      (seen.add(u.id), out.push(u));
    }
  }
  return out;
}

// 火路：沿线段铺几堆火做视觉，再用一个区域按线段判定伤害（一个区域 tick 一次，不会重叠多打）
function nmTrail(sim, owner, from, dir, range, halfW, dps, dur, tick, fdps) {
  for (let i = 0; i < 4; i++) {
    const k = ((i + 0.5) / 4) * range;
    Zo(sim, {
      visual: "niumo_trail",
      owner,
      pos: { x: from.x + dir.x * k, y: from.y + dir.y * k },
      radius: halfW * 0.95,
      duration: dur,
    });
  }
  Zo(sim, {
    visual: "niumo_trail",
    owner,
    pos: { x: from.x + dir.x * range * 0.5, y: from.y + dir.y * range * 0.5 },
    radius: halfW * 0.6,
    duration: dur,
    tickInterval: tick,
    firstTick: 0.06,
    onTick(s) {
      for (const u of nmLine(s, from, dir, range, halfW, ia(owner.team)))
        u.alive && (zh(s, owner, u, dps, "magic", "s1"), nmFlame(s, owner, u, fdps));
    },
  });
}

tu("niumo", {
  // 被动：攻速 -30%
  statMods(n, t, e) {
    e.asPct -= NMP.asPenalty;
  },
  // 被动：普攻伤害 140%~250%，最大生命越高越接近上限
  modifyBasicAttack(n, t, e, s) {
    const k = Math.min(1, Math.max(0, (t.stats.maxHp - NMP.hpBase) / NMP.hpSpan));
    s.mult *= NMP.dmgMin + (NMP.dmgMax - NMP.dmgMin) * k;
  },
  // 开大状态下普攻带有火焰层数的敌人时，标记本次普攻为消耗层数的致命一击（驱动专属处决动作）
  onBasicAttackStart(n, t, e) {
    const isExec = !!(e && !Ss(e) && Ba(t, "niumo_ult") && (Dh(e, "niumo_flame")?.stacks ?? 0) > 0);
    t.h._nmExecUntil = isExec ? n.state.time + Math.max(0.85, t.animDur || 0.9) : 0;
  },
  // 大招期间：普攻吃掉目标身上所有火焰层数，每层追加伤害并回血
  onBasicAttackHit(n, t, e) {
    if (Ss(e) || !Ba(t, "niumo_ult")) return;
    const b = Dh(e, "niumo_flame");
    if (!b || b.stacks <= 0) return;
    const st = b.stacks,
      lv = nmUltLv(t);
    (Va(n, e, "niumo_flame"),
      ds(n, "niumo_burst", e.pos, t.team, { unitId: t.id, targetId: e.id, stacks: st }),
      zh(n, t, e, st * (Nh(NMSU, "perStack", lv) + Nh(NMSU, "adRatio", lv) * t.stats.ad), "magic", "ult"),
      xS(n, t, t, t.stats.maxHp * Nh(NMSU, "healPerStack", lv) * st));
  },
  // 大招期间击杀敌方英雄：刷新烈焰牛魔变身与免控持续时间
  onKill(n, t, victim) {
    if (!t.alive || !victim || victim.kind !== "hero" || !Ba(t, "niumo_ult")) return;
    const dur = t.h._nmUltDur || Nh(NMSU, "duration", nmUltLv(t));
    (Wn(n, t, "niumo_ult", { duration: dur, sourceId: t.id, merge: "replace" }),
      Wn(n, t, "unstoppable", { duration: dur, sourceId: t.id, key: "niumo_ult", merge: "replace" }),
      ds(n, "niumo_ult_start", t.pos, t.team, { unitId: t.id, duration: dur, refresh: !0 }));
  },
});

Oi("niumo", "s1", {
  noAnim: !0,
  lockTime: 0.38,
  cast(n) {
    const { sim: t, caster: e } = n,
      from = Cs(e.pos),
      dir = Cs(n.dir),
      len = n.range,
      wid = n.width,
      hw = wid * 0.5,
      windup = n.def.castTime || 0.3;
    // 0.3 秒前摇：立刻摆出重劈蓄力并铺直线矩形预警，0.3 秒整劈落
    (vS(t, e, "cast_s1", 0.56, !0),
      ds(t, "niumo_s1_warn", from, e.team, {
        unitId: e.id,
        dir,
        radius: len,
        width: wid,
        duration: windup,
      }));
    Wm(n, windup, () => {
      ds(t, "niumo_s1_slash", from, e.team, {
        unitId: e.id,
        dir,
        radius: len,
        width: wid,
      });
      for (const u of nmLine(t, from, dir, len, hw, ia(e.team)))
        wo(n, u, oa(n, "damage", { ad: "adRatio" }), "physical");
      nmTrail(
        t,
        e,
        from,
        dir,
        len,
        hw,
        n.val("burnDps"),
        n.val("trailDur"),
        n.val("tick"),
        nmFlameDps(e),
      );
    });
  },
});

Oi("niumo", "s2", {
  movement: !0,
  noAnim: !0,
  lockTime: 0,
  cast(n) {
    const { sim: t, caster: e } = n,
      dir = Cs(n.dir),
      dur = n.val("duration"),
      len = n.range,
      hw = n.width * 0.5,
      fdps = nmFlameDps(e),
      // 8 段 → 24 段，总伤害不变：每段 1/3
      segs = Math.max(1, n.val("segments")),
      tick = dur / segs,
      dmg = (n.val("sprayDmg") + n.val("sprayAd") * e.stats.ad) * (8 / segs),
      // 叠层节奏也不变：每 3 段叠一次，整段下来还是 8 次
      stackEvery = segs / 8,
      // 「烈焰行军」边喷边朝锁定方向前进：期间免控、禁止转向与普攻
      march = e.stats.moveSpeed * 0.45,
      // 火锥贴花得跟着人走：每 0.2 秒重铺一张短命锥，靠重叠维持「一直在喷」
      coneEvery = Math.max(1, Math.round(0.2 / tick)),
      lockFacing = Math.atan2(dir.y, dir.x);
    // 立刻清空旧的移动/普攻指令并缴械，挂上 niumo_march（免控 + 禁普攻）并锁死朝向
    ((e.rt.moveMode = 0),
      (e.h.atkOrder = !1),
      (e.targetId = -1),
      Zj(t, e, dur),
      Wn(t, e, "niumo_march", { duration: dur, sourceId: e.id, key: "niumo_march", merge: "replace" }),
      (e.rt.noSteerUntil = t.state.time + dur),
      (e.facing = lockFacing),
      vS(t, e, "cast_s2", dur, !0));
    let left = dur,
      i = 0;
    const step = () => {
      if (!e.alive) return;
      // 先前进，再按新位置喷，锥形和伤害线才跟着人走；撞墙就原地喷
      const nx = e.pos.x + dir.x * march * tick,
        ny = e.pos.y + dir.y * march * tick;
      t.nav.isFree(nx, ny, e.rt.navR) && ((e.pos.x = nx), (e.pos.y = ny));
      const from = Cs(e.pos),
        idx = i++,
        stack = idx % stackEvery === 0,
        cone = idx % coneEvery === 0;
      ((e.facing = lockFacing),
        ds(t, "niumo_s2_spray", from, e.team, {
          unitId: e.id,
          dir,
          radius: len,
          // 只有部分段重铺火锥本体（0.32 秒），其余段只添火星，锥形才会跟着人往前推
          cone,
          duration: 0.32,
          // 视觉角度有个下限：太窄的锥形 decal / 弧光在俯视角度下几乎看不见
          angle: Math.max(0.5, Math.atan2(hw, len) * 2),
        }),
        (left -= tick),
        left > 1e-6 && t.schedule(tick, step));
      for (const u of nmLine(t, from, dir, len, hw, ia(e.team))) {
        if (!u.alive) continue;
        (zh(t, e, u, dmg, "magic", "s2"), stack && nmFlame(t, e, u, fdps));
      }
    };
    step();
  },
});

Oi("niumo", "ult", {
  noAnim: !0,
  lockTime: 0,
  movement: !0,
  cast(n) {
    const { sim: t, caster: e } = n,
      dur = n.val("duration"),
      tick = n.val("trailTick"),
      tdur = n.val("trailDur"),
      tdps = n.val("trailDps"),
      fdps = nmFlameDps(e),
      gen = (e.h._nmUltGen = (e.h._nmUltGen || 0) + 1);
    ((e.h._nmUltDur = dur),
      ds(t, "niumo_ult_start", e.pos, e.team, { unitId: e.id, duration: dur }),
      Wn(t, e, "niumo_ult", { duration: dur, sourceId: e.id, merge: "replace" }),
      Wn(t, e, "unstoppable", { duration: dur, sourceId: e.id, key: "niumo_ult", merge: "replace" }));
    // 只要 niumo_ult 还在（含击杀刷新续期），每隔 trailTick 在脚下留一团火
    const step = () => {
      if (!e.alive || e.h._nmUltGen !== gen || !Ba(e, "niumo_ult")) return;
      const p = Cs(e.pos);
      (Zo(t, {
        visual: "niumo_trail",
        owner: e,
        pos: p,
        radius: 1.55,
        duration: tdur,
        tickInterval: 0.6,
        firstTick: 0.12,
        onTick(s) {
          for (const u of Pr(s, p, 1.55 + 1.5, ia(e.team)))
            u.alive &&
              Math.hypot(u.pos.x - p.x, u.pos.y - p.y) <= 1.55 + u.radius &&
              (zh(s, e, u, tdps, "magic", "ult"), nmFlame(s, e, u, fdps));
        },
      }),
        t.schedule(tick, step));
    };
    step();
  },
});

const XSP = Se.xuesong.passive.values;

tu("xuesong", {
  // 被动「警告铁锹」：攻速减少 70%
  statMods(n, t, e) {
    e.asPct -= XSP.asPenalty;
  },
  // 普攻变为前方锥形范围伤害并眩晕所有命中敌人
  onBasicAttackHit(n, t, e) {
    const dx = e.pos.x - t.pos.x,
      dy = e.pos.y - t.pos.y,
      d = Math.hypot(dx, dy),
      dir = d > 1e-4 ? { x: dx / d, y: dy / d } : { x: Math.cos(t.facing), y: Math.sin(t.facing) },
      coneRad = (XSP.coneAngle * Math.PI) / 180,
      range = Math.max(t.stats.attackRange, d + 0.4);
    ds(n, "xuesong_basic_cone", t.pos, t.team, {
      unitId: t.id,
      dir,
      radius: range,
      angle: coneRad,
    });
    !Ss(e) && e.alive && Gj(n, e, XSP.stunDur, t);
    const splashDmg = t.stats.ad * XSP.aoeRatio;
    for (const u of $j(n, t.pos, dir, range, coneRad, ia(t.team, { exclude: e }))) {
      if (!u.alive) continue;
      (gS(n, t, u, splashDmg, "physical"), Gj(n, u, XSP.stunDur, t));
    }
  },
});

Oi("xuesong", "s1", {
  noAnim: !0,
  lockTime: 0,
  cast(n) {
    const { sim: t, caster: e } = n;
    // 二段：抛沙子（高额法伤 + 强力致盲 + 沙暴特效）
    if (n.isRecast) {
      Va(t, e, "xuesong_sand");
      const dst = Cs(n.targetPos),
        rad = n.radius;
      (Qj(e, dst),
        vS(t, e, "cast_s1", 0.32, !1),
        ds(t, "xuesong_sand_throw", e.pos, e.team, { unitId: e.id, to: dst, targetPos: dst, radius: rad }));
      const dmg = oa(n, "damage", { ap: "apRatio" }),
        blindDur = n.val("blindDur");
      Wm(n, 0.26, () => {
        ds(t, "xuesong_sand_burst", dst, e.team, { unitId: e.id, radius: rad });
        for (const u of Pr(t, dst, rad, ia(e.team))) {
          if (!u.alive) continue;
          (wo(n, u, dmg, "magic"), Wn(t, u, "blind", { duration: blindDur, sourceId: e.id }));
        }
      });
      return;
    }
    // 一段：原地花 2 秒反复撬地铲沙，挖出 60 秒阻挡通行的凹陷沙坑
    const digTime = n.val("digTime"),
      pitR = n.val("pitRadius"),
      pitDur = n.val("pitDur"),
      holdDur = n.val("holdDur"),
      fx = Math.cos(e.facing),
      fy = Math.sin(e.facing),
      pitPos = { x: e.pos.x + fx * (pitR + e.radius + 0.15), y: e.pos.y + fy * (pitR + e.radius + 0.15) };
    t.nav.nearestFree(pitPos.x, pitPos.y, 0.6, pitPos);
    e.h._xsDigZone && (Xk(t, e.h._xsDigZone), (e.h._xsDigZone = null));
    const digZone = Zo(t, {
      visual: "xuesong_dig_mound",
      owner: e,
      pos: pitPos,
      radius: pitR,
      duration: digTime + 0.08,
    });
    e.h._xsDigZone = digZone;
    const clearDig = (sim, unit) => {
      if (unit.h._xsDigZone === digZone) {
        Xk(sim, digZone);
        unit.h._xsDigZone = null;
      }
    };
    (Wn(t, e, "root", { duration: digTime, sourceId: e.id, key: "xuesong_dig", merge: "replace" }),
      Wn(t, e, "xuesong_dig", {
        duration: digTime,
        sourceId: e.id,
        key: "xuesong_dig",
        merge: "replace",
        onRemove: clearDig,
        onExpire: clearDig,
      }),
      Zj(t, e, digTime),
      (e.rt.lockUntil = t.state.time + digTime),
      vS(t, e, "channel", digTime, !0),
      ds(t, "xuesong_dig_start", pitPos, e.team, { unitId: e.id, duration: digTime, radius: pitR }));
    Wm(
      n,
      digTime,
      () => {
        (Va(t, e, "xuesong_dig"), clearDig(t, e));
        const obsId = `xs_pit_${e.id}_${Math.round(t.state.time * 100)}`;
        t.nav.addObstacle(obsId, pitPos.x, pitPos.y, pitR, "pit");
        // 把坑里站着的活单位安全挤到坑边，避免卡死在不可通行区域里
        for (const u of Pr(t, pitPos, pitR + 1.4)) {
          if (Ss(u) || !u.alive) continue;
          const ox = u.pos.x - pitPos.x,
            oy = u.pos.y - pitPos.y,
            dist = Math.hypot(ox, oy),
            need = pitR + u.radius + 0.2;
          if (dist < need) {
            const nx = dist > 1e-4 ? ox / dist : -fx,
              ny = dist > 1e-4 ? oy / dist : -fy;
            Xj(t, u, { x: pitPos.x + nx * need, y: pitPos.y + ny * need });
          }
        }
        Zo(t, {
          visual: "xuesong_pit",
          owner: e,
          pos: pitPos,
          radius: pitR,
          duration: pitDur,
          onEnd() {
            t.nav.removeObstacle(obsId);
          },
        });
        ds(t, "xuesong_pit_open", pitPos, e.team, { unitId: e.id, radius: pitR });
        const fullCd = e.skills.s1.cdMax;
        Wn(t, e, "xuesong_sand", {
          duration: holdDur,
          sourceId: e.id,
          merge: "replace",
          onExpire(sim, unit) {
            unit.skills.s1.cd = Math.max(unit.skills.s1.cd, fullCd);
          },
        });
        e.skills.s1.cd = 0.15;
      },
      !0,
    );
  },
});

Oi("xuesong", "s2", {
  noAnim: !0,
  lockTime: 0,
  cast(n) {
    const { sim: t, caster: e } = n;
    // 二段：选落点跳下来，落地给周围友军加护盾
    if (n.isRecast) {
      Va(t, e, "xuesong_pole");
      const dst = Cs(n.targetPos),
        leapTime = n.val("leapTime"),
        shieldR = n.val("shieldRadius"),
        shieldVal = n.val("shield") + n.val("hpRatio") * e.stats.maxHp,
        shieldDur = n.val("shieldDur");
      Qj(e, dst);
      fW(t, e, dst.x, dst.y, leapTime, () => {
        if (!e.alive) return;
        const land = Cs(e.pos);
        ds(t, "xuesong_s2_land", land, e.team, { unitId: e.id, radius: shieldR });
        for (const u of Pr(t, land, shieldR, (a) => a.team === e.team && a.kind === "hero"))
          jj(t, u, shieldVal, shieldDur, e, "xuesong_s2");
      });
      return;
    }
    // 一段：原地撑起变为不可选中并开大视野（最多 8 秒）
    const maxDur = n.val("maxDur"),
      fullCd = e.skills.s2.cdMax;
    e.h._xsPoleZone && (Xk(t, e.h._xsPoleZone), (e.h._xsPoleZone = null));
    const ring = Zo(t, {
      visual: "xuesong_pole_ring",
      owner: e,
      pos: Cs(e.pos),
      radius: 2.2,
      duration: maxDur,
    });
    e.h._xsPoleZone = ring;
    ds(t, "xuesong_pole_up", e.pos, e.team, { unitId: e.id, duration: maxDur });
    Wn(t, e, "xuesong_pole", {
      duration: maxDur,
      sourceId: e.id,
      merge: "replace",
      onRemove(sim, unit) {
        unit.h._xsPoleZone && (Xk(sim, unit.h._xsPoleZone), (unit.h._xsPoleZone = null));
      },
      onExpire(sim, unit) {
        (unit.h._xsPoleZone && (Xk(sim, unit.h._xsPoleZone), (unit.h._xsPoleZone = null)),
          (unit.skills.s2.cd = Math.max(unit.skills.s2.cd, fullCd)));
      },
    });
    e.skills.s2.cd = 0.2;
  },
});

function xsUltSlam(sim, caster, landPos, radius, dmg, stunDur) {
  ds(sim, "xuesong_ult_land", landPos, caster.team, { unitId: caster.id, radius });
  for (const u of Pr(sim, landPos, radius, ia(caster.team))) {
    if (!u.alive) continue;
    (zh(sim, caster, u, dmg, "magic", "ult"), Gj(sim, u, stunDur, caster));
  }
}

Oi("xuesong", "ult", {
  noAnim: !0,
  lockTime: 0,
  cast(n) {
    const { sim: t, caster: e } = n;
    // 二段：将举起的敌人投掷到身边任意位置，落地造成伤害和眩晕
    if (n.isRecast) {
      const tid = e.h._xsScoopId ?? -1,
        target = tid >= 0 ? t.byId.get(tid) : null,
        dst = Cs(n.targetPos),
        landR = n.val("landRadius"),
        dmg = oa(n, "damage", { ap: "apRatio" }),
        stunDur = n.val("stunDur");
      ((e.h._xsScoopId = -1),
        Va(t, e, "xuesong_scoop"),
        Qj(e, dst),
        vS(t, e, "cast_ult", 0.34, !1),
        ds(t, "xuesong_ult_throw", e.pos, e.team, { unitId: e.id, targetId: tid, to: dst, targetPos: dst }));
      if (target && target.alive) {
        Va(t, target, "xuesong_lifted");
        fW(t, target, dst.x, dst.y, 0.36, () => {
          const land = target.alive ? Cs(target.pos) : dst;
          xsUltSlam(t, e, land, landR, dmg, stunDur);
        });
      }
      return;
    }
    // 一段：伸长手臂用铁锹铲起一名敌方英雄高举压制 2.5 秒
    const target = n.target;
    if (!target || !target.alive) return;
    const holdDur = n.val("holdDur"),
      landR = n.val("landRadius"),
      dmg = oa(n, "damage", { ap: "apRatio" }),
      stunDur = n.val("stunDur"),
      fullCd = e.skills.ult.cdMax,
      lifted = Wn(t, target, "xuesong_lifted", { duration: holdDur, sourceId: e.id, merge: "replace" });
    if (!lifted) return;
    const tipPos = () => ({
      x: e.pos.x + Math.cos(e.facing) * 1.45,
      y: e.pos.y + Math.sin(e.facing) * 1.45,
    });
    ((e.h._xsScoopId = target.id),
      ds(t, "xuesong_ult_scoop", target.pos, e.team, { unitId: e.id, targetId: target.id }),
      Xj(t, target, tipPos()),
      vS(t, e, "cast_ult", 0.22, !1));
    Wn(t, e, "xuesong_scoop", {
      duration: holdDur,
      sourceId: e.id,
      merge: "replace",
      tickInterval: 0.05,
      onTick(sim, unit) {
        const tgt = sim.byId.get(unit.h._xsScoopId);
        if (!tgt || !tgt.alive || !Ba(tgt, "xuesong_lifted")) {
          ((unit.h._xsScoopId = -1), Va(sim, unit, "xuesong_scoop"), (unit.skills.ult.cd = Math.max(unit.skills.ult.cd, fullCd)));
          return;
        }
        Xj(sim, tgt, {
          x: unit.pos.x + Math.cos(unit.facing) * 1.45,
          y: unit.pos.y + Math.sin(unit.facing) * 1.45,
        });
      },
      onRemove(sim, unit) {
        const id = unit.h._xsScoopId ?? -1;
        if (id >= 0) {
          unit.h._xsScoopId = -1;
          const tgt = sim.byId.get(id);
          tgt && Va(sim, tgt, "xuesong_lifted");
        }
      },
      onExpire(sim, unit) {
        const id = unit.h._xsScoopId ?? -1;
        unit.h._xsScoopId = -1;
        const tgt = id >= 0 ? sim.byId.get(id) : null;
        if (tgt && tgt.alive) {
          Va(sim, tgt, "xuesong_lifted");
          xsUltSlam(sim, unit, Cs(tgt.pos), landR, dmg, stunDur);
        }
        unit.skills.ult.cd = Math.max(unit.skills.ult.cd, fullCd);
      },
    });
    e.skills.ult.cd = 0.2;
  },
});

const STP = Se.stone.passive.values;

function stoneThrowLand(sim, caster, dst, rad, dmg, knockup) {
  ds(sim, "stone_throw_land", dst, caster.team, { unitId: caster.id, radius: rad });
  for (const u of Pr(sim, dst, rad, ia(caster.team))) {
    if (!u.alive) continue;
    wo({ sim, caster, slot: "s2" }, u, dmg, "physical");
    knockup > 0 && yS(sim, u, knockup, caster);
  }
}

function stoneCorpseReady(sim, unit) {
  if (!unit.alive) return;
  const corpseDur = unit.h._stCorpseDur ?? 5,
    fullCd = unit.h._stS2FullCd ?? unit.skills.s2.cdMax;
  unit.h._stLockId = -1;
  Ba(unit, "stone_tether") && Va(sim, unit, "stone_tether");
  Wn(sim, unit, "stone_corpse", {
    duration: corpseDur,
    sourceId: unit.id,
    merge: "replace",
    onExpire(s, u) {
      u.skills.s2.cd = Math.max(u.skills.s2.cd, fullCd);
    },
  });
  unit.skills.s2.cd = 0.15;
  ds(sim, "stone_corpse_ready", unit.pos, unit.team, { unitId: unit.id });
}

function stoneSyncGainsBuff(sim, unit) {
  const g = unit.h.stoneGains;
  if (!g || g.stacks <= 0 || !unit.alive) return;
  const ex = Dh(unit, "stone_gains");
  if (ex) {
    ex.stacks = g.stacks;
    ex.value = g.hp;
    ex.timeLeft = 1 / 0;
  } else {
    const b = Wn(sim, unit, "stone_gains", {
      duration: 1 / 0,
      maxStacks: 999,
      stacks: g.stacks,
      value: g.hp,
      sourceId: unit.id,
      key: "stone_gains",
      merge: "replace",
    });
    b && (b.stacks = g.stacks);
  }
}

function stoneGrantStacks(sim, unit, count, lv) {
  if (!unit || count <= 0) return;
  const vals = Se.stone.skills.s1.values,
    idx = Math.max(0, Math.min(vals.hpPerStack.length - 1, (lv || Math.max(1, unit.skills.s1.level)) - 1)),
    g = unit.h.stoneGains ?? (unit.h.stoneGains = { hp: 0, armor: 0, ad: 0, stacks: 0 });
  g.stacks += count;
  g.hp = Math.round((g.hp + vals.hpPerStack[idx] * count) * 10) / 10;
  g.armor = Math.round((g.armor + vals.armorPerStack[idx] * count) * 10) / 10;
  g.ad = Math.round((g.ad + vals.adPerStack[idx] * count) * 10) / 10;
  stoneSyncGainsBuff(sim, unit);
  _o(sim, unit);
}

tu("stone", {
  statMods(n, t, e) {
    const g = t.h.stoneGains;
    if (!g) return;
    ((e.hp += g.hp), (e.armor += g.armor), (e.ad += g.ad));
  },
  onSpawn(n, t) {
    if (t.h.stoneGains && t.h.stoneGains.stacks > 0) {
      stoneSyncGainsBuff(n, t);
      _o(n, t);
    }
  },
  modifyDamageTaken(n, t, e, s) {
    (s.crit && (s.amount *= 1 - STP.critRed),
      Ba(t, "stone_train") && (s.amount *= 1 + (t.h._stTrainVuln ?? 0.3)));
  },
  modifyBasicAttack(n, t, e, s) {
    !Ss(e) && Ba(t, "stone_passive") && (s.bonus += STP.bonusDmg + STP.adRatio * t.stats.ad);
  },
  onBasicAttackHit(n, t, e) {
    if (Ss(e) || !Ba(t, "stone_passive")) return;
    (Va(n, t, "stone_passive"),
      (t.h._stPassCd = STP.cd),
      ds(n, "stone_passive_hit", e.pos, t.team, { unitId: t.id, targetId: e.id }));
  },
  onTick(n, t, e) {
    if (!t.alive) return;
    if (t.h.stoneGains && t.h.stoneGains.stacks > 0 && !Ba(t, "stone_gains")) stoneSyncGainsBuff(n, t);
    if (!Ba(t, "stone_passive")) {
      const left = (t.h._stPassCd ?? 0) - e;
      if (left <= 0) {
        t.h._stPassCd = 0;
        Wn(n, t, "stone_passive", { duration: 1 / 0, sourceId: t.id, merge: "replace" });
      } else t.h._stPassCd = left;
    }
    if ((t.h._stLockId ?? -1) >= 0 && Ba(t, "stone_tether")) {
      const tgt = n.byId.get(t.h._stLockId);
      (!tgt || !tgt.alive) && stoneCorpseReady(n, t);
    }
  },
  onKill(n, t, victim) {
    if (!t.alive || !victim || !Ba(t, "stone_train")) return;
    const vals = Se.stone.skills.s1.values,
      bonus = victim.kind === "hero" ? vals.killBonusHero : vals.killBonusUnit;
    stoneGrantStacks(n, t, bonus, t.h._stTrainLv || Math.max(1, t.skills.s1.level));
    ds(n, "stone_train_done", t.pos, t.team, { unitId: t.id });
  },
  onTakedown(n, t, e) {
    e && e.id === t.h._stLockId && Ba(t, "stone_tether") && stoneCorpseReady(n, t);
  },
});

Oi("stone", "s1", {
  noAnim: !0,
  lockTime: 0,
  cast(n) {
    const { sim: t, caster: e } = n;
    if (n.isRecast) {
      Va(t, e, "stone_train");
      return;
    }
    const maxDur = n.val("maxDur"),
      vuln = n.val("vuln"),
      fullCd = e.skills.s1.cdMax,
      trainLv = n.level;
    e.h._stTrainVuln = vuln;
    e.h._stTrainLv = trainLv;
    const zone = Zo(t, { visual: "stone_train_ring", owner: e, pos: Cs(e.pos), radius: 1.9, duration: maxDur });
    let settled = !1,
      ticksGiven = 0;
    const finish = (sim, unit, completed) => {
      if (settled) return;
      settled = !0;
      zone && Xk(sim, zone);
      if (completed && unit.alive && ticksGiven < maxDur) {
        const rem = maxDur - ticksGiven;
        ticksGiven = maxDur;
        stoneGrantStacks(sim, unit, rem, trainLv);
      }
      unit.alive && ds(sim, "stone_train_done", unit.pos, unit.team, { unitId: unit.id });
      unit.skills.s1.cd = Math.max(unit.skills.s1.cd, fullCd);
    };
    Wn(t, e, "stone_train", {
      duration: maxDur,
      sourceId: e.id,
      merge: "replace",
      tickInterval: 1,
      onTick(sim, unit) {
        if (!unit.alive || ticksGiven >= maxDur) return;
        ticksGiven++;
        stoneGrantStacks(sim, unit, 1, trainLv);
      },
      onRemove(sim, unit) {
        finish(sim, unit, !1);
      },
      onExpire(sim, unit) {
        finish(sim, unit, !0);
      },
    });
    e.skills.s1.cd = 0.45;
  },
});

Oi("stone", "s2", {
  noAnim: !0,
  lockTime: 0,
  cast(n) {
    const { sim: t, caster: e } = n,
      throwDmg = oa(n, "throwDmg", { ad: "adRatio" }),
      landR = n.val("landRadius"),
      knockup = n.val("knockup");
    // 二段：抓起尸体投掷，范围伤害 + 击飞
    if (n.isRecast) {
      Va(t, e, "stone_corpse");
      const dst = Cs(n.targetPos);
      (Qj(e, dst),
        vS(t, e, "cast_s2", 0.28, !1),
        ds(t, "stone_throw", Cs(e.pos), e.team, { unitId: e.id, to: dst }),
        Wm(n, 0.34, () => {
          stoneThrowLand(t, e, dst, landR, throwDmg, knockup);
        }));
      return;
    }
    const target = n.target;
    if (!target || !target.alive) return;
    (Qj(e, target.pos),
      vS(t, e, "cast_s2", 0.24, !1),
      Wn(t, e, "attack_speed", {
        value: n.val("asBonus"),
        duration: n.val("asDur"),
        sourceId: e.id,
        key: "stone_s2",
        merge: "replace",
      }));
    // 对敌方英雄：减速 50%，3 秒内被其移动或传送带着走，期间持续普攻，阵亡解锁尸体投掷
    if (target.kind === "hero") {
      const lockDur = n.val("lockDur"),
        slowVal = n.val("slow"),
        corpseDur = n.val("corpseDur"),
        fullCd = e.skills.s2.cdMax;
      ((e.h._stLockId = target.id),
        (e.h._stCorpseDur = corpseDur),
        (e.h._stS2FullCd = fullCd),
        tr(t, target, slowVal, lockDur, e, "stone_s2"),
        Wn(t, target, "stone_locked", { duration: lockDur, sourceId: e.id, merge: "replace" }),
        ds(t, "stone_tether", target.pos, e.team, { unitId: e.id, targetId: target.id }),
        (e.targetId = target.id),
        (e.h.atkOrder = !0));
      const cleanup = (sim, unit) => {
        const id = unit.h._stLockId ?? -1;
        if (id < 0) return;
        const tgt = sim.byId.get(id);
        tgt && Va(sim, tgt, "stone_locked");
        if (!tgt || !tgt.alive) {
          stoneCorpseReady(sim, unit);
          return;
        }
        unit.h._stLockId = -1;
      };
      Wn(t, e, "stone_tether", {
        duration: lockDur,
        sourceId: e.id,
        value: target.id,
        merge: "replace",
        tickInterval: 0.05,
        onTick(sim, unit) {
          const id = unit.h._stLockId ?? -1;
          if (id < 0) return;
          const tgt = sim.byId.get(id);
          if (!tgt || !tgt.alive) {
            stoneCorpseReady(sim, unit);
            return;
          }
          if (!unit.alive || unit.rt.dash) return;
          const dx = unit.pos.x - tgt.pos.x,
            dy = unit.pos.y - tgt.pos.y,
            d = Math.hypot(dx, dy),
            maxGap = unit.radius + tgt.radius + 0.55;
          if (d > maxGap) {
            const nx = d > 1e-4 ? dx / d : -Math.cos(tgt.facing),
              ny = d > 1e-4 ? dy / d : -Math.sin(tgt.facing);
            (Xj(sim, unit, { x: tgt.pos.x + nx * maxGap, y: tgt.pos.y + ny * maxGap }), Qj(unit, tgt.pos));
          }
          if (unit.targetId !== tgt.id && !unit.rt.stunned) ((unit.targetId = tgt.id), (unit.h.atkOrder = !0));
        },
        onRemove: cleanup,
        onExpire: cleanup,
      });
      return;
    }
    // 对非英雄单位：史诗野怪原地猛砸，小兵与普通野怪直接抓起投掷
    const isEpic = target.kind === "monster" && !!rn[target.monsterType]?.epic;
    if (isEpic) {
      (stoneThrowLand(t, e, Cs(target.pos), landR, throwDmg, 0),
        tr(t, target, n.val("slow"), 2, e, "stone_s2"));
      return;
    }
    const throwRange = n.val("throwRange");
    let dst = null,
      bestD = 1 / 0;
    for (const h of t.state.heroes) {
      if (h.team === e.team || !h.alive) continue;
      const d = Math.hypot(h.pos.x - e.pos.x, h.pos.y - e.pos.y);
      d <= throwRange && d < bestD && ((bestD = d), (dst = Cs(h.pos)));
    }
    if (!dst) {
      const dist = Math.min(6.2, throwRange);
      dst = { x: e.pos.x + n.dir.x * dist, y: e.pos.y + n.dir.y * dist };
      t.nav.nearestFree(dst.x, dst.y, 0.5, dst);
    }
    ds(t, "stone_throw", Cs(target.pos), e.team, { unitId: e.id, targetId: target.id, to: dst });
    fW(t, target, dst.x, dst.y, 0.34, () => {
      const land = target.alive ? Cs(target.pos) : dst;
      stoneThrowLand(t, e, land, landR, throwDmg, knockup);
    });
  },
});

Oi("stone", "ult", {
  movement: !0,
  noAnim: !0,
  lockTime: 0,
  aimLead: $a("stone", "ult", "leapTime"),
  cast(n) {
    const { sim: t, caster: e } = n;
    Ba(e, "stone_train") && Va(t, e, "stone_train");
    const leapTime = n.val("leapTime"),
      slow = n.val("slow"),
      slowDur = n.val("slowDur"),
      red = n.val("reduction"),
      drDur = n.val("drDur"),
      a = ia(e.team);
    let tele = null;
    fW(t, e, n.targetPos.x, n.targetPos.y, leapTime, (res) => {
      if ((Va(t, e, "unstoppable", "stone_ult"), res !== "arrived" || !e.alive)) {
        tele && Xk(t, tele);
        return;
      }
      const land = Cs(e.pos),
        dmg = oa(n, "damage", { ad: "adRatio", hp: "hpRatio" });
      ds(t, "stone_ult_land", land, e.team, { unitId: e.id, radius: n.radius });
      for (const u of Pr(t, land, n.radius, a)) {
        if (!u.alive) continue;
        (wo(n, u, dmg, "physical"), tr(t, u, slow, slowDur, e, "stone_ult"));
      }
      Wn(t, e, "dmg_reduction", {
        value: red,
        duration: drDur,
        sourceId: e.id,
        key: "stone_ult",
        merge: "replace",
      });
    });
    const d = e.rt.dash,
      dst = d ? { x: d.toX, y: d.toY } : Cs(e.pos);
    (Wn(t, e, "unstoppable", { duration: leapTime + aq, sourceId: e.id, key: "stone_ult", merge: "replace" }),
      (tele = Zo(t, { visual: "telegraph", owner: e, pos: dst, radius: n.radius, duration: leapTime })));
  },
});

const SCP = Se.scallion.passive.values,
  SCS1 = Se.scallion.skills.s1;

function scallionLineUnits(sim, origin, dx, dy, len, halfW, enemyTeam) {
  const mid = { x: origin.x + dx * len * 0.5, y: origin.y + dy * len * 0.5 },
    cand = Pr(sim, mid, len * 0.5 + halfW + 1.5, enemyTeam),
    out = [];
  for (let i = 0; i < cand.length; i++) {
    const u = cand[i];
    if (!u.alive) continue;
    const rx = u.pos.x - origin.x,
      ry = u.pos.y - origin.y,
      proj = rx * dx + ry * dy;
    if (proj < -u.radius || proj > len + u.radius) continue;
    const perp = Math.abs(rx * dy - ry * dx);
    if (perp <= halfW + u.radius) out.push(u);
  }
  return out;
}

function fireScallionSlash(sim, caster, dirX, dirY, isPassive) {
  const lv = Math.max(1, caster.skills.s1.level),
    vals = SCS1.values,
    len = SCS1.cast.range,
    w = SCS1.cast.width,
    l = Math.hypot(dirX, dirY) || 1,
    dx = dirX / l,
    dy = dirY / l,
    rawDmg = (vals.damage[lv - 1] + vals.adRatio * caster.stats.ad) * (isPassive ? vals.passiveRatio : 1),
    shred = vals.shred[lv - 1],
    endPos = { x: caster.pos.x + dx * len, y: caster.pos.y + dy * len },
    ctx = { sim, caster, slot: "s1" },
    hits = scallionLineUnits(sim, caster.pos, dx, dy, len, w * 0.5, ia(caster.team));
  ds(sim, "scallion_s1_slash", caster.pos, caster.team, {
    unitId: caster.id,
    from: Cs(caster.pos),
    to: endPos,
    width: w,
    passive: isPassive,
  });
  for (let i = 0; i < hits.length; i++) {
    const u = hits[i];
    wo(ctx, u, rawDmg, "physical");
    if (u.alive && !Ss(u)) {
      Wn(sim, u, "scallion_shred", {
        duration: vals.shredDur,
        value: shred,
        stacks: 1,
        maxStacks: vals.maxStacks,
        sourceId: caster.id,
        key: "scallion_shred",
      });
    }
  }
}

tu("scallion", {
  statMods(n, t, e) {
    const gl = Dh(t, "scallion_glide");
    gl && (e.movePct += gl.value);
    const boost = Dh(t, "scallion_boost");
    boost && ((e.asPct += boost.value), (e.attackRange += t.h._scBoostRange ?? 1.8));
  },
  onTick(n, t, e) {
    if (!t.alive) return;
    const moved =
      t.rt.moved ||
      (t.pos.x - t.prevPos.x) * (t.pos.x - t.prevPos.x) + (t.pos.y - t.prevPos.y) * (t.pos.y - t.prevPos.y) > 4e-4;
    if (t.inCombat || Ba(t, "scallion_beam")) {
      t.h._scGlide = 0;
    } else if (moved) {
      t.h._scGlide = Math.min(SCP.rampSec, (t.h._scGlide ?? 0) + e);
    } else {
      t.h._scGlide = Math.max(0, (t.h._scGlide ?? 0) - e * 3.2);
    }
    const ratio = (t.h._scGlide ?? 0) / SCP.rampSec,
      lvRatio = Math.min(1, Math.max(0, (t.level - 1) / 14)),
      cap = SCP.minHaste + lvRatio * (SCP.maxHaste - SCP.minHaste),
      haste = ratio * cap;
    if (haste > 0.006) {
      const pct = Math.max(1, Math.round(ratio * 100)),
        ex = Dh(t, "scallion_glide");
      if (ex) {
        ((ex.value = haste), (ex.stacks = pct), (ex.timeLeft = 0.45), (ex.duration = 0.45));
      } else {
        const b = Wn(n, t, "scallion_glide", {
          duration: 0.45,
          value: haste,
          stacks: pct,
          maxStacks: 100,
          sourceId: t.id,
          key: "scallion_glide",
          merge: "replace",
        });
        b && (b.stacks = pct);
      }
      if (Math.abs(haste - (t.h._scGlideLast ?? -1)) >= 0.012) {
        ((t.h._scGlideLast = haste), _o(n, t));
      }
    } else if (Ba(t, "scallion_glide")) {
      (Va(n, t, "scallion_glide"), (t.h._scGlideLast = 0), _o(n, t));
    }
  },
  onBasicAttackHit(n, t, e) {
    if (!t.alive) return;
    e &&
      ds(n, "scallion_basic_whip", t.pos, t.team, {
        unitId: t.id,
        from: Cs(t.pos),
        to: Cs(e.pos),
        range: t.stats.attackRange,
      });
    if (t.skills.s1.level <= 0) return;
    const hitsReq = SCS1.values.hitsToProc,
      cnt = (t.h._scS1Cnt ?? 0) + 1;
    if (cnt < hitsReq) {
      t.h._scS1Cnt = cnt;
      const ex = Dh(t, "scallion_s1_cnt");
      if (ex) {
        ((ex.stacks = cnt), (ex.timeLeft = 8), (ex.duration = 8));
      } else {
        const b = Wn(n, t, "scallion_s1_cnt", {
          duration: 8,
          stacks: cnt,
          maxStacks: hitsReq - 1,
          sourceId: t.id,
          key: "scallion_s1_cnt",
          merge: "replace",
        });
        b && (b.stacks = cnt);
      }
      return;
    }
    ((t.h._scS1Cnt = 0), Va(n, t, "scallion_s1_cnt"));
    const dx = e ? e.pos.x - t.pos.x : Math.cos(t.facing),
      dy = e ? e.pos.y - t.pos.y : Math.sin(t.facing);
    fireScallionSlash(n, t, dx, dy, !0);
  },
});

Oi("scallion", "s1", {
  cast(n) {
    fireScallionSlash(n.sim, n.caster, n.dir.x, n.dir.y, !1);
  },
});

Oi("scallion", "s2", {
  cast(n) {
    const { sim: t, caster: e } = n;
    e.h._scBoostRange = n.val("rangeBonus");
    (Wn(t, e, "scallion_boost", {
      duration: n.val("duration"),
      value: n.val("asBonus"),
      sourceId: e.id,
      key: "scallion_boost",
      merge: "replace",
    }),
      ds(t, "scallion_s2_burst", e.pos, e.team, { unitId: e.id }));
  },
});

Oi("scallion", "ult", {
  movement: !0,
  noAnim: !0,
  lockTime: 0,
  cast(n) {
    const { sim: t, caster: e } = n;
    if (n.isRecast) {
      Va(t, e, "scallion_beam");
      return;
    }
    const from = Cs(e.pos),
      dur = n.val("duration"),
      beamLen = n.val("beamLength"),
      beamW = n.val("beamWidth"),
      tickDmg = oa(n, "tickDamage", { ad: "adRatio" }),
      curHpPct = n.val("curHpPct") || 0,
      slow = n.val("slow"),
      slowDur = n.val("slowDur"),
      turnRate = n.val("turnRate"),
      enemyTeam = ia(e.team),
      fullCd = e.skills.ult.cdMax;
    // 1. 闪现到距离内目标点
    const dx0 = n.targetPos.x - from.x,
      dy0 = n.targetPos.y - from.y,
      dist0 = Math.hypot(dx0, dy0),
      maxR = n.range;
    const rawDst =
        dist0 > maxR && dist0 > 1e-4
          ? { x: from.x + (dx0 / dist0) * maxR, y: from.y + (dy0 / dist0) * maxR }
          : { x: n.targetPos.x, y: n.targetPos.y },
      landed = Cs(Xj(t, e, rawDst));
    ds(t, "scallion_ult_blink", from, e.team, { unitId: e.id, from, to: landed });
    // 2. 确定葱击波初始朝向（优先自动瞄准射程内最近的敌方英雄，否则沿闪现方向）
    let aim = dist0 > 0.25 ? Math.atan2(dy0, dx0) : e.facing,
      bestD = beamLen + 2.5;
    for (let i = 0; i < t.heroes.length; i++) {
      const h = t.heroes[i];
      if (!h.alive || h.team !== enemyTeam || h.rt.untargetable) continue;
      const d = Math.hypot(h.pos.x - landed.x, h.pos.y - landed.y);
      if (d < bestD) {
        bestD = d;
        aim = Math.atan2(h.pos.y - landed.y, h.pos.x - landed.x);
      }
    }
    ((e.facing = aim), (e.h._scBeamAim = aim), (e.rt.disarmUntil = Math.max(e.rt.disarmUntil, t.state.time + dur)));
    const zone = Zo(t, { visual: "scallion_ult_beam", owner: e, pos: landed, radius: 1.85, duration: dur });
    let tickCount = 0,
      settled = !1;
    const emitBeam = (dealDmg) => {
      if (!e.alive) return;
      const bx = Math.cos(e.facing),
        by = Math.sin(e.facing),
        endPos = { x: e.pos.x + bx * beamLen, y: e.pos.y + by * beamLen };
      ds(t, "scallion_beam_tick", e.pos, e.team, {
        unitId: e.id,
        from: Cs(e.pos),
        to: endPos,
        width: beamW,
      });
      if (!dealDmg) return;
      const hits = scallionLineUnits(t, e.pos, bx, by, beamLen, beamW * 0.5, enemyTeam);
      for (let i = 0; i < hits.length; i++) {
        const u = hits[i];
        if (!u.alive) continue;
        const pctDmg = curHpPct > 0 ? (u.kind === "monster" ? Math.min(260, u.hp * curHpPct) : u.hp * curHpPct) : 0;
        (wo(n, u, tickDmg + pctDmg, "physical"), u.alive && tr(t, u, slow, slowDur, e, "scallion_ult"));
      }
    };
    const cleanup = (sim, unit) => {
      if (settled) return;
      settled = !0;
      zone && Xk(sim, zone);
      unit.rt.disarmUntil = Math.min(unit.rt.disarmUntil, sim.state.time);
      unit.skills.ult.cd = Math.max(unit.skills.ult.cd, fullCd);
    };
    Wn(t, e, "scallion_beam", {
      duration: dur,
      sourceId: e.id,
      key: "scallion_beam",
      merge: "replace",
      tickInterval: 0.05,
      onTick(sim, unit) {
        if (!unit.alive) return;
        unit.rt.disarmUntil = Math.max(unit.rt.disarmUntil, sim.state.time + 0.12);
        // 按限速缓慢把激光转向玩家/AI 指定的方向
        let diff = (unit.h._scBeamAim ?? unit.facing) - unit.facing;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        const maxStep = turnRate * 0.05;
        unit.facing += Math.max(-maxStep, Math.min(maxStep, diff));
        tickCount++;
        const doDmg = tickCount % 5 === 0,
          doVfx = doDmg || tickCount % 2 === 0;
        doVfx && emitBeam(doDmg);
      },
      onExpire: cleanup,
      onRemove: cleanup,
    });
    // 允许 0.25 秒后再次按大招主动提前中断
    e.skills.ult.cd = 0.25;
    // 落地瞬间立刻喷第一跳激光
    emitBeam(!0);
  },
});

const PBP = Se.paperboy.passive.values,
  PB_CC = ["stun", "airborne", "root", "silence", "slow", "blind", "xuesong_lifted"],
  pbTmpPos = { x: 0, y: 0 };

function paperboyFindTower(sim, unit) {
  if (unit.h._pbLastTowerId >= 0) {
    const t = sim.byId.get(unit.h._pbLastTowerId);
    if (t && t.alive && t.kind === "tower" && t.team === unit.team) return t;
  }
  let best = null,
    bestD2 = 1 / 0;
  for (let i = 0; i < sim.units.length; i++) {
    const u = sim.units[i];
    if (!u.alive || u.kind !== "tower" || u.team !== unit.team) continue;
    const dx = u.pos.x - unit.pos.x,
      dy = u.pos.y - unit.pos.y,
      d2 = dx * dx + dy * dy;
    if (d2 < bestD2) {
      bestD2 = d2;
      best = u;
    }
  }
  return best || sim.cores[unit.team] || null;
}

function paperboyOrbitPos(sim, unit, anchor, ang, out) {
  const rad = 3.6,
    tx = anchor.pos.x + Math.cos(ang) * rad,
    ty = anchor.pos.y + Math.sin(ang) * rad;
  sim.nav.nearestFree(tx, ty, unit.rt.navR, out);
  return out;
}

function paperboySpawnEffigy(sim, unit) {
  const anchor = paperboyFindTower(sim, unit);
  if (!anchor) return;
  if (unit.h._pbEffigyZone) {
    Xk(sim, unit.h._pbEffigyZone);
    unit.h._pbEffigyZone = null;
  }
  const ang = unit.h._pbEffigyAng ?? 0,
    start = paperboyOrbitPos(sim, unit, anchor, ang, { x: anchor.pos.x, y: anchor.pos.y }),
    zone = Zo(sim, {
      visual: "paperboy_effigy",
      owner: unit,
      pos: start,
      radius: 1.35,
      duration: 1 / 0,
    });
  ((unit.h._pbEffigyZone = zone),
    (unit.h._pbEffigyAng = ang),
    (unit.h._pbEffigyReadyAt = 0),
    Va(sim, unit, "paperboy_effigy_cd"),
    Wn(sim, unit, "paperboy_effigy_ready", {
      duration: 1 / 0,
      sourceId: unit.id,
      key: "paperboy_effigy_ready",
      merge: "replace",
    }));
}

function paperboyAddGloom(sim, caster, target, stacks) {
  if (!target.alive || Ss(target) || stacks <= 0) return;
  Wn(sim, target, "paperboy_gloom", {
    duration: 1 / 0,
    stacks,
    maxStacks: 99,
    sourceId: caster.id,
    key: "paperboy_gloom",
  });
}

function paperboyDetonateGloom(sim, caster, center, radius, hitSet) {
  const enemyTeam = ia(caster.team),
    ctx = { sim, caster, slot: "passive" };
  for (const u of Pr(sim, center, radius, enemyTeam)) {
    if (!u.alive || hitSet.has(u.id)) continue;
    const gl = Dh(u, "paperboy_gloom");
    if (!gl || gl.stacks <= 0) continue;
    hitSet.add(u.id);
    const dmg = u.stats.maxHp * gl.stacks * PBP.pctPerStack;
    (Va(sim, u, "paperboy_gloom"),
      ds(sim, "paperboy_gloom_burst", u.pos, caster.team, { unitId: caster.id, targetId: u.id }),
      wo(ctx, u, dmg, "true"));
  }
}

tu("paperboy", {
  onSpawn(n, t) {
    t.h._pbEffigyReadyAt === void 0 && (t.h._pbEffigyReadyAt = 0);
    t.h._pbLastTowerId === void 0 && (t.h._pbLastTowerId = -1);
    if (!t.h._pbEffigyZone) {
      const rem = t.h._pbEffigyReadyAt - n.state.time;
      if (rem <= 0) paperboySpawnEffigy(n, t);
      else
        Wn(n, t, "paperboy_effigy_cd", {
          duration: rem,
          sourceId: t.id,
          key: "paperboy_effigy_cd",
          merge: "replace",
        });
    } else if (!Ba(t, "paperboy_effigy_ready")) {
      Wn(n, t, "paperboy_effigy_ready", {
        duration: 1 / 0,
        sourceId: t.id,
        key: "paperboy_effigy_ready",
        merge: "replace",
      });
    }
  },
  onTick(n, t, e) {
    if (t.h._pbEffigyReadyAt === void 0) t.h._pbEffigyReadyAt = 0;
    if (t.alive) {
      let nearId = -1,
        nearD2 = 16 * 16;
      for (let i = 0; i < n.units.length; i++) {
        const u = n.units[i];
        if (!u.alive || u.kind !== "tower" || u.team !== t.team) continue;
        const dx = u.pos.x - t.pos.x,
          dy = u.pos.y - t.pos.y,
          d2 = dx * dx + dy * dy;
        if (d2 < nearD2) {
          nearD2 = d2;
          nearId = u.id;
        }
      }
      nearId >= 0 && (t.h._pbLastTowerId = nearId);
    }
    if (!t.h._pbEffigyZone) {
      if (n.state.time >= t.h._pbEffigyReadyAt) paperboySpawnEffigy(n, t);
    } else {
      const z = t.h._pbEffigyZone,
        anchor = paperboyFindTower(n, t);
      if (anchor) {
        t.h._pbEffigyAng = (t.h._pbEffigyAng ?? 0) + e * 0.75;
        paperboyOrbitPos(n, t, anchor, t.h._pbEffigyAng, pbTmpPos);
        const dx = pbTmpPos.x - z.pos.x,
          dy = pbTmpPos.y - z.pos.y,
          d = Math.hypot(dx, dy),
          step = Math.min(d, 6.5 * e);
        d > 0.02 && ((z.pos.x += (dx / d) * step), (z.pos.y += (dy / d) * step));
      }
    }
    if (Ba(t, "paperboy_suona") && !Dh(t, "shield", "paperboy_s1")) Va(n, t, "paperboy_suona");
  },
  onLethal(n, t) {
    const z = t.h._pbEffigyZone;
    if (!z) return !1;
    const deathPos = Cs(t.pos),
      effigyPos = Cs(z.pos);
    (Xk(n, z), (t.h._pbEffigyZone = null), Va(n, t, "paperboy_effigy_ready"));
    const effCd =
      PBP.effigyCd -
      Math.min(1, Math.max(0, (t.level - 1) / 14)) * (PBP.effigyCd - (PBP.effigyCdMin ?? PBP.effigyCd));
    ((t.h._pbEffigyReadyAt = n.state.time + effCd),
      Wn(n, t, "paperboy_effigy_cd", {
        duration: effCd,
        sourceId: t.id,
        key: "paperboy_effigy_cd",
        merge: "replace",
      }));
    const ratio = PBP.minHeal + Math.min(1, Math.max(0, (t.level - 1) / 14)) * (PBP.maxHeal - PBP.minHeal),
      healed = Math.max(1, t.stats.maxHp * ratio);
    ((t.hp = healed),
      qj(n, t, PB_CC),
      Va(n, t, "paperboy_suona"),
      Va(n, t, "shield", "paperboy_s1"));
    const landed = Cs(Xj(n, t, effigyPos));
    n.emit({ type: "heal", targetId: t.id, amount: healed, pos: landed });
    ds(n, "paperboy_effigy_shatter", deathPos, t.team, { unitId: t.id, to: landed, radius: PBP.radius });
    const hitSet = new Set();
    (paperboyDetonateGloom(n, t, deathPos, PBP.radius, hitSet),
      paperboyDetonateGloom(n, t, landed, PBP.radius, hitSet));
    return !0;
  },
});

Oi("paperboy", "s1", {
  cast(n) {
    const { sim: t, caster: e } = n,
      dur = n.val("duration"),
      rad = n.val("radius"),
      stacksPerSec = n.val("stacksPerSec") + Math.floor((e.level - 1) / 4),
      shieldVal = oa(n, "shield", { hp: "hpRatio" });
    if (e.h._pbSuonaZone) {
      Xk(t, e.h._pbSuonaZone);
      e.h._pbSuonaZone = null;
    }
    const zone = Zo(t, {
      visual: "paperboy_suona_ring",
      owner: e,
      pos: e.pos,
      radius: rad,
      duration: dur,
      follow: e,
    });
    e.h._pbSuonaZone = zone;
    const pulse = (sim, unit) => {
      if (!unit.alive) return;
      ds(sim, "paperboy_suona_pulse", unit.pos, unit.team, { unitId: unit.id, radius: rad });
      for (const u of Pr(sim, unit.pos, rad, ia(unit.team))) paperboyAddGloom(sim, unit, u, stacksPerSec);
    };
    const cleanup = (sim, unit) => {
      if (zone) Xk(sim, zone);
      unit.h._pbSuonaZone === zone && (unit.h._pbSuonaZone = null);
    };
    Wn(t, e, "shield", {
      duration: dur,
      value: shieldVal,
      sourceId: e.id,
      key: "paperboy_s1",
      merge: "replace",
      onRemove(sim, unit) {
        Va(sim, unit, "paperboy_suona");
      },
    });
    Wn(t, e, "paperboy_suona", {
      duration: dur,
      sourceId: e.id,
      key: "paperboy_suona",
      merge: "replace",
      tickInterval: 1,
      onTick(sim, unit) {
        if (!unit.alive || !Dh(unit, "shield", "paperboy_s1")) {
          Va(sim, unit, "paperboy_suona");
          return;
        }
        pulse(sim, unit);
      },
      onExpire: cleanup,
      onRemove: cleanup,
    });
    pulse(t, e);
  },
});

Oi("paperboy", "s2", {
  cast(n) {
    const { sim: t, caster: e } = n,
      tgt = n.target ?? e,
      immuneDur = n.val("immuneDur"),
      hasteVal = n.val("haste"),
      hasteDur = n.val("hasteDur"),
      spd = n.val("speed"),
      applyCrane = (sim, ally) => {
        if (ally && ally.alive) {
          (qj(sim, ally, PB_CC),
            Wn(sim, ally, "paperboy_crane_guard", {
              duration: immuneDur,
              sourceId: e.id,
              key: "paperboy_crane_guard",
              merge: "replace",
            }),
            Vj(sim, ally, hasteVal, hasteDur, e, "paperboy_s2"),
            ds(sim, "paperboy_crane_hit", ally.pos, e.team, { unitId: e.id, targetId: ally.id }));
        }
        if (e.alive && (!ally || ally.id !== e.id)) {
          (Vj(sim, e, hasteVal, hasteDur, e, "paperboy_s2"),
            ds(sim, "paperboy_crane_hit", e.pos, e.team, { unitId: e.id, targetId: e.id }));
        }
      };
    if (tgt.id === e.id) {
      applyCrane(t, e);
      return;
    }
    FW(t, {
      visual: "paperboy_crane",
      owner: e,
      from: e.pos,
      target: tgt,
      speed: spd,
      radius: 0.35,
      onHit(sim, _p, ally) {
        applyCrane(sim, ally);
      },
    });
  },
});

Oi("paperboy", "ult", {
  cast(n) {
    const { sim: t, caster: e } = n,
      tgt = n.target ?? e;
    if (!tgt || !tgt.alive) return;
    const isSelf = tgt.id === e.id,
      dur = n.val("duration"),
      share = isSelf ? 0 : n.val("share"),
      breakRange = n.val("breakRange");
    if (e.h._pbBindTargetId >= 0) {
      const prev = t.byId.get(e.h._pbBindTargetId);
      if (prev) {
        const pb = Dh(prev, "paperboy_bound");
        pb && pb.sourceId === e.id && Va(t, prev, "paperboy_bound");
      }
    }
    e.h._pbBindTargetId = tgt.id;
    Wn(t, tgt, "paperboy_bound", {
      duration: dur,
      value: share,
      sourceId: e.id,
      key: "paperboy_bound",
      merge: "replace",
    });
    const cleanup = (sim, unit) => {
      const ally = sim.byId.get(tgt.id);
      if (ally) {
        const pb = Dh(ally, "paperboy_bound");
        pb && pb.sourceId === unit.id && Va(sim, ally, "paperboy_bound");
      }
      unit.h._pbBindTargetId === tgt.id && (unit.h._pbBindTargetId = -1);
    };
    Wn(t, e, "paperboy_bind", {
      duration: dur,
      value: share,
      sourceId: tgt.id,
      key: "paperboy_bind",
      merge: "replace",
      tickInterval: 0.25,
      onTick(sim, unit) {
        const ally = sim.byId.get(tgt.id);
        if (
          !unit.alive ||
          !ally ||
          !ally.alive ||
          (!isSelf && Math.hypot(ally.pos.x - unit.pos.x, ally.pos.y - unit.pos.y) > breakRange)
        ) {
          Va(sim, unit, "paperboy_bind");
          return;
        }
        ds(sim, "paperboy_bind_tick", unit.pos, unit.team, {
          unitId: unit.id,
          from: Cs(unit.pos),
          to: Cs(ally.pos),
        });
      },
      onExpire: cleanup,
      onRemove: cleanup,
    });
    ds(t, "paperboy_bind_tick", e.pos, e.team, {
      unitId: e.id,
      from: Cs(e.pos),
      to: Cs(tgt.pos),
    });
  },
});

const MGP = Se.maggot.passive.values,
  MG_TIER_R = [0, 1.05, 1.55, 2.15],
  MG_TIER_OBSR = [0, 0.85, 1.32, 1.88],
  MG_TIER_DUR = [0, MGP.smallDur, MGP.medDur, MGP.largeDur],
  MG_TIER_VIS = ["", "maggot_poop_s", "maggot_poop_m", "maggot_poop_l"],
  MG_TIER_W = [0, 1, 2, 4];

function maggotPoopList(sim) {
  return sim._maggotPoops ?? (sim._maggotPoops = []);
}

function maggotEase(u) {
  const c = Math.max(0, Math.min(1, u));
  return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2;
}

function maggotRemovePoop(sim, rec) {
  if (!rec || rec.removed) return;
  rec.removed = !0;
  if (rec.hasObs) {
    sim.nav.removeObstacle(rec.obsId);
    rec.hasObs = !1;
  }
  const list = maggotPoopList(sim),
    idx = list.indexOf(rec);
  idx >= 0 && list.splice(idx, 1);
  rec.zone && Xk(sim, rec.zone);
}

function maggotPushUnitsOut(sim, pos, obsR) {
  for (const u of Pr(sim, pos, obsR + 1.35)) {
    if (!u.alive || Ss(u) || u.heroId === "maggot") continue;
    const ox = u.pos.x - pos.x,
      oy = u.pos.y - pos.y,
      dist = Math.hypot(ox, oy),
      need = obsR + u.radius + 0.18;
    if (dist < need) {
      const nx = dist > 1e-4 ? ox / dist : 1,
        ny = dist > 1e-4 ? oy / dist : 0;
      Xj(sim, u, { x: pos.x + nx * need, y: pos.y + ny * need });
    }
  }
}

function maggotSetObs(sim, rec, active) {
  if (rec.removed) return;
  if (active && !rec.hasObs) {
    sim.nav.addObstacle(rec.obsId, rec.pos.x, rec.pos.y, rec.obsR, "poop");
    rec.hasObs = !0;
    maggotPushUnitsOut(sim, rec.pos, rec.obsR);
  } else if (!active && rec.hasObs) {
    sim.nav.removeObstacle(rec.obsId);
    rec.hasObs = !1;
  }
}

function maggotTryStartMerges(sim, owner) {
  const list = maggotPoopList(sim);
  // 严格按合成规则发起丝滑融合动画：
  // 1) 金色大粪污吸收靠近的小粪污刷新时长
  // 2) 两坨小粪污 -> 滑向中点合成一坨中粪污
  // 3) 两坨中粪污 -> 滑向中点合成一坨金色大粪污
  for (let i = 0; i < list.length; i++) {
    const p3 = list[i];
    if (p3.removed || p3.state !== "idle" || p3.tier !== 3) continue;
    for (let j = 0; j < list.length; j++) {
      const p1 = list[j];
      if (p1.removed || p1.state !== "idle" || p1.tier !== 1) continue;
      if (Math.hypot(p3.pos.x - p1.pos.x, p3.pos.y - p1.pos.y) <= p3.radius + p1.radius + 1.85) {
        maggotSetObs(sim, p1, !1);
        p1.state = "merging";
        p1.mergeRole = "absorb_into";
        p1.mergeTarget = p3;
        p1.animT = 0;
        p1.animDur = 0.3;
        p1.startX = p1.pos.x;
        p1.startY = p1.pos.y;
        p1.endX = p3.pos.x;
        p1.endY = p3.pos.y;
        p1.mergeOwner = owner;
      }
    }
  }
  const pairMerge = (tier, nextTier, extraDist, dur) => {
    for (let i = 0; i < list.length; i++) {
      const a = list[i];
      if (a.removed || a.state !== "idle" || a.tier !== tier) continue;
      let best = null,
        bestD = 1e9;
      for (let j = i + 1; j < list.length; j++) {
        const b = list[j];
        if (b.removed || b.state !== "idle" || b.tier !== tier) continue;
        const d = Math.hypot(a.pos.x - b.pos.x, a.pos.y - b.pos.y);
        if (d <= a.radius + b.radius + extraDist && d < bestD) {
          bestD = d;
          best = b;
        }
      }
      if (!best) continue;
      const mid = { x: (a.pos.x + best.pos.x) * 0.5, y: (a.pos.y + best.pos.y) * 0.5 };
      sim.nav.withNoPoop(!0, () => sim.nav.nearestFree(mid.x, mid.y, 0.7, mid));
      maggotSetObs(sim, a, !1);
      maggotSetObs(sim, best, !1);
      a.state = "merging";
      a.mergeRole = "primary";
      a.mergePartner = best;
      a.mergeNextTier = nextTier;
      a.mergeOwner = owner;
      a.animT = 0;
      a.animDur = dur;
      a.startX = a.pos.x;
      a.startY = a.pos.y;
      a.endX = mid.x;
      a.endY = mid.y;
      best.state = "merging";
      best.mergeRole = "secondary";
      best.mergePartner = a;
      best.animT = 0;
      best.animDur = dur;
      best.startX = best.pos.x;
      best.startY = best.pos.y;
      best.endX = mid.x;
      best.endY = mid.y;
    }
  };
  pairMerge(1, 2, 1.85, 0.34);
  pairMerge(2, 3, 2.05, 0.38);
}

function maggotUpdatePoops(sim, dt) {
  if (sim._mgPoopLastTick === sim.state.time) return;
  sim._mgPoopLastTick = sim.state.time;
  const list = maggotPoopList(sim);
  let needCheckOwner = null;
  for (let i = list.length - 1; i >= 0; i--) {
    const p = list[i];
    if (p.removed) continue;
    if (p.state === "sucking") {
      p.animT += dt / p.animDur;
      const caster = sim.byId.get(p.suckOwnerId);
      if (caster && caster.alive) {
        p.endX = caster.pos.x + p.suckOffX;
        p.endY = caster.pos.y + p.suckOffY;
      }
      const k = maggotEase(p.animT);
      p.pos.x = p.startX + (p.endX - p.startX) * k;
      p.pos.y = p.startY + (p.endY - p.startY) * k;
      if (p.zone) {
        p.zone.pos.x = p.pos.x;
        p.zone.pos.y = p.pos.y;
      }
      if (p.animT >= 1) {
        sim.nav.withNoPoop(!0, () => sim.nav.nearestFree(p.pos.x, p.pos.y, 0.7, p.pos));
        if (p.zone) {
          p.zone.pos.x = p.pos.x;
          p.zone.pos.y = p.pos.y;
        }
        p.state = "idle";
        maggotSetObs(sim, p, !0);
        if (caster) needCheckOwner = caster;
      }
    } else if (p.state === "merging") {
      if (p.mergeRole === "absorb_into") {
        const tgt = p.mergeTarget;
        if (!tgt || tgt.removed) {
          p.state = "idle";
          maggotSetObs(sim, p, !0);
          continue;
        }
        p.endX = tgt.pos.x;
        p.endY = tgt.pos.y;
        p.animT += dt / p.animDur;
        const k = maggotEase(p.animT);
        p.pos.x = p.startX + (p.endX - p.startX) * k;
        p.pos.y = p.startY + (p.endY - p.startY) * k;
        if (p.zone) {
          p.zone.pos.x = p.pos.x;
          p.zone.pos.y = p.pos.y;
        }
        if (p.animT >= 1) {
          const own = p.mergeOwner ?? sim.byId.get(p.ownerId);
          maggotRemovePoop(sim, p);
          if (tgt.zone) {
            tgt.zone.timeLeft = MGP.largeDur;
            tgt.zone.duration = MGP.largeDur;
          }
          own && ds(sim, "maggot_poop_merge", tgt.pos, own.team, { unitId: own.id, tier: 3 });
        }
      } else {
        p.animT += dt / p.animDur;
        const k = maggotEase(p.animT);
        p.pos.x = p.startX + (p.endX - p.startX) * k;
        p.pos.y = p.startY + (p.endY - p.startY) * k;
        if (p.zone) {
          p.zone.pos.x = p.pos.x;
          p.zone.pos.y = p.pos.y;
        }
        if (p.mergeRole === "primary" && p.animT >= 1) {
          const partner = p.mergePartner,
            mid = { x: p.endX, y: p.endY },
            nextTier = p.mergeNextTier,
            own = p.mergeOwner ?? sim.byId.get(p.ownerId);
          maggotRemovePoop(sim, partner);
          maggotRemovePoop(sim, p);
          if (own) {
            maggotSpawnPoop(sim, own, mid, nextTier, !0);
            ds(sim, "maggot_poop_merge", mid, own.team, { unitId: own.id, tier: nextTier });
            needCheckOwner = own;
          }
        }
      }
    }
  }
  needCheckOwner && maggotTryStartMerges(sim, needCheckOwner);
}

function maggotSpawnPoop(sim, owner, rawPos, tier, skipMerge = !1) {
  const t = Math.max(1, Math.min(3, tier | 0)),
    pos = { x: rawPos.x, y: rawPos.y };
  sim.nav.withNoPoop(!0, () => sim.nav.nearestFree(pos.x, pos.y, 0.7, pos));
  const seq = (sim._maggotPoopSeq = (sim._maggotPoopSeq ?? 0) + 1),
    obsId = `mg_poop_${seq}`,
    r = MG_TIER_R[t],
    obsR = MG_TIER_OBSR[t],
    dur = MG_TIER_DUR[t],
    list = maggotPoopList(sim);
  const rec = {
      id: seq,
      ownerId: owner.id,
      team: owner.team,
      tier: t,
      pos: Cs(pos),
      radius: r,
      obsR,
      obsId,
      hasObs: !1,
      state: "idle",
      animT: 0,
      animDur: 0.34,
      startX: pos.x,
      startY: pos.y,
      endX: pos.x,
      endY: pos.y,
      zone: null,
      removed: !1,
    },
    zone = Zo(sim, {
      visual: MG_TIER_VIS[t],
      owner,
      pos,
      radius: r,
      duration: dur,
      tickInterval: 0.05,
      onTick(s) {
        maggotUpdatePoops(s, 0.05);
      },
      onEnd() {
        if (!rec.removed) {
          rec.removed = !0;
          if (rec.hasObs) {
            sim.nav.removeObstacle(obsId);
            rec.hasObs = !1;
          }
          const idx = list.indexOf(rec);
          idx >= 0 && list.splice(idx, 1);
        }
      },
    });
  rec.zone = zone;
  maggotSetObs(sim, rec, !0);
  list.push(rec);
  !skipMerge && maggotTryStartMerges(sim, owner);
  return rec;
}

function maggotSyncUltCost(unit) {
  const u = unit && unit.skills && unit.skills.ult;
  if (!u || u.level <= 0) return;
  const lv = Math.max(0, Math.min(Se.maggot.skills.ult.manaCost.length - 1, u.level - 1)),
    base = Se.maggot.skills.ult.manaCost[lv] ?? 45,
    power = unit.h._mgLastPower || 0,
    manaMult = Se.maggot.skills.ult.values.ultManaMult ?? 1.8;
  u.cost = Math.round(base * Math.pow(manaMult, power));
}

tu("maggot", {
  onConsumeItem(n, t) {
    if (!t.alive) return;
    Wn(n, t, "maggot_digest", {
      duration: MGP.digestDelay,
      sourceId: t.id,
      key: "maggot_digest",
      merge: "replace",
    });
    Kj(n, MGP.digestDelay, () => {
      if (!t.alive) return;
      ds(n, "maggot_fart", t.pos, t.team, { unitId: t.id });
      maggotSpawnPoop(n, t, t.pos, 1);
    });
  },
  onTick(n, t, e) {
    maggotUpdatePoops(n, e || 0.05);
    if (!t.alive) {
      t.h._mgLastPower && ((t.h._mgLastPower = 0), Va(n, t, "maggot_aura"), _o(n, t));
      t.h._mgNearSmall = 0;
      t.h._mgNearMed = 0;
      t.h._mgNearLarge = 0;
      maggotSyncUltCost(t);
      return;
    }
    const list = maggotPoopList(n),
      rad = MGP.auraRadius;
    let power = 0,
      nSmall = 0,
      nMed = 0,
      nLarge = 0;
    for (let i = 0; i < list.length; i++) {
      const p = list[i];
      if (p.removed) continue;
      if (Math.hypot(p.pos.x - t.pos.x, p.pos.y - t.pos.y) <= rad + p.radius) {
        power += MG_TIER_W[p.tier] || 1;
        if (p.tier === 1) nSmall++;
        else if (p.tier === 2) nMed++;
        else if (p.tier >= 3) nLarge++;
      }
    }
    t.h._mgNearSmall = nSmall;
    t.h._mgNearMed = nMed;
    t.h._mgNearLarge = nLarge;
    power = Math.min(MGP.maxPower, power);
    const prev = t.h._mgLastPower || 0;
    if (power > 0) {
      const ex = Dh(t, "maggot_aura");
      if (ex && ex.stacks === power) {
        ex.timeLeft = 0.6;
      } else {
        const b = Wn(n, t, "maggot_aura", {
          duration: 0.6,
          value: MGP.asPerPower,
          stacks: power,
          maxStacks: MGP.maxPower,
          sourceId: t.id,
          key: "maggot_aura",
          merge: "replace",
        });
        b && (b.stacks = power);
        t.h._mgLastPower = power;
        _o(n, t);
      }
    } else if (prev > 0 || Ba(t, "maggot_aura")) {
      Va(n, t, "maggot_aura");
      t.h._mgLastPower = 0;
      _o(n, t);
    }
    maggotSyncUltCost(t);
  },
  onBasicAttackLaunch(n, t, e) {
    if (!e || !e.alive) return;
    const nSmall = t.h._mgNearSmall || 0,
      nMed = t.h._mgNearMed || 0,
      nLarge = t.h._mgNearLarge || 0;
    // 身边有小粪污：普攻由1块变成2块（额外+1块小粑粑）；中粪污额外+2块小粑粑；金色大粪污额外+1块金色粑粑
    const extraBrown = Math.min(6, nSmall * 1 + nMed * 2),
      extraGold = Math.min(3, nLarge * 1);
    if (extraBrown + extraGold <= 0) return;
    const dx = e.pos.x - t.pos.x,
      dy = e.pos.y - t.pos.y,
      dl = Math.hypot(dx, dy) || 1,
      px = -dy / dl,
      py = dx / dl,
      spd = t.rt.atk.projSpeed || 28;
    let idx = 0;
    const fireCrumb = (isGold) => {
      const slot = ++idx,
        side = (slot % 2 === 1 ? 1 : -1) * (0.28 + Math.floor((slot - 1) / 2) * 0.14);
      Kj(n, slot * 0.055, () => {
        if (!t.alive || !e.alive) return;
        const from = { x: t.pos.x + px * side, y: t.pos.y + py * side };
        FW(n, {
          visual: isGold ? "maggot_basic_gold" : "maggot_basic",
          owner: t,
          from,
          target: e,
          speed: spd * (isGold ? 1.06 : 0.98),
          radius: 0.25,
          onHit(sim, _p, target) {
            if (!target.alive) return;
            if (Ss(target)) {
              gS(sim, t, target, t.stats.ad * (isGold ? 0.35 : 0.2), "magic");
              return;
            }
            const pct = isGold ? MGP.hpPctPerPower * 3.0 : MGP.hpPctPerPower * 1.15;
            let dmg = target.stats.maxHp * pct;
            if (target.kind === "monster") dmg = Math.min(dmg, MGP.monsterCapPerPower * (isGold ? 2.6 : 1.1));
            gS(sim, t, target, dmg, "magic");
            ds(sim, isGold ? "maggot_onhit_gold" : "maggot_onhit", target.pos, t.team, {
              unitId: t.id,
              targetId: target.id,
            });
          },
        });
      });
    };
    for (let i = 0; i < extraBrown; i++) fireCrumb(!1);
    for (let i = 0; i < extraGold; i++) fireCrumb(!0);
  },
});

Oi("maggot", "s1", {
  cast(n) {
    const { sim: t, caster: e } = n,
      dur = n.val("duration"),
      tickInterval = 0.2,
      tickDmg = oa(n, "tickDamage", { ap: "apRatio" }) * (tickInterval / 0.25),
      coatTicks = Math.max(1, Math.round(n.val("coatSec") / tickInterval)),
      len = n.range,
      halfW = n.width * 0.5,
      enemyTeam = ia(e.team);
    e.facing = Math.atan2(n.dir.y, n.dir.x);
    const sprayTick = (sim, unit) => {
      if (!unit.alive) return;
      // 喷吐方向始终跟随活蛆当前头的朝向实时旋转
      const dirX = Math.cos(unit.facing),
        dirY = Math.sin(unit.facing);
      ds(sim, "maggot_spray_tick", unit.pos, unit.team, {
        unitId: unit.id,
        dir: { x: dirX, y: dirY },
        range: len,
      });
      const hits = scallionLineUnits(sim, unit.pos, dirX, dirY, len, halfW, enemyTeam);
      for (const u of hits) {
        wo(n, u, tickDmg, "magic");
        if (u.alive) {
          const b = Wn(sim, u, "maggot_coated", {
            duration: 4,
            stacks: 1,
            maxStacks: coatTicks,
            sourceId: unit.id,
            key: "maggot_coated",
          });
          if (b && b.stacks >= coatTicks) {
            Va(sim, u, "maggot_coated");
            maggotSpawnPoop(sim, unit, u.pos, 1);
          }
        }
      }
    };
    Wn(t, e, "maggot_spray", {
      duration: dur,
      sourceId: e.id,
      key: "maggot_spray",
      merge: "replace",
      tickInterval,
      onTick: sprayTick,
    });
    sprayTick(t, e);
  },
});

Oi("maggot", "s2", {
  cast(n) {
    const { sim: t, caster: e } = n,
      rad = n.val("radius"),
      poseDur = n.val("poseDur"),
      list = maggotPoopList(t),
      found = [];
    Wn(t, e, "maggot_vacuum", {
      duration: poseDur,
      sourceId: e.id,
      key: "maggot_vacuum",
      merge: "replace",
    });
    for (let i = 0; i < list.length; i++) {
      const p = list[i];
      if (!p.removed && p.state !== "merging" && Math.hypot(p.pos.x - e.pos.x, p.pos.y - e.pos.y) <= rad + p.radius) {
        found.push(p);
      }
    }
    const sources = found.map((p) => Cs(p.pos));
    ds(t, "maggot_vacuum", e.pos, e.team, { unitId: e.id, radius: rad, sources });
    if (found.length === 0) return;
    const baseOffX = Math.cos(e.facing) * 1.4,
      baseOffY = Math.sin(e.facing) * 1.4;
    for (let i = 0; i < found.length; i++) {
      const p = found[i],
        ang = (i / Math.max(1, found.length)) * Math.PI * 2,
        ringR = found.length === 1 ? 0 : 0.45;
      maggotSetObs(t, p, !1);
      p.state = "sucking";
      p.suckOwnerId = e.id;
      p.suckOffX = baseOffX + Math.cos(ang) * ringR;
      p.suckOffY = baseOffY + Math.sin(ang) * ringR;
      p.animT = 0;
      p.animDur = 0.44;
      p.startX = p.pos.x;
      p.startY = p.pos.y;
      p.endX = e.pos.x + p.suckOffX;
      p.endY = e.pos.y + p.suckOffY;
    }
  },
});

Oi("maggot", "ult", {
  aimLead: $a("maggot", "ult", "delay"),
  cast(n) {
    const { sim: t, caster: e } = n,
      dst = Cs(n.targetPos),
      delay = n.val("delay"),
      rad = n.radius,
      power = e.h._mgLastPower || 0,
      dmgMult = Math.pow(n.val("ultDmgMult") || 1.5, power);
    ds(t, "maggot_ult_launch", e.pos, e.team, { unitId: e.id, from: Cs(e.pos), to: dst });
    Zo(t, { visual: "telegraph", owner: e, pos: dst, radius: rad, duration: delay });
    Kj(t, delay, () => {
      const dmg = oa(n, "damage", { ad: "adRatio", ap: "apRatio" }) * dmgMult,
        slow = n.val("slow"),
        slowDur = n.val("slowDur");
      ds(t, "maggot_ult_splat", dst, e.team, { unitId: e.id, radius: rad });
      for (const u of Pr(t, dst, rad, ia(e.team))) {
        wo(n, u, dmg, "magic");
        u.alive && tr(t, u, slow, slowDur, e, "maggot_ult");
      }
      maggotSpawnPoop(t, e, dst, 1);
    });
  },
});

const HMP = Se.horseman.passive.values;

function horsemanClearKickZone(sim, unit) {
  if (unit.h._hmKickZone) {
    Xk(sim, unit.h._hmKickZone);
    unit.h._hmKickZone = null;
  }
}

function horsemanReleaseKick(sim, unit, dir, level, chargeFrac, width) {
  const def = Se.horseman.skills.s1,
    minR = Nh(def, "minRatio", level),
    fullDmg = Nh(def, "damage", level) + unit.stats.ad * Nh(def, "adRatio", level),
    baseDmg = fullDmg * (minR + (1 - minR) * chargeFrac),
    minRange = Nh(def, "minRange", level),
    maxRange = Nh(def, "maxRange", level),
    curRange = minRange + (maxRange - minRange) * chargeFrac,
    curWidth = width || def.cast.width || 2.3,
    minStun = Nh(def, "minStun", level),
    maxStun = Nh(def, "stunDur", level),
    stun = minStun + (maxStun - minStun) * chargeFrac,
    minKnock = Nh(def, "minKnock", level),
    maxKnock = Nh(def, "knockDist", level),
    knock = minKnock + (maxKnock - minKnock) * chargeFrac,
    fullCharged = chargeFrac >= 0.98,
    dl = Math.hypot(dir.x, dir.y) || 1,
    nx = dir.x / dl,
    ny = dir.y / dl,
    ndir = { x: nx, y: ny };
  // 蓄力时屁股已经对准目标方向，松手直接猛蹬
  unit.facing = Math.atan2(-ny, -nx);
  vS(sim, unit, "cast_s1", 0.52, !0);
  ds(sim, "horseman_kick_blast", unit.pos, unit.team, {
    unitId: unit.id,
    dir: ndir,
    range: curRange,
    width: curWidth,
    power: chargeFrac,
  });
  const hits = scallionLineUnits(sim, unit.pos, nx, ny, curRange, curWidth * 0.5, ia(unit.team));
  for (const u of hits) {
    const isCrit = fullCharged && !Ss(u) && unit.stats.critChance > 0 && sim.rng.next() < unit.stats.critChance,
      dmg = isCrit ? baseDmg * unit.stats.critDamage : baseDmg;
    sim.fx(isCrit ? "hit_crit" : "hit_physical", u.pos, unit.team, { unitId: unit.id, targetId: u.id });
    Bo(sim, unit, u, dmg, "physical", "skill", "s1", isCrit);
    if (u.alive && !Ss(u)) {
      Gj(sim, u, stun, unit);
      Yj(sim, u, { x: u.pos.x + nx * 12, y: u.pos.y + ny * 12 }, knock, 16 + chargeFrac * 6);
    }
  }
}

function horsemanChargeImpact(sim, unit, target, dirX, dirY, mult, isPrimary) {
  if (!target || !target.alive) return;
  const st = unit.stats,
    isStruct = Ss(target),
    isCrit = !isStruct && st.critChance > 0 && sim.rng.next() < st.critChance,
    dmg = st.ad * mult * (isCrit ? st.critDamage : 1);
  sim.fx(isCrit ? "hit_crit" : "hit_physical", target.pos, unit.team, { unitId: unit.id, targetId: target.id });
  ds(sim, "horseman_charge_hit", target.pos, unit.team, { unitId: unit.id, targetId: target.id });
  Bo(sim, unit, target, dmg, "physical", "basic", null, isCrit);
  if (target.alive && !isStruct) {
    // 主目标沿冲刺方向狠狠顶飞，侧边沿途敌人往斜前方撞开
    const relX = target.pos.x - unit.pos.x,
      relY = target.pos.y - unit.pos.y,
      cross = dirX * relY - dirY * relX,
      sideSign = cross >= 0 ? 1 : -1,
      px = -dirY * sideSign,
      py = dirX * sideSign,
      kx = isPrimary ? dirX : dirX * 0.58 + px * 0.82,
      ky = isPrimary ? dirY : dirY * 0.58 + py * 0.82,
      kdist = isPrimary ? HMP.knockDist : HMP.sideKnock;
    Yj(sim, target, { x: target.pos.x + kx * 12, y: target.pos.y + ky * 12 }, kdist, 18);
    yS(sim, target, HMP.knockAir, unit);
  }
}

function horsemanSyncBar(t) {
  const full = Ba(t, "horseman_charge"),
    ratio = full ? 1 : Math.max(0, Math.min(1, (t.h._hmMoveT || 0) / Math.max(0.1, HMP.runTime)));
  t.chargeBar = { ratio, full };
}

tu("horseman", {
  onSpawn(n, t) {
    t.h._hmMoveT = 0;
    t.h._hmStopT = 0;
    t.h._hmLastX = t.pos.x;
    t.h._hmLastY = t.pos.y;
    t.h._hmStepAcc = 0;
    t.h._hmKickZone = null;
    horsemanSyncBar(t);
  },
  statMods(n, t, e) {
    if (Ba(t, "horseman_charge")) e.attackRange += HMP.bonusRange;
  },
  onTick(n, t, e) {
    if (!t.alive) {
      horsemanClearKickZone(n, t);
      t.h._hmMoveT = 0;
      t.h._hmStopT = 0;
      t.chargeBar = { ratio: 0, full: !1 };
      return;
    }
    const lx = t.h._hmLastX ?? t.pos.x,
      ly = t.h._hmLastY ?? t.pos.y,
      dist = Math.hypot(t.pos.x - lx, t.pos.y - ly);
    t.h._hmLastX = t.pos.x;
    t.h._hmLastY = t.pos.y;
    const moving =
      dist > e * 0.65 &&
      !t.rt.rooted &&
      !t.rt.stunned &&
      t.rt.windupLeft <= 0 &&
      !Ba(t, "horseman_kick_charge");
    if (moving) {
      t.h._hmStopT = 0;
      if (!Ba(t, "horseman_charge")) {
        t.h._hmMoveT = Math.min(HMP.runTime, (t.h._hmMoveT || 0) + e);
        const secs = Math.min(4, Math.floor(t.h._hmMoveT));
        if (t.h._hmMoveT >= HMP.runTime) {
          Va(n, t, "horseman_momentum");
          Wn(n, t, "horseman_charge", {
            duration: 1 / 0,
            sourceId: t.id,
            key: "horseman_charge",
            merge: "replace",
          });
          ds(n, "horseman_charge_ready", t.pos, t.team, { unitId: t.id });
        } else if (secs >= 1) {
          const mb = Dh(t, "horseman_momentum");
          if (!mb || mb.stacks !== secs) {
            Wn(n, t, "horseman_momentum", {
              duration: 1 / 0,
              stacks: secs,
              maxStacks: 5,
              sourceId: t.id,
              key: "horseman_momentum",
              merge: "replace",
            });
          }
        }
      }
      if (Ba(t, "horseman_trample") || Ba(t, "horseman_charge")) {
        t.h._hmStepAcc = (t.h._hmStepAcc || 0) + e;
        const stepGap = Ba(t, "horseman_trample") ? 0.14 : 0.22;
        if (t.h._hmStepAcc >= stepGap) {
          t.h._hmStepAcc = 0;
          ds(n, "horseman_trample_step", t.pos, t.team, { unitId: t.id, big: Ba(t, "horseman_trample") ? 1 : 0 });
        }
      }
    } else {
      t.h._hmStopT = (t.h._hmStopT || 0) + e;
      if (Ba(t, "horseman_charge")) {
        if (t.h._hmStopT >= 0.95) {
          Va(n, t, "horseman_charge");
          t.h._hmMoveT = 0;
        }
      } else if (t.h._hmStopT >= 0.35) {
        t.h._hmMoveT = 0;
        Ba(t, "horseman_momentum") && Va(n, t, "horseman_momentum");
      }
    }
    horsemanSyncBar(t);
  },
  onBasicAttackStart(n, t, target) {
    t.h._hmMoveT = 0;
    t.h._hmStopT = 0;
    Ba(t, "horseman_momentum") && Va(n, t, "horseman_momentum");
    if (!Ba(t, "horseman_charge")) {
      horsemanSyncBar(t);
      return;
    }
    Va(n, t, "horseman_charge");
    horsemanSyncBar(t);
    const ms = t.stats.moveSpeed,
      // 移速越快伤害越高，没有上限
      bonus = HMP.minBonus + Math.max(0, ms - HMP.msFloor) * HMP.msScale,
      mult = 1 + bonus;
    const dx = target && target.alive ? target.pos.x - t.pos.x : Math.cos(t.facing),
      dy = target && target.alive ? target.pos.y - t.pos.y : Math.sin(t.facing),
      dist = Math.hypot(dx, dy) || 1,
      nx = dx / dist,
      ny = dy / dist,
      dir = { x: nx, y: ny },
      dashDist = Math.max(HMP.minDash, Math.min(HMP.maxDash, dist + 1.8)),
      dashSpeed = Math.max(HMP.dashSpeed, ms * 3.1),
      dashDur = dashDist / Math.max(1, dashSpeed),
      fromPos = Cs(t.pos),
      toPos = { x: fromPos.x + nx * dashDist, y: fromPos.y + ny * dashDist },
      hitSet = new Set();
    Wn(n, t, "horseman_dashing", {
      duration: dashDur + 0.1,
      sourceId: t.id,
      key: "horseman_dashing",
      merge: "replace",
    });
    ds(n, "horseman_charge_dash", fromPos, t.team, {
      unitId: t.id,
      from: fromPos,
      to: toPos,
    });
    // Hm 会取消普攻前摇，因此冲锋碰撞本身直接完成此次普攻的伤害与撞飞
    Hm(n, t, {
      dir,
      distance: dashDist,
      speed: dashSpeed,
      anim: "dash",
      hitRadius: HMP.hitRadius || t.radius + 1.05,
      filter: ia(t.team),
      onHit(u) {
        if (hitSet.has(u.id)) return !1;
        hitSet.add(u.id);
        horsemanChargeImpact(n, t, u, nx, ny, mult, !!target && u.id === target.id);
        // 返回 false：不停下来，冲刺过程撞开沿途所有敌人
        return !1;
      },
      onEnd() {
        Va(n, t, "horseman_dashing");
        if (target && target.alive && !hitSet.has(target.id)) {
          const rem = Math.hypot(target.pos.x - t.pos.x, target.pos.y - t.pos.y);
          if (rem <= t.radius + target.radius + 1.8) {
            hitSet.add(target.id);
            horsemanChargeImpact(n, t, target, nx, ny, mult, !0);
          }
        }
      },
    });
  },
  onSkillCast(n, t, slot) {
    if (slot !== "s1" && slot !== "s2" && slot !== "ult") return;
    const ultLv = t.skills.ult.level;
    if (ultLv <= 0) return;
    const spd = Nh(Se.horseman.skills.ult, "passiveSpeed", ultLv),
      dur = Nh(Se.horseman.skills.ult, "passiveDur", ultLv);
    Vj(n, t, spd, dur, t, "horseman_stride");
  },
  onKill(n, t, victim) {
    if (!victim || victim.kind !== "hero" || t.skills.ult.level <= 0) return;
    if (t.skills.ult.cd > 0) {
      O6(t, "ult");
      ds(n, "horseman_trample_reset", t.pos, t.team, { unitId: t.id });
    }
  },
});

Oi("horseman", "s1", {
  lockTime: 0,
  noAnim: !0,
  cast(n) {
    const { sim: t, caster: e } = n,
      fullCharge = n.val("fullCharge"),
      maxCharge = n.val("maxCharge"),
      dl = Math.hypot(n.dir.x, n.dir.y) || 1,
      nx = n.dir.x / dl,
      ny = n.dir.y / dl;
    if (n.isRecast) {
      const elapsed = Math.max(0, t.state.time - (e.h._hmKickStart ?? t.state.time)),
        p = Math.max(0, Math.min(1, elapsed / Math.max(0.1, fullCharge))),
        cdMax = e.h._hmKickCd || e.skills.s1.cdMax;
      e.h._hmKickReleased = !0;
      Va(t, e, "horseman_kick_charge");
      horsemanClearKickZone(t, e);
      horsemanReleaseKick(t, e, { x: nx, y: ny }, n.level, p, n.width);
      e.skills.s1.cd = cdMax;
      return;
    }
    const cdMax = e.skills.s1.cdMax;
    e.skills.s1.cd = 0;
    e.h._hmKickStart = t.state.time;
    e.h._hmKickDir = { x: nx, y: ny };
    e.h._hmKickCd = cdMax;
    e.h._hmKickLvl = n.level;
    e.h._hmKickWidth = n.width || Se.horseman.skills.s1.cast.width;
    e.h._hmKickReleased = !1;
    // 蓄力立刻打断普攻与移动指令，防止边蓄力边扭头平A
    e.h.atkOrder = !1;
    e.targetId = -1;
    e.rt.windupLeft = 0;
    e.rt.windupTarget = -1;
    e.rt.act === "attack" && (e.rt.act = null);
    // 蓄力一开始就把屁股对准技能方向
    e.facing = Math.atan2(-ny, -nx);
    horsemanClearKickZone(t, e);
    e.h._hmKickZone = Zo(t, {
      visual: "horseman_kick_zone",
      owner: e,
      followUnitId: e.id,
      pos: Cs(e.pos),
      radius: 2.2,
      duration: maxCharge,
    });
    Wn(t, e, "horseman_kick_charge", {
      duration: maxCharge,
      sourceId: e.id,
      key: "horseman_kick_charge",
      merge: "replace",
      tickInterval: 0.08,
      onTick(sim, unit) {
        if (!unit.alive || unit.rt.stunned || unit.rt.silenced) {
          unit.h._hmKickReleased = !0;
          Va(sim, unit, "horseman_kick_charge");
          horsemanClearKickZone(sim, unit);
          unit.skills.s1.cd = Math.min(cdMax, 2.2);
          return;
        }
        if (unit.h._hmKickDir) {
          unit.facing = Math.atan2(-unit.h._hmKickDir.y, -unit.h._hmKickDir.x);
        }
      },
      onExpire(sim, unit) {
        horsemanClearKickZone(sim, unit);
        if (unit.h._hmKickReleased || !unit.alive) return;
        unit.h._hmKickReleased = !0;
        const fDir = unit.h._hmKickDir || { x: -Math.cos(unit.facing), y: -Math.sin(unit.facing) };
        horsemanReleaseKick(sim, unit, fDir, unit.h._hmKickLvl || 1, 1, unit.h._hmKickWidth || 2.3);
        unit.skills.s1.cd = unit.h._hmKickCd || cdMax;
      },
      onRemove(sim, unit) {
        horsemanClearKickZone(sim, unit);
        if (!unit.h._hmKickReleased) {
          unit.skills.s1.cd = Math.min(unit.h._hmKickCd || cdMax, 2.2);
        }
      },
    });
  },
});

Oi("horseman", "s2", {
  cast(n) {
    const { sim: t, caster: e } = n,
      rad = n.val("radius"),
      dmg = oa(n, "damage", { ap: "apRatio", ad: "adRatio" }),
      weaken = n.val("weaken"),
      weakDur = n.val("weakDur"),
      immuneDur = n.val("immuneDur");
    // 立刻解除自身减速、定身与沉默，获得持续控制免疫
    qj(t, e, ["slow", "root", "silence"]);
    Wn(t, e, "horseman_neigh_guard", {
      duration: immuneDur,
      sourceId: e.id,
      key: "horseman_neigh_guard",
      merge: "replace",
    });
    ds(t, "horseman_neigh", e.pos, e.team, { unitId: e.id, radius: rad });
    for (const u of Pr(t, e.pos, rad, ia(e.team))) {
      wo(n, u, dmg, "magic");
      u.alive &&
        !Ss(u) &&
        Wn(t, u, "horseman_weak", {
          duration: weakDur,
          value: weaken,
          sourceId: e.id,
          key: "horseman_weak",
          merge: "replace",
        });
    }
  },
});

Oi("horseman", "ult", {
  cast(n) {
    const { sim: t, caster: e } = n,
      burst = n.val("burstSpeed"),
      endSpd = n.val("endSpeed"),
      dur = n.val("duration");
    ds(t, "horseman_trample_start", e.pos, e.team, { unitId: e.id, radius: 3.2 });
    Vj(t, e, burst, 0.3, e, "horseman_trample");
    Wn(t, e, "horseman_trample", {
      duration: dur,
      value: burst,
      sourceId: e.id,
      key: "horseman_trample",
      merge: "replace",
      tickInterval: 0.15,
      onTick(sim, unit, buff) {
        if (!unit.alive) return;
        const frac = Math.max(0, Math.min(1, buff.timeLeft / Math.max(0.1, dur))),
          cur = endSpd + (burst - endSpd) * Math.pow(frac, 1.25);
        buff.value = cur;
        Vj(sim, unit, cur, 0.28, unit, "horseman_trample");
      },
      onExpire(sim, unit) {
        Va(sim, unit, "haste", "horseman_trample");
      },
      onRemove(sim, unit) {
        Va(sim, unit, "haste", "horseman_trample");
      },
    });
  },
});

const CWP = Se.cow.passive.values;

function cowSyncGainsBuff(sim, unit) {
  const g = unit.h.cowGains;
  if (!g || g.stacks <= 0) return;
  const b = Wn(sim, unit, "cow_gains", {
    duration: 1 / 0,
    sourceId: unit.id,
    maxStacks: 999,
    stacks: 1,
    key: "cow_gains",
    merge: "replace",
  });
  b && (b.stacks = g.stacks);
}

function cowGrantStacks(sim, unit, count, lv) {
  if (!unit.h.cowGains) unit.h.cowGains = { stacks: 0, ad: 0, moveSpeed: 0, cdr: 0 };
  const g = unit.h.cowGains,
    vals = Se.cow.skills.s1.values,
    idx = Math.max(0, Math.min(vals.adPerStack.length - 1, (lv || 1) - 1));
  g.stacks += count;
  g.ad = Math.round((g.ad + vals.adPerStack[idx] * count) * 100) / 100;
  g.moveSpeed = Math.round((g.moveSpeed + vals.msPerStack[idx] * count) * 10000) / 10000;
  g.cdr = Math.round((g.cdr + vals.cdrPerStack[idx] * count) * 10000) / 10000;
  cowSyncGainsBuff(sim, unit);
  _o(sim, unit);
}

function cowClearGiantZone(sim, unit) {
  unit.h._cowGiantZone && (Xk(sim, unit.h._cowGiantZone), (unit.h._cowGiantZone = null));
}

function cowCrossesTower(sim, sx, sy, ex, ey) {
  const dx = ex - sx,
    dy = ey - sy,
    lenSq = dx * dx + dy * dy;
  if (lenSq < 1e-4) return !1;
  for (let i = 0; i < sim.units.length; i++) {
    const u = sim.units[i];
    if (!u.alive || (u.kind !== "tower" && u.kind !== "core")) continue;
    const t = Math.max(0, Math.min(1, ((u.pos.x - sx) * dx + (u.pos.y - sy) * dy) / lenSq)),
      px = sx + dx * t - u.pos.x,
      py = sy + dy * t - u.pos.y,
      r = u.radius + 0.55;
    if (px * px + py * py < r * r) return !0;
  }
  return !1;
}

function cowTryStride(sim, unit) {
  const rt = unit.rt;
  if (rt.rooted || rt.stunned || rt.dash !== null || (unit.h._cowStrideCd || 0) > 0) return;
  let dx = 0,
    dy = 0,
    savedGoal = null;
  if (rt.moveMode === 1) {
    dx = rt.dirX;
    dy = rt.dirY;
  } else if (rt.moveMode === 2) {
    const gx = rt.goalX - unit.pos.x,
      gy = rt.goalY - unit.pos.y,
      gd = Math.hypot(gx, gy);
    if (gd < 0.85) return;
    dx = gx / gd;
    dy = gy / gd;
    savedGoal = { x: rt.goalX, y: rt.goalY };
  } else return;
  const dl = Math.hypot(dx, dy);
  if (dl < 0.1) return;
  dx /= dl;
  dy /= dl;

  const navR = rt.navR,
    sx = unit.pos.x,
    sy = unit.pos.y,
    probe1 = sim.nav.sample(sim.nav.clear, sx + dx * 0.88, sy + dy * 0.88),
    probe2 = sim.nav.sample(sim.nav.clear, sx + dx * 1.32, sy + dy * 1.32);
  if (probe1 >= navR + 0.04 && probe2 >= navR + 0.04) return;

  const ms = unit.stats.moveSpeed || 5.5,
    maxCross = Math.min(CWP.maxCross, Math.max(1.5, CWP.baseCross + Math.max(0, ms - CWP.msFloor) * CWP.msScale));
  let sawBlock = !1,
    landX = 0,
    landY = 0,
    landD = 0;
  for (let d = 0.75; d <= maxCross; d += 0.3) {
    const tx = sx + dx * d,
      ty = sy + dy * d,
      clr = sim.nav.sample(sim.nav.clear, tx, ty);
    if (clr < navR + 0.04) {
      sawBlock = !0;
    } else if (sawBlock && sim.nav.isFree(tx, ty, navR + 0.08)) {
      landX = tx;
      landY = ty;
      landD = d;
      break;
    }
  }
  if (!sawBlock || landD <= 0) return;
  if (cowCrossesTower(sim, sx, sy, landX, landY)) return;

  const fromPos = Cs(unit.pos),
    dur = Math.max(0.18, Math.min(0.38, landD / Math.max(11, ms * 2.3)));
  unit.h._cowStrideCd = CWP.cd;
  Wn(sim, unit, "cow_stride", { duration: dur + 0.08, sourceId: unit.id, key: "cow_stride", merge: "replace" });
  ds(sim, "cow_stride", fromPos, unit.team, { unitId: unit.id, from: fromPos, to: { x: landX, y: landY } });
  fW(sim, unit, landX, landY, dur, () => {
    Va(sim, unit, "cow_stride");
    if (savedGoal && unit.alive && !unit.rt.rooted && !unit.rt.stunned && unit.rt.moveMode === 0) {
      unit.rt.moveMode = 2;
      unit.rt.goalX = savedGoal.x;
      unit.rt.goalY = savedGoal.y;
    }
  });
}

tu("cow", {
  statMods(n, t, e) {
    const g = t.h.cowGains;
    if (g) {
      e.ad += g.ad;
      e.moveFlat += g.moveSpeed;
      e.cdr += g.cdr;
    }
    const ex = Dh(t, "cow_exhaust");
    if (ex) e.movePct -= ex.value || 0.4;
    const gi = Dh(t, "cow_giant");
    if (gi) {
      const lv = Math.max(1, Math.min(3, gi.value || t.skills.ult.level || 1)),
        uv = Se.cow.skills.ult.values;
      e.hp += uv.bonusHp[lv - 1];
      e.movePct += uv.bonusMs[lv - 1];
    }
  },
  onSpawn(n, t) {
    t.h._cowStrideCd = 0;
    cowClearGiantZone(n, t);
    t.chargeBar = null;
    if (t.h.cowGains && t.h.cowGains.stacks > 0) {
      cowSyncGainsBuff(n, t);
      _o(n, t);
    }
  },
  onTick(n, t, e) {
    if (!t.alive) {
      cowClearGiantZone(n, t);
      t.chargeBar = null;
      return;
    }
    if (t.h.cowGains && t.h.cowGains.stacks > 0 && !Ba(t, "cow_gains")) cowSyncGainsBuff(n, t);
    if ((t.h._cowStrideCd || 0) > 0) t.h._cowStrideCd = Math.max(0, t.h._cowStrideCd - e);
    if (t.h._cowGiantZone) {
      if (Ba(t, "cow_giant")) {
        t.h._cowGiantZone.pos.x = t.pos.x;
        t.h._cowGiantZone.pos.y = t.pos.y;
      } else cowClearGiantZone(n, t);
    }
    const sq = Dh(t, "cow_squat");
    if (sq) {
      const ratio = Math.max(0, Math.min(1, (sq.duration - sq.timeLeft) / Math.max(0.1, sq.duration)));
      t.chargeBar = { ratio, full: ratio >= 0.98 };
    } else if (t.chargeBar) {
      t.chargeBar = null;
    }
    cowTryStride(n, t);
  },
});

Oi("cow", "s1", {
  noAnim: !0,
  lockTime: 0,
  cast(n) {
    const { sim: t, caster: e } = n;
    if (n.isRecast) {
      Va(t, e, "cow_squat");
      return;
    }
    const maxDur = n.val("maxDur"),
      exDur = n.val("exhaustDur"),
      exPerStack = n.val("exhaustPerStack") || 0,
      exSlow = n.val("exhaustSlow"),
      fullCd = e.skills.s1.cdMax,
      squatLv = n.level,
      zone = Zo(t, { visual: "cow_squat_ring", owner: e, pos: Cs(e.pos), radius: 2.0, duration: maxDur });
    let settled = !1,
      ticksGiven = 0;
    const finish = (sim, unit, completed) => {
      if (settled) return;
      settled = !0;
      zone && Xk(sim, zone);
      unit.chargeBar = null;
      if (completed && unit.alive && ticksGiven < maxDur) {
        const rem = maxDur - ticksGiven;
        ticksGiven = maxDur;
        cowGrantStacks(sim, unit, rem, squatLv);
      }
      if (unit.alive) {
        ds(sim, "cow_squat_done", unit.pos, unit.team, { unitId: unit.id });
        if (!Ba(unit, "cow_giant")) {
          const curStacks = unit.h.cowGains?.stacks ?? 0,
            totalExDur = Math.round((exDur + curStacks * exPerStack) * 100) / 100;
          Wn(sim, unit, "cow_exhaust", {
            duration: totalExDur,
            value: exSlow,
            sourceId: unit.id,
            key: "cow_exhaust",
            merge: "replace",
          });
        }
      }
      unit.skills.s1.cd = Math.max(unit.skills.s1.cd, fullCd);
    };
    Wn(t, e, "cow_squat", {
      duration: maxDur,
      sourceId: e.id,
      key: "cow_squat",
      merge: "replace",
      tickInterval: 1,
      onTick(sim, unit) {
        if (!unit.alive || ticksGiven >= maxDur) return;
        ticksGiven++;
        cowGrantStacks(sim, unit, 1, squatLv);
      },
      onRemove(sim, unit) {
        finish(sim, unit, !1);
      },
      onExpire(sim, unit) {
        finish(sim, unit, !0);
      },
    });
    e.skills.s1.cd = 0.45;
  },
});

Oi("cow", "s2", {
  movement: !0,
  noAnim: !0,
  cast(n) {
    const { sim: t, caster: e, target: tgt } = n;
    if (!tgt || !tgt.alive) return;
    Ba(e, "cow_squat") && Va(t, e, "cow_squat");
    const fromPos = Cs(e.pos),
      dx = tgt.pos.x - fromPos.x,
      dy = tgt.pos.y - fromPos.y,
      dist = Math.hypot(dx, dy) || 1,
      nx = dx / dist,
      ny = dy / dist,
      stopOff = Math.max(0.4, e.radius + tgt.radius * 0.65),
      travel = Math.max(0.3, dist - stopOff),
      tx = fromPos.x + nx * travel,
      ty = fromPos.y + ny * travel,
      ms = e.stats.moveSpeed || 5.5,
      dur = Math.max(0.16, Math.min(0.42, travel / Math.max(18, ms * 3.1))),
      baseDmg = oa(n, "damage", { ad: "adRatio" }),
      knock = n.val("knockDist");
    Wn(t, e, "cow_flykick", { duration: dur + 0.12, sourceId: e.id, key: "cow_flykick", merge: "replace" });
    ds(t, "cow_flykick_dash", fromPos, e.team, { unitId: e.id, from: fromPos, to: { x: tx, y: ty } });
    fW(t, e, tx, ty, dur, (reason) => {
      Va(t, e, "cow_flykick");
      if (reason !== "arrived" || !e.alive || !tgt.alive || tgt.rt.untargetable) return;
      const critMult = Math.max(1.5, e.stats.critDamage || 1.75),
        finalDmg = baseDmg * critMult;
      t.fx("hit_crit", tgt.pos, e.team, { unitId: e.id, targetId: tgt.id });
      ds(t, "cow_flykick_hit", tgt.pos, e.team, { unitId: e.id, targetId: tgt.id });
      Bo(t, e, tgt, finalDmg, "physical", "skill", "s2", !0);
      if (tgt.alive && !Ss(tgt)) {
        Yj(t, tgt, { x: tgt.pos.x + nx * 8, y: tgt.pos.y + ny * 8 }, knock, 16);
      }
    });
  },
});

Oi("cow", "ult", {
  noAnim: !0,
  lockTime: 0.14,
  cast(n) {
    const { sim: t, caster: e } = n,
      lv = n.level;
    if (n.isRecast) {
      const st = Dh(e, "cow_stomp_ready");
      if (!st) return;
      const rad = n.val("stompRadius"),
        dmg = oa(n, "stompDamage", { ad: "adRatio" }),
        stun = n.val("stompStun");
      vS(t, e, "cast_ult", 0.46, !0);
      ds(t, "cow_ult_stomp", e.pos, e.team, { unitId: e.id, radius: rad });
      const hits = Pr(t, e.pos, rad, ia(e.team));
      for (let i = 0; i < hits.length; i++) {
        const u = hits[i];
        if (!u.alive || Ss(u)) continue;
        Bo(t, e, u, dmg, "physical", "skill", "ult");
        u.alive && Gj(t, u, stun, e);
      }
      st.stacks--;
      if (st.stacks > 0) {
        e.skills.ult.cd = 0.65;
      } else {
        const fullCd = e.h._cowUltFullCd || e.skills.ult.cdMax;
        Va(t, e, "cow_stomp_ready");
        e.skills.ult.cd = Math.max(e.skills.ult.cd, fullCd);
      }
      return;
    }

    const giantDur = n.val("giantDur"),
      bonusHp = n.val("bonusHp"),
      stompWin = n.val("stompWindow"),
      maxStomps = n.val("maxStomps"),
      fullCd = e.skills.ult.cdMax;
    e.h._cowUltFullCd = fullCd;
    // 立刻移除力竭状态
    Ba(e, "cow_exhaust") && Va(t, e, "cow_exhaust");
    vS(t, e, "cast_ult", 0.45, !0);
    Wn(t, e, "cow_giant", {
      duration: giantDur,
      value: lv,
      sourceId: e.id,
      key: "cow_giant",
      merge: "replace",
      onExpire(sim, unit) {
        cowClearGiantZone(sim, unit);
      },
      onRemove(sim, unit) {
        cowClearGiantZone(sim, unit);
      },
    });
    // 获得最大生命值并立刻回复等量生命
    _o(t, e);
    e.hp = Math.min(e.stats.maxHp, e.hp + bonusHp);
    cowClearGiantZone(t, e);
    e.h._cowGiantZone = Zo(t, { visual: "cow_giant_aura", owner: e, pos: Cs(e.pos), radius: 2.35, duration: giantDur });
    ds(t, "cow_ult_grow", e.pos, e.team, { unitId: e.id, radius: n.val("stompRadius") });

    const sb = Wn(t, e, "cow_stomp_ready", {
      duration: stompWin,
      sourceId: e.id,
      maxStacks: maxStomps,
      stacks: maxStomps,
      key: "cow_stomp_ready",
      merge: "replace",
      onExpire(sim, unit) {
        unit.skills.ult.cd = Math.max(unit.skills.ult.cd, unit.h._cowUltFullCd || fullCd);
      },
      onRemove(sim, unit) {
        unit.skills.ult.cd = Math.max(unit.skills.ult.cd, unit.h._cowUltFullCd || fullCd);
      },
    });
    sb && (sb.stacks = maxStomps);
    e.skills.ult.cd = 0.55;
  },
});

const MKP = Se.monkey.passive.values,
  MKS1 = Se.monkey.skills.s1.values,
  MKS2 = Se.monkey.skills.s2.values,
  MKU = Se.monkey.skills.ult.values;

function monkeySyncAmmoBuff(sim, unit) {
  const ch = unit.h._mkS1Charges ?? 0;
  if (ch <= 0 || unit.skills.s1.level <= 0) {
    Ba(unit, "monkey_peel_ammo") && Va(sim, unit, "monkey_peel_ammo");
    return;
  }
  const ex = Dh(unit, "monkey_peel_ammo");
  if (ex) {
    ex.stacks = ch;
    ex.timeLeft = 99999;
    ex.duration = 99999;
  } else {
    const b = Wn(sim, unit, "monkey_peel_ammo", {
      duration: 99999,
      maxStacks: MKS1.maxCharges,
      stacks: ch,
      sourceId: unit.id,
      key: "monkey_peel_ammo",
      merge: "replace",
    });
    b && (b.stacks = ch);
  }
}

function monkeySyncStickLenBuff(sim, unit) {
  const st = unit.h.monkeyStickStacks || 0;
  if (st <= 0) return;
  unit.h.monkeyStickBonus = +(st * MKU.lenPerStack).toFixed(2);
  const ex = Dh(unit, "monkey_stick_len");
  if (ex) {
    ex.stacks = st;
    ex.timeLeft = 99999;
    ex.duration = 99999;
  } else {
    const b = Wn(sim, unit, "monkey_stick_len", {
      duration: 99999,
      maxStacks: 999,
      stacks: st,
      sourceId: unit.id,
      key: "monkey_stick_len",
      merge: "replace",
    });
    b && (b.stacks = st);
  }
}

function monkeySpawnPeel(sim, caster, pos) {
  if (!caster.h._mkPeels) caster.h._mkPeels = [];
  const list = caster.h._mkPeels;
  // 清理已经失效的香蕉皮记录
  for (let i = list.length - 1; i >= 0; i--) {
    if (!list[i].active) list.splice(i, 1);
  }
  while (list.length >= MKP.maxPeels) {
    const oldest = list.shift();
    if (oldest && oldest.active) {
      oldest.active = !1;
      oldest.zone && Xk(sim, oldest.zone);
    }
  }
  const pt = Cs(pos);
  sim.nav.nearestFree(pt.x, pt.y, 0.35, pt);
  const rec = { active: !0, zone: null, armAt: sim.state.time + (MKP.armDur ?? 1) };
  rec.zone = Zo(sim, {
    visual: "monkey_peel",
    owner: caster,
    pos: pt,
    radius: MKP.peelRadius,
    duration: MKP.peelDur,
    tickInterval: 0.06,
    onTick(s, z) {
      if (!rec.active) return;
      const foes = Pr(s, z.pos, z.radius, ia(caster.team));
      let victim = null;
      for (let i = 0; i < foes.length; i++) {
        const u = foes[i];
        if (!u.alive || Ss(u) || u.rt.untargetable) continue;
        if (!victim || (u.kind === "hero" && victim.kind !== "hero")) victim = u;
      }
      if (!victim) return;
      rec.active = !1;
      Xk(s, z);
      const idx = list.indexOf(rec);
      idx >= 0 && list.splice(idx, 1);
      // 落地 1 秒以内还没生效：被敌人踩到直接踩烂消除，不触发眩晕与伤害
      if (s.state.time < rec.armAt) {
        ds(s, "monkey_peel_stomp", z.pos, caster.team, { unitId: caster.id, targetId: victim.id, pos: Cs(z.pos) });
        return;
      }
      // 落地 1 秒后已生效：眩晕 0.8 秒并打断施法/引导
      Gj(s, victim, MKP.stunDur, caster);
      if (victim.rt) {
        victim.rt.act !== null && (victim.rt.act = null);
        victim.kind === "hero" && victim.h && (victim.h.pendingCast = null);
      }
      // 一技能被动：踩到香蕉皮额外造成魔法伤害
      const s1Lv = caster.skills.s1.level;
      if (s1Lv > 0 && victim.alive) {
        const dmg = Nh(Se.monkey.skills.s1, "peelDmg", s1Lv) + caster.stats.ad * MKS1.adRatio;
        zh(s, caster, victim, dmg, "magic", "s1");
      }
      ds(s, "monkey_peel_slip", victim.pos, caster.team, { unitId: caster.id, targetId: victim.id, pos: Cs(z.pos) });
    },
    onEnd() {
      rec.active = !1;
      const idx = list.indexOf(rec);
      idx >= 0 && list.splice(idx, 1);
    },
  });
  rec.zone.armDur = MKP.armDur ?? 1;
  list.push(rec);
}

function monkeyPointSegDist(px, py, ax, ay, bx, by) {
  const vx = bx - ax,
    vy = by - ay,
    lenSq = vx * vx + vy * vy;
  if (lenSq < 1e-6) return Math.hypot(px - ax, py - ay);
  const t = Math.max(0, Math.min(1, ((px - ax) * vx + (py - ay) * vy) / lenSq));
  return Math.hypot(px - (ax + vx * t), py - (ay + vy * t));
}

tu("monkey", {
  statMods(n, t, e) {
    const perm = t.h.monkeyStickBonus || 0;
    if (perm > 0) e.attackRange += perm;
    const ub = Dh(t, "monkey_ult");
    if (ub) {
      const lv = Math.max(1, Math.min(3, ub.value || t.skills.ult.level || 1)),
        pct = MKU.rangePct[lv - 1];
      e.attackRange += (Se.monkey.base.attackRange + perm) * pct;
      e.movePct -= MKU.selfSlow;
    }
  },
  onSpawn(n, t) {
    t.h._mkBananaTimer = 0;
    if (t.skills.s1.level > 0 && t.h._mkS1Charges === void 0) {
      t.h._mkS1Charges = MKS1.maxCharges;
      t.h._mkS1Regen = 0;
    }
    monkeySyncAmmoBuff(n, t);
    if ((t.h.monkeyStickStacks || 0) > 0) {
      monkeySyncStickLenBuff(n, t);
      _o(n, t);
    }
    t.chargeBar = { ratio: 0, full: !1 };
  },
  onTick(n, t, e) {
    if (!t.alive) {
      t.chargeBar = null;
      return;
    }
    // 永久棍长增益图标保活
    if ((t.h.monkeyStickStacks || 0) > 0 && !Ba(t, "monkey_stick_len")) monkeySyncStickLenBuff(n, t);

    // 一技能 3 层充能管理
    const s1Lv = t.skills.s1.level;
    if (s1Lv > 0) {
      if (t.h._mkS1Charges === void 0) {
        t.h._mkS1Charges = MKS1.maxCharges;
        t.h._mkS1Regen = 0;
      }
      const regenMax = Math.max(1.5, Nh(Se.monkey.skills.s1, "recharge", s1Lv) * (1 - t.stats.cdr));
      if (t.h._mkS1Charges < MKS1.maxCharges) {
        t.h._mkS1Regen = (t.h._mkS1Regen || 0) + e;
        if (t.h._mkS1Regen >= regenMax) {
          t.h._mkS1Regen -= regenMax;
          t.h._mkS1Charges = Math.min(MKS1.maxCharges, t.h._mkS1Charges + 1);
          if (t.h._mkS1Charges >= MKS1.maxCharges) t.h._mkS1Regen = 0;
          if (t.h._mkS1Charges > 0 && t.skills.s1.cd > 0.45) t.skills.s1.cd = 0;
        }
      } else {
        t.h._mkS1Regen = 0;
      }
      if (t.h._mkS1Charges === 0) {
        const left = Math.max(0.05, regenMax - (t.h._mkS1Regen || 0));
        t.skills.s1.cd = left;
        t.skills.s1.cdMax = regenMax;
      }
      monkeySyncAmmoBuff(n, t);
    }

    // 被动：每 9 秒先吃 1 秒香蕉，吃完回 8% 生命（或满血爆发加速）并顺手往轮椅下丢香蕉皮
    t.h._mkBananaTimer = (t.h._mkBananaTimer || 0) + e;
    if (t.h._mkBananaTimer >= MKP.interval && !Ba(t, "monkey_eating")) {
      t.h._mkBananaTimer -= MKP.interval;
      Wn(n, t, "monkey_eating", {
        duration: 1.0,
        sourceId: t.id,
        key: "monkey_eating",
        merge: "replace",
        onExpire(sim, unit) {
          if (!unit.alive) return;
          const isFull = unit.hp >= unit.stats.maxHp - 1;
          if (isFull) {
            Vj(sim, unit, MKP.hastePct, MKP.hasteDur, unit, "monkey_banana_haste");
            Wn(sim, unit, "monkey_banana_haste", {
              duration: MKP.hasteDur,
              sourceId: unit.id,
              key: "monkey_banana_haste",
              merge: "replace",
            });
          } else {
            xS(sim, unit, unit, unit.stats.maxHp * MKP.healPct, !0);
          }
          ds(sim, "monkey_banana_eat", unit.pos, unit.team, { unitId: unit.id, fullHp: isFull });
          monkeySpawnPeel(sim, unit, unit.pos);
        },
      });
    }

    // 黄条显示：开大期间显示大招剩余时间（前三棍必暴击阶段亮红），吃香蕉期间满格闪亮，平时显示吃香蕉倒计时进度
    const ub = Dh(t, "monkey_ult");
    if (ub) {
      t.chargeBar = { ratio: Math.max(0.05, ub.timeLeft / Math.max(0.1, ub.duration)), full: (ub.stacks || 0) > 0 };
    } else if (Ba(t, "monkey_eating")) {
      t.chargeBar = { ratio: 1, full: !0 };
    } else {
      const r = Math.max(0, Math.min(1, (t.h._mkBananaTimer || 0) / MKP.interval));
      t.chargeBar = { ratio: r, full: r >= 0.96 };
    }
  },
  modifyBasicAttack(n, t, e, s) {
    // 大招前三棍必定暴击（对非建筑目标）
    if (!Ss(e)) {
      const ub = Dh(t, "monkey_ult");
      if (ub && (ub.stacks || 0) > 0) s.forceCrit = !0;
    }
  },
  onBasicAttackHit(n, t, e) {
    if (!t.alive) return;
    const ub = Dh(t, "monkey_ult");
    if (!ub) return;
    const lv = Math.max(1, Math.min(3, ub.value || t.skills.ult.level || 1)),
      extraDmg = MKU.bonusDmg[lv - 1] + t.stats.ad * MKU.adRatio,
      isCritSwing = (ub.stacks || 0) > 0,
      dx = e ? e.pos.x - t.pos.x : Math.cos(t.facing),
      dy = e ? e.pos.y - t.pos.y : Math.sin(t.facing),
      dl = Math.hypot(dx, dy) || 1,
      nx = dx / dl,
      ny = dy / dl,
      sweepLen = Math.max(t.stats.attackRange + 0.8, 3.8),
      halfW = MKU.sweepWidth * 0.5,
      endPos = { x: t.pos.x + nx * sweepLen, y: t.pos.y + ny * sweepLen };

    ds(n, "monkey_ult_sweep", t.pos, t.team, {
      unitId: t.id,
      from: Cs(t.pos),
      to: endPos,
      width: MKU.sweepWidth,
    });

    const foes = Pr(n, { x: t.pos.x + nx * sweepLen * 0.5, y: t.pos.y + ny * sweepLen * 0.5 }, sweepLen * 0.5 + 2.2, ia(t.team));
    for (let i = 0; i < foes.length; i++) {
      const u = foes[i];
      if (!u.alive || u.rt.untargetable) continue;
      if (e && u.id === e.id) {
        if (!Ss(u)) {
          zh(n, t, u, extraDmg, "physical", "ult");
          u.alive && Yj(n, u, { x: u.pos.x + nx * 10, y: u.pos.y + ny * 10 }, MKU.knockDist, 18);
        }
        continue;
      }
      const dist = monkeyPointSegDist(u.pos.x, u.pos.y, t.pos.x, t.pos.y, endPos.x, endPos.y);
      if (dist <= halfW + u.radius) {
        if (Ss(u)) {
          zh(n, t, u, extraDmg * 0.5, "physical", "ult");
        } else {
          const crit = isCritSwing || (t.stats.critChance > 0 && n.rng.next() < t.stats.critChance),
            dmg = t.stats.ad * (crit ? t.stats.critDamage : 1) + extraDmg;
          n.fx(crit ? "hit_crit" : "hit_physical", u.pos, t.team, { unitId: t.id, targetId: u.id });
          Bo(n, t, u, dmg, "physical", "basic", "ult", crit);
          if (u.alive) Yj(n, u, { x: u.pos.x + nx * 10, y: u.pos.y + ny * 10 }, MKU.knockDist, 18);
        }
      }
    }

    // 消耗 1 次必暴击计数，大招持续时间内其余效果继续生效直到时间结束
    if (ub.stacks > 0) ub.stacks--;
  },
  onKill(n, t, victim) {
    if (!t.alive || !victim || !Ba(t, "monkey_ult")) return;
    const gain = victim.kind === "hero" ? MKU.heroStacks : victim.kind === "minion" ? MKU.minionStacks : 0;
    if (gain <= 0) return;
    t.h.monkeyStickStacks = (t.h.monkeyStickStacks || 0) + gain;
    t.h.monkeyStickBonus = +(t.h.monkeyStickStacks * MKU.lenPerStack).toFixed(2);
    monkeySyncStickLenBuff(n, t);
    _o(n, t);
    ds(n, "monkey_stick_grow", t.pos, t.team, {
      unitId: t.id,
      stacks: t.h.monkeyStickStacks,
      bonus: t.h.monkeyStickBonus,
      gain,
    });
  },
});

Oi("monkey", "s1", {
  canCast(n, t) {
    if (t.h._mkS1Charges === void 0) {
      t.h._mkS1Charges = MKS1.maxCharges;
      t.h._mkS1Regen = 0;
    }
    return t.h._mkS1Charges > 0 ? null : "cooldown";
  },
  cast(n) {
    const { sim: t, caster: e, origin: org, targetPos: dst } = n,
      lv = n.level;
    if (e.h._mkS1Charges === void 0) {
      e.h._mkS1Charges = MKS1.maxCharges;
      e.h._mkS1Regen = 0;
    }
    e.h._mkS1Charges = Math.max(0, e.h._mkS1Charges - 1);
    const regenMax = Math.max(1.5, Nh(Se.monkey.skills.s1, "recharge", lv) * (1 - e.stats.cdr));
    if (e.h._mkS1Charges > 0) {
      e.skills.s1.cd = 0.45;
      e.skills.s1.cdMax = 0.45;
    } else {
      e.skills.s1.cd = Math.max(0.05, regenMax - (e.h._mkS1Regen || 0));
      e.skills.s1.cdMax = regenMax;
    }
    monkeySyncAmmoBuff(t, e);

    const land = Cs(dst);
    t.nav.nearestFree(land.x, land.y, 0.35, land);
    const dist = Math.hypot(land.x - org.x, land.y - org.y),
      dur = Math.max(0.14, Math.min(0.5, dist / MKS1.travelSpeed));
    e.h._mkPeelsInFlight = (e.h._mkPeelsInFlight || 0) + 1;
    ds(t, "monkey_peel_throw", org, e.team, { unitId: e.id, from: Cs(org), to: land, dur });
    Kj(t, dur, () => {
      e.h._mkPeelsInFlight = Math.max(0, (e.h._mkPeelsInFlight || 1) - 1);
      monkeySpawnPeel(t, e, land);
    });
  },
});

Oi("monkey", "s2", {
  cast(n) {
    const { sim: t, caster: e, origin: org, targetPos: dst } = n,
      land = Cs(dst);
    t.nav.nearestFree(land.x, land.y, 0.5, land);
    const dx = land.x - org.x,
      dy = land.y - org.y,
      dist = Math.hypot(dx, dy) || 0.01,
      nx = dx / dist,
      ny = dy / dist,
      dur = Math.max(0.14, Math.min(0.46, dist / MKS2.speed)),
      dmg = oa(n, "damage", { ad: "adRatio" }),
      knockup = n.val("knockup"),
      width = n.val("width"),
      pillarR = n.val("pillarRadius"),
      pillarDur = n.val("pillarDur"),
      hitIds = new Set();

    Wn(t, e, "monkey_stick_out", {
      duration: dur + pillarDur,
      sourceId: e.id,
      key: "monkey_stick_out",
      merge: "replace",
    });
    ds(t, "monkey_stick_throw", org, e.team, { unitId: e.id, from: Cs(org), to: land, dur });

    const steps = 4;
    for (let s = 1; s <= steps; s++) {
      const f0 = (s - 1) / steps,
        f1 = s / steps,
        ax = org.x + dx * f0,
        ay = org.y + dy * f0,
        bx = org.x + dx * f1,
        by = org.y + dy * f1;
      Kj(t, dur * f1, () => {
        const mid = { x: (ax + bx) * 0.5, y: (ay + by) * 0.5 },
          rad = Math.hypot(bx - ax, by - ay) * 0.5 + width + 1.0,
          foes = Pr(t, mid, rad, ia(e.team));
        for (let i = 0; i < foes.length; i++) {
          const u = foes[i];
          if (!u.alive || Ss(u) || u.rt.untargetable || hitIds.has(u.id)) continue;
          if (monkeyPointSegDist(u.pos.x, u.pos.y, ax, ay, bx, by) <= width * 0.5 + u.radius) {
            hitIds.add(u.id);
            zh(t, e, u, dmg, "physical", "s2");
            u.alive && yS(t, u, knockup, e);
          }
        }
      });
    }

    // 落到目的地后插地变粗变大，形成阻隔地形
    Kj(t, dur, () => {
      const obsId = `mk_pillar_${e.id}_${Math.round(t.state.time * 100)}_${Math.round(land.x * 10)}`;
      t.nav.addObstacle(obsId, land.x, land.y, pillarR, "pillar");
      // 击飞落点内还没被命中的敌人，并把站柱子里的所有单位安全挤到柱子外圈
      for (const u of Pr(t, land, pillarR + 1.3)) {
        if (!u.alive || Ss(u)) continue;
        if (u.team !== e.team && !u.rt.untargetable && !hitIds.has(u.id)) {
          hitIds.add(u.id);
          zh(t, e, u, dmg, "physical", "s2");
          u.alive && yS(t, u, knockup, e);
        }
        const ox = u.pos.x - land.x,
          oy = u.pos.y - land.y,
          d = Math.hypot(ox, oy),
          need = pillarR + u.radius + 0.18;
        if (d < need) {
          const px = d > 1e-4 ? ox / d : -nx,
            py = d > 1e-4 ? oy / d : -ny;
          Xj(t, u, { x: land.x + px * need, y: land.y + py * need });
        }
      }
      Zo(t, {
        visual: "monkey_pillar",
        owner: e,
        pos: land,
        radius: pillarR,
        duration: pillarDur,
        onEnd() {
          t.nav.removeObstacle(obsId);
        },
      });
      ds(t, "monkey_pillar_slam", land, e.team, { unitId: e.id, radius: pillarR });
    });
  },
});

Oi("monkey", "ult", {
  lockTime: 0.1,
  cast(n) {
    const { sim: t, caster: e } = n,
      lv = n.level,
      dur = n.val("duration"),
      critCount = n.val("critAttacks");
    vS(t, e, "cast_ult", 0.42, !0);
    const ub = Wn(t, e, "monkey_ult", {
      duration: dur,
      value: lv,
      maxStacks: critCount,
      stacks: critCount,
      sourceId: e.id,
      key: "monkey_ult",
      merge: "replace",
    });
    ub && (ub.stacks = critCount);
    _o(t, e);
    ds(t, "monkey_ult_start", e.pos, e.team, { unitId: e.id, radius: e.stats.attackRange });
  },
});

const SLP = Se.slime.passive.values,
  SLS2 = Se.slime.skills.s2.values;

function slimeClearPuddleZone(sim, unit) {
  if (unit.h._slPuddleZone && !unit.h._slPuddleZone.dead) {
    unit.h._slPuddleZone.dead = !0;
  }
  unit.h._slPuddleZone = null;
}

function slimeReleaseAbsorbed(sim, unit) {
  const list = unit.h._slAbsorbed;
  if (!list || list.length === 0) return;
  for (let i = 0; i < list.length; i++) {
    const v = sim.byId.get(list[i].id);
    if (v && v.alive) Va(sim, v, "slime_absorbed");
  }
  list.length = 0;
}

function slimeGrantWallBounce(sim, unit) {
  if (!unit.alive) return;
  Wn(sim, unit, "slime_wall_bounce", {
    duration: SLP.wallWindow,
    sourceId: unit.id,
    key: "slime_wall_bounce",
    merge: "replace",
  });
  ds(sim, "slime_wall_hit", unit.pos, unit.team, { unitId: unit.id });
}

function slimeLaunchBall(sim, unit, dir, lv, chargeP) {
  const p = Math.max(0, Math.min(1, chargeP)),
    dl = Math.hypot(dir.x, dir.y) || 1,
    nx = dir.x / dl,
    ny = dir.y / dl,
    s2Def = Se.slime.skills.s2,
    minDmg = Nh(s2Def, "minDamage", lv),
    maxDmg = Nh(s2Def, "damage", lv),
    dmg = minDmg + (maxDmg - minDmg) * p + unit.stats.ap * SLS2.apRatio + unit.stats.maxHp * SLS2.hpRatio,
    dist = SLS2.minRange + (SLS2.maxRange - SLS2.minRange) * p,
    speed = SLS2.minSpeed + (SLS2.maxSpeed - SLS2.minSpeed) * p,
    airDur = SLS2.minAir + (SLS2.maxAir - SLS2.minAir) * p,
    startPos = Cs(unit.pos),
    endPos = { x: startPos.x + nx * dist, y: startPos.y + ny * dist };
  unit.facing = Math.atan2(ny, nx);
  Wn(sim, unit, "slime_ball_dash", {
    duration: dist / Math.max(1, speed) + 0.12,
    sourceId: unit.id,
    key: "slime_ball_dash",
    merge: "replace",
  });
  ds(sim, "slime_ball_launch", startPos, unit.team, {
    unitId: unit.id,
    from: startPos,
    to: endPos,
    charge: p,
  });
  Hm(sim, unit, {
    dirX: nx,
    dirY: ny,
    distance: dist,
    speed,
    hitRadius: SLS2.hitRadius,
    filter: (u) => Ui(unit, u) && !Ss(u),
    onHit(u) {
      Xm(sim, u, airDur, unit);
      Bo(sim, unit, u, dmg, "magic", "skill", "s2");
      ds(sim, "slime_ball_hit", u.pos, unit.team, { unitId: unit.id, targetId: u.id, charge: p });
      return !1;
    },
    onEnd() {
      Va(sim, unit, "slime_ball_dash");
    },
  });
}

tu("slime", {
  onSpawn(n, t) {
    t.h._slRegen = [];
    t.h._slHealAcc = 0;
    t.h._slHealTimer = 0;
    t.h._slClingId = -1;
    t.h._slAbsorbed = [];
    t.h._slPuddleZone = null;
  },
  onDamageTaken(n, e, t, p, f) {
    if (!e.alive || !f || f.dtype !== "physical" || p <= 0) return;
    const lvT = Math.max(0, Math.min(1, ((e.level || 1) - 1) / 14)),
      pct = SLP.minPct + (SLP.maxPct - SLP.minPct) * lvT,
      dur = SLP.maxDur - (SLP.maxDur - SLP.minDur) * lvT,
      pool = p * pct;
    if (!e.h._slRegen) e.h._slRegen = [];
    e.h._slRegen.push({ rate: pool / dur, left: dur });
    Wn(n, e, "slime_regen", {
      duration: dur,
      sourceId: e.id,
      key: "slime_regen",
      merge: "replace",
    });
    // 吸附期间免疫击退；大招不可选取或弹球冲撞中也不触发被动击退
    if (Ba(e, "slime_cling") || Ba(e, "slime_puddle") || Ba(e, "slime_ball_dash") || !t || t.id === e.id) return;
    const hpPct = pool / Math.max(1, e.stats.maxHp);
    if (t.kind !== "hero" && t.kind !== "tower" && hpPct < 0.012) return;
    let dx = e.pos.x - t.pos.x,
      dy = e.pos.y - t.pos.y,
      dl = Math.hypot(dx, dy);
    if (dl < 1e-4) {
      dx = -Math.cos(e.facing);
      dy = -Math.sin(e.facing);
      dl = 1;
    }
    const nx = dx / dl,
      ny = dy / dl,
      dist = Math.max(t.kind === "hero" || t.kind === "tower" ? SLP.minKnock : 0.45, Math.min(SLP.maxKnock, hpPct * SLP.knockScale));
    // 挨物理伤害若正在蓄力弹球会被弹性顶飞打断
    if (Ba(e, "slime_ball_charge")) {
      e.h._slBallReleased = !0;
      Va(n, e, "slime_ball_charge");
      e.skills.s2.cd = Math.min(e.h._slBallCd || e.skills.s2.cdMax, 2.2);
    }
    const pushed = dW(n, e, nx, ny, dist, SLP.knockSpeed, (reason) => {
      if (reason === "wall" && e.alive) slimeGrantWallBounce(n, e);
    });
    if (pushed) {
      ds(n, "slime_bounce", e.pos, e.team, { unitId: e.id });
    }
  },
  onTick(n, t, dt) {
    if (!t.alive) {
      if (t.h._slRegen) t.h._slRegen.length = 0;
      t.h._slHealAcc = 0;
      t.h._slClingId = -1;
      slimeReleaseAbsorbed(n, t);
      slimeClearPuddleZone(n, t);
      return;
    }
    // 1. 被动弹性缓回生命池
    const reg = t.h._slRegen;
    if (reg && reg.length > 0) {
      let stepHeal = 0,
        maxLeft = 0;
      for (let i = reg.length - 1; i >= 0; i--) {
        const r = reg[i],
          step = Math.min(dt, r.left);
        stepHeal += r.rate * step;
        r.left -= step;
        if (r.left <= 1e-4) reg.splice(i, 1);
        else if (r.left > maxLeft) maxLeft = r.left;
      }
      t.h._slHealAcc = (t.h._slHealAcc || 0) + stepHeal;
      t.h._slHealTimer = (t.h._slHealTimer || 0) + dt;
      if (t.h._slHealTimer >= 0.45 || reg.length === 0) {
        if (t.h._slHealAcc > 0.5) xS(n, t, t, t.h._slHealAcc);
        t.h._slHealAcc = 0;
        t.h._slHealTimer = 0;
      }
      const rb = Dh(t, "slime_regen");
      if (reg.length === 0) {
        rb && Va(n, t, "slime_regen");
      } else if (rb) {
        rb.timeLeft = maxLeft;
      }
    }
    // 2. 1技能【吸附】跟随目标重叠移动
    if (Ba(t, "slime_cling")) {
      const tgt = n.byId.get(t.h._slClingId);
      if (!tgt || !tgt.alive || tgt.rt.untargetable) {
        t.h._slClingId = -1;
        Va(n, t, "slime_cling");
      } else {
        Hl(t);
        t.pos.x = tgt.pos.x;
        t.pos.y = tgt.pos.y;
        t.facing = tgt.facing;
        n.grid.move(t);
      }
    } else if (t.h._slClingId >= 0) {
      t.h._slClingId = -1;
    }
    // 3. 大招【化整为零】期间反吸的敌人强制跟随自身移动
    const abs = t.h._slAbsorbed;
    if (abs && abs.length > 0) {
      if (!Ba(t, "slime_puddle")) {
        slimeReleaseAbsorbed(n, t);
      } else {
        for (let i = abs.length - 1; i >= 0; i--) {
          const item = abs[i],
            v = n.byId.get(item.id);
          if (!v || !v.alive || v.rt.untargetable || !Ba(v, "slime_absorbed")) {
            abs.splice(i, 1);
            continue;
          }
          v.rt.dash && iu(n, v, "interrupted");
          Hl(v);
          const ox = item.ox,
            oy = item.oy,
            od = Math.hypot(ox, oy);
          v.pos.x = t.pos.x;
          v.pos.y = t.pos.y;
          if (od > 0.02) {
            n.nav.moveStraight(v.pos, ox / od, oy / od, od, v.rt.navR);
          }
          n.grid.move(v);
        }
      }
    }
  },
});

Oi("slime", "s1", {
  cast(n) {
    const { sim: t, caster: e } = n,
      dur = n.val("duration"),
      tick = n.val("tick"),
      baseTick = n.val("tickDmg"),
      apR = n.val("apRatio"),
      hpR = n.val("hpRatio");

    // 大招【化整为零】期间释放：把大滩体积上覆盖到的所有敌人反吸进果冻，强制拖着走
    if (Ba(e, "slime_puddle")) {
      const pb = Dh(e, "slime_puddle"),
        remDur = Math.max(0.35, Math.min(dur, pb ? pb.timeLeft : dur)),
        rad = n.val("absorbRadius"),
        list = [];
      n.sim.grid.query(e.pos.x, e.pos.y, rad + 1.5, list);
      if (!e.h._slAbsorbed) e.h._slAbsorbed = [];
      let count = 0;
      for (let i = 0; i < list.length; i++) {
        const u = list[i];
        if (!Ui(e, u) || Ss(u)) continue;
        const d = Math.hypot(u.pos.x - e.pos.x, u.pos.y - e.pos.y);
        if (d > rad + u.radius) continue;
        // 把敌人往果冻中心拉拢并锁死位移
        const pullD = Math.min(1.15, d * 0.45),
          ang = d > 0.02 ? Math.atan2(u.pos.y - e.pos.y, u.pos.x - e.pos.x) : count * 2.1,
          ox = Math.cos(ang) * pullD,
          oy = Math.sin(ang) * pullD;
        const ex = e.h._slAbsorbed.find((a) => a.id === u.id);
        if (ex) {
          ex.ox = ox;
          ex.oy = oy;
        } else {
          e.h._slAbsorbed.push({ id: u.id, ox, oy });
        }
        u.rt.dash && iu(t, u, "interrupted");
        Hl(u);
        u.pos.x = e.pos.x;
        u.pos.y = e.pos.y;
        if (pullD > 0.02) t.nav.moveStraight(u.pos, Math.cos(ang), Math.sin(ang), pullD, u.rt.navR);
        t.grid.move(u);
        const tickDmg = baseTick + e.stats.ap * apR + e.stats.maxHp * hpR;
        Bo(t, e, u, tickDmg, "magic", "skill", "s1");
        Wn(t, u, "slime_absorbed", {
          duration: remDur,
          sourceId: e.id,
          key: `slime_absorbed_${e.id}`,
          merge: "replace",
          tickInterval: tick,
          onTick(sim, victim) {
            if (!e.alive || !Ba(e, "slime_puddle") || !victim.alive) {
              Va(sim, victim, "slime_absorbed");
              return;
            }
            const d2 = baseTick + e.stats.ap * apR + e.stats.maxHp * hpR;
            Bo(sim, e, victim, d2, "magic", "skill", "s1");
          },
        });
        count++;
      }
      ds(t, "slime_absorb_burst", e.pos, e.team, { unitId: e.id, radius: rad, count });
      return;
    }

    // 普通释放：贴住一名敌人 3 秒（模型重叠、随对方位移同步移动、期间免疫击退）
    const tgt = n.target;
    if (!tgt || !tgt.alive) return;
    e.rt.dash && iu(t, e, "interrupted");
    Hl(e);
    e.h._slClingId = tgt.id;
    e.pos.x = tgt.pos.x;
    e.pos.y = tgt.pos.y;
    t.grid.move(e);
    const firstDmg = baseTick + e.stats.ap * apR + e.stats.maxHp * hpR;
    Bo(t, e, tgt, firstDmg, "magic", "skill", "s1");
    ds(t, "slime_cling_start", tgt.pos, e.team, { unitId: e.id, targetId: tgt.id });
    Wn(t, e, "slime_cling", {
      duration: dur,
      sourceId: e.id,
      key: "slime_cling",
      merge: "replace",
      tickInterval: tick,
      onTick(sim, unit) {
        const cur = sim.byId.get(unit.h._slClingId);
        if (!unit.alive || !cur || !cur.alive || cur.rt.untargetable) {
          unit.h._slClingId = -1;
          Va(sim, unit, "slime_cling");
          return;
        }
        const dmg = baseTick + unit.stats.ap * apR + unit.stats.maxHp * hpR;
        Bo(sim, unit, cur, dmg, "magic", "skill", "s1");
        ds(sim, "slime_cling_tick", cur.pos, unit.team, { unitId: unit.id, targetId: cur.id });
      },
      onRemove(sim, unit) {
        unit.h._slClingId = -1;
      },
      onExpire(sim, unit) {
        unit.h._slClingId = -1;
      },
    });
  },
});

Oi("slime", "s2", {
  movement: !0,
  lockTime: 0,
  noAnim: !0,
  cast(n) {
    const { sim: t, caster: e } = n,
      fullCharge = n.val("fullCharge"),
      maxCharge = n.val("maxCharge"),
      dl = Math.hypot(n.dir.x, n.dir.y) || 1,
      nx = n.dir.x / dl,
      ny = n.dir.y / dl;

    // 若在大招或吸附状态下释放弹球，先解除贴身状态
    if (Ba(e, "slime_cling")) {
      e.h._slClingId = -1;
      Va(t, e, "slime_cling");
    }

    // 被动撞墙触发的 0.5 秒窗口：立刻瞬发无需蓄力的满额弹球
    if (Ba(e, "slime_wall_bounce")) {
      Va(t, e, "slime_wall_bounce");
      if (Ba(e, "slime_ball_charge")) {
        e.h._slBallReleased = !0;
        Va(t, e, "slime_ball_charge");
      }
      slimeLaunchBall(t, e, { x: nx, y: ny }, n.level, 1.0);
      return;
    }

    // 再次按下或松手：按当前蓄力比例弹出
    if (n.isRecast) {
      const elapsed = Math.max(0, t.state.time - (e.h._slBallStart ?? t.state.time)),
        p = Math.max(0, Math.min(1, elapsed / Math.max(0.1, fullCharge))),
        cdMax = e.h._slBallCd || e.skills.s2.cdMax;
      e.h._slBallReleased = !0;
      Va(t, e, "slime_ball_charge");
      slimeLaunchBall(t, e, { x: nx, y: ny }, n.level, p);
      e.skills.s2.cd = cdMax;
      return;
    }

    // 初次按下：原地蓄力最多 3 秒
    const cdMax = e.skills.s2.cdMax;
    e.skills.s2.cd = 0;
    e.h._slBallStart = t.state.time;
    e.h._slBallDir = { x: nx, y: ny };
    e.h._slBallCd = cdMax;
    e.h._slBallLvl = n.level;
    e.h._slBallReleased = !1;
    e.h.atkOrder = !1;
    e.targetId = -1;
    e.rt.windupLeft = 0;
    e.rt.windupTarget = -1;
    e.rt.act === "attack" && (e.rt.act = null);
    e.facing = Math.atan2(ny, nx);

    Wn(t, e, "slime_ball_charge", {
      duration: maxCharge,
      sourceId: e.id,
      key: "slime_ball_charge",
      merge: "replace",
      tickInterval: 0.08,
      onTick(sim, unit) {
        if (!unit.alive || unit.rt.stunned || unit.rt.silenced) {
          unit.h._slBallReleased = !0;
          Va(sim, unit, "slime_ball_charge");
          unit.skills.s2.cd = Math.min(cdMax, 2.2);
          return;
        }
        if (unit.h._slBallDir) {
          unit.facing = Math.atan2(unit.h._slBallDir.y, unit.h._slBallDir.x);
        }
      },
      onExpire(sim, unit) {
        if (unit.h._slBallReleased || !unit.alive) return;
        unit.h._slBallReleased = !0;
        const fDir = unit.h._slBallDir || { x: Math.cos(unit.facing), y: Math.sin(unit.facing) };
        slimeLaunchBall(sim, unit, fDir, unit.h._slBallLvl || 1, 1.0);
        unit.skills.s2.cd = unit.h._slBallCd || cdMax;
      },
      onRemove(sim, unit) {
        if (!unit.h._slBallReleased) {
          unit.skills.s2.cd = Math.min(unit.h._slBallCd || cdMax, 2.2);
        }
      },
    });
  },
});

Oi("slime", "ult", {
  lockTime: 0.08,
  cast(n) {
    const { sim: t, caster: e } = n,
      dur = n.val("duration"),
      rad = n.val("radius"),
      tick = n.val("tick"),
      totalHeal = n.val("healBase") + e.stats.maxHp * n.val("healHp"),
      healPerTick = totalHeal / Math.max(1, dur / tick),
      baseTick = n.val("tickDmg"),
      apR = n.val("apRatio"),
      hpR = n.val("hpRatio");

    if (Ba(e, "slime_cling")) {
      e.h._slClingId = -1;
      Va(t, e, "slime_cling");
    }
    if (Ba(e, "slime_ball_charge")) {
      e.h._slBallReleased = !0;
      Va(t, e, "slime_ball_charge");
    }
    slimeClearPuddleZone(t, e);
    e.h._slPuddleZone = Zo(t, {
      visual: "slime_puddle_zone",
      owner: e,
      followUnitId: e.id,
      pos: Cs(e.pos),
      radius: rad,
      duration: dur,
    });
    ds(t, "slime_puddle_start", e.pos, e.team, { unitId: e.id, radius: rad });
    const hitsBuf = [];
    Wn(t, e, "slime_puddle", {
      duration: dur,
      sourceId: e.id,
      key: "slime_puddle",
      merge: "replace",
      tickInterval: tick,
      onTick(sim, unit) {
        if (!unit.alive) return;
        xS(sim, unit, unit, healPerTick);
        const cnt = sim.grid.query(unit.pos.x, unit.pos.y, rad + 1.4, hitsBuf),
          dmg = baseTick + unit.stats.ap * apR + unit.stats.maxHp * hpR;
        for (let i = 0; i < cnt; i++) {
          const u = hitsBuf[i];
          if (!Ui(unit, u) || Ss(u)) continue;
          if (Math.hypot(u.pos.x - unit.pos.x, u.pos.y - unit.pos.y) <= rad + u.radius) {
            Bo(sim, unit, u, dmg, "magic", "skill", "ult");
          }
        }
      },
      onExpire(sim, unit) {
        slimeReleaseAbsorbed(sim, unit);
        slimeClearPuddleZone(sim, unit);
      },
      onRemove(sim, unit) {
        slimeReleaseAbsorbed(sim, unit);
        slimeClearPuddleZone(sim, unit);
      },
    });
  },
});

const Ic = Se.xingli.passive.values,
  H6 = E0("xingli", "s1"),
  $6 = 3,
  bS = 1.7,
  rq = 0.2;

tu("xingli", {
  onSkillHit(n, t, e) {
    if (!e.alive || Ss(e)) return;
    const s = Wn(n, e, "xingli_mark", { duration: Ic.duration, maxStacks: Ic.stacks, sourceId: t.id });
    if (!s || s.stacks < Ic.stacks) return;
    (fj(n, e, s), ds(n, "xingli_passive_burst", e.pos, t.team, { unitId: t.id, targetId: e.id }));
    let i = e.stats.maxHp * Ic.hpRatio;
    (e.kind !== "hero" && (i = Math.min(i, Ic.cap)), Gj(n, e, Ic.stun, t), gS(n, t, e, i, "magic"));
  },
});

Oi("xingli", "s1", {
  aimSpeed: $a("xingli", "s1", "speed"),
  aimLead: H6,
  cast(n) {
    const { sim: t, caster: e } = n;
    Wm(n, H6, () => {
      const s = oa(n, "damage", { ap: "apRatio" });
      (ds(t, "xingli_s1_cast", e.pos, e.team, { unitId: e.id, dir: Cs(n.dir) }),
        my(t, {
          visual: "xingli_s1",
          owner: e,
          from: e.pos,
          dir: n.dir,
          speed: n.val("speed"),
          range: n.range,
          radius: n.width * 0.5,
          pierce: !0,
          filter: ia(e.team),
          onHit(i, a, o) {
            zh(i, e, o, s, "magic", n.slot);
          },
        }));
    });
  },
});

Oi("xingli", "s2", {
  aimLead: $a("xingli", "s2", "delay"),
  cast(n) {
    const { sim: t, caster: e } = n,
      s = Cs(n.targetPos),
      i = n.val("delay");
    (Zo(t, { visual: "telegraph", owner: e, pos: s, radius: n.radius, duration: i }),
      Zo(t, {
        visual: "xingli_s2_well",
        owner: e,
        pos: s,
        radius: n.radius,
        duration: i,
        onEnd(a, o, r) {
          if (!r) return;
          const l = oa(n, "damage", { ap: "apRatio" });
          ds(a, "xingli_s2_burst", o.pos, e.team, { unitId: e.id, radius: o.radius });
          for (const c of Pr(a, o.pos, o.radius, ia(e.team)))
            (wo(n, c, l, "magic"),
              c.alive &&
                (Yj(a, c, o.pos, n.val("pull")), tr(a, c, n.val("slow"), n.val("slowDur"), e, "xingli_s2")));
        },
      }));
  },
});

function lq(n, t, e) {
  const s = Math.sqrt(n.rng.next()) * Math.max(0, e - bS * 0.5),
    i = n.rng.next() * Math.PI * 2;
  return { x: t.x + Math.cos(i) * s, y: t.y + Math.sin(i) * s };
}

function G6(n, t, e, s, i) {
  const { sim: a } = n,
    o = oa(n, "damage", { ap: "apRatio" });
  for (let r = 0; r < $6; r++) {
    const l = lq(a, e, s),
      c = () => ds(a, "xingli_meteor", l, t.team, { unitId: t.id, radius: bS });
    r === 0 ? c() : Kj(a, (i * r) / $6, c);
  }
  for (const r of Pr(a, e, s, ia(t.team)))
    (wo(n, r, o, "magic"), tr(a, r, n.val("slow"), n.val("slowDur"), t, "xingli_ult"));
}

Oi("xingli", "ult", {
  aimLead: $a("xingli", "ult", "delay") + rq,
  cast(n) {
    const { sim: t, caster: e } = n,
      s = Cs(n.targetPos),
      i = n.val("duration"),
      a = n.val("waves"),
      o = i / a;
    (ds(t, "xingli_ult_cast", e.pos, e.team, { unitId: e.id }),
      Zo(t, {
        visual: "telegraph",
        owner: e,
        pos: s,
        radius: n.radius,
        duration: n.val("delay"),
        onEnd(r, l, c) {
          if (!c) return;
          let f = 1;
          const d = Zo(r, {
            visual: "xingli_ult_storm",
            owner: e,
            pos: s,
            radius: n.radius,
            duration: i,
            tickInterval: o,
            onTick(h, u) {
              f >= a || (f++, G6(n, e, u.pos, u.radius, o));
            },
          });
          G6(n, e, d.pos, d.radius, o);
        },
      }));
  },
});

const u0 = Se.fengling.passive.values,
  V6 = E0("fengling", "s1"),
  cq = 0.2;

tu("fengling", {
  statMods(n, t, e) {
    const s = am(t, "fengling_gale");
    s <= 0 || ((e.asPct += s * u0.asPerStack), s >= u0.maxStacks && (e.movePct += u0.haste));
  },
  modifyBasicAttack(n, t, e, s) {
    Ss(e) ||
      (am(t, "fengling_gale") >= u0.maxStacks && (s.bonus += u0.bonus + u0.bonusPerLevel * t.level),
      Ba(t, "fengling_crit") && (s.forceCrit = !0));
  },
  onBasicAttackHit(n, t, e) {
    (Wn(n, t, "fengling_gale", { duration: u0.duration, maxStacks: u0.maxStacks, sourceId: t.id }),
      Ss(e) || Va(n, t, "fengling_crit"));
  },
});

Oi("fengling", "s1", {
  aimSpeed: $a("fengling", "s1", "speed"),
  aimLead: V6,
  cast(n) {
    const { sim: t, caster: e } = n;
    Wm(n, V6, () => {
      const s = oa(n, "damage", { ad: "adRatio" });
      (ds(t, "fengling_s1_cast", e.pos, e.team, { unitId: e.id, dir: Cs(n.dir) }),
        my(t, {
          visual: "fengling_s1",
          owner: e,
          from: e.pos,
          dir: n.dir,
          speed: n.val("speed"),
          range: n.range,
          radius: n.width * 0.5,
          pierce: !0,
          filter: ia(e.team),
          onHit(i, a, o) {
            return o.kind !== "hero"
              ? (zh(i, e, o, s * n.val("minionRatio"), "physical", n.slot), !1)
              : (zh(i, e, o, s, "physical", n.slot),
                tr(i, o, n.val("slow"), n.val("slowDur"), e, "fengling_s1"),
                !0);
          },
        }));
    });
  },
});

Oi("fengling", "s2", {
  aim: "facing",
  movement: !0,
  noAnim: !0,
  lockTime: 0,
  cast(n) {
    const { sim: t, caster: e } = n,
      s = Cs(e.pos);
    (ds(t, "fengling_s2_dash", s, e.team, {
      unitId: e.id,
      from: s,
      to: by(t, e, n.dir, n.range),
      dir: Cs(n.dir),
    }),
      Hm(t, e, {
        dir: n.dir,
        distance: n.range,
        speed: n.val("dashSpeed"),
        onEnd() {
          e.alive &&
            (Vj(t, e, n.val("haste"), n.val("hasteDur"), e, "fengling_s2"),
            Wn(t, e, "fengling_crit", { duration: n.val("critWindow"), sourceId: e.id, merge: "replace" }));
        },
      }));
  },
});

Oi("fengling", "ult", {
  aimLead: $a("fengling", "ult", "delay") + cq,
  cast(n) {
    const { sim: t, caster: e } = n,
      s = Cs(n.targetPos),
      i = n.val("duration"),
      a = n.val("tick"),
      o = Math.round(i / a);
    (ds(t, "fengling_ult_cast", e.pos, e.team, { unitId: e.id }),
      Zo(t, {
        visual: "telegraph",
        owner: e,
        pos: s,
        radius: n.radius,
        duration: n.val("delay"),
        onEnd(r, l, c) {
          if (!c) return;
          let f = 0;
          const d = (u) => {
              f++;
              const m = oa(n, "damage", { ad: "adRatio" });
              ds(t, "fengling_ult_tick", u.pos, e.team, { unitId: e.id, radius: u.radius });
              for (const x of Pr(t, u.pos, u.radius, ia(e.team)))
                (wo(n, x, m, "physical"), tr(t, x, n.val("slow"), n.val("slowDur"), e, "fengling_ult"));
            },
            h = Zo(r, {
              visual: "fengling_ult_rain",
              owner: e,
              pos: s,
              radius: n.radius,
              duration: i,
              tickInterval: a,
              onTick(u, m) {
                f < o && d(m);
              },
            });
          d(h);
        },
      }));
  },
});

const n1 = Se.yeque.passive.values,
  W6 = E0("yeque", "s2"),
  fq = 3,
  dq = 0.3;

tu("yeque", {
  modifyDamageDealt(n, t, e, s) {
    Ss(e) ||
      (e.hp < e.stats.maxHp * n1.threshold && (s.amount *= 1 + n1.bonus),
      e.kind === "monster" && (s.amount *= 1 + n1.monsterBonus));
  },
  onTakedown(n, t) {
    (O6(t, "s1"),
      O6(t, "s2"),
      t.alive &&
        (xS(n, t, t, t.stats.maxHp * n1.healHpRatio, !0),
        Wn(n, t, "yeque_shadow", { duration: fq, sourceId: t.id, merge: "replace" })));
  },
});

Oi("yeque", "s1", {
  movement: !0,
  noAnim: !0,
  lockTime: 0,
  aimSpeed: $a("yeque", "s1", "dashSpeed"),
  cast(n) {
    const { sim: t, caster: e } = n,
      s = Cs(e.pos);
    let i = !1;
    (ds(t, "yeque_s1_dash", s, e.team, {
      unitId: e.id,
      from: s,
      to: by(t, e, n.dir, n.range),
      dir: Cs(n.dir),
    }),
      Hm(t, e, {
        dir: n.dir,
        distance: n.range,
        speed: n.val("dashSpeed"),
        hitRadius: n.width * 0.5,
        filter: ia(e.team),
        onHit(a) {
          const o = a.kind === "hero";
          (wo(n, a, oa(n, "damage", { ad: "adRatio" }), "physical"),
            o && !i && ((i = !0), tq(e, "s1", n.val("refund"))));
        },
      }));
  },
});

Oi("yeque", "s2", {
  aimSpeed: $a("yeque", "s2", "speed"),
  aimLead: W6,
  cast(n) {
    const { sim: t, caster: e } = n;
    Wm(n, W6, () => {
      const s = oa(n, "damage", { ad: "adRatio" }),
        i = Math.round(n.val("blades")),
        a = n.val("spread"),
        o = Math.atan2(n.dir.y, n.dir.x),
        r = new Set();
      ds(t, "yeque_s2_cast", e.pos, e.team, { unitId: e.id, dir: Cs(n.dir) });
      for (let l = 0; l < i; l++) {
        const c = o + (l - (i - 1) * 0.5) * a;
        my(t, {
          visual: "yeque_s2",
          owner: e,
          from: e.pos,
          dir: { x: Math.cos(c), y: Math.sin(c) },
          speed: n.val("speed"),
          range: n.range,
          radius: n.width * 0.5,
          filter: ia(e.team),
          onHit(f, d, h) {
            const u = r.has(h.id) ? n.val("repeatRatio") : 1;
            (r.add(h.id),
              zh(f, e, h, s * u, "physical", n.slot),
              tr(f, h, n.val("slow"), n.val("slowDur"), e, "yeque_s2"));
          },
        });
      }
    });
  },
});

Oi("yeque", "ult", {
  movement: !0,
  cast(n) {
    const { sim: t, caster: e } = n,
      s = n.target;
    if (!s) return;
    const i = Cs(e.pos);
    (ds(t, "yeque_ult_vanish", i, e.team, { unitId: e.id, targetId: s.id }),
      Wn(t, e, "untargetable", {
        duration: n.val("vanish"),
        sourceId: e.id,
        key: "yeque_ult",
        merge: "replace",
        onExpire() {
          if (!e.alive || !s.alive || t.byId.get(s.id) !== s) return;
          const a = s.facing + Math.PI,
            o = s.radius + e.radius + dq,
            r = Cs(Xj(t, e, { x: s.pos.x + Math.cos(a) * o, y: s.pos.y + Math.sin(a) * o }));
          (Qj(e, s.pos),
            ds(t, "yeque_ult_strike", s.pos, e.team, { unitId: e.id, targetId: s.id, from: i, to: r }));
          const l = oa(n, "damage", { ad: "adRatio" }) + n.val("missingRatio") * (s.stats.maxHp - s.hp);
          wo(n, s, l, "physical");
        },
      }));
  },
});

const hq = 0.35,
  uq = 4,
  pq = 60,
  mq = 5,
  Xl = (n) => n.passive?.value ?? 0,
  jm = (n) => n.passive?.value2 ?? 0;

ql("onhit_magic", (n) => ({
  modifyBasicAttack(t, e, s, i) {
    Ss(s) || (i.bonusMagic += Xl(n));
  },
}));

ql("thorns", (n) => ({
  onDamageTaken(t, e, s, i, a) {
    a.kind !== "basic" || !s || !s.alive || Ss(s) || gS(t, e, s, i * Xl(n), "magic");
  },
}));

ql("spell_slow", (n) => ({
  onSkillHit(t, e, s) {
    s.alive && tr(t, s, Xl(n), jm(n), e, "item_frost");
  },
}));

ql("regen_ooc", (n) => ({
  onTick(t, e, s) {
    e.inCombat ||
      e.hp >= e.stats.maxHp ||
      t.state.time - e.lastHitTime < mq ||
      (e.hp = Math.min(e.stats.maxHp, e.hp + e.stats.maxHp * Xl(n) * s));
  },
}));

ql("cripple_aura", (n) => ({
  onDamageTaken(t, e, s, i, a) {
    a.kind !== "basic" || !s || !s.alive || Ss(s) || Wj(t, s, -Xl(n), jm(n), e, "item_cripple");
  },
}));

ql("execute_bonus", (n) => ({
  modifyDamageDealt(t, e, s, i) {
    Ss(s) || (s.hp < s.stats.maxHp * jm(n) && (i.amount *= 1 + Xl(n)));
  },
}));

ql("spell_shield", (n) => ({
  onDamageTaken(t, e) {
    !e.alive ||
      e.hp >= e.stats.maxHp * hq ||
      (eq(t, e, "item_spell_shield", pq) && jj(t, e, Xl(n) + jm(n) * e.level, uq, e, "item_spell_shield"));
  },
}));

// 饭盒 / 野生狗奶：挨打回蓝，耗蓝回血。两个方向都是"资源互换"，
// 所以被动只跟法力挂钩，不需要额外状态。
ql("mana_battery", (n) => ({
  onDamageTaken(t, e, s, i) {
    e.alive && i > 0 && (e.mana = Math.min(e.stats.maxMana, e.mana + i * Xl(n)));
  },
  onManaSpent(t, e, s) {
    s > 0 && e.alive && e.hp < e.stats.maxHp && xS(t, e, e, s * jm(n));
  },
}));

const Pc = 4,
  Dc = -60,
  La = 30,
  gq = 2.6,
  xq = 1.2;

class yq {
  head = new Int32Array(La * La).fill(-1);
  next = new Int32Array(256);
  items = [];
  index(t, e) {
    let s = ((t - Dc) / Pc) | 0,
      i = ((e - Dc) / Pc) | 0;
    return ((s = s < 0 ? 0 : s >= La ? La - 1 : s), (i = i < 0 ? 0 : i >= La ? La - 1 : i), i * La + s);
  }
  push(t) {
    const e = this.items,
      s = e.length;
    if (s >= this.next.length) {
      const a = new Int32Array(this.next.length * 2);
      (a.set(this.next), (this.next = a));
    }
    e.push(t);
    const i = this.index(t.pos.x, t.pos.y);
    ((this.next[s] = this.head[i]), (this.head[i] = s));
  }
  rebuild(t) {
    (this.head.fill(-1), (this.items.length = 0));
    for (let e = t.length - 1; e >= 0; e--) {
      const s = t[e];
      s.alive && this.push(s);
    }
  }
  insert(t) {
    this.push(t);
  }
  query(t, e, s, i) {
    i.length = 0;
    const a = s + gq + xq;
    let o = ((t - a - Dc) / Pc) | 0,
      r = ((t + a - Dc) / Pc) | 0,
      l = ((e - a - Dc) / Pc) | 0,
      c = ((e + a - Dc) / Pc) | 0;
    ((o = o < 0 ? 0 : o), (l = l < 0 ? 0 : l), (r = r >= La ? La - 1 : r), (c = c >= La ? La - 1 : c));
    const f = this.head,
      d = this.next,
      h = this.items;
    for (let u = l; u <= c; u++)
      for (let m = o; m <= r; m++) for (let x = f[u * La + m]; x >= 0; x = d[x]) i.push(h[x]);
    return i.length;
  }
}

const vq = 6,
  bq = 5e4,
  _q = 0.2;

// 双方阵容：蓝方 = 玩家 + 4 名英雄（沿用各自推荐分路，选将页展示的就是这个）；
// 红方 = AI 自由选人（优先用蓝方没选的英雄，不够再从剩下里补）＋ 自由分路（模板打乱）。
// 同一个 seed 结果稳定，方便复现；返回结果同时喂给加载界面和真正的对局，两边不会再对不上。
const LINEUP_LANES = ["top", "mid", "bot", "bot", "jungle"];
function lineupOf(seed, playerHero) {
  let x = ((seed >>> 0) ^ 0x9e3779b9) >>> 0;
  const rnd = () => ((x = (x * 1664525 + 1013904223) >>> 0), x / 4294967296),
    shuffle = (arr) => {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = (rnd() * (i + 1)) | 0,
          t = a[i];
        ((a[i] = a[j]), (a[j] = t));
      }
      return a;
    },
    pool = kr.slice(),
    me = pool.includes(playerHero) ? playerHero : pool[0],
    blue = [me, ...shuffle(pool.filter((h) => h !== me)).slice(0, 4)],
    // 红方先吃掉蓝方没用到的英雄，剩下的从全部英雄里随机补，凑满 5 人
    red = shuffle(pool.filter((h) => !blue.includes(h))).slice(0, 2),
    fill = shuffle(pool.filter((h) => !red.includes(h)));
  while (red.length < 5 && fill.length) red.push(fill.shift());
  while (red.length < 5) red.push(me);
  const laneTpl = shuffle(LINEUP_LANES),
    blueLanes = blue.map((h, i) => (i > 0 && h === "monkey" ? (rnd() < 0.5 ? "mid" : "bot") : Se[h].lane)),
    redLanes = red.map((h, i) => laneTpl[i % laneTpl.length]),
    redMk = red.indexOf("monkey");
  if (redMk >= 0 && redLanes[redMk] !== "mid" && redLanes[redMk] !== "bot") {
    const pref = rnd() < 0.5 ? "mid" : "bot",
      alt = pref === "mid" ? "bot" : "mid",
      swapIdx = redLanes.indexOf(pref) >= 0 ? redLanes.indexOf(pref) : redLanes.indexOf(alt);
    if (swapIdx >= 0) {
      const tmp = redLanes[redMk];
      ((redLanes[redMk] = redLanes[swapIdx]), (redLanes[swapIdx] = tmp));
    } else redLanes[redMk] = pref;
  }
  return {
    me,
    blue,
    red,
    blueLanes,
    redLanes,
  };
}

class wq {
  state;
  config;
  opts;
  map;
  nav;
  grid = new yq();
  rng;
  scheduler = new Oj();
  units = [];
  heroes = [];
  projectiles = [];
  areas = [];
  cones = [];
  byId = new Map();
  lanes;
  towers;
  cores;
  camps = [];
  lastSeen;
  superAnnounced;
  firstBlood = !1;
  nextWaveAt = v0.firstAt;
  buffSeq = 0;
  events = [];
  nextId = 1;
  frozen = !1;
  views = new Map();
  constructor(t, e = {}) {
    const s = kr.includes(t.playerHero) ? t.playerHero : kr[0];
    ((this.config = { ...t, playerHero: s }),
      (this.opts = e),
      (this.map = u8()),
      (this.nav = new NV(this.map)),
      (this.rng = new om(t.seed)),
      (this.lanes = {
        top: new rf(this.map.lanes.top),
        mid: new rf(this.map.lanes.mid),
        bot: new rf(this.map.lanes.bot),
      }),
      (this.state = {
        time: 0,
        tick: 0,
        config: this.config,
        map: this.map,
        units: this.units,
        heroes: this.heroes,
        projectiles: this.projectiles,
        areas: this.areas,
        teams: [
          { kills: 0, towersDestroyed: 0, gold: 0, blessingLeft: 0 },
          { kills: 0, towersDestroyed: 0, gold: 0, blessingLeft: 0 },
        ],
        camps: this.map.camps.map((c) => ({ campId: c.id, alive: !1, respawnIn: c.firstSpawn })),
        playerId: -1,
        nextWaveIn: v0.firstAt,
        wave: 0,
        over: !1,
        winner: null,
      }));
    const i = () => ({ top: [null, null, null], mid: [null, null, null], bot: [null, null, null] });
    ((this.towers = [i(), i()]),
      (this.superAnnounced = [
        { top: !1, mid: !1, bot: !1 },
        { top: !1, mid: !1, bot: !1 },
      ]));
    const a = () => Array.from({ length: 10 }, () => ({ x: 0, y: 0, time: -999 }));
    this.lastSeen = [a(), a()];
    // 阵容：加载界面传来的那份优先（保证界面显示的就是真实参战名单），否则按 seed 现算
    const lu =
      t.lineup && t.lineup.blue?.length === 5 && t.lineup.red?.length === 5
        ? t.lineup
        : lineupOf(t.seed, s);
    this.lineup = lu;
    for (const c of [0, 1]) {
      const list = c === 0 ? lu.blue : lu.red,
        lanes = (c === 0 ? lu.blueLanes : lu.redLanes) || [];
      list.forEach((f, d) => {
        const h = KV(this, c * 5 + d, c, f, c === 0 && d === 0, lanes[d]);
        (this.addUnit(h),
          this.heroes.push(h),
          (this.state.teams[c].gold += h.goldEarned),
          h.isPlayer && (this.state.playerId = h.id));
      });
    }
    for (const c of this.map.towers) {
      const f = QV(this, c);
      ((this.towers[c.team][c.lane][c.tier - 1] = f),
        this.addUnit(f),
        this.nav.addObstacle(f.id, f.pos.x, f.pos.y, f.radius));
    }
    const r = this.map.bases.map((c) => {
      const f = JV(this, c);
      return (this.addUnit(f), this.nav.addObstacle(f.id, f.pos.x, f.pos.y, f.radius), f);
    });
    ((this.cores = [r[0], r[1]]), nS(this), AW(this));
    for (const c of this.heroes) Lj(this, c);
    const l = new om((t.seed ^ 1540483477) >>> 0);
    for (const c of this.heroes)
      (this.views.set(c.id, new jV(this, c, WG(t.difficulty, c.team), l.fork())),
        !e.noBots && (!c.isPlayer || t.autoPlay) && this.setBotControl(c.id, !0));
    (this.grid.rebuild(this.units), x6(this), this.emit({ type: "announce", key: "match_start", team: 2 }));
  }
  step() {
    const t = this.state;
    if ((t.tick++, (t.time = t.tick * xo), t.over)) {
      this.freeze();
      return;
    }
    const e = xo,
      s = this.units;
    (this.scheduler.run(t.time), Fj(this), CW(this), this.updateBlessing(e));
    const i = this.rng.next(),
      a = i < 0.5,
      o = ((i * 4) | 0) % 2 === 0;
    (this.grid.rebuild(s), this.runBots(o));
    const r = s.length;
    for (let l = 0; l < r; l++) {
      const c = s[l];
      ((c.prevPos.x = c.pos.x), (c.prevPos.y = c.pos.y), (c.rt.moved = !1));
    }
    for (let l = 0; l < r; l++) {
      const c = s[a ? l : r - 1 - l];
      switch ((c.alive && hj(this, c, e), c.kind)) {
        case "hero":
          Cj(this, c, e);
          break;
        case "minion":
          c.alive && Uj(this, c, e);
          break;
        case "monster":
          c.alive && zW(this, c, e);
          break;
        case "tower":
        case "core":
          c.alive && jW(this, c, e);
          break;
      }
      if (t.over) break;
    }
    (this.grid.rebuild(s), HW(this, e), XV(this, e), hW(this), YW(this, e), t.tick % vq === 0 && x6(this));
    for (let l = 0; l < s.length; l++) qV(this, s[l]);
    this.removeDead();
  }
  command(t, e) {
    const s = this.byId.get(t);
    !s || s.kind !== "hero" || Aj(this, s, e);
  }
  drainEvents() {
    const t = this.events;
    return ((this.events = []), t);
  }
  getUnit(t) {
    return this.byId.get(t);
  }
  get time() {
    return this.state.time;
  }
  allocId() {
    return this.nextId++;
  }
  emit(t) {
    const e = this.events;
    (e.length >= bq && (e.length = 0), e.push(t));
  }
  fx(t, e, s, i) {
    this.emit({ type: "fx", key: t, pos: { x: e.x, y: e.y }, team: s, ...i });
  }
  schedule(t, e) {
    return this.scheduler.at(this.state.time + Math.max(0, t), e);
  }
  addUnit(t) {
    (this.units.push(t), this.byId.set(t.id, t), this.grid.insert(t));
  }
  botView(t) {
    return this.views.get(t);
  }
  setBotControl(t, e) {
    const s = this.byId.get(t),
      i = this.views.get(t);
    if (!(!s || s.kind !== "hero" || !i)) {
      if (!e) {
        s.h.controller = null;
        return;
      }
      ((s.h.controller = (this.opts.botFactory ?? RV)(i)),
        (s.h.nextThink = Math.max(0.5, this.state.time) + (s.h.index % 5) * 0.04));
    }
  }
  runBots(t) {
    const e = this.state.time,
      s = this.heroes;
    for (let i = 0; i < s.length; i++) {
      const a = s[t ? i : s.length - 1 - i],
        o = a.h.controller;
      if (!o || e < a.h.nextThink) continue;
      a.h.nextThink = e + (o.interval ?? _q);
      const r = this.views.get(a.id);
      r && o.think(r);
    }
  }
  updateBlessing(t) {
    for (const e of [0, 1]) {
      const s = this.state.teams[e];
      if (!(s.blessingLeft <= 0) && ((s.blessingLeft -= t), !(s.blessingLeft > 0))) {
        s.blessingLeft = 0;
        for (const i of this.units) i.kind === "minion" && i.team === e && i.alive && _o(this, i);
      }
    }
  }
  removeDead() {
    const t = this.units;
    let e = 0;
    for (let s = 0; s < t.length; s++) {
      const i = t[s];
      if (!i.alive && (i.kind === "minion" || i.kind === "monster" || i.kind === "tower")) {
        this.byId.delete(i.id);
        continue;
      }
      t[e++] = i;
    }
    t.length = e;
  }
  freeze() {
    if (!this.frozen) {
      this.frozen = !0;
      for (const t of this.units) ((t.prevPos.x = t.pos.x), (t.prevPos.y = t.pos.y));
      for (const t of this.projectiles) ((t.prevPos.x = t.pos.x), (t.prevPos.y = t.pos.y));
    }
  }
}

function Mq(n, t) {
  return new wq(n, t);
}

class kq {
  stepDt;
  maxFrameDt;
  maxSteps;
  acc = 0;
  droppedTime = 0;
  constructor(t) {
    if (!(t.stepDt > 0)) throw new Error("stepDt 必须为正数");
    ((this.stepDt = t.stepDt),
      (this.maxFrameDt = t.maxFrameDt ?? 0.25),
      (this.maxSteps = Math.max(1, Math.floor(t.maxSteps ?? 6))));
  }
  advance(t, e = 1) {
    if (!(t > 0) || !(e > 0)) return 0;
    this.acc += Math.min(t, this.maxFrameDt) * e;
    let s = Math.floor(this.acc / this.stepDt + 1e-9);
    const i = this.maxSteps * Math.max(1, Math.ceil(e));
    return (
      s > i
        ? ((this.droppedTime += (s - i) * this.stepDt), (s = i), (this.acc = 0))
        : (this.acc = Math.max(0, this.acc - s * this.stepDt)),
      s
    );
  }
  get alpha() {
    const t = this.acc / this.stepDt;
    return t < 0 ? 0 : t > 0.999999 ? 0.999999 : t;
  }
  reset() {
    this.acc = 0;
  }
}

class Sq {
  stepper;
  speed;
  frames = 0;
  ticks = 0;
  gapResets = 0;
  hooks;
  env;
  gapResetSec;
  simBudgetMs;
  rafId = 0;
  active = !1;
  isPaused = !1;
  last = -1;
  info = { alpha: 0, dt: 0, steps: 0, paused: !1, simMs: 0, now: 0 };
  onRaf = () => {
    ((this.rafId = 0),
      this.active && ((this.rafId = this.env.raf(this.onRaf)), this.runFrame(this.env.now())));
  };
  constructor(t, e, s) {
    ((this.hooks = t),
      (this.env = e),
      (this.stepper = new kq(s)),
      (this.speed = s.speed ?? 1),
      (this.gapResetSec = s.gapResetSec ?? 5),
      (this.simBudgetMs = s.simBudgetMs ?? 80));
  }
  get running() {
    return this.active;
  }
  get paused() {
    return this.isPaused;
  }
  start() {
    this.active || ((this.active = !0), this.resetClock(), (this.rafId = this.env.raf(this.onRaf)));
  }
  stop() {
    ((this.active = !1), this.rafId && this.env.caf(this.rafId), (this.rafId = 0));
  }
  setPaused(t) {
    t !== this.isPaused && ((this.isPaused = t), t || this.stepper.reset());
  }
  resetClock() {
    (this.stepper.reset(), (this.last = -1));
  }
  runFrame(t) {
    const e = this.hooks;
    try {
      let s = this.last < 0 ? 0 : (t - this.last) / 1e3;
      ((this.last = t),
        s < 0 && (s = 0),
        s > this.gapResetSec && ((s = 0), this.stepper.reset(), this.gapResets++),
        s > this.stepper.maxFrameDt && (s = this.stepper.maxFrameDt));
      let i = 0,
        a = 0,
        o = null,
        r = 0;
      if (!this.isPaused) {
        const c = this.stepper.advance(s, this.speed);
        if (c > 0) {
          const f = this.env,
            d = f.now();
          let h = !1;
          for (; i < c;) {
            (e.step(), i++);
            const u = e.drain();
            if (((r = o ? o.length : 0), u.length > 0))
              if (!o) o = u;
              else {
                h || ((o = o.slice()), (h = !0));
                for (let m = 0; m < u.length; m++) o.push(u[m]);
              }
            if ((i & 3) === 0 && i < c && f.now() - d > this.simBudgetMs) {
              ((this.stepper.droppedTime += (c - i) * this.stepper.stepDt), this.stepper.reset());
              break;
            }
          }
          ((a = f.now() - d), (this.ticks += i));
        }
      }
      o && e.events(o, i, r);
      const l = this.info;
      ((l.alpha = this.stepper.alpha),
        (l.dt = s),
        (l.steps = i),
        (l.paused = this.isPaused),
        (l.simMs = a),
        (l.now = t),
        this.frames++,
        e.frame(l));
    } catch (s) {
      if ((this.stop(), e.error)) e.error(s);
      else throw s;
    }
  }
}

const j6 = "starfall-app-style",
  Tq = '"PingFang SC","HarmonyOS Sans SC","Microsoft YaHei",system-ui,sans-serif',
  Eq = `
.app-match { position: absolute; inset: 0; overflow: hidden; isolation: isolate; background: #070a14; }
.app-stage { position: absolute; inset: 0; overflow: hidden; transition: filter 0.6s linear; }
.app-stage.is-gray { filter: grayscale(0.92) brightness(0.8); }

.app-layer {
  position: absolute; inset: 0; z-index: 900; display: grid; place-items: center; box-sizing: border-box;
  padding: max(16px, env(safe-area-inset-top, 0px)) max(16px, env(safe-area-inset-right, 0px)) max(16px, env(safe-area-inset-bottom, 0px)) max(16px, env(safe-area-inset-left, 0px));
  font-family: ${Tq}; font-size: 14px; line-height: 1.6; color: #eaf0ff;
  background: rgba(3, 6, 16, 0.78); overflow: auto; -webkit-user-select: none; user-select: none;
  animation: app-layer-in 0.25s ease-out both;
}
.app-layer--page { background: radial-gradient(120% 90% at 50% 0%, #16264f 0%, #0a1128 46%, #050814 100%); }
.app-layer * { box-sizing: border-box; }
@keyframes app-layer-in { from { opacity: 0; } to { opacity: 1; } }
.app-card {
  position: relative; width: min(100%, 460px); padding: 22px 24px 20px; border-radius: 10px;
  background: linear-gradient(180deg, rgba(20, 34, 72, 0.96), rgba(10, 17, 40, 0.97));
  box-shadow: 0 0 0 1px rgba(224, 177, 96, 0.55), 0 0 0 4px rgba(8, 13, 31, 0.6), 0 18px 48px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(143, 233, 255, 0.16);
  text-align: center; animation: app-card-in 0.3s cubic-bezier(0.2, 0.9, 0.3, 1.2) both;
}
@keyframes app-card-in { from { opacity: 0; transform: translateY(10px) scale(0.97); } to { opacity: 1; transform: none; } }
.app-card__mark { display: block; width: 56px; height: 56px; margin: 0 auto 6px; filter: drop-shadow(0 0 8px rgba(255, 214, 130, 0.55)); }
.app-card--error .app-card__mark { filter: drop-shadow(0 0 8px rgba(255, 110, 110, 0.5)); }
.app-card__title {
  margin: 0 0 8px; font-size: 20px; font-weight: 800; letter-spacing: 0.16em; margin-right: -0.16em; color: #ffe7ad;
  background: linear-gradient(180deg, #fffbe9 0%, #f3cf85 55%, #b98434 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
}
.app-card--error .app-card__title { background-image: linear-gradient(180deg, #fff1ec 0%, #ff9d8a 55%, #c2473f 100%); }
.app-card__text { margin: 0 0 6px; color: #b3c1e0; }
.app-card__list { margin: 8px 0 4px; padding: 10px 14px 10px 30px; text-align: left; color: #b3c1e0; background: rgba(5, 8, 20, 0.5); border-radius: 6px; }
.app-card__list li { margin: 2px 0; }
.app-card__detail {
  margin: 10px 0 0; padding: 8px 10px; max-height: 96px; overflow: auto; text-align: left; white-space: pre-wrap; word-break: break-all;
  font: 12px/1.5 ui-monospace, Menlo, Consolas, monospace; color: #9fb0d0; background: rgba(5, 8, 20, 0.6); border-radius: 6px;
  -webkit-user-select: text; user-select: text;
}
.app-card__btns { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 16px; }
.app-btn {
  min-width: 124px; min-height: 42px; padding: 0 20px; border: 0; border-radius: 6px; cursor: pointer;
  font: inherit; font-weight: 700; letter-spacing: 0.12em; color: #eaf0ff; background: rgba(40, 64, 124, 0.7);
  box-shadow: inset 0 0 0 1px rgba(143, 233, 255, 0.35); touch-action: manipulation; -webkit-tap-highlight-color: transparent;
  transition: filter 0.12s linear, transform 0.08s linear;
}
.app-btn:hover { filter: brightness(1.15); }
.app-btn:active { transform: translateY(1px) scale(0.98); }
.app-btn:focus-visible { outline: 2px solid #8fe9ff; outline-offset: 2px; }
.app-btn--primary { color: #2a1a04; background: linear-gradient(180deg, #ffe7ad, #e0b160 60%, #c08c3c); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 0 14px rgba(255, 214, 130, 0.35); }
`,
  Aq =
    '<svg class="app-card__mark" viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="app-mk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffbe9"/><stop offset=".55" stop-color="#f3cf85"/><stop offset="1" stop-color="#a8742c"/></linearGradient></defs><ellipse cx="32" cy="34" rx="26" ry="9" fill="none" stroke="#8fe9ff" stroke-opacity=".7" stroke-width="1.6" transform="rotate(-18 32 34)"/><path d="M32 4Q34.6 26.4 58 32Q34.6 37.6 32 60Q29.4 37.6 6 32Q29.4 26.4 32 4Z" fill="url(#app-mk)"/><circle cx="32" cy="32" r="4" fill="#fffdf2"/></svg>';

function _y() {
  if (document.getElementById(j6)) return;
  const n = document.createElement("style");
  ((n.id = j6), (n.textContent = Eq), (document.head ?? document.documentElement).appendChild(n));
}

function s1() {
  window.__mobaBooted = !0;
  const n = document.getElementById("boot");
  !n ||
    n.classList.contains("is-done") ||
    (n.classList.add("is-done"), window.setTimeout(() => n.remove(), 600));
}

function Rq() {
  try {
    const t = document.createElement("canvas").getContext("webgl2");
    return t ? (t.getExtension("WEBGL_lose_context")?.loseContext(), !0) : !1;
  } catch {
    return !1;
  }
}

function R1(n, t) {
  _y();
  const e = document.createElement("div");
  ((e.className = `app-layer${t.page ? " app-layer--page" : ""}`),
    e.setAttribute("role", "alertdialog"),
    e.setAttribute("aria-modal", "true"),
    e.setAttribute("aria-label", t.title));
  const s = document.createElement("div");
  ((s.className = `app-card${t.tone === "error" ? " app-card--error" : ""}`), (s.innerHTML = Aq));
  const i = document.createElement("h2");
  ((i.className = "app-card__title"), (i.textContent = t.title), s.appendChild(i));
  for (const u of t.lines) {
    const m = document.createElement("p");
    ((m.className = "app-card__text"), (m.textContent = u), s.appendChild(m));
  }
  if (t.list && t.list.length > 0) {
    const u = document.createElement("ul");
    u.className = "app-card__list";
    for (const m of t.list) {
      const x = document.createElement("li");
      ((x.textContent = m), u.appendChild(x));
    }
    s.appendChild(u);
  }
  let a = null;
  const o = (u) => {
      a || ((a = document.createElement("pre")), (a.className = "app-card__detail"), s.insertBefore(a, r));
      const m = a.textContent
        ? a.textContent.split(`
`)
        : [];
      (m.push(u),
        (a.textContent = m.slice(-6).join(`
`)));
    },
    r = document.createElement("div");
  r.className = "app-card__btns";
  let l = !1;
  const c = () => {
    l ||
      ((l = !0),
      window.removeEventListener("keydown", h, !0),
      window.removeEventListener("keyup", h, !0),
      e.remove());
  };
  let f = null;
  for (const u of t.buttons) {
    const m = document.createElement("button");
    ((m.type = "button"),
      (m.className = `app-btn${u.primary ? " app-btn--primary" : ""}`),
      (m.textContent = u.label),
      m.addEventListener("click", () => {
        (c(), u.onClick());
      }),
      r.appendChild(m),
      u.primary && !f && (f = m));
  }
  (s.appendChild(r), t.detail && o(t.detail));
  const d = (u) => u.stopPropagation();
  for (const u of [
    "pointerdown",
    "pointerup",
    "mousedown",
    "mouseup",
    "click",
    "touchstart",
    "touchend",
    "wheel",
    "contextmenu",
    "keydown",
    "keyup",
  ])
    e.addEventListener(u, d);
  const h = (u) => {
    l ||
      !e.isConnected ||
      (u.target instanceof Node && e.contains(u.target)) ||
      (u.stopPropagation(),
      u.type === "keydown" &&
        (u.key === "Tab" || u.key === "Enter" || u.key === " ") &&
        (u.preventDefault(), f?.focus({ preventScroll: !0 })));
  };
  return (
    window.addEventListener("keydown", h, !0),
    window.addEventListener("keyup", h, !0),
    e.appendChild(s),
    n.appendChild(e),
    f?.focus({ preventScroll: !0 }),
    { el: e, addDetail: o, close: c }
  );
}

function o5(n) {
  if (n instanceof Error) return n.message ? `${n.name}: ${n.message}` : n.name;
  if (typeof n == "string") return n;
  try {
    const t = JSON.stringify(n);
    return typeof t == "string" ? t : String(n);
  } catch {
    return String(n);
  }
}

const Cq = 2600,
  Lq = 1200,
  Iq = 0.6,
  Pq = 1500,
  _S = 6,
  Dq = _S + 2,
  zq = new Set([
    "attack",
    "damage",
    "heal",
    "fx",
    "skillCast",
    "projectileHit",
    "gold",
    "itemBought",
    "reject",
  ]);

function Nq(n, t) {
  const e = [];
  for (let s = 0; s < n.length; s++) {
    const i = n[s];
    (s >= t || !zq.has(i.type)) && e.push(i);
  }
  return e;
}

const dl = { world: 0.05, scene: 0.2, warm: 0.5, hud: 0.92 },
  q6 = yB,
  r5 = vB,
  Fq = (n) => n.engine,
  to = () => performance.now();

function zc() {
  return new Promise((n) => {
    let t = !1;
    const e = () => {
      t || ((t = !0), n());
    };
    (requestAnimationFrame(() => window.setTimeout(e, 0)), window.setTimeout(e, 160));
  });
}

const X6 = (n) => new Promise((t) => window.setTimeout(t, n));

async function Uq(n, t, e, s) {
  _y();
  const { app: i, audio: a, perf: o } = n;
  n.setPhase("loading");
  // 阵容先算出来：加载界面按它列人，进对局再把同一份传下去，界面和实际参战不会再对不上
  const lu = lineupOf(e.seed, t.heroId),
    r = XH(i, t, n.menuHost, lu),
    l = to(),
    c = document.createElement("div");
  c.className = "app-match";
  const f = document.createElement("div");
  ((f.className = "app-stage"), c.appendChild(f));
  let d = null,
    h = null,
    u = !1,
    m = !1,
    x = () => {
      m = !0;
      try {
        (h?.dispose(), d?.dispose());
      } catch (g) {
        console.error(g);
      }
      ((d = null), c.remove(), r.close());
    };
  const p = () => (s.cancelled ? (x(), !0) : !1);
  try {
    const needKarts = new Set();
    if (t.skin) needKarts.add(t.skin);
    for (const hid of [...(lu?.blue || []), ...(lu?.red || []), t.heroId]) {
      const kid = heroKartId(hid);
      if (kid) needKarts.add(kid);
    }
    for (const kid of needKarts) {
      // 原版角色模型是运行时拉的（dist/kart/<id>.bin），进对局前先等它到齐，
      // 否则第一帧会拿一个还没登记的模型 key 去取定义。
      r.setProgress(dl.world, `加载 ${kartSpec(kid)?.name ?? '角色'}…`);
      await preloadKart(kid);
      if (p()) return null;
    }
    if ((r.setProgress(dl.world, "集结双方英雄…"), await zc(), p())) return null;
    const g = {
        seed: e.seed,
        playerHero: t.heroId,
        // 占位皮：玩家选的角色外观（技能包还是 heroId 那套）
        skin: t.skin ?? null,
        difficulty: t.difficulty,
        autoPlay: e.autoPlay,
        autoBuy: n.getSettings().autoBuy,
        lineup: lu,
      },
      y = Mq(g),
      v = y.state;
    if ((r.setProgress(dl.scene, "铺展星陨高原…"), await zc(), p())) return null;
    i.insertBefore(c, i.firstChild);
    const _ = n.getSettings().quality,
      k = (lt, O) => (Y) => r.setProgress(lt + (O - lt) * Math.max(0, Math.min(1, Y)));
    if (typeof r5 == "function") {
      if (((d = await r5(f, v, { quality: _ }, k(dl.scene, dl.warm))), p())) return null;
    } else d = q6(f, v, { quality: _ });
    if (
      (d.setCameraShake?.(n.getSettings().cameraShake),
      r.setProgress(typeof r5 == "function" ? dl.warm : 0.62, "点亮星辉与光影…"),
      await zc(),
      p())
    )
      return null;
    if ((d.resize(), typeof d.prewarmAsync == "function")) {
      if ((await d.prewarmAsync(k(dl.warm, 0.9)), p())) return null;
      d.render(v, 1, 0);
    } else {
      if ((d.render(v, 1, 0), r.setProgress(0.82, "点亮星辉与光影…"), await zc(), p())) return null;
      d.render(v, 1, 1 / 60);
    }
    if (
      (d.snapCamera?.(),
      r.setProgress(dl.hud, "布置战斗界面…"),
      await Promise.race([
        pH(
          n.menuHost,
          v.heroes.map((lt) => lt.heroId),
        ),
        X6(Pq),
      ]),
      await zc(),
      p())
    )
      return null;
    let M = () => {},
      S = !1;
    const b = new Promise((lt) => {
        M = lt;
      }),
      w = (lt) => {
        S || ((S = !0), M(lt));
      },
      T = new Set();
    let E = !1;
    const A = () => {
        let lt = !1;
        for (const O of T) O !== "hud" && (lt = !0);
        u || h?.setInputEnabled(E && !lt);
      },
      C = (lt, O) => {
        (O ? T.add(lt) : T.delete(lt), Q.setPaused(T.size > 0), A());
      };
    let R = !1,
      I = 0,
      P = -1,
      F = !1,
      L = !1;
    const B = document.createElement("div"),
      G = (lt) => {
        lt !== L && ((L = lt), f.classList.toggle("is-gray", lt));
      },
      q = (lt) => {
        const O = R && !v.over ? 1 : 0;
        if (I !== O) {
          const _t = lt / Iq;
          I = I < O ? Math.min(O, I + _t) : Math.max(O, I - _t);
        }
        const Y = d;
        if (!Y) return;
        if (typeof Y.setDeathTint == "function") {
          (I !== P && (Y.setDeathTint(I), (P = I)), G(!1));
          return;
        }
        const gt = Fq(Y),
          ft = gt?.postEnabled === !0 ? gt.grade : void 0;
        (ft && (I !== P || !F) && ((ft.desaturate = I * 0.9), (ft.dim = I * 0.16), (P = I)),
          (F = !!ft),
          G(!ft && O === 1));
      };
    let et = null;
    const ct = {
        command: (lt) => y.command(v.playerId, lt),
        setAim: (lt) => d?.setAim(lt),
        screenToGround: (lt, O) => (d ? d.screenToGround(lt, O) : null),
        worldToScreen: (lt, O) => (d ? d.worldToScreen(lt, O) : { x: 0, y: 0, visible: !1 }),
        pickUnit: (lt, O) => (d ? d.pickUnit(lt, O, v) : -1),
        setCameraPeek: (lt) => d?.setCameraPeek(lt),
        setPaused: (lt) => C("hud", lt),
        quit: () => w({ kind: "quit" }),
        getSettings: n.getSettings,
        updateSettings: n.updateSettings,
        getFps: () => o.fps,
        audio: a,
        portrait: n.portrait,
        setOverlayAvoid: (lt) => {
          ((et = lt), d?.setOverlayAvoid?.(lt));
        },
      },
      rt = FG(c, ct, v, {
        dimTarget: B,
        onDeathChange: (lt) => {
          R = lt;
        },
        inputEnabled: !1,
      });
    h = rt;
    let mt = 0,
      nt = 0,
      H = 0,
      st = -1,
      tt = -1,
      it = !1;
    const D = e.speed > 1,
      Q = new Sq(
        {
          step: () => y.step(),
          drain: () => y.drainEvents(),
          events(lt, O, Y) {
            const gt = O > Dq ? Nq(lt, Y) : lt,
              ft = to();
            d?.handleEvents(gt, v);
            const _t = to();
            u || rt.handleEvents(lt, v);
            const Dt = to();
            (a.handleEvents(gt, v), (mt = _t - ft), (nt = Dt - _t), (H = to() - Dt));
          },
          frame(lt) {
            const O = to();
            (it && ((it = !1), d?.resize()), q(lt.dt), d?.render(v, lt.alpha, lt.dt));
            const Y = to();
            u || rt.update(v, lt.dt);
            const gt = to();
            lt.paused || a.update(v, lt.dt);
            const ft = to(),
              _t = st >= 0 && lt.dt > 0 ? lt.now - st : 0;
            ((st = lt.now),
              o.frame(lt.simMs, mt + (Y - O), nt + (gt - Y), H + (ft - gt), ft - lt.now, _t, lt.steps),
              (mt = nt = H = 0),
              v.over &&
                (tt < 0
                  ? ((tt = lt.now), (Q.speed = 1))
                  : lt.now - tt >= Cq && w({ kind: "finished", state: v, endTime: v.endTime ?? v.time })));
          },
          error(lt) {
            n.onLoopError(lt);
          },
        },
        { now: to, raf: (lt) => requestAnimationFrame(lt), caf: (lt) => cancelAnimationFrame(lt) },
        {
          stepDt: xo,
          maxFrameDt: D ? 1 : 0.25,
          maxSteps: D ? 30 : _S,
          speed: e.speed,
          simBudgetMs: D ? 240 : 80,
          gapResetSec: D ? 1 / 0 : 5,
        },
      ),
      $ = () => {
        it = !0;
      },
      ut = typeof ResizeObserver == "function" ? new ResizeObserver($) : null;
    (ut?.observe(f), window.addEventListener("resize", $), window.addEventListener("orientationchange", $));
    const N = () => Q.resetClock();
    document.addEventListener("visibilitychange", N);
    const J = n.onSettings((lt) => {
      (lt.autoBuy !== void 0 && !v.over && y.command(v.playerId, { type: "autoBuy", enabled: lt.autoBuy }),
        d &&
          (lt.quality !== void 0 && d.setQuality(lt.quality),
          lt.cameraShake !== void 0 && d.setCameraShake?.(lt.cameraShake)));
    });
    let Z = null;
    const ot = () => {
        const lt = d;
        d = null;
        try {
          lt?.dispose();
        } catch (O) {
          console.error(O);
        }
        (f.replaceChildren(),
          (d = q6(f, v, { quality: n.getSettings().quality })),
          d.setCameraShake?.(n.getSettings().cameraShake),
          d.resize(),
          d.render(v, 1, 0),
          d.snapCamera?.(),
          et && d.setOverlayAvoid?.(et),
          (P = -1),
          (F = !1));
      },
      j = (lt) => {
        kt ||
          !d ||
          Z ||
          (lt.preventDefault(),
          C("context", !0),
          (Z = R1(c, {
            title: "画面已中断",
            lines: ["图形设备被系统收回(常见于切到后台过久或显存不足)。", "对局已暂停，战况完好无损。"],
            buttons: [
              {
                label: "恢复画面",
                primary: !0,
                onClick() {
                  if (((Z = null), !kt))
                    try {
                      (ot(), C("context", !1));
                    } catch (O) {
                      n.onLoopError(O);
                    }
                },
              },
              {
                label: "返回主菜单",
                onClick() {
                  ((Z = null), w({ kind: "quit" }));
                },
              },
            ],
          })));
      },
      at = () => {
        kt || !Z || (Z.close(), (Z = null), (it = !0), C("context", !1));
      };
    (f.addEventListener("webglcontextlost", j, !0), f.addEventListener("webglcontextrestored", at, !0));
    const Rt = () => {
      if (!u) {
        u = !0;
        try {
          rt.dispose();
        } catch (lt) {
          console.error(lt);
        }
      }
    };
    let kt = !1;
    const V = () => {
        if (!kt) {
          ((kt = !0),
            Q.stop(),
            w({ kind: "quit" }),
            ut?.disconnect(),
            window.removeEventListener("resize", $),
            window.removeEventListener("orientationchange", $),
            document.removeEventListener("visibilitychange", N),
            f.removeEventListener("webglcontextlost", j, !0),
            f.removeEventListener("webglcontextrestored", at, !0),
            J(),
            Z?.close(),
            (Z = null),
            Rt());
          try {
            a.update(null, 0);
          } catch (lt) {
            console.error(lt);
          }
          c.remove();
        }
      },
      U = {
        config: g,
        world: y,
        state: v,
        get renderer() {
          return d;
        },
        hud: rt,
        loop: Q,
        stage: f,
        finished: b,
        setPause: C,
        disposeHud: Rt,
        halt: V,
        dispose() {
          if ((V(), !m)) {
            m = !0;
            try {
              d?.dispose();
            } catch (lt) {
              console.error(lt);
            }
            d = null;
          }
        },
      };
    ((x = () => {
      (U.dispose(), r.close());
    }),
      rt.update(v, 0),
      r.setProgress(1, "进入战场"));
    const ht = e.fastLoad ? 0 : Lq - (to() - l);
    return (
      ht > 0 && (await X6(ht)),
      await zc(),
      p()
        ? null
        : (o.reset(), a.setMusic("battle"), r.close(), n.setPhase("match"), (E = !0), A(), Q.start(), U)
    );
  } catch (g) {
    throw (x(), g);
  }
}

const Oq = 64,
  C1 = (n) => n !== null && n !== "0" && n !== "false" && n !== "off",
  l5 = (n) => (n === null ? null : C1(n));

function Bq(n) {
  const t = n.replace(/^#/, "");
  if (t === "") return new URLSearchParams();
  if (t.includes("=") || t.includes("&")) return new URLSearchParams(t);
  const e = new URLSearchParams();
  return (t === "demo" ? (e.set("skipmenu", "1"), e.set("auto", "1")) : e.set(t, "1"), e);
}

function Hq(n, t = "") {
  const e = new URLSearchParams(n),
    s = Bq(t),
    i = (h) => e.get(h) ?? s.get(h),
    a = i("hero"),
    o = i("difficulty"),
    r = i("quality");
  let l = null;
  const c = i("seed");
  if (c !== null && c.trim() !== "") {
    const h = Number(c);
    Number.isFinite(h) && (l = Math.floor(Math.abs(h)) >>> 0);
  }
  let f = 1;
  const d = i("speed");
  if (d !== null) {
    const h = Number(d);
    Number.isFinite(h) && h > 0 && (f = Math.min(Oq, Math.max(0.1, h)));
  }
  return {
    hero: a !== null && kr.includes(a) ? a : null,
    // ?skin=frog：直接进对局时用哪个占位皮（调试试玩用）
    skin: i("skin"),
    difficulty: o === "easy" || o === "normal" || o === "hard" ? o : null,
    seed: l,
    skipMenu: C1(i("skipmenu")),
    auto: C1(i("auto")),
    speed: f,
    quality: r === "low" || r === "medium" || r === "high" ? r : null,
    showFps: C1(i("fps")),
    autoBuy: l5(i("autobuy")),
    tutorial: l5(i("tutorial")),
    objectiveHints: l5(i("hints")),
  };
}

class hl {
  buf;
  n = 0;
  head = 0;
  sum = 0;
  last = 0;
  peak = 0;
  constructor(t = 240) {
    this.buf = new Float64Array(Math.max(1, Math.floor(t)));
  }
  push(t) {
    const e = this.buf;
    (this.n === e.length ? (this.sum -= e[this.head]) : this.n++,
      (e[this.head] = t),
      (this.sum += t),
      (this.head = (this.head + 1) % e.length),
      (this.last = t),
      t > this.peak && (this.peak = t));
  }
  get count() {
    return this.n;
  }
  get avg() {
    return this.n > 0 ? this.sum / this.n : 0;
  }
  get max() {
    let t = 0;
    for (let e = 0; e < this.n; e++) this.buf[e] > t && (t = this.buf[e]);
    return t;
  }
  percentile(t) {
    if (this.n === 0) return 0;
    const e = Array.from(this.buf.subarray(0, this.n)).sort((i, a) => i - a),
      s = Math.min(this.n - 1, Math.max(0, Math.ceil(t * this.n) - 1));
    return e[s];
  }
  reset() {
    ((this.n = 0), (this.head = 0), (this.sum = 0), (this.last = 0), (this.peak = 0));
  }
}

const ul = (n) => Math.round(n * 1e3) / 1e3;

class y0 {
  sim;
  render;
  hud;
  audio;
  work;
  interval;
  steps;
  frames = 0;
  constructor(t = 240) {
    ((this.sim = new hl(t)),
      (this.render = new hl(t)),
      (this.hud = new hl(t)),
      (this.audio = new hl(t)),
      (this.work = new hl(t)),
      (this.interval = new hl(t)),
      (this.steps = new hl(t)));
  }
  frame(t, e, s, i, a, o, r) {
    (this.frames++,
      this.sim.push(t),
      this.render.push(e),
      this.hud.push(s),
      this.audio.push(i),
      this.work.push(a),
      this.steps.push(r),
      o > 0 && this.interval.push(o));
  }
  get fps() {
    const t = this.interval.avg;
    return t > 0 ? 1e3 / t : 0;
  }
  static summarize(t) {
    return {
      avg: ul(t.avg),
      p95: ul(t.percentile(0.95)),
      max: ul(t.max),
      peak: ul(t.peak),
      last: ul(t.last),
    };
  }
  snapshot() {
    return {
      fps: ul(this.fps),
      frames: this.frames,
      stepsPerFrame: ul(this.steps.avg),
      sim: y0.summarize(this.sim),
      render: y0.summarize(this.render),
      hud: y0.summarize(this.hud),
      audio: y0.summarize(this.audio),
      work: y0.summarize(this.work),
      interval: y0.summarize(this.interval),
    };
  }
  reset() {
    this.frames = 0;
    for (const t of [this.sim, this.render, this.hud, this.audio, this.work, this.interval, this.steps])
      t.reset();
  }
}

function $q(n, t, e) {
  const s = { ...n },
    i = {};
  for (const o of Object.keys(t)) {
    const r = t[o];
    r !== void 0 && (i[o] = r);
  }
  const a = { ...s, ...i };
  return {
    current: a,
    saved: s,
    update(o) {
      for (const r of Object.keys(o)) {
        const l = o[r];
        l !== void 0 && ((s[r] = l), delete i[r]);
      }
      (Object.assign(a, s, i), e({ ...s }));
    },
  };
}

const Gq = 650,
  Vq = 1100,
  Wq = 50,
  jq = /ResizeObserver loop/i;

function qq() {
  return ((Date.now() & 16777215) * 257 + Math.floor(Math.random() * 2147483647)) >>> 0;
}

function Xq() {
  _y();
  const n = Hq(location.search, location.hash);
  let t = document.getElementById("app");
  t || ((t = document.createElement("div")), (t.id = "app"), document.body.appendChild(t));
  const e = t,
    s = new y0(240),
    i = [];
  let a = "boot",
    o = null,
    r = { cancelled: !1 },
    l = 0,
    c = null,
    f = 0,
    d = !1,
    h = new AbortController(),
    u = null;
  const m = () => {
      const L = u;
      ((u = null), L?.());
    },
    x = (L) => {
      (m(), L.halt());
      let B = !1;
      const G = () => {
        if (!B) {
          ((B = !0), u === G && (u = null));
          try {
            L.dispose();
          } catch (et) {
            console.error(et);
          }
        }
      };
      u = G;
      const q = () => {
        typeof window.requestIdleCallback == "function"
          ? window.requestIdleCallback(G, { timeout: 1500 })
          : window.setTimeout(G, 0);
      };
      window.setTimeout(() => requestAnimationFrame(() => requestAnimationFrame(q)), Vq);
    },
    p = () => {
      if (!d) {
        try {
          location.reload();
        } catch {}
        return;
      }
      (l++, (r.cancelled = !0), c?.close(), (c = null));
      try {
        o?.dispose();
      } catch (L) {
        console.error(L);
      }
      o = null;
      try {
        (m(), h.abort(), q8(), zi());
      } catch (L) {
        console.error(L);
      }
      (e.replaceChildren(), P("title"));
    },
    g = (L, B) => {
      const G = o5(L);
      if (jq.test(G)) return;
      if ((i.length >= Wq && i.shift(), i.push(G), s1(), c)) {
        c.addDetail(G);
        return;
      }
      o?.setPause("error", !0);
      const q = [{ label: "重新开始", primary: !0, onClick: p }];
      (!B &&
        (!o || o.loop.running) &&
        q.push({
          label: o ? "继续游戏" : "继续",
          primary: !1,
          onClick() {
            ((c = null), o?.setPause("error", !1));
          },
        }),
        (c = R1(e, {
          title: "出了点状况",
          tone: "error",
          lines: [
            B
              ? "游戏遇到无法继续的错误。点击「重新开始」回到标题页。"
              : "游戏运行时出现了一个错误。可以尝试继续，或重新开始。",
          ],
          detail: G,
          buttons: q,
        })));
    };
  const isExtErr = (file, err) => {
    const text = `${file || ""}\n${(err && err.stack) || ""}`;
    return /(?:chrome|moz|safari|safari-web|edge)-extension:\/\//i.test(text);
  };
  (window.addEventListener("error", (L) => {
    if (isExtErr(L.filename, L.error)) return;
    (!L.error && !L.message) || g(L.error ?? L.message, !1);
  }),
    window.addEventListener("unhandledrejection", (L) => {
      if (isExtErr("", L.reason)) return;
      g(L.reason, !1);
    }));
  let y, v;
  try {
    Hf();
    const L = {};
    (n.quality && (L.quality = n.quality),
      n.showFps && (L.showFps = !0),
      n.autoBuy !== null && (L.autoBuy = n.autoBuy),
      n.tutorial !== null && (L.tutorial = n.tutorial),
      n.objectiveHints !== null && (L.objectiveHints = n.objectiveHints),
      (y = $q(yH({ quality: MI() }), L, vH)),
      (v = zT()));
  } catch (L) {
    (console.error(L),
      i.push(o5(L)),
      s1(),
      R1(e, {
        title: "启动失败",
        tone: "error",
        page: !0,
        lines: ["游戏初始化时出错，无法继续。请重新载入页面；若问题依旧，换用新版浏览器再试。"],
        detail: o5(L),
        buttons: [
          {
            label: "重新载入",
            primary: !0,
            onClick() {
              try {
                location.reload();
              } catch {}
            },
          },
        ],
      }));
    return;
  }
  d = !0;
  const _ = y.current,
    k = () => v.setVolumes({ master: _.masterVolume, sfx: _.sfxVolume, music: _.musicVolume });
  k();
  const M = new Set(),
    S = () => _,
    b = (L) => {
      (y.update(L), k());
      for (const B of M) B(L);
    },
    w = new Map(),
    T = (L) => {
      let B = w.get(L);
      if (B === void 0) {
        try {
          B = xB(L);
        } catch (G) {
          (console.warn(G), (B = ""));
        }
        w.set(L, B);
      }
      return B;
    },
    E = { getSettings: S, updateSettings: b, audio: v, portrait: T, createHeroPreview: gB },
    A = {
      get phase() {
        return a;
      },
      get world() {
        return o?.world ?? null;
      },
      get state() {
        return o?.state ?? null;
      },
      get renderer() {
        return o?.renderer ?? null;
      },
      get hud() {
        return o?.hud ?? null;
      },
      get loop() {
        return o?.loop ?? null;
      },
      get config() {
        return o?.config ?? null;
      },
      get session() {
        return o;
      },
      audio: v,
      perf: s,
      settings: _,
      params: n,
      get matches() {
        return f;
      },
      errors: i,
      restart: p,
    };
  window.__moba = A;
  const C = {
      app: e,
      audio: v,
      menuHost: E,
      perf: s,
      getSettings: S,
      updateSettings: b,
      onSettings(L) {
        return (M.add(L), () => M.delete(L));
      },
      portrait: T,
      onLoopError: (L) => {
        (console.error(L), g(L, !0));
      },
      setPhase(L) {
        a = L;
      },
    },
    R = (L) => new Promise((B) => window.setTimeout(B, L));
  async function I(L) {
    const B = ++l;
    r = { cancelled: !1 };
    const G = r;
    h = new AbortController();
    const q = h.signal;
    let et = L;
    for (;;) {
      let ct;
      if (et === "direct") ct = { heroId: n.hero ?? "chijin", skin: n.skin ?? null, difficulty: n.difficulty ?? "normal" };
      else if (((a = "menu"), (ct = await $H(e, E, { start: et, signal: q })), B !== l)) return;
      (m(), f++);
      const rt = await Uq(
        C,
        ct,
        { seed: n.seed ?? qq(), autoPlay: n.auto, speed: n.speed, fastLoad: et === "direct" },
        G,
      );
      if (B !== l) {
        rt?.dispose();
        return;
      }
      if (!rt) return;
      o = rt;
      const mt = await rt.finished;
      if (B !== l) return;
      if (mt.kind === "quit") {
        (x(rt), (o = null), (et = "title"));
        continue;
      }
      ((a = "result"), rt.disposeHud(), _.tutorial && !rt.config.autoPlay && b({ tutorial: !1 }));
      const nt = QH(e, mt.state, E, { signal: q });
      if ((await R(Gq), B !== l)) return;
      (x(rt), (o = null));
      const H = await nt;
      if (B !== l) return;
      et = H === "again" ? "select" : "title";
    }
  }
  function P(L) {
    I(L).catch((B) => {
      (console.error(B), g(B, !0));
    });
  }
  const F = () => {
    if (!Rq()) {
      ((a = "unsupported"),
        s1(),
        R1(e, {
          title: "无法启动星陨战纪",
          page: !0,
          lines: ["游戏需要 WebGL2 图形加速，但当前浏览器或设备没有提供。"],
          list: [
            "把浏览器更新到最新版本(Chrome、Edge、Safari 15 以上、Firefox 均可)",
            "在浏览器设置里开启「硬件加速」后重启浏览器",
            "关闭省电模式，或换一台设备再试",
          ],
          buttons: [{ label: "重新检测", primary: !0, onClick: F }],
        }));
      return;
    }
    if ((P(n.skipMenu ? "direct" : "title"), s1(), !n.skipMenu)) {
      const L = () => {
        T("chijin");
      };
      typeof window.requestIdleCallback == "function"
        ? window.requestIdleCallback(L, { timeout: 3e3 })
        : window.setTimeout(L, 1200);
    }
  };
  F();
}

Xq();