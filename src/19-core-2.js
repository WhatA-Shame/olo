// 19-core-2.js — core｜35 个顶层语句｜59KB
// 对应 game.pretty.js 第 36390–38373 行
// 关键内容：
//   DP                    monster
//   zP                    frost_golem
//   FP                    abyss_drake
//   HP                    hero
//   t8                    self
//   _x                    direction
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { Se } from './02-data.js';
import { Fa, Lt, W, Xt, oe, qe, sn, ws } from './17-three-8.js';
import { $n, CP, F0, H0, Ha, Hh, IP, L0, LP, Lr, Mm, Mt, Ni, Nn, O1, Of, QM, RP, U0, U1, bn, gP, gf, jo, km, le, qo, tf, vs, vx, wm, xx, yx } from './18-core.js';

const DP = (n, t) => {
  const e = t.pos.x,
    s = t.pos.y,
    i = n.anchors.unit(t.unitId ?? -1),
    a = i && i.kind === "monster" ? i.monsterType : null,
    o = i ? i.radius : 0.9,
    r = t.unitId ?? -1,
    l = n.rnd,
    c = n.anchor(r) ? n.a.height : 2;
  switch ((RP(n, a ?? "mossback", e, c * 0.6, s), a)) {
    case "frost_golem": {
      (Ni(n, e, 0.2, s, 4, o, 1.6, W.frostHot, W.frostDeep, 0.9),
        n.after(1, () => {
          const f = n.particles.use(Mt.frost);
          for (let d = 0; d < n.n(14); d++)
            f.spawn(
              e + l.signed() * o,
              l.range(0.6, 2.2),
              s + l.signed() * o,
              l.signed() * 2.5,
              l.range(0.5, 2.5),
              l.signed() * 2.5,
              l.range(0.7, 1.1),
              0.34,
              0.12,
              l.range(0, 0.7),
            );
          U0(n, e, 1.4, s, 10, 4, 4, W.frostHot, W.frost, 0.22);
        }),
        n.after(1.6, () => {
          (vs(n, e, 1.2, s, 1.6, W.frostHot, W.frost, 0, 0, 4, le.flashSkill, 3),
            n.decals
              .add(Xt.sigil, e, s, o + 0.8, 0.8)
              .params(0, 0.6)
              .color(W.frost, 1.3, 0.9)
              .under(W.shadow, 0.2));
        }));
      break;
    }
    case "ember_golem": {
      const f = n.particles.use(Mt.flame);
      for (let d = 0; d < n.n(10); d++)
        f.spawn(
          e + l.signed() * 0.4,
          l.range(2.2, 3),
          s + l.signed() * 0.4,
          l.signed() * 1.2,
          l.range(3, 6),
          l.signed() * 1.2,
          l.range(0.35, 0.6),
          1,
          0.5,
          l.range(0, 0.35),
        );
      (gf(n, e, 2.4, s, 16, 0.6, 3, W.emberHot, W.ember, 1.3, 0.18),
        n.after(1.3, () => {
          (Ni(n, e, 0.3, s, 4, o, 1.8, W.smoke, W.smokeDark, 1.3),
            gf(n, e, 0.8, s, 8, o, 1.2, W.emberHot, W.ember, 1.2, 0.14),
            F0(n, e, s, 5, 2.5, 4, o * 0.5, W.smokeDark, W.smoke, 0.24));
        }),
        n.after(1, () =>
          n.decals
            .add(Xt.scorch, e, s, o + 0.6, 2.4)
            .color(W.ember, 1.3)
            .under(W.shadow, 0.7),
        ));
      break;
    }
    case "mossback": {
      (Ni(n, e, 0.2, s, 3, o, 1.2, W.dust, W.dustDark, 0.8),
        n.after(0.6, () => {
          const f = n.particles.use(Mt.glint).tint(W.spore, W.poisonDeep);
          for (let h = 0; h < n.n(14); h++)
            f.spawn(
              e + l.signed() * 0.6,
              l.range(0.6, 1.2),
              s + l.signed() * 0.6,
              l.signed() * 0.8,
              l.range(0.4, 1.2),
              l.signed() * 0.8,
              l.range(1, 1.6),
              0.26,
              0.1,
              l.range(0, 0.4),
            );
          const d = n.particles.use(Mt.broadleaf);
          for (let h = 0; h < n.n(4); h++)
            d.spawn(e, 0.9, s, l.signed() * 2, l.range(1.5, 3), l.signed() * 2, l.range(0.8, 1.1), 0.3, 0.26);
        }));
      break;
    }
    case "glimwing": {
      n.after(0.7, () => {
        const f = n.particles.use(Mt.scale).tint(W.moth, W.magicDeep);
        for (let d = 0; d < n.n(10); d++)
          f.spawn(
            e + l.signed() * 0.7,
            l.range(0.2, 0.6),
            s + l.signed() * 0.7,
            l.signed() * 0.8,
            l.range(0.6, 1.6),
            l.signed() * 0.8,
            l.range(0.8, 1.2),
            0.2,
            0.08,
          );
        jo(n, e, 0.5, s, 6, 1.4, W.moth, W.magicDeep, 0.9, 0.22);
      });
      break;
    }
    case "abyss_drake": {
      (n.after(0.6, () => {
        const f = n.anchors.attach?.(r, "crest", Nn),
          d = f ? Nn.x : e,
          h = f ? Nn.y : 4,
          u = f ? Nn.z : s;
        (vs(n, d, h, u, 2.6, W.violetHot, W.violet, 0, 0, 10, le.flashBig, 8),
          U0(n, d, h, u, 10, 6, 5, W.violetHot, W.violet, 0.26),
          n.light(d, u, h, W.violet, 6, 10, le.lightDur));
      }),
        n.after(1.7, () => {
          (tf(n, e + l.signed() * 1.5, s + l.signed() * 1.5, 2.2, 14), n.shake(0.2, e, s));
        }),
        n.after(2, () => {
          const f = n.particles.use(Mt.scale).tint(W.violetHot, W.abyssCyan);
          for (let d = 0; d < n.n(26); d++)
            f.orbit(
              e + l.signed() * 2.5,
              l.range(0.3, 1.6),
              s + l.signed() * 2.5,
              l.range(0.1, 0.6),
              l.range(0.2, 0.8),
              l.next() * oe,
              l.range(1, 3),
              l.range(1.5, 3),
              l.range(1, 1.4),
              0.22,
              0.08,
              l.range(0, 1),
            );
          jo(n, e, 1.5, s, 10, 2.5, W.abyssCyan, W.violet, 1.2, 0.3);
        }));
      break;
    }
    case "star_colossus": {
      for (let f = 0; f < 3; f++)
        n.after(f * 0.3, () => {
          const d = l.next() * oe;
          (n.glow
            .spawn(qe.hoop, sn.hoop, 0.9)
            .at(e, 4.2, s)
            .vel(Math.cos(d) * 6, 4, Math.sin(d) * 6, 9)
            .scale(2.2, 1.6)
            .rot(l.next(), l.next() * 3, l.next())
            .spin(3, 2, 4)
            .color(W.gold, 1.4, 0.9)
            .fade(0.02, 0.6)
            .opt(0.4, 2, 1),
            H0(n, e, 4.2, s, 6, 7, W.goldHot, W.gold));
        });
      (n.after(1.1, () => {
        (tf(n, e - 2, s + 1, 2.4, 16), tf(n, e + 2, s - 1, 2.4, 16), n.shake(0.3, e, s));
      }),
        n.after(2.6, () => {
          (n.glow
            .spawn(qe.sphere, sn.core, 0.9)
            .at(e, 3, s)
            .vel(0, 6, 0)
            .scale(0.6, 1.2)
            .color(W.goldHot, 1.8, 1)
            .fade(0.05, 0.5)
            .opt(0.7, 1.4, 1),
            n.after(0.8, () => {
              vs(n, e, 7.5, s, 3, W.goldHot, W.gold, 0, 0, 10, le.flashBig, 10);
              const f = n.particles.use(Mt.star8);
              for (let d = 0; d < n.n(28); d++) {
                const h = l.next() * oe,
                  u = Math.sqrt(l.next()) * 6;
                f.spawn(
                  e + Math.cos(h) * u,
                  l.range(6, 9),
                  s + Math.sin(h) * u,
                  l.signed() * 0.6,
                  -l.range(2.5, 4.5),
                  l.signed() * 0.6,
                  l.range(1.4, 2),
                  0.36,
                  0.14,
                  l.range(0, 0.6),
                );
              }
            }));
        }));
      break;
    }
    default:
      Ni(n, e, 0.3, s, 5, o, 1.3, W.dust, W.dustDark, 1);
      break;
  }
};

function zP(n, t, e, s) {
  const i = n.rnd;
  switch (s) {
    case "frost_golem": {
      n.decals.add(Xt.sigil, t, e, 3.2, 1.4).params(0, 0.3).color(W.frost, 1.4, 0.95).under(W.shadow, 0.25);
      const a = n.particles.use(Mt.puff).tint(W.frostHot, W.frost);
      for (let r = 0; r < n.n(10); r++) {
        const l = i.next() * oe;
        a.spawn(
          t + Math.cos(l) * 1.2,
          0.4,
          e + Math.sin(l) * 1.2,
          Math.cos(l) * 1.2,
          i.range(0.2, 0.8),
          Math.sin(l) * 1.2,
          i.range(1, 1.4),
          1.2,
          3,
          i.range(0, 0.3),
        );
      }
      const o = n.particles.use(Mt.frost);
      for (let r = 0; r < n.n(12); r++)
        o.orbit(
          t,
          0.2,
          e,
          2.4,
          0.8,
          i.next() * oe,
          2,
          i.range(0.8, 2.2),
          i.range(0.8, 1.2),
          0.3,
          0.1,
          i.range(0, 0.4),
        );
      break;
    }
    case "ember_golem": {
      (n.decals.add(Xt.cracks, t, e, 3, 1.6).params(0, 0.6).color(W.ember, 1.5).under(W.shadow, 0.7),
        F0(n, t, e, 12, 3, 7, 1.2, W.smokeDark, W.smoke, 0.32),
        gf(n, t, 0.3, e, 12, 1.4, 2.4, W.emberHot, W.ember, 1, 0.16),
        Ni(n, t, 0.3, e, 5, 1.2, 1.8, W.dust, W.smoke, 1));
      break;
    }
    case "mossback": {
      (F0(n, t, e, 8, 2.2, 4, 0.5, W.dust, W.dustDark, 0.24),
        Ni(n, t, 0.2, e, 4, 0.5, 1.4, W.dust, W.dustDark, 0.9));
      break;
    }
    case "glimwing": {
      const a = n.particles.use(Mt.glint).tint(W.amber, W.moth);
      for (let o = 0; o < n.n(16); o++)
        a.orbit(t, 3.5 - o * 0.15, e, 1.6 - o * 0.06, 0.2, o * 0.7, 3, -1.5, 0.9, 0.3, 0.08, o * 0.05);
      break;
    }
    case "abyss_drake": {
      (n.decals
        .add(Xt.swirl, t, e, 5.5, 1.3)
        .params(4, -2.5)
        .color(W.abyssCyan, 1.3, 0.9)
        .under(W.violetDeep, 0.6),
        n.after(1, () => {
          (tf(n, t, e, 3.2, 26),
            n.glow
              .spawn(qe.pillar, sn.pillar, 0.7)
              .at(t, 0, e)
              .scale3(1.6, 2, 1.6, 2.4, 7, 2.4)
              .color(W.abyssCyan, 1, 0.6)
              .fade(0.05, 0.4)
              .opt(0.25, 1.2, 1),
            bn(n, t, e, 6, 0.6, W.abyssCyan, 1.4, 0.15, 0.3));
        }),
        n.after(1.8, () => n.shake(0.3, t, e)));
      break;
    }
    case "star_colossus": {
      n.decals
        .add(Xt.telegraph, t, e, 4, 1.05)
        .y(0.09)
        .color(W.gold, 1.5, 0.9)
        .under(W.violetDeep, 0.4)
        .params(0.5);
      const a = t + 6,
        o = e - 4,
        r = n.ribbons.start($n.fire, a, 22, o, W.goldHot, W.gold),
        l = n.glow.hold(qe.sphere, sn.core);
      (l.color(W.goldHot, 1.8, 1), (l.add = 0.8), (l.k = 1.3), l.scale(0.8));
      let c = 0;
      const f = () => {
        c += n.dt;
        const d = Math.min(1, c / 1),
          h = a + (t - a) * d,
          u = 22 * (1 - d * d),
          m = o + (e - o) * d;
        if ((l.at(h, u, m), r >= 0 && n.ribbons.move(r, h, u, m), d < 1)) n.after(0, f);
        else {
          (n.glow.release(l),
            n.ribbons.end(r),
            vs(n, t, 1, e, 4, W.goldHot, W.gold, 0, 0, 14, le.flashBig, 12),
            Hh(n, t, 0.5, e, 1, 6, 0.5, W.gold, 1.4, 0.7),
            tf(n, t, e, 3.6, 30));
          const x = n.particles.use(Mt.puff).tint(W.white, W.frost);
          for (let p = 0; p < n.n(10); p++)
            x.spawn(
              t + i.signed() * 2,
              0.4,
              e + i.signed() * 2,
              i.signed() * 1.5,
              i.range(1.5, 3),
              i.signed() * 1.5,
              i.range(1.2, 1.8),
              1.6,
              3.6,
              i.range(0, 0.3),
            );
          (n.light(t, e, 3, W.gold, le.lightMax, 14, le.lightDur), n.shake(le.shakeEpic, t, e));
        }
      };
      n.after(0, f);
      break;
    }
    default:
      Ha(n, t, e, 6, 0.4, 2.5, W.dust, W.dustDark, 1.1, 0.9);
  }
}

