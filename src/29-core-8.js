// 29-core-8.js — core｜8 个顶层语句｜63KB
// 对应 game.pretty.js 第 57609–59630 行
// 关键内容：
//   QU                    root
//   JU                    root
//   lO                    shell
//   fO                    crest
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { yn } from './01-audio.js';
import { Ri, dt } from './05-three.js';
import { Ke } from './06-three-2.js';
import { Ct, Di, En, Gn, K, Kn, Qn, Qo, Wa, Xe, bt, fh, pt, wf } from './25-render-9.js';
import { Ls } from './26-core-5.js';
import { $o, Ai, As, C8, Ds, Go, Hx, Im, Jo, Lm, Pm, Qt, V1, _a, kf, wa, ya } from './28-core-7.js';

function QU() {
  const n = new Wa(),
    t = n.add("root", -1, 0, 0, 0),
    e = n.add("body", t, 0, 0.74, 0),
    s = n.add("head", e, 0, 0.84, 0.66),
    i = n.add("mount", e, 0, 1.2, -0.08),
    a = n.add("slide", i, 0, 1.36, -0.08),
    o = n.add("bowL", i, 0.1, 1.36, 0.5),
    r = n.add("bowR", i, -0.1, 1.36, 0.5),
    l = [
      [0.42, 0.46],
      [-0.42, 0.46],
      [0.42, -0.5],
      [-0.42, -0.5],
    ],
    c = l.map(([h, u], m) => n.add(`leg${m}`, e, h, 0.66, u)),
    f = new Ls();
  ((f.crease = 36),
    c.forEach((h, u) => {
      const [m, x] = l[u];
      (f.bone(h).paint(Qt.stoneDark, { c2: Qt.stone, ...As }),
        f.lathe(
          [
            [0.12, 0.13, 0.15, m, x],
            [0.4, 0.125, 0.135, m, x],
            [0.74, 0.19, 0.21, m, x],
          ],
          { seg: 6, phase: 30, power: 2.3 },
        ),
        f.paint(Qt.iron, { ...wa }),
        f.lathe(
          [
            [0, 0.17, 0.2, m, x + 0.02],
            [0.12, 0.155, 0.175, m, x],
            [0.15, 0.125, 0.135, m, x],
          ],
          { seg: 6, phase: 30 },
        ),
        f.paint(16777215, Ai(0.6)),
        f.lathe(
          [
            [0.4, 0.13, 0.14, m, x],
            [0.44, 0.135, 0.145, m, x],
          ],
          { seg: 6, phase: 30, power: 2.3, cap0: !1, cap1: !1 },
        ));
    }),
    f.bone(e).paint(Qt.stoneDark, { c2: Qt.stoneLight, ...As }),
    f.tube(
      [
        [0, 0.72, -0.84, 0.3, 0.2],
        [0, 0.8, -0.6, 0.52, 0.37],
        [0, 0.84, 0, 0.58, 0.43],
        [0, 0.82, 0.5, 0.5, 0.37],
        [0, 0.8, 0.74, 0.32, 0.26],
      ],
      { seg: 8, up: [1, 0, 0], power: 2.6 },
    ),
    f.paint(Qt.cloth, { ...$o }),
    f.sheet(
      6,
      2,
      (h, u) => {
        const m = Math.PI * (0.02 + 0.96 * h),
          x = -0.46 + u * 0.8,
          p = h < 0.12 || h > 0.88 ? 1.06 : 1.03;
        return [Math.cos(m) * 0.6 * p, 0.84 + Math.sin(m) * 0.45 * p - (h < 0.1 || h > 0.9 ? 0.1 : 0), x];
      },
      !0,
      40,
    ),
    f.paint(Qt.brass, { ...ya }),
    f.sym(() =>
      f.g(pt(0.6, 0.74, -0.06, 0, 90, 0), () =>
        f.extrude(
          Hx(0.11).filter((h, u) => u % 2 === 0),
          0.03,
          0.008,
        ),
      ),
    ),
    f.bone(s).paint(Qt.stone, { c2: Qt.stoneLight, ...As }),
    f.tube(
      [
        [0, 0.84, 0.62, 0.28, 0.24],
        [0, 0.8, 0.9, 0.26, 0.21],
        [0, 0.72, 1.1, 0.17, 0.13],
      ],
      { seg: 6, up: [1, 0, 0], power: 2.4 },
    ),
    f.paint(Qt.iron, { ...wa }),
    f.g(pt(0, 0.86, 1, -62, 0, 0), () =>
      f.extrude(
        [
          [-0.17, -0.1],
          [0.17, -0.1],
          [0.2, 0.08],
          [0, 0.16],
          [-0.2, 0.08],
        ],
        0.05,
        0.015,
      ),
    ),
    f.paint(16777215, Ai(0.9)),
    f.g(pt(0, 0.875, 1.03, -62, 0, 0), () => f.box(0, 0, 0, 0.24, 0.035, 0.03)),
    f.paint(Qt.stoneLight, { c2: 15133685, ...As }),
    f.sym(() => f.g(pt(0.22, 0.96, 0.74, -40, 0, -34), () => f.crystal(0.05, 0.22, 4, 0.7, 0.1))),
    f.bone(i).paint(Qt.iron, { ...wa }),
    f.lathe(
      [
        [1.14, 0.3, 0.32, 0, -0.08],
        [1.24, 0.24, 0.26, 0, -0.08],
        [1.3, 0.14, 0.16, 0, -0.08],
      ],
      { seg: 8 },
    ),
    f.paint(Qt.wood, { mat: K.leather, pattern: En.bark, patternScale: 8, patternAmt: 0.3 }),
    f.box(0, 1.34, 0.06, 0.2, 0.12, 1.3, 0.03),
    f.paint(Qt.brass, { ...ya }),
    f.box(0, 1.36, 0.6, 0.26, 0.16, 0.14, 0.03),
    f.box(0, 1.36, -0.5, 0.24, 0.16, 0.12, 0.03),
    f.sym((h) => {
      (f.bone(h > 0 ? o : r).paint(Qt.stoneLight, { c2: Qt.stone, gloss: 0.5, mat: K.leather }),
        f.tube(
          [
            [0.1, 1.36, 0.52, 0.045, 0.07],
            [0.42, 1.38, 0.44, 0.04, 0.06],
            [0.72, 1.4, 0.24, 0.03, 0.045],
            [0.86, 1.4, 0.02, 0.016, 0.02],
          ],
          { seg: 5, up: [0, 1, 0] },
        ),
        f.paint(Qt.cloth, { ...$o }),
        f.box(0.5, 1.39, 0.42, 0.1, 0.1, 0.1, 0.02));
    }),
    f.bone(a).paint(Qt.wood, { mat: K.leather }),
    f.tube(
      [
        [0, 1.44, -0.4, 0.03],
        [0, 1.44, 0.7, 0.03],
      ],
      { seg: 5 },
    ),
    f.paint(Qt.cloth, { ...$o }));
  for (const h of [0, 90])
    f.g(pt(0, 1.44, -0.36, 0, 0, h), () =>
      f.extrude(
        [
          [0, 0],
          [0.09, -0.06],
          [0.09, 0.1],
          [0, 0.16],
        ],
        0.012,
        0,
      ),
    );
  (f.paint(16777215, Ai(0.85)),
    f.g(pt(0, 1.44, 0.66, 90, 0, 0), () => f.crystal(0.075, 0.42, 4, 0.7, 0.2, 1)),
    f.bakeGrounding(1.6));
  const d = (h, u, m) => {
    const x = u.time * 1.8 + u.seed * 6;
    let p = 1;
    switch (u.anim) {
      case "dead": {
        const y = Pm(u.t),
          v = y.fall * y.fall;
        (h.pos(e, 0, -0.08 * y.slump - 0.38 * v, 0),
          h.rot(e, 6 * v, 0, 12 * v),
          c.forEach((_, k) => h.rot(_, (k < 2 ? -60 : 60) * v, 0, (k % 2 === 0 ? 46 : -46) * v)),
          Go(h, i, y.burst, y.fall, 0.3, -0.3, 0.6, -30, 50),
          h.rot(s, 30 * v, 0, 0),
          (p = 1 - y.burst),
          (m.glow = Math.max(0.02, 1 - y.slump * 1.3)));
        break;
      }
      case "move": {
        const y = u.stride * kf,
          v = Math.sin(y);
        (h.rot(c[0], v * 30, 0, 0),
          h.rot(c[3], v * 30, 0, 0),
          h.rot(c[1], -v * 30, 0, 0),
          h.rot(c[2], -v * 30, 0, 0),
          h.pos(e, 0, Math.abs(Math.cos(y)) * 0.04, 0),
          h.rot(e, Math.cos(y * 2) * 1.5, 0, v * 3),
          h.rot(s, Math.cos(y * 2) * 4 + 4, 0, 0),
          h.rot(i, Math.sin(y * 2 - 0.8) * 2.5, 0, -v * 2));
        break;
      }
      case "attack": {
        const y = Qo(u.p, u.windup),
          v = Kn(Ct(y, 0, 0.3)),
          _ = Ct(y, 0.33, 0.38),
          k = Ct(y, 0.42, 1),
          M = _ * (1 - k) * (1 - k);
        (h.rot(i, -12 * v * (1 - k) - 6 * M, 0, 0),
          h.rot(e, -5 * M + 3 * v * (1 - _), 0, 0),
          h.pos(e, 0, -0.06 * v * (1 - _) - 0.03 * M, -0.14 * M),
          c.forEach((S, b) => h.rot(S, (b < 2 ? 1 : -1) * 9 * M, 0, 0)),
          (p = 1 + 0.3 * v * (1 - _) - 1.1 * _ * (1 - Gn(Ct(y, 0.6, 0.95)))),
          h.scale(a, Math.max(0.001, 1 - _ + Gn(Ct(y, 0.7, 0.95)))),
          h.pos(a, 0, 0, 0.5 * _ * (1 - Ct(y, 0.4, 0.5))),
          (m.glow = 1 + 0.7 * v * (1 - _) + 0.8 * M));
        break;
      }
      case "stunned": {
        (h.rot(e, Math.sin(x * 2.6) * 4, 0, Math.cos(x * 2.6) * 6),
          h.rot(s, 14, Math.sin(x * 2.6) * 18, 0),
          (m.glow = 0.6));
        break;
      }
      case "airborne": {
        (h.rot(t, -16 * Math.sin(u.p * Math.PI), 0, 8),
          c.forEach((y, v) => h.rot(y, v < 2 ? -40 : 40, 0, 0)));
        break;
      }
      default:
        (h.pos(e, 0, Math.sin(x) * 0.015, 0),
          h.rot(s, Math.sin(x * 0.7) * 4, Math.sin(x * 0.33) * 12, 0),
          h.rot(i, Math.sin(x * 0.5) * 2, 0, 0),
          (m.glow = 1 + 0.12 * Math.sin(x * 1.4)));
    }
    (h.rot(o, 0, 22 * (p - 1), 0), h.rot(r, 0, -22 * (p - 1), 0));
    const g = Jo(u.hitT, 0.18);
    g > 0 && u.anim !== "dead" && (h.add(e, 0, 0, 5 * g), h.add(s, 12 * g, 0, 0));
  };
  return {
    key: "minion:siege",
    geometry: f.build(),
    rig: n,
    height: 1.8,
    radius: 0.85,
    scale: 1,
    stride: 1.9,
    triangles: f.triangleCount,
    deathDur: 1.2,
    outline: 1.2,
    attach: {
      chest: { joint: e, x: 0, y: 0.1, z: 0 },
      head: { joint: s, x: 0, y: 0.1, z: 0.2 },
      weapon: { joint: i, x: 0, y: 0.24, z: 1.1 },
      muzzle: { joint: i, x: 0, y: 0.24, z: 1.1 },
    },
    blend: () => 0.14,
    animate: d,
  };
}

