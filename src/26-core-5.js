// 26-core-5.js — core｜24 个顶层语句｜64KB
// 对应 game.pretty.js 第 51325–53466 行
// 关键内容：
//   Ls                    position
//   Js                    flat
//   SU                    gripR
//   AU                    leap
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { Ee } from './04-audio-2.js';
import { Ke } from './06-three-2.js';
import { Ae, Bn, On, hm, um } from './07-three-3.js';
import { heroMesh, heroMap, heroRig, heroAnim } from './45-mushroom-mesh.js';
import { heroMesh as nwMesh, heroMap as nwMap, heroRig as nwRig, heroAnim as nwAnim } from './45-niuwei-mesh.js';
import { heroMesh as nmMesh, heroMap as nmMap, heroRig as nmRig, heroAnim as nmAnim } from './45-niumo-mesh.js';
import { heroMesh as nm2Mesh, heroMap as nm2Map, heroRig as nm2Rig, heroAnim as nm2Anim } from './45-niumo2-mesh.js';
import { nx } from './08-three-4.js';
import { Am, Em, En, Fi, Gh, K, Lh, Mf, P0, Qn, S0, Tm, Un, Vh, Wh, Xi, Yo, bt, cw, ge, he, ho, jh, jl, lw, nf, pt, sf, ta, vp, wU, zs } from './25-render-9.js';

class Ls {
  pos = [];
  nor = [];
  uv = [];
  uvX = 0;
  uvY = 0;
  skinTriple = null;
  mapOn = 0;
  col = [];
  fx = [];
  skin = [];
  line = [];
  mat = [];
  idx = [];
  crease = 40;
  rough = 0;
  c = [1, 1, 1];
  c2 = null;
  gloss = 0;
  glow = 0;
  glow2 = -1;
  team = 0;
  ao = 1;
  ao2 = -1;
  lineW = 1;
  matX = 0;
  matY = 0;
  matZ = 0;
  matW = 0;
  by = null;
  grain = 0;
  boneId = 0;
  soft = null;
  m = new Ke();
  stack = [];
  prims = [];
  get vertexCount() {
    return this.pos.length / 3;
  }
  get triangleCount() {
    return this.idx.length / 3;
  }
  paint(t, e = {}) {
    ((this.c = Lh(t)),
      (this.c2 = e.c2 !== void 0 ? Lh(e.c2) : null),
      (this.gloss = e.gloss ?? 0),
      (this.glow = e.glow ?? 0),
      (this.glow2 = e.glow2 ?? -1),
      (this.team = e.team ?? 0),
      (this.ao = e.ao ?? 1),
      (this.ao2 = e.ao2 ?? -1),
      (this.lineW = e.line ?? (this.glow > 0.5 ? 0 : 1)));
    const s =
        e.mat ??
        (this.gloss >= 0.75
          ? this.glow > 0.05
            ? K.crystal
            : K.metal
          : this.gloss >= 0.3
            ? K.leather
            : K.cloth),
      i = e.pattern ?? 0;
    return (
      (this.matX = i / 8),
      (this.matY = i > 0 ? Xi((e.patternScale ?? 4) / 32) : 0),
      (this.matZ = i > 0 ? Xi(e.patternAmt ?? 0.5) : 0),
      (this.matW = s / 8),
      (this.by = e.by ?? null),
      (this.grain = e.grain ?? 0),
      this
    );
  }
  bone(t) {
    return ((this.boneId = t), (this.soft = null), this);
  }
  bind(t) {
    return ((this.soft = t), this);
  }
  g(t, e) {
    return (this.stack.push(this.m.clone()), this.m.multiply(t), e(), this.m.copy(this.stack.pop()), this);
  }
  sym(t) {
    return (t(1), this.g(new Ke().makeScale(-1, 1, 1), () => t(-1)), this);
  }
  emit(t, e, s = null, i = this.crease) {
    const a = t.length / 3,
      o = this.idx.length,
      r = this.m.elements,
      l = this.m.determinant() < 0,
      c = new Float32Array(t.length);
    for (let M = 0; M < a; M++) {
      const S = t[M * 3],
        b = t[M * 3 + 1],
        w = t[M * 3 + 2];
      if (
        ((c[M * 3] = r[0] * S + r[4] * b + r[8] * w + r[12]),
        (c[M * 3 + 1] = r[1] * S + r[5] * b + r[9] * w + r[13]),
        (c[M * 3 + 2] = r[2] * S + r[6] * b + r[10] * w + r[14]),
        this.rough > 0)
      ) {
        const T = Math.round(c[M * 3] * 400),
          E = Math.round(c[M * 3 + 1] * 400),
          A = Math.round(c[M * 3 + 2] * 400);
        ((c[M * 3] += (vp(T, E, A, 1) - 0.5) * 2 * this.rough),
          (c[M * 3 + 1] += (vp(T, E, A, 2) - 0.5) * 2 * this.rough),
          (c[M * 3 + 2] += (vp(T, E, A, 3) - 0.5) * 2 * this.rough));
      }
    }
    const f = e.length / 3,
      d = new Int32Array(e.length),
      h = new Float32Array(e.length),
      u = new Float32Array(e.length),
      m = new Uint8Array(f);
    for (let M = 0; M < f; M++) {
      const S = e[M * 3],
        b = l ? e[M * 3 + 2] : e[M * 3 + 1],
        w = l ? e[M * 3 + 1] : e[M * 3 + 2];
      ((d[M * 3] = S), (d[M * 3 + 1] = b), (d[M * 3 + 2] = w));
      const T = c[b * 3] - c[S * 3],
        E = c[b * 3 + 1] - c[S * 3 + 1],
        A = c[b * 3 + 2] - c[S * 3 + 2],
        C = c[w * 3] - c[S * 3],
        R = c[w * 3 + 1] - c[S * 3 + 1],
        I = c[w * 3 + 2] - c[S * 3 + 2],
        P = E * I - A * R,
        F = A * C - T * I,
        L = T * R - E * C,
        B = Math.hypot(P, F, L);
      B < 1e-10 ||
        ((m[M] = 1),
        (h[M * 3] = P),
        (h[M * 3 + 1] = F),
        (h[M * 3 + 2] = L),
        (u[M * 3] = P / B),
        (u[M * 3 + 1] = F / B),
        (u[M * 3 + 2] = L / B));
    }
    const x = new Int32Array(a + 1);
    for (let M = 0; M < f; M++) if (m[M]) for (let S = 0; S < 3; S++) x[d[M * 3 + S] + 1]++;
    for (let M = 0; M < a; M++) x[M + 1] += x[M];
    const p = x.slice(0, a),
      g = new Int32Array(x[a]);
    for (let M = 0; M < f; M++) if (m[M]) for (let S = 0; S < 3; S++) g[p[d[M * 3 + S]]++] = M;
    const y = i >= 180 ? -2 : Math.cos(i * sf),
      v = new Array(a);
    let k = this.pos.length / 3;
    for (let M = 0; M < f; M++) {
      if (!m[M]) continue;
      const S = u[M * 3],
        b = u[M * 3 + 1],
        w = u[M * 3 + 2];
      for (let T = 0; T < 3; T++) {
        const E = d[M * 3 + T];
        let A = 0,
          C = 0,
          R = 0;
        for (let L = x[E]; L < x[E + 1]; L++) {
          const B = g[L];
          (B === M || S * u[B * 3] + b * u[B * 3 + 1] + w * u[B * 3 + 2] >= y) &&
            ((A += h[B * 3]), (C += h[B * 3 + 1]), (R += h[B * 3 + 2]));
        }
        const I = Math.hypot(A, C, R) || 1;
        ((A /= I), (C /= I), (R /= I));
        let P = v[E];
        P || (P = v[E] = []);
        let F = -1;
        for (let L = 0; L < P.length; L += 4)
          if (P[L] * A + P[L + 1] * C + P[L + 2] * R > 0.9995) {
            F = P[L + 3];
            break;
          }
        (F < 0 &&
          ((F = k++),
          P.push(A, C, R, F),
          this.writeVertex(c[E * 3], c[E * 3 + 1], c[E * 3 + 2], A, C, R, s ? s[E] : 0)),
          this.idx.push(F));
      }
    }
    if (this.idx.length > o) {
      let M = 1 / 0,
        S = 1 / 0,
        b = 1 / 0,
        w = -1 / 0,
        T = -1 / 0,
        E = -1 / 0;
      for (let A = 0; A < a; A++)
        ((M = Math.min(M, c[A * 3])),
          (w = Math.max(w, c[A * 3])),
          (S = Math.min(S, c[A * 3 + 1])),
          (T = Math.max(T, c[A * 3 + 1])),
          (b = Math.min(b, c[A * 3 + 2])),
          (E = Math.max(E, c[A * 3 + 2])));
      this.prims.push({
        start: o,
        count: this.idx.length - o,
        size: Math.max(w - M, T - S, E - b),
        outlined: this.lineW > 0,
      });
    }
  }
  writeVertex(t, e, s, i, a, o, r) {
    (this.pos.push(t, e, s), this.nor.push(i, a, o));
    const l = this.c,
      c = this.c2,
      f = this.by ? Xi(this.by(t, e, s, r, i, a, o)) : r;
    let d = 1;
    if (
      (this.grain > 0 &&
        (d =
          1 + (vp(Math.round(t * 400), Math.round(e * 400), Math.round(s * 400), 7) - 0.5) * 2 * this.grain),
      c
        ? this.col.push(
            (l[0] + (c[0] - l[0]) * f) * d,
            (l[1] + (c[1] - l[1]) * f) * d,
            (l[2] + (c[2] - l[2]) * f) * d,
          )
        : this.col.push(l[0] * d, l[1] * d, l[2] * d),
      this.fx.push(
        this.gloss,
        this.glow2 >= 0 ? bt(this.glow, this.glow2, f) : this.glow,
        this.team,
        this.ao2 >= 0 ? bt(this.ao, this.ao2, f) : this.ao,
      ),
      this.line.push(this.lineW),
      this.uv.push(this.uvX, this.uvY),
      this.mat.push(this.matX, this.matY, this.matZ, this.matW),
      this.soft)
    ) {
      const h = this.soft(t, e, s, f);
      this.skin.push(h[0], h[1], h[2]);
    } else if (this.skinTriple) this.skin.push(this.skinTriple[0], this.skinTriple[1], this.skinTriple[2]);
    else this.skin.push(this.boneId, this.boneId, 1);
  }
  skinRings(t, e, s, i, a, o, r, l, c = 0, f = 1) {
    const d = [],
      h = r ? s : s - 1;
    for (let u = 0; u < h; u++) {
      const m = u * i,
        x = ((u + 1) % s) * i;
      for (let p = 0; p < i; p++) {
        const g = (p + 1) % i;
        d.push(m + p, x + p, m + g, m + g, x + p, x + g);
      }
    }
    if (!r) {
      if (a) {
        const u = t.length / 3;
        let m = 0,
          x = 0,
          p = 0;
        for (let g = 0; g < i; g++) ((m += t[g * 3]), (x += t[g * 3 + 1]), (p += t[g * 3 + 2]));
        (t.push(m / i, x / i, p / i), e.push(c));
        for (let g = 0; g < i; g++) d.push(u, g, (g + 1) % i);
      }
      if (o) {
        const u = (s - 1) * i,
          m = t.length / 3;
        let x = 0,
          p = 0,
          g = 0;
        for (let y = 0; y < i; y++)
          ((x += t[(u + y) * 3]), (p += t[(u + y) * 3 + 1]), (g += t[(u + y) * 3 + 2]));
        (t.push(x / i, p / i, g / i), e.push(f));
        for (let y = 0; y < i; y++) d.push(m, u + ((y + 1) % i), u + y);
      }
    }
    this.emit(t, d, e, l);
  }
  lathe(t, e = {}) {
    const s = e.seg ?? 10,
      i = e.power ?? 2,
      a = (e.phase ?? 0) * sf,
      o = [],
      r = [],
      l = t.length;
    for (let c = 0; c < l; c++) {
      const f = t[c],
        d = f[1],
        h = f[2] ?? d,
        u = f[3] ?? 0,
        m = f[4] ?? 0;
      for (let x = 0; x < s; x++) {
        const p = a + (x / s) * Math.PI * 2,
          g = e.shape ? e.shape(p, c) : 1;
        (o.push(u + lw(p, i) * d * g, f[0], m + cw(p, i) * h * g), r.push(c / (l - 1)));
      }
    }
    return (this.skinRings(o, r, l, s, e.cap0 ?? !0, e.cap1 ?? !0, !1, e.crease), this);
  }
  tube(t, e = {}) {
    const s = e.seg ?? 8,
      i = e.power ?? 2,
      a = (e.phase ?? 0) * sf,
      o = e.closed ?? !1,
      r = t.length,
      l = [],
      c = [],
      f = e.up ?? [1, 0, 0];
    let d = 0,
      h = 0,
      u = 0;
    for (let m = 0; m < r; m++) {
      const x = t[m],
        p = t[o ? (m + r - 1) % r : Math.max(0, m - 1)],
        g = t[o ? (m + 1) % r : Math.min(r - 1, m + 1)];
      let y = g[0] - p[0],
        v = g[1] - p[1],
        _ = g[2] - p[2];
      const k = Math.hypot(y, v, _) || 1;
      ((y /= k), (v /= k), (_ /= k));
      let M = f[0] * y + f[1] * v + f[2] * _,
        S = f[0] - y * M,
        b = f[1] - v * M,
        w = f[2] - _ * M,
        T = Math.hypot(S, b, w);
      (T < 0.15 &&
        (m > 0
          ? ((M = d * y + h * v + u * _), (S = d - y * M), (b = h - v * M), (w = u - _ * M))
          : ((S = -_ * y), (b = -_ * v), (w = 1 - _ * _)),
        (T = Math.hypot(S, b, w) || 1)),
        (S /= T),
        (b /= T),
        (w /= T),
        (d = S),
        (h = b),
        (u = w));
      const E = b * _ - w * v,
        A = w * y - S * _,
        C = S * v - b * y,
        R = x[3],
        I = x[4] ?? R;
      for (let P = 0; P < s; P++) {
        const F = a + (P / s) * Math.PI * 2,
          L = e.shape ? e.shape(F, m) : 1,
          B = lw(F, i) * R * L,
          G = cw(F, i) * I * L;
        (l.push(x[0] + S * B + E * G, x[1] + b * B + A * G, x[2] + w * B + C * G),
          c.push(o ? m / r : m / (r - 1)));
      }
    }
    return (this.skinRings(l, c, r, s, e.cap0 ?? !0, e.cap1 ?? !0, o, e.crease), this);
  }
  ball(t, e, s, i, a = i, o = i, r = 1, l) {
    const c = wU(r),
      f = [],
      d = [];
    for (let h = 0; h < c.v.length; h += 3)
      (f.push(t + c.v[h] * i, e + c.v[h + 1] * a, s + c.v[h + 2] * o), d.push(c.v[h + 1] * 0.5 + 0.5));
    return (this.emit(f, c.t, d, l ?? 180), this);
  }
  box(t, e, s, i, a, o, r = 0, l) {
    const c = i / 2,
      f = a / 2,
      d = o / 2,
      h = Math.min(r, c * 0.98, f * 0.98, d * 0.98),
      u = [],
      m = [],
      x = [],
      p = [c, f, d],
      g = (_, k, M, S) => _ * 8 + (k > 0 ? 4 : 0) + (M > 0 ? 2 : 0) + (S > 0 ? 1 : 0);
    for (let _ = 0; _ < 3; _++) {
      const k = (_ + 1) % 3,
        M = (_ + 2) % 3;
      for (const S of [-1, 1])
        for (const b of [-1, 1])
          for (const w of [-1, 1]) {
            const T = [0, 0, 0];
            ((T[_] = S * p[_]),
              (T[k] = b * (p[k] - h)),
              (T[M] = w * (p[M] - h)),
              u.push(t + T[0], e + T[1], s + T[2]),
              m.push(f > 0 ? T[1] / (2 * f) + 0.5 : 0));
          }
    }
    const y = [t, e, s],
      v = (_) => {
        let k = 0,
          M = 0,
          S = 0;
        for (const B of _) ((k += u[B * 3] - y[0]), (M += u[B * 3 + 1] - y[1]), (S += u[B * 3 + 2] - y[2]));
        const b = _[0],
          w = _[1],
          T = _[2],
          E = u[w * 3] - u[b * 3],
          A = u[w * 3 + 1] - u[b * 3 + 1],
          C = u[w * 3 + 2] - u[b * 3 + 2],
          R = u[T * 3] - u[b * 3],
          I = u[T * 3 + 1] - u[b * 3 + 1],
          P = u[T * 3 + 2] - u[b * 3 + 2],
          L = (A * P - C * I) * k + (C * R - E * P) * M + (E * I - A * R) * S >= 0 ? _ : [..._].reverse();
        for (let B = 1; B < L.length - 1; B++) x.push(L[0], L[B], L[B + 1]);
      };
    for (let _ = 0; _ < 3; _++)
      for (const k of [-1, 1]) v([g(_, k, -1, -1), g(_, k, 1, -1), g(_, k, 1, 1), g(_, k, -1, 1)]);
    if (h > 0) {
      for (let _ = 0; _ < 3; _++) {
        const k = (_ + 1) % 3,
          M = (_ + 2) % 3;
        for (const S of [-1, 1])
          for (const b of [-1, 1]) v([g(k, S, b, -1), g(k, S, b, 1), g(M, b, 1, S), g(M, b, -1, S)]);
      }
      for (const _ of [-1, 1])
        for (const k of [-1, 1]) for (const M of [-1, 1]) v([g(0, _, k, M), g(1, k, M, _), g(2, M, _, k)]);
    }
    return (this.emit(u, x, m, l), this);
  }
  crystal(t, e, s = 6, i = 0.35, a = 0.18, o = 0.85) {
    return this.lathe(
      [
        [0, 0.001],
        [e * a, t],
        [e * (1 - i), t * o],
        [e, 0.001],
      ],
      { seg: s, cap0: !1, cap1: !1, crease: 0 },
    );
  }
  extrude(t, e, s = 0, i) {
    let a = t,
      o = 0;
    for (let k = 0, M = a.length - 1; k < a.length; M = k++) o += a[M][0] * a[k][1] - a[k][0] * a[M][1];
    o < 0 && (a = [...a].reverse());
    const r = a.length;
    let l = 1 / 0,
      c = -1 / 0;
    for (const k of a) ((l = Math.min(l, k[1])), (c = Math.max(c, k[1])));
    const f = (k) => (c > l ? (k - l) / (c - l) : 0),
      d = [];
    for (let k = 0; k < r; k++) {
      const M = a[(k + r - 1) % r],
        S = a[k],
        b = a[(k + 1) % r];
      let w = S[0] - M[0],
        T = S[1] - M[1],
        E = b[0] - S[0],
        A = b[1] - S[1];
      const C = Math.hypot(w, T) || 1,
        R = Math.hypot(E, A) || 1;
      ((w /= C), (T /= C), (E /= R), (A /= R));
      let I = -T - A,
        P = w + E;
      const F = Math.hypot(I, P) || 1;
      ((I /= F), (P /= F));
      const L = Math.max(0.4, I * -T + P * w);
      d.push([S[0] + (I * s) / L, S[1] + (P * s) / L]);
    }
    const h = [],
      u = [],
      m = [],
      x = e / 2,
      p = Math.min(s, x * 0.95),
      g =
        s > 0
          ? [
              [d, -x],
              [a, -x + p],
              [a, x - p],
              [d, x],
            ]
          : [
              [a, -x],
              [a, x],
            ];
    for (const [k, M] of g) for (const S of k) (h.push(S[0], S[1], M), u.push(f(S[1])));
    for (let k = 0; k < g.length - 1; k++)
      for (let M = 0; M < r; M++) {
        const S = (M + 1) % r,
          b = k * r + M,
          w = k * r + S,
          T = (k + 1) * r + S,
          E = (k + 1) * r + M;
        m.push(b, w, T, b, T, E);
      }
    const y = g[g.length - 1][0],
      v = nx.triangulateShape(
        y.map((k) => new Ee(k[0], k[1])),
        [],
      ),
      _ = (g.length - 1) * r;
    for (const k of v) {
      const M = y[k[0]],
        S = y[k[1]],
        b = y[k[2]],
        w = (S[0] - M[0]) * (b[1] - M[1]) - (S[1] - M[1]) * (b[0] - M[0]) > 0,
        T = w ? k[1] : k[2],
        E = w ? k[2] : k[1];
      (m.push(_ + k[0], _ + T, _ + E), m.push(k[0], E, T));
    }
    return (this.emit(h, m, u, i), this);
  }
  sheet(t, e, s, i = !0, a) {
    const o = [],
      r = [];
    for (let d = 0; d <= e; d++)
      for (let h = 0; h <= t; h++) {
        const u = s(h / t, d / e);
        (o.push(u[0], u[1], u[2]), r.push(d / e));
      }
    const l = [],
      c = [],
      f = t + 1;
    for (let d = 0; d < e; d++)
      for (let h = 0; h < t; h++) {
        const u = d * f + h,
          m = u + 1,
          x = u + f,
          p = x + 1;
        (l.push(u, m, p, u, p, x), c.push(u, p, m, u, x, p));
      }
    return (this.emit(o, l, r, a ?? 180), i && this.emit(o, c, r, a ?? 180), this);
  }
  torus(t, e, s = e, i = 20, a = 6, o = {}) {
    const r = [];
    for (let l = 0; l < i; l++) {
      const c = (l / i) * Math.PI * 2;
      r.push([Math.cos(c) * t, o.y ?? 0, Math.sin(c) * t, s, e]);
    }
    return this.tube(r, {
      seg: a,
      closed: !0,
      up: [0, 1, 0],
      power: o.power,
      phase: o.phase,
      crease: o.crease,
    });
  }
  limb(t, e, s, i, a = {}) {
    const o = a.bulge ?? 0,
      r = [],
      l = o !== 0 ? 4 : 1,
      c = a.flat ?? 1;
    for (let f = 0; f <= l; f++) {
      const d = f / l,
        h = bt(s, i, d) * (1 + o * Math.sin(Math.PI * d));
      r.push([bt(t[0], e[0], d), bt(t[1], e[1], d), bt(t[2], e[2], d), h, h * c]);
    }
    return this.tube(r, a);
  }
  bakeGrounding(t, e = 0.7, s = 0.86) {
    const i = this.pos.length / 3;
    for (let a = 0; a < i; a++) {
      if (this.fx[a * 4 + 1] > 0.05) continue;
      const o = this.nor[a * 3 + 1],
        r = this.pos[a * 3 + 1],
        l = bt(e, 1, Qn(-0.95, 0.25, o));
      this.fx[a * 4 + 3] *= l;
      const c = bt(s, 1, Xi(r / (t * 0.45))) * bt(0.9, 1, Qn(-0.9, 0.1, o));
      ((this.col[a * 3] *= c), (this.col[a * 3 + 1] *= c), (this.col[a * 3 + 2] *= c));
    }
  }
  // 外部网格（glTF/GLB）直灌：位置/法线/UV 原样进缓冲，顶点色留白让贴图决定颜色
  rawMesh(m, o = {}) {
    const base = this.pos.length / 3,
      n = m.pos.length / 3,
      start = this.idx.length,
      keep = [this.c, this.c2, this.by, this.gloss, this.glow, this.ao, this.ao2, this.lineW, this.matX, this.matY, this.matZ, this.matW];
    ((this.c = o.color ?? [1, 1, 1]),
      (this.c2 = null),
      (this.by = null),
      (this.gloss = o.gloss ?? 0.32),
      (this.glow = 0),
      (this.ao = o.ao ?? 1),
      (this.ao2 = -1),
      (this.lineW = o.line ?? 1),
      (this.matX = (o.mat ?? K.cloth) / 8),
      (this.matY = 0),
      (this.matZ = 0),
      (this.matW = 0));
    for (let i = 0; i < n; i++) {
      ((this.uvX = m.uv[i * 2]), (this.uvY = m.uv[i * 2 + 1]));
      // 外部网格自带 2 骨骼权重；没有的话退回单骨骼
      this.skinTriple = m.skin ? [m.skin[i * 3], m.skin[i * 3 + 1], m.skin[i * 3 + 2]] : null;
      this.writeVertex(
        m.pos[i * 3], m.pos[i * 3 + 1], m.pos[i * 3 + 2],
        m.nor[i * 3], m.nor[i * 3 + 1], m.nor[i * 3 + 2], 1,
      );
    }
    this.skinTriple = null;
    for (let i = 0; i < m.idx.length; i++) this.idx.push(m.idx[i] + base);
    (this.prims.push({ start, count: this.idx.length - start, size: o.size ?? 2.2, outlined: this.lineW > 0 }),
      ([this.c, this.c2, this.by, this.gloss, this.glow, this.ao, this.ao2, this.lineW, this.matX, this.matY, this.matZ, this.matW] = keep));
    return this;
  }
  build() {
    const t = new Bn();
    (t.setAttribute("position", new Ae(this.pos, 3)),
      t.setAttribute("normal", new Ae(this.nor, 3)),
      t.setAttribute("color", new Ae(this.col, 3)),
      this.uv.length === this.pos.length / 3 * 2 &&
        t.setAttribute("uv", new Ae(this.uv, 2)));
    const e = new Uint8Array(this.fx.length);
    for (let h = 0; h < e.length; h++) e[h] = Math.round(Xi(this.fx[h]) * 255);
    (t.setAttribute("aFx", new On(e, 4, !0)), t.setAttribute("aSkin", new Ae(this.skin, 3)));
    const s = new Uint8Array(this.mat.length);
    for (let h = 0; h < s.length; h++) s[h] = Math.round(Xi(this.mat[h]) * 255);
    t.setAttribute("aMat", new On(s, 4, !0));
    const i = this.pos.length / 3,
      a = new Map(),
      o = new Array(i);
    for (let h = 0; h < i; h++) {
      const u = `${Math.round(this.pos[h * 3] * 1500)},${Math.round(this.pos[h * 3 + 1] * 1500)},${Math.round(this.pos[h * 3 + 2] * 1500)}`;
      o[h] = u;
      let m = a.get(u);
      (m || ((m = [0, 0, 0]), a.set(u, m)),
        (m[0] += this.nor[h * 3]),
        (m[1] += this.nor[h * 3 + 1]),
        (m[2] += this.nor[h * 3 + 2]));
    }
    const r = new Int8Array(i * 4);
    for (let h = 0; h < i; h++) {
      const u = a.get(o[h]),
        m = Math.hypot(u[0], u[1], u[2]),
        x = m > 0.2 ? u[0] / m : this.nor[h * 3],
        p = m > 0.2 ? u[1] / m : this.nor[h * 3 + 1],
        g = m > 0.2 ? u[2] / m : this.nor[h * 3 + 2];
      ((r[h * 4] = Math.round(x * 127)),
        (r[h * 4 + 1] = Math.round(p * 127)),
        (r[h * 4 + 2] = Math.round(g * 127)),
        (r[h * 4 + 3] = Math.round(Xi(this.line[h]) * 127)));
    }
    t.setAttribute("aOutline", new On(r, 4, !0));
    const l = this.prims
        .map((h, u) => ({ p: h, i: u }))
        .sort((h, u) =>
          h.p.outlined === u.p.outlined ? u.p.size - h.p.size || h.i - u.i : h.p.outlined ? -1 : 1,
        ),
      c = new Array(this.idx.length),
      f = { sizes: [], ends: [], outlined: 0, total: this.idx.length };
    let d = 0;
    for (const { p: h } of l) {
      for (let u = 0; u < h.count; u++) c[d++] = this.idx[h.start + u];
      h.outlined && (f.sizes.push(h.size), f.ends.push(d), (f.outlined = d));
    }
    return (
      (t.userData.lod = f),
      t.setIndex(i > 65535 ? new um(c, 1) : new hm(c, 1)),
      t.computeBoundingBox(),
      t.computeBoundingSphere(),
      t
    );
  }
}

