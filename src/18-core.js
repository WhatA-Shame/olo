// 18-core.js — core｜55 个顶层语句｜66KB
// 对应 game.pretty.js 第 33802–36609 行
// 关键内容：
//   oP                    弹道：线性阻尼 + 重力(有阻尼时趋向终端速度)
//   cP                    噪声顺着带子向尾部流动，把边缘侵蚀成火舌/烟缕
//   rP                    position
//   dP                    position
//   MP                    direction
//   o3                    vent
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { Ee, Pi, fi } from './04-audio-2.js';
import { dt } from './05-three.js';
import { Ut } from './06-three-2.js';
import { An, Bn, MM, No, On, Sn } from './07-three-3.js';
import { Cf, Gl, rx } from './08-three-4.js';
import { Vl, zf } from './15-render-4.js';
import { Bh, Ft, gx, ih, ji } from './16-render-5.js';
import { $e, Lt, So, W, XM, Xt, Xu, oe, pa, qe, sn, ws } from './17-three-8.js';

const oP = `
uniform float uNow;
uniform vec2 uAtlas;
attribute vec4 aP;
attribute vec4 aV;
attribute vec4 aM;
attribute vec4 aS;
attribute vec4 aC0;
attribute vec4 aC1;
attribute vec4 aX;
varying vec2 vUv;
varying vec4 vColor;
varying vec2 vMix;
void main() {
  float age = uNow - aP.w;
  float life = aV.w;
  float t = life > 0.0 ? age / life : 2.0;
  if (age < 0.0 || t >= 1.0) {
    gl_Position = vec4(0.0, 0.0, 2.0, 1.0);
    return;
  }
  float motion = step(3.5, aS.w);
  float orient = aS.w - motion * 4.0;
  vec3 pos;
  vec3 vel;
  float rot;
  if (motion < 0.5) {
    // 弹道：线性阻尼 + 重力(有阻尼时趋向终端速度)
    float k = aM.y;
    float g = aM.x;
    if (k > 0.001) {
      float e = exp(-k * age);
      float f = (1.0 - e) / k;
      pos = aP.xyz + aV.xyz * f;
      vel = aV.xyz * e;
      pos.y -= g * (age - f) / k;
      vel.y -= g * (1.0 - e) / k;
    } else {
      pos = aP.xyz + aV.xyz * age;
      vel = aV.xyz;
      pos.y -= 0.5 * g * age * age;
      vel.y -= g * age;
    }
    // 受重力的碎屑落到地面就停住
    if (g > 0.0) pos.y = max(pos.y, 0.05);
    rot = aM.z + aM.w * age;
  } else {
    // 环绕：半径 r0→r1，角度 θ0 + ω·age，竖直匀速(可带重力)
    float r = mix(aV.x, aV.z, t);
    float th = aM.z + aM.w * age;
    float cs = cos(th);
    float sn = sin(th);
    pos = aP.xyz + vec3(cs * r, aV.y * age - 0.5 * aM.x * age * age, sn * r);
    vel = vec3(-sn * r * aM.w + cs * (aV.z - aV.x) / life, aV.y - aM.x * age, cs * r * aM.w + sn * (aV.z - aV.x) / life);
    rot = -th;
  }
  float grow = 1.0 - (1.0 - t) * (1.0 - t);
  float size = mix(aS.x, aS.y, grow);
  float alpha = mix(aC0.a, aC1.a, t) * smoothstep(0.0, max(aX.z, 1e-4), t) * (1.0 - smoothstep(aX.w, 1.0, t));
  vec3 color = mix(aC0.rgb, aC1.rgb, t);
  vec2 corner = position.xy;
  vec4 mv;
  if (orient < 0.5) {
    float cr = cos(rot);
    float sr = sin(rot);
    mv = viewMatrix * vec4(pos, 1.0);
    mv.xy += vec2(corner.x * cr - corner.y * sr, corner.x * sr + corner.y * cr) * size;
    // 朝相机拉近半个身位(+ 样式指定的额外量)：贴近地面的公告板下半截不会被地面裁掉
    mv.z += size * 0.5 + aS.z;
  } else if (orient < 1.5) {
    mv = viewMatrix * vec4(pos, 1.0);
    vec3 vv = (viewMatrix * vec4(vel, 0.0)).xyz;
    float sp = length(vv.xy);
    vec2 d = sp > 1e-4 ? vv.xy / sp : vec2(1.0, 0.0);
    float len = size + aS.z * length(vel);
    mv.xy += d * (corner.x * len) + vec2(-d.y, d.x) * (corner.y * size);
    mv.z += size * 0.5;
  } else {
    float cr = cos(rot);
    float sr = sin(rot);
    vec2 q = vec2(corner.x * cr - corner.y * sr, corner.x * sr + corner.y * cr) * size;
    mv = viewMatrix * vec4(pos + vec3(q.x, 0.0, q.y), 1.0);
  }
  gl_Position = projectionMatrix * mv;
  float cell = aX.x;
  float cx = mod(cell, ${ji}.0);
  float cy = floor(cell / ${ji}.0);
  vUv = (vec2(cx, cy) + vec2(corner.x + 0.5, 0.5 - corner.y)) * uAtlas;
  vColor = vec4(color, alpha);
  vMix = vec2(aX.y, max(color.r, max(color.g, color.b)) * 0.85);
}
`,
  KM = `
uniform sampler2D tAtlas;
varying vec2 vUv;
varying vec4 vColor;
varying vec2 vMix;
${zf}
void main() {
  vec4 tx = texture2D(tAtlas, vUv);
  float fxA = min(1.0, tx.r * vColor.a);
  if (fxA < 0.004) discard;
  float fxAdd = vMix.x;
  // 亮核主要是把本色提亮，只掺一点白：大量粒子叠在一起时颜色不至于被冲成纯白
  vec3 fxC = vColor.rgb * (tx.g + tx.b * 0.6) + vec3(tx.b * vMix.y * 0.3);
  ${gx}
}
`;

class rP {
  mesh;
  now = 0;
  spawned = 0;
  data;
  buffer;
  geo;
  mat;
  cap;
  cursor = 0;
  dirtyStart = 0;
  dirtyCount = 0;
  rangeA = { start: 0, count: 0 };
  rangeB = { start: 0, count: 0 };
  rnd = new XM(5370206);
  aliveUntil = 0;
  st = $e({ sprite: 0 });
  r0 = 1;
  g0 = 1;
  b0 = 1;
  r1 = 1;
  g1 = 1;
  b1 = 1;
  constructor(t, e) {
    ((this.cap = Math.min(Xu, e)), (this.data = new Float32Array(Xu * So)));
    const s = new Gl(1, 1),
      i = new Cf();
    (i.setIndex(s.getIndex()), i.setAttribute("position", s.getAttribute("position")));
    const a = new rx(this.data, So, 1);
    (a.setUsage(Pi),
      a.onUpload(() => {
        this.dirtyCount = 0;
      }),
      ["aP", "aV", "aM", "aS", "aC0", "aC1", "aX"].forEach((r, l) => i.setAttribute(r, new No(a, 4, l * 4))),
      (i.instanceCount = this.cap),
      (this.buffer = a),
      (this.geo = i),
      (this.mat = new An({
        uniforms: { uNow: { value: 0 }, uAtlas: { value: new Ee(1 / ji, 1 / ih) }, tAtlas: { value: t } },
        vertexShader: oP,
        fragmentShader: KM,
        depthTest: !0,
      })),
      Bh(this.mat),
      (this.mesh = new Sn(i, this.mat)),
      (this.mesh.name = "fx.particles"),
      (this.mesh.frustumCulled = !1),
      (this.mesh.renderOrder = 9));
  }
  setCapacity(t) {
    ((this.cap = Math.max(256, Math.min(Xu, t))),
      this.cursor >= this.cap && (this.cursor = 0),
      (this.geo.instanceCount = this.cap));
  }
  get capacity() {
    return this.cap;
  }
  use(t) {
    return (
      (this.st = t),
      (this.r0 = t.c0.r * t.i0),
      (this.g0 = t.c0.g * t.i0),
      (this.b0 = t.c0.b * t.i0),
      (this.r1 = t.c1.r * t.i1),
      (this.g1 = t.c1.g * t.i1),
      (this.b1 = t.c1.b * t.i1),
      this
    );
  }
  tint(t, e = t) {
    const s = this.st;
    return (
      (this.r0 = t.r * s.i0),
      (this.g0 = t.g * s.i0),
      (this.b0 = t.b * s.i0),
      (this.r1 = e.r * s.i1),
      (this.g1 = e.g * s.i1),
      (this.b1 = e.b * s.i1),
      this
    );
  }
  write(t, e, s, i, a, o, r) {
    const l = this.st,
      c = this.data,
      f = this.cursor,
      d = f * So,
      h = l.vary > 0 ? 1 - l.vary * this.rnd.next() : 1;
    return (
      (c[d + 3] = this.now + r),
      (c[d + 7] = i),
      this.now + r + i > this.aliveUntil && (this.aliveUntil = this.now + r + i),
      (c[d + 8] = l.gravity),
      (c[d + 9] = l.drag),
      (c[d + 10] = e),
      (c[d + 11] = s),
      (c[d + 12] = a * l.scale),
      (c[d + 13] = o * l.scale),
      (c[d + 14] = l.orient === pa.stretch ? l.stretch : l.pull),
      (c[d + 15] = t),
      (c[d + 16] = this.r0 * h),
      (c[d + 17] = this.g0 * h),
      (c[d + 18] = this.b0 * h),
      (c[d + 19] = l.a0),
      (c[d + 20] = this.r1 * h),
      (c[d + 21] = this.g1 * h),
      (c[d + 22] = this.b1 * h),
      (c[d + 23] = l.a1),
      (c[d + 24] = l.sprite2 !== l.sprite && this.rnd.next() < 0.5 ? l.sprite2 : l.sprite),
      (c[d + 25] = l.add),
      (c[d + 26] = l.fadeIn),
      (c[d + 27] = l.fadeOut),
      this.dirtyCount === 0 && (this.dirtyStart = f),
      this.dirtyCount < this.cap && this.dirtyCount++,
      (this.cursor = f + 1 >= this.cap ? 0 : f + 1),
      this.spawned++,
      d
    );
  }
  spawn(t, e, s, i, a, o, r, l, c, f = 0) {
    const d = this.st,
      h = Number.isNaN(d.rot) ? this.rnd.next() * 6.2831853 : d.rot,
      u = d.spin !== 0 ? d.spin * this.rnd.signed() : 0,
      m = this.write(d.orient, h, u, r, l, c, f),
      x = this.data;
    ((x[m] = t), (x[m + 1] = e), (x[m + 2] = s), (x[m + 4] = i), (x[m + 5] = a), (x[m + 6] = o));
  }
  orbit(t, e, s, i, a, o, r, l, c, f, d, h = 0) {
    const u = this.write(this.st.orient + 4, o, r, c, f, d, h),
      m = this.data;
    ((m[u] = t), (m[u + 1] = e), (m[u + 2] = s), (m[u + 4] = i), (m[u + 5] = l), (m[u + 6] = a));
  }
  flush() {
    ((this.mat.uniforms.uNow.value = this.now), (this.mesh.visible = this.now < this.aliveUntil));
    const t = this.dirtyCount;
    if (t === 0) return;
    const e = this.buffer;
    if (((e.updateRanges.length = 0), t < this.cap)) {
      const s = this.dirtyStart + t;
      s <= this.cap
        ? ((this.rangeA.start = this.dirtyStart * So),
          (this.rangeA.count = t * So),
          e.updateRanges.push(this.rangeA))
        : ((this.rangeA.start = this.dirtyStart * So),
          (this.rangeA.count = (this.cap - this.dirtyStart) * So),
          (this.rangeB.start = 0),
          (this.rangeB.count = (s - this.cap) * So),
          e.updateRanges.push(this.rangeA, this.rangeB));
    }
    e.needsUpdate = !0;
  }
  liveCount() {
    const t = this.data;
    let e = 0;
    for (let s = 0; s < this.cap; s++) {
      const i = s * So,
        a = this.now - t[i + 3];
      a >= 0 && a < t[i + 7] && e++;
    }
    return e;
  }
  clear() {
    const t = this.data;
    for (let e = 0; e < Xu; e++) t[e * So + 7] = 0;
    ((this.cursor = 0), (this.dirtyStart = 0), (this.dirtyCount = this.cap), (this.aliveUntil = 0));
  }
  dispose() {
    (this.geo.dispose(), this.mat.dispose());
  }
}

