// 13-three-6.js — three｜6 个顶层语句｜63KB
// 对应 game.pretty.js 第 23902–25615 行
// 关键内容：
//   KC                    WEBGL_multisampled_render_to_texture
//   ZC                    WEBGL_compressed_texture_s3tc_srgb
//   eL                    local-floor
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { $5, A5, Af, B5, C5, D1, D5, Dr, E5, Ee, F5, Fl, Fo, G5, Gs, H5, I5, K3, K5, Ki, L5, M5, N5, Ns, O5, P5, Q5, R5, S5, T5, U5, Ul, V5, W3, W5, X3, X5, Y3, Y5, Z3, c1, cM, co, d1, dM, f1, fM, fo, g7, gh, h7, hM, j3, j5, jn, k5, l1, lM, m7, mh, mi, oM, og, p7, pu, q3, q5, r7, rM, ti, u7, uM, vh, w5, x7, xh, y7, yh, z5 } from './04-audio-2.js';
import { In, N1, dt, go, kn } from './05-three.js';
import { Ke, sa } from './06-three-2.js';
import { An, Rg, Sn, Yi } from './07-three-3.js';
import { Gl, Lv, SM, TM, _E, zM } from './08-three-4.js';

function KC(n, t, e, s, i, a, o) {
  const r = t.has("WEBGL_multisampled_render_to_texture")
      ? t.get("WEBGL_multisampled_render_to_texture")
      : null,
    l = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent),
    c = new Ee(),
    f = new WeakMap();
  let d;
  const h = new WeakMap();
  let u = !1;
  try {
    u = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {}
  function m(V, U) {
    return u ? new OffscreenCanvas(V, U) : N1("canvas");
  }
  function x(V, U, ht) {
    let lt = 1;
    const O = kt(V);
    if (((O.width > ht || O.height > ht) && (lt = ht / Math.max(O.width, O.height)), lt < 1))
      if (
        (typeof HTMLImageElement < "u" && V instanceof HTMLImageElement) ||
        (typeof HTMLCanvasElement < "u" && V instanceof HTMLCanvasElement) ||
        (typeof ImageBitmap < "u" && V instanceof ImageBitmap) ||
        (typeof VideoFrame < "u" && V instanceof VideoFrame)
      ) {
        const Y = Math.floor(lt * O.width),
          gt = Math.floor(lt * O.height);
        d === void 0 && (d = m(Y, gt));
        const ft = U ? m(Y, gt) : d;
        return (
          (ft.width = Y),
          (ft.height = gt),
          ft.getContext("2d").drawImage(V, 0, 0, Y, gt),
          console.warn(
            "THREE.WebGLRenderer: Texture has been resized from (" +
              O.width +
              "x" +
              O.height +
              ") to (" +
              Y +
              "x" +
              gt +
              ").",
          ),
          ft
        );
      } else
        return (
          "data" in V &&
            console.warn(
              "THREE.WebGLRenderer: Image in DataTexture is too big (" + O.width + "x" + O.height + ").",
            ),
          V
        );
    return V;
  }
  function p(V) {
    return V.generateMipmaps;
  }
  function g(V) {
    n.generateMipmap(V);
  }
  function y(V) {
    return V.isWebGLCubeRenderTarget
      ? n.TEXTURE_CUBE_MAP
      : V.isWebGL3DRenderTarget
        ? n.TEXTURE_3D
        : V.isWebGLArrayRenderTarget || V.isCompressedArrayTexture
          ? n.TEXTURE_2D_ARRAY
          : n.TEXTURE_2D;
  }
  function v(V, U, ht, lt, O = !1) {
    if (V !== null) {
      if (n[V] !== void 0) return n[V];
      console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + V + "'");
    }
    let Y = U;
    if (
      (U === n.RED &&
        (ht === n.FLOAT && (Y = n.R32F),
        ht === n.HALF_FLOAT && (Y = n.R16F),
        ht === n.UNSIGNED_BYTE && (Y = n.R8)),
      U === n.RED_INTEGER &&
        (ht === n.UNSIGNED_BYTE && (Y = n.R8UI),
        ht === n.UNSIGNED_SHORT && (Y = n.R16UI),
        ht === n.UNSIGNED_INT && (Y = n.R32UI),
        ht === n.BYTE && (Y = n.R8I),
        ht === n.SHORT && (Y = n.R16I),
        ht === n.INT && (Y = n.R32I)),
      U === n.RG &&
        (ht === n.FLOAT && (Y = n.RG32F),
        ht === n.HALF_FLOAT && (Y = n.RG16F),
        ht === n.UNSIGNED_BYTE && (Y = n.RG8)),
      U === n.RG_INTEGER &&
        (ht === n.UNSIGNED_BYTE && (Y = n.RG8UI),
        ht === n.UNSIGNED_SHORT && (Y = n.RG16UI),
        ht === n.UNSIGNED_INT && (Y = n.RG32UI),
        ht === n.BYTE && (Y = n.RG8I),
        ht === n.SHORT && (Y = n.RG16I),
        ht === n.INT && (Y = n.RG32I)),
      U === n.RGB_INTEGER &&
        (ht === n.UNSIGNED_BYTE && (Y = n.RGB8UI),
        ht === n.UNSIGNED_SHORT && (Y = n.RGB16UI),
        ht === n.UNSIGNED_INT && (Y = n.RGB32UI),
        ht === n.BYTE && (Y = n.RGB8I),
        ht === n.SHORT && (Y = n.RGB16I),
        ht === n.INT && (Y = n.RGB32I)),
      U === n.RGBA_INTEGER &&
        (ht === n.UNSIGNED_BYTE && (Y = n.RGBA8UI),
        ht === n.UNSIGNED_SHORT && (Y = n.RGBA16UI),
        ht === n.UNSIGNED_INT && (Y = n.RGBA32UI),
        ht === n.BYTE && (Y = n.RGBA8I),
        ht === n.SHORT && (Y = n.RGBA16I),
        ht === n.INT && (Y = n.RGBA32I)),
      U === n.RGB &&
        (ht === n.UNSIGNED_INT_5_9_9_9_REV && (Y = n.RGB9_E5),
        ht === n.UNSIGNED_INT_10F_11F_11F_REV && (Y = n.R11F_G11F_B10F)),
      U === n.RGBA)
    ) {
      const gt = O ? D1 : In.getTransfer(lt);
      (ht === n.FLOAT && (Y = n.RGBA32F),
        ht === n.HALF_FLOAT && (Y = n.RGBA16F),
        ht === n.UNSIGNED_BYTE && (Y = gt === jn ? n.SRGB8_ALPHA8 : n.RGBA8),
        ht === n.UNSIGNED_SHORT_4_4_4_4 && (Y = n.RGBA4),
        ht === n.UNSIGNED_SHORT_5_5_5_1 && (Y = n.RGB5_A1));
    }
    return (
      (Y === n.R16F ||
        Y === n.R32F ||
        Y === n.RG16F ||
        Y === n.RG32F ||
        Y === n.RGBA16F ||
        Y === n.RGBA32F) &&
        t.get("EXT_color_buffer_float"),
      Y
    );
  }
  function _(V, U) {
    let ht;
    return (
      V
        ? U === null || U === Fl || U === xh
          ? (ht = n.DEPTH24_STENCIL8)
          : U === fo
            ? (ht = n.DEPTH32F_STENCIL8)
            : U === gh &&
              ((ht = n.DEPTH24_STENCIL8),
              console.warn(
                "DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.",
              ))
        : U === null || U === Fl || U === xh
          ? (ht = n.DEPTH_COMPONENT24)
          : U === fo
            ? (ht = n.DEPTH_COMPONENT32F)
            : U === gh && (ht = n.DEPTH_COMPONENT16),
      ht
    );
  }
  function k(V, U) {
    return p(V) === !0 || (V.isFramebufferTexture && V.minFilter !== ti && V.minFilter !== Ns)
      ? Math.log2(Math.max(U.width, U.height)) + 1
      : V.mipmaps !== void 0 && V.mipmaps.length > 0
        ? V.mipmaps.length
        : V.isCompressedTexture && Array.isArray(V.image)
          ? U.mipmaps.length
          : 1;
  }
  function M(V) {
    const U = V.target;
    (U.removeEventListener("dispose", M), b(U), U.isVideoTexture && f.delete(U));
  }
  function S(V) {
    const U = V.target;
    (U.removeEventListener("dispose", S), T(U));
  }
  function b(V) {
    const U = s.get(V);
    if (U.__webglInit === void 0) return;
    const ht = V.source,
      lt = h.get(ht);
    if (lt) {
      const O = lt[U.__cacheKey];
      (O.usedTimes--, O.usedTimes === 0 && w(V), Object.keys(lt).length === 0 && h.delete(ht));
    }
    s.remove(V);
  }
  function w(V) {
    const U = s.get(V);
    n.deleteTexture(U.__webglTexture);
    const ht = V.source,
      lt = h.get(ht);
    (delete lt[U.__cacheKey], o.memory.textures--);
  }
  function T(V) {
    const U = s.get(V);
    if ((V.depthTexture && (V.depthTexture.dispose(), s.remove(V.depthTexture)), V.isWebGLCubeRenderTarget))
      for (let lt = 0; lt < 6; lt++) {
        if (Array.isArray(U.__webglFramebuffer[lt]))
          for (let O = 0; O < U.__webglFramebuffer[lt].length; O++)
            n.deleteFramebuffer(U.__webglFramebuffer[lt][O]);
        else n.deleteFramebuffer(U.__webglFramebuffer[lt]);
        U.__webglDepthbuffer && n.deleteRenderbuffer(U.__webglDepthbuffer[lt]);
      }
    else {
      if (Array.isArray(U.__webglFramebuffer))
        for (let lt = 0; lt < U.__webglFramebuffer.length; lt++)
          n.deleteFramebuffer(U.__webglFramebuffer[lt]);
      else n.deleteFramebuffer(U.__webglFramebuffer);
      if (
        (U.__webglDepthbuffer && n.deleteRenderbuffer(U.__webglDepthbuffer),
        U.__webglMultisampledFramebuffer && n.deleteFramebuffer(U.__webglMultisampledFramebuffer),
        U.__webglColorRenderbuffer)
      )
        for (let lt = 0; lt < U.__webglColorRenderbuffer.length; lt++)
          U.__webglColorRenderbuffer[lt] && n.deleteRenderbuffer(U.__webglColorRenderbuffer[lt]);
      U.__webglDepthRenderbuffer && n.deleteRenderbuffer(U.__webglDepthRenderbuffer);
    }
    const ht = V.textures;
    for (let lt = 0, O = ht.length; lt < O; lt++) {
      const Y = s.get(ht[lt]);
      (Y.__webglTexture && (n.deleteTexture(Y.__webglTexture), o.memory.textures--), s.remove(ht[lt]));
    }
    s.remove(V);
  }
  let E = 0;
  function A() {
    E = 0;
  }
  function C() {
    const V = E;
    return (
      V >= i.maxTextures &&
        console.warn(
          "THREE.WebGLTextures: Trying to use " +
            V +
            " texture units while this GPU supports only " +
            i.maxTextures,
        ),
      (E += 1),
      V
    );
  }
  function R(V) {
    const U = [];
    return (
      U.push(V.wrapS),
      U.push(V.wrapT),
      U.push(V.wrapR || 0),
      U.push(V.magFilter),
      U.push(V.minFilter),
      U.push(V.anisotropy),
      U.push(V.internalFormat),
      U.push(V.format),
      U.push(V.type),
      U.push(V.generateMipmaps),
      U.push(V.premultiplyAlpha),
      U.push(V.flipY),
      U.push(V.unpackAlignment),
      U.push(V.colorSpace),
      U.join()
    );
  }
  function I(V, U) {
    const ht = s.get(V);
    if (
      (V.isVideoTexture && at(V),
      V.isRenderTargetTexture === !1 &&
        V.isExternalTexture !== !0 &&
        V.version > 0 &&
        ht.__version !== V.version)
    ) {
      const lt = V.image;
      if (lt === null)
        console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
      else if (lt.complete === !1)
        console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        nt(ht, V, U);
        return;
      }
    } else V.isExternalTexture && (ht.__webglTexture = V.sourceTexture ? V.sourceTexture : null);
    e.bindTexture(n.TEXTURE_2D, ht.__webglTexture, n.TEXTURE0 + U);
  }
  function P(V, U) {
    const ht = s.get(V);
    if (V.isRenderTargetTexture === !1 && V.version > 0 && ht.__version !== V.version) {
      nt(ht, V, U);
      return;
    }
    e.bindTexture(n.TEXTURE_2D_ARRAY, ht.__webglTexture, n.TEXTURE0 + U);
  }
  function F(V, U) {
    const ht = s.get(V);
    if (V.isRenderTargetTexture === !1 && V.version > 0 && ht.__version !== V.version) {
      nt(ht, V, U);
      return;
    }
    e.bindTexture(n.TEXTURE_3D, ht.__webglTexture, n.TEXTURE0 + U);
  }
  function L(V, U) {
    const ht = s.get(V);
    if (V.version > 0 && ht.__version !== V.version) {
      H(ht, V, U);
      return;
    }
    e.bindTexture(n.TEXTURE_CUBE_MAP, ht.__webglTexture, n.TEXTURE0 + U);
  }
  const B = { [mh]: n.REPEAT, [co]: n.CLAMP_TO_EDGE, [w5]: n.MIRRORED_REPEAT },
    G = {
      [ti]: n.NEAREST,
      [r7]: n.NEAREST_MIPMAP_NEAREST,
      [pu]: n.NEAREST_MIPMAP_LINEAR,
      [Ns]: n.LINEAR,
      [og]: n.LINEAR_MIPMAP_NEAREST,
      [Fo]: n.LINEAR_MIPMAP_LINEAR,
    },
    q = {
      [h7]: n.NEVER,
      [y7]: n.ALWAYS,
      [u7]: n.LESS,
      [uM]: n.LEQUAL,
      [p7]: n.EQUAL,
      [x7]: n.GEQUAL,
      [m7]: n.GREATER,
      [g7]: n.NOTEQUAL,
    };
  function et(V, U) {
    if (
      (U.type === fo &&
        t.has("OES_texture_float_linear") === !1 &&
        (U.magFilter === Ns ||
          U.magFilter === og ||
          U.magFilter === pu ||
          U.magFilter === Fo ||
          U.minFilter === Ns ||
          U.minFilter === og ||
          U.minFilter === pu ||
          U.minFilter === Fo) &&
        console.warn(
          "THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.",
        ),
      n.texParameteri(V, n.TEXTURE_WRAP_S, B[U.wrapS]),
      n.texParameteri(V, n.TEXTURE_WRAP_T, B[U.wrapT]),
      (V === n.TEXTURE_3D || V === n.TEXTURE_2D_ARRAY) && n.texParameteri(V, n.TEXTURE_WRAP_R, B[U.wrapR]),
      n.texParameteri(V, n.TEXTURE_MAG_FILTER, G[U.magFilter]),
      n.texParameteri(V, n.TEXTURE_MIN_FILTER, G[U.minFilter]),
      U.compareFunction &&
        (n.texParameteri(V, n.TEXTURE_COMPARE_MODE, n.COMPARE_REF_TO_TEXTURE),
        n.texParameteri(V, n.TEXTURE_COMPARE_FUNC, q[U.compareFunction])),
      t.has("EXT_texture_filter_anisotropic") === !0)
    ) {
      if (
        U.magFilter === ti ||
        (U.minFilter !== pu && U.minFilter !== Fo) ||
        (U.type === fo && t.has("OES_texture_float_linear") === !1)
      )
        return;
      if (U.anisotropy > 1 || s.get(U).__currentAnisotropy) {
        const ht = t.get("EXT_texture_filter_anisotropic");
        (n.texParameterf(V, ht.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(U.anisotropy, i.getMaxAnisotropy())),
          (s.get(U).__currentAnisotropy = U.anisotropy));
      }
    }
  }
  function ct(V, U) {
    let ht = !1;
    V.__webglInit === void 0 && ((V.__webglInit = !0), U.addEventListener("dispose", M));
    const lt = U.source;
    let O = h.get(lt);
    O === void 0 && ((O = {}), h.set(lt, O));
    const Y = R(U);
    if (Y !== V.__cacheKey) {
      (O[Y] === void 0 &&
        ((O[Y] = { texture: n.createTexture(), usedTimes: 0 }), o.memory.textures++, (ht = !0)),
        O[Y].usedTimes++);
      const gt = O[V.__cacheKey];
      (gt !== void 0 && (O[V.__cacheKey].usedTimes--, gt.usedTimes === 0 && w(U)),
        (V.__cacheKey = Y),
        (V.__webglTexture = O[Y].texture));
    }
    return ht;
  }
  function rt(V, U, ht) {
    return Math.floor(Math.floor(V / ht) / U);
  }
  function mt(V, U, ht, lt) {
    const Y = V.updateRanges;
    if (Y.length === 0) e.texSubImage2D(n.TEXTURE_2D, 0, 0, 0, U.width, U.height, ht, lt, U.data);
    else {
      Y.sort((zt, Ot) => zt.start - Ot.start);
      let gt = 0;
      for (let zt = 1; zt < Y.length; zt++) {
        const Ot = Y[gt],
          Jt = Y[zt],
          ue = Ot.start + Ot.count,
          Kt = rt(Jt.start, U.width, 4),
          Ie = rt(Ot.start, U.width, 4);
        Jt.start <= ue + 1 && Kt === Ie && rt(Jt.start + Jt.count - 1, U.width, 4) === Kt
          ? (Ot.count = Math.max(Ot.count, Jt.start + Jt.count - Ot.start))
          : (++gt, (Y[gt] = Jt));
      }
      Y.length = gt + 1;
      const ft = n.getParameter(n.UNPACK_ROW_LENGTH),
        _t = n.getParameter(n.UNPACK_SKIP_PIXELS),
        Dt = n.getParameter(n.UNPACK_SKIP_ROWS);
      n.pixelStorei(n.UNPACK_ROW_LENGTH, U.width);
      for (let zt = 0, Ot = Y.length; zt < Ot; zt++) {
        const Jt = Y[zt],
          ue = Math.floor(Jt.start / 4),
          Kt = Math.ceil(Jt.count / 4),
          Ie = ue % U.width,
          xt = Math.floor(ue / U.width),
          qt = Kt,
          te = 1;
        (n.pixelStorei(n.UNPACK_SKIP_PIXELS, Ie),
          n.pixelStorei(n.UNPACK_SKIP_ROWS, xt),
          e.texSubImage2D(n.TEXTURE_2D, 0, Ie, xt, qt, te, ht, lt, U.data));
      }
      (V.clearUpdateRanges(),
        n.pixelStorei(n.UNPACK_ROW_LENGTH, ft),
        n.pixelStorei(n.UNPACK_SKIP_PIXELS, _t),
        n.pixelStorei(n.UNPACK_SKIP_ROWS, Dt));
    }
  }
  function nt(V, U, ht) {
    let lt = n.TEXTURE_2D;
    ((U.isDataArrayTexture || U.isCompressedArrayTexture) && (lt = n.TEXTURE_2D_ARRAY),
      U.isData3DTexture && (lt = n.TEXTURE_3D));
    const O = ct(V, U),
      Y = U.source;
    e.bindTexture(lt, V.__webglTexture, n.TEXTURE0 + ht);
    const gt = s.get(Y);
    if (Y.version !== gt.__version || O === !0) {
      e.activeTexture(n.TEXTURE0 + ht);
      const ft = In.getPrimaries(In.workingColorSpace),
        _t = U.colorSpace === Ki ? null : In.getPrimaries(U.colorSpace),
        Dt = U.colorSpace === Ki || ft === _t ? n.NONE : n.BROWSER_DEFAULT_WEBGL;
      (n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, U.flipY),
        n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, U.premultiplyAlpha),
        n.pixelStorei(n.UNPACK_ALIGNMENT, U.unpackAlignment),
        n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL, Dt));
      let zt = x(U.image, !1, i.maxTextureSize);
      zt = Rt(U, zt);
      const Ot = a.convert(U.format, U.colorSpace),
        Jt = a.convert(U.type);
      let ue = v(U.internalFormat, Ot, Jt, U.colorSpace, U.isVideoTexture);
      et(lt, U);
      let Kt;
      const Ie = U.mipmaps,
        xt = U.isVideoTexture !== !0,
        qt = gt.__version === void 0 || O === !0,
        te = Y.dataReady,
        ve = k(U, zt);
      if (U.isDepthTexture)
        ((ue = _(U.format === vh, U.type)),
          qt &&
            (xt
              ? e.texStorage2D(n.TEXTURE_2D, 1, ue, zt.width, zt.height)
              : e.texImage2D(n.TEXTURE_2D, 0, ue, zt.width, zt.height, 0, Ot, Jt, null)));
      else if (U.isDataTexture)
        if (Ie.length > 0) {
          xt && qt && e.texStorage2D(n.TEXTURE_2D, ve, ue, Ie[0].width, Ie[0].height);
          for (let Wt = 0, Nt = Ie.length; Wt < Nt; Wt++)
            ((Kt = Ie[Wt]),
              xt
                ? te && e.texSubImage2D(n.TEXTURE_2D, Wt, 0, 0, Kt.width, Kt.height, Ot, Jt, Kt.data)
                : e.texImage2D(n.TEXTURE_2D, Wt, ue, Kt.width, Kt.height, 0, Ot, Jt, Kt.data));
          U.generateMipmaps = !1;
        } else
          xt
            ? (qt && e.texStorage2D(n.TEXTURE_2D, ve, ue, zt.width, zt.height), te && mt(U, zt, Ot, Jt))
            : e.texImage2D(n.TEXTURE_2D, 0, ue, zt.width, zt.height, 0, Ot, Jt, zt.data);
      else if (U.isCompressedTexture)
        if (U.isCompressedArrayTexture) {
          xt && qt && e.texStorage3D(n.TEXTURE_2D_ARRAY, ve, ue, Ie[0].width, Ie[0].height, zt.depth);
          for (let Wt = 0, Nt = Ie.length; Wt < Nt; Wt++)
            if (((Kt = Ie[Wt]), U.format !== Gs))
              if (Ot !== null)
                if (xt) {
                  if (te)
                    if (U.layerUpdates.size > 0) {
                      const Me = Lv(Kt.width, Kt.height, U.format, U.type);
                      for (const Ue of U.layerUpdates) {
                        const zn = Kt.data.subarray(
                          (Ue * Me) / Kt.data.BYTES_PER_ELEMENT,
                          ((Ue + 1) * Me) / Kt.data.BYTES_PER_ELEMENT,
                        );
                        e.compressedTexSubImage3D(
                          n.TEXTURE_2D_ARRAY,
                          Wt,
                          0,
                          0,
                          Ue,
                          Kt.width,
                          Kt.height,
                          1,
                          Ot,
                          zn,
                        );
                      }
                      U.clearLayerUpdates();
                    } else
                      e.compressedTexSubImage3D(
                        n.TEXTURE_2D_ARRAY,
                        Wt,
                        0,
                        0,
                        0,
                        Kt.width,
                        Kt.height,
                        zt.depth,
                        Ot,
                        Kt.data,
                      );
                } else
                  e.compressedTexImage3D(
                    n.TEXTURE_2D_ARRAY,
                    Wt,
                    ue,
                    Kt.width,
                    Kt.height,
                    zt.depth,
                    0,
                    Kt.data,
                    0,
                    0,
                  );
              else
                console.warn(
                  "THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()",
                );
            else
              xt
                ? te &&
                  e.texSubImage3D(
                    n.TEXTURE_2D_ARRAY,
                    Wt,
                    0,
                    0,
                    0,
                    Kt.width,
                    Kt.height,
                    zt.depth,
                    Ot,
                    Jt,
                    Kt.data,
                  )
                : e.texImage3D(n.TEXTURE_2D_ARRAY, Wt, ue, Kt.width, Kt.height, zt.depth, 0, Ot, Jt, Kt.data);
        } else {
          xt && qt && e.texStorage2D(n.TEXTURE_2D, ve, ue, Ie[0].width, Ie[0].height);
          for (let Wt = 0, Nt = Ie.length; Wt < Nt; Wt++)
            ((Kt = Ie[Wt]),
              U.format !== Gs
                ? Ot !== null
                  ? xt
                    ? te &&
                      e.compressedTexSubImage2D(n.TEXTURE_2D, Wt, 0, 0, Kt.width, Kt.height, Ot, Kt.data)
                    : e.compressedTexImage2D(n.TEXTURE_2D, Wt, ue, Kt.width, Kt.height, 0, Kt.data)
                  : console.warn(
                      "THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()",
                    )
                : xt
                  ? te && e.texSubImage2D(n.TEXTURE_2D, Wt, 0, 0, Kt.width, Kt.height, Ot, Jt, Kt.data)
                  : e.texImage2D(n.TEXTURE_2D, Wt, ue, Kt.width, Kt.height, 0, Ot, Jt, Kt.data));
        }
      else if (U.isDataArrayTexture)
        if (xt) {
          if ((qt && e.texStorage3D(n.TEXTURE_2D_ARRAY, ve, ue, zt.width, zt.height, zt.depth), te))
            if (U.layerUpdates.size > 0) {
              const Wt = Lv(zt.width, zt.height, U.format, U.type);
              for (const Nt of U.layerUpdates) {
                const Me = zt.data.subarray(
                  (Nt * Wt) / zt.data.BYTES_PER_ELEMENT,
                  ((Nt + 1) * Wt) / zt.data.BYTES_PER_ELEMENT,
                );
                e.texSubImage3D(n.TEXTURE_2D_ARRAY, 0, 0, 0, Nt, zt.width, zt.height, 1, Ot, Jt, Me);
              }
              U.clearLayerUpdates();
            } else
              e.texSubImage3D(n.TEXTURE_2D_ARRAY, 0, 0, 0, 0, zt.width, zt.height, zt.depth, Ot, Jt, zt.data);
        } else e.texImage3D(n.TEXTURE_2D_ARRAY, 0, ue, zt.width, zt.height, zt.depth, 0, Ot, Jt, zt.data);
      else if (U.isData3DTexture)
        xt
          ? (qt && e.texStorage3D(n.TEXTURE_3D, ve, ue, zt.width, zt.height, zt.depth),
            te && e.texSubImage3D(n.TEXTURE_3D, 0, 0, 0, 0, zt.width, zt.height, zt.depth, Ot, Jt, zt.data))
          : e.texImage3D(n.TEXTURE_3D, 0, ue, zt.width, zt.height, zt.depth, 0, Ot, Jt, zt.data);
      else if (U.isFramebufferTexture) {
        if (qt)
          if (xt) e.texStorage2D(n.TEXTURE_2D, ve, ue, zt.width, zt.height);
          else {
            let Wt = zt.width,
              Nt = zt.height;
            for (let Me = 0; Me < ve; Me++)
              (e.texImage2D(n.TEXTURE_2D, Me, ue, Wt, Nt, 0, Ot, Jt, null), (Wt >>= 1), (Nt >>= 1));
          }
      } else if (Ie.length > 0) {
        if (xt && qt) {
          const Wt = kt(Ie[0]);
          e.texStorage2D(n.TEXTURE_2D, ve, ue, Wt.width, Wt.height);
        }
        for (let Wt = 0, Nt = Ie.length; Wt < Nt; Wt++)
          ((Kt = Ie[Wt]),
            xt
              ? te && e.texSubImage2D(n.TEXTURE_2D, Wt, 0, 0, Ot, Jt, Kt)
              : e.texImage2D(n.TEXTURE_2D, Wt, ue, Ot, Jt, Kt));
        U.generateMipmaps = !1;
      } else if (xt) {
        if (qt) {
          const Wt = kt(zt);
          e.texStorage2D(n.TEXTURE_2D, ve, ue, Wt.width, Wt.height);
        }
        te && e.texSubImage2D(n.TEXTURE_2D, 0, 0, 0, Ot, Jt, zt);
      } else e.texImage2D(n.TEXTURE_2D, 0, ue, Ot, Jt, zt);
      (p(U) && g(lt), (gt.__version = Y.version), U.onUpdate && U.onUpdate(U));
    }
    V.__version = U.version;
  }
  function H(V, U, ht) {
    if (U.image.length !== 6) return;
    const lt = ct(V, U),
      O = U.source;
    e.bindTexture(n.TEXTURE_CUBE_MAP, V.__webglTexture, n.TEXTURE0 + ht);
    const Y = s.get(O);
    if (O.version !== Y.__version || lt === !0) {
      e.activeTexture(n.TEXTURE0 + ht);
      const gt = In.getPrimaries(In.workingColorSpace),
        ft = U.colorSpace === Ki ? null : In.getPrimaries(U.colorSpace),
        _t = U.colorSpace === Ki || gt === ft ? n.NONE : n.BROWSER_DEFAULT_WEBGL;
      (n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, U.flipY),
        n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, U.premultiplyAlpha),
        n.pixelStorei(n.UNPACK_ALIGNMENT, U.unpackAlignment),
        n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL, _t));
      const Dt = U.isCompressedTexture || U.image[0].isCompressedTexture,
        zt = U.image[0] && U.image[0].isDataTexture,
        Ot = [];
      for (let Nt = 0; Nt < 6; Nt++)
        (!Dt && !zt
          ? (Ot[Nt] = x(U.image[Nt], !0, i.maxCubemapSize))
          : (Ot[Nt] = zt ? U.image[Nt].image : U.image[Nt]),
          (Ot[Nt] = Rt(U, Ot[Nt])));
      const Jt = Ot[0],
        ue = a.convert(U.format, U.colorSpace),
        Kt = a.convert(U.type),
        Ie = v(U.internalFormat, ue, Kt, U.colorSpace),
        xt = U.isVideoTexture !== !0,
        qt = Y.__version === void 0 || lt === !0,
        te = O.dataReady;
      let ve = k(U, Jt);
      et(n.TEXTURE_CUBE_MAP, U);
      let Wt;
      if (Dt) {
        xt && qt && e.texStorage2D(n.TEXTURE_CUBE_MAP, ve, Ie, Jt.width, Jt.height);
        for (let Nt = 0; Nt < 6; Nt++) {
          Wt = Ot[Nt].mipmaps;
          for (let Me = 0; Me < Wt.length; Me++) {
            const Ue = Wt[Me];
            U.format !== Gs
              ? ue !== null
                ? xt
                  ? te &&
                    e.compressedTexSubImage2D(
                      n.TEXTURE_CUBE_MAP_POSITIVE_X + Nt,
                      Me,
                      0,
                      0,
                      Ue.width,
                      Ue.height,
                      ue,
                      Ue.data,
                    )
                  : e.compressedTexImage2D(
                      n.TEXTURE_CUBE_MAP_POSITIVE_X + Nt,
                      Me,
                      Ie,
                      Ue.width,
                      Ue.height,
                      0,
                      Ue.data,
                    )
                : console.warn(
                    "THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()",
                  )
              : xt
                ? te &&
                  e.texSubImage2D(
                    n.TEXTURE_CUBE_MAP_POSITIVE_X + Nt,
                    Me,
                    0,
                    0,
                    Ue.width,
                    Ue.height,
                    ue,
                    Kt,
                    Ue.data,
                  )
                : e.texImage2D(
                    n.TEXTURE_CUBE_MAP_POSITIVE_X + Nt,
                    Me,
                    Ie,
                    Ue.width,
                    Ue.height,
                    0,
                    ue,
                    Kt,
                    Ue.data,
                  );
          }
        }
      } else {
        if (((Wt = U.mipmaps), xt && qt)) {
          Wt.length > 0 && ve++;
          const Nt = kt(Ot[0]);
          e.texStorage2D(n.TEXTURE_CUBE_MAP, ve, Ie, Nt.width, Nt.height);
        }
        for (let Nt = 0; Nt < 6; Nt++)
          if (zt) {
            xt
              ? te &&
                e.texSubImage2D(
                  n.TEXTURE_CUBE_MAP_POSITIVE_X + Nt,
                  0,
                  0,
                  0,
                  Ot[Nt].width,
                  Ot[Nt].height,
                  ue,
                  Kt,
                  Ot[Nt].data,
                )
              : e.texImage2D(
                  n.TEXTURE_CUBE_MAP_POSITIVE_X + Nt,
                  0,
                  Ie,
                  Ot[Nt].width,
                  Ot[Nt].height,
                  0,
                  ue,
                  Kt,
                  Ot[Nt].data,
                );
            for (let Me = 0; Me < Wt.length; Me++) {
              const zn = Wt[Me].image[Nt].image;
              xt
                ? te &&
                  e.texSubImage2D(
                    n.TEXTURE_CUBE_MAP_POSITIVE_X + Nt,
                    Me + 1,
                    0,
                    0,
                    zn.width,
                    zn.height,
                    ue,
                    Kt,
                    zn.data,
                  )
                : e.texImage2D(
                    n.TEXTURE_CUBE_MAP_POSITIVE_X + Nt,
                    Me + 1,
                    Ie,
                    zn.width,
                    zn.height,
                    0,
                    ue,
                    Kt,
                    zn.data,
                  );
            }
          } else {
            xt
              ? te && e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + Nt, 0, 0, 0, ue, Kt, Ot[Nt])
              : e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + Nt, 0, Ie, ue, Kt, Ot[Nt]);
            for (let Me = 0; Me < Wt.length; Me++) {
              const Ue = Wt[Me];
              xt
                ? te &&
                  e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + Nt, Me + 1, 0, 0, ue, Kt, Ue.image[Nt])
                : e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + Nt, Me + 1, Ie, ue, Kt, Ue.image[Nt]);
            }
          }
      }
      (p(U) && g(n.TEXTURE_CUBE_MAP), (Y.__version = O.version), U.onUpdate && U.onUpdate(U));
    }
    V.__version = U.version;
  }
  function st(V, U, ht, lt, O, Y) {
    const gt = a.convert(ht.format, ht.colorSpace),
      ft = a.convert(ht.type),
      _t = v(ht.internalFormat, gt, ft, ht.colorSpace),
      Dt = s.get(U),
      zt = s.get(ht);
    if (((zt.__renderTarget = U), !Dt.__hasExternalTextures)) {
      const Ot = Math.max(1, U.width >> Y),
        Jt = Math.max(1, U.height >> Y);
      O === n.TEXTURE_3D || O === n.TEXTURE_2D_ARRAY
        ? e.texImage3D(O, Y, _t, Ot, Jt, U.depth, 0, gt, ft, null)
        : e.texImage2D(O, Y, _t, Ot, Jt, 0, gt, ft, null);
    }
    (e.bindFramebuffer(n.FRAMEBUFFER, V),
      j(U)
        ? r.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER, lt, O, zt.__webglTexture, 0, ot(U))
        : (O === n.TEXTURE_2D ||
            (O >= n.TEXTURE_CUBE_MAP_POSITIVE_X && O <= n.TEXTURE_CUBE_MAP_NEGATIVE_Z)) &&
          n.framebufferTexture2D(n.FRAMEBUFFER, lt, O, zt.__webglTexture, Y),
      e.bindFramebuffer(n.FRAMEBUFFER, null));
  }
  function tt(V, U, ht) {
    if ((n.bindRenderbuffer(n.RENDERBUFFER, V), U.depthBuffer)) {
      const lt = U.depthTexture,
        O = lt && lt.isDepthTexture ? lt.type : null,
        Y = _(U.stencilBuffer, O),
        gt = U.stencilBuffer ? n.DEPTH_STENCIL_ATTACHMENT : n.DEPTH_ATTACHMENT,
        ft = ot(U);
      (j(U)
        ? r.renderbufferStorageMultisampleEXT(n.RENDERBUFFER, ft, Y, U.width, U.height)
        : ht
          ? n.renderbufferStorageMultisample(n.RENDERBUFFER, ft, Y, U.width, U.height)
          : n.renderbufferStorage(n.RENDERBUFFER, Y, U.width, U.height),
        n.framebufferRenderbuffer(n.FRAMEBUFFER, gt, n.RENDERBUFFER, V));
    } else {
      const lt = U.textures;
      for (let O = 0; O < lt.length; O++) {
        const Y = lt[O],
          gt = a.convert(Y.format, Y.colorSpace),
          ft = a.convert(Y.type),
          _t = v(Y.internalFormat, gt, ft, Y.colorSpace),
          Dt = ot(U);
        ht && j(U) === !1
          ? n.renderbufferStorageMultisample(n.RENDERBUFFER, Dt, _t, U.width, U.height)
          : j(U)
            ? r.renderbufferStorageMultisampleEXT(n.RENDERBUFFER, Dt, _t, U.width, U.height)
            : n.renderbufferStorage(n.RENDERBUFFER, _t, U.width, U.height);
      }
    }
    n.bindRenderbuffer(n.RENDERBUFFER, null);
  }
  function it(V, U) {
    if (U && U.isWebGLCubeRenderTarget)
      throw new Error("Depth Texture with cube render targets is not supported");
    if ((e.bindFramebuffer(n.FRAMEBUFFER, V), !(U.depthTexture && U.depthTexture.isDepthTexture)))
      throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
    const lt = s.get(U.depthTexture);
    ((lt.__renderTarget = U),
      (!lt.__webglTexture ||
        U.depthTexture.image.width !== U.width ||
        U.depthTexture.image.height !== U.height) &&
        ((U.depthTexture.image.width = U.width),
        (U.depthTexture.image.height = U.height),
        (U.depthTexture.needsUpdate = !0)),
      I(U.depthTexture, 0));
    const O = lt.__webglTexture,
      Y = ot(U);
    if (U.depthTexture.format === yh)
      j(U)
        ? r.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER, n.DEPTH_ATTACHMENT, n.TEXTURE_2D, O, 0, Y)
        : n.framebufferTexture2D(n.FRAMEBUFFER, n.DEPTH_ATTACHMENT, n.TEXTURE_2D, O, 0);
    else if (U.depthTexture.format === vh)
      j(U)
        ? r.framebufferTexture2DMultisampleEXT(
            n.FRAMEBUFFER,
            n.DEPTH_STENCIL_ATTACHMENT,
            n.TEXTURE_2D,
            O,
            0,
            Y,
          )
        : n.framebufferTexture2D(n.FRAMEBUFFER, n.DEPTH_STENCIL_ATTACHMENT, n.TEXTURE_2D, O, 0);
    else throw new Error("Unknown depthTexture format");
  }
  function D(V) {
    const U = s.get(V),
      ht = V.isWebGLCubeRenderTarget === !0;
    if (U.__boundDepthTexture !== V.depthTexture) {
      const lt = V.depthTexture;
      if ((U.__depthDisposeCallback && U.__depthDisposeCallback(), lt)) {
        const O = () => {
          (delete U.__boundDepthTexture,
            delete U.__depthDisposeCallback,
            lt.removeEventListener("dispose", O));
        };
        (lt.addEventListener("dispose", O), (U.__depthDisposeCallback = O));
      }
      U.__boundDepthTexture = lt;
    }
    if (V.depthTexture && !U.__autoAllocateDepthBuffer) {
      if (ht) throw new Error("target.depthTexture not supported in Cube render targets");
      const lt = V.texture.mipmaps;
      lt && lt.length > 0 ? it(U.__webglFramebuffer[0], V) : it(U.__webglFramebuffer, V);
    } else if (ht) {
      U.__webglDepthbuffer = [];
      for (let lt = 0; lt < 6; lt++)
        if ((e.bindFramebuffer(n.FRAMEBUFFER, U.__webglFramebuffer[lt]), U.__webglDepthbuffer[lt] === void 0))
          ((U.__webglDepthbuffer[lt] = n.createRenderbuffer()), tt(U.__webglDepthbuffer[lt], V, !1));
        else {
          const O = V.stencilBuffer ? n.DEPTH_STENCIL_ATTACHMENT : n.DEPTH_ATTACHMENT,
            Y = U.__webglDepthbuffer[lt];
          (n.bindRenderbuffer(n.RENDERBUFFER, Y),
            n.framebufferRenderbuffer(n.FRAMEBUFFER, O, n.RENDERBUFFER, Y));
        }
    } else {
      const lt = V.texture.mipmaps;
      if (
        (lt && lt.length > 0
          ? e.bindFramebuffer(n.FRAMEBUFFER, U.__webglFramebuffer[0])
          : e.bindFramebuffer(n.FRAMEBUFFER, U.__webglFramebuffer),
        U.__webglDepthbuffer === void 0)
      )
        ((U.__webglDepthbuffer = n.createRenderbuffer()), tt(U.__webglDepthbuffer, V, !1));
      else {
        const O = V.stencilBuffer ? n.DEPTH_STENCIL_ATTACHMENT : n.DEPTH_ATTACHMENT,
          Y = U.__webglDepthbuffer;
        (n.bindRenderbuffer(n.RENDERBUFFER, Y),
          n.framebufferRenderbuffer(n.FRAMEBUFFER, O, n.RENDERBUFFER, Y));
      }
    }
    e.bindFramebuffer(n.FRAMEBUFFER, null);
  }
  function Q(V, U, ht) {
    const lt = s.get(V);
    (U !== void 0 && st(lt.__webglFramebuffer, V, V.texture, n.COLOR_ATTACHMENT0, n.TEXTURE_2D, 0),
      ht !== void 0 && D(V));
  }
  function $(V) {
    const U = V.texture,
      ht = s.get(V),
      lt = s.get(U);
    V.addEventListener("dispose", S);
    const O = V.textures,
      Y = V.isWebGLCubeRenderTarget === !0,
      gt = O.length > 1;
    if (
      (gt ||
        (lt.__webglTexture === void 0 && (lt.__webglTexture = n.createTexture()),
        (lt.__version = U.version),
        o.memory.textures++),
      Y)
    ) {
      ht.__webglFramebuffer = [];
      for (let ft = 0; ft < 6; ft++)
        if (U.mipmaps && U.mipmaps.length > 0) {
          ht.__webglFramebuffer[ft] = [];
          for (let _t = 0; _t < U.mipmaps.length; _t++) ht.__webglFramebuffer[ft][_t] = n.createFramebuffer();
        } else ht.__webglFramebuffer[ft] = n.createFramebuffer();
    } else {
      if (U.mipmaps && U.mipmaps.length > 0) {
        ht.__webglFramebuffer = [];
        for (let ft = 0; ft < U.mipmaps.length; ft++) ht.__webglFramebuffer[ft] = n.createFramebuffer();
      } else ht.__webglFramebuffer = n.createFramebuffer();
      if (gt)
        for (let ft = 0, _t = O.length; ft < _t; ft++) {
          const Dt = s.get(O[ft]);
          Dt.__webglTexture === void 0 && ((Dt.__webglTexture = n.createTexture()), o.memory.textures++);
        }
      if (V.samples > 0 && j(V) === !1) {
        ((ht.__webglMultisampledFramebuffer = n.createFramebuffer()),
          (ht.__webglColorRenderbuffer = []),
          e.bindFramebuffer(n.FRAMEBUFFER, ht.__webglMultisampledFramebuffer));
        for (let ft = 0; ft < O.length; ft++) {
          const _t = O[ft];
          ((ht.__webglColorRenderbuffer[ft] = n.createRenderbuffer()),
            n.bindRenderbuffer(n.RENDERBUFFER, ht.__webglColorRenderbuffer[ft]));
          const Dt = a.convert(_t.format, _t.colorSpace),
            zt = a.convert(_t.type),
            Ot = v(_t.internalFormat, Dt, zt, _t.colorSpace, V.isXRRenderTarget === !0),
            Jt = ot(V);
          (n.renderbufferStorageMultisample(n.RENDERBUFFER, Jt, Ot, V.width, V.height),
            n.framebufferRenderbuffer(
              n.FRAMEBUFFER,
              n.COLOR_ATTACHMENT0 + ft,
              n.RENDERBUFFER,
              ht.__webglColorRenderbuffer[ft],
            ));
        }
        (n.bindRenderbuffer(n.RENDERBUFFER, null),
          V.depthBuffer &&
            ((ht.__webglDepthRenderbuffer = n.createRenderbuffer()), tt(ht.__webglDepthRenderbuffer, V, !0)),
          e.bindFramebuffer(n.FRAMEBUFFER, null));
      }
    }
    if (Y) {
      (e.bindTexture(n.TEXTURE_CUBE_MAP, lt.__webglTexture), et(n.TEXTURE_CUBE_MAP, U));
      for (let ft = 0; ft < 6; ft++)
        if (U.mipmaps && U.mipmaps.length > 0)
          for (let _t = 0; _t < U.mipmaps.length; _t++)
            st(
              ht.__webglFramebuffer[ft][_t],
              V,
              U,
              n.COLOR_ATTACHMENT0,
              n.TEXTURE_CUBE_MAP_POSITIVE_X + ft,
              _t,
            );
        else st(ht.__webglFramebuffer[ft], V, U, n.COLOR_ATTACHMENT0, n.TEXTURE_CUBE_MAP_POSITIVE_X + ft, 0);
      (p(U) && g(n.TEXTURE_CUBE_MAP), e.unbindTexture());
    } else if (gt) {
      for (let ft = 0, _t = O.length; ft < _t; ft++) {
        const Dt = O[ft],
          zt = s.get(Dt);
        let Ot = n.TEXTURE_2D;
        ((V.isWebGL3DRenderTarget || V.isWebGLArrayRenderTarget) &&
          (Ot = V.isWebGL3DRenderTarget ? n.TEXTURE_3D : n.TEXTURE_2D_ARRAY),
          e.bindTexture(Ot, zt.__webglTexture),
          et(Ot, Dt),
          st(ht.__webglFramebuffer, V, Dt, n.COLOR_ATTACHMENT0 + ft, Ot, 0),
          p(Dt) && g(Ot));
      }
      e.unbindTexture();
    } else {
      let ft = n.TEXTURE_2D;
      if (
        ((V.isWebGL3DRenderTarget || V.isWebGLArrayRenderTarget) &&
          (ft = V.isWebGL3DRenderTarget ? n.TEXTURE_3D : n.TEXTURE_2D_ARRAY),
        e.bindTexture(ft, lt.__webglTexture),
        et(ft, U),
        U.mipmaps && U.mipmaps.length > 0)
      )
        for (let _t = 0; _t < U.mipmaps.length; _t++)
          st(ht.__webglFramebuffer[_t], V, U, n.COLOR_ATTACHMENT0, ft, _t);
      else st(ht.__webglFramebuffer, V, U, n.COLOR_ATTACHMENT0, ft, 0);
      (p(U) && g(ft), e.unbindTexture());
    }
    V.depthBuffer && D(V);
  }
  function ut(V) {
    const U = V.textures;
    for (let ht = 0, lt = U.length; ht < lt; ht++) {
      const O = U[ht];
      if (p(O)) {
        const Y = y(V),
          gt = s.get(O).__webglTexture;
        (e.bindTexture(Y, gt), g(Y), e.unbindTexture());
      }
    }
  }
  const N = [],
    J = [];
  function Z(V) {
    if (V.samples > 0) {
      if (j(V) === !1) {
        const U = V.textures,
          ht = V.width,
          lt = V.height;
        let O = n.COLOR_BUFFER_BIT;
        const Y = V.stencilBuffer ? n.DEPTH_STENCIL_ATTACHMENT : n.DEPTH_ATTACHMENT,
          gt = s.get(V),
          ft = U.length > 1;
        if (ft)
          for (let Dt = 0; Dt < U.length; Dt++)
            (e.bindFramebuffer(n.FRAMEBUFFER, gt.__webglMultisampledFramebuffer),
              n.framebufferRenderbuffer(n.FRAMEBUFFER, n.COLOR_ATTACHMENT0 + Dt, n.RENDERBUFFER, null),
              e.bindFramebuffer(n.FRAMEBUFFER, gt.__webglFramebuffer),
              n.framebufferTexture2D(n.DRAW_FRAMEBUFFER, n.COLOR_ATTACHMENT0 + Dt, n.TEXTURE_2D, null, 0));
        e.bindFramebuffer(n.READ_FRAMEBUFFER, gt.__webglMultisampledFramebuffer);
        const _t = V.texture.mipmaps;
        _t && _t.length > 0
          ? e.bindFramebuffer(n.DRAW_FRAMEBUFFER, gt.__webglFramebuffer[0])
          : e.bindFramebuffer(n.DRAW_FRAMEBUFFER, gt.__webglFramebuffer);
        for (let Dt = 0; Dt < U.length; Dt++) {
          if (
            (V.resolveDepthBuffer &&
              (V.depthBuffer && (O |= n.DEPTH_BUFFER_BIT),
              V.stencilBuffer && V.resolveStencilBuffer && (O |= n.STENCIL_BUFFER_BIT)),
            ft)
          ) {
            n.framebufferRenderbuffer(
              n.READ_FRAMEBUFFER,
              n.COLOR_ATTACHMENT0,
              n.RENDERBUFFER,
              gt.__webglColorRenderbuffer[Dt],
            );
            const zt = s.get(U[Dt]).__webglTexture;
            n.framebufferTexture2D(n.DRAW_FRAMEBUFFER, n.COLOR_ATTACHMENT0, n.TEXTURE_2D, zt, 0);
          }
          (n.blitFramebuffer(0, 0, ht, lt, 0, 0, ht, lt, O, n.NEAREST),
            l === !0 &&
              ((N.length = 0),
              (J.length = 0),
              N.push(n.COLOR_ATTACHMENT0 + Dt),
              V.depthBuffer &&
                V.resolveDepthBuffer === !1 &&
                (N.push(Y), J.push(Y), n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER, J)),
              n.invalidateFramebuffer(n.READ_FRAMEBUFFER, N)));
        }
        if ((e.bindFramebuffer(n.READ_FRAMEBUFFER, null), e.bindFramebuffer(n.DRAW_FRAMEBUFFER, null), ft))
          for (let Dt = 0; Dt < U.length; Dt++) {
            (e.bindFramebuffer(n.FRAMEBUFFER, gt.__webglMultisampledFramebuffer),
              n.framebufferRenderbuffer(
                n.FRAMEBUFFER,
                n.COLOR_ATTACHMENT0 + Dt,
                n.RENDERBUFFER,
                gt.__webglColorRenderbuffer[Dt],
              ));
            const zt = s.get(U[Dt]).__webglTexture;
            (e.bindFramebuffer(n.FRAMEBUFFER, gt.__webglFramebuffer),
              n.framebufferTexture2D(n.DRAW_FRAMEBUFFER, n.COLOR_ATTACHMENT0 + Dt, n.TEXTURE_2D, zt, 0));
          }
        e.bindFramebuffer(n.DRAW_FRAMEBUFFER, gt.__webglMultisampledFramebuffer);
      } else if (V.depthBuffer && V.resolveDepthBuffer === !1 && l) {
        const U = V.stencilBuffer ? n.DEPTH_STENCIL_ATTACHMENT : n.DEPTH_ATTACHMENT;
        n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER, [U]);
      }
    }
  }
  function ot(V) {
    return Math.min(i.maxSamples, V.samples);
  }
  function j(V) {
    const U = s.get(V);
    return (
      V.samples > 0 && t.has("WEBGL_multisampled_render_to_texture") === !0 && U.__useRenderToTexture !== !1
    );
  }
  function at(V) {
    const U = o.render.frame;
    f.get(V) !== U && (f.set(V, U), V.update());
  }
  function Rt(V, U) {
    const ht = V.colorSpace,
      lt = V.format,
      O = V.type;
    return (
      V.isCompressedTexture === !0 ||
        V.isVideoTexture === !0 ||
        (ht !== Ul &&
          ht !== Ki &&
          (In.getTransfer(ht) === jn
            ? (lt !== Gs || O !== mi) &&
              console.warn(
                "THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.",
              )
            : console.error("THREE.WebGLTextures: Unsupported texture color space:", ht))),
      U
    );
  }
  function kt(V) {
    return (
      typeof HTMLImageElement < "u" && V instanceof HTMLImageElement
        ? ((c.width = V.naturalWidth || V.width), (c.height = V.naturalHeight || V.height))
        : typeof VideoFrame < "u" && V instanceof VideoFrame
          ? ((c.width = V.displayWidth), (c.height = V.displayHeight))
          : ((c.width = V.width), (c.height = V.height)),
      c
    );
  }
  ((this.allocateTextureUnit = C),
    (this.resetTextureUnits = A),
    (this.setTexture2D = I),
    (this.setTexture2DArray = P),
    (this.setTexture3D = F),
    (this.setTextureCube = L),
    (this.rebindTextures = Q),
    (this.setupRenderTarget = $),
    (this.updateRenderTargetMipmap = ut),
    (this.updateMultisampleRenderTarget = Z),
    (this.setupDepthRenderbuffer = D),
    (this.setupFrameBufferTexture = st),
    (this.useMultisampledRTT = j));
}