function Bl(n) {
  const t = n.J,
    e = n.d,
    s = [
      [e.pelvisY + 0.02, t.hips],
      [e.spineY + 0.04, t.spine],
      [e.chestY + 0.02, t.chest],
    ];
  return (i, a) => {
    if (a <= s[0][0]) return [t.hips, t.hips, 1];
    for (let o = 1; o < s.length; o++)
      if (a <= s[o][0]) {
        const r = (a - s[o - 1][0]) / (s[o][0] - s[o - 1][0]);
        return [s[o - 1][1], s[o][1], 1 - r];
      }
    return [t.chest, t.chest, 1];
  };
}

function Zi(n, t, e = -1) {
  const s = n.length;
  return (i, a, o) => {
    let r = 0,
      l = 0,
      c = 1 / 0;
    for (let f = 0; f < s; f++) {
      const d = t[f],
        h = t[f + 1],
        u = h[0] - d[0],
        m = h[1] - d[1],
        x = h[2] - d[2],
        p = u * u + m * m + x * x || 1e-6,
        g = ((i - d[0]) * u + (a - d[1]) * m + (o - d[2]) * x) / p,
        y = Xi(g),
        v = d[0] + u * y - i,
        _ = d[1] + m * y - a,
        k = d[2] + x * y - o,
        M = v * v + _ * _ + k * k + (g < 0 || g > 1 ? 1e-4 : 0);
      M < c && ((c = M), (r = f), (l = y));
    }
    return l >= 0.5
      ? r === s - 1
        ? [n[r], n[r], 1]
        : [n[r], n[r + 1], 1 - (l - 0.5)]
      : r === 0
        ? e < 0
          ? [n[0], n[0], 1]
          : [n[0], e, 0.5 + l]
        : [n[r], n[r - 1], 0.5 + l];
  };
}

function Li(n, t) {
  const e = n.length - 1,
    s = Xi(t) * e,
    i = Math.min(e - 1, Math.floor(s)),
    a = s - i;
  return [bt(n[i][0], n[i + 1][0], a), bt(n[i][1], n[i + 1][1], a), bt(n[i][2], n[i + 1][2], a)];
}

function Js(n, t, e) {
  const s = e.axis ?? [1, 0, 0],
    i = e.bow ?? [0, 0, 0],
    a = t[t.length - 1],
    o = t[t.length - 2];
  let r = a[0] - o[0],
    l = a[1] - o[1],
    c = a[2] - o[2];
  const f = Math.hypot(r, l, c) || 1;
  ((r /= f), (l /= f), (c /= f));
  const d = e.tailLen ?? 0.12;
  n.sheet(e.nu ?? 4, e.nv ?? 8, (h, u) => {
    const m = Li(t, u),
      x = (h - 0.5) * 2,
      p = e.width(u),
      g = 1 - x * x,
      y = (e.wave ?? 0) * Math.sin(u * 9 + x * 1.7);
    let v = 0;
    if (u > 0.8 && e.tail && e.tail !== "flat") {
      const _ = (u - 0.8) / 0.2;
      v = e.tail === "swallow" ? -_ * (1 - Math.abs(x)) * d : -_ * Math.abs(x) * d;
    }
    return [
      m[0] + s[0] * x * p + i[0] * (g + y) + r * v,
      m[1] + s[1] * x * p + i[1] * (g + y) + l * v,
      m[2] + s[2] * x * p + i[2] * (g + y) + c * v,
    ];
  });
}

const MU = [
  [-0.25, 0.035, 0.035, 0.075],
  [-0.215, 0.1, 0.095, 0.052],
  [-0.15, 0.168, 0.162, 0.026],
  [-0.06, 0.214, 0.208, 0.008],
  [0.03, 0.236, 0.232, 0],
  [0.12, 0.23, 0.234, -0.008],
  [0.19, 0.192, 0.202, -0.014],
  [0.235, 0.12, 0.13, -0.018],
  [0.256, 0.02, 0.02, -0.02],
];

function qh(n, t, e, s = 1, i = 0.25, a = 1) {
  const o = t.d.headY + i * s,
    r = MU.map((f) => {
      const d = Xi(-f[0] / 0.17),
        h = 1 + (a - 1) * d * d * (3 - 2 * d);
      return [f[0], f[1] * h, f[2] * (1 + (h - 1) * 0.6), f[3]];
    });
  (n.bone(t.J.head).paint(e, { ao: 0.82, ao2: 1, glow: 0.07, mat: K.skin }),
    n.lathe(
      r.map((f) => [o + f[0] * s, f[1] * s, f[2] * s, 0, f[3] * s]),
      { seg: 14, crease: 180 },
    ));
  const l = (f) => {
    const d = f / s;
    if (d <= r[0][0]) return [r[0][1] * s, r[0][2] * s, r[0][3] * s];
    for (let u = 1; u < r.length; u++)
      if (d <= r[u][0]) {
        const m = (d - r[u - 1][0]) / (r[u][0] - r[u - 1][0]);
        return [
          bt(r[u - 1][1], r[u][1], m) * s,
          bt(r[u - 1][2], r[u][2], m) * s,
          bt(r[u - 1][3], r[u][3], m) * s,
        ];
      }
    const h = r[r.length - 1];
    return [h[1] * s, h[2] * s, h[3] * s];
  };
  return {
    cy: o,
    s,
    ring: l,
    surf: (f, d) => {
      const h = l(d - o);
      return h[2] + h[1] * Math.sqrt(Math.max(0, 1 - (f / h[0]) ** 2));
    },
  };
}

