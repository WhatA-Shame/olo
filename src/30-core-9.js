// 30-core-9.js — core｜11 个顶层语句｜66KB
// 对应 game.pretty.js 第 59631–61620 行
// 关键内容：
//   pO                    root
//   yO                    crater
//   MO                    root
//   CO                    earL
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { Ke } from './06-three-2.js';
import { Yt } from './14-three-7.js';
import { Ct, Di, En, Gn, K, Kn, Qn, Qo, Wa, Xe, bt, fh, pt, wf } from './25-render-9.js';
import { Ls } from './26-core-5.js';
import { Ds, Im, Jo, Lm, V1, XU, _a } from './28-core-7.js';
import { Bw, Fw, Ow, Uw, dO, hO, uO, v2, y2 } from './29-core-8.js';

function pO() {
  const n = new Wa(),
    t = n.add("root", -1, 0, 0, 0),
    e = n.add("body", t, 0, 1.15, 0.08),
    s = n.add("abd1", e, 0, 1.12, -0.14),
    i = n.add("abd2", s, 0, 1.08, -0.38),
    a = n.add("head", e, 0, 1.2, 0.3),
    o = [1, -1].map((g) => n.add(`ant${g}`, a, g * 0.07, 1.3, 0.4)),
    r = [1, -1].map((g) => n.add(`fw${g}`, e, g * 0.1, 1.22, 0.14)),
    l = [1, -1].map((g) => n.add(`hw${g}`, e, g * 0.1, 1.18, -0.04)),
    c = [1, -1].map((g) => {
      const y = n.add(`tail${g}a`, l[g > 0 ? 0 : 1], g * 0.6, 1.14, -0.84),
        v = n.add(`tail${g}b`, y, g * 0.66, 1.1, -1.14);
      return (
        n.chain({
          joints: [y, v],
          tip: [g * 0.04, -0.04, -0.3],
          stiffness: 9,
          drag: 0.9,
          gravity: 4,
          maxAngle: 70,
          wind: 2,
        }),
        [y, v]
      );
    }),
    f = new Ls();
  f.crease = 60;
  const d = { mat: K.fur, pattern: En.fur, patternScale: 14, patternAmt: 0.5, grain: 0.06 };
  (f.bone(e).paint(v2, { c2: 16775396, by: (g, y, v, _, k, M) => Qn(-0.2, 0.8, M), ...d }),
    f.ball(0, 1.16, 0.1, 0.17, 0.16, 0.23, 1),
    f.paint(16775396, { ...d }),
    f.g(pt(0, 1.19, 0.2, 90, 0, 0), () =>
      f.lathe(
        [
          [0, 0.15],
          [0.07, 0.23],
          [0.1, 0.11],
        ],
        { seg: 9, shape: (g) => 1 + 0.14 * Math.sin(g * 9) },
      ),
    ));
  const h = Di(n, [e, s, i], 0.8, [0, 1.04, -0.62]),
    u = (g, y, v) => (Math.sin((v + 0.02) * 30) > 0.25 ? 1 : 0);
  (f.bind(h).paint(v2, { c2: Ow, by: u, ...d }),
    f.tube(
      [
        [0, 1.14, -0.04, 0.17, 0.16],
        [0, 1.12, -0.12, 0.165, 0.16],
        [0, 1.115, -0.2, 0.16, 0.155],
        [0, 1.105, -0.28, 0.15, 0.145],
        [0, 1.095, -0.36, 0.135, 0.13],
        [0, 1.08, -0.44, 0.115, 0.11],
        [0, 1.065, -0.52, 0.085, 0.08],
        [0, 1.045, -0.62, 0.02, 0.02],
      ],
      { seg: 8, up: [1, 0, 0], cap0: !1 },
    ),
    f.bone(e).paint(Ow, { mat: K.leather }),
    f.sym(() => {
      for (let g = 0; g < 3; g++)
        f.tube(
          [
            [0.1, 1.04, 0.2 - g * 0.12, 0.02],
            [0.17, 0.92, 0.26 - g * 0.13, 0.014],
            [0.13, 0.84, 0.3 - g * 0.1, 0.004],
          ],
          { seg: 3 },
        );
    }),
    f.bone(a).paint(v2, { ...d }),
    f.ball(0, 1.2, 0.34, 0.12, 0.115, 0.12, 1),
    f.sym((g) => {
      (f.paint(Bw, { c2: 3828362, gloss: 1, mat: K.crystal }),
        f.ball(0.08, 1.215, 0.4, 0.048, 0.052, 0.045, 1),
        f.bone(o[g > 0 ? 0 : 1]).paint(uO, { c2: 15794168, glow: 0.15, glow2: 0.45, mat: K.cloth, line: 1 }),
        f.tube(
          [
            [0.07, 1.3, 0.4, 0.012],
            [0.16, 1.48, 0.56, 0.01],
            [0.3, 1.56, 0.78, 0.004],
          ],
          { seg: 3 },
        ),
        f.sheet(4, 1, (y, v) => {
          const _ = [bt(0.08, 0.3, y), bt(1.32, 1.56, Math.sin(y * 1.4)), bt(0.42, 0.78, y)],
            k = 0.085 * Math.sin(Math.min(1, y * 1.15) * Math.PI) * (1 + 0.2 * Math.sin(y * 30));
          return [
            _[0] + (v - 0.5) * 2 * k * 0.8,
            _[1] + (v - 0.5) * 2 * k * 0.2,
            _[2] - (v - 0.5) * 2 * k * 0.5,
          ];
        }),
        f.bone(a));
    }));
  const m = () => {
      f.paint(Uw, {
        c2: y2,
        glow: 0.03,
        glow2: 0.3,
        mat: K.cloth,
        pattern: En.vein,
        patternScale: 8,
        patternAmt: 0.6,
        by: (g, y, v, _) => Math.max(_ * _, Qn(0.75, 1.3, Math.abs(g))),
      });
    },
    x = (g, y, v, _) => {
      (f.paint(hO, { glow: 0.45, mat: K.crystal, line: 0 }),
        f.g(pt(g, y, v), () =>
          f.lathe(
            [
              [-0.012, _],
              [0.012, _],
            ],
            { seg: 8 },
          ),
        ),
        f.paint(dO, { glow: 0.8, mat: K.crystal, line: 0 }),
        f.g(pt(g, y, v), () =>
          f.lathe(
            [
              [-0.02, _ * 0.6],
              [0.02, _ * 0.6],
            ],
            { seg: 8 },
          ),
        ),
        f.paint(Bw, { mat: K.crystal, line: 0 }),
        f.g(pt(g, y, v), () =>
          f.lathe(
            [
              [-0.026, _ * 0.24],
              [0.026, _ * 0.24],
            ],
            { seg: 6 },
          ),
        ));
    };
  (f.sym((g) => {
    const y = g > 0 ? 0 : 1;
    (f.bone(r[y]),
      m(),
      f.sheet(5, 3, (v, _) => {
        const k = [
            bt(0.1, 1.36, v),
            1.22 + 0.1 * Math.sin(v * Math.PI) + 0.05 * v,
            bt(0.2, 0.7, Math.pow(v, 0.7)),
          ],
          M = [bt(0.1, 1.02, v), 1.2 + 0.03 * v, bt(0.02, -0.3, v) + 0.08 * Math.sin(v * Math.PI * 2.5) * v];
        return [bt(k[0], M[0], _), bt(k[1], M[1], _) - 0.04 * Math.sin(_ * Math.PI), bt(k[2], M[2], _)];
      }),
      f.paint(Uw, { c2: y2, mat: K.leather }),
      f.tube(
        [
          [0.1, 1.23, 0.2, 0.022],
          [0.76, 1.33, 0.54, 0.016],
          [1.36, 1.275, 0.7, 0.005],
        ],
        { seg: 4 },
      ),
      x(0.84, 1.275, 0.24, 0.15),
      f.bone(l[y]),
      m(),
      f.sheet(4, 3, (v, _) => {
        const k = [bt(0.1, 1, v), 1.19 + 0.03 * v, bt(-0.02, -0.34, v)],
          M = [bt(0.08, 0.6, v), 1.15, bt(-0.2, -0.86, Math.sin((v * Math.PI) / 2))];
        return [
          bt(k[0], M[0], _) + 0.08 * Math.sin(_ * Math.PI) * v,
          bt(k[1], M[1], _) - 0.03 * Math.sin(_ * Math.PI),
          bt(k[2], M[2], _),
        ];
      }),
      x(0.6, 1.178, -0.42, 0.11),
      f.bind(Di(n, c[y], 0.8, [g * 0.7, 1.06, -1.44])),
      f.paint(y2, { c2: 15269880, glow: 0.3, glow2: 0.6, mat: K.cloth, line: 1 }),
      f.sheet(1, 4, (v, _) => {
        const k = 0.06 * (1 - _ * 0.75) + (_ > 0.8 ? 0.05 * (_ - 0.8) * 5 : 0);
        return [0.6 + 0.1 * _ + (v - 0.5) * 2 * k, 1.14 - 0.08 * _, -0.84 - 0.6 * _];
      }));
  }),
    f.bakeGrounding(1.6, 0.85, 1));
  const p = (g, y, v) => {
    const _ = y.time + y.seed * 6.3,
      k = (y.mode & 2) !== 0;
    let M = k ? 7 : 4,
      S = 1,
      b = 0,
      w = Math.sin((_ * Fw) / 1.6) * 0.12,
      T = 1 + 0.15 * Math.sin(_ * 3) + (k ? 0.3 : 0);
    switch (((v.tint = 0.1), (v.tintColor = y.seed > 0.5 ? 10479871 : 13172656), y.anim)) {
      case "dead": {
        const I = y.t,
          P = Gn(Ct(I, 0.05, 0.8));
        ((S = 1 - Ct(I, 0, 0.25)),
          (w *= S),
          (b = -0.25 * P),
          g.pos(t, Math.sin(P * 7) * 0.3 * (1 - P), -1.05 * P, 0),
          g.rot(t, 12 * Math.sin(P * 9) * (1 - P), P * 300, 18 * Math.sin(P * 8 + 1) * (1 - P)),
          g.rot(s, 14 * P, 0, 0),
          (T = Math.max(0.03, 1 - Ct(I, 0.5, 1))),
          (v.tint = 0.1 + 0.4 * Ct(I, 0.6, 1.1)),
          (v.tintColor = 8949920));
        break;
      }
      case "attack": {
        const I = Qo(y.p, y.windup),
          P = Kn(Ct(I, 0, 0.3)),
          F = Ct(I, 0.3, 0.38),
          L = Gn(Ct(I, 0.5, 1)),
          B = P * (1 - F),
          G = F * (1 - L);
        (g.rot(e, -26 * B + 18 * G, 0, 0),
          g.pos(t, 0, 0.14 * B, -0.2 * B + 0.26 * G),
          (S = 1 - 0.85 * Math.max(B, G)),
          (b = 0.75 * B - 0.5 * G),
          (T += 0.4 * B + 0.8 * Xe(I, 0.36, 0.14)));
        break;
      }
      case "move": {
        (g.rot(e, 20, 0, 0), (M = 5.5));
        break;
      }
      case "stunned": {
        (g.rot(t, 0, 0, Math.sin(_ * 8) * 12), g.rot(a, 20, Math.sin(_ * 7) * 20, 0), (w -= 0.3), (S = 0.5));
        break;
      }
      case "airborne": {
        (g.rot(t, -30 * Math.sin(y.p * Math.PI), 0, 20), (b = 0.4));
        break;
      }
      default:
        if (y.spawnT >= 0) {
          const I = y.spawnT / 1,
            P = 1 - Kn(Ct(I, 0, 0.9)),
            F = P * 5.5 + y.seed * 3;
          (g.pos(t, Math.sin(F) * 1.6 * P, 1.9 * P, Math.cos(F) * 1.6 * P - 0.8 * P),
            g.rot(t, 0, (-F * 180) / Math.PI + 90 * P, -28 * P),
            (M = 7),
            (T += 0.6 * P));
        } else
          (g.rot(e, Math.sin(_ * 0.9) * 4, Math.sin(_ * 0.5) * 8, 0),
            g.rot(a, 0, Math.sin(_ * 0.7 + 1) * 14, 0));
    }
    const E = Jo(y.hitT, 0.3);
    (E > 0 &&
      y.anim !== "dead" &&
      (g.move(t, 0, 0.1 * E, -0.4 * E), g.add(t, -50 * E, 0, (y.seed > 0.5 ? 1 : -1) * 40 * E)),
      g.move(t, 0, w, 0));
    const A = _ * M * Fw,
      C = Math.sin(A) * S,
      R = Math.sin(A - 0.8) * S;
    for (let I = 0; I < 2; I++) {
      const P = I === 0 ? 1 : -1;
      (g.rot(r[I], 0, P * -12 * b, P * (10 + C * 40 + b * 60)),
        g.rot(l[I], 0, P * 10 * b, P * (4 + R * 32 + b * 50)),
        g.rot(o[I], Math.sin(_ * 2.3 + I) * 8 - 10 * b, P * Math.sin(_ * 1.7 + I * 2) * 8, 0));
    }
    (g.add(e, -C * 3, 0, 0),
      g.add(s, 6 + Math.sin(_ * 2.1) * 5 + C * 3, 0, 0),
      g.add(i, 8 + Math.sin(_ * 2.1 - 0.7) * 6, 0, 0),
      (v.glow = T));
  };
  return {
    key: "monster:glimwing",
    geometry: f.build(),
    rig: n,
    height: 1.9,
    radius: 1.05,
    scale: 0.86,
    stride: 1.5,
    triangles: f.triangleCount,
    deathDur: 1.2,
    spawnDur: 1,
    outline: 1.3,
    attach: {
      chest: { joint: e, x: 0, y: 0, z: 0 },
      head: { joint: a, x: 0, y: 0.08, z: 0.1 },
      muzzle: { joint: a, x: 0, y: -0.04, z: 0.26 },
      weapon: { joint: a, x: 0, y: -0.04, z: 0.26 },
      wingL: { joint: r[0], x: 1.2, y: 0.05, z: 0.5 },
      wingR: { joint: r[1], x: -1.2, y: 0.05, z: 0.5 },
      tail: { joint: i, x: 0, y: -0.04, z: -0.24 },
    },
    blend: (g, y) => (y === "attack" ? 0.08 : 0.14),
    animate: p,
  };
}

