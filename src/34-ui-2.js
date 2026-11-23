// 34-ui-2.js — ui｜39 个顶层语句｜52KB
// 对应 game.pretty.js 第 66542–67534 行
// 关键内容：
//   S3                    上路
//   Ml                    生存
//   T4                    难度 ${n} / ${t}
//   mH                    技能类型标签：胶囊形，文字用标签色，底色为标签色 14
//   ty                    大招</span>
//   ck                    大招
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { Se, kr, z0 } from './02-data.js';
import { $8, EB, G8, Hf, Jn, V8, Wx, X8, Zn, _e, j8, po, z } from './32-ui.js';
import { B0, C2, Hn, Ia, K1, KB, Kh, Ln, Mi, Mr, Pe, Vo, We, Wo, _4, ak, dn, ek, fn, hn, ik, je, ln, ok, sk, w3, w4, xe } from './33-data-2.js';

const tH = {
  boots: (n) => {
    const t = B0(n, "#e9c873", 0.6),
      e = (i) =>
        `<path d="${i}" fill="none" stroke="${xe}" stroke-width="4.8" stroke-linecap="round" stroke-linejoin="round"/><path d="${i}" fill="none" stroke="${Hn(t, 0.35)}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`;
    let s = "";
    for (let i = 13; i <= 49; i += 4.5) s += `M${i} 43.5L${i + 3} 51.5`;
    return dn(
      Mi(n),
      fn("sl", 0, 40, 0, 54, [
        [0, Hn(t, 0.45)],
        [0.5, t],
        [1, Ln(t, 0.5)],
      ]) + je("g", Hn(n, 0.3), 0.55),
      We("g", 32, 36, 28) +
        `<path d="M1 24H9M0 33H7M2 42H6" stroke="${Hn(n, 0.45)}" stroke-width="1.8" stroke-linecap="round" opacity=".65"/>` +
        e("M14 42Q10 25 21 22Q30 20.5 31.5 31") +
        `<path d="M8 46Q8 42 12 42H46Q52 42 56.5 37.5Q60 41 58 47Q55.5 53.5 48 53.5H13Q8 53.5 8 49.5Z" fill="url(#@sl)" ${Pe(1.4)}/><path d="${s}" stroke="${Ln(t, 0.55)}" stroke-width="1.1" stroke-linecap="round" opacity=".7"/><path d="M10.5 44H47Q52 44 55.5 41" fill="none" stroke="#ffffff" stroke-width="1.1" stroke-linecap="round" opacity=".45"/>` +
        e("M23 42Q25 31 31.5 31Q39 33 45 42") +
        e("M41 42Q45 33.5 51.5 39") +
        `<circle cx="31.5" cy="31" r="3.2" fill="${Hn(t, 0.5)}" ${Pe(1.1)}/>`,
    );
  },
  boots_guard: (n) =>
    C2(
      n,
      w4("pl", 16, 10, 30, 36),
      "",
      `<path d="M17 13H28V28.5L22.5 34L17 28.5Z" fill="url(#@pl)" ${Pe(1.1)}/><path d="M22.5 15V31" stroke="#ffffff" stroke-width="1" opacity=".7"/><path d="M37 36.5L44 40Q49 42.5 49 48V51H35.5Z" fill="url(#@pl)" ${Pe(1.1)}/><circle cx="19.5" cy="15.5" r="1" fill="${xe}"/><circle cx="25.5" cy="15.5" r="1" fill="${xe}"/><circle cx="39" cy="48" r="1" fill="${xe}"/><circle cx="45.5" cy="48" r="1" fill="${xe}"/><path d="M11.5 3.5H33.5L31.5 9.5H13.5Z" fill="${Hn(n, 0.45)}" ${Pe(1.1)}/>`,
    ),
  boots_arcane: (n) =>
    C2(
      n,
      je("gs", "#ffe7ad", 1),
      "",
      '<path d="M13.5 6H31.5V9.2H13.5Z" fill="#f3cf85"/>' +
        We("gs", 23, 25, 12) +
        `<path d="${hn(23, 25, 7.5, 0.2)}" fill="#fff4d6" stroke="#8a5a14" stroke-width=".7"/><path d="M14.5 54H49.5" stroke="#8fe9ff" stroke-width="1.6" stroke-linecap="round"/><path d="${hn(45, 22, 3.4)}" fill="#ffffff"/><path d="${hn(52, 33, 2.4)}" fill="#c9f6ff"/><circle cx="40" cy="12" r="1.2" fill="#c9f6ff"/>`,
    ),
  boots_fury: (n) =>
    C2(
      n,
      fn("wg", 2, 10, 24, 38, [
        [0, "#ffffff"],
        [1, Hn(n, 0.55)],
      ]),
      `<path d="M0 50H9M3 44H9" stroke="${Hn(n, 0.5)}" stroke-width="1.6" stroke-linecap="round" opacity=".6"/>`,
      `<path d="M25 27Q9 23 2 9Q13 14 25 18Z" fill="url(#@wg)" ${Pe(1.1)}/><path d="M25 32Q11 31 3 21Q13 24.5 25 25.5Z" fill="url(#@wg)" ${Pe(1.1)}/><path d="M25 37Q14 38.5 7 32.5Q15 33.5 25 32Z" fill="url(#@wg)" ${Pe(1.1)}/><circle cx="25.5" cy="27.5" r="3" fill="#f3cf85" ${Pe(1)}/>`,
    ),
  starfall_blade: (n) =>
    dn(
      Mi(n),
      fn("bl", 0, 2, 0, 42, [
        [0, "#fffbe9"],
        [0.45, n],
        [1, Ln(n, 0.4)],
      ]) +
        je("g", n, 0.85) +
        je("gs", "#fff6dc", 1),
      `<path d="M60 22L42 40M52 8L40 20" stroke="${Hn(n, 0.4)}" stroke-width="1.3" stroke-linecap="round" opacity=".5"/><g transform="rotate(40 32 32)">` +
        We("g", 32, 20, 24) +
        `<path d="M32 1L40 13L38.4 42H25.6L24 13Z" fill="url(#@bl)" ${Pe()}/><path d="M32 1L40 13L38.4 42H32Z" fill="#6a2f00" opacity=".26"/><path d="M32 7V40" stroke="#fffdf2" stroke-width="1.3" stroke-linecap="round" opacity=".9"/><path d="M16.5 39.5Q24 44 32 41.5Q40 44 47.5 39.5L45.5 47Q38 46 32 48.5Q26 46 18.5 47Z" fill="#3a4257" stroke="#f3cf85" stroke-width="1.2" stroke-linejoin="round"/><rect x="29.4" y="47.6" width="5.2" height="8" fill="${KB}" ${Pe(1)}/><path d="M32 55L35.4 58.6L32 62.2L28.6 58.6Z" fill="${n}" ${Pe(1)}/>` +
        We("gs", 32, 44.5, 7) +
        `<path d="${hn(32, 44.5, 4.6)}" fill="#fffdf2"/>` +
        We("gs", 32, 3, 9) +
        `<path d="${hn(32, 3, 5.5, 0.14)}" fill="#ffffff"/></g>`,
    ),
  sunchaser_bow: (n) => {
    const t =
        "M25.5 2.5Q19.5 5 22 9.5Q31 13 36.5 21Q42 29 39.5 32Q42 35 36.5 43Q31 51 22 54.5Q19.5 59 25.5 61.5",
      e = (s, i) =>
        `<g transform="translate(0 ${s})" opacity="${i}"><path d="M13 32H52" stroke="#fff7da" stroke-width="1.8" stroke-linecap="round"/><path d="M50 27.5L60 32L50 36.5L53 32Z" fill="#ffffff"/></g>`;
    return dn(
      Mi(n),
      fn("bw", 0, 2, 0, 62, [
        [0, "#4a3018"],
        [0.16, n],
        [0.5, Hn(n, 0.5)],
        [0.84, n],
        [1, "#4a3018"],
      ]) + je("g", n, 0.8),
      We("g", 36, 30, 26) +
        '<g transform="rotate(-38 32 32)">' +
        e(-10, 0.22) +
        e(10, 0.38) +
        `<path d="M22.5 6.5L11 32L22.5 57.5" fill="none" stroke="#fff7da" stroke-width="1.1" stroke-linejoin="round"/><path d="${t}" fill="none" stroke="${xe}" stroke-width="6.6" stroke-linecap="round"/><path d="${t}" fill="none" stroke="url(#@bw)" stroke-width="4.4" stroke-linecap="round"/><path d="M30 13.5Q35 17.5 38 23M30 50.5Q35 46.5 38 41" fill="none" stroke="#ffffff" stroke-width="1" stroke-linecap="round" opacity=".55"/><rect x="37" y="27" width="5.6" height="10" rx="1.6" fill="#7a4a1c" ${Pe(1)}/><path d="M37 30.3H42.6M37 33.7H42.6" stroke="#f3cf85" stroke-width=".9"/><path d="M11 32H53" stroke="${xe}" stroke-width="3.6" stroke-linecap="round"/><path d="M11 32H53" stroke="#fff7da" stroke-width="1.8" stroke-linecap="round"/><path d="M50 27L61.5 32L50 37L53.5 32Z" fill="#ffffff" ${Pe(1)}/><path d="M11 32L8 28H13L16.5 32L13 36H8Z" fill="#ff8a3a" ${Pe(0.9)}/></g>`,
    );
  },
  blood_scythe: (n) =>
    dn(
      Mi(n),
      fn("bl", 27.5, 0, 36.5, 0, [
        [0, ak],
        [0.28, sk],
        [0.62, "#d9dee6"],
        [1, n],
      ]) + je("g", n, 0.7),
      '<g transform="rotate(42 32 32)">' +
        We("g", 32, 22, 22) +
        `<path d="M28 1.5L36 10V43H28Z" fill="url(#@bl)" ${Pe()}/><path d="M30.3 7V41" stroke="#ffffff" stroke-width="1.1" stroke-linecap="round" opacity=".85"/><path d="M36 10V43" stroke="${n}" stroke-width="1.6" opacity=".9"/><path d="M26.5 43H37.5V46.6H26.5Z" fill="#f3cf85" ${Pe(1)}/><rect x="29.2" y="46.6" width="5.6" height="8.4" fill="${Ln(n, 0.55)}" ${Pe(1)}/><path d="M29.2 49.3H34.8M29.2 52.1H34.8" stroke="#f3cf85" stroke-width=".9"/><circle cx="32" cy="59" r="4" fill="none" stroke="${xe}" stroke-width="4.6"/><circle cx="32" cy="59" r="4" fill="none" stroke="#f3cf85" stroke-width="2.4"/></g><path d="M45 30Q48.5 35 45 38.2Q41.5 35 45 30Z" fill="#ff5a55" ${Pe(0.8)}/><path d="M38 41Q40.3 44.4 38 46.6Q35.7 44.4 38 41Z" fill="#ff5a55" ${Pe(0.8)}/>`,
    ),
  piercing_spear: (n) =>
    dn(
      Mi(n),
      w4("hd", -8, -16, 8, 8) + je("g", "#ffffff", 0.7),
      `<g fill="none" stroke="${Hn(n, 0.25)}" stroke-width="2.6" stroke-linecap="round" opacity=".8"><path d="M21 17A19 19 0 0 0 11.5 39"/><path d="M19 49.5A19 19 0 0 0 46 46.5"/><path d="M49.5 38A19 19 0 0 0 49 27"/></g><path d="M14 26L20 29M40 51L38 45M52.5 33L46.5 33" stroke="${Hn(n, 0.5)}" stroke-width="1.3" stroke-linecap="round" opacity=".7"/><path d="M9 57L42 22" stroke="${xe}" stroke-width="5.6" stroke-linecap="round"/><path d="M9 57L42 22" stroke="${_4}" stroke-width="3" stroke-linecap="round"/><path d="M38.5 25Q31.5 25.5 29.5 34Q34.5 32 40.5 31Z" fill="#e0453f" ${Pe(0.9)}/><circle cx="9" cy="57" r="2.8" fill="${ik}" ${Pe(1)}/><g transform="translate(44 20) rotate(45)"><path d="M0 2L-9.5 1.5L-15 -5L-13.5 4.5L-9 8.5H0Z" fill="url(#@hd)" ${Pe()}/><path d="M-1 5H-9.5L-13 0" fill="none" stroke="#ffffff" stroke-width=".9" stroke-linejoin="round" opacity=".7"/><path d="M0 -16L6.2 -3L0 3.5L-6.2 -3Z" fill="url(#@hd)" ${Pe()}/><path d="M0 -14V2" stroke="#ffffff" stroke-width="1" opacity=".8"/><rect x="-3.4" y="7.5" width="6.8" height="3.6" rx="1" fill="#f3cf85" ${Pe(0.9)}/></g>` +
        We("g", 56.5, 8.5, 8) +
        `<path d="${hn(56.5, 8.5, 4.2, 0.14)}" fill="#ffffff"/>`,
    ),
  phantom_edge: (n) => {
    const t = "M27 42Q20.5 21 32.5 7Q40 -1.5 48.5 7.5Q41.5 5.5 38 12Q30.5 24 35.5 42Z";
    return dn(
      Mi(n),
      fn("bl", 22, 0, 46, 0, [
        [0, "#ffffff"],
        [0.45, Hn(n, 0.55)],
        [1, n],
      ]) +
        je("g", n, 0.8) +
        je("gs", "#ffffff", 1),
      `<g transform="translate(-1 2) rotate(30 32 32)"><path d="${t}" transform="translate(-8 3)" fill="${n}" opacity=".26"/>` +
        We("g", 34, 20, 22) +
        `<path d="${t}" fill="url(#@bl)" ${Pe()}/><path d="M29.5 40Q24 22 34 9.5Q39.5 3 45 6" fill="none" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" opacity=".9"/><path d="M22 42H40.5Q42.5 42 42.5 44.2Q42.5 46.4 40.5 46.4H22Q20 46.4 20 44.2Q20 42 22 42Z" fill="#2a2244" stroke="${Hn(n, 0.2)}" stroke-width="1.1"/><rect x="28.6" y="46.4" width="5.4" height="9.2" fill="#15131f" ${Pe(1)}/><path d="M28.6 49.4H34M28.6 52.4H34" stroke="${n}" stroke-width="1"/><path d="M31.3 55.6L35 59.3L31.3 63L27.6 59.3Z" fill="${Hn(n, 0.2)}" ${Pe(1)}/>` +
        We("gs", 48, 7, 9) +
        `<path d="${hn(48, 7, 6.5, 0.12)}" fill="#ffffff"/></g>`,
    );
  },
  astral_staff: (n) =>
    dn(
      Mi(n),
      fn("st", 35, 5, 55, 25, [
        [0, "#ffffff"],
        [1, n],
      ]) + je("g", n, 1),
      `<path d="M16 59L38 26" stroke="${xe}" stroke-width="5.8" stroke-linecap="round"/><path d="M16 59L38 26" stroke="#9fb7e8" stroke-width="3" stroke-linecap="round"/><path d="M22 46.5L26 49.2M29.5 35.5L33.5 38.2" stroke="#f3cf85" stroke-width="2" stroke-linecap="round"/><path d="M38 26Q28 20 33 8M38 26Q46 32 57 26" fill="none" stroke="${xe}" stroke-width="5" stroke-linecap="round"/><path d="M38 26Q28 20 33 8M38 26Q46 32 57 26" fill="none" stroke="#f3cf85" stroke-width="2.6" stroke-linecap="round"/><circle cx="38" cy="26" r="3.2" fill="#fff4d6" ${Pe(1)}/>` +
        We("g", 45, 15, 17) +
        `<ellipse cx="45" cy="15" rx="14" ry="4.6" transform="rotate(-25 45 15)" fill="none" stroke="#c9f6ff" stroke-width="1.1" opacity=".8"/><path d="${hn(45, 15, 11, 0.22)}" fill="url(#@st)" stroke="${Ln(n, 0.5)}" stroke-width=".8"/><path d="${hn(45, 15, 5)}" fill="#ffffff"/><circle cx="16" cy="59" r="2.6" fill="#f3cf85" ${Pe(1)}/><circle cx="14" cy="22" r="1.3" fill="#c9f6ff"/><path d="${hn(20, 13, 2.8)}" fill="#ffffff"/>`,
    ),
  void_crown: (n) =>
    dn(
      Mi(n),
      ok("cr", n, 8, 10, 56, 52) +
        Vo("vo", 32, 34, 8.5, [
          [0, "#000000"],
          [0.55, "#1c0845"],
          [1, n],
        ]) +
        je("g", n, 0.85),
      We("g", 32, 32, 28) +
        `<path d="M11 44L7.5 19L21 30L32 10.5L43 30L56.5 19L53 44Z" fill="url(#@cr)" ${Pe()}/><path d="M21 30L22.5 44M43 30L41.5 44" stroke="${Ln(n, 0.55)}" stroke-width="1.1" opacity=".55"/><path d="M7.5 19L21 30L32 10.5" fill="none" stroke="#ffffff" stroke-width="1" stroke-linejoin="round" opacity=".55"/><path d="M10.5 44H53.5V51Q53.5 53.5 51 53.5H13Q10.5 53.5 10.5 51Z" fill="#241c42" stroke="${Hn(n, 0.4)}" stroke-width="1.2"/><path d="M20 46L22.6 48.8L20 51.6L17.4 48.8ZM44 46L46.6 48.8L44 51.6L41.4 48.8ZM32 46L34.6 48.8L32 51.6L29.4 48.8Z" fill="${Hn(n, 0.6)}"/><circle cx="7.5" cy="19" r="2.8" fill="#ece2ff" ${Pe(1)}/><circle cx="56.5" cy="19" r="2.8" fill="#ece2ff" ${Pe(1)}/><circle cx="32" cy="10.5" r="3.2" fill="#ece2ff" ${Pe(1)}/><circle cx="32" cy="34" r="7.8" fill="url(#@vo)" stroke="#ece2ff" stroke-width="1.3"/><path d="M27.5 32Q29.5 28.5 33.5 29" fill="none" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" opacity=".85"/>`,
    ),
  winter_scepter: (n) =>
    dn(
      Mi(n),
      fn("ic", 30, 6, 56, 32, [
        [0, "#ffffff"],
        [1, n],
      ]) + je("g", n, 0.9),
      `<path d="M14 59L37 27" stroke="${xe}" stroke-width="5.8" stroke-linecap="round"/><path d="M14 59L37 27" stroke="#c4d8e8" stroke-width="3" stroke-linecap="round"/><path d="M20 47.5L24 50.5M27 37.5L31 40.5" stroke="#5c7fa6" stroke-width="2" stroke-linecap="round"/><path d="M35 33L27 27L36 27.5Z" fill="#e8fbff" ${Pe(1)}/><path d="M39 33L47 36L40.5 29Z" fill="${n}" ${Pe(1)}/>` +
        We("g", 43, 19, 20) +
        `<path d="${Mr(43, 19, 6, 14.5, 5.2)}" fill="url(#@ic)" stroke="#1b4a66" stroke-width="1.1" stroke-linejoin="round"/><path d="M43 4.5V33.5M30.4 11.8L55.6 26.2M30.4 26.2L55.6 11.8" stroke="#ffffff" stroke-width=".9" opacity=".75"/><path d="${Mr(43, 19, 6, 5.6, 3.4)}" fill="#ffffff"/><circle cx="14" cy="59" r="2.6" fill="#c4d8e8" ${Pe(1)}/><g stroke="#e8fbff" stroke-width="1.2" stroke-linecap="round"><path d="M14 14V22M10.5 16L17.5 20M10.5 20L17.5 16"/><path d="M53 42V48M50.4 43.5L55.6 46.5M50.4 46.5L55.6 43.5"/></g>`,
    ),
  sage_codex: (n) => {
    let t = "",
      e = "";
    for (let s = 0; s < 7; s++) {
      const i = 9.5 + s * 5.2,
        a = 13 + (s % 2) * 1.2;
      ((t += `<rect x="${i.toFixed(1)}" y="${a.toFixed(1)}" width="4.8" height="38" rx="1" fill="url(#@bm)" ${Pe(0.9)}/>`),
        s > 0 &&
          (e += `M${(i + 1.3).toFixed(1)} 27h2.2M${(i + 1.3).toFixed(1)} 31h2.2M${(i + 1.3).toFixed(1)} 35h2.2M${(i + 1.3).toFixed(1)} 39h2.2`));
    }
    return dn(
      Mi(n),
      fn("bm", 0, 12, 0, 52, [
        [0, Hn(n, 0.5)],
        [0.5, n],
        [1, Ln(n, 0.45)],
      ]) +
        fn("rl", 45, 0, 56, 0, [
          [0, Ln(n, 0.35)],
          [0.45, Hn(n, 0.35)],
          [1, Ln(n, 0.6)],
        ]) +
        je("g", "#fff6dc", 0.85),
      '<g transform="rotate(-8 32 32)">' +
        We("g", 28, 33, 24) +
        t +
        `<path d="${e}" stroke="#5a3a12" stroke-width="1.3" stroke-linecap="round"/><path d="M8.5 20.5H47M8.5 45H47" stroke="${xe}" stroke-width="3.2" stroke-linecap="round"/><path d="M8.5 20.5H47M8.5 45H47" stroke="#c8523c" stroke-width="1.7" stroke-linecap="round"/><rect x="45.5" y="10" width="10" height="44" rx="5" fill="url(#@rl)" ${Pe(1.2)}/><ellipse cx="50.5" cy="13" rx="3.6" ry="1.8" fill="${Ln(n, 0.62)}"/><path d="M45.5 20.5H55.5M45.5 45H55.5" stroke="#c8523c" stroke-width="1.7"/><path d="M48 17V50" stroke="#ffffff" stroke-width="1" stroke-linecap="round" opacity=".5"/><path d="M50.5 54V60" stroke="#c8523c" stroke-width="1.5" stroke-linecap="round"/><path d="M48.8 59.5H52.2L51.3 63H49.7Z" fill="#c8523c"/></g><path d="${hn(51, 9, 3.6)}" fill="#ffffff"/><path d="${hn(8, 54, 2.4)}" fill="#fff6dc"/>`,
    );
  },
  guardian_plate: (n) =>
    dn(
      Mi(n),
      fn("pl", 10, 8, 54, 56, [
        [0, Hn(n, 0.6)],
        [0.45, n],
        [1, Ln(n, 0.55)],
      ]) + je("g", "#ffcf70", 1),
      `<path d="M32 13L41 9Q48 7.5 54 12.5L57.5 25L48 30V44Q42 54 32 57.5Q22 54 16 44V30L6.5 25L10 12.5Q16 7.5 23 9Z" fill="url(#@pl)" ${Pe(1.5)}/><path d="M6.5 25L10 12.5Q16 7.5 23 9L20.5 22Q13.5 22 6.5 25Z" fill="${Hn(n, 0.5)}" ${Pe(1.1)}/><path d="M57.5 25L54 12.5Q48 7.5 41 9L43.5 22Q50.5 22 57.5 25Z" fill="${n}" ${Pe(1.1)}/><path d="M23 9L32 13L41 9L38.5 17.5Q32 20.5 25.5 17.5Z" fill="${Ln(n, 0.5)}" ${Pe(1.1)}/><path d="M32 20V57" stroke="#ffffff" stroke-width="1.2" opacity=".4"/><path d="M19.5 30.5Q26 36.5 32 33.5Q38 36.5 44.5 30.5M18 40Q32 46.5 46 40M21.5 47.5Q32 52.5 42.5 47.5" fill="none" stroke="${Ln(n, 0.6)}" stroke-width="1.3" stroke-linecap="round" opacity=".7"/><circle cx="13" cy="17" r="1.2" fill="${xe}"/><circle cx="51" cy="17" r="1.2" fill="${xe}"/>` +
        We("g", 32, 27, 9) +
        '<path d="M32 22L36.2 27L32 32L27.8 27Z" fill="#ffcf70" stroke="#fffdf2" stroke-width="1"/>',
    ),
  starweave_cloak: (n) => {
    const t =
        "M17.5 21Q13.5 16.5 18.5 13.5Q18.5 8.5 24.5 9.5Q27.5 5 32 8Q36.5 5 39.5 9.5Q45.5 8.5 45.5 13.5Q50.5 16.5 46.5 21Q48.5 26.5 42.5 26Q39.5 30 36 26.5Q32 30.5 28 26.5Q24.5 30 21.5 26Q15.5 26.5 17.5 21Z",
      e = "M11 57Q21.5 50.5 32 57Q42.5 50.5 53 57";
    return dn(
      Mi(n),
      fn("ck", 0, 10, 0, 58, [
        [0, Hn(n, 0.35)],
        [0.45, n],
        [1, B0(n, "#0a1838", 0.72)],
      ]) +
        fn("fr", 0, 5, 0, 30, [
          [0, "#ffffff"],
          [1, "#e2d3b4"],
        ]) +
        je("g", n, 0.7),
      We("g", 32, 36, 30) +
        `<path d="M22 15L45 15.5Q56 34 54 58Q43 51.5 32 58Q21 51.5 10 58Q8 34 19 15.5Z" fill="url(#@ck)" ${Pe(1.4)}/><path d="M26 27Q24 41 21 53M38 27Q40 41 43 53M32 29V56" fill="none" stroke="${Ln(n, 0.6)}" stroke-width="1.2" stroke-linecap="round" opacity=".4"/><path d="M19 15.5Q11 30 10.5 50" fill="none" stroke="#ffffff" stroke-width="1" stroke-linecap="round" opacity=".35"/><path d="${e}" fill="none" stroke="${xe}" stroke-width="7" stroke-linecap="round"/><path d="${e}" fill="none" stroke="#efe3c8" stroke-width="4.8" stroke-linecap="round"/><path d="M15 53.5V57M20 51.5V55M25.5 52.5V56M32 55V58.5M38.5 52.5V56M44 51.5V55M49 53.5V57" stroke="#b9a57e" stroke-width=".9" stroke-linecap="round"/><path d="${t}" fill="url(#@fr)" ${Pe(1.3)}/><path d="M21 17.5L23 20.5M26 13L27.5 16M37 13L36 16M43 17.5L41 20.5M25 22.5L26.5 24.5M39 22.5L37.5 24.5M32 22.5V25.5" stroke="#b9a57e" stroke-width="1" stroke-linecap="round"/><ellipse cx="32" cy="14.5" rx="5.4" ry="2.7" fill="#061220"/><circle cx="32" cy="27.5" r="2.8" fill="#f3cf85" ${Pe(1)}/>`,
    );
  },
  undying_heart: (n) => {
    let t = "";
    for (let s = 0; s < 8; s++) {
      const [i, a] = Wo(32, 32, 20.2, s * 45 + 22.5);
      t += `<circle cx="${i}" cy="${a}" r="1.3" fill="#fff4d6" stroke="#6b4614" stroke-width=".5"/>`;
    }
    const e = (s) =>
      `<path d="${s}" stroke="${xe}" stroke-width="6" stroke-linecap="round"/><path d="${s}" stroke="${_4}" stroke-width="3.6" stroke-linecap="round"/>`;
    return dn(
      Mi(n),
      fn("rm", 10, 10, 54, 54, [
        [0, "#fff1c4"],
        [0.45, "#d9a548"],
        [1, "#6b4614"],
      ]) +
        Vo("ht", 27, 25, 26, [
          [0, Hn(n, 0.62)],
          [0.5, n],
          [1, Ln(n, 0.55)],
        ]) +
        je("g", n, 0.85) +
        je("gc", "#fff0f3", 0.9),
      We("g", 32, 32, 31) +
        e("M7 7L17 17") +
        e("M57 7L47 17") +
        e("M7 57L17 47") +
        e("M57 57L47 47") +
        `<circle cx="32" cy="32" r="23" fill="url(#@rm)" ${Pe(1.5)}/><circle cx="32" cy="32" r="17.2" fill="url(#@ht)" stroke="#6b4614" stroke-width="1.2"/>` +
        t +
        '<path d="M19.5 25A14.5 14.5 0 0 1 30 17.7" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" opacity=".6"/>' +
        We("gc", 32, 32, 12) +
        `<path d="M32 42L23.3 33Q20 27.5 24.7 24.7Q29.2 22.8 32 27.4Q34.8 22.8 39.3 24.7Q44 27.5 40.7 33Z" fill="#fff3f5" stroke="${Ln(n, 0.5)}" stroke-width="1" stroke-linejoin="round"/><path d="M26 28.5Q27.2 26.3 29.3 26.6" fill="none" stroke="${n}" stroke-width="1.1" stroke-linecap="round" opacity=".7"/>`,
    );
  },
  thorn_mail: (n) => {
    let t = "";
    for (let e = 0; e < 8; e++) {
      const [s, i] = Wo(32, 33, 14.5, e * 45 - 90);
      t += `<circle cx="${s}" cy="${i}" r="1.3" fill="#f1f8d8" stroke="${Ln(n, 0.6)}" stroke-width=".5"/>`;
    }
    return dn(
      Mi(n),
      Vo("bd", 26, 26, 30, [
        [0, Hn(n, 0.5)],
        [0.5, n],
        [1, Ln(n, 0.6)],
      ]) +
        fn("sp", 0, 4, 0, 62, [
          [0, "#f8fbe6"],
          [1, Ln(n, 0.15)],
        ]),
      `<path d="${Mr(32, 33, 8, 28.5, 15, -67.5)}" fill="url(#@sp)" ${Pe(1.2)}/><circle cx="32" cy="33" r="20" fill="url(#@bd)" ${Pe(1.5)}/><circle cx="32" cy="33" r="17.3" fill="none" stroke="${Ln(n, 0.55)}" stroke-width="1.2" opacity=".6"/><circle cx="32" cy="33" r="10.5" fill="none" stroke="${Ln(n, 0.6)}" stroke-width="1.3" opacity=".65"/><path d="M32 13V22.5M32 43.5V53M12 33H21.5M42.5 33H52" stroke="${Ln(n, 0.6)}" stroke-width="1.1" opacity=".5"/>` +
        t +
        `<path d="M17.5 25.5A16.5 16.5 0 0 1 28.5 16.8" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" opacity=".5"/><circle cx="32" cy="33" r="7" fill="${Ln(n, 0.35)}" ${Pe(1.2)}/><path d="${Mr(32, 33, 4, 9, 3, -90)}" fill="url(#@sp)" ${Pe(1)}/><circle cx="32" cy="33" r="1.6" fill="#ffffff"/>`,
    );
  },
};

