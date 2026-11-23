// 14-three-7.js — three｜17 个顶层语句｜68KB
// 对应 game.pretty.js 第 25616–27461 行
// 关键内容：
//   iL                    dispose
//   cx                    default
//   Yt                    moba.lightTint.neutral
//   rL                    只有直出屏幕的材质定义了 TONE_MAPPING：把
//   $M                    未找到 CustomToneMapping 的默认实现
//   fx                    不可用
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { Dr, Ee, Fl, Fo, G3, Gs, K3, Ki, Ns, R0, Rr, Ul, Uo, Y3, Z3, co, fi, gh, iM, j3, mh, mi, pi, q3, ri, ti, xh } from './04-audio-2.js';
import { In, _7, b7, bh, dt, go, kn } from './05-three.js';
import { Ke, Ut } from './06-three-2.js';
import { Z7, pm, vM, zr } from './07-three-3.js';
import { kE, zM } from './08-three-4.js';
import { aR, cR, fR, lR, oR, rR, tn } from './10-render-2.js';
import { bR, gR, h1, mR, pR, vR, xR, yR, zC } from './11-render-3.js';
import { NC, UC, VC, YC, qC } from './12-three-5.js';
import { KC, Z0, ZC, eL, nL } from './13-three-6.js';

function sL(n, t) {
  function e(p, g) {
    (p.matrixAutoUpdate === !0 && p.updateMatrix(), g.value.copy(p.matrix));
  }
  function s(p, g) {
    (g.color.getRGB(p.fogColor.value, vM(n)),
      g.isFog
        ? ((p.fogNear.value = g.near), (p.fogFar.value = g.far))
        : g.isFogExp2 && (p.fogDensity.value = g.density));
  }
  function i(p, g, y, v, _) {
    g.isMeshBasicMaterial || g.isMeshLambertMaterial
      ? a(p, g)
      : g.isMeshToonMaterial
        ? (a(p, g), d(p, g))
        : g.isMeshPhongMaterial
          ? (a(p, g), f(p, g))
          : g.isMeshStandardMaterial
            ? (a(p, g), h(p, g), g.isMeshPhysicalMaterial && u(p, g, _))
            : g.isMeshMatcapMaterial
              ? (a(p, g), m(p, g))
              : g.isMeshDepthMaterial
                ? a(p, g)
                : g.isMeshDistanceMaterial
                  ? (a(p, g), x(p, g))
                  : g.isMeshNormalMaterial
                    ? a(p, g)
                    : g.isLineBasicMaterial
                      ? (o(p, g), g.isLineDashedMaterial && r(p, g))
                      : g.isPointsMaterial
                        ? l(p, g, y, v)
                        : g.isSpriteMaterial
                          ? c(p, g)
                          : g.isShadowMaterial
                            ? (p.color.value.copy(g.color), (p.opacity.value = g.opacity))
                            : g.isShaderMaterial && (g.uniformsNeedUpdate = !1);
  }
  function a(p, g) {
    ((p.opacity.value = g.opacity),
      g.color && p.diffuse.value.copy(g.color),
      g.emissive && p.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),
      g.map && ((p.map.value = g.map), e(g.map, p.mapTransform)),
      g.alphaMap && ((p.alphaMap.value = g.alphaMap), e(g.alphaMap, p.alphaMapTransform)),
      g.bumpMap &&
        ((p.bumpMap.value = g.bumpMap),
        e(g.bumpMap, p.bumpMapTransform),
        (p.bumpScale.value = g.bumpScale),
        g.side === pi && (p.bumpScale.value *= -1)),
      g.normalMap &&
        ((p.normalMap.value = g.normalMap),
        e(g.normalMap, p.normalMapTransform),
        p.normalScale.value.copy(g.normalScale),
        g.side === pi && p.normalScale.value.negate()),
      g.displacementMap &&
        ((p.displacementMap.value = g.displacementMap),
        e(g.displacementMap, p.displacementMapTransform),
        (p.displacementScale.value = g.displacementScale),
        (p.displacementBias.value = g.displacementBias)),
      g.emissiveMap && ((p.emissiveMap.value = g.emissiveMap), e(g.emissiveMap, p.emissiveMapTransform)),
      g.specularMap && ((p.specularMap.value = g.specularMap), e(g.specularMap, p.specularMapTransform)),
      g.alphaTest > 0 && (p.alphaTest.value = g.alphaTest));
    const y = t.get(g),
      v = y.envMap,
      _ = y.envMapRotation;
    (v &&
      ((p.envMap.value = v),
      Z0.copy(_),
      (Z0.x *= -1),
      (Z0.y *= -1),
      (Z0.z *= -1),
      v.isCubeTexture && v.isRenderTargetTexture === !1 && ((Z0.y *= -1), (Z0.z *= -1)),
      p.envMapRotation.value.setFromMatrix4(nL.makeRotationFromEuler(Z0)),
      (p.flipEnvMap.value = v.isCubeTexture && v.isRenderTargetTexture === !1 ? -1 : 1),
      (p.reflectivity.value = g.reflectivity),
      (p.ior.value = g.ior),
      (p.refractionRatio.value = g.refractionRatio)),
      g.lightMap &&
        ((p.lightMap.value = g.lightMap),
        (p.lightMapIntensity.value = g.lightMapIntensity),
        e(g.lightMap, p.lightMapTransform)),
      g.aoMap &&
        ((p.aoMap.value = g.aoMap),
        (p.aoMapIntensity.value = g.aoMapIntensity),
        e(g.aoMap, p.aoMapTransform)));
  }
  function o(p, g) {
    (p.diffuse.value.copy(g.color),
      (p.opacity.value = g.opacity),
      g.map && ((p.map.value = g.map), e(g.map, p.mapTransform)));
  }
  function r(p, g) {
    ((p.dashSize.value = g.dashSize),
      (p.totalSize.value = g.dashSize + g.gapSize),
      (p.scale.value = g.scale));
  }
  function l(p, g, y, v) {
    (p.diffuse.value.copy(g.color),
      (p.opacity.value = g.opacity),
      (p.size.value = g.size * y),
      (p.scale.value = v * 0.5),
      g.map && ((p.map.value = g.map), e(g.map, p.uvTransform)),
      g.alphaMap && ((p.alphaMap.value = g.alphaMap), e(g.alphaMap, p.alphaMapTransform)),
      g.alphaTest > 0 && (p.alphaTest.value = g.alphaTest));
  }
  function c(p, g) {
    (p.diffuse.value.copy(g.color),
      (p.opacity.value = g.opacity),
      (p.rotation.value = g.rotation),
      g.map && ((p.map.value = g.map), e(g.map, p.mapTransform)),
      g.alphaMap && ((p.alphaMap.value = g.alphaMap), e(g.alphaMap, p.alphaMapTransform)),
      g.alphaTest > 0 && (p.alphaTest.value = g.alphaTest));
  }
  function f(p, g) {
    (p.specular.value.copy(g.specular), (p.shininess.value = Math.max(g.shininess, 1e-4)));
  }
  function d(p, g) {
    g.gradientMap && (p.gradientMap.value = g.gradientMap);
  }
  function h(p, g) {
    ((p.metalness.value = g.metalness),
      g.metalnessMap && ((p.metalnessMap.value = g.metalnessMap), e(g.metalnessMap, p.metalnessMapTransform)),
      (p.roughness.value = g.roughness),
      g.roughnessMap && ((p.roughnessMap.value = g.roughnessMap), e(g.roughnessMap, p.roughnessMapTransform)),
      g.envMap && (p.envMapIntensity.value = g.envMapIntensity));
  }
  function u(p, g, y) {
    ((p.ior.value = g.ior),
      g.sheen > 0 &&
        (p.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),
        (p.sheenRoughness.value = g.sheenRoughness),
        g.sheenColorMap &&
          ((p.sheenColorMap.value = g.sheenColorMap), e(g.sheenColorMap, p.sheenColorMapTransform)),
        g.sheenRoughnessMap &&
          ((p.sheenRoughnessMap.value = g.sheenRoughnessMap),
          e(g.sheenRoughnessMap, p.sheenRoughnessMapTransform))),
      g.clearcoat > 0 &&
        ((p.clearcoat.value = g.clearcoat),
        (p.clearcoatRoughness.value = g.clearcoatRoughness),
        g.clearcoatMap &&
          ((p.clearcoatMap.value = g.clearcoatMap), e(g.clearcoatMap, p.clearcoatMapTransform)),
        g.clearcoatRoughnessMap &&
          ((p.clearcoatRoughnessMap.value = g.clearcoatRoughnessMap),
          e(g.clearcoatRoughnessMap, p.clearcoatRoughnessMapTransform)),
        g.clearcoatNormalMap &&
          ((p.clearcoatNormalMap.value = g.clearcoatNormalMap),
          e(g.clearcoatNormalMap, p.clearcoatNormalMapTransform),
          p.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),
          g.side === pi && p.clearcoatNormalScale.value.negate())),
      g.dispersion > 0 && (p.dispersion.value = g.dispersion),
      g.iridescence > 0 &&
        ((p.iridescence.value = g.iridescence),
        (p.iridescenceIOR.value = g.iridescenceIOR),
        (p.iridescenceThicknessMinimum.value = g.iridescenceThicknessRange[0]),
        (p.iridescenceThicknessMaximum.value = g.iridescenceThicknessRange[1]),
        g.iridescenceMap &&
          ((p.iridescenceMap.value = g.iridescenceMap), e(g.iridescenceMap, p.iridescenceMapTransform)),
        g.iridescenceThicknessMap &&
          ((p.iridescenceThicknessMap.value = g.iridescenceThicknessMap),
          e(g.iridescenceThicknessMap, p.iridescenceThicknessMapTransform))),
      g.transmission > 0 &&
        ((p.transmission.value = g.transmission),
        (p.transmissionSamplerMap.value = y.texture),
        p.transmissionSamplerSize.value.set(y.width, y.height),
        g.transmissionMap &&
          ((p.transmissionMap.value = g.transmissionMap), e(g.transmissionMap, p.transmissionMapTransform)),
        (p.thickness.value = g.thickness),
        g.thicknessMap &&
          ((p.thicknessMap.value = g.thicknessMap), e(g.thicknessMap, p.thicknessMapTransform)),
        (p.attenuationDistance.value = g.attenuationDistance),
        p.attenuationColor.value.copy(g.attenuationColor)),
      g.anisotropy > 0 &&
        (p.anisotropyVector.value.set(
          g.anisotropy * Math.cos(g.anisotropyRotation),
          g.anisotropy * Math.sin(g.anisotropyRotation),
        ),
        g.anisotropyMap &&
          ((p.anisotropyMap.value = g.anisotropyMap), e(g.anisotropyMap, p.anisotropyMapTransform))),
      (p.specularIntensity.value = g.specularIntensity),
      p.specularColor.value.copy(g.specularColor),
      g.specularColorMap &&
        ((p.specularColorMap.value = g.specularColorMap), e(g.specularColorMap, p.specularColorMapTransform)),
      g.specularIntensityMap &&
        ((p.specularIntensityMap.value = g.specularIntensityMap),
        e(g.specularIntensityMap, p.specularIntensityMapTransform)));
  }
  function m(p, g) {
    g.matcap && (p.matcap.value = g.matcap);
  }
  function x(p, g) {
    const y = t.get(g).light;
    (p.referencePosition.value.setFromMatrixPosition(y.matrixWorld),
      (p.nearDistance.value = y.shadow.camera.near),
      (p.farDistance.value = y.shadow.camera.far));
  }
  return { refreshFogUniforms: s, refreshMaterialUniforms: i };
}