const Ap = Math.PI * 2,
  dr = 8010282,
  b2 = 11035711,
  r0 = 5909026,
  Hw = 11565648,
  Rp = 2759968,
  Cp = 6964282,
  Mc = 16734748,
  _d = 16765562,
  mO = 15745562,
  $w = 16760912,
  Gw = 2759194,
  gO = 16734774,
  xO = 16756800,
  Lp = (n, t) => {
    const e = Math.sin(n * 127.1 + t * 311.7) * 43758.5453;
    return e - Math.floor(e);
  };

function yO() {
  const n = Lm({
      pelvis: [1.3, -1],
      chest: [1.42, 0.5],
      neck: [[1.6, 1.12]],
      head: [1.66, 1.5],
      jaw: [1.52, 1.6],
      tail: [[1.42, -1.72]],
      front: [
        [0.7, 1.4, 0.62],
        [0.8, 0.78, 0.48],
        [0.82, 0.13, 0.7],
      ],
      hind: [
        [0.6, 1.26, -1.05],
        [0.68, 0.7, -0.78],
        [0.66, 0.13, -1.1],
      ],
      bendFront: -1,
      bendHind: 1,
    }),
    t = n.rig,
    e = t.add("crater", n.chest, 0, 2.02, 0.1),
    s = t.add("core", e, 0, 2.12, 0.1),
    i = [0, 1, 2].map((v) => t.add(`flame${v}`, e, 0, 2.16, 0.1)),
    a = [0, 1, 2, 3].map((v) => t.add(`mane${v}`, n.chest, 0, 1.75, 0.95)),
    o = new Ls();
  o.crease = 62;
  const r = { mat: K.fur, pattern: En.fur, patternScale: 5, patternAmt: 0.5, grain: 0.08 },
    l = (v, _, k, M, S, b) => Qn(0.05, -0.8, b),
    c = { gloss: 0.85, mat: K.rock, pattern: En.strata, patternScale: 5, patternAmt: 0.35 };
  n.legs.forEach((v) => {
    const _ = v.side,
      k = Di(t, [v.upper, v.lower, v.foot], 0.5);
    (o.bind(k).paint(dr, { c2: r0, by: (b, w) => Qn(1.1, 0.2, w), ...r }),
      v.front
        ? o.tube(
            [
              [_ * 0.66, 1.66, 0.6, 0.36, 0.5],
              [_ * 0.76, 1.2, 0.56, 0.33, 0.4],
              [_ * 0.8, 0.8, 0.5, 0.27, 0.31],
              [_ * 0.81, 0.46, 0.58, 0.25, 0.27],
              [_ * 0.82, 0.2, 0.68, 0.28, 0.32],
            ],
            { seg: 9, cap0: !1 },
          )
        : o.tube(
            [
              [_ * 0.52, 1.52, -1.08, 0.38, 0.56],
              [_ * 0.64, 1.06, -0.94, 0.34, 0.46],
              [_ * 0.68, 0.72, -0.82, 0.25, 0.3],
              [_ * 0.67, 0.42, -0.98, 0.21, 0.24],
              [_ * 0.66, 0.2, -1.08, 0.24, 0.28],
            ],
            { seg: 9, cap0: !1 },
          ));
    const M = v.rz + (v.front ? 0.12 : 0.1),
      S = v.front ? 0.31 : 0.26;
    (o.bone(v.foot).paint(r0, { c2: dr, ...r }), o.ball(v.rx, 0.13, M, S, 0.15, v.front ? 0.4 : 0.36, 1));
    for (let b = 0; b < 4; b++) {
      const w = (b - 1.5) * S * 0.48;
      (o.paint(Gw, { c2: gO, gloss: 0.9, glow: 0, glow2: 0.55, mat: K.rock, line: 1 }),
        o.g(
          pt(
            v.rx + w,
            0.12,
            M + (v.front ? 0.32 : 0.28) - Math.abs(b - 1.5) * 0.04,
            76,
            (b - 1.5) * 9 * _,
            0,
          ),
          () => o.crystal(v.front ? 0.055 : 0.045, v.front ? 0.3 : 0.22, 4, 0.75, 0.1),
        ));
    }
    if (v.front) {
      o.bone(v.lower);
      for (let b = 0; b < 2; b++)
        (o.paint(Rp, { c2: Cp, ...c }),
          o.g(pt(v.rx + _ * 0.2, 0.66 - b * 0.24, 0.5 + b * 0.07, 6 + b * 8, _ * 78, _ * -6), () =>
            o.extrude(
              [
                [-0.24, -0.16],
                [0.24, -0.16],
                [0.28, 0.06],
                [0.08, 0.2],
                [-0.2, 0.16],
              ],
              0.1,
              0.035,
            ),
          ));
      (o.paint(Mc, { c2: _d, glow: 0.6, mat: K.crystal, pattern: En.lava, patternScale: 6, patternAmt: 0.7 }),
        o.g(pt(v.rx + _ * 0.265, 0.56, 0.54, 10, _ * 78, 0), () => o.box(0, 0, 0, 0.36, 0.035, 0.03)));
    }
  });
  const f = Di(t, [n.pelvis, n.chest], 1.2),
    d = [
      [0, 1.3, -1.78, 0.2, 0.24],
      [0, 1.32, -1.52, 0.6, 0.6],
      [0, 1.3, -1, 0.8, 0.72],
      [0, 1.26, -0.32, 0.84, 0.7],
      [0, 1.34, 0.36, 0.98, 0.78],
      [0, 1.42, 0.92, 0.72, 0.64],
      [0, 1.52, 1.26, 0.5, 0.48],
    ];
  (o.bind(f).paint(dr, { c2: Hw, by: l, ...r }),
    o.tube(d, { seg: 12, up: [1, 0, 0] }),
    o.paint(r0, { c2: dr, ...r }),
    o.ball(0, 1.74, 0.18, 0.8, 0.44, 0.78, 2));
  const h = (v, _, k = 1.02) => {
      let M = 0;
      for (; M < d.length - 2 && d[M + 1][2] < v;) M++;
      const S = Math.min(1, Math.max(0, (v - d[M][2]) / (d[M + 1][2] - d[M][2]))),
        b = bt(d[M][1], d[M + 1][1], S),
        w = bt(d[M][3], d[M + 1][3], S),
        T = bt(d[M][4], d[M + 1][4], S);
      return [Math.cos(_) * w * k, b + Math.sin(_) * T * k, v];
    },
    u = (v, _, k, M, S, b, w) => {
      const T = [];
      for (let E = 0; E <= S; E++) {
        const A = E / S,
          C = E > 0 && E < S ? (Lp(E, w) - 0.5) * 0.22 : 0,
          R = h(bt(v, k, A) + C, bt(_, M, A) + (E % 2 ? 0.07 : -0.05), 1.015);
        T.push([R[0], R[1], R[2], b * (1 - A * 0.6), b * 0.5]);
      }
      (o
        .bind(f)
        .paint(_d, {
          c2: Mc,
          glow: 0.75,
          glow2: 0.4,
          mat: K.crystal,
          pattern: En.lava,
          patternScale: 6,
          patternAmt: 0.7,
        }),
        o.tube(T, { seg: 4, up: [0, 0, 1] }));
    };
  for (const v of [1, -1]) {
    const _ = (k) => (v > 0 ? k : Math.PI - k);
    (u(0.5, _(1), 0.95, _(0.35), 4, 0.05, 1),
      u(0, _(0.95), 0.1, _(0.1), 4, 0.055, 2),
      u(-0.4, _(1.2), -0.95, _(0.45), 4, 0.05, 3),
      u(-0.9, _(1.4), -1.4, _(0.9), 3, 0.04, 4));
  }
  const m = (v, _, k, M, S, b) => {
    o.tube(
      [
        [v[0], v[1], v[2], b, b * 0.5],
        [v[0] + _ * S * 0.5, v[1] + k * S * 0.5 + 0.03, v[2] + M * S * 0.5, b * 0.8, b * 0.42],
        [v[0] + _ * S, v[1] + k * S, v[2] + M * S, 0.012, 0.012],
      ],
      { seg: 4, up: [1, 0, 0], cap0: !1 },
    );
  };
  o.bind(f).paint(r0, { c2: b2, ...r });
  for (let v = 0; v < 6; v++)
    m(h(-0.45 - v * 0.22, Math.PI / 2 + (v % 2 ? 0.12 : -0.12), 0.97), 0, 0.5, -0.86, 0.34 - v * 0.025, 0.13);
  for (const v of [1, -1]) {
    const _ = (k) => (v > 0 ? k : Math.PI - k);
    (m(h(-1.25, _(0.75), 0.97), v * 0.5, 0.2, -0.84, 0.3, 0.12),
      m(h(-1.5, _(0.3), 0.97), v * 0.55, -0.1, -0.83, 0.28, 0.11));
  }
  (o.bone(n.tail[0]).paint(r0, { ...r }), o.ball(0, 1.4, -1.8, 0.16, 0.14, 0.14, 1), o.bone(e));
  for (let v = 0; v < 6; v++) {
    const _ = (v / 6) * Ap + 0.26,
      k = 0.5,
      M = 0.62 + 0.2 * Lp(v, 11) + (v === 1 || v === 4 ? 0.14 : 0);
    (o.paint(Rp, { c2: Cp, ...c }),
      o.g(pt(Math.sin(_) * k, 1.86, 0.1 + Math.cos(_) * k * 0.92, 0, (_ * 180) / Math.PI, 0), () =>
        o.g(pt(0, 0, 0, 24, 0, (Lp(v, 12) - 0.5) * 14), () => {
          (o.extrude(
            [
              [-0.3, 0],
              [0.3, 0],
              [0.34, M * 0.5],
              [0.14, M],
              [-0.06, M * 0.9],
              [-0.32, M * 0.55],
            ],
            0.16,
            0.05,
          ),
            o.paint(Mc, { c2: _d, glow: 0.55, mat: K.crystal }),
            o.g(pt(0, M * 0.34, -0.085), () => o.box(0, 0, 0, 0.3, 0.05, 0.03)),
            o.paint(Rp, { c2: Cp, ...c }));
        }),
      ));
  }
  (o
    .bone(s)
    .paint(_d, {
      c2: Mc,
      glow: 0.95,
      glow2: 0.7,
      mat: K.crystal,
      pattern: En.lava,
      patternScale: 5,
      patternAmt: 0.8,
    }),
    o.lathe(
      [
        [2.04, 0.5, 0.48, 0, 0.1],
        [2.14, 0.4, 0.38, 0, 0.1],
        [2.2, 0.2, 0.2, 0, 0.1],
        [2.22, 0.02, 0.02, 0, 0.1],
      ],
      { seg: 8, cap0: !1 },
    ),
    i.forEach((v, _) => {
      o.bone(v).paint(Mc, { c2: $w, glow: 0.8, glow2: 0.95, mat: K.crystal });
      const k = (_ / 3) * Ap + 0.5,
        M = Math.sin(k) * 0.17,
        S = 0.1 + Math.cos(k) * 0.17,
        b = 0.5 + 0.16 * (_ % 2);
      o.tube(
        [
          [M, 2.14, S, 0.13, 0.13],
          [M * 1.2, 2.14 + b * 0.4, S + 0.03, 0.1, 0.1],
          [M * 0.7, 2.14 + b * 0.75, S - 0.04, 0.05, 0.05],
          [M * 0.9, 2.14 + b, S, 0.008, 0.008],
        ],
        { seg: 5, cap0: !1 },
      );
    }));
  const x = Di(t, [n.chest, n.neck[0], n.head], 0.9);
  (o.bind(x).paint(dr, { c2: Hw, by: l, ...r }),
    o.tube(
      [
        [0, 1.48, 1, 0.62, 0.58],
        [0, 1.58, 1.26, 0.5, 0.48],
        [0, 1.66, 1.5, 0.44, 0.42],
      ],
      { seg: 10, up: [1, 0, 0], cap0: !1 },
    ),
    o.bone(n.head).paint(dr, { c2: b2, by: (v, _, k) => Qn(1.75, 2.2, k), ...r }),
    o.tube(
      [
        [0, 1.68, 1.36, 0.4, 0.38],
        [0, 1.74, 1.6, 0.45, 0.42],
        [0, 1.72, 1.82, 0.4, 0.34],
        [0, 1.64, 2.02, 0.26, 0.2],
        [0, 1.6, 2.2, 0.2, 0.15],
        [0, 1.58, 2.3, 0.13, 0.1],
      ],
      { seg: 10, up: [1, 0, 0] },
    ),
    o.paint(Gw, { gloss: 0.6, mat: K.leather }),
    o.ball(0, 1.62, 2.33, 0.1, 0.07, 0.06, 1),
    o.paint(Rp, { c2: Cp, ...c }),
    o.g(pt(0, 2.1, 1.66, 74, 0, 0), () =>
      o.extrude(
        [
          [0, -0.3],
          [0.2, -0.02],
          [0.13, 0.2],
          [-0.13, 0.2],
          [-0.2, -0.02],
        ],
        0.08,
        0.03,
      ),
    ),
    o.sym(() => {
      (o.paint(r0, { c2: dr, ...r }),
        o.ball(0.36, 2.06, 1.5, 0.15, 0.15, 0.08, 1),
        o.paint(xO, { glow: 0.95, mat: K.crystal }),
        o.g(pt(0.26, 1.88, 1.93, -10, 36, 22), () =>
          o.extrude(
            [
              [-0.09, 0],
              [0, 0.035],
              [0.09, 0.02],
              [0.01, -0.03],
            ],
            0.05,
            0,
          ),
        ),
        o.paint(r0, { ...r }),
        o.g(pt(0.27, 1.95, 1.9, -14, 34, 26), () => o.box(0, 0, 0, 0.24, 0.05, 0.08, 0.02)),
        o.paint(dr, { c2: b2, ...r }),
        o.tube(
          [
            [0.4, 1.64, 1.62, 0.1, 0.05],
            [0.52, 1.56, 1.5, 0.08, 0.04],
            [0.6, 1.46, 1.36, 0.012, 0.012],
          ],
          { seg: 4, up: [0, 0, 1], cap0: !1 },
        ),
        o.paint(16050384, { gloss: 0.6, mat: K.leather }),
        o.g(pt(0.12, 1.52, 2.2, 180, 0, 0), () => o.crystal(0.035, 0.14, 4, 0.9, 0.05)));
    }),
    o.bone(n.jaw).paint(r0, { c2: dr, ...r }),
    o.tube(
      [
        [0, 1.5, 1.56, 0.34, 0.14],
        [0, 1.46, 1.92, 0.24, 0.1],
        [0, 1.47, 2.22, 0.14, 0.07],
      ],
      { seg: 8, up: [1, 0, 0] },
    ),
    o.paint(Mc, { c2: _d, glow: 0.75, mat: K.crystal }),
    o.tube(
      [
        [0, 1.535, 1.66, 0.24, 0.03],
        [0, 1.5, 2.12, 0.11, 0.03],
      ],
      { seg: 4, up: [1, 0, 0] },
    ),
    o.paint(16050384, { gloss: 0.6, mat: K.leather }),
    o.sym(() => o.g(pt(0.1, 1.5, 2.14), () => o.crystal(0.03, 0.12, 4, 0.9, 0.05))));
  const p = 10;
  for (let v = 0; v < p; v++) {
    const _ = bt(-0.15, Math.PI + 0.15, v / (p - 1)),
      k = Math.cos(_),
      M = Math.sin(_),
      S = [k * 0.56, 1.5 + M * 0.52, 1.08],
      b = 0.62 + 0.3 * M + 0.14 * Lp(v, 21),
      w = [k * (0.56 + b * 0.62), 1.5 + M * (0.52 + b * 0.7) + 0.1, 1.08 - b * 0.62],
      T = [bt(S[0], w[0], 0.5) + k * 0.1, bt(S[1], w[1], 0.5) + 0.1, bt(S[2], w[2], 0.5) + 0.06];
    (o.bone(a[v % 4]).paint(mO, { c2: $w, glow: 0.14, glow2: 0.42, mat: K.fur, line: 1 }),
      o.tube(
        [
          [S[0], S[1], S[2], 0.2, 0.09],
          [T[0], T[1], T[2], 0.16, 0.07],
          [w[0], w[1], w[2], 0.012, 0.012],
        ],
        { seg: 5, up: [-M, k, 0], cap0: !1 },
      ));
  }
  o.bakeGrounding(2.6, 0.72, 0.9);
  const g = 3.6,
    y = (v, _, k) => {
      const M = _.time + _.seed * 7,
        S = Math.sin(M * 1.9),
        b = (_.mode & 2) !== 0;
      let w = 0,
        T = 1 + 0.18 * S,
        E = !0;
      switch (
        (v.pos(n.pelvis, 0, S * 0.02 - 0.03, 0),
        v.rot(n.chest, S * 1.2, 0, 0),
        v.rot(n.neck[0], 10 - S * 1.5, 0, 0),
        v.rot(n.head, 6, 0, 0),
        v.rot(n.tail[0], 0, Math.sin(M * 3) * 10, 0),
        _.anim)
      ) {
        case "dead": {
          const C = _.t,
            R = Kn(Ct(C, 0, 0.35)) * (1 - wf(Ct(C, 0.55, 0.95))),
            I = wf(Ct(C, 0.6, 1.25)),
            P = Xe(Ct(C, 1.25, 1.6), 0.3, 0.3);
          ((w = Math.max(R, 0.4 * I)),
            v.move(n.pelvis, 0, -0.62 * I + 0.05 * P, 0.5 * I),
            v.add(n.pelvis, 4 * I, 0, 5 * I),
            V1(n, v, R, 50, 0.35),
            v.add(n.chest, 6 * I, 0, 0),
            v.add(n.neck[0], 34 * R + 16 * I, 0, 0),
            v.add(n.head, -30 * R + 6 * I, 0, 12 * I));
          for (let L = 0; L < 2; L++) {
            const B = n.legs[L];
            Ds(
              n,
              v,
              L,
              B.rx + B.side * 0.25 * (R + I),
              B.ry + 2.6 * R,
              B.rz - 0.5 * R + 0.75 * I,
              40 * R - 20 * I,
            );
          }
          for (let L = 2; L < 4; L++) {
            const B = n.legs[L];
            Ds(n, v, L, B.rx + B.side * 0.2 * I, B.ry, B.rz - 0.5 * I, 50 * I);
          }
          E = !1;
          const F = Ct(C, 0.5, 1.1);
          ((T = (1 + 1.2 * Xe(C, 0.3, 0.3)) * (1 - F)),
            v.scale(s, 1 - 0.5 * F),
            i.forEach((L) => v.scale(L, Math.max(0, (1 + 1.5 * Xe(C, 0.3, 0.28)) * (1 - Ct(C, 0.45, 0.8))))),
            a.forEach((L) => v.scale(L, 1 - 0.75 * Ct(C, 0.6, 1.3))),
            v.add(e, 0, 0, 4 * P),
            (k.tint = 0.55 * Ct(C, 0.7, 1.5)),
            (k.tintColor = 7827578));
          break;
        }
        case "move": {
          const C = _.stride * Ap;
          (v.add(n.neck[0], 6 + Math.sin(C + 1.4) * 8, 0, 0),
            v.add(n.head, -Math.sin(C + 1) * 7, 0, 0),
            Im(n, v, _.stride, { style: "bound", stride: g, lift: 0.5, bob: 0.13, pitch: 7, curl: 36 }),
            (E = !1),
            (T += 0.2));
          break;
        }
        case "attack": {
          const C = Qo(_.p, _.windup),
            R = Kn(Ct(C, 0, 0.27)),
            I = Ct(C, 0.27, 0.36),
            P = Gn(Ct(C, 0.5, 1));
          if (_.mode & 1) {
            const F = R * (1 - I),
              L = I * (1 - P);
            (v.move(n.pelvis, 0, -0.14 * L, 0.3 * L),
              v.add(n.pelvis, 8 * L, 0, 0),
              V1(n, v, F, 56, 0.4),
              v.add(n.neck[0], 36 * F + 10 * L, 0, 0),
              v.add(n.head, -10 * F, 0, 0),
              (w = F + 0.5 * L));
            for (let B = 0; B < 2; B++) {
              const G = n.legs[B];
              Ds(n, v, B, G.rx + G.side * 0.2 * F, G.ry + 3.2 * F, G.rz - 0.55 * F + 0.3 * L, 30 * F);
            }
            (_a(n, v, 0, 0, 12),
              (E = !1),
              (T += 0.4 * F + 1.1 * Xe(C, 0.37, 0.16)),
              i.forEach((B) => v.scale(B, 1 + 1.6 * Xe(C, 0.4, 0.2))));
          } else {
            const F = _.variant % 2 === 0 ? -1 : 1,
              L = F > 0 ? 0 : 1,
              B = R * (1 - I),
              G = I * (1 - P);
            (v.move(n.pelvis, 0, 0.06 * B - 0.08 * G, -0.16 * B + 0.4 * G),
              v.add(n.pelvis, -5 * B + 6 * G, 0, 0),
              v.add(n.chest, 0, F * (16 * B - 24 * G), F * (-6 * B + 8 * G)),
              v.add(n.neck[0], -8 * B + 10 * G, F * (-10 * B + 16 * G), 0),
              (w = 0.5 * B + 0.8 * G));
            const q = n.legs[L];
            (_a(n, v, 0, 0, 15 & ~(1 << L)),
              Ds(
                n,
                v,
                L,
                q.rx + F * (0.35 * B - 0.75 * G),
                q.ry + 1 * B + 0.5 * G * (1 - G),
                q.rz - 0.25 * B + 0.95 * G,
                30 * B - 20 * G,
              ),
              (E = !1),
              (T += 0.2 * B + 0.6 * Xe(C, 0.36, 0.14)));
          }
          break;
        }
        case "stunned": {
          (v.add(n.neck[0], 22, Math.sin(M * 5) * 14, 0),
            v.add(n.head, 10, 0, Math.sin(M * 5 + 1) * 16),
            v.add(n.pelvis, 0, 0, Math.sin(M * 2.5) * 3),
            (T *= 0.6));
          break;
        }
        case "airborne": {
          (v.rot(n.root, -14 * Math.sin(_.p * Math.PI), 0, 8),
            n.legs.forEach((C, R) =>
              Ds(n, v, R, C.rx + C.side * 0.2, C.ry + 0.3, C.rz + (C.front ? 0.3 : -0.3), 30),
            ),
            (E = !1));
          break;
        }
        default:
          if (_.spawnT >= 0) {
            const C = _.spawnT / 1.2,
              R = Kn(Ct(C, 0, 0.5)),
              I = Xe(C, 0.55, 0.16),
              P = Xe(C, 0.82, 0.18);
            (v.pos(n.root, Math.sin(C * 70) * 0.05 * I, -2.3 * (1 - R), 0),
              v.add(n.pelvis, -10 * (1 - R), 0, Math.sin(C * 60) * 5 * I),
              v.add(n.neck[0], -26 * P, 0, 0),
              v.add(n.head, -24 * P, 0, 0),
              (w = P),
              (T = 0.4 + 0.6 * R + 0.8 * P),
              i.forEach((F) => v.scale(F, R * (1 + 1.2 * P))));
          } else if (b) {
            const C = (M * 0.3) % 1,
              R = Xe(C, 0.5, 0.12);
            (v.move(n.pelvis, 0, -0.08, -0.06),
              v.add(n.pelvis, 4, 0, 0),
              v.add(n.neck[0], 8 - 30 * R, Math.sin(M * 9) * 1.5, 0),
              v.add(n.head, -18 * R, 0, 0),
              (w = 0.25 + 0.75 * R),
              (T += 0.2 + 0.4 * R));
          } else {
            const C = (M / 6.5) % 1,
              R = Math.floor(M / 6.5) % 2,
              I = Gn(Ct(C, 0.6, 0.68)) * (1 - Gn(Ct(C, 0.88, 0.97)));
            if (
              (v.add(n.neck[0], 0, Math.sin(M * 0.33) * 9 * (1 - I), 0),
              v.add(n.head, Math.sin(M * 0.8) * 2, Math.sin(M * 0.33 + 0.6) * 10 * (1 - I), 0),
              R === 0)
            )
              (v.add(n.neck[0], -18 * I, 0, 0), v.add(n.head, -14 * I, 0, 8 * I), (w = I), (T += 0.3 * I));
            else if (I > 0) {
              const P = I * Math.max(0, Math.sin(C * Ap * 8)),
                F = n.legs[0];
              (_a(n, v, 0, 0, 14),
                Ds(n, v, 0, F.rx, F.ry + 0.22 * P, F.rz + 0.3 - 0.4 * P, 20 * P),
                (E = !1),
                v.add(n.neck[0], 14 * I, 10 * I, 0));
            }
          }
      }
      const A = Jo(_.hitT);
      if (A > 0 && _.anim !== "dead") {
        const C = _.seed > 0.5 ? 1 : -1;
        (v.add(n.neck[0], 10 * A, C * 16 * A, 0),
          v.add(n.head, 8 * A, 0, C * 14 * A),
          v.move(n.pelvis, 0, -0.06 * A, -0.08 * A),
          (T += 0.6 * A));
      }
      (v.rot(n.jaw, 4 + 30 * w, 0, 0),
        i.forEach((C, R) => {
          const I = 0.85 + 0.3 * Math.sin(M * 9 + R * 2.1) + 0.15 * Math.sin(M * 17 + R);
          (v.scale(C, v.s[C * 3] * I),
            v.rot(C, Math.sin(M * 6 + R * 1.7) * 10, M * 40 * (R % 2 ? 1 : -1), Math.cos(M * 5 + R) * 10));
        }),
        a.forEach((C, R) => {
          (v.scale(C, v.s[C * 3] * (1 + 0.06 * Math.sin(M * 7 + R * 1.6))),
            v.rot(
              C,
              Math.sin(M * 4.3 + R * 1.9) * 4 - (_.anim === "move" ? 8 : 0),
              0,
              Math.sin(M * 5.1 + R * 2.3) * 3,
            ));
        }),
        v.scale(s, v.s[s * 3] * (1 + 0.06 * S)),
        (k.glow = Math.max(0.03, T)),
        E && _a(n, v));
    };
  return {
    key: "monster:ember_golem",
    geometry: o.build(),
    rig: t,
    height: 2.95,
    radius: 1.6,
    scale: 1,
    stride: g,
    triangles: o.triangleCount,
    deathDur: 2.2,
    spawnDur: 1.2,
    outline: 1.6,
    attach: {
      chest: { joint: n.chest, x: 0, y: 0, z: 0.2 },
      head: { joint: n.head, x: 0, y: 0.2, z: 0.3 },
      muzzle: { joint: n.head, x: 0, y: -0.12, z: 0.8 },
      weapon: { joint: n.legs[1].foot, x: 0, y: 0, z: 0.3 },
      handL: { joint: n.legs[0].foot, x: 0, y: 0, z: 0.3 },
      handR: { joint: n.legs[1].foot, x: 0, y: 0, z: 0.3 },
      crest: { joint: e, x: 0, y: 0.3, z: 0 },
      vent: { joint: e, x: 0, y: 0.55, z: 0 },
      tail: { joint: n.tail[0], x: 0, y: 0, z: -0.2 },
    },
    blend: (v, _) => (_ === "attack" ? 0.1 : 0.2),
    animate: y,
  };
}

