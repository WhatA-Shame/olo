// 03-vfx.js — vfx｜8 个顶层语句｜64KB
// 对应 game.pretty.js 第 2683–4843 行
// 关键内容：
//   tg                    技能施放
//   XS                    状态与系统
//   zy                    lowpass
//   fu                    pink
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { At, El, Fc, Hc, It, Jd, NS, Od, Or, Qi, Si, Ti, Tl, Ty, W0, Zm, c5, en, ga, i1, ja, pl, th, yn, zS, zl } from './01-audio.js';
import { BS, Bd, FS, HS, Iy, Jm, Ly, OS, Se, Uc, Xf, d5, gl, lu, ml, o1, p0 } from './02-data.js';

const tg = [p0, Uc, gl, d5],
  eg = Se.chijin.skills.ult.values.tick,
  Py = typeof eg == "number" && eg > 0.05 ? eg : 0.3,
  Os = { loud: -21, len: 0.5, gap: 0.1, poly: 2, prio: 2, jitter: 0.01, rev: 0.16 },
  ns = { loud: -16, len: 0.7, gap: 0.08, poly: 3, prio: 2, rev: 0.18 },
  Hr = { loud: -24, gap: 0.2, poly: 2, prio: 1, jitter: 0.02, rev: 0.16 },
  Hi = { jitter: 0 },
  GS = {
    cast_panyue_s1: At(
      "技能施放",
      "樊哙·侧盾闯帐",
      (n) => {
        (Or(n, 0, 0.6, 1.15), ja(n, ml, 0.005, 0.26, 0.9), ja(n, o1, 0.1, 0.36, 1));
      },
      Os,
    ),
    cast_panyue_s2: At(
      "技能施放",
      "樊哙·拥盾怒目",
      (n) => {
        (Or(n, 0, 0.55, 1.1),
          ja(n, ml, 0.005, 0.24, 0.8),
          Or(n, 0.12, 0.6, 0.82, 0.5),
          ja(n, Ly, 0.125, 0.5, 1));
      },
      Os,
    ),
    cast_panyue_ult: At(
      "技能施放",
      "樊哙·跃盾砸阵",
      (n) => {
        (Or(n, 0, 0.5, 0.9, 0.3),
          Or(n, 0.09, 0.55, 1.1, 0.3),
          Or(n, 0.18, 0.65, 1.35, 0.5),
          ja(n, Ly, 0.005, 0.2, 0.5),
          ja(n, ml, 0.185, 0.6, 1.1),
          n.noise({ k: "brown", flt: "lowpass", fc: 260, a: 0.3, d: 0.3, g: 0.5 }));
      },
      { ...Os, len: 0.9, loud: -18 },
    ),
    cast_chijin_s1: At(
      "技能施放",
      "牛伟·裂地横扫(一声)",
      (n) => {
        (Jm(n, 1), Ti(n, 0, 0.14, 0.25, 600, 2200, 900));
      },
      Os,
    ),
    cast_chijin_s2: At(
      "技能施放",
      "牛伟·蛮牛冲撞(两声)",
      (n) => {
        Jm(n, 2);
      },
      Os,
    ),
    cast_chijin_ult: At(
      "技能施放",
      "牛伟·狂牛旋风(三声)",
      (n) => {
        (Jm(n, 3), Ti(n, 0.05, 0.5, 0.4, 400, 1700, 900, 0.9, "pink"));
      },
      { ...Os, len: 0.9, loud: -18 },
    ),
    cast_niumo_s1: At(
      "技能施放",
      "牛魔·烈焰斩(一声)",
      (n) => {
        (Jm(n, 1), Ti(n, 0, 0.16, 0.28, 520, 2100, 860));
      },
      Os,
    ),
    cast_niumo_s2: At(
      "技能施放",
      "牛魔·烈焰行军(两声)",
      (n) => {
        (Jm(n, 2), Ti(n, 0, 0.3, 0.45, 300, 1200, 700, 0.9, "pink"));
      },
      Os,
    ),
    cast_niumo_ult: At(
      "技能施放",
      "牛魔·烈焰牛魔(三声)",
      (n) => {
        (Jm(n, 3), Ti(n, 0.05, 0.55, 0.45, 340, 1500, 820, 0.9, "pink"));
      },
      { ...Os, len: 0.95, loud: -18 },
    ),
    cast_xingli_s1: At(
      "技能施放",
      "王昭君·一弦穿云",
      (n) => {
        (Si(n, gl, 0, 0.16, 0.8), Si(n, HS, 0.045, 0.28, 1));
      },
      { ...Os, ...Hi, rev: 0.26 },
    ),
    cast_xingli_s2: At(
      "技能施放",
      "王昭君·回环收弦",
      (n) => {
        (Si(n, lu, 0, 0.6, 1, p0), Si(n, Xf, 0.16, 0.4, 0.5));
      },
      { ...Os, ...Hi, len: 0.7, rev: 0.26 },
    ),
    cast_xingli_ult: At(
      "技能施放",
      "王昭君·雁落平沙",
      (n) => {
        ([Xf, p0, gl, d5].forEach((t, e) => Si(n, t, e * 0.07, e === 3 ? 0.7 : 0.3, 0.7 + e * 0.1)),
          n.noise({ flt: "highpass", fc: 6e3, a: 0.25, d: 0.5, g: 0.05 }));
      },
      { ...Os, ...Hi, len: 1.1, loud: -18, rev: 0.3 },
    ),
    cast_fengling_s1: At(
      "技能施放",
      "李广·白羽没石",
      (n) => {
        (c5(n, 0, 0.26, 1), n.osc({ w: "triangle", f: 98, f1: 147, a: 0.2, d: 0.08, g: 0.1 }));
      },
      Os,
    ),
    cast_fengling_s2: At(
      "技能施放",
      "李广·飞将腾身",
      (n) => {
        (Od(n, ml, 0, 0.1, 0.6), Od(n, It(67), 0.05, 0.18, 0.8));
      },
      Os,
    ),
    cast_fengling_ult: At(
      "技能施放",
      "李广·箭锁阴山",
      (n) => {
        (Or(n, 0, 0.6, 1.3, 0.3), Or(n, 0.14, 0.7, 1.3, 0.36), c5(n, 0.05, 0.36, 1.3));
      },
      { ...Os, len: 0.9, loud: -18 },
    ),
    cast_yeque_s1: At(
      "技能施放",
      "荆轲·风萧易水",
      (n) => {
        (W0(n, Bd, 0, 0.32, 1),
          n.osc({ f: 73.4, f1: 55, a: 0.01, d: 0.26, g: 0.25 }),
          n.noise({ flt: "bandpass", fc: 900, fc1: 2200, q: 4, a: 0.05, d: 0.2, g: 0.2 }));
      },
      { ...Os, ...Hi },
    ),
    cast_yeque_s2: At(
      "技能施放",
      "荆轲·引匕一掷",
      (n) => {
        (W0(n, o1, 0, 0.22, 0.8),
          n.noise({ flt: "bandpass", fc: 2200, fc1: 6800, q: 4, t: 0.01, a: 0.03, d: 0.07, g: 0.5 }),
          n.ring(3300, Tl, { t: 0.05, a: 0.001, d: 0.2, g: 0.14 }));
      },
      { ...Os, ...Hi },
    ),
    cast_yeque_ult: At(
      "技能施放",
      "荆轲·卷尽匕现",
      (n) => {
        (W0(n, Bd, 0, 0.22, 0.8),
          W0(n, It(68), 0.13, 0.5, 1),
          n.osc({ f: 62, f1: 40, t: 0.02, a: 0.004, d: 0.24, g: 0.4 }),
          n.noise({ flt: "bandpass", fc: 1200, fc1: 500, q: 4, a: 0.05, d: 0.35, g: 0.2 }));
      },
      { ...Os, ...Hi, len: 0.8, loud: -18 },
    ),
    cast_recall: At(
      "技能施放",
      "回城·启动",
      (n) => {
        (en(n, lu, 0, 0.4, 0.8), en(n, Uc, 0.09, 0.6, 0.9));
      },
      { ...Os, loud: -25, rev: 0.25 },
    ),
    cast_heal: At(
      "技能施放",
      "疗伤·启动",
      (n) => {
        (n.osc({ w: "glass", f: It(72), a: 0.02, d: 0.3, g: 0.5 }),
          n.osc({ w: "glass", f: Iy, t: 0.09, a: 0.02, d: 0.45, g: 0.5 }),
          n.osc({ f: It(84), t: 0.09, a: 0.02, d: 0.3, g: 0.12 }));
      },
      { ...Os, loud: -24, rev: 0.25 },
    ),
    cast_flash: At(
      "技能施放",
      "闪现·启动",
      (n) => {
        (n.osc({ f: 2400, f1: 4800, a: 0.001, d: 0.04, g: 0.4 }),
          n.noise({ flt: "highpass", fc: 6e3, a: 0.001, d: 0.025, g: 0.3 }));
      },
      { ...Os, loud: -26, len: 0.2 },
    ),
    fx_panyue_passive_hit: At(
      "技能特效",
      "樊哙·覆盾震地",
      (n) => {
        const t = n.drive(2);
        (n.osc({ f: 100, f1: 36, ft: 0.14, a: 0.003, d: 0.46, g: 0.5, to: t }),
          n.noise({ k: "pink", flt: "lowpass", fc: 900, fc1: 220, a: 0.003, d: 0.34, g: 0.5, to: t }),
          ja(n, 247, 0, 0.75, 1),
          n.noise({ flt: "bandpass", fc: 1500, q: 0.8, a: 0.001, d: 0.045, g: 0.7 }),
          n.scatter(3, 0.05, 0.2, (e) =>
            n.noise({
              k: "pink",
              flt: "bandpass",
              fc: n.rr(300, 800),
              q: 2,
              t: e,
              a: 0.001,
              d: 0.05,
              g: 0.25,
            }),
          ));
      },
      { ...ns, loud: -15 },
    ),
    fx_panyue_s1_dash: At(
      "技能特效",
      "樊哙·闯帐起步",
      (n) => {
        ([0, 0.1, 0.19].forEach((t, e) => {
          (n.osc({ f: 120 - e * 8, f1: 50, t, a: 0.002, d: 0.1, g: 0.75 - e * 0.12 }),
            n.noise({ k: "pink", flt: "lowpass", fc: 700, t, a: 0.001, d: 0.04, g: 0.4 }));
        }),
          Ti(n, 0, 0.34, 0.6, 200, 950, 420, 0.9, "brown"),
          n.scatter(4, 0.02, 0.26, (t) => n.ring(n.rr(900, 1500), Jd, { t, a: 0.001, d: 0.035, g: 0.05 })));
      },
      { ...ns, loud: -19, len: 0.5 },
    ),
    fx_panyue_s1_impact: At(
      "技能特效",
      "樊哙·侧盾撞击",
      (n) => {
        const t = n.drive(2.5);
        (n.osc({ f: 108, f1: 34, ft: 0.15, a: 0.003, d: 0.5, g: 0.6, to: t }),
          n.osc({ w: "triangle", f: 250, f1: 85, ft: 0.1, a: 0.002, d: 0.2, g: 0.4, to: t }),
          n.noise({ k: "pink", flt: "lowpass", fc: 2400, fc1: 220, a: 0.002, d: 0.3, g: 0.8, to: t }),
          n.noise({ flt: "highpass", fc: 2600, a: 0.001, d: 0.014, g: 0.5 }),
          ja(n, 294, 0, 0.7, 1.1),
          n.scatter(4, 0.08, 0.3, (e) =>
            n.osc({ f: n.rr(90, 150), f1: 50, t: e, a: 0.002, d: 0.08, g: n.rr(0.2, 0.35) }),
          ),
          n.ring(1150, Jd, { t: 0.04, a: 0.001, d: 0.12, g: 0.06 }));
      },
      { ...ns, loud: -13, len: 0.9, rev: 0.24 },
    ),
    fx_panyue_s2_cast: At(
      "技能特效",
      "樊哙·拥盾一喝",
      (n) => {
        (n.osc({ f: 128, f1: 55, a: 0.002, d: 0.2, g: 0.6 }),
          n.noise({ k: "pink", flt: "lowpass", fc: 800, a: 0.001, d: 0.06, g: 0.5 }),
          ja(n, 262, 0, 0.9, 0.9),
          Ty(n, 0.04, 0.3, 0.9),
          n.osc({ f: 440, f1: 660, t: 0.1, a: 0.12, d: 0.5, g: 0.1 }));
      },
      { ...ns, loud: -16, len: 1 },
    ),
    fx_panyue_ult_leap: At(
      "技能特效",
      "樊哙·腾跃",
      (n) => {
        (n.osc({ f: 115, f1: 55, a: 0.002, d: 0.12, g: 0.7 }),
          Ti(n, 0, 0.45, 0.5, 240, 1700, 900, 1, "pink"),
          Ty(n, 0, 0.22, 0.45, 150),
          n.scatter(3, 0.02, 0.2, (t) => n.ring(n.rr(800, 1300), Jd, { t, a: 0.001, d: 0.05, g: 0.05 })));
      },
      { ...ns, loud: -19, len: 0.6 },
    ),
    fx_panyue_ult_land: At(
      "技能特效",
      "樊哙·砸地(大鼓 + 盾震)",
      (n) => {
        const t = n.drive(3, n.gain(0.8));
        (n.osc({ f: 76, f1: 25, ft: 0.5, a: 0.004, d: 1.5, g: 0.75, to: t }),
          n.osc({ f: 150, f1: 48, ft: 0.2, a: 0.003, d: 0.5, g: 0.35, to: t }),
          n.osc({ f: 56, f1: 30, ft: 0.4, t: 0.07, a: 0.006, d: 1.1, g: 0.3, to: t }),
          n.noise({ k: "pink", flt: "lowpass", fc: 1800, fc1: 160, a: 0.004, d: 1.2, g: 0.9, to: t }),
          n.noise({ k: "pink", flt: "bandpass", fc: 700, q: 0.7, a: 0.01, d: 0.5, g: 0.6 }),
          n.noise({ flt: "bandpass", fc: 1200, q: 0.5, a: 0.001, d: 0.09, g: 1 }),
          n.noise({ flt: "highpass", fc: 3e3, a: 0.001, d: 0.02, g: 0.5 }),
          ja(n, 262, 0, 1.6, 0.8),
          ja(n, 392, 0.02, 1.1, 0.45),
          [0.1, 0.24, 0.4].forEach((e, s) =>
            n.noise({
              k: "pink",
              flt: "bandpass",
              fc: 900 - s * 190,
              q: 0.9,
              t: e,
              a: 0.03,
              d: 0.3,
              g: 0.6 - s * 0.1,
            }),
          ),
          n.scatter(9, 0.15, 1.1, (e) =>
            n.osc({
              f: n.rr(80, 160),
              f1: 50,
              t: e,
              a: 0.002,
              d: n.rr(0.05, 0.1),
              g: n.rr(0.12, 0.3) * (1.4 - e),
            }),
          ));
      },
      { ...ns, loud: -11, len: 2.3, gap: 0.2, poly: 2, prio: 3, rev: 0.3 },
    ),
    fx_chijin_passive_hit: At(
      "技能特效",
      "牛伟·重斧(带回血音)",
      (n) => {
        const t = n.drive(2.5);
        (n.osc({ f: 150, f1: 48, ft: 0.1, a: 0.002, d: 0.28, g: 0.5, to: t }),
          n.noise({ flt: "bandpass", fc: 1700, q: 0.8, a: 0.001, d: 0.06, g: 0.7, to: t }),
          Hc(n, 392, 0, 1, 0.34),
          n.scatter(4, 0.02, 0.18, (e) =>
            n.noise({ flt: "highpass", fc: n.rr(3500, 6500), t: e, a: 0.001, d: 0.01, g: 0.18 }),
          ),
          [Iy, It(84), gl].forEach((e, s) =>
            n.osc({ w: "glass", f: e, t: 0.09 + s * 0.05, a: 0.004, d: 0.14, g: 0.16 }),
          ));
      },
      { ...ns, loud: -16 },
    ),
    fx_chijin_s1_slash: At(
      "技能特效",
      "牛伟·横扫斧弧",
      (n) => {
        (Ti(n, 0, 0.3, 0.5, 350, 2600, 600, 1.1),
          n.noise({
            k: "pink",
            flt: "bandpass",
            fc: 1200,
            fc1: 450,
            q: 0.6,
            t: 0.05,
            a: 0.05,
            d: 0.36,
            g: 0.6,
          }),
          n.osc({ f: 105, f1: 55, a: 0.004, d: 0.22, g: 0.4 }),
          Hc(n, 520, 0.09, 0.5, 0.22),
          n.scatter(5, 0.1, 0.3, (t) =>
            n.noise({ flt: "highpass", fc: n.rr(3e3, 6500), t, a: 0.001, d: 0.012, g: n.rr(0.1, 0.22) }),
          ));
      },
      { ...ns, loud: -15, len: 0.8 },
    ),
    fx_chijin_s2_dash: At(
      "技能特效",
      "牛伟·蛮牛冲撞",
      (n) => {
        (Ti(n, 0, 0.3, 0.55, 450, 3e3, 800, 1.1),
          [0, 0.09, 0.18].forEach((t) => n.osc({ f: 130, f1: 55, t, a: 0.002, d: 0.08, g: 0.5 })),
          n.noise({ k: "pink", flt: "lowpass", fc: 1800, a: 0.02, d: 0.28, g: 0.4 }),
          n.noise({ flt: "bandpass", fc: 2600, fc1: 3400, q: 6, t: 0.04, a: 0.04, d: 0.2, g: 0.3 }));
      },
      { ...ns, loud: -18, len: 0.6 },
    ),
    fx_chijin_ult_start: At(
      "技能特效",
      "牛伟·抡斧起手",
      (n) => {
        (Ti(n, 0, 0.55, 0.55, 300, 1600, 1e3, 0.9, "pink"),
          Hc(n, 294, 0, 0.5, 0.4),
          Hc(n, 440, 0.07, 0.4, 0.35),
          n.osc({ f: 62, f1: 115, a: 0.2, d: 0.3, g: 0.4 }),
          n.noise({ k: "brown", flt: "bandpass", fc: 300, q: 0.8, a: 0.2, d: 0.3, g: 0.4 }));
      },
      { ...ns, loud: -15, len: 0.9 },
    ),
    fx_chijin_ult_tick: At(
      "技能特效",
      "牛伟·斧环一圈",
      (n) => {
        (Ti(n, 0, 0.27, 0.7, 500, 2300, 650, 1.2, "pink"),
          n.osc({ f: 88, f1: 66, a: 0.03, d: 0.19, g: 0.5 }),
          n.osc({ f: 1620, a: 0.02, d: 0.1, g: 0.04 }),
          n.scatter(2, 0.04, 0.16, (t) =>
            n.noise({ flt: "highpass", fc: n.rr(3e3, 6e3), t, a: 0.001, d: 0.012, g: 0.2 }),
          ));
      },
      { ...ns, loud: -17, len: 0.45, gap: 0.12, poly: 3, jitter: 0.06 },
    ),
    fx_niumo_s1_slash: At(
      "技能特效",
      "牛魔·烈焰斩",
      (n) => {
        (Ti(n, 0, 0.32, 0.55, 320, 2500, 620, 1.1),
          n.noise({ flt: "bandpass", fc: 900, q: 1.1, a: 0.002, d: 0.3, g: 0.5 }));
      },
      { loud: -20, len: 0.55, gap: 0.08, rev: 0.12 },
    ),
    fx_niumo_s2_spray: At(
      "技能特效",
      "牛魔·喷火",
      (n) => {
        (n.noise({ k: "pink", flt: "bandpass", fc: 1500, q: 0.9, a: 0.01, d: 0.24, g: 0.32 }),
          n.osc({ f: 120, f1: 80, a: 0.02, d: 0.2, g: 0.16 }));
      },
      { loud: -26, len: 0.3, gap: 0.02, rev: 0.08 },
    ),
    fx_niumo_ult_start: At(
      "技能特效",
      "牛魔·变身",
      (n) => {
        (Ti(n, 0, 0.6, 0.6, 260, 1600, 900, 1),
          Hc(n, 196, 0, 0.6, 0.45),
          n.noise({ k: "pink", flt: "lowpass", fc: 700, a: 0.05, d: 0.6, g: 0.4 }));
      },
      { loud: -16, len: 1, gap: 0.2, rev: 0.3 },
    ),
    fx_niumo_burst: At(
      "技能特效",
      "牛魔·引爆火焰",
      (n) => {
        (Ti(n, 0, 0.2, 0.4, 400, 2600, 800, 1),
          n.noise({ flt: "highpass", fc: 2200, a: 0.001, d: 0.14, g: 0.4 }));
      },
      { loud: -20, len: 0.35, gap: 0.04, rev: 0.1 },
    ),
    fx_xingli_passive_burst: At(
      "技能特效",
      "王昭君·余音三叠",
      (n) => {
        ([Xf, p0, gl].forEach((t, e) => Si(n, t, e * 0.045, 0.5, 0.8)),
          [Xf, p0, gl, d5].forEach((t) => {
            (n.osc({ f: t, t: 0.1, a: 0.12, d: 0.6, g: 0.12 }),
              n.osc({ f: t * 1.006, t: 0.1, a: 0.14, d: 0.55, g: 0.08 }));
          }),
          n.osc({ w: "triangle", f: 260, f1: 90, t: 0.1, a: 0.003, d: 0.26, g: 0.5 }),
          n.noise({ flt: "bandpass", fc: 4200, q: 0.7, t: 0.1, a: 0.001, d: 0.1, g: 0.4 }));
      },
      { ...ns, ...Hi, loud: -15, len: 0.9, rev: 0.28 },
    ),
    fx_xingli_s1_cast: At(
      "技能特效",
      "王昭君·一弦穿云出手",
      (n) => {
        (Si(n, p0, 0, 0.3, 1.1), Si(n, gl, 0.004, 0.26, 0.7));
        const t = n.gain(1);
        (n.lfo(t.gain, 70, 0.5, 0, 0.3),
          n.noise({
            flt: "bandpass",
            fc: 1800,
            fc1: 6500,
            fct: 0.16,
            q: 1.4,
            a: 0.012,
            d: 0.2,
            g: 0.6,
            to: t,
          }),
          n.osc({ f: 150, f1: 70, a: 0.003, d: 0.12, g: 0.35 }));
      },
      { ...ns, ...Hi, loud: -16, len: 0.6, rev: 0.24 },
    ),
    fx_xingli_s2_burst: At(
      "技能特效",
      "王昭君·回环收拨",
      (n) => {
        (n.noise({ flt: "bandpass", fc: 3200, fc1: 400, fct: 0.12, q: 1.5, a: 0.1, d: 0.04, g: 0.8 }),
          [lu, Xf, Bd, o1].forEach((t, e) => Si(n, t, 0.12 + e * 0.02, 0.62 - e * 0.05, 0.9)),
          n.osc({ f: 124, f1: 40, t: 0.12, a: 0.003, d: 0.5, g: 0.55 }),
          n.noise({ k: "pink", flt: "lowpass", fc: 2200, fc1: 260, t: 0.12, a: 0.002, d: 0.28, g: 0.5 }));
      },
      { ...ns, ...Hi, loud: -14, len: 1.1, rev: 0.28 },
    ),
    fx_xingli_ult_cast: At(
      "技能特效",
      "王昭君·起曲引雁",
      (n) => {
        const t = n.filt("lowpass", 5200, 0.8),
          e = 13;
        for (let s = 0; s < e; s++)
          Zm(
            n,
            s % 4 === 3 ? Uc : p0,
            0.03 + s * 0.062,
            0.2,
            0.25 + 0.6 * Math.sin((Math.PI * s) / e),
            s % 2 === 0,
            t,
          );
        (Si(n, OS, 0, 0.9, 0.7),
          Si(n, BS, 0.05, 0.8, 0.5),
          n.osc({ f: 82.4, a: 0.3, d: 0.42, g: 0.15 }),
          NS(n, 0.5, 0.22));
      },
      { ...ns, ...Hi, loud: -16, len: 1.2, rev: 0.3 },
    ),
    fx_xingli_meteor: At(
      "技能特效",
      "王昭君·落雁",
      (n) => {
        const t = tg[Math.floor(n.rnd() * tg.length) % tg.length];
        (Si(n, t, 0, 0.42, 1, t * 0.667),
          n.noise({ flt: "bandpass", fc: 3600, fc1: 1200, fct: 0.11, q: 2, a: 0.07, d: 0.04, g: 0.3 }),
          n.osc({ f: 150, f1: 48, ft: 0.14, t: 0.11, a: 0.003, d: 0.4, g: 0.5 }),
          n.noise({ k: "pink", flt: "lowpass", fc: 2600, fc1: 300, t: 0.11, a: 0.002, d: 0.26, g: 0.45 }),
          n.noise({ flt: "highpass", fc: 4500, t: 0.13, a: 0.03, d: 0.35, g: 0.12 }));
      },
      { ...ns, ...Hi, loud: -15, len: 0.8, gap: 0.09, poly: 4, rev: 0.26 },
    ),
    fx_fengling_s1_cast: At(
      "技能特效",
      "李广·白羽没石出手",
      (n) => {
        (Od(n, 123, 0, 0.34, 1.1),
          n.osc({ f: 120, f1: 58, a: 0.003, d: 0.14, g: 0.25 }),
          El(n, 0.01, 0.3, 0.45, 4200, 1900),
          n.noise({ flt: "bandpass", fc: 2400, fc1: 900, q: 1.5, t: 0.01, a: 0.015, d: 0.22, g: 0.35 }));
      },
      { ...ns, loud: -16, len: 0.6 },
    ),
    fx_fengling_s2_dash: At(
      "技能特效",
      "李广·飞将腾身(落地上弦)",
      (n) => {
        (Ti(n, 0, 0.22, 0.4, 700, 2400, 1100, 0.9),
          n.noise({ k: "pink", flt: "lowpass", fc: 500, t: 0.19, a: 0.004, d: 0.06, g: 0.5 }),
          n.osc({ f: 110, f1: 60, t: 0.19, a: 0.002, d: 0.07, g: 0.4 }),
          n.osc({ f: 1900, f1: 1300, t: 0.3, a: 0.001, d: 0.012, g: 0.5 }),
          n.noise({ flt: "bandpass", fc: 3200, q: 2.5, t: 0.3, a: 0.001, d: 0.008, g: 0.6 }),
          n.osc({ w: "triangle", f: 520, f1: 420, t: 0.302, a: 0.001, d: 0.03, g: 0.35 }));
      },
      { ...ns, loud: -20, len: 0.5 },
    ),
    fx_fengling_ult_cast: At(
      "技能特效",
      "李广·仰射(三弦齐发)",
      (n) => {
        ([0, 0.075, 0.15].forEach((t, e) => Od(n, 150 + e * 14, t, 0.2, 0.8)),
          [0.02, 0.06, 0.1, 0.15, 0.19].forEach((t, e) =>
            El(n, t, 0.36, 0.3, 1500 + e * 260, 3400 + e * 380),
          ),
          n.noise({ flt: "bandpass", fc: 1e3, fc1: 4800, fct: 0.4, q: 1.2, a: 0.16, d: 0.26, g: 0.5 }));
      },
      { ...ns, loud: -17, len: 0.7 },
    ),
    fx_fengling_ult_tick: At(
      "技能特效",
      "李广·箭雨落地",
      (n) => {
        (n.scatter(9, 0, 0.28, (t) => th(n, t, n.rr(0.4, 0.8), n.rr(0.8, 1.3))),
          n.scatter(3, 0, 0.14, (t) => El(n, t, 0.08, 0.25, n.rr(3200, 4200), 1800)),
          n.noise({ k: "pink", flt: "bandpass", fc: 600, q: 0.8, a: 0.03, d: 0.22, g: 0.3 }));
      },
      { ...ns, loud: -17, len: 0.55, gap: 0.2, poly: 3, jitter: 0.06 },
    ),
    fx_yeque_s1_dash: At(
      "技能特效",
      "荆轲·风萧易水",
      (n) => {
        (Ti(n, 0, 0.17, 0.7, 700, 5200, 1600, 2),
          n.noise({
            k: "pink",
            flt: "bandpass",
            fc: 400,
            fc1: 1500,
            fct: 0.12,
            q: 1.2,
            a: 0.02,
            d: 0.14,
            g: 0.5,
          }),
          n.ring(2900, Tl, { t: 0.05, a: 0.001, d: 0.18, g: 0.1 }),
          n.osc({ f: 98, f1: 52, a: 0.004, d: 0.16, g: 0.35 }),
          n.noise({
            flt: "bandpass",
            fc: 700,
            fc1: 1500,
            fct: 0.5,
            q: 5,
            t: 0.08,
            a: 0.15,
            d: 0.4,
            g: 0.16,
          }));
      },
      { ...ns, loud: -17, len: 0.7 },
    ),
    fx_yeque_s2_cast: At(
      "技能特效",
      "荆轲·掷匕",
      (n) => {
        ([0, 0.035, 0.07].forEach((t, e) =>
          n.noise({
            flt: "bandpass",
            fc: 2800 + e * 300,
            fc1: 5600 + e * 400,
            q: 3,
            t,
            a: 0.004,
            d: 0.045,
            g: 0.7,
          }),
        ),
          n.ring(3500, Tl, { a: 0.001, d: 0.14, g: 0.06 }),
          n.noise({ k: "pink", flt: "lowpass", fc: 600, a: 0.006, d: 0.1, g: 0.35 }));
      },
      { ...ns, loud: -19, len: 0.4 },
    ),
    fx_yeque_ult_vanish: At(
      "技能特效",
      "荆轲·图卷展开",
      (n) => {
        const t = n.gain(1);
        (n.lfo(t.gain, 38, 0.45, 0, 0.45),
          n.noise({ flt: "bandpass", fc: 1400, fc1: 4600, fct: 0.3, q: 1.2, a: 0.05, d: 0.3, g: 0.8, to: t }),
          n.noise({ flt: "highpass", fc: 5500, a: 0.06, d: 0.26, g: 0.1, to: t }),
          W0(n, ml, 0.02, 0.4, 0.5),
          n.osc({ f: 92, f1: 45, a: 0.004, d: 0.24, g: 0.5 }));
      },
      { ...ns, loud: -18, len: 0.6, rev: 0.24 },
    ),
    fx_yeque_ult_strike: At(
      "技能特效",
      "荆轲·卷尽匕现",
      (n) => {
        const e = n.drive(3, n.gain(0.6));
        (n.noise({ flt: "highpass", fc: 3200, t: 0.045, a: 0.001, d: 0.04, g: 1.1 }),
          n.noise({ flt: "bandpass", fc: 5200, q: 1.5, t: 0.045, a: 0.001, d: 0.06, g: 0.6 }),
          n.noise({ flt: "bandpass", fc: 2600, fc1: 7e3, q: 2, t: 0.045, a: 0.004, d: 0.1, g: 0.5 }),
          n.ring(2500, Tl, { t: 0.045, a: 0.001, d: 0.45, g: 0.2 }),
          n.osc({ f: 110, f1: 36, ft: 0.13, t: 0.045 + 0.01, a: 0.003, d: 0.42, g: 0.4, to: e }),
          n.noise({
            k: "pink",
            flt: "lowpass",
            fc: 1400,
            fc1: 300,
            t: 0.045 + 0.01,
            a: 0.001,
            d: 0.07,
            g: 0.3,
            to: e,
          }),
          W0(n, ml, 0.045 + 0.02, 0.5, 0.6),
          W0(n, It(56), 0.045 + 0.03, 0.5, 0.5));
      },
      { ...ns, loud: -13, len: 0.9, prio: 3, rev: 0.24 },
    ),
    yeque_refresh: At(
      "技能特效",
      "荆轲·得手(技能刷新)",
      (n) => {
        (n.osc({ f: Uc, a: 0.001, d: 0.6, g: 0.4 }),
          n.osc({ f: Uc * 1.5, t: 0.004, a: 0.001, d: 0.4, g: 0.14 }),
          n.osc({ w: "zhu", f: Bd, a: 0.001, d: 0.12, g: 0.12 }),
          n.noise({ flt: "bandpass", fc: 2600, q: 2, a: 0.001, d: 0.008, g: 0.3 }));
      },
      { ...ns, ...Hi, bus: "ui", loud: -24, len: 0.7, gap: 0.3, poly: 1, rev: 0.26 },
    ),
    area_telegraph: At(
      "区域铺底",
      "预警圈(己方)",
      (n) => {
        (n.osc({ f: 587, a: 0.01, d: 0.14, g: 0.4 }), n.osc({ f: 880, t: 0.07, a: 0.01, d: 0.16, g: 0.3 }));
      },
      { ...Hr, loud: -32, len: 0.4, prio: 0 },
    ),
    area_telegraph_enemy: At(
      "区域铺底",
      "预警圈(敌方)",
      (n) => {
        const t = Math.min(1.2, Math.max(0.3, n.dur)),
          e = n.filt("lowpass", 900, 1);
        (n.osc({ w: "softsq", f: 311, a: 0.01, d: 0.28, g: 0.4, to: e }),
          n.osc({ w: "softsq", f: 294, a: 0.01, d: 0.3, g: 0.4, to: e }),
          n.osc({ f: 200, f1: 420, ft: t, a: t * 0.9, d: 0.06, g: 0.25 }));
      },
      { ...Hr, loud: -26, len: 0.6, prio: 2 },
    ),
    area_panyue_aura: At(
      "区域铺底",
      "拥盾怒目·盾影",
      (n) => {
        const t = n.dur,
          e = Math.max(0.1, t - 0.8),
          s = n.gain(1);
        (n.lfo(s.gain, 2.2, 0.3, 0, t + 0.5),
          [147, 148.6, 223.5, 225.7, 334].forEach((i, a) =>
            n.osc({ f: i, a: 0.25, h: e, d: 0.6, g: a < 4 ? 0.22 : 0.1, to: s }),
          ),
          n.noise({ k: "brown", flt: "lowpass", fc: 240, a: 0.2, h: e, d: 0.6, g: 0.4, to: s }),
          n.noise({ k: "pink", flt: "bandpass", fc: 420, q: 1, a: 0.2, h: e, d: 0.6, g: 0.3, to: s }));
      },
      { ...Hr, loud: -30, len: 4 },
    ),
    area_panyue_fissure: At(
      "区域铺底",
      "跃盾砸阵·震裂的地面",
      (n) => {
        const t = n.dur,
          e = Math.max(0.1, t - 0.7),
          s = n.gain(1);
        (n.lfo(s.gain, 3.1, 0.25, 0, t + 0.7),
          n.noise({ k: "brown", flt: "lowpass", fc: 190, a: 0.12, h: e, d: 0.6, g: 0.7, to: s }),
          n.noise({ k: "pink", flt: "bandpass", fc: 450, q: 0.9, a: 0.12, h: e, d: 0.6, g: 0.4, to: s }),
          n.scatter(Math.round(t * 3), 0.1, Math.max(0.2, t - 0.3), (i) => {
            (n.osc({ f: n.rr(90, 170), f1: 55, t: i, a: 0.002, d: n.rr(0.04, 0.08), g: n.rr(0.2, 0.4) }),
              n.noise({
                k: "pink",
                flt: "bandpass",
                fc: n.rr(400, 1100),
                q: 2,
                t: i,
                a: 0.001,
                d: 0.04,
                g: n.rr(0.15, 0.3),
              }));
          }));
      },
      { ...Hr, loud: -24, len: 3 },
    ),
    area_chijin_spin: At(
      "区域铺底",
      "抡圆了砍·呼啸",
      (n) => {
        const t = n.dur,
          e = Math.max(0.1, t - 0.45),
          s = 1 / Py,
          i = Py * 0.75,
          a = n.gain(0.55);
        n.lfo(a.gain, s, 0.45, i, t + 0.3);
        const o = n.filt("bandpass", 800, 1.1, a);
        (n.lfo(o.frequency, s, 380, i, t + 0.3),
          n.noise({ k: "pink", a: 0.15, h: e, d: 0.3, g: 2.4, to: o }),
          n.osc({ w: "softsaw", f: 73, a: 0.2, h: e, d: 0.3, g: 0.2, to: n.filt("lowpass", 240, 0.7, a) }),
          n.noise({ k: "brown", flt: "bandpass", fc: 300, q: 0.8, a: 0.3, h: e, d: 0.3, g: 0.3, to: a }),
          n.scatter(Math.round(t * 3), 0.05, Math.max(0.2, t - 0.2), (r) => {
            n.noise({ flt: "highpass", fc: n.rr(3e3, 6e3), t: r, a: 0.001, d: 0.01, g: n.rr(0.06, 0.14) });
          }));
      },
      { ...Hr, loud: -22, len: 3 },
    ),
    area_xingli_well: At(
      "区域铺底",
      "回环收弦·蓄势",
      (n) => {
        const t = Math.max(0.25, n.dur),
          e = n.filt("lowpass", 1500, 1);
        n.ramp(e.frequency, [
          [0, 1500],
          [t, 6e3],
        ]);
        const s = Math.max(4, Math.round(t * 14));
        for (let i = 0; i < s; i++) {
          const a = i / s;
          Zm(n, lu, t * Math.pow(a, 0.7), 0.14, 0.3 + 0.7 * a, i % 2 === 0, e);
        }
        n.noise({ flt: "bandpass", fc: 300, fc1: 2400, fct: t, q: 2, a: t * 0.92, d: 0.05, g: 0.4 });
      },
      { ...Hr, ...Hi, loud: -25, len: 0.6 },
    ),
    area_xingli_storm: At(
      "区域铺底",
      "雁落平沙·轮指",
      (n) => {
        const t = n.dur,
          e = Math.max(0.1, t - 0.8),
          s = n.gain(1),
          i = n.filt("lowpass", 5200, 0.8, s),
          a = 13.5,
          o = Math.round(t * a);
        for (let r = 0; r < o; r++) {
          const l = 0.05 + r / a + n.rr(-0.006, 0.006),
            c = 0.35 + 0.65 * Math.pow(Math.sin((Math.PI * l) / 1.25), 2),
            f = Math.min(1, Math.max(0.15, (t - l) / 0.5));
          Zm(n, r % 8 === 7 ? Uc : p0, l, 0.16, 0.5 * c * f, r % 2 === 0, i);
        }
        (n.noise({ flt: "highpass", fc: 5500, a: 0.3, h: e, d: 0.6, g: 0.05, to: s }),
          n.osc({ f: 82.4, a: 0.3, h: e, d: 0.5, g: 0.08, to: s }));
      },
      { ...Hr, ...Hi, loud: -27, len: 3, rev: 0.3 },
    ),
    area_fengling_rain: At(
      "区域铺底",
      "箭锁阴山·箭阵",
      (n) => {
        const t = n.dur;
        (n.scatter(Math.round(t * 7), 0.05, Math.max(0.2, t - 0.15), (e) =>
          th(n, e, n.rr(0.25, 0.55), n.rr(0.75, 1.35)),
        ),
          n.scatter(Math.round(t * 1.6), 0.1, Math.max(0.2, t - 0.4), (e) =>
            El(n, e, 0.16, 0.2, n.rr(3e3, 4400), 1700),
          ),
          n.noise({
            k: "pink",
            flt: "bandpass",
            fc: 500,
            q: 0.7,
            a: 0.2,
            h: Math.max(0.1, t - 0.6),
            d: 0.4,
            g: 0.25,
          }));
      },
      { ...Hr, loud: -25, len: 3 },
    ),
  },
  VS = {
    atk_panyue_swing: 0.57,
    atk_panyue_hit: 0.797,
    atk_chijin_swing: 0.517,
    atk_chijin_hit: 0.694,
    atk_xingli_charge: 0.503,
    atk_xingli_launch: 0.391,
    atk_xingli_hit: 1.002,
    atk_fengling_draw: 0.478,
    atk_fengling_launch: 0.703,
    atk_fengling_hit: 1.021,
    atk_yeque_swing: 0.446,
    atk_yeque_hit: 1.239,
    minion_swing: 0.266,
    minion_melee_hit: 1.111,
    minion_ranged_launch: 0.458,
    minion_ranged_hit: 0.791,
    minion_siege_launch: 0.944,
    minion_siege_hit: 0.773,
    super_hit: 1.106,
    monster_swing: 0.517,
    monster_hit: 1.638,
    monster_spit_launch: 0.512,
    monster_spit_hit: 0.848,
    epic_hit: 0.777,
    monster_spawn: 0.435,
    tower_charge: 0.319,
    tower_launch: 0.469,
    tower_hit: 0.809,
    tower_hit_player: 0.602,
    fx_hit_physical: 1.281,
    fx_hit_magic: 0.585,
    fx_hit_crit: 0.824,
    fx_hit_tower: 1.048,
    xingli_s1_fly: 0.327,
    xingli_s1_hit: 0.547,
    fengling_s1_fly: 0.171,
    fengling_s1_hit: 0.795,
    yeque_s2_fly: 0.27,
    yeque_s2_hit: 1.289,
    proj_fizzle: 0.357,
    cast_panyue_s1: 0.539,
    cast_panyue_s2: 0.597,
    cast_panyue_ult: 0.679,
    cast_chijin_s1: 0.713,
    cast_chijin_s2: 0.554,
    cast_chijin_ult: 0.543,
    cast_xingli_s1: 0.374,
    cast_xingli_s2: 0.234,
    cast_xingli_ult: 0.423,
    cast_fengling_s1: 0.846,
    cast_fengling_s2: 1.019,
    cast_fengling_ult: 0.824,
    cast_yeque_s1: 0.75,
    cast_yeque_s2: 0.813,
    cast_yeque_ult: 0.85,
    cast_recall: 0.701,
    cast_heal: 0.35,
    cast_flash: 0.843,
    fx_panyue_passive_hit: 0.677,
    fx_panyue_s1_dash: 0.799,
    fx_panyue_s1_impact: 0.604,
    fx_panyue_s2_cast: 0.799,
    fx_panyue_ult_leap: 0.85,
    fx_panyue_ult_land: 0.555,
    fx_chijin_passive_hit: 0.581,
    fx_chijin_s1_slash: 1.028,
    fx_chijin_s2_dash: 0.831,
    fx_chijin_ult_start: 1.034,
    fx_chijin_ult_tick: 0.849,
    fx_xingli_passive_burst: 0.592,
    fx_xingli_s1_cast: 0.49,
    fx_xingli_s2_burst: 0.47,
    fx_xingli_ult_cast: 0.759,
    fx_xingli_meteor: 0.451,
    fx_fengling_s1_cast: 1.008,
    fx_fengling_s2_dash: 1.082,
    fx_fengling_ult_cast: 0.807,
    fx_fengling_ult_tick: 1.394,
    fx_yeque_s1_dash: 0.995,
    fx_yeque_s2_cast: 1.273,
    fx_yeque_ult_vanish: 0.652,
    fx_yeque_ult_strike: 0.96,
    yeque_refresh: 0.402,
    area_telegraph: 0.33,
    area_telegraph_enemy: 0.487,
    area_panyue_aura: 0.162,
    area_panyue_fissure: 0.33,
    area_chijin_spin: 0.269,
    area_xingli_well: 0.227,
    area_xingli_storm: 0.435,
    area_fengling_rain: 0.669,
    fx_heal: 0.756,
    fx_shield_break: 1.042,
    fx_level_up: 0.728,
    fx_respawn: 0.603,
    fx_recall_start: 0.765,
    fx_recall_done: 0.447,
    fx_flash: 1.351,
    fx_gold_gain: 0.432,
    fx_tower_destroyed: 0.592,
    fx_core_destroyed: 0.483,
    fx_monster_slain: 1.019,
    fx_drake_breath_warn: 0.276,
    fx_drake_breath: 0.543,
    fx_buff_gain: 0.953,
    player_hurt: 1.17,
    player_hurt_heavy: 0.701,
    skill_hit: 0.457,
    heartbeat: 1.133,
    death_hero_ally: 0.725,
    death_hero_enemy: 0.975,
    death_player: 0.485,
    death_minion: 0.413,
    death_minion_big: 0.67,
    death_monster: 0.832,
    epic_roar: 0.474,
    epic_fall: 0.517,
    kill_player: 0.752,
    kill_ally: 1.022,
    kill_enemy: 0.757,
    levelup_player: 1.205,
    respawn_player: 0.806,
    coin: 0.79,
    coin_big: 1.126,
    buy: 1.42,
    reject: 0.933,
    recall_channel: 0.333,
    ann_match_start: 0.897,
    ann_minions_spawn: 0.814,
    ann_first_blood: 0.78,
    ann_double_kill: 0.827,
    ann_triple_kill: 0.778,
    ann_quadra_kill: 0.789,
    ann_penta_kill: 0.797,
    ann_killing_spree: 0.684,
    ann_unstoppable: 0.715,
    ann_legendary: 0.767,
    ann_shutdown: 0.765,
    ann_ace: 0.941,
    ann_tower_destroyed: 1.268,
    ann_epic_spawn: 0.61,
    ann_epic_slain: 0.909,
    ann_super_minions: 1.227,
    ann_victory: 0.595,
    ann_defeat: 0.611,
    ui_click: 0.885,
    ui_hover: 0.327,
    ui_confirm: 1.235,
    ui_back: 1.271,
    ui_select: 0.755,
    ui_buy: 1.414,
    ui_error: 1.03,
    ui_ready: 0.95,
    ui_countdown: 0.828,
  },
  WS = It(57),
  Kl = It(62),
  jS = It(65),
  Zl = It(69),
  Dy = It(72),
  $r = It(74),
  ng = It(79),
  ko = It(81),
  Yf = It(84),
  er = It(86),
  Ql = It(88),
  cu = It(91),
  sg = It(93),
  qS = It(96),
  xn = { loud: -19, len: 0.8, gap: 0.1, poly: 2, prio: 2, jitter: 0.01, rev: 0.2 };

