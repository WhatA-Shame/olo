// 24-render-8.js — render｜33 个顶层语句｜67KB
// 对应 game.pretty.js 第 47148–49121 行
// 关键内容：
//   wF                    角星的有符号距离(iq)：m 越小角越尖
//   SF                    abyss_drake
//   TF                    position
//   vf                    被单位拨开：向外推并压低，离得越近越明显
//   PF                    bushes
//   k8                    canvas
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { Ee, Fo, Gs, Ki, Ns, fi, h5, mh, mi } from './04-audio-2.js';
import { dt, kn } from './05-three.js';
import { Ke, Ut } from './06-three-2.js';
import { Ae, An, Bn, Ji, K7, On, Sn, zr } from './07-three-3.js';
import { Yt, fs, fx, ke, nh, nn, u1, un } from './14-three-7.js';
import { Df, Ff, If, Nf, Pf, VM, Vl, aa, as, zf } from './15-render-4.js';
import { Be, Bf, Cx, Er, Fn, H1, Ht, Pt, Rx, Sm, f3, mn, yo, yt } from './21-core-4.js';
import { Ts, Xo, gn, yf } from './22-render-6.js';

const wF = `
${Pf}
attribute vec4 aParam;
attribute vec3 aColorA;
attribute vec3 aColorB;
varying vec2 vUv;
varying vec4 vParam;
varying vec3 vColorA;
varying vec3 vColorB;
varying vec3 vWorldPos;
varying vec3 vViewPosition;
void main() {
  vUv = uv;
  vParam = aParam;
  vColorA = aColorA;
  vColorB = aColorB;
  vec3 objectNormal = vec3(0.0, 1.0, 0.0);
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  vWorldPos = worldPosition.xyz;
  ${Df}
}
`,
  MF = `
${If}
${Nf}
${Vl}
uniform float uTime;
uniform float uBound;
uniform vec2 uAlert;
uniform vec3 uShadeTintGround;
varying vec2 vUv;
varying vec4 vParam;
varying vec3 vColorA;
varying vec3 vColorB;
varying vec3 vWorldPos;
varying vec3 vViewPosition;

const float TAU = 6.2831853;

float band(float x, float c, float w, float aa) {
  return 1.0 - smoothstep(w - aa, w + aa, abs(x - c));
}
// n 角星的有符号距离(iq)：m 越小角越尖
float sdStar(vec2 p, float r, float n, float m) {
  float an = 3.141593 / n;
  float en = 3.141593 / m;
  vec2 acs = vec2(cos(an), sin(an));
  vec2 ecs = vec2(cos(en), sin(en));
  float bn = mod(atan(p.x, p.y), 2.0 * an) - an;
  p = length(p) * vec2(cos(bn), abs(sin(bn)));
  p -= r * acs;
  p += ecs * clamp(-dot(p, ecs), 0.0, r * acs.y / ecs.y);
  return length(p) * sign(p.x);
}
// 一圈符文：把圆环切成 n 格，每格里用哈希画几道短划
float runes(float r, float a, float r0, float w, float n, float seed, float aa) {
  float cell = floor(a / TAU * n);
  float fa = fract(a / TAU * n) - 0.5;
  float fr = (r - r0) / w;
  if (abs(fr) > 1.0) return 0.0;
  float h = hash12(vec2(cell, seed));
  float h2 = hash12(vec2(cell + 31.0, seed));
  float g = 0.0;
  g = max(g, (1.0 - smoothstep(0.08, 0.14, abs(fa - (h - 0.5) * 0.4))) * step(abs(fr), 0.8));
  g = max(g, (1.0 - smoothstep(0.1, 0.2, abs(fr - (h2 - 0.5) * 1.2))) * step(abs(fa), 0.3) * step(0.35, h));
  g = max(g, (1.0 - smoothstep(0.1, 0.2, abs(fr + (h - 0.5) * 1.0))) * step(abs(fa + 0.1), 0.22) * step(0.5, h2));
  return g * step(abs(fa), 0.4);
}
// 环形石板：返回 (明暗, 接缝蒙版)
vec2 stoneRings(float r, float a, float seed) {
  float ringI = r < 0.42 ? 0.0 : (r < 0.7 ? 1.0 : 2.0);
  float n = ringI < 0.5 ? 6.0 : (ringI < 1.5 ? 10.0 : 16.0);
  float aa = a + ringI * 0.37 + seed;
  float cell = floor(aa / TAU * n);
  float fa = abs(fract(aa / TAU * n) - 0.5);
  float tone = 0.86 + 0.26 * hash12(vec2(cell, ringI + seed * 7.0));
  float jointA = smoothstep(0.5, 0.5 - 0.035 / max(r, 0.08) / n * 6.0, fa);
  float jr = min(min(abs(r - 0.42), abs(r - 0.7)), abs(r - 0.965));
  float jointR = smoothstep(0.0, 0.014, jr);
  return vec2(tone, jointA * jointR);
}

void main() {
  float type = vParam.x;
  float seed = vParam.y;
  float t = uTime;
  vec2 p = vUv;
  float r = length(p);
  if (r > 1.0) discard;
  if (type > 6.5 && type < 7.5) {
    // AO 暗斑：预乘黑色，不受光
    float k = 1.0 - r;
    gl_FragColor = vec4(0.0, 0.0, 0.0, vParam.w * k * k);
    return;
  }
  // 建筑/泉水的铺装不越过地图边界(界外是崖壁或下沉的台地)
  if (type < 2.5 && (abs(vWorldPos.x) > uBound || abs(vWorldPos.z) > uBound)) discard;
  float a = atan(p.y, p.x) + 3.141593;
  float aa = fwidth(r) * 1.3 + 1e-4;
  vec3 paint = vec3(0.0);
  float alpha = 0.0;
  vec3 glow = vec3(0.0);
  // ln：发光线条的强度累加。最后既作为彩色镶嵌(亮底上也看得清)，又作为自发光
  float ln = 0.0;
  float nz = 0.5;
  float nz2 = 0.5;
  if (type < 5.5 || type > 8.5) {
    nz = vnoise(vWorldPos.xz * 2.3 + seed);
    nz2 = vnoise(vWorldPos.xz * 7.1 + seed * 3.0);
  }

  if (type < 0.5) {
    // ── 塔座：三环石板 + 八角金星 + 队伍色光环 ──
    vec2 sr = stoneRings(r, a, seed);
    paint = vColorB * sr.x * mix(0.62, 1.0, sr.y) * (0.92 + 0.16 * nz2);
    float st = sdStar(p, 0.4, 8.0, 3.2);
    float starLine = 1.0 - smoothstep(0.012, 0.012 + aa * 1.5, abs(st));
    paint = mix(paint, vec3(0.9, 0.68, 0.26), starLine * 0.85);
    paint = mix(paint, vColorB * 0.6, (1.0 - smoothstep(-0.02, 0.0, st)) * 0.35);
    alpha = 1.0 - smoothstep(0.965, 1.0, r + (nz - 0.5) * 0.03);
    float pulse = 0.7 + 0.3 * sin(t * 1.7 + seed * 5.0);
    ln += band(r, 0.83, 0.012, aa) * 1.5 * pulse;
    // 环上 8 颗菱形星钉
    float ca = (fract(a / TAU * 8.0) - 0.5) * TAU / 8.0 * 0.56;
    float dia = abs(ca) * 5.0 + abs(r - 0.56) * 6.0;
    ln += (1.0 - smoothstep(0.16, 0.22, dia)) * 1.2 * pulse;
  } else if (type < 1.5) {
    // ── 水晶座：大星盘 ──
    vec2 sr = stoneRings(r * 1.02, a, seed);
    paint = vColorB * sr.x * mix(0.6, 1.0, sr.y) * (0.92 + 0.16 * nz2);
    float st = sdStar(p, 0.66, 8.0, 2.6);
    float st2 = sdStar(vec2(p.x * 0.7071 - p.y * 0.7071, p.x * 0.7071 + p.y * 0.7071), 0.5, 8.0, 3.4);
    float line = max(1.0 - smoothstep(0.008, 0.008 + aa * 1.5, abs(st)), 1.0 - smoothstep(0.006, 0.006 + aa * 1.5, abs(st2)));
    paint = mix(paint, vec3(0.9, 0.68, 0.26), line * 0.88);
    paint = mix(paint, vColorB * 1.12, (1.0 - smoothstep(-0.01, 0.0, st)) * 0.5);
    alpha = 1.0 - smoothstep(0.975, 1.0, r + (nz - 0.5) * 0.02);
    float pulse = 0.75 + 0.25 * sin(t * 1.3);
    ln += band(r, 0.9, 0.008, aa) * 2.4;
    ln += band(r, 0.45, 0.006, aa) * 2.0 * pulse;
    ln += runes(r, a + t * 0.06, 0.805, 0.045, 28.0, seed, aa) * 1.9 * pulse;
    // 从中心向外流动的能量纹
    float rays = pow(abs(sin(a * 4.0)), 24.0) * smoothstep(0.42, 0.5, r) * (1.0 - smoothstep(0.6, 0.74, r));
    ln += rays * (0.6 + 0.6 * sin(r * 30.0 - t * 3.0)) * 1.4;
  } else if (type < 2.5) {
    // ── 泉水：石沿(上面压着一圈矮石环几何) + 浅水池：池底星纹、焦散、涟漪；敌方踏入时水面转红翻涌 ──
    float alert = seed < 0.75 ? uAlert.x : uAlert.y;
    float rimM = smoothstep(0.86, 0.875, r);
    vec2 sr = stoneRings(0.99, a * 1.0, seed);
    vec3 rimCol = vColorB * sr.x * mix(0.6, 1.0, smoothstep(0.0, 0.02, abs(fract(a / TAU * 24.0) - 0.5) - 0.03)) * (0.9 + 0.2 * nz2);
    rimCol = mix(rimCol, vec3(0.9, 0.68, 0.26), band(r, 0.93, 0.008, aa));
    // 池底：环形石板 + 八芒星刻纹
    vec2 fr = stoneRings(r * 1.14, a + 0.3, seed + 2.0);
    vec3 floorCol = vColorB * 0.8 * fr.x * mix(0.62, 1.0, fr.y);
    float st = sdStar(p, 0.52, 8.0, 2.8);
    float st2 = sdStar(vec2(p.x * 0.7071 - p.y * 0.7071, p.x * 0.7071 + p.y * 0.7071), 0.3, 4.0, 2.4);
    floorCol = mix(floorCol, vColorB * 1.1, (1.0 - smoothstep(-0.01, 0.0, st)) * 0.4);
    floorCol = mix(floorCol, vec3(0.9, 0.68, 0.26), (1.0 - smoothstep(0.006, 0.006 + aa * 1.5, abs(st))) * 0.8);
    // 水体：越往池心越深，吸收掉暖色
    float depth = smoothstep(0.86, 0.2, r);
    vec3 waterTint = mix(vColorA, vec3(1.0, 0.25, 0.12), alert);
    vec3 pool = floorCol * mix(vec3(0.9, 0.97, 1.0), vec3(0.5, 0.78, 0.9), depth) + waterTint * 0.07 * depth;
    // 焦散：两层反向漂移的噪声相减取脊
    vec2 cq = vWorldPos.xz * 1.5;
    float c1 = vnoise(cq + vec2(t * 0.22, t * 0.13));
    float c2 = vnoise(cq * 1.3 - vec2(t * 0.17, -t * 0.19) + 3.7);
    float caust = pow(clamp(1.0 - abs(c1 - c2) * 3.2, 0.0, 1.0), 5.0);
    pool += vec3(0.75, 1.0, 0.95) * caust * (0.1 + 0.16 * depth);
    // 涟漪：从池心缓缓外扩的细环；有敌人时变成急促的翻涌
    float rip = sin(r * mix(46.0, 30.0, alert) - t * mix(2.2, 7.0, alert) + nz * 3.0);
    pool += vec3(0.9, 1.0, 1.0) * smoothstep(0.86, 1.0, rip) * (1.0 - r) * mix(0.1, 0.3, alert);
    pool = mix(pool, pool * vec3(1.25, 0.5, 0.45) + vec3(0.12, 0.0, 0.0), alert * 0.7);
    paint = mix(pool, rimCol, rimM);
    alpha = (1.0 - smoothstep(0.985, 1.0, r)) * mix(0.96, 1.0, rimM);
    float inside = 1.0 - rimM;
    float pulse = 0.75 + 0.25 * sin(t * 1.5);
    // 池底发光星盘：细线，不再是满屏的法阵
    ln += (1.0 - smoothstep(0.005, 0.005 + aa * 1.5, abs(st2))) * 1.5 * pulse * inside;
    ln += band(r, 0.66, 0.005, aa) * 1.1 * inside;
    ln += runes(r, a - t * 0.06, 0.76, 0.045, 18.0, seed, aa) * 0.9 * pulse * inside;
    glow += waterTint * (1.0 - smoothstep(0.0, 0.34, r)) * 0.2 * pulse;
    // 警示环：敌方在泉水里时池沿亮起红圈
    ln += band(r, 0.84, 0.012, aa) * 2.0 * alert * (0.6 + 0.4 * sin(t * 9.0));
  } else if (type < 3.5) {
    // ── 小营地：风化的残环 ──
    float broken = smoothstep(0.42, 0.6, vnoise(vec2(a * 2.2, seed * 9.0)) * 0.7 + nz * 0.3);
    float ringM = band(r, 0.86, 0.075, aa * 2.0) * broken;
    float joint = smoothstep(0.02, 0.05, abs(fract(a / TAU * 18.0 + seed) - 0.5) - 0.02);
    paint = vColorB * (0.8 + 0.3 * hash12(vec2(floor(a / TAU * 18.0 + seed), seed))) * mix(0.6, 1.0, joint);
    alpha = ringM * 0.95;
    ln += runes(r, a, 0.66, 0.05, 16.0, seed, aa) * broken * 0.3 * (0.6 + 0.4 * sin(t * 1.1 + seed));
  } else if (type < 4.5) {
    // ── 增益营地：双环法阵 + 六芒；霜 = 冰晶地面，焰 = 焦土裂纹 ──
    float ember = step(0.5, vParam.w);
    float pulse = 0.7 + 0.3 * sin(t * 1.6 + seed * 3.0);
    float crack = vnoise(vWorldPos.xz * 1.9 + seed) - vnoise(vWorldPos.xz * 1.9 + seed + 4.7);
    float crackLine = 1.0 - smoothstep(0.0, 0.07, abs(crack));
    float patchM = (1.0 - smoothstep(0.55, 0.95, r + (nz - 0.5) * 0.3));
    vec3 scorched = vec3(0.09, 0.07, 0.07);
    vec3 frost = vec3(0.78, 0.9, 1.0) * (0.75 + 0.3 * nz2);
    paint = mix(frost, scorched, ember);
    // (地面的霜/焦土染色已经由地表着色器按营地主题画了：这里只留一层很淡的底和法阵线，亮度比第一版降四成)
    alpha = patchM * mix(0.18 * smoothstep(0.35, 0.65, nz + (1.0 - r) * 0.3), 0.3, ember);
    ln += crackLine * patchM * mix(0.12, 0.0, ember) * pulse;
    ln += band(r, 0.9, 0.01, aa) * 1.2 * pulse;
    ln += band(r, 0.74, 0.006, aa) * 0.9;
    ln += runes(r, a + t * 0.08, 0.82, 0.05, 22.0, seed, aa) * 1.0 * pulse;
    float st = sdStar(p, 0.5, 6.0, 2.2);
    ln += (1.0 - smoothstep(0.006, 0.006 + aa * 1.5, abs(st))) * 0.8;
  } else if (type < 5.5) {
    // ── 史诗营地：浮在水面上的巨大法阵，缓慢转动 ──
    float colossus = step(0.5, vParam.w);
    float pulse = 0.65 + 0.35 * sin(t * 1.2 + seed);
    float ca = cos(t * 0.07);
    float sa = sin(t * 0.07);
    vec2 pr = vec2(p.x * ca - p.y * sa, p.x * sa + p.y * ca);
    float st = sdStar(pr, 0.62, mix(6.0, 8.0, colossus), mix(2.0, 2.8, colossus));
    float st2 = sdStar(vec2(pr.x * ca + pr.y * sa, -pr.x * sa + pr.y * ca), 0.34, mix(3.0, 4.0, colossus), 2.0);
    // (亮度比第一版降一半：潭里最亮的应该是巨龙/巨灵本身)
    ln += (1.0 - smoothstep(0.006, 0.006 + aa * 1.5, abs(st))) * 1.1;
    ln += (1.0 - smoothstep(0.005, 0.005 + aa * 1.5, abs(st2))) * 0.9 * pulse;
    ln += band(r, 0.93, 0.009, aa) * 1.2;
    ln += band(r, 0.86, 0.004, aa) * 0.8;
    ln += band(r, 0.7, 0.005, aa) * 0.8 * pulse;
    ln += runes(r, a - t * 0.05, 0.78, 0.045, 30.0, seed, aa) * 1.0 * pulse;
    ln += runes(r, a + t * 0.09, 0.2, 0.05, 9.0, seed + 3.0, aa) * 0.8;
    // 水面被法阵映亮
    glow += vColorA * (1.0 - smoothstep(0.2, 1.0, r)) * 0.07 * pulse;
    paint = vColorB;
    alpha = (1.0 - smoothstep(0.3, 1.0, r)) * 0.16;
  } else if (type < 6.5) {
    // ── 柔光斑 ──
    float f = 1.0 - r;
    glow += vColorA * f * f * (0.8 + 0.2 * sin(t * 1.3 + seed * 6.0)) * vParam.w;
  } else if (type < 8.5) {
    // ── 涟漪圈：两道错开半个周期的细环，从中心向外扩并淡出 ──
    float period = 4.0 + 3.0 * fract(seed * 7.31);
    for (int i = 0; i < 2; i++) {
      float ph = fract(t / period + seed + float(i) * 0.5);
      float ring = band(r, 0.12 + ph * 0.82, 0.018 + 0.012 * ph, aa * 1.5) * (1.0 - ph) * smoothstep(0.0, 0.12, ph);
      glow += vColorA * ring * 0.34;
      alpha = max(alpha, ring * 0.12);
    }
    paint = vColorA;
  } else {
    // ── 地洞：深色洞口 + 一圈刨出来的浮土 ──
    vec2 hq = vec2(p.x, p.y * 1.25);
    float hr = length(hq) + (nz - 0.5) * 0.12;
    float hole = 1.0 - smoothstep(0.42, 0.56, hr);
    float mound = (1.0 - smoothstep(0.62, 0.98, hr)) * (0.55 + 0.45 * nz2);
    paint = mix(vColorB * (0.75 + 0.5 * nz2), vec3(0.012, 0.01, 0.012), hole);
    paint *= mix(1.0, 0.55, smoothstep(0.75, 0.5, hr) * (1.0 - hole));
    alpha = max(hole, mound * 0.9);
  }

  float lm = clamp(ln, 0.0, 1.0);
  paint = mix(paint, vColorA * 0.42, lm * 0.9);
  alpha = max(alpha, lm * 0.92);
  glow += vColorA * ln * 0.55;

  vec3 N = normalize((viewMatrix * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
  float shadow = kitShadow();
  vec3 irr = kitTintAmbient(kitAmbient(N), kitLightTint(vWorldPos.xz)) + kitSunColor() * max(dot(N, kitSunDir()), 0.0) * shadow + kitPointLights(N, -vViewPosition);
  paint *= mix(uShadeTintGround, vec3(1.0), shadow);
  // 先对「未预乘」的受光颜色做色调映射/色彩空间转换，再预乘并叠加发光：
  // 这样 low 档直出屏幕时半透明边缘不会出现亮边(HDR 路径下这两步是空操作，结果不变)
  gl_FragColor = vec4(paint * RECIPROCAL_PI * irr, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #ifdef TONE_MAPPING
  gl_FragColor.rgb = gl_FragColor.rgb * alpha + glow * 0.9;
  #else
  gl_FragColor.rgb = gl_FragColor.rgb * alpha + glow;
  #endif
  gl_FragColor.a = alpha;
}
`,
  kF = {
    mossback: { glow: 12116090, stone: 11120804 },
    glimwing: { glow: 8382688, stone: 10793140 },
    frost_golem: { glow: 8377599, stone: 12178408 },
    ember_golem: { glow: 16742956, stone: 5916224 },
    abyss_drake: { glow: 11041023, stone: 2365512 },
    star_colossus: { glow: 16765040, stone: 4864536 },
  };