function Po(n) {
  return tH[n](ln[n].color);
}

const Ye = 'fill="currentColor"',
  Ne = (n = 2.2) =>
    `fill="none" stroke="currentColor" stroke-width="${n}" stroke-linecap="round" stroke-linejoin="round"`;

function eH() {
  let t = "";
  for (let e = 0; e < 8; e++) {
    const s = (e * 360) / 8,
      i = [
        [s - 13, 7.4],
        [s - 8, 10.2],
        [s + 8, 10.2],
        [s + 13, 7.4],
      ];
    for (const [a, o] of i) {
      const r = ((a - 90) * Math.PI) / 180;
      t += `${t ? "L" : "M"}${(12 + Math.cos(r) * o).toFixed(2)} ${(12 + Math.sin(r) * o).toFixed(2)}`;
    }
  }
  return `${t}ZM12 8.4a3.6 3.6 0 1 0 0 7.2a3.6 3.6 0 1 0 0-7.2Z`;
}

const M3 = `<path d="M21.2 2.8l-1 5.6-8.9 8.9-3.6-3.6 8.9-8.9z" ${Ye}/><path d="M4.6 12.6l6.8 6.8M7.2 16.8l-3.6 3.6" ${Ne(2.5)}/>`,
  Vp =
    '<rect x="2.8" y="2.8" width="18.4" height="18.4" rx="3" fill="currentColor" fill-opacity=".12" stroke="currentColor" stroke-opacity=".5" stroke-width="1.4"/><rect x="4.6" y="15.6" width="3.8" height="3.8" rx=".8" fill="currentColor" fill-opacity=".55"/><rect x="15.6" y="4.6" width="3.8" height="3.8" rx=".8" fill="currentColor" fill-opacity=".55"/>',
  Zx = {
    kill: M3,
    death: `<path fill-rule="evenodd" d="M12 2.4c-4.8 0-8.2 3.2-8.2 7.7 0 2.6 1.2 4.6 3 5.9v2.8c0 .9.7 1.6 1.6 1.6h7.2c.9 0 1.6-.7 1.6-1.6V16c1.8-1.3 3-3.3 3-5.9 0-4.5-3.400-7.700-8.200-7.700zM8.700 8.600a2.300 2.300 0 1 0 0 4.600a2.300 2.300 0 1 0 0-4.600zM15.300 8.600a2.300 2.300 0 1 0 0 4.600a2.300 2.300 0 1 0 0-4.600zM12 13.400l-1.300 2.400h2.600zM10 17.600h.9v2.800H10zM13.100 17.600h.9v2.800h-.9z" ${Ye}/>`,
    assist: `<g ${Ye}><rect x="6.600" y="10" width="11" height="11.400" rx="3.600"/><rect x="6.600" y="4.800" width="2.300" height="8" rx="1.150"/><rect x="9.500" y="2.800" width="2.300" height="9" rx="1.150"/><rect x="12.400" y="3.200" width="2.300" height="9" rx="1.150"/><rect x="15.300" y="5.200" width="2.300" height="8" rx="1.150"/><rect x="2.900" y="11" width="2.500" height="7.200" rx="1.250" transform="rotate(-32 4.150 14.600)"/></g>`,
    cs: `<path fill-rule="evenodd" d="M5.500 9.500l-2-5.700 5 2.700a8.500 8.500 0 0 1 7 0l5-2.700-2 5.700c1 1.300 1.500 2.800 1.500 4.500 0 4-3.400 7-8 7s-8-3-8-7c0-1.700.5-3.200 1.500-4.500zM6.800 12.800l4 1.400v1.600l-4-.6zM17.200 12.800l-4 1.400v1.600l4-.6z" ${Ye}/>`,
    damage: `<path d="${Mr(12, 12, 8, 10.4, 4.6)}" ${Ye}/>`,
    shield: `<path fill-rule="evenodd" d="M12 2.200l8 3v6.300c0 5-3.400 8.500-8 10.300-4.600-1.800-8-5.300-8-10.300V5.200zM12 5l-5.400 2v4.500c0 3.300 2.200 5.900 5.400 7.300z" ${Ye}/>`,
    tower: `<path d="M12 1.800l3.600 6.200-1.700 7.500h-3.800L8.400 8z" ${Ye}/><path d="M5.500 10.500Q12 14 18.500 10.500" ${Ne(1.6)} opacity=".7"/><path d="M7 17.200h10l1.800 4.300H5.200z" ${Ye}/>`,
    core: `<path d="M12 1.800l6 7.200-6 9.200-6-9.200z" ${Ye}/><path d="M4 16.500Q12 22.500 20 16.500" ${Ne(1.8)}/><path d="M7.500 20.800h9" ${Ne(1.8)}/>`,
    monster: `<path d="M5 3.500C7.500 8.500 8 14 6 20.500M11 2.500C13.500 8 14 14.500 12 21.500M17 3.500C19.500 8.500 20 14 18 20.500" ${Ne(2.6)}/>`,
    heart: `<path d="M12 21l-8.200-8.200C1.500 10.300 2 6.300 5 4.600c2.400-1.300 5.200-.5 7 1.900 1.800-2.400 4.600-3.200 7-1.900 3 1.700 3.500 5.700 1.200 8.200z" ${Ye}/>`,
    mana: `<path d="M12 2.200c3.200 4.200 6.500 8 6.500 12a6.500 6.500 0 0 1-13 0c0-4 3.300-7.800 6.500-12z" ${Ye}/>`,
    level: `<path d="M12 3l7.500 8H15v4.500H9V11H4.500zM9 17.500h6v2.800H9z" ${Ye}/>`,
    crown: `<path d="M3.500 17.500L2 7l5.500 4.200L12 3.500l4.500 7.700L22 7l-1.500 10.500zM4 19.300h16v2.200H4z" ${Ye}/>`,
    settings: `<path fill-rule="evenodd" d="${eH()}" ${Ye}/>`,
    pause: `<rect x="5.500" y="4" width="4.600" height="16" rx="1.500" ${Ye}/><rect x="13.900" y="4" width="4.600" height="16" rx="1.500" ${Ye}/>`,
    play: `<path d="M7 3.800v16.400c0 .8.900 1.300 1.600.8l12-8.200c.6-.4.6-1.200 0-1.600l-12-8.200c-.7-.5-1.600 0-1.600.8z" ${Ye}/>`,
    close: `<path d="M5.500 5.500l13 13M18.500 5.500l-13 13" ${Ne(2.8)}/>`,
    check: `<path d="M4.500 12.500l5 5L19.500 7" ${Ne(2.9)}/>`,
    plus: `<path d="M12 4.500v15M4.500 12h15" ${Ne(2.8)}/>`,
    minus: `<path d="M4.500 12h15" ${Ne(2.8)}/>`,
    back: `<path d="M10.500 5L3.500 12l7 7M4.500 12H20.500" ${Ne(2.6)}/>`,
    chevron_left: `<path d="M14.500 4.500L7 12l7.500 7.500" ${Ne(2.8)}/>`,
    chevron_right: `<path d="M9.500 4.500L17 12l-7.500 7.500" ${Ne(2.8)}/>`,
    chevron_up: `<path d="M4.500 14.500L12 7l7.500 7.500" ${Ne(2.8)}/>`,
    chevron_down: `<path d="M4.500 9.500L12 17l7.500-7.500" ${Ne(2.8)}/>`,
    home: `<path d="M12 2.800L2.500 11h2.800v9.200h5v-6h3.400v6h5V11h2.800z" ${Ye}/>`,
    again: `<path d="M19.500 12a7.500 7.500 0 1 1-2.400-5.500" ${Ne(2.5)}/><path d="M20.500 2.800v5.400h-5.400z" ${Ye}/>`,
    lock: `<path d="M8 10.200V7.800a4 4 0 0 1 8 0v2.400" ${Ne(2.3)}/><path fill-rule="evenodd" d="M6.500 10h11c1 0 1.800.8 1.800 1.800v7.400c0 1-.8 1.800-1.800 1.800h-11c-1 0-1.800-.8-1.800-1.800v-7.400c0-1 .8-1.800 1.800-1.800zM12 13.200a1.700 1.700 0 0 0-.9 3.100v2h1.800v-2a1.700 1.700 0 0 0-.9-3.100z" ${Ye}/>`,
    info: `<circle cx="12" cy="12" r="9" ${Ne(2)}/><path d="M12 11v6" ${Ne(2.4)}/><circle cx="12" cy="7.600" r="1.400" ${Ye}/>`,
    clock: `<circle cx="12" cy="12" r="9" ${Ne(2)}/><path d="M12 6.800V12l3.600 2.400" ${Ne(2.2)}/>`,
    hourglass: `<path d="M6 3h12M6 21h12M7.500 3v3.500c0 2.500 4.500 4 4.500 5.500s-4.500 3-4.500 5.500V21M16.500 3v3.500c0 2.500-4.500 4-4.500 5.500s4.500 3 4.500 5.500V21" ${Ne(2)}/>`,
    eye: `<path d="M1.800 12C4.500 7.500 8 5.300 12 5.300S19.500 7.500 22.200 12c-2.700 4.500-6.200 6.700-10.200 6.700S4.500 16.500 1.800 12z" ${Ne(2)}/><circle cx="12" cy="12" r="3.200" ${Ye}/>`,
    target: `<circle cx="12" cy="12" r="7" ${Ne(2)}/><path d="M12 2v5M12 17v5M2 12h5M17 12h5" ${Ne(2.2)}/><circle cx="12" cy="12" r="1.800" ${Ye}/>`,
    cancel: `<circle cx="12" cy="12" r="9" ${Ne(2.3)}/><path d="M5.800 5.800l12.400 12.400" ${Ne(2.3)}/>`,
    shop: `<path fill-rule="evenodd" d="M9 2.800h6l-1.300 3.400c3.600 2.200 6.300 6.200 6.300 9.800 0 3.600-3 5.500-8 5.500s-8-1.900-8-5.500c0-3.600 2.700-7.600 6.300-9.800zM${hn(12, 14, 4.6, 0.2).slice(1)}" ${Ye}/>`,
    scoreboard: `<g ${Ye}><rect x="2.800" y="3.600" width="4.400" height="4.400" rx="1.100"/><rect x="9.300" y="4.600" width="12" height="2.400" rx="1.200"/><rect x="2.800" y="9.800" width="4.400" height="4.400" rx="1.100"/><rect x="9.300" y="10.800" width="12" height="2.400" rx="1.200"/><rect x="2.800" y="16" width="4.400" height="4.400" rx="1.100"/><rect x="9.300" y="17" width="12" height="2.400" rx="1.200"/></g>`,
    volume: `<path d="M3 9.200h3.600L12 4.500v15l-5.400-4.700H3z" ${Ye}/><path d="M15.300 8.500a5 5 0 0 1 0 7M18 5.800a8.800 8.800 0 0 1 0 12.400" ${Ne(2.1)}/>`,
    mute: `<path d="M3 9.200h3.600L12 4.500v15l-5.400-4.700H3z" ${Ye}/><path d="M15.500 9l5.500 6M21 9l-5.500 6" ${Ne(2.3)}/>`,
    sfx: `<path d="M3 9.200h3.600L12 4.500v15l-5.400-4.700H3z" ${Ye}/><path d="M${hn(18, 12, 4.8, 0.2).slice(1)}" ${Ye}/>`,
    music: `<path d="M8.800 18V5.800l10.400-2.300V15.500" ${Ne(2.2)}/><ellipse cx="6.300" cy="18" rx="3" ry="2.500" ${Ye}/><ellipse cx="16.700" cy="15.500" rx="3" ry="2.500" ${Ye}/>`,
    quality: `<path d="M12 2.500l7.500 6.500-7.500 12.500L4.500 9z" ${Ne(2)}/><path d="M4.500 9h15M9 9l3 12.500M15 9l-3 12.500M12 2.500L9 9M12 2.500l3 6.500" ${Ne(1.3)}/>`,
    fps: `<path d="M3.500 17a8.500 8.500 0 1 1 17 0" ${Ne(2.3)}/><path d="M12 17l4.500-7" ${Ne(2.5)}/><circle cx="12" cy="17" r="2" ${Ye}/>`,
    shake: `<rect x="6.500" y="6" width="11" height="12" rx="2.200" ${Ne(2.2)}/><circle cx="12" cy="12" r="2.400" ${Ye}/><path d="M2.500 8.500v7M21.500 8.500v7" ${Ne(2.2)}/>`,
    keyboard: `<rect x="2" y="5.500" width="20" height="13" rx="2.500" ${Ne(2)}/><path d="M6 9.500h1M10 9.500h1M14 9.500h1M18 9.500h.300M6 12.500h1M10 12.500h1M14 12.500h1M18 12.500h.300M8 15.500h8" ${Ne(1.8)}/>`,
    mouse: `<rect x="6.500" y="2.500" width="11" height="19" rx="5.500" ${Ne(2)}/><path d="M12 2.500v7M6.500 9.500h11" ${Ne(1.8)}/>`,
    touch: `<path d="M9.200 11.500V5.200a1.900 1.900 0 0 1 3.800 0v5.300l4.600 1.200c1.200.3 2 1.500 1.800 2.700l-.8 4.800c-.2 1.200-1.200 2-2.400 2h-4.500c-.8 0-1.500-.4-2-1l-4-5.200c-.6-.8-.4-1.900.4-2.400.7-.4 1.500-.3 2.100.2z" ${Ye}/><path d="M5.500 6.500a5.700 5.700 0 0 1 11.200-1.500" ${Ne(1.7)} opacity=".7"/>`,
    joystick: `<circle cx="12" cy="12" r="9.500" ${Ne(1.8)} opacity=".6"/><circle cx="12" cy="12" r="4.400" ${Ye}/>`,
    star: `<path d="${Mr(12, 12.6, 5, 10.2, 4.3)}" ${Ye}/>`,
    star_empty: `<path d="${Mr(12, 12.6, 5, 9.4, 4.1)}" ${Ne(1.7)}/>`,
    spark: `<path d="${hn(12, 12, 10.5, 0.18)}" ${Ye}/>`,
  },
  M4 = (n) => Zx[n],
  nH = Ye,
  sH = Ne;

