// 27-core-6.js — core｜12 个顶层语句｜54KB
// 对应 game.pretty.js 第 53467–55300 行
// 关键内容：
//   CU                    bowUp
//   PU                    leap
//   zU                    shield
//   UU                    dead
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { A8, Am, Em, En, Fi, Gh, K, Mf, P0, Rm, S0, Tm, Un, Vh, Wh, Yo, bt, ge, he, hi, ho, jh, jl, ma, pt, ta, zs } from './25-render-9.js';
import { Bl, Bx, Cm, Js, Ko, Li, Ls, Ox, RU, Ra, Wd, Xh, Zi, af, jt, pw, qh, uw } from './26-core-5.js';

function CU() {
  const n = Gh(RU),
    { rig: t, J: e, d: s } = n,
    i = new Ls(),
    a = s.shoulderX,
    o = s.handY,
    r = 0.95,
    l = t.add("bowUp", e.propL, a, o, 0.12),
    c = t.add("bowDn", e.propL, a, o, -0.12),
    f = t.add("nock", e.propL, a, o + Ra.string, 0),
    d = t.add("arrow", f, a, o + Ra.string, 0),
    h = (b) => [
      [b * 0.13, 1.36, -0.19],
      [b * 0.19, 1.14, -0.28],
      [b * 0.22, 0.92, -0.33],
      [b * 0.24, 0.7, -0.36],
    ],
    u = t.addChain("capeL", e.chest, h(1).slice(0, 3)),
    m = t.addChain("capeR", e.chest, h(-1).slice(0, 3));
  for (const b of [u, m])
    t.chain({
      joints: b,
      tip: [0, -0.22, -0.03],
      stiffness: 4,
      drag: 0.91,
      gravity: 8,
      maxAngle: 70,
      wind: 2.4,
      colliders: [
        { joint: e.hips, x: 0, y: -0.02, z: 0, r: 0.26 },
        { joint: e.chest, x: 0, y: 0, z: 0, r: 0.22 },
      ],
    });
  const x = (b, w) => {
    const T = b >= 0 ? e.thighL : e.thighR;
    return w >= 0.9 ? [e.hips, e.hips, 1] : [e.hips, T, hi((w - 0.52) / 0.38)];
  };
  i.sym((b) => {
    const w = s.hipX;
    (i
      .bone(b > 0 ? e.thighL : e.thighR)
      .paint(jt.pants, { c2: jt.pantsDark, ao: 0.88, ao2: 1, mat: K.cloth }),
      i.limb([w, s.hipY + 0.04, 0], [w, s.kneeY, 0], 0.112, 0.086, { seg: 8, bulge: 0.04 }));
  });
  for (const b of [1, -1]) {
    (i.paint(jt.leatherDark, { c2: jt.leather, gloss: 0.25, mat: K.leather }),
      Ox(i, n, b, { top: 0.3, rTop: 0.088, rAnkle: 0.074, len: 0.23, toe: 0.02 }));
    const w = b > 0 ? e.shinL : e.shinR;
    (i.bone(w).paint(jt.wrap, { c2: jt.wrapDark, mat: K.cloth }),
      i.lathe(
        [
          [0.28, 0.084, 0.084, b * s.hipX, 0],
          [0.33, 0.088, 0.088, b * s.hipX, 0],
          [0.43, 0.09, 0.09, b * s.hipX, 0],
          [0.46, 0.084, 0.084, b * s.hipX, 0],
        ],
        { seg: 8 },
      ),
      i.paint(jt.leatherDark, { c2: jt.leather, mat: K.leather }),
      i.g(pt(b * s.hipX, 0.37, 0, 12, 0, 0), () => i.torus(0.091, 0.008, 0.011, 8, 3, { crease: 30 })));
  }
  {
    const b = [
        [0.5, 0.2, 0.19, 0, 0],
        [0.62, 0.195, 0.18, 0, 0],
        [0.78, 0.18, 0.16, 0, 0],
        [0.92, 0.17, 0.14, 0, 0],
      ],
      w = (T, E) => 1 + (E < 2 ? 0.03 * Math.sin(T * 6) : 0);
    (i
      .bind(x)
      .paint(jt.robe, { c2: jt.robeDark, ao: 0.9, ao2: 1, mat: K.cloth, by: (T, E) => (E - 0.5) / 0.4 }),
      i.lathe(b, { seg: 14, cap0: !1, cap1: !1, shape: w }),
      i.paint(jt.robeDark, { c2: jt.pantsDark, mat: K.cloth }),
      i.lathe(
        [
          [0.49, 0.204, 0.194],
          [0.5, 0.208, 0.198],
          [0.55, 0.204, 0.192],
          [0.56, 0.198, 0.186],
        ],
        { seg: 14, cap0: !1, cap1: !1, shape: (T) => 1 + 0.03 * Math.sin(T * 6) },
      ));
  }
  const p = [
      [0.84, 0.17, 0.14],
      [0.92, 0.172, 0.138],
      [1, 0.152, 0.118],
      [1.1, 0.172, 0.13],
      [1.21, 0.215, 0.152],
      [1.32, 0.22, 0.142],
      [1.385, 0.14, 0.108],
      [1.425, 0.072, 0.068],
    ],
    g = (b) => {
      for (let w = 1; w < p.length; w++)
        if (b <= p[w][0]) {
          const T = Math.max(0, (b - p[w - 1][0]) / (p[w][0] - p[w - 1][0]));
          return [bt(p[w - 1][1], p[w][1], T), bt(p[w - 1][2], p[w][2], T)];
        }
      return [p[p.length - 1][1], p[p.length - 1][2]];
    },
    y = (b, w) => b.map((T, E) => [T, g(T)[0] + w[E], g(T)[1] + w[E]]);
  (i.bind(Bl(n)).paint(jt.robe, { c2: jt.robeDark, ao: 0.88, ao2: 1, mat: K.cloth }),
    i.lathe(p, { seg: 12 }),
    i.bone(e.neck).paint(jt.skin, { ao: 0.75, glow: 0.05, mat: K.skin }),
    i.lathe(
      [
        [1.4, 0.064, 0.064],
        [1.53, 0.062, 0.062],
      ],
      { seg: 8, cap0: !1 },
    ),
    i.bone(e.chest).paint(jt.robeDark, { c2: jt.pantsDark, mat: K.cloth }),
    i.tube(
      [
        [0.07, 1.445, 0.05, 0.026, 0.01],
        [0.04, 1.39, 0.115, 0.028, 0.01],
        [-0.02, 1.33, 0.135, 0.028, 0.01],
      ],
      { seg: 4, up: [1, 0.4, 0] },
    ),
    i.tube(
      [
        [-0.07, 1.445, 0.05, 0.026, 0.01],
        [-0.045, 1.4, 0.108, 0.026, 0.01],
      ],
      { seg: 4, up: [1, -0.4, 0] },
    ),
    i
      .bind(Bl(n))
      .paint(jt.leatherDark, {
        c2: jt.leatherLight,
        gloss: 0.25,
        ao: 0.82,
        ao2: 1,
        mat: K.leather,
        pattern: En.scale,
        patternScale: 13,
        patternAmt: 0.3,
      }),
    i.lathe(y([1.03, 1.06, 1.15, 1.25, 1.33, 1.37], [0.008, 0.024, 0.022, 0.02, 0.018, 0.008]), {
      seg: 12,
      cap0: !1,
      cap1: !1,
    }),
    i
      .bone(e.chest)
      .paint(jt.iron, {
        c2: jt.ironLight,
        gloss: 0.8,
        mat: K.metal,
        pattern: En.scale,
        patternScale: 16,
        patternAmt: 0.35,
      }),
    i.sheet(4, 2, (b, w) => {
      const T = bt(58, 122, b) * pw,
        E = bt(1.3, 1.17, w),
        A = g(E);
      return [
        Math.cos(T) * (A[0] + 0.028),
        E + (Math.round(b * 4) % 2 ? 0.006 : 0),
        Math.sin(T) * (A[1] + 0.028),
      ];
    }),
    i.paint(jt.leatherDark, { c2: jt.leather, gloss: 0.3, mat: K.leather }),
    i.tube(
      [
        [0.2, 1.37, 0.07, 0.03, 0.012],
        [0.08, 1.26, 0.17, 0.032, 0.012],
        [-0.08, 1.12, 0.165, 0.032, 0.012],
        [-0.18, 1.04, 0.08, 0.03, 0.012],
      ],
      { seg: 4, up: [0, 0.6, 0.8] },
    ),
    i.tube(
      [
        [-0.2, 1.37, 0.07, 0.03, 0.012],
        [-0.08, 1.26, 0.17, 0.032, 0.012],
        [0.08, 1.12, 0.165, 0.032, 0.012],
        [0.18, 1.04, 0.08, 0.03, 0.012],
      ],
      { seg: 4, up: [0, 0.6, 0.8] },
    ),
    i.paint(jt.brass, { c2: jt.brassDark, gloss: 1, mat: K.metal }),
    i.ball(0, 1.19, 0.182, 0.032, 0.032, 0.016, 0),
    i.bone(e.spine).paint(jt.leatherDark, { c2: jt.leather, gloss: 0.3, mat: K.leather }),
    i.lathe(
      [
        [0.93, 0.178, 0.146],
        [0.945, 0.186, 0.152],
        [1, 0.168, 0.136],
        [1.015, 0.16, 0.13],
      ],
      { seg: 12 },
    ),
    i.paint(jt.brass, { c2: jt.brassDark, gloss: 1, mat: K.metal }),
    i.g(pt(0, 0.97, 0.15, 0, 0, 0), () =>
      i.extrude(
        [
          [-0.05, 0.012],
          [0.03, 0.022],
          [0.055, 0],
          [0.03, -0.022],
          [-0.05, -0.012],
        ],
        0.02,
        0.006,
      ),
    ));
  const v = (b, w, T, E, A, C, R, I, P, F) => {
    (i
      .bone(b)
      .paint(I, {
        c2: P,
        gloss: F === K.metal ? 0.8 : 0.25,
        ao: 0.82,
        ao2: 1,
        mat: F,
        pattern: En.scale,
        patternScale: 14,
        patternAmt: 0.3,
      }),
      i.g(pt(w, T, 0, 0, 0, R), () => {
        i.lathe(
          [
            [-A * 0.34, E, C],
            [-A * 0.1, E * 1.02, C * 1.02],
            [A * 0.6, E * 0.72, C * 0.72],
            [A, E * 0.2, C * 0.2],
          ],
          { seg: 9, crease: 50 },
        );
      }));
  };
  (v(e.clavL, 0.33, 1.42, 0.15, 0.075, 0.15, -22, jt.leatherDark, jt.leatherLight, K.leather),
    v(e.armL, 0.37, 1.3, 0.12, 0.06, 0.125, -42, jt.iron, jt.ironLight, K.metal),
    i.bone(e.armL).paint(jt.brass, { c2: jt.brassDark, gloss: 1, mat: K.metal }),
    i.g(pt(0.37, 1.3, 0, 0, 0, -42), () =>
      i.lathe(
        [
          [-0.026, 0.118, 0.123],
          [-0.016, 0.128, 0.133],
          [-0.006, 0.122, 0.127],
        ],
        { seg: 9, cap0: !1, cap1: !1, crease: 30 },
      ),
    ),
    i.sym((b) => {
      const w = s.shoulderX;
      (i.bone(b > 0 ? e.armL : e.armR).paint(jt.robe, { c2: jt.robeDark, ao: 0.9, ao2: 1, mat: K.cloth }),
        i.ball(w, s.shoulderY, 0, 0.082, 0.08, 0.082, 1),
        i.limb([w, s.shoulderY, 0], [w, s.elbowY, 0], 0.076, 0.064, { seg: 8 }),
        i.paint(16777215, { team: 1, mat: K.cloth }),
        Wd(i, w, s.elbowY + 0.1, 0, 0.07, 0.07, 0.012, 0.03, 8),
        i.bone(b > 0 ? e.foreL : e.foreR).paint(jt.robe, { c2: jt.robeDark, mat: K.cloth }),
        i.ball(w, s.elbowY, 0, 0.064, 0.064, 0.064, 1),
        i.limb([w, s.elbowY, 0], [w, s.wristY, 0], 0.06, 0.052, { seg: 8 }),
        i.paint(jt.leather, { c2: jt.leatherDark, gloss: 0.25, mat: K.leather }));
      const T = b > 0 ? 0.24 : 0.1;
      (i.lathe(
        [
          [s.wristY - 0.01, 0.058, 0.058, w, 0],
          [s.wristY + 0.02, 0.07, 0.07, w, 0],
          [s.wristY + T, 0.074, 0.074, w, 0],
          [s.wristY + T + 0.014, 0.062, 0.062, w, 0],
        ],
        { seg: 8 },
      ),
        b > 0 &&
          (i.paint(jt.leatherDark, { c2: jt.leather, mat: K.leather }),
          Wd(i, w, s.wristY + 0.12, 0, 0.074, 0.074, 0.008, 0.012, 8)));
    }),
    i.paint(jt.skin, { glow: 0.06, ao: 0.9, mat: K.skin }),
    Ko(i, n, 1, 0.056),
    Ko(i, n, -1, 0.056),
    i.bone(e.handR).paint(jt.jade, { c2: 13031104, gloss: 0.9, mat: K.crystal }),
    i.g(pt(-s.shoulderX + 0.012, s.handY + 0.02, 0.05, 70, 0, -20), () =>
      i.torus(0.017, 0.008, 0.008, 8, 3, { crease: 40 }),
    ),
    i.bone(e.chest).paint(jt.robeDark, { c2: jt.robe, ao: 0.9, mat: K.cloth }),
    i.sheet(8, 2, (b, w) => {
      const T = bt(200, 340, b) * pw,
        A = [
          [1.45, 0.11, 0.1],
          [1.4, 0.25, 0.18],
          [1.33, 0.29, 0.22],
        ][Math.round(w * 2)];
      return [Math.cos(T) * A[1], A[0], Math.sin(T) * A[2] - 0.02];
    }),
    i.paint(jt.lining, { c2: jt.liningShade, mat: K.cloth }),
    i.g(pt(0, 1.455, -0.02, 10, 0, 0, 1, 1, 0.9), () => i.torus(0.105, 0.03, 0.028, 10, 4)));
  for (const [b, w] of [
    [u, 1],
    [m, -1],
  ]) {
    const T = h(w),
      E = (C) => Fi(0.13, 0.17, C);
    (i.bind(Zi(b, T, e.chest)).paint(jt.robe, { c2: jt.robeDark, mat: K.cloth }),
      Js(
        i,
        T.map((C) => [C[0], C[1], C[2] - 0.01]),
        { width: E, axis: [1, 0, w * 0.35], bow: [0, 0, -0.03], nu: 3, nv: 6, tail: "flat", wave: 0.2 },
      ),
      i.paint(jt.lining, { c2: jt.liningShade, mat: K.cloth }));
    const A = [0, 0.3, 0.6, 0.86].map((C) => Li(T, C));
    (Js(
      i,
      A.map((C) => [C[0], C[1], C[2] + 0.006]),
      { width: (C) => E(C * 0.86), axis: [1, 0, w * 0.35], bow: [0, 0, -0.03], nu: 3, nv: 5, tail: "flat" },
    ),
      i.paint(16777215, { team: 1, mat: K.cloth }),
      Js(
        i,
        [Li(T, 0.86), Li(T, 0.93), Li(T, 1)].map((C) => [C[0], C[1], C[2] + 0.006]),
        {
          width: (C) => E(0.86 + C * 0.14),
          axis: [1, 0, w * 0.35],
          bow: [0, 0, -0.03],
          nu: 3,
          nv: 2,
          tail: "flat",
        },
      ));
  }
  (i.bone(e.hips),
    i.g(pt(-0.25, 0.86, -0.1, -32, 0, 26), () => {
      (i.paint(jt.leatherDark, { c2: jt.leather, gloss: 0.3, mat: K.leather }),
        i.lathe(
          [
            [-0.34, 0.035, 0.03],
            [-0.3, 0.06, 0.05],
            [0.12, 0.078, 0.06],
            [0.2, 0.085, 0.066],
          ],
          { seg: 8, cap1: !1 },
        ),
        i.paint(jt.brass, { c2: jt.brassDark, gloss: 1, mat: K.metal }),
        Wd(i, 0, 0.19, 0, 0.088, 0.068, 0.01, 0.016, 8),
        Wd(i, 0, -0.2, 0, 0.072, 0.058, 0.008, 0.012, 8));
      for (let b = 0; b < 7; b++) {
        const w = bt(-0.055, 0.055, b / 6),
          T = b % 2 ? 0.018 : -0.016,
          E = 0.44 + (b % 3) * 0.025;
        (i.paint(jt.shaft, { c2: 10125376, mat: K.leather }),
          i.tube(
            [
              [w, 0.1, T, 0.007],
              [w * 1.2, E, T, 0.007],
            ],
            { seg: 3 },
          ),
          i.paint(16777215, { team: 1, mat: K.cloth }),
          i.tube(
            [
              [w * 1.2, E - 0.2, T, 0.011],
              [w * 1.2, E - 0.18, T, 0.011],
            ],
            { seg: 3 },
          ),
          i.paint(jt.feather, { c2: jt.featherShade, mat: K.fur, line: 0 }),
          i.g(pt(w * 1.2, E - 0.07, T, 0, 60 + b * 20, 0), () =>
            i.extrude(
              [
                [-0.04, -0.1],
                [0.04, -0.1],
                [0.045, 0.07],
                [0, 0.1],
                [-0.045, 0.07],
              ],
              0.006,
              0,
            ),
          ));
      }
    }),
    i.g(pt(0.2, 0.9, 0.02, 64, 0, -14), () => {
      (i.paint(jt.lacquerDark, { c2: jt.lacquer, gloss: 0.6, mat: K.leather }),
        i.tube(
          [
            [0, 0, -0.04, 0.022, 0.012],
            [0, 0, 0.42, 0.024, 0.012],
            [0, -0.01, 0.48, 0.012, 0.008],
          ],
          { seg: 4, up: [0, 1, 0] },
        ),
        i.paint(jt.leatherDark, { mat: K.leather }),
        i.tube(
          [
            [0, 0, -0.06, 0.016],
            [0, 0, -0.2, 0.016],
          ],
          { seg: 5 },
        ),
        i.paint(jt.iron, { c2: jt.ironLight, gloss: 0.8, mat: K.metal }),
        i.g(pt(0, 0, -0.24, 90, 0, 0), () => i.torus(0.035, 0.009, 0.009, 6, 3, { crease: 30 })));
    }));
  const _ = qh(i, n, jt.skin, r, 0.25, 1.04),
    k = _.cy;
  (Xh(i, n, _, {
    iris: 2759700,
    irisGlow: 0.05,
    irisSize: 0.62,
    brow: jt.hair,
    browTilt: 14,
    browH: 0.022,
    browLen: 1.1,
    eyeW: 0.052,
    eyeH: 0.034,
    slant: 6,
    lash: 0.017,
    lip: 10115656,
    skin: jt.skin,
    nose: 1,
    ears: !0,
    mouthW: 0.95,
    smile: -0.15,
    lite: !0,
  }),
    Cm(i, n, _, {
      c: jt.hair,
      c2: jt.hairHi,
      thick: 0.024,
      gloss: 0.2,
      line: (b) =>
        b < 0.85
          ? 0.17 - 0.015 * Math.cos((b / 0.85) * Math.PI * 0.5)
          : b < 1.4
            ? Fi(0.16, -0.06, (b - 0.85) / 0.55)
            : -0.28,
    }),
    Bx(i, n, _, {
      c: jt.hair,
      c2: jt.hairHi,
      spread: 0,
      tufts: 1,
      len: 0.075,
      tuftR: 0.026,
      puff: 0.1,
      mustache: 0.075,
      mustacheR: 0.012,
      curl: -0.012,
      gloss: 0.1,
      tuftSeg: 4,
    }),
    i.bone(e.head).paint(jt.hairHi, { c2: jt.hair, mat: K.fur }),
    i.sym(() => {
      const b = k + 0.02,
        w = _.ring(0.02);
      i.tube(
        [
          [w[0] * 0.95, b + 0.07, w[2] + w[1] * 0.26, 0.01, 0.022],
          [w[0] * 0.98, b - 0, w[2] + w[1] * 0.28, 0.01, 0.02],
          [w[0] * 0.92, b - 0.06, w[2] + w[1] * 0.32, 0.004, 0.008],
        ],
        { seg: 4, crease: 180, up: [0, 0, 1] },
      );
    }));
  {
    const b = (w, T) => {
      const E = _.ring(w * r);
      return [k + w * r, E[0] + T, E[1] + T, 0, E[2]];
    };
    (i.paint(jt.cap, { c2: jt.capHi, gloss: 0.5, mat: K.leather }),
      i.lathe([b(0.13, 0.012), b(0.15, 0.016), b(0.17, 0.014)], { seg: 14, cap0: !1, cap1: !1, crease: 40 }),
      i.g(pt(0, k + 0.19, -0.1, -24, 0, 0), () => {
        i.lathe(
          [
            [-0.06, 0.11, 0.11],
            [0.04, 0.105, 0.11],
            [0.11, 0.085, 0.095],
            [0.15, 0.05, 0.06],
            [0.165, 0.02, 0.02],
          ],
          { seg: 10, crease: 50 },
        );
      }),
      i.paint(jt.brass, { c2: jt.brassDark, gloss: 1, mat: K.metal }),
      i.sym(() => i.ball(0.13, k + 0.22, -0.06, 0.022, 0.022, 0.014, 0)));
    for (const w of [1, -1]) {
      const A = (I) => {
          const P = I * I;
          return [
            w * (0.075 + 0.6 * (0.2 * I + 0.1 * P)),
            k + 0.26 + 0.6 * (0.66 * I - 0.34 * P),
            -0.13 - 0.6 * (0.5 * I + 0.46 * P),
          ];
        },
        C = (I) => 0.012 + 0.038 * Math.pow(Math.sin(Math.PI * 0.86 * Math.pow(I, 0.7)), 0.8) * (1 - 0.3 * I),
        R = [];
      for (let I = 0; I <= 8; I++) {
        const P = I / 8,
          F = A(P);
        R.push([F[0], F[1], F[2], I === 8 ? 0.004 : C(P), 0.006]);
      }
      (i.paint(jt.pheasant, {
        c2: jt.pheasantTip,
        mat: K.fur,
        by: (I, P, F, L) =>
          Math.min(1, (Math.round(L * 8) % 2 === 1 ? 0.7 : 0) + Math.max(0, L - 0.66) * 2.6),
      }),
        i.tube(R, { seg: 4, up: [w, 0, 0], crease: 180, cap0: !1 }),
        i.paint(jt.bone, { c2: jt.pheasant, mat: K.fur, line: 0 }),
        i.tube(
          R.slice(0, 8).map((I, P) => [I[0], I[1], I[2], 0.005 * (1 - (P / 8) * 0.6), 0.011]),
          { seg: 4, up: [w, 0, 0], crease: 180, cap0: !1, cap1: !1 },
        ),
        i.paint(jt.brass, { c2: jt.brassDark, gloss: 1, mat: K.metal }),
        i.limb(A(-0.06), A(0.07), 0.02, 0.017, { seg: 4, cap0: !1 }));
    }
  }
  const M = (b) => -0.04 + (Ra.string + 0.04) * (b * b * 0.7 + 0.3 * Math.pow(b, 4)),
    S = (b, w, T) => {
      const E = [];
      for (let A = 0; A <= 6; A++) {
        const C = bt(w, T, A / 6),
          R = b * (0.06 + C * (Ra.tip - 0.06));
        E.push([0, M(C), R, bt(0.028, 0.016, C), bt(0.036, 0.02, C)]);
      }
      return E;
    };
  return (
    i.g(pt(a, o, 0), () => {
      (i.bone(e.propL).paint(jt.silk, { c2: 6953492, gloss: 0.2, mat: K.cloth }),
        i.tube(
          [
            [0, -0.04, -0.11, 0.026, 0.03],
            [0, -0.045, 0, 0.03, 0.034],
            [0, -0.04, 0.11, 0.026, 0.03],
          ],
          { seg: 6 },
        ));
      for (const T of [1, -1]) {
        const E = T > 0 ? l : c;
        (i.bind((C, R, I) => [E, e.propL, hi((Math.abs(I) - 0.1) / 0.14)]),
          i.paint(jt.lacquer, { c2: jt.lacquerDark, gloss: 0.6, mat: K.leather }),
          i.tube(S(T, 0, 1), { seg: 5, up: [1, 0, 0] }),
          i.bone(E).paint(jt.bone, { c2: 12562056, gloss: 0.9, mat: K.crystal }));
        const A = T * Ra.tip;
        (i.tube(
          [
            [0, Ra.string, A - T * 0.03, 0.016, 0.02],
            [0, Ra.string - 0.015, A + T * 0.05, 0.014, 0.018],
            [0, Ra.string - 0.07, A + T * 0.12, 0.008, 0.01],
          ],
          { seg: 4, up: [1, 0, 0] },
        ),
          i.paint(jt.bone, { c2: 11048044, gloss: 0.7, mat: K.crystal, line: 0 }),
          i.tube(
            S(T, 0.25, 0.55).map((C) => [C[0], C[1] + 0.012, C[2], C[3] * 0.6, C[4] * 1.04]),
            { seg: 3, up: [1, 0, 0] },
          ));
      }
      const b = (T, E, A) => [A >= 0 ? l : c, f, hi(Math.abs(A) / Ra.tip)];
      i.bind(b).paint(15919830, { line: 0, mat: K.cloth });
      const w = [];
      for (let T = 0; T <= 8; T++) w.push([0, Ra.string, bt(-0.86, Ra.tip, T / 8), 0.005]);
      (i.tube(w, { seg: 3, up: [1, 0, 0] }),
        i.bone(d).paint(jt.shaft, { c2: 10125376, mat: K.leather }),
        i.tube(
          [
            [0, Ra.string, 0, 0.009],
            [0, -0.78, 0, 0.009],
          ],
          { seg: 4 },
        ),
        i.paint(jt.head, { c2: 12113116, gloss: 1, glow: 0.18, mat: K.metal }),
        i.g(pt(0, -0.78, 0, 180, 0, 0), () => i.crystal(0.028, 0.12, 4, 0.75, 0.05)),
        i.paint(16777215, { team: 1, mat: K.cloth }),
        i.tube(
          [
            [0, 0.02, 0, 0.012],
            [0, 0, 0, 0.012],
          ],
          { seg: 4 },
        ),
        i.paint(jt.feather, { c2: jt.featherShade, mat: K.fur, line: 0 }));
      for (let T = 0; T < 3; T++)
        i.g(pt(0, 0.11, 0, 0, T * 120, 0), () =>
          i.extrude(
            [
              [0, -0.07],
              [0.04, -0.04],
              [0.04, 0.05],
              [0, 0.07],
            ],
            0.006,
            0,
          ),
        );
    }),
    i.bakeGrounding(2.05, 0.75, 0.9),
    { h: n, b: i, extra: { bowUp: l, bowDn: c, nock: f, arrow: d } }
  );
}

