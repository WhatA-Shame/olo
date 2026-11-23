// 15-render-4.js — render｜45 个顶层语句｜67KB
// 对应 game.pretty.js 第 27462–29691 行
// 关键内容：
//   Vl                    立面补光：法线越接近水平，多吃一份地面反光(被太阳晒亮
//   uL                    顶面：按世界 xz 平铺的草贴图 + 大块色斑(与地表
//   bm                    环境染色在顶点采一次就够(贴图 1 米一个 texel
//   XL                    计时不可用：这台设备/浏览器没有 EXT_disjoi
//   hL                    rock
//   dx                    ) : t.map && (o.TOON_MAP =
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { Dr, Ee, Gs, Ki, Ns, Pi, Rr, Sr, co, fo, mi, ph, pi, ti } from './04-audio-2.js';
import { Vs, dt, go, kn } from './05-three.js';
import { Ut } from './06-three-2.js';
import { Ae, An, Bn, N0, On, Qs, Sn, Yi, zr } from './07-three-3.js';
import { Cf, DM, LM, PM, ox, wE } from './08-three-4.js';
import { ee } from './10-render-2.js';
import { BM, GM, Yt, aL, fs, fx, ke, nb, nh, nn, un, yl } from './14-three-7.js';

function cL(n = 256, t = 7) {
  const e = new Uint8Array(n * n * 4),
    s = 16,
    i = [];
  for (let o = 0; o < s; o++) for (let r = 0; r < s; r++) i.push(r + nn(r, o, t + 91), o + nn(r, o, t + 92));
  for (let o = 0; o < n; o++)
    for (let r = 0; r < n; r++) {
      const l = r / n,
        c = o / n,
        f = (o * n + r) * 4;
      ((e[f] = un(l * 4, c * 4, 4, t, 4) * 255),
        (e[f + 1] = un(l * 12, c * 12, 4, t + 31, 12) * 255),
        (e[f + 2] = un(l * 40, c * 40, 3, t + 67, 40) * 255));
      const d = l * s,
        h = c * s,
        u = Math.floor(d),
        m = Math.floor(h);
      let x = 9;
      for (let p = -1; p <= 1; p++)
        for (let g = -1; g <= 1; g++) {
          const y = (u + g + s) % s,
            v = (m + p + s) % s,
            _ = (v * s + y) * 2,
            k = i[_] - y + (u + g) - d,
            M = i[_ + 1] - v + (m + p) - h,
            S = k * k + M * M;
          S < x && (x = S);
        }
      e[f + 3] = Math.min(1, Math.sqrt(x)) * 255;
    }
  const a = new zr(e, n, n, Gs, mi);
  return (GM(a, { srgb: !1, repeat: !0, mipmaps: !0 }), a);
}

const F1 = new Map();

function fL(n, t) {
  let e = F1.get(n);
  return (e || ((e = t()), F1.set(n, e)), e);
}

function dL() {
  for (const n of F1.values()) n.dispose();
  F1.clear();
}

const Og = (n) => (n < 0 ? 0 : n > 255 ? 255 : n);

function hL() {
  return fL("rock", () =>
    fx(
      256,
      256,
      (n, t) => {
        const e = t,
          s = n.createImageData(e, e),
          i = s.data;
        for (let o = 0; o < e; o++)
          for (let r = 0; r < e; r++) {
            const l = r / e,
              c = o / e,
              f = un(l * 4, c * 4, 3, 3, 4),
              d = un(l * 2 + f * 0.6, c * 9 + f * 1.6, 3, 11, 2, 9),
              h = Math.abs(((c * 7 + f * 1.4) % 1) - 0.5);
            let u = 196 + (d - 0.5) * 56;
            h < 0.04 && (u -= 18 * (1 - h / 0.04));
            const m = un(l * 48, c * 48, 2, 23, 48);
            u += (m - 0.5) * 30;
            const x = (o * e + r) * 4;
            ((i[x] = Og(u)), (i[x + 1] = Og(u * 0.985)), (i[x + 2] = Og(u * 1)), (i[x + 3] = 255));
          }
        n.putImageData(s, 0, 0);
        const a = new ke(99);
        n.lineCap = "round";
        for (let o = 0; o < 46; o++) {
          const r = a.range(0, e),
            l = a.range(0, e),
            c = a.range(10, 42),
            f = a.range(-0.25, 0.25);
          ((n.strokeStyle = a.chance(0.5) ? "rgba(255,255,255,0.16)" : "rgba(40,44,60,0.14)"),
            (n.lineWidth = a.range(1, 2.6)),
            nh(e, r, l, c, (d, h) => {
              (n.beginPath(),
                n.moveTo(d - Math.cos(f) * c * 0.5, h - Math.sin(f) * c * 0.5),
                n.lineTo(d + Math.cos(f) * c * 0.5, h + Math.sin(f) * c * 0.5),
                n.stroke());
            }));
        }
      },
      { repeat: !0, anisotropy: 4 },
    ),
  );
}

const Vl = `
float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
vec2 hash22(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.xx + p3.yz) * p3.zy);
}
float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash12(i);
  float b = hash12(i + vec2(1.0, 0.0));
  float c = hash12(i + vec2(0.0, 1.0));
  float d = hash12(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
float fbm(vec2 p) {
  float s = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    s += a * vnoise(p);
    p = p * 2.03 + vec2(17.1, 9.7);
    a *= 0.5;
  }
  return s / 0.9375;
}
`,
  VM = `
uniform float uTime;
uniform vec4 uWind;
vec3 windOffset(vec3 wp, float w) {
  float t = uTime * uWind.w;
  float phase = dot(wp.xz, uWind.xy) * 0.42;
  float gust = sin(t * 1.25 - phase) * 0.55 + sin(t * 2.9 - phase * 2.1 + wp.x * 0.61) * 0.3 + 0.35;
  float flutter = sin(t * 6.3 + wp.x * 3.3 + wp.z * 2.7) * 0.12;
  float cross = sin(t * 1.9 + wp.x * 0.9 - wp.z * 1.3) * 0.25;
  vec2 d = (uWind.xy * (gust + flutter) + vec2(-uWind.y, uWind.x) * cross) * uWind.z * w;
  return vec3(d.x, -dot(d, d) * 0.35, d.y);
}
`,
  vm = `
float ditherThreshold(vec2 fragCoord) {
  return fract(52.9829189 * fract(dot(fragCoord, vec2(0.06711056, 0.00583715))));
}
`,
  If = `
#define KIT_SIDE_FILL ${aL.toFixed(3)}
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
vec3 kitAmbient(vec3 N) {
  vec3 irr = ambientLightColor;
  #if NUM_HEMI_LIGHTS > 0
  for (int i = 0; i < NUM_HEMI_LIGHTS; i++) {
    irr += getHemisphereLightIrradiance(hemisphereLights[i], N);
  }
  // 立面补光：法线越接近水平，多吃一份地面反光(被太阳晒亮的地面与对面的墙弹回来的暖光)。
  // 朝上的面(地表、台面)和朝下的面不受影响——只把岩壁、建筑和角色的背光立面托起来，暗面不发黑
  float ny = dot(N, hemisphereLights[0].direction);
  irr += hemisphereLights[0].groundColor * (KIT_SIDE_FILL * (1.0 - ny * ny));
  #endif
  return irr;
}
float kitShadow() {
  return getShadowMask();
}
vec3 kitSunDir() {
  #if NUM_DIR_LIGHTS > 0
  return directionalLights[0].direction;
  #else
  return normalize(vec3(-0.4, 0.8, 0.45));
  #endif
}
vec3 kitSunColor() {
  #if NUM_DIR_LIGHTS > 0
  return directionalLights[0].color;
  #else
  return vec3(0.0);
  #endif
}
vec3 kitPointLights(vec3 N, vec3 viewPos) {
  vec3 sum = vec3(0.0);
  #if NUM_POINT_LIGHTS > 0
  IncidentLight pl;
  for (int i = 0; i < NUM_POINT_LIGHTS; i++) {
    getPointLightInfo(pointLights[i], viewPos, pl);
    sum += pl.color * (dot(N, pl.direction) * 0.6 + 0.4);
  }
  #endif
  return sum;
}
`,
  Pf = `
#include <common>
#include <fog_pars_vertex>
#include <shadowmap_pars_vertex>
`,
  Df = `
#include <defaultnormal_vertex>
vec4 mvPosition = viewMatrix * worldPosition;
gl_Position = projectionMatrix * mvPosition;
vViewPosition = -mvPosition.xyz;
#include <shadowmap_vertex>
#include <fog_vertex>
`,
  zf = `
vec3 kitAdditive(vec3 c) {
  #ifdef TONE_MAPPING
  // 目标是「在 gamma 空间直接加上去」之后，观感接近 HDR 路径里「线性相加再色调映射」。后者在亮背景上其实加不了多少
  // (沙石地面上 1.0 的线性叠加只让显示值涨 0.2 出头)，所以这里把叠加量做成饱和曲线：显示值的增量最多 0.68，
  // 小数值基本线性。否则团战里几层辉光一叠就是一块死白，把英雄整个盖住(low 档又没有 bloom 来柔化边缘)。
  vec3 d = 0.68 * (1.0 - exp(-0.9 * max(c, vec3(0.0))));
  return pow(d, vec3(2.2));
  #else
  return c;
  #endif
}
`,
  aa = `
#include <tonemapping_fragment>
#include <colorspace_fragment>
#include <fog_fragment>
`,
  WM = `
float kitKick(vec3 N, vec3 V, vec2 dir) {
  float edge = smoothstep(0.42, 0.64, 1.0 - saturate(dot(N, V)));
  return edge * smoothstep(0.05, 0.6, dot(N.xy, dir));
}
`,
  Nf = `
#define KIT_LIGHT_TINT_GAIN ${BM.toFixed(2)}
uniform sampler2D tLightTint;
vec4 kitLightTint(vec2 worldXZ) {
  return texture2D(tLightTint, worldXZ * ${(0.5 / yl).toFixed(8)} + 0.5);
}
vec3 kitTintAmbient(vec3 ambient, vec4 lt) {
  return ambient * lt.a + lt.rgb * KIT_LIGHT_TINT_GAIN;
}
`;

function Ff(n) {
  return {
    ...N0.clone(ee.lights),
    ...N0.clone(ee.fog),
    tLightTint: fs.tLightTint,
    uShadeTintGround: fs.uShadeTintGround,
    uKickDir: fs.uKickDir,
    uKickColor: fs.uKickColor,
    ...n,
  };
}