function iH() {
  return Kh(
    24,
    `<defs>${fn("c", 4, 2, 20, 22, [
      [0, "#fff6d8"],
      [0.45, "#f3cf85"],
      [1, "#a8742c"],
    ])}${Vo("h", 9, 8, 9, [
      [0, "#ffffff", 0.9],
      [1, "#ffffff", 0],
    ])}</defs><circle cx="12" cy="12" r="10" fill="url(#@c)" stroke="#6b4614" stroke-width="1.200"/><circle cx="12" cy="12" r="7.200" fill="none" stroke="#8d6226" stroke-width="1" opacity=".8"/><path d="${hn(12, 12, 5.6, 0.22)}" fill="#7a5220"/><path d="${hn(12, 11.5, 5.2, 0.22)}" fill="#fff4d6"/><circle cx="9" cy="8" r="6" fill="url(#@h)"/>`,
    "sf-ico sf-ico--color",
  );
}

function Vt(n) {
  return n === "gold" ? iH() : Kh(24, Zx[n]);
}

[...Object.keys(Zx)];

const aH = {
  tank: `<path fill-rule="evenodd" d="M12 1.800l8.500 3.200v6.500c0 5.200-3.600 8.900-8.500 10.700-4.900-1.800-8.500-5.500-8.500-10.700V5zM12 4.700L6.200 6.900v4.600c0 3.600 2.400 6.300 5.800 7.800 3.400-1.500 5.800-4.200 5.800-7.800V6.900zM12 7.500l3.500 4.300-3.500 4.700-3.500-4.700z" ${Ye}/>`,
  fighter: `${M3}<g transform="matrix(-1 0 0 1 24 0)">${M3}</g>`,
  mage: `<path d="${hn(10, 13.5, 8.8, 0.2)}" ${Ye}/><path d="${hn(18.8, 5.6, 4, 0.2)}" ${Ye}/><path d="${hn(19.5, 18.2, 2.6, 0.2)}" ${Ye}/>`,
  marksman: `<path d="M6.500 2.800c8.500 3 8.500 15.400 0 18.400" ${Ne(2.5)}/><path d="M6.500 2.800v18.400" ${Ne(1.3)}/><path d="M2.500 12h14" ${Ne(2.2)}/><path d="M15.500 7.800L22.300 12l-6.800 4.200z" ${Ye}/>`,
  assassin: `<path d="M12 22.500l-3.400-12.300L12 7.200l3.400 3-3.400 12.300z" ${Ye}/><path d="M6.800 7h10.400" ${Ne(2.6)}/><path d="M12 1.800v4" ${Ne(3)}/><path d="M4 13.500l2.500 4M20 13.500l-2.500 4" ${Ne(1.7)} opacity=".75"/>`,
};

