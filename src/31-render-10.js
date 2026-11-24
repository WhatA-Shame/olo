// 31-render-10.js — render｜34 个顶层语句｜66KB
// 对应 game.pretty.js 第 61621–63707 行
// 关键内容：
//   qc                    未知模型：${n}
//   t4                    四边形比标称半径大 1.5 倍，留给外发光
//   zp                    绕一圈的 0..1，position.y = 自下而上
//   Ec                    root
//   Xw                    root
//   Yw                    root
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { Se } from './02-data.js';
import { Cr, Fh, Pi, mo, ri, sM } from './04-audio-2.js';
import { dt } from './05-three.js';
import { Ut } from './06-three-2.js';
import { Ae, An, Ji, N0, Qs, Sn, Yi, wM } from './07-three-3.js';
import { Cf, DM, LM, PM } from './08-three-4.js';
import { ee } from './10-render-2.js';
import { Yt, fs } from './14-three-7.js';
import { aa, as, sh, ux, zf } from './15-render-4.js';
import { xo } from './18-core.js';
import { Ct, En, K, Kn, Ux, Wa, Xe, bU, bt, p2, pt, sw } from './25-render-9.js';
import { AU, Ls, bBg, bNm, bNm2, bNw } from './26-core-5.js';
import { PU, UU } from './27-core-6.js';
import { $U, KU, ZU, jU } from './28-core-7.js';
import { JU, QU, fO, lO } from './29-core-8.js';
import { $x, CO, L8, LO, MO, W1, ao, jc, pO, qi, qw, rs, xa, yO } from './30-core-9.js';

function Ec(n, t) {
  const e = $x[t],
    s = new Wa(),
    i = s.add("root", -1, 0, 0, 0),
    a = n === 3 ? 1.15 : 1,
    o = 4.1 + n * 0.4,
    r = 2.5,
    l = o + 1.35,
    c = s.add("lower", i, 0, 0.35, 0),
    f = s.add("upper", c, 0, r, 0),
    d = s.add("core", i, 0, l, 0),
    h = Array.from({ length: n }, (T, E) => s.add(`ring${E}`, i, 0, l - 0.15 + E * 0.2, 0)),
    u = s.add("tip", i, 0, l + 1.5, 0),
    m = s.add("alert", u, 0, l + 1.9, 0),
    x = [0, 1, 2, 3].map((T) => s.add(`chunk${T}`, T < 2 ? c : f, 0, T < 2 ? 1.7 : 3.2, 0)),
    p = [0, 1, 2].map((T) => s.add(`crack${T}`, T === 0 ? f : c, 0, T === 0 ? 3.2 : 1.6, 0)),
    g = n === 3 ? s.add("flag", f, 0, o - 0.5, 0) : -1,
    y = new Ls();
  y.crease = 30;
  const v = (T) => bt(0.96, 0.62, (T - 0.35) / (o - 0.35)) * a;
  (y.bone(i), L8(y, e, 1.58));
  for (let T = 0; T < 4; T++) {
    const E = (T * Math.PI) / 2 + Math.PI / 4,
      A = Math.cos(E) * 1.36,
      C = Math.sin(E) * 1.36;
    (y.paint(e.stoneDark, { c2: e.stone, ...qi }),
      y.lathe(
        [
          [0.16, 0.13, 0.13, A, C],
          [0.56, 0.09, 0.09, A, C],
          [0.6, 0.13, 0.13, A, C],
        ],
        { seg: 6 },
      ),
      y.paint(e.crystal, { c2: e.crystalHot, glow: 0.5, glow2: 0.8, ...ao, line: 0 }),
      y.g(pt(A, 0.6, C), () => y.crystal(0.085, 0.3 + (n - 1) * 0.08, 4, 0.6, 0.25)));
  }
  (y.bone(c).paint(e.stoneDark, { c2: e.stone, by: (T, E) => (E - 0.35) / (r - 0.35), ...qi }),
    y.lathe(
      [
        [0.35, v(0.35) * 1.16],
        [0.5, v(0.5) * 1.16],
        [0.56, v(0.56) * 1.04],
      ],
      { seg: 8, phase: 22.5, crease: 30, cap0: !1, cap1: !1 },
    ));
  const _ = Ux(e.stoneDark, 0.62);
  (qw(y, 0.56, r, 4, v, !0, _),
    y.bone(f).paint(e.stone, { c2: e.stoneLight, by: (T, E) => (E - r) / (o - r), ...qi }),
    qw(y, r, o - 0.3, 3 + (n > 1 ? 1 : 0), v, !1, _),
    y.paint(e.stone, { c2: e.stoneLight, by: (T, E) => (E - r) / (o - r), ...qi }),
    y.lathe(
      [
        [o - 0.3, v(o - 0.3)],
        [o - 0.1, v(o) * 1.5],
        [o + 0.12, v(o) * 1.62],
        [o + 0.2, v(o) * 1.2],
      ],
      { seg: 8, phase: 22.5, cap0: !1 },
    ),
    y.paint(e.trim, { ...xa }),
    y.lathe(
      [
        [o - 0.12, v(o) * 1.56],
        [o + 0.14, v(o) * 1.68],
        [o + 0.16, v(o) * 1.5],
      ],
      { seg: 8, phase: 22.5, cap0: !1, cap1: !1 },
    ),
    y.lathe(
      [
        [r - 0.07, v(r) * 1.07],
        [r + 0.07, v(r) * 1.07],
      ],
      { seg: 8, phase: 22.5 },
    ));
  for (let T = 0; T < 4; T++) {
    const E = (T * Math.PI) / 2;
    for (const [A, C, R] of [
      [c, 1.25, 2.2],
      [f, r + 0.3, o - 0.55],
    ]) {
      y.bone(A).paint(e.crystal, { c2: e.crystalHot, glow: 0.35, glow2: 0.6, ...ao, line: 0 });
      const I = (C + R) / 2,
        P = (R - C) / 2;
      y.g(
        pt(
          Math.cos(E) * (v(I) * 0.925 + 0.015),
          I,
          Math.sin(E) * (v(I) * 0.925 + 0.015),
          0,
          90 - (E * 180) / Math.PI,
          0,
        ),
        () =>
          y.g(pt(0, 0, 0, -((0.34 * a) / (o - 0.35)) * (180 / Math.PI), 0, 0), () =>
            y.extrude(
              [
                [-0.06, -P],
                [0.06, -P],
                [0.09, 0],
                [0.06, P],
                [0, P + 0.12],
                [-0.06, P],
                [-0.09, 0],
              ],
              0.07,
              0,
            ),
          ),
      );
    }
  }
  (x.forEach((T, E) => {
    const A = (E * Math.PI) / 2 + Math.PI / 4,
      C = E < 2 ? 1.5 + E * 0.5 : r + 0.55 + (E - 2) * 0.6;
    (y.bone(T).paint(e.stone, { c2: e.stoneLight, ...qi }),
      y.g(pt(Math.cos(A) * v(C) * 0.99, C, Math.sin(A) * v(C) * 0.99, 0, 90 - (A * 180) / Math.PI, 0), () => {
        (y.box(0, 0, 0, 0.5 * a, 0.6, 0.16, 0.05),
          y.paint(e.trim, { ...xa }),
          y.box(0, 0, 0.085, 0.1, 0.1, 0.03));
      }));
  }),
    p.forEach((T, E) => {
      y.bone(T).paint(e.crystalHot, { c2: e.crystal, glow: 0.8, ...ao, line: 0 });
      const A = E === 0 ? r + 0.2 : 0.7 + (E - 1) * 0.5,
        C = E === 0 ? o - 0.5 : r - 0.1;
      (W1(y, v, 0.5 + E * 2.2, A, C, 3 + E), W1(y, v, 2.3 + E * 2.2, A + 0.3, C - 0.4, 9 + E));
    }));
  const k = 1.9 + n * 0.2;
  for (let T = 0; T < 4; T++) {
    const E = (T * Math.PI) / 2 + Math.PI / 4;
    (y.bone(f),
      y.g(pt(0, o + 0.1, 0, 0, -(E * 180) / Math.PI + 90, 0), () => {
        y.paint(e.stone, { c2: e.stoneLight, ...qi });
        const A = (e.spiky ? 1.22 : 1.1) * a;
        (y.tube(
          [
            [0, 0, 0.7 * a, 0.2, 0.16],
            [0, k * 0.3, A, 0.19, 0.14],
            [0, k * 0.62, A + 0.08, 0.15, 0.11],
            [0, k * 0.88, A - 0.2, 0.09, 0.07],
            [0, k, A - 0.52, 0.01, 0.01],
          ],
          { seg: 5, up: [1, 0, 0] },
        ),
          y.paint(e.trim, { ...xa }),
          y.g(pt(0, k * 0.3, A + 0.02, 12, 0, 0), () => y.box(0, 0, 0, 0.44, 0.12, 0.34, 0.03)),
          e.spiky &&
            (y.paint(e.stoneDark, { c2: e.stone, ...qi }),
            y.g(pt(0, k * 0.5, A + 0.18, 70, 0, 0), () => y.crystal(0.09, 0.5, 4, 0.8, 0.1))),
          y.paint(e.crystal, { c2: e.crystalHot, glow: 0.35, ...ao }),
          y.g(pt(0, k * 0.62, A + 0.2, 60, 0, 0), () => y.crystal(0.07, 0.24, 4, 0.6, 0.3)));
      }));
  }
  if (
    (n >= 2 &&
      (y.bone(f),
      y.sym(() => {
        (y.paint(e.stone, { c2: e.stoneLight, ...qi }),
          y.g(pt(v(3.2) * 0.9, 3.2, 0), () =>
            y.extrude(
              [
                [0, -0.9],
                [0.46, -0.3],
                [0.78 + (n - 2) * 0.16, 1 + (n - 2) * 0.3],
                [0.34, 0.56],
                [0, 0.8],
              ],
              0.16,
              0.05,
            ),
          ),
          y.paint(e.trim, { ...xa }),
          y.g(pt(v(3.2) * 0.9 + 0.3, 3.3, 0), () => y.box(0, 0, 0, 0.08, 0.6, 0.2, 0.02)),
          y.paint(e.crystal, { c2: e.crystalHot, glow: 0.35, glow2: 0.6, ...ao }),
          y.g(pt(v(3.2) * 0.9 + 0.62 + (n - 2) * 0.14, 3.9 + (n - 2) * 0.3, 0, 0, 0, -22), () =>
            y.crystal(0.09, 0.5, 4, 0.7, 0.2),
          ));
      })),
    n === 3)
  ) {
    for (let T = 0; T < 4; T++) {
      const E = (T * Math.PI) / 2;
      (y.bone(f).paint(e.trim, { ...xa }),
        y.g(
          pt(Math.cos(E) * v(o) * 1.5, o + 0.14, Math.sin(E) * v(o) * 1.5, 0, -(E * 180) / Math.PI, 0),
          () => y.g(pt(0, 0, 0, 0, 0, -24), () => y.crystal(0.11, 1, 4, 0.8, 0.12)),
        ));
    }
    y.bone(g).paint(792624, {
      team: 0.85,
      mat: K.cloth,
      pattern: En.weave,
      patternScale: 8,
      patternAmt: 0.35,
    });
    for (const T of [1, -1])
      y.sheet(2, 3, (E, A) => [
        (E - 0.5) * 0.62 * (1 - A * 0.2),
        o - 0.5 - A * 1.5 + (A > 0.9 ? Math.abs(E - 0.5) * 0.3 : 0),
        T * (v(o - 0.5 - A * 1.5) * 0.93 + 0.06 + 0.05 * Math.sin(A * 3)),
      ]);
    y.bone(f).paint(e.trim, { ...xa });
    for (const T of [1, -1]) y.box(0, o - 0.47, T * (v(o - 0.5) * 0.93 + 0.07), 0.72, 0.07, 0.07, 0.02);
  }
  y.bone(d).paint(e.crystal, {
    c2: e.crystalMid,
    glow: 0.24 * e.glowK,
    glow2: 0.42 * e.glowK,
    ...ao,
    gloss: 0.8,
  });
  const M = 0.5 + n * 0.05;
  (y.g(pt(0, l - 0.85, 0), () => y.crystal(M, 1.7, 6, 0.5, 0.5, 1)),
    y.paint(e.crystalHot, { glow: 0.65 * e.glowK, mat: K.crystal, line: 0 }),
    y.g(pt(0, l - 0.45, 0), () => y.crystal(M * 0.45, 0.9, 4, 0.5, 0.5, 1)),
    h.forEach((T, E) => {
      const A = 1.05 + E * 0.28;
      (y.bone(T).paint(e.trim, { ...xa }),
        y.g(pt(0, l - 0.15 + E * 0.2, 0), () => {
          (y.torus(A, 0.09, 0.035, 20, 4, { crease: 30 }),
            y.paint(e.crystal, { c2: e.crystalHot, glow: 0.5, mat: K.crystal, line: 0 }));
          for (let C = 0; C < 4; C++) {
            const R = (C * Math.PI) / 2 + E * 0.6;
            y.g(pt(Math.cos(R) * A, 0, Math.sin(R) * A, 0, -(R * 180) / Math.PI, 0), () =>
              y.box(0, 0, 0, 0.12, 0.09, 0.22),
            );
          }
        }));
    }),
    y.bone(u).paint(e.crystal, { c2: e.crystalHot, glow: 0.3, glow2: 0.6, ...ao }),
    y.g(pt(0, l + 1.2, 0), () => y.crystal(0.16, 1 + n * 0.25, 4, 0.75, 0.15)));
  const S = 2 + n;
  for (let T = 0; T < S; T++) {
    const E = (T / S) * jc;
    y.g(pt(Math.cos(E) * 0.58, l + 1.3 + (T % 2) * 0.16, Math.sin(E) * 0.58), () =>
      y.g(pt(0, -0.14, 0, rs(T, 1) * 20 - 10, 0, rs(T, 2) * 20 - 10), () =>
        y.crystal(0.085, 0.3 + rs(T, 3) * 0.14, 4, 0.5, 0.4),
      ),
    );
  }
  y.bone(m).paint(LO, { c2: 16777215, glow: 0.95, mat: K.crystal, line: 0 });
  for (let T = 0; T < 4; T++) {
    const E = (T / 4) * jc + 0.4;
    y.g(pt(Math.cos(E) * 0.44, l + 1.9, Math.sin(E) * 0.44, 0, -(E * 180) / Math.PI, 0), () =>
      y.g(pt(0, 0, 0, 0, 0, -90), () => y.crystal(0.07, 0.36, 4, 0.8, 0.2)),
    );
  }
  y.bakeGrounding(8, 0.75, 0.9);
  const b = l + 2.2 + n * 0.25,
    w = (T, E, A) => {
      const C = E.time + E.seed * 10,
        R = 1 - E.hp;
      (x.forEach((G, q) => {
        const et = q < 2 ? 0.25 : q === 2 ? 0.5 : 0.75,
          ct = Ct(R, et - 0.01 + q * 0.03, et + 0.05 + q * 0.03);
        ct > 0 && (T.scale(G, Math.max(0.001, 1 - ct)), T.pos(G, 0, -ct * 1.2, 0));
      }),
        p.forEach((G, q) =>
          T.scale(G, Math.max(0.001, Ct(R, 0.25 * (q + 1) - 0.02, 0.25 * (q + 1) + 0.04))),
        ));
      const I = Ct(R, 0.45, 0.85),
        P = (E.mode & 2) !== 0;
      let F = 0,
        L = 1,
        B = 0;
      if (E.anim === "attack") {
        const G = E.windup;
        ((F = E.p < G ? E.p / G : Math.max(0, 1 - (E.p - G) / 0.25)),
          (B = Xe(E.p, G + 0.04, 0.09)),
          (L = 1 + 3 * F),
          E.p >= G ? (A.glow = 1 + 1.6 * F) : (A.glow = 1 + 1 * F * F));
      } else A.glow = 1 + 0.12 * Math.sin(C * 2);
      if (
        ((A.glow *= 1 - I * (0.35 + 0.25 * Math.sin(C * 17) * Math.sin(C * 7.3))),
        T.pos(d, 0, Math.sin(C * 1.3) * 0.12 - I * 0.25, 0),
        T.rot(d, 0, C * 26 * L, I * 8 * Math.sin(C * 3)),
        T.scale(d, 1 + 0.25 * F + 0.03 * Math.sin(C * 2.6)),
        h.forEach((G, q) => {
          const et = q % 2 === 0 ? 1 : -1;
          (T.rot(
            G,
            16 + q * 14 + I * 16 * Math.sin(C * 2 + q),
            et * C * (34 + q * 12) * L,
            10 - q * 16 + I * 12 * Math.cos(C * 1.7 + q) + R * 14,
          ),
            T.pos(G, 0, Math.sin(C * 1.1 + q * 2) * 0.08 - I * 0.2 * q, 0),
            T.scale(G, 1 + 0.08 * F + 0.28 * B));
        }),
        T.pos(u, 0, Math.sin(C * 1.3 + 1) * 0.14, 0),
        T.rot(u, 0, C * (P ? 160 : 50), 0),
        T.scale(m, P ? 1 + 0.2 * Math.sin(C * 12) : 0.001),
        T.rot(m, 0, P ? C * 220 : 0, 0),
        g >= 0 && T.rot(g, Math.sin(C * 1.4) * 1.5, 0, Math.sin(C * 1.1) * 2),
        E.deathT >= 0)
      ) {
        const G = E.deathT,
          q = Ct(G, 0, 0.35),
          et = Ct(G, 0.2, 1.3),
          ct = Ct(G, 0.9, 2.2),
          rt = E.seed > 0.5 ? 1 : -1;
        (T.scale(d, Math.max(0.001, (1 + q * 0.5) * (1 - Ct(G, 0.25, 0.45)))),
          h.forEach((nt, H) => {
            const st = Ct(G, 0.1, 0.9);
            (T.scale(nt, Math.max(0.001, (1 + st * 0.8) * (1 - Ct(G, 0.6, 1)))),
              T.pos(nt, rt * st * (0.5 + H * 0.4), -st * st * 3.5, st * (H - 0.5) * 0.8),
              T.rot(nt, 16 + st * 120, 0, 10 + st * 80 * rt));
          }),
          T.pos(u, rt * et * 2, -et * et * (l + 1), 0),
          T.rot(u, 0, 0, -rt * et * 140),
          T.scale(u, Math.max(0.001, 1 - Ct(G, 1, 1.5))),
          p.forEach((nt) => T.scale(nt, 1)));
        const mt = et * et;
        (T.rot(f, 0, 0, -rt * mt * 84),
          T.pos(f, rt * mt * 0.3, -mt * 0.9 - ct * 1.2, 0),
          T.scale(f, Math.max(0.001, 1 - ct)),
          T.pos(c, 0, -ct * 1.4, 0),
          T.scale(c, 1 - ct * 0.9),
          T.scale(i, 1 - Ct(G, 1.9, 2.4) * 0.999),
          T.rot(i, 0, 0, Math.sin(G * 50) * 0.6 * (1 - ct)),
          (A.glow = (1 + 3 * Xe(G, 0.3, 0.2)) * (1 - Ct(G, 0.4, 1))));
      }
    };
  return {
    key: `tower:${n}:${t}`,
    geometry: y.build(),
    rig: s,
    height: b,
    radius: 1.7,
    scale: 1,
    stride: 1,
    triangles: y.triangleCount,
    deathDur: 2.4,
    attach: {
      core: { joint: d, x: 0, y: 0, z: 0 },
      muzzle: { joint: d, x: 0, y: 0, z: 0 },
      chest: { joint: i, x: 0, y: 2.6, z: 0 },
      head: { joint: u, x: 0, y: 1, z: 0 },
    },
    blend: () => 0,
    animate: w,
  };
}