function SF(n) {
  const t = n.map,
    e = [],
    s = [
      { glow: yt(Yt.blue.glow), stone: yt(11122386) },
      { glow: yt(Yt.red.glow), stone: yt(6969440) },
    ];
  t.towers.forEach((i, a) => {
    const o = s[i.team];
    e.push({
      type: 0,
      x: i.pos.x,
      y: 0.02,
      z: i.pos.y,
      radius: Rx,
      colorA: o.glow,
      colorB: o.stone,
      seed: a * 0.37,
    });
  });
  for (const i of t.bases) {
    const a = s[i.team];
    (e.push({
      type: 1,
      x: i.core.x,
      y: 0.02,
      z: i.core.y,
      radius: Sm,
      colorA: a.glow,
      colorB: a.stone,
      seed: i.team,
    }),
      e.push({
        type: 2,
        x: i.fountain.x,
        y: 0.03,
        z: i.fountain.y,
        radius: i.fountainRadius,
        colorA: a.glow,
        colorB: a.stone,
        seed: i.team + 0.5,
      }));
  }
  for (const i of t.camps) {
    const a = kF[i.monsterType],
      o = Bf(i.monsterType),
      r = i.monsterType === "abyss_drake" || i.monsterType === "star_colossus",
      l = i.monsterType === "frost_golem" || i.monsterType === "ember_golem";
    if (i.monsterType === "mossback") {
      const c = n.wallDist(i.pos.x + 1.2, i.pos.y, 8) < n.wallDist(i.pos.x - 1.2, i.pos.y, 8) ? 1 : -1,
        f = n.wallDist(i.pos.x, i.pos.y + 1.2, 8) < n.wallDist(i.pos.x, i.pos.y - 1.2, 8) ? 1 : -1;
      e.push({
        type: 9,
        x: i.pos.x + c * 1.35,
        y: 0.02,
        z: i.pos.y + f * 1.35,
        radius: 1.15,
        colorA: yt(0),
        colorB: yt(9073488),
        seed: i.id * 0.37,
      });
    }
    e.push({
      type: r ? 5 : l ? 4 : 3,
      x: i.pos.x,
      y: r ? Fn + 0.035 : 0.02,
      z: i.pos.y,
      radius: o,
      colorA: yt(a.glow),
      colorB: yt(a.stone),
      seed: i.id * 0.61,
      w: i.monsterType === "ember_golem" || i.monsterType === "star_colossus" ? 1 : 0,
    });
  }
  return e;
}

function TF(n, t) {
  const e = n.length,
    s = new Float32Array(e * 12),
    i = new Float32Array(e * 8),
    a = new Float32Array(e * 16),
    o = new Float32Array(e * 12),
    r = new Float32Array(e * 12),
    l = [],
    c = [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1],
    ];
  n.forEach((m, x) => {
    for (let g = 0; g < 4; g++) {
      const [y, v] = c[g],
        _ = x * 4 + g;
      ((s[_ * 3] = m.x + y * m.radius),
        (s[_ * 3 + 1] = m.y),
        (s[_ * 3 + 2] = m.z + v * m.radius),
        (i[_ * 2] = y),
        (i[_ * 2 + 1] = v),
        (a[_ * 4] = m.type),
        (a[_ * 4 + 1] = m.seed ?? 0),
        (a[_ * 4 + 2] = m.radius),
        (a[_ * 4 + 3] = m.w ?? 0),
        o.set(m.colorA, _ * 3),
        r.set(m.colorB, _ * 3));
    }
    const p = x * 4;
    l.push(p, p + 3, p + 2, p, p + 2, p + 1);
  });
  const f = new Bn();
  (f.setAttribute("position", new On(s, 3)),
    f.setAttribute("uv", new On(i, 2)),
    f.setAttribute("aParam", new On(a, 4)),
    f.setAttribute("aColorA", new On(o, 3)),
    f.setAttribute("aColorB", new On(r, 3)),
    f.setIndex(l));
  const d = new An({
      uniforms: Ff({ uTime: fs.uTime, uBound: { value: t }, uAlert: { value: new Ee(0, 0) } }),
      vertexShader: wF,
      fragmentShader: MF,
      lights: !0,
      fog: !1,
      transparent: !0,
      premultipliedAlpha: !0,
      depthWrite: !1,
      polygonOffset: !0,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    }),
    h = new Sn(f, d);
  ((h.name = "decals"), (h.receiveShadow = !0), (h.renderOrder = 3), (h.frustumCulled = !1));
  const u = d.uniforms.uAlert.value;
  return {
    mesh: h,
    setFountainAlert(m, x) {
      m === 0 ? (u.x = x) : (u.y = x);
    },
  };
}

