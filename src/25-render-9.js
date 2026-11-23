// 25-render-9.js — render｜73 个顶层语句｜63KB
// 对应 game.pretty.js 第 49122–51324 行
// 关键内容：
//   sU                    云团：亮顶、蓝灰的谷；朝向太阳的一侧镶暖亮边，背光一侧
//   cU                    波纹法线(世界空间 → 视图空间)
//   Wa                    没有关节 ${t}
//   nU                    sky-dome
//   aU                    mountains
//   dU                    position
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { Ee, Ul, fi, pi, ri } from './04-audio-2.js';
import { Ri, dt } from './05-three.js';
import { Ke, Ut, sa } from './06-three-2.js';
import { Ae, An, Bn, Ji, N0, Sn, pm } from './07-three-3.js';
import { ex, xm } from './08-three-4.js';
import { ee } from './10-render-2.js';
import { Yt, fs, ke, nn, un } from './14-three-7.js';
import { Df, Ff, If, KL, Nf, Pf, Qc, Vl, aa, as, cL, hL, jM, mf } from './15-render-4.js';
import { Ah, Be, Bf, Cx, Fn, H1, Ht, Kz, Pt, Yz, Zz, c_, mn, qz, xf, yo, yt } from './21-core-4.js';
import { $N, CN, QN, Ts, ZN, ae, cN, gn, sN, vr } from './22-render-6.js';
import { JN, _F, cF, hF, iF, lF, pF, tF } from './23-render-7.js';
import { GF, Oo, PF, S8, SF, T8, TF, XF, X_, YF, Y_, _f, bf, ef, jF, j_, q_, vf, x3, xs } from './24-render-8.js';

function KF() {
  const n = new Be(),
    t = Pt(Oo, xs, 0.3);
  (j_(n, 0, 0.34, 0, 0.82, 0.38, 0.82, xs, t),
    j_(n, 0, 0.46, 0, 0.66, 0.12, 0.66, ef, xs),
    gn(
      n,
      [
        [0, 0.46, 0, 0.3],
        [0, 0.9, 0, 0.25],
        [0, 1.45, 0, 0.23],
        [0.01, 1.82, 0, 0.3],
        [0.02, 1.96, 0, 0.2],
      ],
      { sides: 8, c0: t, c1: xs, cap: !0 },
    ),
    Ts(n, 0.04, 2.12, 0, 0.22, 0.26, 0.21, {
      detail: 1,
      bump: 0.03,
      seed: 11,
      bottom: Pt(t, xs, 0.5),
      top: ef,
      puffCenter: [0, 2, 0],
      puff: 0.3,
    }));
  const e = [0.06, 0.06, 0.09],
    s = n.vertex(0.2, 2.08, 0, e, 1, 0, 0),
    i = [];
  for (let o = 0; o < 7; o++) {
    const r = (o / 7) * bf;
    i.push(n.vertex(0.215, 2.08 + Math.sin(r) * 0.15, Math.cos(r) * 0.11, Ht(e, 1.6), 1, 0, 0));
  }
  for (let o = 0; o < 7; o++) n.tri(s, i[o], i[(o + 1) % 7]);
  for (const o of [-1, 1])
    gn(
      n,
      [
        [0.02, 1.8, o * 0.27, 0.085],
        [0.14, 1.55, o * 0.3, 0.075],
        [0.3, 1.42, o * 0.14, 0.06],
      ],
      { sides: 5, c0: xs, c1: Pt(xs, ef, 0.5), cap: !0 },
    );
  const a = (o) => {
    const r = [];
    for (let l = 0; l <= 8; l++) {
      const c = (l / 8) * bf,
        f = Math.cos(c) * 0.2,
        d = Math.sin(c) * 0.2;
      r.push(o === "x" ? [0.36, 1.46 + d, f, 0.02] : [0.36 + f, 1.46 + d * 0.35, d * 0.94, 0.02]);
    }
    gn(n, r, { sides: 4, c0: _f, c1: Ht(_f, 1.15), glow: 0.12 });
  };
  return (
    a("x"),
    a("z"),
    Ts(n, 0.36, 1.46, 0, 0.055, 0.055, 0.055, {
      detail: 0,
      seed: 2,
      bottom: [0.7, 0.95, 1],
      top: [0.9, 1, 1],
      glow: 0.9,
    }),
    n.build()
  );
}

function K_(n) {
  const t = new ke(n),
    e = new Be(),
    s = 0.95,
    i = 1.3,
    a = t.range(1.2, 1.9),
    o = 7,
    r = 0.035,
    l = xs,
    c = [];
  for (let d = 0; d <= o; d++) {
    const h = -a / 2 + (a * d) / o,
      u = 0.9 + nn(d, n, 3) * 0.18;
    c.push(
      e.vertex(Math.cos(h) * s, r, Math.sin(h) * s, Ht(l, u), 0, 1, 0),
      e.vertex(Math.cos(h) * i, r, Math.sin(h) * i, Ht(l, u * 0.95), 0, 1, 0),
    );
  }
  for (let d = 0; d < o; d++) e.quad(c[d * 2], c[d * 2 + 2], c[d * 2 + 3], c[d * 2 + 1]);
  const f = [0.62, 0.9, 0.95];
  for (let d = 0; d < o; d++) {
    const h = -a / 2 + (a * (d + 0.5)) / o,
      u = 0.02,
      m = Math.cos(h),
      x = Math.sin(h),
      g = [
        [m * (s + 0.08) + x * u, x * (s + 0.08) - m * u],
        [m * (i - 0.08) + x * u, x * (i - 0.08) - m * u],
        [m * (i - 0.08) - x * u, x * (i - 0.08) + m * u],
        [m * (s + 0.08) - x * u, x * (s + 0.08) + m * u],
      ].map((y) => e.vertex(y[0], r + 0.008, y[1], f, 0, 1, 0, 0, 0.3, 0, 1));
    e.quad(g[0], g[1], g[2], g[3]);
  }
  return e.build();
}

function ZF() {
  const n = {
      starLamp: XF(),
      steles: [q_(61), q_(67)],
      fallenSteles: [X_(71), X_(73)],
      flag: YF(),
      mooringPosts: [Y_(79), Y_(83)],
      watcher: KF(),
      inlayArcs: [K_(89), K_(97)],
    },
    t = [];
  for (const e of Object.values(n)) Array.isArray(e) ? t.push(...e) : t.push(e);
  return { ...n, dispose: () => t.forEach((e) => e.dispose()) };
}

const QF = 9;

function JF(n) {
  const t = n.map,
    e = [],
    s = t.walls.map(() => []);
  return (
    t.walls.forEach((i, a) => {
      const o = [];
      for (let l = 0; l < i.length; l++) {
        const c = i[l],
          f = i[(l + 1) % i.length],
          d = Math.hypot(f.x - c.x, f.y - c.y);
        if (d < 6.5) continue;
        const h = (f.x - c.x) / d,
          u = (f.y - c.y) / d;
        let m = u,
          x = -h;
        if (
          (yo({ x: (c.x + f.x) / 2 + m * 0.2, y: (c.y + f.y) / 2 + x * 0.2 }, i) && ((m = -m), (x = -x)),
          !(x < -0.35))
        )
          for (let p = 2.6; p <= d - 2.6; p += 1.3) {
            const g = { x: c.x + h * p, y: c.y + u * p },
              y = g.x + m * 1.2,
              v = g.y + x * 1.2;
            if (
              n.riverDist(y, v) < 1.5 ||
              n.baseDist(y, v) < 2 ||
              n.padDist(y, v) < 1 ||
              n.bushDist(y, v) < 0.5 ||
              n.boundDist(g.x, g.y) < 3
            )
              continue;
            const _ = n.laneDist(y, v),
              k = n.campDist(y, v);
            let M = 0;
            (_ > -0.5 && _ < 7 ? (M = 2 - _ * 0.15) : k < 7 && (M = 1 - k * 0.05),
              !(M <= 0) &&
                ((M += x * 0.4 + nn(Math.round(g.x * 3), Math.round(g.y * 3), 17) * 0.3),
                o.push({ p: g, score: M })));
          }
      }
      o.sort((l, c) => c.score - l.score);
      let r = 0;
      for (const l of o) {
        if (r >= 3) break;
        e.some((c) => Math.hypot(c.x - l.p.x, c.y - l.p.y) < QF) || (e.push(l.p), s[a].push(l.p), r++);
      }
    }),
    s
  );
}

function tU(n, t) {
  let e = 1 / 0;
  const s = { x: t.x, y: t.y };
  for (const i of Object.values(n.map.lanes))
    for (let a = 1; a < i.length; a++) {
      const o = i[a - 1],
        r = i[a],
        l = Ah(t, o, r);
      if (l < e) {
        e = l;
        const c = (r.x - o.x) ** 2 + (r.y - o.y) ** 2 || 1,
          f = Math.min(1, Math.max(0, ((t.x - o.x) * (r.x - o.x) + (t.y - o.y) * (r.y - o.y)) / c));
        ((s.x = o.x + (r.x - o.x) * f), (s.y = o.y + (r.y - o.y) * f));
      }
    }
  return s;
}

