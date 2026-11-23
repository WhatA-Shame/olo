// 07-three-3.js — three｜48 个顶层语句｜68KB
// 对应 game.pretty.js 第 11724–13948 行
// 关键内容：
//   Bn                    BufferGeometry
//   Sn                    Mesh
//   Oh                    BoxGeometry
//   An                    ShaderMaterial
//   bM                    Camera
//   Yi                    PerspectiveCamera
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { Af, C0, Ee, Fo, Ns, Q5, Rr, Sr, Uo, X3, Z5, ff, fo, pi, qn, rg, ti, z1, zo } from './04-audio-2.js';
import { $l, In, J3, Je, Rf, Vs, dt, go, pM } from './05-three.js';
import { Es, Ke, Mu, Uh, Ut, Ws, oo, sa, yM } from './06-three-2.js';

let N7 = 0;

class On {
  constructor(t, e, s = !1) {
    if (Array.isArray(t)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    ((this.isBufferAttribute = !0),
      Object.defineProperty(this, "id", { value: N7++ }),
      (this.name = ""),
      (this.array = t),
      (this.itemSize = e),
      (this.count = t !== void 0 ? t.length / e : 0),
      (this.normalized = s),
      (this.usage = Z5),
      (this.updateRanges = []),
      (this.gpuType = fo),
      (this.version = 0));
  }
  onUploadCallback() {}
  set needsUpdate(t) {
    t === !0 && this.version++;
  }
  setUsage(t) {
    return ((this.usage = t), this);
  }
  addUpdateRange(t, e) {
    this.updateRanges.push({ start: t, count: e });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(t) {
    return (
      (this.name = t.name),
      (this.array = new t.array.constructor(t.array)),
      (this.itemSize = t.itemSize),
      (this.count = t.count),
      (this.normalized = t.normalized),
      (this.usage = t.usage),
      (this.gpuType = t.gpuType),
      this
    );
  }
  copyAt(t, e, s) {
    ((t *= this.itemSize), (s *= e.itemSize));
    for (let i = 0, a = this.itemSize; i < a; i++) this.array[t + i] = e.array[s + i];
    return this;
  }
  copyArray(t) {
    return (this.array.set(t), this);
  }
  applyMatrix3(t) {
    if (this.itemSize === 2)
      for (let e = 0, s = this.count; e < s; e++)
        (Mu.fromBufferAttribute(this, e), Mu.applyMatrix3(t), this.setXY(e, Mu.x, Mu.y));
    else if (this.itemSize === 3)
      for (let e = 0, s = this.count; e < s; e++)
        (Es.fromBufferAttribute(this, e), Es.applyMatrix3(t), this.setXYZ(e, Es.x, Es.y, Es.z));
    return this;
  }
  applyMatrix4(t) {
    for (let e = 0, s = this.count; e < s; e++)
      (Es.fromBufferAttribute(this, e), Es.applyMatrix4(t), this.setXYZ(e, Es.x, Es.y, Es.z));
    return this;
  }
  applyNormalMatrix(t) {
    for (let e = 0, s = this.count; e < s; e++)
      (Es.fromBufferAttribute(this, e), Es.applyNormalMatrix(t), this.setXYZ(e, Es.x, Es.y, Es.z));
    return this;
  }
  transformDirection(t) {
    for (let e = 0, s = this.count; e < s; e++)
      (Es.fromBufferAttribute(this, e), Es.transformDirection(t), this.setXYZ(e, Es.x, Es.y, Es.z));
    return this;
  }
  set(t, e = 0) {
    return (this.array.set(t, e), this);
  }
  getComponent(t, e) {
    let s = this.array[t * this.itemSize + e];
    return (this.normalized && (s = zo(s, this.array)), s);
  }
  setComponent(t, e, s) {
    return (this.normalized && (s = qn(s, this.array)), (this.array[t * this.itemSize + e] = s), this);
  }
  getX(t) {
    let e = this.array[t * this.itemSize];
    return (this.normalized && (e = zo(e, this.array)), e);
  }
  setX(t, e) {
    return (this.normalized && (e = qn(e, this.array)), (this.array[t * this.itemSize] = e), this);
  }
  getY(t) {
    let e = this.array[t * this.itemSize + 1];
    return (this.normalized && (e = zo(e, this.array)), e);
  }
  setY(t, e) {
    return (this.normalized && (e = qn(e, this.array)), (this.array[t * this.itemSize + 1] = e), this);
  }
  getZ(t) {
    let e = this.array[t * this.itemSize + 2];
    return (this.normalized && (e = zo(e, this.array)), e);
  }
  setZ(t, e) {
    return (this.normalized && (e = qn(e, this.array)), (this.array[t * this.itemSize + 2] = e), this);
  }
  getW(t) {
    let e = this.array[t * this.itemSize + 3];
    return (this.normalized && (e = zo(e, this.array)), e);
  }
  setW(t, e) {
    return (this.normalized && (e = qn(e, this.array)), (this.array[t * this.itemSize + 3] = e), this);
  }
  setXY(t, e, s) {
    return (
      (t *= this.itemSize),
      this.normalized && ((e = qn(e, this.array)), (s = qn(s, this.array))),
      (this.array[t + 0] = e),
      (this.array[t + 1] = s),
      this
    );
  }
  setXYZ(t, e, s, i) {
    return (
      (t *= this.itemSize),
      this.normalized && ((e = qn(e, this.array)), (s = qn(s, this.array)), (i = qn(i, this.array))),
      (this.array[t + 0] = e),
      (this.array[t + 1] = s),
      (this.array[t + 2] = i),
      this
    );
  }
  setXYZW(t, e, s, i, a) {
    return (
      (t *= this.itemSize),
      this.normalized &&
        ((e = qn(e, this.array)), (s = qn(s, this.array)), (i = qn(i, this.array)), (a = qn(a, this.array))),
      (this.array[t + 0] = e),
      (this.array[t + 1] = s),
      (this.array[t + 2] = i),
      (this.array[t + 3] = a),
      this
    );
  }
  onUpload(t) {
    return ((this.onUploadCallback = t), this);
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const t = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized,
    };
    return (this.name !== "" && (t.name = this.name), this.usage !== Z5 && (t.usage = this.usage), t);
  }
}

class hm extends On {
  constructor(t, e, s) {
    super(new Uint16Array(t), e, s);
  }
}

class um extends On {
  constructor(t, e, s) {
    super(new Uint32Array(t), e, s);
  }
}

class Ae extends On {
  constructor(t, e, s) {
    super(new Float32Array(t), e, s);
  }
}

let F7 = 0;

const Ta = new Ke(),
  Eg = new Ws(),
  dc = new dt(),
  da = new $l(),
  td = new $l(),
  Bs = new dt();

class Bn extends Af {
  constructor() {
    (super(),
      (this.isBufferGeometry = !0),
      Object.defineProperty(this, "id", { value: F7++ }),
      (this.uuid = C0()),
      (this.name = ""),
      (this.type = "BufferGeometry"),
      (this.index = null),
      (this.indirect = null),
      (this.attributes = {}),
      (this.morphAttributes = {}),
      (this.morphTargetsRelative = !1),
      (this.groups = []),
      (this.boundingBox = null),
      (this.boundingSphere = null),
      (this.drawRange = { start: 0, count: 1 / 0 }),
      (this.userData = {}));
  }
  getIndex() {
    return this.index;
  }
  setIndex(t) {
    return (Array.isArray(t) ? (this.index = new (pM(t) ? um : hm)(t, 1)) : (this.index = t), this);
  }
  setIndirect(t) {
    return ((this.indirect = t), this);
  }
  getIndirect() {
    return this.indirect;
  }
  getAttribute(t) {
    return this.attributes[t];
  }
  setAttribute(t, e) {
    return ((this.attributes[t] = e), this);
  }
  deleteAttribute(t) {
    return (delete this.attributes[t], this);
  }
  hasAttribute(t) {
    return this.attributes[t] !== void 0;
  }
  addGroup(t, e, s = 0) {
    this.groups.push({ start: t, count: e, materialIndex: s });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(t, e) {
    ((this.drawRange.start = t), (this.drawRange.count = e));
  }
  applyMatrix4(t) {
    const e = this.attributes.position;
    e !== void 0 && (e.applyMatrix4(t), (e.needsUpdate = !0));
    const s = this.attributes.normal;
    if (s !== void 0) {
      const a = new Je().getNormalMatrix(t);
      (s.applyNormalMatrix(a), (s.needsUpdate = !0));
    }
    const i = this.attributes.tangent;
    return (
      i !== void 0 && (i.transformDirection(t), (i.needsUpdate = !0)),
      this.boundingBox !== null && this.computeBoundingBox(),
      this.boundingSphere !== null && this.computeBoundingSphere(),
      this
    );
  }
  applyQuaternion(t) {
    return (Ta.makeRotationFromQuaternion(t), this.applyMatrix4(Ta), this);
  }
  rotateX(t) {
    return (Ta.makeRotationX(t), this.applyMatrix4(Ta), this);
  }
  rotateY(t) {
    return (Ta.makeRotationY(t), this.applyMatrix4(Ta), this);
  }
  rotateZ(t) {
    return (Ta.makeRotationZ(t), this.applyMatrix4(Ta), this);
  }
  translate(t, e, s) {
    return (Ta.makeTranslation(t, e, s), this.applyMatrix4(Ta), this);
  }
  scale(t, e, s) {
    return (Ta.makeScale(t, e, s), this.applyMatrix4(Ta), this);
  }
  lookAt(t) {
    return (Eg.lookAt(t), Eg.updateMatrix(), this.applyMatrix4(Eg.matrix), this);
  }
  center() {
    return (
      this.computeBoundingBox(),
      this.boundingBox.getCenter(dc).negate(),
      this.translate(dc.x, dc.y, dc.z),
      this
    );
  }
  setFromPoints(t) {
    const e = this.getAttribute("position");
    if (e === void 0) {
      const s = [];
      for (let i = 0, a = t.length; i < a; i++) {
        const o = t[i];
        s.push(o.x, o.y, o.z || 0);
      }
      this.setAttribute("position", new Ae(s, 3));
    } else {
      const s = Math.min(t.length, e.count);
      for (let i = 0; i < s; i++) {
        const a = t[i];
        e.setXYZ(i, a.x, a.y, a.z || 0);
      }
      (t.length > e.count &&
        console.warn(
          "THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.",
        ),
        (e.needsUpdate = !0));
    }
    return this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new $l());
    const t = this.attributes.position,
      e = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      (console.error(
        "THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",
        this,
      ),
        this.boundingBox.set(new dt(-1 / 0, -1 / 0, -1 / 0), new dt(1 / 0, 1 / 0, 1 / 0)));
      return;
    }
    if (t !== void 0) {
      if ((this.boundingBox.setFromBufferAttribute(t), e))
        for (let s = 0, i = e.length; s < i; s++) {
          const a = e[s];
          (da.setFromBufferAttribute(a),
            this.morphTargetsRelative
              ? (Bs.addVectors(this.boundingBox.min, da.min),
                this.boundingBox.expandByPoint(Bs),
                Bs.addVectors(this.boundingBox.max, da.max),
                this.boundingBox.expandByPoint(Bs))
              : (this.boundingBox.expandByPoint(da.min), this.boundingBox.expandByPoint(da.max)));
        }
    } else this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) &&
      console.error(
        'THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',
        this,
      );
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new Rf());
    const t = this.attributes.position,
      e = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      (console.error(
        "THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",
        this,
      ),
        this.boundingSphere.set(new dt(), 1 / 0));
      return;
    }
    if (t) {
      const s = this.boundingSphere.center;
      if ((da.setFromBufferAttribute(t), e))
        for (let a = 0, o = e.length; a < o; a++) {
          const r = e[a];
          (td.setFromBufferAttribute(r),
            this.morphTargetsRelative
              ? (Bs.addVectors(da.min, td.min),
                da.expandByPoint(Bs),
                Bs.addVectors(da.max, td.max),
                da.expandByPoint(Bs))
              : (da.expandByPoint(td.min), da.expandByPoint(td.max)));
        }
      da.getCenter(s);
      let i = 0;
      for (let a = 0, o = t.count; a < o; a++)
        (Bs.fromBufferAttribute(t, a), (i = Math.max(i, s.distanceToSquared(Bs))));
      if (e)
        for (let a = 0, o = e.length; a < o; a++) {
          const r = e[a],
            l = this.morphTargetsRelative;
          for (let c = 0, f = r.count; c < f; c++)
            (Bs.fromBufferAttribute(r, c),
              l && (dc.fromBufferAttribute(t, c), Bs.add(dc)),
              (i = Math.max(i, s.distanceToSquared(Bs))));
        }
      ((this.boundingSphere.radius = Math.sqrt(i)),
        isNaN(this.boundingSphere.radius) &&
          console.error(
            'THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',
            this,
          ));
    }
  }
  computeTangents() {
    const t = this.index,
      e = this.attributes;
    if (t === null || e.position === void 0 || e.normal === void 0 || e.uv === void 0) {
      console.error(
        "THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)",
      );
      return;
    }
    const s = e.position,
      i = e.normal,
      a = e.uv;
    this.hasAttribute("tangent") === !1 &&
      this.setAttribute("tangent", new On(new Float32Array(4 * s.count), 4));
    const o = this.getAttribute("tangent"),
      r = [],
      l = [];
    for (let b = 0; b < s.count; b++) ((r[b] = new dt()), (l[b] = new dt()));
    const c = new dt(),
      f = new dt(),
      d = new dt(),
      h = new Ee(),
      u = new Ee(),
      m = new Ee(),
      x = new dt(),
      p = new dt();
    function g(b, w, T) {
      (c.fromBufferAttribute(s, b),
        f.fromBufferAttribute(s, w),
        d.fromBufferAttribute(s, T),
        h.fromBufferAttribute(a, b),
        u.fromBufferAttribute(a, w),
        m.fromBufferAttribute(a, T),
        f.sub(c),
        d.sub(c),
        u.sub(h),
        m.sub(h));
      const E = 1 / (u.x * m.y - m.x * u.y);
      isFinite(E) &&
        (x.copy(f).multiplyScalar(m.y).addScaledVector(d, -u.y).multiplyScalar(E),
        p.copy(d).multiplyScalar(u.x).addScaledVector(f, -m.x).multiplyScalar(E),
        r[b].add(x),
        r[w].add(x),
        r[T].add(x),
        l[b].add(p),
        l[w].add(p),
        l[T].add(p));
    }
    let y = this.groups;
    y.length === 0 && (y = [{ start: 0, count: t.count }]);
    for (let b = 0, w = y.length; b < w; ++b) {
      const T = y[b],
        E = T.start,
        A = T.count;
      for (let C = E, R = E + A; C < R; C += 3) g(t.getX(C + 0), t.getX(C + 1), t.getX(C + 2));
    }
    const v = new dt(),
      _ = new dt(),
      k = new dt(),
      M = new dt();
    function S(b) {
      (k.fromBufferAttribute(i, b), M.copy(k));
      const w = r[b];
      (v.copy(w), v.sub(k.multiplyScalar(k.dot(w))).normalize(), _.crossVectors(M, w));
      const E = _.dot(l[b]) < 0 ? -1 : 1;
      o.setXYZW(b, v.x, v.y, v.z, E);
    }
    for (let b = 0, w = y.length; b < w; ++b) {
      const T = y[b],
        E = T.start,
        A = T.count;
      for (let C = E, R = E + A; C < R; C += 3) (S(t.getX(C + 0)), S(t.getX(C + 1)), S(t.getX(C + 2)));
    }
  }
  computeVertexNormals() {
    const t = this.index,
      e = this.getAttribute("position");
    if (e !== void 0) {
      let s = this.getAttribute("normal");
      if (s === void 0) ((s = new On(new Float32Array(e.count * 3), 3)), this.setAttribute("normal", s));
      else for (let h = 0, u = s.count; h < u; h++) s.setXYZ(h, 0, 0, 0);
      const i = new dt(),
        a = new dt(),
        o = new dt(),
        r = new dt(),
        l = new dt(),
        c = new dt(),
        f = new dt(),
        d = new dt();
      if (t)
        for (let h = 0, u = t.count; h < u; h += 3) {
          const m = t.getX(h + 0),
            x = t.getX(h + 1),
            p = t.getX(h + 2);
          (i.fromBufferAttribute(e, m),
            a.fromBufferAttribute(e, x),
            o.fromBufferAttribute(e, p),
            f.subVectors(o, a),
            d.subVectors(i, a),
            f.cross(d),
            r.fromBufferAttribute(s, m),
            l.fromBufferAttribute(s, x),
            c.fromBufferAttribute(s, p),
            r.add(f),
            l.add(f),
            c.add(f),
            s.setXYZ(m, r.x, r.y, r.z),
            s.setXYZ(x, l.x, l.y, l.z),
            s.setXYZ(p, c.x, c.y, c.z));
        }
      else
        for (let h = 0, u = e.count; h < u; h += 3)
          (i.fromBufferAttribute(e, h + 0),
            a.fromBufferAttribute(e, h + 1),
            o.fromBufferAttribute(e, h + 2),
            f.subVectors(o, a),
            d.subVectors(i, a),
            f.cross(d),
            s.setXYZ(h + 0, f.x, f.y, f.z),
            s.setXYZ(h + 1, f.x, f.y, f.z),
            s.setXYZ(h + 2, f.x, f.y, f.z));
      (this.normalizeNormals(), (s.needsUpdate = !0));
    }
  }
  normalizeNormals() {
    const t = this.attributes.normal;
    for (let e = 0, s = t.count; e < s; e++)
      (Bs.fromBufferAttribute(t, e), Bs.normalize(), t.setXYZ(e, Bs.x, Bs.y, Bs.z));
  }
  toNonIndexed() {
    function t(r, l) {
      const c = r.array,
        f = r.itemSize,
        d = r.normalized,
        h = new c.constructor(l.length * f);
      let u = 0,
        m = 0;
      for (let x = 0, p = l.length; x < p; x++) {
        r.isInterleavedBufferAttribute ? (u = l[x] * r.data.stride + r.offset) : (u = l[x] * f);
        for (let g = 0; g < f; g++) h[m++] = c[u++];
      }
      return new On(h, f, d);
    }
    if (this.index === null)
      return (
        console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),
        this
      );
    const e = new Bn(),
      s = this.index.array,
      i = this.attributes;
    for (const r in i) {
      const l = i[r],
        c = t(l, s);
      e.setAttribute(r, c);
    }
    const a = this.morphAttributes;
    for (const r in a) {
      const l = [],
        c = a[r];
      for (let f = 0, d = c.length; f < d; f++) {
        const h = c[f],
          u = t(h, s);
        l.push(u);
      }
      e.morphAttributes[r] = l;
    }
    e.morphTargetsRelative = this.morphTargetsRelative;
    const o = this.groups;
    for (let r = 0, l = o.length; r < l; r++) {
      const c = o[r];
      e.addGroup(c.start, c.count, c.materialIndex);
    }
    return e;
  }
  toJSON() {
    const t = { metadata: { version: 4.7, type: "BufferGeometry", generator: "BufferGeometry.toJSON" } };
    if (
      ((t.uuid = this.uuid),
      (t.type = this.type),
      this.name !== "" && (t.name = this.name),
      Object.keys(this.userData).length > 0 && (t.userData = this.userData),
      this.parameters !== void 0)
    ) {
      const l = this.parameters;
      for (const c in l) l[c] !== void 0 && (t[c] = l[c]);
      return t;
    }
    t.data = { attributes: {} };
    const e = this.index;
    e !== null &&
      (t.data.index = { type: e.array.constructor.name, array: Array.prototype.slice.call(e.array) });
    const s = this.attributes;
    for (const l in s) {
      const c = s[l];
      t.data.attributes[l] = c.toJSON(t.data);
    }
    const i = {};
    let a = !1;
    for (const l in this.morphAttributes) {
      const c = this.morphAttributes[l],
        f = [];
      for (let d = 0, h = c.length; d < h; d++) {
        const u = c[d];
        f.push(u.toJSON(t.data));
      }
      f.length > 0 && ((i[l] = f), (a = !0));
    }
    a && ((t.data.morphAttributes = i), (t.data.morphTargetsRelative = this.morphTargetsRelative));
    const o = this.groups;
    o.length > 0 && (t.data.groups = JSON.parse(JSON.stringify(o)));
    const r = this.boundingSphere;
    return (r !== null && (t.data.boundingSphere = r.toJSON()), t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    ((this.index = null),
      (this.attributes = {}),
      (this.morphAttributes = {}),
      (this.groups = []),
      (this.boundingBox = null),
      (this.boundingSphere = null));
    const e = {};
    this.name = t.name;
    const s = t.index;
    s !== null && this.setIndex(s.clone());
    const i = t.attributes;
    for (const c in i) {
      const f = i[c];
      this.setAttribute(c, f.clone(e));
    }
    const a = t.morphAttributes;
    for (const c in a) {
      const f = [],
        d = a[c];
      for (let h = 0, u = d.length; h < u; h++) f.push(d[h].clone(e));
      this.morphAttributes[c] = f;
    }
    this.morphTargetsRelative = t.morphTargetsRelative;
    const o = t.groups;
    for (let c = 0, f = o.length; c < f; c++) {
      const d = o[c];
      this.addGroup(d.start, d.count, d.materialIndex);
    }
    const r = t.boundingBox;
    r !== null && (this.boundingBox = r.clone());
    const l = t.boundingSphere;
    return (
      l !== null && (this.boundingSphere = l.clone()),
      (this.drawRange.start = t.drawRange.start),
      (this.drawRange.count = t.drawRange.count),
      (this.userData = t.userData),
      this
    );
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}

const gv = new Ke(),
  X0 = new J3(),
  ku = new Rf(),
  xv = new dt(),
  Su = new dt(),
  Tu = new dt(),
  Eu = new dt(),
  Ag = new dt(),
  Au = new dt(),
  yv = new dt(),
  Ru = new dt();

class Sn extends Ws {
  constructor(t = new Bn(), e = new yM()) {
    (super(),
      (this.isMesh = !0),
      (this.type = "Mesh"),
      (this.geometry = t),
      (this.material = e),
      (this.morphTargetDictionary = void 0),
      (this.morphTargetInfluences = void 0),
      (this.count = 1),
      this.updateMorphTargets());
  }
  copy(t, e) {
    return (
      super.copy(t, e),
      t.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = t.morphTargetInfluences.slice()),
      t.morphTargetDictionary !== void 0 &&
        (this.morphTargetDictionary = Object.assign({}, t.morphTargetDictionary)),
      (this.material = Array.isArray(t.material) ? t.material.slice() : t.material),
      (this.geometry = t.geometry),
      this
    );
  }
  updateMorphTargets() {
    const e = this.geometry.morphAttributes,
      s = Object.keys(e);
    if (s.length > 0) {
      const i = e[s[0]];
      if (i !== void 0) {
        ((this.morphTargetInfluences = []), (this.morphTargetDictionary = {}));
        for (let a = 0, o = i.length; a < o; a++) {
          const r = i[a].name || String(a);
          (this.morphTargetInfluences.push(0), (this.morphTargetDictionary[r] = a));
        }
      }
    }
  }
  getVertexPosition(t, e) {
    const s = this.geometry,
      i = s.attributes.position,
      a = s.morphAttributes.position,
      o = s.morphTargetsRelative;
    e.fromBufferAttribute(i, t);
    const r = this.morphTargetInfluences;
    if (a && r) {
      Au.set(0, 0, 0);
      for (let l = 0, c = a.length; l < c; l++) {
        const f = r[l],
          d = a[l];
        f !== 0 &&
          (Ag.fromBufferAttribute(d, t), o ? Au.addScaledVector(Ag, f) : Au.addScaledVector(Ag.sub(e), f));
      }
      e.add(Au);
    }
    return e;
  }
  raycast(t, e) {
    const s = this.geometry,
      i = this.material,
      a = this.matrixWorld;
    i !== void 0 &&
      (s.boundingSphere === null && s.computeBoundingSphere(),
      ku.copy(s.boundingSphere),
      ku.applyMatrix4(a),
      X0.copy(t.ray).recast(t.near),
      !(
        ku.containsPoint(X0.origin) === !1 &&
        (X0.intersectSphere(ku, xv) === null || X0.origin.distanceToSquared(xv) > (t.far - t.near) ** 2)
      ) &&
        (gv.copy(a).invert(),
        X0.copy(t.ray).applyMatrix4(gv),
        !(s.boundingBox !== null && X0.intersectsBox(s.boundingBox) === !1) &&
          this._computeIntersections(t, e, X0)));
  }
  _computeIntersections(t, e, s) {
    let i;
    const a = this.geometry,
      o = this.material,
      r = a.index,
      l = a.attributes.position,
      c = a.attributes.uv,
      f = a.attributes.uv1,
      d = a.attributes.normal,
      h = a.groups,
      u = a.drawRange;
    if (r !== null)
      if (Array.isArray(o))
        for (let m = 0, x = h.length; m < x; m++) {
          const p = h[m],
            g = o[p.materialIndex],
            y = Math.max(p.start, u.start),
            v = Math.min(r.count, Math.min(p.start + p.count, u.start + u.count));
          for (let _ = y, k = v; _ < k; _ += 3) {
            const M = r.getX(_),
              S = r.getX(_ + 1),
              b = r.getX(_ + 2);
            ((i = Cu(this, g, t, s, c, f, d, M, S, b)),
              i && ((i.faceIndex = Math.floor(_ / 3)), (i.face.materialIndex = p.materialIndex), e.push(i)));
          }
        }
      else {
        const m = Math.max(0, u.start),
          x = Math.min(r.count, u.start + u.count);
        for (let p = m, g = x; p < g; p += 3) {
          const y = r.getX(p),
            v = r.getX(p + 1),
            _ = r.getX(p + 2);
          ((i = Cu(this, o, t, s, c, f, d, y, v, _)), i && ((i.faceIndex = Math.floor(p / 3)), e.push(i)));
        }
      }
    else if (l !== void 0)
      if (Array.isArray(o))
        for (let m = 0, x = h.length; m < x; m++) {
          const p = h[m],
            g = o[p.materialIndex],
            y = Math.max(p.start, u.start),
            v = Math.min(l.count, Math.min(p.start + p.count, u.start + u.count));
          for (let _ = y, k = v; _ < k; _ += 3) {
            const M = _,
              S = _ + 1,
              b = _ + 2;
            ((i = Cu(this, g, t, s, c, f, d, M, S, b)),
              i && ((i.faceIndex = Math.floor(_ / 3)), (i.face.materialIndex = p.materialIndex), e.push(i)));
          }
        }
      else {
        const m = Math.max(0, u.start),
          x = Math.min(l.count, u.start + u.count);
        for (let p = m, g = x; p < g; p += 3) {
          const y = p,
            v = p + 1,
            _ = p + 2;
          ((i = Cu(this, o, t, s, c, f, d, y, v, _)), i && ((i.faceIndex = Math.floor(p / 3)), e.push(i)));
        }
      }
  }
}

