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
import { kartSpec } from './47-kart.js';
import { $8, EB, G8, Hf, Jn, V8, Wx, X8, Zn, _e, j8, po, z } from './32-ui.js';
import { B0, C2, Hn, Ia, K1, KB, Kh, Ln, Mi, Mr, Pe, Vo, We, Wo, _4, ak, dn, ek, fn, hn, ik, je, ln, ok, sk, w3, w4, xe } from './33-data-2.js';

// 装备图标的轮廓：本色压暗 45% 的软边，不是黑线。
// 全局原语 Pe() 画的是 #070b16 黑描边，装备这边一律不用它——深色背景上一圈黑边最显廉价；
// 同色暗边只负责把形状从底色里"托"出来，受光面另外描一条白亮边（eL）。
const eP = (n, w = 1.2) => `stroke="${Ln(n, 0.55)}" stroke-width="${(w * 0.8).toFixed(2)}" stroke-linejoin="round"`;

const tH = {
  slippers: (n) => {
    const t = B0(n, "#e9c873", 0.6),
      e = (i) =>
        `<path d="${i}" fill="none" stroke="${Ln(n, 0.5)}" stroke-width="4.8" stroke-linecap="round" stroke-linejoin="round"/><path d="${i}" fill="none" stroke="${Hn(t, 0.35)}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`;
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
        `<path d="M8 46Q8 42 12 42H46Q52 42 56.5 37.5Q60 41 58 47Q55.5 53.5 48 53.5H13Q8 53.5 8 49.5Z" fill="url(#@sl)" ${eP(n, 1.4)}/><path d="${s}" stroke="${Ln(t, 0.55)}" stroke-width="1.1" stroke-linecap="round" opacity=".7"/><path d="M10.5 44H47Q52 44 55.5 41" fill="none" stroke="#ffffff" stroke-width="1.1" stroke-linecap="round" opacity=".45"/>` +
        e("M23 42Q25 31 31.5 31Q39 33 45 42") +
        e("M41 42Q45 33.5 51.5 39") +
        `<circle cx="31.5" cy="31" r="3.2" fill="${Hn(t, 0.5)}" ${eP(n, 1.1)}/>`,
    );
  },
  liberation_shoes: (n) =>
    C2(
      n,
      w4("pl", 16, 10, 30, 36),
      "",
      `<path d="M17 13H28V28.5L22.5 34L17 28.5Z" fill="url(#@pl)" ${eP(n, 1.1)}/><path d="M22.5 15V31" stroke="#ffffff" stroke-width="1" opacity=".7"/><path d="M37 36.5L44 40Q49 42.5 49 48V51H35.5Z" fill="url(#@pl)" ${eP(n, 1.1)}/><circle cx="19.5" cy="15.5" r="1" fill="#070b16" fill-opacity=".55"/><circle cx="25.5" cy="15.5" r="1" fill="#070b16" fill-opacity=".55"/><circle cx="39" cy="48" r="1" fill="#070b16" fill-opacity=".55"/><circle cx="45.5" cy="48" r="1" fill="#070b16" fill-opacity=".55"/><path d="M11.5 3.5H33.5L31.5 9.5H13.5Z" fill="${Hn(n, 0.45)}" ${eP(n, 1.1)}/>`,
    ),
  canvas_shoes: (n) =>
    C2(
      n,
      je("gs", "#ffe7ad", 1),
      "",
      '<path d="M13.5 6H31.5V9.2H13.5Z" fill="#f3cf85"/>' +
        We("gs", 23, 25, 12) +
        `<path d="${hn(23, 25, 7.5, 0.2)}" fill="#fff4d6" stroke="#8a5a14" stroke-width=".7"/><path d="M14.5 54H49.5" stroke="#8fe9ff" stroke-width="1.6" stroke-linecap="round"/><path d="${hn(45, 22, 3.4)}" fill="#ffffff"/><path d="${hn(52, 33, 2.4)}" fill="#c9f6ff"/><circle cx="40" cy="12" r="1.2" fill="#c9f6ff"/>`,
    ),
  running_shoes: (n) =>
    C2(
      n,
      fn("wg", 2, 10, 24, 38, [
        [0, "#ffffff"],
        [1, Hn(n, 0.55)],
      ]),
      `<path d="M0 50H9M3 44H9" stroke="${Hn(n, 0.5)}" stroke-width="1.6" stroke-linecap="round" opacity=".6"/>`,
      `<path d="M25 27Q9 23 2 9Q13 14 25 18Z" fill="url(#@wg)" ${eP(n, 1.1)}/><path d="M25 32Q11 31 3 21Q13 24.5 25 25.5Z" fill="url(#@wg)" ${eP(n, 1.1)}/><path d="M25 37Q14 38.5 7 32.5Q15 33.5 25 32Z" fill="url(#@wg)" ${eP(n, 1.1)}/><circle cx="25.5" cy="27.5" r="3" fill="#f3cf85" ${eP(n, 1)}/>`,
    ),
  // ══ 下面是"现代市井"的十个形制，按外形分族，所有装备都指到其中之一 ══
  // 一件手绘图标是 20~40 行 SVG，63 件挨个画不现实；同族共用一套画法、只换配色，
  // 视觉上仍然是"一套里的"。要单独美化某一件，就在 tH 里加同名键覆盖 tHx。

  // 棍棒：警棍 / 钢管 / 铁链 / 指虎 / 扳手 / 球棒 / 大锤 / 撬棍 / 哑铃 / 钢钉
  // 棍棒族：同一根"杆"，靠长度/角度/粗细和末端零件分出不同武器。
  // v 由 tHx 的第二项给：0 警棍 1 钢管 2 伸缩警棍 3 撬棍 4 球棒 5 大铁锤 6 拆迁大锤
  blunt: (n, v = 0) => {
    const g = 'url(#@bd)',
      rod = (x1, y1, x2, y2, w) =>
        `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${Ln(n, 0.68)}" stroke-width="${(w + 2.6).toFixed(1)}" stroke-linecap="round" opacity=".45"/><path d="M${x1} ${y1}L${x2} ${y2}" stroke="${g}" stroke-width="${w}" stroke-linecap="round"/>`,
      hi = (x1, y1, x2, y2, o = 0.5) =>
        `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" opacity="${o}"/>`;
    let s;
    if (v === 0) {
      // 警棍：直棍 + 握把防滑纹 + 端帽
      s = rod(21, 53, 43, 17, 9) + hi(23.5, 49, 30, 38) +
        `<circle cx="44" cy="16" r="6.6" fill="${g}" ${eP(n, 1.1)}/>` +
        `<path d="M22.5 50.5l4-7M26.5 44l4-7" stroke="${Ln(n, 0.5)}" stroke-width="1.6" stroke-linecap="round" opacity=".8"/>`;
    } else if (v === 1) {
      // 钢管：又长又细，两头是空心的开口
      s = rod(25, 55, 38, 9, 8) +
        `<ellipse cx="38" cy="9.5" rx="3.6" ry="1.9" fill="${Ln(n, 0.55)}"/><ellipse cx="25" cy="54.5" rx="3.6" ry="1.9" fill="${Ln(n, 0.55)}"/>` +
        hi(27.5, 48, 36, 18, 0.55);
    } else if (v === 2) {
      // 伸缩警棍：两节，中间一个台阶
      s = rod(19, 54, 30, 36, 11) + rod(30, 36, 45, 13, 7.4) +
        `<circle cx="30" cy="36" r="5.4" fill="${Ln(n, 0.22)}" ${eP(n, 1)}/>` +
        hi(21.5, 50, 28.5, 40, 0.5);
    } else if (v === 3) {
      // 撬棍：顶端弯钩，底端扁头
      s = rod(22, 52, 40, 18, 7.4) +
        `<path d="M40 18q3-7 10-6" fill="none" stroke="${Ln(n, 0.68)}" stroke-width="9.4" stroke-linecap="round" opacity=".45"/><path d="M40 18q3-7 10-6" fill="none" stroke="${g}" stroke-width="7" stroke-linecap="round"/>` +
        `<path d="M17.5 54.5l7-4.4 3 5.2-7.6 3.4z" fill="${g}" ${eP(n, 1.1)}/>` +
        hi(24, 48, 37, 23);
    } else if (v === 4) {
      // 棒球棍：细柄到粗头的锥形
      s = `<path d="M23 55c-3-3-2-6 1-9l14-16c3-4 8-6 11-3s2 8-2 11L33 52c-3 3-7 5-10 3Z" fill="${g}" ${eP(n, 1.2)}/>` +
        `<path d="M45 30c3-3 6-4 8-2" fill="none" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round" opacity=".45"/>` +
        `<path d="M24.5 52l3-4M28 47l3-4M31.5 42l3-4" stroke="${Ln(n, 0.5)}" stroke-width="1.4" stroke-linecap="round" opacity=".6"/>`;
    } else if (v === 5) {
      // 大铁锤：竖柄 + 横锤头
      s = rod(31, 26, 31, 56, 8) +
        `<path d="M13 11h38c1.6 0 2.6 1 2.6 2.6v11c0 1.6-1 2.6-2.6 2.6H13c-1.6 0-2.6-1-2.6-2.6v-11C10.4 12 11.4 11 13 11Z" fill="${g}" ${eP(n, 1.3)}/>` +
        `<path d="M16 14.5h32" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" opacity=".5"/>` +
        `<path d="M13 24.5h38" stroke="${Ln(n, 0.55)}" stroke-width="1.1" opacity=".55"/>`;
    } else {
      // 拆迁大锤：两头都是锤面，柄更长
      s = rod(32, 24, 32, 58, 8) +
        `<path d="M8 12h14v13H8zM42 12h14v13H42z" fill="${g}" ${eP(n, 1.2)}/>` +
        `<path d="M22 15h10M22 22h10M32 15h10M32 22h10" stroke="${Ln(n, 0.5)}" stroke-width="1.1" opacity=".55"/>` +
        `<path d="M10.5 15h9" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" opacity=".5"/>`;
    }
    return dn(
      Mi(n),
      fn('bd', 8, 8, 56, 56, [[0, Hn(n, 0.46)], [0.18, Hn(n, 0.04)], [0.52, Ln(n, 0.16)], [1, Ln(n, 0.74)]]) + je('gw', Hn(n, 0.5), 0.34),
      We('gw', 32, 32, 26) + s,
    );
  },

  // 瓶装：敌敌畏 / 杀虫喷雾 / 防狼喷雾 / 二锅头 / 藿香正气水 / 药酒罐 / 野生狗奶
  // 瓶装族：0 细颈农药瓶 1 喷罐 2 提手大桶 3 小药瓶 4 奶瓶 5 二踢脚
  bottle: (n, v = 0) => {
    const g = 'url(#@bt)';
    let s;
    if (v === 0) {
      // 敌敌畏 / 二锅头：细长颈 + 大标签
      s = `<path d="M28 8h10v6.5c0 3 4.5 5.5 4.5 10V53c0 2.6-2 4.5-4.5 4.5H28c-2.6 0-4.5-1.9-4.5-4.5V24.5c0-4.5 4.5-7 4.5-10Z" fill="${g}" ${eP(n, 1.3)}/>` +
        `<path d="M25.5 6.5h15v4.5h-15z" fill="${Ln(n, 0.5)}" ${eP(n, 1.1)}/>` +
        `<path d="M23.5 31h19v11h-19z" fill="#f4f7fb" opacity=".85"/>` +
        `<path d="M27 36.5h12" stroke="${Ln(n, 0.55)}" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>` +
        `<path d="M27.5 22.5v26" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity=".4"/>`;
    } else if (v === 1) {
      // 杀虫喷雾 / 防狼喷雾：矮胖罐 + 喷头 + 扳机
      s = `<path d="M23 20h18v30c0 2.6-2 4.4-4.4 4.4H27.4C25 54.4 23 52.6 23 50Z" fill="${g}" ${eP(n, 1.3)}/>` +
        `<path d="M25.5 14h13v6.4h-13z" fill="${Ln(n, 0.35)}" ${eP(n, 1.1)}/>` +
        `<path d="M38.5 15.5h8v3.4h-8z" fill="${Hn(n, 0.35)}" ${eP(n, 1)}/>` +
        `<path d="M36 19h4.6v6H36z" fill="${Ln(n, 0.25)}"/>` +
        `<path d="M23 30h18v12H23z" fill="#f4f7fb" opacity=".8"/>` +
        `<path d="M27 36h10" stroke="${Ln(n, 0.5)}" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>` +
        `<path d="M26 24v24" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" opacity=".38"/>`;
    } else if (v === 2) {
      // 浓敌敌畏：带提手的大桶
      s = `<path d="M18 22h28v27c0 3.4-2.6 6-6 6H24c-3.4 0-6-2.6-6-6Z" fill="${g}" ${eP(n, 1.4)}/>` +
        `<path d="M24 15h16v7H24z" fill="${Ln(n, 0.4)}" ${eP(n, 1.1)}/>` +
        `<path d="M40 17q6 1 6 8" fill="none" stroke="${Ln(n, 0.45)}" stroke-width="2.6" stroke-linecap="round"/>` +
        `<path d="M19 33h26v13H19z" fill="#f4f7fb" opacity=".82"/>` +
        `<circle cx="32" cy="39.5" r="4.6" fill="${Ln(n, 0.45)}" opacity=".55"/>` +
        `<path d="M29 39.5h6M32 36.5v6" stroke="#f4f7fb" stroke-width="1.2"/>` +
        `<path d="M21 26v20" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" opacity=".35"/>`;
    } else if (v === 3) {
      // 藿香正气水 / 药酒罐：矮方瓶 + 小盖
      s = `<path d="M23 24h18v24c0 3-2.2 5.2-5.2 5.2H28.2C25.2 53.2 23 51 23 48Z" fill="${g}" ${eP(n, 1.3)}/>` +
        `<path d="M28 16h8v8h-8z" fill="${Ln(n, 0.38)}" ${eP(n, 1.1)}/>` +
        `<path d="M26.5 13h11v3.4h-11z" fill="${Hn(n, 0.4)}" ${eP(n, 1)}/>` +
        `<path d="M23.5 33h17v10h-17z" fill="#f4f7fb" opacity=".8"/>` +
        `<path d="M27.5 38h9" stroke="${Ln(n, 0.5)}" stroke-width="1.4" stroke-linecap="round" opacity=".7"/>` +
        `<path d="M26 27v17" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" opacity=".36"/>`;
    } else if (v === 4) {
      // 野生狗奶：奶瓶 + 奶嘴
      s = `<path d="M25 24h14v25c0 2.8-2 4.8-4.8 4.8h-4.4C27 53.8 25 51.8 25 49Z" fill="${g}" ${eP(n, 1.3)}/>` +
        `<path d="M27.5 17h9v7.4h-9z" fill="${Ln(n, 0.32)}" ${eP(n, 1.1)}/>` +
        `<path d="M28.5 12.5q3.5-4 7 0l1.5 5h-10z" fill="${Hn(n, 0.5)}" ${eP(n, 1)}/>` +
        `<path d="M25.5 31h13v13h-13z" fill="#f4f7fb" opacity=".82"/>` +
        `<path d="M29 34h6M29 38h6M29 42h6" stroke="${Ln(n, 0.45)}" stroke-width="1.2" opacity=".6"/>` +
        `<path d="M27.5 26v20" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" opacity=".38"/>`;
    } else if (v === 5) {
      // 二踢脚：红纸筒 + 引线
      s = `<path d="M26 18h12v34c0 1.6-1 2.6-2.6 2.6h-6.8C27 54.6 26 53.6 26 52Z" fill="${g}" ${eP(n, 1.2)}/>` +
        `<path d="M26 26h12M26 42h12" stroke="${Ln(n, 0.55)}" stroke-width="2" opacity=".7"/>` +
        `<path d="M26 33h12v8H26z" fill="#f4f7fb" opacity=".75"/>` +
        `<path d="M32 18q0-6 6-7" fill="none" stroke="${Ln(n, 0.35)}" stroke-width="1.6" stroke-linecap="round"/>` +
        `<circle cx="39" cy="10.5" r="1.6" fill="${Hn(n, 0.6)}"/>` +
        `<path d="M28.5 21v29" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" opacity=".35"/>`;
    } else if (v === 6) {
      // 二锅头：细长颈 + 红标签 + 金属盖
      s = `<path d="M27 12h10v8c0 2 5 4 5 9v22c0 2.6-2 4.4-4.6 4.4H26.6C24 55.4 22 53.6 22 51V29c0-5 5-7 5-9Z" fill="${g}" ${eP(n, 1.3)}/>` +
        `<path d="M26.5 8h11v5h-11z" fill="${Hn(n, 0.45)}" ${eP(n, 1.1)}/>` +
        `<path d="M22 34h20v10H22z" fill="#d9403c" opacity=".92"/>` +
        `<path d="M26 39h12" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round" opacity=".8"/>` +
        `<path d="M25 20v26" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" opacity=".35"/>`;
    } else if (v === 7) {
      // 防狼喷雾：小矮罐 + 按压头 + 喷嘴
      s = `<path d="M25 26h14v22c0 2.6-1.8 4.4-4.4 4.4h-5.2C26.8 52.4 25 50.6 25 48Z" fill="${g}" ${eP(n, 1.2)}/>` +
        `<path d="M27.5 20h9v6h-9z" fill="${Ln(n, 0.35)}" ${eP(n, 1)}/>` +
        `<path d="M31 16h6v4h-6z" fill="${Hn(n, 0.4)}" ${eP(n, 1)}/>` +
        `<path d="M37 17.5h5v2.4h-5z" fill="${Ln(n, 0.2)}"/>` +
        `<path d="M25.5 30h13v9h-13z" fill="#f4f7fb" opacity=".8"/>` +
        `<path d="M28 34h8" stroke="${Ln(n, 0.45)}" stroke-width="1.2" stroke-linecap="round" opacity=".6"/>` +
        `<path d="M27 28v18" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round" opacity=".4"/>`;
    } else {
      // 药酒罐：广口罐 + 木塞 + 泡在里面的药材
      s = `<path d="M20 24h24v22c0 3.6-2.4 6-6 6H26c-3.6 0-6-2.4-6-6Z" fill="${g}" ${eP(n, 1.3)}/>` +
        `<path d="M23 17h18v7H23z" fill="${Ln(n, 0.4)}" ${eP(n, 1.1)}/>` +
        `<path d="M25.5 13h13v4h-13z" fill="${Hn(n, 0.35)}" ${eP(n, 1)}/>` +
        `<ellipse cx="32" cy="24" rx="12" ry="3.4" fill="${Ln(n, 0.18)}" opacity=".75"/>` +
        `<circle cx="27" cy="40" r="3.2" fill="${Ln(n, 0.45)}" opacity=".7"/><circle cx="37" cy="44" r="2.4" fill="${Ln(n, 0.45)}" opacity=".7"/>` +
        `<path d="M22.5 30v14" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" opacity=".35"/>`;
    }
    return dn(
      Mi(n),
      fn('bt', 18, 34, 46, 34, [[0, Hn(n, 0.46)], [0.18, Hn(n, 0.04)], [0.52, Ln(n, 0.16)], [1, Ln(n, 0.74)]]) + je('gw', Hn(n, 0.5), 0.34),
      We('gw', 32, 36, 24) + s,
    );
  },

  // 罐筒：红牛 / 奶粉罐 / 充电宝 / 保温壶 / 煤气罐 / 消防栓 / 红糖姜茶
  // 罐筒族：0 饮料罐 1 六罐装 2 矮胖奶粉罐 3 保温壶 4 煤气钢瓶 5 消防栓 6 马克杯 7 充电宝
  can: (n, v = 0) => {
    const g = 'url(#@cn)';
    let s;
    if (v === 0) {
      // 红牛：标准易拉罐，拉环朝上
      s = `<path d="M22 17h20v30c0 3.4-2.2 5.6-5.6 5.6H27.6C24.2 52.6 22 50.4 22 47Z" fill="${g}" ${eP(n, 1.3)}/>` +
        `<ellipse cx="32" cy="17" rx="10" ry="3.6" fill="${Hn(n, 0.55)}" ${eP(n, 1.1)}/>` +
        `<ellipse cx="32" cy="17" rx="5.6" ry="1.9" fill="${Ln(n, 0.35)}"/>` +
        `<path d="M22 27h20v13H22z" fill="#f4f7fb" opacity=".9"/>` +
        `<path d="M26 33.5h12" stroke="${Ln(n, 0.5)}" stroke-width="1.7" stroke-linecap="round" opacity=".75"/>` +
        `<path d="M25.5 22v22" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity=".4"/>`;
    } else if (v === 1) {
      // 六罐装：三罐一排、外面裹一层透明膜
      s = [0, 1, 2, 3, 4, 5]
        .map((i) => {
          const x = 12 + (i % 3) * 14,
            y = 24 + Math.floor(i / 3) * 18;
          return `<rect x="${x}" y="${y}" width="12" height="16" rx="3" fill="${g}" ${eP(n, 0.9)}/><rect x="${x + 2}" y="${y + 4}" width="8" height="7" fill="#f4f7fb" opacity=".75"/>`;
        })
        .join('') +
        `<path d="M10 22h44v38H10z" fill="#ffffff" opacity=".1" ${eP(n, 1)}/>` +
        `<path d="M10 40h44" stroke="#ffffff" stroke-width="1.4" opacity=".3"/>`;
    } else if (v === 2) {
      // 奶粉罐：矮胖，宽盖
      s = `<path d="M17 26h30v20c0 3.6-2.4 5.8-5.8 5.8H22.8C19.4 51.8 17 49.6 17 46Z" fill="${g}" ${eP(n, 1.3)}/>` +
        `<ellipse cx="32" cy="26" rx="15" ry="5" fill="${Hn(n, 0.45)}" ${eP(n, 1.2)}/>` +
        `<ellipse cx="32" cy="24.5" rx="11" ry="3.4" fill="${Hn(n, 0.72)}" opacity=".7"/>` +
        `<path d="M17 34h30v11H17z" fill="#f4f7fb" opacity=".88"/>` +
        `<path d="M22 39.5h20" stroke="${Ln(n, 0.5)}" stroke-width="1.8" stroke-linecap="round" opacity=".7"/>` +
        `<path d="M20.5 30v16" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity=".38"/>`;
    } else if (v === 3) {
      // 保温壶：细高，带杯盖和侧把手
      s = `<path d="M25 22h14v28c0 3-2 5-5 5h-4c-3 0-5-2-5-5Z" fill="${g}" ${eP(n, 1.2)}/>` +
        `<path d="M23.5 13h17v9h-17z" fill="${Hn(n, 0.35)}" ${eP(n, 1.2)}/>` +
        `<path d="M24.5 15.5h15" stroke="#ffffff" stroke-width="1.3" opacity=".45"/>` +
        `<path d="M39 26q6 2 6 9t-6 9" fill="none" stroke="${Ln(n, 0.4)}" stroke-width="2.8" stroke-linecap="round"/>` +
        `<path d="M25 32h14v10H25z" fill="#f4f7fb" opacity=".8"/>` +
        `<path d="M27.5 26v22" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" opacity=".4"/>`;
    } else if (v === 4) {
      // 煤气罐：圆肩 + 顶部提手 + 阀门
      s = `<path d="M21 30q0-8 11-8t11 8v16c0 3.6-2.4 6-6 6H27c-3.6 0-6-2.4-6-6Z" fill="${g}" ${eP(n, 1.3)}/>` +
        `<path d="M28 15h8v7h-8z" fill="${Ln(n, 0.3)}" ${eP(n, 1)}/>` +
        `<path d="M25 17q7-6 14 0" fill="none" stroke="${Ln(n, 0.45)}" stroke-width="2.2" stroke-linecap="round"/>` +
        `<path d="M21 34h22v9H21z" fill="#f4f7fb" opacity=".72"/>` +
        `<path d="M23.5 30v16" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" opacity=".34"/>`;
    } else if (v === 5) {
      // 消防栓：红壳 + 顶盖 + 两侧出水口
      s = `<path d="M24 22h16v28c0 2.8-1.8 4.6-4.6 4.6h-6.8C25.8 54.6 24 52.8 24 50Z" fill="${g}" ${eP(n, 1.3)}/>` +
        `<path d="M22.5 14h19v8h-19z" fill="${Hn(n, 0.3)}" ${eP(n, 1.2)}/>` +
        `<path d="M27 10h10v4H27z" fill="${Ln(n, 0.35)}" ${eP(n, 1)}/>` +
        `<ellipse cx="17" cy="32" rx="5" ry="4.2" fill="${Ln(n, 0.25)}" ${eP(n, 1)}/>` +
        `<ellipse cx="47" cy="32" rx="5" ry="4.2" fill="${Ln(n, 0.25)}" ${eP(n, 1)}/>` +
        `<path d="M24 40h16v8H24z" fill="#f4f7fb" opacity=".7"/>` +
        `<path d="M26.5 26v20" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" opacity=".34"/>`;
    } else if (v === 6) {
      // 红糖姜茶：马克杯 + 侧把手
      s = `<path d="M20 24h24v20c0 3.6-2.4 6-6 6H26c-3.6 0-6-2.4-6-6Z" fill="${g}" ${eP(n, 1.3)}/>` +
        `<ellipse cx="32" cy="24" rx="12" ry="4" fill="${Hn(n, 0.4)}" ${eP(n, 1.1)}/>` +
        `<ellipse cx="32" cy="24" rx="8.6" ry="2.6" fill="${Ln(n, 0.18)}" opacity=".7"/>` +
        `<path d="M44 28q7 1.5 7 8t-7 8" fill="none" stroke="${Ln(n, 0.42)}" stroke-width="3.4" stroke-linecap="round"/>` +
        `<path d="M20 33h24v8H20z" fill="#f4f7fb" opacity=".7"/>` +
        `<path d="M23 28v16" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" opacity=".36"/>`;
    } else {
      // 充电宝：扁长方体 + USB 口 + 电量灯
      s = `<path d="M18 22h28c1.8 0 3 1.2 3 3v18c0 1.8-1.2 3-3 3H18c-1.8 0-3-1.2-3-3V25c0-1.8 1.2-3 3-3Z" fill="${g}" ${eP(n, 1.3)}/>` +
        `<path d="M15 27h34" stroke="#ffffff" stroke-width="1.3" opacity=".35"/>` +
        `<path d="M24 33h5v5h-5zM32 33h5v5h-5z" fill="${Ln(n, 0.35)}" ${eP(n, 0.8)}/>` +
        `<path d="M41 34h3v3h-3z" fill="${Ln(n, 0.2)}"/>` +
        `<circle cx="21" cy="42" r="1.5" fill="${Hn(n, 0.7)}"/><circle cx="26" cy="42" r="1.5" fill="${Hn(n, 0.7)}"/><circle cx="31" cy="42" r="1.5" fill="${Ln(n, 0.3)}"/>`;
    }
    return dn(
      Mi(n),
      fn('cn', 16, 34, 48, 34, [[0, Hn(n, 0.46)], [0.18, Hn(n, 0.04)], [0.52, Ln(n, 0.16)], [1, Ln(n, 0.74)]]) + je('gw', Hn(n, 0.5), 0.34),
      We('gw', 32, 34, 24) + s,
    );
  },

  // 块状族：0 板砖 1 水泥墩
  brick: (n, v = 0) => {
    const g = 'url(#@brk)';
    let s;
    if (v === 0) {
      // 板砖：斜放的砖 + 两个减重孔
      s = `<path d="M12 26l20-9 20 9v16l-20 9-20-9z" fill="${g}" ${eP(n, 1.3)}/>` +
        `<path d="M12 26l20 9 20-9M32 35v16" stroke="${Ln(n, 0.5)}" stroke-width="1.3" opacity=".7"/>` +
        `<ellipse cx="24" cy="31" rx="4" ry="2.6" fill="${Ln(n, 0.45)}" opacity=".75"/>` +
        `<ellipse cx="40" cy="31" rx="4" ry="2.6" fill="${Ln(n, 0.45)}" opacity=".75"/>` +
        `<path d="M17 27.5l11-5 11 5" fill="none" stroke="#ffffff" stroke-width="1.3" opacity=".42"/>`;
    } else {
      // 水泥墩：上窄下宽的墩子 + 斜切面
      s = `<path d="M20 14h24l8 38H12z" fill="${g}" ${eP(n, 1.4)}/>` +
        `<path d="M20 14h24l2 9H18z" fill="${Hn(n, 0.28)}" ${eP(n, 1.1)}/>` +
        `<path d="M12 52h40" stroke="${Ln(n, 0.5)}" stroke-width="2" stroke-linecap="round"/>` +
        `<path d="M24 26h16M22 36h20" stroke="${Ln(n, 0.4)}" stroke-width="1.2" opacity=".5"/>` +
        `<path d="M22 20l4 26" stroke="#ffffff" stroke-width="1.4" opacity=".32"/>`;
    }
    return dn(
      Mi(n),
      fn('brk', 10, 12, 54, 54, [[0, Hn(n, 0.46)], [0.18, Hn(n, 0.04)], [0.52, Ln(n, 0.16)], [1, Ln(n, 0.74)]]) + je('gw', Hn(n, 0.5), 0.34),
      We('gw', 32, 34, 24) + s,
    );
  },

  cloth: (n, v = 0) => {
    const g = 'url(#@cl)';
    let s;
    if (v === 0) {
      // 沙发垫：一块方垫 + 四角缝线
      s = `<path d="M14 24c0-3 2-5 5-5h26c3 0 5 2 5 5v18c0 3-2 5-5 5H19c-3 0-5-2-5-5z" fill="${g}" ${eP(n, 1.3)}/>` +
        `<path d="M14 30c6 3 11 3 17 0s11-3 17 0M14 38c6 3 11 3 17 0s11-3 17 0" fill="none" stroke="${Ln(n, 0.5)}" stroke-width="1.2" opacity=".55"/>` +
        `<path d="M19 21h26" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" opacity=".45"/>` +
        `<circle cx="20" cy="45" r="1.6" fill="${Ln(n, 0.4)}"/><circle cx="44" cy="45" r="1.6" fill="${Ln(n, 0.4)}"/>`;
    } else if (v === 1) {
      // 棉被：两层叠在一起，上层翻边
      s = `<path d="M13 36c0-2.6 1.8-4.4 4.4-4.4h29.2c2.6 0 4.4 1.8 4.4 4.4v10c0 2.6-1.8 4.4-4.4 4.4H17.4C14.8 50.4 13 48.6 13 46Z" fill="${Ln(n, 0.25)}" ${eP(n, 1.2)}/>` +
        `<path d="M15 24c0-2.6 1.8-4.4 4.4-4.4h25.2c2.6 0 4.4 1.8 4.4 4.4v9c0 2.6-1.8 4.4-4.4 4.4H19.4C16.8 33.4 15 31.6 15 29Z" fill="${g}" ${eP(n, 1.3)}/>` +
        `<path d="M19 22h25" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" opacity=".45"/>` +
        `<path d="M15 29c5 2.6 10 2.6 15 0s10-2.6 15 0" fill="none" stroke="${Ln(n, 0.5)}" stroke-width="1.2" opacity=".5"/>`;
    } else if (v === 2) {
      // 席梦思：三层厚垫 + 绗缝纽扣
      s = `<path d="M12 22h40v26H12z" fill="${g}" ${eP(n, 1.3)}/>` +
        `<path d="M12 30h40M12 40h40" stroke="${Ln(n, 0.5)}" stroke-width="1.3" opacity=".55"/>` +
        `<path d="M12 23.5h40" stroke="#ffffff" stroke-width="1.5" opacity=".4"/>` +
        [0, 1, 2, 3].map((i) => `<circle cx="${19 + i * 8.6}" cy="${26 + (i % 2) * 4}" r="1.5" fill="${Ln(n, 0.4)}" opacity=".7"/>`).join('') +
        [0, 1, 2, 3].map((i) => `<circle cx="${19 + i * 8.6}" cy="${36 + (i % 2) * 4}" r="1.5" fill="${Ln(n, 0.4)}" opacity=".7"/>`).join('');
    } else if (v === 3) {
      // 十斤大棉被：蓬松的一团 + 捆绳
      s = `<path d="M13 26q6-8 19-8t19 8v14q-6 8-19 8t-19-8z" fill="${g}" ${eP(n, 1.4)}/>` +
        `<path d="M13 33q6 5 19 5t19-5" fill="none" stroke="${Ln(n, 0.45)}" stroke-width="1.2" opacity=".5"/>` +
        `<path d="M22 18v30M42 18v30" stroke="${Ln(n, 0.55)}" stroke-width="2.4" opacity=".75"/>` +
        `<path d="M22 18v30M42 18v30" stroke="${Hn(n, 0.4)}" stroke-width="1.1" opacity=".5"/>` +
        `<path d="M16 24q4-4 10-5" fill="none" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" opacity=".45"/>`;
    } else {
      // 灭火毯：卷起来 + 绑带
      s = `<path d="M18 18h26c2.6 0 4.4 1.8 4.4 4.4v22c0 2.6-1.8 4.4-4.4 4.4H18z" fill="${g}" ${eP(n, 1.3)}/>` +
        `<ellipse cx="18" cy="33" rx="5" ry="16.4" fill="${Ln(n, 0.2)}" ${eP(n, 1.2)}/>` +
        `<ellipse cx="18" cy="33" rx="2.2" ry="9" fill="${Ln(n, 0.45)}" opacity=".8"/>` +
        `<path d="M26 20v26M36 20v26" stroke="${Ln(n, 0.5)}" stroke-width="2" opacity=".6"/>` +
        `<path d="M21 20h22" stroke="#ffffff" stroke-width="1.4" opacity=".4"/>`;
    }
    return dn(
      Mi(n),
      fn('cl', 12, 18, 52, 50, [[0, Hn(n, 0.46)], [0.18, Hn(n, 0.04)], [0.52, Ln(n, 0.16)], [1, Ln(n, 0.74)]]) + je('gw', Hn(n, 0.5), 0.34),
      We('gw', 32, 34, 24) + s,
    );
  },

  // 盾门族：0 防暴盾牌 1 防盗门 2 不锈钢大盆
  shield: (n, v = 0) => {
    const g = 'url(#@sh)';
    let s;
    if (v === 0) {
      // 防暴盾牌：透明盾面 + 观察窗 + 把手
      s = `<path d="M32 9l17 6v16c0 11-7.5 18-17 22-9.5-4-17-11-17-22V15z" fill="${g}" ${eP(n, 1.4)}/>` +
        `<path d="M32 13.5l12.5 4.4v13c0 8-5.5 13.5-12.5 16.6-7-3.1-12.5-8.6-12.5-16.6v-13z" fill="${Hn(n, 0.2)}" opacity=".45"/>` +
        `<path d="M25 24h14v9H25z" fill="#cfe6ff" opacity=".55" ${eP(n, 1)}/>` +
        `<path d="M22 40h20" stroke="${Ln(n, 0.5)}" stroke-width="1.6" opacity=".55"/>`;
    } else if (v === 1) {
      // 防盗门：门板 + 门把手 + 锁孔 + 合页
      s = `<path d="M18 12h28v42H18z" fill="${g}" ${eP(n, 1.4)}/>` +
        `<path d="M21 16h22v20H21z" fill="${Ln(n, 0.18)}" ${eP(n, 1)}/>` +
        `<path d="M21 40h22v11H21z" fill="${Ln(n, 0.1)}" ${eP(n, 1)}/>` +
        `<path d="M41 32h4.6" stroke="${Hn(n, 0.55)}" stroke-width="2.6" stroke-linecap="round"/>` +
        `<circle cx="41.5" cy="38" r="1.8" fill="${Ln(n, 0.45)}"/>` +
        `<path d="M18 20h-3M18 46h-3" stroke="${Ln(n, 0.4)}" stroke-width="2" stroke-linecap="round"/>` +
        `<path d="M22 17h20" stroke="#ffffff" stroke-width="1.4" opacity=".4"/>`;
    } else {
      // 不锈钢大盆：圆盆 + 双耳 + 卷边
      s = `<path d="M12 26h40c0 12-7.5 22-20 22S12 38 12 26Z" fill="${g}" ${eP(n, 1.4)}/>` +
        `<ellipse cx="32" cy="26" rx="20" ry="6" fill="${Hn(n, 0.35)}" ${eP(n, 1.2)}/>` +
        `<ellipse cx="32" cy="26" rx="15.5" ry="4" fill="${Ln(n, 0.28)}" opacity=".75"/>` +
        `<path d="M8 24q4 3 4 8M56 24q-4 3-4 8" fill="none" stroke="${Ln(n, 0.4)}" stroke-width="2.6" stroke-linecap="round"/>` +
        `<path d="M18 32q4 10 14 12" fill="none" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" opacity=".45"/>`;
    }
    return dn(
      Mi(n),
      fn('sh', 10, 10, 54, 54, [[0, Hn(n, 0.46)], [0.18, Hn(n, 0.04)], [0.52, Ln(n, 0.16)], [1, Ln(n, 0.74)]]) + je('gw', Hn(n, 0.5), 0.34),
      We('gw', 32, 32, 26) + s,
    );
  },

  horn: (n, v = 0) => {
    const g = 'url(#@hn)';
    let s;
    if (v === 0) {
      // 大喇叭：锥形口 + 短握把
      s = `<path d="M14 27h8l20-13v36L22 37h-8z" fill="${g}" ${eP(n, 1.2)}/>` +
        `<ellipse cx="42" cy="32" rx="4.6" ry="18" fill="${Hn(n, 0.32)}" ${eP(n, 1.1)}/>` +
        `<path d="M42 17.5q4 6.5 4 14.5t-4 14.5" fill="none" stroke="${Hn(n, 0.55)}" stroke-width="1.6" opacity=".8"/>` +
        `<path d="M18 27v10" stroke="#ffffff" stroke-width="1.5" opacity=".5"/>` +
        `<path d="M23 24l14-9" stroke="#ffffff" stroke-width="1.2" opacity=".35"/>`;
    } else if (v === 1) {
      // 广场舞音响：方箱 + 两个喇叭单元 + 提手
      s = `<path d="M15 20h34v32H15z" fill="${g}" ${eP(n, 1.3)}/>` +
        `<circle cx="32" cy="32" r="9" fill="${Ln(n, 0.3)}" ${eP(n, 1.1)}/>` +
        `<circle cx="32" cy="32" r="4.2" fill="${Hn(n, 0.2)}" ${eP(n, 0.9)}/>` +
        `<circle cx="32" cy="45" r="3.4" fill="${Ln(n, 0.3)}" ${eP(n, 0.9)}/>` +
        `<path d="M25 15h14v5H25z" fill="${Ln(n, 0.2)}" ${eP(n, 1)}/>` +
        `<path d="M18 24v24" stroke="#ffffff" stroke-width="1.5" opacity=".35"/>`;
    } else if (v === 2) {
      // 收音机：横箱 + 天线 + 旋钮 + 刻度
      s = `<path d="M13 26h38v22H13z" fill="${g}" ${eP(n, 1.3)}/>` +
        `<path d="M16 29h18v16H16z" fill="${Ln(n, 0.2)}" ${eP(n, 0.9)}/>` +
        `<path d="M18 33h14M18 37h14M18 41h10" stroke="${Hn(n, 0.5)}" stroke-width="1.2" opacity=".75"/>` +
        `<circle cx="42" cy="35" r="4.4" fill="${Hn(n, 0.25)}" ${eP(n, 1)}/>` +
        `<path d="M42 35l2.6-2" stroke="${Ln(n, 0.4)}" stroke-width="1.4" stroke-linecap="round"/>` +
        `<path d="M40 22l8-9" stroke="${Ln(n, 0.4)}" stroke-width="1.8" stroke-linecap="round"/>` +
        `<path d="M45 44h4M15 44h26" stroke="${Ln(n, 0.35)}" stroke-width="1.4" opacity=".6"/>`;
    } else {
      // 唢呐：细锥管 + 喇叭口 + 哨片
      s = `<path d="M29 12h6v24h-6z" fill="${g}" ${eP(n, 1.1)}/>` +
        `<path d="M30.5 36h3v6h-3z" fill="${Ln(n, 0.3)}"/>` +
        `<path d="M26 42h12l4 10H22z" fill="${g}" ${eP(n, 1.2)}/>` +
        `<path d="M22 52h20" stroke="${Ln(n, 0.5)}" stroke-width="2" stroke-linecap="round"/>` +
        `<path d="M28 8h8v4h-8z" fill="${Hn(n, 0.45)}" ${eP(n, 1)}/>` +
        `<path d="M31 14v20" stroke="#ffffff" stroke-width="1.4" opacity=".45"/>`;
    }
    return dn(
      Mi(n),
      fn('hn', 12, 12, 52, 52, [[0, Hn(n, 0.46)], [0.18, Hn(n, 0.04)], [0.52, Ln(n, 0.16)], [1, Ln(n, 0.74)]]) + je('gw', Hn(n, 0.5), 0.34),
      We('gw', 32, 32, 24) + s,
    );
  },

  // 盒子族：0 饭盒 1 急救箱 2 闹钟 3 冷风机 4 大锅 5 纸箱
  box: (n, v = 0) => {
    const g = 'url(#@bx)';
    let s;
    if (v === 0) {
      // 饭盒：方盒 + 扣盖 + 提手
      s = `<path d="M14 28h36v20c0 2.6-1.6 4.2-4.2 4.2H18.2C15.6 52.2 14 50.6 14 48Z" fill="${g}" ${eP(n, 1.3)}/>` +
        `<path d="M12 22h40v7H12z" fill="${Hn(n, 0.3)}" ${eP(n, 1.2)}/>` +
        `<path d="M27 25h10v2.6H27z" fill="${Ln(n, 0.3)}"/>` +
        `<path d="M32 17q5 0 5 5" fill="none" stroke="${Ln(n, 0.4)}" stroke-width="2" stroke-linecap="round"/>` +
        `<path d="M18 31v15" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" opacity=".4"/>`;
    } else if (v === 1) {
      // 急救箱：白箱 + 红十字 + 提手
      s = `<path d="M13 26h38v24H13z" fill="#eef4fb" ${eP(n, 1.3)}/>` +
        `<path d="M13 26h38v7H13z" fill="${g}" opacity=".8" ${eP(n, 1.1)}/>` +
        `<path d="M29 34h6v4h-6zM30 32h4v8h-4z" fill="#d9403c"/>` +
        `<path d="M25 20h14v6H25z" fill="none" stroke="${Ln(n, 0.45)}" stroke-width="2.4" stroke-linecap="round"/>` +
        `<path d="M13 40h38" stroke="${Ln(n, 0.3)}" stroke-width="1" opacity=".4"/>`;
    } else if (v === 2) {
      // 闹钟：圆钟 + 双铃 + 指针
      s = `<circle cx="32" cy="34" r="16" fill="${g}" ${eP(n, 1.3)}/>` +
        `<circle cx="32" cy="34" r="12.6" fill="#f4f7fb" opacity=".92"/>` +
        `<path d="M32 34V25M32 34l6 4" stroke="${Ln(n, 0.45)}" stroke-width="2.2" stroke-linecap="round"/>` +
        `<circle cx="32" cy="34" r="1.8" fill="${Ln(n, 0.5)}"/>` +
        `<path d="M21 22q-4-5 1-8M43 22q4-5-1-8" fill="none" stroke="${Ln(n, 0.35)}" stroke-width="3" stroke-linecap="round"/>` +
        `<path d="M24 50l-3 6M40 50l3 6" stroke="${Ln(n, 0.35)}" stroke-width="2.6" stroke-linecap="round"/>`;
    } else if (v === 3) {
      // 冷风机：方机 + 出风格栅 + 水口
      s = `<path d="M15 18h34v34H15z" fill="${g}" ${eP(n, 1.3)}/>` +
        `<path d="M19 22h26v18H19z" fill="${Ln(n, 0.22)}" ${eP(n, 1)}/>` +
        [0, 1, 2, 3, 4].map((i) => `<path d="M20 ${24 + i * 3.4}h24" stroke="${Hn(n, 0.45)}" stroke-width="1.3" opacity=".7"/>`).join('') +
        `<circle cx="26" cy="45" r="3.2" fill="${Ln(n, 0.28)}" ${eP(n, 0.9)}/>` +
        `<circle cx="38" cy="45" r="3.2" fill="${Ln(n, 0.28)}" ${eP(n, 0.9)}/>`;
    } else if (v === 4) {
      // 大锅菜：铁锅 + 盖 + 双耳
      s = `<path d="M12 28h40c0 12-7 22-20 22S12 40 12 28Z" fill="${g}" ${eP(n, 1.3)}/>` +
        `<path d="M8 26h48v4H8z" fill="${Hn(n, 0.28)}" ${eP(n, 1.2)}/>` +
        `<path d="M22 20q10-6 20 0" fill="none" stroke="${Ln(n, 0.4)}" stroke-width="3" stroke-linecap="round"/>` +
        `<path d="M16 32q4 10 16 10" fill="none" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" opacity=".4"/>`;
    } else {
      // 红牛整箱：纸箱 + 封箱胶带 + 提手孔
      s = `<path d="M12 26h40v24H12z" fill="${g}" ${eP(n, 1.3)}/>` +
        `<path d="M12 26l6-7h40l-6 7z" fill="${Hn(n, 0.3)}" ${eP(n, 1.1)}/>` +
        `<path d="M32 19v31" stroke="#f4f7fb" stroke-width="3.4" opacity=".7"/>` +
        `<path d="M18 33h7v4h-7zM39 33h7v4h-7z" fill="${Ln(n, 0.35)}"/>` +
        `<path d="M14 44h36" stroke="${Ln(n, 0.4)}" stroke-width="1.2" opacity=".5"/>`;
    }
    return dn(
      Mi(n),
      fn('bx', 10, 18, 54, 52, [[0, Hn(n, 0.46)], [0.18, Hn(n, 0.04)], [0.52, Ln(n, 0.16)], [1, Ln(n, 0.74)]]) + je('gw', Hn(n, 0.5), 0.34),
      We('gw', 32, 34, 24) + s,
    );
  },

  // 面罩族：0 防毒面具 1 防暴服（带护板）
  mask: (n, v = 0) => {
    const g = 'url(#@mk)';
    let s;
    if (v === 0) {
      // 防毒面具：大镜片 + 侧滤罐 + 呼吸阀
      s = `<path d="M32 10c9.5 0 16 5 16 13v9c0 10-7 16-16 22-9-6-16-12-16-22v-9c0-8 6.5-13 16-13z" fill="${g}" ${eP(n, 1.4)}/>` +
        `<path d="M20.5 24h23v10h-23z" fill="#0a1128" opacity=".82" ${eP(n, 1.1)}/>` +
        `<path d="M24 29h6M34 29h6" stroke="${Hn(n, 0.6)}" stroke-width="2.4" stroke-linecap="round"/>` +
        `<circle cx="32" cy="44" r="5" fill="${Ln(n, 0.25)}" ${eP(n, 1.1)}/>` +
        `<circle cx="32" cy="44" r="2" fill="${Ln(n, 0.5)}"/>` +
        `<path d="M48 30q5 1 5 6" fill="none" stroke="${Ln(n, 0.35)}" stroke-width="2.4" stroke-linecap="round"/>`;
    } else {
      // 防暴服：马甲 + 胸前护板 + 肩扣
      s = `<path d="M23 11l9 6 9-6 9 6v38H14V17z" fill="${g}" ${eP(n, 1.4)}/>` +
        `<path d="M21 22h22v13H21z" fill="${Ln(n, 0.22)}" ${eP(n, 1.1)}/>` +
        `<path d="M21 40h22v12H21z" fill="${Ln(n, 0.18)}" ${eP(n, 1.1)}/>` +
        `<path d="M32 17v38" stroke="${Ln(n, 0.45)}" stroke-width="1.6" opacity=".65"/>` +
        `<path d="M25 15l3 4M39 15l-3 4" stroke="${Hn(n, 0.5)}" stroke-width="1.6" stroke-linecap="round"/>` +
        `<path d="M17 26h4M43 26h4" stroke="${Ln(n, 0.4)}" stroke-width="1.6" opacity=".6"/>`;
    }
    return dn(
      Mi(n),
      fn('mk', 12, 12, 52, 52, [[0, Hn(n, 0.46)], [0.18, Hn(n, 0.04)], [0.52, Ln(n, 0.16)], [1, Ln(n, 0.74)]]) + je('gw', Hn(n, 0.5), 0.34),
      We('gw', 32, 32, 26) + s,
    );
  },

  bike: (n) =>
    dn(
      Mi(n),
      fn('bk', 12, 36, 52, 36, [[0, Hn(n, 0.46)], [0.18, Hn(n, 0.04)], [0.52, Ln(n, 0.16)], [1, Ln(n, 0.74)]]) + je('gw', Hn(n, 0.5), 0.34),
      We('gw', 32, 36, 24) +
        `<circle cx="20" cy="44" r="8.5" fill="none" stroke="${Ln(n, 0.5)}" stroke-width="3.4"/><circle cx="44" cy="44" r="8.5" fill="none" stroke="${Ln(n, 0.5)}" stroke-width="3.4"/>` +
        `<path d="M20 44l9-14h11l4 14" fill="none" stroke="url(#@bk)" stroke-width="4.2" stroke-linecap="round"/>` +
        `<path d="M29 30h-6" stroke="${Ln(n, 0.45)}" stroke-width="3" stroke-linecap="round"/>` +
        `<path d="M40 30l3-6" stroke="${Ln(n, 0.45)}" stroke-width="3" stroke-linecap="round"/>` +
        `<circle cx="44" cy="44" r="2.4" fill="#f4f7fb"/>`,
    ),
  // ── 上面十族之外，再拆几个"看着不一样"的形制 ──
  // 光靠十族的话，攻击页会排出一列一模一样的棍子。这十来个是把最常露面的几件
  // （指虎、钢钉、弹弓、铁链、扳手、锤、哑铃、射钉枪、外套、铁丝网、安全帽、马甲）单独画出来。

  // 指虎：一排四个指孔
  knuckle: (n) =>
    dn(
      Mi(n),
      fn('kn', 8, 30, 56, 30, [[0, Hn(n, 0.46)], [0.18, Hn(n, 0.04)], [0.52, Ln(n, 0.16)], [1, Ln(n, 0.74)]]) + je('gw', Hn(n, 0.5), 0.34),
      We('gw', 32, 34, 24) +
        // 四个指环：环身用同一套渐变，环内是"透过去的暗"，比四个黑洞洞好看
        [15, 26, 37, 48]
          .map(
            (x) =>
              `<circle cx="${x}" cy="36" r="5.4" fill="none" stroke="url(#@kn)" stroke-width="4.6"/><circle cx="${x}" cy="36" r="5.4" fill="none" stroke="${Ln(n, 0.62)}" stroke-width=".7" opacity=".55"/>`,
          )
          .join('') +
        // 掌托：横过来压在四个环上
        `<path d="M12 21h40c1.8 0 3 1.2 3 3v6c0 1.8-1.2 3-3 3H12c-1.8 0-3-1.2-3-3v-6c0-1.8 1.2-3 3-3Z" fill="url(#@kn)" ${eP(n, 1.3)}/>` +
        `<path d="M12.5 23.5h39" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" opacity=".55"/>` +
        `<path d="M12.5 30h39" stroke="${Ln(n, 0.5)}" stroke-width="1" stroke-linecap="round" opacity=".5"/>` +
        `<path d="M20 40.5a5.4 5.4 0 0 0 3.4 1.2" fill="none" stroke="#ffffff" stroke-width="1.1" stroke-linecap="round" opacity=".4"/>`,
    ),

  // 钢钉：扁圆钉帽 + 带棱的锥身
  nail: (n) =>
    dn(
      Mi(n),
      fn('nl', 26, 8, 41, 8, [[0, Hn(n, 0.46)], [0.18, Hn(n, 0.04)], [0.52, Ln(n, 0.16)], [1, Ln(n, 0.74)]]) + je('gw', Hn(n, 0.5), 0.34),
      We('gw', 32, 32, 22) +
        // 钉帽是个压扁的圆柱：顶面椭圆 + 一圈侧壁
        `<ellipse cx="32" cy="13" rx="13.5" ry="4.6" fill="${Hn(n, 0.4)}" ${eP(n, 1.2)}/>` +
        `<path d="M18.5 13v4.2a13.5 4.6 0 0 0 27 0V13a13.5 4.6 0 0 1-27 0Z" fill="${Ln(n, 0.28)}" ${eP(n, 1.1)}/>` +
        `<ellipse cx="32" cy="13" rx="9" ry="2.9" fill="${Hn(n, 0.72)}" opacity=".55"/>` +
        // 锥身：左亮右暗，中间一条高光
        `<path d="M27.4 17.6h9.2v23.2L32 54.5l-4.6-13.7z" fill="url(#@nl)" ${eP(n, 1.1)}/>` +
        `<path d="M30.2 19v20.5" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" opacity=".6"/>` +
        `<path d="M35.4 19v19.5L32 51" stroke="${Ln(n, 0.45)}" stroke-width="1.1" stroke-linecap="round" opacity=".5" fill="none"/>`,
    ),

  // 弹弓：Y 形叉 + 皮筋
  sling: (n) =>
    dn(
      Mi(n),
      fn('sl', 18, 30, 46, 30, [[0, Hn(n, 0.46)], [0.18, Hn(n, 0.04)], [0.52, Ln(n, 0.16)], [1, Ln(n, 0.74)]]) + je('gw', Hn(n, 0.5), 0.34),
      We('gw', 32, 30, 24) +
        `<path d="M32 55V33" stroke="${Ln(n, 0.4)}" stroke-width="7.5" stroke-linecap="round"/><path d="M32 55V33" stroke="url(#@sl)" stroke-width="5" stroke-linecap="round"/>` +
        `<path d="M32 34C32 24 23 20 20.5 13" fill="none" stroke="${Ln(n, 0.4)}" stroke-width="7" stroke-linecap="round"/><path d="M32 34C32 24 23 20 20.5 13" fill="none" stroke="url(#@sl)" stroke-width="4.4" stroke-linecap="round"/>` +
        `<path d="M32 34C32 24 41 20 43.5 13" fill="none" stroke="${Ln(n, 0.4)}" stroke-width="7" stroke-linecap="round"/><path d="M32 34C32 24 41 20 43.5 13" fill="none" stroke="url(#@sl)" stroke-width="4.4" stroke-linecap="round"/>` +
        `<path d="M20.5 13Q32 8 43.5 13" fill="none" stroke="#e8eef7" stroke-width="2" stroke-linecap="round" opacity=".75"/>` +
        `<path d="M30 44h4" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" opacity=".5"/>`,
    ),

  // 铁链：一串斜挂的链环
  chain: (n) =>
    dn(
      Mi(n),
      fn('ch', 12, 32, 52, 32, [[0, Hn(n, 0.46)], [0.18, Hn(n, 0.04)], [0.52, Ln(n, 0.16)], [1, Ln(n, 0.74)]]) + je('gw', Hn(n, 0.5), 0.34),
      We('gw', 32, 32, 24) +
        [0, 1, 2, 3, 4]
          .map((i) => {
            const x = 14 + i * 9,
              y = 50 - i * 9,
              c = i % 2 ? Hn(n, 0.45) : Ln(n, 0.15);
            return `<ellipse cx="${x}" cy="${y}" rx="7.6" ry="4.8" transform="rotate(-45 ${x} ${y})" fill="none" stroke="${Ln(n, 0.5)}" stroke-width="4.4"/><ellipse cx="${x}" cy="${y}" rx="7.6" ry="4.8" transform="rotate(-45 ${x} ${y})" fill="none" stroke="${c}" stroke-width="2.6"/>`;
          })
          .join('') +
        `<ellipse cx="14" cy="50" rx="7.6" ry="4.8" transform="rotate(-45 14 50)" fill="none" stroke="#ffffff" stroke-width="1" opacity=".4"/>`,
    ),

  // 扳手：开口钳头 + 长柄
  wrench: (n) =>
    dn(
      Mi(n),
      fn('wr', 26, 8, 40, 8, [[0, Hn(n, 0.46)], [0.18, Hn(n, 0.04)], [0.52, Ln(n, 0.16)], [1, Ln(n, 0.74)]]) + je('gw', Hn(n, 0.5), 0.34),
      We('gw', 32, 30, 24) +
        `<path d="M32 20v32" stroke="${Ln(n, 0.4)}" stroke-width="9" stroke-linecap="round"/><path d="M32 20v32" stroke="url(#@wr)" stroke-width="6.4" stroke-linecap="round"/>` +
        `<path d="M24 8h16v5.5h-5.2v6.2H29.2V13.5H24Z" fill="url(#@wr)" ${eP(n, 1.4)}/>` +
        `<path d="M24 8h16v5.5h-5.2v6.2H29.2V13.5H24Z" fill="none" stroke="${Ln(n, 0.5)}" stroke-width="1" opacity=".6"/>` +
        `<circle cx="32" cy="42" r="2.6" fill="#070b16" fill-opacity=".55" opacity=".7"/>` +
        `<path d="M28.5 24v18" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round" opacity=".45"/>`,
    ),

  // 锤：横着的锤头 + 竖柄
  hammer: (n) =>
    dn(
      Mi(n),
      fn('hm', 12, 20, 52, 20, [[0, Hn(n, 0.46)], [0.18, Hn(n, 0.04)], [0.52, Ln(n, 0.16)], [1, Ln(n, 0.74)]]) + je('gw', Hn(n, 0.5), 0.34),
      We('gw', 32, 26, 26) +
        `<path d="M31 24v31" stroke="${Ln(n, 0.45)}" stroke-width="8" stroke-linecap="round"/><path d="M31 24v31" stroke="url(#@hm)" stroke-width="5.6" stroke-linecap="round"/>` +
        `<path d="M13 11h38c1.6 0 2.6 1 2.6 2.6v11c0 1.6-1 2.6-2.6 2.6H13c-1.6 0-2.6-1-2.6-2.6v-11C10.4 12 11.4 11 13 11Z" fill="url(#@hm)" ${eP(n, 1.6)}/>` +
        `<path d="M16 14.5h32" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" opacity=".5"/>` +
        `<path d="M31 47h4" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round" opacity=".4"/>`,
    ),

  // 哑铃：一根横杆两端配重
  dumbbell: (n) =>
    dn(
      Mi(n),
      fn('db', 6, 32, 58, 32, [[0, Hn(n, 0.46)], [0.18, Hn(n, 0.04)], [0.52, Ln(n, 0.16)], [1, Ln(n, 0.74)]]) + je('gw', Hn(n, 0.5), 0.34),
      We('gw', 32, 32, 24) +
        `<path d="M22 32h20" stroke="${Ln(n, 0.4)}" stroke-width="7" stroke-linecap="round"/>` +
        `<path d="M22 32h20" stroke="${Hn(n, 0.35)}" stroke-width="4" stroke-linecap="round"/>` +
        `<rect x="12" y="18" width="11" height="28" rx="3.4" fill="url(#@db)" ${eP(n, 1.5)}/>` +
        `<rect x="41" y="18" width="11" height="28" rx="3.4" fill="url(#@db)" ${eP(n, 1.5)}/>` +
        `<rect x="5" y="25" width="6" height="14" rx="2.2" fill="${Hn(n, 0.3)}" ${eP(n, 1.1)}/>` +
        `<rect x="53" y="25" width="6" height="14" rx="2.2" fill="${Hn(n, 0.3)}" ${eP(n, 1.1)}/>` +
        `<path d="M15 22v20M44 22v20" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round" opacity=".45"/>`,
    ),

  // 射钉枪：枪身 + 枪管 + 握把
  gun: (n) =>
    dn(
      Mi(n),
      fn('gn', 14, 34, 56, 34, [[0, Hn(n, 0.46)], [0.18, Hn(n, 0.04)], [0.52, Ln(n, 0.16)], [1, Ln(n, 0.74)]]) + je('gw', Hn(n, 0.5), 0.34),
      We('gw', 32, 32, 24) +
        `<path d="M14 22h26c2 0 3 1 3 3v9c0 2-1 3-3 3H14c-2 0-3-1-3-3v-9c0-2 1-3 3-3Z" fill="url(#@gn)" ${eP(n, 1.5)}/>` +
        `<path d="M43 26h13v5H43z" fill="${Ln(n, 0.25)}" ${eP(n, 1.2)}/>` +
        `<path d="M20 37l-4 16h10l4-16z" fill="${Hn(n, 0.35)}" ${eP(n, 1.3)}/>` +
        `<path d="M29 37l2 9h7l-1-9z" fill="${Ln(n, 0.3)}" opacity=".8"/>` +
        `<path d="M16 26h22" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round" opacity=".5"/>` +
        `<circle cx="40" cy="30" r="1.6" fill="#ffffff" opacity=".6"/>`,
    ),

  // 外套：棉袄 / 雨衣
  // 外套族：0 棉袄（绗缝） 1 雨衣（连帽 + 反光条）
  coat: (n, v = 0) => {
    const g = 'url(#@ct)';
    const s =
      v === 0
        ? `<path d="M23 13l9-4 9 4 11 7-5 12-5-3.5V53H22V28.5L17 32 12 20z" fill="${g}" ${eP(n, 1.4)}/>` +
          `<path d="M27 14l5 9 5-9" fill="none" stroke="${Ln(n, 0.45)}" stroke-width="1.6" stroke-linejoin="round"/>` +
          `<path d="M32 23v29" stroke="${Ln(n, 0.45)}" stroke-width="1.4" opacity=".7"/>` +
          `<path d="M22 34h20M22 42h20" stroke="${Ln(n, 0.4)}" stroke-width="1.1" opacity=".5"/>` +
          `<path d="M26 30h4M34 30h4M26 38h4M34 38h4" stroke="${Ln(n, 0.35)}" stroke-width="1" opacity=".55"/>` +
          `<path d="M23 15l-6 6" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round" opacity=".45"/>`
        : `<path d="M32 9c5.5 0 9 3.4 9 8.4 0 3-1.4 5-3.4 6.6H26.4C24.4 22.4 23 20.4 23 17.4 23 12.4 26.5 9 32 9Z" fill="${Ln(n, 0.22)}" ${eP(n, 1.2)}/>` +
          `<path d="M26.4 24h11.2l9.4 5.6-4.6 11-4.6-3.2V55H26V37.4l-4.6 3.2-4.6-11z" fill="${g}" ${eP(n, 1.4)}/>` +
          `<path d="M26 36h12" stroke="#f4f7fb" stroke-width="2.6" opacity=".55"/>` +
          `<path d="M32 26v28" stroke="${Ln(n, 0.45)}" stroke-width="1.4" opacity=".6"/>` +
          `<path d="M26.5 12.5c2-2 9-2 11 0" fill="none" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round" opacity=".4"/>`;
    return dn(
      Mi(n),
      fn('ct', 10, 32, 54, 32, [[0, Hn(n, 0.46)], [0.18, Hn(n, 0.04)], [0.52, Ln(n, 0.16)], [1, Ln(n, 0.74)]]) + je('gw', Hn(n, 0.5), 0.34),
      We('gw', 32, 32, 24) + s,
    );
  },

  // 铁丝网：菱形网格
  mesh: (n) =>
    dn(
      Mi(n),
      fn('ms', 12, 32, 52, 32, [[0, Hn(n, 0.46)], [0.18, Hn(n, 0.04)], [0.52, Ln(n, 0.16)], [1, Ln(n, 0.74)]]) + je('gw', Hn(n, 0.5), 0.34),
      We('gw', 32, 32, 24) +
        [[22, 24], [42, 24], [32, 34], [22, 44], [42, 44]]
          .map(([x, y]) => `<path d="${hn(x, y, 9.5, 0.1)}" fill="none" stroke="${Ln(n, 0.5)}" stroke-width="3.4"/><path d="${hn(x, y, 9.5, 0.1)}" fill="none" stroke="${Hn(n, 0.3)}" stroke-width="1.7"/>`)
          .join('') +
        `<rect x="11" y="13" width="42" height="38" rx="2.5" fill="none" stroke="${Ln(n, 0.35)}" stroke-width="2.4"/>` +
        `<path d="M13 17h38" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" opacity=".35"/>`,
    ),

  // 安全帽：帽壳 + 帽檐
  helmet: (n) =>
    dn(
      Mi(n),
      fn('hl', 10, 28, 54, 28, [[0, Hn(n, 0.46)], [0.18, Hn(n, 0.04)], [0.52, Ln(n, 0.16)], [1, Ln(n, 0.74)]]) + je('gw', Hn(n, 0.5), 0.34),
      We('gw', 32, 30, 26) +
        `<path d="M14 33a18 18 0 0 1 36 0Z" fill="url(#@hl)" ${eP(n, 1.5)}/>` +
        `<path d="M8 33h48c1.4 0 2.4 1 2.4 2.4v2.2c0 1.4-1 2.4-2.4 2.4H8c-1.4 0-2.4-1-2.4-2.4v-2.2C5.6 34 6.6 33 8 33Z" fill="${Hn(n, 0.35)}" ${eP(n, 1.4)}/>` +
        `<path d="M32 15v18" stroke="${Ln(n, 0.4)}" stroke-width="1.6" opacity=".6"/>` +
        `<path d="M18 26c2-6 8-9 14-9" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" opacity=".45"/>` +
        `<path d="M24 41v6M40 41v6" stroke="${Ln(n, 0.3)}" stroke-width="1.4" opacity=".55"/>`,
    ),

  // 马甲：防弹衣 / 防暴服
  vest: (n) =>
    dn(
      Mi(n),
      fn('vs', 12, 32, 52, 32, [[0, Hn(n, 0.46)], [0.18, Hn(n, 0.04)], [0.52, Ln(n, 0.16)], [1, Ln(n, 0.74)]]) + je('gw', Hn(n, 0.5), 0.34),
      We('gw', 32, 32, 24) +
        `<path d="M23 11l9 6 9-6 9 6v38H14V17z" fill="url(#@vs)" ${eP(n, 1.5)}/>` +
        `<path d="M32 17v38" stroke="${Ln(n, 0.45)}" stroke-width="1.5" opacity=".7"/>` +
        `<path d="M17 30h12M35 30h12" stroke="${Ln(n, 0.4)}" stroke-width="1.6" opacity=".55"/>` +
        `<path d="M18 40h11v9H18zM35 40h11v9H35z" fill="${Ln(n, 0.3)}" opacity=".55" ${eP(n, 1)}/>` +
        `<path d="M23 13l4 5" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round" opacity=".45"/>`,
    ),

  // ── 消耗品专用形制 ──────────────────────────────────────────
  // 针剂：群勃龙(0) 康力龙(1)。安瓿瓶 + 针头，靠瓶身颜色和标签区分。
  syringe: (n, v = 0) => {
    const g = 'url(#@sy)';
    const body =
      v === 0
        ? // 群勃龙：粗安瓿 + 长针，刻度明显
          `<path d="M26 26h12v20c0 3.4-2.4 5.8-6 5.8s-6-2.4-6-5.8Z" fill="${g}" ${eP(n, 1.3)}/>` +
          `<path d="M27.5 20h9v6.5h-9z" fill="${Ln(n, 0.4)}" ${eP(n, 1.1)}/>` +
          `<path d="M32 20V9" stroke="${Ln(n, 0.5)}" stroke-width="2.6" stroke-linecap="round"/>` +
          `<path d="M32 9l-1.8-4.4h3.6z" fill="${Hn(n, 0.55)}"/>` +
          `<path d="M25.5 33h13v9h-13z" fill="#f4f7fb" opacity=".85"/>` +
          `<path d="M28 35.5v4M31 35.5v4M34 35.5v4" stroke="${Ln(n, 0.55)}" stroke-width="1.1" opacity=".75"/>` +
          `<path d="M27.5 28v18" stroke="#ffffff" stroke-width="1.7" stroke-linecap="round" opacity=".4"/>`
        : // 康力龙：小药瓶 + 短针 + 药片
          `<path d="M25 30h14v16c0 3.2-2.4 5.4-5.6 5.4H30.6C27.4 51.4 25 49.2 25 46Z" fill="${g}" ${eP(n, 1.3)}/>` +
          `<path d="M27 24h10v6.4H27z" fill="${Ln(n, 0.38)}" ${eP(n, 1.1)}/>` +
          `<path d="M32 24V13" stroke="${Ln(n, 0.5)}" stroke-width="2.2" stroke-linecap="round"/>` +
          `<circle cx="32" cy="11.6" r="1.8" fill="${Hn(n, 0.5)}"/>` +
          `<ellipse cx="32" cy="39" rx="4.6" ry="2.8" fill="#f4f7fb" opacity=".8"/>` +
          `<path d="M27.6 39h8.8" stroke="${Ln(n, 0.5)}" stroke-width="1.2" opacity=".7"/>` +
          `<path d="M26.8 32v15" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" opacity=".38"/>`;
    return dn(
      Mi(n),
      fn('sy', 22, 30, 42, 30, [[0, Hn(n, 0.46)], [0.18, Hn(n, 0.04)], [0.52, Ln(n, 0.16)], [1, Ln(n, 0.74)]]) + je('gw', Hn(n, 0.5), 0.34),
      We('gw', 32, 36, 24) + body,
    );
  },

  // 香烟：硬盒 + 露出的一支 + 盒面标签
  cigpack: (n) => {
    const g = 'url(#@cg)';
    return dn(
      Mi(n),
      fn('cg', 16, 24, 48, 24, [[0, Hn(n, 0.46)], [0.18, Hn(n, 0.04)], [0.52, Ln(n, 0.16)], [1, Ln(n, 0.74)]]) + je('gw', Hn(n, 0.5), 0.34),
      We('gw', 32, 34, 24) +
        `<path d="M22 22h20v32c0 2.4-1.8 4.2-4.2 4.2H26.2C23.8 58.2 22 56.4 22 54Z" fill="${g}" ${eP(n, 1.4)}/>` +
        `<path d="M22 22h20v7H22z" fill="${Ln(n, 0.3)}" opacity=".8"/>` +
        `<path d="M26 15h3.4v8H26z" fill="#fbf7ef" ${eP(n, 1)}/>` +
        `<path d="M26 15h3.4v2.6H26z" fill="${Hn(n, 0.5)}" opacity=".9"/>` +
        `<path d="M31.5 16h3.4v7h-3.4z" fill="#f2ece0" ${eP(n, 1)}/>` +
        `<path d="M22.5 36h19v12h-19z" fill="#f4f7fb" opacity=".85"/>` +
        `<path d="M26 42h12" stroke="${Ln(n, 0.55)}" stroke-width="1.6" stroke-linecap="round" opacity=".75"/>` +
        `<path d="M25.5 39h9" stroke="${Ln(n, 0.4)}" stroke-width="1.2" stroke-linecap="round" opacity=".6"/>` +
        `<path d="M24 26v26" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" opacity=".34"/>`,
    );
  },

  // 槟榔干：牛皮纸袋 + 袋口卷边 + 三颗槟榔
  betel: (n) => {
    const g = 'url(#@bt2)';
    return dn(
      Mi(n),
      fn('bt2', 18, 26, 46, 26, [[0, Hn(n, 0.46)], [0.18, Hn(n, 0.04)], [0.52, Ln(n, 0.16)], [1, Ln(n, 0.74)]]) + je('gw', Hn(n, 0.5), 0.34),
      We('gw', 32, 34, 24) +
        `<path d="M20 24h24l-2.4 30c-.2 2.6-2.2 4.4-4.8 4.4H27.2c-2.6 0-4.6-1.8-4.8-4.4Z" fill="${g}" ${eP(n, 1.4)}/>` +
        `<path d="M20 24h24l-.8 6H20.8z" fill="${Ln(n, 0.28)}" opacity=".85"/>` +
        `<path d="M22 30.5h20" stroke="${Ln(n, 0.5)}" stroke-width="1.2" opacity=".6"/>` +
        `<ellipse cx="27" cy="41" rx="4.2" ry="3.2" fill="${Ln(n, 0.42)}" ${eP(n, 1)}/>` +
        `<ellipse cx="36" cy="44.5" rx="3.6" ry="2.8" fill="${Ln(n, 0.55)}" ${eP(n, 1)}/>` +
        `<ellipse cx="32" cy="35.5" rx="3" ry="2.4" fill="${Hn(n, 0.25)}" ${eP(n, 1)}/>` +
        `<path d="M22.5 33v20" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" opacity=".32"/>`,
    );
  },

  // 发酵果汁：玻璃瓶 + 吸管 + 果肉沉淀
  juice: (n) => {
    const g = 'url(#@ju)';
    return dn(
      Mi(n),
      fn('ju', 22, 30, 42, 30, [[0, Hn(n, 0.46)], [0.18, Hn(n, 0.04)], [0.52, Ln(n, 0.16)], [1, Ln(n, 0.74)]]) + je('gw', Hn(n, 0.5), 0.34),
      We('gw', 32, 36, 24) +
        `<path d="M24 22h16v8c0 2.4 3 4.4 3 9v15c0 2.6-2 4.4-4.6 4.4H25.6C23 58.4 21 56.6 21 54V39c0-4.6 3-6.6 3-9Z" fill="${g}" ${eP(n, 1.4)}/>` +
        `<path d="M26.5 17h11v5.4h-11z" fill="${Ln(n, 0.38)}" ${eP(n, 1.1)}/>` +
        `<path d="M38 15l5-7" stroke="#f4f7fb" stroke-width="2.6" stroke-linecap="round" opacity=".9"/>` +
        `<path d="M21.5 38h21v16h-21z" fill="#f4f7fb" opacity=".28"/>` +
        `<circle cx="27" cy="48" r="2.2" fill="${Hn(n, 0.4)}" opacity=".8"/>` +
        `<circle cx="34" cy="50" r="1.6" fill="${Hn(n, 0.4)}" opacity=".7"/>` +
        `<circle cx="31" cy="44" r="1.4" fill="${Hn(n, 0.4)}" opacity=".6"/>` +
        `<path d="M23 30v24" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" opacity=".4"/>`,
    );
  },
};

