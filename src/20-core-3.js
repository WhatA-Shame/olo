// 20-core-3.js — core｜26 个顶层语句｜65KB
// 对应 game.pretty.js 第 38374–40647 行
// 关键内容：
//   Fb                    稍微朝相机拉近一点：贴在模型表面的图标不被模型吃掉
//   AD                    dashSpeed
//   VD                    hero
//   WD                    units
//   YD                    position
//   QD                    tower
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { ui } from './01-audio.js';
import { Se } from './02-data.js';
import { Ee, Pi } from './04-audio-2.js';
import { dt } from './05-three.js';
import { Ut } from './06-three-2.js';
import { An, No, Sn } from './07-three-3.js';
import { Cf, Gl, rx } from './08-three-4.js';
import { Bh, DI, Ft, ih, ji } from './16-render-5.js';
import { Fa, Lt, OI, W, XM, Xt, aP, bb, oe, qe, sn, ws } from './17-three-8.js';
import { $n, B1, H0, JM, KM, L0, Lr, Mm, Mt, Ni, QM, Sh, Th, U0, bn, bx, dP, jo, le, mkBananaGeo, rP, vs, wm, xo, xsPoleMat } from './18-core.js';
import { $0, ED, Ex, Nr, Pn, UP, YP, _x, bo, eD, ld, xD } from './19-core-2.js';

