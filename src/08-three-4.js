// 08-three-4.js — three｜70 个顶层语句｜43KB
// 对应 game.pretty.js 第 13949–15536 行
// 关键内容：
//   ex                    CircleGeometry
//   uf                    CylinderGeometry
//   mm                    ConeGeometry
//   gm                    PolyhedronGeometry
//   sx                    IcosahedronGeometry
//   ix                    OctahedronGeometry
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { $5, A5, B5, C5, D5, Dr, E5, Ee, F5, Fl, G3, G5, Gs, H5, I5, K3, K5, L5, M5, N5, O5, P5, R5, S5, T5, U5, V5, W3, W5, X3, X5, Y3, Y5, Z3, c1, cM, d1, dM, f1, fM, fo, gh, hM, j3, j5, k5, l1, l7, lM, mi, oM, q3, q5, rM, ti, vh, yh, z5 } from './04-audio-2.js';
import { Q3, Vs, dt, kn } from './05-three.js';
import { Ke, Uh, Ut, Ws } from './06-three-2.js';
import { Ae, An, Bn, MM, Yi, bM, pm } from './07-three-3.js';

class SM extends Vs {
  constructor(t, e, s = Fl, i, a, o, r = ti, l = ti, c, f = yh, d = 1) {
    if (f !== yh && f !== vh)
      throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    const h = { width: t, height: e, depth: d };
    (super(h, i, a, o, r, l, f, s, c),
      (this.isDepthTexture = !0),
      (this.flipY = !1),
      (this.generateMipmaps = !1),
      (this.compareFunction = null));
  }
  copy(t) {
    return (
      super.copy(t),
      (this.source = new Q3(Object.assign({}, t.image))),
      (this.compareFunction = t.compareFunction),
      this
    );
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return (this.compareFunction !== null && (e.compareFunction = this.compareFunction), e);
  }
}

class TM extends Vs {
  constructor(t = null) {
    (super(), (this.sourceTexture = t), (this.isExternalTexture = !0));
  }
  copy(t) {
    return (super.copy(t), (this.sourceTexture = t.sourceTexture), this);
  }
}

class ex extends Bn {
  constructor(t = 1, e = 32, s = 0, i = Math.PI * 2) {
    (super(),
      (this.type = "CircleGeometry"),
      (this.parameters = { radius: t, segments: e, thetaStart: s, thetaLength: i }),
      (e = Math.max(3, e)));
    const a = [],
      o = [],
      r = [],
      l = [],
      c = new dt(),
      f = new Ee();
    (o.push(0, 0, 0), r.push(0, 0, 1), l.push(0.5, 0.5));
    for (let d = 0, h = 3; d <= e; d++, h += 3) {
      const u = s + (d / e) * i;
      ((c.x = t * Math.cos(u)),
        (c.y = t * Math.sin(u)),
        o.push(c.x, c.y, c.z),
        r.push(0, 0, 1),
        (f.x = (o[h] / t + 1) / 2),
        (f.y = (o[h + 1] / t + 1) / 2),
        l.push(f.x, f.y));
    }
    for (let d = 1; d <= e; d++) a.push(d, d + 1, 0);
    (this.setIndex(a),
      this.setAttribute("position", new Ae(o, 3)),
      this.setAttribute("normal", new Ae(r, 3)),
      this.setAttribute("uv", new Ae(l, 2)));
  }
  copy(t) {
    return (super.copy(t), (this.parameters = Object.assign({}, t.parameters)), this);
  }
  static fromJSON(t) {
    return new ex(t.radius, t.segments, t.thetaStart, t.thetaLength);
  }
}

class uf extends Bn {
  constructor(t = 1, e = 1, s = 1, i = 32, a = 1, o = !1, r = 0, l = Math.PI * 2) {
    (super(),
      (this.type = "CylinderGeometry"),
      (this.parameters = {
        radiusTop: t,
        radiusBottom: e,
        height: s,
        radialSegments: i,
        heightSegments: a,
        openEnded: o,
        thetaStart: r,
        thetaLength: l,
      }));
    const c = this;
    ((i = Math.floor(i)), (a = Math.floor(a)));
    const f = [],
      d = [],
      h = [],
      u = [];
    let m = 0;
    const x = [],
      p = s / 2;
    let g = 0;
    (y(),
      o === !1 && (t > 0 && v(!0), e > 0 && v(!1)),
      this.setIndex(f),
      this.setAttribute("position", new Ae(d, 3)),
      this.setAttribute("normal", new Ae(h, 3)),
      this.setAttribute("uv", new Ae(u, 2)));
    function y() {
      const _ = new dt(),
        k = new dt();
      let M = 0;
      const S = (e - t) / s;
      for (let b = 0; b <= a; b++) {
        const w = [],
          T = b / a,
          E = T * (e - t) + t;
        for (let A = 0; A <= i; A++) {
          const C = A / i,
            R = C * l + r,
            I = Math.sin(R),
            P = Math.cos(R);
          ((k.x = E * I),
            (k.y = -T * s + p),
            (k.z = E * P),
            d.push(k.x, k.y, k.z),
            _.set(I, S, P).normalize(),
            h.push(_.x, _.y, _.z),
            u.push(C, 1 - T),
            w.push(m++));
        }
        x.push(w);
      }
      for (let b = 0; b < i; b++)
        for (let w = 0; w < a; w++) {
          const T = x[w][b],
            E = x[w + 1][b],
            A = x[w + 1][b + 1],
            C = x[w][b + 1];
          ((t > 0 || w !== 0) && (f.push(T, E, C), (M += 3)),
            (e > 0 || w !== a - 1) && (f.push(E, A, C), (M += 3)));
        }
      (c.addGroup(g, M, 0), (g += M));
    }
    function v(_) {
      const k = m,
        M = new Ee(),
        S = new dt();
      let b = 0;
      const w = _ === !0 ? t : e,
        T = _ === !0 ? 1 : -1;
      for (let A = 1; A <= i; A++) (d.push(0, p * T, 0), h.push(0, T, 0), u.push(0.5, 0.5), m++);
      const E = m;
      for (let A = 0; A <= i; A++) {
        const R = (A / i) * l + r,
          I = Math.cos(R),
          P = Math.sin(R);
        ((S.x = w * P),
          (S.y = p * T),
          (S.z = w * I),
          d.push(S.x, S.y, S.z),
          h.push(0, T, 0),
          (M.x = I * 0.5 + 0.5),
          (M.y = P * 0.5 * T + 0.5),
          u.push(M.x, M.y),
          m++);
      }
      for (let A = 0; A < i; A++) {
        const C = k + A,
          R = E + A;
        (_ === !0 ? f.push(R, R + 1, C) : f.push(R + 1, R, C), (b += 3));
      }
      (c.addGroup(g, b, _ === !0 ? 1 : 2), (g += b));
    }
  }
  copy(t) {
    return (super.copy(t), (this.parameters = Object.assign({}, t.parameters)), this);
  }
  static fromJSON(t) {
    return new uf(
      t.radiusTop,
      t.radiusBottom,
      t.height,
      t.radialSegments,
      t.heightSegments,
      t.openEnded,
      t.thetaStart,
      t.thetaLength,
    );
  }
}

