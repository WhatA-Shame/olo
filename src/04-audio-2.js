// 04-audio-2.js — audio｜33 个顶层语句｜68KB
// 对应 game.pretty.js 第 4618–7095 行
// 关键内容：
//   Ny                    lowpass
//   fm                    lowpass
//   lT                    cPad
//   gT                    cPad
//   vT                    cPad
//   wT                    cPad
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { $3, A0, It, J6, L1, Lo, MS, My, Nl, Q6, Qi, RS, SS, Sl, TS, Ym, en, kS, rm, rn, tM, ui, wy, zl } from './01-audio.js';
import { JS, Jl, KS, Kf, QS, ZS, r1, tT } from './03-vfx.js';

class Ny {
  ctx;
  kit;
  musicIn;
  musicRev;
  now;
  stats = { played: 0, throttled: 0, capped: 0, stolen: 0, peakVoices: 0 };
  counts = new Map();
  sfxBus;
  uiBus;
  sfxRev;
  musicVol;
  musicLp;
  musicDuck;
  master;
  voices = [];
  notes = [];
  lastAt = new Map();
  graph = [];
  constructor(t, e = {}) {
    ((this.ctx = t), (this.kit = new RS(t)), (this.now = e.clock ?? (() => t.currentTime)));
    const s = (o) => {
      const r = t.createGain();
      return ((r.gain.value = o), this.graph.push(r), r);
    };
    ((this.master = s(1)), this.master.connect(t.destination));
    const i = s(QS);
    if (e.dynamics === !1) ((i.gain.value = 1), i.connect(this.master));
    else {
      const o = t.createDynamicsCompressor();
      ((o.threshold.value = Kf.threshold),
        (o.knee.value = Kf.knee),
        (o.ratio.value = Kf.ratio),
        (o.attack.value = Kf.attack),
        (o.release.value = Kf.release));
      const r = s(JS),
        l = s(0.5),
        c = t.createWaveShaper();
      ((c.curve = tT()),
        i.connect(o),
        o.connect(r),
        r.connect(l),
        l.connect(c),
        c.connect(this.master),
        this.graph.push(o, c));
    }
    ((this.sfxBus = s(1)),
      (this.uiBus = s(1)),
      this.sfxBus.connect(i),
      this.uiBus.connect(i),
      (this.musicIn = s(1)),
      (this.musicLp = t.createBiquadFilter()),
      (this.musicLp.type = "lowpass"),
      (this.musicLp.frequency.value = 2e4),
      (this.musicLp.Q.value = 0.5),
      (this.musicDuck = s(1)),
      (this.musicVol = s(1)),
      this.musicIn.connect(this.musicLp),
      this.musicLp.connect(this.musicDuck),
      this.musicDuck.connect(this.musicVol),
      this.musicVol.connect(i),
      this.graph.push(this.musicLp));
    const a = t.createConvolver();
    ((a.normalize = !1),
      (a.buffer = this.kit.impulse(2.4, 2)),
      (this.sfxRev = s(1)),
      (this.musicRev = s(1)),
      this.sfxRev.connect(a),
      this.musicRev.connect(a),
      a.connect(i),
      this.graph.push(a));
  }
  play(t, e = {}) {
    const s = r1[t];
    if (!s) return null;
    const i = this.now() + (e.when ?? 0) + 0.004,
      a = s.group ?? t,
      o = this.lastAt.get(a);
    if (o !== void 0 && i - o < s.gap && i >= o) return (this.stats.throttled++, null);
    const r = e.prio ?? s.prio;
    let l = 0,
      c = 0;
    for (const v of this.voices) v.stolen || v.killAt < i || (c++, v.key === t && l++);
    if (l >= s.poly) return (this.stats.throttled++, null);
    if (c >= ZS && !this.steal(r, i)) return (this.stats.capped++, null);
    this.lastAt.set(a, i);
    const f = this.ctx,
      d = KS(t),
      h = f.createGain();
    h.gain.value = (e.gain ?? 1) * d;
    let u = h,
      m = null;
    e.lp &&
      e.lp < 16e3 &&
      ((m = f.createBiquadFilter()),
      (m.type = "lowpass"),
      (m.frequency.value = e.lp),
      (m.Q.value = 0.5),
      u.connect(m),
      (u = m));
    let x = null;
    (e.pan !== void 0 &&
      this.kit.canPan &&
      ((x = f.createStereoPanner()), (x.pan.value = e.pan), u.connect(x), (u = x)),
      u.connect(s.bus === "ui" ? this.uiBus : this.sfxBus));
    let p = null;
    s.rev > 0 && ((p = f.createGain()), (p.gain.value = s.rev), u.connect(p), p.connect(this.sfxRev));
    const g = new L1(this.kit, h, i);
    ((g.pm = (e.pitch ?? 1) * (1 + (this.kit.rnd() * 2 - 1) * s.jitter)),
      (g.dur = e.dur ?? s.len),
      s.fn(g, e.v ?? 0),
      g.finish());
    const y = {
      key: t,
      patch: g,
      out: h,
      pan: x,
      lpf: m,
      send: p,
      prio: r,
      vol: d,
      killAt: g.end + 0.05,
      stolen: !1,
    };
    return (
      this.voices.push(y),
      this.stats.played++,
      this.counts.set(t, (this.counts.get(t) ?? 0) + 1),
      c + 1 > this.stats.peakVoices && (this.stats.peakVoices = c + 1),
      {
        stop: (v = 0.15) => {
          const _ = this.now();
          y.killAt <= _ ||
            (h.gain.cancelScheduledValues(_),
            h.gain.setTargetAtTime(0, _, v / 4),
            (y.killAt = Math.min(y.killAt, _ + v + 0.05)));
        },
        set: (v, _) => {
          const k = this.now();
          (h.gain.setTargetAtTime(v * d, k, 0.06), x && x.pan.setTargetAtTime(_, k, 0.06));
        },
      }
    );
  }
  steal(t, e) {
    let s = null;
    for (const i of this.voices)
      i.stolen || i.killAt < e || i.prio >= t || ((!s || i.prio < s.prio) && (s = i));
    return s
      ? (s.out.gain.cancelScheduledValues(e),
        s.out.gain.setTargetAtTime(0, e, 0.006),
        (s.killAt = e + 0.04),
        (s.stolen = !0),
        this.stats.stolen++,
        !0)
      : !1;
  }
  note(t, e) {
    const s = this.ctx.createGain();
    s.connect(t);
    const i = new L1(this.kit, s, e);
    return (this.notes.push({ patch: i, root: s }), i);
  }
  sweep() {
    const t = this.now();
    let e = 0;
    for (let s = 0; s < this.voices.length; s++) {
      const i = this.voices[s];
      i.killAt < t
        ? (i.out.disconnect(), i.lpf?.disconnect(), i.pan?.disconnect(), i.send?.disconnect())
        : (this.voices[e++] = i);
    }
    ((this.voices.length = e), (e = 0));
    for (let s = 0; s < this.notes.length; s++) {
      const i = this.notes[s];
      i.patch.end + 0.1 < t ? i.root.disconnect() : (this.notes[e++] = i);
    }
    this.notes.length = e;
  }
  get voiceCount() {
    return this.voices.length;
  }
  get noteCount() {
    return this.notes.length;
  }
  setVolumes(t, e, s) {
    const i = this.now();
    (this.master.gain.setTargetAtTime(Jl(t), i, 0.03),
      this.sfxBus.gain.setTargetAtTime(Jl(e), i, 0.03),
      this.uiBus.gain.setTargetAtTime(Jl(e), i, 0.03),
      this.sfxRev.gain.setTargetAtTime(Jl(e), i, 0.03),
      this.musicVol.gain.setTargetAtTime(Jl(s), i, 0.03),
      this.musicRev.gain.setTargetAtTime(Jl(s), i, 0.03));
  }
  fadeMaster(t, e) {
    const s = this.now();
    (this.master.gain.cancelScheduledValues(s), this.master.gain.setTargetAtTime(t, s, e));
  }
  duck(t, e) {
    const s = this.now();
    (this.musicDuck.gain.cancelScheduledValues(s),
      this.musicDuck.gain.setTargetAtTime(t, s, 0.04),
      this.musicDuck.gain.setTargetAtTime(1, s + e, 0.35));
  }
  setMusicTone(t) {
    this.musicLp.frequency.setTargetAtTime(t, this.now(), 0.25);
  }
  dispose() {
    for (const t of this.voices) t.out.disconnect();
    for (const t of this.notes) t.root.disconnect();
    ((this.voices.length = 0), (this.notes.length = 0));
    for (const t of this.graph) t.disconnect();
    this.graph.length = 0;
  }
}

const eT = 0.3,
  nT = 0.25,
  sT = 0.08;

function cm(n, t) {
  const e = [];
  for (let s = 0; s < t; s++) e.push([]);
  for (const s of n) e[s[0]].push(s);
  return e;
}

function iT(n) {
  const t = [0, 2, 4, 5, 7, 9, 11],
    e = ((n % 12) + 12) % 12,
    s = t.indexOf(e);
  if (s < 0) return n + 4;
  const i = s + 2;
  return n - e + t[i % 7] + (i >= 7 ? 12 : 0);
}

class fm {
  m;
  step = 0;
  nextT;
  killAt = 1 / 0;
  out;
  wetOut;
  delayIn;
  nodes = [];
  chanNames = [];
  constructor(t, e, s) {
    ((this.m = t), (this.nextT = e));
    const i = t.ctx;
    ((this.out = this.keep(i.createGain())),
      (this.out.gain.value = 0),
      this.out.connect(t.musicIn),
      (this.wetOut = this.keep(i.createGain())),
      (this.wetOut.gain.value = 0),
      this.wetOut.connect(t.musicRev),
      (this.delayIn = this.keep(i.createGain())));
    const a = this.keep(i.createDelay(1.5)),
      o = this.keep(i.createDelay(1.5));
    ((a.delayTime.value = s), (o.delayTime.value = s));
    const r = this.keep(i.createGain()),
      l = this.keep(i.createGain());
    ((r.gain.value = 0.4), (l.gain.value = 0.4));
    const c = this.keep(i.createBiquadFilter());
    if (
      ((c.type = "lowpass"),
      (c.frequency.value = 2600),
      this.delayIn.connect(a),
      a.connect(r),
      r.connect(c),
      c.connect(o),
      o.connect(l),
      l.connect(a),
      t.kit.canPan)
    ) {
      const f = this.keep(i.createStereoPanner()),
        d = this.keep(i.createStereoPanner());
      ((f.pan.value = -0.65),
        (d.pan.value = 0.65),
        a.connect(f),
        o.connect(d),
        f.connect(this.out),
        d.connect(this.out));
    } else (a.connect(this.out), o.connect(this.out));
  }
  keep(t) {
    return (this.nodes.push(t), t);
  }
  layer(t) {
    const e = this.m.ctx,
      s = (i) => {
        const a = this.keep(e.createGain());
        return ((a.gain.value = t), a.connect(i), a);
      };
    return { dry: s(this.out), wet: s(this.wetOut), dly: s(this.delayIn) };
  }
  setLayer(t, e, s) {
    const i = this.m.now();
    (t.dry.gain.setTargetAtTime(e, i, s),
      t.wet.gain.setTargetAtTime(e, i, s),
      t.dly.gain.setTargetAtTime(e, i, s));
  }
  chan(t, e, s = {}) {
    const i = this.m.ctx,
      a = this.keep(i.createGain());
    ((a.gain.value = e), this.chanNames.push(t));
    let o = a;
    if (s.pan && this.m.kit.canPan) {
      const r = this.keep(i.createStereoPanner());
      ((r.pan.value = s.pan), a.connect(r), (o = r));
    }
    if ((o.connect(s.layer ? s.layer.dry : this.out), s.rev)) {
      const r = this.keep(i.createGain());
      ((r.gain.value = s.rev), o.connect(r), r.connect(s.layer ? s.layer.wet : this.wetOut));
    }
    if (s.dly) {
      const r = this.keep(i.createGain());
      ((r.gain.value = s.dly), o.connect(r), r.connect(s.layer ? s.layer.dly : this.delayIn));
    }
    return a;
  }
  play(t, e, s) {
    s(this.m.note(t, e));
  }
  rnd() {
    return this.m.kit.rnd();
  }
  fade(t, e) {
    const s = this.m.now();
    (this.out.gain.setTargetAtTime(t, s, e), this.wetOut.gain.setTargetAtTime(t, s, e));
  }
  schedule(t, e) {
    if (this.nextT < t - 0.1) {
      const s = this.stepDur(),
        i = Math.ceil((t - this.nextT) / s);
      ((this.step += i), (this.nextT += i * s));
    }
    for (; this.nextT < t + e;) {
      const s = this.stepDur();
      (this.onStep(this.step, this.nextT, s), (this.nextT += s), this.step++);
    }
  }
  mood(t, e) {}
  dispose() {
    for (const t of this.nodes) t.disconnect();
    this.nodes.length = 0;
  }
}