function Ar(n) {
  return Kh(24, aH[n]);
}

const oH = {
  top: `${Vp}<path d="M6.500 14.500V8.500q0-2 2-2h6" ${Ne(2.6)}/>`,
  mid: `${Vp}<path d="M8.300 15.700l7.400-7.400" ${Ne(2.6)}/>`,
  bot: `${Vp}<path d="M9.500 17.500h6q2 0 2-2v-6" ${Ne(2.6)}/>`,
  jungle: `${Vp}<path d="M12.200 6.200c2.800 1.600 3.800 4.400 2.600 7.400-.5 1.300-1.500 2.300-2.800 2.800-2.200-1.600-3-4-2.200-6.600.4-1.400 1.200-2.600 2.400-3.600zM12 11v6.800" fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>`,
};

function k3(n) {
  return Kh(24, oH[n]);
}

const S3 = { top: "上路", mid: "中路", bot: "下路", jungle: "打野" },
  T3 = {
    stun: { name: "眩晕", kind: "debuff" },
    airborne: { name: "击飞", kind: "debuff" },
    root: { name: "定身", kind: "debuff" },
    slow: { name: "减速", kind: "debuff" },
    silence: { name: "沉默", kind: "debuff" },
    shield: { name: "护盾", kind: "buff" },
    haste: { name: "加速", kind: "buff" },
    attack_speed: { name: "攻速提升", kind: "buff" },
    dmg_reduction: { name: "减伤", kind: "buff" },
    untargetable: { name: "不可选中", kind: "buff" },
    unstoppable: { name: "免疫控制", kind: "buff" },
    burn: { name: "灼烧", kind: "debuff" },
    recall: { name: "回城中", kind: "neutral" },
    restore: { name: "疗伤中", kind: "buff" },
    fountain: { name: "泉水回复", kind: "buff" },
    respawn_guard: { name: "复活保护", kind: "buff" },
    frost_insight: { name: "蓝buff", kind: "buff" },
    ember_might: { name: "红buff", kind: "buff" },
    star_blessing: { name: "巨灵buff", kind: "buff" },
    panyue_passive: { name: "覆盾震地", kind: "buff" },
    panyue_bulwark: { name: "拥盾怒目", kind: "buff" },
    mushroom_passive: { name: "菌丝缠缚", kind: "buff" },
    chijin_ember: { name: "越砍越勇", kind: "buff" },
    chijin_blaze: { name: "半路杀出 · 攻速", kind: "buff" },
    chijin_spin: { name: "抡圆了砍", kind: "buff" },
    xingli_mark: { name: "余音", kind: "debuff" },
    fengling_gale: { name: "连射", kind: "buff" },
    fengling_crit: { name: "下一箭必暴", kind: "buff" },
    yeque_shadow: { name: "得手", kind: "buff" },
    tower_focus: { name: "防御塔锁定", kind: "debuff" },
  },
  Ys = nH,
  Eo = sH;

