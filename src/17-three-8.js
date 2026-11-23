// 17-three-8.js — three｜31 个顶层语句｜66KB
// 对应 game.pretty.js 第 31758–33801 行
// 关键内容：
//   Ea                    角星的有符号距离(Inigo Quilez)：m ∈
//   qe                    非均匀缩放下的法线：按各轴缩放平方修正
//   OI                    position
//   BI                    attribute.
//   Ll                    position
//   jI                    position
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { Pi, fi, ph } from './04-audio-2.js';
import { Ri, dt } from './05-three.js';
import { Ke, Ut, sa } from './06-three-2.js';
import { Ae, An, Bn, Ji, No, On, Qs, Sn, kM } from './07-three-3.js';
import { Cf, ix, mm, rx, sx, uf, xm } from './08-three-4.js';
import { Yt, ke, nn } from './14-three-7.js';
import { Qc, Vl, zf } from './15-render-4.js';
import { Bh, gx } from './16-render-5.js';

const Ea = 192,
  mr = 20,
  zI = 1e9,
  Xt = {
    ring: 0,
    glow: 1,
    cone: 2,
    cracks: 3,
    rune: 4,
    telegraph: 5,
    rect: 6,
    range: 7,
    lock: 8,
    swirl: 9,
    scorch: 10,
    star: 11,
    streak: 12,
    pointer: 13,
    zone: 14,
    sigil: 15,
    coneWarn: 16,
    ink: 17,
    scroll: 18,
    rings: 19,
    shieldMark: 20,
    moon: 21,
  },
  bb = { low: 0.6, medium: 0.9, high: 1 },
  NI = `
uniform float uNow;
uniform float uXray;
attribute vec4 aA;
attribute vec4 aB;
attribute vec4 aT;
attribute vec4 aC0;
attribute vec4 aC1;
varying vec2 vP;
varying vec4 vT;
varying vec4 vC0;
varying vec4 vC1;
varying vec4 vW;
varying vec2 vS;
void main() {
  float age = uNow - aT.x;
  float persist = step(1e8, aT.y);
  float t = persist > 0.5 ? 0.0 : age / aT.y;
  if (age < 0.0 || t >= 1.0 || aA.w <= 0.0 || aC0.a <= 0.0 || (uXray > 0.5 && aB.w < 0.5)) {
    gl_Position = vec4(0.0, 0.0, 2.0, 1.0);
    return;
  }
  vec2 q = position.xz;
  float c = cos(aB.x);
  float s = sin(aB.x);
  vec2 l = vec2(q.x, q.y * aB.y) * aA.w;
  vec3 wp = vec3(aA.x + l.x * c - l.y * s, aA.y, aA.z + l.x * s + l.y * c);
  vP = q;
  vT = vec4(t, aB.z, aT.z, aT.w);
  vC0 = aC0;
  vC1 = aC1;
  vW = vec4(wp.xz, aA.w, aA.w * aB.y);
  vS = vec2(fract(aT.x * 17.31 + aA.x * 0.371 + aA.z * 0.113), persist);
  gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.0);
}
`,
  FI = `
uniform float uNow;
uniform float uAlpha;
uniform float uFill;
uniform float uXray;
varying vec2 vP;
varying vec4 vT;
varying vec4 vC0;
varying vec4 vC1;
varying vec4 vW;
varying vec2 vS;
${Vl}
${zf}
const float TAU = 6.2831853;
const float PI = 3.14159265;

float band(float x, float w, float aa) {
  return 1.0 - smoothstep(w - aa, w + aa, abs(x));
}
vec2 rot2(vec2 p, float a) {
  float c = cos(a);
  float s = sin(a);
  return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
}
// n 角星的有符号距离(Inigo Quilez)：m ∈ [2, n]，越小角越尖
float sdStar(vec2 p, float r, float n, float m) {
  float an = PI / n;
  float en = PI / m;
  vec2 acs = vec2(cos(an), sin(an));
  vec2 ecs = vec2(cos(en), sin(en));
  float bn = mod(atan(p.x, p.y), 2.0 * an) - an;
  p = length(p) * vec2(cos(bn), abs(sin(bn)));
  p -= r * acs;
  p += ecs * clamp(-dot(p, ecs), 0.0, r * acs.y / ecs.y);
  return length(p) * sign(p.x);
}
// Voronoi：返回 (到最近特征点的距离, F2 - F1)。后者在细胞边界处为 0，用来画龟裂
vec2 voronoi(vec2 p) {
  vec2 n = floor(p);
  vec2 f = fract(p);
  float f1 = 8.0;
  float f2 = 8.0;
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 g = vec2(float(i), float(j));
      vec2 rr = g + hash22(n + g) - f;
      float d = dot(rr, rr);
      if (d < f1) {
        f2 = f1;
        f1 = d;
      } else if (d < f2) {
        f2 = d;
      }
    }
  }
  f1 = sqrt(f1);
  return vec2(f1, sqrt(f2) - f1);
}
// 一圈符文：圆环切成 n 格，每格用哈希画几道短划
float runes(float r, float a, float r0, float w, float n, float seed) {
  float fr = (r - r0) / w;
  if (abs(fr) > 1.0) return 0.0;
  float cell = floor(a / TAU * n);
  float fa = fract(a / TAU * n) - 0.5;
  float h = hash12(vec2(cell, seed));
  float h2 = hash12(vec2(cell + 31.0, seed));
  float g = (1.0 - smoothstep(0.07, 0.13, abs(fa - (h - 0.5) * 0.4))) * step(abs(fr), 0.8);
  g = max(g, (1.0 - smoothstep(0.1, 0.2, abs(fr - (h2 - 0.5) * 1.2))) * step(abs(fa), 0.3) * step(0.35, h));
  g = max(g, (1.0 - smoothstep(0.1, 0.2, abs(fr + (h - 0.5)))) * step(abs(fa + 0.1), 0.22) * step(0.5, h2));
  return g * step(abs(fa), 0.4);
}

void main() {
  float t = vT.x;
  float type = vT.y;
  float p0 = vT.z;
  float p1 = vT.w;
  float persist = vS.y;
  float seed = vS.x;
  vec2 p = vP;
  vec2 wp = vW.xy;
  float r = length(p);
  float ang = atan(p.y, p.x);
  float aa = fwidth(r) * 1.2 + 1e-4;
  float now = uNow;
  // 四个输出量：
  //   fil = A 色「色块」的覆盖率(普通混合：先盖住地面再显色，亮地面上颜色才饱和)
  //   e   = A 色发光线条(叠加，可溢出 bloom)，hot = 线条里的白热部分
  //   cov = B 色深色底衬的覆盖率(线条两侧的暗晕、焦痕)
  float fil = 0.0;
  float e = 0.0;
  float hot = 0.0;
  float cov = 0.0;
  float disc = 1.0 - smoothstep(1.0 - aa * 2.0, 1.0, r);

  if (type < 0.5) {
    // ── 冲击环 ──
    float k = 1.0 - (1.0 - t) * (1.0 - t) * (1.0 - t);
    float rr = mix(p0, p1, k);
    float dir = p1 >= p0 ? 1.0 : -1.0;
    float d = (r - rr) * dir;
    float w = mix(0.26, 0.1, t);
    float front = 1.0 - smoothstep(-aa, aa, d);
    float trail = smoothstep(-w, 0.0, d);
    float body = front * trail * trail;
    float rim = band(d + 0.014, 0.014, aa);
    float halo = band(d + 0.014, 0.07, 0.035);
    float fade = 1.0 - smoothstep(0.3, 1.0, t);
    fil = body * 0.55 * fade;
    e = rim * 1.4 * fade;
    hot = rim * 0.4 * fade;
    cov = halo * 0.85 * fade;
  } else if (type < 1.5) {
    // ── 柔光斑 ──
    float g = pow(max(0.0, 1.0 - r), max(p0, 0.5));
    float f = persist > 0.5 ? 1.0 : smoothstep(0.0, 0.08, t) * (1.0 - t) * (1.0 - t);
    fil = g * f * 0.5;
    cov = g * f;
  } else if (type < 2.5) {
    // ── 扇形 ──
    float da = (abs(ang) - p0) * max(r, 0.05);
    float inside = (1.0 - smoothstep(-aa, aa, da)) * disc;
    if (p1 < 0.5) {
      // 刀气从顶点扫向外缘，随后由噪声从内向外烧尽
      float front = min(1.0, t * 3.4);
      float swept = 1.0 - smoothstep(front - 0.03, front + 0.02, r);
      float lead = band(r - front + 0.03, 0.05, 0.03) * (1.0 - smoothstep(0.3, 0.45, t));
      float n = fbm(wp * 1.25 + vec2(seed * 7.0, -now * 0.5));
      float burn = smoothstep(t * 1.3 - 0.2, t * 1.3 + 0.25, n * 0.8 + r * 0.45);
      float fill = (0.3 + 0.7 * r * r) * swept * burn * (1.0 - p1 * 2.0);
      float edge = max(band(da + 0.012, 0.014, aa), band(r - 0.975, 0.02, aa)) * swept;
      float fade = 1.0 - smoothstep(0.6, 1.0, t);
      fil = fill * 0.5 * inside * fade;
      e = (lead * 1.4 + edge * 1.3 * (0.35 + 0.65 * burn) + fill * 0.25) * inside * fade;
      hot = (lead * 0.6 + edge * 0.25 * burn) * inside * fade;
      cov = (edge * 0.7 + swept * 0.35) * inside * fade;
    } else {
      float edge = max(band(da + 0.012, 0.012, aa), band(r - 0.98, 0.016, aa));
      float flow = band(fract(r * 3.0 - now * 0.9) - 0.5, 0.05, 0.05) * 0.5 * smoothstep(0.15, 0.45, r);
      float apex = smoothstep(0.03, 0.22, r);
      fil = (0.2 + 0.3 * r * r) * inside * apex;
      e = (edge * 1.25 + flow) * inside * apex;
      hot = edge * 0.15 * inside * apex;
      cov = (0.25 + edge * 0.5) * inside * apex;
    }
  } else if (type < 3.5) {
    // ── 地裂：龟裂的碎块(Voronoi 边) + 几条放射的锯齿主裂缝，由中心向外迅速蔓延，结束时噪声溶解 ──
    float grow = min(1.0, t * 6.0 + 0.12);
    vec2 q = wp * 0.8 + seed * 13.0;
    q += (vec2(vnoise(wp * 1.7 + seed * 3.0), vnoise(wp * 1.7 + seed * 3.0 + 9.1)) - 0.5) * 0.45;
    vec2 vo = voronoi(q);
    float n1 = vnoise(wp * 2.1 + seed * 5.0);
    float n2 = vnoise(wp * 2.1 + seed * 5.0 + vec2(5.2, 1.3));
    // 中心粗、外缘细；越往外碎块越稀
    float w = mix(0.1, 0.02, smoothstep(0.0, 0.9, r));
    float sparse = 1.0 - smoothstep(0.45, 1.0, r + (n1 - 0.5) * 0.5);
    float lineA = (1.0 - smoothstep(w * 0.4, w, vo.y)) * sparse;
    float wideA = (1.0 - smoothstep(w, w * 2.8, vo.y)) * sparse;
    float kk = 2.0 + floor(seed * 2.99);
    float jag = (vnoise(vec2(r * 8.0, seed * 7.0)) - 0.5) * 0.55 + (vnoise(vec2(r * 21.0, seed * 3.0)) - 0.5) * 0.22;
    float sp = abs(sin((ang + jag + seed * 6.0) * kk));
    float hw = mix(0.04, 0.007, r) * kk / max(r, 0.06);
    float lineB = 1.0 - smoothstep(hw * 0.5, hw, sp);
    float wideB = 1.0 - smoothstep(hw, hw * 2.8, sp);
    float crack = max(lineA, lineB);
    float mask = (1.0 - smoothstep(grow - 0.3, grow, r)) * (1.0 - smoothstep(0.84, 1.0, r + (n1 - 0.5) * 0.25));
    float gone = 1.0 - smoothstep(0.72, 1.0, t + (n2 - 0.5) * 0.3);
    float heat = 1.0 - t;
    heat = 0.3 + heat * heat * 1.5 + p1;
    float flicker = 0.85 + 0.15 * sin(now * 7.0 + n1 * 30.0);
    e = crack * mask * heat * gone * flicker;
    hot = crack * mask * (1.0 - smoothstep(0.0, 0.2, t)) * 0.9;
    cov = (max(wideA, wideB) * 0.6 + (1.0 - r) * 0.15) * mask * gone;
  } else if (type < 4.5) {
    // ── 符文阵 ──
    float n = max(3.0, p0);
    float appear = persist > 0.5 ? 1.0 : smoothstep(0.0, 0.1, t) * (1.0 - smoothstep(0.65, 1.0, t));
    float grow = 1.0 - min(1.0, t * 5.0);
    float sc = persist > 0.5 ? 1.0 : 1.0 - 0.3 * grow * grow;
    vec2 ps = p / sc;
    float rs = r / sc;
    float spin = now * p1;
    float st = sdStar(rot2(ps, spin), 0.6, n, 2.0 + n * 0.1);
    float st2 = sdStar(rot2(ps, -spin * 0.7 + PI / n), 0.36, n, 2.6);
    float ln = band(rs - 0.945, 0.024, aa) + band(rs - 0.855, 0.008, aa) * 0.8 + band(rs - 0.64, 0.008, aa) * 0.7;
    ln += runes(rs, ang + PI - spin * 0.5, 0.75, 0.065, floor(n * 3.0 + 0.5), seed * 9.0) * 0.9;
    ln += (1.0 - smoothstep(0.008, 0.008 + aa * 1.5, abs(st))) * 0.95;
    ln += (1.0 - smoothstep(0.006, 0.006 + aa * 1.5, abs(st2))) * 0.6;
    float inside = 1.0 - smoothstep(0.975, 1.0, rs);
    fil = ((1.0 - rs) * 0.06 + (1.0 - smoothstep(-0.02, 0.0, st)) * 0.07 + 0.02) * appear * inside;
    e = ln * appear * inside;
    hot = ln * 0.2 * appear * inside;
    cov = (min(ln, 1.0) * 0.75 + 0.06) * appear * inside;
  } else if (type < 5.5) {
    // ── 预警圈：亮边 + 由内向外的倒计时填充 ──
    float prog = clamp(p0, 0.0, 1.0);
    float urgent = smoothstep(0.65, 1.0, prog);
    float pulse = 0.7 + 0.3 * sin(now * 14.0);
    float edge = band(r - 0.962, 0.03, aa);
    float inner = 1.0 - smoothstep(prog - aa, prog + aa, r);
    float lead = band(r - prog + 0.012, 0.016, aa) * step(0.03, prog) * (1.0 - step(0.985, prog));
    // §7.1：边线实(0.9)、填充淡(0.18~0.28)，倒计时由内向外推进，快到点时边线加速闪。
    // 只有一道外沿边线：不画刻度；推进的前沿只留一条很淡的线(读成填充的边，不是第二道环)——几个预警圈叠在一起时圈里的人还看得清
    fil = (0.07 + inner * (0.12 + 0.05 * r + 0.06 * urgent * pulse)) * disc;
    e = (edge * (1.1 + 0.45 * pulse * urgent) + lead * 0.32) * disc;
    hot = (edge * 0.18 + lead * 0.08) * disc;
    cov = (0.1 + edge * 0.6) * disc;
  } else if (type < 6.5) {
    // ── 方向条：箭身 + 箭头 + 向前流动的尖纹 ──
    float L = vW.z;
    float W = vW.w;
    float px = p.x * L;
    float py = abs(p.y) * W;
    float hl = min(W * 1.5, L * 0.6);
    float bw = W * 0.62;
    float x0 = L - hl;
    float dBody = max(py - bw, max(px - x0, -(px + L)));
    float dHead = max((py - W * (L - px) / hl) * (hl / sqrt(hl * hl + W * W)), x0 - px);
    float d = min(dBody, dHead);
    float aw = fwidth(d) * 1.2 + 1e-4;
    float inside = 1.0 - smoothstep(-aw, aw, d);
    float edge = band(d + 0.06, 0.04, aw);
    float along = (px + L) / (2.0 * L);
    float chev = band(fract((px - py * 0.9) * 0.5 - now * 1.5) - 0.5, 0.09, 0.07) * 0.5;
    float start = smoothstep(0.0, min(1.4, L * 0.5), px + L);
    fil = (0.2 + 0.3 * along * along) * inside * start;
    e = (edge * 1.2 + chev) * inside * start;
    hot = edge * 0.12 * inside * start;
    cov = (0.25 + edge * 0.5) * inside * start;
  } else if (type < 7.5) {
    // ── 细圈(射程 / 塔的攻击范围) ──
    float th = max(p0, 0.004);
    float ln = band(r - (1.0 - th * 1.5), th, aa);
    float dash = p1 > 0.5 ? 1.0 - smoothstep(0.3, 0.34, abs(fract(ang / TAU * p1 + now * 0.03) - 0.5)) : 1.0;
    float halo = smoothstep(0.72, 1.0, r) * disc;
    fil = halo * 0.16;
    e = ln * dash;
    hot = ln * dash * 0.1;
    cov = band(r - (1.0 - th * 1.5), th * 3.0, aa * 2.0) * dash * 0.7 + halo * 0.12;
  } else if (type < 8.5) {
    // ── 锁定圈 ──
    float a2 = ang + now * 1.6;
    float seg = abs(fract(a2 / TAU * 4.0) - 0.5);
    float pulse = 0.82 + 0.18 * sin(now * 6.0);
    float brack = band(r - 0.88, 0.065, aa) * (1.0 - smoothstep(0.2, 0.24, seg));
    float tw = clamp((r - 0.52) / 0.26, 0.0, 1.0) * 0.1;
    float tri = (1.0 - smoothstep(tw - 0.012, tw + 0.012, seg)) * step(0.52, r) * (1.0 - smoothstep(0.78 - aa, 0.78 + aa, r));
    float inner = band(r - 0.6, 0.012, aa) * 0.5;
    fil = (brack + tri) * 0.8 * pulse;
    e = (brack * 0.6 + tri * 0.5 + inner) * pulse;
    hot = brack * 0.2;
    cov = (band(r - 0.88, 0.11, aa) * (1.0 - smoothstep(0.22, 0.27, seg)) + tri) * 0.6;
  } else if (type < 9.5) {
    // ── 旋涡 ──
    float arms = max(1.0, p0);
    float appear = persist > 0.5 ? 1.0 : smoothstep(0.0, 0.15, t) * (1.0 - smoothstep(0.55, 1.0, t));
    float dirS = p1 >= 0.0 ? 1.0 : -1.0;
    float s = fract(ang / TAU * arms + r * p1 - now * 0.9 * dirS);
    float nz = fbm(vec2(ang * 2.0 + now * dirS, r * 5.0 - now * 1.3) + seed * 5.0);
    float arm = s * s * (1.0 - smoothstep(0.9, 1.0, s));
    float env = smoothstep(0.06, 0.35, r) * (1.0 - smoothstep(0.72, 1.0, r));
    fil = arm * env * (0.14 + 0.18 * nz) * appear;
    e = arm * arm * arm * env * 0.75 * appear;
    hot = arm * arm * arm * arm * env * 0.25 * appear;
    cov = arm * env * 0.22 * appear;
  } else if (type < 10.5) {
    // ── 焦痕 ──
    float n = fbm(wp * 1.7 + seed * 9.0);
    float blob = 1.0 - smoothstep(0.42, 0.95, r + (n - 0.5) * 0.6);
    float f = smoothstep(0.0, 0.04, t) * (1.0 - smoothstep(0.5, 1.0, t));
    cov = blob * 0.5 * f;
    if (p0 > 0.5) {
      // 湿痕上的细碎光点：哈希格子里的小亮点，各自明灭
      vec2 gq = wp * 5.0 + seed * 11.0;
      vec2 gi = floor(gq);
      vec2 gf = fract(gq) - 0.5 - (hash22(gi) - 0.5) * 0.6;
      float hs = hash12(gi + 7.0);
      float spk = (1.0 - smoothstep(0.03, 0.09, length(gf))) * step(0.55, hs);
      e = spk * blob * (1.0 - smoothstep(0.2, 1.0, t)) * (0.5 + 0.5 * sin(now * 6.0 + hs * 40.0)) * 1.6;
      hot = e * 0.3;
    } else {
      float vein = 1.0 - smoothstep(0.0, 0.07, abs(vnoise(wp * 3.1 + seed * 5.0) - vnoise(wp * 3.1 + seed * 5.0 + 3.7)));
      e = vein * blob * (1.0 - smoothstep(0.0, 0.65, t)) * (0.6 + 0.4 * sin(now * 5.0 + n * 20.0));
    }
  } else if (type < 11.5) {
    // ── 星印 ──
    float n = max(3.0, p0);
    float pop = 1.0 - pow(1.0 - min(1.0, t * 5.0), 3.0);
    float sc = persist > 0.5 ? 1.0 : mix(0.25, 1.0, pop);
    float st = sdStar(p / sc, 0.9, n, p1 > 0.0 ? p1 : 2.6) * sc;
    float outline = 1.0 - smoothstep(0.014, 0.014 + aa * 1.5, abs(st));
    float fill = 1.0 - smoothstep(-0.015, 0.0, st);
    float fade = persist > 0.5 ? 1.0 : 1.0 - smoothstep(0.25, 1.0, t);
    fil = fill * (0.35 + 0.4 * (1.0 - t)) * fade;
    e = outline * 1.3 * fade;
    hot = outline * 0.3 * fade;
    cov = (fill * 0.4 + outline * 0.5) * fade;
  } else if (type < 12.5) {
    // ── 斩痕 / 流光 ──
    float x = p.x;
    float taper = sqrt(max(0.0, 1.0 - x * x));
    float w = max(0.03, taper);
    float prof = exp(-(p.y * p.y) / (w * w) * 4.5);
    float sweep = p1 > 0.0 ? 1.0 - smoothstep(-0.2, 0.1, x + 1.0 - 2.3 * min(1.0, t * p1)) : 1.0;
    float n = p0 > 0.0 ? mix(1.0, fbm(vec2(x * vW.z * 1.4 - now * 2.2, p.y * 2.0) + seed * 5.0) * 1.7, p0) : 1.0;
    float fade = (1.0 - t) * (1.0 - t);
    fil = min(1.0, prof * taper * sweep * n) * fade * 0.85;
    e = pow(prof, 5.0) * taper * sweep * fade * 1.1;
    hot = pow(prof, 9.0) * taper * sweep * fade * 0.7;
    cov = pow(prof, 0.6) * taper * sweep * fade * 0.6;
  } else if (type < 13.5) {
    // ── 脚下指向环 ──
    float ring = band(r - 0.6, 0.022, aa);
    float ty = abs(p.y);
    float tri = (1.0 - smoothstep(-aa, aa, ty - (0.99 - p.x) * 0.62)) * smoothstep(0.7 - aa, 0.7 + aa, p.x);
    float breath = 0.85 + 0.15 * sin(now * 3.0);
    fil = tri * 0.8 * breath;
    e = (ring * 0.9 + tri * 0.5) * breath;
    hot = tri * 0.2;
    cov = (band(r - 0.6, 0.05, aa) + tri) * 0.45;
  } else if (type < 14.5) {
    // ── 持续区域边界 ──
    // 只有一道外沿边线(不再有内圈刻度环)。p0 > 0：边线断成 p0 段短划；p0 < 0：边线按 -p0 个波起伏成弧形(音波)
    float wav = p0 < -0.5 ? 0.014 * sin(ang * (-p0) + now * 1.6) : 0.0;
    float gapK = p0 > 0.5 ? 1.0 - smoothstep(0.26, 0.3, abs(fract(ang / TAU * p0 + now * 0.05) - 0.5)) : 1.0;
    float edge = band(r - 0.972 - wav, 0.022, aa) * gapK;
    float falloff = exp(-(1.0 - r) * 6.0) * disc;
    float pulse = 1.0 + 0.2 * sin(now * 4.0 + p1);
    // 沿边流动的亮段：静止的环读成「贴图」，流动的环才读成「正在生效」
    float flow = 0.75 + 0.25 * band(fract(ang / TAU * 3.0 - now * 0.35) - 0.5, 0.18, 0.12);
    fil = (falloff * 0.12 + 0.03) * disc;
    e = edge * 1.15 * pulse * flow;
    hot = edge * 0.15 * flow;
    cov = band(r - 0.972, 0.06, 0.03) * 0.7 + 0.05 * disc;
  } else if (type < 15.5) {
    // ── 纹章细环：外圈一条细带上的纹样，中心留空 ──
    float pat = floor(p0 + 0.5);
    float unfold = persist > 0.5 ? 1.0 : 1.0 - pow(1.0 - min(1.0, t * 3.0), 3.0);
    float sc = mix(clamp(p1, 0.05, 1.0), 1.0, unfold);
    vec2 ps = p / sc;
    float rs = r / sc;
    float fade = persist > 0.5 ? 1.0 : 1.0 - smoothstep(0.55, 1.0, t);
    float inside = 1.0 - smoothstep(0.985, 1.0, rs);
    float ln = band(rs - 0.955, 0.024, aa) + band(rs - 0.79, 0.013, aa) * 0.8;
    float motif = 0.0;
    if (pat < 0.5) {
      // 六角霜纹：六边形外框 + 每角一枚小冰晶(三道短划)
      float a6 = mod(ang + PI / 6.0, PI / 3.0) - PI / 6.0;
      float hexR = 0.88 * cos(PI / 6.0) / cos(a6);
      motif = band(rs - hexR, 0.016, aa);
      vec2 q = vec2(rs * cos(a6), rs * sin(a6)) - vec2(0.88, 0.0);
      float cr = length(q);
      float spokes = band(abs(sin(atan(q.y, q.x) * 3.0)), 0.22, 0.08) * (1.0 - smoothstep(0.08, 0.11, cr));
      motif = max(motif, spokes + (1.0 - smoothstep(0.02, 0.035, cr)));
    } else if (pat < 1.5) {
      // 三焰纹：三枚向外的火舌，火舌之间是短弧
      float a3 = mod(ang + PI / 3.0, 2.0 * PI / 3.0) - PI / 3.0;
      float x = rs - 0.8;
      float flame = band(a3 * (0.9 + x * 1.6), 0.1 * (1.0 - smoothstep(0.0, 0.2, x)) + 0.006, 0.02) * step(-0.05, x) * (1.0 - smoothstep(0.18, 0.21, x));
      motif = max(flame, band(rs - 0.88, 0.014, aa) * smoothstep(0.35, 0.55, abs(a3)));
    } else if (pat < 2.5) {
      // 八芒星轨：八枚尖角站在轨道上，长短相间；每 2 秒一道向外的细脉冲
      float a8 = mod(ang + PI / 8.0, PI / 4.0) - PI / 8.0;
      float k8 = mod(floor((ang + PI / 8.0) / (PI / 4.0)), 2.0);
      float len = k8 > 0.5 ? 0.09 : 0.15;
      float x = rs - 0.88;
      motif = band(a8 * 6.0, 0.09 * (1.0 - smoothstep(0.0, len, abs(x))) + 0.005, 0.03) * (1.0 - smoothstep(len - 0.01, len, abs(x)));
      float pr = fract(now * 0.5 + seed);
      float pulseR = mix(0.82, 1.0, pr);
      ln += band(rs - pulseR, 0.008, aa) * (1.0 - pr) * 0.9;
    } else {
      // 龙鳞纹：两排错开的圆头鳞片
      float row = rs > 0.88 ? 1.0 : 0.0;
      float n = 22.0;
      float u = ang / TAU * n + row * 0.5;
      float fu = fract(u) - 0.5;
      float y = (rs - mix(0.83, 0.92, row)) / 0.06;
      float sd = length(vec2(fu * 1.3, y + fu * fu * 1.4)) - 0.48;
      motif = band(sd, 0.08, 0.05) * step(abs(y), 1.3);
    }
    ln += motif;
    fil = (motif * 0.15 + band(rs - 0.875, 0.085, 0.04) * 0.1) * fade * inside;
    e = ln * fade * inside;
    hot = ln * 0.18 * fade * inside;
    cov = (min(ln, 1.0) * 0.55) * fade * inside;
  } else if (type < 16.5) {
    // ── 扇形预警：A 色画实线边与刻度，B 色是由顶点向外推进的淡填充 ──
    float da = (abs(ang) - p0) * max(r, 0.05);
    float inside = (1.0 - smoothstep(-aa, aa, da)) * disc;
    // p1 < 0：一次性贴花按自身寿命推进(预警时长 = 贴花寿命)
    float prog = p1 < 0.0 ? t : clamp(p1, 0.0, 1.0);
    float urgent = smoothstep(0.7, 1.0, prog);
    float pulse = 0.75 + 0.25 * sin(now * 16.0);
    float edge = max(band(da + 0.014, 0.014, aa), band(r - 0.975, 0.018, aa));
    float lead = band(r - prog + 0.012, 0.014, aa) * step(0.03, prog) * (1.0 - step(0.985, prog));
    float ticks = band(fract(r * 6.0) - 0.5, 0.03, 0.03) * band(abs(ang) - p0 + 0.05, 0.03, 0.02);
    float inner = 1.0 - smoothstep(prog - aa, prog + aa, r);
    float apex = smoothstep(0.02, 0.12, r);
    e = (edge * (1.05 + 0.5 * pulse * urgent) + lead * 0.8 + ticks * 0.5) * inside * apex;
    hot = (edge * 0.15 + lead * 0.2) * inside * apex;
    cov = (0.05 + inner * (0.18 + 0.08 * urgent * pulse)) * inside * apex;
  } else if (type < 17.5) {
    // ── 墨迹笔触：起笔一顿(略粗) → 行笔 → 收笔渐细出锋；越到笔尾飞白越多。墨是遮挡层(B 色)，A 色只是中线上一闪而过的寒光 ──
    float u = p.x * 0.5 + 0.5;
    float wid = (0.7 + 0.22 * exp(-u * u * 40.0) + 0.07 * sin(u * 9.0 + seed * 20.0)) * (1.0 - smoothstep(0.5, 1.0, u) * 0.88);
    wid *= smoothstep(0.0, 0.03, u);
    float edgeN = fbm(vec2(p.x * vW.z * 1.3 + seed * 17.0, p.y * 3.0 + seed * 3.0)) - 0.5;
    float d = abs(p.y) - wid * (1.0 + edgeN * 0.4);
    float body = 1.0 - smoothstep(-0.07, 0.02, d);
    float dry = fbm(vec2(p.x * vW.z * 0.9 + seed * 5.0, p.y * vW.w * 26.0 + seed * 9.0));
    float th = 0.8 - 0.34 * u - 0.14 * abs(p.y) / max(wid, 0.05);
    float gaps = smoothstep(th, th + 0.18, dry);
    float sweep = p0 > 0.0 ? 1.0 - smoothstep(-0.08, 0.03, u - min(1.0, t * p0) * 1.12) : 1.0;
    float fade = 1.0 - smoothstep(0.5, 1.0, t + (dry - 0.5) * 0.3);
    cov = body * (1.0 - gaps * 0.9) * sweep * fade;
    float line = exp(-p.y * p.y * 260.0) * sweep * (1.0 - smoothstep(0.0, 0.3, t)) * smoothstep(0.0, 0.08, u) * (1.0 - smoothstep(0.82, 1.0, u));
    e = line * p1;
    hot = line * p1 * 0.5;
  } else if (type < 18.5) {
    // ── 帛卷：帛面(B 色)由近及远铺开，前沿是一根卷轴；卷面上是 A 色(墨)的边线与几道山水细纹。寿命末尾由噪声溶解 ──
    float u = p.x * 0.5 + 0.5;
    float front = min(1.0, t / max(p0, 0.01));
    // 帛不是一把尺子：中线沿长度方向缓缓摆两道弯(四边形比帛宽 1.8 倍，留出摆动的余地)，两端收回到正中
    float sway = 0.3 * sin(u * 5.4 + seed * 6.0) * smoothstep(0.0, 0.14, u) * smoothstep(1.0, 0.88, u);
    float py = (p.y - sway) * 1.8;
    float wz = vW.z;
    float ay = abs(py);
    // 帛边不是直线：两个频率叠出来的起伏(软的织物铺在地上)
    float wob = 0.83 + 0.05 * sin(u * wz * 2.6 + seed * 20.0) + 0.025 * sin(u * wz * 7.3 + seed * 31.0);
    // 近端不是一刀齐的直边：按噪声撕出毛边，再压一根轴头(与前沿那根卷轴成对)——整条读成「手卷」而不是一块木板
    float tear = vnoise(vec2(py * 5.0 + seed * 9.0, seed * 3.0)) * 0.035 / max(wz, 0.3);
    float nearCut = smoothstep(0.0, 0.012, u - tear);
    float farCut = 1.0 - smoothstep(front - 0.006, front + 0.006, u);
    float cloth = (1.0 - smoothstep(wob - 0.07, wob, ay)) * nearCut * farCut;
    float du = 0.07 / max(wz, 0.3);
    float roll = (1.0 - smoothstep(du * 0.55, du, abs(u - front + du * 0.4))) * (1.0 - smoothstep(0.93, 1.0, ay)) * step(0.02, front);
    float rod = (1.0 - smoothstep(du * 0.4, du * 0.75, abs(u - du * 0.55))) * (1.0 - smoothstep(0.93, 1.0, ay));
    float border = band(ay - (wob - 0.13), 0.028, 0.03) * 0.35;
    // 帛边外侧一圈淡墨的投影：帛铺在浅色石板上，靠它托出轮廓
    float shade = (1.0 - smoothstep(wob, 1.0, ay)) * smoothstep(wob - 0.05, wob, ay) * nearCut * farCut;
    float xs = u * wz * 2.0;
    // 帛面向两侧边缘略微压暗(A 色是墨，压多了整条帛会发灰：只留一点)
    float aged = smoothstep(wob - 0.4, wob - 0.03, ay) * 0.09;
    // 卷面的舆图：一道蜿蜒的河、疏密不等的山形折线、零星的墨点(城邑)
    float river = band(py - 0.3 * sin(xs * 1.5 + p1) - 0.1 * sin(xs * 3.7 + p1 * 2.3), 0.05, 0.05);
    float peak = abs(fract(xs * 0.55 + p1 * 0.3) - 0.5) * 2.0;
    float hills = band(py + 0.38 - peak * 0.22, 0.04, 0.04) * step(0.25, fract(xs * 0.275 + 0.13));
    float peak2 = abs(fract(xs * 0.9 + p1 * 0.7 + 0.31) - 0.5) * 2.0;
    float hills2 = band(py - 0.46 + peak2 * 0.16, 0.035, 0.035) * step(0.45, fract(xs * 0.3 + 0.61));
    float dots = smoothstep(0.8, 0.86, vnoise(vec2(xs * 3.1 + p1, py * 4.3 + seed * 11.0)));
    float dis = vnoise(wp * 3.0 + seed * 7.0);
    float fade = 1.0 - smoothstep(0.62, 1.0, t + (dis - 0.5) * 0.35);
    cov = cloth * 0.92 * fade;
    float inked = (river * 0.6 + hills * 0.55 + hills2 * 0.45 + dots * 0.5) * (1.0 - smoothstep(0.5, 0.66, ay));
    fil = max(max(max(max(border * 0.8, inked), aged) * cloth, max(roll, rod) * 0.9), shade * 0.5) * fade;
  } else if (type < 19.5) {
    // ── 音波环：若干道同心细环，带一点细微的颤动 ──
    float n = clamp(floor(p0 + 0.5), 1.0, 5.0);
    float lw = max(0.011, 0.028 / max(vW.z, 0.1));
    float ln = 0.0;
    float hal = 0.0;
    for (int i = 0; i < 5; i++) {
      float fi = float(i);
      if (fi >= n) break;
      float rr;
      float br;
      if (persist > 0.5) {
        if (p1 > 1.5) {
          float ph = fract(now * 0.22 + fi / n + seed);
          rr = mix(0.14, 0.97, ph);
          br = smoothstep(0.0, 0.2, ph) * (1.0 - smoothstep(0.6, 1.0, ph)) * 0.6;
        } else {
          rr = 0.965 - fi * 0.2;
          br = 0.16 + 0.84 * smoothstep(fi / n, (fi + 0.6) / n, p1);
        }
      } else {
        float stg = p1 >= 0.0 ? (p1 > 0.0 ? p1 : 0.16) : -p1;
        float tt = clamp((t - fi * stg) / max(1.0 - (n - 1.0) * stg, 0.05), 0.0, 1.0);
        float k = 1.0 - (1.0 - tt) * (1.0 - tt) * (1.0 - tt);
        rr = p1 >= 0.0 ? mix(0.1, 0.975, k) : mix(0.975, 0.08, k);
        br = step(0.001, tt) * (1.0 - smoothstep(0.45, 1.0, tt));
      }
      float dd = r - rr + lw * 0.5 * sin(ang * 22.0 + now * 26.0 + fi * 2.1);
      ln += band(dd, lw, aa) * br;
      hal += band(dd, lw * 4.5, lw * 2.5) * br;
    }
    e = ln * 1.2 * disc;
    hot = ln * 0.25 * disc;
    cov = hal * 0.5 * disc;
    fil = hal * 0.06 * disc;
  } else if (type < 20.5) {
    // ── 盾印：与樊哙漆盾同形的贴地轮廓(上缘两道圆弧、中间起尖；下缘两角上收；两侧微收腰) ──
    float pop = 1.0 - pow(1.0 - min(1.0, t * 7.0), 3.0);
    float sc = persist > 0.5 ? 1.0 : mix(1.22, 1.0, pop);
    vec2 q = p / sc;
    float ym = q.x / 1.72 + 0.5;
    float sa = abs(q.y) / 0.533;
    float hwm = 0.93 + 0.07 * cos(ym * TAU);
    float topm = 0.897 + (0.1 - 0.75 * (sa - 0.45) * (sa - 0.45) + 0.2 * exp(-sa * sa * 90.0)) / 1.45;
    float botm = 0.031 + (-0.045 + 0.185 * sa * sa * sa) / 1.45;
    float d = max((sa - hwm) * 0.533, max(ym - topm, botm - ym) * 1.72);
    float ad = fwidth(d) * 1.2 + 1e-4;
    float inside = 1.0 - smoothstep(-ad, ad, d);
    float outline = band(d + 0.045, 0.042, ad);
    float inner = band(d + 0.16, 0.014, ad);
    float bq = length(q);
    float boss = band(bq - 0.15, 0.016, ad) + (1.0 - smoothstep(0.05, 0.07, bq));
    float stripe = band(abs(q.y) - 0.085, 0.011, ad) * inside * step(0.19, bq) * (1.0 - smoothstep(-0.2, -0.12, d));
    float heat = persist > 0.5 ? 0.0 : 1.0 - smoothstep(0.0, 0.25, t);
    float fade = persist > 0.5 ? 1.0 : 1.0 - smoothstep(0.5, 1.0, t + (vnoise(wp * 2.0 + seed * 7.0) - 0.5) * 0.3);
    float ln = outline + inner * 0.6 + (boss + stripe * 0.7) * p0;
    e = ln * (0.75 + p1 + heat * 0.8) * fade;
    hot = outline * heat * 0.8 * fade;
    fil = inside * (0.08 + heat * 0.25) * fade;
    cov = (inside * 0.32 + outline * 0.6) * fade;
  } else {
    // ── 圆月：月盘 + 月缘亮线 + 月晕 ──
    float mr = p0 > 0.0 ? p0 : 0.72;
    float appear = persist > 0.5 ? 1.0 : smoothstep(0.0, 0.12, t) * (1.0 - smoothstep(0.6, 1.0, t));
    float discM = 1.0 - smoothstep(mr - 0.05, mr, r);
    float mare = fbm(p * 2.6 + seed * 9.0);
    float body = discM * (0.6 + 0.4 * smoothstep(0.35, 0.7, mare)) * (0.8 + 0.2 * (1.0 - r / mr));
    float limb = band(r - (mr - 0.03), 0.02, aa);
    float halo = band(r - 0.95, 0.012, aa) * p1 + exp(-(r - mr) * 9.0) * step(mr, r) * 0.22 * disc;
    fil = body * 0.78 * appear;
    e = (limb * 0.55 + halo * 0.6 + body * 0.2) * appear;
    hot = limb * 0.1 * appear;
    cov = discM * 0.15 * appear;
  }

  float alpha = vC0.a * uAlpha;
  float m = max(vC0.r, max(vC0.g, vC0.b));
  vec3 hue = vC0.rgb / max(m, 1e-3);
  // 被挡住的部分(透视通道)只补画线条：站在预警圈里的单位身上不再蒙一层色块
  if (uXray > 0.5) {
    fil = 0.0;
    cov *= 0.0;
  }
  fil *= uFill;
  cov *= mix(1.0, uFill, 0.6);
  // 发光线条(叠加)。§7.1：线条与边缘 ≤1.6，超过的部分平滑压回
  vec3 em = (vC0.rgb * (e + hot * 0.6) + vec3(hot * m * 0.25)) * alpha;
  float emM = max(em.r, max(em.g, em.b));
  if (emM > 1.2) em *= (1.2 + (emM - 1.2) / (1.0 + (emM - 1.2) / 0.45)) / emM;
  // 色块：亮度取 A 色亮度的一部分(大面积 ≤0.9)，保持色相饱和
  float cf = clamp(fil, 0.0, 0.92) * min(alpha, 1.0) * step(1e-3, m);
  vec3 fillCol = hue * min(m * 0.55, 0.9);
  // 底衬：参数 0 = 不要底衬；其余按 0.25 + 1.3k 放大。带一点 A 色色相，深色不发灰
  float cd = vC1.a > 0.0 ? clamp(cov * (0.25 + vC1.a * 1.3), 0.0, 0.95) * min(alpha, 1.0) : 0.0;
  vec3 dark = vC1.rgb + hue * 0.12 * step(1e-3, m);
  // 先铺底衬，再在上面盖色块
  vec3 baseCol = dark * cd * (1.0 - cf) + fillCol * cf;
  float c = 1.0 - (1.0 - cd) * (1.0 - cf);
  if (c + em.r + em.g + em.b < 0.004) discard;
  #ifdef TONE_MAPPING
  // 直出屏幕(low 档)：底色与发光分别映射后再合成，半透明边缘不出亮边
  gl_FragColor = vec4(baseCol / max(c, 1e-3), 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  vec3 baseMapped = gl_FragColor.rgb;
  gl_FragColor = vec4(kitAdditive(em), 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  gl_FragColor = vec4(baseMapped * c + gl_FragColor.rgb, c);
  #else
  gl_FragColor = vec4(baseCol + em, c);
  #endif
}
`;

