// 06-three-2.js — three｜22 个顶层语句｜67KB
// 对应 game.pretty.js 第 9518–11723 行
// 关键内容：
//   fv                    added
//   Ws                    Object3D
//   oo                    in l && (l.z = 0),
//   Ut                    number
//   Uh                    Material
//   yM                    MeshBasicMaterial
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { Af, C0, Ee, Kc, Rr, Uo, b0, cf, ec, lg, mo, nM, nv, ri, u5, v7, vn, z1 } from './04-audio-2.js';
import { In, Je, Ri, Tr, Zc, dt, kn } from './05-three.js';

class Ke {
  constructor(t, e, s, i, a, o, r, l, c, f, d, h, u, m, x, p) {
    ((Ke.prototype.isMatrix4 = !0),
      (this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
      t !== void 0 && this.set(t, e, s, i, a, o, r, l, c, f, d, h, u, m, x, p));
  }
  set(t, e, s, i, a, o, r, l, c, f, d, h, u, m, x, p) {
    const g = this.elements;
    return (
      (g[0] = t),
      (g[4] = e),
      (g[8] = s),
      (g[12] = i),
      (g[1] = a),
      (g[5] = o),
      (g[9] = r),
      (g[13] = l),
      (g[2] = c),
      (g[6] = f),
      (g[10] = d),
      (g[14] = h),
      (g[3] = u),
      (g[7] = m),
      (g[11] = x),
      (g[15] = p),
      this
    );
  }
  identity() {
    return (this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this);
  }
  clone() {
    return new Ke().fromArray(this.elements);
  }
  copy(t) {
    const e = this.elements,
      s = t.elements;
    return (
      (e[0] = s[0]),
      (e[1] = s[1]),
      (e[2] = s[2]),
      (e[3] = s[3]),
      (e[4] = s[4]),
      (e[5] = s[5]),
      (e[6] = s[6]),
      (e[7] = s[7]),
      (e[8] = s[8]),
      (e[9] = s[9]),
      (e[10] = s[10]),
      (e[11] = s[11]),
      (e[12] = s[12]),
      (e[13] = s[13]),
      (e[14] = s[14]),
      (e[15] = s[15]),
      this
    );
  }
  copyPosition(t) {
    const e = this.elements,
      s = t.elements;
    return ((e[12] = s[12]), (e[13] = s[13]), (e[14] = s[14]), this);
  }
  setFromMatrix3(t) {
    const e = t.elements;
    return (this.set(e[0], e[3], e[6], 0, e[1], e[4], e[7], 0, e[2], e[5], e[8], 0, 0, 0, 0, 1), this);
  }
  extractBasis(t, e, s) {
    return (
      t.setFromMatrixColumn(this, 0),
      e.setFromMatrixColumn(this, 1),
      s.setFromMatrixColumn(this, 2),
      this
    );
  }
  makeBasis(t, e, s) {
    return (this.set(t.x, e.x, s.x, 0, t.y, e.y, s.y, 0, t.z, e.z, s.z, 0, 0, 0, 0, 1), this);
  }
  extractRotation(t) {
    const e = this.elements,
      s = t.elements,
      i = 1 / oc.setFromMatrixColumn(t, 0).length(),
      a = 1 / oc.setFromMatrixColumn(t, 1).length(),
      o = 1 / oc.setFromMatrixColumn(t, 2).length();
    return (
      (e[0] = s[0] * i),
      (e[1] = s[1] * i),
      (e[2] = s[2] * i),
      (e[3] = 0),
      (e[4] = s[4] * a),
      (e[5] = s[5] * a),
      (e[6] = s[6] * a),
      (e[7] = 0),
      (e[8] = s[8] * o),
      (e[9] = s[9] * o),
      (e[10] = s[10] * o),
      (e[11] = 0),
      (e[12] = 0),
      (e[13] = 0),
      (e[14] = 0),
      (e[15] = 1),
      this
    );
  }
  makeRotationFromEuler(t) {
    const e = this.elements,
      s = t.x,
      i = t.y,
      a = t.z,
      o = Math.cos(s),
      r = Math.sin(s),
      l = Math.cos(i),
      c = Math.sin(i),
      f = Math.cos(a),
      d = Math.sin(a);
    if (t.order === "XYZ") {
      const h = o * f,
        u = o * d,
        m = r * f,
        x = r * d;
      ((e[0] = l * f),
        (e[4] = -l * d),
        (e[8] = c),
        (e[1] = u + m * c),
        (e[5] = h - x * c),
        (e[9] = -r * l),
        (e[2] = x - h * c),
        (e[6] = m + u * c),
        (e[10] = o * l));
    } else if (t.order === "YXZ") {
      const h = l * f,
        u = l * d,
        m = c * f,
        x = c * d;
      ((e[0] = h + x * r),
        (e[4] = m * r - u),
        (e[8] = o * c),
        (e[1] = o * d),
        (e[5] = o * f),
        (e[9] = -r),
        (e[2] = u * r - m),
        (e[6] = x + h * r),
        (e[10] = o * l));
    } else if (t.order === "ZXY") {
      const h = l * f,
        u = l * d,
        m = c * f,
        x = c * d;
      ((e[0] = h - x * r),
        (e[4] = -o * d),
        (e[8] = m + u * r),
        (e[1] = u + m * r),
        (e[5] = o * f),
        (e[9] = x - h * r),
        (e[2] = -o * c),
        (e[6] = r),
        (e[10] = o * l));
    } else if (t.order === "ZYX") {
      const h = o * f,
        u = o * d,
        m = r * f,
        x = r * d;
      ((e[0] = l * f),
        (e[4] = m * c - u),
        (e[8] = h * c + x),
        (e[1] = l * d),
        (e[5] = x * c + h),
        (e[9] = u * c - m),
        (e[2] = -c),
        (e[6] = r * l),
        (e[10] = o * l));
    } else if (t.order === "YZX") {
      const h = o * l,
        u = o * c,
        m = r * l,
        x = r * c;
      ((e[0] = l * f),
        (e[4] = x - h * d),
        (e[8] = m * d + u),
        (e[1] = d),
        (e[5] = o * f),
        (e[9] = -r * f),
        (e[2] = -c * f),
        (e[6] = u * d + m),
        (e[10] = h - x * d));
    } else if (t.order === "XZY") {
      const h = o * l,
        u = o * c,
        m = r * l,
        x = r * c;
      ((e[0] = l * f),
        (e[4] = -d),
        (e[8] = c * f),
        (e[1] = h * d + x),
        (e[5] = o * f),
        (e[9] = u * d - m),
        (e[2] = m * d - u),
        (e[6] = r * f),
        (e[10] = x * d + h));
    }
    return ((e[3] = 0), (e[7] = 0), (e[11] = 0), (e[12] = 0), (e[13] = 0), (e[14] = 0), (e[15] = 1), this);
  }
  makeRotationFromQuaternion(t) {
    return this.compose(R7, t, C7);
  }
  lookAt(t, e, s) {
    const i = this.elements;
    return (
      fa.subVectors(t, e),
      fa.lengthSq() === 0 && (fa.z = 1),
      fa.normalize(),
      jr.crossVectors(s, fa),
      jr.lengthSq() === 0 &&
        (Math.abs(s.z) === 1 ? (fa.x += 1e-4) : (fa.z += 1e-4), fa.normalize(), jr.crossVectors(s, fa)),
      jr.normalize(),
      bu.crossVectors(fa, jr),
      (i[0] = jr.x),
      (i[4] = bu.x),
      (i[8] = fa.x),
      (i[1] = jr.y),
      (i[5] = bu.y),
      (i[9] = fa.y),
      (i[2] = jr.z),
      (i[6] = bu.z),
      (i[10] = fa.z),
      this
    );
  }
  multiply(t) {
    return this.multiplyMatrices(this, t);
  }
  premultiply(t) {
    return this.multiplyMatrices(t, this);
  }
  multiplyMatrices(t, e) {
    const s = t.elements,
      i = e.elements,
      a = this.elements,
      o = s[0],
      r = s[4],
      l = s[8],
      c = s[12],
      f = s[1],
      d = s[5],
      h = s[9],
      u = s[13],
      m = s[2],
      x = s[6],
      p = s[10],
      g = s[14],
      y = s[3],
      v = s[7],
      _ = s[11],
      k = s[15],
      M = i[0],
      S = i[4],
      b = i[8],
      w = i[12],
      T = i[1],
      E = i[5],
      A = i[9],
      C = i[13],
      R = i[2],
      I = i[6],
      P = i[10],
      F = i[14],
      L = i[3],
      B = i[7],
      G = i[11],
      q = i[15];
    return (
      (a[0] = o * M + r * T + l * R + c * L),
      (a[4] = o * S + r * E + l * I + c * B),
      (a[8] = o * b + r * A + l * P + c * G),
      (a[12] = o * w + r * C + l * F + c * q),
      (a[1] = f * M + d * T + h * R + u * L),
      (a[5] = f * S + d * E + h * I + u * B),
      (a[9] = f * b + d * A + h * P + u * G),
      (a[13] = f * w + d * C + h * F + u * q),
      (a[2] = m * M + x * T + p * R + g * L),
      (a[6] = m * S + x * E + p * I + g * B),
      (a[10] = m * b + x * A + p * P + g * G),
      (a[14] = m * w + x * C + p * F + g * q),
      (a[3] = y * M + v * T + _ * R + k * L),
      (a[7] = y * S + v * E + _ * I + k * B),
      (a[11] = y * b + v * A + _ * P + k * G),
      (a[15] = y * w + v * C + _ * F + k * q),
      this
    );
  }
  multiplyScalar(t) {
    const e = this.elements;
    return (
      (e[0] *= t),
      (e[4] *= t),
      (e[8] *= t),
      (e[12] *= t),
      (e[1] *= t),
      (e[5] *= t),
      (e[9] *= t),
      (e[13] *= t),
      (e[2] *= t),
      (e[6] *= t),
      (e[10] *= t),
      (e[14] *= t),
      (e[3] *= t),
      (e[7] *= t),
      (e[11] *= t),
      (e[15] *= t),
      this
    );
  }
  determinant() {
    const t = this.elements,
      e = t[0],
      s = t[4],
      i = t[8],
      a = t[12],
      o = t[1],
      r = t[5],
      l = t[9],
      c = t[13],
      f = t[2],
      d = t[6],
      h = t[10],
      u = t[14],
      m = t[3],
      x = t[7],
      p = t[11],
      g = t[15];
    return (
      m * (+a * l * d - i * c * d - a * r * h + s * c * h + i * r * u - s * l * u) +
      x * (+e * l * u - e * c * h + a * o * h - i * o * u + i * c * f - a * l * f) +
      p * (+e * c * d - e * r * u - a * o * d + s * o * u + a * r * f - s * c * f) +
      g * (-i * r * f - e * l * d + e * r * h + i * o * d - s * o * h + s * l * f)
    );
  }
  transpose() {
    const t = this.elements;
    let e;
    return (
      (e = t[1]),
      (t[1] = t[4]),
      (t[4] = e),
      (e = t[2]),
      (t[2] = t[8]),
      (t[8] = e),
      (e = t[6]),
      (t[6] = t[9]),
      (t[9] = e),
      (e = t[3]),
      (t[3] = t[12]),
      (t[12] = e),
      (e = t[7]),
      (t[7] = t[13]),
      (t[13] = e),
      (e = t[11]),
      (t[11] = t[14]),
      (t[14] = e),
      this
    );
  }
  setPosition(t, e, s) {
    const i = this.elements;
    return (
      t.isVector3 ? ((i[12] = t.x), (i[13] = t.y), (i[14] = t.z)) : ((i[12] = t), (i[13] = e), (i[14] = s)),
      this
    );
  }
  invert() {
    const t = this.elements,
      e = t[0],
      s = t[1],
      i = t[2],
      a = t[3],
      o = t[4],
      r = t[5],
      l = t[6],
      c = t[7],
      f = t[8],
      d = t[9],
      h = t[10],
      u = t[11],
      m = t[12],
      x = t[13],
      p = t[14],
      g = t[15],
      y = d * p * c - x * h * c + x * l * u - r * p * u - d * l * g + r * h * g,
      v = m * h * c - f * p * c - m * l * u + o * p * u + f * l * g - o * h * g,
      _ = f * x * c - m * d * c + m * r * u - o * x * u - f * r * g + o * d * g,
      k = m * d * l - f * x * l - m * r * h + o * x * h + f * r * p - o * d * p,
      M = e * y + s * v + i * _ + a * k;
    if (M === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const S = 1 / M;
    return (
      (t[0] = y * S),
      (t[1] = (x * h * a - d * p * a - x * i * u + s * p * u + d * i * g - s * h * g) * S),
      (t[2] = (r * p * a - x * l * a + x * i * c - s * p * c - r * i * g + s * l * g) * S),
      (t[3] = (d * l * a - r * h * a - d * i * c + s * h * c + r * i * u - s * l * u) * S),
      (t[4] = v * S),
      (t[5] = (f * p * a - m * h * a + m * i * u - e * p * u - f * i * g + e * h * g) * S),
      (t[6] = (m * l * a - o * p * a - m * i * c + e * p * c + o * i * g - e * l * g) * S),
      (t[7] = (o * h * a - f * l * a + f * i * c - e * h * c - o * i * u + e * l * u) * S),
      (t[8] = _ * S),
      (t[9] = (m * d * a - f * x * a - m * s * u + e * x * u + f * s * g - e * d * g) * S),
      (t[10] = (o * x * a - m * r * a + m * s * c - e * x * c - o * s * g + e * r * g) * S),
      (t[11] = (f * r * a - o * d * a - f * s * c + e * d * c + o * s * u - e * r * u) * S),
      (t[12] = k * S),
      (t[13] = (f * x * i - m * d * i + m * s * h - e * x * h - f * s * p + e * d * p) * S),
      (t[14] = (m * r * i - o * x * i - m * s * l + e * x * l + o * s * p - e * r * p) * S),
      (t[15] = (o * d * i - f * r * i + f * s * l - e * d * l - o * s * h + e * r * h) * S),
      this
    );
  }
  scale(t) {
    const e = this.elements,
      s = t.x,
      i = t.y,
      a = t.z;
    return (
      (e[0] *= s),
      (e[4] *= i),
      (e[8] *= a),
      (e[1] *= s),
      (e[5] *= i),
      (e[9] *= a),
      (e[2] *= s),
      (e[6] *= i),
      (e[10] *= a),
      (e[3] *= s),
      (e[7] *= i),
      (e[11] *= a),
      this
    );
  }
  getMaxScaleOnAxis() {
    const t = this.elements,
      e = t[0] * t[0] + t[1] * t[1] + t[2] * t[2],
      s = t[4] * t[4] + t[5] * t[5] + t[6] * t[6],
      i = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
    return Math.sqrt(Math.max(e, s, i));
  }
  makeTranslation(t, e, s) {
    return (
      t.isVector3
        ? this.set(1, 0, 0, t.x, 0, 1, 0, t.y, 0, 0, 1, t.z, 0, 0, 0, 1)
        : this.set(1, 0, 0, t, 0, 1, 0, e, 0, 0, 1, s, 0, 0, 0, 1),
      this
    );
  }
  makeRotationX(t) {
    const e = Math.cos(t),
      s = Math.sin(t);
    return (this.set(1, 0, 0, 0, 0, e, -s, 0, 0, s, e, 0, 0, 0, 0, 1), this);
  }
  makeRotationY(t) {
    const e = Math.cos(t),
      s = Math.sin(t);
    return (this.set(e, 0, s, 0, 0, 1, 0, 0, -s, 0, e, 0, 0, 0, 0, 1), this);
  }
  makeRotationZ(t) {
    const e = Math.cos(t),
      s = Math.sin(t);
    return (this.set(e, -s, 0, 0, s, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this);
  }
  makeRotationAxis(t, e) {
    const s = Math.cos(e),
      i = Math.sin(e),
      a = 1 - s,
      o = t.x,
      r = t.y,
      l = t.z,
      c = a * o,
      f = a * r;
    return (
      this.set(
        c * o + s,
        c * r - i * l,
        c * l + i * r,
        0,
        c * r + i * l,
        f * r + s,
        f * l - i * o,
        0,
        c * l - i * r,
        f * l + i * o,
        a * l * l + s,
        0,
        0,
        0,
        0,
        1,
      ),
      this
    );
  }
  makeScale(t, e, s) {
    return (this.set(t, 0, 0, 0, 0, e, 0, 0, 0, 0, s, 0, 0, 0, 0, 1), this);
  }
  makeShear(t, e, s, i, a, o) {
    return (this.set(1, s, a, 0, t, 1, o, 0, e, i, 1, 0, 0, 0, 0, 1), this);
  }
  compose(t, e, s) {
    const i = this.elements,
      a = e._x,
      o = e._y,
      r = e._z,
      l = e._w,
      c = a + a,
      f = o + o,
      d = r + r,
      h = a * c,
      u = a * f,
      m = a * d,
      x = o * f,
      p = o * d,
      g = r * d,
      y = l * c,
      v = l * f,
      _ = l * d,
      k = s.x,
      M = s.y,
      S = s.z;
    return (
      (i[0] = (1 - (x + g)) * k),
      (i[1] = (u + _) * k),
      (i[2] = (m - v) * k),
      (i[3] = 0),
      (i[4] = (u - _) * M),
      (i[5] = (1 - (h + g)) * M),
      (i[6] = (p + y) * M),
      (i[7] = 0),
      (i[8] = (m + v) * S),
      (i[9] = (p - y) * S),
      (i[10] = (1 - (h + x)) * S),
      (i[11] = 0),
      (i[12] = t.x),
      (i[13] = t.y),
      (i[14] = t.z),
      (i[15] = 1),
      this
    );
  }
  decompose(t, e, s) {
    const i = this.elements;
    let a = oc.set(i[0], i[1], i[2]).length();
    const o = oc.set(i[4], i[5], i[6]).length(),
      r = oc.set(i[8], i[9], i[10]).length();
    (this.determinant() < 0 && (a = -a), (t.x = i[12]), (t.y = i[13]), (t.z = i[14]), Xa.copy(this));
    const c = 1 / a,
      f = 1 / o,
      d = 1 / r;
    return (
      (Xa.elements[0] *= c),
      (Xa.elements[1] *= c),
      (Xa.elements[2] *= c),
      (Xa.elements[4] *= f),
      (Xa.elements[5] *= f),
      (Xa.elements[6] *= f),
      (Xa.elements[8] *= d),
      (Xa.elements[9] *= d),
      (Xa.elements[10] *= d),
      e.setFromRotationMatrix(Xa),
      (s.x = a),
      (s.y = o),
      (s.z = r),
      this
    );
  }
  makePerspective(t, e, s, i, a, o, r = Uo, l = !1) {
    const c = this.elements,
      f = (2 * a) / (e - t),
      d = (2 * a) / (s - i),
      h = (e + t) / (e - t),
      u = (s + i) / (s - i);
    let m, x;
    if (l) ((m = a / (o - a)), (x = (o * a) / (o - a)));
    else if (r === Uo) ((m = -(o + a) / (o - a)), (x = (-2 * o * a) / (o - a)));
    else if (r === z1) ((m = -o / (o - a)), (x = (-o * a) / (o - a)));
    else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + r);
    return (
      (c[0] = f),
      (c[4] = 0),
      (c[8] = h),
      (c[12] = 0),
      (c[1] = 0),
      (c[5] = d),
      (c[9] = u),
      (c[13] = 0),
      (c[2] = 0),
      (c[6] = 0),
      (c[10] = m),
      (c[14] = x),
      (c[3] = 0),
      (c[7] = 0),
      (c[11] = -1),
      (c[15] = 0),
      this
    );
  }
  makeOrthographic(t, e, s, i, a, o, r = Uo, l = !1) {
    const c = this.elements,
      f = 2 / (e - t),
      d = 2 / (s - i),
      h = -(e + t) / (e - t),
      u = -(s + i) / (s - i);
    let m, x;
    if (l) ((m = 1 / (o - a)), (x = o / (o - a)));
    else if (r === Uo) ((m = -2 / (o - a)), (x = -(o + a) / (o - a)));
    else if (r === z1) ((m = -1 / (o - a)), (x = -a / (o - a)));
    else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + r);
    return (
      (c[0] = f),
      (c[4] = 0),
      (c[8] = 0),
      (c[12] = h),
      (c[1] = 0),
      (c[5] = d),
      (c[9] = 0),
      (c[13] = u),
      (c[2] = 0),
      (c[6] = 0),
      (c[10] = m),
      (c[14] = x),
      (c[3] = 0),
      (c[7] = 0),
      (c[11] = 0),
      (c[15] = 1),
      this
    );
  }
  equals(t) {
    const e = this.elements,
      s = t.elements;
    for (let i = 0; i < 16; i++) if (e[i] !== s[i]) return !1;
    return !0;
  }
  fromArray(t, e = 0) {
    for (let s = 0; s < 16; s++) this.elements[s] = t[s + e];
    return this;
  }
  toArray(t = [], e = 0) {
    const s = this.elements;
    return (
      (t[e] = s[0]),
      (t[e + 1] = s[1]),
      (t[e + 2] = s[2]),
      (t[e + 3] = s[3]),
      (t[e + 4] = s[4]),
      (t[e + 5] = s[5]),
      (t[e + 6] = s[6]),
      (t[e + 7] = s[7]),
      (t[e + 8] = s[8]),
      (t[e + 9] = s[9]),
      (t[e + 10] = s[10]),
      (t[e + 11] = s[11]),
      (t[e + 12] = s[12]),
      (t[e + 13] = s[13]),
      (t[e + 14] = s[14]),
      (t[e + 15] = s[15]),
      t
    );
  }
}

const oc = new dt(),
  Xa = new Ke(),
  R7 = new dt(0, 0, 0),
  C7 = new dt(1, 1, 1),
  jr = new dt(),
  bu = new dt(),
  fa = new dt(),
  lv = new Ke(),
  cv = new Ri();

class sa {
  constructor(t = 0, e = 0, s = 0, i = sa.DEFAULT_ORDER) {
    ((this.isEuler = !0), (this._x = t), (this._y = e), (this._z = s), (this._order = i));
  }
  get x() {
    return this._x;
  }
  set x(t) {
    ((this._x = t), this._onChangeCallback());
  }
  get y() {
    return this._y;
  }
  set y(t) {
    ((this._y = t), this._onChangeCallback());
  }
  get z() {
    return this._z;
  }
  set z(t) {
    ((this._z = t), this._onChangeCallback());
  }
  get order() {
    return this._order;
  }
  set order(t) {
    ((this._order = t), this._onChangeCallback());
  }
  set(t, e, s, i = this._order) {
    return ((this._x = t), (this._y = e), (this._z = s), (this._order = i), this._onChangeCallback(), this);
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(t) {
    return (
      (this._x = t._x),
      (this._y = t._y),
      (this._z = t._z),
      (this._order = t._order),
      this._onChangeCallback(),
      this
    );
  }
  setFromRotationMatrix(t, e = this._order, s = !0) {
    const i = t.elements,
      a = i[0],
      o = i[4],
      r = i[8],
      l = i[1],
      c = i[5],
      f = i[9],
      d = i[2],
      h = i[6],
      u = i[10];
    switch (e) {
      case "XYZ":
        ((this._y = Math.asin(vn(r, -1, 1))),
          Math.abs(r) < 0.9999999
            ? ((this._x = Math.atan2(-f, u)), (this._z = Math.atan2(-o, a)))
            : ((this._x = Math.atan2(h, c)), (this._z = 0)));
        break;
      case "YXZ":
        ((this._x = Math.asin(-vn(f, -1, 1))),
          Math.abs(f) < 0.9999999
            ? ((this._y = Math.atan2(r, u)), (this._z = Math.atan2(l, c)))
            : ((this._y = Math.atan2(-d, a)), (this._z = 0)));
        break;
      case "ZXY":
        ((this._x = Math.asin(vn(h, -1, 1))),
          Math.abs(h) < 0.9999999
            ? ((this._y = Math.atan2(-d, u)), (this._z = Math.atan2(-o, c)))
            : ((this._y = 0), (this._z = Math.atan2(l, a))));
        break;
      case "ZYX":
        ((this._y = Math.asin(-vn(d, -1, 1))),
          Math.abs(d) < 0.9999999
            ? ((this._x = Math.atan2(h, u)), (this._z = Math.atan2(l, a)))
            : ((this._x = 0), (this._z = Math.atan2(-o, c))));
        break;
      case "YZX":
        ((this._z = Math.asin(vn(l, -1, 1))),
          Math.abs(l) < 0.9999999
            ? ((this._x = Math.atan2(-f, c)), (this._y = Math.atan2(-d, a)))
            : ((this._x = 0), (this._y = Math.atan2(r, u))));
        break;
      case "XZY":
        ((this._z = Math.asin(-vn(o, -1, 1))),
          Math.abs(o) < 0.9999999
            ? ((this._x = Math.atan2(h, c)), (this._y = Math.atan2(r, a)))
            : ((this._x = Math.atan2(-f, u)), (this._y = 0)));
        break;
      default:
        console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + e);
    }
    return ((this._order = e), s === !0 && this._onChangeCallback(), this);
  }
  setFromQuaternion(t, e, s) {
    return (lv.makeRotationFromQuaternion(t), this.setFromRotationMatrix(lv, e, s));
  }
  setFromVector3(t, e = this._order) {
    return this.set(t.x, t.y, t.z, e);
  }
  reorder(t) {
    return (cv.setFromEuler(this), this.setFromQuaternion(cv, t));
  }
  equals(t) {
    return t._x === this._x && t._y === this._y && t._z === this._z && t._order === this._order;
  }
  fromArray(t) {
    return (
      (this._x = t[0]),
      (this._y = t[1]),
      (this._z = t[2]),
      t[3] !== void 0 && (this._order = t[3]),
      this._onChangeCallback(),
      this
    );
  }
  toArray(t = [], e = 0) {
    return ((t[e] = this._x), (t[e + 1] = this._y), (t[e + 2] = this._z), (t[e + 3] = this._order), t);
  }
  _onChange(t) {
    return ((this._onChangeCallback = t), this);
  }
  _onChangeCallback() {}
  *[Symbol.iterator]() {
    (yield this._x, yield this._y, yield this._z, yield this._order);
  }
}

sa.DEFAULT_ORDER = "XYZ";

class gM {
  constructor() {
    this.mask = 1;
  }
  set(t) {
    this.mask = ((1 << t) | 0) >>> 0;
  }
  enable(t) {
    this.mask |= (1 << t) | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(t) {
    this.mask ^= (1 << t) | 0;
  }
  disable(t) {
    this.mask &= ~((1 << t) | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(t) {
    return (this.mask & t.mask) !== 0;
  }
  isEnabled(t) {
    return (this.mask & ((1 << t) | 0)) !== 0;
  }
}

let L7 = 0;

const fv = new dt(),
  rc = new Ri(),
  ar = new Ke(),
  _u = new dt(),
  Jf = new dt(),
  I7 = new dt(),
  P7 = new Ri(),
  dv = new dt(1, 0, 0),
  hv = new dt(0, 1, 0),
  uv = new dt(0, 0, 1),
  pv = { type: "added" },
  D7 = { type: "removed" },
  lc = { type: "childadded", child: null },
  yg = { type: "childremoved", child: null };

class Ws extends Af {
  constructor() {
    (super(),
      (this.isObject3D = !0),
      Object.defineProperty(this, "id", { value: L7++ }),
      (this.uuid = C0()),
      (this.name = ""),
      (this.type = "Object3D"),
      (this.parent = null),
      (this.children = []),
      (this.up = Ws.DEFAULT_UP.clone()));
    const t = new dt(),
      e = new sa(),
      s = new Ri(),
      i = new dt(1, 1, 1);
    function a() {
      s.setFromEuler(e, !1);
    }
    function o() {
      e.setFromQuaternion(s, void 0, !1);
    }
    (e._onChange(a),
      s._onChange(o),
      Object.defineProperties(this, {
        position: { configurable: !0, enumerable: !0, value: t },
        rotation: { configurable: !0, enumerable: !0, value: e },
        quaternion: { configurable: !0, enumerable: !0, value: s },
        scale: { configurable: !0, enumerable: !0, value: i },
        modelViewMatrix: { value: new Ke() },
        normalMatrix: { value: new Je() },
      }),
      (this.matrix = new Ke()),
      (this.matrixWorld = new Ke()),
      (this.matrixAutoUpdate = Ws.DEFAULT_MATRIX_AUTO_UPDATE),
      (this.matrixWorldAutoUpdate = Ws.DEFAULT_MATRIX_WORLD_AUTO_UPDATE),
      (this.matrixWorldNeedsUpdate = !1),
      (this.layers = new gM()),
      (this.visible = !0),
      (this.castShadow = !1),
      (this.receiveShadow = !1),
      (this.frustumCulled = !0),
      (this.renderOrder = 0),
      (this.animations = []),
      (this.customDepthMaterial = void 0),
      (this.customDistanceMaterial = void 0),
      (this.userData = {}));
  }
  onBeforeShadow() {}
  onAfterShadow() {}
  onBeforeRender() {}
  onAfterRender() {}
  applyMatrix4(t) {
    (this.matrixAutoUpdate && this.updateMatrix(),
      this.matrix.premultiply(t),
      this.matrix.decompose(this.position, this.quaternion, this.scale));
  }
  applyQuaternion(t) {
    return (this.quaternion.premultiply(t), this);
  }
  setRotationFromAxisAngle(t, e) {
    this.quaternion.setFromAxisAngle(t, e);
  }
  setRotationFromEuler(t) {
    this.quaternion.setFromEuler(t, !0);
  }
  setRotationFromMatrix(t) {
    this.quaternion.setFromRotationMatrix(t);
  }
  setRotationFromQuaternion(t) {
    this.quaternion.copy(t);
  }
  rotateOnAxis(t, e) {
    return (rc.setFromAxisAngle(t, e), this.quaternion.multiply(rc), this);
  }
  rotateOnWorldAxis(t, e) {
    return (rc.setFromAxisAngle(t, e), this.quaternion.premultiply(rc), this);
  }
  rotateX(t) {
    return this.rotateOnAxis(dv, t);
  }
  rotateY(t) {
    return this.rotateOnAxis(hv, t);
  }
  rotateZ(t) {
    return this.rotateOnAxis(uv, t);
  }
  translateOnAxis(t, e) {
    return (fv.copy(t).applyQuaternion(this.quaternion), this.position.add(fv.multiplyScalar(e)), this);
  }
  translateX(t) {
    return this.translateOnAxis(dv, t);
  }
  translateY(t) {
    return this.translateOnAxis(hv, t);
  }
  translateZ(t) {
    return this.translateOnAxis(uv, t);
  }
  localToWorld(t) {
    return (this.updateWorldMatrix(!0, !1), t.applyMatrix4(this.matrixWorld));
  }
  worldToLocal(t) {
    return (this.updateWorldMatrix(!0, !1), t.applyMatrix4(ar.copy(this.matrixWorld).invert()));
  }
  lookAt(t, e, s) {
    t.isVector3 ? _u.copy(t) : _u.set(t, e, s);
    const i = this.parent;
    (this.updateWorldMatrix(!0, !1),
      Jf.setFromMatrixPosition(this.matrixWorld),
      this.isCamera || this.isLight ? ar.lookAt(Jf, _u, this.up) : ar.lookAt(_u, Jf, this.up),
      this.quaternion.setFromRotationMatrix(ar),
      i &&
        (ar.extractRotation(i.matrixWorld),
        rc.setFromRotationMatrix(ar),
        this.quaternion.premultiply(rc.invert())));
  }
  add(t) {
    if (arguments.length > 1) {
      for (let e = 0; e < arguments.length; e++) this.add(arguments[e]);
      return this;
    }
    return t === this
      ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", t), this)
      : (t && t.isObject3D
          ? (t.removeFromParent(),
            (t.parent = this),
            this.children.push(t),
            t.dispatchEvent(pv),
            (lc.child = t),
            this.dispatchEvent(lc),
            (lc.child = null))
          : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", t),
        this);
  }
  remove(t) {
    if (arguments.length > 1) {
      for (let s = 0; s < arguments.length; s++) this.remove(arguments[s]);
      return this;
    }
    const e = this.children.indexOf(t);
    return (
      e !== -1 &&
        ((t.parent = null),
        this.children.splice(e, 1),
        t.dispatchEvent(D7),
        (yg.child = t),
        this.dispatchEvent(yg),
        (yg.child = null)),
      this
    );
  }
  removeFromParent() {
    const t = this.parent;
    return (t !== null && t.remove(this), this);
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(t) {
    return (
      this.updateWorldMatrix(!0, !1),
      ar.copy(this.matrixWorld).invert(),
      t.parent !== null && (t.parent.updateWorldMatrix(!0, !1), ar.multiply(t.parent.matrixWorld)),
      t.applyMatrix4(ar),
      t.removeFromParent(),
      (t.parent = this),
      this.children.push(t),
      t.updateWorldMatrix(!1, !0),
      t.dispatchEvent(pv),
      (lc.child = t),
      this.dispatchEvent(lc),
      (lc.child = null),
      this
    );
  }
  getObjectById(t) {
    return this.getObjectByProperty("id", t);
  }
  getObjectByName(t) {
    return this.getObjectByProperty("name", t);
  }
  getObjectByProperty(t, e) {
    if (this[t] === e) return this;
    for (let s = 0, i = this.children.length; s < i; s++) {
      const o = this.children[s].getObjectByProperty(t, e);
      if (o !== void 0) return o;
    }
  }
  getObjectsByProperty(t, e, s = []) {
    this[t] === e && s.push(this);
    const i = this.children;
    for (let a = 0, o = i.length; a < o; a++) i[a].getObjectsByProperty(t, e, s);
    return s;
  }
  getWorldPosition(t) {
    return (this.updateWorldMatrix(!0, !1), t.setFromMatrixPosition(this.matrixWorld));
  }
  getWorldQuaternion(t) {
    return (this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Jf, t, I7), t);
  }
  getWorldScale(t) {
    return (this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Jf, P7, t), t);
  }
  getWorldDirection(t) {
    this.updateWorldMatrix(!0, !1);
    const e = this.matrixWorld.elements;
    return t.set(e[8], e[9], e[10]).normalize();
  }
  raycast() {}
  traverse(t) {
    t(this);
    const e = this.children;
    for (let s = 0, i = e.length; s < i; s++) e[s].traverse(t);
  }
  traverseVisible(t) {
    if (this.visible === !1) return;
    t(this);
    const e = this.children;
    for (let s = 0, i = e.length; s < i; s++) e[s].traverseVisible(t);
  }
  traverseAncestors(t) {
    const e = this.parent;
    e !== null && (t(e), e.traverseAncestors(t));
  }
  updateMatrix() {
    (this.matrix.compose(this.position, this.quaternion, this.scale), (this.matrixWorldNeedsUpdate = !0));
  }
  updateMatrixWorld(t) {
    (this.matrixAutoUpdate && this.updateMatrix(),
      (this.matrixWorldNeedsUpdate || t) &&
        (this.matrixWorldAutoUpdate === !0 &&
          (this.parent === null
            ? this.matrixWorld.copy(this.matrix)
            : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)),
        (this.matrixWorldNeedsUpdate = !1),
        (t = !0)));
    const e = this.children;
    for (let s = 0, i = e.length; s < i; s++) e[s].updateMatrixWorld(t);
  }
  updateWorldMatrix(t, e) {
    const s = this.parent;
    if (
      (t === !0 && s !== null && s.updateWorldMatrix(!0, !1),
      this.matrixAutoUpdate && this.updateMatrix(),
      this.matrixWorldAutoUpdate === !0 &&
        (this.parent === null
          ? this.matrixWorld.copy(this.matrix)
          : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)),
      e === !0)
    ) {
      const i = this.children;
      for (let a = 0, o = i.length; a < o; a++) i[a].updateWorldMatrix(!1, !0);
    }
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == "string",
      s = {};
    e &&
      ((t = {
        geometries: {},
        materials: {},
        textures: {},
        images: {},
        shapes: {},
        skeletons: {},
        animations: {},
        nodes: {},
      }),
      (s.metadata = { version: 4.7, type: "Object", generator: "Object3D.toJSON" }));
    const i = {};
    ((i.uuid = this.uuid),
      (i.type = this.type),
      this.name !== "" && (i.name = this.name),
      this.castShadow === !0 && (i.castShadow = !0),
      this.receiveShadow === !0 && (i.receiveShadow = !0),
      this.visible === !1 && (i.visible = !1),
      this.frustumCulled === !1 && (i.frustumCulled = !1),
      this.renderOrder !== 0 && (i.renderOrder = this.renderOrder),
      Object.keys(this.userData).length > 0 && (i.userData = this.userData),
      (i.layers = this.layers.mask),
      (i.matrix = this.matrix.toArray()),
      (i.up = this.up.toArray()),
      this.matrixAutoUpdate === !1 && (i.matrixAutoUpdate = !1),
      this.isInstancedMesh &&
        ((i.type = "InstancedMesh"),
        (i.count = this.count),
        (i.instanceMatrix = this.instanceMatrix.toJSON()),
        this.instanceColor !== null && (i.instanceColor = this.instanceColor.toJSON())),
      this.isBatchedMesh &&
        ((i.type = "BatchedMesh"),
        (i.perObjectFrustumCulled = this.perObjectFrustumCulled),
        (i.sortObjects = this.sortObjects),
        (i.drawRanges = this._drawRanges),
        (i.reservedRanges = this._reservedRanges),
        (i.geometryInfo = this._geometryInfo.map((r) => ({
          ...r,
          boundingBox: r.boundingBox ? r.boundingBox.toJSON() : void 0,
          boundingSphere: r.boundingSphere ? r.boundingSphere.toJSON() : void 0,
        }))),
        (i.instanceInfo = this._instanceInfo.map((r) => ({ ...r }))),
        (i.availableInstanceIds = this._availableInstanceIds.slice()),
        (i.availableGeometryIds = this._availableGeometryIds.slice()),
        (i.nextIndexStart = this._nextIndexStart),
        (i.nextVertexStart = this._nextVertexStart),
        (i.geometryCount = this._geometryCount),
        (i.maxInstanceCount = this._maxInstanceCount),
        (i.maxVertexCount = this._maxVertexCount),
        (i.maxIndexCount = this._maxIndexCount),
        (i.geometryInitialized = this._geometryInitialized),
        (i.matricesTexture = this._matricesTexture.toJSON(t)),
        (i.indirectTexture = this._indirectTexture.toJSON(t)),
        this._colorsTexture !== null && (i.colorsTexture = this._colorsTexture.toJSON(t)),
        this.boundingSphere !== null && (i.boundingSphere = this.boundingSphere.toJSON()),
        this.boundingBox !== null && (i.boundingBox = this.boundingBox.toJSON())));
    function a(r, l) {
      return (r[l.uuid] === void 0 && (r[l.uuid] = l.toJSON(t)), l.uuid);
    }
    if (this.isScene)
      (this.background &&
        (this.background.isColor
          ? (i.background = this.background.toJSON())
          : this.background.isTexture && (i.background = this.background.toJSON(t).uuid)),
        this.environment &&
          this.environment.isTexture &&
          this.environment.isRenderTargetTexture !== !0 &&
          (i.environment = this.environment.toJSON(t).uuid));
    else if (this.isMesh || this.isLine || this.isPoints) {
      i.geometry = a(t.geometries, this.geometry);
      const r = this.geometry.parameters;
      if (r !== void 0 && r.shapes !== void 0) {
        const l = r.shapes;
        if (Array.isArray(l))
          for (let c = 0, f = l.length; c < f; c++) {
            const d = l[c];
            a(t.shapes, d);
          }
        else a(t.shapes, l);
      }
    }
    if (
      (this.isSkinnedMesh &&
        ((i.bindMode = this.bindMode),
        (i.bindMatrix = this.bindMatrix.toArray()),
        this.skeleton !== void 0 && (a(t.skeletons, this.skeleton), (i.skeleton = this.skeleton.uuid))),
      this.material !== void 0)
    )
      if (Array.isArray(this.material)) {
        const r = [];
        for (let l = 0, c = this.material.length; l < c; l++) r.push(a(t.materials, this.material[l]));
        i.material = r;
      } else i.material = a(t.materials, this.material);
    if (this.children.length > 0) {
      i.children = [];
      for (let r = 0; r < this.children.length; r++) i.children.push(this.children[r].toJSON(t).object);
    }
    if (this.animations.length > 0) {
      i.animations = [];
      for (let r = 0; r < this.animations.length; r++) {
        const l = this.animations[r];
        i.animations.push(a(t.animations, l));
      }
    }
    if (e) {
      const r = o(t.geometries),
        l = o(t.materials),
        c = o(t.textures),
        f = o(t.images),
        d = o(t.shapes),
        h = o(t.skeletons),
        u = o(t.animations),
        m = o(t.nodes);
      (r.length > 0 && (s.geometries = r),
        l.length > 0 && (s.materials = l),
        c.length > 0 && (s.textures = c),
        f.length > 0 && (s.images = f),
        d.length > 0 && (s.shapes = d),
        h.length > 0 && (s.skeletons = h),
        u.length > 0 && (s.animations = u),
        m.length > 0 && (s.nodes = m));
    }
    return ((s.object = i), s);
    function o(r) {
      const l = [];
      for (const c in r) {
        const f = r[c];
        (delete f.metadata, l.push(f));
      }
      return l;
    }
  }
  clone(t) {
    return new this.constructor().copy(this, t);
  }
  copy(t, e = !0) {
    if (
      ((this.name = t.name),
      this.up.copy(t.up),
      this.position.copy(t.position),
      (this.rotation.order = t.rotation.order),
      this.quaternion.copy(t.quaternion),
      this.scale.copy(t.scale),
      this.matrix.copy(t.matrix),
      this.matrixWorld.copy(t.matrixWorld),
      (this.matrixAutoUpdate = t.matrixAutoUpdate),
      (this.matrixWorldAutoUpdate = t.matrixWorldAutoUpdate),
      (this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate),
      (this.layers.mask = t.layers.mask),
      (this.visible = t.visible),
      (this.castShadow = t.castShadow),
      (this.receiveShadow = t.receiveShadow),
      (this.frustumCulled = t.frustumCulled),
      (this.renderOrder = t.renderOrder),
      (this.animations = t.animations.slice()),
      (this.userData = JSON.parse(JSON.stringify(t.userData))),
      e === !0)
    )
      for (let s = 0; s < t.children.length; s++) {
        const i = t.children[s];
        this.add(i.clone());
      }
    return this;
  }
}

Ws.DEFAULT_UP = new dt(0, 1, 0);

Ws.DEFAULT_MATRIX_AUTO_UPDATE = !0;

Ws.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;

const Ya = new dt(),
  or = new dt(),
  vg = new dt(),
  rr = new dt(),
  cc = new dt(),
  fc = new dt(),
  mv = new dt(),
  bg = new dt(),
  _g = new dt(),
  wg = new dt(),
  Mg = new kn(),
  kg = new kn(),
  Sg = new kn();

class oo {
  constructor(t = new dt(), e = new dt(), s = new dt()) {
    ((this.a = t), (this.b = e), (this.c = s));
  }
  static getNormal(t, e, s, i) {
    (i.subVectors(s, e), Ya.subVectors(t, e), i.cross(Ya));
    const a = i.lengthSq();
    return a > 0 ? i.multiplyScalar(1 / Math.sqrt(a)) : i.set(0, 0, 0);
  }
  static getBarycoord(t, e, s, i, a) {
    (Ya.subVectors(i, e), or.subVectors(s, e), vg.subVectors(t, e));
    const o = Ya.dot(Ya),
      r = Ya.dot(or),
      l = Ya.dot(vg),
      c = or.dot(or),
      f = or.dot(vg),
      d = o * c - r * r;
    if (d === 0) return (a.set(0, 0, 0), null);
    const h = 1 / d,
      u = (c * l - r * f) * h,
      m = (o * f - r * l) * h;
    return a.set(1 - u - m, m, u);
  }
  static containsPoint(t, e, s, i) {
    return this.getBarycoord(t, e, s, i, rr) === null ? !1 : rr.x >= 0 && rr.y >= 0 && rr.x + rr.y <= 1;
  }
  static getInterpolation(t, e, s, i, a, o, r, l) {
    return this.getBarycoord(t, e, s, i, rr) === null
      ? ((l.x = 0), (l.y = 0), "z" in l && (l.z = 0), "w" in l && (l.w = 0), null)
      : (l.setScalar(0),
        l.addScaledVector(a, rr.x),
        l.addScaledVector(o, rr.y),
        l.addScaledVector(r, rr.z),
        l);
  }
  static getInterpolatedAttribute(t, e, s, i, a, o) {
    return (
      Mg.setScalar(0),
      kg.setScalar(0),
      Sg.setScalar(0),
      Mg.fromBufferAttribute(t, e),
      kg.fromBufferAttribute(t, s),
      Sg.fromBufferAttribute(t, i),
      o.setScalar(0),
      o.addScaledVector(Mg, a.x),
      o.addScaledVector(kg, a.y),
      o.addScaledVector(Sg, a.z),
      o
    );
  }
  static isFrontFacing(t, e, s, i) {
    return (Ya.subVectors(s, e), or.subVectors(t, e), Ya.cross(or).dot(i) < 0);
  }
  set(t, e, s) {
    return (this.a.copy(t), this.b.copy(e), this.c.copy(s), this);
  }
  setFromPointsAndIndices(t, e, s, i) {
    return (this.a.copy(t[e]), this.b.copy(t[s]), this.c.copy(t[i]), this);
  }
  setFromAttributeAndIndices(t, e, s, i) {
    return (
      this.a.fromBufferAttribute(t, e),
      this.b.fromBufferAttribute(t, s),
      this.c.fromBufferAttribute(t, i),
      this
    );
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return (this.a.copy(t.a), this.b.copy(t.b), this.c.copy(t.c), this);
  }
  getArea() {
    return (Ya.subVectors(this.c, this.b), or.subVectors(this.a, this.b), Ya.cross(or).length() * 0.5);
  }
  getMidpoint(t) {
    return t
      .addVectors(this.a, this.b)
      .add(this.c)
      .multiplyScalar(1 / 3);
  }
  getNormal(t) {
    return oo.getNormal(this.a, this.b, this.c, t);
  }
  getPlane(t) {
    return t.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(t, e) {
    return oo.getBarycoord(t, this.a, this.b, this.c, e);
  }
  getInterpolation(t, e, s, i, a) {
    return oo.getInterpolation(t, this.a, this.b, this.c, e, s, i, a);
  }
  containsPoint(t) {
    return oo.containsPoint(t, this.a, this.b, this.c);
  }
  isFrontFacing(t) {
    return oo.isFrontFacing(this.a, this.b, this.c, t);
  }
  intersectsBox(t) {
    return t.intersectsTriangle(this);
  }
  closestPointToPoint(t, e) {
    const s = this.a,
      i = this.b,
      a = this.c;
    let o, r;
    (cc.subVectors(i, s), fc.subVectors(a, s), bg.subVectors(t, s));
    const l = cc.dot(bg),
      c = fc.dot(bg);
    if (l <= 0 && c <= 0) return e.copy(s);
    _g.subVectors(t, i);
    const f = cc.dot(_g),
      d = fc.dot(_g);
    if (f >= 0 && d <= f) return e.copy(i);
    const h = l * d - f * c;
    if (h <= 0 && l >= 0 && f <= 0) return ((o = l / (l - f)), e.copy(s).addScaledVector(cc, o));
    wg.subVectors(t, a);
    const u = cc.dot(wg),
      m = fc.dot(wg);
    if (m >= 0 && u <= m) return e.copy(a);
    const x = u * c - l * m;
    if (x <= 0 && c >= 0 && m <= 0) return ((r = c / (c - m)), e.copy(s).addScaledVector(fc, r));
    const p = f * m - u * d;
    if (p <= 0 && d - f >= 0 && u - m >= 0)
      return (mv.subVectors(a, i), (r = (d - f) / (d - f + (u - m))), e.copy(i).addScaledVector(mv, r));
    const g = 1 / (p + x + h);
    return ((o = x * g), (r = h * g), e.copy(s).addScaledVector(cc, o).addScaledVector(fc, r));
  }
  equals(t) {
    return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c);
  }
}

const xM = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074,
  },
  qr = { h: 0, s: 0, l: 0 },
  wu = { h: 0, s: 0, l: 0 };