function U7(n, t, e, s, i, a, o, r) {
  let l;
  if (
    (t.side === pi
      ? (l = s.intersectTriangle(o, a, i, !0, r))
      : (l = s.intersectTriangle(i, a, o, t.side === Rr, r)),
    l === null)
  )
    return null;
  (Ru.copy(r), Ru.applyMatrix4(n.matrixWorld));
  const c = e.ray.origin.distanceTo(Ru);
  return c < e.near || c > e.far ? null : { distance: c, point: Ru.clone(), object: n };
}

function Cu(n, t, e, s, i, a, o, r, l, c) {
  (n.getVertexPosition(r, Su), n.getVertexPosition(l, Tu), n.getVertexPosition(c, Eu));
  const f = U7(n, t, e, s, Su, Tu, Eu, yv);
  if (f) {
    const d = new dt();
    (oo.getBarycoord(yv, Su, Tu, Eu, d),
      i && (f.uv = oo.getInterpolatedAttribute(i, r, l, c, d, new Ee())),
      a && (f.uv1 = oo.getInterpolatedAttribute(a, r, l, c, d, new Ee())),
      o &&
        ((f.normal = oo.getInterpolatedAttribute(o, r, l, c, d, new dt())),
        f.normal.dot(s.direction) > 0 && f.normal.multiplyScalar(-1)));
    const h = { a: r, b: l, c, normal: new dt(), materialIndex: 0 };
    (oo.getNormal(Su, Tu, Eu, h.normal), (f.face = h), (f.barycoord = d));
  }
  return f;
}