class UI {
  slot = 0;
  sys;
  constructor(t) {
    this.sys = t;
  }
  o() {
    return ((this.sys.dirty = !0), this.slot * mr);
  }
  at(t, e) {
    const s = this.sys.data,
      i = this.o();
    return ((s[i] = t), (s[i + 2] = e), this);
  }
  y(t) {
    return ((this.sys.data[this.o() + 1] = t), this);
  }
  radius(t) {
    return ((this.sys.data[this.o() + 3] = t), this);
  }
  rot(t, e = 1) {
    const s = this.sys.data,
      i = this.o();
    return ((s[i + 4] = t), (s[i + 5] = e), this);
  }
  params(t, e = 0) {
    const s = this.sys.data,
      i = this.o();
    return ((s[i + 10] = t), (s[i + 11] = e), this);
  }
  color(t, e = 1, s = 1) {
    const i = this.sys.data,
      a = this.o();
    return (
      (i[a + 12] = t.r * e),
      (i[a + 13] = t.g * e),
      (i[a + 14] = t.b * e),
      (this.sys.baseAlpha[this.slot] = s),
      (i[a + 15] = s * this.sys.vis[this.slot]),
      this
    );
  }
  alpha(t) {
    return (
      (this.sys.baseAlpha[this.slot] = t),
      (this.sys.data[this.o() + 15] = t * this.sys.vis[this.slot]),
      this
    );
  }
  under(t, e) {
    const s = this.sys.data,
      i = this.o();
    return ((s[i + 16] = t.r), (s[i + 17] = t.g), (s[i + 18] = t.b), (s[i + 19] = e), this);
  }
  xray(t = !0) {
    return ((this.sys.data[this.o() + 7] = t ? 1 : 0), this);
  }
  delay(t) {
    const e = this.o();
    return ((this.sys.data[e + 8] += t), (this.sys.expire[this.slot] += t), this);
  }
  follow(t) {
    return ((this.sys.followId[this.slot] = t), this);
  }
  id() {
    return this.slot;
  }
}