class mm extends uf {
  constructor(t = 1, e = 1, s = 32, i = 1, a = !1, o = 0, r = Math.PI * 2) {
    (super(0, t, e, s, i, a, o, r),
      (this.type = "ConeGeometry"),
      (this.parameters = {
        radius: t,
        height: e,
        radialSegments: s,
        heightSegments: i,
        openEnded: a,
        thetaStart: o,
        thetaLength: r,
      }));
  }
  static fromJSON(t) {
    return new mm(
      t.radius,
      t.height,
      t.radialSegments,
      t.heightSegments,
      t.openEnded,
      t.thetaStart,
      t.thetaLength,
    );
  }
}

class gm extends Bn {
  constructor(t = [], e = [], s = 1, i = 0) {
    (super(),
      (this.type = "PolyhedronGeometry"),
      (this.parameters = { vertices: t, indices: e, radius: s, detail: i }));
    const a = [],
      o = [];
    (r(i),
      c(s),
      f(),
      this.setAttribute("position", new Ae(a, 3)),
      this.setAttribute("normal", new Ae(a.slice(), 3)),
      this.setAttribute("uv", new Ae(o, 2)),
      i === 0 ? this.computeVertexNormals() : this.normalizeNormals());
    function r(y) {
      const v = new dt(),
        _ = new dt(),
        k = new dt();
      for (let M = 0; M < e.length; M += 3) (u(e[M + 0], v), u(e[M + 1], _), u(e[M + 2], k), l(v, _, k, y));
    }
    function l(y, v, _, k) {
      const M = k + 1,
        S = [];
      for (let b = 0; b <= M; b++) {
        S[b] = [];
        const w = y.clone().lerp(_, b / M),
          T = v.clone().lerp(_, b / M),
          E = M - b;
        for (let A = 0; A <= E; A++)
          A === 0 && b === M ? (S[b][A] = w) : (S[b][A] = w.clone().lerp(T, A / E));
      }
      for (let b = 0; b < M; b++)
        for (let w = 0; w < 2 * (M - b) - 1; w++) {
          const T = Math.floor(w / 2);
          w % 2 === 0
            ? (h(S[b][T + 1]), h(S[b + 1][T]), h(S[b][T]))
            : (h(S[b][T + 1]), h(S[b + 1][T + 1]), h(S[b + 1][T]));
        }
    }
    function c(y) {
      const v = new dt();
      for (let _ = 0; _ < a.length; _ += 3)
        ((v.x = a[_ + 0]),
          (v.y = a[_ + 1]),
          (v.z = a[_ + 2]),
          v.normalize().multiplyScalar(y),
          (a[_ + 0] = v.x),
          (a[_ + 1] = v.y),
          (a[_ + 2] = v.z));
    }
    function f() {
      const y = new dt();
      for (let v = 0; v < a.length; v += 3) {
        ((y.x = a[v + 0]), (y.y = a[v + 1]), (y.z = a[v + 2]));
        const _ = p(y) / 2 / Math.PI + 0.5,
          k = g(y) / Math.PI + 0.5;
        o.push(_, 1 - k);
      }
      (m(), d());
    }
    function d() {
      for (let y = 0; y < o.length; y += 6) {
        const v = o[y + 0],
          _ = o[y + 2],
          k = o[y + 4],
          M = Math.max(v, _, k),
          S = Math.min(v, _, k);
        M > 0.9 &&
          S < 0.1 &&
          (v < 0.2 && (o[y + 0] += 1), _ < 0.2 && (o[y + 2] += 1), k < 0.2 && (o[y + 4] += 1));
      }
    }
    function h(y) {
      a.push(y.x, y.y, y.z);
    }
    function u(y, v) {
      const _ = y * 3;
      ((v.x = t[_ + 0]), (v.y = t[_ + 1]), (v.z = t[_ + 2]));
    }
    function m() {
      const y = new dt(),
        v = new dt(),
        _ = new dt(),
        k = new dt(),
        M = new Ee(),
        S = new Ee(),
        b = new Ee();
      for (let w = 0, T = 0; w < a.length; w += 9, T += 6) {
        (y.set(a[w + 0], a[w + 1], a[w + 2]),
          v.set(a[w + 3], a[w + 4], a[w + 5]),
          _.set(a[w + 6], a[w + 7], a[w + 8]),
          M.set(o[T + 0], o[T + 1]),
          S.set(o[T + 2], o[T + 3]),
          b.set(o[T + 4], o[T + 5]),
          k.copy(y).add(v).add(_).divideScalar(3));
        const E = p(k);
        (x(M, T + 0, y, E), x(S, T + 2, v, E), x(b, T + 4, _, E));
      }
    }
    function x(y, v, _, k) {
      (k < 0 && y.x === 1 && (o[v] = y.x - 1), _.x === 0 && _.z === 0 && (o[v] = k / 2 / Math.PI + 0.5));
    }
    function p(y) {
      return Math.atan2(y.z, -y.x);
    }
    function g(y) {
      return Math.atan2(-y.y, Math.sqrt(y.x * y.x + y.z * y.z));
    }
  }
  copy(t) {
    return (super.copy(t), (this.parameters = Object.assign({}, t.parameters)), this);
  }
  static fromJSON(t) {
    return new gm(t.vertices, t.indices, t.radius, t.details);
  }
}

function Q7(n, t, e = 2) {
  const s = t && t.length,
    i = s ? t[0] * e : n.length;
  let a = EM(n, 0, i, e, !0);
  const o = [];
  if (!a || a.next === a.prev) return o;
  let r, l, c;
  if ((s && (a = sE(n, t, a, e)), n.length > 80 * e)) {
    ((r = 1 / 0), (l = 1 / 0));
    let f = -1 / 0,
      d = -1 / 0;
    for (let h = e; h < i; h += e) {
      const u = n[h],
        m = n[h + 1];
      (u < r && (r = u), m < l && (l = m), u > f && (f = u), m > d && (d = m));
    }
    ((c = Math.max(f - r, d - l)), (c = c !== 0 ? 32767 / c : 0));
  }
  return (_h(a, o, e, r, l, c, 0), o);
}