function zy(n, t, e, s, i = 1) {
  const a = n.drive(4, n.filt("lowpass", 3200, 0.6)),
    o = n.filt("lowpass", 300, 2.4, a);
  (n.ramp(o.frequency, [
    [t, 300],
    [t + e * 0.22, 1900],
    [t + e * 0.7, 1200],
    [t + e, 300],
  ]),
    n.osc({
      w: "sawtooth",
      f: 82 * i,
      f1: 58 * i,
      ft: e,
      t,
      a: e * 0.12,
      h: e * 0.5,
      d: e * 0.4,
      g: s * 0.55,
      vib: 90,
      vr: 29,
      vd: 0,
      to: o,
    }),
    n.osc({
      w: "sawtooth",
      f: 123 * i,
      f1: 80 * i,
      ft: e,
      t,
      a: e * 0.15,
      h: e * 0.45,
      d: e * 0.4,
      g: s * 0.4,
      vib: 70,
      vr: 37,
      vd: 0,
      to: o,
    }),
    n.osc({
      w: "softsaw",
      f: 520 * i,
      f1: 330 * i,
      ft: e,
      t: t + e * 0.08,
      a: e * 0.15,
      h: e * 0.35,
      d: e * 0.4,
      g: s * 0.22,
      vib: 40,
      vr: 9,
      vd: 0,
      to: n.filt("bandpass", 1400, 1.6),
    }),
    n.noise({
      k: "brown",
      flt: "bandpass",
      fc: 340,
      fc1: 180,
      q: 1.4,
      t,
      a: e * 0.14,
      h: e * 0.45,
      d: e * 0.5,
      g: s * 0.8,
    }),
    n.noise({ flt: "bandpass", fc: 2600, q: 3, t, a: e * 0.2, h: e * 0.35, d: e * 0.45, g: s * 0.14 }),
    n.osc({ f: 46, t, a: e * 0.2, h: e * 0.35, d: e * 0.6, g: s * 0.4 }));
}

