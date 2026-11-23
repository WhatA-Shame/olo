// 01-audio.js — audio｜47 个顶层语句｜39KB
// 对应 game.pretty.js 第 1–1373 行
// 关键内容：
//   Y6                    近战兵
//   PS                    己方
//   Qi                    lowpass
//   zl                    lowpass
//   Q6                    lowpass
//   Nl                    lowpass
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
const Y6 = {
    melee: {
      name: "近战兵",
      hp: 1100,
      hpPerMin: 75,
      ad: 58,
      adPerMin: 4,
      armor: 40,
      mr: 40,
      attackSpeed: 0.8,
      attackRange: 1.9,
      moveSpeed: 4,
      radius: 0.5,
      projectileSpeed: 0,
      gold: 56,
      xp: 95,
      towerMult: 0.6,
    },
    ranged: {
      name: "远程兵",
      hp: 720,
      hpPerMin: 45,
      ad: 84,
      adPerMin: 6,
      armor: 20,
      mr: 20,
      attackSpeed: 0.75,
      attackRange: 6.5,
      moveSpeed: 4,
      radius: 0.45,
      projectileSpeed: 18,
      gold: 45,
      xp: 70,
      towerMult: 0.6,
    },
    siege: {
      name: "攻城兵",
      hp: 2e3,
      hpPerMin: 140,
      ad: 150,
      adPerMin: 10,
      armor: 80,
      mr: 80,
      attackSpeed: 0.5,
      attackRange: 8,
      moveSpeed: 3.8,
      radius: 0.8,
      projectileSpeed: 14,
      gold: 104,
      xp: 160,
      towerMult: 1.6,
    },
    super: {
      name: "超级兵",
      hp: 4500,
      hpPerMin: 300,
      ad: 220,
      adPerMin: 14,
      armor: 120,
      mr: 120,
      attackSpeed: 0.85,
      attackRange: 2.3,
      moveSpeed: 4,
      radius: 0.9,
      projectileSpeed: 0,
      gold: 118,
      xp: 180,
      towerMult: 1.2,
    },
  },
  v0 = { firstAt: 10, interval: 30, melee: 2, ranged: 1, siegeEvery: 3, stagger: 0.6 },
  K6 = {
    1: {
      hp: 7200,
      ad: 420,
      armor: 80,
      mr: 80,
      attackSpeed: 1,
      attackRange: 8.5,
      radius: 1.6,
      projectileSpeed: 26,
      teamGold: 120,
      lastHitGold: 100,
    },
    2: {
      hp: 8500,
      ad: 480,
      armor: 110,
      mr: 110,
      attackSpeed: 1,
      attackRange: 8.5,
      radius: 1.6,
      projectileSpeed: 26,
      teamGold: 140,
      lastHitGold: 100,
    },
    3: {
      hp: 12e3,
      ad: 540,
      armor: 140,
      mr: 140,
      attackSpeed: 1,
      attackRange: 8.5,
      radius: 1.6,
      projectileSpeed: 26,
      teamGold: 160,
      lastHitGold: 100,
    },
  },
  yr = { rampPerHit: 0.25, rampMax: 1, backdoorReduction: 0.6, minionMult: 1.4 },
  eo = {
    hp: 19e3,
    ad: 560,
    armor: 150,
    mr: 150,
    attackSpeed: 1,
    attackRange: 9,
    radius: 2.6,
    projectileSpeed: 26,
    regen: 40,
    regenDelay: 8,
  },
  Xm = { regenRatio: 0.12, enemyDamageRatio: 0.2 },
  yn = {
    leash: 9,
    buffDuration: 70,
    frostCdr: 0.2,
    frostManaRegen: 0.015,
    emberBurnBase: 14,
    emberBurnPerLevel: 3,
    emberSlow: 0.15,
    drakeTeamGold: 90,
    drakeTeamXp: 160,
    breathFirst: 4,
    breathEvery: 12,
    breathWarn: 0.9,
    breathTime: 0.8,
    breathRecover: 0.5,
    breathRadius: 7.5,
    breathAngle: Math.PI / 3,
    breathTicks: 4,
    breathAdRatio: 3,
    blessingDuration: 80,
    blessingDamage: 0.15,
    blessingRegen: 0.01,
    blessingMinionBoost: 0.4,
    colossusTeamGold: 120,
  },
  rn = {
    mossback: {
      name: "苔背獾",
      hp: 2200,
      hpPerMin: 150,
      ad: 70,
      adPerMin: 5,
      armor: 60,
      mr: 40,
      attackSpeed: 0.7,
      attackRange: 2,
      moveSpeed: 4.6,
      radius: 0.9,
      projectileSpeed: 0,
      gold: 54,
      xp: 77,
      epic: !1,
    },
    glimwing: {
      name: "荧翅蛾",
      hp: 1250,
      hpPerMin: 85,
      ad: 55,
      adPerMin: 4,
      armor: 30,
      mr: 30,
      attackSpeed: 0.9,
      attackRange: 5,
      moveSpeed: 4.8,
      radius: 0.6,
      projectileSpeed: 16,
      gold: 31,
      xp: 45,
      epic: !1,
    },
    frost_golem: {
      name: "蓝buff",
      alias: "霜晶巨鹿",
      reward: `打掉它，${yn.buffDuration} 秒内技能冷却更短、回蓝更快`,
      hp: 4200,
      hpPerMin: 280,
      ad: 110,
      adPerMin: 7,
      armor: 90,
      mr: 60,
      attackSpeed: 0.65,
      attackRange: 2.4,
      moveSpeed: 4.4,
      radius: 1.3,
      projectileSpeed: 0,
      gold: 97,
      xp: 138,
      epic: !1,
    },
    ember_golem: {
      name: "红buff",
      alias: "炽焰巨熊",
      reward: `打掉它，${yn.buffDuration} 秒内普攻附带灼烧和减速`,
      hp: 4200,
      hpPerMin: 280,
      ad: 110,
      adPerMin: 7,
      armor: 90,
      mr: 60,
      attackSpeed: 0.65,
      attackRange: 2.4,
      moveSpeed: 4.4,
      radius: 1.3,
      projectileSpeed: 0,
      gold: 97,
      xp: 138,
      epic: !1,
    },
    abyss_drake: {
      name: "河道巨龙",
      alias: "沉渊鳞龙",
      reward: `打掉它：全队每人 +${yn.drakeTeamGold} 金币、+${yn.drakeTeamXp} 经验`,
      hp: 9e3,
      hpPerMin: 600,
      ad: 190,
      adPerMin: 12,
      armor: 120,
      mr: 100,
      attackSpeed: 0.6,
      attackRange: 3.2,
      moveSpeed: 4,
      radius: 2,
      projectileSpeed: 0,
      gold: 80,
      xp: 120,
      epic: !0,
    },
    star_colossus: {
      name: "星陨巨灵",
      reward: `打掉它：全队 ${yn.blessingDuration} 秒内伤害 +${Math.round(yn.blessingDamage * 100)}%、持续回血、小兵更强`,
      hp: 16e3,
      hpPerMin: 900,
      ad: 260,
      adPerMin: 16,
      armor: 160,
      mr: 140,
      attackSpeed: 0.55,
      attackRange: 3.6,
      moveSpeed: 3.8,
      radius: 2.4,
      projectileSpeed: 0,
      gold: 120,
      xp: 180,
      epic: !0,
    },
  },
  va = {
    startGold: 300,
    passiveGold: 3.9,
    proximityGoldRatio: 0.35,
    shareRadius: 12,
    xpShare: [1, 0.7, 0.52, 0.42, 0.36],
    killGold: 220,
    killGoldPerStreak: 60,
    killGoldMax: 520,
    killGoldMin: 110,
    firstBloodBonus: 100,
    assistRatio: 0.8,
    assistWindow: 10,
    killXp: 140,
    killXpPerLevel: 28,
    multiKillWindow: 10,
  };