const uL = `
${Pf}
#include <color_pars_vertex>
${VM}
uniform float uSway;
uniform float uSwayHeight;
#ifdef TOON_FX
attribute vec4 aFx;
#endif
varying vec4 vFx;
varying vec3 vNormal;
varying vec3 vViewPosition;
#ifdef TOON_MAP
uniform float uMapScale;
varying vec2 vUv;
#endif
#ifdef TOON_WORLD_POS
varying vec3 vWorldPos;
#endif
void main() {
  #include <color_vertex>
  #ifdef TOON_FX
  vFx = aFx;
  #else
  vFx = vec4(0.0, 0.0, 0.0, 1.0);
  #endif
  #ifdef TOON_MAP
  vUv = uv * uMapScale;
  #endif
  vec3 objectNormal = normal;
  vec4 worldPosition = vec4(position, 1.0);
  #ifdef USE_INSTANCING
  worldPosition = instanceMatrix * worldPosition;
  #endif
  worldPosition = modelMatrix * worldPosition;
  #ifdef TOON_WIND
  worldPosition.xyz += windOffset(worldPosition.xyz, uSway * (vFx.x + max(position.y, 0.0) * uSwayHeight));
  #endif
  #ifdef TOON_WORLD_POS
  vWorldPos = worldPosition.xyz;
  #endif
  ${Df}
  vNormal = normalize(transformedNormal);
}
`,
  pL = `
${If}
#include <color_pars_fragment>
${vm}
${WM}
#ifdef TOON_LIGHT_TINT
${Nf}
#endif
uniform vec3 uColor;
uniform vec3 uTint;
uniform float uOpacity;
uniform vec3 uEmissive;
uniform float uGlowBoost;
uniform vec4 uRamp;
uniform vec3 uShadeTint;
uniform vec3 uRimColor;
uniform vec2 uRim;
uniform vec2 uSpec;
uniform vec3 uTeamColor;
uniform float uFlash;
uniform vec3 uFlashColor;
#ifdef TOON_KICKER
uniform float uKick;
uniform vec2 uKickDir;
uniform vec3 uKickColor;
#endif
#ifdef TOON_MAP
uniform sampler2D tMap;
varying vec2 vUv;
#endif
#ifdef TOON_TRIPLANAR
uniform sampler2D tMap;
uniform float uTriScale;
#endif
#ifdef TOON_MAP_TOP
uniform sampler2D tMapTop;
uniform vec3 uMapTop;
#ifdef TOON_MAP_TOP_NOISE
uniform sampler2D tMapTopNoise;
#endif
#endif
#ifdef TOON_WORLD_POS
varying vec3 vWorldPos;
#endif
uniform float uMapGain;
varying vec4 vFx;
varying vec3 vNormal;
varying vec3 vViewPosition;

float toonRamp(float ndl) {
  #if TOON_STEPS == 1
  float h = ndl * 0.5 + 0.5;
  return h * h;
  #elif TOON_STEPS == 2
  return smoothstep(uRamp.x - uRamp.w, uRamp.x + uRamp.w, ndl);
  #else
  float a = smoothstep(uRamp.x - uRamp.w, uRamp.x + uRamp.w, ndl);
  float b = smoothstep(uRamp.y - uRamp.w, uRamp.y + uRamp.w, ndl);
  return a * uRamp.z + b * (1.0 - uRamp.z);
  #endif
}

void main() {
  #ifdef TOON_FLAT
  vec3 N = normalize(cross(dFdx(vViewPosition), dFdy(vViewPosition)));
  #else
  vec3 N = normalize(vNormal);
  #if defined(DOUBLE_SIDED) && !defined(TOON_KEEP_BACK_NORMALS)
  N *= gl_FrontFacing ? 1.0 : -1.0;
  #endif
  #endif

  vec4 base = vec4(uColor, uOpacity);
  #ifdef USE_COLOR
  base.rgb *= vColor.rgb;
  #endif
  #ifdef TOON_MAP
  vec4 texel = texture2D(tMap, vUv);
  base *= vec4(texel.rgb * uMapGain, texel.a);
  #endif
  #if defined(TOON_TRIPLANAR) || defined(TOON_MAP_TOP)
  vec3 Nw = inverseTransformDirection(N, viewMatrix);
  #endif
  #ifdef TOON_TRIPLANAR
  vec3 tw = abs(Nw);
  tw = tw * tw * tw * tw;
  tw /= tw.x + tw.y + tw.z;
  vec3 tp = vWorldPos * uTriScale;
  vec3 triTex = (texture2D(tMap, tp.zy).rgb * tw.x + texture2D(tMap, tp.xz).rgb * tw.y + texture2D(tMap, tp.xy).rgb * tw.z) * uMapGain;
  #ifdef TOON_MAP_MASK
  base.rgb *= mix(vec3(1.0), triTex, vFx.z);
  #else
  base.rgb *= triTex;
  #endif
  #endif
  #ifdef TOON_MAP_TOP
  // 顶面：按世界 xz 平铺的草贴图 + 大块色斑(与地表草地同一套做法，崖顶和地面连成一片)
  // 过渡放在 0.32~0.6：崖顶中轴线附近隆起处的斜面(法线 y 0.6~0.8)也铺满草贴图，不再是一块块没有纹理的浅色三角；
  // 竖直的岩面本来就被 aFx.z 蒙版挡在外面
  float topW = smoothstep(0.32, 0.6, Nw.y);
  #ifdef TOON_MAP_MASK
  topW *= 1.0 - vFx.z;
  #endif
  vec2 tuv = vWorldPos.xz * uMapTop.x;
  vec3 tg = texture2D(tMapTop, tuv).rgb * uMapTop.y;
  #ifdef TOON_MAP_TOP_DETAIL
  tg *= texture2D(tMapTop, vec2(tuv.y, -tuv.x) * 0.371 + 0.4).rgb * 0.8 + 0.62;
  #ifdef TOON_MAP_TOP_NOISE
  vec2 tn = texture2D(tMapTopNoise, vWorldPos.xz * 0.0213).rg;
  #else
  vec2 tn = 0.5 + 0.5 * vec2(sin(vWorldPos.x * 0.13 + sin(vWorldPos.z * 0.11) * 1.7), sin(vWorldPos.z * 0.17 - vWorldPos.x * 0.09 + 1.3));
  #endif
  vec3 topTint = mix(vec3(0.84, 0.97, 1.06), vec3(1.0), smoothstep(0.34, 0.62, tn.x));
  // 日晒那一档往橄榄收(不再发黄)，幅度减半
  topTint = mix(topTint, vec3(1.08, 1.04, 0.84), smoothstep(0.5, 0.74, tn.y) * 0.5);
  tg *= mix(vec3(1.0), topTint, uMapTop.z);
  #endif
  base.rgb *= mix(vec3(1.0), tg, topW);
  // 崖顶草向灰收一点：贴图乘上顶点色之后饱和度比色表高一截(实测 0.6 上下)，崖顶是画框，不该比场内的草还艳
  base.rgb = mix(base.rgb, vec3(dot(base.rgb, vec3(0.2126, 0.7152, 0.0722))), topW * 0.16);
  #endif
  #ifdef TOON_MAP_MASK
  base.rgb *= uTint;
  #else
  base.rgb = mix(base.rgb, uTeamColor, vFx.z) * uTint;
  #endif
  #ifdef ALPHATEST
  if (base.a < ALPHATEST) discard;
  #endif
  #ifdef TOON_DITHER_FADE
  if (base.a < 0.995) {
    if (base.a <= ditherThreshold(gl_FragCoord.xy)) discard;
  }
  base.a = 1.0;
  #endif

  vec3 V = normalize(vViewPosition);
  vec3 L = kitSunDir();
  float ndl = dot(N, L);
  float lit = toonRamp(ndl) * kitShadow();
  vec3 sun = kitSunColor();

  vec3 amb = kitAmbient(N);
  #ifdef TOON_LIGHT_TINT
  amb = kitTintAmbient(amb, kitLightTint(vWorldPos.xz));
  #endif
  vec3 irradiance = amb * vFx.w + sun * lit + kitPointLights(N, -vViewPosition);
  vec3 col = base.rgb * RECIPROCAL_PI * irradiance;
  col *= mix(uShadeTint, vec3(1.0), lit);

  // 轮廓光：受光侧暖边(暗部只留一点)
  float fres = pow(1.0 - saturate(dot(N, V)), uRim.y);
  col += uRimColor * (fres * uRim.x * (0.3 + 0.7 * lit));
  #ifdef TOON_KICKER
  // 背光侧冷边：只在朝屏幕右上、且不受光的轮廓上出现，把暗面从地面上分出来
  col += uKickColor * (kitKick(N, V, uKickDir) * (1.0 - 0.6 * lit) * uKick);
  #endif

  #ifdef TOON_SPECULAR
  vec3 H = normalize(L + V);
  float sp = pow(saturate(dot(N, H)), uSpec.y);
  col += sun * RECIPROCAL_PI * smoothstep(0.42, 0.58, sp) * uSpec.x * lit;
  #endif

  col += uEmissive + base.rgb * (vFx.y * uGlowBoost);
  col = mix(col, uFlashColor * 1.8, uFlash);

  gl_FragColor = vec4(col, base.a);
  ${aa}
}
`;

class dx extends An {
  isToonMaterial = !0;
  opts;
  constructor(t = {}) {
    (super(), (this.opts = { ...t }));
    const e = t.ramp ? 3 : (t.steps ?? 2),
      s = t.softness ?? 0.08,
      i = new Ut(t.emissive ?? 0).multiplyScalar(t.emissive !== void 0 ? (t.emissiveIntensity ?? 1) : 0),
      a = t.ramp ? new kn(t.ramp[0], t.ramp[1], t.ramp[2], s) : new kn(e === 3 ? -0.08 : 0.06, 0.5, 0.58, s);
    this.uniforms = Ff({
      uTime: fs.uTime,
      uWind: fs.uWind,
      uSway: { value: t.wind ?? 0 },
      uSwayHeight: { value: t.windByHeight ?? 0 },
      uColor: { value: new Ut(t.color ?? 16777215) },
      uTint: { value: new Ut(1, 1, 1) },
      uOpacity: { value: t.opacity ?? 1 },
      uEmissive: { value: i },
      uGlowBoost: { value: t.glowBoost ?? 3 },
      uRamp: { value: a },
      uShadeTint: t.shadeTint !== void 0 ? { value: new Ut(t.shadeTint) } : fs.uShadeTint,
      uRimColor: { value: new Ut(t.rimColor ?? Yt.env.rimWarm) },
      uRim: { value: new Ee(t.rim ?? 0.25, t.rimPower ?? 3) },
      uKick: { value: t.kicker ?? 0 },
      uSpec: { value: new Ee(t.specular ?? 0, t.gloss ?? 40) },
      uTeamColor: { value: new Ut(t.teamColor ?? 16777215) },
      uFlash: { value: 0 },
      uFlashColor: { value: new Ut(1, 1, 1) },
      tMap: { value: t.map ?? null },
      uMapScale: { value: t.mapScale ?? 1 },
      uTriScale: { value: t.triplanar ?? 0 },
      uMapGain: { value: t.mapGain ?? 1 },
      tMapTop: { value: t.mapTop ?? null },
      tMapTopNoise: { value: t.mapTopNoise ?? null },
      uMapTop: { value: new dt(t.mapTopScale ?? 0.1, t.mapTopGain ?? 2.1, t.mapTopPatch ?? 1) },
    });
    const o = { TOON_STEPS: e },
      r = !!t.map && (t.triplanar ?? 0) > 0,
      l = t.lightTint ?? !0;
    ((t.fx ?? !0) && (o.TOON_FX = ""),
      r ? (o.TOON_TRIPLANAR = "") : t.map && (o.TOON_MAP = ""),
      t.mapMask && (o.TOON_MAP_MASK = ""),
      t.mapTop &&
        ((o.TOON_MAP_TOP = ""),
        (t.mapTopDetail ?? !0) && (o.TOON_MAP_TOP_DETAIL = ""),
        t.mapTopNoise && (o.TOON_MAP_TOP_NOISE = "")),
      l && (o.TOON_LIGHT_TINT = ""),
      (r || t.mapTop || l) && (o.TOON_WORLD_POS = ""),
      t.flat && (o.TOON_FLAT = ""),
      t.flipBackNormals === !1 && (o.TOON_KEEP_BACK_NORMALS = ""),
      (t.wind ?? 0) > 0 && (o.TOON_WIND = ""),
      (t.specular ?? 0) > 0 && (o.TOON_SPECULAR = ""),
      (t.kicker ?? 0) > 0 && (o.TOON_KICKER = ""),
      t.transparent || (o.TOON_DITHER_FADE = ""),
      (this.defines = o),
      (this.vertexShader = uL),
      (this.fragmentShader = pL),
      (this.lights = !0),
      (this.fog = t.fog ?? !0),
      (this.vertexColors = t.vertexColors ?? !1),
      (this.side = t.side ?? Rr),
      (this.transparent = t.transparent ?? !1),
      t.depthWrite !== void 0 && (this.depthWrite = t.depthWrite),
      t.alphaTest && (this.alphaTest = t.alphaTest),
      t.polygonOffset &&
        ((this.polygonOffset = !0),
        (this.polygonOffsetFactor = -t.polygonOffset),
        (this.polygonOffsetUnits = -t.polygonOffset)));
  }
  get color() {
    return this.uniforms.uColor.value;
  }
  get emissive() {
    return this.uniforms.uEmissive.value;
  }
  get teamColor() {
    return this.uniforms.uTeamColor.value;
  }
  get tint() {
    return this.uniforms.uTint.value;
  }
  get rimColor() {
    return this.uniforms.uRimColor.value;
  }
  get flash() {
    return this.baseFlash;
  }
  set flash(t) {
    ((this.baseFlash = t), (this.uniforms.uFlash.value = t));
  }
  get fade() {
    return this.baseFade;
  }
  set fade(t) {
    ((this.baseFade = t), (this.uniforms.uOpacity.value = t));
  }
  baseFlash = 0;
  baseFade = 1;
  dirtyFromParams = !1;
  setMapTopDetail(t) {
    !this.opts.mapTop ||
      (this.defines.TOON_MAP_TOP_DETAIL !== void 0) === t ||
      ((this.opts.mapTopDetail = t),
      t ? (this.defines.TOON_MAP_TOP_DETAIL = "") : delete this.defines.TOON_MAP_TOP_DETAIL,
      (this.needsUpdate = !0));
  }
  onBeforeRender(t, e, s, i, a) {
    const o = a.userData.toon,
      r = this.uniforms;
    o
      ? ((r.uFlash.value = o.flash),
        r.uFlashColor.value.copy(o.flashColor),
        (r.uOpacity.value = o.opacity * this.baseFade),
        r.uTeamColor.value.copy(o.teamColor),
        r.uTint.value.copy(o.tint),
        (this.uniformsNeedUpdate = !0),
        (this.dirtyFromParams = !0))
      : this.dirtyFromParams &&
        ((r.uFlash.value = this.baseFlash),
        r.uFlashColor.value.setRGB(1, 1, 1),
        (r.uOpacity.value = this.baseFade),
        r.uTeamColor.value.set(this.opts.teamColor ?? 16777215),
        r.uTint.value.setRGB(1, 1, 1),
        (this.uniformsNeedUpdate = !0),
        (this.dirtyFromParams = !1));
  }
  clone() {
    const t = new dx(this.opts),
      e = this.uniforms,
      s = t.uniforms;
    for (const i of ["uColor", "uEmissive", "uRimColor", "uTeamColor", "uTint", "uFlashColor"])
      s[i].value.copy(e[i].value);
    return (
      s.uShadeTint !== fs.uShadeTint && s.uShadeTint.value.copy(e.uShadeTint.value),
      s.uRamp.value.copy(e.uRamp.value),
      s.uRim.value.copy(e.uRim.value),
      s.uSpec.value.copy(e.uSpec.value),
      s.uMapTop.value.copy(e.uMapTop.value),
      (s.uKick.value = e.uKick.value),
      (s.uSway.value = e.uSway.value),
      (s.uSwayHeight.value = e.uSwayHeight.value),
      (s.uGlowBoost.value = e.uGlowBoost.value),
      (s.tMap.value = e.tMap.value),
      (s.tMapTop.value = e.tMapTop.value),
      (s.tMapTopNoise.value = e.tMapTopNoise.value),
      (t.flash = this.baseFlash),
      (t.fade = this.baseFade),
      t
    );
  }
}