function iL(n, t, e, s) {
  let i = {},
    a = {},
    o = [];
  const r = n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);
  function l(y, v) {
    const _ = v.program;
    s.uniformBlockBinding(y, _);
  }
  function c(y, v) {
    let _ = i[y.id];
    _ === void 0 && (m(y), (_ = f(y)), (i[y.id] = _), y.addEventListener("dispose", p));
    const k = v.program;
    s.updateUBOMapping(y, k);
    const M = t.render.frame;
    a[y.id] !== M && (h(y), (a[y.id] = M));
  }
  function f(y) {
    const v = d();
    y.__bindingPointIndex = v;
    const _ = n.createBuffer(),
      k = y.__size,
      M = y.usage;
    return (
      n.bindBuffer(n.UNIFORM_BUFFER, _),
      n.bufferData(n.UNIFORM_BUFFER, k, M),
      n.bindBuffer(n.UNIFORM_BUFFER, null),
      n.bindBufferBase(n.UNIFORM_BUFFER, v, _),
      _
    );
  }
  function d() {
    for (let y = 0; y < r; y++) if (o.indexOf(y) === -1) return (o.push(y), y);
    return (
      console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),
      0
    );
  }
  function h(y) {
    const v = i[y.id],
      _ = y.uniforms,
      k = y.__cache;
    n.bindBuffer(n.UNIFORM_BUFFER, v);
    for (let M = 0, S = _.length; M < S; M++) {
      const b = Array.isArray(_[M]) ? _[M] : [_[M]];
      for (let w = 0, T = b.length; w < T; w++) {
        const E = b[w];
        if (u(E, M, w, k) === !0) {
          const A = E.__offset,
            C = Array.isArray(E.value) ? E.value : [E.value];
          let R = 0;
          for (let I = 0; I < C.length; I++) {
            const P = C[I],
              F = x(P);
            typeof P == "number" || typeof P == "boolean"
              ? ((E.__data[0] = P), n.bufferSubData(n.UNIFORM_BUFFER, A + R, E.__data))
              : P.isMatrix3
                ? ((E.__data[0] = P.elements[0]),
                  (E.__data[1] = P.elements[1]),
                  (E.__data[2] = P.elements[2]),
                  (E.__data[3] = 0),
                  (E.__data[4] = P.elements[3]),
                  (E.__data[5] = P.elements[4]),
                  (E.__data[6] = P.elements[5]),
                  (E.__data[7] = 0),
                  (E.__data[8] = P.elements[6]),
                  (E.__data[9] = P.elements[7]),
                  (E.__data[10] = P.elements[8]),
                  (E.__data[11] = 0))
                : (P.toArray(E.__data, R), (R += F.storage / Float32Array.BYTES_PER_ELEMENT));
          }
          n.bufferSubData(n.UNIFORM_BUFFER, A, E.__data);
        }
      }
    }
    n.bindBuffer(n.UNIFORM_BUFFER, null);
  }
  function u(y, v, _, k) {
    const M = y.value,
      S = v + "_" + _;
    if (k[S] === void 0)
      return (typeof M == "number" || typeof M == "boolean" ? (k[S] = M) : (k[S] = M.clone()), !0);
    {
      const b = k[S];
      if (typeof M == "number" || typeof M == "boolean") {
        if (b !== M) return ((k[S] = M), !0);
      } else if (b.equals(M) === !1) return (b.copy(M), !0);
    }
    return !1;
  }
  function m(y) {
    const v = y.uniforms;
    let _ = 0;
    const k = 16;
    for (let S = 0, b = v.length; S < b; S++) {
      const w = Array.isArray(v[S]) ? v[S] : [v[S]];
      for (let T = 0, E = w.length; T < E; T++) {
        const A = w[T],
          C = Array.isArray(A.value) ? A.value : [A.value];
        for (let R = 0, I = C.length; R < I; R++) {
          const P = C[R],
            F = x(P),
            L = _ % k,
            B = L % F.boundary,
            G = L + B;
          ((_ += B),
            G !== 0 && k - G < F.storage && (_ += k - G),
            (A.__data = new Float32Array(F.storage / Float32Array.BYTES_PER_ELEMENT)),
            (A.__offset = _),
            (_ += F.storage));
        }
      }
    }
    const M = _ % k;
    return (M > 0 && (_ += k - M), (y.__size = _), (y.__cache = {}), this);
  }
  function x(y) {
    const v = { boundary: 0, storage: 0 };
    return (
      typeof y == "number" || typeof y == "boolean"
        ? ((v.boundary = 4), (v.storage = 4))
        : y.isVector2
          ? ((v.boundary = 8), (v.storage = 8))
          : y.isVector3 || y.isColor
            ? ((v.boundary = 16), (v.storage = 12))
            : y.isVector4
              ? ((v.boundary = 16), (v.storage = 16))
              : y.isMatrix3
                ? ((v.boundary = 48), (v.storage = 48))
                : y.isMatrix4
                  ? ((v.boundary = 64), (v.storage = 64))
                  : y.isTexture
                    ? console.warn(
                        "THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.",
                      )
                    : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", y),
      v
    );
  }
  function p(y) {
    const v = y.target;
    v.removeEventListener("dispose", p);
    const _ = o.indexOf(v.__bindingPointIndex);
    (o.splice(_, 1), n.deleteBuffer(i[v.id]), delete i[v.id], delete a[v.id]);
  }
  function g() {
    for (const y in i) n.deleteBuffer(i[y]);
    ((o = []), (i = {}), (a = {}));
  }
  return { bind: l, update: c, dispose: g };
}

