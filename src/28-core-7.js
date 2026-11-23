// 28-core-7.js — core｜27 个顶层语句｜66KB
// 对应 game.pretty.js 第 55301–57608 行
// 关键内容：
//   BU                    pipa
//   $U                    leap
//   VU                    scarf
//   jU                    leap
//   Lm                    root
//   Im                    bound
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { Am, Ct, Em, En, Fi, Fx, Gh, Gn, K, Kn, Mf, P0, Qo, Rm, S0, Un, Vh, Wa, Wh, Xe, Yo, bt, ge, he, hi, ho, jh, jl, ma, pt, ta, zs } from './25-render-9.js';
import { Bl, Cm, Js, Ko, Li, Ls, Ox, R8, Wd, Xh, Zi, _p, af, qh } from './26-core-5.js';
import { OU, ie, vw, yw } from './27-core-6.js';

function BU() {
  const n = Gh(OU),
    { rig: t, J: e, d: s } = n,
    i = new Ls(),
    a = [-0.1, 1.02, 0.255],
    o = pt(a[0], a[1], a[2], -14, 8, -52, 1.14),
    r = o.elements,
    l = (R, I, P) => [
      r[0] * R + r[4] * I + r[8] * P,
      r[1] * R + r[5] * I + r[9] * P,
      r[2] * R + r[6] * I + r[10] * P,
    ],
    c = t.add("pipa", e.chest, a[0], a[1], a[2]),
    f = t.add("pipaPos", e.chest, 0, s.chestY, 0),
    d = t.add("pluck", e.chest, 0, s.chestY, 0),
    h = t.add("free", e.chest, 0, s.chestY, 0),
    u = 0.97,
    m = s.headY + 0.25 * u,
    x = [
      [0, m - 0.1, -0.22],
      [0, 1.38, -0.33],
      [0, 1.16, -0.37],
      [0, 0.96, -0.38],
    ],
    p = t.addChain("hair", e.head, x.slice(0, 3));
  t.chain({
    joints: p,
    tip: [0, -0.2, -0.01],
    stiffness: 7,
    drag: 0.88,
    gravity: 10,
    maxAngle: 50,
    wind: 1.2,
    colliders: [{ joint: e.chest, x: 0, y: 0.05, z: -0.04, r: 0.27 }],
  });
  const g = (R) => [
      [R * 0.1, 1, 0.14],
      [R * 0.15, 0.78, 0.2],
      [R * 0.17, 0.54, 0.25],
      [R * 0.18, 0.32, 0.3],
    ],
    y = t.addChain("ribL", e.hips, g(1).slice(0, 3)),
    v = t.addChain("ribR", e.hips, g(-1).slice(0, 3));
  for (const R of [y, v])
    t.chain({
      joints: R,
      tip: [0, -0.22, 0.04],
      stiffness: 4,
      drag: 0.92,
      gravity: 7,
      maxAngle: 70,
      wind: 2.2,
    });
  const _ = [
      [0, 1.3, -0.05],
      [0, 1.03, -0.15],
      [0, 0.76, -0.23],
      [0, 0.5, -0.28],
      [0, 0.26, -0.31],
    ],
    k = t.addChain("cloak", e.chest, _.slice(0, 4));
  t.chain({
    joints: k,
    tip: [0, -0.24, -0.03],
    stiffness: 3.4,
    drag: 0.92,
    gravity: 8,
    maxAngle: 68,
    wind: 2.4,
    colliders: [
      { joint: e.hips, x: 0, y: -0.12, z: 0.1, r: 0.36 },
      { joint: e.chest, x: 0, y: 0, z: 0.08, r: 0.3 },
    ],
  });
  const M = (R, I) => {
    const P = R >= 0,
      F = P ? e.thighL : e.thighR,
      L = P ? e.shinL : e.shinR;
    return I >= 0.9
      ? [e.hips, e.hips, 1]
      : I >= 0.5
        ? [e.hips, F, 1 - (0.9 - I) / 0.4]
        : [F, L, 1 - hi((0.5 - I) / 0.4) * 0.6];
  };
  i.sym((R) => {
    (i.bone(R > 0 ? e.footL : e.footR).paint(ie.cloakDark, { c2: ie.cloak, mat: K.cloth }),
      i.tube(
        [
          [s.hipX, 0.05, -0.07, 0.06, 0.045],
          [s.hipX, 0.06, 0.07, 0.07, 0.055],
          [s.hipX, 0.075, 0.21, 0.05, 0.036],
          [s.hipX, 0.12, 0.25, 0.03, 0.02],
        ],
        { seg: 6 },
      ),
      i.bone(R > 0 ? e.shinL : e.shinR).paint(ie.robeShade, { mat: K.cloth }),
      i.limb([s.hipX, s.kneeY, 0], [s.hipX, s.ankleY, 0], 0.07, 0.055, { seg: 5 }));
  });
  const S = [
      [0.05, 0.46, 0.46],
      [0.09, 0.445, 0.445],
      [0.3, 0.365, 0.365],
      [0.55, 0.28, 0.27],
      [0.8, 0.215, 0.185],
      [0.94, 0.19, 0.155],
      [1, 0.16, 0.125],
    ],
    b = (R, I) => 1 + (I < 4 ? 0.04 * (1 - I / 4) * Math.sin(R * 8) : 0);
  (i.bind(M).paint(ie.hem, { c2: ie.robe, ao: 0.9, ao2: 1, mat: K.cloth, by: (R, I) => (I - 0.08) / 0.34 }),
    i.lathe(S, { seg: 16, cap0: !1, cap1: !1, shape: b }),
    i.paint(ie.robeShade, { c2: ie.hem, glow: 0.06, mat: K.cloth, line: 0 }),
    i.lathe(
      [
        [0.05, 0.02, 0.02],
        [0.058, 0.452, 0.452],
      ],
      { seg: 16, cap1: !1 },
    ),
    i.paint(ie.hem, { c2: ie.robe, ao: 0.9, ao2: 1, mat: K.cloth }));
  const w = (R) => {
    for (let I = 1; I < S.length; I++)
      if (R <= S[I][0]) return bt(S[I - 1][1], S[I][1], (R - S[I - 1][0]) / (S[I][0] - S[I - 1][0]));
    return 0.16;
  };
  (i.paint(ie.trimDark, { c2: ie.trim, mat: K.cloth }),
    i.lathe(
      [
        [0.04, 0.465, 0.465],
        [0.05, 0.48, 0.48],
        [0.105, 0.455, 0.455],
        [0.11, 0.435, 0.435],
      ],
      { seg: 16, cap0: !1, cap1: !1, shape: (R) => 1 + 0.04 * Math.sin(R * 8) },
    ),
    i.paint(ie.trim, { c2: ie.trimDark, mat: K.cloth, line: 0 }),
    i.sheet(
      8,
      1,
      (R, I) => {
        const P = bt(0.97, 0.13, R) + (I - 0.5) * 0.07,
          F = bt(40, 200, R) * vw,
          L = w(P) * (1 + (P < 0.55 ? 0.04 * (1 - P / 0.55) * Math.sin(F * 8) : 0)) + 0.01;
        return [Math.cos(F) * L, P, Math.sin(F) * L * (P > 0.7 ? 0.86 : 1)];
      },
      !1,
    ),
    i.bind(Bl(n)).paint(ie.robeShade, { c2: ie.robe, mat: K.cloth, gloss: 0.1 }),
    i.lathe(
      [
        [0.86, 0.185, 0.15],
        [0.95, 0.178, 0.14],
        [1.02, 0.145, 0.114],
        [1.12, 0.162, 0.13],
        [1.22, 0.195, 0.152],
        [1.32, 0.2, 0.138],
        [1.385, 0.13, 0.105],
        [1.425, 0.07, 0.066],
      ],
      { seg: 12 },
    ),
    i.bone(e.neck).paint(ie.skin, { ao: 0.78, glow: 0.05, mat: K.skin }),
    i.lathe(
      [
        [1.4, 0.06, 0.06],
        [1.52, 0.058, 0.058],
      ],
      { seg: 8, cap0: !1 },
    ),
    i.bone(e.chest).paint(ie.trim, { c2: ie.trimDark, mat: K.cloth }),
    i.tube(
      [
        [0.075, 1.44, 0.05, 0.03, 0.01],
        [0.045, 1.36, 0.128, 0.032, 0.01],
        [-0.03, 1.25, 0.152, 0.032, 0.01],
        [-0.11, 1.12, 0.128, 0.03, 0.01],
      ],
      { seg: 4, up: [1, 0.4, 0] },
    ),
    i.tube(
      [
        [-0.075, 1.44, 0.05, 0.03, 0.01],
        [-0.045, 1.37, 0.122, 0.03, 0.01],
        [0, 1.31, 0.14, 0.028, 0.01],
      ],
      { seg: 4, up: [1, -0.4, 0] },
    ),
    i.bone(e.spine).paint(ie.trim, { c2: ie.trimDark, mat: K.cloth }),
    i.lathe(
      [
        [0.965, 0.184, 0.148],
        [0.985, 0.17, 0.134],
        [1.06, 0.153, 0.121],
        [1.075, 0.147, 0.117],
      ],
      { seg: 12 },
    ),
    i.paint(ie.gold, { c2: ie.goldDark, gloss: 1, mat: K.metal }),
    i.g(pt(0, 1.02, 0.132, 0, 0, 0), () =>
      i.extrude(
        [
          [0, 0.04],
          [0.035, 0],
          [0, -0.04],
          [-0.035, 0],
        ],
        0.018,
        0.006,
      ),
    ));
  for (const [R, I] of [
    [y, 1],
    [v, -1],
  ]) {
    const P = g(I);
    (i.bind(Zi(R, P, e.hips)).paint(16777215, { team: 1, mat: K.cloth }),
      Js(i, P, {
        width: (F) => bt(0.038, 0.058, F),
        axis: [1, 0, 0],
        bow: [0, 0, 0.012],
        nu: 2,
        nv: 6,
        tail: "swallow",
        tailLen: 0.09,
        wave: 0.5,
      }));
  }
  (i.sym((R) => {
    const I = s.shoulderX;
    (i.bone(R > 0 ? e.armL : e.armR).paint(ie.cloakLight, { c2: ie.cloak, mat: K.cloth }),
      i.limb([I, s.shoulderY + 0.03, 0], [I, s.elbowY + 0.03, 0], 0.096, 0.1, { seg: 8 }),
      i.g(pt(I, 0, 0), () =>
        _p(i, 0.1, 0.1, 0.028, 0.026, { c: ie.fur, c2: ie.furShade, tufts: 6, seg: 5, y: s.elbowY + 0.03 }),
      ),
      i.bone(R > 0 ? e.foreL : e.foreR).paint(ie.robeShade, { c2: ie.robe, mat: K.cloth, gloss: 0.1 }),
      i.lathe(
        [
          [s.wristY - 0.04, 0.108, 0.108, I, 0],
          [s.wristY + 0.01, 0.104, 0.104, I, 0],
          [s.wristY + 0.14, 0.082, 0.082, I, 0],
          [s.elbowY + 0.03, 0.066, 0.066, I, 0],
        ],
        { seg: 10, cap0: !1 },
      ),
      i.paint(16777215, { team: 1, mat: K.cloth, ao: 0.8, line: 0 }),
      i.lathe(
        [
          [s.wristY - 0.008, 0.062, 0.064, I, 0],
          [s.wristY - 0.037, 0.103, 0.103, I, 0],
        ],
        { seg: 10, cap0: !1, cap1: !1 },
      ),
      i.paint(ie.robeShade, { c2: ie.robe, mat: K.cloth }),
      i.lathe(
        [
          [s.wristY - 0.058, 0.03, 0.034, I, 0],
          [s.wristY - 0.058, 0.055, 0.06, I, 0],
          [s.wristY - 0.008, 0.062, 0.065, I, 0],
        ],
        { seg: 8, cap0: !1, cap1: !1 },
      ),
      i.paint(ie.trim, { c2: ie.trimDark, mat: K.cloth, line: 0 }),
      i.lathe(
        [
          [s.wristY - 0.062, 0.057, 0.062, I, 0],
          [s.wristY - 0.046, 0.059, 0.064, I, 0],
        ],
        { seg: 8, cap0: !1, cap1: !1 },
      ),
      i.paint(ie.trim, { c2: ie.trimDark, mat: K.cloth }),
      i.lathe(
        [
          [s.wristY + 0, 0.108, 0.108, I, 0],
          [s.wristY + 0.04, 0.101, 0.101, I, 0],
        ],
        { seg: 10, cap0: !1, cap1: !1 },
      ),
      i.g(pt(I, 0, 0), () =>
        _p(i, 0.108, 0.108, 0.03, 0.028, {
          c: ie.fur,
          c2: ie.furShade,
          tufts: 6,
          seg: 5,
          y: s.wristY - 0.04,
        }),
      ));
  }),
    i.paint(ie.skin, { glow: 0.07, mat: K.skin }),
    Ko(i, n, 1, 0.05, !0),
    Ko(i, n, -1, 0.05, !0),
    i.bone(e.chest).paint(ie.cloakLight, { c2: ie.cloakDark, ao: 0.9, mat: K.cloth }));
  {
    const R = [
      [1.475, 0.1, 0.1],
      [1.41, 0.29, 0.2],
      [1.31, 0.385, 0.27],
      [1.17, 0.415, 0.3],
    ];
    i.sheet(12, 3, (I, P) => {
      const F = bt(144, 396, I) * vw,
        L = R[Math.round(P * 3)],
        B = Math.pow(Math.abs(I * 2 - 1), 6);
      return [Math.cos(F) * L[1], L[0] - B * 0.07 * P, Math.sin(F) * L[2] - 0.015];
    });
  }
  i.bind(Zi(k, _, e.chest)).paint(ie.cloak, { c2: ie.cloakDark, mat: K.cloth });
  const T = (R) => Fi(0.3, 0.44, Math.sin(R * Math.PI * 0.5)),
    E = [0, 0.22, 0.44, 0.66, 0.84].map((R) => Li(_, R));
  (Js(i, E, { width: (R) => T(R * 0.84), bow: [0, 0, -0.19], wave: 0.16, nu: 6, nv: 8, tail: "flat" }),
    i.paint(16777215, { team: 1, mat: K.cloth }),
    Js(i, [Li(_, 0.84), Li(_, 0.9)], {
      width: (R) => T(0.84 + R * 0.06),
      bow: [0, 0, -0.19],
      nu: 6,
      nv: 1,
      tail: "flat",
    }),
    i.paint(ie.cloak, { c2: ie.cloakDark, mat: K.cloth }),
    Js(i, [Li(_, 0.9), Li(_, 0.97)], {
      width: (R) => T(0.9 + R * 0.07),
      bow: [0, 0, -0.19],
      nu: 6,
      nv: 1,
      tail: "flat",
    }));
  {
    const R = Li(_, 0.985),
      I = T(1),
      P = [];
    for (let F = 0; F <= 8; F++) {
      const L = (F / 8) * 2 - 1;
      P.push([R[0] + L * I, R[1], R[2] - 0.19 * (1 - L * L), 0.045, 0.04]);
    }
    R8(i, P, { c: ie.fur, c2: ie.furShade, tufts: 9, seg: 5, up: [0, 1, 0] });
  }
  (i.bone(e.chest),
    i.g(pt(0, 1.405, 0, 15, 0, 0), () =>
      _p(i, 0.215, 0.195, 0.1, 0.085, {
        c: ie.fur,
        c2: ie.furShade,
        tufts: 9,
        amp: 0.2,
        lobes: 6,
        lobeAmp: 0.12,
        seg: 7,
      }),
    ));
  const A = qh(i, n, ie.skin, u);
  (Xh(i, n, A, {
    iris: 4860966,
    irisGlow: 0.12,
    brow: ie.hair,
    browTilt: 4,
    browH: 0.012,
    browLen: 1.08,
    eyeW: 0.05,
    eyeH: 0.046,
    slant: 5,
    lash: 0.015,
    lip: ie.lip,
    skin: ie.skin,
    nose: 0.55,
    mouthW: 0.85,
    smile: 0.35,
    lite: !0,
  }),
    Cm(i, n, A, {
      c: ie.hair,
      c2: ie.hairHi,
      thick: 0.028,
      gloss: 0,
      line: (R) =>
        R < 0.8
          ? 0.15 - 0.045 * Math.sin((R / 0.8) * Math.PI * 0.5)
          : R < 1.3
            ? Fi(0.105, -0.12, (R - 0.8) / 0.5)
            : -0.3,
    }));
  const C = A.cy;
  (i.bone(e.head).paint(ie.hair, { c2: ie.hairHi, mat: K.fur }),
    i.sym(() =>
      i.tube(
        [
          [0.205, C + 0.07, 0.085, 0.034, 0.04],
          [0.235, C - 0.1, 0.09, 0.036, 0.036],
          [0.225, C - 0.3, 0.115, 0.028, 0.026],
          [0.21, C - 0.44, 0.13, 0.008, 0.008],
        ],
        { seg: 5, crease: 180 },
      ),
    ),
    i.ball(0, C + 0.3 * u, -0.04, 0.115, 0.1, 0.115, 1),
    i.ball(0, C + 0.4 * u, -0.06, 0.075, 0.065, 0.075, 1),
    i.paint(ie.gold, { c2: ie.goldDark, gloss: 1, mat: K.metal }),
    i.g(pt(0, C + 0.355 * u, -0.05, -8, 0, 0), () => i.torus(0.078, 0.012, 0.014, 8, 3, { crease: 30 })),
    i.tube(
      [
        [0.03, C + 0.33 * u, -0.02, 0.006],
        [0.2, C + 0.4 * u, 0.06, 0.006],
      ],
      { seg: 3 },
    ),
    i.g(pt(0.2, C + 0.41 * u, 0.065, 0, 30, -30), () =>
      i.extrude(
        [
          [0, 0.05],
          [0.03, 0.01],
          [0.018, -0.03],
          [-0.018, -0.03],
          [-0.03, 0.01],
        ],
        0.008,
        0,
      ),
    ),
    i.paint(ie.gold, { c2: 16770728, gloss: 1, glow: 0.12, mat: K.metal }),
    i.ball(0.19, C + 0.335 * u, 0.075, 0.014, 0.018, 0.014, 0),
    i.ball(0.215, C + 0.325 * u, 0.055, 0.012, 0.016, 0.012, 0),
    i.paint(ie.lip, { glow: 0.1, line: 0 }),
    i.g(pt(0, C + 0.085 * u, A.surf(0, C + 0.085 * u) + 0.002, -12, 0, 0), () =>
      i.extrude(
        [
          [0, 0.022],
          [0.012, 0.004],
          [0.007, -0.016],
          [-0.007, -0.016],
          [-0.012, 0.004],
        ],
        0.006,
        0,
      ),
    ));
  {
    const R = A.ring(0.17 * u);
    (i.bone(e.head),
      i.g(pt(0, C + 0.168 * u, R[2], -9, 0, 0), () =>
        _p(i, R[0] + 0.03, R[1] + 0.03, 0.052, 0.05, {
          c: ie.fur,
          c2: ie.furShade,
          tufts: 9,
          amp: 0.18,
          lobes: 5,
          seg: 6,
        }),
      ));
  }
  return (
    i.bind(Zi(p, x, e.head)).paint(ie.hair, { c2: ie.hairHi, mat: K.fur }),
    i.tube(
      [
        [0, m - 0.06, -0.2, 0.09, 0.05],
        [0, m - 0.2, -0.27, 0.085, 0.05],
        [0, 1.36, -0.335, 0.072, 0.045],
        [0, 1.16, -0.37, 0.06, 0.04],
        [0, 0.98, -0.38, 0.04, 0.03],
        [0, 0.8, -0.385, 0.008, 0.008],
      ],
      { seg: 7, up: [1, 0, 0], crease: 180 },
    ),
    i.paint(ie.cloakLight, { c2: ie.cloak, mat: K.cloth }),
    i.tube(
      [
        [0, 1.2, -0.365, 0.066, 0.046],
        [0, 1.14, -0.372, 0.064, 0.044],
      ],
      { seg: 7, up: [1, 0, 0], cap0: !1, cap1: !1 },
    ),
    i.bone(c),
    i.g(o, () => {
      (i.paint(ie.woodDeep, { c2: ie.woodDark, gloss: 0.5, mat: K.leather }),
        i.lathe(
          [
            [-0.27, 0.03, 0.02, 0, -0.01],
            [-0.235, 0.115, 0.045, 0, -0.012],
            [-0.14, 0.165, 0.056, 0, -0.016],
            [-0.03, 0.172, 0.056, 0, -0.016],
            [0.08, 0.13, 0.048, 0, -0.012],
            [0.18, 0.066, 0.036, 0, -0.006],
            [0.25, 0.034, 0.028, 0, 0],
          ],
          { seg: 10, crease: 180 },
        ),
        i.tube(
          [
            [0, 0.23, 0, 0.03, 0.026],
            [0, 0.5, 0.004, 0.024, 0.022],
          ],
          { seg: 6 },
        ),
        i.tube(
          [
            [0, 0.49, 0.004, 0.026, 0.022],
            [0, 0.56, -0.03, 0.03, 0.02],
            [0, 0.63, -0.1, 0.028, 0.018],
            [0, 0.645, -0.15, 0.02, 0.016],
            [0, 0.61, -0.17, 0.008, 0.008],
          ],
          { seg: 5, crease: 180 },
        ),
        i.paint(ie.woodShade, { c2: ie.wood, gloss: 0.5, mat: K.leather }));
      for (const [F, L, B] of [
        [0.55, -0.025, 1],
        [0.59, -0.062, -1],
        [0.615, -0.092, 1],
        [0.635, -0.125, -1],
      ])
        i.tube(
          [
            [B * 0.02, F, L, 0.012],
            [B * 0.085, F + 0.006, L, 0.016],
            [B * 0.1, F + 0.008, L, 0.01],
          ],
          { seg: 4 },
        );
      i.paint(ie.woodShade, { c2: ie.wood, gloss: 0.5, mat: K.leather });
      const R = [],
        I = [
          [-0.262, 0.03],
          [-0.228, 0.108],
          [-0.14, 0.157],
          [-0.03, 0.164],
          [0.08, 0.122],
          [0.18, 0.06],
          [0.245, 0.03],
        ];
      for (const [F, L] of I) R.push([L, F]);
      for (let F = I.length - 1; F >= 0; F--) R.push([-I[F][1], I[F][0]]);
      (i.g(pt(0, 0, 0.03), () => i.extrude(R, 0.024, 0.006)),
        i.paint(ie.cloak, { c2: ie.cloakLight, gloss: 0.5, mat: K.leather, line: 0 }),
        i.g(pt(0, -0.06, 0.044), () =>
          i.extrude(
            [
              [-0.085, 0.05],
              [0.085, 0.05],
              [0.1, -0.03],
              [0.06, -0.06],
              [-0.06, -0.06],
              [-0.1, -0.03],
            ],
            0.006,
            0,
          ),
        ),
        i.paint(ie.gold, { c2: 16773312, gloss: 1, glow: 0.2, mat: K.metal, line: 0 }));
      const P = [];
      for (let F = 0; F <= 6; F++) {
        const L = Math.PI * (0.15 + (0.7 * F) / 6);
        P.push([Math.cos(L) * 0.05, -Math.sin(L) * 0.05 + 0.03]);
      }
      for (let F = 6; F >= 0; F--) {
        const L = Math.PI * (0.15 + (0.7 * F) / 6);
        P.push([Math.cos(L) * 0.05, -Math.sin(L) * 0.026 + 0.036]);
      }
      (i.g(pt(0, -0.075, 0.049), () => i.extrude(P, 0.005, 0)),
        i.paint(ie.woodDeep, { gloss: 0.5, mat: K.leather, line: 0 }),
        i.box(0, -0.17, 0.05, 0.1, 0.022, 0.018, 0.004),
        i.paint(ie.wood, { c2: 16773848, gloss: 0.4, mat: K.leather, line: 0 }));
      for (const F of [0.12, 0.2, 0.28, 0.36, 0.44])
        i.box(0, F, F < 0.22 ? 0.046 : 0.03, F < 0.22 ? 0.07 : 0.05, 0.012, 0.012);
      i.paint(ie.string, { c2: 16777215, glow: 0.35, gloss: 1, mat: K.metal, line: 0 });
      for (const F of [-0.027, -0.009, 0.009, 0.027])
        i.tube(
          [
            [F, -0.17, 0.062, 0.0055],
            [F * 0.9, 0.1, 0.056, 0.0055],
            [F * 0.7, 0.49, 0.036, 0.005],
          ],
          { seg: 3 },
        );
    }),
    i.bakeGrounding(2.05, 0.75, 0.9),
    {
      h: n,
      b: i,
      extra: {
        pipa: c,
        pipaPos: f,
        pluck: d,
        free: h,
        ax: [l(1, 0, 0), l(0, 1, 0), l(0, 0, 1)],
        handR: (() => {
          const R = l(-0.09, -0.02, 0.11);
          return [R[0] - 0.02, R[1] + 0.03, R[2] + 0.01];
        })(),
        handL: (() => {
          const R = l(0, 0.3, 0);
          return [R[0] + 0.03, R[1] - 0.06, R[2] + 0.02];
        })(),
        face: l(0, -0.04, 0.07),
      },
    }
  );
}