function EM(n, t, e, s, i) {
  let a;
  if (i === pE(n, t, e, s) > 0) for (let o = t; o < e; o += s) a = Sv((o / s) | 0, n[o], n[o + 1], a);
  else for (let o = e - s; o >= t; o -= s) a = Sv((o / s) | 0, n[o], n[o + 1], a);
  return (a && pf(a, a.next) && (Mh(a), (a = a.next)), a);
}

function Ol(n, t) {
  if (!n) return n;
  t || (t = n);
  let e = n,
    s;
  do
    if (((s = !1), !e.steiner && (pf(e, e.next) || ys(e.prev, e, e.next) === 0))) {
      if ((Mh(e), (e = t = e.prev), e === e.next)) break;
      s = !0;
    } else e = e.next;
  while (s || e !== t);
  return t;
}

function _h(n, t, e, s, i, a, o) {
  if (!n) return;
  !o && a && lE(n, s, i, a);
  let r = n;
  for (; n.prev !== n.next;) {
    const l = n.prev,
      c = n.next;
    if (a ? tE(n, s, i, a) : J7(n)) {
      (t.push(l.i, n.i, c.i), Mh(n), (n = c.next), (r = c.next));
      continue;
    }
    if (((n = c), n === r)) {
      o
        ? o === 1
          ? ((n = eE(Ol(n), t)), _h(n, t, e, s, i, a, 2))
          : o === 2 && nE(n, t, e, s, i, a)
        : _h(Ol(n), t, e, s, i, a, 1);
      break;
    }
  }
}

function J7(n) {
  const t = n.prev,
    e = n,
    s = n.next;
  if (ys(t, e, s) >= 0) return !1;
  const i = t.x,
    a = e.x,
    o = s.x,
    r = t.y,
    l = e.y,
    c = s.y,
    f = Math.min(i, a, o),
    d = Math.min(r, l, c),
    h = Math.max(i, a, o),
    u = Math.max(r, l, c);
  let m = s.next;
  for (; m !== t;) {
    if (
      m.x >= f &&
      m.x <= h &&
      m.y >= d &&
      m.y <= u &&
      Hd(i, r, a, l, o, c, m.x, m.y) &&
      ys(m.prev, m, m.next) >= 0
    )
      return !1;
    m = m.next;
  }
  return !0;
}

function tE(n, t, e, s) {
  const i = n.prev,
    a = n,
    o = n.next;
  if (ys(i, a, o) >= 0) return !1;
  const r = i.x,
    l = a.x,
    c = o.x,
    f = i.y,
    d = a.y,
    h = o.y,
    u = Math.min(r, l, c),
    m = Math.min(f, d, h),
    x = Math.max(r, l, c),
    p = Math.max(f, d, h),
    g = t3(u, m, t, e, s),
    y = t3(x, p, t, e, s);
  let v = n.prevZ,
    _ = n.nextZ;
  for (; v && v.z >= g && _ && _.z <= y;) {
    if (
      (v.x >= u &&
        v.x <= x &&
        v.y >= m &&
        v.y <= p &&
        v !== i &&
        v !== o &&
        Hd(r, f, l, d, c, h, v.x, v.y) &&
        ys(v.prev, v, v.next) >= 0) ||
      ((v = v.prevZ),
      _.x >= u &&
        _.x <= x &&
        _.y >= m &&
        _.y <= p &&
        _ !== i &&
        _ !== o &&
        Hd(r, f, l, d, c, h, _.x, _.y) &&
        ys(_.prev, _, _.next) >= 0)
    )
      return !1;
    _ = _.nextZ;
  }
  for (; v && v.z >= g;) {
    if (
      v.x >= u &&
      v.x <= x &&
      v.y >= m &&
      v.y <= p &&
      v !== i &&
      v !== o &&
      Hd(r, f, l, d, c, h, v.x, v.y) &&
      ys(v.prev, v, v.next) >= 0
    )
      return !1;
    v = v.prevZ;
  }
  for (; _ && _.z <= y;) {
    if (
      _.x >= u &&
      _.x <= x &&
      _.y >= m &&
      _.y <= p &&
      _ !== i &&
      _ !== o &&
      Hd(r, f, l, d, c, h, _.x, _.y) &&
      ys(_.prev, _, _.next) >= 0
    )
      return !1;
    _ = _.nextZ;
  }
  return !0;
}

function eE(n, t) {
  let e = n;
  do {
    const s = e.prev,
      i = e.next.next;
    (!pf(s, i) &&
      RM(s, e, e.next, i) &&
      wh(s, i) &&
      wh(i, s) &&
      (t.push(s.i, e.i, i.i), Mh(e), Mh(e.next), (e = n = i)),
      (e = e.next));
  } while (e !== n);
  return Ol(e);
}

function nE(n, t, e, s, i, a) {
  let o = n;
  do {
    let r = o.next.next;
    for (; r !== o.prev;) {
      if (o.i !== r.i && dE(o, r)) {
        let l = CM(o, r);
        ((o = Ol(o, o.next)), (l = Ol(l, l.next)), _h(o, t, e, s, i, a, 0), _h(l, t, e, s, i, a, 0));
        return;
      }
      r = r.next;
    }
    o = o.next;
  } while (o !== n);
}

function sE(n, t, e, s) {
  const i = [];
  for (let a = 0, o = t.length; a < o; a++) {
    const r = t[a] * s,
      l = a < o - 1 ? t[a + 1] * s : n.length,
      c = EM(n, r, l, s, !1);
    (c === c.next && (c.steiner = !0), i.push(fE(c)));
  }
  i.sort(iE);
  for (let a = 0; a < i.length; a++) e = aE(i[a], e);
  return e;
}

function iE(n, t) {
  let e = n.x - t.x;
  if (e === 0 && ((e = n.y - t.y), e === 0)) {
    const s = (n.next.y - n.y) / (n.next.x - n.x),
      i = (t.next.y - t.y) / (t.next.x - t.x);
    e = s - i;
  }
  return e;
}

function aE(n, t) {
  const e = oE(n, t);
  if (!e) return t;
  const s = CM(e, n);
  return (Ol(s, s.next), Ol(e, e.next));
}

function oE(n, t) {
  let e = t;
  const s = n.x,
    i = n.y;
  let a = -1 / 0,
    o;
  if (pf(n, e)) return e;
  do {
    if (pf(n, e.next)) return e.next;
    if (i <= e.y && i >= e.next.y && e.next.y !== e.y) {
      const d = e.x + ((i - e.y) * (e.next.x - e.x)) / (e.next.y - e.y);
      if (d <= s && d > a && ((a = d), (o = e.x < e.next.x ? e : e.next), d === s)) return o;
    }
    e = e.next;
  } while (e !== t);
  if (!o) return null;
  const r = o,
    l = o.x,
    c = o.y;
  let f = 1 / 0;
  e = o;
  do {
    if (s >= e.x && e.x >= l && s !== e.x && AM(i < c ? s : a, i, l, c, i < c ? a : s, i, e.x, e.y)) {
      const d = Math.abs(i - e.y) / (s - e.x);
      wh(e, n) && (d < f || (d === f && (e.x > o.x || (e.x === o.x && rE(o, e))))) && ((o = e), (f = d));
    }
    e = e.next;
  } while (e !== r);
  return o;
}

