// 22-render-6.js — render｜65 个顶层语句｜60KB
// 对应 game.pretty.js 第 42949–45215 行
// 关键内容：
//   tN                    光束：横向软边 + 沿束方向的条纹(几道粗细不一的光缕
//   sN                    ridge
//   $N                    ridge
//   u3                    frost_golem
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { Cr, Fh, fi, mo } from './04-audio-2.js';
import { Je, Ri, dt } from './05-three.js';
import { Ke, sa } from './06-three-2.js';
import { An, Qs, kM } from './07-three-3.js';
import { Gl } from './08-three-4.js';
import { Yt, fs, ke, nn, un } from './14-three-7.js';
import { CL, aa, as } from './15-render-4.js';
import { Be, Er, Fn, Ht, Ir, Jz, Lx, Mn, Pt, Px, ci, xf, y8, yt } from './21-core-4.js';

const tN = `
attribute vec4 aTint;
attribute vec2 aKind;
varying vec2 vUv;
varying vec4 vTint;
varying vec2 vKind;
varying vec3 vWorld;
void main() {
  vUv = uv;
  vTint = aTint;
  vKind = aKind;
  vec4 wp = modelMatrix * instanceMatrix * vec4(position, 1.0);
  vWorld = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`,
  eN = `
uniform sampler2D tNoise;
uniform float uTime;
varying vec2 vUv;
varying vec4 vTint;
varying vec2 vKind;
varying vec3 vWorld;
void main() {
  float kind = vKind.x;
  float seed = vKind.y;
  float t = uTime;
  vec3 rgbOut;
  float aOut;
  if (kind < 0.5) {
    // 光束：横向软边 + 沿束方向的条纹(几道粗细不一的光缕)，上端渐隐、落地处也收掉
    float across = smoothstep(0.0, 0.3, vUv.x) * smoothstep(1.0, 0.7, vUv.x);
    float shafts = texture2D(tNoise, vec2(vUv.x * 0.37 + seed, vUv.y * 0.05 + t * 0.006 + seed * 3.0)).g;
    float drift = texture2D(tNoise, vec2(vUv.x * 0.9 + seed * 2.0 - t * 0.004, vUv.y * 0.3 - t * 0.012)).r;
    float along = smoothstep(0.0, 0.12, vUv.y) * (1.0 - smoothstep(0.45, 1.0, vUv.y));
    float a = across * along * smoothstep(0.32, 0.7, shafts) * (0.55 + 0.9 * drift) * vTint.a;
    rgbOut = vTint.rgb * a;
    aOut = 0.0;
  } else if (kind < 1.5) {
    // 雾片：径向软边 + 两层反向漂移的噪声
    vec2 c = vUv - 0.5;
    float edge = 1.0 - smoothstep(0.18, 0.5, length(c));
    float n1 = texture2D(tNoise, vWorld.xz * 0.031 + vec2(t * 0.006, -t * 0.004) + seed).r;
    float n2 = texture2D(tNoise, vWorld.xz * 0.074 - vec2(t * 0.009, t * 0.005) + seed * 2.0).g;
    float a = edge * smoothstep(0.3, 0.78, n1 * 0.6 + n2 * 0.4) * vTint.a;
    rgbOut = vTint.rgb * a;
    aOut = a;
  } else {
    // 光柱：横向高斯状、往上渐隐
    float across = 1.0 - abs(vUv.x - 0.5) * 2.0;
    float a = across * across * (1.0 - smoothstep(0.1, 1.0, vUv.y)) * (0.8 + 0.2 * sin(t * 1.4 + seed * 6.0)) * vTint.a;
    rgbOut = vTint.rgb * a;
    aOut = 0.0;
  }
  gl_FragColor = vec4(rgbOut, aOut);
  ${aa}
}
`,
  nN = new dt(0, -0.72, -0.69).normalize();

function sN(n, t, e, s, i) {
  const a = n.map,
    o = new ke(60606),
    r = [...e],
    l = yt(16771519),
    c = yt(13954293);
  for (const b of t) {
    if (b.kind === "ridge" || b.inradius < 3) continue;
    const w = xf(b.poly);
    if (n.laneDist(w.x, w.y) < 2 || n.baseDist(w.x, w.y, 12) < 4) continue;
    const T = b.inradius > 4.5 ? 2 : 1;
    for (let E = 0; E < T; E++)
      r.push({
        kind: "beam",
        x: w.x + o.range(-2.2, 2.2),
        y: b.height + 0.3,
        z: w.y + o.range(-2.2, 2.2),
        width: o.range(2.6, 4),
        length: o.range(9, 12),
        color: l,
        alpha: o.range(0.05, 0.085),
      });
  }
  const f = a.river,
    d = [f[0], f[f.length - 1]];
  for (const b of d) {
    const w = Math.sign(b.x) * (a.bound - 6);
    r.push({
      kind: "fog",
      x: w,
      y: Fn + 0.4,
      z: Math.sign(b.y) * (a.bound - 6),
      width: 13,
      color: c,
      alpha: 0.11,
    });
  }
  for (let b = -a.bound + 10; b < a.bound - 8; b += 19)
    r.push({
      kind: "fog",
      x: b + o.range(-3, 3),
      y: -1.3,
      z: a.bound + 5.5,
      width: o.range(11, 14),
      color: c,
      alpha: 0.1,
    });
  for (let b = r.length - 1; b > 0; b--) {
    const w = o.int(b + 1),
      T = r[b];
    ((r[b] = r[w]), (r[w] = T));
  }
  const h = r.length,
    u = new Gl(1, 1);
  u.translate(0, 0.5, 0);
  const m = new Float32Array(h * 4),
    x = new Float32Array(h * 2),
    p = new An({
      uniforms: { tNoise: { value: s }, uTime: fs.uTime },
      vertexShader: tN,
      fragmentShader: eN,
      transparent: !0,
      depthWrite: !1,
      side: fi,
      premultipliedAlpha: !0,
      blending: Fh,
      blendSrc: Cr,
      blendDst: mo,
      blendSrcAlpha: Cr,
      blendDstAlpha: mo,
      fog: !1,
    }),
    g = new kM(u, p, Math.max(1, h)),
    y = new Ke(),
    v = new dt(),
    _ = new dt(),
    k = new dt(),
    M = new dt();
  (r.forEach((b, w) => {
    const T = b.length ?? 1;
    (b.kind === "beam"
      ? (_.copy(as),
        v.crossVectors(_, nN).normalize(),
        k.crossVectors(v, _).normalize(),
        M.set(b.x, b.y, b.z).addScaledVector(_, -T * 0.12),
        y.makeBasis(v.multiplyScalar(b.width), _.clone().multiplyScalar(T), k).setPosition(M))
      : b.kind === "fog"
        ? (v.set(b.width, 0, 0),
          _.set(0, 0, b.width),
          k.set(0, 1, 0),
          y.makeBasis(v, _, k).setPosition(b.x, b.y, b.z - b.width / 2))
        : (v.set(b.width, 0, 0),
          _.set(0, T, 0),
          k.set(0, 0, 1),
          y.makeBasis(v, _, k).setPosition(b.x, b.y, b.z)),
      g.setMatrixAt(w, y),
      m.set([b.color[0], b.color[1], b.color[2], b.alpha], w * 4),
      x.set([b.kind === "beam" ? 0 : b.kind === "fog" ? 1 : 2, o.next()], w * 2));
  }),
    u.setAttribute("aTint", new Qs(m, 4)),
    u.setAttribute("aKind", new Qs(x, 2)),
    (g.instanceMatrix.needsUpdate = !0),
    (g.name = "atmos"),
    (g.renderOrder = 6),
    (g.frustumCulled = !1),
    (g.matrixAutoUpdate = !1));
  const S = (b) => {
    ((g.visible = b.atmos > 0 && h > 0), (g.count = b.atmos >= 2 ? h : Math.ceil(h / 2)));
  };
  return (S(i), { mesh: g, count: h, setQuality: S });
}

const tl = { warm: yt(16771519), cold: yt(13954293), steam: yt(16773590), violet: yt(Yt.env.violet) },
  np = new dt(),
  sp = new dt(),
  f_ = new Je(),
  d_ = 0.1,
  iN = 0.28,
  aN = yt(12169376),
  oN = yt(12891799),
  rN = yt(8682868),
  h_ = yt(7180120);

function yf(n, t, e, s, i, a, o, r, l = 0) {
  const c = e / 2,
    f = s / 2,
    d = c - a,
    h = f - a,
    u = -0.04,
    m = [
      [-c, u, -f],
      [-c, u, f],
      [c, u, f],
      [c, u, -f],
      [-d, i, -h],
      [-d, i, h],
      [d, i, h],
      [d, i, -h],
    ];
  f_.getNormalMatrix(t);
  const x = (g, y, v, _, k, M, S, b, w) => {
      sp.set(k, M, S).applyMatrix3(f_).normalize();
      const T = [];
      ([g, y, v, _].forEach((E, A) => {
        (np.set(m[E][0], m[E][1], m[E][2]).applyMatrix4(t),
          T.push(n.vertex(np.x, np.y, np.z, A < 2 ? b : w, sp.x, sp.y, sp.z, 0, l, 0, A < 2 ? 0.7 : 1)));
      }),
        n.quad(T[0], T[1], T[2], T[3]));
    },
    p = a / Math.max(0.02, i);
  (x(4, 5, 6, 7, 0, 1, 0, o, o),
    x(1, 2, 6, 5, 0, p, 1, r, o),
    x(3, 0, 4, 7, 0, p, -1, r, o),
    x(0, 1, 5, 4, -1, p, 0, r, o),
    x(2, 3, 7, 6, 1, p, 0, r, o));
}

const u_ = new Ke(),
  p_ = new Ri(),
  m_ = new sa(),
  lN = new dt(1, 1, 1),
  g_ = new dt();

function cN(n, t) {
  const e = t.map,
    s = e.laneWidth / 2 + d_,
    i = new ke(4242);
  let a = 0;
  for (const o of Object.values(e.lanes))
    for (const r of [-1, 1]) {
      let l = i.range(0, 0.6);
      for (let c = 1; c < o.length; c++) {
        const f = o[c - 1],
          d = o[c],
          h = Math.hypot(d.x - f.x, d.y - f.y),
          u = (d.x - f.x) / h,
          m = (d.y - f.y) / h,
          x = -m * r,
          p = u * r;
        let g = l;
        for (; g < h;) {
          const y = i.range(0.9, 1.4),
            v = g + y / 2,
            _ = i.range(0.03, 0.07);
          if (((g += y + _), v > h)) break;
          const k = f.x + u * v + x * s,
            M = f.y + m * v + p * s,
            S = i.next(),
            b = i.next(),
            w = i.next(),
            T = i.next();
          if (
            Math.abs(t.laneDist(k, M) - d_) > 0.07 ||
            t.riverDist(k, M) < 0.9 ||
            t.baseDist(k, M) < 0.35 ||
            t.padDist(k, M) < 0.45 ||
            t.wallDist(k, M, 2) < 0.14 ||
            t.boundDist(k, M) < 0.25 ||
            S < 0.15
          )
            continue;
          const E = b < 0.1,
            A = (0.06 + T * 0.06) * (E ? 0.6 : 1),
            C = Math.atan2(-m, u) + (E ? (i.next() - 0.5) * 0.3 : (i.next() - 0.5) * 0.05);
          (m_.set(E ? (i.next() - 0.5) * 0.16 : 0, C, E ? (i.next() - 0.5) * 0.12 : 0, "YXZ"),
            p_.setFromEuler(m_),
            g_.set(k, E ? -0.02 : 0, M),
            u_.compose(g_, p_, lN));
          const R =
              t.solidDist(k, M, 3) < 1.8 || t.riverDist(k, M) < 3 ? i.range(0.15, 0.5) : i.range(0, 0.12),
            I = Ht(Pt(Pt(aN, oN, w), h_, R), 0.92 + w * 0.14),
            P = n.at(k, M, !1),
            F = P.triangleCount;
          (yf(P, u_, y, iN * i.range(0.9, 1.1), A, 0.035, I, Pt(rN, h_, R * 0.6)),
            (a += P.triangleCount - F));
        }
        l = Math.max(0, g - h);
      }
    }
  return a;
}