function NP(n, t, e, s, i, a, o, r, l) {
  const c = n.ribbons.start($n.energy, e, s, i, o, r);
  c >= 0 && n.ribbons.setWidth(c, 1.4);
  const f = n.rnd.signed() * 2.5;
  n.track(
    t,
    a,
    (d, h) => {
      const u = h * h * (3 - 2 * h),
        m = d.x,
        x = d.z,
        p = d.y + d.height * 0.55,
        g = -(x - i),
        y = m - e,
        v = Math.hypot(g, y) || 1,
        _ = Math.sin(h * Math.PI) * f,
        k = e + (m - e) * u + (g / v) * _,
        M = i + (x - i) * u + (y / v) * _,
        S = s + (p - s) * u + Math.sin(h * Math.PI) * 3;
      (c >= 0 && n.ribbons.move(c, k, S, M),
        n.rnd.next() < 0.5 &&
          n.particles.use(Mt.glint).tint(o, r).spawn(k, S, M, 0, 0.3, 0, 0.35, 0.28, 0.06));
    },
    () => {
      (n.ribbons.end(c), l());
    },
  );
}

function FP(n, t, e, s, i, a) {
  const o = Fa(s);
  if (i === "abyss_drake") {
    (Lr(n, t, e, 0.5, 7, 0.9, W.violet, 1.3, 0.6),
      bn(n, t, e, 6, 0.8, W.abyssCyan, 1.4, 0.1, 0.25),
      n.light(t, e, 3, W.violet, 6, 12, le.lightDur));
    let r = 0;
    for (const l of a.heroes) {
      if (l.team !== s || !l.alive || n.focusDist(l.pos.x, l.pos.y) > 46) continue;
      const c = l.id;
      (n.after(0.15 + r * 0.08, () =>
        NP(n, c, t, 3, e, 0.8, W.violetHot, W.abyssCyan, () => {
          if (!n.anchor(c)) return;
          const f = n.a.radius;
          (n.decals
            .add(Xt.sigil, n.a.x, n.a.z, f * 2.1 + 0.5, 1.2)
            .params(3, 0.3)
            .color(W.violet, 1.6, 1)
            .under(W.violetDeep, 0.35)
            .follow(c),
            vs(
              n,
              n.a.x,
              n.a.y + n.a.height * 0.5,
              n.a.z,
              1.6,
              W.violetHot,
              W.violet,
              0,
              0,
              4,
              le.flashSkill,
              4,
            ),
            n.anchors.flashRim?.(c, 1.5));
          const d = n.particles.use(Mt.coin),
            h = n.particles.use(Mt.glint).tint(W.goldHot, W.abyssCyan);
          for (let u = 0; u < n.n(8); u++) {
            const m = n.rnd.next() * oe,
              x = f + n.rnd.range(0.1, 0.6);
            (u % 2 === 0 ? d : h).orbit(
              n.a.x,
              n.a.y + 0.2,
              n.a.z,
              x,
              x * 0.6,
              m,
              2.5,
              n.rnd.range(1.5, 2.6),
              n.rnd.range(0.8, 1.1),
              0.26,
              0.14,
              u * 0.06,
            );
          }
        }),
      ),
        r++);
    }
    return;
  }
  (Lr(n, t, e, 0.7, 9, 1, W.gold, 1.3, 0.6),
    bn(n, t, e, 9, 0.9, o.glow, 1.4, 0.08, 0.25),
    n.light(t, e, 4, W.gold, le.lightMax, 16, le.lightDur));
  for (const r of a.heroes) {
    if (r.team !== s || !r.alive || n.focusDist(r.pos.x, r.pos.y) > 46) continue;
    const l = r.id;
    n.after(0.3 + n.rnd.next() * 0.3, () => {
      if (!n.anchor(l)) return;
      const c = n.a.x,
        f = n.a.z,
        d = n.a.radius;
      (n.decals
        .add(Xt.star, c, f, d * 2.1 + 0.6, 1.2)
        .params(8, 2.2)
        .color(W.gold, 1.5, 0.95)
        .under(W.shadow, 0.25)
        .follow(l),
        n.decals
          .add(Xt.sigil, c, f, d * 2.1 + 0.4, 1)
          .params(2, 0.4)
          .color(W.gold, 1.5, 1)
          .under(W.shadow, 0.3)
          .follow(l));
      const h = n.particles.use(Mt.star8);
      for (let u = 0; u < n.n(10); u++)
        h.spawn(
          c + n.rnd.signed() * 1.2,
          n.rnd.range(4, 6),
          f + n.rnd.signed() * 1.2,
          0,
          -n.rnd.range(3.5, 5),
          0,
          n.rnd.range(0.7, 1),
          0.32,
          0.16,
          u * 0.05,
        );
    });
  }
}

const UP = { monster_slain: DP, drake_breath_warn: LP, drake_breath: IP },
  OP = 28,
  BP = 1.2;

class HP {
  k;
  states = new Map();
  stamp = 0;
  constructor(t) {
    this.k = t;
  }
  update(t) {
    const e = this.k,
      s = e.ctx.terrain,
      i = ++this.stamp,
      a = t.playerTeam;
    for (const o of t.state.units) {
      if (
        !o.alive ||
        (o.kind !== "hero" && o.kind !== "monster" && o.kind !== "minion") ||
        (o.team !== a && o.team !== 2 && !o.visible[a]) ||
        e.focusDist(o.pos.x, o.pos.y) > OP
      )
        continue;
      let r = this.states.get(o.id);
      if (
        (r || ((r = { ripple: 0, bush: o.bushId, anim: o.anim, seen: i }), this.states.set(o.id, r)),
        (r.seen = i),
        !e.anchor(o.id))
      )
        continue;
      const l = e.a.x,
        c = e.a.z,
        f = e.a.radius,
        d = Math.abs(o.pos.x - o.prevPos.x) + Math.abs(o.pos.y - o.prevPos.y) > 0.001,
        h = s.inWater(l, c),
        u = f >= BP || (o.kind === "hero" && o.heroId === "panyue");
      if (
        (r.anim !== o.anim &&
          ((r.anim === "dash" || r.anim === "leap" || r.anim === "airborne") &&
            o.anim !== "dash" &&
            o.anim !== "leap" &&
            (h
              ? tf(e, l, c, Math.max(1.2, f * 2), u ? 16 : 9)
              : u && Ha(e, l, c, 8, f * 0.6, 2.6, W.dust, W.dustDark, 1 + f * 0.3, 0.7)),
          (r.anim = o.anim)),
        h && e.now >= r.ripple)
      ) {
        const m = f * 2.2 + 0.6;
        if (
          (e.particles
            .use(Mt.ripple)
            .tint(W.white, W.frost)
            .spawn(l, s.waterLevel + 0.03, c, 0, 0, 0, d ? 0.7 : 1.1, m * 0.5, m * (d ? 1.6 : 1.3)),
          d && (o.anim === "dash" || u))
        ) {
          const x = e.particles.use(Mt.droplet);
          for (let p = 0; p < e.n(3); p++) {
            const g = e.rnd.next() * oe;
            x.spawn(
              l + Math.cos(g) * f,
              s.waterLevel + 0.1,
              c + Math.sin(g) * f,
              Math.cos(g) * 1.5,
              e.rnd.range(2, 3.5),
              Math.sin(g) * 1.5,
              0.45,
              0.12,
              0.08,
            );
          }
        }
        r.ripple = e.now + (d ? (o.anim === "dash" ? 0.12 : 0.25) : 1.2);
      }
      if (o.kind === "hero" && r.bush !== o.bushId) {
        const m = l,
          x = c,
          p = e.particles.use(Mt.broadleaf);
        for (let g = 0; g < e.n(6); g++) {
          const y = e.rnd.next() * oe;
          p.spawn(
            m + Math.cos(y) * f * 0.8,
            e.rnd.range(0.4, 1.1),
            x + Math.sin(y) * f * 0.8,
            Math.cos(y) * e.rnd.range(1, 2.4),
            e.rnd.range(1.5, 3),
            Math.sin(y) * e.rnd.range(1, 2.4),
            e.rnd.range(0.6, 0.9),
            0.26,
            0.2,
          );
        }
        r.bush = o.bushId;
      }
    }
    if ((i & 31) === 0) for (const [o, r] of this.states) i - r.seen > 60 && this.states.delete(o);
  }
  reset() {
    this.states.clear();
  }
}

function $0(n, t, e = 0.5, s = 1) {
  return n.anchor(t) ? n.a.y + n.a.height * e : s;
}

function bo(n, t) {
  return n.unitId === t.playerId || n.targetId === t.playerId;
}

function t8(n) {
  return n.cast.type === "self" ? n.cast.radius : n.cast.range;
}

function _x(n) {
  return n.cast.type === "direction" ? n.cast.width : 1;
}

function Nr(n, t) {
  const e = n.values[t];
  return typeof e == "number" ? e : e ? e[0] : 0;
}

const cs = ws.chijin,
  zb = Se.chijin.skills.s2,
  $P = Se.chijin.skills.ult,
  ba = Lt(16760928),
  e8 = 1.45,
  n8 = 2.6;

function wx(n, t, e, s, i, a, o, r, l, c, f) {
  return QM(n, t, e, s, i, a, o, cs.glow, ba, r, l, c, e8, f, n8);
}

function s8(n, t, e, s, i, a, o, r, l, c) {
  const f = qo(n, t, e, s, i, a, o, cs.glow, e8, l, !1, 0.8);
  f.k = r / U1;
  const d = qo(n, t, e + 0.04, s, i, a * 1.03, o * 0.7, ba, n8 * 0.8, l, !1, 0.7);
  ((d.k = r / U1), c.push(f, d));
}

