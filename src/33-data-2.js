// 33-data-2.js — data｜45 个顶层语句｜49KB
// 对应 game.pretty.js 第 65487–66541 行
// 关键内容：
//   ln                    移速草鞋
//   _3                    左上河道
//   zB                    全队
//   NB                    拿到蓝buff：冷却缩减 +${Ps(yn.frost
//   X1                    朝一个方向
//   Y1                    半径 ${n.radius} 米
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { yn, yr } from './01-audio.js';
import { Br, Se, ea } from './02-data.js';

const ln = {
    boots: {
      id: "boots",
      name: "移速草鞋",
      brief: "跑得更快的基础鞋",
      category: "boots",
      tier: 1,
      cost: 250,
      stats: { moveSpeed: 0.5 },
      color: "#a8794f",
    },
    boots_guard: {
      id: "boots_guard",
      name: "护甲铁靴",
      brief: "跑得快，还更抗物理伤害",
      category: "boots",
      tier: 2,
      cost: 710,
      stats: { moveSpeed: 0.6, armor: 110 },
      color: "#8d99a8",
    },
    boots_arcane: {
      id: "boots_arcane",
      name: "减冷却布靴",
      brief: "跑得快，技能冷却更短",
      category: "boots",
      tier: 2,
      cost: 710,
      stats: { moveSpeed: 0.6, cdr: 0.15 },
      color: "#7f8cff",
    },
    boots_fury: {
      id: "boots_fury",
      name: "攻速皮靴",
      brief: "跑得快，普攻出手更快",
      category: "boots",
      tier: 2,
      cost: 710,
      stats: { moveSpeed: 0.6, attackSpeedPct: 0.25 },
      color: "#56c7a0",
    },
    starfall_blade: {
      id: "starfall_blade",
      name: "收割斩马剑",
      brief: "物攻最高，打残血更疼",
      category: "attack",
      tier: 2,
      cost: 2100,
      stats: { ad: 110, cdr: 0.1 },
      passive: {
        id: "execute_bonus",
        name: "收割",
        desc: "对生命低于 50% 的敌人，伤害 +15%(对建筑无效)。",
        value: 0.15,
        value2: 0.5,
      },
      color: "#ffb44d",
    },
    sunchaser_bow: {
      id: "sunchaser_bow",
      name: "攻速角弓",
      brief: "攻速大涨，普攻附带法伤",
      category: "attack",
      tier: 2,
      cost: 1900,
      stats: { attackSpeedPct: 0.35, critChance: 0.15, moveSpeed: 0.25 },
      passive: {
        id: "onhit_magic",
        name: "附带法伤",
        desc: "普攻额外造成 45 点法术伤害(对建筑无效)。",
        value: 45,
      },
      color: "#ffd76a",
    },
    blood_scythe: {
      id: "blood_scythe",
      name: "吸血环首刀",
      brief: "普攻造成伤害，自己回血",
      category: "attack",
      tier: 2,
      cost: 1800,
      stats: { ad: 85, lifesteal: 0.2 },
      color: "#d8433f",
    },
    piercing_spear: {
      id: "piercing_spear",
      name: "破甲长戟",
      brief: "专克高护甲：无视 35% 护甲",
      category: "attack",
      tier: 2,
      cost: 2e3,
      stats: { ad: 75, armorPen: 0.35 },
      color: "#9fb4c9",
    },
    phantom_edge: {
      id: "phantom_edge",
      name: "暴击吴钩",
      brief: "暴击率高，暴击打得更疼",
      category: "attack",
      tier: 2,
      cost: 2150,
      stats: { ad: 60, critChance: 0.3, critDamage: 0.3 },
      color: "#b48cff",
    },
    astral_staff: {
      id: "astral_staff",
      name: "减冷却法杖",
      brief: "法强、蓝量、减冷却都给",
      category: "magic",
      tier: 2,
      cost: 2e3,
      stats: { ap: 180, mana: 300, cdr: 0.1 },
      color: "#6aa8ff",
    },
    void_crown: {
      id: "void_crown",
      name: "法穿玉冠",
      brief: "专克高魔抗：无视 35% 魔抗",
      category: "magic",
      tier: 2,
      cost: 2100,
      stats: { ap: 150, magicPen: 0.35 },
      color: "#9b6bff",
    },
    winter_scepter: {
      id: "winter_scepter",
      name: "减速权杖",
      brief: "技能打中就减速，自己更耐打",
      category: "magic",
      tier: 2,
      cost: 2e3,
      stats: { ap: 110, hp: 800 },
      passive: {
        id: "spell_slow",
        name: "技能减速",
        desc: "技能造成伤害时使目标减速 20%，持续 1 秒。",
        value: 0.2,
        value2: 1,
      },
      color: "#8fe3ff",
    },
    sage_codex: {
      id: "sage_codex",
      name: "法强竹简",
      brief: "法强最高，技能伤害最猛",
      category: "magic",
      tier: 2,
      cost: 2300,
      stats: { ap: 220, apPct: 0.3 },
      color: "#f1d27a",
    },
    guardian_plate: {
      id: "guardian_plate",
      name: "护甲重铠",
      brief: "护甲最高，打你的人攻速降低",
      category: "defense",
      tier: 2,
      cost: 1900,
      stats: { hp: 1e3, armor: 210 },
      passive: {
        id: "cripple_aura",
        name: "减攻速",
        desc: "用普攻打你的敌人攻速 −20%，持续 2 秒。",
        value: 0.2,
        value2: 2,
      },
      color: "#7f8ea3",
    },
    starweave_cloak: {
      id: "starweave_cloak",
      name: "魔抗狐裘",
      brief: "很抗法术，残血自动开盾",
      category: "defense",
      tier: 2,
      cost: 1850,
      stats: { hp: 1e3, mr: 200 },
      passive: {
        id: "spell_shield",
        name: "保命盾",
        desc: "生命低于 35% 时获得 600(+每级 60) 护盾，持续 4 秒，冷却 60 秒。",
        value: 600,
        value2: 60,
      },
      color: "#6fd0c5",
    },
    undying_heart: {
      id: "undying_heart",
      name: "回血护心镜",
      brief: "血最厚，脱战后快速回血",
      category: "defense",
      tier: 2,
      cost: 2e3,
      stats: { hp: 2e3 },
      passive: {
        id: "regen_ooc",
        name: "脱战回血",
        desc: "脱离战斗 5 秒后，每秒回复 2% 最大生命。",
        value: 0.02,
      },
      color: "#e0566f",
    },
    thorn_mail: {
      id: "thorn_mail",
      name: "反伤钉盾",
      brief: "谁普攻你，谁就被反伤",
      category: "defense",
      tier: 2,
      cost: 1750,
      stats: { hp: 500, armor: 170 },
      passive: {
        id: "thorns",
        name: "反伤",
        desc: "被普攻打中时，对攻击者造成该次伤害 18% 的法术伤害。",
        value: 0.18,
      },
      color: "#7da36b",
    },
  },
  IB = Object.values(ln),
  Yh = 0.6,
  PB = {
    cooldown: "技能冷却中",
    mana: "法力不足",
    disabled: "当前无法行动",
    no_target: "没有可用目标",
    gold: "金币不足",
    full: "装备栏已满",
  },
  Ps = (n) => `${Math.round(n * 100)}%`,
  v1 = { top: "上路", mid: "中路", bot: "下路" },
  DB = { 1: "一塔", 2: "二塔", 3: "高地塔" },
  Pl = (n, t) => `${v1[n]}${DB[t]}`;

function _3(n) {
  return n.x + n.y < 0 ? "左上河道" : "右下河道";
}

function zB(n, t) {
  const e = yn,
    s = t ? "全队" : "敌方全队";
  return n === "abyss_drake"
    ? `${s} +${e.drakeTeamGold} 金币 +${e.drakeTeamXp} 经验`
    : n === "star_colossus"
      ? t
        ? `全队 ${e.blessingDuration} 秒内伤害 +${Ps(e.blessingDamage)}、持续回血、小兵更强`
        : `敌方全队 ${e.blessingDuration} 秒内更强，先避一避`
      : t
        ? "全队获得奖励"
        : "敌方获得奖励";
}

