// 05-three.js — three｜39 个顶层语句｜67KB
// 对应 game.pretty.js 第 7096–9517 行
// 关键内容：
//   dt                    index is out of range:
//   N1                    http://www.w3.org/1999/xhtml
//   b7                    canvas
//   w7                    standard
//   M7                    image/png
//   Vs                    THREE.Texture.setValues(): parameter
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { Af, C0, D1, Ee, Fo, Gs, Ki, Ns, Ul, aM, co, jn, mh, mi, ri, ti, vn, w5 } from './04-audio-2.js';

class Ri {
  constructor(t = 0, e = 0, s = 0, i = 1) {
    ((this.isQuaternion = !0), (this._x = t), (this._y = e), (this._z = s), (this._w = i));
  }
  static slerpFlat(t, e, s, i, a, o, r) {
    let l = s[i + 0],
      c = s[i + 1],
      f = s[i + 2],
      d = s[i + 3];
    const h = a[o + 0],
      u = a[o + 1],
      m = a[o + 2],
      x = a[o + 3];
    if (r === 0) {
      ((t[e + 0] = l), (t[e + 1] = c), (t[e + 2] = f), (t[e + 3] = d));
      return;
    }
    if (r === 1) {
      ((t[e + 0] = h), (t[e + 1] = u), (t[e + 2] = m), (t[e + 3] = x));
      return;
    }
    if (d !== x || l !== h || c !== u || f !== m) {
      let p = 1 - r;
      const g = l * h + c * u + f * m + d * x,
        y = g >= 0 ? 1 : -1,
        v = 1 - g * g;
      if (v > Number.EPSILON) {
        const k = Math.sqrt(v),
          M = Math.atan2(k, g * y);
        ((p = Math.sin(p * M) / k), (r = Math.sin(r * M) / k));
      }
      const _ = r * y;
      if (((l = l * p + h * _), (c = c * p + u * _), (f = f * p + m * _), (d = d * p + x * _), p === 1 - r)) {
        const k = 1 / Math.sqrt(l * l + c * c + f * f + d * d);
        ((l *= k), (c *= k), (f *= k), (d *= k));
      }
    }
    ((t[e] = l), (t[e + 1] = c), (t[e + 2] = f), (t[e + 3] = d));
  }
  static multiplyQuaternionsFlat(t, e, s, i, a, o) {
    const r = s[i],
      l = s[i + 1],
      c = s[i + 2],
      f = s[i + 3],
      d = a[o],
      h = a[o + 1],
      u = a[o + 2],
      m = a[o + 3];
    return (
      (t[e] = r * m + f * d + l * u - c * h),
      (t[e + 1] = l * m + f * h + c * d - r * u),
      (t[e + 2] = c * m + f * u + r * h - l * d),
      (t[e + 3] = f * m - r * d - l * h - c * u),
      t
    );
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
  get w() {
    return this._w;
  }
  set w(t) {
    ((this._w = t), this._onChangeCallback());
  }
  set(t, e, s, i) {
    return ((this._x = t), (this._y = e), (this._z = s), (this._w = i), this._onChangeCallback(), this);
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(t) {
    return (
      (this._x = t.x),
      (this._y = t.y),
      (this._z = t.z),
      (this._w = t.w),
      this._onChangeCallback(),
      this
    );
  }
  setFromEuler(t, e = !0) {
    const s = t._x,
      i = t._y,
      a = t._z,
      o = t._order,
      r = Math.cos,
      l = Math.sin,
      c = r(s / 2),
      f = r(i / 2),
      d = r(a / 2),
      h = l(s / 2),
      u = l(i / 2),
      m = l(a / 2);
    switch (o) {
      case "XYZ":
        ((this._x = h * f * d + c * u * m),
          (this._y = c * u * d - h * f * m),
          (this._z = c * f * m + h * u * d),
          (this._w = c * f * d - h * u * m));
        break;
      case "YXZ":
        ((this._x = h * f * d + c * u * m),
          (this._y = c * u * d - h * f * m),
          (this._z = c * f * m - h * u * d),
          (this._w = c * f * d + h * u * m));
        break;
      case "ZXY":
        ((this._x = h * f * d - c * u * m),
          (this._y = c * u * d + h * f * m),
          (this._z = c * f * m + h * u * d),
          (this._w = c * f * d - h * u * m));
        break;
      case "ZYX":
        ((this._x = h * f * d - c * u * m),
          (this._y = c * u * d + h * f * m),
          (this._z = c * f * m - h * u * d),
          (this._w = c * f * d + h * u * m));
        break;
      case "YZX":
        ((this._x = h * f * d + c * u * m),
          (this._y = c * u * d + h * f * m),
          (this._z = c * f * m - h * u * d),
          (this._w = c * f * d - h * u * m));
        break;
      case "XZY":
        ((this._x = h * f * d - c * u * m),
          (this._y = c * u * d - h * f * m),
          (this._z = c * f * m + h * u * d),
          (this._w = c * f * d + h * u * m));
        break;
      default:
        console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + o);
    }
    return (e === !0 && this._onChangeCallback(), this);
  }
  setFromAxisAngle(t, e) {
    const s = e / 2,
      i = Math.sin(s);
    return (
      (this._x = t.x * i),
      (this._y = t.y * i),
      (this._z = t.z * i),
      (this._w = Math.cos(s)),
      this._onChangeCallback(),
      this
    );
  }
  setFromRotationMatrix(t) {
    const e = t.elements,
      s = e[0],
      i = e[4],
      a = e[8],
      o = e[1],
      r = e[5],
      l = e[9],
      c = e[2],
      f = e[6],
      d = e[10],
      h = s + r + d;
    if (h > 0) {
      const u = 0.5 / Math.sqrt(h + 1);
      ((this._w = 0.25 / u), (this._x = (f - l) * u), (this._y = (a - c) * u), (this._z = (o - i) * u));
    } else if (s > r && s > d) {
      const u = 2 * Math.sqrt(1 + s - r - d);
      ((this._w = (f - l) / u), (this._x = 0.25 * u), (this._y = (i + o) / u), (this._z = (a + c) / u));
    } else if (r > d) {
      const u = 2 * Math.sqrt(1 + r - s - d);
      ((this._w = (a - c) / u), (this._x = (i + o) / u), (this._y = 0.25 * u), (this._z = (l + f) / u));
    } else {
      const u = 2 * Math.sqrt(1 + d - s - r);
      ((this._w = (o - i) / u), (this._x = (a + c) / u), (this._y = (l + f) / u), (this._z = 0.25 * u));
    }
    return (this._onChangeCallback(), this);
  }
  setFromUnitVectors(t, e) {
    let s = t.dot(e) + 1;
    return (
      s < 1e-8
        ? ((s = 0),
          Math.abs(t.x) > Math.abs(t.z)
            ? ((this._x = -t.y), (this._y = t.x), (this._z = 0), (this._w = s))
            : ((this._x = 0), (this._y = -t.z), (this._z = t.y), (this._w = s)))
        : ((this._x = t.y * e.z - t.z * e.y),
          (this._y = t.z * e.x - t.x * e.z),
          (this._z = t.x * e.y - t.y * e.x),
          (this._w = s)),
      this.normalize()
    );
  }
  angleTo(t) {
    return 2 * Math.acos(Math.abs(vn(this.dot(t), -1, 1)));
  }
  rotateTowards(t, e) {
    const s = this.angleTo(t);
    if (s === 0) return this;
    const i = Math.min(1, e / s);
    return (this.slerp(t, i), this);
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return ((this._x *= -1), (this._y *= -1), (this._z *= -1), this._onChangeCallback(), this);
  }
  dot(t) {
    return this._x * t._x + this._y * t._y + this._z * t._z + this._w * t._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let t = this.length();
    return (
      t === 0
        ? ((this._x = 0), (this._y = 0), (this._z = 0), (this._w = 1))
        : ((t = 1 / t),
          (this._x = this._x * t),
          (this._y = this._y * t),
          (this._z = this._z * t),
          (this._w = this._w * t)),
      this._onChangeCallback(),
      this
    );
  }
  multiply(t) {
    return this.multiplyQuaternions(this, t);
  }
  premultiply(t) {
    return this.multiplyQuaternions(t, this);
  }
  multiplyQuaternions(t, e) {
    const s = t._x,
      i = t._y,
      a = t._z,
      o = t._w,
      r = e._x,
      l = e._y,
      c = e._z,
      f = e._w;
    return (
      (this._x = s * f + o * r + i * c - a * l),
      (this._y = i * f + o * l + a * r - s * c),
      (this._z = a * f + o * c + s * l - i * r),
      (this._w = o * f - s * r - i * l - a * c),
      this._onChangeCallback(),
      this
    );
  }
  slerp(t, e) {
    if (e === 0) return this;
    if (e === 1) return this.copy(t);
    const s = this._x,
      i = this._y,
      a = this._z,
      o = this._w;
    let r = o * t._w + s * t._x + i * t._y + a * t._z;
    if (
      (r < 0
        ? ((this._w = -t._w), (this._x = -t._x), (this._y = -t._y), (this._z = -t._z), (r = -r))
        : this.copy(t),
      r >= 1)
    )
      return ((this._w = o), (this._x = s), (this._y = i), (this._z = a), this);
    const l = 1 - r * r;
    if (l <= Number.EPSILON) {
      const u = 1 - e;
      return (
        (this._w = u * o + e * this._w),
        (this._x = u * s + e * this._x),
        (this._y = u * i + e * this._y),
        (this._z = u * a + e * this._z),
        this.normalize(),
        this
      );
    }
    const c = Math.sqrt(l),
      f = Math.atan2(c, r),
      d = Math.sin((1 - e) * f) / c,
      h = Math.sin(e * f) / c;
    return (
      (this._w = o * d + this._w * h),
      (this._x = s * d + this._x * h),
      (this._y = i * d + this._y * h),
      (this._z = a * d + this._z * h),
      this._onChangeCallback(),
      this
    );
  }
  slerpQuaternions(t, e, s) {
    return this.copy(t).slerp(e, s);
  }
  random() {
    const t = 2 * Math.PI * Math.random(),
      e = 2 * Math.PI * Math.random(),
      s = Math.random(),
      i = Math.sqrt(1 - s),
      a = Math.sqrt(s);
    return this.set(i * Math.sin(t), i * Math.cos(t), a * Math.sin(e), a * Math.cos(e));
  }
  equals(t) {
    return t._x === this._x && t._y === this._y && t._z === this._z && t._w === this._w;
  }
  fromArray(t, e = 0) {
    return (
      (this._x = t[e]),
      (this._y = t[e + 1]),
      (this._z = t[e + 2]),
      (this._w = t[e + 3]),
      this._onChangeCallback(),
      this
    );
  }
  toArray(t = [], e = 0) {
    return ((t[e] = this._x), (t[e + 1] = this._y), (t[e + 2] = this._z), (t[e + 3] = this._w), t);
  }
  fromBufferAttribute(t, e) {
    return (
      (this._x = t.getX(e)),
      (this._y = t.getY(e)),
      (this._z = t.getZ(e)),
      (this._w = t.getW(e)),
      this._onChangeCallback(),
      this
    );
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(t) {
    return ((this._onChangeCallback = t), this);
  }
  _onChangeCallback() {}
  *[Symbol.iterator]() {
    (yield this._x, yield this._y, yield this._z, yield this._w);
  }
}

class dt {
  constructor(t = 0, e = 0, s = 0) {
    ((dt.prototype.isVector3 = !0), (this.x = t), (this.y = e), (this.z = s));
  }
  set(t, e, s) {
    return (s === void 0 && (s = this.z), (this.x = t), (this.y = e), (this.z = s), this);
  }
  setScalar(t) {
    return ((this.x = t), (this.y = t), (this.z = t), this);
  }
  setX(t) {
    return ((this.x = t), this);
  }
  setY(t) {
    return ((this.y = t), this);
  }
  setZ(t) {
    return ((this.z = t), this);
  }
  setComponent(t, e) {
    switch (t) {
      case 0:
        this.x = e;
        break;
      case 1:
        this.y = e;
        break;
      case 2:
        this.z = e;
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
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(t) {
    return ((this.x = t.x), (this.y = t.y), (this.z = t.z), this);
  }
  add(t) {
    return ((this.x += t.x), (this.y += t.y), (this.z += t.z), this);
  }
  addScalar(t) {
    return ((this.x += t), (this.y += t), (this.z += t), this);
  }
  addVectors(t, e) {
    return ((this.x = t.x + e.x), (this.y = t.y + e.y), (this.z = t.z + e.z), this);
  }
  addScaledVector(t, e) {
    return ((this.x += t.x * e), (this.y += t.y * e), (this.z += t.z * e), this);
  }
  sub(t) {
    return ((this.x -= t.x), (this.y -= t.y), (this.z -= t.z), this);
  }
  subScalar(t) {
    return ((this.x -= t), (this.y -= t), (this.z -= t), this);
  }
  subVectors(t, e) {
    return ((this.x = t.x - e.x), (this.y = t.y - e.y), (this.z = t.z - e.z), this);
  }
  multiply(t) {
    return ((this.x *= t.x), (this.y *= t.y), (this.z *= t.z), this);
  }
  multiplyScalar(t) {
    return ((this.x *= t), (this.y *= t), (this.z *= t), this);
  }
  multiplyVectors(t, e) {
    return ((this.x = t.x * e.x), (this.y = t.y * e.y), (this.z = t.z * e.z), this);
  }
  applyEuler(t) {
    return this.applyQuaternion(iv.setFromEuler(t));
  }
  applyAxisAngle(t, e) {
    return this.applyQuaternion(iv.setFromAxisAngle(t, e));
  }
  applyMatrix3(t) {
    const e = this.x,
      s = this.y,
      i = this.z,
      a = t.elements;
    return (
      (this.x = a[0] * e + a[3] * s + a[6] * i),
      (this.y = a[1] * e + a[4] * s + a[7] * i),
      (this.z = a[2] * e + a[5] * s + a[8] * i),
      this
    );
  }
  applyNormalMatrix(t) {
    return this.applyMatrix3(t).normalize();
  }
  applyMatrix4(t) {
    const e = this.x,
      s = this.y,
      i = this.z,
      a = t.elements,
      o = 1 / (a[3] * e + a[7] * s + a[11] * i + a[15]);
    return (
      (this.x = (a[0] * e + a[4] * s + a[8] * i + a[12]) * o),
      (this.y = (a[1] * e + a[5] * s + a[9] * i + a[13]) * o),
      (this.z = (a[2] * e + a[6] * s + a[10] * i + a[14]) * o),
      this
    );
  }
  applyQuaternion(t) {
    const e = this.x,
      s = this.y,
      i = this.z,
      a = t.x,
      o = t.y,
      r = t.z,
      l = t.w,
      c = 2 * (o * i - r * s),
      f = 2 * (r * e - a * i),
      d = 2 * (a * s - o * e);
    return (
      (this.x = e + l * c + o * d - r * f),
      (this.y = s + l * f + r * c - a * d),
      (this.z = i + l * d + a * f - o * c),
      this
    );
  }
  project(t) {
    return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix);
  }
  unproject(t) {
    return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld);
  }
  transformDirection(t) {
    const e = this.x,
      s = this.y,
      i = this.z,
      a = t.elements;
    return (
      (this.x = a[0] * e + a[4] * s + a[8] * i),
      (this.y = a[1] * e + a[5] * s + a[9] * i),
      (this.z = a[2] * e + a[6] * s + a[10] * i),
      this.normalize()
    );
  }
  divide(t) {
    return ((this.x /= t.x), (this.y /= t.y), (this.z /= t.z), this);
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  min(t) {
    return (
      (this.x = Math.min(this.x, t.x)),
      (this.y = Math.min(this.y, t.y)),
      (this.z = Math.min(this.z, t.z)),
      this
    );
  }
  max(t) {
    return (
      (this.x = Math.max(this.x, t.x)),
      (this.y = Math.max(this.y, t.y)),
      (this.z = Math.max(this.z, t.z)),
      this
    );
  }
  clamp(t, e) {
    return (
      (this.x = vn(this.x, t.x, e.x)),
      (this.y = vn(this.y, t.y, e.y)),
      (this.z = vn(this.z, t.z, e.z)),
      this
    );
  }
  clampScalar(t, e) {
    return ((this.x = vn(this.x, t, e)), (this.y = vn(this.y, t, e)), (this.z = vn(this.z, t, e)), this);
  }
  clampLength(t, e) {
    const s = this.length();
    return this.divideScalar(s || 1).multiplyScalar(vn(s, t, e));
  }
  floor() {
    return (
      (this.x = Math.floor(this.x)),
      (this.y = Math.floor(this.y)),
      (this.z = Math.floor(this.z)),
      this
    );
  }
  ceil() {
    return ((this.x = Math.ceil(this.x)), (this.y = Math.ceil(this.y)), (this.z = Math.ceil(this.z)), this);
  }
  round() {
    return (
      (this.x = Math.round(this.x)),
      (this.y = Math.round(this.y)),
      (this.z = Math.round(this.z)),
      this
    );
  }
  roundToZero() {
    return (
      (this.x = Math.trunc(this.x)),
      (this.y = Math.trunc(this.y)),
      (this.z = Math.trunc(this.z)),
      this
    );
  }
  negate() {
    return ((this.x = -this.x), (this.y = -this.y), (this.z = -this.z), this);
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, e) {
    return (
      (this.x += (t.x - this.x) * e),
      (this.y += (t.y - this.y) * e),
      (this.z += (t.z - this.z) * e),
      this
    );
  }
  lerpVectors(t, e, s) {
    return (
      (this.x = t.x + (e.x - t.x) * s),
      (this.y = t.y + (e.y - t.y) * s),
      (this.z = t.z + (e.z - t.z) * s),
      this
    );
  }
  cross(t) {
    return this.crossVectors(this, t);
  }
  crossVectors(t, e) {
    const s = t.x,
      i = t.y,
      a = t.z,
      o = e.x,
      r = e.y,
      l = e.z;
    return ((this.x = i * l - a * r), (this.y = a * o - s * l), (this.z = s * r - i * o), this);
  }
  projectOnVector(t) {
    const e = t.lengthSq();
    if (e === 0) return this.set(0, 0, 0);
    const s = t.dot(this) / e;
    return this.copy(t).multiplyScalar(s);
  }
  projectOnPlane(t) {
    return (cg.copy(this).projectOnVector(t), this.sub(cg));
  }
  reflect(t) {
    return this.sub(cg.copy(t).multiplyScalar(2 * this.dot(t)));
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
      s = this.y - t.y,
      i = this.z - t.z;
    return e * e + s * s + i * i;
  }
  manhattanDistanceTo(t) {
    return Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z);
  }
  setFromSpherical(t) {
    return this.setFromSphericalCoords(t.radius, t.phi, t.theta);
  }
  setFromSphericalCoords(t, e, s) {
    const i = Math.sin(e) * t;
    return ((this.x = i * Math.sin(s)), (this.y = Math.cos(e) * t), (this.z = i * Math.cos(s)), this);
  }
  setFromCylindrical(t) {
    return this.setFromCylindricalCoords(t.radius, t.theta, t.y);
  }
  setFromCylindricalCoords(t, e, s) {
    return ((this.x = t * Math.sin(e)), (this.y = s), (this.z = t * Math.cos(e)), this);
  }
  setFromMatrixPosition(t) {
    const e = t.elements;
    return ((this.x = e[12]), (this.y = e[13]), (this.z = e[14]), this);
  }
  setFromMatrixScale(t) {
    const e = this.setFromMatrixColumn(t, 0).length(),
      s = this.setFromMatrixColumn(t, 1).length(),
      i = this.setFromMatrixColumn(t, 2).length();
    return ((this.x = e), (this.y = s), (this.z = i), this);
  }
  setFromMatrixColumn(t, e) {
    return this.fromArray(t.elements, e * 4);
  }
  setFromMatrix3Column(t, e) {
    return this.fromArray(t.elements, e * 3);
  }
  setFromEuler(t) {
    return ((this.x = t._x), (this.y = t._y), (this.z = t._z), this);
  }
  setFromColor(t) {
    return ((this.x = t.r), (this.y = t.g), (this.z = t.b), this);
  }
  equals(t) {
    return t.x === this.x && t.y === this.y && t.z === this.z;
  }
  fromArray(t, e = 0) {
    return ((this.x = t[e]), (this.y = t[e + 1]), (this.z = t[e + 2]), this);
  }
  toArray(t = [], e = 0) {
    return ((t[e] = this.x), (t[e + 1] = this.y), (t[e + 2] = this.z), t);
  }
  fromBufferAttribute(t, e) {
    return ((this.x = t.getX(e)), (this.y = t.getY(e)), (this.z = t.getZ(e)), this);
  }
  random() {
    return ((this.x = Math.random()), (this.y = Math.random()), (this.z = Math.random()), this);
  }
  randomDirection() {
    const t = Math.random() * Math.PI * 2,
      e = Math.random() * 2 - 1,
      s = Math.sqrt(1 - e * e);
    return ((this.x = s * Math.cos(t)), (this.y = e), (this.z = s * Math.sin(t)), this);
  }
  *[Symbol.iterator]() {
    (yield this.x, yield this.y, yield this.z);
  }
}

const cg = new dt(),
  iv = new Ri();

class Je {
  constructor(t, e, s, i, a, o, r, l, c) {
    ((Je.prototype.isMatrix3 = !0),
      (this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1]),
      t !== void 0 && this.set(t, e, s, i, a, o, r, l, c));
  }
  set(t, e, s, i, a, o, r, l, c) {
    const f = this.elements;
    return (
      (f[0] = t),
      (f[1] = i),
      (f[2] = r),
      (f[3] = e),
      (f[4] = a),
      (f[5] = l),
      (f[6] = s),
      (f[7] = o),
      (f[8] = c),
      this
    );
  }
  identity() {
    return (this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this);
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
      this
    );
  }
  extractBasis(t, e, s) {
    return (
      t.setFromMatrix3Column(this, 0),
      e.setFromMatrix3Column(this, 1),
      s.setFromMatrix3Column(this, 2),
      this
    );
  }
  setFromMatrix4(t) {
    const e = t.elements;
    return (this.set(e[0], e[4], e[8], e[1], e[5], e[9], e[2], e[6], e[10]), this);
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
      r = s[3],
      l = s[6],
      c = s[1],
      f = s[4],
      d = s[7],
      h = s[2],
      u = s[5],
      m = s[8],
      x = i[0],
      p = i[3],
      g = i[6],
      y = i[1],
      v = i[4],
      _ = i[7],
      k = i[2],
      M = i[5],
      S = i[8];
    return (
      (a[0] = o * x + r * y + l * k),
      (a[3] = o * p + r * v + l * M),
      (a[6] = o * g + r * _ + l * S),
      (a[1] = c * x + f * y + d * k),
      (a[4] = c * p + f * v + d * M),
      (a[7] = c * g + f * _ + d * S),
      (a[2] = h * x + u * y + m * k),
      (a[5] = h * p + u * v + m * M),
      (a[8] = h * g + u * _ + m * S),
      this
    );
  }
  multiplyScalar(t) {
    const e = this.elements;
    return (
      (e[0] *= t),
      (e[3] *= t),
      (e[6] *= t),
      (e[1] *= t),
      (e[4] *= t),
      (e[7] *= t),
      (e[2] *= t),
      (e[5] *= t),
      (e[8] *= t),
      this
    );
  }
  determinant() {
    const t = this.elements,
      e = t[0],
      s = t[1],
      i = t[2],
      a = t[3],
      o = t[4],
      r = t[5],
      l = t[6],
      c = t[7],
      f = t[8];
    return e * o * f - e * r * c - s * a * f + s * r * l + i * a * c - i * o * l;
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
      d = f * o - r * c,
      h = r * l - f * a,
      u = c * a - o * l,
      m = e * d + s * h + i * u;
    if (m === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const x = 1 / m;
    return (
      (t[0] = d * x),
      (t[1] = (i * c - f * s) * x),
      (t[2] = (r * s - i * o) * x),
      (t[3] = h * x),
      (t[4] = (f * e - i * l) * x),
      (t[5] = (i * a - r * e) * x),
      (t[6] = u * x),
      (t[7] = (s * l - c * e) * x),
      (t[8] = (o * e - s * a) * x),
      this
    );
  }
  transpose() {
    let t;
    const e = this.elements;
    return (
      (t = e[1]),
      (e[1] = e[3]),
      (e[3] = t),
      (t = e[2]),
      (e[2] = e[6]),
      (e[6] = t),
      (t = e[5]),
      (e[5] = e[7]),
      (e[7] = t),
      this
    );
  }
  getNormalMatrix(t) {
    return this.setFromMatrix4(t).invert().transpose();
  }
  transposeIntoArray(t) {
    const e = this.elements;
    return (
      (t[0] = e[0]),
      (t[1] = e[3]),
      (t[2] = e[6]),
      (t[3] = e[1]),
      (t[4] = e[4]),
      (t[5] = e[7]),
      (t[6] = e[2]),
      (t[7] = e[5]),
      (t[8] = e[8]),
      this
    );
  }
  setUvTransform(t, e, s, i, a, o, r) {
    const l = Math.cos(a),
      c = Math.sin(a);
    return (
      this.set(
        s * l,
        s * c,
        -s * (l * o + c * r) + o + t,
        -i * c,
        i * l,
        -i * (-c * o + l * r) + r + e,
        0,
        0,
        1,
      ),
      this
    );
  }
  scale(t, e) {
    return (this.premultiply(fg.makeScale(t, e)), this);
  }
  rotate(t) {
    return (this.premultiply(fg.makeRotation(-t)), this);
  }
  translate(t, e) {
    return (this.premultiply(fg.makeTranslation(t, e)), this);
  }
  makeTranslation(t, e) {
    return (
      t.isVector2 ? this.set(1, 0, t.x, 0, 1, t.y, 0, 0, 1) : this.set(1, 0, t, 0, 1, e, 0, 0, 1),
      this
    );
  }
  makeRotation(t) {
    const e = Math.cos(t),
      s = Math.sin(t);
    return (this.set(e, -s, 0, s, e, 0, 0, 0, 1), this);
  }
  makeScale(t, e) {
    return (this.set(t, 0, 0, 0, e, 0, 0, 0, 1), this);
  }
  equals(t) {
    const e = this.elements,
      s = t.elements;
    for (let i = 0; i < 9; i++) if (e[i] !== s[i]) return !1;
    return !0;
  }
  fromArray(t, e = 0) {
    for (let s = 0; s < 9; s++) this.elements[s] = t[s + e];
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
      t
    );
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}

const fg = new Je();

function pM(n) {
  for (let t = n.length - 1; t >= 0; --t) if (n[t] >= 65535) return !0;
  return !1;
}

function N1(n) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", n);
}