function Xw(n) {
  const t = $x[n],
    e = new Wa(),
    s = e.add("root", -1, 0, 0, 0),
    i = e.add("stump", s, 0, 0.35, 0),
    a = new Ls();
  ((a.crease = 28),
    a.bone(s).paint(1709588, { c2: 3813418, mat: K.rock, by: (o, r, l) => Math.hypot(o, l) / 2.9, line: 0 }),
    a.lathe(
      [
        [0.04, 2.9],
        [0.05, 0.02],
      ],
      { seg: 12, cap0: !1, cap1: !1, shape: (o) => 0.78 + 0.22 * Math.sin(o * 3 + 1) * Math.sin(o * 5) },
    ),
    (a.rough = 0.03),
    L8(a, t, 1.58),
    a.bone(i).paint(t.stoneDark, { c2: t.stone, ...qi }),
    a.lathe(
      [
        [0.35, 0.98],
        [1, 0.9],
        [1.5, 0.86],
      ],
      {
        seg: 8,
        phase: 22.5,
        cap1: !1,
        shape: (o, r) => (r === 2 ? 0.75 + 0.3 * rs(Math.round(o * 3), 5) : 1),
      },
    ),
    a.lathe(
      [
        [1.02, 0.02],
        [1.06, 0.84],
      ],
      { seg: 8, phase: 22.5, cap0: !1, cap1: !1 },
    ));
  for (let o = 0; o < 4; o++) {
    const r = o * 1.7 + 0.3;
    a.g(pt(Math.cos(r) * 0.55, 1, Math.sin(r) * 0.55, rs(o, 1) * 30 - 15, o * 80, rs(o, 2) * 30 - 15), () =>
      a.crystal(0.22, 0.7 + rs(o, 3) * 0.6, 4, 0.5, 0.05),
    );
  }
  a.bone(s);
  for (let o = 0; o < 11; o++) {
    const r = o * 2.4 + 0.5,
      l = 1.1 + rs(o, 7) * 1.5,
      c = 0.22 + rs(o, 8) * 0.4;
    (a.paint(o % 3 === 0 ? t.stoneLight : t.stone, { c2: t.stoneDark, ...qi }),
      a.g(
        pt(
          Math.cos(r) * l,
          c * 0.35 + (l < 1.5 ? 0.3 : 0),
          Math.sin(r) * l,
          rs(o, 9) * 60,
          rs(o, 10) * 180,
          rs(o, 11) * 60,
        ),
        () => a.box(0, 0, 0, c * 1.4, c, c * 1.1, c * 0.2),
      ));
  }
  a.rough = 0;
  for (let o = 0; o < 5; o++) {
    const r = o * 1.26 + 1.1,
      l = 0.9 + rs(o, 13) * 1.3;
    (a.paint(Ux(t.crystal, 0.55), { c2: t.crystal, glow: 0.12, ...ao }),
      a.g(
        pt(
          Math.cos(r) * l,
          0.1 + (l < 1.5 ? 0.32 : 0),
          Math.sin(r) * l,
          60 + rs(o, 14) * 40,
          o * 77,
          rs(o, 15) * 60,
        ),
        () => a.crystal(0.14, 0.5 + rs(o, 16) * 0.5, 5, 0.5, 0.2),
      ));
  }
  for (let o = 0; o < 9; o++) {
    const r = o * 2.1 + 0.9,
      l = 0.5 + rs(o, 21) * 2;
    (a.paint(16742956, { c2: 16765562, glow: 0.7, mat: K.crystal, line: 0 }),
      a.ball(Math.cos(r) * l, 0.08 + (l < 1.5 ? 0.34 : 0), Math.sin(r) * l, 0.07, 0.035, 0.06, 0));
  }
  return (
    a.paint(6969932, { mat: K.leather }),
    a.limb([1.05, 0.3, 0.5], [1.5, 1.9, 0.26], 0.04, 0.03, { seg: 5 }),
    a.paint(792624, { team: 0.8, mat: K.cloth, pattern: En.weave, patternScale: 8, patternAmt: 0.35 }),
    a.sheet(3, 2, (o, r) => {
      const l = r > 0.6 ? 0.16 * Math.abs(Math.sin(o * 9)) : 0;
      return [
        bt(1.5, 1.24, r) + o * 0.5,
        1.9 - r * 0.9 - o * 0.2 + l * 0.3 - l * 0.5,
        0.26 + bt(0, 0.14, r) + o * 0.18,
      ];
    }),
    a.bakeGrounding(2.4, 0.7, 0.85),
    {
      key: `ruin:${n}`,
      geometry: a.build(),
      rig: e,
      height: 2.2,
      radius: 2.9,
      scale: 1,
      stride: 1,
      triangles: a.triangleCount,
      attach: {},
      blend: () => 0,
      animate(o, r, l) {
        const c = r.p;
        (o.scale(s, 0.3 + 0.7 * c),
          o.pos(s, 0, -0.3 * (1 - c), 0),
          o.scale(i, 0.4 + 0.6 * c * c),
          (l.glow =
            (0.6 + 0.4 * Math.sin(r.time * 1.3 + r.seed * 6)) * (1 + 1.2 * Math.max(0, 1 - r.t / 12))));
      },
    }
  );
}

