// 11-render-3.js — render｜99 个顶层语句｜68KB
// 对应 game.pretty.js 第 20281–22638 行
// 关键内容：
//   zv                    PMREM.Background
//   uR                    SphericalGaussianBlur
//   Fv                    EquirectangularToCubeUV
//   Uv                    CubemapToCubeUV
//   pR                    dispose
//   mR                    WEBGL_depth_texture
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { D1, Dr, Ee, Gs, Kc, Ns, P1, R0, Sr, Ul, V3, _5, a7, b5, d7, df, dm, e7, f7, ff, fi, fo, i7, iM, jn, n7, nM, o7, pi, pr, s7, sM, sv, t7, uM } from './04-audio-2.js';
import { E7, In, Je, Vs, bh, dt, kn, mM, pM } from './05-three.js';
import { gM, yM } from './06-three-2.js';
import { An, N0, Oh, Sn, Yi, _M, hm, um } from './07-three-3.js';
import { SM } from './08-three-4.js';
import { $c, Dv, Io, Nv, Pg, Pv, Uu, bl, dR, hR, lx, tn } from './10-render-2.js';

let Dg = null,
  zg = 0,
  Ng = 0,
  Fg = !1;

class zv {
  constructor(t) {
    ((this._renderer = t),
      (this._pingPongRenderTarget = null),
      (this._lodMax = 0),
      (this._cubeSize = 0),
      (this._lodPlanes = []),
      (this._sizeLods = []),
      (this._sigmas = []),
      (this._blurMaterial = null),
      (this._cubemapMaterial = null),
      (this._equirectMaterial = null),
      this._compileMaterial(this._blurMaterial));
  }
  fromScene(t, e = 0, s = 0.1, i = 100, a = {}) {
    const { size: o = 256, position: r = dR } = a;
    ((Dg = this._renderer.getRenderTarget()),
      (zg = this._renderer.getActiveCubeFace()),
      (Ng = this._renderer.getActiveMipmapLevel()),
      (Fg = this._renderer.xr.enabled),
      (this._renderer.xr.enabled = !1),
      this._setSize(o));
    const l = this._allocateTargets();
    return (
      (l.depthBuffer = !0),
      this._sceneToCubeUV(t, s, i, l, r),
      e > 0 && this._blur(l, 0, 0, e),
      this._applyPMREM(l),
      this._cleanup(l),
      l
    );
  }
  fromEquirectangular(t, e = null) {
    return this._fromTexture(t, e);
  }
  fromCubemap(t, e = null) {
    return this._fromTexture(t, e);
  }
  compileCubemapShader() {
    this._cubemapMaterial === null &&
      ((this._cubemapMaterial = Uv()), this._compileMaterial(this._cubemapMaterial));
  }
  compileEquirectangularShader() {
    this._equirectMaterial === null &&
      ((this._equirectMaterial = Fv()), this._compileMaterial(this._equirectMaterial));
  }
  dispose() {
    (this._dispose(),
      this._cubemapMaterial !== null && this._cubemapMaterial.dispose(),
      this._equirectMaterial !== null && this._equirectMaterial.dispose());
  }
  _setSize(t) {
    ((this._lodMax = Math.floor(Math.log2(t))), (this._cubeSize = Math.pow(2, this._lodMax)));
  }
  _dispose() {
    (this._blurMaterial !== null && this._blurMaterial.dispose(),
      this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose());
    for (let t = 0; t < this._lodPlanes.length; t++) this._lodPlanes[t].dispose();
  }
  _cleanup(t) {
    (this._renderer.setRenderTarget(Dg, zg, Ng),
      (this._renderer.xr.enabled = Fg),
      (t.scissorTest = !1),
      Uu(t, 0, 0, t.width, t.height));
  }
  _fromTexture(t, e) {
    (t.mapping === ff || t.mapping === df
      ? this._setSize(t.image.length === 0 ? 16 : t.image[0].width || t.image[0].image.width)
      : this._setSize(t.image.width / 4),
      (Dg = this._renderer.getRenderTarget()),
      (zg = this._renderer.getActiveCubeFace()),
      (Ng = this._renderer.getActiveMipmapLevel()),
      (Fg = this._renderer.xr.enabled),
      (this._renderer.xr.enabled = !1));
    const s = e || this._allocateTargets();
    return (this._textureToCubeUV(t, s), this._applyPMREM(s), this._cleanup(s), s);
  }
  _allocateTargets() {
    const t = 3 * Math.max(this._cubeSize, 112),
      e = 4 * this._cubeSize,
      s = {
        magFilter: Ns,
        minFilter: Ns,
        generateMipmaps: !1,
        type: Dr,
        format: Gs,
        colorSpace: Ul,
        depthBuffer: !1,
      },
      i = Nv(t, e, s);
    if (
      this._pingPongRenderTarget === null ||
      this._pingPongRenderTarget.width !== t ||
      this._pingPongRenderTarget.height !== e
    ) {
      (this._pingPongRenderTarget !== null && this._dispose(), (this._pingPongRenderTarget = Nv(t, e, s)));
      const { _lodMax: a } = this;
      (({ sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas } = hR(a)),
        (this._blurMaterial = uR(a, t, e)));
    }
    return i;
  }
  _compileMaterial(t) {
    const e = new Sn(this._lodPlanes[0], t);
    this._renderer.compile(e, Pg);
  }
  _sceneToCubeUV(t, e, s, i, a) {
    const l = new Yi(90, 1, e, s),
      c = [1, -1, 1, 1, 1, 1],
      f = [1, 1, 1, -1, -1, -1],
      d = this._renderer,
      h = d.autoClear,
      u = d.toneMapping;
    (d.getClearColor(Pv),
      (d.toneMapping = R0),
      (d.autoClear = !1),
      d.state.buffers.depth.getReversed() && (d.setRenderTarget(i), d.clearDepth(), d.setRenderTarget(null)));
    const x = new yM({ name: "PMREM.Background", side: pi, depthWrite: !1, depthTest: !1 }),
      p = new Sn(new Oh(), x);
    let g = !1;
    const y = t.background;
    y ? y.isColor && (x.color.copy(y), (t.background = null), (g = !0)) : (x.color.copy(Pv), (g = !0));
    for (let v = 0; v < 6; v++) {
      const _ = v % 3;
      _ === 0
        ? (l.up.set(0, c[v], 0), l.position.set(a.x, a.y, a.z), l.lookAt(a.x + f[v], a.y, a.z))
        : _ === 1
          ? (l.up.set(0, 0, c[v]), l.position.set(a.x, a.y, a.z), l.lookAt(a.x, a.y + f[v], a.z))
          : (l.up.set(0, c[v], 0), l.position.set(a.x, a.y, a.z), l.lookAt(a.x, a.y, a.z + f[v]));
      const k = this._cubeSize;
      (Uu(i, _ * k, v > 2 ? k : 0, k, k), d.setRenderTarget(i), g && d.render(p, l), d.render(t, l));
    }
    (p.geometry.dispose(), p.material.dispose(), (d.toneMapping = u), (d.autoClear = h), (t.background = y));
  }
  _textureToCubeUV(t, e) {
    const s = this._renderer,
      i = t.mapping === ff || t.mapping === df;
    i
      ? (this._cubemapMaterial === null && (this._cubemapMaterial = Uv()),
        (this._cubemapMaterial.uniforms.flipEnvMap.value = t.isRenderTargetTexture === !1 ? -1 : 1))
      : this._equirectMaterial === null && (this._equirectMaterial = Fv());
    const a = i ? this._cubemapMaterial : this._equirectMaterial,
      o = new Sn(this._lodPlanes[0], a),
      r = a.uniforms;
    r.envMap.value = t;
    const l = this._cubeSize;
    (Uu(e, 0, 0, 3 * l, 2 * l), s.setRenderTarget(e), s.render(o, Pg));
  }
  _applyPMREM(t) {
    const e = this._renderer,
      s = e.autoClear;
    e.autoClear = !1;
    const i = this._lodPlanes.length;
    for (let a = 1; a < i; a++) {
      const o = Math.sqrt(this._sigmas[a] * this._sigmas[a] - this._sigmas[a - 1] * this._sigmas[a - 1]),
        r = Dv[(i - a - 1) % Dv.length];
      this._blur(t, a - 1, a, o, r);
    }
    e.autoClear = s;
  }
  _blur(t, e, s, i, a) {
    const o = this._pingPongRenderTarget;
    (this._halfBlur(t, o, e, s, i, "latitudinal", a), this._halfBlur(o, t, s, s, i, "longitudinal", a));
  }
  _halfBlur(t, e, s, i, a, o, r) {
    const l = this._renderer,
      c = this._blurMaterial;
    o !== "latitudinal" &&
      o !== "longitudinal" &&
      console.error("blur direction must be either latitudinal or longitudinal!");
    const f = 3,
      d = new Sn(this._lodPlanes[i], c),
      h = c.uniforms,
      u = this._sizeLods[s] - 1,
      m = isFinite(a) ? Math.PI / (2 * u) : (2 * Math.PI) / (2 * bl - 1),
      x = a / m,
      p = isFinite(a) ? 1 + Math.floor(f * x) : bl;
    p > bl &&
      console.warn(
        `sigmaRadians, ${a}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${bl}`,
      );
    const g = [];
    let y = 0;
    for (let S = 0; S < bl; ++S) {
      const b = S / x,
        w = Math.exp((-b * b) / 2);
      (g.push(w), S === 0 ? (y += w) : S < p && (y += 2 * w));
    }
    for (let S = 0; S < g.length; S++) g[S] = g[S] / y;
    ((h.envMap.value = t.texture),
      (h.samples.value = p),
      (h.weights.value = g),
      (h.latitudinal.value = o === "latitudinal"),
      r && (h.poleAxis.value = r));
    const { _lodMax: v } = this;
    ((h.dTheta.value = m), (h.mipInt.value = v - s));
    const _ = this._sizeLods[i],
      k = 3 * _ * (i > v - $c ? i - v + $c : 0),
      M = 4 * (this._cubeSize - _);
    (Uu(e, k, M, 3 * _, 2 * _), l.setRenderTarget(e), l.render(d, Pg));
  }
}