function JU() {
  const n = new Wa(),
    t = n.add("root", -1, 0, 0, 0),
    e = n.add("hips", t, 0, 0.8, 0),
    s = n.add("chest", e, 0, 1.22, 0),
    i = n.add("head", s, 0, 1.76, 0.05),
    a = n.add("armL", s, 0.58, 1.56, 0),
    o = n.add("armR", s, -0.58, 1.56, 0),
    r = n.add("foreL", a, 0.64, 1.12, 0),
    l = n.add("foreR", o, -0.64, 1.12, 0),
    c = n.add("maul", l, -0.64, 0.76, 0.04),
    f = n.add("legL", e, 0.23, 0.76, 0),
    d = n.add("legR", e, -0.23, 0.76, 0),
    h = n.add("flag0", s, 0.3, 2.56, -0.36),
    u = n.add("flag1", h, 0.68, 2.52, -0.36);
  n.chain({
    joints: [h, u],
    tip: [0.36, -0.03, 0],
    stiffness: 10,
    drag: 0.88,
    gravity: 4,
    maxAngle: 60,
    wind: 4,
  });
  const m = n.add("emblemB", s, 0, 1.42, 0.42),
    x = n.add("emblemR", s, 0, 1.42, 0.42),
    p = new Ls();
  ((p.crease = 36),
    p.sym((y) => {
      (p.bone(y > 0 ? f : d).paint(Qt.stoneDark, { c2: Qt.stone, ...As }),
        p.lathe(
          [
            [0.14, 0.16, 0.18, 0.23, 0.01],
            [0.46, 0.17, 0.18, 0.23, 0],
            [0.8, 0.21, 0.2, 0.23, 0],
          ],
          { seg: 6, phase: 30, power: 2.3 },
        ),
        p.paint(Qt.iron, { ...wa }),
        p.lathe(
          [
            [0, 0.21, 0.27, 0.23, 0.05],
            [0.14, 0.19, 0.22, 0.23, 0.02],
            [0.18, 0.16, 0.17, 0.23, 0],
          ],
          { seg: 6, phase: 30 },
        ),
        p.paint(16777215, Ai(0.6)),
        p.lathe(
          [
            [0.46, 0.175, 0.185, 0.23, 0],
            [0.5, 0.18, 0.19, 0.23, 0],
          ],
          { seg: 6, phase: 30, power: 2.3, cap0: !1, cap1: !1 },
        ));
    }),
    p.bone(e).paint(Qt.stoneDark, { c2: Qt.stone, ...As }),
    p.lathe(
      [
        [0.66, 0.24, 0.2],
        [0.8, 0.36, 0.28],
        [0.98, 0.34, 0.27],
        [1.06, 0.3, 0.24],
      ],
      { seg: 8, power: 2.4, phase: 22.5 },
    ),
    p.paint(Qt.cloth, { ...$o }),
    p.g(pt(0, 0.84, 0.29, 6, 0, 0), () =>
      p.extrude(
        [
          [-0.2, 0],
          [0.2, 0],
          [0.18, -0.36],
          [0, -0.48],
          [-0.18, -0.36],
        ],
        0.035,
        0.01,
      ),
    ),
    p.g(pt(0, 0.84, -0.28, -6, 0, 0), () =>
      p.extrude(
        [
          [-0.2, 0],
          [0.2, 0],
          [0.17, -0.34],
          [-0.17, -0.34],
        ],
        0.035,
        0.01,
      ),
    ),
    p.sym(() =>
      p.g(pt(0.36, 0.84, 0, 0, 90, -8), () =>
        p.extrude(
          [
            [-0.14, 0],
            [0.14, 0],
            [0.11, -0.26],
            [-0.11, -0.26],
          ],
          0.035,
          0.01,
        ),
      ),
    ),
    p.paint(16777215, Ai(0.7)),
    p.lathe(
      [
        [1.03, 0.31, 0.25],
        [1.08, 0.33, 0.265],
      ],
      { seg: 8, power: 2.4, phase: 22.5, cap0: !1, cap1: !1 },
    ),
    p.bone(s).paint(Qt.stone, { c2: Qt.stoneLight, ...As }),
    p.lathe(
      [
        [1.06, 0.34, 0.27],
        [1.2, 0.52, 0.37],
        [1.46, 0.62, 0.41],
        [1.66, 0.56, 0.37],
        [1.76, 0.3, 0.26],
      ],
      { seg: 8, power: 2.4, phase: 22.5 },
    ),
    p.paint(Qt.iron, { ...wa }),
    p.g(pt(0, 1.42, 0.38, -6, 0, 0), () =>
      p.extrude(
        [
          [0, -0.26],
          [0.22, -0.12],
          [0.24, 0.16],
          [0, 0.26],
          [-0.24, 0.16],
          [-0.22, -0.12],
        ],
        0.07,
        0.02,
      ),
    ),
    p.bone(m).paint(16777215, Ai(0.7)),
    p.g(pt(0, 1.42, 0.425, -6, 0, 0), () => p.extrude(Hx(0.17), 0.03, 0)),
    p.bone(x).paint(16777215, Ai(0.7)),
    p.g(pt(0, 1.42, 0.425, -6, 0, 0), () => C8(p, 0.16, 0.03)),
    p.bone(s).paint(Qt.wood, { mat: K.leather }),
    p.limb([0.3, 1.5, -0.34], [0.3, 2.74, -0.36], 0.03, 0.026, { seg: 5 }),
    p.paint(Qt.brass, { ...ya }),
    p.g(pt(0.3, 2.72, -0.36), () => p.crystal(0.05, 0.2, 4, 0.6, 0.3)),
    p.bind((y) => (y < 0.5 ? [h, h, 1] : [u, h, Math.min(1, (y - 0.5) / 0.3)])),
    p.paint(Qt.cloth, { ...$o }),
    p.sheet(4, 2, (y, v) => [
      0.32 + y * 0.74,
      2.68 - v * 0.54 * (1 - y * 0.35) - y * 0.1,
      -0.36 + 0.04 * Math.sin(y * 6) * v,
    ]),
    p.bone(i).paint(Qt.stoneDark, { c2: Qt.stoneLight, ...As }),
    p.lathe(
      [
        [1.72, 0.17, 0.18, 0, 0.05],
        [1.82, 0.23, 0.23, 0, 0.05],
        [1.98, 0.22, 0.22, 0, 0.04],
        [2.1, 0.1, 0.11, 0, 0.02],
      ],
      { seg: 6, phase: 90 },
    ),
    p.paint(Qt.iron, { ...wa }),
    p.g(pt(0, 1.9, 0.25, -4, 0, 0), () =>
      p.extrude(
        [
          [-0.14, -0.13],
          [0.14, -0.13],
          [0.16, 0.07],
          [0, 0.16],
          [-0.16, 0.07],
        ],
        0.06,
        0.018,
      ),
    ),
    p.paint(16777215, Ai(0.9)),
    p.box(0, 1.89, 0.288, 0.035, 0.2, 0.02),
    p.paint(Qt.brass, { ...ya }),
    p.sym(() =>
      p.tube(
        [
          [0.2, 1.96, 0.04, 0.05, 0.05],
          [0.34, 2.06, 0.02, 0.04, 0.04],
          [0.38, 2.22, 0.02, 0.008, 0.008],
        ],
        { seg: 5 },
      ),
    ),
    p.sym((y) => {
      const v = y > 0 ? a : o;
      (p.bone(v).paint(Qt.stone, { c2: Qt.stoneLight, ...As }),
        p.g(pt(0.66, 1.64, 0, 0, 0, -16), () => {
          (p.lathe(
            [
              [-0.12, 0.3, 0.28],
              [0, 0.31, 0.29],
              [0.13, 0.23, 0.21],
              [0.19, 0.06, 0.06],
            ],
            { seg: 6, crease: 34, power: 2.4 },
          ),
            p.paint(Qt.brass, { ...ya }),
            p.lathe(
              [
                [-0.13, 0.315, 0.295],
                [-0.07, 0.32, 0.3],
              ],
              { seg: 6, power: 2.4, cap0: !1, cap1: !1 },
            ),
            p.paint(Qt.cloth, { ...$o }),
            p.g(pt(0.2, -0.1, 0, 0, 90, 14), () =>
              p.extrude(
                [
                  [-0.2, 0],
                  [0.2, 0],
                  [0.16, -0.24],
                  [0, -0.32],
                  [-0.16, -0.24],
                ],
                0.03,
                0.008,
              ),
            ));
        }),
        p.paint(Qt.stoneDark, { c2: Qt.stone, ...As }),
        p.limb([0.62, 1.54, 0], [0.64, 1.14, 0], 0.15, 0.13, { seg: 6 }),
        p.bone(y > 0 ? r : l).paint(Qt.stone, { c2: Qt.stoneLight, ...As }),
        p.ball(0.64, 1.12, 0, 0.14, 0.14, 0.14, 0, 60),
        p.limb([0.64, 1.12, 0], [0.64, 0.8, 0], 0.13, 0.17, { seg: 6 }),
        p.paint(Qt.iron, { ...wa }),
        p.box(0.64, 0.7, 0.01, 0.25, 0.24, 0.27, 0.06),
        p.paint(16777215, Ai(0.6)),
        p.box(0.64, 0.835, 0, 0.3, 0.03, 0.3));
    }),
    p.bone(c),
    p.g(pt(-0.64, 0.72, 0.04), () => {
      (p.paint(Qt.wood, { mat: K.leather, pattern: En.bark, patternScale: 8, patternAmt: 0.3 }),
        p.tube(
          [
            [0, 0, -0.5, 0.04],
            [0, 0, 1.06, 0.045],
          ],
          { seg: 6 },
        ),
        p.paint(Qt.stoneDark, { c2: Qt.stoneLight, ...As }),
        p.box(0, 0, 1.24, 0.46, 0.4, 0.44, 0.07),
        p.paint(Qt.brass, { ...ya }),
        p.box(0, 0, 1.24, 0.5, 0.14, 0.48, 0.03),
        p.tube(
          [
            [0, 0, -0.52, 0.06],
            [0, 0, -0.44, 0.06],
          ],
          { seg: 6, crease: 30 },
        ),
        p.paint(16777215, Ai(0.75)),
        p.sym(() => p.g(pt(0.23, 0, 1.24, 0, 0, -90), () => p.crystal(0.1, 0.16, 4, 0.9, 0.1))));
    }),
    p.bakeGrounding(2.2));
  const g = (y, v, _) => {
    const k = v.time * 1.6 + v.seed * 6;
    switch (
      (y.scale(m, v.team === 1 ? 0.001 : 1),
      y.scale(x, v.team === 1 ? 1 : 0.001),
      y.rot(o, -20, 0, -10),
      y.rot(l, -100, 0, 0),
      y.rot(a, 6, 0, 10),
      y.rot(r, -20, 0, 0),
      v.anim)
    ) {
      case "dead": {
        const S = Pm(v.t * 0.85);
        (y.pos(e, 0, -0.14 * S.slump - 0.46 * S.fall * S.fall, 0),
          y.rot(e, 10 * S.slump + 30 * S.burst, 0, 8 * S.burst),
          y.rot(s, 20 * S.burst, 0, -10 * S.burst),
          Go(y, i, S.burst, S.fall, 0.2, 0.6, 1.4, 140, 30),
          Go(y, a, S.burst, S.fall, 0.6, 0, 1, 20, 90),
          Go(y, o, S.burst, S.fall, -0.6, 0.2, 1, 40, -90),
          y.rot(l, -100 + 90 * S.burst, 0, 0),
          y.rot(f, -20 * S.burst, 0, 24 * S.burst),
          y.rot(d, 14 * S.burst, 0, -26 * S.burst),
          (_.glow = Math.max(0.02, 1 - S.slump * 1.3)));
        break;
      }
      case "move": {
        const S = v.stride * kf,
          b = Math.sin(S);
        (y.rot(f, b * 30, 0, 0),
          y.rot(d, -b * 30, 0, 0),
          y.pos(e, 0, Math.abs(Math.cos(S)) * 0.06 - 0.02, 0),
          y.rot(e, 7, -b * 6, b * 2),
          y.rot(s, 2 + Math.cos(S * 2) * 2, b * 8, 0),
          y.rot(a, 6 - b * 22, 0, 10),
          y.rot(c, Math.sin(S * 2 - 1) * 4, 0, 0));
        break;
      }
      case "attack": {
        const S = Qo(v.p, v.windup),
          b = Kn(Ct(S, 0, 0.26)),
          w = Ct(S, 0.26, 0.36),
          T = Gn(Ct(S, 0.55, 1)),
          E = b * (1 - w),
          A = w * (1 - T),
          C = Xe(S, 0.42, 0.1);
        (y.rot(o, -20 - 140 * E - 44 * A + 10 * C, 0, -10 - 10 * E),
          y.rot(l, -100 + 50 * E + 84 * A, 0, 0),
          y.rot(a, 6 - 120 * E - 40 * A, 0, 10 - 30 * E - 20 * A),
          y.rot(r, -20 - 60 * E, 0, 0),
          y.rot(c, -30 * E + 34 * A, 0, 0),
          y.rot(s, -14 * E + 24 * A, 14 * E - 10 * A, 0),
          y.rot(e, -4 * E + 10 * A, 0, 0),
          y.pos(e, 0, 0.05 * E - 0.12 * A, 0.14 * A),
          y.rot(f, 8 * E - 20 * A, 0, 0),
          y.rot(d, -6 * E + 14 * A, 0, 0),
          (_.glow = 1 + 0.3 * E + 0.8 * Xe(S, 0.36, 0.16)));
        break;
      }
      case "stunned": {
        (y.rot(e, 6 + Math.sin(k * 2.6) * 4, 0, Math.cos(k * 2.6) * 6),
          y.rot(i, 16, Math.sin(k * 2.6) * 20, 0),
          (_.glow = 0.6));
        break;
      }
      case "airborne": {
        (y.rot(t, -18 * Math.sin(v.p * Math.PI), 0, 0),
          y.rot(f, -30, 0, 10),
          y.rot(d, 16, 0, -10),
          y.rot(a, -50, 0, 60));
        break;
      }
      default:
        (y.pos(e, 0, Math.sin(k) * 0.014, 0),
          y.rot(s, Math.sin(k) * 1.6, 0, 0),
          y.rot(i, 0, Math.sin(k * 0.4) * 9, 0),
          (_.glow = 1 + 0.15 * Math.sin(k * 2)));
    }
    const M = Jo(v.hitT, 0.18);
    M > 0 && v.anim !== "dead" && (y.add(s, -8 * M, 0, 0), y.add(i, 10 * M, 0, 0));
  };
  return {
    key: "minion:super",
    geometry: p.build(),
    rig: n,
    height: 2.5,
    radius: 0.9,
    scale: 1,
    stride: 2.4,
    triangles: p.triangleCount,
    deathDur: 1.3,
    outline: 1.3,
    attach: {
      chest: { joint: s, x: 0, y: 0.15, z: 0 },
      head: { joint: i, x: 0, y: 0.2, z: 0 },
      weapon: { joint: c, x: 0, y: 0, z: 1.3 },
      muzzle: { joint: c, x: 0, y: 0, z: 1.3 },
      handL: { joint: r, x: 0, y: -0.4, z: 0 },
      handR: { joint: l, x: 0, y: -0.4, z: 0 },
    },
    blend: (y, v) => (v === "attack" ? 0.08 : 0.15),
    animate: g,
  };
}