function GP(n, t, e, s, i, a, o, r) {
  const l = n.rnd,
    c = n.n(r),
    f = Math.sign(a - i) || 1;
  for (let d = 0; d < c; d++) {
    const h = (d + l.next()) / c,
      u = i + (a - i) * h,
      m = s * l.range(0.7, 0.98),
      x = t + Math.cos(u) * m,
      p = e + Math.sin(u) * m,
      g = -Math.sin(u) * f,
      y = Math.cos(u) * f,
      v = h * o;
    (n.particles
      .use(Mt.dust)
      .spawn(
        x,
        0.2,
        p,
        g * 2.2 + Math.cos(u) * 1.2,
        l.range(0.6, 1.6),
        y * 2.2 + Math.sin(u) * 1.2,
        l.range(0.45, 0.7),
        0.6,
        1.3,
        v,
      ),
      d % 2 === 0 &&
        n.particles
          .use(Mt.spark)
          .tint(ba, cs.deep)
          .spawn(
            x,
            l.range(0.3, 0.9),
            p,
            g * l.range(5, 9),
            l.range(1, 3.5),
            y * l.range(5, 9),
            0.26,
            0.11,
            0.04,
            v,
          ));
  }
}

const VP = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      a = $0(n, t.targetId, 0.5, 1);
    let o = 0;
    n.anchor(t.unitId) && (o = Math.atan2(i - n.a.z, s - n.a.x));
    const r = Math.cos(o),
      l = Math.sin(o);
    (wx(n, s - r * 1.75, a + 0.35, i - l * 1.75 + 0.55, o, 2, 0.26, 2.1, Math.PI / 2 - 0.45, !1),
      vs(n, s, a, i, 1.7, ba, cs.deep, r, l, 9, le.flashSkill, 10),
      O1(n, s, a - 0.2, i, 8, 8, ba, cs.deep, r, l, 0.5),
      n.decals
        .add(Xt.streak, s + r * 0.4, i + l * 0.4, 1.3, 0.5)
        .rot(o, 0.16)
        .params(0, 0)
        .color(cs.glow, 1.6)
        .under(cs.dark, 0.6),
      bn(n, s, i, 1.3, 0.26, cs.glow, 1.3, 0.25, 0.25),
      bo(t, e) && n.shake(0.1, s, i));
  },
  WP = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      a = t.dir?.x ?? 1,
      o = t.dir?.y ?? 0,
      r = Math.atan2(o, a),
      l = t.radius ?? 5.5,
      c = t.angle ?? 1.92,
      f = c / 2,
      d = n.rnd;
    (n.decals.add(Xt.cone, s, i, l, 0.6).rot(r).params(f, 0.35).color(cs.glow, 1.8).under(cs.dark, 0.4),
      wx(n, s, 1, i, r, l, 0.34, c, 0.06, !0),
      GP(n, s, i, l, r + f, r - f, 0.13, 14));
    const h = n.particles.use(Mt.streak).tint(W.white, cs.hot),
      u = n.n(6);
    for (let m = 0; m < u; m++) {
      const x = d.next(),
        p = r + f - c * x,
        g = l * d.range(0.55, 0.9);
      h.spawn(
        s + Math.cos(p) * g,
        d.range(0.6, 1.5),
        i + Math.sin(p) * g,
        Math.sin(p) * 11,
        d.signed() * 0.6,
        -Math.cos(p) * 11,
        0.14,
        0.1,
        0.03,
        x * 0.12,
      );
    }
    (n.particles
      .use(Mt.hitFlash)
      .tint(W.white, ba)
      .spawn(s + a * 1.1, 1.1, i + o * 1.1, 0, 0, 0, le.flashSkill, 1, 1.7),
      n.light(s + a * l * 0.5, i + o * l * 0.5, 1.5, cs.glow, 7, l * 1.6, 0.3),
      n.shake(bo(t, e) ? le.shakeSkill : 0.06, s, i));
  },
  jP = (n, t, e) => {
    const s = t.from ?? t.pos,
      i = t.to ?? t.pos;
    let a = i.x - s.x,
      o = i.y - s.y;
    const r = Math.hypot(a, o) || 0.01;
    ((a /= r), (o /= r));
    const l = Math.atan2(o, a),
      c = r / Nr(zb, "dashSpeed"),
      f = t.unitId ?? -1,
      d = n.rnd,
      h = n.particles.use(Mt.dust);
    for (let u = 0; u < n.n(5); u++)
      h.spawn(
        s.x + d.signed() * 0.4,
        d.range(0.1, 0.5),
        s.y + d.signed() * 0.4,
        -a * d.range(2, 5) + d.signed(),
        d.range(0.4, 1.6),
        -o * d.range(2, 5) + d.signed(),
        d.range(0.45, 0.75),
        0.6,
        1.4,
      );
    (n.decals
      .add(Xt.streak, (s.x + i.x) / 2, (s.y + i.y) / 2, r / 2 + 0.4, 0.6)
      .rot(l, (_x(zb) * 0.4) / (r / 2 + 0.4))
      .params(0.6, 0.6 / c)
      .color(cs.glow, 1.5, 0.85)
      .under(cs.dark, 0.45),
      n.anchor(f) &&
        (n.trail(f, $n.dust, c + 0.05, 0.45), n.trail(f, $n.energy, c + 0.06, 1.2, ba, cs.deep)));
    for (let u = 0; u < 3; u++) {
      const m = 0.28 + u * 0.26,
        x = s.x + a * r * m,
        p = s.y + o * r * m,
        g = [];
      wx(n, x - a * 0.7, 1.05, p - o * 0.7, l, 1.35, 0.3, 1.9, (u % 2 === 0 ? 1 : -1) * 1.05, u % 2 === 1, g);
      for (const y of g) y.delay(m * c);
      O1(n, x, 0.9, p, 2, 6, ba, cs.deep, a, o, 0.6);
    }
    (n.after(c, () => {
      (n.particles.use(Mt.hitFlash).tint(W.white, ba).spawn(i.x, 1, i.y, 0, 0, 0, le.flashBasic, 0.9, 1.4),
        O1(n, i.x, 0.8, i.y, 5, 7, ba, cs.deep, a, o, 0.5));
      const u = n.particles.use(Mt.dust);
      for (let m = 0; m < n.n(3); m++)
        u.spawn(
          i.x + d.signed() * 0.3,
          0.2,
          i.y + d.signed() * 0.3,
          a * d.range(1, 3),
          d.range(0.4, 1.2),
          o * d.range(1, 3),
          0.5,
          0.6,
          1.3,
        );
    }),
      t.unitId === e.playerId && n.shake(0.08, s.x, s.y));
  },
  qP = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      a = t8($P),
      o = t.unitId ?? -1,
      r = n.anchor(o),
      l = n.rnd;
    (bn(n, s, i, a, 0.42, cs.glow, 1.9, 0.12, 0.4), Ha(n, s, i, 12, 0.8, 6.5, W.dust, W.dustDark, 1.3, 0.7));
    const c = n.particles.use(Mt.streak).tint(W.white, cs.hot),
      f = n.n(12);
    for (let h = 0; h < f; h++)
      c.orbit(
        s,
        l.range(0.3, 1.6),
        i,
        a * l.range(0.15, 0.3),
        a * l.range(0.8, 1.05),
        l.next() * oe,
        -8,
        l.range(0, 1),
        l.range(0.26, 0.36),
        0.14,
        0.04,
      );
    const d = r && n.a.unit ? n.a.unit.facing : 0;
    for (let h = 0; h < 2; h++) {
      const u = [];
      s8(n, r ? 0 : s, 1 + h * 0.3, r ? 0 : i, d + h * Math.PI, a * 0.75, 0.4, 1.9, h === 0 ? 0.1 : -0.1, u);
      for (const m of u)
        (m
          .spin(0, 13, 0)
          .scale(a * 0.35, a * 0.95)
          .fade(0.1, 0.5),
          r && m.follow(o));
    }
    (n.particles.use(Mt.hitFlash).tint(W.white, ba).spawn(s, 1.2, i, 0, 0, 0, le.flashBig, 1.6, 2.6),
      O1(n, s, 1, i, 10, 9, ba, cs.deep),
      n.light(s, i, 1.8, cs.glow, le.lightMax, 10, 0.35),
      n.shake(bo(t, e) ? 0.3 : 0.15, s, i));
  },
  XP = (n, t) => {
    const e = t.pos.x,
      s = t.pos.y,
      i = t.radius ?? 4.2,
      a = n.rnd,
      o = t.unitId ?? -1,
      r = n.anchor(o),
      l = n.decals.add(Xt.ring, e, s, i, 0.3).params(0.55, 1).color(cs.glow, 1.2, 0.7).under(cs.dark, 0.2);
    r && l.follow(o);
    const c = a.next() * oe;
    for (let h = 0; h < 2; h++) {
      const u = [];
      s8(
        n,
        r ? 0 : e,
        0.95 + h * 0.4,
        r ? 0 : s,
        c + h * Math.PI,
        i * 0.97,
        0.32,
        2,
        h === 0 ? 0.1 : -0.1,
        u,
      );
      for (const m of u) (m.spin(0, 15, 0).fade(0.12, 0.45), r && m.follow(o));
    }
    const f = n.particles.use(Mt.spark).tint(ba, cs.deep),
      d = n.n(8);
    for (let h = 0; h < d; h++) {
      const u = a.next() * oe,
        m = i * a.range(0.8, 1);
      f.spawn(
        e + Math.cos(u) * m,
        a.range(0.5, 1.5),
        s + Math.sin(u) * m,
        Math.sin(u) * a.range(6, 10),
        a.range(0.5, 3),
        -Math.cos(u) * a.range(6, 10),
        a.range(0.2, 0.3),
        0.12,
        0.04,
      );
    }
  },
  YP = {
    chijin_passive_hit: VP,
    chijin_s1_slash: WP,
    chijin_s2_dash: jP,
    chijin_ult_start: qP,
    chijin_ult_tick: XP,
    niumo_s1_slash: NQ,
    niumo_s2_spray: NS,
    niumo_ult_start: NU,
    niumo_burst: NB,
  },
  di = ws.fengling,
  KP = Se.fengling.skills.s2;

const nc = ws.niumo,
  nWarm = Lt(0xffe6b0); // 火焰芯的暖白：贴花颜色必须是 Lt() 对象，写裸十六进制会变成 NaN → 整块面片渲染成黑方块
// 牛魔·烈焰斩：一条窄长的火焰斩击（刀光 + 地面焦痕 + 火舌 + 火星）
function NQ(n, t, e) {
  const s = t.pos.x,
    i = t.pos.y,
    a = t.dir?.x ?? 1,
    o = t.dir?.y ?? 0,
    r = Math.atan2(o, a),
    l = t.radius ?? 7,
    c = Math.min(1.1, Math.max(0.5, t.angle ?? 0.55)),
    f = c * 0.5,
    d = n.rnd;
  (n.decals
    .add(Xt.cone, s, i, l, 0.6)
    .rot(r)
    .params(f, 0.28)
    .color(nc.glow, 2.8)
    .under(nc.dark, 0.6),
    n.decals
      .add(Xt.cone, s, i, l * 0.96, 0.5)
      .rot(r)
      .params(f * 0.72, 0.12)
      .color(nc.hot, 2.4),
    n.decals
      .add(Xt.cone, s, i, l * 0.8, 0.34)
      .rot(r)
      .params(f * 0.4, 0.06)
      .color(nWarm, 2.2));
  // 刀光：沿直线甩出去的一道弧
  wx(n, s, 1, i, r, l, 0.34, c, 0.06, !0);
  const h = n.particles.use(Mt.streak).tint(W.white, nc.hot);
  for (let u = 0; u < 18; u++) {
    const m = d.next(),
      x = r + (d.next() - 0.5) * c,
      p = l * (0.15 + 0.85 * m);
    h.spawn(
      s + Math.cos(x) * p,
      d.range(0.4, 1.5),
      i + Math.sin(x) * p,
      Math.cos(r) * 7,
      d.signed() * 0.5,
      Math.sin(r) * 7,
      0.16,
      0.1,
      0.03,
      m * 0.1,
    );
  }
  // 火舌：沿斩击线升起，让这一下不只是贴地一块饼
  const g = n.particles.use(Mt.plume).tint(nc.hot, nc.deep);
  for (let u = 0; u < 7; u++) {
    const m = d.next(),
      x = r + (d.next() - 0.5) * c * 0.7,
      p = l * (0.2 + 0.7 * m);
    g.spawn(
      s + Math.cos(x) * p,
      0.3,
      i + Math.sin(x) * p,
      d.signed() * 0.4,
      d.range(1.6, 2.8),
      d.signed() * 0.4,
      d.range(0.9, 1.5),
      0.42,
      0.3,
    );
  }
  (n.particles
    .use(Mt.hitFlash)
    .tint(W.white, nc.glow)
    .spawn(s + a * 1.4, 1.1, i + o * 1.4, 0, 0, 0, le.flashSkill, 1, 1.8),
    n.light(s + a * l * 0.5, i + o * l * 0.5, 1.6, nc.glow, 8, l * 1.5, 0.32),
    n.shake(bo(t, e) ? le.shakeSkill : 0.06, s, i));
}