const Dn = Math.PI * 2,
  x_ = new Map();

function v8(n) {
  let t = x_.get(n);
  if (t) return t;
  const e = (1 + Math.sqrt(5)) / 2;
  let s = [
    [-1, e, 0],
    [1, e, 0],
    [-1, -e, 0],
    [1, -e, 0],
    [0, -1, e],
    [0, 1, e],
    [0, -1, -e],
    [0, 1, -e],
    [e, 0, -1],
    [e, 0, 1],
    [-e, 0, -1],
    [-e, 0, 1],
  ];
  s = s.map((a) => {
    const o = Math.hypot(a[0], a[1], a[2]);
    return [a[0] / o, a[1] / o, a[2] / o];
  });
  let i = [
    [0, 11, 5],
    [0, 5, 1],
    [0, 1, 7],
    [0, 7, 10],
    [0, 10, 11],
    [1, 5, 9],
    [5, 11, 4],
    [11, 10, 2],
    [10, 7, 6],
    [7, 1, 8],
    [3, 9, 4],
    [3, 4, 2],
    [3, 2, 6],
    [3, 6, 8],
    [3, 8, 9],
    [4, 9, 5],
    [2, 4, 11],
    [6, 2, 10],
    [8, 6, 7],
    [9, 8, 1],
  ];
  for (let a = 0; a < n; a++) {
    const o = new Map(),
      r = (c, f) => {
        const d = c < f ? c * 1e5 + f : f * 1e5 + c;
        let h = o.get(d);
        if (h === void 0) {
          const u = s[c],
            m = s[f],
            x = u[0] + m[0],
            p = u[1] + m[1],
            g = u[2] + m[2],
            y = Math.hypot(x, p, g);
          ((h = s.length), s.push([x / y, p / y, g / y]), o.set(d, h));
        }
        return h;
      },
      l = [];
    for (const [c, f, d] of i) {
      const h = r(c, f),
        u = r(f, d),
        m = r(d, c);
      l.push([c, h, m], [f, u, h], [d, m, u], [h, u, m]);
    }
    i = l;
  }
  return ((t = { verts: s, tris: i }), x_.set(n, t), t);
}

function Ts(n, t, e, s, i, a, o, r) {
  const l = v8(r.detail ?? 1),
    c = r.seed ?? 1,
    f = r.bump ?? 0,
    d = [],
    h = [];
  for (let x = 0; x < l.verts.length; x++) {
    const p = l.verts[x],
      g = 1 + (nn(x, c, 71) - 0.5) * 2 * f,
      y = t + p[0] * i * g,
      v = e + p[1] * a * g,
      _ = s + p[2] * o * g;
    d.push([y, v, _]);
    let k = p[0] / i,
      M = p[1] / a,
      S = p[2] / o,
      b = Math.hypot(k, M, S) || 1;
    if (((k /= b), (M /= b), (S /= b), r.puffCenter && r.puff)) {
      let w = y - r.puffCenter[0],
        T = v - r.puffCenter[1],
        E = _ - r.puffCenter[2];
      ((b = Math.hypot(w, T, E) || 1),
        (w /= b),
        (T /= b),
        (E /= b),
        (k = Mn(k, w, r.puff)),
        (M = Mn(M, T, r.puff)),
        (S = Mn(S, E, r.puff)),
        (b = Math.hypot(k, M, S) || 1),
        (k /= b),
        (M /= b),
        (S /= b));
    }
    h.push([k, M, S]);
  }
  const u = (x) => {
      const p = Math.min(1, Math.max(0, (l.verts[x][1] + 1) / 2)),
        g = Pt(r.bottom, r.top, p * p * (3 - 2 * p));
      return Ht(g, 0.93 + nn(x, c, 5) * 0.14);
    },
    m = (x) => Mn(r.swayBottom ?? 0, r.swayTop ?? 0, (l.verts[x][1] + 1) / 2);
  if (r.flat)
    for (const [x, p, g] of l.tris) {
      const y = d[x],
        v = d[p],
        _ = d[g],
        k = v[0] - y[0],
        M = v[1] - y[1],
        S = v[2] - y[2],
        b = _[0] - y[0],
        w = _[1] - y[1],
        T = _[2] - y[2];
      let E = M * T - S * w,
        A = S * b - k * T,
        C = k * w - M * b;
      const R = Math.hypot(E, A, C) || 1;
      ((E /= R), (A /= R), (C /= R));
      const I = 0.86 + 0.2 * Math.max(0, A) + (nn(x + p * 7, g, c) - 0.5) * 0.12,
        P = n.vertex(y[0], y[1], y[2], Ht(u(x), I), E, A, C, 0, r.glow ?? 0, r.team ?? 0, r.ao ?? 1),
        F = n.vertex(v[0], v[1], v[2], Ht(u(p), I), E, A, C, 0, r.glow ?? 0, r.team ?? 0, r.ao ?? 1),
        L = n.vertex(_[0], _[1], _[2], Ht(u(g), I), E, A, C, 0, r.glow ?? 0, r.team ?? 0, r.ao ?? 1);
      n.tri(P, F, L);
    }
  else {
    const x = n.vertexCount;
    for (let g = 0; g < d.length; g++)
      n.vertex(
        d[g][0],
        d[g][1],
        d[g][2],
        u(g),
        h[g][0],
        h[g][1],
        h[g][2],
        m(g),
        r.glow ?? 0,
        r.team ?? 0,
        r.ao ?? 1,
      );
    const p = r.cutBelow ?? -2;
    for (const [g, y, v] of l.tris)
      (l.verts[g][1] < p && l.verts[y][1] < p && l.verts[v][1] < p) || n.tri(x + g, x + y, x + v);
  }
}

function gn(n, t, e) {
  const s = e.sides ?? 6,
    i = [],
    a = t.length;
  for (let o = 0; o < a; o++) {
    const r = t[o],
      l = t[Math.max(0, o - 1)],
      c = t[Math.min(a - 1, o + 1)];
    let f = c[0] - l[0],
      d = c[1] - l[1],
      h = c[2] - l[2];
    const u = Math.hypot(f, d, h) || 1;
    ((f /= u), (d /= u), (h /= u));
    let m = 1,
      x = 0,
      p = 0;
    Math.abs(f) > 0.9 && ((m = 0), (p = 1));
    const g = m * f + x * d + p * h;
    ((m -= f * g), (x -= d * g), (p -= h * g));
    const y = Math.hypot(m, x, p) || 1;
    ((m /= y), (x /= y), (p /= y));
    const v = d * p - h * x,
      _ = h * m - f * p,
      k = f * x - d * m,
      M = a > 1 ? o / (a - 1) : 0,
      S = Pt(e.c0, e.c1, M),
      b = Mn(e.sway0 ?? 0, e.sway1 ?? 0, M),
      w = [];
    for (let T = 0; T < s; T++) {
      const E = (T / s) * Dn,
        A = Math.cos(E),
        C = Math.sin(E),
        R = m * A + v * C,
        I = x * A + _ * C,
        P = p * A + k * C;
      w.push(n.vertex(r[0] + R * r[3], r[1] + I * r[3], r[2] + P * r[3], S, R, I, P, b, e.glow ?? 0, 0, 1));
    }
    i.push(w);
  }
  for (let o = 0; o < a - 1; o++)
    for (let r = 0; r < s; r++) {
      const l = (r + 1) % s;
      n.quad(i[o][r], i[o + 1][r], i[o + 1][l], i[o][l]);
    }
  if (e.cap) {
    const o = t[a - 1],
      r = n.vertex(o[0], o[1], o[2], Ht(e.c1, 1.08), 0, 1, 0, e.sway1 ?? 0, e.glow ?? 0, 0, 1);
    for (let l = 0; l < s; l++) n.tri(i[a - 1][l], r, i[a - 1][(l + 1) % s]);
  }
}

function Xo(n, t, e, s, i, a, o, r, l, c, f, d) {
  const u = new Ke().makeRotationFromEuler(new sa(o, nn(d, 3, 9) * Dn, r)).setPosition(t, e, s),
    m = new dt(),
    x = (k, M, S) => (m.set(k, M, S).applyMatrix4(u), [m.x, m.y, m.z]),
    p = i * 0.72,
    g = [],
    y = [];
  for (let k = 0; k < 6; k++) {
    const M = (k / 6) * Dn;
    (g.push(x(Math.cos(M) * a * 0.75, -0.15, Math.sin(M) * a * 0.75)),
      y.push(x(Math.cos(M) * a, p, Math.sin(M) * a)));
  }
  const v = x(0, i, 0),
    _ = (k, M, S, b, w, T, E) => {
      const A = M[0] - k[0],
        C = M[1] - k[1],
        R = M[2] - k[2],
        I = S[0] - k[0],
        P = S[1] - k[1],
        F = S[2] - k[2];
      let L = C * F - R * P,
        B = R * I - A * F,
        G = A * P - C * I;
      const q = Math.hypot(L, B, G) || 1;
      ((L /= q), (B /= q), (G /= q));
      const et = n.vertex(k[0], k[1], k[2], b, L, B, G, 0, E * 0.55, 0, 1),
        ct = n.vertex(M[0], M[1], M[2], w, L, B, G, 0, E, 0, 1),
        rt = n.vertex(S[0], S[1], S[2], T, L, B, G, 0, E, 0, 1);
      n.tri(et, ct, rt);
    };
  for (let k = 0; k < 6; k++) {
    const M = (k + 1) % 6,
      S = 0.8 + nn(k, d, 17) * 0.4,
      b = Ht(l, S),
      w = Ht(c, S);
    (_(g[k], y[k], y[M], b, w, w, f),
      _(g[k], y[M], g[M], b, w, b, f),
      _(y[k], v, y[M], w, Ht(c, 1.25), w, f));
  }
}

function bs(n) {
  return n.build();
}