class cx {
  constructor(t = {}) {
    const {
      canvas: e = b7(),
      context: s = null,
      depth: i = !0,
      stencil: a = !1,
      alpha: o = !1,
      antialias: r = !1,
      premultipliedAlpha: l = !0,
      preserveDrawingBuffer: c = !1,
      powerPreference: f = "default",
      failIfMajorPerformanceCaveat: d = !1,
      reversedDepthBuffer: h = !1,
    } = t;
    this.isWebGLRenderer = !0;
    let u;
    if (s !== null) {
      if (typeof WebGLRenderingContext < "u" && s instanceof WebGLRenderingContext)
        throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
      u = s.getContextAttributes().alpha;
    } else u = o;
    const m = new Uint32Array(4),
      x = new Int32Array(4);
    let p = null,
      g = null;
    const y = [],
      v = [];
    ((this.domElement = e),
      (this.debug = { checkShaderErrors: !0, onShaderError: null }),
      (this.autoClear = !0),
      (this.autoClearColor = !0),
      (this.autoClearDepth = !0),
      (this.autoClearStencil = !0),
      (this.sortObjects = !0),
      (this.clippingPlanes = []),
      (this.localClippingEnabled = !1),
      (this.toneMapping = R0),
      (this.toneMappingExposure = 1),
      (this.transmissionResolutionScale = 1));
    const _ = this;
    let k = !1;
    this._outputColorSpace = ri;
    let M = 0,
      S = 0,
      b = null,
      w = -1,
      T = null;
    const E = new kn(),
      A = new kn();
    let C = null;
    const R = new Ut(0);
    let I = 0,
      P = e.width,
      F = e.height,
      L = 1,
      B = null,
      G = null;
    const q = new kn(0, 0, P, F),
      et = new kn(0, 0, P, F);
    let ct = !1;
    const rt = new pm();
    let mt = !1,
      nt = !1;
    const H = new Ke(),
      st = new dt(),
      tt = new kn(),
      it = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 };
    let D = !1;
    function Q() {
      return b === null ? L : 1;
    }
    let $ = s;
    function ut(X, vt) {
      return e.getContext(X, vt);
    }
    try {
      const X = {
        alpha: !0,
        depth: i,
        stencil: a,
        antialias: r,
        premultipliedAlpha: l,
        preserveDrawingBuffer: c,
        powerPreference: f,
        failIfMajorPerformanceCaveat: d,
      };
      if (
        ("setAttribute" in e && e.setAttribute("data-engine", `three.js r${G3}`),
        e.addEventListener("webglcontextlost", te, !1),
        e.addEventListener("webglcontextrestored", ve, !1),
        e.addEventListener("webglcontextcreationerror", Wt, !1),
        $ === null)
      ) {
        const vt = "webgl2";
        if ((($ = ut(vt, X)), $ === null))
          throw ut(vt)
            ? new Error("Error creating WebGL context with your selected attributes.")
            : new Error("Error creating WebGL context.");
      }
    } catch (X) {
      throw (console.error("THREE.WebGLRenderer: " + X.message), X);
    }
    let N, J, Z, ot, j, at, Rt, kt, V, U, ht, lt, O, Y, gt, ft, _t, Dt, zt, Ot, Jt, ue, Kt, Ie;
    function xt() {
      ((N = new mR($)),
        N.init(),
        (ue = new ZC($, N)),
        (J = new lR($, N, t, ue)),
        (Z = new YC($, N)),
        J.reversedDepthBuffer && h && Z.buffers.depth.setReversed(!0),
        (ot = new yR($)),
        (j = new NC()),
        (at = new KC($, N, Z, j, J, ue, ot)),
        (Rt = new fR(_)),
        (kt = new pR(_)),
        (V = new kE($)),
        (Kt = new oR($, V)),
        (U = new gR($, V, ot, Kt)),
        (ht = new bR($, U, V, ot)),
        (zt = new vR($, J, at)),
        (ft = new cR(j)),
        (lt = new zC(_, Rt, kt, N, J, Kt, ft)),
        (O = new sL(_, j)),
        (Y = new UC()),
        (gt = new VC(N)),
        (Dt = new aR(_, Rt, kt, Z, ht, u, l)),
        (_t = new qC(_, ht, J)),
        (Ie = new iL($, ot, J, Z)),
        (Ot = new rR($, N, ot)),
        (Jt = new xR($, N, ot)),
        (ot.programs = lt.programs),
        (_.capabilities = J),
        (_.extensions = N),
        (_.properties = j),
        (_.renderLists = Y),
        (_.shadowMap = _t),
        (_.state = Z),
        (_.info = ot));
    }
    xt();
    const qt = new eL(_, $);
    ((this.xr = qt),
      (this.getContext = function () {
        return $;
      }),
      (this.getContextAttributes = function () {
        return $.getContextAttributes();
      }),
      (this.forceContextLoss = function () {
        const X = N.get("WEBGL_lose_context");
        X && X.loseContext();
      }),
      (this.forceContextRestore = function () {
        const X = N.get("WEBGL_lose_context");
        X && X.restoreContext();
      }),
      (this.getPixelRatio = function () {
        return L;
      }),
      (this.setPixelRatio = function (X) {
        X !== void 0 && ((L = X), this.setSize(P, F, !1));
      }),
      (this.getSize = function (X) {
        return X.set(P, F);
      }),
      (this.setSize = function (X, vt, St = !0) {
        if (qt.isPresenting) {
          console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
          return;
        }
        ((P = X),
          (F = vt),
          (e.width = Math.floor(X * L)),
          (e.height = Math.floor(vt * L)),
          St === !0 && ((e.style.width = X + "px"), (e.style.height = vt + "px")),
          this.setViewport(0, 0, X, vt));
      }),
      (this.getDrawingBufferSize = function (X) {
        return X.set(P * L, F * L).floor();
      }),
      (this.setDrawingBufferSize = function (X, vt, St) {
        ((P = X),
          (F = vt),
          (L = St),
          (e.width = Math.floor(X * St)),
          (e.height = Math.floor(vt * St)),
          this.setViewport(0, 0, X, vt));
      }),
      (this.getCurrentViewport = function (X) {
        return X.copy(E);
      }),
      (this.getViewport = function (X) {
        return X.copy(q);
      }),
      (this.setViewport = function (X, vt, St, Et) {
        (X.isVector4 ? q.set(X.x, X.y, X.z, X.w) : q.set(X, vt, St, Et),
          Z.viewport(E.copy(q).multiplyScalar(L).round()));
      }),
      (this.getScissor = function (X) {
        return X.copy(et);
      }),
      (this.setScissor = function (X, vt, St, Et) {
        (X.isVector4 ? et.set(X.x, X.y, X.z, X.w) : et.set(X, vt, St, Et),
          Z.scissor(A.copy(et).multiplyScalar(L).round()));
      }),
      (this.getScissorTest = function () {
        return ct;
      }),
      (this.setScissorTest = function (X) {
        Z.setScissorTest((ct = X));
      }),
      (this.setOpaqueSort = function (X) {
        B = X;
      }),
      (this.setTransparentSort = function (X) {
        G = X;
      }),
      (this.getClearColor = function (X) {
        return X.copy(Dt.getClearColor());
      }),
      (this.setClearColor = function () {
        Dt.setClearColor(...arguments);
      }),
      (this.getClearAlpha = function () {
        return Dt.getClearAlpha();
      }),
      (this.setClearAlpha = function () {
        Dt.setClearAlpha(...arguments);
      }),
      (this.clear = function (X = !0, vt = !0, St = !0) {
        let Et = 0;
        if (X) {
          let wt = !1;
          if (b !== null) {
            const Gt = b.texture.format;
            wt = Gt === Z3 || Gt === K3 || Gt === Y3;
          }
          if (wt) {
            const Gt = b.texture.type,
              fe = Gt === mi || Gt === Fl || Gt === gh || Gt === xh || Gt === j3 || Gt === q3,
              we = Dt.getClearColor(),
              re = Dt.getClearAlpha(),
              Te = we.r,
              De = we.g,
              Ce = we.b;
            fe
              ? ((m[0] = Te), (m[1] = De), (m[2] = Ce), (m[3] = re), $.clearBufferuiv($.COLOR, 0, m))
              : ((x[0] = Te), (x[1] = De), (x[2] = Ce), (x[3] = re), $.clearBufferiv($.COLOR, 0, x));
          } else Et |= $.COLOR_BUFFER_BIT;
        }
        (vt && (Et |= $.DEPTH_BUFFER_BIT),
          St && ((Et |= $.STENCIL_BUFFER_BIT), this.state.buffers.stencil.setMask(4294967295)),
          $.clear(Et));
      }),
      (this.clearColor = function () {
        this.clear(!0, !1, !1);
      }),
      (this.clearDepth = function () {
        this.clear(!1, !0, !1);
      }),
      (this.clearStencil = function () {
        this.clear(!1, !1, !0);
      }),
      (this.dispose = function () {
        (e.removeEventListener("webglcontextlost", te, !1),
          e.removeEventListener("webglcontextrestored", ve, !1),
          e.removeEventListener("webglcontextcreationerror", Wt, !1),
          Dt.dispose(),
          Y.dispose(),
          gt.dispose(),
          j.dispose(),
          Rt.dispose(),
          kt.dispose(),
          ht.dispose(),
          Kt.dispose(),
          Ie.dispose(),
          lt.dispose(),
          qt.dispose(),
          qt.removeEventListener("sessionstart", Ma),
          qt.removeEventListener("sessionend", Wf),
          Mo.stop());
      }));
    function te(X) {
      (X.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), (k = !0));
    }
    function ve() {
      (console.log("THREE.WebGLRenderer: Context Restored."), (k = !1));
      const X = ot.autoReset,
        vt = _t.enabled,
        St = _t.autoUpdate,
        Et = _t.needsUpdate,
        wt = _t.type;
      (xt(),
        (ot.autoReset = X),
        (_t.enabled = vt),
        (_t.autoUpdate = St),
        (_t.needsUpdate = Et),
        (_t.type = wt));
    }
    function Wt(X) {
      console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", X.statusMessage);
    }
    function Nt(X) {
      const vt = X.target;
      (vt.removeEventListener("dispose", Nt), Me(vt));
    }
    function Me(X) {
      (Ue(X), j.remove(X));
    }
    function Ue(X) {
      const vt = j.get(X).programs;
      vt !== void 0 &&
        (vt.forEach(function (St) {
          lt.releaseProgram(St);
        }),
        X.isShaderMaterial && lt.releaseShaderCache(X));
    }
    this.renderBufferDirect = function (X, vt, St, Et, wt, Gt) {
      vt === null && (vt = it);
      const fe = wt.isMesh && wt.matrixWorld.determinant() < 0,
        we = hs(X, vt, St, Et, wt);
      Z.setMaterial(Et, fe);
      let re = St.index,
        Te = 1;
      if (Et.wireframe === !0) {
        if (((re = U.getWireframeAttribute(St)), re === void 0)) return;
        Te = 2;
      }
      const De = St.drawRange,
        Ce = St.attributes.position;
      let cn = De.start * Te,
        _n = (De.start + De.count) * Te;
      (Gt !== null && ((cn = Math.max(cn, Gt.start * Te)), (_n = Math.min(_n, (Gt.start + Gt.count) * Te))),
        re !== null
          ? ((cn = Math.max(cn, 0)), (_n = Math.min(_n, re.count)))
          : Ce != null && ((cn = Math.max(cn, 0)), (_n = Math.min(_n, Ce.count))));
      const ts = _n - cn;
      if (ts < 0 || ts === 1 / 0) return;
      Kt.setup(wt, Et, we, St, re);
      let es,
        Xn = Ot;
      if ((re !== null && ((es = V.get(re)), (Xn = Jt), Xn.setIndex(es)), wt.isMesh))
        Et.wireframe === !0
          ? (Z.setLineWidth(Et.wireframeLinewidth * Q()), Xn.setMode($.LINES))
          : Xn.setMode($.TRIANGLES);
      else if (wt.isLine) {
        let Fe = Et.linewidth;
        (Fe === void 0 && (Fe = 1),
          Z.setLineWidth(Fe * Q()),
          wt.isLineSegments
            ? Xn.setMode($.LINES)
            : wt.isLineLoop
              ? Xn.setMode($.LINE_LOOP)
              : Xn.setMode($.LINE_STRIP));
      } else wt.isPoints ? Xn.setMode($.POINTS) : wt.isSprite && Xn.setMode($.TRIANGLES);
      if (wt.isBatchedMesh)
        if (wt._multiDrawInstances !== null)
          (bh(
            "THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection.",
          ),
            Xn.renderMultiDrawInstances(
              wt._multiDrawStarts,
              wt._multiDrawCounts,
              wt._multiDrawCount,
              wt._multiDrawInstances,
            ));
        else if (N.get("WEBGL_multi_draw"))
          Xn.renderMultiDraw(wt._multiDrawStarts, wt._multiDrawCounts, wt._multiDrawCount);
        else {
          const Fe = wt._multiDrawStarts,
            us = wt._multiDrawCounts,
            Rn = wt._multiDrawCount,
            la = re ? V.get(re).bytesPerElement : 1,
            Yl = j.get(Et).currentProgram.getUniforms();
          for (let ca = 0; ca < Rn; ca++) (Yl.setValue($, "_gl_DrawID", ca), Xn.render(Fe[ca] / la, us[ca]));
        }
      else if (wt.isInstancedMesh) Xn.renderInstances(cn, ts, wt.count);
      else if (St.isInstancedBufferGeometry) {
        const Fe = St._maxInstanceCount !== void 0 ? St._maxInstanceCount : 1 / 0,
          us = Math.min(St.instanceCount, Fe);
        Xn.renderInstances(cn, ts, us);
      } else Xn.render(cn, ts);
    };
    function zn(X, vt, St) {
      X.transparent === !0 && X.side === fi && X.forceSinglePass === !1
        ? ((X.side = pi),
          (X.needsUpdate = !0),
          be(X, vt, St),
          (X.side = Rr),
          (X.needsUpdate = !0),
          be(X, vt, St),
          (X.side = fi))
        : be(X, vt, St);
    }
    ((this.compile = function (X, vt, St = null) {
      (St === null && (St = X),
        (g = gt.get(St)),
        g.init(vt),
        v.push(g),
        St.traverseVisible(function (wt) {
          wt.isLight && wt.layers.test(vt.layers) && (g.pushLight(wt), wt.castShadow && g.pushShadow(wt));
        }),
        X !== St &&
          X.traverseVisible(function (wt) {
            wt.isLight && wt.layers.test(vt.layers) && (g.pushLight(wt), wt.castShadow && g.pushShadow(wt));
          }),
        g.setupLights());
      const Et = new Set();
      return (
        X.traverse(function (wt) {
          if (!(wt.isMesh || wt.isPoints || wt.isLine || wt.isSprite)) return;
          const Gt = wt.material;
          if (Gt)
            if (Array.isArray(Gt))
              for (let fe = 0; fe < Gt.length; fe++) {
                const we = Gt[fe];
                (zn(we, St, wt), Et.add(we));
              }
            else (zn(Gt, St, wt), Et.add(Gt));
        }),
        (g = v.pop()),
        Et
      );
    }),
      (this.compileAsync = function (X, vt, St = null) {
        const Et = this.compile(X, vt, St);
        return new Promise((wt) => {
          function Gt() {
            if (
              (Et.forEach(function (fe) {
                j.get(fe).currentProgram.isReady() && Et.delete(fe);
              }),
              Et.size === 0)
            ) {
              wt(X);
              return;
            }
            setTimeout(Gt, 10);
          }
          N.get("KHR_parallel_shader_compile") !== null ? Gt() : setTimeout(Gt, 10);
        });
      }));
    let Tn = null;
    function ra(X) {
      Tn && Tn(X);
    }
    function Ma() {
      Mo.stop();
    }
    function Wf() {
      Mo.start();
    }
    const Mo = new zM();
    (Mo.setAnimationLoop(ra),
      typeof self < "u" && Mo.setContext(self),
      (this.setAnimationLoop = function (X) {
        ((Tn = X), qt.setAnimationLoop(X), X === null ? Mo.stop() : Mo.start());
      }),
      qt.addEventListener("sessionstart", Ma),
      qt.addEventListener("sessionend", Wf),
      (this.render = function (X, vt) {
        if (vt !== void 0 && vt.isCamera !== !0) {
          console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
          return;
        }
        if (k === !0) return;
        if (
          (X.matrixWorldAutoUpdate === !0 && X.updateMatrixWorld(),
          vt.parent === null && vt.matrixWorldAutoUpdate === !0 && vt.updateMatrixWorld(),
          qt.enabled === !0 &&
            qt.isPresenting === !0 &&
            (qt.cameraAutoUpdate === !0 && qt.updateCamera(vt), (vt = qt.getCamera())),
          X.isScene === !0 && X.onBeforeRender(_, X, vt, b),
          (g = gt.get(X, v.length)),
          g.init(vt),
          v.push(g),
          H.multiplyMatrices(vt.projectionMatrix, vt.matrixWorldInverse),
          rt.setFromProjectionMatrix(H, Uo, vt.reversedDepth),
          (nt = this.localClippingEnabled),
          (mt = ft.init(this.clippingPlanes, nt)),
          (p = Y.get(X, y.length)),
          p.init(),
          y.push(p),
          qt.enabled === !0 && qt.isPresenting === !0)
        ) {
          const Gt = _.xr.getDepthSensingMesh();
          Gt !== null && Fr(Gt, vt, -1 / 0, _.sortObjects);
        }
        (Fr(X, vt, 0, _.sortObjects),
          p.finish(),
          _.sortObjects === !0 && p.sort(B, G),
          (D = qt.enabled === !1 || qt.isPresenting === !1 || qt.hasDepthSensing() === !1),
          D && Dt.addToRenderList(p, X),
          this.info.render.frame++,
          mt === !0 && ft.beginShadows());
        const St = g.state.shadowsArray;
        (_t.render(St, X, vt), mt === !0 && ft.endShadows(), this.info.autoReset === !0 && this.info.reset());
        const Et = p.opaque,
          wt = p.transmissive;
        if ((g.setupLights(), vt.isArrayCamera)) {
          const Gt = vt.cameras;
          if (wt.length > 0)
            for (let fe = 0, we = Gt.length; fe < we; fe++) {
              const re = Gt[fe];
              jf(Et, wt, X, re);
            }
          D && Dt.render(X);
          for (let fe = 0, we = Gt.length; fe < we; fe++) {
            const re = Gt[fe];
            ou(p, X, re, re.viewport);
          }
        } else (wt.length > 0 && jf(Et, wt, X, vt), D && Dt.render(X), ou(p, X, vt));
        (b !== null && S === 0 && (at.updateMultisampleRenderTarget(b), at.updateRenderTargetMipmap(b)),
          X.isScene === !0 && X.onAfterRender(_, X, vt),
          Kt.resetDefaultState(),
          (w = -1),
          (T = null),
          v.pop(),
          v.length > 0
            ? ((g = v[v.length - 1]), mt === !0 && ft.setGlobalState(_.clippingPlanes, g.state.camera))
            : (g = null),
          y.pop(),
          y.length > 0 ? (p = y[y.length - 1]) : (p = null));
      }));
    function Fr(X, vt, St, Et) {
      if (X.visible === !1) return;
      if (X.layers.test(vt.layers)) {
        if (X.isGroup) St = X.renderOrder;
        else if (X.isLOD) X.autoUpdate === !0 && X.update(vt);
        else if (X.isLight) (g.pushLight(X), X.castShadow && g.pushShadow(X));
        else if (X.isSprite) {
          if (!X.frustumCulled || rt.intersectsSprite(X)) {
            Et && tt.setFromMatrixPosition(X.matrixWorld).applyMatrix4(H);
            const fe = ht.update(X),
              we = X.material;
            we.visible && p.push(X, fe, we, St, tt.z, null);
          }
        } else if ((X.isMesh || X.isLine || X.isPoints) && (!X.frustumCulled || rt.intersectsObject(X))) {
          const fe = ht.update(X),
            we = X.material;
          if (
            (Et &&
              (X.boundingSphere !== void 0
                ? (X.boundingSphere === null && X.computeBoundingSphere(), tt.copy(X.boundingSphere.center))
                : (fe.boundingSphere === null && fe.computeBoundingSphere(),
                  tt.copy(fe.boundingSphere.center)),
              tt.applyMatrix4(X.matrixWorld).applyMatrix4(H)),
            Array.isArray(we))
          ) {
            const re = fe.groups;
            for (let Te = 0, De = re.length; Te < De; Te++) {
              const Ce = re[Te],
                cn = we[Ce.materialIndex];
              cn && cn.visible && p.push(X, fe, cn, St, tt.z, Ce);
            }
          } else we.visible && p.push(X, fe, we, St, tt.z, null);
        }
      }
      const Gt = X.children;
      for (let fe = 0, we = Gt.length; fe < we; fe++) Fr(Gt[fe], vt, St, Et);
    }
    function ou(X, vt, St, Et) {
      const wt = X.opaque,
        Gt = X.transmissive,
        fe = X.transparent;
      (g.setupLightsView(St),
        mt === !0 && ft.setGlobalState(_.clippingPlanes, St),
        Et && Z.viewport(E.copy(Et)),
        wt.length > 0 && Tt(wt, vt, St),
        Gt.length > 0 && Tt(Gt, vt, St),
        fe.length > 0 && Tt(fe, vt, St),
        Z.buffers.depth.setTest(!0),
        Z.buffers.depth.setMask(!0),
        Z.buffers.color.setMask(!0),
        Z.setPolygonOffset(!1));
    }
    function jf(X, vt, St, Et) {
      if ((St.isScene === !0 ? St.overrideMaterial : null) !== null) return;
      g.state.transmissionRenderTarget[Et.id] === void 0 &&
        (g.state.transmissionRenderTarget[Et.id] = new go(1, 1, {
          generateMipmaps: !0,
          type: N.has("EXT_color_buffer_half_float") || N.has("EXT_color_buffer_float") ? Dr : mi,
          minFilter: Fo,
          samples: 4,
          stencilBuffer: a,
          resolveDepthBuffer: !1,
          resolveStencilBuffer: !1,
          colorSpace: In.workingColorSpace,
        }));
      const Gt = g.state.transmissionRenderTarget[Et.id],
        fe = Et.viewport || E;
      Gt.setSize(fe.z * _.transmissionResolutionScale, fe.w * _.transmissionResolutionScale);
      const we = _.getRenderTarget(),
        re = _.getActiveCubeFace(),
        Te = _.getActiveMipmapLevel();
      (_.setRenderTarget(Gt),
        _.getClearColor(R),
        (I = _.getClearAlpha()),
        I < 1 && _.setClearColor(16777215, 0.5),
        _.clear(),
        D && Dt.render(St));
      const De = _.toneMapping;
      _.toneMapping = R0;
      const Ce = Et.viewport;
      if (
        (Et.viewport !== void 0 && (Et.viewport = void 0),
        g.setupLightsView(Et),
        mt === !0 && ft.setGlobalState(_.clippingPlanes, Et),
        Tt(X, St, Et),
        at.updateMultisampleRenderTarget(Gt),
        at.updateRenderTargetMipmap(Gt),
        N.has("WEBGL_multisampled_render_to_texture") === !1)
      ) {
        let cn = !1;
        for (let _n = 0, ts = vt.length; _n < ts; _n++) {
          const es = vt[_n],
            Xn = es.object,
            Fe = es.geometry,
            us = es.material,
            Rn = es.group;
          if (us.side === fi && Xn.layers.test(Et.layers)) {
            const la = us.side;
            ((us.side = pi),
              (us.needsUpdate = !0),
              Zt(Xn, St, Et, Fe, us, Rn),
              (us.side = la),
              (us.needsUpdate = !0),
              (cn = !0));
          }
        }
        cn === !0 && (at.updateMultisampleRenderTarget(Gt), at.updateRenderTargetMipmap(Gt));
      }
      (_.setRenderTarget(we, re, Te),
        _.setClearColor(R, I),
        Ce !== void 0 && (Et.viewport = Ce),
        (_.toneMapping = De));
    }
    function Tt(X, vt, St) {
      const Et = vt.isScene === !0 ? vt.overrideMaterial : null;
      for (let wt = 0, Gt = X.length; wt < Gt; wt++) {
        const fe = X[wt],
          we = fe.object,
          re = fe.geometry,
          Te = fe.group;
        let De = fe.material;
        (De.allowOverride === !0 && Et !== null && (De = Et),
          we.layers.test(St.layers) && Zt(we, vt, St, re, De, Te));
      }
    }
    function Zt(X, vt, St, Et, wt, Gt) {
      (X.onBeforeRender(_, vt, St, Et, wt, Gt),
        X.modelViewMatrix.multiplyMatrices(St.matrixWorldInverse, X.matrixWorld),
        X.normalMatrix.getNormalMatrix(X.modelViewMatrix),
        wt.onBeforeRender(_, vt, St, Et, X, Gt),
        wt.transparent === !0 && wt.side === fi && wt.forceSinglePass === !1
          ? ((wt.side = pi),
            (wt.needsUpdate = !0),
            _.renderBufferDirect(St, vt, Et, wt, X, Gt),
            (wt.side = Rr),
            (wt.needsUpdate = !0),
            _.renderBufferDirect(St, vt, Et, wt, X, Gt),
            (wt.side = fi))
          : _.renderBufferDirect(St, vt, Et, wt, X, Gt),
        X.onAfterRender(_, vt, St, Et, wt, Gt));
    }
    function be(X, vt, St) {
      vt.isScene !== !0 && (vt = it);
      const Et = j.get(X),
        wt = g.state.lights,
        Gt = g.state.shadowsArray,
        fe = wt.state.version,
        we = lt.getParameters(X, wt.state, Gt, vt, St),
        re = lt.getProgramCacheKey(we);
      let Te = Et.programs;
      ((Et.environment = X.isMeshStandardMaterial ? vt.environment : null),
        (Et.fog = vt.fog),
        (Et.envMap = (X.isMeshStandardMaterial ? kt : Rt).get(X.envMap || Et.environment)),
        (Et.envMapRotation =
          Et.environment !== null && X.envMap === null ? vt.environmentRotation : X.envMapRotation),
        Te === void 0 && (X.addEventListener("dispose", Nt), (Te = new Map()), (Et.programs = Te)));
      let De = Te.get(re);
      if (De !== void 0) {
        if (Et.currentProgram === De && Et.lightsStateVersion === fe) return (Ze(X, we), De);
      } else
        ((we.uniforms = lt.getUniforms(X)),
          X.onBeforeCompile(we, _),
          (De = lt.acquireProgram(we, re)),
          Te.set(re, De),
          (Et.uniforms = we.uniforms));
      const Ce = Et.uniforms;
      return (
        ((!X.isShaderMaterial && !X.isRawShaderMaterial) || X.clipping === !0) &&
          (Ce.clippingPlanes = ft.uniform),
        Ze(X, we),
        (Et.needsLights = js(X)),
        (Et.lightsStateVersion = fe),
        Et.needsLights &&
          ((Ce.ambientLightColor.value = wt.state.ambient),
          (Ce.lightProbe.value = wt.state.probe),
          (Ce.directionalLights.value = wt.state.directional),
          (Ce.directionalLightShadows.value = wt.state.directionalShadow),
          (Ce.spotLights.value = wt.state.spot),
          (Ce.spotLightShadows.value = wt.state.spotShadow),
          (Ce.rectAreaLights.value = wt.state.rectArea),
          (Ce.ltc_1.value = wt.state.rectAreaLTC1),
          (Ce.ltc_2.value = wt.state.rectAreaLTC2),
          (Ce.pointLights.value = wt.state.point),
          (Ce.pointLightShadows.value = wt.state.pointShadow),
          (Ce.hemisphereLights.value = wt.state.hemi),
          (Ce.directionalShadowMap.value = wt.state.directionalShadowMap),
          (Ce.directionalShadowMatrix.value = wt.state.directionalShadowMatrix),
          (Ce.spotShadowMap.value = wt.state.spotShadowMap),
          (Ce.spotLightMatrix.value = wt.state.spotLightMatrix),
          (Ce.spotLightMap.value = wt.state.spotLightMap),
          (Ce.pointShadowMap.value = wt.state.pointShadowMap),
          (Ce.pointShadowMatrix.value = wt.state.pointShadowMatrix)),
        (Et.currentProgram = De),
        (Et.uniformsList = null),
        De
      );
    }
    function ce(X) {
      if (X.uniformsList === null) {
        const vt = X.currentProgram.getUniforms();
        X.uniformsList = h1.seqWithValue(vt.seq, X.uniforms);
      }
      return X.uniformsList;
    }
    function Ze(X, vt) {
      const St = j.get(X);
      ((St.outputColorSpace = vt.outputColorSpace),
        (St.batching = vt.batching),
        (St.batchingColor = vt.batchingColor),
        (St.instancing = vt.instancing),
        (St.instancingColor = vt.instancingColor),
        (St.instancingMorph = vt.instancingMorph),
        (St.skinning = vt.skinning),
        (St.morphTargets = vt.morphTargets),
        (St.morphNormals = vt.morphNormals),
        (St.morphColors = vt.morphColors),
        (St.morphTargetsCount = vt.morphTargetsCount),
        (St.numClippingPlanes = vt.numClippingPlanes),
        (St.numIntersection = vt.numClipIntersection),
        (St.vertexAlphas = vt.vertexAlphas),
        (St.vertexTangents = vt.vertexTangents),
        (St.toneMapping = vt.toneMapping));
    }
    function hs(X, vt, St, Et, wt) {
      (vt.isScene !== !0 && (vt = it), at.resetTextureUnits());
      const Gt = vt.fog,
        fe = Et.isMeshStandardMaterial ? vt.environment : null,
        we = b === null ? _.outputColorSpace : b.isXRRenderTarget === !0 ? b.texture.colorSpace : Ul,
        re = (Et.isMeshStandardMaterial ? kt : Rt).get(Et.envMap || fe),
        Te = Et.vertexColors === !0 && !!St.attributes.color && St.attributes.color.itemSize === 4,
        De = !!St.attributes.tangent && (!!Et.normalMap || Et.anisotropy > 0),
        Ce = !!St.morphAttributes.position,
        cn = !!St.morphAttributes.normal,
        _n = !!St.morphAttributes.color;
      let ts = R0;
      Et.toneMapped && (b === null || b.isXRRenderTarget === !0) && (ts = _.toneMapping);
      const es = St.morphAttributes.position || St.morphAttributes.normal || St.morphAttributes.color,
        Xn = es !== void 0 ? es.length : 0,
        Fe = j.get(Et),
        us = g.state.lights;
      if (mt === !0 && (nt === !0 || X !== T)) {
        const xi = X === T && Et.id === w;
        ft.setState(Et, X, xi);
      }
      let Rn = !1;
      Et.version === Fe.__version
        ? ((Fe.needsLights && Fe.lightsStateVersion !== us.state.version) ||
            Fe.outputColorSpace !== we ||
            (wt.isBatchedMesh && Fe.batching === !1) ||
            (!wt.isBatchedMesh && Fe.batching === !0) ||
            (wt.isBatchedMesh && Fe.batchingColor === !0 && wt.colorTexture === null) ||
            (wt.isBatchedMesh && Fe.batchingColor === !1 && wt.colorTexture !== null) ||
            (wt.isInstancedMesh && Fe.instancing === !1) ||
            (!wt.isInstancedMesh && Fe.instancing === !0) ||
            (wt.isSkinnedMesh && Fe.skinning === !1) ||
            (!wt.isSkinnedMesh && Fe.skinning === !0) ||
            (wt.isInstancedMesh && Fe.instancingColor === !0 && wt.instanceColor === null) ||
            (wt.isInstancedMesh && Fe.instancingColor === !1 && wt.instanceColor !== null) ||
            (wt.isInstancedMesh && Fe.instancingMorph === !0 && wt.morphTexture === null) ||
            (wt.isInstancedMesh && Fe.instancingMorph === !1 && wt.morphTexture !== null) ||
            Fe.envMap !== re ||
            (Et.fog === !0 && Fe.fog !== Gt) ||
            (Fe.numClippingPlanes !== void 0 &&
              (Fe.numClippingPlanes !== ft.numPlanes || Fe.numIntersection !== ft.numIntersection)) ||
            Fe.vertexAlphas !== Te ||
            Fe.vertexTangents !== De ||
            Fe.morphTargets !== Ce ||
            Fe.morphNormals !== cn ||
            Fe.morphColors !== _n ||
            Fe.toneMapping !== ts ||
            Fe.morphTargetsCount !== Xn) &&
          (Rn = !0)
        : ((Rn = !0), (Fe.__version = Et.version));
      let la = Fe.currentProgram;
      Rn === !0 && (la = be(Et, vt, wt));
      let Yl = !1,
        ca = !1,
        qf = !1;
      const ps = la.getUniforms(),
        ka = Fe.uniforms;
      if (
        (Z.useProgram(la.program) && ((Yl = !0), (ca = !0), (qf = !0)),
        Et.id !== w && ((w = Et.id), (ca = !0)),
        Yl || T !== X)
      ) {
        (Z.buffers.depth.getReversed() &&
          X.reversedDepth !== !0 &&
          ((X._reversedDepth = !0), X.updateProjectionMatrix()),
          ps.setValue($, "projectionMatrix", X.projectionMatrix),
          ps.setValue($, "viewMatrix", X.matrixWorldInverse));
        const Bi = ps.map.cameraPosition;
        (Bi !== void 0 && Bi.setValue($, st.setFromMatrixPosition(X.matrixWorld)),
          J.logarithmicDepthBuffer && ps.setValue($, "logDepthBufFC", 2 / (Math.log(X.far + 1) / Math.LN2)),
          (Et.isMeshPhongMaterial ||
            Et.isMeshToonMaterial ||
            Et.isMeshLambertMaterial ||
            Et.isMeshBasicMaterial ||
            Et.isMeshStandardMaterial ||
            Et.isShaderMaterial) &&
            ps.setValue($, "isOrthographic", X.isOrthographicCamera === !0),
          T !== X && ((T = X), (ca = !0), (qf = !0)));
      }
      if (wt.isSkinnedMesh) {
        (ps.setOptional($, wt, "bindMatrix"), ps.setOptional($, wt, "bindMatrixInverse"));
        const xi = wt.skeleton;
        xi &&
          (xi.boneTexture === null && xi.computeBoneTexture(),
          ps.setValue($, "boneTexture", xi.boneTexture, at));
      }
      wt.isBatchedMesh &&
        (ps.setOptional($, wt, "batchingTexture"),
        ps.setValue($, "batchingTexture", wt._matricesTexture, at),
        ps.setOptional($, wt, "batchingIdTexture"),
        ps.setValue($, "batchingIdTexture", wt._indirectTexture, at),
        ps.setOptional($, wt, "batchingColorTexture"),
        wt._colorsTexture !== null && ps.setValue($, "batchingColorTexture", wt._colorsTexture, at));
      const Sa = St.morphAttributes;
      if (
        ((Sa.position !== void 0 || Sa.normal !== void 0 || Sa.color !== void 0) && zt.update(wt, St, la),
        (ca || Fe.receiveShadow !== wt.receiveShadow) &&
          ((Fe.receiveShadow = wt.receiveShadow), ps.setValue($, "receiveShadow", wt.receiveShadow)),
        Et.isMeshGouraudMaterial &&
          Et.envMap !== null &&
          ((ka.envMap.value = re),
          (ka.flipEnvMap.value = re.isCubeTexture && re.isRenderTargetTexture === !1 ? -1 : 1)),
        Et.isMeshStandardMaterial &&
          Et.envMap === null &&
          vt.environment !== null &&
          (ka.envMapIntensity.value = vt.environmentIntensity),
        ca &&
          (ps.setValue($, "toneMappingExposure", _.toneMappingExposure),
          Fe.needsLights && gi(ka, qf),
          Gt && Et.fog === !0 && O.refreshFogUniforms(ka, Gt),
          O.refreshMaterialUniforms(ka, Et, L, F, g.state.transmissionRenderTarget[X.id]),
          h1.upload($, ce(Fe), ka, at)),
        Et.isShaderMaterial &&
          Et.uniformsNeedUpdate === !0 &&
          (h1.upload($, ce(Fe), ka, at), (Et.uniformsNeedUpdate = !1)),
        Et.isSpriteMaterial && ps.setValue($, "center", wt.center),
        ps.setValue($, "modelViewMatrix", wt.modelViewMatrix),
        ps.setValue($, "normalMatrix", wt.normalMatrix),
        ps.setValue($, "modelMatrix", wt.matrixWorld),
        Et.isShaderMaterial || Et.isRawShaderMaterial)
      ) {
        const xi = Et.uniformsGroups;
        for (let Bi = 0, qm = xi.length; Bi < qm; Bi++) {
          const V0 = xi[Bi];
          (Ie.update(V0, la), Ie.bind(V0, la));
        }
      }
      return la;
    }
    function gi(X, vt) {
      ((X.ambientLightColor.needsUpdate = vt),
        (X.lightProbe.needsUpdate = vt),
        (X.directionalLights.needsUpdate = vt),
        (X.directionalLightShadows.needsUpdate = vt),
        (X.pointLights.needsUpdate = vt),
        (X.pointLightShadows.needsUpdate = vt),
        (X.spotLights.needsUpdate = vt),
        (X.spotLightShadows.needsUpdate = vt),
        (X.rectAreaLights.needsUpdate = vt),
        (X.hemisphereLights.needsUpdate = vt));
    }
    function js(X) {
      return (
        X.isMeshLambertMaterial ||
        X.isMeshToonMaterial ||
        X.isMeshPhongMaterial ||
        X.isMeshStandardMaterial ||
        X.isShadowMaterial ||
        (X.isShaderMaterial && X.lights === !0)
      );
    }
    ((this.getActiveCubeFace = function () {
      return M;
    }),
      (this.getActiveMipmapLevel = function () {
        return S;
      }),
      (this.getRenderTarget = function () {
        return b;
      }),
      (this.setRenderTargetTextures = function (X, vt, St) {
        const Et = j.get(X);
        ((Et.__autoAllocateDepthBuffer = X.resolveDepthBuffer === !1),
          Et.__autoAllocateDepthBuffer === !1 && (Et.__useRenderToTexture = !1),
          (j.get(X.texture).__webglTexture = vt),
          (j.get(X.depthTexture).__webglTexture = Et.__autoAllocateDepthBuffer ? void 0 : St),
          (Et.__hasExternalTextures = !0));
      }),
      (this.setRenderTargetFramebuffer = function (X, vt) {
        const St = j.get(X);
        ((St.__webglFramebuffer = vt), (St.__useDefaultFramebuffer = vt === void 0));
      }));
    const qs = $.createFramebuffer();
    ((this.setRenderTarget = function (X, vt = 0, St = 0) {
      ((b = X), (M = vt), (S = St));
      let Et = !0,
        wt = null,
        Gt = !1,
        fe = !1;
      if (X) {
        const re = j.get(X);
        if (re.__useDefaultFramebuffer !== void 0) (Z.bindFramebuffer($.FRAMEBUFFER, null), (Et = !1));
        else if (re.__webglFramebuffer === void 0) at.setupRenderTarget(X);
        else if (re.__hasExternalTextures)
          at.rebindTextures(X, j.get(X.texture).__webglTexture, j.get(X.depthTexture).__webglTexture);
        else if (X.depthBuffer) {
          const Ce = X.depthTexture;
          if (re.__boundDepthTexture !== Ce) {
            if (Ce !== null && j.has(Ce) && (X.width !== Ce.image.width || X.height !== Ce.image.height))
              throw new Error(
                "WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.",
              );
            at.setupDepthRenderbuffer(X);
          }
        }
        const Te = X.texture;
        (Te.isData3DTexture || Te.isDataArrayTexture || Te.isCompressedArrayTexture) && (fe = !0);
        const De = j.get(X).__webglFramebuffer;
        (X.isWebGLCubeRenderTarget
          ? (Array.isArray(De[vt]) ? (wt = De[vt][St]) : (wt = De[vt]), (Gt = !0))
          : X.samples > 0 && at.useMultisampledRTT(X) === !1
            ? (wt = j.get(X).__webglMultisampledFramebuffer)
            : Array.isArray(De)
              ? (wt = De[St])
              : (wt = De),
          E.copy(X.viewport),
          A.copy(X.scissor),
          (C = X.scissorTest));
      } else (E.copy(q).multiplyScalar(L).floor(), A.copy(et).multiplyScalar(L).floor(), (C = ct));
      if (
        (St !== 0 && (wt = qs),
        Z.bindFramebuffer($.FRAMEBUFFER, wt) && Et && Z.drawBuffers(X, wt),
        Z.viewport(E),
        Z.scissor(A),
        Z.setScissorTest(C),
        Gt)
      ) {
        const re = j.get(X.texture);
        $.framebufferTexture2D(
          $.FRAMEBUFFER,
          $.COLOR_ATTACHMENT0,
          $.TEXTURE_CUBE_MAP_POSITIVE_X + vt,
          re.__webglTexture,
          St,
        );
      } else if (fe) {
        const re = vt;
        for (let Te = 0; Te < X.textures.length; Te++) {
          const De = j.get(X.textures[Te]);
          $.framebufferTextureLayer($.FRAMEBUFFER, $.COLOR_ATTACHMENT0 + Te, De.__webglTexture, St, re);
        }
      } else if (X !== null && St !== 0) {
        const re = j.get(X.texture);
        $.framebufferTexture2D($.FRAMEBUFFER, $.COLOR_ATTACHMENT0, $.TEXTURE_2D, re.__webglTexture, St);
      }
      w = -1;
    }),
      (this.readRenderTargetPixels = function (X, vt, St, Et, wt, Gt, fe, we = 0) {
        if (!(X && X.isWebGLRenderTarget)) {
          console.error(
            "THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.",
          );
          return;
        }
        let re = j.get(X).__webglFramebuffer;
        if ((X.isWebGLCubeRenderTarget && fe !== void 0 && (re = re[fe]), re)) {
          Z.bindFramebuffer($.FRAMEBUFFER, re);
          try {
            const Te = X.textures[we],
              De = Te.format,
              Ce = Te.type;
            if (!J.textureFormatReadable(De)) {
              console.error(
                "THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.",
              );
              return;
            }
            if (!J.textureTypeReadable(Ce)) {
              console.error(
                "THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.",
              );
              return;
            }
            vt >= 0 &&
              vt <= X.width - Et &&
              St >= 0 &&
              St <= X.height - wt &&
              (X.textures.length > 1 && $.readBuffer($.COLOR_ATTACHMENT0 + we),
              $.readPixels(vt, St, Et, wt, ue.convert(De), ue.convert(Ce), Gt));
          } finally {
            const Te = b !== null ? j.get(b).__webglFramebuffer : null;
            Z.bindFramebuffer($.FRAMEBUFFER, Te);
          }
        }
      }),
      (this.readRenderTargetPixelsAsync = async function (X, vt, St, Et, wt, Gt, fe, we = 0) {
        if (!(X && X.isWebGLRenderTarget))
          throw new Error(
            "THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.",
          );
        let re = j.get(X).__webglFramebuffer;
        if ((X.isWebGLCubeRenderTarget && fe !== void 0 && (re = re[fe]), re))
          if (vt >= 0 && vt <= X.width - Et && St >= 0 && St <= X.height - wt) {
            Z.bindFramebuffer($.FRAMEBUFFER, re);
            const Te = X.textures[we],
              De = Te.format,
              Ce = Te.type;
            if (!J.textureFormatReadable(De))
              throw new Error(
                "THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.",
              );
            if (!J.textureTypeReadable(Ce))
              throw new Error(
                "THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.",
              );
            const cn = $.createBuffer();
            ($.bindBuffer($.PIXEL_PACK_BUFFER, cn),
              $.bufferData($.PIXEL_PACK_BUFFER, Gt.byteLength, $.STREAM_READ),
              X.textures.length > 1 && $.readBuffer($.COLOR_ATTACHMENT0 + we),
              $.readPixels(vt, St, Et, wt, ue.convert(De), ue.convert(Ce), 0));
            const _n = b !== null ? j.get(b).__webglFramebuffer : null;
            Z.bindFramebuffer($.FRAMEBUFFER, _n);
            const ts = $.fenceSync($.SYNC_GPU_COMMANDS_COMPLETE, 0);
            return (
              $.flush(),
              await _7($, ts, 4),
              $.bindBuffer($.PIXEL_PACK_BUFFER, cn),
              $.getBufferSubData($.PIXEL_PACK_BUFFER, 0, Gt),
              $.deleteBuffer(cn),
              $.deleteSync(ts),
              Gt
            );
          } else
            throw new Error(
              "THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.",
            );
      }),
      (this.copyFramebufferToTexture = function (X, vt = null, St = 0) {
        const Et = Math.pow(2, -St),
          wt = Math.floor(X.image.width * Et),
          Gt = Math.floor(X.image.height * Et),
          fe = vt !== null ? vt.x : 0,
          we = vt !== null ? vt.y : 0;
        (at.setTexture2D(X, 0),
          $.copyTexSubImage2D($.TEXTURE_2D, St, 0, 0, fe, we, wt, Gt),
          Z.unbindTexture());
      }));
    const Re = $.createFramebuffer(),
      Oe = $.createFramebuffer();
    ((this.copyTextureToTexture = function (X, vt, St = null, Et = null, wt = 0, Gt = null) {
      Gt === null &&
        (wt !== 0
          ? (bh(
              "WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels.",
            ),
            (Gt = wt),
            (wt = 0))
          : (Gt = 0));
      let fe, we, re, Te, De, Ce, cn, _n, ts;
      const es = X.isCompressedTexture ? X.mipmaps[Gt] : X.image;
      if (St !== null)
        ((fe = St.max.x - St.min.x),
          (we = St.max.y - St.min.y),
          (re = St.isBox3 ? St.max.z - St.min.z : 1),
          (Te = St.min.x),
          (De = St.min.y),
          (Ce = St.isBox3 ? St.min.z : 0));
      else {
        const Sa = Math.pow(2, -wt);
        ((fe = Math.floor(es.width * Sa)),
          (we = Math.floor(es.height * Sa)),
          X.isDataArrayTexture
            ? (re = es.depth)
            : X.isData3DTexture
              ? (re = Math.floor(es.depth * Sa))
              : (re = 1),
          (Te = 0),
          (De = 0),
          (Ce = 0));
      }
      Et !== null ? ((cn = Et.x), (_n = Et.y), (ts = Et.z)) : ((cn = 0), (_n = 0), (ts = 0));
      const Xn = ue.convert(vt.format),
        Fe = ue.convert(vt.type);
      let us;
      (vt.isData3DTexture
        ? (at.setTexture3D(vt, 0), (us = $.TEXTURE_3D))
        : vt.isDataArrayTexture || vt.isCompressedArrayTexture
          ? (at.setTexture2DArray(vt, 0), (us = $.TEXTURE_2D_ARRAY))
          : (at.setTexture2D(vt, 0), (us = $.TEXTURE_2D)),
        $.pixelStorei($.UNPACK_FLIP_Y_WEBGL, vt.flipY),
        $.pixelStorei($.UNPACK_PREMULTIPLY_ALPHA_WEBGL, vt.premultiplyAlpha),
        $.pixelStorei($.UNPACK_ALIGNMENT, vt.unpackAlignment));
      const Rn = $.getParameter($.UNPACK_ROW_LENGTH),
        la = $.getParameter($.UNPACK_IMAGE_HEIGHT),
        Yl = $.getParameter($.UNPACK_SKIP_PIXELS),
        ca = $.getParameter($.UNPACK_SKIP_ROWS),
        qf = $.getParameter($.UNPACK_SKIP_IMAGES);
      ($.pixelStorei($.UNPACK_ROW_LENGTH, es.width),
        $.pixelStorei($.UNPACK_IMAGE_HEIGHT, es.height),
        $.pixelStorei($.UNPACK_SKIP_PIXELS, Te),
        $.pixelStorei($.UNPACK_SKIP_ROWS, De),
        $.pixelStorei($.UNPACK_SKIP_IMAGES, Ce));
      const ps = X.isDataArrayTexture || X.isData3DTexture,
        ka = vt.isDataArrayTexture || vt.isData3DTexture;
      if (X.isDepthTexture) {
        const Sa = j.get(X),
          xi = j.get(vt),
          Bi = j.get(Sa.__renderTarget),
          qm = j.get(xi.__renderTarget);
        (Z.bindFramebuffer($.READ_FRAMEBUFFER, Bi.__webglFramebuffer),
          Z.bindFramebuffer($.DRAW_FRAMEBUFFER, qm.__webglFramebuffer));
        for (let V0 = 0; V0 < re; V0++)
          (ps &&
            ($.framebufferTextureLayer(
              $.READ_FRAMEBUFFER,
              $.COLOR_ATTACHMENT0,
              j.get(X).__webglTexture,
              wt,
              Ce + V0,
            ),
            $.framebufferTextureLayer(
              $.DRAW_FRAMEBUFFER,
              $.COLOR_ATTACHMENT0,
              j.get(vt).__webglTexture,
              Gt,
              ts + V0,
            )),
            $.blitFramebuffer(Te, De, fe, we, cn, _n, fe, we, $.DEPTH_BUFFER_BIT, $.NEAREST));
        (Z.bindFramebuffer($.READ_FRAMEBUFFER, null), Z.bindFramebuffer($.DRAW_FRAMEBUFFER, null));
      } else if (wt !== 0 || X.isRenderTargetTexture || j.has(X)) {
        const Sa = j.get(X),
          xi = j.get(vt);
        (Z.bindFramebuffer($.READ_FRAMEBUFFER, Re), Z.bindFramebuffer($.DRAW_FRAMEBUFFER, Oe));
        for (let Bi = 0; Bi < re; Bi++)
          (ps
            ? $.framebufferTextureLayer(
                $.READ_FRAMEBUFFER,
                $.COLOR_ATTACHMENT0,
                Sa.__webglTexture,
                wt,
                Ce + Bi,
              )
            : $.framebufferTexture2D(
                $.READ_FRAMEBUFFER,
                $.COLOR_ATTACHMENT0,
                $.TEXTURE_2D,
                Sa.__webglTexture,
                wt,
              ),
            ka
              ? $.framebufferTextureLayer(
                  $.DRAW_FRAMEBUFFER,
                  $.COLOR_ATTACHMENT0,
                  xi.__webglTexture,
                  Gt,
                  ts + Bi,
                )
              : $.framebufferTexture2D(
                  $.DRAW_FRAMEBUFFER,
                  $.COLOR_ATTACHMENT0,
                  $.TEXTURE_2D,
                  xi.__webglTexture,
                  Gt,
                ),
            wt !== 0
              ? $.blitFramebuffer(Te, De, fe, we, cn, _n, fe, we, $.COLOR_BUFFER_BIT, $.NEAREST)
              : ka
                ? $.copyTexSubImage3D(us, Gt, cn, _n, ts + Bi, Te, De, fe, we)
                : $.copyTexSubImage2D(us, Gt, cn, _n, Te, De, fe, we));
        (Z.bindFramebuffer($.READ_FRAMEBUFFER, null), Z.bindFramebuffer($.DRAW_FRAMEBUFFER, null));
      } else
        ka
          ? X.isDataTexture || X.isData3DTexture
            ? $.texSubImage3D(us, Gt, cn, _n, ts, fe, we, re, Xn, Fe, es.data)
            : vt.isCompressedArrayTexture
              ? $.compressedTexSubImage3D(us, Gt, cn, _n, ts, fe, we, re, Xn, es.data)
              : $.texSubImage3D(us, Gt, cn, _n, ts, fe, we, re, Xn, Fe, es)
          : X.isDataTexture
            ? $.texSubImage2D($.TEXTURE_2D, Gt, cn, _n, fe, we, Xn, Fe, es.data)
            : X.isCompressedTexture
              ? $.compressedTexSubImage2D($.TEXTURE_2D, Gt, cn, _n, es.width, es.height, Xn, es.data)
              : $.texSubImage2D($.TEXTURE_2D, Gt, cn, _n, fe, we, Xn, Fe, es);
      ($.pixelStorei($.UNPACK_ROW_LENGTH, Rn),
        $.pixelStorei($.UNPACK_IMAGE_HEIGHT, la),
        $.pixelStorei($.UNPACK_SKIP_PIXELS, Yl),
        $.pixelStorei($.UNPACK_SKIP_ROWS, ca),
        $.pixelStorei($.UNPACK_SKIP_IMAGES, qf),
        Gt === 0 && vt.generateMipmaps && $.generateMipmap(us),
        Z.unbindTexture());
    }),
      (this.initRenderTarget = function (X) {
        j.get(X).__webglFramebuffer === void 0 && at.setupRenderTarget(X);
      }),
      (this.initTexture = function (X) {
        (X.isCubeTexture
          ? at.setTextureCube(X, 0)
          : X.isData3DTexture
            ? at.setTexture3D(X, 0)
            : X.isDataArrayTexture || X.isCompressedArrayTexture
              ? at.setTexture2DArray(X, 0)
              : at.setTexture2D(X, 0),
          Z.unbindTexture());
      }),
      (this.resetState = function () {
        ((M = 0), (S = 0), (b = null), Z.reset(), Kt.reset());
      }),
      typeof __THREE_DEVTOOLS__ < "u" &&
        __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this })));
  }
  get coordinateSystem() {
    return Uo;
  }
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(t) {
    this._outputColorSpace = t;
    const e = this.getContext();
    ((e.drawingBufferColorSpace = In._getDrawingBufferColorSpace(t)),
      (e.unpackColorSpace = In._getUnpackColorSpace()));
  }
}