const NB = {
    frost_insight: `拿到蓝buff：冷却缩减 +${Ps(yn.frostCdr)}，回蓝更快(${yn.buffDuration} 秒)`,
    ember_might: `拿到红buff：普攻附带灼烧和减速(${yn.buffDuration} 秒)`,
  },
  FB = {
    stun: () => "无法移动、攻击和施放技能。",
    airborne: () => "被击飞：无法移动、攻击和施放技能。",
    root: () => "无法移动，仍可攻击与施放技能。",
    slow: (n) => (n.value > 0 ? `移速降低 ${Ps(n.value)}。` : "移速降低。"),
    silence: () => "无法施放技能。",
    shield: (n) => (n.value > 0 ? `可吸收 ${Math.round(n.value)} 点伤害。` : "吸收即将受到的伤害。"),
    haste: (n) => (n.value > 0 ? `移速提高 ${Ps(n.value)}。` : "移速提高。"),
    attack_speed: (n) => (n.value > 0 ? `攻速提高 ${Ps(n.value)}。` : "攻速提高。"),
    dmg_reduction: (n) => (n.value > 0 ? `受到的伤害降低 ${Ps(n.value)}。` : "受到的伤害降低。"),
    untargetable: () => "不可被选中，免疫一切伤害。",
    unstoppable: () => "免疫控制效果。",
    burn: (n) =>
      n.value > 0 ? `持续灼烧，每跳受到 ${Math.round(n.value)} 点真实伤害。` : "持续受到灼烧伤害。",
    recall: () => "原地站满时间就传送回泉水。移动、攻击或挨打会打断。",
    restore: () => "疗伤中：持续回血回蓝。被英雄或防御塔打到会打断。",
    fountain: () => "在泉水里：快速回血回蓝。",
    respawn_guard: () => "刚刚复活，短时间内免疫伤害。",
    frost_insight: () =>
      `蓝buff：冷却缩减 +${Ps(yn.frostCdr)}(总上限 40%)，回蓝更快。打掉蓝buff 怪获得，持续 ${yn.buffDuration} 秒。`,
    ember_might: () =>
      `红buff：普攻附带灼烧，并让目标减速 ${Ps(yn.emberSlow)}。打掉红buff 怪获得，持续 ${yn.buffDuration} 秒。`,
    star_blessing: () =>
      `巨灵buff(星陨祝福)：伤害 +${Ps(yn.blessingDamage)}，持续回血，我方小兵更强。打掉星陨巨灵后全队获得，持续 ${yn.blessingDuration} 秒。`,
    panyue_passive: (n) => `盾击蓄势 ${n.stacks}/3：第三次普攻改用大盾砸地，附带额外伤害与减速。`,
    panyue_bulwark: () => "拥盾而立：护盾生效中，盾破或到期即结束。",
    chijin_ember: () => "下一次普攻变为重斧，并回复自身生命。",
    chijin_blaze: (n) => (n.value > 0 ? `攻速提高 ${Ps(n.value)}。` : "攻速大幅提高。"),
    chijin_spin: () => "斧影持续劈砍周围敌人；期间免疫减速并获得减伤。",
    xingli_mark: (n) => `余音 ${n.stacks}/3：叠满后弦音共振，造成伤害并眩晕。`,
    fengling_gale: (n) => `连射 ${n.stacks}/5：每层提高攻速，满层后移速提高、普攻附带额外伤害。`,
    fengling_crit: () => "下一次普攻必定暴击。",
    yeque_shadow: () => "刚刚得手：一、二技能的冷却已刷新。",
    tower_focus: (n) =>
      `塔在打你：塔的伤害越打越疼，现在 +${Ps(Math.min(yr.rampMax, n.stacks * yr.rampPerHit))}。塔下没有小兵就先退出来。`,
  };

function UB(n) {
  return FB[n.id](n);
}

function OB(n) {
  const t = Y1(n);
  return t ? `${X1(n)} · ${t}` : X1(n);
}

function X1(n) {
  switch (n.type) {
    case "direction":
      return "朝一个方向";
    case "cone":
      return "面前一片扇形";
    case "position":
      return "选一块地方";
    case "target":
      return "点一个敌人";
    default:
      return "原地放";
  }
}

function Y1(n) {
  return n.type === "self" ? (n.radius > 0 ? `半径 ${n.radius} 米` : "") : `距离 ${n.range} 米`;
}

const J8 = {
    flash: { type: "direction", range: ea.flash.range, width: 1.2 },
    heal: { type: "self", radius: 0 },
    recall: { type: "self", radius: 0 },
  },
  tk = [
    ["ad", "物攻", (n) => `+${n}`],
    ["ap", "法强", (n) => `+${n}`],
    ["apPct", "法强", (n) => `+${Ps(n)}`],
    ["hp", "生命", (n) => `+${n}`],
    ["mana", "法力", (n) => `+${n}`],
    ["armor", "护甲", (n) => `+${n}`],
    ["mr", "魔抗", (n) => `+${n}`],
    ["attackSpeedPct", "攻速", (n) => `+${Ps(n)}`],
    ["moveSpeed", "移速", (n) => `+${n}`],
    ["cdr", "冷却缩减", (n) => `+${Ps(n)}`],
    ["lifesteal", "吸血", (n) => `+${Ps(n)}(仅普攻)`],
    ["critChance", "暴击", (n) => `+${Ps(n)}`],
    ["critDamage", "暴击伤害", (n) => `+${Ps(n)}`],
    ["armorPen", "物穿", (n) => `+${Ps(n)}`],
    ["magicPen", "法穿", (n) => `+${Ps(n)}`],
    ["hpRegen", "回血", (n) => `+${n}/秒`],
    ["manaRegen", "回蓝", (n) => `+${n}/秒`],
  ];

function ek(n) {
  const t = [];
  for (const [e, s, i] of tk) {
    const a = n[e];
    a !== void 0 && t.push({ label: s, value: i(a) });
  }
  return t;
}

function BB(n, t = 3) {
  const e = [];
  for (const [s, i, a] of tk) {
    const o = n[s];
    o !== void 0 && e.length < t && e.push(`${i}${a(o).replace(/\(.*\)$/, "")}`);
  }
  return e.join("  ");
}

const w3 = {
    dash: { name: Br.dash, short: "位移", color: "#5cd6f7" },
    control: { name: Br.control, short: "控制", color: "#b9a2ff" },
    slow: { name: Br.slow, short: "减速", color: "#8fc7ff" },
    burst: { name: Br.burst, short: "爆发", color: "#ff8a7a" },
    dot: { name: Br.dot, short: "持续", color: "#ffb454" },
    shield: { name: Br.shield, short: "护盾", color: "#dfe8ff" },
    heal: { name: Br.heal, short: "回复", color: "#6fe3a1" },
    buff: { name: Br.buff, short: "增益", color: "#f3cf85" },
  },
  u4 = { recommend: "推荐", attack: "攻击", magic: "法术", defense: "防御", boots: "鞋" },
  p4 = {
    match_start: 1,
    minions_spawn: 1,
    super_minions: 2,
    epic_spawn: 2,
    first_blood: 3,
    double_kill: 3,
    triple_kill: 3,
    quadra_kill: 4,
    penta_kill: 4,
    killing_spree: 2,
    unstoppable: 3,
    legendary: 4,
    shutdown: 2,
    ace: 4,
    tower_destroyed: 2,
    epic_slain: 3,
    victory: 4,
    defeat: 4,
  },
  E2 = {
    first_blood: "首杀",
    double_kill: "双杀",
    triple_kill: "三杀",
    quadra_kill: "四杀",
    penta_kill: "五杀·星陨降临",
    killing_spree: "星芒乍现",
    unstoppable: "星火燎原",
    legendary: "星陨传说",
    shutdown: "终结",
  };

function m4(n) {
  const t = n.replace("#", ""),
    e =
      t.length === 3
        ? t
            .split("")
            .map((i) => i + i)
            .join("")
        : t,
    s = parseInt(e, 16);
  return [(s >> 16) & 255, (s >> 8) & 255, s & 255];
}

function B0(n, t, e) {
  const [s, i, a] = m4(n),
    [o, r, l] = m4(t),
    c = (f, d) =>
      Math.round(f + (d - f) * e)
        .toString(16)
        .padStart(2, "0");
  return `#${c(s, o)}${c(i, r)}${c(a, l)}`;
}

const Hn = (n, t) => B0(n, "#ffffff", t),
  Ln = (n, t) => B0(n, "#000000", t),
  nk = (n) =>
    n
      .map(
        ([t, e, s]) => `<stop offset="${t}" stop-color="${e}"${s === void 0 ? "" : ` stop-opacity="${s}"`}/>`,
      )
      .join(""),
  fn = (n, t, e, s, i, a) =>
    `<linearGradient id="@${n}" gradientUnits="userSpaceOnUse" x1="${t}" y1="${e}" x2="${s}" y2="${i}">${nk(a)}</linearGradient>`,
  Vo = (n, t, e, s, i) =>
    `<radialGradient id="@${n}" gradientUnits="userSpaceOnUse" cx="${t}" cy="${e}" r="${s}">${nk(i)}</radialGradient>`;

let HB = 0;

function Kh(n, t, e = "sf-ico") {
  const s = `sfi${(HB++).toString(36)}-`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n} ${n}" class="${e}" aria-hidden="true" focusable="false">${t.replace(/@/g, s)}</svg>`;
}