const Ip = Math.PI * 2,
  Vw = Math.PI / 180,
  l0 = 4475512,
  kc = 7897272,
  c0 = 2566988,
  vO = 9071178,
  $i = 16764768,
  Ja = 16773304,
  bO = 16774348,
  _O = 16756800,
  wO = 16776160,
  Sc = (n, t) => {
    const e = Math.sin(n * 127.1 + t * 311.7) * 43758.5453;
    return e - Math.floor(e);
  };

function MO() {
  const n = new Wa(),
    t = n.add("root", -1, 0, 0, 0),
    e = 4,
    s = n.add("torso", t, 0, e, 0),
    i = n.add("core", s, 0, e, 0.1),
    a = [0, 1, 2].map((S) => n.add(`ring${S}`, s, 0, e, 0.1)),
    o = n.add("head", s, 0, 5.5, 0.3),
    r = n.add("halo", s, 0, 5.35, -1),
    l = [1, -1].map((S) => n.add(`shoulder${S}`, s, S * 2.05, 5.05, 0)),
    c = [0, 1, 2, 3].map((S) => n.add(`plate${S}`, s, (S % 2 ? -1 : 1) * 0.9, e, S < 2 ? 0.75 : -0.75)),
    f = [1, -1].map((S) => n.add(`fist${S}`, t, S * 2.95, 2.9, 0.9)),
    d = [2.85, 2.4, 1.98, 1.6, 1.24, 0.9],
    h = [1.1, 0.9, 0.72, 0.56, 0.42, 0.28],
    u = d.map((S, b) =>
      n.add(`waist${b}`, t, Math.cos(b * 2.4) * (0.34 - b * 0.05), S, Math.sin(b * 2.4) * (0.34 - b * 0.05)),
    ),
    m = new Ls();
  m.crease = 32;
  const x = { gloss: 0.55, mat: K.metal, pattern: En.meteor, patternScale: 3, patternAmt: 0.5, grain: 0.06 },
    p = { gloss: 1, mat: K.metal },
    g = (S, b, w, T, E, A, C, R) => {
      (m.paint($i, { c2: Ja, glow: 0.55, mat: K.crystal, line: 0 }),
        m.g(pt(S, b, w, T, E, A), () => m.box(0, 0, 0, C, R, 0.07)));
    },
    y = (S, b = 0.06) => {
      const w = [];
      for (let T = 0; T < 16; T++) {
        const E = (T / 16) * Ip,
          A = T % 2 === 0 ? S * (T % 4 === 0 ? 1 : 0.72) : S * 0.34;
        w.push([Math.cos(E) * A, Math.sin(E) * A]);
      }
      m.extrude(w, b, 0);
    };
  (u.forEach((S, b) => {
    const w = h[b],
      T = n.bx(S),
      E = n.bz(S);
    ((m.rough = 0.04),
      m.bone(S).paint(b % 2 ? l0 : c0, { c2: kc, ...x }),
      m.g(pt(T, d[b], E, Sc(b, 1) * 20 - 10, b * 57, Sc(b, 2) * 20 - 10), () =>
        m.lathe(
          [
            [-w * 0.62, w * 0.18],
            [-w * 0.3, w * 0.78],
            [w * 0.08, w],
            [w * 0.36, w * 0.8],
            [w * 0.52, w * 0.3],
          ],
          { seg: 6, phase: 15 },
        ),
      ),
      (m.rough = 0),
      m.paint($i, { c2: Ja, glow: 0.5, mat: K.crystal, line: 0 }),
      m.g(pt(T, d[b] + w * 0.1, E, 0, b * 57, 0), () =>
        m.torus(w * 1, 0.035, 0.05, 6, 4, { crease: 30, phase: 0 }),
      ));
  }),
    m.bone(u[5]).paint($i, { c2: Ja, glow: 0.3, glow2: 0.7, ...p, mat: K.crystal, line: 1 }),
    m.g(pt(n.bx(u[5]), 0.92, n.bz(u[5]), 180, 0, 0), () => m.crystal(0.12, 0.46, 4, 0.2, 0.75)),
    [
      [18, 78],
      [102, 162],
      [-78, -18],
      [-162, -102],
    ].forEach(([S, b], w) => {
      const T = (F) => bt(0.86, 1.62, Math.pow((F - 2.95) / 2, 1.2)),
        A = 2.95 + (w < 2 ? 0.25 : 0),
        C = 4.95,
        R = (F, L, B) => {
          const G = T(L) - (B ? 0.34 : 0);
          return [Math.cos(F * Vw) * G, L, Math.sin(F * Vw) * G * 0.86 + 0.05];
        };
      ((m.rough = 0.03),
        m.bone(c[w]).paint(l0, { c2: kc, ...x }),
        m.sheet(4, 4, (F, L) => R(bt(b, S, F), bt(A, C, L), !1), !1, 30),
        m.paint(c0, { c2: vO, ...x }),
        m.sheet(3, 3, (F, L) => R(bt(S, b, F), bt(A, C, L), !0), !1, 30),
        m.paint(c0, { c2: l0, ...x }),
        m.sheet(1, 4, (F, L) => R(S, bt(A, C, L), F > 0.5), !0, 30),
        m.sheet(1, 4, (F, L) => R(b, bt(A, C, L), F < 0.5), !0, 30),
        m.sheet(4, 1, (F, L) => R(bt(S, b, F), C, L < 0.5), !0, 30),
        m.sheet(4, 1, (F, L) => R(bt(S, b, F), A, L > 0.5), !0, 30),
        (m.rough = 0));
      const I = (S + b) / 2,
        P = R(I, 4, !1);
      (g(P[0] * 1.03, 4, P[2] * 1.03, 0, 90 - I, 0, 0.09, 1.1),
        m.paint($i, { ...p }),
        m.sheet(
          4,
          1,
          (F, L) => {
            const B = R(bt(b, S, F), bt(4.72, 4.9, L), !1);
            return [B[0] * 1.035, B[1], B[2] * 1.035];
          },
          !1,
          30,
        ));
    }),
    m.bone(i).paint(_O, { c2: bO, glow: 0.35, glow2: 0.6, gloss: 1, mat: K.crystal, line: 1 }),
    m.ball(0, e, 0.1, 0.56, 0.62, 0.56, 0, 0),
    m.paint(Ja, { glow: 0.7, mat: K.crystal, line: 0 }));
  for (let S = 0; S < 6; S++)
    m.g(pt(0, e, 0.1, S === 5 ? 180 : 0, S * 90, S < 4 ? 90 : 0), () =>
      m.g(pt(0, 0.4, 0), () => m.crystal(0.12, 0.5, 4, 0.8, 0.1)),
    );
  const _ = [1.5, 1.7, 1.9];
  (a.forEach((S, b) => {
    const w = _[b];
    (m.bone(S).paint($i, { c2: Ja, glow: 0.14, ...p, line: 1 }),
      m.g(pt(0, e, 0.1), () => {
        m.torus(w, 0.075, 0.11, 32, 4, { crease: 30, phase: 45 });
        for (let T = 0; T < 16; T++) {
          const E = (T / 16) * Ip,
            A = T % 4 === 0;
          (m.paint(A ? Ja : $i, { glow: A ? 0.7 : 0.14, ...p, mat: A ? K.crystal : K.metal, line: 0 }),
            m.g(pt(Math.cos(E) * (w - 0.1), 0, Math.sin(E) * (w - 0.1), 0, -(E * 180) / Math.PI, 0), () =>
              m.box(0, 0, 0, A ? 0.3 : 0.14, A ? 0.16 : 0.2, A ? 0.16 : 0.06),
            ));
        }
      }));
  }),
    l.forEach((S, b) => {
      const w = b === 0 ? 1 : -1;
      ((m.rough = 0.045),
        m.bone(S).paint(c0, { c2: kc, ...x }),
        m.g(pt(w * 2.05, 5.05, 0, 0, 0, w * -9), () => {
          (m.lathe(
            [
              [-0.62, 0.3, 0.34],
              [-0.3, 0.74, 0.7],
              [0.2, 0.98, 0.9],
              [0.42, 0.92, 0.84],
              [0.52, 0.5, 0.5],
            ],
            { seg: 6, phase: 30, power: 2.6 },
          ),
            (m.rough = 0),
            m.paint($i, { ...p }),
            m.lathe(
              [
                [0.18, 1, 0.92],
                [0.3, 1, 0.92],
                [0.31, 0.95, 0.87],
              ],
              { seg: 6, phase: 30, power: 2.6, cap0: !1, cap1: !1 },
            ),
            m.paint($i, { c2: Ja, glow: 0.2, glow2: 0.6, gloss: 1, mat: K.crystal, line: 1 }),
            m.g(pt(w * 0.1, 0.42, 0, 0, 0, w * -8), () => m.crystal(0.2, 1, 5, 0.55, 0.1)),
            m.g(pt(w * 0.5, 0.36, 0.14, 12, 0, w * -30), () => m.crystal(0.14, 0.66, 5, 0.55, 0.1)),
            m.g(pt(w * 0.42, 0.36, -0.2, -16, 0, w * -24), () => m.crystal(0.13, 0.58, 5, 0.55, 0.1)));
        }),
        g(w * 2, 5, 0.86, 0, 0, 0, 0.7, 0.08),
        g(w * 2, 4.8, 0.78, 0, 0, 0, 0.36, 0.06));
    }),
    (m.rough = 0.04),
    m.bone(s).paint(c0, { c2: l0, ...x }),
    m.g(pt(0, 5.02, -0.3), () =>
      m.lathe(
        [
          [-0.34, 0.5, 0.36],
          [0, 1.3, 0.5],
          [0.3, 1.26, 0.46],
          [0.42, 0.6, 0.3],
        ],
        { seg: 6, power: 2.6 },
      ),
    ),
    (m.rough = 0),
    m.bone(o),
    (m.rough = 0.02),
    m.paint(c0, { c2: l0, ...x }),
    m.lathe(
      [
        [5.3, 0.24, 0.26, 0, 0.16],
        [5.6, 0.44, 0.4, 0, 0.14],
        [6.1, 0.48, 0.42, 0, 0.1],
        [6.32, 0.3, 0.3, 0, 0.06],
      ],
      { seg: 6, phase: 90 },
    ),
    (m.rough = 0),
    m.paint(l0, { c2: kc, ...x }),
    m.g(pt(0, 5.86, 0.5, -6, 0, 0), () =>
      m.extrude(
        [
          [0, -0.66],
          [0.34, -0.36],
          [0.48, 0.2],
          [0.34, 0.52],
          [0, 0.62],
          [-0.34, 0.52],
          [-0.48, 0.2],
          [-0.34, -0.36],
        ],
        0.16,
        0.05,
      ),
    ),
    m.paint($i, { ...p }),
    m.g(pt(0, 5.86, 0.56, -6, 0, 0), () =>
      m.extrude(
        [
          [0, -0.7],
          [0.06, -0.6],
          [0.06, -0.46],
          [0, -0.42],
          [-0.06, -0.46],
          [-0.06, -0.6],
        ],
        0.08,
        0.01,
      ),
    ),
    m.paint(wO, { glow: 0.95, mat: K.crystal, line: 0 }),
    m.sym(() => m.g(pt(0.2, 5.82, 0.59, -6, 0, 12), () => m.box(0, 0, 0, 0.24, 0.06, 0.06, 0.015))),
    m.g(pt(0, 6.12, 0.585, -6, 0, 0), () =>
      m.extrude(
        [
          [0, 0.3],
          [0.035, 0.05],
          [0.13, 0],
          [0.035, -0.05],
          [0, -0.26],
          [-0.035, -0.05],
          [-0.13, 0],
          [-0.035, 0.05],
        ],
        0.06,
        0,
      ),
    ));
  for (let S = 0; S < 5; S++) {
    const b = Math.PI * (0.2 + 0.15 * S);
    (m.paint($i, { c2: Ja, glow: 0.18, glow2: 0.6, gloss: 1, mat: K.crystal, line: 1 }),
      m.g(pt(Math.cos(b) * 0.5, 6.06 + Math.sin(b) * 0.24, 0, -18, 0, 90 - (b * 180) / Math.PI), () =>
        m.crystal(0.1, 0.56 + (S === 2 ? 0.4 : 0.14 * (S % 2)), 4, 0.8, 0.08),
      ));
  }
  (m.bone(r).paint($i, { c2: Ja, glow: 0.3, ...p, line: 1 }),
    m.g(pt(0, 5.35, -1, 90, 0, 0), () => {
      (m.torus(1.5, 0.09, 0.05, 32, 4, { crease: 30 }), m.torus(1.16, 0.04, 0.03, 24, 4, { crease: 30 }));
      for (let S = 0; S < 8; S++) {
        const b = (S / 8) * Ip;
        (m.paint(Ja, { c2: $i, glow: 0.7, glow2: 0.3, gloss: 1, mat: K.crystal, line: 1 }),
          m.g(pt(Math.cos(b) * 1.5, 0, Math.sin(b) * 1.5, 0, -(b * 180) / Math.PI, 0), () =>
            m.g(pt(0.06, 0, 0, 0, 0, -90), () => m.crystal(0.1, S % 2 ? 0.44 : 0.74, 4, 0.82, 0.12)),
          ),
          m.paint($i, { glow: 0.2, ...p, line: 0 }),
          m.g(pt(Math.cos(b) * 1.33, 0, Math.sin(b) * 1.33, 0, -(b * 180) / Math.PI, 0), () =>
            m.box(0, 0, 0, 0.34, 0.035, 0.05),
          ));
      }
    }),
    f.forEach((S, b) => {
      const w = b === 0 ? 1 : -1;
      (m.bone(S),
        m.g(pt(w * 2.95, 2.9, 0.9), () => {
          ((m.rough = 0.045),
            m.paint(l0, { c2: c0, ...x }),
            m.lathe(
              [
                [0.5, 0.56, 0.52],
                [1, 0.46, 0.44],
                [1.5, 0.36, 0.36],
                [1.72, 0.16, 0.18],
              ],
              { seg: 6, phase: 15 },
            ),
            m.paint(c0, { c2: kc, ...x }),
            m.box(0, -0.08, 0.06, 1.28, 1.14, 1.32, 0.26),
            (m.rough = 0),
            m.paint(l0, { c2: kc, ...x }));
          for (const T of [-0.4, 0, 0.4]) m.box(T, -0.52, 0.52, 0.34, 0.3, 0.4, 0.09);
          (m.paint($i, { ...p }),
            m.g(pt(0, 0.52, 0.04), () => m.torus(0.6, 0.07, 0.1, 8, 4, { crease: 30, phase: 22.5 })),
            m.g(pt(0, 1.02, 0), () => m.torus(0.47, 0.05, 0.07, 6, 4, { crease: 30 })),
            m.paint(Ja, { glow: 0.7, mat: K.crystal, line: 0 }),
            m.g(pt(0, -0.02, 0.73), () => y(0.34)),
            m.g(pt(w * 0.655, -0.04, 0.06, 0, 90, 0), () => y(0.24)));
        }));
    }),
    m.bakeGrounding(6.2, 0.72, 0.92));
  const k = (S, b, w, T, E, A) => {
      if (w <= 0) return;
      const C = Sc(T, 31) * Ip;
      (S.move(b, Math.cos(C) * A * w, -(E - 0.3) * w, Math.sin(C) * A * w),
        S.add(b, (Sc(T, 32) * 160 - 80) * w, (Sc(T, 33) * 200 - 100) * w, (Sc(T, 34) * 160 - 80) * w));
    },
    M = (S, b, w) => {
      const T = b.time * 0.9 + b.seed * 6,
        E = Math.sin(T * 1.2),
        A = (b.mode & 2) !== 0;
      let C = 1;
      const R = A ? 2 : 1;
      let I = 1 + 0.16 * Math.sin(T * 2) + (A ? 0.35 : 0),
        P = 1;
      switch (
        (S.pos(s, 0, E * 0.14, 0),
        S.rot(s, 3 + E * 1, Math.sin(T * 0.4) * 4, 0),
        S.rot(i, T * 30, T * 46, 0),
        S.scale(i, 1 + 0.05 * Math.sin(T * 3)),
        S.rot(o, Math.sin(T * 0.8) * 3, Math.sin(T * 0.35) * 9, 0),
        S.pos(o, 0, Math.sin(T * 1.2 + 0.6) * 0.06, 0),
        l.forEach((G, q) => {
          (S.pos(G, 0, Math.sin(T * 1.2 + 1 + q * 1.4) * 0.1, 0),
            S.rot(G, 0, 0, Math.sin(T * 0.9 + q * 2) * 3));
        }),
        c.forEach((G, q) => S.pos(G, 0, Math.sin(T * 1.2 + q * 1.1) * 0.05, 0)),
        f.forEach((G, q) => {
          const et = q === 0 ? 1 : -1;
          (S.pos(
            G,
            et * Math.sin(T * 0.8 + q) * 0.08,
            Math.sin(T * 1.2 + 2 + q * 1.7) * 0.16,
            Math.cos(T * 0.7 + q) * 0.08,
          ),
            S.rot(G, -8 + Math.sin(T + q) * 4, et * -10, et * Math.sin(T * 0.9 + q * 2) * 4));
        }),
        u.forEach((G, q) => {
          (S.pos(
            G,
            Math.sin(T * 0.9 + q * 1.3) * 0.07,
            Math.sin(T * 1.2 - q * 0.7) * 0.1,
            Math.cos(T * 0.8 + q * 1.1) * 0.07,
          ),
            S.rot(G, 0, T * (12 + q * 8) * (q % 2 ? -1 : 1), 0));
        }),
        b.anim)
      ) {
        case "dead": {
          const G = b.t;
          (a.forEach((ct, rt) => {
            const mt = Kn(Ct(G, rt * 0.3, rt * 0.3 + 0.7)),
              nt = rt * 2.1 + 0.6;
            (S.move(
              ct,
              Math.cos(nt) * 4.5 * mt,
              1.2 * Math.sin(mt * Math.PI) - 2.4 * mt * mt,
              Math.sin(nt) * 4.5 * mt,
            ),
              S.scale(ct, 1 - Ct(G, rt * 0.3 + 0.45, rt * 0.3 + 0.8)));
          }),
            (P = 0),
            (C = 1 + 4 * Ct(G, 0, 0.6)));
          const q = (ct, rt, mt, nt, H) => {
            const st = wf(Ct(G, nt, nt + 0.55));
            (k(S, ct, st, rt, mt, H), st >= 1 && S.move(ct, 0, 0.06 * Xe(G, nt + 0.62, 0.08), 0));
          };
          (f.forEach((ct, rt) => q(ct, 40 + rt, 2.9, 1 + rt * 0.16, 0.6)),
            l.forEach((ct, rt) => q(ct, 50 + rt, 5.05, 1.6 + rt * 0.2, 1.3)),
            c.forEach((ct, rt) => q(ct, 60 + rt, 3.4, 1.7 + rt * 0.14, 1.5)),
            u.forEach((ct, rt) => q(ct, 70 + rt, d[rt], 1.5 + rt * 0.1, 1.1)),
            q(o, 80, 5.6, 2, 0.9),
            S.scale(r, 1 - Ct(G, 0.9, 1.5)));
          const et = Gn(Ct(G, 2.4, 3));
          (S.pos(i, 0, 1.6 * et, 0),
            S.scale(
              i,
              (1 + 0.25 * Math.sin(G * 40) * Ct(G, 0.6, 2.4) + 0.9 * Xe(G, 3.1, 0.2)) *
                (1 - Ct(G, 3.15, 3.4)),
            ),
            (I =
              (1 + 0.5 * Math.sin(G * 34) * Ct(G, 0.5, 2.4)) * (1 - 0.6 * Ct(G, 1, 2.4)) +
              1.6 * Xe(G, 3.1, 0.25)),
            (w.tint = 0.4 * Ct(G, 1.6, 2.6)),
            (w.tintColor = 6975110));
          break;
        }
        case "move": {
          (S.add(s, 10, 0, 0),
            f.forEach((G) => S.move(G, 0, 0.1, -0.5)),
            u.forEach((G, q) => S.move(G, 0, 0, -0.16 * (q + 1))));
          break;
        }
        case "attack": {
          const G = Qo(b.p, b.windup),
            q = Kn(Ct(G, 0, 0.27)),
            et = Ct(G, 0.27, 0.36),
            ct = Gn(Ct(G, 0.55, 1)),
            rt = q * (1 - et),
            mt = et * (1 - ct);
          (b.variant % 2 === 0
            ? (S.add(s, -4 * rt + 8 * mt, 22 * rt - 26 * mt, 0),
              S.move(f[1], 0.9 * rt - 1.5 * mt, 1.2 * rt - 0.2 * mt, -1.5 * rt + 2.6 * mt),
              S.add(f[1], -70 * rt - 86 * mt, 0, 0),
              S.move(f[0], 0, 0.3 * rt, 0.2 * rt - 0.4 * mt),
              S.add(o, 0, -10 * rt + 8 * mt, 0))
            : (S.add(s, -16 * rt + 22 * mt, 0, 0),
              S.move(s, 0, 0.25 * rt - 0.35 * mt, 0.3 * mt),
              f.forEach((nt, H) => {
                const st = H === 0 ? 1 : -1;
                (S.move(nt, -st * 1.5 * (rt + mt), 3.6 * rt - 1.7 * mt, -0.6 * rt + 1.5 * mt),
                  S.add(nt, -110 * rt + 24 * mt, 0, 0));
              }),
              S.add(o, -18 * rt + 14 * mt, 0, 0)),
            S.scale(i, 1 + 0.4 * rt),
            (C = 1 + 3 * rt),
            (I += 0.25 * rt + 0.6 * Xe(G, 0.36, 0.14)));
          break;
        }
        case "stunned": {
          (S.add(s, 10, 0, Math.sin(T * 5) * 5),
            S.add(o, 14, Math.sin(T * 5) * 18, 20),
            (C = 0),
            a.forEach((G, q) => S.move(G, (q - 1) * 0.3, -0.2 * q, 0)),
            (I *= 0.7));
          break;
        }
        default:
          if (b.spawnT >= 0) {
            const G = b.spawnT,
              q = (ct, rt, mt, nt, H) => {
                const st = 1 - Gn(Ct(G, 1 + nt * 0.1, 1.9 + nt * 0.1));
                (k(S, ct, st, rt, mt, H), S.scale(ct, S.s[ct * 3] * Math.min(1, Ct(G, 0.9, 1.1) + 0.001)));
              };
            (u.forEach((ct, rt) => q(ct, 70 + rt, d[rt], 5 - rt, 1.6)),
              c.forEach((ct, rt) => q(ct, 60 + rt, 3.4, 3 + rt, 2.2)),
              l.forEach((ct, rt) => q(ct, 50 + rt, 5.05, 5 + rt, 2.6)),
              f.forEach((ct, rt) => q(ct, 40 + rt, 2.9, 6 + rt, 1.2)),
              q(o, 80, 5.6, 7, 1.4));
            const et = Kn(Ct(G, 0.9, 1.5));
            (S.pos(i, 0, -3.4 * (1 - et), 0),
              S.scale(i, Math.max(0.001, et)),
              (P = Kn(Ct(G, 2.2, 2.7))),
              S.scale(r, Math.max(0.001, Kn(Ct(G, 2.4, 2.9)) * (1 + 0.25 * Xe(G, 2.8, 0.15)))),
              (C = 1 + 5 * (1 - Ct(G, 2.2, 3))),
              (I = 0.5 + 0.8 * Xe(G, 1.2, 0.4) + 0.9 * Xe(G, 2.7, 0.3) + 0.5 * Ct(G, 2.6, 3)));
          } else
            A
              ? (f.forEach((G, q) => {
                  const et = q === 0 ? 1 : -1;
                  (S.move(G, -et * 0.9, 1.3, 0.7), S.add(G, -50, 0, 0));
                }),
                S.add(s, 4, 0, 0))
              : f.forEach((G, q) => S.add(G, Math.sin(T * 0.6 + q * Math.PI) * 14, 0, 0));
      }
      const F = Jo(b.hitT);
      F > 0 &&
        b.anim !== "dead" &&
        (c.forEach((G, q) => S.move(G, (q % 2 ? -1 : 1) * 0.16 * F, 0, (q < 2 ? 1 : -1) * 0.16 * F)),
        l.forEach((G, q) => S.move(G, (q === 0 ? 1 : -1) * 0.2 * F, 0.08 * F, 0)),
        S.add(o, -8 * F, 0, 0),
        S.scale(i, S.s[i * 3] * (1 + 0.3 * F)),
        (I += 0.5 * F));
      const L = [20, 33, -14],
        B = [16, 34, -27];
      (a.forEach((G, q) => {
        (S.rot(G, 0, b.time * L[q] * C + q * 70, 0),
          S.add(G, B[q], 0, 0),
          S.scale(G, S.s[G * 3] * Math.max(0.001, P)));
      }),
        S.rot(r, 0, 0, b.time * 24 * R),
        (w.glow = Math.max(0.04, I)));
    };
  return {
    key: "monster:star_colossus",
    geometry: m.build(),
    rig: n,
    height: 7,
    radius: 3,
    scale: 1,
    stride: 3,
    triangles: m.triangleCount,
    deathDur: 3.6,
    spawnDur: 3,
    outline: 1.8,
    attach: {
      chest: { joint: i, x: 0, y: 0, z: 0.3 },
      core: { joint: i, x: 0, y: 0, z: 0 },
      head: { joint: o, x: 0, y: 0.5, z: 0.2 },
      weapon: { joint: f[1], x: 0, y: -0.4, z: 0.5 },
      handL: { joint: f[0], x: 0, y: -0.2, z: 0.4 },
      handR: { joint: f[1], x: 0, y: -0.2, z: 0.4 },
      muzzle: { joint: i, x: 0, y: 0, z: 0.6 },
      crest: { joint: r, x: 0, y: 0, z: 0 },
    },
    blend: () => 0.24,
    animate: M,
  };
}

