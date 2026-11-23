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
import { v0 } from './01-audio.js';
import { Se, kr } from './02-data.js';
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
import { $j, AW, Aj, Ba, CW, Cj, Cs, Dh, Fj, Gj, HW, Hm, Jj, Kj, Lj, O6, Oj, Pr, Qj, Uj, Va, Vj, Wj, Wm, Wn, Xj, YW, Yj, Zj, _o, am, aq, by, ds, eq, fW, fj, gS, hj, ia, iq, jW, jj, my, nS, oa, om, qj, sq, tq, tr, vS, wo, xS, yS, zW, zh } from './43-data-3.js';

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

tu("mushroom", {
  modifyBasicAttack(n, t, e, s) {
    Ss(e) || (am(t, "mushroom_passive") >= mP.hits - 1 && (s.bonusMagic += t.stats.maxHp * mP.hpRatio));
  },
  onBasicAttackHit(n, t, e) {
    if (Ss(e)) return;
    if (am(t, "mushroom_passive") >= mP.hits - 1) {
      (Va(n, t, "mushroom_passive"),
        ds(n, "hit_magic", e.pos, t.team, { unitId: t.id, targetId: e.id }),
        e.alive && tr(n, e, mP.slow, mP.slowDur, t, "mushroom_passive"));
      return;
    }
    Wn(n, t, "mushroom_passive", { duration: 1 / 0, maxStacks: mP.hits - 1, sourceId: t.id });
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
      r = oa(n, "damage", { ad: "adRatio" }),
      l = n.val("impactRadius"),
      c = n.val("tickInterval"),
      knocked = new Set(),
      foe = ia(e.team),
      hitOk = (u) => u.kind !== "tower" && u.kind !== "core" && foe(u);
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
            (wo(n, u, r, "physical"),
              u.id === d.id && !knocked.has(u.id) && (knocked.add(u.id), yS(t, u, n.val("knockup"), e)));
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
      if (!e.alive || !d || d.anim !== "roll") return;
      const h = t.state.time - f0;
      if (h >= s) return void iu(t, e, "arrived");
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
            for (const x of $j(t, e.pos, u.dir, n.range, n.angle, ia(e.team)))
              (wo(n, x, a, "magic"), tr(t, x, o, r, e, "mushroom_s2"));
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
      o = { x: n.targetPos.x, y: n.targetPos.y };
    (Wn(t, e, "unstoppable", {
      duration: s + i + 0.1,
      sourceId: e.id,
      key: "mushroom_ult",
      merge: "replace",
    }),
      ds(t, "mushroom_ult_charge", a, e.team, { unitId: e.id }),
      vS(t, e, "channel", s, !1),
      Zo(t, { visual: "telegraph", owner: e, pos: o, radius: n.radius, duration: s + i }),
      t.schedule(s, () => {
        e.alive &&
          fW(t, e, o.x, o.y, i, (r) => {
            if (r !== "arrived" || !e.alive) return;
            const l = Cs(e.pos),
              c = oa(n, "damage", { hp: "hpRatio" });
            ds(t, "mushroom_ult_land", l, e.team, { unitId: e.id, radius: n.radius });
            for (const f of Pr(t, l, n.radius, ia(e.team))) (wo(n, f, c, "magic"), yS(t, f, n.val("knockup"), e));
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
    const o = [s, ...kr.filter((c) => c !== s).slice(0, 4)];
    for (const c of [0, 1])
      o.forEach((f, d) => {
        const h = KV(this, c * 5 + d, c, f, c === 0 && d === 0);
        (this.addUnit(h),
          this.heroes.push(h),
          (this.state.teams[c].gold += h.goldEarned),
          h.isPlayer && (this.state.playerId = h.id));
      });
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
  const r = XH(i, t, n.menuHost),
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
    if ((r.setProgress(dl.world, "集结双方英雄…"), await zc(), p())) return null;
    const g = {
        seed: e.seed,
        playerHero: t.heroId,
        difficulty: t.difficulty,
        autoPlay: e.autoPlay,
        autoBuy: n.getSettings().autoBuy,
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
  (window.addEventListener("error", (L) => {
    (!L.error && !L.message) || g(L.error ?? L.message, !1);
  }),
    window.addEventListener("unhandledrejection", (L) => g(L.reason, !1)));
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
      if (et === "direct") ct = { heroId: n.hero ?? "chijin", difficulty: n.difficulty ?? "normal" };
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