function dn(n, t, e) {
  return Kh(
    64,
    `<defs>${Vo("bg", 32, 27, 48, [
      [0, n[0]],
      [0.5, n[1]],
      [1, n[2]],
    ])}${Vo("vg", 32, 32, 46, [
      [0.6, "#000", 0],
      [1, "#000", 0.5],
    ])}${fn("gl", 0, 0, 0, 30, [
      [0, "#fff", 0.24],
      [1, "#fff", 0],
    ])}${t}</defs><rect width="64" height="64" fill="url(#@bg)"/>${e}<rect width="64" height="64" fill="url(#@vg)"/><path d="M0 0H64V19Q32 31 0 19Z" fill="url(#@gl)"/>`,
  );
}

const Is = (n) => Math.round(n * 100) / 100;

function hn(n, t, e, s = 0.18) {
  const i = Is(e * s);
  return `M${n} ${Is(t - e)}Q${Is(n + i)} ${Is(t - i)} ${Is(n + e)} ${t}Q${Is(n + i)} ${Is(t + i)} ${n} ${Is(t + e)}Q${Is(n - i)} ${Is(t + i)} ${Is(n - e)} ${t}Q${Is(n - i)} ${Is(t - i)} ${n} ${Is(t - e)}Z`;
}

function Mr(n, t, e, s, i, a = -90) {
  let o = "";
  for (let r = 0; r < e * 2; r++) {
    const l = ((a + (r * 180) / e) * Math.PI) / 180,
      c = r % 2 === 0 ? s : i;
    o += `${r === 0 ? "M" : "L"}${Is(n + Math.cos(l) * c)} ${Is(t + Math.sin(l) * c)}`;
  }
  return `${o}Z`;
}

function Wo(n, t, e, s) {
  const i = (s * Math.PI) / 180;
  return [Is(n + Math.cos(i) * e), Is(t + Math.sin(i) * e)];
}

function wl(n, t, e, s, i) {
  const [a, o] = Wo(n, t, e, s),
    [r, l] = Wo(n, t, e, i),
    c = (((i - s) % 360) + 360) % 360 > 180 ? 1 : 0;
  return `M${a} ${o}A${e} ${e} 0 ${c} 1 ${r} ${l}`;
}

const je = (n, t, e = 0.85) =>
    `<radialGradient id="@${n}"><stop offset="0" stop-color="${t}" stop-opacity="${e}"/><stop offset="0.45" stop-color="${t}" stop-opacity="${Is(e * 0.35)}"/><stop offset="1" stop-color="${t}" stop-opacity="0"/></radialGradient>`,
  We = (n, t, e, s) => `<circle cx="${t}" cy="${e}" r="${s}" fill="url(#@${n})"/>`,
  xe = "#070b16";

function Rs(n, t = !1) {
  const e = Se[n].palette,
    s = n === "yeque" ? Hn(e.primary, 0.12) : e.primary;
  return t ? [B0(s, e.glow, 0.45), Ln(s, 0.35), Ln(s, 0.82)] : [B0(s, e.glow, 0.18), Ln(s, 0.5), Ln(s, 0.86)];
}

function b1(n, t, e, s, i) {
  let a = "";
  for (let o = 0; o < e; o++) {
    const r = Math.round((n + o * 4.8) * 10) / 10,
      l = `M${r} ${t}L${r + 2.2} ${t - 8.5}`;
    a += `<path d="${l}" stroke="${xe}" stroke-width="4.6" stroke-linecap="round"/><path d="${l}" stroke="${i && o === e - 1 ? i : s}" stroke-width="2.3" stroke-linecap="round"/>`;
  }
  return a;
}

const g4 = (n, t, e = 1.8) =>
    `<path d="${n}" fill="none" stroke="#150e05" stroke-width="${e + 2.8}" stroke-linejoin="round" stroke-linecap="round"/><path d="${n}" fill="none" stroke="${t}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"/>`,
  on = {
    lacquer: "#2a2327",
    lacquerL: "#63545a",
    red: "#d04a32",
    bronze: "#d9a441",
    bronzeL: "#ffe6a8",
    bronzeD: "#7d5518",
    glow: "#ffcf70",
    hot: "#fff3cf",
    dust: "#c2a274",
    skin: "#dba87e",
    hair: "#231c1b",
    dark: "#1a1d25",
    wood: "#6b5236",
    steel: "#dfe6ee",
  },
  A2 = "M0 -22Q4.2 -15.4 15 -15.8L14.1 4.4Q12 15.4 0 22Q-12 15.4 -14.1 4.4L-15 -15.8Q-4.2 -15.4 0 -22Z",
  Up =
    fn("sh", -12, -20, 12, 20, [
      [0, on.lacquerL],
      [0.5, on.lacquer],
      [1, "#100d10"],
    ]) +
    Vo("boss", -1.4, -3.4, 7, [
      [0, "#fffbe9"],
      [0.45, on.bronze],
      [1, on.bronzeD],
    ]);

function Op(n) {
  return `<g transform="${n}"><path d="${A2}" fill="${on.bronze}" stroke="${xe}" stroke-width="1.6" stroke-linejoin="round"/><path d="${A2}" transform="scale(.85)" fill="url(#@sh)"/><path d="${A2}" transform="scale(.66)" fill="none" stroke="${on.red}" stroke-width="1.9" stroke-linejoin="round"/><path d="M0 -12.5V13.5" stroke="${on.bronze}" stroke-width="1.3" opacity=".75"/><circle cx="0" cy="-1.5" r="5.2" fill="url(#@boss)" stroke="${xe}" stroke-width="1"/><path d="M-13.4 -14.3Q-5 -14.7 -.8 -19.4" fill="none" stroke="${on.bronzeL}" stroke-width="1.2" stroke-linecap="round"/></g>`;
}

function x4(n, t, e, s, i = !1) {
  return `<g transform="translate(${n} ${t}) rotate(${e})${i ? " scale(-1 1)" : ""}"><path d="M0 7V${s}" stroke="${xe}" stroke-width="4.4" stroke-linecap="round"/><path d="M0 7V${s}" stroke="${on.wood}" stroke-width="2.3" stroke-linecap="round"/><path d="M2 12Q10 11 10.500 3Q6.500 7 2 6.500Z" fill="${on.steel}" stroke="${xe}" stroke-width="1" stroke-linejoin="round"/><path d="M0 -3L-2.800 7H2.800Z" fill="${on.steel}" stroke="${xe}" stroke-width="1" stroke-linejoin="round"/></g>`;
}

function y4(n, t, e) {
  return `<g transform="translate(${n} ${t}) scale(${e})"><path d="M-11.500 -2L-16 -13L-8.500 -7.500L-6.500 -16L-2.500 -8.500L0 -17.500L2.500 -8.500L6.500 -16L8.500 -7.500L16 -13L11.500 -2Z" fill="${on.hair}" stroke="${xe}" stroke-width="1.200" stroke-linejoin="round"/><ellipse cx="0" cy="1.500" rx="11.500" ry="8.500" fill="${on.skin}" stroke="${xe}" stroke-width="1.300"/><path d="M-11 -3.200Q0 -5.800 11 -3.200" fill="none" stroke="${on.red}" stroke-width="2.600"/><path d="M-10 -1.200L-2.600 2.600M10 -1.200L2.600 2.600" stroke="${on.hair}" stroke-width="2.700" stroke-linecap="round"/><ellipse cx="-5.600" cy="4" rx="2.900" ry="1.900" fill="#fff"/><circle cx="-4.900" cy="4" r="1.250" fill="${xe}"/><ellipse cx="5.600" cy="4" rx="2.900" ry="1.900" fill="#fff"/><circle cx="4.900" cy="4" r="1.250" fill="${xe}"/></g>`;
}