function Hs(n, t) {
  return dn(
    [Hn(n, 0.3), Ln(n, 0.3), Ln(n, 0.82)],
    je("g", Hn(n, 0.55), 0.75),
    We("g", 32, 30, 27) +
      `<g transform="translate(8.8 10) scale(1.96)" style="color:#060a16" opacity=".5">${t}</g><g transform="translate(8 8) scale(2)" style="color:#ffffff">${t}</g>`,
  );
}

const k4 =
    "M12.500 1.800c.6 4.200 5.500 5.700 5.500 11.200a6 6 0 0 1-12 0c0-2.600 1.300-4.200 2.700-5.400.1 1.900.9 2.900 1.900 3.100-.2-3.300.3-6.400 1.900-8.900z",
  S4 = "M12 2.200l8 3v6.300c0 5-3.400 8.500-8 10.300-4.600-1.800-8-5.300-8-10.300V5.200z",
  rH = {
    stun: () =>
      Hs(
        "#c9a227",
        `<path d="M12 12.500a2 2 0 0 1 4 0a4 4 0 0 1-8 0a6 6 0 0 1 12 0" ${Eo(2.3)}/><path d="${hn(5.5, 6, 3.4)}" ${Ys}/><path d="${hn(18.5, 19.5, 2.6)}" ${Ys}/>`,
      ),
    airborne: () =>
      Hs(
        "#b9832e",
        `<path d="M12 2.500l7 7.500h-4.200v5H9.200v-5H5z" ${Ys}/><path d="M5 19.500h14M8 22h8" ${Eo(2)}/>`,
      ),
    root: () =>
      Hs(
        "#8a6a3a",
        `<path d="M3 21l3.500-11L10 21zM8.500 21L12 5l3.500 16zM14 21l3.500-11L21 21z" ${Ys}/><path d="M12 5v16M6.500 10v11M17.500 10v11" stroke="#060a16" stroke-opacity=".35" stroke-width="1"/>`,
      ),
    slow: () => Hs("#6c70c4", `<path d="M5 4.500l7 6.500 7-6.500M5 12.500l7 6.500 7-6.500" ${Eo(3)}/>`),
    silence: () =>
      Hs(
        "#7a4fb8",
        `<path d="M4 4.500h16v10.500h-9l-4.500 4v-4H4z" ${Eo(2.2)}/><path d="M4.500 21L19.500 3" ${Eo(2.6)}/>`,
      ),
    shield: () =>
      Hs(
        "#4f7fc8",
        `<path d="${S4}" ${Ys}/><path d="M12 5.200v13.800M7 8.500l5 2 5-2" stroke="#060a16" stroke-opacity=".3" stroke-width="1.200" fill="none"/>`,
      ),
    haste: () => Hs("#2f9e6a", `<path d="M4 5.500l7 6.500-7 6.500M12.500 5.500l7 6.500-7 6.500" ${Eo(3)}/>`),
    attack_speed: () => Hs("#c8642a", `${M4("kill")}<path d="M3 5h5M2 9h4" ${Eo(1.8)}/>`),
    dmg_reduction: () =>
      Hs(
        "#5f6f86",
        `<path fill-rule="evenodd" d="${S4}M10.700 7h2.600v5.200h2.700L12 17l-4-4.800h2.700z" ${Ys}/>`,
      ),
    untargetable: () =>
      Hs(
        "#6a55a8",
        `<circle cx="12" cy="12" r="9.500" ${Eo(1.8)} stroke-dasharray="3.200 3"/><circle cx="12" cy="9" r="3.200" ${Ys} opacity=".85"/><path d="M5.800 18.500c1-3.600 3.400-5 6.200-5s5.200 1.400 6.200 5z" ${Ys} opacity=".85"/>`,
      ),
    unstoppable: () =>
      Hs(
        "#c89a2a",
        `<path d="${Mr(12, 12, 8, 10.6, 5.2)}" ${Ys}/><circle cx="12" cy="12" r="2.600" fill="#060a16" fill-opacity=".4"/>`,
      ),
    burn: () =>
      Hs(
        "#c8402a",
        `<path d="${k4}" ${Ys}/><path d="M12 12.500c1.800 1.400 2.600 2.800 2.600 4.300a2.600 2.600 0 0 1-5.200 0c0-1.500.8-2.900 2.600-4.300z" fill="#060a16" fill-opacity=".35"/>`,
      ),
    recall: () => K1("recall"),
    restore: () => K1("heal"),
    fountain: () =>
      Hs(
        "#2a9fb8",
        `<path d="M12 2c2.800 3.700 5.500 6.800 5.500 10.200a5.500 5.500 0 0 1-11 0C6.500 8.800 9.200 5.700 12 2z" ${Ys}/><path d="M3.500 20.500q4.200-3 8.500 0t8.500 0" ${Eo(2)}/>`,
      ),
    respawn_guard: () =>
      Hs(
        "#c8a83a",
        `<circle cx="12" cy="12" r="4.600" ${Ys}/><g ${Eo(2.2)}>${[0, 45, 90, 135, 180, 225, 270, 315].map((n) => `<path d="M12 2v3" transform="rotate(${n} 12 12)"/>`).join("")}</g>`,
      ),
    frost_insight: () =>
      Hs(
        "#3a78d0",
        `<path d="${Mr(12, 12, 6, 10.6, 5.4)}" ${Ys}/><path d="M12 5v14M5.900 8.500l12.200 7M5.900 15.500l12.200-7" stroke="#060a16" stroke-opacity=".35" stroke-width="1.100"/><circle cx="12" cy="12" r="2" fill="#060a16" fill-opacity=".35"/>`,
      ),
    ember_might: () =>
      Hs(
        "#d0502a",
        `<path d="${k4}" ${Ys}/><path d="${hn(12, 15, 3.6, 0.2)}" fill="#060a16" fill-opacity=".5"/>`,
      ),
    star_blessing: () =>
      Hs(
        "#d8a83a",
        `<path d="${hn(10.5, 13, 8.8, 0.2)}" ${Ys}/><path d="${hn(19, 5.5, 3.8, 0.2)}" ${Ys}/><path d="${hn(19.5, 19, 2.4, 0.2)}" ${Ys}/>`,
      ),
    panyue_passive: () => Ia("panyue", "passive"),
    panyue_bulwark: () => Ia("panyue", "s2"),
    mushroom_passive: () => Ia("mushroom", "passive"),
    chijin_ember: () => Ia("chijin", "passive"),
    chijin_blaze: () => Ia("chijin", "s2"),
    chijin_spin: () => Ia("chijin", "ult"),
    xingli_mark: () => Ia("xingli", "passive"),
    fengling_gale: () => Ia("fengling", "passive"),
    fengling_crit: () => Ia("fengling", "s2"),
    yeque_shadow: () => Ia("yeque", "passive"),
    tower_focus: () => Hs("#c8303a", M4("target")),
  };