const aT = [
    { bass: 41, pad: [57, 60, 64, 67] },
    { bass: 41, pad: [55, 59, 62, 67] },
    { bass: 40, pad: [55, 59, 62, 64] },
    { bass: 45, pad: [55, 59, 60, 64] },
    { bass: 41, pad: [57, 60, 64, 67] },
    { bass: 43, pad: [55, 59, 62, 64] },
    { bass: 45, pad: [55, 59, 60, 64] },
    { bass: 40, pad: [55, 60, 62, 64] },
    { bass: 38, pad: [53, 57, 60, 64] },
    { bass: 40, pad: [55, 59, 62, 64] },
    { bass: 41, pad: [57, 59, 60, 64] },
    { bass: 43, pad: [59, 62, 64, 67] },
    { bass: 38, pad: [53, 57, 60, 64] },
    { bass: 40, pad: [55, 59, 62, 64] },
    { bass: 41, pad: [57, 60, 64, 67] },
    { bass: 43, pad: [55, 60, 62, 67] },
  ],
  oT = [
    [0, 74, 2, 0.8],
    [2, 81, 3, 0.9],
    [5, 79, 1, 0.6],
    [6, 77, 2, 0.7],
    [8, 76, 2, 0.7],
    [10, 72, 2, 0.6],
    [12, 74, 4, 0.8],
    [16, 76, 2, 0.75],
    [18, 83, 3, 0.85],
    [21, 81, 1, 0.6],
    [22, 79, 2, 0.7],
    [24, 76, 2, 0.65],
    [26, 74, 2, 0.55],
    [28, 76, 4, 0.7],
    [32, 81, 2, 0.8],
    [34, 84, 3, 0.9],
    [37, 83, 1, 0.65],
    [38, 81, 2, 0.7],
    [40, 79, 3, 0.75],
    [43, 76, 1, 0.55],
    [44, 79, 4, 0.7],
    [48, 81, 6, 0.8],
    [54, 79, 2, 0.6],
    [56, 76, 8, 0.7],
    [64, 77, 3, 0.7],
    [67, 76, 1, 0.5],
    [68, 74, 4, 0.65],
    [72, 79, 3, 0.72],
    [75, 77, 1, 0.5],
    [76, 76, 4, 0.65],
    [80, 81, 3, 0.78],
    [83, 79, 1, 0.55],
    [84, 83, 4, 0.75],
    [88, 86, 4, 0.85],
    [92, 83, 2, 0.65],
    [94, 79, 2, 0.6],
    [96, 77, 3, 0.7],
    [99, 76, 1, 0.5],
    [100, 74, 2, 0.6],
    [102, 81, 2, 0.7],
    [104, 79, 6, 0.72],
    [110, 76, 2, 0.55],
    [112, 76, 2, 0.7],
    [114, 72, 2, 0.6],
    [116, 74, 4, 0.75],
    [120, 79, 4, 0.65],
    [124, 71, 2, 0.5],
    [126, 72, 2, 0.55],
  ],
  rT = cm(oT, 128),
  I1 = [
    [0, 1, 2, 3, 2, 1, 2, 3],
    [0, 2, 1, 3, 0, 2, 3, 1],
    [3, 2, 1, 0, 1, 2, 3, 2],
  ];

class lT extends fm {
  cPad = this.chan("cPad", 0.51, { rev: 0.4 });
  cBass = this.chan("cBass", 0.24, { rev: 0.1 });
  cBell = this.chan("cBell", 1, { rev: 0.55, dly: 0.4 });
  cFlute = this.chan("cFlute", 0.64, { rev: 0.5, dly: 0.25, pan: 0.15 });
  cArp = this.chan("cArp", 1.24, { rev: 0.35, dly: 0.35, pan: -0.25 });
  cStarL = this.chan("cStarL", 1.14, { rev: 0.7, dly: 0.3, pan: -0.6 });
  cStarR = this.chan("cStarR", 1.14, { rev: 0.7, dly: 0.3, pan: 0.6 });
  constructor(t, e) {
    super(t, e, (60 / 66) * 0.75);
  }
  stepDur() {
    return 60 / 66 / 2;
  }
  onStep(t, e, s) {
    const i = Math.floor(t / 128),
      a = t % 128,
      o = a >> 3,
      r = a & 7,
      l = aT[o],
      c = o === 15;
    if (r === 0) {
      const d = c ? s * 4 : s * 8;
      (this.play(this.cPad, e, (h) => Nl(h, l.pad.map(It), 0, d, 0.9)),
        this.play(this.cBass, e, (h) => A0(h, It(l.bass), 0, s * 7, 0.7)));
    }
    if (
      (c && r === 4 && this.play(this.cPad, e, (d) => Nl(d, [55, 59, 62, 67].map(It), 0, s * 4, 0.9)),
      r === 4 && o % 2 === 1 && !c && this.play(this.cBass, e, (d) => A0(d, It(l.bass + 7), 0, s * 3, 0.4)),
      !(i % 4 === 2 && o < 4))
    )
      for (const d of rT[a]) {
        const h = d[2] * s;
        i % 2 === 0
          ? this.play(this.cBell, e, (u) => en(u, It(d[1]), 0, Math.max(1.6, h * 1.5), d[3]))
          : this.play(this.cFlute, e, (u) => J6(u, It(d[1] - 12), 0, h * 0.95, d[3]));
      }
    if (i > 0 || o >= 4) {
      const d = I1[(i + (o >> 2)) % I1.length],
        h = l.pad[d[r]] + 12,
        u = r % 2 === 0 ? 0.55 : 0.38;
      this.play(this.cArp, e, (m) => Q6(m, It(h), 0, 0.5, u));
    }
    if (this.rnd() < 0.17) {
      const d = l.pad[Math.floor(this.rnd() * l.pad.length)] + 24 + (this.rnd() < 0.3 ? 12 : 0),
        h = this.rnd() * s * 0.6,
        u = 0.15 + this.rnd() * 0.22;
      this.play(this.rnd() < 0.5 ? this.cStarL : this.cStarR, e, (m) => en(m, It(d), h, 1.3, u));
    }
  }
}

const Fy = { bass: 38, pad: [53, 57, 62, 64] },
  Uy = { bass: 36, pad: [52, 55, 60, 62] },
  Oy = { bass: 35, pad: [55, 57, 59, 62] },
  du = { bass: 33, pad: [55, 57, 60, 64] },
  By = { bass: 41, pad: [53, 57, 60, 64] },
  Hy = { bass: 43, pad: [55, 59, 62, 64] },
  cT = { bass: 33, pad: [57, 62, 64, 65] },
  fT = { bass: 33, pad: [57, 62, 64, 69] },
  dT = [Fy, Fy, Uy, Uy, Oy, Oy, du, du, By, Hy, du, du, By, Hy, cT, fT],
  tc = [2, 0, 2, 0, 2, 0, 2, 0, 1, 1, 2, 0, 1, 1, 1, 1],
  hT = [
    [0, 74, 4, 0.85],
    [4, 81, 6, 0.95],
    [10, 79, 2, 0.7],
    [12, 77, 4, 0.8],
    [16, 76, 4, 0.8],
    [20, 72, 4, 0.7],
    [24, 74, 8, 0.85],
    [32, 76, 4, 0.8],
    [36, 79, 6, 0.9],
    [42, 76, 2, 0.65],
    [44, 74, 4, 0.75],
    [48, 72, 4, 0.7],
    [52, 74, 4, 0.75],
    [56, 76, 8, 0.8],
    [64, 74, 4, 0.8],
    [68, 83, 6, 0.95],
    [74, 81, 2, 0.7],
    [76, 79, 4, 0.8],
    [80, 81, 4, 0.8],
    [84, 83, 4, 0.85],
    [88, 86, 8, 0.95],
    [96, 84, 6, 0.95],
    [102, 83, 2, 0.7],
    [104, 81, 4, 0.8],
    [108, 79, 4, 0.75],
    [112, 81, 6, 0.85],
    [118, 76, 2, 0.65],
    [120, 81, 8, 0.85],
    [128, 81, 3, 0.9],
    [131, 81, 3, 0.8],
    [134, 84, 2, 0.85],
    [136, 81, 4, 0.85],
    [140, 77, 4, 0.75],
    [144, 83, 3, 0.9],
    [147, 83, 3, 0.8],
    [150, 86, 2, 0.85],
    [152, 83, 4, 0.85],
    [156, 79, 4, 0.75],
    [160, 84, 3, 0.92],
    [163, 84, 3, 0.82],
    [166, 88, 2, 0.9],
    [168, 86, 4, 0.88],
    [172, 84, 4, 0.8],
    [176, 81, 8, 0.85],
    [188, 76, 2, 0.65],
    [190, 79, 2, 0.7],
    [192, 81, 3, 0.9],
    [195, 81, 3, 0.8],
    [198, 84, 2, 0.85],
    [200, 81, 4, 0.85],
    [204, 77, 4, 0.75],
    [208, 83, 3, 0.9],
    [211, 83, 3, 0.8],
    [214, 86, 2, 0.85],
    [216, 88, 4, 0.92],
    [220, 86, 4, 0.85],
    [224, 89, 6, 1],
    [230, 88, 2, 0.8],
    [232, 86, 4, 0.9],
    [236, 81, 4, 0.8],
    [240, 81, 4, 0.8],
    [244, 76, 4, 0.7],
    [248, 81, 8, 0.9],
  ],
  uT = cm(hT, 256),
  $y = [0.8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 0],
  Gy = [0, 0, 0, 0, 0.6, 0, 0, 0, 0, 0, 0, 0, 0.6, 0, 0, 0.25],
  Vy = [0.4, 0, 0.28, 0, 0.4, 0, 0.28, 0.14, 0.4, 0, 0.28, 0, 0.4, 0, 0.28, 0.14],
  Wy = [1, 0, 0, 0, 0, 0, 0.6, 0, 0.9, 0, 0.5, 0, 0, 0, 0, 0],
  ig = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0.3],
  jy = [1, 0, 0, 0.7, 0, 0, 0.8, 0, 1, 0, 0, 0.6, 0, 0, 0.75, 0],
  qy = [0, 0, 0.4, 0, 0, 0.4, 0, 0, 0, 0, 0.4, 0, 0.5, 0, 0, 0.45],
  pT = [0.5, 0.2, 0.35, 0.2, 0.5, 0.2, 0.35, 0.25, 0.5, 0.2, 0.35, 0.2, 0.5, 0.2, 0.4, 0.3],
  mT = [0, 0, 12, 0, 0, 12, 0, 7];

