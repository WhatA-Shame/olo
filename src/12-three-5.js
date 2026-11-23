// 12-three-5.js — three｜16 个顶层语句｜37KB
// 对应 game.pretty.js 第 22639–23901 行
// 关键内容：
//   OC                    DirectionalLight
//   BC                    DirectionalLight
//   GC                    OES_texture_float_linear
//   qC                    position
//   YC                    EXT_clip_control
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { $T, BT, Cr, Ee, FT, Fh, GT, HT, JT, Jy, KT, Kc, NT, OT, QT, Rr, Sr, UT, V3, VT, WT, XT, YT, ZT, b0, c7, cf, ev, fi, g5, h5, jT, m5, mo, p5, ph, pi, pr, qT, ti, tv, u5, v5, x5, y5 } from './04-audio-2.js';
import { dt, go, kn } from './05-three.js';
import { Ke, Ut } from './06-three-2.js';
import { An, Bn, On, Sn, pm } from './07-three-3.js';
import { xE, yE } from './08-three-4.js';
import { ee } from './10-render-2.js';

function NC() {
  let n = new WeakMap();
  function t(o) {
    return n.has(o);
  }
  function e(o) {
    let r = n.get(o);
    return (r === void 0 && ((r = {}), n.set(o, r)), r);
  }
  function s(o) {
    n.delete(o);
  }
  function i(o, r, l) {
    n.get(o)[r] = l;
  }
  function a() {
    n = new WeakMap();
  }
  return { has: t, get: e, remove: s, update: i, dispose: a };
}

function FC(n, t) {
  return n.groupOrder !== t.groupOrder
    ? n.groupOrder - t.groupOrder
    : n.renderOrder !== t.renderOrder
      ? n.renderOrder - t.renderOrder
      : n.material.id !== t.material.id
        ? n.material.id - t.material.id
        : n.z !== t.z
          ? n.z - t.z
          : n.id - t.id;
}

function Jv(n, t) {
  return n.groupOrder !== t.groupOrder
    ? n.groupOrder - t.groupOrder
    : n.renderOrder !== t.renderOrder
      ? n.renderOrder - t.renderOrder
      : n.z !== t.z
        ? t.z - n.z
        : n.id - t.id;
}

function tb() {
  const n = [];
  let t = 0;
  const e = [],
    s = [],
    i = [];
  function a() {
    ((t = 0), (e.length = 0), (s.length = 0), (i.length = 0));
  }
  function o(d, h, u, m, x, p) {
    let g = n[t];
    return (
      g === void 0
        ? ((g = {
            id: d.id,
            object: d,
            geometry: h,
            material: u,
            groupOrder: m,
            renderOrder: d.renderOrder,
            z: x,
            group: p,
          }),
          (n[t] = g))
        : ((g.id = d.id),
          (g.object = d),
          (g.geometry = h),
          (g.material = u),
          (g.groupOrder = m),
          (g.renderOrder = d.renderOrder),
          (g.z = x),
          (g.group = p)),
      t++,
      g
    );
  }
  function r(d, h, u, m, x, p) {
    const g = o(d, h, u, m, x, p);
    u.transmission > 0 ? s.push(g) : u.transparent === !0 ? i.push(g) : e.push(g);
  }
  function l(d, h, u, m, x, p) {
    const g = o(d, h, u, m, x, p);
    u.transmission > 0 ? s.unshift(g) : u.transparent === !0 ? i.unshift(g) : e.unshift(g);
  }
  function c(d, h) {
    (e.length > 1 && e.sort(d || FC), s.length > 1 && s.sort(h || Jv), i.length > 1 && i.sort(h || Jv));
  }
  function f() {
    for (let d = t, h = n.length; d < h; d++) {
      const u = n[d];
      if (u.id === null) break;
      ((u.id = null), (u.object = null), (u.geometry = null), (u.material = null), (u.group = null));
    }
  }
  return { opaque: e, transmissive: s, transparent: i, init: a, push: r, unshift: l, finish: f, sort: c };
}

function UC() {
  let n = new WeakMap();
  function t(s, i) {
    const a = n.get(s);
    let o;
    return (
      a === void 0
        ? ((o = new tb()), n.set(s, [o]))
        : i >= a.length
          ? ((o = new tb()), a.push(o))
          : (o = a[i]),
      o
    );
  }
  function e() {
    n = new WeakMap();
  }
  return { get: t, dispose: e };
}

function OC() {
  const n = {};
  return {
    get: function (t) {
      if (n[t.id] !== void 0) return n[t.id];
      let e;
      switch (t.type) {
        case "DirectionalLight":
          e = { direction: new dt(), color: new Ut() };
          break;
        case "SpotLight":
          e = {
            position: new dt(),
            direction: new dt(),
            color: new Ut(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0,
          };
          break;
        case "PointLight":
          e = { position: new dt(), color: new Ut(), distance: 0, decay: 0 };
          break;
        case "HemisphereLight":
          e = { direction: new dt(), skyColor: new Ut(), groundColor: new Ut() };
          break;
        case "RectAreaLight":
          e = { color: new Ut(), position: new dt(), halfWidth: new dt(), halfHeight: new dt() };
          break;
      }
      return ((n[t.id] = e), e);
    },
  };
}

function BC() {
  const n = {};
  return {
    get: function (t) {
      if (n[t.id] !== void 0) return n[t.id];
      let e;
      switch (t.type) {
        case "DirectionalLight":
          e = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Ee(),
          };
          break;
        case "SpotLight":
          e = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Ee(),
          };
          break;
        case "PointLight":
          e = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Ee(),
            shadowCameraNear: 1,
            shadowCameraFar: 1e3,
          };
          break;
      }
      return ((n[t.id] = e), e);
    },
  };
}