function eU(n, t, e, s, i, a, o) {
  const r = e.map,
    l = new ke(9091);
  s.forEach((h) => {
    for (const u of h.niches) {
      const m = vr(u.ox, u.oz),
        x = u.x + u.ox * 1.4,
        p = u.z + u.oz * 1.4,
        g = e.campDist(x, p) < 6,
        y = l.next(),
        v = Ht([1, 1, 1], l.range(0.9, 1.04));
      (g && y < 0.55) || y < 0.12
        ? (n.add(
            t.watcher,
            ae(u.x - u.ox * 0.08, u.y - 0.04, u.z - u.oz * 0.08, m + l.range(-0.12, 0.12), 0.92),
            { tint: v },
          ),
          i.aoBlobs.push({ x: u.x, y: u.y + 0.03, z: u.z, r: 0.75, strength: 0.42 }))
        : y < 0.36
          ? (n.add(
              l.pick(t.steles),
              ae(
                u.x - u.ox * 0.12,
                u.y,
                u.z - u.oz * 0.12,
                m + l.range(-0.2, 0.2),
                0.95,
                0.95,
                0,
                l.range(-0.1, 0.02),
              ),
              { tint: v, glow: 1 },
            ),
            i.aoBlobs.push({ x: u.x, y: u.y + 0.03, z: u.z, r: 0.8, strength: 0.4 }))
          : (n.add(t.starLamp, ae(u.x + u.ox * 0.08, u.y - 0.02, u.z + u.oz * 0.08, m + Math.PI / 8, 1.08), {
              tint: v,
              glow: 1,
            }),
            i.aoBlobs.push({ x: u.x, y: u.y + 0.03, z: u.z, r: 0.6, strength: 0.38 }),
            a.reserve(u.x, u.z),
            i.glows.push({ x: x - u.ox * 0.3, z: p - u.oz * 0.3, y: 0.03, r: 1.8, color: x3 }),
            o.push({
              x: u.x,
              y: u.y + 1.2,
              z: u.z,
              radius: 0.5,
              color: x3,
              count: 2,
              mode: 0,
              range: 0.6,
              size: 0.6,
            }));
    }
  });
  const c = [yt(3108832), yt(14169388)];
  for (const h of r.towers) {
    const u = tU(e, h.pos);
    let m = h.pos.x - u.x,
      x = h.pos.y - u.y;
    const p = Math.hypot(m, x);
    p < 0.3 ? ((m = 0.7), (x = 0.7)) : ((m /= p), (x /= p));
    const g = m * 0.8,
      y = x * 0.8 - 0.6,
      v = Math.hypot(g, y) || 1;
    n.add(t.flag, ae(h.pos.x + (g / v) * 1.4, 0, h.pos.y + (y / v) * 1.4, l.range(-0.3, 0.3), 1), {
      tint: c[h.team],
      maskedTint: !0,
    });
  }
  const f = [],
    d = r.bound;
  for (let h = -d + 1; h < d - 1; h += 0.35)
    for (let u = -d + 1; u < d - 1; u += 0.35) {
      const m = e.laneDist(u, h);
      if (m < 0.3 || m > 0.65) continue;
      const x = e.riverDist(u, h);
      x < 0.55 ||
        x > 0.9 ||
        e.solidDist(u, h) < 0.5 ||
        f.some((p) => Math.hypot(p.x - u, p.y - h) < 2.2) ||
        f.push({ x: u, y: h });
    }
  for (const h of f)
    n.add(
      l.pick(t.mooringPosts),
      ae(h.x, 0, h.y, l.range(0, bf), l.range(0.95, 1.1), 1, l.range(-0.06, 0.06), l.range(-0.06, 0.06)),
      { tint: Ht([1, 1, 1], l.range(0.88, 1.02)) },
    );
  for (const h of Object.values(r.lanes)) {
    let u = l.range(4, 9);
    for (let m = 1; m < h.length; m++) {
      const x = h[m - 1],
        p = h[m],
        g = Math.hypot(p.x - x.x, p.y - x.y),
        y = (p.x - x.x) / g,
        v = (p.y - x.y) / g;
      for (; u < g; u += l.range(9, 15)) {
        const _ = l.chance(0.5) ? 1 : -1,
          k = r.laneWidth / 2 + l.range(0.75, 1.3),
          M = x.x + y * u - v * _ * k,
          S = x.y + v * u + y * _ * k,
          b = l.next(),
          w = l.range(0, bf);
        e.laneDist(M, S) < 0.55 ||
          e.riverDist(M, S) < 1.4 ||
          e.baseDist(M, S) < 1 ||
          e.padDist(M, S) < 0.8 ||
          e.solidDist(M, S) < 0.8 ||
          e.bushDist(M, S) < 0.6 ||
          e.campDist(M, S) < 0.5 ||
          (b < 0.45
            ? n.add(l.pick(t.fallenSteles), ae(M, 0, S, w, l.range(0.85, 1)), {
                shadow: !1,
                tint: Ht([1, 1, 1], l.range(0.86, 1)),
                glow: 1,
              })
            : n.add(l.pick(t.inlayArcs), ae(M, 0, S, w, l.range(0.8, 1.05)), {
                shadow: !1,
                tint: Ht([1, 1, 1], l.range(0.82, 0.98)),
                glow: 1,
              }));
      }
      u -= g;
    }
  }
}

const Nx = -46;

function nU() {
  const n = new xm(820, 24, 12),
    t = new An({
      uniforms: {
        cHorizon: { value: new Ut(Yt.env.horizon) },
        cZenith: { value: new Ut(Yt.env.zenith) },
        cFog: { value: new Ut(Yt.env.fog) },
      },
      vertexShader: `
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_Position = p.xyww;
      }
    `,
      fragmentShader: `
      uniform vec3 cHorizon;
      uniform vec3 cZenith;
      uniform vec3 cFog;
      varying vec3 vDir;
      void main() {
        float h = normalize(vDir).y;
        vec3 col = mix(cHorizon, cZenith, smoothstep(0.0, 0.55, h));
        col = mix(col, cFog, smoothstep(0.06, -0.12, h));
        gl_FragColor = vec4(col, 1.0);
        ${aa}
      }
    `,
      side: pi,
      depthWrite: !1,
      fog: !1,
    }),
    e = new Sn(n, t);
  return ((e.name = "sky-dome"), (e.renderOrder = -10), (e.frustumCulled = !1), e);
}

function sU() {
  const n = new ex(900, 48);
  n.rotateX(-Math.PI / 2);
  const t = new An({
      uniforms: {
        ...N0.clone(ee.fog),
        uTime: fs.uTime,
        uSunXZ: { value: new Ee(as.x, as.z).normalize() },
        cLight: { value: new Ut(Yt.env.cloud) },
        cShade: { value: new Ut(Yt.env.cloudShade) },
        cDeep: { value: new Ut(8365784) },
      },
      vertexShader: `
      #include <common>
      #include <fog_pars_vertex>
      varying vec3 vWorldPos;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorldPos = wp.xyz;
        vec4 mvPosition = viewMatrix * wp;
        gl_Position = projectionMatrix * mvPosition;
        #include <fog_vertex>
      }
    `,
      fragmentShader: `
      #include <common>
      #include <fog_pars_fragment>
      ${Vl}
      uniform float uTime;
      uniform vec2 uSunXZ;
      uniform vec3 cLight;
      uniform vec3 cShade;
      uniform vec3 cDeep;
      varying vec3 vWorldPos;
      void main() {
        vec2 p = vWorldPos.xz * 0.012;
        vec2 drift = vec2(uTime * 0.006, uTime * 0.0035);
        float n = fbm(p + drift);
        float n2 = fbm(p * 2.7 - drift * 1.6 + 7.3);
        float c = n * 0.65 + n2 * 0.35;
        // 云团：亮顶、蓝灰的谷；朝向太阳的一侧镶暖亮边，背光一侧压暗
        float lit = n - fbm(p + drift + uSunXZ * 0.045);
        vec3 col = mix(cDeep, cShade, smoothstep(0.25, 0.5, c));
        col = mix(col, cLight, smoothstep(0.45, 0.72, c));
        col += vec3(1.0, 0.93, 0.8) * clamp(lit * 3.4, -0.1, 0.24);
        // 高空更大一层云缓慢投下的云影
        float sh = fbm(p * 0.35 - drift * 0.6 + 3.1);
        col *= 1.0 - 0.16 * smoothstep(0.5, 0.72, sh);
        gl_FragColor = vec4(col * 1.05, 1.0);
        ${aa}
      }
    `,
      fog: !0,
    }),
    e = new Sn(n, t);
  return (
    (e.position.y = Nx),
    (e.name = "cloud-sea"),
    (e.frustumCulled = !1),
    e.updateMatrix(),
    (e.matrixAutoUpdate = !1),
    e
  );
}

function iU(n, t, e, s, i, a, o, r) {
  const f = [];
  for (let d = 0; d <= 4; d++) {
    const h = d / 4,
      u = [],
      m = Nx - 12 + (i + 12) * h,
      x = s * Math.pow(1 - h, 0.85) + (d === 4 ? 0 : s * 0.03);
    for (let p = 0; p < 9; p++) {
      const g = (p / 9) * Math.PI * 2 + a,
        y = x * (0.78 + nn(p + d * 13, a * 100, 7) * 0.5),
        v = m + (d > 0 && d < 4 ? (nn(p, d + a * 50, 9) - 0.5) * i * 0.16 : 0),
        _ = Math.min(1, Math.max(0, (h - 0.52) * 3.5 + (nn(p, d, 11) - 0.5) * 0.4)),
        k = Pt(Ht(o, 0.8 + h * 0.35), r, _);
      u.push(n.vertex(t + Math.cos(g) * y, v, e + Math.sin(g) * y, k));
    }
    f.push(u);
  }
  for (let d = 0; d < 4; d++)
    for (let h = 0; h < 9; h++) {
      const u = (h + 1) % 9;
      n.quad(f[d][h], f[d + 1][h], f[d + 1][u], f[d][u]);
    }
}

function aU() {
  const n = Qc({
      vertexColors: !0,
      flat: !0,
      steps: 2,
      softness: 0.14,
      rim: 0,
      lightTint: !1,
      glowBoost: 1.1,
    }),
    t = new Be(),
    e = new ke(8086),
    s = yt(7308984),
    i = yt(15923199),
    a = 34;
  for (let f = 0; f < a; f++) {
    const d = (f / a) * Math.PI * 2 + e.range(-0.06, 0.06),
      h = e.range(240, 430),
      u = e.range(70, 190) * (0.7 + 0.5 * un(Math.cos(d) * 2, Math.sin(d) * 2, 2, 5));
    iU(t, Math.cos(d) * h, Math.sin(d) * h, u * e.range(0.55, 0.85), u, e.next() * 6.28, s, i);
  }
  const o = yt(8160407),
    r = yt(5068398),
    l = yt(6991182);
  for (let f = 0; f < 9; f++) {
    const d = e.range(0, Math.PI * 2),
      h = e.range(112, 190),
      u = Math.cos(d) * h,
      m = Math.sin(d) * h,
      x = e.range(5, 13),
      p = e.range(-16, 6),
      g = x * e.range(1.2, 2),
      y = 8,
      v = [],
      _ = [],
      k = t.vertex(u, p + 0.6, m, l),
      M = t.vertex(u + e.range(-1, 1), p - g, m + e.range(-1, 1), r);
    for (let S = 0; S < y; S++) {
      const b = (S / y) * Math.PI * 2,
        w = x * e.range(0.8, 1.15);
      (v.push(t.vertex(u + Math.cos(b) * w, p + e.range(-0.3, 0.3), m + Math.sin(b) * w, Pt(l, o, 0.35))),
        _.push(t.vertex(u + Math.cos(b) * w * 0.72, p - g * 0.4, m + Math.sin(b) * w * 0.72, o)));
    }
    for (let S = 0; S < y; S++) {
      const b = (S + 1) % y;
      (t.tri(k, v[b], v[S]), t.quad(v[S], v[b], _[b], _[S]), t.tri(_[S], _[b], M));
    }
  }
  {
    const m = new dt(-0.32, 1, 0.22).normalize(),
      x = new dt(1, 0, 0).cross(m).normalize(),
      p = m.clone().cross(x).normalize(),
      g = yt(4877e3),
      y = yt(11066623),
      v = new dt(150, Nx - 20, -205),
      _ = [],
      k = [];
    for (let b = 0; b < 6; b++) {
      const w = (b / 6) * Math.PI * 2,
        T = x.clone().multiplyScalar(Math.cos(w)).addScaledVector(p, Math.sin(w)),
        E = v.clone().addScaledVector(T, 24 * 0.8),
        A = v
          .clone()
          .addScaledVector(m, 150 * 0.72)
          .addScaledVector(T, 24);
      (_.push(t.vertex(E.x, E.y, E.z, g, 0, 1, 0, 0, 0.25)),
        k.push(t.vertex(A.x, A.y, A.z, Pt(g, y, 0.6), 0, 1, 0, 0, 0.5)));
    }
    const M = v.clone().addScaledVector(m, 150),
      S = t.vertex(M.x, M.y, M.z, y, 0, 1, 0, 0, 0.8);
    for (let b = 0; b < 6; b++) {
      const w = (b + 1) % 6;
      (t.quad(_[b], k[b], k[w], _[w]), t.tri(k[b], S, k[w]));
    }
  }
  t.computeNormals();
  const c = new Sn(t.build(), n);
  return ((c.name = "mountains"), (c.matrixAutoUpdate = !1), (c.frustumCulled = !1), c);
}

function oU() {
  const n = new Ji();
  return ((n.name = "sky"), n.add(nU(), sU(), aU()), n);
}

const rU = { 1: 9427199, 2: 16742956, 3: 12114040, 4: Yt.env.amber, 5: Yt.env.violet, 6: 16764768 },
  Z_ = new Ut();