const $B = {
    passive: () =>
      dn(
        Rs("panyue"),
        je("g", on.glow) + Up,
        `<ellipse cx="34" cy="51.500" rx="25" ry="6" fill="none" stroke="${on.bronze}" stroke-width="1.800" opacity=".85"/><ellipse cx="34" cy="51.500" rx="15.500" ry="3.600" fill="none" stroke="${on.glow}" stroke-width="1.100" opacity=".5"/>` +
          We("g", 35, 50, 17) +
          g4(
            "M35 50L26 52.500L18 50.500L10 53M35 50L43 54L51 52L58 54.500M35 50L32 57L25 60M35 50L40 59.500",
            on.glow,
          ) +
          Op("translate(30 28) rotate(-14)") +
          `<path d="M20 46L15.500 39.500L23 42.500Z" fill="${on.dust}" stroke="${xe}" stroke-width=".9" stroke-linejoin="round"/><path d="M48 46.500L53.500 41L52.500 48.500Z" fill="${on.dust}" stroke="${xe}" stroke-width=".9" stroke-linejoin="round"/><path d="${hn(35.5, 49.5, 5.5, 0.14)}" fill="#fffdf2"/>` +
          b1(41.5, 23, 3, on.bronze, on.hot),
      ),
    s1: () =>
      dn(
        Rs("panyue"),
        je("g", on.glow) +
          Up +
          fn("st", 1, 0, 19, 0, [
            [0, on.glow, 0],
            [1, on.hot, 0.95],
          ]),
        x4(57, 13.5, 30, 42) +
          x4(43.5, 8.5, -19, 46, !0) +
          '<path d="M3 21H18M0 32H15M4 43H18" fill="none" stroke="url(#@st)" stroke-width="2.800" stroke-linecap="round"/>' +
          We("g", 42, 32, 16) +
          Op("translate(27.500 32) rotate(11) skewY(-7) scale(.68 1.02)") +
          `<path d="M39.500 12.500Q49 32 39.500 51.500" fill="none" stroke="${on.hot}" stroke-width="2.300" stroke-linecap="round" opacity=".95"/><path d="M44 20Q49.500 32 44 44" fill="none" stroke="${on.glow}" stroke-width="1.300" stroke-linecap="round" opacity=".6"/><path d="${hn(44.5, 32, 5.6, 0.14)}" fill="#fffdf2"/><path d="M52 22L56.500 19L55 25ZM53 41L57.500 43.500L52.500 45.500Z" fill="${on.bronzeL}"/>`,
      ),
    s2: () =>
      dn(
        Rs("panyue"),
        je("g", on.glow) + Up,
        We("g", 32, 34, 30) +
          `<circle cx="32" cy="34" r="27.500" fill="none" stroke="${on.glow}" stroke-width="1.500" stroke-dasharray="6 3.500" opacity=".6"/><circle cx="32" cy="34" r="23.500" fill="none" stroke="${on.bronze}" stroke-width="2.200" opacity=".9"/>` +
          y4(32, 16, 0.9) +
          Op("translate(32 39.500) scale(1.02 .92)"),
      ),
    ult: () =>
      dn(
        Rs("panyue", !0),
        je("g", on.glow, 1) +
          Up +
          fn("fall", 0, 0, 0, 24, [
            [0, on.hot, 0],
            [1, on.hot, 0.9],
          ]),
        `<ellipse cx="32" cy="54" rx="27" ry="6.500" fill="none" stroke="${on.bronze}" stroke-width="1.600" opacity=".7"/>` +
          We("g", 32, 53, 21) +
          g4(
            "M32 53L22 50L13 54.500L4 51.500M32 53L26.500 59L18 61M32 53L42 56.500L51 52.500L60 55.500M32 53L38 61",
            on.glow,
            1.9,
          ) +
          `<path d="M11 3V23M53 2V22M19.500 0V11M45 0V12" fill="none" stroke="url(#@fall)" stroke-width="2.400" stroke-linecap="round"/><path d="M46 19L55.500 6.500" stroke="${xe}" stroke-width="4" stroke-linecap="round"/><path d="M46 19L55.500 6.500" stroke="${on.steel}" stroke-width="1.900" stroke-linecap="round"/><path d="M17.500 31Q15 19.500 25 17L32 14L39 17Q49.500 19.500 46.500 31Z" fill="${on.dark}" stroke="${xe}" stroke-width="1.500" stroke-linejoin="round"/><path d="M17.500 31Q15 19.500 25 17" fill="none" stroke="${on.bronze}" stroke-width="1.200" stroke-linecap="round" opacity=".85"/>` +
          y4(32, 11.5, 0.6) +
          Op("translate(32 35) scale(.84)") +
          `<path d="${hn(32, 53.5, 7, 0.14)}" fill="#fffdf2"/>`,
      ),
  },
  pn = {
    red: "#d2402a",
    deep: "#7c1f14",
    dark: "#1e1719",
    iron: "#4a4447",
    steel: "#c9ced6",
    edge: "#fff4e2",
    gold: "#e2a13a",
    goldL: "#ffd98a",
    glow: "#ff7a2a",
    hot: "#ffe7a3",
    wood: "#6b4a2e",
    heal: "#6fe3a1",
  },
  Bp = fn("ax", 1, 0, 23, 0, [
    [0, pn.iron],
    [0.45, "#8d9299"],
    [0.82, pn.steel],
    [1, pn.edge],
  ]);

function Hp(n, t = 26) {
  const e =
    t > 0
      ? `<path d="M0 -10V${t}" stroke="${xe}" stroke-width="5.600" stroke-linecap="round"/><path d="M0 -10V${t}" stroke="${pn.wood}" stroke-width="3.200" stroke-linecap="round"/><path d="M-1.600 5.500H1.600M-1.600 ${t - 4}H1.600" stroke="${pn.gold}" stroke-width="2.200"/>`
      : "";
  return (
    `<g transform="${n}">` +
    e +
    `<path d="M-1.500 -13L-9.500 -8L-1.500 -2Z" fill="${pn.iron}" stroke="${xe}" stroke-width="1.200" stroke-linejoin="round"/><path d="M1 -15Q10 -15 16 -22Q27.500 -6.500 16 9Q10 2 1 1Z" fill="url(#@ax)" stroke="${xe}" stroke-width="1.500" stroke-linejoin="round"/><path d="M16 -22Q27.500 -6.500 16 9" fill="none" stroke="${pn.edge}" stroke-width="1.600" stroke-linecap="round"/><path d="M5.500 -10.500Q13 -7 5.500 -3.500" fill="none" stroke="${pn.gold}" stroke-width="1.400" stroke-linecap="round"/><rect x="-2.800" y="-16" width="5.600" height="18" rx="1.600" fill="${pn.gold}" stroke="${xe}" stroke-width="1.100"/><path d="M0 -23.500L-2.600 -16H2.600Z" fill="${pn.steel}" stroke="${xe}" stroke-width="1" stroke-linejoin="round"/><path d="M-2.600 2Q-7.500 7 -4.500 13Q-1 8 -.6 2Z" fill="${pn.red}" stroke="${xe}" stroke-width=".8" stroke-linejoin="round"/></g>`
  );
}

const GB = {
    passive: () =>
      dn(
        Rs("chijin"),
        je("g", pn.glow) + je("gh", pn.heal, 0.9) + Bp,
        We("g", 36, 22, 24) +
          Hp("translate(22.500 34) rotate(-30) scale(1.160)", 21) +
          We("gh", 48, 48, 13) +
          `<path d="M45.400 40H50.600V45.400H56V50.600H50.600V56H45.400V50.600H40V45.400H45.400Z" fill="#effff5" stroke="#12603a" stroke-width="1.400" stroke-linejoin="round"/><path d="M47 41.800H49V47H54.200" fill="none" stroke="${pn.heal}" stroke-width="1.300" stroke-linecap="round" stroke-linejoin="round"/><path d="${hn(47.5, 13, 3.4)}" fill="${pn.edge}"/>`,
      ),
    s1: () =>
      dn(
        Rs("chijin"),
        je("g", pn.glow) +
          Bp +
          fn("sw", 60, 0, 8, 0, [
            [0, pn.deep, 0],
            [0.35, pn.glow, 0.85],
            [0.8, pn.gold],
            [1, pn.edge],
          ]),
        We("g", 22, 30, 22) +
          `<path d="M60 31.500A27.500 27.500 0 0 0 8 34.500L21 37.500A23 23 0 0 1 60 31.500Z" fill="url(#@sw)"/><path d="M48 18.500A27.500 27.500 0 0 0 8 34.500" fill="none" stroke="${pn.edge}" stroke-width="1.700" stroke-linecap="round"/><path d="M55 37Q44 28 30 31" fill="none" stroke="${pn.goldL}" stroke-width="1.200" stroke-linecap="round" opacity=".7"/>` +
          Hp("translate(21 31) rotate(8) matrix(0 .8 .8 0 0 0)", 0) +
          b1(38.5, 56, 1, pn.gold),
      ),
    s2: () =>
      dn(
        Rs("chijin"),
        je("g", pn.glow) +
          Bp +
          fn("st", 0, 0, 30, 0, [
            [0, pn.glow, 0],
            [1, pn.hot, 0.95],
          ]),
        '<g transform="rotate(-9 32 32)">' +
          We("g", 46, 30, 19) +
          `<path d="M0 17H24M-2 26.500H17M2 39H21" fill="none" stroke="url(#@st)" stroke-width="2.800" stroke-linecap="round"/><path d="M20 12Q34 8 46 13M22 47Q33 50 42 47" fill="none" stroke="${pn.goldL}" stroke-width="1.400" stroke-linecap="round" opacity=".75"/>` +
          Hp("translate(37 28.500) rotate(90) scale(.9)", 30) +
          `<path d="${hn(59.5, 28.5, 4)}" fill="#fffdf2"/></g>` +
          b1(15, 55.5, 2, pn.gold),
      ),
    ult: () => {
      const n = `<path d="M52.500 20A24 24 0 0 0 9.400 23.800L15.500 27A18.500 18.500 0 0 1 52.500 20Z" fill="url(#@sw)"/><path d="M41 9.800A24 24 0 0 0 9.400 23.800" fill="none" stroke="${pn.edge}" stroke-width="1.400" stroke-linecap="round"/>`,
        t = Hp("translate(13 30.500) rotate(-70) matrix(0 .62 .62 0 0 0)", 0);
      return dn(
        Rs("chijin", !0),
        je("g", pn.glow, 1) +
          Bp +
          fn("sw", 52, 0, 9, 0, [
            [0, pn.deep, 0],
            [0.4, pn.glow, 0.9],
            [0.85, pn.gold],
            [1, pn.edge],
          ]),
        We("g", 32, 32, 30) +
          `<circle cx="32" cy="32" r="26.500" fill="none" stroke="${pn.hot}" stroke-width="1.100" stroke-dasharray="9 5" opacity=".65"/><g>${n}${t}</g><g transform="rotate(180 32 32)">${n}${t}</g><circle cx="32" cy="32" r="10.500" fill="${pn.dark}" fill-opacity=".55" stroke="${pn.gold}" stroke-width="1"/>` +
          b1(26.1, 36.5, 3, pn.gold),
      );
    },
  },
  an = {
    indigo: "#3d4c9e",
    deep: "#161c48",
    moon: "#eef5ff",
    glow: "#a9d4ff",
    gold: "#ffd98a",
    goldD: "#b98a3a",
    wood: "#7a4a2c",
    woodL: "#c08a52",
    sand: "#e0c084",
    sandD: "#6c5634",
  };