function Z6(n) {
  return n >= 15 ? 0 : 160 + 60 * (n - 1);
}

function wS(n, t) {
  return Math.min(60, 6 + n * 1.5 + Math.max(0, t - 600) / 20);
}

const Qd = { start: 660, structureVulnPerMin: 0.2, minionBoostPerMin: 0.22 },
  ui = { hero: 13, minion: 9, monster: 0, tower: 11, core: 13, bushReveal: 2.2, revealOnAttack: 1.5 };

function Qi(n, t, e, s, i, a = 1, o) {
  const r = n.filt("lowpass", 420, 1.1, o),
    l = 2500 * a * (0.55 + 0.45 * i);
  n.ramp(r.frequency, [
    [e, 420],
    [e + 0.045, l],
    [e + 0.22, l * 0.62],
    [e + Math.max(0.3, s + 0.1), l * 0.45],
  ]);
  const c = Math.max(0, s - 0.06);
  (n.osc({ w: "softsaw", f: t, det: -7, t: e, a: 0.022, h: c, d: 0.16, g: 0.2 * i, to: r }),
    n.osc({ w: "softsaw", f: t, det: 8, t: e + 0.003, a: 0.03, h: c, d: 0.16, g: 0.2 * i, to: r }),
    n.osc({ w: "softsq", f: t / 2, t: e, a: 0.03, h: c, d: 0.14, g: 0.07 * i, to: r }));
}

function zl(n, t, e, s, i, a) {
  const o = n.filt("lowpass", 380, 0.9, a),
    r = 2100 * (0.6 + 0.4 * i);
  n.ramp(o.frequency, [
    [e, 380],
    [e + 0.09, r],
    [e + Math.max(0.3, s + 0.15), r * 0.6],
  ]);
  const l = Math.max(0, s - 0.1);
  (n.osc({
    w: "softsaw",
    f: t,
    det: -5,
    t: e,
    a: 0.06,
    h: l,
    d: 0.22,
    g: 0.2 * i,
    vib: 7,
    vr: 5,
    vd: 0.25,
    to: o,
  }),
    n.osc({ w: "reed", f: t, det: 6, t: e, a: 0.07, h: l, d: 0.22, g: 0.12 * i, to: o }));
}

function en(n, t, e, s, i, a) {
  (n.fm({
    f: t,
    ratio: 3.01,
    idx: 0.5 + 2.2 * i,
    idx1: 0.04,
    idt: Math.min(0.35, s),
    t: e,
    a: 0.002,
    d: s,
    g: 0.2 * i,
    to: a,
  }),
    n.osc({ f: t * 2, t: e, a: 0.002, d: s * 0.4, g: 0.045 * i, to: a }),
    n.osc({ f: t * 4.2, t: e, a: 0.001, d: 0.04, g: 0.03 * i, to: a }));
}

function Q6(n, t, e, s, i, a) {
  const o = Math.max(0.2, s),
    r = n.filt("lowpass", 400, 2.2, a);
  (n.ramp(r.frequency, [
    [e, 800 + 4200 * i],
    [e + 0.16, 720],
    [e + o + 0.05, 380],
  ]),
    n.osc({ w: "softsaw", f: t, t: e, a: 0.004, d: o, g: 0.22 * i, to: r }),
    n.osc({ w: "triangle", f: t * 2, t: e, a: 0.004, d: o * 0.5, g: 0.06 * i, to: r }));
}

function Nl(n, t, e, s, i, a = 1, o) {
  const r = n.filt("lowpass", 500, 0.6, o);
  n.ramp(r.frequency, [
    [e, 600 * a],
    [e + s * 0.4, 2300 * a],
    [e + s + 1.3, 900 * a],
  ]);
  const l = n.pan(-0.55, r),
    c = n.pan(0.55, r),
    f = Math.min(1, s * 0.35),
    d = Math.max(0, s - f);
  for (let h = 0; h < t.length; h++) {
    const u = (0.085 * i) / (1 + h * 0.12),
      m = e + h * 0.007;
    (n.osc({ w: "softsaw", f: t[h], det: -9, t: m, a: f, h: d, d: 1.4, g: u, to: l }),
      n.osc({ w: "softsaw", f: t[h], det: 9, t: m + 0.011, a: f * 1.1, h: d, d: 1.4, g: u, to: c }));
  }
  n.osc({ f: t[0] / 2, t: e, a: f, h: d, d: 1.2, g: 0.03 * i, to: r });
}

function A0(n, t, e, s, i, a = 0, o) {
  const r = n.filt("lowpass", 300, 1.2, o),
    l = 380 + 800 * a + 300 * i;
  (n.ramp(r.frequency, [
    [e, l],
    [e + 0.12, 280 + 160 * a],
    [e + s + 0.3, 220],
  ]),
    n.osc({ f: t, t: e, a: 0.008, h: s * 0.8, d: 0.14 + s * 0.2, g: 0.22 * i, to: o }),
    n.osc({ w: "softsaw", f: t, t: e, a: 0.006, h: s * 0.7, d: 0.12 + s * 0.2, g: 0.26 * i, to: r }));
}

function J6(n, t, e, s, i, a) {
  (n.osc({
    w: "glass",
    f: t,
    t: e,
    a: 0.05,
    h: Math.max(0, s - 0.1),
    d: 0.2,
    g: 0.2 * i,
    vib: 9,
    vr: 5.2,
    vd: 0.2,
    to: a,
  }),
    n.osc({ w: "triangle", f: t * 2, t: e, a: 0.07, h: Math.max(0, s - 0.12), d: 0.15, g: 0.03 * i, to: a }),
    n.noise({ flt: "bandpass", fc: t * 2, q: 1.5, t: e, a: 0.03, d: 0.12, g: 0.035 * i, to: a }));
}

function wy(n, t, e, s, i, a) {
  const o = n.filt("lowpass", 2200 + 1600 * i, 0.7, a);
  (n.osc({ w: "softsaw", f: t, det: -10, t: e, a: 0.006, h: s * 0.3, d: s, g: 0.13 * i, to: o }),
    n.osc({ w: "softsaw", f: t, det: 11, t: e, a: 0.008, h: s * 0.3, d: s, g: 0.13 * i, to: o }),
    n.noise({ flt: "bandpass", fc: 2600, q: 1, t: e, a: 0.002, d: 0.025, g: 0.03 * i, to: a }));
}