function Yw(n) {
  const t = $x[n],
    e = new Wa(),
    s = e.add("root", -1, 0, 0, 0),
    i = 3.95,
    a = e.add("star", s, 0, i, 0),
    o = e.add("inner", a, 0, i, 0),
    r = e.add("ringA", s, 0, i, 0),
    l = e.add("ringB", s, 0, i, 0),
    c = e.add("orbit", s, 0, i, 0),
    f = [0, 1, 2].map((x) => e.add(`crack${x}`, a, 0, i, 0)),
    d = [0, 1, 2, 3].map((x) =>
      e.add(
        `pylon${x}`,
        s,
        Math.cos((x * Math.PI) / 2 + Math.PI / 4) * 2.2,
        0.9,
        Math.sin((x * Math.PI) / 2 + Math.PI / 4) * 2.2,
      ),
    ),
    h = new Ls();
  ((h.crease = 30),
    h.bone(s).paint(Ux(t.stoneDark, 0.8), { c2: t.stone, ...qi }),
    h.lathe(
      [
        [0, 2.78],
        [0.28, 2.78],
        [0.3, 2.72],
        [0.3, 2.42],
        [0.6, 2.42],
        [0.62, 2.36],
        [0.62, 2.02],
        [0.92, 2.02],
        [0.95, 1.92],
      ],
      { seg: 8, phase: 22.5 },
    ),
    h.paint(t.trim, { ...xa }),
    h.lathe(
      [
        [0.25, 2.81],
        [0.32, 2.81],
        [0.325, 2.46],
      ],
      { seg: 8, phase: 22.5, cap0: !1, cap1: !1 },
    ),
    h.lathe(
      [
        [0.57, 2.45],
        [0.64, 2.45],
        [0.645, 2.06],
      ],
      { seg: 8, phase: 22.5, cap0: !1, cap1: !1 },
    ),
    h.paint(t.crystal, { c2: t.crystalHot, glow: 0.4 * (0.5 + 0.5 * t.glowK), mat: K.crystal, line: 0 }));
  for (let x = 0; x < 8; x++) {
    const p = (x / 8) * jc;
    h.g(pt(Math.cos(p) * 1.5, 0.96, Math.sin(p) * 1.5, 0, -(p * 180) / Math.PI, 0), () =>
      h.box(0, 0, 0, 0.76, 0.04, x % 2 ? 0.05 : 0.09),
    );
  }
  (h.lathe(
    [
      [0.95, 1],
      [0.97, 0.94],
      [1.02, 0.5],
      [1.03, 0.02],
    ],
    { seg: 8, phase: 22.5, cap0: !1 },
  ),
    h.paint(t.trim, { ...xa }),
    h.g(pt(0, 0.97, 0), () => h.torus(1.08, 0.08, 0.05, 16, 4, { crease: 30 })),
    d.forEach((x, p) => {
      const g = (p * Math.PI) / 2 + Math.PI / 4;
      (h.bone(x),
        h.g(pt(Math.cos(g) * 2.2, 0.9, Math.sin(g) * 2.2, 0, -(g * 180) / Math.PI - 90, 0), () => {
          (h.paint(t.stoneDark, { c2: t.stoneLight, ...qi }),
            h.tube(
              [
                [0, -0.3, 0, 0.42, 0.36],
                [0, 0.5, -0.2, 0.39, 0.31],
                [0, 0.52, -0.2, 0.35, 0.28],
                [0, 1.3, -0.22, 0.32, 0.25],
                [0, 1.32, -0.22, 0.29, 0.23],
                [0, 2.1, -0.04, 0.25, 0.2],
                [0, 2.12, -0.04, 0.22, 0.18],
                [0, 2.9, 0.42, 0.16, 0.14],
                [0, 3.42, 0.94, 0.04, 0.04],
              ],
              { seg: 6, up: [1, 0, 0], crease: 30 },
            ),
            h.paint(t.trim, { ...xa }),
            h.g(pt(0, 0.5, -0.16, -8, 0, 0), () => h.box(0, 0, 0, 0.9, 0.14, 0.78)),
            h.g(pt(0, 2.1, -0.04, 12, 0, 0), () => h.box(0, 0, 0, 0.58, 0.1, 0.48)),
            h.paint(t.crystal, { c2: t.crystalHot, glow: 0.4, mat: K.crystal, line: 0 }),
            h.g(pt(0, 1.3, -0.5, 0, 0, 0), () => h.box(0, 0, 0, 0.08, 1.1, 0.05)),
            t.spiky &&
              (h.paint(t.stoneDark, { c2: t.stone, ...qi }),
              h.g(pt(0, 1.3, -0.36, -70, 0, 0), () => h.crystal(0.14, 0.8, 4, 0.8, 0.1)),
              h.g(pt(0, 2.3, -0.2, -60, 0, 0), () => h.crystal(0.1, 0.6, 4, 0.8, 0.1))),
            h.paint(t.crystal, { c2: t.crystalHot, glow: 0.35, ...ao }),
            h.g(pt(0, 3.3, 0.9, 40, 0, 0), () => h.crystal(0.17, 0.66, 5, 0.6, 0.3)));
        }));
    }),
    h
      .bone(a)
      .paint(t.crystal, { c2: t.crystalMid, glow: 0.16 * t.glowK, glow2: 0.32 * t.glowK, ...ao, gloss: 0.8 }),
    h.g(pt(0, i - 1.8, 0), () => h.crystal(1.25, 3.6, 6, 0.5, 0.5, 1)));
  for (let x = 0; x < 6; x++) {
    const p = (x / 6) * jc;
    h.g(pt(0, i, 0, 0, -(p * 180) / Math.PI, 0), () =>
      h.g(pt(0.9, 0, 0, 0, 0, -90), () => h.crystal(0.36, 1.5, 4, 0.8, 0.05)),
    );
  }
  (h.bone(o).paint(t.crystalHot, { glow: 0.5 * t.glowK, mat: K.crystal, line: 0 }),
    h.g(pt(0, i - 0.85, 0), () => h.crystal(0.56, 1.7, 4, 0.5, 0.5, 1)));
  const u = (x) => 1.25 * (1 - Math.abs(x - i) / 1.85) * 0.98 + 0.06;
  f.forEach((x, p) => {
    (h.bone(x).paint(16777215, { c2: t.crystalHot, glow: 0.95, mat: K.crystal, line: 0 }),
      W1(h, u, 0.4 + p * 2.1, i - 1.1, i + 1, 30 + p, 1.03),
      W1(h, u, 1.5 + p * 2.1, i - 0.5, i + 1.3, 40 + p, 1.03));
  });
  for (const [x, p] of [
    [r, 2.3],
    [l, 2.68],
  ])
    (h.bone(x).paint(t.trim, { ...xa, glow: 0.08 }),
      h.g(pt(0, i, 0), () => {
        h.torus(p, 0.09, 0.13, 32, 4, { crease: 30, phase: 45 });
        for (let g = 0; g < 12; g++) {
          const y = (g / 12) * jc,
            v = g % 3 === 0;
          (v
            ? h.paint(t.crystal, { c2: t.crystalHot, glow: 0.55, mat: K.crystal, line: 0 })
            : h.paint(t.trim, { ...xa }),
            h.g(pt(Math.cos(y) * (p - 0.12), 0, Math.sin(y) * (p - 0.12), 0, -(y * 180) / Math.PI, 0), () =>
              h.box(0, 0, 0, v ? 0.34 : 0.16, v ? 0.18 : 0.22, v ? 0.2 : 0.07),
            ));
        }
      }));
  h.bone(c).paint(t.crystal, { c2: t.crystalHot, glow: 0.3, ...ao });
  for (let x = 0; x < 7; x++) {
    const p = (x / 7) * jc,
      g = i + (rs(x, 3) - 0.5) * 2.6;
    h.g(pt(Math.cos(p) * 1.8, g, Math.sin(p) * 1.8, rs(x, 4) * 40 - 20, 0, rs(x, 5) * 40 - 20), () =>
      h.g(pt(0, -0.2, 0), () => h.crystal(0.12, 0.44 + rs(x, 6) * 0.3, 4, 0.5, 0.4)),
    );
  }
  h.bakeGrounding(6, 0.75, 0.9);
  const m = (x, p, g) => {
    const y = p.time + p.seed * 10,
      v = 1 - p.hp,
      _ = Ct(v, 0.5, 0.9),
      k = p.hp < 0.25 && p.deathT < 0;
    let M = 0;
    if (p.anim === "attack") {
      const b = p.windup;
      ((M = p.p < b ? p.p / b : Math.max(0, 1 - (p.p - b) / 0.25)), (g.glow = 1 + 1.2 * M));
    } else g.glow = 1 + 0.14 * Math.sin(y * 1.8);
    ((g.glow *= 1 + 0.5 * v - _ * (0.3 + 0.3 * Math.sin(y * 19) * Math.sin(y * 6.1))),
      k && (g.glow *= 1 + 0.5 * Math.max(0, Math.sin(y * 7))),
      f.forEach((b, w) => x.scale(b, Math.max(0.001, Ct(v, 0.25 * (w + 1) - 0.02, 0.25 * (w + 1) + 0.04)))),
      x.pos(a, 0, Math.sin(y * 0.9) * 0.16, 0),
      x.rot(a, _ * 6 * Math.sin(y * 2.3), y * 14 * (1 + 2 * M), _ * 6 * Math.cos(y * 1.9)),
      x.scale(a, 1 + 0.1 * M + 0.02 * Math.sin(y * 2.2)),
      x.rot(o, y * 40, y * -60, 0),
      x.scale(o, 1 + 0.2 * Math.sin(y * 3) + 0.5 * M));
    const S = 1 + v * 0.8 * Math.sin(y * 3.1) + _ * 0.8 * Math.sin(y * 7.7);
    if (
      (x.rot(r, 24 + _ * 18 * Math.sin(y * 1.4), y * 30 * S, 12 + _ * 16 * Math.cos(y)),
      x.rot(l, -30 + _ * 18 * Math.cos(y * 1.2), -y * 22 * S, -18 + v * 10 * Math.sin(y * 0.9)),
      x.rot(c, 0, -y * 18, 0),
      x.scale(c, 1 - _ * 0.3),
      p.deathT >= 0)
    ) {
      const b = p.deathT,
        w = Ct(b, 0, 0.6),
        T = Ct(b, 0.6, 0.9),
        E = Ct(b, 0.7, 2.2);
      (x.scale(a, Math.max(0.001, (1 + w * 0.45 + Math.sin(b * 60) * 0.03 * w) * (1 - T))),
        x.scale(o, (1 + w * 1.6) * (1 - T)),
        x.scale(r, Math.max(0.001, (1 + T * 2.2) * (1 - Ct(b, 1, 1.5)))),
        x.scale(l, Math.max(0.001, (1 + T * 2.8) * (1 - Ct(b, 1, 1.5)))),
        x.pos(r, 0, -E * 2.5, 0),
        x.pos(l, 0, -E * 2.8, 0),
        x.scale(c, Math.max(0.001, (1 + T * 3) * (1 - Ct(b, 0.9, 1.4)))),
        d.forEach((A, C) => {
          const R = (C * Math.PI) / 2 + Math.PI / 4,
            I = Kn(E) * E;
          (x.rot(
            A,
            Math.sin(R) * I * 66 * (0.8 + rs(C, 2) * 0.4),
            0,
            -Math.cos(R) * I * 66 * (0.8 + rs(C, 3) * 0.4),
          ),
            x.pos(A, 0, -I * 0.3, 0));
        }),
        x.rot(s, 0, 0, Math.sin(b * 46) * 0.5 * (1 - E)),
        (g.glow = (1 + 4 * w) * (1 - Ct(b, 0.75, 1.3)) + 0.05));
    }
  };
  return {
    key: `core:${n}`,
    geometry: h.build(),
    rig: e,
    height: 6.9,
    radius: 2.9,
    scale: 1,
    stride: 1,
    triangles: h.triangleCount,
    attach: {
      core: { joint: a, x: 0, y: 0, z: 0 },
      muzzle: { joint: a, x: 0, y: 0, z: 0 },
      chest: { joint: s, x: 0, y: 3.2, z: 0 },
      head: { joint: a, x: 0, y: 1.8, z: 0 },
    },
    blend: () => 0,
    animate: m,
  };
}