class gT extends fm {
  lExplore = this.layer(1);
  lCombat = this.layer(0);
  I = 0;
  tension = 0;
  applied = -1;
  cPad = this.chan("cPad", 0.51, { rev: 0.35 });
  eBass = this.chan("eBass", 0.21, { layer: this.lExplore });
  eArp = this.chan("eArp", 1.34, { layer: this.lExplore, rev: 0.3, dly: 0.35, pan: -0.3 });
  eBell = this.chan("eBell", 1.24, { layer: this.lExplore, rev: 0.5, dly: 0.35, pan: 0.2 });
  eFlute = this.chan("eFlute", 0.6, { layer: this.lExplore, rev: 0.45, dly: 0.2, pan: 0.1 });
  ePerc = this.chan("ePerc", 0.7, { layer: this.lExplore, rev: 0.15 });
  cBass = this.chan("cBass", 0.35, { layer: this.lCombat });
  cDrum = this.chan("cDrum", 0.4, { layer: this.lCombat, rev: 0.16 });
  cSnare = this.chan("cSnare", 0.7, { layer: this.lCombat, rev: 0.22, pan: -0.1 });
  cHat = this.chan("cHat", 1.8, { layer: this.lCombat, rev: 0.08, pan: 0.25 });
  cStr = this.chan("cStr", 1.28, { layer: this.lCombat, rev: 0.25, pan: -0.2 });
  cBrass = this.chan("cBrass", 0.4, { layer: this.lCombat, rev: 0.35, dly: 0.12 });
  cLow = this.chan("cLow", 0.37, { layer: this.lCombat, rev: 0.3 });
  constructor(t, e) {
    super(t, e, (60 / 108) * 0.75);
  }
  mood(t, e) {
    ((this.I = t),
      (this.tension = e),
      !(Math.abs(t - this.applied) < 0.01) &&
        ((this.applied = t),
        this.setLayer(this.lExplore, Math.cos((t * Math.PI) / 2), 0.15),
        this.setLayer(this.lCombat, Math.sin((t * Math.PI) / 2), 0.15)));
  }
  stepDur() {
    return 60 / (108 * (1 + 0.07 * this.tension)) / 4;
  }
  onStep(t, e, s) {
    const i = Math.floor(t / 256),
      a = t % 256,
      o = a >> 4,
      r = a & 15,
      l = o >> 3,
      c = dT[o],
      f = this.I > 0.04,
      d = this.I < 0.97,
      h = o === 7 || o === 15,
      u = () => (this.rnd() - 0.5) * 0.006;
    if (r === 0 && tc[o] > 0) {
      const y = s * 16 * tc[o];
      this.play(this.cPad, e, (v) => Nl(v, c.pad.map(It), 0, y, 0.85, 1 + this.I * 0.6));
    }
    const m = i % 4,
      x = m === 0 || m === 3 || (m === 1 ? l === 1 : l === 0),
      p = m === 3 && l === 1,
      g = x ? uT[a] : null;
    if (d) {
      if (r === 0 && tc[o] > 0) {
        const y = s * 16 * tc[o];
        this.play(this.eBass, e, (v) => A0(v, It(c.bass), 0, y * 0.85, 0.75));
      }
      if (
        (r === 14 &&
          (o === 15 || tc[o + 1] > 0) &&
          this.play(this.eBass, e, (y) => A0(y, It(c.bass + 12), 0, s * 1.6, 0.45, 0.3)),
        (r & 1) === 0 && (i > 0 || o >= 2))
      ) {
        const y = I1[(i + l) % I1.length],
          v = c.pad[y[r >> 1]] + 12;
        this.play(this.eArp, e + u(), (_) => Q6(_, It(v), 0, 0.32, (r & 3) === 0 ? 0.6 : 0.42));
      }
      if (
        ($y[r] > 0 && this.play(this.ePerc, e, (y) => My(y, 0, $y[r] * 0.55)),
        Gy[r] > 0 && this.play(this.ePerc, e + u(), (y) => TS(y, 0, Gy[r])),
        Vy[r] > 0 && this.play(this.ePerc, e + u(), (y) => SS(y, 0, Vy[r] * (0.85 + this.rnd() * 0.3))),
        g)
      )
        for (const y of g) {
          const v = y[2] * s;
          m === 2
            ? this.play(this.eFlute, e, (_) => J6(_, It(y[1] - 12), 0, v * 0.92, y[3]))
            : this.play(this.eBell, e, (_) => en(_, It(y[1]), 0, Math.max(0.9, v * 1.4), y[3] * 0.9));
        }
    }
    if (f) {
      if ((r & 1) === 0) {
        const v = (c.bass < 36 ? c.bass + 12 : c.bass) + mT[r >> 1];
        this.play(this.cBass, e, (_) => A0(_, It(v), 0, s * 1.5, (r & 3) === 0 ? 0.85 : 0.65, 0.8));
      }
      const y = h && r >= 12;
      if (
        (Wy[r] > 0 && !y && this.play(this.cDrum, e, (v) => My(v, 0, Wy[r])),
        jy[r] > 0 &&
          !y &&
          this.play(this.cDrum, e + u(), (v) => Ym(v, 0, jy[r] * (0.9 + this.rnd() * 0.15), 1)),
        qy[r] > 0 && !y && this.play(this.cDrum, e + u(), (v) => Ym(v, 0, qy[r], 1.5)),
        ig[r] > 0 &&
          !y &&
          this.play(this.cSnare, e, (v) => {
            (Sl(v, 0, ig[r]), ig[r] === 1 && MS(v, 0, 0.7));
          }),
        y && this.play(this.cDrum, e, (v) => Ym(v, 0, 0.5 + (r - 12) * 0.17, r % 2 ? 1.5 : 1.2)),
        this.play(this.cHat, e + u(), (v) =>
          kS(v, 0, pT[r] * (0.85 + this.rnd() * 0.3), r === 14 && (o & 1) === 1),
        ),
        (r & 3) !== 1)
      ) {
        const v = r >> 2,
          _ = c.pad[[0, 2, 1, 3][v]] + (v === 3 ? 12 : 0);
        this.play(this.cStr, e + u(), (k) => wy(k, It(_), 0, 0.14, (r & 3) === 0 ? 0.85 : 0.55));
      }
      if (
        (r === 0 &&
          tc[o] > 0 &&
          this.play(this.cLow, e, (v) => {
            (Qi(v, It(c.bass + 12), 0, s * 6, 0.8, 0.7),
              Qi(v, It(c.bass + 19), 0, s * 6, 0.6, 0.7),
              Lo(v, It(c.bass), 0, 0.7));
          }),
        r === 0 && (o === 0 || o === 8) && this.play(this.cDrum, e, (v) => rm(v, 0, 0.55, 1.8)),
        h && r === 8 && this.play(this.cDrum, e, (v) => tM(v, 0, s * 8, 0.7)),
        g)
      )
        for (const v of g) {
          const _ = v[2] * s;
          this.play(this.cBrass, e, (k) => {
            (Qi(k, It(v[1] - 12), 0, _ * 0.9, v[3]), p && Qi(k, It(iT(v[1]) - 12), 0, _ * 0.9, v[3] * 0.6));
          });
        }
      if (this.tension > 0.25) {
        const v = (r & 2) === 0 ? 81 : 86,
          _ = (0.2 + 0.35 * this.tension) * ((r & 3) === 0 ? 1 : 0.7);
        this.play(this.cStr, e, (k) => wy(k, It(v), 0, 0.09, _));
      }
    }
  }
}

const xT = [
    [4, 74, 1, 0.9],
    [5, 74, 1, 0.85],
    [6, 81, 3, 1],
    [9, 79, 1, 0.8],
    [10, 78, 2, 0.9],
    [12, 76, 1, 0.85],
    [13, 78, 1, 0.85],
    [14, 79, 2, 0.9],
    [16, 81, 4, 0.95],
    [20, 83, 2, 0.95],
    [22, 81, 1, 0.85],
    [23, 83, 1, 0.9],
    [24, 85, 2, 0.95],
    [26, 86, 10, 1],
  ],
  yT = [
    [0, 38, [50, 57, 62, 66], 12],
    [12, 43, [55, 59, 62, 67], 4],
    [16, 45, [57, 61, 64, 69], 4],
    [20, 43, [55, 59, 62, 67], 4],
    [24, 45, [57, 61, 64, 69], 2],
    [26, 38, [50, 57, 62, 66, 69, 74], 12],
  ],
  Xy = 36;

class vT extends fm {
  cPad = this.chan("cPad", 0.41, { rev: 0.4 });
  cBrass = this.chan("cBrass", 0.4, { rev: 0.4, dly: 0.12 });
  cBell = this.chan("cBell", 1.16, { rev: 0.55, dly: 0.3 });
  cBass = this.chan("cBass", 0.29);
  cDrum = this.chan("cDrum", 0.66, { rev: 0.2 });
  mel = cm(xT, 40);
  constructor(t, e) {
    super(t, e, (60 / 132) * 0.75);
  }
  stepDur() {
    return 60 / 132 / 2;
  }
  onStep(t, e, s) {
    if (t < Xy) {
      t < 4 &&
        (this.play(this.cDrum, e, (a) => {
          (Sl(a, 0, 0.35 + t * 0.12), Sl(a, s / 2, 0.4 + t * 0.12));
        }),
        t === 0 && this.play(this.cDrum, e, (a) => tM(a, 0, s * 4, 0.8)));
      for (const a of yT) {
        if (a[0] !== t) continue;
        const o = a[3] * s,
          r = t === 26;
        (this.play(this.cPad, e, (l) => {
          (Nl(l, a[2].map(It), 0, o, 0.9, 1.4), r && $3(l, [62, 66, 69, 74].map(It), 0, o, 0.55));
        }),
          this.play(this.cBass, e, (l) => A0(l, It(a[1]), 0, o * 0.9, 0.8, 0.4)),
          t > 0 && this.play(this.cDrum, e, (l) => Lo(l, It(a[1]), 0, r ? 0.8 : 0.6)),
          (t === 4 || r) && this.play(this.cDrum, e, (l) => rm(l, 0, r ? 0.8 : 0.5, r ? 2.6 : 1.5)));
      }
      t >= 4 &&
        t < 26 &&
        (this.play(this.cDrum, e, (a) => Sl(a, 0, t % 2 === 0 ? 0.5 : 0.28)),
        t % 4 === 3 && this.play(this.cDrum, e, (a) => Sl(a, s / 2, 0.25)));
      for (const a of this.mel[t]) {
        const o = a[2] * s;
        (this.play(this.cBrass, e, (r) => {
          (Qi(r, It(a[1]), 0, o * 0.92, a[3], 1.1), Qi(r, It(a[1] - 12), 0, o * 0.92, a[3] * 0.7, 0.9));
        }),
          this.play(this.cBell, e, (r) => en(r, It(a[1] + 12), 0, Math.max(0.8, o), a[3] * 0.6)));
      }
      t >= 27 &&
        t <= 31 &&
        this.play(this.cBell, e, (a) => en(a, It([78, 81, 86, 90, 93][t - 27]), 0, 1.6, 0.6));
      return;
    }
    if (
      ((t - Xy) % 16 === 0 &&
        (this.play(this.cPad, e, (a) => Nl(a, [50, 57, 62, 66, 69, 76].map(It), 0, s * 17, 0.6, 1.1)),
        this.play(this.cBass, e, (a) => A0(a, It(38), 0, s * 14, 0.4))),
      this.rnd() < 0.22)
    ) {
      const a = [74, 76, 78, 81, 83, 86, 88, 90][Math.floor(this.rnd() * 8)],
        o = 0.18 + this.rnd() * 0.2;
      this.play(this.cBell, e, (r) => en(r, It(a), 0, 1.6, o));
    }
  }
}