class Oh extends Bn {
  constructor(t = 1, e = 1, s = 1, i = 1, a = 1, o = 1) {
    (super(),
      (this.type = "BoxGeometry"),
      (this.parameters = {
        width: t,
        height: e,
        depth: s,
        widthSegments: i,
        heightSegments: a,
        depthSegments: o,
      }));
    const r = this;
    ((i = Math.floor(i)), (a = Math.floor(a)), (o = Math.floor(o)));
    const l = [],
      c = [],
      f = [],
      d = [];
    let h = 0,
      u = 0;
    (m("z", "y", "x", -1, -1, s, e, t, o, a, 0),
      m("z", "y", "x", 1, -1, s, e, -t, o, a, 1),
      m("x", "z", "y", 1, 1, t, s, e, i, o, 2),
      m("x", "z", "y", 1, -1, t, s, -e, i, o, 3),
      m("x", "y", "z", 1, -1, t, e, s, i, a, 4),
      m("x", "y", "z", -1, -1, t, e, -s, i, a, 5),
      this.setIndex(l),
      this.setAttribute("position", new Ae(c, 3)),
      this.setAttribute("normal", new Ae(f, 3)),
      this.setAttribute("uv", new Ae(d, 2)));
    function m(x, p, g, y, v, _, k, M, S, b, w) {
      const T = _ / S,
        E = k / b,
        A = _ / 2,
        C = k / 2,
        R = M / 2,
        I = S + 1,
        P = b + 1;
      let F = 0,
        L = 0;
      const B = new dt();
      for (let G = 0; G < P; G++) {
        const q = G * E - C;
        for (let et = 0; et < I; et++) {
          const ct = et * T - A;
          ((B[x] = ct * y),
            (B[p] = q * v),
            (B[g] = R),
            c.push(B.x, B.y, B.z),
            (B[x] = 0),
            (B[p] = 0),
            (B[g] = M > 0 ? 1 : -1),
            f.push(B.x, B.y, B.z),
            d.push(et / S),
            d.push(1 - G / b),
            (F += 1));
        }
      }
      for (let G = 0; G < b; G++)
        for (let q = 0; q < S; q++) {
          const et = h + q + I * G,
            ct = h + q + I * (G + 1),
            rt = h + (q + 1) + I * (G + 1),
            mt = h + (q + 1) + I * G;
          (l.push(et, ct, mt), l.push(ct, rt, mt), (L += 6));
        }
      (r.addGroup(u, L, w), (u += L), (h += F));
    }
  }
  copy(t) {
    return (super.copy(t), (this.parameters = Object.assign({}, t.parameters)), this);
  }
  static fromJSON(t) {
    return new Oh(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments);
  }
}