const IO = {
  "tower:1:0": () => Ec(1, 0),
  "tower:2:0": () => Ec(2, 0),
  "tower:3:0": () => Ec(3, 0),
  "tower:1:1": () => Ec(1, 1),
  "tower:2:1": () => Ec(2, 1),
  "tower:3:1": () => Ec(3, 1),
  "core:0": () => Yw(0),
  "core:1": () => Yw(1),
  "ruin:0": () => Xw(0),
  "ruin:1": () => Xw(1),
};

function PO() {
  return {
    anim: "idle",
    p: 0,
    t: 0,
    time: 0,
    stride: 0,
    speed: 0,
    variant: 0,
    seed: 0,
    hp: 1,
    windup: 0.35,
    mode: 0,
    deathT: -1,
    spawnT: -1,
    hitT: 99,
    team: 0,
  };
}

class of {
  constructor(t, e = 0) {
    ((this.def = t),
      (this.pose = new sw(t.rig.count)),
      (this.from = new sw(t.rig.count)),
      (this.skeleton = new bU(t.rig, e)),
      (this.input.seed = e));
  }
  def;
  input = PO();
  output = { glow: 1, tint: 0, tintColor: 16777215 };
  pose;
  skeleton;
  from;
  blendT = 0;
  blendDur = 0;
  lastAnim = null;
  lastKey = NaN;
  snap() {
    ((this.lastAnim = null), (this.blendDur = 0), this.skeleton.resetChains());
  }
  update(t, e, s, i, a, o, r = 1) {
    const l = this.input,
      c = this.def;
    if (
      (this.lastAnim !== null &&
        (l.anim !== this.lastAnim || t !== this.lastKey) &&
        (this.from.copy(this.pose), (this.blendT = 0), (this.blendDur = c.blend(this.lastAnim, l.anim))),
      (this.lastAnim = l.anim),
      (this.lastKey = t),
      (this.output.glow = 1),
      (this.output.tint = 0),
      this.pose.reset(),
      c.animate(this.pose, l, this.output),
      this.blendT < this.blendDur)
    ) {
      const f = this.blendT / this.blendDur;
      (this.pose.blendFrom(this.from, f * f * (3 - 2 * f)), (this.blendT += e));
    }
    (this.skeleton.solve(this.pose, s, i, a, o, r * c.scale), this.skeleton.simulate(this.pose, e, l.time));
  }
  settle() {
    this.skeleton.settle(this.pose, this.input.time);
  }
  attach(t, e) {
    const s = this.def.attach[t];
    return s ? (this.skeleton.point(s.joint, s.x, s.y, s.z, e), !0) : !1;
  }
}

const Gx = {
    "hero:panyue": UU,
    "hero:chijin": bNw,
    "hero:xingli": $U,
    "hero:fengling": PU,
    "hero:yeque": jU,
    "hero:mushroom": bBg,
    "hero:niumo": bNm,
    "hero:niumo2": bNm2,
    "minion:melee": KU,
    "minion:ranged": ZU,
    "minion:siege": QU,
    "minion:super": JU,
    ...IO,
    "monster:mossback": lO,
    "monster:glimwing": pO,
    "monster:frost_golem": CO,
    "monster:ember_golem": yO,
    "monster:abyss_drake": fO,
    "monster:star_colossus": MO,
  },
  Kw = new Map();

function Zw(n) {
  return n in Gx;
}

function qc(n) {
  let t = Kw.get(n);
  if (!t) {
    const e = Gx[n];
    if (!e) throw new Error(`未知模型：${n}`);
    ((t = e()), Kw.set(n, t));
  }
  return t;
}

const Vx = (n) => `hero:${n}`,
  DO = (n) => `minion:${n}`,
  zO = (n, t) => `tower:${n}:${t}`,
  NO = (n) => `core:${n}`,
  FO = (n) => `ruin:${n}`,
  UO = (n) => `monster:${n}`;

function Qw() {
  return Object.keys(Gx);
}

const Jw = new Map();

function Md(n, t) {
  const e = `fallback:${n.toFixed(2)}:${t.toFixed(2)}`;
  let s = Jw.get(e);
  if (s) return s;
  const i = new Wa(),
    a = i.add("root", -1, 0, 0, 0),
    o = i.add("body", a, 0, t * 0.4, 0),
    r = new Ls(),
    l = n * 0.8;
  return (
    r.bone(o).paint(10133672, { c2: 13159636 }),
    r.lathe(
      [
        [0, l * 0.9],
        [t * 0.1, l],
        [t * 0.55, l * 0.85],
        [t * 0.8, l * 0.6],
        [t, l * 0.15],
      ],
      { seg: 8, crease: 30 },
    ),
    r.paint(16777215, { team: 1 }),
    r.lathe(
      [
        [t * 0.42, l * 0.95],
        [t * 0.5, l * 0.94],
        [t * 0.52, l * 0.8],
      ],
      { seg: 8, cap0: !1 },
    ),
    r.bakeGrounding(t),
    (s = {
      key: e,
      geometry: r.build(),
      rig: i,
      height: t,
      radius: n,
      scale: 1,
      stride: 2,
      triangles: r.triangleCount,
      attach: { chest: { joint: o, x: 0, y: t * 0.2, z: 0 } },
      blend: () => 0.12,
      animate(c, f) {
        if (f.anim === "dead") {
          const d = Math.min(1, f.t / 0.8);
          (c.rot(a, -80 * d * d, 0, 0), c.scale(a, 1 - 0.5 * d));
        } else
          f.anim === "move"
            ? c.pos(o, 0, Math.abs(Math.sin(f.stride * Math.PI * 2)) * 0.12, 0)
            : f.anim === "attack"
              ? c.rot(o, 30 * Math.sin(Math.min(1, f.p / 0.5) * Math.PI), 0, 0)
              : c.pos(o, 0, Math.sin(f.time * 2 + f.seed * 6) * 0.02, 0);
      },
    }),
    Jw.set(e, s),
    s
  );
}

const t4 = 0,
  e4 = 1,
  OO = 2,
  BO = 3,
  HO = `
#include <common>
#include <fog_pars_vertex>
attribute vec4 aPosR;
attribute vec4 aCol;
attribute vec4 aStyle;
varying vec2 vUv;
varying vec4 vCol;
varying vec4 vStyle;
void main() {
  vUv = position.xz;
  vCol = aCol;
  vStyle = aStyle;
  vec4 mvPosition = viewMatrix * vec4(aPosR.xyz + position * aPosR.w * 1.5, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}
`,
  $O = `
#include <common>
#include <fog_pars_fragment>
uniform float uTime;
varying vec2 vUv;
varying vec4 vCol;
varying vec4 vStyle;
void main() {
  // 四边形比标称半径大 1.5 倍，留给外发光
  vec2 p = vUv * 1.5;
  float r = length(p);
  float style = vStyle.x;
  float aa = fwidth(r) * 1.2 + 1e-4;
  vec3 col = vec3(0.0);
  float alpha = 0.0;
  vec3 glow = vec3(0.0);
  if (style < 0.5) {
    // 接触阴影：vStyle.z > 1 时是沿 vStyle.y 方向拉长的椭圆(长轴 = 标称半径，短轴 = 半径 / z)
    float cs0 = cos(vStyle.y);
    float sn0 = sin(vStyle.y);
    vec2 e = vec2(p.x * cs0 + p.y * sn0, (-p.x * sn0 + p.y * cs0) * max(1.0, vStyle.z));
    r = length(e);
    float a = 1.0 - smoothstep(0.15, 1.05, r);
    alpha = a * a * vCol.a;
    col = vCol.rgb;
  } else {
    float cs = cos(vStyle.y);
    float sn = sin(vStyle.y);
    // q.x 指向单位朝向
    vec2 q = vec2(p.x * cs + p.y * sn, -p.x * sn + p.y * cs);
    float ring = 0.0;
    float fill = 0.0;
    if (style < 1.5) {
      ring = 1.0 - smoothstep(0.05, 0.05 + aa, abs(r - 0.92));
      fill = smoothstep(0.5, 0.92, r) * step(r, 0.92) * 0.18;
    } else {
      float w = style < 2.5 ? 0.055 : 0.07;
      ring = 1.0 - smoothstep(w, w + aa, abs(r - 0.93));
      // 朝向缺口 + 箭头
      float ang = atan(q.y, q.x);
      float gap = smoothstep(0.2, 0.26, abs(ang));
      ring *= gap;
      vec2 t = q - vec2(1.0, 0.0);
      float tri = max(abs(t.y) * 1.25 + t.x * 0.9 - 0.2, -t.x - 0.16);
      float arrow = 1.0 - smoothstep(0.0, aa * 1.5, tri);
      ring = max(ring, arrow);
      fill = smoothstep(0.45, 0.93, r) * step(r, 0.93) * 0.16;
      if (style > 2.5) {
        // 玩家：内圈一环缓慢转动的刻度
        float a2 = atan(p.y, p.x) + uTime * 0.6;
        float dash = smoothstep(0.25, 0.35, abs(fract(a2 / 6.2831853 * 12.0) - 0.5));
        float inner = (1.0 - smoothstep(0.022, 0.022 + aa, abs(r - 0.76))) * dash;
        ring = max(ring, inner * 0.85);
        fill *= 1.35;
      }
    }
    float halo = exp(-pow(max(r - 0.93, 0.0) * 7.0, 2.0)) * step(0.93, r) * 0.35;
    float a = saturate(ring + fill) * vCol.a;
    alpha = a;
    col = vCol.rgb * (0.85 + 0.6 * ring);
    glow = vCol.rgb * (ring * 0.55 + halo) * vCol.a;
  }
  if (alpha + glow.r + glow.g + glow.b < 0.004) discard;
  gl_FragColor = vec4(col * alpha + glow, alpha);
  ${aa}
}
`;