const tO = Math.PI * 2,
  eO = Math.PI / 180,
  kw = 9072208,
  yd = 5521455,
  Sw = 13482128,
  Tw = 15919832,
  nO = 6968898,
  sO = 9074266,
  Ew = 6265418,
  Aw = 10276698,
  iO = 14182458,
  Rw = 16773320,
  aO = 16767088,
  oO = 15260864,
  rO = (n, t) => {
    const e = Math.sin(n * 127.1 + t * 311.7) * 43758.5453;
    return e - Math.floor(e);
  };

function lO() {
  const n = Lm({
      pelvis: [0.62, -0.6],
      chest: [0.6, 0.42],
      neck: [],
      head: [0.64, 0.84],
      tail: [[0.6, -1.06]],
      front: [
        [0.4, 0.56, 0.46],
        [0.52, 0.32, 0.34],
        [0.54, 0.08, 0.58],
      ],
      hind: [
        [0.44, 0.56, -0.6],
        [0.56, 0.34, -0.44],
        [0.56, 0.08, -0.72],
      ],
      bendFront: -1,
      bendHind: 1,
    }),
    t = n.rig,
    e = t.add("shell", n.pelvis, 0, 0.9, -0.1),
    s = t.add("flora", e, 0, 1.1, -0.15),
    i = new Ls();
  i.crease = 60;
  const a = { mat: K.fur, pattern: En.fur, patternScale: 9, patternAmt: 0.45, grain: 0.08 },
    o = (x, p, g, y, v, _) => Qn(0, -0.8, _);
  n.legs.forEach((x) => {
    const p = x.side,
      g = Di(t, [x.upper, x.lower, x.foot], 0.5);
    (i.bind(g).paint(yd, { c2: 3812386, by: (_, k) => Qn(0.5, 0.1, k), ...a }),
      x.front
        ? i.tube(
            [
              [p * 0.4, 0.62, 0.46, 0.17, 0.2],
              [p * 0.5, 0.34, 0.36, 0.14, 0.15],
              [p * 0.54, 0.13, 0.54, 0.14, 0.16],
            ],
            { seg: 7, cap0: !1 },
          )
        : i.tube(
            [
              [p * 0.42, 0.64, -0.6, 0.19, 0.25],
              [p * 0.55, 0.36, -0.46, 0.15, 0.17],
              [p * 0.56, 0.13, -0.68, 0.13, 0.15],
            ],
            { seg: 7, cap0: !1 },
          ),
      i.bone(x.foot).paint(3812386, { ...a }));
    const y = x.front ? 0.19 : 0.15;
    i.ball(x.rx, 0.08, x.rz + 0.06, y, 0.09, x.front ? 0.22 : 0.19, 1);
    const v = x.front ? 4 : 3;
    for (let _ = 0; _ < v; _++) {
      const k = _ / (v - 1) - 0.5;
      (i.paint(oO, { c2: 16775400, gloss: 0.6, mat: K.leather }),
        i.g(pt(x.rx + k * y * 1.5, 0.07, x.rz + 0.22 - Math.abs(k) * 0.06, 78, k * 26 * p, 0), () =>
          i.crystal(x.front ? 0.036 : 0.026, x.front ? 0.24 : 0.13, 4, 0.8, 0.1),
        ));
    }
  });
  const r = [
      [0, 0.56, -1.08, 0.12, 0.12],
      [0, 0.6, -0.88, 0.5, 0.4],
      [0, 0.62, -0.42, 0.64, 0.47],
      [0, 0.6, 0.16, 0.56, 0.43],
      [0, 0.6, 0.6, 0.42, 0.37],
      [0, 0.63, 0.86, 0.31, 0.3],
    ],
    l = (x) => {
      let p = 0;
      for (; p < r.length - 2 && r[p + 1][2] < x;) p++;
      const g = Math.min(1, Math.max(0, (x - r[p][2]) / (r[p + 1][2] - r[p][2])));
      return [bt(r[p][1], r[p + 1][1], g), bt(r[p][3], r[p + 1][3], g), bt(r[p][4], r[p + 1][4], g)];
    },
    c = Di(t, [n.pelvis, n.chest], 1.2);
  (i.bind(c).paint(kw, { c2: Sw, by: o, ...a }),
    i.tube(r, { seg: 10, up: [1, 0, 0] }),
    i.bone(n.tail[0]).paint(yd, { c2: Tw, ...a }),
    i.tube(
      [
        [0, 0.58, -1.02, 0.11, 0.1],
        [0, 0.56, -1.22, 0.09, 0.08],
        [0, 0.6, -1.4, 0.02, 0.02],
      ],
      { seg: 6, up: [1, 0, 0] },
    ),
    i.bone(e));
  for (let x = 0; x < 5; x++) {
    const p = 0.5 - x * 0.3,
      g = p - 0.4,
      y = (v, _, k, M) => (S, b) => {
        const w = bt(p, g, b),
          [T, E, A] = l(w),
          C = bt(v, _, S) * eO,
          R = bt(k, M, b) + 0.025 * Math.sin(S * Math.PI),
          I = 1 - 0.05 * (rO(Math.round(S * 6) + x * 7, 3) > 0.5 ? 1 : 0) * b;
        return [Math.cos(C) * (E + R) * I, T + Math.sin(C) * (A + R), w];
      };
    (i.paint(x % 2 ? nO : sO, {
      c2: yd,
      by: (v, _, k, M) => M * M * 0.6,
      mat: K.rock,
      pattern: En.bark,
      patternScale: 7,
      patternAmt: 0.6,
      grain: 0.1,
    }),
      i.sheet(6, 2, y(168, 12, 0.035, 0.13), !0, 50),
      i.paint(Ew, { c2: Aw, by: (v, _, k, M, S, b) => Qn(0.6, 1, b), mat: K.cloth, grain: 0.12 }),
      i.sheet(4, 2, y(128, 52, 0.055, 0.15), !1, 50));
  }
  i.bone(s);
  const f = (x, p, g, y, v) => {
    const [_, , k] = l(p),
      M = _ + k + 0.08,
      S = Math.cos(g),
      b = Math.sin(g),
      w = [];
    for (let T = 0; T <= 3; T++) {
      const E = T / 3,
        A = E * y,
        C = v * Math.sin(E * 2.2) * y;
      w.push([
        x + b * A,
        M + C,
        p + S * A,
        0.15 * Math.sin(Math.min(1, E * 1.3 + 0.25) * Math.PI) + 0.01,
        0.014,
      ]);
    }
    (i.paint(Ew, { c2: Aw, mat: K.cloth, pattern: En.vein, patternScale: 10, patternAmt: 0.4 }),
      i.tube(w, { seg: 4, up: [S, 0, -b], cap0: !1 }));
  };
  (f(0.22, 0.2, 0.9, 0.5, 0.55),
    f(-0.24, 0.24, -1, 0.46, 0.6),
    f(0.36, -0.3, 1.5, 0.54, 0.5),
    f(-0.38, -0.36, -1.7, 0.5, 0.52),
    f(0.2, -0.78, 2.6, 0.5, 0.5),
    f(-0.16, -0.8, -2.7, 0.46, 0.55));
  const d = (x, p, g, y, v) => {
    const [_, , k] = l(p),
      M = _ + k + 0.06;
    i.g(pt(x, M, p, v, 0, v * 0.6), () => {
      (i.paint(Rw, { c2: 14207136, mat: K.cloth }),
        i.tube(
          [
            [0, 0, 0, g * 0.3],
            [0.01, y * 0.6, 0, g * 0.22],
            [0, y, 0, g * 0.26],
          ],
          { seg: 6 },
        ),
        i.paint(iO, { c2: 15764042, gloss: 0.35, mat: K.leather }),
        i.lathe(
          [
            [y - g * 0.12, g * 0.96],
            [y, g],
            [y + g * 0.34, g * 0.74],
            [y + g * 0.56, g * 0.36],
            [y + g * 0.62, 0.01],
          ],
          { seg: 9, crease: 70 },
        ),
        i.paint(Rw, { glow: 0.12, mat: K.cloth, line: 0 }));
      for (let S = 0; S < 5; S++) {
        const b = S * 1.26 + 0.4,
          w = g * (S === 0 ? 0 : 0.6);
        i.ball(
          Math.cos(b) * w,
          y + g * (S === 0 ? 0.6 : 0.36),
          Math.sin(b) * w,
          g * 0.17,
          g * 0.07,
          g * 0.17,
          0,
        );
      }
    });
  };
  (d(0.1, -0.34, 0.3, 0.3, 6), d(-0.24, 0.06, 0.17, 0.2, -10));
  const h = (x, p, g, y, v, _) => Qn(0.19, 0.07, Math.abs(x)) * Qn(-0.1, 0.5, _);
  (i.bone(n.head).paint(yd, { c2: Tw, by: h, ...a }),
    i.tube(
      [
        [0, 0.63, 0.74, 0.3, 0.29],
        [0, 0.65, 0.98, 0.31, 0.27],
        [0, 0.62, 1.2, 0.22, 0.19],
        [0, 0.58, 1.38, 0.14, 0.12],
        [0, 0.56, 1.48, 0.08, 0.07],
      ],
      { seg: 12, up: [1, 0, 0] },
    ),
    i.paint(Sw, { ...a }),
    i.tube(
      [
        [0, 0.5, 0.86, 0.24, 0.1],
        [0, 0.49, 1.18, 0.16, 0.08],
        [0, 0.5, 1.4, 0.08, 0.05],
      ],
      { seg: 6, up: [1, 0, 0] },
    ),
    i.paint(1840658, { gloss: 0.6, mat: K.leather }),
    i.ball(0, 0.585, 1.5, 0.07, 0.055, 0.05, 1),
    i.sym(() => {
      (i.paint(yd, { c2: kw, ...a }),
        i.ball(0.26, 0.9, 0.86, 0.09, 0.09, 0.05, 0),
        i.paint(aO, { glow: 0.5, mat: K.crystal }),
        i.ball(0.2, 0.72, 1.14, 0.04, 0.045, 0.03, 0));
    }),
    i.bakeGrounding(1.2, 0.72, 0.9));
  const u = 1.9,
    m = (x, p, g) => {
      const y = p.time * 1.3 + p.seed * 7,
        v = Math.sin(y * 2.2),
        _ = (p.mode & 2) !== 0;
      let k = !0;
      switch (
        (x.pos(n.pelvis, 0, v * 0.012, 0),
        x.rot(s, v * 2.5, 0, Math.sin(y * 1.7) * 2.5),
        x.rot(n.tail[0], 0, Math.sin(y * 3.1) * 16, 0),
        p.anim)
      ) {
        case "dead": {
          const S = p.t,
            b = Gn(Ct(S, 0.02, 0.45)),
            w = p.seed > 0.5 ? 1 : -1;
          (x.rot(n.root, 0, 0, w * 172 * b),
            x.pos(n.root, w * 0.3 * b, 1.24 * b + 0.25 * Math.sin(b * Math.PI), 0));
          const T = (Xe(S, 0.62, 0.1) + Xe(S, 0.86, 0.1)) * (1 - Ct(S, 1, 1.1));
          (n.legs.forEach((E, A) =>
            Ds(
              n,
              x,
              A,
              E.rx,
              E.ry + 0.16 * b - 0.14 * T * (A % 2 ? 1 : 0.6),
              E.rz + (E.front ? 0.14 : -0.14) * T,
              30 * b,
            ),
          ),
            (k = !1),
            x.rot(n.head, -16 * b, 0, w * 12 * b),
            x.scale(s, 1 - 0.5 * Ct(S, 0.7, 1.3)),
            (g.glow = 1 - Ct(S, 0.5, 1)));
          break;
        }
        case "move": {
          const S = p.stride * tO;
          (x.rot(n.head, Math.sin(S * 2) * 4 + 4, 0, 0),
            Im(n, x, p.stride, {
              style: "trot",
              stride: u,
              lift: 0.16,
              bob: 0.03,
              pitch: 2,
              sway: 5,
              roll: 3,
              curl: 20,
            }),
            x.add(s, 0, 0, Math.sin(S * 2) * 4),
            (k = !1));
          break;
        }
        case "attack": {
          const S = Qo(p.p, p.windup),
            b = Kn(Ct(S, 0, 0.27)),
            w = Ct(S, 0.27, 0.36),
            T = Gn(Ct(S, 0.5, 1)),
            E = b * (1 - w),
            A = w * (1 - T);
          if (p.mode & 1) {
            (x.move(n.pelvis, 0, -0.06 * A, 0.24 * A),
              x.add(n.pelvis, 8 * A, 0, 0),
              V1(n, x, E, 50, 0.16),
              x.add(n.head, 26 * E, 0, 0));
            for (let C = 0; C < 2; C++) {
              const R = n.legs[C];
              Ds(n, x, C, R.rx + R.side * 0.08 * E, R.ry + 0.95 * E, R.rz - 0.1 * E + 0.2 * A, 40 * E);
            }
            _a(n, x, 0, 0, 12);
          } else {
            (x.move(n.pelvis, 0, 0.08 * E - 0.05 * A, -0.24 * E + 0.5 * A),
              x.add(n.pelvis, -10 * E + 8 * A, 0, 0),
              x.add(n.head, -14 * E + 12 * A, 0, 0),
              _a(n, x, 0, 0, 12));
            for (let C = 0; C < 2; C++) {
              const R = n.legs[C],
                I = C === p.variant % 2 ? 1 : 0.8;
              Ds(
                n,
                x,
                C,
                R.rx - R.side * 0.12 * A,
                R.ry + 0.42 * E * I + 0.14 * A * (1 - A),
                R.rz - 0.1 * E + 0.62 * A,
                30 * E - 16 * A,
              );
            }
          }
          k = !1;
          break;
        }
        case "stunned": {
          (x.rot(n.head, 14, Math.sin(y * 4) * 20, Math.cos(y * 4) * 10),
            x.add(n.pelvis, 0, 0, Math.sin(y * 2) * 4));
          break;
        }
        case "airborne": {
          (x.rot(n.root, -18 * Math.sin(p.p * Math.PI), 0, 14),
            n.legs.forEach((S, b) =>
              Ds(n, x, b, S.rx + S.side * 0.1, S.ry + 0.12, S.rz + (S.front ? 0.16 : -0.16), 30),
            ),
            (k = !1));
          break;
        }
        default:
          if (p.spawnT >= 0) {
            const S = p.spawnT / 1,
              b = Kn(Ct(S, 0, 0.25)),
              w = Gn(Ct(S, 0.45, 0.9));
            (x.pos(n.root, 0, -1.25 + 0.5 * b + 0.75 * w, -0.4 * (1 - w)),
              x.rot(n.root, -34 * (1 - w), 0, 0),
              x.rot(n.head, 20 * (1 - w), Math.sin(S * 22) * 24 * b * (1 - w), 0));
          } else if (_) {
            (x.rot(e, -8, 0, 0), x.move(n.pelvis, 0, -0.03, -0.04), x.rot(n.head, 8, 0, 0));
            const S = (y * 0.8) % 1,
              b = Xe(S, 0.3, 0.14) + Xe(S, 0.58, 0.14),
              w = n.legs[0];
            (_a(n, x, 0, 0, 14), Ds(n, x, 0, w.rx, w.ry + 0.12 * b, w.rz + 0.1 - 0.2 * b, 20 * b), (k = !1));
          } else {
            const S = (y / 5) % 1,
              b = Gn(Ct(S, 0.6, 0.68)) * (1 - Gn(Ct(S, 0.86, 0.95)));
            (x.rot(
              n.head,
              6 + Math.sin(y * 5) * 2 + 10 * b,
              Math.sin(y * 0.5) * 14 * (1 - b),
              Math.sin(y * 16) * 12 * b,
            ),
              x.add(n.chest, 4 * b, 0, 0));
          }
      }
      const M = Jo(p.hitT);
      (M > 0 &&
        p.anim !== "dead" &&
        (x.add(n.head, 16 * M, 0, (p.seed > 0.5 ? 1 : -1) * 10 * M),
        x.move(n.pelvis, 0, -0.05 * M, -0.05 * M),
        x.add(e, -6 * M, 0, 0)),
        k && _a(n, x));
    };
  return {
    key: "monster:mossback",
    geometry: i.build(),
    rig: t,
    height: 1.6,
    radius: 1,
    scale: 1,
    stride: u,
    triangles: i.triangleCount,
    deathDur: 1.4,
    spawnDur: 1,
    outline: 1.4,
    attach: {
      chest: { joint: n.chest, x: 0, y: 0.1, z: 0 },
      head: { joint: n.head, x: 0, y: 0.1, z: 0.3 },
      muzzle: { joint: n.head, x: 0, y: -0.05, z: 0.66 },
      weapon: { joint: n.legs[1].foot, x: 0, y: 0, z: 0.25 },
      tail: { joint: n.tail[0], x: 0, y: 0, z: -0.3 },
    },
    blend: (x, p) => (p === "attack" ? 0.08 : 0.16),
    animate: m,
  };
}