function rE(n, t) {
  return ys(n.prev, n, t.prev) < 0 && ys(t.next, n, n.next) < 0;
}

function lE(n, t, e, s) {
  let i = n;
  do (i.z === 0 && (i.z = t3(i.x, i.y, t, e, s)), (i.prevZ = i.prev), (i.nextZ = i.next), (i = i.next));
  while (i !== n);
  ((i.prevZ.nextZ = null), (i.prevZ = null), cE(i));
}

function cE(n) {
  let t,
    e = 1;
  do {
    let s = n,
      i;
    n = null;
    let a = null;
    for (t = 0; s;) {
      t++;
      let o = s,
        r = 0;
      for (let c = 0; c < e && (r++, (o = o.nextZ), !!o); c++);
      let l = e;
      for (; r > 0 || (l > 0 && o);)
        (r !== 0 && (l === 0 || !o || s.z <= o.z)
          ? ((i = s), (s = s.nextZ), r--)
          : ((i = o), (o = o.nextZ), l--),
          a ? (a.nextZ = i) : (n = i),
          (i.prevZ = a),
          (a = i));
      s = o;
    }
    ((a.nextZ = null), (e *= 2));
  } while (t > 1);
  return n;
}

function t3(n, t, e, s, i) {
  return (
    (n = ((n - e) * i) | 0),
    (t = ((t - s) * i) | 0),
    (n = (n | (n << 8)) & 16711935),
    (n = (n | (n << 4)) & 252645135),
    (n = (n | (n << 2)) & 858993459),
    (n = (n | (n << 1)) & 1431655765),
    (t = (t | (t << 8)) & 16711935),
    (t = (t | (t << 4)) & 252645135),
    (t = (t | (t << 2)) & 858993459),
    (t = (t | (t << 1)) & 1431655765),
    n | (t << 1)
  );
}

function fE(n) {
  let t = n,
    e = n;
  do ((t.x < e.x || (t.x === e.x && t.y < e.y)) && (e = t), (t = t.next));
  while (t !== n);
  return e;
}

function AM(n, t, e, s, i, a, o, r) {
  return (
    (i - o) * (t - r) >= (n - o) * (a - r) &&
    (n - o) * (s - r) >= (e - o) * (t - r) &&
    (e - o) * (a - r) >= (i - o) * (s - r)
  );
}

function Hd(n, t, e, s, i, a, o, r) {
  return !(n === o && t === r) && AM(n, t, e, s, i, a, o, r);
}

function dE(n, t) {
  return (
    n.next.i !== t.i &&
    n.prev.i !== t.i &&
    !hE(n, t) &&
    ((wh(n, t) && wh(t, n) && uE(n, t) && (ys(n.prev, n, t.prev) || ys(n, t.prev, t))) ||
      (pf(n, t) && ys(n.prev, n, n.next) > 0 && ys(t.prev, t, t.next) > 0))
  );
}

function ys(n, t, e) {
  return (t.y - n.y) * (e.x - t.x) - (t.x - n.x) * (e.y - t.y);
}

function pf(n, t) {
  return n.x === t.x && n.y === t.y;
}

function RM(n, t, e, s) {
  const i = Nu(ys(n, t, e)),
    a = Nu(ys(n, t, s)),
    o = Nu(ys(e, s, n)),
    r = Nu(ys(e, s, t));
  return !!(
    (i !== a && o !== r) ||
    (i === 0 && zu(n, e, t)) ||
    (a === 0 && zu(n, s, t)) ||
    (o === 0 && zu(e, n, s)) ||
    (r === 0 && zu(e, t, s))
  );
}

function zu(n, t, e) {
  return (
    t.x <= Math.max(n.x, e.x) &&
    t.x >= Math.min(n.x, e.x) &&
    t.y <= Math.max(n.y, e.y) &&
    t.y >= Math.min(n.y, e.y)
  );
}

function Nu(n) {
  return n > 0 ? 1 : n < 0 ? -1 : 0;
}

function hE(n, t) {
  let e = n;
  do {
    if (e.i !== n.i && e.next.i !== n.i && e.i !== t.i && e.next.i !== t.i && RM(e, e.next, n, t)) return !0;
    e = e.next;
  } while (e !== n);
  return !1;
}

function wh(n, t) {
  return ys(n.prev, n, n.next) < 0
    ? ys(n, t, n.next) >= 0 && ys(n, n.prev, t) >= 0
    : ys(n, t, n.prev) < 0 || ys(n, n.next, t) < 0;
}

function uE(n, t) {
  let e = n,
    s = !1;
  const i = (n.x + t.x) / 2,
    a = (n.y + t.y) / 2;
  do
    (e.y > a != e.next.y > a &&
      e.next.y !== e.y &&
      i < ((e.next.x - e.x) * (a - e.y)) / (e.next.y - e.y) + e.x &&
      (s = !s),
      (e = e.next));
  while (e !== n);
  return s;
}

function CM(n, t) {
  const e = e3(n.i, n.x, n.y),
    s = e3(t.i, t.x, t.y),
    i = n.next,
    a = t.prev;
  return (
    (n.next = t),
    (t.prev = n),
    (e.next = i),
    (i.prev = e),
    (s.next = e),
    (e.prev = s),
    (a.next = s),
    (s.prev = a),
    s
  );
}

function Sv(n, t, e, s) {
  const i = e3(n, t, e);
  return (
    s ? ((i.next = s.next), (i.prev = s), (s.next.prev = i), (s.next = i)) : ((i.prev = i), (i.next = i)),
    i
  );
}

function Mh(n) {
  ((n.next.prev = n.prev),
    (n.prev.next = n.next),
    n.prevZ && (n.prevZ.nextZ = n.nextZ),
    n.nextZ && (n.nextZ.prevZ = n.prevZ));
}

function e3(n, t, e) {
  return { i: n, x: t, y: e, prev: null, next: null, z: 0, prevZ: null, nextZ: null, steiner: !1 };
}

function pE(n, t, e, s) {
  let i = 0;
  for (let a = t, o = e - s; a < e; a += s) ((i += (n[o] - n[a]) * (n[a + 1] + n[o + 1])), (o = a));
  return i;
}

class mE {
  static triangulate(t, e, s = 2) {
    return Q7(t, e, s);
  }
}