// 牛魔·烈焰行军：2 秒 24 段。第一段铺一条长火柱本体，后面每段只往上添火星和火舌
function NS(n, t, e) {
  const s = t.pos.x,
    i = t.pos.y,
    a = t.dir?.x ?? 1,
    o = t.dir?.y ?? 0,
    r = Math.atan2(o, a),
    l = t.radius ?? 6,
    c = Math.min(1.1, Math.max(0.45, t.angle ?? 0.55)),
    d = n.rnd;
  // 本体：锥形贴花，p1 >= 0.5 走「持续燃烧」分支，里面有沿喷射方向流动的亮带（flow）。
  // 行军时人一直在往前走，所以改成每隔几段重铺一张短命锥（t.cone），靠重叠保持连续
  t.cone &&
    (n.decals.add(Xt.cone, s, i, l, (t.duration ?? 2) * 0.98).rot(r).params(c * 0.5, 0.5).color(nc.glow, 2.4).under(nc.dark, 0.4),
    n.decals.add(Xt.cone, s, i, l * 0.9, (t.duration ?? 2) * 0.98).rot(r).params(c * 0.26, 0.5).color(nc.hot, 2.2));
  const f = n.particles.use(Mt.ember).tint(nc.hot, nc.deep);
  for (let h = 0; h < 3; h++) {
    const u = d.next(),
      m = r + (d.next() - 0.5) * c,
      x = l * (0.2 + 0.8 * u);
    f.spawn(
      s + Math.cos(m) * x,
      d.range(0.5, 1.6),
      i + Math.sin(m) * x,
      Math.cos(m) * 5,
      d.range(0.2, 1),
      Math.sin(m) * 5,
      d.range(0.25, 0.45),
      0.12,
      0.05,
    );
  }
  // 火舌：没有它的话俯视角度下这一喷只剩地上一条细线
  const g = n.particles.use(Mt.plume).tint(nc.hot, nc.deep);
  for (let h = 0; h < 2; h++) {
    const u = d.next(),
      m = r + (d.next() - 0.5) * c * 0.8,
      x = l * (0.15 + 0.75 * u);
    g.spawn(
      s + Math.cos(m) * x,
      0.35,
      i + Math.sin(m) * x,
      Math.cos(m) * 3.5,
      d.range(1.4, 2.4),
      Math.sin(m) * 3.5,
      d.range(0.9, 1.4),
      0.46,
      0.34,
    );
  }
  n.light(s + a * 2.4, i + o * 2.4, 1.2, nc.glow, 4.5, 3.4, 0.12);
}

// 牛魔·引爆火焰层数：小范围爆燃
function NB(n, t, e) {
  const s = t.pos.x,
    i = t.pos.y,
    a = n.rnd;
  (n.decals.add(Xt.zone, s, i, 1.5, 0.4).params(0, 0).color(nc.hot, 2).under(nc.dark, 0.3),
    n.light(s, i, 1.2, nc.glow, 6, 2.5, 0.25));
  const o = n.particles.use(Mt.ember).tint(nc.hot, nc.deep);
  for (let r = 0; r < 10; r++) {
    const l = a.next() * oe,
      c = a.range(0.1, 1);
    o.spawn(
      s + Math.cos(l) * c,
      a.range(0.2, 1.2),
      i + Math.sin(l) * c,
      Math.cos(l) * 2,
      a.range(1.5, 3.5),
      Math.sin(l) * 2,
      a.range(0.3, 0.6),
      0.25,
      0.08,
    );
  }
}

// 牛魔·烈焰牛魔：变身爆发 + 10 秒常驻火环 + 身上一直冒火
function NU(n, t, e) {
  const s = t.pos.x,
    i = t.pos.y,
    a = n.rnd,
    uid = t.unitId,
    dur = t.duration ?? 10;
  // 起手：三圈不同速度的地面光环 + 八芒符文阵，读起来是「变身了」
  (n.decals.add(Xt.zone, s, i, 3.7, 0.8).params(0, 0).color(nc.glow, 2.4).under(nc.dark, 0.5),
    n.decals.add(Xt.swirl, s, i, 3.2, 0.95).params(2, -3).color(nc.hot, 1.9).under(nc.dark, 0.25),
    n.decals.add(Xt.rune, s, i, 3.1, 0.75).params(8, -1.6).color(nc.hot, 1.6).under(nc.dark, 0.2),
    n.decals.add(Xt.ring, s, i, 2.1, 0.65).params(0.2, 0.98).color(nWarm, 2.2).under(nc.dark, 0.3));
  // 一道冲天火柱，让变身在大半个屏幕外都看得见
  Lr(n, s, i, 1.25, 8.5, 0.4, nc.hot, 2.2, 0.55);
  Lr(n, s, i, 0.5, 11, 0.6, nWarm, 1.9, 0.6);
  const o = n.particles.use(Mt.plume).tint(nc.hot, nc.deep);
  for (let r = 0; r < 34; r++) {
    const l = a.next() * oe,
      c = a.range(0.2, 2.2);
    o.spawn(
      s + Math.cos(l) * c,
      a.range(0.1, 0.9),
      i + Math.sin(l) * c,
      Math.cos(l) * a.range(1, 3.4),
      a.range(2.6, 6.5),
      Math.sin(l) * a.range(1, 3.4),
      a.range(0.7, 1.3),
      0.42,
      0.14,
    );
  }
  // 地面焦痕：变身把脚下烧黑
  xx(n, s, i, 2.4, 2.2, W.black, nc.deep, 0.75);
  (n.light(s, i, 2.2, nc.glow, 13, 6, 0.6), n.shake(bo(t, e) ? le.shakeSkill : 0.16, s, i));

  if (!(uid >= 0) || !n.anchor(uid)) return;
  // 10 秒常驻：贴地跟随的火池 + 火环 + 缓慢反卷的旋涡，变身期间一直亮着
  const pool = n.decals.hold(Xt.glow, 0.2);
  n.decals.at(pool).follow(uid).radius(2.6).params(1.1, 0).color(nc.glow, 1.6, 0.5).under(nc.deep, 0.12);
  const ring = n.decals.hold(Xt.zone, 0.18);
  // 环用暖白而不是纯橙红：橙红的大圆圈在俯视下像敌方的技能预警圈
  n.decals.at(ring).follow(uid).radius(2.05).params(0, 0).color(nc.hot, 2.4).under(nc.dark, 0.45);
  const sw = n.decals.hold(Xt.swirl, 0.18);
  n.decals.at(sw).follow(uid).radius(1.85).params(3, -1.5).color(nc.hot, 1.9).under(nc.dark, 0.2);
  n.after(dur, () => {
    (n.decals.release(pool, 0.5), n.decals.release(ring, 0.5), n.decals.release(sw, 0.5));
  });
  // 身上持续冒火：每 0.15 秒一簇，跟着英雄走——「变身」期间整个人是烧着的
  const spark = n.particles.use(Mt.ember).tint(nc.hot, nc.deep);
  let left = dur,
    n2 = 0;
  const burn = () => {
    if (!n.anchor(uid)) return;
    // n.a 是所有锚点查询共用的临时对象，先抄成本地值再用：中间任何一次 n.light / anchor 都可能把它改掉
    const cx = n.a.x,
      cy = n.a.y,
      cz = n.a.z;
    // 每 0.3 秒补一盏跟随的火光：地面被照亮，才会读成「他身上在烧」
    n2++ % 2 === 0 && n.light(cx, cz, 1.3, nc.glow, 4.5, 3.4, 0.4);
    for (let k = 0; k < 4; k++) {
      const l = a.next() * oe,
        m = a.range(0.15, 0.62);
      o.spawn(
        cx + Math.cos(l) * m,
        cy + a.range(0.1, 1.3),
        cz + Math.sin(l) * m,
        a.signed() * 0.35,
        a.range(1.8, 3.4),
        a.signed() * 0.35,
        a.range(0.65, 1.1),
        0.58,
        0.2,
      );
      spark.spawn(
        cx + Math.cos(l) * m,
        cy + a.range(0.3, 1.5),
        cz + Math.sin(l) * m,
        a.signed() * 0.5,
        a.range(2.2, 3.8),
        a.signed() * 0.5,
        a.range(0.35, 0.7),
        0.12,
        0.05,
      );
    }
    ((left -= 0.15), left > 1e-6 && n.after(0.15, burn));
  };
  burn();
}



function i8(n, t, e, s, i, a, o = 0) {
  const r = qo(
    n,
    t - Math.cos(i) * a * 0.8,
    e,
    s - Math.sin(i) * a * 0.8 + 0.3,
    i,
    a,
    0.16,
    di.hot,
    2.2,
    Math.PI / 2,
    !1,
    0.95,
  );
  (r
    .rot(Math.PI / 2 - 0.35, -i, o)
    .scale(a * 0.92, a * 1.06)
    .fade(0.02, 0.35),
    (r.k = 0.5));
}