const bw = {
  ...Rm,
  stride: 2.1,
  stance: 0.42,
  lift: 0.14,
  bob: 0.028,
  drop: 0.03,
  lean: 11,
  twist: 4,
  sway: 0.02,
  width: 0.1,
  arm: 0,
};

function HU(n) {
  const t = ge(n, null, {
      hipsPos: [0, -0.01, 0],
      hips: [0, -10, 2],
      spine: [1, 4, -2],
      chest: [2, 4, 0],
      neck: [6, 2, 0],
      head: [8, 6, -3],
      footL: [0.11, 0.09, 0.06, 0, 10],
      footR: [-0.12, 0.09, -0.05, 0, -16],
    }),
    e = ge(n, t, {
      hips: [0, -16, 2],
      chest: [-2, -4, 0],
      head: [2, 14, -2],
      pipa: [-8, 0, 4],
      pluck: [0.02, 0.13, 0.07],
    }),
    s = ge(n, t, {
      hipsPos: [0, -0.03, 0.04],
      hips: [2, -2, 0],
      chest: [6, 10, 0],
      head: [0, -6, 0],
      pipa: [14, 0, -4],
      pipaPos: [0, 0, 0.05],
      pluck: [-0.03, -0.14, 0.02],
    }),
    i = ge(n, s, { pluck: [-0.1, -0.2, 0.12] }),
    a = zs([
      [0, t],
      [0.2, e, he.out],
      [0.35, s, he.in3],
      [0.5, i, he.out],
      [1, t, he.io],
    ]),
    o = ge(n, t, {
      hipsPos: [0, -0.03, -0.05],
      hips: [-2, -22, 0],
      spine: [-4, -6, 0],
      chest: [-6, -12, 0],
      head: [2, 30, 0],
      pipa: [-12, 0, 8],
      pluck: [0.04, 0.06, 0],
    }),
    r = ge(n, t, {
      hipsPos: [0, -0.07, 0.12],
      hips: [8, 6, 0],
      spine: [8, 6, 0],
      chest: [10, 12, 0],
      neck: [-8, 0, 0],
      head: [-10, -14, 0],
      footL: [0.11, 0.09, 0.26, 0, 8],
      footR: [-0.12, 0.1, -0.14, 16, -20],
      pipa: [42, -8, -6],
      pipaPos: [0.02, 0.05, 0.1],
      pluck: [-0.16, -0.06, 0.26],
    }),
    l = zs([
      [0, t],
      [0.24, o, he.out],
      [0.42, r, he.in3],
      [0.72, r, he.lin],
      [1, t, he.io],
    ]),
    c = ge(n, t, {
      hipsPos: [0, -0.03, 0.05],
      hips: [4, -4, 0],
      chest: [8, 6, 0],
      head: [-4, -4, 0],
      pipa: [20, 0, -6],
      pipaPos: [0, 0, 0.05],
      pluck: [-0.18, 0.02, 0.24],
    }),
    f = ge(n, t, {
      hipsPos: [0, -0.02, -0.07],
      hips: [-6, -14, 0],
      spine: [-6, 0, 0],
      chest: [-8, -6, 0],
      neck: [-6, 0, 0],
      head: [-12, 10, 0],
      footR: [-0.12, 0.09, -0.16, 0, -20],
      pipa: [-16, 6, 16],
      pipaPos: [0.02, 0.06, -0.03],
      pluck: [0.07, 0.1, -0.01],
      free: [0, 0, -0.1],
    }),
    d = zs([
      [0, t],
      [0.3, c, he.out],
      [0.5, f, he.in3],
      [0.78, f, he.lin],
      [1, t, he.io],
    ]),
    h = ge(n, t, {
      hipsPos: [0, 0.03, -0.02],
      hips: [-4, 0, 0],
      spine: [-6, 0, 0],
      chest: [-10, 0, 0],
      neck: [-12, 0, 0],
      head: [-20, 0, 0],
      footL: [0.1, 0.11, 0.04, 14, 8],
      footR: [-0.11, 0.11, -0.04, 14, -12],
      pipa: [-10, 4, 12],
      pipaPos: [0.03, 0.1, 0],
      pluck: [0, 0.02, 0.01],
    }),
    u = zs([
      [0, t],
      [0.4, h, he.out],
      [1, h, he.lin],
    ]),
    m = ge(n, null, { pipa: [-6, 0, 4], pipaPos: [0, 0.02, -0.01], head: [-4, 0, 0] }),
    x = ge(n, t, {
      hipsPos: [0, -0.03, 0],
      chest: [6, 0, 0],
      neck: [10, 0, 0],
      head: [16, 0, 0],
      pipa: [-6, 0, 6],
      pluck: [0.05, 0.02, -0.02],
    }),
    p = Wh(n, t, {
      lying: {
        free: [1, 1, 0],
        pipaPos: [0.5, -0.1, -0.02],
        pipa: [14, 0, 70],
        armL: [-6, 0, 60],
        foreL: [-24, 0, 0],
        armR: [-4, 0, -66],
        foreR: [-16, 0, 0],
      },
    });
  return { stance: t, tmp: jl(n), atk: a, s1: l, s2: d, ult: u, run: m, channel: x, common: p };
}