const AD = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      a = $0(n, t.targetId, 0.55, 1.1);
    (bx(n, s, i, 2.3, 0.6, Pn.glow, 3, 1.8, !1, 0.2),
      n.ribbons.trace($n.string, s, 5.2, i, s, 0.1, i, 0.06, W.stringGold, Pn.accent),
      n.glow
        .spawn(qe.pillar, sn.pillar, 0.42)
        .at(s, 0.05, i)
        .scale3(0.09, 4.6, 0.09, 0.05, 5.2, 0.05)
        .color(Pn.accent, 1.5, 0.9)
        .fade(0.05, 0.4)
        .opt(0.4, 0.5, 1),
      n.particles.use(Mt.hitFlash).tint(W.white, Pn.glow).spawn(s, a, i, 0, 0, 0, le.flashSkill, 1.3, 2.1));
    const o = n.particles.use(Mt.ringB).tint(Pn.hot, Pn.glow);
    (o.spawn(s, a, i, 0, 0, 0, 0.3, 0.6, 2.4),
      o.spawn(s, a, i, 0, 0, 0, 0.34, 0.4, 1.8, 0.08),
      Ex(n, s, a, i, 10, 4.2),
      n.light(s, i, a, Pn.glow, 6, 7, 0.3),
      n.shake(bo(t, e) ? le.shakeSkill : 0.06, s, i));
  },
  RD = (n, t) => {
    const e = t.dir?.x ?? 1,
      s = t.dir?.y ?? 0,
      i = Math.atan2(s, e),
      a = t.pos.x + e * 0.8,
      o = t.pos.y + s * 0.8,
      r = 1.45;
    (n.particles.use(Mt.hitFlash).tint(W.white, Pn.glow).spawn(a, r, o, 0, 0, 0, le.flashBasic, 0.8, 1.3),
      n.glow
        .spawn(qe.hoop, sn.hoop, 0.26)
        .at(a, r, o)
        .vel(e * 8, 0, s * 8)
        .rot(0, -i, -Math.PI / 2)
        .scale(0.22, 1.05)
        .color(Pn.glow, 1.8, 0.9)
        .fade(0.1, 0.4));
    const l = n.particles.use(Mt.wave).tint(Pn.hot, Pn.glow);
    (l.spawn(a, r, o, e * 9, 0, s * 9, 0.24, 0.9, 1.7),
      l.spawn(a, r, o, e * 6, 0, s * 6, 0.28, 0.7, 1.4, 0.05));
    const c = n.particles.use(Mt.string);
    for (let f = 0; f < 4; f++) {
      const d = (f - 1.5) * 0.17;
      c.spawn(
        a - s * d - e * 0.3,
        r + (f - 1.5) * 0.05,
        o + e * d - s * 0.3,
        e * 17,
        0,
        s * 17,
        0.15,
        0.07,
        0.03,
        f * 0.012,
      );
    }
    n.decals
      .add(Xt.streak, a + e * 1.5, o + s * 1.5, 1.9, 0.26)
      .rot(i, 0.14)
      .params(0, 6)
      .color(Pn.accent, 1.2, 0.8)
      .under(W.black, 0);
  },
  CD = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      a = t.radius ?? 3.4,
      o = n.rnd;
    n.decals.add(Xt.ring, s, i, a, 0.26).params(1, 0.08).color(Pn.glow, 1.9).under(Pn.dark, 0.35);
    const r = n.particles.use(Mt.string),
      l = o.next() * oe;
    for (let c = 0; c < 8; c++) {
      const f = l + (c * oe) / 8,
        d = (a * 0.92) / 0.1;
      r.spawn(
        s + Math.cos(f) * a,
        0.55,
        i + Math.sin(f) * a,
        -Math.cos(f) * d,
        0,
        -Math.sin(f) * d,
        0.1,
        0.07,
        0.03,
        c * 0.004,
      );
    }
    n.after(0.1, () => {
      (n.particles
        .use(Mt.hitFlash)
        .tint(W.white, Pn.glow)
        .spawn(s, 0.9, i, 0, 0, 0, le.flashSkill, a * 0.5, a * 0.85),
        wm(n, s, 0.7, i, a * 0.2, a * 0.98, 0.6, 0.3, Pn.hot, 1.9, 0.9),
        bn(n, s, i, a, 0.4, Pn.glow, 1.6, 0.12, 0.25),
        bx(n, s, i, a * 0.72, 0.45, Pn.accent, 2, 1.3, !1, 0.2, 0.04),
        Lr(n, s, i, 0.22, 5.5, 0.32, Pn.hot, 1.6, 0.6),
        Mm(n, s, 1.1, i, 3, 2.4),
        Ex(n, s, 1, i, 10, 5),
        n.light(s, i, 1.8, Pn.glow, le.lightMax, a * 2.4, 0.35),
        n.shake(bo(t, e) ? le.shakeSkill : 0.06, s, i));
    });
  },
  LD = (n, t) => {
    const e = t.unitId ?? -1,
      s = n.anchor(e),
      i = s ? n.a.x : t.pos.x,
      a = s ? n.a.z : t.pos.y,
      o = s && n.a.unit ? n.a.unit.facing : 0,
      r = Math.cos(o),
      l = Math.sin(o),
      c = n.decals.add(Xt.moon, i, a, 2.1, 1.1).params(0.7, 1).color(Pn.hot, 1.5).under(Pn.dark, 0.35);
    s && c.follow(e);
    const f = Lr(n, s ? 0 : i, s ? 0 : a, 0.18, 9, 0.6, Pn.hot, 1.5, 0.55);
    s && f.follow(e);
    for (let h = 0; h < 2; h++) {
      const u = wm(n, s ? 0 : i, 0.3, s ? 0 : a, 1.2 - h * 0.3, 0.55, 5, 0.55, Pn.glow, 1.8, 0.85).delay(
        h * 0.12,
      );
      s && u.follow(e);
    }
    const d = n.lowQ ? 3 : 5;
    for (let h = 0; h < d; h++) {
      const u = Math.ceil(h / 2),
        m = h === 0 ? 0 : h % 2 === 1 ? 1 : -1,
        x = i - r * (1.6 + u * 0.9) - l * m * u * 0.8,
        p = a - l * (1.6 + u * 0.9) + r * m * u * 0.8;
      B1(n, x, 3.3 + u * 0.12, p, r * 12, -1.3, l * 12, 0.62, 1, 1.05, 0.05 + u * 0.03);
    }
    (Ex(n, i, 1.4, a, 8, 2.6, 0.7),
      n.particles.use(Mt.hitFlash).tint(W.white, Pn.glow).spawn(i, 1.6, a, 0, 0, 0, le.flashSkill, 1, 1.7),
      n.light(i, a, 2.2, Pn.glow, 6, 8, 0.35));
  },
  ID = (n, t) => {
    const e = t.pos.x,
      s = t.pos.y,
      i = t.radius ?? 1.7,
      a = n.rnd,
      o = ld.x + a.signed() * 0.5,
      r = ld.z + a.signed() * 0.5,
      l = ld.time,
      c = -o / l,
      f = -7.1 / l,
      d = -r / l;
    B1(n, e + o, ld.y, s + r, c, f, d, l, 2.05, 1.08);
    const h = Math.hypot(o, r) || 1,
      u = (-r / h) * 0.72,
      m = (o / h) * 0.72;
    for (const x of [1, -1])
      n.ribbons.trace(
        $n.thin,
        e + o * 0.28 + u * x,
        ld.y * 0.28 + 0.4,
        s + r * 0.28 + m * x,
        e + u * x,
        0.55,
        s + m * x,
        l * 0.28,
        Pn.hot,
        Pn.glow,
      );
    n.after(l, () => {
      (n.particles
        .use(Mt.hitFlash)
        .tint(W.white, Pn.glow)
        .spawn(e, 0.5, s, 0, 0, 0, le.flashSkill, i * 0.7, i * 1.2),
        B1(n, e, 0.6, s, c * 0.012, f * 0.012, d * 0.012, 0.32, 2, 1.3),
        bn(n, e, s, i, 0.36, Pn.glow, 1.8, 0.15, 0.3),
        bx(n, e, s, i * 0.62, 0.42, Pn.accent, 1, 1.5, !1, 0.16, 0.03),
        Ni(n, e, 0.15, s, 2, 0.4, 1, W.sand, W.sandDark, 0.5),
        Mm(n, e, 0.9, s, 3, 1.6),
        n.light(e, s, 1.2, Pn.glow, 4, 6, 0.25),
        n.shake(0.08, e, s));
    });
  },
  PD = {
    xingli_passive_burst: AD,
    xingli_s1_cast: RD,
    xingli_s2_burst: CD,
    xingli_ult_cast: LD,
    xingli_meteor: ID,
  },
  Mu = ws.mushroom,
  mSD = (n, t) => {
    const e = t.pos.x,
      s = t.pos.y,
      i = t.dir?.x ?? 1,
      a = t.dir?.y ?? 0,
      o = Math.atan2(a, i),
      r = n.rnd;
    (n.decals.add(Xt.ring, e, s, 1.7, 0.4).params(1, 0.1).color(Mu.glow, 1.8).under(W.shadow, 0.32),
      n.decals.add(Xt.zone, e, s, 2.3, 0.45).params(14, 0).color(Mu.accent, 1.3, 0.7).under(W.shadow, 0.26));
    const l = n.particles.use(Mt.dust);
    for (let c = 0; c < 14; c++) {
      const f = o + Math.PI + (r.next() - 0.5) * 1.5,
        d = r.range(0.3, 1.5);
      l.spawn(
        e + Math.cos(f) * d,
        r.range(0.2, 1),
        s + Math.sin(f) * d,
        Math.cos(f) * r.range(2, 5),
        r.range(0.6, 2.2),
        Math.sin(f) * r.range(2, 5),
        0.45,
        0.6,
        1.5,
      );
    }
    n.light(e, s, 1.2, Mu.glow, 4, 5, 0.3);
  },
  mTD = (n, t) => {
    const e = t.pos.x,
      s = t.pos.y,
      i = n.rnd;
    n.decals.add(Xt.ring, e, s, 1.3, 0.34).params(1, 0.12).color(Mu.accent, 1.2).under(W.shadow, 0.24);
    const a = n.particles.use(Mt.dust);
    for (let o = 0; o < 5; o++) {
      const r = i.next() * Math.PI * 2,
        l = i.range(0.2, 1.1);
      a.spawn(
        e + Math.cos(r) * l,
        i.range(0.15, 0.7),
        s + Math.sin(r) * l,
        Math.cos(r) * i.range(0.8, 2.4),
        i.range(0.4, 1.4),
        Math.sin(r) * i.range(0.8, 2.4),
        0.35,
        0.45,
        1.3,
      );
    }
    n.light(e, s, 0.8, Mu.glow, 3, 3.5, 0.2);
  },
  mQD = (n, t) => {
    const e = t.pos.x,
      s = t.pos.y,
      i = t.radius ?? 2.4;
    (n.decals.add(Xt.ring, e, s, i, 0.32).params(1, 0.1).color(Mu.hot, 1.8).under(W.shadow, 0.35),
      n.decals.add(Xt.zone, e, s, i * 0.8, 0.4).params(14, 0).color(Mu.glow, 1.5, 0.75).under(W.shadow, 0.3));
    const a = n.particles.use(Mt.dust),
      o = n.rnd;
    for (let r = 0; r < 16; r++) {
      const l = o.next() * Math.PI * 2,
        c = o.range(0.4, i);
      a.spawn(
        e + Math.cos(l) * c,
        o.range(0.2, 0.9),
        s + Math.sin(l) * c,
        Math.cos(l) * o.range(1, 3.2),
        o.range(0.6, 2.4),
        Math.sin(l) * o.range(1, 3.2),
        0.5,
        0.7,
        1.5,
      );
    }
    (n.light(e, s, 1, Mu.glow, 6, i * 2.4, 0.35), n.shake(0.16, e, s));
  },
  mJD = (n, t) => {
    const e = t.pos.x,
      s = t.pos.y,
      i = t.dir?.x ?? 1,
      a = t.dir?.y ?? 0,
      o = Math.atan2(a, i),
      r = t.radius ?? 6.2,
      l = t.angle ?? 1.6,
      h = l / 2,
      f = n.rnd;
    (n.decals.add(Xt.cone, e, s, r, 0.85).rot(o).params(h, 0.12).color(Mu.glow, 2.1).under(W.shadow, 0.36),
      n.decals.add(Xt.cone, e, s, r * 0.6, 0.7).rot(o).params(h * 0.92, 0.04).color(Mu.hot, 1.3).under(W.shadow, 0.24));
    const c = n.particles.use(Mt.streak).tint(W.white, Mu.accent),
      u = n.n(12);
    for (let d = 0; d < u; d++) {
      const m = f.next(),
        x = o + h - l * m,
        p = r * f.range(0.3, 0.95);
      c.spawn(
        e + Math.cos(x) * p,
        f.range(0.4, 1.2),
        s + Math.sin(x) * p,
        Math.cos(x) * f.range(4, 9),
        f.range(0.2, 0.9),
        Math.sin(x) * f.range(4, 9),
        0.3,
        0.09,
        0.05,
        m * 0.1,
      );
    }
    const g = n.particles.use(Mt.dust),
      y = n.n(9);
    for (let d = 0; d < y; d++) {
      const m = f.next(),
        x = o + h - l * m,
        p = r * f.range(0.25, 0.8);
      g.spawn(
        e + Math.cos(x) * p,
        f.range(0.5, 1.4),
        s + Math.sin(x) * p,
        Math.cos(x) * f.range(0.8, 2),
        f.range(0.2, 0.8),
        Math.sin(x) * f.range(0.8, 2),
        0.8,
        0.55,
        1.6,
      );
    }
    // 孢子气泡：从嘴里滚出来、边飘边胀破的一串半透明泡泡
    const P = n.particles.use(Mt.bubble),
      O = n.n(7);
    for (let d = 0; d < O; d++) {
      const m = f.next(),
        x = o + h * 0.75 - l * 0.75 * m,
        p = r * f.range(0.15, 0.8);
      P.spawn(
        e + Math.cos(x) * p,
        f.range(0.55, 1.7),
        s + Math.sin(x) * p,
        Math.cos(x) * f.range(1.2, 3.4),
        f.range(0.2, 1.1),
        Math.sin(x) * f.range(1.2, 3.4),
        f.range(0.35, 0.62),
        f.range(0.22, 0.5),
        f.range(0.9, 1.5),
      );
    }
    n.light(e + i * r * 0.45, s + a * r * 0.45, 1.4, Mu.glow, 5, r * 1.5, 0.34);
  },
  mZD = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      a = t.radius ?? 4.6,
      o = n.rnd;
    (n.decals.add(Xt.ring, s, i, a, 0.42).params(1, 0.12).color(Mu.hot, 2).under(W.shadow, 0.45),
      n.decals.add(Xt.zone, s, i, a, 0.5).params(16, 0).color(Mu.glow, 1.6, 0.8).under(W.shadow, 0.4),
      n.decals.add(Xt.ring, s, i, a * 0.55, 0.5).params(1, 0.1).color(Mu.accent, 1.6).under(W.shadow, 0.3));
    const r = n.particles.use(Mt.dust);
    for (let l = 0; l < 24; l++) {
      const c = o.next() * Math.PI * 2,
        f = o.range(0.5, a);
      r.spawn(
        s + Math.cos(c) * f,
        o.range(0.2, 1.2),
        i + Math.sin(c) * f,
        Math.cos(c) * o.range(1.5, 4.5),
        o.range(0.8, 3),
        Math.sin(c) * o.range(1.5, 4.5),
        0.6,
        0.8,
        1.8,
      );
    }
    (n.light(s, i, 1, Mu.glow, le.lightMax, a * 2.6, 0.45), n.shake(bo(t, e) ? 0.5 : 0.3, s, i));
  },
  mXD = (n, t) => {
    const e = t.pos.x,
      s = t.pos.y,
      i = n.rnd;
    (n.decals.add(Xt.ring, e, s, 1.5, 1.6).params(1, 0.06).color(Mu.accent, 1.4, 0.7).under(W.shadow, 0.3),
      n.decals.add(Xt.zone, e, s, 1.1, 1.6).params(12, 0.2).color(Mu.glow, 1.2, 0.6).under(W.shadow, 0.25));
    const a = n.particles.use(Mt.dust);
    for (let o = 0; o < 14; o++) {
      const r = i.next() * Math.PI * 2,
        l = i.range(0.5, 1.5);
      a.spawn(
        e + Math.cos(r) * l,
        i.range(0.1, 0.4),
        s + Math.sin(r) * l,
        -Math.cos(r) * i.range(0.4, 1.2),
        i.range(1.6, 3.2),
        -Math.sin(r) * i.range(0.4, 1.2),
        1.3,
        0.5,
        1.4,
      );
    }
    n.light(e, s, 1, Mu.accent, 5, 5, 1.5);
  },
  mBD = (n, t) => {
    // 被动「菌丝缠缚」炸开：目标身上一圈菌丝 + 自己身上一层护盾光
    const e = t.pos.x,
      s = t.pos.y,
      i = n.rnd;
    (n.decals.add(Xt.ring, e, s, 1.9, 0.34).params(1, 0.08).color(Mu.accent, 1.9).under(W.shadow, 0.34),
      n.decals.add(Xt.zone, e, s, 1.1, 0.36).params(10, 0.1).color(Mu.glow, 1.4, 0.7).under(W.shadow, 0.28));
    const a = n.particles.use(Mt.wisp);
    for (let o = 0; o < 12; o++) {
      const r = i.next() * Math.PI * 2,
        l = i.range(0.3, 1.2);
      a.spawn(
        e + Math.cos(r) * l,
        i.range(0.3, 1.4),
        s + Math.sin(r) * l,
        -Math.cos(r) * i.range(0.6, 2),
        i.range(0.8, 2.4),
        -Math.sin(r) * i.range(0.6, 2),
        0.55,
        0.5,
        0.9,
      );
    }
    n.light(e, s, 1, Mu.accent, 4, 4, 0.28);
  },
  mMD = {
    mushroom_s1_dash: mSD,
    mushroom_s1_trail: mTD,
    mushroom_s1_impact: mQD,
    mushroom_s2_spray: mJD,
    mushroom_passive_burst: mBD,
    mushroom_ult_land: mZD,
    mushroom_ult_charge: mXD,
  },
  Xs = ws.xuesong,
  xBC = (n, t) => {
    const e = t.pos.x,
      s = t.pos.y,
      i = t.dir?.x ?? 1,
      a = t.dir?.y ?? 0,
      o = Math.atan2(a, i),
      r = t.radius ?? 5.8,
      l = t.angle ?? 1.18,
      h = l / 2,
      f = n.rnd;
    (n.decals.add(Xt.cone, e, s, r, 0.42).rot(o).params(h, 0.16).color(Xs.accent, 2.0, 0.92).under(W.shadow, 0.36),
      n.decals.add(Xt.cone, e, s, r * 0.72, 0.34).rot(o).params(h * 0.9, 0.08).color(Xs.hot, 1.6, 0.85).under(W.shadow, 0.2));
    const c = n.particles.use(Mt.dust).tint(W.sand, Xs.accent);
    for (let d = 0; d < 14; d++) {
      const m = f.next(),
        x = o + h - l * m,
        p = r * f.range(0.25, 0.95);
      c.spawn(
        e + Math.cos(x) * p,
        f.range(0.25, 1.1),
        s + Math.sin(x) * p,
        Math.cos(x) * f.range(2.2, 5.2),
        f.range(0.8, 2.2),
        Math.sin(x) * f.range(2.2, 5.2),
        0.48,
        0.55,
        1.3,
      );
    }
    (n.light(e + i * r * 0.45, s + a * r * 0.45, 1.2, Xs.accent, 5, r * 1.4, 0.28), n.shake(0.14, e, s));
  },
  xDG = (n, t) => {
    const e = t.pos.x,
      s = t.pos.y,
      r = t.radius ?? 2.2,
      i = n.rnd;
    (n.decals.add(Xt.ring, e, s, r, 1.9).params(1, 0.1).color(Xs.accent, 1.5, 0.8).under(W.shadow, 0.3),
      n.decals.add(Xt.zone, e, s, r * 0.85, 1.9).params(10, 0.12).color(W.sand, 1.1, 0.55).under(Xs.dark, 0.28));
    const a = n.particles.use(Mt.dust).tint(W.sand, W.dustDark);
    for (let o = 0; o < 16; o++) {
      const l = i.next() * Math.PI * 2,
        c = i.range(0.2, r * 0.8);
      a.spawn(
        e + Math.cos(l) * c,
        0.2,
        s + Math.sin(l) * c,
        Math.cos(l) * i.range(1.0, 2.6),
        i.range(1.6, 3.2),
        Math.sin(l) * i.range(1.0, 2.6),
        0.75,
        0.55,
        1.4,
      );
    }
  },
  xPO = (n, t) => {
    const e = t.pos.x,
      s = t.pos.y,
      r = t.radius ?? 2.2,
      i = n.rnd;
    (n.decals.add(Xt.ring, e, s, r * 1.2, 0.45).params(1, 0.14).color(Xs.hot, 2.0).under(W.shadow, 0.4),
      n.light(e, s, 1, Xs.accent, 5, r * 2.2, 0.35),
      n.shake(0.18, e, s));
    const a = n.particles.use(Mt.dust).tint(W.sand, Xs.accent);
    for (let o = 0; o < 20; o++) {
      const l = i.next() * Math.PI * 2,
        c = i.range(0.3, r);
      a.spawn(
        e + Math.cos(l) * c,
        0.25,
        s + Math.sin(l) * c,
        Math.cos(l) * i.range(1.8, 4.4),
        i.range(1.4, 3.6),
        Math.sin(l) * i.range(1.8, 4.4),
        0.65,
        0.65,
        1.5,
      );
    }
  },
  xST = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      to = t.to ?? t.targetPos ?? t.pos,
      r = n.rnd,
      a = n.particles.use(Mt.dust).tint(W.sand, Xs.hot),
      m = n.particles.use(Mt.mote).tint(Xs.hot, Xs.accent);
    // 抛沙弧线光带与飞溅沙团
    (n.ribbons.trace($n.energy, s, 1.15, i, to.x, 0.9, to.y, 0.34, Xs.hot, W.sand),
      n.ribbons.trace($n.thin, s, 1.35, i, to.x, 1.05, to.y, 0.3, Xs.accent, W.sand),
      n.decals.add(Xt.ring, s, i, 1.6, 0.32).params(1, 0.16).color(W.sand, 1.8).under(Xs.dark, 0.3),
      n.light(s, i, 1.2, Xs.accent, 5, 6, 0.28));
    for (let o = 0; o < 28; o++) {
      const f = o / 27,
        px = s + (to.x - s) * f,
        pz = i + (to.y - i) * f,
        py = 0.75 + 4 * 1.9 * f * (1 - f);
      a.spawn(
        px + r.signed() * 0.36,
        py + r.signed() * 0.18,
        pz + r.signed() * 0.36,
        (to.x - s) * 0.85 + r.signed() * 1.2,
        r.range(0.6, 2.1),
        (to.y - i) * 0.85 + r.signed() * 1.2,
        0.58,
        r.range(0.45, 0.78),
        1.45,
      );
      if (o % 2 === 0)
        m.spawn(
          px + r.signed() * 0.3,
          py,
          pz + r.signed() * 0.3,
          (to.x - s) * 0.9 + r.signed() * 1.5,
          r.range(0.8, 2.6),
          (to.y - i) * 0.9 + r.signed() * 1.5,
          0.42,
          0.26,
          0.12,
        );
    }
    bo(t, e) && n.shake(0.14, s, i);
  },
  xSB = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      r = t.radius ?? 3.0,
      o = n.rnd;
    (n.decals.add(Xt.ring, s, i, r * 1.15, 0.62).params(1, 0.18).color(Xs.hot, 2.6, 0.95).under(W.shadow, 0.45),
      n.decals.add(Xt.swirl, s, i, r * 1.05, 1.35).params(3, 3.8).color(Xs.accent, 2.0, 0.88).under(Xs.dark, 0.38),
      n.decals.add(Xt.zone, s, i, r * 0.98, 1.65).params(14, 0.12).color(W.sand, 1.85, 0.88).under(W.shadow, 0.36));
    const a = n.particles.use(Mt.dust).tint(W.sand, Xs.hot),
      m = n.particles.use(Mt.mote).tint(Xs.hot, Xs.accent);
    for (let l = 0; l < 36; l++) {
      const c = o.next() * Math.PI * 2,
        d = o.range(0.15, r * 0.95);
      a.spawn(
        s + Math.cos(c) * d,
        o.range(0.25, 1.9),
        i + Math.sin(c) * d,
        Math.cos(c) * o.range(1.8, 5.2),
        o.range(0.9, 3.4),
        Math.sin(c) * o.range(1.8, 5.2),
        1.15,
        o.range(0.65, 1.05),
        2.1,
      );
    }
    for (let l = 0; l < 18; l++) {
      const c = o.next() * Math.PI * 2,
        d = o.range(0.2, r * 0.85);
      m.spawn(
        s + Math.cos(c) * d,
        o.range(0.3, 1.6),
        i + Math.sin(c) * d,
        Math.cos(c) * o.range(2.2, 5.8),
        o.range(1.2, 3.6),
        Math.sin(c) * o.range(2.2, 5.8),
        0.55,
        0.32,
        0.14,
      );
    }
    (n.light(s, i, 1.4, Xs.hot, le.lightMax, r * 2.4, 0.45), n.shake(bo(t, e) ? 0.34 : 0.18, s, i));
  },
  xBM = (n, t) => {
    const e = t.pos.x,
      s = t.pos.y,
      i = n.rnd,
      a = n.particles.use(Mt.dust).tint(W.sand, W.white);
    for (let o = 0; o < 6; o++) {
      const l = i.next() * Math.PI * 2;
      a.spawn(e + Math.cos(l) * 0.35, 1.4, s + Math.sin(l) * 0.35, Math.cos(l) * 1.4, i.range(0.6, 1.2), Math.sin(l) * 1.4, 0.35, 0.32, 0.8);
    }
  },
  xPU = (n, t) => {
    const e = t.pos.x,
      s = t.pos.y,
      i = n.rnd;
    (n.decals.add(Xt.ring, e, s, 2.2, 0.45).params(1, 0.1).color(Xs.glow, 2.0).under(Xs.deep, 0.35),
      n.light(e, s, 2.6, Xs.glow, 6, 7, 0.4));
    const a = n.particles.use(Mt.wisp).tint(Xs.glow, Xs.hot);
    for (let o = 0; o < 14; o++) {
      const l = i.next() * Math.PI * 2;
      a.spawn(e + Math.cos(l) * 0.7, 0.3, s + Math.sin(l) * 0.7, Math.cos(l) * 0.8, i.range(2.6, 4.8), Math.sin(l) * 0.8, 0.55, 0.45, 0.8);
    }
  },
  xSL = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      r = t.radius ?? 3.8,
      o = n.rnd;
    (n.decals.add(Xt.ring, s, i, r, 0.52).params(1, 0.14).color(Xs.glow, 2.2).under(Xs.deep, 0.4),
      n.decals.add(Xt.zone, s, i, r * 0.92, 0.6).params(16, 0.1).color(Xs.hot, 1.5, 0.75).under(Xs.deep, 0.3));
    const a = n.particles.use(Mt.wisp).tint(Xs.glow, W.white);
    for (let l = 0; l < 22; l++) {
      const c = o.next() * Math.PI * 2,
        f = o.range(0.4, r);
      a.spawn(s + Math.cos(c) * f, o.range(0.2, 1.2), i + Math.sin(c) * f, Math.cos(c) * 1.4, o.range(1.2, 2.8), Math.sin(c) * 1.4, 0.65, 0.55, 1.0);
    }
    (n.light(s, i, 1.3, Xs.glow, 7, r * 2.4, 0.42), n.shake(bo(t, e) ? 0.28 : 0.15, s, i));
  },
  xUS = (n, t) => {
    const e = t.pos.x,
      s = t.pos.y,
      i = n.rnd;
    (n.decals.add(Xt.ring, e, s, 2.4, 0.42).params(1, 0.14).color(Xs.accent, 2.2).under(W.shadow, 0.38),
      n.light(e, s, 1.8, Xs.accent, 6, 6, 0.36));
    const a = n.particles.use(Mt.spark).tint(Xs.hot, Xs.accent);
    for (let o = 0; o < 14; o++) {
      const l = i.next() * Math.PI * 2;
      a.spawn(e + Math.cos(l) * 0.8, 0.4, s + Math.sin(l) * 0.8, Math.cos(l) * 1.5, i.range(2.4, 4.6), Math.sin(l) * 1.5, 0.4, 0.16, 0.06);
    }
  },
  xUT = (n, t) => {
    const e = t.pos.x,
      s = t.pos.y,
      to = t.to ?? t.pos,
      i = n.rnd,
      a = n.particles.use(Mt.streak).tint(Xs.hot, Xs.glow);
    for (let o = 0; o < 12; o++) {
      const f = o / 11;
      a.spawn(
        e + (to.x - e) * f,
        1.1 + 4 * 2.2 * f * (1 - f),
        s + (to.y - s) * f,
        (to.x - e) * 0.7,
        i.range(0.4, 1.4),
        (to.y - s) * 0.7,
        0.35,
        0.12,
        0.05,
      );
    }
  },
  xUL = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      r = t.radius ?? 2.6,
      o = n.rnd;
    (n.decals.add(Xt.ring, s, i, r, 0.48).params(1, 0.16).color(Xs.hot, 2.4).under(W.shadow, 0.48),
      n.decals.add(Xt.zone, s, i, r * 0.9, 0.55).params(14, 0.08).color(Xs.accent, 1.8, 0.85).under(W.shadow, 0.36));
    const a = n.particles.use(Mt.dust).tint(W.sand, Xs.accent);
    for (let l = 0; l < 24; l++) {
      const c = o.next() * Math.PI * 2,
        f = o.range(0.3, r);
      a.spawn(s + Math.cos(c) * f, o.range(0.2, 1.1), i + Math.sin(c) * f, Math.cos(c) * o.range(2, 5.2), o.range(1.0, 3.2), Math.sin(c) * o.range(2, 5.2), 0.65, 0.75, 1.7);
    }
    (n.light(s, i, 1.2, Xs.hot, le.lightMax, r * 2.6, 0.44), n.shake(bo(t, e) ? 0.46 : 0.26, s, i));
  },
  xMD = {
    xuesong_basic_cone: xBC,
    xuesong_dig_start: xDG,
    xuesong_pit_open: xPO,
    xuesong_sand_throw: xST,
    xuesong_sand_burst: xSB,
    xuesong_blind_miss: xBM,
    xuesong_pole_up: xPU,
    xuesong_s2_land: xSL,
    xuesong_ult_scoop: xUS,
    xuesong_ult_throw: xUT,
    xuesong_ult_land: xUL,
  },
  St = ws.stone,
  sPH = (n, t) => {
    const e = t.pos.x,
      s = t.pos.y,
      i = n.rnd;
    (n.decals.add(Xt.ring, e, s, 2.0, 0.36).params(1, 0.16).color(St.hot, 2.2).under(W.shadow, 0.35),
      n.light(e, s, 1.2, St.accent, 6, 5.5, 0.28),
      n.shake(0.22, e, s));
    const a = n.particles.use(Mt.spark).tint(St.hot, St.accent);
    for (let o = 0; o < 14; o++) {
      const l = i.next() * Math.PI * 2;
      a.spawn(e, 1.0, s, Math.cos(l) * i.range(2.2, 5.5), i.range(1.0, 3.2), Math.sin(l) * i.range(2.2, 5.5), 0.38, 0.18, 0.06);
    }
  },
  sTD = (n, t) => {
    const e = t.pos.x,
      s = t.pos.y,
      i = n.rnd;
    (n.decals.add(Xt.ring, e, s, 2.8, 0.55).params(1, 0.14).color(St.glow, 2.3).under(St.dark, 0.4),
      n.light(e, s, 1.8, St.glow, 7, 7, 0.42));
    const a = n.particles.use(Mt.wisp).tint(St.hot, St.accent);
    for (let o = 0; o < 18; o++) {
      const l = i.next() * Math.PI * 2;
      a.spawn(e + Math.cos(l) * 0.9, 0.3, s + Math.sin(l) * 0.9, Math.cos(l) * 1.1, i.range(2.2, 4.6), Math.sin(l) * 1.1, 0.6, 0.52, 0.8);
    }
  },
  sTE = (n, t) => {
    const e = t.pos.x,
      s = t.pos.y,
      i = n.rnd;
    (n.decals.add(Xt.ring, e, s, 1.9, 0.42).params(1, 0.15).color(St.accent, 2.0).under(W.shadow, 0.35),
      n.light(e, s, 1.2, St.accent, 5, 5, 0.3));
    const a = n.particles.use(Mt.spark).tint(St.hot, W.rock);
    for (let o = 0; o < 12; o++) {
      const l = i.next() * Math.PI * 2;
      a.spawn(e + Math.cos(l) * 0.6, 0.9, s + Math.sin(l) * 0.6, Math.cos(l) * 2.2, i.range(0.8, 2.4), Math.sin(l) * 2.2, 0.35, 0.14, 0.05);
    }
  },
  sCR = (n, t) => {
    const e = t.pos.x,
      s = t.pos.y,
      i = n.rnd;
    (n.decals.add(Xt.ring, e, s, 2.4, 0.48).params(1, 0.14).color(St.hot, 2.2).under(W.shadow, 0.4),
      n.light(e, s, 1.5, St.hot, 6, 6, 0.35));
    const a = n.particles.use(Mt.dust).tint(St.accent, W.rock);
    for (let o = 0; o < 14; o++) {
      const l = i.next() * Math.PI * 2;
      a.spawn(e + Math.cos(l) * 0.7, 0.5, s + Math.sin(l) * 0.7, Math.cos(l) * 1.6, i.range(1.8, 3.6), Math.sin(l) * 1.6, 0.55, 0.48, 0.9);
    }
  },
  sTH = (n, t) => {
    const e = t.pos.x,
      s = t.pos.y,
      to = t.to ?? t.pos,
      i = n.rnd,
      a = n.particles.use(Mt.dust).tint(W.rock, St.accent);
    for (let o = 0; o < 14; o++) {
      const f = o / 13;
      a.spawn(
        e + (to.x - e) * f,
        0.9 + 4 * 2.1 * f * (1 - f),
        s + (to.y - s) * f,
        (to.x - e) * 0.6,
        i.range(0.4, 1.4),
        (to.y - s) * 0.6,
        0.42,
        0.52,
        1.1,
      );
    }
  },
  sTL = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      r = t.radius ?? 2.6,
      o = n.rnd;
    (n.decals.add(Xt.ring, s, i, r, 0.5).params(1, 0.18).color(St.hot, 2.4).under(W.shadow, 0.46),
      n.decals.add(Xt.scorch, s, i, r * 0.88, 1.2).params(0, 0).color(W.rock, 0.9, 0.72).under(St.dark, 0.55));
    const a = n.particles.use(Mt.dust).tint(W.rock, St.accent);
    for (let l = 0; l < 24; l++) {
      const c = o.next() * Math.PI * 2,
        f = o.range(0.3, r);
      a.spawn(s + Math.cos(c) * f, o.range(0.2, 1.0), i + Math.sin(c) * f, Math.cos(c) * o.range(2.2, 5.6), o.range(1.2, 3.6), Math.sin(c) * o.range(2.2, 5.6), 0.68, 0.76, 1.6);
    }
    (n.light(s, i, 1.2, St.hot, le.lightMax, r * 2.5, 0.42), n.shake(bo(t, e) ? 0.45 : 0.24, s, i));
  },
  sUL = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      r = t.radius ?? 3.4,
      o = n.rnd;
    (n.decals.add(Xt.ring, s, i, r * 1.08, 0.6).params(1, 0.2).color(St.hot, 2.6).under(W.shadow, 0.55),
      n.decals.add(Xt.zone, s, i, r * 0.95, 0.9).params(14, 0.1).color(St.accent, 1.9, 0.85).under(St.dark, 0.45),
      n.decals.add(Xt.scorch, s, i, r * 0.85, 2.2).params(0, 0).color(W.rock, 0.95, 0.8).under(St.dark, 0.65));
    const a = n.particles.use(Mt.dust).tint(W.rock, St.accent);
    for (let l = 0; l < 32; l++) {
      const c = o.next() * Math.PI * 2,
        f = o.range(0.4, r);
      a.spawn(s + Math.cos(c) * f, o.range(0.2, 1.2), i + Math.sin(c) * f, Math.cos(c) * o.range(2.8, 6.8), o.range(1.6, 4.4), Math.sin(c) * o.range(2.8, 6.8), 0.78, 0.9, 1.9);
    }
    (n.light(s, i, 1.5, St.hot, le.lightMax, r * 3, 0.52), n.shake(bo(t, e) ? 0.65 : 0.35, s, i));
  },
  sMD = {
    stone_passive_hit: sPH,
    stone_train_done: sTD,
    stone_tether: sTE,
    stone_corpse_ready: sCR,
    stone_throw: sTH,
    stone_throw_land: sTL,
    stone_ult_land: sUL,
  },
  Sc = ws.scallion,
  scS1 = (n, t, e) => {
    const s = t.from ?? t.pos,
      i = t.to ?? t.pos,
      w = t.width ?? 2.3,
      p = t.passive ? 0.72 : 1,
      o = n.rnd;
    let dx = i.x - s.x,
      dz = i.y - s.y;
    const len = Math.hypot(dx, dz) || 1;
    ((dx /= len), (dz /= len));
    const px = -dz,
      pz = dx;
    (n.ribbons.trace($n.energy, s.x, 0.92, s.y, i.x, 0.92, i.y, 0.24, Sc.hot, Sc.glow),
      n.ribbons.trace($n.thin, s.x + px * 0.45, 0.85, s.y + pz * 0.45, i.x + px * 0.55, 0.85, i.y + pz * 0.55, 0.22, Sc.accent, Sc.deep),
      n.ribbons.trace($n.thin, s.x - px * 0.45, 0.85, s.y - pz * 0.45, i.x - px * 0.55, 0.85, i.y - pz * 0.55, 0.22, Sc.accent, Sc.deep),
      JM(n, s.x, s.y, i.x, i.y, w * 0.55 * p, 0.45, 0.28, Sc.glow, 1.9 * p, 0.82),
      n.decals.add(Xt.ring, i.x, i.y, 1.2 * p, 0.32).params(1, 0.14).color(Sc.hot, 1.8 * p).under(Sc.dark, 0.35));
    const a = n.particles.use(Mt.mote).tint(Sc.hot, Sc.glow);
    for (let l = 0; l < (t.passive ? 10 : 18); l++) {
      const f = o.next(),
        lat = o.signed() * w * 0.42;
      a.spawn(
        s.x + dx * len * f + px * lat,
        o.range(0.35, 1.25),
        s.y + dz * len * f + pz * lat,
        dx * o.range(2.5, 6.2) + px * o.signed() * 1.6,
        o.range(0.5, 2.2),
        dz * o.range(2.5, 6.2) + pz * o.signed() * 1.6,
        0.34,
        o.range(0.18, 0.36),
        0.1,
      );
    }
    (n.light((s.x + i.x) * 0.5, (s.y + i.y) * 0.5, 1.1, Sc.glow, le.lightMax * p, 7, 0.24),
      !t.passive && n.shake(bo(t, e) ? 0.22 : 0.1, i.x, i.y));
  },
  scS2 = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      o = n.rnd;
    (n.decals.add(Xt.ring, s, i, 2.5, 0.55).params(1, 0.16).color(Sc.hot, 2.4).under(Sc.dark, 0.4),
      n.decals.add(Xt.swirl, s, i, 2.2, 0.65).params(3, 4.2).color(Sc.glow, 1.9, 0.82).under(Sc.deep, 0.3));
    const a = n.particles.use(Mt.mote).tint(Sc.hot, Sc.accent);
    for (let l = 0; l < 22; l++) {
      const c = o.next() * Math.PI * 2,
        r = o.range(0.3, 1.5);
      a.spawn(s + Math.cos(c) * r, o.range(0.2, 1.4), i + Math.sin(c) * r, Math.cos(c) * o.range(2.2, 4.8), o.range(1.6, 3.8), Math.sin(c) * o.range(2.2, 4.8), 0.52, 0.3, 0.08);
    }
    (n.light(s, i, 1.3, Sc.hot, le.lightMax, 8, 0.36), n.shake(bo(t, e) ? 0.2 : 0.08, s, i));
  },
  scUB = (n, t, e) => {
    const s = t.from ?? t.pos,
      i = t.to ?? t.pos,
      o = n.rnd;
    (n.ribbons.trace($n.energy, s.x, 1.0, s.y, i.x, 1.0, i.y, 0.3, Sc.hot, Sc.glow),
      n.decals.add(Xt.ring, s.x, s.y, 1.6, 0.4).params(1, 0.14).color(Sc.accent, 2.0).under(Sc.dark, 0.35),
      n.decals.add(Xt.ring, i.x, i.y, 2.4, 0.55).params(1, 0.18).color(Sc.hot, 2.6).under(Sc.dark, 0.45));
    const a = n.particles.use(Mt.mote).tint(Sc.hot, Sc.glow);
    for (let l = 0; l < 24; l++) {
      const c = o.next() * Math.PI * 2;
      a.spawn(i.x + Math.cos(c) * 0.5, o.range(0.3, 1.6), i.y + Math.sin(c) * 0.5, Math.cos(c) * o.range(2.5, 5.8), o.range(0.8, 3.2), Math.sin(c) * o.range(2.5, 5.8), 0.46, 0.32, 0.1);
    }
    (n.light(i.x, i.y, 1.4, Sc.hot, le.lightMax, 9, 0.36), n.shake(bo(t, e) ? 0.32 : 0.15, i.x, i.y));
  },
  scBT = (n, t, e) => {
    const s = t.from ?? t.pos,
      i = t.to ?? t.pos,
      w = t.width ?? 2.3,
      o = n.rnd;
    let dx = i.x - s.x,
      dz = i.y - s.y;
    const len = Math.hypot(dx, dz) || 1;
    ((dx /= len), (dz /= len));
    const px = -dz,
      pz = dx;
    // 主绿色气功波激光束（外层绿光 + 内层高亮白绿芯 + 地面焦痕光路）
    (n.ribbons.trace($n.energy, s.x + dx * 0.4, 1.05, s.y + dz * 0.4, i.x, 1.05, i.y, 0.16, Sc.glow, Sc.deep),
      n.ribbons.trace($n.white, s.x + dx * 0.4, 1.08, s.y + dz * 0.4, i.x, 1.08, i.y, 0.14, W.white, Sc.hot),
      n.ribbons.trace($n.thin, s.x + dx * 0.5 + px * 0.55, 1.02, s.y + dz * 0.5 + pz * 0.55, i.x + px * 0.65, 1.02, i.y + pz * 0.65, 0.15, Sc.accent, Sc.glow),
      n.ribbons.trace($n.thin, s.x + dx * 0.5 - px * 0.55, 1.02, s.y + dz * 0.5 - pz * 0.55, i.x - px * 0.65, 1.02, i.y - pz * 0.65, 0.15, Sc.accent, Sc.glow),
      JM(n, s.x + dx * 0.4, s.y + dz * 0.4, i.x, i.y, w * 0.54, 0.24, 0.14, Sc.glow, 2.3, 0.88),
      n.decals.add(Xt.ring, s.x + dx * 0.7, s.y + dz * 0.7, 1.15, 0.18).params(1, 0.2).color(Sc.hot, 2.4).under(Sc.dark, 0.25),
      n.decals.add(Xt.ring, i.x, i.y, 1.5, 0.22).params(1, 0.22).color(Sc.glow, 2.1).under(Sc.dark, 0.35));
    const a = n.particles.use(Mt.mote).tint(Sc.hot, Sc.glow);
    for (let l = 0; l < 12; l++) {
      const f = o.next(),
        lat = o.signed() * w * 0.46;
      a.spawn(
        s.x + dx * len * f + px * lat,
        o.range(0.45, 1.55),
        s.y + dz * len * f + pz * lat,
        dx * o.range(6, 12) + px * o.signed() * 2.2,
        o.range(-0.6, 2.0),
        dz * o.range(6, 12) + pz * o.signed() * 2.2,
        0.24,
        o.range(0.18, 0.36),
        0.08,
      );
    }
    (n.light(s.x + dx * len * 0.45, s.y + dz * len * 0.45, 1.2, Sc.glow, le.lightMax, 11, 0.16),
      bo(t, e) && n.shake(0.12, s.x, s.y));
  },
  scBW = (n, t) => {
    const s = t.from ?? t.pos,
      i = t.to ?? t.pos,
      o = n.rnd;
    let dx = i.x - s.x,
      dz = i.y - s.y;
    const len = Math.hypot(dx, dz) || 1;
    ((dx /= len), (dz /= len));
    const px = -dz,
      pz = dx,
      midX = (s.x + i.x) * 0.5 + px * (o.signed() * 0.42),
      midZ = (s.y + i.y) * 0.5 + pz * (o.signed() * 0.42);
    // 绿葱抽打鞭影：长度完全贴合普攻实际抽打距离，不再出现绿色小箭矢
    (n.ribbons.trace($n.energy, s.x + dx * 0.35, 0.95, s.y + dz * 0.35, midX, 0.98, midZ, 0.15, Sc.hot, Sc.glow),
      n.ribbons.trace($n.energy, midX, 0.98, midZ, i.x, 0.9, i.y, 0.15, Sc.hot, Sc.glow),
      n.ribbons.trace($n.thin, s.x + dx * 0.3, 0.9, s.y + dz * 0.3, i.x, 0.88, i.y, 0.14, W.white, Sc.accent),
      JM(n, s.x + dx * 0.3, s.y + dz * 0.3, i.x, i.y, 0.65, 0.22, 0.14, Sc.glow, 1.45, 0.65));
    const a = n.particles.use(Mt.mote).tint(Sc.hot, Sc.accent);
    for (let l = 0; l < 7; l++) {
      const f = o.range(0.3, 1.0);
      a.spawn(
        s.x + dx * len * f + px * o.signed() * 0.32,
        o.range(0.55, 1.25),
        s.y + dz * len * f + pz * o.signed() * 0.32,
        dx * o.range(1.6, 3.8) + px * o.signed() * 1.8,
        o.range(0.4, 1.6),
        dz * o.range(1.6, 3.8) + pz * o.signed() * 1.8,
        0.24,
        o.range(0.14, 0.26),
        0.08,
      );
    }
  },
  scMD = {
    scallion_basic_whip: scBW,
    scallion_s1_slash: scS1,
    scallion_s2_burst: scS2,
    scallion_ult_blink: scUB,
    scallion_beam_tick: scBT,
  },
  PbC = ws.paperboy,
  pbSP = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      r = t.radius ?? 8.5,
      o = n.rnd;
    (n.decals.add(Xt.ring, s, i, r, 0.55).params(1, 0.1).color(PbC.accent, 2.2).under(PbC.dark, 0.35),
      n.decals.add(Xt.ring, s, i, r * 0.55, 0.4).params(1, 0.14).color(PbC.hot, 2.1).under(PbC.deep, 0.25));
    const a = n.particles.use(Mt.mote).tint(PbC.hot, PbC.accent);
    for (let l = 0; l < 18; l++) {
      const c = o.next() * Math.PI * 2;
      a.spawn(s + Math.cos(c) * 0.9, o.range(0.8, 1.7), i + Math.sin(c) * 0.9, Math.cos(c) * o.range(5, 9.5), o.range(0.4, 1.6), Math.sin(c) * o.range(5, 9.5), 0.5, 0.28, 0.08);
    }
    (n.light(s, i, 1.4, PbC.accent, le.lightMax * 0.85, 9, 0.3), bo(t, e) && n.shake(0.14, s, i));
  },
  pbCH = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      o = n.rnd;
    (n.decals.add(Xt.ring, s, i, 2.2, 0.5).params(1, 0.16).color(PbC.hot, 2.5).under(PbC.glow, 0.45),
      n.decals.add(Xt.swirl, s, i, 1.9, 0.55).params(3, 3.8).color(PbC.glow, 2.0, 0.8).under(PbC.deep, 0.25));
    const a = n.particles.use(Mt.mote).tint(PbC.hot, PbC.glow);
    for (let l = 0; l < 20; l++) {
      const c = o.next() * Math.PI * 2;
      a.spawn(s + Math.cos(c) * 0.5, o.range(0.4, 1.6), i + Math.sin(c) * 0.5, Math.cos(c) * o.range(2.2, 5.2), o.range(1.2, 3.2), Math.sin(c) * o.range(2.2, 5.2), 0.5, 0.3, 0.1);
    }
    n.light(s, i, 1.3, PbC.hot, le.lightMax, 8, 0.35);
  },
  pbBT = (n, t) => {
    const s = t.from ?? t.pos,
      i = t.to ?? t.pos,
      d = Math.hypot(i.x - s.x, i.y - s.y);
    if (d > 0.2) {
      (n.ribbons.trace($n.thin, s.x, 1.05, s.y, i.x, 1.05, i.y, 0.28, PbC.accent, PbC.hot),
        n.decals.add(Xt.ring, i.x, i.y, 1.15, 0.26).params(1, 0.14).color(PbC.accent, 1.65).under(PbC.dark, 0.2));
    } else {
      (n.decals.add(Xt.ring, s.x, s.y, 1.45, 0.28).params(1, 0.16).color(PbC.accent, 1.9).under(PbC.dark, 0.25),
        n.decals.add(Xt.swirl, s.x, s.y, 1.25, 0.28).params(2, -3.2).color(PbC.hot, 1.4, 0.7).under(PbC.dark, 0.18));
    }
  },
  pbCL = (n, t) => {
    const s = t.from ?? t.pos,
      i = t.to ?? t.pos;
    (n.ribbons.trace($n.thin, s.x, 1.1, s.y, i.x, 1.1, i.y, 0.24, PbC.hot, PbC.accent),
      n.decals.add(Xt.ring, i.x, i.y, 1.1, 0.32).params(1, 0.16).color(PbC.hot, 2.0).under(PbC.dark, 0.35));
  },
  pbES = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      to = t.to ?? t.pos,
      r = t.radius ?? 8.5,
      o = n.rnd;
    (n.ribbons.trace($n.energy, s, 1.1, i, to.x, 1.1, to.y, 0.55, PbC.hot, PbC.glow),
      n.decals.add(Xt.ring, s, i, r, 0.78).params(1, 0.14).color(PbC.hot, 2.8).under(PbC.accent, 0.55),
      n.decals.add(Xt.zone, s, i, r * 0.92, 0.7).params(14, 0.08).color(PbC.glow, 1.9, 0.8).under(PbC.dark, 0.45),
      n.decals.add(Xt.ring, to.x, to.y, 2.6, 0.65).params(1, 0.18).color(PbC.hot, 2.6).under(PbC.glow, 0.45));
    const a = n.particles.use(Mt.mote).tint(PbC.hot, PbC.accent);
    for (let l = 0; l < 36; l++) {
      const c = o.next() * Math.PI * 2,
        d = o.range(0.5, r * 0.85);
      a.spawn(s + Math.cos(c) * d, o.range(0.3, 1.8), i + Math.sin(c) * d, Math.cos(c) * o.range(2.5, 7.5), o.range(1.4, 4.4), Math.sin(c) * o.range(2.5, 7.5), 0.68, 0.36, 0.14);
    }
    (n.light(s, i, 1.6, PbC.hot, le.lightMax * 1.2, r * 2.2, 0.55),
      n.light(to.x, to.y, 1.4, PbC.glow, le.lightMax, 9, 0.42),
      n.shake(bo(t, e) ? 0.62 : 0.34, s, i));
  },
  pbGB = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      o = n.rnd;
    (n.decals.add(Xt.ring, s, i, 2.4, 0.52).params(1, 0.18).color(PbC.hot, 2.8).under(PbC.accent, 0.55),
      n.decals.add(Xt.scorch, s, i, 1.8, 1.1).params(0, 0).color(PbC.hot, 0.9, 0.72).under(PbC.dark, 0.55));
    const a = n.particles.use(Mt.mote).tint(PbC.hot, PbC.accent);
    for (let l = 0; l < 24; l++) {
      const c = o.next() * Math.PI * 2;
      a.spawn(s, o.range(0.4, 1.5), i, Math.cos(c) * o.range(2.4, 6.2), o.range(1.6, 4.4), Math.sin(c) * o.range(2.4, 6.2), 0.56, 0.34, 0.12);
    }
    (n.light(s, i, 1.4, PbC.hot, le.lightMax, 9, 0.38), n.shake(bo(t, e) ? 0.42 : 0.22, s, i));
  },
  pbMD = {
    paperboy_suona_pulse: pbSP,
    paperboy_crane_hit: pbCH,
    paperboy_bind_tick: pbBT,
    paperboy_curse_link: pbCL,
    paperboy_effigy_shatter: pbES,
    paperboy_gloom_burst: pbGB,
  },
  MgC = ws.maggot,
  mgFT = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      o = n.rnd;
    n.decals.add(Xt.ring, s, i, 2.1, 0.55).params(1, 0.16).color(MgC.glow, 1.9).under(MgC.dark, 0.45);
    const a = n.particles.use(Mt.puff).tint(MgC.glow, MgC.deep);
    for (let l = 0; l < 18; l++) {
      const c = o.next() * Math.PI * 2;
      a.spawn(s + Math.cos(c) * 0.35, o.range(0.4, 1.1), i + Math.sin(c) * 0.35, Math.cos(c) * o.range(1.6, 4.4), o.range(0.8, 2.4), Math.sin(c) * o.range(1.6, 4.4), 0.62, 0.38, 0.14);
    }
    (n.light(s, i, 1.1, MgC.glow, le.lightMax * 0.7, 7, 0.32), bo(t, e) && n.shake(0.12, s, i));
  },
  mgST = (n, t) => {
    const s = t.pos.x,
      i = t.pos.y,
      dx = t.dir?.x ?? 1,
      dz = t.dir?.y ?? 0,
      len = t.range ?? 8.5,
      o = n.rnd;
    const px = -dz,
      pz = dx,
      a = n.particles.use(Mt.debris).tint(MgBrownC.hot, MgBrownC.deep);
    for (let l = 0; l < 16; l++) {
      const spread = o.signed() * 0.32,
        vx = (dx + px * spread) * o.range(10, 19),
        vz = (dz + pz * spread) * o.range(10, 19);
      a.spawn(s + dx * 0.65, o.range(0.55, 1.05), i + dz * 0.65, vx, o.range(0.5, 2.2), vz, 0.34, o.range(0.14, 0.24), 0.08);
    }
    n.decals
      .add(Xt.cone, s, i, len, 0.22)
      .rot(Math.atan2(dz, dx), 0.28)
      .params(0.12, 0)
      .color(MgBrownC.deep, 0.95, 0.44)
      .under(MgC.dark, 0.22);
  },
  mgPM = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      tier = t.tier ?? 2,
      o = n.rnd,
      isGold = tier >= 3;
    (n.decals.add(Xt.ring, s, i, isGold ? 3.4 : 2.2, 0.56).params(1, 0.16).color(isGold ? MgC.hot : MgBrownC.hot, isGold ? 2.5 : 1.5).under(MgC.dark, 0.4),
      n.light(s, i, 1.4, isGold ? MgC.hot : MgC.glow, le.lightMax * (isGold ? 1.15 : 0.65), isGold ? 11 : 6, 0.38));
    const a = n.particles.use(isGold ? Mt.star : Mt.debris).tint(isGold ? MgC.hot : MgBrownC.hot, isGold ? MgC.accent : MgBrownC.deep);
    for (let l = 0; l < (isGold ? 28 : 16); l++) {
      const c = o.next() * Math.PI * 2;
      a.spawn(s, o.range(0.45, 1.5), i, Math.cos(c) * o.range(2.2, 6.2), o.range(1.6, 4.5), Math.sin(c) * o.range(2.2, 6.2), 0.58, isGold ? 0.32 : 0.22, 0.1);
    }
    isGold && n.shake(bo(t, e) ? 0.34 : 0.16, s, i);
  },
  mgVC = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      r = t.radius ?? 13,
      o = n.rnd,
      sources = t.sources ?? [];
    (n.decals.add(Xt.ring, s, i, r, 0.62).params(1, 0.08).color(MgC.accent, 1.85).under(MgC.dark, 0.3),
      n.decals.add(Xt.swirl, s, i, 3.6, 0.68).params(4, -5.2).color(MgC.hot, 2.0, 0.78).under(MgC.deep, 0.35));
    for (let k = 0; k < sources.length; k++) {
      const src = sources[k];
      n.ribbons.trace($n.thin, src.x, 0.65, src.y, s, 0.8, i, 0.42, MgC.hot, MgBrownC.hot);
    }
    const a = n.particles.use(Mt.mote).tint(MgC.hot, MgBrownC.hot);
    for (let l = 0; l < 24; l++) {
      const c = o.next() * Math.PI * 2,
        d = o.range(2.5, Math.min(r, 9));
      a.spawn(s + Math.cos(c) * d, o.range(0.4, 1.5), i + Math.sin(c) * d, -Math.cos(c) * o.range(6, 12), o.range(0.2, 1.4), -Math.sin(c) * o.range(6, 12), 0.44, 0.24, 0.08);
    }
    (n.light(s, i, 1.3, MgC.hot, le.lightMax * 0.85, 9, 0.38), bo(t, e) && n.shake(0.22, s, i));
  },
  mgUL = (n, t) => {
    const s = t.from ?? t.pos,
      i = t.to ?? t.pos,
      dur = 0.62,
      p = n.particles.use(Mt.debris).tint(MgBrownC.hot, MgBrownC.deep);
    n.decals.add(Xt.ring, s.x, s.y, 1.4, 0.32).params(1, 0.16).color(MgBrownC.hot, 1.4).under(MgC.dark, 0.28);
    for (let k = 0; k <= 12; k++) {
      const u = k / 12,
        px = s.x + (i.x - s.x) * u,
        pz = s.y + (i.y - s.y) * u,
        py = 0.7 + 4 * 5.2 * u * (1 - u);
      p.spawn(px, py, pz, (i.x - s.x) * 0.15, 0.4, (i.y - s.y) * 0.15, 0.18, k === 12 ? 0.36 : 0.28, 0.14, u * dur);
    }
  },
  mgUS = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      r = t.radius ?? 2.6,
      o = n.rnd;
    (n.decals.add(Xt.ring, s, i, r, 0.54).params(1, 0.16).color(MgBrownC.hot, 1.9).under(MgC.dark, 0.48),
      n.decals.add(Xt.scorch, s, i, r * 0.9, 0.9).params(0, 0).color(MgBrownC.deep, 1.15, 0.85).under(MgC.dark, 0.6));
    const a = n.particles.use(Mt.debris).tint(MgBrownC.hot, MgBrownC.deep);
    for (let l = 0; l < 26; l++) {
      const c = o.next() * Math.PI * 2;
      a.spawn(s, o.range(0.3, 1.1), i, Math.cos(c) * o.range(2.2, 6.8), o.range(1.6, 4.8), Math.sin(c) * o.range(2.2, 6.8), 0.52, 0.24, 0.1);
    }
    (n.light(s, i, 1.2, MgC.accent, le.lightMax * 0.8, 7, 0.32), n.shake(bo(t, e) ? 0.34 : 0.18, s, i));
  },
  mgOH = (n, t) => {
    const s = t.pos.x,
      i = t.pos.y,
      o = n.rnd,
      a = n.particles.use(Mt.debris).tint(MgBrownC.hot, MgBrownC.deep);
    for (let l = 0; l < 6; l++) {
      const c = o.next() * Math.PI * 2;
      a.spawn(s, o.range(0.45, 1.1), i, Math.cos(c) * o.range(1.4, 3.4), o.range(0.8, 2.2), Math.sin(c) * o.range(1.4, 3.4), 0.3, 0.16, 0.06);
    }
  },
  mgOHG = (n, t) => {
    const s = t.pos.x,
      i = t.pos.y,
      o = n.rnd;
    n.decals.add(Xt.ring, s, i, 1.15, 0.28).params(1, 0.18).color(MgGoldC.hot, 2.2).under(MgGoldC.deep, 0.35);
    const a = n.particles.use(Mt.star).tint(MgGoldC.hot, MgGoldC.glow);
    for (let l = 0; l < 10; l++) {
      const c = o.next() * Math.PI * 2;
      a.spawn(s, o.range(0.5, 1.3), i, Math.cos(c) * o.range(1.8, 4.4), o.range(1.0, 2.8), Math.sin(c) * o.range(1.8, 4.4), 0.38, 0.24, 0.08);
    }
  },
  MgBrownC = {
    glow: Lt(0x6b3e1b),
    hot: Lt(0x8e5628),
    deep: Lt(0x361c09),
    accent: Lt(0x9a6434),
    tail: Lt(0x5d3516),
    tail2: Lt(0x2b1607),
  },
  MgGoldC = {
    glow: Lt(0xf6c93b),
    hot: Lt(0xfff4a8),
    deep: Lt(0x9e6608),
    accent: Lt(0xffdc5c),
    tail: Lt(0xf6c93b),
    tail2: Lt(0xb8780c),
  },
  mgMD = {
    maggot_fart: mgFT,
    maggot_spray_tick: mgST,
    maggot_poop_merge: mgPM,
    maggot_vacuum: mgVC,
    maggot_ult_launch: mgUL,
    maggot_ult_splat: mgUS,
    maggot_onhit: mgOH,
    maggot_onhit_gold: mgOHG,
  },
  HmC = ws.horseman,
  hmCR = (n, t) => {
    const s = t.pos.x,
      i = t.pos.y,
      o = n.rnd;
    n.decals.add(Xt.ring, s, i, 2.2, 0.4).params(1, 0.16).color(HmC.hot, 2.2).under(HmC.deep, 0.4);
    const a = n.particles.use(Mt.spark).tint(HmC.hot, HmC.accent);
    for (let l = 0; l < 16; l++) {
      const c = o.next() * Math.PI * 2;
      a.spawn(s + Math.cos(c) * 0.6, o.range(0.3, 1.1), i + Math.sin(c) * 0.6, Math.cos(c) * o.range(1.8, 4.2), o.range(1.4, 3.4), Math.sin(c) * o.range(1.8, 4.2), 0.42, 0.18, 0.06);
    }
    n.light(s, i, 1.2, HmC.glow, le.lightMax * 0.6, 5.5, 0.28);
  },
  hmCD = (n, t) => {
    const s = t.from ?? t.pos,
      i = t.to ?? t.pos,
      o = n.rnd;
    const dx = i.x - s.x,
      dy = i.y - s.y,
      dist = Math.hypot(dx, dy) || 1,
      nx = dx / dist,
      ny = dy / dist,
      px = -ny,
      py = nx;
    (n.ribbons.trace($n.energy, s.x, 0.92, s.y, i.x, 0.92, i.y, 0.42, HmC.hot, HmC.accent),
      n.ribbons.trace($n.thin, s.x + px * 0.55, 0.72, s.y + py * 0.55, i.x + px * 0.55, 0.72, i.y + py * 0.55, 0.36, W.goldHot, HmC.glow),
      n.ribbons.trace($n.thin, s.x - px * 0.55, 0.72, s.y - py * 0.55, i.x - px * 0.55, 0.72, i.y - py * 0.55, 0.36, W.goldHot, HmC.glow),
      n.decals.add(Xt.ring, s.x, s.y, 1.9, 0.36).params(1, 0.2).color(HmC.hot, 2.4).under(HmC.deep, 0.4));
    const d = n.particles.use(Mt.dust).tint(W.sand, HmC.accent),
      sp = n.particles.use(Mt.spark).tint(W.goldHot, HmC.hot);
    for (let l = 0; l < 18; l++) {
      const u = o.next();
      d.spawn(s.x + dx * u + o.signed() * 0.45, o.range(0.15, 0.75), s.y + dy * u + o.signed() * 0.45, -nx * o.range(1.6, 4.2), o.range(0.8, 2.2), -ny * o.range(1.6, 4.2), 0.46, 0.32, 0.65);
      sp.spawn(s.x + dx * u + o.signed() * 0.55, o.range(0.45, 1.5), s.y + dy * u + o.signed() * 0.55, -nx * o.range(2.2, 5.5), o.range(0.5, 1.8), -ny * o.range(2.2, 5.5), 0.38, 0.2, 0.06);
    }
    n.light(s.x + dx * 0.5, s.y + dy * 0.5, 1.3, HmC.hot, le.lightMax * 0.75, 7.5, 0.32);
  },
  hmCH = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      o = n.rnd;
    (n.decals.add(Xt.ring, s, i, 2.8, 0.42).params(1, 0.2).color(HmC.hot, 2.6).under(HmC.deep, 0.48),
      n.decals.add(Xt.scorch, s, i, 1.9, 0.75).params(0, 0).color(HmC.dark, 1.2, 0.8).under(W.dustDark, 0.5));
    const a = n.particles.use(Mt.star).tint(HmC.hot, HmC.accent),
      b = n.particles.use(Mt.dust).tint(W.sand, HmC.deep);
    for (let l = 0; l < 22; l++) {
      const c = o.next() * Math.PI * 2;
      a.spawn(s, o.range(0.4, 1.3), i, Math.cos(c) * o.range(2.6, 7.2), o.range(1.6, 4.6), Math.sin(c) * o.range(2.6, 7.2), 0.44, 0.26, 0.08);
      b.spawn(s, 0.2, i, Math.cos(c) * o.range(2.0, 5.4), o.range(0.9, 2.6), Math.sin(c) * o.range(2.0, 5.4), 0.52, 0.34, 0.72);
    }
    (n.light(s, i, 1.2, HmC.hot, le.lightMax * 0.85, 7, 0.3), n.shake(bo(t, e) ? 0.36 : 0.2, s, i));
  },
  hmKB = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      dir = t.dir ?? { x: 1, y: 0 },
      dl = Math.hypot(dir.x, dir.y) || 1,
      nx = dir.x / dl,
      ny = dir.y / dl,
      px = -ny,
      py = nx,
      rad = t.range ?? 4.8,
      wid = t.width ?? 2.3,
      pow = t.power ?? 1,
      yaw = Math.atan2(ny, nx),
      halfL = rad * 0.5,
      o = n.rnd;
    (n.decals
      .add(Xt.rect, s + nx * halfL, i + ny * halfL, halfL, 0.48)
      .rot(yaw, Math.max(0.28, (wid * 0.5) / Math.max(0.5, halfL)))
      .color(pow >= 0.98 ? W.goldHot : HmC.hot, 2.3 + pow * 0.9, 0.92)
      .under(HmC.deep, 0.55),
      n.decals
        .add(Xt.ring, s + nx * rad * 0.85, i + ny * rad * 0.85, 1.5 + pow * 1.1, 0.44)
        .params(1, 0.2)
        .color(pow >= 0.98 ? W.goldHot : HmC.accent, 2.5)
        .under(HmC.dark, 0.45),
      n.ribbons.trace($n.energy, s, 0.72, i, s + nx * rad, 0.72, i + ny * rad, 0.3, pow >= 0.98 ? W.goldHot : HmC.hot, HmC.accent),
      n.ribbons.trace($n.thin, s + px * 0.55, 0.65, i + py * 0.55, s + nx * rad + px * 0.55, 0.65, i + ny * rad + py * 0.55, 0.26, HmC.accent, W.sand),
      n.ribbons.trace($n.thin, s - px * 0.55, 0.65, i - py * 0.55, s + nx * rad - px * 0.55, 0.65, i + ny * rad - py * 0.55, 0.26, HmC.accent, W.sand));
    const sp = n.particles.use(Mt.star).tint(pow >= 0.98 ? W.goldHot : HmC.hot, HmC.accent),
      du = n.particles.use(Mt.dust).tint(W.sand, W.dustDark);
    const cnt = Math.round(22 + pow * 24);
    for (let l = 0; l < cnt; l++) {
      const dist = o.range(0.4, rad),
        lat = o.signed() * (wid * 0.48),
        spd = o.range(4.5, 11.5 + pow * 5.0),
        bx = s + nx * dist + px * lat,
        bz = i + ny * dist + py * lat;
      sp.spawn(bx, o.range(0.35, 1.15), bz, nx * spd + o.signed() * 1.4, o.range(1.2, 3.8), ny * spd + o.signed() * 1.4, 0.42, 0.22 + pow * 0.12, 0.08);
      du.spawn(bx, 0.2, bz, nx * spd * 0.65 + px * o.signed() * 2.2, o.range(0.8, 2.8), ny * spd * 0.65 + py * o.signed() * 2.2, 0.55, 0.36, 0.75);
    }
    (n.light(s + nx * halfL, i + ny * halfL, 1.2, pow >= 0.98 ? W.goldHot : HmC.hot, le.lightMax * (0.7 + pow * 0.4), 7.5 + rad * 0.4, 0.34),
      n.shake(bo(t, e) ? 0.32 + pow * 0.28 : 0.18, s, i));
  },
  hmNG = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      r = t.radius ?? 5.4,
      o = n.rnd;
    (n.decals.add(Xt.ring, s, i, r, 0.55).params(1, 0.14).color(HmC.glow, 2.3).under(HmC.deep, 0.45),
      n.decals.add(Xt.swirl, s, i, r * 0.92, 0.65).params(3, 2.2).color(HmC.accent, 1.6, 0.72).under(HmC.dark, 0.35));
    const a = n.particles.use(Mt.mote).tint(HmC.hot, HmC.accent);
    for (let l = 0; l < 28; l++) {
      const c = o.next() * Math.PI * 2,
        spd = o.range(3.5, 8.2);
      a.spawn(s + Math.cos(c) * 0.5, o.range(0.7, 1.8), i + Math.sin(c) * 0.5, Math.cos(c) * spd, o.range(0.5, 2.2), Math.sin(c) * spd, 0.54, 0.22, 0.08);
    }
    (n.light(s, i, 1.5, HmC.glow, le.lightMax * 0.75, 8, 0.34), n.shake(bo(t, e) ? 0.24 : 0.12, s, i));
  },
  hmTS = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      r = t.radius ?? 3.2,
      o = n.rnd;
    (n.decals.add(Xt.ring, s, i, r, 0.48).params(1, 0.18).color(HmC.hot, 2.6).under(HmC.accent, 0.5),
      n.decals.add(Xt.swirl, s, i, r * 0.85, 0.52).params(4, -3).color(HmC.glow, 1.8, 0.75).under(HmC.deep, 0.35));
    const a = n.particles.use(Mt.spark).tint(HmC.hot, HmC.accent);
    for (let l = 0; l < 24; l++) {
      const c = o.next() * Math.PI * 2;
      a.spawn(s + Math.cos(c) * 0.7, o.range(0.2, 1.2), i + Math.sin(c) * 0.7, Math.cos(c) * o.range(2.2, 6.2), o.range(2.2, 5.2), Math.sin(c) * o.range(2.2, 6.2), 0.5, 0.24, 0.07);
    }
    (n.light(s, i, 1.2, HmC.hot, le.lightMax * 0.85, 7, 0.34), n.shake(bo(t, e) ? 0.28 : 0.14, s, i));
  },
  hmTP = (n, t) => {
    const s = t.pos.x,
      i = t.pos.y,
      big = !!t.big,
      o = n.rnd,
      d = n.particles.use(Mt.dust).tint(big ? HmC.accent : W.sand, W.dustDark);
    for (let l = 0; l < (big ? 7 : 4); l++) {
      const c = o.next() * Math.PI * 2;
      d.spawn(s + Math.cos(c) * 0.35, 0.14, i + Math.sin(c) * 0.35, Math.cos(c) * o.range(0.9, 2.5), o.range(0.6, 1.9), Math.sin(c) * o.range(0.9, 2.5), 0.38, big ? 0.28 : 0.2, 0.65);
    }
    big && n.particles.use(Mt.spark).tint(HmC.hot, HmC.accent).spawn(s, 0.25, i, o.signed() * 1.4, o.range(1.2, 2.6), o.signed() * 1.4, 0.34, 0.18, 0.06);
  },
  hmTR = (n, t) => {
    const s = t.pos.x,
      i = t.pos.y,
      o = n.rnd;
    (n.decals.add(Xt.ring, s, i, 3.0, 0.55).params(1, 0.16).color(W.goldHot, 2.8).under(HmC.accent, 0.45),
      n.decals.add(Xt.ring, s, i, 1.8, 0.42).params(1, 0.2).color(HmC.hot, 2.4).under(HmC.deep, 0.35));
    const a = n.particles.use(Mt.star).tint(W.goldHot, HmC.hot);
    for (let l = 0; l < 22; l++) {
      const c = o.next() * Math.PI * 2;
      a.spawn(s, o.range(0.5, 1.8), i, Math.cos(c) * o.range(2.2, 5.8), o.range(1.8, 4.4), Math.sin(c) * o.range(2.2, 5.8), 0.55, 0.26, 0.08);
    }
    n.light(s, i, 1.5, W.goldHot, le.lightMax * 0.85, 7, 0.38);
  },
  hmMD = {
    horseman_charge_ready: hmCR,
    horseman_charge_dash: hmCD,
    horseman_charge_hit: hmCH,
    horseman_kick_blast: hmKB,
    horseman_neigh: hmNG,
    horseman_trample_start: hmTS,
    horseman_trample_step: hmTP,
    horseman_trample_reset: hmTR,
  },
  CwC = ws.cow,
  cwST = (n, t) => {
    const s = t.from ?? t.pos,
      i = t.to ?? t.pos,
      o = n.rnd;
    (n.ribbons.trace($n.thin, s.x, 0.85, s.y, i.x, 0.85, i.y, 0.28, CwC.hot, CwC.accent),
      n.decals.add(Xt.ring, s.x, s.y, 1.5, 0.36).params(1, 0.16).color(CwC.glow, 1.9).under(CwC.dark, 0.35),
      n.decals.add(Xt.ring, i.x, i.y, 1.7, 0.4).params(1, 0.16).color(CwC.hot, 2.1).under(CwC.deep, 0.4));
    const d = n.particles.use(Mt.dust).tint(W.sand, CwC.accent);
    for (let l = 0; l < 12; l++) {
      const c = o.next() * Math.PI * 2;
      d.spawn(i.x + Math.cos(c) * 0.3, 0.16, i.y + Math.sin(c) * 0.3, Math.cos(c) * o.range(1.2, 3.4), o.range(0.7, 2.0), Math.sin(c) * o.range(1.2, 3.4), 0.42, 0.26, 0.68);
    }
  },
  cwSD = (n, t) => {
    const s = t.pos.x,
      i = t.pos.y,
      o = n.rnd;
    (n.decals.add(Xt.ring, s, i, 2.4, 0.48).params(1, 0.18).color(W.goldHot, 2.4).under(CwC.accent, 0.45),
      n.decals.add(Xt.scorch, s, i, 1.5, 0.6).params(0, 0).color(CwC.dark, 1.0, 0.65).under(W.dustDark, 0.4));
    const sp = n.particles.use(Mt.spark).tint(W.goldHot, CwC.hot);
    for (let l = 0; l < 18; l++) {
      const c = o.next() * Math.PI * 2;
      sp.spawn(s + Math.cos(c) * 0.5, o.range(0.3, 1.4), i + Math.sin(c) * 0.5, Math.cos(c) * o.range(1.5, 4.2), o.range(1.8, 4.4), Math.sin(c) * o.range(1.5, 4.2), 0.48, 0.22, 0.06);
    }
    n.light(s, i, 1.4, CwC.hot, le.lightMax * 0.65, 6, 0.3);
  },
  cwFD = (n, t) => {
    const s = t.from ?? t.pos,
      i = t.to ?? t.pos,
      dx = i.x - s.x,
      dy = i.y - s.y,
      dist = Math.hypot(dx, dy) || 1,
      nx = dx / dist,
      ny = dy / dist,
      o = n.rnd;
    (n.ribbons.trace($n.energy, s.x, 1.05, s.y, i.x, 1.05, i.y, 0.4, CwC.hot, CwC.accent),
      n.decals.add(Xt.ring, s.x, s.y, 1.8, 0.36).params(1, 0.2).color(CwC.hot, 2.3).under(CwC.deep, 0.42));
    const d = n.particles.use(Mt.dust).tint(W.sand, CwC.accent),
      sp = n.particles.use(Mt.spark).tint(W.goldHot, CwC.hot);
    for (let l = 0; l < 16; l++) {
      const u = o.next();
      d.spawn(s.x + dx * u + o.signed() * 0.35, o.range(0.2, 0.9), s.y + dy * u + o.signed() * 0.35, -nx * o.range(1.8, 4.5), o.range(0.7, 2.0), -ny * o.range(1.8, 4.5), 0.42, 0.28, 0.68);
      sp.spawn(s.x + dx * u + o.signed() * 0.45, o.range(0.5, 1.6), s.y + dy * u + o.signed() * 0.45, -nx * o.range(2.2, 5.2), o.range(0.6, 1.8), -ny * o.range(2.2, 5.2), 0.36, 0.2, 0.06);
    }
    n.light(s.x + dx * 0.5, s.y + dy * 0.5, 1.4, CwC.hot, le.lightMax * 0.72, 7, 0.3);
  },
  cwFH = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      o = n.rnd;
    (n.decals.add(Xt.ring, s, i, 3.0, 0.46).params(1, 0.22).color(W.goldHot, 2.8).under(CwC.deep, 0.5),
      n.decals.add(Xt.cracks, s, i, 2.5, 1.2).params(0, 0).color(CwC.hot, 1.8, 0.9).under(CwC.dark, 0.6));
    const st = n.particles.use(Mt.star).tint(W.goldHot, CwC.hot),
      du = n.particles.use(Mt.dust).tint(W.sand, W.rock);
    for (let l = 0; l < 24; l++) {
      const c = o.next() * Math.PI * 2;
      st.spawn(s, o.range(0.4, 1.4), i, Math.cos(c) * o.range(3.2, 8.2), o.range(1.6, 4.8), Math.sin(c) * o.range(3.2, 8.2), 0.46, 0.28, 0.08);
      du.spawn(s, 0.2, i, Math.cos(c) * o.range(2.2, 5.8), o.range(1.0, 3.0), Math.sin(c) * o.range(2.2, 5.8), 0.54, 0.34, 0.76);
    }
    (n.light(s, i, 1.4, W.goldHot, le.lightMax * 0.92, 8, 0.34), n.shake(bo(t, e) ? 0.42 : 0.22, s, i));
  },
  cwUG = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      r = t.radius ?? 4.8,
      o = n.rnd;
    (n.decals.add(Xt.ring, s, i, r, 0.58).params(1, 0.18).color(CwC.hot, 2.8).under(CwC.deep, 0.52),
      n.decals.add(Xt.cracks, s, i, r * 0.78, 1.4).params(0, 0).color(CwC.accent, 1.6, 0.85).under(CwC.dark, 0.55));
    const em = n.particles.use(Mt.ember).tint(W.goldHot, CwC.hot);
    for (let l = 0; l < 30; l++) {
      const c = o.next() * Math.PI * 2;
      em.spawn(s + Math.cos(c) * o.range(0.4, 1.8), o.range(0.2, 1.6), i + Math.sin(c) * o.range(0.4, 1.8), Math.cos(c) * o.range(1.8, 5.2), o.range(2.5, 6.2), Math.sin(c) * o.range(1.8, 5.2), 0.62, 0.26, 0.06);
    }
    (n.light(s, i, 1.8, CwC.hot, le.lightMax * 0.95, 9, 0.42), n.shake(bo(t, e) ? 0.38 : 0.2, s, i));
  },
  cwUS = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      r = t.radius ?? 4.8,
      o = n.rnd;
    (n.decals.add(Xt.ring, s, i, r, 0.52).params(1, 0.22).color(W.goldHot, 3.0).under(CwC.deep, 0.58),
      n.decals.add(Xt.cracks, s, i, r * 0.96, 1.9).params(0, 0).color(CwC.hot, 2.2, 0.95).under(CwC.dark, 0.72),
      n.decals.add(Xt.scorch, s, i, r * 0.72, 1.5).params(0, 0).color(CwC.dark, 1.3, 0.82).under(W.dustDark, 0.55));
    const du = n.particles.use(Mt.dust).tint(W.rock, W.dustDark),
      st = n.particles.use(Mt.star).tint(W.goldHot, CwC.accent);
    for (let l = 0; l < 34; l++) {
      const c = o.next() * Math.PI * 2,
        rad = o.range(0.4, r * 0.82);
      du.spawn(s + Math.cos(c) * rad, 0.2, i + Math.sin(c) * rad, Math.cos(c) * o.range(2.6, 7.2), o.range(1.4, 4.4), Math.sin(c) * o.range(2.6, 7.2), 0.62, 0.42, 0.85);
      st.spawn(s + Math.cos(c) * rad * 0.7, o.range(0.3, 1.1), i + Math.sin(c) * rad * 0.7, Math.cos(c) * o.range(3.0, 8.0), o.range(2.0, 5.2), Math.sin(c) * o.range(3.0, 8.0), 0.48, 0.28, 0.08);
    }
    (n.light(s, i, 1.6, CwC.hot, le.lightMax, 10, 0.42), n.shake(bo(t, e) ? 0.55 : 0.3, s, i));
  },
  cwMD = {
    cow_stride: cwST,
    cow_squat_done: cwSD,
    cow_flykick_dash: cwFD,
    cow_flykick_hit: cwFH,
    cow_ult_grow: cwUG,
    cow_ult_stomp: cwUS,
  },
  MkC = ws.monkey,
  mkBE = (n, t) => {
    const s = t.pos.x,
      i = t.pos.y,
      full = !!t.fullHp,
      o = n.rnd;
    n.decals.add(Xt.ring, s, i, full ? 2.4 : 2.0, 0.42).params(1, 0.16).color(full ? MkC.hot : W.heal, 2.2).under(MkC.dark, 0.35);
    const pt = n.particles.use(full ? Mt.spark : Mt.mote).tint(full ? MkC.hot : W.heal, MkC.accent);
    for (let l = 0; l < 16; l++) {
      const c = o.next() * Math.PI * 2;
      pt.spawn(s + Math.cos(c) * 0.4, o.range(0.3, 1.3), i + Math.sin(c) * 0.4, Math.cos(c) * o.range(1.2, 3.6), o.range(1.4, 3.4), Math.sin(c) * o.range(1.2, 3.6), 0.48, 0.24, 0.08);
    }
    n.light(s, i, 1.3, full ? MkC.hot : W.heal, le.lightMax * 0.65, 6, 0.28);
  },
  mkPT = (n, t) => {
    const s = t.from ?? t.pos,
      i = t.to ?? t.pos,
      o = n.rnd;
    n.ribbons.trace($n.thin, s.x, 1.1, s.y, i.x, 0.25, i.y, Math.max(0.24, t.dur || 0.3), MkC.hot, MkC.accent);
    const sp = n.particles.use(Mt.mote).tint(MkC.hot, MkC.accent);
    for (let l = 0; l < 10; l++) {
      const u = o.next();
      sp.spawn(s.x + (i.x - s.x) * u, 0.35 + Math.sin(u * Math.PI) * 1.4, s.y + (i.y - s.y) * u, o.signed() * 0.8, o.range(0.4, 1.2), o.signed() * 0.8, 0.35, 0.22, 0.1);
    }
  },
  mkPS = (n, t) => {
    const s = t.pos.x,
      i = t.pos.y,
      o = n.rnd;
    n.decals.add(Xt.ring, s, i, 2.2, 0.42).params(1, 0.18).color(MkC.hot, 2.6).under(MkC.deep, 0.42);
    const st = n.particles.use(Mt.star).tint(MkC.hot, MkC.accent);
    for (let l = 0; l < 20; l++) {
      const c = o.next() * Math.PI * 2;
      st.spawn(s, o.range(0.4, 1.5), i, Math.cos(c) * o.range(2.0, 5.4), o.range(2.0, 5.2), Math.sin(c) * o.range(2.0, 5.4), 0.52, 0.26, 0.08);
    }
    n.light(s, i, 1.3, MkC.hot, le.lightMax * 0.72, 6, 0.3);
  },
  mkPM = (n, t) => {
    const s = t.pos.x,
      i = t.pos.y,
      o = n.rnd;
    n.decals.add(Xt.ring, s, i, 1.35, 0.28).params(1, 0.12).color(MkC.dark, 1.1).under(W.dustDark, 0.4);
    const du = n.particles.use(Mt.dust).tint(MkC.accent, W.sand);
    for (let l = 0; l < 10; l++) {
      const c = o.next() * Math.PI * 2;
      du.spawn(s, 0.14, i, Math.cos(c) * o.range(1.0, 2.6), o.range(0.5, 1.5), Math.sin(c) * o.range(1.0, 2.6), 0.36, 0.22, 0.45);
    }
  },
  mkST = (n, t) => {
    const s = t.from ?? t.pos,
      i = t.to ?? t.pos,
      dx = i.x - s.x,
      dy = i.y - s.y,
      o = n.rnd;
    n.ribbons.trace($n.energy, s.x, 1.15, s.y, i.x, 1.05, i.y, Math.max(0.32, (t.dur || 0.3) + 0.14), MkC.hot, MkC.deep);
    const sp = n.particles.use(Mt.spark).tint(W.goldHot, MkC.deep),
      du = n.particles.use(Mt.dust).tint(W.sand, MkC.accent);
    for (let l = 0; l < 18; l++) {
      const u = o.next();
      sp.spawn(s.x + dx * u + o.signed() * 0.35, o.range(0.5, 1.4), s.y + dy * u + o.signed() * 0.35, o.signed() * 2.2, o.range(0.8, 2.6), o.signed() * 2.2, 0.4, 0.22, 0.06);
      du.spawn(s.x + dx * u, 0.16, s.y + dy * u, o.signed() * 1.6, o.range(0.6, 1.8), o.signed() * 1.6, 0.44, 0.28, 0.68);
    }
    n.light(s.x + dx * 0.5, s.y + dy * 0.5, 1.4, MkC.hot, le.lightMax * 0.75, 7, 0.3);
  },
  mkPL = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      r = t.radius ?? 1.45,
      o = n.rnd;
    n.decals.add(Xt.ring, s, i, r * 2.1, 0.52).params(1, 0.22).color(W.goldHot, 2.9).under(MkC.deep, 0.55);
    n.decals.add(Xt.cracks, s, i, r * 1.6, 1.6).params(0, 0).color(MkC.hot, 2.0, 0.92).under(MkC.dark, 0.65);
    const du = n.particles.use(Mt.dust).tint(W.rock, W.sand),
      st = n.particles.use(Mt.star).tint(W.goldHot, MkC.hot);
    for (let l = 0; l < 28; l++) {
      const c = o.next() * Math.PI * 2;
      du.spawn(s + Math.cos(c) * r * 0.5, 0.2, i + Math.sin(c) * r * 0.5, Math.cos(c) * o.range(2.2, 6.2), o.range(1.4, 4.2), Math.sin(c) * o.range(2.2, 6.2), 0.58, 0.38, 0.8);
      st.spawn(s + Math.cos(c) * r * 0.4, o.range(0.4, 2.2), i + Math.sin(c) * r * 0.4, Math.cos(c) * o.range(2.4, 6.8), o.range(2.0, 5.2), Math.sin(c) * o.range(2.4, 6.8), 0.48, 0.26, 0.08);
    }
    (n.light(s, i, 2.0, W.goldHot, le.lightMax, 9, 0.4), n.shake(bo(t, e) ? 0.46 : 0.24, s, i));
  },
  mkUS = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      r = t.radius ?? 4.2,
      o = n.rnd;
    n.decals.add(Xt.ring, s, i, r, 0.55).params(1, 0.16).color(W.goldHot, 2.8).under(MkC.deep, 0.5);
    const em = n.particles.use(Mt.ember).tint(W.goldHot, MkC.deep);
    for (let l = 0; l < 28; l++) {
      const c = o.next() * Math.PI * 2;
      em.spawn(s + Math.cos(c) * o.range(0.3, 1.5), o.range(0.2, 1.5), i + Math.sin(c) * o.range(0.3, 1.5), Math.cos(c) * o.range(1.8, 5.0), o.range(2.4, 5.8), Math.sin(c) * o.range(1.8, 5.0), 0.6, 0.26, 0.06);
    }
    (n.light(s, i, 1.8, W.goldHot, le.lightMax * 0.95, 9, 0.4), n.shake(bo(t, e) ? 0.32 : 0.16, s, i));
  },
  mkSW = (n, t, e) => {
    const s = t.from ?? t.pos,
      i = t.to ?? t.pos,
      dx = i.x - s.x,
      dy = i.y - s.y,
      dist = Math.hypot(dx, dy) || 1,
      nx = dx / dist,
      ny = dy / dist,
      px = -ny,
      py = nx,
      o = n.rnd;
    n.ribbons.trace($n.energy, s.x, 1.15, s.y, i.x, 1.15, i.y, 0.36, W.goldHot, MkC.deep);
    n.ribbons.trace($n.thin, s.x + px * 0.45, 1.15, s.y + py * 0.45, i.x + px * 0.45, 1.15, i.y + py * 0.45, 0.3, MkC.hot, MkC.accent);
    n.ribbons.trace($n.thin, s.x - px * 0.45, 1.15, s.y - py * 0.45, i.x - px * 0.45, 1.15, i.y - py * 0.45, 0.3, MkC.hot, MkC.accent);
    const sp = n.particles.use(Mt.star).tint(W.goldHot, MkC.deep),
      du = n.particles.use(Mt.dust).tint(W.sand, MkC.accent);
    for (let l = 0; l < 24; l++) {
      const u = o.next(),
        lat = o.signed() * 0.75;
      sp.spawn(s.x + dx * u + px * lat, o.range(0.5, 1.5), s.y + dy * u + py * lat, nx * o.range(2.5, 6.5) + px * o.signed() * 1.5, o.range(0.8, 2.6), ny * o.range(2.5, 6.5) + py * o.signed() * 1.5, 0.42, 0.24, 0.06);
      du.spawn(s.x + dx * u + px * lat, 0.16, s.y + dy * u + py * lat, nx * o.range(1.6, 4.2), o.range(0.6, 1.8), ny * o.range(1.6, 4.2), 0.46, 0.3, 0.7);
    }
    (n.light(s.x + dx * 0.5, s.y + dy * 0.5, 1.4, W.goldHot, le.lightMax * 0.85, 8, 0.32), n.shake(bo(t, e) ? 0.34 : 0.18, s.x, s.y));
  },
  mkGR = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      big = (t.gain ?? 6) >= 6,
      o = n.rnd;
    n.decals
      .add(Xt.ring, s, i, big ? 3.6 : 2.1, big ? 0.65 : 0.42)
      .params(1, big ? 0.22 : 0.14)
      .color(W.goldHot, big ? 3.2 : 2.2)
      .under(MkC.deep, big ? 0.55 : 0.35);
    const st = n.particles.use(Mt.star).tint(W.goldHot, MkC.hot),
      cnt = big ? 32 : 10;
    for (let l = 0; l < cnt; l++) {
      const c = o.next() * Math.PI * 2;
      st.spawn(
        s + Math.cos(c) * 0.45,
        o.range(0.3, big ? 2.2 : 1.5),
        i + Math.sin(c) * 0.45,
        Math.cos(c) * o.range(big ? 2.4 : 1.2, big ? 7.2 : 3.6),
        o.range(big ? 2.6 : 1.6, big ? 6.5 : 3.6),
        Math.sin(c) * o.range(big ? 2.4 : 1.2, big ? 7.2 : 3.6),
        big ? 0.62 : 0.42,
        big ? 0.3 : 0.2,
        0.06,
      );
    }
    (n.light(s, i, big ? 2.0 : 1.4, W.goldHot, le.lightMax * (big ? 1 : 0.55), big ? 10 : 6, big ? 0.45 : 0.24),
      big && n.shake(bo(t, e) ? 0.4 : 0.2, s, i));
  },
  mkMD = {
    monkey_banana_eat: mkBE,
    monkey_peel_throw: mkPT,
    monkey_peel_slip: mkPS,
    monkey_peel_stomp: mkPM,
    monkey_stick_throw: mkST,
    monkey_pillar_slam: mkPL,
    monkey_ult_start: mkUS,
    monkey_ult_sweep: mkSW,
    monkey_stick_grow: mkGR,
  },
  SlC = ws.slime,
  slBN = (n, t) => {
    const s = t.pos.x,
      i = t.pos.y,
      o = n.rnd;
    n.decals.add(Xt.ring, s, i, 1.85, 0.34).params(1, 0.18).color(SlC.hot, 2.2).under(SlC.deep, 0.35);
    const p = n.particles.use(Mt.mote).tint(SlC.hot, SlC.accent);
    for (let l = 0; l < 12; l++) {
      const a = o.next() * Math.PI * 2;
      p.spawn(s + Math.cos(a) * 0.4, o.range(0.2, 1.0), i + Math.sin(a) * 0.4, Math.cos(a) * o.range(1.6, 4.4), o.range(0.8, 2.4), Math.sin(a) * o.range(1.6, 4.4), 0.38, 0.22, 0.05);
    }
    n.light(s, i, 1.0, SlC.hot, le.lightMax * 0.55, 5.5, 0.22);
  },
  slWL = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      o = n.rnd;
    n.decals.add(Xt.ring, s, i, 3.1, 0.5).params(1, 0.22).color(W.goldHot, 3.0).under(SlC.deep, 0.55);
    const st = n.particles.use(Mt.star).tint(W.goldHot, SlC.hot);
    for (let l = 0; l < 24; l++) {
      const a = o.next() * Math.PI * 2;
      st.spawn(s + Math.cos(a) * 0.45, o.range(0.3, 1.4), i + Math.sin(a) * 0.45, Math.cos(a) * o.range(2.2, 6.4), o.range(1.4, 4.2), Math.sin(a) * o.range(2.2, 6.4), 0.46, 0.26, 0.06);
    }
    (n.light(s, i, 1.5, W.goldHot, le.lightMax * 0.95, 8.5, 0.36), n.shake(bo(t, e) ? 0.36 : 0.18, s, i));
  },
  slCL = (n, t) => {
    const s = t.pos.x,
      i = t.pos.y,
      o = n.rnd;
    n.decals.add(Xt.ring, s, i, 1.9, 0.36).params(1, 0.16).color(SlC.hot, 2.4).under(SlC.deep, 0.4);
    const p = n.particles.use(Mt.mote).tint(SlC.hot, SlC.glow);
    for (let l = 0; l < 14; l++) {
      const a = o.next() * Math.PI * 2;
      p.spawn(s + Math.cos(a) * 0.85, o.range(0.25, 1.1), i + Math.sin(a) * 0.85, -Math.cos(a) * o.range(1.4, 3.2), o.range(0.6, 1.8), -Math.sin(a) * o.range(1.4, 3.2), 0.34, 0.2, 0.05);
    }
    n.light(s, i, 1.1, SlC.hot, le.lightMax * 0.65, 6, 0.25);
  },
  slCT = (n, t) => {
    const s = t.pos.x,
      i = t.pos.y,
      o = n.rnd;
    const p = n.particles.use(Mt.mote).tint(SlC.hot, SlC.accent);
    for (let l = 0; l < 6; l++) {
      const a = o.next() * Math.PI * 2;
      p.spawn(s + Math.cos(a) * 0.55, o.range(0.3, 1.1), i + Math.sin(a) * 0.55, Math.cos(a) * o.range(0.8, 2.2), o.range(0.8, 2.0), Math.sin(a) * o.range(0.8, 2.2), 0.26, 0.18, 0.04);
    }
  },
  slBL = (n, t, e) => {
    const s = t.from ?? t.pos,
      i = t.to ?? t.pos,
      full = (t.charge ?? 0) >= 0.85,
      o = n.rnd;
    n.ribbons.trace($n.energy, s.x, 0.75, s.y, i.x, 0.75, i.y, 0.34, full ? W.goldHot : SlC.hot, SlC.deep);
    n.decals.add(Xt.ring, s.x, s.y, full ? 2.8 : 2.0, 0.4).params(1, 0.18).color(full ? W.goldHot : SlC.hot, 2.5).under(SlC.deep, 0.45);
    const p = n.particles.use(full ? Mt.star : Mt.mote).tint(W.goldHot, SlC.accent);
    for (let l = 0; l < (full ? 20 : 12); l++) {
      const a = o.next() * Math.PI * 2;
      p.spawn(s.x + Math.cos(a) * 0.5, o.range(0.2, 1.1), s.y + Math.sin(a) * 0.5, Math.cos(a) * o.range(2.0, 5.2), o.range(0.8, 2.8), Math.sin(a) * o.range(2.0, 5.2), 0.4, 0.24, 0.05);
    }
    (n.light(s.x, s.y, 1.3, SlC.hot, le.lightMax * (full ? 0.9 : 0.6), 7.5, 0.3), full && n.shake(bo(t, e) ? 0.3 : 0.15, s.x, s.y));
  },
  slBH = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      o = n.rnd;
    n.decals.add(Xt.ring, s, i, 2.4, 0.42).params(1, 0.2).color(W.goldHot, 2.8).under(SlC.deep, 0.5);
    const st = n.particles.use(Mt.star).tint(W.goldHot, SlC.hot);
    for (let l = 0; l < 18; l++) {
      const a = o.next() * Math.PI * 2;
      st.spawn(s + Math.cos(a) * 0.35, o.range(0.3, 1.3), i + Math.sin(a) * 0.35, Math.cos(a) * o.range(2.0, 5.8), o.range(1.6, 4.6), Math.sin(a) * o.range(2.0, 5.8), 0.44, 0.26, 0.06);
    }
    (n.light(s, i, 1.4, W.goldHot, le.lightMax * 0.85, 7.5, 0.32), n.shake(bo(t, e) ? 0.34 : 0.16, s, i));
  },
  slPD = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      r = t.radius ?? 2.95,
      o = n.rnd;
    n.decals.add(Xt.ring, s, i, r * 1.15, 0.56).params(1, 0.2).color(SlC.hot, 2.6).under(SlC.deep, 0.48);
    const p = n.particles.use(Mt.mote).tint(SlC.hot, W.heal);
    for (let l = 0; l < 28; l++) {
      const a = o.next() * Math.PI * 2,
        d = o.range(0.3, r * 0.9);
      p.spawn(s + Math.cos(a) * d, o.range(0.15, 0.9), i + Math.sin(a) * d, Math.cos(a) * o.range(1.0, 3.2), o.range(1.4, 3.8), Math.sin(a) * o.range(1.0, 3.2), 0.55, 0.26, 0.06);
    }
    (n.light(s, i, 1.5, SlC.hot, le.lightMax * 0.9, 9.5, 0.42), n.shake(bo(t, e) ? 0.28 : 0.14, s, i));
  },
  slAB = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      r = t.radius ?? 2.95,
      o = n.rnd;
    n.decals.add(Xt.ring, s, i, r * 1.1, 0.48).params(1, 0.22).color(W.goldHot, 2.9).under(SlC.deep, 0.55);
    const p = n.particles.use(Mt.star).tint(W.goldHot, SlC.hot);
    for (let l = 0; l < 26; l++) {
      const a = o.next() * Math.PI * 2;
      p.spawn(s + Math.cos(a) * r, o.range(0.2, 1.1), i + Math.sin(a) * r, -Math.cos(a) * o.range(4.0, 7.5), o.range(0.6, 2.2), -Math.sin(a) * o.range(4.0, 7.5), 0.42, 0.24, 0.06);
    }
    (n.light(s, i, 1.4, W.goldHot, le.lightMax * 0.9, 9, 0.36), n.shake(bo(t, e) ? 0.36 : 0.18, s, i));
  },
  slMD = {
    slime_bounce: slBN,
    slime_wall_hit: slWL,
    slime_cling_start: slCL,
    slime_cling_tick: slCT,
    slime_ball_launch: slBL,
    slime_ball_hit: slBH,
    slime_puddle_start: slPD,
    slime_absorb_burst: slAB,
  },
  Ci = ws.yeque,
  Nb = Se.yeque.skills.s1,
  DD = Se.yeque.skills.s2,
  zD = Se.yeque.skills.ult,
  Vg = { max: 8, width: 0.8, unroll: 0.3 },
  ND = Lt(13483912),
  FD = (n, t, e) => {
    const s = t.from ?? t.pos,
      i = t.to ?? t.pos;
    let a = i.x - s.x,
      o = i.y - s.y;
    const r = Math.hypot(a, o) || 0.01;
    ((a /= r), (o /= r));
    const l = r / Nr(Nb, "dashSpeed"),
      c = n.rnd;
    (n.ribbons.trace($n.ink, s.x, 0.95, s.y, i.x, 0.95, i.y, l),
      n.ribbons.trace($n.thin, s.x, 1.05, s.y, i.x, 1.05, i.y, l, Ci.hot, Ci.accent),
      JM(
        n,
        s.x - a * 0.5,
        s.y - o * 0.5,
        i.x + a * 0.7,
        i.y + o * 0.7,
        _x(Nb) * 0.62,
        1.3,
        l / 1.3,
        Ci.hot,
        1.4,
        0.8,
      ),
      Th(n, s.x, 0.7, s.y, 1.1));
    const f = n.n(10),
      d = n.particles.use(Mt.inkDot);
    for (let u = 0; u < f; u++) {
      const m = c.next(),
        x = c.chance(0.5) ? 1 : -1,
        p = c.range(1.5, 4.5),
        g = c.range(0.09, 0.2);
      d.spawn(
        s.x + a * r * m,
        c.range(0.5, 1.2),
        s.y + o * r * m,
        -o * x * p + a * 2,
        c.range(0.5, 2.5),
        a * x * p + o * 2,
        c.range(0.35, 0.55),
        g,
        g * 0.7,
        m * l,
      );
    }
    const h = n.particles.use(Mt.streak).tint(Ci.hot, Ci.accent);
    for (let u = 0; u < 3; u++) {
      const m = c.range(0.1, 0.7),
        x = (u - 1) * 0.55;
      h.spawn(
        s.x + a * r * m - o * x,
        c.range(0.5, 1.5),
        s.y + o * r * m + a * x,
        a * 13,
        0,
        o * 13,
        0.18,
        0.08,
        0.02,
        m * l,
      );
    }
    (n.after(l, () => {
      (n.particles
        .use(Mt.hitFlash)
        .tint(W.white, Ci.hot)
        .spawn(i.x, 1, i.y, 0, 0, 0, le.flashBasic, 0.7, 1.2),
        Sh(n, i.x, 0.8, i.y, 5, 5, a, o, 0.6));
    }),
      t.unitId === e.playerId && n.shake(0.08, s.x, s.y));
  },
  UD = (n, t) => {
    const e = t.dir?.x ?? 1,
      s = t.dir?.y ?? 0,
      i = Math.atan2(s, e),
      a = t.pos.x + e * 0.7,
      o = t.pos.y + s * 0.7,
      r = 1.2,
      l = Nr(DD, "spread"),
      c = n.particles.use(Mt.streak).tint(W.white, Ci.accent);
    for (let f = -1; f <= 1; f++) {
      const d = i + f * l;
      (c.spawn(a, r, o, Math.cos(d) * 22, 0, Math.sin(d) * 22, 0.13, 0.09, 0.02),
        c.spawn(a, r, o, Math.cos(d) * 14, 0, Math.sin(d) * 14, 0.11, 0.07, 0.02, 0.02));
    }
    (n.particles.use(Mt.hitFlash).tint(W.white, Ci.hot).spawn(a, r, o, 0, 0, 0, le.flashBasic, 0.6, 1),
      Sh(n, a, r, o, 7, 7, e, s, l * 1.6),
      Th(n, t.pos.x + e * 0.3, 0.9, t.pos.y + s * 0.3, 0.7, !1));
  },
  OD = (n, t) => {
    const e = t.pos.x,
      s = t.pos.y,
      i = n.rnd;
    let a = 1,
      o = 0,
      r = 3;
    if (
      (n.anchor(t.unitId) && n.a.unit && ((a = Math.cos(n.a.unit.facing)), (o = Math.sin(n.a.unit.facing))),
      n.anchor(t.targetId))
    ) {
      const d = n.a.x - e,
        h = n.a.z - s,
        u = Math.hypot(d, h);
      u > 0.3 && ((a = d / u), (o = h / u), (r = Math.min(Vg.max, u)));
    }
    const l = Nr(zD, "vanish"),
      c = l + 0.45,
      f = r / 2;
    (n.decals
      .add(Xt.scroll, e + a * f, s + o * f, f, c)
      .rot(Math.atan2(o, a), (Vg.width * 0.5 * 1.8) / f)
      .params(Math.min(Vg.unroll, l) / c, i.next() * oe)
      .color(W.ink, 1)
      .under(ND, n.ctx.terrain.inWater(e + a * f, s + o * f) ? 0.42 : 0.52),
      n.glow
        .spawn(qe.cone, sn.vortex, 0.38)
        .at(e, 0.05, s)
        .scale3(0.85, 1.7, 0.85, 0.3, 2.1, 0.3)
        .color(W.ink, 1, 0.95)
        .fade(0.04, 0.35)
        .opt(0, 5, 1)
        .spin(0, 11, 0),
      Th(n, e, 1.1, s, 1.7),
      Th(n, e + i.signed() * 0.3, 0.6, s + i.signed() * 0.3, 1.2, !0, 0.05),
      Sh(n, e, 1, s, 10, 4.5),
      n.decals.add(Xt.scorch, e, s, 1.35, 1.5).color(W.black, 0).under(W.ink, 0.95),
      n.particles.use(Mt.hitFlash).tint(W.white, Ci.hot).spawn(e, 1.1, s, 0, 0, 0, le.flashBasic, 0.6, 1));
  },
  BD = (n, t, e) => {
    const s = t.pos.x,
      i = t.pos.y,
      a = t.from ?? t.pos,
      o = t.to ?? t.pos,
      r = $0(n, t.targetId, 0.5, 1.1),
      l = n.rnd;
    let c = s - o.x,
      f = i - o.y;
    const d = Math.hypot(c, f) || 1;
    ((c /= d), (f /= d));
    const h = Math.atan2(f, c);
    (n.ribbons.trace($n.thin, a.x, 1.05, a.y, o.x, 1.05, o.y, 0.05, W.white, Ci.accent),
      QM(
        n,
        s - c * 1.7,
        r - 0.1,
        i - f * 1.7 + 0.5,
        h,
        2.1,
        0.24,
        Ci.hot,
        W.white,
        1.25,
        -Math.PI / 2 + 0.4,
        !1,
        2.6,
      ));
    const u = n.particles.use(Mt.streak).tint(W.white, Ci.accent);
    (u.spawn(s, r - 0.6, i, c * 1.5, 16, f * 1.5, 0.14, 0.11, 0.03, 0.03),
      u.spawn(s + c * 0.15, r - 0.3, i + f * 0.15, c * 1.5, 11, f * 1.5, 0.12, 0.08, 0.02, 0.05),
      vs(n, s, r, i, 2.1, Ci.hot, Ci.accent, c, f, 9, le.flashBig, 11));
    for (let x = 0; x < 5; x++) {
      const p = h + (x - 2) * 0.62 + l.signed() * 0.18,
        g = l.range(1.1, 1.9) * (x === 2 ? 1.3 : 1);
      JM(
        n,
        s + Math.cos(p) * (0.3 + g),
        i + Math.sin(p) * (0.3 + g),
        s + Math.cos(p) * 0.2,
        i + Math.sin(p) * 0.2,
        l.range(0.55, 0.8),
        1.5,
        0,
      );
    }
    (Th(n, s, r, i, 1.9), Sh(n, s, r, i, 10, 7, c, f, 1.3), Sh(n, s, r, i, 5, 5, c, f, 1, 0.02, W.cinnabar));
    const m = n.particles.use(Mt.silk);
    for (let x = 0; x < n.n(5); x++) {
      const p = l.range(0.16, 0.3);
      m.spawn(
        o.x + l.signed() * 0.6,
        l.range(1.2, 2.2),
        o.y + l.signed() * 0.6,
        l.signed() * 1.4,
        l.range(0.4, 1.8),
        l.signed() * 1.4,
        l.range(0.8, 1.2),
        p,
        p * 0.9,
        l.next() * 0.1,
      );
    }
    (n.decals.add(Xt.scorch, s, i, 1.25, 2.2).color(W.black, 0).under(W.ink, 0.9),
      n.light(s, i, r, Ci.hot, le.lightMax, 8, 0.3),
      n.shake(bo(t, e) ? 0.4 : 0.25, s, i));
  },
  HD = { yeque_s1_dash: FD, yeque_s2_cast: UD, yeque_ult_vanish: OD, yeque_ult_strike: BD },
  $D = { ...xD, ...UP, ...ED, ...YP, ...PD, ...mMD, ...xMD, ...sMD, ...scMD, ...pbMD, ...mgMD, ...hmMD, ...cwMD, ...mkMD, ...slMD, ...eD, ...HD };