const vf = 8,
  EF = `
${Pf}
${VM}
attribute vec3 color;
attribute vec4 aFx;
uniform vec4 uPushers[${vf}];
uniform vec4 uReveal;
varying vec3 vColor;
varying vec3 vViewPosition;
varying vec3 vWorldPos;
varying float vTip;
void main() {
  vColor = color;
  vTip = aFx.x;
  vec3 objectNormal = normal;
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  float w = aFx.x;
  // 被单位拨开：向外推并压低，离得越近越明显
  vec2 push = vec2(0.0);
  float press = 0.0;
  for (int i = 0; i < ${vf}; i++) {
    vec4 p = uPushers[i];
    vec2 d = worldPosition.xz - p.xy;
    float dist = length(d);
    float f = 1.0 - smoothstep(p.z * 0.35, p.z, dist);
    push += (d / max(dist, 0.05)) * f * p.w;
    press += f * p.w;
  }
  worldPosition.xz += push * w * 0.55;
  worldPosition.y -= min(press, 1.0) * w * 0.38;
  // 玩家附近的草整片伏低：aFx.y 是每片叶的随机阈值，离玩家越近倒伏的叶越多、伏得越低
  float rv = (1.0 - smoothstep(uReveal.z * 0.45, uReveal.z, length(worldPosition.xz - uReveal.xy))) * uReveal.w;
  float lay = smoothstep(aFx.y * 0.7, aFx.y * 0.7 + 0.3, rv);
  worldPosition.y = mix(worldPosition.y, -0.03 + (worldPosition.y + 0.03) * (0.14 + 0.2 * aFx.y), lay);
  worldPosition.xyz += windOffset(worldPosition.xyz, w * 0.34);
  vWorldPos = worldPosition.xyz;
  ${Df}
}
`,
  AF = `
${If}
${Nf}
varying vec3 vColor;
varying vec3 vViewPosition;
varying vec3 vWorldPos;
varying float vTip;
void main() {
  vec3 N = normalize((viewMatrix * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
  float shadow = kitShadow();
  vec3 sun = kitSunColor();
  float ndl = max(dot(N, kitSunDir()), 0.0);
  // 叶片薄而透光：暗部不压得太死
  vec3 irr = kitTintAmbient(kitAmbient(N) * (0.62 + 0.38 * vTip), kitLightTint(vWorldPos.xz)) + sun * ndl * (0.3 + 0.7 * shadow) * (0.7 + 0.3 * vTip) + kitPointLights(N, -vViewPosition);
  vec3 col = vColor * RECIPROCAL_PI * irr;
  // 叶尖的逆光金边
  col += vColor * sun * RECIPROCAL_PI * vTip * vTip * 0.14 * shadow;
  gl_FragColor = vec4(col, 1.0);
  ${aa}
}
`,
  RF = yt(Yt.env.reedDark),
  lp = yt(Yt.env.reed),
  CF = yt(Yt.env.reedTip),
  cp = yt(15129774);

function LF(n, t, e, s, i, a, o, r, l, c, f, d) {
  const h = -r * a,
    u = o * a,
    m = 4,
    x = [],
    p = Ht(Pt(RF, lp, c * 0.25), 0.82),
    g = Pt(lp, Ht(lp, 1.1), c),
    y = Pt(CF, Ht(lp, 1.2), 0.25 + c * 0.4);
  for (let v = 0; v < m; v++) {
    const _ = v / (m - 1),
      k = _ * _ * (0.6 + 0.4 * _) * l,
      M = t + o * k,
      S = e + r * k,
      b = s + i * _ * (1 - 0.2 * _ * _ * Math.abs(l) * 2.2),
      w = (1 - _ * 0.8) * (v === m - 1 ? 0.22 : 1),
      T = _ < 0.34 ? Pt(p, g, _ / 0.34) : Pt(g, y, (_ - 0.34) / 0.66);
    x.push(
      n.vertex(M - h * w, b, S - u * w, T, 0, 1, 0, _ * _, d),
      n.vertex(M + h * w, b, S + u * w, T, 0, 1, 0, _ * _, d),
    );
  }
  for (let v = 0; v < m - 1; v++) n.quad(x[v * 2], x[v * 2 + 1], x[v * 2 + 3], x[v * 2 + 2]);
  if (f) {
    const v = t + o * l,
      _ = e + r * l,
      k = s + i * 0.88,
      M = n.vertex(v, k, _, cp, 0, 1, 0, 0.9, d),
      S = n.vertex(v - h * 1.3, k + 0.18, _ - u * 1.3, cp, 0, 1, 0, 1, d),
      b = n.vertex(v + h * 1.3, k + 0.18, _ + u * 1.3, cp, 0, 1, 0, 1, d),
      w = n.vertex(v + o * 0.08, k + 0.46, _ + r * 0.08, Ht(cp, 1.06), 0, 1, 0, 1, d);
    n.quad(M, b, w, S);
  }
}

function IF(n, t, e) {
  const s = new ke(e);
  let i = 1 / 0,
    a = -1 / 0,
    o = 1 / 0,
    r = -1 / 0;
  for (const h of n)
    ((i = Math.min(i, h.x)), (a = Math.max(a, h.x)), (o = Math.min(o, h.y)), (r = Math.max(r, h.y)));
  const l = 0.2,
    c = [],
    f = { x: 0, y: 0 };
  for (let h = o; h <= r; h += l)
    for (let u = i; u <= a; u += l)
      ((f.x = u + s.range(-0.5, 0.5) * l),
        (f.y = h + s.range(-0.5, 0.5) * l),
        yo(f, n) && (Er(f, n) > -0.1 || t.solidDist(f.x, f.y) < 0.1 || c.push([f.x, f.y])));
  for (let h = c.length - 1; h > 0; h--) {
    const u = s.int(h + 1),
      m = c[h];
    ((c[h] = c[u]), (c[u] = m));
  }
  const d = new Be();
  for (const [h, u] of c) {
    ((f.x = h), (f.y = u));
    const m = -Er(f, n),
      x = Math.min(1, m / 0.9),
      p = (0.95 + s.range(0, 0.45)) * (0.72 + 0.28 * x),
      g = s.range(0, Math.PI * 2),
      y = s.range(0.1, 0.4),
      v = x > 0.6 && s.chance(0.009);
    LF(
      d,
      h,
      u,
      t.heightAt(h, u) - 0.03,
      v ? p * 1.2 : p,
      0.07 * s.range(0.6, 1.4),
      Math.cos(g),
      Math.sin(g),
      y,
      s.next(),
      v,
      s.next(),
    );
  }
  return d.build();
}

function PF(n, t) {
  const e = new An({
      uniforms: Ff({
        uTime: fs.uTime,
        uWind: fs.uWind,
        uPushers: { value: Array.from({ length: vf }, () => new kn(0, 0, 1, 0)) },
        uReveal: { value: new kn(0, 0, 1, 0) },
      }),
      vertexShader: EF,
      fragmentShader: AF,
      lights: !0,
      fog: !0,
      side: fi,
    }),
    s = new Ji();
  s.name = "bushes";
  const i = [];
  n.map.bushes.forEach((r, l) => {
    const c = IF(r, n, 9e3 + l * 17),
      f = new Sn(c, e);
    ((f.name = `bush:${l}`),
      (f.receiveShadow = !0),
      (f.castShadow = !1),
      (f.matrixAutoUpdate = !1),
      c.boundingSphere && (c.boundingSphere.radius += 0.6),
      s.add(f),
      i.push({ mesh: f, fullCount: c.index ? c.index.count : 0 }));
  });
  const a = e.uniforms.uPushers.value,
    o = (r) => {
      for (const l of i) {
        const c = Math.floor((l.fullCount * Math.min(1, r.foliage)) / 3) * 3;
        l.mesh.geometry.setDrawRange(0, c);
      }
    };
  return (
    o(t),
    {
      group: s,
      material: e,
      setPushers(r, l) {
        for (let c = 0; c < vf; c++)
          c < l ? a[c].set(r[c * 4], r[c * 4 + 1], r[c * 4 + 2], r[c * 4 + 3]) : (a[c].w = 0);
      },
      setReveal(r, l, c, f) {
        e.uniforms.uReveal.value.set(r, l, c, f);
      },
      setQuality: o,
    }
  );
}

const so = (n) => (n < 0 ? 0 : n > 255 ? 255 : n);

function k8(n, t, e, s) {
  const i = document.createElement("canvas");
  i.width = i.height = e;
  const a = i.getContext("2d");
  if (!a) return;
  const o = a.createImageData(e, e),
    r = o.data;
  for (let f = 0; f < e; f++)
    for (let d = 0; d < e; d++) {
      const [h, u, m] = s(d / e, f / e),
        x = (f * e + d) * 4;
      ((r[x] = so(h)), (r[x + 1] = so(u)), (r[x + 2] = so(m)), (r[x + 3] = 255));
    }
  a.putImageData(o, 0, 0);
  const l = n.createPattern(i, "repeat");
  if (!l) return;
  const c = t / e;
  (n.save(),
    (n.imageSmoothingEnabled = !0),
    (n.imageSmoothingQuality = "high"),
    n.scale(c, c),
    (n.fillStyle = l),
    n.fillRect(0, 0, e, e),
    n.restore());
}

function DF(n = 1024) {
  return fx(
    n,
    n,
    (t) => {
      const e = n / 512;
      k8(t, n, 256, (r, l) => {
        const c = un(r * 7, l * 7, 4, 13, 7),
          f = un(r * 48, l * 48, 2, 29, 48),
          d = 120 + (c - 0.5) * 40 + (f - 0.5) * 16;
        return [d * 0.98, d * 1.02, d * 0.96];
      });
      const s = new ke(2024);
      t.lineCap = "round";
      const i = (r, l, c, f, d, h, u, m) => {
          const x = r + Math.cos(c) * f,
            p = l + Math.sin(c) * f,
            g = Math.cos(c + Math.PI / 2),
            y = Math.sin(c + Math.PI / 2),
            v = (r + x) / 2 + g * h * f,
            _ = (l + p) / 2 + y * h * f,
            k = t.createLinearGradient(r, l, x, p),
            M = Math.round(u * 0.55);
          (k.addColorStop(0, `rgba(${M},${Math.round(M * 1.06)},${Math.round(M * 0.95)},${m * 0.5})`),
            k.addColorStop(
              1,
              `rgba(${Math.round(u)},${Math.round(Math.min(255, u * 1.05))},${Math.round(u * 0.78)},${m})`,
            ),
            (t.fillStyle = k),
            t.beginPath(),
            t.moveTo(r - g * d, l - y * d),
            t.quadraticCurveTo(v - g * d * 0.6, _ - y * d * 0.6, x, p),
            t.quadraticCurveTo(v + g * d * 0.6, _ + y * d * 0.6, r + g * d, l + y * d),
            t.closePath(),
            t.fill());
        },
        a = Math.round(150 * e * e);
      for (let r = 0; r < a; r++) {
        const l = s.range(0, n),
          c = s.range(0, n),
          f = -Math.PI / 2 + s.range(-0.7, 0.7),
          d = 4 + s.int(5),
          h = s.chance(0.6),
          u = s.range(22, 44) * e;
        nh(n, l, c, u * 1.3, (m, x) => {
          const p = t.createRadialGradient(m, x, 0, m, x, u * 0.55);
          (p.addColorStop(0, "rgba(46,62,44,0.3)"),
            p.addColorStop(1, "rgba(46,62,44,0)"),
            (t.fillStyle = p),
            t.beginPath(),
            t.arc(m, x, u * 0.55, 0, Math.PI * 2),
            t.fill());
        });
        for (let m = 0; m < d; m++) {
          const x = f + ((m + 0.5) / d - 0.5) * 1.5 + s.range(-0.1, 0.1),
            p = u * s.range(0.65, 1.1),
            g = s.range(2.2, 3.8) * e,
            y = s.range(-0.22, 0.22),
            v = h ? s.range(165, 215) : s.range(120, 160),
            _ = s.range(0.4, 0.62);
          nh(n, l, c, p + 6, (k, M) => i(k, M, x, p, g, y, v, _));
        }
      }
      const o = Math.round((n * n) / (420 * e * e));
      for (let r = 0; r < o; r++) {
        const l = s.range(0, n),
          c = s.range(0, n),
          f = -Math.PI / 2 + s.range(-0.9, 0.9),
          d = s.chance(0.5),
          h = 3 + s.int(4);
        for (let u = 0; u < h; u++) {
          const m = l + s.range(-7, 7) * e,
            x = c + s.range(-5, 5) * e,
            p = s.range(7, 15) * e,
            g = f + s.range(-0.45, 0.45),
            y = d ? s.range(150, 200) : s.range(66, 104),
            v = s.range(0.2, 0.42);
          ((t.strokeStyle = `rgba(${Math.round(y * (d ? 1 : 0.92))},${Math.round(y * 1.04)},${Math.round(y * (d ? 0.8 : 0.95))},${v})`),
            (t.lineWidth = s.range(1.2, 2.4) * e),
            nh(n, m, x, p + 4, (_, k) => {
              (t.beginPath(), t.moveTo(_, k), t.lineTo(_ + Math.cos(g) * p, k + Math.sin(g) * p), t.stroke());
            }));
        }
      }
    },
    { repeat: !0, anisotropy: 8 },
  );
}