const mw = {
  ...Rm,
  stride: 2.8,
  stance: 0.33,
  lift: 0.28,
  bob: 0.05,
  drop: 0.05,
  lean: 14,
  twist: 9,
  width: 0.12,
  arm: 0,
};

function LU(n) {
  const t = ge(n, null, {
      hipsPos: [0, -0.02, 0],
      hips: [0, -22, -2],
      spine: [0, 4, 1],
      chest: [-2, 4, 0],
      neck: [0, 8, 0],
      head: [-2, 10, 0],
      footL: [0.14, 0.09, 0.12, 0, 0],
      footR: [-0.15, 0.09, -0.1, 0, -34],
      armL: [-6, 0, 22],
      foreL: [-30, 0, 0],
      propL: [-50, 0, -30],
      armR: [22, 0, -14],
      foreR: [-24, 0, 0],
    }),
    e = ge(n, null, {
      hipsPos: [0, -0.08, 0],
      hips: [0, -48, 0],
      spine: [0, -16, 0],
      chest: [-2, -22, 0],
      neck: [0, 36, 0],
      head: [0, 44, 0],
      footL: [0.1, 0.09, 0.32, 0, -24],
      footR: [-0.12, 0.09, -0.28, 0, -80],
      armL: [0, 6, 88],
      foreL: [0, 0, 0],
      propL: [0, 90, 0],
    }),
    s = ge(n, e, {
      hipsPos: [0, -0.18, -0.02],
      spine: [4, -16, 0],
      footL: [0.12, 0.09, 0.4, 0, -24],
      footR: [-0.14, 0.09, -0.34, 0, -80],
    }),
    i = ge(n, e, {
      hipsPos: [0, -0.12, -0.04],
      spine: [0, -16, 12],
      chest: [-2, -22, 20],
      neck: [-10, 36, -8],
      head: [-24, 44, 0],
      armL: [0, 6, 104],
    }),
    a = ge(n, null, {
      armL: [-20, 0, 14],
      foreL: [-50, 0, 0],
      propL: [-30, 0, 20],
      armR: [0, 0, -12],
      foreR: [-70, 0, 0],
    }),
    o = ge(n, null, {
      hipsPos: [0, -0.16, 0],
      hips: [34, 0, 0],
      spine: [22, 0, 0],
      chest: [16, 0, 0],
      head: [24, 0, 0],
      footL: [0.12, 0.38, 0.16, 30, 0],
      footR: [-0.12, 0.3, 0.02, 40, 0],
      armL: [-40, 0, 30],
      foreL: [-70, 0, 0],
      propL: [-20, 0, 30],
      armR: [-34, 0, -26],
      foreR: [-90, 0, 0],
    }),
    r = ge(n, null, {
      hipsPos: [0, -0.04, 0],
      hips: [0, -10, 0],
      spine: [2, 2, 0],
      chest: [2, 4, 0],
      neck: [4, 0, 0],
      head: [10, 4, 0],
      footL: [0.15, 0.09, 0.06, 0, 6],
      footR: [-0.15, 0.09, -0.04, 0, -16],
      armL: [-38, 0, 14],
      foreL: [-56, 0, 0],
      propL: [-34, 0, -8],
    }),
    l = Wh(n, t, { limp: { propL: [-30, 0, 20] }, lying: { armL: [-6, 0, 70], propL: [20, 90, -20] } });
  return { stance: t, aim: e, aimLow: s, aimUp: i, tmp: jl(n), runArms: a, tuck: o, channel: r, common: l };
}