function $3(n, t, e, s, i, a) {
  const o = n.gain(1.6, a),
    r = n.ctx.createGain();
  (r.connect(n.filt("bandpass", 720, 2.2, o)),
    r.connect(n.filt("bandpass", 1150, 2.6, o)),
    r.connect(n.filt("bandpass", 2700, 3, n.gain(0.4, o))));
  const l = Math.min(0.5, s * 0.4),
    c = Math.max(0, s - l);
  for (let f = 0; f < t.length; f++) {
    const d = t[f],
      h = e + f * 0.009;
    (n.osc({
      w: "softsaw",
      f: d,
      det: -8,
      t: h,
      a: l,
      h: c,
      d: 0.7,
      g: 0.16 * i,
      vib: 10,
      vr: 5,
      vd: 0.3,
      to: r,
    }),
      n.osc({ w: "softsaw", f: d, det: 9, t: h + 0.004, a: l, h: c, d: 0.7, g: 0.16 * i, to: r }));
  }
}

function My(n, t, e, s) {
  (n.osc({ f: 150, f1: 46, ft: 0.09, t, a: 0.001, d: 0.26, g: 0.9 * e, to: s }),
    n.noise({ flt: "highpass", fc: 1800, t, a: 0.001, d: 0.012, g: 0.18 * e, to: s }));
}

function Ym(n, t, e, s = 1, i) {
  (n.osc({ f: 118 * s, f1: 58 * s, ft: 0.14, t, a: 0.002, d: 0.5, g: 0.6 * e, to: i }),
    n.osc({ w: "triangle", f: 236 * s, f1: 100 * s, ft: 0.1, t, a: 0.002, d: 0.2, g: 0.35 * e, to: i }),
    n.noise({ k: "pink", flt: "lowpass", fc: 1400, fc1: 300, t, a: 0.001, d: 0.07, g: 0.3 * e, to: i }));
}

function Sl(n, t, e, s) {
  (n.noise({ flt: "bandpass", fc: 2100, q: 0.6, t, a: 0.001, d: 0.15, g: 0.45 * e, to: s }),
    n.osc({ w: "triangle", f: 210, f1: 150, t, a: 0.001, d: 0.08, g: 0.35 * e, to: s }));
}

function MS(n, t, e, s) {
  (n.noise({ flt: "bandpass", fc: 1300, q: 1.1, t, a: 0.001, d: 0.02, g: 0.3 * e, to: s }),
    n.noise({ flt: "bandpass", fc: 1300, q: 1.1, t: t + 0.011, a: 0.001, d: 0.02, g: 0.3 * e, to: s }),
    n.noise({ flt: "bandpass", fc: 1300, q: 1.1, t: t + 0.023, a: 0.001, d: 0.13, g: 0.3 * e, to: s }));
}

function kS(n, t, e, s = !1, i) {
  n.noise({ flt: "highpass", fc: 7200, t, a: 0.001, d: s ? 0.22 : 0.05, g: 0.7 * e, to: i });
}

function SS(n, t, e, s) {
  n.noise({ flt: "bandpass", fc: 5600, q: 1.4, t, a: 0.012, d: 0.05, g: 0.5 * e, to: s });
}

function TS(n, t, e, s) {
  (n.osc({ f: 1650, t, a: 0.001, d: 0.022, g: 0.3 * e, to: s }),
    n.osc({ w: "triangle", f: 430, t, a: 0.001, d: 0.035, g: 0.3 * e, to: s }),
    n.noise({ flt: "highpass", fc: 3e3, t, a: 0.001, d: 0.008, g: 0.15 * e, to: s }));
}

function rm(n, t, e, s = 1.6, i) {
  (n.noise({ flt: "highpass", fc: 4200, t, a: 0.002, d: s, g: 0.3 * e, to: i }),
    n.noise({ flt: "bandpass", fc: 8200, q: 2, t, a: 0.002, d: s * 0.6, g: 0.18 * e, to: i }),
    n.ring(3100, [1, 1.34, 1.72, 2.31], { t, a: 0.002, d: s * 0.5, g: 0.02 * e, to: i }));
}

function tM(n, t, e, s, i) {
  n.noise({ flt: "highpass", fc: 2500, fc1: 7e3, t, a: e, d: 0.08, g: 0.22 * s, to: i });
}

function Lo(n, t, e, s, i) {
  (n.osc({ f: t * 1.12, f1: t, ft: 0.06, t: e, a: 0.002, d: 0.9, g: 0.75 * s, to: i }),
    n.osc({ f: t * 1.5, t: e, a: 0.002, d: 0.4, g: 0.2 * s, to: i }),
    n.osc({ f: t * 2, t: e, a: 0.002, d: 0.25, g: 0.1 * s, to: i }),
    n.noise({ k: "pink", flt: "lowpass", fc: 900, fc1: 200, t: e, a: 0.001, d: 0.06, g: 0.4 * s, to: i }));
}

const It = (n) => 440 * Math.pow(2, (n - 69) / 12),
  Ur = (n) => (n < 16 ? 16 : n > 19e3 ? 19e3 : n),
  ES = 0.5,
  Ud = 20,
  Nc = 2e4,
  ru = 140;

function Km(n, t, e) {
  const s = Math.max(Ud, Math.min(Nc, t)),
    i = Math.max(s * 1.01, Math.min(Nc, e));
  return n === "white"
    ? (i - s) / (Nc - Ud)
    : n === "pink"
      ? Math.log(i / s) / Math.log(Nc / Ud)
      : (Math.atan(i / ru) - Math.atan(s / ru)) / (Math.atan(Nc / ru) - Math.atan(Ud / ru));
}

function AS(n, t, e, s) {
  let i = 1;
  if (t === "lowpass") i = Km(n, Ud, e * 1.1);
  else if (t === "highpass") i = Km(n, e / 1.1, Nc);
  else if (t === "bandpass") {
    const a = Math.sqrt(1 + 1 / (4 * s * s)),
      o = 1 / (2 * s);
    i = Km(n, e * (a - o), e * (a + o)) * 1.57;
  }
  return Math.min(8, 1 / Math.sqrt(Math.max(0.0156, Math.min(1, i))));
}