function R2(n, t, e, s) {
  return `<g transform="translate(${n} ${t}) rotate(${e}) scale(${s})"><path d="M-10 0H-30" stroke="${an.glow}" stroke-width="1.800" stroke-linecap="round" opacity=".5"/><path d="M14 0L5 -1.500Q3 -7.500 -4 -13.500Q-1.500 -6.500 -3 -1.700L-10 -2.400L-8 0L-10 2.400L-3 1.700Q-1.500 6.500 -4 13.500Q3 7.500 5 1.500Z" fill="#ffffff" stroke="${an.deep}" stroke-width="1.500" stroke-linejoin="round"/><path d="M14 0L10.500 -.7V.7Z" fill="${an.deep}"/></g>`;
}

function v4(n, t, e, s, i, a) {
  let r = "";
  for (let l = 0; l <= 30; l++) {
    const c = l / 30,
      [f, d] = Wo(n, t, e + (s - e) * c, i + a * 360 * c);
    r += `${l === 0 ? "M" : "L"}${f} ${d}`;
  }
  return r;
}

const VB = {
    passive: () =>
      dn(
        Rs("xingli"),
        je("g", an.glow) + je("gg", an.gold, 0.8),
        `<path d="M4 61L27 38" stroke="${an.gold}" stroke-width="1.300" stroke-linecap="round" opacity=".8"/>` +
          We("g", 15, 50, 13) +
          We("gg", 42, 23, 17) +
          `<path d="${wl(15, 50, 13, 281, 354)}" fill="none" stroke="${an.moon}" stroke-width="2.800" stroke-linecap="round"/><path d="${wl(15, 50, 24.5, 280, 355)}" fill="none" stroke="${an.glow}" stroke-width="3.300" stroke-linecap="round"/><path d="${wl(15, 50, 37, 279, 356)}" fill="none" stroke="#3a2a08" stroke-width="6.400" stroke-linecap="round" opacity=".55"/><path d="${wl(15, 50, 37, 279, 356)}" fill="none" stroke="${an.gold}" stroke-width="4.200" stroke-linecap="round"/><path d="${wl(15, 50, 37, 290, 345)}" fill="none" stroke="#fffdf2" stroke-width="1.200" stroke-linecap="round" opacity=".9"/><circle cx="15" cy="50" r="3.600" fill="#ffffff" stroke="${an.goldD}" stroke-width="1.200"/><circle cx="50.500" cy="16" r="1.500" fill="${an.gold}"/><circle cx="55" cy="29" r="1.100" fill="#fffdf2"/>`,
      ),
    s1: () =>
      dn(
        Rs("xingli"),
        je("g", an.glow, 1) +
          fn("ln", 22, 0, 66, 0, [
            [0, an.gold],
            [0.3, "#ffffff"],
            [1, an.glow],
          ]) +
          fn("nk", 0, 28, 0, 36, [
            [0, an.woodL],
            [1, an.wood],
          ]),
        `<g transform="rotate(-45 32 32)"><path d="M46 23.500Q46 18 51.500 18.500Q54 13.500 59 17Q64 16 64 22Q66 25.500 62 26.500H48.500Q45.500 26.500 46 23.500Z" fill="${an.moon}" fill-opacity=".42" stroke="${an.glow}" stroke-width="1.100" stroke-linejoin="round"/><path d="M44 40.500Q44 46 49.500 45.500Q52 50.500 57 47Q62 48 62 42Q64 38.500 60 37.500H46.500Q43.500 37.500 44 40.500Z" fill="${an.moon}" fill-opacity=".42" stroke="${an.glow}" stroke-width="1.100" stroke-linejoin="round"/><path d="M26 32H70" stroke="${an.glow}" stroke-width="8" stroke-linecap="round" opacity=".32"/><path d="M34 25.500Q38 32 34 38.500M41 27Q44.500 32 41 37" fill="none" stroke="${an.moon}" stroke-width="1.500" stroke-linecap="round" opacity=".85"/><path d="M-6 32H70" stroke="url(#@ln)" stroke-width="3" stroke-linecap="round"/>` +
          We("g", 54, 32, 10) +
          `<path d="M46 32L54 29.300L66 32L54 34.700Z" fill="#ffffff"/><path d="M8 28.500L4.500 19.500M17 28.500L13.500 19.500M11 35.500L7.500 44.500M20 35.500L16.500 44.500" stroke="${xe}" stroke-width="4.200" stroke-linecap="round"/><path d="M8 28.500L4.500 19.500M17 28.500L13.500 19.500M11 35.500L7.500 44.500M20 35.500L16.500 44.500" stroke="${an.woodL}" stroke-width="2.200" stroke-linecap="round"/><circle cx="4.200" cy="18.800" r="2.400" fill="${an.gold}" stroke="${xe}" stroke-width=".9"/><circle cx="13.200" cy="18.800" r="2.400" fill="${an.gold}" stroke="${xe}" stroke-width=".9"/><circle cx="7.200" cy="45.200" r="2.400" fill="${an.gold}" stroke="${xe}" stroke-width=".9"/><circle cx="16.200" cy="45.200" r="2.400" fill="${an.gold}" stroke="${xe}" stroke-width=".9"/><path d="M-6 28H22Q30.500 25.500 31 32Q30.500 38.500 22 36H-6Z" fill="url(#@nk)" stroke="${xe}" stroke-width="1.400" stroke-linejoin="round"/><path d="M24 29.200Q28.300 29.500 28.300 32Q28.300 34.500 24 34.800" fill="none" stroke="${an.gold}" stroke-width="1.400" stroke-linecap="round"/><path d="M-6 32H24" stroke="#fffdf2" stroke-width="1.300" stroke-linecap="round"/></g>`,
      ),
    s2: () => {
      const n = (t) => {
        const [e, s] = Wo(32, 32, 27, t - 16),
          [i, a] = Wo(32, 32, 17.5, t);
        return `<path d="M${e} ${s}L${i} ${a}" stroke="${an.gold}" stroke-width="1.700" stroke-linecap="round" opacity=".75"/><circle cx="${i}" cy="${a}" r="2.900" fill="${an.gold}" stroke="${xe}" stroke-width=".9"/>`;
      };
      return dn(
        Rs("xingli"),
        je("g", an.glow, 1) +
          Vo("sp", 32, 32, 26, [
            [0.15, "#ffffff"],
            [0.6, an.glow],
            [1, an.indigo, 0.5],
          ]),
        `<circle cx="32" cy="32" r="26.500" fill="none" stroke="${an.glow}" stroke-width="1.300" stroke-dasharray="2 4" opacity=".7"/><path d="${v4(32, 32, 24, 6, 200, 1.35)}" fill="none" stroke="url(#@sp)" stroke-width="2.800" stroke-linecap="round" stroke-linejoin="round"/><path d="${v4(32, 32, 24, 6, 20, 1.35)}" fill="none" stroke="url(#@sp)" stroke-width="2.800" stroke-linecap="round" stroke-linejoin="round"/>` +
          [50, 140, 230, 320].map(n).join("") +
          We("g", 32, 32, 13) +
          `<circle cx="32" cy="32" r="4.200" fill="#ffffff" stroke="${an.goldD}" stroke-width="1.200"/>`,
      );
    },
    ult: () =>
      dn(
        Rs("xingli", !0),
        je("g", an.moon, 0.8) +
          Vo("mo", 39, 15, 16, [
            [0, "#ffffff"],
            [0.7, "#e3eeff"],
            [1, "#b9cdf5"],
          ]) +
          fn("sd", 0, 44, 0, 64, [
            [0, an.sand],
            [1, an.sandD],
          ]) +
          fn("sd2", 0, 40, 0, 60, [
            [0, "#8f7a52"],
            [1, "#3b3020"],
          ]),
        We("g", 42, 18, 24) +
          `<circle cx="42" cy="18" r="12.500" fill="url(#@mo)" stroke="${an.deep}" stroke-width=".8"/><path d="M0 50Q14 40 30 45Q46 50 64 41V64H0Z" fill="url(#@sd2)"/><path d="M0 58Q18 45 36 52Q50 57 64 49V64H0Z" fill="url(#@sd)"/><path d="M0 58Q18 45 36 52Q50 57 64 49" fill="none" stroke="#fff3cf" stroke-width="1.300" stroke-linecap="round" opacity=".9"/><ellipse cx="22" cy="55.500" rx="12" ry="2.400" fill="${an.moon}" opacity=".3"/>` +
          R2(48.5, 21.5, 142, 0.6) +
          R2(34, 32.5, 142, 0.76) +
          R2(19, 43.5, 142, 0.64),
      ),
  },
  Ge = {
    teal: "#3fae8c",
    deep: "#12403f",
    ink: "#0b2422",
    cream: "#f6f3e6",
    gold: "#e9c46a",
    mint: "#9df5d2",
    leather: "#8a5a36",
    skin: "#dba87e",
    bow: "#2a262c",
    stoneL: "#c5ccd2",
    stone: "#8c959d",
    stoneD: "#555e67",
    grass: "#4fbf8f",
    grassD: "#1d6b58",
  },
  WB = `<path d="M0 -22V-12" stroke="${Ge.mint}" stroke-width="1.100" stroke-linecap="round" opacity=".55"/><path d="M0 -12V5" stroke="${Ge.cream}" stroke-width="1.900" stroke-linecap="round"/><path d="M-2.600 -13L0 -10L2.600 -13M-2.600 -10L0 -7L2.600 -10" fill="none" stroke="#ffffff" stroke-width="1.200" stroke-linecap="round" stroke-linejoin="round"/><path d="M-3.400 3L0 11.500L3.400 3L0 5.200Z" fill="#ffffff" stroke="${Ge.ink}" stroke-width=".7" stroke-linejoin="round"/>`;