const bT = [
    [1, 69, 3, 0.8],
    [4, 67, 2, 0.7],
    [6, 65, 2, 0.7],
    [8, 62, 3, 0.75],
    [11, 64, 1, 0.6],
    [12, 65, 4, 0.75],
    [16, 67, 3, 0.8],
    [19, 65, 1, 0.65],
    [20, 64, 4, 0.7],
    [24, 62, 8, 0.8],
  ],
  _T = [
    [0, 38, [50, 57, 62, 65], 8],
    [8, 34, [53, 58, 62, 65], 8],
    [16, 31, [55, 58, 62], 4],
    [20, 33, [57, 62, 64], 4],
    [24, 38, [50, 57, 62, 64, 65], 8],
  ],
  Yy = 32;

class wT extends fm {
  cPad = this.chan("cPad", 0.62, { rev: 0.45 });
  cHorn = this.chan("cHorn", 0.63, { rev: 0.5, dly: 0.2 });
  cBell = this.chan("cBell", 1.02, { rev: 0.6, dly: 0.3 });
  cBass = this.chan("cBass", 0.21);
  cDrum = this.chan("cDrum", 0.55, { rev: 0.25 });
  mel = cm(bT, 32);
  constructor(t, e) {
    super(t, e, (60 / 100) * 1.5);
  }
  stepDur() {
    return 60 / 100 / 2;
  }
  onStep(t, e, s) {
    if (t < Yy) {
      for (const a of _T) {
        if (a[0] !== t) continue;
        const o = a[3] * s;
        (this.play(this.cPad, e, (r) => Nl(r, a[2].map(It), 0, o, 0.9, 0.7)),
          this.play(this.cBass, e, (r) => A0(r, It(a[1]), 0, o * 0.9, 0.75)),
          this.play(this.cDrum, e, (r) =>
            Lo(r, It(a[1] < 36 ? a[1] + 12 : a[1]), 0, t === 0 || t === 24 ? 0.8 : 0.5),
          ));
      }
      for (const a of this.mel[t]) {
        const o = a[2] * s;
        this.play(this.cHorn, e, (r) => {
          (zl(r, It(a[1]), 0, o * 0.95, a[3]), zl(r, It(a[1] - 12), 0, o * 0.95, a[3] * 0.5));
        });
      }
      (t === 24 || t === 28) && this.play(this.cBell, e, (a) => en(a, It(50), 0, 2.6, 0.7));
      return;
    }
    const i = t - Yy;
    (i % 16 === 0 && this.play(this.cPad, e, (a) => Nl(a, [38, 45, 50, 57, 64].map(It), 0, s * 17, 0.7, 0.6)),
      i % 32 === 8 && this.play(this.cBell, e, (a) => en(a, It(62), 0, 3, 0.3)));
  }
}

class Ky {
  static solo = null;
  m;
  cur = null;
  name = "none";
  dying = [];
  I = 0;
  tension = 0;
  constructor(t) {
    this.m = t;
  }
  get track() {
    return this.name;
  }
  get channels() {
    return this.cur ? [...new Set(this.cur.chanNames)] : [];
  }
  setTrack(t) {
    if (t === this.name) return;
    const e = this.m.now(),
      s = t === "victory" || t === "defeat";
    if (this.cur) {
      const o = s ? 0.12 : 0.45;
      (this.cur.fade(0, o),
        (this.cur.killAt = e + o * 6 + 2.5),
        this.dying.push(this.cur),
        (this.cur = null));
    }
    if (((this.name = t), t === "none")) return;
    const i = e + (s ? sT : nT),
      a =
        t === "menu"
          ? new lT(this.m, i)
          : t === "battle"
            ? new gT(this.m, i)
            : t === "victory"
              ? new vT(this.m, i)
              : new wT(this.m, i);
    (a.mood(this.I, this.tension), a.fade(1, s ? 0.02 : 0.3), (this.cur = a));
  }
  setMood(t, e) {
    ((this.I = t), (this.tension = e), this.cur?.mood(t, e));
  }
  tick(t = eT) {
    const e = this.m.now();
    (this.cur?.schedule(e, t),
      this.dying.length && (this.dying = this.dying.filter((s) => (s.killAt > e ? !0 : (s.dispose(), !1)))));
  }
  dispose() {
    this.cur?.dispose();
    for (const t of this.dying) t.dispose();
    ((this.cur = null), (this.dying.length = 0), (this.name = "none"));
  }
}

const MT = {
    first_blood: "First blood!",
    double_kill: "Double kill!",
    triple_kill: "Triple kill!",
    quadra_kill: "Quadra kill!",
    penta_kill: "Penta kill!",
    killing_spree: "Killing spree!",
    unstoppable: "Unstoppable!",
    legendary: "Legendary!",
    shutdown: "Shut down!",
    ace: "Ace!",
    victory: "Victory!",
    defeat: "Defeat.",
  },
  kT = [
    "google uk english male",
    "daniel",
    "microsoft guy",
    "microsoft david",
    "microsoft ryan",
    "microsoft george",
    "alex",
    "aaron",
    "arthur",
    "fred",
    "male",
  ];

function ST(n) {
  const t = n.filter((e) => /^en([-_]|$)/i.test(e.lang));
  if (!t.length) return null;
  for (const e of kT) {
    const s = t.find((i) => i.name.toLowerCase().includes(e));
    if (s) return s;
  }
  return t.find((e) => /en[-_](us|gb)/i.test(e.lang)) ?? t[0];
}

class TT {
  synth;
  make;
  setTimer;
  clearTimer;
  voice = null;
  volume = 1;
  timers = new Set();
  disposed = !1;
  constructor(t = {}) {
    const e = globalThis;
    this.synth = t.synth !== void 0 ? t.synth : (e.speechSynthesis ?? null);
    const s = e.SpeechSynthesisUtterance;
    if (
      ((this.make = t.makeUtterance ?? (s ? (i) => new s(i) : null)),
      (this.setTimer = t.setTimer ?? ((i, a) => globalThis.setTimeout(i, a))),
      (this.clearTimer = t.clearTimer ?? ((i) => globalThis.clearTimeout(i))),
      this.synth)
    ) {
      this.refreshVoice();
      try {
        this.synth.addEventListener?.("voiceschanged", this.refreshVoice);
      } catch {}
    }
  }
  get available() {
    return !this.disposed && this.synth !== null && this.make !== null;
  }
  refreshVoice = () => {
    try {
      this.voice = this.synth ? ST(this.synth.getVoices()) : null;
    } catch {
      this.voice = null;
    }
  };
  setVolume(t) {
    this.volume = Math.max(0, Math.min(1, t));
  }
  say(t, e, s = 0) {
    const i = MT[t];
    if (!i || !this.available || this.volume <= 0.01) return !1;
    const a = () => {
      if (this.available)
        try {
          const o = this.make(i);
          ((o.lang = this.voice?.lang ?? "en-US"),
            this.voice && (o.voice = this.voice),
            (o.rate = 0.92),
            (o.pitch = e ? 0.5 : 0.75),
            (o.volume = this.volume),
            this.synth.cancel(),
            this.synth.speak(o));
        } catch {}
    };
    if (s <= 0.02) a();
    else {
      const o = this.setTimer(() => {
        (this.timers.delete(o), a());
      }, s * 1e3);
      this.timers.add(o);
    }
    return !0;
  }
  stop() {
    for (const t of this.timers) this.clearTimer(t);
    this.timers.clear();
    try {
      this.synth?.cancel();
    } catch {}
  }
  dispose() {
    if (!this.disposed) {
      this.stop();
      try {
        this.synth?.removeEventListener?.("voiceschanged", this.refreshVoice);
      } catch {}
      this.disposed = !0;
    }
  }
}

const ET = {
    panyue: "atk_panyue_swing",
    chijin: "atk_chijin_swing",
    niumo: "atk_chijin_swing",
    xingli: "atk_xingli_charge",
    fengling: "atk_fengling_draw",
    yeque: "atk_yeque_swing",
    mushroom: "atk_mushroom_swing",
    xuesong: "atk_xuesong_swing",
    stone: "atk_stone_swing",
    scallion: "atk_scallion_launch",
    paperboy: "atk_paperboy_launch",
    maggot: "atk_maggot_launch",
    horseman: "atk_horseman_swing",
    cow: "atk_cow_swing",
    monkey: "atk_panyue_swing",
    slime: "atk_slime_swing",
  },
  AT = { panyue: "atk_panyue_hit", chijin: "atk_chijin_hit", yeque: "atk_yeque_hit", mushroom: "atk_mushroom_hit", xuesong: "atk_xuesong_hit", stone: "atk_stone_hit", scallion: "atk_scallion_hit", paperboy: "atk_paperboy_hit", maggot: "atk_maggot_hit", horseman: "atk_horseman_hit", cow: "atk_cow_hit", monkey: "atk_chijin_hit", slime: "atk_slime_hit" },
  RT = {
    xingli_basic: "atk_xingli_launch",
    fengling_basic: "atk_fengling_launch",
    scallion_basic: "atk_scallion_launch",
    paperboy_basic: "atk_paperboy_launch",
    paperboy_crane: "cast_paperboy_s2",
    maggot_basic: "atk_maggot_launch",
    maggot_basic_gold: "atk_maggot_launch",
    xingli_s1: "xingli_s1_fly",
    fengling_s1: "fengling_s1_fly",
    yeque_s2: "yeque_s2_fly",
    minion_ranged: "minion_ranged_launch",
    minion_siege: "minion_siege_launch",
    tower_bolt: "tower_launch",
    core_bolt: "tower_launch",
    monster_spit: "monster_spit_launch",
  },
  CT = {
    xingli_basic: "atk_xingli_hit",
    fengling_basic: "atk_fengling_hit",
    scallion_basic: "atk_scallion_hit",
    paperboy_basic: "atk_paperboy_hit",
    paperboy_crane: "fx_paperboy_crane_hit",
    maggot_basic: "atk_maggot_hit",
    maggot_basic_gold: "atk_maggot_hit",
    xingli_s1: "xingli_s1_hit",
    fengling_s1: "fengling_s1_hit",
    yeque_s2: "yeque_s2_hit",
    minion_ranged: "minion_ranged_hit",
    minion_siege: "minion_siege_hit",
    tower_bolt: "tower_hit",
    core_bolt: "tower_hit",
    monster_spit: "monster_spit_hit",
  },
  LT = {
    telegraph: "area_telegraph",
    panyue_s2_aura: "area_panyue_aura",
    panyue_ult_fissure: "area_panyue_fissure",
    chijin_ult_spin: "area_chijin_spin",
    xingli_s2_well: "area_xingli_well",
    xingli_ult_storm: "area_xingli_storm",
    fengling_ult_rain: "area_fengling_rain",
  },
  hu = { mossback: 0, frost_golem: 1, ember_golem: 2, abyss_drake: 3, star_colossus: 4, glimwing: 5 },
  ag = (n) => (n === "star_colossus" ? 1 : 0),
  Zy = {
    victory: 100,
    defeat: 100,
    ace: 90,
    penta_kill: 85,
    quadra_kill: 80,
    legendary: 78,
    triple_kill: 75,
    unstoppable: 72,
    double_kill: 70,
    first_blood: 68,
    shutdown: 60,
    killing_spree: 58,
    epic_slain: 50,
    tower_destroyed: 45,
    epic_spawn: 40,
    match_start: 35,
    super_minions: 30,
    minions_spawn: 20,
  },
  eM = new Set([
    "first_blood",
    "double_kill",
    "triple_kill",
    "quadra_kill",
    "penta_kill",
    "killing_spree",
    "unstoppable",
    "legendary",
    "shutdown",
    "ace",
  ]),
  IT = new Set([...eM, "tower_destroyed", "epic_slain", "super_minions"]);