const a0 = new Float32Array(8);

function $U() {
  const { h: n, b: t, extra: e } = BU(),
    s = HU(n),
    i = n.J,
    a = s.tmp,
    o = t.build(),
    r = e.pipaPos * 3,
    l = e.pluck * 3,
    c = e.free * 3,
    [f, d, h] = e.ax,
    u = (x, p, g = 0) => {
      x.pos(e.pipa, p[r], p[r + 1], p[r + 2]);
      const y = x.q,
        v = 1 - hi(p[c + 1]);
      if (v > 0.01) {
        for (let M = 0; M < 4; M++) ((a0[M] = y[i.armL * 4 + M]), (a0[4 + M] = y[i.foreL * 4 + M]));
        const k = p[c + 2];
        (P0(
          n,
          x,
          1,
          e.pipa,
          e.handL[0] + d[0] * k,
          e.handL[1] + d[1] * k,
          e.handL[2] + d[2] * k,
          0.6,
          -0.75,
          -0.3,
        ),
          v < 0.99 && (S0(y, i.armL * 4, a0, 0, v), S0(y, i.foreL * 4, a0, 4, v)));
      }
      const _ = 1 - hi(p[c]);
      if (_ > 0.01) {
        for (let b = 0; b < 4; b++) ((a0[b] = y[i.armR * 4 + b]), (a0[4 + b] = y[i.foreR * 4 + b]));
        const k = p[l],
          M = p[l + 1] + g,
          S = p[l + 2];
        (P0(
          n,
          x,
          -1,
          e.pipa,
          e.handR[0] + f[0] * k + d[0] * M + h[0] * S,
          e.handR[1] + f[1] * k + d[1] * M + h[1] * S,
          e.handR[2] + f[2] * k + d[2] * M + h[2] * S,
          -0.75,
          -0.55,
          -0.25,
        ),
          _ < 0.99 && (S0(y, i.armR * 4, a0, 0, _), S0(y, i.foreR * 4, a0, 4, _)));
      }
    },
    m = (x, p, g) => {
      const y = s.common;
      if (jh(n, x, p.anim === "leap" ? "airborne" : p.anim, p.t, p.p, p.time, y)) {
        (u(x, (p.anim === "dead" ? y.tmp : p.anim === "stunned" ? y.stun : y.air).e),
          p.anim === "dead" && (g.glow = Math.max(0.1, 1 - p.t * 1.2)));
        return;
      }
      let v = 0,
        _ = 0;
      switch (p.anim) {
        case "move":
        case "dash": {
          const k = s.run.e;
          (Mf(n, x, p.stride, bw, () => {
            (x.add(i.head, k[i.head * 3], 0, 0),
              x.rot(e.pipa, k[e.pipa * 3] + Math.sin(p.stride * Math.PI * 4) * 1.5, 0, k[e.pipa * 3 + 2]));
          }),
            u(x, k));
          break;
        }
        case "attack": {
          const k = Vh(p.p, p.windup);
          (ta(s.atk, k, a), Un(n, x, a), u(x, a.e), (v = ho(k, 0.36, 0.2) * 0.7));
          break;
        }
        case "cast_s1": {
          (ta(s.s1, p.p, a), Un(n, x, a), u(x, a.e), (v = ho(p.p, 0.44, 0.34)));
          break;
        }
        case "cast_s2": {
          (ta(s.s2, p.p, a), Un(n, x, a), u(x, a.e), (v = ho(p.p, 0.5, 0.36)));
          break;
        }
        case "cast_ult":
        case "spin": {
          ta(s.ult, p.p, a);
          const k = Math.min(1, p.p * 3) * (1 - 0.6 * p.p);
          ((_ = Math.sin(p.t * 44) * 0.035 * k),
            Un(n, x, a, () => {
              x.add(i.chest, 0, Math.sin(p.t * 44) * 1.2 * k, 0);
            }),
            u(x, a.e, _),
            (v = Math.min(1, p.p * 3) * (0.8 + 0.2 * Math.sin(p.t * 44))));
          break;
        }
        case "channel": {
          (Un(n, x, s.channel, () => Yo(n, x, p.time, p.seed, 0.8)),
            u(x, s.channel.e),
            (v = 0.2 + 0.1 * Math.sin(p.time * 4)));
          break;
        }
        default: {
          const k = (p.time * 0.36 + p.seed) % 1,
            M = ho(k, 0.5, 0.07);
          ((_ = -M * 0.05),
            Un(n, x, s.stance, () => {
              (Yo(n, x, p.time, p.seed),
                x.add(i.head, M * 2, 0, 0),
                x.add(i.hips, 0, 0, Math.sin(p.time * 0.8 + p.seed * 4) * 1.2));
            }),
            u(x, s.stance.e, _),
            (v = M * 0.3));
        }
      }
      g.glow = 1 + v * 2.6 + 0.08 * Math.sin(p.time * 2.6);
    };
  return {
    key: "hero:xingli",
    geometry: o,
    rig: n.rig,
    height: 2.14,
    radius: 0.6,
    scale: yw,
    stride: bw.stride * yw,
    triangles: t.triangleCount,
    attach: {
      head: { joint: i.head, x: 0, y: 0.25, z: 0 },
      chest: { joint: i.chest, x: 0, y: 0.08, z: 0 },
      handR: { joint: i.handR, x: 0, y: -0.07, z: 0 },
      handL: { joint: i.handL, x: 0, y: -0.07, z: 0 },
      weapon: { joint: e.pipa, x: e.face[0], y: e.face[1], z: e.face[2] },
      muzzle: { joint: e.pipa, x: e.face[0], y: e.face[1], z: e.face[2] },
    },
    blend: (x, p) =>
      p === "attack"
        ? 0.08
        : p === "dead"
          ? 0.05
          : p.startsWith("cast_")
            ? 0.07
            : x.startsWith("cast_")
              ? 0.3
              : 0.14,
    animate: m,
  };
}