function Ho(n, t, e, s, i, a) {
  const o = a.lobes,
    r = new ke(a.seed * 31 + 7),
    l = (a.thick ?? 0.42) * i,
    c = r.range(0, Dn),
    f = r.range(-0.06, 0.06),
    d = (M, S) => [M[0] * S * (1 + f), M[1] * S, M[2] * S * (1 - f)],
    h = a.sway0 ?? 0.3,
    u = a.sway1 ?? 0.7,
    m = (M, S, b, w, T, E, A, C) => {
      let R = T,
        I = E,
        P = A;
      if (a.puffCenter && a.puff) {
        let L = t + M - a.puffCenter[0],
          B = e + S - a.puffCenter[1],
          G = s + b - a.puffCenter[2];
        const q = Math.hypot(L, B, G) || 1;
        ((L /= q),
          (B /= q),
          (G /= q),
          (R = Mn(R, L, a.puff)),
          (I = Mn(I, B, a.puff)),
          (P = Mn(P, G, a.puff)));
      }
      const F = Math.hypot(R, I, P) || 1;
      return n.vertex(t + M, e + S, s + b, w, R / F, I / F, P / F, C, 0, a.team ?? 0, 1);
    },
    x = n.positions,
    p = (M, S, b, w) => {
      const T = x[S * 3] - x[M * 3],
        E = x[S * 3 + 2] - x[M * 3 + 2],
        A = x[b * 3] - x[M * 3],
        C = x[b * 3 + 2] - x[M * 3 + 2];
      E * A - T * C > 0 === w ? n.tri(M, S, b) : n.tri(M, b, S);
    },
    g = m(r.range(-0.05, 0.05) * i, l, r.range(-0.05, 0.05) * i, d(a.light, 1), 0, 1, 0, u),
    y = [],
    v = [],
    _ = [],
    k = [];
  for (let M = 0; M < o; M++) {
    const S = c + (M / o) * Dn,
      b = Math.cos(S),
      w = Math.sin(S),
      T = i * 0.42 * r.range(0.92, 1.08);
    y.push(
      m(
        b * T,
        l * r.range(0.86, 0.94),
        w * T,
        d(Pt(a.mid, a.light, 0.62), r.range(0.96, 1.04)),
        b * 0.3,
        0.95,
        w * 0.3,
        Mn(h, u, 0.8),
      ),
    );
    const E = S + Math.PI / o,
      A = Math.cos(E),
      C = Math.sin(E),
      R = i * 0.78 * r.range(0.94, 1.06);
    v.push(
      m(
        A * R,
        l * r.range(0.52, 0.64),
        C * R,
        d(a.mid, r.range(0.94, 1.04)),
        A * 0.62,
        0.78,
        C * 0.62,
        Mn(h, u, 0.45),
      ),
    );
  }
  for (let M = 0; M < o * 2; M++) {
    const S = c + (M / (o * 2)) * Dn,
      b = M % 2 === 0,
      w = i * (b ? r.range(0.97, 1.05) : r.range(0.86, 0.9)),
      T = Math.cos(S),
      E = Math.sin(S),
      A = l * (b ? r.range(0.06, 0.14) : r.range(0.16, 0.24));
    (_.push(
      m(
        T * w,
        A,
        E * w,
        d(b ? Pt(a.dark, a.mid, 0.72) : Pt(a.dark, a.mid, 0.4), 1),
        T * 0.86,
        0.5,
        E * 0.86,
        h,
      ),
    ),
      k.push(m(T * w * 0.7, -l * 0.32, E * w * 0.7, d(a.dark, 0.7), T * 0.5, -0.85, E * 0.5, h)));
  }
  for (let M = 0; M < o; M++) {
    const S = (M + 1) % o,
      b = (M + o - 1) % o;
    (p(g, y[M], y[S], !0), p(y[M], v[b], v[M], !0), p(y[M], v[M], y[S], !0));
    const w = M * 2,
      T = M * 2 + 1,
      E = (M * 2 + 2) % (o * 2);
    (p(v[M], _[w], _[T], !0), p(v[M], _[T], _[E], !0), p(v[M], _[E], v[S], !0));
  }
  for (let M = 0; M < o * 2; M++) {
    const S = (M + 1) % (o * 2);
    (p(_[M], _[S], k[S], !1), p(_[M], k[S], k[M], !1));
  }
}

function Dx(n, t, e, s, i, a, o, r, l, c, f, d, h, u = 3) {
  const m = -a * r,
    x = i * r,
    p = [];
  for (let g = 0; g <= u; g++) {
    const y = g / u,
      v = t + i * o * y,
      _ = s + a * o * y,
      k = e + Math.sin(y * Math.PI * 0.6) * l - y * y * c,
      M = g === u ? 0 : 1 - y * 0.55,
      S = Pt(f, d, y);
    g === u
      ? p.push(n.vertex(v, k, _, S, 0, 1, 0, h * y))
      : p.push(
          n.vertex(v - m * M, k, _ - x * M, S, 0, 1, 0, h * y),
          n.vertex(v + m * M, k, _ + x * M, S, 0, 1, 0, h * y),
        );
  }
  for (let g = 0; g < u - 1; g++) n.quad(p[g * 2], p[g * 2 + 1], p[g * 2 + 3], p[g * 2 + 2]);
  n.tri(p[(u - 1) * 2], p[(u - 1) * 2 + 1], p[u * 2]);
}

const na = Yt.env,
  Rh = yt(4863280),
  Ch = yt(na.trunk);

function c2(n, t) {
  const e = new ke(n),
    s = new Be(),
    i = e.range(1.75, 2.15),
    a = e.range(-0.22, 0.22),
    o = e.range(-0.18, 0.18);
  gn(
    s,
    [
      [0, -0.2, 0, 0.3],
      [a * 0.3, i * 0.4, o * 0.3, 0.2],
      [a * 0.8, i * 0.85, o * 0.8, 0.14],
      [a, i + 0.95, o, 0.06],
    ],
    { sides: 5, c0: Rh, c1: Ch, sway0: 0, sway1: 0.15 },
  );
  const r = yt(t?.dark ?? na.canopyDark),
    l = yt(t?.mid ?? na.canopy),
    c = yt(t?.light ?? na.canopyLight),
    f = [a, i + 0.35, o],
    d = e.range(0, Dn);
  for (let u = 0; u < 3; u++) {
    const m = d + (u / 3) * Dn + e.range(-0.3, 0.3),
      x = e.range(0.56, 0.7),
      p = e.range(0.86, 1),
      g = a + Math.cos(m) * x,
      y = o + Math.sin(m) * x,
      v = i + e.range(-0.05, 0.14);
    (u < 2 &&
      gn(
        s,
        [
          [a * 0.7, i * 0.72, o * 0.7, 0.08],
          [g * 0.75 + a * 0.25, v - 0.12, y * 0.75 + o * 0.25, 0.04],
        ],
        { sides: 3, c0: Rh, c1: Ch, sway1: 0.2 },
      ),
      Ho(s, g, v, y, p, {
        lobes: 8,
        dark: Ht(r, 0.9),
        mid: Pt(r, l, 0.55),
        light: Pt(r, l, 0.95),
        seed: n + u * 13,
        sway0: 0.3,
        sway1: 0.55,
        puffCenter: f,
        puff: 0.35,
        thick: 0.5,
      }));
  }
  const h = 2 + e.int(2);
  for (let u = 0; u < h; u++) {
    const m = d + Math.PI / 3 + (u / h) * Dn + e.range(-0.35, 0.35),
      x = e.range(0.32, 0.46),
      p = e.range(0.72, 0.86);
    Ho(s, a + Math.cos(m) * x, i + e.range(0.5, 0.64), o + Math.sin(m) * x, p, {
      lobes: 8,
      dark: r,
      mid: l,
      light: Pt(l, c, 0.28),
      seed: n + 50 + u * 17,
      sway0: 0.4,
      sway1: 0.7,
      puffCenter: f,
      puff: 0.35,
      thick: 0.52,
    });
  }
  return (
    Ho(s, a + e.range(-0.12, 0.12), i + e.range(1.02, 1.14), o + e.range(-0.12, 0.12), e.range(0.6, 0.7), {
      lobes: 7,
      dark: Pt(r, l, 0.7),
      mid: Pt(l, c, 0.3),
      light: Pt(l, c, 0.62),
      seed: n + 99,
      sway0: 0.55,
      sway1: 0.85,
      puffCenter: f,
      puff: 0.3,
      thick: 0.6,
    }),
    bs(s)
  );
}

function fN(n) {
  const t = new ke(n),
    e = new Be(),
    s = t.range(2, 2.4),
    i = t.range(-0.3, 0.3);
  gn(
    e,
    [
      [0, -0.2, 0, 0.28],
      [i * 0.4, s * 0.5, 0, 0.19],
      [i, s, 0.05, 0.12],
      [i * 1.1, s + 0.7, 0.05, 0.05],
    ],
    { sides: 5, c0: Rh, c1: Ch, sway1: 0.15 },
  );
  const a = yt(2779730),
    o = yt(5938274),
    r = yt(11128946),
    l = [i, s + 0.2, 0],
    c = t.range(0, Dn),
    f = [];
  for (let h = 0; h < 3; h++) {
    const u = c + (h / 3) * Dn + t.range(-0.25, 0.25),
      m = t.range(0.55, 0.7),
      x = t.range(0.85, 1),
      p = i + Math.cos(u) * m,
      g = Math.sin(u) * m,
      y = s + t.range(0, 0.15);
    (f.push([p, y, g, x]),
      Ho(e, p, y, g, x, {
        lobes: 8,
        dark: a,
        mid: Pt(a, o, 0.7),
        light: o,
        seed: n + h * 7,
        sway0: 0.35,
        sway1: 0.6,
        puffCenter: l,
        puff: 0.35,
        thick: 0.5,
      }));
  }
  Ho(e, i, s + 0.68, 0, 0.82, {
    lobes: 8,
    dark: Pt(a, o, 0.5),
    mid: o,
    light: r,
    seed: n + 41,
    sway0: 0.5,
    sway1: 0.8,
    puffCenter: l,
    puff: 0.25,
    thick: 0.5,
  });
  const d = 9;
  for (let h = 0; h < d; h++) {
    const u = f[h % 3],
      m = t.range(0, Dn),
      x = u[0] + Math.cos(m) * u[3] * t.range(0.6, 0.92),
      p = u[2] + Math.sin(m) * u[3] * t.range(0.6, 0.92),
      g = u[1] + 0.02,
      y = t.range(0.8, 1.35),
      v = 0.045,
      _ = Math.cos(m + 1.57) * v,
      k = Math.sin(m + 1.57) * v,
      M = e.vertex(x - _, g, p - k, o, Math.cos(m), 0.3, Math.sin(m), 0.4),
      S = e.vertex(x + _, g, p + k, o, Math.cos(m), 0.3, Math.sin(m), 0.4),
      b = e.vertex(x - _ * 0.7, g - y * 0.55, p - k * 0.7, Pt(o, r, 0.5), Math.cos(m), 0.3, Math.sin(m), 0.9),
      w = e.vertex(x + _ * 0.7, g - y * 0.55, p + k * 0.7, Pt(o, r, 0.5), Math.cos(m), 0.3, Math.sin(m), 0.9),
      T = e.vertex(x, g - y, p, r, Math.cos(m), 0.3, Math.sin(m), 1.4);
    (e.quad(M, S, w, b), e.tri(b, w, T));
  }
  return bs(e);
}