// 63 件装备 → 10 个形制族。装备的 id 不进 tH，统一在这里归类；
// 想给某一件单独画，就在 tH 里加同名键，Po() 会优先用它。
// 归类原则看"这件东西长什么样"，不看它的属性类别：
// 一根铁棍就是棍，一瓶药水就是瓶，不管它加的是物攻还是法强。
const tHx = {
  // 值是 '形制' 或 ['形制', 变体号]。变体号让同一个形制画出不同的东西，
  // 不然一页商店里会排出一列一模一样的棍子/罐子。
  // ── 棍棒：同一根杆，靠长度/粗细/末端零件区分 ──
  baton: ['blunt', 0],
  steel_pipe: ['blunt', 1],
  police_baton: ['blunt', 2],
  pry_bar: ['blunt', 3],
  baseball_bat: ['blunt', 4],
  sledgehammer: ['blunt', 5],
  demolition_hammer: ['blunt', 6],

  // ── 瓶装：细颈瓶 / 喷罐 / 大桶 / 小药瓶 / 奶瓶 / 炮仗 / 白酒 / 按压喷雾 / 泡酒罐 ──
  ddvp: ['bottle', 0],
  baijiu: ['bottle', 6],
  ddvp_concentrate: ['bottle', 2],
  spray_can: ['bottle', 1],
  pepper_spray: ['bottle', 7],
  huoxiang: ['bottle', 3],
  herb_jar: ['bottle', 8],
  wild_dog_milk: ['bottle', 4],
  firecracker: ['bottle', 5],

  // ── 罐筒：易拉罐 / 六罐装 / 奶粉罐 / 保温壶 / 钢瓶 / 消防栓 / 马克杯 / 充电宝 ──
  red_bull: ['can', 0],
  red_bull_pack: ['can', 1],
  milk_powder: ['can', 2],
  thermos: ['can', 3],
  gas_tank: ['can', 4],
  fire_hydrant: ['can', 5],
  ginger_tea: ['can', 6],
  power_bank: ['can', 7],

  // ── 块状 ──
  brick: ['brick', 0],
  concrete_block: ['brick', 1],

  // ── 布被 / 外套 / 铁网 ──
  cushion: ['cloth', 0],
  quilt: ['cloth', 1],
  mattress: ['cloth', 2],
  big_quilt: ['cloth', 3],
  fire_blanket: ['cloth', 4],
  padded_coat: ['coat', 0],
  raincoat: ['coat', 1],
  barbed_fence: 'mesh',

  // ── 盾门盆 ──
  riot_shield: ['shield', 0],
  iron_door: ['shield', 1],
  steel_basin: ['shield', 2],

  // ── 喇叭音响 ──
  megaphone: ['horn', 0],
  speaker: ['horn', 1],
  radio: ['horn', 2],
  suona: ['horn', 3],

  // ── 盒子：饭盒 / 急救箱 / 闹钟 / 冷风机 / 大锅 / 纸箱 ──
  lunchbox: ['box', 0],
  first_aid_kit: ['box', 1],
  alarm_clock: ['box', 2],
  air_cooler: ['box', 3],
  big_pot: ['box', 4],
  red_bull_case: ['box', 5],

  // ── 头面护具 ──
  gas_mask: ['mask', 0],
  riot_armor: ['mask', 1],
  hard_hat: 'helmet',
  bulletproof_vest: 'vest',

  // ── 一件一个形制 ──
  knuckle: 'knuckle',
  steel_nail: 'nail',
  slingshot: 'sling',
  chain_whip: 'chain',
  wrench: 'wrench',
  nail_gun: 'gun',
  dumbbell: 'dumbbell',
  e_bike: 'bike',
  // 消耗品：一件一个样子，不共用形制
  trenbolone: ['syringe', 0],
  stanozolol: ['syringe', 1],
  cigarette: 'cigpack',
  betel_nut: 'betel',
  fermented_juice: 'juice',
};