function zF(n, t, e) {
  const s = -t,
    i = e;
  return fx(
    n,
    n,
    (a) => {
      k8(a, n, 256, (l, c) => {
        const f = un(l * 5, c * 5, 4, 51, 5),
          d = un(l * 60, c * 60, 2, 63, 60),
          h = un(l * 10 + 4.1, c * 10, 3, 77, 10);
        let u = 126 + (f - 0.5) * 50 + (d - 0.5) * 26;
        return (Math.abs(h - 0.5) < 0.014 && (u -= 22), [u * 1.02, u * 0.99, u * 0.94]);
      });
      const o = new ke(808),
        r = Math.round((n * n) / 3200);
      for (let l = 0; l < r; l++) {
        const c = o.range(0, n),
          f = o.range(0, n),
          d = o.range(2, 7.5) * (o.chance(0.12) ? 1.8 : 1),
          h = o.range(0, Math.PI),
          u = o.range(128, 190),
          m = o.range(0.6, 0.95);
        nh(n, c, f, d + 4, (x, p) => {
          ((a.fillStyle = "rgba(40,34,30,0.32)"),
            a.beginPath(),
            a.ellipse(x + s * d * 0.4, p + i * d * 0.4, d, d * m, h, 0, Math.PI * 2),
            a.fill(),
            (a.fillStyle = `rgb(${Math.round(u)},${Math.round(u * 0.97)},${Math.round(u * 0.92)})`),
            a.beginPath(),
            a.ellipse(x, p, d, d * m, h, 0, Math.PI * 2),
            a.fill(),
            (a.fillStyle = "rgba(255,255,250,0.3)"),
            a.beginPath(),
            a.ellipse(x - s * d * 0.3, p - i * d * 0.3, d * 0.5, d * m * 0.42, h, 0, Math.PI * 2),
            a.fill());
        });
      }
    },
    { repeat: !0, anisotropy: 8 },
  );
}

const lh = (n) => (n < 0 ? 0 : n > 1 ? 1 : n),
  Vc = (n, t, e) => {
    const s = lh((e - n) / (t - n));
    return s * s * (3 - 2 * s);
  };

function g3(n, t, e) {
  const s = new zr(n, t, t, Gs, mi);
  return (
    (s.wrapS = s.wrapT = mh),
    (s.colorSpace = Ki),
    (s.generateMipmaps = !0),
    (s.minFilter = Fo),
    (s.magFilter = Ns),
    (s.anisotropy = e),
    (s.needsUpdate = !0),
    s
  );
}

const NF = 5;

function FF(n, t = 512, e = 8) {
  const s = NF,
    i = new ke(4127),
    a = s * s,
    o = new Float32Array(a),
    r = new Float32Array(a),
    l = new Uint8Array(a),
    c = new Float32Array(a),
    f = new Float32Array(a),
    d = new Uint8Array(a);
  for (let A = 0; A < a; A++) {
    ((o[A] = (A % s) + 0.5 + i.range(-0.26, 0.26)), (r[A] = Math.floor(A / s) + 0.5 + i.range(-0.26, 0.26)));
    const C = i.next();
    ((l[A] = C < 0.3 ? 0 : C < 0.58 ? 1 : C < 0.8 ? 2 : 3),
      (c[A] = i.range(-0.13, 0.13)),
      (f[A] = i.range(-0.13, 0.13)),
      (d[A] = i.chance(0.5) ? 1 : 0));
  }
  const h = new Float32Array(a * 3),
    u = new Float32Array(a * 3),
    m = new Float32Array(a * 3),
    x = new Float32Array(a * 3),
    p = new Uint8Array(a * 3);
  for (let A = 0; A < a * 3; A++)
    ((h[A] = i.range(-1, 1)),
      (u[A] = i.range(0.06, 1)),
      (m[A] = i.range(-1, 1)),
      (x[A] = i.range(-1, 1)),
      (p[A] = i.chance(0.16) ? 1 : 0));
  const g = t * t,
    y = new Float32Array(g),
    v = new Float32Array(g),
    _ = new Float32Array(g),
    k = new Uint16Array(g),
    M = new Float32Array(g),
    S = 0.05;
  for (let A = 0; A < t; A++)
    for (let C = 0; C < t; C++) {
      const R = C / t,
        I = A / t,
        P = R * s,
        F = I * s,
        L = Math.floor(P),
        B = Math.floor(F);
      let G = 9,
        q = 9,
        et = 0,
        ct = 0,
        rt = 0;
      for (let j = -1; j <= 1; j++)
        for (let at = -1; at <= 1; at++) {
          const Rt = (L + at + s) % s,
            kt = (B + j + s) % s,
            V = kt * s + Rt,
            U = P - (o[V] - Rt + L + at),
            ht = F - (r[V] - kt + B + j),
            lt = Math.abs(U),
            O = Math.abs(ht),
            Y = Math.hypot(U, ht) * 0.2 + Math.max(lt, O) * 0.8;
          Y < G ? ((q = G), (G = Y), (et = V), (ct = U), (rt = ht)) : Y < q && (q = Y);
        }
      let mt = (q - G) * 0.5,
        nt = 0;
      const H = l[et];
      if (H === 1 || H === 3) {
        const j = ct - c[et];
        if (((nt = j > 0 ? 1 : 0), (mt = Math.min(mt, Math.abs(j))), H === 3 && nt === d[et])) {
          const at = rt - f[et];
          (at > 0 && (nt = 2), (mt = Math.min(mt, Math.abs(at))));
        }
      } else if (H === 2) {
        const j = rt - f[et];
        ((nt = j > 0 ? 1 : 0), (mt = Math.min(mt, Math.abs(j))));
      }
      const st = et * 3 + nt,
        tt = un(R * 6, I * 6, 3, 5, 6),
        it = u1(R * 28, I * 28, 9, 28),
        D = u1(R * 90, I * 90, 13, 90);
      mt += (it - 0.5) * 0.008;
      const Q = 0.0085 + (tt - 0.5) * 0.003,
        $ = A * t + C,
        ut = lh((mt - Q) / 0.009),
        N = lh((mt - Q) / S);
      let J = (1 - (1 - N) * (1 - N)) * (0.86 + (tt - 0.5) * 0.3 + (D - 0.5) * 0.07),
        Z = 0.5 + h[st] * 0.055 + (tt - 0.5) * 0.09 + (D - 0.5) * 0.035;
      const ot = Vc(0.78, 0.92, u1(R * 19 + 3.7, I * 19, 31, 19)) * (1 - Vc(0.02, 0.13, mt - Q));
      if (((J -= ot * 0.4), (Z -= ot * 0.05), p[st] && mt > Q + 0.035)) {
        const j = un(R * 7 + u[st] * 13, I * 7 + u[st] * 5, 2, 77, 7),
          at = 1 - Vc(0.004, 0.013, Math.abs(j - 0.5));
        ((J -= at * 0.5), (Z -= at * 0.1));
      }
      ((y[$] = ut > 0 ? Math.max(0.02, J) * ut : 0),
        (v[$] = Z),
        (_[$] = ut),
        (k[$] = st),
        (M[$] = lh(un(R * 4 + 9.3, I * 4 + 2.1, 3, 41, 4) * 0.8 + (1 - Vc(0, 0.13, mt - Q)) * 0.34 - 0.05)));
    }
  const b = new Uint8Array(g * 4),
    w = new Uint8Array(g * 4),
    T = (A, C) => y[((C + t) % t) * t + ((A + t) % t)],
    E = 2.4 / (800 / t) / 2;
  for (let A = 0; A < t; A++)
    for (let C = 0; C < t; C++) {
      const R = A * t + C,
        I = k[R],
        P = _[R];
      let F = -(T(C + 1, A) - T(C - 1, A)) * E + m[I] * 0.03 * P,
        L = -(T(C, A + 1) - T(C, A - 1)) * E + x[I] * 0.03 * P;
      const B = 1 / Math.hypot(F, L, 1);
      ((F *= B), (L *= B));
      const G = (F * n.x + B * n.y + L * n.z) / n.y;
      ((b[R * 4] = so(v[R] * 255)),
        (b[R * 4 + 1] = so(P * 255)),
        (b[R * 4 + 2] = so(u[I] * 255)),
        (b[R * 4 + 3] = so(G * 127.5)),
        (w[R * 4] = so((F * 0.5 + 0.5) * 255)),
        (w[R * 4 + 1] = so((L * 0.5 + 0.5) * 255)),
        (w[R * 4 + 2] = so(y[R] * 255)),
        (w[R * 4 + 3] = so(M[R] * 255)));
    }
  return { data: g3(b, t, e), normal: g3(w, t, e) };
}

function UF(n = 256) {
  const e = Math.PI * 2,
    s = [];
  for (let r = 0; r < 7; r++)
    for (let l = 0; l < 7; l++)
      s.push(l + 0.5 + (nn(l, r, 311) - 0.5) * 0.86, r + 0.5 + (nn(l, r, 313) - 0.5) * 0.86);
  const i = new Float32Array(n * n);
  for (let r = 0; r < n; r++)
    for (let l = 0; l < n; l++) {
      const c = l / n,
        f = r / n,
        d = c + 0.03 * Math.sin(e * (2 * f + c) + 1.3) + 0.014 * Math.sin(e * (5 * f - 3 * c) + 4),
        h = f + 0.03 * Math.sin(e * (2 * c - f) + 2.9) + 0.014 * Math.sin(e * (4 * c + 5 * f) + 0.6),
        u = (((d % 1) + 1) % 1) * 7,
        m = (((h % 1) + 1) % 1) * 7,
        x = Math.floor(u),
        p = Math.floor(m);
      let g = 9,
        y = 9;
      for (let k = -1; k <= 1; k++)
        for (let M = -1; M <= 1; M++) {
          const S = (x + M + 7) % 7,
            b = (p + k + 7) % 7,
            w = (b * 7 + S) * 2,
            T = Math.hypot(s[w] - S + x + M - u, s[w + 1] - b + p + k - m);
          T < g ? ((y = g), (g = T)) : T < y && (y = T);
        }
      const v = y - g,
        _ = 1 - Vc(0, 0.13, v);
      i[r * n + l] = lh(_ * _ * 0.85 + (1 - Vc(0, 0.5, v)) * 0.2);
    }
  const a = new Uint8Array(n * n * 4),
    o = n >> 1;
  for (let r = 0; r < n; r++)
    for (let l = 0; l < n; l++) {
      const c = (r * n + l) * 4;
      ((a[c] = i[r * n + l] * 255),
        (a[c + 1] = i[((n - 1 - r + o) % n) * n + ((l + o + 37) % n)] * 255),
        (a[c + 2] = 0),
        (a[c + 3] = 255));
    }
  return g3(a, n, 2);
}