function dN(n) {
  const t = new ke(n),
    e = new Be(),
    s = t.range(1.7, 2.3);
  gn(
    e,
    [
      [0, -0.2, 0, 0.26],
      [0, s + 0.5, 0, 0.1],
    ],
    { sides: 4, c0: Rh, c1: Ch },
  );
  const i = yt(na.canopyDark),
    a = yt(na.canopy),
    o = yt(na.canopyLight),
    r = t.range(1.2, 1.5),
    l = [0, s, 0];
  return (
    Ho(e, 0, s, 0, r, {
      lobes: 6,
      dark: i,
      mid: Pt(i, a, 0.7),
      light: a,
      seed: n,
      sway0: 0.25,
      sway1: 0.55,
      puffCenter: l,
      puff: 0.3,
      thick: 0.6,
    }),
    Ho(e, t.range(-0.3, 0.3), s + r * 0.5, t.range(-0.3, 0.3), r * 0.68, {
      lobes: 6,
      dark: Pt(i, a, 0.6),
      mid: Pt(a, o, 0.4),
      light: o,
      seed: n + 3,
      sway0: 0.5,
      sway1: 0.8,
      puffCenter: l,
      puff: 0.3,
      thick: 0.6,
    }),
    bs(e)
  );
}

function hN(n) {
  const t = new ke(n),
    e = new Be(),
    s = t.range(3.2, 4.4);
  gn(
    e,
    [
      [0, -0.2, 0, 0.22],
      [0, s * 0.5, 0, 0.12],
    ],
    { sides: 5, c0: Rh, c1: Ch },
  );
  const i = 3,
    a = yt(1857096),
    o = yt(6202722);
  for (let r = 0; r < i; r++) {
    const l = s * (0.22 + r * 0.24),
      c = l + s * 0.36,
      f = (1.25 - r * 0.33) * t.range(0.9, 1.1),
      d = 7,
      h = Pt(a, o, r * 0.18),
      u = Pt(a, o, 0.45 + r * 0.2),
      m = e.vertex(0, c, 0, u, 0, 1, 0, 0.5 + r * 0.2),
      x = [];
    for (let p = 0; p < d; p++) {
      const g = (p / d) * Dn + r * 0.4,
        y = f * (0.9 + nn(p, r, n) * 0.2),
        v = Math.cos(g) * 0.8,
        _ = Math.sin(g) * 0.8;
      x.push(e.vertex(Math.cos(g) * y, l - (p % 2) * 0.12, Math.sin(g) * y, h, v, 0.6, _, 0.3 + r * 0.15));
    }
    for (let p = 0; p < d; p++) e.tri(x[p], m, x[(p + 1) % d]);
  }
  return bs(e);
}

function uN(n) {
  const t = new ke(n),
    e = new Be(),
    s = yt(na.canopyDark),
    i = yt(na.canopy),
    a = Pt(i, yt(na.canopyLight), 0.55),
    o = 2 + t.int(2),
    r = [0, 0.1, 0];
  for (let l = 0; l < o; l++) {
    const c = t.range(0, Dn),
      f = l === 0 ? 0 : t.range(0.28, 0.5),
      d = l === 0 ? t.range(0.52, 0.66) : t.range(0.34, 0.46);
    Ho(e, Math.cos(c) * f, d * (l === 0 ? 0.42 : 0.22), Math.sin(c) * f, d, {
      lobes: 6,
      dark: s,
      mid: i,
      light: a,
      seed: n + l * 5,
      sway0: 0.05,
      sway1: 0.3,
      puffCenter: r,
      puff: 0.35,
      thick: 0.62,
    });
  }
  return bs(e);
}

function pN(n, t, e, s, i, a, o, r, l, c, f) {
  const d = v8(l),
    h = new ke(r * 31 + 7),
    u = [],
    m = l > 0 ? 6 : 3;
  for (let p = 0; p < m; p++) {
    const g = h.range(0, Dn),
      y = p === 0 ? h.range(0.75, 0.95) : h.range(-0.1, 0.55),
      v = Math.sqrt(Math.max(0, 1 - y * y));
    u.push([Math.cos(g) * v, y, Math.sin(g) * v, h.range(0.52, 0.82)]);
  }
  const x = n.vertexCount;
  for (let p = 0; p < d.verts.length; p++) {
    let [g, y, v] = d.verts[p];
    for (const [b, w, T, E] of u) {
      const A = g * b + y * w + v * T - E;
      A > 0 && ((g -= b * A), (y -= w * A), (v -= T * A));
    }
    const _ = 1 + (nn(p, r, 71) - 0.5) * 0.1,
      k = Math.max(-0.42, y * _),
      M = Math.min(1, Math.max(0, (k + 0.42) / 1.2)),
      S = Ht(Pt(c, f, M * M * (3 - 2 * M)), 0.94 + nn(p, r, 5) * 0.12);
    n.vertex(t + g * _ * i, e + k * a, s + v * _ * o, S, 0, 1, 0, 0, 0, 0, 0.68 + 0.32 * M);
  }
  for (const [p, g, y] of d.tris) n.tri(x + p, x + g, x + y);
}

function y_(n, t) {
  const e = new ke(n),
    s = new Be(),
    i = yt(na.rockDark),
    a = yt(na.rockLight),
    o = t ? 2 + e.int(2) : 1;
  for (let r = 0; r < o; r++) {
    const l = r === 0 ? 1 : e.range(0.42, 0.66),
      c = e.range(0, Dn),
      f = r === 0 ? 0 : e.range(0.68, 0.95);
    pN(
      s,
      Math.cos(c) * f,
      l * e.range(0.28, 0.42),
      Math.sin(c) * f,
      l * e.range(0.9, 1.2),
      l * e.range(0.62, 0.9),
      l * e.range(0.8, 1.1),
      n + r * 7,
      t && r === 0 ? 1 : 0,
      Pt(i, a, 0.15),
      Pt(i, a, 0.85),
    );
  }
  return (s.computeNormals(35), bs(s));
}

function v_(n, t) {
  const e = new ke(n),
    s = new Be(),
    i = t ? 5 + e.int(3) : 3 + e.int(2),
    a = [0.5, 0.5, 0.5],
    o = [1, 1, 1];
  for (let r = 0; r < i; r++) {
    const l = r === 0,
      c = e.range(0, Dn),
      f = l ? 0 : e.range(0.22, 0.5) * (t ? 1.5 : 1),
      d = (l ? e.range(1.1, 1.5) : e.range(0.45, 0.95)) * (t ? 1.7 : 1),
      h = d * e.range(0.13, 0.18),
      u = l ? e.range(-0.12, 0.12) : e.range(0.25, 0.6);
    Xo(
      s,
      Math.cos(c) * f,
      0,
      Math.sin(c) * f,
      d,
      h,
      Math.sin(c) * u,
      -Math.cos(c) * u,
      a,
      o,
      l ? 1 : 0.8,
      n + r,
    );
  }
  return (
    Ts(s, 0, 0.05, 0, t ? 0.9 : 0.5, 0.22, t ? 0.9 : 0.5, {
      detail: 0,
      bump: 0.2,
      seed: n,
      bottom: [0.22, 0.24, 0.3],
      top: [0.4, 0.43, 0.5],
      flat: !0,
    }),
    bs(s)
  );
}

function b_(n, t) {
  const e = new ke(n),
    s = new Be(),
    i = yt(12170924),
    a = yt(8223874),
    o = t ? e.range(2.3, 3.2) : e.range(0.9, 1.6),
    r = 0.34;
  gn(
    s,
    [
      [0, -0.2, 0, r * 1.75],
      [0, 0.22, 0, r * 1.75],
      [0, 0.34, 0, r * 1.25],
    ],
    { sides: 4, c0: a, c1: i, cap: !1 },
  );
  const l = Math.max(2, Math.round(o / 0.7));
  let c = 0.34;
  for (let d = 0; d < l; d++) {
    const h = (o - 0.34) / l,
      u = d === 0 ? 0 : e.range(-0.03, 0.03);
    (gn(
      s,
      [
        [u, c, u, r * 1.02],
        [u, c + h * 0.1, u, r],
        [u, c + h * 0.9, u, r * 0.98],
        [u, c + h, u, r * 1.02],
      ],
      { sides: 8, c0: Pt(a, i, 0.3 + d * 0.12), c1: i, cap: d === l - 1 },
    ),
      (c += h));
  }
  const f = 0.34 + (o - 0.34) * 0.62;
  return (
    gn(
      s,
      [
        [0, f, 0, r * 1.06],
        [0, f + 0.1, 0, r * 1.06],
      ],
      { sides: 8, c0: [1, 1, 1], c1: [1, 1, 1], glow: 1 },
    ),
    Ts(s, e.range(-0.1, 0.1), o + 0.08, e.range(-0.1, 0.1), r * 0.9, 0.2, r * 0.8, {
      detail: 0,
      bump: 0.25,
      seed: n,
      bottom: a,
      top: i,
      flat: !0,
    }),
    bs(s)
  );
}

function mN(n) {
  const t = new ke(n),
    e = new Be(),
    s = 2 + t.int(2),
    i = [0.78, 0.74, 0.64];
  for (let a = 0; a < s; a++) {
    const o = t.range(0, Dn),
      r = a === 0 ? 0 : t.range(0.24, 0.42),
      l = a === 0 ? t.range(0.42, 0.58) : t.range(0.2, 0.36),
      c = Math.cos(o) * r,
      f = Math.sin(o) * r,
      d = t.range(-0.08, 0.08);
    gn(
      e,
      [
        [c, -0.05, f, l * 0.15],
        [c + d * 0.5, l * 0.6, f + d * 0.5, l * 0.1],
        [c + d, l, f + d, l * 0.12],
      ],
      { sides: 5, c0: Ht(i, 0.7), c1: i },
    );
    const h = l * t.range(0.52, 0.68),
      u = e.vertex(c + d, l - h * 0.1, f + d, Ht(i, 0.9), 0, -1, 0),
      m = [];
    for (let x = 0; x < 7; x++) {
      const p = (x / 7) * Dn;
      m.push(
        e.vertex(
          c + d + Math.cos(p) * h * 0.96,
          l + h * 0.1,
          f + d + Math.sin(p) * h * 0.96,
          Ht(i, 1.08),
          Math.cos(p) * 0.4,
          -0.8,
          Math.sin(p) * 0.4,
        ),
      );
    }
    for (let x = 0; x < 7; x++) e.tri(u, m[x], m[(x + 1) % 7]);
    Ts(e, c + d, l + h * 0.1, f + d, h, h * 0.52, h, {
      detail: 1,
      bump: 0.03,
      seed: n + a,
      bottom: [0.55, 0.55, 0.55],
      top: [1, 1, 1],
      glow: 0.35,
      team: 1,
      cutBelow: -0.05,
    });
    for (let x = 0; x < 3; x++) {
      const p = t.range(0, Dn),
        g = h * t.range(0.3, 0.6),
        y = l + h * 0.1 + h * 0.52 * Math.sqrt(Math.max(0, 1 - (g * g) / (h * h))) + 0.006,
        v = c + d + Math.cos(p) * g,
        _ = f + d + Math.sin(p) * g,
        k = h * t.range(0.1, 0.16),
        M = [1, 0.97, 0.86],
        S = e.vertex(v - k, y, _, M, 0, 1, 0),
        b = e.vertex(v, y, _ + k, M, 0, 1, 0),
        w = e.vertex(v + k, y, _, M, 0, 1, 0),
        T = e.vertex(v, y, _ - k, M, 0, 1, 0);
      e.quad(S, b, w, T);
    }
  }
  return bs(e);
}