function ZC(n, t) {
  function e(s, i = Ki) {
    let a;
    const o = In.getTransfer(i);
    if (s === mi) return n.UNSIGNED_BYTE;
    if (s === j3) return n.UNSIGNED_SHORT_4_4_4_4;
    if (s === q3) return n.UNSIGNED_SHORT_5_5_5_1;
    if (s === lM) return n.UNSIGNED_INT_5_9_9_9_REV;
    if (s === cM) return n.UNSIGNED_INT_10F_11F_11F_REV;
    if (s === oM) return n.BYTE;
    if (s === rM) return n.SHORT;
    if (s === gh) return n.UNSIGNED_SHORT;
    if (s === W3) return n.INT;
    if (s === Fl) return n.UNSIGNED_INT;
    if (s === fo) return n.FLOAT;
    if (s === Dr) return n.HALF_FLOAT;
    if (s === fM) return n.ALPHA;
    if (s === dM) return n.RGB;
    if (s === Gs) return n.RGBA;
    if (s === yh) return n.DEPTH_COMPONENT;
    if (s === vh) return n.DEPTH_STENCIL;
    if (s === X3) return n.RED;
    if (s === Y3) return n.RED_INTEGER;
    if (s === hM) return n.RG;
    if (s === K3) return n.RG_INTEGER;
    if (s === Z3) return n.RGBA_INTEGER;
    if (s === l1 || s === c1 || s === f1 || s === d1)
      if (o === jn)
        if (((a = t.get("WEBGL_compressed_texture_s3tc_srgb")), a !== null)) {
          if (s === l1) return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (s === c1) return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (s === f1) return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (s === d1) return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else return null;
      else if (((a = t.get("WEBGL_compressed_texture_s3tc")), a !== null)) {
        if (s === l1) return a.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (s === c1) return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (s === f1) return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (s === d1) return a.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else return null;
    if (s === M5 || s === k5 || s === S5 || s === T5)
      if (((a = t.get("WEBGL_compressed_texture_pvrtc")), a !== null)) {
        if (s === M5) return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (s === k5) return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (s === S5) return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (s === T5) return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else return null;
    if (s === E5 || s === A5 || s === R5)
      if (((a = t.get("WEBGL_compressed_texture_etc")), a !== null)) {
        if (s === E5 || s === A5) return o === jn ? a.COMPRESSED_SRGB8_ETC2 : a.COMPRESSED_RGB8_ETC2;
        if (s === R5) return o === jn ? a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : a.COMPRESSED_RGBA8_ETC2_EAC;
      } else return null;
    if (
      s === C5 ||
      s === L5 ||
      s === I5 ||
      s === P5 ||
      s === D5 ||
      s === z5 ||
      s === N5 ||
      s === F5 ||
      s === U5 ||
      s === O5 ||
      s === B5 ||
      s === H5 ||
      s === $5 ||
      s === G5
    )
      if (((a = t.get("WEBGL_compressed_texture_astc")), a !== null)) {
        if (s === C5)
          return o === jn ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : a.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (s === L5)
          return o === jn ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : a.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (s === I5)
          return o === jn ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : a.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (s === P5)
          return o === jn ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : a.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (s === D5)
          return o === jn ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : a.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (s === z5)
          return o === jn ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : a.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (s === N5)
          return o === jn ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : a.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (s === F5)
          return o === jn ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : a.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (s === U5)
          return o === jn ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : a.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (s === O5)
          return o === jn ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : a.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (s === B5)
          return o === jn ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : a.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (s === H5)
          return o === jn ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : a.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (s === $5)
          return o === jn ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : a.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (s === G5)
          return o === jn ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : a.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else return null;
    if (s === V5 || s === W5 || s === j5)
      if (((a = t.get("EXT_texture_compression_bptc")), a !== null)) {
        if (s === V5)
          return o === jn ? a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : a.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (s === W5) return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (s === j5) return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else return null;
    if (s === q5 || s === X5 || s === Y5 || s === K5)
      if (((a = t.get("EXT_texture_compression_rgtc")), a !== null)) {
        if (s === q5) return a.COMPRESSED_RED_RGTC1_EXT;
        if (s === X5) return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (s === Y5) return a.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (s === K5) return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else return null;
    return s === xh ? n.UNSIGNED_INT_24_8 : n[s] !== void 0 ? n[s] : null;
  }
  return { convert: e };
}

const QC = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`,
  JC = `
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;

class tL {
  constructor() {
    ((this.texture = null), (this.mesh = null), (this.depthNear = 0), (this.depthFar = 0));
  }
  init(t, e) {
    if (this.texture === null) {
      const s = new TM(t.texture);
      ((t.depthNear !== e.depthNear || t.depthFar !== e.depthFar) &&
        ((this.depthNear = t.depthNear), (this.depthFar = t.depthFar)),
        (this.texture = s));
    }
  }
  getMesh(t) {
    if (this.texture !== null && this.mesh === null) {
      const e = t.cameras[0].viewport,
        s = new An({
          vertexShader: QC,
          fragmentShader: JC,
          uniforms: {
            depthColor: { value: this.texture },
            depthWidth: { value: e.z },
            depthHeight: { value: e.w },
          },
        });
      this.mesh = new Sn(new Gl(20, 20), s);
    }
    return this.mesh;
  }
  reset() {
    ((this.texture = null), (this.mesh = null));
  }
  getDepthTexture() {
    return this.texture;
  }
}

class eL extends Af {
  constructor(t, e) {
    super();
    const s = this;
    let i = null,
      a = 1,
      o = null,
      r = "local-floor",
      l = 1,
      c = null,
      f = null,
      d = null,
      h = null,
      u = null,
      m = null;
    const x = typeof XRWebGLBinding < "u",
      p = new tL(),
      g = {},
      y = e.getContextAttributes();
    let v = null,
      _ = null;
    const k = [],
      M = [],
      S = new Ee();
    let b = null;
    const w = new Yi();
    w.viewport = new kn();
    const T = new Yi();
    T.viewport = new kn();
    const E = [w, T],
      A = new _E();
    let C = null,
      R = null;
    ((this.cameraAutoUpdate = !0),
      (this.enabled = !1),
      (this.isPresenting = !1),
      (this.getController = function (nt) {
        let H = k[nt];
        return (H === void 0 && ((H = new Rg()), (k[nt] = H)), H.getTargetRaySpace());
      }),
      (this.getControllerGrip = function (nt) {
        let H = k[nt];
        return (H === void 0 && ((H = new Rg()), (k[nt] = H)), H.getGripSpace());
      }),
      (this.getHand = function (nt) {
        let H = k[nt];
        return (H === void 0 && ((H = new Rg()), (k[nt] = H)), H.getHandSpace());
      }));
    function I(nt) {
      const H = M.indexOf(nt.inputSource);
      if (H === -1) return;
      const st = k[H];
      st !== void 0 &&
        (st.update(nt.inputSource, nt.frame, c || o),
        st.dispatchEvent({ type: nt.type, data: nt.inputSource }));
    }
    function P() {
      (i.removeEventListener("select", I),
        i.removeEventListener("selectstart", I),
        i.removeEventListener("selectend", I),
        i.removeEventListener("squeeze", I),
        i.removeEventListener("squeezestart", I),
        i.removeEventListener("squeezeend", I),
        i.removeEventListener("end", P),
        i.removeEventListener("inputsourceschange", F));
      for (let nt = 0; nt < k.length; nt++) {
        const H = M[nt];
        H !== null && ((M[nt] = null), k[nt].disconnect(H));
      }
      ((C = null), (R = null), p.reset());
      for (const nt in g) delete g[nt];
      (t.setRenderTarget(v),
        (u = null),
        (h = null),
        (d = null),
        (i = null),
        (_ = null),
        mt.stop(),
        (s.isPresenting = !1),
        t.setPixelRatio(b),
        t.setSize(S.width, S.height, !1),
        s.dispatchEvent({ type: "sessionend" }));
    }
    ((this.setFramebufferScaleFactor = function (nt) {
      ((a = nt),
        s.isPresenting === !0 &&
          console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting."));
    }),
      (this.setReferenceSpaceType = function (nt) {
        ((r = nt),
          s.isPresenting === !0 &&
            console.warn("THREE.WebXRManager: Cannot change reference space type while presenting."));
      }),
      (this.getReferenceSpace = function () {
        return c || o;
      }),
      (this.setReferenceSpace = function (nt) {
        c = nt;
      }),
      (this.getBaseLayer = function () {
        return h !== null ? h : u;
      }),
      (this.getBinding = function () {
        return (d === null && x && (d = new XRWebGLBinding(i, e)), d);
      }),
      (this.getFrame = function () {
        return m;
      }),
      (this.getSession = function () {
        return i;
      }),
      (this.setSession = async function (nt) {
        if (((i = nt), i !== null)) {
          if (
            ((v = t.getRenderTarget()),
            i.addEventListener("select", I),
            i.addEventListener("selectstart", I),
            i.addEventListener("selectend", I),
            i.addEventListener("squeeze", I),
            i.addEventListener("squeezestart", I),
            i.addEventListener("squeezeend", I),
            i.addEventListener("end", P),
            i.addEventListener("inputsourceschange", F),
            y.xrCompatible !== !0 && (await e.makeXRCompatible()),
            (b = t.getPixelRatio()),
            t.getSize(S),
            x && "createProjectionLayer" in XRWebGLBinding.prototype)
          ) {
            let st = null,
              tt = null,
              it = null;
            y.depth &&
              ((it = y.stencil ? e.DEPTH24_STENCIL8 : e.DEPTH_COMPONENT24),
              (st = y.stencil ? vh : yh),
              (tt = y.stencil ? xh : Fl));
            const D = { colorFormat: e.RGBA8, depthFormat: it, scaleFactor: a };
            ((d = this.getBinding()),
              (h = d.createProjectionLayer(D)),
              i.updateRenderState({ layers: [h] }),
              t.setPixelRatio(1),
              t.setSize(h.textureWidth, h.textureHeight, !1),
              (_ = new go(h.textureWidth, h.textureHeight, {
                format: Gs,
                type: mi,
                depthTexture: new SM(
                  h.textureWidth,
                  h.textureHeight,
                  tt,
                  void 0,
                  void 0,
                  void 0,
                  void 0,
                  void 0,
                  void 0,
                  st,
                ),
                stencilBuffer: y.stencil,
                colorSpace: t.outputColorSpace,
                samples: y.antialias ? 4 : 0,
                resolveDepthBuffer: h.ignoreDepthValues === !1,
                resolveStencilBuffer: h.ignoreDepthValues === !1,
              })));
          } else {
            const st = {
              antialias: y.antialias,
              alpha: !0,
              depth: y.depth,
              stencil: y.stencil,
              framebufferScaleFactor: a,
            };
            ((u = new XRWebGLLayer(i, e, st)),
              i.updateRenderState({ baseLayer: u }),
              t.setPixelRatio(1),
              t.setSize(u.framebufferWidth, u.framebufferHeight, !1),
              (_ = new go(u.framebufferWidth, u.framebufferHeight, {
                format: Gs,
                type: mi,
                colorSpace: t.outputColorSpace,
                stencilBuffer: y.stencil,
                resolveDepthBuffer: u.ignoreDepthValues === !1,
                resolveStencilBuffer: u.ignoreDepthValues === !1,
              })));
          }
          ((_.isXRRenderTarget = !0),
            this.setFoveation(l),
            (c = null),
            (o = await i.requestReferenceSpace(r)),
            mt.setContext(i),
            mt.start(),
            (s.isPresenting = !0),
            s.dispatchEvent({ type: "sessionstart" }));
        }
      }),
      (this.getEnvironmentBlendMode = function () {
        if (i !== null) return i.environmentBlendMode;
      }),
      (this.getDepthTexture = function () {
        return p.getDepthTexture();
      }));
    function F(nt) {
      for (let H = 0; H < nt.removed.length; H++) {
        const st = nt.removed[H],
          tt = M.indexOf(st);
        tt >= 0 && ((M[tt] = null), k[tt].disconnect(st));
      }
      for (let H = 0; H < nt.added.length; H++) {
        const st = nt.added[H];
        let tt = M.indexOf(st);
        if (tt === -1) {
          for (let D = 0; D < k.length; D++)
            if (D >= M.length) {
              (M.push(st), (tt = D));
              break;
            } else if (M[D] === null) {
              ((M[D] = st), (tt = D));
              break;
            }
          if (tt === -1) break;
        }
        const it = k[tt];
        it && it.connect(st);
      }
    }
    const L = new dt(),
      B = new dt();
    function G(nt, H, st) {
      (L.setFromMatrixPosition(H.matrixWorld), B.setFromMatrixPosition(st.matrixWorld));
      const tt = L.distanceTo(B),
        it = H.projectionMatrix.elements,
        D = st.projectionMatrix.elements,
        Q = it[14] / (it[10] - 1),
        $ = it[14] / (it[10] + 1),
        ut = (it[9] + 1) / it[5],
        N = (it[9] - 1) / it[5],
        J = (it[8] - 1) / it[0],
        Z = (D[8] + 1) / D[0],
        ot = Q * J,
        j = Q * Z,
        at = tt / (-J + Z),
        Rt = at * -J;
      if (
        (H.matrixWorld.decompose(nt.position, nt.quaternion, nt.scale),
        nt.translateX(Rt),
        nt.translateZ(at),
        nt.matrixWorld.compose(nt.position, nt.quaternion, nt.scale),
        nt.matrixWorldInverse.copy(nt.matrixWorld).invert(),
        it[10] === -1)
      )
        (nt.projectionMatrix.copy(H.projectionMatrix),
          nt.projectionMatrixInverse.copy(H.projectionMatrixInverse));
      else {
        const kt = Q + at,
          V = $ + at,
          U = ot - Rt,
          ht = j + (tt - Rt),
          lt = ((ut * $) / V) * kt,
          O = ((N * $) / V) * kt;
        (nt.projectionMatrix.makePerspective(U, ht, lt, O, kt, V),
          nt.projectionMatrixInverse.copy(nt.projectionMatrix).invert());
      }
    }
    function q(nt, H) {
      (H === null
        ? nt.matrixWorld.copy(nt.matrix)
        : nt.matrixWorld.multiplyMatrices(H.matrixWorld, nt.matrix),
        nt.matrixWorldInverse.copy(nt.matrixWorld).invert());
    }
    this.updateCamera = function (nt) {
      if (i === null) return;
      let H = nt.near,
        st = nt.far;
      (p.texture !== null && (p.depthNear > 0 && (H = p.depthNear), p.depthFar > 0 && (st = p.depthFar)),
        (A.near = T.near = w.near = H),
        (A.far = T.far = w.far = st),
        (C !== A.near || R !== A.far) &&
          (i.updateRenderState({ depthNear: A.near, depthFar: A.far }), (C = A.near), (R = A.far)),
        (A.layers.mask = nt.layers.mask | 6),
        (w.layers.mask = A.layers.mask & 3),
        (T.layers.mask = A.layers.mask & 5));
      const tt = nt.parent,
        it = A.cameras;
      q(A, tt);
      for (let D = 0; D < it.length; D++) q(it[D], tt);
      (it.length === 2 ? G(A, w, T) : A.projectionMatrix.copy(w.projectionMatrix), et(nt, A, tt));
    };
    function et(nt, H, st) {
      (st === null
        ? nt.matrix.copy(H.matrixWorld)
        : (nt.matrix.copy(st.matrixWorld), nt.matrix.invert(), nt.matrix.multiply(H.matrixWorld)),
        nt.matrix.decompose(nt.position, nt.quaternion, nt.scale),
        nt.updateMatrixWorld(!0),
        nt.projectionMatrix.copy(H.projectionMatrix),
        nt.projectionMatrixInverse.copy(H.projectionMatrixInverse),
        nt.isPerspectiveCamera &&
          ((nt.fov = Q5 * 2 * Math.atan(1 / nt.projectionMatrix.elements[5])), (nt.zoom = 1)));
    }
    ((this.getCamera = function () {
      return A;
    }),
      (this.getFoveation = function () {
        if (!(h === null && u === null)) return l;
      }),
      (this.setFoveation = function (nt) {
        ((l = nt),
          h !== null && (h.fixedFoveation = nt),
          u !== null && u.fixedFoveation !== void 0 && (u.fixedFoveation = nt));
      }),
      (this.hasDepthSensing = function () {
        return p.texture !== null;
      }),
      (this.getDepthSensingMesh = function () {
        return p.getMesh(A);
      }),
      (this.getCameraTexture = function (nt) {
        return g[nt];
      }));
    let ct = null;
    function rt(nt, H) {
      if (((f = H.getViewerPose(c || o)), (m = H), f !== null)) {
        const st = f.views;
        u !== null && (t.setRenderTargetFramebuffer(_, u.framebuffer), t.setRenderTarget(_));
        let tt = !1;
        st.length !== A.cameras.length && ((A.cameras.length = 0), (tt = !0));
        for (let $ = 0; $ < st.length; $++) {
          const ut = st[$];
          let N = null;
          if (u !== null) N = u.getViewport(ut);
          else {
            const Z = d.getViewSubImage(h, ut);
            ((N = Z.viewport),
              $ === 0 &&
                (t.setRenderTargetTextures(_, Z.colorTexture, Z.depthStencilTexture), t.setRenderTarget(_)));
          }
          let J = E[$];
          (J === void 0 && ((J = new Yi()), J.layers.enable($), (J.viewport = new kn()), (E[$] = J)),
            J.matrix.fromArray(ut.transform.matrix),
            J.matrix.decompose(J.position, J.quaternion, J.scale),
            J.projectionMatrix.fromArray(ut.projectionMatrix),
            J.projectionMatrixInverse.copy(J.projectionMatrix).invert(),
            J.viewport.set(N.x, N.y, N.width, N.height),
            $ === 0 && (A.matrix.copy(J.matrix), A.matrix.decompose(A.position, A.quaternion, A.scale)),
            tt === !0 && A.cameras.push(J));
        }
        const it = i.enabledFeatures;
        if (it && it.includes("depth-sensing") && i.depthUsage == "gpu-optimized" && x) {
          d = s.getBinding();
          const $ = d.getDepthInformation(st[0]);
          $ && $.isValid && $.texture && p.init($, i.renderState);
        }
        if (it && it.includes("camera-access") && x) {
          (t.state.unbindTexture(), (d = s.getBinding()));
          for (let $ = 0; $ < st.length; $++) {
            const ut = st[$].camera;
            if (ut) {
              let N = g[ut];
              N || ((N = new TM()), (g[ut] = N));
              const J = d.getCameraImage(ut);
              N.sourceTexture = J;
            }
          }
        }
      }
      for (let st = 0; st < k.length; st++) {
        const tt = M[st],
          it = k[st];
        tt !== null && it !== void 0 && it.update(tt, H, c || o);
      }
      (ct && ct(nt, H), H.detectedPlanes && s.dispatchEvent({ type: "planesdetected", data: H }), (m = null));
    }
    const mt = new zM();
    (mt.setAnimationLoop(rt),
      (this.setAnimationLoop = function (nt) {
        ct = nt;
      }),
      (this.dispose = function () {}));
  }
}

const Z0 = new sa(),
  nL = new Ke();
export { KC, ZC, eL, Z0, nL };