const kp = new Float32Array(8),
  IU = [0, 0, 0],
  gw = [0, 0, 0, 1],
  m2 = [-125, -48, 0];

function PU() {
  const { h: n, b: t, extra: e } = CU(),
    s = LU(n),
    i = n.J,
    a = s.tmp,
    o = t.build(),
    r = (c, f, d, h, u) => {
      const m = ma(f, 0, d * 0.42),
        x = ma(f, Math.min(0.9, d + 0.3), 1),
        p = m * m * (3 - 2 * m) * (1 - x * x * (3 - 2 * x));
      A8(a, s.stance, u, p);
      const g = f < d;
      let y = 0;
      if (g) {
        const _ = ma(f, d * 0.3, d * 0.95);
        y = h * (1 - (1 - _) * (1 - _));
      } else {
        const _ = (f - d) / 0.12;
        y = _ < 1 ? -0.035 * Math.sin(_ * Math.PI * 2.5) * (1 - _) : 0;
      }
      (Un(n, c, a), c.pos(e.nock, 0, y, 0));
      const v = (y / 0.5) * 16;
      if (
        (c.rot(e.bowUp, -v, 0, 0),
        c.rot(e.bowDn, v, 0, 0),
        c.scale(e.arrow, g && f > d * 0.2 ? Math.min(1, ma(f, d * 0.2, d * 0.3) * 1.2) : 0),
        p > 0.02)
      )
        if (g) {
          const _ = ma(f, d * 0.1, d * 0.34),
            k = c.q;
          for (let M = 0; M < 4; M++) ((kp[M] = k[i.armR * 4 + M]), (kp[4 + M] = k[i.foreR * 4 + M]));
          (P0(n, c, -1, e.nock, 0, 0.06, 0, -0.3, 0.55, -1),
            _ < 1 && (S0(k, i.armR * 4, kp, 0, _), S0(k, i.foreR * 4, kp, 4, _)));
        } else {
          const _ = ma(f, d, d + 0.16),
            k = 0.5 + 0.35 * _;
          P0(n, c, -1, e.nock, 0.02, k * p + 0.06, 0.04 * _, -0.3, 0.55, -1);
        }
      return g ? ma(f, d * 0.3, d) : Math.max(0, 1 - (f - d) / 0.15);
    },
    l = (c, f, d) => {
      if (
        (c.scale(e.arrow, 0), jh(n, c, f.anim === "leap" ? "airborne" : f.anim, f.t, f.p, f.time, s.common))
      ) {
        f.anim === "dead" && (d.glow = Math.max(0.15, 1 - f.t * 1.2));
        return;
      }
      switch (f.anim) {
        case "move": {
          Mf(n, c, f.stride, mw, () => {
            const h = s.runArms.e,
              u = Math.cos(f.stride * Math.PI * 2);
            (c.rot(i.armL, h[i.armL * 3] + u * 6, 0, h[i.armL * 3 + 2]),
              c.rot(i.foreL, h[i.foreL * 3], 0, 0),
              c.rot(i.propL, h[i.propL * 3] + u * 3, 0, h[i.propL * 3 + 2]),
              c.rot(i.armR, h[i.armR * 3] - u * 34, 0, h[i.armR * 3 + 2]),
              c.rot(i.foreR, h[i.foreR * 3] - u * 14, 0, 0));
          });
          break;
        }
        case "attack": {
          const h = r(c, Vh(f.p, f.windup), 0.35, 0.54, s.aim);
          d.glow = 1 + h * ((f.mode & 1) !== 0 ? 2.2 : 0.9);
          break;
        }
        case "cast_s1": {
          const h = r(c, f.p, 0.4, 0.62, s.aimLow),
            u = f.p > 0.4 ? Math.sin(ma(f.p, 0.4, 0.62) * Math.PI) : 0;
          (c.add(i.propL, 0, 0, -u * 10), c.add(i.armL, 0, u * 6, 0), (d.glow = 1 + h * 2.4));
          break;
        }
        case "cast_ult": {
          const h = r(c, f.p, 0.4, 0.58, s.aimUp);
          d.glow = 1 + h * 2.6;
          break;
        }
        case "cast_s2":
        case "dash": {
          (Un(n, c, s.tuck, () => {
            const h = f.anim === "dash" ? f.p : 0,
              u = h * Math.PI * 2,
              m = 0.7;
            (c.rot(i.root, 360 * h, 0, 0),
              c.pos(i.root, 0, m * (1 - Math.cos(u)) + 0.15 * Math.sin(h * Math.PI), -m * Math.sin(u)));
          }),
            (d.glow = 1.8));
          break;
        }
        case "spin":
        case "channel": {
          (Un(n, c, s.channel, () => Yo(n, c, f.time, f.seed, 0.6)),
            P0(n, c, -1, i.handL, -0.02, 0.1, 0.05, -0.6, -0.4, 0.6),
            (d.glow = 1 + 0.4 * (0.5 + 0.5 * Math.sin(f.time * 5))));
          break;
        }
        default:
          (Un(n, c, s.stance, () => {
            (Yo(n, c, f.time, f.seed), c.add(i.hips, 0, 0, Math.sin(f.time * 0.8 + f.seed * 4) * 1.2));
          }),
            Tm(n.rig, c, i.handL, IU, gw),
            Em(c, i.propL, gw, m2[0] + Math.sin(f.time * 1.1) * 2, m2[1], m2[2]),
            (d.glow = 1 + 0.08 * Math.sin(f.time * 2.6)));
      }
    };
  return {
    key: "hero:fengling",
    geometry: o,
    rig: n.rig,
    height: 2.06,
    radius: 0.58,
    scale: uw,
    stride: mw.stride * uw,
    triangles: t.triangleCount,
    attach: {
      head: { joint: i.head, x: 0, y: 0.25, z: 0 },
      chest: { joint: i.chest, x: 0, y: 0.08, z: 0 },
      handR: { joint: i.handR, x: 0, y: -0.07, z: 0 },
      handL: { joint: i.handL, x: 0, y: -0.07, z: 0 },
      weapon: { joint: i.propL, x: 0, y: -0.2, z: 0 },
      muzzle: { joint: i.propL, x: 0, y: -0.5, z: 0 },
    },
    blend: (c, f) => (f === "attack" ? 0.06 : f === "dash" || f === "dead" ? 0.05 : 0.13),
    animate: l,
  };
}

