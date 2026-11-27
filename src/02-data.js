// 02-data.js — data｜11 个顶层语句｜43KB
// 对应 game.pretty.js 第 1374–2682 行
// 关键内容：
//   Ey                    英雄普攻
//   Br                    位移
//   ea                    回城
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { At, CS, El, Fc, Hc, It, Od, Si, Ti, Tl, c5, ga, i1, th } from './01-audio.js';

const Ey = [76, 79, 81, 83, 86, 83, 81, 79].map(It),
  Qm = It(88),
  Ay = It(95),
  FS = {
    atk_panyue_swing: At(
      "英雄普攻",
      "樊哙·挥剑带盾",
      (n) => {
        (Ti(n, 0, 0.22, 0.4, 260, 1300, 500, 1.3, "pink"),
          n.noise({ k: "brown", flt: "lowpass", fc: 260, a: 0.08, d: 0.14, g: 0.5 }),
          n.ring(1100, [1, 2.76], { t: 0.06, a: 0.001, d: 0.04, g: 0.05 }));
      },
      { loud: -27, len: 0.4, gap: 0.12, rev: 0.06 },
    ),
    atk_panyue_hit: At(
      "英雄普攻",
      "樊哙·剑盾命中",
      (n) => {
        const t = n.drive(2.5);
        (n.osc({ f: 118, f1: 40, ft: 0.1, a: 0.002, d: 0.28, g: 0.55, to: t }),
          n.osc({ w: "triangle", f: 260, f1: 120, ft: 0.06, a: 0.001, d: 0.12, g: 0.5, to: t }),
          n.noise({ flt: "highpass", fc: 2800, a: 0.001, d: 0.012, g: 0.3 }),
          n.noise({ flt: "bandpass", fc: 1300, q: 0.8, a: 0.001, d: 0.08, g: 0.6, to: t }),
          n.noise({ k: "pink", flt: "bandpass", fc: 520, q: 1.4, a: 0.001, d: 0.05, g: 0.7 }),
          n.ring(620, [1, 1.52, 2.27], { a: 0.002, d: 0.24, g: 0.3 }));
      },
      { loud: -16, len: 0.55, gap: 0.08, rev: 0.14 },
    ),
    atk_chijin_swing: At(
      "英雄普攻",
      "牛伟·抡斧",
      (n) => {
        (Ti(n, 0, 0.24, 0.5, 300, 1500, 480, 1.2), n.osc({ f: 92, f1: 70, a: 0.06, d: 0.14, g: 0.2 }));
      },
      { loud: -27, len: 0.35, gap: 0.1, rev: 0.06 },
    ),
    atk_chijin_hit: At(
      "英雄普攻",
      "牛伟·斧劈命中",
      (n) => {
        const t = n.drive(2);
        (n.osc({ w: "triangle", f: 170, f1: 60, a: 0.002, d: 0.14, g: 0.4, to: t }),
          n.noise({ flt: "bandpass", fc: 1800, q: 0.9, a: 0.001, d: 0.05, g: 0.6, to: t }),
          Hc(n, 430, 0, 0.9, 0.22),
          n.noise({ flt: "highpass", fc: 4500, a: 0.001, d: 0.01, g: 0.3 }),
          n.noise({ k: "pink", flt: "bandpass", fc: 1e3, fc1: 450, q: 0.8, a: 0.01, d: 0.14, g: 0.25 }));
      },
      { loud: -17, len: 0.45, gap: 0.07 },
    ),
    atk_xingli_charge: At(
      "英雄普攻",
      "王昭君·按弦",
      (n) => {
        (n.noise({ flt: "bandpass", fc: 2600, fc1: 3800, q: 3, a: 0.04, d: 0.08, g: 0.3 }),
          n.osc({ w: "string", f: Qm, a: 0.03, d: 0.1, g: 0.2 }));
      },
      { loud: -30, len: 0.3, gap: 0.12, jitter: 0 },
    ),
    atk_xingli_launch: At(
      "英雄普攻",
      "王昭君·扫弦出手",
      (n, t) => {
        const e = Ey[Math.max(0, Math.round(t)) % Ey.length];
        (Si(n, e, 0, 0.28, 1),
          n.noise({ flt: "bandpass", fc: 2200, fc1: 4200, q: 2, a: 0.01, d: 0.1, g: 0.18 }),
          n.osc({ f: 300, f1: 170, a: 0.002, d: 0.06, g: 0.2 }));
      },
      {
        loud: -21,
        len: 0.4,
        gap: 0.07,
        rev: 0.18,
        jitter: 0,
        variants: [
          { label: "乐句第 1 音", v: 0 },
          { label: "乐句第 5 音", v: 4 },
        ],
      },
    ),
    atk_xingli_hit: At(
      "英雄普攻",
      "王昭君·音波命中",
      (n) => {
        (n.osc({ w: "string", f: Qm, a: 0.001, d: 0.3, g: 0.8 }),
          n.osc({ f: Ay, t: 0.01, a: 0.001, d: 0.22, g: 0.14 }),
          n.noise({ flt: "bandpass", fc: 4200, q: 1, a: 0.001, d: 0.05, g: 0.4 }),
          n.osc({ f: 240, f1: 130, a: 0.002, d: 0.08, g: 0.3 }));
      },
      { loud: -18, len: 0.5, gap: 0.07, rev: 0.22, jitter: 0 },
    ),
    atk_fengling_draw: At(
      "英雄普攻",
      "李广·引弓",
      (n) => {
        c5(n, 0, 0.14, 0.6);
      },
      { loud: -31, len: 0.3, gap: 0.12, rev: 0.05 },
    ),
    atk_fengling_launch: At(
      "英雄普攻",
      "李广·放箭",
      (n) => {
        (Od(n, 196, 0, 0.2, 1),
          El(n, 0.008, 0.16, 0.5, 3600, 2e3),
          n.noise({ flt: "highpass", fc: 2500, a: 0.001, d: 0.008, g: 0.3 }));
      },
      { loud: -20, len: 0.4, gap: 0.07, rev: 0.1 },
    ),
    atk_fengling_hit: At(
      "英雄普攻",
      "李广·箭矢命中",
      (n) => {
        const t = n.drive(2);
        (th(n, 0, 1.1, 1, t),
          n.noise({ k: "pink", flt: "lowpass", fc: 700, a: 0.003, d: 0.07, g: 0.3, to: t }),
          n.osc({ w: "triangle", f: 188, a: 0.004, d: 0.14, g: 0.16, vib: 90, vr: 38, vd: 0 }));
      },
      { loud: -18, len: 0.3, gap: 0.07 },
    ),
    atk_yeque_swing: At(
      "英雄普攻",
      "荆轲·匕首划刺",
      (n) => {
        (n.noise({ flt: "bandpass", fc: 1500, fc1: 4200, fct: 0.05, q: 4, a: 0.015, d: 0.045, g: 0.8 }),
          n.noise({
            flt: "bandpass",
            fc: 1800,
            fc1: 4800,
            fct: 0.05,
            q: 4,
            t: 0.07,
            a: 0.015,
            d: 0.045,
            g: 0.65,
          }),
          n.noise({ k: "pink", flt: "bandpass", fc: 500, q: 1.5, a: 0.02, d: 0.1, g: 0.12 }));
      },
      { loud: -27, len: 0.3, gap: 0.1, rev: 0.06 },
    ),
    atk_yeque_hit: At(
      "英雄普攻",
      "荆轲·匕首命中",
      (n) => {
        const t = n.drive(2);
        (n.noise({ flt: "highpass", fc: 3600, a: 0.001, d: 0.02, g: 0.5 }),
          n.ring(3100, Tl, { a: 0.001, d: 0.15, g: 0.14 }),
          n.osc({ w: "triangle", f: 280, f1: 100, a: 0.001, d: 0.065, g: 0.4, to: t }),
          n.noise({ flt: "bandpass", fc: 3200, q: 2, a: 0.001, d: 0.04, g: 0.4, to: t }),
          n.noise({ k: "pink", flt: "bandpass", fc: 700, q: 1, a: 0.008, d: 0.12, g: 0.18 }));
      },
      { loud: -17, len: 0.35, gap: 0.06 },
    ),
    minion_swing: At(
      "小兵与野怪",
      "小兵·挥击",
      (n) => {
        n.noise({ flt: "bandpass", fc: 900, fc1: 2200, q: 2, a: 0.03, d: 0.06, g: 0.5 });
      },
      { loud: -34, len: 0.2, gap: 0.16, poly: 2, prio: 0, rev: 0.04, jitter: 0.08 },
    ),
    minion_melee_hit: At(
      "小兵与野怪",
      "近战兵·命中",
      (n) => {
        (n.ring(880, [1, 2.4, 3.9], { a: 0.001, d: 0.07, g: 0.14 }),
          n.noise({ flt: "bandpass", fc: 2200, q: 1.2, a: 0.001, d: 0.03, g: 0.4 }),
          n.osc({ f: 180, f1: 105, a: 0.001, d: 0.055, g: 0.4 }));
      },
      { loud: -26, len: 0.2, gap: 0.11, poly: 3, prio: 0, jitter: 0.1, rev: 0.06 },
    ),
    minion_ranged_launch: At(
      "小兵与野怪",
      "远程兵·能量弹出手",
      (n) => {
        (n.osc({ f: 1150, f1: 500, a: 0.002, d: 0.09, g: 0.4 }),
          n.osc({ w: "triangle", f: 2300, f1: 1e3, a: 0.002, d: 0.06, g: 0.12 }),
          n.noise({ flt: "highpass", fc: 5e3, a: 0.001, d: 0.02, g: 0.1 }));
      },
      { loud: -29, len: 0.2, gap: 0.12, poly: 2, prio: 0, jitter: 0.08, rev: 0.08 },
    ),
    minion_ranged_hit: At(
      "小兵与野怪",
      "远程兵·能量弹命中",
      (n) => {
        (n.noise({ flt: "bandpass", fc: 3e3, q: 2, a: 0.001, d: 0.04, g: 0.5 }),
          n.osc({ f: 520, f1: 300, a: 0.001, d: 0.05, g: 0.3 }));
      },
      { loud: -28, len: 0.2, gap: 0.11, poly: 2, prio: 0, jitter: 0.1, rev: 0.08 },
    ),
    minion_siege_launch: At(
      "小兵与野怪",
      "攻城兵·开炮",
      (n) => {
        (n.osc({ f: 165, f1: 50, a: 0.002, d: 0.22, g: 0.7 }),
          n.osc({ w: "triangle", f: 330, f1: 110, a: 0.001, d: 0.1, g: 0.4 }),
          n.noise({ k: "pink", flt: "bandpass", fc: 600, q: 0.7, a: 0.002, d: 0.13, g: 0.5 }),
          n.noise({ flt: "highpass", fc: 2e3, a: 0.001, d: 0.03, g: 0.25 }));
      },
      { loud: -22, len: 0.4, gap: 0.15, poly: 2, rev: 0.12 },
    ),
    minion_siege_hit: At(
      "小兵与野怪",
      "攻城兵·炮弹爆炸",
      (n) => {
        (n.noise({ k: "pink", flt: "lowpass", fc: 2200, fc1: 300, a: 0.002, d: 0.32, g: 0.8 }),
          n.osc({ f: 92, f1: 40, a: 0.002, d: 0.26, g: 0.6 }),
          n.noise({ flt: "bandpass", fc: 1800, q: 0.7, a: 0.001, d: 0.05, g: 0.6 }));
      },
      { loud: -20, len: 0.5, gap: 0.15, poly: 2, rev: 0.16 },
    ),
    super_hit: At(
      "小兵与野怪",
      "超级兵·重击",
      (n) => {
        (n.ring(520, i1, { a: 0.001, d: 0.16, g: 0.14 }),
          n.noise({ flt: "bandpass", fc: 1600, q: 1, a: 0.001, d: 0.05, g: 0.5 }),
          n.osc({ f: 140, f1: 60, a: 0.001, d: 0.14, g: 0.8 }));
      },
      { loud: -21, len: 0.35, gap: 0.12, poly: 2, jitter: 0.06 },
    ),
    monster_swing: At(
      "小兵与野怪",
      "野怪·出手",
      (n, t) => {
        t < 0.5
          ? n.sub(0.41, (e) => {
              (Fc(e, 0, 0.16, 0.6, 150, 105, 500, 1300),
                e.noise({ flt: "bandpass", fc: 900, fc1: 2400, q: 2, t: 0.03, a: 0.03, d: 0.07, g: 0.5 }));
            })
          : t < 1.5
            ? n.sub(1, (e) => {
                (Ti(e, 0, 0.2, 0.4, 500, 2200, 900, 1.2),
                  e.noise({ k: "pink", flt: "bandpass", fc: 420, q: 1.5, a: 0.02, d: 0.09, g: 0.5 }),
                  e.ring(3300, ga, { t: 0.05, a: 0.001, d: 0.12, g: 0.06 }));
              })
            : t < 2.5
              ? n.sub(0.52, (e) => {
                  (Fc(e, 0, 0.24, 0.7, 92, 66, 380, 1e3), Ti(e, 0.02, 0.2, 0.3, 200, 900, 400, 1, "pink"));
                })
              : t < 3.5
                ? n.sub(0.36, (e) => {
                    (e.noise({ flt: "bandpass", fc: 1200, fc1: 3200, q: 2.5, a: 0.1, d: 0.1, g: 0.7 }),
                      Fc(e, 0, 0.26, 0.6, 70, 52, 300, 800));
                  })
                : n.sub(0.77, (e) => {
                    (Ti(e, 0, 0.3, 0.5, 110, 520, 200, 0.9, "brown"),
                      e.osc({
                        w: "softsaw",
                        f: 55,
                        f1: 82,
                        a: 0.12,
                        d: 0.16,
                        g: 0.3,
                        to: e.filt("lowpass", 300, 1),
                      }),
                      e.ring(310, i1, { t: 0.02, a: 0.02, d: 0.2, g: 0.06 }));
                  });
      },
      {
        loud: -27,
        len: 0.4,
        gap: 0.14,
        poly: 2,
        jitter: 0.08,
        variants: [
          { label: "苔背獾", v: 0 },
          { label: "霜晶巨鹿", v: 1 },
          { label: "炽焰巨熊", v: 2 },
          { label: "河道巨龙", v: 3 },
          { label: "星陨巨灵", v: 4 },
        ],
      },
    ),
    monster_hit: At(
      "小兵与野怪",
      "野怪·命中",
      (n, t) => {
        t < 0.5
          ? n.sub(0.7, (e) => {
              (e.noise({ flt: "bandpass", fc: 1600, q: 1, a: 0.001, d: 0.06, g: 0.6 }),
                e.noise({ flt: "bandpass", fc: 2600, q: 2, t: 0.02, a: 0.001, d: 0.04, g: 0.4 }),
                e.osc({ f: 145, f1: 60, a: 0.002, d: 0.12, g: 0.5 }));
            })
          : t < 1.5
            ? n.sub(1, (e) => {
                (e.osc({ f: 150, f1: 60, a: 0.002, d: 0.14, g: 0.45 }),
                  e.noise({ flt: "bandpass", fc: 2400, q: 1.2, a: 0.001, d: 0.04, g: 0.6 }),
                  e.scatter(4, 0.01, 0.14, (s) =>
                    e.ring(e.rr(2600, 5200), ga, { t: s, a: 0.001, d: e.rr(0.05, 0.12), g: 0.07 }),
                  ));
              })
            : n.sub(0.44, (e) => {
                const s = e.drive(2);
                (e.osc({ f: 120, f1: 44, a: 0.002, d: 0.2, g: 0.55, to: s }),
                  e.noise({
                    k: "pink",
                    flt: "lowpass",
                    fc: 1500,
                    fc1: 300,
                    a: 0.002,
                    d: 0.14,
                    g: 0.6,
                    to: s,
                  }),
                  e.noise({ flt: "bandpass", fc: 1400, q: 0.8, a: 0.001, d: 0.06, g: 0.7 }),
                  e.scatter(4, 0.02, 0.16, (i) =>
                    e.noise({ flt: "highpass", fc: e.rr(3e3, 6e3), t: i, a: 0.001, d: 0.012, g: 0.2 }),
                  ));
              });
      },
      {
        loud: -21,
        len: 0.35,
        gap: 0.1,
        poly: 2,
        jitter: 0.08,
        variants: [
          { label: "苔背獾", v: 0 },
          { label: "霜晶巨鹿", v: 1 },
          { label: "炽焰巨熊", v: 2 },
        ],
      },
    ),
    monster_spit_launch: At(
      "小兵与野怪",
      "荧翅蛾·抖出磷粉",
      (n) => {
        const t = n.gain(0.6);
        (n.lfo(t.gain, 28, 0.4, 0, 0.2),
          n.noise({ flt: "bandpass", fc: 700, fc1: 1500, q: 1.5, a: 0.02, d: 0.12, g: 0.8, to: t }),
          n.noise({ flt: "bandpass", fc: 2600, fc1: 4200, q: 2, t: 0.03, a: 0.01, d: 0.06, g: 0.35 }),
          n.osc({ f: 1700, f1: 2300, t: 0.03, a: 0.005, d: 0.07, g: 0.06 }));
      },
      { loud: -26, len: 0.25, gap: 0.12, poly: 2, jitter: 0.08 },
    ),
    monster_spit_hit: At(
      "小兵与野怪",
      "荧翅蛾·磷粉命中",
      (n) => {
        (n.noise({ k: "pink", flt: "lowpass", fc: 2600, fc1: 500, a: 0.001, d: 0.11, g: 0.7 }),
          n.osc({ f: 300, f1: 130, a: 0.001, d: 0.07, g: 0.35 }),
          n.osc({ f: 2400, t: 0.01, a: 0.001, d: 0.05, g: 0.06 }),
          n.osc({ f: 3200, t: 0.04, a: 0.001, d: 0.05, g: 0.05 }));
      },
      { loud: -24, len: 0.25, gap: 0.1, poly: 2, jitter: 0.08 },
    ),
    epic_hit: At(
      "小兵与野怪",
      "史诗野怪·重击",
      (n, t) => {
        t < 0.5
          ? n.sub(1, (e) => {
              const s = e.drive(2.5, e.gain(0.55));
              (e.osc({ f: 80, f1: 30, a: 0.003, d: 0.5, g: 0.8, to: s }),
                e.osc({ w: "triangle", f: 230, f1: 70, a: 0.002, d: 0.18, g: 0.5, to: s }),
                e.noise({ flt: "bandpass", fc: 2200, q: 1.2, a: 0.001, d: 0.03, g: 0.9 }),
                e.noise({ k: "pink", flt: "bandpass", fc: 900, q: 0.8, a: 0.002, d: 0.14, g: 1 }),
                e.noise({ k: "pink", flt: "lowpass", fc: 1500, fc1: 220, a: 0.003, d: 0.36, g: 0.6, to: s }),
                e.noise({ flt: "bandpass", fc: 3e3, fc1: 1500, q: 0.9, t: 0.03, a: 0.02, d: 0.3, g: 0.35 }));
            })
          : n.sub(0.85, (e) => {
              const s = e.drive(2.5, e.gain(0.55));
              (e.osc({ f: 66, f1: 26, a: 0.003, d: 0.6, g: 0.8, to: s }),
                e.osc({ w: "triangle", f: 200, f1: 60, a: 0.002, d: 0.22, g: 0.5, to: s }),
                e.noise({ k: "pink", flt: "lowpass", fc: 1300, fc1: 180, a: 0.003, d: 0.45, g: 0.7, to: s }),
                e.noise({ flt: "bandpass", fc: 1200, q: 0.7, a: 0.001, d: 0.07, g: 0.8 }),
                e.noise({ k: "pink", flt: "bandpass", fc: 700, q: 0.8, a: 0.002, d: 0.16, g: 1 }),
                e.ring(330, i1, { a: 0.002, d: 0.4, g: 0.25 }),
                e.scatter(4, 0.06, 0.3, (i) =>
                  e.noise({
                    flt: "bandpass",
                    fc: e.rr(350, 1100),
                    q: 2,
                    t: i,
                    a: 0.001,
                    d: e.rr(0.04, 0.09),
                    g: e.rr(0.2, 0.35),
                  }),
                ));
            });
      },
      {
        loud: -15,
        len: 0.8,
        gap: 0.15,
        poly: 2,
        rev: 0.22,
        variants: [
          { label: "河道巨龙", v: 0 },
          { label: "星陨巨灵", v: 1 },
        ],
      },
    ),
    monster_spawn: At(
      "小兵与野怪",
      "野怪·刷新",
      (n, t) => {
        t < 0.5
          ? n.sub(0.89, (e) => {
              (e.scatter(5, 0, 0.4, (s) =>
                e.noise({
                  k: "pink",
                  flt: "bandpass",
                  fc: e.rr(500, 1300),
                  q: 1.5,
                  t: s,
                  a: 0.004,
                  d: e.rr(0.04, 0.08),
                  g: e.rr(0.3, 0.6),
                }),
              ),
                [0.5, 0.66].forEach((s) =>
                  e.noise({ flt: "bandpass", fc: 1700, q: 3, t: s, a: 0.02, d: 0.05, g: 0.3 }),
                ),
                Fc(e, 0.78, 0.18, 0.4, 170, 120, 500, 1200));
            })
          : t < 1.5
            ? n.sub(1, (e) => {
                (e.scatter(8, 0, 0.5, (i) =>
                  e.ring(e.rr(2400, 5600), ga, { t: i, a: 0.001, d: e.rr(0.05, 0.14), g: 0.06 }),
                ),
                  e.noise({ flt: "highpass", fc: 5e3, a: 0.3, d: 0.4, g: 0.05 }));
                const s = e.filt("bandpass", 900, 2.5);
                (e.osc({
                  w: "reed",
                  f: 233,
                  f1: 349,
                  ft: 0.35,
                  t: 0.5,
                  a: 0.1,
                  h: 0.3,
                  d: 0.35,
                  g: 0.5,
                  vib: 25,
                  vr: 6,
                  vd: 0.2,
                  to: s,
                }),
                  e.osc({
                    w: "softsaw",
                    f: 233,
                    f1: 349,
                    ft: 0.35,
                    t: 0.5,
                    a: 0.12,
                    h: 0.28,
                    d: 0.3,
                    g: 0.2,
                    to: s,
                  }));
              })
            : t < 2.5
              ? n.sub(0.55, (e) => {
                  (e.scatter(6, 0, 0.45, (s) =>
                    e.noise({
                      flt: "bandpass",
                      fc: e.rr(300, 1e3),
                      q: 2,
                      t: s,
                      a: 0.001,
                      d: e.rr(0.05, 0.1),
                      g: e.rr(0.3, 0.5),
                    }),
                  ),
                    e.noise({ k: "brown", flt: "lowpass", fc: 260, a: 0.2, d: 0.4, g: 0.6 }),
                    Fc(e, 0.5, 0.6, 0.9, 105, 70, 350, 1300));
                })
              : n.sub(0.64, (e) => {
                  const s = e.gain(0.6);
                  (e.lfo(s.gain, 9, 0.4, 0, 0.9, 14),
                    e.noise({ flt: "bandpass", fc: 900, fc1: 1600, q: 1.5, a: 0.5, d: 0.3, g: 0.7, to: s }),
                    [0.3, 0.5, 0.66].forEach((i, a) =>
                      e.osc({ f: 2100 + a * 350, t: i, a: 0.004, d: 0.1, g: 0.05 }),
                    ));
                });
      },
      {
        loud: -25,
        len: 1.2,
        gap: 0.3,
        poly: 2,
        prio: 0,
        jitter: 0.04,
        rev: 0.2,
        range: 22,
        variants: [
          { label: "苔背獾", v: 0 },
          { label: "霜晶巨鹿", v: 1 },
          { label: "炽焰巨熊", v: 2 },
          { label: "荧翅蛾", v: 5 },
        ],
      },
    ),
    tower_charge: At(
      "防御塔",
      "防御塔·核心蓄光",
      (n) => {
        const t = n.filt("lowpass", 900, 1);
        (n.osc({ w: "softsaw", f: 110, f1: 220, a: 0.24, d: 0.08, g: 0.5, to: t }),
          n.osc({ f: 660, f1: 990, a: 0.24, d: 0.06, g: 0.15 }),
          n.noise({ flt: "bandpass", fc: 1500, fc1: 4e3, q: 3, a: 0.24, d: 0.05, g: 0.1 }));
      },
      { loud: -29, len: 0.4, gap: 0.2, poly: 2, rev: 0.1 },
    ),
    tower_launch: At(
      "防御塔",
      "防御塔·光弹出膛",
      (n) => {
        (n.fm({ f: 520, f1: 180, ft: 0.25, ratio: 1.5, idx: 4, idx1: 0.5, a: 0.002, d: 0.3, g: 0.6 }),
          n.noise({ flt: "bandpass", fc: 1200, fc1: 400, q: 1.2, a: 0.002, d: 0.2, g: 0.4 }),
          n.osc({ f: 82, a: 0.002, d: 0.16, g: 0.5 }),
          n.ring(1760, ga, { a: 0.002, d: 0.26, g: 0.06 }));
      },
      { loud: -20, len: 0.5, gap: 0.12, poly: 3, rev: 0.18 },
    ),
    tower_hit: At(
      "防御塔",
      "防御塔·光弹命中",
      (n) => {
        (n.noise({ k: "pink", flt: "lowpass", fc: 3e3, fc1: 300, a: 0.001, d: 0.2, g: 0.8 }),
          n.osc({ f: 150, f1: 50, a: 0.002, d: 0.2, g: 0.5 }),
          n.fm({ f: 660, f1: 220, ratio: 1.5, idx: 3, idx1: 0.3, a: 0.002, d: 0.14, g: 0.3 }),
          n.ring(880, ga, { a: 0.001, d: 0.2, g: 0.16 }),
          n.noise({ flt: "highpass", fc: 3500, a: 0.001, d: 0.012, g: 0.4 }));
      },
      { loud: -19, len: 0.45, gap: 0.1, poly: 3, group: "towerhit", rev: 0.18 },
    ),
    tower_hit_player: At(
      "防御塔",
      "防御塔·命中玩家(加重)",
      (n) => {
        const t = n.drive(3);
        (n.osc({ f: 64, f1: 30, a: 0.003, d: 0.42, g: 0.8, to: t }),
          n.noise({ k: "pink", flt: "lowpass", fc: 3200, fc1: 250, a: 0.001, d: 0.26, g: 0.9, to: t }),
          n.osc({ w: "triangle", f: 200, f1: 60, a: 0.002, d: 0.2, g: 0.5 }),
          n.fm({ f: 660, f1: 180, ratio: 1.5, idx: 4, idx1: 0.3, a: 0.002, d: 0.2, g: 0.4 }),
          n.ring(880, ga, { a: 0.001, d: 0.3, g: 0.16 }));
        const e = n.filt("lowpass", 1800, 1);
        (n.osc({ w: "softsq", f: 740, a: 0.003, d: 0.14, g: 0.22, to: e }),
          n.osc({ w: "softsq", f: 698, a: 0.003, d: 0.16, g: 0.22, to: e }));
      },
      { loud: -14, len: 0.7, gap: 0.12, poly: 2, prio: 3, group: "towerhit", rev: 0.2 },
    ),
    fx_hit_physical: At(
      "通用命中",
      "物理命中火花",
      (n) => {
        (n.noise({ flt: "highpass", fc: 3500, a: 0.001, d: 0.03, g: 0.5 }),
          n.ring(2600, [1, 1.5], { a: 0.001, d: 0.05, g: 0.07 }),
          n.osc({ f: 220, f1: 120, a: 0.001, d: 0.04, g: 0.35 }));
      },
      { loud: -27, len: 0.2, gap: 0.09, poly: 3, prio: 0, jitter: 0.1, rev: 0.06 },
    ),
    fx_hit_magic: At(
      "通用命中",
      "法术命中星屑",
      (n) => {
        (n.fm({ f: 1900, ratio: 2.7, idx: 1.5, idx1: 0.1, a: 0.001, d: 0.14, g: 0.3 }),
          n.noise({ flt: "bandpass", fc: 6e3, q: 1.5, a: 0.001, d: 0.06, g: 0.3 }),
          n.osc({ f: 400, f1: 250, a: 0.001, d: 0.05, g: 0.25 }));
      },
      { loud: -27, len: 0.25, gap: 0.09, poly: 3, prio: 0, jitter: 0.1, rev: 0.14 },
    ),
    fx_hit_crit: At(
      "通用命中",
      "暴击重击",
      (n) => {
        const t = n.drive(3);
        (n.osc({ w: "triangle", f: 200, f1: 60, a: 0.002, d: 0.2, g: 0.6, to: t }),
          n.noise({ flt: "bandpass", fc: 2e3, q: 0.7, a: 0.001, d: 0.07, g: 0.8, to: t }),
          n.noise({ flt: "bandpass", fc: 5200, q: 2, a: 0.002, d: 0.1, g: 0.3 }),
          n.ring(1800, CS, { a: 0.001, d: 0.32, g: 0.22 }),
          n.osc({ f: 1200, f1: 3200, a: 0.004, d: 0.09, g: 0.16 }));
      },
      { loud: -16, len: 0.5, gap: 0.09, poly: 2, prio: 2, rev: 0.2 },
    ),
    fx_hit_tower: At(
      "通用命中",
      "塔弹命中碎光",
      (n) => {
        (n.noise({ flt: "bandpass", fc: 2500, q: 1, a: 0.001, d: 0.05, g: 0.6 }),
          n.ring(1320, ga, { a: 0.001, d: 0.16, g: 0.1 }),
          n.osc({ f: 170, f1: 70, a: 0.002, d: 0.12, g: 0.6 }));
      },
      { loud: -23, len: 0.35, gap: 0.1, poly: 2, group: "towerhit", rev: 0.16 },
    ),
    xingli_s1_fly: At(
      "技能弹道",
      "一弦穿云·飞行",
      (n) => {
        const t = n.filt("lowpass", 4200, 1);
        (n.osc({ w: "string", f: It(76), a: 0.03, d: 0.42, g: 0.7, vib: 35, vr: 13, vd: 0, to: t }),
          n.osc({ w: "string", f: It(83), a: 0.04, d: 0.36, g: 0.35, vib: 35, vr: 13, vd: 0, to: t }),
          n.noise({ flt: "bandpass", fc: 1400, fc1: 3600, q: 2, a: 0.04, d: 0.42, g: 0.4 }));
      },
      { loud: -26, len: 0.6, gap: 0.1, poly: 2, rev: 0.2, jitter: 0 },
    ),
    xingli_s1_hit: At(
      "技能弹道",
      "一弦穿云·贯穿命中",
      (n) => {
        (Si(n, Qm, 0, 0.36, 0.9),
          Si(n, Ay, 0.02, 0.3, 0.5),
          n.noise({ flt: "bandpass", fc: 4e3, q: 0.8, a: 0.001, d: 0.08, g: 0.5 }),
          n.osc({ f: 210, f1: 80, a: 0.002, d: 0.14, g: 0.45 }));
      },
      { loud: -17, len: 0.6, gap: 0.07, rev: 0.24, jitter: 0 },
    ),
    fengling_s1_fly: At(
      "技能弹道",
      "白羽没石·破空",
      (n) => {
        (El(n, 0, 0.42, 0.9, 3e3, 1900),
          n.noise({ k: "pink", flt: "bandpass", fc: 700, q: 0.8, a: 0.03, d: 0.3, g: 0.3 }));
      },
      { loud: -26, len: 0.55, gap: 0.1, poly: 2, rev: 0.12 },
    ),
    fengling_s1_hit: At(
      "技能弹道",
      "白羽没石·命中",
      (n, t) => {
        const e = n.drive(2, n.gain(0.7));
        (th(n, 0, 1.1, 0.85, e),
          n.osc({ f: 230, f1: 110, a: 0.001, d: 0.1, g: 0.3, to: e }),
          n.osc({ w: "triangle", f: 430, f1: 300, a: 0.001, d: 0.12, g: 0.5 }),
          n.osc({ w: "triangle", f: 172, a: 0.004, d: 0.18, g: 0.2, vib: 90, vr: 38, vd: 0 }),
          t > 0.5 &&
            (n.noise({ flt: "highpass", fc: 1800, t: 0.004, a: 0.001, d: 0.02, g: 0.6 }),
            n.noise({ flt: "bandpass", fc: 950, q: 1.2, t: 0.008, a: 0.001, d: 0.05, g: 0.55 }),
            n.scatter(5, 0.03, 0.22, (s) =>
              n.noise({
                flt: "bandpass",
                fc: n.rr(1400, 3600),
                q: 3,
                t: s,
                a: 0.001,
                d: n.rr(0.012, 0.03),
                g: n.rr(0.2, 0.4),
              }),
            )));
      },
      {
        loud: -17,
        len: 0.45,
        gap: 0.07,
        rev: 0.16,
        variants: [
          { label: "钉入", v: 0 },
          { label: "命中英雄(石裂)", v: 1 },
        ],
      },
    ),
    yeque_s2_fly: At(
      "技能弹道",
      "引匕一掷·飞行",
      (n) => {
        (El(n, 0, 0.36, 0.7, 3600, 3e3), n.osc({ f: 5200, a: 0.02, d: 0.3, g: 0.02 }));
      },
      { loud: -27, len: 0.5, gap: 0.1, poly: 2, rev: 0.1 },
    ),
    yeque_s2_hit: At(
      "技能弹道",
      "引匕一掷·命中",
      (n) => {
        (n.ring(3300, Tl, { a: 0.001, d: 0.22, g: 0.22 }),
          n.noise({ flt: "highpass", fc: 4500, a: 0.001, d: 0.01, g: 0.5 }));
        const t = n.drive(2);
        (n.osc({ w: "triangle", f: 250, f1: 95, a: 0.001, d: 0.08, g: 0.4, to: t }),
          n.noise({ k: "pink", flt: "bandpass", fc: 700, q: 0.8, a: 0.005, d: 0.1, g: 0.2 }));
      },
      { loud: -18, len: 0.4, gap: 0.06, rev: 0.14 },
    ),
    atk_mushroom_swing: At(
      "英雄普攻",
      "杯杯菇·抡拳",
      (n) => {
        (Ti(n, 0, 0.2, 0.34, 240, 980, 420, 1.1, "pink"),
          n.osc({ w: "sine", f: 190, f1: 95, a: 0.01, d: 0.12, g: 0.18 }));
      },
      { loud: -28, len: 0.34, gap: 0.12, rev: 0.06 },
    ),
    atk_mushroom_hit: At(
      "英雄普攻",
      "杯杯菇·软拳命中",
      (n) => {
        const t = n.drive(2);
        (n.osc({ w: "sine", f: 140, f1: 52, a: 0.002, d: 0.22, g: 0.55, to: t }),
          n.noise({ flt: "bandpass", fc: 900, q: 1.1, a: 0.001, d: 0.09, g: 0.5, to: t }),
          n.noise({ k: "pink", flt: "lowpass", fc: 600, a: 0.002, d: 0.12, g: 0.3 }));
      },
      { loud: -18, len: 0.45, gap: 0.08, rev: 0.12 },
    ),
    cast_mushroom_s1: At(
      "技能施放",
      "杯杯菇·滚菌冲锋",
      (n) => {
        (Ti(n, 0, 0.45, 0.5, 220, 1500, 520, 1.5, "brown"),
          n.osc({ w: "sawtooth", f: 70, f1: 130, ft: 0.4, a: 0.05, d: 0.4, g: 0.14 }));
      },
      { loud: -22, len: 0.6, gap: 0.1, poly: 2, rev: 0.1 },
    ),
    fx_mushroom_s1_dash: At(
      "技能施放",
      "杯杯菇·滚菌起转",
      (n) => {
        (Ti(n, 0, 0.4, 0.45, 260, 1300, 620, 1.4, "brown"),
          n.osc({ w: "sawtooth", f: 78, f1: 150, ft: 0.35, a: 0.04, d: 0.34, g: 0.14 }),
          n.noise({ k: "pink", flt: "bandpass", fc: 1400, fc1: 700, q: 0.8, a: 0.03, d: 0.3, g: 0.28 }));
      },
      { loud: -22, len: 0.5, gap: 0.12, poly: 2, rev: 0.1 },
    ),
    fx_mushroom_s1_trail: At(
      "技能施放",
      "杯杯菇·菌盖滚动",
      (n) => {
        (n.osc({ w: "triangle", f: 96, f1: 128, a: 0.02, d: 0.16, g: 0.16 }),
          n.noise({ k: "pink", flt: "lowpass", fc: 780, a: 0.01, d: 0.18, g: 0.3 }));
      },
      { loud: -26, len: 0.3, gap: 0.22, poly: 2, rev: 0.06 },
    ),
    fx_mushroom_s1_impact: At(
      "技能施放",
      "杯杯菇·撞飞",
      (n) => {
        const t = n.drive(2.4);
        (n.osc({ f: 110, f1: 38, ft: 0.12, a: 0.002, d: 0.32, g: 0.6, to: t }),
          n.noise({ flt: "bandpass", fc: 1500, q: 0.9, a: 0.001, d: 0.14, g: 0.55, to: t }),
          n.noise({ k: "pink", flt: "lowpass", fc: 900, a: 0.002, d: 0.25, g: 0.35 }));
      },
      { loud: -15, len: 0.6, gap: 0.08, rev: 0.18 },
    ),
    cast_mushroom_s2: At(
      "技能施放",
      "杯杯菇·孢子喷吐",
      (n) => {
        (Ti(n, 0, 0.5, 0.42, 1800, 700, 320, 0.8, "pink"),
          n.noise({ k: "brown", flt: "lowpass", fc: 700, a: 0.06, d: 0.4, g: 0.32 }));
      },
      { loud: -23, len: 0.6, gap: 0.1, poly: 2, rev: 0.12 },
    ),
    fx_mushroom_s2_spray: At(
      "技能施放",
      "杯杯菇·孢子粉雾",
      (n) => {
        (Ti(n, 0, 0.42, 0.34, 2200, 620, 900, 1.3, "pink"),
          n.noise({ k: "brown", flt: "bandpass", fc: 900, fc1: 380, q: 0.7, a: 0.05, d: 0.42, g: 0.4 }),
          n.scatter(7, 0.04, 0.3, (t) =>
            n.noise({ k: "pink", flt: "lowpass", fc: n.rr(500, 1100), t, a: 0.01, d: 0.09, g: n.rr(0.08, 0.18) }),
          ));
      },
      { loud: -20, len: 0.7, gap: 0.1, poly: 2, rev: 0.14 },
    ),
    fx_mushroom_passive_burst: At(
      "技能施放",
      "杯杯菇·菌丝缠缚",
      (n) => {
        (n.osc({ w: "triangle", f: 320, f1: 120, ft: 0.16, a: 0.003, d: 0.28, g: 0.4 }),
          n.noise({ k: "pink", flt: "bandpass", fc: 1800, fc1: 700, q: 0.8, a: 0.004, d: 0.22, g: 0.42 }),
          n.osc({ w: "sine", f: 520, f1: 780, ft: 0.2, a: 0.01, d: 0.3, g: 0.16 }));
      },
      { loud: -18, len: 0.5, gap: 0.12, rev: 0.2 },
    ),
    cast_mushroom_ult: At(
      "技能施放",
      "杯杯菇·蓄力",
      (n) => {
        (n.osc({ w: "sine", f: 60, f1: 110, ft: 1.6, a: 0.4, d: 1.6, g: 0.28 }),
          Ti(n, 0, 1.4, 0.3, 300, 900, 400, 0.7, "brown"));
      },
      { loud: -24, len: 1.8, gap: 0.2, prio: 2, rev: 0.1 },
    ),
    fx_mushroom_ult_charge: At(
      "技能施放",
      "杯杯菇·菌盖蓄力",
      (n) => {
        (n.osc({ w: "sine", f: 58, f1: 132, ft: 1.5, a: 0.35, d: 1.5, g: 0.3 }),
          Ti(n, 0, 1.3, 0.26, 320, 1100, 480, 0.7, "brown"),
          n.scatter(6, 0.1, 1.2, (t) =>
            n.osc({ w: "triangle", f: n.rr(240, 420), f1: n.rr(520, 900), t, a: 0.02, d: 0.18, g: 0.06 }),
          ));
      },
      { loud: -24, len: 1.7, gap: 0.2, prio: 2, rev: 0.12 },
    ),
    fx_mushroom_ult_land: At(
      "技能施放",
      "杯杯菇·砸地",
      (n) => {
        const t = n.drive(3);
        (n.osc({ f: 95, f1: 30, ft: 0.2, a: 0.002, d: 0.5, g: 0.7, to: t }),
          n.noise({ flt: "lowpass", fc: 800, a: 0.001, d: 0.4, g: 0.6, to: t }),
          n.ring(420, [1, 1.5, 2.2], { a: 0.002, d: 0.5, g: 0.3 }));
      },
      { loud: -12, len: 0.9, gap: 0.1, prio: 2, rev: 0.2 },
    ),
    atk_xuesong_swing: At(
      "英雄普攻",
      "雪松老师·挥铁锹",
      (n) => {
        (Ti(n, 0, 0.26, 0.42, 180, 920, 340, 1.2, "brown"),
          n.osc({ w: "triangle", f: 160, f1: 72, a: 0.01, d: 0.2, g: 0.26 }),
          n.ring(1420, [1, 1.48, 2.1], { t: 0.04, a: 0.002, d: 0.16, g: 0.08 }));
      },
      { loud: -22, len: 0.46, gap: 0.12, rev: 0.1 },
    ),
    atk_xuesong_hit: At(
      "英雄普攻",
      "雪松老师·铁锹敲人",
      (n) => {
        const t = n.drive(2.2);
        (n.osc({ w: "sine", f: 150, f1: 58, a: 0.002, d: 0.22, g: 0.55, to: t }),
          n.ring(1180, [1, 1.62, 2.38], { a: 0.001, d: 0.26, g: 0.24 }),
          n.noise({ flt: "bandpass", fc: 1400, q: 1.2, a: 0.001, d: 0.09, g: 0.45, to: t }));
      },
      { loud: -16, len: 0.45, gap: 0.08, rev: 0.16 },
    ),
    cast_xuesong_s1: At(
      "技能施放",
      "雪松老师·挖土",
      (n) => {
        (n.noise({ k: "brown", flt: "bandpass", fc: 620, fc1: 300, q: 0.9, a: 0.02, d: 0.36, g: 0.45 }),
          n.ring(980, [1, 1.5], { t: 0.02, a: 0.002, d: 0.14, g: 0.12 }));
      },
      { loud: -22, len: 0.5, gap: 0.1, poly: 2, rev: 0.1 },
    ),
    cast_xuesong_s2: At(
      "技能施放",
      "雪松老师·立定撑篙",
      (n) => {
        (n.osc({ w: "triangle", f: 180, f1: 420, ft: 0.25, a: 0.01, d: 0.32, g: 0.3 }),
          n.ring(1680, [1, 1.5, 2], { t: 0.02, a: 0.003, d: 0.24, g: 0.14 }));
      },
      { loud: -20, len: 0.5, gap: 0.1, poly: 2, rev: 0.16 },
    ),
    cast_xuesong_ult: At(
      "技能施放",
      "雪松老师·颠勺铁锹",
      (n) => {
        const t = n.drive(2.4);
        (n.osc({ w: "sawtooth", f: 130, f1: 310, ft: 0.22, a: 0.01, d: 0.32, g: 0.28, to: t }),
          n.ring(1320, [1, 1.44, 2.2], { a: 0.002, d: 0.3, g: 0.22 }));
      },
      { loud: -16, len: 0.55, gap: 0.1, prio: 2, rev: 0.18 },
    ),
    fx_xuesong_basic_cone: At(
      "技能施放",
      "雪松老师·警告铁锹震荡",
      (n) => {
        const t = n.drive(2.5);
        (n.osc({ f: 135, f1: 46, ft: 0.14, a: 0.002, d: 0.3, g: 0.58, to: t }),
          n.ring(1260, [1, 1.54, 2.3], { a: 0.001, d: 0.28, g: 0.2 }),
          n.noise({ k: "pink", flt: "lowpass", fc: 1100, a: 0.002, d: 0.2, g: 0.35 }));
      },
      { loud: -16, len: 0.45, gap: 0.1, rev: 0.16 },
    ),
    fx_xuesong_dig_start: At(
      "技能施放",
      "雪松老师·下锹挖土",
      (n) => {
        (n.noise({ k: "brown", flt: "bandpass", fc: 540, q: 0.8, a: 0.02, d: 0.45, g: 0.48 }),
          n.scatter(5, 0.08, 0.35, (t) =>
            n.noise({ k: "pink", flt: "bandpass", fc: n.rr(700, 1400), t, a: 0.01, d: 0.12, g: 0.18 }),
          ));
      },
      { loud: -22, len: 0.65, gap: 0.12, rev: 0.1 },
    ),
    fx_xuesong_pit_open: At(
      "技能施放",
      "雪松老师·沙坑成型",
      (n) => {
        const t = n.drive(2.2);
        (n.osc({ f: 105, f1: 42, ft: 0.18, a: 0.003, d: 0.36, g: 0.55, to: t }),
          n.noise({ k: "brown", flt: "lowpass", fc: 750, a: 0.004, d: 0.35, g: 0.5 }));
      },
      { loud: -18, len: 0.6, gap: 0.1, rev: 0.16 },
    ),
    fx_xuesong_sand_throw: At(
      "技能施放",
      "雪松老师·抛沙",
      (n) => {
        (Ti(n, 0, 0.3, 0.35, 1600, 520, 420, 1.0, "pink"),
          n.noise({ k: "pink", flt: "bandpass", fc: 1900, fc1: 800, q: 0.9, a: 0.01, d: 0.28, g: 0.35 }));
      },
      { loud: -22, len: 0.45, gap: 0.1, rev: 0.1 },
    ),
    fx_xuesong_sand_burst: At(
      "技能施放",
      "雪松老师·沙尘致盲",
      (n) => {
        (n.noise({ k: "pink", flt: "bandpass", fc: 1500, fc1: 420, q: 0.7, a: 0.005, d: 0.42, g: 0.52 }),
          n.osc({ w: "sine", f: 420, f1: 190, ft: 0.2, a: 0.005, d: 0.24, g: 0.22 }));
      },
      { loud: -18, len: 0.55, gap: 0.1, rev: 0.14 },
    ),
    fx_xuesong_blind_miss: At(
      "技能施放",
      "致盲落空",
      (n) => {
        n.noise({ k: "pink", flt: "highpass", fc: 2200, a: 0.005, d: 0.12, g: 0.25 });
      },
      { loud: -28, len: 0.22, gap: 0.1, poly: 3, rev: 0.06 },
    ),
    fx_xuesong_pole_up: At(
      "技能施放",
      "雪松老师·撑篙升空",
      (n) => {
        (n.osc({ w: "triangle", f: 170, f1: 520, ft: 0.3, a: 0.01, d: 0.38, g: 0.32 }),
          n.ring(1540, [1, 1.5, 2.25], { t: 0.04, a: 0.002, d: 0.34, g: 0.16 }));
      },
      { loud: -19, len: 0.55, gap: 0.1, rev: 0.18 },
    ),
    fx_xuesong_s2_land: At(
      "技能施放",
      "雪松老师·撑篙落地护盾",
      (n) => {
        const t = n.drive(2.2);
        (n.osc({ f: 120, f1: 48, ft: 0.16, a: 0.002, d: 0.34, g: 0.55, to: t }),
          n.ring(660, [1, 1.25, 1.5, 2], { t: 0.01, a: 0.004, d: 0.48, g: 0.28 }));
      },
      { loud: -16, len: 0.65, gap: 0.1, rev: 0.22 },
    ),
    fx_xuesong_ult_scoop: At(
      "技能施放",
      "雪松老师·铁锹铲人",
      (n) => {
        const t = n.drive(2.6);
        (n.osc({ w: "sawtooth", f: 110, f1: 360, ft: 0.22, a: 0.005, d: 0.34, g: 0.42, to: t }),
          n.ring(1480, [1, 1.4, 2.1], { a: 0.001, d: 0.32, g: 0.26 }));
      },
      { loud: -15, len: 0.55, gap: 0.1, prio: 2, rev: 0.18 },
    ),
    fx_xuesong_ult_throw: At(
      "技能施放",
      "雪松老师·颠勺甩出",
      (n) => {
        (Ti(n, 0, 0.28, 0.42, 260, 1400, 500, 1.3, "brown"),
          n.osc({ w: "triangle", f: 240, f1: 580, ft: 0.2, a: 0.01, d: 0.26, g: 0.28 }));
      },
      { loud: -17, len: 0.48, gap: 0.1, prio: 2, rev: 0.14 },
    ),
    fx_xuesong_ult_land: At(
      "技能施放",
      "雪松老师·砸地眩晕",
      (n) => {
        const t = n.drive(3);
        (n.osc({ f: 96, f1: 32, ft: 0.22, a: 0.002, d: 0.48, g: 0.72, to: t }),
          n.noise({ flt: "lowpass", fc: 920, a: 0.001, d: 0.36, g: 0.58, to: t }),
          n.ring(540, [1, 1.5, 2.2], { a: 0.002, d: 0.42, g: 0.24 }));
      },
      { loud: -13, len: 0.85, gap: 0.1, prio: 2, rev: 0.22 },
    ),
    atk_stone_swing: At(
      "普通攻击",
      "小肥石·重锤挥动",
      (n) => {
        (Ti(n, 0, 0.22, 0.34, 210, 620, 260, 1.3, "brown"),
          n.osc({ f: 110, f1: 58, ft: 0.14, a: 0.008, d: 0.16, g: 0.24 }));
      },
      { loud: -26, len: 0.34, gap: 0.08, poly: 3, rev: 0.1 },
    ),
    atk_stone_hit: At(
      "普通攻击",
      "小肥石·石头砸中",
      (n) => {
        const t = n.drive(2.4);
        (n.osc({ f: 135, f1: 42, ft: 0.12, a: 0.002, d: 0.22, g: 0.56, to: t }),
          n.noise({ k: "brown", flt: "lowpass", fc: 980, a: 0.002, d: 0.16, g: 0.44 }));
      },
      { loud: -21, len: 0.32, gap: 0.07, poly: 3, rev: 0.12 },
    ),
    cast_stone_s1: At(
      "技能施放",
      "小肥石·开始练功",
      (n) => {
        (n.osc({ w: "triangle", f: 120, f1: 210, ft: 0.28, a: 0.01, d: 0.34, g: 0.36 }),
          n.noise({ k: "brown", flt: "lowpass", fc: 620, a: 0.01, d: 0.26, g: 0.28 }));
      },
      { loud: -19, len: 0.5, gap: 0.1, rev: 0.14 },
    ),
    cast_stone_s2: At(
      "技能施放",
      "小肥石·抓起来锤",
      (n) => {
        const t = n.drive(2.2);
        (n.osc({ f: 170, f1: 72, ft: 0.12, a: 0.002, d: 0.24, g: 0.5, to: t }),
          n.ring(680, [1, 1.5], { a: 0.002, d: 0.18, g: 0.18 }));
      },
      { loud: -17, len: 0.38, gap: 0.1, rev: 0.12 },
    ),
    cast_stone_ult: At(
      "技能施放",
      "小肥石·自重跳起跳",
      (n) => {
        (Ti(n, 0, 0.32, 0.46, 180, 960, 420, 1.4, "brown"),
          n.osc({ f: 92, f1: 220, ft: 0.28, a: 0.005, d: 0.34, g: 0.42 }));
      },
      { loud: -15, len: 0.55, gap: 0.1, prio: 2, rev: 0.16 },
    ),
    fx_stone_passive_hit: At(
      "技能施放",
      "小肥石·安全帽重锤",
      (n) => {
        const t = n.drive(2.8);
        (n.osc({ f: 155, f1: 38, ft: 0.16, a: 0.002, d: 0.3, g: 0.68, to: t }),
          n.ring(1120, [1, 1.45, 2.1], { a: 0.001, d: 0.24, g: 0.24 }));
      },
      { loud: -16, len: 0.45, gap: 0.08, rev: 0.14 },
    ),
    fx_stone_train_done: At(
      "技能施放",
      "小肥石·练功涨属性",
      (n) => {
        (n.ring(520, [1, 1.25, 1.5, 2], { t: 0.01, a: 0.004, d: 0.46, g: 0.3 }),
          n.osc({ f: 110, f1: 165, ft: 0.22, a: 0.005, d: 0.3, g: 0.34 }));
      },
      { loud: -17, len: 0.62, gap: 0.1, rev: 0.2 },
    ),
    fx_stone_tether: At(
      "技能施放",
      "小肥石·锁住敌人",
      (n) => {
        (n.ring(840, [1, 1.33, 1.9], { a: 0.002, d: 0.26, g: 0.24 }),
          n.osc({ f: 140, f1: 88, ft: 0.14, a: 0.003, d: 0.22, g: 0.4 }));
      },
      { loud: -18, len: 0.38, gap: 0.1, rev: 0.12 },
    ),
    fx_stone_corpse_ready: At(
      "技能施放",
      "小肥石·抓起尸体",
      (n) => {
        (n.osc({ w: "sawtooth", f: 120, f1: 280, ft: 0.2, a: 0.004, d: 0.28, g: 0.32 }),
          n.ring(740, [1, 1.5], { a: 0.002, d: 0.25, g: 0.22 }));
      },
      { loud: -17, len: 0.42, gap: 0.1, rev: 0.14 },
    ),
    fx_stone_throw: At(
      "技能施放",
      "小肥石·扔出去",
      (n) => {
        (Ti(n, 0, 0.26, 0.4, 220, 1280, 480, 1.3, "brown"),
          n.osc({ w: "triangle", f: 220, f1: 480, ft: 0.18, a: 0.008, d: 0.22, g: 0.28 }));
      },
      { loud: -17, len: 0.44, gap: 0.1, rev: 0.14 },
    ),
    fx_stone_throw_land: At(
      "技能施放",
      "小肥石·砸地击飞",
      (n) => {
        const t = n.drive(3);
        (n.osc({ f: 100, f1: 30, ft: 0.2, a: 0.002, d: 0.46, g: 0.72, to: t }),
          n.noise({ k: "brown", flt: "lowpass", fc: 920, a: 0.001, d: 0.38, g: 0.58, to: t }));
      },
      { loud: -14, len: 0.75, gap: 0.1, prio: 2, rev: 0.2 },
    ),
    fx_stone_ult_land: At(
      "技能施放",
      "小肥石·自重跳砸地",
      (n) => {
        const t = n.drive(3.4);
        (n.osc({ f: 84, f1: 26, ft: 0.26, a: 0.002, d: 0.62, g: 0.82, to: t }),
          n.noise({ k: "brown", flt: "lowpass", fc: 1100, a: 0.001, d: 0.48, g: 0.68, to: t }),
          n.ring(420, [1, 1.4, 2.0], { a: 0.002, d: 0.44, g: 0.22 }));
      },
      { loud: -12, len: 0.95, gap: 0.1, prio: 2, rev: 0.26 },
    ),
    atk_scallion_launch: At(
      "技能施放",
      "葱仔仔·葱镖出手",
      (n) => {
        (n.osc({ f: 780, f1: 420, ft: 0.08, a: 0.002, d: 0.12, g: 0.32 }),
          n.noise({ k: "pink", flt: "bandpass", fc: 2200, q: 2.2, a: 0.002, d: 0.09, g: 0.42 }));
      },
      { loud: -20, len: 0.16, gap: 0.05, prio: 1, rev: 0.08 },
    ),
    atk_scallion_hit: At(
      "技能命中",
      "葱仔仔·葱叶抽中",
      (n) => {
        (n.osc({ f: 340, f1: 120, ft: 0.07, a: 0.002, d: 0.12, g: 0.44 }),
          n.noise({ k: "white", flt: "bandpass", fc: 1900, q: 1.6, a: 0.001, d: 0.08, g: 0.48 }));
      },
      { loud: -18, len: 0.16, gap: 0.05, prio: 1, rev: 0.08 },
    ),
    cast_scallion_s1: At(
      "技能施放",
      "葱仔仔·葱锋拍击",
      (n) => {
        const t = n.drive(2.1);
        (n.osc({ f: 520, f1: 160, ft: 0.14, a: 0.002, d: 0.24, g: 0.62, to: t }),
          n.noise({ k: "pink", flt: "bandpass", fc: 1650, q: 1.2, a: 0.002, d: 0.2, g: 0.56, to: t }));
      },
      { loud: -15, len: 0.34, gap: 0.08, prio: 2, rev: 0.14 },
    ),
    cast_scallion_s2: At(
      "技能施放",
      "葱仔仔·葱能爆发",
      (n) => {
        (n.osc({ f: 360, f1: 880, ft: 0.22, a: 0.004, d: 0.34, g: 0.54 }),
          n.ring(740, [1, 1.5, 2], { a: 0.004, d: 0.28, g: 0.26 }),
          n.noise({ k: "white", flt: "highpass", fc: 2100, a: 0.005, d: 0.24, g: 0.32 }));
      },
      { loud: -15, len: 0.44, gap: 0.1, prio: 2, rev: 0.18 },
    ),
    cast_scallion_ult: At(
      "技能施放",
      "葱仔仔·葱击波闪现起手",
      (n) => {
        const t = n.drive(2.4);
        (n.osc({ f: 960, f1: 280, ft: 0.16, a: 0.002, d: 0.32, g: 0.62, to: t }),
          n.osc({ f: 220, f1: 580, ft: 0.28, a: 0.02, d: 0.45, g: 0.48, to: t }),
          n.noise({ k: "pink", flt: "bandpass", fc: 1400, q: 1.1, a: 0.002, d: 0.36, g: 0.5, to: t }));
      },
      { loud: -13, len: 0.56, gap: 0.1, prio: 2, rev: 0.22 },
    ),
    fx_scallion_s1_slash: At(
      "技能施放",
      "葱仔仔·葱锋气浪",
      (n) => {
        (n.osc({ f: 420, f1: 145, ft: 0.12, a: 0.002, d: 0.22, g: 0.52 }),
          n.noise({ k: "pink", flt: "bandpass", fc: 1850, q: 1.4, a: 0.002, d: 0.18, g: 0.48 }));
      },
      { loud: -16, len: 0.28, gap: 0.06, prio: 1, rev: 0.12 },
    ),
    fx_scallion_s2_burst: At(
      "技能施放",
      "葱仔仔·绿光爆气",
      (n) => {
        (n.osc({ f: 440, f1: 920, ft: 0.2, a: 0.004, d: 0.3, g: 0.44 }),
          n.ring(860, [1, 1.33, 2], { a: 0.004, d: 0.24, g: 0.22 }));
      },
      { loud: -16, len: 0.38, gap: 0.1, prio: 1, rev: 0.16 },
    ),
    fx_scallion_ult_blink: At(
      "技能施放",
      "葱仔仔·闪现",
      (n) => {
        (n.osc({ f: 1120, f1: 420, ft: 0.09, a: 0.001, d: 0.16, g: 0.48 }),
          n.noise({ k: "white", flt: "highpass", fc: 2600, a: 0.001, d: 0.12, g: 0.36 }));
      },
      { loud: -16, len: 0.22, gap: 0.08, prio: 1, rev: 0.12 },
    ),
    fx_scallion_beam_tick: At(
      "技能施放",
      "葱仔仔·葱击波持续喷射",
      (n) => {
        const t = n.drive(2.0);
        (n.osc({ f: 290, f1: 360, ft: 0.12, a: 0.004, d: 0.22, g: 0.46, to: t }),
          n.noise({ k: "pink", flt: "bandpass", fc: 1550, q: 1.5, a: 0.003, d: 0.2, g: 0.44, to: t }));
      },
      { loud: -17, len: 0.26, gap: 0.12, prio: 1, rev: 0.14 },
    ),
    atk_paperboy_launch: At(
      "技能施放",
      "纸札人·纸符飞出",
      (n) => {
        (n.osc({ f: 680, f1: 390, ft: 0.08, a: 0.002, d: 0.11, g: 0.28 }),
          n.noise({ k: "white", flt: "bandpass", fc: 2600, q: 2.0, a: 0.001, d: 0.08, g: 0.36 }));
      },
      { loud: -20, len: 0.15, gap: 0.05, prio: 1, rev: 0.1 },
    ),
    atk_paperboy_hit: At(
      "技能命中",
      "纸札人·纸符贴中",
      (n) => {
        (n.osc({ f: 310, f1: 140, ft: 0.07, a: 0.002, d: 0.11, g: 0.38 }),
          n.noise({ k: "pink", flt: "bandpass", fc: 1800, q: 1.5, a: 0.001, d: 0.08, g: 0.42 }));
      },
      { loud: -18, len: 0.15, gap: 0.05, prio: 1, rev: 0.1 },
    ),
    cast_paperboy_s1: At(
      "技能施放",
      "纸札人·唢呐起调",
      (n) => {
        const t = n.drive(2.6);
        (n.osc({ type: "sawtooth", f: 587, f1: 880, ft: 0.14, a: 0.008, d: 0.42, g: 0.48, to: t }),
          n.osc({ type: "sawtooth", f: 880, f1: 932, ft: 0.22, a: 0.06, d: 0.38, g: 0.36, to: t }),
          n.noise({ k: "pink", flt: "bandpass", fc: 2200, q: 3.0, a: 0.01, d: 0.34, g: 0.22 }));
      },
      { loud: -14, len: 0.56, gap: 0.1, prio: 2, rev: 0.24 },
    ),
    cast_paperboy_s2: At(
      "技能施放",
      "纸札人·纸鹤飞出",
      (n) => {
        (n.osc({ f: 640, f1: 1180, ft: 0.18, a: 0.004, d: 0.26, g: 0.42 }),
          n.ring(1120, [1, 1.25, 1.5], { a: 0.004, d: 0.26, g: 0.22 }),
          n.noise({ k: "white", flt: "highpass", fc: 2400, a: 0.003, d: 0.18, g: 0.3 }));
      },
      { loud: -16, len: 0.36, gap: 0.08, prio: 2, rev: 0.18 },
    ),
    cast_paperboy_ult: At(
      "技能施放",
      "纸札人·扎筋点睛",
      (n) => {
        const t = n.drive(2.0);
        (n.osc({ f: 240, f1: 620, ft: 0.22, a: 0.005, d: 0.46, g: 0.52, to: t }),
          n.ring(520, [1, 1.41, 2], { a: 0.006, d: 0.44, g: 0.28 }),
          n.noise({ k: "pink", flt: "bandpass", fc: 1450, q: 1.8, a: 0.005, d: 0.32, g: 0.36 }));
      },
      { loud: -14, len: 0.58, gap: 0.1, prio: 2, rev: 0.24 },
    ),
    fx_paperboy_suona_pulse: At(
      "技能施放",
      "纸札人·唢呐声波",
      (n) => {
        const t = n.drive(2.2);
        (n.osc({ type: "sawtooth", f: 784, f1: 880, ft: 0.12, a: 0.006, d: 0.28, g: 0.38, to: t }),
          n.osc({ type: "triangle", f: 392, f1: 440, ft: 0.12, a: 0.006, d: 0.26, g: 0.28 }));
      },
      { loud: -18, len: 0.36, gap: 0.15, prio: 1, rev: 0.2 },
    ),
    fx_paperboy_crane_hit: At(
      "技能命中",
      "纸札人·纸鹤解控提速",
      (n) => {
        (n.ring(980, [1, 1.5, 2], { a: 0.002, d: 0.32, g: 0.3 }),
          n.osc({ f: 520, f1: 1040, ft: 0.16, a: 0.002, d: 0.26, g: 0.38 }));
      },
      { loud: -15, len: 0.38, gap: 0.08, prio: 2, rev: 0.2 },
    ),
    fx_paperboy_effigy_shatter: At(
      "技能施放",
      "纸札人·替身碎裂人殉",
      (n) => {
        const t = n.drive(3.0);
        (n.osc({ f: 140, f1: 42, ft: 0.32, a: 0.002, d: 0.72, g: 0.8, to: t }),
          n.noise({ k: "white", flt: "bandpass", fc: 2800, q: 1.2, a: 0.001, d: 0.38, g: 0.65, to: t }),
          n.ring(740, [1, 1.18, 1.62, 2.3], { a: 0.002, d: 0.62, g: 0.34 }));
      },
      { loud: -11, len: 0.88, gap: 0.1, prio: 2, rev: 0.32 },
    ),
    fx_paperboy_gloom_burst: At(
      "技能命中",
      "纸札人·晦气爆发",
      (n) => {
        const t = n.drive(2.5);
        (n.osc({ f: 460, f1: 95, ft: 0.22, a: 0.002, d: 0.44, g: 0.68, to: t }),
          n.noise({ k: "pink", flt: "bandpass", fc: 1900, q: 1.4, a: 0.001, d: 0.3, g: 0.58, to: t }));
      },
      { loud: -13, len: 0.52, gap: 0.08, prio: 2, rev: 0.24 },
    ),
    atk_maggot_launch: At(
      "普攻",
      "活蛆·吐泥弹",
      (n) => {
        (n.osc({ f: 420, f1: 190, ft: 0.07, a: 0.002, d: 0.09, g: 0.5 }),
          n.noise({ k: "pink", flt: "bandpass", fc: 1400, q: 1.5, a: 0.002, d: 0.07, g: 0.42 }));
      },
      { loud: -22, len: 0.14, gap: 0.04, poly: 4, prio: 0, rev: 0.05 },
    ),
    atk_maggot_hit: At(
      "普攻命中",
      "活蛆·烂泥拍脸",
      (n) => {
        (n.osc({ f: 220, f1: 75, ft: 0.09, a: 0.001, d: 0.11, g: 0.56 }),
          n.noise({ k: "pink", flt: "bandpass", fc: 980, q: 1.3, a: 0.001, d: 0.09, g: 0.48 }));
      },
      { loud: -20, len: 0.16, gap: 0.04, poly: 4, prio: 0, rev: 0.07 },
    ),
    cast_maggot_s1: At(
      "技能施放",
      "活蛆·喷吐",
      (n) => {
        const t = n.drive(2.1);
        (n.osc({ type: "sawtooth", f: 165, f1: 95, ft: 0.26, a: 0.004, d: 0.34, g: 0.52, to: t }),
          n.noise({ k: "pink", flt: "bandpass", fc: 920, q: 1.4, a: 0.004, d: 0.32, g: 0.58, to: t }));
      },
      { loud: -16, len: 0.42, gap: 0.06, prio: 1, rev: 0.12 },
    ),
    cast_maggot_s2: At(
      "技能施放",
      "活蛆·吸粪机",
      (n) => {
        const t = n.drive(2.0);
        (n.osc({ f: 120, f1: 520, ft: 0.34, a: 0.008, d: 0.45, g: 0.62, to: t }),
          n.noise({ k: "pink", flt: "bandpass", fc: 1300, q: 1.8, a: 0.01, d: 0.4, g: 0.54, to: t }));
      },
      { loud: -14, len: 0.54, gap: 0.08, prio: 2, rev: 0.18 },
    ),
    cast_maggot_ult: At(
      "技能施放",
      "活蛆·噗叽啪发射",
      (n) => {
        const t = n.drive(2.3);
        (n.osc({ f: 160, f1: 580, ft: 0.18, a: 0.003, d: 0.28, g: 0.64, to: t }),
          n.noise({ k: "pink", flt: "bandpass", fc: 1100, q: 1.6, a: 0.002, d: 0.22, g: 0.5, to: t }));
      },
      { loud: -14, len: 0.38, gap: 0.07, prio: 2, rev: 0.16 },
    ),
    fx_maggot_fart: At(
      "技能命中",
      "活蛆·噗屁声",
      (n) => {
        const t = n.drive(3.2);
        (n.osc({ type: "sawtooth", f: 118, f1: 56, ft: 0.38, a: 0.004, d: 0.44, g: 0.72, to: t }),
          n.osc({ type: "square", f: 88, f1: 44, ft: 0.36, a: 0.01, d: 0.4, g: 0.42, to: t }),
          n.noise({ k: "pink", flt: "bandpass", fc: 520, q: 2.2, a: 0.005, d: 0.36, g: 0.56, to: t }));
      },
      { loud: -12, len: 0.52, gap: 0.08, prio: 2, rev: 0.12 },
    ),
    fx_maggot_poop_merge: At(
      "技能命中",
      "活蛆·粪污合体",
      (n) => {
        const t = n.drive(2.1);
        (n.osc({ f: 240, f1: 680, ft: 0.24, a: 0.004, d: 0.38, g: 0.58, to: t }),
          n.ring(620, [1, 1.25, 1.5], { a: 0.003, d: 0.42, g: 0.32 }));
      },
      { loud: -14, len: 0.52, gap: 0.08, prio: 2, rev: 0.22 },
    ),
    fx_maggot_ult_splat: At(
      "技能命中",
      "活蛆·噗叽啪落地",
      (n) => {
        const t = n.drive(2.8);
        (n.osc({ f: 210, f1: 52, ft: 0.18, a: 0.001, d: 0.34, g: 0.76, to: t }),
          n.noise({ k: "pink", flt: "bandpass", fc: 840, q: 1.1, a: 0.001, d: 0.28, g: 0.68, to: t }));
      },
      { loud: -12, len: 0.44, gap: 0.06, prio: 2, rev: 0.16 },
    ),
    atk_horseman_swing: At(
      "普攻",
      "半马人·蹄挥",
      (n) => {
        (n.noise({ k: "pink", flt: "bandpass", fc: 720, q: 1.2, a: 0.004, d: 0.12, g: 0.52 }),
          n.osc({ f: 185, f1: 88, ft: 0.1, a: 0.003, d: 0.12, g: 0.48 }));
      },
      { loud: -20, len: 0.16, gap: 0.04, poly: 4, prio: 0, rev: 0.06 },
    ),
    atk_horseman_hit: At(
      "普攻命中",
      "半马人·闷蹄撞",
      (n) => {
        const t = n.drive(2.0);
        (n.osc({ f: 150, f1: 48, ft: 0.11, a: 0.001, d: 0.15, g: 0.68, to: t }),
          n.noise({ k: "pink", flt: "bandpass", fc: 620, q: 1.1, a: 0.001, d: 0.1, g: 0.5, to: t }));
      },
      { loud: -18, len: 0.18, gap: 0.04, poly: 4, prio: 0, rev: 0.08 },
    ),
    cast_horseman_s1: At(
      "技能施放",
      "半马人·蓄力刨蹄",
      (n) => {
        const t = n.drive(1.8);
        (n.osc({ f: 135, f1: 80, ft: 0.2, a: 0.005, d: 0.24, g: 0.56, to: t }),
          n.noise({ k: "pink", flt: "bandpass", fc: 540, q: 1.6, a: 0.004, d: 0.22, g: 0.52, to: t }));
      },
      { loud: -16, len: 0.3, gap: 0.06, prio: 1, rev: 0.12 },
    ),
    cast_horseman_s2: At(
      "技能施放",
      "半马人·嘶鸣哀嚎",
      (n) => {
        const t = n.drive(2.6);
        (n.osc({ type: "sawtooth", f: 680, f1: 290, ft: 0.46, a: 0.012, d: 0.58, g: 0.62, to: t }),
          n.osc({ type: "triangle", f: 980, f1: 420, ft: 0.42, a: 0.015, d: 0.52, g: 0.44, to: t }),
          n.noise({ k: "pink", flt: "bandpass", fc: 1650, q: 2.2, a: 0.01, d: 0.44, g: 0.42, to: t }));
      },
      { loud: -12, len: 0.66, gap: 0.08, prio: 2, rev: 0.28 },
    ),
    cast_horseman_ult: At(
      "技能施放",
      "半马人·践踏狂奔",
      (n) => {
        const t = n.drive(2.8);
        (n.osc({ f: 110, f1: 310, ft: 0.28, a: 0.004, d: 0.48, g: 0.72, to: t }),
          n.osc({ f: 220, f1: 520, ft: 0.32, a: 0.01, d: 0.44, g: 0.45, to: t }),
          n.noise({ k: "pink", flt: "bandpass", fc: 980, q: 1.3, a: 0.004, d: 0.38, g: 0.58, to: t }));
      },
      { loud: -11, len: 0.58, gap: 0.08, prio: 2, rev: 0.22 },
    ),
    fx_horseman_charge_hit: At(
      "技能命中",
      "半马人·冲锋撞飞",
      (n) => {
        const t = n.drive(3.0);
        (n.osc({ f: 185, f1: 42, ft: 0.16, a: 0.001, d: 0.32, g: 0.82, to: t }),
          n.noise({ k: "pink", flt: "bandpass", fc: 820, q: 1.0, a: 0.001, d: 0.24, g: 0.68, to: t }));
      },
      { loud: -11, len: 0.4, gap: 0.06, prio: 2, rev: 0.16 },
    ),
    fx_horseman_kick_blast: At(
      "技能命中",
      "半马人·后腿重蹬",
      (n) => {
        const t = n.drive(3.2);
        (n.osc({ f: 210, f1: 38, ft: 0.18, a: 0.001, d: 0.36, g: 0.86, to: t }),
          n.osc({ type: "square", f: 120, f1: 48, ft: 0.14, a: 0.002, d: 0.24, g: 0.46, to: t }),
          n.noise({ k: "pink", flt: "bandpass", fc: 1120, q: 1.1, a: 0.001, d: 0.28, g: 0.72, to: t }));
      },
      { loud: -10, len: 0.44, gap: 0.06, prio: 2, rev: 0.18 },
    ),
    fx_horseman_trample_reset: At(
      "技能命中",
      "半马人·践踏刷新",
      (n) => {
        (n.ring(520, [1, 1.25, 1.5, 2], { a: 0.004, d: 0.46, g: 0.44 }),
          n.osc({ f: 260, f1: 620, ft: 0.22, a: 0.004, d: 0.34, g: 0.56 }));
      },
      { loud: -13, len: 0.52, gap: 0.08, prio: 2, rev: 0.24 },
    ),
    atk_cow_swing: At(
      "普攻",
      "大脚牛·大脚挥",
      (n) => {
        (n.noise({ k: "pink", flt: "bandpass", fc: 520, q: 1.1, a: 0.005, d: 0.14, g: 0.56 }),
          n.osc({ f: 145, f1: 68, ft: 0.12, a: 0.004, d: 0.14, g: 0.54 }));
      },
      { loud: -19, len: 0.18, gap: 0.04, poly: 4, prio: 0, rev: 0.07 },
    ),
    atk_cow_hit: At(
      "普攻命中",
      "大脚牛·厚脚闷砸",
      (n) => {
        const t = n.drive(2.2);
        (n.osc({ f: 132, f1: 42, ft: 0.12, a: 0.001, d: 0.17, g: 0.72, to: t }),
          n.noise({ k: "pink", flt: "bandpass", fc: 480, q: 1.0, a: 0.001, d: 0.12, g: 0.52, to: t }));
      },
      { loud: -17, len: 0.2, gap: 0.04, poly: 4, prio: 0, rev: 0.08 },
    ),
    cast_cow_s1: At(
      "技能施放",
      "大脚牛·深蹲哼哧",
      (n) => {
        const t = n.drive(2.0);
        (n.osc({ f: 115, f1: 72, ft: 0.22, a: 0.008, d: 0.28, g: 0.62, to: t }),
          n.noise({ k: "pink", flt: "bandpass", fc: 420, q: 1.5, a: 0.006, d: 0.22, g: 0.45, to: t }));
      },
      { loud: -15, len: 0.34, gap: 0.06, prio: 1, rev: 0.12 },
    ),
    cast_cow_s2: At(
      "技能施放",
      "大脚牛·飞踢破风",
      (n) => {
        const t = n.drive(2.4);
        (n.osc({ f: 240, f1: 95, ft: 0.18, a: 0.003, d: 0.24, g: 0.66, to: t }),
          n.noise({ k: "pink", flt: "bandpass", fc: 1280, q: 1.2, a: 0.003, d: 0.22, g: 0.58, to: t }));
      },
      { loud: -14, len: 0.3, gap: 0.06, prio: 1, rev: 0.14 },
    ),
    cast_cow_ult: At(
      "技能施放",
      "大脚牛·牛气冲天",
      (n) => {
        const t = n.drive(3.0);
        (n.osc({ type: "sawtooth", f: 130, f1: 72, ft: 0.45, a: 0.01, d: 0.56, g: 0.72, to: t }),
          n.osc({ f: 88, f1: 38, ft: 0.36, a: 0.004, d: 0.48, g: 0.82, to: t }),
          n.noise({ k: "pink", flt: "bandpass", fc: 680, q: 1.1, a: 0.006, d: 0.42, g: 0.56, to: t }));
      },
      { loud: -10, len: 0.64, gap: 0.08, prio: 2, rev: 0.24 },
    ),
    fx_cow_stride: At(
      "技能命中",
      "大脚牛·大长腿跨步",
      (n) => {
        (n.noise({ k: "pink", flt: "bandpass", fc: 920, q: 1.3, a: 0.004, d: 0.16, g: 0.5 }),
          n.osc({ f: 160, f1: 240, ft: 0.12, a: 0.004, d: 0.15, g: 0.44 }));
      },
      { loud: -18, len: 0.2, gap: 0.06, prio: 1, rev: 0.08 },
    ),
    fx_cow_flykick_hit: At(
      "技能命中",
      "大脚牛·飞踢暴踹",
      (n) => {
        const t = n.drive(3.2);
        (n.osc({ f: 220, f1: 42, ft: 0.16, a: 0.001, d: 0.32, g: 0.86, to: t }),
          n.osc({ type: "square", f: 145, f1: 52, ft: 0.12, a: 0.002, d: 0.22, g: 0.45, to: t }),
          n.noise({ k: "pink", flt: "bandpass", fc: 1180, q: 1.0, a: 0.001, d: 0.24, g: 0.7, to: t }));
      },
      { loud: -10, len: 0.38, gap: 0.06, prio: 2, rev: 0.18 },
    ),
    fx_cow_ult_stomp: At(
      "技能命中",
      "大脚牛·一脚裂地",
      (n) => {
        const t = n.drive(3.5);
        (n.osc({ f: 155, f1: 30, ft: 0.24, a: 0.001, d: 0.44, g: 0.92, to: t }),
          n.osc({ type: "triangle", f: 92, f1: 28, ft: 0.26, a: 0.002, d: 0.4, g: 0.78, to: t }),
          n.noise({ k: "pink", flt: "lowpass", fc: 960, q: 0.9, a: 0.001, d: 0.36, g: 0.76, to: t }));
      },
      { loud: -9, len: 0.5, gap: 0.06, prio: 2, rev: 0.22 },
    ),
    atk_slime_swing: At(
      "普攻",
      "黄色史莱姆·果冻甩砸",
      (n) => {
        (n.osc({ f: 185, f1: 310, ft: 0.11, a: 0.004, d: 0.14, g: 0.54 }),
          n.noise({ k: "pink", flt: "bandpass", fc: 680, q: 1.8, a: 0.004, d: 0.11, g: 0.36 }));
      },
      { loud: -19, len: 0.17, gap: 0.04, poly: 4, prio: 0, rev: 0.08 },
    ),
    atk_slime_hit: At(
      "普攻命中",
      "黄色史莱姆·果冻闷弹",
      (n) => {
        (n.osc({ f: 240, f1: 115, ft: 0.12, a: 0.002, d: 0.16, g: 0.66 }),
          n.osc({ type: "triangle", f: 390, f1: 210, ft: 0.09, a: 0.002, d: 0.12, g: 0.38 }));
      },
      { loud: -17, len: 0.19, gap: 0.04, poly: 4, prio: 0, rev: 0.08 },
    ),
    cast_slime_s1: At(
      "技能施放",
      "黄色史莱姆·啵唧吸附",
      (n) => {
        (n.osc({ f: 190, f1: 480, ft: 0.14, a: 0.004, d: 0.22, g: 0.62 }),
          n.osc({ type: "triangle", f: 320, f1: 590, ft: 0.16, a: 0.008, d: 0.2, g: 0.42 }),
          n.noise({ k: "pink", flt: "bandpass", fc: 980, q: 2.2, a: 0.004, d: 0.15, g: 0.32 }));
      },
      { loud: -14, len: 0.28, gap: 0.05, prio: 1, rev: 0.12 },
    ),
    cast_slime_s2: At(
      "技能施放",
      "黄色史莱姆·弹性弹射",
      (n) => {
        const t = n.drive(1.8);
        (n.osc({ f: 150, f1: 540, ft: 0.2, a: 0.002, d: 0.28, g: 0.72, to: t }),
          n.osc({ type: "triangle", f: 280, f1: 140, ft: 0.22, a: 0.006, d: 0.26, g: 0.48, to: t }),
          n.noise({ k: "pink", flt: "bandpass", fc: 1120, q: 1.5, a: 0.003, d: 0.18, g: 0.42, to: t }));
      },
      { loud: -12, len: 0.34, gap: 0.05, prio: 2, rev: 0.16 },
    ),
    cast_slime_ult: At(
      "技能施放",
      "黄色史莱姆·化整为零",
      (n) => {
        (n.osc({ f: 260, f1: 92, ft: 0.38, a: 0.008, d: 0.52, g: 0.72 }),
          n.osc({ type: "triangle", f: 420, f1: 180, ft: 0.32, a: 0.01, d: 0.46, g: 0.48 }),
          n.noise({ k: "pink", flt: "bandpass", fc: 760, q: 1.6, a: 0.008, d: 0.42, g: 0.48 }));
      },
      { loud: -11, len: 0.58, gap: 0.08, prio: 2, rev: 0.22 },
    ),
    fx_slime_bounce: At(
      "技能命中",
      "黄色史莱姆·弹性击退",
      (n) => {
        (n.osc({ f: 210, f1: 420, ft: 0.12, a: 0.002, d: 0.18, g: 0.56 }),
          n.osc({ type: "triangle", f: 340, f1: 190, ft: 0.1, a: 0.003, d: 0.14, g: 0.34 }));
      },
      { loud: -16, len: 0.22, gap: 0.06, poly: 3, prio: 1, rev: 0.1 },
    ),
    fx_slime_wall_hit: At(
      "技能命中",
      "黄色史莱姆·撞墙储能",
      (n) => {
        (n.osc({ f: 290, f1: 660, ft: 0.16, a: 0.002, d: 0.24, g: 0.68 }),
          n.ring(540, [1, 1.25, 1.5], { a: 0.004, d: 0.26, g: 0.36 }));
      },
      { loud: -12, len: 0.3, gap: 0.05, prio: 2, rev: 0.16 },
    ),
    fx_slime_ball_hit: At(
      "技能命中",
      "黄色史莱姆·弹球撞飞",
      (n) => {
        const t = n.drive(2.4);
        (n.osc({ f: 260, f1: 68, ft: 0.14, a: 0.001, d: 0.26, g: 0.82, to: t }),
          n.osc({ type: "triangle", f: 420, f1: 170, ft: 0.12, a: 0.002, d: 0.2, g: 0.46, to: t }),
          n.noise({ k: "pink", flt: "bandpass", fc: 980, q: 1.2, a: 0.001, d: 0.18, g: 0.54, to: t }));
      },
      { loud: -11, len: 0.32, gap: 0.05, prio: 2, rev: 0.16 },
    ),
    proj_fizzle: At(
      "技能弹道",
      "弹道落空",
      (n, t) => {
        t > 0.5
          ? n.sub(0.85, (e) => {
              (th(e, 0, 0.8, 1.2), e.ring(2900, Tl, { t: 0.004, a: 0.001, d: 0.12, g: 0.07 }));
            })
          : n.sub(1, (e) => {
              (e.noise({ flt: "highpass", fc: 3e3, a: 0.01, d: 0.12, g: 0.4 }),
                e.osc({ f: 900, f1: 500, a: 0.005, d: 0.1, g: 0.2 }));
            });
      },
      {
        loud: -33,
        len: 0.25,
        gap: 0.1,
        poly: 2,
        prio: 0,
        rev: 0.14,
        variants: [
          { label: "消散", v: 0 },
          { label: "匕首钉地", v: 1 },
        ],
      },
    ),
  },
  Ry = Math.PI / 180,
  kr = ["panyue", "chijin", "xingli", "fengling", "yeque", "mushroom", "niumo", "xuesong", "stone", "scallion", "paperboy", "maggot", "horseman", "cow", "monkey", "slime"],
  Se = {
    panyue: {
      id: "panyue",
      name: "樊哙",
      title: "鸿门闯帐",
      role: "tank",
      roleName: "坦克",
      lane: "bot",
      difficulty: 1,
      lore: "沛县屠狗出身的汉初猛将。《史记》载鸿门宴上他「带剑拥盾入军门」，侧过盾牌撞倒卫士闯进大帐，怒视项王，护着刘邦脱了险。",
      tips: "你是队伍的门板：用「侧盾闯帐」撞进去把人顶飞。被集火就开「拥盾怒目」，有护盾还能减速身边的人。大招跳进人堆砸地开团，别忘了每第三下普攻自带减速。",
      attackType: "melee",
      radius: 0.75,
      base: {
        hp: 3650,
        mana: 440,
        ad: 158,
        armor: 120,
        mr: 70,
        attackSpeed: 0.8,
        moveSpeed: 5.6,
        attackRange: 2.3,
        hpRegen: 11,
        manaRegen: 3.2,
      },
      growth: { hp: 330, mana: 100, ad: 9.5, armor: 24, mr: 9, attackSpeedPct: 0.015 },
      basicAttack: { windup: 0.38, damageType: "physical" },
      passive: {
        name: "覆盾震地",
        brief: "第 3 次普攻附加 4% 最大生命法术伤害，减速 30% / 1 秒",
        tags: ["slow"],
        desc: "每第三次普攻改用大盾砸地，对目标额外造成自身 4% 最大生命的法术伤害并减速 30%，持续 1 秒。",
        values: { hits: 3, hpRatio: 0.04, slow: 0.3, slowDur: 1 },
      },
      skills: {
        s1: {
          slot: "s1",
          name: "侧盾闯帐",
          brief: "向指定方向冲撞：物理伤害 + 击飞 0.75 秒",
          tags: ["dash", "control"],
          desc: "侧起大盾向指定方向冲撞，撞到第一个敌方英雄或冲到终点时震开周围，造成 {damage}(+{adRatio%}物攻) 点物理伤害并击飞 {knockup} 秒。",
          maxLevel: 6,
          cooldown: [9, 8.6, 8.2, 7.8, 7.4, 7],
          manaCost: [50, 55, 60, 65, 70, 75],
          cast: { type: "direction", range: 7.5, width: 2.2 },
          values: {
            damage: [240, 300, 360, 420, 480, 540],
            adRatio: 0.6,
            knockup: 0.75,
            dashSpeed: 22,
            impactRadius: 2.6,
          },
          castTime: 0.1,
        },
        s2: {
          slot: "s2",
          name: "拥盾怒目",
          brief: "护盾（+9% 最大生命，4 秒）+ 范围法术伤害 + 减速 35%",
          tags: ["shield", "slow"],
          desc: "拥盾立定，获得 {shield}(+{hpRatio%}最大生命) 点护盾，持续 {duration} 秒；同时怒目一喝震慑周围敌人，造成 {damage} 点法术伤害并减速 {slow%}，持续 {slowDur} 秒。",
          maxLevel: 6,
          cooldown: [11, 10.6, 10.2, 9.8, 9.4, 9],
          manaCost: [60, 65, 70, 75, 80, 85],
          cast: { type: "self", radius: 4.5 },
          values: {
            shield: [300, 390, 480, 570, 660, 750],
            hpRatio: 0.09,
            duration: 4,
            damage: [120, 160, 200, 240, 280, 320],
            slow: 0.35,
            slowDur: 2,
          },
          castTime: 0.2,
        },
        ult: {
          slot: "ult",
          name: "跃盾砸阵",
          brief: "跃击落点：范围法术伤害 + 击飞 1 秒 + 减速 40%",
          tags: ["control", "slow"],
          desc: "大喝一声「死且不避」，须发戟张，高高跃起连人带盾砸向目标区域，落地造成 {damage}(+{hpRatio%}最大生命) 点物理伤害并击飞 {knockup} 秒，随后留下持续 {zoneDur} 秒的震裂地面，使其中敌人减速 {slow%}。跃起期间免疫控制。",
          maxLevel: 3,
          cooldown: [50, 45, 40],
          manaCost: [100, 110, 120],
          cast: { type: "position", range: 9.5, radius: 4.5 },
          values: {
            damage: [400, 600, 800],
            hpRatio: 0.06,
            knockup: 1,
            leapTime: 0.65,
            zoneDur: 3,
            slow: 0.4,
          },
          castTime: 0.65,
        },
      },
      build: [
        "slippers",
        "riot_armor",
        "liberation_shoes",
        "fire_blanket",
        "big_quilt",
        "barbed_fence",
        "air_cooler",
      ],
      palette: { primary: "#5f6b78", secondary: "#7a4e30", accent: "#d9a441", glow: "#ffcf70" },
      look: "魁梧的汉初猛将：比其他英雄高大宽厚一号，玄铁札甲配方片披膊，赭褐粗布战裙；须发戟张、络腮虬髯、怒目；左臂一面黑漆金纹的双弧大盾，右手一柄汉剑。动作沉重。",
    },
    chijin: {
      id: "chijin",
      name: "牛伟",
      title: "碎骨蛮牛",
      role: "fighter",
      roleName: "战士",
      lane: "top",
      difficulty: 2,
      lore: "深山里走出来的牛头人，谁也不知道他为什么给自己起了这么个文气名字。他只会一件事：抡起那柄比自己还高的巨斧，从东头砍到西头。",
      tips: "三个技能连着放才叫三板斧，每放完一个技能马上补一下普攻，又疼又回血。用「蛮牛冲撞」顶到人脸上，再开大招转圈劈。血少也能打回来，但别一个人冲进塔里。",
      attackType: "melee",
      radius: 0.62,
      base: {
        hp: 3450,
        mana: 430,
        ad: 172,
        armor: 104,
        mr: 55,
        attackSpeed: 0.9,
        moveSpeed: 5.8,
        attackRange: 2.3,
        hpRegen: 9,
        manaRegen: 3,
      },
      growth: { hp: 310, mana: 95, ad: 12.5, armor: 21, mr: 8, attackSpeedPct: 0.022 },
      basicAttack: { windup: 0.33, damageType: "physical" },
      passive: {
        name: "血怒",
        brief: "施法后 4 秒内下次普攻：额外物理伤害 + 回复 5% 最大生命",
        tags: ["heal"],
        desc: "施放技能后，4 秒内的下一次普攻变为重斧：额外造成 80(+50%物攻) 点物理伤害，并回复自身 5% 最大生命。",
        values: { damage: 80, adRatio: 0.5, healHpRatio: 0.05, window: 4 },
      },
      skills: {
        s1: {
          slot: "s1",
          name: "裂地横扫",
          brief: "扇形横扫：物理伤害 + 减速 30% / 1.5 秒",
          tags: ["burst", "slow"],
          desc: "三板斧第一式：抡斧横扫前方扇形区域，造成 {damage}(+{adRatio%}物攻) 点物理伤害并减速 {slow%}，持续 {slowDur} 秒。",
          maxLevel: 6,
          cooldown: [6.5, 6.2, 5.9, 5.6, 5.3, 5],
          manaCost: [40, 44, 48, 52, 56, 60],
          cast: { type: "cone", range: 5.5, angle: 110 * Ry },
          values: { damage: [220, 275, 330, 385, 440, 495], adRatio: 0.8, slow: 0.3, slowDur: 1.5 },
          castTime: 0.25,
        },
        s2: {
          slot: "s2",
          name: "蛮牛冲撞",
          brief: "向指定方向冲撞：物理伤害 + 攻速 +40%~60%，持续 4 秒",
          tags: ["dash", "buff"],
          desc: "三板斧第二式：低头提斧向指定方向猛冲，对路径上的敌人造成 {damage}(+{adRatio%}物攻) 点物理伤害，并获得 {asBonus%} 攻速加成，持续 {asDur} 秒。",
          maxLevel: 6,
          cooldown: [10, 9.5, 9, 8.5, 8, 7.5],
          manaCost: [50, 54, 58, 62, 66, 70],
          cast: { type: "direction", range: 5.5, width: 2 },
          values: {
            damage: [150, 190, 230, 270, 310, 350],
            adRatio: 0.5,
            asBonus: [0.4, 0.44, 0.48, 0.52, 0.56, 0.6],
            asDur: 4,
            dashSpeed: 24,
          },
          castTime: 0.05,
        },
        ult: {
          slot: "ult",
          name: "狂牛旋风",
          brief: "3 秒持续旋转（每 0.3 秒一跳），期间可移动",
          tags: ["dot", "buff"],
          desc: "三板斧第三式：抡圆大斧转成一团斧影，持续 {duration} 秒：每 {tick} 秒对周围敌人造成 {damage}(+{adRatio%}物攻) 点物理伤害。期间可以移动，免疫减速并获得 {reduction%} 减伤。",
          maxLevel: 3,
          cooldown: [42, 38, 34],
          manaCost: [100, 110, 120],
          cast: { type: "self", radius: 4.2 },
          values: { duration: 3, tick: 0.3, damage: [100, 150, 200], adRatio: 0.45, reduction: 0.3 },
          castTime: 0.1,
        },
      },
      build: [
        "slippers",
        "red_bull_case",
        "liberation_shoes",
        "sledgehammer",
        "riot_armor",
        "pry_bar",
        "fire_blanket",
      ],
      palette: { primary: "#5a4234", secondary: "#3b3733", accent: "#c8a05a", glow: "#ff8a3c" },
      look: "牛头人身的壮硕战士：暗褐色厚毛，一双向上外翻的大牛角，鼻环与獠牙；肩胸裹着粗糙的深灰铁甲，腰下是磨旧的皮裙与绑腿；右手一柄比他还高的宽刃巨斧，斧面泛着冷白钢光。动作沉重、转身缓慢但幅度极大。",
    },
    niumo: {
      id: "niumo",
      name: "牛魔",
      title: "烈焰牛魔",
      role: "tank",
      roleName: "坦克",
      lane: "top",
      difficulty: 1,
      lore: "地火深处爬出来的牛头魔王。他不需要挥得快——一剑下去，整条街都烧起来；血越厚，火越旺。",
      tips: "攻速天生慢三成，别指望对拼点数，靠的是「一剑顶两剑」。先用「烈焰斩」在地上烧出一条火路，等敌人踩上去叠满火焰层数，再开「烈焰牛魔」变身，一下普攻全引爆——伤害和回血一起到手。被控住时用「烈焰行军」硬顶过去。",
      attackType: "melee",
      radius: 0.72,
      base: {
        hp: 3900,
        mana: 420,
        ad: 168,
        armor: 110,
        mr: 60,
        attackSpeed: 0.85,
        moveSpeed: 5.6,
        attackRange: 2.5,
        hpRegen: 11,
        manaRegen: 3.5,
      },
      growth: { hp: 340, mana: 90, ad: 11, armor: 22, mr: 9, attackSpeedPct: 0.018 },
      basicAttack: { windup: 0.36, damageType: "physical" },
      passive: {
        name: "炽焰之躯",
        brief: "攻速 −30%；普攻伤害 140%~250%（随最大生命提升）",
        tags: ["buff"],
        desc: "牛魔的攻击速度降低 {asPenalty%}，但每次普通攻击造成 {dmgMin%}~{dmgMax%} 伤害。最大生命值越高，这个比例越接近上限。",
        values: { asPenalty: 0.3, dmgMin: 1.4, dmgMax: 2.5, hpBase: 3000, hpSpan: 6000 },
      },
      skills: {
        s1: {
          slot: "s1",
          name: "烈焰斩",
          brief: "0.3 秒前摇直线范围重劈：物理伤害 + 留下灼烧地面 5 秒",
          tags: ["burst", "dot"],
          desc: "经过 0.3 秒前摇蓄力后，牛魔抡起十字巨剑向前劈出一条直线范围，造成 {damage}(+{adRatio%}物攻) 点物理伤害，并在地面留下火焰轨迹，持续 {trailDur} 秒：每 {tick} 秒对轨迹上的敌人造成 {burnDps} 点魔法伤害，并施加 1 层「磨砂火焰」。",
          maxLevel: 6,
          cooldown: [7, 6.5, 6, 5.5, 5, 4.5],
          manaCost: [45, 50, 55, 60, 65, 70],
          cast: { type: "direction", range: 7, width: 2.4 },
          values: {
            damage: [200, 250, 300, 350, 400, 450],
            adRatio: 0.9,
            burnDps: [26, 34, 42, 50, 58, 66],
            trailDur: 5,
            tick: 0.5,
          },
          castTime: 0.3,
        },
        s2: {
          slot: "s2",
          name: "烈焰行军",
          brief: "被动：命中叠火焰层数（上限 7）；主动：免控直线前进喷火 2 秒，期间不能转向与攻击",
          tags: ["dot", "buff", "channel"],
          desc: "被动「磨砂火焰」：敌人身上的每一层火焰每秒受到 {flameDps} 点魔法伤害，最多叠 {maxStacks} 层。主动「烈焰行军」：选定一个方向，{duration} 秒内免疫控制、期间无法转向也无法攻击，一边朝该方向前进一边持续喷射烈焰，对前方敌人造成 {sprayDmg}(+{sprayAd%}物攻) 点魔法伤害并施加火焰层数，期间不会被打断。",
          maxLevel: 6,
          cooldown: [12, 11.5, 11, 10.5, 10, 9.5],
          manaCost: [55, 60, 65, 70, 75, 80],
          cast: { type: "direction", range: 6, width: 2.6 },
          values: {
            flameDps: [24, 36, 48, 60, 72, 84],
            maxStacks: 7,
            flameDur: 4,
            sprayDmg: [40, 55, 70, 85, 100, 115],
            sprayAd: 0.35,
            duration: 2,
            // 2 秒 24 段（每段 1/3 伤害），直线前进喷火、期间免控禁转向禁攻
            segments: 24,
          },
          castTime: 0.15,
        },
        ult: {
          slot: "ult",
          name: "烈焰牛魔",
          brief: "变身 10 秒：免疫控制 + 身下火路；普攻引爆层数，击杀敌方英雄刷新持续时间",
          tags: ["buff", "dot", "heal"],
          desc: "牛魔化身烈焰牛魔，持续 {duration} 秒：免疫控制，移动时在身后留下火焰轨迹。期间每次普通攻击会消耗目标身上所有「磨砂火焰」层数，每层额外造成 {perStack}(+{adRatio%}物攻) 点魔法伤害，并回复自身 {healPerStack%} 最大生命；变身期间击杀敌方英雄可立刻刷新持续时间。",
          maxLevel: 3,
          cooldown: [80, 70, 60],
          manaCost: [100, 110, 120],
          cast: { type: "self", radius: 3.4 },
          values: {
            duration: 10,
            trailTick: 0.35,
            trailDur: 3,
            trailDps: [22, 34, 46],
            perStack: [45, 70, 95],
            adRatio: 0.25,
            healPerStack: 0.015,
          },
          castTime: 0.2,
        },
      },
      build: [
        "slippers",
        "red_bull_case",
        "liberation_shoes",
        "riot_armor",
        "fire_blanket",
        "sledgehammer",
        "pry_bar",
      ],
      palette: { primary: "#a8321c", secondary: "#2b211d", accent: "#ff9a3c", glow: "#ff5a1f" },
      look: "浑身浴火的牛头巨魔：暗红褐牛毛被地火烤得焦黑，牛角尖端燃着两簇火苗；肩背披着龟裂的熔岩甲，甲缝里透出橙红的光；右手一柄十字形巨剑，剑身中间一道竖槽里烧着长明火。走动时脚下拖出焦痕与火星。",
    },
    xingli: {
      id: "xingli",
      name: "王昭君",
      title: "落雁出塞",
      role: "mage",
      roleName: "法师",
      lane: "mid",
      difficulty: 2,
      lore: "西汉元帝时出塞和亲的王嫱，《汉书》《后汉书》有载。传说她在马上怀抱琵琶，曲声一起，南飞的大雁听得忘了振翅，纷纷落向平沙，于是有了「落雁」之名。",
      tips: "技能每打中一次留下一层「余音」，同一个人叠满三层就会眩晕。先放「回环收弦」把人圈住拉回来，再把大招盖上去。你很脆，站在队友身后弹，别让人近身。",
      attackType: "ranged",
      radius: 0.58,
      base: {
        hp: 3100,
        mana: 520,
        ad: 150,
        armor: 80,
        mr: 50,
        attackSpeed: 0.85,
        moveSpeed: 5.5,
        attackRange: 7.5,
        hpRegen: 7,
        manaRegen: 4.2,
      },
      growth: { hp: 225, mana: 125, ad: 8, armor: 14, mr: 6, attackSpeedPct: 0.01 },
      basicAttack: { windup: 0.3, damageType: "magic", projectile: "xingli_basic", projectileSpeed: 24 },
      passive: {
        name: "余音三叠",
        brief: "5 秒内命中同一目标 3 次：额外法术伤害 + 眩晕 0.75 秒",
        tags: ["control"],
        desc: "技能命中敌人会留下一层余音(持续 5 秒)。叠满 3 层时弦音共振：造成目标 6% 最大生命的法术伤害(对非英雄上限 300)并眩晕 0.75 秒。",
        values: { stacks: 3, duration: 5, hpRatio: 0.06, cap: 300, stun: 0.75 },
      },
      skills: {
        s1: {
          slot: "s1",
          name: "一弦穿云",
          brief: "直线音波：穿透全部目标，法术伤害",
          tags: ["burst"],
          desc: "拨动一弦，弹出一道穿透的弦音，对沿途所有敌人造成 {damage}(+{apRatio%}法强) 点法术伤害。",
          maxLevel: 6,
          cooldown: [6.3, 6, 5.7, 5.4, 5.1, 4.8],
          manaCost: [50, 55, 60, 65, 70, 75],
          cast: { type: "direction", range: 12, width: 1.3 },
          values: { damage: [280, 350, 420, 490, 560, 630], apRatio: 0.55, speed: 26 },
          castTime: 0.2,
        },
        s2: {
          slot: "s2",
          name: "回环收弦",
          brief: "0.6 秒后拉向中心：法术伤害 + 减速 45% / 2 秒",
          tags: ["control", "slow"],
          desc: "在目标位置拨出一圈回旋的曲音，{delay} 秒后收弦：造成 {damage}(+{apRatio%}法强) 点法术伤害，将敌人拉向中心并减速 {slow%}，持续 {slowDur} 秒。",
          maxLevel: 6,
          cooldown: [11, 10.6, 10.2, 9.8, 9.4, 9],
          manaCost: [70, 75, 80, 85, 90, 95],
          cast: { type: "position", range: 9, radius: 3.4 },
          values: {
            damage: [260, 325, 390, 455, 520, 585],
            apRatio: 0.5,
            delay: 0.6,
            pull: 1.6,
            slow: 0.45,
            slowDur: 2,
          },
          castTime: 0.25,
        },
        ult: {
          slot: "ult",
          name: "雁落平沙",
          brief: "5 波范围法术伤害（共 2.5 秒），每波减速 30%",
          tags: ["dot", "slow"],
          desc: "一曲引得群雁落向目标区域：{duration} 秒内俯冲 {waves} 波雁影，每波对区域内敌人造成 {damage}(+{apRatio%}法强) 点法术伤害并减速 {slow%}。每波都会附加一层余音。",
          maxLevel: 3,
          cooldown: [48, 43, 38],
          manaCost: [120, 130, 140],
          cast: { type: "position", range: 11, radius: 5.2 },
          values: {
            damage: [160, 230, 300],
            apRatio: 0.3,
            waves: 5,
            duration: 2.5,
            delay: 0.5,
            slow: 0.3,
            slowDur: 1,
          },
          castTime: 0.4,
        },
      },
      build: [
        "slippers",
        "radio",
        "canvas_shoes",
        "ddvp_concentrate",
        "baijiu",
        "air_cooler",
        "fire_blanket",
      ],
      palette: { primary: "#3d4c9e", secondary: "#f6f0e6", accent: "#c8324a", glow: "#a9d4ff" },
      look: "出塞的汉家女子：绛红斗篷配一圈蓬松的雪白毛领，头戴白毛帽箍，露出黑色发髻与金步摇；斗篷下是月白曲裾深衣与长绶带；怀里斜抱一把梨形四弦琵琶。神情沉静，施法时弦上泛起月色与金光。",
    },
    fengling: {
      id: "fengling",
      name: "李广",
      title: "汉之飞将",
      role: "marksman",
      roleName: "射手",
      lane: "bot",
      difficulty: 2,
      lore: "西汉名将，《史记·李将军列传》说他「猿臂善射」。夜里把草中巨石当成猛虎，一箭射去，箭头没进了石头；匈奴人叫他「汉之飞将军」，多年不敢来犯。",
      tips: "站住了不停射箭，越射越快，叠满五层还会加移速和伤害。被近身就用「飞将腾身」翻开，落地后的下一箭必定暴击。大招箭雨减速 35%，开团、断后都好用。",
      attackType: "ranged",
      radius: 0.58,
      base: {
        hp: 2900,
        mana: 440,
        ad: 168,
        armor: 78,
        mr: 50,
        attackSpeed: 0.95,
        moveSpeed: 5.5,
        attackRange: 8.2,
        hpRegen: 7,
        manaRegen: 3,
      },
      growth: { hp: 205, mana: 100, ad: 13, armor: 14, mr: 6, attackSpeedPct: 0.03 },
      basicAttack: {
        windup: 0.28,
        damageType: "physical",
        projectile: "fengling_basic",
        projectileSpeed: 30,
      },
      passive: {
        name: "猿臂连射",
        brief: "普攻命中叠连射（上限 5 层 / 3 秒）：每层攻速 +6%，满层移速 +10% 且普攻附带物理伤害",
        tags: ["buff"],
        desc: "普攻命中获得一层连射(最多 5 层，持续 3 秒)，每层提高 6% 攻速。满层时移速提高 10%，且普攻额外造成 20(+每级 4) 点物理伤害。",
        values: { maxStacks: 5, duration: 3, asPerStack: 0.06, haste: 0.1, bonus: 20, bonusPerLevel: 4 },
      },
      skills: {
        s1: {
          slot: "s1",
          name: "白羽没石",
          brief: "穿透箭：对英雄全额伤害、对小兵 60%，减速 30% / 1.5 秒",
          tags: ["burst", "slow"],
          desc: "引满长弓射出一支能没入石棱的重箭，贯穿沿途小兵，命中的第一个敌方英雄受到 {damage}(+{adRatio%}物攻) 点物理伤害并减速 {slow%}，持续 {slowDur} 秒(对沿途小兵/野怪造成 60% 伤害)。",
          maxLevel: 6,
          cooldown: [8, 7.6, 7.2, 6.8, 6.4, 6],
          manaCost: [50, 55, 60, 65, 70, 75],
          cast: { type: "direction", range: 14, width: 1.3 },
          values: {
            damage: [280, 350, 420, 490, 560, 630],
            adRatio: 1,
            slow: 0.3,
            slowDur: 1.5,
            speed: 32,
            minionRatio: 0.6,
          },
          castTime: 0.3,
        },
        s2: {
          slot: "s2",
          name: "飞将腾身",
          brief: "后跃：移速 +20% / 2 秒；4 秒内下次普攻必定暴击",
          tags: ["dash", "buff"],
          desc: "向指定方向腾身翻跃，落地后获得 {haste%} 移速加成持续 {hasteDur} 秒，且下一次普攻必定暴击。",
          maxLevel: 6,
          cooldown: [9, 8.5, 8, 7.5, 7, 6.5],
          manaCost: [40, 42, 44, 46, 48, 50],
          cast: { type: "direction", range: 5, width: 1.2 },
          values: { haste: 0.2, hasteDur: 2, critWindow: 4, dashSpeed: 26 },
          castTime: 0.05,
        },
        ult: {
          slot: "ult",
          name: "箭锁阴山",
          brief: "3 秒箭雨（每 0.5 秒一跳）+ 减速 35%",
          tags: ["slow", "dot"],
          desc: "仰射一簇羽箭，令箭雨封锁目标区域 {duration} 秒：每 {tick} 秒造成 {damage}(+{adRatio%}物攻) 点物理伤害并减速 {slow%}。",
          maxLevel: 3,
          cooldown: [50, 45, 40],
          manaCost: [110, 120, 130],
          cast: { type: "position", range: 11.5, radius: 5 },
          values: {
            damage: [95, 140, 185],
            adRatio: 0.4,
            duration: 3,
            tick: 0.5,
            delay: 0.5,
            slow: 0.35,
            slowDur: 0.8,
          },
          castTime: 0.4,
        },
      },
      build: [
        "slippers",
        "nail_gun",
        "running_shoes",
        "brick",
        "red_bull_case",
        "pry_bar",
        "sledgehammer",
      ],
      palette: { primary: "#2f7a78", secondary: "#e9e2cf", accent: "#c99a45", glow: "#9df5d2" },
      look: "高瘦的汉代边将(男)，双臂比常人长：鬓角微霜，头戴插着双鹖尾的武冠；苍青戎服外罩熟皮轻甲，只披左肩，短披风斜搭身后；右腰后一箙白羽箭，手持一张黑漆角弓。站姿沉稳，开弓极满。",
    },
    yeque: {
      id: "yeque",
      name: "荆轲",
      title: "易水壮士",
      role: "assassin",
      roleName: "刺客",
      lane: "jungle",
      difficulty: 3,
      lore: "战国末年的剑客，受燕太子丹之托入秦行刺。《史记·刺客列传》记他易水辞别，献上督亢地图，「图穷而匕首见」。",
      tips: "先在野区打野攒等级，再去各条路抓残血的人。敌人生命低于 40% 时你的伤害 +18%，拿到击杀或助攻会刷新一、二技能，可以接着追下一个。别第一个冲进人堆：等队友先上，再用大招贴上去收掉脆皮。",
      attackType: "melee",
      radius: 0.58,
      base: {
        hp: 3050,
        mana: 440,
        ad: 178,
        armor: 88,
        mr: 52,
        attackSpeed: 0.92,
        moveSpeed: 6,
        attackRange: 2.2,
        hpRegen: 8,
        manaRegen: 3,
      },
      growth: { hp: 250, mana: 100, ad: 13.5, armor: 16, mr: 6.5, attackSpeedPct: 0.022 },
      basicAttack: { windup: 0.3, damageType: "physical" },
      passive: {
        name: "一去不还",
        brief: "对生命低于 40% 的目标伤害 +18%；击杀回复 8% 最大生命并刷新",
        tags: ["burst"],
        desc: "抱定死志：对生命值低于 40% 的敌人造成的伤害提高 18%。参与击杀英雄后，立即刷新一、二技能冷却并回复 8% 最大生命。对野怪造成的伤害提高 25%。",
        values: { threshold: 0.4, bonus: 0.18, healHpRatio: 0.08, monsterBonus: 0.25 },
      },
      skills: {
        s1: {
          slot: "s1",
          name: "风萧易水",
          brief: "突刺穿透：物理伤害；命中英雄返还 40% 冷却",
          tags: ["dash"],
          desc: "像一阵寒风向指定方向疾刺穿过，对路径上的敌人造成 {damage}(+{adRatio%}物攻) 点物理伤害。若命中敌方英雄，这一招的冷却立即返还 {refund%}。",
          maxLevel: 6,
          cooldown: [7, 6.7, 6.4, 6.1, 5.8, 5.5],
          manaCost: [40, 44, 48, 52, 56, 60],
          cast: { type: "direction", range: 6.5, width: 2 },
          values: { damage: [200, 255, 310, 365, 420, 475], adRatio: 1, refund: 0.4, dashSpeed: 30 },
          castTime: 0.05,
        },
        s2: {
          slot: "s2",
          name: "引匕一掷",
          brief: "扇形 3 把匕首：物理伤害 + 减速 35% / 1.5 秒",
          tags: ["slow"],
          desc: "扇形掷出 3 把匕首，每把对命中的第一个敌人造成 {damage}(+{adRatio%}物攻) 点物理伤害并减速 {slow%}，持续 {slowDur} 秒(同一目标被多把命中时，后续匕首只造成 50% 伤害)。",
          maxLevel: 6,
          cooldown: [8, 7.6, 7.2, 6.8, 6.4, 6],
          manaCost: [50, 54, 58, 62, 66, 70],
          cast: { type: "direction", range: 9, width: 1 },
          values: {
            damage: [165, 210, 255, 300, 345, 390],
            adRatio: 0.65,
            slow: 0.35,
            slowDur: 1.5,
            blades: 3,
            spread: 16 * Ry,
            speed: 26,
            repeatRatio: 0.5,
          },
          castTime: 0.15,
        },
        ult: {
          slot: "ult",
          name: "卷尽匕现",
          brief: "突进至目标：物理伤害 + 20% 已损失生命法术伤害",
          tags: ["burst", "dash"],
          desc: "抖开督亢图卷遮住身形(期间不可被选中)，卷尽时人已欺到目标敌方英雄身边，一匕刺出：造成 {damage}(+{adRatio%}物攻) 外加目标 {missingRatio%} 已损生命的物理伤害。",
          maxLevel: 3,
          cooldown: [40, 35, 30],
          manaCost: [100, 105, 110],
          cast: { type: "target", range: 8 },
          values: { damage: [340, 510, 680], adRatio: 1.2, missingRatio: 0.2, vanish: 0.35 },
          castTime: 0.35,
        },
      },
      build: [
        "slippers",
        "sledgehammer",
        "canvas_shoes",
        "pry_bar",
        "brick",
        "red_bull_case",
        "fire_blanket",
      ],
      palette: { primary: "#3a3156", secondary: "#ece8de", accent: "#b48cff", glow: "#a886ff" },
      look: "精瘦冷峻的战国游侠：束发露面，一身近黑的墨紫劲装，束腕绑腿；颈后一条长长的素白巾拖在身后，末端像蘸了墨；背上斜挎一支图卷筒；右手反握一柄淬过药的青钢匕首，左手一把更小的副匕。跑动时身体压低。",
    },
    mushroom: {
      id: "mushroom",
      name: "杯杯菇",
      title: "菌盖如山",
      role: "tank",
      roleName: "坦克",
      lane: "top",
      difficulty: 2,
      lore: "山里长出来的一朵成了精的蘑菇。菌柄又粗又软，紫红的伞盖像倒扣的一只大杯子，孢子一喷就是一团呛人的粉雾。它自己也不太清楚为什么要上战场，只是觉得站在最前面、把同伴挡在身后，是件很自然的事。",
      tips: "你是队伍最前面那堵软墙：普攻和技能命中都会攒菌丝，攒满 7 层就炸开，顺手给自己糊一层等量的护盾；一技能「滚菌冲锋」缩成菌轮越滚越快，第一次撞到人能把人顶飞；二技能「孢子喷吐」喷出又远又窄的一道孢子雾，主要吃法强；大招「天降菌盖」可以砸到地图任意一点，飞得越远砸得越狠、范围越大，落点会先亮出来，记得提前量。",
      attackType: "melee",
      radius: 0.82,
      base: {
        hp: 3920,
        mana: 430,
        ad: 152,
        armor: 126,
        mr: 72,
        attackSpeed: 0.72,
        moveSpeed: 5.5,
        attackRange: 2.4,
        hpRegen: 12,
        manaRegen: 3,
      },
      growth: { hp: 350, mana: 95, ad: 9, armor: 25, mr: 9.5, attackSpeedPct: 0.012 },
      basicAttack: { windup: 0.42, damageType: "physical" },
      passive: {
        name: "菌丝缠缚",
        brief: "普攻与技能命中叠菌丝；7 层爆开：5% 最大生命法术伤害 + 等量护盾",
        tags: ["slow", "shield"],
        desc: "普攻和技能命中都会积攒 1 层菌丝（二技能每段最多 1 层）。叠到 {hits} 层时炸开：对目标额外造成 {hpRatio%} 最大生命的法术伤害并减速 {slow%}（{slowDur} 秒），同时给自己套上一层等同于该伤害的护盾，持续 {shieldDur} 秒。",
        values: { hits: 7, hpRatio: 0.05, slow: 0.3, slowDur: 1.2, shieldDur: 4 },
      },
      skills: {
        s1: {
          slot: "s1",
          name: "滚菌冲锋",
          brief: "侧滚 10 秒，可转向；碾压造成伤害 + 击飞 0.85 秒",
          tags: ["dash", "control"],
          desc: "把身子侧过来缩成一只菌轮，朝指定方向持续滚动 {rollTime} 秒，期间用移动指令可以不断改变方向：速度从 {dashSpeed} 一路提到 {maxSpeed}。被碾过的敌人每 {tickInterval} 秒受到 {damage}(+{hpRatio%}最大生命) 点物理伤害。每个单位第一次被撞到会被顶飞 {knockup} 秒，之后再撞只受 {followRatio%} 的伤害与击飞。撞墙即停，冷却从滚动结束后才开始计算。",
          maxLevel: 6,
          cooldown: [16, 15, 14, 13, 12, 11],
          manaCost: [60, 65, 70, 75, 80, 85],
          cast: { type: "direction", range: 9, width: 2.4 },
          values: {
            damage: [70, 105, 140, 175, 210, 245],
            hpRatio: 0.02,
            knockup: 0.85,
            followRatio: 0.4,
            dashSpeed: 11,
            maxSpeed: 12.6,
            accel: 1.6,
            rollTime: 10,
            tickInterval: 0.5,
            impactRadius: 2.2,
          },
          castTime: 0.12,
        },
        s2: {
          slot: "s2",
          name: "孢子喷吐",
          brief: "引导 8 秒持续喷吐：法术伤害 + 减速 40%，每秒消耗法力",
          tags: ["slow", "dot"],
          desc: "按住朝指定方向持续喷出孢子粉雾，每 {tickInterval} 秒对锥形内敌人造成 {damage}(+{apRatio%}法强) 点法术伤害并减速 {slow%}（{slowDur} 秒）。喷射期间每秒消耗 {manaPerSec} 点法力；法力耗尽、被控或再次按键即中断，中断后只需很短冷却。",
          maxLevel: 6,
          cooldown: [1.5, 1.5, 1.5, 1.5, 1.5, 1.5],
          manaCost: [25, 28, 31, 34, 37, 40],
          cast: { type: "cone", range: 9.2, angle: 56 * (Math.PI / 180) },
          values: {
            damage: [22, 30, 38, 46, 54, 62],
            apRatio: 0.18,
            slow: 0.4,
            slowDur: 1.2,
            manaPerSec: [30, 33, 36, 39, 42, 45],
            channelTime: 8,
            tickInterval: 0.25,
          },
          castTime: 0.1,
        },
        ult: {
          slot: "ult",
          name: "天降菌盖",
          brief: "蓄力跃击：范围法术伤害 + 击飞 0.9 秒；距离越远范围越大",
          tags: ["control", "dash"],
          desc: "蹲下把菌盖压得吱吱响，蓄力 {warnTime} 秒（落点会提前亮出警示），可以砸向地图上任意一点。飞得越远砸得越狠：落地半径从 {radiusMin} 一路长到 {radiusMax}，伤害最多再翻一倍；命中造成 {damage}(+{hpRatio%}最大生命) 点法术伤害并击飞 {knockup} 秒。蓄力与跃起期间免疫控制。",
          maxLevel: 3,
          cooldown: [70, 62, 54],
          manaCost: [110, 120, 130],
          cast: { type: "position", range: 120, radius: 3.4 },
          values: {
            damage: [300, 450, 600],
            hpRatio: 0.06,
            knockup: 0.9,
            warnTime: 1.8,
            leapTime: 0.6,
            radiusMin: 3.4,
            radiusMax: 9,
            farRange: 60,
            farDamage: 1,
          },
          castTime: 0.2,
        },
      },
      build: [
        "slippers",
        "riot_armor",
        "liberation_shoes",
        "fire_blanket",
        "big_quilt",
        "barbed_fence",
        "air_cooler",
      ],
      palette: { primary: "#7c3aed", secondary: "#f3e7d0", accent: "#a78bfa", glow: "#c4a2ff" },
      look: "一朵成了精的紫色大蘑菇：粗壮圆胖的奶白菌柄就是身子，菌颈处透出淡淡紫色；头顶倒扣着一只巨大的紫红伞盖，盖面是带绒光的紫，点缀着几块奶白色圆斑，盖底是放射状的浅色菌褶。菌柄中段有一张憨厚的脸：两只圆眼睛、粉腮红、小小的嘴。四肢短粗，拳头圆滚滚。",
    },
    xuesong: {
      id: "xuesong",
      name: "雪松老师",
      title: "上课了",
      role: "support",
      roleName: "辅助",
      lane: "bot",
      difficulty: 2,
      lore: "扛着一把大铁锹走上讲台也走上战场的老师。嘴上总挂着「上课了」，辅助不靠奶量，靠改地形、开视野和控制替队友把场子控得死死的。",
      tips: "辅助不靠奶量，靠改地形和控制：被动让普攻攻速减少 70%，但每次普攻都会横扫锥形范围造成伤害并眩晕；一技能「挖土」原地花 2 秒挖出 60 秒无法通行的沙坑封路，随后 10 秒内可将沙子抛出造成少量伤害和致盲；二技能「立定撑篙」把自己高高撑起变为不可选中状态并给队友大幅开视野，最多持续 8 秒，二次释放选落点跳下给周围友军加护盾；大招「颠勺铁锹」伸长手臂铲起一名敌人高举压制 2.5 秒，随后可将其投掷到身边任意位置并造成伤害和眩晕。",
      attackType: "ranged",
      radius: 0.72,
      base: {
        hp: 3050,
        mana: 520,
        ad: 168,
        armor: 112,
        mr: 68,
        attackSpeed: 0.9,
        moveSpeed: 5.5,
        attackRange: 5.6,
        hpRegen: 10,
        manaRegen: 4,
      },
      growth: { hp: 270, mana: 105, ad: 10, armor: 18, mr: 8.5, attackSpeedPct: 0.015 },
      basicAttack: { windup: 0.42, damageType: "physical" },
      passive: {
        name: "警告铁锹",
        brief: "攻速减少 70%，但普攻变为锥形范围伤害并造成眩晕",
        tags: ["control"],
        desc: "攻速减少 {asPenalty%}，但是普攻变成范围伤害，能够对前方锥形范围内的所有敌人造成伤害与 {stunDur} 秒眩晕。",
        values: { asPenalty: 0.7, coneAngle: 68, stunDur: 0.55, aoeRatio: 0.9 },
      },
      skills: {
        s1: {
          slot: "s1",
          name: "挖土",
          brief: "原地 2 秒挖出 60 秒阻挡通行的沙坑；10 秒内抛沙造成伤害与致盲",
          tags: ["control"],
          desc: "原地花 {digTime} 秒铲起一铁锹沙子，在面前挖出半径 {pitRadius} 的沙坑，沙坑在 {pitDur} 秒内无法行走经过；随后 {holdDur} 秒内再次施放可将沙子抛出，对落点敌人造成 {damage}(+{apRatio%}法强) 点法术伤害并致盲 {blindDur} 秒（普攻全部落空）。",
          maxLevel: 6,
          cooldown: [16, 15, 14, 13, 12, 11],
          manaCost: [55, 60, 65, 70, 75, 80],
          cast: { type: "self", radius: 2.2 },
          recastBuff: "xuesong_sand",
          recastCast: { type: "position", range: 8.5, radius: 3.0 },
          values: {
            digTime: 2,
            pitRadius: 2.2,
            pitDur: 60,
            holdDur: 10,
            damage: [220, 285, 350, 415, 480, 545],
            apRatio: 0.75,
            blindDur: [2.8, 3.1, 3.4, 3.7, 4.0, 4.4],
          },
          castTime: 0.15,
        },
        s2: {
          slot: "s2",
          name: "立定撑篙",
          brief: "原地撑起变不可选中并给全队开大视野最多 8 秒；二段选落点跳下给友军套盾",
          tags: ["shield", "dash", "buff"],
          desc: "原地用铁锹把自己高高撑起来，变为不可选中状态并无法移动，最多持续 {maxDur} 秒，期间大幅扩大自身视野并为队友提供高空视野（可看穿草丛）；二次施放可选择一个落点跳下来，使落点周围的友军获得 {shield}(+{hpRatio%}最大生命) 点护盾，持续 {shieldDur} 秒。",
          maxLevel: 6,
          cooldown: [18, 17, 16, 15, 14, 13],
          manaCost: [65, 70, 75, 80, 85, 90],
          cast: { type: "self", radius: 0 },
          recastBuff: "xuesong_pole",
          recastCast: { type: "position", range: 7.5, radius: 3.8 },
          values: {
            maxDur: 8,
            sightRange: 26,
            leapRange: 7.5,
            leapTime: 0.45,
            shieldRadius: 3.8,
            shield: [260, 340, 420, 500, 580, 660],
            hpRatio: 0.08,
            shieldDur: 4,
          },
          castTime: 0.14,
        },
        ult: {
          slot: "ult",
          name: "颠勺铁锹",
          brief: "伸手铲起一名敌人高举压制 2.5 秒；二段将其投掷到身边任意位置造成伤害与眩晕",
          tags: ["control", "burst"],
          desc: "伸长手臂用铁锹铲起一名敌方英雄并高高举起压制 {holdDur} 秒，随后可再次施放将敌人投掷到身边的任意位置，落地对范围内敌人造成 {damage}(+{apRatio%}法强) 点法术伤害并眩晕 {stunDur} 秒。",
          maxLevel: 3,
          cooldown: [58, 50, 42],
          manaCost: [100, 110, 120],
          cast: { type: "target", range: 6.5 },
          recastBuff: "xuesong_scoop",
          recastCast: { type: "position", range: 7, radius: 2.6 },
          values: {
            holdDur: 2.5,
            throwRange: 7,
            landRadius: 2.6,
            damage: [320, 460, 600],
            apRatio: 0.65,
            stunDur: [1.2, 1.4, 1.6],
          },
          castTime: 0.18,
        },
      },
      build: [
        "slippers",
        "fire_hydrant",
        "liberation_shoes",
        "big_pot",
        "steel_basin",
        "fire_blanket",
        "air_cooler",
      ],
      palette: { primary: "#2e6b58", secondary: "#ece6d6", accent: "#d9a24b", glow: "#7ee8c0" },
      look: "身着松绿大衣、浅色衬衫和暖金领带的老师，戴着黑框方眼镜，右手扛着一把长杆宽头大铁锹。挖土、撑篙、颠勺全凭手中铁锹，沉稳中带着一股讲台威严。",
    },
    stone: {
      id: "stone",
      name: "小肥石",
      title: "一块会滚的石头",
      role: "fighter",
      roleName: "战士",
      lane: "top",
      difficulty: 2,
      lore: "顶着一顶祖传黄安全帽、圆滚滚会翻跟头的大石块。腿短跑不快，但越练越肉、越练越狠，粘上人就赖着不走。",
      tips: "用机动性换成长性的重装战士：被动减少 15% 受到的暴击伤害，每 7 秒强化一次普攻；一技能「练功」原地锻炼最多 10 秒，期间不能走但能普攻和放技能，虽然挨打更疼，但能永久加血量、护甲和攻击力，撑得越久涨得越多；二技能「抓起来锤」锁住敌方英雄减速 50% 并被他带着跑 3 秒，期间一直敲他，打死还能抓起尸体扔出去砸飞一片，对小兵野怪则可以直接扔；大招「自重跳」远远跳进人群砸地减速，落地自带 40% 免伤。",
      attackType: "melee",
      radius: 0.78,
      base: {
        hp: 4100,
        mana: 440,
        ad: 160,
        armor: 128,
        mr: 68,
        attackSpeed: 0.82,
        moveSpeed: 5.25,
        attackRange: 2.35,
        hpRegen: 12,
        manaRegen: 3.2,
      },
      growth: { hp: 350, mana: 85, ad: 10.5, armor: 24, mr: 9.5, attackSpeedPct: 0.015 },
      basicAttack: { windup: 0.36, damageType: "physical" },
      passive: {
        name: "祖传安全帽",
        brief: "受到暴击伤害 -15%；每 7 秒强化一次普攻附带额外伤害",
        tags: ["defense", "burst"],
        desc: "受到的暴击伤害减少 {critRed%}；每 {cd} 秒强化一次普攻，下次普攻额外造成 {bonusDmg}(+{adRatio%}物攻) 点物理伤害。",
        values: { critRed: 0.15, cd: 7, bonusDmg: 75, adRatio: 0.45 },
      },
      skills: {
        s1: {
          slot: "s1",
          name: "练功",
          brief: "原地锻炼 7 秒每秒叠 1 层，期间击杀小兵野怪 +1 层、杀英雄 +4 层，永久加血甲攻且死亡不清空",
          tags: ["buff"],
          desc: "原地锻炼 {maxDur} 秒：期间无法移动，但可以穿插技能与普攻，受到伤害提高 {vuln%}。每秒叠加 1 层练功底子（完整 7 秒得 7 层），锻炼期间击杀小兵或野怪额外得 {killBonusUnit} 层、击杀敌方英雄额外得 {killBonusHero} 层。每层永久提升 +{hpPerStack} 最大生命、+{armorPerStack} 护甲与 +{adPerStack} 攻击力，死亡后层数与属性永久保留不清空。",
          maxLevel: 6,
          cooldown: [16, 15, 14, 13, 12, 11],
          manaCost: [45, 50, 55, 60, 65, 70],
          cast: { type: "self", radius: 0 },
          recastBuff: "stone_train",
          recastCast: { type: "self", radius: 0 },
          values: {
            maxDur: 7,
            vuln: 0.3,
            hpPerStack: [12, 14.5, 17, 19.5, 22, 25],
            armorPerStack: [1.5, 1.8, 2.1, 2.4, 2.7, 3.0],
            adPerStack: [1.5, 1.8, 2.1, 2.4, 2.7, 3.0],
            killBonusUnit: 1,
            killBonusHero: 4,
          },
          castTime: 0.1,
        },
        s2: {
          slot: "s2",
          name: "抓起来锤",
          brief: "获得 50%-80% 攻速，锁住英雄减速 50% 被带着走 3 秒，击杀后可扔尸体击飞；对小兵野怪直接扔",
          tags: ["control", "slow", "buff"],
          desc: "自身在 {asDur} 秒内获得 {asBonus%} 攻速提升，并锁住范围内一名敌人：对英雄减速 {slow%}，{lockDur} 秒内被其移动或传送带着走，期间可持续普攻；目标阵亡后 {corpseDur} 秒内可再次施放，抓起尸体投掷到指定位置，造成 {throwDmg}(+{adRatio%}物攻) 点物理伤害并击飞 {knockup} 秒。对非英雄单位可直接抓起投掷。",
          maxLevel: 6,
          cooldown: [13, 12.2, 11.4, 10.6, 9.8, 9],
          manaCost: [55, 60, 65, 70, 75, 80],
          cast: { type: "target", range: 5.5, anyUnit: !0 },
          recastBuff: "stone_corpse",
          recastCast: { type: "position", range: 7.5, radius: 2.6 },
          values: {
            slow: 0.5,
            lockDur: 3,
            asBonus: [0.5, 0.56, 0.62, 0.68, 0.74, 0.8],
            asDur: 3,
            corpseDur: 5,
            throwRange: 7.5,
            landRadius: 2.6,
            throwDmg: [240, 300, 360, 420, 480, 540],
            adRatio: 0.75,
            knockup: 0.9,
          },
          castTime: 0.14,
        },
        ult: {
          slot: "ult",
          name: "自重跳",
          brief: "跃向远处落点砸地造成伤害和减速，落地获得 40% 免伤",
          tags: ["dash", "slow", "defense"],
          desc: "跃向远处落点，砸地对范围内敌人造成 {damage}(+{adRatio%}物攻+{hpRatio%}最大生命) 点物理伤害并减速 {slow%}，持续 {slowDur} 秒；落地后获得 {reduction%} 免伤，持续 {drDur} 秒。",
          maxLevel: 3,
          cooldown: [48, 42, 36],
          manaCost: [95, 105, 115],
          cast: { type: "position", range: 11.5, radius: 3.4 },
          values: {
            leapTime: 0.62,
            damage: [340, 490, 640],
            adRatio: 0.85,
            hpRatio: 0.08,
            slow: 0.45,
            slowDur: 2.5,
            reduction: 0.4,
            drDur: 4.5,
          },
          castTime: 0.14,
        },
      },
      build: [
        "slippers",
        "red_bull_case",
        "liberation_shoes",
        "riot_armor",
        "fire_blanket",
        "sledgehammer",
        "big_quilt",
      ],
      palette: { primary: "#7c776e", secondary: "#46423d", accent: "#e8b93c", glow: "#ffcf66" },
      look: "一块戴着祖传黄安全帽的敦实石头，平时滚着走路，打起架来稳如泰山。",
    },
    scallion: {
      id: "scallion",
      name: "葱仔仔",
      title: "一根会刺人的葱小孩",
      role: "marksman",
      roleName: "射手",
      lane: "bot",
      difficulty: 2,
      lore: "一根脾气不太好、顶着炸毛绿葱叶到处乱窜的葱小孩。别人说他太扎眼，他就越滑越来劲，近身能拍人，远处能丢葱叶，急眼了直接憋出一管绿光气功波。",
      tips: "不打架的时候一直跑会越滑越快，支援转线很快。对拼开二技能加攻速加射程，每四下普攻白送一次无前摇葱锋还能叠破甲；大招先闪现找好角度再喷葱击波，期间靠方向键慢慢甩头扫人。",
      attackType: "both",
      radius: 0.56,
      base: {
        hp: 2900,
        mana: 450,
        ad: 172,
        armor: 76,
        mr: 50,
        attackSpeed: 0.96,
        moveSpeed: 5.55,
        attackRange: 4.2,
        hpRegen: 7,
        manaRegen: 3.2,
      },
      growth: { hp: 200, mana: 100, ad: 10.8, armor: 13.5, mr: 6, attackSpeedPct: 0.032 },
      basicAttack: {
        windup: 0.24,
        damageType: "physical",
      },
      passive: {
        name: "飘逸刺头",
        brief: "脱战持续移动 8 秒内移速最高加 15% 到 60%（随等级提升）；同时属于远程和近战",
        tags: ["buff"],
        desc: "他的绿头发很扎眼，越滑越兴奋。非战斗状态持续移动时移速不断提升，8 秒后达到上限，最多提高 15% 到 60%（随等级提升）。他同时属于远程和近战。",
        values: { rampSec: 8, minHaste: 0.15, maxHaste: 0.6, combatDelay: 3.5 },
      },
      skills: {
        s1: {
          slot: "s1",
          name: "葱锋",
          brief: "主动直线拍击造成伤害和可叠加破甲；被动每四下普攻自动白送一次 25% 伤害的葱锋",
          tags: ["burst", "buff"],
          desc: "主动：用葱绿朝前方拍击，对直线范围内敌人造成 {damage}(+{adRatio%}物攻) 点物理伤害，并施加一层护甲破损，降低 {shred%} 护甲（最多叠 {maxStacks} 层，持续 {shredDur} 秒）。被动：每 4 次普通攻击自动触发一次没有前摇后摇的葱锋，造成 {passiveRatio%} 伤害。",
          maxLevel: 6,
          cooldown: [6.5, 6.1, 5.7, 5.3, 4.9, 4.5],
          manaCost: [40, 44, 48, 52, 56, 60],
          cast: { type: "direction", range: 8.8, width: 2.3 },
          values: {
            damage: [210, 265, 320, 375, 430, 485],
            adRatio: 0.85,
            shred: [0.08, 0.09, 0.1, 0.11, 0.12, 0.13],
            maxStacks: 4,
            shredDur: 5,
            passiveRatio: 0.25,
            hitsToProc: 4,
          },
          castTime: 0.16,
        },
        s2: {
          slot: "s2",
          name: "葱能爆发",
          brief: "8 秒内大幅提高攻速和射程",
          tags: ["buff"],
          desc: "鼓起全身葱劲，在 {duration} 秒内获得 {asBonus%} 攻速提升，并使普攻抽打射程额外提升 {rangeBonus} 米。",
          maxLevel: 6,
          cooldown: [14, 13.2, 12.4, 11.6, 10.8, 10],
          manaCost: [55, 58, 61, 64, 67, 70],
          cast: { type: "self" },
          values: {
            duration: 8,
            asBonus: [0.35, 0.43, 0.51, 0.59, 0.67, 0.75],
            rangeBonus: [1.5, 1.7, 1.9, 2.1, 2.3, 2.5],
          },
          castTime: 0.06,
        },
        ult: {
          slot: "ult",
          name: "葱击波",
          brief: "闪现到目标点，原地喷出 3 秒可缓慢转向的绿色葱能激光，造成物理与敌人当前生命比例伤害；再次按大招可提前中断",
          tags: ["dash", "burst", "slow"],
          desc: "先闪现到范围内指定位置，随后在 {duration} 秒内向前喷射持续的绿色葱能激光。喷射期间自身无法移动，但可通过移动方向缓慢转动激光扫射，每跳造成 {tickDamage}(+{adRatio%}物攻) 外加目标当前生命值 {curHpPct%} 的物理伤害并减速 {slow%}，持续 {slowDur} 秒。期间再次按大招可主动提前中断。",
          maxLevel: 3,
          cooldown: [46, 40, 34],
          manaCost: [95, 105, 115],
          cast: { type: "position", range: 7.5, radius: 1.5 },
          recastBuff: "scallion_beam",
          recastCast: { type: "self" },
          values: {
            duration: 3,
            beamLength: 13.5,
            beamWidth: 2.3,
            tickInterval: 0.25,
            tickDamage: [115, 162, 210],
            adRatio: 0.34,
            curHpPct: [0.025, 0.032, 0.04],
            slow: 0.4,
            slowDur: 0.8,
            turnRate: 1.15,
          },
          castTime: 0.08,
        },
      },
      build: [
        "slippers",
        "nail_gun",
        "running_shoes",
        "brick",
        "red_bull_case",
        "pry_bar",
        "sledgehammer",
      ],
      palette: { primary: "#2ea843", secondary: "#eef7e6", accent: "#a6f052", glow: "#6bff78" },
      look: "一根顶着蓬松刺头绿葱叶、踩着小滑板乱窜的葱小孩，浑身散发刺鼻又精神的葱味。",
    },
    paperboy: {
      id: "paperboy",
      name: "纸札人",
      title: "替身先碎",
      role: "support",
      roleName: "辅助",
      lane: "bot",
      difficulty: 1,
      lore: "一个脸涂大红嘴、身上贴满白纸条的纸扎小人。总把一个替身放在自家塔下晃悠，平时拿着大唢呐围着人吹，真被打死时替身一碎，自己跑回塔下，顺手把对面身上攒了一堆的晦气全点爆。",
      tips: "你是高仇恨反手自爆辅助：进团先开大招绑住己方主力分摊伤害并给打人的敌人狂叠晦气，再吹一技能唢呐在人堆里顶着盾叠晦气。队友吃控就丢二技能纸鹤解控提速。身上有替身时不怕死，被打死替身先碎，不仅回血换位逃回塔下，还会直接引爆周围敌人身上所有晦气。",
      attackType: "ranged",
      radius: 0.56,
      base: {
        hp: 2400,
        mana: 480,
        ad: 132,
        armor: 84,
        mr: 58,
        attackSpeed: 0.85,
        moveSpeed: 5.5,
        attackRange: 6.4,
        hpRegen: 8,
        manaRegen: 4.5,
      },
      growth: { hp: 176, mana: 110, ad: 8.5, armor: 14, mr: 7, attackSpeedPct: 0.02 },
      basicAttack: {
        windup: 0.28,
        damageType: "magic",
        projectile: "paperboy_basic",
        projectileSpeed: 24,
      },
      passive: {
        name: "纸替身/人殉",
        brief: "每 22 到 14 秒在最近去过的己方塔下生一个替身；致命伤替身碎裂回血 30%-70% 并换位，引爆防御塔射程内所有敌人晦气",
        tags: ["defense", "burst"],
        desc: "每 22 到 14 秒（随等级缩短）生成一个替身灵体，在自己最近去过的己方存活防御塔下游荡。受到致命伤害时替身碎裂，回复 30% 到 70% 最大生命值（随等级提高）并将自己替换到替身位置，同时引爆大范围（防御塔攻击半径）内所有敌人的晦气层数。晦气永久存在，仅在爆发后清零或回到泉水慢慢消解，每层爆发造成目标 1% 最大生命值真实伤害，能扣除的血量以白色血条显示。",
        values: {
          effigyCd: 22,
          effigyCdMin: 14,
          minHeal: 0.3,
          maxHeal: 0.7,
          radius: 8.5,
          pctPerStack: 0.01,
          fountainDecayPerSec: 2.5,
        },
      },
      skills: {
        s1: {
          slot: "s1",
          name: "唢呐齐响",
          brief: "吹响唢呐得 5 秒护盾，大范围内敌人每秒叠加晦气（随技能与英雄等级越来越快），护盾碎了就停",
          tags: ["defense", "burst"],
          desc: "原地吹响唢呐，获得持续 {duration} 秒的 {shield}(+{hpRatio%}最大生命) 点护盾；护盾存在期间，大范围（防御塔攻击半径）内的敌人每秒叠加 {stacksPerSec} 层晦气（英雄每升 4 级额外多叠 1 层）。护盾被打破则吹唢呐立刻中断。",
          maxLevel: 6,
          cooldown: [10.5, 9.9, 9.3, 8.7, 8.1, 7.5],
          manaCost: [55, 60, 65, 70, 75, 80],
          cast: { type: "self", radius: 8.5 },
          values: {
            duration: 5,
            shield: [280, 360, 440, 520, 600, 680],
            hpRatio: 0.1,
            radius: 8.5,
            stacksPerSec: [2, 3, 5, 7, 9, 11],
          },
          castTime: 0.12,
        },
        s2: {
          slot: "s2",
          name: "纸鹤传书",
          brief: "纸鹤飞向友军解除并免疫控制 1 秒，自己和该队友都得 40%-80% 爆发移速",
          tags: ["buff", "defense"],
          desc: "放出一只纸鹤飞向范围内一名友军：立刻解除其身上的控制效果，并在 {immuneDur} 秒内免疫控制；同时纸札人与该队友都获得 {haste%} 爆发移速，持续 {hasteDur} 秒。",
          maxLevel: 6,
          cooldown: [13, 12.2, 11.4, 10.6, 9.8, 9],
          manaCost: [50, 55, 60, 65, 70, 75],
          cast: { type: "target", range: 11, ally: !0, selfFallback: !0 },
          values: {
            immuneDur: 1,
            haste: [0.4, 0.48, 0.56, 0.64, 0.72, 0.8],
            hasteDur: 2.5,
            speed: 32,
          },
          castTime: 0.1,
        },
        ult: {
          slot: "ult",
          name: "扎筋点睛",
          brief: "绑定友军替其扛 30% 伤害并给打人者叠晦气；也可对自己用，不免伤但挨打就给敌人叠晦气",
          tags: ["defense", "buff"],
          desc: "用红线绑定范围内一名友军或自己，持续 {duration} 秒：绑定友军时替其承受 {share%} 伤害并按伤害给攻击者叠晦气；对自己施放时无法减伤，但所有攻击自己的敌人都会按伤害量自动叠加晦气层数。",
          maxLevel: 3,
          cooldown: [42, 36, 30],
          manaCost: [80, 90, 100],
          cast: { type: "target", range: 11.5, ally: !0, selfFallback: !0 },
          values: {
            duration: [8, 10, 12],
            share: 0.3,
            dmgPerStack: 95,
            maxStacksPerHit: 6,
            breakRange: 18,
          },
          castTime: 0.14,
        },
      },
      build: [
        "slippers",
        "lunchbox",
        "liberation_shoes",
        "riot_armor",
        "fire_blanket",
        "big_quilt",
        "air_cooler",
      ],
      palette: { primary: "#d9e6f0", secondary: "#2a3140", accent: "#e84a5f", glow: "#c9f7ff" },
      look: "贴着白纸黑冠、涂着大红嘴唇的纸扎小人，怀里揣着纸鹤与唢呐，站在人堆里阴森又扎眼。",
    },
    maggot: {
      id: "maggot",
      name: "活蛆",
      title: "分解者",
      role: "marksman",
      roleName: "射手",
      lane: "bot",
      difficulty: 2,
      lore: "一条白白胖胖、一节一节扭着走的分解者肥蛆。最喜欢吃东西拉粪污、把小坨合成金光闪闪的大粪污，靠在粪堆边上普攻专治皮糙肉厚的大肉盾。",
      tips: "你是百分比魔法伤害专治坦克的阵地射手：吃消耗品五秒后会伴随屁声原地生一坨小粪污，一技能喷吐沾满三秒也会生小粪污，大招噗叽啪冷却很短可以远距离不停砸小粪污。两坨小粪污合成中粪污，两坨中粪污合成金光大粪污，二技能能把大范围所有粪污一口气吸到身边合成大粪污。自己能随便穿粪污走位，靠在粪污旁边站撸攻速和百分比魔法伤害高得吓人。",
      attackType: "ranged",
      radius: 0.58,
      base: {
        hp: 2950,
        mana: 460,
        ad: 156,
        armor: 76,
        mr: 54,
        attackSpeed: 0.92,
        moveSpeed: 5.45,
        attackRange: 6.5,
        hpRegen: 7.5,
        manaRegen: 4.5,
      },
      growth: { hp: 205, mana: 105, ad: 9.2, armor: 12, mr: 6.5, attackSpeedPct: 0.032 },
      basicAttack: {
        windup: 0.24,
        damageType: "physical",
        projectile: "maggot_basic",
        projectileSpeed: 28,
      },
      passive: {
        name: "分解者",
        brief: "吃消耗品 5 秒后放屁生小粪污；能穿粪污；身边有粪污时普攻多吐粑粑碎片并附带最大生命值魔法伤害",
        tags: ["buff", "burst"],
        desc: "每次食用消耗品装备，会在 5 秒后伴随屁声在原地生成一坨小粪污。活蛆可以自由穿越粪污地形而不受阻挡。身边 5.7 米内有粪污时叠便便层数提升攻速，且普攻会额外吐出粑粑碎片附带目标最大生命值百分比魔法伤害：附近有小粪污额外吐 1 块小粑粑，中粪污额外吐 2 块小粑粑，金色大粪污额外吐 1 块金色粑粑碎片。",
        values: {
          digestDelay: 5,
          auraRadius: 5.67,
          asPerPower: 0.12,
          hpPctPerPower: 0.015,
          maxPower: 10,
          monsterCapPerPower: 120,
          smallDur: 8,
          medDur: 24,
          largeDur: 64,
        },
      },
      skills: {
        s1: {
          slot: "s1",
          name: "喷吐",
          brief: "跟着头朝向持续喷吐 5 秒散碎粪便，命中敌人满 3 秒生小粪污；两小合中，两中合金色大粪污",
          tags: ["burst", "control"],
          desc: "顺着活蛆当前朝向持续喷吐 {duration} 秒散碎粪便（喷吐方向会随头朝向实时转动），每秒造成多次 {tickDamage}(+{apRatio%}) 点魔法伤害；敌人被喷中累计满 {coatSec} 秒时脚下形成一坨小粪污。小粪污持续 8 秒并阻挡行走，两坨小粪污滑到一起融合为持续 24 秒的中粪污，两坨中粪污融合为持续 64 秒的金色大粪污，大粪污吸收小粪污可刷新持续时间。",
          maxLevel: 6,
          cooldown: [11, 10.4, 9.8, 9.2, 8.6, 8],
          manaCost: [55, 60, 65, 70, 75, 80],
          cast: { type: "direction", range: 8.5, width: 2.4 },
          values: {
            duration: 5,
            tickDamage: [24, 30, 36, 42, 48, 54],
            apRatio: 0.15,
            coatSec: 3,
          },
          castTime: 0.1,
        },
        s2: {
          slot: "s2",
          name: "吸粪机",
          brief: "把大范围内所有粪污平滑吸到身边聚拢融合",
          tags: ["buff", "control"],
          desc: "猛吸一口气，将 {radius} 米大范围内所有粪污平滑吸回自己身边聚拢，满足两小合中、两中合金的粪污会自动依次融合成更大的粪污或刷新金色大粪污。",
          maxLevel: 6,
          cooldown: [14, 13, 12, 11, 10, 9],
          manaCost: [50, 55, 60, 65, 70, 75],
          cast: { type: "self", radius: 13 },
          values: {
            radius: 13,
            poseDur: 0.65,
          },
          castTime: 0.12,
        },
        ult: {
          slot: "ult",
          name: "噗叽啪",
          brief: "远距离高射一坨小粪污导弹，便便层数每高 1 层伤害按 150% 累乘、蓝耗按 180% 累乘",
          tags: ["burst", "control"],
          desc: "向远处目标圆圈高抛射出一坨小粪污导弹，{delay} 秒后噗叽啪砸下，造成 {damage}(+{adRatio%}物攻+{apRatio%}法强) 点魔法伤害与 {slow%} 减速，并在落点生成一坨小粪污。身边每有 1 层便便加成，本次大招伤害按 150% 累乘，同时法力消耗按 180% 累乘。",
          maxLevel: 3,
          cooldown: [12, 9.5, 7],
          manaCost: [45, 50, 55],
          cast: { type: "position", range: 13.5, radius: 2.6 },
          values: {
            delay: 0.65,
            damage: [240, 340, 440],
            adRatio: 0.75,
            apRatio: 0.65,
            slow: 0.3,
            slowDur: 1.2,
            ultDmgMult: 1.5,
            ultManaMult: 1.8,
          },
          castTime: 0.12,
        },
      },
      build: [
        "slippers",
        "nail_gun",
        "running_shoes",
        "brick",
        "red_bull_case",
        "pry_bar",
        "sledgehammer",
      ],
      palette: { primary: "#ebe6cf", secondary: "#6b4a24", accent: "#f5c842", glow: "#b8e04b" },
      look: "一条白白胖胖、扭来扭去的肥蛆，周围堆满大小粪污和金灿灿的大便便，靠在粪堆旁边专咬肉盾。",
    },
    horseman: {
      id: "horseman",
      name: "半马人",
      title: "四条腿的怪人",
      role: "fighter",
      roleName: "战士",
      lane: "top",
      difficulty: 1,
      lore: "上半身是人、下半身是四条马腿的怪人。站着跟人对砍笨手笨脚就是个废物，可一旦甩开四条蹄子跑起来，那就是见谁撞谁的怪物。",
      tips: "站着打是废物，跑起来是怪物：不停跑满 5 秒且不平砍就能攒出长距离冲锋普攻，移速越快伤害越高而且没有上限，冲刺过程会把沿途所有敌人都撞开；接着按住一技能转身拿屁股对准方向蓄力，蓄越久长方形射程越长、击退越远，蓄满还能暴击；被围攻按二技能嘶鸣免控兼削弱对面伤害，拿人头刷新大招继续狂奔。",
      attackType: "melee",
      radius: 0.64,
      base: {
        hp: 3420,
        mana: 440,
        ad: 162,
        armor: 102,
        mr: 56,
        attackSpeed: 0.82,
        moveSpeed: 5.95,
        attackRange: 2.3,
        hpRegen: 9.5,
        manaRegen: 3.4,
      },
      growth: { hp: 315, mana: 90, ad: 12.2, armor: 20, mr: 8.5, attackSpeedPct: 0.018 },
      basicAttack: { windup: 0.3, damageType: "physical" },
      passive: {
        name: "人马一体",
        brief: "持续跑 5 秒不普攻后普攻变长距离冲锋：沿途撞开所有敌人，移速越快伤害越高且无上限",
        tags: ["dash", "burst", "control"],
        desc: "持续移动 5 秒且不普攻后，下一次普攻变为长距离冲锋：猛冲一段远距离，沿途撞开并击飞所有碰到的敌人；冲锋伤害随当前移动速度持续拔高，增幅没有上限，跑得越快撞得越痛。",
        values: {
          runTime: 5,
          bonusRange: 4.5,
          minDash: 5.0,
          maxDash: 7.4,
          dashSpeed: 26,
          hitRadius: 1.15,
          minBonus: 0.3,
          msFloor: 4.5,
          msScale: 0.25,
          knockDist: 3.4,
          sideKnock: 2.6,
          knockAir: 0.34,
        },
      },
      skills: {
        s1: {
          slot: "s1",
          name: "后腿蹬",
          brief: "长方形蓄力猛蹬：蓄越久射程越长、击退越远，蓄满可暴击",
          tags: ["burst", "control"],
          desc: "冷却较短。按住蓄力期间不可移动并立刻把屁股对准目标方向，长方形射程随蓄力从 {minRange} 米拉长到 {maxRange} 米（最长蓄力 {maxCharge} 秒）；松手后用后腿猛蹬，造成 {minDamage}～{damage}(+{adRatio%}物攻) 点物理伤害、击退 {minKnock}～{knockDist} 米并眩晕 {minStun}～{stunDur} 秒。蓄力满时该次伤害可以暴击。",
          maxLevel: 6,
          cooldown: [5.5, 5.0, 4.6, 4.2, 3.8, 3.5],
          manaCost: [35, 37, 39, 41, 43, 45],
          holdCharge: !0,
          cast: { type: "direction", range: 3.0, width: 2.3 },
          recastBuff: "horseman_kick_charge",
          recastCast: { type: "direction", range: 6.8, width: 2.3 },
          values: {
            fullCharge: 0.9,
            maxCharge: 1.65,
            minRange: 3.0,
            maxRange: 6.8,
            width: 2.3,
            minRatio: 0.43,
            minDamage: [100, 128, 156, 184, 212, 240],
            damage: [235, 300, 365, 430, 495, 560],
            adRatio: 1.25,
            minStun: 0.55,
            stunDur: [1.15, 1.25, 1.35, 1.45, 1.55, 1.65],
            minKnock: 1.2,
            knockDist: 4.6,
          },
          castTime: 0.14,
        },
        s2: {
          slot: "s2",
          name: "嘶鸣",
          brief: "发出哀嚎：周围魔法伤害 + 削弱敌人伤害，自己免疫控制",
          tags: ["control", "defense", "buff"],
          desc: "扬起脖子发出凄厉嘶鸣，对周围 {radius} 米内所有敌人造成 {damage}(+{apRatio%}法强+{adRatio%}物攻) 点魔法伤害，并削弱他们造成的伤害 {weaken%}，持续 {weakDur} 秒；同时自身立刻解除减速与定身并在 {immuneDur} 秒内免疫所有控制。",
          maxLevel: 6,
          cooldown: [11, 10.4, 9.8, 9.2, 8.6, 8.0],
          manaCost: [55, 58, 61, 64, 67, 70],
          cast: { type: "self", radius: 5.4 },
          values: {
            radius: 5.4,
            damage: [160, 210, 260, 310, 360, 410],
            apRatio: 0.75,
            adRatio: 0.45,
            weaken: [0.22, 0.25, 0.28, 0.31, 0.34, 0.38],
            weakDur: 3.5,
            immuneDur: [1.8, 2.0, 2.2, 2.4, 2.6, 2.8],
          },
          castTime: 0.12,
        },
        ult: {
          slot: "ult",
          name: "践踏",
          brief: "主动爆发移速并持续衰减、击杀刷新冷却；被动放任意技能都加移速",
          tags: ["buff", "dash"],
          desc: "主动：四蹄狂踏，短时间获得 {burstSpeed%} 爆发移动速度并在 {duration} 秒内持续衰减；击杀敌方英雄可立刻刷新本技能冷却。被动：学会后每施放任意技能，自身额外获得 {passiveSpeed%} 移动速度，持续 {passiveDur} 秒。",
          maxLevel: 3,
          cooldown: [36, 30, 24],
          manaCost: [75, 80, 85],
          cast: { type: "self", radius: 3.2 },
          values: {
            burstSpeed: [0.85, 1.05, 1.25],
            endSpeed: [0.18, 0.24, 0.3],
            duration: 4.0,
            passiveSpeed: [0.18, 0.24, 0.3],
            passiveDur: 2.5,
          },
          castTime: 0.08,
        },
      },
      build: [
        "slippers",
        "running_shoes",
        "brick",
        "fire_blanket",
        "sledgehammer",
        "riot_armor",
        "big_quilt",
      ],
      palette: { primary: "#c46c2d", secondary: "#593016", accent: "#ffae3d", glow: "#ffe08a" },
      look: "上半身光着膀子、下半身长着四条壮实马腿的怪人，跑起来尘土飞扬，后蹄子踹人极重。",
    },
    cow: {
      id: "cow",
      name: "大脚牛",
      title: "一脚裂地",
      role: "tank",
      roleName: "坦克",
      lane: "top",
      difficulty: 1,
      lore: "一脚下去，地板都要裂。",
      tips: "仗着一双大长腿，跑得越快能直接跨过的薄墙和土坑粪堆越宽，二技能飞踢突进距离也越远；对线有空就暴力练深蹲永久叠物攻、移速和冷却，练完力竭走不动时开大招牛气冲天立刻解掉力竭、变大回血加速，再连着跺脚把人全震晕。",
      attackType: "melee",
      radius: 0.64,
      base: {
        hp: 2944,
        mana: 450,
        ad: 158,
        armor: 118,
        mr: 62,
        attackSpeed: 0.78,
        moveSpeed: 5.55,
        attackRange: 2.35,
        hpRegen: 10.5,
        manaRegen: 3.5,
      },
      growth: { hp: 355, mana: 90, ad: 11.5, armor: 22, mr: 9.2, attackSpeedPct: 0.016 },
      basicAttack: { windup: 0.31, damageType: "physical" },
      passive: {
        name: "大长腿",
        brief: "能直接迈步横跨薄墙体和人造地形，跨障厚度随当前移速提升",
        tags: ["dash", "buff"],
        desc: "凭着两根大长腿，朝着薄墙体或土坑、粪污等人造地形直走时可直接高抬腿横跨过去，能跨越的地形厚度随当前移动速度提升。",
        values: {
          baseCross: 1.85,
          msFloor: 3.6,
          msScale: 0.72,
          maxCross: 7.4,
          cd: 0.65,
        },
      },
      skills: {
        s1: {
          slot: "s1",
          name: "深蹲",
          brief: "原地暴力深蹲 3 秒：不可移动但能普攻放技能，永久加物攻/移速/冷却，练后力竭减速 40% 且层数越高力竭越久",
          tags: ["buff", "defense"],
          desc: "花费 {maxDur} 秒原地暴力练习深蹲，期间无法移动但可以正常普攻与施放技能（再次点击可提前结束）。每练满 1 秒永久获得 1 层叠层，每层提供 +{adPerStack} 物攻、+{msPerStack} 移速与 +{cdrPerStack%} 冷却缩减。深蹲结束后进入 {exhaustDur} 秒力竭状态（当前每拥有 1 层额外延长 {exhaustPerStack} 秒），期间移动速度降低 {exhaustSlow%}。",
          maxLevel: 6,
          cooldown: [14.0, 13.5, 13.0, 12.5, 12.0, 11.5],
          manaCost: [35, 35, 35, 35, 35, 35],
          cast: { type: "self", radius: 2.0 },
          recastBuff: "cow_squat",
          recastCast: { type: "self", radius: 2.0 },
          values: {
            maxDur: 3,
            adPerStack: [1.25, 1.5, 1.75, 2.0, 2.25, 2.5],
            msPerStack: [0.02, 0.0225, 0.025, 0.0275, 0.03, 0.0325],
            cdrPerStack: [0.0025, 0.003, 0.0035, 0.004, 0.0045, 0.005],
            exhaustDur: 8,
            exhaustPerStack: 0.25,
            exhaustSlow: 0.4,
          },
          castTime: 0.06,
        },
        s2: {
          slot: "s2",
          name: "飞踢",
          brief: "纵身飞踹一名敌人：必定物理暴击，移速越快突进距离越长",
          tags: ["dash", "burst"],
          desc: "纵身一脚踹向指定敌人，造成 {damage}(+{adRatio%}物攻) 点必定暴击的物理伤害并小幅击退目标。当前移动速度越快，飞踢的施放与突进距离越远（{minRange}～{maxRange} 米）。",
          maxLevel: 6,
          cooldown: [9.5, 9.0, 8.5, 8.0, 7.5, 7.0],
          manaCost: [50, 52, 54, 56, 58, 60],
          cast: { type: "target", range: 6.5, anyUnit: !0 },
          values: {
            damage: [145, 195, 245, 295, 345, 395],
            adRatio: 0.85,
            baseRange: 5.5,
            msFloor: 4.5,
            msScale: 0.95,
            minRange: 4.0,
            maxRange: 13.0,
            knockDist: 1.4,
          },
          castTime: 0.1,
        },
        ult: {
          slot: "ult",
          name: "牛气冲天",
          brief: "变大增血加速、立刻解力竭，8 秒内可连续跺脚 3/4/5 次造成范围伤害与眩晕",
          tags: ["buff", "control", "burst"],
          desc: "在 {giantDur} 秒内体型大幅变大，获得 {bonusHp} 点额外生命值（并立刻回复等量生命）与 {bonusMs%} 移动速度，同时立刻移除力竭状态。开启后 {stompWindow} 秒内可连续再次释放本技能进行跺脚（最多 {maxStomps} 次），每次跺脚对周围 {stompRadius} 米内敌人造成 {stompDamage}(+{adRatio%}物攻) 点物理伤害并眩晕 {stompStun} 秒。",
          maxLevel: 3,
          cooldown: [42, 36, 30],
          manaCost: [80, 90, 100],
          cast: { type: "self", radius: 4.8 },
          recastBuff: "cow_stomp_ready",
          recastCast: { type: "self", radius: 4.8 },
          values: {
            giantDur: [8, 9, 10],
            bonusHp: [650, 1000, 1350],
            bonusMs: [0.22, 0.28, 0.34],
            stompWindow: 8,
            maxStomps: [3, 4, 5],
            stompRadius: 4.8,
            stompDamage: [170, 240, 310],
            adRatio: 0.85,
            stompStun: [0.85, 0.95, 1.05],
          },
          castTime: 0.08,
        },
      },
      build: [
        "slippers",
        "running_shoes",
        "red_bull_case",
        "riot_armor",
        "fire_blanket",
        "sledgehammer",
        "big_quilt",
      ],
      palette: { primary: "#b85c28", secondary: "#4d2712", accent: "#ff9b38", glow: "#ffdf78" },
      look: "一头长着粗壮大长腿和硕大牛脚丫的壮实大牛，跑起来步子大得离谱，一脚跺下去地皮都要开裂。",
    },
    monkey: {
      id: "monkey",
      name: "轮椅大圣",
      title: "铁棍轮椅王",
      role: "fighter",
      roleName: "战士",
      lane: "top",
      difficulty: 2,
      lore: "轮椅不是限制，是武器。",
      tips: "每 9 秒吃香蕉回血或满血爆发加速并往轮椅底下掉香蕉皮，香蕉皮落地 1 秒后才生效，1 秒内被敌人踩到会被直接踩没；一技能可存 3 层随时甩皮；二技能甩棍击飞并插地变粗挡路；开大后 6/7/8 秒内普攻全变长且直线穿透击退，前三棍必定暴击，期间杀小兵叠 1 层、杀英雄叠 6 层永久加棍长。",
      attackType: "melee",
      radius: 0.62,
      base: {
        hp: 3350,
        mana: 440,
        ad: 174,
        armor: 108,
        mr: 56,
        attackSpeed: 0.84,
        moveSpeed: 5.65,
        attackRange: 2.6,
        hpRegen: 10,
        manaRegen: 3.6,
      },
      growth: { hp: 345, mana: 90, ad: 12.2, armor: 21, mr: 8.8, attackSpeedPct: 0.02 },
      basicAttack: { windup: 0.28, damageType: "physical" },
      passive: {
        name: "香蕉皮",
        brief: "每 9 秒吃香蕉回 8% 生命（满血改爆发加速），轮椅下留香蕉皮（最多 8 片）；落地 1 秒后生效，1 秒内被踩会被消除",
        tags: ["heal", "control"],
        desc: "每 {interval} 秒吃一根香蕉，回复 {healPct%} 最大生命；满血时改为获得一次 {hastePct%} 爆发加速，持续 {hasteDur} 秒。同时在轮椅下方留下一片香蕉皮（最多同时存在 {maxPeels} 片）。香蕉皮落地 {armDur} 秒后才生效，生效前被敌人踩到会被直接消除；生效后敌人踩到会滑倒眩晕 {stunDur} 秒并被打断施法。",
        values: {
          interval: 9,
          healPct: 0.08,
          hastePct: 0.45,
          hasteDur: 2.2,
          maxPeels: 8,
          armDur: 1,
          peelDur: 35,
          peelRadius: 1.05,
          stunDur: 0.8,
        },
      },
      skills: {
        s1: {
          slot: "s1",
          name: "甩蕉皮",
          brief: "可存 3 层：把一片香蕉皮扔到指定位置（1 秒后生效，1 秒内被踩会消除）；被动：香蕉皮造成高额魔法伤害",
          tags: ["control", "zone"],
          desc: "最多可储存 {maxCharges} 层（每 {recharge} 秒充能 1 层）：把一片香蕉皮扔到指定位置（与被动共用最多 {maxPeels} 片上限），落地 1 秒后生效，1 秒内被敌人踩到会被直接消除；生效后踩中眩晕 0.8 秒并打断施法。被动：生效的香蕉皮被踩中时额外造成 {peelDmg}(+{adRatio%}物攻) 点魔法伤害。",
          maxLevel: 6,
          cooldown: [0.45, 0.45, 0.45, 0.45, 0.45, 0.45],
          manaCost: [39, 42, 44, 47, 49, 52],
          cast: { type: "position", range: 8.5, radius: 1.1 },
          values: {
            maxCharges: 3,
            maxPeels: 8,
            recharge: [9.5, 9.0, 8.5, 8.0, 7.5, 7.0],
            peelDmg: [374, 493, 612, 731, 850, 969],
            adRatio: 1.87,
            travelSpeed: 18,
          },
          castTime: 0.14,
        },
        s2: {
          slot: "s2",
          name: "横刀立棍",
          brief: "扔出铁棍击飞路径敌人并造成伤害，落地后插地变粗变大阻隔地形",
          tags: ["control", "zone", "burst"],
          desc: "朝指定地点扔出铁棍，击飞路径上的敌人 {knockup} 秒并造成 {damage}(+{adRatio%}物攻) 点物理伤害；铁棍落到目的地后直直插进地里变粗变大，形成半径 {pillarRadius} 米的阻隔地形，持续 {pillarDur} 秒。",
          maxLevel: 6,
          cooldown: [13, 12.2, 11.4, 10.6, 9.8, 9.0],
          manaCost: [60, 65, 70, 75, 80, 85],
          cast: { type: "position", range: 9.2, radius: 1.55 },
          values: {
            damage: [155, 200, 245, 290, 335, 380],
            adRatio: 0.85,
            knockup: 0.75,
            width: 1.55,
            speed: 21,
            pillarRadius: 1.45,
            pillarDur: [4.2, 4.6, 5.0, 5.4, 5.8, 6.2],
          },
          castTime: 0.16,
        },
        ult: {
          slot: "ult",
          name: "铁棍修行",
          brief: "6/7/8 秒内普攻全变直线穿透击退横扫，射程 +25%~40%、移速 −15%，前三棍必暴击；击杀小兵叠 1 层、英雄叠 6 层永久加棍长",
          tags: ["buff", "burst", "control"],
          desc: "进入 {duration} 秒铁棍修行状态：自身移速降低 {selfSlow%}，期间所有普攻距离提高 {rangePct%}（脚下显示普攻范围圈），且变为直线穿透横扫，额外造成 {bonusDmg}(+{adRatio%}物攻) 点物理伤害并击退沿线敌人 {knockDist} 米，其中前 {critAttacks} 棍必定暴击。期间击杀小兵叠加 {minionStacks} 层、击杀敌方英雄叠加 {heroStacks} 层，每层永久增加 {lenPerStack} 码棍长（同时增加攻击距离与铁棍长度）。",
          maxLevel: 3,
          cooldown: [46, 40, 34],
          manaCost: [80, 90, 100],
          cast: { type: "self", radius: 4.8 },
          values: {
            duration: [6, 7, 8],
            critAttacks: 3,
            rangePct: [0.25, 0.325, 0.4],
            selfSlow: 0.15,
            bonusDmg: [95, 145, 195],
            adRatio: 0.45,
            sweepWidth: 1.85,
            knockDist: 2.2,
            minionStacks: 1,
            heroStacks: 6,
            lenPerStack: 0.1,
          },
          castTime: 0.1,
        },
      },
      build: [
        "slippers",
        "red_bull_case",
        "liberation_shoes",
        "sledgehammer",
        "riot_armor",
        "pry_bar",
        "big_quilt",
      ],
      palette: { primary: "#d99228", secondary: "#4d2b12", accent: "#ffe042", glow: "#ffae24" },
      look: "坐着双涡轮铁轮椅的猴哥，双臂握着金箍铁棍，一边啃香蕉顺手丢蕉皮，一边抡棍横扫战场。",
    },
    slime: {
      id: "slime",
      name: "黄色史莱姆",
      title: "打不死的果冻",
      role: "tank",
      roleName: "控制",
      lane: "top",
      difficulty: 1,
      lore: "用身体当控制工具。",
      tips: "吃物理伤害会被弹性顶飞，但那部分血会慢慢弹回来；要是被撞到墙上，半秒内按二技能能直接甩出满蓄弹球。开大摊成一大滩果冻后再按一技能，可以把脚底踩着的人全都反吸住拖回自家塔下。",
      attackType: "melee",
      radius: 0.78,
      base: {
        hp: 3680,
        hpGrowth: 315,
        mp: 480,
        mpGrowth: 34,
        ad: 162,
        adGrowth: 9.5,
        ap: 0,
        apGrowth: 0,
        armor: 92,
        armorGrowth: 19,
        mr: 66,
        mrGrowth: 12,
        moveSpeed: 3.72,
        attackRange: 2.35,
        attackSpeed: 0.76,
        asGrowth: 0.018,
        hpRegen: 16,
        mpRegen: 10,
      },
      passive: {
        name: "究极弹性生物",
        brief: "35%~60% 物理伤害在 10~6 秒内持续回复，并沿受击方向被弹性击退（撞墙即停）",
        desc: "受到的物理伤害有 {minPct%}~{maxPct%}（随等级提升）会在 {maxDur}~{minDur} 秒内持续回复；这部分伤害在受伤瞬间会转化为强制位移，沿伤害来源与自身的连线方向被击退，距离按减少的最大生命百分比计算，撞墙即停。",
        values: {
          minPct: 0.35,
          maxPct: 0.6,
          maxDur: 10,
          minDur: 6,
          knockScale: 24,
          minKnock: 0.85,
          maxKnock: 7.5,
          knockSpeed: 21,
          wallWindow: 0.5,
        },
      },
      skills: {
        s1: {
          slot: "s1",
          name: "吸附",
          brief: "贴住一名敌人 3 秒（免疫击退并持续法伤）；大招期间释放会把大滩上所有敌人反吸住拖着走",
          tags: ["control", "damage"],
          desc: "贴住一名敌人 {duration} 秒（模型重叠、随对方位移同步移动），期间自身不再被击退，每 {tick} 秒造成 {tickDmg}(+{apRatio%}法强+{hpRatio%}最大生命) 点魔法伤害。大招「化整为零」期间释放时改为反向吸附：把自身体积覆盖到的所有敌人吸进果冻里，强制跟随自己移动且无法自主移动或位移。",
          maxLevel: 6,
          cooldown: [9.5, 8.9, 8.3, 7.7, 7.1, 6.5],
          manaCost: [45, 48, 51, 54, 57, 60],
          cast: { type: "target", range: 5.8, targetTeam: "enemy", anyUnit: !0 },
          values: {
            duration: 3.0,
            tick: 0.25,
            tickDmg: [26, 35, 44, 53, 62, 71],
            apRatio: 0.14,
            hpRatio: 0.0085,
            absorbRadius: 2.95,
          },
          castTime: 0.08,
        },
        s2: {
          slot: "s2",
          name: "弹球",
          brief: "蓄力最多 3 秒冲撞击飞敌人；被动撞墙后 0.5 秒内可瞬发无需蓄力的满额弹球",
          tags: ["dash", "control", "burst"],
          desc: "原地蓄力最多 {maxCharge} 秒，松手或再次按下后朝目标方向冲撞 {minRange}～{maxRange} 米，击飞路径上的敌人 {minAir}～{maxAir} 秒并造成 {minDamage}～{damage}(+{apRatio%}法强+{hpRatio%}最大生命) 点魔法伤害；蓄力越久冲得越快、越远、伤害越高。若被被动击退撞到墙上，{wallWindow} 秒内可立即无视冷却释放一次无需蓄力的满额弹球。",
          maxLevel: 6,
          cooldown: [11.5, 10.7, 9.9, 9.1, 8.3, 7.5],
          manaCost: [55, 58, 61, 64, 67, 70],
          holdCharge: !0,
          cast: { type: "direction", range: 4.5, width: 2.2 },
          recastBuff: "slime_ball_charge",
          recastCast: { type: "direction", range: 11.5, width: 2.2 },
          values: {
            fullCharge: 3.0,
            maxCharge: 3.0,
            minRange: 4.5,
            maxRange: 11.5,
            minSpeed: 15,
            maxSpeed: 31,
            hitRadius: 1.35,
            minDamage: [110, 145, 180, 215, 250, 285],
            damage: [255, 335, 415, 495, 575, 655],
            apRatio: 0.65,
            hpRatio: 0.055,
            minAir: 0.65,
            maxAir: 1.2,
            wallWindow: 0.5,
          },
          castTime: 0.08,
        },
        ult: {
          slot: "ult",
          name: "化整为零",
          brief: "4 秒不可选取，摊开成 4 倍大滩果冻大量回血并持续法伤，期间一技能可反吸拖走所有人",
          tags: ["defense", "control", "zone"],
          desc: "{duration} 秒内进入不可选取状态，摊开在地、体积变为 4 倍（覆盖半径 {radius} 米），期间共回复 {healBase}(+{healHp%}最大生命) 点生命，并对覆盖到的敌人每 {tick} 秒造成 {tickDmg}(+{apRatio%}法强+{hpRatio%}最大生命) 点魔法伤害。期间使用「吸附」会把覆盖到的所有敌人反吸过来，强制跟随自己移动、无法自主移动或位移。",
          maxLevel: 3,
          cooldown: [48, 42, 36],
          manaCost: [80, 90, 100],
          cast: { type: "self", radius: 2.95 },
          values: {
            duration: 4.0,
            radius: 2.95,
            tick: 0.25,
            healBase: [520, 820, 1120],
            healHp: [0.18, 0.22, 0.26],
            tickDmg: [36, 54, 72],
            apRatio: 0.16,
            hpRatio: 0.012,
          },
          castTime: 0.08,
        },
      },
      build: [
        "slippers",
        "big_quilt",
        "liberation_shoes",
        "riot_armor",
        "air_cooler",
        "fire_blanket",
        "barbed_fence",
      ],
      palette: { primary: "#f2c618", secondary: "#9c6d0a", accent: "#fff36b", glow: "#ffe038" },
      look: "亮黄色半透明高弹果冻团，底部带一圈柔软裙边，挨打会被弹飞、撞墙能立刻弹回去，开大能摊成一大滩果冻把人反吸带走。",
    },
  };