const me = {
    suit: 2367536,
    suitHi: 4865894,
    suitDark: 1578015,
    sash: 4864632,
    sashDark: 2892360,
    scarf: 15526110,
    scarfShade: 13222836,
    ink: 1709606,
    leather: 4075046,
    leatherLight: 6967360,
    bronze: 11043900,
    bronzeDark: 7230756,
    steel: 10470088,
    steelDark: 6191746,
    edge: 14218482,
    plain: 12106948,
    skin: 14857872,
    hair: 1578524,
    hairHi: 3814980,
    tube: 5909022,
    tubeDark: 3413519,
    silk: 15261638,
    silkShade: 12563092,
  },
  GU = { ...Am, hipX: 0.11, shoulderX: 0.275, clavX: 0.08 },
  _w = 1.17,
  io = 5,
  Sp = 1.05;

function VU() {
  const n = Gh(GU),
    { rig: t, J: e, d: s } = n,
    i = new Ls(),
    a = 0.94,
    o = [
      [0.05, 1.42, -0.16],
      [0.1, 1.32, -0.42],
      [0.12, 1.1, -0.64],
      [0.12, 0.84, -0.78],
      [0.1, 0.56, -0.86],
      [0.08, 0.28, -0.9],
    ],
    r = t.addChain("scarf", e.chest, o.slice(0, 5));
  t.chain({
    joints: r,
    tip: [-0.02, -0.28, -0.04],
    stiffness: 2.6,
    drag: 0.93,
    gravity: 5,
    maxAngle: 80,
    wind: 3.4,
    colliders: [{ joint: e.chest, x: 0, y: 0, z: 0, r: 0.24 }],
  });
  const l = [
      [-0.07, 1.42, -0.15],
      [-0.14, 1.28, -0.36],
      [-0.17, 1.06, -0.5],
      [-0.18, 0.82, -0.56],
    ],
    c = t.addChain("scarfB", e.chest, l.slice(0, 3));
  t.chain({
    joints: c,
    tip: [0, -0.24, -0.06],
    stiffness: 3.4,
    drag: 0.92,
    gravity: 6,
    maxAngle: 80,
    wind: 3,
    colliders: [{ joint: e.chest, x: 0, y: 0, z: 0, r: 0.24 }],
  });
  const f = [
      [-0.17, 0.94, -0.06],
      [-0.24, 0.72, -0.12],
      [-0.27, 0.5, -0.16],
      [-0.28, 0.3, -0.18],
    ],
    d = t.addChain("sash", e.hips, f.slice(0, 3));
  t.chain({ joints: d, tip: [0, -0.2, -0.02], stiffness: 5, drag: 0.9, gravity: 9, maxAngle: 65, wind: 1.4 });
  const h = t.add("furl", e.handL, s.shoulderX, s.handY, 0),
    u = (b) => [s.shoulderX, s.handY - 0.02 - b * Sp, 0.05 + 0.3 * Math.sin(b * Math.PI * 0.55)],
    m = Array.from({ length: io + 1 }, (b, w) => u(w / io)),
    x = m.slice(1).map((b, w) => t.add(`furl${w + 1}`, h, b[0], b[1], b[2])),
    p = (b, w) => {
      const T = b >= 0 ? e.thighL : e.thighR;
      return w >= 0.92 ? [e.hips, e.hips, 1] : [e.hips, T, hi((w - 0.6) / 0.32)];
    };
  i.sym((b) => {
    const w = s.hipX;
    (i.bone(b > 0 ? e.thighL : e.thighR).paint(me.suit, { c2: me.suitDark, ao: 0.9, ao2: 1, mat: K.cloth }),
      i.limb([w, s.hipY + 0.04, 0], [w, s.kneeY, 0], 0.108, 0.082, { seg: 8, bulge: 0.04 }));
  });
  for (const b of [1, -1]) {
    (i.paint(me.suitDark, { c2: me.leather, mat: K.leather, gloss: 0.15 }),
      Ox(i, n, b, { top: 0.32, rTop: 0.082, rAnkle: 0.066, len: 0.22, toe: 0.01 }),
      i.bone(b > 0 ? e.shinL : e.shinR).paint(me.suitHi, { c2: me.suit, mat: K.cloth }));
    for (const w of [0.32, 0.38, 0.44])
      i.g(pt(b * s.hipX, w, 0, 14, 0, 0), () => i.torus(0.084, 0.009, 0.014, 8, 3, { crease: 30 }));
  }
  (i
    .bind(p)
    .paint(me.suit, { c2: me.suitDark, ao: 0.9, ao2: 1, mat: K.cloth, by: (b, w) => (w - 0.62) / 0.32 }),
    i.lathe(
      [
        [0.62, 0.19, 0.17],
        [0.72, 0.185, 0.162],
        [0.84, 0.175, 0.145],
        [0.94, 0.168, 0.136],
      ],
      { seg: 12, cap0: !1, cap1: !1, shape: (b, w) => 1 + (w < 2 ? 0.035 * Math.sin(b * 5) : 0) },
    ),
    i.paint(me.suitHi, { c2: me.suit, mat: K.cloth }),
    i.lathe(
      [
        [0.61, 0.193, 0.173],
        [0.62, 0.197, 0.177],
        [0.66, 0.193, 0.173],
      ],
      { seg: 12, cap0: !1, cap1: !1, shape: (b) => 1 + 0.035 * Math.sin(b * 5) },
    ),
    i.bind(Bl(n)).paint(me.suit, { c2: me.suitHi, ao: 0.88, ao2: 1, mat: K.cloth }),
    i.lathe(
      [
        [0.86, 0.172, 0.138],
        [0.94, 0.168, 0.132],
        [1, 0.145, 0.112],
        [1.1, 0.165, 0.126],
        [1.21, 0.205, 0.146],
        [1.33, 0.215, 0.14],
        [1.39, 0.14, 0.108],
        [1.43, 0.072, 0.068],
      ],
      { seg: 12 },
    ),
    i.bone(e.neck).paint(me.skin, { ao: 0.75, glow: 0.05, mat: K.skin }),
    i.lathe(
      [
        [1.4, 0.058, 0.058],
        [1.53, 0.056, 0.056],
      ],
      { seg: 8, cap0: !1 },
    ),
    i.bone(e.chest).paint(me.suitHi, { c2: me.suit, mat: K.cloth }),
    i.tube(
      [
        [0.07, 1.44, 0.05, 0.026, 0.01],
        [0.04, 1.37, 0.118, 0.028, 0.01],
        [-0.04, 1.26, 0.142, 0.028, 0.01],
        [-0.11, 1.12, 0.122, 0.026, 0.01],
      ],
      { seg: 4, up: [1, 0.4, 0] },
    ),
    i.tube(
      [
        [-0.07, 1.44, 0.05, 0.026, 0.01],
        [-0.045, 1.38, 0.112, 0.026, 0.01],
        [0, 1.32, 0.13, 0.024, 0.01],
      ],
      { seg: 4, up: [1, -0.4, 0] },
    ),
    i.paint(me.leather, { c2: me.leatherLight, gloss: 0.3, mat: K.leather }),
    i.tube(
      [
        [-0.19, 1.39, 0.06, 0.028, 0.012],
        [-0.07, 1.27, 0.15, 0.03, 0.012],
        [0.08, 1.12, 0.14, 0.03, 0.012],
        [0.16, 1.03, 0.07, 0.028, 0.012],
        [0.17, 1, -0.06, 0.028, 0.012],
      ],
      { seg: 4, up: [0, 0.6, 0.8] },
    ),
    i.paint(me.bronze, { c2: me.bronzeDark, gloss: 1, mat: K.metal }),
    i.g(pt(-0.07, 1.27, 0.158, 0, 0, 40), () => i.box(0, 0, 0, 0.04, 0.03, 0.014, 0.006)),
    i.bone(e.spine).paint(me.sash, { c2: me.sashDark, mat: K.cloth }),
    i.lathe(
      [
        [0.9, 0.18, 0.146],
        [0.92, 0.186, 0.15],
        [1.02, 0.158, 0.124],
        [1.04, 0.15, 0.118],
      ],
      { seg: 12 },
    ),
    i.paint(16777215, { team: 1, mat: K.cloth }),
    i.lathe(
      [
        [0.955, 0.183, 0.148],
        [0.965, 0.186, 0.151],
        [0.985, 0.17, 0.138],
      ],
      { seg: 12, cap0: !1, cap1: !1 },
    ),
    i.bind(Zi(d, f, e.hips)).paint(me.sash, { c2: me.sashDark, mat: K.cloth }),
    Js(i, f, {
      width: (b) => bt(0.05, 0.072, b),
      axis: [0.3, 0, 1],
      bow: [-0.015, 0, 0],
      nu: 2,
      nv: 6,
      tail: "swallow",
      tailLen: 0.1,
      wave: 0.4,
    }),
    i.bone(e.hips));
  for (let b = 0; b < 3; b++)
    i.g(pt(-0.06 + b * 0.06, 0.97, -0.16, 0, 0, 180 + (b - 1) * 14), () => {
      (i.paint(me.leather, { mat: K.leather }),
        i.tube(
          [
            [0, -0.02, 0, 0.012],
            [0, 0.06, 0, 0.012],
          ],
          { seg: 4 },
        ),
        i.paint(me.plain, { c2: me.steelDark, gloss: 1, mat: K.metal }),
        i.tube(
          [
            [0, 0.06, 0, 0.004, 0.022],
            [0, 0.11, 0, 0.004, 0.02],
            [0, 0.17, 0, 0.002, 0.003],
          ],
          { seg: 4, up: [1, 0, 0], crease: 0 },
        ));
    });
  (i.sym((b) => {
    const w = s.shoulderX;
    (i.bone(b > 0 ? e.armL : e.armR).paint(me.suit, { c2: me.suitHi, ao: 0.9, ao2: 1, mat: K.cloth }),
      i.ball(w, s.shoulderY, 0, 0.078, 0.078, 0.078, 1),
      i.limb([w, s.shoulderY, 0], [w, s.elbowY, 0], 0.072, 0.06, { seg: 8 }),
      i.bone(b > 0 ? e.foreL : e.foreR).paint(me.suit, { c2: me.suitHi, mat: K.cloth }),
      i.ball(w, s.elbowY, 0, 0.062, 0.062, 0.062, 1),
      i.limb([w, s.elbowY, 0], [w, s.wristY, 0], 0.058, 0.05, { seg: 8 }),
      i.paint(me.leather, { c2: me.leatherLight, gloss: 0.3, mat: K.leather }),
      i.lathe(
        [
          [s.wristY - 0.01, 0.058, 0.058, w, 0],
          [s.wristY + 0.02, 0.066, 0.066, w, 0],
          [s.wristY + 0.16, 0.07, 0.07, w, 0],
          [s.wristY + 0.175, 0.06, 0.06, w, 0],
        ],
        { seg: 8 },
      ),
      i.paint(16777215, { team: 1, mat: K.cloth }),
      Wd(i, w, s.wristY + 0.09, 0, 0.07, 0.07, 0.009, 0.022, 8));
  }),
    i.paint(me.skin, { glow: 0.06, ao: 0.9, mat: K.skin }),
    Ko(i, n, 1, 0.054),
    Ko(i, n, -1, 0.054),
    i.bone(e.chest),
    i.g(pt(0, 1.18, -0.23, 0, 0, -52), () => {
      (i.paint(me.tube, { c2: me.tubeDark, gloss: 0.55, mat: K.leather }),
        i.tube(
          [
            [0, -0.34, 0, 0.05],
            [0, 0.34, 0, 0.05],
          ],
          { seg: 8 },
        ),
        i.paint(me.bronze, { c2: me.bronzeDark, gloss: 1, mat: K.metal }));
      for (const b of [-0.34, 0.34])
        i.tube(
          [
            [0, b - 0.03, 0, 0.056],
            [0, b + 0.03, 0, 0.056],
          ],
          { seg: 8, crease: 30 },
        );
      (i.tube(
        [
          [0, 0.37, 0, 0.03],
          [0, 0.4, 0, 0.012],
        ],
        { seg: 6 },
      ),
        i.paint(16777215, { team: 1, mat: K.cloth }));
      for (const b of [-0.14, 0.14])
        i.tube(
          [
            [0, b - 0.012, 0, 0.054],
            [0, b + 0.012, 0, 0.054],
          ],
          { seg: 8, cap0: !1, cap1: !1 },
        );
    }));
  const g = qh(i, n, me.skin, a, 0.25, 0.98),
    y = g.cy;
  (Xh(i, n, g, {
    iris: 1971730,
    irisGlow: 0.04,
    irisSize: 0.6,
    brow: me.hair,
    browTilt: 16,
    browH: 0.02,
    browLen: 1.12,
    eyeW: 0.05,
    eyeH: 0.034,
    slant: 8,
    lash: 0.017,
    lip: 10117200,
    skin: me.skin,
    nose: 0.85,
    ears: !0,
    mouthW: 0.8,
    smile: -0.2,
    lite: !0,
  }),
    Cm(i, n, g, {
      c: me.hair,
      c2: me.hairHi,
      thick: 0.026,
      gloss: 0.3,
      line: (b) => (b < 0.8 ? 0.15 : b < 1.35 ? bt(0.15, -0.08, (b - 0.8) / 0.55) : -0.3),
    }),
    i.bone(e.head).paint(me.hair, { c2: me.hairHi, gloss: 0.3, mat: K.fur }),
    i.ball(0, y + 0.2, -0.17, 0.08, 0.075, 0.08, 1),
    i.ball(0, y + 0.25, -0.21, 0.055, 0.05, 0.055, 1));
  for (const [b, w, T] of [
    [0.12, 0.15, 0.03],
    [-0.13, 0.12, -0.03],
    [0.19, 0.22, 0.01],
    [-0.19, 0.2, -0.01],
  ]) {
    const E = y + 0.15;
    af(i, [b, E, g.surf(b, E) - 0.01], [b * 0.3, -1, 0.3], w, 0.03, {
      curl: [T, 0.02, 0.08],
      n: 3,
      seg: 4,
      flat: 0.45,
      up: [1, 0, 0],
      tip: 0.15,
    });
  }
  (i.paint(me.scarf, { c2: me.scarfShade, mat: K.cloth }),
    i.g(pt(0, y + 0.2, -0.15, 50, 0, 0), () => i.torus(0.074, 0.016, 0.02, 10, 3)),
    i.tube(
      [
        [0.02, y + 0.19, -0.24, 0.024, 0.006],
        [0.05, y + 0.08, -0.29, 0.03, 0.006],
        [0.08, y - 0.04, -0.3, 0.034, 0.005],
      ],
      { seg: 4, up: [1, 0, 0] },
    ),
    i.tube(
      [
        [-0.02, y + 0.19, -0.24, 0.024, 0.006],
        [-0.06, y + 0.1, -0.3, 0.03, 0.006],
        [-0.11, y + 0.01, -0.31, 0.034, 0.005],
      ],
      { seg: 4, up: [1, 0, 0] },
    ),
    i.bone(e.chest).paint(me.scarf, { c2: me.scarfShade, mat: K.cloth }),
    i.g(pt(0, 1.455, 0, 8, 0, 0, 1, 1, 0.92), () => i.torus(0.13, 0.05, 0.05, 12, 5)));
  const v = (b) => (0.1 + 0.06 * Math.sin(b * Math.PI * 0.7)) * (1 - 0.4 * Math.pow(b, 3)),
    _ = (b, w) => Math.pow(hi((1 - w) / 0.55), 1.3);
  (i.bind(Zi(r, o, e.chest)).paint(me.scarf, { c2: me.ink, mat: K.cloth, by: _ }),
    Js(i, o, { width: v, bow: [0, 0.03, 0], wave: 0.4, nu: 4, nv: 14, tail: "swallow", tailLen: 0.26 }),
    i.bind(Zi(c, l, e.chest)).paint(me.scarf, { c2: me.ink, mat: K.cloth, by: (b, w) => _(b, w + 0.2) }),
    Js(i, l, {
      width: (b) => 0.08 * (1 - 0.4 * b),
      bow: [0, 0.02, 0],
      wave: 0.35,
      nu: 3,
      nv: 8,
      tail: "swallow",
      tailLen: 0.18,
    }));
  const k = (b, w, T, E, A) => {
    (i.bone(b),
      i.g(pt(w, s.handY, 0), () => {
        (i.paint(me.leather, { c2: me.suitDark, mat: K.leather }),
          i.tube(
            [
              [0, 0, -0.06, 0.02],
              [0, 0, 0.1, 0.019],
            ],
            { seg: 6 },
          ),
          i.paint(me.bronze, { c2: me.bronzeDark, gloss: 1, mat: K.metal }),
          i.tube(
            [
              [0, 0, -0.06, 0.026, 0.05],
              [0, 0, -0.08, 0.026, 0.05],
            ],
            { seg: 6, crease: 30 },
          ),
          A
            ? i.g(pt(0, 0, 0.14, 0, 90, 0), () => i.torus(0.036, 0.009, 0.01, 8, 3, { crease: 30 }))
            : i.ball(0, 0, 0.115, 0.022, 0.022, 0.024, 0),
          i.paint(A ? me.steel : me.plain, { c2: me.steelDark, gloss: 1, mat: K.metal }));
        const C = [];
        for (let R = 0; R <= 6; R++) {
          const I = R / 6,
            P = E * 0.5 * Math.pow(Math.sin(Math.PI * (0.22 + I * 0.78)), 0.7);
          C.push([0, 0, -0.08 - I * T, 0.012 * (1 - I * 0.6), Math.max(0.004, P)]);
        }
        (i.tube(C, { seg: 4, up: [0, 1, 0], crease: 0 }),
          A &&
            (i.paint(me.edge, { glow: 0.25, gloss: 1, mat: K.metal, line: 0 }),
            i.tube(
              C.slice(1).map((R) => [R[0], R[1] - R[4] * 0.92, R[2], 0.004, 0.006]),
              { seg: 3, up: [0, 1, 0], crease: 0 },
            )));
      }));
  };
  (k(e.propR, -s.shoulderX, 0.42, 0.09, !0), k(e.propL, s.shoulderX, 0.28, 0.06, !1), i.bone(h));
  const M = (b) => (b <= 0 ? h : x[Math.min(io, b) - 1]),
    S = (b, w) => {
      const T = hi((s.handY - 0.02 - w) / Sp) * io,
        E = Math.min(io - 1, Math.floor(T + 1e-4));
      return [M(E), M(E + 1), hi(1 - (T - E))];
    };
  return (
    i.g(pt(s.shoulderX, s.handY - 0.02, 0), () => {
      (i.paint(me.tube, { c2: me.tubeDark, gloss: 0.5, mat: K.leather }),
        i.tube(
          [
            [-0.22, 0, 0.03, 0.02],
            [0.22, 0, 0.03, 0.02],
          ],
          { seg: 5 },
        ));
      const b = (T, E, A = 0) => [bt(-0.2, 0.2, T), -E * Sp, 0.05 + 0.3 * Math.sin(E * Math.PI * 0.55) + A];
      (i
        .bind(S)
        .paint(me.silk, { c2: me.silkShade, mat: K.cloth, by: (T, E) => hi((s.handY - 0.02 - E) / Sp) }),
        i.sheet(2, io, (T, E) => b(T, E)),
        i.paint(me.ink, { mat: K.cloth, line: 0 }));
      for (const [T, E] of [
        [0.3, 0.06],
        [0.55, 0.04],
      ]) {
        const A = [];
        for (let C = 0; C <= 6; C++) {
          const R = 0.1 + (C / 6) * 0.8,
            I = T - E * Math.abs(Math.sin(C * 1.7)),
            P = b(R, I, 0.006);
          A.push([P[0], P[1], P[2], 0.006, 0.003]);
        }
        i.tube(A, { seg: 3, up: [0, 0, 1] });
      }
      i.bone(x[io - 1]).paint(me.tube, { c2: me.tubeDark, gloss: 0.5, mat: K.leather });
      const w = b(0.5, 1);
      (i.tube(
        [
          [-0.21, w[1], w[2], 0.024],
          [0.21, w[1], w[2], 0.024],
        ],
        { seg: 5 },
      ),
        i.paint(me.silkShade, { c2: me.silk, mat: K.cloth }),
        i.tube(
          [
            [-0.19, w[1], w[2], 0.034],
            [0.19, w[1], w[2], 0.034],
          ],
          { seg: 6 },
        ));
    }),
    i.bakeGrounding(2.05, 0.72, 0.88),
    { h: n, b: i, extra: { furl: h, furlRows: x, furlPts: m } }
  );
}