function hf(n) {
  const t = {};
  for (const e in n) {
    t[e] = {};
    for (const s in n[e]) {
      const i = n[e][s];
      i &&
      (i.isColor ||
        i.isMatrix3 ||
        i.isMatrix4 ||
        i.isVector2 ||
        i.isVector3 ||
        i.isVector4 ||
        i.isTexture ||
        i.isQuaternion)
        ? i.isRenderTargetTexture
          ? (console.warn(
              "UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().",
            ),
            (t[e][s] = null))
          : (t[e][s] = i.clone())
        : Array.isArray(i)
          ? (t[e][s] = i.slice())
          : (t[e][s] = i);
    }
  }
  return t;
}

function ki(n) {
  const t = {};
  for (let e = 0; e < n.length; e++) {
    const s = hf(n[e]);
    for (const i in s) t[i] = s[i];
  }
  return t;
}

function O7(n) {
  const t = [];
  for (let e = 0; e < n.length; e++) t.push(n[e].clone());
  return t;
}

function vM(n) {
  const t = n.getRenderTarget();
  return t === null
    ? n.outputColorSpace
    : t.isXRRenderTarget === !0
      ? t.texture.colorSpace
      : In.workingColorSpace;
}

const N0 = { clone: hf, merge: ki };

var B7 = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,
  H7 = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;

class An extends Uh {
  constructor(t) {
    (super(),
      (this.isShaderMaterial = !0),
      (this.type = "ShaderMaterial"),
      (this.defines = {}),
      (this.uniforms = {}),
      (this.uniformsGroups = []),
      (this.vertexShader = B7),
      (this.fragmentShader = H7),
      (this.linewidth = 1),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.fog = !1),
      (this.lights = !1),
      (this.clipping = !1),
      (this.forceSinglePass = !0),
      (this.extensions = { clipCullDistance: !1, multiDraw: !1 }),
      (this.defaultAttributeValues = { color: [1, 1, 1], uv: [0, 0], uv1: [0, 0] }),
      (this.index0AttributeName = void 0),
      (this.uniformsNeedUpdate = !1),
      (this.glslVersion = null),
      t !== void 0 && this.setValues(t));
  }
  copy(t) {
    return (
      super.copy(t),
      (this.fragmentShader = t.fragmentShader),
      (this.vertexShader = t.vertexShader),
      (this.uniforms = hf(t.uniforms)),
      (this.uniformsGroups = O7(t.uniformsGroups)),
      (this.defines = Object.assign({}, t.defines)),
      (this.wireframe = t.wireframe),
      (this.wireframeLinewidth = t.wireframeLinewidth),
      (this.fog = t.fog),
      (this.lights = t.lights),
      (this.clipping = t.clipping),
      (this.extensions = Object.assign({}, t.extensions)),
      (this.glslVersion = t.glslVersion),
      this
    );
  }
  toJSON(t) {
    const e = super.toJSON(t);
    ((e.glslVersion = this.glslVersion), (e.uniforms = {}));
    for (const i in this.uniforms) {
      const o = this.uniforms[i].value;
      o && o.isTexture
        ? (e.uniforms[i] = { type: "t", value: o.toJSON(t).uuid })
        : o && o.isColor
          ? (e.uniforms[i] = { type: "c", value: o.getHex() })
          : o && o.isVector2
            ? (e.uniforms[i] = { type: "v2", value: o.toArray() })
            : o && o.isVector3
              ? (e.uniforms[i] = { type: "v3", value: o.toArray() })
              : o && o.isVector4
                ? (e.uniforms[i] = { type: "v4", value: o.toArray() })
                : o && o.isMatrix3
                  ? (e.uniforms[i] = { type: "m3", value: o.toArray() })
                  : o && o.isMatrix4
                    ? (e.uniforms[i] = { type: "m4", value: o.toArray() })
                    : (e.uniforms[i] = { value: o });
    }
    (Object.keys(this.defines).length > 0 && (e.defines = this.defines),
      (e.vertexShader = this.vertexShader),
      (e.fragmentShader = this.fragmentShader),
      (e.lights = this.lights),
      (e.clipping = this.clipping));
    const s = {};
    for (const i in this.extensions) this.extensions[i] === !0 && (s[i] = !0);
    return (Object.keys(s).length > 0 && (e.extensions = s), e);
  }
}

class bM extends Ws {
  constructor() {
    (super(),
      (this.isCamera = !0),
      (this.type = "Camera"),
      (this.matrixWorldInverse = new Ke()),
      (this.projectionMatrix = new Ke()),
      (this.projectionMatrixInverse = new Ke()),
      (this.coordinateSystem = Uo),
      (this._reversedDepth = !1));
  }
  get reversedDepth() {
    return this._reversedDepth;
  }
  copy(t, e) {
    return (
      super.copy(t, e),
      this.matrixWorldInverse.copy(t.matrixWorldInverse),
      this.projectionMatrix.copy(t.projectionMatrix),
      this.projectionMatrixInverse.copy(t.projectionMatrixInverse),
      (this.coordinateSystem = t.coordinateSystem),
      this
    );
  }
  getWorldDirection(t) {
    return super.getWorldDirection(t).negate();
  }
  updateMatrixWorld(t) {
    (super.updateMatrixWorld(t), this.matrixWorldInverse.copy(this.matrixWorld).invert());
  }
  updateWorldMatrix(t, e) {
    (super.updateWorldMatrix(t, e), this.matrixWorldInverse.copy(this.matrixWorld).invert());
  }
  clone() {
    return new this.constructor().copy(this);
  }
}

const Xr = new dt(),
  vv = new Ee(),
  bv = new Ee();