const Yt = {
    blue: {
      main: 4165631,
      light: 11064575,
      dark: 1916826,
      glow: 3713279,
      stone: 12832224,
      stoneDark: 8688822,
      trim: 15251530,
      plaza: 9413318,
    },
    red: {
      main: 16730942,
      light: 16756890,
      dark: 9314076,
      glow: 16734774,
      stone: 5917264,
      stoneDark: 3024169,
      trim: 15768124,
      plaza: 5917264,
    },
    neutral: {
      main: 14861930,
      light: 16773296,
      dark: 8020528,
      glow: 16767088,
      stone: 10133672,
      stoneDark: 6054508,
      trim: 14206608,
      plaza: 9210504,
    },
    player: {
      main: 11992924,
      light: 15138736,
      dark: 5213980,
      glow: 14221178,
      stone: 15133685,
      stoneDark: 11122383,
      trim: 15777872,
      plaza: 9413318,
    },
    env: {
      sun: 16770740,
      sky: 11981055,
      bounce: 12758660,
      fog: 13624048,
      haze: 14149365,
      horizon: 14676479,
      zenith: 6269166,
      cloud: 16777215,
      cloudShade: 11125990,
      grass: 7314762,
      grassWarm: 10728536,
      grassCool: 5214050,
      grassDark: 4026438,
      cliffGrass: 5935440,
      cliffGrassLight: 7313998,
      lane: 12628109,
      laneAlt: 11576722,
      laneDark: 9730127,
      laneGrout: 7232068,
      dirt: 9073488,
      dirtDark: 7232068,
      sand: 13287318,
      rock: 8354950,
      rockDark: 5986920,
      rockLight: 11117471,
      rockWarm: 13221798,
      moss: 5933650,
      waterShallow: 8380630,
      water: 3123140,
      waterDeep: 1798044,
      foam: 15925243,
      caustic: 13172720,
      reed: 9416266,
      reedTip: 14277002,
      reedDark: 5077548,
      canopy: 4165470,
      canopyLight: 10276698,
      canopyDark: 2056012,
      trunk: 7228732,
      crystal: 3523839,
      crystalDeep: 5926143,
      starGold: 16766586,
      ember: 16742972,
      frost: 7327999,
      abyss: 10514687,
      amber: 16757575,
      glowCyan: 6285512,
      violet: 10779903,
      petalWhite: 16774112,
      petalPink: 16765408,
      outline: 1778227,
      shadeUnit: 12898559,
      shadeRock: 15133183,
      rimWarm: 16771524,
      kickCool: 12575487,
    },
  },
  aL = 0.45,
  yl = 64,
  BM = 1.6,
  HM = (() => {
    const n = new zr(new Uint8Array([0, 0, 0, 255]), 1, 1, Gs, mi);
    return (
      (n.name = "moba.lightTint.neutral"),
      (n.colorSpace = Ki),
      (n.minFilter = n.magFilter = ti),
      (n.generateMipmaps = !1),
      (n.needsUpdate = !0),
      n
    );
  })(),
  fs = {
    uTime: { value: 0 },
    uWind: { value: new kn(0.82, -0.57, 1, 1) },
    uShadeTint: { value: new Ut(Yt.env.shadeUnit) },
    uShadeTintGround: { value: new Ut().setRGB(1, 0.95, 1.1) },
    uKickDir: { value: new Ee(0.78, 0.62).normalize() },
    uKickColor: { value: new Ut(Yt.env.kickCool).multiplyScalar(1.15) },
    tLightTint: { value: HM },
  };