function PT(n, t, e) {
  if (!e.dir || e.radius === void 0) return !1;
  const s = n.x - e.pos.x,
    i = n.y - e.pos.y,
    a = Math.hypot(s, i);
  if (a > e.radius + t) return !1;
  if (a <= t) return !0;
  const o = (e.angle ?? Math.PI / 3) / 2 + Math.asin(Math.min(1, t / a));
  return (s * e.dir.x + i * e.dir.y) / a >= Math.cos(Math.min(Math.PI, o));
}

class DT {
  ctx = null;
  mixer = null;
  music = null;
  vols = { master: 0.8, sfx: 0.9, music: 0.5 };
  wantTrack = "none";
  hidden = !1;
  disposed = !1;
  voice = new TT();
  timer = 0;
  lastTime = -1;
  lastSeed = -1;
  lastHero = "";
  units = new Map();
  unitsOld = new Map();
  refreshCount = 0;
  cores = [];
  projOwner = new Map();
  hitProj = new Set();
  towerHits = new Set();
  areaVoices = new Map();
  breathVoice = null;
  strums = new Map();
  shadowLeft = 0;
  sight = [];
  sightReady = !1;
  lx = 0;
  ly = 0;
  spGain = 1;
  spPan = 0;
  spLp = 0;
  annFreeAt = 0;
  heat = 0;
  intensity = 0;
  tension = 0;
  ovI = null;
  ovT = null;
  toneDead = !1;
  hbTimer = 0;
  recallVoice = null;
  frame = 0;
  debug = {
    play: (t, e) => {
      this.mixer?.play(t, e);
    },
    stats: () => ({
      state: this.ctx?.state ?? "none",
      time: this.ctx?.currentTime ?? 0,
      voices: this.mixer?.voiceCount ?? 0,
      notes: this.mixer?.noteCount ?? 0,
      played: this.mixer?.stats.played ?? 0,
      throttled: this.mixer?.stats.throttled ?? 0,
      capped: this.mixer?.stats.capped ?? 0,
      stolen: this.mixer?.stats.stolen ?? 0,
      peakVoices: this.mixer?.stats.peakVoices ?? 0,
      intensity: this.ovI ?? this.intensity,
      tension: this.ovT ?? this.tension,
      track: this.music?.track ?? this.wantTrack,
    }),
    override: (t, e) => {
      ((this.ovI = t), (this.ovT = e));
    },
  };
  constructor() {
    if (
      (typeof document < "u" && document.addEventListener("visibilitychange", this.onVisibility),
      typeof window < "u")
    )
      for (const t of Qy) window.addEventListener(t, this.onGesture, { capture: !0, passive: !0 });
  }
  unlock() {
    if (!(this.disposed || typeof window > "u")) {
      if (!this.ctx) {
        const t = window.AudioContext ?? window.webkitAudioContext;
        if (!t) return;
        try {
          this.ctx = new t({ latencyHint: "interactive" });
        } catch {
          try {
            this.ctx = new t();
          } catch {
            return;
          }
        }
        ((this.mixer = new Ny(this.ctx)),
          this.mixer.kit.reseed(Date.now()),
          (this.music = new Ky(this.mixer)),
          this.mixer.setVolumes(this.vols.master, this.vols.sfx, this.vols.music),
          this.wantTrack !== "none" && this.music.setTrack(this.wantTrack),
          (this.timer = window.setInterval(this.pump, 60)));
      }
      this.ctx.state !== "running" && !this.hidden && this.ctx.resume().catch(uu);
    }
  }
  pump = () => {
    !this.mixer || !this.music || this.ctx?.state !== "running" || (this.mixer.sweep(), this.music.tick());
  };
  onGesture = () => {
    (!this.ctx || this.ctx.state !== "running") && this.unlock();
  };
  get live() {
    return this.mixer !== null && !this.hidden && (this.ctx === null || this.ctx.state === "running");
  }
  removeGestureListeners() {
    if (!(typeof window > "u"))
      for (const t of Qy) window.removeEventListener(t, this.onGesture, { capture: !0 });
  }
  onVisibility = () => {
    ((this.hidden = document.hidden), this.hidden && this.voice.stop());
    const t = this.ctx,
      e = this.mixer;
    !t ||
      !e ||
      (this.hidden
        ? (e.fadeMaster(0, 0.015),
          window.setTimeout(() => {
            this.hidden && t.state === "running" && t.suspend().catch(uu);
          }, 90))
        : t
            .resume()
            .then(() => e.fadeMaster(this.vols.master, 0.08))
            .catch(uu));
  };
  setVolumes(t) {
    ((this.vols = { master: t.master, sfx: t.sfx, music: t.music }),
      this.voice.setVolume(t.master * t.sfx),
      this.mixer && !this.hidden
        ? this.mixer.setVolumes(t.master, t.sfx, t.music)
        : this.mixer && this.mixer.setVolumes(0, t.sfx, t.music));
  }
  setMusic(t) {
    ((this.wantTrack = t), t !== "battle" && this.leaveBattle(), this.music?.setTrack(t));
  }
  leaveBattle() {
    (this.toneDead && ((this.toneDead = !1), this.mixer?.setMusicTone(2e4)),
      this.areaVoices.forEach((t) => t.h.stop(0.2)),
      this.areaVoices.clear(),
      this.breathVoice?.h.stop(0.2),
      (this.breathVoice = null),
      this.recallVoice?.stop(0.1),
      (this.recallVoice = null),
      (this.hbTimer = 0),
      (this.heat = 0),
      (this.shadowLeft = 0));
  }
  attachOffline(t, e) {
    return (
      (this.mixer = new Ny(t, { clock: e })),
      (this.music = new Ky(this.mixer)),
      this.mixer.setVolumes(this.vols.master, this.vols.sfx, this.vols.music),
      this.wantTrack !== "none" && this.music.setTrack(this.wantTrack),
      this.mixer
    );
  }
  ui(t) {
    this.live && this.mixer?.play(`ui_${t}`);
  }
  dispose() {
    this.disposed ||
      ((this.disposed = !0),
      typeof document < "u" && document.removeEventListener("visibilitychange", this.onVisibility),
      this.removeGestureListeners(),
      this.timer && window.clearInterval(this.timer),
      this.voice.dispose(),
      this.music?.dispose(),
      this.mixer?.dispose(),
      this.ctx && this.ctx.state !== "closed" && this.ctx.close().catch(uu),
      (this.music = null),
      (this.mixer = null),
      (this.ctx = null),
      this.resetMatch());
  }
  resetMatch() {
    (this.units.clear(),
      this.unitsOld.clear(),
      (this.cores.length = 0),
      this.projOwner.clear(),
      this.areaVoices.forEach((t) => t.h.stop(0.2)),
      this.areaVoices.clear(),
      this.breathVoice?.h.stop(0.2),
      (this.breathVoice = null),
      this.strums.clear(),
      (this.shadowLeft = 0),
      this.recallVoice?.stop(0.1),
      (this.recallVoice = null),
      (this.heat = 0),
      (this.annFreeAt = 0),
      (this.hbTimer = 0));
  }
  refreshUnits(t) {
    const e = t.config;
    ((t.time + 1 < this.lastTime || e.seed !== this.lastSeed || e.playerHero !== this.lastHero) &&
      (this.resetMatch(), (this.lastSeed = e.seed), (this.lastHero = e.playerHero)),
      (this.lastTime = t.time),
      ++this.refreshCount > 900 &&
        ((this.refreshCount = 0), (this.unitsOld = this.units), (this.units = new Map())),
      (this.cores.length = 0));
    for (const s of t.units) (this.units.set(s.id, s), s.kind === "core" && this.cores.push(s));
  }
  unit(t) {
    return this.units.get(t) ?? this.unitsOld.get(t);
  }
  player(t) {
    const e = this.unit(t.playerId);
    return e && e.kind === "hero" ? e : void 0;
  }
  seen(t) {
    return t.team === 0 || t.visible[0];
  }
  posSeen(t, e) {
    const s = this.sight;
    if (!this.sightReady) {
      s.length = 0;
      for (const i of t.units) {
        if (i.team !== 0 || !i.alive) continue;
        const a =
          i.kind === "hero"
            ? i.buffs && i.buffs.some((b) => b.id === "xuesong_pole")
              ? 26
              : ui.hero
            : i.kind === "minion"
              ? ui.minion
              : i.kind === "tower"
                ? ui.tower
                : ui.core;
        s.push(i.pos.x, i.pos.y, a * a);
      }
      this.sightReady = !0;
    }
    for (let i = 0; i < s.length; i += 3) {
      const a = e.x - s[i],
        o = e.y - s[i + 1];
      if (a * a + o * o <= s[i + 2]) return !0;
    }
    return !1;
  }
  locate(t, e, s) {
    const i = t.x - this.lx,
      a = t.y - this.ly,
      o = Math.hypot(i, a);
    if (o > e && s <= 0) return !1;
    const r = 3,
      l = o <= r ? 1 : Math.max(0, 1 - (o - r) / (e - r));
    return (
      (this.spGain = Math.max(s, Math.pow(l, 1.6))),
      (this.spPan = Math.max(-1, Math.min(1, i / 13)) * 0.85),
      (this.spLp = o > 8 ? 17e3 * Math.pow(0.13, Math.min(1, (o - 8) / 18)) : 0),
      this.spGain > 0.004
    );
  }
  at(t, e, s, i) {
    const a = this.mixer,
      g1 = r1[t];
    return !a || !g1 || !this.locate(e, g1.range, i?.floor ?? 0)
      ? null
      : a.play(t, {
          gain: s * this.spGain,
          pan: this.spPan,
          lp: this.spLp,
          pitch: i?.pitch,
          v: i?.v,
          dur: i?.dur,
          prio: i?.prio,
        });
  }
  handleEvents(t, e) {
    const s = this.mixer;
    if (!s || !this.live || t.length === 0) return;
    (this.refreshUnits(e), (this.sightReady = !1));
    const i = e.playerId,
      a = this.player(e);
    a && ((this.lx = a.pos.x), (this.ly = a.pos.y));
    let o = !1,
      r = !1;
    (this.hitProj.clear(), this.towerHits.clear());
    for (const c of t)
      c.type === "announce"
        ? eM.has(c.key) && (o = !0)
        : c.type === "gold"
          ? c.unitId === i && c.reason !== "passive" && (r = !0)
          : c.type === "projectileHit" &&
            (this.hitProj.add(c.id),
            (c.visual === "tower_bolt" || c.visual === "core_bolt") && this.towerHits.add(c.targetId));
    let l = null;
    for (const c of t)
      switch (c.type) {
        case "attack": {
          const f = this.unit(c.unitId);
          if (!f || !this.seen(f)) break;
          const d = c.unitId === i,
            h = c.targetId === i;
          f.kind === "hero"
            ? this.at(ET[f.heroId], f.pos, d ? 1 : 0.6, { prio: d ? 2 : 1 })
            : f.kind === "minion"
              ? (f.minionType === "melee" || f.minionType === "super") &&
                this.at("minion_swing", f.pos, h ? 0.8 : 0.45, { pitch: f.minionType === "super" ? 0.7 : 1 })
              : f.kind === "tower" || f.kind === "core"
                ? this.at("tower_charge", f.pos, h ? 1 : 0.6, {
                    pitch: f.kind === "core" ? 0.8 : 1,
                    prio: h ? 2 : 1,
                  })
                : rn[f.monsterType].projectileSpeed === 0 &&
                  this.at("monster_swing", f.pos, 0.7, { v: hu[f.monsterType] });
          break;
        }
        case "damage": {
          const f = c.targetId === i,
            d = c.sourceId === i,
            h = this.unit(c.sourceId),
            u = this.unit(c.targetId),
            m = u !== void 0 && !f && !this.seen(u);
          if (((f || (d && !m)) && this.noteCombat(f ? h : u), f && a && c.amount > 0)) {
            const p = c.amount / Math.max(1, a.stats.maxHp);
            p >= 0.1
              ? s.play("player_hurt_heavy", { gain: Math.min(1, 0.7 + p * 1.5) })
              : p >= 0.008 &&
                s.play("player_hurt", { gain: Math.min(1, 0.55 + p * 4), v: Math.min(1, p * 10) });
          }
          if (c.skill) {
            d && u && u.kind === "hero" && !m && s.play("skill_hit");
            break;
          }
          if (!h || m || (!f && !d && !u && !this.posSeen(e, c.pos))) break;
          const x = u !== void 0 && u.kind === "hero";
          if (h.kind === "hero") {
            const p = AT[h.heroId];
            p && c.dtype === "physical" && this.at(p, c.pos, d ? 1 : f ? 0.9 : 0.6, { prio: d || f ? 2 : 1 });
          } else
            h.kind === "minion"
              ? h.minionType === "melee"
                ? this.at("minion_melee_hit", c.pos, f ? 0.75 : x ? 0.5 : 0.3)
                : h.minionType === "super" && this.at("super_hit", c.pos, f ? 0.85 : x ? 0.6 : 0.4)
              : h.kind === "monster" &&
                rn[h.monsterType].projectileSpeed === 0 &&
                (rn[h.monsterType].epic
                  ? this.at("epic_hit", c.pos, f ? 1 : 0.8, { v: ag(h.monsterType) })
                  : this.at("monster_hit", c.pos, f ? 0.9 : 0.65, { v: hu[h.monsterType] }));
          break;
        }
        case "heal":
          c.targetId === i && a && c.amount >= a.stats.maxHp * 0.04 && s.play("fx_heal", { gain: 0.8 });
          break;
        case "skillCast": {
          const f = c.unitId === i,
            d = this.unit(c.unitId);
          if (!f && !(d ? this.seen(d) : this.posSeen(e, c.pos))) break;
          const h =
            c.slot === "recall" || c.slot === "heal" || c.slot === "flash"
              ? `cast_${c.slot}`
              : `cast_${c.heroId}_${c.slot}`;
          this.at(h, c.pos, f ? 1 : 0.7, { prio: f ? 3 : 2 });
          break;
        }
        case "fx":
          this.onFx(c, e, i, a, r);
          break;
        case "projectileSpawn": {
          (this.projOwner.size > 600 && this.projOwner.clear(), this.projOwner.set(c.id, c.ownerId));
          const f = c.ownerId === i,
            d = this.unit(c.ownerId);
          if (!f && !(d ? this.seen(d) : this.posSeen(e, c.pos))) break;
          const h = d !== void 0 && d.kind === "hero",
            u = f
              ? 1
              : h
                ? 0.65
                : c.visual === "tower_bolt" || c.visual === "core_bolt"
                  ? 0.7
                  : c.visual === "minion_siege"
                    ? 0.5
                    : 0.38,
            m = c.visual === "xingli_basic" ? this.strum(c.ownerId, e.time) : void 0;
          this.at(RT[c.visual], c.pos, u, {
            pitch: c.visual === "core_bolt" ? 0.8 : 1,
            prio: f ? 2 : void 0,
            v: m,
          });
          break;
        }
        case "projectileHit": {
          const f = c.targetId === i,
            d = this.projOwner.get(c.id) === i,
            h = this.unit(c.targetId);
          if (!f && (h ? !this.seen(h) : !d && !this.posSeen(e, c.pos))) break;
          const u = c.visual === "tower_bolt" || c.visual === "core_bolt",
            m = u && f ? "tower_hit_player" : CT[c.visual],
            x = c.visual === "minion_ranged" || c.visual === "minion_siege" || c.visual === "monster_spit",
            p = h !== void 0 && h.kind === "hero",
            g = f || d ? 1 : x ? (p ? 0.5 : 0.32) : u ? 0.65 : 0.6,
            y = c.visual === "fengling_s1" && p ? 1 : 0;
          this.at(m, c.pos, g, {
            pitch: c.visual === "core_bolt" ? 0.8 : 1,
            prio: f || d ? 2 : void 0,
            v: y,
          });
          break;
        }
        case "projectileEnd": {
          (this.projOwner.delete(c.id),
            (c.visual === "xingli_s1" || c.visual === "fengling_s1" || c.visual === "yeque_s2") &&
              !this.hitProj.has(c.id) &&
              this.posSeen(e, c.pos) &&
              this.at("proj_fizzle", c.pos, 0.7, { v: c.visual === "yeque_s2" ? 1 : 0 }));
          break;
        }
        case "areaSpawn": {
          let f = LT[c.visual];
          if (!f) break;
          let d = 2;
          for (const x of e.areas)
            if (x.id === c.id) {
              d = x.team;
              break;
            }
          const h = c.visual === "telegraph";
          if ((h && d !== 0 && (f = "area_telegraph_enemy"), !h && d !== 0 && !this.posSeen(e, c.pos))) break;
          const u = d === 0 ? 0.9 : 1,
            m = this.at(f, c.pos, u, { dur: c.duration });
          m && c.duration > 0.8 && this.areaVoices.set(c.id, { h: m, key: f, gain: u });
          break;
        }
        case "areaEnd": {
          const f = this.areaVoices.get(c.id);
          f && (f.h.stop(0.25), this.areaVoices.delete(c.id));
          break;
        }
        case "death": {
          if (c.kind === "hero")
            c.unitId === i
              ? (s.play("death_player"), this.recallVoice?.stop(0.1), (this.recallVoice = null))
              : c.team === 0
                ? this.at("death_hero_ally", c.pos, 0.9)
                : (c.killerId === i || this.posSeen(e, c.pos)) &&
                  this.at("death_hero_enemy", c.pos, c.killerId === i ? 1 : 0.8, {
                    prio: c.killerId === i ? 3 : 2,
                  });
          else if (c.kind === "minion") {
            if (c.killerId !== i && !this.posSeen(e, c.pos)) break;
            const f = this.unit(c.unitId),
              d =
                f !== void 0 && f.kind === "minion" && (f.minionType === "siege" || f.minionType === "super");
            this.at(d ? "death_minion_big" : "death_minion", c.pos, c.killerId === i ? 0.9 : 0.45);
          } else if (c.kind === "monster") {
            const f = this.unit(c.unitId);
            (f &&
              f.kind === "monster" &&
              !rn[f.monsterType].epic &&
              this.at("death_monster", c.pos, 0.8, { v: hu[f.monsterType] }),
              this.breathVoice &&
                this.breathVoice.unitId === c.unitId &&
                (this.breathVoice.h.stop(0.15), (this.breathVoice = null)));
          }
          break;
        }
        case "heroKill": {
          if (o) break;
          if (c.killerId === i) s.play("kill_player");
          else if (c.victimId !== i) {
            const f = this.unit(c.victimId),
              d = this.unit(c.killerId),
              h = f ? f.team === 1 : d !== void 0 && d.team === 0;
            s.play(h ? "kill_ally" : "kill_enemy");
          }
          break;
        }
        case "levelUp":
          c.unitId === i && s.play("levelup_player");
          break;
        case "respawn":
          c.unitId === i && s.play("respawn_player");
          break;
        case "gold":
          if (c.unitId !== i) break;
          c.reason === "lasthit" || c.reason === "monster"
            ? s.play("coin", { v: Math.min(1, c.amount / 120) })
            : c.reason === "kill"
              ? s.play("coin_big")
              : (c.reason === "assist" || c.reason === "tower") && s.play("coin_big", { gain: 0.7 });
          break;
        case "itemBought":
          c.unitId === i && s.play("buy", c.auto ? { gain: 0.6 } : void 0);
          break;
        case "monsterSpawn":
          rn[c.monsterType].epic
            ? this.at("epic_roar", c.pos, 1, { v: ag(c.monsterType), floor: 0.3 })
            : this.posSeen(e, c.pos) && this.at("monster_spawn", c.pos, 0.8, { v: hu[c.monsterType] });
          break;
        case "epicSlain":
          this.at("epic_fall", c.pos, 1, { v: ag(c.monsterType), floor: 0.3 });
          break;
        case "announce":
          (l ??= []).push({ key: c.key, team: c.team });
          break;
        case "reject":
          c.unitId === i && s.play("reject");
          break;
        case "gameOver":
          (this.recallVoice?.stop(0.1),
            (this.recallVoice = null),
            this.music?.track === "battle" && this.setMusic(c.winner === 0 ? "victory" : "defeat"));
          break;
      }
    l && this.playAnnounces(l);
  }
  onFx(t, e, s, i, a) {
    const o = `fx_${t.key}`,
      r = t.unitId === s || t.targetId === s;
    switch (t.key) {
      case "level_up":
      case "respawn":
        if (
          t.unitId === s ||
          (t.unitId === void 0 && i && Math.hypot(t.pos.x - i.pos.x, t.pos.y - i.pos.y) < 1)
        )
          return;
        break;
      case "gold_gain":
        if (t.unitId === s || (t.unitId === void 0 && a)) return;
        break;
      case "hit_tower":
        if (t.targetId !== void 0 && this.towerHits.has(t.targetId)) return;
        break;
      case "hit_physical":
      case "hit_magic":
        if (t.unitId === void 0 && t.targetId !== s) return;
        break;
      case "tower_destroyed":
      case "core_destroyed":
        this.at(o, t.pos, 1, { floor: t.key === "core_destroyed" ? 0.6 : 0 });
        return;
      case "drake_breath_warn":
      case "drake_breath":
        this.onBreath(t, e, s, i);
        return;
    }
    if (!r && t.team !== 0) {
      const f = t.unitId !== void 0 ? this.unit(t.unitId) : void 0;
      if (!(f ? this.seen(f) : this.posSeen(e, t.pos))) return;
    }
    if (t.targetId !== void 0 && t.targetId !== s) {
      const f = this.unit(t.targetId);
      if (f && !this.seen(f)) return;
    }
    const l = t.key === "hit_physical" || t.key === "hit_magic" || t.key === "hit_tower",
      c = l ? (r ? 0.8 : 0.45) : r ? 1 : 0.75;
    this.at(o, t.pos, c, { prio: r && !l ? 3 : void 0 });
  }
  onBreath(t, e, s, i) {
    const a = t.unitId !== void 0 ? this.unit(t.unitId) : void 0;
    if (!(a ? this.seen(a) : this.posSeen(e, t.pos))) return;
    const o = t.key === "drake_breath_warn",
      r = t.targetId === s || (i !== void 0 && i.alive && PT(i.pos, i.radius, t));
    this.breathVoice?.h.stop(0.08);
    const l = Math.min(1.6, Math.max(0.3, t.value ?? (o ? 0.9 : 0.8))),
      c = this.at(`fx_${t.key}`, t.pos, r ? 1 : 0.7, { dur: l, prio: r ? 3 : 2 });
    this.breathVoice = c && t.unitId !== void 0 ? { h: c, unitId: t.unitId } : null;
  }
  strum(t, e) {
    const s = this.strums.get(t);
    return !s || e - s.t > 3 || e < s.t ? (this.strums.set(t, { i: 0, t: e }), 0) : (s.i++, (s.t = e), s.i);
  }
  playAnnounces(t) {
    const e = this.mixer;
    if (!e) return;
    t.sort((o, r) => Zy[r.key] - Zy[o.key]);
    const s = e.now();
    let i = Math.max(0, this.annFreeAt - s),
      a = !1;
    for (let o = 0; o < t.length && o < 2 && !(i > 2.4); o++) {
      const r = t[o],
        l = `ann_${r.key}`,
        c = r.team === 1 && IT.has(r.key);
      if (!e.play(l, { v: c ? 1 : 0, when: i })) continue;
      a || (a = this.voice.say(r.key, c, i + 0.12));
      const f = r1[l].len * 0.75;
      (r.key !== "victory" && r.key !== "defeat" && e.duck(0.5, i + f), (i += f), (this.annFreeAt = s + i));
    }
  }
  noteCombat(t) {
    if (!t) return;
    const e =
      t.kind === "hero" ||
      t.kind === "tower" ||
      t.kind === "core" ||
      (t.kind === "monster" && rn[t.monsterType].epic);
    this.heat = Math.max(this.heat, e ? 1 : 0.3);
  }
  update(t, e) {
    const s = this.mixer,
      i = this.music;
    if (!s || !i || !this.live) return;
    s.sweep();
    const a = Math.min(0.25, Math.max(0, e));
    let o = 0,
      r = 0,
      l = !1;
    if (t && !t.over) {
      this.refreshUnits(t);
      const f = this.player(t);
      if (f)
        if (((this.lx = f.pos.x), (this.ly = f.pos.y), f.alive)) {
          let d = 0;
          for (const h of t.heroes)
            h.team !== 1 ||
              !h.alive ||
              !h.visible[0] ||
              (Math.hypot(h.pos.x - f.pos.x, h.pos.y - f.pos.y) < 14 && d++);
          (d > 0 && (o = Math.min(1, 0.55 + 0.15 * d)),
            f.inCombat && (o = Math.max(o, 0.85)),
            t.time - f.lastHitTime < 2.5 && (o = Math.max(o, 0.45)),
            (o = Math.max(o, this.heat)),
            this.tickPlayerBeds(s, f, a));
        } else ((l = !0), (o = 0.1));
      r = Math.max(0, Math.min(0.5, (t.time - 420) / 400));
      for (const d of this.cores) {
        if (!d.alive) continue;
        d.invulnerable || (r = Math.max(r, 0.65));
        const h = d.hp / Math.max(1, d.stats.maxHp);
        h < 0.6 && (r = Math.max(r, 0.65 + ((0.6 - h) / 0.6) * 0.35));
      }
      (++this.frame & 3) === 0 && this.trackAreas(t);
    }
    this.heat *= Math.exp(-a / 3);
    const c = o > this.intensity ? 0.7 : 4;
    ((this.intensity += (o - this.intensity) * (1 - Math.exp(-a / c))),
      (this.tension += (r - this.tension) * (1 - Math.exp(-a / 3))),
      i.setMood(this.ovI ?? this.intensity, this.ovT ?? this.tension),
      l !== this.toneDead && ((this.toneDead = l), s.setMusicTone(l ? 700 : 2e4)),
      i.tick());
  }
  tickPlayerBeds(t, e, s) {
    const i = e.hp / Math.max(1, e.stats.maxHp);
    if (i < 0.25 && e.hp > 0) {
      if (((this.hbTimer -= s), this.hbTimer <= 0)) {
        const r = 1 - i / 0.25;
        (t.play("heartbeat", { gain: 0.6 + 0.4 * r }), (this.hbTimer = 0.95 - 0.25 * r));
      }
    } else this.hbTimer = 0;
    let a = 0,
      o = 0;
    for (const r of e.buffs)
      r.id === "recall" ? (a = r.timeLeft) : r.id === "yeque_shadow" && (o = r.timeLeft);
    (o > this.shadowLeft + 0.2 && t.play("yeque_refresh"),
      (this.shadowLeft = o),
      a > 0.3 && !this.recallVoice
        ? (this.recallVoice = t.play("recall_channel", { dur: Math.max(1, a) }))
        : a <= 0 && this.recallVoice && (this.recallVoice.stop(0.12), (this.recallVoice = null)));
  }
  trackAreas(t) {
    this.areaVoices.size !== 0 &&
      this.areaVoices.forEach((e, s) => {
        let i = !1;
        for (const a of t.areas)
          if (a.id === s) {
            ((i = !0),
              this.locate(a.pos, r1[e.key].range + 4, 0)
                ? e.h.set(e.gain * this.spGain, this.spPan)
                : e.h.set(0, 0));
            break;
          }
        i || (e.h.stop(0.25), this.areaVoices.delete(s));
      });
  }
}