const OF = `
${Pf}
varying vec3 vWorldPos;
varying vec3 vNormalW;
varying vec3 vViewPosition;
void main() {
  vec3 objectNormal = normal;
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  vWorldPos = worldPosition.xyz;
  vNormalW = normal;
  ${Df}
}
`,
  il = H1,
  n0 = (n) => n.toFixed(1),
  BF = `
${If}
${Nf}
${Vl}
uniform sampler2D tSplatA;
uniform sampler2D tSplatB;
uniform sampler2D tNoise;
uniform sampler2D tGrass;
uniform sampler2D tStone;
uniform sampler2D tStoneN;
uniform sampler2D tDirt;
uniform sampler2D tCaust;
uniform float uTime;
uniform float uSplatScale;
uniform float uWaterLevel;
uniform vec2 uFlow;
uniform vec3 uShadeTintGround;
uniform float uLaneGain;
uniform float uLaneHalf;
uniform vec3 cGrass;
uniform vec3 cGrassWarm;
uniform vec3 cGrassCool;
uniform vec3 cGrassDark;
uniform vec3 cLane;
uniform vec3 cLaneAlt;
uniform vec3 cLaneEarth;
uniform vec3 cGrout;
uniform vec3 cMoss;
uniform vec3 cDirt;
uniform vec3 cHumus;
uniform vec3 cSand;
uniform vec3 cGravel;
uniform vec3 cScatter;
uniform vec3 cCaustic;
uniform vec3 cSkyRefl;
uniform vec3 cStar;
uniform vec3 cLeaf[3];
uniform vec3 cPetal[2];
uniform vec3 cBaseStone[2];
uniform vec3 cBaseTrim[2];
uniform vec3 cBaseGlow[2];
uniform vec2 uBaseCore[2];
uniform vec2 uBaseAxis[8];
uniform vec3 uCamps[${f3}];
varying vec3 vWorldPos;
varying vec3 vNormalW;
varying vec3 vViewPosition;

const float TAU = 6.2831853;

// 一层落叶图章：cell 米见方的格子里至多一片两头尖的小叶。返回 rgb = 叶色序号对应的颜色权重(x 琥珀 y 橄榄 z 锈红)，a = 覆盖
vec4 leafLayer(vec2 p, float cell, float density, float seed) {
  vec2 g = p / cell;
  vec2 id = floor(g);
  vec2 f = fract(g) - 0.5;
  vec2 h = hash22(id + seed);
  float h3 = hash12(id * 1.37 + seed + 7.1);
  if (h3 > density) return vec4(0.0);
  float a = h.x * TAU;
  vec2 d = f - (h - 0.5) * 0.46;
  float ca = cos(a);
  float sa = sin(a);
  vec2 r = vec2(d.x * ca + d.y * sa, -d.x * sa + d.y * ca);
  // 叶长 0.2~0.3 米
  float len = (0.1 + 0.05 * h.y) / cell * 1.1;
  r /= len;
  // 柳叶形：|y| < 0.42 (1 - x²)
  float lens = 0.42 * (1.0 - r.x * r.x) - abs(r.y);
  float aa = fwidth(lens) + 0.02;
  float cover = smoothstep(0.0, aa, lens) * step(abs(r.x), 1.0);
  // 中脉一道暗线、叶缘略亮
  float rib = 1.0 - 0.3 * (1.0 - smoothstep(0.03, 0.09, abs(r.y)));
  float k = fract(h3 * 37.0 / max(density, 0.01));
  vec3 w = k < 0.4 ? vec3(1.0, 0.0, 0.0) : (k < 0.75 ? vec3(0.0, 1.0, 0.0) : vec3(0.0, 0.0, 1.0));
  return vec4(w * rib * (0.82 + 0.36 * h.y), cover);
}

void main() {
  vec2 wp0 = vWorldPos.xz;
  float t = uTime;
  float under = smoothstep(uWaterLevel + 0.02, uWaterLevel - 0.1, vWorldPos.y);
  float wdepth = max(0.0, uWaterLevel - vWorldPos.y);
  vec2 wp = wp0;
  #if WATER >= 1
  // 折射：河床各层的采样坐标按水波法线偏移，水越深晃得越厉害(与水面着色器用同一组流动噪声)。只有水下的像素才采样
  if (under > 0.001) {
    vec4 rn = texture2D(tNoise, wp0 * 0.061 - uFlow * t * 0.022);
    #if WATER >= 2
    vec4 rn2 = texture2D(tNoise, wp0 * 0.113 - uFlow * t * 0.041 + vec2(0.37, 0.71));
    wp += vec2((rn.g - 0.5) * 0.4 + (rn2.b - 0.5) * 0.3, (rn.b - 0.5) * 0.4 + (rn2.g - 0.5) * 0.3) * (wdepth * 2.4);
    #else
    wp += (rn.gb - 0.5) * (wdepth * 1.5);
    #endif
  }
  #endif

  vec2 suv = wp * uSplatScale + 0.5;
  vec4 sa = texture2D(tSplatA, suv);
  vec4 sb = texture2D(tSplatB, suv);
  float dLane = (sa.r - 0.5) * ${n0(il.lane * 2)};
  float dRiver = (sa.g - 0.5) * ${n0(il.river * 2)};
  float dSolid = (sa.b - 0.5) * ${n0(il.solid * 2)};
  float dBase = (sa.a - 0.5) * ${n0(il.base * 2)};
  float dBush = (sb.r - 0.5) * ${n0(il.bush * 2)};
  float dCamp = (sb.g - 0.5) * ${n0(il.camp * 2)};
  float dPad = (sb.a - 0.5) * ${n0(il.pad * 2)};

  // 多尺度噪声：nA 管大色块(十米级)，nB 管米级破碎
  vec4 nA = texture2D(tNoise, wp * 0.0213);
  vec4 nB = texture2D(tNoise, wp * 0.0871 + vec2(0.31, 0.17));

  // ── 草地：四个草色的大块色斑(日晒发黄 / 近水发青 / 背阴发暗)，贴图只给笔触 ──
  vec3 gt = texture2D(tGrass, wp * 0.1).rgb;
  #if DETAIL >= 1
  vec3 gt2 = texture2D(tGrass, vec2(wp.y, -wp.x) * 0.0371 + 0.4).rgb;
  #else
  vec3 gt2 = vec3(0.182);
  #endif
  vec3 grass = mix(cGrassCool, cGrass, smoothstep(0.3, 0.6, nA.r));
  grass = mix(grass, cGrassWarm, smoothstep(0.5, 0.76, nA.g) * 0.55);
  grass = mix(grass, cGrassCool, (1.0 - smoothstep(0.4, 5.0, dRiver)) * 0.55);
  grass = mix(grass, cGrassDark, smoothstep(0.54, 0.8, nB.r) * 0.45);
  // 草色整体向灰收一成半：受光草地实测饱和度 0.56~0.70，比色表(0.45~0.53)艳，全屏高饱和面积超标
  grass = mix(vec3(dot(grass, vec3(0.2126, 0.7152, 0.0722))), grass, 0.84);
  // (草贴图是 sRGB 的暗灰绿，线性均值约 0.18：先乘回 1 附近，再把对比收到原来的六成；最亮的笔触封顶)
  vec3 gdet = min(mix(vec3(1.0), gt * 5.5 * (gt2 * 2.75 + 0.5), 0.6), vec3(1.55));
  grass *= mix(vec3(0.9, 0.97, 1.02), vec3(1.08, 1.05, 0.9), smoothstep(0.8, 1.35, gdet.g)) * gdet;
  vec3 albedo = grass;
  vec3 emissive = vec3(0.0);

  // ── 野区腐殖土：通道中央踩实成土路，靠墙处保留草 ──
  // (泥土贴图是 sRGB 的中灰，线性均值约 0.22：乘回 1 附近，并收一点对比)
  vec3 dt = mix(vec3(1.0), texture2D(tDirt, wp * 0.238).rgb * 4.9, 0.75);
  float corridor = smoothstep(0.9, 3.0, dSolid);
  float dirtN = nB.r * 0.55 + nA.g * 0.45;
  float dirtMask = smoothstep(0.47, 0.6, dirtN + corridor * 0.12 - 0.06) * corridor;
  // 营地空地与草丛下的泥土
  float clearing = 1.0 - smoothstep(-0.8, 1.6, dCamp + (nB.g - 0.5) * 2.2);
  float bushSoil = 1.0 - smoothstep(-0.1, 0.55, dBush + (nB.b - 0.5) * 0.5);
  dirtMask = max(dirtMask * 0.85, clearing * 0.92);
  vec3 dirt = mix(cHumus, cDirt, nA.b) * dt;
  #if DETAIL >= 2
  // 墙脚的树根纹：噪声等值线取脊，深棕
  float rootZone = (1.0 - smoothstep(0.5, 2.2, dSolid)) * step(0.05, dSolid);
  float rootN = texture2D(tNoise, wp * 0.047 + 0.19).g;
  float root = (1.0 - smoothstep(0.012, 0.03, abs(rootN - 0.5))) * rootZone;
  dirt = mix(dirt, cHumus * 0.5, root * 0.8);
  albedo = mix(albedo, cHumus * 0.55, root * 0.5);
  #endif
  albedo = mix(albedo, dirt, dirtMask);
  albedo = mix(albedo, cGrassDark * (gt * 3.2 + 0.4) * 0.62, bushSoil * 0.85);

  // ── 兵线石板路：路内铺满，只有最外沿零星缺块；路缘石(几何)外面是一条窄夯土带，再过渡到草 ──
  float laneN = (nB.g - 0.5) * 0.45 + (nB.b - 0.5) * 0.25;
  float dl = dLane + laneN;
  // tStone：r 明暗 g 石面蒙版 b 石块 id a 烘好的倒角受光；tStoneN：rg 法线 b 高度 a 苔藓噪声
  // (只有兵线、塔座、基地附近才用得到：其余地方省掉这两次采样)
  vec4 sd = vec4(0.5, 1.0, 0.5, 0.5);
  vec4 sn = vec4(0.5, 0.5, 0.8, 0.3);
  if (dLane < 1.4 || dPad < 1.0 || dBase < 0.8) {
    sd = texture2D(tStone, wp * 0.125);
    #if DETAIL >= 1
    sn = texture2D(tStoneN, wp * 0.125);
    #endif
  }
  float keepT = smoothstep(-0.55, 0.3, dl);
  float paved = step(keepT * keepT * 0.85, sd.b);
  float earth = 1.0 - smoothstep(0.3, 0.8, dl);
  vec3 laneEarth = cLaneEarth * dt * (0.94 + 0.2 * nA.b);
  float wear = smoothstep(-1.2, -3.2, dLane);
  float tone = mix(sd.r * 2.0, 1.0, 0.4 * wear) * (1.0 + 0.03 * wear);
  vec3 laneStone = mix(cLane, cLaneAlt, smoothstep(0.5, 0.9, sd.b) * 0.7);
  // 主光很暖：反照率往冷灰收一点，受光后才是「暖灰米」而不是土黄
  laneStone = mix(laneStone, vec3(dot(laneStone, vec3(0.3, 0.5, 0.2))) * vec3(0.95, 1.0, 1.1), 0.42) * tone * (0.95 + 0.12 * nA.r) * uLaneGain;
  // 苔：路边、墙脚与近水处，从石缝往石面上爬
  float nearWall = 1.0 - smoothstep(0.3, 2.0, dSolid);
  float nearRiver = 1.0 - smoothstep(0.4, 3.0, dRiver);
  float mossAmt = (1.0 - wear) * smoothstep(0.5, 0.82, sn.a + nA.b * 0.3 - 0.12 + (nearWall + nearRiver) * 0.26);
  float face = smoothstep(0.3, 0.7, sd.g);
  vec3 pave = mix(mix(mix(cGrout, laneStone, 0.22), cMoss * 0.8, mossAmt * 0.5), mix(laneStone, cMoss * tone, mossAmt * 0.22), face);
  #if DETAIL >= 1
  // 缝内阴影：按高度压暗
  pave *= mix(0.78, 1.0, smoothstep(0.0, 0.35, sn.b));
  #else
  pave *= mix(0.62, 1.0, face) * (0.4 + 1.2 * sd.a);
  #endif
  albedo = mix(albedo, laneEarth, earth);
  float laneMask = 1.0 - smoothstep(-0.12, 0.1, dl);
  float stoneMask = laneMask * paved;

  // ── 基地地台：以水晶为圆心的同心环形铺装 + 发光轴线；塔座用队伍石色的石板 ──
  float team = step(0.0, wp.x - wp.y);
  float plazaMask = 1.0 - smoothstep(-0.12, 0.06, dBase);
  float padMask = (1.0 - smoothstep(-0.25, 0.25, dPad + (nB.g - 0.5) * 0.5)) * (1.0 - plazaMask);
  vec3 bStone = team > 0.5 ? cBaseStone[1] : cBaseStone[0];
  vec3 bTrim = team > 0.5 ? cBaseTrim[1] : cBaseTrim[0];
  vec3 bGlow = team > 0.5 ? cBaseGlow[1] : cBaseGlow[0];
  vec3 plaza = bStone;
  vec2 plazaTilt = vec2(0.0);
  if (dBase < 0.6) {
    int ti = team > 0.5 ? 1 : 0;
    vec2 q = wp - uBaseCore[ti];
    float r = length(q) + 1e-4;
    float ang = atan(q.y, q.x);
    // 环带：两宽一窄为一组(5.2 米一组)，窄环是深色的饰带
    float rr = r / 5.2;
    float ri = floor(rr);
    float rf = fract(rr) * 5.2;
    float band = rf < 2.15 ? 0.0 : (rf < 4.3 ? 1.0 : 2.0);
    float b0 = band < 0.5 ? 0.0 : (band < 1.5 ? 2.15 : 4.3);
    float bw = band > 1.5 ? 0.9 : 2.15;
    float rin = rf - b0;
    float ringId = ri * 3.0 + band;
    float rMid = ri * 5.2 + b0 + bw * 0.5;
    // 每环的石块数按周长取整，相邻环错缝
    float nSeg = max(6.0, floor(TAU * rMid / (band > 1.5 ? 1.15 : 2.4)));
    float af = ang / TAU * nSeg + ringId * 0.37;
    float segId = mod(floor(af), nSeg);
    float sf = fract(af);
    float dA = min(sf, 1.0 - sf) * (TAU * r / nSeg);
    float dR = min(rin, bw - rin);
    float e = min(dA, dR);
    float hs = hash12(vec2(segId, ringId) + team * 17.0);
    float joint = smoothstep(0.018, 0.04, e);
    plaza = bStone * (0.78 + 0.22 * hs) * (0.88 + 0.24 * nA.g) * (0.72 + 0.56 * sd.r) * (0.9 + 0.2 * dt.g);
    plaza *= band > 1.5 ? 0.74 : 1.0;
    // 饰带中线嵌一道细金线
    plaza = mix(plaza, bTrim, (1.0 - smoothstep(0.02, 0.045, abs(rin - 0.45))) * step(1.5, band) * 0.85);
    plaza *= mix(0.5, 1.0, joint);
    // 倒角：石面朝最近的接缝微微下倾
    vec2 rad = q / r;
    vec2 toJoint = dR < dA ? rad * (rin < bw * 0.5 ? -1.0 : 1.0) : vec2(-rad.y, rad.x) * (sf < 0.5 ? -1.0 : 1.0);
    plazaTilt = toJoint * (1.0 - smoothstep(0.02, 0.1, e)) * 0.42 + (hash22(vec2(segId, ringId)) - 0.5) * 0.09 * joint;
    // 通向三路入口与泉水的轴线嵌线(队伍色，发光)
    float axis = 0.0;
    float axisBand = 0.0;
    float axisEdge = 0.0;
    float flowK = 0.0;
    for (int i = 0; i < 4; i++) {
      vec2 d = uBaseAxis[ti * 4 + i];
      float along = dot(q, d);
      float perp = abs(q.x * d.y - q.y * d.x);
      float on = step(${n0(Sm * 0.94)}, along);
      float ln = (1.0 - smoothstep(0.045, 0.085, perp)) * on;
      axis = max(axis, ln);
      axisBand = max(axisBand, (1.0 - smoothstep(0.52, 0.56, perp)) * on);
      axisEdge = max(axisEdge, (1.0 - smoothstep(0.015, 0.035, abs(perp - 0.54))) * on);
      flowK = max(flowK, ln * (0.5 + 0.5 * sin(along * 0.9 - t * 1.8)));
    }
    // 轴线：一条略亮的整石带，两侧细缝，中线嵌发光条
    plaza = mix(plaza, bStone * 1.16 * (0.8 + 0.4 * sd.r), axisBand * 0.9);
    plaza *= 1.0 - 0.45 * axisEdge;
    plaza = mix(plaza, bGlow * 0.5, axis * 0.85);
    #if DETAIL >= 2
    emissive += bGlow * axis * (0.35 + 0.5 * flowK) * plazaMask;
    #else
    emissive += bGlow * axis * 0.55 * plazaMask;
    #endif
  }
  // 地台边缘：一圈深色的压边石 + 金线
  float rimB = smoothstep(-1.0, -0.85, dBase) * (1.0 - smoothstep(-0.12, 0.0, dBase));
  float rimLine = smoothstep(-0.62, -0.55, dBase) * (1.0 - smoothstep(-0.47, -0.4, dBase));
  plaza = mix(plaza, bStone * 0.7 * (0.55 + 0.9 * sd.r) * mix(0.6, 1.0, face), rimB);
  plaza = mix(plaza, bTrim, rimLine);
  // 门槛线：兵线进入基地处横一条队伍色发光嵌线，线外是指向外面的人字刻纹
  float inLane = 1.0 - smoothstep(-0.9, -0.4, dLane);
  float sill = (1.0 - smoothstep(0.05, 0.09, abs(dBase + 0.28))) * inLane;
  // (dLane + 半路宽 = 到兵线中心线的距离：人字的尖在路中央、朝外)
  float chevP = dBase + 0.45 * max(0.0, uLaneHalf - abs(dLane + uLaneHalf));
  float chev = (1.0 - smoothstep(0.05, 0.1, abs(fract(chevP / 0.85) - 0.5))) * smoothstep(0.25, 0.5, dBase) * (1.0 - smoothstep(2.2, 2.8, chevP)) * inLane;
  emissive += bGlow * sill * 0.75;

  albedo = mix(albedo, pave, stoneMask * (1.0 - plazaMask));
  albedo = mix(albedo, albedo * 0.72 + bTrim * 0.05, chev * (1.0 - plazaMask) * 0.8);
  // 塔座：石板换成偏队伍石色的铺装底(星纹由贴花叠在上面)
  albedo = mix(albedo, mix(pave, bStone * tone * mix(0.6, 1.0, face), 0.65), padMask * face);
  plaza = mix(plaza, bGlow * 0.5, sill);
  albedo = mix(albedo, plaza, plazaMask);

  // ── 落叶(路边 1.5 米带、野区通道、营地空地)──
  float open = (1.0 - plazaMask) * (1.0 - under) * (1.0 - padMask);
  #if DETAIL >= 1
  float leafZone = max(smoothstep(-1.9, -0.7, dLane) * (1.0 - smoothstep(0.3, 1.1, dLane)), (1.0 - smoothstep(1.0, 3.6, dSolid)) * step(0.05, dSolid) * 0.9);
  leafZone = max(leafZone, clearing * 0.6) * open;
  float leafDen = leafZone * smoothstep(0.3, 0.62, nB.r + nearWall * 0.15) * 0.75;
  vec4 lf = leafLayer(wp, 0.9, leafDen, 0.0);
  #if DETAIL >= 2
  vec4 lf2 = leafLayer(wp + 3.7, 0.63, leafDen * 0.8, 23.0);
  lf = mix(lf, lf2, lf2.a);
  #endif
  vec3 leafCol = cLeaf[0] * lf.x + cLeaf[1] * lf.y + cLeaf[2] * lf.z;
  #else
  vec4 lf = vec4(0.0);
  vec3 leafCol = vec3(0.0);
  #endif

  // ── 营地主题：只在营地附近进分支，循环找最近的营地取主题号 ──
  float pitGlow = 0.0;
  if (dCamp < 2.2) {
    float best = 1e9;
    vec3 camp = vec3(0.0);
    for (int i = 0; i < ${f3}; i++) {
      vec2 d = wp - uCamps[i].xy;
      float dd = dot(d, d);
      if (dd < best) {
        best = dd;
        camp = uCamps[i];
      }
    }
    vec2 cq = wp - camp.xy;
    float cr = sqrt(best);
    float m = 1.0 - smoothstep(-0.6, 1.8, dCamp + (nB.g - 0.5) * 1.6);
    float pulse = 0.72 + 0.28 * sin(t * 1.3 + camp.x);
    if (camp.z < 1.5) {
      // 霜晶洼地：石与土偏冷灰蓝，草尖泛白霜
      float fm = m * open;
      float frost = smoothstep(0.34, 0.62, nB.r * 0.55 + nA.g * 0.45 + (1.0 - cr / 5.5) * 0.28);
      vec3 ice = vec3(0.42, 0.56, 0.68) * (0.8 + 1.1 * gt.g);
      albedo = mix(albedo * vec3(0.78, 0.9, 1.04), ice, frost * 0.82 * fm);
      albedo += vec3(0.3, 0.38, 0.42) * smoothstep(0.85, 1.3, gdet.g) * fm * (1.0 - frost) * 0.6;
      #if DETAIL >= 1
      // 冰面上的白色裂纹
      float fc = texture2D(tNoise, wp * 0.21 + 0.71).g;
      albedo += vec3(0.4, 0.46, 0.5) * (1.0 - smoothstep(0.006, 0.022, abs(fc - 0.5))) * frost * fm * 0.5;
      #endif
    } else if (camp.z < 2.5) {
      // 余烬坑：焦黑的玄武地面 + 缓慢明灭的熔裂纹
      vec3 scorch = vec3(0.05, 0.043, 0.045) * (0.55 + 0.9 * dt.g);
      float sm = m * open;
      albedo = mix(albedo, scorch, sm * 0.88);
      #if DETAIL >= 1
      float cn = texture2D(tNoise, wp * 0.115 + 0.43).g;
      float crack = (1.0 - smoothstep(0.004, 0.022, abs(cn - 0.5))) * smoothstep(0.25, 0.9, sm);
      emissive += vec3(1.0, 0.36, 0.08) * crack * (0.28 + 0.42 * pulse) * (0.5 + 0.7 * nB.b);
      albedo = mix(albedo, vec3(0.5, 0.16, 0.04), crack * 0.6);
      #endif
    } else if (camp.z < 3.5) {
      // 树根巢穴：腐殖土 + 厚落叶
      albedo = mix(albedo, cHumus * dt * 0.9, m * 0.7 * open);
      #if DETAIL >= 1
      vec4 l3 = leafLayer(wp + 11.3, 0.5, m * 0.6 * open, 51.0);
      leafCol = mix(leafCol, cLeaf[0] * l3.x + cLeaf[1] * l3.y + cLeaf[2] * l3.z, l3.a);
      lf.a = max(lf.a, l3.a);
      #endif
    } else if (camp.z < 4.5) {
      // 灯花丛：一地花瓣碎屑
      #if DETAIL >= 1
      vec4 l3 = leafLayer(wp + 5.9, 0.42, m * 0.55 * open, 77.0);
      leafCol = mix(leafCol, mix(cPetal[0], cPetal[1], l3.x + l3.z) * (l3.x + l3.y + l3.z), l3.a);
      lf.a = max(lf.a, l3.a);
      #endif
    } else if (camp.z < 5.5) {
      // 沉渊潭：潭底加深，紫色发光水藻纹
      float pm = (1.0 - smoothstep(4.2, 6.4, cr)) * under;
      albedo *= mix(vec3(1.0), vec3(0.42, 0.4, 0.62), pm);
      #if DETAIL >= 1
      float an = texture2D(tNoise, wp * 0.083 + vec2(t * 0.004, 0.61)).g;
      float algae = (1.0 - smoothstep(0.008, 0.035, abs(an - 0.5))) * pm;
      emissive += vec3(0.56, 0.3, 1.0) * algae * (0.35 + 0.4 * pulse);
      #endif
      pitGlow = pm;
    } else {
      // 坠星潭：潭底放射状熔蚀纹 + 指向中心的金色嵌线(脉动向内收)
      float pm = (1.0 - smoothstep(4.2, 6.4, cr)) * under;
      float ca = atan(cq.y, cq.x);
      float ray = abs(fract(ca / TAU * 16.0 + 0.5 * step(0.5, fract(cr * 0.31))) - 0.5);
      float melt = smoothstep(0.5, 0.2, ray + (nB.r - 0.5) * 0.5);
      albedo *= mix(vec3(1.0), mix(vec3(0.5, 0.44, 0.4), vec3(0.78, 0.66, 0.5), melt), pm);
      #if DETAIL >= 1
      float ray2 = abs(fract(ca / TAU * 8.0) - 0.5);
      float line = (1.0 - smoothstep(0.012, 0.03, ray2 * cr * 0.785)) * smoothstep(1.2, 1.8, cr) * (1.0 - smoothstep(4.4, 5.0, cr));
      emissive += vec3(1.0, 0.72, 0.26) * line * pm * (0.3 + 0.5 * (0.5 + 0.5 * sin(cr * 1.6 + t * 1.5)));
      #endif
      pitGlow = pm;
    }
  }
  albedo = mix(albedo, leafCol, lf.a * 0.92);

  // ── 河床：沙与卵石，按水深被水体吸收(红先没、蓝留到最后)并叠一层散射色 ──
  float dr = dRiver + (nB.g - 0.5) * 0.7;
  float bedMask = 1.0 - smoothstep(-0.2, 0.45, dr);
  vec3 bed = mix(cSand, cGravel, smoothstep(0.08, 0.42, wdepth)) * (0.8 + 0.4 * nB.g) * (0.5 + 0.5 * dt);
  #if DETAIL >= 2
  // 河底卵石
  float pebble = smoothstep(0.3, 0.2, texture2D(tNoise, wp * 0.21).a);
  bed = mix(bed, bed * vec3(0.62, 0.66, 0.72), pebble * 0.6);
  #endif
  // 渡口：水下仍能看到石板
  float ford = stoneMask * 0.85 + plazaMask;
  albedo = mix(albedo, mix(bed, albedo, ford), bedMask * (1.0 - plazaMask));
  vec3 absorb = exp(-wdepth * vec3(6.2, 2.1, 1.25));
  // 浅水里的湿沙压暗一档、水体散射抬高一档：河道横截面的明度落差收小(岸边浅水不再比河心亮一大截，河心 L* 60~64)
  albedo *= 1.0 - 0.18 * under * (1.0 - smoothstep(0.12, 0.45, wdepth));
  albedo = albedo * absorb + cScatter * (0.54 * (1.0 - absorb.r)) * under;
  // 岸边湿土 + 紧贴水线的一道深色水渍
  float wet = (1.0 - smoothstep(0.1, 1.1, dr)) * (1.0 - under);
  albedo *= 1.0 - 0.34 * wet;
  albedo *= 1.0 - 0.3 * (1.0 - smoothstep(0.0, 0.07, abs(vWorldPos.y - uWaterLevel - 0.03)));

  // ── 水洼：近河的草地/土路上，压暗、拉平、映天光 ──
  float puddle = 0.0;
  #if DETAIL >= 1
  float pn = nA.r * 0.6 + nB.g * 0.4;
  // (河道距离场的量程只有 6 米：水洼带取离岸 1.2~5.2 米)
  float pzone = smoothstep(1.2, 2.2, dRiver) * (1.0 - smoothstep(4.4, 5.4, dRiver)) * (1.0 - stoneMask) * open * (1.0 - bushSoil) * smoothstep(0.3, 0.8, dSolid);
  puddle = smoothstep(0.6, 0.64, pn) * pzone;
  float puddleRim = smoothstep(0.56, 0.6, pn) * pzone;
  albedo *= 1.0 - 0.32 * puddleRim;
  albedo = mix(albedo, albedo * 0.5 + cScatter * 0.06, puddle);
  #endif

  // ── 法线：几何法线 → 石板/铺装的细节法线 ──
  vec3 Nw = normalize(vNormalW);
  #if DETAIL >= 1
  vec2 nxy = sn.rg * 2.0 - 1.0;
  float nMask = max(stoneMask * (1.0 - plazaMask), padMask) * (1.0 - puddle);
  Nw = normalize(mix(Nw, vec3(nxy.x, sqrt(max(0.05, 1.0 - dot(nxy, nxy))), nxy.y), nMask));
  Nw = normalize(Nw + vec3(plazaTilt.x, 0.0, plazaTilt.y) * plazaMask);
  #endif
  vec3 N = normalize((viewMatrix * vec4(Nw, 0.0)).xyz);
  vec3 L = kitSunDir();
  float ndl = max(dot(N, L), 0.0);

  // ── 主光阴影：有阴影贴图用阴影贴图，没有(低画质)就用烘在 splat 里的静态受光蒙版 ──
  #ifdef USE_SHADOWMAP
  float shadow = kitShadow();
  #else
  float shadow = mix(1.0, sb.b, 0.92);
  #endif
  float sunK = 1.0;
  #if DETAIL >= 1
  // 缓慢飘过的云影：让大片地面有明暗流动
  shadow *= 1.0 - 0.14 * smoothstep(0.48, 0.7, texture2D(tNoise, wp * 0.0061 + vec2(t * 0.004, -t * 0.0025)).r);
  // 树下的叶影斑驳：离墙近的地方，太阳光被一层缓慢漂移的碎影打花
  float canopy = (1.0 - smoothstep(1.2, 4.5, dSolid)) * (1.0 - plazaMask);
  float dap = smoothstep(0.36, 0.62, texture2D(tNoise, wp * 0.163 + vec2(t * 0.007, t * 0.004)).b);
  sunK *= mix(1.0, 0.7 + 0.3 * dap, canopy * 0.8);
  #endif
  #if WATER >= 1
  // 焦散：两个尺度反向滚动取交叠，只在受光的浅水里
  vec3 caustic = vec3(0.0);
  if (under > 0.001) {
    vec2 cuv = wp * 0.155;
    float c1 = texture2D(tCaust, cuv + uFlow * t * 0.018 + vec2(t * 0.011, -t * 0.007)).r;
    #if WATER >= 2
    float c2 = texture2D(tCaust, cuv * 0.71 - vec2(t * 0.013, t * 0.009) + 0.31).g;
    float caust = (c1 + c2) * 0.42 + min(c1, c2) * 1.5;
    #else
    float caust = c1 * 0.8;
    #endif
    // (渡口是兵线必经之处：焦散收掉一半，免得单位脚下一片碎光)
    float cdep = smoothstep(0.03, 0.14, wdepth) * (1.0 - 0.45 * smoothstep(0.26, 0.4, wdepth)) * (1.0 - 0.6 * pitGlow) * (1.0 - 0.5 * stoneMask);
    caustic = cCaustic * caust * cdep * under;
  }
  #else
  vec3 caustic = vec3(0.0);
  #endif

  // 墙脚/草丛根部的接触阴影
  float ao = mix(0.5, 1.0, smoothstep(-0.1, 1.5, dSolid)) * mix(0.8, 1.0, smoothstep(-0.4, 0.5, dBush));
  float contact = mix(0.7, 1.0, smoothstep(0.0, 0.7, dSolid));
  float lit = shadow * contact;
  vec3 amb = kitTintAmbient(kitAmbient(N) * ao, kitLightTint(wp0));
  vec3 sun = kitSunColor();
  vec3 irradiance = amb + sun * (ndl * lit * sunK) * (1.0 + caustic * 1.15) + kitPointLights(N, -vViewPosition);
  vec3 col = albedo * RECIPROCAL_PI * irradiance;
  // 暗部偏冷(只偏色不压暗)
  col *= mix(uShadeTintGround * 0.9, vec3(1.0), lit);
  #if DETAIL >= 1
  // 水洼的天光反射与(高画质)太阳碎闪
  col = mix(col, cSkyRefl * (0.45 + 0.55 * lit), puddle * 0.34);
  #if DETAIL >= 2
  float gl = smoothstep(0.86, 0.95, texture2D(tNoise, wp * 0.9 + vec2(t * 0.02, -t * 0.013)).b);
  col += sun * RECIPROCAL_PI * gl * puddle * lit * 0.5;
  #endif
  #endif
  #if WATER >= 2
  // 水底星屑：稀疏成簇的发光碎晶，缓慢闪烁
  if (under > 0.001) {
    vec4 sp4 = texture2D(tNoise, wp * 0.094 + 0.63);
    float cluster = smoothstep(0.62, 0.76, nA.b * 0.6 + nB.r * 0.5);
    float spark = smoothstep(0.07, 0.02, sp4.a) * cluster;
    emissive += cStar * spark * (0.55 + 0.45 * sin(t * 1.7 + sp4.g * 40.0 + wp.x)) * 0.9 * under;
  }
  #endif
  col += emissive;
  gl_FragColor = vec4(col, 1.0);
  ${aa}
}
`;