function gN(n) {
  const t = new ke(n),
    e = new Be(),
    s = 2 + t.int(2);
  for (let i = 0; i < s; i++) {
    const a = i * t.range(0.16, 0.24),
      o = t.range(0.2, 0.32) * (1 - i * 0.15),
      r = t.range(-0.15, 0.15),
      l = [0.45, 0.45, 0.45],
      c = [0.86, 0.86, 0.86],
      f = e.vertex(-0.03, a + 0.07, r, l, 0.2, 1, 0, 0, 0, 1, 0.7),
      d = [],
      h = 6;
    for (let m = 0; m <= h; m++) {
      const x = -Math.PI / 2 + (m / h) * Math.PI;
      d.push(
        e.vertex(
          Math.cos(x) * o,
          a,
          r + Math.sin(x) * o * 1.2,
          c,
          Math.cos(x) * 0.5,
          0.8,
          Math.sin(x) * 0.5,
          0,
          0.5,
          1,
        ),
      );
    }
    for (let m = 0; m < h; m++) e.tri(f, d[m + 1], d[m]);
    const u = e.vertex(-0.03, a - 0.07, r, [0.7, 0.66, 0.56], 0, -1, 0);
    for (let m = 0; m < h; m++) e.tri(u, d[m], d[m + 1]);
  }
  return bs(e);
}

function __(n, t, e, s, i = !1) {
  const a = new ke(n),
    o = new Be(),
    r = yt(3107397),
    l = yt(5938262),
    c = 2 + a.int(2),
    f = i ? 0.6 : 1;
  for (let d = 0; d < c; d++) {
    const h = (d / c) * Dn + a.range(-0.5, 0.5),
      u = a.range(0.9, 1.5) * f,
      m = a.range(0.35, 0.6) * f,
      x = Math.cos(h),
      p = Math.sin(h),
      g = x * m,
      y = p * m;
    gn(
      o,
      [
        [0, -0.05, 0, 0.05 * f],
        [x * m * 0.25, u * 0.6, p * m * 0.25, 0.04 * f],
        [x * m * 0.7, u, p * m * 0.7, 0.03 * f],
        [g, u * 0.86, y, 0.02 * f],
      ],
      { sides: 3, c0: r, c1: l, sway0: 0, sway1: 0.5 },
    );
    const v = a.range(0.13, 0.18) * (i ? 0.75 : 1);
    Ts(o, g, u * 0.86 - v * 1.1, y, v, v * 1.25, v, {
      detail: 1,
      seed: n + d,
      bottom: t,
      top: e,
      glow: s,
      swayBottom: 0.55,
      swayTop: 0.5,
      team: i ? 1 : 0,
    });
  }
  for (let d = 0; d < 4; d++) {
    const h = (d / 4) * Dn + a.range(-0.3, 0.3);
    Dx(o, 0, 0.02, 0, Math.cos(h), Math.sin(h), 0.36 * f, 0.07 * f, 0.14 * f, 0.06, r, l, 0.15, 2);
  }
  return bs(o);
}

function xN(n) {
  const t = new ke(n),
    e = new Be(),
    s = yt(3107400),
    i = yt(8368730),
    a = 5 + t.int(3);
  for (let o = 0; o < a; o++) {
    const r = (o / a) * Dn + t.range(-0.35, 0.35),
      l = t.range(0.42, 0.7);
    Dx(
      e,
      0,
      0,
      0,
      Math.cos(r),
      Math.sin(r),
      l,
      t.range(0.07, 0.1),
      l * t.range(0.45, 0.7),
      l * 0.3,
      s,
      Pt(i, [0.7, 0.9, 0.5], t.next() * 0.4),
      0.6,
    );
  }
  return bs(e);
}

function yN(n) {
  const t = new ke(n),
    e = new Be(),
    s = yt(3828286),
    i = yt(7317584),
    a = yt(10274918),
    o = 4,
    r = 0.045,
    l = [],
    c = t.range(0, Dn);
  for (let f = 0; f <= o; f++) {
    const d = f / o,
      h = Math.sin(c + d * 4) * 0.07 * d,
      u = 0.06 + 0.03 * Math.sin(c * 2 + d * 3),
      m = -d,
      x = r * (1 - d * 0.7);
    l.push(e.vertex(u, m, h - x, s, 1, 0.2, 0, d * 0.5), e.vertex(u, m, h + x, s, 1, 0.2, 0, d * 0.5));
  }
  for (let f = 0; f < o; f++) e.quad(l[f * 2], l[f * 2 + 1], l[f * 2 + 3], l[f * 2 + 2]);
  for (let f = 0; f < 6; f++) {
    const d = (f + 0.6) / 6.4,
      h = f % 2 === 0 ? 1 : -1,
      u = Math.sin(c + d * 4) * 0.07 * d,
      m = t.range(0.09, 0.14),
      x = Pt(i, a, t.next()),
      p = e.vertex(0.07, -d, u, Ht(x, 0.8), 1, 0.3, 0, d * 0.6),
      g = e.vertex(0.1, -d - m * 0.25, u + h * m, x, 1, 0.3, 0, d * 0.8),
      y = e.vertex(0.09, -d - m * 1.2, u + h * m * 0.35, x, 1, 0.3, 0, d * 0.9);
    e.tri(p, g, y);
  }
  return bs(e);
}

function vN(n) {
  const t = new ke(n),
    e = new Be(),
    s = yt(na.cliffGrass),
    i = yt(10668128),
    a = 3 + t.int(2);
  for (let o = 0; o < a; o++) {
    const r = t.range(-0.7, 0.7),
      l = t.range(0.34, 0.6);
    Dx(
      e,
      t.range(-0.1, 0.05),
      0.02,
      t.range(-0.25, 0.25),
      Math.cos(r),
      Math.sin(r),
      l,
      t.range(0.05, 0.075),
      l * 0.3,
      l * t.range(0.7, 1.1),
      Ht(s, t.range(0.85, 1.05)),
      i,
      1,
      2,
    );
  }
  return bs(e);
}

function bN(n) {
  const t = new ke(n),
    e = new Be(),
    s = yt(4880956),
    i = yt(11059046);
  for (let o = 0; o < 6; o++) {
    const r = t.range(0, Dn),
      l = Math.cos(r) * t.range(0, 0.16),
      c = Math.sin(r) * t.range(0, 0.16),
      f = t.range(0.7, 1.25),
      d = t.range(0.05, 0.3),
      h = t.range(0.03, 0.045),
      u = Math.cos(r),
      m = Math.sin(r),
      x = e.vertex(l - m * h, 0, c + u * h, s, 0, 1, 0, 0),
      p = e.vertex(l + m * h, 0, c - u * h, s, 0, 1, 0, 0),
      g = e.vertex(
        l + u * d * 0.4 - m * h * 0.7,
        f * 0.6,
        c + m * d * 0.4 + u * h * 0.7,
        Pt(s, i, 0.6),
        0,
        1,
        0,
        0.45,
      ),
      y = e.vertex(
        l + u * d * 0.4 + m * h * 0.7,
        f * 0.6,
        c + m * d * 0.4 - u * h * 0.7,
        Pt(s, i, 0.6),
        0,
        1,
        0,
        0.45,
      ),
      v = e.vertex(l + u * d, f, c + m * d, i, 0, 1, 0, 1);
    (e.quad(x, p, y, g), e.tri(g, y, v));
  }
  const a = yt(6964784);
  for (let o = 0; o < 2; o++) {
    const r = t.range(0, Dn),
      l = Math.cos(r) * 0.1,
      c = Math.sin(r) * 0.1,
      f = t.range(1, 1.4);
    (gn(
      e,
      [
        [l, 0, c, 0.018],
        [l, f, c, 0.014],
      ],
      { sides: 3, c0: s, c1: Pt(s, i, 0.5), sway0: 0, sway1: 0.6 },
    ),
      gn(
        e,
        [
          [l, f - 0.02, c, 0.045],
          [l, f + 0.22, c, 0.045],
          [l, f + 0.3, c, 0.012],
        ],
        { sides: 4, c0: a, c1: Ht(a, 1.25), sway0: 0.6, sway1: 0.75 },
      ));
  }
  return bs(e);
}

function _N(n) {
  const t = new ke(n),
    e = new Be(),
    s = yt(5214280),
    i = 3;
  for (let a = 0; a < i; a++) {
    const o = (a / i) * Dn + t.range(-0.4, 0.4),
      r = t.range(0.08, 0.2),
      l = Math.cos(o) * r,
      c = Math.sin(o) * r,
      f = t.range(0.12, 0.22),
      d = e.vertex(l - 0.012, 0, c, Ht(s, 0.7), 0, 1, 0, 0),
      h = e.vertex(l + 0.012, 0, c, Ht(s, 0.7), 0, 1, 0, 0),
      u = e.vertex(l, f, c, s, 0, 1, 0, 0.5);
    e.tri(d, h, u);
    const m = t.range(0.1, 0.13),
      x = e.vertex(l, f + 0.025, c, [1, 0.85, 0.4], 0, 1, 0, 0.5),
      p = t.range(0, Dn);
    for (let g = 0; g < 5; g++) {
      const y = p + (g / 5) * Dn,
        v = 0.42,
        _ = e.vertex(
          l + Math.cos(y - v) * m * 0.75,
          f + 0.012,
          c + Math.sin(y - v) * m * 0.75,
          [0.92, 0.92, 0.92],
          0,
          1,
          0,
          0.5,
          0,
          1,
        ),
        k = e.vertex(l + Math.cos(y) * m, f + 0.004, c + Math.sin(y) * m, [1, 1, 1], 0, 1, 0, 0.5, 0, 1),
        M = e.vertex(
          l + Math.cos(y + v) * m * 0.75,
          f + 0.012,
          c + Math.sin(y + v) * m * 0.75,
          [0.92, 0.92, 0.92],
          0,
          1,
          0,
          0.5,
          0,
          1,
        );
      e.quad(x, M, k, _);
    }
  }
  return bs(e);
}