const ww = {
  ...Rm,
  stride: 3,
  stance: 0.3,
  lift: 0.3,
  bob: 0.04,
  drop: 0.12,
  lean: 24,
  twist: 8,
  width: 0.1,
  arm: 0,
};

function WU(n) {
  const t = ge(n, null, {
      hipsPos: [0, -0.1, 0],
      hips: [6, -20, 0],
      spine: [5, 6, 0],
      chest: [4, 10, 0],
      neck: [-6, 0, 0],
      head: [-6, 8, 0],
      footL: [0.17, 0.09, 0.16, 0, 14],
      footR: [-0.19, 0.09, -0.16, 6, -34],
      armL: [-14, 0, 14],
      foreL: [-40, -10, 0],
      propL: [10, 0, 0],
      armR: [-6, 0, -18],
      foreR: [-70, 30, 0],
      propR: [6, 0, 0],
    }),
    e = ge(n, t, {
      hips: [8, -40, 0],
      chest: [4, -14, 0],
      head: [-8, 46, 0],
      armR: [10, 0, -80],
      foreR: [-100, 0, 0],
      propR: [0, -40, 0],
    }),
    s = ge(n, t, {
      hipsPos: [0, -0.17, 0.14],
      hips: [14, 16, 0],
      chest: [10, 30, 0],
      head: [-12, -40, 0],
      footL: [0.17, 0.09, 0.34, 0, 14],
      armR: [-74, 60, -20],
      foreR: [-40, 0, 0],
      propR: [-30, 40, 0],
      armL: [20, 0, 36],
    }),
    i = zs([
      [0, t],
      [0.18, e, he.out],
      [0.35, s, he.in3],
      [0.5, s, he.out],
      [1, t, he.io],
    ]),
    a = ge(n, t, {
      hips: [8, 14, 0],
      chest: [4, 24, 0],
      head: [-8, -30, 0],
      armL: [30, 0, 40],
      foreL: [-110, 0, 0],
      propL: [-60, 0, 0],
    }),
    o = ge(n, t, {
      hipsPos: [0, -0.18, 0.16],
      hips: [16, -40, 0],
      chest: [10, -30, 0],
      head: [-14, 64, 0],
      footL: [0.17, 0.09, 0.36, 0, 14],
      armL: [-84, -24, 10],
      foreL: [-8, 0, 0],
      propL: [-176, 0, 0],
      armR: [30, 0, -40],
    }),
    r = zs([
      [0, t],
      [0.18, a, he.out],
      [0.35, o, he.in3],
      [0.5, o, he.out],
      [1, t, he.io],
    ]),
    l = ge(n, t, {
      hips: [8, -26, 0],
      chest: [4, -30, 0],
      head: [-8, 40, 0],
      armL: [40, -30, 30],
      foreL: [-90, 0, 0],
      propL: [30, 0, 0],
    }),
    c = ge(n, t, {
      hipsPos: [0, -0.16, 0.1],
      hips: [12, 24, 0],
      chest: [8, 30, 0],
      head: [-10, -40, 0],
      armL: [-84, -50, 40],
      foreL: [-6, 0, 0],
      propL: [-30, 0, 0],
      armR: [20, 0, -40],
      foreR: [-80, 30, 0],
    }),
    f = zs([
      [0, t],
      [0.3, l, he.out],
      [0.5, c, he.in3],
      [1, c, he.lin],
    ]),
    d = ge(n, t, {
      hipsPos: [0, -0.1, 0.04],
      hips: [6, -10, 0],
      chest: [4, -6, 0],
      head: [6, 6, 0],
      armL: [-80, 0, 10],
      foreL: [-10, 0, 0],
      propL: [0, 0, 0],
      armR: [-60, 0, -20],
      foreR: [-60, 20, 0],
      propR: [-40, 0, 0],
    }),
    h = ge(n, t, {
      hipsPos: [0, -0.34, 0],
      hips: [24, 0, 0],
      spine: [14, 0, 0],
      chest: [10, 0, 0],
      head: [10, 0, 0],
      armL: [-30, 0, 50],
      foreL: [-100, -30, 0],
      armR: [-30, 0, -50],
      foreR: [-100, 30, 0],
    }),
    u = zs([
      [0, t],
      [0.3, d, he.out],
      [0.5, d, he.lin],
      [0.75, h, he.io],
      [1, h, he.lin],
    ]),
    m = ge(n, null, {
      armL: [-34, 0, 18],
      foreL: [-30, 0, 0],
      propL: [10, 0, 0],
      armR: [10, 0, -16],
      foreR: [-90, 30, 0],
      propR: [10, 0, 0],
    }),
    x = ge(n, null, {
      hipsPos: [0, -0.26, 0.12],
      hips: [48, -24, 0],
      spine: [10, 8, 0],
      chest: [6, 12, 0],
      neck: [-24, 0, 0],
      head: [-28, 6, 0],
      footL: [0.11, 0.12, 0.48, -20, 0],
      footR: [-0.11, 0.34, -0.6, 70, 0],
      armR: [-110, 20, -16],
      foreR: [-10, 0, 0],
      propR: [-150, 0, 0],
      armL: [70, 0, 30],
      foreL: [-10, 0, 0],
      propL: [30, 0, 0],
    }),
    p = ge(n, t, {
      hipsPos: [0, -0.04, 0],
      hips: [2, -10, 0],
      spine: [4, 0, 0],
      chest: [4, 4, 0],
      neck: [10, 0, 0],
      head: [18, 0, 0],
      armL: [-30, -30, 26],
      foreL: [-110, -10, 0],
      propL: [40, 0, 0],
      armR: [-30, 30, -26],
      foreR: [-110, 10, 0],
      propR: [40, 0, 0],
    }),
    g = Wh(n, t, { limp: { propL: [20, 0, 0], propR: [20, 0, 0] } });
  return {
    stance: t,
    tmp: jl(n),
    atkA: i,
    atkB: r,
    s2: f,
    vanish: u,
    runArms: m,
    dash: x,
    channel: p,
    common: g,
  };
}