class RS {
  ctx;
  canPan;
  noises = new Map();
  curves = new Map();
  waves = new Map();
  seed;
  constructor(t, e = 5370206) {
    ((this.ctx = t), (this.seed = e >>> 0), (this.canPan = typeof t.createStereoPanner == "function"));
  }
  rnd() {
    this.seed = (this.seed + 1831565813) >>> 0;
    let t = this.seed;
    return (
      (t = Math.imul(t ^ (t >>> 15), t | 1)),
      (t ^= t + Math.imul(t ^ (t >>> 7), t | 61)),
      ((t ^ (t >>> 14)) >>> 0) / 4294967296
    );
  }
  reseed(t) {
    this.seed = t >>> 0;
  }
  noise(t) {
    let e = this.noises.get(t);
    if (e) return e;
    const s = this.ctx.sampleRate,
      i = Math.floor(s * 2.5);
    e = this.ctx.createBuffer(1, i, s);
    const a = e.getChannelData(0);
    let o = t === "white" ? 19088743 : t === "pink" ? 38177486 : 20281789;
    const r = () => ((o = (Math.imul(o, 1664525) + 1013904223) >>> 0), o / 2147483648 - 1);
    if (t === "white") for (let d = 0; d < i; d++) a[d] = r();
    else if (t === "pink") {
      let d = 0,
        h = 0,
        u = 0,
        m = 0,
        x = 0,
        p = 0,
        g = 0;
      for (let y = 0; y < i; y++) {
        const v = r();
        ((d = 0.99886 * d + v * 0.0555179),
          (h = 0.99332 * h + v * 0.0750759),
          (u = 0.969 * u + v * 0.153852),
          (m = 0.8665 * m + v * 0.3104856),
          (x = 0.55 * x + v * 0.5329522),
          (p = -0.7616 * p - v * 0.016898),
          (a[y] = (d + h + u + m + x + p + g + v * 0.5362) * 0.16),
          (g = v * 0.115926));
      }
    } else {
      let d = 0,
        h = 0,
        u = 0;
      for (let m = 0; m < i; m++)
        ((d = (d + 0.02 * r()) / 1.02), (h = 0.996 * (h + d - u)), (u = d), (a[m] = h));
    }
    const l = Math.floor(s * 0.02);
    for (let d = 0; d < l; d++) {
      const h = d / l;
      a[d] = a[d] * h + a[i - l + d] * (1 - h);
    }
    let c = 0;
    for (let d = 0; d < i; d++) c += a[d] * a[d];
    const f = ES / Math.sqrt(c / i);
    for (let d = 0; d < i; d++) a[d] *= f;
    return (this.noises.set(t, e), e);
  }
  curve(t) {
    const e = Math.round(t * 10);
    let s = this.curves.get(e);
    if (s) return s;
    const i = 1024;
    s = new Float32Array(i);
    const a = Math.max(0.1, e / 10),
      o = Math.tanh(a);
    for (let r = 0; r < i; r++) {
      const l = (r / (i - 1)) * 2 - 1;
      s[r] = Math.tanh(a * l) / o;
    }
    return (this.curves.set(e, s), s);
  }
  wave(t) {
    let e = this.waves.get(t);
    if (e) return e;
    const s = 40,
      i = new Float32Array(s + 1),
      a = new Float32Array(s + 1),
      o = [0, 1, 0.3, 0.09, 0.04, 0.015],
      r = [0, 1, 0.12, 0.55, 0.08, 0.3, 0.05, 0.14, 0.03, 0.06];
    for (let l = 1; l <= s; l++)
      t === "softsaw"
        ? (a[l] = (l % 2 ? 1 : -1) / Math.pow(l, 1.45))
        : t === "softsq"
          ? (a[l] = l % 2 ? 1 / Math.pow(l, 1.35) : 0)
          : t === "glass"
            ? (a[l] = o[l] ?? 0)
            : t === "reed"
              ? (a[l] = r[l] ?? 0)
              : t === "string"
                ? (a[l] = Math.sin(l * Math.PI * 0.13) / Math.pow(l, 1.2))
                : (a[l] = (Math.sin(l * Math.PI * 0.29) / Math.pow(l, 0.85)) * (l % 2 ? 1 : 0.5));
    return ((e = this.ctx.createPeriodicWave(i, a)), this.waves.set(t, e), e);
  }
  impulse(t, e) {
    const s = this.ctx.sampleRate,
      i = Math.floor(s * t),
      a = this.ctx.createBuffer(2, i, s);
    for (let o = 0; o < 2; o++) {
      const r = a.getChannelData(o);
      let l = o === 0 ? 165902235 : 133474241;
      const c = () => ((l = (Math.imul(l, 1664525) + 1013904223) >>> 0), l / 2147483648 - 1);
      let f = 0;
      const d = Math.floor(s * 0.012);
      for (let x = d; x < i; x++) {
        const p = x / s,
          g = 0.55 - 0.42 * Math.min(1, p / (t * 0.7));
        f += (c() - f) * g;
        const y = Math.min(1, (x - d) / (s * 0.02));
        r[x] = f * Math.exp((-6.91 * p) / e) * y;
      }
      (o === 0 ? [0.011, 0.019, 0.027, 0.041, 0.057] : [0.013, 0.021, 0.031, 0.037, 0.061]).forEach(
        (x, p) => {
          r[Math.floor(x * s)] += (p % 2 ? -0.5 : 0.6) / (1 + p * 0.5);
        },
      );
      let u = 0;
      for (let x = 0; x < i; x++) u += r[x] * r[x];
      const m = 1 / Math.sqrt(u || 1);
      for (let x = 0; x < i; x++) r[x] *= m;
    }
    return a;
  }
}