const ZP = (n, t) => {
    const e = t.dir?.x ?? 1,
      s = t.dir?.y ?? 0,
      i = Math.atan2(s, e),
      a = t.pos.x + e * 0.8,
      o = t.pos.y + s * 0.8,
      r = 1.4,
      l = n.rnd;
    (n.particles.use(Mt.hitFlash).tint(W.white, di.hot).spawn(a, r, o, 0, 0, 0, le.flashBasic, 0.7, 1.2),
      i8(n, a, r, o, i, 1),
      n.glow
        .spawn(qe.hoop, sn.hoop, 0.22)
        .at(a + e * 0.3, r, o + s * 0.3)
        .vel(e * 12, 0, s * 12)
        .rot(0, -i, -Math.PI / 2)
        .scale(0.15, 0.75)
        .color(W.white, 1.5, 0.85)
        .fade(0.1, 0.35));
    const c = n.particles.use(Mt.streak).tint(W.white, di.hot);
    for (let f = 0; f < 3; f++)
      c.spawn(
        a + l.signed() * 0.12,
        r + l.signed() * 0.15,
        o + l.signed() * 0.12,
        e * l.range(20, 28),
        0,
        s * l.range(20, 28),
        l.range(0.12, 0.18),
        0.1,
        0.03,
        f * 0.015,
      );
    for (const f of [1, -1])
      km(n, t.pos.x + e * 0.6, t.pos.y + s * 0.6, 4, 0.3, e * 1.5 - s * f * 3.2, s * 1.5 + e * f * 3.2);
    n.decals
      .add(Xt.streak, a + e * 2.2, o + s * 2.2, 2.6, 0.3)
      .rot(i, 0.1)
      .params(0, 6)
      .color(W.white, 1.1, 0.7)
      .under(W.black, 0);
  },
  QP = (n, t) => {
    const e = t.from ?? t.pos,
      s = t.to ?? t.pos;
    let i = s.x - e.x,
      a = s.y - e.y;
    const o = Math.hypot(i, a) || 0.01;
    ((i /= o), (a /= o));
    const r = Math.atan2(a, i),
      l = o / Nr(KP, "dashSpeed"),
      c = t.unitId ?? -1;
    (Ni(n, e.x, 0.2, e.y, 4, 0.35, 0.95, W.dust, W.dustDark, 0.5),
      km(n, e.x, e.y, 5, 0.35, -i * 2, -a * 2, 2.6),
      n.decals
        .add(Xt.streak, (e.x + s.x) / 2, (e.y + s.y) / 2, o / 2 + 0.3, 0.4)
        .rot(r, 0.32 / (o / 2 + 0.3))
        .params(0.2, 0.4 / l)
        .color(di.glow, 1.2, 0.75)
        .under(W.black, 0),
      n.anchor(c) &&
        (n.trail(c, $n.white, l + 0.05, 0.55, W.white, di.glow),
        n.trail(c, $n.thin, l + 0.05, 1.25, di.hot, di.glow)),
      n.after(l, () => {
        (Ni(n, s.x, 0.15, s.y, 2, 0.3, 0.8, W.dust, W.dustDark, 0.4),
          Mm(n, s.x, 1.2, s.y, 2, 1.4, -i * 1.5, -a * 1.5));
      }));
  },
  JP = (n, t) => {
    const e = t.pos.x,
      s = t.pos.y,
      i = n.rnd,
      a = n.anchor(t.unitId) && n.a.unit ? n.a.unit.facing : 0,
      o = n.particles.use(Mt.arrow).tint(W.plume, di.hot),
      r = n.n(12);
    for (let l = 0; l < r; l++)
      o.spawn(
        e + i.signed() * 0.4,
        1.8 + i.next() * 0.5,
        s + i.signed() * 0.4,
        i.signed() * 2.2,
        i.range(26, 36),
        i.signed() * 2.2,
        i.range(0.28, 0.36),
        0.5,
        0.4,
        i.next() * 0.16,
      );
    (Lr(n, e, s, 0.24, 9, 0.4, di.glow, 1.5, 0.5),
      i8(n, e + Math.cos(a) * 0.5, 1.7, s + Math.sin(a) * 0.5, a, 1.05, 0.9),
      bn(n, e, s, 1.8, 0.34, di.glow, 1.2, 0.2, 0.2),
      Mm(n, e, 1.5, s, 5, 2.6),
      km(n, e, s, 5, 0.6, 0, 0, 3),
      n.particles.use(Mt.hitFlash).tint(W.white, di.hot).spawn(e, 2.1, s, 0, 0, 0, le.flashSkill, 0.9, 1.5),
      n.light(e, s, 2, di.glow, 5, 7, 0.3));
  },
  tD = (n, t) => {
    const e = t.pos.x,
      s = t.pos.y,
      i = t.radius ?? 5,
      a = n.rnd;
    let o = -1.6,
      r = -1.1;
    if (n.anchor(t.unitId)) {
      const d = e - n.a.x,
        h = s - n.a.z,
        u = Math.hypot(d, h);
      u > 0.5 && ((o = (d / u) * 2.6), (r = (h / u) * 2.6));
    }
    const l = 10,
      c = n.particles,
      f = n.n(16);
    for (let d = 0; d < f; d++) {
      const h = a.next() * oe,
        u = Math.sqrt(a.next()) * i * 0.96,
        m = e + Math.cos(h) * u,
        x = s + Math.sin(h) * u,
        p = a.range(0.15, 0.2),
        g = a.next() * 0.3;
      (c
        .use(Mt.arrow)
        .tint(W.plume, di.hot)
        .spawn(m - o, l, x - r, o / p, -l / p, r / p, p, 0.56, 0.5, g),
        c.use(Mt.dust).spawn(m, 0.12, x, o * 0.25, a.range(0.5, 1.1), r * 0.25, 0.35, 0.3, 0.7, g + p),
        d % 3 === 0
          ? km(n, m, x, 1, 0.1, o * 0.6, r * 0.6, 2.4, g + p)
          : c
              .use(Mt.chip)
              .tint(W.white, di.glow)
              .spawn(
                m,
                0.15,
                x,
                a.signed() * 2.5,
                a.range(2, 4.5),
                a.signed() * 2.5,
                0.18,
                0.1,
                0.03,
                g + p,
              ));
    }
    n.decals.add(Xt.ring, e, s, i, 0.4).params(0.82, 1).color(di.glow, 1.1, 0.8).under(di.dark, 0.2);
  },
  eD = { fengling_s1_cast: ZP, fengling_s2_dash: QP, fengling_ult_cast: JP, fengling_ult_tick: tD };

function Mx(n, t, e, s, i) {
  if (((i.x = 0), (i.z = 0), !n.anchor(t.unitId))) return;
  const a = e - n.a.x,
    o = s - n.a.z,
    r = Math.hypot(a, o);
  r < 0.001 || ((i.x = a / r), (i.z = o / r));
}

const Ei = { x: 0, z: 0 };

function kx(n, t, e, s, i) {
  const a = n.anchors.unit(t.unitId ?? -1);
  if (!(!a || a.kind !== "hero")) {
    for (const o of a.buffs)
      if (o.id === "ember_might") {
        H0(n, e, s, i, 4, 5, W.emberHot, W.ember, Ei.x, Ei.z, 0.4, 0.35, 0.12);
        return;
      }
  }
}

const nD = (n, t) => {
    const e = t.pos.x,
      s = t.pos.y,
      i = $0(n, t.targetId, 0.5, 1),
      a = n.a.unit !== null && (n.a.unit.kind === "hero" || n.a.unit.kind === "monster");
    (Mx(n, t, e, s, Ei),
      vs(n, e, i, s, a ? 1.25 : 0.9, W.warm, W.sparkDeep, Ei.x, Ei.z, a ? 7 : 4, le.flashBasic, 9),
      bn(n, e, s, a ? 1.05 : 0.75, 0.22, W.spark, 1.3, 0.3, 0.2),
      a && n.particles.use(Mt.crescent).tint(W.warm, W.sparkDeep).spawn(e, i, s, 0, 0, 0, 0.12, 0.8, 1.5),
      kx(n, t, e, i, s));
  },
  sD = (n, t) => {
    const e = t.pos.x,
      s = t.pos.y,
      i = $0(n, t.targetId, 0.5, 1),
      a = n.a.unit !== null && (n.a.unit.kind === "hero" || n.a.unit.kind === "monster");
    (Mx(n, t, e, s, Ei),
      vs(n, e, i, s, a ? 1.25 : 0.9, W.magic, W.magicDeep, Ei.x, Ei.z, a ? 5 : 3, le.flashBasic, 7),
      bn(n, e, s, a ? 1.05 : 0.75, 0.24, W.magic, 1.3, 0.3, 0.2),
      jo(n, e, i, s, a ? 4 : 2, 3, W.magic, W.magicDeep, 0.35, 0.28),
      kx(n, t, e, i, s));
  },
  iD = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      a = $0(n, t.targetId, 0.5, 1);
    Mx(n, t, s, i, Ei);
    const o = Ei.x === 0 && Ei.z === 0 ? 1 : Ei.x,
      r = Ei.x === 0 && Ei.z === 0 ? 0 : Ei.z;
    (vs(n, s, a, i, 2, W.crit, W.critDeep, o, r, 12, le.flashBig, 12),
      n.particles
        .use(Mt.streak)
        .tint(W.white, W.crit)
        .spawn(s - o * 0.9, a + 0.7, i - r * 0.9, o * 26, -16, r * 26, 0.1, 0.42, 0.12),
      n.particles.use(Mt.crescent).tint(W.crit, W.critDeep).spawn(s, a, i, 0, 0, 0, 0.2, 1.4, 2.8),
      bn(n, s, i, 1.5, 0.3, W.critDeep, 1.5, 0.2, 0.35),
      kx(n, t, s, a, i),
      bo(t, e) && (n.shake(le.shakeSkill, s, i), n.light(s, i, a, W.crit, 4, 5, 0.2)));
  },
  aD = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      a = $0(n, t.targetId, 0.45, 1),
      o = Fa(t.team);
    (vs(n, s, a, i, 1.7, o.hot, o.glow, 0, 0, 8, le.flashSkill, 8),
      U0(n, s, a, i, 4, 5, 4, o.hot, o.glow, 0.2),
      bn(n, s, i, 1.25, 0.3, o.glow, 1.5, 0.2, 0.3),
      F0(n, s, i, 4, 3.5, 4, 0.3, W.rock, W.dustDark, 0.2),
      Ni(n, s, 0.2, i, 2, 0.3, 0.9, W.dust, W.dustDark, 0.5),
      t.targetId === e.playerId && (n.shake(0.1, s, i), n.light(s, i, a, o.glow, 5, 5, 0.25)));
  },
  oD = (n, t) => {
    const e = t.unitId ?? -1,
      s = n.anchor(e),
      i = s ? n.a.x : t.pos.x,
      a = s ? n.a.z : t.pos.y,
      o = s ? n.a.y : 0,
      r = s ? n.a.radius : 0.6,
      l = n.decals
        .add(Xt.glow, i, a, 1.5 + r, 0.8)
        .params(1.4)
        .color(W.heal, 1)
        .under(W.black, 0),
      c = n.decals
        .add(Xt.ring, i, a, 1.3 + r, 0.45)
        .params(0.25, 1)
        .color(W.healDeep, 1.4)
        .under(W.shadow, 0.2),
      f = wm(n, s ? 0 : i, (s ? 0 : o) + 0.25, s ? 0 : a, r + 0.55, r + 0.25, 2.4, 0.6, W.heal, 1.5, 0.85);
    s && (l.follow(e), c.follow(e), f.follow(e));
    const d = n.particles.use(Mt.plus),
      h = n.rnd,
      u = n.n(7);
    for (let m = 0; m < u; m++) {
      const x = h.next() * oe,
        p = h.range(0.4, r + 0.5);
      d.spawn(
        i + Math.cos(x) * p,
        o + h.range(0.3, 1.1),
        a + Math.sin(x) * p,
        0,
        h.range(1.2, 2),
        0,
        h.range(0.55, 0.8),
        0.28,
        0.4,
        h.range(0, 0.2),
      );
    }
    jo(n, i, o + 1, a, 4, 1.6, W.heal, W.healDeep, 0.6, 0.26);
  },
  rD = (n, t) => {
    const e = t.pos.x,
      s = t.pos.y,
      i = $0(n, t.unitId, 0.5, 1.1),
      a = (n.a.unit ? n.a.radius : 0.6) + 0.7;
    (vs(n, e, i, s, 1.6, W.frost, W.frostDeep, 0, 0, 6, le.flashSkill, 6),
      Hh(n, e, i, s, a, a * 1.5, 0.22, W.frost, 1.4, 0.8));
    const o = n.particles.use(Mt.hex),
      r = n.rnd,
      l = n.n(8);
    for (let c = 0; c < l; c++) {
      const f = r.next() * oe,
        d = r.range(-0.2, 0.9),
        h = Math.sqrt(1 - d * d * 0.8),
        u = r.range(3, 6.5);
      o.spawn(
        e + Math.cos(f) * h * a * 0.8,
        i + d * a * 0.8,
        s + Math.sin(f) * h * a * 0.8,
        Math.cos(f) * h * u,
        d * u + 1.5,
        Math.sin(f) * h * u,
        r.range(0.4, 0.65),
        0.36,
        0.2,
      );
    }
    U0(n, e, i, s, 6, 6, 4, W.white, W.frost, 0.2);
  };

function Sx(n, t, e, s, i, a, o) {
  const r = s >= 0 ? 0 : t,
    l = s >= 0 ? 0 : e,
    c = n.glow
      .spawn(qe.pillar, sn.pillar, 0.5)
      .at(r, 0.05, l)
      .scale3(0.75, o * 0.6, 0.75, 0.12, o, 0.12)
      .color(i, 1.1, 0.55)
      .fade(0.06, 0.4)
      .opt(0.3, 0.9, 1),
    f = n.glow
      .spawn(qe.pillar, sn.pillar, 0.42)
      .at(r, 0.05, l)
      .scale3(0.22, o * 0.8, 0.22, 0.05, o * 1.1, 0.05)
      .color(a, 1.6, 0.85)
      .fade(0.04, 0.45)
      .opt(0.45, 0.7, 1);
  s >= 0 && (c.follow(s), f.follow(s));
}