function uR(n, t, e) {
  const s = new Float32Array(bl),
    i = new dt(0, 1, 0);
  return new An({
    name: "SphericalGaussianBlur",
    defines: { n: bl, CUBEUV_TEXEL_WIDTH: 1 / t, CUBEUV_TEXEL_HEIGHT: 1 / e, CUBEUV_MAX_MIP: `${n}.0` },
    uniforms: {
      envMap: { value: null },
      samples: { value: 1 },
      weights: { value: s },
      latitudinal: { value: !1 },
      dTheta: { value: 0 },
      mipInt: { value: 0 },
      poleAxis: { value: i },
    },
    vertexShader: lx(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,
    blending: Sr,
    depthTest: !1,
    depthWrite: !1,
  });
}

function Fv() {
  return new An({
    name: "EquirectangularToCubeUV",
    uniforms: { envMap: { value: null } },
    vertexShader: lx(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,
    blending: Sr,
    depthTest: !1,
    depthWrite: !1,
  });
}

function Uv() {
  return new An({
    name: "CubemapToCubeUV",
    uniforms: { envMap: { value: null }, flipEnvMap: { value: -1 } },
    vertexShader: lx(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,
    blending: Sr,
    depthTest: !1,
    depthWrite: !1,
  });
}

function pR(n) {
  let t = new WeakMap(),
    e = null;
  function s(r) {
    if (r && r.isTexture) {
      const l = r.mapping,
        c = l === b5 || l === _5,
        f = l === ff || l === df;
      if (c || f) {
        let d = t.get(r);
        const h = d !== void 0 ? d.texture.pmremVersion : 0;
        if (r.isRenderTargetTexture && r.pmremVersion !== h)
          return (
            e === null && (e = new zv(n)),
            (d = c ? e.fromEquirectangular(r, d) : e.fromCubemap(r, d)),
            (d.texture.pmremVersion = r.pmremVersion),
            t.set(r, d),
            d.texture
          );
        if (d !== void 0) return d.texture;
        {
          const u = r.image;
          return (c && u && u.height > 0) || (f && u && i(u))
            ? (e === null && (e = new zv(n)),
              (d = c ? e.fromEquirectangular(r) : e.fromCubemap(r)),
              (d.texture.pmremVersion = r.pmremVersion),
              t.set(r, d),
              r.addEventListener("dispose", a),
              d.texture)
            : null;
        }
      }
    }
    return r;
  }
  function i(r) {
    let l = 0;
    const c = 6;
    for (let f = 0; f < c; f++) r[f] !== void 0 && l++;
    return l === c;
  }
  function a(r) {
    const l = r.target;
    l.removeEventListener("dispose", a);
    const c = t.get(l);
    c !== void 0 && (t.delete(l), c.dispose());
  }
  function o() {
    ((t = new WeakMap()), e !== null && (e.dispose(), (e = null)));
  }
  return { get: s, dispose: o };
}

function mR(n) {
  const t = {};
  function e(s) {
    if (t[s] !== void 0) return t[s];
    let i;
    switch (s) {
      case "WEBGL_depth_texture":
        i =
          n.getExtension("WEBGL_depth_texture") ||
          n.getExtension("MOZ_WEBGL_depth_texture") ||
          n.getExtension("WEBKIT_WEBGL_depth_texture");
        break;
      case "EXT_texture_filter_anisotropic":
        i =
          n.getExtension("EXT_texture_filter_anisotropic") ||
          n.getExtension("MOZ_EXT_texture_filter_anisotropic") ||
          n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
        break;
      case "WEBGL_compressed_texture_s3tc":
        i =
          n.getExtension("WEBGL_compressed_texture_s3tc") ||
          n.getExtension("MOZ_WEBGL_compressed_texture_s3tc") ||
          n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
        break;
      case "WEBGL_compressed_texture_pvrtc":
        i =
          n.getExtension("WEBGL_compressed_texture_pvrtc") ||
          n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
        break;
      default:
        i = n.getExtension(s);
    }
    return ((t[s] = i), i);
  }
  return {
    has: function (s) {
      return e(s) !== null;
    },
    init: function () {
      (e("EXT_color_buffer_float"),
        e("WEBGL_clip_cull_distance"),
        e("OES_texture_float_linear"),
        e("EXT_color_buffer_half_float"),
        e("WEBGL_multisampled_render_to_texture"),
        e("WEBGL_render_shared_exponent"));
    },
    get: function (s) {
      const i = e(s);
      return (i === null && bh("THREE.WebGLRenderer: " + s + " extension not supported."), i);
    },
  };
}

function gR(n, t, e, s) {
  const i = {},
    a = new WeakMap();
  function o(d) {
    const h = d.target;
    h.index !== null && t.remove(h.index);
    for (const m in h.attributes) t.remove(h.attributes[m]);
    (h.removeEventListener("dispose", o), delete i[h.id]);
    const u = a.get(h);
    (u && (t.remove(u), a.delete(h)),
      s.releaseStatesOfGeometry(h),
      h.isInstancedBufferGeometry === !0 && delete h._maxInstanceCount,
      e.memory.geometries--);
  }
  function r(d, h) {
    return (i[h.id] === !0 || (h.addEventListener("dispose", o), (i[h.id] = !0), e.memory.geometries++), h);
  }
  function l(d) {
    const h = d.attributes;
    for (const u in h) t.update(h[u], n.ARRAY_BUFFER);
  }
  function c(d) {
    const h = [],
      u = d.index,
      m = d.attributes.position;
    let x = 0;
    if (u !== null) {
      const y = u.array;
      x = u.version;
      for (let v = 0, _ = y.length; v < _; v += 3) {
        const k = y[v + 0],
          M = y[v + 1],
          S = y[v + 2];
        h.push(k, M, M, S, S, k);
      }
    } else if (m !== void 0) {
      const y = m.array;
      x = m.version;
      for (let v = 0, _ = y.length / 3 - 1; v < _; v += 3) {
        const k = v + 0,
          M = v + 1,
          S = v + 2;
        h.push(k, M, M, S, S, k);
      }
    } else return;
    const p = new (pM(h) ? um : hm)(h, 1);
    p.version = x;
    const g = a.get(d);
    (g && t.remove(g), a.set(d, p));
  }
  function f(d) {
    const h = a.get(d);
    if (h) {
      const u = d.index;
      u !== null && h.version < u.version && c(d);
    } else c(d);
    return a.get(d);
  }
  return { get: r, update: l, getWireframeAttribute: f };
}

function xR(n, t, e) {
  let s;
  function i(h) {
    s = h;
  }
  let a, o;
  function r(h) {
    ((a = h.type), (o = h.bytesPerElement));
  }
  function l(h, u) {
    (n.drawElements(s, u, a, h * o), e.update(u, s, 1));
  }
  function c(h, u, m) {
    m !== 0 && (n.drawElementsInstanced(s, u, a, h * o, m), e.update(u, s, m));
  }
  function f(h, u, m) {
    if (m === 0) return;
    t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s, u, 0, a, h, 0, m);
    let p = 0;
    for (let g = 0; g < m; g++) p += u[g];
    e.update(p, s, 1);
  }
  function d(h, u, m, x) {
    if (m === 0) return;
    const p = t.get("WEBGL_multi_draw");
    if (p === null) for (let g = 0; g < h.length; g++) c(h[g] / o, u[g], x[g]);
    else {
      p.multiDrawElementsInstancedWEBGL(s, u, 0, a, h, 0, x, 0, m);
      let g = 0;
      for (let y = 0; y < m; y++) g += u[y] * x[y];
      e.update(g, s, 1);
    }
  }
  ((this.setMode = i),
    (this.setIndex = r),
    (this.render = l),
    (this.renderInstances = c),
    (this.renderMultiDraw = f),
    (this.renderMultiDrawInstances = d));
}

function yR(n) {
  const t = { geometries: 0, textures: 0 },
    e = { frame: 0, calls: 0, triangles: 0, points: 0, lines: 0 };
  function s(a, o, r) {
    switch ((e.calls++, o)) {
      case n.TRIANGLES:
        e.triangles += r * (a / 3);
        break;
      case n.LINES:
        e.lines += r * (a / 2);
        break;
      case n.LINE_STRIP:
        e.lines += r * (a - 1);
        break;
      case n.LINE_LOOP:
        e.lines += r * a;
        break;
      case n.POINTS:
        e.points += r * a;
        break;
      default:
        console.error("THREE.WebGLInfo: Unknown draw mode:", o);
        break;
    }
  }
  function i() {
    ((e.calls = 0), (e.triangles = 0), (e.points = 0), (e.lines = 0));
  }
  return { memory: t, render: e, programs: null, autoReset: !0, reset: i, update: s };
}

function vR(n, t, e) {
  const s = new WeakMap(),
    i = new kn();
  function a(o, r, l) {
    const c = o.morphTargetInfluences,
      f = r.morphAttributes.position || r.morphAttributes.normal || r.morphAttributes.color,
      d = f !== void 0 ? f.length : 0;
    let h = s.get(r);
    if (h === void 0 || h.count !== d) {
      let T = function () {
        (b.dispose(), s.delete(r), r.removeEventListener("dispose", T));
      };
      var u = T;
      h !== void 0 && h.texture.dispose();
      const m = r.morphAttributes.position !== void 0,
        x = r.morphAttributes.normal !== void 0,
        p = r.morphAttributes.color !== void 0,
        g = r.morphAttributes.position || [],
        y = r.morphAttributes.normal || [],
        v = r.morphAttributes.color || [];
      let _ = 0;
      (m === !0 && (_ = 1), x === !0 && (_ = 2), p === !0 && (_ = 3));
      let k = r.attributes.position.count * _,
        M = 1;
      k > t.maxTextureSize && ((M = Math.ceil(k / t.maxTextureSize)), (k = t.maxTextureSize));
      const S = new Float32Array(k * M * 4 * d),
        b = new mM(S, k, M, d);
      ((b.type = fo), (b.needsUpdate = !0));
      const w = _ * 4;
      for (let E = 0; E < d; E++) {
        const A = g[E],
          C = y[E],
          R = v[E],
          I = k * M * 4 * E;
        for (let P = 0; P < A.count; P++) {
          const F = P * w;
          (m === !0 &&
            (i.fromBufferAttribute(A, P),
            (S[I + F + 0] = i.x),
            (S[I + F + 1] = i.y),
            (S[I + F + 2] = i.z),
            (S[I + F + 3] = 0)),
            x === !0 &&
              (i.fromBufferAttribute(C, P),
              (S[I + F + 4] = i.x),
              (S[I + F + 5] = i.y),
              (S[I + F + 6] = i.z),
              (S[I + F + 7] = 0)),
            p === !0 &&
              (i.fromBufferAttribute(R, P),
              (S[I + F + 8] = i.x),
              (S[I + F + 9] = i.y),
              (S[I + F + 10] = i.z),
              (S[I + F + 11] = R.itemSize === 4 ? i.w : 1)));
        }
      }
      ((h = { count: d, texture: b, size: new Ee(k, M) }), s.set(r, h), r.addEventListener("dispose", T));
    }
    if (o.isInstancedMesh === !0 && o.morphTexture !== null)
      l.getUniforms().setValue(n, "morphTexture", o.morphTexture, e);
    else {
      let m = 0;
      for (let p = 0; p < c.length; p++) m += c[p];
      const x = r.morphTargetsRelative ? 1 : 1 - m;
      (l.getUniforms().setValue(n, "morphTargetBaseInfluence", x),
        l.getUniforms().setValue(n, "morphTargetInfluences", c));
    }
    (l.getUniforms().setValue(n, "morphTargetsTexture", h.texture, e),
      l.getUniforms().setValue(n, "morphTargetsTextureSize", h.size));
  }
  return { update: a };
}

function bR(n, t, e, s) {
  let i = new WeakMap();
  function a(l) {
    const c = s.render.frame,
      f = l.geometry,
      d = t.get(l, f);
    if (
      (i.get(d) !== c && (t.update(d), i.set(d, c)),
      l.isInstancedMesh &&
        (l.hasEventListener("dispose", r) === !1 && l.addEventListener("dispose", r),
        i.get(l) !== c &&
          (e.update(l.instanceMatrix, n.ARRAY_BUFFER),
          l.instanceColor !== null && e.update(l.instanceColor, n.ARRAY_BUFFER),
          i.set(l, c))),
      l.isSkinnedMesh)
    ) {
      const h = l.skeleton;
      i.get(h) !== c && (h.update(), i.set(h, c));
    }
    return d;
  }
  function o() {
    i = new WeakMap();
  }
  function r(l) {
    const c = l.target;
    (c.removeEventListener("dispose", r),
      e.remove(c.instanceMatrix),
      c.instanceColor !== null && e.remove(c.instanceColor));
  }
  return { update: a, dispose: o };
}

const NM = new Vs(),
  Ov = new SM(1, 1),
  FM = new mM(),
  UM = new E7(),
  OM = new _M(),
  Bv = [],
  Hv = [],
  $v = new Float32Array(16),
  Gv = new Float32Array(9),
  Vv = new Float32Array(4);

function Lf(n, t, e) {
  const s = n[0];
  if (s <= 0 || s > 0) return n;
  const i = t * e;
  let a = Bv[i];
  if ((a === void 0 && ((a = new Float32Array(i)), (Bv[i] = a)), t !== 0)) {
    s.toArray(a, 0);
    for (let o = 1, r = 0; o !== t; ++o) ((r += e), n[o].toArray(a, r));
  }
  return a;
}

function Fs(n, t) {
  if (n.length !== t.length) return !1;
  for (let e = 0, s = n.length; e < s; e++) if (n[e] !== t[e]) return !1;
  return !0;
}

function Us(n, t) {
  for (let e = 0, s = t.length; e < s; e++) n[e] = t[e];
}

function ym(n, t) {
  let e = Hv[t];
  e === void 0 && ((e = new Int32Array(t)), (Hv[t] = e));
  for (let s = 0; s !== t; ++s) e[s] = n.allocateTextureUnit();
  return e;
}

function _R(n, t) {
  const e = this.cache;
  e[0] !== t && (n.uniform1f(this.addr, t), (e[0] = t));
}

function wR(n, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y) && (n.uniform2f(this.addr, t.x, t.y), (e[0] = t.x), (e[1] = t.y));
  else {
    if (Fs(e, t)) return;
    (n.uniform2fv(this.addr, t), Us(e, t));
  }
}

function MR(n, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) &&
      (n.uniform3f(this.addr, t.x, t.y, t.z), (e[0] = t.x), (e[1] = t.y), (e[2] = t.z));
  else if (t.r !== void 0)
    (e[0] !== t.r || e[1] !== t.g || e[2] !== t.b) &&
      (n.uniform3f(this.addr, t.r, t.g, t.b), (e[0] = t.r), (e[1] = t.g), (e[2] = t.b));
  else {
    if (Fs(e, t)) return;
    (n.uniform3fv(this.addr, t), Us(e, t));
  }
}