function jU() {
  const { h: n, b: t, extra: e } = VU(),
    s = WU(n),
    i = n.J,
    a = s.tmp,
    o = t.build(),
    r = (c, f) => {
      const d = e.furlPts,
        h = Math.min(io, Math.max(0, f * io)),
        u = Math.min(io - 1, Math.floor(h)),
        m = h - u,
        x = d[u][0] + (d[u + 1][0] - d[u][0]) * m,
        p = d[u][1] + (d[u + 1][1] - d[u][1]) * m,
        g = d[u][2] + (d[u + 1][2] - d[u][2]) * m;
      for (let y = 1; y <= io; y++) y <= h || c.pos(e.furlRows[y - 1], x - d[y][0], p - d[y][1], g - d[y][2]);
    },
    l = (c, f, d) => {
      if (
        (c.scale(e.furl, 0), jh(n, c, f.anim === "leap" ? "airborne" : f.anim, f.t, f.p, f.time, s.common))
      ) {
        f.anim === "dead" && (d.glow = Math.max(0.1, 1 - f.t * 1.3));
        return;
      }
      switch (f.anim) {
        case "move": {
          Mf(n, c, f.stride, ww, () => {
            const h = s.runArms.e,
              u = Math.cos(f.stride * Math.PI * 2);
            for (const m of [i.armL, i.foreL, i.propL, i.armR, i.foreR, i.propR])
              c.rot(m, h[m * 3], h[m * 3 + 1], h[m * 3 + 2]);
            (c.add(i.armL, u * 16, 0, 0), c.add(i.armR, -u * 5, 0, 0));
          });
          break;
        }
        case "attack": {
          const h = Vh(f.p, f.windup);
          (ta(f.variant % 2 === 0 ? s.atkA : s.atkB, h, a),
            Un(n, c, a),
            (d.glow = 1 + 1.3 * ho(h, 0.36, 0.2)));
          break;
        }
        case "cast_s1":
        case "dash": {
          (Un(n, c, s.dash), (d.glow = 2.4));
          break;
        }
        case "cast_s2": {
          (ta(s.s2, f.p, a), Un(n, c, a), (d.glow = 1 + 2 * ho(f.p, 0.45, 0.3)));
          break;
        }
        case "cast_ult": {
          (ta(s.vanish, f.p, a),
            Un(n, c, a, () => c.rot(i.root, 0, -ma(f.p, 0.5, 1) * 120, 0)),
            c.scale(e.furl, Math.min(ma(f.p, 0.03, 0.09), 1 - ma(f.p, 0.76, 0.82))));
          const h = Math.min(ma(f.p, 0.07, 0.3), 1 - ma(f.p, 0.55, 0.77));
          (r(c, h * (2 - h)), (d.glow = 1 + 2.4 * f.p));
          break;
        }
        case "spin":
        case "channel": {
          (Un(n, c, s.channel, () => Yo(n, c, f.time, f.seed, 0.6)),
            (d.glow = 1 + 0.4 * (0.5 + 0.5 * Math.sin(f.time * 5))));
          break;
        }
        default:
          (Un(n, c, s.stance, () => {
            (Yo(n, c, f.time * 0.9, f.seed, 0.6),
              c.move(i.hips, Math.sin(f.time * 1.1 + f.seed * 5) * 0.006, 0, 0));
          }),
            (d.glow = 1 + 0.12 * Math.sin(f.time * 2.4)));
      }
    };
  return {
    key: "hero:yeque",
    geometry: o,
    rig: n.rig,
    height: 2.06,
    radius: 0.58,
    scale: _w,
    stride: ww.stride * _w,
    triangles: t.triangleCount,
    attach: {
      head: { joint: i.head, x: 0, y: 0.25, z: 0 },
      chest: { joint: i.chest, x: 0, y: 0.08, z: 0 },
      handR: { joint: i.handR, x: 0, y: -0.07, z: 0 },
      handL: { joint: i.handL, x: 0, y: -0.07, z: 0 },
      weapon: { joint: i.propR, x: 0, y: 0, z: -0.46 },
      muzzle: { joint: i.propR, x: 0, y: 0, z: 0 },
    },
    blend: (c, f) =>
      f === "attack" || f === "dash" ? 0.06 : f === "dead" ? 0.05 : c === "dash" ? 0.14 : 0.12,
    animate: l,
  };
}

const qU = Math.PI * 2;

function Lm(n) {
  const t = new Wa(),
    e = t.add("root", -1, 0, 0, 0),
    s = t.add("pelvis", e, 0, n.pelvis[0], n.pelvis[1]),
    i = t.add("chest", s, 0, n.chest[0], n.chest[1]),
    a = [];
  n.neck.forEach((d, h) => a.push(t.add(`neck${h}`, h === 0 ? i : a[h - 1], 0, d[0], d[1])));
  const o = t.add("head", a.length ? a[a.length - 1] : i, 0, n.head[0], n.head[1]),
    r = n.jaw ? t.add("jaw", o, 0, n.jaw[0], n.jaw[1]) : -1,
    l = [];
  n.tail.forEach((d, h) => l.push(t.add(`tail${h}`, h === 0 ? s : l[h - 1], d[2] ?? 0, d[0], d[1])));
  const c = [],
    f = (d, h, u, m) => {
      const x = t.add(`${d}U`, m ? i : s, h[0][0] * u, h[0][1], h[0][2]),
        p = t.add(`${d}L`, x, h[1][0] * u, h[1][1], h[1][2]),
        g = t.add(`${d}F`, p, h[2][0] * u, h[2][1], h[2][2]);
      c.push({
        upper: x,
        lower: p,
        foot: g,
        side: u,
        front: m,
        bend: m ? n.bendFront : n.bendHind,
        rx: h[2][0] * u,
        ry: h[2][1],
        rz: h[2][2],
      });
    };
  return (
    f("fl", n.front, 1, !0),
    f("fr", n.front, -1, !0),
    f("hl", n.hind, 1, !1),
    f("hr", n.hind, -1, !1),
    { rig: t, root: e, pelvis: s, chest: i, neck: a, head: o, jaw: r, tail: l, legs: c }
  );
}

const Mw = [0, 0, 0, 1];

function Ds(n, t, e, s, i, a, o = 0) {
  const r = n.legs[e];
  (Fx(n.rig, t, r.upper, r.lower, r.foot, s, i, a, r.side * 0.12, 0.1, r.bend, r.bend, Mw),
    Em(t, r.foot, Mw, o, 0, 0));
}

function _a(n, t, e = 0, s = 0, i = 15) {
  for (let a = 0; a < 4; a++) {
    if (!(i & (1 << a))) continue;
    const o = n.legs[a];
    Ds(n, t, a, o.rx + e, o.ry, o.rz + s);
  }
}

function XU(n, t, e, s, i, a = 0, o = 0) {
  const r = n.legs[e];
  (t.rot(r.upper, s, 0, r.side * o), t.rot(r.lower, i, 0, 0), t.rot(r.foot, a, 0, 0));
}

const YU = {
  walk: { off: [0, 0.5, 0.75, 0.25], duty: 0.64 },
  trot: { off: [0, 0.5, 0.5, 0], duty: 0.5 },
  bound: { off: [0, 0.14, 0.56, 0.7], duty: 0.42 },
};

function Im(n, t, e, s) {
  const i = YU[s.style],
    a = s.amount ?? 1,
    o = e * qU,
    r = (s.bob ?? 0) * a,
    l = (s.pitch ?? 0) * a;
  s.style === "bound"
    ? (t.move(n.pelvis, 0, r * Math.sin(o + 2.2), 0),
      t.add(n.pelvis, l * Math.sin(o + 0.5), 0, 0),
      t.add(n.chest, -l * 1.5 * Math.sin(o + 1), 0, 0))
    : (t.move(n.pelvis, 0, -r * Math.cos(o * 2), 0),
      t.add(
        n.pelvis,
        l * Math.sin(o * 2 + 0.6),
        (s.sway ?? 0) * a * Math.sin(o),
        (s.roll ?? 0) * a * Math.sin(o),
      ),
      t.add(n.chest, 0, -(s.sway ?? 0) * a * 1.6 * Math.sin(o), 0));
  for (let c = 0; c < 4; c++) {
    const f = n.legs[c];
    let d = e + i.off[c];
    d -= Math.floor(d);
    const h = s.stride * i.duty * a;
    let u,
      m = 0,
      x = 0;
    if (d < i.duty) u = h * (0.5 - d / i.duty);
    else {
      const p = (d - i.duty) / (1 - i.duty),
        g = p * p * (3 - 2 * p);
      ((u = h * (g - 0.5)),
        (m = s.lift * a * Math.sin(Math.PI * p) * (1 - 0.35 * p)),
        (x = (s.curl ?? 30) * a * Math.sin(Math.PI * Math.min(1, p * 1.3))));
    }
    Ds(n, t, c, f.rx, f.ry + m, f.rz + u, x);
  }
}

function V1(n, t, e, s = 52, i = 0.3) {
  (t.add(n.pelvis, -s * e, 0, 0), t.move(n.pelvis, 0, -0.08 * e, -i * e), _a(n, t, 0, 0, 12));
}

function Jo(n, t = 0.22) {
  if (n < 0 || n >= t) return 0;
  const e = n / t;
  return Math.min(1, e * 7) * (1 - e) * (1 - e);
}

const Qt = {
    stone: 8031408,
    stoneLight: 10004680,
    stoneDark: 5266554,
    iron: 4541794,
    brass: 13214810,
    cloth: 792624,
    wood: 6969932,
  },
  kf = Math.PI * 2,
  As = { mat: K.rock, pattern: En.strata, patternScale: 6, patternAmt: 0.35, grain: 0.06 },
  wa = { gloss: 0.6, mat: K.metal },
  ya = { gloss: 0.9, mat: K.metal },
  $o = { team: 0.82, mat: K.cloth, pattern: En.weave, patternScale: 12, patternAmt: 0.35 },
  Ai = (n) => ({ team: 1, glow: n, mat: K.crystal, line: 0 });