function nb(n) {
  fs.tLightTint.value = n ?? HM;
}

function oL(n) {
  fs.uTime.value += Math.min(n, 0.1);
}

const rL = iM,
  k0 = { contrast: 1.08, pivot: 0.42, saturation: 1.06, vibrance: 0.07 },
  lL = `vec3 CustomToneMapping( vec3 color ) {
	const float StartCompression = 0.76;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak >= StartCompression ) {
		float d = 1.0 - StartCompression;
		float newPeak = 1.0 - d * d / ( peak + d - StartCompression );
		color *= newPeak / peak;
		float g = 1.0 - 1.0 / ( Desaturation * ( peak - newPeak ) + 1.0 );
		color = mix( color, vec3( newPeak ), g );
	}
	#ifdef TONE_MAPPING
	// 只有直出屏幕的材质定义了 TONE_MAPPING：把基础调色并进来(走后期时由 FinalPass 调色)
	const float Pivot = ${Math.pow(k0.pivot, 2.2).toFixed(4)};
	color = Pivot * pow( max( color, vec3( 0.0 ) ) / Pivot, vec3( ${k0.contrast.toFixed(3)} ) );
	float l = dot( color, vec3( 0.2126, 0.7152, 0.0722 ) );
	float mx = max( color.r, max( color.g, color.b ) );
	float mn = min( color.r, min( color.g, color.b ) );
	color = max( mix( vec3( l ), color, ${k0.saturation.toFixed(3)} + ${k0.vibrance.toFixed(3)} * ( 1.0 - ( mx - mn ) / max( mx, 1e-4 ) ) ), vec3( 0.0 ) );
	#endif
	return color;
}`;