class OI {
  mesh;
  xrayMesh;
  now = 0;
  resolve = null;
  data = new Float32Array(Ea * mr);
  expire = new Float64Array(Ea);
  followId = new Int32Array(Ea).fill(-1);
  baseAlpha = new Float32Array(Ea);
  vis = new Float32Array(Ea).fill(1);
  dirty = !1;
  used = new Uint8Array(Ea);
  mode = new Uint8Array(Ea);
  fadeRate = new Float32Array(Ea);
  hi = 0;
  pen;
  buffer;
  geo;
  mat;
  xrayMat;
  tmp = new dt();
  xrayCount = 0;
  fill = { value: 1 };
  constructor() {
    this.pen = new UI(this);
    const t = new Cf();
    (t.setAttribute("position", new On(new Float32Array([-1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1]), 3)),
      t.setIndex([0, 3, 2, 0, 2, 1]));
    const e = new rx(this.data, mr, 1);
    (e.setUsage(Pi),
      ["aA", "aB", "aT", "aC0", "aC1"].forEach((a, o) => t.setAttribute(a, new No(e, 4, o * 4))),
      (t.instanceCount = 0),
      (this.geo = t),
      (this.buffer = e));
    const s = { value: 0 },
      i = (a) => {
        const o = new An({
          uniforms: {
            uNow: s,
            uXray: { value: a ? 1 : 0 },
            uAlpha: { value: a ? 0.5 : 1 },
            uFill: this.fill,
          },
          vertexShader: NI,
          fragmentShader: FI,
          polygonOffset: !0,
          polygonOffsetFactor: -3,
          polygonOffsetUnits: -3,
        });
        return (Bh(o), a && (o.depthFunc = ph), o);
      };
    ((this.mat = i(!1)),
      (this.xrayMat = i(!0)),
      (this.mesh = new Sn(t, this.mat)),
      (this.mesh.name = "fx.decals"),
      (this.mesh.frustumCulled = !1),
      (this.mesh.renderOrder = 5),
      (this.xrayMesh = new Sn(t, this.xrayMat)),
      (this.xrayMesh.name = "fx.decals.xray"),
      (this.xrayMesh.frustumCulled = !1),
      (this.xrayMesh.renderOrder = 5.5),
      (this.mesh.visible = !1),
      (this.xrayMesh.visible = !1));
  }
  alloc(t, e) {
    let s = 0;
    for (; s < Ea && this.used[s];) s++;
    if (s >= Ea) {
      let o = -1,
        r = 1 / 0;
      for (let l = 0; l < Ea; l++)
        this.mode[l] === 0 && this.expire[l] < r && ((r = this.expire[l]), (o = l));
      s = o < 0 ? 0 : o;
    }
    ((this.used[s] = 1), s >= this.hi && (this.hi = s + 1));
    const i = this.data,
      a = s * mr;
    return (
      i.fill(0, a, a + mr),
      (i[a + 1] = 0.06),
      (i[a + 5] = 1),
      (i[a + 6] = t),
      (i[a + 8] = this.now),
      (i[a + 9] = e),
      (i[a + 12] = i[a + 13] = i[a + 14] = 1),
      (i[a + 15] = 1),
      (this.baseAlpha[s] = 1),
      (this.vis[s] = 1),
      (this.followId[s] = -1),
      (this.mode[s] = 0),
      (this.expire[s] = this.now + e),
      (this.dirty = !0),
      s
    );
  }
  add(t, e, s, i, a) {
    const o = this.alloc(t, a),
      r = o * mr;
    return (
      (this.data[r] = e),
      (this.data[r + 2] = s),
      (this.data[r + 3] = i),
      (this.pen.slot = o),
      this.pen
    );
  }
  hold(t, e = 0.12) {
    const s = this.alloc(t, zI);
    return (
      (this.mode[s] = 1),
      (this.vis[s] = e > 0 ? 0 : 1),
      (this.fadeRate[s] = e > 0 ? 1 / e : 0),
      (this.data[s * mr + 15] = 0),
      s
    );
  }
  at(t) {
    return ((this.pen.slot = t), this.pen);
  }
  release(t, e = 0.18) {
    if (!(t < 0 || !this.used[t] || this.mode[t] === 0)) {
      if (e <= 0) {
        this.free(t);
        return;
      }
      ((this.mode[t] = 2), (this.fadeRate[t] = 1 / e));
    }
  }
  free(t) {
    ((this.used[t] = 0), (this.mode[t] = 0), (this.followId[t] = -1));
    const e = t * mr;
    ((this.data[e + 3] = 0), (this.data[e + 7] = 0), (this.dirty = !0));
  }
  flush(t) {
    this.mat.uniforms.uNow.value = this.now;
    const e = this.data;
    let s = 0,
      i = 0;
    for (let a = 0; a < this.hi; a++) {
      if (!this.used[a]) continue;
      const o = a * mr,
        r = this.mode[a];
      if (r === 0) {
        if (this.now >= this.expire[a]) {
          this.free(a);
          continue;
        }
      } else {
        const c = r === 1 ? 1 : 0;
        let f = this.vis[a];
        if (f !== c) {
          const d = this.fadeRate[a] > 0 ? this.fadeRate[a] * t : 1;
          ((f = c > f ? Math.min(1, f + d) : Math.max(0, f - d)),
            (this.vis[a] = f),
            (e[o + 15] = this.baseAlpha[a] * f),
            (this.dirty = !0));
        }
        if (r === 2 && f <= 0) {
          this.free(a);
          continue;
        }
      }
      const l = this.followId[a];
      (l >= 0 &&
        this.resolve &&
        this.resolve(l, this.tmp) &&
        ((e[o] = this.tmp.x), (e[o + 2] = this.tmp.z), (this.dirty = !0)),
        e[o + 7] > 0.5 && i++,
        (s = a + 1));
    }
    ((this.hi = s),
      (this.xrayCount = i),
      (this.geo.instanceCount = s),
      (this.mesh.visible = s > 0),
      (this.xrayMesh.visible = i > 0),
      this.dirty &&
        ((this.buffer.updateRanges.length = 0), (this.buffer.needsUpdate = !0), (this.dirty = !1)));
  }
  setFill(t) {
    this.fill.value = t;
  }
  get activeCount() {
    let t = 0;
    for (let e = 0; e < this.hi; e++) t += this.used[e];
    return t;
  }
  get xrayActive() {
    return this.xrayCount;
  }
  clear() {
    for (let t = 0; t < Ea; t++) this.used[t] && this.free(t);
    this.hi = 0;
  }
  dispose() {
    (this.geo.dispose(), this.mat.dispose(), this.xrayMat.dispose());
  }
}