class L1 {
  ctx;
  kit;
  out;
  t0;
  end;
  pm = 1;
  dur = 1;
  constructor(t, e, s) {
    ((this.kit = t), (this.ctx = t.ctx), (this.out = e), (this.t0 = s), (this.end = s));
  }
  rnd() {
    return this.kit.rnd();
  }
  rr(t, e) {
    return t + (e - t) * this.kit.rnd();
  }
  env(t, e, s) {
    const i = e.g ?? 1,
      a = Math.max(0.001, e.a ?? 0.002),
      o = e.h !== void 0 && e.h > 0 ? e.h : 0,
      r = Math.max(0.004, e.d);
    (t.setValueAtTime(0, s), t.linearRampToValueAtTime(i, s + a));
    const l = s + a + o;
    return (
      o > 0 && t.setValueAtTime(i, l),
      e.lin
        ? (t.linearRampToValueAtTime(0, l + r), l + r)
        : (t.setTargetAtTime(0, l, r / 5),
          t.setValueAtTime(i * 0.00674, l + r),
          t.linearRampToValueAtTime(0, l + r + 0.008),
          l + r + 0.008)
    );
  }
  setWave(t, e) {
    !e ||
      e === "sine" ||
      (e === "square" || e === "sawtooth" || e === "triangle"
        ? (t.type = e)
        : t.setPeriodicWave(this.kit.wave(e)));
  }
  total(t) {
    return Math.max(0.001, t.a ?? 0.002) + (t.h ?? 0) + t.d;
  }
  osc(t) {
    const e = this.ctx,
      s = this.t0 + (t.t ?? 0),
      i = e.createOscillator();
    (this.setWave(i, t.w),
      i.frequency.setValueAtTime(Ur(t.f * this.pm), s),
      t.f1 !== void 0 &&
        i.frequency.exponentialRampToValueAtTime(Ur(t.f1 * this.pm), s + (t.ft ?? this.total(t))),
      t.det && i.detune.setValueAtTime(t.det, s));
    const a = e.createGain(),
      o = this.env(a.gain, t, s) + 0.005;
    if (t.vib) {
      const r = e.createOscillator();
      r.frequency.value = t.vr ?? 5.5;
      const l = e.createGain();
      (l.gain.setValueAtTime(0, s + (t.vd ?? 0.12)),
        l.gain.linearRampToValueAtTime(t.vib, s + (t.vd ?? 0.12) + 0.15),
        r.connect(l),
        l.connect(i.detune),
        r.start(s),
        r.stop(o));
    }
    return (
      i.connect(a),
      a.connect(t.to ?? this.out),
      i.start(s),
      i.stop(o),
      o > this.end && (this.end = o),
      i
    );
  }
  fm(t) {
    const e = this.ctx,
      s = this.t0 + (t.t ?? 0),
      i = this.osc(t),
      a = this.total(t),
      o = Ur(t.f * this.pm),
      r = e.createOscillator();
    (r.frequency.setValueAtTime(Ur(o * t.ratio), s),
      t.f1 !== void 0 &&
        r.frequency.exponentialRampToValueAtTime(Ur(t.f1 * this.pm * t.ratio), s + (t.ft ?? a)));
    const l = e.createGain(),
      c = o * t.ratio;
    return (
      l.gain.setValueAtTime(Math.max(0.01, t.idx * c), s),
      t.idx1 !== void 0 && l.gain.exponentialRampToValueAtTime(Math.max(0.01, t.idx1 * c), s + (t.idt ?? a)),
      r.connect(l),
      l.connect(i.frequency),
      r.start(s),
      r.stop(s + a + 0.02),
      i
    );
  }
  noise(t) {
    const e = this.ctx,
      s = this.t0 + (t.t ?? 0),
      i = this.kit.noise(t.k ?? "white"),
      a = e.createBufferSource();
    ((a.buffer = i), (a.loop = !0), t.rate && (a.playbackRate.value = t.rate));
    const o = e.createGain(),
      r = t.k ?? "white",
      l = t.fc ?? 1e3,
      c = t.fc1 !== void 0 ? Math.sqrt(l * t.fc1) : l,
      f = AS(r, t.flt, c, t.q ?? 0.8),
      d = this.env(o.gain, { ...t, g: (t.g ?? 1) * f }, s) + 0.005;
    if (t.flt) {
      const h = e.createBiquadFilter();
      ((h.type = t.flt),
        (h.Q.value = t.q ?? 0.8),
        h.frequency.setValueAtTime(Ur(l * this.pm), s),
        t.fc1 !== void 0 &&
          h.frequency.exponentialRampToValueAtTime(Ur(t.fc1 * this.pm), s + (t.fct ?? this.total(t))),
        a.connect(h),
        h.connect(o));
    } else a.connect(o);
    return (
      o.connect(t.to ?? this.out),
      a.start(s, this.kit.rnd() * (i.duration - 0.3)),
      a.stop(d),
      d > this.end && (this.end = d),
      a
    );
  }
  ring(t, e, s) {
    const i = s.g ?? 1;
    for (let a = 0; a < e.length; a++)
      this.osc({ ...s, f: t * e[a], d: s.d / (1 + a * 0.45), g: i / (1 + a * 0.7) });
  }
  scatter(t, e, s, i) {
    for (let a = 0; a < t; a++) i(e + this.kit.rnd() * s, a);
  }
  filt(t, e, s = 0.8, i) {
    const a = this.ctx.createBiquadFilter();
    return (
      (a.type = t),
      (a.frequency.value = Ur(e * this.pm)),
      (a.Q.value = s),
      a.connect(i ?? this.out),
      a
    );
  }
  gain(t, e) {
    const s = this.ctx.createGain();
    return ((s.gain.value = t), s.connect(e ?? this.out), s);
  }
  drive(t, e) {
    const s = this.ctx.createWaveShaper();
    return ((s.curve = this.kit.curve(t)), s.connect(e ?? this.out), s);
  }
  pan(t, e) {
    if (!this.kit.canPan) return this.gain(1, e);
    const s = this.ctx.createStereoPanner();
    return ((s.pan.value = t), s.connect(e ?? this.out), s);
  }
  ramp(t, e, s = !0) {
    for (let i = 0; i < e.length; i++) {
      const a = this.t0 + e[i][0],
        o = e[i][1];
      i === 0
        ? t.setValueAtTime(o, a)
        : s && o > 0 && e[i - 1][1] > 0
          ? t.exponentialRampToValueAtTime(o, a)
          : t.linearRampToValueAtTime(o, a);
    }
  }
  lfo(t, e, s, i, a, o) {
    const r = this.ctx,
      l = this.t0 + i,
      c = r.createOscillator();
    (c.frequency.setValueAtTime(e, l), o !== void 0 && c.frequency.linearRampToValueAtTime(o, l + a));
    const f = r.createGain();
    ((f.gain.value = s), c.connect(f), f.connect(t), c.start(l), c.stop(l + a + 0.05));
  }
  echo(t, e, s, i, a) {
    const o = this.ctx,
      r = o.createGain(),
      l = o.createDelay(Math.max(0.05, t * 1.5));
    l.delayTime.value = t;
    const c = o.createGain();
    c.gain.value = e;
    const f = o.createGain();
    return (
      (f.gain.value = s),
      r.connect(a ?? this.out),
      r.connect(l),
      l.connect(c),
      c.connect(l),
      l.connect(f),
      f.connect(a ?? this.out),
      i > this.tail && (this.tail = i),
      r
    );
  }
  sub(t, e) {
    const s = new L1(this.kit, this.gain(t), this.t0);
    ((s.pm = this.pm), (s.dur = this.dur), e(s), s.finish(), s.end > this.end && (this.end = s.end));
  }
  tail = 0;
  finish() {
    ((this.end += this.tail), (this.tail = 0));
  }
}

function At(n, t, e, s = {}) {
  return {
    fn: e,
    label: t,
    cat: n,
    bus: "sfx",
    loud: -20,
    rev: 0.12,
    gap: 0.045,
    poly: 3,
    prio: 1,
    jitter: 0.03,
    len: 0.6,
    range: 26,
    ...s,
  };
}

const i1 = [1, 2.31, 3.87, 5.2],
  CS = [1, 1.48, 2.36, 3.2],
  Tl = [1, 1.34, 1.87, 2.6],
  ga = [1, 1.5, 2.5, 3.76],
  pl = [1, 2.01, 3.03, 4.2],
  LS = 62;

function ky(n) {
  const t = ((n % 12) + 12) % 12;
  return t === 2 || t === 4 || t === 9 || t === 11 ? n - 1 : n;
}

function IS(n, t, e) {
  const s = 60 / t.bpm,
    i = LS + (e ? -5 : 0),
    a = t.mel.length;
  let o = 0;
  for (let r = 0; r < a; r++) {
    const l = t.mel[r],
      c = e ? ky(t.mel[t.noFlip ? r : a - 1 - r][1]) : l[1],
      f = It(i + c),
      d = l[0] * s,
      h = l[2] * s;
    ((o = Math.max(o, d + h)),
      t.inst === "horn" ? zl(n, f, d, h, l[3]) : Qi(n, f, d, h, l[3], e ? 0.85 : 1),
      e
        ? Qi(n, f / 2, d, h, l[3] * 0.35, 0.8)
        : (t.oct && Qi(n, f * 2, d, h, l[3] * 0.45, 1.1),
          t.bells && en(n, f * 2, d, Math.max(0.4, h), l[3] * 0.5)));
  }
  for (const r of t.timp ?? []) Lo(n, It(i - 24), r * s, e ? 0.55 : 0.6);
  if (
    (t.cym !== void 0 &&
      (e
        ? n.noise({ k: "pink", flt: "lowpass", fc: 1800, fc1: 300, t: t.cym * s, a: 0.004, d: 1, g: 0.35 })
        : rm(n, t.cym * s, 0.6, 1.4)),
    t.chord)
  ) {
    const [r, l, c] = t.chord,
      f = l.map((d) => It(i + (e ? ky(d) : d)));
    ($3(n, f, r * s, c * s, e ? 0.35 : 0.5), (o = Math.max(o, (r + c) * s)));
  }
  if (t.sparkle && !e) {
    const r = t.mel[a - 1],
      l = i + r[1] + 12;
    [0, 7, 12, 16, 19].forEach((c, f) => en(n, It(l + c), r[0] * s + 0.05 + f * 0.05, 0.7, 0.3));
  }
  if (e) {
    const r = n.filt("lowpass", 520, 1);
    (n.osc({ w: "softsaw", f: It(i - 12), a: 0.05, h: o * 0.6, d: 0.6, g: 0.12, to: r }),
      n.osc({ w: "softsaw", f: It(i - 6), a: 0.05, h: o * 0.6, d: 0.6, g: 0.09, to: r }));
  }
}