function Hx(n) {
  const t = [];
  for (let e = 0; e < 16; e++) {
    const s = (e / 16) * kf + Math.PI / 2,
      i = e % 2 === 0 ? n * (e % 4 === 0 ? 1 : 0.7) : n * 0.36;
    t.push([Math.cos(s) * i, Math.sin(s) * i]);
  }
  return t;
}

function C8(n, t, e) {
  const s = (i, a, o) => {
    n.g(pt(i, 0, 0), () =>
      n.extrude(
        [
          [0, -t * 0.7],
          [o, -t * 0.3],
          [o * 0.7, a * 0.3],
          [o * 0.2, a * 0.5],
          [0, a],
          [-o * 0.5, a * 0.4],
          [-o, -t * 0.3],
        ],
        e,
        0,
      ),
    );
  };
  (s(0, t * 1.05, t * 0.36), s(-t * 0.55, t * 0.55, t * 0.27), s(t * 0.55, t * 0.6, t * 0.27));
}

function Pm(n) {
  return { slump: Kn(Ct(n, 0, 0.22)), burst: Kn(Ct(n, 0.22, 0.6)), fall: Ct(n, 0.3, 0.75) };
}

function Go(n, t, e, s, i, a, o, r, l) {
  (n.move(t, i * e, 0.5 * Math.sin(Math.min(1, e) * Math.PI) * (1 - s) - o * s * s, a * e),
    n.add(t, r * e, 0, l * e));
}

function KU() {
  const n = new Wa(),
    t = n.add("root", -1, 0, 0, 0),
    e = n.add("body", t, 0, 0.5, 0),
    s = n.add("head", e, 0, 0.92, 0.02),
    i = n.add("armL", e, 0.34, 0.8, 0),
    a = n.add("armR", e, -0.34, 0.8, 0),
    o = n.add("legL", t, 0.15, 0.36, 0),
    r = n.add("legR", t, -0.15, 0.36, 0),
    l = n.add("emblemB", i, 0.5, 0.56, 0.2),
    c = n.add("emblemR", i, 0.5, 0.56, 0.2),
    f = new Ls();
  ((f.crease = 38),
    f.sym((h) => {
      (f.bone(h > 0 ? o : r).paint(Qt.stoneDark, { c2: Qt.stone, ...As }),
        f.lathe(
          [
            [0.1, 0.1, 0.11, 0.15, 0],
            [0.36, 0.115, 0.12, 0.15, 0],
            [0.42, 0.09, 0.09, 0.15, 0],
          ],
          { seg: 6, phase: 30 },
        ),
        f.paint(Qt.iron, { ...wa }),
        f.lathe(
          [
            [0, 0.13, 0.17, 0.15, 0.035],
            [0.1, 0.125, 0.15, 0.15, 0.02],
            [0.14, 0.1, 0.11, 0.15, 0],
          ],
          { seg: 6, phase: 30 },
        ));
    }),
    f.bone(e).paint(Qt.stoneDark, { c2: Qt.stoneLight, ...As }),
    f.lathe(
      [
        [0.34, 0.2, 0.17],
        [0.46, 0.26, 0.2],
        [0.5, 0.25, 0.19],
      ],
      { seg: 6, phase: 30, power: 2.4 },
    ),
    f.lathe(
      [
        [0.53, 0.27, 0.2],
        [0.7, 0.36, 0.26],
        [0.88, 0.38, 0.27],
        [0.96, 0.24, 0.2],
      ],
      { seg: 6, phase: 30, power: 2.4 },
    ),
    f.paint(16777215, Ai(0.75)),
    f.lathe(
      [
        [0.49, 0.235, 0.18],
        [0.54, 0.25, 0.19],
      ],
      { seg: 6, phase: 30, power: 2.4, cap0: !1, cap1: !1 },
    ),
    f.paint(Qt.cloth, { ...$o }),
    f.g(pt(0, 0.5, 0.205, 6, 0, 0), () =>
      f.extrude(
        [
          [-0.13, 0],
          [0.13, 0],
          [0.12, -0.26],
          [0, -0.34],
          [-0.12, -0.26],
        ],
        0.03,
        0.008,
      ),
    ),
    f.g(pt(0, 0.5, -0.2, -6, 0, 0), () =>
      f.extrude(
        [
          [-0.12, 0],
          [0.12, 0],
          [0.11, -0.2],
          [-0.11, -0.2],
        ],
        0.03,
        0.008,
      ),
    ),
    f.paint(Qt.brass, { ...ya }),
    f.g(pt(0, 0.74, 0.265, -10, 0, 45), () => f.box(0, 0, 0, 0.1, 0.1, 0.03, 0.012)),
    f.bone(s).paint(Qt.stone, { c2: Qt.stoneLight, ...As }),
    f.lathe(
      [
        [0.9, 0.15, 0.15, 0, 0.02],
        [0.98, 0.21, 0.2, 0, 0.02],
        [1.16, 0.2, 0.19, 0, 0.02],
        [1.26, 0.1, 0.1, 0, 0],
      ],
      { seg: 6, phase: 90 },
    ),
    f.paint(Qt.iron, { ...wa }),
    f.g(pt(0, 1.07, 0.185, -4, 0, 0), () =>
      f.extrude(
        [
          [-0.12, -0.12],
          [0.12, -0.12],
          [0.14, 0.06],
          [0, 0.14],
          [-0.14, 0.06],
        ],
        0.05,
        0.015,
      ),
    ),
    f.paint(16777215, Ai(0.9)),
    f.box(0, 1.06, 0.216, 0.03, 0.17, 0.02),
    f.paint(Qt.cloth, { ...$o }),
    f.g(pt(0, 1.24, -0.04), () =>
      f.extrude(
        [
          [-0.025, 0],
          [0.025, 0],
          [0.04, 0.12],
          [0, 0.2],
          [-0.04, 0.12],
        ],
        0.22,
        0.015,
      ),
    ),
    f.bone(i).paint(Qt.stoneDark, { c2: Qt.stone, ...As }),
    f.ball(0.36, 0.8, 0, 0.12, 0.12, 0.12, 0, 40),
    f.limb([0.38, 0.8, 0], [0.42, 0.5, 0.06], 0.085, 0.1, { seg: 6 }),
    f.g(pt(0.5, 0.56, 0.14, 0, 62, 0), () => {
      (f.paint(Qt.iron, { ...wa }),
        f.extrude(
          [
            [-0.25, 0.26],
            [0.25, 0.26],
            [0.27, -0.06],
            [0, -0.38],
            [-0.27, -0.06],
          ],
          0.06,
          0.02,
        ),
        f.paint(Qt.cloth, { ...$o }),
        f.g(pt(0, 0, 0.034), () =>
          f.extrude(
            [
              [-0.2, 0.21],
              [0.2, 0.21],
              [0.215, -0.045],
              [0, -0.3],
              [-0.215, -0.045],
            ],
            0.02,
            0.006,
          ),
        ),
        f.paint(Qt.brass, { ...ya }),
        f.g(pt(0, 0.285, 0), () => f.box(0, 0, 0, 0.54, 0.05, 0.08, 0.015)));
    }),
    f.bone(l).paint(Qt.brass, { ...ya }),
    f.g(pt(0.5, 0.56, 0.14, 0, 62, 0), () => f.g(pt(0, 0, 0.05), () => f.extrude(Hx(0.15), 0.03, 0))),
    f.bone(c).paint(Qt.brass, { ...ya }),
    f.g(pt(0.5, 0.56, 0.14, 0, 62, 0), () => f.g(pt(0, 0, 0.05), () => C8(f, 0.15, 0.03))),
    f.bone(a).paint(Qt.stoneDark, { c2: Qt.stone, ...As }),
    f.ball(-0.36, 0.8, 0, 0.12, 0.12, 0.12, 0, 40),
    f.limb([-0.38, 0.8, 0], [-0.4, 0.5, 0.04], 0.085, 0.1, { seg: 6 }),
    f.g(pt(-0.4, 0.46, 0.06), () => {
      (f.paint(Qt.wood, { mat: K.leather, pattern: En.bark, patternScale: 10, patternAmt: 0.3 }),
        f.tube(
          [
            [0, 0, -0.26, 0.026],
            [0, 0, 0.74, 0.024],
          ],
          { seg: 5 },
        ),
        f.paint(14673650, { c2: 16777215, gloss: 1, mat: K.metal }),
        f.tube(
          [
            [0, 0, 0.7, 0.012, 0.04],
            [0, 0, 0.92, 0.004, 0.006],
          ],
          { seg: 4, crease: 0 },
        ),
        f.g(pt(0, 0, 0.6, 90, 0, 90), () =>
          f.extrude(
            [
              [-0.03, 0],
              [0.03, 0],
              [0.035, 0.1],
              [0.055, 0.17],
              [0, 0.36],
              [-0.055, 0.17],
              [-0.035, 0.1],
            ],
            0.03,
            0.012,
          ),
        ),
        f.paint(Qt.brass, { ...ya }),
        f.tube(
          [
            [0, 0, 0.54, 0.04],
            [0, 0, 0.62, 0.04],
          ],
          { seg: 6, crease: 30 },
        ));
    }),
    f.bakeGrounding(1.3));
  const d = (h, u, m) => {
    const x = u.time * 2.4 + u.seed * 6;
    switch ((h.scale(l, u.team === 1 ? 0.001 : 1), h.scale(c, u.team === 1 ? 1 : 0.001), u.anim)) {
      case "dead": {
        const g = Pm(u.t);
        (h.pos(e, 0, -0.1 * g.slump - 0.3 * g.fall * g.fall, 0),
          h.rot(e, 14 * g.slump + 40 * g.burst, 0, 10 * g.burst),
          Go(h, s, g.burst, g.fall, 0.1, -0.5, 0.7, -120, 40),
          Go(h, i, g.burst, g.fall, 0.5, 0.2, 0.5, 20, 80),
          Go(h, a, g.burst, g.fall, -0.45, 0.3, 0.5, -40, -90),
          h.rot(o, -30 * g.burst, 0, 30 * g.burst),
          h.rot(r, 20 * g.burst, 0, -34 * g.burst),
          (m.glow = Math.max(0.02, 1 - g.slump * 1.2)));
        break;
      }
      case "move": {
        const g = u.stride * kf,
          y = Math.sin(g);
        (h.rot(o, y * 36, 0, 0),
          h.rot(r, -y * 36, 0, 0),
          h.pos(e, 0, Math.abs(Math.cos(g)) * 0.04, 0),
          h.rot(e, 9 + Math.cos(g * 2) * 2, -y * 7, 0),
          h.rot(s, -4 - Math.cos(g * 2 + 0.6) * 3, 0, 0),
          h.rot(a, -24 + Math.sin(g - 0.8) * 16, 0, -6),
          h.rot(i, -26 - y * 10, 0, 0));
        break;
      }
      case "attack": {
        const g = Qo(u.p, u.windup),
          y = Kn(Ct(g, 0, 0.26)),
          v = Ct(g, 0.26, 0.36),
          _ = Gn(Ct(g, 0.5, 1)),
          k = y * (1 - v),
          M = v * (1 - _),
          S = Xe(g, 0.42, 0.1);
        (h.rot(a, -130 * k - 74 * M + 14 * S, 0, -24 * k + 10 * M),
          h.rot(e, -12 * k + 18 * M, 30 * k - 22 * M, 0),
          h.pos(e, 0, 0.03 * k - 0.04 * M, -0.06 * k + 0.14 * M),
          h.rot(o, 10 * k - 18 * M, 0, 0),
          h.rot(r, -6 * k + 12 * M, 0, 0),
          h.rot(i, -34 - 10 * k, 0, 0),
          h.rot(s, 6 * k - 6 * M, -14 * k + 8 * M, 0),
          (m.glow = 1 + 0.3 * k + 0.7 * Xe(g, 0.36, 0.14)));
        break;
      }
      case "stunned": {
        (h.rot(e, 8 + Math.sin(x * 2.2) * 6, 0, Math.cos(x * 2.2) * 8),
          h.rot(s, 14, Math.sin(x * 2.2) * 20, 0),
          h.rot(i, -10, 0, 20),
          h.rot(a, 10, 0, -20),
          (m.glow = 0.6));
        break;
      }
      case "airborne": {
        (h.rot(t, -20 * Math.sin(u.p * Math.PI), 0, 0),
          h.rot(i, -60, 0, 70),
          h.rot(a, -60, 0, -70),
          h.rot(o, -30, 0, 14),
          h.rot(r, 20, 0, -14));
        break;
      }
      default:
        (h.pos(e, 0, Math.sin(x) * 0.012, 0),
          h.rot(s, 0, Math.sin(x * 0.4) * 8, 0),
          h.rot(i, -22 + Math.sin(x) * 2, 0, 0),
          h.rot(a, -8 + Math.sin(x + 1) * 3, 0, 0),
          (m.glow = 1 + 0.12 * Math.sin(x * 1.3)));
    }
    const p = Jo(u.hitT, 0.18);
    p > 0 && u.anim !== "dead" && (h.add(e, -10 * p, 0, 0), h.add(s, 12 * p, 0, 0));
  };
  return {
    key: "minion:melee",
    geometry: f.build(),
    rig: n,
    height: 1.42,
    radius: 0.5,
    scale: 1,
    stride: 1.5,
    triangles: f.triangleCount,
    deathDur: 1.1,
    outline: 1.2,
    attach: {
      chest: { joint: e, x: 0, y: 0.2, z: 0 },
      head: { joint: s, x: 0, y: 0.2, z: 0 },
      weapon: { joint: a, x: -0.06, y: -0.34, z: 0.9 },
      muzzle: { joint: a, x: -0.06, y: -0.34, z: 0.9 },
      handL: { joint: i, x: 0.16, y: -0.24, z: 0.14 },
      handR: { joint: a, x: -0.06, y: -0.34, z: 0.06 },
    },
    blend: (h, u) => (u === "attack" ? 0.07 : 0.12),
    animate: d,
  };
}