const wd = Math.PI * 2,
  Tc = 3559566,
  kO = 2505324,
  SO = 8363208,
  _2 = 9087188,
  w2 = 15266559,
  Ww = 11125990,
  TO = 3828392,
  Pp = 5816575,
  Dp = 14218495,
  EO = 10479359,
  jw = 1712696,
  AO = 13169919,
  RO = 8377599,
  M2 = (n, t) => {
    const e = Math.sin(n * 127.1 + t * 311.7) * 43758.5453;
    return e - Math.floor(e);
  };

function CO() {
  const n = Lm({
      pelvis: [1.8, -0.95],
      chest: [1.8, 0.45],
      neck: [
        [2.1, 0.92],
        [2.5, 1.2],
      ],
      head: [2.85, 1.4],
      tail: [[1.98, -1.6]],
      front: [
        [0.38, 1.6, 0.6],
        [0.38, 0.92, 0.68],
        [0.38, 0.13, 0.6],
      ],
      hind: [
        [0.42, 1.65, -1],
        [0.42, 0.95, -1.36],
        [0.42, 0.13, -1.2],
      ],
      bendFront: 1,
      bendHind: -1,
    }),
    t = n.rig,
    e = t.add("earL", n.head, 0.17, 3.04, 1.34),
    s = t.add("earR", n.head, -0.17, 3.04, 1.34),
    i = t.add("antlerL", n.head, 0.13, 3.06, 1.4),
    a = t.add("antlerR", n.head, -0.13, 3.06, 1.4),
    o = t.add("crest", n.head, 0, 3.62, 1.12),
    r = new Ls();
  r.crease = 62;
  const l = { mat: K.fur, pattern: En.fur, patternScale: 7, patternAmt: 0.45, grain: 0.07 },
    c = (b, w, T, E, A, C) => Qn(0.1, -0.8, C);
  n.legs.forEach((b) => {
    const w = b.side,
      T = Di(t, [b.upper, b.lower, b.foot], 0.45);
    (r.bind(T).paint(Tc, { c2: SO, by: (E, A) => Qn(0.95, 0.3, A), ...l }),
      b.front
        ? r.tube(
            [
              [w * 0.4, 1.86, 0.56, 0.2, 0.3],
              [w * 0.41, 1.5, 0.62, 0.17, 0.22],
              [w * 0.39, 1.16, 0.68, 0.115, 0.13],
              [w * 0.38, 0.92, 0.69, 0.1, 0.105],
              [w * 0.38, 0.6, 0.65, 0.07, 0.075],
              [w * 0.38, 0.3, 0.61, 0.066, 0.07],
              [w * 0.38, 0.2, 0.61, 0.088, 0.092],
            ],
            { seg: 7, cap0: !1 },
          )
        : r.tube(
            [
              [w * 0.36, 1.98, -0.98, 0.27, 0.42],
              [w * 0.42, 1.6, -1.04, 0.24, 0.36],
              [w * 0.43, 1.25, -1.2, 0.15, 0.22],
              [w * 0.42, 0.95, -1.35, 0.1, 0.115],
              [w * 0.42, 0.6, -1.29, 0.07, 0.078],
              [w * 0.42, 0.3, -1.22, 0.066, 0.07],
              [w * 0.42, 0.2, -1.21, 0.088, 0.092],
            ],
            { seg: 7, cap0: !1 },
          ),
      r.bone(b.foot).paint(jw, { c2: 2897492, gloss: 0.5, mat: K.leather }),
      r.lathe(
        [
          [0, 0.11, 0.145, b.rx, b.rz + 0.035],
          [0.1, 0.105, 0.13, b.rx, b.rz + 0.025],
          [0.21, 0.085, 0.09, b.rx, b.rz + 0.005],
        ],
        { seg: 6, crease: 30 },
      ),
      r.bone(b.lower).paint(Pp, { c2: Dp, glow: 0.12, glow2: 0.5, gloss: 1, mat: K.crystal, line: 1 }));
    for (let E = 0; E < 3; E++) {
      const A = (E - 1) * 0.9 + Math.PI;
      r.g(
        pt(
          b.rx + Math.sin(A) * 0.06,
          0.32,
          b.rz + Math.cos(A) * 0.07,
          -28 * Math.cos(A),
          0,
          28 * Math.sin(A),
        ),
        () => r.crystal(0.045, 0.3 - Math.abs(E - 1) * 0.07, 4, 0.7, 0.12),
      );
    }
  });
  const f = Di(t, [n.pelvis, n.chest], 1.2);
  (r.bind(f).paint(Tc, { c2: _2, by: c, ...l }),
    r.tube(
      [
        [0, 1.86, -1.66, 0.12, 0.16],
        [0, 1.84, -1.46, 0.36, 0.38],
        [0, 1.74, -1, 0.49, 0.48],
        [0, 1.72, -0.35, 0.42, 0.39],
        [0, 1.66, 0.3, 0.5, 0.53],
        [0, 1.78, 0.72, 0.42, 0.47],
        [0, 1.95, 0.98, 0.3, 0.36],
      ],
      { seg: 12, up: [1, 0, 0] },
    ),
    r.sym(() => {
      r.paint(RO, { c2: Dp, glow: 0.5, mat: K.crystal });
      const b = [
        [-0.92, 1.86, 0.46, 34],
        [-0.58, 1.82, 0.43, 22],
        [-0.26, 1.78, 0.405, 10],
      ];
      for (const [w, T, E, A] of b)
        (r.g(pt(E + 0.035, T, w, 0, 90, A), () =>
          r.extrude(
            [
              [-0.2, 0],
              [-0.04, 0.045],
              [0.24, 0.01],
              [0.02, -0.045],
            ],
            0.05,
            0,
          ),
        ),
          r.g(pt(E + 0.03, T - 0.16, w + 0.1, 0, 90, A - 46), () =>
            r.extrude(
              [
                [-0.1, 0],
                [0, 0.03],
                [0.14, 0],
                [0, -0.03],
              ],
              0.05,
              0,
            ),
          ));
    }));
  for (let b = 0; b < 7; b++) {
    const w = b / 6,
      T = bt(0.52, -1.34, w),
      E = 2.2 + 0.03 * Math.sin(w * Math.PI) - 0.08 * w,
      A = bt(0.42, 0.2, w) * (b % 2 ? 0.8 : 1);
    (r.bind(f).paint(Pp, { c2: Dp, glow: 0.12, glow2: 0.55, gloss: 1, mat: K.crystal, line: 1 }),
      r.g(pt(0, E - 0.08, T, -24 - M2(b, 1) * 14, 0, (M2(b, 2) - 0.5) * 22), () =>
        r.crystal(0.07 * (1 - w * 0.35), A, 5, 0.6, 0.15),
      ));
  }
  (r.bone(n.tail[0]).paint(Tc, { c2: w2, by: c, ...l }),
    r.tube(
      [
        [0, 1.96, -1.58, 0.1, 0.09],
        [0, 1.88, -1.8, 0.11, 0.07],
        [0, 1.72, -1.98, 0.02, 0.02],
      ],
      { seg: 6, up: [1, 0, 0] },
    ));
  const d = Di(t, [n.chest, n.neck[0], n.neck[1], n.head], 0.9);
  (r.bind(d).paint(Tc, { c2: _2, by: c, ...l }),
    r.tube(
      [
        [0, 1.86, 0.78, 0.34, 0.44],
        [0, 2.14, 0.99, 0.26, 0.33],
        [0, 2.48, 1.19, 0.2, 0.25],
        [0, 2.8, 1.36, 0.17, 0.2],
      ],
      { seg: 10, up: [1, 0, 0], cap0: !1 },
    ));
  const h = [0, 0.81, 0.585],
    u = [0, -0.585, h[1]],
    m = (b, w, T, E, A, C, R, I) => {
      r.bone(R);
      for (let P = 0; P < E; P++) {
        const F = I + (P / E) * wd,
          L = Math.cos(F),
          B = Math.sin(F),
          G = 1 + 0.55 * Math.max(0, -B),
          q = [b[0] + L * w * 0.86, b[1] + u[1] * B * T * 0.86, b[2] + u[2] * B * T * 0.86];
        let et = L * 0.62,
          ct = u[1] * B * 0.62 - h[1] * 0.75 - 0.3,
          rt = u[2] * B * 0.62 - h[2] * 0.75;
        const mt = Math.hypot(et, ct, rt);
        ((et /= mt), (ct /= mt), (rt /= mt));
        const nt = A * G * (0.85 + 0.3 * M2(P, E)),
          H = [q[0] + et * nt, q[1] + ct * nt, q[2] + rt * nt];
        r.paint(Ww, {
          c2: w2,
          ao: 0.8,
          ao2: 1,
          mat: K.fur,
          pattern: En.fur,
          patternScale: 8,
          patternAmt: 0.35,
        });
        const st = [bt(q[0], H[0], 0.45), bt(q[1], H[1], 0.45), bt(q[2], H[2], 0.45)];
        r.tube(
          [
            [q[0], q[1], q[2], C, C * 0.62],
            [st[0], st[1], st[2], C * 0.9, C * 0.56],
            [H[0], H[1], H[2], 0.014, 0.01],
          ],
          { seg: 5, up: [-B, u[1] * L, u[2] * L], cap0: !1 },
        );
      }
    };
  (m([0, 2.58, 1.25], 0.2, 0.25, 8, 0.34, 0.11, n.neck[1], 0.2),
    m([0, 2.32, 1.1], 0.27, 0.34, 9, 0.44, 0.14, n.neck[0], 0.55),
    m([0, 2.04, 0.9], 0.34, 0.44, 10, 0.52, 0.17, n.chest, 0.1));
  const x = 1.16,
    p = new Ke()
      .makeTranslation(0, 2.85, 1.4)
      .multiply(new Ke().makeScale(x, x, x))
      .multiply(new Ke().makeTranslation(0, -2.85, -1.4));
  r.g(p, () => {
    (r
      .bone(n.head)
      .paint(Tc, {
        c2: _2,
        by: (b, w, T, E, A, C) => Math.max(Qn(0.1, -0.8, C), Qn(1.85, 2.2, T) * 0.7),
        ...l,
      }),
      r.tube(
        [
          [0, 2.9, 1.24, 0.15, 0.16],
          [0, 2.93, 1.4, 0.2, 0.21],
          [0, 2.92, 1.6, 0.185, 0.19],
          [0, 2.84, 1.84, 0.13, 0.135],
          [0, 2.76, 2.06, 0.1, 0.1],
          [0, 2.71, 2.2, 0.075, 0.07],
        ],
        { seg: 9, up: [1, 0, 0] },
      ),
      r.paint(w2, { mat: K.fur }),
      r.g(pt(0, 3.05, 1.62, 72, 0, 0), () =>
        r.extrude(
          [
            [-0.035, -0.16],
            [0.035, -0.16],
            [0.07, 0.04],
            [0, 0.2],
            [-0.07, 0.04],
          ],
          0.07,
          0.02,
        ),
      ),
      r.paint(jw, { gloss: 0.6, mat: K.leather }),
      r.ball(0, 2.725, 2.235, 0.068, 0.055, 0.05, 1),
      r.sym((b) => {
        (r.paint(AO, { glow: 0.9, mat: K.crystal }),
          r.g(pt(0.168, 2.99, 1.6, 0, 62, 18), () =>
            r.extrude(
              [
                [-0.075, 0],
                [-0.01, 0.036],
                [0.075, 0.012],
                [0.01, -0.03],
              ],
              0.04,
              0,
            ),
          ),
          r.paint(kO, { mat: K.fur }),
          r.g(pt(0.165, 3.035, 1.58, 0, 60, 16), () => r.box(0, 0, 0, 0.19, 0.035, 0.05, 0.012)),
          r.bone(b > 0 ? e : s).paint(Tc, { c2: Ww, ...l }),
          r.limb([0.17, 3.02, 1.34], [0.5, 3.16, 1.14], 0.085, 0.012, {
            seg: 5,
            flat: 0.42,
            up: [0, 0.35, 1],
            bulge: 0.55,
          }),
          r.bone(n.head));
      }));
  });
  const g = (b) => (b < 0.5 ? fh(TO, Pp, b / 0.5) : fh(Pp, Dp, (b - 0.5) / 0.5)),
    y = (b) => bt(0.06, 0.62, b * b),
    v = (b, w, T, E, A, C) => {
      (r.paint(g(A), { c2: g(C), glow: y(A), glow2: y(C), gloss: 1, mat: K.crystal, line: 1 }),
        r.limb(b, w, T, E, { seg: 6, crease: 0 }));
    },
    _ = [
      [0.13, 3.04, 1.4],
      [0.36, 3.3, 1.2],
      [0.74, 3.42, 0.84],
      [1.14, 3.6, 0.56],
      [1.5, 3.52, 0.16],
      [1.64, 3.68, -0.14],
    ],
    k = [
      [
        1,
        [
          [0.44, 3.52, 1.46],
          [0.4, 3.72, 1.62],
        ],
      ],
      [
        2,
        [
          [0.86, 3.72, 0.98],
          [0.82, 3.94, 1.1],
        ],
      ],
      [
        3,
        [
          [1.24, 3.86, 0.68],
          [1.34, 4.02, 0.62],
        ],
      ],
      [
        4,
        [
          [1.7, 3.74, 0.3],
          [1.84, 3.82, 0.36],
        ],
      ],
      [
        2,
        [
          [0.66, 3.6, 0.58],
          [0.6, 3.74, 0.42],
        ],
      ],
    ];
  (r.sym((b) => {
    r.bone(b > 0 ? i : a);
    for (let w = 0; w < _.length - 1; w++)
      v(_[w], _[w + 1], bt(0.1, 0.035, w / 4), bt(0.085, 0.012, (w + 1) / 5), w / 5, (w + 1) / 5);
    for (const [w, T] of k) {
      const E = w / 5;
      (v(_[w], T[0], 0.06, 0.04, E, E + 0.25), v(T[0], T[1], 0.042, 0.008, E + 0.25, Math.min(1, E + 0.55)));
    }
  }),
    r.bone(o).paint(EO, { c2: 15793151, glow: 0.55, glow2: 0.85, gloss: 1, mat: K.crystal, line: 1 }),
    r.g(pt(0, 3.62 - 0.3, 1.12), () => r.crystal(0.17, 0.6, 6, 0.42, 0.42, 1)));
  for (let b = 0; b < 3; b++) {
    const w = (b / 3) * wd;
    r.g(pt(Math.cos(w) * 0.34, 3.6 + (b - 1) * 0.07, 1.12 + Math.sin(w) * 0.34, 0, 0, 0), () =>
      r.g(pt(0, -0.09, 0, 14, b * 50, 10), () => r.crystal(0.045, 0.18, 4, 0.5, 0.5, 1)),
    );
  }
  r.bakeGrounding(3.2, 0.72, 0.9);
  const M = 3.3,
    S = (b, w, T) => {
      const E = w.time + w.seed * 7,
        A = Math.sin(E * 1.5),
        C = (w.mode & 2) !== 0,
        R = (L, B) => {
          (b.add(n.neck[0], (B ? 40 : 52) * L, 0, 0),
            b.add(n.neck[1], (B ? 30 : 34) * L, 0, 0),
            b.add(n.head, (B ? 32 : -14) * L, 0, 0));
        };
      (b.pos(n.pelvis, 0, A * 0.012, 0),
        b.rot(n.chest, A * 0.8, 0, 0),
        b.rot(o, 0, E * 40, 0),
        b.pos(o, 0, Math.sin(E * 1.3) * 0.05, 0));
      const I = Xe((E * 0.37) % 1, 0.5, 0.06);
      (b.rot(e, 0, -26 * I, 14 * I),
        b.rot(s, 0, 20 * Xe((E * 0.29 + 0.4) % 1, 0.5, 0.07), 0),
        b.rot(n.tail[0], -18 * Xe((E * 0.23) % 1, 0.5, 0.1), Math.sin(E * 2.3) * 8, 0),
        (T.glow = 1 + 0.1 * Math.sin(E * 2.1) + (C ? 0.3 : 0)));
      let P = !0;
      switch (w.anim) {
        case "dead": {
          const L = w.t,
            B = Gn(Ct(L, 0, 0.5)),
            G = wf(Ct(L, 0.5, 1.1)),
            q = Ct(L, 1.1, 1.35),
            et = w.seed > 0.5 ? 1 : -1;
          (b.pos(n.pelvis, 0, -0.35 * B - 0.1 * G, 0.22 * B),
            b.rot(n.pelvis, 24 * B * (1 - G), 0, 0),
            b.rot(n.chest, 8 * B, 0, 0),
            R(0.5 * B + 0.2 * G, !1),
            b.add(n.head, 0, 0, et * -30 * G),
            b.rot(n.root, 0, 0, et * (86 * G + 3 * Math.sin(q * Math.PI))),
            b.pos(n.root, et * 0.7 * G, 0.42 * G, 0),
            n.legs.forEach((mt, nt) =>
              Ds(n, b, nt, mt.rx, mt.ry - 0.2 * G, mt.rz + (0.22 + (mt.front ? -0.3 : 0.3)) * G, 30 * G),
            ),
            (P = !1));
          const ct = Ct(L, 1, 1.8);
          (b.scale(i, 1 - ct * (0.999 - 0.04 * Math.sin(L * 40))), b.scale(a, 1 - Ct(L, 1.1, 1.8) * 0.999));
          const rt = Ct(L, 1.2, 2);
          (b.pos(o, 0, 0.8 * Kn(rt), 0),
            b.scale(o, (1 + 0.5 * Xe(rt, 0.2, 0.2)) * (1 - Ct(L, 1.7, 2.1))),
            (T.glow = (1 + 0.9 * Xe(L, 1.2, 0.3)) * (1 - 0.8 * Ct(L, 1.4, 2.1))),
            (T.tint = 0.5 * Ct(L, 1.2, 2)),
            (T.tintColor = 9348296));
          break;
        }
        case "move": {
          const L = w.stride * wd;
          (b.add(n.neck[0], 10 + Math.sin(L * 2 + 0.8) * 5, 0, 0),
            b.add(n.neck[1], -4 + Math.sin(L * 2 + 0.2) * 4, 0, 0),
            b.add(n.head, 4 - Math.sin(L * 2) * 5, 0, 0),
            Im(n, b, w.stride, {
              style: "trot",
              stride: M,
              lift: 0.42,
              bob: 0.07,
              pitch: 2.5,
              sway: 2,
              roll: 1.5,
              curl: 50,
            }),
            b.add(n.tail[0], -20, Math.sin(L) * 14, 0),
            (P = !1));
          break;
        }
        case "attack": {
          const L = Qo(w.p, w.windup),
            B = Kn(Ct(L, 0, 0.27)),
            G = Ct(L, 0.27, 0.36),
            q = Gn(Ct(L, 0.5, 1));
          if (w.variant % 2 === 0) {
            const et = B * (1 - G),
              ct = G * (1 - q);
            (b.move(n.pelvis, 0, -0.14 * et - 0.05 * ct, -0.3 * et + 0.62 * ct),
              b.add(n.pelvis, 6 * et - 5 * ct, 0, 0),
              R(0.95 * et, !0),
              b.add(n.neck[0], -34 * ct, 0, 0),
              b.add(n.neck[1], -26 * ct, 0, 0),
              b.add(n.head, -30 * ct, 0, 0),
              (T.glow += 0.4 * et + 0.8 * Xe(L, 0.36, 0.14)));
          } else {
            const et = B * (1 - G),
              ct = G * (1 - q);
            (b.move(n.pelvis, 0, -0.1 * ct, 0.26 * ct),
              b.add(n.pelvis, 7 * ct, 0, 0),
              V1(n, b, et, 44, 0.35),
              b.add(n.neck[0], 22 * et + 16 * ct, 0, 0),
              b.add(n.head, 18 * et, 0, 0));
            for (let rt = 0; rt < 2; rt++) {
              const mt = n.legs[rt],
                nt = rt === 0 ? et : Math.min(1, et * 1.15);
              Ds(n, b, rt, mt.rx, mt.ry + 1.5 * nt, mt.rz - 0.2 * nt + 0.22 * ct, 60 * nt);
            }
            ((P = !1), (T.glow += 0.3 * et + 0.9 * Xe(L, 0.36, 0.14)));
          }
          break;
        }
        case "stunned": {
          (R(0.55, !1),
            b.add(n.neck[0], 0, Math.sin(E * 5) * 12, 0),
            b.add(n.head, 0, 0, Math.sin(E * 5 + 1) * 16),
            b.add(n.pelvis, 0, 0, Math.sin(E * 2.5) * 3));
          break;
        }
        case "airborne": {
          b.rot(n.root, -16 * Math.sin(w.p * Math.PI), 0, 10);
          for (let L = 0; L < 4; L++) XU(n, b, L, L < 2 ? -40 : 34, L < 2 ? 70 : -50, 20);
          P = !1;
          break;
        }
        default:
          if (w.spawnT >= 0) {
            const L = w.spawnT / 1.2,
              B = Gn(Ct(L, 0.15, 0.7)),
              G = Xe(L, 0.84, 0.16);
            (R(1 - B, !1),
              b.add(n.neck[0], -16 * G, 0, 0),
              b.add(n.neck[1], -14 * G, 0, 0),
              b.add(n.head, -22 * G, 0, 0),
              b.move(n.pelvis, 0, -0.1 * (1 - B), 0),
              (T.tint = 0.85 * (1 - Ct(L, 0.1, 0.8))),
              (T.tintColor = 10476799),
              (T.glow = 0.3 + 0.7 * B + 0.7 * G));
          } else if (C) {
            (R(0.7, !0), b.move(n.pelvis, 0, -0.06, -0.08));
            const L = (E * 0.9) % 1,
              B = Xe(L, 0.3, 0.14) + Xe(L, 0.58, 0.14);
            _a(n, b, 0, 0, 14);
            const G = n.legs[0];
            (Ds(n, b, 0, G.rx, G.ry + 0.3 * B, G.rz + 0.1 - 0.3 * B * Math.sin(L * wd * 3.4), 40 * B),
              (P = !1));
          } else {
            const L = (E / 7.5) % 1,
              B = Math.floor(E / 7.5) % 2,
              G = Gn(Ct(L, 0.62, 0.7)) * (1 - Gn(Ct(L, 0.9, 0.98)));
            if (
              (b.add(n.neck[0], Math.sin(E * 0.7) * 2, Math.sin(E * 0.31) * 10 * (1 - G), 0),
              b.add(n.head, Math.sin(E * 0.9) * 2.5, Math.sin(E * 0.31 + 0.7) * 12 * (1 - G), 0),
              B === 0)
            )
              (R(G * 0.92, !1), b.add(n.head, 0, Math.sin(E * 6) * 6 * G, 0));
            else if (G > 0) {
              R(G * 0.3, !0);
              const q = G * Math.max(0, Math.sin(L * wd * 9));
              _a(n, b, 0, 0, 13);
              const et = n.legs[1];
              (Ds(n, b, 1, et.rx, et.ry + 0.26 * q, et.rz + 0.12 - 0.3 * q, 36 * q), (P = !1));
            }
          }
      }
      const F = Jo(w.hitT);
      if (F > 0 && w.anim !== "dead") {
        const L = w.seed > 0.5 ? 1 : -1;
        (b.add(n.neck[0], -8 * F, L * 22 * F, 0),
          b.add(n.head, 0, L * 16 * F, L * 14 * F),
          b.move(n.pelvis, 0, -0.05 * F, -0.08 * F));
      }
      P && _a(n, b);
    };
  return {
    key: "monster:frost_golem",
    geometry: r.build(),
    rig: t,
    height: 3.95,
    radius: 1.5,
    scale: 1,
    stride: M,
    triangles: r.triangleCount,
    deathDur: 2.2,
    spawnDur: 1.2,
    outline: 1.6,
    attach: {
      chest: { joint: n.chest, x: 0, y: 0, z: 0.1 },
      head: { joint: n.head, x: 0, y: 0.1, z: 0.3 },
      muzzle: { joint: n.head, x: 0, y: -0.12, z: 0.85 },
      weapon: { joint: n.head, x: 0, y: 0.6, z: 0.5 },
      crest: { joint: o, x: 0, y: 0, z: 0 },
      tail: { joint: n.tail[0], x: 0, y: -0.2, z: -0.35 },
    },
    blend: (b, w) => (w === "attack" ? 0.1 : 0.2),
    animate: S,
  };
}