const de = {
    ironLight: 8161432,
    ironDark: 3423046,
    bronze: 14263361,
    bronzeDark: 9726250,
    lacquer: 1775645,
    lacquerHi: 3814464,
    red: 11022378,
    redDark: 7216924,
    cloth: 8015408,
    clothDark: 5518370,
    clothLight: 10119746,
    skirt: 9190186,
    skirtDark: 6038297,
    steel: 13226714,
    steelDark: 8161428,
    skin: 14263932,
    hair: 2235420,
    hairHi: 4010544,
    leather: 4994600,
    leatherDark: 2891544,
    amber: 16761690,
  },
  DU = {
    ankleY: 0.11,
    kneeY: 0.42,
    hipY: 0.76,
    hipX: 0.19,
    pelvisY: 0.8,
    spineY: 0.98,
    chestY: 1.2,
    neckY: 1.54,
    headY: 1.56,
    clavX: 0.16,
    shoulderX: 0.47,
    shoulderY: 1.43,
    elbowY: 1.06,
    wristY: 0.73,
    handY: 0.61,
  },
  xw = 1.33,
  m0 = Math.PI / 180,
  xd = { h: 1.45, w: 0.45 };

function bc(n, t) {
  const e = t.a0 ?? 0,
    s = t.a1 ?? 360,
    i = t.n * 2,
    a = t.scallop ?? 0.016,
    o = t.groove ?? 0.012,
    r = t.lip ?? 0.014;
  n.sheet(
    i,
    2,
    (l, c) => {
      const d = Math.round(l * i) % 2 === 0,
        h = (e + (s - e) * l) * m0,
        u = (d ? -o : 0) + (c > 0.4 ? r * (c > 0.9 ? 1 : 0.7) : 0),
        m = bt(t.top[0], t.bot[0], c) + u,
        x = bt(t.top[1], t.bot[1], c) + u,
        p = bt(t.yTop, t.yBot, c) + (c > 0.9 && d ? a : 0);
      return [(t.cx ?? 0) + Math.cos(h) * m, p, (t.cz ?? 0) + Math.sin(h) * x];
    },
    t.double ?? !1,
    34,
  );
}