function GD() {
  return { x: 0, y: 0, z: 0, height: 2, radius: 0.6, visible: !1, opacity: 1, unit: null };
}

function VD(n) {
  switch (n.kind) {
    case "hero":
      return ui.hero;
    case "minion":
      return ui.minion;
    case "tower":
      return ui.tower;
    case "core":
      return ui.core;
    default:
      return 0;
  }
}

function WD(n, t) {
  const e = new Map();
  let s = new Float32Array(192),
    i = 0,
    a = n.frame,
    o;
  const r = { x: 0, y: 0, z: 0, height: 2, opacity: 1 };
  return {
    begin(l) {
      ((a = l), (o = n.getModule("units")), e.clear(), (i = 0));
      const c = l.playerTeam;
      for (const f of l.state.units) {
        if ((e.set(f.id, f), f.team !== c || !f.alive)) continue;
        const d = VD(f);
        if (!(d <= 0)) {
          if (i * 3 + 3 > s.length) {
            const h = new Float32Array(s.length * 2);
            (h.set(s), (s = h));
          }
          ((s[i * 3] = f.pos.x), (s[i * 3 + 1] = f.pos.y), (s[i * 3 + 2] = d * d), i++);
        }
      }
    },
    get(l, c) {
      const f = e.get(l);
      if (!f) return !1;
      const d = f.team === a.playerTeam || f.visible[a.playerTeam];
      if (((c.radius = f.radius), (c.unit = f), o?.getInfo && o.getInfo(l, r)))
        return (
          (c.x = r.x),
          (c.y = r.y),
          (c.z = r.z),
          (c.height = r.height),
          (c.opacity = r.opacity),
          (c.visible = f.alive && (d || r.opacity > 0.02)),
          !0
        );
      if (!n.unitQuery.getPosition(l, t)) {
        const h = a.alpha;
        t.set(f.prevPos.x + (f.pos.x - f.prevPos.x) * h, 0, f.prevPos.y + (f.pos.y - f.prevPos.y) * h);
      }
      return (
        (c.x = t.x),
        (c.y = t.y),
        (c.z = t.z),
        (c.height = n.unitQuery.getHeight(l)),
        (c.opacity = 1),
        (c.visible = f.alive && d),
        !0
      );
    },
    unit(l) {
      return e.get(l);
    },
    pointVisible(l, c) {
      for (let f = 0; f < i; f++) {
        const d = s[f * 3] - l,
          h = s[f * 3 + 1] - c;
        if (d * d + h * h <= s[f * 3 + 2]) return !0;
      }
      return !1;
    },
    attach(l, c, f) {
      const d = o ?? n.getModule("units");
      return d?.getAttach ? d.getAttach(l, c, f) : !1;
    },
    flashTint(l, c, f, d) {
      (o ?? n.getModule("units"))?.flashTint?.(l, c, f, d);
    },
    flashRim(l, c) {
      (o ?? n.getModule("units"))?.flashRim?.(l, c);
    },
  };
}