function Qc(n = {}) {
  return new dx(n);
}

const bm = `
uniform highp sampler2D uBones;
attribute vec3 aSkin;
vec3 qrot(vec4 q, vec3 v) {
  return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);
}
void boneXf(float idx, out vec4 ps, out vec4 q) {
  int x = int(idx + 0.5) * 2;
  ps = texelFetch(uBones, ivec2(x, gl_InstanceID), 0);
  q = texelFetch(uBones, ivec2(x + 1, gl_InstanceID), 0);
}
`,
  _m = `
  vec4 ps0;
  vec4 q0;
  vec4 ps1;
  vec4 q1;
  boneXf(aSkin.x, ps0, q0);
  vec3 skinnedPos = ps0.xyz + ps0.w * qrot(q0, position);
  vec3 skinnedNormal = qrot(q0, normal);
  if (aSkin.z < 0.999) {
    boneXf(aSkin.y, ps1, q1);
    skinnedPos = mix(ps1.xyz + ps1.w * qrot(q1, position), skinnedPos, aSkin.z);
    skinnedNormal = mix(qrot(q1, normal), skinnedNormal, aSkin.z);
  }
`,
  mL = `
${Pf}
#include <color_pars_vertex>
${bm}
${Nf}
attribute vec4 aFx;
attribute vec4 aMat;
attribute vec4 aInstA;
attribute vec3 aInstTeam;
attribute vec4 aInstTint;
attribute vec3 aInstBody;
varying vec4 vFx;
varying vec4 vInstA;
varying vec3 vTeam;
varying vec4 vTint;
varying vec3 vBody;
varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec4 vLt;
varying vec4 vObj;
varying vec3 vObjN;
varying vec2 vUv;
flat varying vec4 vMat;
void main() {
  #include <color_vertex>
  vUv = uv;
  vFx = aFx;
  vMat = aMat;
  vInstA = aInstA;
  vTeam = aInstTeam;
  vTint = aInstTint;
  vBody = aInstBody;
  ${_m}
  vec3 objectNormal = skinnedNormal;
  vec4 worldPosition = vec4(skinnedPos, 1.0);
  // 环境染色在顶点采一次就够(贴图 1 米一个 texel)；vObj.w = 离地高度(冷边在脚底渐隐)
  vLt = kitLightTint(skinnedPos.xz);
  vObj = vec4(position, skinnedPos.y);
  vObjN = normal;
  ${Df}
  vNormal = normalize(transformedNormal);
}
`,
  gL = `
void unitPattern(int id, vec2 q, float t, out float tone, out float edge, out float glowMul) {
  tone = 1.0;
  edge = 0.0;
  glowMul = 1.0;
  if (id == 1) {
    // 鳞 / 甲片：错排的圆弧鳞。根部被上一排压住(暗)，下缘翘起(亮边)，逐片明暗略有不同
    float row = floor(q.y);
    float x = q.x + 0.5 * mod(row, 2.0);
    vec2 f = vec2(fract(x) - 0.5, q.y - row);
    float d = length(vec2(f.x, (f.y - 0.62) * 0.86)) / 0.6;
    float inside = 1.0 - smoothstep(0.84, 1.0, d);
    tone = (0.86 + 0.24 * hash12(vec2(floor(x), row))) * mix(0.78, 1.08, 1.0 - f.y);
    tone = mix(0.58, tone, inside);
    edge = smoothstep(0.55, 0.84, d) * inside * step(f.y, 0.62);
  } else if (id == 2) {
    // 岩层：被低频噪声扭曲的水平层理，层间一道暗缝，层的上沿受光
    float y = q.y + (vnoise(q * 0.35) - 0.5) * 1.3;
    float fy = fract(y);
    tone = (0.84 + 0.3 * hash12(vec2(floor(y), 3.0))) * (0.94 + 0.12 * vnoise(q * 2.3));
    tone *= 1.0 - 0.32 * (1.0 - smoothstep(0.0, 0.1, fy));
    edge = smoothstep(0.8, 0.98, fy) * 0.5;
  } else if (id == 3) {
    // 毛笔触：顺着毛向(物体空间的竖直方向)拉长的明暗条
    float n = vnoise(vec2(q.x * 3.2, q.y * 0.55));
    float n2 = vnoise(vec2(q.x * 7.0 + 3.7, q.y * 1.1 + 1.3));
    tone = 0.8 + 0.3 * n + 0.16 * (n2 - 0.5);
    edge = smoothstep(0.62, 0.9, n) * 0.25;
  } else if (id == 4) {
    // 织纹：经纬交替的方格，每格一根鼓起的线
    vec2 c = floor(q);
    vec2 f = fract(q);
    float odd = mod(c.x + c.y, 2.0);
    float u = mix(f.y, f.x, odd);
    float v = mix(f.x, f.y, odd);
    tone = (0.9 + 0.16 * sin(u * 3.14159)) * (0.9 + 0.1 * smoothstep(0.0, 0.14, v) * smoothstep(1.0, 0.86, v));
  } else if (id == 5) {
    // 树皮：竖向的沟槽，被噪声扭弯
    float w = vnoise(q * vec2(0.6, 0.25)) * 2.2;
    float r = abs(fract(q.x + w) - 0.5) * 2.0;
    tone = (0.9 + 0.22 * vnoise(q * vec2(2.0, 0.7))) * (1.0 - 0.4 * (1.0 - smoothstep(0.0, 0.32, r)));
    edge = smoothstep(0.7, 1.0, r) * 0.3;
  } else if (id == 6) {
    // 熔纹：暗壳 + 缓慢流动、明灭的发光裂纹
    vec2 fl = vec2(t * 0.05, t * 0.08);
    float n = vnoise(q * 0.9 + fl);
    float n2 = vnoise(q * 1.9 - fl * 1.7 + 5.2);
    float r = abs(n - 0.5) * 2.0 + abs(n2 - 0.5) * 0.6;
    float crack = 1.0 - smoothstep(0.04, 0.26, r);
    float pulse = 0.72 + 0.28 * sin(t * 1.7 + n2 * 9.0);
    tone = mix(0.14, 1.0, crack);
    glowMul = crack * pulse;
  } else if (id == 7) {
    // 翼脉 / 叶脉：主脉 + 斜向细支脉
    float v1 = 1.0 - smoothstep(0.0, 0.1, abs(fract(q.x) - 0.5));
    float v2 = 1.0 - smoothstep(0.0, 0.07, abs(fract(q.y * 2.0 + abs(fract(q.x) - 0.5) * 2.4) - 0.5));
    tone = (0.94 + 0.12 * vnoise(q * 1.7)) * (1.0 - 0.34 * v1) * (1.0 - 0.16 * v2);
    edge = v1 * 0.35;
  } else if (id == 8) {
    // 陨铁交叉纹：三组互成 60° 的平行片晶，随机几条发亮
    float l = 0.0;
    for (int i = 0; i < 3; i++) {
      float a = float(i) * 1.0472 + 0.35;
      float u = dot(q, vec2(cos(a), sin(a)));
      float band = floor(u);
      float fu = fract(u);
      float on = step(0.56, hash12(vec2(band, float(i) * 7.0 + 1.0)));
      l = max(l, on * smoothstep(0.0, 0.12, fu) * smoothstep(1.0, 0.88, fu) * (0.6 + 0.4 * hash12(vec2(band, float(i) + 11.0))));
    }
    tone = 0.86 + 0.26 * l;
    edge = l * 0.6;
  }
}
`,
  xL = `
${If}
#include <color_pars_fragment>
${vm}
${Vl}
${WM}
#define KIT_LIGHT_TINT_GAIN ${BM.toFixed(2)}
uniform vec4 uRamp;
uniform vec3 uShadeTint;
uniform vec3 uSkinShade;
uniform vec3 uRimColor;
uniform vec2 uRim;
uniform vec2 uSpec;
uniform float uGlowBoost;
uniform float uKick;
uniform vec2 uKickDir;
uniform vec3 uKickColor;
uniform float uTime;
uniform sampler2D uMap;
uniform float uMapOn;
varying vec4 vFx;
varying vec4 vInstA;
varying vec3 vTeam;
varying vec4 vTint;
varying vec3 vBody;
varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec4 vLt;
varying vec4 vObj;
varying vec3 vObjN;
varying vec2 vUv;
flat varying vec4 vMat;

// 各材质类别的参数：x = 高光强度，y = 高光锐度，z = 明暗交界的柔和倍率，w = 假环境反射强度
const vec4 MAT_PARAMS[7] = vec4[7](
  vec4(0.0, 24.0, 1.7, 0.0),
  vec4(0.1, 14.0, 1.5, 0.0),
  vec4(0.3, 10.0, 1.0, 0.0),
  vec4(1.15, 52.0, 0.8, 0.7),
  vec4(0.85, 70.0, 0.9, 0.2),
  vec4(0.0, 24.0, 2.2, 0.0),
  vec4(0.22, 28.0, 0.6, 0.0)
);
#ifdef UNIT_PATTERNS
${gL}
#endif

void main() {
  float opacity = vInstA.x;
  if (opacity < 0.995) {
    if (opacity <= ditherThreshold(gl_FragCoord.xy)) discard;
  }
  vec3 N = normalize(vNormal);
  vec3 V = normalize(vViewPosition);
  int cat = clamp(int(vMat.w * 8.0 + 0.5), 0, 6);
  vec4 mp = MAT_PARAMS[cat];

  // 本体乘色只作用在非队伍色区域；队伍色只染蒙版区域；整体染色(石化/冰冻/阵亡变灰)按 vTint.a 的强度向灰度化后的染色过渡
  vec3 base = mix(vColor.rgb * vBody, vTeam, vFx.z);
  // 外部网格(glTF)的 basecolor：uMapOn=0 时是纯白，乘上去不影响原生英雄
  base *= mix(vec3(1.0), texture2D(uMap, vUv).rgb, uMapOn);
  float lum = dot(base, vec3(0.3, 0.55, 0.15));
  base = mix(base, vTint.rgb * mix(lum, 1.0, 0.25) * 1.6, vTint.a);

  float patEdge = 0.0;
  float glowMul = 1.0;
  // 有纹样的金属面：高光打碎到纹样的棱边上(见下面的高光一节)。1 = 不打碎
  float specBreak = 1.0;
  #ifdef UNIT_PATTERNS
  int pat = int(vMat.x * 8.0 + 0.5);
  // 屏幕空间导数放在分支外面算(分支里求导在个别驱动上不可靠)
  vec3 objFw = fwidth(vObj.xyz);
  if (pat > 0 && vMat.z > 0.004) {
    // 三向投影：绑定姿态坐标按法线主轴投到二维。绝大多数像素只有一个轴有权重、只算一次；
    // 两个轴权重接近的过渡带里两边都算再混合，球面和圆柱上不留接缝。格子小到接近像素时淡出(远处不闪)
    vec3 w = abs(vObjN);
    w *= w;
    w *= w;
    w /= w.x + w.y + w.z;
    float cells = vMat.y * 32.0;
    vec3 fw = objFw * cells;
    float toneSum = 0.0;
    float edgeSum = 0.0;
    float glowSum = 0.0;
    float wSum = 0.0;
    float tone;
    float edge;
    float gm;
    if (w.y > 0.06) {
      unitPattern(pat, vObj.xz * cells, uTime, tone, edge, gm);
      float f = w.y * (1.0 - smoothstep(0.3, 0.8, max(fw.x, fw.z)));
      toneSum += mix(w.y, w.y * tone, f / w.y);
      edgeSum += edge * f;
      glowSum += mix(w.y, w.y * gm, f / w.y);
      wSum += w.y;
    }
    if (w.x > 0.06) {
      unitPattern(pat, vObj.zy * cells, uTime, tone, edge, gm);
      float f = w.x * (1.0 - smoothstep(0.3, 0.8, max(fw.z, fw.y)));
      toneSum += mix(w.x, w.x * tone, f / w.x);
      edgeSum += edge * f;
      glowSum += mix(w.x, w.x * gm, f / w.x);
      wSum += w.x;
    }
    if (w.z > 0.06) {
      unitPattern(pat, vObj.xy * cells, uTime, tone, edge, gm);
      float f = w.z * (1.0 - smoothstep(0.3, 0.8, max(fw.x, fw.y)));
      toneSum += mix(w.z, w.z * tone, f / w.z);
      edgeSum += edge * f;
      glowSum += mix(w.z, w.z * gm, f / w.z);
      wSum += w.z;
    }
    float k = vMat.z;
    base *= mix(1.0, toneSum / wSum, k);
    patEdge = edgeSum / wSum * k;
    glowMul = mix(1.0, glowSum / wSum, k);
    specBreak = mix(1.0, 0.16 + 0.84 * min(1.0, edgeSum / wSum * 1.5), min(1.0, k * 4.0));
  }
  #endif

  vec3 L = kitSunDir();
  float ndl = dot(N, L);
  float soft = uRamp.w * mp.z;
  float a = smoothstep(uRamp.x - soft, uRamp.x + soft, ndl);
  float b = smoothstep(uRamp.y - soft, uRamp.y + soft, ndl);
  float lit = (a * uRamp.z + b * (1.0 - uRamp.z)) * kitShadow();
  vec3 sun = kitSunColor();
  float ao = vFx.w;
  #ifndef USE_SHADOWMAP
  // 没有阴影贴图的画质档(low)：模型没有自阴影，凹处与檐下全靠顶点里烘的遮蔽撑明暗——让它再压一截主光，
  // 浅色的塔身、城垣才不会整面一个亮度。有阴影贴图的档位不走这里
  lit *= mix(0.72, 1.0, ao);
  #endif
  float metal = cat == 3 ? 1.0 : 0.0;

  // 技能闪光的点光是按「离地一两米、照亮地面」调的强度；单位就站在光源边上，按平方衰减会比地面亮十倍，
  // 整个人被打成一团白。所以单位只吃一部分点光，并做软上限：只留下染色与提亮的感觉
  vec3 pl = kitPointLights(N, -vViewPosition) * 0.5;
  pl /= 1.0 + max(pl.r, max(pl.g, pl.b)) * 0.8;
  // 环境光 = 半球光 × 天光可见度 + 环境染色(站在红方基地里带一层暖红补光，站在河里带青色)
  vec3 amb = (kitAmbient(N) * vLt.a + vLt.rgb * KIT_LIGHT_TINT_GAIN) * ao;
  vec3 irradiance = amb + sun * lit * mix(1.0, ao, 0.4) + pl;
  // 金属的漫反射压暗一截，亮度让给高光与环境反射
  vec3 col = base * RECIPROCAL_PI * irradiance * (1.0 - 0.42 * metal);
  // 暗部乘色：统一偏冷紫；皮肤的暗部偏暖(血色)
  col *= mix(cat == 1 ? uSkinShade : uShadeTint, vec3(1.0), lit);

  float fres = pow(1.0 - saturate(dot(N, V)), uRim.y);
  // 受光侧暖边
  col += uRimColor * (fres * uRim.x * (0.3 + 0.7 * lit) * mix(0.55, 1.0, ao));
  // 背光侧冷边：朝屏幕右上、不受光的轮廓上一道冷色亮边，把暗面从地面上分出来；脚底半米内渐隐(不然会和地面的接触暗部打架)
  col += uKickColor * (kitKick(N, V, uKickDir) * (1.0 - 0.6 * lit) * uKick * smoothstep(0.0, 0.5, vObj.w) * mix(0.6, 1.0, ao));

  // 风格化高光：类别自带的强度与旧的 aFx.x(高光强度)取较大者；纹样的棱边(鳞缘、片晶)再加一点
  vec3 H = normalize(L + V);
  float sAmt = max(mp.x, vFx.x * uSpec.x);
  float sPow = mp.x > 0.0 ? mp.y : uSpec.y;
  float sp = pow(saturate(dot(N, H)), sPow);
  // 金属 / 晶体 / 岩，以及只靠旧的 aFx.x 出高光的面：硬边亮斑；皮肤 / 皮革：边缘柔一些
  float hard = cat >= 3 || mp.x == 0.0 ? 0.08 : 0.3;
  // 金属的高光带上金属自己的颜色(深色的铁亮得有限，铜与亮钢才接近主光的亮度)。大块平直的甲片会整片对上高光方向：
  // 原先一律按主光的亮度加上去，深色札甲上就是一块块不规则的米白斑；现在是一片提亮的金属色(最亮的甲片 L* 85~92)
  // 带纹样的金属(札甲的甲片、陨铁的片晶)再把高光打碎到纹样的棱边上：读成一片片甲缘在反光，而不是整块面翻白；
  // 远处纹样淡出后只留两成，对局镜头下不再冒零星白点
  vec3 specCol = sun * RECIPROCAL_PI;
  float specMask = smoothstep(0.5 - hard, 0.5 + hard, sp);
  if (cat == 3) {
    specCol *= 0.3 + base;
    specMask *= specBreak;
  }
  col += specCol * (specMask * sAmt * (1.0 + patEdge) * lit);
  col += sun * RECIPROCAL_PI * base * patEdge * 0.5 * lit;
  // 假环境反射：反射方向朝上取天光(冷)、朝下取地面反光(暖)
  float env = max(mp.w, vFx.x * 0.22);
  if (env > 0.0) {
    vec3 R = reflect(-V, N);
    #if NUM_HEMI_LIGHTS > 0
    // 地平线以上取天光(冷)、以下取地面反光(暖)，交界收紧成一道明暗线——金属感主要靠这条线
    float ry = dot(R, hemisphereLights[0].direction);
    vec3 envCol = mix(hemisphereLights[0].groundColor, hemisphereLights[0].skyColor, smoothstep(-0.14, 0.2, ry));
    #else
    vec3 envCol = kitAmbient(R);
    #endif
    col += base * envCol * (RECIPROCAL_PI * env * (0.55 + 0.9 * fres));
  }
  if (cat == 4) {
    // 晶体：轮廓提亮 + 背光透射(光从背面穿过来)
    col += base * (kitAmbient(N) * RECIPROCAL_PI * fres * 1.2 + sun * RECIPROCAL_PI * saturate(-ndl) * 0.4);
  } else if (cat == 5) {
    // 毛：轮廓上一层柔和的绒光
    col += base * (kitAmbient(N) + sun * lit * 0.6) * (RECIPROCAL_PI * 0.45 * sqrt(fres));
  }

  col += base * (vFx.y * uGlowBoost * vInstA.z * glowMul);
  // 受击闪白：整体提亮并叠一层暖白，但保留自身的明暗与配色(直接换成纯白的话，被集火的单位会连成一团白色剪影)
  col = mix(col, col * 1.45 + vec3(0.6, 0.58, 0.54), vInstA.y);

  gl_FragColor = vec4(col, 1.0);
  ${aa}
}
`,
  yL = `
#include <common>
${bm}
attribute vec4 aInstA;
varying vec2 vHighPrecisionZW;
varying float vOpacity;
void main() {
  ${_m}
  vOpacity = aInstA.x;
  gl_Position = projectionMatrix * viewMatrix * vec4(skinnedPos, 1.0);
  vHighPrecisionZW = gl_Position.zw;
}
`,
  vL = `
#include <common>
#include <packing>
varying vec2 vHighPrecisionZW;
varying float vOpacity;
void main() {
  // 半透明(草丛内/淡出中)的单位不投影
  if (vOpacity < 0.75) discard;
  #ifdef USE_REVERSED_DEPTH_BUFFER
  float fragCoordZ = vHighPrecisionZW[0] / vHighPrecisionZW[1];
  #else
  float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
  #endif
  gl_FragColor = packDepthToRGBA(fragCoordZ);
}
`,
  bL = `
#include <common>
#include <fog_pars_vertex>
${bm}
attribute vec4 aOutline;
attribute vec4 aFx;
attribute vec4 aInstA;
attribute vec3 aInstTeam;
attribute vec3 aInstBody;
uniform float uLine;
varying float vOpacity;
varying float vRim;
varying vec3 vBase;
void main() {
  ${_m}
  vec3 n = qrot(q0, aOutline.xyz);
  if (aSkin.z < 0.999) n = mix(qrot(q1, aOutline.xyz), n, aSkin.z);
  vec4 mvPosition = viewMatrix * vec4(skinnedPos, 1.0);
  // 线宽按视距换算成恒定的屏幕像素；被缩没的部件(骨骼缩放趋零)不留描边残点
  float sc = ps0.w;
  if (aSkin.z < 0.999) sc = mix(ps1.w, ps0.w, aSkin.z);
  float w = aOutline.w * uLine * -mvPosition.z * min(1.0, sc * 4.0);
  mvPosition = viewMatrix * vec4(skinnedPos + normalize(n) * w, 1.0);
  vOpacity = aInstA.x;
  vRim = aInstA.w;
  // 描边带一点本体色(本体色压暗后与统一的深色各半)：比一律深蓝更干净，浅色件不会被勾出一圈脏边
  vBase = mix(color * aInstBody, aInstTeam, aFx.z);
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}
`,
  _L = `
#include <common>
#include <fog_pars_fragment>
${vm}
uniform vec3 uColor;
varying float vOpacity;
varying float vRim;
varying vec3 vBase;
void main() {
  if (vOpacity < 0.995) {
    if (vOpacity <= ditherThreshold(gl_FragCoord.xy)) discard;
  }
  vec3 line = mix(vBase * 0.35, uColor, 0.5);
  // 逐实例的描边掺金(InstanceLook.rim)：0.5 上下是暗金(星陨祝福期间常驻)，1 是亮金(河道巨龙击杀奖励的一闪)；亮度压在泛光阈值以下
  line = mix(line, vec3(1.0, 0.74, 0.26) * (0.34 + 0.86 * vRim), min(1.0, vRim * 1.7));
  gl_FragColor = vec4(line, 1.0);
  ${aa}
}
`,
  wL = `
#include <common>
${bm}
attribute vec4 aInstA;
attribute vec4 aInstX;
uniform float uPull;
varying vec4 vX;
void main() {
  ${_m}
  vec4 mv = viewMatrix * vec4(skinnedPos, 1.0);
  mv.xyz *= 1.0 - uPull / max(uPull * 2.0, -mv.z);
  gl_Position = projectionMatrix * mv;
  vX = vec4(aInstX.rgb, aInstX.a * aInstA.x);
  // 不需要剪影的实例整个挪出裁剪空间
  if (vX.a <= 0.01) gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
}
`,
  ML = `
#include <common>
${vm}
varying vec4 vX;
void main() {
  if (vX.a * 0.72 <= ditherThreshold(gl_FragCoord.xy)) discard;
  gl_FragColor = vec4(vX.rgb, 1.0);
  ${aa}
}
`;