function lH(n) {
  return rH[n]();
}

function cH(n, t) {
  return t === "s1" || t === "s2" || t === "ult" ? Ia(n, t) : K1(t);
}

const Ml = kr,
  Tf = { tank: "#8fb8e8", fighter: "#ff9466", mage: "#9aa8ff", marksman: "#7fe6b6", assassin: "#c3a0ff" },
  fH = { survive: "生存", damage: "输出", control: "控制", mobility: "机动", ease: "上手" },
  Ad = ["survive", "damage", "control", "mobility", "ease"],
  dH = {
    tank: "皮厚能扛，冲在最前面替队友挡伤害",
    fighter: "能打也能扛，贴上去近身缠斗",
    mage: "站在后排放法术，伤害高、身板脆",
    marksman: "远远地普攻输出，越到后期越厉害",
    assassin: "专挑残血和脆皮下手，来去都快",
  },
  hH = {
    panyue: { survive: 9.6, damage: 4.6, control: 9.4, mobility: 5.4, ease: 9 },
    chijin: { survive: 7.2, damage: 7.6, control: 4.4, mobility: 7.4, ease: 7 },
    xingli: { survive: 4.2, damage: 9, control: 8, mobility: 2.6, ease: 6.2 },
    fengling: { survive: 3.8, damage: 9.6, control: 5, mobility: 6.8, ease: 6.6 },
    yeque: { survive: 5.4, damage: 9.2, control: 3.4, mobility: 9.6, ease: 3.6 },
    mushroom: { survive: 9.4, damage: 4.2, control: 9.2, mobility: 7.2, ease: 8.6 },
  },
  hh = {
    easy: { label: "简单", desc: "敌人反应慢、技能不准、很少越线；队友也不强，输赢看你。适合第一次玩。" },
    normal: { label: "普通", desc: "AI 会补兵换血、游走抱团，接近普通玩家。" },
    hard: { label: "困难", desc: "AI 反应快，会集火、反蹲与连招收割。" },
  },
  uH = ["easy", "normal", "hard"],
  Z1 = new Set();