const Fb = 512,
  jD = 31,
  qD = new Ut(789016),
  Zu = 12,
  XD = `
uniform vec2 uAtlas;
attribute vec4 aP;
attribute vec4 aC;
attribute vec4 aX;
varying vec2 vUv;
varying vec4 vColor;
varying vec2 vMix;
void main() {
  vec2 corner = position.xy;
  float cr = cos(aX.y);
  float sr = sin(aX.y);
  vec4 mv = viewMatrix * vec4(aP.xyz, 1.0);
  mv.xy += vec2(corner.x * cr - corner.y * sr, corner.x * sr + corner.y * cr) * aP.w;
  // 稍微朝相机拉近一点：贴在模型表面的图标不被模型吃掉
  mv.z += aX.w;
  gl_Position = projectionMatrix * mv;
  float cx = mod(aX.x, ${ji}.0);
  float cy = floor(aX.x / ${ji}.0);
  vUv = (vec2(cx, cy) + vec2(corner.x + 0.5, 0.5 - corner.y)) * uAtlas;
  vColor = aC;
  vMix = vec2(aX.z, max(aC.r, max(aC.g, aC.b)) * 0.85);
}
`;

class YD {
  mesh;
  data = new Float32Array(Fb * Zu);
  buffer;
  geo;
  mat;
  n = 0;
  range = { start: 0, count: 0 };
  constructor(t) {
    const e = new Gl(1, 1),
      s = new Cf();
    (s.setIndex(e.getIndex()), s.setAttribute("position", e.getAttribute("position")));
    const i = new rx(this.data, Zu, 1);
    (i.setUsage(Pi),
      ["aP", "aC", "aX"].forEach((a, o) => s.setAttribute(a, new No(i, 4, o * 4))),
      (s.instanceCount = 0),
      (this.geo = s),
      (this.buffer = i),
      (this.mat = new An({
        uniforms: { uAtlas: { value: new Ee(1 / ji, 1 / ih) }, tAtlas: { value: t } },
        vertexShader: XD,
        fragmentShader: KM,
      })),
      Bh(this.mat),
      (this.mesh = new Sn(s, this.mat)),
      (this.mesh.name = "fx.sprites"),
      (this.mesh.frustumCulled = !1),
      (this.mesh.renderOrder = 10),
      (this.mesh.visible = !1));
  }
  begin() {
    this.n = 0;
  }
  draw(t, e, s, i, a, o, r, l, c, f, d = 0) {
    if (this.n >= Fb || c <= 0) return;
    const h = this.data,
      u = this.n++ * Zu;
    ((h[u] = e),
      (h[u + 1] = s),
      (h[u + 2] = i),
      (h[u + 3] = a),
      (h[u + 4] = r.r * l),
      (h[u + 5] = r.g * l),
      (h[u + 6] = r.b * l),
      (h[u + 7] = c),
      (h[u + 8] = t),
      (h[u + 9] = o),
      (h[u + 10] = f),
      (h[u + 11] = d));
  }
  icon(t, e, s, i, a, o, r, l, c, f, d = 0) {
    (this.draw(jD, e, s, i, a * 1.9, 0, qD, 1, 0.6 * c, 0, d - 0.02),
      this.draw(t, e, s, i, a, o, r, l, c, f, d));
  }
  flush() {
    const t = this.n;
    ((this.geo.instanceCount = t),
      (this.mesh.visible = t > 0),
      t !== 0 &&
        ((this.range.start = 0),
        (this.range.count = t * Zu),
        (this.buffer.updateRanges.length = 0),
        this.buffer.updateRanges.push(this.range),
        (this.buffer.needsUpdate = !0)));
  }
  get count() {
    return this.n;
  }
  dispose() {
    (this.geo.dispose(), this.mat.dispose());
  }
}