const PS = [
    { label: "己方", v: 0 },
    { label: "敌方", v: 1 },
  ],
  a1 = { bus: "ui", loud: -15, gap: 0.4, poly: 1, prio: 3, jitter: 0, rev: 0.26 },
  DS = {
    match_start: {
      bpm: 120,
      mel: [
        [0, 0, 1, 0.8],
        [1, 7, 1, 0.85],
        [2, 12, 2.5, 1],
      ],
      oct: !0,
      timp: [0, 1, 2],
      cym: 2,
      chord: [2, [-12, 0, 7, 14], 2.5],
    },
    minions_spawn: {
      bpm: 140,
      inst: "horn",
      mel: [
        [0, 7, 0.5, 0.75],
        [0.5, 7, 0.5, 0.75],
        [1, 12, 1.6, 0.95],
      ],
      timp: [1],
    },
    first_blood: {
      bpm: 150,
      mel: [
        [0, 0, 0.5, 0.9],
        [0.5, 7, 0.5, 0.95],
        [1, 12, 2, 1],
      ],
      oct: !0,
      timp: [0, 1],
      cym: 1,
      chord: [1, [0, 7, 12, 15], 2],
    },
    double_kill: {
      bpm: 150,
      mel: [
        [0, 7, 0.5, 0.9],
        [0.5, 12, 1.6, 1],
      ],
      bells: !0,
      timp: [0.5],
    },
    triple_kill: {
      bpm: 150,
      mel: [
        [0, 7, 0.5, 0.9],
        [0.5, 12, 0.5, 0.95],
        [1, 15, 1.6, 1],
      ],
      bells: !0,
      timp: [1],
      cym: 1,
    },
    quadra_kill: {
      bpm: 150,
      mel: [
        [0, 7, 0.5, 0.9],
        [0.5, 12, 0.5, 0.92],
        [1, 15, 0.5, 0.96],
        [1.5, 19, 2, 1],
      ],
      oct: !0,
      bells: !0,
      timp: [0, 1.5],
      cym: 1.5,
      chord: [1.5, [0, 7, 12, 15], 2],
    },
    penta_kill: {
      bpm: 150,
      mel: [
        [0, 7, 0.5, 0.9],
        [0.5, 12, 0.5, 0.92],
        [1, 15, 0.5, 0.95],
        [1.5, 19, 0.5, 0.98],
        [2, 24, 3.2, 1],
      ],
      oct: !0,
      bells: !0,
      timp: [0, 1, 2],
      cym: 2,
      chord: [2, [0, 4, 7, 12, 16], 3.2],
      sparkle: !0,
    },
    killing_spree: {
      bpm: 160,
      mel: [
        [0, 12, 0.5, 0.8],
        [0.5, 12, 0.5, 0.8],
        [1, 15, 1.3, 0.95],
      ],
      timp: [1],
    },
    unstoppable: {
      bpm: 160,
      mel: [
        [0, 12, 0.5, 0.85],
        [0.5, 12, 0.5, 0.85],
        [1, 12, 0.5, 0.9],
        [1.5, 17, 1.8, 1],
      ],
      oct: !0,
      timp: [0, 1.5],
      cym: 1.5,
    },
    legendary: {
      bpm: 160,
      mel: [
        [0, 12, 0.5, 0.85],
        [0.5, 15, 0.5, 0.9],
        [1, 19, 0.5, 0.93],
        [1.5, 22, 0.5, 0.96],
        [2, 24, 3, 1],
      ],
      oct: !0,
      bells: !0,
      timp: [0, 0.5, 1, 1.5, 2],
      cym: 2,
      chord: [2, [0, 7, 12, 16, 19], 3],
      sparkle: !0,
    },
    shutdown: {
      bpm: 150,
      mel: [
        [0, 19, 0.5, 1],
        [0.5, 12, 1.6, 0.95],
      ],
      timp: [0.5],
      noFlip: !0,
    },
    ace: {
      bpm: 120,
      mel: [
        [0, 0, 0.75, 1],
        [1, 0, 0.4, 0.9],
        [1.5, 3, 0.4, 0.95],
        [2, 7, 3, 1],
      ],
      oct: !0,
      timp: [0, 1, 1.5, 2],
      cym: 2,
      chord: [2, [-12, 0, 7, 12, 15], 3],
      sparkle: !0,
    },
    tower_destroyed: {
      bpm: 120,
      inst: "horn",
      mel: [
        [0, 0, 1, 0.85],
        [1, 7, 2.2, 0.95],
      ],
      timp: [0, 1],
    },
    epic_slain: {
      bpm: 150,
      mel: [
        [0, 0, 0.5, 0.9],
        [0.5, 5, 0.5, 0.92],
        [1, 7, 0.5, 0.95],
        [1.5, 12, 2.2, 1],
      ],
      oct: !0,
      timp: [0, 1.5],
      cym: 1.5,
      chord: [1.5, [0, 7, 12, 16], 2.2],
      sparkle: !0,
    },
    super_minions: {
      bpm: 132,
      inst: "horn",
      mel: [
        [0, 0, 0.5, 0.8],
        [0.5, 0, 0.5, 0.8],
        [1, 3, 0.5, 0.85],
        [1.5, 5, 1.6, 0.95],
      ],
      timp: [0, 1.5],
    },
  },
  yi = (n, t, e, s, i, a) =>
    At(
      "播报",
      t,
      (o, r) => {
        const l = i && r > 0.5;
        (IS(o, DS[n], l), a?.(o, l));
      },
      { ...a1, len: e, loud: s, variants: i ? PS : void 0 },
    ),
  zS = {
    ann_match_start: yi("match_start", "战斗开始", 2.8, -14, !1, (n) => {
      (Sl(n, 0.5 - 0.11, 0.4), Sl(n, 0.5 - 0.055, 0.5));
    }),
    ann_minions_spawn: yi("minions_spawn", "小兵出击", 1.5, -19, !1),
    ann_first_blood: yi("first_blood", "首杀", 1.9, -14, !0, (n, t) => {
      (t || n.ring(2600, [1, 1.48, 2.36], { a: 0.001, d: 0.5, g: 0.07 }),
        n.noise({ flt: "bandpass", fc: 3e3, fc1: 6e3, q: 2, a: 0.01, d: 0.1, g: 0.2 }));
    }),
    ann_double_kill: yi("double_kill", "双杀", 1.3, -16, !0),
    ann_triple_kill: yi("triple_kill", "三杀", 1.5, -15, !0),
    ann_quadra_kill: yi("quadra_kill", "四杀", 2, -14, !0),
    ann_penta_kill: yi("penta_kill", "五杀", 3, -12, !0),
    ann_killing_spree: yi("killing_spree", "连杀 3", 1.3, -17, !0),
    ann_unstoppable: yi("unstoppable", "连杀 5", 1.6, -15, !0),
    ann_legendary: yi("legendary", "连杀 7+", 2.6, -13, !0),
    ann_shutdown: yi("shutdown", "终结", 1.4, -16, !0, (n) => {
      n.noise({ flt: "bandpass", fc: 5e3, fc1: 1200, q: 1.5, a: 0.004, d: 0.14, g: 0.4 });
    }),
    ann_ace: yi("ace", "团灭", 3.2, -12, !0),
    ann_tower_destroyed: yi("tower_destroyed", "摧毁防御塔", 2.2, -17, !0, (n) => {
      n.noise({ k: "brown", flt: "lowpass", fc: 300, a: 0.05, d: 0.9, g: 0.2 });
    }),
    ann_epic_spawn: At(
      "播报",
      "史诗野怪出现",
      (n) => {
        const t = n.filt("lowpass", 300, 1);
        (n.ramp(t.frequency, [
          [0, 300],
          [0.9, 2200],
          [2, 500],
        ]),
          [38, 50, 57, 63].forEach((e, s) => {
            n.osc({ w: "softsaw", f: It(e), det: s * 5 - 8, a: 0.8, h: 0.2, d: 0.9, g: 0.22, to: t });
          }),
          Lo(n, It(38), 0, 0.7),
          Lo(n, It(38), 0.85, 0.85),
          n.noise({ k: "brown", flt: "lowpass", fc: 200, a: 0.6, h: 0.3, d: 0.9, g: 0.25 }),
          zl(n, It(62), 0.85, 0.9, 0.8),
          zl(n, It(63), 0.85, 0.9, 0.5),
          Qi(n, It(50), 0.85, 0.9, 0.9, 0.8),
          Qi(n, It(56), 0.85, 0.9, 0.7, 0.8));
      },
      { ...a1, len: 2.4, loud: -15 },
    ),
    ann_epic_slain: yi("epic_slain", "史诗野怪被击杀", 2.2, -14, !0),
    ann_super_minions: yi("super_minions", "超级兵出击", 1.7, -17, !0),
    ann_victory: At(
      "播报",
      "胜利(冲击音)",
      (n) => {
        (Lo(n, It(38), 0, 0.9),
          Lo(n, It(45), 0.12, 0.6),
          rm(n, 0, 0.8, 2.2),
          [50, 57, 62, 66, 69, 74].forEach((t, e) => Qi(n, It(t), e * 0.007, 1.2, 0.8 - e * 0.05, 1.1)),
          $3(n, [It(62), It(66), It(69), It(74)], 0.01, 1.4, 0.5),
          [74, 78, 81, 86, 90].forEach((t, e) => en(n, It(t), 0.08 + e * 0.06, 1, 0.45)));
      },
      { ...a1, len: 2.6, loud: -12 },
    ),
    ann_defeat: At(
      "播报",
      "失败(冲击音)",
      (n) => {
        (Lo(n, It(38), 0, 1),
          Lo(n, It(33), 0.5, 0.7),
          n.noise({ k: "pink", flt: "lowpass", fc: 2400, fc1: 200, a: 0.004, d: 1.8, g: 0.5 }),
          [38, 45, 50, 53, 57].forEach((e, s) => Qi(n, It(e), s * 0.009, 1.5, 0.8 - s * 0.05, 0.75)));
        const t = n.filt("lowpass", 900, 1);
        (n.osc({ w: "softsaw", f: It(69), f1: It(62), ft: 1.4, a: 0.1, h: 0.6, d: 0.9, g: 0.18, to: t }),
          n.osc({ w: "softsaw", f: It(65), f1: It(57), ft: 1.4, a: 0.1, h: 0.6, d: 0.9, g: 0.14, to: t }));
      },
      { ...a1, len: 2.8, loud: -13 },
    ),
  },
  Sy = [1, 1.52, 2.27, 3.05],
  Jd = [1, 2.76, 5.4];