const $x = [
    {
      stone: Yt.blue.stone,
      stoneDark: Yt.blue.stoneDark,
      stoneLight: 13226982,
      trim: Yt.blue.trim,
      crystal: 1468648,
      crystalMid: 3711231,
      crystalHot: 9228543,
      glowK: 0.85,
      spiky: !1,
    },
    {
      stone: Yt.red.stone,
      stoneDark: Yt.red.stoneDark,
      stoneLight: 8153712,
      trim: Yt.red.trim,
      crystal: 14039574,
      crystalMid: 15882790,
      crystalHot: 16747056,
      glowK: 0.35,
      spiky: !0,
    },
  ],
  LO = 16773296,
  jc = Math.PI * 2,
  rs = (n, t) => {
    const e = Math.sin(n * 127.1 + t * 311.7) * 43758.5453;
    return e - Math.floor(e);
  },
  qi = { mat: K.rock, pattern: En.strata, patternScale: 3, patternAmt: 0.3, grain: 0.05 },
  xa = { gloss: 1, mat: K.metal },
  ao = { gloss: 1, mat: K.crystal, line: 1 };

function L8(n, t, e) {
  (n.paint(t.stoneDark, { c2: t.stone, ...qi }),
    n.lathe(
      [
        [0, e],
        [0.16, e],
        [0.18, e * 0.97],
        [0.18, e * 0.84],
        [0.33, e * 0.84],
        [0.35, e * 0.81],
      ],
      { seg: 8, phase: 22.5, crease: 30 },
    ),
    n.paint(t.trim, { ...xa }),
    n.lathe(
      [
        [0.14, e * 1.012],
        [0.19, e * 1.012],
      ],
      { seg: 8, phase: 22.5, crease: 30, cap0: !1, cap1: !1 },
    ));
}