const Qu = {
    low: { cap: 2048, scale: 0.45 },
    medium: { cap: 4096, scale: 0.7 },
    high: { cap: 6144, scale: 1 },
  },
  Wg = new dt();

class l8 {
  ctx;
  atlas;
  particles;
  ribbons;
  decals;
  glow;
  sprites;
  rnd = new XM(2654435769);
  a = GD();
  anchors;
  now = 0;
  dt = 0;
  density = 1;
  hooks = [];
  onClear = [];
  timers = [];
  trackers = [];
  tmp = new dt();
  constructor(t) {
    ((this.ctx = t), (this.atlas = DI()), (window.__fxkit = this));
    const e = Qu[t.settings.name] ?? Qu.high;
    ((this.density = e.scale),
      (this.particles = new rP(this.atlas, e.cap)),
      (this.ribbons = new dP()),
      (this.decals = new OI()),
      this.decals.setFill(bb[t.settings.name] ?? 1),
      (this.glow = new aP()),
      (this.sprites = new YD(this.atlas)),
      (this.anchors = WD(t, new dt())),
      (this.lowQ = t.settings.name === "low"));
    const s = (i, a) => (this.anchors.get(i, this.a) ? (a.set(this.a.x, this.a.y, this.a.z), !0) : !1);
    ((this.decals.resolve = s),
      (this.glow.resolve = s),
      t.layers.fx.add(
        this.decals.mesh,
        this.decals.xrayMesh,
        this.glow.group,
        this.ribbons.mesh,
        this.particles.mesh,
        this.sprites.mesh,
      ));
  }
  setQuality(t) {
    const e = Qu[t.name] ?? Qu.high;
    ((this.density = e.scale),
      this.particles.setCapacity(e.cap),
      this.decals.setFill(bb[t.name] ?? 1),
      (this.lowQ = t.name === "low"));
  }
  lowQ = !1;
  n(t) {
    const e = t * this.density,
      s = Math.floor(e);
    return Math.max(1, s + (this.rnd.next() < e - s ? 1 : 0));
  }
  after(t, e) {
    this.timers.push({ at: this.now + t, fn: e });
  }
  track(t, e, s, i) {
    this.trackers.push({ unitId: t, t0: this.now, dur: e, fn: s, end: i ?? null });
  }
  trail(t, e, s, i, a, o, r = 0, l = 0, c = 0) {
    if (!this.anchors.get(t, this.a)) return;
    const f = -c * r,
      d = l * r,
      h = this.ribbons.start(e, this.a.x + f, this.a.y + i, this.a.z + d, a, o);
    h < 0 ||
      this.track(
        t,
        s,
        (u) => this.ribbons.move(h, u.x + f, u.y + i, u.z + d),
        () => this.ribbons.end(h),
      );
  }
  anchor(t) {
    return t !== void 0 && t >= 0 && this.anchors.get(t, this.a) ? !0 : ((this.a.unit = null), !1);
  }
  light(t, e, s, i, a, o, r) {
    this.ctx.lights.pulse(t, e, s, i, a, o, r);
  }
  focusDist(t, e) {
    return (this.ctx.rig.getFocus(Wg), Math.hypot(t - Wg.x, e - Wg.z));
  }
  shake(t, e, s) {
    const i = this.focusDist(e, s),
      a = i <= 12 ? 1 : i >= 32 ? 0 : 1 - (i - 12) / 20;
    a > 0 && this.ctx.rig.shake(t * a);
  }
  begin(t) {
    const e = t.dt;
    ((this.dt = e), (this.now += e));
    const s = this.now;
    ((this.particles.now = s),
      (this.ribbons.now = s),
      (this.decals.now = s),
      (this.glow.now = s),
      this.anchors.begin(t),
      this.sprites.begin());
    const i = this.timers;
    if (i.length > 0) {
      let o = 0;
      const r = i.length;
      for (let l = 0; l < r; l++) {
        const c = i[l];
        c.at <= s ? c.fn() : (i[o++] = c);
      }
      for (let l = r; l < i.length; l++) i[o++] = i[l];
      i.length = o;
    }
    const a = this.trackers;
    if (a.length > 0) {
      let o = 0;
      const r = a.length;
      for (let l = 0; l < r; l++) {
        const c = a[l],
          f = c.dur > 0 ? (s - c.t0) / c.dur : 1,
          d = this.anchors.get(c.unitId, this.a);
        (d && c.fn(this.a, f > 1 ? 1 : f, e), !d || f >= 1 ? c.end?.() : (a[o++] = c));
      }
      for (let l = r; l < a.length; l++) a[o++] = a[l];
      a.length = o;
    }
  }
  flush(t) {
    for (const e of this.hooks) e(t);
    (this.particles.flush(),
      this.ribbons.flush(),
      this.decals.flush(this.dt),
      this.glow.flush(),
      this.sprites.flush());
  }
  clear() {
    for (const t of this.trackers) t.end?.();
    ((this.trackers.length = 0),
      (this.timers.length = 0),
      this.particles.clear(),
      this.ribbons.clear(),
      this.decals.clear(),
      this.glow.clear());
    for (const t of this.onClear) t();
  }
  get v() {
    return this.tmp;
  }
  dispose() {
    (this.ctx.layers.fx.remove(
      this.decals.mesh,
      this.decals.xrayMesh,
      this.glow.group,
      this.ribbons.mesh,
      this.particles.mesh,
      this.sprites.mesh,
    ),
      this.particles.dispose(),
      this.ribbons.dispose(),
      this.decals.dispose(),
      this.glow.dispose(),
      this.sprites.dispose(),
      this.atlas.dispose(),
      (this.timers.length = 0),
      (this.trackers.length = 0),
      (this.hooks.length = 0),
      (this.onClear.length = 0));
  }
}