function Tg(n, t, e) {
  return (
    e < 0 && (e += 1),
    e > 1 && (e -= 1),
    e < 1 / 6 ? n + (t - n) * 6 * e : e < 1 / 2 ? t : e < 2 / 3 ? n + (t - n) * 6 * (2 / 3 - e) : n
  );
}

class Ut {
  constructor(t, e, s) {
    return ((this.isColor = !0), (this.r = 1), (this.g = 1), (this.b = 1), this.set(t, e, s));
  }
  set(t, e, s) {
    if (e === void 0 && s === void 0) {
      const i = t;
      i && i.isColor
        ? this.copy(i)
        : typeof i == "number"
          ? this.setHex(i)
          : typeof i == "string" && this.setStyle(i);
    } else this.setRGB(t, e, s);
    return this;
  }
  setScalar(t) {
    return ((this.r = t), (this.g = t), (this.b = t), this);
  }
  setHex(t, e = ri) {
    return (
      (t = Math.floor(t)),
      (this.r = ((t >> 16) & 255) / 255),
      (this.g = ((t >> 8) & 255) / 255),
      (this.b = (t & 255) / 255),
      In.colorSpaceToWorking(this, e),
      this
    );
  }
  setRGB(t, e, s, i = In.workingColorSpace) {
    return ((this.r = t), (this.g = e), (this.b = s), In.colorSpaceToWorking(this, i), this);
  }
  setHSL(t, e, s, i = In.workingColorSpace) {
    if (((t = v7(t, 1)), (e = vn(e, 0, 1)), (s = vn(s, 0, 1)), e === 0)) this.r = this.g = this.b = s;
    else {
      const a = s <= 0.5 ? s * (1 + e) : s + e - s * e,
        o = 2 * s - a;
      ((this.r = Tg(o, a, t + 1 / 3)), (this.g = Tg(o, a, t)), (this.b = Tg(o, a, t - 1 / 3)));
    }
    return (In.colorSpaceToWorking(this, i), this);
  }
  setStyle(t, e = ri) {
    function s(a) {
      a !== void 0 &&
        parseFloat(a) < 1 &&
        console.warn("THREE.Color: Alpha component of " + t + " will be ignored.");
    }
    let i;
    if ((i = /^(\w+)\(([^\)]*)\)/.exec(t))) {
      let a;
      const o = i[1],
        r = i[2];
      switch (o) {
        case "rgb":
        case "rgba":
          if ((a = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r)))
            return (
              s(a[4]),
              this.setRGB(
                Math.min(255, parseInt(a[1], 10)) / 255,
                Math.min(255, parseInt(a[2], 10)) / 255,
                Math.min(255, parseInt(a[3], 10)) / 255,
                e,
              )
            );
          if ((a = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r)))
            return (
              s(a[4]),
              this.setRGB(
                Math.min(100, parseInt(a[1], 10)) / 100,
                Math.min(100, parseInt(a[2], 10)) / 100,
                Math.min(100, parseInt(a[3], 10)) / 100,
                e,
              )
            );
          break;
        case "hsl":
        case "hsla":
          if (
            (a = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))
          )
            return (
              s(a[4]),
              this.setHSL(parseFloat(a[1]) / 360, parseFloat(a[2]) / 100, parseFloat(a[3]) / 100, e)
            );
          break;
        default:
          console.warn("THREE.Color: Unknown color model " + t);
      }
    } else if ((i = /^\#([A-Fa-f\d]+)$/.exec(t))) {
      const a = i[1],
        o = a.length;
      if (o === 3)
        return this.setRGB(
          parseInt(a.charAt(0), 16) / 15,
          parseInt(a.charAt(1), 16) / 15,
          parseInt(a.charAt(2), 16) / 15,
          e,
        );
      if (o === 6) return this.setHex(parseInt(a, 16), e);
      console.warn("THREE.Color: Invalid hex color " + t);
    } else if (t && t.length > 0) return this.setColorName(t, e);
    return this;
  }
  setColorName(t, e = ri) {
    const s = xM[t.toLowerCase()];
    return (s !== void 0 ? this.setHex(s, e) : console.warn("THREE.Color: Unknown color " + t), this);
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(t) {
    return ((this.r = t.r), (this.g = t.g), (this.b = t.b), this);
  }
  copySRGBToLinear(t) {
    return ((this.r = Tr(t.r)), (this.g = Tr(t.g)), (this.b = Tr(t.b)), this);
  }
  copyLinearToSRGB(t) {
    return ((this.r = Zc(t.r)), (this.g = Zc(t.g)), (this.b = Zc(t.b)), this);
  }
  convertSRGBToLinear() {
    return (this.copySRGBToLinear(this), this);
  }
  convertLinearToSRGB() {
    return (this.copyLinearToSRGB(this), this);
  }
  getHex(t = ri) {
    return (
      In.workingToColorSpace(ni.copy(this), t),
      Math.round(vn(ni.r * 255, 0, 255)) * 65536 +
        Math.round(vn(ni.g * 255, 0, 255)) * 256 +
        Math.round(vn(ni.b * 255, 0, 255))
    );
  }
  getHexString(t = ri) {
    return ("000000" + this.getHex(t).toString(16)).slice(-6);
  }
  getHSL(t, e = In.workingColorSpace) {
    In.workingToColorSpace(ni.copy(this), e);
    const s = ni.r,
      i = ni.g,
      a = ni.b,
      o = Math.max(s, i, a),
      r = Math.min(s, i, a);
    let l, c;
    const f = (r + o) / 2;
    if (r === o) ((l = 0), (c = 0));
    else {
      const d = o - r;
      switch (((c = f <= 0.5 ? d / (o + r) : d / (2 - o - r)), o)) {
        case s:
          l = (i - a) / d + (i < a ? 6 : 0);
          break;
        case i:
          l = (a - s) / d + 2;
          break;
        case a:
          l = (s - i) / d + 4;
          break;
      }
      l /= 6;
    }
    return ((t.h = l), (t.s = c), (t.l = f), t);
  }
  getRGB(t, e = In.workingColorSpace) {
    return (In.workingToColorSpace(ni.copy(this), e), (t.r = ni.r), (t.g = ni.g), (t.b = ni.b), t);
  }
  getStyle(t = ri) {
    In.workingToColorSpace(ni.copy(this), t);
    const e = ni.r,
      s = ni.g,
      i = ni.b;
    return t !== ri
      ? `color(${t} ${e.toFixed(3)} ${s.toFixed(3)} ${i.toFixed(3)})`
      : `rgb(${Math.round(e * 255)},${Math.round(s * 255)},${Math.round(i * 255)})`;
  }
  offsetHSL(t, e, s) {
    return (this.getHSL(qr), this.setHSL(qr.h + t, qr.s + e, qr.l + s));
  }
  add(t) {
    return ((this.r += t.r), (this.g += t.g), (this.b += t.b), this);
  }
  addColors(t, e) {
    return ((this.r = t.r + e.r), (this.g = t.g + e.g), (this.b = t.b + e.b), this);
  }
  addScalar(t) {
    return ((this.r += t), (this.g += t), (this.b += t), this);
  }
  sub(t) {
    return (
      (this.r = Math.max(0, this.r - t.r)),
      (this.g = Math.max(0, this.g - t.g)),
      (this.b = Math.max(0, this.b - t.b)),
      this
    );
  }
  multiply(t) {
    return ((this.r *= t.r), (this.g *= t.g), (this.b *= t.b), this);
  }
  multiplyScalar(t) {
    return ((this.r *= t), (this.g *= t), (this.b *= t), this);
  }
  lerp(t, e) {
    return (
      (this.r += (t.r - this.r) * e),
      (this.g += (t.g - this.g) * e),
      (this.b += (t.b - this.b) * e),
      this
    );
  }
  lerpColors(t, e, s) {
    return (
      (this.r = t.r + (e.r - t.r) * s),
      (this.g = t.g + (e.g - t.g) * s),
      (this.b = t.b + (e.b - t.b) * s),
      this
    );
  }
  lerpHSL(t, e) {
    (this.getHSL(qr), t.getHSL(wu));
    const s = lg(qr.h, wu.h, e),
      i = lg(qr.s, wu.s, e),
      a = lg(qr.l, wu.l, e);
    return (this.setHSL(s, i, a), this);
  }
  setFromVector3(t) {
    return ((this.r = t.x), (this.g = t.y), (this.b = t.z), this);
  }
  applyMatrix3(t) {
    const e = this.r,
      s = this.g,
      i = this.b,
      a = t.elements;
    return (
      (this.r = a[0] * e + a[3] * s + a[6] * i),
      (this.g = a[1] * e + a[4] * s + a[7] * i),
      (this.b = a[2] * e + a[5] * s + a[8] * i),
      this
    );
  }
  equals(t) {
    return t.r === this.r && t.g === this.g && t.b === this.b;
  }
  fromArray(t, e = 0) {
    return ((this.r = t[e]), (this.g = t[e + 1]), (this.b = t[e + 2]), this);
  }
  toArray(t = [], e = 0) {
    return ((t[e] = this.r), (t[e + 1] = this.g), (t[e + 2] = this.b), t);
  }
  fromBufferAttribute(t, e) {
    return ((this.r = t.getX(e)), (this.g = t.getY(e)), (this.b = t.getZ(e)), this);
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    (yield this.r, yield this.g, yield this.b);
  }
}