function Po(n) {
  // tHx 的值可以是 'blunt'，也可以是 ['blunt', 3]：后者是同一形制下的变体
  // （同一根杆画成警棍/钢管/撬棍/球棒……），不然一页商店里会排出一列一模一样的东西。
  const e = tHx[n],
    k = Array.isArray(e) ? e[0] : e,
    v = Array.isArray(e) ? e[1] : 0,
    f = tH[n] ?? tH[k] ?? tH.box;
  return f(ln[n].color, v);
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
    // 表情：气泡 + 笑脸（气泡走描边，五官走填充，小尺寸下比实心块清楚）
    emote: `<path d="M4.400 3.600h15.200c1 0 1.800.8 1.800 1.800v10c0 1-.8 1.800-1.800 1.800h-7.500L7 21.400v-4.200H4.400c-1 0-1.800-.8-1.800-1.800v-10c0-1 .8-1.800 1.800-1.800z" ${Ne(1.9)}/><circle cx="8.900" cy="9.800" r="1.400" ${Ye}/><circle cx="15.100" cy="9.800" r="1.400" ${Ye}/><path d="M8.900 13.200q3.100 2.600 6.200 0" ${Ne(1.7)}/>`,
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
    stasis: { name: "金身", kind: "buff" },
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
    niumo_flame: { name: "磨砂火焰", kind: "debuff" },
    niumo_ult: { name: "烈焰牛魔", kind: "buff" },
    xingli_mark: { name: "余音", kind: "debuff" },
    fengling_gale: { name: "连射", kind: "buff" },
    fengling_crit: { name: "下一箭必暴", kind: "buff" },
    yeque_shadow: { name: "得手", kind: "buff" },
    tower_focus: { name: "防御塔锁定", kind: "debuff" },
    // 消耗品带来的持续增益。id 必须和 _o() 里的 case 完全一致，
    // 漏登记一个就会让 HUD 状态行读 T3[id].kind 时炸掉（lH 有兜底但不解决图标错）。
    ad_up: { name: "物攻提升", kind: "buff" },
    ap_up: { name: "法强提升", kind: "buff" },
    armor_up: { name: "护甲提升", kind: "buff" },
    mr_up: { name: "魔抗提升", kind: "buff" },
    hp_regen: { name: "持续回血", kind: "buff" },
    mana_regen: { name: "持续回蓝", kind: "buff" },
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
    niumo_flame: () => Ia("niumo", "s2"),
    niumo_ult: () => Ia("niumo", "ult"),
    xingli_mark: () => Ia("xingli", "passive"),
    fengling_gale: () => Ia("fengling", "passive"),
    fengling_crit: () => Ia("fengling", "s2"),
    yeque_shadow: () => Ia("yeque", "passive"),
    tower_focus: () => Hs("#c8303a", M4("target")),
    // 装备主动带来的状态（金身护符）
    stasis: () => Hs("#ffd76a", M4("shield")),
    // 消耗品的持续增益：和 T3 一一对应。图标复用状态行的 24×24 符号集
    // （M4 只认这些键；别塞完整 <svg>，Hs 是把它嵌进 <g transform> 里的）
    ad_up: () => Hs("#ff8a5a", M4("damage")),
    ap_up: () => Hs("#9cb4ff", M4("damage")),
    armor_up: () => Hs("#9fb4c9", M4("shield")),
    mr_up: () => Hs("#8fc7ff", M4("shield")),
    hp_regen: () => Hs("#56c7a0", M4("heart")),
    mana_regen: () => Hs("#5b9bff", M4("mana")),
  };