function wN(n) {
  const t = new ke(n),
    e = new Be(),
    s = yt(5212740),
    i = yt(8368206),
    a = yt(11849576),
    o = 3;
  for (let r = 0; r < o; r++) {
    const l = (r / o) * Dn + t.range(-0.6, 0.6),
      c = t.range(0.2, 0.36),
      f = t.range(0.035, 0.05),
      d = t.range(0.08, 0.2),
      h = Math.cos(l),
      u = Math.sin(l),
      m = e.vertex(h * 0.03 + u * f, 0, u * 0.03 - h * f, s, 0, 1, 0, 0),
      x = e.vertex(h * 0.03 - u * f, 0, u * 0.03 + h * f, s, 0, 1, 0, 0),
      p = e.vertex(h * d * 0.5 + u * f * 0.7, c * 0.6, u * d * 0.5 - h * f * 0.7, i, 0, 1, 0, 0.5),
      g = e.vertex(h * d * 0.5 - u * f * 0.7, c * 0.6, u * d * 0.5 + h * f * 0.7, i, 0, 1, 0, 0.5),
      y = e.vertex(h * d, c, u * d, a, 0, 1, 0, 1);
    (e.quad(m, x, g, p), e.tri(p, g, y));
  }
  return bs(e);
}

function MN() {
  const n = new Be(),
    t = yt(5915446),
    e = yt(15251530),
    s = 4.2;
  (gn(
    n,
    [
      [0, -0.2, 0, 0.09],
      [0, s, 0, 0.07],
    ],
    { sides: 6, c0: Ht(t, 0.7), c1: t },
  ),
    gn(
      n,
      [
        [-0.62, s - 0.35, 0, 0.045],
        [0.62, s - 0.35, 0, 0.045],
      ],
      { sides: 5, c0: e, c1: e },
    ),
    Xo(n, 0, s - 0.05, 0, 0.5, 0.11, 0, 0, e, Ht(e, 1.3), 0.25, 5));
  const i = 4,
    a = 6,
    o = 1.1,
    r = 2.5,
    l = s - 0.38,
    c = [];
  for (let p = 0; p <= a; p++) {
    const g = [],
      y = p / a;
    for (let v = 0; v <= i; v++) {
      const _ = v / i,
        k = (_ - 0.5) * o,
        M = p === a ? Math.abs(_ - 0.5) * 2 * 0.36 - 0.36 : 0,
        S = l - y * r - M,
        b = Math.abs(_ - 0.5) > 0.38,
        w = 0.82 + 0.18 * (1 - y) + (b ? 0.06 : 0),
        T = b || p === 0 ? e : [w, w, w];
      g.push(n.vertex(k, S, 0.06, T, 0, 0.15, 1, y * y * 0.9, 0, b || p === 0 ? 0 : 1, 1));
    }
    c.push(g);
  }
  for (let p = 0; p < a; p++)
    for (let g = 0; g < i; g++) n.quad(c[p][g], c[p + 1][g], c[p + 1][g + 1], c[p][g + 1]);
  const f = l - r * 0.42,
    d = 0.2,
    h = n.vertex(0, f + d * 1.5, 0.075, e, 0, 0, 1, 0.16, 0.3),
    u = n.vertex(-d, f, 0.075, e, 0, 0, 1, 0.2, 0.3),
    m = n.vertex(0, f - d * 1.5, 0.075, e, 0, 0, 1, 0.26, 0.3),
    x = n.vertex(d, f, 0.075, e, 0, 0, 1, 0.2, 0.3);
  return (n.quad(h, u, m, x), bs(n));
}

function kN() {
  const n = new Be();
  gn(
    n,
    [
      [0, -0.2, 0, 0.5],
      [0, 0.25, 0, 0.5],
      [0, 0.4, 0, 0.3],
      [0, 1.5, 0, 0.24],
      [0, 1.65, 0, 0.42],
      [0, 1.85, 0, 0.46],
    ],
    { sides: 6, c0: [0.6, 0.62, 0.68], c1: [1, 1, 1], cap: !0 },
  );
  const s = yt(15251530);
  return (
    gn(
      n,
      [
        [0, 1.86, 0, 0.5],
        [0, 1.96, 0, 0.5],
      ],
      { sides: 6, c0: s, c1: s, cap: !0 },
    ),
    bs(n)
  );
}

function SN() {
  const n = new Be();
  return (
    Xo(n, 0, 2.25, 0, 0.95, 0.2, 0, 0, [0.75, 0.75, 0.75], [1, 1, 1], 1, 3),
    Xo(n, 0, 2.3, 0, 0.42, 0.2, Math.PI, 0, [0.75, 0.75, 0.75], [1, 1, 1], 1, 4),
    bs(n)
  );
}

function TN(n) {
  const t = new ke(n),
    e = new Be(),
    s = yt(11118240),
    i = yt(7302776),
    a = t.range(0.4, 0.7),
    o = t.range(0.22, 0.45),
    r = t.range(0.28, 0.4);
  return (
    Ts(e, 0, o * 0.45, 0, a, o, r, { detail: 0, bump: 0.12, seed: n, bottom: i, top: s, flat: !0 }),
    bs(e)
  );
}

function EN(n) {
  const t = new ke(n),
    e = new Be(),
    s = yt(4165461),
    i = yt(7977058),
    a = yt(5216848),
    o = 10,
    r = t.range(0.45, 0.8),
    l = e.vertex(0, 0.012, 0, s, 0, 1, 0),
    c = [],
    f = [];
  for (let d = 0; d <= o; d++) {
    const h = r * 0.5 + (d / o) * (Dn - r),
      u = 0.94 + 0.06 * Math.sin(d * 2.1 + n);
    (c.push(e.vertex(Math.cos(h) * 0.55, 0.014, Math.sin(h) * 0.55, d % 2 === 0 ? i : a, 0, 1, 0)),
      f.push(
        e.vertex(
          Math.cos(h) * u,
          0.03,
          Math.sin(h) * u,
          Ht(i, 0.92),
          Math.cos(h) * 0.3,
          0.95,
          Math.sin(h) * 0.3,
        ),
      ));
  }
  for (let d = 0; d < o; d++) (e.tri(l, c[d + 1], c[d]), e.quad(c[d], c[d + 1], f[d + 1], f[d]));
  return bs(e);
}

function AN() {
  const n = new Be();
  gn(
    n,
    [
      [0, -0.1, 0, 0.02],
      [0, 0.22, 0, 0.018],
    ],
    { sides: 3, c0: yt(4160072), c1: yt(5938262), sway1: 0.3 },
  );
  const t = 5,
    e = n.vertex(0, 0.5, 0, [1, 1, 1], 0, 1, 0, 0.4, 0.15, 1),
    s = n.vertex(0, 0.2, 0, [0.75, 0.75, 0.75], 0, -1, 0, 0.3, 0, 1),
    i = [];
  for (let a = 0; a < t; a++) {
    const o = (a / t) * Dn;
    i.push(
      n.vertex(
        Math.cos(o) * 0.1,
        0.31,
        Math.sin(o) * 0.1,
        [0.9, 0.9, 0.9],
        Math.cos(o),
        0.3,
        Math.sin(o),
        0.35,
        0.1,
        1,
      ),
    );
  }
  for (let a = 0; a < t; a++) (n.tri(i[a], e, i[(a + 1) % t]), n.tri(s, i[a], i[(a + 1) % t]));
  return bs(n);
}

const RN = 3.6,
  b8 = 1.6,
  _8 = 2.5;

function CN() {
  const n = (i, a, o) => Array.from({ length: i }, (r, l) => a(o + l * 101)),
    t = yt(na.amber),
    e = {
      trees: n(4, (i) => c2(i), 11),
      accentTrees: [
        c2(211, { dark: 12085892, mid: 15247800, light: 16770026 }),
        c2(223, { dark: 9071156, mid: 12884554, light: 15257742 }),
      ],
      willows: n(2, fN, 307),
      farTrees: n(3, dN, 17),
      pines: n(3, hN, 23),
      shrubs: n(3, uN, 37),
      rocks: n(4, (i) => y_(i, !1), 41),
      boulders: n(3, (i) => y_(i, !0), 53),
      crystals: n(3, (i) => v_(i, !1), 67),
      bigCrystals: n(2, (i) => v_(i, !0), 79),
      pillars: n(2, (i) => b_(i, !1), 83),
      tallPillars: n(2, (i) => b_(i, !0), 97),
      mushrooms: n(3, mN, 103),
      brackets: n(2, gN, 109),
      lanterns: n(2, (i) => __(i, Ht(t, 1), [1, 0.5, 0.18], 1), 113),
      bells: n(2, (i) => __(i, [0.8, 0.8, 0.8], [1, 1, 1], 0.5, !0), 211),
      ferns: n(3, xN, 157),
      vines: n(3, yN, 163),
      drapes: n(3, vN, 167),
      reeds: n(2, bN, 173),
      flowers: n(3, _N, 127),
      tufts: n(4, wN, 131),
      ruinStones: n(3, TN, 139),
      lilyPads: n(2, EN, 149),
      lotusBud: AN(),
      banner: MN(),
      brazier: kN(),
      brazierCrystal: SN(),
    },
    s = [];
  for (const i of Object.values(e)) Array.isArray(i) ? s.push(...i) : s.push(i);
  return { ...e, dispose: () => s.forEach((i) => i.dispose()) };
}

const ah = Math.PI * 2,
  d3 = [
    {
      stone: yt(Yt.blue.stone),
      stoneDark: yt(Yt.blue.stoneDark),
      trim: yt(Yt.blue.trim),
      glow: yt(Yt.blue.glow),
      crystal: [Ht(yt(Yt.blue.glow), 0.7), Pt(yt(Yt.blue.glow), [1, 1, 1], 0.35)],
      crystalTint: yt(Yt.blue.glow),
      crystalGlow: 1,
      cloth: yt(3108832),
    },
    {
      stone: yt(6969954),
      stoneDark: yt(Yt.red.stoneDark),
      trim: yt(Yt.red.trim),
      glow: yt(Yt.red.glow),
      crystal: [yt(14039574), yt(15882790)],
      crystalTint: yt(15222814),
      crystalGlow: 0.4,
      cloth: yt(14169388),
    },
  ],
  ip = new Ke();

function LN(n) {
  const t = new Be(),
    e = n.stoneDark,
    s = n.stone;
  gn(
    t,
    [
      [0, -0.2, 0, 0.92],
      [0, 0.45, 0, 0.92],
      [0, 0.55, 0, 0.78],
      [0, 0.8, 0, 0.78],
      [0, 0.9, 0, 0.62],
      [0, 3.1, 0, 0.54],
      [0, 3.22, 0, 0.72],
      [0, 3.5, 0, 0.76],
      [0, 3.6, 0, 0.6],
    ],
    { sides: 4, c0: e, c1: s, cap: !0 },
  );
  for (const i of [1.25, 2.75])
    gn(
      t,
      [
        [0, i, 0, 0.64],
        [0, i + 0.14, 0, 0.63],
      ],
      { sides: 4, c0: n.trim, c1: Ht(n.trim, 1.15) },
    );
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * ah + Math.PI / 4,
      o = Math.cos(a),
      r = Math.sin(a),
      l = 0.415,
      c = 0.05,
      f = -r * c,
      d = o * c,
      h = n.glow,
      u = t.vertex(o * l - f, 1.55, r * l - d, h, o, 0, r, 0, 0.35),
      m = t.vertex(o * l + f, 1.55, r * l + d, h, o, 0, r, 0, 0.35),
      x = t.vertex(o * (l - 0.02) + f, 2.6, r * (l - 0.02) + d, h, o, 0, r, 0, 0.35),
      p = t.vertex(o * (l - 0.02) - f, 2.6, r * (l - 0.02) - d, h, o, 0, r, 0, 0.35);
    t.quad(u, m, x, p);
  }
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * ah;
    Xo(t, Math.cos(a) * 0.5, 3.55, Math.sin(a) * 0.5, 0.38, 0.09, 0, 0, n.trim, Ht(n.trim, 1.2), 0.1, i);
  }
  return t.build();
}