function HF(n) {
  const t = n.map.bound,
    e = 4,
    s = -Math.ceil((t + 1.2) / e) * e,
    i = -s,
    a = 4,
    o = [],
    r = [],
    l = new Map(),
    c = (m, x) => Math.round((m - s) * 8) * 8192 + Math.round((x - s) * 8),
    f = t + 0.3,
    d = (m, x) => {
      const p = Math.max(-f, Math.min(f, m)),
        g = Math.max(-f, Math.min(f, x)),
        y = c(p, g);
      let v = l.get(y);
      return (v === void 0 && ((v = o.length / 3), o.push(p, n.heightAt(p, g), g), l.set(y, v)), v);
    },
    h = (m, x, p) => {
      const g = d(m, x),
        y = d(m + p, x),
        v = d(m + p, x + p),
        _ = d(m, x + p);
      r.push(g, _, v, g, v, y);
    };
  for (let m = s; m < i; m += e)
    for (let x = s; x < i; x += e)
      if (!(n.riverDist(x + e / 2, m + e / 2) < e * 0.75 + 0.6)) h(x, m, e);
      else for (let g = 0; g < a; g++) for (let y = 0; y < a; y++) h(x + (y * e) / a, m + (g * e) / a, e / a);
  const u = new Bn();
  return (
    u.setAttribute("position", new Ae(o, 3)),
    u.setIndex(r),
    u.computeVertexNormals(),
    u.computeBoundingSphere(),
    u.computeBoundingBox(),
    u
  );
}