let s3 = !0;

const hx = new Set();

function kL(n) {
  if (n !== s3) {
    s3 = n;
    for (const t of hx)
      (n ? (t.defines.UNIT_PATTERNS = "") : delete t.defines.UNIT_PATTERNS, (t.needsUpdate = !0));
  }
}

function SL(n) {
  return n.startsWith("hero:") || n.startsWith("preview:") || n.startsWith("portrait:")
    ? 0.55
    : n.startsWith("monster:")
      ? 0.5
      : n.startsWith("minion:")
        ? 0.4
        : 0.3;
}

function TL(n, t, e) {
  const s = new An({
    uniforms: Ff({
      uBones: { value: n },
      uTime: fs.uTime,
      uRamp: { value: new kn(-0.08, 0.5, 0.58, 0.08) },
      uShadeTint: t.shadeTint !== void 0 ? { value: new Ut(t.shadeTint) } : fs.uShadeTint,
      uSkinShade: { value: new Ut(15245456) },
      uRimColor: { value: new Ut(t.rimColor ?? Yt.env.rimWarm) },
      uRim: { value: new Ee(t.rim ?? 0.3, t.rimPower ?? 3) },
      uKick: { value: t.kicker ?? SL(e) },
      uSpec: { value: new Ee(t.specular ?? 0.9, t.gloss ?? 36) },
      uGlowBoost: { value: t.glowBoost ?? 3 },
      uMap: { value: t.map ?? null },
      uMapOn: { value: t.map ? 1 : 0 },
    }),
    defines: s3 ? { UNIT_PATTERNS: "" } : {},
    vertexShader: mL,
    fragmentShader: xL,
    lights: !0,
    fog: !0,
    vertexColors: !0,
  });
  return (hx.add(s), s);
}