function IN(n) {
  const t = new Be();
  return (
    Xo(t, 0, 4, 0, 1.15, 0.26, 0, 0, n.crystal[0], n.crystal[1], n.crystalGlow, 3),
    Xo(
      t,
      0,
      4.05,
      0,
      0.5,
      0.26,
      Math.PI,
      0,
      n.crystal[0],
      Pt(n.crystal[0], n.crystal[1], 0.6),
      n.crystalGlow,
      4,
    ),
    t.build()
  );
}

function PN(n) {
  const t = new Be();
  return (
    ip.identity(),
    yf(t, ip, 0.95, 0.6, 0.62, 0.02, n.stone, Pt(n.stoneDark, n.stone, 0.5)),
    ip.makeTranslation(0, 0.62, 0),
    yf(t, ip, 1.05, 0.7, 0.12, 0.03, Pt(n.stone, [1, 1, 1], 0.12), n.stone),
    t.build()
  );
}

function DN(n) {
  const t = new Be(),
    e = 0.42,
    s = n.stoneDark,
    i = n.stone,
    a = [
      [0.5, -0.1],
      [0.5, 0.35],
      [0.38, 0.5],
      [0.3, 1.5],
      [0.18, 1.65],
      [0.1, 2.3],
      [0, 2.4],
    ],
    o = (r, l, c, f, d, h) => {
      const u = l[0] - r[0],
        m = l[1] - r[1],
        x = l[2] - r[2],
        p = f[0] - r[0],
        g = f[1] - r[1],
        y = f[2] - r[2];
      let v = m * y - x * g,
        _ = x * p - u * y,
        k = u * g - m * p;
      const M = Math.hypot(v, _, k) || 1;
      ((v /= M), (_ /= M), (k /= M));
      const S = t.vertex(r[0], r[1], r[2], d, v, _, k),
        b = t.vertex(l[0], l[1], l[2], d, v, _, k),
        w = t.vertex(c[0], c[1], c[2], h, v, _, k),
        T = t.vertex(f[0], f[1], f[2], h, v, _, k);
      t.quad(S, b, w, T);
    };
  for (let r = 0; r < a.length - 1; r++) {
    const [l, c] = a[r],
      [f, d] = a[r + 1],
      h = r / (a.length - 1),
      u = (r + 1) / (a.length - 1),
      m = Pt(s, i, h),
      x = Pt(s, i, u);
    (o([l, c, e], [l, c, -e], [f, d, -e], [f, d, e], m, x),
      o([-0.1, c, e], [l, c, e], [f, d, e], [-0.1, d, e], Ht(m, 0.9), Ht(x, 0.9)),
      o([l, c, -e], [-0.1, c, -e], [-0.1, d, -e], [f, d, -e], Ht(m, 0.9), Ht(x, 0.9)));
  }
  return (
    o(
      [0.39, 0.5, e + 0.005],
      [0.39, 0.5, -e - 0.005],
      [0.385, 0.58, -e - 0.005],
      [0.385, 0.58, e + 0.005],
      n.trim,
      n.trim,
    ),
    t.build()
  );
}

function zN(n, t) {
  const e = new Be(),
    s = 0.85,
    i = 16,
    a = e.vertex(0.1, 0, 0, n.stone, 1, 0, 0),
    o = [],
    r = [];
  for (let h = 0; h < i; h++) {
    const u = (h / i) * ah;
    (o.push(
      e.vertex(0.1, Math.sin(u) * s * 0.9, Math.cos(u) * s * 0.9, Pt(n.stoneDark, n.stone, 0.7), 1, 0, 0),
    ),
      r.push(
        e.vertex(
          0,
          Math.sin(u) * s,
          Math.cos(u) * s,
          n.stoneDark,
          0.5,
          Math.sin(u) * 0.86,
          Math.cos(u) * 0.86,
        ),
      ));
  }
  for (let h = 0; h < i; h++) {
    const u = (h + 1) % i;
    (e.tri(a, o[h], o[u]), e.quad(o[h], r[h], r[u], o[u]));
  }
  const l = Pt(n.glow, n.trim, 0.25),
    c = 0.115,
    f = (h, u, m) => {
      const x = h.length;
      for (let p = 0; p < x; p++) {
        const [g, y] = h[p],
          [v, _] = h[(p + 1) % x],
          k = v - g,
          M = _ - y,
          S = Math.hypot(k, M) || 1,
          b = (-M / S) * u,
          w = (k / S) * u,
          T = e.vertex(c, g - b, y - w, l, 1, 0, 0, 0, 0.4),
          E = e.vertex(c, g + b, y + w, l, 1, 0, 0, 0, 0.4),
          A = e.vertex(c, v + b, _ + w, l, 1, 0, 0, 0, 0.4),
          C = e.vertex(c, v - b, _ - w, l, 1, 0, 0, 0, 0.4);
        (e.quad(T, E, A, C), e.quad(C, A, E, T));
      }
    },
    d = [];
  for (let h = 0; h < 20; h++) {
    const u = (h / 20) * ah;
    d.push([Math.sin(u) * s * 0.72, Math.cos(u) * s * 0.72]);
  }
  if ((f(d, 0.03), t))
    for (const h of [-1, 0, 1]) {
      const u = h === 0 ? 0.56 : 0.4,
        m = h * 0.26,
        x = -0.34;
      f(
        [
          [x, m - 0.13],
          [x + u * 0.45, m - 0.15 + h * 0.03],
          [x + u, m + h * 0.06],
          [x + u * 0.5, m + 0.13 + h * 0.03],
          [x, m + 0.13],
        ],
        0.028,
      );
    }
  else {
    const h = [];
    for (let u = 0; u < 16; u++) {
      const m = (u / 16) * ah,
        x = s * (u % 2 === 0 ? 0.6 : 0.27);
      h.push([Math.cos(m) * x, Math.sin(m) * x]);
    }
    f(h, 0.03);
  }
  return e.build();
}

function NN(n) {
  const t = new Be();
  return (
    gn(
      t,
      [
        [0, -0.05, 0, 0.2],
        [0, 0.1, 0, 0.2],
        [0, 0.14, 0, 0.13],
        [0, 0.22, 0, 0.11],
        [0, 0.26, 0, 0.16],
      ],
      { sides: 8, c0: n.stoneDark, c1: n.stone, cap: !0 },
    ),
    Ts(t, 0, 0.32, 0, 0.075, 0.09, 0.075, {
      detail: 0,
      seed: 5,
      bottom: n.glow,
      top: Pt(n.glow, [1, 1, 1], 0.5),
      glow: 1,
    }),
    t.build()
  );
}

function w_(n) {
  const t = d3[n],
    e = {
      gatePillar: LN(t),
      gateCrystal: IN(t),
      merlon: PN(t),
      buttress: DN(t),
      emblem: zN(t, n === 1),
      lowLamp: NN(t),
    };
  return { ...e, dispose: () => Object.values(e).forEach((s) => s.dispose()) };
}

const h3 = 0.4,
  Gc = 0.8,
  M_ = [Gc, 1.3, 1.95, 2.8, 3.9, 5.3, 7.2, 30],
  FN = [
    [Gc, 0],
    [1.5, 0.08],
    [2.6, 0.22],
    [4.2, 0.36],
    [7, 0.46],
    [30, 0.48],
  ];

function k_(n) {
  const t = FN;
  if (n <= t[0][0]) return t[0][1];
  for (let e = 1; e < t.length; e++)
    if (n <= t[e][0]) return Mn(t[e - 1][1], t[e][1], (n - t[e - 1][0]) / (t[e][0] - t[e - 1][0]));
  return t[t.length - 1][1];
}

function UN(n, t) {
  const e = { x: 0, y: 0 };
  let s = 0,
    i = 0;
  const a = 0.12;
  for (let o = a; o < 16; o += a) {
    ((e.x = t.x + t.nx * o), (e.y = t.z + t.nz * o));
    const r = -Er(e, n);
    if (r > s) ((s = r), (i = o));
    else if (r < s - 0.02) break;
  }
  return { maxD: Math.max(s, 0.05), k: i > 0 ? i / Math.max(s, 0.05) : 1 };
}

const Wl = Yt.env,
  S_ = yt(Wl.rockDark),
  fd = yt(Wl.rock),
  el = yt(Wl.rockLight),
  T_ = yt(Wl.rockWarm),
  f2 = yt(Wl.moss),
  d2 = yt(Wl.cliffGrass),
  ON = yt(Wl.cliffGrassLight),
  BN = yt(9411154),
  HN = yt(7037254),
  E_ = 0.12,
  A_ = 0.85,
  ap = 1;

