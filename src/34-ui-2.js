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

const tH = {
  slippers: (n) => {
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
  liberation_shoes: (n) =>
    C2(
      n,
      w4("pl", 16, 10, 30, 36),
      "",
      `<path d="M17 13H28V28.5L22.5 34L17 28.5Z" fill="url(#@pl)" ${Pe(1.1)}/><path d="M22.5 15V31" stroke="#ffffff" stroke-width="1" opacity=".7"/><path d="M37 36.5L44 40Q49 42.5 49 48V51H35.5Z" fill="url(#@pl)" ${Pe(1.1)}/><circle cx="19.5" cy="15.5" r="1" fill="${xe}"/><circle cx="25.5" cy="15.5" r="1" fill="${xe}"/><circle cx="39" cy="48" r="1" fill="${xe}"/><circle cx="45.5" cy="48" r="1" fill="${xe}"/><path d="M11.5 3.5H33.5L31.5 9.5H13.5Z" fill="${Hn(n, 0.45)}" ${Pe(1.1)}/>`,
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
      `<path d="M25 27Q9 23 2 9Q13 14 25 18Z" fill="url(#@wg)" ${Pe(1.1)}/><path d="M25 32Q11 31 3 21Q13 24.5 25 25.5Z" fill="url(#@wg)" ${Pe(1.1)}/><path d="M25 37Q14 38.5 7 32.5Q15 33.5 25 32Z" fill="url(#@wg)" ${Pe(1.1)}/><circle cx="25.5" cy="27.5" r="3" fill="#f3cf85" ${Pe(1)}/>`,
    ),
  // ══ 下面是"现代市井"的十个形制，按外形分族，所有装备都指到其中之一 ══
  // 一件手绘图标是 20~40 行 SVG，63 件挨个画不现实；同族共用一套画法、只换配色，
  // 视觉上仍然是"一套里的"。要单独美化某一件，就在 tH 里加同名键覆盖 tHx。

  // 棍棒：警棍 / 钢管 / 铁链 / 指虎 / 扳手 / 球棒 / 大锤 / 撬棍 / 哑铃 / 钢钉
  blunt: (n) =>
    dn(
      Mi(n),
      fn('bd', 18, 8, 48, 56, [
        [0, Hn(n, 0.5)],
        [0.5, n],
        [1, Ln(n, 0.55)],
      ]) + je('gw', Hn(n, 0.4), 0.8),
      We('gw', 32, 32, 26) +
        `<path d="M20.5 52.5L44 15.5" stroke="${xe}" stroke-width="13" stroke-linecap="round"/><path d="M20.5 52.5L44 15.5" stroke="url(#@bd)" stroke-width="10" stroke-linecap="round"/>` +
        `<path d="M23.5 48.5L27 43M28.5 40.5L32 35" stroke="${Ln(n, 0.45)}" stroke-width="2.2" stroke-linecap="round" opacity=".8"/>` +
        `<circle cx="44.5" cy="14.5" r="7.4" fill="url(#@bd)" ${Pe(1.4)}/><circle cx="42.4" cy="12.4" r="2.2" fill="#ffffff" opacity=".55"/>` +
        `<path d="M24 49L28.6 42" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round" opacity=".45"/>`,
    ),

  // 瓶装：敌敌畏 / 杀虫喷雾 / 防狼喷雾 / 二锅头 / 藿香正气水 / 药酒罐 / 野生狗奶
  bottle: (n) =>
    dn(
      Mi(n),
      fn('bt', 22, 12, 44, 58, [
        [0, Hn(n, 0.55)],
        [0.45, n],
        [1, Ln(n, 0.55)],
      ]) + je('gw', Hn(n, 0.4), 0.7),
      We('gw', 33, 38, 24) +
        `<path d="M28 8h10v6.5c0 3 4.5 5.5 4.5 10V53c0 2.6-2 4.5-4.5 4.5H28c-2.6 0-4.5-1.9-4.5-4.5V24.5c0-4.5 4.5-7 4.5-10Z" fill="url(#@bt)" ${Pe(1.4)}/>` +
        `<path d="M25.5 6.5h15v4.5h-15z" fill="${Ln(n, 0.5)}" ${Pe(1.2)}/>` +
        `<path d="M23.5 31h19v11h-19z" fill="#f4f7fb" opacity=".85"/>` +
        `<path d="M27 36.5h12" stroke="${Ln(n, 0.55)}" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>` +
        `<path d="M27.5 22.5v26" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity=".4"/>`,
    ),

  // 罐筒：红牛 / 奶粉罐 / 充电宝 / 保温壶 / 煤气罐 / 消防栓 / 红糖姜茶
  can: (n) =>
    dn(
      Mi(n),
      fn('cn', 20, 14, 46, 56, [
        [0, Hn(n, 0.5)],
        [0.5, n],
        [1, Ln(n, 0.55)],
      ]) + je('gw', Hn(n, 0.4), 0.75),
      We('gw', 32, 34, 24) +
        `<path d="M22 17h20v30c0 3.4-2.2 5.6-5.6 5.6H27.6C24.2 52.6 22 50.4 22 47Z" fill="url(#@cn)" ${Pe(1.4)}/>` +
        `<ellipse cx="32" cy="17" rx="10" ry="3.6" fill="${Hn(n, 0.55)}" ${Pe(1.3)}/>` +
        `<ellipse cx="32" cy="17" rx="5.6" ry="1.9" fill="${Ln(n, 0.35)}"/>` +
        `<path d="M22 27h20v13H22z" fill="#f4f7fb" opacity=".9"/>` +
        `<path d="M26 33.5h12" stroke="${Ln(n, 0.5)}" stroke-width="1.7" stroke-linecap="round" opacity=".75"/>` +
        `<path d="M25.5 22v22" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity=".4"/>`,
    ),

  // 块状：板砖 / 水泥墩
  brick: (n) =>
    dn(
      Mi(n),
      fn('brk', 12, 20, 52, 50, [
        [0, Hn(n, 0.45)],
        [0.5, n],
        [1, Ln(n, 0.55)],
      ]) + je('gw', Hn(n, 0.4), 0.7),
      We('gw', 32, 34, 24) +
        `<path d="M12 24l20-9 20 9v18l-20 9-20-9z" fill="url(#@brk)" ${Pe(1.5)}/>` +
        `<path d="M12 24l20 9 20-9M32 33v18" stroke="${Ln(n, 0.5)}" stroke-width="1.4" opacity=".75"/>` +
        `<path d="M17 26.5l11-5 11 5" fill="none" stroke="#ffffff" stroke-width="1.3" opacity=".45"/>` +
        `<path d="M22 38l6 2.6M36 40.6l6-2.6" stroke="${Ln(n, 0.45)}" stroke-width="1.2" opacity=".6"/>`,
    ),

  // 布/被：棉袄 / 沙发垫 / 棉被 / 席梦思 / 雨衣 / 灭火毯 / 铁丝网 / 十斤大棉被
  cloth: (n) =>
    dn(
      Mi(n),
      fn('cl', 14, 18, 50, 54, [
        [0, Hn(n, 0.5)],
        [0.5, n],
        [1, Ln(n, 0.5)],
      ]) + je('gw', Hn(n, 0.4), 0.7),
      We('gw', 32, 34, 24) +
        `<path d="M15 22c0-3 2-5 5-5h24c3 0 5 2 5 5v20c0 3-2 5-5 5H20c-3 0-5-2-5-5z" fill="url(#@cl)" ${Pe(1.5)}/>` +
        `<path d="M15 27c6 3.5 11 3.5 17 0s11-3.5 17 0M15 33c6 3.5 11 3.5 17 0s11-3.5 17 0M15 39c6 3.5 11 3.5 17 0s11-3.5 17 0" fill="none" stroke="${Ln(n, 0.5)}" stroke-width="1.3" opacity=".7"/>` +
        `<path d="M15 24.5c6 3.5 11 3.5 17 0s11-3.5 17 0" fill="none" stroke="#ffffff" stroke-width="1.2" opacity=".45"/>`,
    ),

  // 盾/门/盆：防暴盾牌 / 防盗门 / 不锈钢大盆
  shield: (n) =>
    dn(
      Mi(n),
      fn('sh', 14, 12, 50, 56, [
        [0, Hn(n, 0.5)],
        [0.5, n],
        [1, Ln(n, 0.55)],
      ]) + je('gw', Hn(n, 0.4), 0.8),
      We('gw', 32, 32, 26) +
        `<path d="M32 9l17 6v16c0 11-7.5 18-17 22-9.5-4-17-11-17-22V15z" fill="url(#@sh)" ${Pe(1.6)}/>` +
        `<path d="M32 14.5l11.5 4v12.5c0 7.5-5 12.5-11.5 15.5-6.5-3-11.5-8-11.5-15.5V18.5z" fill="none" stroke="#ffffff" stroke-width="1.3" opacity=".5"/>` +
        `<path d="M26.5 24h11v8.5h-11z" fill="#cfe6ff" opacity=".55" ${Pe(1.1)}/>` +
        `<path d="M22 40h20" stroke="${Ln(n, 0.5)}" stroke-width="1.5" opacity=".6"/>`,
    ),

  // 喇叭：大喇叭 / 广场舞音响 / 收音机 / 唢呐 / 弹弓
  horn: (n) =>
    dn(
      Mi(n),
      fn('hn', 10, 16, 54, 48, [
        [0, Hn(n, 0.5)],
        [0.5, n],
        [1, Ln(n, 0.55)],
      ]) + je('gw', Hn(n, 0.4), 0.8),
      We('gw', 30, 32, 26) +
        `<path d="M14 27h8l20-13v36L22 37h-8z" fill="url(#@hn)" ${Pe(1.5)}/>` +
        `<path d="M46 19c4 3 4 11 0 14" fill="none" stroke="${Hn(n, 0.5)}" stroke-width="2.4" stroke-linecap="round"/>` +
        `<path d="M51 15c6.5 5 6.5 19 0 24" fill="none" stroke="${Hn(n, 0.4)}" stroke-width="2.2" stroke-linecap="round" opacity=".8"/>` +
        `<path d="M18 27v10" stroke="#ffffff" stroke-width="1.5" opacity=".5"/>`,
    ),

  // 盒子：饭盒 / 急救箱 / 闹钟 / 冷风机 / 大锅菜
  box: (n) =>
    dn(
      Mi(n),
      fn('bx', 12, 22, 52, 52, [
        [0, Hn(n, 0.45)],
        [0.5, n],
        [1, Ln(n, 0.55)],
      ]) + je('gw', Hn(n, 0.4), 0.7),
      We('gw', 32, 34, 24) +
        `<path d="M14 26h36v22c0 2.5-1.5 4-4 4H18c-2.5 0-4-1.5-4-4z" fill="url(#@bx)" ${Pe(1.5)}/>` +
        `<path d="M12 20h40v7H12z" fill="${Hn(n, 0.4)}" ${Pe(1.4)}/>` +
        `<path d="M27 34h10v4h-10zM30 30h4v12h-4z" fill="#f4f7fb" opacity=".92"/>` +
        `<path d="M18 29v17" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" opacity=".4"/>`,
    ),

  // 头盔/面罩：安全帽 / 防毒面具 / 防弹衣 / 防暴服
  mask: (n) =>
    dn(
      Mi(n),
      fn('mk', 14, 14, 50, 54, [
        [0, Hn(n, 0.5)],
        [0.5, n],
        [1, Ln(n, 0.55)],
      ]) + je('gw', Hn(n, 0.4), 0.8),
      We('gw', 32, 32, 26) +
        `<path d="M32 10c9.5 0 16 5 16 13v9c0 10-7 16-16 22-9-6-16-12-16-22v-9c0-8 6.5-13 16-13z" fill="url(#@mk)" ${Pe(1.6)}/>` +
        `<path d="M20.5 27h23v9h-23z" fill="#0a1128" opacity=".85" ${Pe(1.2)}/>` +
        `<path d="M24 31.5h6M34 31.5h6" stroke="${Hn(n, 0.6)}" stroke-width="2.4" stroke-linecap="round"/>` +
        `<path d="M26 42h12" stroke="${Ln(n, 0.5)}" stroke-width="1.5" stroke-linecap="round" opacity=".7"/>`,
    ),

  // 车：电动车
  bike: (n) =>
    dn(
      Mi(n),
      fn('bk', 12, 20, 52, 50, [
        [0, Hn(n, 0.5)],
        [0.5, n],
        [1, Ln(n, 0.55)],
      ]) + je('gw', Hn(n, 0.4), 0.7),
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
      fn('kn', 10, 24, 54, 48, [
        [0, Hn(n, 0.5)],
        [0.5, n],
        [1, Ln(n, 0.55)],
      ]) + je('gw', Hn(n, 0.4), 0.75),
      We('gw', 32, 34, 24) +
        `<path d="M13 25h38c2.4 0 4 1.6 4 4v12c0 2.4-1.6 4-4 4H13c-2.4 0-4-1.6-4-4V29c0-2.4 1.6-4 4-4Z" fill="url(#@kn)" ${Pe(1.5)}/>` +
        `<circle cx="17.5" cy="35" r="4.4" fill="${xe}"/><circle cx="28" cy="35" r="4.4" fill="${xe}"/><circle cx="38.5" cy="35" r="4.4" fill="${xe}"/><circle cx="49" cy="35" r="4.4" fill="${xe}"/>` +
        `<path d="M12 28.5h40" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" opacity=".45"/>`,
    ),

  // 钢钉：扁头 + 尖身
  nail: (n) =>
    dn(
      Mi(n),
      fn('nl', 24, 12, 40, 52, [
        [0, Hn(n, 0.55)],
        [0.5, n],
        [1, Ln(n, 0.45)],
      ]) + je('gw', Hn(n, 0.4), 0.75),
      We('gw', 32, 32, 22) +
        `<path d="M22 10h20v7H22z" fill="${Hn(n, 0.5)}" ${Pe(1.4)}/>` +
        `<path d="M28.5 17h7v25L32 54l-3.5-12z" fill="url(#@nl)" ${Pe(1.3)}/>` +
        `<path d="M30 19v23" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" opacity=".5"/>` +
        `<path d="M22 12.5h20" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" opacity=".4"/>`,
    ),

  // 弹弓：Y 形叉 + 皮筋
  sling: (n) =>
    dn(
      Mi(n),
      fn('sl', 18, 12, 46, 54, [
        [0, Hn(n, 0.5)],
        [0.5, n],
        [1, Ln(n, 0.5)],
      ]) + je('gw', Hn(n, 0.4), 0.75),
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
      fn('ch', 12, 12, 52, 52, [
        [0, Hn(n, 0.5)],
        [0.5, n],
        [1, Ln(n, 0.5)],
      ]) + je('gw', Hn(n, 0.4), 0.7),
      We('gw', 32, 32, 24) +
        [0, 1, 2, 3, 4]
          .map((i) => {
            const x = 14 + i * 9,
              y = 50 - i * 9,
              c = i % 2 ? Hn(n, 0.45) : Ln(n, 0.15);
            return `<ellipse cx="${x}" cy="${y}" rx="7.6" ry="4.8" transform="rotate(-45 ${x} ${y})" fill="none" stroke="${xe}" stroke-width="4.4"/><ellipse cx="${x}" cy="${y}" rx="7.6" ry="4.8" transform="rotate(-45 ${x} ${y})" fill="none" stroke="${c}" stroke-width="2.6"/>`;
          })
          .join('') +
        `<ellipse cx="14" cy="50" rx="7.6" ry="4.8" transform="rotate(-45 14 50)" fill="none" stroke="#ffffff" stroke-width="1" opacity=".4"/>`,
    ),

  // 扳手：开口钳头 + 长柄
  wrench: (n) =>
    dn(
      Mi(n),
      fn('wr', 20, 8, 44, 56, [
        [0, Hn(n, 0.55)],
        [0.5, n],
        [1, Ln(n, 0.5)],
      ]) + je('gw', Hn(n, 0.4), 0.75),
      We('gw', 32, 30, 24) +
        `<path d="M32 20v32" stroke="${Ln(n, 0.4)}" stroke-width="9" stroke-linecap="round"/><path d="M32 20v32" stroke="url(#@wr)" stroke-width="6.4" stroke-linecap="round"/>` +
        `<path d="M24 8h16v5.5h-5.2v6.2H29.2V13.5H24Z" fill="url(#@wr)" ${Pe(1.4)}/>` +
        `<path d="M24 8h16v5.5h-5.2v6.2H29.2V13.5H24Z" fill="none" stroke="${Ln(n, 0.5)}" stroke-width="1" opacity=".6"/>` +
        `<circle cx="32" cy="42" r="2.6" fill="${xe}" opacity=".7"/>` +
        `<path d="M28.5 24v18" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round" opacity=".45"/>`,
    ),

  // 锤：横着的锤头 + 竖柄
  hammer: (n) =>
    dn(
      Mi(n),
      fn('hm', 12, 10, 52, 28, [
        [0, Hn(n, 0.55)],
        [0.5, n],
        [1, Ln(n, 0.5)],
      ]) + je('gw', Hn(n, 0.4), 0.8),
      We('gw', 32, 26, 26) +
        `<path d="M31 24v31" stroke="${Ln(n, 0.45)}" stroke-width="8" stroke-linecap="round"/><path d="M31 24v31" stroke="url(#@hm)" stroke-width="5.6" stroke-linecap="round"/>` +
        `<path d="M13 11h38c1.6 0 2.6 1 2.6 2.6v11c0 1.6-1 2.6-2.6 2.6H13c-1.6 0-2.6-1-2.6-2.6v-11C10.4 12 11.4 11 13 11Z" fill="url(#@hm)" ${Pe(1.6)}/>` +
        `<path d="M16 14.5h32" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" opacity=".5"/>` +
        `<path d="M31 47h4" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round" opacity=".4"/>`,
    ),

  // 哑铃：一根横杆两端配重
  dumbbell: (n) =>
    dn(
      Mi(n),
      fn('db', 6, 18, 58, 46, [
        [0, Hn(n, 0.5)],
        [0.5, n],
        [1, Ln(n, 0.55)],
      ]) + je('gw', Hn(n, 0.4), 0.75),
      We('gw', 32, 32, 24) +
        `<path d="M22 32h20" stroke="${Ln(n, 0.4)}" stroke-width="7" stroke-linecap="round"/>` +
        `<path d="M22 32h20" stroke="${Hn(n, 0.35)}" stroke-width="4" stroke-linecap="round"/>` +
        `<rect x="12" y="18" width="11" height="28" rx="3.4" fill="url(#@db)" ${Pe(1.5)}/>` +
        `<rect x="41" y="18" width="11" height="28" rx="3.4" fill="url(#@db)" ${Pe(1.5)}/>` +
        `<rect x="5" y="25" width="6" height="14" rx="2.2" fill="${Hn(n, 0.3)}" ${Pe(1.1)}/>` +
        `<rect x="53" y="25" width="6" height="14" rx="2.2" fill="${Hn(n, 0.3)}" ${Pe(1.1)}/>` +
        `<path d="M15 22v20M44 22v20" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round" opacity=".45"/>`,
    ),

  // 射钉枪：枪身 + 枪管 + 握把
  gun: (n) =>
    dn(
      Mi(n),
      fn('gn', 14, 18, 56, 50, [
        [0, Hn(n, 0.5)],
        [0.5, n],
        [1, Ln(n, 0.55)],
      ]) + je('gw', Hn(n, 0.4), 0.75),
      We('gw', 32, 32, 24) +
        `<path d="M14 22h26c2 0 3 1 3 3v9c0 2-1 3-3 3H14c-2 0-3-1-3-3v-9c0-2 1-3 3-3Z" fill="url(#@gn)" ${Pe(1.5)}/>` +
        `<path d="M43 26h13v5H43z" fill="${Ln(n, 0.25)}" ${Pe(1.2)}/>` +
        `<path d="M20 37l-4 16h10l4-16z" fill="${Hn(n, 0.35)}" ${Pe(1.3)}/>` +
        `<path d="M29 37l2 9h7l-1-9z" fill="${Ln(n, 0.3)}" opacity=".8"/>` +
        `<path d="M16 26h22" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round" opacity=".5"/>` +
        `<circle cx="40" cy="30" r="1.6" fill="#ffffff" opacity=".6"/>`,
    ),

  // 外套：棉袄 / 雨衣
  coat: (n) =>
    dn(
      Mi(n),
      fn('ct', 10, 12, 54, 52, [
        [0, Hn(n, 0.5)],
        [0.5, n],
        [1, Ln(n, 0.5)],
      ]) + je('gw', Hn(n, 0.4), 0.7),
      We('gw', 32, 32, 24) +
        `<path d="M23 13l9-4 9 4 11 7-5 12-5-3.5V53H22V28.5L17 32 12 20z" fill="url(#@ct)" ${Pe(1.5)}/>` +
        `<path d="M27 14l5 9 5-9" fill="none" stroke="${Ln(n, 0.45)}" stroke-width="1.6" stroke-linejoin="round"/>` +
        `<path d="M32 23v29" stroke="${Ln(n, 0.45)}" stroke-width="1.4" opacity=".7"/>` +
        `<path d="M22 34h20M22 42h20" stroke="${Ln(n, 0.4)}" stroke-width="1.1" opacity=".45"/>` +
        `<path d="M23 15l-6 6" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round" opacity=".45"/>`,
    ),

  // 铁丝网：菱形网格
  mesh: (n) =>
    dn(
      Mi(n),
      fn('ms', 12, 14, 52, 50, [
        [0, Hn(n, 0.45)],
        [0.5, n],
        [1, Ln(n, 0.5)],
      ]) + je('gw', Hn(n, 0.4), 0.7),
      We('gw', 32, 32, 24) +
        [[22, 24], [42, 24], [32, 34], [22, 44], [42, 44]]
          .map(([x, y]) => `<path d="${hn(x, y, 9.5, 0.1)}" fill="none" stroke="${xe}" stroke-width="3.4"/><path d="${hn(x, y, 9.5, 0.1)}" fill="none" stroke="${Hn(n, 0.3)}" stroke-width="1.7"/>`)
          .join('') +
        `<rect x="11" y="13" width="42" height="38" rx="2.5" fill="none" stroke="${Ln(n, 0.35)}" stroke-width="2.4"/>` +
        `<path d="M13 17h38" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" opacity=".35"/>`,
    ),

  // 安全帽：帽壳 + 帽檐
  helmet: (n) =>
    dn(
      Mi(n),
      fn('hl', 10, 14, 54, 42, [
        [0, Hn(n, 0.55)],
        [0.5, n],
        [1, Ln(n, 0.5)],
      ]) + je('gw', Hn(n, 0.4), 0.8),
      We('gw', 32, 30, 26) +
        `<path d="M14 33a18 18 0 0 1 36 0Z" fill="url(#@hl)" ${Pe(1.5)}/>` +
        `<path d="M8 33h48c1.4 0 2.4 1 2.4 2.4v2.2c0 1.4-1 2.4-2.4 2.4H8c-1.4 0-2.4-1-2.4-2.4v-2.2C5.6 34 6.6 33 8 33Z" fill="${Hn(n, 0.35)}" ${Pe(1.4)}/>` +
        `<path d="M32 15v18" stroke="${Ln(n, 0.4)}" stroke-width="1.6" opacity=".6"/>` +
        `<path d="M18 26c2-6 8-9 14-9" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" opacity=".45"/>` +
        `<path d="M24 41v6M40 41v6" stroke="${Ln(n, 0.3)}" stroke-width="1.4" opacity=".55"/>`,
    ),

  // 马甲：防弹衣 / 防暴服
  vest: (n) =>
    dn(
      Mi(n),
      fn('vs', 12, 12, 52, 52, [
        [0, Hn(n, 0.5)],
        [0.5, n],
        [1, Ln(n, 0.5)],
      ]) + je('gw', Hn(n, 0.4), 0.75),
      We('gw', 32, 32, 24) +
        `<path d="M23 11l9 6 9-6 9 6v38H14V17z" fill="url(#@vs)" ${Pe(1.5)}/>` +
        `<path d="M32 17v38" stroke="${Ln(n, 0.45)}" stroke-width="1.5" opacity=".7"/>` +
        `<path d="M17 30h12M35 30h12" stroke="${Ln(n, 0.4)}" stroke-width="1.6" opacity=".55"/>` +
        `<path d="M18 40h11v9H18zM35 40h11v9H35z" fill="${Ln(n, 0.3)}" opacity=".55" ${Pe(1)}/>` +
        `<path d="M23 13l4 5" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round" opacity=".45"/>`,
    ),
};

// 63 件装备 → 10 个形制族。装备的 id 不进 tH，统一在这里归类；
// 想给某一件单独画，就在 tH 里加同名键，Po() 会优先用它。
// 归类原则看"这件东西长什么样"，不看它的属性类别：
// 一根铁棍就是棍，一瓶药水就是瓶，不管它加的是物攻还是法强。
const tHx = {
  // ── 棍棒：有杆、有握把的东西 ──
  baton: 'blunt',
  steel_pipe: 'blunt',
  police_baton: 'blunt',
  wrench: 'wrench',
  baseball_bat: 'blunt',
  chain_whip: 'chain',
  knuckle: 'knuckle',
  slingshot: 'sling',
  steel_nail: 'nail',
  dumbbell: 'dumbbell',
  nail_gun: 'gun',
  sledgehammer: 'hammer',
  pry_bar: 'blunt',
  demolition_hammer: 'hammer',

  // ── 瓶装液体：敌敌畏、喷雾、酒、药水 ──
  ddvp: 'bottle',
  ddvp_concentrate: 'bottle',
  spray_can: 'bottle',
  pepper_spray: 'bottle',
  firecracker: 'bottle',
  baijiu: 'bottle',
  herb_jar: 'bottle',
  huoxiang: 'bottle',
  wild_dog_milk: 'bottle',

  // ── 罐筒：饮料罐、奶粉罐、壶、钢瓶、消防栓 ──
  red_bull: 'can',
  red_bull_pack: 'can',
  milk_powder: 'can',
  power_bank: 'can',
  thermos: 'can',
  gas_tank: 'can',
  fire_hydrant: 'can',
  ginger_tea: 'can',

  // ── 块状：板砖、水泥 ──
  brick: 'brick',
  concrete_block: 'brick',

  // ── 布被：衣、垫、被、毯、网 ──
  padded_coat: 'coat',
  raincoat: 'coat',
  cushion: 'cloth',
  quilt: 'cloth',
  mattress: 'cloth',
  big_quilt: 'cloth',
  fire_blanket: 'cloth',
  barbed_fence: 'mesh',

  // ── 盾门盆：挡在身前的一大片 ──
  riot_shield: 'shield',
  iron_door: 'shield',
  steel_basin: 'shield',

  // ── 喇叭音响：往外发声的 ──
  megaphone: 'horn',
  speaker: 'horn',
  radio: 'horn',
  suona: 'horn',

  // ── 盒子：饭盒、箱子、机器、锅 ──
  lunchbox: 'box',
  first_aid_kit: 'box',
  alarm_clock: 'box',
  air_cooler: 'box',
  big_pot: 'box',
  red_bull_case: 'box',

  // ── 头面护具：帽子、面罩、马甲 ──
  hard_hat: 'helmet',
  gas_mask: 'mask',
  bulletproof_vest: 'vest',
  riot_armor: 'vest',

  // ── 车 ──
  e_bike: 'bike',
};

function Po(n) {
  const f = tH[n] ?? tH[tHx[n]] ?? tH.box;
  return f(ln[n].color);
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