function lU(n, t, e) {
  const s = t.map;
  n.clear();
  for (const a of s.bases) {
    const o = a.team === 0 ? Yt.blue.glow : Yt.red.glow,
      r = xf(a.area);
    (n.stamp(r.x, r.y, 18, o, 0.18), n.stamp(a.fountain.x, a.fountain.y, 6, o, 0.35));
  }
  for (const a of s.towers) n.stamp(a.pos.x, a.pos.y, 5, a.team === 0 ? Yt.blue.glow : Yt.red.glow, 0.2);
  const i = s.river;
  for (let a = 0; a < i.length - 1; a++) {
    const o = i[a],
      r = i[a + 1],
      l = Math.hypot(r.x - o.x, r.y - o.y);
    for (let c = 0; c <= l; c += 3)
      n.stamp(o.x + ((r.x - o.x) * c) / l, o.y + ((r.y - o.y) * c) / l, 5.5, Yt.env.waterShallow, 0.12);
  }
  for (const a of s.camps) {
    const o = Cx[a.monsterType],
      r = Bf(a.monsterType);
    n.stamp(a.pos.x, a.pos.y, o >= 5 ? 8 : o <= 2 ? 7 : 6, rU[o], o === 3 ? 0.12 : 0.25 * (r > 5 ? 1 : 0.9));
  }
  for (const a of e.glows)
    (Z_.setRGB(a.color[0], a.color[1], a.color[2], Ul),
      n.stamp(a.x, a.z, Math.max(1.5, a.r * 1.5), Z_.getHex(ri), 0.3));
  for (const a of s.bushes) {
    const o = xf(a);
    n.stamp(o.x, o.y, 3, 12111706, 0.1);
  }
  for (const a of e.casters) n.occlude(a.x, a.z, a.radius * 1.5, 0.25);
  for (const a of t.walls) {
    const o = a.poly;
    for (let r = 0; r < o.length; r++) {
      const l = o[r],
        c = o[(r + 1) % o.length],
        f = Math.hypot(c.x - l.x, c.y - l.y);
      for (let d = 1; d < f; d += 2.2) {
        const h = l.x + ((c.x - l.x) * d) / f + mf.x * 1.3,
          u = l.y + ((c.y - l.y) * d) / f + mf.y * 1.3;
        t.wallDist(h, u, 3) > 0.2 && n.occlude(h, u, 2.2, 0.25);
      }
    }
  }
  n.bake();
}

const cU = `
${Pf}
varying vec3 vWorldPos;
varying vec3 vViewPosition;
void main() {
  vec3 objectNormal = vec3(0.0, 1.0, 0.0);
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  vWorldPos = worldPosition.xyz;
  ${Df}
}
`,
  fU = `
${If}
${Nf}
uniform sampler2D tNoise;
uniform sampler2D tSplatA;
uniform float uTime;
uniform float uSplatScale;
uniform vec2 uFlow;
uniform vec3 uShadeTintGround;
uniform vec3 cShallow;
uniform vec3 cDeep;
uniform vec3 cPit;
uniform vec3 cSky;
uniform vec3 cFoam;
uniform vec3 uPits[2];
varying vec3 vWorldPos;
varying vec3 vViewPosition;
const float TAU = 6.2831853;
void main() {
  vec2 wp = vWorldPos.xz;
  vec4 sa = texture2D(tSplatA, wp * uSplatScale + 0.5);
  float shore = -(sa.g - 0.5) * ${(H1.river * 2).toFixed(1)};
  float dLane = (sa.r - 0.5) * ${(H1.lane * 2).toFixed(1)};
  float t = uTime;
  vec4 n1 = texture2D(tNoise, wp * 0.061 - uFlow * t * 0.022);
  vec4 n2 = texture2D(tNoise, wp * 0.113 - uFlow * t * 0.041 + vec2(0.37, 0.71));
  // 波纹法线(世界空间 → 视图空间)
  vec3 Nw = normalize(vec3((n1.g - 0.5) * 0.4 + (n2.b - 0.5) * 0.3, 1.0, (n1.b - 0.5) * 0.4 + (n2.g - 0.5) * 0.3));
  vec3 N = normalize((viewMatrix * vec4(Nw, 0.0)).xyz);
  vec3 V = normalize(vViewPosition);
  float fres = pow(1.0 - max(dot(N, V), 0.0), 3.0);

  float ford = 1.0 - smoothstep(-1.2, 0.8, dLane);
  float depthF = smoothstep(0.1, 2.8, shore) * (1.0 - 0.32 * ford);
  // 河心的水色往浅色收一点(对色：河水中段 L* 60~64)
  vec3 tint = mix(cShallow, cDeep, depthF * 0.86);
  float alpha = mix(0.1, 0.4, depthF);

  // 两个史诗潭：水色加深(河底几乎看不见，突出潭的深)
  float pit = 0.0;
  vec2 pq = vec2(0.0);
  for (int i = 0; i < 2; i++) {
    vec2 d = wp - uPits[i].xy;
    float k = 1.0 - smoothstep(uPits[i].z * 0.72, uPits[i].z * 1.22, length(d));
    if (k > pit) {
      pit = k;
      pq = d;
    }
  }
  tint = mix(tint, cPit, pit * 0.9);
  alpha = mix(alpha, 0.74, pit * 0.85);

  float shadow = kitShadow();
  vec3 sun = kitSunColor();
  vec3 L = kitSunDir();
  vec3 amb = kitTintAmbient(kitAmbient(N), kitLightTint(wp));
  vec3 irr = amb + sun * max(dot(N, L), 0.0) * shadow;
  vec3 col = tint * RECIPROCAL_PI * irr;
  // 大块缓慢流动的明暗水纹：手绘感的浅色涡流
  float swirl = texture2D(tNoise, vec2(dot(wp, vec2(-uFlow.y, uFlow.x)) * 0.05, dot(wp, uFlow) * 0.018 - t * 0.012)).r;
  float swirl2 = texture2D(tNoise, vec2(dot(wp, vec2(-uFlow.y, uFlow.x)) * 0.11 + 0.4, dot(wp, uFlow) * 0.04 - t * 0.02)).g;
  float band = smoothstep(0.5, 0.68, swirl * 0.6 + swirl2 * 0.4);
  col = mix(col, col * 1.25 + vec3(0.015, 0.035, 0.035), band * 0.5 * depthF);
  alpha += band * 0.06 * depthF;
  #if WATER >= 2
  if (pit > 0.01) {
    // 潭内旋涡：极坐标里缓慢旋进的亮纹
    float pr = length(pq);
    float pa = atan(pq.y, pq.x) / TAU;
    float sw = texture2D(tNoise, vec2(pa * 2.0 + pr * 0.11 - t * 0.02, pr * 0.085 + t * 0.012)).g;
    float streak = smoothstep(0.5, 0.62, sw) * (1.0 - smoothstep(0.62, 0.78, sw));
    col += tint * RECIPROCAL_PI * irr * streak * pit * 1.1;
    alpha += streak * pit * 0.1;
  }
  #endif
  // 天光反射
  col = mix(col, cSky * (0.55 + 0.45 * shadow), fres * 0.5);
  alpha = mix(alpha, 0.85, fres * 0.6);

  #if WATER >= 2
  // 太阳碎闪：只在水纹亮带上零星出现
  vec3 H = normalize(L + V);
  float sp = pow(max(dot(N, H), 0.0), 220.0);
  float glint = smoothstep(0.3, 0.8, sp) * shadow * (0.25 + 0.75 * band);
  col += sun * glint * 0.9;
  alpha = max(alpha, glint);
  #endif

  // ── 泡沫 ──
  float fn = n1.r * 0.6 + n2.r * 0.4;
  // 拍岸沫：贴着水线，宽度被噪声撕碎，3.5 秒一个进退约 0.25 米的周期
  float lap = 0.125 + 0.125 * sin(t * (TAU / 3.5) + fn * 5.0 + dot(wp, vec2(0.23, 0.17)));
  float edgeW = 0.1 + 0.22 * fn + lap * 0.8;
  float edge = 1.0 - smoothstep(edgeW * 0.45, edgeW, shore - 0.3);
  float foam = edge * (0.5 + 0.5 * n2.b);
  // 向岸推进的一道细浪
  foam += smoothstep(0.72, 0.93, sin((shore - t * 0.3) * 5.0 + fn * 8.0) * 0.5 + 0.5) * (1.0 - smoothstep(0.45, 1.5, shore)) * 0.34;
  #if WATER >= 1
  // 漂沫：顺流漂移的碎沫，成簇，靠岸处多
  // (沿流向拉长的噪声取细带：一缕一缕的，不是点)
  vec2 fuv = vec2(dot(wp, vec2(-uFlow.y, uFlow.x)) * 0.36, dot(wp, uFlow) * 0.06 - t * 0.021);
  vec4 fl = texture2D(tNoise, fuv);
  float clump = smoothstep(0.52, 0.7, n1.r * 0.7 + (1.0 - smoothstep(0.4, 2.2, shore)) * 0.3);
  float streak = (1.0 - smoothstep(0.015, 0.05, abs(fl.b - 0.5))) * smoothstep(0.5, 0.64, fl.g);
  foam += streak * clump * 0.42 * (1.0 - pit * 0.7);
  #endif
  foam = clamp(foam, 0.0, 1.0);
  vec3 foamCol = cFoam * RECIPROCAL_PI * (amb + sun * shadow * 0.9);
  col = mix(col, foamCol, foam);
  alpha = max(alpha, foam * 0.78);
  col *= mix(uShadeTintGround, vec3(1.0), shadow);
  // 边界淡出：水面带两侧多出来的部分不应盖住岸
  alpha *= smoothstep(-0.9, -0.3, shore);

  gl_FragColor = vec4(col, alpha);
  ${aa}
}
`;

function dU(n, t, e, s) {
  const i = n.riverLine,
    a = n.map.riverWidth / 2 + 0.6,
    o = n.map.bound,
    r = [],
    l = [];
  for (let m = 0; m < i.length - 1; m++) {
    const x = i[m],
      p = i[m + 1],
      g = Math.hypot(p.x - x.x, p.y - x.y),
      y = (p.x - x.x) / g,
      v = (p.y - x.y) / g,
      _ = Math.ceil(g / 3);
    for (let k = 0; k < _; k++) {
      const M = (k / _) * g,
        S = ((k + 1) / _) * g,
        b = x.x + (y * (M + S)) / 2,
        w = x.y + (v * (M + S)) / 2;
      if (Math.max(Math.abs(b), Math.abs(w)) > o + 3) continue;
      const T = r.length / 3;
      for (const E of [M, S])
        for (const A of [-1, 1]) {
          const C = x.x + y * E - v * a * A,
            R = x.y + v * E + y * a * A;
          r.push(Math.max(-o - 0.35, Math.min(o, C)), Fn, Math.max(-o - 0.35, Math.min(o, R)));
        }
      l.push(T, T + 2, T + 1, T + 1, T + 2, T + 3);
    }
  }
  const c = new Bn();
  (c.setAttribute("position", new Ae(r, 3)), c.setIndex(l), c.computeBoundingSphere());
  const f = Yt.env,
    d = n.map.camps
      .filter((m) => m.monsterType === "abyss_drake" || m.monsterType === "star_colossus")
      .map((m) => new dt(m.pos.x, m.pos.y, Bf(m.monsterType)));
  for (; d.length < 2;) d.push(new dt(9999, 9999, 1));
  const h = new An({
      uniforms: Ff({
        tNoise: { value: e },
        tSplatA: { value: t.a },
        uTime: fs.uTime,
        uSplatScale: { value: 1 / (mn * 2) },
        uFlow: { value: S8(n) },
        cShallow: { value: new Ut(f.waterShallow) },
        cDeep: { value: new Ut(f.water) },
        cPit: { value: new Ut(1327214) },
        cSky: { value: new Ut(14677247) },
        cFoam: { value: new Ut(f.foam) },
        uPits: { value: d.slice(0, 2) },
      }),
      defines: { WATER: s.waterDetail },
      vertexShader: cU,
      fragmentShader: fU,
      lights: !0,
      fog: !0,
      transparent: !0,
      depthWrite: !1,
      side: fi,
    }),
    u = new Sn(c, h);
  return (
    (u.name = "water"),
    (u.receiveShadow = !0),
    (u.renderOrder = 1),
    (u.frustumCulled = !1),
    {
      mesh: u,
      setQuality(m) {
        h.defines.WATER !== m.waterDetail && ((h.defines.WATER = m.waterDetail), (h.needsUpdate = !0));
      },
    }
  );
}