const jg = () => {},
  KD = { glow: W.moth, hot: Lt(16773312), deep: Lt(2062962) };

function To(n) {
  return {
    mode: sn.core,
    intensity: 1.8,
    add: 0.6,
    k: 1,
    roll: 0,
    yawSpin: 0,
    ribbon: $n.energy,
    ribbonWidth: 1,
    halo: 0,
    rate: 0,
    arc: 0,
    ground: 0,
    progress: -1,
    echo: 0,
    echoGap: 0.5,
    emit: jg,
    hit: jg,
    end: jg,
    ...n,
  };
}

const Ub = { ...ws.xingli, tail: W.stringGold, tail2: ws.xingli.accent },
  ZD = { ...ws.yeque, tail: ws.yeque.hot, tail2: ws.yeque.deep },
  Ob = { ...ws.fengling, tail: W.white, tail2: ws.fengling.hot };

function Ju(n, t, e, s, i, a, o, r = 0) {
  n.particles
    .use(Mt.ringB)
    .tint(t.hot, t.glow)
    .spawn(e, s, i, 0, 0, 0, o, a * 0.3, a, r);
}

const Bb = {
  xingli_basic: To({
    shape: qe.slash,
    mode: sn.slash,
    scale: [0.62, 0.62, 0.62],
    colors: () => Ub,
    intensity: 2.3,
    add: 0.45,
    k: 0.62,
    progress: -2,
    ribbon: $n.string,
    ribbonWidth: 0.9,
    halo: 0.55,
    hit(n, t, e, s, i) {
      (n.particles.use(Mt.hitFlash).tint(W.white, t.glow).spawn(e, s, i, 0, 0, 0, le.flashBasic, 0.5, 0.85),
        Ju(n, t, e, s, i, 1.25, 0.24));
    },
  }),
  xingli_s1: To({
    shape: qe.slash,
    mode: sn.slash,
    scale: [1.12, 1.12, 1.12],
    colors: () => Ub,
    intensity: 2.4,
    add: 0.35,
    k: 0.66,
    progress: -2,
    echo: 2,
    echoGap: 0.56,
    ribbon: $n.string,
    ribbonWidth: 1.5,
    halo: 1.1,
    rate: 30,
    ground: 1.1,
    emit(n, t, e, s, i, a, o) {
      const r = n.rnd,
        l = r.chance(0.5) ? 1 : -1,
        c = r.range(4.5, 7.5);
      n.particles
        .use(Mt.string)
        .spawn(
          e - a * r.range(0.3, 1.4),
          s + r.signed() * 0.08,
          i - o * r.range(0.3, 1.4),
          -o * l * c,
          0,
          a * l * c,
          0.12,
          0.05,
          0.02,
        );
    },
    hit(n, t, e, s, i, a) {
      (n.particles.use(Mt.hitFlash).tint(W.white, t.glow).spawn(e, s, i, 0, 0, 0, le.flashSkill, 0.9, 1.5),
        Ju(n, t, e, s, i, 2, 0.28),
        Ju(n, t, e, s, i, 1.4, 0.3, 0.07),
        n.decals.add(Xt.rings, e, i, 1.3, 0.38).params(2, 0.22).color(t.glow, 1.5).under(W.shadow, 0.25));
      const o = n.particles.use(Mt.mote);
      for (let r = 0; r < n.n(4); r++)
        o.spawn(e, s, i, n.rnd.signed() * 3, n.rnd.range(0.5, 3), n.rnd.signed() * 3, 0.4, 0.2, 0.05);
      a && n.shake(0.08, e, i);
    },
    end(n, t, e, s, i) {
      Ju(n, t, e, s, i, 1.8, 0.32);
      const a = n.particles.use(Mt.mote);
      for (let o = 0; o < n.n(6); o++)
        a.spawn(e, s, i, n.rnd.signed() * 2.5, n.rnd.range(-0.5, 2), n.rnd.signed() * 2.5, 0.5, 0.2, 0.05);
    },
  }),
  fengling_basic: To({
    shape: qe.arrow,
    mode: sn.solid,
    scale: [1.15, 1.15, 1.15],
    colors: () => Ob,
    intensity: 1.3,
    add: 0.2,
    ribbon: $n.thin,
    ribbonWidth: 0.9,
    halo: 0.45,
    hit(n, t, e, s, i, a, o, r) {
      (vs(n, e, s, i, 0.75, W.white, t.glow, o, r, 3, le.flashBasic, 6),
        n.particles
          .use(Mt.plume)
          .spawn(e, s, i, n.rnd.signed() * 2 - o, 2, n.rnd.signed() * 2 - r, 0.7, 0.34, 0.28));
    },
  }),
  scallion_basic: To({
    shape: qe.arrow,
    mode: sn.solid,
    scale: [1.15, 1.15, 1.2],
    colors: () => Sc,
    intensity: 1.45,
    add: 0.25,
    ribbon: $n.thin,
    ribbonWidth: 0.95,
    halo: 0.55,
    hit(n, t, e, s, i, a, o, r) {
      (vs(n, e, s, i, 0.8, Sc.hot, Sc.glow, o, r, 3, le.flashBasic, 6),
        n.particles
          .use(Mt.mote)
          .tint(Sc.hot, Sc.accent)
          .spawn(e, s, i, n.rnd.signed() * 2.4 - o, 1.8, n.rnd.signed() * 2.4 - r, 0.36, 0.26, 0.14));
    },
  }),
  paperboy_basic: To({
    shape: qe.arrow,
    mode: sn.solid,
    scale: [1.05, 1.05, 1.1],
    colors: () => PbC,
    intensity: 1.5,
    add: 0.28,
    ribbon: $n.thin,
    ribbonWidth: 0.85,
    halo: 0.52,
    hit(n, t, e, s, i, a, o, r) {
      (vs(n, e, s, i, 0.75, PbC.hot, PbC.glow, o, r, 3, le.flashBasic, 6),
        n.particles
          .use(Mt.mote)
          .tint(PbC.hot, PbC.accent)
          .spawn(e, s, i, n.rnd.signed() * 2.2 - o, 1.7, n.rnd.signed() * 2.2 - r, 0.38, 0.26, 0.12));
    },
  }),
  paperboy_crane: To({
    shape: qe.arrow,
    mode: sn.solid,
    scale: [1.65, 1.35, 1.85],
    colors: () => PbC,
    intensity: 1.9,
    add: 0.38,
    ribbon: $n.energy,
    ribbonWidth: 1.25,
    halo: 0.95,
    rate: 18,
    emit(n, t, e, s, i) {
      const r = n.rnd;
      n.particles
        .use(Mt.mote)
        .tint(PbC.hot, PbC.glow)
        .spawn(e + r.signed() * 0.25, s + r.signed() * 0.2, i + r.signed() * 0.25, r.signed() * 0.8, r.range(0.4, 1.4), r.signed() * 0.8, 0.38, 0.22, 0.08);
    },
    hit(n, t, e, s, i) {
      pbCH(n, { pos: { x: e, y: i } }, -1);
    },
  }),
  maggot_basic: To({
    shape: qe.diamond,
    mode: sn.solid,
    scale: [0.24, 0.19, 0.28],
    colors: () => MgBrownC,
    intensity: 0.88,
    add: 0,
    roll: 6,
    ribbon: $n.thin,
    ribbonWidth: 0.22,
    halo: 0,
    hit(n, t, e, s, i, a, o, r) {
      const rnd = n.rnd,
        p = n.particles.use(Mt.debris).tint(MgBrownC.hot, MgBrownC.deep);
      for (let k = 0; k < 5; k++)
        p.spawn(e, s, i, rnd.signed() * 2.4 - o * 0.5, rnd.range(0.8, 2.2), rnd.signed() * 2.4 - r * 0.5, 0.28, 0.14, 0.05);
    },
  }),
  maggot_basic_gold: To({
    shape: qe.diamond,
    mode: sn.solid,
    scale: [0.3, 0.24, 0.34],
    colors: () => MgGoldC,
    intensity: 1.55,
    add: 0.2,
    roll: 8,
    ribbon: $n.thin,
    ribbonWidth: 0.34,
    halo: 0.22,
    hit(n, t, e, s, i, a, o, r) {
      const rnd = n.rnd,
        p = n.particles.use(Mt.star).tint(MgGoldC.hot, MgGoldC.glow);
      for (let k = 0; k < 8; k++)
        p.spawn(e, s, i, rnd.signed() * 2.8 - o * 0.5, rnd.range(1.0, 2.6), rnd.signed() * 2.8 - r * 0.5, 0.34, 0.2, 0.06);
    },
  }),
  fengling_s1: To({
    shape: qe.arrow,
    mode: sn.solid,
    scale: [2, 2, 2],
    colors: () => Ob,
    intensity: 1.45,
    add: 0.25,
    roll: 4,
    ribbon: $n.white,
    ribbonWidth: 1.25,
    halo: 1,
    rate: 16,
    emit(n, t, e, s, i, a, o) {
      const r = n.rnd,
        l = r.range(0.14, 0.26);
      n.particles
        .use(Mt.grass)
        .spawn(
          e + r.signed() * 0.3,
          0.1,
          i + r.signed() * 0.3,
          a * r.range(2, 5) + r.signed() * 1.5,
          r.range(1.2, 2.6),
          o * r.range(2, 5) + r.signed() * 1.5,
          r.range(0.35, 0.55),
          l,
          l * 0.8,
        );
    },
    hit(n, t, e, s, i, a, o, r) {
      (vs(n, e, s, i, 1.6, W.white, t.glow, o, r, 6, le.flashSkill, 9),
        bn(n, e, i, 1.5, 0.3, t.glow, 1.4, 0.2, 0.25));
      const l = n.particles.use(Mt.debris).tint(W.stone, W.stoneDark);
      for (let d = 0; d < n.n(12); d++) {
        const h = Math.atan2(r, o) + n.rnd.signed() * 1,
          u = n.rnd.range(3, 8.5),
          m = n.rnd.range(0.18, 0.4);
        l.spawn(
          e,
          s,
          i,
          Math.cos(h) * u,
          n.rnd.range(2, 6.5),
          Math.sin(h) * u,
          n.rnd.range(0.55, 0.9),
          m,
          m * 0.8,
        );
      }
      const c = n.particles.use(Mt.dust).tint(W.stone, W.stoneDark);
      for (let d = 0; d < n.n(3); d++)
        c.spawn(
          e,
          s,
          i,
          o * n.rnd.range(1, 3) + n.rnd.signed(),
          n.rnd.range(0.3, 1.2),
          r * n.rnd.range(1, 3) + n.rnd.signed(),
          0.5,
          0.6,
          1.4,
        );
      const f = n.particles.use(Mt.plume);
      for (let d = 0; d < n.n(3); d++)
        f.spawn(
          e,
          s,
          i,
          n.rnd.signed() * 3 - o * 2,
          n.rnd.range(1, 3.5),
          n.rnd.signed() * 3 - r * 2,
          0.9,
          0.4,
          0.32,
        );
      a && n.shake(le.shakeSkill, e, i);
    },
    end(n, t, e, s, i, a, o, r) {
      if (!r) return;
      (n.glow
        .spawn(qe.arrow, sn.solid, 0.7)
        .at(e + a * 0.2, 0.42, i + o * 0.2)
        .scale(1.7)
        .rot(0, -Math.atan2(o, a), -0.62)
        .color(t.hot, 1.3, 1)
        .fade(0, 0.7)
        .opt(0.2, 1, 0),
        n.particles.use(Mt.dust).spawn(e + a * 0.6, 0.12, i + o * 0.6, a, 0.8, o, 0.4, 0.4, 0.9));
      const l = 0.2;
      n.particles.use(Mt.grass).spawn(e + a * 0.6, 0.12, i + o * 0.6, a * 2, 2.2, o * 2, 0.5, l, l * 0.8);
    },
  }),
  yeque_s2: To({
    shape: qe.dagger,
    mode: sn.solid,
    scale: [0.86, 0.86, 0.86],
    colors: () => ZD,
    intensity: 1.55,
    add: 0.2,
    roll: 3,
    ribbon: $n.thin,
    ribbonWidth: 0.85,
    halo: 0.5,
    rate: 14,
    emit(n, t, e, s, i, a, o) {
      const r = n.rnd,
        l = r.range(0.06, 0.13);
      n.particles
        .use(Mt.inkDot)
        .spawn(
          e - a * 0.5,
          s,
          i - o * 0.5,
          -a * 1.5 + r.signed(),
          r.range(0, 0.8),
          -o * 1.5 + r.signed(),
          0.3,
          l,
          l * 0.6,
        );
    },
    hit(n, t, e, s, i, a) {
      (n.particles.use(Mt.hitFlash).tint(W.white, t.hot).spawn(e, s, i, 0, 0, 0, le.flashBasic, 0.6, 1),
        n.particles.use(Mt.glint).tint(t.hot, t.hot).spawn(e, s, i, 0, 0, 0, 0.14, 0.7, 1.5),
        n.particles.use(Mt.ink).spawn(e, s, i, 0, 0.3, 0, 0.36, 0.5, 0.95, 0.02));
      const o = n.particles.use(Mt.inkDot);
      for (let r = 0; r < n.n(5); r++) {
        const l = n.rnd.range(0.07, 0.16);
        o.spawn(e, s, i, n.rnd.signed() * 4, n.rnd.range(0.5, 3), n.rnd.signed() * 4, 0.4, l, l * 0.7);
      }
      a && n.shake(0.06, e, i);
    },
    end(n, t, e, s, i, a, o, r) {
      r &&
        (n.glow
          .spawn(qe.dagger, sn.solid, 0.55)
          .at(e + a * 0.15, 0.3, i + o * 0.15)
          .scale(0.86)
          .rot(0.4, -Math.atan2(o, a), -0.7)
          .color(t.hot, 1.5, 1)
          .fade(0, 0.6)
          .opt(0.2, 1, 0),
        n.particles.use(Mt.inkFlat).spawn(e + a * 0.4, 0.07, i + o * 0.4, 0, 0, 0, 0.7, 0.4, 0.7));
    },
  }),
  minion_ranged: To({
    shape: qe.sphere,
    scale: [0.17, 0.17, 0.17],
    colors: Fa,
    intensity: 1.6,
    ribbon: $n.thin,
    ribbonWidth: 0.75,
    halo: 0.6,
    hit(n, t, e, s, i) {
      vs(n, e, s, i, 0.6, t.hot, t.glow, 0, 0, 2, le.flashBasic, 4);
    },
  }),
  minion_siege: To({
    shape: qe.sphere,
    scale: [0.34, 0.34, 0.34],
    colors: Fa,
    intensity: 2.4,
    ribbon: $n.smoke,
    ribbonWidth: 1,
    halo: 1.3,
    rate: 18,
    arc: 1,
    emit(n, t, e, s, i) {
      n.particles
        .use(Mt.ember)
        .tint(t.hot, t.glow)
        .spawn(e, s, i, n.rnd.signed(), n.rnd.signed(), n.rnd.signed(), 0.4, 0.14, 0.04);
    },
    hit(n, t, e, s, i) {
      (L0(n, e, s, i, 1.7, t.hot, 0.2, !0),
        bn(n, e, i, 1.4, 0.32, t.glow, 1.4, 0.2, 0.3),
        H0(n, e, s, i, 6, 7, t.hot, t.glow, 0, 0, 0, 0.35, 0.13),
        U0(n, e, s, i, 3, 4, 4, t.hot, t.glow, 0.18),
        Ni(n, e, 0.3, i, 3, 0.4, 1.2, W.dust, W.dustDark, 0.6));
    },
  }),
  tower_bolt: To({
    shape: qe.diamond,
    scale: [1.1, 0.72, 0.72],
    colors: Fa,
    intensity: 2.4,
    add: 0.45,
    k: 1.4,
    roll: 10,
    ribbon: $n.bolt,
    ribbonWidth: 1.3,
    halo: 1.7,
    rate: 22,
    emit(n, t, e, s, i) {
      n.particles
        .use(Mt.glint)
        .tint(t.hot, t.glow)
        .spawn(e, s, i, n.rnd.signed() * 1.2, n.rnd.signed() * 1.2, n.rnd.signed() * 1.2, 0.22, 0.26, 0.05);
    },
    hit(n, t, e, s, i) {
      L0(n, e, s, i, 1.1, t.hot, le.flashBasic);
    },
  }),
  core_bolt: To({
    shape: qe.diamond,
    scale: [1.35, 0.9, 0.9],
    colors: Fa,
    intensity: 2.6,
    add: 0.45,
    k: 1.4,
    roll: 10,
    ribbon: $n.bolt,
    ribbonWidth: 1.8,
    halo: 2.3,
    rate: 30,
    emit(n, t, e, s, i) {
      n.particles
        .use(Mt.glint)
        .tint(t.hot, t.glow)
        .spawn(e, s, i, n.rnd.signed() * 2, n.rnd.signed() * 2, n.rnd.signed() * 2, 0.35, 0.36, 0.06);
    },
    hit(n, t, e, s, i) {
      L0(n, e, s, i, 1.9, t.hot, 0.16, !0);
    },
  }),
  monster_spit: To({
    shape: qe.sphere,
    scale: [0.24, 0.22, 0.22],
    colors: () => KD,
    mode: sn.core,
    intensity: 1.7,
    add: 0.5,
    k: 1.2,
    ribbon: $n.dusty,
    ribbonWidth: 1,
    halo: 0.9,
    rate: 26,
    emit(n, t, e, s, i) {
      const a = n.rnd;
      a.chance(0.6)
        ? n.particles
            .use(Mt.puff)
            .tint(t.glow, t.deep)
            .spawn(e, s, i, a.signed() * 0.5, a.range(-0.2, 0.3), a.signed() * 0.5, 0.35, 0.3, 0.6)
        : n.particles
            .use(Mt.glint)
            .tint(t.hot, t.glow)
            .spawn(e, s, i, a.signed() * 0.8, a.range(-0.6, 0.2), a.signed() * 0.8, 0.45, 0.2, 0.05);
    },
    hit(n, t, e, s, i) {
      vs(n, e, s, i, 1, t.hot, t.glow, 0, 0, 3, le.flashBasic, 4);
      const a = n.particles.use(Mt.puff).tint(t.glow, t.deep);
      for (let o = 0; o < n.n(4); o++)
        a.spawn(e, s, i, n.rnd.signed() * 1.6, n.rnd.range(0.2, 1), n.rnd.signed() * 1.6, 0.5, 0.4, 1.1);
      jo(n, e, s, i, 4, 2.2, t.hot, t.glow, 0.5, 0.22);
    },
  }),
};