function b4(n, t, e) {
  const s = (i, a, o, r) =>
    `<path d="M${n + i - 1.6} ${t}Q${n + i + a * 0.3} ${t - e * o * 0.6} ${n + i + a} ${t - e * o}Q${n + i + a * 0.5 + 1.4} ${t - e * o * 0.5} ${n + i + 1.6} ${t}Z" fill="${r}"/>`;
  return (
    s(-4, -5, 0.75, Ge.grassD) +
    s(4.5, 5, 0.85, Ge.grassD) +
    s(0, 1.5, 1, Ge.grass) +
    s(-2, -3, 0.6, Ge.grass)
  );
}

const jB = {
    passive: () => {
      let n = "";
      for (let t = 0; t < 5; t++) {
        const e = 17.5 + t * 6.6,
          s = 4.5 + t * 2.1,
          i = `M${e} 58L${Math.round((e + s * 0.42) * 10) / 10} ${58 - s}`;
        n += `<path d="${i}" stroke="${xe}" stroke-width="4.200" stroke-linecap="round"/><path d="${i}" stroke="${t === 4 ? Ge.gold : Ge.cream}" stroke-width="2.200" stroke-linecap="round"/>`;
      }
      return dn(
        Rs("fengling"),
        je("g", Ge.mint),
        '<g transform="rotate(-10 32 26)">' +
          We("g", 46, 25, 17) +
          `<path d="M-2 39.500L14.500 27.500L18.500 32.500L1 46.500Z" fill="${Ge.skin}" stroke="${xe}" stroke-width="1.300" stroke-linejoin="round"/><path d="M3.500 36L9.500 31.500L13.500 36.500L7.500 41Z" fill="${Ge.leather}" stroke="${xe}" stroke-width="1" stroke-linejoin="round"/><path d="M40 6.500L17.500 25L40 43.500" fill="none" stroke="${Ge.cream}" stroke-width="1.200" stroke-linejoin="round"/><path d="M40 6.500Q50.500 13.500 47.500 25Q50.500 36.500 40 43.500" fill="none" stroke="${xe}" stroke-width="5.800" stroke-linecap="round"/><path d="M40 6.500Q50.500 13.500 47.500 25Q50.500 36.500 40 43.500" fill="none" stroke="${Ge.bow}" stroke-width="3.400" stroke-linecap="round"/><path d="M41.500 8.500Q49.500 15 46.800 24" fill="none" stroke="${Ge.mint}" stroke-width=".9" stroke-linecap="round" opacity=".8"/><path d="M47.300 21.500V28.500" stroke="${Ge.gold}" stroke-width="4.600"/><circle cx="40" cy="6.500" r="1.900" fill="${Ge.gold}"/><circle cx="40" cy="43.500" r="1.900" fill="${Ge.gold}"/><path d="M17.500 25H56" stroke="${xe}" stroke-width="3.400" stroke-linecap="round"/><path d="M17.500 25H56" stroke="${Ge.cream}" stroke-width="1.700" stroke-linecap="round"/><path d="M54 21.200L62.500 25L54 28.800L56 25Z" fill="#ffffff" stroke="${xe}" stroke-width="1" stroke-linejoin="round"/><path d="M21.500 24.300L24 20.800H30.500L28 24.300ZM21.500 25.700L24 29.200H30.500L28 25.700Z" fill="#ffffff" stroke="${xe}" stroke-width=".8" stroke-linejoin="round"/><circle cx="17" cy="26.500" r="3.900" fill="${Ge.skin}" stroke="${xe}" stroke-width="1.300"/></g>` +
          n,
      );
    },
    s1: () =>
      dn(
        Rs("fengling"),
        je("g", Ge.mint) +
          fn("rk", 28, 20, 58, 56, [
            [0, Ge.stoneL],
            [0.5, Ge.stone],
            [1, Ge.stoneD],
          ]),
        b4(9, 60, 15) +
          b4(22, 62, 11) +
          `<path d="M29 56L26 39L34 25.500L49.500 20.500L60 30L62 48L53 57.500Z" fill="url(#@rk)" stroke="${xe}" stroke-width="1.600" stroke-linejoin="round"/><path d="M26 39L34 25.500L49.500 20.500L44.500 32L33 37Z" fill="#dfe5ea" opacity=".85"/><path d="M49.500 20.500L60 30L62 48L48 45L44.500 32Z" fill="${Ge.stoneD}" opacity=".55"/>` +
          We("g", 38.5, 36, 12) +
          `<path d="M38.500 36L45 31.500L50.500 33.500M38.500 36L44 42L43 49.500M38.500 36L47.500 39.500L54.500 45.500M38.500 36L34.500 44.500L37 51M38.500 36L37 29.500" fill="none" stroke="#0b1210" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/><path d="M38.500 36L45 31.500L50.500 33.500M38.500 36L44 42L43 49.500M38.500 36L47.500 39.500L54.500 45.500M38.500 36L34.500 44.500L37 51M38.500 36L37 29.500" fill="none" stroke="${Ge.mint}" stroke-width="1.100" stroke-linejoin="round" stroke-linecap="round"/><g transform="translate(38.500 36) rotate(40)"><path d="M-37 0H-1" stroke="${xe}" stroke-width="3.800" stroke-linecap="round"/><path d="M-37 0H-1" stroke="${Ge.cream}" stroke-width="2" stroke-linecap="round"/><path d="M-39 -.6L-37.500 -6.200L-32.500 -4.200L-31.500 -7L-23.500 -5L-18.500 -.6Z" fill="#ffffff" stroke="${xe}" stroke-width="1" stroke-linejoin="round"/><path d="M-39 .6L-37.500 6.200L-32.500 4.200L-31.500 7L-23.500 5L-18.500 .6Z" fill="#e3ede6" stroke="${xe}" stroke-width="1" stroke-linejoin="round"/><path d="M-35 -4.500L-33 0L-35 4.500M-28.500 -5L-26.500 0L-28.500 5M-24.500 -4L-22.500 0L-24.500 4" fill="none" stroke="${Ge.deep}" stroke-width=".8" opacity=".55"/><path d="M-17 0H-13" stroke="${Ge.gold}" stroke-width="2.200"/></g><path d="M30 27L26.500 22L32.500 23.500ZM43 26.500L44.500 21L47.500 26ZM28.500 45L23.500 46.500L27 50Z" fill="${Ge.stoneL}" stroke="${xe}" stroke-width=".8" stroke-linejoin="round"/><path d="${hn(38.5, 36, 4.2)}" fill="#ffffff"/>`,
      ),
    s2: () => {
      const n =
        "M37 23Q33.500 29 26.500 31M26.500 31L17.500 27L11.500 32.500M26.500 31L20 37.500L12 37M36 24L45.500 21.500M36 24L39.500 27.500";
      return dn(
        Rs("fengling"),
        je("g", Ge.mint) + je("gg", Ge.gold, 1),
        `<path d="M7 53.500Q31 37 56 52" fill="none" stroke="${Ge.gold}" stroke-width="1.800" stroke-linecap="round" stroke-dasharray="1 4"/><path d="M53.500 47.500L59.500 53.500L51.500 54.500Z" fill="${Ge.gold}"/><g transform="rotate(-14 32 28)">` +
          We("g", 30, 26, 22) +
          `<path d="M2 20H12M0 28H9M4 36H11" fill="none" stroke="${Ge.mint}" stroke-width="1.600" stroke-linecap="round" opacity=".6"/><path d="M35 21.500Q25 14 14 17.500Q22 21.500 28 28.500Z" fill="${Ge.teal}" stroke="${xe}" stroke-width="1.100" stroke-linejoin="round"/><path d="${n}" fill="none" stroke="${Ge.mint}" stroke-width="6.400" stroke-linecap="round" stroke-linejoin="round"/><circle cx="39" cy="18.500" r="5" fill="${Ge.mint}"/><path d="${n}" fill="none" stroke="${Ge.ink}" stroke-width="4.200" stroke-linecap="round" stroke-linejoin="round"/><circle cx="39" cy="18.500" r="3.900" fill="${Ge.ink}"/><path d="M40.500 14.800L45.500 9M38.500 14.600L41 8" stroke="${Ge.cream}" stroke-width="1.300" stroke-linecap="round"/><path d="M46 8.500L41.500 21.500L46 35" fill="none" stroke="${Ge.cream}" stroke-width="1" stroke-linejoin="round"/><path d="M46 8.500Q54 15 51.500 21.500Q54 28.500 46 35" fill="none" stroke="${xe}" stroke-width="4.600" stroke-linecap="round"/><path d="M46 8.500Q54 15 51.500 21.500Q54 28.500 46 35" fill="none" stroke="${Ge.bow}" stroke-width="2.600" stroke-linecap="round"/><path d="M41.500 21.500H58" stroke="${Ge.cream}" stroke-width="1.600" stroke-linecap="round"/>` +
          We("gg", 59.5, 21.5, 8) +
          `<path d="${hn(59.5, 21.5, 5.4, 0.14)}" fill="#fff6dc"/></g>`,
      );
    },
    ult: () => {
      const n = [
        [12, 22, 0.8],
        [25, 13, 0.95],
        [38.5, 24, 1.1],
        [52, 15, 0.8],
        [21, 40, 0.95],
        [49, 40.5, 1],
        [35, 45, 0.75],
      ];
      return dn(
        Rs("fengling", !0),
        je("g", Ge.mint, 0.75) +
          fn("mt", 0, 24, 0, 50, [
            [0, "#1d5e5a"],
            [1, "#0a2624"],
          ]),
        `<path d="M0 41L8 33.500L14.500 38L25 26.500L33 35.500L41 30L50 37.500L57 32.500L64 38V64H0Z" fill="url(#@mt)"/><path d="M0 41L8 33.500L14.500 38L25 26.500L33 35.500L41 30L50 37.500L57 32.500L64 38" fill="none" stroke="${Ge.mint}" stroke-width="1.400" stroke-linejoin="round" opacity=".9"/><ellipse cx="32" cy="54" rx="26" ry="6.800" fill="url(#@g)"/><ellipse cx="32" cy="54" rx="25" ry="6.500" fill="none" stroke="${Ge.mint}" stroke-width="1.700"/><ellipse cx="32" cy="54" rx="15" ry="3.600" fill="none" stroke="${Ge.gold}" stroke-width="1.100" opacity=".8"/>` +
          n
            .map(([t, e, s]) => `<g transform="translate(${t} ${e}) rotate(18) scale(${s})">${WB}</g>`)
            .join("") +
          '<path d="M17 55.500H23M43 56H49M31 58H36" stroke="#ffffff" stroke-width="1.200" stroke-linecap="round" opacity=".8"/>',
      );
    },
  },
  Cn = {
    ink: "#0e0a16",
    dark: "#1c1630",
    mid: "#4d3f86",
    accent: "#b48cff",
    glow: "#a886ff",
    steel: "#e8f0ff",
    cyan: "#bfe9e2",
    pale: "#e3d4ff",
    hp: "#f0584f",
    paper: "#e6d6a8",
    paperD: "#a58c56",
    map: "#5a4630",
  },
  $p = fn("dg", 0, -4, 0, 4, [
    [0, "#ffffff"],
    [0.5, Cn.steel],
    [0.5, "#b4c2e4"],
    [1, "#8794c8"],
  ]);