function b7() {
  const n = N1("canvas");
  return ((n.style.display = "block"), n);
}

const av = {};

function bh(n) {
  n in av || ((av[n] = !0), console.warn(n));
}

function _7(n, t, e) {
  return new Promise(function (s, i) {
    function a() {
      switch (n.clientWaitSync(t, n.SYNC_FLUSH_COMMANDS_BIT, 0)) {
        case n.WAIT_FAILED:
          i();
          break;
        case n.TIMEOUT_EXPIRED:
          setTimeout(a, e);
          break;
        default:
          s();
      }
    }
    setTimeout(a, e);
  });
}

const ov = new Je().set(
    0.4123908,
    0.3575843,
    0.1804808,
    0.212639,
    0.7151687,
    0.0721923,
    0.0193308,
    0.1191948,
    0.9505322,
  ),
  rv = new Je().set(
    3.2409699,
    -1.5373832,
    -0.4986108,
    -0.9692436,
    1.8759675,
    0.0415551,
    0.0556301,
    -0.203977,
    1.0569715,
  );

function w7() {
  const n = {
      enabled: !0,
      workingColorSpace: Ul,
      spaces: {},
      convert: function (i, a, o) {
        return (
          this.enabled === !1 ||
            a === o ||
            !a ||
            !o ||
            (this.spaces[a].transfer === jn && ((i.r = Tr(i.r)), (i.g = Tr(i.g)), (i.b = Tr(i.b))),
            this.spaces[a].primaries !== this.spaces[o].primaries &&
              (i.applyMatrix3(this.spaces[a].toXYZ), i.applyMatrix3(this.spaces[o].fromXYZ)),
            this.spaces[o].transfer === jn && ((i.r = Zc(i.r)), (i.g = Zc(i.g)), (i.b = Zc(i.b)))),
          i
        );
      },
      workingToColorSpace: function (i, a) {
        return this.convert(i, this.workingColorSpace, a);
      },
      colorSpaceToWorking: function (i, a) {
        return this.convert(i, a, this.workingColorSpace);
      },
      getPrimaries: function (i) {
        return this.spaces[i].primaries;
      },
      getTransfer: function (i) {
        return i === Ki ? D1 : this.spaces[i].transfer;
      },
      getToneMappingMode: function (i) {
        return this.spaces[i].outputColorSpaceConfig.toneMappingMode || "standard";
      },
      getLuminanceCoefficients: function (i, a = this.workingColorSpace) {
        return i.fromArray(this.spaces[a].luminanceCoefficients);
      },
      define: function (i) {
        Object.assign(this.spaces, i);
      },
      _getMatrix: function (i, a, o) {
        return i.copy(this.spaces[a].toXYZ).multiply(this.spaces[o].fromXYZ);
      },
      _getDrawingBufferColorSpace: function (i) {
        return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace;
      },
      _getUnpackColorSpace: function (i = this.workingColorSpace) {
        return this.spaces[i].workingColorSpaceConfig.unpackColorSpace;
      },
      fromWorkingColorSpace: function (i, a) {
        return (
          bh("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),
          n.workingToColorSpace(i, a)
        );
      },
      toWorkingColorSpace: function (i, a) {
        return (
          bh("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),
          n.colorSpaceToWorking(i, a)
        );
      },
    },
    t = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06],
    e = [0.2126, 0.7152, 0.0722],
    s = [0.3127, 0.329];
  return (
    n.define({
      [Ul]: {
        primaries: t,
        whitePoint: s,
        transfer: D1,
        toXYZ: ov,
        fromXYZ: rv,
        luminanceCoefficients: e,
        workingColorSpaceConfig: { unpackColorSpace: ri },
        outputColorSpaceConfig: { drawingBufferColorSpace: ri },
      },
      [ri]: {
        primaries: t,
        whitePoint: s,
        transfer: jn,
        toXYZ: ov,
        fromXYZ: rv,
        luminanceCoefficients: e,
        outputColorSpaceConfig: { drawingBufferColorSpace: ri },
      },
    }),
    n
  );
}

const In = w7();

function Tr(n) {
  return n < 0.04045 ? n * 0.0773993808 : Math.pow(n * 0.9478672986 + 0.0521327014, 2.4);
}

function Zc(n) {
  return n < 0.0031308 ? n * 12.92 : 1.055 * Math.pow(n, 0.41666) - 0.055;
}

let nc;

class M7 {
  static getDataURL(t, e = "image/png") {
    if (/^data:/i.test(t.src) || typeof HTMLCanvasElement > "u") return t.src;
    let s;
    if (t instanceof HTMLCanvasElement) s = t;
    else {
      (nc === void 0 && (nc = N1("canvas")), (nc.width = t.width), (nc.height = t.height));
      const i = nc.getContext("2d");
      (t instanceof ImageData ? i.putImageData(t, 0, 0) : i.drawImage(t, 0, 0, t.width, t.height), (s = nc));
    }
    return s.toDataURL(e);
  }
  static sRGBToLinear(t) {
    if (
      (typeof HTMLImageElement < "u" && t instanceof HTMLImageElement) ||
      (typeof HTMLCanvasElement < "u" && t instanceof HTMLCanvasElement) ||
      (typeof ImageBitmap < "u" && t instanceof ImageBitmap)
    ) {
      const e = N1("canvas");
      ((e.width = t.width), (e.height = t.height));
      const s = e.getContext("2d");
      s.drawImage(t, 0, 0, t.width, t.height);
      const i = s.getImageData(0, 0, t.width, t.height),
        a = i.data;
      for (let o = 0; o < a.length; o++) a[o] = Tr(a[o] / 255) * 255;
      return (s.putImageData(i, 0, 0), e);
    } else if (t.data) {
      const e = t.data.slice(0);
      for (let s = 0; s < e.length; s++)
        e instanceof Uint8Array || e instanceof Uint8ClampedArray
          ? (e[s] = Math.floor(Tr(e[s] / 255) * 255))
          : (e[s] = Tr(e[s]));
      return { data: e, width: t.width, height: t.height };
    } else
      return (
        console.warn(
          "THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.",
        ),
        t
      );
  }
}

let k7 = 0;

class Q3 {
  constructor(t = null) {
    ((this.isSource = !0),
      Object.defineProperty(this, "id", { value: k7++ }),
      (this.uuid = C0()),
      (this.data = t),
      (this.dataReady = !0),
      (this.version = 0));
  }
  getSize(t) {
    const e = this.data;
    return (
      typeof HTMLVideoElement < "u" && e instanceof HTMLVideoElement
        ? t.set(e.videoWidth, e.videoHeight, 0)
        : e instanceof VideoFrame
          ? t.set(e.displayHeight, e.displayWidth, 0)
          : e !== null
            ? t.set(e.width, e.height, e.depth || 0)
            : t.set(0, 0, 0),
      t
    );
  }
  set needsUpdate(t) {
    t === !0 && this.version++;
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == "string";
    if (!e && t.images[this.uuid] !== void 0) return t.images[this.uuid];
    const s = { uuid: this.uuid, url: "" },
      i = this.data;
    if (i !== null) {
      let a;
      if (Array.isArray(i)) {
        a = [];
        for (let o = 0, r = i.length; o < r; o++)
          i[o].isDataTexture ? a.push(dg(i[o].image)) : a.push(dg(i[o]));
      } else a = dg(i);
      s.url = a;
    }
    return (e || (t.images[this.uuid] = s), s);
  }
}

function dg(n) {
  return (typeof HTMLImageElement < "u" && n instanceof HTMLImageElement) ||
    (typeof HTMLCanvasElement < "u" && n instanceof HTMLCanvasElement) ||
    (typeof ImageBitmap < "u" && n instanceof ImageBitmap)
    ? M7.getDataURL(n)
    : n.data
      ? { data: Array.from(n.data), width: n.width, height: n.height, type: n.data.constructor.name }
      : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}

let S7 = 0;

const hg = new dt();

class Vs extends Af {
  constructor(
    t = Vs.DEFAULT_IMAGE,
    e = Vs.DEFAULT_MAPPING,
    s = co,
    i = co,
    a = Ns,
    o = Fo,
    r = Gs,
    l = mi,
    c = Vs.DEFAULT_ANISOTROPY,
    f = Ki,
  ) {
    (super(),
      (this.isTexture = !0),
      Object.defineProperty(this, "id", { value: S7++ }),
      (this.uuid = C0()),
      (this.name = ""),
      (this.source = new Q3(t)),
      (this.mipmaps = []),
      (this.mapping = e),
      (this.channel = 0),
      (this.wrapS = s),
      (this.wrapT = i),
      (this.magFilter = a),
      (this.minFilter = o),
      (this.anisotropy = c),
      (this.format = r),
      (this.internalFormat = null),
      (this.type = l),
      (this.offset = new Ee(0, 0)),
      (this.repeat = new Ee(1, 1)),
      (this.center = new Ee(0, 0)),
      (this.rotation = 0),
      (this.matrixAutoUpdate = !0),
      (this.matrix = new Je()),
      (this.generateMipmaps = !0),
      (this.premultiplyAlpha = !1),
      (this.flipY = !0),
      (this.unpackAlignment = 4),
      (this.colorSpace = f),
      (this.userData = {}),
      (this.updateRanges = []),
      (this.version = 0),
      (this.onUpdate = null),
      (this.renderTarget = null),
      (this.isRenderTargetTexture = !1),
      (this.isArrayTexture = !!(t && t.depth && t.depth > 1)),
      (this.pmremVersion = 0));
  }
  get width() {
    return this.source.getSize(hg).x;
  }
  get height() {
    return this.source.getSize(hg).y;
  }
  get depth() {
    return this.source.getSize(hg).z;
  }
  get image() {
    return this.source.data;
  }
  set image(t = null) {
    this.source.data = t;
  }
  updateMatrix() {
    this.matrix.setUvTransform(
      this.offset.x,
      this.offset.y,
      this.repeat.x,
      this.repeat.y,
      this.rotation,
      this.center.x,
      this.center.y,
    );
  }
  addUpdateRange(t, e) {
    this.updateRanges.push({ start: t, count: e });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return (
      (this.name = t.name),
      (this.source = t.source),
      (this.mipmaps = t.mipmaps.slice(0)),
      (this.mapping = t.mapping),
      (this.channel = t.channel),
      (this.wrapS = t.wrapS),
      (this.wrapT = t.wrapT),
      (this.magFilter = t.magFilter),
      (this.minFilter = t.minFilter),
      (this.anisotropy = t.anisotropy),
      (this.format = t.format),
      (this.internalFormat = t.internalFormat),
      (this.type = t.type),
      this.offset.copy(t.offset),
      this.repeat.copy(t.repeat),
      this.center.copy(t.center),
      (this.rotation = t.rotation),
      (this.matrixAutoUpdate = t.matrixAutoUpdate),
      this.matrix.copy(t.matrix),
      (this.generateMipmaps = t.generateMipmaps),
      (this.premultiplyAlpha = t.premultiplyAlpha),
      (this.flipY = t.flipY),
      (this.unpackAlignment = t.unpackAlignment),
      (this.colorSpace = t.colorSpace),
      (this.renderTarget = t.renderTarget),
      (this.isRenderTargetTexture = t.isRenderTargetTexture),
      (this.isArrayTexture = t.isArrayTexture),
      (this.userData = JSON.parse(JSON.stringify(t.userData))),
      (this.needsUpdate = !0),
      this
    );
  }
  setValues(t) {
    for (const e in t) {
      const s = t[e];
      if (s === void 0) {
        console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);
        continue;
      }
      const i = this[e];
      if (i === void 0) {
        console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);
        continue;
      }
      (i && s && i.isVector2 && s.isVector2) ||
      (i && s && i.isVector3 && s.isVector3) ||
      (i && s && i.isMatrix3 && s.isMatrix3)
        ? i.copy(s)
        : (this[e] = s);
    }
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == "string";
    if (!e && t.textures[this.uuid] !== void 0) return t.textures[this.uuid];
    const s = {
      metadata: { version: 4.7, type: "Texture", generator: "Texture.toJSON" },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(t).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment,
    };
    return (
      Object.keys(this.userData).length > 0 && (s.userData = this.userData),
      e || (t.textures[this.uuid] = s),
      s
    );
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  transformUv(t) {
    if (this.mapping !== aM) return t;
    if ((t.applyMatrix3(this.matrix), t.x < 0 || t.x > 1))
      switch (this.wrapS) {
        case mh:
          t.x = t.x - Math.floor(t.x);
          break;
        case co:
          t.x = t.x < 0 ? 0 : 1;
          break;
        case w5:
          Math.abs(Math.floor(t.x) % 2) === 1 ? (t.x = Math.ceil(t.x) - t.x) : (t.x = t.x - Math.floor(t.x));
          break;
      }
    if (t.y < 0 || t.y > 1)
      switch (this.wrapT) {
        case mh:
          t.y = t.y - Math.floor(t.y);
          break;
        case co:
          t.y = t.y < 0 ? 0 : 1;
          break;
        case w5:
          Math.abs(Math.floor(t.y) % 2) === 1 ? (t.y = Math.ceil(t.y) - t.y) : (t.y = t.y - Math.floor(t.y));
          break;
      }
    return (this.flipY && (t.y = 1 - t.y), t);
  }
  set needsUpdate(t) {
    t === !0 && (this.version++, (this.source.needsUpdate = !0));
  }
  set needsPMREMUpdate(t) {
    t === !0 && this.pmremVersion++;
  }
}