function EL(n) {
  return new An({ uniforms: { uBones: { value: n } }, vertexShader: yL, fragmentShader: vL });
}

const ib = new Ee();

function AL(n, t, e) {
  const s = new An({
    uniforms: {
      ...N0.clone(ee.fog),
      uBones: { value: n },
      uLine: { value: 0.001 },
      uColor: { value: new Ut(e) },
    },
    vertexShader: bL,
    fragmentShader: _L,
    side: pi,
    fog: !0,
    vertexColors: !0,
  });
  return (
    (s.onBeforeRender = (i, a, o) => {
      (i.getSize(ib),
        (s.uniforms.uLine.value = (t * 2) / (o.projectionMatrix.elements[5] * Math.max(1, ib.y))));
    }),
    s
  );
}

function RL(n) {
  return new An({
    uniforms: { uBones: { value: n }, uPull: { value: 0.7 } },
    vertexShader: wL,
    fragmentShader: ML,
    depthFunc: ph,
    depthWrite: !1,
  });
}

function sh() {
  return {
    opacity: 1,
    flash: 0,
    glow: 1,
    team: new Ut(1, 1, 1),
    tint: new Ut(1, 1, 1),
    tintAmount: 0,
    body: new Ut(1, 1, 1),
    xray: new Ut(1, 1, 1),
    xrayAmount: 0,
    rim: 0,
  };
}

class ux {
  mesh;
  count = 0;
  triangles;
  source;
  bones;
  capacity;
  geo;
  tex;
  data;
  instA;
  instTeam;
  instTint;
  instBody;
  instX = null;
  wantXray;
  material;
  depth;
  outline = null;
  outlineMat = null;
  xray = null;
  xrayMat = null;
  xrayOn = !0;
  constructor(t, e, s, i = {}, a = "unit-batch") {
    ((this.source = t),
      (this.bones = e),
      (this.capacity = Math.max(1, s)),
      (this.triangles = (t.index ? t.index.count : t.attributes.position.count) / 3),
      (this.wantXray = i.xray === !0),
      t.attributes.aMat ||
        t.setAttribute("aMat", new On(new Uint8Array(t.attributes.position.count * 4), 4, !0)),
      this.allocate(),
      (this.material = TL(this.tex, i, a)),
      (this.depth = EL(this.tex)));
    const o = new Sn(this.geo, this.material);
    if (
      ((o.name = a),
      (o.customDepthMaterial = this.depth),
      (o.castShadow = !0),
      (o.receiveShadow = !0),
      (o.frustumCulled = !1),
      (o.matrixAutoUpdate = !1),
      (o.visible = !1),
      (o.renderOrder = 2),
      (this.mesh = o),
      this.wantXray)
    ) {
      this.xrayMat = RL(this.tex);
      const l = new Sn(this.geo, this.xrayMat);
      ((l.name = `${a}:xray`),
        (l.frustumCulled = !1),
        (l.matrixAutoUpdate = !1),
        (l.visible = !1),
        (l.renderOrder = 1),
        (this.xray = l));
    }
    const r = i.outline ?? 0;
    if (r > 0) {
      this.outlineMat = AL(this.tex, r, i.outlineColor ?? 1778227);
      const l = new Sn(this.geo, this.outlineMat);
      ((l.name = `${a}:outline`),
        (l.frustumCulled = !1),
        (l.matrixAutoUpdate = !1),
        (l.visible = !1),
        (l.renderOrder = 2),
        (this.outline = l));
    }
  }
  addTo(t) {
    (t.add(this.mesh), this.outline && t.add(this.outline), this.xray && t.add(this.xray));
  }
  removeFrom(t) {
    (t.remove(this.mesh), this.outline && t.remove(this.outline), this.xray && t.remove(this.xray));
  }
  setOutlineVisible(t) {
    this.outlineOn = t;
  }
  setXrayVisible(t) {
    this.xrayOn = t;
  }
  outlineOn = !0;
  allocate() {
    const t = this.capacity,
      e = new Cf(),
      s = this.source;
    e.setIndex(s.index);
    for (const a of ["position", "normal", "color", "aFx", "aMat", "aSkin", "aOutline"])
      e.setAttribute(a, s.attributes[a]);
    // 外部网格才有 uv；原生英雄的几何没有这个属性，材质里 uMapOn=0 也不会采样
    s.attributes.uv && e.setAttribute("uv", s.attributes.uv);
    ((this.instA = new Qs(new Float32Array(t * 4), 4)),
      (this.instTeam = new Qs(new Float32Array(t * 3), 3)),
      (this.instTint = new Qs(new Float32Array(t * 4), 4)),
      (this.instBody = new Qs(new Float32Array(t * 3).fill(1), 3)),
      this.instBody.setUsage(Pi),
      this.instA.setUsage(Pi),
      this.instTeam.setUsage(Pi),
      this.instTint.setUsage(Pi),
      e.setAttribute("aInstA", this.instA),
      e.setAttribute("aInstTeam", this.instTeam),
      e.setAttribute("aInstTint", this.instTint),
      e.setAttribute("aInstBody", this.instBody),
      this.wantXray &&
        ((this.instX = new Qs(new Float32Array(t * 4), 4)),
        this.instX.setUsage(Pi),
        e.setAttribute("aInstX", this.instX)),
      (e.instanceCount = 0),
      (this.geo = e),
      (this.data = new Float32Array(this.bones * 8 * t)));
    const i = new zr(this.data, this.bones * 2, t, Gs, fo);
    ((i.minFilter = i.magFilter = ti), (i.generateMipmaps = !1), (i.needsUpdate = !0), (this.tex = i));
  }
  grow() {
    const t = this.data,
      e = this.instA.array,
      s = this.instTeam.array,
      i = this.instTint.array,
      a = this.instBody.array,
      o = this.instX ? this.instX.array : null,
      r = this.geo,
      l = this.tex;
    ((this.capacity *= 2),
      this.allocate(),
      this.data.set(t),
      this.instA.array.set(e),
      this.instTeam.array.set(s),
      this.instTint.array.set(i),
      this.instBody.array.set(a),
      this.instX && o && this.instX.array.set(o),
      (this.mesh.geometry = this.geo),
      (this.material.uniforms.uBones.value = this.tex),
      (this.depth.uniforms.uBones.value = this.tex),
      this.outline &&
        this.outlineMat &&
        ((this.outline.geometry = this.geo), (this.outlineMat.uniforms.uBones.value = this.tex)),
      this.xray &&
        this.xrayMat &&
        ((this.xray.geometry = this.geo), (this.xrayMat.uniforms.uBones.value = this.tex)),
      r.dispose(),
      l.dispose());
  }
  begin() {
    this.count = 0;
  }
  push(t, e) {
    this.count >= this.capacity && this.grow();
    const s = this.count++;
    t.pack(this.data, s * this.bones * 8);
    const i = this.instA.array;
    ((i[s * 4] = e.opacity), (i[s * 4 + 1] = e.flash), (i[s * 4 + 2] = e.glow), (i[s * 4 + 3] = e.rim));
    const a = this.instTeam.array;
    ((a[s * 3] = e.team.r), (a[s * 3 + 1] = e.team.g), (a[s * 3 + 2] = e.team.b));
    const o = this.instTint.array;
    ((o[s * 4] = e.tint.r),
      (o[s * 4 + 1] = e.tint.g),
      (o[s * 4 + 2] = e.tint.b),
      (o[s * 4 + 3] = e.tintAmount));
    const r = this.instBody.array;
    if (((r[s * 3] = e.body.r), (r[s * 3 + 1] = e.body.g), (r[s * 3 + 2] = e.body.b), this.instX)) {
      const l = this.instX.array;
      ((l[s * 4] = e.xray.r),
        (l[s * 4 + 1] = e.xray.g),
        (l[s * 4 + 2] = e.xray.b),
        (l[s * 4 + 3] = e.xrayAmount));
    }
  }
  end() {
    const t = this.count;
    ((this.mesh.visible = t > 0),
      this.outline && (this.outline.visible = t > 0 && this.outlineOn),
      this.xray && (this.xray.visible = t > 0 && this.xrayOn),
      (this.geo.instanceCount = t),
      t !== 0 &&
        ((this.tex.needsUpdate = !0),
        (this.instA.needsUpdate = !0),
        (this.instTeam.needsUpdate = !0),
        (this.instTint.needsUpdate = !0),
        (this.instBody.needsUpdate = !0),
        this.instX && (this.instX.needsUpdate = !0)));
  }
  setShadows(t) {
    this.mesh.castShadow = t;
  }
  dispose() {
    (this.geo.dispose(),
      this.tex.dispose(),
      hx.delete(this.material),
      this.material.dispose(),
      this.depth.dispose(),
      this.outlineMat?.dispose(),
      this.xrayMat?.dispose());
  }
}