function $F(n, t) {
  const e = [];
  for (const s of Object.values(n.lanes)) {
    let i = null;
    for (let a = 1; a < s.length && !i; a++) {
      const o = s[a - 1],
        r = s[a],
        l = Math.hypot(r.x - o.x, r.y - o.y);
      let c = yo(o, t.area);
      for (let f = 0.25; f <= l; f += 0.25) {
        const d = { x: o.x + ((r.x - o.x) * f) / l, y: o.y + ((r.y - o.y) * f) / l },
          h = yo(d, t.area);
        if (h !== c) {
          i = d;
          break;
        }
        c = h;
      }
    }
    i && e.push(i);
  }
  return e;
}

function S8(n) {
  const t = n.riverLine,
    e = t[0],
    s = t[t.length - 1];
  return new Ee(s.x - e.x, s.y - e.y).normalize();
}

const W_ = (n) => n.waterDetail;

function* T8(n) {
  const t = Math.min(8, n),
    e = Math.hypot(as.x, as.z) || 1,
    s = DF(1024);
  yield;
  const i = zF(512, as.x / e, as.z / e);
  yield;
  const a = FF(as, 512, t);
  yield;
  const o = UF(256);
  for (const r of [s, i]) r.anisotropy = t;
  return { grass: s, dirt: i, stone: a, caust: o };
}

function GF(n, t, e, s, i, a) {
  let o = a;
  if (!o) {
    const v = T8(i);
    for (;;) {
      const _ = v.next();
      if (_.done) {
        o = _.value;
        break;
      }
    }
  }
  const { grass: r, dirt: l, stone: c, caust: f } = o,
    d = Yt.env,
    h = n.map,
    u = (v, _ = 1) => new Ut(v).multiplyScalar(_),
    m = h.bases.map((v) => new Ee(v.core.x, v.core.y)),
    x = [];
  for (const v of h.bases) {
    const _ = [...$F(h, v), v.fountain];
    for (let k = 0; k < 4; k++) {
      const M = _[k] ?? v.fountain;
      x.push(new Ee(M.x - v.core.x, M.y - v.core.y).normalize());
    }
  }
  const p = [];
  for (let v = 0; v < f3; v++) {
    const _ = h.camps[v];
    p.push(_ ? new dt(_.pos.x, _.pos.y, Cx[_.monsterType]) : new dt(9999, 9999, 0));
  }
  const g = new An({
      uniforms: Ff({
        tSplatA: { value: t.a },
        tSplatB: { value: t.b },
        tNoise: { value: e },
        tGrass: { value: r },
        tStone: { value: c.data },
        tStoneN: { value: c.normal },
        tDirt: { value: l },
        tCaust: { value: f },
        uTime: fs.uTime,
        uSplatScale: { value: 1 / (mn * 2) },
        uWaterLevel: { value: Fn },
        uFlow: { value: S8(n) },
        uLaneGain: { value: 1.04 },
        uLaneHalf: { value: h.laneWidth / 2 },
        cGrass: { value: u(d.grass) },
        cGrassWarm: { value: u(d.grassWarm) },
        cGrassCool: { value: u(d.grassCool) },
        cGrassDark: { value: u(d.grassDark) },
        cLane: { value: u(d.lane) },
        cLaneAlt: { value: u(d.laneAlt) },
        cLaneEarth: { value: u(d.laneDark) },
        cGrout: { value: u(d.laneGrout) },
        cMoss: { value: u(d.moss) },
        cDirt: { value: u(d.dirt) },
        cHumus: { value: u(d.dirtDark) },
        cSand: { value: u(d.sand) },
        cGravel: { value: u(9274994) },
        cScatter: { value: u(d.water).lerp(u(6265512), 0.35) },
        cCaustic: { value: u(d.caustic) },
        cSkyRefl: { value: u(12375794) },
        cStar: { value: u(10481919) },
        cLeaf: { value: [u(13208116), u(9145918), u(10704174)] },
        cPetal: { value: [u(d.petalPink), u(d.petalWhite)] },
        cBaseStone: { value: [u(Yt.blue.plaza), u(Yt.red.plaza)] },
        cBaseTrim: { value: [u(Yt.blue.trim), u(Yt.red.trim)] },
        cBaseGlow: { value: [u(Yt.blue.glow), u(Yt.red.glow)] },
        uBaseCore: { value: m },
        uBaseAxis: { value: x },
        uCamps: { value: p },
      }),
      defines: { DETAIL: s.groundDetail, WATER: W_(s) },
      vertexShader: OF,
      fragmentShader: BF,
      lights: !0,
      fog: !0,
    }),
    y = new Sn(HF(n), g);
  return (
    (y.name = "ground"),
    (y.receiveShadow = !0),
    (y.castShadow = !1),
    (y.frustumCulled = !1),
    {
      mesh: y,
      material: g,
      grassTexture: r,
      setQuality(v) {
        const _ = W_(v);
        (g.defines.DETAIL !== v.groundDetail || g.defines.WATER !== _) &&
          ((g.defines.DETAIL = v.groundDetail), (g.defines.WATER = _), (g.needsUpdate = !0));
      },
    }
  );
}