function zU() {
  const n = Gh(DU),
    { rig: t, J: e, d: s } = n,
    i = new Ls();
  i.crease = 36;
  const a = t.add("shield", e.foreL, s.shoulderX + 0.17, 0.9, 0.03),
    o = [
      [0, 0.86, 0.285],
      [0, 0.64, 0.31],
      [0, 0.44, 0.315],
      [0, 0.27, 0.315],
    ],
    r = t.addChain("tab", e.hips, o.slice(0, 3));
  t.chain({ joints: r, tip: [0, -0.17, 0], stiffness: 9, drag: 0.85, gravity: 10, maxAngle: 45 });
  const l = [
      [0, 0.86, -0.27],
      [0, 0.62, -0.31],
      [0, 0.4, -0.32],
      [0, 0.22, -0.32],
    ],
    c = t.addChain("tail", e.hips, l.slice(0, 3));
  t.chain({ joints: c, tip: [0, -0.18, 0], stiffness: 8, drag: 0.86, gravity: 10, maxAngle: 50 });
  const f = 1.12,
    d = s.headY + 0.25 * f,
    h = [
      [0, d + 0.2 * f, -0.06],
      [0, d + 0.4 * f, -0.2],
      [0, d + 0.58 * f, -0.36],
    ],
    u = t.addChain("mane", e.head, h.slice(0, 2));
  (t.chain({
    joints: u,
    tip: [0, 0.2, -0.16],
    stiffness: 16,
    drag: 0.8,
    gravity: 3,
    maxAngle: 26,
    wind: 0.8,
  }),
    i.sym((C) => {
      const R = s.hipX;
      (i
        .bone(C > 0 ? e.thighL : e.thighR)
        .paint(de.clothDark, { c2: de.cloth, ao: 0.85, ao2: 1, mat: K.cloth }),
        i.limb([R, s.hipY + 0.06, 0], [R, s.kneeY - 0.02, 0], 0.19, 0.155, { seg: 7 }),
        i
          .bone(C > 0 ? e.shinL : e.shinR)
          .paint(de.leatherDark, { c2: de.leather, gloss: 0.2, mat: K.leather }),
        i.lathe(
          [
            [s.ankleY - 0.01, 0.135, 0.145, R, 0],
            [0.22, 0.156, 0.168, R, -0.008],
            [0.44, 0.158, 0.16, R, 0],
            [0.47, 0.12, 0.12, R, 0],
          ],
          { seg: 8 },
        ),
        i.paint(de.clothLight, { c2: de.cloth, mat: K.cloth }));
      for (const I of [0.17, 0.29])
        i.lathe(
          [
            [I, 0.158, 0.168, R, -0.006],
            [I + 0.035, 0.162, 0.171, R, -0.006],
          ],
          { seg: 8, cap0: !1, cap1: !1 },
        );
      (i.paint(de.bronze, { c2: de.bronzeDark, gloss: 1, mat: K.metal }),
        i.ball(R, 0.43, 0.15, 0.04, 0.045, 0.025, 0),
        i.bone(C > 0 ? e.footL : e.footR).paint(1906194, { c2: de.leatherDark, gloss: 0.25, mat: K.leather }),
        i.tube(
          [
            [R, 0.07, -0.17, 0.12, 0.07],
            [R, 0.09, -0.02, 0.15, 0.09],
            [R, 0.08, 0.22, 0.16, 0.08],
            [R, 0.07, 0.35, 0.14, 0.055],
          ],
          { seg: 8, power: 3.2, up: [1, 0, 0] },
        ));
    }));
  const m = [
      [0.64, 0.2, 0.17],
      [0.74, 0.33, 0.26],
      [0.9, 0.345, 0.275],
      [1, 0.335, 0.272],
      [1.14, 0.385, 0.3],
      [1.3, 0.43, 0.325],
      [1.42, 0.415, 0.3],
      [1.5, 0.29, 0.23],
      [1.57, 0.15, 0.14],
    ],
    x = (C) => {
      for (let R = 1; R < m.length; R++)
        if (C <= m[R][0]) {
          const I = hi((C - m[R - 1][0]) / (m[R][0] - m[R - 1][0]));
          return [bt(m[R - 1][1], m[R][1], I), bt(m[R - 1][2], m[R][2], I)];
        }
      return [m[m.length - 1][1], m[m.length - 1][2]];
    },
    p = (C, R) => [C[0] + R, C[1] + R];
  (i.bind(Bl(n)).paint(de.clothDark, { c2: de.cloth, ao: 0.85, ao2: 1, mat: K.cloth }),
    i.lathe(m, { seg: 12 }),
    i.bone(e.chest).paint(de.clothLight, { c2: de.cloth, mat: K.cloth }),
    i.g(pt(0, 1.535, 0.01, 14, 0, 0, 1, 1, 0.92), () => i.torus(0.17, 0.05, 0.04, 10, 4)),
    i.bone(e.neck).paint(de.skin, { ao: 0.72, glow: 0.05, mat: K.skin }),
    i.lathe(
      [
        [1.5, 0.125, 0.125],
        [1.66, 0.118, 0.122],
      ],
      { seg: 9, cap0: !1 },
    ),
    [
      [1.475, 1.3, e.chest],
      [1.325, 1.165, e.chest],
      [1.185, 1.045, e.spine],
      [1.065, 0.94, e.spine],
    ].forEach(([C, R, I], P) => {
      if (
        (i
          .bone(I)
          .paint(de.ironDark, {
            c2: de.ironLight,
            gloss: 0.4,
            ao: 0.7,
            ao2: 1,
            mat: K.metal,
            pattern: En.scale,
            patternScale: 9,
            patternAmt: 0.25,
          }),
        bc(i, { yTop: C, yBot: R, top: p(x(C), P === 0 ? 0.012 : 0.02), bot: p(x(R), 0.03), n: 8 }),
        P > 0)
      ) {
        i.paint(de.red, { c2: de.redDark, mat: K.cloth });
        const F = p(x(C - 0.012), 0.034);
        i.lathe(
          [
            [C - 0.026, F[0], F[1]],
            [C - 0.004, F[0], F[1]],
          ],
          { seg: 12, cap0: !1, cap1: !1 },
        );
      }
    }),
    i.bone(e.spine).paint(de.leather, { c2: de.leatherDark, gloss: 0.2, mat: K.leather }));
  {
    const C = p(x(0.89), 0.04),
      R = p(x(0.99), 0.04);
    i.lathe(
      [
        [0.875, C[0] - 0.012, C[1] - 0.012],
        [0.89, C[0], C[1]],
        [0.99, R[0], R[1]],
        [1.005, R[0] - 0.012, R[1] - 0.012],
      ],
      { seg: 12 },
    );
  }
  (i.paint(de.bronze, { c2: de.bronzeDark, gloss: 1, mat: K.metal }),
    i.g(pt(0, 0.94, x(0.94)[1] + 0.045), () => {
      (i.g(pt(0, 0, 0, 0, 0, 0), () =>
        i.extrude(
          [
            [-0.085, 0.07],
            [0.085, 0.07],
            [0.1, 0],
            [0.06, -0.075],
            [-0.06, -0.075],
            [-0.1, 0],
          ],
          0.04,
          0.016,
        ),
      ),
        i.paint(de.bronzeDark, { c2: de.bronze, gloss: 1, mat: K.metal }),
        i.sym(() => i.g(pt(0.042, 0.022, 0.024, 0, 0, 18), () => i.box(0, 0, 0, 0.06, 0.022, 0.02))),
        i.ball(0, -0.012, 0.026, 0.02, 0.034, 0.016, 0),
        i.paint(de.bronze, { gloss: 1, mat: K.metal }),
        i.g(pt(0, -0.085, 0.02, 90, 0, 0), () => i.torus(0.042, 0.012, 0.012, 6, 3, { crease: 30 })));
    }));
  const y = (C, R, I, P, F, L) => {
    i.bind(Zi(C, R, e.hips)).paint(16777215, { team: 1, mat: K.cloth });
    const B = R.map((G) => [G[0], G[1], G[2] - Math.sign(F) * 0.006]);
    (Js(i, B, {
      width: (G) => Fi(I, P, G) + 0.026,
      bow: [0, 0, F],
      nu: 2,
      nv: 5,
      tail: "swallow",
      tailLen: L + 0.03,
    }),
      i.paint(de.skirt, { c2: de.skirtDark, mat: K.cloth }),
      Js(i, R, { width: (G) => Fi(I, P, G), bow: [0, 0, F], nu: 4, nv: 5, tail: "swallow", tailLen: L }));
  };
  (y(r, o, 0.15, 0.125, 0.03, 0.1),
    y(c, l, 0.2, 0.165, -0.03, 0.12),
    i.sym(() => {
      (i
        .bone(e.hips)
        .paint(de.ironDark, {
          c2: de.ironLight,
          gloss: 0.4,
          ao: 0.75,
          ao2: 1,
          mat: K.metal,
          pattern: En.scale,
          patternScale: 9,
          patternAmt: 0.25,
        }),
        bc(i, { yTop: 0.9, yBot: 0.72, top: [0.36, 0.29], bot: [0.4, 0.32], a0: -62, a1: 62, n: 3 }),
        bc(i, { yTop: 0.75, yBot: 0.56, top: [0.375, 0.3], bot: [0.42, 0.335], a0: -56, a1: 56, n: 3 }),
        i.paint(de.bronze, { c2: de.bronzeDark, gloss: 1, mat: K.metal }),
        i.tube(
          [-56, 0, 56].map((C) => [Math.cos(C * m0) * 0.436, 0.558, Math.sin(C * m0) * 0.35, 0.016, 0.014]),
          { seg: 4, up: [0, 1, 0] },
        ));
    }),
    i.sym((C) => {
      const R = s.shoulderX;
      (i.bone(C > 0 ? e.armL : e.armR).paint(de.cloth, { c2: de.clothDark, ao: 0.85, ao2: 1, mat: K.cloth }),
        i.limb([R, s.shoulderY + 0.06, 0], [R, s.elbowY - 0.03, 0], 0.16, 0.14, { seg: 7 }),
        i.bone(C > 0 ? e.foreL : e.foreR).paint(de.clothDark, { c2: de.cloth, mat: K.cloth }),
        i.lathe(
          [
            [s.wristY + 0.19, 0.15, 0.15, R, 0],
            [s.wristY + 0.21, 0.153, 0.153, R, 0],
            [s.elbowY + 0.05, 0.14, 0.14, R, 0],
          ],
          { seg: 8 },
        ),
        i.paint(de.leather, { c2: de.leatherDark, gloss: 0.2, mat: K.leather }),
        i.lathe(
          [
            [s.wristY - 0.005, 0.112, 0.112, R, 0],
            [s.wristY + 0.03, 0.128, 0.128, R, 0],
            [s.wristY + 0.2, 0.138, 0.138, R, 0],
          ],
          { seg: 8, cap1: !1 },
        ),
        i.paint(de.bronze, { c2: de.bronzeDark, gloss: 1, mat: K.metal }));
      for (const I of [s.wristY + 0.02, s.wristY + 0.15])
        i.lathe(
          [
            [I, 0.136, 0.136, R, 0],
            [I + 0.016, 0.146, 0.146, R, 0],
            [I + 0.032, 0.14, 0.14, R, 0],
          ],
          { seg: 8, cap0: !1, cap1: !1, crease: 30 },
        );
    }),
    i.paint(de.skin, { glow: 0.05, ao: 0.9, mat: K.skin }),
    Ko(i, n, 1, 0.1),
    Ko(i, n, -1, 0.1),
    i.sym((C) => {
      const R = C > 0 ? e.clavL : e.clavR,
        I = C > 0 ? e.armL : e.armR,
        P = s.shoulderX + 0.01,
        F = () => {
          i.paint(de.ironDark, {
            c2: de.ironLight,
            gloss: 0.4,
            ao: 0.72,
            ao2: 1,
            mat: K.metal,
            pattern: En.scale,
            patternScale: 8,
            patternAmt: 0.25,
          });
        };
      (i.bone(R),
        F(),
        i.g(pt(P - 0.03, 1.545, 0, 0, 0, -10), () =>
          i.lathe(
            [
              [0, 0.2, 0.215],
              [0.065, 0.15, 0.16],
              [0.1, 0.03, 0.03],
            ],
            { seg: 8, cap0: !1, crease: 60 },
          ),
        ),
        bc(i, {
          cx: P,
          yTop: 1.59,
          yBot: 1.455,
          top: [0.15, 0.2],
          bot: [0.255, 0.27],
          a0: -112,
          a1: 112,
          n: 3,
          lip: 0.018,
          double: !0,
        }),
        i.bone(I),
        F(),
        bc(i, {
          cx: P,
          yTop: 1.49,
          yBot: 1.345,
          top: [0.225, 0.245],
          bot: [0.3, 0.295],
          a0: -106,
          a1: 106,
          n: 3,
          lip: 0.018,
        }),
        bc(i, {
          cx: P,
          yTop: 1.38,
          yBot: 1.225,
          top: [0.25, 0.26],
          bot: [0.325, 0.31],
          a0: -100,
          a1: 100,
          n: 3,
          lip: 0.02,
        }),
        i.paint(de.bronze, { c2: de.bronzeDark, gloss: 1, mat: K.metal }),
        i.tube(
          [-100, -50, 0, 50, 100].map((L) => [
            P + Math.cos(L * m0) * 0.342 * (L === 0 ? 1 : 1.03),
            1.222,
            Math.sin(L * m0) * 0.327 * 1.03,
            0.018,
            0.015,
          ]),
          { seg: 4, up: [0, 1, 0] },
        ),
        i.paint(16777215, { team: 1, mat: K.cloth }),
        i.sheet(6, 1, (L, B) => {
          const G = bt(-96, 96, L) * m0,
            q = bt(0.325, 0.345, B);
          return [
            P + Math.cos(G) * q,
            bt(1.215, 1.13, B) + (Math.round(L * 6) % 2 === 0 ? 0 : -0.012) * B,
            Math.sin(G) * q * 0.95,
          ];
        }));
    }));
  const v = qh(i, n, de.skin, f, 0.25, 1.1);
  (Xh(i, n, v, {
    iris: 3021842,
    irisGlow: 0.04,
    irisSize: 0.5,
    brow: de.hair,
    browTilt: 22,
    browH: 0.034,
    browLen: 1.12,
    eyeW: 0.056,
    eyeH: 0.05,
    slant: 3,
    lash: 0.016,
    lip: 7090726,
    skin: de.skin,
    nose: 1.25,
    ears: !0,
    mouthW: 1.25,
    smile: -0.7,
    open: 0.5,
    lite: !0,
  }),
    Cm(i, n, v, {
      c: de.hair,
      c2: de.hairHi,
      thick: 0.03,
      gloss: 0,
      line: (C) =>
        C < 0.9
          ? 0.168 - 0.02 * Math.cos((C / 0.9) * Math.PI * 0.5)
          : C < 1.45
            ? Fi(0.168, -0.06, (C - 0.9) / 0.55)
            : -0.3,
    }),
    Bx(i, n, v, {
      c: de.hair,
      c2: de.hairHi,
      spread: 1.5,
      thick: 0.07,
      drop: 0.1,
      tufts: 7,
      len: 0.2,
      tuftR: 0.078,
      puff: 0.75,
      mustache: 0.15,
      mustacheR: 0.028,
      curl: 0.06,
      gloss: 0,
      tuftSeg: 4,
    }));
  {
    const C = v.cy + 0.135 * f,
      R = v.ring(0.135 * f);
    (i.bone(e.head).paint(de.red, { c2: de.redDark, mat: K.cloth }),
      i.g(pt(0, C, R[2], -7, 0, 0, 1, 1, (R[1] + 0.03) / (R[0] + 0.03)), () =>
        i.torus(R[0] + 0.028, 0.014, 0.03, 12, 4, { crease: 30 }),
      ),
      i.ball(0, C + 0.02, R[2] - R[1] - 0.045, 0.04, 0.035, 0.03, 0),
      i.tube(
        [
          [0.03, C + 0.01, R[2] - R[1] - 0.05, 0.03, 0.008],
          [0.07, C - 0.1, R[2] - R[1] - 0.09, 0.034, 0.008],
          [0.08, C - 0.2, R[2] - R[1] - 0.1, 0.012, 0.006],
        ],
        { seg: 4, up: [1, 0, 0] },
      ),
      i.tube(
        [
          [-0.03, C + 0.01, R[2] - R[1] - 0.05, 0.03, 0.008],
          [-0.06, C - 0.08, R[2] - R[1] - 0.1, 0.034, 0.008],
          [-0.1, C - 0.16, R[2] - R[1] - 0.12, 0.012, 0.006],
        ],
        { seg: 4, up: [1, 0, 0] },
      ));
  }
  i.bind(Zi(u, h, e.head)).paint(de.hair, { c2: de.hairHi, mat: K.fur });
  const _ = [0, v.cy + 0.2 * f, -0.05],
    k = [
      [0, 0.75, 0.44, 0.125],
      [24, 0.3, 0.38, 0.11],
      [-24, 0.3, 0.38, 0.11],
      [52, 0.6, 0.3, 0.1],
      [-52, 0.6, 0.3, 0.1],
      [0, 1.7, 0.32, 0.11],
    ];
  for (const [C, R, I, P] of k) {
    const F = Math.sin(C * m0),
      L = Math.cos(C * m0);
    af(i, [_[0] + F * 0.1, _[1] - Math.abs(F) * 0.05, _[2] - R * 0.03], [F, L, -R], I, P, {
      curl: [F * 0.16, -0.06, -0.34],
      n: 3,
      seg: 5,
      flat: 0.62,
      up: [1, 0, 0],
      tip: 0.14,
    });
  }
  (i.bone(e.head).paint(de.hair, { c2: de.hairHi, mat: K.fur }),
    i.lathe(
      [
        [_[1] - 0.06, 0.15, 0.14, 0, _[2] - 0.02],
        [_[1] + 0.03, 0.12, 0.11, 0, _[2] - 0.02],
        [_[1] + 0.08, 0.03, 0.03, 0, _[2] - 0.02],
      ],
      { seg: 8, cap0: !1, crease: 180 },
    ),
    i.bone(e.propR),
    i.g(pt(-s.shoulderX, s.handY, 0), () => {
      (i.paint(de.leatherDark, { c2: de.redDark, gloss: 0.2, mat: K.leather }),
        i.tube(
          [
            [0, 0, -0.15, 0.027, 0.03],
            [0, 0, 0.07, 0.03, 0.033],
          ],
          { seg: 6 },
        ),
        i.paint(de.bronze, { c2: de.bronzeDark, gloss: 1, mat: K.metal }),
        i.g(pt(0, 0, -0.165, 90, 0, 0), () =>
          i.lathe(
            [
              [-0.014, 0.03],
              [0, 0.056],
              [0.014, 0.03],
            ],
            { seg: 6, crease: 30 },
          ),
        ),
        i.g(pt(0, 0, 0.085), () =>
          i.extrude(
            [
              [0, 0.115],
              [0.036, 0.014],
              [0.036, -0.014],
              [0, -0.115],
              [-0.036, -0.014],
              [-0.036, 0.014],
            ],
            0.045,
            0.012,
          ),
        ),
        i.paint(de.steelDark, { c2: de.steel, gloss: 1, mat: K.metal }),
        i.tube(
          [
            [0, 0, 0.1, 0.014, 0.05],
            [0, 0, 0.3, 0.014, 0.054],
            [0, 0, 0.82, 0.011, 0.046],
            [0, 0, 0.94, 0.007, 0.028],
            [0, 0, 1.02, 0.001, 0.002],
          ],
          { seg: 4, up: [1, 0, 0], crease: 0 },
        ));
    }));
  const M = [0.15, 0.045, 0.085, 0.1, 0.08, 0.02, -0.13],
    S = [-0.045, -0.03, -0.012, 0, 0.012, 0.045, 0.14],
    b = (C, R) => {
      const I = hi(R) * (C.length - 1),
        P = Math.min(C.length - 2, Math.floor(I));
      return bt(C[P], C[P + 1], I - P);
    },
    w = -0.24 - xd.h / 2 + 0.05,
    T = -0.24 + xd.h / 2 - 0.15,
    E = (C, R, I = 0) => {
      const P = Math.abs(C * 2 - 1),
        F = xd.w * (0.93 + 0.07 * Math.cos(R * Math.PI * 2)),
        L = (C * 2 - 1) * F,
        B = bt(w + b(S, P), T + b(M, P), R);
      return [L, B, -0.11 * (L / xd.w) ** 2 + I];
    },
    A = (C, R, I) => [C * xd.w, R, -0.11 * C * C + I];
  return (
    i.bone(a),
    i.g(pt(s.shoulderX + 0.17, 0.9, 0.03, 0, 90, 90), () => {
      (i.paint(de.lacquer, { c2: de.lacquerHi, gloss: 0.25, mat: K.leather }),
        i.sheet(8, 6, (I, P) => E(I, P, 0.02), !1),
        i.paint(de.leatherDark, { c2: de.leather, mat: K.leather, ao: 0.8 }),
        i.sheet(8, 4, (I, P) => E(1 - I, P, -0.012), !1));
      const C = [];
      for (let I = 0; I < 8; I++) C.push([...E(I / 8, 0, 0.004), 0.026, 0.026]);
      for (let I = 0; I < 4; I++) C.push([...E(1, I / 4, 0.004), 0.026, 0.026]);
      for (let I = 0; I < 8; I++) C.push([...E(1 - I / 8, 1, 0.004), 0.026, 0.026]);
      for (let I = 0; I < 4; I++) C.push([...E(0, 1 - I / 4, 0.004), 0.026, 0.026]);
      (i.paint(de.red, { c2: de.redDark, gloss: 0.4, mat: K.leather }),
        i.tube(C, { seg: 4, closed: !0, up: [0, 0, 1], crease: 50 }),
        i.paint(16777215, { team: 1, mat: K.cloth, line: 0 }),
        i.sheet(1, 6, (I, P) => E(bt(0.41, 0.59, I), bt(0.05, 0.93, P), 0.03), !1),
        i.paint(12728878, { gloss: 0.3, mat: K.leather, line: 0 }));
      const R = (I, P, F) => {
        const L = [
            [0.2, 0.34],
            [0.52, 0.36],
            [0.76, 0.24],
            [0.78, 0.07],
            [0.6, -0.01],
            [0.42, 0.05],
            [0.42, 0.17],
            [0.54, 0.2],
          ],
          B = L.length - 1;
        i.sheet(
          B,
          1,
          (G, q) => {
            const et = (I * P > 0 ? G : 1 - G) * B,
              ct = Math.min(B - 1, Math.floor(et)),
              rt = et - ct,
              mt = bt(L[ct][0], L[ct + 1][0], rt),
              nt = bt(L[ct][1], L[ct + 1][1], rt),
              H = L[ct + 1][0] - L[ct][0],
              st = L[ct + 1][1] - L[ct][1],
              tt = Math.hypot(H, st) || 1,
              it = (q - 0.5) * 0.05 * (1 - (et / B) * 0.5);
            return A(I * (mt + (-st / tt) * it * 2.2), F + P * (nt + (H / tt) * it), 0.034);
          },
          !1,
        );
      };
      for (const I of [1, -1]) (R(I, 1, -0.24 + 0.07), R(I, -1, -0.24 - 0.1));
      (i.paint(de.bronze, { c2: de.amber, gloss: 1, glow: 0.1, glow2: 0.26, mat: K.metal, line: 1 }),
        i.ball(0, -0.24, 0.035, 0.115, 0.115, 0.075, 1),
        i.paint(de.bronzeDark, { c2: de.bronze, gloss: 1, mat: K.metal }),
        i.g(pt(0, -0.24, 0.035, 90, 0, 0), () => i.torus(0.15, 0.024, 0.02, 10, 3, { crease: 30 })));
    }),
    i.bakeGrounding(2.1),
    { h: n, b: i, extra: { shield: a, mane: u } }
  );
}