function Cm(n, t, e, s) {
  const i = e.s,
    a = (s.thick ?? 0.022) * i;
  n.bone(t.J.head).paint(s.c, { c2: s.c2, gloss: s.gloss ?? 0.25, ao: 0.85, ao2: 1, mat: K.fur });
  const o = [-0.2, -0.13, -0.06, 0, 0.06, 0.12, 0.17, 0.215, 0.245, 0.262],
    r = o.map((l) => {
      const c = e.ring(l * i),
        f = l > 0.25 ? 0.2 : 1;
      return [e.cy + l * i + (l > 0.2 ? a * 0.6 : 0), c[0] + a * f, c[1] + a * f, 0, c[2] - a * 0.2];
    });
  n.lathe(r, {
    seg: 14,
    crease: 180,
    cap0: !1,
    shape: (l, c) => {
      let f = Math.abs(l - Math.PI / 2);
      return (f > Math.PI && (f = Math.PI * 2 - f), o[c] >= s.line(f) ? 1 : 0.8);
    },
  });
}

function bp(n, t, e, s, i, a, o, r) {
  const l = [t, e, s + o],
    c = [];
  for (let f = 0; f < r; f++) {
    const d = (f / r) * Math.PI * 2;
    (l.push(t + Math.cos(d) * i, e + Math.sin(d) * a, s), c.push(0, 1 + f, 1 + ((f + 1) % r)));
  }
  n.emit(l, c, null, 180);
}

function Xh(n, t, e, s) {
  const i = e.s,
    a = e.cy - 0.025 * i,
    o = 0.098 * i * (s.spread ?? 1),
    r = (s.eyeW ?? 0.05) * i,
    l = (s.eyeH ?? 0.045) * i,
    c = e.ring(a - e.cy),
    f = c[1] * Math.sqrt(Math.max(0, 1 - (o / c[0]) ** 2)),
    d = (Math.atan2(o / (c[0] * c[0]), f / (c[1] * c[1])) * 180) / Math.PI,
    h = s.irisSize ?? 0.68;
  (n.bone(t.J.head),
    n.sym(() => {
      n.g(pt(o, a, c[2] + f - 0.004 * i, 0, d * 0.8, s.slant ?? 4), () => {
        const p = (s.lash ?? 0.014) * i;
        if (s.lite) {
          (n.paint(16512236, { line: 0 }),
            bp(n, 0, 0, 0.002 * i, r, l, 0.011 * i, 12),
            n.paint(s.iris, { glow: s.irisGlow ?? 0.2, line: 0 }),
            bp(n, -r * 0.1, -l * 0.04, 0.0115 * i, r * h, l * Math.min(0.9, h * 1.32), 0.004 * i, 10),
            n.paint(1314066, { line: 0 }),
            bp(n, -r * 0.1, -l * 0.08, 0.0145 * i, r * h * 0.47, l * Math.min(0.48, h * 0.7), 0.003 * i, 8),
            n.paint(16777215, { glow: 0.5, line: 0 }),
            bp(n, r * 0.16, l * 0.36, 0.0165 * i, r * 0.24, l * 0.24, 0.002 * i, 6),
            n.paint(s.brow, { line: 0 }),
            n.box(0, l * 0.9, 0.01 * i, r * 2.25, p, 0.016 * i),
            n.g(pt(r * 1.05, l * 0.75, 0.008 * i, 0, 0, 38), () =>
              n.box(0, 0, 0, r * 0.5, p * 0.9, 0.014 * i),
            ));
          return;
        }
        (n.paint(16512236, { line: 0 }),
          n.ball(0, 0, 0, r, l, 0.012 * i, 1),
          n.paint(s.iris, { glow: s.irisGlow ?? 0.2, line: 0 }),
          n.ball(-r * 0.1, -l * 0.04, 0.006 * i, r * h, l * Math.min(0.9, h * 1.32), 0.009 * i, 1),
          n.paint(1314066, { line: 0 }),
          n.ball(-r * 0.1, -l * 0.08, 0.01 * i, r * h * 0.47, l * Math.min(0.48, h * 0.7), 0.007 * i, 1),
          n.paint(16777215, { glow: 0.5, line: 0 }),
          n.ball(r * 0.16, l * 0.36, 0.014 * i, r * 0.24, l * 0.24, 0.004 * i, 0),
          n.paint(s.brow, { line: 0 }),
          n.box(0, l * 0.9, 0.008 * i, r * 2.25, p, 0.016 * i, p * 0.3),
          n.g(pt(r * 1.05, l * 0.75, 0.006 * i, 0, 0, 38), () =>
            n.box(0, 0, 0, r * 0.5, p * 0.9, 0.014 * i, p * 0.3),
          ));
      });
      const m = a + l + 0.04 * i,
        x = (s.browH ?? 0.018) * i;
      (n.paint(s.brow, { line: 0 }),
        n.g(pt(o + 0.006 * i, m, e.surf(o, m) + 0.003 * i, -14, d * 0.7, s.browTilt ?? 10), () =>
          n.box(0, 0, 0, r * 2.3 * (s.browLen ?? 1), x, 0.016 * i, Math.min(0.006 * i, x * 0.4)),
        ));
    }));
  const u = e.cy - 0.145 * i;
  if (s.lip !== void 0)
    if (s.smile === void 0 && s.open === void 0)
      (n.paint(s.lip, { line: 0 }),
        n.g(pt(0, u, e.surf(0, u) + 0.001, -8, 0, 0), () =>
          n.box(0, 0, 0, 0.06 * i * (s.mouthW ?? 1), 0.012 * i, 0.012 * i, 0.004 * i),
        ));
    else {
      const m = 0.03 * i * (s.mouthW ?? 1),
        x = s.smile ?? 0,
        p = Xi(s.open ?? 0),
        g = (k) => u + x * 0.02 * i * (k / m) ** 2 + p * 0.006 * i,
        y = (k) => p * 0.034 * i * (1 - (k / m) ** 2),
        v = 0.0075 * i;
      (p > 0.02 &&
        (n.paint(4856858, { line: 0 }),
        n.sheet(
          6,
          2,
          (k, M) => {
            const S = (k - 0.5) * 2 * m * 0.96,
              b = bt(g(S) - y(S), g(S), M);
            return [S, b, e.surf(S, b) + 0.0025 * i];
          },
          !1,
        ),
        n.paint(16183266, { line: 0 }),
        n.sheet(
          6,
          1,
          (k, M) => {
            const S = (k - 0.5) * 2 * m * 0.86,
              b = bt(g(S) - y(S) * 0.5, g(S), M);
            return [S, b, e.surf(S, b) + 0.004 * i];
          },
          !1,
        )),
        n.paint(s.lip, { line: 0 }));
      const _ = (k, M) => {
        const S = [];
        for (let b = 0; b <= 6; b++) {
          const w = (b / 6 - 0.5) * 2 * m,
            T = k(w),
            E = 1 - 0.55 * Math.abs(b / 3 - 1) ** 2;
          S.push([w, T, e.surf(w, T) + 0.003 * i, M * E, 0.006 * i]);
        }
        return S;
      };
      (n.tube(_(g, v), { seg: 4, up: [0, 1, 0] }),
        p > 0.02 &&
          n.tube(
            _((k) => g(k) - y(k) - v * 0.4, v * 0.85),
            { seg: 4, up: [0, 1, 0] },
          ));
    }
  if (s.skin !== void 0) {
    const m = s.nose ?? 0;
    if (m > 0) {
      const x = e.cy - 0.092 * i,
        p = e.surf(0, x);
      (n.paint(s.skin, { ao: 1, ao2: 0.72, glow: 0.07, line: 0, mat: K.skin }),
        n.tube(
          [
            [0, x - 0.012 * i * m, p - 0.004 * i, 0.03 * i * m, 0.012 * i * m],
            [0, x + 0.004 * i, p + 0.022 * i * m, 0.024 * i * m, 0.02 * i * m],
            [0, x + 0.05 * i, e.surf(0, x + 0.05 * i) + 0.004 * i, 0.014 * i * m, 0.012 * i],
            [0, x + 0.085 * i, e.surf(0, x + 0.085 * i) - 0.004 * i, 0.01 * i * m, 0.006 * i],
          ],
          { seg: 5, up: [1, 0, 0], crease: 180 },
        ));
    }
    if (s.ears) {
      const x = e.ring(-0.04 * i);
      (n.paint(s.skin, { ao: 0.8, glow: 0.07, mat: K.skin }),
        n.sym(() =>
          n.g(pt(x[0] * 0.99, e.cy - 0.04 * i, x[2] - 0.015 * i, 0, -18, 0), () =>
            n.ball(0, 0, 0, 0.022 * i, 0.05 * i, 0.034 * i, 0, 180),
          ),
        ));
    }
  }
}

function Ox(n, t, e, s) {
  const i = t.d,
    a = t.J,
    o = e * i.hipX;
  (n.bone(e > 0 ? a.shinL : a.shinR),
    n.lathe(
      [
        [i.ankleY - 0.03, s.rAnkle * 1.05, s.rAnkle * 1.12, o, 0],
        [i.ankleY + 0.07, s.rAnkle, s.rAnkle * 1.05, o, 0],
        [bt(i.ankleY, s.top, 0.62), bt(s.rAnkle, s.rTop, 0.7), bt(s.rAnkle, s.rTop, 0.7), o, 0],
        [s.top, s.rTop, s.rTop, o, 0],
        [s.top + 0.005, s.rTop * 0.8, s.rTop * 0.8, o, 0],
      ],
      { seg: s.seg ?? 8 },
    ),
    n.bone(e > 0 ? a.footL : a.footR));
  const r = s.rAnkle,
    l = s.toe ?? 0.02;
  n.tube(
    [
      [o, 0.055, -r * 1.3, r * 0.8, 0.05],
      [o, 0.07, -r * 0.4, r * 1.08, 0.07],
      [o, 0.065, s.len * 0.45, r * 1.2, 0.065],
      [o, 0.055 + l * 0.4, s.len * 0.85, r * 1.05, 0.052],
      [o, 0.05 + l, s.len, r * 0.6, 0.034],
    ],
    { seg: 8, up: [1, 0, 0] },
  );
}

function Wd(n, t, e, s, i, a, o = 0.014, r = 0.02, l = 10) {
  n.g(pt(t, e, s, 0, 0, 0, 1, 1, a / i), () => n.torus(i, o, r, l, 4, { crease: 30 }));
}

function af(n, t, e, s, i, a = {}) {
  const o = a.n ?? 4,
    r = Math.hypot(e[0], e[1], e[2]) || 1,
    l = a.curl ?? [0, 0, 0],
    c = a.tip ?? 0.08,
    f = [];
  for (let d = 0; d <= o; d++) {
    const h = d / o,
      u = s * h,
      m = s * h * h,
      x =
        i *
        (d === 0 ? 0.72 : bt(1, c, Math.pow(h, 1.4)) * (1 + 0.18 * Math.sin(Math.PI * Math.min(1, h * 1.6))));
    f.push([
      t[0] + (e[0] / r) * u + l[0] * m,
      t[1] + (e[1] / r) * u + l[1] * m,
      t[2] + (e[2] / r) * u + l[2] * m,
      x,
      x * (a.flat ?? 0.8),
    ]);
  }
  n.tube(f, { seg: a.seg ?? 5, up: a.up ?? [1, 0, 0], crease: 180 });
}

function Bx(n, t, e, s) {
  const i = e.s,
    a = s.spread ?? 1.45,
    o = (s.thick ?? 0.03) * i,
    r = s.drop ?? 0.05,
    l = s.puff ?? 0.5;
  n.bone(t.J.head).paint(s.c, { c2: s.c2, gloss: s.gloss ?? 0.2, ao: 0.82, ao2: 1, mat: K.fur });
  const c = (g) => {
      const y = Math.abs(g);
      return y < 0.34
        ? -0.182
        : y < 0.8
          ? bt(-0.182, -0.085, (y - 0.34) / 0.46)
          : bt(-0.085, 0.03, Xi((y - 0.8) / Math.max(0.05, a - 0.8)));
    },
    f = (g) => bt(-0.252 - r, -0.13, Math.pow(Xi(Math.abs(g) / Math.max(0.2, a)), 1.6)),
    d = (g, y, v) => {
      const _ = Math.max(y, -0.2),
        k = e.ring(_ * i),
        M = Math.max(0.25, 1 - (_ - y) * 3.2);
      return [(k[0] * M + v) * Math.sin(g), e.cy + y * i, k[2] + (k[1] * M + v) * Math.cos(g)];
    };
  a > 0 &&
    n.sheet(10, 3, (g, y) => {
      const v = bt(-a, a, g),
        _ = bt(f(v), c(v), y),
        k = Math.sin(Math.PI * g);
      return d(
        v,
        _,
        o * (0.12 + 0.88 * Math.sin(Math.PI * Math.min(1, (1 - y) * 0.85 + 0.12))) * (0.35 + 0.65 * k),
      );
    });
  const h = s.tufts ?? 5,
    u = (s.len ?? 0.2) * i,
    m = (s.tuftR ?? 0.045) * i,
    x = a > 0 ? a * 0.86 : 0.5;
  for (let g = 0; g < h; g++) {
    const y = h === 1 ? 0 : (g / (h - 1)) * 2 - 1,
      v = y * x,
      _ = 1 - Math.abs(y),
      k = bt(c(v), f(v), 0.62),
      M = d(v, k, o * 0.55),
      S = Math.sin(v),
      b = Math.cos(v),
      w = [S * (0.35 + l * 0.8), -1, b * (0.3 + l * 0.55) * (0.5 + 0.5 * _)];
    af(n, M, w, u * (0.78 + 0.22 * _), m * (0.85 + 0.25 * _), {
      curl: [S * l * 0.5, l * 0.55, b * l * 0.4],
      n: 3,
      seg: s.tuftSeg ?? 5,
      up: [b, 0, -S],
      flat: 0.8,
      tip: 0.16,
    });
  }
  const p = (s.mustache ?? 0) * i;
  if (p > 0) {
    const g = (s.mustacheR ?? 0.016) * i,
      y = (s.curl ?? 0.02) * i;
    n.sym(() => {
      const v = [];
      for (let _ = 0; _ <= 3; _++) {
        const k = _ / 3,
          M = 0.012 * i + p * k,
          S = e.cy - 0.122 * i - 0.03 * i * Math.sin(Math.PI * Math.min(1, k * 1.1)) * 0.8 + y * k * k * 1.6,
          b = _ === 0 ? 0.7 : bt(1, 0.12, Math.pow(k, 1.5));
        v.push([
          M,
          S,
          e.surf(Math.min(M, e.ring(S - e.cy)[0] * 0.96), S) + g * 0.5 + 0.02 * i * k * k,
          g * b,
          g * 0.75 * b,
        ]);
      }
      n.tube(v, { seg: 4, up: [0, 1, 0], crease: 180 });
    });
  }
}

function R8(n, t, e) {
  const s = e.tufts ?? 8,
    i = e.amp ?? 0.22,
    a = e.closed ?? !1,
    o = s * 2,
    r = t.length,
    l = [],
    c = a ? o : o + 1;
  for (let h = 0; h < c; h++) {
    const u = a ? (h / o) * r : (h / o) * (r - 1),
      m = Math.floor(u) % r,
      x = a ? (m + 1) % r : Math.min(r - 1, m + 1),
      p = u - Math.floor(u),
      g = t[m],
      y = t[x],
      v = h % 2 === 0 ? 1 + i : 1 - i * 0.55,
      _ = bt(g[3], y[3], p),
      k = bt(g[4] ?? g[3], y[4] ?? y[3], p),
      M = a ? 1 : 0.55 + 0.45 * Math.sin(Math.PI * Math.min(1, Math.min(h, o - h) / 1.5) * 0.5);
    l.push([bt(g[0], y[0], p), bt(g[1], y[1], p), bt(g[2], y[2], p), _ * v * M, k * v * M]);
  }
  const f = e.lobes ?? 5,
    d = e.lobeAmp ?? 0.1;
  (n.paint(e.c, {
    c2: e.c2 ?? e.c,
    mat: K.fur,
    grain: e.grain ?? 0.05,
    team: e.team ?? 0,
    by: (h, u, m, x, p, g) => 0.5 - 0.62 * g,
  }),
    n.tube(l, {
      seg: e.seg ?? 7,
      closed: a,
      up: e.up ?? [0, 1, 0],
      crease: 70,
      shape: (h, u) => 1 + d * Math.cos(f * h + u * 2.1),
    }));
}