const Yu = 56,
  os = 16,
  Ka = 16;

function wi(n) {
  const t = n.intensity ?? 1;
  return {
    width: n.width,
    life: n.life,
    c0: new Ut(n.color),
    c1: new Ut(n.color2 ?? n.color),
    i0: t,
    i1: n.intensity2 ?? t,
    add: n.add ?? 1,
    taper: n.taper ?? 0,
    noise: n.noise ?? 0,
    flat: n.flat ? 1 : 0,
    core: n.core ?? 0.5,
    alpha: n.alpha ?? 1,
    step: n.step ?? 0.25,
  };
}

class lP {
  active = !1;
  emitting = !1;
  once = !1;
  stale = !1;
  gen = 0;
  style = wi({ width: 0.1, life: 0.1, color: 16777215 });
  c0 = new Ut();
  c1 = new Ut();
  widthScale = 1;
  px = new Float32Array(os);
  py = new Float32Array(os);
  pz = new Float32Array(os);
  birth = new Float32Array(os);
  head = -1;
  count = 0;
  hx = 0;
  hy = 0;
  hz = 0;
  endTime = 0;
}

const cP = `
attribute vec3 aTan;
attribute vec4 aRib;
attribute vec4 aCol;
attribute vec2 aFx;
varying vec4 vCol;
varying vec4 vRib;
varying vec2 vFx;
void main() {
  float side = uv.x;
  float hw = aRib.x;
  vec4 mv = viewMatrix * vec4(position, 1.0);
  if (aRib.w > 0.5) {
    vec2 t = aTan.xz;
    float l = length(t);
    t = l > 1e-5 ? t / l : vec2(1.0, 0.0);
    mv = viewMatrix * vec4(position + vec3(-t.y, 0.0, t.x) * (side * hw), 1.0);
  } else {
    vec3 tv = (viewMatrix * vec4(aTan, 0.0)).xyz;
    vec3 nv = cross(tv, mv.xyz);
    float l = length(nv);
    nv = l > 1e-6 ? nv / l : vec3(0.0, 1.0, 0.0);
    mv.xyz += nv * (side * hw);
  }
  gl_Position = projectionMatrix * mv;
  vCol = aCol;
  vRib = vec4(side, aRib.y, aRib.z, uv.y);
  vFx = aFx;
}
`,
  fP = `
uniform float uNow;
varying vec4 vCol;
varying vec4 vRib;
varying vec2 vFx;
${Vl}
${zf}
void main() {
  float v = vRib.x;
  float prof = max(0.0, 1.0 - v * v);
  float a = prof * sqrt(prof);
  if (vFx.x > 0.0) {
    // 噪声顺着带子向尾部流动，把边缘侵蚀成火舌/烟缕
    float n = fbm(vec2(vRib.y * 5.0 + vRib.w * 3.0 - uNow * 2.6, v * 1.6 + vRib.w * 7.0));
    a *= mix(1.0, smoothstep(0.25, 0.75, n + prof * 0.45 - vRib.y * 0.35), vFx.x);
  }
  float fxA = min(1.0, a * vRib.z);
  if (fxA < 0.004) discard;
  float fxAdd = vCol.a;
  float m = max(vCol.r, max(vCol.g, vCol.b));
  float core = vFx.y * prof * prof * prof;
  vec3 fxC = vCol.rgb * (1.0 + core * 0.6) + vec3(m * core * 0.3);
  ${gx}
}
`;

class dP {
  mesh;
  now = 0;
  ribbons = [];
  data;
  buffer;
  geo;
  mat;
  range = { start: 0, count: 0 };
  lastHi = 0;
  constructor() {
    const t = Yu * os * 2;
    this.data = new Float32Array(t * Ka);
    for (let o = 0; o < Yu; o++) this.ribbons.push(new lP());
    const e = new Bn(),
      s = new MM(this.data, Ka);
    (s.setUsage(Pi),
      e.setAttribute("position", new No(s, 3, 0)),
      e.setAttribute("aTan", new No(s, 3, 3)),
      e.setAttribute("aRib", new No(s, 4, 6)),
      e.setAttribute("aCol", new No(s, 4, 10)),
      e.setAttribute("aFx", new No(s, 2, 14)));
    const i = new Float32Array(t * 2),
      a = [];
    for (let o = 0; o < Yu; o++) {
      const r = (o * 0.6180339) % 1;
      for (let l = 0; l < os; l++) {
        const c = (o * os + l) * 2;
        ((i[c * 2] = -1),
          (i[c * 2 + 1] = r),
          (i[c * 2 + 2] = 1),
          (i[c * 2 + 3] = r),
          l < os - 1 && a.push(c, c + 1, c + 2, c + 1, c + 3, c + 2));
      }
    }
    (e.setAttribute("uv", new On(i, 2)),
      e.setIndex(a),
      e.setDrawRange(0, 0),
      (this.geo = e),
      (this.buffer = s),
      (this.mat = new An({
        uniforms: { uNow: { value: 0 } },
        vertexShader: cP,
        fragmentShader: fP,
        side: fi,
      })),
      Bh(this.mat),
      (this.mesh = new Sn(e, this.mat)),
      (this.mesh.name = "fx.ribbons"),
      (this.mesh.frustumCulled = !1),
      (this.mesh.renderOrder = 8));
  }
  alloc() {
    for (const t of this.ribbons)
      if (!t.active)
        return (
          (t.active = !0),
          (t.stale = !1),
          (t.once = !1),
          (t.emitting = !0),
          (t.count = 0),
          (t.head = -1),
          (t.widthScale = 1),
          (t.gen = (t.gen + 1) & 65535),
          t
        );
    return null;
  }
  pushPoint(t, e, s, i, a) {
    ((t.head = (t.head + 1) % os),
      (t.px[t.head] = e),
      (t.py[t.head] = s),
      (t.pz[t.head] = i),
      (t.birth[t.head] = a),
      t.count < os - 1 && t.count++);
  }
  start(t, e, s, i, a, o) {
    const r = this.alloc();
    return r
      ? ((r.style = t),
        r.c0.copy(a ?? t.c0),
        r.c1.copy(o ?? a ?? t.c1),
        (r.hx = e),
        (r.hy = s),
        (r.hz = i),
        this.pushPoint(r, e, s, i, this.now),
        this.ribbons.indexOf(r) | (r.gen << 8))
      : -1;
  }
  get(t) {
    if (t < 0) return null;
    const e = this.ribbons[t & 255];
    return e && e.active && e.gen === t >> 8 ? e : null;
  }
  move(t, e, s, i) {
    const a = this.get(t);
    if (!a || !a.emitting) return;
    ((a.hx = e), (a.hy = s), (a.hz = i));
    const o = a.head,
      r = e - a.px[o],
      l = s - a.py[o],
      c = i - a.pz[o],
      f = a.style;
    (r * r + l * l + c * c > f.step * f.step || this.now - a.birth[o] > f.life / (os - 3)) &&
      this.pushPoint(a, e, s, i, this.now);
  }
  setWidth(t, e) {
    const s = this.get(t);
    s && (s.widthScale = e);
  }
  end(t) {
    const e = this.get(t);
    !e ||
      !e.emitting ||
      ((e.emitting = !1), (e.endTime = this.now), this.pushPoint(e, e.hx, e.hy, e.hz, this.now));
  }
  trace(t, e, s, i, a, o, r, l, c, f, d = 0) {
    const h = this.alloc();
    if (!h) return;
    ((h.style = t), h.c0.copy(c ?? t.c0), h.c1.copy(f ?? c ?? t.c1));
    const u = os - 2;
    for (let m = 0; m <= u; m++) {
      const x = m / u;
      this.pushPoint(
        h,
        e + (a - e) * x,
        s + (o - s) * x + Math.sin(x * Math.PI) * d,
        i + (r - i) * x,
        this.now + l * x,
      );
    }
    ((h.count = os - 1), (h.hx = a), (h.hy = o), (h.hz = r), (h.emitting = !1), (h.endTime = this.now));
  }
  line(t, e, s, i, a, o, r, l, c = 1) {
    const f = this.alloc();
    if (!f) return;
    ((f.style = t), f.c0.copy(l ?? t.c0), f.c1.copy(l ?? t.c1), (f.once = !0), (f.widthScale = c));
    const d = 6;
    for (let h = 0; h <= d; h++) {
      const u = h / d;
      this.pushPoint(f, e + (a - e) * u, s + (o - s) * u, i + (r - i) * u, this.now);
    }
    ((f.hx = a), (f.hy = o), (f.hz = r), (f.emitting = !1));
  }
  flush() {
    this.mat.uniforms.uNow.value = this.now;
    const t = this.now,
      e = this.data;
    let s = 0;
    for (let a = 0; a < Yu; a++) {
      const o = this.ribbons[a],
        r = a * os * 2 * Ka;
      if (!o.active) {
        o.stale && (e.fill(0, r, r + os * 2 * Ka), (o.stale = !1), (s = a + 1));
        continue;
      }
      s = a + 1;
      const l = o.style,
        c = l.life;
      let f = 0,
        d = 0,
        h = 0,
        u = 0,
        m = !1;
      const x = o.count + (o.emitting ? 1 : 0);
      for (let p = 0; p < os; p++) {
        let g, y, v, _;
        if (p < x) {
          if (o.emitting && p === 0) ((g = o.hx), (y = o.hy), (v = o.hz), (_ = 0));
          else {
            const M = (o.head - (o.emitting ? p - 1 : p) + os * 2) % os;
            ((g = o.px[M]), (y = o.py[M]), (v = o.pz[M]), (_ = o.once ? p / (x - 1) : (t - o.birth[M]) / c));
          }
          (_ < 1 && (m = !0), (d = g), (h = y), (u = v));
        } else ((g = d), (y = h), (v = u), (_ = 2));
        const k = r + f * 2 * Ka;
        ((e[k] = g), (e[k + 1] = y), (e[k + 2] = v), (e[k + 7] = _), f++);
      }
      if (o.once) {
        for (let p = 0; p < os; p++) {
          const g = r + p * 2 * Ka,
            y = e[g + 7],
            v = y <= 1 ? 1 : 0,
            _ = v * Math.min(1, Math.min(y, 1 - y) * 5 + 0.25);
          this.writePoint(g, o, l, p, l.width * 0.5 * _, v * l.alpha * o.widthScale, 0, y);
        }
        ((o.active = !1), (o.stale = !0));
        continue;
      }
      if (!m && !o.emitting) {
        ((o.active = !1), e.fill(0, r, r + os * 2 * Ka));
        continue;
      }
      for (let p = 0; p < os; p++) {
        const g = r + p * 2 * Ka,
          y = e[g + 7];
        if (y >= 1) {
          this.writePoint(g, o, l, p, 0, 0, 1, 1);
          continue;
        }
        const v = y < 0 ? 0 : y,
          _ = l.width * 0.5 * o.widthScale * (1 + (l.taper - 1) * v),
          k = y < 0 ? 0 : l.alpha * (1 - v) * (1 - v * v);
        this.writePoint(g, o, l, p, _, k, v, v);
      }
    }
    const i = Math.max(s, this.lastHi);
    ((this.lastHi = s),
      this.geo.setDrawRange(0, s * (os - 1) * 6),
      i > 0 &&
        ((this.range.start = 0),
        (this.range.count = i * os * 2 * Ka),
        (this.buffer.updateRanges.length = 0),
        this.buffer.updateRanges.push(this.range),
        (this.buffer.needsUpdate = !0)),
      (this.mesh.visible = s > 0));
  }
  writePoint(t, e, s, i, a, o, r, l) {
    const c = this.data,
      f = 2 * Ka,
      d = i > 0 ? t - f : t,
      h = i < os - 1 ? t + f : t;
    let u = c[d] - c[h],
      m = c[d + 1] - c[h + 1],
      x = c[d + 2] - c[h + 2];
    u * u + m * m + x * x < 1e-10 && (i > 0 ? ((u = c[d + 3]), (m = c[d + 4]), (x = c[d + 5])) : (u = 1));
    const p = (e.c0.r + (e.c1.r - e.c0.r) * r) * (s.i0 + (s.i1 - s.i0) * r),
      g = (e.c0.g + (e.c1.g - e.c0.g) * r) * (s.i0 + (s.i1 - s.i0) * r),
      y = (e.c0.b + (e.c1.b - e.c0.b) * r) * (s.i0 + (s.i1 - s.i0) * r),
      v = c[t],
      _ = c[t + 1],
      k = c[t + 2];
    for (let M = 0; M < 2; M++) {
      const S = t + M * Ka;
      ((c[S] = v),
        (c[S + 1] = _),
        (c[S + 2] = k),
        (c[S + 3] = u),
        (c[S + 4] = m),
        (c[S + 5] = x),
        (c[S + 6] = a),
        (c[S + 7] = l),
        (c[S + 8] = o),
        (c[S + 9] = s.flat),
        (c[S + 10] = p),
        (c[S + 11] = g),
        (c[S + 12] = y),
        (c[S + 13] = s.add),
        (c[S + 14] = s.noise),
        (c[S + 15] = s.core));
    }
  }
  clear() {
    for (const t of this.ribbons) (t.active && (t.stale = !0), (t.active = !1));
  }
  dispose() {
    (this.geo.dispose(), this.mat.dispose());
  }
}