function BI(n, t = !1) {
  const e = n[0].index !== null,
    s = new Set(Object.keys(n[0].attributes)),
    i = new Set(Object.keys(n[0].morphAttributes)),
    a = {},
    o = {},
    r = n[0].morphTargetsRelative,
    l = new Bn();
  let c = 0;
  for (let f = 0; f < n.length; ++f) {
    const d = n[f];
    let h = 0;
    if (e !== (d.index !== null))
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
            f +
            ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.",
        ),
        null
      );
    for (const u in d.attributes) {
      if (!s.has(u))
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
              f +
              '. All geometries must have compatible attributes; make sure "' +
              u +
              '" attribute exists among all geometries, or in none of them.',
          ),
          null
        );
      (a[u] === void 0 && (a[u] = []), a[u].push(d.attributes[u]), h++);
    }
    if (h !== s.size)
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
            f +
            ". Make sure all geometries have the same number of attributes.",
        ),
        null
      );
    if (r !== d.morphTargetsRelative)
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
            f +
            ". .morphTargetsRelative must be consistent throughout all geometries.",
        ),
        null
      );
    for (const u in d.morphAttributes) {
      if (!i.has(u))
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
              f +
              ".  .morphAttributes must be consistent throughout all geometries.",
          ),
          null
        );
      (o[u] === void 0 && (o[u] = []), o[u].push(d.morphAttributes[u]));
    }
    if (t) {
      let u;
      if (e) u = d.index.count;
      else if (d.attributes.position !== void 0) u = d.attributes.position.count;
      else
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
              f +
              ". The geometry must have either an index or a position attribute",
          ),
          null
        );
      (l.addGroup(c, u, f), (c += u));
    }
  }
  if (e) {
    let f = 0;
    const d = [];
    for (let h = 0; h < n.length; ++h) {
      const u = n[h].index;
      for (let m = 0; m < u.count; ++m) d.push(u.getX(m) + f);
      f += n[h].attributes.position.count;
    }
    l.setIndex(d);
  }
  for (const f in a) {
    const d = _b(a[f]);
    if (!d)
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " +
            f +
            " attribute.",
        ),
        null
      );
    l.setAttribute(f, d);
  }
  for (const f in o) {
    const d = o[f][0].length;
    if (d === 0) break;
    ((l.morphAttributes = l.morphAttributes || {}), (l.morphAttributes[f] = []));
    for (let h = 0; h < d; ++h) {
      const u = [];
      for (let x = 0; x < o[f].length; ++x) u.push(o[f][x][h]);
      const m = _b(u);
      if (!m)
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " +
              f +
              " morphAttribute.",
          ),
          null
        );
      l.morphAttributes[f].push(m);
    }
  }
  return l;
}