class QD {
  views = new Map();
  list = [];
  k;
  stamp = 0;
  constructor(t) {
    this.k = t;
  }
  create(t) {
    const e = this.k,
      s = Bb[t.visual],
      i = s.colors(t.team),
      a = t.pos.x - t.dir.x * t.traveled,
      o = t.pos.y - t.dir.y * t.traveled;
    let r = 1.3;
    if (e.anchor(t.ownerId)) {
      const f = e.a.unit,
        d = f !== null && (f.kind === "tower" || f.kind === "core");
      ((r = d ? e.a.height * 0.82 : Math.min(e.a.height * 0.6, 2.2)),
        e.anchors.attach?.(t.ownerId, d ? "core" : "muzzle", e.v) && (r = e.v.y));
    }
    const l = e.glow.hold(s.shape, s.mode);
    (l.color(s.mode === sn.solid ? i.hot : i.glow, s.intensity, 0),
      (l.add = s.add),
      (l.k = s.k),
      (l.progress = s.progress));
    const c = [];
    for (let f = 0; f < s.echo; f++) {
      const d = e.glow.hold(s.shape, s.mode);
      (d.color(f === 0 ? i.glow : i.deep, s.intensity * (f === 0 ? 0.75 : 1.1), 0),
        (d.add = s.add),
        (d.k = s.k),
        (d.progress = s.progress),
        c.push(d));
    }
    return {
      id: t.id,
      def: s,
      colors: i,
      team: t.team,
      seen: 0,
      mesh: l,
      ribbon: -1,
      decal: -1,
      sx: a,
      sz: o,
      h0: r,
      x: a,
      y: r,
      z: o,
      acc: 0,
      age: 0,
      shown: !1,
      dx: t.dir.x,
      dz: t.dir.y,
      echoes: c,
      hitAt: -1,
    };
  }
  release(t) {
    const e = this.k;
    e.glow.release(t.mesh);
    for (const s of t.echoes) e.glow.release(s);
    (e.ribbons.end(t.ribbon), t.decal >= 0 && e.decals.release(t.decal, 0.15));
  }
  update(t) {
    const e = this.k,
      s = ++this.stamp,
      i = t.alpha,
      a = t.dt;
    for (const r of t.state.projectiles) {
      let l = this.views.get(r.id);
      (l || ((l = this.create(r)), this.views.set(r.id, l), this.list.push(l)), (l.seen = s), (l.age += a));
      const c = l.def,
        f = r.prevPos.x + (r.pos.x - r.prevPos.x) * i,
        d = r.prevPos.y + (r.pos.y - r.prevPos.y) * i;
      let h = 1.25;
      if (r.targetId >= 0) {
        let k = f,
          M = d,
          S = 1;
        e.anchor(r.targetId) && ((k = e.a.x), (M = e.a.z), (S = e.a.y + Math.min(e.a.height * 0.5, 3.2)));
        const b = Math.hypot(f - l.sx, d - l.sz),
          w = Math.hypot(k - f, M - d),
          T = b + w > 0.01 ? b / (b + w) : 1;
        ((h = l.h0 + (S - l.h0) * T), c.arc > 0 && (h += 4 * T * (1 - T) * (1.6 + (b + w) * 0.16) * c.arc));
      }
      let u = r.team === t.playerTeam || e.anchors.pointVisible(f, d);
      !u && e.anchor(r.ownerId) && (u = e.a.visible);
      let m = f - l.x,
        x = h - l.y,
        p = d - l.z;
      const g = Math.hypot(m, x, p);
      g < 1e-4 || l.age <= a ? ((m = r.dir.x), (x = 0), (p = r.dir.y)) : ((m /= g), (x /= g), (p /= g));
      const y = l.mesh;
      (y.at(f, h, d), (y.a = u ? 1 : 0));
      const v = Math.min(1, l.age * 12 + 0.3);
      (y.scale3(c.scale[0] * v, c.scale[1] * v, c.scale[2] * v),
        c.yawSpin !== 0
          ? y.rot(0.25, l.age * c.yawSpin, 0)
          : y.rot(l.age * c.roll, -Math.atan2(p, m), Math.atan2(x, Math.hypot(m, p))));
      for (let k = 0; k < l.echoes.length; k++) {
        const M = l.echoes[k],
          S = Math.min(c.echoGap * (k + 1), Math.hypot(f - l.sx, d - l.sz)),
          b = v * (1 - 0.14 * (k + 1));
        (M.at(f - m * S, h - x * S, d - p * S)
          .scale3(c.scale[0] * b, c.scale[1] * b, c.scale[2] * b)
          .rot(y.rx, y.ry, y.rz),
          (M.a = u && S > c.echoGap * (k + 0.5) ? 0.85 - k * 0.25 : 0));
      }
      const _ = Math.hypot(m, p);
      if ((_ > 1e-4 && ((l.dx = m / _), (l.dz = p / _)), u)) {
        if (
          (c.ribbon &&
            (l.ribbon < 0
              ? ((l.ribbon = e.ribbons.start(
                  c.ribbon,
                  f,
                  h,
                  d,
                  l.colors.tail ?? l.colors.glow,
                  l.colors.tail2 ?? l.colors.deep,
                )),
                e.ribbons.setWidth(l.ribbon, c.ribbonWidth))
              : e.ribbons.move(l.ribbon, f, h, d)),
          c.halo > 0 &&
            e.sprites.draw(
              Ft.glow,
              f,
              h,
              d,
              c.halo * (0.9 + 0.1 * Math.sin(l.age * 40)),
              0,
              l.colors.glow,
              1.25,
              0.8,
              0.5,
            ),
          c.ground > 0 &&
            (l.decal < 0 && (l.decal = e.decals.hold(Xt.glow, 0.08)),
            e.decals
              .at(l.decal)
              .at(f, d)
              .radius(c.ground)
              .params(1.5)
              .color(l.colors.glow, 0.9, 0.8)
              .under(W.black, 0)),
          c.rate > 0)
        )
          for (l.acc += a * c.rate * e.density; l.acc >= 1;)
            ((l.acc -= 1), c.emit(e, l.colors, f, h, d, m, p));
      } else l.ribbon >= 0 && (e.ribbons.end(l.ribbon), (l.ribbon = -1));
      ((l.x = f), (l.y = h), (l.z = d), (l.shown = u));
    }
    const o = this.list;
    for (let r = o.length - 1; r >= 0; r--) {
      const l = o[r];
      l.seen !== s && (this.release(l), this.views.delete(l.id), (o[r] = o[o.length - 1]), o.pop());
    }
  }
  handle(t, e, s) {
    const i = this.k,
      a = this.views.get(t.id),
      o = Bb[t.visual],
      r = t.pos.x,
      l = t.pos.y;
    if (!o) return;
    const c = a ? a.colors : o.colors(2);
    let f = a ? a.y : 1.2;
    if (!a?.shown && !i.anchors.pointVisible(r, l)) return;
    const d = a ? a.dx : 1,
      h = a ? a.dz : 0;
    t.type === "projectileHit"
      ? (i.anchor(t.targetId) && (f = i.a.y + Math.min(i.a.height * 0.5, 3.2)),
        a && (a.hitAt = i.now),
        o.hit(
          i,
          c,
          r,
          f,
          l,
          t.targetId === e || (a !== void 0 && a.team === s && i.a.unit !== null && i.a.unit.kind === "hero"),
          d,
          h,
        ))
      : o.end(i, c, r, f, l, d, h, !a || a.hitAt < 0 || i.now - a.hitAt > 0.08);
  }
  get count() {
    return this.views.size;
  }
  reset() {
    for (const t of this.list) this.release(t);
    ((this.list.length = 0), this.views.clear());
  }
}

const Qr = Lt(16765002),
  Vd = Lt(16762910),
  qg = Lt(16773808),
  Xg = ws.panyue,
  JD = Lt(5816575),
  tz = Lt(2780400),
  Yg = Lt(10791150),
  Hb = Lt(5001126),
  ez = Lt(11065599),
  nz = Lt(16760928),
  Kg = Lt(16738858),
  Zg = Lt(16760944),
  tp = Lt(5813503),
  Qg = Lt(5828744),
  sz = Lt(2080864),
  iz = ws.yeque,
  J0 = ws.fengling,
  Jg = ws.chijin,
  t2 = ws.xingli,
  $b = Lt(16726568),
  e2 = Lt(16760928),
  Gb = 1.22;

function Vb(n, t) {
  const e = (n - t) / 0.22;
  return e <= 0 || e >= 1 ? 0 : Math.sin(e * Math.PI);
}

function oi(n, t, e, s) {
  t.acc += e * s * n.density;
  const i = Math.floor(t.acc);
  return ((t.acc -= i), i);
}

function Ks(n, t, e, s = 0.15) {
  const i = n.decals.hold(e, s);
  return (t.slots.push(i), i);
}

const n2 = { frost: 1.6, ember: 1.85, star: 2.1 };

function c8(n, t) {
  return Math.max(n.radius * t, 0.75 + (t - 1.3) * 0.9) + 0.15;
}

function f8(n, t) {
  return t.timeLeft < 5 && Number.isFinite(t.timeLeft) ? 0.55 + 0.45 * Math.cos(n.age * 9) : 1;
}

function Wb(n, t, e, s, i, a) {
  return {
    create(o, r) {
      const l = Ks(o, r, Xt.sigil, 0.3);
      o.decals.at(l).y(0.065).params(n, 1).color(t, 1.7, 0.85).under(W.shadow, 0.3);
    },
    update(o, r, l, c, f) {
      const d = f8(r, c),
        h = c8(l, s);
      o.decals
        .at(r.slots[0])
        .at(l.x, l.z)
        .radius(h)
        .rot(r.age * i)
        .alpha(0.85 * d);
      const u = r.phase + r.age * 2 * Math.sign(i),
        m = l.radius + 0.5;
      if (
        (o.sprites.icon(
          a,
          l.x + Math.cos(u) * m,
          l.y + l.height * 0.42 + Math.sin(r.age * 3) * 0.1,
          l.z + Math.sin(u) * m,
          0.46,
          0,
          e,
          1.2,
          0.85 * d,
          0.25,
          0.2,
        ),
        n === 0)
      )
        for (let x = oi(o, r, f, 1.6); x > 0; x--) {
          const p = o.rnd.next() * oe;
          o.particles
            .use(Mt.puff)
            .tint(W.frostHot, W.frost)
            .spawn(
              l.x + Math.cos(p) * h * 0.8,
              l.y + 0.15,
              l.z + Math.sin(p) * h * 0.8,
              Math.cos(p) * 0.3,
              0.05,
              Math.sin(p) * 0.3,
              1.2,
              0.6,
              1.4,
            );
        }
      else
        for (let x = oi(o, r, f, 3); x > 0; x--) {
          const p = o.rnd.next() * oe;
          o.particles
            .use(Mt.ember)
            .tint(e, t)
            .spawn(
              l.x + Math.cos(p) * h * 0.85,
              l.y + 0.15,
              l.z + Math.sin(p) * h * 0.85,
              0,
              o.rnd.range(0.8, 1.6),
              0,
              0.8,
              0.12,
              0.04,
            );
        }
    },
  };
}