const Cw = Math.PI * 2,
  Ca = 2898052,
  Lw = 5136568,
  o0 = 1712210,
  Iw = 8361676,
  Pw = 12110058,
  g2 = 3811978,
  _c = 9067775,
  Dw = 4186320,
  Tp = 10514687,
  wc = 14731519,
  vd = 13617384,
  bd = 6970010,
  Ep = 15789311,
  cO = 8384736,
  zw = 5909146,
  Nw = yn.breathWarn / (yn.breathWarn + yn.breathTime);

function x2(n, t) {
  const e = [],
    s = n.length,
    i = (a) => n[Math.max(0, Math.min(s - 1, a))];
  for (let a = 0; a < s - 1; a++) {
    const o = i(a - 1),
      r = i(a),
      l = i(a + 1),
      c = i(a + 2),
      f = a === s - 2 ? t + 1 : t;
    for (let d = 0; d < f; d++) {
      const h = d / t,
        u = h * h,
        m = u * h,
        x = [0, 0, 0, 0, 0];
      for (let p = 0; p < 5; p++)
        x[p] =
          0.5 *
          (2 * r[p] +
            (-o[p] + l[p]) * h +
            (2 * o[p] - 5 * r[p] + 4 * l[p] - c[p]) * u +
            (-o[p] + 3 * r[p] - 3 * l[p] + c[p]) * m);
      e.push({ p: [x[0], x[1], x[2]], t: [0, 0, 1], d: [0, 1, 0], rx: x[3], ry: x[4] });
    }
  }
  for (let a = 0; a < e.length; a++) {
    const o = e[Math.max(0, a - 1)].p,
      r = e[Math.min(e.length - 1, a + 1)].p,
      l = r[0] - o[0],
      c = r[1] - o[1],
      f = r[2] - o[2],
      d = Math.hypot(l, c, f) || 1;
    e[a].t = [l / d, c / d, f / d];
    const h = Math.hypot(f, c) || 1;
    e[a].d = [0, f / h, -c / h];
  }
  return e;
}