class GO {
  mesh;
  geo;
  posR;
  col;
  style;
  capacity;
  count = 0;
  material;
  constructor(t = 160) {
    ((this.capacity = t),
      (this.geo = new Cf()),
      this.geo.setAttribute("position", new Ae([-1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1], 3)),
      this.geo.setIndex([0, 2, 1, 0, 3, 2]),
      (this.posR = new Qs(new Float32Array(t * 4), 4)),
      (this.col = new Qs(new Float32Array(t * 4), 4)),
      (this.style = new Qs(new Float32Array(t * 4), 4)));
    for (const e of [this.posR, this.col, this.style]) e.setUsage(Pi);
    (this.geo.setAttribute("aPosR", this.posR),
      this.geo.setAttribute("aCol", this.col),
      this.geo.setAttribute("aStyle", this.style),
      (this.material = new An({
        uniforms: { ...N0.clone(ee.fog), uTime: fs.uTime },
        vertexShader: HO,
        fragmentShader: $O,
        transparent: !0,
        depthWrite: !1,
        fog: !0,
        blending: Fh,
        blendSrc: Cr,
        blendDst: mo,
        blendSrcAlpha: Cr,
        blendDstAlpha: mo,
        polygonOffset: !0,
        polygonOffsetFactor: -2,
        polygonOffsetUnits: -2,
      })),
      (this.mesh = new Sn(this.geo, this.material)),
      (this.mesh.name = "unit-rings"),
      (this.mesh.frustumCulled = !1),
      (this.mesh.matrixAutoUpdate = !1),
      (this.mesh.renderOrder = 4),
      (this.mesh.visible = !1));
  }
  begin() {
    this.count = 0;
  }
  push(t, e, s, i, a, o, r, l = 0, c = 1) {
    if (this.count >= this.capacity) return;
    const f = this.count++,
      d = this.posR.array;
    ((d[f * 4] = t), (d[f * 4 + 1] = e), (d[f * 4 + 2] = s), (d[f * 4 + 3] = i));
    const h = this.col.array;
    ((h[f * 4] = a.r), (h[f * 4 + 1] = a.g), (h[f * 4 + 2] = a.b), (h[f * 4 + 3] = o));
    const u = this.style.array;
    ((u[f * 4] = r), (u[f * 4 + 1] = l), (u[f * 4 + 2] = c));
  }
  end() {
    ((this.geo.instanceCount = this.count),
      (this.mesh.visible = this.count > 0),
      this.count !== 0 &&
        ((this.posR.needsUpdate = !0), (this.col.needsUpdate = !0), (this.style.needsUpdate = !0)));
  }
  dispose() {
    (this.geo.dispose(), this.material.dispose());
  }
}

const zp = 32,
  VO = `
#include <common>
attribute vec4 aPosR;
attribute vec4 aDim;
attribute vec3 aCol;
varying vec2 vCell;
varying vec3 vN;
varying vec3 vW;
varying vec3 vCol;
varying vec3 vT;
void main() {
  // position.x = 绕一圈的 0..1，position.y = 自下而上的 0..1
  float a = position.x * 6.2831853;
  float t = position.y;
  float crack = aDim.w;
  // 略微收顶；解除时整圈外扩
  float R = aPosR.w * (1.0 - 0.12 * t * t) * (1.0 + 0.22 * crack);
  vec3 n = vec3(cos(a), 0.0, sin(a));
  vec3 w = vec3(aPosR.x, aPosR.y + t * aDim.x, aPosR.z) + n * R;
  // 六边格坐标：周向 aDim.y 格，纵向按格宽换算(格子保持正六边形)
  float cellW = 6.2831853 * aPosR.w / aDim.y;
  vCell = vec2(position.x * aDim.y, t * aDim.x / cellW);
  vN = n;
  vW = w;
  vCol = aCol;
  vT = vec3(t, aDim.z, crack);
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
}
`,
  WO = `
#include <common>
${zf}
uniform float uTime;
varying vec2 vCell;
varying vec3 vN;
varying vec3 vW;
varying vec3 vCol;
varying vec3 vT;
void main() {
  // 到最近格心的六边形距离 d：格心 0，格边 0.5
  const vec2 s = vec2(1.0, 1.7320508);
  vec2 p = vCell;
  vec4 hc = floor(vec4(p, p - vec2(0.5, 1.0)) / s.xyxy) + 0.5;
  vec4 h = vec4(p - hc.xy * s, p - (hc.zw + 0.5) * s);
  vec2 q = abs(dot(h.xy, h.xy) < dot(h.zw, h.zw) ? h.xy : h.zw);
  float d = max(dot(q, s * 0.5), q.x);
  float t = vT.x;
  float crack = vT.z;
  // 格线：离格边 1.3 个像素以内(总宽两三个像素)；解除时线向格心收拢变粗
  float aa = fwidth(d) + 1e-4;
  float edge = 0.5 - d;
  float lw = aa * 1.0 + crack * 0.3;
  float line = 1.0 - smoothstep(lw, lw + aa, edge);
  // 填充：薄玻璃，靠近格边略浓
  float fill = 0.5 + 0.5 * smoothstep(0.1, 0.5, d);
  float fres = pow(1.0 - abs(dot(normalize(vN), normalize(cameraPosition - vW))), 1.6);
  // 扫光：自下而上，两秒一次
  float sweep = fract(uTime * 0.5);
  float band = exp(-pow((t - sweep) * 5.0, 2.0)) * smoothstep(0.0, 0.1, sweep) * (1.0 - smoothstep(0.85, 1.0, sweep));
  // 上下两端渐隐
  float fade = smoothstep(0.0, 0.07, t) * (1.0 - smoothstep(0.84, 1.0, t)) * vT.y * (1.0 - crack);
  float glow = (line * (0.3 + 0.8 * band + 0.4 * fres + 1.6 * crack) + fill * (0.035 + 0.16 * band + 0.1 * fres)) * fade;
  float alpha = (line * 0.3 + fill * 0.1) * fade;
  if (glow + alpha < 0.004) discard;
  // 填充的本色(预乘) + 叠加的发光
  gl_FragColor = vec4(vCol * alpha * 0.45 + kitAdditive(vCol * glow), alpha);
  ${aa}
}
`;

class jO {
  mesh;
  geo;
  posR;
  dim;
  col;
  capacity;
  count = 0;
  material;
  constructor(t = 16) {
    this.capacity = t;
    const e = new Cf(),
      s = [],
      i = [];
    for (let a = 0; a <= zp; a++) s.push(a / zp, 0, 0, a / zp, 1, 0);
    for (let a = 0; a < zp; a++) {
      const o = a * 2;
      i.push(o, o + 1, o + 2, o + 2, o + 1, o + 3);
    }
    (e.setAttribute("position", new Ae(s, 3)),
      e.setIndex(i),
      (this.posR = new Qs(new Float32Array(t * 4), 4)),
      (this.dim = new Qs(new Float32Array(t * 4), 4)),
      (this.col = new Qs(new Float32Array(t * 3), 3)));
    for (const a of [this.posR, this.dim, this.col]) a.setUsage(Pi);
    (e.setAttribute("aPosR", this.posR),
      e.setAttribute("aDim", this.dim),
      e.setAttribute("aCol", this.col),
      (e.instanceCount = 0),
      (this.geo = e),
      (this.material = new An({
        uniforms: { uTime: fs.uTime },
        vertexShader: VO,
        fragmentShader: WO,
        transparent: !0,
        depthWrite: !1,
        blending: Fh,
        blendSrc: Cr,
        blendDst: mo,
        blendSrcAlpha: Cr,
        blendDstAlpha: mo,
      })),
      (this.mesh = new Sn(e, this.material)),
      (this.mesh.name = "unit-shields"),
      (this.mesh.frustumCulled = !1),
      (this.mesh.matrixAutoUpdate = !1),
      (this.mesh.renderOrder = 5),
      (this.mesh.visible = !1));
  }
  begin() {
    this.count = 0;
  }
  push(t, e, s, i, a, o, r, l, c) {
    if (this.count >= this.capacity) return;
    const f = this.count++,
      d = this.posR.array;
    ((d[f * 4] = t), (d[f * 4 + 1] = e), (d[f * 4 + 2] = s), (d[f * 4 + 3] = i));
    const h = this.dim.array;
    ((h[f * 4] = a), (h[f * 4 + 1] = o), (h[f * 4 + 2] = l), (h[f * 4 + 3] = c));
    const u = this.col.array;
    ((u[f * 3] = r.r), (u[f * 3 + 1] = r.g), (u[f * 3 + 2] = r.b));
  }
  end() {
    ((this.geo.instanceCount = this.count),
      (this.mesh.visible = this.count > 0),
      this.count !== 0 &&
        ((this.posR.needsUpdate = !0), (this.dim.needsUpdate = !0), (this.col.needsUpdate = !0)));
  }
  dispose() {
    (this.geo.dispose(), this.material.dispose());
  }
}

const f0 = { hero: !1, minion: !1, monster: !1, tower: !0, core: !0 },
  qO = { hero: 1.32, minion: 1.28, monster: 1.17, tower: 1, core: 1 },
  Np = [3.05, 3.55],
  XO = { panyue: 1.07, chijin: 0.97, mushroom: 1.02 },
  n4 = 20,
  s4 = 0.16,
  YO = 0.25,
  KO = 0.85,
  ZO = 0.1,
  QO = 0.04,
  JO = new Ut(1, 1, 1),
  tB = 0.45,
  eB = {
    high: { shadow: 0.14, xray: 0.2 },
    medium: { shadow: 0.25, xray: 0.25 },
    low: { shadow: 0.25, xray: 0.25 },
  };

function nB(n) {
  switch (n.kind) {
    case "hero": {
      // 牛魔开大换成变身形态的模型（骨架一样，只是网格/贴图不同）
      const k =
        n.heroId === "niumo" && n.buffs && n.buffs.some((b) => b.id === "niumo_ult") ? "hero:niumo2" : Vx(n.heroId);
      // 场上可能同时有多个牛魔（玩家 + AI），钩子按单位 id 分开记，
      // 否则后渲染的那个会把前一个的值覆盖掉，测试读到的永远是 AI 的普通形态。
      n.heroId === "niumo" && ((globalThis.__niumoKey ??= {})[n.id] = k);
      return k;
    }
    case "minion":
      return DO(n.minionType);
    case "tower":
      return zO(n.tier, n.team);
    case "core":
      return NO(n.team);
    case "monster":
      return UO(n.monsterType);
  }
}

function sB(n) {
  switch (n.kind) {
    case "hero":
      return Md(n.radius, 2.2);
    case "minion":
      return Md(n.radius, n.minionType === "super" ? 2 : 1.2);
    case "tower":
      return Md(n.radius, 8);
    case "core":
      return Md(n.radius, 6);
    case "monster":
      return Md(n.radius, 1 + n.radius * 1.4);
  }
}

function iB(n) {
  if (n.kind === "core") return 1 / 0;
  if (n.kind === "hero") return 0;
  if (n.def.deathDur !== void 0) return n.def.deathDur;
  switch (n.kind) {
    case "minion":
      return 1.2;
    case "monster":
      return n.radius >= 1.8 ? 2.8 : 1.5;
    default:
      return 2.4;
  }
}

function aB(n) {
  return n.outline !== void 0 ? n.outline : n.key.startsWith("minion:") ? 1.2 : 1.5;
}

function oB(n) {
  return n.startsWith("hero:")
    ? 2
    : n === "minion:melee"
      ? 24
      : n.startsWith("minion:")
        ? 12
        : n.startsWith("tower:")
          ? 3
          : n.startsWith("monster:glimwing") || n.startsWith("monster:mossback")
            ? 4
            : 2;
}

const kd = new dt(),
  Sd = new dt(),
  Td = { x: 0, y: 0, z: 0 },
  Ed = { x: 0, y: 0, visible: !1 },
  i4 = { x: 0, y: 0, visible: !1 },
  rB = [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ];