const d8 = {
    stun: {
      create(n, t, e) {
        const s = e.y + e.height * 0.9,
          i = n.particles.use(Mt.bolt).tint(Vd, Qr);
        for (let a = 0; a < 4; a++) {
          const o = (a * oe) / 4 + 0.6;
          i.spawn(
            e.x + Math.cos(o) * 0.5,
            s + 0.2,
            e.z + Math.sin(o) * 0.3,
            Math.cos(o) * 2.5,
            1.5,
            Math.sin(o) * 1.5,
            0.3,
            0.5,
            0.8,
          );
        }
        n.particles.use(Mt.flash).tint(Vd).spawn(e.x, s, e.z, 0, 0, 0, 0.2, 0.8, 1.6);
      },
      update(n, t, e, s, i) {
        const a = e.y + e.height * 0.9,
          o = 0.5 + e.radius * 0.45;
        for (let r = 0; r < 3; r++) {
          const l = t.age * 5.2 + (r * oe) / 3,
            c = Math.sin(l) < 0 ? 0.75 : 1;
          n.sprites.icon(
            Ft.star,
            e.x + Math.cos(l) * o,
            a + Math.sin(l) * 0.14,
            e.z + Math.sin(l) * o * 0.5,
            0.62 * c,
            l * 1.3,
            Vd,
            1.25,
            c,
            0.15,
            0.6,
          );
        }
        for (let r = oi(n, t, i, 5); r > 0; r--)
          n.particles
            .use(Mt.glint)
            .tint(qg, Qr)
            .spawn(e.x + n.rnd.signed() * o, a, e.z + n.rnd.signed() * o * 0.5, 0, 0.5, 0, 0.4, 0.26, 0.06);
      },
    },
    airborne: {
      create(n, t) {
        const e = Ks(n, t, Xt.glow, 0.05);
        n.decals.at(e).params(1.2).color(W.black, 0, 0.9).under(W.shadow, 0.7);
      },
      update(n, t, e, s, i) {
        n.decals
          .at(t.slots[0])
          .at(e.x, e.z)
          .radius(e.radius + 0.7);
        for (let a = oi(n, t, i, 16); a > 0; a--) {
          const o = n.rnd.next() * oe;
          n.particles
            .use(Mt.streak)
            .tint(W.white, W.dust)
            .spawn(
              e.x + Math.cos(o) * e.radius,
              0.2,
              e.z + Math.sin(o) * e.radius,
              0,
              n.rnd.range(4, 8),
              0,
              0.25,
              0.1,
              0.04,
            );
        }
      },
    },
    root: {
      create(n, t, e) {
        const s = Ks(n, t, Xt.range, 0.1);
        n.decals.at(s).params(0.05, 8).color(Xg.glow, 1.8, 0.95).under(W.shadow, 0.45);
        for (let i = 0; i < 4; i++) {
          const a = n.glow.hold(qe.spike, sn.plain);
          (a.color(W.white, 1), t.meshes.push(a));
        }
        n.particles.use(Mt.dust);
        for (let i = 0; i < 4; i++)
          n.particles.spawn(
            e.x + n.rnd.signed() * 0.5,
            0.2,
            e.z + n.rnd.signed() * 0.5,
            n.rnd.signed(),
            1,
            n.rnd.signed(),
            0.5,
            0.5,
            1.1,
          );
      },
      update(n, t, e) {
        n.decals
          .at(t.slots[0])
          .at(e.x, e.z)
          .radius(e.radius + 0.6);
        const s = Math.min(1, t.age * 7);
        for (let i = 0; i < t.meshes.length; i++) {
          const a = t.phase + (i * oe) / t.meshes.length,
            o = e.radius + 0.25;
          t.meshes[i]
            .at(e.x + Math.cos(a) * o, -0.03, e.z + Math.sin(a) * o)
            .scale3(0.42, (0.85 + (i % 2) * 0.3) * s, 0.42)
            .rot(0, -a, 0.38);
        }
      },
      end(n, t) {
        for (const e of t.meshes) {
          n.particles.use(Mt.debris);
          for (let s = 0; s < 2; s++)
            n.particles.spawn(
              e.x,
              0.5,
              e.z,
              n.rnd.signed() * 2,
              n.rnd.range(1, 3),
              n.rnd.signed() * 2,
              0.6,
              0.2,
              0.16,
            );
        }
      },
    },
    slow: {
      create(n, t) {
        const e = Ks(n, t, Xt.swirl, 0.15);
        n.decals.at(e).params(3, 2.4).color(Yg, 0.9, 0.7).under(Hb, 0.18);
        const s = Ks(n, t, Xt.range, 0.15);
        n.decals.at(s).params(0.05, 12).color(Yg, 1.25, 0.75).under(W.shadow, 0.2);
      },
      update(n, t, e, s, i) {
        const a = Math.min(1, 0.5 + s.value),
          o = e.radius + 0.4 + s.value * 0.5;
        (n.decals
          .at(t.slots[0])
          .at(e.x, e.z)
          .radius(o)
          .alpha(0.45 + 0.3 * a),
          n.decals.at(t.slots[1]).at(e.x, e.z).radius(o));
        for (let r = oi(n, t, i, 5 + 6 * a); r > 0; r--) {
          const l = n.rnd.next() * oe;
          n.particles
            .use(Mt.streak)
            .tint(Yg, Hb)
            .spawn(
              e.x + Math.cos(l) * o * 0.75,
              e.y + n.rnd.range(0.5, 1),
              e.z + Math.sin(l) * o * 0.75,
              0,
              -1.5,
              0,
              0.4,
              0.16,
              0.05,
            );
        }
      },
    },
    shield: {
      create(n, t, e, s) {
        const i = n.glow.hold(qe.sphere, sn.hex),
          a = n.anchors.unit(s.sourceId),
          o = a !== void 0 && a.kind === "hero" && a.heroId === "panyue";
        (i.color(o ? nz : ez, 1.25, 0), (i.add = 0.4), t.meshes.push(i));
      },
      update(n, t, e, s) {
        const i = t.meshes[0],
          a = Math.min(1, t.age * 8),
          o = s.timeLeft < 0.8 ? 0.6 + 0.4 * Math.sin(t.age * 22) : 1,
          r = (e.radius + 0.75) * (0.6 + 0.4 * a);
        (i.at(e.x, e.y + e.height * 0.46, e.z).scale3(r, Math.max(r, e.height * 0.56), r),
          i.rot(0, t.age * 0.5, 0),
          (i.a = 0.85 * a * o));
      },
    },
    haste: {
      create(n, t) {
        const e = Ks(n, t, Xt.swirl, 0.2);
        n.decals.at(e).params(3, -1.8).color(J0.glow, 0.9, 0.4).under(J0.deep, 0.06);
      },
      update(n, t, e, s, i) {
        const a = e.unit;
        if (!a) return;
        const o = (a.pos.x - a.prevPos.x) / xo,
          r = (a.pos.y - a.prevPos.y) / xo,
          l = Math.hypot(o, r);
        n.decals
          .at(t.slots[0])
          .at(e.x, e.z)
          .radius(e.radius + 0.6)
          .alpha(l > 0.5 ? 0.2 : 0.42);
        for (let c = oi(n, t, i, l > 0.5 ? 26 : 16); c > 0; c--) {
          const f = n.rnd,
            d = f.signed() * (e.radius + 0.35),
            h = f.signed() * (e.radius + 0.35);
          l > 0.5
            ? n.particles
                .use(Mt.streak)
                .tint(J0.glow, J0.deep)
                .spawn(
                  e.x + d - (o / l) * 0.4,
                  e.y + f.range(0.2, 1.6),
                  e.z + h - (r / l) * 0.4,
                  -o * 0.7,
                  f.signed() * 0.3,
                  -r * 0.7,
                  0.34,
                  0.2,
                  0.07,
                )
            : n.particles
                .use(Mt.streak)
                .tint(W.white, J0.glow)
                .orbit(
                  e.x,
                  e.y + f.range(0.15, 0.75),
                  e.z,
                  e.radius + 0.3,
                  e.radius + 0.6,
                  f.next() * oe,
                  8,
                  f.range(0.3, 1),
                  0.44,
                  0.24,
                  0.07,
                );
        }
      },
    },
    burn: {
      update(n, t, e, s, i) {
        for (let a = oi(n, t, i, 18); a > 0; a--) {
          const o = n.rnd,
            r = e.x + o.signed() * e.radius * 0.8,
            l = e.z + o.signed() * e.radius * 0.8,
            c = e.y + o.range(0.2, e.height * 0.7);
          o.chance(0.7)
            ? n.particles.use(Mt.flame).spawn(r, c, l, 0, o.range(1, 2.2), 0, o.range(0.35, 0.55), 0.95, 0.4)
            : n.particles
                .use(Mt.ember)
                .tint(Zg, Kg)
                .spawn(r, c, l, o.signed() * 0.5, o.range(1, 2.5), o.signed() * 0.5, 0.6, 0.13, 0.04);
        }
      },
    },
    untargetable: {
      create(n, t) {
        const e = Ks(n, t, Xt.glow, 0.1);
        n.decals.at(e).params(1.2).color(W.black, 0, 0.9).under(W.ink, 0.75);
      },
      update(n, t, e, s, i) {
        n.decals
          .at(t.slots[0])
          .at(e.x, e.z)
          .radius(e.radius + 0.8);
        for (let a = oi(n, t, i, 20); a > 0; a--) {
          const o = n.rnd,
            r = o.next() * oe,
            l = e.radius * o.range(0.5, 1.2),
            c = o.range(0.1, 0.22);
          n.particles
            .use(Mt.inkRise)
            .spawn(
              e.x + Math.cos(r) * l,
              e.y + o.range(0.1, 1.5),
              e.z + Math.sin(r) * l,
              o.signed() * 0.4,
              o.range(0.4, 1.2),
              o.signed() * 0.4,
              0.5,
              c,
              c * 1.6,
            );
        }
      },
    },
    unstoppable: {
      create(n, t) {
        const e = Ks(n, t, Xt.range, 0.1);
        n.decals.at(e).params(0.05, 12).color(Qr, 1.6, 0.9).under(W.shadow, 0.3);
      },
      update(n, t, e, s, i) {
        n.decals
          .at(t.slots[0])
          .at(e.x, e.z)
          .radius(e.radius + 0.7);
        for (let a = oi(n, t, i, 22); a > 0; a--) {
          const o = n.rnd.next() * oe,
            r = e.radius + 0.35;
          n.particles
            .use(Mt.streak)
            .tint(qg, Qr)
            .spawn(
              e.x + Math.cos(o) * r,
              e.y + 0.1,
              e.z + Math.sin(o) * r,
              0,
              n.rnd.range(3.5, 6.5),
              0,
              0.4,
              0.14,
              0.05,
            );
        }
      },
    },
    recall: {
      create(n, t) {
        const e = Ks(n, t, Xt.rune, 0.3);
        n.decals.at(e).params(6, 1.6).color(tp, 1.7, 0.9).under(W.shadow, 0.3);
        const s = n.glow.hold(qe.pillar, sn.pillar);
        (s.color(tp, 1.1, 0), (s.add = 0.3), (s.k = 1.2), t.meshes.push(s));
      },
      update(n, t, e, s, i) {
        const a = s.duration > 0 ? 1 - s.timeLeft / s.duration : 0,
          o = 1.9 - 0.9 * a;
        n.decals
          .at(t.slots[0])
          .at(e.x, e.z)
          .radius(o + 0.2);
        const r = t.meshes[0];
        (r.at(e.x, 0.05, e.z).scale3(o * 0.62, 3 + 5 * a, o * 0.62), (r.a = 0.2 + 0.65 * a));
        for (let l = oi(n, t, i, 2.4 + a * 2); l > 0; l--) {
          n.glow
            .spawn(qe.hoop, sn.hoop, 0.9)
            .at(e.x, 0.15, e.z)
            .vel(0, 2.6 + a * 2, 0)
            .scale(o, o * 0.6)
            .color(tp, 1.2, 0.9)
            .fade(0.15, 0.5)
            .opt(0.3, 2, 1);
          for (let c = 0; c < 3; c++)
            n.particles
              .use(Mt.glint)
              .tint(W.white, tp)
              .orbit(e.x, 0.1, e.z, o, o * 0.4, n.rnd.next() * oe, 5, n.rnd.range(2, 4), 0.8, 0.3, 0.08);
        }
      },
    },
    restore: {
      create(n, t) {
        const e = Ks(n, t, Xt.glow, 0.2);
        n.decals.at(e).params(1.3).color(Qg, 1.1, 0.85).under(W.black, 0);
      },
      update(n, t, e, s, i) {
        (n.decals
          .at(t.slots[0])
          .at(e.x, e.z)
          .radius(e.radius + 0.9),
          (Math.floor(t.age / 0.7) !== Math.floor((t.age - i) / 0.7) || t.age <= i) &&
            n.glow
              .spawn(qe.hoop, sn.hoop, 0.8)
              .at(e.x, e.y + 0.2, e.z)
              .vel(0, 2.2, 0)
              .scale(e.radius + 0.5, e.radius + 0.25)
              .color(Qg, 1, 0.9)
              .fade(0.15, 0.5)
              .opt(0.3, 2, 1));
        for (let o = oi(n, t, i, 16); o > 0; o--) {
          const r = n.rnd,
            l = r.next() * oe,
            c = r.range(0.5, e.radius + 0.6);
          r.chance(0.3)
            ? n.particles
                .use(Mt.plus)
                .spawn(
                  e.x + Math.cos(l) * c,
                  e.y + r.range(0.3, 1),
                  e.z + Math.sin(l) * c,
                  0,
                  r.range(1, 1.8),
                  0,
                  0.8,
                  0.26,
                  0.4,
                )
            : n.particles
                .use(Mt.glint)
                .tint(Qg, sz)
                .spawn(
                  e.x + Math.cos(l) * c,
                  e.y + r.range(0.1, 0.8),
                  e.z + Math.sin(l) * c,
                  0,
                  r.range(1.2, 2.4),
                  0,
                  0.8,
                  0.34,
                  0.08,
                );
        }
      },
    },
    fountain: {
      update(n, t, e, s, i) {
        const a = Fa(e.unit ? e.unit.team : 2);
        for (let o = oi(n, t, i, 8); o > 0; o--) {
          const r = n.rnd.next() * oe;
          n.particles
            .use(Mt.glint)
            .tint(a.glow, a.deep)
            .spawn(
              e.x + Math.cos(r) * (e.radius + 0.3),
              e.y + 0.1,
              e.z + Math.sin(r) * (e.radius + 0.3),
              0,
              n.rnd.range(1, 2.2),
              0,
              0.9,
              0.32,
              0.08,
            );
        }
      },
    },
    respawn_guard: {
      create(n, t) {
        const e = n.glow.hold(qe.sphere, sn.rim);
        (e.color(Qr, 1.2, 0), (e.add = 0.4), (e.k = 2.6), t.meshes.push(e));
        const s = Ks(n, t, Xt.range, 0.1);
        n.decals.at(s).params(0.04, 0).color(Qr, 1.7, 0.9).under(W.shadow, 0.25);
      },
      update(n, t, e, s, i) {
        const a = t.meshes[0],
          o = 1 + 0.05 * Math.sin(t.age * 6),
          r = (e.radius + 0.85) * o;
        (a.at(e.x, e.y + e.height * 0.46, e.z).scale3(r, Math.max(r, e.height * 0.58), r),
          (a.a = 0.75),
          n.decals
            .at(t.slots[0])
            .at(e.x, e.z)
            .radius(e.radius + 0.9));
        for (let l = oi(n, t, i, 6); l > 0; l--) {
          const c = n.rnd.next() * oe;
          n.particles
            .use(Mt.glint)
            .tint(qg, Qr)
            .spawn(
              e.x + Math.cos(c) * r,
              e.y + n.rnd.range(0.2, 1.8),
              e.z + Math.sin(c) * r,
              0,
              0.8,
              0,
              0.6,
              0.26,
              0.06,
            );
        }
      },
    },
    frost_insight: Wb(0, tz, JD, n2.frost, 0.35, Ft.frost),
    ember_might: Wb(1, Kg, Zg, n2.ember, -0.45, Ft.flame),
    star_blessing: {
      create(n, t) {
        const e = Ks(n, t, Xt.sigil, 0.3);
        n.decals.at(e).y(0.068).params(2, 1).color(Qr, 1.5, 0.75).under(W.shadow, 0.25);
      },
      update(n, t, e, s) {
        const i = f8(t, s);
        n.decals
          .at(t.slots[0])
          .at(e.x, e.z)
          .radius(c8(e, n2.star))
          .rot(t.age * 0.25)
          .alpha(0.75 * i);
        const a = n.lowQ ? 1 : 3,
          o = e.radius + 0.55;
        for (let r = 0; r < a; r++) {
          const l = t.phase + t.age * 1.7 + (r * oe) / 3,
            c = e.y + e.height * (0.45 + 0.18 * Math.sin(l + 0.6));
          n.sprites.icon(
            Ft.star8,
            e.x + Math.cos(l) * o,
            c,
            e.z + Math.sin(l) * o,
            0.42,
            t.age * 0.8,
            Vd,
            1.3,
            0.95 * i,
            0.15,
            0.2,
          );
        }
      },
    },
    xingli_mark: {
      create(n, t) {
        const e = Ks(n, t, Xt.rings, 0.15);
        n.decals.at(e).y(0.07).params(1, 1).color(t2.hot, 1.6, 0.9).under(t2.dark, 0.3);
      },
      update(n, t, e, s) {
        const i = Math.max(1, Math.min(3, s.stacks));
        n.decals
          .at(t.slots[0])
          .at(e.x, e.z)
          .radius(e.radius * Gb)
          .params(i, 1)
          .alpha(i >= 3 ? 1 : 0.8);
        const a = Math.min(1, t.age * 8),
          o = e.radius + 0.5;
        for (let r = 0; r < i; r++) {
          const l = t.phase + t.age * 2.6 + (r * oe) / 3,
            c = 0.42 * (r === i - 1 ? 0.6 + 0.4 * a : 1),
            f = e.y + e.height * 0.55 + Math.sin(t.age * 3.2 + r * 2.1) * 0.12;
          n.sprites.icon(
            Ft.glow,
            e.x + Math.cos(l) * o,
            f,
            e.z + Math.sin(l) * o,
            c * 1.5,
            0,
            t2.accent,
            1.9,
            1,
            0.5,
            0.2,
          );
        }
      },
    },
    tower_focus: {
      create(n, t) {
        const e = Ks(n, t, Xt.lock, 0.1);
        n.decals.at(e).y(0.075).color($b, 1.8, 0.95).under(W.shadow, 0.45);
      },
      update(n, t, e, s) {
        const i = Math.min(5, Math.max(1, s.stacks));
        n.decals
          .at(t.slots[0])
          .at(e.x, e.z)
          .radius(e.radius + 0.55 + 0.06 * i)
          .alpha(0.7 + 0.3 * Math.abs(Math.sin(t.age * (3 + i))));
        const a = e.radius + 0.5;
        for (let o = 0; o < i; o++) {
          const r = t.phase - t.age * 3 + (o * oe) / i;
          n.sprites.icon(
            Ft.diamond,
            e.x + Math.cos(r) * a,
            e.y + 0.4,
            e.z + Math.sin(r) * a,
            0.4,
            0,
            $b,
            1.3,
            1,
            0.2,
            0.2,
          );
        }
      },
    },
    panyue_passive: {
      update(n, t, e, s) {
        if (s.stacks < 2) return;
        const i = e.unit,
          a = i ? i.facing : 0;
        let o = e.x + Math.cos(a) * 0.55 + Math.sin(a) * 0.38,
          r = e.y + e.height * 0.42,
          l = e.z + Math.sin(a) * 0.55 - Math.cos(a) * 0.38;
        i &&
          n.anchors.attach?.(i.id, "handL", n.v) &&
          ((o = n.v.x + Math.cos(a) * 0.12), (r = n.v.y - 0.12), (l = n.v.z + Math.sin(a) * 0.12));
        const c = 0.62 + 0.14 * Math.sin(t.age * 9);
        (n.sprites.icon(Ft.glow, o, r, l, c * 1.25, 0, Xg.hot, 1.9, 0.95, 0.6, 0.45),
          n.sprites.draw(Ft.spark, o, r, l, c * 1.15, t.age * 1.5, Xg.hot, 1.6, 0.9, 0.7, 0.46));
      },
    },
    chijin_ember: {
      update(n, t, e, s, i) {
        const a = e.unit,
          o = a ? a.facing : 0;
        let r = e.x - Math.sin(o) * 0.45,
          l = e.y + e.height * 0.95,
          c = e.z + Math.cos(o) * 0.45;
        a && n.anchors.attach?.(a.id, "weapon", n.v) && ((r = n.v.x), (l = n.v.y), (c = n.v.z));
        const f = 0.7 + 0.16 * Math.sin(t.age * 11);
        (n.sprites.icon(Ft.glow, r, l, c, f * 1.2, 0, e2, 2, 0.95, 0.6, 0.4),
          n.sprites.draw(Ft.spark, r, l, c, f, t.age * 2.2, e2, 1.7, 0.9, 0.7, 0.41));
        for (let d = oi(n, t, i, 7); d > 0; d--) {
          const h = n.rnd;
          n.particles
            .use(Mt.spark)
            .tint(e2, Kg)
            .spawn(
              r + h.signed() * 0.15,
              l + h.signed() * 0.15,
              c + h.signed() * 0.15,
              h.signed() * 1.6,
              h.range(0.5, 2.5),
              h.signed() * 1.6,
              0.3,
              0.1,
              0.03,
            );
        }
      },
    },
    chijin_blaze: {
      create(n, t) {
        const e = Ks(n, t, Xt.swirl, 0.15);
        n.decals.at(e).y(0.07).params(3, -2.4).color(Jg.glow, 1.7, 0.9).under(Jg.dark, 0.5);
      },
      update(n, t, e, s, i) {
        n.decals
          .at(t.slots[0])
          .at(e.x, e.z)
          .radius(e.radius + 0.8);
        for (let a = oi(n, t, i, 18); a > 0; a--) {
          const o = n.rnd,
            r = o.next() * oe,
            l = e.radius + o.range(0.1, 0.4);
          o.chance(0.4)
            ? n.particles
                .use(Mt.dust)
                .spawn(
                  e.x + Math.cos(r) * l,
                  e.y + 0.15,
                  e.z + Math.sin(r) * l,
                  Math.sin(r) * 1.6,
                  o.range(0.3, 0.9),
                  -Math.cos(r) * 1.6,
                  0.5,
                  0.5,
                  1.1,
                )
            : n.particles
                .use(Mt.streak)
                .tint(Zg, Jg.deep)
                .orbit(
                  e.x,
                  e.y + o.range(0.15, 0.8),
                  e.z,
                  l,
                  l + 0.35,
                  r,
                  -11,
                  o.range(0.2, 0.8),
                  o.range(0.26, 0.36),
                  0.36,
                  0.16,
                );
        }
      },
    },
    fengling_gale: {
      create(n, t) {
        const e = Ks(n, t, Xt.range, 0.2);
        n.decals.at(e).y(0.07).params(0.035, 0).color(J0.accent, 1.6, 0).under(W.shadow, 0.25);
      },
      update(n, t, e, s) {
        const i = Math.max(1, Math.min(5, s.stacks)),
          a = i >= 5;
        n.decals
          .at(t.slots[0])
          .at(e.x, e.z)
          .radius(e.radius * Gb)
          .alpha(a ? 0.9 : 0);
        const o = e.radius + 0.5;
        for (let r = 0; r < i; r++) {
          const l = t.phase + t.age * (a ? 5.5 : 3.2) + (r * oe) / i;
          n.sprites.icon(
            Ft.feather,
            e.x + Math.cos(l) * o,
            e.y + e.height * 0.42 + Math.sin(l * 2 + r) * 0.1,
            e.z + Math.sin(l) * o,
            0.52,
            -l - Math.PI / 2,
            W.plume,
            a ? 1.35 : 1.15,
            0.95,
            0.15,
            0.2,
          );
        }
      },
    },
    fengling_crit: {
      update(n, t, e) {
        const s = e.unit,
          i = s ? s.facing : 0;
        let a = e.x + Math.cos(i) * 0.7,
          o = e.y + e.height * 0.6,
          r = e.z + Math.sin(i) * 0.7;
        s &&
          n.anchors.attach?.(s.id, "muzzle", n.v) &&
          ((a = n.v.x + Math.cos(i) * 0.2), (o = n.v.y), (r = n.v.z + Math.sin(i) * 0.2));
        const l = 0.6 + 0.15 * Math.sin(t.age * 10);
        n.sprites.icon(Ft.spark, a, o, r, l * 1.3, t.age * 3, J0.accent, 1.6, 1, 0.5, 0.3);
      },
    },
    yeque_shadow: {
      create(n, t) {
        const e = Ks(n, t, Xt.glow, 0.2);
        n.decals.at(e).params(1.3).color(W.black, 0, 0.8).under(W.ink, 0.55);
      },
      update(n, t, e, s, i) {
        n.decals
          .at(t.slots[0])
          .at(e.x, e.z)
          .radius(e.radius + 0.75);
        const a = Math.max(Vb(t.age, 0.1), Vb(t.age, 0.5)),
          o = e.unit;
        if (a > 0 && o) {
          const r = o.facing;
          let l = e.x + Math.cos(r) * 0.4 - Math.sin(r) * 0.35,
            c = e.y + e.height * 0.5,
            f = e.z + Math.sin(r) * 0.4 + Math.cos(r) * 0.35;
          (n.anchors.attach?.(o.id, "weapon", n.v) && ((l = n.v.x), (c = n.v.y), (f = n.v.z)),
            n.sprites.draw(Ft.spark, l, c, f, 0.4 + a * 0.55, 0.4, iz.hot, 2.1, a, 0.75, 0.45));
        }
        for (let r = oi(n, t, i, 6); r > 0; r--) {
          const l = n.rnd,
            c = l.range(0.08, 0.16);
          n.particles
            .use(Mt.inkRise)
            .spawn(
              e.x + l.signed() * e.radius,
              e.y + l.range(0.1, 0.6),
              e.z + l.signed() * e.radius,
              0,
              l.range(0.5, 1.1),
              0,
              0.6,
              c,
              c * 1.3,
            );
        }
      },
    },
    monkey_eating: {
      create(n, t) {
        const mesh = new Sn(mkBananaGeo(), xsPoleMat());
        mesh.castShadow = !0;
        n.ctx.layers.fx.add(mesh);
        t._mkBanMesh = mesh;
      },
      update(n, t, e, s, i) {
        const mesh = t._mkBanMesh;
        if (!mesh) return;
        const u = Math.max(0, Math.min(1, 1 - s.timeLeft / Math.max(0.1, s.duration))),
          f = e.unit ? e.unit.facing : 0,
          cf = Math.cos(f),
          sf = Math.sin(f),
          lx = -sf,
          lz = cf;
        if (u < 0.72) {
          // 吃香蕉阶段：香蕉举在嘴边一晃一晃地被咬短，并冒出金黄色碎屑
          const chew = Math.sin(u * Math.PI * 10),
            bx = e.x + cf * 0.44 + lx * 0.16,
            by = e.y + e.height * 0.67 + chew * 0.08,
            bz = e.z + sf * 0.44 + lz * 0.16,
            bite = 1.25 * (1 - 0.34 * (u / 0.72));
          mesh.position.set(bx, by, bz);
          mesh.rotation.set(0.25 + chew * 0.22, -f + 0.6, -0.45 + chew * 0.15);
          mesh.scale.set(1.22, bite, 1.22);
          for (let k = oi(n, t, i, 12); k > 0; k--) {
            const o = n.rnd;
            n.particles
              .use(Mt.mote)
              .tint(MkC.hot, MkC.accent)
              .spawn(
                bx + o.signed() * 0.14,
                by + o.signed() * 0.1,
                bz + o.signed() * 0.14,
                o.signed() * 1.4,
                o.range(0.4, 1.6),
                o.signed() * 1.4,
                0.32,
                0.15,
                0.04,
              );
          }
        } else {
          // 丢香蕉皮阶段：从手边划一道小弧线翻转着砸到轮椅底下的地面
          const tu = (u - 0.72) / 0.28,
            arc = Math.sin(tu * Math.PI),
            bx = e.x + cf * (0.44 * (1 - tu)) + lx * (0.16 + 0.42 * arc),
            by = e.y + e.height * 0.67 * (1 - tu) + arc * 0.52 + 0.08 * tu,
            bz = e.z + sf * (0.44 * (1 - tu)) + lz * (0.16 + 0.42 * arc);
          mesh.position.set(bx, by, bz);
          mesh.rotation.set(tu * Math.PI * 2.6, -f + tu * 2.2, tu * Math.PI * 1.8);
          mesh.scale.set(1.15, 0.85, 1.15);
        }
      },
      end(n, t) {
        if (t._mkBanMesh) {
          n.ctx.layers.fx.remove(t._mkBanMesh);
          t._mkBanMesh = null;
        }
      },
    },
    monkey_ult: {
      create(n, t) {
        const ring = Ks(n, t, Xt.range, 0.16);
        n.decals.at(ring).y(0.08).params(0.028, 0).color(W.goldHot, 1.9, 0.92).under(MkC.deep, 0.38);
        const fill = Ks(n, t, Xt.zone, 0.16);
        n.decals.at(fill).y(0.06).params(0, 0).color(MkC.accent, 0.9, 0.2).under(MkC.dark, 0.08);
      },
      update(n, t, e) {
        const rng = e.unit?.stats?.attackRange ?? 3.6;
        n.decals.at(t.slots[0]).at(e.x, e.z).radius(rng);
        n.decals.at(t.slots[1]).at(e.x, e.z).radius(rng);
      },
    },
    slime_regen: {
      create(n, t) {
        const ring = Ks(n, t, Xt.ring, 0.14);
        n.decals.at(ring).y(0.05).params(1, 0.14).color(W.heal, 1.5, 0.65).under(SlC.deep, 0.25);
      },
      update(n, t, e, s) {
        n.decals.at(t.slots[0]).at(e.x, e.z).radius(e.radius * (1.35 + 0.1 * Math.sin(t.age * 6)));
        for (let i = xc(n, t, s, 6); i > 0; i--) {
          const o = n.rnd,
            a = o.next() * oe;
          n.particles
            .use(Mt.mote)
            .tint(W.heal, SlC.hot)
            .spawn(e.x + Math.cos(a) * e.radius * 0.9, 0.25, e.z + Math.sin(a) * e.radius * 0.9, 0, o.range(0.9, 1.9), 0, 0.45, 0.18, 0.05);
        }
      },
    },
    slime_wall_bounce: {
      create(n, t) {
        const ring = Ks(n, t, Xt.ring, 0.08);
        n.decals.at(ring).y(0.08).params(1, 0.22).color(W.goldHot, 3.0, 0.95).under(SlC.deep, 0.5);
      },
      update(n, t, e) {
        const pulse = 1.45 + 0.28 * Math.sin(t.age * 28);
        n.decals.at(t.slots[0]).at(e.x, e.z).radius(e.radius * pulse);
      },
    },
    slime_ball_charge: {
      create(n, t) {
        const ring = Ks(n, t, Xt.ring, 0.12);
        n.decals.at(ring).y(0.07).params(1, 0.2).color(SlC.hot, 2.2, 0.88).under(SlC.deep, 0.4);
      },
      update(n, t, e, s, bf) {
        const p = bf ? Math.max(0, Math.min(1, (bf.duration - bf.timeLeft) / Math.max(0.1, bf.duration))) : 0.5;
        n.decals.at(t.slots[0]).at(e.x, e.z).radius(e.radius * (1.2 + 0.75 * p));
        for (let i = xc(n, t, s, 8 + 12 * p); i > 0; i--) {
          const o = n.rnd,
            a = o.next() * oe,
            d = e.radius * (1.3 + 0.6 * p);
          n.particles
            .use(Mt.mote)
            .tint(W.goldHot, SlC.hot)
            .spawn(e.x + Math.cos(a) * d, o.range(0.2, 0.9), e.z + Math.sin(a) * d, -Math.cos(a) * 2.2, o.range(0.3, 1.0), -Math.sin(a) * 2.2, 0.28, 0.18, 0.04);
        }
      },
    },
    slime_cling: {
      create(n, t) {
        const ring = Ks(n, t, Xt.ring, 0.1);
        n.decals.at(ring).y(0.07).params(1, 0.16).color(SlC.hot, 2.1, 0.85).under(SlC.deep, 0.4);
      },
      update(n, t, e) {
        n.decals.at(t.slots[0]).at(e.x, e.z).radius(e.radius * (1.42 + 0.14 * Math.sin(t.age * 24)));
      },
    },
    slime_puddle: {
      create(n, t) {
        const outer = Ks(n, t, Xt.range, 0.16);
        n.decals.at(outer).y(0.07).params(0.04, 0).color(SlC.hot, 2.2, 0.92).under(SlC.deep, 0.45);
        const fill = Ks(n, t, Xt.zone, 0.16);
        n.decals.at(fill).y(0.05).params(0, 0).color(SlC.glow, 1.45, 0.52).under(SlC.deep, 0.3);
        const sw = Ks(n, t, Xt.swirl, 0.16);
        n.decals.at(sw).y(0.06).params(3, 1.5).color(SlC.hot, 1.6, 0.46).under(SlC.dark, 0.2);
      },
      update(n, t, e, s) {
        const r = 2.95,
          pulse = 0.97 + 0.04 * Math.sin(t.age * 7.5);
        n.decals.at(t.slots[0]).at(e.x, e.z).radius(r * pulse);
        n.decals.at(t.slots[1]).at(e.x, e.z).radius(r * 0.98);
        n.decals.at(t.slots[2]).at(e.x, e.z).radius(r * 0.88).rot(t.age * 1.1, 1);
        for (let i = xc(n, t, s, 14); i > 0; i--) {
          const o = n.rnd,
            a = o.next() * oe,
            d = o.range(0.3, r * 0.88);
          n.particles
            .use(Mt.mote)
            .tint(i % 2 === 0 ? SlC.hot : W.heal, SlC.accent)
            .spawn(e.x + Math.cos(a) * d, 0.14, e.z + Math.sin(a) * d, o.signed() * 0.4, o.range(1.0, 2.3), o.signed() * 0.4, 0.48, 0.22, 0.06);
        }
      },
    },
    slime_absorbed: {
      create(n, t) {
        const ring = Ks(n, t, Xt.ring, 0.12);
        n.decals.at(ring).y(0.08).params(1, 0.2).color(W.goldHot, 2.5, 0.92).under(SlC.deep, 0.5);
      },
      update(n, t, e) {
        n.decals.at(t.slots[0]).at(e.x, e.z).radius(e.radius * (1.5 + 0.16 * Math.sin(t.age * 18)));
      },
    },
  },
  az = Object.keys(d8),
  oz = new Map(az.map((n, t) => [n, t]));

class rz {
  views = new Map();
  list = [];
  k;
  stamp = 0;
  phaseN = 0;
  constructor(t) {
    this.k = t;
  }
  release(t) {
    const e = this.k;
    t.def.end?.(e, t);
    for (const s of t.slots) e.decals.release(s, 0.2);
    for (const s of t.meshes) e.glow.release(s);
    ((t.slots.length = 0), (t.meshes.length = 0));
  }
  update(t) {
    const e = this.k,
      s = ++this.stamp,
      i = t.dt;
    for (const o of t.state.units) {
      if (o.buffs.length === 0 || !o.alive || (o.team !== t.playerTeam && !o.visible[t.playerTeam])) continue;
      let r = !1;
      for (const l of o.buffs) {
        const c = oz.get(l.id);
        if (c === void 0) continue;
        const f = o.id * 64 + c;
        let d = this.views.get(f);
        if (d && d.seen === s) continue;
        if (!r) {
          if (!e.anchors.get(o.id, e.a)) break;
          r = !0;
        }
        const h = lz(o.buffs, l.id);
        (d ||
          ((this.phaseN = (this.phaseN + 2.399) % oe),
          (d = { key: f, def: d8[l.id], seen: s, slots: [], meshes: [], acc: 0, age: 0, phase: this.phaseN }),
          this.views.set(f, d),
          this.list.push(d),
          d.def.create?.(e, d, e.a, h)),
          (d.seen = s),
          (d.age += i),
          d.def.update(e, d, e.a, h, i));
      }
    }
    this.blessedMinions(t);
    const a = this.list;
    for (let o = a.length - 1; o >= 0; o--) {
      const r = a[o];
      r.seen !== s && (this.release(r), this.views.delete(r.key), (a[o] = a[a.length - 1]), a.pop());
    }
  }
  blessedMinions(t) {
    const e = this.k,
      s = t.state.teams;
    if (!(s[0].blessingLeft > 0) && !(s[1].blessingLeft > 0)) return;
    const i = t.playerTeam;
    for (const a of t.state.units) {
      if (a.kind !== "minion" || !a.alive || (a.team !== 0 && a.team !== 1)) continue;
      const o = s[a.team].blessingLeft;
      if (
        !(o > 0) ||
        (a.team !== i && !a.visible[i]) ||
        e.focusDist(a.pos.x, a.pos.y) > 30 ||
        !e.anchors.get(a.id, e.a)
      )
        continue;
      const r = o < 5 ? 0.55 + 0.45 * Math.cos(e.now * 9) : 1;
      e.sprites.icon(
        Ft.star8,
        e.a.x,
        e.a.y + e.a.height + 0.35 + Math.sin(e.now * 3 + a.id) * 0.06,
        e.a.z,
        0.36,
        e.now * 0.8,
        Vd,
        1.25,
        0.9 * r,
        0.15,
        0.1,
      );
    }
  }
  get count() {
    return this.views.size;
  }
  reset() {
    for (const t of this.list) this.release(t);
    ((this.list.length = 0), this.views.clear());
  }
}

function lz(n, t) {
  let e = null;
  for (const s of n)
    s.id === t && (!e || s.value > e.value || (s.value === e.value && s.stacks > e.stacks)) && (e = s);
  return e;
}

const Jr = 46;
export { $D, l8, QD, rz, Jr };