function kR(n, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) &&
      (n.uniform4f(this.addr, t.x, t.y, t.z, t.w), (e[0] = t.x), (e[1] = t.y), (e[2] = t.z), (e[3] = t.w));
  else {
    if (Fs(e, t)) return;
    (n.uniform4fv(this.addr, t), Us(e, t));
  }
}

function SR(n, t) {
  const e = this.cache,
    s = t.elements;
  if (s === void 0) {
    if (Fs(e, t)) return;
    (n.uniformMatrix2fv(this.addr, !1, t), Us(e, t));
  } else {
    if (Fs(e, s)) return;
    (Vv.set(s), n.uniformMatrix2fv(this.addr, !1, Vv), Us(e, s));
  }
}

function TR(n, t) {
  const e = this.cache,
    s = t.elements;
  if (s === void 0) {
    if (Fs(e, t)) return;
    (n.uniformMatrix3fv(this.addr, !1, t), Us(e, t));
  } else {
    if (Fs(e, s)) return;
    (Gv.set(s), n.uniformMatrix3fv(this.addr, !1, Gv), Us(e, s));
  }
}

function ER(n, t) {
  const e = this.cache,
    s = t.elements;
  if (s === void 0) {
    if (Fs(e, t)) return;
    (n.uniformMatrix4fv(this.addr, !1, t), Us(e, t));
  } else {
    if (Fs(e, s)) return;
    ($v.set(s), n.uniformMatrix4fv(this.addr, !1, $v), Us(e, s));
  }
}

function AR(n, t) {
  const e = this.cache;
  e[0] !== t && (n.uniform1i(this.addr, t), (e[0] = t));
}

function RR(n, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y) && (n.uniform2i(this.addr, t.x, t.y), (e[0] = t.x), (e[1] = t.y));
  else {
    if (Fs(e, t)) return;
    (n.uniform2iv(this.addr, t), Us(e, t));
  }
}

function CR(n, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) &&
      (n.uniform3i(this.addr, t.x, t.y, t.z), (e[0] = t.x), (e[1] = t.y), (e[2] = t.z));
  else {
    if (Fs(e, t)) return;
    (n.uniform3iv(this.addr, t), Us(e, t));
  }
}

function LR(n, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) &&
      (n.uniform4i(this.addr, t.x, t.y, t.z, t.w), (e[0] = t.x), (e[1] = t.y), (e[2] = t.z), (e[3] = t.w));
  else {
    if (Fs(e, t)) return;
    (n.uniform4iv(this.addr, t), Us(e, t));
  }
}

function IR(n, t) {
  const e = this.cache;
  e[0] !== t && (n.uniform1ui(this.addr, t), (e[0] = t));
}

function PR(n, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y) && (n.uniform2ui(this.addr, t.x, t.y), (e[0] = t.x), (e[1] = t.y));
  else {
    if (Fs(e, t)) return;
    (n.uniform2uiv(this.addr, t), Us(e, t));
  }
}

function DR(n, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) &&
      (n.uniform3ui(this.addr, t.x, t.y, t.z), (e[0] = t.x), (e[1] = t.y), (e[2] = t.z));
  else {
    if (Fs(e, t)) return;
    (n.uniform3uiv(this.addr, t), Us(e, t));
  }
}