function lB(n) {
  const t = new Ji();
  ((t.name = "unit-views"), n.layers.units.add(t));
  const e = new Map(),
    s = new Map(),
    i = [],
    a = new Map(),
    o = [],
    r = [],
    l = new GO(320),
    c = new jO(16),
    f = Math.hypot(as.x, as.z) || 1,
    d = -as.x / f,
    h = -as.z / f,
    u = Math.atan2(h, d);
  (t.add(l.mesh), t.add(c.mesh));
  let m = n.settings.name,
    x = m !== "low",
    p = n.settings.shadows,
    g = 0,
    y = 0,
    v = -1;
  const _ = [0, 0];
  let k = !1,
    M = !1,
    S = !1;
  const b = sh(),
    w = new dt();
  let T = -1 / 0,
    E = 1 / 0,
    A = -1 / 0,
    C = 1 / 0;
  const R = {
    blue: new Ut(Yt.blue.main),
    red: new Ut(Yt.red.main),
    neutral: new Ut(Yt.neutral.main),
    player: new Ut(Yt.player.main),
    shadow: new Ut(659488),
    redIron: new Ut(0.4, 0.2, 0.15),
    deadTint: new Ut(8949920),
    xSelf: new Ut(10354522),
    blessRing: new Ut(16764768),
    shield: [new Ut(5813503), new Ut(16738882)],
    xAlly: new Ut(5810943),
    xEnemy: new Ut(16734792),
    xNeutral: new Ut(15911008),
  };
  let I = n.frame.playerTeam;
  const P = (D) => (D === 0 ? R.blue : D === 1 ? R.red : R.neutral),
    F = new Map(),
    L = (D, Q) => {
      const $ = eB[m],
        ut = Math.max(0.001, D.scale);
      ((Q.outline = p2(D.geometry, 0)),
        (Q.shadow = p2(D.geometry, $.shadow / ut)),
        (Q.xray = p2(D.geometry, $.xray / ut)));
    },
    B = (D, Q) => {
      const $ = { outline: 1 / 0, shadow: 1 / 0, xray: 1 / 0 };
      (L(Q, $), F.set(D, { def: Q, range: $ }));
      const ut = (N, J, Z, ot) => {
        ot.setDrawRange(0, 1 / 0);
      };
      (D.outline &&
        ((D.outline.onBeforeRender = (N, J, Z, ot) => {
          ot.setDrawRange(0, $.outline);
        }),
        (D.outline.onAfterRender = ut)),
        D.xray &&
          ((D.xray.onBeforeRender = (N, J, Z, ot) => {
            ot.setDrawRange(0, $.xray);
          }),
          (D.xray.onAfterRender = ut)),
        (D.mesh.onBeforeShadow = (N, J, Z, ot, j) => {
          j.setDrawRange(0, $.shadow);
        }),
        (D.mesh.onAfterShadow = (N, J, Z, ot, j) => {
          j.setDrawRange(0, 1 / 0);
        }));
    },
    G = (D) => {
      let Q = a.get(D.key);
      if (!Q) {
        const $ = D.key.startsWith("hero:") || D.key.startsWith("minion:") || D.key.startsWith("monster:");
        ((Q = new ux(D.geometry, D.rig.count, oB(D.key), { outline: aB(D), xray: $, map: D.map }, D.key)),
          Q.setShadows(p),
          Q.setOutlineVisible(x),
          B(Q, D),
          Q.addTo(t),
          a.set(D.key, Q),
          o.push(Q));
      }
      return Q;
    },
    q = (D, Q) => {
      const $ = nB(D),
        ut = Zw($) ? qc($) : sB(D),
        N = (D.id * 0.618034) % 1,
        J = sh();
      (J.team.copy(P(D.team)), D.kind === "minion" && D.team === 1 && J.body.copy(R.redIron));
      let Z = qO[D.kind];
      if (D.kind === "hero") {
        const j = ut.height * ut.scale * Z;
        Z *= (j > Np[1] ? Np[1] / j : j < Np[0] ? Np[0] / j : 1) * (XO[D.heroId] ?? 1);
      }
      const ot = {
        id: D.id,
        kind: D.kind,
        team: D.team,
        def: ut,
        puppet: new of(ut, N),
        batch: G(ut),
        look: J,
        seen: !0,
        isPlayer: D.id === Q.playerId,
        alive: !0,
        x: D.pos.x,
        y: 0,
        z: D.pos.y,
        lift: 0,
        yaw: 0,
        hasYaw: !1,
        opacity: 0,
        targetOpacity: 1,
        flash: 0,
        flashBoost: 0,
        flashStart: -999,
        flashSeen: D.lastHitTime,
        sx: D.pos.x,
        sz: D.pos.y,
        stride: N,
        speed: 0,
        variant: 0,
        lastStart: D.animStart,
        lastAnim: D.anim,
        dying: -1,
        deathDur: 0,
        scale: Z,
        culled: !1,
        fresh: !0,
        pop: !k,
        radius: Math.max(D.radius, ut.radius * ut.scale * Z),
        height: ut.height * ut.scale * Z,
        hp: 1,
        ring: D.kind === "hero" ? (D.id === Q.playerId ? BO : OO) : D.kind === "minion" ? e4 : -1,
        tintAmount: 0,
        tintColor: new Ut(1, 1, 1),
        pulseColor: new Ut(1, 1, 1),
        pulseAmount: 0,
        pulseDur: 0,
        pulseLeft: 0,
        rimDur: 0,
        rimLeft: 0,
        spawnT: k && D.kind === "monster" && (ut.spawnDur ?? 0) > 0 && D.alive ? 0 : -1,
        hitT: 99,
        mode: 0,
        special: !1,
        shield: f0[D.kind] && D.invulnerable && D.alive ? 1 : 0,
        shieldBreak: -1,
        windup: D.kind === "hero" ? Se[D.heroId].basicAttack.windup : f0[D.kind] ? 0.3 : 0.35,
      };
      return ((ot.deathDur = iB(ot)), ot);
    },
    et = (D, Q, $, ut) => {
      const N = FO($);
      if (!Zw(N)) return;
      const J = qc(N),
        Z = new of(J, (((D * 12.9898 + Q * 78.233) % 1) + 1) % 1),
        ot = sh();
      (ot.team.copy(P($)), r.push({ puppet: Z, batch: G(J), look: ot, x: D, z: Q, age: ut }));
    },
    ct = (D) => {
      for (const Q of D.map.towers) {
        let $ = !1;
        for (const ut of D.units)
          if (
            ut.kind === "tower" &&
            Math.abs(ut.pos.x - Q.pos.x) < 0.5 &&
            Math.abs(ut.pos.y - Q.pos.y) < 0.5
          ) {
            $ = !0;
            break;
          }
        $ || et(Q.pos.x, Q.pos.y, Q.team, 10);
      }
    };
  ct(n.frame.state);
  const rt = () => {
      (e.clear(), (i.length = 0), (r.length = 0), (k = !1), (M = !0));
    },
    mt = () => {
      const D = n.camera;
      Sd.setFromMatrixPosition(D.matrixWorld);
      let Q = 1 / 0,
        $ = -1 / 0,
        ut = 1 / 0,
        N = -1 / 0;
      for (const [J, Z] of rB) {
        if ((kd.set(J, Z, 0.5).unproject(D).sub(Sd), kd.y > -1e-4)) {
          ((T = A = -1 / 0), (E = C = 1 / 0));
          return;
        }
        const ot = -Sd.y / kd.y,
          j = Sd.x + kd.x * ot,
          at = Sd.z + kd.z * ot;
        (j < Q && (Q = j), j > $ && ($ = j), at < ut && (ut = at), at > N && (N = at));
      }
      ((T = Q), (E = $), (A = ut), (C = N));
    },
    nt = (D, Q, $, ut) => {
      const N = $ + 1.5;
      return D > T - N - ut * 0.9 && D < E + N && Q > A - N && Q < C + N + ut * 1.3;
    },
    H = (D, Q, $) => {
      const ut = $.state,
        N = $.alpha;
      ((D.seen = !0), (D.isPlayer = Q.id === ut.playerId));
      const J = Q.prevPos.x + (Q.pos.x - Q.prevPos.x) * N,
        Z = Q.prevPos.y + (Q.pos.y - Q.prevPos.y) * N,
        ot = D.alive;
      ((D.alive = Q.alive),
        (D.x = J),
        (D.z = Z),
        (D.y = f0[Q.kind] ? 0 : n.terrain.heightAt(J, Z) * 0.6),
        (D.hp = Q.stats.maxHp > 0 ? Q.hp / Q.stats.maxHp : 1),
        Q.alive && !ot && ((D.fresh = !0), (D.opacity = 0)));
      const j = f0[Q.kind] ? 0 : Math.PI / 2 - Q.facing;
      if (!D.hasYaw || D.fresh) ((D.yaw = j), (D.hasYaw = !0));
      else {
        let ft = j - D.yaw;
        ft -= Math.round(ft / (Math.PI * 2)) * Math.PI * 2;
        const _t = Q.kind === "hero" ? 18 : Q.kind === "minion" ? 12 : 9;
        D.yaw += ft * (1 - Math.exp(-_t * $.dt));
      }
      const Rt = Q.team === $.playerTeam || f0[Q.kind] || Q.kind === "monster" || Q.visible[$.playerTeam];
      let kt = Rt ? 1 : 0;
      if (Rt) {
        Q.bushId >= 0 && (kt = 0.62);
        for (let ft = 0; ft < Q.buffs.length; ft++)
          if (Q.buffs[ft].id === "untargetable") {
            kt = Math.min(kt, 0.42);
            break;
          }
      }
      const V = ut.time - (1 - N) * xo;
      if (Q.kind === "hero" && !Q.alive) {
        const ft = V - Q.animStart;
        kt = Math.min(kt, ft < 2.2 ? 1 : 0);
      }
      D.targetOpacity = kt;
      const U = V - Q.lastHitTime;
      Q.lastHitTime !== D.flashSeen &&
        ((D.flashSeen = Q.lastHitTime),
        (Q.lastHitTime - D.flashStart >= YO || Q.lastHitTime < D.flashStart) &&
          (D.flashStart = Q.lastHitTime));
      const ht = V - D.flashStart,
        lt = ht >= 0 && ht < s4 && Q.alive ? (1 - ht / s4) ** 2 : 0;
      ((D.flashBoost = lt * KO),
        (D.flash = lt * (f0[Q.kind] || (Q.kind === "monster" && Q.radius >= 1.2) ? QO : ZO)));
      const O = D.puppet.input,
        Y = Q.anim === "attack" && (Q.animStart !== D.lastStart || D.lastAnim !== "attack");
      (Y && (D.variant++, (D.special = !1)),
        (D.lastStart = Q.animStart),
        (D.lastAnim = Q.anim),
        (O.anim = Q.anim));
      const gt = Math.max(0, V - Q.animStart);
      if (
        ((O.t = gt),
        (O.p = Q.animDur > 0 ? Math.min(1, gt / Q.animDur) : 0),
        (O.hp = D.hp),
        (O.windup = D.windup),
        (O.deathT = -1),
        (O.variant = D.variant),
        (O.team = D.team),
        (O.mode = 0),
        (D.hitT = U >= 0 ? U : 99),
        (O.hitT = D.hitT),
        D.spawnT >= 0)
      ) {
        const ft = D.def.spawnDur ?? 0;
        (D.spawnT >= ft || U < D.spawnT || !Q.alive) && (D.spawnT = -1);
      }
      if (
        ((O.spawnT = D.spawnT),
        Q.kind === "monster"
          ? (Y && (D.special = D.variant % 3 === 0),
            D.special && Q.anim === "attack" && (O.mode |= 1),
            Q.targetId >= 0 && (O.mode |= 2))
          : (Q.kind === "tower" || Q.kind === "core") &&
            (Q.invulnerable && (O.mode |= 1),
            Q.targetId >= 0 && e.get(Q.targetId)?.kind === "hero" && (O.mode |= 2),
            Q.invulnerable && Q.alive
              ? ((D.shield = Math.min(1, D.shield + $.dt * 2.5)), (D.shieldBreak = -1))
              : D.shield > 0 &&
                ((D.shieldBreak = Math.max(0, D.shieldBreak) + $.dt / tB),
                D.shieldBreak >= 1 && ((D.shield = 0), (D.shieldBreak = -1)))),
        Q.kind === "hero")
      ) {
        for (let ft = 0; ft < Q.buffs.length; ft++) {
          const _t = Q.buffs[ft];
          Y &&
          ((_t.id === "panyue_passive" && _t.stacks >= 2) ||
            _t.id === "fengling_crit" ||
            _t.id === "chijin_ember")
            ? (D.special = !0)
            : _t.id === "panyue_bulwark" && (O.mode |= 2);
        }
        D.special && Q.anim === "attack" && (O.mode |= 1);
      }
      ((D.mode = O.mode),
        Q.anim === "leap"
          ? (D.lift = 4 * 3.4 * O.p * (1 - O.p))
          : Q.anim === "airborne"
            ? (D.lift = 4 * Math.min(2.2, Math.max(0.8, Q.animDur * 1.7)) * O.p * (1 - O.p))
            : (D.lift = 0));
    },
    st = (D) => {
      ((D.dying = 0), (D.alive = !1), D.kind === "tower" && D.team !== 2 && et(D.x, D.z, D.team, 0));
    },
    tt = (D, Q) => {
      const $ = Q.dt,
        ut = D.targetOpacity - D.opacity;
      (D.pop ? (D.opacity = D.targetOpacity) : (D.opacity += ut * (1 - Math.exp(-(ut > 0 ? 9 : 6) * $))),
        (D.pop = !1),
        Math.abs(D.targetOpacity - D.opacity) < 0.01 && (D.opacity = D.targetOpacity));
      const N = D.x - D.sx,
        J = D.z - D.sz,
        Z = Math.hypot(N, J);
      if (
        ((D.sx = D.x),
        (D.sz = D.z),
        Z < 3 &&
          $ > 0 &&
          ((D.stride = (D.stride + Z / (D.def.stride * D.scale)) % 1),
          (D.speed += (Z / $ - D.speed) * Math.min(1, $ * 12))),
        D.spawnT >= 0 && (D.spawnT += $),
        D.opacity <= 0.01 || !nt(D.x, D.z, D.radius, D.height + D.lift))
      ) {
        ((D.culled = !0), (D.fresh = !1));
        return;
      }
      const ot = D.puppet.input;
      ((ot.time = g),
        (ot.stride = D.stride),
        (ot.speed = D.speed),
        D.dying >= 0 &&
          ((ot.anim = "dead"),
          (ot.t = D.dying),
          (ot.p = Number.isFinite(D.deathDur) ? Math.min(1, D.dying / D.deathDur) : Math.min(1, D.dying / 3)),
          (ot.deathT = D.dying),
          (ot.hp = 0),
          (ot.spawnT = -1),
          (ot.hitT = 99)),
        (D.culled || D.fresh) && D.puppet.snap(),
        (D.culled = !1),
        (D.fresh = !1),
        D.puppet.update(
          D.lastStart + D.mode * 1e-4 + (ot.spawnT >= 0 ? 5e-4 : 0),
          $,
          D.x,
          D.y + D.lift,
          D.z,
          D.yaw,
          D.scale,
        ));
      const j = D.look,
        at = D.puppet.output;
      ((j.opacity = D.opacity), (j.flash = D.flash), (j.glow = at.glow));
      const Rt = 1 + D.flashBoost;
      (j.body.copy(D.kind === "minion" && D.team === 1 ? R.redIron : JO).multiplyScalar(Rt),
        j.team.copy(P(D.team)).multiplyScalar(Rt));
      let kt = D.tintAmount,
        V = D.tintColor;
      if (D.pulseLeft > 0) {
        D.pulseLeft -= $;
        const lt = D.pulseLeft > 0 ? D.pulseAmount * (D.pulseLeft / D.pulseDur) : 0;
        lt > kt && ((kt = lt), (V = D.pulseColor));
      }
      at.tint > kt
        ? (j.tint.setHex(at.tintColor), (j.tintAmount = at.tint))
        : (j.tint.copy(V), (j.tintAmount = kt));
      let U = 0;
      const ht =
        D.alive && D.dying < 0 && D.team !== 2 && (D.kind === "hero" || D.kind === "minion") ? _[D.team] : 0;
      if (
        (ht > 0 &&
          ((U = ht < 5 ? 0.3 + 0.22 * Math.cos(g * 9) : 0.52), D.kind === "minion" && (j.glow *= 1.3)),
        D.rimLeft > 0 &&
          ((D.rimLeft -= $), D.rimLeft > 0 && (U = Math.max(U, Math.min(1, (D.rimLeft / D.rimDur) * 3)))),
        (j.rim = U),
        (j.xrayAmount = D.alive && D.dying < 0 && D.spawnT < 0 ? 1 : 0),
        j.xray.copy(D.isPlayer ? R.xSelf : D.team === 2 ? R.xNeutral : D.team === I ? R.xAlly : R.xEnemy),
        D.dying >= 0 && Number.isFinite(D.deathDur))
      ) {
        const lt = D.deathDur - D.dying;
        lt < 0.4 && (j.opacity = Math.max(0, D.opacity * (lt / 0.4)));
      }
      if ((D.batch.push(D.puppet.skeleton, j), y++, D.shield > 0 && D.team !== 2 && D.dying < 0)) {
        const lt = Math.max(0, D.shieldBreak);
        D.kind === "core"
          ? c.push(D.x, 0.95, D.z, 3.05, 5.4, 16, R.shield[D.team], D.shield * D.opacity, lt)
          : c.push(
              D.x,
              0.36,
              D.z,
              D.height > 9.2 ? 2.1 : 1.9,
              D.height - 3.3,
              12,
              R.shield[D.team],
              D.shield * D.opacity,
              lt,
            );
      }
      if (!f0[D.kind] && D.dying < 0) {
        const O = n.terrain.inWater(D.x, D.z) ? n.terrain.waterLevel + 0.03 : D.y / 0.6 + 0.05,
          Y = D.opacity * (p ? 1 : 1.4),
          gt = 1 / (1 + D.lift * 0.35),
          ft = D.radius * 0.25 + D.lift * 0.5;
        if (
          (l.push(D.x, O, D.z, D.radius * 0.62 * gt, R.shadow, 0.45 * Y * gt, t4),
          l.push(D.x + d * ft, O, D.z + h * ft, D.radius * 1.5 * gt, R.shadow, 0.3 * Y * gt, t4, u, 1.45),
          D.ring >= 0 && D.alive)
        ) {
          const _t = D.isPlayer ? R.player : P(D.team);
          (l.push(
            D.x,
            O + 0.01,
            D.z,
            D.radius * (D.kind === "hero" ? 1.3 : 1.15),
            _t,
            (D.kind === "hero" ? 0.85 : 0.6) * Y,
            D.ring,
            Math.PI / 2 - D.yaw,
          ),
            ht > 0 &&
              D.kind === "minion" &&
              l.push(
                D.x,
                O + 0.012,
                D.z,
                D.radius * 1.34,
                R.blessRing,
                (ht < 5 ? 0.35 + 0.25 * Math.cos(g * 9) : 0.6) * Y,
                e4,
              ));
        }
      }
    },
    it = {
      name: "units",
      get instanceCount() {
        return y;
      },
      update(D) {
        const Q = D.state;
        ((g += D.dt),
          (I = D.playerTeam),
          (_[0] = Q.teams[0].blessingLeft),
          (_[1] = Q.teams[1].blessingLeft),
          Q.time < v - 0.5 && rt(),
          (v = Q.time),
          M && ((M = !1), ct(Q)),
          mt());
        for (let ut = 0; ut < i.length; ut++) i[ut].seen = !1;
        s.clear();
        const $ = Q.units;
        for (let ut = 0; ut < $.length; ut++) {
          const N = $[ut];
          s.set(N.id, N);
          let J = e.get(N.id);
          // 形态变了（牛魔开大/变身结束）就把视图拆掉重建，否则会一直用旧网格
          if (J && J.def && J.def.key !== nB(N)) {
            const oi = i.indexOf(J);
            oi >= 0 && i.splice(oi, 1);
            (e.delete(N.id), (J = void 0));
          }
          (J ? J.dying >= 0 && ((J.dying = -1), (J.fresh = !0)) : ((J = q(N, Q)), e.set(N.id, J), i.push(J)),
            H(J, N, D));
        }
        k = !0;
        for (let ut = 0; ut < o.length; ut++) o[ut].begin();
        (l.begin(), c.begin(), (y = 0));
        for (let ut = i.length - 1; ut >= 0; ut--) {
          const N = i[ut];
          if (!N.seen) {
            if (N.dying < 0) {
              if (N.kind === "hero" || N.deathDur <= 0) {
                (e.delete(N.id), i.splice(ut, 1));
                continue;
              }
              st(N);
            }
            if (((N.dying += D.dt), (N.flash = 0), (N.flashBoost = 0), N.dying >= N.deathDur)) {
              (e.delete(N.id), i.splice(ut, 1));
              continue;
            }
          }
          tt(N, D);
        }
        for (let ut = 0; ut < r.length; ut++) {
          const N = r[ut];
          if (((N.age += D.dt), !nt(N.x, N.z, 3, 3))) continue;
          const J = N.puppet.input;
          ((J.anim = "idle"),
            (J.time = g),
            (J.t = N.age),
            (J.p = Math.min(1, N.age / 1.2)),
            N.puppet.update(0, D.dt, N.x, 0, N.z, 0, 1),
            (N.look.glow = N.puppet.output.glow),
            N.batch.push(N.puppet.skeleton, N.look),
            y++);
        }
        if (S) {
          n.rig.getFocus(w);
          for (const ut of Qw()) {
            const N = qc(ut),
              J = G(N);
            if (J.count > 0) continue;
            const Z = new of(N, 0);
            (Z.update(0, 0, w.x, 0, w.z, 0, 1), J.push(Z.skeleton, b));
          }
          c.push(w.x, 0.36, w.z, 1.9, 4, 12, R.shield[0], 1, 0);
        }
        for (let ut = 0; ut < o.length; ut++) o[ut].end();
        (l.end(), c.end());
      },
      prewarm() {
        for (const D of Qw()) G(qc(D));
        return (
          (S = !0),
          () => {
            S = !1;
          }
        );
      },
      setQuality(D) {
        ((m = D.name), (x = D.name !== "low"), (p = D.shadows));
        for (const Q of o) {
          (Q.setShadows(p), Q.setOutlineVisible(x));
          const $ = F.get(Q);
          $ && L($.def, $.range);
        }
      },
      pickUnit(D, Q, $) {
        let ut = -1,
          N = 1 / 0;
        for (let J = 0; J < i.length; J++) {
          const Z = i[J];
          if (!Z.seen || !Z.alive || Z.id === $.playerId || Z.opacity < 0.3 || Z.culled) continue;
          const ot = Math.min(1.6, Z.height * 0.45);
          if ((n.worldToScreen(Z.x, Z.y + Z.lift + ot, Z.z, Ed), !Ed.visible)) continue;
          n.worldToScreen(Z.x + Z.radius + 0.3, Z.y + Z.lift + ot, Z.z, i4);
          const j = Math.max(24, Math.abs(i4.x - Ed.x) * 1.2),
            at = Math.max(j, j * Math.min(2.2, Z.height / (Z.radius * 2.6 + 0.4))),
            Rt = Ed.x - D,
            kt = Ed.y - Q,
            V = Z.team !== I;
          let U = (Rt / j) ** 2 + (kt / at) ** 2;
          if (U > 1) {
            if (!V) continue;
            const lt = (Rt / (j + n4)) ** 2 + (kt / (at + n4)) ** 2;
            if (lt > 1) continue;
            U = 2 + lt;
          }
          let ht = V ? (Z.kind === "hero" ? 0.5 : 0.8) : 1.6;
          (V && f0[Z.kind] && s.get(Z.id)?.invulnerable && (ht = 1.5),
            U * ht < N && ((N = U * ht), (ut = Z.id)));
        }
        return ut;
      },
      getInfo(D, Q) {
        const $ = e.get(D);
        return $
          ? ((Q.id = D),
            (Q.kind = $.kind),
            (Q.x = $.x),
            (Q.y = $.y + $.lift),
            (Q.z = $.z),
            (Q.height = $.height),
            (Q.radius = $.radius),
            (Q.opacity = $.opacity),
            (Q.facing = Math.PI / 2 - $.yaw),
            (Q.alive = $.dying < 0 && $.alive),
            (Q.variant = $.variant),
            (Q.spawning = $.spawnT >= 0 && $.dying < 0),
            !0)
          : !1;
      },
      getAttach(D, Q, $) {
        const ut = e.get(D);
        return ut
          ? (!ut.culled && (ut.puppet.attach(Q, Td) || ut.puppet.attach("chest", Td))
              ? $.set(Td.x, Td.y, Td.z)
              : $.set(ut.x, ut.y + ut.lift + ut.height * 0.6, ut.z),
            !0)
          : !1;
      },
      setTint(D, Q, $) {
        const ut = e.get(D);
        ut && (ut.tintColor.set(Q), (ut.tintAmount = $));
      },
      flashTint(D, Q, $, ut) {
        const N = e.get(D);
        !N || !(ut > 0) || (N.pulseColor.set(Q), (N.pulseAmount = $), (N.pulseDur = ut), (N.pulseLeft = ut));
      },
      flashRim(D, Q) {
        const $ = e.get(D);
        !$ || !(Q > 0) || (($.rimDur = Q), ($.rimLeft = Q));
      },
      reset() {
        (rt(), (v = -1));
      },
      dispose() {
        n.layers.units.remove(t);
        for (const D of o) D.dispose();
        (F.clear(),
          l.dispose(),
          c.dispose(),
          e.clear(),
          s.clear(),
          (i.length = 0),
          (r.length = 0),
          a.clear(),
          (o.length = 0));
      },
    };
  return (
    n.setUnitQuery({
      getPosition(D, Q) {
        const $ = e.get(D);
        return $ ? (Q.set($.x, $.y + $.lift, $.z), !0) : !1;
      },
      getHeight(D) {
        const Q = e.get(D);
        return Q ? Q.height : 2;
      },
    }),
    it
  );
}