const hU = 10,
  Q_ = 3.6,
  J_ = 4.6,
  uU = 35,
  tw = new pm(),
  ew = new Ke(),
  pU = 11,
  hd = new dt(),
  ud = new dt();

function* nw(n) {
  const t = {},
    e = {};
  let s = performance.now();
  const i = (j) => {
      const at = performance.now();
      ((t[j] = Math.round((t[j] ?? 0) + at - s)), (s = at));
    },
    a = () => {
      s = performance.now();
    },
    o = n.map,
    r = new qz(o),
    l = n.renderer.capabilities.getMaxAnisotropy(),
    c = Kz(r, 768, as);
  (i("splat"), yield 0.2, a());
  const f = cL(256, 7);
  i("noise");
  const d = n.layers.terrain,
    h = n.settings,
    u = T8(l);
  let m = null;
  for (let j = 1; !m; j++) {
    const at = u.next();
    at.done ? (m = at.value) : (i("ground"), yield 0.2 + 0.05 * j, a());
  }
  const x = GF(r, c, f, h, l, m);
  d.add(x.mesh);
  const p = dU(r, c, f, h);
  (d.add(p.mesh), i("ground"), yield 0.45, a());
  const g = hL(),
    y = Qc({
      vertexColors: !0,
      ramp: [0.05, 0.42, 0.55],
      softness: 0.1,
      map: g,
      triplanar: 0.3,
      mapGain: 1.75,
      mapMask: !0,
      rim: 0.08,
      kicker: 0.1,
      shadeTint: Yt.env.shadeRock,
      mapTop: x.grassTexture,
      mapTopScale: 0.1,
      mapTopGain: h.groundDetail > 0 ? J_ : Q_,
      mapTopNoise: f,
      mapTopDetail: h.groundDetail > 0,
      mapTopPatch: 0.6,
    }),
    v = Qc({
      vertexColors: !0,
      ramp: [0, 0.42, 0.6],
      softness: 0.3,
      rim: 0.12,
      rimPower: 2.6,
      kicker: 0.12,
      wind: 0.42,
      glowBoost: 1.7,
      shadeTint: Yt.env.shadeRock,
    }),
    _ = Qc({ vertexColors: !0, steps: 1, rim: 0, wind: 0.3, glowBoost: 1.5, side: fi, flipBackNormals: !1 }),
    k = JF(r),
    M = new c_(32),
    S = [];
  for (let j = 0; j < o.walls.length; j++) {
    const at = o.walls[j],
      Rt = xf(at);
    (S.push($N(M.at(Rt.x, Rt.y, !0), at, 100 + j * 7, { niches: k[j] })),
      j % 8 === 7 &&
        j < o.walls.length - 1 &&
        (i("cliffs"), yield 0.45 + 0.1 * ((j + 1) / o.walls.length), a()));
  }
  e.cliffs = M.triangleCount;
  const b = new Ji();
  ((b.name = "cliffs"), d.add(b));
  const w = [],
    T = (j) => {
      for (const at of j) {
        at.frustumCulled = !1;
        const Rt = at.geometry.boundingBox.clone();
        if (at.castShadow) {
          const kt = hU * KL,
            V = mf.x * kt,
            U = mf.y * kt;
          (V > 0 ? (Rt.max.x += V) : (Rt.min.x += V), U > 0 ? (Rt.max.z += U) : (Rt.min.z += U));
        }
        (Rt.expandByScalar(0.8), w.push({ mesh: at, box: Rt }));
      }
    };
  (i("cliffs"), yield 0.56, a(), T(M.build(y, y, b, "cliff", uU)), i("cliffs"), yield 0.58, a());
  const E = iF(r),
    A = new Ji();
  ((A.name = "border"), d.add(A), T(lF(r, E, A, y)), i("border"), yield 0.6, a());
  const C = CN(),
    R = ZF();
  (i("props"), yield 0.62, a());
  const I = new c_(32),
    P = ZN(),
    F = new QN(8),
    L = [],
    B = [],
    G = SF(r);
  (_F(I, C, r, S, P, F, L, B),
    pF(I, C, R, r, E, S, P, F, L, B),
    (e.campsBases = I.triangleCount),
    i("props"),
    yield 0.64,
    a(),
    eU(I, R, r, S, P, F, L),
    (e.props = I.triangleCount - e.campsBases),
    (e.curbs = cN(I, r)),
    i("props"),
    yield 0.66,
    a());
  const q = I.triangleCount;
  (JN(I, C, r, S, P, F),
    i("scatter"),
    yield 0.72,
    a(),
    tF(I, C, r, 1, P, F),
    i("scatter"),
    yield 0.78,
    a(),
    cF(I, C, r, E, P),
    (e.scatter = I.triangleCount - q),
    i("scatter"),
    yield 0.84,
    a());
  const et = new Ji();
  ((et.name = "scenery"),
    d.add(et),
    T(I.build(v, _, et, "scenery")),
    C.dispose(),
    R.dispose(),
    d.add(hF(r, E, f, P)),
    i("merge"));
  const ct = (j) => {
    for (const at of w) Zz(at.mesh, j.sceneryRank, j.shadowRank);
  };
  (ct(h), yield 0.9, a(), Yz(c, P.casters, as));
  for (const j of P.glows)
    G.push({
      type: 6,
      x: j.x,
      y: j.y,
      z: j.z,
      radius: j.r * 1.3,
      colorA: j.color,
      colorB: [0, 0, 0],
      seed: Math.abs(j.x * 7.3 + j.z * 3.1) % 1,
      w: 0.38,
    });
  const rt = yt(14677759);
  for (const j of P.ripples)
    G.push({
      type: 8,
      x: j.x,
      y: Fn + 0.02,
      z: j.z,
      radius: j.r * 1.6,
      colorA: rt,
      colorB: [0, 0, 0],
      seed: Math.abs(j.x * 0.731 + j.z * 0.377) % 1,
    });
  for (const j of o.towers) P.aoBlobs.push({ x: j.pos.x, y: 0.04, z: j.pos.y, r: 2.6, strength: 0.42 });
  for (const j of o.bases) P.aoBlobs.push({ x: j.core.x, y: 0.04, z: j.core.y, r: 4.2, strength: 0.42 });
  for (const j of P.aoBlobs)
    G.push({
      type: 7,
      x: j.x,
      y: j.y,
      z: j.z,
      radius: j.r,
      colorA: [0, 0, 0],
      colorB: [0, 0, 0],
      w: j.strength,
    });
  const mt = TF(G, o.bound);
  (d.add(mt.mesh), (e.decals = G.length), (e.aoBlobs = P.aoBlobs.length), (e.glows = P.glows.length));
  const nt = PF(r, h);
  (d.add(nt.group), i("bushes"), lU(n.lightTint, r, P));
  for (const j of P.glows)
    j.r < 1.2 ||
      L.push({
        x: j.x,
        y: j.y + 0.3,
        z: j.z,
        radius: Math.min(2.2, j.r * 0.6),
        color: j.color,
        count: j.r > 3 ? 4 : 2,
        mode: 0,
        range: 1.6,
        size: 0.75,
      });
  const H = yt(16773808);
  for (const j of o.bushes) {
    const at = xf(j);
    L.push({ x: at.x, y: 0.9, z: at.y, radius: 2.6, color: H, count: 5, mode: 0, range: 1.2, size: 0.6 });
  }
  const st = r.riverLine,
    tt = yt(12580095);
  for (let j = 0; j < st.length - 1; j++) {
    const at = st[j],
      Rt = st[j + 1],
      kt = Math.hypot(Rt.x - at.x, Rt.y - at.y);
    for (let V = 0; V < kt; V += 3.2) {
      const U = at.x + ((Rt.x - at.x) * V) / kt,
        ht = at.y + ((Rt.y - at.y) * V) / kt;
      r.boundDist(U, ht) < 1 ||
        L.push({
          x: U,
          y: Fn + 0.05,
          z: ht,
          radius: o.riverWidth * 0.42,
          color: tt,
          count: 2,
          mode: 1,
          range: 1.3,
          size: 0.6,
        });
    }
  }
  const it = jF(L, h);
  d.add(it.points);
  const D = sN(r, S, B, f, h);
  (d.add(D.mesh), (e.atmos = D.count));
  const Q = oU();
  (d.add(Q), i("misc"));
  const $ = { heightAt: (j, at) => r.heightAt(j, at), waterLevel: Fn, inWater: (j, at) => r.inWater(j, at) };
  n.terrain = $;
  const ut = new Float32Array(vf * 4),
    N = new dt(),
    J = () => it.resize(n.viewport.height * n.viewport.dpr, n.camera.fov);
  J();
  const Z = [0, 0],
    ot = o.bases.map((j) => ({
      team: j.team,
      x: j.fountain.x,
      y: j.fountain.y,
      r2: j.fountainRadius * j.fountainRadius,
    }));
  return {
    name: "terrain",
    timings: t,
    counts: e,
    update(j) {
      (ew.multiplyMatrices(n.camera.projectionMatrix, n.camera.matrixWorldInverse),
        tw.setFromProjectionMatrix(ew));
      for (const O of w) O.mesh.visible = tw.intersectsBox(O.box);
      let at = n.rig.isDebugView;
      if (!at) {
        const O = n.camera,
          Y = o.bound + pU;
        ud.setFromMatrixPosition(O.matrixWorld);
        for (let gt = 0; gt < 4 && !at; gt++)
          if (
            (hd
              .set(gt & 1 ? 1 : -1, gt & 2 ? 1 : -1, 0.5)
              .unproject(O)
              .sub(ud),
            hd.y > -1e-4)
          )
            at = !0;
          else {
            const ft = -ud.y / hd.y;
            at = Math.max(Math.abs(ud.x + hd.x * ft), Math.abs(ud.z + hd.z * ft)) > Y;
          }
      }
      Q.visible = at;
      const Rt = j.state;
      let kt = 0,
        V = !1,
        U = 0,
        ht = 0;
      for (const O of Rt.units)
        if (!(!O.alive || !(O.team === j.playerTeam || O.visible[j.playerTeam]))) {
          if (O.kind === "hero")
            for (const gt of ot) {
              if (O.team === gt.team) continue;
              const ft = O.pos.x - gt.x,
                _t = O.pos.y - gt.y;
              ft * ft + _t * _t < gt.r2 && (gt.team === 0 ? (U = 1) : (ht = 1));
            }
          O.bushId < 0 ||
            (n.unitQuery.getPosition(O.id, N) &&
              (O.id === Rt.playerId && (nt.setReveal(N.x, N.z, 3.4, 1), (V = !0)),
              kt < vf &&
                ((ut[kt * 4] = N.x),
                (ut[kt * 4 + 1] = N.z),
                (ut[kt * 4 + 2] = O.radius + 0.95),
                (ut[kt * 4 + 3] = 1),
                kt++)));
        }
      (nt.setPushers(ut, kt), V || nt.setReveal(0, 0, 1, 0));
      const lt = Math.min(1, j.dt * 4);
      ((Z[0] += (U - Z[0]) * lt),
        (Z[1] += (ht - Z[1]) * lt),
        mt.setFountainAlert(0, Z[0]),
        mt.setFountainAlert(1, Z[1]));
    },
    setQuality(j) {
      (x.setQuality(j), p.setQuality(j));
      const at = j.groundDetail > 0;
      (y.setMapTopDetail(at),
        (y.uniforms.uMapTop.value.y = at ? J_ : Q_),
        nt.setQuality(j),
        it.setQuality(j),
        D.setQuality(j),
        ct(j));
    },
    resize: J,
    dispose() {
      (jM(d), d.clear(), c.a.dispose(), c.b.dispose(), f.dispose(), n.lightTint.clear());
    },
  };
}