const y3 = {
    ...Rm,
    stride: 2.9,
    stance: 0.44,
    lift: 0.22,
    bob: 0.07,
    drop: 0.08,
    lean: 10,
    sway: 0.06,
    twist: 7,
    width: 0.22,
    arm: 0,
  },
  NU = { ...y3, lean: 30, drop: 0.16, bob: 0.03, stance: 0.36, lift: 0.26 };

function FU(n) {
  const t = ge(n, null, {
      hipsPos: [0, -0.06, 0],
      hips: [3, 14, 0],
      spine: [3, -6, 0],
      chest: [2, -8, 0],
      head: [0, -4, 0],
      footL: [0.27, 0.11, 0.14, 0, 16],
      footR: [-0.29, 0.11, -0.12, 0, -24],
      armL: [-26, 0, 20],
      foreL: [-80, -44, 0],
      armR: [-6, 0, -16],
      foreR: [-24, 0, 0],
      propR: [66, -12, 0],
    }),
    e = ge(n, t, {
      hipsPos: [0, -0.14, 0.02],
      hips: [6, 18, 0],
      chest: [6, -10, 0],
      armL: [-50, 0, 8],
      foreL: [-84, -76, 0],
      armR: [-20, 0, -22],
      foreR: [-50, 0, 0],
      propR: [50, -20, 0],
    }),
    s = ge(n, t, {
      hipsPos: [0.03, -0.08, -0.06],
      hips: [0, -12, 0],
      spine: [-2, -8, 0],
      chest: [-6, -12, 0],
      head: [0, 22, 0],
      armR: [-150, 0, -46],
      foreR: [-70, 0, 0],
      propR: [-10, -20, 0],
      armL: [-22, 0, 26],
    }),
    i = ge(n, t, {
      hipsPos: [-0.03, -0.15, 0.14],
      hips: [8, 14, 0],
      spine: [8, 8, 0],
      chest: [10, 12, 0],
      head: [-8, -24, 0],
      footL: [0.27, 0.11, 0.3, 0, 16],
      armR: [-58, 44, -18],
      foreR: [-12, 0, 0],
      propR: [58, 26, 0],
      armL: [6, 0, 34],
      foreL: [-64, -36, 0],
    }),
    a = ge(n, i, {
      hips: [10, 20, 0],
      chest: [12, 16, 0],
      armR: [-28, 64, -10],
      foreR: [-20, 0, 0],
      propR: [84, 36, 0],
    }),
    o = zs([
      [0, t],
      [0.22, s, he.out],
      [0.35, i, he.in3],
      [0.52, a, he.out],
      [1, t, he.io],
    ]),
    r = ge(n, t, {
      hipsPos: [0, -0.1, -0.04],
      hips: [0, 18, 0],
      chest: [-2, 8, 0],
      armL: [-10, 0, 40],
      foreL: [-92, -20, 0],
      armR: [-50, 60, -20],
      foreR: [-50, 0, 0],
      propR: [60, 50, 0],
    }),
    l = ge(n, t, {
      hipsPos: [0.03, -0.14, 0.14],
      hips: [8, -16, 0],
      spine: [6, -8, 0],
      chest: [6, -12, 0],
      head: [-6, 26, 0],
      footR: [-0.29, 0.11, 0.1, 0, -10],
      armR: [-50, -46, -76],
      foreR: [-10, 0, 0],
      propR: [50, -30, 0],
      armL: [-46, 0, 34],
      foreL: [-70, -84, 0],
    }),
    c = zs([
      [0, t],
      [0.22, r, he.out],
      [0.35, l, he.in3],
      [0.55, l, he.out],
      [1, t, he.io],
    ]),
    f = ge(n, t, {
      hipsPos: [0, 0, -0.08],
      hips: [-10, 6, 0],
      spine: [-10, 0, 0],
      chest: [-14, 0, 0],
      head: [10, 0, 0],
      armL: [-150, 0, 16],
      foreL: [-50, -80, 0],
      armR: [-120, 0, -40],
      foreR: [-60, 0, 0],
      propR: [10, 0, 0],
    }),
    d = ge(n, t, {
      hipsPos: [0, -0.24, 0.16],
      hips: [26, 6, 0],
      spine: [14, 0, 0],
      chest: [14, 0, 0],
      head: [-28, 0, 0],
      footL: [0.3, 0.11, 0.32, 0, 12],
      footR: [-0.3, 0.11, -0.16, 10, -20],
      armL: [-58, 0, 6],
      foreL: [-66, -84, 0],
      shield: [0, 0, -18],
      armR: [-30, 0, -30],
      foreR: [-40, 0, 0],
      propR: [70, -20, 0],
    }),
    h = zs([
      [0, t],
      [0.24, f, he.out],
      [0.35, d, he.in3],
      [0.62, d, he.lin],
      [1, t, he.io],
    ]),
    u = ge(n, t, {
      hipsPos: [0, 0.03, -0.05],
      chest: [-12, 0, 0],
      head: [6, 0, 0],
      armL: [-62, 0, 26],
      foreL: [-96, -60, 0],
      armR: [-10, 0, -44],
      foreR: [-50, 0, 0],
    }),
    m = ge(n, e, {
      hipsPos: [0, -0.26, 0.08],
      hips: [14, 12, 0],
      chest: [10, -6, 0],
      armL: [-44, 0, 4],
      foreL: [-86, -84, 0],
      neck: [-16, 0, 0],
      head: [-26, 0, 0],
      armR: [10, 0, -50],
      foreR: [-30, 0, 0],
      propR: [40, -30, 0],
    }),
    x = zs([
      [0, t],
      [0.3, u, he.out],
      [0.55, m, he.in3],
      [0.8, m, he.lin],
      [1, e, he.io],
    ]),
    p = ge(n, t, {
      hipsPos: [0, -0.28, 0],
      hips: [18, 0, 0],
      chest: [10, 0, 0],
      armR: [20, 0, -30],
      propR: [80, -10, 0],
    }),
    g = ge(n, null, {
      hips: [-16, 0, 0],
      spine: [-10, 0, 0],
      chest: [-12, 0, 0],
      head: [12, 0, 0],
      footL: [0.24, 0.42, 0.12, 30, 10],
      footR: [-0.24, 0.3, -0.22, 50, -10],
      armR: [-150, 0, -70],
      foreR: [-30, 0, 0],
      propR: [-20, 0, 0],
      armL: [-120, 0, 60],
      foreL: [-60, -40, 0],
    }),
    y = ge(n, null, {
      hipsPos: [0, -0.1, 0.1],
      hips: [32, 0, 0],
      spine: [14, 0, 0],
      chest: [14, 0, 0],
      head: [-32, 0, 0],
      footL: [0.3, 0.2, 0.3, -10, 10],
      footR: [-0.3, 0.2, -0.24, 40, -16],
      armL: [-70, 0, 4],
      foreL: [-60, -84, 0],
      shield: [0, 0, -24],
      armR: [-40, 0, -60],
      foreR: [-30, 0, 0],
      propR: [40, -20, 0],
    }),
    v = ge(n, y, {
      hipsPos: [0, -0.32, 0.16],
      footL: [0.32, 0.11, 0.34, 0, 12],
      footR: [-0.32, 0.11, -0.18, 10, -20],
      armL: [-56, 0, 4],
      shield: [0, 0, -30],
    }),
    _ = zs([
      [0, p],
      [0.3, g, he.out],
      [0.62, g, he.lin],
      [0.86, y, he.in],
      [1, v, he.in],
    ]),
    k = ge(n, null, {
      armL: [-28, 0, 18],
      foreL: [-76, -44, 0],
      armR: [0, 0, -18],
      foreR: [-40, 0, 0],
      propR: [50, -10, 0],
    }),
    M = ge(n, null, {
      armL: [-58, 0, 2],
      foreL: [-84, -62, 0],
      armR: [44, 0, -26],
      foreR: [-20, 0, 0],
      propR: [100, -10, 0],
      head: [-16, 0, 0],
    }),
    S = ge(n, t, {
      hipsPos: [0, -0.2, 0],
      hips: [8, 0, 0],
      chest: [6, 0, 0],
      head: [12, 0, 0],
      armR: [-40, 30, -4],
      foreR: [-40, 0, 0],
      propR: [130, 0, 0],
      armL: [-6, 0, 24],
      foreL: [-46, -30, 0],
    }),
    b = Wh(n, t, {
      limp: { propR: [84, -8, 0], foreL: [-30, -30, 0] },
      lying: { armR: [-4, 0, -70], propR: [70, -10, 0], armL: [-6, 0, 56], foreL: [-20, -20, 0] },
      lieY: 0.3,
    });
  return {
    stance: t,
    guard: e,
    tmp: jl(n),
    atkA: o,
    atkB: c,
    slam: h,
    s2: x,
    leap: _,
    runArms: k,
    charge: M,
    channel: S,
    common: b,
  };
}