function Gp(n, t = !0) {
  const e = t
    ? `<path d="M-3 -1.900H-12.500V1.900H-3Z" fill="${Cn.dark}" stroke="${xe}" stroke-width="1"/><path d="M-5.300 -1.900V1.900M-7.800 -1.900V1.900M-10.300 -1.900V1.900" stroke="${Cn.accent}" stroke-width=".9"/><circle cx="-15.300" cy="0" r="2.700" fill="none" stroke="${xe}" stroke-width="3"/><circle cx="-15.300" cy="0" r="2.700" fill="none" stroke="${Cn.cyan}" stroke-width="1.400"/><path d="M-.5 -6.500Q-2.600 0 -.5 6.500L-3.200 6.500Q-5.300 0 -3.200 -6.500Z" fill="${Cn.accent}" stroke="${xe}" stroke-width="1" stroke-linejoin="round"/>`
    : "";
  return (
    `<g transform="${n}"><path d="M22 0Q10 -5.200 -.5 -3.700V3.700Q10 5.200 22 0Z" fill="url(#@dg)" stroke="${xe}" stroke-width="1.200" stroke-linejoin="round"/><path d="M1 0H20" stroke="#ffffff" stroke-width=".8" stroke-linecap="round" opacity=".9"/>` +
    e +
    "</g>"
  );
}

const qB = {
    passive: () =>
      dn(
        Rs("yeque"),
        je("g", Cn.glow) +
          je("gr", Cn.hp, 0.9) +
          $p +
          fn("hp", 0, 45, 0, 54, [
            [0, "#ffb8a8"],
            [0.4, Cn.hp],
            [1, "#a8222d"],
          ]),
        We("g", 38, 24, 22) +
          We("gr", 18, 49.5, 13) +
          `<rect x="8.500" y="44.500" width="47" height="10" rx="3.200" fill="#07050c" stroke="${xe}" stroke-width="1.400"/><rect x="8.500" y="44.500" width="47" height="10" rx="3.200" fill="none" stroke="${Cn.pale}" stroke-width="1" opacity=".55"/><rect x="10.200" y="46.200" width="14.500" height="6.600" rx="1.800" fill="url(#@hp)"/><path d="M27.400 45.500V53.500" stroke="${Cn.pale}" stroke-width="1.100" stroke-dasharray="1.600 1.400"/>` +
          Gp("translate(38.500 26.500) rotate(135) scale(1.080)") +
          `<path d="${hn(21.5, 43, 4, 0.14)}" fill="#ffffff"/>`,
      ),
    s1: () =>
      dn(
        Rs("yeque"),
        je("g", Cn.glow, 1) + $p,
        `<path d="M5 31Q21 24 33 11.500" fill="none" stroke="${Cn.steel}" stroke-width="1.500" stroke-linecap="round" opacity=".7"/><path d="M24 59Q42 51 57 36" fill="none" stroke="${Cn.steel}" stroke-width="1.500" stroke-linecap="round" opacity=".7"/><path d="M2.500 55.500Q5 47.500 13.500 44.500Q29 38 41.500 23L47 28.500Q34 45 17 55Q8 60.500 2.500 55.500Z" fill="${Cn.ink}" stroke="${Cn.accent}" stroke-width="1.100" stroke-linejoin="round"/><path d="M6 53.500Q14 50 22 44.500M9.500 57Q19 53 28 46" fill="none" stroke="${Cn.mid}" stroke-width="1.100" stroke-linecap="round"/><circle cx="7" cy="44" r="1.700" fill="${Cn.ink}" stroke="${Cn.accent}" stroke-width=".6"/><circle cx="25" cy="57.500" r="1.300" fill="${Cn.ink}" stroke="${Cn.accent}" stroke-width=".6"/><circle cx="33" cy="48" r="1" fill="${Cn.ink}"/>` +
          We("g", 54, 14, 13) +
          Gp("translate(41 27.500) rotate(-44) scale(.98 1.150)", !1) +
          `<path d="${hn(56.5, 12, 5.5, 0.14)}" fill="#ffffff"/>`,
      ),
    s2: () => {
      const n = (t, e, s) => {
        const [i, a] = Wo(9, 56, e, t),
          [o, r] = Wo(9, 56, e - 14, t - 7),
          [l, c] = Wo(9, 56, e - 14, t + 7);
        return (
          `<path d="M9 56L${o} ${r}L${l} ${c}Z" fill="url(#@tr)"/>` +
          Gp(`translate(${i} ${a}) rotate(${t}) scale(${s})`)
        );
      };
      return dn(
        Rs("yeque"),
        je("g", Cn.glow, 0.9) +
          $p +
          Vo("tr", 9, 56, 34, [
            [0, Cn.accent, 0.85],
            [1, Cn.accent, 0],
          ]),
        We("g", 36, 30, 26) +
          n(-70, 32, 0.8) +
          n(-16, 32, 0.8) +
          n(-43, 36, 0.95) +
          `<circle cx="9" cy="56" r="2.600" fill="${Cn.pale}"/>`,
      );
    },
    ult: () =>
      dn(
        Rs("yeque", !0),
        je("g", Cn.steel, 0.9) +
          $p +
          fn("pp", 0, 24, 0, 48, [
            [0, "#f6ecc8"],
            [0.6, Cn.paper],
            [1, Cn.paperD],
          ]) +
          fn("rl", 0, 20, 0, 52, [
            [0, "#f3e6bd"],
            [0.5, Cn.paperD],
            [1, "#6b5630"],
          ]),
        `<g transform="rotate(-13 32 36)"><path d="M10 25H47V48H10Z" fill="url(#@pp)" stroke="${xe}" stroke-width="1.400" stroke-linejoin="round"/><path d="M15 39L20 31.500L24 36.500L29.500 29.500L34.500 37.500" fill="none" stroke="${Cn.map}" stroke-width="1.400" stroke-linejoin="round" stroke-linecap="round"/><path d="M14.500 43.500Q21 40 27 43.500T39.500 42.500" fill="none" stroke="#3f6f96" stroke-width="1.300" stroke-linecap="round"/><rect x="37.500" y="28.500" width="5" height="5" rx=".8" fill="#b8323a"/><rect x="4" y="21" width="9" height="31" rx="4.500" fill="url(#@rl)" stroke="${xe}" stroke-width="1.400"/><path d="M8.500 17.500V21M8.500 52V55.500" stroke="${Cn.dark}" stroke-width="4.200" stroke-linecap="round"/><path d="M8.500 17.500V21M8.500 52V55.500" stroke="${Cn.accent}" stroke-width="1.600" stroke-linecap="round"/></g>` +
          We("g", 50, 24, 17) +
          Gp("translate(39.500 35) rotate(-40) scale(1.060)") +
          `<g transform="rotate(-13 32 36)"><path d="M41 24.500Q52 22 51.500 34Q51 46 41 48.500Q45.500 42 45.500 36.500Q45.500 30.500 41 24.500Z" fill="url(#@rl)" stroke="${xe}" stroke-width="1.400" stroke-linejoin="round"/></g><path d="${hn(56.5, 20.5, 5, 0.14)}" fill="#ffffff"/>`,
      ),
  },
  XB = { panyue: $B, chijin: GB, xingli: VB, fengling: jB, yeque: qB };