const mU = Object.assign(
    (n) => {
      const t = nw(n);
      for (;;) {
        const e = t.next();
        if (e.done) return e.value;
      }
    },
    { staged: nw },
  ),
  ch = Math.PI / 180;

class Wa {
  names = [];
  parent = [];
  bind = [];
  local = [];
  chains = [];
  get count() {
    return this.names.length;
  }
  add(t, e, s, i, a) {
    const o = this.names.length;
    return (
      this.names.push(t),
      this.parent.push(e),
      this.bind.push(s, i, a),
      e >= 0
        ? this.local.push(s - this.bind[e * 3], i - this.bind[e * 3 + 1], a - this.bind[e * 3 + 2])
        : this.local.push(s, i, a),
      o
    );
  }
  addChain(t, e, s) {
    const i = [];
    let a = e;
    return (
      s.forEach((o, r) => {
        ((a = this.add(`${t}${r}`, a, o[0], o[1], o[2])), i.push(a));
      }),
      i
    );
  }
  chain(t) {
    this.chains.push(t);
  }
  id(t) {
    const e = this.names.indexOf(t);
    if (e < 0) throw new Error(`rig: 没有关节 ${t}`);
    return e;
  }
  bx(t) {
    return this.bind[t * 3];
  }
  by(t) {
    return this.bind[t * 3 + 1];
  }
  bz(t) {
    return this.bind[t * 3 + 2];
  }
}

const fp = [0, 0, 0, 1];

function y1(n, t, e, s, i) {
  const a = n * ch * 0.5,
    o = t * ch * 0.5,
    r = e * ch * 0.5,
    l = Math.cos(a),
    c = Math.cos(o),
    f = Math.cos(r),
    d = Math.sin(a),
    h = Math.sin(o),
    u = Math.sin(r);
  ((s[i] = d * c * f + l * h * u),
    (s[i + 1] = l * h * f - d * c * u),
    (s[i + 2] = l * c * u - d * h * f),
    (s[i + 3] = l * c * f + d * h * u));
}

function Ua(n, t, e, s, i, a) {
  const o = n[t],
    r = n[t + 1],
    l = n[t + 2],
    c = n[t + 3],
    f = e[s],
    d = e[s + 1],
    h = e[s + 2],
    u = e[s + 3];
  ((i[a] = o * u + c * f + r * h - l * d),
    (i[a + 1] = r * u + c * d + l * f - o * h),
    (i[a + 2] = l * u + c * h + o * d - r * f),
    (i[a + 3] = c * u - o * f - r * d - l * h));
}

function Da(n, t, e, s, i, a, o, r = 1) {
  const l = n[t] * r,
    c = n[t + 1] * r,
    f = n[t + 2] * r,
    d = n[t + 3],
    h = 2 * (c * i - f * s),
    u = 2 * (f * e - l * i),
    m = 2 * (l * s - c * e);
  ((a[o] = e + d * h + (c * m - f * u)),
    (a[o + 1] = s + d * u + (f * h - l * m)),
    (a[o + 2] = i + d * m + (l * u - c * h)));
}

function gU(n, t, e, s, i, a, o, r, l, c, f) {
  const d = n + i + l;
  if (d > 0) {
    const h = 0.5 / Math.sqrt(d + 1);
    ((c[f + 3] = 0.25 / h), (c[f] = (a - r) * h), (c[f + 1] = (o - e) * h), (c[f + 2] = (t - s) * h));
  } else if (n > i && n > l) {
    const h = 2 * Math.sqrt(1 + n - i - l);
    ((c[f + 3] = (a - r) / h), (c[f] = 0.25 * h), (c[f + 1] = (s + t) / h), (c[f + 2] = (o + e) / h));
  } else if (i > l) {
    const h = 2 * Math.sqrt(1 + i - n - l);
    ((c[f + 3] = (o - e) / h), (c[f] = (s + t) / h), (c[f + 1] = 0.25 * h), (c[f + 2] = (r + a) / h));
  } else {
    const h = 2 * Math.sqrt(1 + l - n - i);
    ((c[f + 3] = (t - s) / h), (c[f] = (o + e) / h), (c[f + 1] = (r + a) / h), (c[f + 2] = 0.25 * h));
  }
}

function xU(n, t, e, s, i, a, o, r) {
  const l = n * s + t * i + e * a;
  if (l < -0.9999) {
    let m = -e,
      x = 0,
      p = n;
    Math.abs(n) < 0.1 && Math.abs(e) < 0.1 && ((m = 0), (x = e), (p = -t));
    const g = Math.hypot(m, x, p) || 1;
    ((o[r] = m / g), (o[r + 1] = x / g), (o[r + 2] = p / g), (o[r + 3] = 0));
    return;
  }
  const c = t * a - e * i,
    f = e * s - n * a,
    d = n * i - t * s,
    h = 1 + l,
    u = Math.hypot(c, f, d, h) || 1;
  ((o[r] = c / u), (o[r + 1] = f / u), (o[r + 2] = d / u), (o[r + 3] = h / u));
}

class sw {
  constructor(t) {
    ((this.n = t),
      (this.q = new Float32Array(t * 4)),
      (this.t = new Float32Array(t * 3)),
      (this.s = new Float32Array(t)),
      this.reset());
  }
  n;
  q;
  t;
  s;
  reset() {
    (this.q.fill(0), this.t.fill(0), this.s.fill(1));
    for (let t = 0; t < this.n; t++) this.q[t * 4 + 3] = 1;
    return this;
  }
  rot(t, e, s = 0, i = 0) {
    return (y1(e, s, i, this.q, t * 4), this);
  }
  add(t, e, s = 0, i = 0) {
    return (y1(e, s, i, fp, 0), Ua(this.q, t * 4, fp, 0, this.q, t * 4), this);
  }
  pre(t, e, s = 0, i = 0) {
    return (y1(e, s, i, fp, 0), Ua(fp, 0, this.q, t * 4, this.q, t * 4), this);
  }
  pos(t, e, s, i) {
    return ((this.t[t * 3] = e), (this.t[t * 3 + 1] = s), (this.t[t * 3 + 2] = i), this);
  }
  move(t, e, s, i) {
    return ((this.t[t * 3] += e), (this.t[t * 3 + 1] += s), (this.t[t * 3 + 2] += i), this);
  }
  scale(t, e) {
    return ((this.s[t] = e), this);
  }
  copy(t) {
    return (this.q.set(t.q), this.t.set(t.t), this.s.set(t.s), this);
  }
  blendFrom(t, e) {
    const s = t.q,
      i = this.q,
      a = 1 - e;
    for (let o = 0; o < this.n * 4; o += 4) {
      const l = s[o] * i[o] + s[o + 1] * i[o + 1] + s[o + 2] * i[o + 2] + s[o + 3] * i[o + 3] < 0 ? -a : a,
        c = s[o] * l + i[o] * e,
        f = s[o + 1] * l + i[o + 1] * e,
        d = s[o + 2] * l + i[o + 2] * e,
        h = s[o + 3] * l + i[o + 3] * e,
        u = Math.hypot(c, f, d, h) || 1;
      ((i[o] = c / u), (i[o + 1] = f / u), (i[o + 2] = d / u), (i[o + 3] = h / u));
    }
    for (let o = 0; o < this.n * 3; o++) this.t[o] = t.t[o] * a + this.t[o] * e;
    for (let o = 0; o < this.n; o++) this.s[o] = t.s[o] * a + this.s[o] * e;
    return this;
  }
}

const Aa = [0, 0, 0],
  pb = [0, 0, 0, 0],
  qb = [0, 0, 0, 0],
  dp = [0, 0, 0],
  no = [0, 0, 0, 1],
  _l = [0, 0, 0, 1],
  iw = [0, 0, 0, 1],
  yU = 0.82,
  vU = -0.57;

