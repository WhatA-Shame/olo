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
      "程咬金·抡斧",
      (n) => {
        (Ti(n, 0, 0.24, 0.5, 300, 1500, 480, 1.2), n.osc({ f: 92, f1: 70, a: 0.06, d: 0.14, g: 0.2 }));
      },
      { loud: -27, len: 0.35, gap: 0.1, rev: 0.06 },
    ),
    atk_chijin_hit: At(
      "英雄普攻",
      "程咬金·斧劈命中",
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
  kr = ["panyue", "chijin", "xingli", "fengling", "yeque", "mushroom"],
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
        brief: "每第三下普攻更疼，还带减速",
        tags: ["slow"],
        desc: "每第三次普攻改用大盾砸地，对目标额外造成自身 4% 最大生命的法术伤害并减速 30%，持续 1 秒。",
        values: { hits: 3, hpRatio: 0.04, slow: 0.3, slowDur: 1 },
      },
      skills: {
        s1: {
          slot: "s1",
          name: "侧盾闯帐",
          brief: "举盾冲过去，撞到人就击飞",
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
          brief: "给自己加护盾，减速身边敌人",
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
          brief: "跳进人堆砸地，击飞一大片",
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
        "boots",
        "guardian_plate",
        "boots_guard",
        "starweave_cloak",
        "undying_heart",
        "thorn_mail",
        "winter_scepter",
      ],
      palette: { primary: "#5f6b78", secondary: "#7a4e30", accent: "#d9a441", glow: "#ffcf70" },
      look: "魁梧的汉初猛将：比其他英雄高大宽厚一号，玄铁札甲配方片披膊，赭褐粗布战裙；须发戟张、络腮虬髯、怒目；左臂一面黑漆金纹的双弧大盾，右手一柄汉剑。动作沉重。",
    },
    chijin: {
      id: "chijin",
      name: "程咬金",
      title: "混世魔王",
      role: "fighter",
      roleName: "战士",
      lane: "top",
      difficulty: 2,
      lore: "隋唐演义里瓦岗寨的「混世魔王」。民间传说他梦里学斧，醒来只记得三招——这「三板斧」却招招要命。",
      tips: "三个技能就是三板斧，每放完一个技能马上补一下普攻，又疼又回血。用「半路杀出」冲到人脸上，再开大招抡斧转圈。血少也能打回来，但别一个人冲进塔里。",
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
        name: "越砍越勇",
        brief: "放完技能的下一斧更疼还回血",
        tags: ["heal"],
        desc: "施放技能后，4 秒内的下一次普攻变为重斧：额外造成 80(+50%物攻) 点物理伤害，并回复自身 5% 最大生命。",
        values: { damage: 80, adRatio: 0.5, healHpRatio: 0.05, window: 4 },
      },
      skills: {
        s1: {
          slot: "s1",
          name: "拦腰一斧",
          brief: "向前横扫一大片，砍中减速",
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
          name: "半路杀出",
          brief: "冲上去砍一路，攻速变快",
          tags: ["dash", "buff"],
          desc: "三板斧第二式：提斧向指定方向猛冲，对路径上的敌人造成 {damage}(+{adRatio%}物攻) 点物理伤害，并获得 {asBonus%} 攻速加成，持续 {asDur} 秒。",
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
          name: "抡圆了砍",
          brief: "抡斧转圈持续砍，可以边转边走",
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
        "boots",
        "blood_scythe",
        "boots_guard",
        "starfall_blade",
        "guardian_plate",
        "piercing_spear",
        "starweave_cloak",
      ],
      palette: { primary: "#cc3a26", secondary: "#3a3436", accent: "#e2a13a", glow: "#ff7a2a" },
      look: "粗豪敦实的大斧武将：圆铁盔顶一撮红缨，赤褐络腮短髯，咧嘴带笑；胸前两面铜圆护的铁甲，朱红披风与战裙；双手持一柄宽刃的八卦宣花斧，平时扛在右肩。动作大开大合。",
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
        brief: "技能打中同一人三次就眩晕",
        tags: ["control"],
        desc: "技能命中敌人会留下一层余音(持续 5 秒)。叠满 3 层时弦音共振：造成目标 6% 最大生命的法术伤害(对非英雄上限 300)并眩晕 0.75 秒。",
        values: { stacks: 3, duration: 5, hpRatio: 0.06, cap: 300, stun: 0.75 },
      },
      skills: {
        s1: {
          slot: "s1",
          name: "一弦穿云",
          brief: "弹出一道音波，穿透一整条线",
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
          brief: "圈住一片，稍后把人拉到中间",
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
          brief: "雁群一波波俯冲，覆盖一大片",
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
        "boots",
        "astral_staff",
        "boots_arcane",
        "void_crown",
        "sage_codex",
        "winter_scepter",
        "starweave_cloak",
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
      tips: "站住了不停射箭，越射越快，叠满五层还会加移速和伤害。被近身就用「飞将腾身」翻开，落地后的下一箭必定暴击。大招箭雨能减速一大片，开团、断后都好用。",
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
        brief: "连续普攻，越射越快越疼",
        tags: ["buff"],
        desc: "普攻命中获得一层连射(最多 5 层，持续 3 秒)，每层提高 6% 攻速。满层时移速提高 10%，且普攻额外造成 20(+每级 4) 点物理伤害。",
        values: { maxStacks: 5, duration: 3, asPerStack: 0.06, haste: 0.1, bonus: 20, bonusPerLevel: 4 },
      },
      skills: {
        s1: {
          slot: "s1",
          name: "白羽没石",
          brief: "一支能穿兵的重箭，射中减速",
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
          brief: "翻身拉开距离，下一箭必暴击",
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
          brief: "箭雨盖住一大片，持续减速",
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
        "boots",
        "sunchaser_bow",
        "boots_fury",
        "phantom_edge",
        "blood_scythe",
        "piercing_spear",
        "starfall_blade",
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
      tips: "先在野区打野攒等级，再去各条路抓残血的人。敌人血量低于四成时你打得更疼，拿到击杀或助攻会刷新一、二技能，可以接着追下一个。别第一个冲进人堆：等队友先上，再用大招贴上去收掉脆皮。",
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
        brief: "打残血更疼，杀人后刷新技能",
        tags: ["burst"],
        desc: "抱定死志：对生命值低于 40% 的敌人造成的伤害提高 18%。参与击杀英雄后，立即刷新一、二技能冷却并回复 8% 最大生命。对野怪造成的伤害提高 25%。",
        values: { threshold: 0.4, bonus: 0.18, healHpRatio: 0.08, monsterBonus: 0.25 },
      },
      skills: {
        s1: {
          slot: "s1",
          name: "风萧易水",
          brief: "突刺穿过敌人，刺中英雄这招更快转好",
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
          brief: "扇形丢出三把匕首，命中减速",
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
          brief: "抖开图卷欺近目标，卷尽一匕",
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
        "boots",
        "starfall_blade",
        "boots_arcane",
        "piercing_spear",
        "phantom_edge",
        "blood_scythe",
        "starweave_cloak",
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
        brief: "普攻与技能命中都积攒菌丝，7 层爆开：额外伤害 + 等量护盾",
        tags: ["slow", "shield"],
        desc: "普攻和技能命中都会积攒 1 层菌丝（二技能每段最多 1 层）。叠到 {hits} 层时炸开：对目标额外造成 {hpRatio%} 最大生命的法术伤害并减速 {slow%}（{slowDur} 秒），同时给自己套上一层等同于该伤害的护盾，持续 {shieldDur} 秒。",
        values: { hits: 7, hpRatio: 0.05, slow: 0.3, slowDur: 1.2, shieldDur: 4 },
      },
      skills: {
        s1: {
          slot: "s1",
          name: "滚菌冲锋",
          brief: "侧倒成菌轮持续滚动，可转向，碾到就疼",
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
          brief: "长按持续喷吐孢子粉雾，持续耗蓝",
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
          brief: "全图蓄力跃击，飞得越远砸得越狠",
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
        "boots",
        "guardian_plate",
        "boots_guard",
        "starweave_cloak",
        "undying_heart",
        "thorn_mail",
        "winter_scepter",
      ],
      palette: { primary: "#7c3aed", secondary: "#f3e7d0", accent: "#a78bfa", glow: "#c4a2ff" },
      look: "一朵成了精的紫色大蘑菇：粗壮圆胖的奶白菌柄就是身子，菌颈处透出淡淡紫色；头顶倒扣着一只巨大的紫红伞盖，盖面是带绒光的紫，点缀着几块奶白色圆斑，盖底是放射状的浅色菌褶。菌柄中段有一张憨厚的脸：两只圆眼睛、粉腮红、小小的嘴。四肢短粗，拳头圆滚滚。",
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
  return t ? `${Math.round(n * 100)}%` : Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100);
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
    brief: "原地站 5 秒，回泉水补满",
    desc: "原地站 5 秒后传送回泉水。移动、攻击或受到伤害会打断。",
    channel: 5,
    cooldown: 1,
  },
  heal: {
    name: "疗伤",
    brief: "5 秒内回三成血和蓝",
    desc: "5 秒内持续回复共 30% 最大生命与 30% 最大法力。受到英雄或防御塔伤害会打断。",
    duration: 5,
    hpRatio: 0.3,
    manaRatio: 0.3,
    cooldown: 60,
  },
  flash: {
    name: "闪现",
    brief: "朝一个方向瞬移一小段",
    desc: "向指定方向瞬移一小段距离，可穿越薄墙。",
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