function Zh(n, t, e) {
  const s = Se[t],
    i = z("span", `sf-portrait${e ? ` ${e}` : ""}`, _e(Ar(s.role), "sf-portrait__fallback"));
  (i.style.setProperty("--sf-hero-a", s.palette.primary),
    i.style.setProperty("--sf-hero-b", s.palette.secondary),
    i.style.setProperty("--sf-hero-c", s.palette.glow));
  let a = "";
  try {
    a = n.portrait(t);
  } catch {
    a = "";
  }
  if (a) {
    const o = document.createElement("img");
    ((o.alt = z0(s)), (o.draggable = !1));
    const r = Z1.has(a);
    ((o.decoding = r ? "sync" : "async"),
      r && i.classList.add("is-loaded"),
      o.addEventListener("load", () => {
        (Z1.add(a), i.classList.add("is-loaded"));
      }),
      o.addEventListener("error", () => {
        (i.classList.remove("is-loaded"), o.remove());
      }),
      (o.src = a),
      i.appendChild(o));
  }
  return i;
}

function pH(n, t) {
  const e = [],
    s = new Set();
  for (const i of t) {
    let a = "";
    try {
      a = n.portrait(i);
    } catch {
      a = "";
    }
    !a ||
      s.has(a) ||
      Z1.has(a) ||
      (s.add(a),
      e.push(
        new Promise((o) => {
          const r = new Image(),
            l = () => {
              (Z1.add(a), o());
            };
          ((r.src = a),
            typeof r.decode == "function"
              ? r.decode().then(l, () => o())
              : (r.addEventListener("load", l), r.addEventListener("error", () => o())));
        }),
      ));
  }
  return Promise.all(e).then(() => {});
}

function T4(n, t = 3) {
  const e = z("span", "sf-stars");
  e.setAttribute("aria-label", `难度 ${n} / ${t}`);
  for (let s = 0; s < t; s++) e.appendChild(_e(Vt(s < n ? "star" : "star_empty"), s < n ? "is-on" : ""));
  return e;
}

function rk(n) {
  const t = Math.max(0, Math.floor(n));
  return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
}

function kl(n) {
  const t = Math.round(n);
  return t >= 1e4 ? `${(t / 1e3).toFixed(1)}k` : String(t);
}