function _p(n, t, e, s, i, a = { c: 16777215 }) {
  const o = a.tufts ?? 9,
    r = [],
    l = o * 2;
  for (let c = 0; c < l; c++) {
    const f = (c / l) * Math.PI * 2;
    r.push([Math.cos(f) * t, a.y ?? 0, Math.sin(f) * e, i, s]);
  }
  R8(n, r, { ...a, tufts: o, closed: !0, up: [0, 1, 0] });
}

function Ko(n, t, e, s = 0.07, i = !1) {
  const a = t.d,
    o = e * a.shoulderX,
    r = a.handY + 0.01;
  (n.bone(e > 0 ? t.J.handL : t.J.handR),
    i
      ? (n.tube(
          [
            [o, r + s * 1, 0, s * 0.3, s * 0.62],
            [o, r + s * 0.3, 0.004, s * 0.36, s * 0.86],
            [o, r - s * 0.5, 0.012, s * 0.32, s * 0.84],
            [o, r - s * 1.25, 0.04, s * 0.24, s * 0.7],
            [o, r - s * 1.8, 0.085, s * 0.14, s * 0.5],
          ],
          { seg: 6, up: [1, 0, 0], crease: 180 },
        ),
        n.g(pt(o, r - s * 0.2, s * 0.8, 40, 0, 0), () =>
          n.ball(0, 0, 0, s * 0.24, s * 0.6, s * 0.26, 0, 180),
        ))
      : (n.lathe(
          [
            [r - s * 1.05, s * 0.5, s * 0.6, o, 0.012],
            [r - s * 0.72, s * 0.86, s * 1.02, o, 0.012],
            [r, s * 0.94, s * 1.12, o, 0.008],
            [r + s * 0.72, s * 0.8, s * 0.9, o, 0],
            [r + s * 1.02, s * 0.5, s * 0.56, o, 0],
          ],
          { seg: 7, power: 2.5, crease: 180 },
        ),
        n.g(pt(o - e * s * 0.2, r + s * 0.1, s * 1, 0, 0, e * 24), () =>
          n.ball(0, 0, 0, s * 0.34, s * 0.6, s * 0.34, 0, 180),
        )));
}

const ne = {
    red: 13384230,
    redDark: 9052184,
    redLight: 15294778,
    ironLight: 8156794,
    ironDark: 2893609,
    brass: 14852410,
    brassDark: 10118946,
    steel: 13159636,
    steelDark: 6777718,
    beard: 8007196,
    beardHi: 11094568,
    skin: 14260850,
    robe: 10119740,
    robeDark: 7096104,
    leather: 3877669,
    leatherDark: 2234646,
    shaft: 5909538,
    edge: 16756823,
  },
  kU = { ...Am, hipX: 0.15, shoulderX: 0.34, clavX: 0.11 },
  fw = 1.24,
  wp = Math.PI / 180,
  Co = { head: 1.34, butt: -0.52 };

function SU() {
  const n = Gh(kU),
    { rig: t, J: e, d: s } = n,
    i = new Ls(),
    a = t.add("gripR", e.chest, 0, s.chestY, 0),
    o = t.add("aim", e.chest, 0, s.chestY, 0),
    r = t.add("gripL", e.chest, 0, s.chestY, 0),
    l = s.headY + 0.25,
    c = [
      [0, l + 0.33, -0.01],
      [0, l + 0.45, -0.04],
      [0, l + 0.56, -0.08],
    ],
    f = t.addChain("pony", e.head, c.slice(0, 2));
  t.chain({
    joints: f,
    tip: [0, 0.11, -0.04],
    stiffness: 9,
    drag: 0.86,
    gravity: 6,
    maxAngle: 50,
    wind: 1.6,
  });
  const d = [
      [0, 1.4, -0.16],
      [0, 1.17, -0.29],
      [0, 0.93, -0.35],
      [0, 0.7, -0.38],
      [0, 0.48, -0.39],
    ],
    h = t.addChain("scarf", e.chest, d.slice(0, 4));
  t.chain({
    joints: h,
    tip: [0, -0.22, -0.01],
    stiffness: 3.2,
    drag: 0.92,
    gravity: 8,
    maxAngle: 72,
    wind: 2.6,
    colliders: [
      { joint: e.chest, x: 0, y: 0, z: 0.02, r: 0.3 },
      { joint: e.hips, x: 0, y: 0, z: 0, r: 0.3 },
    ],
  });
  const u = [
      [0.23, 0.96, 0.1],
      [0.28, 0.76, 0.11],
      [0.29, 0.56, 0.09],
      [0.29, 0.38, 0.08],
    ],
    m = t.addChain("sash", e.hips, u.slice(0, 3));
  t.chain({
    joints: m,
    tip: [0, -0.18, -0.01],
    stiffness: 6,
    drag: 0.88,
    gravity: 10,
    maxAngle: 60,
    wind: 1,
  });
  const x = [
      [0, 0.9, 0.2],
      [0, 0.7, 0.225],
      [0, 0.5, 0.23],
      [0, 0.34, 0.23],
    ],
    p = t.addChain("tab", e.hips, x.slice(0, 3));
  t.chain({ joints: p, tip: [0, -0.16, 0], stiffness: 8, drag: 0.86, gravity: 10, maxAngle: 50, wind: 0.8 });
  const g = [
      [0, 0.9, -0.19],
      [0, 0.68, -0.23],
      [0, 0.46, -0.24],
      [0, 0.3, -0.24],
    ],
    y = t.addChain("tail", e.hips, g.slice(0, 3));
  t.chain({ joints: y, tip: [0, -0.16, 0], stiffness: 6, drag: 0.88, gravity: 10, maxAngle: 60, wind: 1 });
  const v = [
      [-s.shoulderX, s.handY - 0.03, 1.1],
      [-s.shoulderX, s.handY - 0.17, 1.1],
      [-s.shoulderX, s.handY - 0.31, 1.1],
    ],
    _ = t.addChain("tassel", e.propR, v.slice(0, 2));
  (t.chain({
    joints: _,
    tip: [0, -0.14, 0],
    stiffness: 2.5,
    drag: 0.9,
    gravity: 14,
    maxAngle: 150,
    wind: 1.2,
  }),
    i.sym((R) => {
      const I = s.hipX;
      (i
        .bone(R > 0 ? e.thighL : e.thighR)
        .paint(ne.robeDark, { c2: ne.robe, ao: 0.88, ao2: 1, mat: K.cloth }),
        i.limb([I, s.hipY + 0.04, 0], [I, s.kneeY, 0], 0.15, 0.115, { seg: 8, bulge: 0.06 }));
    }));
  for (const R of [1, -1]) {
    (i.paint(ne.leatherDark, { c2: ne.leather, gloss: 0.25, mat: K.leather }),
      Ox(i, n, R, { top: 0.44, rTop: 0.128, rAnkle: 0.094, len: 0.26 }));
    const I = R > 0 ? e.shinL : e.shinR;
    (i.bone(I).paint(ne.ironDark, { c2: ne.ironLight, gloss: 0.6, mat: K.metal }),
      i.sheet(3, 2, (P, F) => {
        const L = bt(40, 140, P) * wp,
          B = bt(0.108, 0.138, F) + 0.012;
        return [R * s.hipX + Math.cos(L) * B, bt(0.16, 0.45, F), Math.sin(L) * B];
      }),
      i.paint(ne.brass, { c2: ne.brassDark, gloss: 1, mat: K.metal }),
      i.lathe(
        [
          [0.428, 0.132, 0.132, R * s.hipX, 0],
          [0.446, 0.14, 0.14, R * s.hipX, 0],
          [0.464, 0.13, 0.13, R * s.hipX, 0],
        ],
        { seg: 8, cap0: !1, cap1: !1, crease: 30 },
      ),
      i.ball(R * s.hipX, s.kneeY + 0.03, 0.13, 0.04, 0.046, 0.026, 0));
  }
  const k = [
      [0.76, 0.13, 0.12, 0, 0],
      [0.83, 0.235, 0.19, 0, 0.005],
      [0.92, 0.262, 0.225, 0, 0.026],
      [1.02, 0.268, 0.24, 0, 0.042],
      [1.12, 0.272, 0.225, 0, 0.026],
      [1.22, 0.285, 0.2, 0, 0.008],
      [1.33, 0.295, 0.19, 0, 0],
      [1.39, 0.2, 0.15, 0, 0],
      [1.44, 0.11, 0.105, 0, 0],
    ],
    M = (R) => {
      for (let P = 1; P < k.length; P++)
        if (R <= k[P][0]) {
          const F = Math.max(0, (R - k[P - 1][0]) / (k[P][0] - k[P - 1][0]));
          return [bt(k[P - 1][1], k[P][1], F), bt(k[P - 1][2], k[P][2], F), bt(k[P - 1][4], k[P][4], F)];
        }
      const I = k[k.length - 1];
      return [I[1], I[2], I[4]];
    },
    S = (R, I) => R.map((P, F) => [P, M(P)[0] + I[F], M(P)[1] + I[F], 0, M(P)[2]]);
  (i.bind(Bl(n)).paint(ne.robeDark, { c2: ne.robe, ao: 0.88, ao2: 1, mat: K.cloth }),
    i.lathe(k, { seg: 12 }),
    i.bone(e.neck).paint(ne.skin, { ao: 0.72, glow: 0.05, mat: K.skin }),
    i.lathe(
      [
        [1.4, 0.092, 0.092],
        [1.54, 0.09, 0.092],
      ],
      { seg: 8, cap0: !1 },
    ),
    i
      .bind(Bl(n))
      .paint(ne.ironDark, {
        c2: ne.ironLight,
        gloss: 0.6,
        ao: 0.8,
        ao2: 1,
        mat: K.metal,
        pattern: En.scale,
        patternScale: 11,
        patternAmt: 0.22,
      }),
    i.lathe(S([1.03, 1.06, 1.14, 1.24, 1.34, 1.385], [0.012, 0.03, 0.026, 0.022, 0.022, 0.012]), {
      seg: 12,
      cap0: !1,
    }),
    i.bone(e.chest),
    i.sym(() => {
      i.g(pt(0.125, 1.25, M(1.25)[1] * 0.93 + 0.02, -6, 16, 0), () => {
        (i.paint(ne.brassDark, { c2: ne.brass, gloss: 1, mat: K.metal }),
          i.g(pt(0, 0, 0, 90, 0, 0), () =>
            i.lathe(
              [
                [0, 0.1],
                [0.018, 0.094],
                [0.03, 0.07],
                [0.036, 0.02],
              ],
              { seg: 10, cap0: !1 },
            ),
          ),
          i.paint(ne.brass, { c2: 16765562, gloss: 1, mat: K.metal }),
          i.g(pt(0, 0, 0.012, 90, 0, 0), () => i.torus(0.098, 0.014, 0.012, 10, 3, { crease: 30 })));
      });
    }),
    i.bone(e.spine).paint(ne.brass, { c2: ne.brassDark, gloss: 1, mat: K.metal }),
    i.g(pt(0, 1.07, M(1.07)[1] + M(1.07)[2] + 0.028, 6, 0, 0), () => {
      (i.extrude(
        [
          [-0.1, 0.075],
          [0, 0.1],
          [0.1, 0.075],
          [0.115, 0],
          [0.07, -0.085],
          [0, -0.11],
          [-0.07, -0.085],
          [-0.115, 0],
        ],
        0.04,
        0.016,
      ),
        i.paint(ne.brassDark, { c2: ne.brass, gloss: 1, mat: K.metal }),
        i.sym(() => i.g(pt(0.046, 0.03, 0.024, 0, 0, 16), () => i.box(0, 0, 0, 0.07, 0.024, 0.02))),
        i.ball(0, -0.01, 0.026, 0.024, 0.04, 0.018, 0),
        i.sym(() => i.ball(0.045, -0.058, 0.022, 0.016, 0.022, 0.012, 0)));
    }),
    i.bone(e.spine).paint(ne.leather, { c2: ne.leatherDark, gloss: 0.25, mat: K.leather }),
    i.lathe(S([0.9, 0.915, 1, 1.015], [0.022, 0.036, 0.036, 0.022]), { seg: 12 }),
    i.bone(e.hips).paint(ne.redLight, { c2: ne.red, mat: K.cloth }),
    i.ball(0.24, 0.965, 0.1, 0.06, 0.05, 0.052, 1),
    i.bind(Zi(m, u, e.hips)).paint(ne.red, { c2: ne.redDark, mat: K.cloth }),
    Js(i, u, {
      width: (R) => Fi(0.05, 0.075, R),
      axis: [0, 0, 1],
      bow: [0.02, 0, 0],
      nu: 2,
      nv: 5,
      tail: "point",
      tailLen: 0.1,
    }));
  const b = (R, I, P, F, L, B) => {
    i.bind(Zi(R, I, e.hips)).paint(16777215, { team: 1, mat: K.cloth });
    const G = I.map((q) => [q[0], q[1], q[2] - Math.sign(L) * 0.006]);
    (Js(i, G, {
      width: (q) => Fi(P, F, q) + 0.024,
      bow: [0, 0, L],
      nu: 2,
      nv: 5,
      tail: "swallow",
      tailLen: B + 0.03,
    }),
      i.paint(ne.red, { c2: ne.redDark, mat: K.cloth }),
      Js(i, I, { width: (q) => Fi(P, F, q), bow: [0, 0, L], nu: 4, nv: 5, tail: "swallow", tailLen: B }));
  };
  (b(p, x, 0.14, 0.115, 0.035, 0.1),
    b(y, g, 0.17, 0.14, -0.035, 0.11),
    i.sym(() => {
      (i
        .bone(e.hips)
        .paint(ne.ironDark, {
          c2: ne.ironLight,
          gloss: 0.6,
          ao: 0.78,
          ao2: 1,
          mat: K.metal,
          pattern: En.scale,
          patternScale: 11,
          patternAmt: 0.22,
        }),
        i.sheet(4, 2, (R, I) => {
          const P = bt(-64, 64, R) * wp,
            F = bt(0.262, 0.3, I);
          return [
            Math.cos(P) * F,
            bt(0.92, 0.66, I) + (Math.round(R * 4) % 2 === 0 ? 0.014 * I : 0),
            Math.sin(P) * F * 0.82,
          ];
        }),
        i.paint(ne.brass, { c2: ne.brassDark, gloss: 1, mat: K.metal }),
        i.tube(
          [-64, 0, 64].map((R) => [
            Math.cos(R * wp) * 0.306,
            0.662,
            Math.sin(R * wp) * 0.306 * 0.82,
            0.014,
            0.012,
          ]),
          { seg: 4, up: [0, 1, 0] },
        ));
    }),
    i.sym((R) => {
      const I = s.shoulderX;
      (i.bone(R > 0 ? e.armL : e.armR).paint(ne.red, { c2: ne.redDark, ao: 0.88, ao2: 1, mat: K.cloth }),
        i.limb([I, s.shoulderY + 0.04, 0], [I, s.elbowY - 0.02, 0], 0.112, 0.094, { seg: 8, bulge: 0.06 }),
        i.paint(16777215, { team: 1, mat: K.cloth }),
        i.lathe(
          [
            [s.elbowY + 0.07, 0.101, 0.101, I, 0],
            [s.elbowY + 0.085, 0.108, 0.108, I, 0],
            [s.elbowY + 0.115, 0.108, 0.108, I, 0],
            [s.elbowY + 0.13, 0.103, 0.103, I, 0],
          ],
          { seg: 8, cap0: !1, cap1: !1 },
        ),
        i.bone(R > 0 ? e.foreL : e.foreR).paint(ne.redDark, { c2: ne.red, mat: K.cloth }),
        i.ball(I, s.elbowY, 0, 0.096, 0.094, 0.096, 1),
        i.limb([I, s.elbowY, 0], [I, s.wristY + 0.16, 0], 0.092, 0.096, { seg: 8 }),
        i.paint(ne.ironDark, { c2: ne.ironLight, gloss: 0.6, mat: K.metal }),
        i.lathe(
          [
            [s.wristY - 0.01, 0.082, 0.082, I, 0],
            [s.wristY + 0.03, 0.098, 0.098, I, 0],
            [s.wristY + 0.18, 0.106, 0.106, I, 0],
            [s.wristY + 0.2, 0.09, 0.09, I, 0],
          ],
          { seg: 8 },
        ),
        i.paint(ne.brass, { c2: ne.brassDark, gloss: 1, mat: K.metal }));
      for (const P of [s.wristY + 0.02, s.wristY + 0.165])
        i.lathe(
          [
            [P, 0.102, 0.102, I, 0],
            [P + 0.014, 0.112, 0.112, I, 0],
            [P + 0.028, 0.104, 0.104, I, 0],
          ],
          { seg: 8, cap0: !1, cap1: !1, crease: 30 },
        );
    }),
    i.paint(ne.skin, { glow: 0.05, ao: 0.9, mat: K.skin }),
    Ko(i, n, 1, 0.078),
    Ko(i, n, -1, 0.078));
  const w = (R, I, P, F, L, B, G) => {
    (i.bone(R).paint(ne.ironDark, { c2: ne.ironLight, gloss: 0.6, ao: 0.8, ao2: 1, mat: K.metal }),
      i.g(pt(I, P, 0, 0, 0, G), () => {
        (i.lathe(
          [
            [-L * 0.34, F, B],
            [-L * 0.1, F * 1.02, B * 1.02],
            [L * 0.6, F * 0.72, B * 0.72],
            [L, F * 0.18, B * 0.18],
          ],
          { seg: 10, crease: 50 },
        ),
          i.paint(ne.brass, { c2: ne.brassDark, gloss: 1, mat: K.metal }),
          i.lathe(
            [
              [-L * 0.42, F * 0.98, B * 0.98],
              [-L * 0.3, F * 1.05, B * 1.05],
              [-L * 0.16, F * 1.03, B * 1.03],
            ],
            { seg: 10, cap0: !1, cap1: !1, crease: 30 },
          ));
      }));
  };
  (i.sym((R) => {
    (w(R > 0 ? e.armL : e.armR, 0.4, 1.3, 0.15, 0.085, 0.155, -44),
      w(R > 0 ? e.clavL : e.clavR, 0.355, 1.435, 0.2, 0.13, 0.19, -18));
  }),
    i.bone(e.chest).paint(ne.redDark, { c2: ne.red, ao: 0.9, mat: K.cloth }),
    i.lathe(
      [
        [1.33, 0.3, 0.215],
        [1.37, 0.27, 0.2],
        [1.42, 0.19, 0.16],
        [1.47, 0.135, 0.13],
      ],
      { seg: 12, cap0: !1, cap1: !1, shape: (R) => 1 + 0.03 * Math.sin(R * 6) },
    ),
    i.paint(ne.redLight, { c2: ne.red, mat: K.cloth }),
    i.g(pt(0, 1.47, 0.012, 12, 0, 0, 1, 1, 0.92), () => i.torus(0.142, 0.052, 0.046, 10, 4)),
    i.ball(0, 1.425, 0.16, 0.048, 0.04, 0.036, 0, 180),
    i.sym(() =>
      i.tube(
        [
          [0.02, 1.42, 0.165, 0.03, 0.012],
          [0.07, 1.34, 0.19, 0.034, 0.012],
          [0.08, 1.27, 0.2, 0.012, 0.008],
        ],
        { seg: 4, up: [1, 0, 0] },
      ),
    ),
    i.bind(Zi(h, d, e.chest)).paint(ne.red, { c2: ne.redDark, mat: K.cloth }));
  const T = (R) => Fi(0.25, 0.37, Math.sin(R * Math.PI * 0.5)),
    E = [0, 0.25, 0.5, 0.75, 0.9].map((R) => Li(d, R));
  (Js(i, E, { width: (R) => T(R * 0.9), bow: [0, 0, -0.07], wave: 0.22, nu: 6, nv: 8, tail: "flat" }),
    i.paint(16777215, { team: 1, mat: K.cloth }),
    Js(i, [Li(d, 0.9), Li(d, 0.95), Li(d, 1)], {
      width: (R) => T(0.9 + R * 0.1),
      bow: [0, 0, -0.07],
      nu: 6,
      nv: 2,
      tail: "flat",
    }));
  const A = qh(i, n, ne.skin, 1, 0.25, 1.1);
  (Xh(i, n, A, {
    iris: 3810322,
    irisGlow: 0.05,
    irisSize: 0.6,
    brow: ne.beard,
    browTilt: 5,
    browH: 0.03,
    browLen: 1.05,
    eyeW: 0.05,
    eyeH: 0.046,
    slant: 2,
    lash: 0.014,
    lip: 8140070,
    skin: ne.skin,
    nose: 1.3,
    ears: !0,
    mouthW: 1.75,
    smile: 1,
    open: 0.85,
    lite: !0,
  }),
    Bx(i, n, A, {
      c: ne.beard,
      c2: ne.beardHi,
      spread: 1.5,
      thick: 0.075,
      drop: 0.06,
      tufts: 9,
      len: 0.075,
      tuftR: 0.058,
      puff: 0.15,
      mustache: 0.095,
      mustacheR: 0.017,
      curl: 0.034,
      gloss: 0,
    }));
  {
    const R = (P, F) => {
      const L = A.ring(P);
      return [A.cy + P, L[0] + F, L[1] + F, 0, L[2]];
    };
    (i.bone(e.head).paint(ne.ironDark, { c2: ne.ironLight, gloss: 0.7, mat: K.metal }),
      i.lathe(
        [
          R(0.085, 0.07),
          R(0.1, 0.045),
          R(0.17, 0.04),
          R(0.225, 0.045),
          [A.cy + 0.275, 0.13, 0.135, 0, -0.016],
          [A.cy + 0.305, 0.05, 0.05, 0, -0.018],
        ],
        { seg: 14, cap0: !1 },
      ),
      i.paint(ne.brass, { c2: ne.brassDark, gloss: 1, mat: K.metal }),
      i.lathe([R(0.1, 0.05), R(0.117, 0.062), R(0.134, 0.047)], { seg: 14, cap0: !1, cap1: !1, crease: 30 }),
      i.lathe(
        [
          [A.cy + 0.295, 0.06],
          [A.cy + 0.32, 0.045],
          [A.cy + 0.345, 0.03],
        ],
        { seg: 8, cap0: !1 },
      ),
      i.ball(0, A.cy + 0.165, A.surf(0, A.cy + 0.165) + 0.045, 0.04, 0.04, 0.02, 0, 180),
      i.paint(ne.ironDark, { c2: ne.ironLight, gloss: 0.7, mat: K.metal }));
    const I = A.ring(0.05);
    (i.sym(() =>
      i.g(pt(I[0] + 0.04, A.cy + 0.03, I[2] - 0.03, -24, 96, 0), () =>
        i.extrude(
          [
            [-0.1, 0.09],
            [0.1, 0.09],
            [0.11, -0.03],
            [0.04, -0.13],
            [-0.06, -0.11],
            [-0.11, -0.01],
          ],
          0.022,
          0.009,
        ),
      ),
    ),
      i.g(pt(0, A.cy + 0, I[2] - I[1] - 0.045, -20, 180, 0), () =>
        i.extrude(
          [
            [-0.15, 0.1],
            [0.15, 0.1],
            [0.17, -0.03],
            [0.08, -0.11],
            [-0.08, -0.11],
            [-0.17, -0.03],
          ],
          0.022,
          0.009,
        ),
      ));
  }
  i.bind(Zi(f, c, e.head)).paint(ne.redLight, { c2: ne.red, mat: K.fur });
  const C = A.cy + 0.34;
  (i.ball(0, C + 0.035, -0.015, 0.06, 0.05, 0.06, 1),
    af(i, [0, C + 0.03, -0.015], [0, 1, -0.2], 0.22, 0.06, {
      n: 3,
      seg: 5,
      curl: [0, -0.1, -0.25],
      tip: 0.35,
    }));
  for (let R = 0; R < 7; R++) {
    const I = (R / 7) * Math.PI * 2 + 0.5;
    af(
      i,
      [Math.cos(I) * 0.03, C + 0.04, Math.sin(I) * 0.03 - 0.015],
      [Math.cos(I) * 0.9, 0.75, Math.sin(I) * 0.9 - 0.1],
      0.24,
      0.05,
      {
        n: 3,
        seg: 4,
        curl: [Math.cos(I) * 0.1, -1, Math.sin(I) * 0.1],
        up: [-Math.sin(I), 0, Math.cos(I)],
        tip: 0.3,
      },
    );
  }
  (i.bone(e.propR),
    i.g(pt(-s.shoulderX, s.handY, 0), () => {
      (i.paint(ne.shaft, { c2: 8010282, gloss: 0.35, mat: K.leather }),
        i.tube(
          [
            [0, 0, Co.butt + 0.06, 0.027],
            [0, 0, 0.3, 0.029],
            [0, 0, 1.18, 0.031],
          ],
          { seg: 6 },
        ),
        i.paint(ne.leatherDark, { c2: ne.leather, gloss: 0.2, mat: K.leather }),
        i.tube(
          [
            [0, 0, -0.34, 0.033],
            [0, 0, 0.12, 0.034],
          ],
          { seg: 6, cap0: !1, cap1: !1 },
        ),
        i.paint(ne.brass, { c2: ne.brassDark, gloss: 1, mat: K.metal }),
        i.tube(
          [
            [0, 0, Co.butt - 0.07, 0.006],
            [0, 0, Co.butt, 0.04],
            [0, 0, Co.butt + 0.08, 0.034],
          ],
          { seg: 6, crease: 30 },
        ),
        i.tube(
          [
            [0, 0, 1.12, 0.036],
            [0, 0, 1.16, 0.05],
            [0, 0, 1.5, 0.05],
            [0, 0, 1.54, 0.036],
          ],
          { seg: 6, crease: 30 },
        ),
        i.paint(ne.steelDark, { c2: ne.steel, gloss: 1, mat: K.metal }),
        i.tube(
          [
            [0, 0, 1.53, 0.012, 0.03],
            [0, 0, 1.6, 0.014, 0.05],
            [0, 0, 1.76, 0.002, 0.004],
          ],
          { seg: 4, up: [1, 0, 0], crease: 0 },
        ),
        i.tube(
          [
            [0, 0.03, Co.head, 0.016, 0.085],
            [0, 0.14, Co.head, 0.014, 0.06],
            [0, 0.3, Co.head + 0.02, 0.002, 0.004],
          ],
          { seg: 4, up: [1, 0, 0], crease: 0 },
        ));
      const R = Co.head,
        I = [
          [0.13, 0.03],
          [0.17, 0.17],
          [0.3, 0.36],
          [0.42, 0.45],
          [0.38, 0.535],
          [0.25, 0.6],
          [0.085, 0.635],
          [-0.085, 0.635],
          [-0.25, 0.6],
          [-0.38, 0.535],
          [-0.42, 0.45],
          [-0.3, 0.36],
          [-0.17, 0.17],
          [-0.13, 0.03],
        ].map((F) => [R + F[0], F[1]]);
      (i.paint(ne.steelDark, { c2: ne.steel, gloss: 1, mat: K.metal }),
        i.g(pt(0, 0, 0, 180, -90, 0), () => i.extrude(I, 0.062, 0.027)),
        i.paint(ne.edge, { c2: 16769184, glow: 0.14, gloss: 1, mat: K.metal, line: 0 }));
      const P = [];
      for (let F = 0; F <= 8; F++) {
        const L = F / 8,
          B = bt(-1, 1, L);
        P.push([0, -(0.635 - 0.19 * B * B) - 0.004, R + B * 0.4, 0.012, 0.02 * (1 - 0.5 * B * B)]);
      }
      i.tube(P, { seg: 4, up: [1, 0, 0], crease: 0 });
      for (const F of [1, -1]) {
        (i.paint(ne.brass, { c2: 16765562, gloss: 1, mat: K.metal, line: 0 }),
          i.ball(F * 0.034, -0.37, R, 0.016, 0.05, 0.05, 0, 180),
          i.paint(ne.brassDark, { c2: ne.brass, gloss: 1, mat: K.metal, line: 0 }));
        for (let L = 0; L < 6; L++) {
          const B = (L / 6) * Math.PI * 2;
          i.ball(F * 0.03, -0.37 + Math.cos(B) * 0.105, R + Math.sin(B) * 0.105, 0.008, 0.042, 0.042, 0, 180);
        }
      }
    }),
    i.bind(Zi(_, v, e.propR)).paint(ne.redLight, { c2: ne.red, mat: K.fur }));
  for (let R = 0; R < 4; R++) {
    const I = (R / 4) * Math.PI * 2 + 0.6;
    af(
      i,
      [-s.shoulderX + Math.cos(I) * 0.03, s.handY - 0.03, 1.1 + Math.sin(I) * 0.03],
      [Math.cos(I) * 0.25, -1, Math.sin(I) * 0.25],
      0.3,
      0.036,
      { n: 3, seg: 4, tip: 0.3 },
    );
  }
  return (i.bakeGrounding(2.05), { h: n, b: i, extra: { gripR: a, aim: o, gripL: r } });
}