function z0(n) {
  const t = typeof n == "string" ? Se[n] : n;
  return `${t.name} · ${t.roleName}`;
}

const Br = {
    dash: "位移",
    control: "控制",
    slow: "减速",
    burst: "爆发",
    dot: "持续伤害",
    shield: "护盾",
    heal: "回复",
    buff: "增益",
    defense: "防身",
    channel: "引导",
  },
  eh = 15;

function lm(n) {
  let t = 0,
    e = 0,
    s = 0,
    i = 0;
  for (let a = 1; a <= Math.min(n, eh); a++)
    a === 4 || a === 8 || a === 12 ? s++ : (i++ % 2 === 0 && t < 6) || e >= 6 ? t++ : e++;
  return { s1: t, s2: e, ult: s };
}

function Nh(n, t, e) {
  const s = n.values[t];
  if (s === void 0) throw new Error(`skill ${n.name} has no value "${t}"`);
  if (typeof s == "number") return s;
  const i = Math.max(0, Math.min(s.length - 1, e - 1));
  return s[i];
}

function Cy(n, t) {
  if (t) {
    const p = n * 100;
    return `${Math.abs(p) < 1 && p !== 0 ? Math.round(p * 100) / 100 : Math.round(p)}%`;
  }
  return Number.isInteger(n)
    ? String(n)
    : Math.abs(n) < 0.1
      ? String(Math.round(n * 10000) / 10000)
      : String(Math.round(n * 100) / 100);
}