function $M() {
  const n = tn.tonemapping_pars_fragment;
  if (n.includes("StartCompression = 0.76")) return;
  const t = "vec3 CustomToneMapping( vec3 color ) { return color; }";
  n.includes(t)
    ? (tn.tonemapping_pars_fragment = n.replace(t, lL))
    : console.warn("[moba] 未找到 CustomToneMapping 的默认实现，色调映射未安装");
}

$M();

let ke = class {
  s;
  constructor(t) {
    this.s = t >>> 0 || 1;
  }
  next() {
    this.s = (this.s + 1831565813) >>> 0;
    let t = this.s;
    return (
      (t = Math.imul(t ^ (t >>> 15), t | 1)),
      (t ^= t + Math.imul(t ^ (t >>> 7), t | 61)),
      ((t ^ (t >>> 14)) >>> 0) / 4294967296
    );
  }
  range(t, e) {
    return t + (e - t) * this.next();
  }
  int(t) {
    return Math.floor(this.next() * t);
  }
  pick(t) {
    return t[this.int(t.length)];
  }
  chance(t) {
    return this.next() < t;
  }
  gauss() {
    return (this.next() + this.next() + this.next()) / 1.5 - 1;
  }
};

function nn(n, t, e = 0) {
  let s = (Math.imul(n | 0, 374761393) + Math.imul(t | 0, 668265263) + Math.imul(e | 0, 2147483647)) | 0;
  return ((s = Math.imul(s ^ (s >>> 13), 1274126177)), (s ^= s >>> 16), (s >>> 0) / 4294967296);
}