class nx {
  static area(t) {
    const e = t.length;
    let s = 0;
    for (let i = e - 1, a = 0; a < e; i = a++) s += t[i].x * t[a].y - t[a].x * t[i].y;
    return s * 0.5;
  }
  static isClockWise(t) {
    return nx.area(t) < 0;
  }
  static triangulateShape(t, e) {
    const s = [],
      i = [],
      a = [];
    (Tv(t), Ev(s, t));
    let o = t.length;
    e.forEach(Tv);
    for (let l = 0; l < e.length; l++) (i.push(o), (o += e[l].length), Ev(s, e[l]));
    const r = mE.triangulate(s, i);
    for (let l = 0; l < r.length; l += 3) a.push(r.slice(l, l + 3));
    return a;
  }
}

function Tv(n) {
  const t = n.length;
  t > 2 && n[t - 1].equals(n[0]) && n.pop();
}

function Ev(n, t) {
  for (let e = 0; e < t.length; e++) (n.push(t[e].x), n.push(t[e].y));
}

class sx extends gm {
  constructor(t = 1, e = 0) {
    const s = (1 + Math.sqrt(5)) / 2,
      i = [
        -1,
        s,
        0,
        1,
        s,
        0,
        -1,
        -s,
        0,
        1,
        -s,
        0,
        0,
        -1,
        s,
        0,
        1,
        s,
        0,
        -1,
        -s,
        0,
        1,
        -s,
        s,
        0,
        -1,
        s,
        0,
        1,
        -s,
        0,
        -1,
        -s,
        0,
        1,
      ],
      a = [
        0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8, 3,
        9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1,
      ];
    (super(i, a, t, e), (this.type = "IcosahedronGeometry"), (this.parameters = { radius: t, detail: e }));
  }
  static fromJSON(t) {
    return new sx(t.radius, t.detail);
  }
}

class ix extends gm {
  constructor(t = 1, e = 0) {
    const s = [1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1],
      i = [0, 2, 4, 0, 4, 3, 0, 3, 5, 0, 5, 2, 1, 2, 5, 1, 5, 3, 1, 3, 4, 1, 4, 2];
    (super(s, i, t, e), (this.type = "OctahedronGeometry"), (this.parameters = { radius: t, detail: e }));
  }
  static fromJSON(t) {
    return new ix(t.radius, t.detail);
  }
}

class Gl extends Bn {
  constructor(t = 1, e = 1, s = 1, i = 1) {
    (super(),
      (this.type = "PlaneGeometry"),
      (this.parameters = { width: t, height: e, widthSegments: s, heightSegments: i }));
    const a = t / 2,
      o = e / 2,
      r = Math.floor(s),
      l = Math.floor(i),
      c = r + 1,
      f = l + 1,
      d = t / r,
      h = e / l,
      u = [],
      m = [],
      x = [],
      p = [];
    for (let g = 0; g < f; g++) {
      const y = g * h - o;
      for (let v = 0; v < c; v++) {
        const _ = v * d - a;
        (m.push(_, -y, 0), x.push(0, 0, 1), p.push(v / r), p.push(1 - g / l));
      }
    }
    for (let g = 0; g < l; g++)
      for (let y = 0; y < r; y++) {
        const v = y + c * g,
          _ = y + c * (g + 1),
          k = y + 1 + c * (g + 1),
          M = y + 1 + c * g;
        (u.push(v, _, M), u.push(_, k, M));
      }
    (this.setIndex(u),
      this.setAttribute("position", new Ae(m, 3)),
      this.setAttribute("normal", new Ae(x, 3)),
      this.setAttribute("uv", new Ae(p, 2)));
  }
  copy(t) {
    return (super.copy(t), (this.parameters = Object.assign({}, t.parameters)), this);
  }
  static fromJSON(t) {
    return new Gl(t.width, t.height, t.widthSegments, t.heightSegments);
  }
}

class xm extends Bn {
  constructor(t = 1, e = 32, s = 16, i = 0, a = Math.PI * 2, o = 0, r = Math.PI) {
    (super(),
      (this.type = "SphereGeometry"),
      (this.parameters = {
        radius: t,
        widthSegments: e,
        heightSegments: s,
        phiStart: i,
        phiLength: a,
        thetaStart: o,
        thetaLength: r,
      }),
      (e = Math.max(3, Math.floor(e))),
      (s = Math.max(2, Math.floor(s))));
    const l = Math.min(o + r, Math.PI);
    let c = 0;
    const f = [],
      d = new dt(),
      h = new dt(),
      u = [],
      m = [],
      x = [],
      p = [];
    for (let g = 0; g <= s; g++) {
      const y = [],
        v = g / s;
      let _ = 0;
      g === 0 && o === 0 ? (_ = 0.5 / e) : g === s && l === Math.PI && (_ = -0.5 / e);
      for (let k = 0; k <= e; k++) {
        const M = k / e;
        ((d.x = -t * Math.cos(i + M * a) * Math.sin(o + v * r)),
          (d.y = t * Math.cos(o + v * r)),
          (d.z = t * Math.sin(i + M * a) * Math.sin(o + v * r)),
          m.push(d.x, d.y, d.z),
          h.copy(d).normalize(),
          x.push(h.x, h.y, h.z),
          p.push(M + _, 1 - v),
          y.push(c++));
      }
      f.push(y);
    }
    for (let g = 0; g < s; g++)
      for (let y = 0; y < e; y++) {
        const v = f[g][y + 1],
          _ = f[g][y],
          k = f[g + 1][y],
          M = f[g + 1][y + 1];
        ((g !== 0 || o > 0) && u.push(v, _, M), (g !== s - 1 || l < Math.PI) && u.push(_, k, M));
      }
    (this.setIndex(u),
      this.setAttribute("position", new Ae(m, 3)),
      this.setAttribute("normal", new Ae(x, 3)),
      this.setAttribute("uv", new Ae(p, 2)));
  }
  copy(t) {
    return (super.copy(t), (this.parameters = Object.assign({}, t.parameters)), this);
  }
  static fromJSON(t) {
    return new xm(
      t.radius,
      t.widthSegments,
      t.heightSegments,
      t.phiStart,
      t.phiLength,
      t.thetaStart,
      t.thetaLength,
    );
  }
}

class gE extends An {
  constructor(t) {
    (super(t), (this.isRawShaderMaterial = !0), (this.type = "RawShaderMaterial"));
  }
}

class xE extends Uh {
  constructor(t) {
    (super(),
      (this.isMeshDepthMaterial = !0),
      (this.type = "MeshDepthMaterial"),
      (this.depthPacking = l7),
      (this.map = null),
      (this.alphaMap = null),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      this.setValues(t));
  }
  copy(t) {
    return (
      super.copy(t),
      (this.depthPacking = t.depthPacking),
      (this.map = t.map),
      (this.alphaMap = t.alphaMap),
      (this.displacementMap = t.displacementMap),
      (this.displacementScale = t.displacementScale),
      (this.displacementBias = t.displacementBias),
      (this.wireframe = t.wireframe),
      (this.wireframeLinewidth = t.wireframeLinewidth),
      this
    );
  }
}