const dw = {
    stride: 2.75,
    stance: 0.4,
    lift: 0.26,
    bob: 0.06,
    drop: 0.07,
    lean: 14,
    sway: 0.05,
    twist: 12,
    width: 0.16,
    arm: 34,
    elbow: 56,
  },
  al = { gripR: [-0.17, 0.12, 0.32], aim: [-147, 40, -74], gripL: [0, -0.24, 0] };

function TU(n) {
  const t = ge(n, null, {
      hipsPos: [0, -0.05, 0],
      hips: [-2, -10, 0],
      spine: [-3, 4, 0],
      chest: [-3, 6, 0],
      neck: [2, 4, 0],
      head: [0, 4, 0],
      footL: [0.2, 0.09, 0.1, 0, 18],
      footR: [-0.22, 0.09, -0.08, 0, -26],
      ...al,
    }),
    e = ge(n, t, {
      hipsPos: [0.02, -0.06, -0.06],
      hips: [-4, -24, 0],
      spine: [-6, -12, 0],
      chest: [-8, -18, 0],
      head: [4, 30, 0],
      gripR: [-0.2, 0.2, 0.2],
      aim: [-150, 16, 0],
      gripL: [1, -0.22, 0],
    }),
    s = ge(n, t, {
      hipsPos: [-0.02, -0.16, 0.14],
      hips: [12, 14, 0],
      spine: [10, 8, 0],
      chest: [10, 12, 0],
      head: [-12, -18, 0],
      footL: [0.2, 0.09, 0.34, 0, 14],
      gripR: [0.02, 0, 0.46],
      aim: [12, 4, 0],
      gripL: [1, -0.22, 0],
    }),
    i = ge(n, s, { hips: [14, 20, 0], chest: [12, 16, 0], gripR: [0.08, -0.1, 0.4], aim: [28, 12, 0] }),
    a = zs([
      [0, t],
      [0.21, e, he.out],
      [0.35, s, he.in3],
      [0.5, i, he.out],
      [1, t, he.io],
    ]),
    o = ge(n, e, {
      hipsPos: [0.02, 0, -0.1],
      spine: [-12, -14, 0],
      chest: [-14, -22, 0],
      gripR: [-0.16, 0.3, 0.12],
      aim: [-168, 18, 0],
    }),
    r = ge(n, s, {
      hipsPos: [-0.02, -0.24, 0.18],
      hips: [18, 16, 0],
      spine: [14, 8, 0],
      gripR: [0.02, -0.16, 0.44],
      aim: [20, 4, 0],
    }),
    l = zs([
      [0, t],
      [0.23, o, he.out],
      [0.35, r, he.in3],
      [0.56, r, he.lin],
      [1, t, he.io],
    ]),
    c = ge(n, t, {
      hipsPos: [-0.02, -0.14, -0.04],
      hips: [6, 26, 0],
      spine: [6, 14, 0],
      chest: [6, 22, 0],
      head: [0, -34, 0],
      gripR: [-0.02, -0.2, 0.28],
      aim: [24, 150, -100],
      gripL: [1, -0.2, 0],
    }),
    f = ge(n, t, {
      hipsPos: [0.02, -0.06, 0.12],
      hips: [-4, -22, 0],
      spine: [-6, -12, 0],
      chest: [-8, -20, 0],
      head: [6, 36, 0],
      footL: [0.2, 0.09, 0.3, 0, 14],
      gripR: [-0.12, 0.08, 0.42],
      aim: [-12, -8, -105],
      gripL: [1, -0.2, 0],
    }),
    d = ge(n, f, { chest: [-12, -26, 0], gripR: [-0.18, 0.2, 0.32], aim: [-46, -46, -105] }),
    h = ge(n, t, {
      hips: [-3, -16, 0],
      chest: [-6, -8, 0],
      head: [2, 14, 0],
      gripR: [-0.24, 0.2, 0.33],
      aim: [-126, 82, -86],
      gripL: [0.5, -0.2, 0],
    }),
    u = zs([
      [0, t],
      [0.2, c, he.out],
      [0.35, f, he.in3],
      [0.5, d, he.out],
      [0.76, h, he.io],
      [1, t, he.io],
    ]),
    m = ge(n, t, {
      hipsPos: [0.03, -0.14, -0.06],
      hips: [2, -34, 0],
      spine: [0, -18, 0],
      chest: [-2, -26, 0],
      head: [0, 56, 0],
      footR: [-0.24, 0.09, -0.16, 0, -40],
      gripR: [-0.3, -0.1, 0.16],
      aim: [4, -110, 90],
      gripL: [1, -0.2, 0],
    }),
    x = ge(n, t, {
      hipsPos: [0, -0.18, 0.16],
      hips: [8, 14, 0],
      spine: [6, 10, 0],
      chest: [6, 14, 0],
      head: [-6, -20, 0],
      footL: [0.22, 0.09, 0.36, 0, 10],
      footR: [-0.22, 0.11, -0.26, 26, -30],
      gripR: [-0.04, -0.12, 0.44],
      aim: [8, 6, 90],
      gripL: [1, -0.2, 0],
    }),
    p = ge(n, x, {
      hips: [8, 34, 0],
      spine: [6, 16, 0],
      chest: [6, 26, 0],
      head: [-6, -50, 0],
      gripR: [0.14, -0.12, 0.3],
      aim: [8, 104, 90],
    }),
    g = zs([
      [0, t],
      [0.2, m, he.out],
      [0.4, x, he.in],
      [0.58, p, he.out],
      [0.74, p, he.lin],
      [1, t, he.io],
    ]),
    y = ge(n, null, {
      gripR: [al.gripR[0], al.gripR[1] + 0.02, al.gripR[2]],
      aim: [al.aim[0] + 2, al.aim[1], al.aim[2]],
      gripL: [-1, 0, 0],
    }),
    v = ge(n, null, {
      hipsPos: [0, -0.2, 0.1],
      hips: [36, -14, 0],
      spine: [10, 6, 0],
      chest: [6, 8, 0],
      neck: [-20, 0, 0],
      head: [-26, 4, 0],
      footL: [0.14, 0.12, 0.5, -20, 0],
      footR: [-0.14, 0.3, -0.62, 60, 0],
      gripR: [-0.06, -0.06, 0.46],
      aim: [6, 2, 0],
      gripL: [1, -0.22, 0],
    }),
    _ = ge(n, null, {
      hipsPos: [0, -0.12, 0],
      hips: [0, 0, 0],
      spine: [-4, 0, 0],
      chest: [-8, 0, 0],
      head: [8, 0, 0],
      footL: [0.22, 0.09, 0.06, 0, 20],
      footR: [-0.22, 0.09, -0.06, 0, -20],
      gripR: [-0.08, 0.06, 0.5],
      aim: [10, 0, -90],
      gripL: [1, -0.2, 0],
    }),
    k = ge(n, t, {
      hipsPos: [0, -0.1, 0],
      hips: [4, 0, 0],
      spine: [4, 0, 0],
      chest: [4, 0, 0],
      head: [12, 0, 0],
      footL: [0.2, 0.09, 0.04, 0, 14],
      footR: [-0.2, 0.09, -0.04, 0, -18],
      gripR: [-0.06, -0.02, 0.36],
      aim: [-96, 0, 90],
      gripL: [1, 0.36, 0],
    }),
    M = ge(n, t, {
      hipsPos: [0, -0.16, 0],
      chest: [-10, -20, 0],
      gripR: [-0.2, 0.12, 0.3],
      aim: [-60, -50, -90],
      gripL: [1, -0.2, 0],
    }),
    S = zs([
      [0, t],
      [0.55, M, he.out],
      [1, _, he.in],
    ]),
    b = Wh(n, t, {
      limp: { gripR: [-0.3, -0.26, 0.16], aim: [30, -20, 0], gripL: [-1, 0, 0] },
      lying: {
        armL: [-6, 0, 66],
        foreL: [-20, 0, 0],
        gripR: [-0.42, 0, 0.1],
        aim: [-4, -70, 90],
        gripL: [-1, 0, 0],
      },
    });
  return {
    stance: t,
    tmp: jl(n),
    atkA: a,
    atkB: u,
    atkX: l,
    s1: g,
    carry: y,
    dash: v,
    spin: _,
    channel: k,
    ult: S,
    common: b,
  };
}