const VF = `
uniform float uTime;
uniform float uScale;
attribute vec4 aSeed;
attribute vec3 aColor;
attribute vec3 aMotion;
varying vec3 vColor;
varying float vAlpha;
void main() {
  // aSeed: 相位, 速度, 尺寸, 模式；aMotion: 水平幅度, 垂直范围, 闪烁频率
  float ph = aSeed.x * 6.2831853;
  float t = uTime * aSeed.y;
  vec3 p = position;
  float fade = 1.0;
  if (aSeed.w > 0.5) {
    float k = fract(t * 0.12 + aSeed.x);
    p.y += k * aMotion.y;
    p.x += sin(t * 0.7 + ph) * aMotion.x * (0.3 + k);
    p.z += cos(t * 0.6 + ph * 1.7) * aMotion.x * (0.3 + k);
    fade = smoothstep(0.0, 0.15, k) * (1.0 - smoothstep(0.6, 1.0, k));
  } else {
    p.x += sin(t * 0.31 + ph) * aMotion.x + sin(t * 0.83 + ph * 2.3) * aMotion.x * 0.4;
    p.z += cos(t * 0.27 + ph * 1.3) * aMotion.x + cos(t * 0.71 + ph * 0.7) * aMotion.x * 0.4;
    p.y += sin(t * 0.43 + ph * 2.1) * aMotion.y;
  }
  float tw = 0.55 + 0.45 * sin(uTime * aMotion.z + ph * 3.0);
  vAlpha = fade * tw;
  vColor = aColor;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = aSeed.z * uScale / max(1.0, -mv.z);
}
`,
  WF = `
#include <common>
#include <fog_pars_fragment>
${zf}
varying vec3 vColor;
varying float vAlpha;
void main() {
  vec2 d = gl_PointCoord - 0.5;
  float r = length(d) * 2.0;
  if (r > 1.0) discard;
  // 亮核 + 柔和光晕
  float a = (1.0 - r);
  a = a * a * 0.6 + smoothstep(0.35, 0.0, r) * 0.9;
  gl_FragColor = vec4(kitAdditive(vColor * a * vAlpha * 1.6), 1.0);
  ${aa}
}
`;

function jF(n, t) {
  const e = new ke(2718),
    s = [];
  for (const u of n)
    for (let m = 0; m < u.count; m++) {
      const x = e.range(0, Math.PI * 2),
        p = Math.sqrt(e.next()) * u.radius,
        g = (u.size ?? 1) * e.range(0.7, 1.3);
      s.push({
        p: [u.x + Math.cos(x) * p, u.y + (u.mode === 0 ? e.range(0, u.range) : 0), u.z + Math.sin(x) * p],
        seed: [e.next(), e.range(0.7, 1.3), g, u.mode],
        color: [
          u.color[0] * e.range(0.8, 1.2),
          u.color[1] * e.range(0.8, 1.2),
          u.color[2] * e.range(0.8, 1.2),
        ],
        motion:
          u.mode === 1
            ? [e.range(0.1, 0.35), u.range * e.range(0.7, 1.2), e.range(1.5, 4)]
            : [e.range(0.25, 0.7), e.range(0.12, 0.35), e.range(1.2, 3.5)],
      });
    }
  for (let u = s.length - 1; u > 0; u--) {
    const m = e.int(u + 1),
      x = s[u];
    ((s[u] = s[m]), (s[m] = x));
  }
  const i = s.length,
    a = new Float32Array(i * 3),
    o = new Float32Array(i * 4),
    r = new Float32Array(i * 3),
    l = new Float32Array(i * 3);
  s.forEach((u, m) => {
    (a.set(u.p, m * 3), o.set(u.seed, m * 4), r.set(u.color, m * 3), l.set(u.motion, m * 3));
  });
  const c = new Bn();
  (c.setAttribute("position", new On(a, 3)),
    c.setAttribute("aSeed", new On(o, 4)),
    c.setAttribute("aColor", new On(r, 3)),
    c.setAttribute("aMotion", new On(l, 3)));
  const f = new An({
      uniforms: { uTime: fs.uTime, uScale: { value: 300 } },
      vertexShader: VF,
      fragmentShader: WF,
      transparent: !0,
      depthWrite: !1,
      blending: h5,
    }),
    d = new K7(c, f);
  ((d.name = "motes"), (d.frustumCulled = !1), (d.renderOrder = 6));
  const h = (u) => c.setDrawRange(0, Math.floor(i * Math.min(1, u.motes)));
  return (
    h(t),
    {
      points: d,
      setQuality: h,
      resize(u, m) {
        f.uniforms.uScale.value = ((u * 0.5) / Math.tan((m * Math.PI) / 360)) * 0.16;
      },
    }
  );
}

const bf = Math.PI * 2,
  qF = Yt.env,
  xs = yt(11775136),
  Oo = yt(8223356),
  ef = yt(13023644),
  x3 = yt(qF.amber),
  _f = yt(14264650),
  Wc = new Ke();

function j_(n, t, e, s, i, a, o, r, l, c = 0) {
  (Wc.makeTranslation(t, e - a / 2 + 0.04, s), yf(n, Wc, i, o, a, 0, r, l, c));
}

function XF() {
  const n = new Be();
  (gn(
    n,
    [
      [0, -0.1, 0, 0.36],
      [0, 0.1, 0, 0.36],
      [0, 0.14, 0, 0.3],
      [0, 0.24, 0, 0.3],
      [0, 0.28, 0, 0.2],
    ],
    { sides: 8, c0: Oo, c1: xs },
  ),
    gn(
      n,
      [
        [0, 0.28, 0, 0.15],
        [0, 0.82, 0, 0.11],
        [0, 0.86, 0, 0.17],
        [0, 0.93, 0, 0.19],
      ],
      { sides: 8, c0: Pt(Oo, xs, 0.5), c1: xs, cap: !0 },
    ));
  for (let t = 0; t < 4; t++) {
    const e = (t / 4) * bf + Math.PI / 4,
      s = Math.cos(e) * 0.16,
      i = Math.sin(e) * 0.16;
    gn(
      n,
      [
        [s, 0.93, i, 0.03],
        [s, 1.2, i, 0.03],
      ],
      { sides: 4, c0: Oo, c1: xs },
    );
  }
  return (
    Xo(n, 0, 0.95, 0, 0.26, 0.085, 0, 0, Ht(x3, 0.85), [1, 0.86, 0.55], 1, 7),
    gn(
      n,
      [
        [0, 1.19, 0, 0.27],
        [0, 1.23, 0, 0.29],
        [0, 1.3, 0, 0.17],
        [0, 1.44, 0, 0.045],
        [0, 1.52, 0, 0.03],
      ],
      { sides: 8, c0: Oo, c1: Pt(xs, ef, 0.5), cap: !0 },
    ),
    Ts(n, 0, 1.55, 0, 0.045, 0.045, 0.045, { detail: 0, seed: 3, bottom: _f, top: Ht(_f, 1.2), glow: 0.2 }),
    n.build()
  );
}

function E8(n, t, e, s, i, a, o, r) {
  const l = [0.62, 0.9, 0.95],
    c = (d, h) => {
      for (let u = 0; u < d.length - 1; u++) {
        const [m, x] = d[u],
          [p, g] = d[u + 1],
          y = p - m,
          v = g - x,
          _ = Math.hypot(y, v) || 1,
          k = (-v / _) * h,
          M = (y / _) * h,
          b = [
            t(m - k, x - M, 0.012),
            t(m + k, x + M, 0.012),
            t(p + k, g + M, 0.012),
            t(p - k, g - M, 0.012),
          ].map((w) => n.vertex(w[0], w[1], w[2], l, e, s, i, 0, o, 0, 1));
        (n.quad(b[0], b[1], b[2], b[3]), n.quad(b[3], b[2], b[1], b[0]));
      }
    };
  for (let d = 0; d < 3; d++) {
    const h = a * (0.42 + d * 0.22),
      u = 0.5 + nn(d, r, 5) * 0.8,
      m = 1.5 + nn(d, r, 9) * 1.2,
      x = [];
    for (let p = 0; p <= 6; p++) {
      const g = u + (m * p) / 6;
      x.push([Math.cos(g) * h, Math.sin(g) * h]);
    }
    c(x, a * 0.022);
  }
  const f = [];
  for (let d = 0; d <= 16; d++) {
    const h = (d / 16) * bf,
      u = a * (d % 2 === 0 ? 0.2 : 0.09);
    f.push([Math.cos(h) * u, Math.sin(h) * u]);
  }
  c(f, a * 0.02);
}

function q_(n) {
  const t = new ke(n),
    e = new Be(),
    s = 1.1,
    i = 0.2,
    a = t.range(1.35, 1.6),
    o = t.range(0.2, 0.45) * (t.chance(0.5) ? 1 : -1),
    r = (g, y, v) => [g, y, v],
    l = -0.15,
    c = s / 2,
    f = c * 0.9,
    d = i / 2,
    h = a - Math.max(0, o),
    u = a + Math.min(0, o),
    m = [
      r(-d, l, -c),
      r(d, l, -c),
      r(d, l, c),
      r(-d, l, c),
      r(-d * 0.85, h, -f),
      r(d * 0.85, h, -f),
      r(d * 0.85, u, f),
      r(-d * 0.85, u, f),
    ],
    x = (g, y, v, _, k, M) => {
      const S = m[g],
        b = m[y],
        w = m[v],
        T = b[0] - S[0],
        E = b[1] - S[1],
        A = b[2] - S[2],
        C = w[0] - S[0],
        R = w[1] - S[1],
        I = w[2] - S[2];
      let P = E * I - A * R,
        F = A * C - T * I,
        L = T * R - E * C;
      const B = Math.hypot(P, F, L) || 1;
      ((P /= B), (F /= B), (L /= B));
      const G = [g, y, v, _].map((q, et) =>
        e.vertex(m[q][0], m[q][1], m[q][2], et < 2 ? k : M, P, F, L, 0, 0, 0, et < 2 ? 0.75 : 1),
      );
      e.quad(G[0], G[1], G[2], G[3]);
    },
    p = Pt(Oo, xs, 0.35);
  return (
    x(1, 2, 6, 5, p, xs),
    x(3, 0, 4, 7, p, Ht(xs, 0.9)),
    x(0, 1, 5, 4, p, xs),
    x(2, 3, 7, 6, p, xs),
    x(4, 5, 6, 7, ef, ef),
    E8(e, (g, y, v) => [d * 0.93 + v, 0.2 + (a - 0.35) * 0.52 + y, g], 1, 0, 0, 0.42, 0.4, n),
    Ts(e, 0, 0.02, 0.1, 0.34, 0.14, 0.62, { detail: 0, bump: 0.2, seed: n, bottom: Oo, top: xs, flat: !0 }),
    e.build()
  );
}

function X_(n) {
  const t = new ke(n),
    e = new Be(),
    s = t.range(1.1, 1.5);
  return (
    Wc.makeRotationZ(t.range(0.03, 0.09)).setPosition(0, 0.02, 0),
    yf(e, Wc, s, 0.95, 0.16, 0.03, xs, Pt(Oo, xs, 0.4)),
    E8(e, (i, a, o) => [i, 0.185 + o + i * 0.05, a], 0, 1, 0, 0.36, 0.3, n),
    Wc.makeRotationY(t.range(0.3, 0.9)).setPosition(s * 0.5 + 0.32, 0, t.range(-0.2, 0.2)),
    yf(e, Wc, 0.42, 0.5, 0.13, 0.03, Ht(xs, 0.94), Oo),
    e.build()
  );
}

function YF() {
  const n = new Be(),
    t = yt(5915446);
  (gn(
    n,
    [
      [0, -0.1, 0, 0.055],
      [0, 2.6, 0, 0.04],
    ],
    { sides: 5, c0: Ht(t, 0.7), c1: t },
  ),
    Ts(n, 0, 2.66, 0, 0.07, 0.09, 0.07, { detail: 0, seed: 5, bottom: _f, top: Ht(_f, 1.25), glow: 0.15 }));
  const e = 3,
    s = 2.52,
    i = 0.72,
    a = 1.05;
  let o = null;
  for (let r = 0; r <= e; r++) {
    const l = r / e,
      c = (i / 2) * (1 - l),
      f = 0.04 + l * a,
      d = 0.86 + 0.14 * (1 - l),
      h = n.vertex(0, s - i / 2 + c, f, [d, d, d], 1, 0.1, 0, l * l * 1.1, 0, 1, 1),
      u = n.vertex(0, s - i / 2 - c, f, [d * 0.9, d * 0.9, d * 0.9], 1, 0.1, 0, l * l * 1.1, 0, 1, 1);
    (o && (n.quad(o[0], o[1], u, h), n.quad(h, u, o[1], o[0])), (o = [h, u]));
  }
  return n.build();
}

function Y_(n) {
  const t = new ke(n),
    e = new Be(),
    s = t.range(0.36, 0.44);
  return (
    gn(
      e,
      [
        [0, -0.08, 0, 0.17],
        [0, s * 0.5, 0, 0.14],
        [0, s * 0.56, 0, 0.115],
        [0, s * 0.66, 0, 0.115],
        [0, s * 0.72, 0, 0.15],
        [0, s, 0, 0.13],
      ],
      { sides: 6, c0: Oo, c1: xs, cap: !0 },
    ),
    e.build()
  );
}
export { SF, TF, vf, PF, S8, T8, GF, jF, bf, xs, Oo, ef, x3, _f, j_, XF, q_, X_, YF, Y_ };