const Mt = {
    spark: $e({
      scale: 2.2,
      sprite: Ft.streak,
      orient: pa.stretch,
      add: 0.45,
      color: 16760896,
      color2: 16734736,
      intensity: 1.7,
      intensity2: 1.1,
      gravity: 13,
      drag: 3.2,
      stretch: 0.045,
      fadeIn: 0.01,
      fadeOut: 0.35,
    }),
    streak: $e({
      scale: 2.5,
      sprite: Ft.streak,
      orient: pa.stretch,
      color: 16777215,
      intensity: 1.8,
      intensity2: 1,
      drag: 2.2,
      stretch: 0.05,
      fadeIn: 0.02,
      fadeOut: 0.35,
      add: 0.5,
    }),
    glint: $e({
      pull: 0.3,
      scale: 1.4,
      sprite: Ft.spark,
      add: 0.55,
      color: 16777215,
      intensity: 1.7,
      intensity2: 1.1,
      drag: 2.4,
      spin: 2.5,
      fadeIn: 0.15,
      fadeOut: 0.35,
    }),
    flash: $e({
      sprite: Ft.glow,
      add: 0.55,
      color: 16777215,
      intensity: 1.05,
      intensity2: 0.65,
      alpha: 0.9,
      fadeIn: 0.02,
      fadeOut: 0.1,
    }),
    burst: $e({
      sprite: Ft.burst,
      add: 0.6,
      color: 16777215,
      intensity: 1.25,
      intensity2: 0.8,
      fadeIn: 0.02,
      fadeOut: 0.15,
      spin: 0.8,
    }),
    dust: $e({
      sprite: Ft.smoke,
      sprite2: Ft.smoke2,
      add: 0,
      color: 12890772,
      color2: 10785394,
      alpha: 0.62,
      alpha2: 0.28,
      drag: 2.8,
      gravity: -0.5,
      spin: 0.9,
      fadeIn: 0.08,
      fadeOut: 0.3,
      vary: 0.22,
    }),
    smoke: $e({
      sprite: Ft.smoke,
      sprite2: Ft.smoke2,
      add: 0,
      color: 5920096,
      color2: 2762800,
      alpha: 0.7,
      alpha2: 0.3,
      drag: 1.6,
      gravity: -1.1,
      spin: 0.7,
      fadeIn: 0.1,
      fadeOut: 0.35,
      vary: 0.25,
    }),
    debris: $e({
      scale: 1.2,
      sprite: Ft.shard,
      add: 0,
      color: 10720902,
      color2: 8221030,
      gravity: 22,
      drag: 0.5,
      spin: 10,
      fadeIn: 0.01,
      fadeOut: 0.78,
      vary: 0.35,
    }),
    shard: $e({
      scale: 1.3,
      sprite: Ft.diamond,
      add: 0.35,
      color: 16777215,
      intensity: 1.8,
      intensity2: 1,
      gravity: 14,
      drag: 1.2,
      spin: 9,
      fadeIn: 0.01,
      fadeOut: 0.6,
      vary: 0.2,
    }),
    ember: $e({
      pull: 0.35,
      scale: 1.6,
      sprite: Ft.ember,
      add: 0.55,
      color: 16756800,
      color2: 16728080,
      intensity: 1.7,
      intensity2: 1,
      gravity: -2.4,
      drag: 1.4,
      fadeIn: 0.05,
      fadeOut: 0.4,
      vary: 0.3,
    }),
    flame: $e({
      pull: 0.45,
      scale: 1.15,
      sprite: Ft.flame,
      add: 0.2,
      color: 16756272,
      color2: 14691344,
      intensity: 1.3,
      intensity2: 0.9,
      gravity: -4.5,
      drag: 1.6,
      rot: 0,
      fadeIn: 0.1,
      fadeOut: 0.5,
      vary: 0.2,
    }),
    star: $e({
      pull: 0.3,
      scale: 1.25,
      sprite: Ft.star,
      add: 0.4,
      color: 16777215,
      intensity: 1.7,
      intensity2: 1.1,
      drag: 2.2,
      spin: 3,
      fadeIn: 0.08,
      fadeOut: 0.45,
    }),
    feather: $e({
      scale: 1.3,
      sprite: Ft.feather,
      add: 0.22,
      color: 16777215,
      color2: 13631464,
      intensity: 1.15,
      gravity: 2.4,
      drag: 2.6,
      spin: 4,
      fadeIn: 0.05,
      fadeOut: 0.6,
    }),
    leaf: $e({
      scale: 1.35,
      sprite: Ft.leaf,
      add: 0.2,
      color: 12124120,
      color2: 6283432,
      intensity: 1.4,
      gravity: 0.8,
      drag: 2.2,
      spin: 6,
      fadeIn: 0.06,
      fadeOut: 0.5,
    }),
    wisp: $e({
      pull: 0.5,
      sprite: Ft.wisp,
      sprite2: Ft.smoke,
      add: 0.12,
      color: 5913256,
      color2: 1708080,
      alpha: 0.8,
      alpha2: 0.3,
      gravity: -1.8,
      drag: 1.8,
      spin: 1.2,
      fadeIn: 0.1,
      fadeOut: 0.35,
      vary: 0.2,
    }),
    coin: $e({
      scale: 1.5,
      sprite: Ft.coin,
      add: 0.2,
      color: 16767072,
      color2: 16760880,
      intensity: 1.5,
      gravity: 14,
      drag: 0,
      spin: 5,
      fadeIn: 0.02,
      fadeOut: 0.85,
    }),
    ringB: $e({
      sprite: Ft.ring,
      add: 0.5,
      color: 16777215,
      intensity: 2,
      intensity2: 1,
      fadeIn: 0.03,
      fadeOut: 0.25,
    }),
    plus: $e({
      pull: 0.4,
      scale: 1.5,
      sprite: Ft.plus,
      add: 0.35,
      color: 11075520,
      color2: 3727488,
      intensity: 2,
      intensity2: 1.2,
      gravity: -1.2,
      drag: 1.2,
      rot: 0,
      fadeIn: 0.12,
      fadeOut: 0.5,
    }),
    hex: $e({
      scale: 1.3,
      sprite: Ft.hex,
      add: 0.4,
      color: 15267583,
      color2: 9423103,
      intensity: 2,
      intensity2: 1.2,
      gravity: 6,
      drag: 1.6,
      spin: 5,
      fadeIn: 0.02,
      fadeOut: 0.5,
    }),
    rune: $e({
      pull: 0.3,
      scale: 1.4,
      sprite: Ft.rune1,
      sprite2: Ft.rune2,
      add: 0.45,
      color: 16777215,
      intensity: 2.1,
      intensity2: 1.2,
      gravity: -0.8,
      drag: 1.5,
      rot: 0,
      fadeIn: 0.15,
      fadeOut: 0.55,
    }),
    ripple: $e({
      sprite: Ft.ring,
      orient: pa.flat,
      add: 0.5,
      color: 16777215,
      intensity: 1.6,
      intensity2: 0.8,
      fadeIn: 0.05,
      fadeOut: 0.3,
    }),
    drop: $e({
      scale: 1.3,
      sprite: Ft.drop,
      add: 0.3,
      color: 13168752,
      color2: 6269484,
      intensity: 1.4,
      gravity: 16,
      drag: 0.8,
      rot: 0,
      fadeIn: 0.02,
      fadeOut: 0.7,
    }),
    frost: $e({
      pull: 0.3,
      scale: 1.4,
      sprite: Ft.frost,
      add: 0.45,
      color: 15268095,
      color2: 8376575,
      intensity: 2,
      intensity2: 1.1,
      gravity: 0.6,
      drag: 2,
      spin: 2,
      fadeIn: 0.12,
      fadeOut: 0.5,
    }),
    crescent: $e({
      sprite: Ft.crescent,
      add: 0.4,
      color: 16777215,
      intensity: 1.6,
      intensity2: 0.9,
      fadeIn: 0.03,
      fadeOut: 0.2,
    }),
    arrow: $e({
      scale: 1.4,
      sprite: Ft.arrow,
      orient: pa.stretch,
      add: 0.35,
      color: 16056312,
      color2: 10354648,
      intensity: 1.9,
      stretch: 0.012,
      fadeIn: 0.04,
      fadeOut: 0.92,
    }),
    bubble: $e({
      sprite: Ft.bubble,
      add: 0.5,
      color: 16777215,
      intensity: 1.5,
      gravity: -1.5,
      drag: 1.5,
      fadeIn: 0.15,
      fadeOut: 0.6,
    }),
    bolt: $e({
      sprite: Ft.bolt,
      add: 0.3,
      pull: 0.5,
      color: 16765002,
      intensity: 1.4,
      drag: 4,
      fadeIn: 0.02,
      fadeOut: 0.3,
    }),
    hitFlash: $e({
      sprite: Ft.glow,
      add: 0.7,
      pull: 0.6,
      color: 16777215,
      intensity: 2.2,
      intensity2: 1.2,
      fadeIn: 0,
      fadeOut: 0.25,
    }),
    chip: $e({
      scale: 1.6,
      sprite: Ft.streak,
      orient: pa.stretch,
      add: 0.6,
      color: 16771248,
      color2: 16742944,
      intensity: 2,
      intensity2: 1,
      gravity: 9,
      drag: 5,
      stretch: 0.03,
      fadeIn: 0,
      fadeOut: 0.3,
    }),
    scale: $e({
      scale: 1.2,
      sprite: Ft.scale,
      add: 0.4,
      color: 13150463,
      color2: 6965976,
      intensity: 1.5,
      intensity2: 0.9,
      gravity: 1.5,
      drag: 2.2,
      spin: 6,
      fadeIn: 0.05,
      fadeOut: 0.55,
    }),
    puff: $e({
      sprite: Ft.puff,
      sprite2: Ft.smoke2,
      add: 0.3,
      color: 12099839,
      color2: 3811962,
      intensity: 1.2,
      intensity2: 0.7,
      alpha: 0.75,
      alpha2: 0.25,
      drag: 2.6,
      gravity: -0.6,
      spin: 1.4,
      fadeIn: 0.06,
      fadeOut: 0.35,
      vary: 0.2,
    }),
    broadleaf: $e({
      scale: 1.1,
      sprite: Ft.broadleaf,
      add: 0,
      color: 9417818,
      color2: 6261306,
      gravity: 2.2,
      drag: 3,
      spin: 7,
      fadeIn: 0.03,
      fadeOut: 0.6,
      vary: 0.25,
    }),
    splash: $e({
      sprite: Ft.splash,
      orient: pa.flat,
      add: 0.35,
      color: 15925243,
      color2: 12578800,
      intensity: 1.05,
      intensity2: 0.7,
      alpha: 0.9,
      alpha2: 0.4,
      fadeIn: 0.04,
      fadeOut: 0.35,
    }),
    droplet: $e({
      scale: 1.1,
      sprite: Ft.drop,
      add: 0.3,
      color: 15400955,
      color2: 10477800,
      intensity: 1.15,
      gravity: 14,
      drag: 0.6,
      rot: 0,
      fadeIn: 0.02,
      fadeOut: 0.6,
    }),
    star8: $e({
      pull: 0.3,
      scale: 1.3,
      sprite: Ft.star8,
      add: 0.5,
      color: 16773304,
      color2: 16764768,
      intensity: 1.8,
      intensity2: 1.1,
      drag: 1.8,
      spin: 1.5,
      fadeIn: 0.08,
      fadeOut: 0.5,
    }),
    goose: $e({
      sprite: Ft.goose,
      orient: pa.stretch,
      stretch: 0,
      add: 0.4,
      color: 15923455,
      color2: 10276095,
      intensity: 1.75,
      intensity2: 1,
      fadeIn: 0.06,
      fadeOut: 0.55,
    }),
    gooseShade: $e({
      sprite: Ft.goose,
      orient: pa.stretch,
      stretch: 0,
      add: 0,
      color: 1713240,
      alpha: 0.6,
      alpha2: 0.2,
      fadeIn: 0.06,
      fadeOut: 0.5,
    }),
    wave: $e({
      sprite: Ft.wave,
      orient: pa.stretch,
      stretch: 0,
      add: 0.5,
      color: 15923455,
      color2: 9225471,
      intensity: 1.8,
      intensity2: 1,
      drag: 3,
      fadeIn: 0.04,
      fadeOut: 0.35,
    }),
    mote: $e({
      pull: 0.3,
      sprite: Ft.dot,
      add: 0.65,
      color: 16773320,
      color2: 16762976,
      intensity: 2.2,
      intensity2: 1.1,
      drag: 2.2,
      fadeIn: 0.1,
      fadeOut: 0.4,
    }),
    string: $e({
      sprite: Ft.streak,
      orient: pa.stretch,
      add: 0.6,
      color: 16773832,
      color2: 16762976,
      intensity: 2.1,
      intensity2: 1.1,
      drag: 0.6,
      stretch: 0.05,
      fadeIn: 0,
      fadeOut: 0.45,
    }),
    ink: $e({
      sprite: Ft.ink,
      add: 0,
      color: 920086,
      color2: 1840168,
      alpha: 0.94,
      alpha2: 0.45,
      drag: 3.2,
      gravity: 1.2,
      spin: 0.7,
      fadeIn: 0.03,
      fadeOut: 0.45,
      vary: 0.1,
    }),
    inkFlat: $e({
      sprite: Ft.ink,
      orient: pa.flat,
      add: 0,
      color: 920086,
      color2: 1840168,
      alpha: 0.88,
      alpha2: 0.6,
      fadeIn: 0.02,
      fadeOut: 0.55,
    }),
    inkDot: $e({
      sprite: Ft.ember,
      add: 0,
      color: 920086,
      color2: 1840168,
      alpha: 0.95,
      alpha2: 0.7,
      gravity: 12,
      drag: 1.2,
      fadeIn: 0.01,
      fadeOut: 0.7,
    }),
    inkRise: $e({
      pull: 0.3,
      sprite: Ft.ember,
      add: 0,
      color: 1445922,
      color2: 2366004,
      alpha: 0.85,
      alpha2: 0.3,
      gravity: -1.4,
      drag: 1.6,
      fadeIn: 0.12,
      fadeOut: 0.45,
    }),
    silk: $e({
      sprite: Ft.shard,
      add: 0,
      color: 15919828,
      color2: 13615776,
      gravity: 2.4,
      drag: 2.8,
      spin: 5,
      fadeIn: 0.03,
      fadeOut: 0.6,
      vary: 0.12,
    }),
    grass: $e({
      sprite: Ft.leaf,
      add: 0,
      color: 11059296,
      color2: 7309882,
      gravity: 8,
      drag: 2.6,
      spin: 10,
      fadeIn: 0.02,
      fadeOut: 0.65,
      vary: 0.25,
    }),
    plume: $e({
      scale: 1.25,
      sprite: Ft.feather,
      add: 0.12,
      color: 16777215,
      color2: 15790838,
      intensity: 1.15,
      gravity: 1.5,
      drag: 2.8,
      spin: 3.2,
      fadeIn: 0.05,
      fadeOut: 0.6,
    }),
  },
  $n = {
    dust: wi({
      width: 1.3,
      life: 0.5,
      color: 12890772,
      color2: 10127984,
      add: 0,
      noise: 0.85,
      taper: 1.5,
      core: 0,
      alpha: 0.55,
      step: 0.35,
    }),
    energy: wi({
      width: 0.5,
      life: 0.25,
      color: 16777215,
      intensity: 1.5,
      intensity2: 0.9,
      add: 0.3,
      taper: 0.1,
      core: 0.4,
      step: 0.2,
    }),
    thin: wi({
      width: 0.16,
      life: 0.12,
      color: 16777215,
      intensity: 1.9,
      intensity2: 1,
      add: 0.5,
      taper: 0,
      core: 0.6,
      step: 0.2,
    }),
    bolt: wi({
      width: 0.62,
      life: 0.13,
      color: 16777215,
      intensity: 1.7,
      intensity2: 1,
      add: 0.35,
      taper: 0.2,
      core: 0.75,
      step: 0.15,
    }),
    dusty: wi({
      width: 0.42,
      life: 0.16,
      color: 13172720,
      color2: 3123360,
      intensity: 1.3,
      intensity2: 0.7,
      add: 0.3,
      noise: 0.6,
      taper: 0.4,
      core: 0.3,
      step: 0.18,
    }),
    fire: wi({
      width: 1.5,
      life: 0.5,
      color: 16742934,
      color2: 13114380,
      intensity: 1.35,
      intensity2: 0.9,
      add: 0.2,
      noise: 0.9,
      taper: 0.5,
      core: 0.2,
      step: 0.3,
    }),
    wind: wi({
      width: 0.6,
      life: 0.4,
      color: 8057538,
      color2: 2082948,
      intensity: 1.2,
      intensity2: 0.8,
      add: 0.3,
      noise: 0.7,
      taper: 0.2,
      core: 0.2,
      alpha: 0.75,
      step: 0.25,
    }),
    shadow: wi({
      width: 1.3,
      life: 0.45,
      color: 9067775,
      color2: 1708080,
      intensity: 1.3,
      intensity2: 0.6,
      add: 0.35,
      noise: 0.8,
      taper: 0.6,
      core: 0.25,
      alpha: 0.9,
      step: 0.3,
    }),
    smoke: wi({
      width: 0.6,
      life: 0.6,
      color: 9078416,
      color2: 4867664,
      add: 0,
      noise: 0.9,
      taper: 1.6,
      core: 0,
      alpha: 0.5,
      step: 0.3,
    }),
    ink: wi({
      width: 1.15,
      life: 0.5,
      color: 1182748,
      color2: 657424,
      add: 0,
      noise: 0.8,
      taper: 0.85,
      core: 0,
      alpha: 0.94,
      step: 0.3,
    }),
    string: wi({
      width: 0.12,
      life: 0.14,
      color: 16773832,
      color2: 16762976,
      intensity: 2.1,
      intensity2: 1.1,
      add: 0.55,
      taper: 0.5,
      core: 0.75,
      step: 0.2,
    }),
    white: wi({
      width: 0.2,
      life: 0.2,
      color: 16777215,
      color2: 14086884,
      intensity: 1.8,
      intensity2: 0.9,
      add: 0.45,
      taper: 0.05,
      core: 0.7,
      step: 0.25,
    }),
    warn: wi({ width: 0.13, life: 1, color: 16726568, intensity: 1.6, add: 0.45, noise: 0.25, core: 0.7 }),
    link: wi({ width: 0.14, life: 1, color: 16777215, intensity: 1.5, add: 0.45, noise: 0.2, core: 0.5 }),
  },
  hP = 0.6,
  uP = 0.55,
  pP = 0.55,
  mP = 0.65,
  ZM = 0.6;