function UU() {
  const { h: n, b: t } = zU(),
    e = FU(n),
    s = n.J,
    i = e.tmp,
    a = t.build(),
    o = (r, l, c) => {
      if (jh(n, r, l.anim, l.t, l.p, l.time, e.common)) {
        l.anim === "dead" && (c.glow = Math.max(0.12, 1 - l.t * 1.1));
        return;
      }
      const f = (l.mode & 2) !== 0;
      switch (l.anim) {
        case "move": {
          Mf(n, r, l.stride, y3, () => {
            const d = (f ? e.guard : e.runArms).e,
              h = Math.cos(l.stride * Math.PI * 2);
            (r.rot(s.armL, d[s.armL * 3] + h * 5, 0, d[s.armL * 3 + 2]),
              r.rot(s.foreL, d[s.foreL * 3], d[s.foreL * 3 + 1], 0),
              r.rot(s.armR, d[s.armR * 3] - h * 12, 0, d[s.armR * 3 + 2]),
              r.rot(s.foreR, d[s.foreR * 3], 0, 0),
              r.rot(s.propR, e.runArms.e[s.propR * 3] - h * 5, e.runArms.e[s.propR * 3 + 1], 0));
          });
          break;
        }
        case "attack": {
          const d = Vh(l.p, l.windup),
            h = (l.mode & 1) !== 0 ? e.slam : l.variant % 2 === 0 ? e.atkA : e.atkB;
          (ta(h, d, i), Un(n, r, i), (c.glow = 1 + ((l.mode & 1) !== 0 ? 2.2 : 1.2) * ho(d, 0.36, 0.2)));
          break;
        }
        case "cast_s1":
        case "dash": {
          (Mf(n, r, l.t * 3.4, NU, () => {
            const d = e.charge.e;
            for (const h of [s.armL, s.foreL, s.armR, s.foreR, s.propR])
              r.rot(h, d[h * 3], d[h * 3 + 1], d[h * 3 + 2]);
            r.add(s.head, d[s.head * 3], 0, 0);
          }),
            (c.glow = 1.8));
          break;
        }
        case "cast_s2": {
          (ta(e.s2, l.p, i), Un(n, r, i), (c.glow = 1 + 2 * ho(l.p, 0.55, 0.3)));
          break;
        }
        case "cast_ult":
        case "leap": {
          (ta(e.leap, l.p, i), Un(n, r, i), (c.glow = 1.6 + 1.6 * l.p));
          break;
        }
        case "spin":
        case "channel": {
          (Un(n, r, e.channel, () => Yo(n, r, l.time, l.seed, 0.8)),
            (c.glow = 1 + 0.5 * (0.5 + 0.5 * Math.sin(l.time * 5))));
          break;
        }
        default:
          (Un(n, r, f ? e.guard : e.stance, () => {
            (Yo(n, r, l.time * 0.75, l.seed, 1.5), r.add(s.propR, Math.sin(l.time * 1.1) * 2, 0, 0));
          }),
            (c.glow = (f ? 1.5 : 1) + 0.15 * Math.sin(l.time * 2.2)));
      }
    };
  return {
    key: "hero:panyue",
    geometry: a,
    rig: n.rig,
    height: 2.3,
    radius: 0.66,
    scale: xw,
    stride: y3.stride * xw,
    triangles: t.triangleCount,
    attach: {
      head: { joint: s.head, x: 0, y: 0.28, z: 0 },
      chest: { joint: s.chest, x: 0, y: 0.06, z: 0 },
      handR: { joint: s.handR, x: 0, y: -0.1, z: 0 },
      handL: { joint: s.handL, x: 0, y: -0.1, z: 0 },
      weapon: { joint: s.propR, x: 0, y: 0, z: 0.95 },
      muzzle: { joint: s.propR, x: 0, y: 0, z: 0.95 },
    },
    blend: (r, l) =>
      l === "attack"
        ? 0.09
        : l === "dash" || l === "leap"
          ? 0.08
          : l === "dead"
            ? 0.05
            : r === "leap"
              ? 0.2
              : 0.16,
    animate: o,
  };
}

const ie = {
    cloak: 11150408,
    cloakDark: 7345975,
    cloakLight: 13124202,
    fur: 16447472,
    furShade: 13225949,
    robe: 15986144,
    robeShade: 13353910,
    hem: 14129824,
    trim: 3104124,
    trimDark: 2048088,
    skin: 16176578,
    hair: 1841698,
    hairHi: 3814472,
    gold: 15777888,
    goldDark: 11830834,
    lip: 13121610,
    wood: 14860426,
    woodShade: 13081954,
    woodDark: 12089658,
    woodDeep: 8145446,
    string: 16771512,
  },
  OU = { ...Am, hipX: 0.105, shoulderX: 0.265, clavX: 0.08 },
  yw = 1.16,
  vw = Math.PI / 180;
export { PU, UU, ie, OU, yw, vw };