class yE extends Uh {
  constructor(t) {
    (super(),
      (this.isMeshDistanceMaterial = !0),
      (this.type = "MeshDistanceMaterial"),
      (this.map = null),
      (this.alphaMap = null),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      this.setValues(t));
  }
  copy(t) {
    return (
      super.copy(t),
      (this.map = t.map),
      (this.alphaMap = t.alphaMap),
      (this.displacementMap = t.displacementMap),
      (this.displacementScale = t.displacementScale),
      (this.displacementBias = t.displacementBias),
      this
    );
  }
}

class ax extends Ws {
  constructor(t, e = 1) {
    (super(), (this.isLight = !0), (this.type = "Light"), (this.color = new Ut(t)), (this.intensity = e));
  }
  dispose() {}
  copy(t, e) {
    return (super.copy(t, e), this.color.copy(t.color), (this.intensity = t.intensity), this);
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return (
      (e.object.color = this.color.getHex()),
      (e.object.intensity = this.intensity),
      this.groundColor !== void 0 && (e.object.groundColor = this.groundColor.getHex()),
      this.distance !== void 0 && (e.object.distance = this.distance),
      this.angle !== void 0 && (e.object.angle = this.angle),
      this.decay !== void 0 && (e.object.decay = this.decay),
      this.penumbra !== void 0 && (e.object.penumbra = this.penumbra),
      this.shadow !== void 0 && (e.object.shadow = this.shadow.toJSON()),
      this.target !== void 0 && (e.object.target = this.target.uuid),
      e
    );
  }
}

class LM extends ax {
  constructor(t, e, s) {
    (super(t, s),
      (this.isHemisphereLight = !0),
      (this.type = "HemisphereLight"),
      this.position.copy(Ws.DEFAULT_UP),
      this.updateMatrix(),
      (this.groundColor = new Ut(e)));
  }
  copy(t, e) {
    return (super.copy(t, e), this.groundColor.copy(t.groundColor), this);
  }
}

const Lg = new Ke(),
  Av = new dt(),
  Rv = new dt();

class IM {
  constructor(t) {
    ((this.camera = t),
      (this.intensity = 1),
      (this.bias = 0),
      (this.normalBias = 0),
      (this.radius = 1),
      (this.blurSamples = 8),
      (this.mapSize = new Ee(512, 512)),
      (this.mapType = mi),
      (this.map = null),
      (this.mapPass = null),
      (this.matrix = new Ke()),
      (this.autoUpdate = !0),
      (this.needsUpdate = !1),
      (this._frustum = new pm()),
      (this._frameExtents = new Ee(1, 1)),
      (this._viewportCount = 1),
      (this._viewports = [new kn(0, 0, 1, 1)]));
  }
  getViewportCount() {
    return this._viewportCount;
  }
  getFrustum() {
    return this._frustum;
  }
  updateMatrices(t) {
    const e = this.camera,
      s = this.matrix;
    (Av.setFromMatrixPosition(t.matrixWorld),
      e.position.copy(Av),
      Rv.setFromMatrixPosition(t.target.matrixWorld),
      e.lookAt(Rv),
      e.updateMatrixWorld(),
      Lg.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse),
      this._frustum.setFromProjectionMatrix(Lg, e.coordinateSystem, e.reversedDepth),
      e.reversedDepth
        ? s.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 1, 0, 0, 0, 0, 1)
        : s.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1),
      s.multiply(Lg));
  }
  getViewport(t) {
    return this._viewports[t];
  }
  getFrameExtents() {
    return this._frameExtents;
  }
  dispose() {
    (this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose());
  }
  copy(t) {
    return (
      (this.camera = t.camera.clone()),
      (this.intensity = t.intensity),
      (this.bias = t.bias),
      (this.radius = t.radius),
      (this.autoUpdate = t.autoUpdate),
      (this.needsUpdate = t.needsUpdate),
      (this.normalBias = t.normalBias),
      (this.blurSamples = t.blurSamples),
      this.mapSize.copy(t.mapSize),
      this
    );
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    const t = {};
    return (
      this.intensity !== 1 && (t.intensity = this.intensity),
      this.bias !== 0 && (t.bias = this.bias),
      this.normalBias !== 0 && (t.normalBias = this.normalBias),
      this.radius !== 1 && (t.radius = this.radius),
      (this.mapSize.x !== 512 || this.mapSize.y !== 512) && (t.mapSize = this.mapSize.toArray()),
      (t.camera = this.camera.toJSON(!1).object),
      delete t.camera.matrix,
      t
    );
  }
}

const Cv = new Ke(),
  sd = new dt(),
  Ig = new dt();

class vE extends IM {
  constructor() {
    (super(new Yi(90, 1, 0.5, 500)),
      (this.isPointLightShadow = !0),
      (this._frameExtents = new Ee(4, 2)),
      (this._viewportCount = 6),
      (this._viewports = [
        new kn(2, 1, 1, 1),
        new kn(0, 1, 1, 1),
        new kn(3, 1, 1, 1),
        new kn(1, 1, 1, 1),
        new kn(3, 0, 1, 1),
        new kn(1, 0, 1, 1),
      ]),
      (this._cubeDirections = [
        new dt(1, 0, 0),
        new dt(-1, 0, 0),
        new dt(0, 0, 1),
        new dt(0, 0, -1),
        new dt(0, 1, 0),
        new dt(0, -1, 0),
      ]),
      (this._cubeUps = [
        new dt(0, 1, 0),
        new dt(0, 1, 0),
        new dt(0, 1, 0),
        new dt(0, 1, 0),
        new dt(0, 0, 1),
        new dt(0, 0, -1),
      ]));
  }
  updateMatrices(t, e = 0) {
    const s = this.camera,
      i = this.matrix,
      a = t.distance || s.far;
    (a !== s.far && ((s.far = a), s.updateProjectionMatrix()),
      sd.setFromMatrixPosition(t.matrixWorld),
      s.position.copy(sd),
      Ig.copy(s.position),
      Ig.add(this._cubeDirections[e]),
      s.up.copy(this._cubeUps[e]),
      s.lookAt(Ig),
      s.updateMatrixWorld(),
      i.makeTranslation(-sd.x, -sd.y, -sd.z),
      Cv.multiplyMatrices(s.projectionMatrix, s.matrixWorldInverse),
      this._frustum.setFromProjectionMatrix(Cv, s.coordinateSystem, s.reversedDepth));
  }
}