function H0(n, t, e, s, i, a, o = W.spark, r = W.sparkDeep, l = 0, c = 0, f = 0, d = 0.4, h = 0.14) {
  const u = n.particles.use(Mt.spark).tint(o, r),
    m = n.rnd,
    x = n.n(i);
  for (let p = 0; p < x; p++) {
    const g = m.next() * oe,
      y = m.range(0.1, 1),
      v = Math.sqrt(1 - y * y * 0.6),
      _ = a * m.range(0.45, 1);
    u.spawn(
      t,
      e,
      s,
      (Math.cos(g) * v * (1 - f) + l * f * m.range(0.6, 1.3)) * _,
      y * _ * 0.9,
      (Math.sin(g) * v * (1 - f) + c * f * m.range(0.6, 1.3)) * _,
      d * m.range(0.6, 1.2),
      h * m.range(0.7, 1.3),
      h * 0.4,
    );
  }
}

function jo(n, t, e, s, i, a, o, r = o, l = 0.6, c = 0.34) {
  const f = n.particles.use(Mt.glint).tint(o === W.white ? r : o, r),
    d = n.rnd,
    h = n.n(i);
  for (let u = 0; u < h; u++) {
    const m = d.next() * oe,
      x = d.range(-0.3, 1),
      p = Math.sqrt(Math.max(0, 1 - x * x)),
      g = a * d.range(0.35, 1);
    f.spawn(
      t,
      e,
      s,
      Math.cos(m) * p * g,
      x * g,
      Math.sin(m) * p * g,
      l * d.range(0.6, 1.2),
      c * d.range(0.6, 1.3),
      c * 0.2,
      d.range(0, 0.06),
    );
  }
}