function qw(n, t, e, s, i, a, o) {
  const r = [],
    l = [],
    c = (e - t) / s;
  for (let f = 0; f < s; f++) {
    const d = t + f * c,
      h = d + c;
    (r.push([d, i(d) * (f % 2 ? 0.985 : 1)], [h - 0.05, i(h - 0.05) * (f % 2 ? 0.985 : 1)]),
      f < s - 1 && r.push([h - 0.05, i(h) - 0.045], [h, i(h) - 0.045]),
      l.push(d + c / 2));
  }
  (n.lathe(r, { seg: 8, phase: 22.5, crease: 30, cap0: !1, cap1: a }), n.paint(o, { mat: K.rock, line: 0 }));
  for (let f = 0; f < s - 1; f++) {
    const d = t + (f + 1) * c;
    n.lathe(
      [
        [d - 0.047, i(d) - 0.04],
        [d - 0.003, i(d) - 0.04],
      ],
      { seg: 8, phase: 22.5, crease: 30, cap0: !1, cap1: !1 },
    );
  }
  return l;
}

function W1(n, t, e, s, i, a, o = 1.012) {
  const l = [];
  for (let c = 0; c <= 4; c++) {
    const f = c / 4,
      d = bt(s, i, f),
      h = e + (rs(c, a) - 0.5) * 0.5 * (c > 0 && c < 4 ? 1 : 0.2),
      u = t(d) * o;
    l.push([Math.cos(h) * u, d, Math.sin(h) * u, 0.035 * (1 - Math.abs(f - 0.5) * 1.3), 0.02]);
  }
  n.tube(l, { seg: 3, cap0: !1, cap1: !1 });
}
export { pO, yO, MO, CO, $x, LO, jc, rs, qi, xa, ao, L8, qw, W1 };