function Or(n, t, e, s = 1, i = 0.42, a) {
  (n.osc({ f: 128 * s, f1: 56 * s, ft: 0.13, t, a: 0.002, d: i, g: e * 0.8, to: a }),
    n.osc({ w: "triangle", f: 250 * s, f1: 110 * s, ft: 0.08, t, a: 0.002, d: i * 0.4, g: e * 0.4, to: a }),
    n.noise({ k: "pink", flt: "lowpass", fc: 1500, fc1: 320, t, a: 0.001, d: 0.06, g: e * 0.35, to: a }));
}

function ja(n, t, e, s, i, a) {
  (n.osc({ w: "triangle", f: 210, f1: 120, ft: 0.05, t: e, a: 0.001, d: 0.09, g: i * 0.55, to: a }),
    n.noise({ k: "pink", flt: "bandpass", fc: 520, q: 1.4, t: e, a: 0.001, d: 0.045, g: i * 0.6, to: a }));
  for (let o = 0; o < Sy.length; o++) {
    const r = t * Sy[o],
      l = (i * 0.45) / (1 + o * 0.6),
      c = s / (1 + o * 0.4);
    (n.osc({ f: r, t: e, a: 0.002, d: c, g: l, to: a }),
      o < 2 && n.osc({ f: r * 1.013, t: e, a: 0.004, d: c * 0.9, g: l * 0.6, to: a }));
  }
  (n.osc({ f: t * 5.3, t: e, a: 0.001, d: Math.min(0.2, s * 0.3), g: i * 0.12, to: a }),
    n.noise({
      flt: "bandpass",
      fc: Math.min(4200, t * 4.2),
      q: 3,
      t: e,
      a: 0.001,
      d: 0.03,
      g: i * 0.3,
      to: a,
    }));
}

function Ty(n, t, e, s, i = 135, a) {
  const o = n.gain(1.5, a),
    r = n.ctx.createGain();
  (r.connect(n.filt("bandpass", 700, 3, o)),
    r.connect(n.filt("bandpass", 1150, 3.5, o)),
    r.connect(n.filt("bandpass", 2600, 3, n.gain(0.35, o))),
    n.osc({
      w: "sawtooth",
      f: i * 1.18,
      f1: i * 0.8,
      ft: e,
      t,
      a: 0.02,
      h: e * 0.3,
      d: e * 0.7,
      g: s,
      vib: 60,
      vr: 31,
      vd: 0,
      to: r,
    }),
    n.noise({ k: "pink", t, a: 0.015, h: e * 0.2, d: e * 0.8, g: s * 0.5, to: r }));
}

function Hc(n, t, e, s, i = 0.2, a) {
  (n.osc({ w: "triangle", f: 190, f1: 75, ft: 0.07, t: e, a: 0.001, d: 0.12, g: s * 0.35, to: a }),
    n.noise({ flt: "bandpass", fc: 2100, q: 0.9, t: e, a: 0.001, d: 0.035, g: s * 0.6, to: a }));
  for (let o = 0; o < Jd.length; o++)
    n.osc({ f: t * Jd[o], t: e, a: 0.001, d: i / (1 + o * 0.5), g: (s * 0.55) / (1 + o * 0.5), to: a });
  n.osc({ w: "triangle", f: t * 1.47, t: e, a: 0.001, d: i * 0.5, g: s * 0.2, to: a });
}