const lD = (n, t, e) => {
    const s = t.unitId ?? -1,
      i = n.anchor(s),
      a = i ? n.a.x : t.pos.x,
      o = i ? n.a.z : t.pos.y,
      r = i ? s : -1,
      l = n.decals.add(Xt.rune, a, o, 1.6, 0.9).params(5, 1.4).color(W.gold, 1.5, 0.95).under(W.shadow, 0.25);
    (i && l.follow(s), Sx(n, a, o, r, W.gold, W.goldHot, 6.5));
    for (let h = 0; h < 2; h++) {
      const u = wm(n, i ? 0 : a, 0.2, i ? 0 : o, 0.95 - h * 0.12, 0.6, 3.6, 0.55, W.goldHot, 1.5, 0.85).delay(
        h * 0.12,
      );
      i && u.follow(s);
    }
    const c = n.particles.use(Mt.star).tint(W.goldHot, W.gold),
      f = n.rnd,
      d = n.n(9);
    for (let h = 0; h < d; h++)
      c.orbit(
        a,
        f.range(0.1, 0.6),
        o,
        f.range(0.6, 1),
        f.range(0.25, 0.6),
        f.next() * oe,
        f.range(2, 5),
        f.range(2.2, 3.8),
        f.range(0.6, 0.9),
        0.26,
        0.1,
        f.range(0, 0.25),
      );
    n.light(a, o, 2, W.gold, s === e.playerId ? 6 : 3.5, 6, le.lightDur);
  },
  cD = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      a = t.unitId === e.playerId,
      o = Fa(t.team),
      r = a ? W.green : o.glow;
    (Sx(n, s, i, -1, r, o.hot, 9),
      n.decals.add(Xt.rune, s, i, 1.6, 1.1).params(6, -0.9).color(r, 1.5, 0.95).under(W.shadow, 0.25),
      bn(n, s, i, 2.2, 0.45, r, 1.4, 0.15, 0.25));
    const l = n.particles.use(Mt.streak).tint(o.hot, r),
      c = n.rnd,
      f = n.n(10);
    for (let d = 0; d < f; d++) {
      const h = c.next() * oe,
        u = c.range(0.2, 0.9);
      l.spawn(
        s + Math.cos(h) * u,
        c.range(5, 8),
        i + Math.sin(h) * u,
        0,
        -c.range(10, 14),
        0,
        c.range(0.35, 0.5),
        0.12,
        0.06,
        c.range(0, 0.3),
      );
    }
    (jo(n, s, 1.2, i, 7, 2.6, W.white, r, 0.7, 0.3),
      n.light(s, i, 2.5, r, a ? 6 : 4, 7, le.lightDur),
      a && n.shake(0.1, s, i));
  },
  fD = (n, t) => {
    const e = t.pos.x,
      s = t.pos.y;
    bn(n, e, s, 1.5, 0.35, W.blue, 1.4, 1, 0.2);
    const i = n.particles.use(Mt.glint).tint(W.white, W.blue),
      a = n.rnd,
      o = n.n(8);
    for (let r = 0; r < o; r++)
      i.orbit(
        e,
        a.range(0.1, 0.4),
        s,
        a.range(1.2, 1.6),
        0.45,
        a.next() * oe,
        a.range(4, 7),
        a.range(1, 2.2),
        a.range(0.45, 0.7),
        0.26,
        0.1,
        a.range(0, 0.15),
      );
  },
  dD = (n, t) => {
    const e = t.pos.x,
      s = t.pos.y;
    (Sx(n, e, s, -1, W.blue, W.frost, 8),
      n.decals.add(Xt.star, e, s, 1.5, 0.55).params(6, 2.6).color(W.frost, 1.5, 0.95).under(W.shadow, 0.2),
      bn(n, e, s, 2, 0.4, W.blue, 1.4, 0.15, 0.2),
      jo(n, e, 1.2, s, 9, 3.6, W.white, W.blue, 0.6, 0.3),
      n.light(e, s, 2, W.blue, 5, 6, le.lightDur));
  },
  hD = (n, t, e) => {
    const s = t.from ?? t.pos,
      i = t.to ?? t.pos;
    let a = i.x - s.x,
      o = i.y - s.y;
    const r = Math.hypot(a, o) || 1;
    ((a /= r), (o /= r));
    const l = 1.1;
    (vs(n, s.x, l, s.y, 1.5, W.goldHot, W.gold, -a, -o, 4, le.flashSkill, 5),
      n.decals.add(Xt.ring, s.x, s.y, 1.3, 0.3).params(1, 0.15).color(W.gold, 1.4).under(W.shadow, 0.2));
    const c = n.particles.use(Mt.streak).tint(W.white, W.gold),
      f = n.rnd,
      d = n.n(8);
    for (let h = 0; h < d; h++) {
      const u = f.range(10, 22);
      c.spawn(
        s.x + f.signed() * 0.45,
        l + f.signed() * 0.6,
        s.y + f.signed() * 0.45,
        a * u + f.signed() * 1.5,
        f.signed() * 1.2,
        o * u + f.signed() * 1.5,
        f.range(0.12, 0.22),
        0.14,
        0.05,
      );
    }
    (n.ribbons.trace($n.energy, s.x, l, s.y, i.x, l, i.y, 0.07, W.goldHot, W.gold),
      n.decals
        .add(Xt.streak, (s.x + i.x) / 2, (s.y + i.y) / 2, r / 2, 0.28)
        .rot(Math.atan2(o, a), 0.45 / r)
        .params(0, 9)
        .color(W.gold, 1.3)
        .under(W.black, 0),
      n.after(0.06, () => {
        (vs(n, i.x, l, i.y, 1.9, W.goldHot, W.gold, a, o, 6, le.flashSkill, 6),
          bn(n, i.x, i.y, 1.6, 0.32, W.gold, 1.5, 0.15, 0.25),
          jo(n, i.x, l, i.y, 6, 3.6, W.white, W.gold, 0.45, 0.28),
          n.light(i.x, i.y, 1.5, W.gold, 4, 6, 0.25));
      }),
      t.unitId === e.playerId && n.shake(0.08, i.x, i.y));
  },
  uD = (n, t) => {
    const e = t.pos.x,
      s = t.pos.y,
      i = t.value ?? 30,
      a = n.rnd,
      o = n.particles;
    L0(n, e, 0.8, s, 0.8, W.gold, 0.12);
    const r = Math.min(8, Math.max(3, Math.round(2 + i / 24))),
      l = n.anchor(t.unitId),
      c = l ? n.a.x : e,
      f = l ? n.a.z : s,
      d = l ? n.a.y + n.a.height * 0.5 : 0.3,
      h = Mt.coin.gravity;
    o.use(Mt.coin);
    for (let u = 0; u < r; u++) {
      const m = e + a.signed() * 0.4,
        x = s + a.signed() * 0.4,
        p = 0.6 + a.next() * 0.5,
        g = (l ? 0.5 : 0.6) + u * 0.035 + a.next() * 0.08,
        y = l ? 0 : a.signed() * 1.4,
        v = l ? 0 : a.signed() * 1.4;
      o.spawn(m, p, x, (c + y - m) / g, (d - p) / g + 0.5 * h * g, (f + v - x) / g, g, 0.3, 0.24, u * 0.025);
    }
    if (l) {
      o.use(Mt.glint).tint(W.goldHot, W.gold);
      for (let u = 0; u < 2; u++)
        o.spawn(
          c + a.signed() * 0.3,
          d + a.signed() * 0.3,
          f + a.signed() * 0.3,
          a.signed(),
          1 + a.next(),
          a.signed(),
          0.35,
          0.36,
          0.1,
          0.5 + u * 0.07,
        );
    }
  };

function a8(n, t, e, s, i, a, o) {
  (L0(n, t, e, s, 1.6 * o, i, 0.14, !0),
    H0(n, t, e, s, 6, 8, i, a, 0, 0, 0, 0.4, 0.14),
    F0(n, t, s, 4, 4, 7, 0.4, W.rock, W.dustDark, 0.26),
    Ni(n, t, e, s, 3, 0.6, 1.5 * o, W.smoke, W.smokeDark, 1));
}

function o8(n, t, e, s, i, a, o, r) {
  (yx(n, t, e, Math.round(s * 0.35), a, i, 0.5),
    F0(n, t, e, s, a * 1.2, i * 1.1, 1.1, W.rock, W.dustDark, 0.34),
    U0(n, t, 2.5, e, Math.round(s * 0.6), a, i * 0.9, o, r, 0.3));
}