Vs.DEFAULT_IMAGE = null;

Vs.DEFAULT_MAPPING = aM;

Vs.DEFAULT_ANISOTROPY = 1;

class kn {
  constructor(t = 0, e = 0, s = 0, i = 1) {
    ((kn.prototype.isVector4 = !0), (this.x = t), (this.y = e), (this.z = s), (this.w = i));
  }
  get width() {
    return this.z;
  }
  set width(t) {
    this.z = t;
  }
  get height() {
    return this.w;
  }
  set height(t) {
    this.w = t;
  }
  set(t, e, s, i) {
    return ((this.x = t), (this.y = e), (this.z = s), (this.w = i), this);
  }
  setScalar(t) {
    return ((this.x = t), (this.y = t), (this.z = t), (this.w = t), this);
  }
  setX(t) {
    return ((this.x = t), this);
  }
  setY(t) {
    return ((this.y = t), this);
  }
  setZ(t) {
    return ((this.z = t), this);
  }
  setW(t) {
    return ((this.w = t), this);
  }
  setComponent(t, e) {
    switch (t) {
      case 0:
        this.x = e;
        break;
      case 1:
        this.y = e;
        break;
      case 2:
        this.z = e;
        break;
      case 3:
        this.w = e;
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
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(t) {
    return ((this.x = t.x), (this.y = t.y), (this.z = t.z), (this.w = t.w !== void 0 ? t.w : 1), this);
  }
  add(t) {
    return ((this.x += t.x), (this.y += t.y), (this.z += t.z), (this.w += t.w), this);
  }
  addScalar(t) {
    return ((this.x += t), (this.y += t), (this.z += t), (this.w += t), this);
  }
  addVectors(t, e) {
    return ((this.x = t.x + e.x), (this.y = t.y + e.y), (this.z = t.z + e.z), (this.w = t.w + e.w), this);
  }
  addScaledVector(t, e) {
    return ((this.x += t.x * e), (this.y += t.y * e), (this.z += t.z * e), (this.w += t.w * e), this);
  }
  sub(t) {
    return ((this.x -= t.x), (this.y -= t.y), (this.z -= t.z), (this.w -= t.w), this);
  }
  subScalar(t) {
    return ((this.x -= t), (this.y -= t), (this.z -= t), (this.w -= t), this);
  }
  subVectors(t, e) {
    return ((this.x = t.x - e.x), (this.y = t.y - e.y), (this.z = t.z - e.z), (this.w = t.w - e.w), this);
  }
  multiply(t) {
    return ((this.x *= t.x), (this.y *= t.y), (this.z *= t.z), (this.w *= t.w), this);
  }
  multiplyScalar(t) {
    return ((this.x *= t), (this.y *= t), (this.z *= t), (this.w *= t), this);
  }
  applyMatrix4(t) {
    const e = this.x,
      s = this.y,
      i = this.z,
      a = this.w,
      o = t.elements;
    return (
      (this.x = o[0] * e + o[4] * s + o[8] * i + o[12] * a),
      (this.y = o[1] * e + o[5] * s + o[9] * i + o[13] * a),
      (this.z = o[2] * e + o[6] * s + o[10] * i + o[14] * a),
      (this.w = o[3] * e + o[7] * s + o[11] * i + o[15] * a),
      this
    );
  }
  divide(t) {
    return ((this.x /= t.x), (this.y /= t.y), (this.z /= t.z), (this.w /= t.w), this);
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  setAxisAngleFromQuaternion(t) {
    this.w = 2 * Math.acos(t.w);
    const e = Math.sqrt(1 - t.w * t.w);
    return (
      e < 1e-4
        ? ((this.x = 1), (this.y = 0), (this.z = 0))
        : ((this.x = t.x / e), (this.y = t.y / e), (this.z = t.z / e)),
      this
    );
  }
  setAxisAngleFromRotationMatrix(t) {
    let e, s, i, a;
    const l = t.elements,
      c = l[0],
      f = l[4],
      d = l[8],
      h = l[1],
      u = l[5],
      m = l[9],
      x = l[2],
      p = l[6],
      g = l[10];
    if (Math.abs(f - h) < 0.01 && Math.abs(d - x) < 0.01 && Math.abs(m - p) < 0.01) {
      if (
        Math.abs(f + h) < 0.1 &&
        Math.abs(d + x) < 0.1 &&
        Math.abs(m + p) < 0.1 &&
        Math.abs(c + u + g - 3) < 0.1
      )
        return (this.set(1, 0, 0, 0), this);
      e = Math.PI;
      const v = (c + 1) / 2,
        _ = (u + 1) / 2,
        k = (g + 1) / 2,
        M = (f + h) / 4,
        S = (d + x) / 4,
        b = (m + p) / 4;
      return (
        v > _ && v > k
          ? v < 0.01
            ? ((s = 0), (i = 0.707106781), (a = 0.707106781))
            : ((s = Math.sqrt(v)), (i = M / s), (a = S / s))
          : _ > k
            ? _ < 0.01
              ? ((s = 0.707106781), (i = 0), (a = 0.707106781))
              : ((i = Math.sqrt(_)), (s = M / i), (a = b / i))
            : k < 0.01
              ? ((s = 0.707106781), (i = 0.707106781), (a = 0))
              : ((a = Math.sqrt(k)), (s = S / a), (i = b / a)),
        this.set(s, i, a, e),
        this
      );
    }
    let y = Math.sqrt((p - m) * (p - m) + (d - x) * (d - x) + (h - f) * (h - f));
    return (
      Math.abs(y) < 0.001 && (y = 1),
      (this.x = (p - m) / y),
      (this.y = (d - x) / y),
      (this.z = (h - f) / y),
      (this.w = Math.acos((c + u + g - 1) / 2)),
      this
    );
  }
  setFromMatrixPosition(t) {
    const e = t.elements;
    return ((this.x = e[12]), (this.y = e[13]), (this.z = e[14]), (this.w = e[15]), this);
  }
  min(t) {
    return (
      (this.x = Math.min(this.x, t.x)),
      (this.y = Math.min(this.y, t.y)),
      (this.z = Math.min(this.z, t.z)),
      (this.w = Math.min(this.w, t.w)),
      this
    );
  }
  max(t) {
    return (
      (this.x = Math.max(this.x, t.x)),
      (this.y = Math.max(this.y, t.y)),
      (this.z = Math.max(this.z, t.z)),
      (this.w = Math.max(this.w, t.w)),
      this
    );
  }
  clamp(t, e) {
    return (
      (this.x = vn(this.x, t.x, e.x)),
      (this.y = vn(this.y, t.y, e.y)),
      (this.z = vn(this.z, t.z, e.z)),
      (this.w = vn(this.w, t.w, e.w)),
      this
    );
  }
  clampScalar(t, e) {
    return (
      (this.x = vn(this.x, t, e)),
      (this.y = vn(this.y, t, e)),
      (this.z = vn(this.z, t, e)),
      (this.w = vn(this.w, t, e)),
      this
    );
  }
  clampLength(t, e) {
    const s = this.length();
    return this.divideScalar(s || 1).multiplyScalar(vn(s, t, e));
  }
  floor() {
    return (
      (this.x = Math.floor(this.x)),
      (this.y = Math.floor(this.y)),
      (this.z = Math.floor(this.z)),
      (this.w = Math.floor(this.w)),
      this
    );
  }
  ceil() {
    return (
      (this.x = Math.ceil(this.x)),
      (this.y = Math.ceil(this.y)),
      (this.z = Math.ceil(this.z)),
      (this.w = Math.ceil(this.w)),
      this
    );
  }
  round() {
    return (
      (this.x = Math.round(this.x)),
      (this.y = Math.round(this.y)),
      (this.z = Math.round(this.z)),
      (this.w = Math.round(this.w)),
      this
    );
  }
  roundToZero() {
    return (
      (this.x = Math.trunc(this.x)),
      (this.y = Math.trunc(this.y)),
      (this.z = Math.trunc(this.z)),
      (this.w = Math.trunc(this.w)),
      this
    );
  }
  negate() {
    return ((this.x = -this.x), (this.y = -this.y), (this.z = -this.z), (this.w = -this.w), this);
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, e) {
    return (
      (this.x += (t.x - this.x) * e),
      (this.y += (t.y - this.y) * e),
      (this.z += (t.z - this.z) * e),
      (this.w += (t.w - this.w) * e),
      this
    );
  }
  lerpVectors(t, e, s) {
    return (
      (this.x = t.x + (e.x - t.x) * s),
      (this.y = t.y + (e.y - t.y) * s),
      (this.z = t.z + (e.z - t.z) * s),
      (this.w = t.w + (e.w - t.w) * s),
      this
    );
  }
  equals(t) {
    return t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w;
  }
  fromArray(t, e = 0) {
    return ((this.x = t[e]), (this.y = t[e + 1]), (this.z = t[e + 2]), (this.w = t[e + 3]), this);
  }
  toArray(t = [], e = 0) {
    return ((t[e] = this.x), (t[e + 1] = this.y), (t[e + 2] = this.z), (t[e + 3] = this.w), t);
  }
  fromBufferAttribute(t, e) {
    return ((this.x = t.getX(e)), (this.y = t.getY(e)), (this.z = t.getZ(e)), (this.w = t.getW(e)), this);
  }
  random() {
    return (
      (this.x = Math.random()),
      (this.y = Math.random()),
      (this.z = Math.random()),
      (this.w = Math.random()),
      this
    );
  }
  *[Symbol.iterator]() {
    (yield this.x, yield this.y, yield this.z, yield this.w);
  }
}

class T7 extends Af {
  constructor(t = 1, e = 1, s = {}) {
    (super(),
      (s = Object.assign(
        {
          generateMipmaps: !1,
          internalFormat: null,
          minFilter: Ns,
          depthBuffer: !0,
          stencilBuffer: !1,
          resolveDepthBuffer: !0,
          resolveStencilBuffer: !0,
          depthTexture: null,
          samples: 0,
          count: 1,
          depth: 1,
          multiview: !1,
        },
        s,
      )),
      (this.isRenderTarget = !0),
      (this.width = t),
      (this.height = e),
      (this.depth = s.depth),
      (this.scissor = new kn(0, 0, t, e)),
      (this.scissorTest = !1),
      (this.viewport = new kn(0, 0, t, e)));
    const i = { width: t, height: e, depth: s.depth },
      a = new Vs(i);
    this.textures = [];
    const o = s.count;
    for (let r = 0; r < o; r++)
      ((this.textures[r] = a.clone()),
        (this.textures[r].isRenderTargetTexture = !0),
        (this.textures[r].renderTarget = this));
    (this._setTextureOptions(s),
      (this.depthBuffer = s.depthBuffer),
      (this.stencilBuffer = s.stencilBuffer),
      (this.resolveDepthBuffer = s.resolveDepthBuffer),
      (this.resolveStencilBuffer = s.resolveStencilBuffer),
      (this._depthTexture = null),
      (this.depthTexture = s.depthTexture),
      (this.samples = s.samples),
      (this.multiview = s.multiview));
  }
  _setTextureOptions(t = {}) {
    const e = { minFilter: Ns, generateMipmaps: !1, flipY: !1, internalFormat: null };
    (t.mapping !== void 0 && (e.mapping = t.mapping),
      t.wrapS !== void 0 && (e.wrapS = t.wrapS),
      t.wrapT !== void 0 && (e.wrapT = t.wrapT),
      t.wrapR !== void 0 && (e.wrapR = t.wrapR),
      t.magFilter !== void 0 && (e.magFilter = t.magFilter),
      t.minFilter !== void 0 && (e.minFilter = t.minFilter),
      t.format !== void 0 && (e.format = t.format),
      t.type !== void 0 && (e.type = t.type),
      t.anisotropy !== void 0 && (e.anisotropy = t.anisotropy),
      t.colorSpace !== void 0 && (e.colorSpace = t.colorSpace),
      t.flipY !== void 0 && (e.flipY = t.flipY),
      t.generateMipmaps !== void 0 && (e.generateMipmaps = t.generateMipmaps),
      t.internalFormat !== void 0 && (e.internalFormat = t.internalFormat));
    for (let s = 0; s < this.textures.length; s++) this.textures[s].setValues(e);
  }
  get texture() {
    return this.textures[0];
  }
  set texture(t) {
    this.textures[0] = t;
  }
  set depthTexture(t) {
    (this._depthTexture !== null && (this._depthTexture.renderTarget = null),
      t !== null && (t.renderTarget = this),
      (this._depthTexture = t));
  }
  get depthTexture() {
    return this._depthTexture;
  }
  setSize(t, e, s = 1) {
    if (this.width !== t || this.height !== e || this.depth !== s) {
      ((this.width = t), (this.height = e), (this.depth = s));
      for (let i = 0, a = this.textures.length; i < a; i++)
        ((this.textures[i].image.width = t),
          (this.textures[i].image.height = e),
          (this.textures[i].image.depth = s),
          (this.textures[i].isArrayTexture = this.textures[i].image.depth > 1));
      this.dispose();
    }
    (this.viewport.set(0, 0, t, e), this.scissor.set(0, 0, t, e));
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    ((this.width = t.width),
      (this.height = t.height),
      (this.depth = t.depth),
      this.scissor.copy(t.scissor),
      (this.scissorTest = t.scissorTest),
      this.viewport.copy(t.viewport),
      (this.textures.length = 0));
    for (let e = 0, s = t.textures.length; e < s; e++) {
      ((this.textures[e] = t.textures[e].clone()),
        (this.textures[e].isRenderTargetTexture = !0),
        (this.textures[e].renderTarget = this));
      const i = Object.assign({}, t.textures[e].image);
      this.textures[e].source = new Q3(i);
    }
    return (
      (this.depthBuffer = t.depthBuffer),
      (this.stencilBuffer = t.stencilBuffer),
      (this.resolveDepthBuffer = t.resolveDepthBuffer),
      (this.resolveStencilBuffer = t.resolveStencilBuffer),
      t.depthTexture !== null && (this.depthTexture = t.depthTexture.clone()),
      (this.samples = t.samples),
      this
    );
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}

class go extends T7 {
  constructor(t = 1, e = 1, s = {}) {
    (super(t, e, s), (this.isWebGLRenderTarget = !0));
  }
}

class mM extends Vs {
  constructor(t = null, e = 1, s = 1, i = 1) {
    (super(null),
      (this.isDataArrayTexture = !0),
      (this.image = { data: t, width: e, height: s, depth: i }),
      (this.magFilter = ti),
      (this.minFilter = ti),
      (this.wrapR = co),
      (this.generateMipmaps = !1),
      (this.flipY = !1),
      (this.unpackAlignment = 1),
      (this.layerUpdates = new Set()));
  }
  addLayerUpdate(t) {
    this.layerUpdates.add(t);
  }
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}

class E7 extends Vs {
  constructor(t = null, e = 1, s = 1, i = 1) {
    (super(null),
      (this.isData3DTexture = !0),
      (this.image = { data: t, width: e, height: s, depth: i }),
      (this.magFilter = ti),
      (this.minFilter = ti),
      (this.wrapR = co),
      (this.generateMipmaps = !1),
      (this.flipY = !1),
      (this.unpackAlignment = 1));
  }
}

class $l {
  constructor(t = new dt(1 / 0, 1 / 0, 1 / 0), e = new dt(-1 / 0, -1 / 0, -1 / 0)) {
    ((this.isBox3 = !0), (this.min = t), (this.max = e));
  }
  set(t, e) {
    return (this.min.copy(t), this.max.copy(e), this);
  }
  setFromArray(t) {
    this.makeEmpty();
    for (let e = 0, s = t.length; e < s; e += 3) this.expandByPoint(qa.fromArray(t, e));
    return this;
  }
  setFromBufferAttribute(t) {
    this.makeEmpty();
    for (let e = 0, s = t.count; e < s; e++) this.expandByPoint(qa.fromBufferAttribute(t, e));
    return this;
  }
  setFromPoints(t) {
    this.makeEmpty();
    for (let e = 0, s = t.length; e < s; e++) this.expandByPoint(t[e]);
    return this;
  }
  setFromCenterAndSize(t, e) {
    const s = qa.copy(e).multiplyScalar(0.5);
    return (this.min.copy(t).sub(s), this.max.copy(t).add(s), this);
  }
  setFromObject(t, e = !1) {
    return (this.makeEmpty(), this.expandByObject(t, e));
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return (this.min.copy(t.min), this.max.copy(t.max), this);
  }
  makeEmpty() {
    return (
      (this.min.x = this.min.y = this.min.z = 1 / 0),
      (this.max.x = this.max.y = this.max.z = -1 / 0),
      this
    );
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(t) {
    return this.isEmpty() ? t.set(0, 0, 0) : t.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(t) {
    return this.isEmpty() ? t.set(0, 0, 0) : t.subVectors(this.max, this.min);
  }
  expandByPoint(t) {
    return (this.min.min(t), this.max.max(t), this);
  }
  expandByVector(t) {
    return (this.min.sub(t), this.max.add(t), this);
  }
  expandByScalar(t) {
    return (this.min.addScalar(-t), this.max.addScalar(t), this);
  }
  expandByObject(t, e = !1) {
    t.updateWorldMatrix(!1, !1);
    const s = t.geometry;
    if (s !== void 0) {
      const a = s.getAttribute("position");
      if (e === !0 && a !== void 0 && t.isInstancedMesh !== !0)
        for (let o = 0, r = a.count; o < r; o++)
          (t.isMesh === !0 ? t.getVertexPosition(o, qa) : qa.fromBufferAttribute(a, o),
            qa.applyMatrix4(t.matrixWorld),
            this.expandByPoint(qa));
      else
        (t.boundingBox !== void 0
          ? (t.boundingBox === null && t.computeBoundingBox(), mu.copy(t.boundingBox))
          : (s.boundingBox === null && s.computeBoundingBox(), mu.copy(s.boundingBox)),
          mu.applyMatrix4(t.matrixWorld),
          this.union(mu));
    }
    const i = t.children;
    for (let a = 0, o = i.length; a < o; a++) this.expandByObject(i[a], e);
    return this;
  }
  containsPoint(t) {
    return (
      t.x >= this.min.x &&
      t.x <= this.max.x &&
      t.y >= this.min.y &&
      t.y <= this.max.y &&
      t.z >= this.min.z &&
      t.z <= this.max.z
    );
  }
  containsBox(t) {
    return (
      this.min.x <= t.min.x &&
      t.max.x <= this.max.x &&
      this.min.y <= t.min.y &&
      t.max.y <= this.max.y &&
      this.min.z <= t.min.z &&
      t.max.z <= this.max.z
    );
  }
  getParameter(t, e) {
    return e.set(
      (t.x - this.min.x) / (this.max.x - this.min.x),
      (t.y - this.min.y) / (this.max.y - this.min.y),
      (t.z - this.min.z) / (this.max.z - this.min.z),
    );
  }
  intersectsBox(t) {
    return (
      t.max.x >= this.min.x &&
      t.min.x <= this.max.x &&
      t.max.y >= this.min.y &&
      t.min.y <= this.max.y &&
      t.max.z >= this.min.z &&
      t.min.z <= this.max.z
    );
  }
  intersectsSphere(t) {
    return (this.clampPoint(t.center, qa), qa.distanceToSquared(t.center) <= t.radius * t.radius);
  }
  intersectsPlane(t) {
    let e, s;
    return (
      t.normal.x > 0
        ? ((e = t.normal.x * this.min.x), (s = t.normal.x * this.max.x))
        : ((e = t.normal.x * this.max.x), (s = t.normal.x * this.min.x)),
      t.normal.y > 0
        ? ((e += t.normal.y * this.min.y), (s += t.normal.y * this.max.y))
        : ((e += t.normal.y * this.max.y), (s += t.normal.y * this.min.y)),
      t.normal.z > 0
        ? ((e += t.normal.z * this.min.z), (s += t.normal.z * this.max.z))
        : ((e += t.normal.z * this.max.z), (s += t.normal.z * this.min.z)),
      e <= -t.constant && s >= -t.constant
    );
  }
  intersectsTriangle(t) {
    if (this.isEmpty()) return !1;
    (this.getCenter(Zf),
      gu.subVectors(this.max, Zf),
      sc.subVectors(t.a, Zf),
      ic.subVectors(t.b, Zf),
      ac.subVectors(t.c, Zf),
      Gr.subVectors(ic, sc),
      Vr.subVectors(ac, ic),
      j0.subVectors(sc, ac));
    let e = [
      0,
      -Gr.z,
      Gr.y,
      0,
      -Vr.z,
      Vr.y,
      0,
      -j0.z,
      j0.y,
      Gr.z,
      0,
      -Gr.x,
      Vr.z,
      0,
      -Vr.x,
      j0.z,
      0,
      -j0.x,
      -Gr.y,
      Gr.x,
      0,
      -Vr.y,
      Vr.x,
      0,
      -j0.y,
      j0.x,
      0,
    ];
    return !ug(e, sc, ic, ac, gu) || ((e = [1, 0, 0, 0, 1, 0, 0, 0, 1]), !ug(e, sc, ic, ac, gu))
      ? !1
      : (xu.crossVectors(Gr, Vr), (e = [xu.x, xu.y, xu.z]), ug(e, sc, ic, ac, gu));
  }
  clampPoint(t, e) {
    return e.copy(t).clamp(this.min, this.max);
  }
  distanceToPoint(t) {
    return this.clampPoint(t, qa).distanceTo(t);
  }
  getBoundingSphere(t) {
    return (
      this.isEmpty()
        ? t.makeEmpty()
        : (this.getCenter(t.center), (t.radius = this.getSize(qa).length() * 0.5)),
      t
    );
  }
  intersect(t) {
    return (this.min.max(t.min), this.max.min(t.max), this.isEmpty() && this.makeEmpty(), this);
  }
  union(t) {
    return (this.min.min(t.min), this.max.max(t.max), this);
  }
  applyMatrix4(t) {
    return this.isEmpty()
      ? this
      : (sr[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t),
        sr[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t),
        sr[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t),
        sr[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t),
        sr[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t),
        sr[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t),
        sr[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t),
        sr[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t),
        this.setFromPoints(sr),
        this);
  }
  translate(t) {
    return (this.min.add(t), this.max.add(t), this);
  }
  equals(t) {
    return t.min.equals(this.min) && t.max.equals(this.max);
  }
  toJSON() {
    return { min: this.min.toArray(), max: this.max.toArray() };
  }
  fromJSON(t) {
    return (this.min.fromArray(t.min), this.max.fromArray(t.max), this);
  }
}

const sr = [new dt(), new dt(), new dt(), new dt(), new dt(), new dt(), new dt(), new dt()],
  qa = new dt(),
  mu = new $l(),
  sc = new dt(),
  ic = new dt(),
  ac = new dt(),
  Gr = new dt(),
  Vr = new dt(),
  j0 = new dt(),
  Zf = new dt(),
  gu = new dt(),
  xu = new dt(),
  q0 = new dt();

function ug(n, t, e, s, i) {
  for (let a = 0, o = n.length - 3; a <= o; a += 3) {
    q0.fromArray(n, a);
    const r = i.x * Math.abs(q0.x) + i.y * Math.abs(q0.y) + i.z * Math.abs(q0.z),
      l = t.dot(q0),
      c = e.dot(q0),
      f = s.dot(q0);
    if (Math.max(-Math.max(l, c, f), Math.min(l, c, f)) > r) return !1;
  }
  return !0;
}

const A7 = new $l(),
  Qf = new dt(),
  pg = new dt();

class Rf {
  constructor(t = new dt(), e = -1) {
    ((this.isSphere = !0), (this.center = t), (this.radius = e));
  }
  set(t, e) {
    return (this.center.copy(t), (this.radius = e), this);
  }
  setFromPoints(t, e) {
    const s = this.center;
    e !== void 0 ? s.copy(e) : A7.setFromPoints(t).getCenter(s);
    let i = 0;
    for (let a = 0, o = t.length; a < o; a++) i = Math.max(i, s.distanceToSquared(t[a]));
    return ((this.radius = Math.sqrt(i)), this);
  }
  copy(t) {
    return (this.center.copy(t.center), (this.radius = t.radius), this);
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return (this.center.set(0, 0, 0), (this.radius = -1), this);
  }
  containsPoint(t) {
    return t.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(t) {
    return t.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(t) {
    const e = this.radius + t.radius;
    return t.center.distanceToSquared(this.center) <= e * e;
  }
  intersectsBox(t) {
    return t.intersectsSphere(this);
  }
  intersectsPlane(t) {
    return Math.abs(t.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(t, e) {
    const s = this.center.distanceToSquared(t);
    return (
      e.copy(t),
      s > this.radius * this.radius &&
        (e.sub(this.center).normalize(), e.multiplyScalar(this.radius).add(this.center)),
      e
    );
  }
  getBoundingBox(t) {
    return this.isEmpty()
      ? (t.makeEmpty(), t)
      : (t.set(this.center, this.center), t.expandByScalar(this.radius), t);
  }
  applyMatrix4(t) {
    return (this.center.applyMatrix4(t), (this.radius = this.radius * t.getMaxScaleOnAxis()), this);
  }
  translate(t) {
    return (this.center.add(t), this);
  }
  expandByPoint(t) {
    if (this.isEmpty()) return (this.center.copy(t), (this.radius = 0), this);
    Qf.subVectors(t, this.center);
    const e = Qf.lengthSq();
    if (e > this.radius * this.radius) {
      const s = Math.sqrt(e),
        i = (s - this.radius) * 0.5;
      (this.center.addScaledVector(Qf, i / s), (this.radius += i));
    }
    return this;
  }
  union(t) {
    return t.isEmpty()
      ? this
      : this.isEmpty()
        ? (this.copy(t), this)
        : (this.center.equals(t.center) === !0
            ? (this.radius = Math.max(this.radius, t.radius))
            : (pg.subVectors(t.center, this.center).setLength(t.radius),
              this.expandByPoint(Qf.copy(t.center).add(pg)),
              this.expandByPoint(Qf.copy(t.center).sub(pg))),
          this);
  }
  equals(t) {
    return t.center.equals(this.center) && t.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    return { radius: this.radius, center: this.center.toArray() };
  }
  fromJSON(t) {
    return ((this.radius = t.radius), this.center.fromArray(t.center), this);
  }
}

const ir = new dt(),
  mg = new dt(),
  yu = new dt(),
  Wr = new dt(),
  gg = new dt(),
  vu = new dt(),
  xg = new dt();

class J3 {
  constructor(t = new dt(), e = new dt(0, 0, -1)) {
    ((this.origin = t), (this.direction = e));
  }
  set(t, e) {
    return (this.origin.copy(t), this.direction.copy(e), this);
  }
  copy(t) {
    return (this.origin.copy(t.origin), this.direction.copy(t.direction), this);
  }
  at(t, e) {
    return e.copy(this.origin).addScaledVector(this.direction, t);
  }
  lookAt(t) {
    return (this.direction.copy(t).sub(this.origin).normalize(), this);
  }
  recast(t) {
    return (this.origin.copy(this.at(t, ir)), this);
  }
  closestPointToPoint(t, e) {
    e.subVectors(t, this.origin);
    const s = e.dot(this.direction);
    return s < 0 ? e.copy(this.origin) : e.copy(this.origin).addScaledVector(this.direction, s);
  }
  distanceToPoint(t) {
    return Math.sqrt(this.distanceSqToPoint(t));
  }
  distanceSqToPoint(t) {
    const e = ir.subVectors(t, this.origin).dot(this.direction);
    return e < 0
      ? this.origin.distanceToSquared(t)
      : (ir.copy(this.origin).addScaledVector(this.direction, e), ir.distanceToSquared(t));
  }
  distanceSqToSegment(t, e, s, i) {
    (mg.copy(t).add(e).multiplyScalar(0.5), yu.copy(e).sub(t).normalize(), Wr.copy(this.origin).sub(mg));
    const a = t.distanceTo(e) * 0.5,
      o = -this.direction.dot(yu),
      r = Wr.dot(this.direction),
      l = -Wr.dot(yu),
      c = Wr.lengthSq(),
      f = Math.abs(1 - o * o);
    let d, h, u, m;
    if (f > 0)
      if (((d = o * l - r), (h = o * r - l), (m = a * f), d >= 0))
        if (h >= -m)
          if (h <= m) {
            const x = 1 / f;
            ((d *= x), (h *= x), (u = d * (d + o * h + 2 * r) + h * (o * d + h + 2 * l) + c));
          } else ((h = a), (d = Math.max(0, -(o * h + r))), (u = -d * d + h * (h + 2 * l) + c));
        else ((h = -a), (d = Math.max(0, -(o * h + r))), (u = -d * d + h * (h + 2 * l) + c));
      else
        h <= -m
          ? ((d = Math.max(0, -(-o * a + r))),
            (h = d > 0 ? -a : Math.min(Math.max(-a, -l), a)),
            (u = -d * d + h * (h + 2 * l) + c))
          : h <= m
            ? ((d = 0), (h = Math.min(Math.max(-a, -l), a)), (u = h * (h + 2 * l) + c))
            : ((d = Math.max(0, -(o * a + r))),
              (h = d > 0 ? a : Math.min(Math.max(-a, -l), a)),
              (u = -d * d + h * (h + 2 * l) + c));
    else ((h = o > 0 ? -a : a), (d = Math.max(0, -(o * h + r))), (u = -d * d + h * (h + 2 * l) + c));
    return (
      s && s.copy(this.origin).addScaledVector(this.direction, d),
      i && i.copy(mg).addScaledVector(yu, h),
      u
    );
  }
  intersectSphere(t, e) {
    ir.subVectors(t.center, this.origin);
    const s = ir.dot(this.direction),
      i = ir.dot(ir) - s * s,
      a = t.radius * t.radius;
    if (i > a) return null;
    const o = Math.sqrt(a - i),
      r = s - o,
      l = s + o;
    return l < 0 ? null : r < 0 ? this.at(l, e) : this.at(r, e);
  }
  intersectsSphere(t) {
    return t.radius < 0 ? !1 : this.distanceSqToPoint(t.center) <= t.radius * t.radius;
  }
  distanceToPlane(t) {
    const e = t.normal.dot(this.direction);
    if (e === 0) return t.distanceToPoint(this.origin) === 0 ? 0 : null;
    const s = -(this.origin.dot(t.normal) + t.constant) / e;
    return s >= 0 ? s : null;
  }
  intersectPlane(t, e) {
    const s = this.distanceToPlane(t);
    return s === null ? null : this.at(s, e);
  }
  intersectsPlane(t) {
    const e = t.distanceToPoint(this.origin);
    return e === 0 || t.normal.dot(this.direction) * e < 0;
  }
  intersectBox(t, e) {
    let s, i, a, o, r, l;
    const c = 1 / this.direction.x,
      f = 1 / this.direction.y,
      d = 1 / this.direction.z,
      h = this.origin;
    return (
      c >= 0
        ? ((s = (t.min.x - h.x) * c), (i = (t.max.x - h.x) * c))
        : ((s = (t.max.x - h.x) * c), (i = (t.min.x - h.x) * c)),
      f >= 0
        ? ((a = (t.min.y - h.y) * f), (o = (t.max.y - h.y) * f))
        : ((a = (t.max.y - h.y) * f), (o = (t.min.y - h.y) * f)),
      s > o ||
      a > i ||
      ((a > s || isNaN(s)) && (s = a),
      (o < i || isNaN(i)) && (i = o),
      d >= 0
        ? ((r = (t.min.z - h.z) * d), (l = (t.max.z - h.z) * d))
        : ((r = (t.max.z - h.z) * d), (l = (t.min.z - h.z) * d)),
      s > l || r > i) ||
      ((r > s || s !== s) && (s = r), (l < i || i !== i) && (i = l), i < 0)
        ? null
        : this.at(s >= 0 ? s : i, e)
    );
  }
  intersectsBox(t) {
    return this.intersectBox(t, ir) !== null;
  }
  intersectTriangle(t, e, s, i, a) {
    (gg.subVectors(e, t), vu.subVectors(s, t), xg.crossVectors(gg, vu));
    let o = this.direction.dot(xg),
      r;
    if (o > 0) {
      if (i) return null;
      r = 1;
    } else if (o < 0) ((r = -1), (o = -o));
    else return null;
    Wr.subVectors(this.origin, t);
    const l = r * this.direction.dot(vu.crossVectors(Wr, vu));
    if (l < 0) return null;
    const c = r * this.direction.dot(gg.cross(Wr));
    if (c < 0 || l + c > o) return null;
    const f = -r * Wr.dot(xg);
    return f < 0 ? null : this.at(f / o, a);
  }
  applyMatrix4(t) {
    return (this.origin.applyMatrix4(t), this.direction.transformDirection(t), this);
  }
  equals(t) {
    return t.origin.equals(this.origin) && t.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
export { Ri, dt, Je, pM, N1, b7, bh, _7, In, Tr, Zc, Q3, Vs, kn, go, mM, E7, $l, Rf, J3 };