function US(n, t) {
  return n.desc.replace(/\{(\w+)(%?)\}/g, (e, s, i) => {
    const a = n.values[s],
      o = i === "%";
    return a === void 0 ? `{${s}}` : typeof a == "number" ? Cy(a, o) : a.map((r) => Cy(r, o)).join("/");
  });
}

const ea = {
  recall: {
    name: "回城",
    brief: "引导 5 秒后传送回泉水并回满生命与法力",
    desc: "原地站 5 秒后传送回泉水。移动、攻击或受到伤害会打断。",
    channel: 5,
    cooldown: 1,
  },
  heal: {
    name: "疗伤",
    brief: "5 秒内回复 30% 最大生命与 30% 最大法力",
    desc: "5 秒内持续回复共 30% 最大生命与 30% 最大法力。受到英雄或防御塔伤害会打断。",
    duration: 5,
    hpRatio: 0.3,
    manaRatio: 0.3,
    cooldown: 60,
  },
  flash: {
    name: "闪现",
    brief: "向指定方向瞬移 5 米，可穿越薄墙",
    desc: "向指定方向瞬移 5 米，可穿越薄墙。",
    range: 5,
    cooldown: 110,
  },
};

function f5(n, t) {
  const e = Math.max(0, Math.min(eh, t) - 1);
  return {
    maxHp: n.base.hp + n.growth.hp * e,
    maxMana: n.base.mana + n.growth.mana * e,
    ad: n.base.ad + n.growth.ad * e,
    ap: 0,
    armor: n.base.armor + n.growth.armor * e,
    mr: n.base.mr + n.growth.mr * e,
    attackSpeed: n.base.attackSpeed * (1 + n.growth.attackSpeedPct * e),
    moveSpeed: n.base.moveSpeed,
    attackRange: n.base.attackRange,
    hpRegen: n.base.hpRegen + 0.6 * e,
    manaRegen: n.base.manaRegen + 0.2 * e,
    cdr: 0,
    lifesteal: 0,
    critChance: 0,
    critDamage: 2,
    armorPen: 0,
    magicPen: 0,
    // 装备带来的派生属性，裸装英雄都是 0
    shieldPower: 0,
    healPower: 0,
  };
}

const Ly = It(57),
  ml = It(62),
  OS = It(64),
  o1 = It(69),
  BS = It(71),
  Bd = It(74),
  Xf = It(76),
  Iy = It(79),
  lu = It(81),
  p0 = It(83),
  Uc = It(86),
  gl = It(88),
  d5 = It(91),
  HS = It(95),
  $S = [ml, o1, Bd];

function Jm(n, t) {
  for (let e = 0; e < t; e++) Hc(n, $S[e], e * 0.105, 0.8 + e * 0.1, e === t - 1 ? 0.32 : 0.2);
}
export { FS, kr, Se, z0, Br, eh, lm, Nh, US, ea, f5, Ly, ml, OS, o1, BS, Bd, Xf, Iy, lu, p0, Uc, gl, d5, HS, Jm };