const pD = (n, t) => {
    const e = t.pos.x,
      s = t.pos.y,
      i = Fa(t.team),
      a = n.rnd;
    (L0(n, e, 3, s, 4.5, i.hot, 0.2, !0),
      Hh(n, e, 1.5, s, 1, 5, 0.38, i.glow, 1.4, 0.7),
      Lr(n, e, s, 1.2, 7, 0.5, i.glow, 1.3, 0.6),
      bn(n, e, s, 6.5, 0.6, i.glow, 1.6, 0.1, 0.4),
      n.light(e, s, 3.5, i.glow, le.lightMax, 16, le.lightDur),
      n.shake(0.45, e, s),
      o8(n, e, s, 26, 12, 7.5, i.hot, i.glow),
      Ha(n, e, s, 14, 1.4, 6, W.dust, W.dustDark, 2.2, 1.5),
      Ni(n, e, 0.8, s, 8, 1.8, 2.4, W.dust, W.smoke, 1.6),
      n.decals.add(Xt.cracks, e, s, 4.6, 4).params(0, 0.1).color(i.glow, 1.3).under(W.shadow, 0.9),
      xx(n, e, s, 4.3, 5, i.glow));
    for (let l = 0; l < 3; l++) {
      const c = a.next() * oe,
        f = a.range(0.8, 2.4),
        d = a.range(1, 4);
      n.after(0.2 + l * 0.22 + a.next() * 0.1, () =>
        a8(n, e + Math.cos(c) * f, d, s + Math.sin(c) * f, i.hot, i.glow, 0.8),
      );
    }
    const o = n.particles.use(Mt.smoke),
      r = n.n(14);
    for (let l = 0; l < r; l++)
      o.spawn(
        e + a.signed() * 1.3,
        a.range(0.4, 1.5),
        s + a.signed() * 1.3,
        a.signed() * 0.5,
        a.range(1.6, 3.2),
        a.signed() * 0.5,
        a.range(1.3, 2),
        1.5,
        3.4,
        0.2 + a.next() * 2,
      );
    gf(n, e, 0.5, s, 18, 2, 1.6, i.hot, i.glow, 2, 0.18);
  },
  mD = (n, t) => {
    const e = t.pos.x,
      s = t.pos.y,
      i = Fa(t.team),
      a = n.rnd;
    (n.decals.add(Xt.ring, e, s, 9, 0.5).params(1, 0.08).color(i.hot, 1.6).under(W.shadow, 0.3),
      gP(n, e, 4, s, 4.5, 0.6, 0.5, i.hot, 2).opt(1, 1.2, 3));
    const o = n.particles.use(Mt.glint).tint(i.hot, i.glow),
      r = n.n(22);
    for (let l = 0; l < r; l++)
      o.orbit(
        e,
        a.range(1, 6),
        s,
        a.range(5, 8),
        0.4,
        a.next() * oe,
        a.range(3, 6),
        a.range(-1, 1),
        0.5,
        0.45,
        0.18,
        a.range(0, 0.1),
      );
    (n.light(e, s, 4, i.hot, 6, 12, le.lightDur),
      n.shake(0.25, e, s),
      n.after(0.5, () => {
        (L0(n, e, 4, s, 8, i.hot, 0.22, !0),
          Hh(n, e, 2, s, 1.5, 10, 0.55, i.glow, 1.5, 0.7),
          Lr(n, e, s, 1.8, 11, 0.85, i.glow, 1.4, 0.6),
          Lr(n, e, s, 0.6, 12, 0.6, i.hot, 1.8, 0.8),
          bn(n, e, s, 10, 0.7, i.glow, 1.8, 0.08, 0.45),
          bn(n, e, s, 14, 0.9, i.hot, 1.3, 0.15, 0.3, 0.16),
          o8(n, e, s, 40, 15, 10, i.hot, i.glow),
          Ha(n, e, s, 22, 2.4, 9, W.dust, W.dustDark, 3, 1.9),
          n.decals.add(Xt.rune, e, s, 7.5, 3).params(8, 0.5).color(i.glow, 1.5).under(W.shadow, 0.35),
          n.decals.add(Xt.cracks, e, s, 9, 4).params(0, 0.2).color(i.glow, 1.5).under(W.shadow, 0.9),
          xx(n, e, s, 7.5, 4, i.glow),
          n.light(e, s, 5, i.glow, le.lightMax, 22, le.lightDur),
          n.shake(0.5, e, s));
        for (let h = 0; h < 7; h++) {
          const u = a.next() * oe,
            m = a.range(2, 7),
            x = a.range(0.8, 4.5);
          n.after(0.2 + h * 0.27 + a.next() * 0.1, () => {
            (a8(n, e + Math.cos(u) * m, x, s + Math.sin(u) * m, i.hot, i.glow, 1.1),
              bn(n, e + Math.cos(u) * m, s + Math.sin(u) * m, 2.2, 0.35, i.glow, 1.3, 0.2, 0.2),
              n.shake(0.15, e, s));
          });
        }
        const l = n.particles.use(Mt.glint).tint(i.hot, i.glow),
          c = n.n(36);
        for (let h = 0; h < c; h++) {
          const u = a.next() * oe,
            m = Math.sqrt(a.next()) * 9;
          l.spawn(
            e + Math.cos(u) * m,
            a.range(5, 11),
            s + Math.sin(u) * m,
            a.signed() * 0.6,
            -a.range(1.5, 3.5),
            a.signed() * 0.6,
            a.range(1.2, 2),
            0.38,
            0.12,
            0.4 + a.next() * 2.4,
          );
        }
        const f = n.particles.use(Mt.smoke),
          d = n.n(22);
        for (let h = 0; h < d; h++)
          f.spawn(
            e + a.signed() * 3,
            a.range(0.4, 2),
            s + a.signed() * 3,
            a.signed() * 0.7,
            a.range(1.8, 3.6),
            a.signed() * 0.7,
            a.range(1.6, 2.4),
            2.2,
            4.4,
            0.3 + a.next() * 2.6,
          );
        gf(n, e, 0.6, s, 26, 4, 2.2, i.hot, i.glow, 2.4, 0.22);
      }));
  },
  gD = (n, t) => {
    const e = t.unitId ?? -1,
      s = n.anchor(e),
      i = s ? n.a.x : t.pos.x,
      a = s ? n.a.z : t.pos.y,
      o = s ? n.a.radius : 0.6;
    let r = 2;
    const l = n.a.unit;
    if (s && l)
      for (const u of l.buffs)
        u.duration - u.timeLeft > 0.5 ||
          (u.id === "frost_insight" ? (r = 0) : u.id === "ember_might" && (r = 1));
    const c = r === 0 ? W.frostDeep : r === 1 ? W.ember : W.gold,
      f = r === 0 ? W.frostHot : r === 1 ? W.emberHot : W.goldHot,
      d = () => {
        const u = n.anchor(e),
          m = u ? n.a.x : i,
          x = u ? n.a.z : a,
          p = u ? n.a.y + n.a.height * 0.5 : 1,
          g = n.decals
            .add(Xt.sigil, m, x, o * (r === 0 ? 1.6 : r === 1 ? 1.85 : 2.1) + 0.35, 0.9)
            .params(r === 2 ? 2 : r, 0.35)
            .rot(0)
            .color(c, 1.6, 1)
            .under(W.shadow, 0.3),
          y = n.glow
            .spawn(qe.pillar, sn.pillar, 0.5)
            .at(u ? 0 : m, 0.05, u ? 0 : x)
            .scale3(0.4, 2.2, 0.4, 0.12, 3, 0.12)
            .color(f, 1.3, 0.75)
            .fade(0.05, 0.4)
            .opt(0.35, 0.8, 1);
        if (
          (u && (g.follow(e), y.follow(e)), vs(n, m, p, x, 1.4, f, c, 0, 0, 5, le.flashSkill, 4), r === 0)
        ) {
          const v = n.particles.use(Mt.frost);
          for (let _ = 0; _ < n.n(8); _++)
            v.orbit(
              m,
              0.2,
              x,
              o + 0.4,
              o + 0.9,
              (_ / 8) * oe,
              3,
              n.rnd.range(0.6, 1.6),
              0.8,
              0.26,
              0.12,
              n.rnd.range(0, 0.15),
            );
        } else
          r === 1
            ? gf(n, m, 0.4, x, 10, o + 0.3, 2, f, c, 0.9, 0.16)
            : jo(n, m, p, x, 8, 3, W.white, c, 0.7, 0.3);
        n.light(m, x, 1.8, c, 4, 6, 0.3);
      },
      h = CP(n, i, a, r === 0 ? "frost_golem" : r === 1 ? "ember_golem" : null);
    if (h && s) {
      const u = n.glow.hold(qe.sphere, sn.core);
      (u.color(f, 1.6, 0.95), (u.add = 0.6), (u.k = 1.6), u.scale(0.35));
      const m = h.x,
        x = h.z,
        p = h.y,
        g = n.ribbons.start($n.energy, m, p, x, f, c);
      n.track(
        e,
        0.6,
        (y, v) => {
          const _ = v * v * (3 - 2 * v),
            k = m + (y.x - m) * _,
            M = x + (y.z - x) * _,
            S = p + (y.y + y.height * 0.5 - p) * _ + Math.sin(v * Math.PI) * 1.6;
          (u.at(k, S, M), g >= 0 && n.ribbons.move(g, k, S, M));
        },
        () => {
          (n.glow.release(u), n.ribbons.end(g), d());
        },
      );
    } else d();
  },
  xD = {
    hit_physical: nD,
    hit_magic: sD,
    hit_crit: iD,
    hit_tower: aD,
    heal: oD,
    shield_break: rD,
    level_up: lD,
    respawn: cD,
    recall_start: fD,
    recall_done: dD,
    flash: hD,
    gold_gain: uD,
    tower_destroyed: pD,
    core_destroyed: mD,
    buff_gain: gD,
  };

function yD(n, t, e, s, i) {
  const a = Fa(s);
  (vs(n, t, 1.2, e, 2, a.hot, a.glow, 0, 0, 6, le.flashBig, 5),
    Hh(n, t, 1.1, e, 0.5, 2.4, 0.3, a.glow, 1.4, 0.7),
    bn(n, t, e, 2.6, 0.5, a.glow, 1.5, 0.1, 0.3),
    Lr(n, t, e, 0.35, 3.8, 0.6, a.glow, 1.3, 0.6),
    U0(n, t, 1.2, e, 8, 5, 6, a.hot, a.glow, 0.24));
  const o = n.particles.use(Mt.glint).tint(a.hot, a.glow),
    r = n.rnd,
    l = n.n(12);
  for (let c = 0; c < l; c++)
    o.orbit(
      t,
      r.range(0.3, 1.6),
      e,
      r.range(0.2, 0.9),
      r.range(0.05, 0.4),
      r.next() * oe,
      r.range(2, 5),
      r.range(2, 4.5),
      r.range(0.9, 1.4),
      0.32,
      0.1,
      r.range(0, 0.4),
    );
  (xx(n, t, e, 1.6, 2.5),
    n.light(t, e, 1.6, a.glow, i ? 6 : 4, 7, le.lightDur),
    n.shake(i ? 0.3 : 0.15, t, e));
}

function vD(n, t, e, s) {
  const i = Fa(s);
  (L0(n, t, 0.7, e, 0.8, i.hot, 0.1),
    U0(n, t, 0.7, e, 3, 4, 4, i.hot, i.glow, 0.16),
    F0(n, t, e, 3, 2.5, 4, 0.3, W.rock, W.dustDark, 0.2),
    Ni(n, t, 0.2, e, 2, 0.3, 0.9, W.dust, W.dustDark, 0.55));
}

function bD(n, t, e, s, i, a, o, r, l) {
  const c = (l % 2 === 0 ? 1 : -1) * 0.45,
    f = qo(n, t, e, s, i, r, 0.14, a, 2.2, c, !0, 0.95);
  ((f.k = 0.7), n.particles.use(Mt.streak).tint(a, o));
  const d = n.rnd,
    h = 2 + (d.next() < 0.5 ? 1 : 0),
    u = l % 2 === 0 ? 1 : -1;
  for (let m = 0; m < h; m++) {
    const x = i + u * (0.5 - m * 0.45) + d.signed() * 0.12,
      p = -Math.sin(x) * u,
      g = Math.cos(x) * u;
    n.particles.spawn(
      t + Math.cos(x) * r * 0.85,
      e + d.signed() * 0.25,
      s + Math.sin(x) * r * 0.85,
      p * 9,
      d.signed() * 0.6,
      g * 9,
      0.12,
      0.09,
      0.03,
    );
  }
}

const He = ws.panyue,
  m1 = Se.panyue.skills.s1,
  r8 = Se.panyue.skills.ult;

function Tx(n, t, e = 0) {
  return n.anchor(t) && n.a.unit ? n.a.unit.facing : e;
}

function l3(n, t, e, s, i, a, o, r, l = 4, c = 0) {
  for (let f = 0; f < s; f++) {
    const d = r + (f * oe) / s,
      h = Math.cos(d),
      u = Math.sin(d),
      m = qo(
        n,
        t + h * (i - a * 0.7),
        0.25,
        e + u * (i - a * 0.7),
        d,
        a,
        o,
        f % 2 === 0 ? He.hot : He.glow,
        2,
        0,
        !1,
        0.9,
      );
    (m
      .rot(0, -d, 0.5)
      .vel(h * l, 0.6, u * l)
      .scale(a * 0.7, a * 1.15)
      .fade(0.05, 0.35),
      (m.k = 0.62),
      c > 0 && m.delay(c));
  }
}