function ZU() {
  const n = new Wa(),
    t = n.add("root", -1, 0, 0, 0),
    e = n.add("body", t, 0, 0.52, 0),
    s = n.add("head", e, 0, 1.02, 0.02),
    i = n.add("flame", s, 0, 1.24, 0.02),
    a = n.add("armL", e, 0.27, 0.9, 0.02),
    o = n.add("armR", e, -0.27, 0.9, 0.02),
    r = n.add("legL", t, 0.12, 0.4, 0),
    l = n.add("legR", t, -0.12, 0.4, 0),
    c = new Ls();
  ((c.crease = 38),
    c.sym((d) => {
      (c.bone(d > 0 ? r : l).paint(Qt.stoneDark, { c2: Qt.stone, ...As }),
        c.lathe(
          [
            [0.08, 0.075, 0.08, 0.12, 0],
            [0.4, 0.09, 0.09, 0.12, 0],
            [0.46, 0.07, 0.07, 0.12, 0],
          ],
          { seg: 6, phase: 30 },
        ),
        c.paint(Qt.iron, { ...wa }),
        c.lathe(
          [
            [0, 0.1, 0.14, 0.12, 0.03],
            [0.08, 0.095, 0.12, 0.12, 0.015],
            [0.11, 0.075, 0.08, 0.12, 0],
          ],
          { seg: 6, phase: 30 },
        ));
    }),
    c.bone(e).paint(Qt.stoneDark, { c2: Qt.stoneLight, ...As }),
    c.lathe(
      [
        [0.4, 0.15, 0.13],
        [0.56, 0.2, 0.16],
        [0.8, 0.24, 0.18],
        [0.98, 0.26, 0.19],
        [1.04, 0.14, 0.13],
      ],
      { seg: 6, phase: 30, power: 2.3 },
    ),
    c.paint(Qt.cloth, { ...$o }),
    c.g(pt(0, 0.92, 0.175, 8, 0, 0), () =>
      c.extrude(
        [
          [-0.15, 0.06],
          [0.15, 0.06],
          [0.13, -0.38],
          [0, -0.52],
          [-0.13, -0.38],
        ],
        0.03,
        0.008,
      ),
    ),
    c.g(pt(0, 0.92, -0.17, -8, 0, 0), () =>
      c.extrude(
        [
          [-0.15, 0.06],
          [0.15, 0.06],
          [0.12, -0.4],
          [-0.12, -0.4],
        ],
        0.03,
        0.008,
      ),
    ),
    c.lathe(
      [
        [0.92, 0.3, 0.23],
        [1, 0.27, 0.2],
        [1.045, 0.15, 0.14],
      ],
      { seg: 6, phase: 30, power: 2.3, cap0: !1 },
    ),
    c.paint(Qt.brass, { ...ya }),
    c.g(pt(0, 0.8, 0.2, 8, 0, 45), () => c.box(0, 0, 0, 0.07, 0.07, 0.03, 0.01)),
    c.paint(16777215, Ai(0.7)),
    c.lathe(
      [
        [0.5, 0.165, 0.14],
        [0.535, 0.185, 0.15],
      ],
      { seg: 6, phase: 30, power: 2.3, cap0: !1, cap1: !1 },
    ),
    c.bone(s).paint(Qt.iron, { ...wa }),
    c.lathe(
      [
        [1.02, 0.07, 0.07, 0, 0.02],
        [1.08, 0.17, 0.17, 0, 0.02],
        [1.11, 0.17, 0.17, 0, 0.02],
      ],
      { seg: 8, phase: 22.5 },
    ));
  for (let d = 0; d < 8; d++) {
    const h = (d / 8) * kf + Math.PI / 8;
    c.box(Math.cos(h) * 0.15, 1.235, 0.02 + Math.sin(h) * 0.15, 0.024, 0.26, 0.024);
  }
  (c.lathe(
    [
      [1.36, 0.19, 0.19, 0, 0.02],
      [1.4, 0.2, 0.2, 0, 0.02],
      [1.5, 0.1, 0.1, 0, 0.02],
      [1.62, 0.015, 0.015, 0, 0.02],
    ],
    { seg: 8, phase: 22.5 },
  ),
    c.paint(Qt.brass, { ...ya }),
    c.ball(0, 1.64, 0.02, 0.03, 0.035, 0.03, 0),
    c.bone(i).paint(16777215, Ai(0.95)),
    c.lathe(
      [
        [1.115, 0.13, 0.13, 0, 0.02],
        [1.24, 0.145, 0.145, 0, 0.02],
        [1.355, 0.13, 0.13, 0, 0.02],
      ],
      { seg: 8, phase: 22.5 },
    ),
    c.sym((d) => {
      (c.bone(d > 0 ? a : o).paint(Qt.stoneDark, { c2: Qt.stone, ...As }),
        c.ball(0.28, 0.9, 0.02, 0.085, 0.085, 0.085, 0, 40),
        c.limb([0.3, 0.9, 0.02], [0.33, 0.6, 0.06], 0.06, 0.07, { seg: 6 }),
        c.paint(Qt.iron, { ...wa }),
        c.box(0.33, 0.55, 0.07, 0.11, 0.11, 0.12, 0.03),
        c.paint(16777215, Ai(0.6)),
        c.box(0.33, 0.615, 0.065, 0.13, 0.025, 0.13));
    }),
    c.bakeGrounding(1.5, 0.78, 0.95));
  const f = (d, h, u) => {
    const m = h.time * 2 + h.seed * 6,
      x = 1 + 0.05 * Math.sin(m * 5.3) + 0.03 * Math.sin(m * 9.1);
    switch ((d.scale(i, x), (u.glow = 0.9 + 0.2 * Math.sin(m * 1.7)), h.anim)) {
      case "dead": {
        const g = Pm(h.t);
        (d.pos(e, 0, -0.1 * g.slump - 0.4 * g.fall * g.fall, 0),
          d.rot(e, 10 * g.slump + 50 * g.burst, 0, -14 * g.burst),
          Go(d, s, g.burst, g.fall, -0.2, 0.5, 0.9, 150, -50),
          d.scale(i, Math.max(0.001, 1 - g.slump)),
          Go(d, a, g.burst, g.fall, 0.4, 0.1, 0.6, 30, 80),
          Go(d, o, g.burst, g.fall, -0.4, -0.1, 0.6, -30, -80),
          d.rot(r, -24 * g.burst, 0, 30 * g.burst),
          d.rot(l, 16 * g.burst, 0, -30 * g.burst),
          (u.glow = Math.max(0.02, 1 - g.slump * 1.3)));
        break;
      }
      case "move": {
        const g = h.stride * kf,
          y = Math.sin(g);
        (d.rot(r, y * 32, 0, 0),
          d.rot(l, -y * 32, 0, 0),
          d.pos(e, 0, Math.abs(Math.cos(g)) * 0.035, 0),
          d.rot(e, 10, -y * 6, 0),
          d.rot(s, -6 + Math.sin(g * 2 - 0.9) * 6, 0, Math.sin(g - 0.6) * 5),
          d.rot(a, -y * 20 - 6, 0, 4),
          d.rot(o, y * 20 - 6, 0, -4));
        break;
      }
      case "attack": {
        const g = Qo(h.p, h.windup),
          y = Kn(Ct(g, 0, 0.27)),
          v = Ct(g, 0.27, 0.36),
          _ = Gn(Ct(g, 0.5, 1)),
          k = y * (1 - v),
          M = v * (1 - _);
        (d.rot(e, -16 * k + 18 * M, 0, 0),
          d.pos(e, 0, 0.04 * k - 0.03 * M, -0.05 * k + 0.08 * M),
          d.rot(s, -18 * k + 24 * M - 8 * Xe(g, 0.44, 0.1), 0, 0),
          d.rot(a, -100 * y * (1 - _) - 30 * M, 0, -26 * y * (1 - _)),
          d.rot(o, -100 * y * (1 - _) - 30 * M, 0, 26 * y * (1 - _)),
          d.scale(i, x * (1 + 0.5 * k - 0.25 * M)),
          (u.glow = 1 + 0.7 * k + 0.8 * Xe(g, 0.36, 0.12)));
        break;
      }
      case "stunned": {
        (d.rot(e, 10 + Math.sin(m * 2.4) * 6, 0, Math.cos(m * 2.4) * 10),
          d.rot(s, 0, Math.sin(m * 2.4) * 25, 14),
          (u.glow = 0.5));
        break;
      }
      case "airborne": {
        (d.rot(t, -24 * Math.sin(h.p * Math.PI), 0, 12),
          d.rot(a, -80, 0, 50),
          d.rot(o, -40, 0, -30),
          d.rot(r, -26, 0, 10),
          d.rot(l, 18, 0, -10));
        break;
      }
      default:
        (d.pos(e, 0, Math.sin(m) * 0.014, 0),
          d.rot(s, Math.sin(m * 0.8) * 3, Math.sin(m * 0.45) * 10, 0),
          d.rot(a, -8 + Math.sin(m) * 3, 0, 3),
          d.rot(o, -8 - Math.sin(m) * 3, 0, -3));
    }
    const p = Jo(h.hitT, 0.18);
    p > 0 && h.anim !== "dead" && (d.add(e, -10 * p, 0, 0), d.add(s, 16 * p, 0, 8 * p));
  };
  return {
    key: "minion:ranged",
    geometry: c.build(),
    rig: n,
    height: 1.7,
    radius: 0.45,
    scale: 1,
    stride: 1.4,
    triangles: c.triangleCount,
    deathDur: 1.1,
    outline: 1.2,
    attach: {
      chest: { joint: e, x: 0, y: 0.25, z: 0 },
      head: { joint: s, x: 0, y: 0.25, z: 0 },
      weapon: { joint: i, x: 0, y: 0, z: 0.16 },
      muzzle: { joint: i, x: 0, y: 0, z: 0.16 },
      core: { joint: i, x: 0, y: 0, z: 0 },
    },
    blend: (d, h) => (h === "attack" ? 0.07 : 0.14),
    animate: f,
  };
}
export { $U, jU, Lm, Ds, _a, XU, Im, V1, Jo, Qt, kf, As, wa, ya, $o, Ai, Hx, C8, Pm, Go, KU, ZU };