let HC = 0;

function $C(n, t) {
  return (t.castShadow ? 2 : 0) - (n.castShadow ? 2 : 0) + (t.map ? 1 : 0) - (n.map ? 1 : 0);
}

function GC(n) {
  const t = new OC(),
    e = BC(),
    s = {
      version: 0,
      hash: {
        directionalLength: -1,
        pointLength: -1,
        spotLength: -1,
        rectAreaLength: -1,
        hemiLength: -1,
        numDirectionalShadows: -1,
        numPointShadows: -1,
        numSpotShadows: -1,
        numSpotMaps: -1,
        numLightProbes: -1,
      },
      ambient: [0, 0, 0],
      probe: [],
      directional: [],
      directionalShadow: [],
      directionalShadowMap: [],
      directionalShadowMatrix: [],
      spot: [],
      spotLightMap: [],
      spotShadow: [],
      spotShadowMap: [],
      spotLightMatrix: [],
      rectArea: [],
      rectAreaLTC1: null,
      rectAreaLTC2: null,
      point: [],
      pointShadow: [],
      pointShadowMap: [],
      pointShadowMatrix: [],
      hemi: [],
      numSpotLightShadowsWithMaps: 0,
      numLightProbes: 0,
    };
  for (let c = 0; c < 9; c++) s.probe.push(new dt());
  const i = new dt(),
    a = new Ke(),
    o = new Ke();
  function r(c) {
    let f = 0,
      d = 0,
      h = 0;
    for (let w = 0; w < 9; w++) s.probe[w].set(0, 0, 0);
    let u = 0,
      m = 0,
      x = 0,
      p = 0,
      g = 0,
      y = 0,
      v = 0,
      _ = 0,
      k = 0,
      M = 0,
      S = 0;
    c.sort($C);
    for (let w = 0, T = c.length; w < T; w++) {
      const E = c[w],
        A = E.color,
        C = E.intensity,
        R = E.distance,
        I = E.shadow && E.shadow.map ? E.shadow.map.texture : null;
      if (E.isAmbientLight) ((f += A.r * C), (d += A.g * C), (h += A.b * C));
      else if (E.isLightProbe) {
        for (let P = 0; P < 9; P++) s.probe[P].addScaledVector(E.sh.coefficients[P], C);
        S++;
      } else if (E.isDirectionalLight) {
        const P = t.get(E);
        if ((P.color.copy(E.color).multiplyScalar(E.intensity), E.castShadow)) {
          const F = E.shadow,
            L = e.get(E);
          ((L.shadowIntensity = F.intensity),
            (L.shadowBias = F.bias),
            (L.shadowNormalBias = F.normalBias),
            (L.shadowRadius = F.radius),
            (L.shadowMapSize = F.mapSize),
            (s.directionalShadow[u] = L),
            (s.directionalShadowMap[u] = I),
            (s.directionalShadowMatrix[u] = E.shadow.matrix),
            y++);
        }
        ((s.directional[u] = P), u++);
      } else if (E.isSpotLight) {
        const P = t.get(E);
        (P.position.setFromMatrixPosition(E.matrixWorld),
          P.color.copy(A).multiplyScalar(C),
          (P.distance = R),
          (P.coneCos = Math.cos(E.angle)),
          (P.penumbraCos = Math.cos(E.angle * (1 - E.penumbra))),
          (P.decay = E.decay),
          (s.spot[x] = P));
        const F = E.shadow;
        if (
          (E.map && ((s.spotLightMap[k] = E.map), k++, F.updateMatrices(E), E.castShadow && M++),
          (s.spotLightMatrix[x] = F.matrix),
          E.castShadow)
        ) {
          const L = e.get(E);
          ((L.shadowIntensity = F.intensity),
            (L.shadowBias = F.bias),
            (L.shadowNormalBias = F.normalBias),
            (L.shadowRadius = F.radius),
            (L.shadowMapSize = F.mapSize),
            (s.spotShadow[x] = L),
            (s.spotShadowMap[x] = I),
            _++);
        }
        x++;
      } else if (E.isRectAreaLight) {
        const P = t.get(E);
        (P.color.copy(A).multiplyScalar(C),
          P.halfWidth.set(E.width * 0.5, 0, 0),
          P.halfHeight.set(0, E.height * 0.5, 0),
          (s.rectArea[p] = P),
          p++);
      } else if (E.isPointLight) {
        const P = t.get(E);
        if (
          (P.color.copy(E.color).multiplyScalar(E.intensity),
          (P.distance = E.distance),
          (P.decay = E.decay),
          E.castShadow)
        ) {
          const F = E.shadow,
            L = e.get(E);
          ((L.shadowIntensity = F.intensity),
            (L.shadowBias = F.bias),
            (L.shadowNormalBias = F.normalBias),
            (L.shadowRadius = F.radius),
            (L.shadowMapSize = F.mapSize),
            (L.shadowCameraNear = F.camera.near),
            (L.shadowCameraFar = F.camera.far),
            (s.pointShadow[m] = L),
            (s.pointShadowMap[m] = I),
            (s.pointShadowMatrix[m] = E.shadow.matrix),
            v++);
        }
        ((s.point[m] = P), m++);
      } else if (E.isHemisphereLight) {
        const P = t.get(E);
        (P.skyColor.copy(E.color).multiplyScalar(C),
          P.groundColor.copy(E.groundColor).multiplyScalar(C),
          (s.hemi[g] = P),
          g++);
      }
    }
    (p > 0 &&
      (n.has("OES_texture_float_linear") === !0
        ? ((s.rectAreaLTC1 = ee.LTC_FLOAT_1), (s.rectAreaLTC2 = ee.LTC_FLOAT_2))
        : ((s.rectAreaLTC1 = ee.LTC_HALF_1), (s.rectAreaLTC2 = ee.LTC_HALF_2))),
      (s.ambient[0] = f),
      (s.ambient[1] = d),
      (s.ambient[2] = h));
    const b = s.hash;
    (b.directionalLength !== u ||
      b.pointLength !== m ||
      b.spotLength !== x ||
      b.rectAreaLength !== p ||
      b.hemiLength !== g ||
      b.numDirectionalShadows !== y ||
      b.numPointShadows !== v ||
      b.numSpotShadows !== _ ||
      b.numSpotMaps !== k ||
      b.numLightProbes !== S) &&
      ((s.directional.length = u),
      (s.spot.length = x),
      (s.rectArea.length = p),
      (s.point.length = m),
      (s.hemi.length = g),
      (s.directionalShadow.length = y),
      (s.directionalShadowMap.length = y),
      (s.pointShadow.length = v),
      (s.pointShadowMap.length = v),
      (s.spotShadow.length = _),
      (s.spotShadowMap.length = _),
      (s.directionalShadowMatrix.length = y),
      (s.pointShadowMatrix.length = v),
      (s.spotLightMatrix.length = _ + k - M),
      (s.spotLightMap.length = k),
      (s.numSpotLightShadowsWithMaps = M),
      (s.numLightProbes = S),
      (b.directionalLength = u),
      (b.pointLength = m),
      (b.spotLength = x),
      (b.rectAreaLength = p),
      (b.hemiLength = g),
      (b.numDirectionalShadows = y),
      (b.numPointShadows = v),
      (b.numSpotShadows = _),
      (b.numSpotMaps = k),
      (b.numLightProbes = S),
      (s.version = HC++));
  }
  function l(c, f) {
    let d = 0,
      h = 0,
      u = 0,
      m = 0,
      x = 0;
    const p = f.matrixWorldInverse;
    for (let g = 0, y = c.length; g < y; g++) {
      const v = c[g];
      if (v.isDirectionalLight) {
        const _ = s.directional[d];
        (_.direction.setFromMatrixPosition(v.matrixWorld),
          i.setFromMatrixPosition(v.target.matrixWorld),
          _.direction.sub(i),
          _.direction.transformDirection(p),
          d++);
      } else if (v.isSpotLight) {
        const _ = s.spot[u];
        (_.position.setFromMatrixPosition(v.matrixWorld),
          _.position.applyMatrix4(p),
          _.direction.setFromMatrixPosition(v.matrixWorld),
          i.setFromMatrixPosition(v.target.matrixWorld),
          _.direction.sub(i),
          _.direction.transformDirection(p),
          u++);
      } else if (v.isRectAreaLight) {
        const _ = s.rectArea[m];
        (_.position.setFromMatrixPosition(v.matrixWorld),
          _.position.applyMatrix4(p),
          o.identity(),
          a.copy(v.matrixWorld),
          a.premultiply(p),
          o.extractRotation(a),
          _.halfWidth.set(v.width * 0.5, 0, 0),
          _.halfHeight.set(0, v.height * 0.5, 0),
          _.halfWidth.applyMatrix4(o),
          _.halfHeight.applyMatrix4(o),
          m++);
      } else if (v.isPointLight) {
        const _ = s.point[h];
        (_.position.setFromMatrixPosition(v.matrixWorld), _.position.applyMatrix4(p), h++);
      } else if (v.isHemisphereLight) {
        const _ = s.hemi[x];
        (_.direction.setFromMatrixPosition(v.matrixWorld), _.direction.transformDirection(p), x++);
      }
    }
  }
  return { setup: r, setupView: l, state: s };
}