const _D = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y;
    let a = 1,
      o = 0;
    if (n.anchor(t.unitId)) {
      const c = Math.hypot(s - n.a.x, i - n.a.z) || 1;
      ((a = (s - n.a.x) / c), (o = (i - n.a.z) / c));
    }
    const r = Math.atan2(o, a);
    (n.decals.add(Xt.cracks, s, i, 1.5, 1.1).params(0, 0.2).color(He.glow, 1.5).under(W.shadow, 0.8),
      n.decals
        .add(Xt.shieldMark, s - a * 0.25, i - o * 0.25, 1.15, 0.7)
        .rot(r, 0.72)
        .params(0.6, 0.3)
        .color(He.hot, 1.8)
        .under(W.shadow, 0.6));
    const l = qo(n, s - a * 1.15, 0.18, i - o * 1.15, r, 1.9, 0.2, He.hot, 2.3, 0, !1);
    ((l.scale(1.3, 2.1).k = 0.55),
      bn(n, s, i, 1.9, 0.28, He.glow, 1.4, 0.3, 0.25),
      vs(n, s, 0.5, i, 1.3, He.hot, He.deep, a, o, 6, le.flashSkill, 8),
      H0(n, s, 0.3, i, 5, 6, W.bronze, He.deep, a, o, 0.4, 0.3, 0.11),
      Ha(n, s, i, 5, 0.4, 3, W.dust, W.dustDark, 0.9, 0.5),
      Of(n, s, i, 4, 3.5, 5, 0.3, 0.22),
      n.shake(bo(t, e) ? le.shakeSkill : 0.06, s, i),
      n.light(s, i, 1, He.glow, 4, 5, 0.25));
  },
  wD = (n, t) => {
    const e = t.pos.x,
      s = t.pos.y,
      i = t.dir?.x ?? 1,
      a = t.dir?.y ?? 0,
      o = Math.atan2(a, i),
      r = t8(m1),
      l = r / Nr(m1, "dashSpeed"),
      c = n.rnd,
      f = n.particles.use(Mt.dust),
      d = n.n(7);
    for (let x = 0; x < d; x++) {
      const p = c.range(3, 7);
      f.spawn(
        e + c.signed() * 0.5,
        c.range(0.1, 0.6),
        s + c.signed() * 0.5,
        -i * p + c.signed() * 1.5,
        c.range(0.5, 2),
        -a * p + c.signed() * 1.5,
        c.range(0.5, 0.9),
        0.7,
        1.6,
      );
    }
    (Of(n, e, s, 4, 3.5, 4.5, 0.4, 0.24),
      n.decals
        .add(Xt.streak, e + i * r * 0.5, s + a * r * 0.5, r * 0.5, 0.55)
        .rot(o, (_x(m1) * 0.5) / (r * 0.5))
        .params(0.5, 1 / (l / 0.55))
        .color(He.glow, 1.2, 0.8)
        .under(He.dark, 0.4));
    const h = t.unitId ?? -1;
    if (!n.anchor(h)) return;
    (n.trail(h, $n.dust, l + 0.05, 0.5),
      n.trail(h, $n.energy, l + 0.05, 1.2, He.hot, He.deep),
      vx(n, i * 0.95, 0.05, a * 0.95, o, 2.5, l + 0.1, He.hot, 1.9, 0.95, 0.2, 0.44, 0.1)
        .follow(h)
        .fade(0.12, 0.75));
    for (let x = 0; x < 2; x++) {
      const p = qo(
        n,
        i * (0.55 - x * 0.35),
        1.3 - x * 0.9,
        a * (0.55 - x * 0.35),
        o,
        1.9 + x * 0.5,
        l + 0.1,
        x === 0 ? He.hot : He.glow,
        x === 0 ? 2.2 : 1.5,
        0,
        !1,
        0.95,
      ).follow(h);
      p.scale(1.4 + x * 0.4, 1.9 + x * 0.5).fade(0.15, 0.7).k = 0.66;
    }
    let m = 0;
    n.track(h, l, (x, p, g) => {
      for (m += g; m > 0.04;) {
        ((m -= 0.04),
          n.particles
            .use(Mt.dust)
            .spawn(
              x.x + c.signed() * 0.5,
              0.25,
              x.z + c.signed() * 0.5,
              -i * 2 + c.signed(),
              c.range(0.4, 1.4),
              -a * 2 + c.signed(),
              c.range(0.4, 0.7),
              0.7,
              1.5,
            ));
        const y = c.chance(0.5) ? 1 : -1;
        n.particles
          .use(Mt.streak)
          .tint(He.hot, He.glow)
          .spawn(
            x.x + i * 0.9 - a * y * 0.7,
            c.range(0.4, 2),
            x.z + a * 0.9 + i * y * 0.7,
            -i * 9 - a * y * 2,
            c.signed() * 0.5,
            -a * 9 + i * y * 2,
            0.16,
            0.1,
            0.03,
          );
      }
    });
  },
  MD = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      a = t.radius ?? Nr(m1, "impactRadius"),
      o = n.rnd,
      r = Tx(n, t.unitId, o.next() * oe),
      l = Math.cos(r),
      c = Math.sin(r);
    (vs(n, s + l * 0.9, 1, i + c * 0.9, 2.2, He.hot, He.deep, l, c, 8, le.flashSkill, 10),
      vx(n, s + l * 1, 0.05, i + c * 1, r, 2.9, 0.26, He.hot, 2.3, 1, 0.3, 0, 0.06)
        .vel(l * 2.5, 0, c * 2.5)
        .fade(0.04, 0.3));
    const f = qo(n, s - l * 0.3, 1, i - c * 0.3, r, a * 0.95, 0.26, He.hot, 2.3, 0, !1);
    ((f
      .scale(a * 0.55, a * 0.98)
      .vel(l * 3, 0, c * 3)
      .fade(0.04, 0.35).k = 0.7),
      bn(n, s, i, a, 0.4, He.glow, 1.9, 0.15, 0.4),
      n.decals
        .add(Xt.cracks, s, i, a * 0.95, 1.4)
        .params(0, 0.25)
        .color(He.glow, 1.7)
        .under(W.shadow, 0.85),
      l3(n, s, i, 4, a * 0.72, 1.25, 0.3, r + Math.PI / 4, 5),
      Ha(n, s, i, 10, a * 0.5, 5, W.dust, W.dustDark, 1.4, 0.85),
      Of(n, s, i, 10, 5.5, 7.5, a * 0.4),
      H0(n, s + l * 0.9, 0.8, i + c * 0.9, 6, 8, W.bronze, He.deep, l, c, 0.5, 0.3, 0.12),
      n.light(s, i, 1.5, He.glow, le.lightMax, 8, 0.35),
      n.shake(bo(t, e) ? le.shakeSkill : 0.07, s, i));
  },
  kD = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      a = t.radius ?? 4.5,
      o = n.rnd,
      r = t.unitId ?? -1,
      l = n.anchor(r),
      c = l ? n.a.height : 2.4,
      f = Tx(n, r, 0);
    for (let u = 0; u < 5; u++) {
      const m = f + (u * oe) / 5,
        x = vx(
          n,
          (l ? 0 : s) + Math.cos(m) * 1.3,
          0.05,
          (l ? 0 : i) + Math.sin(m) * 1.3,
          m,
          2.3,
          0.5,
          u === 0 ? He.hot : He.accent,
          1.8,
          0.9,
          0.18,
        ).delay(u * 0.015);
      (x.vel(Math.cos(m) * 0.9, 0, Math.sin(m) * 0.9), l && x.follow(r));
    }
    (bn(n, s, i, a, 0.48, He.glow, 1.8, 0.25, 0.4), bn(n, s, i, a, 0.52, He.hot, 1, 0.1, 0.2, 0.12));
    const d = n.particles.use(Mt.streak).tint(W.white, He.hot),
      h = n.n(6);
    for (let u = 0; u < h; u++) {
      const m = o.next() * oe,
        x = o.range(0.15, 0.55);
      d.spawn(
        s + Math.cos(m) * x,
        c * 0.92 + o.range(0, 0.3),
        i + Math.sin(m) * x,
        Math.cos(m) * 1.6,
        o.range(6, 10),
        Math.sin(m) * 1.6,
        o.range(0.18, 0.26),
        0.13,
        0.04,
        o.next() * 0.06,
      );
    }
    (n.particles
      .use(Mt.hitFlash)
      .tint(W.white, He.hot)
      .spawn(s, c * 0.6, i, 0, 0, 0, le.flashSkill, 1.2, 2),
      Ha(n, s, i, 10, 1.2, 4.2, W.dust, W.dustDark, 1.2, 0.75),
      Of(n, s, i, 5, 4, 5.5, 1.1, 0.24),
      n.light(s, i, 1.6, He.glow, 6, 8, 0.35),
      n.shake(bo(t, e) ? le.shakeSkill : 0.06, s, i));
  },
  SD = (n, t, e) => {
    const s = t.from ?? t.pos,
      i = s.x,
      a = s.y,
      o = t.unitId ?? -1,
      r = Nr(r8, "leapTime");
    (n.particles.use(Mt.hitFlash).tint(W.white, He.hot).spawn(i, 0.5, a, 0, 0, 0, le.flashSkill, 1.2, 1.9),
      bn(n, i, a, 2.5, 0.36, He.glow, 1.5, 0.15, 0.35),
      n.decals.add(Xt.cracks, i, a, 2, 1.1).params(0, 0.15).color(He.glow, 1.5).under(W.shadow, 0.85),
      Ha(n, i, a, 11, 0.5, 5.2, W.dust, W.dustDark, 1.4, 0.85),
      Of(n, i, a, 6, 4.5, 8, 0.5),
      yx(n, i, a, 2, 3.5, 6.5, 0.28),
      n.anchor(o) && (n.trail(o, $n.energy, r, 1.3, He.hot, He.deep), n.trail(o, $n.dust, r * 0.55, 0.4)),
      n.shake(t.unitId === e.playerId ? 0.15 : 0.08, i, a));
  },
  TD = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      a = t.radius ?? 4.5,
      o = n.rnd,
      r = Tx(n, t.unitId, o.next() * oe);
    (n.particles
      .use(Mt.hitFlash)
      .tint(He.hot, He.glow)
      .spawn(s, 0.8, i, 0, 0, 0, le.flashBig, a * 0.4, a * 0.7),
      n.particles
        .use(Mt.burst)
        .tint(He.hot)
        .spawn(s, 0.8, i, 0, 0, 0, 0.18, a * 0.5, a * 1.1),
      n.decals
        .add(Xt.shieldMark, s, i, a * 0.6, 1.9)
        .rot(r, 0.72)
        .params(1, 0.55)
        .color(He.hot, 2)
        .under(W.shadow, 0.85),
      bn(n, s, i, a * 0.5, 0.34, He.hot, 1.7, 0.15, 0.3),
      bn(n, s, i, a * 0.78, 0.42, He.glow, 1.8, 0.2, 0.35, 0.06),
      bn(n, s, i, a, 0.5, He.glow, 2.1, 0.3, 0.45, 0.12),
      l3(n, s, i, 6, a * 0.55, 1.7, 0.34, o.next() * oe, 7),
      l3(n, s, i, 6, a * 0.9, 1.5, 0.3, o.next() * oe, 5, 0.1),
      n.decals
        .add(Xt.cracks, s, i, a * 1.04, Nr(r8, "zoneDur") + 0.4)
        .params(0, 0.1)
        .color(He.glow, 1.25)
        .under(W.shadow, 0.9),
      yx(n, s, i, 4, 7, 9.5, 0.42),
      Of(n, s, i, 22, 8.5, 11, a * 0.5, 0.34),
      Ha(n, s, i, 16, a * 0.55, 6.5, W.dust, W.dustDark, 2.1, 1.2),
      Ni(n, s, 0.5, i, 6, a * 0.35, 2, W.dust, W.dustDark, 1),
      H0(n, s, 0.5, i, 8, 9, W.bronze, He.deep, 0, 0, 0, 0.4, 0.14),
      n.light(s, i, 2.2, He.glow, le.lightMax, 14, 0.35),
      n.shake(bo(t, e) ? 0.45 : 0.3, s, i));
  },
  ED = {
    panyue_passive_hit: _D,
    panyue_s1_dash: wD,
    panyue_s1_impact: MD,
    panyue_s2_cast: kD,
    panyue_ult_leap: SD,
    panyue_ult_land: TD,
  },
  Pn = ws.xingli,
  ld = { x: 2.3, y: 7.6, z: -1.7, time: 0.11 };

function Ex(n, t, e, s, i, a, o = 0.55) {
  const r = n.particles.use(Mt.mote),
    l = n.rnd,
    c = n.n(i);
  for (let f = 0; f < c; f++) {
    const d = l.next() * oe,
      h = l.range(-0.2, 1),
      u = Math.sqrt(Math.max(0, 1 - h * h)),
      m = a * l.range(0.35, 1);
    r.spawn(
      t,
      e,
      s,
      Math.cos(d) * u * m,
      h * m,
      Math.sin(d) * u * m,
      o * l.range(0.6, 1.2),
      0.22 * l.range(0.7, 1.3),
      0.05,
      l.range(0, 0.05),
    );
  }
}
export { zP, FP, UP, HP, $0, bo, _x, Nr, YP, eD, xD, yD, vD, bD, ED, Pn, ld, Ex };