function _b(n) {
  let t,
    e,
    s,
    i = -1,
    a = 0;
  for (let c = 0; c < n.length; ++c) {
    const f = n[c];
    if ((t === void 0 && (t = f.array.constructor), t !== f.array.constructor))
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.",
        ),
        null
      );
    if ((e === void 0 && (e = f.itemSize), e !== f.itemSize))
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.",
        ),
        null
      );
    if ((s === void 0 && (s = f.normalized), s !== f.normalized))
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.",
        ),
        null
      );
    if ((i === -1 && (i = f.gpuType), i !== f.gpuType))
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.",
        ),
        null
      );
    a += f.count * e;
  }
  const o = new t(a),
    r = new On(o, e, s);
  let l = 0;
  for (let c = 0; c < n.length; ++c) {
    const f = n[c];
    if (f.isInterleavedBufferAttribute) {
      const d = l / e;
      for (let h = 0, u = f.count; h < u; h++)
        for (let m = 0; m < e; m++) {
          const x = f.getComponent(h, m);
          r.setComponent(h + d, m, x);
        }
    } else o.set(f.array, l);
    l += f.count * e;
  }
  return (i !== void 0 && (r.gpuType = i), r);
}

const oe = Math.PI * 2,
  HI = (n) => (n < 0 ? 0 : n > 1 ? 1 : n),
  $I = (n, t, e) => {
    const s = HI((e - n) / (t - n));
    return s * s * (3 - 2 * s);
  },
  wb = (n, t = 1.70158) => {
    const e = n - 1;
    return 1 + e * e * ((t + 1) * e + t);
  };

class XM {
  s;
  constructor(t = 49734321) {
    this.s = t >>> 0 || 1;
  }
  seed(t) {
    this.s = t >>> 0 || 1;
  }
  next() {
    let t = this.s;
    return (
      (t ^= t << 13),
      (t >>>= 0),
      (t ^= t >>> 17),
      (t ^= t << 5),
      (t >>>= 0),
      (this.s = t),
      t / 4294967296
    );
  }
  range(t, e) {
    return t + (e - t) * this.next();
  }
  signed() {
    return this.next() * 2 - 1;
  }
  int(t) {
    return Math.floor(this.next() * t);
  }
  chance(t) {
    return this.next() < t;
  }
}

const Lt = (n) => new Ut(n),
  ws = {
    panyue: {
      glow: Lt(16749080),
      hot: Lt(16761934),
      deep: Lt(14243850),
      accent: Lt(15906650),
      dark: Lt(3023384),
    },
    chijin: {
      glow: Lt(16734750),
      hot: Lt(16756280),
      deep: Lt(13377042),
      accent: Lt(16749608),
      dark: Lt(2494478),
    },
    xingli: {
      glow: Lt(9225471),
      hot: Lt(15923455),
      deep: Lt(3820188),
      accent: Lt(16767370),
      dark: Lt(1317436),
    },
    fengling: {
      glow: Lt(3072150),
      hot: Lt(8320702),
      deep: Lt(2070128),
      accent: Lt(15320170),
      dark: Lt(930856),
    },
    yeque: {
      glow: Lt(9067760),
      hot: Lt(15266047),
      deep: Lt(3811960),
      accent: Lt(12577250),
      dark: Lt(920086),
    },
  },
  W = {
    white: Lt(16777215),
    warm: Lt(16764784),
    spark: Lt(16757810),
    sparkDeep: Lt(16732688),
    magic: Lt(6079743),
    magicDeep: Lt(3824895),
    crit: Lt(16765498),
    critDeep: Lt(16730640),
    heal: Lt(8257440),
    healDeep: Lt(3133552),
    gold: Lt(16765002),
    goldDeep: Lt(15768096),
    goldHot: Lt(16769658),
    dust: Lt(12101256),
    dustDark: Lt(8022614),
    rock: Lt(9076854),
    smoke: Lt(4867664),
    smokeDark: Lt(2499628),
    ember: Lt(16742972),
    frost: Lt(9428223),
    frostDeep: Lt(5217535),
    shadow: Lt(1182752),
    red: Lt(16728112),
    redDeep: Lt(11540504),
    blue: Lt(4890879),
    blueDeep: Lt(2121952),
    green: Lt(10354554),
    poison: Lt(12120160),
    poisonDeep: Lt(5216812),
    black: Lt(0),
    greenDeep: Lt(2058796),
    amber: Lt(16761418),
    violet: Lt(10514687),
    violetHot: Lt(14731519),
    violetDeep: Lt(2758232),
    abyssCyan: Lt(8384736),
    frostHot: Lt(14218495),
    emberHot: Lt(16765562),
    spore: Lt(14215328),
    moth: Lt(9433312),
    earth: Lt(10124376),
    earthDark: Lt(6179382),
    bronze: Lt(14723144),
    stringGold: Lt(16769696),
    plume: Lt(16513780),
    sand: Lt(14206106),
    sandDark: Lt(11048050),
    grass: Lt(11059296),
    grassDark: Lt(7309882),
    stone: Lt(13683908),
    stoneDark: Lt(9078400),
    silk: Lt(15787724),
    silkDark: Lt(12101246),
    cinnabar: Lt(13120042),
    ink: Lt(920086),
  },
  Mb = [
    { glow: Lt(Yt.blue.glow), hot: Lt(9226495), deep: Lt(Yt.blue.dark) },
    { glow: Lt(Yt.red.glow), hot: Lt(16752752), deep: Lt(Yt.red.dark) },
    { glow: Lt(Yt.neutral.glow), hot: Lt(16769162), deep: Lt(Yt.neutral.dark) },
  ];