function eb(n) {
  const t = new GC(n),
    e = [],
    s = [];
  function i(f) {
    ((c.camera = f), (e.length = 0), (s.length = 0));
  }
  function a(f) {
    e.push(f);
  }
  function o(f) {
    s.push(f);
  }
  function r() {
    t.setup(e);
  }
  function l(f) {
    t.setupView(e, f);
  }
  const c = { lightsArray: e, shadowsArray: s, camera: null, lights: t, transmissionRenderTarget: {} };
  return { init: i, state: c, setupLights: r, setupLightsView: l, pushLight: a, pushShadow: o };
}

function VC(n) {
  let t = new WeakMap();
  function e(i, a = 0) {
    const o = t.get(i);
    let r;
    return (
      o === void 0
        ? ((r = new eb(n)), t.set(i, [r]))
        : a >= o.length
          ? ((r = new eb(n)), o.push(r))
          : (r = o[a]),
      r
    );
  }
  function s() {
    t = new WeakMap();
  }
  return { get: e, dispose: s };
}

const WC = `void main() {
	gl_Position = vec4( position, 1.0 );
}`,
  jC = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;

function qC(n, t, e) {
  let s = new pm();
  const i = new Ee(),
    a = new Ee(),
    o = new kn(),
    r = new xE({ depthPacking: c7 }),
    l = new yE(),
    c = {},
    f = e.maxTextureSize,
    d = { [Rr]: pi, [pi]: Rr, [fi]: fi },
    h = new An({
      defines: { VSM_SAMPLES: 8 },
      uniforms: { shadow_pass: { value: null }, resolution: { value: new Ee() }, radius: { value: 4 } },
      vertexShader: WC,
      fragmentShader: jC,
    }),
    u = h.clone();
  u.defines.HORIZONTAL_PASS = 1;
  const m = new Bn();
  m.setAttribute("position", new On(new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]), 3));
  const x = new Sn(m, h),
    p = this;
  ((this.enabled = !1), (this.autoUpdate = !0), (this.needsUpdate = !1), (this.type = V3));
  let g = this.type;
  this.render = function (M, S, b) {
    if (p.enabled === !1 || (p.autoUpdate === !1 && p.needsUpdate === !1) || M.length === 0) return;
    const w = n.getRenderTarget(),
      T = n.getActiveCubeFace(),
      E = n.getActiveMipmapLevel(),
      A = n.state;
    (A.setBlending(Sr),
      A.buffers.depth.getReversed() === !0
        ? A.buffers.color.setClear(0, 0, 0, 0)
        : A.buffers.color.setClear(1, 1, 1, 1),
      A.buffers.depth.setTest(!0),
      A.setScissorTest(!1));
    const C = g !== pr && this.type === pr,
      R = g === pr && this.type !== pr;
    for (let I = 0, P = M.length; I < P; I++) {
      const F = M[I],
        L = F.shadow;
      if (L === void 0) {
        console.warn("THREE.WebGLShadowMap:", F, "has no shadow.");
        continue;
      }
      if (L.autoUpdate === !1 && L.needsUpdate === !1) continue;
      i.copy(L.mapSize);
      const B = L.getFrameExtents();
      if (
        (i.multiply(B),
        a.copy(L.mapSize),
        (i.x > f || i.y > f) &&
          (i.x > f && ((a.x = Math.floor(f / B.x)), (i.x = a.x * B.x), (L.mapSize.x = a.x)),
          i.y > f && ((a.y = Math.floor(f / B.y)), (i.y = a.y * B.y), (L.mapSize.y = a.y))),
        L.map === null || C === !0 || R === !0)
      ) {
        const q = this.type !== pr ? { minFilter: ti, magFilter: ti } : {};
        (L.map !== null && L.map.dispose(),
          (L.map = new go(i.x, i.y, q)),
          (L.map.texture.name = F.name + ".shadowMap"),
          L.camera.updateProjectionMatrix());
      }
      (n.setRenderTarget(L.map), n.clear());
      const G = L.getViewportCount();
      for (let q = 0; q < G; q++) {
        const et = L.getViewport(q);
        (o.set(a.x * et.x, a.y * et.y, a.x * et.z, a.y * et.w),
          A.viewport(o),
          L.updateMatrices(F, q),
          (s = L.getFrustum()),
          _(S, b, L.camera, F, this.type));
      }
      (L.isPointLightShadow !== !0 && this.type === pr && y(L, b), (L.needsUpdate = !1));
    }
    ((g = this.type), (p.needsUpdate = !1), n.setRenderTarget(w, T, E));
  };
  function y(M, S) {
    const b = t.update(x);
    (h.defines.VSM_SAMPLES !== M.blurSamples &&
      ((h.defines.VSM_SAMPLES = M.blurSamples),
      (u.defines.VSM_SAMPLES = M.blurSamples),
      (h.needsUpdate = !0),
      (u.needsUpdate = !0)),
      M.mapPass === null && (M.mapPass = new go(i.x, i.y)),
      (h.uniforms.shadow_pass.value = M.map.texture),
      (h.uniforms.resolution.value = M.mapSize),
      (h.uniforms.radius.value = M.radius),
      n.setRenderTarget(M.mapPass),
      n.clear(),
      n.renderBufferDirect(S, null, b, h, x, null),
      (u.uniforms.shadow_pass.value = M.mapPass.texture),
      (u.uniforms.resolution.value = M.mapSize),
      (u.uniforms.radius.value = M.radius),
      n.setRenderTarget(M.map),
      n.clear(),
      n.renderBufferDirect(S, null, b, u, x, null));
  }
  function v(M, S, b, w) {
    let T = null;
    const E = b.isPointLight === !0 ? M.customDistanceMaterial : M.customDepthMaterial;
    if (E !== void 0) T = E;
    else if (
      ((T = b.isPointLight === !0 ? l : r),
      (n.localClippingEnabled &&
        S.clipShadows === !0 &&
        Array.isArray(S.clippingPlanes) &&
        S.clippingPlanes.length !== 0) ||
        (S.displacementMap && S.displacementScale !== 0) ||
        (S.alphaMap && S.alphaTest > 0) ||
        (S.map && S.alphaTest > 0) ||
        S.alphaToCoverage === !0)
    ) {
      const A = T.uuid,
        C = S.uuid;
      let R = c[A];
      R === void 0 && ((R = {}), (c[A] = R));
      let I = R[C];
      (I === void 0 && ((I = T.clone()), (R[C] = I), S.addEventListener("dispose", k)), (T = I));
    }
    if (
      ((T.visible = S.visible),
      (T.wireframe = S.wireframe),
      w === pr
        ? (T.side = S.shadowSide !== null ? S.shadowSide : S.side)
        : (T.side = S.shadowSide !== null ? S.shadowSide : d[S.side]),
      (T.alphaMap = S.alphaMap),
      (T.alphaTest = S.alphaToCoverage === !0 ? 0.5 : S.alphaTest),
      (T.map = S.map),
      (T.clipShadows = S.clipShadows),
      (T.clippingPlanes = S.clippingPlanes),
      (T.clipIntersection = S.clipIntersection),
      (T.displacementMap = S.displacementMap),
      (T.displacementScale = S.displacementScale),
      (T.displacementBias = S.displacementBias),
      (T.wireframeLinewidth = S.wireframeLinewidth),
      (T.linewidth = S.linewidth),
      b.isPointLight === !0 && T.isMeshDistanceMaterial === !0)
    ) {
      const A = n.properties.get(T);
      A.light = b;
    }
    return T;
  }
  function _(M, S, b, w, T) {
    if (M.visible === !1) return;
    if (
      M.layers.test(S.layers) &&
      (M.isMesh || M.isLine || M.isPoints) &&
      (M.castShadow || (M.receiveShadow && T === pr)) &&
      (!M.frustumCulled || s.intersectsObject(M))
    ) {
      M.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse, M.matrixWorld);
      const C = t.update(M),
        R = M.material;
      if (Array.isArray(R)) {
        const I = C.groups;
        for (let P = 0, F = I.length; P < F; P++) {
          const L = I[P],
            B = R[L.materialIndex];
          if (B && B.visible) {
            const G = v(M, B, w, T);
            (M.onBeforeShadow(n, M, S, b, C, G, L),
              n.renderBufferDirect(b, null, C, G, M, L),
              M.onAfterShadow(n, M, S, b, C, G, L));
          }
        }
      } else if (R.visible) {
        const I = v(M, R, w, T);
        (M.onBeforeShadow(n, M, S, b, C, I, null),
          n.renderBufferDirect(b, null, C, I, M, null),
          M.onAfterShadow(n, M, S, b, C, I, null));
      }
    }
    const A = M.children;
    for (let C = 0, R = A.length; C < R; C++) _(A[C], S, b, w, T);
  }
  function k(M) {
    M.target.removeEventListener("dispose", k);
    for (const b in c) {
      const w = c[b],
        T = M.target.uuid;
      T in w && (w[T].dispose(), delete w[T]);
    }
  }
}