const Qy = ["pointerdown", "touchend", "keydown"];

function uu() {}

function zT() {
  return new DT();
}

const G3 = "180",
  NT = 0,
  Jy = 1,
  FT = 2,
  V3 = 1,
  P1 = 2,
  pr = 3,
  Rr = 0,
  pi = 1,
  fi = 2,
  Sr = 0,
  Kc = 1,
  h5 = 2,
  tv = 3,
  ev = 4,
  Fh = 5,
  b0 = 100,
  UT = 101,
  OT = 102,
  BT = 103,
  HT = 104,
  $T = 200,
  Cr = 201,
  GT = 202,
  VT = 203,
  u5 = 204,
  mo = 205,
  WT = 206,
  jT = 207,
  qT = 208,
  XT = 209,
  YT = 210,
  KT = 211,
  ZT = 212,
  QT = 213,
  JT = 214,
  p5 = 0,
  m5 = 1,
  g5 = 2,
  cf = 3,
  x5 = 4,
  y5 = 5,
  ph = 6,
  v5 = 7,
  nM = 0,
  t7 = 1,
  e7 = 2,
  R0 = 0,
  n7 = 1,
  s7 = 2,
  i7 = 3,
  sM = 4,
  iM = 5,
  a7 = 6,
  o7 = 7,
  aM = 300,
  ff = 301,
  df = 302,
  b5 = 303,
  _5 = 304,
  dm = 306,
  mh = 1e3,
  co = 1001,
  w5 = 1002,
  ti = 1003,
  r7 = 1004,
  pu = 1005,
  Ns = 1006,
  og = 1007,
  Fo = 1008,
  mi = 1009,
  oM = 1010,
  rM = 1011,
  gh = 1012,
  W3 = 1013,
  Fl = 1014,
  fo = 1015,
  Dr = 1016,
  j3 = 1017,
  q3 = 1018,
  xh = 1020,
  lM = 35902,
  cM = 35899,
  fM = 1021,
  dM = 1022,
  Gs = 1023,
  yh = 1026,
  vh = 1027,
  X3 = 1028,
  Y3 = 1029,
  hM = 1030,
  K3 = 1031,
  Z3 = 1033,
  l1 = 33776,
  c1 = 33777,
  f1 = 33778,
  d1 = 33779,
  M5 = 35840,
  k5 = 35841,
  S5 = 35842,
  T5 = 35843,
  E5 = 36196,
  A5 = 37492,
  R5 = 37496,
  C5 = 37808,
  L5 = 37809,
  I5 = 37810,
  P5 = 37811,
  D5 = 37812,
  z5 = 37813,
  N5 = 37814,
  F5 = 37815,
  U5 = 37816,
  O5 = 37817,
  B5 = 37818,
  H5 = 37819,
  $5 = 37820,
  G5 = 37821,
  V5 = 36492,
  W5 = 36494,
  j5 = 36495,
  q5 = 36283,
  X5 = 36284,
  Y5 = 36285,
  K5 = 36286,
  l7 = 3200,
  c7 = 3201,
  f7 = 0,
  d7 = 1,
  Ki = "",
  ri = "srgb",
  Ul = "srgb-linear",
  D1 = "linear",
  jn = "srgb",
  ec = 7680,
  nv = 519,
  h7 = 512,
  u7 = 513,
  p7 = 514,
  uM = 515,
  m7 = 516,
  g7 = 517,
  x7 = 518,
  y7 = 519,
  Z5 = 35044,
  Pi = 35048,
  sv = "300 es",
  Uo = 2e3,
  z1 = 2001;