function Ia(n, t) {
  return XB[n][t]();
}

const YB = {
  recall: () =>
    dn(
      ["#3c86e6", "#143a86", "#050d26"],
      je("g", "#8fe9ff", 0.9) +
        fn("bm", 0, 4, 0, 52, [
          [0, "#c9f6ff", 0],
          [1, "#5cd6f7", 0.55],
        ]),
      '<path d="M21 51L26.5 4H37.5L43 51Z" fill="url(#@bm)"/><ellipse cx="32" cy="51" rx="23" ry="6.6" fill="url(#@g)"/><ellipse cx="32" cy="51" rx="22" ry="6.3" fill="none" stroke="#8fe9ff" stroke-width="2"/><ellipse cx="32" cy="42" rx="15.5" ry="4.5" fill="none" stroke="#8fe9ff" stroke-width="1.6" opacity=".8"/><ellipse cx="32" cy="34" rx="10.5" ry="3" fill="none" stroke="#c9f6ff" stroke-width="1.3" opacity=".6"/>' +
        We("g", 32, 24, 18) +
        `<path d="M32 5L40.5 24L32 46L23.5 24Z" fill="#2f8fd8" stroke="${xe}" stroke-width="1.3" stroke-linejoin="round"/><path d="M32 5L23.5 24L32 28.5Z" fill="#f2feff"/><path d="M32 5L40.5 24L32 28.5Z" fill="#9aeaff"/><path d="M23.5 24L32 28.5V46Z" fill="#5cd6f7"/><path d="M11 31L15.5 25.5L20 31M11 38.5L15.5 33L20 38.5M44 31L48.5 25.5L53 31M44 38.5L48.5 33L53 38.5" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity=".85"/>`,
    ),
  heal: () =>
    dn(
      ["#46c98a", "#14744a", "#04241a"],
      je("g", "#c9ffe0", 0.9) +
        fn("pl", 0, 14, 0, 50, [
          [0, "#ffffff"],
          [1, "#9dffc8"],
        ]),
      We("g", 32, 32, 28) +
        `<path d="${wl(32, 32, 24, 205, 335)}" fill="none" stroke="#c9ffe0" stroke-width="3.2" stroke-linecap="round"/><path d="M57.5 20.5L55.5 30.5L47.5 24Z" fill="#c9ffe0"/><path d="${wl(32, 32, 24, 25, 155)}" fill="none" stroke="#8fd8ff" stroke-width="3.2" stroke-linecap="round"/><path d="M6.5 43.5L8.5 33.5L16.5 40Z" fill="#8fd8ff"/><path d="M27 16H37V27H48V37H37V48H27V37H16V27H27Z" fill="url(#@pl)" stroke="${xe}" stroke-width="1.4" stroke-linejoin="round"/><path d="M29.5 18.5H34.5V29.5H45.5" fill="none" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/><path d="M51 9V15M48 12H54M12 49V55M9 52H15" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round"/>`,
    ),
  flash: () =>
    dn(
      ["#f5b84a", "#a25f17", "#2a1405"],
      je("g", "#fff6dc", 1) +
        fn("st", 14, 48, 46, 18, [
          [0, "#ffffff", 0],
          [1, "#ffffff", 0.95],
        ]),
      '<path d="M16 37L24.5 48L16 59L7.5 48Z" fill="#ffffff" fill-opacity=".1" stroke="#fff6dc" stroke-width="1.5" stroke-dasharray="2.6 2.4" stroke-linejoin="round" opacity=".8"/><path d="M13 43.5L44 15.5L48 20L19.5 50Z" fill="url(#@st)"/><path d="M9 36L33 14M24 54L51 30" stroke="#fff6dc" stroke-width="1.3" stroke-linecap="round" opacity=".5"/>' +
        We("g", 45, 19, 19) +
        `<path d="${hn(45, 19, 16, 0.13)}" fill="#ffffff"/><path d="${hn(45, 19, 10, 0.16)}" transform="rotate(45 45 19)" fill="#fff3cf"/><circle cx="45" cy="19" r="3.8" fill="#ffffff"/><path d="${hn(52, 46, 3)}" fill="#fff6dc"/><circle cx="24" cy="14" r="1.2" fill="#fff6dc"/>`,
    ),
};

function K1(n) {
  return YB[n]();
}

const Mi = (n) => [B0(n, "#182246", 0.55), B0(n, "#0b1128", 0.8), "#050914"],
  sk = "#f4f7fb",
  ik = "#aeb8c6",
  ak = "#56627a",
  _4 = "#8a5a34",
  KB = "#3d2817",
  w4 = (n, t, e, s, i) =>
    fn(n, t, e, s, i, [
      [0, sk],
      [0.5, ik],
      [1, ak],
    ]),
  ok = (n, t, e, s, i, a) =>
    fn(n, e, s, i, a, [
      [0, Hn(t, 0.55)],
      [0.5, t],
      [1, Ln(t, 0.5)],
    ]),
  Pe = (n = 1.3) => `stroke="${xe}" stroke-width="${n}" stroke-linejoin="round"`,
  ZB = "M15 7H30V28Q30 33 35 35.5L44 40Q49 42.5 49 48V51H15Z",
  QB = "M14 51H50V55Q50 57 48 57H16Q14 57 14 55Z",
  JB = "M13.5 6H31.5V13H13.5Z";

function C2(n, t, e, s) {
  return dn(
    Mi(n),
    ok("bt", n, 14, 6, 46, 54) + je("g", Hn(n, 0.3), 0.6) + t,
    We("g", 32, 32, 28) +
      e +
      `<path d="${ZB}" fill="url(#@bt)" ${Pe()}/><path d="M30 28Q30 33 35 35.5L44 40" fill="none" stroke="${Ln(n, 0.45)}" stroke-width="1.1" opacity=".7"/><path d="M17.5 13V49" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round" opacity=".35"/><path d="${QB}" fill="${Ln(n, 0.72)}" ${Pe(1.2)}/><path d="${JB}" fill="${Hn(n, 0.35)}" ${Pe(1.2)}/>` +
      s,
  );
}
export { ln, IB, Yh, PB, v1, Pl, _3, zB, NB, UB, OB, X1, Y1, J8, ek, BB, w3, u4, p4, E2, B0, Hn, Ln, fn, Vo, Kh, dn, hn, Mr, Wo, je, We, xe, Ia, K1, Mi, sk, ik, ak, _4, KB, w4, ok, Pe, C2 };