const XC = { [p5]: m5, [g5]: ph, [x5]: v5, [cf]: y5, [m5]: p5, [ph]: g5, [v5]: x5, [y5]: cf };

function YC(n, t) {
  function e() {
    let xt = !1;
    const qt = new kn();
    let te = null;
    const ve = new kn(0, 0, 0, 0);
    return {
      setMask: function (Wt) {
        te !== Wt && !xt && (n.colorMask(Wt, Wt, Wt, Wt), (te = Wt));
      },
      setLocked: function (Wt) {
        xt = Wt;
      },
      setClear: function (Wt, Nt, Me, Ue, zn) {
        (zn === !0 && ((Wt *= Ue), (Nt *= Ue), (Me *= Ue)),
          qt.set(Wt, Nt, Me, Ue),
          ve.equals(qt) === !1 && (n.clearColor(Wt, Nt, Me, Ue), ve.copy(qt)));
      },
      reset: function () {
        ((xt = !1), (te = null), ve.set(-1, 0, 0, 0));
      },
    };
  }
  function s() {
    let xt = !1,
      qt = !1,
      te = null,
      ve = null,
      Wt = null;
    return {
      setReversed: function (Nt) {
        if (qt !== Nt) {
          const Me = t.get("EXT_clip_control");
          (Nt
            ? Me.clipControlEXT(Me.LOWER_LEFT_EXT, Me.ZERO_TO_ONE_EXT)
            : Me.clipControlEXT(Me.LOWER_LEFT_EXT, Me.NEGATIVE_ONE_TO_ONE_EXT),
            (qt = Nt));
          const Ue = Wt;
          ((Wt = null), this.setClear(Ue));
        }
      },
      getReversed: function () {
        return qt;
      },
      setTest: function (Nt) {
        Nt ? H(n.DEPTH_TEST) : st(n.DEPTH_TEST);
      },
      setMask: function (Nt) {
        te !== Nt && !xt && (n.depthMask(Nt), (te = Nt));
      },
      setFunc: function (Nt) {
        if ((qt && (Nt = XC[Nt]), ve !== Nt)) {
          switch (Nt) {
            case p5:
              n.depthFunc(n.NEVER);
              break;
            case m5:
              n.depthFunc(n.ALWAYS);
              break;
            case g5:
              n.depthFunc(n.LESS);
              break;
            case cf:
              n.depthFunc(n.LEQUAL);
              break;
            case x5:
              n.depthFunc(n.EQUAL);
              break;
            case y5:
              n.depthFunc(n.GEQUAL);
              break;
            case ph:
              n.depthFunc(n.GREATER);
              break;
            case v5:
              n.depthFunc(n.NOTEQUAL);
              break;
            default:
              n.depthFunc(n.LEQUAL);
          }
          ve = Nt;
        }
      },
      setLocked: function (Nt) {
        xt = Nt;
      },
      setClear: function (Nt) {
        Wt !== Nt && (qt && (Nt = 1 - Nt), n.clearDepth(Nt), (Wt = Nt));
      },
      reset: function () {
        ((xt = !1), (te = null), (ve = null), (Wt = null), (qt = !1));
      },
    };
  }
  function i() {
    let xt = !1,
      qt = null,
      te = null,
      ve = null,
      Wt = null,
      Nt = null,
      Me = null,
      Ue = null,
      zn = null;
    return {
      setTest: function (Tn) {
        xt || (Tn ? H(n.STENCIL_TEST) : st(n.STENCIL_TEST));
      },
      setMask: function (Tn) {
        qt !== Tn && !xt && (n.stencilMask(Tn), (qt = Tn));
      },
      setFunc: function (Tn, ra, Ma) {
        (te !== Tn || ve !== ra || Wt !== Ma) && (n.stencilFunc(Tn, ra, Ma), (te = Tn), (ve = ra), (Wt = Ma));
      },
      setOp: function (Tn, ra, Ma) {
        (Nt !== Tn || Me !== ra || Ue !== Ma) && (n.stencilOp(Tn, ra, Ma), (Nt = Tn), (Me = ra), (Ue = Ma));
      },
      setLocked: function (Tn) {
        xt = Tn;
      },
      setClear: function (Tn) {
        zn !== Tn && (n.clearStencil(Tn), (zn = Tn));
      },
      reset: function () {
        ((xt = !1),
          (qt = null),
          (te = null),
          (ve = null),
          (Wt = null),
          (Nt = null),
          (Me = null),
          (Ue = null),
          (zn = null));
      },
    };
  }
  const a = new e(),
    o = new s(),
    r = new i(),
    l = new WeakMap(),
    c = new WeakMap();
  let f = {},
    d = {},
    h = new WeakMap(),
    u = [],
    m = null,
    x = !1,
    p = null,
    g = null,
    y = null,
    v = null,
    _ = null,
    k = null,
    M = null,
    S = new Ut(0, 0, 0),
    b = 0,
    w = !1,
    T = null,
    E = null,
    A = null,
    C = null,
    R = null;
  const I = n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let P = !1,
    F = 0;
  const L = n.getParameter(n.VERSION);
  L.indexOf("WebGL") !== -1
    ? ((F = parseFloat(/^WebGL (\d)/.exec(L)[1])), (P = F >= 1))
    : L.indexOf("OpenGL ES") !== -1 && ((F = parseFloat(/^OpenGL ES (\d)/.exec(L)[1])), (P = F >= 2));
  let B = null,
    G = {};
  const q = n.getParameter(n.SCISSOR_BOX),
    et = n.getParameter(n.VIEWPORT),
    ct = new kn().fromArray(q),
    rt = new kn().fromArray(et);
  function mt(xt, qt, te, ve) {
    const Wt = new Uint8Array(4),
      Nt = n.createTexture();
    (n.bindTexture(xt, Nt),
      n.texParameteri(xt, n.TEXTURE_MIN_FILTER, n.NEAREST),
      n.texParameteri(xt, n.TEXTURE_MAG_FILTER, n.NEAREST));
    for (let Me = 0; Me < te; Me++)
      xt === n.TEXTURE_3D || xt === n.TEXTURE_2D_ARRAY
        ? n.texImage3D(qt, 0, n.RGBA, 1, 1, ve, 0, n.RGBA, n.UNSIGNED_BYTE, Wt)
        : n.texImage2D(qt + Me, 0, n.RGBA, 1, 1, 0, n.RGBA, n.UNSIGNED_BYTE, Wt);
    return Nt;
  }
  const nt = {};
  ((nt[n.TEXTURE_2D] = mt(n.TEXTURE_2D, n.TEXTURE_2D, 1)),
    (nt[n.TEXTURE_CUBE_MAP] = mt(n.TEXTURE_CUBE_MAP, n.TEXTURE_CUBE_MAP_POSITIVE_X, 6)),
    (nt[n.TEXTURE_2D_ARRAY] = mt(n.TEXTURE_2D_ARRAY, n.TEXTURE_2D_ARRAY, 1, 1)),
    (nt[n.TEXTURE_3D] = mt(n.TEXTURE_3D, n.TEXTURE_3D, 1, 1)),
    a.setClear(0, 0, 0, 1),
    o.setClear(1),
    r.setClear(0),
    H(n.DEPTH_TEST),
    o.setFunc(cf),
    J(!1),
    Z(Jy),
    H(n.CULL_FACE),
    ut(Sr));
  function H(xt) {
    f[xt] !== !0 && (n.enable(xt), (f[xt] = !0));
  }
  function st(xt) {
    f[xt] !== !1 && (n.disable(xt), (f[xt] = !1));
  }
  function tt(xt, qt) {
    return d[xt] !== qt
      ? (n.bindFramebuffer(xt, qt),
        (d[xt] = qt),
        xt === n.DRAW_FRAMEBUFFER && (d[n.FRAMEBUFFER] = qt),
        xt === n.FRAMEBUFFER && (d[n.DRAW_FRAMEBUFFER] = qt),
        !0)
      : !1;
  }
  function it(xt, qt) {
    let te = u,
      ve = !1;
    if (xt) {
      ((te = h.get(qt)), te === void 0 && ((te = []), h.set(qt, te)));
      const Wt = xt.textures;
      if (te.length !== Wt.length || te[0] !== n.COLOR_ATTACHMENT0) {
        for (let Nt = 0, Me = Wt.length; Nt < Me; Nt++) te[Nt] = n.COLOR_ATTACHMENT0 + Nt;
        ((te.length = Wt.length), (ve = !0));
      }
    } else te[0] !== n.BACK && ((te[0] = n.BACK), (ve = !0));
    ve && n.drawBuffers(te);
  }
  function D(xt) {
    return m !== xt ? (n.useProgram(xt), (m = xt), !0) : !1;
  }
  const Q = { [b0]: n.FUNC_ADD, [UT]: n.FUNC_SUBTRACT, [OT]: n.FUNC_REVERSE_SUBTRACT };
  ((Q[BT] = n.MIN), (Q[HT] = n.MAX));
  const $ = {
    [$T]: n.ZERO,
    [Cr]: n.ONE,
    [GT]: n.SRC_COLOR,
    [u5]: n.SRC_ALPHA,
    [YT]: n.SRC_ALPHA_SATURATE,
    [qT]: n.DST_COLOR,
    [WT]: n.DST_ALPHA,
    [VT]: n.ONE_MINUS_SRC_COLOR,
    [mo]: n.ONE_MINUS_SRC_ALPHA,
    [XT]: n.ONE_MINUS_DST_COLOR,
    [jT]: n.ONE_MINUS_DST_ALPHA,
    [KT]: n.CONSTANT_COLOR,
    [ZT]: n.ONE_MINUS_CONSTANT_COLOR,
    [QT]: n.CONSTANT_ALPHA,
    [JT]: n.ONE_MINUS_CONSTANT_ALPHA,
  };
  function ut(xt, qt, te, ve, Wt, Nt, Me, Ue, zn, Tn) {
    if (xt === Sr) {
      x === !0 && (st(n.BLEND), (x = !1));
      return;
    }
    if ((x === !1 && (H(n.BLEND), (x = !0)), xt !== Fh)) {
      if (xt !== p || Tn !== w) {
        if (((g !== b0 || _ !== b0) && (n.blendEquation(n.FUNC_ADD), (g = b0), (_ = b0)), Tn))
          switch (xt) {
            case Kc:
              n.blendFuncSeparate(n.ONE, n.ONE_MINUS_SRC_ALPHA, n.ONE, n.ONE_MINUS_SRC_ALPHA);
              break;
            case h5:
              n.blendFunc(n.ONE, n.ONE);
              break;
            case tv:
              n.blendFuncSeparate(n.ZERO, n.ONE_MINUS_SRC_COLOR, n.ZERO, n.ONE);
              break;
            case ev:
              n.blendFuncSeparate(n.DST_COLOR, n.ONE_MINUS_SRC_ALPHA, n.ZERO, n.ONE);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", xt);
              break;
          }
        else
          switch (xt) {
            case Kc:
              n.blendFuncSeparate(n.SRC_ALPHA, n.ONE_MINUS_SRC_ALPHA, n.ONE, n.ONE_MINUS_SRC_ALPHA);
              break;
            case h5:
              n.blendFuncSeparate(n.SRC_ALPHA, n.ONE, n.ONE, n.ONE);
              break;
            case tv:
              console.error(
                "THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true",
              );
              break;
            case ev:
              console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", xt);
              break;
          }
        ((y = null), (v = null), (k = null), (M = null), S.set(0, 0, 0), (b = 0), (p = xt), (w = Tn));
      }
      return;
    }
    ((Wt = Wt || qt),
      (Nt = Nt || te),
      (Me = Me || ve),
      (qt !== g || Wt !== _) && (n.blendEquationSeparate(Q[qt], Q[Wt]), (g = qt), (_ = Wt)),
      (te !== y || ve !== v || Nt !== k || Me !== M) &&
        (n.blendFuncSeparate($[te], $[ve], $[Nt], $[Me]), (y = te), (v = ve), (k = Nt), (M = Me)),
      (Ue.equals(S) === !1 || zn !== b) && (n.blendColor(Ue.r, Ue.g, Ue.b, zn), S.copy(Ue), (b = zn)),
      (p = xt),
      (w = !1));
  }
  function N(xt, qt) {
    xt.side === fi ? st(n.CULL_FACE) : H(n.CULL_FACE);
    let te = xt.side === pi;
    (qt && (te = !te),
      J(te),
      xt.blending === Kc && xt.transparent === !1
        ? ut(Sr)
        : ut(
            xt.blending,
            xt.blendEquation,
            xt.blendSrc,
            xt.blendDst,
            xt.blendEquationAlpha,
            xt.blendSrcAlpha,
            xt.blendDstAlpha,
            xt.blendColor,
            xt.blendAlpha,
            xt.premultipliedAlpha,
          ),
      o.setFunc(xt.depthFunc),
      o.setTest(xt.depthTest),
      o.setMask(xt.depthWrite),
      a.setMask(xt.colorWrite));
    const ve = xt.stencilWrite;
    (r.setTest(ve),
      ve &&
        (r.setMask(xt.stencilWriteMask),
        r.setFunc(xt.stencilFunc, xt.stencilRef, xt.stencilFuncMask),
        r.setOp(xt.stencilFail, xt.stencilZFail, xt.stencilZPass)),
      j(xt.polygonOffset, xt.polygonOffsetFactor, xt.polygonOffsetUnits),
      xt.alphaToCoverage === !0 ? H(n.SAMPLE_ALPHA_TO_COVERAGE) : st(n.SAMPLE_ALPHA_TO_COVERAGE));
  }
  function J(xt) {
    T !== xt && (xt ? n.frontFace(n.CW) : n.frontFace(n.CCW), (T = xt));
  }
  function Z(xt) {
    (xt !== NT
      ? (H(n.CULL_FACE),
        xt !== E &&
          (xt === Jy ? n.cullFace(n.BACK) : xt === FT ? n.cullFace(n.FRONT) : n.cullFace(n.FRONT_AND_BACK)))
      : st(n.CULL_FACE),
      (E = xt));
  }
  function ot(xt) {
    xt !== A && (P && n.lineWidth(xt), (A = xt));
  }
  function j(xt, qt, te) {
    xt
      ? (H(n.POLYGON_OFFSET_FILL), (C !== qt || R !== te) && (n.polygonOffset(qt, te), (C = qt), (R = te)))
      : st(n.POLYGON_OFFSET_FILL);
  }
  function at(xt) {
    xt ? H(n.SCISSOR_TEST) : st(n.SCISSOR_TEST);
  }
  function Rt(xt) {
    (xt === void 0 && (xt = n.TEXTURE0 + I - 1), B !== xt && (n.activeTexture(xt), (B = xt)));
  }
  function kt(xt, qt, te) {
    te === void 0 && (B === null ? (te = n.TEXTURE0 + I - 1) : (te = B));
    let ve = G[te];
    (ve === void 0 && ((ve = { type: void 0, texture: void 0 }), (G[te] = ve)),
      (ve.type !== xt || ve.texture !== qt) &&
        (B !== te && (n.activeTexture(te), (B = te)),
        n.bindTexture(xt, qt || nt[xt]),
        (ve.type = xt),
        (ve.texture = qt)));
  }
  function V() {
    const xt = G[B];
    xt !== void 0 &&
      xt.type !== void 0 &&
      (n.bindTexture(xt.type, null), (xt.type = void 0), (xt.texture = void 0));
  }
  function U() {
    try {
      n.compressedTexImage2D(...arguments);
    } catch (xt) {
      console.error("THREE.WebGLState:", xt);
    }
  }
  function ht() {
    try {
      n.compressedTexImage3D(...arguments);
    } catch (xt) {
      console.error("THREE.WebGLState:", xt);
    }
  }
  function lt() {
    try {
      n.texSubImage2D(...arguments);
    } catch (xt) {
      console.error("THREE.WebGLState:", xt);
    }
  }
  function O() {
    try {
      n.texSubImage3D(...arguments);
    } catch (xt) {
      console.error("THREE.WebGLState:", xt);
    }
  }
  function Y() {
    try {
      n.compressedTexSubImage2D(...arguments);
    } catch (xt) {
      console.error("THREE.WebGLState:", xt);
    }
  }
  function gt() {
    try {
      n.compressedTexSubImage3D(...arguments);
    } catch (xt) {
      console.error("THREE.WebGLState:", xt);
    }
  }
  function ft() {
    try {
      n.texStorage2D(...arguments);
    } catch (xt) {
      console.error("THREE.WebGLState:", xt);
    }
  }
  function _t() {
    try {
      n.texStorage3D(...arguments);
    } catch (xt) {
      console.error("THREE.WebGLState:", xt);
    }
  }
  function Dt() {
    try {
      n.texImage2D(...arguments);
    } catch (xt) {
      console.error("THREE.WebGLState:", xt);
    }
  }
  function zt() {
    try {
      n.texImage3D(...arguments);
    } catch (xt) {
      console.error("THREE.WebGLState:", xt);
    }
  }
  function Ot(xt) {
    ct.equals(xt) === !1 && (n.scissor(xt.x, xt.y, xt.z, xt.w), ct.copy(xt));
  }
  function Jt(xt) {
    rt.equals(xt) === !1 && (n.viewport(xt.x, xt.y, xt.z, xt.w), rt.copy(xt));
  }
  function ue(xt, qt) {
    let te = c.get(qt);
    te === void 0 && ((te = new WeakMap()), c.set(qt, te));
    let ve = te.get(xt);
    ve === void 0 && ((ve = n.getUniformBlockIndex(qt, xt.name)), te.set(xt, ve));
  }
  function Kt(xt, qt) {
    const ve = c.get(qt).get(xt);
    l.get(qt) !== ve && (n.uniformBlockBinding(qt, ve, xt.__bindingPointIndex), l.set(qt, ve));
  }
  function Ie() {
    (n.disable(n.BLEND),
      n.disable(n.CULL_FACE),
      n.disable(n.DEPTH_TEST),
      n.disable(n.POLYGON_OFFSET_FILL),
      n.disable(n.SCISSOR_TEST),
      n.disable(n.STENCIL_TEST),
      n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),
      n.blendEquation(n.FUNC_ADD),
      n.blendFunc(n.ONE, n.ZERO),
      n.blendFuncSeparate(n.ONE, n.ZERO, n.ONE, n.ZERO),
      n.blendColor(0, 0, 0, 0),
      n.colorMask(!0, !0, !0, !0),
      n.clearColor(0, 0, 0, 0),
      n.depthMask(!0),
      n.depthFunc(n.LESS),
      o.setReversed(!1),
      n.clearDepth(1),
      n.stencilMask(4294967295),
      n.stencilFunc(n.ALWAYS, 0, 4294967295),
      n.stencilOp(n.KEEP, n.KEEP, n.KEEP),
      n.clearStencil(0),
      n.cullFace(n.BACK),
      n.frontFace(n.CCW),
      n.polygonOffset(0, 0),
      n.activeTexture(n.TEXTURE0),
      n.bindFramebuffer(n.FRAMEBUFFER, null),
      n.bindFramebuffer(n.DRAW_FRAMEBUFFER, null),
      n.bindFramebuffer(n.READ_FRAMEBUFFER, null),
      n.useProgram(null),
      n.lineWidth(1),
      n.scissor(0, 0, n.canvas.width, n.canvas.height),
      n.viewport(0, 0, n.canvas.width, n.canvas.height),
      (f = {}),
      (B = null),
      (G = {}),
      (d = {}),
      (h = new WeakMap()),
      (u = []),
      (m = null),
      (x = !1),
      (p = null),
      (g = null),
      (y = null),
      (v = null),
      (_ = null),
      (k = null),
      (M = null),
      (S = new Ut(0, 0, 0)),
      (b = 0),
      (w = !1),
      (T = null),
      (E = null),
      (A = null),
      (C = null),
      (R = null),
      ct.set(0, 0, n.canvas.width, n.canvas.height),
      rt.set(0, 0, n.canvas.width, n.canvas.height),
      a.reset(),
      o.reset(),
      r.reset());
  }
  return {
    buffers: { color: a, depth: o, stencil: r },
    enable: H,
    disable: st,
    bindFramebuffer: tt,
    drawBuffers: it,
    useProgram: D,
    setBlending: ut,
    setMaterial: N,
    setFlipSided: J,
    setCullFace: Z,
    setLineWidth: ot,
    setPolygonOffset: j,
    setScissorTest: at,
    activeTexture: Rt,
    bindTexture: kt,
    unbindTexture: V,
    compressedTexImage2D: U,
    compressedTexImage3D: ht,
    texImage2D: Dt,
    texImage3D: zt,
    updateUBOMapping: ue,
    uniformBlockBinding: Kt,
    texStorage2D: ft,
    texStorage3D: _t,
    texSubImage2D: lt,
    texSubImage3D: O,
    compressedTexSubImage2D: Y,
    compressedTexSubImage3D: gt,
    scissor: Ot,
    viewport: Jt,
    reset: Ie,
  };
}
export { NC, UC, VC, qC, YC };