function L0(n, t, e, s, i, a, o = 0.22, r = !1) {
  (n.particles
    .use(Mt.flash)
    .tint(a)
    .spawn(t, e, s, 0, 0, 0, o, i * 0.55, i),
    r &&
      n.particles
        .use(Mt.burst)
        .tint(a)
        .spawn(t, e, s, 0, 0, 0, o * 0.9, i * 0.7, i * 1.5));
}

function Ha(n, t, e, s, i, a, o = W.dust, r = W.dustDark, l = 1.1, c = 0.8) {
  const f = n.particles.use(Mt.dust).tint(o, r),
    d = n.rnd,
    h = n.n(s),
    u = d.next() * oe;
  for (let m = 0; m < h; m++) {
    const x = u + (m / h) * oe + d.range(-0.2, 0.2),
      p = Math.cos(x),
      g = Math.sin(x),
      y = a * d.range(0.7, 1.15);
    f.spawn(
      t + p * i,
      d.range(0.15, 0.4),
      e + g * i,
      p * y,
      d.range(0.2, 1.2),
      g * y,
      c * d.range(0.7, 1.2),
      l * d.range(0.5, 0.8),
      l * d.range(1.2, 1.8),
    );
  }
}

function Ni(n, t, e, s, i, a, o, r = W.dust, l = W.dustDark, c = 0.7) {
  const f = n.particles.use(Mt.dust).tint(r, l),
    d = n.rnd,
    h = n.n(i);
  for (let u = 0; u < h; u++) {
    const m = d.next() * oe,
      x = Math.sqrt(d.next()) * a;
    f.spawn(
      t + Math.cos(m) * x,
      e + d.range(0, 0.4),
      s + Math.sin(m) * x,
      Math.cos(m) * d.range(0.3, 1.4),
      d.range(0.4, 1.6),
      Math.sin(m) * d.range(0.3, 1.4),
      c * d.range(0.7, 1.2),
      o * d.range(0.5, 0.8),
      o * d.range(1.1, 1.7),
    );
  }
}

function F0(n, t, e, s, i, a, o = 0.3, r = W.rock, l = W.dustDark, c = 0.3) {
  const f = n.particles.use(Mt.debris).tint(r, l),
    d = n.rnd,
    h = n.n(s);
  for (let u = 0; u < h; u++) {
    const m = d.next() * oe,
      x = i * d.range(0.3, 1),
      p = o * Math.sqrt(d.next()),
      g = c * d.range(0.5, 1.4);
    f.spawn(
      t + Math.cos(m) * p,
      0.2,
      e + Math.sin(m) * p,
      Math.cos(m) * x,
      a * d.range(0.5, 1.2),
      Math.sin(m) * x,
      d.range(0.7, 1.2),
      g,
      g * 0.8,
    );
  }
}

function U0(n, t, e, s, i, a, o, r, l = r, c = 0.26) {
  const f = n.particles.use(Mt.shard).tint(r, l),
    d = n.rnd,
    h = n.n(i);
  for (let u = 0; u < h; u++) {
    const m = d.next() * oe,
      x = a * d.range(0.3, 1),
      p = c * d.range(0.5, 1.3);
    f.spawn(t, e, s, Math.cos(m) * x, o * d.range(0.3, 1.2), Math.sin(m) * x, d.range(0.6, 1.1), p, p * 0.5);
  }
}

function gf(n, t, e, s, i, a, o, r = W.spark, l = W.ember, c = 1, f = 0.16) {
  const d = n.particles.use(Mt.ember).tint(r, l),
    h = n.rnd,
    u = n.n(i);
  for (let m = 0; m < u; m++) {
    const x = h.next() * oe,
      p = Math.sqrt(h.next()) * a;
    d.spawn(
      t + Math.cos(x) * p,
      e + h.range(0, 0.5),
      s + Math.sin(x) * p,
      Math.cos(x) * o * h.range(0.2, 1),
      o * h.range(0.4, 1.4),
      Math.sin(x) * o * h.range(0.2, 1),
      c * h.range(0.5, 1.2),
      f * h.range(0.6, 1.4),
      f * 0.3,
      h.range(0, 0.15),
    );
  }
}

const le = {
    flashBasic: 0.09,
    flashSkill: 0.14,
    flashBig: 0.2,
    chipLife: 0.25,
    chipCone: Math.PI / 3,
    shakeSkill: 0.12,
    shakeEpic: 0.4,
    lightMax: 8,
    lightDur: 0.35,
  },
  _r = {
    enemy: { edge: W.red, under: W.redDeep },
    ally: { edge: W.blue, under: W.blueDeep },
    mine: { edge: W.green, under: W.greenDeep },
    monster: { edge: W.amber, under: W.violetDeep },
  };

function vs(n, t, e, s, i, a, o, r, l, c, f = le.flashBasic, d = 9) {
  n.particles
    .use(Mt.hitFlash)
    .tint(W.white, a)
    .spawn(t, e, s, 0, 0, 0, f, i * 0.7, i);
  const h = n.particles.use(Mt.chip).tint(a, o),
    u = n.rnd,
    m = n.n(c),
    x = r === 0 && l === 0 ? u.next() * oe : Math.atan2(l, r),
    p = r === 0 && l === 0 ? Math.PI : le.chipCone * 0.5;
  for (let g = 0; g < m; g++) {
    const y = x + u.signed() * p,
      v = d * u.range(0.55, 1.1);
    h.spawn(
      t,
      e,
      s,
      Math.cos(y) * v,
      u.range(-0.2, 0.9) * v * 0.45,
      Math.sin(y) * v,
      le.chipLife * u.range(0.6, 1.15),
      0.13 * u.range(0.7, 1.2),
      0.04,
      f * 0.4,
    );
  }
}

function bn(n, t, e, s, i, a, o = 1.6, r = 0.15, l = 0.35, c = 0) {
  const f = n.decals
    .add(Xt.ring, t, e, s, i)
    .params(r, 1)
    .color(a, o)
    .under(W.shadow, Math.min(1, l * 1.8 + 0.1));
  c > 0 && f.delay(c);
}

function xx(n, t, e, s, i, a = W.black, o = W.shadow, r = 0.8) {
  n.decals.add(Xt.scorch, t, e, s, i).color(a, 1.6).under(o, r);
}

function Hh(n, t, e, s, i, a, o, r, l = 1.6, c = 0.9) {
  return n.glow
    .spawn(qe.sphere, sn.rim, o)
    .at(t, e, s)
    .scale(i, a)
    .color(r, l * hP, c)
    .fade(0.05, 0.25)
    .opt(0.3, 2.6, 1);
}

function gP(n, t, e, s, i, a, o, r, l = 2, c = 1) {
  return n.glow
    .spawn(qe.sphere, sn.core, o)
    .at(t, e, s)
    .scale(i, a)
    .color(r, l * uP, c)
    .fade(0.05, 0.2)
    .opt(0.5, 2.2, 1);
}

function Lr(n, t, e, s, i, a, o, r = 1.8, l = 0.9, c = 0.05) {
  return n.glow
    .spawn(qe.pillar, sn.pillar, a)
    .at(t, c, e)
    .scale3(s * 0.6, i * 0.5, s * 0.6, s, i, s)
    .color(o, r * pP, l)
    .fade(0.08, 0.35)
    .opt(0.25, 1.15, 1);
}

function wm(n, t, e, s, i, a, o, r, l, c = 1.8, f = 0.9) {
  return n.glow
    .spawn(qe.hoop, sn.hoop, r)
    .at(t, e, s)
    .vel(0, o, 0)
    .scale(i, a)
    .color(l, c * mP, f)
    .fade(0.1, 0.45)
    .opt(0.3, 2, 1);
}

const U1 = 2.5;

function qo(n, t, e, s, i, a, o, r, l = 2.2, c = 0, f = !0, d = 1) {
  const h = n.glow
    .spawn(qe.slash, sn.slash, o)
    .at(t, e, s)
    .scale(a * 0.92, a)
    .rot(c, -i, 0)
    .color(r, l * ZM, d)
    .fade(0.02, 0.5)
    .opt(0.2, 1, 1);
  return (f || (h.progress = -2), h);
}

function yx(n, t, e, s, i, a, o, r = W.white) {
  const l = n.rnd,
    c = Math.max(1, Math.round(s * (0.5 + 0.5 * n.density)));
  for (let f = 0; f < c; f++) {
    const d = l.next() * oe,
      h = i * l.range(0.4, 1),
      u = a * l.range(0.6, 1.1),
      m = 20,
      x = (2 * u) / m,
      p = o * l.range(0.5, 1.2),
      g = n.glow
        .spawn(qe.rock, sn.plain, x)
        .at(t + Math.cos(d) * 0.4, 0.1, e + Math.sin(d) * 0.4)
        .vel(Math.cos(d) * h, u, Math.sin(d) * h, m)
        .scale(p, p * 0.7)
        .color(r, 1);
    ((g.ease = 3),
      g.rot(l.next() * 3, l.next() * 6, l.next() * 3).spin(l.range(-7, 7), l.range(-5, 5), l.range(-7, 7)));
  }
}

function vx(n, t, e, s, i, a, o, r, l = 1.6, c = 0.9, f = 0.16, d = 0, h = 0) {
  return n.glow
    .spawn(qe.shield, sn.plate, o)
    .at(t, e, s)
    .scale(a * 0.72, a)
    .rot(0, -(i + d), h)
    .color(r, l * ZM, c)
    .fade(0.06, 0.45)
    .opt(0.25, f, 2);
}

function QM(n, t, e, s, i, a, o, r, l, c, f = 0, d = !1, h = 2.3, u, m = h * 1.15) {
  const x = d ? f + Math.PI : f,
    p = qo(n, t, e, s, i, a, o, r, h, x, !1, 0.9).fade(0.2, 0.45);
  p.scale(a * 0.85, a).k = c / U1;
  const g = qo(n, t, e, s, i, a * 1.02, o * 0.55, l, m, x, !0).fade(0.02, 0.6);
  return ((g.scale(a * 0.88, a * 1.02).k = c / U1), u && u.push(p, g), p);
}