const EU = [0, 0, 0],
  hw = [0, 0, 0, 1],
  Mp = new Float32Array(8);

const MgU = {
    ...Am,
    // 矮胖桶身：髋点放在桶中心附近，这样侧倒滚动的旋转轴就在肚子中间
    hipX: 0.48,
    shoulderX: 0.9,
    clavX: 0.3,
    pelvisY: 0.46,
    spineY: 0.72,
    chestY: 1.02,
    neckY: 1.24,
    headY: 1.34,
    shoulderY: 0.86,
    elbowY: 0.84,
    wristY: 0.82,
    handY: 0.8,
    hipY: 0.42,
    kneeY: 0.22,
    ankleY: 0.06,
  },
  MgC = {
    stalk: 15984592,
    stalkShade: 14271907,
    neck: 15127407,
    cap: 8138477,
    capDeep: 5972410,
    capLight: 10316543,
    gill: 15720648,
    spot: 16248805,
    blush: 15695854,
    mouth: 7019818,
    eye: 2825023,
  },
  MgW = {
    stride: 2.1,
    sway: 0.03,
    stance: 0.34,
    lift: 0.2,
    bob: 0.05,
    drop: 0.06,
    lean: 8,
    twist: 6,
    width: 0.19,
    arm: 26,
    elbow: 16,
  };

// 杯杯菇：粗胖菌柄 + 紫红大伞盖 + 短粗四肢，沿用通用骨架与姿势组
function bBg() {
  const HR = heroRig(),
    mesh = heroMesh(),
    t = new Ls();
  // 外部骨架：local 存父坐标系下的位移（solve 用）；bindWorld/bindQW 存绑定世界变换，
  // 蒙皮时现算 M = T(worldPos)·R(worldQ·bindQW⁻¹)·T(-bindWorld)，顶点留在绑定世界空间
  // 不能直接用 Wa.add：它把 local 当"世界差"算，而 glTF 的父骨骼是带旋转的
  const rig = {
    names: HR.names,
    parent: HR.parent,
    bind: new Float32Array(HR.names.length * 3),
    bindWorld: HR.bindWorld,
    bindQW: HR.bindWQ,
    local: HR.localPos,
    chains: [],
    get count() {
      return HR.names.length;
    },
  };
  const N = HR.names.length,
    jid = (k) => {
      const i = HR.names.indexOf(k);
      return i < 0 ? 0 : i;
    },
    rootJ = HR.parent.indexOf(-1),
    chestJ = jid("Spine02"),
    headJ = jid("Head");
  (t.bone(rootJ), t.rawMesh(mesh, { mat: K.skin, gloss: 0.34, line: 1, ao: 1 }));

  // 把重采样好的关键帧写进 pose（值已经是"相对绑定姿态的偏移"）
  const play = (R, name, time, loop) => {
    const a = heroAnim(name);
    if (!a) return;
    const span = a.dur,
      fpos = loop
        ? ((time % span) / span) * (a.frames - 1)
        : Math.min(a.frames - 1, (time / span) * (a.frames - 1)),
      f0 = Math.floor(fpos),
      f1 = Math.min(a.frames - 1, f0 + 1),
      w = fpos - f0,
      d = a.data;
    for (let j = 0; j < N; j++) {
      const o0 = (f0 * N + j) * 7,
        o1 = (f1 * N + j) * 7,
        p3 = j * 3,
        p4 = j * 4;
      ((R.t[p3] = d[o0] + (d[o1] - d[o0]) * w),
        (R.t[p3 + 1] = d[o0 + 1] + (d[o1 + 1] - d[o0 + 1]) * w),
        (R.t[p3 + 2] = d[o0 + 2] + (d[o1 + 2] - d[o0 + 2]) * w));
      const x = d[o0 + 3] + (d[o1 + 3] - d[o0 + 3]) * w,
        y = d[o0 + 4] + (d[o1 + 4] - d[o0 + 4]) * w,
        z = d[o0 + 5] + (d[o1 + 5] - d[o0 + 5]) * w,
        ww = d[o0 + 6] + (d[o1 + 6] - d[o0 + 6]) * w,
        l = Math.hypot(x, y, z, ww) || 1;
      ((R.q[p4] = x / l), (R.q[p4 + 1] = y / l), (R.q[p4 + 2] = z / l), (R.q[p4 + 3] = ww / l));
    }
  };
  // pose.q 存的是"绝对局部四元数"，所以静息态要填绑定值，不是单位四元数
  const rest = (R) => {
    R.t.fill(0);
    for (let j = 0; j < N; j++) {
      ((R.q[j * 4] = HR.bindQ[j * 4]),
        (R.q[j * 4 + 1] = HR.bindQ[j * 4 + 1]),
        (R.q[j * 4 + 2] = HR.bindQ[j * 4 + 2]),
        (R.q[j * 4 + 3] = HR.bindQ[j * 4 + 3]));
    }
  };

  const h = (R, I, P) => {
    const st = I.anim;
    if (st === "dead") {
      (play(R, "fall", Math.min(2.9, I.t * 3), false), (P.glow = Math.max(0.15, 1 - I.t * 1.2)));
      return;
    }
    if (st === "cast_s1" || st === "dash" || st === "roll") {
      // 放平横躺侧滚：先把身体放倒成水平 —— 头从朝上转成朝侧向、肚子仍朝前进方向，
      // 再绕头脚轴整圈滚，像圆木贴地向前滚。
      //   沿头脚轴回退半个身长让身体居中；抬到 r_max(=1.02) 让最低点刚好贴地。
      const ang = ((I.t || 0) * 620) % 360;
      (rest(R),
        R.add(rootJ, 0, 90, 0), // 放平：模型 +Z(头) → 世界 +X(侧向)
        R.add(rootJ, 0, 0, ang), // 绕头脚轴滚
        R.move(rootJ, -1.04, 1.02, 0),
        (P.glow = 2.4));
      return;
    }
    if (st === "attack" || st === "attack2") {
      (play(R, "box_01", I.t * 2.2, false), (P.glow = 1 + 1.4 * ho(I.p, 0.36, 0.2)));
      return;
    }
    if (st === "cast_s2" || st === "channel") {
      // fire 片段几乎是静止的持势，持续喷吐时叠一层高频抖动，避免看起来僵住
      const s = Math.sin(I.time * 13.5),
        c = Math.sin(I.time * 7.3);
      (play(R, "fire", I.t * 1.5, false),
        R.add(chestJ, -3.5 + s * 1.8, 0, c * 1.4),
        R.add(headJ, 2.5 + s * 2.6, c * 1.2, 0),
        R.move(rootJ, 0, s * 0.012, 0),
        (P.glow = 1 + 2 * ho(I.p, 0.45, 0.3)));
      return;
    }
    if (st === "cast_ult" || st === "spin") {
      (play(R, "front_kick_02", I.t * 1.38, false), (P.glow = 1 + 1.6 * I.p));
      return;
    }
    if (st === "hit" || st === "hurt") {
      (play(R, "hit_to_head", I.t * 1.83, false), (P.glow = 1));
      return;
    }
    if (st === "move" || st === "run") {
      // 片段被做成 in-place 之后，步幅是按 1.25 秒 2.24 米做的；单位实际移速 5.5，
      // 播放倍率要跟着提上去，否则脚会明显打滑
      (play(R, "run", I.time * 2.6, true), (P.glow = 1));
      return;
    }
    // 待机：这套模型没有 idle 片段，回绑定姿态 + 轻微呼吸
    const b = Math.sin(I.time * 2.2);
    (rest(R),
      R.add(chestJ, b * 1.6, 0, 0),
      R.add(headJ, -b * 1.2, 0, 0),
      R.move(rootJ, 0, b * 0.012, 0),
      (P.glow = 1 + 0.12 * Math.sin(I.time * 3)));
  };

  return (
    {
      key: "hero:mushroom",
      geometry: t.build(),
      map: heroMap(),
      rig,
      height: 2.0,
      radius: 0.95,
      scale: 1.0,
      stride: MgW.stride,
      triangles: t.triangleCount,
      attach: {
        head: { joint: headJ, x: 0, y: 0.3, z: 0 },
        chest: { joint: chestJ, x: 0, y: 0.08, z: 0 },
        handR: { joint: jid("R_Hand"), x: 0, y: -0.07, z: 0 },
        handL: { joint: jid("L_Hand"), x: 0, y: -0.07, z: 0 },
        weapon: { joint: jid("R_Hand"), x: 0, y: -0.05, z: 0 },
        muzzle: { joint: jid("R_Hand"), x: 0, y: -0.05, z: 0 },
      },
      blend: () => 0.12,
      animate: h,
    }
  );
}

// 手骨局部坐标 → 绑定世界坐标。
// 武器的握点和**方向**都必须写在手骨局部空间里：
// 局部轴约定（这几套 Tripo 骨架都一致）：X 掌背→掌心、Y 腕→指尖、Z 拇指→小指。
// 拳头是个**沿 Z 的握孔**（垂直于手指），所以柄轴要沿 Z，而不是沿世界竖直方向。
// 实测牛伟的手：局部 Z 在世界里是 (0.02,0.00,1.00) —— 正前方；局部 Y 是 (-0.44,-0.90,0.01) —— 朝下。
// 也就是说"世界竖直的柄"换算到局部是 (0.44,-0.90,0)，几乎和手指平行，
// 等于把柄从拳头里横着穿出去，看着像粘在手上 —— 这就是一直被说"柄方向不对"的原因。
// 按世界坐标硬偏移的坑：沿世界 -X 挪 0.118 实际等于沿局部 +X 挪 0.107，直接跑到手背外侧。
function handFrame(HR, j) {
  const q = [HR.bindWQ[j * 4], HR.bindWQ[j * 4 + 1], HR.bindWQ[j * 4 + 2], HR.bindWQ[j * 4 + 3]],
    rot = (v) => {
      const [x, y, z, w] = q,
        tx = 2 * (y * v[2] - z * v[1]),
        ty = 2 * (z * v[0] - x * v[2]),
        tz = 2 * (x * v[1] - y * v[0]);
      return [
        v[0] + w * tx + (y * tz - z * ty),
        v[1] + w * ty + (z * tx - x * tz),
        v[2] + w * tz + (x * ty - y * tx),
      ];
    };
  return {
    o: [HR.bindWorld[j * 3], HR.bindWorld[j * 3 + 1], HR.bindWorld[j * 3 + 2]],
    ax: rot([1, 0, 0]),
    ay: rot([0, 1, 0]),
    az: rot([0, 0, 1]),
  };
}

function handGripAt(HR, j, gx, gy, gz) {
  const F = handFrame(HR, j);
  return [0, 1, 2].map((k) => F.o[k] + gx * F.ax[k] + gy * F.ay[k] + gz * F.az[k]);
}

// 手骨局部坐标系 → 绑定世界 的 4×4（列 = 三个局部轴 + 握孔中心）。
// 武器的所有顶点都应该写在这个坐标系里，再整块变换出去 —— 这样柄轴天然跟着手走。
function handMatrix(HR, j, gx = 0, gy = 0, gz = 0) {
  const F = handFrame(HR, j),
    o = handGripAt(HR, j, gx, gy, gz),
    M = new Ke();
  return (
    M.set(
      F.ax[0], F.ay[0], F.az[0], o[0],
      F.ax[1], F.ay[1], F.az[1], o[1],
      F.ax[2], F.ay[2], F.az[2], o[2],
      0, 0, 0, 1,
    ),
    M
  );
}