class bU {
  constructor(t, e = 0) {
    this.rig = t;
    const s = t.count;
    ((this.wp = new Float32Array(s * 3)),
      (this.wq = new Float32Array(s * 4)),
      (this.ws = new Float32Array(s)),
      (this.chains = t.chains.map((i) => ({
        p: new Float32Array(i.joints.length * 3),
        prev: new Float32Array(i.joints.length * 3),
        ready: !1,
      }))),
      (this.phase = e * 6.283));
  }
  rig;
  wp;
  wq;
  ws;
  chains;
  lastX = 0;
  lastY = 0;
  lastZ = 0;
  phase;
  solve(t, e, s, i, a, o) {
    const r = this.rig,
      l = r.count,
      c = this.wp,
      f = this.wq,
      d = this.ws,
      h = r.local,
      u = r.parent,
      m = Math.sin(a * 0.5),
      x = Math.cos(a * 0.5);
    for (let p = 0; p < l; p++) {
      const g = u[p],
        y = h[p * 3] + t.t[p * 3],
        v = h[p * 3 + 1] + t.t[p * 3 + 1],
        _ = h[p * 3 + 2] + t.t[p * 3 + 2];
      if (g < 0)
        ((no[0] = 0),
          (no[1] = m),
          (no[2] = 0),
          (no[3] = x),
          Da(no, 0, y * o, v * o, _ * o, c, p * 3),
          (c[p * 3] += e),
          (c[p * 3 + 1] += s),
          (c[p * 3 + 2] += i),
          Ua(no, 0, t.q, p * 4, f, p * 4),
          (d[p] = o * t.s[p]));
      else {
        const k = d[g];
        (Da(f, g * 4, y * k, v * k, _ * k, c, p * 3),
          (c[p * 3] += c[g * 3]),
          (c[p * 3 + 1] += c[g * 3 + 1]),
          (c[p * 3 + 2] += c[g * 3 + 2]),
          Ua(f, g * 4, t.q, p * 4, f, p * 4),
          (d[p] = k * t.s[p]));
      }
    }
  }
  resetChains() {
    for (const t of this.chains) t.ready = !1;
  }
  simulate(t, e, s) {
    const i = this.rig;
    if (i.chains.length === 0) return;
    const a = this.wp,
      o = this.wq,
      r = this.ws,
      l = a[0] - this.lastX,
      c = a[1] - this.lastY,
      f = a[2] - this.lastZ,
      d = l * l + c * c + f * f > 4;
    ((this.lastX = a[0]), (this.lastY = a[1]), (this.lastZ = a[2]));
    const h = Math.min(e, 1 / 24);
    for (let u = 0; u < i.chains.length; u++) {
      const m = i.chains[u],
        x = this.chains[u],
        p = m.joints.length;
      if (d && x.ready)
        for (let M = 0; M < p; M++)
          ((x.p[M * 3] += l),
            (x.p[M * 3 + 1] += c),
            (x.p[M * 3 + 2] += f),
            (x.prev[M * 3] += l),
            (x.prev[M * 3 + 1] += c),
            (x.prev[M * 3 + 2] += f));
      const g = Math.pow(m.drag, h * 60),
        y = 1 - Math.exp(-m.stiffness * h),
        v = Math.cos(m.maxAngle * ch),
        _ = Math.sin(m.maxAngle * ch),
        k =
          (m.wind ?? 0) * (0.55 + 0.45 * Math.sin(s * 2.3 + this.phase + u * 1.7)) +
          (m.wind ?? 0) * 0.25 * Math.sin(s * 7.1 + this.phase * 2 + u);
      for (let M = 0; M < p; M++) {
        const S = m.joints[M],
          b = i.parent[S],
          w = r[S];
        (M > 0 &&
          ((a[S * 3] = x.p[(M - 1) * 3]),
          (a[S * 3 + 1] = x.p[(M - 1) * 3 + 1]),
          (a[S * 3 + 2] = x.p[(M - 1) * 3 + 2])),
          Ua(o, b * 4, t.q, S * 4, no, 0));
        let T, E, A;
        if (M < p - 1) {
          const $ = m.joints[M + 1];
          ((T = i.local[$ * 3] + t.t[$ * 3]),
            (E = i.local[$ * 3 + 1] + t.t[$ * 3 + 1]),
            (A = i.local[$ * 3 + 2] + t.t[$ * 3 + 2]));
        } else ((T = m.tip[0]), (E = m.tip[1]), (A = m.tip[2]));
        const C = Math.hypot(T, E, A) || 1e-4;
        Da(no, 0, T / C, E / C, A / C, Aa, 0);
        const R = Aa[0],
          I = Aa[1],
          P = Aa[2],
          F = C * w,
          L = a[S * 3],
          B = a[S * 3 + 1],
          G = a[S * 3 + 2],
          q = L + R * F,
          et = B + I * F,
          ct = G + P * F,
          rt = M * 3;
        let mt, nt, H;
        if (!x.ready)
          ((mt = q), (nt = et), (H = ct), (x.prev[rt] = mt), (x.prev[rt + 1] = nt), (x.prev[rt + 2] = H));
        else if (((mt = x.p[rt]), (nt = x.p[rt + 1]), (H = x.p[rt + 2]), h > 0)) {
          const $ = (mt - x.prev[rt]) * g,
            ut = (nt - x.prev[rt + 1]) * g,
            N = (H - x.prev[rt + 2]) * g;
          ((x.prev[rt] = mt), (x.prev[rt + 1] = nt), (x.prev[rt + 2] = H));
          const J = h * h;
          ((mt += $ + yU * k * J),
            (nt += ut - m.gravity * J),
            (H += N + vU * k * J),
            (mt += (q - mt) * y),
            (nt += (et - nt) * y),
            (H += (ct - H) * y));
        }
        let st = mt - L,
          tt = nt - B,
          it = H - G,
          D = Math.hypot(st, tt, it);
        (D < 1e-5 && ((st = R), (tt = I), (it = P), (D = 1)), (st /= D), (tt /= D), (it /= D));
        const Q = st * R + tt * I + it * P;
        if (Q < v) {
          let $ = st - R * Q,
            ut = tt - I * Q,
            N = it - P * Q;
          const J = Math.hypot($, ut, N) || 1;
          (($ /= J), (ut /= J), (N /= J), (st = R * v + $ * _), (tt = I * v + ut * _), (it = P * v + N * _));
        }
        if (((mt = L + st * F), (nt = B + tt * F), (H = G + it * F), m.colliders)) {
          let $ = !1;
          for (const ut of m.colliders) {
            const N = r[ut.joint];
            Da(o, ut.joint * 4, ut.x * N, ut.y * N, ut.z * N, dp, 0);
            const J = a[ut.joint * 3] + dp[0],
              Z = a[ut.joint * 3 + 1] + dp[1],
              ot = a[ut.joint * 3 + 2] + dp[2],
              j = ut.r * N,
              at = mt - J,
              Rt = nt - Z,
              kt = H - ot,
              V = Math.hypot(at, Rt, kt);
            V < j &&
              V > 1e-5 &&
              ((mt = J + (at / V) * j), (nt = Z + (Rt / V) * j), (H = ot + (kt / V) * j), ($ = !0));
          }
          $ &&
            ((st = mt - L),
            (tt = nt - B),
            (it = H - G),
            (D = Math.hypot(st, tt, it) || 1),
            (st /= D),
            (tt /= D),
            (it /= D),
            (mt = L + st * F),
            (nt = B + tt * F),
            (H = G + it * F));
        }
        ((x.p[rt] = mt),
          (x.p[rt + 1] = nt),
          (x.p[rt + 2] = H),
          xU(R, I, P, st, tt, it, _l, 0),
          Ua(_l, 0, no, 0, o, S * 4));
      }
      x.ready = !0;
    }
  }
  settle(t, e, s = 40) {
    for (let i = 0; i < s; i++) this.simulate(t, 1 / 30, e);
  }
  pack(t, e) {
    const s = this.rig,
      i = s.count,
      a = this.wp,
      o = this.wq,
      r = this.ws,
      l = s.bind,
      // 外部导入的骨架：顶点留在绑定世界空间，这里现算
      // M = T(worldPos)·R(worldQ·bindQW⁻¹)·T(-bindWorld)，等价于标准 LBS，双骨骼天然可用
      BW = s.bindWorld,
      BQ = s.bindQW;
    for (let c = 0; c < i; c++) {
      const f = r[c],
        d = e + c * 8;
      if (BW) {
        ((pb[0] = -BQ[c * 4]), (pb[1] = -BQ[c * 4 + 1]), (pb[2] = -BQ[c * 4 + 2]), (pb[3] = BQ[c * 4 + 3]));
        Ua(o, c * 4, pb, 0, qb, 0);
        Da(qb, 0, BW[c * 3] * f, BW[c * 3 + 1] * f, BW[c * 3 + 2] * f, Aa, 0);
        ((t[d] = a[c * 3] - Aa[0]),
          (t[d + 1] = a[c * 3 + 1] - Aa[1]),
          (t[d + 2] = a[c * 3 + 2] - Aa[2]),
          (t[d + 3] = f),
          (t[d + 4] = qb[0]),
          (t[d + 5] = qb[1]),
          (t[d + 6] = qb[2]),
          (t[d + 7] = qb[3]));
        continue;
      }
      Da(o, c * 4, l[c * 3] * f, l[c * 3 + 1] * f, l[c * 3 + 2] * f, Aa, 0);
      ((t[d] = a[c * 3] - Aa[0]),
        (t[d + 1] = a[c * 3 + 1] - Aa[1]),
        (t[d + 2] = a[c * 3 + 2] - Aa[2]),
        (t[d + 3] = f),
        (t[d + 4] = o[c * 4]),
        (t[d + 5] = o[c * 4 + 1]),
        (t[d + 6] = o[c * 4 + 2]),
        (t[d + 7] = o[c * 4 + 3]));
    }
  }
  point(t, e, s, i, a) {
    const o = this.ws[t];
    (Da(this.wq, t * 4, e * o, s * o, i * o, Aa, 0),
      (a.x = this.wp[t * 3] + Aa[0]),
      (a.y = this.wp[t * 3 + 1] + Aa[1]),
      (a.z = this.wp[t * 3 + 2] + Aa[2]));
  }
}

const hp = [0, 0, 0],
  Za = [0, 0, 0, 1],
  up = [];

function Tm(n, t, e, s, i) {
  up.length = 0;
  for (let l = e; l > 0; l = n.parent[l]) up.push(l);
  let a = 0,
    o = 0,
    r = 0;
  ((Za[0] = 0), (Za[1] = 0), (Za[2] = 0), (Za[3] = 1));
  for (let l = up.length - 1; l >= 0; l--) {
    const c = up[l];
    (Da(
      Za,
      0,
      n.local[c * 3] + t.t[c * 3],
      n.local[c * 3 + 1] + t.t[c * 3 + 1],
      n.local[c * 3 + 2] + t.t[c * 3 + 2],
      hp,
      0,
    ),
      (a += hp[0]),
      (o += hp[1]),
      (r += hp[2]),
      Ua(Za, 0, t.q, c * 4, Za, 0));
  }
  ((s[0] = a), (s[1] = o), (s[2] = r), (i[0] = Za[0]), (i[1] = Za[1]), (i[2] = Za[2]), (i[3] = Za[3]));
}

const pp = [0, 0, 0],
  pd = [0, 0, 0, 1],
  si = [0, 0, 0],
  Qa = [0, 0, 0],
  ii = [0, 0, 0, 1],
  mp = [0, 0, 0, 1],
  s0 = [0, 0, 0, 1],
  vc = [0, 0, 0],
  fr = [0, 0, 0];

function u2(n, t, e, s, i, a, o) {
  const r = i * e - a * t,
    l = a * n - s * e,
    c = s * t - i * n;
  gU(n, t, e, r, l, c, s, i, a, o, 0);
}

function Fx(n, t, e, s, i, a, o, r, l, c, f, d = 1, h) {
  const u = n.parent[e];
  (Tm(n, t, u, pp, pd),
    Da(
      pd,
      0,
      n.local[e * 3] + t.t[e * 3],
      n.local[e * 3 + 1] + t.t[e * 3 + 1],
      n.local[e * 3 + 2] + t.t[e * 3 + 2],
      si,
      0,
    ));
  const m = pp[0] + si[0],
    x = pp[1] + si[1],
    p = pp[2] + si[2];
  (Da(pd, 0, a - m, o - x, r - p, si, 0, -1), Da(pd, 0, l, c, f, Qa, 0, -1));
  const g = n.local[s * 3],
    y = n.local[s * 3 + 1],
    v = n.local[s * 3 + 2],
    _ = n.local[i * 3],
    k = n.local[i * 3 + 1],
    M = n.local[i * 3 + 2],
    S = Math.hypot(g, y, v),
    b = Math.hypot(_, k, M);
  let w = Math.hypot(si[0], si[1], si[2]);
  w < 1e-5 && ((si[1] = -1), (w = 1e-5));
  const T = si[0] / w,
    E = si[1] / w,
    A = si[2] / w;
  w = Math.min(Math.max(w, Math.abs(S - b) + 0.001), S + b - 0.001);
  const C = Math.min(1, Math.max(-1, (S * S + w * w - b * b) / (2 * S * w))),
    R = Math.sqrt(1 - C * C);
  let I = Qa[0] * T + Qa[1] * E + Qa[2] * A,
    P = Qa[0] - T * I,
    F = Qa[1] - E * I,
    L = Qa[2] - A * I,
    B = Math.hypot(P, F, L);
  (B < 1e-4 && ((I = A), (P = -T * I), (F = -E * I), (L = 1 - A * I), (B = Math.hypot(P, F, L) || 1)),
    (P /= B),
    (F /= B),
    (L /= B),
    (fr[0] = E * L - A * F),
    (fr[1] = A * P - T * L),
    (fr[2] = T * F - E * P));
  const G = T * C + P * R,
    q = E * C + F * R,
    et = A * C + L * R;
  ((vc[0] = (T * w - G * S) / b), (vc[1] = (E * w - q * S) / b), (vc[2] = (A * w - et * S) / b));
  const ct = (rt, mt, nt, H) => {
    const st = Math.hypot(rt, mt, nt) || 1,
      tt = rt / st,
      it = mt / st,
      D = nt / st;
    let Q = it * d,
      $ = -tt * d,
      ut = 0;
    const N = Math.hypot(Q, $, ut);
    (N < 1e-4 ? ((Q = 1), ($ = 0), (ut = 0)) : ((Q /= N), ($ /= N), (ut /= N)), u2(tt, it, D, Q, $, ut, H));
  };
  (ct(g, y, v, ii),
    u2(G, q, et, fr[0], fr[1], fr[2], mp),
    (ii[0] = -ii[0]),
    (ii[1] = -ii[1]),
    (ii[2] = -ii[2]),
    Ua(mp, 0, ii, 0, s0, 0),
    (t.q[e * 4] = s0[0]),
    (t.q[e * 4 + 1] = s0[1]),
    (t.q[e * 4 + 2] = s0[2]),
    (t.q[e * 4 + 3] = s0[3]),
    Da(s0, 0, vc[0], vc[1], vc[2], si, 0, -1),
    Da(s0, 0, fr[0], fr[1], fr[2], Qa, 0, -1),
    ct(_, k, M, ii),
    u2(si[0], si[1], si[2], Qa[0], Qa[1], Qa[2], mp),
    (ii[0] = -ii[0]),
    (ii[1] = -ii[1]),
    (ii[2] = -ii[2]),
    Ua(mp, 0, ii, 0, t.q, s * 4),
    h && (Ua(pd, 0, s0, 0, iw, 0), Ua(iw, 0, t.q, s * 4, h, 0)));
}

