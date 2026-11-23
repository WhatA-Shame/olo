// 16-render-5.js — render｜32 个顶层语句｜62KB
// 对应 game.pretty.js 第 29692–31757 行
// 关键内容：
//   uI                    钳位：个别极亮的像素(高光/特效核心)不至于在降采样后
//   yI                    对比：幂函数式，围绕支点(线性值)拉开；纯黑不动，暗部
//   DI                    不可用
//   gx                    遮挡部分(权重 1 - fxAdd)与叠加部分(权重
//   bI                    moba.scene
//   _I                    EXT_color_buffer_float
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { Cr, Dr, Ee, Fh, Fo, Gs, Ki, Ns, P1, V3, b0, co, mi, mo, ri } from './04-audio-2.js';
import { J3, dt, go } from './05-three.js';
import { Ut } from './06-three-2.js';
import { Ae, An, Bn, Ji, Sn, g0, tx, wM, zr } from './07-three-3.js';
import { gE } from './08-three-4.js';
import { $M, Yt, cx, k0, ke, oL, rL, un } from './14-three-7.js';
import { Uf, WL, XL, YL, dI, dL, hI, iI, jM, kL, px, sI } from './15-render-4.js';

const uI = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,
  pI = `
uniform sampler2D tDiffuse;
uniform vec2 uTexel;
uniform vec2 uThreshold;
varying vec2 vUv;
void main() {
  vec3 c = texture2D(tDiffuse, vUv + uTexel * vec2(-1.0, -1.0)).rgb
         + texture2D(tDiffuse, vUv + uTexel * vec2(1.0, -1.0)).rgb
         + texture2D(tDiffuse, vUv + uTexel * vec2(-1.0, 1.0)).rgb
         + texture2D(tDiffuse, vUv + uTexel * vec2(1.0, 1.0)).rgb;
  c *= 0.25;
  // 钳位：个别极亮的像素(高光/特效核心)不至于在降采样后炸成一大团
  c = min(c, vec3(12.0));
  float br = max(c.r, max(c.g, c.b));
  // 软拐点：阈值附近平滑过渡，避免高亮边缘闪烁
  float knee = uThreshold.y;
  float soft = clamp(br - uThreshold.x + knee, 0.0, 2.0 * knee);
  soft = soft * soft / (4.0 * knee + 1e-4);
  float w = max(soft, br - uThreshold.x) / max(br, 1e-4);
  gl_FragColor = vec4(c * w, 1.0);
}
`,
  mI = `
uniform sampler2D tDiffuse;
uniform vec2 uTexel;
varying vec2 vUv;
void main() {
  vec3 c = texture2D(tDiffuse, vUv).rgb * 4.0;
  c += texture2D(tDiffuse, vUv + uTexel * vec2(-1.0, -1.0)).rgb;
  c += texture2D(tDiffuse, vUv + uTexel * vec2(1.0, -1.0)).rgb;
  c += texture2D(tDiffuse, vUv + uTexel * vec2(-1.0, 1.0)).rgb;
  c += texture2D(tDiffuse, vUv + uTexel * vec2(1.0, 1.0)).rgb;
  gl_FragColor = vec4(c * 0.125, 1.0);
}
`,
  gI = `
uniform sampler2D tDiffuse;
uniform sampler2D tBase;
uniform vec2 uTexel;
uniform float uSpread;
uniform vec2 uWeight;
varying vec2 vUv;
void main() {
  vec2 d = uTexel * uSpread;
  vec3 c = texture2D(tDiffuse, vUv + vec2(-d.x * 2.0, 0.0)).rgb;
  c += texture2D(tDiffuse, vUv + vec2(d.x * 2.0, 0.0)).rgb;
  c += texture2D(tDiffuse, vUv + vec2(0.0, -d.y * 2.0)).rgb;
  c += texture2D(tDiffuse, vUv + vec2(0.0, d.y * 2.0)).rgb;
  c += texture2D(tDiffuse, vUv + vec2(-d.x, d.y)).rgb * 2.0;
  c += texture2D(tDiffuse, vUv + vec2(d.x, d.y)).rgb * 2.0;
  c += texture2D(tDiffuse, vUv + vec2(-d.x, -d.y)).rgb * 2.0;
  c += texture2D(tDiffuse, vUv + vec2(d.x, -d.y)).rgb * 2.0;
  gl_FragColor = vec4(c * (uWeight.x / 12.0) + texture2D(tBase, vUv).rgb * uWeight.y, 1.0);
}
`,
  Hg = 6,
  gb = [1, 0.85, 0.6, 0.4, 0.25, 0.15];

class xI extends Uf {
  threshold = new Ee(1.35, 0.25);
  levels = 5;
  onBegin = null;
  down = [];
  up = [];
  quad = new px();
  prefilter;
  downMat;
  upMat;
  black;
  constructor() {
    (super(), (this.needsSwap = !1));
    const t = (e, s) =>
      new An({
        vertexShader: uI,
        fragmentShader: e,
        uniforms: s,
        depthTest: !1,
        depthWrite: !1,
        toneMapped: !1,
      });
    ((this.prefilter = t(pI, {
      tDiffuse: { value: null },
      uTexel: { value: new Ee() },
      uThreshold: { value: this.threshold },
    })),
      (this.downMat = t(mI, { tDiffuse: { value: null }, uTexel: { value: new Ee() } })),
      (this.upMat = t(gI, {
        tDiffuse: { value: null },
        tBase: { value: null },
        uTexel: { value: new Ee() },
        uSpread: { value: 1 },
        uWeight: { value: new Ee(1, 1) },
      })),
      (this.black = new zr(new Uint8Array([0, 0, 0, 255]), 1, 1)),
      (this.black.needsUpdate = !0));
    for (let e = 0; e < Hg; e++) (this.down.push(this.makeTarget()), this.up.push(this.makeTarget()));
  }
  makeTarget() {
    const t = new go(4, 4, { type: Dr, depthBuffer: !1, magFilter: Ns, minFilter: Ns });
    return ((t.texture.generateMipmaps = !1), t);
  }
  get precompileSet() {
    return { materials: [this.prefilter, this.downMat, this.upMat], target: this.down[0] };
  }
  get texture() {
    return this.enabled ? this.up[0].texture : this.black;
  }
  setSize(t, e) {
    let s = Math.max(2, Math.round(t / 2)),
      i = Math.max(2, Math.round(e / 2));
    for (let a = 0; a < Hg; a++)
      (this.down[a].setSize(s, i),
        this.up[a].setSize(s, i),
        (s = Math.max(2, Math.round(s / 2))),
        (i = Math.max(2, Math.round(i / 2))));
  }
  render(t, e, s) {
    this.onBegin?.();
    const i = Math.min(Hg, Math.max(2, this.levels)),
      a = this.quad;
    ((a.material = this.prefilter),
      (this.prefilter.uniforms.tDiffuse.value = s.texture),
      this.prefilter.uniforms.uTexel.value.set(0.5 / s.width, 0.5 / s.height),
      t.setRenderTarget(this.down[0]),
      a.render(t),
      (a.material = this.downMat));
    for (let r = 1; r < i; r++) {
      const l = this.down[r - 1];
      ((this.downMat.uniforms.tDiffuse.value = l.texture),
        this.downMat.uniforms.uTexel.value.set(1 / l.width, 1 / l.height),
        t.setRenderTarget(this.down[r]),
        a.render(t));
    }
    a.material = this.upMat;
    let o = this.down[i - 1];
    for (let r = i - 2; r >= 0; r--)
      ((this.upMat.uniforms.tDiffuse.value = o.texture),
        (this.upMat.uniforms.tBase.value = this.down[r].texture),
        this.upMat.uniforms.uTexel.value.set(0.5 / o.width, 0.5 / o.height),
        this.upMat.uniforms.uWeight.value.set(r === i - 2 ? gb[i - 1] : 1, gb[r]),
        t.setRenderTarget(this.up[r]),
        a.render(t),
        (o = this.up[r]));
    t.setRenderTarget(null);
  }
  dispose() {
    for (const t of this.down) t.dispose();
    for (const t of this.up) t.dispose();
    (this.prefilter.dispose(),
      this.downMat.dispose(),
      this.upMat.dispose(),
      this.black.dispose(),
      this.quad.dispose());
  }
}

const yI = `
precision highp float;
uniform sampler2D tDiffuse;
uniform sampler2D tBloom;
uniform float uBloom;
uniform float uSaturation;
uniform float uVibrance;
uniform vec2 uContrast;
uniform float uVignette;
uniform float uAspect;
uniform vec3 uShadowTint;
uniform vec3 uHighlightTint;
uniform float uHaze;
uniform vec3 uHazeColor;
uniform float uDesaturate;
uniform float uDim;
#include <tonemapping_pars_fragment>
#include <colorspace_pars_fragment>
varying vec2 vUv;
float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
void main() {
  vec3 c = texture2D(tDiffuse, vUv).rgb;
  c += texture2D(tBloom, vUv).rgb * uBloom;
  c = CustomToneMapping(c);
  #ifdef GRADE
  // 对比：幂函数式，围绕支点(线性值)拉开；纯黑不动，暗部不会被整体减掉一截
  c = uContrast.y * pow(max(c, 0.0) / uContrast.y, vec3(uContrast.x));
  // 饱和 + 自然饱和
  float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
  float mx = max(c.r, max(c.g, c.b));
  float mn = min(c.r, min(c.g, c.b));
  float sat = (mx - mn) / max(mx, 1e-4);
  c = max(mix(vec3(l), c, uSaturation + uVibrance * (1.0 - sat)), 0.0);
  // 色彩分离：暗部偏青紫、亮部偏暖
  float lc = clamp(l, 0.0, 1.0);
  c += uShadowTint * (1.0 - lc) * (1.0 - lc) + uHighlightTint * lc * lc;
  // 远景薄霾：屏幕上沿就是远处，给一点冷亮的空气感
  float hz = smoothstep(0.55, 1.0, vUv.y);
  c = mix(c, uHazeColor, uHaze * hz * sqrt(hz));
  vec2 q = (vUv - 0.5) * vec2(min(uAspect, 1.8) / 1.8, 1.0);
  float v = smoothstep(0.38, 0.95, length(q));
  c *= 1.0 - uVignette * v * v;
  #endif
  float g = dot(max(c, 0.0), vec3(0.2126, 0.7152, 0.0722));
  c = mix(c, vec3(g) * vec3(0.92, 0.97, 1.08), uDesaturate);
  c *= 1.0 - uDim;
  gl_FragColor = sRGBTransferOETF(vec4(clamp(c, 0.0, 1.0), 1.0));
  // 抖动：消除大面积渐变(雾/暗角/云海)的色带
  gl_FragColor.rgb += (hash(gl_FragCoord.xy) - 0.5) / 255.0;
}
`;