function zR(n, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) &&
      (n.uniform4ui(this.addr, t.x, t.y, t.z, t.w), (e[0] = t.x), (e[1] = t.y), (e[2] = t.z), (e[3] = t.w));
  else {
    if (Fs(e, t)) return;
    (n.uniform4uiv(this.addr, t), Us(e, t));
  }
}

function NR(n, t, e) {
  const s = this.cache,
    i = e.allocateTextureUnit();
  s[0] !== i && (n.uniform1i(this.addr, i), (s[0] = i));
  let a;
  (this.type === n.SAMPLER_2D_SHADOW ? ((Ov.compareFunction = uM), (a = Ov)) : (a = NM),
    e.setTexture2D(t || a, i));
}

function FR(n, t, e) {
  const s = this.cache,
    i = e.allocateTextureUnit();
  (s[0] !== i && (n.uniform1i(this.addr, i), (s[0] = i)), e.setTexture3D(t || UM, i));
}

function UR(n, t, e) {
  const s = this.cache,
    i = e.allocateTextureUnit();
  (s[0] !== i && (n.uniform1i(this.addr, i), (s[0] = i)), e.setTextureCube(t || OM, i));
}

function OR(n, t, e) {
  const s = this.cache,
    i = e.allocateTextureUnit();
  (s[0] !== i && (n.uniform1i(this.addr, i), (s[0] = i)), e.setTexture2DArray(t || FM, i));
}

function BR(n) {
  switch (n) {
    case 5126:
      return _R;
    case 35664:
      return wR;
    case 35665:
      return MR;
    case 35666:
      return kR;
    case 35674:
      return SR;
    case 35675:
      return TR;
    case 35676:
      return ER;
    case 5124:
    case 35670:
      return AR;
    case 35667:
    case 35671:
      return RR;
    case 35668:
    case 35672:
      return CR;
    case 35669:
    case 35673:
      return LR;
    case 5125:
      return IR;
    case 36294:
      return PR;
    case 36295:
      return DR;
    case 36296:
      return zR;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return NR;
    case 35679:
    case 36299:
    case 36307:
      return FR;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return UR;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return OR;
  }
}

function HR(n, t) {
  n.uniform1fv(this.addr, t);
}

function $R(n, t) {
  const e = Lf(t, this.size, 2);
  n.uniform2fv(this.addr, e);
}

function GR(n, t) {
  const e = Lf(t, this.size, 3);
  n.uniform3fv(this.addr, e);
}

function VR(n, t) {
  const e = Lf(t, this.size, 4);
  n.uniform4fv(this.addr, e);
}

function WR(n, t) {
  const e = Lf(t, this.size, 4);
  n.uniformMatrix2fv(this.addr, !1, e);
}

function jR(n, t) {
  const e = Lf(t, this.size, 9);
  n.uniformMatrix3fv(this.addr, !1, e);
}

function qR(n, t) {
  const e = Lf(t, this.size, 16);
  n.uniformMatrix4fv(this.addr, !1, e);
}

function XR(n, t) {
  n.uniform1iv(this.addr, t);
}

function YR(n, t) {
  n.uniform2iv(this.addr, t);
}

function KR(n, t) {
  n.uniform3iv(this.addr, t);
}

function ZR(n, t) {
  n.uniform4iv(this.addr, t);
}

function QR(n, t) {
  n.uniform1uiv(this.addr, t);
}

function JR(n, t) {
  n.uniform2uiv(this.addr, t);
}

function tC(n, t) {
  n.uniform3uiv(this.addr, t);
}

function eC(n, t) {
  n.uniform4uiv(this.addr, t);
}

function nC(n, t, e) {
  const s = this.cache,
    i = t.length,
    a = ym(e, i);
  Fs(s, a) || (n.uniform1iv(this.addr, a), Us(s, a));
  for (let o = 0; o !== i; ++o) e.setTexture2D(t[o] || NM, a[o]);
}

function sC(n, t, e) {
  const s = this.cache,
    i = t.length,
    a = ym(e, i);
  Fs(s, a) || (n.uniform1iv(this.addr, a), Us(s, a));
  for (let o = 0; o !== i; ++o) e.setTexture3D(t[o] || UM, a[o]);
}

function iC(n, t, e) {
  const s = this.cache,
    i = t.length,
    a = ym(e, i);
  Fs(s, a) || (n.uniform1iv(this.addr, a), Us(s, a));
  for (let o = 0; o !== i; ++o) e.setTextureCube(t[o] || OM, a[o]);
}

function aC(n, t, e) {
  const s = this.cache,
    i = t.length,
    a = ym(e, i);
  Fs(s, a) || (n.uniform1iv(this.addr, a), Us(s, a));
  for (let o = 0; o !== i; ++o) e.setTexture2DArray(t[o] || FM, a[o]);
}

function oC(n) {
  switch (n) {
    case 5126:
      return HR;
    case 35664:
      return $R;
    case 35665:
      return GR;
    case 35666:
      return VR;
    case 35674:
      return WR;
    case 35675:
      return jR;
    case 35676:
      return qR;
    case 5124:
    case 35670:
      return XR;
    case 35667:
    case 35671:
      return YR;
    case 35668:
    case 35672:
      return KR;
    case 35669:
    case 35673:
      return ZR;
    case 5125:
      return QR;
    case 36294:
      return JR;
    case 36295:
      return tC;
    case 36296:
      return eC;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return nC;
    case 35679:
    case 36299:
    case 36307:
      return sC;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return iC;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return aC;
  }
}

class rC {
  constructor(t, e, s) {
    ((this.id = t), (this.addr = s), (this.cache = []), (this.type = e.type), (this.setValue = BR(e.type)));
  }
}

class lC {
  constructor(t, e, s) {
    ((this.id = t),
      (this.addr = s),
      (this.cache = []),
      (this.type = e.type),
      (this.size = e.size),
      (this.setValue = oC(e.type)));
  }
}

class cC {
  constructor(t) {
    ((this.id = t), (this.seq = []), (this.map = {}));
  }
  setValue(t, e, s) {
    const i = this.seq;
    for (let a = 0, o = i.length; a !== o; ++a) {
      const r = i[a];
      r.setValue(t, e[r.id], s);
    }
  }
}