function Fa(n) {
  return Mb[n] ?? Mb[2];
}

const qe = {
    pillar: 0,
    sphere: 1,
    slash: 2,
    diamond: 3,
    arrow: 4,
    cone: 6,
    hoop: 7,
    spike: 8,
    rock: 9,
    breath: 10,
    dagger: 11,
    shield: 12,
  },
  Gg = new Set([qe.spike, qe.rock]),
  sn = {
    plain: 0,
    rim: 1,
    core: 2,
    pillar: 3,
    slash: 4,
    hex: 5,
    vortex: 6,
    solid: 7,
    hoop: 8,
    breath: 9,
    plate: 10,
  },
  kb = { 0: 48, 1: 96, 2: 64, 3: 96, 4: 48, 5: 24, 6: 32, 7: 64, 8: 96, 9: 64, 10: 4, 11: 24, 12: 24 },
  GI = 420,
  VI = `
attribute vec4 aTint;
attribute vec4 aFxp;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vView;
varying vec3 vObj;
varying vec3 vColor;
varying vec4 vTint;
varying vec4 vFxp;
void main() {
  if (aTint.a <= 0.0) {
    gl_Position = vec4(0.0, 0.0, 2.0, 1.0);
    return;
  }
  vUv = uv;
  vObj = position;
  vColor = color;
  vTint = aTint;
  vFxp = aFxp;
  mat3 m = mat3(instanceMatrix);
  // 非均匀缩放下的法线：按各轴缩放平方修正
  vec3 s2 = vec3(dot(m[0], m[0]), dot(m[1], m[1]), dot(m[2], m[2]));
  vNormal = normalize(mat3(viewMatrix) * (m * (normal / max(s2, vec3(1e-8)))));
  vec4 mv = viewMatrix * (instanceMatrix * vec4(position, 1.0));
  vView = -mv.xyz;
  gl_Position = projectionMatrix * mv;
}
`,
  WI = `
uniform float uNow;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vView;
varying vec3 vObj;
varying vec3 vColor;
varying vec4 vTint;
varying vec4 vFxp;
${Vl}
${zf}
const float PI = 3.14159265;
float hexEdge(vec2 p) {
  const vec2 s = vec2(1.0, 1.7320508);
  vec2 a = mod(p, s) - s * 0.5;
  vec2 b = mod(p - s * 0.5, s) - s * 0.5;
  vec2 g = abs(dot(a, a) < dot(b, b) ? a : b);
  float d = max(dot(g, s * 0.5), g.x);
  return smoothstep(0.4, 0.485, d);
}
void main() {
  float mode = floor(vFxp.x + 0.001);
  float fxAdd = clamp((vFxp.x - mode) / 0.9, 0.0, 1.0);
  float seed = vFxp.y;
  float pr = vFxp.z;
  float k = vFxp.w;
  vec3 N = normalize(vNormal);
  vec3 V = normalize(vView);
  float ndv = abs(dot(N, V));
  vec3 c = vTint.rgb * vColor;
  float a = vTint.a;
  float hot = 0.0;
  if (mode < 0.5) {
  } else if (mode < 1.5) {
    a *= min(1.0, pow(1.0 - ndv, k) * 2.2 + 0.08);
  } else if (mode < 2.5) {
    float f = pow(ndv, k);
    a *= f;
    hot = f * f * f * 0.6;
  } else if (mode < 3.5) {
    float n = fbm(vec2(vUv.x * 18.0 + seed * 31.0, vUv.y * 2.5 - uNow * 1.8));
    float fall = pow(max(0.0, 1.0 - vUv.y), k);
    a *= min(1.0, fall * (0.55 + 0.9 * n) * (0.45 + 0.55 * ndv) * 2.2) * smoothstep(0.0, 0.03, vUv.y);
    hot = fall * fall * fall * 0.3;
  } else if (mode < 4.5) {
    float v = vUv.y;
    float u = vUv.x;
    float prof = pow(v, 1.5) * (1.0 - smoothstep(0.94, 1.0, v));
    // k = 可见弧长占整段弧的比例(1 = 全弧 2.5 弧度)：按技能的扇形角裁剪
    float uu = clamp((u - 0.5) / max(k, 0.05) + 0.5, 0.0, 1.0);
    float ends = pow(max(0.0, sin(uu * PI)), 0.6);
    u = uu;
    float sw = 1.0;
    if (pr >= 0.0) {
      float h = pr * 1.8;
      sw = (1.0 - smoothstep(h - 0.06, h, u)) * smoothstep(h - 1.0, h - 0.25, u);
    }
    a *= prof * ends * sw * 1.9;
    hot = pow(v, 7.0) * ends * sw * 1.2;
  } else if (mode < 5.5) {
    vec3 d = normalize(vObj);
    vec2 hp = vec2(atan(d.z, d.x) * 2.6, asin(clamp(d.y, -1.0, 1.0)) * 3.6);
    float rim = pow(1.0 - ndv, 2.4);
    float pulse = 0.5 + 0.5 * sin(uNow * 3.0 - d.y * 5.0 + seed * 6.0);
    float cell = hexEdge(hp * 1.5);
    a *= min(1.0, rim * 1.35 + cell * (0.3 + 0.3 * pulse) * (0.5 + 0.5 * rim) + 0.07);
    hot = rim * rim * 0.3;
  } else if (mode < 6.5) {
    float n = fbm(vec2(vUv.x * 5.0 + vUv.y * k - uNow * 1.6, vUv.y * 3.0 - uNow * 2.2) + seed * 9.0);
    float th = mix(0.2, 1.0, pr);
    float body = smoothstep(th - 0.12, th + 0.18, n + (1.0 - vUv.y) * 0.5);
    a *= min(1.0, body * smoothstep(0.0, 0.08, vUv.y) * pow(max(0.0, 1.0 - vUv.y), 0.5) * (0.55 + 0.45 * ndv) * 1.4);
    hot = body * (1.0 - vUv.y) * 0.25;
  } else if (mode < 7.5) {
    float l = 0.55 + 0.45 * max(0.0, dot(N, normalize(vec3(-0.3, 0.8, 0.5))));
    c = c * l + vTint.rgb * pow(1.0 - ndv, 2.5) * 0.45;
  } else if (mode < 8.5) {
    float prof = sin(vUv.y * PI);
    a *= min(1.0, prof * prof * 2.0);
    hot = pow(prof, 6.0) * 0.5;
  } else if (mode > 9.5) {
    // 盾影：uv.x 横跨盾面、uv.y 沿长轴，四条边就是 0 / 1；包边亮、盾面淡，中央一枚盾鼻
    float ex = abs(vUv.x * 2.0 - 1.0);
    float ey = abs(vUv.y * 2.0 - 1.0);
    float rim = max(smoothstep(0.7, 0.8, ex), smoothstep(0.85, 0.9, ey));
    float inner = max(1.0 - smoothstep(0.0, 0.06, abs(ex - 0.5)), 1.0 - smoothstep(0.0, 0.035, abs(ey - 0.7))) * step(ex, 0.56) * step(ey, 0.74);
    float bd = length(vec2((vUv.x - 0.5) * 0.62, vUv.y - 0.5));
    float boss = (1.0 - smoothstep(0.0, 0.028, abs(bd - 0.1))) + (1.0 - smoothstep(0.035, 0.055, bd));
    float sheen = pr >= 0.0 ? (1.0 - smoothstep(0.0, 0.16, abs(vUv.y + ex * 0.25 - mix(-0.25, 1.35, pr)))) : 0.0;
    float fill = k * (0.6 + 0.4 * max(ex, ey)) + sheen * 0.3;
    float line = min(1.0, rim + inner * 0.55 + boss * 0.85);
    a *= min(1.0, line + fill);
    // 盾面比包边暗一档：线是亮铜色，面是半透明的深铜；最外沿再压一道深色的轮廓线，亮地面上才托得住
    c *= mix(0.45, 1.0, min(1.0, line + sheen));
    float outl = max(smoothstep(0.93, 0.975, ex), smoothstep(0.965, 0.99, ey));
    c *= 1.0 - outl * 0.85;
    hot = (rim * 0.5 + boss * 0.35 + sheen * 0.4) * (1.0 - outl);
  } else {
    // 吐息：两层反向滚动的噪声沿锥体流出；越往外越稀、边缘被侵蚀，收尾时整体由根部向外溶解
    float u = vUv.x;
    float w = vUv.y;
    float t1 = uNow * k;
    float n1 = fbm(vec2(u * 3.2 - t1, w * 7.0 + seed * 13.0));
    float n2 = fbm(vec2(u * 6.5 - t1 * 1.6 + 3.1, w * 13.0 - t1 * 0.4 + seed * 5.0));
    float n = n1 * 0.65 + n2 * 0.5;
    float th = mix(0.3, 0.85, u) + pr * 0.9 * (1.0 - u * 0.3);
    float body = smoothstep(th - 0.1, th + 0.14, n + (1.0 - u) * 0.3);
    // 丝缕：沿流动方向拉长的细纹，让气流有方向感
    float wisp = 0.4 + 0.6 * smoothstep(0.3, 0.7, fbm(vec2(u * 1.5 - t1 * 1.3, w * 22.0 + seed * 3.0)));
    float ends = smoothstep(0.0, 0.06, u) * (1.0 - smoothstep(0.75, 1.0, u + (n2 - 0.5) * 0.3));
    a *= min(1.0, body * wisp * ends * (0.25 + 0.75 * ndv) * 1.25);
    // 根部青白，向外过渡到本色
    float root = 1.0 - smoothstep(0.0, 0.45, u);
    float m0 = max(c.r, max(c.g, c.b));
    c = mix(c, vec3(0.82, 1.0, 1.0) * m0 * 1.25, root * 0.85);
    hot = root * root * body * 0.6;
  }
  float fxA = min(1.0, a);
  if (fxA < 0.004) discard;
  vec3 fxC = c * (1.0 + hot * 0.7) + vec3(hot * 0.3 * max(c.r, max(c.g, c.b)));
  // §7.1 亮度上限：大面积的壳 / 柱 / 罩 / 漩涡 / 吐息主体 ≤0.9(白热部分放宽到 1.6)，线状的斩弧 / 环箍 / 盾影 ≤1.6，
  // 小弹体与实体交给输出段的全局上限(3.2)
  float capL = (mode > 0.5 && mode < 1.5) || (mode > 2.5 && mode < 3.5) || (mode > 4.5 && mode < 6.5) || (mode > 8.5 && mode < 9.5) ? 0.9 + 0.7 * min(1.0, hot * 2.0) : (mode > 3.5 && mode < 4.5) || (mode > 7.5 && mode < 8.5) || mode > 9.5 ? 1.6 : 8.0;
  float capM = max(fxC.r, max(fxC.g, fxC.b));
  float capK = capL * 0.7;
  if (capM > capK) fxC *= (capK + (capM - capK) / (1.0 + (capM - capK) / (capL - capK))) / capM;
  ${gx}
}
`;