function $N(n, t, e, s = {}) {
  const i = Jz(t, 1.1, 0.85, (w) => nn(w, e, 3)),
    a = new ke(e * 7919 + 13),
    o = i.length,
    r = [],
    l = [];
  let c = 0,
    f = 1 + a.int(4);
  for (let w = 0; w < o; w++) {
    const T = i[w];
    if ((f--, f <= 0 && w > 0 && w < o - 1)) {
      const E = i[w - 1],
        A = i[w + 1],
        C = Math.hypot(T.x - E.x, T.z - E.z) || 1,
        R = Math.hypot(A.x - T.x, A.z - T.z) || 1,
        I = Math.min(E_, C * 0.3),
        P = Math.min(E_, R * 0.3);
      (r.push({ x: T.x + ((E.x - T.x) / C) * I, y: T.z + ((E.z - T.z) / C) * I }),
        l.push({ col: c, groove: 0, niche: 0 }),
        r.push({ x: T.x, y: T.z }),
        l.push({ col: c, groove: 1, niche: 0 }),
        c++,
        r.push({ x: T.x + ((A.x - T.x) / R) * P, y: T.z + ((A.z - T.z) / R) * P }),
        l.push({ col: c, groove: 0, niche: 0 }),
        (f = 1 + a.int(4)));
    } else (r.push({ x: T.x, y: T.z }), l.push({ col: c, groove: 0, niche: 0 }));
  }
  const d = c + 1,
    h = Px(r),
    u = h.length,
    m = h.map((w) => UN(t, w));
  let x = 0;
  for (const w of m) x = Math.max(x, w.maxD);
  const p = x < 2.62 ? "ridge" : nn(e, 11, 5) < 0.5 ? "terrace" : "steep",
    g = p === "ridge" ? 1.75 + nn(e, 7, 1) * 0.35 : 2.3 + Math.min(0.7, x * 0.13) + nn(e, 7, 1) * 0.35,
    y = [];
  for (const w of s.niches ?? []) {
    let T = -1,
      E = 2.5;
    for (let A = 0; A < u; A++) {
      const C = Math.hypot(h[A].x - w.x, h[A].z - w.y);
      C < E && m[A].maxD > ap + 0.9 && ((E = C), (T = A));
    }
    if (!(T < 0)) {
      y.push(T);
      for (let A = -3; A <= 3; A++) {
        const C = (T + A + u) % u,
          R = Math.abs(A) <= 1 ? 1 : Math.abs(A) === 2 ? 0.65 : 0.2;
        l[C].niche = Math.max(l[C].niche, R);
      }
    }
  }
  const v = [];
  for (let w = 0; w < d; w++) {
    const T = p === "terrace",
      E = a.chance(T ? 0.15 : 0.35);
    v.push({
      inset: a.range(0, T ? 0.34 : 0.22),
      rimDy: (a.next() - 0.5) * (p === "ridge" ? 0.9 : 0.7),
      ledgeY: E ? a.range(0.35, 0.6) : Mn(0.55, g * 0.68, a.next()),
      shelf: E ? a.range(0.02, 0.06) : T ? a.range(0.25, 0.6) : a.range(0.1, 0.3),
      tone: a.range(0.86, 1.12),
      bare: a.chance(0.28),
      moss: a.next(),
      batter: a.range(0, 0.16),
      groove: a.range(0.08, 0.3),
    });
  }
  const _ = (w) => {
      const T = l[w],
        E = v[T.col],
        A = (un(h[w].s * 0.16, e * 0.37, 2, e) - 0.5) * 0.5;
      return g + E.rimDy + A - T.groove * 0.14;
    },
    k = M_.filter((w, T) => T < 3 || w < x - 0.25 || T === M_.length - 1),
    M = 7 + k.length,
    S = [];
  y8(
    n,
    h,
    !0,
    M,
    (w, T, E) => {
      const A = m[T],
        C = l[T],
        R = v[C.col],
        I = C.groove,
        P = C.niche,
        F = (nn(T * 7 + E, e, 41) - 0.5) * 0.13 * (1 - P),
        L = (nn(T * 5 + E, e, 43) - 0.5) * 0.16 * (1 - P),
        B = R.groove,
        G = _(T),
        q = Mn(R.ledgeY, A_, P),
        ct = 0.1 + Mn(R.shelf, ap, P) + R.inset * (1 - P) + I * B,
        rt = Math.max(Gc, ct + 0.3 + R.batter);
      let mt,
        nt,
        H,
        st = 1,
        tt = 1;
      switch (E) {
        case 0:
          ((mt = 0), (nt = -0.05), (H = Pt(S_, fd, 0.25)), (st = 0.62));
          break;
        case 1:
          ((mt = 0.05 + Math.max(0, F) + I * B),
            (nt = q - 0.13 + L * 0.5),
            (H = Pt(S_, el, 0.42)),
            (st = 0.92 - I * 0.3));
          break;
        case 2:
          ((mt = 0.1 + I * B), (nt = q), (H = Pt(fd, el, 0.6)), (st = 1 - I * 0.35));
          break;
        case 3:
          ((mt = ct - 0.03),
            (nt = q + 0.04),
            (H = Pt(Pt(fd, el, 0.45), f2, ci(0.35, 0.8, R.moss) * 0.6 * (1 - P))),
            (st = 0.72 - I * 0.15),
            (tt = 0.75));
          break;
        case 4:
          ((mt = ct + 0.03 + F + R.batter * 0.5),
            (nt = Mn(q, G, 0.5) + L),
            (H = Pt(fd, el, 0.3)),
            (st = 0.95 - I * 0.35));
          break;
        case 5:
          ((mt = ct + 0.07 + F * 0.6 + R.batter),
            (nt = G - 0.2),
            (H = Pt(fd, el, R.bare ? 0.7 : 0.45)),
            (st = 1 - I * 0.4));
          break;
        case 6:
          ((mt = ct + 0.2 + R.batter),
            (nt = G - 0.03),
            (H = R.bare ? Pt(el, T_, 0.7) : Pt(f2, d2, 0.45)),
            (st = 1 - I * 0.4),
            (tt = R.bare ? 1 : 0.35));
          break;
        default: {
          const D = E - 7;
          mt = D === 0 ? rt : Math.max(k[D], rt + D * 0.12);
          const Q = Math.min(mt, A.maxD),
            $ = w.x + w.nx * Q * A.k,
            ut = w.z + w.nz * Q * A.k,
            N = ci(0, 1, (Q - Gc) / Math.max(0.25, Math.min(1.8, A.maxD - Gc)));
          {
            nt = Mn(G, g, N) + k_(Q);
            const J = un($ * 0.22, ut * 0.22, 2, e),
              Z = un($ * 0.5 + 7.1, ut * 0.5 + 1.3, 2, e + 3);
            let ot = Pt(d2, ON, ci(0.3, 0.7, J));
            ((ot = Pt(ot, BN, ci(0.58, 0.8, Z) * 0.6)),
              (ot = Pt(ot, HN, ci(0.7, 0.85, 1 - Z) * ci(0.5, 0.7, J) * 0.55)));
            const j = Math.min(1, (Q - Gc) / 0.7);
            ((H = R.bare ? Pt(Pt(el, T_, 0.5), ot, 0.45 + 0.55 * j) : Pt(Pt(f2, d2, 0.6), ot, j)),
              (tt = R.bare ? h3 + (1 - j) * 0.4 : h3));
          }
          return (
            (st = D === 0 ? 1 - I * 0.3 : 1),
            { t: Q * A.k, y: nt, color: D === 0 ? Ht(H, R.tone) : H, ao: st, tex: tt }
          );
        }
      }
      return { t: Math.min(mt, A.maxD) * A.k, y: nt, color: Ht(H, R.tone * (1 - I * 0.22)), ao: st, tex: tt };
    },
    (w) => (w < 6 ? Ir : Lx),
  );
  for (let w = 0; w < u; w++) {
    const T = l[w];
    if (T.groove) continue;
    const E = v[T.col],
      A = h[w],
      C = 0.1 + Mn(E.shelf, ap, T.niche) + E.inset * (1 - T.niche) + E.batter;
    S.push({
      x: A.x,
      z: A.z,
      ox: -A.nx,
      oz: -A.nz,
      y: _(w),
      inset: (C + 0.2) * m[w].k,
      bare: E.bare || T.niche > 0.1,
    });
  }
  const b = y.map((w) => {
    const T = h[w],
      E = (0.1 + ap * 0.5) * m[w].k;
    return { x: T.x + T.nx * E, z: T.z + T.nz * E, y: A_ + 0.04, ox: -T.nx, oz: -T.nz };
  });
  return { poly: t, kind: p, height: g, inradius: x, topY: (w) => g + k_(w), rim: S, niches: b };
}

const GN = new Ke(),
  R_ = new Ri(),
  C_ = new sa(),
  L_ = new dt(),
  I_ = new dt();

function ae(n, t, e, s, i, a = i, o = 0, r = 0) {
  return (
    C_.set(o, s, r, "YXZ"),
    R_.setFromEuler(C_),
    I_.set(n, t, e),
    L_.set(i, a, i),
    GN.compose(I_, R_, L_)
  );
}

const vr = (n, t) => Math.atan2(-t, n),
  O0 = Yt.env,
  zx = yt(O0.amber),
  oh = yt(O0.glowCyan),
  P_ = yt(O0.violet),
  VN = yt(O0.frost),
  WN = yt(16747082),
  D_ = yt(O0.starGold),
  jN = yt(Yt.blue.glow),
  qN = yt(Yt.red.glow);

function u3(n, t, e, s) {
  const i = n.map;
  for (const o of i.camps) {
    const r = Math.hypot(t - o.pos.x, e - o.pos.y);
    if (!(r > 13)) {
      if (o.monsterType === "frost_golem") return Pt(VN, [0.85, 0.95, 1], s.range(0, 0.4));
      if (o.monsterType === "ember_golem") return Pt(WN, D_, s.range(0, 0.4));
      if (o.monsterType === "abyss_drake" && r < 11) return Pt(P_, [0.6, 0.5, 1], s.range(0, 0.4));
      if (o.monsterType === "star_colossus" && r < 11) return Pt(D_, [1, 0.95, 0.8], s.range(0, 0.4));
    }
  }
  return n.baseDist(t, e, 14) < 9
    ? t - e < 0
      ? Pt(oh, jN, s.range(0.4, 0.8))
      : Pt(zx, qN, s.range(0.3, 0.7))
    : s.chance(0.62)
      ? Pt(oh, [0.8, 1, 0.95], s.range(0, 0.35))
      : Pt(P_, oh, s.range(0, 0.3));
}

function XN(n, t) {
  const e = Math.max(n[0], n[1], n[2]),
    s = Math.min(n[0], n[1], n[2]) * t,
    i = e > s + 1e-4 ? e / (e - s) : 1;
  return [(n[0] - s) * i, (n[1] - s) * i, (n[2] - s) * i];
}

function op(n, t, e) {
  const s = (n - t) / 110,
    i = un(n * 0.06, t * 0.06, 2, 77),
    a = Math.max(0, s) * 0.22 + (i - 0.5) * 0.3,
    o = e.range(0.78, 0.94);
  return [o * (1 + a * 0.5), o * (1 + a * 0.08), o * (1 - a * 0.35)];
}

const h2 = CL,
  YN = 0.55,
  z_ = 0.7;

function KN(n, t, e, s) {
  const i = n.map.bound;
  let a = 14;
  for (const l of [-1.1, 0, 1.1])
    for (let c = 0.5; c < a; c += 0.5) {
      const f = t + l,
        d = e - c;
      if (Math.abs(f) > i || Math.abs(d) > i) break;
      if (n.solidDist(f, d, 2) > 0.05) {
        a = c;
        break;
      }
    }
  const o = ((a + z_) / h2 - s) / RN,
    r = (a + z_ - s * h2) / (b8 * 0.8 + _8 * h2);
  return Math.min(o, r);
}

function ZN() {
  return { glows: [], aoBlobs: [], casters: [], ripples: [] };
}

class QN {
  constructor(t = 8) {
    this.spacing = t;
  }
  spacing;
  cells = new Map();
  key(t, e) {
    return (t + 512) * 4096 + (e + 512);
  }
  claim(t, e, s = this.spacing) {
    const i = this.spacing,
      a = Math.floor(t / i),
      o = Math.floor(e / i),
      r = Math.ceil(s / i);
    for (let l = -r; l <= r; l++)
      for (let c = -r; c <= r; c++) {
        const f = this.cells.get(this.key(a + c, o + l));
        if (f) {
          for (const d of f) if (Math.hypot(d[0] - t, d[1] - e) < s) return !1;
        }
      }
    return (this.reserve(t, e), !0);
  }
  reserve(t, e) {
    const s = this.key(Math.floor(t / this.spacing), Math.floor(e / this.spacing)),
      i = this.cells.get(s);
    i ? i.push([t, e]) : this.cells.set(s, [[t, e]]);
  }
}

const p3 = [yt(O0.petalWhite), yt(16770720), yt(O0.petalPink), yt(13623551), yt(14731519), yt(16764832)];
export { sN, tl, yf, cN, Ts, gn, Xo, Ho, b8, _8, CN, d3, w_, h3, $N, ae, vr, O0, zx, oh, u3, XN, op, YN, KN, ZN, QN, p3 };