class vI extends Uf {
  material;
  quad;
  bloom;
  grade;
  gradeOn = !0;
  onBegin = null;
  constructor(t, e) {
    (super(),
      (this.bloom = t),
      (this.grade = e),
      (this.material = new gE({
        vertexShader: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `,
        fragmentShader: yI,
        uniforms: {
          tDiffuse: { value: null },
          tBloom: { value: null },
          toneMappingExposure: { value: 1 },
          uBloom: { value: 0 },
          uSaturation: { value: 1 },
          uVibrance: { value: 0 },
          uContrast: { value: new Ee(1, 0.148) },
          uVignette: { value: 0 },
          uAspect: { value: 1 },
          uShadowTint: { value: e.shadowTint },
          uHighlightTint: { value: e.highlightTint },
          uHaze: { value: 0 },
          uHazeColor: { value: e.hazeColor },
          uDesaturate: { value: 0 },
          uDim: { value: 0 },
        },
        defines: { GRADE: "" },
        depthTest: !1,
        depthWrite: !1,
      })),
      (this.quad = new px(this.material)));
  }
  setGradeEnabled(t) {
    t !== this.gradeOn &&
      ((this.gradeOn = t),
      t ? (this.material.defines.GRADE = "") : delete this.material.defines.GRADE,
      (this.material.needsUpdate = !0));
  }
  render(t, e, s) {
    this.onBegin?.();
    const i = this.material.uniforms,
      a = this.grade;
    ((i.tDiffuse.value = s.texture),
      (i.tBloom.value = this.bloom.texture),
      (i.toneMappingExposure.value = a.exposure),
      (i.uBloom.value = this.bloom.enabled ? a.bloomStrength : 0),
      (i.uSaturation.value = a.saturation),
      (i.uVibrance.value = a.vibrance),
      i.uContrast.value.set(a.contrast, Math.pow(Math.max(0.02, a.pivot), 2.2)),
      (i.uVignette.value = a.vignette),
      (i.uAspect.value = s.width / Math.max(1, s.height)),
      (i.uHaze.value = a.haze),
      (i.uDesaturate.value = a.desaturate),
      (i.uDim.value = a.dim),
      t.setRenderTarget(this.renderToScreen ? null : e),
      this.quad.render(t));
  }
  dispose() {
    (this.material.dispose(), this.quad.dispose());
  }
}

class bI {
  composer;
  renderPass;
  bloomPass;
  finalPass;
  grade;
  target;
  set onPostBegin(t) {
    ((this.bloomPass.onBegin = t), (this.finalPass.onBegin = t));
  }
  constructor(t, e, s, i, a) {
    ((this.grade = i),
      (this.target = new go(4, 4, { type: Dr, samples: a.msaa, depthBuffer: !0, stencilBuffer: !1 })),
      (this.target.texture.name = "moba.scene"),
      (this.composer = new dI(t, this.target)),
      (this.renderPass = new hI(e, s)),
      (this.bloomPass = new xI()),
      (this.finalPass = new vI(this.bloomPass, i)),
      this.composer.addPass(this.renderPass),
      this.composer.addPass(this.bloomPass),
      this.composer.addPass(this.finalPass),
      this.applyQuality(a));
  }
  applyQuality(t) {
    ((this.bloomPass.enabled = t.bloom > 0),
      (this.bloomPass.levels = t.bloomLevels),
      (this.bloomPass.threshold.x = t.bloomThreshold),
      this.finalPass.setGradeEnabled(t.grade));
    for (const e of [this.composer.renderTarget1, this.composer.renderTarget2])
      e.samples !== t.msaa && ((e.samples = t.msaa), e.dispose());
  }
  setSize(t, e, s) {
    (this.composer.setPixelRatio(s), this.composer.setSize(t, e));
  }
  render(t) {
    this.composer.render(t);
  }
  get sceneTarget() {
    return this.composer.renderTarget1;
  }
  precompile(t, e) {
    const s = t.getRenderTarget(),
      i = new Bn();
    (i.setAttribute("position", new Ae([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)),
      i.setAttribute("uv", new Ae([0, 2, 0, 0, 2, 0], 2)));
    const a = new Sn(i, this.finalPass.material);
    a.frustumCulled = !1;
    const o = this.bloomPass.precompileSet;
    t.setRenderTarget(o.target);
    for (const r of o.materials) ((a.material = r), t.compile(a, e));
    (t.setRenderTarget(null),
      (a.material = this.finalPass.material),
      t.compile(a, e),
      t.setRenderTarget(s),
      i.dispose());
  }
  dispose() {
    (this.bloomPass.dispose(), this.finalPass.dispose(), this.composer.dispose(), this.target.dispose());
  }
}

function _I(n) {
  return (
    n.capabilities.isWebGL2 !== !1 &&
    (n.extensions.has("EXT_color_buffer_float") || n.extensions.has("EXT_color_buffer_half_float"))
  );
}

const xb = {
  low: {
    name: "low",
    dprCap: 1,
    shadows: !1,
    shadowMapSize: 0,
    post: !1,
    msaa: 0,
    bloom: 0,
    bloomLevels: 0,
    grade: !1,
    pointLights: 0,
    foliage: 0.5,
    groundDetail: 0,
    motes: 0.4,
    shadowType: "pcfsoft",
    shadowRadius: 1,
    haze: 0,
    bloomThreshold: 1.35,
    atmos: 0,
    waterDetail: 0,
    unitPatterns: !1,
    props: 0.5,
    sceneryRank: 1,
    shadowRank: 0,
  },
  medium: {
    name: "medium",
    dprCap: 1.5,
    shadows: !0,
    shadowMapSize: 1024,
    post: !0,
    msaa: 2,
    bloom: 0.4,
    bloomLevels: 4,
    grade: !0,
    pointLights: 2,
    foliage: 0.75,
    groundDetail: 1,
    motes: 0.7,
    shadowType: "pcfsoft",
    shadowRadius: 1,
    haze: 0.05,
    bloomThreshold: 1.35,
    atmos: 1,
    waterDetail: 1,
    unitPatterns: !0,
    props: 0.75,
    sceneryRank: 2,
    shadowRank: 0,
  },
  high: {
    name: "high",
    dprCap: 2,
    shadows: !0,
    shadowMapSize: 2048,
    post: !0,
    msaa: 4,
    bloom: 0.55,
    bloomLevels: 5,
    grade: !0,
    pointLights: 4,
    foliage: 1,
    groundDetail: 2,
    motes: 1,
    shadowType: "pcf",
    shadowRadius: 2,
    haze: 0.06,
    bloomThreshold: 1.35,
    atmos: 2,
    waterDetail: 2,
    unitPatterns: !0,
    props: 1,
    sceneryRank: 3,
    shadowRank: 3,
  },
};

function wI() {
  try {
    const n = document.createElement("canvas"),
      t = n.getContext("webgl2") ?? n.getContext("webgl");
    if (!t) return null;
    const e = t.getExtension("WEBGL_debug_renderer_info"),
      s = String(e ? t.getParameter(e.UNMASKED_RENDERER_WEBGL) : t.getParameter(t.RENDERER)).toLowerCase();
    return (t.getExtension("WEBGL_lose_context")?.loseContext(), s);
  } catch {
    return null;
  }
}

function MI() {
  if (typeof navigator > "u" || typeof document > "u") return "medium";
  const n = wI();
  if (n === null || /swiftshader|llvmpipe|software|basic render/.test(n)) return "low";
  const t = navigator.userAgent,
    e = typeof matchMedia == "function" && matchMedia("(pointer: coarse)").matches,
    s =
      /Android|iPhone|iPad|iPod|Mobile|HarmonyOS/i.test(t) ||
      (e && Math.min(screen.width, screen.height) < 900),
    i = navigator.deviceMemory ?? 8,
    a = navigator.hardwareConcurrency ?? 8;
  if (s) {
    const r = /adreno \(tm\) [3-5]\d\d|mali-4|mali-t|powervr/.test(n);
    return i <= 3 || a <= 4 || r ? "low" : "medium";
  }
  const o = /intel/.test(n) && !/arc/.test(n);
  return i <= 2 || a <= 2 || o ? "medium" : "high";
}

const ju = new J3(),
  Kr = new dt(),
  kI = new g0(new dt(0, 1, 0), 0);

let kh = null;

function mx(n) {
  try {
    return n.getContext().isContextLost();
  } catch {
    return !0;
  }
}

function SI() {
  const n = kh;
  if (((kh = null), n)) {
    if (!mx(n)) return n;
    n.dispose();
  }
  const t = new cx({ antialias: !0, alpha: !1, stencil: !1, depth: !0, powerPreference: "high-performance" });
  return ((t.info.autoReset = !1), t);
}

function TI(n) {
  const t = n.getContext();
  let e = null;
  try {
    ((e = typeof t.fenceSync == "function" ? t.fenceSync(t.SYNC_GPU_COMMANDS_COMPLETE, 0) : null), t.flush());
  } catch {
    e = null;
  }
  if (!e) return;
  let s = 0;
  const i = () => {
    if (kh !== n || mx(n)) return;
    const a = t.clientWaitSync(e, 0, 0);
    if (a === t.TIMEOUT_EXPIRED && ++s < 150) {
      window.setTimeout(i, 200);
      return;
    }
    (t.deleteSync(e),
      (a === t.ALREADY_SIGNALED || a === t.CONDITION_SATISFIED) && (n.setPixelRatio(1), n.setSize(1, 1, !1)));
  };
  window.setTimeout(i, 200);
}

function EI(n) {
  (n.setRenderTarget(null), n.renderLists.dispose());
  const t = mx(n);
  if (!t && !kh) {
    ((kh = n), TI(n));
    return;
  }
  (n.dispose(), t || n.forceContextLoss());
}

function AI(n) {
  return n > 0.004 ? `grayscale(${(n * 0.9).toFixed(3)}) brightness(${(1 - n * 0.16).toFixed(3)})` : "";
}

class RI {
  renderer;
  canvas;
  scene;
  rig;
  lights;
  lightTint = new iI();
  grade;
  viewport = { width: 1, height: 1, dpr: 1 };
  quality;
  settings;
  time = 0;
  frame = 0;
  onQualityChanged = null;
  onResized = null;
  onContextRestored = null;
  handleRestored = () => this.onContextRestored?.();
  container;
  gpuTimer = null;
  post = null;
  hdrOk;
  stats = { fps: 60, drawCalls: 0, triangles: 0 };
  fpsAccum = 0;
  fpsFrames = 0;
  disposed = !1;
  rect = { left: 0, top: 0, width: 1, height: 1 };
  rectFrame = 0;
  deathTint = 0;
  tintUsed = !1;
  cssFilter = "";
  adaptiveResolution = typeof navigator < "u" && !navigator.webdriver;
  resScale = 1;
  slowTime = 0;
  slowFrames = 0;
  slowWindows = 0;
  constructor(t, e) {
    this.container = t;
    const s = SI();
    ((this.renderer = s),
      (s.outputColorSpace = ri),
      $M(),
      (s.toneMapping = rL),
      (s.toneMappingExposure = 1),
      (s.shadowMap.type = P1),
      (s.shadowMap.needsUpdate = !0),
      s.info.reset(),
      s.setClearColor(Yt.env.fog, 1),
      (this.canvas = s.domElement));
    const i = this.canvas.style;
    ((i.filter = ""),
      (i.position = "absolute"),
      (i.left = "0"),
      (i.top = "0"),
      (i.width = "100%"),
      (i.height = "100%"),
      (i.display = "block"),
      (i.touchAction = "none"),
      t.appendChild(this.canvas),
      this.canvas.addEventListener("webglcontextrestored", this.handleRestored),
      (this.scene = new wM()),
      (this.scene.fog = new tx(Yt.env.fog, 42, 520)),
      (this.rig = new WL()),
      (this.lights = new sI(this.scene)),
      (this.grade = {
        exposure: 0.98,
        bloomStrength: 0.55,
        saturation: k0.saturation,
        vibrance: k0.vibrance,
        contrast: k0.contrast,
        pivot: k0.pivot,
        vignette: 0.2,
        shadowTint: new Ut(-0.01, -0.002, 0.022),
        highlightTint: new Ut(0.018, 0.008, -0.014),
        haze: 0.06,
        hazeColor: new Ut(Yt.env.haze),
        desaturate: 0,
        dim: 0,
      }),
      (this.hdrOk = _I(s)),
      YL() && (this.gpuTimer = new XL(s)),
      (this.quality = e),
      (this.settings = xb[e]),
      this.applyQuality(),
      this.resize());
  }
  effective(t) {
    const e = xb[t];
    return e.post && !this.hdrOk ? { ...e, post: !1, bloom: 0, grade: !1, msaa: 0 } : e;
  }
  applyQuality() {
    const t = (this.settings = this.effective(this.quality)),
      e = this.renderer;
    e.shadowMap.enabled = t.shadows;
    const s = t.shadowType === "pcf" ? V3 : P1;
    if (
      (e.shadowMap.type !== s && ((e.shadowMap.type = s), (e.shadowMap.needsUpdate = !0)),
      this.lights.applyQuality(t),
      kL(t.unitPatterns),
      (this.grade.bloomStrength = t.bloom),
      (this.grade.haze = t.haze),
      t.post)
    )
      if (this.post) this.post.applyQuality(t);
      else {
        this.post = new bI(e, this.scene, this.rig.camera, this.grade, t);
        const i = this.gpuTimer;
        i && (this.post.onPostBegin = () => i.begin("post"));
      }
    else this.post && (this.post.dispose(), (this.post = null));
    (this.tintUsed && this.applyDeathTint(),
      (e.toneMappingExposure = this.grade.exposure),
      this.scene.traverse((i) => {
        const a = i.material;
        if (Array.isArray(a)) for (const o of a) o.needsUpdate = !0;
        else a && (a.needsUpdate = !0);
      }));
  }
  setQuality(t) {
    t !== this.quality &&
      ((this.quality = t),
      (this.resScale = 1),
      (this.slowWindows = 0),
      this.applyQuality(),
      this.resize(),
      this.onQualityChanged?.(this.settings));
  }
  get postEnabled() {
    return this.post !== null;
  }
  get postPipeline() {
    return this.post;
  }
  resize() {
    const t = Math.max(1, this.container.clientWidth || window.innerWidth),
      e = Math.max(1, this.container.clientHeight || window.innerHeight),
      s = Math.max(0.5, Math.min(window.devicePixelRatio || 1, this.settings.dprCap) * this.resScale),
      i = this.viewport;
    ((i.width = t),
      (i.height = e),
      (i.dpr = s),
      this.renderer.setPixelRatio(s),
      this.renderer.setSize(t, e, !1),
      this.post?.setSize(t, e, s),
      this.rig.setAspect(t / e),
      this.readRect(),
      this.onResized?.());
  }
  readRect() {
    const t = this.canvas.getBoundingClientRect();
    ((this.rect.left = t.left),
      (this.rect.top = t.top),
      (this.rect.width = t.width),
      (this.rect.height = t.height),
      (this.rectFrame = this.frame));
  }
  setDeathTint(t) {
    const e = Math.min(1, Math.max(0, t));
    (e === this.deathTint && this.tintUsed) ||
      ((this.deathTint = e), (this.tintUsed = !0), this.applyDeathTint());
  }
  applyDeathTint() {
    const t = this.deathTint;
    ((this.grade.desaturate = this.post ? t * 0.9 : 0), (this.grade.dim = this.post ? t * 0.16 : 0));
    const e = this.post ? "" : AI(t);
    e !== this.cssFilter && ((this.cssFilter = e), (this.canvas.style.filter = e));
  }
  prewarm() {
    if (this.disposed) return;
    const t = [],
      e = [];
    (this.scene.traverse((s) => {
      s.isLight ||
        (s.visible || ((s.visible = !0), t.push(s)), s.frustumCulled && ((s.frustumCulled = !1), e.push(s)));
    }),
      this.lightTint.bind(!0));
    try {
      this.lights.fitShadow(this.rig.camera);
      const s = this.renderer;
      for (let i = 0; i < 2; i++)
        this.post ? this.post.render(0) : (s.setRenderTarget(null), s.render(this.scene, this.rig.camera));
    } finally {
      this.lightTint.bind(!1);
      for (const s of t) s.visible = !1;
      for (const s of e) s.frustumCulled = !0;
    }
  }
  *prewarmStages() {
    if (this.disposed) return;
    const t = this.renderer,
      e = this.rig.camera,
      s = [],
      i = [],
      a = [];
    this.scene.traverse((l) => {
      if (l.isLight) return;
      (l.visible || ((l.visible = !0), s.push(l)), l.frustumCulled && ((l.frustumCulled = !1), i.push(l)));
      const c = l;
      (c.isMesh || l.isPoints || l.isLine || l.isSprite) && c.material && a.push(l);
    });
    const o = this.post ? new go(16, 16, { type: Dr, depthBuffer: !0, stencilBuffer: !1 }) : null;
    let r = !1;
    this.lightTint.bind(!0);
    try {
      this.lights.fitShadow(e);
      const l = [];
      for (const v of this.scene.children)
        if (!v.isLight)
          if (v.isMesh || v.children.length === 0) l.push(v);
          else for (const _ of v.children) l.push(_);
      let c = !1;
      (this.scene.traverse((v) => {
        v.isLight && v.parent !== this.scene && (c = !0);
      }),
        c && ((l.length = 0), l.push(this.scene)));
      let f = performance.now();
      for (let v = 0; v < l.length; v++)
        (t.setRenderTarget(o),
          t.compile(l[v], e, this.scene),
          performance.now() - f > 10 &&
            v < l.length - 1 &&
            (t.setRenderTarget(null), yield (0.035 * (v + 1)) / l.length, (f = performance.now())));
      (t.setRenderTarget(null), this.post?.precompile(t, e), yield 0.04);
      const d = (t.info.programs ?? []).slice(),
        h = Math.max(1, d.length);
      let u = 0;
      for (; d.length > 0 && u < 4e3;) {
        const v = performance.now();
        let _ = !1;
        for (let k = 0; k < d.length;) {
          const M = d[k];
          if (M.isReady && !M.isReady()) {
            k++;
            continue;
          }
          if ((M.getUniforms(), d.splice(k, 1), (_ = !0), performance.now() - v > 8)) break;
        }
        ((u = _ ? 0 : u + 1), yield 0.04 + 0.66 * (1 - d.length / h));
      }
      const m = t.properties,
        x = new Map();
      for (const v of a) {
        const _ = v,
          k = Array.isArray(_.material) ? _.material : [_.material];
        let M = `${_.isSkinnedMesh ? "s" : ""}${_.isInstancedMesh ? (_.instanceColor ? "I" : "i") : ""}${_.castShadow ? "c" : ""}${_.receiveShadow ? "r" : ""}`;
        for (const w of k) {
          const T = m.get(w).currentProgram;
          M += `|${T ? T.id : w.uuid}:${w.side}${w.map ? "m" : ""}${w.alphaTest > 0 ? "a" : ""}`;
        }
        const S = _.customDepthMaterial;
        S && (M += `|d:${S.type}:${S.defines ? Object.keys(S.defines).join(",") : ""}`);
        const b = _.geometry ? Object.keys(_.geometry.attributes).sort().join(",") : "";
        ((M += `|${b}`), x.has(M) || x.set(M, v));
      }
      for (const v of a) v.visible = !1;
      r = !0;
      const p = [...x.values()];
      let g = performance.now();
      for (let v = 0; v < p.length; v++) {
        const _ = p[v];
        ((_.visible = !0),
          t.setRenderTarget(o),
          t.render(this.scene, e),
          (_.visible = !1),
          performance.now() - g > 10 &&
            (t.setRenderTarget(null), yield 0.7 + 0.1 * ((v + 1) / p.length), (g = performance.now())));
      }
      (t.setRenderTarget(null), yield 0.8);
      const y = t.shadowMap.autoUpdate;
      t.shadowMap.autoUpdate = !1;
      try {
        let v = 1;
        g = performance.now();
        for (let _ = 0; _ < a.length;) {
          const k = Math.min(a.length, _ + v);
          for (let b = _; b < k; b++) a[b].visible = !0;
          const M = performance.now();
          (t.setRenderTarget(o), t.render(this.scene, e));
          const S = performance.now() - M;
          for (let b = _; b < k; b++) a[b].visible = !1;
          ((_ = k),
            (v = S < 3 ? Math.min(64, v * 2) : S > 12 ? Math.max(1, v >> 1) : v),
            performance.now() - g > 12 &&
              (t.setRenderTarget(null), yield 0.8 + 0.12 * (_ / a.length), (g = performance.now())));
        }
      } finally {
        t.shadowMap.autoUpdate = y;
      }
      for (const v of a) v.visible = !0;
      ((r = !1), t.setRenderTarget(null), yield 0.92);
      for (let v = 0; v < 2; v++)
        (this.post ? this.post.render(0) : (t.setRenderTarget(null), t.render(this.scene, e)),
          v === 0 && (yield 0.96));
    } finally {
      if (r) for (const l of a) l.visible = !0;
      for (const l of s) l.visible = !1;
      for (const l of i) l.frustumCulled = !0;
      (this.lightTint.bind(!1), this.disposed || t.setRenderTarget(null), o?.dispose());
    }
  }
  updateCamera(t) {
    this.rig.update(t);
  }
  render(t, e = !0) {
    if (this.disposed || ((this.time += t), this.frame++, oL(t), this.lights.update(t), !e)) return;
    this.lights.fitShadow(this.rig.camera);
    const s = this.scene.fog,
      i = this.rig.isDebugView;
    ((s.near = i ? 600 : 42), (s.far = i ? 3e3 : 520), this.frame - this.rectFrame >= 60 && this.readRect());
    const a = this.renderer;
    (a.info.reset(), this.lightTint.bind(!0));
    const o = this.gpuTimer;
    (o && (o.attach(!0), o.begin("scene")),
      this.post ? this.post.render(t) : (a.setRenderTarget(null), a.render(this.scene, this.rig.camera)),
      o && (o.frameEnd(), o.attach(!1), (this.stats.gpu = o.timings)),
      this.lightTint.bind(!1),
      (this.stats.drawCalls = a.info.render.calls),
      (this.stats.triangles = a.info.render.triangles),
      (this.fpsAccum += t),
      this.fpsFrames++,
      this.adaptiveResolution && this.trackPerformance(t),
      this.fpsAccum >= 0.5 &&
        ((this.stats.fps = Math.round(this.fpsFrames / this.fpsAccum)),
        (this.fpsAccum = 0),
        (this.fpsFrames = 0)));
  }
  trackPerformance(t) {
    if (((this.slowTime += t), this.slowFrames++, this.slowTime < 1.5)) return;
    const e = this.slowTime / this.slowFrames;
    ((this.slowTime = 0),
      (this.slowFrames = 0),
      e > 1 / 26 && this.resScale > 0.61
        ? ++this.slowWindows >= 3 &&
          ((this.slowWindows = 0), (this.resScale = Math.max(0.6, this.resScale * 0.85)), this.resize())
        : (this.slowWindows = 0));
  }
  getStats() {
    return this.stats;
  }
  get gpuTimings() {
    return this.gpuTimer ? this.gpuTimer.timings : null;
  }
  screenToGround(t, e) {
    const s = this.rect;
    if (s.width <= 0 || s.height <= 0) return null;
    const i = ((t - s.left) / s.width) * 2 - 1,
      a = -(((e - s.top) / s.height) * 2 - 1),
      o = this.rig.camera;
    (ju.origin.setFromMatrixPosition(o.matrixWorld),
      ju.direction.set(i, a, 0.5).unproject(o).sub(ju.origin).normalize());
    const r = ju.intersectPlane(kI, Kr);
    return r ? { x: r.x, y: r.z } : null;
  }
  worldToScreen(t, e, s, i) {
    const a = this.rig.camera;
    Kr.set(t, e, s).applyMatrix4(a.matrixWorldInverse);
    const o = Kr.z < 0;
    Kr.applyMatrix4(a.projectionMatrix);
    const r = this.rect;
    return (
      (i.x = r.left + (Kr.x * 0.5 + 0.5) * r.width),
      (i.y = r.top + (-Kr.y * 0.5 + 0.5) * r.height),
      (i.visible = o && Math.abs(Kr.x) <= 1.05 && Math.abs(Kr.y) <= 1.05),
      i
    );
  }
  dispose() {
    this.disposed ||
      ((this.disposed = !0),
      jM(this.scene),
      dL(),
      this.post?.dispose(),
      (this.post = null),
      this.lights.dispose(),
      this.lightTint.dispose(),
      this.gpuTimer?.dispose(),
      (this.gpuTimer = null),
      this.scene.clear(),
      this.canvas.removeEventListener("webglcontextrestored", this.handleRestored),
      (this.canvas.style.filter = ""),
      this.canvas.remove(),
      EI(this.renderer));
  }
}

const CI = { heightAt: () => 0, waterLevel: 0, inWater: () => !1 };

function LI(n) {
  switch (n.kind) {
    case "hero":
      return 2.5;
    case "minion":
      return n.minionType === "super" || n.minionType === "siege" ? 2 : 1.5;
    case "tower":
      return 8;
    case "core":
      return 7;
    case "monster":
      return 1.2 + n.radius * 1.6;
  }
}

function Jc() {
  return new Promise((n) => {
    if (typeof document < "u" && document.hidden && typeof MessageChannel < "u") {
      const s = new MessageChannel();
      ((s.port1.onmessage = () => {
        (s.port1.close(), n());
      }),
        s.port2.postMessage(0));
      return;
    }
    let t = !1;
    const e = () => {
      t || ((t = !0), n());
    };
    (requestAnimationFrame(e), window.setTimeout(e, 50));
  });
}

function II(n, t, e, s) {
  const i = qM(n, t, e);
  for (const a of s) i.modules.push(a(i.ctx));
  return i.api;
}

async function PI(n, t, e, s, i) {
  const a = qM(n, t, e),
    o = Math.max(1, s.length);
  let r = 0;
  const l = s.map((f) => {
    const d = f.staged ? 6 : 1;
    return ((r += d), d);
  });
  let c = 0;
  (i?.(0), await Jc());
  for (let f = 0; f < o && f < s.length && !a.isDisposed(); f++) {
    const d = s[f],
      h = l[f] / r;
    if (d.staged) {
      const u = d.staged(a.ctx);
      for (;;) {
        const m = u.next();
        if (m.done) {
          a.modules.push(m.value);
          break;
        }
        if ((i?.(c + h * Math.min(1, Math.max(0, m.value))), await Jc(), a.isDisposed())) {
          u.return(void 0);
          break;
        }
      }
    } else a.modules.push(d(a.ctx));
    ((c += h), i?.(Math.min(1, c)), await Jc());
  }
  return a.api;
}

function qM(n, t, e) {
  getComputedStyle(n).position === "static" && (n.style.position = "relative");
  const s = new RI(n, e.quality),
    i = document.createElement("div");
  ((i.style.cssText =
    "position:absolute;left:0;top:0;width:100%;height:100%;overflow:hidden;pointer-events:none;"),
    n.appendChild(i));
  const a = { terrain: new Ji(), units: new Ji(), fx: new Ji() };
  ((a.terrain.name = "terrain"),
    (a.units.name = "units"),
    (a.fx.name = "fx"),
    s.scene.add(a.terrain, a.units, a.fx));
  const o = (L) => {
      const B = L.heroes;
      for (let G = 0; G < B.length; G++) if (B[G].id === L.playerId) return B[G];
      return null;
    },
    r = (L) => o(L)?.team ?? 0,
    l = { state: t, alpha: 1, dt: 0, time: 0, frame: 0, playerTeam: r(t) },
    c = new Map();
  let f = -1;
  const d = (L) => {
      if (f !== l.frame) {
        c.clear();
        for (const B of l.state.units) c.set(B.id, B);
        f = l.frame;
      }
      return c.get(L);
    },
    h = {
      getPosition(L, B) {
        const G = d(L);
        if (!G) return !1;
        const q = l.alpha;
        return (
          B.set(G.prevPos.x + (G.pos.x - G.prevPos.x) * q, 0, G.prevPos.y + (G.pos.y - G.prevPos.y) * q),
          !0
        );
      },
      getHeight(L) {
        const B = d(L);
        return B ? LI(B) : 2;
      },
    },
    u = [],
    m = {
      renderer: s.renderer,
      scene: s.scene,
      camera: s.rig.camera,
      rig: s.rig,
      lights: s.lights,
      lightTint: s.lightTint,
      grade: s.grade,
      layers: a,
      map: t.map,
      container: n,
      overlayRoot: i,
      viewport: s.viewport,
      get quality() {
        return s.quality;
      },
      get settings() {
        return s.settings;
      },
      frame: l,
      unitQuery: h,
      terrain: CI,
      setUnitQuery(L) {
        m.unitQuery = L;
      },
      worldToScreen: (L, B, G, q) => s.worldToScreen(L, B, G, q),
      screenToGround: (L, B) => s.screenToGround(L, B),
      getModule(L) {
        return u.find((B) => B.name === L);
      },
    },
    x = t.map.bound;
  s.rig.bounds = { minX: -x, maxX: x, minZ: -x, maxZ: x };
  let p = !1,
    g = !1;
  ((s.onQualityChanged = (L) => {
    for (const B of u) B.setQuality?.(L);
  }),
    (s.onResized = () => {
      for (const L of u) L.resize?.(s.viewport);
    }),
    (s.onContextRestored = () => {
      p = !1;
    }));
  const y = (L, B) => {
    const G = o(L);
    G &&
      s.rig.setFollow(G.prevPos.x + (G.pos.x - G.prevPos.x) * B, G.prevPos.y + (G.pos.y - G.prevPos.y) * B);
  };
  (y(t, 1), s.rig.update(0));
  const v = { x: 0, y: 0, visible: !1 },
    _ = { x: 0, y: 0, visible: !1 },
    k = new dt(),
    M = (L, B, G) => {
      let q = -1,
        et = 1 / 0;
      for (const ct of G.units) {
        if (
          !ct.alive ||
          ct.id === G.playerId ||
          (ct.team !== l.playerTeam && !ct.visible[l.playerTeam]) ||
          !m.unitQuery.getPosition(ct.id, k)
        )
          continue;
        const rt = Math.min(1.4, m.unitQuery.getHeight(ct.id) * 0.45);
        if ((s.worldToScreen(k.x, k.y + rt, k.z, v), !v.visible)) continue;
        s.worldToScreen(k.x + ct.radius + 0.35, k.y + rt, k.z, _);
        const mt = Math.max(26, Math.abs(_.x - v.x) * 1.25),
          nt = Math.hypot(v.x - L, v.y - B);
        if (nt > mt) continue;
        const H = nt / mt;
        H < et && ((et = H), (q = ct.id));
      }
      return q;
    };
  let S = !1,
    b = null;
  const w = (L, B) => {
    const G = s.rig,
      q = o(L);
    if (b && b.pointer && b.kind === "position" && q && q.alive) {
      (G.setReach(null),
        k.set(b.pos.x, 0, b.pos.y).project(s.rig.camera),
        G.setPointerReach(Math.max(-1, Math.min(1, k.y)), b.range + Math.min(b.radius, 2.5) * 0.3));
      return;
    }
    if ((G.setPointerReach(null), !b || b.pointer || b.kind === "self" || b.kind === "target")) {
      G.setReach(null);
      return;
    }
    if (!q || !q.alive) {
      G.setReach(null);
      return;
    }
    const et = q.prevPos.x + (q.pos.x - q.prevPos.x) * B,
      ct = q.prevPos.y + (q.pos.y - q.prevPos.y) * B;
    let rt, mt, nt;
    if (b.kind === "position") {
      ((rt = b.pos.x - et), (mt = b.pos.y - ct));
      const st = Math.hypot(rt, mt);
      nt = Math.min(st, b.range) + Math.min(b.radius, 2.5);
    } else ((rt = b.dir.x), (mt = b.dir.y), (nt = b.range));
    const H = Math.hypot(rt, mt);
    H < 1e-4 ? G.setReach(null) : G.setReach(et + (rt / H) * nt, ct + (mt / H) * nt);
  };
  let T = !1;
  const E = (L) => {
      const B = o(L);
      let G = 0;
      if (B && B.alive) {
        const q = T ? 11.5 : 9.5;
        for (const et of L.units) {
          if (et.kind !== "monster" || !et.alive || et.radius < 1.8 || !et.visible[l.playerTeam]) continue;
          const ct = et.pos.y - B.pos.y;
          ct < 3 && Math.hypot(et.pos.x - B.pos.x, ct) < q && (G = Math.max(G, et.radius >= 2.3 ? 1.5 : 1));
        }
      }
      ((T = G > 0), s.rig.setTallFocus(G));
      // 杯杯菇大招蓄力/滞空：镜头拉远并把焦点挪到「人—落点」中间，全图跳也看得见落点
      const mu = B && B.alive ? B.rt?.mushUlt : null;
      if (mu && L.time < mu.until) {
        const et = Math.min(1, Math.hypot(mu.x - mu.fromX, mu.y - mu.fromY) / 55);
        (s.rig.setZoom(1 + 0.9 * et), s.rig.setUltPeek((mu.fromX + mu.x) * 0.5, (mu.fromY + mu.y) * 0.5));
      } else {
        (s.rig.setZoom(1), s.rig.setUltPeek(null));
      }
    },
    A = () => {
      if (S) return;
      ((p = !0), (l.dt = 0), s.updateCamera(0));
      const L = [];
      for (const B of u) {
        const G = B.prewarm?.();
        G && L.push(G);
      }
      try {
        for (const B of u) B.update(l);
        s.prewarm();
      } finally {
        for (const B of L) B();
      }
    },
    C = () => {
      if (!S) {
        A();
        for (const L of u) L.update(l);
        s.render(0, !0);
      }
    },
    R = { steps: 0, total: 0, max: 0, slow: [] },
    I = async (L) => {
      if (S || g) return;
      g = !0;
      const B = [];
      ((R.steps = 0), (R.total = 0), (R.max = 0), (R.slow.length = 0));
      let G = performance.now();
      const q = (et) => {
        const rt = performance.now() - G;
        (R.steps++,
          (R.total += rt),
          rt > R.max && (R.max = rt),
          rt > 50 && R.slow.push([Math.round(et * 1e3) / 1e3, Math.round(rt)]));
      };
      try {
        ((l.dt = 0), s.updateCamera(0), L?.(0));
        for (const ct of u) {
          if (!ct.prewarm) continue;
          G = performance.now();
          const rt = ct.prewarm();
          if ((rt && B.push(rt), q(0), await Jc(), S)) return;
        }
        G = performance.now();
        for (const ct of u) ct.update(l);
        if ((q(0.06), L?.(0.06), await Jc(), S)) return;
        const et = s.prewarmStages();
        for (;;) {
          G = performance.now();
          const ct = et.next();
          if (ct.done) {
            q(1);
            break;
          }
          if ((q(0.06 + 0.94 * ct.value), L?.(0.06 + 0.94 * ct.value), await Jc(), S)) {
            et.return();
            return;
          }
        }
        p = !0;
      } finally {
        if (!S) for (const et of B) et();
        g = !1;
      }
      if (!S) {
        for (const et of u) et.update(l);
        (s.render(0, !0), L?.(1));
      }
    },
    P = (L, B, G, q) => {
      if (S || g) return;
      const et = Math.min(Math.max(G, 0), 0.1);
      (q && !p && ((l.state = L), (l.alpha = B), (l.playerTeam = r(L)), y(L, B), A()),
        (l.state = L),
        (l.alpha = B),
        (l.dt = et),
        (l.time = s.time + et),
        (l.frame = s.frame + 1),
        (l.playerTeam = r(L)),
        y(L, B),
        w(L, B),
        E(L),
        s.updateCamera(et));
      for (const ct of u) ct.update(l);
      s.render(et, q);
    };
  return {
    api: {
      engine: s,
      context: m,
      render(L, B, G) {
        P(L, B, G, !0);
      },
      advance(L, B, G) {
        P(L, B, G, !1);
      },
      reset() {
        if (!S) {
          for (const L of u) L.reset?.();
          s.rig.snap();
        }
      },
      handleEvents(L, B) {
        if (!(S || L.length === 0)) for (const G of u) G.handleEvents?.(L, B);
      },
      setAim(L) {
        b = L;
        for (const B of u) B.setAim?.(L);
      },
      setQuality(L) {
        L !== s.quality && (s.setQuality(L), (p = !1));
      },
      resize() {
        s.resize();
      },
      screenToGround(L, B) {
        return s.screenToGround(L, B);
      },
      worldToScreen(L, B = 0) {
        return s.worldToScreen(L.x, B, L.y, { x: 0, y: 0, visible: !1 });
      },
      pickUnit(L, B, G) {
        for (const q of u) if (q.pickUnit) return q.pickUnit(L, B, G);
        return M(L, B, G);
      },
      setCameraPeek(L) {
        L ? s.rig.setPeek(L.x, L.y) : s.rig.setPeek(null);
      },
      getStats() {
        return s.getStats();
      },
      setCameraShake(L) {
        s.rig.shakeEnabled = L;
      },
      snapCamera() {
        s.rig.snap();
      },
      setDeathTint(L) {
        s.setDeathTint(L);
      },
      setOverlayAvoid(L) {
        u.find((G) => G.name === "overlay")?.setAvoid?.(L);
      },
      prewarm: C,
      prewarmAsync: I,
      warmStats: R,
      dispose() {
        if (!S) {
          S = !0;
          for (let L = u.length - 1; L >= 0; L--) u[L].dispose();
          ((u.length = 0), s.dispose(), i.remove());
        }
      },
    },
    ctx: m,
    modules: u,
    isDisposed: () => S,
  };
}

const ji = 8,
  ih = 5,
  Xs = 128,
  Ft = {
    dot: 0,
    glow: 1,
    spark: 2,
    star: 3,
    smoke: 4,
    streak: 5,
    shard: 6,
    feather: 7,
    rune1: 8,
    rune2: 9,
    rune3: 10,
    ring: 11,
    flame: 12,
    leaf: 13,
    crescent: 14,
    hex: 15,
    diamond: 16,
    coin: 17,
    plus: 18,
    wisp: 19,
    arrow: 20,
    lock: 21,
    swirl: 22,
    burst: 23,
    bubble: 24,
    chevron: 25,
    ember: 26,
    frost: 27,
    smoke2: 28,
    bolt: 29,
    drop: 30,
    soft: 31,
    goose: 32,
    wave: 33,
    ink: 34,
    scale: 35,
    puff: 36,
    broadleaf: 37,
    splash: 38,
    star8: 39,
  },
  Ve = (n) => (n < 0 ? 0 : n > 1 ? 1 : n),
  Le = (n, t, e) => {
    const s = Ve((e - n) / (t - n));
    return s * s * (3 - 2 * s);
  },
  Ro = Math.PI * 2;

function yb(n) {
  return (t, e, s) => {
    const i = Math.hypot(t, e),
      a = un(t * 1.7 + 5.3, e * 1.7 + 2.1, 3, n) - 0.5,
      o = un(t * 4.1 + 1.3, e * 4.1 + 8.7, 2, n + 9) - 0.5,
      r = i + a * 0.7 + o * 0.22;
    ((s[0] = Le(0.92, 0.28, r) * Le(1, 0.82, i)),
      (s[1] = Ve(0.72 + e * 0.16 + a * 0.5 + o * 0.25)),
      (s[2] = 0));
  };
}

function qu(n, t, e, s, i = Math.PI / 2) {
  n.beginPath();
  for (let a = 0; a < t * 2; a++) {
    const o = i + (a * Math.PI) / t,
      r = a % 2 === 0 ? e : s;
    a === 0 ? n.moveTo(Math.cos(o) * r, Math.sin(o) * r) : n.lineTo(Math.cos(o) * r, Math.sin(o) * r);
  }
  n.closePath();
}

function Oc(n, t, e) {
  ((n.lineCap = "round"),
    (n.lineJoin = "round"),
    (n.strokeStyle = "rgba(255,255,255,0.28)"),
    (n.lineWidth = t * 2.6),
    e(),
    n.stroke(),
    (n.strokeStyle = "#fff"),
    (n.lineWidth = t),
    e(),
    n.stroke());
}

function $g(n) {
  return (t) => {
    const e = new ke(n);
    (Oc(t, 0.15, () => {
      (t.beginPath(), t.moveTo(0, -0.62), t.lineTo(0, 0.62));
      const s = 2 + e.int(2);
      for (let i = 0; i < s; i++) {
        const a = e.range(-0.5, 0.5),
          o = e.chance(0.5) ? 1 : -1,
          r = e.range(0.28, 0.5);
        (t.moveTo(0, a),
          t.lineTo(o * r, a + e.range(-0.3, 0.3)),
          e.chance(0.5) && t.lineTo(o * r, a + e.range(-0.45, 0.45)));
      }
      e.chance(0.7) && (t.moveTo(0.42, 0.5), t.arc(0, 0.5, 0.42, 0, Math.PI * e.range(0.5, 1)));
    }),
      (t.fillStyle = "#fff"));
    for (let s = 0; s < 2; s++)
      (t.beginPath(), t.arc(e.range(-0.5, 0.5), e.range(-0.6, 0.6), 0.1, 0, Ro), t.fill());
  };
}

const vb = {
  [Ft.dot]: {
    pix: (n, t, e) => {
      const s = Math.hypot(n, t),
        i = Ve(1 - s);
      ((e[0] = i * i), (e[1] = 1), (e[2] = 0));
    },
  },
  [Ft.glow]: {
    pix: (n, t, e) => {
      const s = n * n + t * t,
        i = Math.sqrt(s);
      ((e[0] = Ve(Math.exp(-s * 4.5) * 0.85 + Math.exp(-s * 30) * 0.5) * Le(1, 0.75, i)),
        (e[1] = 1),
        (e[2] = Math.exp(-s * 34)));
    },
  },
  [Ft.spark]: {
    pix: (n, t, e) => {
      const s = Math.abs(n),
        i = Math.abs(t),
        a = Math.exp(-t * t * 110) * Math.pow(Ve(1 - s), 1.8),
        o = Math.exp(-n * n * 110) * Math.pow(Ve(1 - i), 1.8),
        r = (n + t) * 0.7071,
        l = (n - t) * 0.7071,
        c =
          (Math.exp(-l * l * 200) * Math.pow(Ve(1 - Math.abs(r) * 2), 2) +
            Math.exp(-r * r * 200) * Math.pow(Ve(1 - Math.abs(l) * 2), 2)) *
          0.7,
        f = Math.exp(-(n * n + t * t) * 11);
      ((e[0] = Ve(Math.max(a, o) + c + f * 0.9)), (e[1] = 1), (e[2] = Ve(f * 1.2 + Math.max(a, o) * 0.5)));
    },
  },
  [Ft.star]: {
    core: 0.25,
    path: (n, t) => {
      ((n.fillStyle = "#fff"), (n.shadowColor = "#fff"), (n.shadowBlur = 5), qu(n, 5, 0.9, 0.42), n.fill());
      const e = t.createRadialGradient(0, 0.1, 0, 0, 0, 0.95);
      (e.addColorStop(0, "#fff"),
        e.addColorStop(1, "#b0b0b0"),
        (t.fillStyle = e),
        t.fillRect(-1.2, -1.2, 2.4, 2.4));
    },
  },
  [Ft.smoke]: { pix: yb(11) },
  [Ft.smoke2]: { pix: yb(47) },
  [Ft.streak]: {
    pix: (n, t, e) => {
      const s = (n + 1) * 0.5,
        i = 0.1 + 0.42 * s * s,
        a = Math.exp(-(t * t) / (i * i)) * Le(-1, -0.7, n) * Le(1, 0.72, n);
      ((e[0] = Ve(a * (0.25 + 0.75 * s))), (e[1] = 1), (e[2] = Ve(a * s * s * 0.9)));
    },
  },
  [Ft.shard]: {
    path: (n, t) => {
      const e = [
          [-0.55, -0.5],
          [0.3, -0.75],
          [0.8, -0.1],
          [0.45, 0.62],
          [-0.3, 0.8],
          [-0.82, 0.15],
        ],
        s = (i, a) => {
          (i.beginPath(),
            a.forEach((o, r) => (r === 0 ? i.moveTo(e[o][0], e[o][1]) : i.lineTo(e[o][0], e[o][1]))),
            i.closePath(),
            i.fill());
        };
      ((n.fillStyle = "#fff"),
        s(n, [0, 1, 2, 3, 4, 5]),
        (t.fillStyle = "#8c8c8c"),
        t.fillRect(-1.2, -1.2, 2.4, 2.4),
        (t.fillStyle = "#ffffff"),
        t.beginPath(),
        t.moveTo(-0.3, 0.8),
        t.lineTo(0.45, 0.62),
        t.lineTo(0.05, 0.05),
        t.lineTo(-0.82, 0.15),
        t.closePath(),
        t.fill(),
        (t.fillStyle = "#5a5a5a"),
        t.beginPath(),
        t.moveTo(-0.55, -0.5),
        t.lineTo(0.3, -0.75),
        t.lineTo(0.05, 0.05),
        t.closePath(),
        t.fill());
    },
  },
  [Ft.feather]: {
    core: 0.15,
    path: (n, t) => {
      ((n.fillStyle = "#fff"),
        n.beginPath(),
        n.moveTo(0.92, 0),
        n.quadraticCurveTo(0.35, 0.42, -0.5, 0.26),
        n.lineTo(-0.34, 0.08),
        n.lineTo(-0.62, 0.02),
        n.lineTo(-0.36, -0.1),
        n.quadraticCurveTo(-0.2, -0.36, -0.52, -0.24),
        n.quadraticCurveTo(0.35, -0.42, 0.92, 0),
        n.closePath(),
        n.fill(),
        (n.strokeStyle = "#fff"),
        (n.lineWidth = 0.08),
        n.beginPath(),
        n.moveTo(-0.92, 0),
        n.lineTo(0.8, 0),
        n.stroke());
      const e = t.createLinearGradient(-1, 0, 1, 0);
      (e.addColorStop(0, "#9a9a9a"),
        e.addColorStop(1, "#ffffff"),
        (t.fillStyle = e),
        t.fillRect(-1.2, -1.2, 2.4, 2.4),
        (t.strokeStyle = "rgba(90,90,90,0.55)"),
        (t.lineWidth = 0.025));
      for (let s = -4; s <= 6; s++) {
        const i = s * 0.13;
        (t.beginPath(),
          t.moveTo(i, 0),
          t.lineTo(i - 0.16, 0.4),
          t.moveTo(i, 0),
          t.lineTo(i - 0.16, -0.4),
          t.stroke());
      }
      ((t.strokeStyle = "#fff"),
        (t.lineWidth = 0.04),
        t.beginPath(),
        t.moveTo(-0.92, 0),
        t.lineTo(0.8, 0),
        t.stroke());
    },
  },
  [Ft.rune1]: { core: 0.6, path: $g(3) },
  [Ft.rune2]: { core: 0.6, path: $g(18) },
  [Ft.rune3]: { core: 0.6, path: $g(77) },
  [Ft.ring]: {
    pix: (n, t, e) => {
      const s = Math.hypot(n, t),
        i = Math.abs(s - 0.76);
      ((e[0] = Ve(Le(0.12, 0.04, i) + Math.exp(-i * i * 40) * 0.3) * Le(1, 0.93, s)),
        (e[1] = 1),
        (e[2] = Le(0.05, 0, i) * 0.6));
    },
  },
  [Ft.flame]: {
    pix: (n, t, e) => {
      const s = Ve((t + 0.92) / 1.84),
        i = (un(n * 2.2 + 3.1, t * 2.6 + 1.7, 3, 5) - 0.5) * 0.5 * s,
        a = 0.6 * Math.sin(Math.PI * Math.pow(s, 0.55)) * (1 - s * 0.25) + 0.02,
        o = Math.abs(n + i),
        r = Le(a, a * 0.25, o) * Le(0, 0.06, s) * Le(1, 0.9, s);
      ((e[0] = r), (e[1] = Ve(0.55 + (1 - s) * 0.5)), (e[2] = Le(a * 0.55, 0, o) * Ve(1 - s * 1.5) * r));
    },
  },
  [Ft.leaf]: {
    core: 0.1,
    path: (n, t) => {
      ((n.fillStyle = "#fff"),
        n.beginPath(),
        n.moveTo(-0.85, -0.1),
        n.quadraticCurveTo(-0.1, 0.62, 0.88, 0.12),
        n.quadraticCurveTo(0, -0.18, -0.85, -0.1),
        n.closePath(),
        n.fill());
      const e = t.createLinearGradient(0, -0.3, 0, 0.5);
      (e.addColorStop(0, "#8a8a8a"),
        e.addColorStop(1, "#fff"),
        (t.fillStyle = e),
        t.fillRect(-1.2, -1.2, 2.4, 2.4));
    },
  },
  [Ft.crescent]: {
    pix: (n, t, e) => {
      const s = Math.hypot(n, t),
        i = Math.hypot(n - 0.42, t),
        a = Le(0.93, 0.86, s),
        o = Le(0.8, 0.9, i),
        r = a * o;
      ((e[0] = r), (e[1] = 1), (e[2] = r * Le(0.6, 0.9, s) * 0.8));
    },
  },
  [Ft.hex]: {
    core: 0.4,
    path: (n) => {
      ((n.fillStyle = "rgba(255,255,255,0.16)"),
        qu(n, 3, 0.86, 0.86, Math.PI / 2),
        n.fill(),
        Oc(n, 0.14, () => qu(n, 3, 0.78, 0.78, Math.PI / 2)));
    },
  },
  [Ft.diamond]: {
    pix: (n, t, e) => {
      const s = Math.abs(n) / 0.5 + Math.abs(t) / 0.92,
        i = Le(1, 0.9, s);
      ((e[0] = i), (e[1] = n < 0 ? (t > 0 ? 1 : 0.62) : t > 0 ? 0.8 : 0.45), (e[2] = Le(0.5, 0, s) * 0.5));
    },
  },
  [Ft.coin]: {
    path: (n, t) => {
      ((n.fillStyle = "#fff"),
        n.beginPath(),
        n.arc(0, 0, 0.8, 0, Ro),
        n.fill(),
        (t.fillStyle = "#c8c8c8"),
        t.fillRect(-1.2, -1.2, 2.4, 2.4),
        (t.fillStyle = "#8a8a8a"),
        t.beginPath(),
        t.arc(0, 0, 0.6, 0, Ro),
        t.fill(),
        (t.fillStyle = "#ffffff"),
        qu(t, 4, 0.46, 0.17),
        t.fill(),
        (t.strokeStyle = "#fff"),
        (t.lineWidth = 0.09),
        t.beginPath(),
        t.arc(0, 0, 0.7, Math.PI * 0.55, Math.PI * 1),
        t.stroke());
    },
  },
  [Ft.plus]: {
    core: 0.5,
    path: (n) => {
      ((n.fillStyle = "#fff"), (n.shadowColor = "#fff"), (n.shadowBlur = 8));
      const t = 0.22;
      (n.fillRect(-t, -0.78, t * 2, 1.56), n.fillRect(-0.78, -t, 1.56, t * 2));
    },
  },
  [Ft.wisp]: {
    pix: (n, t, e) => {
      const s = 0.34 * Math.sin(t * 2.6 + 0.4),
        i = Math.pow(Ve(1 - Math.abs(t) / 0.92), 0.8),
        a = 0.07 + 0.2 * i * (0.6 + 0.4 * un(t * 2 + 3, 0.5, 2, 21)),
        o = n - s;
      ((e[0] = Ve(Math.exp(-(o * o) / (a * a)) * i)), (e[1] = Ve(0.7 + t * 0.25)), (e[2] = 0));
    },
  },
  [Ft.arrow]: {
    core: 0.5,
    path: (n) => {
      ((n.strokeStyle = "#fff"),
        (n.fillStyle = "#fff"),
        (n.lineCap = "round"),
        (n.lineWidth = 0.17),
        n.beginPath(),
        n.moveTo(-0.8, 0),
        n.lineTo(0.5, 0),
        n.stroke(),
        n.beginPath(),
        n.moveTo(0.94, 0),
        n.lineTo(0.3, 0.36),
        n.lineTo(0.46, 0),
        n.lineTo(0.3, -0.36),
        n.closePath(),
        n.fill(),
        (n.lineWidth = 0.13),
        n.beginPath());
      for (const t of [-0.72, -0.48])
        (n.moveTo(t, 0), n.lineTo(t - 0.16, 0.3), n.moveTo(t, 0), n.lineTo(t - 0.16, -0.3));
      n.stroke();
    },
  },
  [Ft.lock]: {
    core: 0.5,
    path: (n) => {
      (Oc(n, 0.14, () => {
        n.beginPath();
        for (let t = 0; t < 4; t++) {
          const e = (t * Math.PI) / 2 + Math.PI / 4;
          (n.moveTo(Math.cos(e - 0.5) * 0.66, Math.sin(e - 0.5) * 0.66), n.arc(0, 0, 0.66, e - 0.5, e + 0.5));
          const s = (t * Math.PI) / 2;
          (n.moveTo(Math.cos(s) * 0.9, Math.sin(s) * 0.9), n.lineTo(Math.cos(s) * 0.5, Math.sin(s) * 0.5));
        }
      }),
        (n.fillStyle = "#fff"),
        n.beginPath(),
        n.arc(0, 0, 0.13, 0, Ro),
        n.fill());
    },
  },
  [Ft.swirl]: {
    pix: (n, t, e) => {
      const s = Math.hypot(n, t),
        a = ((((Math.atan2(t, n) / Ro + 0.5) * 2 + s * 1.9) % 1) + 1) % 1,
        o = Le(0.24, 0.02, Math.abs(a - 0.5)),
        r = Le(0.06, 0.3, s) * Le(0.96, 0.6, s);
      ((e[0] = Ve(o * r)), (e[1] = 1), (e[2] = Ve(o * o * r * 0.5)));
    },
  },
  [Ft.burst]: {
    pix: (n, t, e) => {
      const s = Math.hypot(n, t),
        i = Math.atan2(t, n),
        o = 0.55 + 0.4 * ((((Math.floor(((i + Math.PI) / Ro) * 12 + 0.5) % 12) * 7919) % 13) / 13),
        r = Math.pow(Math.abs(Math.cos(i * 6)), 26) * Le(o, o * 0.2, s),
        l = Math.exp(-s * s * 14);
      ((e[0] = Ve(r * 0.9 + l) * Le(1, 0.9, s)), (e[1] = 1), (e[2] = Ve(l * 1.1 + r * 0.3)));
    },
  },
  [Ft.bubble]: {
    pix: (n, t, e) => {
      const s = Math.hypot(n, t),
        i = Le(0.11, 0.02, Math.abs(s - 0.78)),
        a = Le(0.82, 0.3, s) * 0.12,
        o = Math.exp(-((n + 0.38) * (n + 0.38) + (t - 0.42) * (t - 0.42)) * 28) * 0.9;
      ((e[0] = Ve(i * 0.85 + a + o) * Le(1, 0.9, s)), (e[1] = 1), (e[2] = o));
    },
  },
  [Ft.chevron]: {
    core: 0.5,
    path: (n) => {
      Oc(n, 0.22, () => {
        (n.beginPath(), n.moveTo(-0.4, 0.62), n.lineTo(0.42, 0), n.lineTo(-0.4, -0.62));
      });
    },
  },
  [Ft.ember]: {
    pix: (n, t, e) => {
      const s = Math.hypot(n, t),
        i = un(n * 2.4 + 9.1, t * 2.4 + 4.4, 2, 31) - 0.5,
        a = Le(0.8, 0.25, s + i * 0.6);
      ((e[0] = a), (e[1] = 1), (e[2] = Le(0.45, 0, s + i * 0.4)));
    },
  },
  [Ft.frost]: {
    core: 0.5,
    path: (n) => {
      Oc(n, 0.11, () => {
        n.beginPath();
        for (let t = 0; t < 6; t++) {
          const e = (t * Math.PI) / 3,
            s = Math.cos(e),
            i = Math.sin(e);
          (n.moveTo(0, 0), n.lineTo(s * 0.84, i * 0.84));
          for (const a of [0.46, 0.66])
            for (const o of [-1, 1]) {
              const r = e + o * 0.9;
              (n.moveTo(s * a, i * a), n.lineTo(s * a + Math.cos(r) * 0.2, i * a + Math.sin(r) * 0.2));
            }
        }
      });
    },
  },
  [Ft.bolt]: {
    core: 0.6,
    path: (n) => {
      Oc(n, 0.17, () => {
        (n.beginPath(),
          n.moveTo(0.3, 0.86),
          n.lineTo(-0.3, 0.12),
          n.lineTo(0.18, 0.02),
          n.lineTo(-0.34, -0.86));
      });
    },
  },
  [Ft.drop]: {
    pix: (n, t, e) => {
      const s = Ve((t + 0.85) / 1.7),
        i = 0.52 * Math.sqrt(Ve(1 - s)) * Le(0, 0.22, s) + 0.01,
        a = Le(i, i * 0.6, Math.abs(n)) * Le(1, 0.92, s);
      ((e[0] = a),
        (e[1] = Ve(0.7 + (n < 0 ? 0.3 : 0) * Le(0.3, 0.1, s))),
        (e[2] = Math.exp(-((n + 0.14) * (n + 0.14) + (t + 0.4) * (t + 0.4)) * 40) * 0.8));
    },
  },
  [Ft.soft]: {
    pix: (n, t, e) => {
      const s = n * n + t * t;
      ((e[0] = Math.exp(-s * 3.2) * Le(1, 0.7, Math.sqrt(s))), (e[1] = 1), (e[2] = 0));
    },
  },
  [Ft.goose]: {
    core: 0.22,
    path: (n, t) => {
      n.fillStyle = "#fff";
      for (const s of [1, -1])
        (n.beginPath(),
          n.moveTo(0.2, 0.1 * s),
          n.quadraticCurveTo(0.34, 0.36 * s, 0.2, 0.56 * s),
          n.quadraticCurveTo(0.08, 0.8 * s, -0.26, 0.95 * s),
          n.quadraticCurveTo(-0.1, 0.72 * s, -0.16, 0.56 * s),
          n.quadraticCurveTo(-0.26, 0.4 * s, -0.2, 0.3 * s),
          n.quadraticCurveTo(-0.3, 0.22 * s, -0.28, 0.1 * s),
          n.closePath(),
          n.fill());
      (n.beginPath(),
        n.ellipse(-0.06, 0, 0.36, 0.15, 0, 0, Ro),
        n.fill(),
        n.beginPath(),
        n.moveTo(-0.32, 0.1),
        n.lineTo(-0.62, 0.11),
        n.lineTo(-0.56, 0),
        n.lineTo(-0.62, -0.11),
        n.lineTo(-0.32, -0.1),
        n.closePath(),
        n.fill(),
        n.beginPath(),
        n.moveTo(0.24, 0.1),
        n.quadraticCurveTo(0.5, 0.045, 0.78, 0.04),
        n.quadraticCurveTo(0.87, 0.085, 0.92, 0.03),
        n.lineTo(0.98, 0),
        n.lineTo(0.92, -0.03),
        n.quadraticCurveTo(0.87, -0.085, 0.78, -0.04),
        n.quadraticCurveTo(0.5, -0.045, 0.24, -0.1),
        n.closePath(),
        n.fill());
      const e = t.createRadialGradient(0, 0, 0.1, 0, 0, 1);
      (e.addColorStop(0, "#ffffff"),
        e.addColorStop(0.5, "#e8e8e8"),
        e.addColorStop(1, "#808080"),
        (t.fillStyle = e),
        t.fillRect(-1.2, -1.2, 2.4, 2.4),
        (t.lineCap = "round"));
      for (const s of [1, -1]) {
        ((t.strokeStyle = "rgba(60,60,60,0.55)"),
          (t.lineWidth = 0.035),
          t.beginPath(),
          t.moveTo(0.2, 0.16 * s),
          t.quadraticCurveTo(-0.05, 0.2 * s, -0.28, 0.14 * s),
          t.stroke(),
          (t.strokeStyle = "rgba(70,70,70,0.5)"),
          (t.lineWidth = 0.022));
        for (let i = 0; i < 4; i++) {
          const a = i / 3;
          (t.beginPath(),
            t.moveTo(0.08 - a * 0.12, (0.42 + a * 0.2) * s),
            t.lineTo(-0.18 - a * 0.06, (0.44 + a * 0.4) * s),
            t.stroke());
        }
      }
    },
  },
  [Ft.wave]: {
    pix: (n, t, e) => {
      const s = (o, r, l, c) => {
          const f = n - o,
            d = Math.atan2(t, f);
          if (Math.abs(d) >= l) return 0;
          const h = Math.pow(Math.cos((d / l) * Math.PI * 0.5), 0.7),
            u = Math.abs(Math.hypot(f, t) - r) / (c * h + 1e-4);
          return Le(1, 0.45, u) * h;
        },
        i = s(-0.55, 1.36, 0.66, 0.09),
        a = s(-0.62, 1.06, 0.5, 0.06);
      ((e[0] = Ve(i + a * 0.55)), (e[1] = 1), (e[2] = Ve(i * i * 0.7)));
    },
  },
  [Ft.ink]: {
    pix: (n, t, e) => {
      const s = Math.hypot(n, t),
        i = Math.atan2(t, n),
        a = un(n * 2.3 + 1.7, t * 2.3 + 5.1, 3, 61) - 0.5;
      let o = 0.4 + a * 0.26 + 0.05 * Math.sin(i * 5 + 1.3),
        r = 0;
      for (let l = 0; l < 5; l++) {
        const c = (l / 5) * Ro + Math.sin(l * 5.3) * 0.4 + 0.3,
          f = 0.14 + 0.26 * (0.5 + 0.5 * Math.sin(l * 3.1 + 1));
        let d = i - c;
        ((d = Math.atan2(Math.sin(d), Math.cos(d))), (o += f * Math.exp(-d * d * 34)));
        const h = 0.52 + f * 0.95,
          u = 0.045 + 0.03 * Math.sin(l * 2.7 + 0.5);
        r = Math.max(r, Le(u, u * 0.6, Math.hypot(n - Math.cos(c) * h, t - Math.sin(c) * h)));
      }
      r = Math.max(r, Le(o, o - 0.08, s));
      for (let l = 0; l < 8; l++) {
        const c = (l / 8) * Ro + Math.sin(l * 7.7) * 0.3 + 0.9,
          f = 0.7 + 0.18 * Math.sin(l * 4.3 + 2),
          d = 0.025 + 0.035 * (0.5 + 0.5 * Math.sin(l * 6.1));
        r = Math.max(r, Le(d, d * 0.6, Math.hypot(n - Math.cos(c) * f, t - Math.sin(c) * f)));
      }
      ((e[0] = r * Le(1, 0.94, s)), (e[1] = Ve(0.78 + a * 0.5)), (e[2] = 0));
    },
  },
  [Ft.scale]: {
    pix: (n, t, e) => {
      const s = (n + 1) * 0.5,
        i = 0.62 * Math.pow(Math.sin(Math.PI * Math.min(1, s * 1.08)), 0.75) * (1 - 0.3 * s) + 0.001,
        a = Math.abs(t) / i,
        o = Le(1, 0.86, a) * Le(-0.98, -0.9, n) * Le(0.99, 0.9, n);
      ((e[0] = o),
        (e[1] = Ve(0.55 + 0.45 * (1 - a) - 0.12 * s + 0.25 * Le(0.8, 0.95, a))),
        (e[2] = Ve(Math.exp(-a * a * 30) * Le(-0.6, 0.2, n) * 0.55 + Le(0.82, 0.95, a) * o * 0.3)));
    },
  },
  [Ft.puff]: {
    pix: (n, t, e) => {
      const s = Math.hypot(n, t),
        i = un(n * 2.1 + 3.1, t * 2.1 + 7.7, 3, 91) - 0.5,
        a = un(n * 5.3 + 1.9, t * 5.3 + 4.4, 2, 23) - 0.5,
        o = s + i * 0.8 + a * 0.3,
        r = Math.atan2(t, n),
        l = 0.5 + 0.5 * Math.sin(r * 2 + s * 9 + i * 6);
      ((e[0] = Le(0.95, 0.25, o) * Le(1, 0.85, s)),
        (e[1] = Ve(0.62 + t * 0.12 + l * 0.3 + a * 0.3)),
        (e[2] = Ve(Math.exp(-s * s * 9) * 0.35)));
    },
  },
  [Ft.broadleaf]: {
    pix: (n, t, e) => {
      const s = (n + 0.82) / 1.74,
        i =
          0.46 * Math.pow(Ve(Math.sin(Math.PI * Ve(s))), 0.85) * (1 + 0.15 * (0.5 - Math.abs(s - 0.55))) +
          0.001,
        a = Le(1, 0.9, Math.abs(t) / i) * Le(-0.86, -0.8, n) * Le(0.95, 0.9, n),
        o = Math.exp(-t * t * 900) * Le(-0.98, -0.92, n) * Le(-0.74, -0.8, n),
        r = Math.exp(-t * t * 600),
        l = Math.abs(((((n * 2.6 - Math.abs(t) * 2.2) % 1) + 1) % 1) - 0.5),
        c = Le(0.06, 0, l) * Le(0.95, 0.4, Math.abs(t) / i);
      ((e[0] = Ve(Math.max(a, o))),
        (e[1] = Ve(0.82 + 0.18 * (t > 0 ? 1 : 0.6) - r * 0.35 - c * 0.22 - (1 - Math.abs(t) / i) * 0.05)),
        (e[2] = 0));
    },
  },
  [Ft.splash]: {
    pix: (n, t, e) => {
      const s = Math.hypot(n, t),
        i = Math.atan2(t, n),
        a = 0.5 + 0.5 * Math.sin(i * 7 + 1.3) * Math.sin(i * 3 - 0.4),
        o = Math.exp(-((s - 0.62) * (s - 0.62)) * 600) * Le(0.2, 0.55, a);
      let r = 0,
        l = 0;
      for (let c = 0; c < 15; c++) {
        const f = (c / 15) * Ro + Math.sin(c * 7.31) * 0.18,
          d = 0.76 + 0.12 * Math.sin(c * 3.7 + 0.5),
          h = 0.055 + 0.04 * (0.5 + 0.5 * Math.sin(c * 5.13)),
          u = n - Math.cos(f) * d,
          m = t - Math.sin(f) * d,
          x = Math.hypot(u, m) / h;
        ((r = Math.max(r, Le(1, 0.75, x))),
          (l = Math.max(
            l,
            Math.exp(
              (-(u + h * 0.3) * (u + h * 0.3)) / (h * h * 0.08) -
                ((m - h * 0.3) * (m - h * 0.3)) / (h * h * 0.08),
            ),
          )));
      }
      ((e[0] = Ve(Math.max(o * 0.75, r))),
        (e[1] = Ve(0.8 + 0.2 * (t > 0 ? 1 : 0.7))),
        (e[2] = Ve(l * 0.8 + o * 0.2)));
    },
  },
  [Ft.star8]: {
    pix: (n, t, e) => {
      const s = Math.hypot(n, t);
      let i = 0;
      for (let o = 0; o < 8; o++) {
        const r = (o * Math.PI) / 4 + Math.PI / 2,
          l = o % 2 === 0 ? 0.96 : 0.56,
          c = Math.cos(r),
          f = Math.sin(r),
          d = n * c + t * f;
        if (d <= 0) continue;
        const h = Math.abs(-n * f + t * c),
          u = 0.16 * Ve(1 - d / l) + 0.004;
        i = Math.max(i, Le(u, u * 0.35, h) * Le(l, l * 0.9, d));
      }
      const a = Math.exp(-s * s * 26);
      ((e[0] = Ve(i + a * 0.85)), (e[1] = 1), (e[2] = Ve(a * 1.1 + i * 0.35 * Le(0.5, 0, s))));
    },
  },
};

function DI() {
  const n = ji * Xs,
    t = ih * Xs,
    e = (u) => {
      const m = document.createElement("canvas");
      ((m.width = n), (m.height = t));
      const x = m.getContext("2d", { willReadFrequently: !0 });
      if (!x) throw new Error("2D canvas 不可用");
      return ((x.fillStyle = u), x.fillRect(0, 0, n, t), [m, x]);
    },
    [, s] = e("#000"),
    [, i] = e("#fff"),
    a = new Uint8Array(n * t * 4),
    o = new Float32Array(ji * ih),
    r = [],
    l = (Xs / 2) * 0.86;
  for (let u = 0; u < ji * ih; u++) {
    const m = vb[u];
    if (!m) continue;
    const x = (u % ji) * Xs,
      p = Math.floor(u / ji) * Xs;
    if (m.path) {
      for (const g of [s, i])
        (g.save(),
          g.beginPath(),
          g.rect(x, p, Xs, Xs),
          g.clip(),
          g.setTransform(l, 0, 0, -l, x + Xs / 2, p + Xs / 2));
      (m.path(s, i), s.restore(), i.restore(), (o[u] = m.core ?? 0));
    } else m.pix && r.push(u);
  }
  const c = s.getImageData(0, 0, n, t).data,
    f = i.getImageData(0, 0, n, t).data;
  for (let u = 0; u < t; u++)
    for (let m = 0; m < n; m++) {
      const x = (u * n + m) * 4,
        p = Math.floor(u / Xs) * ji + Math.floor(m / Xs),
        g = c[x];
      ((a[x] = g), (a[x + 1] = f[x]), (a[x + 2] = Math.min(255, ((g * g) / 255) * o[p])), (a[x + 3] = 255));
    }
  const d = new Float32Array(3);
  for (const u of r) {
    const m = vb[u].pix,
      x = (u % ji) * Xs,
      p = Math.floor(u / ji) * Xs;
    for (let g = 0; g < Xs; g++)
      for (let y = 0; y < Xs; y++) {
        const v = (y + 0.5 - Xs / 2) / l,
          _ = -(g + 0.5 - Xs / 2) / l,
          k = ((p + g) * n + x + y) * 4;
        if (Math.abs(v) >= 1 || Math.abs(_) >= 1) {
          ((a[k] = 0), (a[k + 1] = 255), (a[k + 2] = 0), (a[k + 3] = 255));
          continue;
        }
        (m(v, _, d),
          (a[k] = Ve(d[0]) * 255),
          (a[k + 1] = Ve(d[1]) * 255),
          (a[k + 2] = Ve(d[2]) * 255),
          (a[k + 3] = 255));
      }
  }
  const h = new zr(a, n, t, Gs, mi);
  return (
    (h.colorSpace = Ki),
    (h.wrapS = h.wrapT = co),
    (h.generateMipmaps = !0),
    (h.minFilter = Fo),
    (h.magFilter = Ns),
    (h.anisotropy = 2),
    (h.needsUpdate = !0),
    (h.name = "fx.atlas"),
    h
  );
}

const gx = `
  #ifdef TONE_MAPPING
  // 遮挡部分(权重 1 - fxAdd)与叠加部分(权重 fxAdd)分别映射再合成。两部分不能先混色再统一乘系数：
  // 半叠加的粒子(0 < fxAdd < 1)那样算，覆盖率趋近 0 的外圈也会带着半份亮度，叠出一块边缘生硬的死白。
  gl_FragColor = vec4(fxC, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  vec3 fxOver = gl_FragColor.rgb * (fxA * (1.0 - fxAdd));
  gl_FragColor = vec4(kitAdditive(fxC * (fxA * fxAdd)), 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  gl_FragColor = vec4(fxOver + gl_FragColor.rgb, fxA * (1.0 - fxAdd));
  #else
  // HDR 路径的软上限(§7.1)：亮度 2.0 以下原样，以上平滑压向 3.2——只有小核心能明显越过 bloom 阈值 1.35，
  // 几层亮光叠在同一处也不会冲成一大团白
  float fxM = max(fxC.r, max(fxC.g, fxC.b));
  if (fxM > 2.0) fxC *= (2.0 + (fxM - 2.0) / (1.0 + (fxM - 2.0) / 1.2)) / fxM;
  gl_FragColor = vec4(fxC * fxA, fxA * (1.0 - fxAdd));
  #endif
`;

function Bh(n) {
  ((n.transparent = !0),
    (n.depthWrite = !1),
    (n.blending = Fh),
    (n.blendEquation = b0),
    (n.blendSrc = Cr),
    (n.blendDst = mo),
    (n.blendSrcAlpha = Cr),
    (n.blendDstAlpha = mo),
    (n.premultipliedAlpha = !0));
}
export { MI, II, PI, ji, ih, Ft, DI, gx, Bh };