class Sb {
  alive = !1;
  shape = 0;
  mode = 0;
  t0 = 0;
  life = 1;
  manual = !1;
  x = 0;
  y = 0;
  z = 0;
  vx = 0;
  vy = 0;
  vz = 0;
  gravity = 0;
  sx0 = 1;
  sy0 = 1;
  sz0 = 1;
  sx1 = 1;
  sy1 = 1;
  sz1 = 1;
  ease = 1;
  rx = 0;
  ry = 0;
  rz = 0;
  wx = 0;
  wy = 0;
  wz = 0;
  r = 1;
  g = 1;
  b = 1;
  a = 1;
  fadeIn = 0.08;
  fadeOut = 0.4;
  add = 1;
  k = 2;
  progress = -1;
  seed = 0;
  followId = -1;
  at(t, e, s) {
    return ((this.x = t), (this.y = e), (this.z = s), this);
  }
  vel(t, e, s, i = 0) {
    return ((this.vx = t), (this.vy = e), (this.vz = s), (this.gravity = i), this);
  }
  scale(t, e = t) {
    return ((this.sx0 = this.sy0 = this.sz0 = t), (this.sx1 = this.sy1 = this.sz1 = e), this);
  }
  scale3(t, e, s, i = t, a = e, o = s) {
    return (
      (this.sx0 = t),
      (this.sy0 = e),
      (this.sz0 = s),
      (this.sx1 = i),
      (this.sy1 = a),
      (this.sz1 = o),
      this
    );
  }
  rot(t, e, s) {
    return ((this.rx = t), (this.ry = e), (this.rz = s), this);
  }
  spin(t, e, s) {
    return ((this.wx = t), (this.wy = e), (this.wz = s), this);
  }
  color(t, e = 1, s = 1) {
    return ((this.r = t.r * e), (this.g = t.g * e), (this.b = t.b * e), (this.a = s), this);
  }
  fade(t, e) {
    return ((this.fadeIn = t), (this.fadeOut = e), this);
  }
  opt(t, e, s = this.ease) {
    return ((this.add = t), (this.k = e), (this.ease = s), this);
  }
  follow(t) {
    return ((this.followId = t), this);
  }
  delay(t) {
    return ((this.t0 += t), this);
  }
}

function Ll(n, t) {
  const e = n.getAttribute("position"),
    s = new Float32Array(e.count * 3);
  for (let i = 0; i < e.count; i++) s.set(t(e.getX(i), e.getY(i), e.getZ(i), i), i * 3);
  n.setAttribute("color", new On(s, 3));
}

function Il(n) {
  return (Ll(n, () => [1, 1, 1]), n);
}

function jI() {
  const e = [],
    s = [],
    i = [],
    a = [];
  for (let r = 0; r <= 28; r++) {
    const l = r / 28,
      c = (l - 0.5) * 2.5,
      f = 0.36 * Math.pow(Math.sin(Math.PI * l), 0.7) + 0.01;
    for (const [d, h] of [
      [1 - f, 0],
      [1, 1],
    ])
      (e.push(Math.cos(c) * d, 0, Math.sin(c) * d), s.push(l, h), i.push(0, 1, 0));
    if (r < 28) {
      const d = r * 2;
      a.push(d, d + 2, d + 1, d + 1, d + 2, d + 3);
    }
  }
  const o = new Bn();
  return (
    o.setAttribute("position", new Ae(e, 3)),
    o.setAttribute("uv", new Ae(s, 2)),
    o.setAttribute("normal", new Ae(i, 3)),
    o.setIndex(a),
    Il(o)
  );
}

function qI() {
  const t = [],
    e = [],
    s = [],
    i = [];
  for (let o = 0; o <= 40; o++) {
    const r = (o / 40) * Math.PI * 2;
    for (const [l, c] of [
      [0.72, 0],
      [1, 1],
    ])
      (t.push(Math.cos(r) * l, 0, Math.sin(r) * l), e.push(o / 40, c), s.push(0, 1, 0));
    if (o < 40) {
      const l = o * 2;
      i.push(l, l + 2, l + 1, l + 1, l + 2, l + 3);
    }
  }
  const a = new Bn();
  return (
    a.setAttribute("position", new Ae(t, 3)),
    a.setAttribute("uv", new Ae(e, 2)),
    a.setAttribute("normal", new Ae(s, 3)),
    a.setIndex(i),
    Il(a)
  );
}

function XI() {
  const n = [],
    t = new uf(0.03, 0.03, 1.45, 6, 1).toNonIndexed();
  (t.rotateZ(-Math.PI / 2), t.translate(-0.05, 0, 0), Ll(t, () => [0.82, 0.76, 0.62]), n.push(t));
  const e = new mm(0.11, 0.4, 6, 1).toNonIndexed();
  (e.rotateZ(-Math.PI / 2), e.translate(0.86, 0, 0), Ll(e, () => [1.5, 1.5, 1.5]), n.push(e));
  for (let i = 0; i < 3; i++) {
    const a = new Bn();
    (a.setAttribute(
      "position",
      new Ae(
        [-0.78, 0.03, 0, -0.42, 0.03, 0, -0.86, 0.19, 0, -0.78, 0.03, 0, -0.86, 0.19, 0, -0.42, 0.03, 0],
        3,
      ),
    ),
      a.setAttribute("normal", new Ae([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1], 3)),
      a.setAttribute("uv", new Ae(new Array(12).fill(0), 2)),
      a.rotateX((i * Math.PI * 2) / 3),
      Ll(a, () => [1.1, 1.1, 1.1]),
      n.push(a));
  }
  const s = BI(n, !1);
  for (const i of n) i.dispose();
  return s;
}

function YI() {
  const n = [],
    t = [],
    e = [],
    s = [],
    i = (o, r, l, c) => {
      for (const f of [1, -1]) {
        const d = f === 1 ? [o, l, r] : [o, r, l];
        for (const h of d) (n.push(h[0], f * 0.03, h[1]), t.push(0, f, 0), e.push(0, 0), s.push(c, c, c));
      }
    };
  for (let o = 0; o < 3; o++) {
    const r = (o * Math.PI * 2) / 3,
      l = (f, d) => [Math.cos(r + d) * f, Math.sin(r + d) * f],
      c = [0, 0];
    (i(c, l(0.34, -0.55), l(0.62, 0.05), 0.75),
      i(c, l(0.62, 0.05), l(0.3, 0.6), 0.6),
      i(l(0.34, -0.55), l(1, 0.42), l(0.62, 0.05), 1.5),
      i(l(0.62, 0.05), l(1, 0.42), l(0.72, 0.5), 1));
  }
  const a = new Bn();
  return (
    a.setAttribute("position", new Ae(n, 3)),
    a.setAttribute("normal", new Ae(t, 3)),
    a.setAttribute("uv", new Ae(e, 2)),
    a.setAttribute("color", new Ae(s, 3)),
    a
  );
}

function KI() {
  const e = [],
    s = [],
    i = [],
    a = [];
  for (let r = 0; r <= 10; r++) {
    const l = r / 10,
      c = l,
      f = 0.07 + 0.93 * Math.pow(l, 0.8);
    for (let d = 0; d <= 20; d++) {
      const h = d / 20,
        u = h * Math.PI * 2,
        m = Math.cos(u),
        x = Math.sin(u);
      e.push(c, m * f * 0.8, x * f);
      const p = new dt(-0.6, m, x).normalize();
      if ((i.push(p.x, p.y, p.z), s.push(l, h), r < 10 && d < 20)) {
        const g = r * 21 + d;
        a.push(g, g + 20 + 1, g + 1, g + 1, g + 20 + 1, g + 20 + 2);
      }
    }
  }
  const o = new Bn();
  return (
    o.setAttribute("position", new Ae(e, 3)),
    o.setAttribute("uv", new Ae(s, 2)),
    o.setAttribute("normal", new Ae(i, 3)),
    o.setIndex(a),
    Il(o)
  );
}

function ZI(n) {
  const t = [],
    e = [];
  for (const [i, a, o, r] of n) {
    t.push(...i, ...a, ...o);
    for (let l = 0; l < 3; l++) e.push(r, r, r * 1.04);
  }
  const s = new Bn();
  return (
    s.setAttribute("position", new Ae(t, 3)),
    s.setAttribute("uv", new Ae(new Array((t.length / 3) * 2).fill(0), 2)),
    s.setAttribute("color", new Ae(e, 3)),
    s.computeVertexNormals(),
    s
  );
}

function QI() {
  const t = [
      [0, 0.07],
      [0.08, 0.105],
      [0.3, 0.125],
      [0.6, 0.1],
      [0.85, 0.055],
      [1, 0],
    ],
    e = [];
  for (let i = 0; i < t.length - 1; i++) {
    const [a, o] = t[i],
      [r, l] = t[i + 1],
      c = 0.036 * (1 - a * 0.8),
      f = 0.036 * (1 - r * 0.8);
    for (const d of [1, -1])
      for (const h of [1, -1]) {
        const u = [a + -0.3, d * c, 0],
          m = [r + -0.3, d * f, 0],
          x = [a + -0.3, 0, h * o],
          p = [r + -0.3, 0, h * l],
          g = d > 0 ? (h > 0 ? 1.55 : 1.15) : h > 0 ? 0.95 : 0.75;
        d * h > 0 ? e.push([u, x, m, g], [m, x, p, g]) : e.push([u, m, x, g], [m, p, x, g]);
      }
  }
  const s = (i, a, o, r, l) => {
    const c = (f) => [(f & 1 ? a : i) + -0.3, f & 2 ? o : -o, f & 4 ? r : -r];
    for (const [f, d, h, u, m] of [
      [0, 1, 3, 2, 0.8],
      [4, 6, 7, 5, 1],
      [0, 4, 5, 1, 0.6],
      [2, 3, 7, 6, 1.2],
      [0, 2, 6, 4, 0.7],
      [1, 5, 7, 3, 0.9],
    ])
      e.push([c(f), c(d), c(h), l * m], [c(f), c(h), c(u), l * m]);
  };
  return (
    s(-0.045, 0.02, 0.032, 0.16, 0.62),
    s(-0.42, -0.045, 0.034, 0.04, 0.2),
    s(-0.5, -0.42, 0.05, 0.07, 0.55),
    ZI(e)
  );
}

const JI = [0.15, 0.045, 0.085, 0.1, 0.08, 0.02, -0.13],
  tP = [-0.045, -0.03, -0.012, 0, 0.012, 0.045, 0.14];

function Tb(n, t) {
  const e = Math.min(1, Math.max(0, t)) * (n.length - 1),
    s = Math.min(n.length - 2, Math.floor(e));
  return (n[s] + (n[s + 1] - n[s]) * (e - s)) / 1.45;
}

function eP() {
  const s = [],
    i = [],
    a = [],
    o = [];
  for (let l = 0; l <= 8; l++) {
    const c = l / 8;
    for (let f = 0; f <= 12; f++) {
      const d = f / 12,
        h = Math.abs(d * 2 - 1),
        u = 0.31 * (0.93 + 0.07 * Math.cos(c * Math.PI * 2)),
        m = (d * 2 - 1) * u,
        x = 0.031 + Tb(tP, h),
        p = 0.897 + Tb(JI, h),
        g = x + (p - x) * c;
      if ((s.push(-0.075 * (m / 0.31) * (m / 0.31), g, m), i.push(d, c), a.push(1, 0, 0), f < 12 && l < 8)) {
        const y = l * 13 + f;
        o.push(y, y + 1, y + 12 + 1, y + 1, y + 12 + 2, y + 12 + 1);
      }
    }
  }
  const r = new Bn();
  return (
    r.setAttribute("position", new Ae(s, 3)),
    r.setAttribute("uv", new Ae(i, 2)),
    r.setAttribute("normal", new Ae(a, 3)),
    r.setIndex(o),
    Il(r)
  );
}