function ks(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function Qx(n, t) {
  Jx();
  const e = Se[n],
    s = z("small", "sf-heroname__role", ` · ${e.roleName}`),
    i = z("span", `sf-heroname${t ? ` ${t}` : ""}`, e.name, s);
  return (i.style.setProperty("--role", Tf[e.role]), i);
}

const mH = Jn(`
.sf-heroname { white-space: nowrap; }
.sf-heroname__role { font-size: 0.72em; font-weight: 600; letter-spacing: 0.04em; color: var(--role, var(--sf-c-text-2)); -webkit-text-fill-color: var(--role, var(--sf-c-text-2)); }
/* 技能类型标签：胶囊形，文字用标签色，底色为标签色 14% 不透明度，1px 同色 45% 描边。颜色只是辅助，文字永远在 */
.sf-stags { display: inline-flex; flex-wrap: wrap; align-items: center; gap: 4u 5u; vertical-align: middle; }
.sf-stag {
  --tag: 243, 207, 133;
  display: inline-flex; align-items: center; flex: none; height: 1.7em; padding: 0 0.62em; border-radius: 99px; font-size: var(--sf-fs-xs); font-weight: 700; line-height: 1; letter-spacing: 0.06em; white-space: nowrap;
  color: rgb(var(--tag)); background: rgba(var(--tag), 0.14); box-shadow: inset 0 0 0 1px rgba(var(--tag), 0.45);
}
/* 「大招」：金色实底、深色字；「被动」：青色描边、不铺底 */
.sf-stag.is-ult { color: #2b1a04; background: var(--sf-grad-gold); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6); }
.sf-stag.is-passive { --tag: 143, 233, 255; background: none; }
`);

function Jx() {
  Zn("sf-skill-tags", mH);
}

function lk(n) {
  const t = parseInt(n.slice(1), 16);
  return `${(t >> 16) & 255}, ${(t >> 8) & 255}, ${t & 255}`;
}

function ty(n, t) {
  let e =
    n === "ult"
      ? '<span class="sf-stag is-ult">大招</span>'
      : n === "passive"
        ? '<span class="sf-stag is-passive">被动</span>'
        : "";
  for (const s of t ?? []) {
    // 表里没有的标签直接跳过：以前这里取到 undefined 会让整个提示框崩掉
    const i = w3[s];
    if (!i) continue;
    e += `<span class="sf-stag" style="--tag:${lk(i.color)}">${i.name}</span>`;
  }
  return e ? `<span class="sf-stags">${e}</span>` : "";
}

function ck(n, t) {
  if (n === "ult") return { text: "大招", color: "#ffe7ad" };
  if (n === "passive") return { text: "被动", color: "#8fe9ff" };
  const e = t?.[0];
  return e ? { text: w3[e].short, color: w3[e].color } : null;
}

const gH = Jn(`
.sf-tip__brief { margin-top: 2u; font-size: var(--sf-fs-sm); font-weight: 600; line-height: 1.45; color: var(--sf-c-text); }
.sf-tip__statgrid { display: grid; grid-template-columns: auto auto; justify-content: space-between; gap: 1u 18u; margin-top: 6u; padding-top: 6u; box-shadow: inset 0 1px 0 var(--sf-c-line); }
.sf-tip__statgrid > span { color: var(--sf-c-text-2); }
.sf-tip__statgrid > b { color: var(--sf-c-cyan-300); font-weight: 700; text-align: right; }
.sf-tip__note { margin-top: 6u; font-size: var(--sf-fs-xs); color: var(--sf-c-text-3); }
`);

function fk(n, t) {
  Zn("sf-hud-itemtip", gH);
  const e = n.brief ? `<div class="sf-tip__brief">${ks(n.brief)}</div>` : "",
    s = ek(n.stats)
      .map((r) => `<span>${ks(r.label)}</span><b class="sf-num">${ks(r.value)}</b>`)
      .join(""),
    i = s ? `<div class="sf-tip__statgrid">${s}</div>` : "",
    a = n.passive
      ? `<div class="sf-tip__passive"><b>被动 · ${ks(n.passive.name)}</b>　${ks(n.passive.desc)}</div>`
      : "";
  return `<div class="sf-tip__title"><span>${ks(n.name)}</span><span class="sf-tip__meta sf-num">${n.cost} 金币</span></div>${e}${i}${a}`;
}

function ey() {
  if (typeof window > "u") return "kbm";
  const n = "ontouchstart" in window || (typeof navigator < "u" && navigator.maxTouchPoints > 0);
  let t = !1;
  try {
    t = window.matchMedia("(pointer: coarse)").matches;
  } catch {
    t = !1;
  }
  return n && t ? "touch" : "kbm";
}

const dk = {
    quality: "high",
    masterVolume: 0.8,
    sfxVolume: 0.9,
    musicVolume: 0.5,
    showFps: !1,
    cameraShake: !0,
    autoBuy: !0,
    tutorial: !0,
    objectiveHints: !0,
  },
  hk = "starfall.settings.v1",
  L2 = (n, t) => (typeof n == "number" && Number.isFinite(n) ? Math.max(0, Math.min(1, n)) : t),
  xH = (n) => n === "low" || n === "medium" || n === "high";

function yH(n) {
  const t = { ...dk, ...n },
    e = $8(hk);
  return (
    e &&
      typeof e == "object" &&
      (xH(e.quality) && (t.quality = e.quality),
      (t.masterVolume = L2(e.masterVolume, t.masterVolume)),
      (t.sfxVolume = L2(e.sfxVolume, t.sfxVolume)),
      (t.musicVolume = L2(e.musicVolume, t.musicVolume)),
      typeof e.showFps == "boolean" && (t.showFps = e.showFps),
      typeof e.cameraShake == "boolean" && (t.cameraShake = e.cameraShake),
      typeof e.autoBuy == "boolean" && (t.autoBuy = e.autoBuy),
      typeof e.tutorial == "boolean" && (t.tutorial = e.tutorial),
      typeof e.objectiveHints == "boolean" && (t.objectiveHints = e.objectiveHints)),
    t
  );
}

function vH(n) {
  Wx(hk, JSON.stringify(n));
}

const bH = 700,
  E4 = {
    low: "关闭阴影与后期特效，帧率最高，适合低端设备或省电。",
    medium: "中等精度阴影与轻量泛光，画面与流畅度均衡。",
    high: "高精度阴影、泛光、调色与抗锯齿，画面最佳。",
  },
  _H = Jn(`
.sf-settings { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, max(250px, 300u)), 1fr)); gap: 16u 36u; }
.sf-settings__group { display: flex; flex-direction: column; gap: 2u; min-width: 0; }
.sf-settings__group > .sf-heading { margin-bottom: 6u; }
.sf-settings .sf-field { grid-template-columns: minmax(max(92px, 104u), max-content) 1fr; }
.sf-settings__row { cursor: pointer; border-radius: 6u; }
.sf-settings__quality { margin-top: 2u; }
/* 带说明小字的开关行：说明紧贴在行下面 */
.sf-settings__row.has-hint { min-height: max(34px, 38u); }
.sf-settings__row.has-hint + .sf-field__hint { margin: -1u 0 8u; }
.sf-settings .sf-field__hint.is-warn { color: var(--sf-c-amber); }
/* 「重看」：做成带描边的小按钮(原来是贴在开关左边的一行灰色小字，像说明文字，手机上也不好点) */
.sf-settings__replay {
  flex: none; display: inline-grid; place-items: center; min-width: max(44px, 48u); min-height: max(32px, 34u); padding: 0 11u; border-radius: 99px;
  font-size: var(--sf-fs-sm); font-weight: 700; line-height: 1; color: var(--sf-c-text); white-space: nowrap; text-decoration: none;
  background: rgba(150, 178, 235, 0.12); box-shadow: inset 0 0 0 1px rgba(150, 178, 235, 0.55);
}
@media (hover: hover) { .sf-settings__replay:hover { color: var(--sf-c-text); background: rgba(150, 178, 235, 0.24); } }
.sf-settings__replay:active { transform: scale(0.95); }
.sf-settings__foot { display: flex; align-items: center; gap: 12u; width: 100%; }
.sf-settings__foot > .sf-link { margin-right: auto; }
.sf-dialog--settings .sf-dialog__foot { padding-top: 12u; padding-bottom: 14u; }
@media (orientation: portrait) {
  .sf-settings__foot { flex-wrap: wrap; justify-content: flex-end; }
  .sf-settings__foot > .sf-link { flex-basis: 100%; justify-content: flex-start; }
}
`);

function wH(n) {
  (Hf(), Zn("sf-settings", _H));
  const t = n.mode ?? "menu",
    e = (w) => `${Math.round(w * 100)}`,
    s = z("p", "sf-field__hint"),
    i = V8({
      options: [
        { value: "low", label: "低" },
        { value: "medium", label: "中" },
        { value: "high", label: "高" },
      ],
      value: n.get().quality,
      label: "画质",
      onChange: (w) => {
        (n.update({ quality: w }), (s.textContent = E4[w]));
      },
    });
  let a = 0;
  const o = () => {
      (window.clearTimeout(a), (a = 0));
    },
    r = (w, T, E, A, C) => {
      const R = j8({
          value: n.get()[E],
          label: w,
          onChange: (P) => {
            (E === "tutorial" && o(), n.update({ [E]: P }), E === "autoBuy" && u());
          },
        }),
        I = z(
          "div",
          `sf-field sf-settings__row${A ? " has-hint" : ""}`,
          z("span", "sf-field__label", _e(T), w),
          z("span", "sf-field__ctl", C, R.el),
        );
      return (
        (I.dataset.sfSnd = "click"),
        I.addEventListener("click", () => R.flip()),
        { row: I, toggle: R, hint: A ? z("p", "sf-field__hint", A) : null }
      );
    },
    l = r("显示帧率", Vt("fps"), "showFps"),
    c = r("镜头震动", Vt("shake"), "cameraShake"),
    f = t === "match" ? z("button", "sf-link sf-settings__replay", "重看") : null,
    d = "金币够了自动购买推荐出装的下一件，阵亡时也会买。",
    h = r("自动出装", Vt("shop"), "autoBuy", d);
  function u() {
    if (!h.hint) return;
    const w = n.autoBuyNote?.() ?? null;
    ((h.hint.textContent = w ?? d), h.hint.classList.toggle("is-warn", w !== null));
  }
  const m = r("当前目标提示", Vt("target"), "objectiveHints", "在屏幕上方提示现在该做什么。"),
    x = r("新手引导", Vt("info"), "tutorial", "开局一步步教操作；打完一局后自动关闭。", f);
  f &&
    ((f.type = "button"),
    (f.dataset.sfSnd = "confirm"),
    f.setAttribute("aria-label", "从第一步重看新手引导"),
    f.addEventListener("click", (w) => {
      (w.stopPropagation(), o());
      const T = () => {
        ((a = 0), n.update({ tutorial: !0 }));
      };
      (n.get().tutorial
        ? n.onReplayTutorial
          ? n.onReplayTutorial()
          : (n.update({ tutorial: !1 }), (a = window.setTimeout(T, bH)))
        : T(),
        x.toggle.set(!0),
        (f.textContent = "已从头开始"),
        window.setTimeout(() => {
          f.textContent = "重看";
        }, 1600));
    }));
  const p = (w, T, E) => {
      const A = z("span", "sf-field__val sf-num", e(n.get()[E])),
        C = EB({
          value: n.get()[E],
          label: w,
          onInput: (I) => {
            ((A.textContent = e(I)), n.update({ [E]: I }));
          },
          onCommit: () => {
            E !== "musicVolume" && n.audio?.ui("select");
          },
        });
      return {
        row: z(
          "div",
          "sf-field",
          z("span", "sf-field__label", _e(T), w),
          z("span", "sf-field__ctl", C.el, A),
        ),
        slider: C,
        val: A,
      };
    },
    g = p("主音量", Vt("volume"), "masterVolume"),
    y = p("音效", Vt("sfx"), "sfxVolume"),
    v = p("音乐", Vt("music"), "musicVolume"),
    _ = z(
      "div",
      "sf-settings",
      z(
        "section",
        "sf-settings__group sf-settings__group--assist",
        z("h3", "sf-heading", "对战辅助"),
        h.row,
        h.hint,
        m.row,
        m.hint,
        x.row,
        x.hint,
      ),
      z(
        "section",
        "sf-settings__group",
        z("h3", "sf-heading", "画面"),
        z(
          "div",
          "sf-field",
          z("span", "sf-field__label", _e(Vt("quality")), "画质"),
          z("span", "sf-field__ctl sf-settings__quality", i.el),
        ),
        s,
        l.row,
        c.row,
      ),
      z("section", "sf-settings__group", z("h3", "sf-heading", "声音"), g.row, y.row, v.row),
    ),
    k = () => {
      const w = n.get();
      (i.set(w.quality),
        (s.textContent = E4[w.quality]),
        l.toggle.set(w.showFps),
        c.toggle.set(w.cameraShake),
        h.toggle.set(w.autoBuy),
        u(),
        m.toggle.set(w.objectiveHints),
        x.toggle.set(w.tutorial || a !== 0),
        g.slider.set(w.masterVolume),
        (g.val.textContent = e(w.masterVolume)),
        y.slider.set(w.sfxVolume),
        (y.val.textContent = e(w.sfxVolume)),
        v.slider.set(w.musicVolume),
        (v.val.textContent = e(w.musicVolume)));
    };
  k();
  const M = z("button", "sf-link", _e(Vt("again")), "恢复默认");
  ((M.type = "button"),
    (M.dataset.sfSnd = "click"),
    M.addEventListener("click", () => {
      const { quality: w, tutorial: T, ...E } = dk;
      (n.update(E), k());
    }));
  const S = z("div", "sf-settings__foot", M);
  let b = 0;
  if (t === "match") {
    const w = po({ label: "返回主菜单", icon: Vt("home"), variant: "ghost", sound: "back" }),
      T = w.querySelector(".sf-btn__label");
    let E = !1;
    (w.addEventListener("click", () => {
      if (E) {
        (window.clearTimeout(b), n.onQuit?.());
        return;
      }
      ((E = !0),
        w.classList.remove("sf-btn--ghost"),
        w.classList.add("sf-btn--danger"),
        (T.textContent = "再点一次确认退出"),
        (b = window.setTimeout(() => {
          ((E = !1),
            w.classList.add("sf-btn--ghost"),
            w.classList.remove("sf-btn--danger"),
            (T.textContent = "返回主菜单"));
        }, 3e3)));
    }),
      S.append(
        w,
        po({
          label: "继续游戏",
          icon: Vt("play"),
          variant: "primary",
          sound: "confirm",
          onClick: () => n.onResume?.(),
        }),
      ));
  } else S.append(po({ label: "完成", variant: "primary", sound: "confirm", onClick: () => n.onResume?.() }));
  return { el: _, footer: S, refresh: k, dispose: () => window.clearTimeout(b) };
}

function ny(n, t) {
  const e = { dialog: null },
    s = wH({
      ...t,
      onResume: () => {
        (e.dialog?.close(), t.onResume?.());
      },
      onQuit: () => {
        (e.dialog?.close(), t.onQuit?.());
      },
    }),
    i = X8(n, {
      title: t.title ?? (t.mode === "match" ? "游戏暂停" : "设置"),
      content: s.el,
      footer: s.footer,
      width: G8(780),
      cls: "sf-dialog--settings",
      onClose: () => {
        (s.dispose(), t.onClose?.());
      },
    });
  return ((e.dialog = i), i);
}
export { Po, Vt, Ar, k3, S3, T3, lH, cH, Ml, Tf, fH, Ad, dH, hH, hh, uH, Zh, pH, T4, rk, kl, ks, Qx, Jx, lk, ty, ck, fk, ey, yH, vH, ny };