class Yi extends bM {
  constructor(t = 50, e = 1, s = 0.1, i = 2e3) {
    (super(),
      (this.isPerspectiveCamera = !0),
      (this.type = "PerspectiveCamera"),
      (this.fov = t),
      (this.zoom = 1),
      (this.near = s),
      (this.far = i),
      (this.focus = 10),
      (this.aspect = e),
      (this.view = null),
      (this.filmGauge = 35),
      (this.filmOffset = 0),
      this.updateProjectionMatrix());
  }
  copy(t, e) {
    return (
      super.copy(t, e),
      (this.fov = t.fov),
      (this.zoom = t.zoom),
      (this.near = t.near),
      (this.far = t.far),
      (this.focus = t.focus),
      (this.aspect = t.aspect),
      (this.view = t.view === null ? null : Object.assign({}, t.view)),
      (this.filmGauge = t.filmGauge),
      (this.filmOffset = t.filmOffset),
      this
    );
  }
  setFocalLength(t) {
    const e = (0.5 * this.getFilmHeight()) / t;
    ((this.fov = Q5 * 2 * Math.atan(e)), this.updateProjectionMatrix());
  }
  getFocalLength() {
    const t = Math.tan(rg * 0.5 * this.fov);
    return (0.5 * this.getFilmHeight()) / t;
  }
  getEffectiveFOV() {
    return Q5 * 2 * Math.atan(Math.tan(rg * 0.5 * this.fov) / this.zoom);
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  getViewBounds(t, e, s) {
    (Xr.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse),
      e.set(Xr.x, Xr.y).multiplyScalar(-t / Xr.z),
      Xr.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse),
      s.set(Xr.x, Xr.y).multiplyScalar(-t / Xr.z));
  }
  getViewSize(t, e) {
    return (this.getViewBounds(t, vv, bv), e.subVectors(bv, vv));
  }
  setViewOffset(t, e, s, i, a, o) {
    ((this.aspect = t / e),
      this.view === null &&
        (this.view = {
          enabled: !0,
          fullWidth: 1,
          fullHeight: 1,
          offsetX: 0,
          offsetY: 0,
          width: 1,
          height: 1,
        }),
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
    const t = this.near;
    let e = (t * Math.tan(rg * 0.5 * this.fov)) / this.zoom,
      s = 2 * e,
      i = this.aspect * s,
      a = -0.5 * i;
    const o = this.view;
    if (this.view !== null && this.view.enabled) {
      const l = o.fullWidth,
        c = o.fullHeight;
      ((a += (o.offsetX * i) / l), (e -= (o.offsetY * s) / c), (i *= o.width / l), (s *= o.height / c));
    }
    const r = this.filmOffset;
    (r !== 0 && (a += (t * r) / this.getFilmWidth()),
      this.projectionMatrix.makePerspective(
        a,
        a + i,
        e,
        e - s,
        t,
        this.far,
        this.coordinateSystem,
        this.reversedDepth,
      ),
      this.projectionMatrixInverse.copy(this.projectionMatrix).invert());
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return (
      (e.object.fov = this.fov),
      (e.object.zoom = this.zoom),
      (e.object.near = this.near),
      (e.object.far = this.far),
      (e.object.focus = this.focus),
      (e.object.aspect = this.aspect),
      this.view !== null && (e.object.view = Object.assign({}, this.view)),
      (e.object.filmGauge = this.filmGauge),
      (e.object.filmOffset = this.filmOffset),
      e
    );
  }
}

const hc = -90,
  uc = 1;

class $7 extends Ws {
  constructor(t, e, s) {
    (super(),
      (this.type = "CubeCamera"),
      (this.renderTarget = s),
      (this.coordinateSystem = null),
      (this.activeMipmapLevel = 0));
    const i = new Yi(hc, uc, t, e);
    ((i.layers = this.layers), this.add(i));
    const a = new Yi(hc, uc, t, e);
    ((a.layers = this.layers), this.add(a));
    const o = new Yi(hc, uc, t, e);
    ((o.layers = this.layers), this.add(o));
    const r = new Yi(hc, uc, t, e);
    ((r.layers = this.layers), this.add(r));
    const l = new Yi(hc, uc, t, e);
    ((l.layers = this.layers), this.add(l));
    const c = new Yi(hc, uc, t, e);
    ((c.layers = this.layers), this.add(c));
  }
  updateCoordinateSystem() {
    const t = this.coordinateSystem,
      e = this.children.concat(),
      [s, i, a, o, r, l] = e;
    for (const c of e) this.remove(c);
    if (t === Uo)
      (s.up.set(0, 1, 0),
        s.lookAt(1, 0, 0),
        i.up.set(0, 1, 0),
        i.lookAt(-1, 0, 0),
        a.up.set(0, 0, -1),
        a.lookAt(0, 1, 0),
        o.up.set(0, 0, 1),
        o.lookAt(0, -1, 0),
        r.up.set(0, 1, 0),
        r.lookAt(0, 0, 1),
        l.up.set(0, 1, 0),
        l.lookAt(0, 0, -1));
    else if (t === z1)
      (s.up.set(0, -1, 0),
        s.lookAt(-1, 0, 0),
        i.up.set(0, -1, 0),
        i.lookAt(1, 0, 0),
        a.up.set(0, 0, 1),
        a.lookAt(0, 1, 0),
        o.up.set(0, 0, -1),
        o.lookAt(0, -1, 0),
        r.up.set(0, -1, 0),
        r.lookAt(0, 0, 1),
        l.up.set(0, -1, 0),
        l.lookAt(0, 0, -1));
    else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + t);
    for (const c of e) (this.add(c), c.updateMatrixWorld());
  }
  update(t, e) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: s, activeMipmapLevel: i } = this;
    this.coordinateSystem !== t.coordinateSystem &&
      ((this.coordinateSystem = t.coordinateSystem), this.updateCoordinateSystem());
    const [a, o, r, l, c, f] = this.children,
      d = t.getRenderTarget(),
      h = t.getActiveCubeFace(),
      u = t.getActiveMipmapLevel(),
      m = t.xr.enabled;
    t.xr.enabled = !1;
    const x = s.texture.generateMipmaps;
    ((s.texture.generateMipmaps = !1),
      t.setRenderTarget(s, 0, i),
      t.render(e, a),
      t.setRenderTarget(s, 1, i),
      t.render(e, o),
      t.setRenderTarget(s, 2, i),
      t.render(e, r),
      t.setRenderTarget(s, 3, i),
      t.render(e, l),
      t.setRenderTarget(s, 4, i),
      t.render(e, c),
      (s.texture.generateMipmaps = x),
      t.setRenderTarget(s, 5, i),
      t.render(e, f),
      t.setRenderTarget(d, h, u),
      (t.xr.enabled = m),
      (s.texture.needsPMREMUpdate = !0));
  }
}

class _M extends Vs {
  constructor(t = [], e = ff, s, i, a, o, r, l, c, f) {
    (super(t, e, s, i, a, o, r, l, c, f), (this.isCubeTexture = !0), (this.flipY = !1));
  }
  get images() {
    return this.image;
  }
  set images(t) {
    this.image = t;
  }
}