const cB = {
    panyue: { cast_s1: ["dash", 0.7], cast_s2: ["cast_s2", 1.1], cast_ult: ["leap", 1] },
    chijin: { cast_s1: ["cast_s1", 0.9], cast_s2: ["dash", 0.55], cast_ult: ["spin", 1.7] },
    xingli: { cast_s1: ["cast_s1", 0.9], cast_s2: ["cast_s2", 1], cast_ult: ["cast_ult", 1.5] },
    fengling: { cast_s1: ["cast_s1", 1], cast_s2: ["dash", 0.5], cast_ult: ["cast_ult", 1.2] },
    yeque: { cast_s1: ["dash", 0.45], cast_s2: ["cast_s2", 0.8], cast_ult: ["cast_ult", 1] },
    mushroom: { cast_s1: ["spin", 1.6], cast_s2: ["cast_s2", 0.9], cast_ult: ["cast_ult", 1.2] },
    niumo: { cast_s1: ["cast_s1", 0.9], cast_s2: ["dash", 2], cast_ult: ["cast_ult", 1.2] },
  },
  Ac = { side: 0.07, top: 0.06, bottom: 0.12 },
  a4 = { top: 3.2, halfW: 1.2 },
  fB = {
    panyue: { drop: 0.3, dist: 3.8, yaw: -14, x: 0.06, anim: "channel" },
    chijin: { drop: 0.26, dist: 3, yaw: -12, x: -0.08 },
    xingli: { drop: 0.26, dist: 2.75, yaw: -18, x: 0.04 },
    fengling: { drop: 0.24, dist: 2.75, yaw: 26, x: 0.06, anim: "channel" },
    yeque: { drop: 0.24, dist: 2.7, yaw: -22, x: 0, anim: "attack", p: 0.17, variant: 0 },
    mushroom: { drop: 0.12, dist: 3.2, yaw: 0, x: 0 },
    niumo: { drop: 0.24, dist: 3, yaw: -12, x: -0.06 },
  },
  o4 = new Map(),
  r4 = new Float32Array(512);