class Af {
  addEventListener(t, e) {
    this._listeners === void 0 && (this._listeners = {});
    const s = this._listeners;
    (s[t] === void 0 && (s[t] = []), s[t].indexOf(e) === -1 && s[t].push(e));
  }
  hasEventListener(t, e) {
    const s = this._listeners;
    return s === void 0 ? !1 : s[t] !== void 0 && s[t].indexOf(e) !== -1;
  }
  removeEventListener(t, e) {
    const s = this._listeners;
    if (s === void 0) return;
    const i = s[t];
    if (i !== void 0) {
      const a = i.indexOf(e);
      a !== -1 && i.splice(a, 1);
    }
  }
  dispatchEvent(t) {
    const e = this._listeners;
    if (e === void 0) return;
    const s = e[t.type];
    if (s !== void 0) {
      t.target = this;
      const i = s.slice(0);
      for (let a = 0, o = i.length; a < o; a++) i[a].call(this, t);
      t.target = null;
    }
  }
}

const ei = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "0a",
    "0b",
    "0c",
    "0d",
    "0e",
    "0f",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "1a",
    "1b",
    "1c",
    "1d",
    "1e",
    "1f",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "2a",
    "2b",
    "2c",
    "2d",
    "2e",
    "2f",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "3a",
    "3b",
    "3c",
    "3d",
    "3e",
    "3f",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "4a",
    "4b",
    "4c",
    "4d",
    "4e",
    "4f",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "59",
    "5a",
    "5b",
    "5c",
    "5d",
    "5e",
    "5f",
    "60",
    "61",
    "62",
    "63",
    "64",
    "65",
    "66",
    "67",
    "68",
    "69",
    "6a",
    "6b",
    "6c",
    "6d",
    "6e",
    "6f",
    "70",
    "71",
    "72",
    "73",
    "74",
    "75",
    "76",
    "77",
    "78",
    "79",
    "7a",
    "7b",
    "7c",
    "7d",
    "7e",
    "7f",
    "80",
    "81",
    "82",
    "83",
    "84",
    "85",
    "86",
    "87",
    "88",
    "89",
    "8a",
    "8b",
    "8c",
    "8d",
    "8e",
    "8f",
    "90",
    "91",
    "92",
    "93",
    "94",
    "95",
    "96",
    "97",
    "98",
    "99",
    "9a",
    "9b",
    "9c",
    "9d",
    "9e",
    "9f",
    "a0",
    "a1",
    "a2",
    "a3",
    "a4",
    "a5",
    "a6",
    "a7",
    "a8",
    "a9",
    "aa",
    "ab",
    "ac",
    "ad",
    "ae",
    "af",
    "b0",
    "b1",
    "b2",
    "b3",
    "b4",
    "b5",
    "b6",
    "b7",
    "b8",
    "b9",
    "ba",
    "bb",
    "bc",
    "bd",
    "be",
    "bf",
    "c0",
    "c1",
    "c2",
    "c3",
    "c4",
    "c5",
    "c6",
    "c7",
    "c8",
    "c9",
    "ca",
    "cb",
    "cc",
    "cd",
    "ce",
    "cf",
    "d0",
    "d1",
    "d2",
    "d3",
    "d4",
    "d5",
    "d6",
    "d7",
    "d8",
    "d9",
    "da",
    "db",
    "dc",
    "dd",
    "de",
    "df",
    "e0",
    "e1",
    "e2",
    "e3",
    "e4",
    "e5",
    "e6",
    "e7",
    "e8",
    "e9",
    "ea",
    "eb",
    "ec",
    "ed",
    "ee",
    "ef",
    "f0",
    "f1",
    "f2",
    "f3",
    "f4",
    "f5",
    "f6",
    "f7",
    "f8",
    "f9",
    "fa",
    "fb",
    "fc",
    "fd",
    "fe",
    "ff",
  ],
  rg = Math.PI / 180,
  Q5 = 180 / Math.PI;