class G7 extends go {
  constructor(t = 1, e = {}) {
    (super(t, t, e), (this.isWebGLCubeRenderTarget = !0));
    const s = { width: t, height: t, depth: 1 },
      i = [s, s, s, s, s, s];
    ((this.texture = new _M(i)), this._setTextureOptions(e), (this.texture.isRenderTargetTexture = !0));
  }
  fromEquirectangularTexture(t, e) {
    ((this.texture.type = e.type),
      (this.texture.colorSpace = e.colorSpace),
      (this.texture.generateMipmaps = e.generateMipmaps),
      (this.texture.minFilter = e.minFilter),
      (this.texture.magFilter = e.magFilter));
    const s = {
        uniforms: { tEquirect: { value: null } },
        vertexShader: `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,
        fragmentShader: `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`,
      },
      i = new Oh(5, 5, 5),
      a = new An({
        name: "CubemapFromEquirect",
        uniforms: hf(s.uniforms),
        vertexShader: s.vertexShader,
        fragmentShader: s.fragmentShader,
        side: pi,
        blending: Sr,
      });
    a.uniforms.tEquirect.value = e;
    const o = new Sn(i, a),
      r = e.minFilter;
    return (
      e.minFilter === Fo && (e.minFilter = Ns),
      new $7(1, 10, this).update(t, o),
      (e.minFilter = r),
      o.geometry.dispose(),
      o.material.dispose(),
      this
    );
  }
  clear(t, e = !0, s = !0, i = !0) {
    const a = t.getRenderTarget();
    for (let o = 0; o < 6; o++) (t.setRenderTarget(this, o), t.clear(e, s, i));
    t.setRenderTarget(a);
  }
}

class Ji extends Ws {
  constructor() {
    (super(), (this.isGroup = !0), (this.type = "Group"));
  }
}

const V7 = { type: "move" };

class Rg {
  constructor() {
    ((this._targetRay = null), (this._grip = null), (this._hand = null));
  }
  getHandSpace() {
    return (
      this._hand === null &&
        ((this._hand = new Ji()),
        (this._hand.matrixAutoUpdate = !1),
        (this._hand.visible = !1),
        (this._hand.joints = {}),
        (this._hand.inputState = { pinching: !1 })),
      this._hand
    );
  }
  getTargetRaySpace() {
    return (
      this._targetRay === null &&
        ((this._targetRay = new Ji()),
        (this._targetRay.matrixAutoUpdate = !1),
        (this._targetRay.visible = !1),
        (this._targetRay.hasLinearVelocity = !1),
        (this._targetRay.linearVelocity = new dt()),
        (this._targetRay.hasAngularVelocity = !1),
        (this._targetRay.angularVelocity = new dt())),
      this._targetRay
    );
  }
  getGripSpace() {
    return (
      this._grip === null &&
        ((this._grip = new Ji()),
        (this._grip.matrixAutoUpdate = !1),
        (this._grip.visible = !1),
        (this._grip.hasLinearVelocity = !1),
        (this._grip.linearVelocity = new dt()),
        (this._grip.hasAngularVelocity = !1),
        (this._grip.angularVelocity = new dt())),
      this._grip
    );
  }
  dispatchEvent(t) {
    return (
      this._targetRay !== null && this._targetRay.dispatchEvent(t),
      this._grip !== null && this._grip.dispatchEvent(t),
      this._hand !== null && this._hand.dispatchEvent(t),
      this
    );
  }
  connect(t) {
    if (t && t.hand) {
      const e = this._hand;
      if (e) for (const s of t.hand.values()) this._getHandJoint(e, s);
    }
    return (this.dispatchEvent({ type: "connected", data: t }), this);
  }
  disconnect(t) {
    return (
      this.dispatchEvent({ type: "disconnected", data: t }),
      this._targetRay !== null && (this._targetRay.visible = !1),
      this._grip !== null && (this._grip.visible = !1),
      this._hand !== null && (this._hand.visible = !1),
      this
    );
  }
  update(t, e, s) {
    let i = null,
      a = null,
      o = null;
    const r = this._targetRay,
      l = this._grip,
      c = this._hand;
    if (t && e.session.visibilityState !== "visible-blurred") {
      if (c && t.hand) {
        o = !0;
        for (const x of t.hand.values()) {
          const p = e.getJointPose(x, s),
            g = this._getHandJoint(c, x);
          (p !== null &&
            (g.matrix.fromArray(p.transform.matrix),
            g.matrix.decompose(g.position, g.rotation, g.scale),
            (g.matrixWorldNeedsUpdate = !0),
            (g.jointRadius = p.radius)),
            (g.visible = p !== null));
        }
        const f = c.joints["index-finger-tip"],
          d = c.joints["thumb-tip"],
          h = f.position.distanceTo(d.position),
          u = 0.02,
          m = 0.005;
        c.inputState.pinching && h > u + m
          ? ((c.inputState.pinching = !1),
            this.dispatchEvent({ type: "pinchend", handedness: t.handedness, target: this }))
          : !c.inputState.pinching &&
            h <= u - m &&
            ((c.inputState.pinching = !0),
            this.dispatchEvent({ type: "pinchstart", handedness: t.handedness, target: this }));
      } else
        l !== null &&
          t.gripSpace &&
          ((a = e.getPose(t.gripSpace, s)),
          a !== null &&
            (l.matrix.fromArray(a.transform.matrix),
            l.matrix.decompose(l.position, l.rotation, l.scale),
            (l.matrixWorldNeedsUpdate = !0),
            a.linearVelocity
              ? ((l.hasLinearVelocity = !0), l.linearVelocity.copy(a.linearVelocity))
              : (l.hasLinearVelocity = !1),
            a.angularVelocity
              ? ((l.hasAngularVelocity = !0), l.angularVelocity.copy(a.angularVelocity))
              : (l.hasAngularVelocity = !1)));
      r !== null &&
        ((i = e.getPose(t.targetRaySpace, s)),
        i === null && a !== null && (i = a),
        i !== null &&
          (r.matrix.fromArray(i.transform.matrix),
          r.matrix.decompose(r.position, r.rotation, r.scale),
          (r.matrixWorldNeedsUpdate = !0),
          i.linearVelocity
            ? ((r.hasLinearVelocity = !0), r.linearVelocity.copy(i.linearVelocity))
            : (r.hasLinearVelocity = !1),
          i.angularVelocity
            ? ((r.hasAngularVelocity = !0), r.angularVelocity.copy(i.angularVelocity))
            : (r.hasAngularVelocity = !1),
          this.dispatchEvent(V7)));
    }
    return (
      r !== null && (r.visible = i !== null),
      l !== null && (l.visible = a !== null),
      c !== null && (c.visible = o !== null),
      this
    );
  }
  _getHandJoint(t, e) {
    if (t.joints[e.jointName] === void 0) {
      const s = new Ji();
      ((s.matrixAutoUpdate = !1), (s.visible = !1), (t.joints[e.jointName] = s), t.add(s));
    }
    return t.joints[e.jointName];
  }
}

class tx {
  constructor(t, e = 1, s = 1e3) {
    ((this.isFog = !0), (this.name = ""), (this.color = new Ut(t)), (this.near = e), (this.far = s));
  }
  clone() {
    return new tx(this.color, this.near, this.far);
  }
  toJSON() {
    return { type: "Fog", name: this.name, color: this.color.getHex(), near: this.near, far: this.far };
  }
}

class wM extends Ws {
  constructor() {
    (super(),
      (this.isScene = !0),
      (this.type = "Scene"),
      (this.background = null),
      (this.environment = null),
      (this.fog = null),
      (this.backgroundBlurriness = 0),
      (this.backgroundIntensity = 1),
      (this.backgroundRotation = new sa()),
      (this.environmentIntensity = 1),
      (this.environmentRotation = new sa()),
      (this.overrideMaterial = null),
      typeof __THREE_DEVTOOLS__ < "u" &&
        __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this })));
  }
  copy(t, e) {
    return (
      super.copy(t, e),
      t.background !== null && (this.background = t.background.clone()),
      t.environment !== null && (this.environment = t.environment.clone()),
      t.fog !== null && (this.fog = t.fog.clone()),
      (this.backgroundBlurriness = t.backgroundBlurriness),
      (this.backgroundIntensity = t.backgroundIntensity),
      this.backgroundRotation.copy(t.backgroundRotation),
      (this.environmentIntensity = t.environmentIntensity),
      this.environmentRotation.copy(t.environmentRotation),
      t.overrideMaterial !== null && (this.overrideMaterial = t.overrideMaterial.clone()),
      (this.matrixAutoUpdate = t.matrixAutoUpdate),
      this
    );
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return (
      this.fog !== null && (e.object.fog = this.fog.toJSON()),
      this.backgroundBlurriness > 0 && (e.object.backgroundBlurriness = this.backgroundBlurriness),
      this.backgroundIntensity !== 1 && (e.object.backgroundIntensity = this.backgroundIntensity),
      (e.object.backgroundRotation = this.backgroundRotation.toArray()),
      this.environmentIntensity !== 1 && (e.object.environmentIntensity = this.environmentIntensity),
      (e.object.environmentRotation = this.environmentRotation.toArray()),
      e
    );
  }
}

class MM {
  constructor(t, e) {
    ((this.isInterleavedBuffer = !0),
      (this.array = t),
      (this.stride = e),
      (this.count = t !== void 0 ? t.length / e : 0),
      (this.usage = Z5),
      (this.updateRanges = []),
      (this.version = 0),
      (this.uuid = C0()));
  }
  onUploadCallback() {}
  set needsUpdate(t) {
    t === !0 && this.version++;
  }
  setUsage(t) {
    return ((this.usage = t), this);
  }
  addUpdateRange(t, e) {
    this.updateRanges.push({ start: t, count: e });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(t) {
    return (
      (this.array = new t.array.constructor(t.array)),
      (this.count = t.count),
      (this.stride = t.stride),
      (this.usage = t.usage),
      this
    );
  }
  copyAt(t, e, s) {
    ((t *= this.stride), (s *= e.stride));
    for (let i = 0, a = this.stride; i < a; i++) this.array[t + i] = e.array[s + i];
    return this;
  }
  set(t, e = 0) {
    return (this.array.set(t, e), this);
  }
  clone(t) {
    (t.arrayBuffers === void 0 && (t.arrayBuffers = {}),
      this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = C0()),
      t.arrayBuffers[this.array.buffer._uuid] === void 0 &&
        (t.arrayBuffers[this.array.buffer._uuid] = this.array.slice(0).buffer));
    const e = new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),
      s = new this.constructor(e, this.stride);
    return (s.setUsage(this.usage), s);
  }
  onUpload(t) {
    return ((this.onUploadCallback = t), this);
  }
  toJSON(t) {
    return (
      t.arrayBuffers === void 0 && (t.arrayBuffers = {}),
      this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = C0()),
      t.arrayBuffers[this.array.buffer._uuid] === void 0 &&
        (t.arrayBuffers[this.array.buffer._uuid] = Array.from(new Uint32Array(this.array.buffer))),
      {
        uuid: this.uuid,
        buffer: this.array.buffer._uuid,
        type: this.array.constructor.name,
        stride: this.stride,
      }
    );
  }
}

const vi = new dt();

class No {
  constructor(t, e, s, i = !1) {
    ((this.isInterleavedBufferAttribute = !0),
      (this.name = ""),
      (this.data = t),
      (this.itemSize = e),
      (this.offset = s),
      (this.normalized = i));
  }
  get count() {
    return this.data.count;
  }
  get array() {
    return this.data.array;
  }
  set needsUpdate(t) {
    this.data.needsUpdate = t;
  }
  applyMatrix4(t) {
    for (let e = 0, s = this.data.count; e < s; e++)
      (vi.fromBufferAttribute(this, e), vi.applyMatrix4(t), this.setXYZ(e, vi.x, vi.y, vi.z));
    return this;
  }
  applyNormalMatrix(t) {
    for (let e = 0, s = this.count; e < s; e++)
      (vi.fromBufferAttribute(this, e), vi.applyNormalMatrix(t), this.setXYZ(e, vi.x, vi.y, vi.z));
    return this;
  }
  transformDirection(t) {
    for (let e = 0, s = this.count; e < s; e++)
      (vi.fromBufferAttribute(this, e), vi.transformDirection(t), this.setXYZ(e, vi.x, vi.y, vi.z));
    return this;
  }
  getComponent(t, e) {
    let s = this.array[t * this.data.stride + this.offset + e];
    return (this.normalized && (s = zo(s, this.array)), s);
  }
  setComponent(t, e, s) {
    return (
      this.normalized && (s = qn(s, this.array)),
      (this.data.array[t * this.data.stride + this.offset + e] = s),
      this
    );
  }
  setX(t, e) {
    return (
      this.normalized && (e = qn(e, this.array)),
      (this.data.array[t * this.data.stride + this.offset] = e),
      this
    );
  }
  setY(t, e) {
    return (
      this.normalized && (e = qn(e, this.array)),
      (this.data.array[t * this.data.stride + this.offset + 1] = e),
      this
    );
  }
  setZ(t, e) {
    return (
      this.normalized && (e = qn(e, this.array)),
      (this.data.array[t * this.data.stride + this.offset + 2] = e),
      this
    );
  }
  setW(t, e) {
    return (
      this.normalized && (e = qn(e, this.array)),
      (this.data.array[t * this.data.stride + this.offset + 3] = e),
      this
    );
  }
  getX(t) {
    let e = this.data.array[t * this.data.stride + this.offset];
    return (this.normalized && (e = zo(e, this.array)), e);
  }
  getY(t) {
    let e = this.data.array[t * this.data.stride + this.offset + 1];
    return (this.normalized && (e = zo(e, this.array)), e);
  }
  getZ(t) {
    let e = this.data.array[t * this.data.stride + this.offset + 2];
    return (this.normalized && (e = zo(e, this.array)), e);
  }
  getW(t) {
    let e = this.data.array[t * this.data.stride + this.offset + 3];
    return (this.normalized && (e = zo(e, this.array)), e);
  }
  setXY(t, e, s) {
    return (
      (t = t * this.data.stride + this.offset),
      this.normalized && ((e = qn(e, this.array)), (s = qn(s, this.array))),
      (this.data.array[t + 0] = e),
      (this.data.array[t + 1] = s),
      this
    );
  }
  setXYZ(t, e, s, i) {
    return (
      (t = t * this.data.stride + this.offset),
      this.normalized && ((e = qn(e, this.array)), (s = qn(s, this.array)), (i = qn(i, this.array))),
      (this.data.array[t + 0] = e),
      (this.data.array[t + 1] = s),
      (this.data.array[t + 2] = i),
      this
    );
  }
  setXYZW(t, e, s, i, a) {
    return (
      (t = t * this.data.stride + this.offset),
      this.normalized &&
        ((e = qn(e, this.array)), (s = qn(s, this.array)), (i = qn(i, this.array)), (a = qn(a, this.array))),
      (this.data.array[t + 0] = e),
      (this.data.array[t + 1] = s),
      (this.data.array[t + 2] = i),
      (this.data.array[t + 3] = a),
      this
    );
  }
  clone(t) {
    if (t === void 0) {
      console.log(
        "THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.",
      );
      const e = [];
      for (let s = 0; s < this.count; s++) {
        const i = s * this.data.stride + this.offset;
        for (let a = 0; a < this.itemSize; a++) e.push(this.data.array[i + a]);
      }
      return new On(new this.array.constructor(e), this.itemSize, this.normalized);
    } else
      return (
        t.interleavedBuffers === void 0 && (t.interleavedBuffers = {}),
        t.interleavedBuffers[this.data.uuid] === void 0 &&
          (t.interleavedBuffers[this.data.uuid] = this.data.clone(t)),
        new No(t.interleavedBuffers[this.data.uuid], this.itemSize, this.offset, this.normalized)
      );
  }
  toJSON(t) {
    if (t === void 0) {
      console.log(
        "THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.",
      );
      const e = [];
      for (let s = 0; s < this.count; s++) {
        const i = s * this.data.stride + this.offset;
        for (let a = 0; a < this.itemSize; a++) e.push(this.data.array[i + a]);
      }
      return {
        itemSize: this.itemSize,
        type: this.array.constructor.name,
        array: e,
        normalized: this.normalized,
      };
    } else
      return (
        t.interleavedBuffers === void 0 && (t.interleavedBuffers = {}),
        t.interleavedBuffers[this.data.uuid] === void 0 &&
          (t.interleavedBuffers[this.data.uuid] = this.data.toJSON(t)),
        {
          isInterleavedBufferAttribute: !0,
          itemSize: this.itemSize,
          data: this.data.uuid,
          offset: this.offset,
          normalized: this.normalized,
        }
      );
  }
}

class zr extends Vs {
  constructor(t = null, e = 1, s = 1, i, a, o, r, l, c = ti, f = ti, d, h) {
    (super(null, o, r, l, c, f, i, a, d, h),
      (this.isDataTexture = !0),
      (this.image = { data: t, width: e, height: s }),
      (this.generateMipmaps = !1),
      (this.flipY = !1),
      (this.unpackAlignment = 1));
  }
}

class Qs extends On {
  constructor(t, e, s, i = 1) {
    (super(t, e, s), (this.isInstancedBufferAttribute = !0), (this.meshPerAttribute = i));
  }
  copy(t) {
    return (super.copy(t), (this.meshPerAttribute = t.meshPerAttribute), this);
  }
  toJSON() {
    const t = super.toJSON();
    return ((t.meshPerAttribute = this.meshPerAttribute), (t.isInstancedBufferAttribute = !0), t);
  }
}

const pc = new Ke(),
  _v = new Ke(),
  Lu = [],
  wv = new $l(),
  W7 = new Ke(),
  ed = new Sn(),
  nd = new Rf();

class kM extends Sn {
  constructor(t, e, s) {
    (super(t, e),
      (this.isInstancedMesh = !0),
      (this.instanceMatrix = new Qs(new Float32Array(s * 16), 16)),
      (this.instanceColor = null),
      (this.morphTexture = null),
      (this.count = s),
      (this.boundingBox = null),
      (this.boundingSphere = null));
    for (let i = 0; i < s; i++) this.setMatrixAt(i, W7);
  }
  computeBoundingBox() {
    const t = this.geometry,
      e = this.count;
    (this.boundingBox === null && (this.boundingBox = new $l()),
      t.boundingBox === null && t.computeBoundingBox(),
      this.boundingBox.makeEmpty());
    for (let s = 0; s < e; s++)
      (this.getMatrixAt(s, pc), wv.copy(t.boundingBox).applyMatrix4(pc), this.boundingBox.union(wv));
  }
  computeBoundingSphere() {
    const t = this.geometry,
      e = this.count;
    (this.boundingSphere === null && (this.boundingSphere = new Rf()),
      t.boundingSphere === null && t.computeBoundingSphere(),
      this.boundingSphere.makeEmpty());
    for (let s = 0; s < e; s++)
      (this.getMatrixAt(s, pc), nd.copy(t.boundingSphere).applyMatrix4(pc), this.boundingSphere.union(nd));
  }
  copy(t, e) {
    return (
      super.copy(t, e),
      this.instanceMatrix.copy(t.instanceMatrix),
      t.morphTexture !== null && (this.morphTexture = t.morphTexture.clone()),
      t.instanceColor !== null && (this.instanceColor = t.instanceColor.clone()),
      (this.count = t.count),
      t.boundingBox !== null && (this.boundingBox = t.boundingBox.clone()),
      t.boundingSphere !== null && (this.boundingSphere = t.boundingSphere.clone()),
      this
    );
  }
  getColorAt(t, e) {
    e.fromArray(this.instanceColor.array, t * 3);
  }
  getMatrixAt(t, e) {
    e.fromArray(this.instanceMatrix.array, t * 16);
  }
  getMorphAt(t, e) {
    const s = e.morphTargetInfluences,
      i = this.morphTexture.source.data.data,
      a = s.length + 1,
      o = t * a + 1;
    for (let r = 0; r < s.length; r++) s[r] = i[o + r];
  }
  raycast(t, e) {
    const s = this.matrixWorld,
      i = this.count;
    if (
      ((ed.geometry = this.geometry),
      (ed.material = this.material),
      ed.material !== void 0 &&
        (this.boundingSphere === null && this.computeBoundingSphere(),
        nd.copy(this.boundingSphere),
        nd.applyMatrix4(s),
        t.ray.intersectsSphere(nd) !== !1))
    )
      for (let a = 0; a < i; a++) {
        (this.getMatrixAt(a, pc), _v.multiplyMatrices(s, pc), (ed.matrixWorld = _v), ed.raycast(t, Lu));
        for (let o = 0, r = Lu.length; o < r; o++) {
          const l = Lu[o];
          ((l.instanceId = a), (l.object = this), e.push(l));
        }
        Lu.length = 0;
      }
  }
  setColorAt(t, e) {
    (this.instanceColor === null &&
      (this.instanceColor = new Qs(new Float32Array(this.instanceMatrix.count * 3).fill(1), 3)),
      e.toArray(this.instanceColor.array, t * 3));
  }
  setMatrixAt(t, e) {
    e.toArray(this.instanceMatrix.array, t * 16);
  }
  setMorphAt(t, e) {
    const s = e.morphTargetInfluences,
      i = s.length + 1;
    this.morphTexture === null &&
      (this.morphTexture = new zr(new Float32Array(i * this.count), i, this.count, X3, fo));
    const a = this.morphTexture.source.data.data;
    let o = 0;
    for (let c = 0; c < s.length; c++) o += s[c];
    const r = this.geometry.morphTargetsRelative ? 1 : 1 - o,
      l = i * t;
    ((a[l] = r), a.set(s, l + 1));
  }
  updateMorphTargets() {}
  dispose() {
    (this.dispatchEvent({ type: "dispose" }),
      this.morphTexture !== null && (this.morphTexture.dispose(), (this.morphTexture = null)));
  }
}

const Cg = new dt(),
  j7 = new dt(),
  q7 = new Je();

class g0 {
  constructor(t = new dt(1, 0, 0), e = 0) {
    ((this.isPlane = !0), (this.normal = t), (this.constant = e));
  }
  set(t, e) {
    return (this.normal.copy(t), (this.constant = e), this);
  }
  setComponents(t, e, s, i) {
    return (this.normal.set(t, e, s), (this.constant = i), this);
  }
  setFromNormalAndCoplanarPoint(t, e) {
    return (this.normal.copy(t), (this.constant = -e.dot(this.normal)), this);
  }
  setFromCoplanarPoints(t, e, s) {
    const i = Cg.subVectors(s, e).cross(j7.subVectors(t, e)).normalize();
    return (this.setFromNormalAndCoplanarPoint(i, t), this);
  }
  copy(t) {
    return (this.normal.copy(t.normal), (this.constant = t.constant), this);
  }
  normalize() {
    const t = 1 / this.normal.length();
    return (this.normal.multiplyScalar(t), (this.constant *= t), this);
  }
  negate() {
    return ((this.constant *= -1), this.normal.negate(), this);
  }
  distanceToPoint(t) {
    return this.normal.dot(t) + this.constant;
  }
  distanceToSphere(t) {
    return this.distanceToPoint(t.center) - t.radius;
  }
  projectPoint(t, e) {
    return e.copy(t).addScaledVector(this.normal, -this.distanceToPoint(t));
  }
  intersectLine(t, e) {
    const s = t.delta(Cg),
      i = this.normal.dot(s);
    if (i === 0) return this.distanceToPoint(t.start) === 0 ? e.copy(t.start) : null;
    const a = -(t.start.dot(this.normal) + this.constant) / i;
    return a < 0 || a > 1 ? null : e.copy(t.start).addScaledVector(s, a);
  }
  intersectsLine(t) {
    const e = this.distanceToPoint(t.start),
      s = this.distanceToPoint(t.end);
    return (e < 0 && s > 0) || (s < 0 && e > 0);
  }
  intersectsBox(t) {
    return t.intersectsPlane(this);
  }
  intersectsSphere(t) {
    return t.intersectsPlane(this);
  }
  coplanarPoint(t) {
    return t.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4(t, e) {
    const s = e || q7.getNormalMatrix(t),
      i = this.coplanarPoint(Cg).applyMatrix4(t),
      a = this.normal.applyMatrix3(s).normalize();
    return ((this.constant = -i.dot(a)), this);
  }
  translate(t) {
    return ((this.constant -= t.dot(this.normal)), this);
  }
  equals(t) {
    return t.normal.equals(this.normal) && t.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}

const Y0 = new Rf(),
  X7 = new Ee(0.5, 0.5),
  Iu = new dt();

class pm {
  constructor(t = new g0(), e = new g0(), s = new g0(), i = new g0(), a = new g0(), o = new g0()) {
    this.planes = [t, e, s, i, a, o];
  }
  set(t, e, s, i, a, o) {
    const r = this.planes;
    return (r[0].copy(t), r[1].copy(e), r[2].copy(s), r[3].copy(i), r[4].copy(a), r[5].copy(o), this);
  }
  copy(t) {
    const e = this.planes;
    for (let s = 0; s < 6; s++) e[s].copy(t.planes[s]);
    return this;
  }
  setFromProjectionMatrix(t, e = Uo, s = !1) {
    const i = this.planes,
      a = t.elements,
      o = a[0],
      r = a[1],
      l = a[2],
      c = a[3],
      f = a[4],
      d = a[5],
      h = a[6],
      u = a[7],
      m = a[8],
      x = a[9],
      p = a[10],
      g = a[11],
      y = a[12],
      v = a[13],
      _ = a[14],
      k = a[15];
    if (
      (i[0].setComponents(c - o, u - f, g - m, k - y).normalize(),
      i[1].setComponents(c + o, u + f, g + m, k + y).normalize(),
      i[2].setComponents(c + r, u + d, g + x, k + v).normalize(),
      i[3].setComponents(c - r, u - d, g - x, k - v).normalize(),
      s)
    )
      (i[4].setComponents(l, h, p, _).normalize(),
        i[5].setComponents(c - l, u - h, g - p, k - _).normalize());
    else if ((i[4].setComponents(c - l, u - h, g - p, k - _).normalize(), e === Uo))
      i[5].setComponents(c + l, u + h, g + p, k + _).normalize();
    else if (e === z1) i[5].setComponents(l, h, p, _).normalize();
    else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + e);
    return this;
  }
  intersectsObject(t) {
    if (t.boundingSphere !== void 0)
      (t.boundingSphere === null && t.computeBoundingSphere(),
        Y0.copy(t.boundingSphere).applyMatrix4(t.matrixWorld));
    else {
      const e = t.geometry;
      (e.boundingSphere === null && e.computeBoundingSphere(),
        Y0.copy(e.boundingSphere).applyMatrix4(t.matrixWorld));
    }
    return this.intersectsSphere(Y0);
  }
  intersectsSprite(t) {
    Y0.center.set(0, 0, 0);
    const e = X7.distanceTo(t.center);
    return ((Y0.radius = 0.7071067811865476 + e), Y0.applyMatrix4(t.matrixWorld), this.intersectsSphere(Y0));
  }
  intersectsSphere(t) {
    const e = this.planes,
      s = t.center,
      i = -t.radius;
    for (let a = 0; a < 6; a++) if (e[a].distanceToPoint(s) < i) return !1;
    return !0;
  }
  intersectsBox(t) {
    const e = this.planes;
    for (let s = 0; s < 6; s++) {
      const i = e[s];
      if (
        ((Iu.x = i.normal.x > 0 ? t.max.x : t.min.x),
        (Iu.y = i.normal.y > 0 ? t.max.y : t.min.y),
        (Iu.z = i.normal.z > 0 ? t.max.z : t.min.z),
        i.distanceToPoint(Iu) < 0)
      )
        return !1;
    }
    return !0;
  }
  containsPoint(t) {
    const e = this.planes;
    for (let s = 0; s < 6; s++) if (e[s].distanceToPoint(t) < 0) return !1;
    return !0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}

class Y7 extends Uh {
  constructor(t) {
    (super(),
      (this.isPointsMaterial = !0),
      (this.type = "PointsMaterial"),
      (this.color = new Ut(16777215)),
      (this.map = null),
      (this.alphaMap = null),
      (this.size = 1),
      (this.sizeAttenuation = !0),
      (this.fog = !0),
      this.setValues(t));
  }
  copy(t) {
    return (
      super.copy(t),
      this.color.copy(t.color),
      (this.map = t.map),
      (this.alphaMap = t.alphaMap),
      (this.size = t.size),
      (this.sizeAttenuation = t.sizeAttenuation),
      (this.fog = t.fog),
      this
    );
  }
}

const Mv = new Ke(),
  J5 = new J3(),
  Pu = new Rf(),
  Du = new dt();

class K7 extends Ws {
  constructor(t = new Bn(), e = new Y7()) {
    (super(),
      (this.isPoints = !0),
      (this.type = "Points"),
      (this.geometry = t),
      (this.material = e),
      (this.morphTargetDictionary = void 0),
      (this.morphTargetInfluences = void 0),
      this.updateMorphTargets());
  }
  copy(t, e) {
    return (
      super.copy(t, e),
      (this.material = Array.isArray(t.material) ? t.material.slice() : t.material),
      (this.geometry = t.geometry),
      this
    );
  }
  raycast(t, e) {
    const s = this.geometry,
      i = this.matrixWorld,
      a = t.params.Points.threshold,
      o = s.drawRange;
    if (
      (s.boundingSphere === null && s.computeBoundingSphere(),
      Pu.copy(s.boundingSphere),
      Pu.applyMatrix4(i),
      (Pu.radius += a),
      t.ray.intersectsSphere(Pu) === !1)
    )
      return;
    (Mv.copy(i).invert(), J5.copy(t.ray).applyMatrix4(Mv));
    const r = a / ((this.scale.x + this.scale.y + this.scale.z) / 3),
      l = r * r,
      c = s.index,
      d = s.attributes.position;
    if (c !== null) {
      const h = Math.max(0, o.start),
        u = Math.min(c.count, o.start + o.count);
      for (let m = h, x = u; m < x; m++) {
        const p = c.getX(m);
        (Du.fromBufferAttribute(d, p), kv(Du, p, l, i, t, e, this));
      }
    } else {
      const h = Math.max(0, o.start),
        u = Math.min(d.count, o.start + o.count);
      for (let m = h, x = u; m < x; m++) (Du.fromBufferAttribute(d, m), kv(Du, m, l, i, t, e, this));
    }
  }
  updateMorphTargets() {
    const e = this.geometry.morphAttributes,
      s = Object.keys(e);
    if (s.length > 0) {
      const i = e[s[0]];
      if (i !== void 0) {
        ((this.morphTargetInfluences = []), (this.morphTargetDictionary = {}));
        for (let a = 0, o = i.length; a < o; a++) {
          const r = i[a].name || String(a);
          (this.morphTargetInfluences.push(0), (this.morphTargetDictionary[r] = a));
        }
      }
    }
  }
}

function kv(n, t, e, s, i, a, o) {
  const r = J5.distanceSqToPoint(n);
  if (r < e) {
    const l = new dt();
    (J5.closestPointToPoint(n, l), l.applyMatrix4(s));
    const c = i.ray.origin.distanceTo(l);
    if (c < i.near || c > i.far) return;
    a.push({
      distance: c,
      distanceToRay: Math.sqrt(r),
      point: l,
      index: t,
      face: null,
      faceIndex: null,
      barycoord: null,
      object: o,
    });
  }
}

class Z7 extends Vs {
  constructor(t, e, s, i, a, o, r, l, c) {
    (super(t, e, s, i, a, o, r, l, c), (this.isCanvasTexture = !0), (this.needsUpdate = !0));
  }
}
export { On, hm, um, Ae, Bn, Sn, Oh, hf, ki, vM, N0, An, bM, Yi, _M, G7, Ji, Rg, tx, wM, MM, No, zr, Qs, kM, g0, pm, K7, Z7 };