const ni = new Ut();

Ut.NAMES = xM;

let z7 = 0;

class Uh extends Af {
  constructor() {
    (super(),
      (this.isMaterial = !0),
      Object.defineProperty(this, "id", { value: z7++ }),
      (this.uuid = C0()),
      (this.name = ""),
      (this.type = "Material"),
      (this.blending = Kc),
      (this.side = Rr),
      (this.vertexColors = !1),
      (this.opacity = 1),
      (this.transparent = !1),
      (this.alphaHash = !1),
      (this.blendSrc = u5),
      (this.blendDst = mo),
      (this.blendEquation = b0),
      (this.blendSrcAlpha = null),
      (this.blendDstAlpha = null),
      (this.blendEquationAlpha = null),
      (this.blendColor = new Ut(0, 0, 0)),
      (this.blendAlpha = 0),
      (this.depthFunc = cf),
      (this.depthTest = !0),
      (this.depthWrite = !0),
      (this.stencilWriteMask = 255),
      (this.stencilFunc = nv),
      (this.stencilRef = 0),
      (this.stencilFuncMask = 255),
      (this.stencilFail = ec),
      (this.stencilZFail = ec),
      (this.stencilZPass = ec),
      (this.stencilWrite = !1),
      (this.clippingPlanes = null),
      (this.clipIntersection = !1),
      (this.clipShadows = !1),
      (this.shadowSide = null),
      (this.colorWrite = !0),
      (this.precision = null),
      (this.polygonOffset = !1),
      (this.polygonOffsetFactor = 0),
      (this.polygonOffsetUnits = 0),
      (this.dithering = !1),
      (this.alphaToCoverage = !1),
      (this.premultipliedAlpha = !1),
      (this.forceSinglePass = !1),
      (this.allowOverride = !0),
      (this.visible = !0),
      (this.toneMapped = !0),
      (this.userData = {}),
      (this.version = 0),
      (this._alphaTest = 0));
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(t) {
    (this._alphaTest > 0 != t > 0 && this.version++, (this._alphaTest = t));
  }
  onBeforeRender() {}
  onBeforeCompile() {}
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(t) {
    if (t !== void 0)
      for (const e in t) {
        const s = t[e];
        if (s === void 0) {
          console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);
          continue;
        }
        const i = this[e];
        if (i === void 0) {
          console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);
          continue;
        }
        i && i.isColor ? i.set(s) : i && i.isVector3 && s && s.isVector3 ? i.copy(s) : (this[e] = s);
      }
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == "string";
    e && (t = { textures: {}, images: {} });
    const s = { metadata: { version: 4.7, type: "Material", generator: "Material.toJSON" } };
    ((s.uuid = this.uuid),
      (s.type = this.type),
      this.name !== "" && (s.name = this.name),
      this.color && this.color.isColor && (s.color = this.color.getHex()),
      this.roughness !== void 0 && (s.roughness = this.roughness),
      this.metalness !== void 0 && (s.metalness = this.metalness),
      this.sheen !== void 0 && (s.sheen = this.sheen),
      this.sheenColor && this.sheenColor.isColor && (s.sheenColor = this.sheenColor.getHex()),
      this.sheenRoughness !== void 0 && (s.sheenRoughness = this.sheenRoughness),
      this.emissive && this.emissive.isColor && (s.emissive = this.emissive.getHex()),
      this.emissiveIntensity !== void 0 &&
        this.emissiveIntensity !== 1 &&
        (s.emissiveIntensity = this.emissiveIntensity),
      this.specular && this.specular.isColor && (s.specular = this.specular.getHex()),
      this.specularIntensity !== void 0 && (s.specularIntensity = this.specularIntensity),
      this.specularColor && this.specularColor.isColor && (s.specularColor = this.specularColor.getHex()),
      this.shininess !== void 0 && (s.shininess = this.shininess),
      this.clearcoat !== void 0 && (s.clearcoat = this.clearcoat),
      this.clearcoatRoughness !== void 0 && (s.clearcoatRoughness = this.clearcoatRoughness),
      this.clearcoatMap && this.clearcoatMap.isTexture && (s.clearcoatMap = this.clearcoatMap.toJSON(t).uuid),
      this.clearcoatRoughnessMap &&
        this.clearcoatRoughnessMap.isTexture &&
        (s.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(t).uuid),
      this.clearcoatNormalMap &&
        this.clearcoatNormalMap.isTexture &&
        ((s.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(t).uuid),
        (s.clearcoatNormalScale = this.clearcoatNormalScale.toArray())),
      this.sheenColorMap &&
        this.sheenColorMap.isTexture &&
        (s.sheenColorMap = this.sheenColorMap.toJSON(t).uuid),
      this.sheenRoughnessMap &&
        this.sheenRoughnessMap.isTexture &&
        (s.sheenRoughnessMap = this.sheenRoughnessMap.toJSON(t).uuid),
      this.dispersion !== void 0 && (s.dispersion = this.dispersion),
      this.iridescence !== void 0 && (s.iridescence = this.iridescence),
      this.iridescenceIOR !== void 0 && (s.iridescenceIOR = this.iridescenceIOR),
      this.iridescenceThicknessRange !== void 0 &&
        (s.iridescenceThicknessRange = this.iridescenceThicknessRange),
      this.iridescenceMap &&
        this.iridescenceMap.isTexture &&
        (s.iridescenceMap = this.iridescenceMap.toJSON(t).uuid),
      this.iridescenceThicknessMap &&
        this.iridescenceThicknessMap.isTexture &&
        (s.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(t).uuid),
      this.anisotropy !== void 0 && (s.anisotropy = this.anisotropy),
      this.anisotropyRotation !== void 0 && (s.anisotropyRotation = this.anisotropyRotation),
      this.anisotropyMap &&
        this.anisotropyMap.isTexture &&
        (s.anisotropyMap = this.anisotropyMap.toJSON(t).uuid),
      this.map && this.map.isTexture && (s.map = this.map.toJSON(t).uuid),
      this.matcap && this.matcap.isTexture && (s.matcap = this.matcap.toJSON(t).uuid),
      this.alphaMap && this.alphaMap.isTexture && (s.alphaMap = this.alphaMap.toJSON(t).uuid),
      this.lightMap &&
        this.lightMap.isTexture &&
        ((s.lightMap = this.lightMap.toJSON(t).uuid), (s.lightMapIntensity = this.lightMapIntensity)),
      this.aoMap &&
        this.aoMap.isTexture &&
        ((s.aoMap = this.aoMap.toJSON(t).uuid), (s.aoMapIntensity = this.aoMapIntensity)),
      this.bumpMap &&
        this.bumpMap.isTexture &&
        ((s.bumpMap = this.bumpMap.toJSON(t).uuid), (s.bumpScale = this.bumpScale)),
      this.normalMap &&
        this.normalMap.isTexture &&
        ((s.normalMap = this.normalMap.toJSON(t).uuid),
        (s.normalMapType = this.normalMapType),
        (s.normalScale = this.normalScale.toArray())),
      this.displacementMap &&
        this.displacementMap.isTexture &&
        ((s.displacementMap = this.displacementMap.toJSON(t).uuid),
        (s.displacementScale = this.displacementScale),
        (s.displacementBias = this.displacementBias)),
      this.roughnessMap && this.roughnessMap.isTexture && (s.roughnessMap = this.roughnessMap.toJSON(t).uuid),
      this.metalnessMap && this.metalnessMap.isTexture && (s.metalnessMap = this.metalnessMap.toJSON(t).uuid),
      this.emissiveMap && this.emissiveMap.isTexture && (s.emissiveMap = this.emissiveMap.toJSON(t).uuid),
      this.specularMap && this.specularMap.isTexture && (s.specularMap = this.specularMap.toJSON(t).uuid),
      this.specularIntensityMap &&
        this.specularIntensityMap.isTexture &&
        (s.specularIntensityMap = this.specularIntensityMap.toJSON(t).uuid),
      this.specularColorMap &&
        this.specularColorMap.isTexture &&
        (s.specularColorMap = this.specularColorMap.toJSON(t).uuid),
      this.envMap &&
        this.envMap.isTexture &&
        ((s.envMap = this.envMap.toJSON(t).uuid), this.combine !== void 0 && (s.combine = this.combine)),
      this.envMapRotation !== void 0 && (s.envMapRotation = this.envMapRotation.toArray()),
      this.envMapIntensity !== void 0 && (s.envMapIntensity = this.envMapIntensity),
      this.reflectivity !== void 0 && (s.reflectivity = this.reflectivity),
      this.refractionRatio !== void 0 && (s.refractionRatio = this.refractionRatio),
      this.gradientMap && this.gradientMap.isTexture && (s.gradientMap = this.gradientMap.toJSON(t).uuid),
      this.transmission !== void 0 && (s.transmission = this.transmission),
      this.transmissionMap &&
        this.transmissionMap.isTexture &&
        (s.transmissionMap = this.transmissionMap.toJSON(t).uuid),
      this.thickness !== void 0 && (s.thickness = this.thickness),
      this.thicknessMap && this.thicknessMap.isTexture && (s.thicknessMap = this.thicknessMap.toJSON(t).uuid),
      this.attenuationDistance !== void 0 &&
        this.attenuationDistance !== 1 / 0 &&
        (s.attenuationDistance = this.attenuationDistance),
      this.attenuationColor !== void 0 && (s.attenuationColor = this.attenuationColor.getHex()),
      this.size !== void 0 && (s.size = this.size),
      this.shadowSide !== null && (s.shadowSide = this.shadowSide),
      this.sizeAttenuation !== void 0 && (s.sizeAttenuation = this.sizeAttenuation),
      this.blending !== Kc && (s.blending = this.blending),
      this.side !== Rr && (s.side = this.side),
      this.vertexColors === !0 && (s.vertexColors = !0),
      this.opacity < 1 && (s.opacity = this.opacity),
      this.transparent === !0 && (s.transparent = !0),
      this.blendSrc !== u5 && (s.blendSrc = this.blendSrc),
      this.blendDst !== mo && (s.blendDst = this.blendDst),
      this.blendEquation !== b0 && (s.blendEquation = this.blendEquation),
      this.blendSrcAlpha !== null && (s.blendSrcAlpha = this.blendSrcAlpha),
      this.blendDstAlpha !== null && (s.blendDstAlpha = this.blendDstAlpha),
      this.blendEquationAlpha !== null && (s.blendEquationAlpha = this.blendEquationAlpha),
      this.blendColor && this.blendColor.isColor && (s.blendColor = this.blendColor.getHex()),
      this.blendAlpha !== 0 && (s.blendAlpha = this.blendAlpha),
      this.depthFunc !== cf && (s.depthFunc = this.depthFunc),
      this.depthTest === !1 && (s.depthTest = this.depthTest),
      this.depthWrite === !1 && (s.depthWrite = this.depthWrite),
      this.colorWrite === !1 && (s.colorWrite = this.colorWrite),
      this.stencilWriteMask !== 255 && (s.stencilWriteMask = this.stencilWriteMask),
      this.stencilFunc !== nv && (s.stencilFunc = this.stencilFunc),
      this.stencilRef !== 0 && (s.stencilRef = this.stencilRef),
      this.stencilFuncMask !== 255 && (s.stencilFuncMask = this.stencilFuncMask),
      this.stencilFail !== ec && (s.stencilFail = this.stencilFail),
      this.stencilZFail !== ec && (s.stencilZFail = this.stencilZFail),
      this.stencilZPass !== ec && (s.stencilZPass = this.stencilZPass),
      this.stencilWrite === !0 && (s.stencilWrite = this.stencilWrite),
      this.rotation !== void 0 && this.rotation !== 0 && (s.rotation = this.rotation),
      this.polygonOffset === !0 && (s.polygonOffset = !0),
      this.polygonOffsetFactor !== 0 && (s.polygonOffsetFactor = this.polygonOffsetFactor),
      this.polygonOffsetUnits !== 0 && (s.polygonOffsetUnits = this.polygonOffsetUnits),
      this.linewidth !== void 0 && this.linewidth !== 1 && (s.linewidth = this.linewidth),
      this.dashSize !== void 0 && (s.dashSize = this.dashSize),
      this.gapSize !== void 0 && (s.gapSize = this.gapSize),
      this.scale !== void 0 && (s.scale = this.scale),
      this.dithering === !0 && (s.dithering = !0),
      this.alphaTest > 0 && (s.alphaTest = this.alphaTest),
      this.alphaHash === !0 && (s.alphaHash = !0),
      this.alphaToCoverage === !0 && (s.alphaToCoverage = !0),
      this.premultipliedAlpha === !0 && (s.premultipliedAlpha = !0),
      this.forceSinglePass === !0 && (s.forceSinglePass = !0),
      this.wireframe === !0 && (s.wireframe = !0),
      this.wireframeLinewidth > 1 && (s.wireframeLinewidth = this.wireframeLinewidth),
      this.wireframeLinecap !== "round" && (s.wireframeLinecap = this.wireframeLinecap),
      this.wireframeLinejoin !== "round" && (s.wireframeLinejoin = this.wireframeLinejoin),
      this.flatShading === !0 && (s.flatShading = !0),
      this.visible === !1 && (s.visible = !1),
      this.toneMapped === !1 && (s.toneMapped = !1),
      this.fog === !1 && (s.fog = !1),
      Object.keys(this.userData).length > 0 && (s.userData = this.userData));
    function i(a) {
      const o = [];
      for (const r in a) {
        const l = a[r];
        (delete l.metadata, o.push(l));
      }
      return o;
    }
    if (e) {
      const a = i(t.textures),
        o = i(t.images);
      (a.length > 0 && (s.textures = a), o.length > 0 && (s.images = o));
    }
    return s;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    ((this.name = t.name),
      (this.blending = t.blending),
      (this.side = t.side),
      (this.vertexColors = t.vertexColors),
      (this.opacity = t.opacity),
      (this.transparent = t.transparent),
      (this.blendSrc = t.blendSrc),
      (this.blendDst = t.blendDst),
      (this.blendEquation = t.blendEquation),
      (this.blendSrcAlpha = t.blendSrcAlpha),
      (this.blendDstAlpha = t.blendDstAlpha),
      (this.blendEquationAlpha = t.blendEquationAlpha),
      this.blendColor.copy(t.blendColor),
      (this.blendAlpha = t.blendAlpha),
      (this.depthFunc = t.depthFunc),
      (this.depthTest = t.depthTest),
      (this.depthWrite = t.depthWrite),
      (this.stencilWriteMask = t.stencilWriteMask),
      (this.stencilFunc = t.stencilFunc),
      (this.stencilRef = t.stencilRef),
      (this.stencilFuncMask = t.stencilFuncMask),
      (this.stencilFail = t.stencilFail),
      (this.stencilZFail = t.stencilZFail),
      (this.stencilZPass = t.stencilZPass),
      (this.stencilWrite = t.stencilWrite));
    const e = t.clippingPlanes;
    let s = null;
    if (e !== null) {
      const i = e.length;
      s = new Array(i);
      for (let a = 0; a !== i; ++a) s[a] = e[a].clone();
    }
    return (
      (this.clippingPlanes = s),
      (this.clipIntersection = t.clipIntersection),
      (this.clipShadows = t.clipShadows),
      (this.shadowSide = t.shadowSide),
      (this.colorWrite = t.colorWrite),
      (this.precision = t.precision),
      (this.polygonOffset = t.polygonOffset),
      (this.polygonOffsetFactor = t.polygonOffsetFactor),
      (this.polygonOffsetUnits = t.polygonOffsetUnits),
      (this.dithering = t.dithering),
      (this.alphaTest = t.alphaTest),
      (this.alphaHash = t.alphaHash),
      (this.alphaToCoverage = t.alphaToCoverage),
      (this.premultipliedAlpha = t.premultipliedAlpha),
      (this.forceSinglePass = t.forceSinglePass),
      (this.visible = t.visible),
      (this.toneMapped = t.toneMapped),
      (this.userData = JSON.parse(JSON.stringify(t.userData))),
      this
    );
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  set needsUpdate(t) {
    t === !0 && this.version++;
  }
}