function dB(n, t, e) {
  const s = n.rig.count,
    i = s * 8 <= r4.length ? r4 : new Float32Array(s * 8);
  t.skeleton.pack(i, 0);
  const a = n.geometry.attributes.position,
    o = n.geometry.attributes.aSkin,
    r = a.array,
    l = o.array,
    c = [0, 0, 0],
    f = [0, 0, 0],
    d = (h, u, m, x, p) => {
      const g = h * 8,
        y = i[g + 4],
        v = i[g + 5],
        _ = i[g + 6],
        k = i[g + 7],
        M = v * x - _ * m + k * u,
        S = _ * u - y * x + k * m,
        b = y * m - v * u + k * x,
        w = i[g + 3];
      ((p[0] = i[g] + w * (u + 2 * (v * b - _ * S))),
        (p[1] = i[g + 1] + w * (m + 2 * (_ * M - y * b))),
        (p[2] = i[g + 2] + w * (x + 2 * (y * S - v * M))));
    };
  for (let h = 0; h < a.count; h += 3) {
    const u = r[h * 3],
      m = r[h * 3 + 1],
      x = r[h * 3 + 2];
    d(l[h * 3], u, m, x, f);
    const p = l[h * 3 + 2];
    (p < 0.999 &&
      (d(l[h * 3 + 1], u, m, x, c),
      (f[0] = c[0] + (f[0] - c[0]) * p),
      (f[1] = c[1] + (f[1] - c[1]) * p),
      (f[2] = c[2] + (f[2] - c[2]) * p)),
      f[0] < e.minX && (e.minX = f[0]),
      f[0] > e.maxX && (e.maxX = f[0]),
      f[1] < e.minY && (e.minY = f[1]),
      f[1] > e.maxY && (e.maxY = f[1]),
      f[2] > e.maxZ && (e.maxZ = f[2]));
  }
}

const v3 = {
    panyue: [-0.44, 0.44],
    chijin: [-0.38, 0.44],
    niumo: [-0.42, 0.44],
    xingli: [0.25, 0.8],
    fengling: [0.25, 0.8],
    yeque: [0.25, 0.8],
    mushroom: [0, 0],
  },
  hB = 48;

function uB(n, t) {
  const e = o4.get(n);
  if (e) return e;
  const s = { minX: 1 / 0, maxX: -1 / 0, minY: 0, maxY: -1 / 0, maxZ: -1 / 0 },
    i = { minX: 1 / 0, maxX: -1 / 0, minY: 0, maxY: -1 / 0, maxZ: -1 / 0 },
    a = new of(t, 0.37),
    o = a.input;
  o.windup = 0.35;
  const r = (h, u, m, x, p) => {
      ((o.anim = h),
        (o.p = u),
        (o.t = h === "idle" ? 1.3 : u * 0.8),
        (o.time = 1.3),
        (o.variant = m),
        a.snap(),
        a.update(0, 0, 0, 0, 0, x, 1),
        a.settle(),
        dB(t, a, p));
    },
    [l, c] = v3[n] || v3.chijin;
  for (let h = 0; h <= 8; h++) r("idle", 0, 0, l + c * Math.sin(((h / 8) * 2 - 1) * Math.PI * 0.5), s);
  for (const h of [0, 1])
    for (const u of [0.2, 0.35, 0.5]) for (const m of [l - c, l, l + c]) r("attack", u, h, m, i);
  const f = (s.maxX - s.minX) * 0.25,
    d = {
      minX: Math.min(s.minX, Math.max(i.minX, s.minX - f)),
      maxX: Math.max(s.maxX, Math.min(i.maxX, s.maxX + f)),
      minY: 0,
      maxY: Math.max(s.maxY, Math.min(i.maxY, s.maxY * 1.12)),
      maxZ: s.maxZ,
    };
  return (o4.set(n, d), d);
}

function I8(n) {
  const t = new wM(),
    e = new Yi(28, 1, 0.3, 80),
    s = new DM(Yt.env.sun, 2.9);
  if ((s.position.set(-3.2, 6.5, 5.5), n)) {
    ((s.castShadow = !0), s.shadow.mapSize.set(1024, 1024));
    const a = s.shadow.camera;
    ((a.left = a.bottom = -4.5),
      (a.right = a.top = 4.5),
      (a.near = 1),
      (a.far = 24),
      (s.shadow.bias = -6e-4),
      (s.shadow.normalBias = 0.04));
  }
  (t.add(s, s.target), t.add(new LM(14674175, 7170176, 1.9)));
  const i = new PM(16777215, 26, 14, 1.4);
  return (i.position.set(2.6, 3.4, -3.4), t.add(i), { scene: t, camera: e, key: s, rim: i });
}

function P8(n) {
  ((n.outputColorSpace = ri), (n.toneMapping = sM), (n.toneMappingExposure = 1.2), n.setClearColor(0, 0));
}

function pB(n, t) {
  const e = new Ls();
  ((e.crease = 30),
    e.paint(1317946, { c2: 2898544 }),
    e.lathe(
      [
        [-0.36, t * 0.84],
        [-0.16, t * 1],
        [-0.08, t * 1],
        [-0.06, t * 0.95],
        [0, t * 0.93],
      ],
      { seg: 24 },
    ),
    e.paint(14198856, { gloss: 1 }),
    e.lathe(
      [
        [-0.125, t * 1.015],
        [-0.085, t * 1.015],
        [-0.08, t * 0.97],
      ],
      { seg: 24, cap0: !1, cap1: !1 },
    ),
    e.g(pt(0, 0.002, 0), () => e.torus(t * 0.66, 0.018, 0.01, 32, 4, { crease: 30 })));
  const s = [n.r, n.g, n.b];
  (e.paint(s, { glow: 0.5 }),
    e.g(pt(0, 0.004, 0), () => e.torus(t * 0.8, 0.03, 0.01, 40, 4, { crease: 30 })));
  const i = [];
  for (let a = 0; a < 16; a++) {
    const o = (a / 16) * Math.PI * 2,
      r = (a % 2 === 0 ? 0.56 : 0.3) * t;
    i.push([Math.cos(o) * r, Math.sin(o) * r]);
  }
  return (
    e.paint([s[0] * 0.5, s[1] * 0.5, s[2] * 0.5], { glow: 0.12 }),
    e.g(pt(0, 0.004, 0, -90, 0, 0), () => e.extrude(i, 0.006, 0)),
    e.build()
  );
}

function D8(n, t, e, s, i) {
  const a = Se[s];
  if (i) {
    const l = n.createLinearGradient(0, 0, 0, e);
    (l.addColorStop(0, a.palette.secondary),
      l.addColorStop(1, "#0b1020"),
      (n.fillStyle = l),
      n.fillRect(0, 0, t, e));
  } else n.clearRect(0, 0, t, e);
  const o = t / 2,
    r = Math.min(t, e);
  ((n.fillStyle = a.palette.primary),
    n.beginPath(),
    n.ellipse(o, e * (i ? 0.98 : 0.9), r * 0.36, r * 0.34, 0, Math.PI, 0),
    n.fill(),
    (n.fillStyle = a.palette.accent),
    n.beginPath(),
    n.arc(o, e * (i ? 0.46 : 0.42), r * 0.17, 0, Math.PI * 2),
    n.fill(),
    (n.fillStyle = a.palette.glow),
    (n.font = `bold ${Math.round(r * 0.2)}px "PingFang SC","Microsoft YaHei",sans-serif`),
    (n.textAlign = "center"),
    (n.textBaseline = "middle"),
    n.fillText(a.name.slice(0, 1), o, e * (i ? 0.47 : 0.43)));
}

function mB(n, t) {
  let e = t;
  const s = () => {
    const i = Math.max(1, n.clientWidth || n.width),
      a = Math.max(1, n.clientHeight || n.height);
    (n.width !== i && (n.width = i), n.height !== a && (n.height = a));
    const o = n.getContext("2d");
    o && D8(o, i, a, e, !1);
  };
  return (
    s(),
    {
      setHero(i) {
        ((e = i), s());
      },
      play() {},
      resize: s,
      dispose() {},
    }
  );
}
export { of, qc, Vx, lB, cB, Ac, a4, fB, v3, hB, uB, I8, P8, pB, D8, mB };