function fu(n, t, e) {
  (n.osc({ f: 84, f1: 30, ft: 0.3, t, a: 0.004, d: 0.7, g: e * 0.8 }),
    n.noise({ k: "pink", flt: "lowpass", fc: 3e3, fc1: 400, t, a: 0.004, d: 0.6, g: e * 0.8 }),
    n.noise({ flt: "highpass", fc: 3500, t: t + 0.02, a: 0.02, d: 0.5, g: e * 0.28 }),
    n.scatter(6, t + 0.1, 0.6, (s) =>
      n.noise({
        flt: "bandpass",
        fc: n.rr(1800, 4500),
        q: 3,
        t: s,
        a: 0.002,
        d: n.rr(0.02, 0.05),
        g: e * n.rr(0.1, 0.25),
      }),
    ));
}

const XS = {
    fx_heal: At(
      "状态与系统",
      "治疗",
      (n) => {
        ([Yf, Ql, cu].forEach((t, e) =>
          n.fm({ f: t, ratio: 2, idx: 1.2, idx1: 0.05, t: e * 0.07, a: 0.004, d: 0.42, g: 0.2 }),
        ),
          n.osc({ w: "glass", f: Dy, a: 0.1, d: 0.5, g: 0.14 }),
          n.osc({ w: "glass", f: ng, t: 0.05, a: 0.12, d: 0.5, g: 0.1 }),
          n.noise({ flt: "highpass", fc: 6e3, a: 0.15, d: 0.3, g: 0.04 }));
      },
      { ...xn, loud: -24, gap: 0.4, group: "heal", rev: 0.26 },
    ),
    fx_shield_break: At(
      "状态与系统",
      "护盾破碎",
      (n) => {
        (n.noise({ flt: "highpass", fc: 2500, a: 0.001, d: 0.26, g: 0.6 }),
          n.osc({ f: 300, f1: 90, a: 0.001, d: 0.08, g: 0.6 }),
          n.scatter(9, 0, 0.22, (t) =>
            n.ring(n.rr(2e3, 6e3), ga, { t, a: 0.001, d: n.rr(0.05, 0.14), g: 0.07 }),
          ),
          n.fm({ f: 1245, f1: 830, ratio: 1.41, idx: 2, idx1: 0.1, a: 0.001, d: 0.3, g: 0.14 }));
      },
      { ...xn, loud: -19, len: 0.6, jitter: 0.04 },
    ),
    fx_level_up: At(
      "状态与系统",
      "升级(他人)",
      (n) => {
        ([ng, Yf, Ql, cu].forEach((t, e) => en(n, t, e * 0.055, 0.5, 0.7)),
          n.noise({ flt: "bandpass", fc: 800, fc1: 6e3, q: 1.2, a: 0.24, d: 0.1, g: 0.2 }),
          n.osc({ f: 196, a: 0.1, d: 0.4, g: 0.2 }));
      },
      { ...xn, loud: -24, gap: 0.2, rev: 0.26 },
    ),
    fx_respawn: At(
      "状态与系统",
      "复活(他人)",
      (n) => {
        (n.osc({ f: 110, f1: 220, a: 0.3, d: 0.4, g: 0.4 }),
          n.noise({ flt: "bandpass", fc: 400, fc1: 4200, q: 1.2, a: 0.34, d: 0.14, g: 0.3 }),
          [$r, ko, er].forEach((t, e) => en(n, t, 0.34 + e * 0.03, 0.9, 0.6)));
      },
      { ...xn, loud: -23, len: 1.4, rev: 0.28 },
    ),
    fx_recall_start: At(
      "状态与系统",
      "回城引导开始",
      (n) => {
        (n.osc({ w: "glass", f: 293.7, f1: 330, a: 0.2, d: 0.5, g: 0.3 }),
          en(n, ko, 0.05, 0.5, 0.6),
          n.noise({ flt: "bandpass", fc: 2e3, q: 2, a: 0.2, d: 0.3, g: 0.06 }));
      },
      { ...xn, loud: -26, rev: 0.26 },
    ),
    fx_recall_done: At(
      "状态与系统",
      "回城传送完成",
      (n) => {
        (n.noise({ flt: "bandpass", fc: 500, fc1: 6500, fct: 0.18, q: 1.5, a: 0.16, d: 0.05, g: 0.7 }),
          n.osc({ f: 300, f1: 1800, ft: 0.18, a: 0.15, d: 0.04, g: 0.2 }),
          en(n, er, 0.19, 0.7, 0.8),
          en(n, sg, 0.2, 0.6, 0.6),
          n.osc({ f: 125, f1: 60, t: 0.19, a: 0.003, d: 0.2, g: 0.6 }),
          n.noise({ flt: "highpass", fc: 5e3, t: 0.19, a: 0.005, d: 0.4, g: 0.1 }));
      },
      { ...xn, loud: -19, len: 1, rev: 0.28 },
    ),
    fx_flash: At(
      "状态与系统",
      "闪现",
      (n) => {
        (n.noise({ flt: "bandpass", fc: 1500, fc1: 9e3, fct: 0.07, q: 1.5, a: 0.01, d: 0.07, g: 0.8 }),
          n.osc({ f: 700, f1: 2800, ft: 0.07, a: 0.005, d: 0.07, g: 0.3 }));
        const t = n.echo(0.09, 0.3, 0.35, 0.4);
        (n.osc({ f: 1800, f1: 900, t: 0.08, a: 0.002, d: 0.08, g: 0.4, to: t }),
          n.fm({ f: 2637, ratio: 3.01, idx: 1.5, idx1: 0.05, t: 0.08, a: 0.001, d: 0.26, g: 0.18, to: t }),
          n.osc({ f: 160, f1: 70, t: 0.08, a: 0.002, d: 0.1, g: 0.4 }));
      },
      { ...xn, loud: -18, len: 0.8, jitter: 0.03 },
    ),
    fx_gold_gain: At(
      "状态与系统",
      "金币掉落(他人)",
      (n) => {
        (n.noise({ flt: "highpass", fc: 6e3, a: 0.001, d: 0.005, g: 0.2 }),
          n.ring(2400, pl, { a: 0.001, d: 0.13, g: 0.2 }));
      },
      { ...xn, loud: -32, len: 0.25, gap: 0.12, prio: 0, jitter: 0.06, rev: 0.1 },
    ),
    fx_tower_destroyed: At(
      "状态与系统",
      "防御塔倒塌",
      (n) => {
        const t = n.drive(3);
        (n.osc({ f: 82, f1: 28, ft: 0.4, a: 0.004, d: 1.3, g: 0.8, to: t }),
          n.osc({ w: "triangle", f: 240, f1: 60, ft: 0.3, a: 0.003, d: 0.45, g: 0.45, to: t }),
          n.noise({ k: "pink", flt: "lowpass", fc: 1600, fc1: 150, a: 0.004, d: 1.5, g: 0.9, to: t }),
          n.noise({ flt: "bandpass", fc: 1800, q: 0.6, a: 0.001, d: 0.13, g: 0.8, to: t }),
          n.scatter(14, 0.02, 0.7, (e) =>
            n.ring(n.rr(1500, 5e3), ga, { t: e, a: 0.001, d: n.rr(0.08, 0.25), g: 0.1 }),
          ),
          n.noise({ k: "brown", flt: "lowpass", fc: 320, t: 0.15, a: 0.25, h: 0.5, d: 0.9, g: 0.6 }),
          n.scatter(12, 0.2, 1.4, (e) => {
            n.noise({
              flt: "bandpass",
              fc: n.rr(300, 1200),
              q: 2,
              t: e,
              a: 0.001,
              d: n.rr(0.05, 0.14),
              g: n.rr(0.2, 0.45),
            });
          }),
          n.fm({ f: 880, f1: 110, ft: 0.9, ratio: 1.5, idx: 3, idx1: 0.3, a: 0.01, d: 1, g: 0.14 }));
      },
      { ...xn, loud: -12, len: 2.6, gap: 0.3, prio: 3, range: 46, rev: 0.32 },
    ),
    fx_core_destroyed: At(
      "状态与系统",
      "水晶爆炸",
      (n) => {
        (n.fm({ f: 200, f1: 2200, ft: 0.6, ratio: 1.5, idx: 4, a: 0.5, d: 0.12, g: 0.3 }),
          n.noise({ flt: "bandpass", fc: 600, fc1: 6e3, fct: 0.6, q: 2, a: 0.55, d: 0.06, g: 0.5 }),
          n.scatter(6, 0, 0.5, (s) => n.ring(n.rr(2e3, 5e3), ga, { t: s, a: 0.001, d: 0.1, g: 0.06 })));
        const t = 0.62,
          e = n.drive(3.5);
        (n.osc({ f: 64, f1: 22, ft: 0.7, t, a: 0.004, d: 2.4, g: 0.85, to: e }),
          n.osc({ f: 96, f1: 30, ft: 0.5, t: t + 0.08, a: 0.006, d: 1.6, g: 0.5, to: e }),
          n.osc({ w: "triangle", f: 260, f1: 55, ft: 0.4, t, a: 0.003, d: 0.6, g: 0.45, to: e }),
          n.noise({ k: "pink", flt: "lowpass", fc: 2400, fc1: 120, t, a: 0.004, d: 2.2, g: 1, to: e }),
          n.noise({ flt: "bandpass", fc: 1500, q: 0.5, t, a: 0.001, d: 0.16, g: 0.9 }),
          n.scatter(26, t + 0.02, 1.6, (s) =>
            n.ring(n.rr(1200, 5200), ga, { t: s, a: 0.001, d: n.rr(0.1, 0.35), g: 0.09 }),
          ),
          n.scatter(14, t + 0.2, 2, (s) => {
            n.noise({
              flt: "bandpass",
              fc: n.rr(250, 1100),
              q: 2,
              t: s,
              a: 0.001,
              d: n.rr(0.06, 0.16),
              g: n.rr(0.15, 0.3),
            });
          }),
          n.fm({ f: 1760, f1: 55, ft: 2.2, ratio: 1.5, idx: 3, idx1: 0.2, t, a: 0.01, d: 2.4, g: 0.12 }),
          n.osc({ f: 36.7, t: t + 0.3, a: 0.4, h: 0.6, d: 1.6, g: 0.5 }));
      },
      { ...xn, loud: -10, len: 4.2, gap: 1, poly: 1, prio: 3, range: 400, rev: 0.36 },
    ),
    fx_monster_slain: At(
      "状态与系统",
      "野怪倒地",
      (n) => {
        (n.osc({ w: "triangle", f: 140, f1: 45, a: 0.003, d: 0.32, g: 0.7 }),
          n.noise({ k: "pink", flt: "lowpass", fc: 900, fc1: 250, a: 0.003, d: 0.28, g: 0.6 }),
          n.noise({ k: "pink", flt: "bandpass", fc: 1400, q: 0.8, t: 0.03, a: 0.03, d: 0.3, g: 0.35 }));
      },
      { ...xn, loud: -20, len: 0.6, jitter: 0.05 },
    ),
    fx_drake_breath_warn: At(
      "状态与系统",
      "河道巨龙·吐息预警(蓄息)",
      (n) => {
        const t = Math.min(1.6, Math.max(0.4, n.dur));
        (n.noise({ flt: "bandpass", fc: 350, fc1: 2200, fct: t, q: 1.6, a: t * 0.95, d: 0.06, g: 0.7 }),
          n.noise({ flt: "highpass", fc: 4500, a: t * 0.95, d: 0.05, g: 0.08 }));
        const e = n.drive(3, n.filt("lowpass", 2400, 0.6)),
          s = n.filt("lowpass", 260, 2, e);
        (n.ramp(s.frequency, [
          [0, 260],
          [t, 1100],
        ]),
          n.osc({
            w: "sawtooth",
            f: 58,
            f1: 104,
            ft: t,
            a: t * 0.9,
            d: 0.1,
            g: 0.4,
            vib: 80,
            vr: 26,
            vd: 0,
            to: s,
          }),
          n.osc({
            w: "sawtooth",
            f: 87,
            f1: 156,
            ft: t,
            a: t * 0.9,
            d: 0.1,
            g: 0.25,
            vib: 60,
            vr: 35,
            vd: 0,
            to: s,
          }),
          [0, 3, 7, 10, 14].forEach((a, o) =>
            n.fm({
              f: It(62 + a),
              ratio: 2.4,
              idx: 1.6,
              idx1: 0.1,
              t: t * (0.12 + o * 0.17),
              a: 0.004,
              d: 0.22,
              g: 0.09 + o * 0.02,
            }),
          ));
        const i = n.gain(0.6);
        (n.lfo(i.gain, 9, 0.4, 0, t + 0.1, 22),
          n.osc({
            w: "softsq",
            f: 311,
            f1: 622,
            ft: t,
            a: t * 0.92,
            d: 0.06,
            g: 0.7,
            to: n.filt("lowpass", 2600, 1, i),
          }),
          n.osc({ f: 933, f1: 1866, ft: t, a: t * 0.95, d: 0.05, g: 0.2, to: i }));
      },
      { ...xn, loud: -18, len: 0.95, gap: 0.5, poly: 1, range: 34, rev: 0.26 },
    ),
    fx_drake_breath: At(
      "状态与系统",
      "河道巨龙·吐息喷吐",
      (n) => {
        const t = Math.min(1.6, Math.max(0.3, n.dur)),
          e = Math.max(0.05, t - 0.12),
          s = n.gain(0.75);
        n.lfo(s.gain, 23, 0.25, 0, t + 0.5);
        const i = n.filt("bandpass", 1500, 0.7, s);
        (n.ramp(i.frequency, [
          [0, 2400],
          [0.12, 1500],
          [t, 800],
        ]),
          n.noise({ a: 0.03, h: e, d: 0.35, g: 2.6, to: i }),
          n.noise({ k: "pink", flt: "lowpass", fc: 520, fc1: 200, a: 0.04, h: e, d: 0.4, g: 0.4, to: s }),
          n.noise({ flt: "bandpass", fc: 5200, q: 2.5, a: 0.05, h: e, d: 0.3, g: 0.25, to: s }));
        const a = n.drive(3, n.filt("lowpass", 1800, 0.6, n.gain(0.4)));
        (n.osc({
          w: "sawtooth",
          f: 74,
          f1: 52,
          ft: t,
          a: 0.03,
          h: e,
          d: 0.3,
          g: 0.35,
          vib: 90,
          vr: 31,
          vd: 0,
          to: n.filt("lowpass", 700, 1.5, a),
        }),
          n.osc({ f: 62, f1: 40, a: 0.05, h: e * 0.8, d: 0.5, g: 0.15 }),
          n.noise({ flt: "bandpass", fc: 1100, q: 0.6, a: 0.004, d: 0.1, g: 0.5 }));
        const o = Math.max(1, Math.round(yn.breathTicks));
        for (let r = 1; r < o; r++)
          n.noise({ k: "pink", flt: "bandpass", fc: 700, q: 1, t: (t * r) / o, a: 0.01, d: 0.12, g: 0.4 });
        n.noise({ flt: "highpass", fc: 3800, t, a: 0.08, d: 0.45, g: 0.07 });
      },
      { ...xn, loud: -14, len: 1.3, gap: 0.5, poly: 1, prio: 3, range: 34, rev: 0.3 },
    ),
    fx_buff_gain: At(
      "状态与系统",
      "获得野区增益",
      (n) => {
        const t = n.filt("lowpass", 800, 1);
        (n.ramp(t.frequency, [
          [0, 800],
          [0.3, 3200],
          [0.8, 1e3],
        ]),
          [Kl, Zl, $r].forEach((e, s) =>
            n.osc({ w: "softsaw", f: e, det: s * 6 - 6, a: 0.15, d: 0.6, g: 0.22, to: t }),
          ),
          n.noise({ flt: "bandpass", fc: 600, fc1: 5200, q: 1.2, a: 0.25, d: 0.1, g: 0.3 }),
          en(n, er, 0.26, 0.7, 0.7),
          en(n, sg, 0.33, 0.7, 0.6),
          n.osc({ f: 73.4, a: 0.15, d: 0.5, g: 0.4 }));
      },
      { ...xn, loud: -18, len: 1.2, rev: 0.28 },
    ),
    player_hurt: At(
      "状态与系统",
      "玩家受击",
      (n, t) => {
        (n.osc({ f: 180, f1: 70, a: 0.002, d: 0.09 + t * 0.05, g: 0.8 }),
          n.noise({ flt: "bandpass", fc: 900, q: 1, a: 0.002, d: 0.07, g: 0.5 }),
          n.noise({ flt: "highpass", fc: 3e3, a: 0.001, d: 0.012, g: 0.2 + t * 0.3 }));
      },
      { ...xn, bus: "ui", loud: -22, len: 0.3, gap: 0.1, group: "hurt", jitter: 0.06, rev: 0.05 },
    ),
    player_hurt_heavy: At(
      "状态与系统",
      "玩家受重击",
      (n) => {
        const t = n.drive(3);
        (n.osc({ w: "triangle", f: 190, f1: 55, a: 0.002, d: 0.3, g: 0.8, to: t }),
          n.noise({ flt: "bandpass", fc: 1100, q: 0.8, a: 0.001, d: 0.1, g: 0.9, to: t }),
          n.noise({ k: "pink", flt: "lowpass", fc: 500, a: 0.01, d: 0.25, g: 0.4 }),
          n.osc({ f: 2400, a: 0.01, d: 0.4, g: 0.025 }));
      },
      { ...xn, bus: "ui", loud: -17, len: 0.6, gap: 0.12, group: "hurt", prio: 3, jitter: 0.04, rev: 0.08 },
    ),
    skill_hit: At(
      "状态与系统",
      "技能命中确认",
      (n) => {
        (n.fm({ f: 1320, ratio: 2, idx: 1, idx1: 0.05, a: 0.001, d: 0.11, g: 0.4 }),
          n.noise({ flt: "highpass", fc: 5e3, a: 0.001, d: 0.012, g: 0.25 }),
          n.osc({ f: 660, a: 0.001, d: 0.05, g: 0.15 }));
      },
      { ...xn, bus: "ui", loud: -27, len: 0.25, gap: 0.08, jitter: 0.04, rev: 0.08 },
    ),
    heartbeat: At(
      "状态与系统",
      "濒死心跳",
      (n) => {
        (n.osc({ w: "triangle", f: 120, f1: 70, a: 0.006, d: 0.12, g: 1 }),
          n.osc({ f: 240, f1: 140, a: 0.004, d: 0.06, g: 0.4 }),
          n.noise({ k: "pink", flt: "bandpass", fc: 400, q: 2, a: 0.003, d: 0.04, g: 0.5 }),
          n.osc({ w: "triangle", f: 105, f1: 62, t: 0.24, a: 0.006, d: 0.14, g: 0.7 }),
          n.osc({ f: 210, f1: 124, t: 0.24, a: 0.004, d: 0.06, g: 0.28 }),
          n.noise({ k: "pink", flt: "bandpass", fc: 350, q: 2, t: 0.24, a: 0.003, d: 0.04, g: 0.3 }));
      },
      { ...xn, bus: "ui", loud: -22, len: 0.6, gap: 0.5, poly: 1, rev: 0 },
    ),
    death_hero_ally: At(
      "状态与系统",
      "友方英雄阵亡",
      (n) => {
        const t = n.filt("lowpass", 1e3, 0.9);
        (n.osc({ w: "softsaw", f: Zl, a: 0.01, h: 0.12, d: 0.25, g: 0.3, to: t }),
          n.osc({ w: "softsaw", f: Kl, t: 0.2, a: 0.01, h: 0.2, d: 0.6, g: 0.34, to: t }),
          n.osc({ w: "softsaw", f: jS, t: 0.2, a: 0.01, h: 0.2, d: 0.6, g: 0.18, to: t }),
          n.noise({ flt: "bandpass", fc: 3e3, fc1: 300, q: 1, a: 0.02, d: 0.6, g: 0.3 }),
          n.osc({ f: 110, f1: 45, a: 0.003, d: 0.3, g: 0.7 }));
      },
      { ...xn, loud: -18, len: 1.2, rev: 0.26 },
    ),
    death_hero_enemy: At(
      "状态与系统",
      "敌方英雄阵亡",
      (n) => {
        (n.noise({ k: "pink", flt: "lowpass", fc: 4200, fc1: 500, a: 0.002, d: 0.32, g: 0.8 }),
          n.osc({ w: "triangle", f: 180, f1: 60, a: 0.002, d: 0.22, g: 0.5 }),
          [Ql, Yf, ko].forEach((t, e) => en(n, t, 0.03 + e * 0.06, 0.4, 0.95)),
          n.noise({ flt: "highpass", fc: 6e3, t: 0.05, a: 0.02, d: 0.4, g: 0.07 }));
      },
      { ...xn, loud: -17, len: 0.9, rev: 0.24 },
    ),
    death_player: At(
      "状态与系统",
      "玩家阵亡",
      (n) => {
        const t = n.drive(2);
        n.osc({ f: 72, f1: 28, ft: 0.4, a: 0.004, d: 1.1, g: 1, to: t });
        const e = n.filt("lowpass", 1400, 1);
        (n.ramp(e.frequency, [
          [0, 1400],
          [1, 200],
        ]),
          n.osc({ w: "softsaw", f: Zl, f1: 110, ft: 0.95, a: 0.02, h: 0.3, d: 0.7, g: 0.4, to: e }),
          n.osc({ w: "softsaw", f: Kl, f1: 73.4, ft: 0.95, a: 0.02, h: 0.3, d: 0.7, g: 0.3, to: e }),
          n.noise({ flt: "bandpass", fc: 3200, fc1: 200, fct: 0.9, q: 1.2, a: 0.03, d: 0.9, g: 0.5 }),
          n.fm({ f: Kl, ratio: 3.5, idx: 2, idx1: 0.05, idt: 0.4, t: 0.5, a: 0.004, d: 1.5, g: 0.2 }),
          n.fm({ f: WS, ratio: 3.5, idx: 2, idx1: 0.05, idt: 0.4, t: 0.52, a: 0.004, d: 1.5, g: 0.16 }));
      },
      { ...xn, bus: "ui", loud: -14, len: 2.2, prio: 3, rev: 0.3 },
    ),
    death_minion: At(
      "状态与系统",
      "小兵阵亡",
      (n) => {
        (n.noise({ flt: "bandpass", fc: 1300, fc1: 400, q: 1, a: 0.002, d: 0.13, g: 0.6 }),
          n.osc({ f: 240, f1: 90, a: 0.002, d: 0.1, g: 0.5 }),
          n.scatter(3, 0.02, 0.12, (t) =>
            n.ring(n.rr(900, 1800), [1, 2.4], { t, a: 0.001, d: 0.04, g: 0.08 }),
          ));
      },
      { ...xn, loud: -26, len: 0.35, gap: 0.09, poly: 3, prio: 0, jitter: 0.1, rev: 0.08 },
    ),
    death_minion_big: At(
      "状态与系统",
      "攻城兵/超级兵阵亡",
      (n) => {
        (n.noise({ k: "pink", flt: "lowpass", fc: 1500, fc1: 250, a: 0.002, d: 0.3, g: 0.8 }),
          n.osc({ f: 130, f1: 48, a: 0.002, d: 0.26, g: 0.8 }),
          n.scatter(5, 0.02, 0.25, (t) => n.ring(n.rr(400, 900), i1, { t, a: 0.001, d: 0.09, g: 0.1 })));
      },
      { ...xn, loud: -22, len: 0.6, gap: 0.1, prio: 1, jitter: 0.06 },
    ),
    death_monster: At(
      "状态与系统",
      "野怪·倒下",
      (n, t) => {
        t < 0.5
          ? n.sub(1, (e) => {
              const s = e.filt("lowpass", 1500, 1.5);
              (e.osc({
                w: "sawtooth",
                f: 330,
                f1: 110,
                ft: 0.3,
                a: 0.01,
                d: 0.32,
                g: 0.5,
                vib: 50,
                vr: 19,
                vd: 0,
                to: s,
              }),
                e.noise({ k: "pink", flt: "bandpass", fc: 900, fc1: 400, q: 1, a: 0.01, d: 0.3, g: 0.4 }),
                e.osc({ f: 110, f1: 50, t: 0.22, a: 0.003, d: 0.2, g: 0.7 }));
            })
          : t < 1.5
            ? n.sub(0.86, (e) => {
                const s = e.filt("bandpass", 850, 2.2);
                (e.osc({
                  w: "reed",
                  f: 330,
                  f1: 165,
                  ft: 0.5,
                  a: 0.03,
                  h: 0.15,
                  d: 0.4,
                  g: 0.5,
                  vib: 30,
                  vr: 7,
                  vd: 0.1,
                  to: s,
                }),
                  e.osc({ w: "softsaw", f: 330, f1: 165, ft: 0.5, a: 0.04, h: 0.12, d: 0.36, g: 0.2, to: s }),
                  e.osc({ f: 100, f1: 44, t: 0.3, a: 0.003, d: 0.26, g: 0.7 }),
                  e.scatter(9, 0.32, 0.4, (i) =>
                    e.ring(e.rr(2200, 5600), ga, { t: i, a: 0.001, d: e.rr(0.05, 0.16), g: 0.07 }),
                  ));
              })
            : t < 2.5
              ? n.sub(0.51, (e) => {
                  Fc(e, 0, 0.5, 0.8, 120, 62, 400, 1300);
                  const s = e.drive(2);
                  (e.osc({ f: 92, f1: 34, t: 0.42, a: 0.003, d: 0.4, g: 0.8, to: s }),
                    e.noise({
                      k: "pink",
                      flt: "lowpass",
                      fc: 1200,
                      fc1: 250,
                      t: 0.42,
                      a: 0.003,
                      d: 0.3,
                      g: 0.6,
                      to: s,
                    }),
                    e.noise({ flt: "highpass", fc: 3200, fc1: 1500, t: 0.45, a: 0.03, d: 0.45, g: 0.12 }));
                })
              : n.sub(0.75, (e) => {
                  const s = e.gain(0.6);
                  (e.lfo(s.gain, 18, 0.4, 0, 0.45, 5),
                    e.noise({ flt: "bandpass", fc: 1400, fc1: 600, q: 1.5, a: 0.02, d: 0.4, g: 0.7, to: s }),
                    e.osc({ f: 2300, f1: 900, ft: 0.35, a: 0.01, d: 0.35, g: 0.06 }),
                    e.noise({
                      k: "pink",
                      flt: "lowpass",
                      fc: 2200,
                      fc1: 600,
                      t: 0.3,
                      a: 0.01,
                      d: 0.16,
                      g: 0.4,
                    }));
                });
      },
      {
        ...xn,
        loud: -21,
        len: 0.8,
        jitter: 0.06,
        variants: [
          { label: "苔背獾", v: 0 },
          { label: "霜晶巨鹿", v: 1 },
          { label: "炽焰巨熊", v: 2 },
          { label: "荧翅蛾", v: 5 },
        ],
      },
    ),
    epic_roar: At(
      "状态与系统",
      "史诗野怪现身",
      (n, t) => {
        t < 0.5
          ? n.sub(0.89, (e) => {
              const s = e.gain(0.6);
              (e.lfo(s.gain, 2.5, 0.35, 0, 1.1, 7),
                e.noise({
                  k: "pink",
                  flt: "bandpass",
                  fc: 500,
                  fc1: 1500,
                  fct: 1,
                  q: 1.2,
                  a: 0.9,
                  d: 0.12,
                  g: 0.9,
                  to: s,
                }),
                e.noise({ k: "brown", flt: "lowpass", fc: 200, a: 0.8, d: 0.3, g: 0.5 }),
                fu(e, 1, 1),
                zy(e, 1.55, 1.1, 1));
            })
          : n.sub(1, (e) => {
              (e.osc({ f: 2200, f1: 240, ft: 0.95, a: 0.5, d: 0.5, g: 0.12 }),
                e.noise({ flt: "bandpass", fc: 5e3, fc1: 700, fct: 0.95, q: 2, a: 0.85, d: 0.1, g: 0.5 }));
              const s = 1,
                i = e.drive(3);
              (e.osc({ f: 70, f1: 24, ft: 0.5, t: s, a: 0.004, d: 1.4, g: 0.9, to: i }),
                e.noise({
                  k: "pink",
                  flt: "lowpass",
                  fc: 2200,
                  fc1: 160,
                  t: s,
                  a: 0.004,
                  d: 1.1,
                  g: 0.9,
                  to: i,
                }),
                e.noise({ flt: "highpass", fc: 3e3, t: s + 0.03, a: 0.05, d: 0.9, g: 0.2 }));
              for (let a = 0; a < 9; a++) {
                const o = s + 0.25 + 1.3 * Math.pow(a / 9, 0.75);
                (e.noise({ flt: "bandpass", fc: 400 + a * 70, q: 2.2, t: o, a: 0.001, d: 0.06, g: 0.35 }),
                  e.osc({ f: 120 + a * 9, f1: 70, t: o, a: 0.002, d: 0.07, g: 0.3 }));
              }
              ([Kl, Zl, $r, ko, Ql].forEach((a, o) =>
                e.fm({
                  f: a,
                  ratio: 1.41,
                  idx: 1.8,
                  idx1: 0.3,
                  t: s + 1.5 + o * 0.05,
                  a: 0.3,
                  h: 0.3,
                  d: 0.9,
                  g: 0.09,
                }),
              ),
                e.osc({ f: 36.7, t: s + 1.4, a: 0.4, h: 0.3, d: 1, g: 0.4 }));
            });
      },
      {
        ...xn,
        loud: -14,
        len: 3.6,
        gap: 1,
        poly: 1,
        prio: 3,
        range: 400,
        rev: 0.34,
        variants: [
          { label: "河道巨龙", v: 0 },
          { label: "星陨巨灵", v: 1 },
        ],
      },
    ),
    epic_fall: At(
      "状态与系统",
      "史诗野怪倒下",
      (n, t) => {
        t < 0.5
          ? n.sub(0.85, (e) => {
              (zy(e, 0, 0.75, 0.9, 1.25),
                e.noise({ flt: "highpass", fc: 4e3, t: 0.6, a: 0.001, d: 0.03, g: 0.4 }),
                e.scatter(7, 0.6, 0.25, (i) =>
                  e.ring(e.rr(2200, 5200), ga, { t: i, a: 0.001, d: e.rr(0.08, 0.2), g: 0.1 }),
                ));
              const s = e.drive(2.5);
              (e.osc({ f: 64, f1: 24, ft: 0.5, t: 1.25, a: 0.004, d: 1.2, g: 0.8, to: s }),
                e.noise({
                  k: "pink",
                  flt: "lowpass",
                  fc: 1500,
                  fc1: 140,
                  t: 1.25,
                  a: 0.004,
                  d: 0.9,
                  g: 0.8,
                  to: s,
                }),
                fu(e, 1.8, 0.7),
                e.noise({
                  flt: "bandpass",
                  fc: 2500,
                  fc1: 7e3,
                  fct: 1.1,
                  q: 2,
                  t: 2,
                  a: 0.5,
                  d: 0.6,
                  g: 0.1,
                }),
                [$r, ko, er, sg].forEach((i, a) => en(e, i, 2 + a * 0.12, 0.9, 0.5)));
            })
          : n.sub(1, (e) => {
              ([0, 0.34, 0.68].forEach((a, o) => {
                (e.fm({
                  f: 660 - o * 110,
                  f1: 180,
                  ft: 0.5,
                  ratio: 1.41,
                  idx: 3,
                  idx1: 0.4,
                  t: a,
                  a: 0.002,
                  d: 0.5,
                  g: 0.3,
                }),
                  e.noise({ flt: "bandpass", fc: 2600, q: 1.5, t: a, a: 0.001, d: 0.03, g: 0.5 }));
              }),
                fu(e, 1, 0.8),
                fu(e, 1.3, 0.7));
              const s = e.drive(2.5);
              (e.osc({ f: 58, f1: 24, ft: 0.6, t: 1.6, a: 0.01, d: 1.3, g: 0.8, to: s }),
                e.noise({
                  k: "pink",
                  flt: "lowpass",
                  fc: 1300,
                  fc1: 140,
                  t: 1.6,
                  a: 0.05,
                  d: 1,
                  g: 0.8,
                  to: s,
                }),
                e.scatter(10, 1.6, 0.9, (a) =>
                  e.noise({
                    flt: "bandpass",
                    fc: e.rr(300, 1100),
                    q: 2,
                    t: a,
                    a: 0.001,
                    d: e.rr(0.05, 0.12),
                    g: e.rr(0.15, 0.3),
                  }),
                ),
                e.osc({ f: 300, f1: 1800, ft: 0.4, t: 2.2, a: 0.35, d: 0.08, g: 0.2 }),
                [$r, ko, er].forEach((a) => en(e, a, 2.6, 1, 0.6)));
              const i = [86, 88, 91, 93, 96, 98].map(It);
              e.scatter(12, 2.6, 0.9, (a, o) => en(e, i[o % i.length], a, 0.6, 0.4));
            });
      },
      {
        ...xn,
        loud: -13,
        len: 3.6,
        gap: 1,
        poly: 1,
        prio: 3,
        range: 400,
        rev: 0.32,
        variants: [
          { label: "河道巨龙", v: 0 },
          { label: "星陨巨灵", v: 1 },
        ],
      },
    ),
    kill_player: At(
      "状态与系统",
      "玩家完成击杀",
      (n) => {
        ([$r, ko, er].forEach((t, e) => {
          (Qi(n, t, e * 0.05, e === 2 ? 0.3 : 0.06, 0.9), en(n, t * 2, e * 0.05, 0.4, 0.5));
        }),
          n.noise({ flt: "highpass", fc: 6e3, t: 0.1, a: 0.01, d: 0.4, g: 0.06 }));
      },
      { ...xn, bus: "ui", loud: -17, len: 0.8, rev: 0.24 },
    ),
    kill_ally: At(
      "状态与系统",
      "友方完成击杀",
      (n) => {
        (en(n, ko, 0, 0.3, 0.6), en(n, er, 0.08, 0.5, 0.7));
      },
      { ...xn, bus: "ui", loud: -25, len: 0.7, rev: 0.24 },
    ),
    kill_enemy: At(
      "状态与系统",
      "敌方完成击杀",
      (n) => {
        (zl(n, $r, 0, 0.1, 0.8),
          zl(n, Zl, 0.11, 0.3, 0.9),
          n.osc({ f: 110, f1: 73, a: 0.01, d: 0.4, g: 0.2 }));
      },
      { ...xn, bus: "ui", loud: -24, len: 0.7, rev: 0.24 },
    ),
    levelup_player: At(
      "状态与系统",
      "玩家升级",
      (n) => {
        ([ng, Yf, Ql, cu].forEach((e, s) => {
          (en(n, e, s * 0.06, 0.6, 0.8), en(n, e / 2, s * 0.06, 0.4, 0.4));
        }),
          [Yf, Ql, cu, qS].forEach((e) => en(n, e, 0.26, 1, 0.5)));
        const t = n.filt("lowpass", 600, 0.8);
        (n.ramp(t.frequency, [
          [0, 600],
          [0.3, 2400],
          [1, 800],
        ]),
          [It(60), It(67), Dy].forEach((e, s) =>
            n.osc({ w: "softsaw", f: e, det: s * 7 - 7, a: 0.25, h: 0.1, d: 0.6, g: 0.14, to: t }),
          ),
          n.noise({ flt: "bandpass", fc: 800, fc1: 7e3, q: 1.2, a: 0.26, d: 0.12, g: 0.18 }),
          n.osc({ f: 130.8, a: 0.1, d: 0.5, g: 0.3 }));
      },
      { ...xn, bus: "ui", loud: -16, len: 1.5, rev: 0.3 },
    ),
    respawn_player: At(
      "状态与系统",
      "玩家复活",
      (n) => {
        (n.osc({ f: 73.4, f1: 146.8, a: 0.35, d: 0.5, g: 0.6 }),
          n.noise({ flt: "bandpass", fc: 300, fc1: 5e3, q: 1.2, a: 0.4, d: 0.16, g: 0.4 }),
          [$r, ko, er, It(90)].forEach((e, s) => en(n, e, 0.4 + s * 0.035, 1.1, 0.7)));
        const t = n.filt("lowpass", 1800, 0.8);
        [Kl, Zl].forEach((e) =>
          n.osc({ w: "softsaw", f: e, t: 0.38, a: 0.05, h: 0.2, d: 0.7, g: 0.16, to: t }),
        );
      },
      { ...xn, bus: "ui", loud: -17, len: 1.7, rev: 0.3 },
    ),
    coin: At(
      "状态与系统",
      "补兵金币",
      (n, t) => {
        const e = 1 + t * 0.25;
        (n.noise({ flt: "highpass", fc: 6e3, a: 0.001, d: 0.006, g: 0.3 }),
          n.ring(1976 * e, pl, { a: 0.001, d: 0.2, g: 0.28 }),
          n.ring(2637 * e, pl, { t: 0.055, a: 0.001, d: 0.34, g: 0.3 }));
      },
      { ...xn, bus: "ui", loud: -20, len: 0.5, gap: 0.07, poly: 3, group: "coin", jitter: 0.02, rev: 0.14 },
    ),
    coin_big: At(
      "状态与系统",
      "大额金币",
      (n) => {
        (n.osc({ f: 180, f1: 90, a: 0.002, d: 0.1, g: 0.3 }),
          n.scatter(7, 0, 0.3, (t, e) =>
            n.ring(1760 * (1 + e * 0.09), pl, { t, a: 0.001, d: n.rr(0.15, 0.3), g: 0.16 }),
          ),
          n.ring(3520, pl, { t: 0.32, a: 0.001, d: 0.45, g: 0.2 }),
          n.noise({ flt: "highpass", fc: 7e3, a: 0.02, d: 0.35, g: 0.06 }));
      },
      { ...xn, bus: "ui", loud: -19, len: 0.9, gap: 0.2, rev: 0.16 },
    ),
    buy: At(
      "状态与系统",
      "购买装备",
      (n) => {
        ([0, 0.045, 0.09].forEach((t, e) =>
          n.ring(2637 / (1 + e * 0.12), pl, { t, a: 0.001, d: 0.12, g: 0.18 }),
        ),
          n.osc({ f: 200, f1: 120, t: 0.1, a: 0.002, d: 0.08, g: 0.4 }),
          en(n, ko, 0.14, 0.4, 0.8),
          en(n, er, 0.22, 0.6, 0.9));
      },
      { ...xn, bus: "ui", loud: -19, len: 0.9, gap: 0.25, group: "buy", rev: 0.18 },
    ),
    reject: At(
      "状态与系统",
      "操作被拒绝",
      (n) => {
        const t = n.filt("lowpass", 1100, 1);
        (n.osc({ w: "softsq", f: 247, a: 0.004, d: 0.07, g: 0.5, to: t }),
          n.osc({ w: "softsq", f: 233, t: 0.09, a: 0.004, d: 0.1, g: 0.5, to: t }));
      },
      { ...xn, bus: "ui", loud: -26, len: 0.3, gap: 0.25, group: "error", rev: 0.04 },
    ),
    recall_channel: At(
      "状态与系统",
      "回城引导(持续)",
      (n) => {
        const t = Math.max(1, n.dur),
          e = n.gain(1);
        n.lfo(e.gain, 3, 0.3, 0, t + 0.3, 9);
        const s = n.filt("lowpass", 500, 1.2, e);
        (n.ramp(s.frequency, [
          [0, 500],
          [t, 2600],
        ]),
          n.osc({ w: "softsaw", f: 146.8, f1: 220, ft: t, a: t * 0.95, d: 0.15, g: 0.5, to: s }),
          n.osc({ w: "softsaw", f: 220.5, f1: 330, ft: t, a: t * 0.95, d: 0.15, g: 0.35, to: s }),
          n.noise({
            flt: "bandpass",
            fc: 1200,
            fc1: 5e3,
            fct: t,
            q: 2,
            a: t * 0.95,
            d: 0.15,
            g: 0.14,
            to: e,
          }));
        const i = [74, 76, 79, 81, 84, 86, 88, 91, 93, 96],
          a = Math.min(i.length, Math.floor(t / 0.5));
        for (let o = 0; o < a; o++)
          n.fm({
            f: It(i[o + i.length - a]),
            ratio: 3.01,
            idx: 1.5,
            idx1: 0.05,
            t: o * 0.5 + 0.25,
            a: 0.002,
            d: 0.4,
            g: 0.08 + o * 0.012,
          });
      },
      { ...xn, bus: "ui", loud: -24, len: 5, gap: 0.5, poly: 1, rev: 0.24 },
    ),
  },
  nr = { bus: "ui", loud: -25, len: 0.3, gap: 0.03, poly: 2, prio: 2, jitter: 0, rev: 0.08 },
  YS = {
    ui_click: At(
      "界面",
      "点击",
      (n) => {
        (n.osc({ f: 1250, f1: 800, a: 0.001, d: 0.035, g: 0.5 }),
          n.noise({ flt: "highpass", fc: 4e3, a: 0.001, d: 0.005, g: 0.3 }),
          n.osc({ w: "triangle", f: 400, a: 0.001, d: 0.03, g: 0.2 }));
      },
      { ...nr, len: 0.15 },
    ),
    ui_hover: At(
      "界面",
      "悬停",
      (n) => {
        (n.osc({ f: 2200, a: 0.002, d: 0.018, g: 0.4 }), n.osc({ f: 3300, a: 0.002, d: 0.012, g: 0.12 }));
      },
      { ...nr, loud: -36, len: 0.1, gap: 0.05, prio: 0, rev: 0.04 },
    ),
    ui_confirm: At(
      "界面",
      "确认",
      (n) => {
        (en(n, It(86), 0, 0.3, 0.8),
          en(n, It(93), 0.065, 0.45, 0.9),
          n.osc({ f: 220, f1: 147, a: 0.002, d: 0.06, g: 0.2 }));
      },
      { ...nr, loud: -22, len: 0.6, gap: 0.08, rev: 0.16 },
    ),
    ui_back: At(
      "界面",
      "返回",
      (n) => {
        (en(n, It(81), 0, 0.2, 0.7),
          en(n, It(76), 0.06, 0.3, 0.6),
          n.noise({ flt: "bandpass", fc: 2400, fc1: 900, q: 2, a: 0.01, d: 0.08, g: 0.08 }));
      },
      { ...nr, loud: -25, len: 0.45, gap: 0.08, rev: 0.12 },
    ),
    ui_select: At(
      "界面",
      "选中",
      (n) => {
        (n.osc({ w: "triangle", f: 1320, a: 0.002, d: 0.16, g: 0.4 }),
          en(n, It(88), 0, 0.3, 0.7),
          n.noise({ flt: "bandpass", fc: 1500, fc1: 5e3, q: 2, a: 0.02, d: 0.06, g: 0.1 }),
          n.osc({ f: 147, a: 0.002, d: 0.08, g: 0.3 }));
      },
      { ...nr, loud: -22, len: 0.45, gap: 0.06, rev: 0.16 },
    ),
    ui_buy: At(
      "界面",
      "购买",
      (n) => {
        ([0, 0.045, 0.09].forEach((t, e) =>
          n.ring(2637 / (1 + e * 0.12), pl, { t, a: 0.001, d: 0.12, g: 0.18 }),
        ),
          n.osc({ f: 200, f1: 120, t: 0.1, a: 0.002, d: 0.08, g: 0.4 }),
          en(n, It(81), 0.14, 0.4, 0.8),
          en(n, It(86), 0.22, 0.6, 0.9));
      },
      { ...nr, loud: -19, len: 0.9, gap: 0.25, group: "buy", rev: 0.18 },
    ),
    ui_error: At(
      "界面",
      "错误",
      (n) => {
        const t = n.filt("lowpass", 1e3, 1);
        (n.osc({ w: "softsq", f: 220, a: 0.004, d: 0.07, g: 0.6, to: t }),
          n.osc({ w: "softsq", f: 207.6, t: 0.1, a: 0.004, d: 0.12, g: 0.6, to: t }),
          n.noise({ flt: "bandpass", fc: 500, q: 1, a: 0.002, d: 0.03, g: 0.15 }));
      },
      { ...nr, loud: -24, len: 0.35, gap: 0.25, group: "error", rev: 0.04 },
    ),
    ui_ready: At(
      "界面",
      "就绪",
      (n) => {
        [74, 81, 86, 90].forEach((e, s) => en(n, It(e), s * 0.05, 0.7, 0.8));
        const t = n.filt("lowpass", 2200, 0.8);
        ([62, 69].forEach((e) =>
          n.osc({ w: "softsaw", f: It(e), t: 0.15, a: 0.04, h: 0.1, d: 0.5, g: 0.14, to: t }),
        ),
          n.noise({ flt: "highpass", fc: 6e3, t: 0.12, a: 0.02, d: 0.4, g: 0.05 }));
      },
      { ...nr, loud: -19, len: 1.1, gap: 0.2, rev: 0.26 },
    ),
    ui_countdown: At(
      "界面",
      "倒计时",
      (n) => {
        (n.osc({ f: 880, a: 0.001, d: 0.07, g: 0.6 }),
          n.osc({ w: "triangle", f: 1760, a: 0.001, d: 0.03, g: 0.2 }),
          n.noise({ flt: "bandpass", fc: 2500, q: 2, a: 0.001, d: 0.012, g: 0.2 }));
      },
      { ...nr, loud: -22, len: 0.25, gap: 0.2, rev: 0.14 },
    ),
  },
  r1 = { ...FS, ...GS, ...XS, ...zS, ...YS };

function KS(n) {
  return VS[n] ?? 1;
}

const ZS = 28,
  QS = 0.8,
  JS = 1.13,
  Kf = { threshold: -9, knee: 6, ratio: 8, attack: 0.003, release: 0.2 };

const Jl = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);

function tT() {
  const t = new Float32Array(4097),
    e = 0.72;
  for (let s = 0; s < 4097; s++) {
    const i = ((s / 4096) * 2 - 1) * 2,
      a = Math.abs(i),
      o = a <= e ? a : e + (1 - e) * Math.tanh((a - e) / (1 - e));
    t[s] = Math.sign(i) * o * 0.985;
  }
  return t;
}
export { r1, KS, ZS, QS, JS, Kf, Jl, tT };