// 牛伟：外部 GLB 网格（41 骨骼 / 5 段动画，Tripo 出品）+ 程序化补的一柄大斧。
// 模型本身没画武器，斧头用单骨骼刚性蒙皮挂在右手上，随手臂动画一起甩。
function bNw() {
  const HR = nwRig(),
    mesh = nwMesh(),
    t = new Ls();
  // 外部骨架：local 存父坐标系下的位移；bindWorld/bindQW 存绑定世界变换。
  // 蒙皮时现算 M = T(worldPos)·R(worldQ·bindQW⁻¹)·T(-bindWorld)，顶点留在绑定世界空间。
  const rig = {
    names: HR.names,
    parent: HR.parent,
    bind: new Float32Array(HR.names.length * 3),
    bindWorld: HR.bindWorld,
    bindQW: HR.bindWQ,
    local: HR.localPos,
    chains: [],
    get count() {
      return HR.names.length;
    },
  };
  const N = HR.names.length,
    jid = (k) => {
      const i = HR.names.indexOf(k);
      return i < 0 ? 0 : i;
    },
    rootJ = HR.parent.indexOf(-1),
    chestJ = jid("Spine02"),
    headJ = jid("Head"),
    handRJ = jid("R_Hand"),
    handLJ = jid("L_Hand"),
    upperRJ = jid("R_Upperarm"),
    upperLJ = jid("L_Upperarm");
  (t.bone(rootJ), t.rawMesh(mesh, { mat: K.skin, gloss: 0.34, line: 1, ao: 1 }));

  // ── 补一把八卦宣花斧 ────────────────────────────────────────
  // 顶点写在**手骨局部坐标系**里（M_AXE 整块变换到绑定世界），skin 全给右手骨骼
  // （weight=1 → 完全刚性跟随）。这样柄轴天然跟着手走，任何姿势下都"攥在手里"。
  // 注意：外部网格的 basecolor 是整片乘上去的，没法只给斧头关贴图，
  // 所以把斧头的 uv 钉死在一个接近纯白的贴图点上（实测 192/196/197），
  // 颜色再按 ~1.3 倍预补偿，乘完正好落回想要的金属/木柄色。
  // 握点（手骨局部空间，见 handFrame 上的说明）：
  // gx 0.02 / gy 0.16 = 拳头质心（实测 (0.02,0.17,-0.03)），柄从握孔正中穿过去
  // gz 0 = 握在柄的下三分之一（柄底 -0.46、柄顶 +0.92 都是相对握孔算的）
  const M_AXE = handMatrix(HR, handRJ, 0.02, 0.16, 0).multiply(
    // 作者坐标系 → 手骨局部：柄沿 +Y、刃往 -X、宽面 ±Z（沿用改造前的写法，只换原点）
    //   X→-X（刃往局部 +X = 世界里朝身体外侧）、Y→+Z（柄沿握孔）、Z→+Y（宽面法线沿手指方向）
    new Ke().set(-1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1),
  );
  const HX = 0,
    HY = 0,
    HZ = 0,
    // 柄底 -0.46（离地一拳），柄顶 +0.92（斧刃在肩侧，不挡前臂）
    botY = -0.46,
    topY = 0.92;
  (t.bone(handRJ), (t.uvX = 0.24), (t.uvY = 0.24));
  t.g(M_AXE, () => {

  // 木柄
  t.paint(0xe6b478, { gloss: 0.12, mat: K.leather, ao: 0.9, grain: 0.06 });
  t.tube(
    [
      [HX, botY, HZ, 0.044, 0.044],
      [HX, botY + 0.07, HZ, 0.055, 0.055],
      [HX, HY - 0.34, HZ, 0.047, 0.047],
      [HX, HY + 0.22, HZ, 0.049, 0.049],
      [HX, topY - 0.14, HZ, 0.052, 0.052],
      [HX, topY, HZ, 0.058, 0.058],
    ],
    { seg: 7, crease: 60 },
  );
  // 握把缠皮
  t.paint(0x7a6248, { gloss: 0.22, mat: K.leather, ao: 0.88 });
  t.tube(
    [
      [HX, HY - 0.22, HZ, 0.056, 0.056],
      [HX, HY - 0.14, HZ, 0.063, 0.063],
      [HX, HY + 0.09, HZ, 0.063, 0.063],
      [HX, HY + 0.17, HZ, 0.056, 0.056],
    ],
    { seg: 8, crease: 50 },
  );
  // 柄底铜箍
  t.paint(0xf2c46a, { gloss: 0.62, mat: K.metal, ao: 0.95 });
  t.tube(
    [
      [HX, botY - 0.03, HZ, 0.026, 0.026],
      [HX, botY + 0.01, HZ, 0.068, 0.068],
      [HX, botY + 0.09, HZ, 0.064, 0.064],
      [HX, botY + 0.12, HZ, 0.05, 0.05],
    ],
    { seg: 8, crease: 50 },
  );
  // 斧头套箍
  t.paint(0xbfc4cc, { gloss: 0.72, mat: K.metal, ao: 0.95 });
  t.tube(
    [
      [HX, topY - 0.34, HZ, 0.062, 0.062],
      [HX, topY - 0.28, HZ, 0.078, 0.078],
      [HX, topY - 0.02, HZ, 0.078, 0.078],
      [HX, topY + 0.05, HZ, 0.056, 0.056],
    ],
    { seg: 8, crease: 50 },
  );
  // 斧刃：在「左右→上下」平面上画轮廓再挤厚度（不转向 = 刃面正对角色正前方，正面看是一整块宽刃）
  // 主体往 -X（远离身体）甩出去，靠身体一侧留一小块反刃，两侧都有刃口才像双刃宣花斧
  const MB = new Ke();
  (MB.setPosition(HX, topY, HZ),
    t.paint(0xa9b3c2, { c2: 0xd7dee9, gloss: 0.9, mat: K.metal, ao: 1 }),
    t.g(MB, () =>
      t.extrude(
        [
          [0.24, 0.12],
          [0.04, 0.2],
          [-0.08, 0.36],
          [-0.3, 0.33],
          [-0.5, 0.18],
          [-0.58, -0.02],
          [-0.48, -0.22],
          [-0.3, -0.36],
          [-0.1, -0.44],
          [0.02, -0.28],
          [0.24, -0.18],
        ],
        0.085,
        0.045,
      ),
    ));
  // 斧面上的铜铆钉（刃面两侧各两颗，给平贴的刃面加点体积感）
  t.paint(0xf2c46a, { gloss: 0.7, mat: K.metal, ao: 0.95 });
  for (const s of [-1, 1]) {
    t.ball(HX - 0.03, topY + 0.12, HZ + s * 0.046, 0.028, 0.028, 0.014, 1);
    t.ball(HX - 0.03, topY - 0.1, HZ + s * 0.046, 0.028, 0.028, 0.014, 1);
  }
  });

  // 把关键帧写进 pose（值已经是"相对绑定姿态的偏移"）
  const play = (R, name, time, loop) => {
    const a = nwAnim(name);
    if (!a) return;
    const span = a.dur,
      fpos = loop
        ? ((time % span) / span) * (a.frames - 1)
        : Math.min(a.frames - 1, (time / span) * (a.frames - 1)),
      f0 = Math.floor(fpos),
      f1 = Math.min(a.frames - 1, f0 + 1),
      w = fpos - f0,
      d = a.data;
    for (let j = 0; j < N; j++) {
      const o0 = (f0 * N + j) * 7,
        o1 = (f1 * N + j) * 7,
        p3 = j * 3,
        p4 = j * 4;
      ((R.t[p3] = d[o0] + (d[o1] - d[o0]) * w),
        (R.t[p3 + 1] = d[o0 + 1] + (d[o1 + 1] - d[o0 + 1]) * w),
        (R.t[p3 + 2] = d[o0 + 2] + (d[o1 + 2] - d[o0 + 2]) * w));
      const x = d[o0 + 3] + (d[o1 + 3] - d[o0 + 3]) * w,
        y = d[o0 + 4] + (d[o1 + 4] - d[o0 + 4]) * w,
        z = d[o0 + 5] + (d[o1 + 5] - d[o0 + 5]) * w,
        ww = d[o0 + 6] + (d[o1 + 6] - d[o0 + 6]) * w,
        l = Math.hypot(x, y, z, ww) || 1;
      ((R.q[p4] = x / l), (R.q[p4 + 1] = y / l), (R.q[p4 + 2] = z / l), (R.q[p4 + 3] = ww / l));
    }
  };
  // pose.q 存绝对局部四元数，静息态要填绑定值
  const rest = (R) => {
    R.t.fill(0);
    for (let j = 0; j < N; j++) {
      ((R.q[j * 4] = HR.bindQ[j * 4]),
        (R.q[j * 4 + 1] = HR.bindQ[j * 4 + 1]),
        (R.q[j * 4 + 2] = HR.bindQ[j * 4 + 2]),
        (R.q[j * 4 + 3] = HR.bindQ[j * 4 + 3]));
    }
  };

  // 绑定姿态是双臂外张的 A 姿（上臂几乎横着出去），没有 idle 片段可放的时候直接 rest()
  // 出来就是"T 姿势"。这里手动把两条上臂放下来 26°，左手腕再回正 12°。
  // 右手要额外绕**手骨 X 轴（掌背→掌心）翻 90°**：把拳头的"握孔"从朝正前方转成朝上，
  // 斧柄才会竖起来。不翻的话柄虽然已经垂直于手指了，但会横着指向正前方（像端着长矛）。
  const ARM_DOWN = 26,
    ARM_WRIST = 12,
    HAND_ROLL = 90,
    armsDown = (R) => (
      R.add(upperRJ, 0, 0, ARM_DOWN),
      R.add(upperLJ, 0, 0, -ARM_DOWN),
      R.add(handRJ, HAND_ROLL, 0, 0),
      R.add(handRJ, 0, 0, -ARM_WRIST),
      R.add(handLJ, 0, 0, ARM_WRIST),
      R
    );

  // 片段映射：run→移动、box_03→普攻、chop→技能挥砍、dance_05→大招转圈、defeat_03→阵亡
  const h = (R, I, P) => {
    const st = I.anim;
    if (st === "dead") {
      (play(R, MOD.deathAnim, Math.min(3.2, I.t * 3), false),
        (P.glow = Math.max(0.15, 1 - I.t * 1.2)));
      return;
    }
    if (st === "cast_s1") {
      (play(R, "chop", I.t * 2.4, false), (P.glow = 1 + 2.2 * ho(I.p, 0.42, 0.3)));
      return;
    }
    if (st === "cast_s2" || st === "dash" || st === "roll") {
      // 半路杀出：直接用挥砍片段的后半段，看起来像提斧冲上去劈一刀
      (play(R, "chop", 1.5 + I.t * 1.8, false), (P.glow = 2.2));
      return;
    }
    if (st === "attack" || st === "attack2") {
      (play(R, "box_03", I.t * 2.2, false), (P.glow = 1 + 1.4 * ho(I.p, 0.36, 0.2)));
      return;
    }
    if (st === "channel") {
      const s = Math.sin(I.time * 13.5),
        c = Math.sin(I.time * 7.3);
      (play(R, "box_03", I.t * 1.6, false),
        R.add(chestJ, -3.5 + s * 1.8, 0, c * 1.4),
        R.add(headJ, 2.5 + s * 2.6, c * 1.2, 0),
        R.move(rootJ, 0, s * 0.012, 0),
        (P.glow = 1 + 2 * ho(I.p, 0.45, 0.3)));
      return;
    }
    if (st === "cast_ult" || st === "spin") {
      // 抡圆了砍：拿舞蹈片段当整体转身，正好是一圈一圈的旋身
      (play(R, "dance_05", I.t * 2.2, false), (P.glow = 1 + 1.6 * I.p));
      return;
    }
    if (st === "hit" || st === "hurt") {
      const k = Math.max(0, 1 - I.t * 3.5);
      (rest(R),
        armsDown(R),
        R.add(chestJ, -9 * k, 0, 6 * k),
        R.add(headJ, -7 * k, 0, 0),
        (P.glow = 1));
      return;
    }
    if (st === "move" || st === "run") {
      (play(R, "run", I.time * 2.2, true), (P.glow = 1));
      return;
    }
    // 待机：这套片段里没有 idle，回绑定姿态 + 把手臂放下来 + 轻微呼吸
    const b = Math.sin(I.time * 2.2);
    (rest(R),
      armsDown(R),
      R.add(chestJ, b * 1.6, 0, 0),
      R.add(headJ, -b * 1.2, 0, 0),
      R.move(rootJ, 0, b * 0.012, 0),
      (P.glow = 1 + 0.12 * Math.sin(I.time * 3)));
  };

  return {
    key: "hero:chijin",
    geometry: t.build(),
    map: nwMap(),
    rig,
    height: 2.15,
    radius: 0.7,
    scale: 1.0,
    stride: MgW.stride,
    triangles: t.triangleCount,
    attach: {
      head: { joint: headJ, x: 0, y: 0.3, z: 0 },
      chest: { joint: chestJ, x: 0, y: 0.1, z: 0 },
      handR: { joint: handRJ, x: 0, y: -0.07, z: 0 },
      handL: { joint: handLJ, x: 0, y: -0.07, z: 0 },
      weapon: { joint: handRJ, x: 0, y: 0.1, z: 0 },
      muzzle: { joint: handRJ, x: 0, y: 0.1, z: 0 },
    },
    blend: () => 0.12,
    animate: h,
  };
}