function Ti(n, t, e, s, i, a, o, r = 1.2, l = "white", c) {
  const f = n.filt("bandpass", i, r, c);
  (n.ramp(f.frequency, [
    [t, i],
    [t + e * 0.45, a],
    [t + e, o],
  ]),
    n.noise({ k: l, t, a: e * 0.4, d: e * 0.6, g: s * 2.4, to: f }));
}

function Si(n, t, e, s, i, a, o) {
  const r = n.filt("lowpass", 2e3, 1.3, o),
    l = Math.min(9e3, t * 7 + 1500);
  if (
    (n.ramp(r.frequency, [
      [e, l],
      [e + 0.045, Math.max(1500, t * 3.5)],
      [e + Math.max(0.1, s), Math.max(800, t * 1.6)],
    ]),
    a === void 0)
  )
    n.osc({ w: "string", f: t * 1.014, f1: t, ft: 0.035, t: e, a: 0.001, d: s, g: i * 1.5, to: r });
  else {
    const c = Math.min(0.12, s * 0.3);
    n.osc({ w: "string", f: t, f1: a, ft: c, t: e, a: 0.001, h: c * 0.6, d: s, g: i * 1.5, to: r });
  }
  (n.osc({ w: "string", f: (a ?? t) * 2.003, t: e + 0.002, a: 0.001, d: s * 0.4, g: i * 0.25, to: r }),
    n.noise({ flt: "bandpass", fc: 3400, q: 1.1, t: e, a: 0.001, d: 0.011, g: i * 0.6, to: o }),
    n.osc({ w: "triangle", f: 330, f1: 250, t: e, a: 0.001, d: 0.04, g: i * 0.25, to: o }));
}

function Zm(n, t, e, s, i, a, o) {
  (n.osc({ w: "string", f: t, t: e, a: 0.001, d: s, g: i * 1.5, to: o }),
    a && n.noise({ flt: "bandpass", fc: 3400, q: 1.1, t: e, a: 0.001, d: 0.008, g: i * 0.4, to: o }));
}

function NS(n, t, e, s) {
  const i = n.filt("bandpass", 1250, 2.2, s);
  (n.osc({ w: "reed", f: 500, f1: 430, t, a: 0.015, h: 0.05, d: 0.07, g: e, to: i }),
    n.osc({ w: "reed", f: 610, f1: 470, t: t + 0.15, a: 0.02, h: 0.08, d: 0.14, g: e * 1.1, to: i }));
}

function W0(n, t, e, s, i, a) {
  const o = n.filt("lowpass", 3e3, 0.9, a);
  (n.ramp(o.frequency, [
    [e, Math.min(12e3, t * 12)],
    [e + 0.03, Math.max(1800, t * 4)],
    [e + Math.max(0.08, s), Math.max(900, t * 2)],
  ]),
    n.osc({ w: "zhu", f: t, det: -6, t: e, a: 0.001, d: s, g: i * 1, to: o }),
    n.osc({ w: "zhu", f: t, det: 7, t: e + 0.003, a: 0.001, d: s * 0.85, g: i * 0.75, to: o }),
    n.noise({ flt: "bandpass", fc: 2600, q: 2, t: e, a: 0.001, d: 0.008, g: i * 0.5, to: a }),
    n.osc({ f: 1250, f1: 800, t: e, a: 0.001, d: 0.012, g: i * 0.15, to: a }));
}

function Od(n, t, e, s, i, a) {
  const o = n.filt("lowpass", 2600, 1.2, a);
  (n.ramp(o.frequency, [
    [e, 2600],
    [e + s * 0.8, 420],
  ]),
    n.osc({ w: "triangle", f: t * 1.16, f1: t, ft: 0.045, t: e, a: 0.001, d: s, g: i * 0.7, to: o }),
    n.osc({ w: "softsaw", f: t * 2.32, f1: t * 2, ft: 0.045, t: e, a: 0.001, d: s * 0.5, g: i * 0.3, to: o }),
    n.noise({ flt: "bandpass", fc: 1900, q: 1.6, t: e, a: 0.001, d: 0.012, g: i * 0.45, to: a }));
}

function c5(n, t, e, s, i) {
  const a = n.filt("bandpass", 600, 5, i);
  n.ramp(a.frequency, [
    [t, 600],
    [t + e, 1100],
  ]);
  const o = n.gain(0.5, a);
  (n.lfo(o.gain, 34, 0.5, t, e, 52),
    n.osc({ w: "sawtooth", f: 92, f1: 150, ft: e, t, a: e * 0.5, d: e * 0.5, g: s * 4, to: o }),
    n.noise({ k: "pink", t, a: e * 0.5, d: e * 0.5, g: s * 1.6, to: o }));
}

function th(n, t, e, s = 1, i) {
  (n.osc({ f: 520 * s, f1: 300 * s, t, a: 0.001, d: 0.045, g: e * 0.7, to: i }),
    n.osc({ w: "triangle", f: 1040 * s, f1: 600 * s, t, a: 0.001, d: 0.02, g: e * 0.3, to: i }),
    n.noise({ flt: "bandpass", fc: 1700 * s, q: 1.8, t, a: 0.001, d: 0.016, g: e * 0.5, to: i }),
    n.osc({ f: 180 * s, f1: 120 * s, t, a: 0.001, d: 0.05, g: e * 0.25, to: i }));
}

function El(n, t, e, s, i, a, o) {
  const r = Math.min(0.03, e * 0.3);
  (n.noise({ flt: "bandpass", fc: i, fc1: a, q: 7, t, a: r, d: e, g: s, to: o }),
    n.osc({ f: i * 0.98, f1: a * 0.98, t, a: r, d: e * 0.9, g: s * 0.07, to: o }));
}

function Fc(n, t, e, s, i, a, o, r, l) {
  const c = n.drive(3, n.filt("lowpass", 3e3, 0.6, l)),
    f = n.filt("lowpass", o, 2.2, c);
  (n.ramp(f.frequency, [
    [t, o],
    [t + e * 0.3, r],
    [t + e, o],
  ]),
    n.osc({
      w: "sawtooth",
      f: i,
      f1: a,
      ft: e,
      t,
      a: e * 0.12,
      h: e * 0.45,
      d: e * 0.45,
      g: s * 0.55,
      vib: 80,
      vr: 27,
      vd: 0,
      to: f,
    }),
    n.osc({
      w: "sawtooth",
      f: i * 1.49,
      f1: a * 1.45,
      ft: e,
      t,
      a: e * 0.15,
      h: e * 0.4,
      d: e * 0.4,
      g: s * 0.3,
      vib: 60,
      vr: 37,
      vd: 0,
      to: f,
    }),
    n.noise({
      k: "pink",
      flt: "bandpass",
      fc: r * 0.8,
      fc1: o,
      q: 1.5,
      t,
      a: e * 0.15,
      h: e * 0.35,
      d: e * 0.5,
      g: s * 0.5,
      to: l,
    }));
}
export { Y6, v0, K6, yr, eo, Xm, yn, rn, va, Z6, wS, Qd, ui, Qi, zl, en, Q6, Nl, A0, J6, wy, $3, My, Ym, Sl, MS, kS, SS, TS, rm, tM, Lo, It, RS, L1, At, i1, CS, Tl, ga, pl, zS, Jd, Or, ja, Ty, Hc, Ti, Si, Zm, NS, W0, Od, c5, th, El, Fc };