function YM(n, t) {
  const e = n.getAttribute("position"),
    s = new Uint8Array(e.count * 4);
  for (let i = 0; i < e.count; i++)
    ((s[i * 4 + 1] = Math.max(0, Math.min(1, t(e.getX(i), e.getY(i), e.getZ(i)))) * 255),
      (s[i * 4 + 3] = 255));
  n.setAttribute("aFx", new On(s, 4, !0));
}

function nP() {
  const n = new mm(0.5, 1, 5, 2);
  n.translate(0, 0.5, 0);
  const t = n.getAttribute("position");
  for (let s = 0; s < t.count; s++) {
    const i = t.getY(s);
    if (i > 0.02 && i < 0.98) {
      const a = Math.round(t.getX(s) * 100),
        o = Math.round(t.getZ(s) * 100);
      (t.setX(s, t.getX(s) * (0.8 + 0.5 * nn(a, o, 5))), t.setZ(s, t.getZ(s) * (0.8 + 0.5 * nn(a, o, 9))));
    }
  }
  const e = n.toNonIndexed();
  return (
    n.dispose(),
    e.computeVertexNormals(),
    Ll(e, (s, i) => {
      const a = Math.max(0, (i - 0.5) / 0.5);
      return [0.15 + 0.85 * a, 0.125 + 0.42 * a, 0.11 - 0.02 * a];
    }),
    YM(e, (s, i) => Math.max(0, (i - 0.55) / 0.45) * 0.55),
    e
  );
}

function sP() {
  const n = new ke(31),
    t = new sx(1, 0),
    e = new Map(),
    s = t.getAttribute("position");
  for (let i = 0; i < s.count; i++) {
    const a = `${s.getX(i).toFixed(3)},${s.getY(i).toFixed(3)},${s.getZ(i).toFixed(3)}`;
    let o = e.get(a);
    if (!o) {
      const r = n.range(0.62, 1.12);
      ((o = [s.getX(i) * r, s.getY(i) * r * 0.82, s.getZ(i) * r]), e.set(a, o));
    }
    s.setXYZ(i, o[0], o[1], o[2]);
  }
  return (
    t.computeVertexNormals(),
    Ll(t, (i, a, o, r) => {
      const l = 0.14 + 0.05 * (((r / 3) | 0) % 3) + a * 0.03;
      return [l * 1.04, l, l * 0.94];
    }),
    YM(t, () => 0),
    t
  );
}

function iP() {
  const n = new ix(1, 0);
  return (
    n.scale(1, 0.36, 0.36),
    n.computeVertexNormals(),
    Ll(n, (t) => {
      const e = 0.75 + 0.5 * Math.max(0, t);
      return [e, e, e];
    }),
    n
  );
}

const Eb = new Ri(),
  Ab = new sa(0, 0, 0, "YZX"),
  gc = new dt(),
  Rb = new dt(),
  Cb = new Ke(),
  Lb = new Ut();

class aP {
  group = new Ji();
  now = 0;
  resolve = null;
  meshes = [];
  tint = [];
  fxp = [];
  counts = [];
  pool = [];
  free = [];
  live = [];
  mat;
  litMat;
  seedN = 0;
  dummy = new Sb();
  constructor() {
    ((this.group.name = "fx.meshes"),
      (this.mat = new An({
        uniforms: { uNow: { value: 0 } },
        vertexShader: VI,
        fragmentShader: WI,
        vertexColors: !0,
        side: fi,
      })),
      Bh(this.mat),
      (this.litMat = Qc({ vertexColors: !0, flat: !0, steps: 2, rim: 0.35, glowBoost: 3.2 })));
    const t = new uf(1, 1, 1, 24, 1, !0);
    t.translate(0, 0.5, 0);
    const e = new uf(1, 0.28, 1, 24, 5, !0);
    (e.translate(0, 0.5, 0),
      [
        Il(t),
        Il(new xm(1, 24, 16)),
        jI(),
        iP(),
        XI(),
        YI(),
        Il(e),
        qI(),
        nP(),
        sP(),
        KI(),
        QI(),
        eP(),
      ].forEach((i, a) => {
        const o = kb[a],
          r = Gg.has(a),
          l = new kM(i, r ? this.litMat : this.mat, o);
        (l.instanceMatrix.setUsage(Pi), (l.frustumCulled = !1), (l.count = 0), (l.visible = !1));
        const c = new Qs(new Float32Array(o * 4), 4),
          f = new Qs(new Float32Array(o * 4), 4);
        (c.setUsage(Pi),
          f.setUsage(Pi),
          r
            ? ((l.castShadow = !0),
              (l.receiveShadow = !0),
              l.setColorAt(0, Lb.setRGB(1, 1, 1)),
              l.instanceColor.setUsage(Pi),
              (l.name = "fx.lit" + a))
            : (i.setAttribute("aTint", c),
              i.setAttribute("aFxp", f),
              (l.renderOrder = 7),
              (l.name = "fx.glow" + a)),
          this.meshes.push(l),
          this.tint.push(c),
          this.fxp.push(f),
          this.counts.push(0),
          this.group.add(l));
      }));
    for (let i = 0; i < GI; i++) {
      const a = new Sb();
      (this.pool.push(a), this.free.push(a));
    }
  }
  take(t, e, s, i) {
    const a = this.free.pop();
    return a
      ? ((a.alive = !0),
        (a.shape = t),
        (a.mode = e),
        (a.t0 = this.now),
        (a.life = s),
        (a.manual = i),
        (a.x = a.y = a.z = 0),
        (a.vx = a.vy = a.vz = 0),
        (a.gravity = 0),
        (a.sx0 = a.sy0 = a.sz0 = a.sx1 = a.sy1 = a.sz1 = 1),
        (a.ease = 1),
        (a.rx = a.ry = a.rz = 0),
        (a.wx = a.wy = a.wz = 0),
        (a.r = a.g = a.b = 1),
        (a.a = 1),
        (a.fadeIn = 0.08),
        (a.fadeOut = 0.4),
        (a.add = 1),
        (a.k = 2),
        (a.progress = -1),
        (a.seed = this.seedN = (this.seedN + 0.6180339) % 1),
        (a.followId = -1),
        this.live.push(a),
        a)
      : this.dummy;
  }
  spawn(t, e, s) {
    return this.take(t, e, s, !1);
  }
  hold(t, e) {
    return this.take(t, e, 1, !0);
  }
  release(t) {
    t && (t.alive = !1);
  }
  flush() {
    this.mat.uniforms.uNow.value = this.now;
    const t = this.counts;
    for (let i = 0; i < t.length; i++) t[i] = 0;
    const e = this.live;
    let s = 0;
    for (let i = 0; i < e.length; i++) {
      const a = e[i],
        o = this.now - a.t0,
        r = a.manual ? 0 : o / a.life;
      if (!a.alive || r >= 1) {
        ((a.alive = !1), this.free.push(a));
        continue;
      }
      if (((e[s++] = a), o < 0)) continue;
      const l = a.shape,
        c = t[l];
      if (c >= kb[l]) continue;
      let f = r,
        d = 0;
      if (a.ease === 1) f = 1 - (1 - r) * (1 - r);
      else if (a.ease === 2) f = wb(Math.min(1, r * 2.2));
      else if (a.ease === 3) f = r * r;
      else if (a.ease === 4) {
        f = wb(Math.min(1, r * 4));
        const v = (r - 0.65) / 0.35;
        v > 0 && (d = v * v);
      }
      const h = a.sx0 + (a.sx1 - a.sx0) * f,
        u = a.sy0 + (a.sy1 - a.sy0) * f,
        m = a.sz0 + (a.sz1 - a.sz0) * f;
      let x = a.x + a.vx * o,
        p = a.y + a.vy * o - 0.5 * a.gravity * o * o,
        g = a.z + a.vz * o;
      (a.followId >= 0 &&
        this.resolve &&
        this.resolve(a.followId, gc) &&
        ((x += gc.x), (p += gc.y), (g += gc.z)),
        d > 0 && (p -= u * d * 1.05),
        Ab.set(a.rx + a.wx * o, a.ry + a.wy * o, a.rz + a.wz * o),
        Eb.setFromEuler(Ab),
        gc.set(x, p, g),
        Rb.set(h, u, m),
        Cb.compose(gc, Eb, Rb));
      const y = this.meshes[l];
      if ((y.setMatrixAt(c, Cb), Gg.has(l))) y.setColorAt(c, Lb.setRGB(a.r, a.g, a.b));
      else {
        let v = a.a;
        if (!a.manual && (a.fadeIn > 0 && r < a.fadeIn && (v *= r / a.fadeIn), r > a.fadeOut)) {
          const S = 1 - (r - a.fadeOut) / (1 - a.fadeOut);
          v *= S * S;
        }
        const _ = this.tint[l].array,
          k = this.fxp[l].array,
          M = c * 4;
        ((_[M] = a.r),
          (_[M + 1] = a.g),
          (_[M + 2] = a.b),
          (_[M + 3] = v),
          (k[M] = a.mode + Math.min(1, Math.max(0, a.add)) * 0.9),
          (k[M + 1] = a.seed),
          (k[M + 2] = a.progress >= 0 ? a.progress : a.progress <= -2 ? -1 : r),
          (k[M + 3] = a.k));
      }
      t[l] = c + 1;
    }
    e.length = s;
    for (let i = 0; i < t.length; i++) {
      const a = this.meshes[i],
        o = t[i];
      ((a.count = o),
        (a.visible = o > 0),
        o !== 0 &&
          ((a.instanceMatrix.needsUpdate = !0),
          Gg.has(i)
            ? a.instanceColor && (a.instanceColor.needsUpdate = !0)
            : ((this.tint[i].needsUpdate = !0), (this.fxp[i].needsUpdate = !0))));
    }
  }
  get activeShapes() {
    let t = 0;
    for (const e of this.counts) e > 0 && t++;
    return t;
  }
  clear() {
    for (const t of this.live) t.alive = !1;
  }
  dispose() {
    for (const t of this.meshes) (t.geometry.dispose(), t.dispose());
    (this.mat.dispose(), this.litMat.dispose());
  }
}

const So = 28,
  Xu = 6144,
  pa = { billboard: 0, stretch: 1, flat: 2 };

function $e(n) {
  const t = n.intensity ?? 1;
  return {
    sprite: n.sprite,
    sprite2: n.sprite2 ?? n.sprite,
    add: n.add ?? 1,
    c0: new Ut(n.color ?? 16777215),
    c1: new Ut(n.color2 ?? n.color ?? 16777215),
    i0: t,
    i1: n.intensity2 ?? t,
    a0: n.alpha ?? 1,
    a1: n.alpha2 ?? n.alpha ?? 1,
    fadeIn: n.fadeIn ?? 0.06,
    fadeOut: n.fadeOut ?? 0.45,
    gravity: n.gravity ?? 0,
    drag: n.drag ?? 0,
    orient: n.orient ?? pa.billboard,
    stretch: n.stretch ?? 0,
    spin: n.spin ?? 0,
    rot: n.rot ?? NaN,
    vary: n.vary ?? 0,
    scale: n.scale ?? 1,
    pull: n.pull ?? 0,
  };
}
export { Xt, bb, OI, oe, $I, XM, Lt, ws, W, Fa, qe, sn, aP, So, Xu, pa, $e };