function bx(n, t, e, s, i, a, o = 3, r = 1.6, l = !1, c = 0.16, f = 0) {
  const d = n.decals
    .add(Xt.rings, t, e, s, i)
    .params(o, l ? -c : c)
    .color(a, r)
    .under(W.shadow, 0.3);
  f > 0 && d.delay(f);
}

function Of(n, t, e, s, i, a, o = 0.3, r = 0.3) {
  F0(n, t, e, s, i, a, o, W.earth, W.earthDark, r);
}

function O1(n, t, e, s, i, a, o, r, l = 0, c = 0, f = 0) {
  H0(n, t, e, s, i, a, o, r, l, c, f, 0.28, 0.11);
}

function Mm(n, t, e, s, i, a, o = 0, r = 0, l = 0) {
  const c = n.particles.use(Mt.plume),
    f = n.rnd,
    d = n.n(i);
  for (let h = 0; h < d; h++) {
    const u = f.next() * oe,
      m = a * f.range(0.4, 1);
    c.spawn(
      t,
      e + f.signed() * 0.3,
      s,
      Math.cos(u) * m + o,
      f.range(0.6, 2.4),
      Math.sin(u) * m + r,
      f.range(0.9, 1.4),
      0.42,
      0.34,
      l + f.next() * 0.05,
    );
  }
}

function B1(n, t, e, s, i, a, o, r, l, c = 1, f = 0) {
  (n.particles.use(Mt.gooseShade).spawn(t, e, s, i, a, o, r, l * 1.1, l * 1.1 * c, f),
    n.particles.use(Mt.goose).spawn(t, e, s, i, a, o, r, l, l * c, f));
}

function km(n, t, e, s, i, a, o, r = 2.2, l = 0) {
  const c = n.particles.use(Mt.grass),
    f = n.rnd,
    d = n.n(s);
  for (let h = 0; h < d; h++) {
    const u = f.range(0.16, 0.3);
    c.spawn(
      t + f.signed() * i,
      0.12,
      e + f.signed() * i,
      a * f.range(0.5, 1.1) + f.signed() * 0.8,
      r * f.range(0.5, 1.2),
      o * f.range(0.5, 1.1) + f.signed() * 0.8,
      f.range(0.4, 0.7),
      u,
      u * 0.8,
      l + f.next() * 0.04,
    );
  }
}

function Sh(n, t, e, s, i, a, o = 0, r = 0, l = Math.PI, c = 0, f = null) {
  const d = n.particles.use(Mt.inkDot);
  f && d.tint(f);
  const h = n.rnd,
    u = n.n(i),
    m = o === 0 && r === 0 ? h.next() * oe : Math.atan2(r, o);
  for (let x = 0; x < u; x++) {
    const p = m + h.signed() * l,
      g = a * h.range(0.4, 1),
      y = h.range(0.08, 0.2);
    d.spawn(
      t,
      e,
      s,
      Math.cos(p) * g,
      h.range(0.2, 1) * g * 0.5,
      Math.sin(p) * g,
      h.range(0.35, 0.6),
      y,
      y * 0.7,
      c + h.next() * 0.04,
    );
  }
}

function Th(n, t, e, s, i, a = !0, o = 0) {
  (n.particles.use(Mt.ink).spawn(t, e, s, 0, 0.4, 0, 0.42, i * 0.6, i, o),
    a &&
      n.particles
        .use(Mt.inkFlat)
        .spawn(
          t + n.rnd.signed() * 0.2,
          0.07,
          s + n.rnd.signed() * 0.2,
          0,
          0,
          0,
          1.1,
          i * 0.5,
          i * 0.9,
          o + 0.03,
        ));
}

function JM(n, t, e, s, i, a, o, r = 0, l = W.black, c = 0, f = 0.75) {
  const d = s - t,
    h = i - e,
    u = Math.hypot(d, h) * 0.5 || 0.01;
  n.decals
    .add(Xt.ink, (t + s) * 0.5, (e + i) * 0.5, u, o)
    .rot(Math.atan2(h, d), (a * 0.5) / u)
    .params(r > 0 ? 1 / r : 0, c)
    .color(l, 1.6)
    .under(W.ink, f);
}

const xP = Lt(2799871),
  yP = Lt(7330047),
  vP = Lt(402490),
  Ib = Lt(16730682),
  bP = Lt(3803656),
  _P = 0.1,
  wP = {
    direction: [-1, Xt.rect, -1],
    cone: [-1, Xt.cone, -1],
    position: [Xt.range, Xt.zone, Xt.glow],
    target: [Xt.range, -1, Xt.lock],
    self: [-1, Xt.zone, Xt.glow],
  };

class MP {
  k;
  aim = null;
  kind = null;
  slots = [-1, -1, -1];
  constructor(t) {
    this.k = t;
  }
  set(t) {
    this.aim = t;
  }
  release() {
    const t = this.k.decals;
    for (let e = 0; e < 3; e++) (this.slots[e] >= 0 && t.release(this.slots[e], 0.1), (this.slots[e] = -1));
    this.kind = null;
  }
  ensure(t) {
    if (this.kind === t) return;
    (this.release(), (this.kind = t));
    const e = wP[t];
    for (let s = 0; s < 3; s++) e[s] >= 0 && (this.slots[s] = this.k.decals.hold(e[s], 0.08));
  }
  style(t, e, s, i, a, o) {
    this.k.decals.at(t).y(_P).color(e, i, a).under(s, o).xray();
  }
  update(t) {
    const e = this.k,
      s = this.aim,
      i = t.state;
    if (!s || !e.anchor(i.playerId) || !e.a.unit || !e.a.unit.alive) {
      this.kind && this.release();
      return;
    }
    const a = e.a.x,
      o = e.a.z;
    this.ensure(s.kind);
    const r = e.decals,
      l = s.cancel === !0,
      c = l ? Ib : xP,
      f = l ? Ib : yP,
      d = l ? bP : vP,
      [h, u, m] = this.slots;
    switch (s.kind) {
      case "direction": {
        const x = Math.hypot(s.dir.x, s.dir.y) || 1,
          p = s.dir.x / x,
          g = s.dir.y / x,
          y = s.range / 2;
        (this.style(u, c, d, 1.25, 0.9, 0.55),
          r
            .at(u)
            .at(a + p * y, o + g * y)
            .radius(y)
            .rot(Math.atan2(g, p), Math.max(0.3, s.width / 2) / y));
        break;
      }
      case "cone": {
        (this.style(u, c, d, 1.25, 0.9, 0.55),
          r
            .at(u)
            .at(a, o)
            .radius(s.range)
            .rot(Math.atan2(s.dir.y, s.dir.x))
            .params(s.angle / 2, 1));
        break;
      }
      case "position": {
        let x = s.pos.x - a,
          p = s.pos.y - o;
        const g = Math.hypot(x, p);
        (g > s.range && g > 0 && ((x *= s.range / g), (p *= s.range / g)),
          this.style(h, c, d, 1.1, 0.75, 0.35),
          r.at(h).at(a, o).radius(s.range).params(0.008, 0),
          this.style(u, f, d, 1.25, 0.95, 0.5),
          r
            .at(u)
            .at(a + x, o + p)
            .radius(Math.max(0.6, s.radius))
            .params(16, 0),
          this.style(m, c, W.black, 0.5, 0.8, 0),
          r
            .at(m)
            .at(a + x, o + p)
            .radius(Math.max(0.6, s.radius))
            .params(0.7));
        break;
      }
      case "target": {
        (this.style(h, c, d, 1.3, 0.75, 0.35), r.at(h).at(a, o).radius(s.range).params(0.008, 0));
        const x = e.a.y + e.a.height * 0.45;
        e.anchor(s.targetId) && e.a.visible
          ? (this.style(m, f, d, 1.4, 1, 0.5),
            r
              .at(m)
              .at(e.a.x, e.a.z)
              .radius(e.a.radius + 0.75),
            e.ribbons.line($n.link, a, x, o, e.a.x, e.a.y + e.a.height * 0.45, e.a.z, c, 1))
          : r.at(m).alpha(0);
        break;
      }
      case "self": {
        const x = s.radius > 0 ? s.radius : 1.4;
        (this.style(u, f, d, 1.25, 0.95, 0.5),
          r
            .at(u)
            .at(a, o)
            .radius(x)
            .params(s.radius > 0 ? 16 : 0, 0),
          this.style(m, c, W.black, 0.45, 0.8, 0),
          r.at(m).at(a, o).radius(x).params(0.6));
        break;
      }
    }
  }
  reset() {
    ((this.aim = null), this.release());
  }
}

const kP = 30,
  xo = 1 / kP,
  SP = Lt(16726568);

function Gd(n, t, e, s = 0.12) {
  const i = n.decals.hold(e, s);
  return (t.slots.push(i), i);
}

function ad(n, t, e, s, i) {
  const a = t.hostile ? _r.enemy : t.mine ? _r.mine : _r.ally,
    o = Gd(n, t, Xt.zone);
  return (
    n.decals
      .at(o)
      .params(e, s)
      .color(t.hostile ? SP : a.edge, t.hostile ? 1.7 : 1.4, t.hostile ? 0.95 : 0.85)
      .under(i, 0.12),
    o
  );
}

function od(n, t, e) {
  for (let s = 0; s < t.slots.length; s++)
    n.decals
      .at(t.slots[s])
      .at(t.x, t.z)
      .radius(t.radius * (e ? e(s) : 1));
}

function xc(n, t, e, s) {
  t.acc += e * s * n.density;
  const i = Math.floor(t.acc);
  return ((t.acc -= i), i);
}