const Ug = /(\w+)(\])?(\[|\.)?/g;

function Wv(n, t) {
  (n.seq.push(t), (n.map[t.id] = t));
}

function fC(n, t, e) {
  const s = n.name,
    i = s.length;
  for (Ug.lastIndex = 0; ;) {
    const a = Ug.exec(s),
      o = Ug.lastIndex;
    let r = a[1];
    const l = a[2] === "]",
      c = a[3];
    if ((l && (r = r | 0), c === void 0 || (c === "[" && o + 2 === i))) {
      Wv(e, c === void 0 ? new rC(r, n, t) : new lC(r, n, t));
      break;
    } else {
      let d = e.map[r];
      (d === void 0 && ((d = new cC(r)), Wv(e, d)), (e = d));
    }
  }
}

class h1 {
  constructor(t, e) {
    ((this.seq = []), (this.map = {}));
    const s = t.getProgramParameter(e, t.ACTIVE_UNIFORMS);
    for (let i = 0; i < s; ++i) {
      const a = t.getActiveUniform(e, i),
        o = t.getUniformLocation(e, a.name);
      fC(a, o, this);
    }
  }
  setValue(t, e, s, i) {
    const a = this.map[e];
    a !== void 0 && a.setValue(t, s, i);
  }
  setOptional(t, e, s) {
    const i = e[s];
    i !== void 0 && this.setValue(t, s, i);
  }
  static upload(t, e, s, i) {
    for (let a = 0, o = e.length; a !== o; ++a) {
      const r = e[a],
        l = s[r.id];
      l.needsUpdate !== !1 && r.setValue(t, l.value, i);
    }
  }
  static seqWithValue(t, e) {
    const s = [];
    for (let i = 0, a = t.length; i !== a; ++i) {
      const o = t[i];
      o.id in e && s.push(o);
    }
    return s;
  }
}

function jv(n, t, e) {
  const s = n.createShader(t);
  return (n.shaderSource(s, e), n.compileShader(s), s);
}

const dC = 37297;

let hC = 0;

function uC(n, t) {
  const e = n.split(`
`),
    s = [],
    i = Math.max(t - 6, 0),
    a = Math.min(t + 6, e.length);
  for (let o = i; o < a; o++) {
    const r = o + 1;
    s.push(`${r === t ? ">" : " "} ${r}: ${e[o]}`);
  }
  return s.join(`
`);
}

const qv = new Je();

function pC(n) {
  In._getMatrix(qv, In.workingColorSpace, n);
  const t = `mat3( ${qv.elements.map((e) => e.toFixed(4))} )`;
  switch (In.getTransfer(n)) {
    case D1:
      return [t, "LinearTransferOETF"];
    case jn:
      return [t, "sRGBTransferOETF"];
    default:
      return (console.warn("THREE.WebGLProgram: Unsupported color space: ", n), [t, "LinearTransferOETF"]);
  }
}

function Xv(n, t, e) {
  const s = n.getShaderParameter(t, n.COMPILE_STATUS),
    a = (n.getShaderInfoLog(t) || "").trim();
  if (s && a === "") return "";
  const o = /ERROR: 0:(\d+)/.exec(a);
  if (o) {
    const r = parseInt(o[1]);
    return (
      e.toUpperCase() +
      `

` +
      a +
      `

` +
      uC(n.getShaderSource(t), r)
    );
  } else return a;
}

function mC(n, t) {
  const e = pC(t);
  return [`vec4 ${n}( vec4 value ) {`, `	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`, "}"].join(`
`);
}

function gC(n, t) {
  let e;
  switch (t) {
    case n7:
      e = "Linear";
      break;
    case s7:
      e = "Reinhard";
      break;
    case i7:
      e = "Cineon";
      break;
    case sM:
      e = "ACESFilmic";
      break;
    case a7:
      e = "AgX";
      break;
    case o7:
      e = "Neutral";
      break;
    case iM:
      e = "Custom";
      break;
    default:
      (console.warn("THREE.WebGLProgram: Unsupported toneMapping:", t), (e = "Linear"));
  }
  return "vec3 " + n + "( vec3 color ) { return " + e + "ToneMapping( color ); }";
}

const Ou = new dt();

function xC() {
  In.getLuminanceCoefficients(Ou);
  const n = Ou.x.toFixed(4),
    t = Ou.y.toFixed(4),
    e = Ou.z.toFixed(4);
  return [
    "float luminance( const in vec3 rgb ) {",
    `	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,
    "	return dot( weights, rgb );",
    "}",
  ].join(`
`);
}

function yC(n) {
  return [
    n.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "",
    n.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : "",
  ].filter($d).join(`
`);
}

function vC(n) {
  const t = [];
  for (const e in n) {
    const s = n[e];
    s !== !1 && t.push("#define " + e + " " + s);
  }
  return t.join(`
`);
}

function bC(n, t) {
  const e = {},
    s = n.getProgramParameter(t, n.ACTIVE_ATTRIBUTES);
  for (let i = 0; i < s; i++) {
    const a = n.getActiveAttrib(t, i),
      o = a.name;
    let r = 1;
    (a.type === n.FLOAT_MAT2 && (r = 2),
      a.type === n.FLOAT_MAT3 && (r = 3),
      a.type === n.FLOAT_MAT4 && (r = 4),
      (e[o] = { type: a.type, location: n.getAttribLocation(t, o), locationSize: r }));
  }
  return e;
}

function $d(n) {
  return n !== "";
}

function Yv(n, t) {
  const e = t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps;
  return n
    .replace(/NUM_DIR_LIGHTS/g, t.numDirLights)
    .replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights)
    .replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps)
    .replace(/NUM_SPOT_LIGHT_COORDS/g, e)
    .replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights)
    .replace(/NUM_POINT_LIGHTS/g, t.numPointLights)
    .replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights)
    .replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows)
    .replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps)
    .replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows)
    .replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows);
}

function Kv(n, t) {
  return n
    .replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes)
    .replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection);
}

const _C = /^[ \t]*#include +<([\w\d./]+)>/gm;

function n3(n) {
  return n.replace(_C, MC);
}

const wC = new Map();

function MC(n, t) {
  let e = tn[t];
  if (e === void 0) {
    const s = wC.get(t);
    if (s !== void 0)
      ((e = tn[s]),
        console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', t, s));
    else throw new Error("Can not resolve #include <" + t + ">");
  }
  return n3(e);
}

const kC =
  /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;

function Zv(n) {
  return n.replace(kC, SC);
}

function SC(n, t, e, s) {
  let i = "";
  for (let a = parseInt(t); a < parseInt(e); a++)
    i += s.replace(/\[\s*i\s*\]/g, "[ " + a + " ]").replace(/UNROLLED_LOOP_INDEX/g, a);
  return i;
}

function Qv(n) {
  let t = `precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;
  return (
    n.precision === "highp"
      ? (t += `
#define HIGH_PRECISION`)
      : n.precision === "mediump"
        ? (t += `
#define MEDIUM_PRECISION`)
        : n.precision === "lowp" &&
          (t += `
#define LOW_PRECISION`),
    t
  );
}

function TC(n) {
  let t = "SHADOWMAP_TYPE_BASIC";
  return (
    n.shadowMapType === V3
      ? (t = "SHADOWMAP_TYPE_PCF")
      : n.shadowMapType === P1
        ? (t = "SHADOWMAP_TYPE_PCF_SOFT")
        : n.shadowMapType === pr && (t = "SHADOWMAP_TYPE_VSM"),
    t
  );
}

function EC(n) {
  let t = "ENVMAP_TYPE_CUBE";
  if (n.envMap)
    switch (n.envMapMode) {
      case ff:
      case df:
        t = "ENVMAP_TYPE_CUBE";
        break;
      case dm:
        t = "ENVMAP_TYPE_CUBE_UV";
        break;
    }
  return t;
}

function AC(n) {
  let t = "ENVMAP_MODE_REFLECTION";
  return (n.envMap && n.envMapMode === df && (t = "ENVMAP_MODE_REFRACTION"), t);
}

function RC(n) {
  let t = "ENVMAP_BLENDING_NONE";
  if (n.envMap)
    switch (n.combine) {
      case nM:
        t = "ENVMAP_BLENDING_MULTIPLY";
        break;
      case t7:
        t = "ENVMAP_BLENDING_MIX";
        break;
      case e7:
        t = "ENVMAP_BLENDING_ADD";
        break;
    }
  return t;
}

function CC(n) {
  const t = n.envMapCubeUVHeight;
  if (t === null) return null;
  const e = Math.log2(t) - 2,
    s = 1 / t;
  return { texelWidth: 1 / (3 * Math.max(Math.pow(2, e), 112)), texelHeight: s, maxMip: e };
}

function LC(n, t, e, s) {
  const i = n.getContext(),
    a = e.defines;
  let o = e.vertexShader,
    r = e.fragmentShader;
  const l = TC(e),
    c = EC(e),
    f = AC(e),
    d = RC(e),
    h = CC(e),
    u = yC(e),
    m = vC(a),
    x = i.createProgram();
  let p,
    g,
    y = e.glslVersion
      ? "#version " +
        e.glslVersion +
        `
`
      : "";
  (e.isRawShaderMaterial
    ? ((p = ["#define SHADER_TYPE " + e.shaderType, "#define SHADER_NAME " + e.shaderName, m].filter($d)
        .join(`
`)),
      p.length > 0 &&
        (p += `
`),
      (g = ["#define SHADER_TYPE " + e.shaderType, "#define SHADER_NAME " + e.shaderName, m].filter($d).join(`
`)),
      g.length > 0 &&
        (g += `
`))
    : ((p = [
        Qv(e),
        "#define SHADER_TYPE " + e.shaderType,
        "#define SHADER_NAME " + e.shaderName,
        m,
        e.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
        e.batching ? "#define USE_BATCHING" : "",
        e.batchingColor ? "#define USE_BATCHING_COLOR" : "",
        e.instancing ? "#define USE_INSTANCING" : "",
        e.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
        e.instancingMorph ? "#define USE_INSTANCING_MORPH" : "",
        e.useFog && e.fog ? "#define USE_FOG" : "",
        e.useFog && e.fogExp2 ? "#define FOG_EXP2" : "",
        e.map ? "#define USE_MAP" : "",
        e.envMap ? "#define USE_ENVMAP" : "",
        e.envMap ? "#define " + f : "",
        e.lightMap ? "#define USE_LIGHTMAP" : "",
        e.aoMap ? "#define USE_AOMAP" : "",
        e.bumpMap ? "#define USE_BUMPMAP" : "",
        e.normalMap ? "#define USE_NORMALMAP" : "",
        e.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
        e.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
        e.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
        e.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
        e.anisotropy ? "#define USE_ANISOTROPY" : "",
        e.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
        e.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
        e.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
        e.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
        e.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
        e.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
        e.specularMap ? "#define USE_SPECULARMAP" : "",
        e.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
        e.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
        e.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
        e.metalnessMap ? "#define USE_METALNESSMAP" : "",
        e.alphaMap ? "#define USE_ALPHAMAP" : "",
        e.alphaHash ? "#define USE_ALPHAHASH" : "",
        e.transmission ? "#define USE_TRANSMISSION" : "",
        e.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
        e.thicknessMap ? "#define USE_THICKNESSMAP" : "",
        e.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
        e.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
        e.mapUv ? "#define MAP_UV " + e.mapUv : "",
        e.alphaMapUv ? "#define ALPHAMAP_UV " + e.alphaMapUv : "",
        e.lightMapUv ? "#define LIGHTMAP_UV " + e.lightMapUv : "",
        e.aoMapUv ? "#define AOMAP_UV " + e.aoMapUv : "",
        e.emissiveMapUv ? "#define EMISSIVEMAP_UV " + e.emissiveMapUv : "",
        e.bumpMapUv ? "#define BUMPMAP_UV " + e.bumpMapUv : "",
        e.normalMapUv ? "#define NORMALMAP_UV " + e.normalMapUv : "",
        e.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + e.displacementMapUv : "",
        e.metalnessMapUv ? "#define METALNESSMAP_UV " + e.metalnessMapUv : "",
        e.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + e.roughnessMapUv : "",
        e.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + e.anisotropyMapUv : "",
        e.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + e.clearcoatMapUv : "",
        e.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + e.clearcoatNormalMapUv : "",
        e.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + e.clearcoatRoughnessMapUv : "",
        e.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + e.iridescenceMapUv : "",
        e.iridescenceThicknessMapUv
          ? "#define IRIDESCENCE_THICKNESSMAP_UV " + e.iridescenceThicknessMapUv
          : "",
        e.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + e.sheenColorMapUv : "",
        e.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + e.sheenRoughnessMapUv : "",
        e.specularMapUv ? "#define SPECULARMAP_UV " + e.specularMapUv : "",
        e.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + e.specularColorMapUv : "",
        e.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + e.specularIntensityMapUv : "",
        e.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + e.transmissionMapUv : "",
        e.thicknessMapUv ? "#define THICKNESSMAP_UV " + e.thicknessMapUv : "",
        e.vertexTangents && e.flatShading === !1 ? "#define USE_TANGENT" : "",
        e.vertexColors ? "#define USE_COLOR" : "",
        e.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
        e.vertexUv1s ? "#define USE_UV1" : "",
        e.vertexUv2s ? "#define USE_UV2" : "",
        e.vertexUv3s ? "#define USE_UV3" : "",
        e.pointsUvs ? "#define USE_POINTS_UV" : "",
        e.flatShading ? "#define FLAT_SHADED" : "",
        e.skinning ? "#define USE_SKINNING" : "",
        e.morphTargets ? "#define USE_MORPHTARGETS" : "",
        e.morphNormals && e.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
        e.morphColors ? "#define USE_MORPHCOLORS" : "",
        e.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + e.morphTextureStride : "",
        e.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + e.morphTargetsCount : "",
        e.doubleSided ? "#define DOUBLE_SIDED" : "",
        e.flipSided ? "#define FLIP_SIDED" : "",
        e.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
        e.shadowMapEnabled ? "#define " + l : "",
        e.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
        e.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
        e.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
        e.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
        "uniform mat4 modelMatrix;",
        "uniform mat4 modelViewMatrix;",
        "uniform mat4 projectionMatrix;",
        "uniform mat4 viewMatrix;",
        "uniform mat3 normalMatrix;",
        "uniform vec3 cameraPosition;",
        "uniform bool isOrthographic;",
        "#ifdef USE_INSTANCING",
        "	attribute mat4 instanceMatrix;",
        "#endif",
        "#ifdef USE_INSTANCING_COLOR",
        "	attribute vec3 instanceColor;",
        "#endif",
        "#ifdef USE_INSTANCING_MORPH",
        "	uniform sampler2D morphTexture;",
        "#endif",
        "attribute vec3 position;",
        "attribute vec3 normal;",
        "attribute vec2 uv;",
        "#ifdef USE_UV1",
        "	attribute vec2 uv1;",
        "#endif",
        "#ifdef USE_UV2",
        "	attribute vec2 uv2;",
        "#endif",
        "#ifdef USE_UV3",
        "	attribute vec2 uv3;",
        "#endif",
        "#ifdef USE_TANGENT",
        "	attribute vec4 tangent;",
        "#endif",
        "#if defined( USE_COLOR_ALPHA )",
        "	attribute vec4 color;",
        "#elif defined( USE_COLOR )",
        "	attribute vec3 color;",
        "#endif",
        "#ifdef USE_SKINNING",
        "	attribute vec4 skinIndex;",
        "	attribute vec4 skinWeight;",
        "#endif",
        `
`,
      ].filter($d).join(`
`)),
      (g = [
        Qv(e),
        "#define SHADER_TYPE " + e.shaderType,
        "#define SHADER_NAME " + e.shaderName,
        m,
        e.useFog && e.fog ? "#define USE_FOG" : "",
        e.useFog && e.fogExp2 ? "#define FOG_EXP2" : "",
        e.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
        e.map ? "#define USE_MAP" : "",
        e.matcap ? "#define USE_MATCAP" : "",
        e.envMap ? "#define USE_ENVMAP" : "",
        e.envMap ? "#define " + c : "",
        e.envMap ? "#define " + f : "",
        e.envMap ? "#define " + d : "",
        h ? "#define CUBEUV_TEXEL_WIDTH " + h.texelWidth : "",
        h ? "#define CUBEUV_TEXEL_HEIGHT " + h.texelHeight : "",
        h ? "#define CUBEUV_MAX_MIP " + h.maxMip + ".0" : "",
        e.lightMap ? "#define USE_LIGHTMAP" : "",
        e.aoMap ? "#define USE_AOMAP" : "",
        e.bumpMap ? "#define USE_BUMPMAP" : "",
        e.normalMap ? "#define USE_NORMALMAP" : "",
        e.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
        e.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
        e.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
        e.anisotropy ? "#define USE_ANISOTROPY" : "",
        e.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
        e.clearcoat ? "#define USE_CLEARCOAT" : "",
        e.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
        e.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
        e.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
        e.dispersion ? "#define USE_DISPERSION" : "",
        e.iridescence ? "#define USE_IRIDESCENCE" : "",
        e.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
        e.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
        e.specularMap ? "#define USE_SPECULARMAP" : "",
        e.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
        e.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
        e.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
        e.metalnessMap ? "#define USE_METALNESSMAP" : "",
        e.alphaMap ? "#define USE_ALPHAMAP" : "",
        e.alphaTest ? "#define USE_ALPHATEST" : "",
        e.alphaHash ? "#define USE_ALPHAHASH" : "",
        e.sheen ? "#define USE_SHEEN" : "",
        e.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
        e.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
        e.transmission ? "#define USE_TRANSMISSION" : "",
        e.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
        e.thicknessMap ? "#define USE_THICKNESSMAP" : "",
        e.vertexTangents && e.flatShading === !1 ? "#define USE_TANGENT" : "",
        e.vertexColors || e.instancingColor || e.batchingColor ? "#define USE_COLOR" : "",
        e.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
        e.vertexUv1s ? "#define USE_UV1" : "",
        e.vertexUv2s ? "#define USE_UV2" : "",
        e.vertexUv3s ? "#define USE_UV3" : "",
        e.pointsUvs ? "#define USE_POINTS_UV" : "",
        e.gradientMap ? "#define USE_GRADIENTMAP" : "",
        e.flatShading ? "#define FLAT_SHADED" : "",
        e.doubleSided ? "#define DOUBLE_SIDED" : "",
        e.flipSided ? "#define FLIP_SIDED" : "",
        e.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
        e.shadowMapEnabled ? "#define " + l : "",
        e.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
        e.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
        e.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
        e.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "",
        e.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
        e.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
        "uniform mat4 viewMatrix;",
        "uniform vec3 cameraPosition;",
        "uniform bool isOrthographic;",
        e.toneMapping !== R0 ? "#define TONE_MAPPING" : "",
        e.toneMapping !== R0 ? tn.tonemapping_pars_fragment : "",
        e.toneMapping !== R0 ? gC("toneMapping", e.toneMapping) : "",
        e.dithering ? "#define DITHERING" : "",
        e.opaque ? "#define OPAQUE" : "",
        tn.colorspace_pars_fragment,
        mC("linearToOutputTexel", e.outputColorSpace),
        xC(),
        e.useDepthPacking ? "#define DEPTH_PACKING " + e.depthPacking : "",
        `
`,
      ].filter($d).join(`
`))),
    (o = n3(o)),
    (o = Yv(o, e)),
    (o = Kv(o, e)),
    (r = n3(r)),
    (r = Yv(r, e)),
    (r = Kv(r, e)),
    (o = Zv(o)),
    (r = Zv(r)),
    e.isRawShaderMaterial !== !0 &&
      ((y = `#version 300 es
`),
      (p =
        [u, "#define attribute in", "#define varying out", "#define texture2D texture"].join(`
`) +
        `
` +
        p),
      (g =
        [
          "#define varying in",
          e.glslVersion === sv ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
          e.glslVersion === sv ? "" : "#define gl_FragColor pc_fragColor",
          "#define gl_FragDepthEXT gl_FragDepth",
          "#define texture2D texture",
          "#define textureCube texture",
          "#define texture2DProj textureProj",
          "#define texture2DLodEXT textureLod",
          "#define texture2DProjLodEXT textureProjLod",
          "#define textureCubeLodEXT textureLod",
          "#define texture2DGradEXT textureGrad",
          "#define texture2DProjGradEXT textureProjGrad",
          "#define textureCubeGradEXT textureGrad",
        ].join(`
`) +
        `
` +
        g)));
  const v = y + p + o,
    _ = y + g + r,
    k = jv(i, i.VERTEX_SHADER, v),
    M = jv(i, i.FRAGMENT_SHADER, _);
  (i.attachShader(x, k),
    i.attachShader(x, M),
    e.index0AttributeName !== void 0
      ? i.bindAttribLocation(x, 0, e.index0AttributeName)
      : e.morphTargets === !0 && i.bindAttribLocation(x, 0, "position"),
    i.linkProgram(x));
  function S(E) {
    if (n.debug.checkShaderErrors) {
      const A = i.getProgramInfoLog(x) || "",
        C = i.getShaderInfoLog(k) || "",
        R = i.getShaderInfoLog(M) || "",
        I = A.trim(),
        P = C.trim(),
        F = R.trim();
      let L = !0,
        B = !0;
      if (i.getProgramParameter(x, i.LINK_STATUS) === !1)
        if (((L = !1), typeof n.debug.onShaderError == "function")) n.debug.onShaderError(i, x, k, M);
        else {
          const G = Xv(i, k, "vertex"),
            q = Xv(i, M, "fragment");
          console.error(
            "THREE.WebGLProgram: Shader Error " +
              i.getError() +
              " - VALIDATE_STATUS " +
              i.getProgramParameter(x, i.VALIDATE_STATUS) +
              `

Material Name: ` +
              E.name +
              `
Material Type: ` +
              E.type +
              `

Program Info Log: ` +
              I +
              `
` +
              G +
              `
` +
              q,
          );
        }
      else
        I !== ""
          ? console.warn("THREE.WebGLProgram: Program Info Log:", I)
          : (P === "" || F === "") && (B = !1);
      B &&
        (E.diagnostics = {
          runnable: L,
          programLog: I,
          vertexShader: { log: P, prefix: p },
          fragmentShader: { log: F, prefix: g },
        });
    }
    (i.deleteShader(k), i.deleteShader(M), (b = new h1(i, x)), (w = bC(i, x)));
  }
  let b;
  this.getUniforms = function () {
    return (b === void 0 && S(this), b);
  };
  let w;
  this.getAttributes = function () {
    return (w === void 0 && S(this), w);
  };
  let T = e.rendererExtensionParallelShaderCompile === !1;
  return (
    (this.isReady = function () {
      return (T === !1 && (T = i.getProgramParameter(x, dC)), T);
    }),
    (this.destroy = function () {
      (s.releaseStatesOfProgram(this), i.deleteProgram(x), (this.program = void 0));
    }),
    (this.type = e.shaderType),
    (this.name = e.shaderName),
    (this.id = hC++),
    (this.cacheKey = t),
    (this.usedTimes = 1),
    (this.program = x),
    (this.vertexShader = k),
    (this.fragmentShader = M),
    this
  );
}

let IC = 0;

class PC {
  constructor() {
    ((this.shaderCache = new Map()), (this.materialCache = new Map()));
  }
  update(t) {
    const e = t.vertexShader,
      s = t.fragmentShader,
      i = this._getShaderStage(e),
      a = this._getShaderStage(s),
      o = this._getShaderCacheForMaterial(t);
    return (o.has(i) === !1 && (o.add(i), i.usedTimes++), o.has(a) === !1 && (o.add(a), a.usedTimes++), this);
  }
  remove(t) {
    const e = this.materialCache.get(t);
    for (const s of e) (s.usedTimes--, s.usedTimes === 0 && this.shaderCache.delete(s.code));
    return (this.materialCache.delete(t), this);
  }
  getVertexShaderID(t) {
    return this._getShaderStage(t.vertexShader).id;
  }
  getFragmentShaderID(t) {
    return this._getShaderStage(t.fragmentShader).id;
  }
  dispose() {
    (this.shaderCache.clear(), this.materialCache.clear());
  }
  _getShaderCacheForMaterial(t) {
    const e = this.materialCache;
    let s = e.get(t);
    return (s === void 0 && ((s = new Set()), e.set(t, s)), s);
  }
  _getShaderStage(t) {
    const e = this.shaderCache;
    let s = e.get(t);
    return (s === void 0 && ((s = new DC(t)), e.set(t, s)), s);
  }
}

class DC {
  constructor(t) {
    ((this.id = IC++), (this.code = t), (this.usedTimes = 0));
  }
}

function zC(n, t, e, s, i, a, o) {
  const r = new gM(),
    l = new PC(),
    c = new Set(),
    f = [],
    d = i.logarithmicDepthBuffer,
    h = i.vertexTextures;
  let u = i.precision;
  const m = {
    MeshDepthMaterial: "depth",
    MeshDistanceMaterial: "distanceRGBA",
    MeshNormalMaterial: "normal",
    MeshBasicMaterial: "basic",
    MeshLambertMaterial: "lambert",
    MeshPhongMaterial: "phong",
    MeshToonMaterial: "toon",
    MeshStandardMaterial: "physical",
    MeshPhysicalMaterial: "physical",
    MeshMatcapMaterial: "matcap",
    LineBasicMaterial: "basic",
    LineDashedMaterial: "dashed",
    PointsMaterial: "points",
    ShadowMaterial: "shadow",
    SpriteMaterial: "sprite",
  };
  function x(w) {
    return (c.add(w), w === 0 ? "uv" : `uv${w}`);
  }
  function p(w, T, E, A, C) {
    const R = A.fog,
      I = C.geometry,
      P = w.isMeshStandardMaterial ? A.environment : null,
      F = (w.isMeshStandardMaterial ? e : t).get(w.envMap || P),
      L = F && F.mapping === dm ? F.image.height : null,
      B = m[w.type];
    w.precision !== null &&
      ((u = i.getMaxPrecision(w.precision)),
      u !== w.precision &&
        console.warn(
          "THREE.WebGLProgram.getParameters:",
          w.precision,
          "not supported, using",
          u,
          "instead.",
        ));
    const G = I.morphAttributes.position || I.morphAttributes.normal || I.morphAttributes.color,
      q = G !== void 0 ? G.length : 0;
    let et = 0;
    (I.morphAttributes.position !== void 0 && (et = 1),
      I.morphAttributes.normal !== void 0 && (et = 2),
      I.morphAttributes.color !== void 0 && (et = 3));
    let ct, rt, mt, nt;
    if (B) {
      const Tn = Io[B];
      ((ct = Tn.vertexShader), (rt = Tn.fragmentShader));
    } else
      ((ct = w.vertexShader),
        (rt = w.fragmentShader),
        l.update(w),
        (mt = l.getVertexShaderID(w)),
        (nt = l.getFragmentShaderID(w)));
    const H = n.getRenderTarget(),
      st = n.state.buffers.depth.getReversed(),
      tt = C.isInstancedMesh === !0,
      it = C.isBatchedMesh === !0,
      D = !!w.map,
      Q = !!w.matcap,
      $ = !!F,
      ut = !!w.aoMap,
      N = !!w.lightMap,
      J = !!w.bumpMap,
      Z = !!w.normalMap,
      ot = !!w.displacementMap,
      j = !!w.emissiveMap,
      at = !!w.metalnessMap,
      Rt = !!w.roughnessMap,
      kt = w.anisotropy > 0,
      V = w.clearcoat > 0,
      U = w.dispersion > 0,
      ht = w.iridescence > 0,
      lt = w.sheen > 0,
      O = w.transmission > 0,
      Y = kt && !!w.anisotropyMap,
      gt = V && !!w.clearcoatMap,
      ft = V && !!w.clearcoatNormalMap,
      _t = V && !!w.clearcoatRoughnessMap,
      Dt = ht && !!w.iridescenceMap,
      zt = ht && !!w.iridescenceThicknessMap,
      Ot = lt && !!w.sheenColorMap,
      Jt = lt && !!w.sheenRoughnessMap,
      ue = !!w.specularMap,
      Kt = !!w.specularColorMap,
      Ie = !!w.specularIntensityMap,
      xt = O && !!w.transmissionMap,
      qt = O && !!w.thicknessMap,
      te = !!w.gradientMap,
      ve = !!w.alphaMap,
      Wt = w.alphaTest > 0,
      Nt = !!w.alphaHash,
      Me = !!w.extensions;
    let Ue = R0;
    w.toneMapped && (H === null || H.isXRRenderTarget === !0) && (Ue = n.toneMapping);
    const zn = {
      shaderID: B,
      shaderType: w.type,
      shaderName: w.name,
      vertexShader: ct,
      fragmentShader: rt,
      defines: w.defines,
      customVertexShaderID: mt,
      customFragmentShaderID: nt,
      isRawShaderMaterial: w.isRawShaderMaterial === !0,
      glslVersion: w.glslVersion,
      precision: u,
      batching: it,
      batchingColor: it && C._colorsTexture !== null,
      instancing: tt,
      instancingColor: tt && C.instanceColor !== null,
      instancingMorph: tt && C.morphTexture !== null,
      supportsVertexTextures: h,
      outputColorSpace:
        H === null ? n.outputColorSpace : H.isXRRenderTarget === !0 ? H.texture.colorSpace : Ul,
      alphaToCoverage: !!w.alphaToCoverage,
      map: D,
      matcap: Q,
      envMap: $,
      envMapMode: $ && F.mapping,
      envMapCubeUVHeight: L,
      aoMap: ut,
      lightMap: N,
      bumpMap: J,
      normalMap: Z,
      displacementMap: h && ot,
      emissiveMap: j,
      normalMapObjectSpace: Z && w.normalMapType === d7,
      normalMapTangentSpace: Z && w.normalMapType === f7,
      metalnessMap: at,
      roughnessMap: Rt,
      anisotropy: kt,
      anisotropyMap: Y,
      clearcoat: V,
      clearcoatMap: gt,
      clearcoatNormalMap: ft,
      clearcoatRoughnessMap: _t,
      dispersion: U,
      iridescence: ht,
      iridescenceMap: Dt,
      iridescenceThicknessMap: zt,
      sheen: lt,
      sheenColorMap: Ot,
      sheenRoughnessMap: Jt,
      specularMap: ue,
      specularColorMap: Kt,
      specularIntensityMap: Ie,
      transmission: O,
      transmissionMap: xt,
      thicknessMap: qt,
      gradientMap: te,
      opaque: w.transparent === !1 && w.blending === Kc && w.alphaToCoverage === !1,
      alphaMap: ve,
      alphaTest: Wt,
      alphaHash: Nt,
      combine: w.combine,
      mapUv: D && x(w.map.channel),
      aoMapUv: ut && x(w.aoMap.channel),
      lightMapUv: N && x(w.lightMap.channel),
      bumpMapUv: J && x(w.bumpMap.channel),
      normalMapUv: Z && x(w.normalMap.channel),
      displacementMapUv: ot && x(w.displacementMap.channel),
      emissiveMapUv: j && x(w.emissiveMap.channel),
      metalnessMapUv: at && x(w.metalnessMap.channel),
      roughnessMapUv: Rt && x(w.roughnessMap.channel),
      anisotropyMapUv: Y && x(w.anisotropyMap.channel),
      clearcoatMapUv: gt && x(w.clearcoatMap.channel),
      clearcoatNormalMapUv: ft && x(w.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: _t && x(w.clearcoatRoughnessMap.channel),
      iridescenceMapUv: Dt && x(w.iridescenceMap.channel),
      iridescenceThicknessMapUv: zt && x(w.iridescenceThicknessMap.channel),
      sheenColorMapUv: Ot && x(w.sheenColorMap.channel),
      sheenRoughnessMapUv: Jt && x(w.sheenRoughnessMap.channel),
      specularMapUv: ue && x(w.specularMap.channel),
      specularColorMapUv: Kt && x(w.specularColorMap.channel),
      specularIntensityMapUv: Ie && x(w.specularIntensityMap.channel),
      transmissionMapUv: xt && x(w.transmissionMap.channel),
      thicknessMapUv: qt && x(w.thicknessMap.channel),
      alphaMapUv: ve && x(w.alphaMap.channel),
      vertexTangents: !!I.attributes.tangent && (Z || kt),
      vertexColors: w.vertexColors,
      vertexAlphas: w.vertexColors === !0 && !!I.attributes.color && I.attributes.color.itemSize === 4,
      pointsUvs: C.isPoints === !0 && !!I.attributes.uv && (D || ve),
      fog: !!R,
      useFog: w.fog === !0,
      fogExp2: !!R && R.isFogExp2,
      flatShading: w.flatShading === !0 && w.wireframe === !1,
      sizeAttenuation: w.sizeAttenuation === !0,
      logarithmicDepthBuffer: d,
      reversedDepthBuffer: st,
      skinning: C.isSkinnedMesh === !0,
      morphTargets: I.morphAttributes.position !== void 0,
      morphNormals: I.morphAttributes.normal !== void 0,
      morphColors: I.morphAttributes.color !== void 0,
      morphTargetsCount: q,
      morphTextureStride: et,
      numDirLights: T.directional.length,
      numPointLights: T.point.length,
      numSpotLights: T.spot.length,
      numSpotLightMaps: T.spotLightMap.length,
      numRectAreaLights: T.rectArea.length,
      numHemiLights: T.hemi.length,
      numDirLightShadows: T.directionalShadowMap.length,
      numPointLightShadows: T.pointShadowMap.length,
      numSpotLightShadows: T.spotShadowMap.length,
      numSpotLightShadowsWithMaps: T.numSpotLightShadowsWithMaps,
      numLightProbes: T.numLightProbes,
      numClippingPlanes: o.numPlanes,
      numClipIntersection: o.numIntersection,
      dithering: w.dithering,
      shadowMapEnabled: n.shadowMap.enabled && E.length > 0,
      shadowMapType: n.shadowMap.type,
      toneMapping: Ue,
      decodeVideoTexture: D && w.map.isVideoTexture === !0 && In.getTransfer(w.map.colorSpace) === jn,
      decodeVideoTextureEmissive:
        j && w.emissiveMap.isVideoTexture === !0 && In.getTransfer(w.emissiveMap.colorSpace) === jn,
      premultipliedAlpha: w.premultipliedAlpha,
      doubleSided: w.side === fi,
      flipSided: w.side === pi,
      useDepthPacking: w.depthPacking >= 0,
      depthPacking: w.depthPacking || 0,
      index0AttributeName: w.index0AttributeName,
      extensionClipCullDistance:
        Me && w.extensions.clipCullDistance === !0 && s.has("WEBGL_clip_cull_distance"),
      extensionMultiDraw: ((Me && w.extensions.multiDraw === !0) || it) && s.has("WEBGL_multi_draw"),
      rendererExtensionParallelShaderCompile: s.has("KHR_parallel_shader_compile"),
      customProgramCacheKey: w.customProgramCacheKey(),
    };
    return (
      (zn.vertexUv1s = c.has(1)),
      (zn.vertexUv2s = c.has(2)),
      (zn.vertexUv3s = c.has(3)),
      c.clear(),
      zn
    );
  }
  function g(w) {
    const T = [];
    if (
      (w.shaderID ? T.push(w.shaderID) : (T.push(w.customVertexShaderID), T.push(w.customFragmentShaderID)),
      w.defines !== void 0)
    )
      for (const E in w.defines) (T.push(E), T.push(w.defines[E]));
    return (
      w.isRawShaderMaterial === !1 && (y(T, w), v(T, w), T.push(n.outputColorSpace)),
      T.push(w.customProgramCacheKey),
      T.join()
    );
  }
  function y(w, T) {
    (w.push(T.precision),
      w.push(T.outputColorSpace),
      w.push(T.envMapMode),
      w.push(T.envMapCubeUVHeight),
      w.push(T.mapUv),
      w.push(T.alphaMapUv),
      w.push(T.lightMapUv),
      w.push(T.aoMapUv),
      w.push(T.bumpMapUv),
      w.push(T.normalMapUv),
      w.push(T.displacementMapUv),
      w.push(T.emissiveMapUv),
      w.push(T.metalnessMapUv),
      w.push(T.roughnessMapUv),
      w.push(T.anisotropyMapUv),
      w.push(T.clearcoatMapUv),
      w.push(T.clearcoatNormalMapUv),
      w.push(T.clearcoatRoughnessMapUv),
      w.push(T.iridescenceMapUv),
      w.push(T.iridescenceThicknessMapUv),
      w.push(T.sheenColorMapUv),
      w.push(T.sheenRoughnessMapUv),
      w.push(T.specularMapUv),
      w.push(T.specularColorMapUv),
      w.push(T.specularIntensityMapUv),
      w.push(T.transmissionMapUv),
      w.push(T.thicknessMapUv),
      w.push(T.combine),
      w.push(T.fogExp2),
      w.push(T.sizeAttenuation),
      w.push(T.morphTargetsCount),
      w.push(T.morphAttributeCount),
      w.push(T.numDirLights),
      w.push(T.numPointLights),
      w.push(T.numSpotLights),
      w.push(T.numSpotLightMaps),
      w.push(T.numHemiLights),
      w.push(T.numRectAreaLights),
      w.push(T.numDirLightShadows),
      w.push(T.numPointLightShadows),
      w.push(T.numSpotLightShadows),
      w.push(T.numSpotLightShadowsWithMaps),
      w.push(T.numLightProbes),
      w.push(T.shadowMapType),
      w.push(T.toneMapping),
      w.push(T.numClippingPlanes),
      w.push(T.numClipIntersection),
      w.push(T.depthPacking));
  }
  function v(w, T) {
    (r.disableAll(),
      T.supportsVertexTextures && r.enable(0),
      T.instancing && r.enable(1),
      T.instancingColor && r.enable(2),
      T.instancingMorph && r.enable(3),
      T.matcap && r.enable(4),
      T.envMap && r.enable(5),
      T.normalMapObjectSpace && r.enable(6),
      T.normalMapTangentSpace && r.enable(7),
      T.clearcoat && r.enable(8),
      T.iridescence && r.enable(9),
      T.alphaTest && r.enable(10),
      T.vertexColors && r.enable(11),
      T.vertexAlphas && r.enable(12),
      T.vertexUv1s && r.enable(13),
      T.vertexUv2s && r.enable(14),
      T.vertexUv3s && r.enable(15),
      T.vertexTangents && r.enable(16),
      T.anisotropy && r.enable(17),
      T.alphaHash && r.enable(18),
      T.batching && r.enable(19),
      T.dispersion && r.enable(20),
      T.batchingColor && r.enable(21),
      T.gradientMap && r.enable(22),
      w.push(r.mask),
      r.disableAll(),
      T.fog && r.enable(0),
      T.useFog && r.enable(1),
      T.flatShading && r.enable(2),
      T.logarithmicDepthBuffer && r.enable(3),
      T.reversedDepthBuffer && r.enable(4),
      T.skinning && r.enable(5),
      T.morphTargets && r.enable(6),
      T.morphNormals && r.enable(7),
      T.morphColors && r.enable(8),
      T.premultipliedAlpha && r.enable(9),
      T.shadowMapEnabled && r.enable(10),
      T.doubleSided && r.enable(11),
      T.flipSided && r.enable(12),
      T.useDepthPacking && r.enable(13),
      T.dithering && r.enable(14),
      T.transmission && r.enable(15),
      T.sheen && r.enable(16),
      T.opaque && r.enable(17),
      T.pointsUvs && r.enable(18),
      T.decodeVideoTexture && r.enable(19),
      T.decodeVideoTextureEmissive && r.enable(20),
      T.alphaToCoverage && r.enable(21),
      w.push(r.mask));
  }
  function _(w) {
    const T = m[w.type];
    let E;
    if (T) {
      const A = Io[T];
      E = N0.clone(A.uniforms);
    } else E = w.uniforms;
    return E;
  }
  function k(w, T) {
    let E;
    for (let A = 0, C = f.length; A < C; A++) {
      const R = f[A];
      if (R.cacheKey === T) {
        ((E = R), ++E.usedTimes);
        break;
      }
    }
    return (E === void 0 && ((E = new LC(n, T, w, a)), f.push(E)), E);
  }
  function M(w) {
    if (--w.usedTimes === 0) {
      const T = f.indexOf(w);
      ((f[T] = f[f.length - 1]), f.pop(), w.destroy());
    }
  }
  function S(w) {
    l.remove(w);
  }
  function b() {
    l.dispose();
  }
  return {
    getParameters: p,
    getProgramCacheKey: g,
    getUniforms: _,
    acquireProgram: k,
    releaseProgram: M,
    releaseShaderCache: S,
    programs: f,
    dispose: b,
  };
}
export { pR, mR, gR, xR, yR, vR, bR, h1, zC };