function fO() {
  const n = Lm({
      pelvis: [1.75, -1.3],
      chest: [2.05, 0.9],
      neck: [
        [2.42, 1.55],
        [3.02, 2.24],
        [3.68, 2.06],
        [4.14, 2.22],
      ],
      head: [4.32, 2.58],
      jaw: [4.14, 2.63],
      tail: [
        [1.6, -2.1],
        [1.36, -2.9],
        [1.12, -3.7],
        [0.92, -4.5],
        [0.76, -5.25],
        [0.66, -5.95],
      ],
      front: [
        [0.85, 1.9, 0.95],
        [1.22, 1.05, 0.62],
        [1.28, 0.2, 1.15],
      ],
      hind: [
        [0.8, 1.7, -1.35],
        [1.22, 0.95, -0.92],
        [1.22, 0.2, -1.6],
      ],
      bendFront: -1,
      bendHind: 1,
    }),
    t = n.rig,
    e = pt(0, 4.32, 2.58, 12, 0, 0, 1.1),
    s = (H, st, tt) => new dt(H, st, tt).applyMatrix4(e),
    i = (H, st, tt, it, D) => {
      const Q = s(tt, it, D);
      return t.add(H, st, Q.x, Q.y, Q.z);
    },
    a = i("crest", n.head, 0, 0.37, 0.4),
    o = i("vent", n.head, 0, -0.13, 1),
    r = [1, -1].map((H) => i(`frill${H}`, n.head, H * 0.36, 0.06, -0.08)),
    l = [1, -1].map((H) => {
      const st = [
          [H * 0.15, -0.26, 1.1],
          [H * 0.22, -0.6, 1.04],
          [H * 0.27, -0.9, 0.82],
        ],
        tt = [];
      st.forEach(($, ut) => tt.push(i(`whisker${H}_${ut}`, ut === 0 ? n.jaw : tt[ut - 1], $[0], $[1], $[2])));
      const it = s(H * 0.3, -1.06, 0.46),
        D = st[st.length - 1],
        Q = s(D[0], D[1], D[2]);
      return (
        t.chain({
          joints: tt,
          tip: [it.x - Q.x, it.y - Q.y, it.z - Q.z],
          stiffness: 7,
          drag: 0.9,
          gravity: 9,
          maxAngle: 60,
          wind: 1.5,
        }),
        { js: tt, tip: [it.x, it.y, it.z] }
      );
    }),
    c = [0.55, 2.7, 0.6],
    f = [1.7, 3.25, 0.05],
    d = [2.6, 3.5, 1],
    h = [
      [4.15, 3.4, 1.25],
      [4.3, 3.1, -0.9],
      [3.2, 2.9, -2.5],
    ],
    u = [0.62, 2.3, -1.9],
    m = [1, -1].map((H) => {
      const st = t.add(`wingA${H}`, n.chest, H * c[0], c[1], c[2]),
        tt = t.add(`wingB${H}`, st, H * f[0], f[1], f[2]),
        it = t.add(`wingH${H}`, tt, H * d[0], d[1], d[2]),
        D = [0, 1, 2].map((Q) => t.add(`wingF${Q}_${H}`, it, H * d[0], d[1], d[2]));
      return { a: st, f: tt, h: it, fingers: D };
    }),
    x = (H, st) => new dt(st[0] - H[0], st[1] - H[1], st[2] - H[2]).normalize(),
    p = (H, st) => {
      const tt = st.clone().addScaledVector(H, -st.dot(H)).normalize(),
        it = new dt().crossVectors(H, tt);
      return new Ri().setFromRotationMatrix(new Ke().makeBasis(H, tt, it));
    },
    g = new Ri().setFromUnitVectors(x(c, f), new dt(0.2, 0.5, -0.84).normalize()),
    y = new Ri().setFromUnitVectors(x(f, d), new dt(0.26, -0.26, 0.93).normalize()),
    v = [x(d, h[0]), x(d, h[1]), x(d, h[2])],
    _ = new dt().crossVectors(v[0], v[2]).normalize(),
    k = p(new dt(0.02, -0.3, -0.95).normalize(), new dt(0.8, 0.6, 0)).multiply(p(v[2], _).invert()),
    S = [
      g,
      g.clone().invert().multiply(y),
      y.clone().invert().multiply(k),
      new Ri().setFromAxisAngle(_, v[0].angleTo(v[2]) - 0.56),
      new Ri().setFromAxisAngle(_, v[1].angleTo(v[2]) - 0.26),
      new Ri(),
    ].map((H) => {
      const st = Math.min(1, Math.max(-1, H.w)),
        tt = 2 * Math.acos(st),
        it = Math.sqrt(Math.max(1e-9, 1 - st * st));
      return [H.x / it, H.y / it, H.z / it, tt];
    }),
    b = new Ls();
  b.crease = 62;
  const w = {
      mat: K.leather,
      gloss: 0.35,
      pattern: En.scale,
      patternScale: 4.5,
      patternAmt: 0.6,
      grain: 0.07,
    },
    T = { mat: K.leather, gloss: 0.5 },
    E = (H, st, tt, it, D, Q, $) => {
      const ut = H.length,
        N = (kt, V, U, ht, lt, O, Y) => Qn(0.2, 0.9, -(lt * D[0] + O * D[1] + Y * D[2]));
      (b.bind(st).paint(Ca, { c2: o0, by: N, ...w }),
        b.tube(
          H.map((kt) => [kt.p[0], kt.p[1], kt.p[2], kt.rx, kt.ry]),
          { seg: it, up: [1, 0, 0], cap0: Q, cap1: $, crease: 62 },
        ));
      const J = [],
        Z = [],
        ot = [],
        j = [];
      for (let kt = 0; kt < ut; kt++) {
        const V = H[kt],
          U = (kt / (ut - 1)) * tt,
          ht = U - Math.floor(U);
        (J.push([V.p[0], V.p[1], V.p[2], V.rx, V.ry]), Z.push(0.03 + 0.085 * ht), ot.push(ht), j.push(V));
        const lt = ((kt + 1) / (ut - 1)) * tt;
        if (kt < ut - 1 && Math.floor(lt) > Math.floor(U)) {
          const O = H[kt + 1],
            Y = 0.93;
          (J.push([
            bt(V.p[0], O.p[0], Y),
            bt(V.p[1], O.p[1], Y),
            bt(V.p[2], O.p[2], Y),
            bt(V.rx, O.rx, Y),
            bt(V.ry, O.ry, Y),
          ]),
            Z.push(0.03 + 0.085),
            ot.push(1),
            j.push(V));
        }
      }
      const at = J.length;
      (b
        .bind(st)
        .paint(Iw, {
          c2: Pw,
          by: (kt, V, U, ht) => Math.pow(ot[Math.min(at - 1, Math.round(ht * (at - 1)))], 3),
          ...T,
        }),
        b.sheet(
          6,
          at - 1,
          (kt, V) => {
            const U = Math.min(at - 1, Math.round(V * (at - 1))),
              ht = j[U],
              lt = J[U],
              O = ((160 - 140 * kt) * Math.PI) / 180,
              gt = kt < 0.01 || kt > 0.99 ? 0.985 : 1.04 + Z[U],
              ft = Math.cos(O) * lt[3] * gt,
              _t = Math.sin(O) * lt[4] * gt;
            return [lt[0] + ft, lt[1] - ht.d[1] * _t, lt[2] - ht.d[2] * _t];
          },
          !1,
          46,
        ));
    },
    A = (H, st, tt, it) => {
      const D = [H.p[0] + H.d[0] * H.ry * 0.9, H.p[1] + H.d[1] * H.ry * 0.9, H.p[2] + H.d[2] * H.ry * 0.9],
        Q = new Ke().makeBasis(
          new dt(H.t[0], H.t[1], H.t[2]),
          new dt(H.d[0], H.d[1], H.d[2]),
          new dt(1, 0, 0),
        );
      (Q.setPosition(D[0], D[1], D[2]),
        b.bind(it).paint(Tp, { c2: wc, glow: 0.14, glow2: 0.55, gloss: 0.8, mat: K.crystal, line: 1 }),
        b.g(Q, () =>
          b.extrude(
            [
              [tt * 0.5, -0.06],
              [tt * 0.12, st * 0.55],
              [-tt * 0.42, st],
              [-tt * 0.3, st * 0.42],
              [-tt * 0.55, -0.06],
            ],
            0.07,
            0.03,
          ),
        ));
    },
    C = (H, st, tt, it, D) => {
      const Q = Math.cos(st),
        $ = Math.sin(st),
        ut = new dt(Q, H.d[1] * $, H.d[2] * $).normalize(),
        N = [Q * H.rx * 0.99, H.p[1] + H.d[1] * $ * H.ry * 0.99, H.p[2] + H.d[2] * $ * H.ry * 0.99],
        J = new dt(-H.t[0], -H.t[1], -H.t[2]),
        Z = new dt().crossVectors(J, ut).normalize(),
        ot = new Ke().makeBasis(Z, J, ut);
      (ot.setPosition(N[0], N[1], N[2]),
        b.bind(D).paint(fh(Ca, Lw, 0.55), { c2: Ca, gloss: 0.6, mat: K.leather }),
        b.g(ot, () =>
          b.g(pt(0, 0, 0, -6, 0, 0), () =>
            b.extrude(
              [
                [0, -it * 0.35],
                [tt * 0.5, 0],
                [tt * 0.3, it * 0.5],
                [0, it * 0.68],
                [-tt * 0.3, it * 0.5],
                [-tt * 0.5, 0],
              ],
              0.045,
              0,
            ),
          ),
        ));
    };
  n.legs.forEach((H) => {
    const st = H.side,
      tt = Di(t, [H.upper, H.lower, H.foot], 0.5);
    (b.bind(tt).paint(Ca, { c2: o0, by: (it, D) => Qn(1.2, 0.2, D), ...w }),
      H.front
        ? b.tube(
            [
              [st * 0.78, 2.1, 0.98, 0.42, 0.56],
              [st * 1, 1.6, 0.84, 0.38, 0.46],
              [st * 1.2, 1.08, 0.64, 0.29, 0.33],
              [st * 1.25, 0.62, 0.84, 0.25, 0.27],
              [st * 1.28, 0.28, 1.1, 0.27, 0.32],
            ],
            { seg: 9, cap0: !1 },
          )
        : b.tube(
            [
              [st * 0.7, 1.95, -1.4, 0.46, 0.66],
              [st * 1, 1.45, -1.16, 0.42, 0.56],
              [st * 1.22, 0.98, -0.94, 0.3, 0.36],
              [st * 1.22, 0.58, -1.3, 0.25, 0.28],
              [st * 1.22, 0.28, -1.56, 0.27, 0.32],
            ],
            { seg: 9, cap0: !1 },
          ),
      b.bone(H.upper).paint(Tp, { c2: wc, glow: 0.15, glow2: 0.6, gloss: 0.8, mat: K.crystal, line: 1 }),
      b.g(
        pt(
          H.front ? st * 1.22 : st * 1.3,
          H.front ? 1.16 : 1.06,
          H.front ? 0.4 : -0.72,
          H.front ? -50 : 40,
          0,
          st * -24,
        ),
        () => b.crystal(0.08, 0.5, 4, 0.75, 0.1),
      ),
      b.bone(H.foot).paint(o0, { c2: Ca, ...w }),
      b.ball(H.rx, 0.2, H.rz + 0.08, 0.32, 0.2, 0.36, 1));
    for (let it = -1; it <= 1; it++) {
      const D = it * 24 * st;
      b.g(pt(H.rx + it * 0.17, 0.16, H.rz + 0.28, 0, D, 0), () => {
        (b.paint(o0, { c2: Ca, ...w }),
          b.tube(
            [
              [0, 0.02, 0, 0.12, 0.11],
              [0, 0.03, 0.26, 0.1, 0.09],
              [0, -0.02, 0.4, 0.07, 0.06],
            ],
            { seg: 6, up: [1, 0, 0] },
          ),
          b.paint(Ep, { c2: 16777215, gloss: 0.8, mat: K.leather }),
          b.tube(
            [
              [0, 0.02, 0.36, 0.06, 0.06],
              [0, 0, 0.52, 0.04, 0.045],
              [0, -0.1, 0.64, 0.004, 0.004],
            ],
            { seg: 5, up: [1, 0, 0] },
          ));
      });
    }
  });
  const R = Di(t, [n.pelvis, n.chest], 1.2),
    I = x2(
      [
        [0, 1.52, -2.25, 0.5, 0.48],
        [0, 1.68, -1.75, 0.8, 0.72],
        [0, 1.74, -1.25, 0.94, 0.86],
        [0, 1.7, -0.45, 0.9, 0.82],
        [0, 1.8, 0.35, 1.02, 0.95],
        [0, 2.02, 0.98, 0.98, 0.98],
        [0, 2.26, 1.42, 0.78, 0.8],
      ],
      3,
    );
  E(I, R, 7, 14, [0, -1, 0], !1, !1);
  const P = [n.chest, ...n.neck, n.head],
    F = Di(t, P, 0.9),
    L = x2(
      [
        [0, 2.16, 1.24, 0.8, 0.82],
        [0, 2.44, 1.6, 0.6, 0.64],
        [0, 3.02, 2.26, 0.43, 0.46],
        [0, 3.68, 2.06, 0.36, 0.38],
        [0, 4.14, 2.24, 0.32, 0.34],
        [0, 4.34, 2.52, 0.3, 0.31],
      ],
      4,
    );
  E(L, F, 10, 12, [0, -0.5, 0.86], !1, !1);
  const B = [n.pelvis, ...n.tail],
    q = Di(t, B, 0.9, [0, 0.6, -7]),
    et = x2(
      [
        [0, 0.62, -6.6, 0.07, 0.08],
        [0, 0.66, -5.95, 0.15, 0.17],
        [0, 0.76, -5.25, 0.22, 0.24],
        [0, 0.92, -4.5, 0.3, 0.32],
        [0, 1.12, -3.7, 0.4, 0.42],
        [0, 1.36, -2.9, 0.52, 0.52],
        [0, 1.56, -2.2, 0.62, 0.6],
      ],
      3,
    );
  (E(et, q, 9, 10, [0, -1, 0], !0, !1),
    b
      .bind(q)
      .paint(_c, {
        c2: wc,
        glow: 0.12,
        glow2: 0.5,
        gloss: 0.6,
        mat: K.crystal,
        line: 1,
        by: (H, st, tt) => Math.max(Qn(-6.1, -7.3, tt), Qn(0.9, 1.5, st), Qn(0.4, 0, st)),
      }),
    b.g(pt(0, 0.66, -6.35, 0, -90, 0), () =>
      b.extrude(
        [
          [-0.75, 0],
          [-0.3, 0.42],
          [0.25, 0.78],
          [0.95, 0.6],
          [1.1, 0.05],
          [0.9, -0.5],
          [0.25, -0.62],
          [-0.3, -0.36],
        ],
        0.07,
        0.03,
      ),
    ),
    b.paint(o0, { c2: _c, gloss: 0.5, mat: K.leather }),
    b.limb([0, 0.64, -6], [0, 0.68, -7.3], 0.075, 0.02, { seg: 5 }));
  const ct = (H, st, tt, it) => {
    st.forEach((D, Q) => {
      const $ = H[D];
      A($, it(Q / Math.max(1, st.length - 1)), 0.5 + $.ry * 0.5, tt);
    });
  };
  (ct(L, [3, 6, 9, 12, 15, 18], F, (H) => bt(0.7, 0.36, H)),
    ct(I, [15, 11, 7, 3], R, (H) => bt(0.86, 0.6, H)),
    ct(et, [16, 13, 10, 7, 4], q, (H) => bt(0.56, 0.24, H)));
  for (const H of [1, -1]) {
    const st = (tt) => (H > 0 ? tt : Math.PI - tt);
    for (let tt = 0; tt < 3; tt++) {
      for (let it = 0; it < 3; it++)
        C(I[13 + it + (tt % 2)], st(0.62 + tt * 0.3 + (it % 2) * 0.1), 0.42, 0.52, R);
      for (let it = 0; it < 3; it++)
        C(I[2 + it * 2 + (tt % 2)], st(0.56 + tt * 0.32 + (it % 2) * 0.1), 0.4, 0.5, R);
    }
    for (let tt = 0; tt < 4; tt++) C(et[17 - tt * 2], st(0.6 + (tt % 2) * 0.4), 0.3 - tt * 0.03, 0.42, q);
  }
  (b.g(e, () => {
    (b.bone(n.head).paint(Ca, { c2: Lw, by: (H, st, tt, it) => it * it, ...w }),
      b.tube(
        [
          [0, 0.02, -0.26, 0.3, 0.28],
          [0, 0.08, 0.16, 0.41, 0.31],
          [0, 0.06, 0.52, 0.38, 0.27],
          [0, 0.01, 0.92, 0.28, 0.2],
          [0, -0.02, 1.24, 0.22, 0.155],
          [0, -0.05, 1.44, 0.13, 0.09],
        ],
        { seg: 12, up: [1, 0, 0], shape: (H) => 1 - 0.42 * Qn(0.2, 0.9, Math.sin(H)) },
      ),
      b.paint(bd, { c2: vd, gloss: 0.7, mat: K.leather }));
    for (let H = 0; H < 3; H++)
      b.g(pt(0, 0.17 - H * 0.045, 0.78 + H * 0.2, -30, 0, 0), () =>
        b.crystal(0.045, 0.2 - H * 0.03, 4, 0.8, 0.1),
      );
    (b.paint(zw, { c2: 9067736, glow: 0.1, glow2: 0.3, mat: K.cloth, line: 0 }),
      b.tube(
        [
          [0, -0.07, 0.1, 0.26, 0.03],
          [0, -0.075, 0.9, 0.18, 0.03],
          [0, -0.07, 1.3, 0.07, 0.02],
        ],
        { seg: 4, up: [1, 0, 0] },
      ),
      b.sym((H) => {
        (b.paint(o0, { c2: Ca, gloss: 0.6, mat: K.leather }),
          b.g(pt(0.3, 0.27, 0.36, 8, 14, -18), () =>
            b.extrude(
              [
                [-0.16, -0.02],
                [0, 0.07],
                [0.12, 0.03],
                [0.1, -0.05],
                [-0.14, -0.07],
              ],
              0.52,
              0.03,
            ),
          ),
          b.paint(cO, { glow: 0.95, mat: K.crystal }),
          b.g(pt(0.375, 0.15, 0.4, 0, 72, 12), () =>
            b.extrude(
              [
                [-0.12, 0],
                [-0.02, 0.05],
                [0.12, 0.02],
                [0.02, -0.045],
              ],
              0.05,
              0,
            ),
          ),
          b.paint(659492, { mat: K.crystal, line: 0 }),
          b.g(pt(0.4, 0.152, 0.4, 0, 72, 12), () => b.box(0, 0, 0, 0.03, 0.085, 0.02)));
        const st = (D, Q, $, ut, N) => {
          const J = fh(bd, vd, ut),
            Z = fh(bd, vd, N);
          (b.paint(J, {
            c2: N >= 1 ? wc : Z,
            glow: 0,
            glow2: N >= 1 ? 0.5 : 0,
            gloss: 0.75,
            mat: K.leather,
            line: 1,
          }),
            b.tube(
              D.map((ot, j) => [ot[0], ot[1], ot[2], bt(Q, $, j / (D.length - 1))]),
              { seg: 6, crease: 30 },
            ));
        };
        (st(
          [
            [0.21, 0.24, -0.06],
            [0.36, 0.36, -0.48],
            [0.45, 0.4, -0.9],
            [0.5, 0.5, -1.2],
          ],
          0.125,
          0.07,
          0,
          0.6,
        ),
          st(
            [
              [0.5, 0.5, -1.2],
              [0.52, 0.7, -1.44],
              [0.5, 0.98, -1.56],
            ],
            0.07,
            0.006,
            0.6,
            1,
          ),
          st(
            [
              [0.5, 0.5, -1.2],
              [0.6, 0.46, -1.48],
              [0.73, 0.38, -1.72],
            ],
            0.062,
            0.006,
            0.6,
            1,
          ),
          st(
            [
              [0.36, -0.06, 0.06],
              [0.58, -0.12, -0.3],
              [0.72, -0.04, -0.66],
            ],
            0.085,
            0.006,
            0.2,
            1,
          ),
          b.paint(Ep, { gloss: 0.7, mat: K.leather, line: 0 }));
        for (let D = 0; D < 5; D++) {
          const Q = 0.5 + D * 0.19,
            $ = bt(0.3, 0.12, D / 4);
          b.g(pt($, -0.1, Q, 180, 0, 8), () => b.crystal(0.035, D === 4 ? 0.24 : 0.13, 4, 0.9, 0.05));
        }
        b.bone(r[H > 0 ? 0 : 1]);
        const tt = [0.36, 0.06, -0.08],
          it = [
            [0.62, 0.46, -0.5],
            [0.86, 0.12, -0.64],
            [0.7, -0.24, -0.5],
          ];
        b.paint(o0, { c2: _c, gloss: 0.5, mat: K.leather });
        for (const D of it) b.limb(tt, D, 0.05, 0.012, { seg: 4 });
        b.paint(g2, {
          c2: Dw,
          glow: 0.03,
          glow2: 0.4,
          mat: K.cloth,
          pattern: En.vein,
          patternScale: 8,
          patternAmt: 0.5,
          by: (D, Q, $, ut) => Math.pow(ut, 4),
        });
        for (let D = 0; D < 2; D++)
          b.sheet(1, 3, (Q, $) => {
            const ut = [
                bt(it[D][0], it[D + 1][0], Q),
                bt(it[D][1], it[D + 1][1], Q),
                bt(it[D][2], it[D + 1][2], Q),
              ],
              N = 1 - 0.2 * Math.sin(Q * Math.PI) * $;
            return [bt(tt[0], ut[0], $ * N), bt(tt[1], ut[1], $ * N), bt(tt[2], ut[2], $ * N)];
          });
        b.bone(n.head);
      }),
      b.paint(bd, { c2: vd, gloss: 0.7, mat: K.leather }),
      b.g(pt(0, 0.33, 0.4, -14, 0, 0), () => b.torus(0.15, 0.035, 0.05, 8, 4, { crease: 30 })),
      b.bone(a).paint(Tp, { c2: wc, glow: 0.4, glow2: 0.7, gloss: 1, mat: K.crystal, line: 0 }),
      b.ball(0, 0.37, 0.4, 0.12, 0.12, 0.12, 1),
      b.bone(o).paint(15400959, { c2: 11832575, glow: 1, mat: K.crystal, line: 0 }),
      b.ball(0, -0.13, 1, 0.2, 0.17, 0.24, 1),
      b.bone(n.jaw).paint(Ca, { c2: Iw, by: (H, st, tt, it, D, Q) => Qn(-0.1, -0.8, Q), ...w }),
      b.tube(
        [
          [0, -0.17, -0.1, 0.3, 0.12],
          [0, -0.22, 0.45, 0.32, 0.12],
          [0, -0.215, 0.92, 0.23, 0.095],
          [0, -0.185, 1.24, 0.15, 0.07],
          [0, -0.165, 1.38, 0.08, 0.05],
        ],
        { seg: 10, up: [1, 0, 0], shape: (H) => 1 - 0.4 * Qn(-0.2, -0.9, Math.sin(H)) },
      ),
      b.paint(zw, { c2: 9067736, glow: 0.1, glow2: 0.3, mat: K.cloth, line: 0 }),
      b.tube(
        [
          [0, -0.165, 0.1, 0.24, 0.03],
          [0, -0.165, 0.9, 0.16, 0.03],
          [0, -0.15, 1.26, 0.07, 0.02],
        ],
        { seg: 4, up: [1, 0, 0] },
      ),
      b.sym(() => {
        b.paint(Ep, { gloss: 0.7, mat: K.leather, line: 0 });
        for (let H = 0; H < 4; H++) {
          const st = 0.58 + H * 0.2,
            tt = bt(0.26, 0.1, H / 3);
          b.g(pt(tt + 0.02, -0.15, st, 0, 0, -8), () => b.crystal(0.03, H === 3 ? 0.17 : 0.09, 4, 0.9, 0.05));
        }
        (b.paint(bd, { c2: vd, gloss: 0.7, mat: K.leather }),
          b.g(pt(0.26, -0.25, 0.02, 140, 0, 24), () => b.crystal(0.06, 0.34, 4, 0.8, 0.1)));
      }));
  }),
    l.forEach((H, st) => {
      const tt = st === 0 ? 1 : -1,
        it = [
          [tt * 0.15, -0.26, 1.1],
          [tt * 0.22, -0.6, 1.04],
          [tt * 0.27, -0.9, 0.82],
          [tt * 0.3, -1.06, 0.46],
        ];
      (b.bind(Di(t, H.js, 0.9, H.tip)).paint(Pw, { c2: Dw, glow: 0, glow2: 0.6, mat: K.leather, line: 1 }),
        b.tube(
          it.map((D, Q) => {
            const $ = s(D[0], D[1], D[2]);
            return [$.x, $.y, $.z, bt(0.034, 0.006, Q / 3)];
          }),
          { seg: 4 },
        ));
    }),
    m.forEach((H, st) => {
      const tt = st === 0 ? 1 : -1,
        it = (j) => [j[0] * tt, j[1], j[2]],
        D = it(c),
        Q = it(f),
        $ = it(d),
        ut = h.map(it),
        N = it(u);
      (b.bone(H.a).paint(Ca, { c2: o0, ...w }),
        b.limb(D, Q, 0.17, 0.11, { seg: 6, bulge: 0.2 }),
        b.bone(H.f),
        b.limb(Q, $, 0.11, 0.08, { seg: 6, bulge: 0.12 }),
        b.paint(Tp, { c2: wc, glow: 0.15, glow2: 0.6, gloss: 0.8, mat: K.crystal, line: 1 }),
        b.limb(Q, [Q[0] + tt * 0.1, Q[1] + 0.3, Q[2] - 0.5], 0.08, 0.008, { seg: 4 }),
        b.bone(H.h).paint(Ep, { c2: 16777215, gloss: 0.8, mat: K.leather }),
        b.limb($, [$[0] + tt * 0.12, $[1] + 0.12, $[2] + 0.5], 0.09, 0.006, { seg: 5 }),
        b.paint(Ca, { ...w }),
        b.ball($[0], $[1], $[2], 0.11, 0.11, 0.11, 1),
        H.fingers.forEach((j, at) => {
          (b.bone(j).paint(Ca, { c2: _c, gloss: 0.5, mat: K.leather }),
            b.limb($, ut[at], 0.06, 0.014, { seg: 5 }));
        }));
      const J = 3.9,
        Z = (j, at, Rt) => {
          (b.bind((kt, V, U, ht) => [j, at, 1 - ht]),
            b.paint(g2, {
              c2: _c,
              glow: 0.03,
              glow2: 0.34,
              mat: K.cloth,
              pattern: En.vein,
              patternScale: 3,
              patternAmt: 0.6,
              by: (kt, V, U) => Qn(0.25, 1, Math.hypot(kt - $[0], V - $[1], U - $[2]) / J),
            }),
            b.sheet(5, 4, (kt, V) => Rt(kt, V)));
        },
        ot = (j, at, Rt) => (kt, V) => {
          const U = [bt(j[0], at[0], V), bt(j[1], at[1], V), bt(j[2], at[2], V)],
            ht = kt * (1 - (0.17 * Math.sin(Math.PI * V) + 0.035 * Math.sin(Math.PI * V * 3)) * kt * kt);
          return [
            bt($[0], U[0], ht),
            bt($[1], U[1], ht) - Rt * Math.sin(Math.PI * V) * kt,
            bt($[2], U[2], ht),
          ];
        };
      (Z(H.fingers[0], H.fingers[1], ot(ut[0], ut[1], 0.14)),
        Z(H.fingers[1], H.fingers[2], ot(ut[1], ut[2], 0.16)),
        Z(H.fingers[2], n.chest, (j, at) => {
          const Rt = [bt($[0], ut[2][0], j), bt($[1], ut[2][1], j), bt($[2], ut[2][2], j)],
            kt = [bt(D[0], N[0], j), bt(D[1] - 0.12, N[1], j), bt(D[2] - 0.2, N[2], j)],
            V = 1 - 0.14 * Math.sin(Math.PI * at) * j * j;
          return [
            bt(Rt[0], kt[0], at),
            bt(Rt[1], kt[1], at) - 0.18 * Math.sin(Math.PI * at) * (0.4 + 0.6 * j),
            bt(Rt[2], kt[2], at) * V + (1 - V) * 0.2,
          ];
        }),
        b.bind((j) => [H.f, H.a, Qn(0.9, 2.3, Math.abs(j))]),
        b.paint(g2, {
          c2: _c,
          glow: 0.02,
          glow2: 0.2,
          mat: K.cloth,
          pattern: En.vein,
          patternScale: 3,
          patternAmt: 0.6,
        }),
        b.sheet(3, 2, (j, at) => {
          const Rt = [
              bt(D[0], $[0], j),
              bt(D[1], $[1], j) + 0.04,
              bt(D[2] + 0.05, $[2], j) - 0.2 * Math.sin(Math.PI * j),
            ],
            kt =
              j < 0.5
                ? [bt(D[0], Q[0], j * 2), bt(D[1], Q[1], j * 2), bt(D[2], Q[2], j * 2)]
                : [bt(Q[0], $[0], j * 2 - 1), bt(Q[1], $[1], j * 2 - 1), bt(Q[2], $[2], j * 2 - 1)];
          return [bt(Rt[0], kt[0], at), bt(Rt[1], kt[1], at), bt(Rt[2], kt[2], at)];
        }));
    }),
    b.bakeGrounding(4.4, 0.72, 0.9));
  const rt = 4.2,
    mt = [8, 18, 30, 38, 40, 34],
    nt = (H, st, tt) => {
      const it = st.time + st.seed * 7,
        D = Math.sin((it * Cw) / 3.2),
        Q = (st.mode & 2) !== 0,
        $ = st.hp < 0.5;
      let ut = 0,
        N = 0,
        J = 0,
        Z = 1,
        ot = 6,
        j = 4 + D * 2,
        at = 0.1 + 0.05 * D,
        Rt = 1 + 0.12 * D + (Q ? 0.35 : 0) + ($ ? 0.25 * Math.sin(it * 9) : 0),
        kt = 0,
        V = !0;
      const U = (O, Y, gt, ft, _t, Dt = 0) => {
        (H.add(n.neck[0], O, Dt * 0.3, 0),
          H.add(n.neck[1], Y, Dt * 0.3, 0),
          H.add(n.neck[2], gt, Dt * 0.25, 0),
          H.add(n.neck[3], ft, Dt * 0.15, 0),
          H.add(n.head, _t, 0, 0));
      };
      switch (
        (H.pos(n.pelvis, 0, -0.12 + D * 0.03, 0),
        H.rot(n.chest, D * 1, 0, 0),
        H.rot(n.neck[0], D * 1.5, Math.sin(it * 0.45) * 7, 0),
        H.rot(n.neck[1], -D * 1.5, Math.sin(it * 0.45 + 0.7) * 8, 0),
        H.rot(n.neck[2], 0, Math.sin(it * 0.45 + 1.4) * 7, 0),
        H.rot(n.neck[3], D, Math.sin(it * 0.45 + 2.1) * 5, 0),
        H.rot(n.head, Math.sin(it * 0.8) * 3, Math.sin(it * 0.45 + 2.6) * 5, 0),
        H.rot(a, 0, it * 30, 0),
        st.anim)
      ) {
        case "dead": {
          const O = st.t,
            Y = Kn(Ct(O, 0, 0.3)) * (1 - Ct(O, 0.6, 0.9)),
            gt = wf(Ct(O, 0.6, 1.5)),
            ft = wf(Ct(O, 1.3, 1.95)),
            _t = st.seed > 0.5 ? 1 : -1;
          ((ut = 0.96 * Y + 0.3 * gt * (1 - Y)),
            (N = 26 * Y - 46 * gt),
            (j = 4 + 40 * Y + 14 * ft),
            (at = Y),
            U(
              -16 * Y + 30 * ft,
              -18 * Y + 36 * ft,
              -6 * Y + 30 * ft,
              -24 * Y + 16 * ft,
              -26 * Y - 10 * ft,
              0,
            ),
            H.add(n.head, 0, 0, _t * -40 * ft),
            H.move(n.pelvis, 0, 0.1 * Y - 0.3 * gt, 0),
            H.rot(n.root, 0, 0, _t * (78 * gt + 3 * Xe(O, 1.62, 0.15))),
            H.pos(n.root, _t * 0.9 * gt, 0.72 * gt, 0),
            n.legs.forEach((Ot, Jt) =>
              Ds(
                n,
                H,
                Jt,
                Ot.rx + Ot.side * 0.1 * gt,
                Ot.ry - 0.1 * gt,
                Ot.rz + (Ot.front ? -0.3 : 0.3) * gt,
                30 * gt,
              ),
            ),
            (V = !1),
            (Z = 1 - 0.5 * gt),
            (ot = 6 * (1 - gt)));
          const Dt = Ct(O, 0.58, 0.72);
          H.scale(a, (1 + 0.8 * Xe(O, 0.6, 0.08)) * (1 - Dt));
          const zt = Ct(O, 2, 3.1);
          for (let Ot = 0; Ot < 6; Ot++)
            H.scale(n.tail[5 - Ot], 1 - 0.999 * Ct(zt, Ot * 0.07, Ot * 0.07 + 0.3));
          ((tt.tint = 0.6 * Ct(O, 1.8, 2.8)),
            (tt.tintColor = 11571455),
            (Rt = (1 + 1.2 * Xe(O, 0.62, 0.14)) * (1 - 0.85 * Ct(O, 0.8, 1.6)) + 0.9 * zt));
          break;
        }
        case "move": {
          const O = st.stride * Cw;
          (U(14, 8, -6, -10, -4, Math.sin(O) * 6),
            (Z = 0.12),
            (ot = 16),
            Im(n, H, st.stride, {
              style: "walk",
              stride: rt,
              lift: 0.4,
              bob: 0.05,
              pitch: 1.5,
              sway: 4,
              roll: 2.5,
              curl: 20,
            }),
            (V = !1));
          break;
        }
        case "attack": {
          const O = Qo(st.p, st.windup),
            Y = Kn(Ct(O, 0, 0.27)),
            gt = Ct(O, 0.27, 0.36),
            ft = Gn(Ct(O, 0.5, 1)),
            _t = Y * (1 - gt),
            Dt = gt * (1 - ft);
          if (st.mode & 1) {
            const zt = 34 * _t - 128 * Dt;
            (H.rot(n.root, 0, zt, 0),
              H.move(n.pelvis, 0, -0.1 * (_t + Dt), 0),
              (Z = 1 - 0.9 * Math.max(_t, Dt)));
            for (let Jt = 0; Jt < 6; Jt++) H.add(n.tail[Jt], 0, 16 * _t - 22 * Dt * (1 - Jt * 0.1), 0);
            (U(10 * Dt, 6 * Dt, 0, 0, 0, 40 * Dt - 20 * _t), (ut = 0.45 * Dt), (N = 10 * Dt), (ot = 0));
            const Ot = Math.max(_t, Dt);
            (n.legs.forEach((Jt, ue) =>
              Ds(n, H, ue, Jt.rx, Jt.ry + 0.28 * Ot * Math.max(0, Math.sin(O * 40 + ue * 1.6)), Jt.rz, 0),
            ),
              (V = !1),
              (Rt += 0.3 * _t + 0.8 * Xe(O, 0.38, 0.16)));
          } else
            (U(
              -22 * _t + 34 * Dt,
              -26 * _t + 40 * Dt,
              22 * _t + 16 * Dt,
              20 * _t - 30 * Dt,
              12 * _t - 22 * Dt,
              0,
            ),
              H.move(n.pelvis, 0, 0.08 * _t - 0.14 * Dt, -0.3 * _t + 0.55 * Dt),
              H.add(n.pelvis, -4 * _t + 6 * Dt, 0, 0),
              (j = 4 + 34 * _t + 30 * gt * (1 - Ct(O, 0.36, 0.41))),
              (at = _t + 0.4 * Dt),
              (ut = 0.3 * _t + 0.14 * Dt),
              (N = 14 * _t - 6 * Dt),
              (Rt += 0.3 * _t + 0.8 * Xe(O, 0.36, 0.14)));
          break;
        }
        case "cast_s1": {
          const O = Ct(st.p, 0, Nw),
            Y = Kn(Math.min(1, O * 1.6)),
            gt = Ct(st.p, Nw, 1),
            ft = Kn(Ct(gt, 0, 0.18)),
            _t = Y * (1 - ft),
            Dt = ft * bt(11, -11, Gn(gt));
          (U(
            -20 * _t + 14 * ft,
            -24 * _t + 20 * ft,
            -8 * _t + 8 * ft,
            26 * _t - 20 * ft,
            18 * _t - 12 * ft,
            Dt * 2.4,
          ),
            H.move(n.pelvis, 0, -0.16 * Y + 0.06 * ft, 0.12 * _t - 0.32 * ft * (1 - 0.4 * gt)),
            H.add(n.pelvis, -5 * _t + 4 * ft, 0, 0),
            (ut = Y),
            (N = 28 * _t - 8 * ft + 4 * Math.sin(gt * 30) * ft),
            (J = -24 * ft * (1 - gt * 0.5)),
            (j = 4 + 14 * O * (1 - ft) + 40 * ft),
            (at = Y),
            (Z = 1 - 0.75 * Y),
            (kt = O * O * (1 - ft) + 0.55 * ft * (1 - Ct(gt, 0.85, 1))),
            (Rt += 0.3 * O + 0.6 * O * O + 0.5 * ft));
          break;
        }
        case "stunned": {
          (U(26, 30, 16, 6, 10, Math.sin(it * 2.4) * 16),
            H.add(n.head, 0, 0, Math.sin(it * 2.4 + 1) * 14),
            (N = -14),
            (ut = 0.12),
            (j = 14),
            (Rt *= 0.7));
          break;
        }
        default:
          if (st.spawnT >= 0) {
            const O = st.spawnT,
              Y = Kn(Ct(O, 0.9, 1.4)),
              gt = Gn(Ct(O, 1.3, 1.9)),
              ft = Kn(Ct(O, 1.6, 1.95)) * (1 - Gn(Ct(O, 2.15, 2.4)));
            (H.pos(n.root, 0, -4.6 + 2.4 * Y + 2.2 * gt, 0),
              H.add(n.pelvis, -22 * Y * (1 - gt), 0, 0),
              U(
                -10 * (1 - gt) - 12 * ft,
                -12 * (1 - gt) - 16 * ft,
                -8 * ft,
                -16 * ft,
                -14 * (1 - Y) - 22 * ft,
                0,
              ),
              (ut = ft),
              (N = 24 * ft),
              (j = 4 + 40 * ft),
              (at = ft),
              (Z = 0.3 + 0.7 * Gn(Ct(O, 1.9, 2.4))),
              (Rt += 0.4 * Y * (1 - gt) + 0.7 * ft));
          } else if (Q)
            ((ut = 0.6),
              (N = 8 + 3 * Math.sin(it * 3)),
              H.move(n.pelvis, 0, -0.12, 0),
              U(10, 12, 0, -6, 4, 0),
              (j = 10 + 4 * Math.sin(it * 5)),
              (at = 0.8),
              (Z = 0.7));
          else {
            const O = (it / 10.5) % 1,
              Y = Gn(Ct(O, 0.7, 0.76)) * (1 - Gn(Ct(O, 0.9, 0.97)));
            (U(-8 * Y, -10 * Y, -4 * Y, -12 * Y, -14 * Y, 0),
              (ut = 0.45 * Y + 0.012 * (1 + Math.sin(it * 7))),
              (N = 10 * Y),
              (j = 4 + D * 2 + 26 * Y),
              (at = 0.1 + 0.7 * Y),
              (Rt += 0.5 * Y));
            const gt = Xe((it / 4) % 1, 0.5, 0.07);
            (H.add(n.tail[4], -22 * gt, 0, 0), H.add(n.tail[5], -30 * gt, 0, 0));
          }
      }
      const ht = Jo(st.hitT);
      if (ht > 0 && st.anim !== "dead") {
        const O = st.seed > 0.5 ? 1 : -1;
        (H.add(n.neck[2], 4 * ht, O * 14 * ht, 0),
          H.add(n.head, 6 * ht, O * 12 * ht, O * 16 * ht),
          (N += 9 * ht),
          (ut += 0.06 * ht));
      }
      for (let O = 0; O < 6; O++)
        H.add(
          n.tail[O],
          Math.sin(it * 0.9 - O * 0.6) * 2,
          mt[O] * Z + Math.sin(it * 0.8 - O * 0.7) * ot * (0.4 + O * 0.2),
          0,
        );
      const lt = 1 - Math.min(1, Math.max(0, ut));
      (m.forEach((O, Y) => {
        const gt = Y === 0 ? 1 : -1,
          ft = [O.a, O.f, O.h, O.fingers[0], O.fingers[1], O.fingers[2]];
        for (let _t = 0; _t < 6; _t++) {
          const Dt = S[_t],
            zt = Dt[3] * lt * 0.5,
            Ot = Math.sin(zt),
            Jt = ft[_t] * 4;
          ((H.q[Jt] = Dt[0] * Ot),
            (H.q[Jt + 1] = Dt[1] * Ot * gt),
            (H.q[Jt + 2] = Dt[2] * Ot * gt),
            (H.q[Jt + 3] = Math.cos(zt)));
        }
        (H.pre(O.a, 0, gt * J, gt * N), H.add(O.f, 0, 0, gt * N * 0.3));
      }),
        H.rot(n.jaw, j, 0, 0),
        r.forEach((O, Y) => {
          const gt = Y === 0 ? 1 : -1;
          (H.rot(O, 0, gt * (34 - 44 * at), gt * (-8 + 14 * at)), H.scale(O, 0.8 + 0.3 * at));
        }),
        H.scale(o, Math.max(0.001, kt)),
        (tt.glow = Math.max(0.05, Rt)),
        V && _a(n, H));
    };
  return {
    key: "monster:abyss_drake",
    geometry: b.build(),
    rig: t,
    height: 4.9,
    radius: 2.6,
    scale: 1,
    stride: rt,
    triangles: b.triangleCount,
    deathDur: 3.2,
    spawnDur: 2.4,
    outline: 1.8,
    attach: {
      chest: { joint: n.chest, x: 0, y: 0.1, z: 0.3 },
      head: { joint: n.head, x: 0, y: 0.35, z: 0.3 },
      muzzle: { joint: o, x: 0, y: 0, z: 0.45 },
      weapon: { joint: o, x: 0, y: 0, z: 0.45 },
      vent: { joint: o, x: 0, y: 0, z: 0.3 },
      crest: { joint: a, x: 0, y: 0, z: 0 },
      tail: { joint: n.tail[5], x: 0, y: 0, z: -0.8 },
      wingL: { joint: m[0].fingers[0], x: h[0][0] - d[0], y: h[0][1] - d[1], z: h[0][2] - d[2] },
      wingR: { joint: m[1].fingers[0], x: -(h[0][0] - d[0]), y: h[0][1] - d[1], z: h[0][2] - d[2] },
    },
    blend: (H, st) => (st === "attack" ? 0.12 : st === "cast_s1" ? 0.18 : 0.3),
    animate: nt,
  };
}

const Fw = Math.PI * 2,
  Uw = 2054758,
  y2 = 7334104,
  dO = 16767088,
  hO = 16747098,
  v2 = 15261896,
  Ow = 6969978,
  uO = 13172720,
  Bw = 1714746;
export { QU, JU, lO, fO, Fw, Uw, y2, dO, hO, v2, Ow, uO, Bw };