function C0() {
  const n = (Math.random() * 4294967295) | 0,
    t = (Math.random() * 4294967295) | 0,
    e = (Math.random() * 4294967295) | 0,
    s = (Math.random() * 4294967295) | 0;
  return (
    ei[n & 255] +
    ei[(n >> 8) & 255] +
    ei[(n >> 16) & 255] +
    ei[(n >> 24) & 255] +
    "-" +
    ei[t & 255] +
    ei[(t >> 8) & 255] +
    "-" +
    ei[((t >> 16) & 15) | 64] +
    ei[(t >> 24) & 255] +
    "-" +
    ei[(e & 63) | 128] +
    ei[(e >> 8) & 255] +
    "-" +
    ei[(e >> 16) & 255] +
    ei[(e >> 24) & 255] +
    ei[s & 255] +
    ei[(s >> 8) & 255] +
    ei[(s >> 16) & 255] +
    ei[(s >> 24) & 255]
  ).toLowerCase();
}

function vn(n, t, e) {
  return Math.max(t, Math.min(e, n));
}

function v7(n, t) {
  return ((n % t) + t) % t;
}

function lg(n, t, e) {
  return (1 - e) * n + e * t;
}

function zo(n, t) {
  switch (t.constructor) {
    case Float32Array:
      return n;
    case Uint32Array:
      return n / 4294967295;
    case Uint16Array:
      return n / 65535;
    case Uint8Array:
      return n / 255;
    case Int32Array:
      return Math.max(n / 2147483647, -1);
    case Int16Array:
      return Math.max(n / 32767, -1);
    case Int8Array:
      return Math.max(n / 127, -1);
    default:
      throw new Error("Invalid component type.");
  }
}

function qn(n, t) {
  switch (t.constructor) {
    case Float32Array:
      return n;
    case Uint32Array:
      return Math.round(n * 4294967295);
    case Uint16Array:
      return Math.round(n * 65535);
    case Uint8Array:
      return Math.round(n * 255);
    case Int32Array:
      return Math.round(n * 2147483647);
    case Int16Array:
      return Math.round(n * 32767);
    case Int8Array:
      return Math.round(n * 127);
    default:
      throw new Error("Invalid component type.");
  }
}

class Ee {
  constructor(t = 0, e = 0) {
    ((Ee.prototype.isVector2 = !0), (this.x = t), (this.y = e));
  }
  get width() {
    return this.x;
  }
  set width(t) {
    this.x = t;
  }
  get height() {
    return this.y;
  }
  set height(t) {
    this.y = t;
  }
  set(t, e) {
    return ((this.x = t), (this.y = e), this);
  }
  setScalar(t) {
    return ((this.x = t), (this.y = t), this);
  }
  setX(t) {
    return ((this.x = t), this);
  }
  setY(t) {
    return ((this.y = t), this);
  }
  setComponent(t, e) {
    switch (t) {
      case 0:
        this.x = e;
        break;
      case 1:
        this.y = e;
        break;
      default:
        throw new Error("index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(t) {
    return ((this.x = t.x), (this.y = t.y), this);
  }
  add(t) {
    return ((this.x += t.x), (this.y += t.y), this);
  }
  addScalar(t) {
    return ((this.x += t), (this.y += t), this);
  }
  addVectors(t, e) {
    return ((this.x = t.x + e.x), (this.y = t.y + e.y), this);
  }
  addScaledVector(t, e) {
    return ((this.x += t.x * e), (this.y += t.y * e), this);
  }
  sub(t) {
    return ((this.x -= t.x), (this.y -= t.y), this);
  }
  subScalar(t) {
    return ((this.x -= t), (this.y -= t), this);
  }
  subVectors(t, e) {
    return ((this.x = t.x - e.x), (this.y = t.y - e.y), this);
  }
  multiply(t) {
    return ((this.x *= t.x), (this.y *= t.y), this);
  }
  multiplyScalar(t) {
    return ((this.x *= t), (this.y *= t), this);
  }
  divide(t) {
    return ((this.x /= t.x), (this.y /= t.y), this);
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  applyMatrix3(t) {
    const e = this.x,
      s = this.y,
      i = t.elements;
    return ((this.x = i[0] * e + i[3] * s + i[6]), (this.y = i[1] * e + i[4] * s + i[7]), this);
  }
  min(t) {
    return ((this.x = Math.min(this.x, t.x)), (this.y = Math.min(this.y, t.y)), this);
  }
  max(t) {
    return ((this.x = Math.max(this.x, t.x)), (this.y = Math.max(this.y, t.y)), this);
  }
  clamp(t, e) {
    return ((this.x = vn(this.x, t.x, e.x)), (this.y = vn(this.y, t.y, e.y)), this);
  }
  clampScalar(t, e) {
    return ((this.x = vn(this.x, t, e)), (this.y = vn(this.y, t, e)), this);
  }
  clampLength(t, e) {
    const s = this.length();
    return this.divideScalar(s || 1).multiplyScalar(vn(s, t, e));
  }
  floor() {
    return ((this.x = Math.floor(this.x)), (this.y = Math.floor(this.y)), this);
  }
  ceil() {
    return ((this.x = Math.ceil(this.x)), (this.y = Math.ceil(this.y)), this);
  }
  round() {
    return ((this.x = Math.round(this.x)), (this.y = Math.round(this.y)), this);
  }
  roundToZero() {
    return ((this.x = Math.trunc(this.x)), (this.y = Math.trunc(this.y)), this);
  }
  negate() {
    return ((this.x = -this.x), (this.y = -this.y), this);
  }
  dot(t) {
    return this.x * t.x + this.y * t.y;
  }
  cross(t) {
    return this.x * t.y - this.y * t.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  angleTo(t) {
    const e = Math.sqrt(this.lengthSq() * t.lengthSq());
    if (e === 0) return Math.PI / 2;
    const s = this.dot(t) / e;
    return Math.acos(vn(s, -1, 1));
  }
  distanceTo(t) {
    return Math.sqrt(this.distanceToSquared(t));
  }
  distanceToSquared(t) {
    const e = this.x - t.x,
      s = this.y - t.y;
    return e * e + s * s;
  }
  manhattanDistanceTo(t) {
    return Math.abs(this.x - t.x) + Math.abs(this.y - t.y);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, e) {
    return ((this.x += (t.x - this.x) * e), (this.y += (t.y - this.y) * e), this);
  }
  lerpVectors(t, e, s) {
    return ((this.x = t.x + (e.x - t.x) * s), (this.y = t.y + (e.y - t.y) * s), this);
  }
  equals(t) {
    return t.x === this.x && t.y === this.y;
  }
  fromArray(t, e = 0) {
    return ((this.x = t[e]), (this.y = t[e + 1]), this);
  }
  toArray(t = [], e = 0) {
    return ((t[e] = this.x), (t[e + 1] = this.y), t);
  }
  fromBufferAttribute(t, e) {
    return ((this.x = t.getX(e)), (this.y = t.getY(e)), this);
  }
  rotateAround(t, e) {
    const s = Math.cos(e),
      i = Math.sin(e),
      a = this.x - t.x,
      o = this.y - t.y;
    return ((this.x = a * s - o * i + t.x), (this.y = a * i + o * s + t.y), this);
  }
  random() {
    return ((this.x = Math.random()), (this.y = Math.random()), this);
  }
  *[Symbol.iterator]() {
    (yield this.x, yield this.y);
  }
}
export { zT, G3, NT, Jy, FT, V3, P1, pr, Rr, pi, fi, Sr, Kc, h5, tv, ev, Fh, b0, UT, OT, BT, HT, $T, Cr, GT, VT, u5, mo, WT, jT, qT, XT, YT, KT, ZT, QT, JT, p5, m5, g5, cf, x5, y5, ph, v5, nM, t7, e7, R0, n7, s7, i7, sM, iM, a7, o7, aM, ff, df, b5, _5, dm, mh, co, w5, ti, r7, pu, Ns, og, Fo, mi, oM, rM, gh, W3, Fl, fo, Dr, j3, q3, xh, lM, cM, fM, dM, Gs, yh, vh, X3, Y3, hM, K3, Z3, l1, c1, f1, d1, M5, k5, S5, T5, E5, A5, R5, C5, L5, I5, P5, D5, z5, N5, F5, U5, O5, B5, H5, $5, G5, V5, W5, j5, q5, X5, Y5, K5, l7, c7, f7, d7, Ki, ri, Ul, D1, jn, ec, nv, h7, u7, p7, uM, m7, g7, x7, y7, Z5, Pi, sv, Uo, z1, Af, rg, Q5, C0, vn, v7, lg, zo, qn, Ee };