function Em(n, t, e, s, i, a) {
  (y1(s, i, a, no, 0),
    (_l[0] = -e[0]),
    (_l[1] = -e[1]),
    (_l[2] = -e[2]),
    (_l[3] = e[3]),
    Ua(_l, 0, no, 0, n.q, t * 4));
}

const _U = (n) => (n < 0 ? 0 : n > 1 ? 1 : n),
  Ct = (n, t, e) => _U((n - t) / (e - t)),
  Xe = (n, t, e) => {
    const s = Math.abs(n - t) / e;
    return s >= 1 ? 0 : 1 - s * s * (3 - 2 * s);
  },
  Gn = (n) => n * n * (3 - 2 * n),
  Kn = (n) => 1 - (1 - n) * (1 - n),
  wf = (n) => n * n;

function Qo(n, t) {
  const e = Math.min(0.6, Math.max(0.15, t));
  return n < e ? (n / e) * 0.35 : 0.35 + ((n - e) / (1 - e)) * 0.65;
}

function Di(n, t, e = 0.6, s) {
  const i = t.length,
    a = t.map((l) => [n.bx(l), n.by(l), n.bz(l)]);
  s && a.push(s);
  const o = a.length - 2,
    r = Math.max(0.001, e * 0.5);
  return (l, c, f) => {
    if (o < 0) return [t[0], t[0], 1];
    let d = 0,
      h = 0,
      u = 1 / 0;
    for (let p = 0; p <= o; p++) {
      const g = a[p],
        y = a[p + 1],
        v = y[0] - g[0],
        _ = y[1] - g[1],
        k = y[2] - g[2],
        M = v * v + _ * _ + k * k || 1e-9,
        S = ((l - g[0]) * v + (c - g[1]) * _ + (f - g[2]) * k) / M,
        b = S < 0 ? 0 : S > 1 ? 1 : S,
        w = g[0] + v * b - l,
        T = g[1] + _ * b - c,
        E = g[2] + k * b - f,
        A = w * w + T * T + E * E;
      A < u && ((u = A), (d = p), (h = p === o ? Math.max(0, S) : b));
    }
    const m = d,
      x = h;
    if (x > 1 - r && m + 1 < i) {
      const p = (x - 1) / r;
      return p >= 0 ? [t[m + 1], t[m], Math.min(1, 0.5 + 0.5 * p)] : [t[m], t[m + 1], 0.5 - 0.5 * p];
    }
    return x < r && m > 0 ? [t[m], t[m - 1], 0.5 + (0.5 * x) / r] : [t[m], t[m], 1];
  };
}

const Am = {
  ankleY: 0.09,
  kneeY: 0.45,
  hipY: 0.82,
  hipX: 0.125,
  pelvisY: 0.86,
  spineY: 1,
  chestY: 1.17,
  neckY: 1.42,
  headY: 1.47,
  clavX: 0.09,
  shoulderX: 0.3,
  shoulderY: 1.37,
  elbowY: 1.09,
  wristY: 0.83,
  handY: 0.75,
};

function Gh(n) {
  const t = new Wa(),
    e = t.add("root", -1, 0, 0, 0),
    s = t.add("hips", e, 0, n.pelvisY, 0),
    i = t.add("spine", s, 0, n.spineY, 0),
    a = t.add("chest", i, 0, n.chestY, 0),
    o = t.add("neck", a, 0, n.neckY, 0),
    r = t.add("head", o, 0, n.headY, 0),
    l = (T, E) => {
      const A = t.add(`clav${E}`, a, T * n.clavX, n.shoulderY - 0.02, 0),
        C = t.add(`arm${E}`, A, T * n.shoulderX, n.shoulderY, 0),
        R = t.add(`fore${E}`, C, T * n.shoulderX, n.elbowY, 0),
        I = t.add(`hand${E}`, R, T * n.shoulderX, n.wristY, 0),
        P = t.add(`prop${E}`, I, T * n.shoulderX, n.handY, 0);
      return [A, C, R, I, P];
    },
    [c, f, d, h, u] = l(1, "L"),
    [m, x, p, g, y] = l(-1, "R"),
    v = (T, E) => {
      const A = t.add(`thigh${E}`, s, T * n.hipX, n.hipY, 0),
        C = t.add(`shin${E}`, A, T * n.hipX, n.kneeY, 0),
        R = t.add(`foot${E}`, C, T * n.hipX, n.ankleY, 0);
      return [A, C, R];
    },
    [_, k, M] = v(1, "L"),
    [S, b, w] = v(-1, "R");
  return {
    rig: t,
    d: n,
    J: {
      root: e,
      hips: s,
      spine: i,
      chest: a,
      neck: o,
      head: r,
      clavL: c,
      armL: f,
      foreL: d,
      handL: h,
      propL: u,
      clavR: m,
      armR: x,
      foreR: p,
      handR: g,
      propR: y,
      thighL: _,
      shinL: k,
      footL: M,
      thighR: S,
      shinR: b,
      footR: w,
    },
  };
}

const he = {
    lin: (n) => n,
    in: (n) => n * n,
    out: (n) => 1 - (1 - n) * (1 - n),
    io: (n) => n * n * (3 - 2 * n),
    in3: (n) => n * n * n,
  },
  hi = (n) => (n < 0 ? 0 : n > 1 ? 1 : n),
  ma = (n, t, e) => hi((n - t) / (e - t)),
  Fi = (n, t, e) => n + (t - n) * e,
  ho = (n, t, e) => {
    const s = hi(1 - Math.abs(n - t) / e);
    return s * s * (3 - 2 * s);
  };

function Vh(n, t) {
  const e = Math.min(0.6, Math.max(0.15, t));
  return n < e ? (n / e) * 0.35 : 0.35 + ((n - e) / (1 - e)) * 0.65;
}

function jl(n) {
  const t = n.d;
  return {
    e: new Float32Array(n.rig.count * 3),
    hips: new Float32Array(3),
    footL: new Float32Array([t.hipX + 0.04, t.ankleY, 0, 0, 0]),
    footR: new Float32Array([-t.hipX - 0.04, t.ankleY, 0, 0, 0]),
    root: new Float32Array(3),
  };
}

function nf(n, t) {
  return (
    n.e.set(t.e),
    n.hips.set(t.hips),
    n.footL.set(t.footL),
    n.footR.set(t.footR),
    n.root.set(t.root),
    n
  );
}

function ge(n, t, e) {
  const s = jl(n);
  t && nf(s, t);
  for (const i in e) {
    const a = e[i];
    if (i === "hipsPos") s.hips.set(a);
    else if (i === "rootPos") s.root.set(a);
    else if (i === "footL" || i === "footR") {
      const o = i === "footL" ? s.footL : s.footR;
      for (let r = 0; r < a.length; r++) o[r] = a[r];
    } else {
      const o = n.rig.id(i);
      ((s.e[o * 3] = a[0] ?? 0), (s.e[o * 3 + 1] = a[1] ?? 0), (s.e[o * 3 + 2] = a[2] ?? 0));
    }
  }
  return s;
}

function md(n, t, e, s) {
  for (let i = 0; i < n.length; i++) n[i] = t[i] + (e[i] - t[i]) * s;
}

function A8(n, t, e, s) {
  return (
    md(n.e, t.e, e.e, s),
    md(n.hips, t.hips, e.hips, s),
    md(n.footL, t.footL, e.footL, s),
    md(n.footR, t.footR, e.footR, s),
    md(n.root, t.root, e.root, s),
    n
  );
}

function zs(n) {
  return n.map(([t, e, s]) => ({ t, k: e, ease: s ?? he.io }));
}

function ta(n, t, e) {
  if (t <= n[0].t) return nf(e, n[0].k);
  for (let s = 1; s < n.length; s++) {
    const i = n[s];
    if (t <= i.t) {
      const a = n[s - 1];
      return A8(e, a.k, i.k, i.ease((t - a.t) / (i.t - a.t)));
    }
  }
  return nf(e, n[n.length - 1].k);
}

const aw = [0, 0, 0, 1],
  gp = [0, 0, 0],
  gd = [0, 0, 0, 1];

function G1(n, t, e, s, i, a, o = 0, r = 0) {
  const l = n.J,
    c = e > 0 ? l.thighL : l.thighR,
    f = e > 0 ? l.shinL : l.shinR,
    d = e > 0 ? l.footL : l.footR,
    h = (r * Math.PI) / 180;
  (Fx(n.rig, t, c, f, d, s, i, a, Math.sin(h) + e * 0.12, 0.1, Math.cos(h), 1, aw), Em(t, d, aw, o, r, 0));
}

function P0(n, t, e, s, i, a, o, r = e * 0.6, l = -0.6, c = -0.5) {
  const f = n.J;
  Tm(n.rig, t, s, gp, gd);
  const d = gd[0],
    h = gd[1],
    u = gd[2],
    m = gd[3],
    x = 2 * (h * o - u * a),
    p = 2 * (u * i - d * o),
    g = 2 * (d * a - h * i),
    y = gp[0] + i + m * x + (h * g - u * p),
    v = gp[1] + a + m * p + (u * x - d * g),
    _ = gp[2] + o + m * g + (d * p - h * x);
  Fx(
    n.rig,
    t,
    e > 0 ? f.armL : f.armR,
    e > 0 ? f.foreL : f.foreR,
    e > 0 ? f.handL : f.handR,
    y,
    v,
    _,
    r,
    l,
    c,
    -1,
  );
}

function S0(n, t, e, s, i) {
  const a = n[t] * e[s] + n[t + 1] * e[s + 1] + n[t + 2] * e[s + 2] + n[t + 3] * e[s + 3],
    o = (1 - i) * (a < 0 ? -1 : 1),
    r = e[s] * o + n[t] * i,
    l = e[s + 1] * o + n[t + 1] * i,
    c = e[s + 2] * o + n[t + 2] * i,
    f = e[s + 3] * o + n[t + 3] * i,
    d = Math.hypot(r, l, c, f) || 1;
  ((n[t] = r / d), (n[t + 1] = l / d), (n[t + 2] = c / d), (n[t + 3] = f / d));
}

function Un(n, t, e, s) {
  const a = n.rig.count,
    o = e.e;
  for (let r = 0; r < a; r++) {
    const l = o[r * 3],
      c = o[r * 3 + 1],
      f = o[r * 3 + 2];
    (l !== 0 || c !== 0 || f !== 0) && t.rot(r, l, c, f);
  }
  (t.pos(n.J.hips, e.hips[0], e.hips[1], e.hips[2]),
    t.pos(n.J.root, e.root[0], e.root[1], e.root[2]),
    s && s(),
    G1(n, t, 1, e.footL[0], e.footL[1], e.footL[2], e.footL[3], e.footL[4]),
    G1(n, t, -1, e.footR[0], e.footR[1], e.footR[2], e.footR[3], e.footR[4]));
}