const ua = Math.PI / 180,
  p1 = 46,
  Bu = 32,
  ab = 27.5,
  CL = 1 / Math.tan(p1 * ua),
  LL = 54,
  IL = 7.5,
  PL = 44,
  ob = 0.07,
  DL = 0.14,
  rb = 0.42,
  zL = 0.6,
  lb = 0.5,
  NL = 0.35,
  FL = 0.5,
  UL = 0.8,
  cb = 0.66,
  OL = 0.35,
  BL = 0.86,
  fb = 0.4,
  HL = 0.6,
  db = -0.1,
  hb = 0.72,
  $L = 0.35,
  GL = 2.6,
  VL = 0.13;

class WL {
  camera;
  shakeEnabled = !0;
  bounds = { minX: -57.5, maxX: 57.5, minZ: -57.5, maxZ: 57.5 };
  pitch = p1 * ua;
  distance = ab;
  lead = 0;
  tall = 0;
  tanHalf = Math.tan((Bu / 2) * ua);
  reach = null;
  reachX = 0;
  reachZ = 0;
  pointerPan = 0;
  tallWant = 0;
  tallK = 0;
  zoomWant = 1;
  zoomK = 1;
  aspect = 16 / 9;
  follow = new dt();
  peek = null;
  ultPeek = null;
  focus = new dt();
  snapped = !1;
  trauma = 0;
  shakeTime = 0;
  topView = !1;
  topHalf = 76;
  override = null;
  constructor() {
    ((this.camera = new Yi(Bu, this.aspect, 1, 900)), this.camera.up.set(0, 1, 0), this.applyLens());
  }
  setAspect(t) {
    ((this.aspect = t > 0 ? t : 16 / 9), this.applyLens());
  }
  applyLens() {
    const t = this.camera;
    if (((t.aspect = this.aspect), this.topView)) {
      t.fov = 30;
      const e = Math.tan((t.fov / 2) * ua);
      ((this.distance = (this.topHalf * 1.04) / (e * Math.min(1, this.aspect))),
        (this.pitch = 89.9 * ua),
        (this.lead = 0),
        (t.near = 20),
        (t.far = this.distance + 300));
    } else if (this.override)
      ((t.fov = this.override.fov),
        (this.pitch = this.override.pitch * ua),
        (this.distance = this.override.distance),
        (this.lead = 0),
        (t.near = 1),
        (t.far = 1600));
    else {
      const e = Math.min(1, Math.max(0, (1 - this.aspect) / 0.4));
      let s = Bu,
        i = ab;
      const a = IL / this.aspect;
      (i * Math.tan((s / 2) * ua) < a &&
        ((s = Math.min(PL, (Math.atan(a / i) * 2) / ua)), (i = Math.max(i, a / Math.tan((s / 2) * ua)))),
        (t.fov = s),
        (this.tall = e),
        (this.distance = i),
        (this.pitch = (p1 + (LL - p1) * e) * ua),
        (this.tanHalf = Math.tan((s / 2) * ua)),
        (this.lead = this.groundZ(ob + (DL - ob) * e)),
        (t.near = 2),
        (t.far = 900));
    }
    t.updateProjectionMatrix();
  }
  groundZ(t) {
    const e = t * this.tanHalf;
    return (-e * this.distance) / (Math.sin(this.pitch) - e * Math.cos(this.pitch));
  }
  halfWidthAt(t) {
    return (this.distance - t * Math.cos(this.pitch)) * this.tanHalf * this.aspect;
  }
  setReach(t, e = 0) {
    t === null ? (this.reach = null) : (this.reach ??= new dt()).set(t, 0, e);
  }
  setPointerReach(t, e = 0) {
    if (t === null) {
      this.pointerPan = 0;
      return;
    }
    const s = -(hb + ($L - hb) * this.tall),
      i = this.groundZ(s) - this.lead,
      a = Math.max(0, e - i),
      o = Math.min(1, Math.max(0, (db - t) / (db - s)));
    this.pointerPan = a * o * o * (3 - 2 * o);
  }
  setTallFocus(t) {
    this.tallWant = Math.max(0, t);
  }
  // 镜头拉远倍率（>1 拉远），用于全图大招蓄力时看清落点
  setZoom(t) {
    this.zoomWant = t > 0 ? t : 1;
  }
  // 大招这类"临时把镜头挪到别处"用的焦点，和指针拖拽的 peek 分开，避免互相抢
  setUltPeek(t, e) {
    t === null ? (this.ultPeek = null) : (this.ultPeek ??= new dt()).set(t, 0, e);
  }
  setTopView(t, e = 76) {
    ((this.topView = t), (this.topHalf = e), this.applyLens(), (this.snapped = !1));
  }
  get isTopView() {
    return this.topView;
  }
  get isDebugView() {
    return this.topView || this.override !== null;
  }
  setOverride(t) {
    ((this.override = t ? { pitch: t.pitch, distance: t.distance, yaw: t.yaw ?? 0, fov: t.fov ?? Bu } : null),
      this.applyLens(),
      (this.snapped = !1));
  }
  setFollow(t, e) {
    this.follow.set(t, 0, e);
  }
  setPeek(t, e = 0) {
    t === null ? (this.peek = null) : (this.peek ??= new dt()).set(t, 0, e);
  }
  snap() {
    this.snapped = !1;
  }
  shake(t) {
    this.shakeEnabled && (this.trauma = Math.min(1, this.trauma + t));
  }
  getFocus(t) {
    return t.copy(this.focus);
  }
  getDistance() {
    return this.distance;
  }
  update(t) {
    const e = this.camera,
      s = this.bounds;
    let i, a;
    if (this.topView) ((i = 0), (a = 0));
    else {
      const f = this.ultPeek ?? this.peek ?? this.follow;
      if (((i = f.x), (a = f.z - (this.ultPeek || this.peek ? 0 : this.lead)), !this.override)) {
        let d = 0,
          h = 0;
        if (this.reach && !this.peek) {
          const v = this.reach.x - i,
            _ = this.reach.z - a,
            k = this.groundZ(UL),
            M = this.groundZ(-(cb + (OL - cb) * this.tall));
          ((h = _ - Math.min(M, Math.max(k, _))),
            (h = Math.min(this.lead - this.groundZ(fb), Math.max(this.lead - this.groundZ(-0.5), h))));
          const S = this.halfWidthAt(_ - h) * BL;
          d = v - Math.min(S, Math.max(-S, v));
          const b = this.halfWidthAt(this.lead - h) * HL;
          d = Math.min(b, Math.max(-b, d));
        } else
          this.pointerPan > 0 && !this.peek && (h = Math.min(this.lead - this.groundZ(fb), this.pointerPan));
        const u = this.snapped ? 1 - Math.exp(-(this.reach || this.pointerPan > 0 ? 7 : 5) * t) : 1;
        ((this.reachX += (d - this.reachX) * u), (this.reachZ += (h - this.reachZ) * u));
        const m = this.reach || this.pointerPan > 0 || this.peek ? 0 : this.tallWant;
        ((this.tallK += (m - this.tallK) * (this.snapped ? 1 - Math.exp(-6 * t) : 1)),
          this.peek || ((i += this.reachX), (a += this.reachZ - GL * this.tallK)));
        const x = this.tall,
          p = this.halfWidthAt(0) * FL,
          g = -this.groundZ(rb + (zL - rb) * x),
          y = this.groundZ(-(lb + (NL - lb) * x));
        ((i = Math.min(Math.max(s.maxX - p, 0), Math.max(Math.min(s.minX + p, 0), i))),
          (a = Math.min(Math.max(s.maxZ - y, 0), Math.max(Math.min(s.minZ + g, 0), a))));
      }
    }
    if (!this.snapped) (this.focus.set(i, 0, a), (this.snapped = !0));
    else {
      const f = i - this.focus.x,
        d = a - this.focus.z;
      if (f * f + d * d > 2025) this.focus.set(i, 0, a);
      else {
        const h = 1 - Math.exp(-(this.ultPeek ? 4 : this.peek ? 14 : 9) * t);
        ((this.focus.x += f * h), (this.focus.z += d * h));
      }
    }
    const o = this.override ? this.override.yaw * ua : 0;
    this.zoomK += (this.zoomWant - this.zoomK) * (1 - Math.exp(-5 * t));
    const r =
      (this.topView || this.override ? this.distance : this.distance * (1 + VL * this.tallK)) * this.zoomK,
      l = Math.cos(this.pitch) * r,
      c = Math.sin(this.pitch) * r;
    if (
      (e.position.set(this.focus.x + Math.sin(o) * l, c, this.focus.z + Math.cos(o) * l),
      e.up.set(0, 1, 0),
      this.topView && e.up.set(0, 0, -1),
      e.lookAt(this.focus.x, 0, this.focus.z),
      this.trauma > 0)
    ) {
      this.shakeTime += t;
      const f = this.shakeTime,
        d = this.trauma * this.trauma,
        h = Math.sin(f * 61.3) * 0.6 + Math.sin(f * 37.1 + 1.3) * 0.4,
        u = Math.sin(f * 53.7 + 2.1) * 0.6 + Math.sin(f * 29.9 + 0.4) * 0.4,
        m = Math.sin(f * 44.3 + 4.2),
        x = (this.distance * Math.tan((e.fov / 2) * ua) * Math.min(1, this.aspect)) / 10.4;
      (e.translateX(h * d * 0.55 * x),
        e.translateY(u * d * 0.45 * x),
        e.rotateZ(m * d * 0.012),
        (this.trauma = Math.max(0, this.trauma - t * 2.4)));
    }
    e.updateMatrixWorld();
  }
}

function jM(n) {
  const t = new Set(),
    e = new Set();
  n.traverse((s) => {
    const i = s;
    i.geometry?.dispose();
    const a = Array.isArray(i.material) ? i.material : i.material ? [i.material] : [];
    for (const o of a) e.add(o);
    s.dispose?.();
  });
  for (const s of e) {
    const i = s.uniforms;
    if (i)
      for (const a in i) {
        const o = i[a].value;
        o instanceof Vs && t.add(o);
      }
    for (const a of Object.values(s)) a instanceof Vs && t.add(a);
    s.dispose();
  }
  for (const s of t) s.dispose();
}

const Bg = 35007,
  jL = 36795,
  qL = 60,
  Hu = { timer: null },
  ub = new WeakSet();