const sb = (n) => n * n * (3 - 2 * n);

function u1(n, t, e = 0, s = 0, i = s) {
  const a = Math.floor(n),
    o = Math.floor(t),
    r = sb(n - a),
    l = sb(t - o),
    c = (x) => (s > 0 ? ((x % s) + s) % s : x),
    f = (x) => (i > 0 ? ((x % i) + i) % i : x),
    d = nn(c(a), f(o), e),
    h = nn(c(a + 1), f(o), e),
    u = nn(c(a), f(o + 1), e),
    m = nn(c(a + 1), f(o + 1), e);
  return d + (h - d) * r + (u - d) * l + (d - h - u + m) * r * l;
}

function un(n, t, e = 4, s = 0, i = 0, a = i) {
  let o = 0.5,
    r = 0,
    l = 0,
    c = 1;
  for (let f = 0; f < e; f++)
    ((r += o * u1(n * c, t * c, s + f * 17, i > 0 ? i * c : 0, a > 0 ? a * c : 0)),
      (l += o),
      (o *= 0.5),
      (c *= 2));
  return r / l;
}

function GM(n, t) {
  const e = t.repeat ?? !0;
  ((n.wrapS = n.wrapT = e ? mh : co), (n.colorSpace = (t.srgb ?? !0) ? ri : Ki));
  const s = t.mipmaps ?? !0;
  ((n.generateMipmaps = s),
    (n.minFilter = t.nearest ? ti : s ? Fo : Ns),
    (n.magFilter = t.nearest ? ti : Ns),
    (n.anisotropy = t.anisotropy ?? 4),
    (n.needsUpdate = !0));
}

function fx(n, t, e, s = {}) {
  const i = document.createElement("canvas");
  ((i.width = n), (i.height = t));
  const a = i.getContext("2d", { willReadFrequently: !1 });
  if (!a) throw new Error("2D canvas 不可用");
  e(a, n, t);
  const o = new Z7(i);
  return (GM(o, s), o);
}

function nh(n, t, e, s, i) {
  for (let a = -1; a <= 1; a++)
    for (let o = -1; o <= 1; o++) {
      const r = t + o * n,
        l = e + a * n;
      r + s < 0 || r - s > n || l + s < 0 || l - s > n || i(r, l);
    }
}
export { cx, Yt, aL, yl, BM, fs, nb, oL, rL, k0, $M, ke, nn, u1, un, GM, fx, nh };