const yc = ws.panyue,
  rd = ws.chijin,
  Zr = ws.xingli,
  Ku = ws.fengling,
  TP = Lt(16760928),
  EP = Lt(15249520),
  Pb = {
    telegraph: {
      create(n, t) {
        const e = t.team === 2 ? _r.monster : t.hostile ? _r.enemy : t.mine ? _r.mine : _r.ally,
          s = Gd(n, t, Xt.telegraph, 0.06),
          i = t.hostile || t.team === 2;
        n.decals
          .at(s)
          .y(0.09)
          .color(e.edge, i ? 1.7 : 1.4, i ? 0.95 : 0.8)
          .under(e.under, 0.6)
          .xray();
      },
      update(n, t) {
        n.decals.at(t.slots[0]).at(t.x, t.z).radius(t.radius).params(t.t);
      },
    },
    panyue_s2_aura: {
      create(n, t) {
        ad(n, t, 0, 0, yc.dark);
        for (let e = 0; e < 3; e++) {
          const s = n.glow.hold(qe.shield, sn.plate);
          (s.color(yc.hot, 1.15, 0), (s.add = 0.25), (s.k = 0.16), t.meshes.push(s));
        }
      },
      update(n, t, e) {
        od(n, t);
        const s = t.meshes.length,
          i = Math.min(1, t.age * 5),
          a = Math.max(0, Math.min(1, (t.duration - t.age) * 4));
        for (let o = 0; o < s; o++) {
          const r = t.phase + t.age * 1.1 + (o * oe) / s,
            l = t.meshes[o];
          (l
            .at(t.x + Math.cos(r) * 2.05, 0.08, t.z + Math.sin(r) * 2.05)
            .scale(1.75 * i)
            .rot(0, -r, 0.05),
            (l.a = 0.85 * a),
            (l.progress = (t.age * 0.62 + o / s) % 1));
        }
        for (let o = xc(n, t, e, 6); o > 0; o--) {
          const r = n.rnd.next() * oe,
            l = t.radius * n.rnd.range(0.55, 1);
          n.particles
            .use(Mt.dust)
            .spawn(
              t.x + Math.cos(r) * l,
              0.15,
              t.z + Math.sin(r) * l,
              -Math.cos(r) * 1.4,
              0.4,
              -Math.sin(r) * 1.4,
              0.7,
              0.5,
              0.9,
            );
        }
      },
      end(n, t) {
        (bn(n, t.x, t.z, t.radius * 0.5, 0.35, yc.glow, 1.1, 0.5, 0.2),
          Ha(n, t.x, t.z, 5, 1.4, 2.5, W.dust, W.dustDark, 1, 0.6));
      },
    },
    panyue_ult_fissure: {
      create(n, t) {
        ad(n, t, 0, 1, yc.dark);
      },
      update(n, t, e) {
        od(n, t);
        for (let s = xc(n, t, e, 12); s > 0; s--) {
          const i = n.rnd,
            a = i.next() * oe,
            o = t.radius * Math.sqrt(i.next()) * 0.95,
            r = t.x + Math.cos(a) * o,
            l = t.z + Math.sin(a) * o,
            c = i.next();
          if (c < 0.55) n.particles.use(Mt.dust).spawn(r, 0.1, l, 0, i.range(0.5, 1.2), 0, 0.9, 0.5, 1.2);
          else if (c < 0.88) {
            const f = i.range(0.12, 0.22);
            n.particles
              .use(Mt.debris)
              .tint(W.earth, W.earthDark)
              .spawn(r, 0.1, l, i.signed() * 0.6, i.range(2.2, 4), i.signed() * 0.6, 0.6, f, f * 0.8);
          } else
            n.particles
              .use(Mt.ember)
              .tint(yc.hot, yc.deep)
              .spawn(
                r,
                0.1,
                l,
                i.signed() * 0.3,
                i.range(0.8, 1.8),
                i.signed() * 0.3,
                i.range(0.5, 0.8),
                0.13,
                0.04,
              );
        }
      },
    },
    chijin_ult_spin: {
      create(n, t) {
        ad(n, t, 0, 2, rd.dark);
        const e = n.glow.hold(qe.cone, sn.vortex);
        (e.color(EP, 0.9, 0), (e.add = 0.3), (e.k = 4), (e.progress = 0.3), t.meshes.push(e));
        for (let s = 0; s < 2; s++) {
          const i = n.glow.hold(qe.slash, sn.slash);
          (i.color(s === 0 ? rd.glow : rd.accent, 1.25, 0),
            (i.add = 0.2),
            (i.k = 0.62),
            (i.progress = -2),
            t.meshes.push(i));
        }
      },
      update(n, t, e) {
        od(n, t);
        const s = Math.min(1, t.age * 4),
          i = Math.max(0, Math.min(1, (t.duration - t.age) * 3)),
          a = t.radius * 0.55 * s,
          o = t.meshes[0];
        (o
          .at(t.x, 0.05, t.z)
          .scale3(a, 2.1 * s, a)
          .rot(0, t.age * 7, 0),
          (o.a = (n.lowQ ? 0.2 : 0.4) * i));
        for (let r = 1; r < t.meshes.length; r++) {
          const l = t.meshes[r],
            c = t.radius * 0.94 * (0.4 + 0.6 * s);
          (l
            .at(t.x, 0.85 + (r - 1) * 0.45, t.z)
            .scale(c)
            .rot(r === 1 ? 0.1 : -0.1, t.phase + t.age * 12 + r * Math.PI, 0),
            (l.a = 0.55 * i));
        }
        for (let r = xc(n, t, e, 22); r > 0; r--) {
          const l = n.rnd,
            c = l.next() * oe;
          l.chance(0.6)
            ? n.particles
                .use(Mt.dust)
                .tint(W.sand, W.dustDark)
                .orbit(
                  t.x,
                  l.range(0.15, 0.6),
                  t.z,
                  t.radius * l.range(0.45, 0.7),
                  t.radius * l.range(0.9, 1.05),
                  c,
                  -5,
                  l.range(0.3, 1),
                  l.range(0.4, 0.6),
                  0.5,
                  1,
                )
            : n.particles
                .use(Mt.spark)
                .tint(TP, rd.deep)
                .orbit(
                  t.x,
                  l.range(0.4, 1.4),
                  t.z,
                  t.radius * l.range(0.7, 0.9),
                  t.radius * l.range(0.95, 1.1),
                  c,
                  -9,
                  l.range(0.5, 2),
                  l.range(0.16, 0.24),
                  0.1,
                  0.03,
                );
        }
      },
      end(n, t) {
        (bn(n, t.x, t.z, t.radius, 0.4, rd.glow, 1.3, 0.5, 0.25),
          Ha(n, t.x, t.z, 8, t.radius * 0.5, 3, W.sand, W.dustDark, 1.1, 0.6));
      },
    },
    xingli_s2_well: {
      create(n, t) {
        const e = Gd(n, t, Xt.swirl, 0.08);
        n.decals.at(e).params(2, -3).color(Zr.glow, 1.2, 0.55).under(Zr.dark, 0.14);
        const s = n.glow.hold(qe.hoop, sn.hoop);
        (s.color(Zr.glow, 1.2, 0.85), (s.add = 0.3), t.meshes.push(s));
      },
      update(n, t, e) {
        const s = 1 - 0.72 * t.t * t.t;
        n.decals.at(t.slots[0]).at(t.x, t.z).radius(t.radius);
        const i = t.meshes[0];
        (i.at(t.x, 0.7 + t.t * 0.6, t.z).scale(t.radius * s), i.rot(0, t.age * 3, 0));
        for (let a = 0; a < 4; a++) {
          const o = t.phase + t.age * (4 + t.t * 6) + (a * oe) / 4,
            r = t.x + Math.cos(o) * t.radius * s,
            l = t.z + Math.sin(o) * t.radius * s;
          n.sprites.draw(Ft.glow, r, 0.75 + t.t * 0.6, l, 0.62, 0, Zr.accent, 2.1, 1, 0.7);
        }
        for (let a = xc(n, t, e, 26); a > 0; a--) {
          const o = n.rnd;
          n.particles
            .use(Mt.mote)
            .orbit(
              t.x,
              o.range(0.1, 0.9),
              t.z,
              t.radius * o.range(0.7, 1.05),
              t.radius * 0.15,
              o.next() * oe,
              5,
              0.6,
              0.3,
              0.2,
              0.06,
            );
        }
      },
    },
    xingli_ult_storm: {
      create(n, t) {
        ad(n, t, -9, 0, Zr.dark);
        const e = Gd(n, t, Xt.moon, 0.3);
        n.decals.at(e).params(0.74, 0.6).color(Zr.hot, 1, 0.4).under(Zr.dark, 0.1);
      },
      update(n, t, e) {
        od(n, t, (s) => (s === 1 ? 0.5 : 1));
        for (let s = xc(n, t, e, 7); s > 0; s--) {
          const i = n.rnd,
            a = i.next() * oe,
            o = t.radius * Math.sqrt(i.next()) * 0.9,
            r = t.x + Math.cos(a) * o,
            l = t.z + Math.sin(a) * o;
          if (i.chance(0.5)) {
            const c = i.range(0.5, 0.65);
            B1(n, r + 3.2, 4.6, l - 2.4, -6.4 / c, -3.4 / c, 4.8 / c, c, 0.9, 1.05);
          } else
            n.particles
              .use(Mt.plume)
              .spawn(
                r,
                i.range(1.5, 3),
                l,
                i.signed() * 0.5,
                -0.4,
                i.signed() * 0.5,
                i.range(0.9, 1.3),
                0.34,
                0.28,
              );
        }
      },
      end(n, t) {
        bn(n, t.x, t.z, t.radius, 0.5, Zr.glow, 1.1, 0.85, 0.2);
      },
    },
    fengling_ult_rain: {
      create(n, t) {
        ad(n, t, 30, 0, Ku.dark);
        const e = Gd(n, t, Xt.glow, 0.25);
        n.decals.at(e).params(0.6).color(W.black, 0, 0.32).under(Ku.dark, 0.05);
      },
      update(n, t, e) {
        od(n, t);
        for (let s = xc(n, t, e, 10); s > 0; s--) {
          const i = n.rnd,
            a = i.next() * oe,
            o = t.radius * Math.sqrt(i.next()) * 0.95,
            r = t.x + Math.cos(a) * o,
            l = t.z + Math.sin(a) * o,
            c = i.range(0.16, 0.22);
          (n.particles
            .use(Mt.arrow)
            .tint(W.plume, Ku.hot)
            .spawn(r + 1.4, 10, l + 0.9, -1.4 / c, -10 / c, -0.9 / c, c, 0.5, 0.45),
            n.particles.use(Mt.dust).spawn(r, 0.12, l, 0, i.range(0.4, 0.9), 0, 0.32, 0.26, 0.6, c));
        }
      },
      end(n, t) {
        bn(n, t.x, t.z, t.radius, 0.5, Ku.glow, 1, 0.85, 0.2);
      },
    },
    fountain_zone: { create() {}, update() {} },
  };

class AP {
  views = new Map();
  list = [];
  k;
  stamp = 0;
  phaseN = 0;
  constructor(t) {
    this.k = t;
  }
  release(t, e) {
    const s = this.k;
    e && t.def.end && t.def.end(s, t);
    for (const i of t.slots) s.decals.release(i, 0.2);
    for (const i of t.meshes) s.glow.release(i);
    ((t.slots.length = 0), (t.meshes.length = 0));
  }
  update(t) {
    const e = this.k,
      s = ++this.stamp;
    for (const a of t.state.areas) {
      let o = this.views.get(a.id);
      (o || ((o = this.make(a, t)), this.views.set(a.id, o), this.list.push(o), o.def.create(e, o)),
        (o.seen = s),
        this.sync(o, a, t),
        o.def.update(e, o, t.dt));
    }
    const i = this.list;
    for (let a = i.length - 1; a >= 0; a--) {
      const o = i[a];
      o.seen !== s &&
        (this.release(o, o.age >= o.duration - 0.12),
        this.views.delete(o.id),
        (i[a] = i[i.length - 1]),
        i.pop());
    }
  }
  make(t, e) {
    return (
      (this.phaseN = (this.phaseN + 2.399) % oe),
      {
        id: t.id,
        def: Pb[t.visual] ?? Pb.fountain_zone,
        seen: 0,
        x: t.pos.x,
        z: t.pos.y,
        radius: t.radius,
        team: t.team,
        ownerId: t.ownerId,
        hostile: t.team !== e.playerTeam,
        mine: t.ownerId === e.state.playerId,
        age: t.age,
        t: 0,
        duration: t.duration,
        slots: [],
        edge: -1,
        meshes: [],
        acc: 0,
        phase: this.phaseN,
      }
    );
  }
  sync(t, e, s) {
    const i = this.k;
    ((t.radius = e.radius),
      (t.duration = e.duration),
      (t.age = Math.max(0, e.age - (1 - s.alpha) * xo)),
      (t.t = e.duration > 0 ? Math.min(1, t.age / e.duration) : 1),
      e.followUnitId >= 0 && i.anchor(e.followUnitId)
        ? ((t.x = i.a.x), (t.z = i.a.z))
        : ((t.x = e.pos.x), (t.z = e.pos.y)));
  }
  get count() {
    return this.views.size;
  }
  reset() {
    for (const t of this.list) this.release(t, !1);
    ((this.list.length = 0), this.views.clear());
  }
}