const Rm = {
    stride: 2.6,
    stance: 0.36,
    lift: 0.26,
    bob: 0.045,
    drop: 0.07,
    lean: 12,
    sway: 0.03,
    twist: 9,
    width: 0.13,
    arm: 38,
    elbow: 70,
  },
  xp = Math.PI * 2;

function ow(n, t, e, s) {
  const i = t.stance,
    a = t.stride * i,
    o = a * 0.42,
    r = -a * 0.58;
  if (n < i) {
    const l = n / i;
    ((s[0] = Fi(o, r, l)), (s[1] = e + 0.03 * l * l), (s[2] = Fi(-14, 26, l * l)));
  } else {
    const l = (n - i) / (1 - i),
      c = l * l * (3 - 2 * l);
    ((s[0] = Fi(r, o, c)),
      (s[1] =
        e + t.lift * Math.sin(Math.PI * Math.pow(l, 0.8)) + t.lift * 0.55 * Math.sin(Math.PI * l) * (1 - l)),
      (s[2] = Fi(26, -14, c) + 34 * Math.sin(Math.PI * l) * (1 - l)));
  }
}

const i0 = [0, 0, 0];

function Mf(n, t, e, s, i) {
  const a = n.J,
    o = n.d,
    r = s.stance,
    l = Math.cos(xp * e),
    c = e - r * 0.5,
    f = -s.bob * Math.cos(2 * xp * c);
  (t.pos(a.hips, s.sway * Math.cos(xp * c), -s.drop + f, 0),
    t.rot(a.hips, s.lean * 0.45, -s.twist * l, -2.5 * Math.cos(xp * c)),
    t.rot(a.spine, s.lean * 0.35, s.twist * 0.9 * l, 0),
    t.rot(a.chest, s.lean * 0.2, s.twist * 0.9 * l, 0),
    t.rot(a.neck, -s.lean * 0.3, -s.twist * 0.4 * l, 0),
    t.rot(a.head, -s.lean * 0.3, -s.twist * 0.3 * l, 0),
    s.arm > 0 &&
      (t.rot(a.armL, s.arm * l + 8, 0, 8),
      t.rot(a.foreL, -s.elbow + 18 * l, 0, 0),
      t.rot(a.armR, -s.arm * l + 8, 0, -8),
      t.rot(a.foreR, -s.elbow - 18 * l, 0, 0)),
    i && i(),
    ow(e % 1, s, o.ankleY, i0),
    G1(n, t, 1, s.width, i0[1], i0[0], i0[2], 0),
    ow((e + 0.5) % 1, s, o.ankleY, i0),
    G1(n, t, -1, -s.width, i0[1], i0[0], i0[2], 0));
}

function Wh(n, t, e = {}) {
  const s = n.d,
    i = s.hipY - s.ankleY,
    a = e.limp ?? {},
    o = ge(n, t, {
      hipsPos: [0, -0.12 * i, 0],
      hips: [6, 0, 0],
      spine: [10, 0, 0],
      chest: [8, 0, 0],
      neck: [14, 0, 0],
      head: [18, 0, 0],
      armL: [6, 0, 14],
      foreL: [-14, 0, 0],
      armR: [6, 0, -14],
      foreR: [-14, 0, 0],
      ...a,
    }),
    r = ge(n, null, {
      hips: [-24, 0, 0],
      spine: [-10, 0, 0],
      chest: [-12, 0, 0],
      head: [-16, 0, 0],
      footL: [s.hipX + 0.04, s.ankleY + 0.3 * i, 0.34 * i, 30, 10],
      footR: [-s.hipX - 0.04, s.ankleY + 0.16 * i, 0.16 * i, 40, -10],
      armL: [-30, 0, 70],
      foreL: [-30, 0, 0],
      armR: [-20, 0, -80],
      foreR: [-40, 0, 0],
      ...a,
    }),
    l = ge(n, t, {
      hipsPos: [0, -0.4 * i, -0.12 * i],
      hips: [-20, 0, 0],
      spine: [-14, 0, 0],
      chest: [-12, 0, 0],
      head: [-24, 0, 0],
      armL: [-10, 0, 50],
      armR: [-10, 0, -50],
      ...a,
    }),
    c = e.lieY ?? 0.17,
    f = ge(n, null, {
      hipsPos: [0, c - s.pelvisY, -0.5 * i],
      hips: [-84, 0, 0],
      spine: [-4, 0, 0],
      chest: [-2, 6, 0],
      neck: [0, 10, 0],
      head: [0, 24, 0],
      footL: [s.hipX + 0.08, s.ankleY + 0.03, 0.55 * i, 50, 24],
      footR: [-s.hipX - 0.05, s.ankleY + 0.25 * i, 0.3 * i, 20, -20],
      armL: [-6, 0, 62],
      foreL: [-30, 0, 0],
      armR: [-4, 0, -74],
      foreR: [-14, 0, 0],
      ...a,
      ...(e.lying ?? {}),
    }),
    d = zs([
      [0, t],
      [0.16, l, he.out],
      [0.42, f, he.in],
      [1, f, he.lin],
    ]);
  return { stance: t, stun: o, air: r, dead: d, tmp: jl(n) };
}

function jh(n, t, e, s, i, a, o) {
  const r = n.J;
  switch (e) {
    case "stunned":
      return (
        Un(n, t, o.stun, () => {
          const l = a * 5.2;
          (t.add(r.hips, Math.sin(l) * 4, 0, Math.cos(l) * 5),
            t.add(r.chest, Math.cos(l) * 3, 0, Math.sin(l) * 3),
            t.add(r.head, Math.cos(l * 1.1) * 6, 0, Math.sin(l * 1.1) * 8));
        }),
        !0
      );
    case "airborne":
      return (
        Un(n, t, o.air, () => {
          t.add(r.hips, -14 * Math.sin(i * Math.PI) + 10 * i, 0, 6 * Math.sin(i * 9));
        }),
        !0
      );
    case "dead":
      return (ta(o.dead, hi(s / 1.5), o.tmp), Un(n, t, o.tmp), !0);
    default:
      return !1;
  }
}

function Yo(n, t, e, s, i = 1) {
  const a = n.J,
    o = Math.sin(e * 2.1 + s * 6.28);
  return (
    t.add(a.chest, o * 1.4 * i, 0, 0),
    t.add(a.spine, o * 0.6 * i, 0, 0),
    t.move(a.hips, 0, o * 0.006 * i, 0),
    t.add(a.head, -o * 0.8 * i, Math.sin(e * 0.7 + s * 9) * 3 * i, 0),
    t.add(a.armL, 0, 0, o * 1.2 * i),
    t.add(a.armR, 0, 0, -o * 1.2 * i),
    o
  );
}

const sf = Math.PI / 180,
  yp = new Ut();

function Lh(n) {
  return Array.isArray(n) ? n : (yp.set(n), [yp.r, yp.g, yp.b]);
}

function fh(n, t, e) {
  const s = Lh(n),
    i = Lh(t);
  return [s[0] + (i[0] - s[0]) * e, s[1] + (i[1] - s[1]) * e, s[2] + (i[2] - s[2]) * e];
}

function Ux(n, t) {
  const e = Lh(n);
  return [e[0] * t, e[1] * t, e[2] * t];
}

const Xi = (n) => (n < 0 ? 0 : n > 1 ? 1 : n),
  bt = (n, t, e) => n + (t - n) * e,
  Qn = (n, t, e) => {
    const s = Xi((e - n) / (t - n));
    return s * s * (3 - 2 * s);
  };

function pt(n = 0, t = 0, e = 0, s = 0, i = 0, a = 0, o = 1, r = o, l = o) {
  const c = new Ke(),
    f = new Ri().setFromEuler(new sa(s * sf, i * sf, a * sf, "YXZ"));
  return c.compose(new dt(n, t, e), f, new dt(o, r, l));
}

const K = { cloth: 0, skin: 1, leather: 2, metal: 3, crystal: 4, fur: 5, rock: 6 },
  En = { scale: 1, strata: 2, fur: 3, weave: 4, bark: 5, lava: 6, vein: 7, meteor: 8 },
  rw = new Map();

function wU(n) {
  let t = rw.get(n);
  if (t) return t;
  const e = (1 + Math.sqrt(5)) / 2,
    s = [
      -1,
      e,
      0,
      1,
      e,
      0,
      -1,
      -e,
      0,
      1,
      -e,
      0,
      0,
      -1,
      e,
      0,
      1,
      e,
      0,
      -1,
      -e,
      0,
      1,
      -e,
      e,
      0,
      -1,
      e,
      0,
      1,
      -e,
      0,
      -1,
      -e,
      0,
      1,
    ];
  for (let a = 0; a < s.length; a += 3) {
    const o = Math.hypot(s[a], s[a + 1], s[a + 2]);
    ((s[a] /= o), (s[a + 1] /= o), (s[a + 2] /= o));
  }
  let i = [
    0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4,
    3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1,
  ];
  for (let a = 0; a < n; a++) {
    const o = new Map(),
      r = (c, f) => {
        const d = c < f ? c * 65536 + f : f * 65536 + c;
        let h = o.get(d);
        if (h === void 0) {
          const u = s[c * 3] + s[f * 3],
            m = s[c * 3 + 1] + s[f * 3 + 1],
            x = s[c * 3 + 2] + s[f * 3 + 2],
            p = Math.hypot(u, m, x);
          ((h = s.length / 3), s.push(u / p, m / p, x / p), o.set(d, h));
        }
        return h;
      },
      l = [];
    for (let c = 0; c < i.length; c += 3) {
      const f = i[c],
        d = i[c + 1],
        h = i[c + 2],
        u = r(f, d),
        m = r(d, h),
        x = r(h, f);
      l.push(f, u, x, d, m, u, h, x, m, u, m, x);
    }
    i = l;
  }
  return ((t = { v: s, t: i }), rw.set(n, t), t);
}

const lw = (n, t) => {
    const e = Math.cos(n);
    return t === 2 ? e : Math.sign(e) * Math.pow(Math.abs(e), 2 / t);
  },
  cw = (n, t) => {
    const e = Math.sin(n);
    return t === 2 ? e : Math.sign(e) * Math.pow(Math.abs(e), 2 / t);
  };

function vp(n, t, e, s) {
  let i =
    (Math.imul(n, 374761393) +
      Math.imul(t, 668265263) +
      Math.imul(e, 2147483647) +
      Math.imul(s, 1274126177)) |
    0;
  return ((i = Math.imul(i ^ (i >>> 13), 1274126177)), (i ^= i >>> 16), (i >>> 0) / 4294967296);
}

function p2(n, t) {
  const e = n.userData.lod;
  if (!e) return 1 / 0;
  if (t <= 0) return e.outlined;
  let s = 0,
    i = e.sizes.length;
  for (; s < i;) {
    const a = (s + i) >> 1;
    e.sizes[a] >= t ? (s = a + 1) : (i = a);
  }
  return s > 0 ? e.ends[s - 1] : 0;
}
export { mU, Wa, sw, bU, Tm, Fx, Em, Ct, Xe, Gn, Kn, wf, Qo, Di, Am, Gh, he, hi, ma, Fi, ho, Vh, jl, nf, ge, A8, zs, ta, P0, S0, Un, Rm, Mf, Wh, jh, Yo, sf, Lh, fh, Ux, Xi, bt, Qn, pt, K, En, wU, lw, cw, vp, p2 };