// 牛魔：和牛伟同一套牛头人网格，换成熔岩色调 + 一柄十字巨剑。
// 网格贴图不能按英雄换，所以用 rawMesh 的 color 参数给整体压一层暖红。
function buildNiumo(MOD) {
  const HR = MOD.rig(),
    mesh = MOD.mesh(),
    t = new Ls();
  const rig = {
    names: HR.names,
    parent: HR.parent,
    bind: new Float32Array(HR.names.length * 3),
    bindWorld: HR.bindWorld,
    bindQW: HR.bindWQ,
    local: HR.localPos,
    chains: [],
    get count() {
      return HR.names.length;
    },
  };
  const N = HR.names.length,
    jid = (k) => {
      const i = HR.names.indexOf(k);
      return i < 0 ? 0 : i;
    },
    rootJ = HR.parent.indexOf(-1),
    chestJ = jid("Spine02"),
    headJ = jid("Head"),
    handRJ = jid("R_Hand"),
    handLJ = jid("L_Hand"),
    upperRJ = jid("R_Upperarm"),
    upperLJ = jid("L_Upperarm");
  (t.bone(rootJ),
    t.rawMesh(mesh, { mat: K.skin, gloss: 0.34, line: 1, ao: 1, color: [1.22, 0.8, 0.66] }));

  // ── 十字巨剑 ────────────────────────────────────────────────
  // 剑身立着握在右手里：剑格做成横向大十字，剑身中间一道发光竖槽。
  // 剑柄要够长——手腕点 HY 落在柄的中段，手下还留一截，才看得出是「握着」而不是「顶着」。
  // 剑柄同样穿过拳头质心（偏移量跟牛伟的斧头一样）
  // 握点同样走手骨局部空间（见 handGripAt）：每套网格的手大小/朝向都不一样，
  // 世界偏移写死一个值会握到空气里，甚至穿到手背外面。
  const [HX, HY, HZ] = handGripAt(HR, handRJ, MOD.grip[0], MOD.grip[1], MOD.grip[2]),
    pommelY = HY - 0.62,
    guardY = HY + 0.14,
    bladeY = HY + 0.18,
    tipY = HY + 1.24;
  (t.bone(handRJ), (t.uvX = 0.24), (t.uvY = 0.24));

  // 剑柄 + 柄头
  t.paint(0x6b5038, { gloss: 0.2, mat: K.leather, ao: 0.9, grain: 0.05 });
  t.tube(
    [
      [HX, pommelY + 0.04, HZ, 0.045, 0.045],
      [HX, pommelY + 0.13, HZ, 0.055, 0.055],
      [HX, HY - 0.34, HZ, 0.052, 0.052],
      [HX, HY - 0.06, HZ, 0.054, 0.054],
      [HX, HY + 0.04, HZ, 0.058, 0.058],
      [HX, guardY - 0.06, HZ, 0.05, 0.05],
    ],
    { seg: 7, crease: 50 },
  );
  // 握把缠皮：正好压在拳头那一段
  t.paint(0x4a382a, { gloss: 0.24, mat: K.leather, ao: 0.88 });
  t.tube(
    [
      [HX, HY - 0.32, HZ, 0.056, 0.056],
      [HX, HY - 0.25, HZ, 0.066, 0.066],
      [HX, HY + 0.02, HZ, 0.066, 0.066],
      [HX, HY + 0.08, HZ, 0.057, 0.057],
    ],
    { seg: 8, crease: 50 },
  );
  t.paint(0xf2c46a, { gloss: 0.7, mat: K.metal, ao: 0.95 });
  t.ball(HX, pommelY + 0.02, HZ, 0.07, 0.06, 0.07, 1);

  // 十字剑格：横条 + 两端上翘
  t.paint(0x9aa3b0, { c2: 0xc6cfda, gloss: 0.8, mat: K.metal, ao: 1 });
  t.box(HX, guardY, HZ, 0.74, 0.095, 0.14, 0.03);
  for (const s of [-1, 1]) {
    t.box(HX + s * 0.39, guardY + 0.055, HZ, 0.11, 0.16, 0.12, 0.03);
    t.ball(HX + s * 0.39, guardY + 0.15, HZ, 0.05, 0.05, 0.05, 1);
  }

  // 剑身：左右对称的长条，靠近剑尖收成尖
  const MB = new Ke();
  (MB.setPosition(HX, bladeY, HZ),
    t.paint(0xaeb8c6, { c2: 0xdbe3ee, gloss: 0.9, mat: K.metal, ao: 1 }),
    t.g(MB, () =>
      t.extrude(
        [
          [0.115, 0.02],
          [0.115, 0.72],
          [0.085, 0.93],
          [0.0, 1.06],
          [-0.085, 0.93],
          [-0.115, 0.72],
          [-0.115, 0.02],
        ],
        0.075,
        0.028,
      ),
    ));
  // 剑身中槽的长明火
  t.paint(0xff9a4a, { gloss: 0.2, mat: K.crystal, ao: 1, glow: 2.4 });
  t.box(HX, bladeY + 0.42, HZ, 0.042, 0.66, 0.098, 0.012);
  t.box(HX, guardY, HZ, 0.1, 0.1, 0.2, 0.02);

  // 把关键帧写进 pose
  const play = (R, name, time, loop) => {
    const a = MOD.anim(name);
    if (!a) return;
    const span = a.dur,
      fpos = loop
        ? ((time % span) / span) * (a.frames - 1)
        : Math.min(a.frames - 1, (time / span) * (a.frames - 1)),
      f0 = Math.floor(fpos),
      f1 = Math.min(a.frames - 1, f0 + 1),
      w = fpos - f0,
      d = a.data;
    for (let j = 0; j < N; j++) {
      const o0 = (f0 * N + j) * 7,
        o1 = (f1 * N + j) * 7,
        p3 = j * 3,
        p4 = j * 4;
      ((R.t[p3] = d[o0] + (d[o1] - d[o0]) * w),
        (R.t[p3 + 1] = d[o0 + 1] + (d[o1 + 1] - d[o0 + 1]) * w),
        (R.t[p3 + 2] = d[o0 + 2] + (d[o1 + 2] - d[o0 + 2]) * w));
      const x = d[o0 + 3] + (d[o1 + 3] - d[o0 + 3]) * w,
        y = d[o0 + 4] + (d[o1 + 4] - d[o0 + 4]) * w,
        z = d[o0 + 5] + (d[o1 + 5] - d[o0 + 5]) * w,
        ww = d[o0 + 6] + (d[o1 + 6] - d[o0 + 6]) * w,
        l = Math.hypot(x, y, z, ww) || 1;
      ((R.q[p4] = x / l), (R.q[p4 + 1] = y / l), (R.q[p4 + 2] = z / l), (R.q[p4 + 3] = ww / l));
    }
  };
  const rest = (R) => {
    R.t.fill(0);
    for (let j = 0; j < N; j++) {
      ((R.q[j * 4] = HR.bindQ[j * 4]),
        (R.q[j * 4 + 1] = HR.bindQ[j * 4 + 1]),
        (R.q[j * 4 + 2] = HR.bindQ[j * 4 + 2]),
        (R.q[j * 4 + 3] = HR.bindQ[j * 4 + 3]));
    }
  };

  // 绑定姿态双臂外张，没有 idle 片段，rest() 出来就是 T 姿势。
  // 待机/受击这类"没有片段"的状态手动把上臂放下来，手腕回正一点让剑跟着竖直。
  // 下放角度按模型给：牛伟那套绑定姿态本来就是 A 姿，26° 就够；
  // 牛魔两个形态都是标准 T 姿势（手臂完全水平），得放到 70° 以上才像自然站立。
  const armsDown = (R) => (
    R.add(upperRJ, 0, 0, MOD.armDown),
    R.add(upperLJ, 0, 0, -MOD.armDown),
    R.add(handRJ, 0, 0, -MOD.armWrist),
    R.add(handLJ, 0, 0, MOD.armWrist),
    R
  );

  const h = (R, I, P) => {
    const st = I.anim;
    if (st === "dead") {
      (play(R, MOD.deathAnim, Math.min(3.2, I.t * 3), false),
        (P.glow = Math.max(0.15, 1 - I.t * 1.2)));
      return;
    }
    if (st === "cast_s1") {
      // 这具牛头人只有 5 个片段（box_03/chop/dance_05/defeat_03/run），
      // box_03 是蹲伏出拳、chop 是 6.5 秒趴地长循环，拿来当挥剑都不像。
      // 所以挥砍直接用 rest 打底 + 躯干/头/持剑手叠欧拉角，姿势可控也够读。
      rest(R);
      const k = Math.sin(Math.min(1, Math.max(0, I.p)) * Math.PI),
        w = Math.sin(Math.min(1, I.p / 0.35) * Math.PI * 0.5); // 起手抬得早、落得慢
      (R.add(chestJ, -2 - 8 * k, 24 * k - 6 * w, 0),
        R.add(headJ, 2 + 6 * k, -14 * k, 0),
        R.add(handRJ, -52 * k - 22 * w, 0, 0),
        (P.glow = 1 + 2.6 * ho(I.p, 0.42, 0.3)));
      return;
    }
    if (st === "cast_s2" || st === "dash" || st === "roll") {
      // 烈焰行军：边往前走边喷火，用跑步片段顶着
      (play(R, MOD.runAnim, I.time * 2.2, true), (P.glow = 2.2));
      return;
    }
    if (st === "attack" || st === "attack2") {
      // 普攻也是 box_03（蹲伏出拳），同样换成站姿甩剑
      rest(R);
      const k = Math.sin(Math.min(1, Math.max(0, I.p)) * Math.PI);
      (R.add(chestJ, -3 - 9 * k, 18 * k, 0),
        R.add(headJ, 2 + 5 * k, -9 * k, 0),
        R.add(handRJ, -38 * k, 0, 0),
        (P.glow = 1 + 1.6 * ho(I.p, 0.36, 0.2)));
      return;
    }
    if (st === "channel") {
      const s = Math.sin(I.time * 13.5);
      (rest(R),
        R.add(chestJ, -3 + s * 1.8, 0, 0),
        (P.glow = 1 + 2 * ho(I.p, 0.45, 0.3)));
      return;
    }
    if (st === "cast_ult" || st === "spin") {
      // 变身：后仰咆哮 + 双手（持剑手）往两侧张开，靠 glow 拉满表现力
      rest(R);
      const k = Math.min(1, I.p / 0.3),
        b = Math.sin(I.time * 9) * 1.6;
      (R.add(chestJ, 10 * k + b, 0, 0),
        R.add(headJ, 14 * k + b, 0, 0),
        R.add(handRJ, -70 * k, 0, 26 * k),
        R.add(handLJ, -70 * k, 0, -26 * k),
        R.move(rootJ, 0, -0.06 * k, 0),
        (P.glow = 1 + 2.4 * k));
      return;
    }
    if (st === "hit" || st === "hurt") {
      const k = Math.max(0, 1 - I.t * 3.5);
      (rest(R),
        armsDown(R),
        R.add(chestJ, -9 * k, 0, 6 * k),
        R.add(headJ, -7 * k, 0, 0),
        (P.glow = 1));
      return;
    }
    if (st === "move" || st === "run") {
      (play(R, MOD.runAnim, I.time * 2.2, true), (P.glow = 1.2));
      return;
    }
    const b = Math.sin(I.time * 2.2);
    (rest(R),
      armsDown(R),
      R.add(chestJ, b * 1.6, 0, 0),
      R.add(headJ, -b * 1.2, 0, 0),
      R.move(rootJ, 0, b * 0.012, 0),
      (P.glow = 1.15 + 0.2 * Math.sin(I.time * 3)));
  };

  return {
    key: MOD.key,
    geometry: t.build(),
    map: MOD.map(),
    rig,
    height: MOD.height,
    radius: MOD.radius,
    scale: 1.0,
    stride: MgW.stride,
    triangles: t.triangleCount,
    attach: {
      head: { joint: headJ, x: 0, y: 0.3, z: 0 },
      chest: { joint: chestJ, x: 0, y: 0.1, z: 0 },
      handR: { joint: handRJ, x: 0, y: -0.07, z: 0 },
      handL: { joint: handLJ, x: 0, y: -0.07, z: 0 },
      weapon: { joint: handRJ, x: 0, y: 1.28, z: 0 },
      muzzle: { joint: handRJ, x: 0, y: 1.28, z: 0 },
    },
    blend: () => 0.12,
    animate: h,
  };
}

// 牛魔有两个形态：常规（穿铠甲那版）和开大变身。两套模型骨架完全一致，
// 所以只把「网格/贴图/动画/关键参数」抽成 MOD 传进来，姿态逻辑共用一份。
const NM_BASE = { rig: nmRig, mesh: nmMesh, map: nmMap, anim: nmAnim, key: "hero:niumo", height: 2.15, radius: 0.74, runAnim: "walk", deathAnim: "defeat_03", grip: [-0.06, 0.14, 0.02], armDown: 74, armWrist: 55 },
  NM_ULT = { rig: nm2Rig, mesh: nm2Mesh, map: nm2Map, anim: nm2Anim, key: "hero:niumo2", height: 2.15, radius: 0.74, runAnim: "run", deathAnim: "fall", grip: [-0.03, 0.15, 0.02], armDown: 74, armWrist: 55 };
const bNm = () => buildNiumo(NM_BASE),
  bNm2 = () => buildNiumo(NM_ULT);


function AU() {
  const { h: n, b: t, extra: e } = SU(),
    s = TU(n),
    i = n.J,
    a = n.rig,
    o = s.tmp,
    r = t.build(),
    l = e.gripR * 3,
    c = e.aim * 3,
    f = e.gripL * 3,
    d = (u, m, x = 0) => {
      if (
        (P0(n, u, -1, i.chest, m[l], m[l + 1], m[l + 2], -0.7, -0.55, -0.45),
        Tm(a, u, i.handR, EU, hw),
        Em(u, i.propR, hw, m[c], m[c + 1], m[c + 2]),
        x !== 0)
      ) {
        const g = u.q,
          y = i.propR * 4,
          v = g[y],
          _ = g[y + 1],
          k = g[y + 2],
          M = g[y + 3];
        u.pos(i.propR, 2 * (v * k + M * _) * -x, 2 * (_ * k - M * v) * -x, (1 - 2 * (v * v + _ * _)) * -x);
      }
      const p = m[f];
      if (!(p < -0.5) && (P0(n, u, 1, i.hips, 0.262, 0.09, 0.07, 1, -0.15, -0.6), p > 0.01)) {
        const g = u.q;
        for (let y = 0; y < 4; y++) ((Mp[y] = g[i.armL * 4 + y]), (Mp[4 + y] = g[i.foreL * 4 + y]));
        (P0(n, u, 1, i.propR, 0, 0, m[f + 1], 0.7, -0.6, -0.25),
          p < 0.99 && (S0(g, i.armL * 4, Mp, 0, p), S0(g, i.foreL * 4, Mp, 4, p)));
      }
    },
    h = (u, m, x) => {
      const p = s.common;
      if (jh(n, u, m.anim === "leap" ? "airborne" : m.anim, m.t, m.p, m.time, p)) {
        (d(u, (m.anim === "dead" ? p.tmp : m.anim === "stunned" ? p.stun : p.air).e),
          m.anim === "dead" && (x.glow = Math.max(0.15, 1 - m.t * 1.2)));
        return;
      }
      switch (m.anim) {
        case "move": {
          (Mf(n, u, m.stride, dw, () => {
            const g = Math.cos(m.stride * Math.PI * 2);
            (u.add(i.chest, 0, 0, g * 3), u.add(i.head, 0, 0, -g * 2));
          }),
            nf(o, s.carry),
            (o.e[c] += Math.sin(m.stride * Math.PI * 4) * 2.5),
            d(u, o.e));
          break;
        }
        case "attack": {
          const g = Vh(m.p, m.windup),
            y = (m.mode & 1) !== 0;
          (ta(y ? s.atkX : m.variant % 2 === 0 ? s.atkA : s.atkB, g, o),
            Un(n, u, o),
            d(u, o.e),
            (x.glow = 1 + (y ? 3.2 : 1.4) * ho(g, 0.36, 0.2)));
          break;
        }
        case "cast_s1": {
          (ta(s.s1, m.p, o), Un(n, u, o), d(u, o.e), (x.glow = 1 + 2.4 * ho(m.p, 0.42, 0.3)));
          break;
        }
        case "cast_s2":
        case "dash": {
          (Un(n, u, s.dash), d(u, s.dash.e), (x.glow = 2.4));
          break;
        }
        case "cast_ult": {
          (ta(s.ult, m.p, o), Un(n, u, o), d(u, o.e), (x.glow = 1 + 1.6 * m.p));
          break;
        }
        case "spin": {
          (nf(o, s.spin),
            Un(n, u, o, () => {
              const g = m.t,
                y = g < 0.15 ? ((g * g) / 0.3) * 2.4 : (g - 0.075) * 2.4;
              (u.rot(i.root, 0, -y * 360, 0), u.add(i.spine, 0, 0, 4 * Math.sin(g * 9)));
            }),
            d(u, o.e),
            (x.glow = 2.6));
          break;
        }
        case "channel": {
          (Un(n, u, s.channel, () => {
            Yo(n, u, m.time, m.seed, 0.8);
          }),
            d(u, s.channel.e, 0.5),
            (x.glow = 1 + 0.5 * (0.5 + 0.5 * Math.sin(m.time * 5))));
          break;
        }
        default: {
          nf(o, s.stance);
          const g = (m.time * 0.28 + m.seed) % 1,
            y = ho(g, 0.5, 0.06);
          ((o.e[l + 1] += y * 0.035),
            (o.e[c] += y * 5 + Math.sin(m.time * 1.3) * 1.2),
            Un(n, u, o, () => {
              Yo(n, u, m.time, m.seed, 1.2);
            }),
            d(u, o.e),
            (x.glow = 1 + 0.12 * Math.sin(m.time * 3)));
        }
      }
    };
  return {
    key: "hero:chijin",
    geometry: r,
    rig: n.rig,
    height: 2.3,
    radius: 0.64,
    scale: fw,
    stride: dw.stride * fw,
    triangles: t.triangleCount,
    attach: {
      head: { joint: i.head, x: 0, y: 0.25, z: 0 },
      chest: { joint: i.chest, x: 0, y: 0.08, z: 0 },
      handR: { joint: i.handR, x: 0, y: -0.07, z: 0 },
      handL: { joint: i.handL, x: 0, y: -0.07, z: 0 },
      weapon: { joint: i.propR, x: 0, y: -0.4, z: Co.head },
      muzzle: { joint: i.propR, x: 0, y: -0.4, z: Co.head },
    },
    blend: (u, m) =>
      m === "attack" || m === "dash" || m === "cast_s2"
        ? 0.07
        : m === "dead"
          ? 0.05
          : u === "dash" || u === "spin"
            ? 0.18
            : 0.13,
    animate: h,
  };
}

const jt = {
    robe: 3108728,
    robeDark: 1919570,
    pants: 2832704,
    pantsDark: 1713451,
    wrap: 12168850,
    wrapDark: 8747874,
    leather: 9069112,
    leatherDark: 5914146,
    leatherLight: 11107660,
    iron: 5857643,
    ironLight: 9410723,
    brass: 13212229,
    brassDark: 9069862,
    skin: 14263678,
    hair: 2763310,
    hairHi: 6974064,
    cap: 1841952,
    capHi: 3815490,
    pheasant: 10515010,
    pheasantTip: 2759698,
    lining: 15327951,
    liningShade: 12564126,
    lacquer: 3811874,
    lacquerDark: 1905938,
    bone: 15260864,
    silk: 11547690,
    shaft: 13150304,
    head: 6975608,
    feather: 16052712,
    featherShade: 13223094,
    jade: 15134688,
  },
  RU = { ...Am, hipX: 0.125, shoulderX: 0.31, clavX: 0.09, elbowY: 1.05, wristY: 0.76, handY: 0.67 },
  uw = 1.2,
  pw = Math.PI / 180,
  Ra = { tip: 0.86, string: 0.2 };
export { Ls, Bl, Zi, Li, Js, qh, Cm, Xh, Ox, Wd, af, Bx, R8, _p, Ko, AU, bBg, bNw, bNm, bNm2, jt, RU, uw, pw, Ra };