class XL {
  timings = { supported: !1, shadow: 0, scene: 0, post: 0, total: 0, windows: 0 };
  gl;
  active = null;
  pending = [];
  sums = { shadow: 0, scene: 0, post: 0 };
  frames = 0;
  dirty = !1;
  constructor(t) {
    this.gl = t.getContext();
    let e = !1;
    try {
      e =
        typeof this.gl.createQuery == "function" &&
        this.gl.getExtension("EXT_disjoint_timer_query_webgl2") !== null;
    } catch {
      e = !1;
    }
    if (((this.timings.supported = e), !e)) {
      console.info("[moba] GPU 计时不可用：这台设备/浏览器没有 EXT_disjoint_timer_query_webgl2");
      return;
    }
    if (!ub.has(t)) {
      ub.add(t);
      const s = t.shadowMap,
        i = s.render;
      s.render = function (...a) {
        const o = Hu.timer;
        if (!o) {
          i.apply(s, a);
          return;
        }
        (o.begin("shadow"), i.apply(s, a), o.begin("scene"));
      };
    }
  }
  attach(t) {
    t ? (Hu.timer = this) : Hu.timer === this && (Hu.timer = null);
  }
  begin(t) {
    if (!this.timings.supported) return;
    if (this.active) {
      if (this.active.seg === t) return;
      this.end();
    }
    const e = this.gl,
      s = e.createQuery();
    s && (e.beginQuery(Bg, s), (this.active = { query: s, seg: t }));
  }
  end() {
    this.active && (this.gl.endQuery(Bg), this.pending.push(this.active), (this.active = null));
  }
  frameEnd() {
    if (!this.timings.supported) return;
    this.end();
    const t = this.gl,
      e = t.getParameter(jL);
    for (e && (this.dirty = !0); this.pending.length > 0;) {
      const i = this.pending[0];
      if (!t.getQueryParameter(i.query, t.QUERY_RESULT_AVAILABLE)) break;
      const a = t.getQueryParameter(i.query, t.QUERY_RESULT);
      (t.deleteQuery(i.query), this.pending.shift(), e || (this.sums[i.seg] += a));
    }
    for (; this.pending.length > 600;) {
      const i = this.pending.shift();
      i && t.deleteQuery(i.query);
    }
    if (++this.frames < qL) return;
    const s = this.timings;
    if (!this.dirty) {
      const i = 1e-6 / this.frames;
      ((s.shadow = this.sums.shadow * i),
        (s.scene = this.sums.scene * i),
        (s.post = this.sums.post * i),
        (s.total = s.shadow + s.scene + s.post),
        s.windows++,
        console.info(
          `[moba] GPU ms/帧 阴影 ${s.shadow.toFixed(2)} · 场景 ${s.scene.toFixed(2)} · 后期 ${s.post.toFixed(2)} · 合计 ${s.total.toFixed(2)}`,
        ));
    }
    ((this.sums.shadow = this.sums.scene = this.sums.post = 0), (this.frames = 0), (this.dirty = !1));
  }
  dispose() {
    if ((this.attach(!1), !!this.timings.supported)) {
      this.active && (this.gl.endQuery(Bg), this.gl.deleteQuery(this.active.query), (this.active = null));
      for (const t of this.pending) this.gl.deleteQuery(t.query);
      this.pending.length = 0;
    }
  }
}

function YL() {
  try {
    return typeof location < "u" && new URLSearchParams(location.search).get("gpuTimings") === "1";
  } catch {
    return !1;
  }
}

const as = new dt(-0.66, 1, 0.36).normalize(),
  mf = new Ee(-as.x, -as.z).normalize(),
  KL = Math.hypot(as.x, as.z) / as.y,
  ZL = 3.1,
  QL = 1.45,
  JL = 2,
  tI = 10,
  eI = 160,
  nI = [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ],
  id = new dt(),
  $u = new dt(),
  Gu = new dt(),
  i3 = new dt().crossVectors(new dt(0, 1, 0), as).normalize(),
  pb = new dt().crossVectors(as, i3).normalize();

class sI {
  sun;
  hemi;
  pulses = [];
  scene;
  mapSize = 0;
  constructor(t) {
    ((this.scene = t),
      (this.sun = new DM(Yt.env.sun, ZL)),
      this.sun.position.copy(as).multiplyScalar(80),
      (this.sun.shadow.bias = -5e-4),
      (this.sun.shadow.normalBias = 0.06),
      t.add(this.sun),
      t.add(this.sun.target),
      (this.hemi = new LM(Yt.env.sky, Yt.env.bounce, QL)),
      this.hemi.groundColor.multiplyScalar(JL),
      t.add(this.hemi));
  }
  applyQuality(t) {
    ((this.sun.castShadow = t.shadows),
      t.shadows &&
        t.shadowMapSize !== this.mapSize &&
        ((this.mapSize = t.shadowMapSize),
        this.sun.shadow.mapSize.set(t.shadowMapSize, t.shadowMapSize),
        this.sun.shadow.map?.dispose(),
        (this.sun.shadow.map = null)));
    const e = t.shadowType === "pcf";
    for (
      this.sun.shadow.radius = e ? t.shadowRadius : 1,
        this.sun.shadow.bias = e ? -6e-4 : -5e-4,
        this.sun.shadow.normalBias = e ? 0.07 : 0.06;
      this.pulses.length > t.pointLights;
    ) {
      const s = this.pulses.pop();
      s && this.scene.remove(s.light);
    }
    for (; this.pulses.length < t.pointLights;) {
      const s = new PM(16777215, 0, 10, 1.6);
      (s.position.set(0, -50, 0),
        this.scene.add(s),
        this.pulses.push({ light: s, life: 0, duration: 1, peak: 0 }));
    }
  }
  pulse(t, e, s, i, a, o, r) {
    if (this.pulses.length === 0) return;
    let l = this.pulses[0];
    for (const c of this.pulses) c.life < l.life && (l = c);
    (l.light.position.set(t, s, e),
      l.light.color.set(i),
      (l.light.distance = o),
      (l.peak = a),
      (l.duration = Math.max(0.05, r)),
      (l.life = l.duration),
      (l.light.intensity = a));
  }
  update(t) {
    for (const e of this.pulses) {
      if (e.life <= 0) continue;
      e.life -= t;
      const s = Math.max(0, e.life / e.duration);
      ((e.light.intensity = e.peak * s * s),
        e.life <= 0 && ((e.light.intensity = 0), (e.light.position.y = -50)));
    }
  }
  fitShadow(t) {
    if (!this.sun.castShadow) return;
    let e = 1 / 0,
      s = -1 / 0,
      i = 1 / 0,
      a = -1 / 0,
      o = 1 / 0,
      r = -1 / 0;
    id.setFromMatrixPosition(t.matrixWorld);
    const l = Math.max(eI, id.y * 2.5);
    for (const [y, v] of nI) {
      $u.set(y, v, 0.5).unproject(t).sub(id).normalize();
      for (let _ = 0; _ < 2; _++) {
        const k = _ === 0 ? 0 : tI;
        let M = $u.y < -1e-4 ? (k - id.y) / $u.y : l;
        ((M < 0 || M > l) && (M = M < 0 ? 0 : l), Gu.copy($u).multiplyScalar(M).add(id));
        const S = Gu.dot(i3),
          b = Gu.dot(pb),
          w = Gu.dot(as);
        (S < e && (e = S),
          S > s && (s = S),
          b < i && (i = b),
          b > a && (a = b),
          w < o && (o = w),
          w > r && (r = w));
      }
    }
    const c = Math.ceil(Math.max(s - e, a - i) / 4 + 0.25) * 4,
      f = c / 2,
      d = c / Math.max(1, this.sun.shadow.mapSize.x),
      h = Math.round((e + s) / 2 / d) * d,
      u = Math.round((i + a) / 2 / d) * d,
      m = (o + r) / 2,
      x = Math.ceil(((r - o) / 2 + 60) / 4) * 4,
      p = this.sun;
    (p.target.position.set(0, 0, 0).addScaledVector(i3, h).addScaledVector(pb, u).addScaledVector(as, m),
      p.position.copy(p.target.position).addScaledVector(as, x),
      p.target.updateMatrixWorld());
    const g = p.shadow.camera;
    (g.right !== f || g.far !== x * 2 + 20) &&
      ((g.left = -f),
      (g.right = f),
      (g.top = f),
      (g.bottom = -f),
      (g.near = 1),
      (g.far = x * 2 + 20),
      g.updateProjectionMatrix());
  }
  dispose() {
    (this.sun.shadow.map?.dispose(), this.scene.remove(this.sun, this.sun.target, this.hemi));
    for (const t of this.pulses) this.scene.remove(t.light);
    this.pulses.length = 0;
  }
}

const Yr = 128,
  Vu = new Ut();

function Wu(n, t, e, s, i) {
  const a = s - 1;
  for (let o = 0; o < s; o++)
    for (let r = 0; r < s; r++) {
      const l = r > 0 ? r - 1 : 0,
        c = r < a ? r + 1 : a;
      for (let f = 0; f < i; f++)
        e[(o * s + r) * i + f] =
          (n[(o * s + l) * i + f] + n[(o * s + r) * i + f] * 2 + n[(o * s + c) * i + f]) * 0.25;
    }
  for (let o = 0; o < s; o++) {
    const r = o > 0 ? o - 1 : 0,
      l = o < a ? o + 1 : a;
    for (let c = 0; c < s; c++)
      for (let f = 0; f < i; f++)
        t[(o * s + c) * i + f] =
          (e[(r * s + c) * i + f] + e[(o * s + c) * i + f] * 2 + e[(l * s + c) * i + f]) * 0.25;
  }
}