function lH(n) {
  // 漏登记一个 id 不该把整个状态行炸掉（stasis 就漏过一次）
  const t = rH[n];
  return t ? t() : Hs("#8fb8e8", M4("shield"));
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
    niumo: { survive: 9.2, damage: 7, control: 4.2, mobility: 4.6, ease: 8.4 },
  },
  hh = {
    easy: { label: "简单", desc: "敌人反应慢、技能不准、很少越线；队友也不强，输赢看你。适合第一次玩。" },
    normal: { label: "普通", desc: "AI 会补兵换血、游走抱团，接近普通玩家。" },
    hard: { label: "困难", desc: "AI 反应快，会集火、反蹲与连招收割。" },
  },
  uH = ["easy", "normal", "hard"],
  Z1 = new Set();

function Zh(n, t, e) {
  // t 可能是占位皮 id（frog/boxman…）：配色/角色名要退回它借的那个英雄
  const s = Se[kartSpec(t)?.kit ?? t],
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
    ((o.alt = z0(s)), (o.draggable = !1), (o.dataset.sfPortrait = t));
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
  // n 可能是占位皮 id：定位/称号退回它借的英雄，名字用皮自己的
  const sp = kartSpec(n),
    e = Se[sp?.kit ?? n],
    s = z("small", "sf-heroname__role", ` · ${e.roleName}`),
    i = z("span", `sf-heroname${t ? ` ${t}` : ""}`, sp?.name ?? e.name, s);
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
      : "",
    o = n.active
      ? `<div class="sf-tip__active"><b>主动 · ${ks(n.active.name)}<i class="sf-num">${n.active.cd} 秒</i></b>　${ks(n.active.desc)}</div>`
      : "";
  return `<div class="sf-tip__title"><span>${ks(n.name)}</span><span class="sf-tip__meta sf-num">${n.cost} 金币</span></div>${e}${i}${a}${o}`;
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