const a3 = new WeakMap();

function RP(n, t, e, s, i) {
  let a = a3.get(n);
  a || ((a = []), a3.set(n, a));
  for (let o = a.length - 1; o >= 0; o--) n.now - a[o].t > 2 && a.splice(o, 1);
  a.push({ type: t, x: e, y: s, z: i, t: n.now });
}

function CP(n, t, e, s) {
  const i = a3.get(n);
  if (!i) return null;
  for (let a = i.length - 1; a >= 0; a--) {
    const o = i[a];
    if (!(n.now - o.t > 1 || (s && o.type !== s)) && Math.hypot(o.x - t, o.z - e) < 14) return o;
  }
  return null;
}

const Nn = new dt(),
  Db = new Ut(8405247),
  Q0 = new dt();

function o3(n, t, e, s, i) {
  return n.anchors.attach?.(t, "vent", i) || n.anchors.attach?.(t, "muzzle", i)
    ? !0
    : n.anchor(t)
      ? (i.set(
          n.a.x + e * (n.a.radius * 1.3 + 0.6),
          n.a.y + n.a.height * 0.5,
          n.a.z + s * (n.a.radius * 1.3 + 0.6),
        ),
        !0)
      : !1;
}

const LP = (n, t) => {
    const e = t.dir ?? { x: 1, y: 0 },
      s = Math.hypot(e.x, e.y) || 1,
      i = e.x / s,
      a = e.y / s,
      o = t.radius ?? 7.5,
      r = (t.angle ?? Math.PI / 3) * 0.5,
      l = Math.max(0.2, t.value ?? 0.9),
      c = Math.atan2(a, i),
      f = t.unitId ?? -1;
    if (f < 0 || !n.anchor(f)) {
      n.decals
        .add(Xt.coneWarn, t.pos.x, t.pos.y, o, l + 0.12)
        .y(0.09)
        .rot(c)
        .params(r, -1)
        .color(_r.monster.edge, 1.6, 0.95)
        .under(Db, 0.7)
        .xray();
      return;
    }
    const d = n.decals.hold(Xt.coneWarn, 0.06);
    (n.decals
      .at(d)
      .at(t.pos.x, t.pos.y)
      .radius(o)
      .y(0.09)
      .rot(c)
      .params(r, 0)
      .color(_r.monster.edge, 1.6, 0.95)
      .under(Db, 0.7)
      .xray(),
      n.track(
        f,
        l + 0.12,
        (m, x) => {
          n.decals.at(d).params(r, x);
        },
        () => n.decals.release(d, 0.12),
      ));
    const h = n.glow.hold(qe.sphere, sn.core);
    (h.color(W.violetHot, 1.25, 0), (h.add = 0.55), (h.k = 1.4));
    let u = 0;
    n.track(
      f,
      l,
      (m, x, p) => {
        if (!o3(n, f, i, a, Nn)) return;
        const g = 0.12 + 0.36 * x * x;
        (h.at(Nn.x, Nn.y, Nn.z).scale(g), (h.a = 0.25 + 0.5 * x), (u += p * (14 + 30 * x) * n.density));
        const y = n.particles.use(Mt.glint).tint(W.violetHot, W.abyssCyan);
        for (; u >= 1;)
          ((u -= 1),
            y.orbit(
              Nn.x,
              Nn.y + n.rnd.range(-0.6, 0.4),
              Nn.z,
              n.rnd.range(1.4, 2.2),
              0.05,
              n.rnd.next() * oe,
              n.rnd.range(3, 6),
              n.rnd.range(-0.2, 0.6),
              0.35,
              0.26,
              0.08,
            ));
      },
      () => n.glow.release(h),
    );
  },
  r3 = new WeakMap(),
  IP = (n, t, e) => {
    const s = t.dir ?? { x: 1, y: 0 },
      i = Math.hypot(s.x, s.y) || 1,
      a = s.x / i,
      o = s.y / i,
      r = t.radius ?? 7.5,
      l = (t.angle ?? Math.PI / 3) * 0.5,
      c = Math.max(0.2, t.value ?? 0.8),
      f = t.unitId ?? -1,
      d = t.pos.x,
      h = t.pos.y;
    let u = r3.get(n);
    (u || ((u = new Map()), r3.set(n, u)), u.set(f, n.now + c + 0.15));
    const m = Math.atan2(o, a),
      x = n.glow.hold(qe.breath, sn.breath);
    (x.color(W.violet, 1.05, 0), (x.add = 0.4), (x.k = 2.6), (x.progress = 0));
    const p = c + 0.25;
    let g = 0,
      y = 0,
      v = 0;
    const _ = n.rnd,
      k = (M, S) => {
        const b = M * p,
          w = m + (-0.17 + 0.34 * Math.min(1, b / c)),
          T = Math.cos(w),
          E = Math.sin(w);
        o3(n, f, T, E, Nn) || Nn.set(d + T * 2, 2.2, h + E * 2);
        const A = (Nn.x - d) * T + (Nn.z - h) * E,
          C = Math.max(3, r - A + 0.4),
          R = Math.tan(l) * r * 0.92,
          I = -Math.atan2(Math.max(0, Nn.y - 0.9), C),
          P = Math.min(1, b / 0.12);
        if (
          (x
            .at(Nn.x, Nn.y, Nn.z)
            .scale3(C * (0.35 + 0.65 * P), R * 0.36 * P, R * P)
            .rot(0, -w, I),
          (x.a = Math.min(1, b / 0.08) * 0.6),
          (x.progress = b > c ? Math.min(1, (b - c) / 0.25) : 0),
          !(b > c))
        ) {
          for (
            n.sprites.draw(Ft.glow, Nn.x, Nn.y, Nn.z, 1.15 * P, 0, W.abyssCyan, 1.2, 0.75, 0.6),
              n.sprites.draw(
                Ft.glow,
                Nn.x + T * 0.25,
                Nn.y - 0.05,
                Nn.z + E * 0.25,
                0.55 * P,
                0,
                W.violetHot,
                2.6,
                1,
                0.85,
              ),
              g += S * 40 * n.density;
            g >= 1;
          ) {
            g -= 1;
            const F = w + _.signed() * l * 0.85,
              L = _.range(7, 12),
              B = Math.cos(F),
              G = Math.sin(F);
            _.chance(0.42)
              ? n.particles
                  .use(Mt.puff)
                  .spawn(
                    Nn.x + B * 0.4,
                    Nn.y - 0.1,
                    Nn.z + G * 0.4,
                    B * L,
                    -_.range(1.2, 2.4),
                    G * L,
                    _.range(0.5, 0.75),
                    0.8,
                    _.range(2.2, 3.2),
                  )
              : n.particles
                  .use(Mt.streak)
                  .tint(W.violetHot, W.abyssCyan)
                  .spawn(
                    Nn.x,
                    Nn.y,
                    Nn.z,
                    B * L * 1.7,
                    -_.range(1, 3),
                    G * L * 1.7,
                    _.range(0.26, 0.42),
                    0.24,
                    0.07,
                  );
          }
          for (v += S * 10; v >= 1;) {
            v -= 1;
            const F = w + _.signed() * l * 0.7,
              L = A + 1,
              B = (r - L) * _.range(0.4, 0.62),
              G = L + B * 0.5 + _.next() * Math.max(0, r - L - B);
            n.decals
              .add(Xt.streak, d + Math.cos(F) * G, h + Math.sin(F) * G, B * 0.5, 0.34)
              .rot(F, 0.1)
              .params(0.6, 3.2)
              .color(W.violetHot, 1.45, 0.8)
              .under(W.violetDeep, 0.18);
          }
          for (y += S * 16; y >= 1;) {
            y -= 1;
            const F = w + _.signed() * l * 0.8,
              L = _.range(A + 1.2, r * 0.95);
            n.decals
              .add(Xt.scorch, d + Math.cos(F) * L, h + Math.sin(F) * L, _.range(0.9, 1.5), 1.5 + (c - b))
              .params(1)
              .color(W.abyssCyan, 1.4)
              .under(W.violetDeep, 0.8);
          }
        }
      };
    if (f >= 0 && n.anchor(f))
      n.track(
        f,
        p,
        (M, S, b) => k(S, b),
        () => n.glow.release(x),
      );
    else {
      n.glow.release(x);
      return;
    }
    (o3(n, f, a, o, Q0) &&
      (vs(n, Q0.x, Q0.y, Q0.z, 1.8, W.violetHot, W.violet, a, o, 6, le.flashSkill, 9),
      n.light(Q0.x, Q0.z, Q0.y, W.violet, 2.2, 5.5, le.lightDur)),
      n.shake(0.12, d, h));
  };

function PP(n, t, e) {
  const i = r3.get(n)?.get(t);
  if (i === void 0 || n.now > i || !n.anchor(e)) return;
  const a = n.a.x,
    o = n.a.z,
    r = n.a.y + n.a.height * 0.5,
    l = n.rnd,
    c = n.particles.use(Mt.puff);
  for (let f = 0; f < n.n(3); f++)
    c.spawn(
      a + l.signed() * 0.3,
      r + l.signed() * 0.3,
      o + l.signed() * 0.3,
      l.signed() * 1.6,
      l.range(0.4, 1.4),
      l.signed() * 1.6,
      l.range(0.45, 0.65),
      0.7,
      1.7,
    );
  (jo(n, a, r, o, 3, 2.5, W.violetHot, W.violet, 0.4, 0.26), n.anchors.flashTint?.(e, W.violet, 0.5, 0.3));
}

function tf(n, t, e, s, i) {
  const a = n.rnd;
  n.particles.use(Mt.splash).spawn(t, 0.02, e, 0, 0, 0, 0.55, s * 0.4, s * 1.6);
  const o = n.particles.use(Mt.droplet);
  for (let r = 0; r < n.n(i); r++) {
    const l = a.next() * oe,
      c = a.range(1, 3) * s * 0.6;
    o.spawn(
      t + Math.cos(l) * s * 0.25,
      0.1,
      e + Math.sin(l) * s * 0.25,
      Math.cos(l) * c,
      a.range(3, 6) * Math.sqrt(s),
      Math.sin(l) * c,
      a.range(0.5, 0.8),
      0.16,
      0.1,
    );
  }
}
export { KM, rP, dP, Mt, $n, H0, jo, L0, Ha, Ni, F0, U0, gf, le, vs, bn, xx, Hh, gP, Lr, wm, U1, qo, yx, vx, QM, bx, Of, O1, Mm, B1, km, Sh, Th, JM, MP, xo, AP, RP, CP, Nn, LP, IP, PP, tf };