class iI {
  texture;
  size = Yr;
  rgb;
  occ;
  bakedRgb;
  bakedOcc;
  bytes;
  stamps = 0;
  constructor() {
    const t = Yr * Yr;
    ((this.rgb = new Float32Array(t * 3)),
      (this.occ = new Float32Array(t)),
      (this.bakedRgb = new Float32Array(t * 3)),
      (this.bakedOcc = new Float32Array(t)),
      (this.bytes = new Uint8Array(t * 4)));
    for (let s = 0; s < t; s++) this.bytes[s * 4 + 3] = 255;
    const e = new zr(this.bytes, Yr, Yr, Gs, mi);
    ((e.name = "moba.lightTint"),
      (e.colorSpace = Ki),
      (e.wrapS = e.wrapT = co),
      (e.minFilter = e.magFilter = Ns),
      (e.generateMipmaps = !1),
      (e.needsUpdate = !0),
      (this.texture = e));
  }
  get count() {
    return this.stamps;
  }
  splat(t, e, s, i) {
    const a = Yr,
      o = a / (yl * 2),
      r = Math.max(0.75, s),
      l = (t + yl) * o - 0.5,
      c = (e + yl) * o - 0.5,
      f = r * o,
      d = Math.max(0, Math.floor(l - f)),
      h = Math.min(a - 1, Math.ceil(l + f)),
      u = Math.max(0, Math.floor(c - f)),
      m = Math.min(a - 1, Math.ceil(c + f)),
      x = 1 / (f * f);
    for (let p = u; p <= m; p++)
      for (let g = d; g <= h; g++) {
        const y = ((g - l) * (g - l) + (p - c) * (p - c)) * x;
        if (y >= 1) continue;
        const v = (1 - y) * (1 - y);
        i(p * a + g, v);
      }
  }
  stamp(t, e, s, i, a) {
    Vu.set(i);
    const o = Vu.r * a,
      r = Vu.g * a,
      l = Vu.b * a,
      c = this.rgb;
    (this.splat(t, e, s, (f, d) => {
      const h = f * 3;
      (o * d > c[h] && (c[h] = o * d),
        r * d > c[h + 1] && (c[h + 1] = r * d),
        l * d > c[h + 2] && (c[h + 2] = l * d));
    }),
      this.stamps++);
  }
  occlude(t, e, s, i) {
    const a = Math.min(1, Math.max(0, i)),
      o = this.occ;
    (this.splat(t, e, s, (r, l) => {
      a * l > o[r] && (o[r] = a * l);
    }),
      this.stamps++);
  }
  clear() {
    (this.rgb.fill(0), this.occ.fill(0), (this.stamps = 0), this.bake());
  }
  bake() {
    const t = Yr,
      e = t * t,
      s = new Float32Array(e * 3);
    (Wu(this.rgb, this.bakedRgb, s, t, 3),
      Wu(this.bakedRgb, this.bakedRgb, s, t, 3),
      Wu(this.occ, this.bakedOcc, s, t, 1),
      Wu(this.bakedOcc, this.bakedOcc, s, t, 1));
    const i = this.bytes,
      a = t - 1;
    for (let o = 0; o < t; o++)
      for (let r = 0; r < t; r++) {
        const l = o * t + r;
        ((r === 0 || o === 0 || r === a || o === a) &&
          ((this.bakedRgb[l * 3] = this.bakedRgb[l * 3 + 1] = this.bakedRgb[l * 3 + 2] = 0),
          (this.bakedOcc[l] = 0)),
          (i[l * 4] = Math.min(255, Math.round(this.bakedRgb[l * 3] * 255))),
          (i[l * 4 + 1] = Math.min(255, Math.round(this.bakedRgb[l * 3 + 1] * 255))),
          (i[l * 4 + 2] = Math.min(255, Math.round(this.bakedRgb[l * 3 + 2] * 255))),
          (i[l * 4 + 3] = Math.min(255, Math.round((1 - this.bakedOcc[l]) * 255))));
      }
    this.texture.needsUpdate = !0;
  }
  sample(t, e, s) {
    const i = Yr,
      a = i / (yl * 2),
      o = Math.min(i - 1, Math.max(0, Math.floor((t + yl) * a))),
      l = Math.min(i - 1, Math.max(0, Math.floor((e + yl) * a))) * i + o;
    return (
      s && s.setRGB(this.bakedRgb[l * 3], this.bakedRgb[l * 3 + 1], this.bakedRgb[l * 3 + 2]),
      1 - this.bakedOcc[l]
    );
  }
  bind(t) {
    nb(t ? this.texture : null);
  }
  dispose() {
    (fs.tLightTint.value === this.texture && nb(null), this.texture.dispose());
  }
}

const aI = {
  name: "CopyShader",
  uniforms: { tDiffuse: { value: null }, opacity: { value: 1 } },
  vertexShader: `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
  fragmentShader: `

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`,
};

class Uf {
  constructor() {
    ((this.isPass = !0),
      (this.enabled = !0),
      (this.needsSwap = !0),
      (this.clear = !1),
      (this.renderToScreen = !1));
  }
  setSize() {}
  render() {
    console.error("THREE.Pass: .render() must be implemented in derived pass.");
  }
  dispose() {}
}

const oI = new ox(-1, 1, 1, -1, 0, 1);

class rI extends Bn {
  constructor() {
    (super(),
      this.setAttribute("position", new Ae([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)),
      this.setAttribute("uv", new Ae([0, 2, 0, 0, 2, 0], 2)));
  }
}

const lI = new rI();

class px {
  constructor(t) {
    this._mesh = new Sn(lI, t);
  }
  dispose() {
    this._mesh.geometry.dispose();
  }
  render(t) {
    t.render(this._mesh, oI);
  }
  get material() {
    return this._mesh.material;
  }
  set material(t) {
    this._mesh.material = t;
  }
}

class cI extends Uf {
  constructor(t, e = "tDiffuse") {
    (super(),
      (this.textureID = e),
      (this.uniforms = null),
      (this.material = null),
      t instanceof An
        ? ((this.uniforms = t.uniforms), (this.material = t))
        : t &&
          ((this.uniforms = N0.clone(t.uniforms)),
          (this.material = new An({
            name: t.name !== void 0 ? t.name : "unspecified",
            defines: Object.assign({}, t.defines),
            uniforms: this.uniforms,
            vertexShader: t.vertexShader,
            fragmentShader: t.fragmentShader,
          }))),
      (this._fsQuad = new px(this.material)));
  }
  render(t, e, s) {
    (this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = s.texture),
      (this._fsQuad.material = this.material),
      this.renderToScreen
        ? (t.setRenderTarget(null), this._fsQuad.render(t))
        : (t.setRenderTarget(e),
          this.clear && t.clear(t.autoClearColor, t.autoClearDepth, t.autoClearStencil),
          this._fsQuad.render(t)));
  }
  dispose() {
    (this.material.dispose(), this._fsQuad.dispose());
  }
}

class mb extends Uf {
  constructor(t, e) {
    (super(),
      (this.scene = t),
      (this.camera = e),
      (this.clear = !0),
      (this.needsSwap = !1),
      (this.inverse = !1));
  }
  render(t, e, s) {
    const i = t.getContext(),
      a = t.state;
    (a.buffers.color.setMask(!1),
      a.buffers.depth.setMask(!1),
      a.buffers.color.setLocked(!0),
      a.buffers.depth.setLocked(!0));
    let o, r;
    (this.inverse ? ((o = 0), (r = 1)) : ((o = 1), (r = 0)),
      a.buffers.stencil.setTest(!0),
      a.buffers.stencil.setOp(i.REPLACE, i.REPLACE, i.REPLACE),
      a.buffers.stencil.setFunc(i.ALWAYS, o, 4294967295),
      a.buffers.stencil.setClear(r),
      a.buffers.stencil.setLocked(!0),
      t.setRenderTarget(s),
      this.clear && t.clear(),
      t.render(this.scene, this.camera),
      t.setRenderTarget(e),
      this.clear && t.clear(),
      t.render(this.scene, this.camera),
      a.buffers.color.setLocked(!1),
      a.buffers.depth.setLocked(!1),
      a.buffers.color.setMask(!0),
      a.buffers.depth.setMask(!0),
      a.buffers.stencil.setLocked(!1),
      a.buffers.stencil.setFunc(i.EQUAL, 1, 4294967295),
      a.buffers.stencil.setOp(i.KEEP, i.KEEP, i.KEEP),
      a.buffers.stencil.setLocked(!0));
  }
}

class fI extends Uf {
  constructor() {
    (super(), (this.needsSwap = !1));
  }
  render(t) {
    (t.state.buffers.stencil.setLocked(!1), t.state.buffers.stencil.setTest(!1));
  }
}

class dI {
  constructor(t, e) {
    if (((this.renderer = t), (this._pixelRatio = t.getPixelRatio()), e === void 0)) {
      const s = t.getSize(new Ee());
      ((this._width = s.width),
        (this._height = s.height),
        (e = new go(this._width * this._pixelRatio, this._height * this._pixelRatio, { type: Dr })),
        (e.texture.name = "EffectComposer.rt1"));
    } else ((this._width = e.width), (this._height = e.height));
    ((this.renderTarget1 = e),
      (this.renderTarget2 = e.clone()),
      (this.renderTarget2.texture.name = "EffectComposer.rt2"),
      (this.writeBuffer = this.renderTarget1),
      (this.readBuffer = this.renderTarget2),
      (this.renderToScreen = !0),
      (this.passes = []),
      (this.copyPass = new cI(aI)),
      (this.copyPass.material.blending = Sr),
      (this.clock = new wE()));
  }
  swapBuffers() {
    const t = this.readBuffer;
    ((this.readBuffer = this.writeBuffer), (this.writeBuffer = t));
  }
  addPass(t) {
    (this.passes.push(t), t.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio));
  }
  insertPass(t, e) {
    (this.passes.splice(e, 0, t), t.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio));
  }
  removePass(t) {
    const e = this.passes.indexOf(t);
    e !== -1 && this.passes.splice(e, 1);
  }
  isLastEnabledPass(t) {
    for (let e = t + 1; e < this.passes.length; e++) if (this.passes[e].enabled) return !1;
    return !0;
  }
  render(t) {
    t === void 0 && (t = this.clock.getDelta());
    const e = this.renderer.getRenderTarget();
    let s = !1;
    for (let i = 0, a = this.passes.length; i < a; i++) {
      const o = this.passes[i];
      if (o.enabled !== !1) {
        if (
          ((o.renderToScreen = this.renderToScreen && this.isLastEnabledPass(i)),
          o.render(this.renderer, this.writeBuffer, this.readBuffer, t, s),
          o.needsSwap)
        ) {
          if (s) {
            const r = this.renderer.getContext(),
              l = this.renderer.state.buffers.stencil;
            (l.setFunc(r.NOTEQUAL, 1, 4294967295),
              this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, t),
              l.setFunc(r.EQUAL, 1, 4294967295));
          }
          this.swapBuffers();
        }
        mb !== void 0 && (o instanceof mb ? (s = !0) : o instanceof fI && (s = !1));
      }
    }
    this.renderer.setRenderTarget(e);
  }
  reset(t) {
    if (t === void 0) {
      const e = this.renderer.getSize(new Ee());
      ((this._pixelRatio = this.renderer.getPixelRatio()),
        (this._width = e.width),
        (this._height = e.height),
        (t = this.renderTarget1.clone()),
        t.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio));
    }
    (this.renderTarget1.dispose(),
      this.renderTarget2.dispose(),
      (this.renderTarget1 = t),
      (this.renderTarget2 = t.clone()),
      (this.writeBuffer = this.renderTarget1),
      (this.readBuffer = this.renderTarget2));
  }
  setSize(t, e) {
    ((this._width = t), (this._height = e));
    const s = this._width * this._pixelRatio,
      i = this._height * this._pixelRatio;
    (this.renderTarget1.setSize(s, i), this.renderTarget2.setSize(s, i));
    for (let a = 0; a < this.passes.length; a++) this.passes[a].setSize(s, i);
  }
  setPixelRatio(t) {
    ((this._pixelRatio = t), this.setSize(this._width, this._height));
  }
  dispose() {
    (this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.copyPass.dispose());
  }
}

class hI extends Uf {
  constructor(t, e, s = null, i = null, a = null) {
    (super(),
      (this.scene = t),
      (this.camera = e),
      (this.overrideMaterial = s),
      (this.clearColor = i),
      (this.clearAlpha = a),
      (this.clear = !0),
      (this.clearDepth = !1),
      (this.needsSwap = !1),
      (this._oldClearColor = new Ut()));
  }
  render(t, e, s) {
    const i = t.autoClear;
    t.autoClear = !1;
    let a, o;
    (this.overrideMaterial !== null &&
      ((o = this.scene.overrideMaterial), (this.scene.overrideMaterial = this.overrideMaterial)),
      this.clearColor !== null &&
        (t.getClearColor(this._oldClearColor), t.setClearColor(this.clearColor, t.getClearAlpha())),
      this.clearAlpha !== null && ((a = t.getClearAlpha()), t.setClearAlpha(this.clearAlpha)),
      this.clearDepth == !0 && t.clearDepth(),
      t.setRenderTarget(this.renderToScreen ? null : s),
      this.clear === !0 && t.clear(t.autoClearColor, t.autoClearDepth, t.autoClearStencil),
      t.render(this.scene, this.camera),
      this.clearColor !== null && t.setClearColor(this._oldClearColor),
      this.clearAlpha !== null && t.setClearAlpha(a),
      this.overrideMaterial !== null && (this.scene.overrideMaterial = o),
      (t.autoClear = i));
  }
}
export { cL, dL, hL, Vl, VM, If, Pf, Df, zf, aa, Nf, Ff, Qc, kL, sh, ux, CL, WL, jM, XL, YL, as, mf, KL, sI, iI, Uf, px, dI, hI };