class yM extends Uh {
  constructor(t) {
    (super(),
      (this.isMeshBasicMaterial = !0),
      (this.type = "MeshBasicMaterial"),
      (this.color = new Ut(16777215)),
      (this.map = null),
      (this.lightMap = null),
      (this.lightMapIntensity = 1),
      (this.aoMap = null),
      (this.aoMapIntensity = 1),
      (this.specularMap = null),
      (this.alphaMap = null),
      (this.envMap = null),
      (this.envMapRotation = new sa()),
      (this.combine = nM),
      (this.reflectivity = 1),
      (this.refractionRatio = 0.98),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.wireframeLinecap = "round"),
      (this.wireframeLinejoin = "round"),
      (this.fog = !0),
      this.setValues(t));
  }
  copy(t) {
    return (
      super.copy(t),
      this.color.copy(t.color),
      (this.map = t.map),
      (this.lightMap = t.lightMap),
      (this.lightMapIntensity = t.lightMapIntensity),
      (this.aoMap = t.aoMap),
      (this.aoMapIntensity = t.aoMapIntensity),
      (this.specularMap = t.specularMap),
      (this.alphaMap = t.alphaMap),
      (this.envMap = t.envMap),
      this.envMapRotation.copy(t.envMapRotation),
      (this.combine = t.combine),
      (this.reflectivity = t.reflectivity),
      (this.refractionRatio = t.refractionRatio),
      (this.wireframe = t.wireframe),
      (this.wireframeLinewidth = t.wireframeLinewidth),
      (this.wireframeLinecap = t.wireframeLinecap),
      (this.wireframeLinejoin = t.wireframeLinejoin),
      (this.fog = t.fog),
      this
    );
  }
}

const Es = new dt(),
  Mu = new Ee();
export { Ke, sa, gM, Ws, oo, Ut, Uh, yM, Es, Mu };