class PM extends ax {
  constructor(t, e, s = 0, i = 2) {
    (super(t, e),
      (this.isPointLight = !0),
      (this.type = "PointLight"),
      (this.distance = s),
      (this.decay = i),
      (this.shadow = new vE()));
  }
  get power() {
    return this.intensity * 4 * Math.PI;
  }
  set power(t) {
    this.intensity = t / (4 * Math.PI);
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(t, e) {
    return (
      super.copy(t, e),
      (this.distance = t.distance),
      (this.decay = t.decay),
      (this.shadow = t.shadow.clone()),
      this
    );
  }
}

class ox extends bM {
  constructor(t = -1, e = 1, s = 1, i = -1, a = 0.1, o = 2e3) {
    (super(),
      (this.isOrthographicCamera = !0),
      (this.type = "OrthographicCamera"),
      (this.zoom = 1),
      (this.view = null),
      (this.left = t),
      (this.right = e),
      (this.top = s),
      (this.bottom = i),
      (this.near = a),
      (this.far = o),
      this.updateProjectionMatrix());
  }
  copy(t, e) {
    return (
      super.copy(t, e),
      (this.left = t.left),
      (this.right = t.right),
      (this.top = t.top),
      (this.bottom = t.bottom),
      (this.near = t.near),
      (this.far = t.far),
      (this.zoom = t.zoom),
      (this.view = t.view === null ? null : Object.assign({}, t.view)),
      this
    );
  }
  setViewOffset(t, e, s, i, a, o) {
    (this.view === null &&
      (this.view = { enabled: !0, fullWidth: 1, fullHeight: 1, offsetX: 0, offsetY: 0, width: 1, height: 1 }),
      (this.view.enabled = !0),
      (this.view.fullWidth = t),
      (this.view.fullHeight = e),
      (this.view.offsetX = s),
      (this.view.offsetY = i),
      (this.view.width = a),
      (this.view.height = o),
      this.updateProjectionMatrix());
  }
  clearViewOffset() {
    (this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix());
  }
  updateProjectionMatrix() {
    const t = (this.right - this.left) / (2 * this.zoom),
      e = (this.top - this.bottom) / (2 * this.zoom),
      s = (this.right + this.left) / 2,
      i = (this.top + this.bottom) / 2;
    let a = s - t,
      o = s + t,
      r = i + e,
      l = i - e;
    if (this.view !== null && this.view.enabled) {
      const c = (this.right - this.left) / this.view.fullWidth / this.zoom,
        f = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      ((a += c * this.view.offsetX),
        (o = a + c * this.view.width),
        (r -= f * this.view.offsetY),
        (l = r - f * this.view.height));
    }
    (this.projectionMatrix.makeOrthographic(
      a,
      o,
      r,
      l,
      this.near,
      this.far,
      this.coordinateSystem,
      this.reversedDepth,
    ),
      this.projectionMatrixInverse.copy(this.projectionMatrix).invert());
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return (
      (e.object.zoom = this.zoom),
      (e.object.left = this.left),
      (e.object.right = this.right),
      (e.object.top = this.top),
      (e.object.bottom = this.bottom),
      (e.object.near = this.near),
      (e.object.far = this.far),
      this.view !== null && (e.object.view = Object.assign({}, this.view)),
      e
    );
  }
}

class bE extends IM {
  constructor() {
    (super(new ox(-5, 5, 5, -5, 0.5, 500)), (this.isDirectionalLightShadow = !0));
  }
}

class DM extends ax {
  constructor(t, e) {
    (super(t, e),
      (this.isDirectionalLight = !0),
      (this.type = "DirectionalLight"),
      this.position.copy(Ws.DEFAULT_UP),
      this.updateMatrix(),
      (this.target = new Ws()),
      (this.shadow = new bE()));
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(t) {
    return (super.copy(t), (this.target = t.target.clone()), (this.shadow = t.shadow.clone()), this);
  }
}

class Cf extends Bn {
  constructor() {
    (super(),
      (this.isInstancedBufferGeometry = !0),
      (this.type = "InstancedBufferGeometry"),
      (this.instanceCount = 1 / 0));
  }
  copy(t) {
    return (super.copy(t), (this.instanceCount = t.instanceCount), this);
  }
  toJSON() {
    const t = super.toJSON();
    return ((t.instanceCount = this.instanceCount), (t.isInstancedBufferGeometry = !0), t);
  }
}

class _E extends Yi {
  constructor(t = []) {
    (super(), (this.isArrayCamera = !0), (this.isMultiViewCamera = !1), (this.cameras = t));
  }
}

class wE {
  constructor(t = !0) {
    ((this.autoStart = t),
      (this.startTime = 0),
      (this.oldTime = 0),
      (this.elapsedTime = 0),
      (this.running = !1));
  }
  start() {
    ((this.startTime = performance.now()),
      (this.oldTime = this.startTime),
      (this.elapsedTime = 0),
      (this.running = !0));
  }
  stop() {
    (this.getElapsedTime(), (this.running = !1), (this.autoStart = !1));
  }
  getElapsedTime() {
    return (this.getDelta(), this.elapsedTime);
  }
  getDelta() {
    let t = 0;
    if (this.autoStart && !this.running) return (this.start(), 0);
    if (this.running) {
      const e = performance.now();
      ((t = (e - this.oldTime) / 1e3), (this.oldTime = e), (this.elapsedTime += t));
    }
    return t;
  }
}

class rx extends MM {
  constructor(t, e, s = 1) {
    (super(t, e), (this.isInstancedInterleavedBuffer = !0), (this.meshPerAttribute = s));
  }
  copy(t) {
    return (super.copy(t), (this.meshPerAttribute = t.meshPerAttribute), this);
  }
  clone(t) {
    const e = super.clone(t);
    return ((e.meshPerAttribute = this.meshPerAttribute), e);
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return ((e.isInstancedInterleavedBuffer = !0), (e.meshPerAttribute = this.meshPerAttribute), e);
  }
}

function Lv(n, t, e, s) {
  const i = ME(s);
  switch (e) {
    case fM:
      return n * t;
    case X3:
      return ((n * t) / i.components) * i.byteLength;
    case Y3:
      return ((n * t) / i.components) * i.byteLength;
    case hM:
      return ((n * t * 2) / i.components) * i.byteLength;
    case K3:
      return ((n * t * 2) / i.components) * i.byteLength;
    case dM:
      return ((n * t * 3) / i.components) * i.byteLength;
    case Gs:
      return ((n * t * 4) / i.components) * i.byteLength;
    case Z3:
      return ((n * t * 4) / i.components) * i.byteLength;
    case l1:
    case c1:
      return Math.floor((n + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case f1:
    case d1:
      return Math.floor((n + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case k5:
    case T5:
      return (Math.max(n, 16) * Math.max(t, 8)) / 4;
    case M5:
    case S5:
      return (Math.max(n, 8) * Math.max(t, 8)) / 2;
    case E5:
    case A5:
      return Math.floor((n + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case R5:
      return Math.floor((n + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case C5:
      return Math.floor((n + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case L5:
      return Math.floor((n + 4) / 5) * Math.floor((t + 3) / 4) * 16;
    case I5:
      return Math.floor((n + 4) / 5) * Math.floor((t + 4) / 5) * 16;
    case P5:
      return Math.floor((n + 5) / 6) * Math.floor((t + 4) / 5) * 16;
    case D5:
      return Math.floor((n + 5) / 6) * Math.floor((t + 5) / 6) * 16;
    case z5:
      return Math.floor((n + 7) / 8) * Math.floor((t + 4) / 5) * 16;
    case N5:
      return Math.floor((n + 7) / 8) * Math.floor((t + 5) / 6) * 16;
    case F5:
      return Math.floor((n + 7) / 8) * Math.floor((t + 7) / 8) * 16;
    case U5:
      return Math.floor((n + 9) / 10) * Math.floor((t + 4) / 5) * 16;
    case O5:
      return Math.floor((n + 9) / 10) * Math.floor((t + 5) / 6) * 16;
    case B5:
      return Math.floor((n + 9) / 10) * Math.floor((t + 7) / 8) * 16;
    case H5:
      return Math.floor((n + 9) / 10) * Math.floor((t + 9) / 10) * 16;
    case $5:
      return Math.floor((n + 11) / 12) * Math.floor((t + 9) / 10) * 16;
    case G5:
      return Math.floor((n + 11) / 12) * Math.floor((t + 11) / 12) * 16;
    case V5:
    case W5:
    case j5:
      return Math.ceil(n / 4) * Math.ceil(t / 4) * 16;
    case q5:
    case X5:
      return Math.ceil(n / 4) * Math.ceil(t / 4) * 8;
    case Y5:
    case K5:
      return Math.ceil(n / 4) * Math.ceil(t / 4) * 16;
  }
  throw new Error(`Unable to determine texture byte length for ${e} format.`);
}

function ME(n) {
  switch (n) {
    case mi:
    case oM:
      return { byteLength: 1, components: 1 };
    case gh:
    case rM:
    case Dr:
      return { byteLength: 2, components: 1 };
    case j3:
    case q3:
      return { byteLength: 2, components: 4 };
    case Fl:
    case W3:
    case fo:
      return { byteLength: 4, components: 1 };
    case lM:
    case cM:
      return { byteLength: 4, components: 3 };
  }
  throw new Error(`Unknown texture type ${n}.`);
}

typeof __THREE_DEVTOOLS__ < "u" &&
  __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: { revision: G3 } }));

typeof window < "u" &&
  (window.__THREE__
    ? console.warn("WARNING: Multiple instances of Three.js being imported.")
    : (window.__THREE__ = G3));

function zM() {
  let n = null,
    t = !1,
    e = null,
    s = null;
  function i(a, o) {
    (e(a, o), (s = n.requestAnimationFrame(i)));
  }
  return {
    start: function () {
      t !== !0 && e !== null && ((s = n.requestAnimationFrame(i)), (t = !0));
    },
    stop: function () {
      (n.cancelAnimationFrame(s), (t = !1));
    },
    setAnimationLoop: function (a) {
      e = a;
    },
    setContext: function (a) {
      n = a;
    },
  };
}

function kE(n) {
  const t = new WeakMap();
  function e(r, l) {
    const c = r.array,
      f = r.usage,
      d = c.byteLength,
      h = n.createBuffer();
    (n.bindBuffer(l, h), n.bufferData(l, c, f), r.onUploadCallback());
    let u;
    if (c instanceof Float32Array) u = n.FLOAT;
    else if (typeof Float16Array < "u" && c instanceof Float16Array) u = n.HALF_FLOAT;
    else if (c instanceof Uint16Array)
      r.isFloat16BufferAttribute ? (u = n.HALF_FLOAT) : (u = n.UNSIGNED_SHORT);
    else if (c instanceof Int16Array) u = n.SHORT;
    else if (c instanceof Uint32Array) u = n.UNSIGNED_INT;
    else if (c instanceof Int32Array) u = n.INT;
    else if (c instanceof Int8Array) u = n.BYTE;
    else if (c instanceof Uint8Array) u = n.UNSIGNED_BYTE;
    else if (c instanceof Uint8ClampedArray) u = n.UNSIGNED_BYTE;
    else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + c);
    return { buffer: h, type: u, bytesPerElement: c.BYTES_PER_ELEMENT, version: r.version, size: d };
  }
  function s(r, l, c) {
    const f = l.array,
      d = l.updateRanges;
    if ((n.bindBuffer(c, r), d.length === 0)) n.bufferSubData(c, 0, f);
    else {
      d.sort((u, m) => u.start - m.start);
      let h = 0;
      for (let u = 1; u < d.length; u++) {
        const m = d[h],
          x = d[u];
        x.start <= m.start + m.count + 1
          ? (m.count = Math.max(m.count, x.start + x.count - m.start))
          : (++h, (d[h] = x));
      }
      d.length = h + 1;
      for (let u = 0, m = d.length; u < m; u++) {
        const x = d[u];
        n.bufferSubData(c, x.start * f.BYTES_PER_ELEMENT, f, x.start, x.count);
      }
      l.clearUpdateRanges();
    }
    l.onUploadCallback();
  }
  function i(r) {
    return (r.isInterleavedBufferAttribute && (r = r.data), t.get(r));
  }
  function a(r) {
    r.isInterleavedBufferAttribute && (r = r.data);
    const l = t.get(r);
    l && (n.deleteBuffer(l.buffer), t.delete(r));
  }
  function o(r, l) {
    if ((r.isInterleavedBufferAttribute && (r = r.data), r.isGLBufferAttribute)) {
      const f = t.get(r);
      (!f || f.version < r.version) &&
        t.set(r, { buffer: r.buffer, type: r.type, bytesPerElement: r.elementSize, version: r.version });
      return;
    }
    const c = t.get(r);
    if (c === void 0) t.set(r, e(r, l));
    else if (c.version < r.version) {
      if (c.size !== r.array.byteLength)
        throw new Error(
          "THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.",
        );
      (s(c.buffer, r, l), (c.version = r.version));
    }
  }
  return { get: i, remove: a, update: o };
}
export { SM, TM, ex, uf, mm, nx, sx, ix, Gl, xm, gE, xE, yE, LM, PM, ox, DM, Cf, _E, wE, rx, Lv, zM, kE };
