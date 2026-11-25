// 装备设计表：所有装备的唯一定义处
//
// 用法:
//   node tools/itemdesign.mjs            打印三档装备与效率
//   node tools/itemdesign.mjs --emit     生成 src/33-data-2.js 里 ln 的完整字面量到 tools/_ln.js
//
// 定价规则（详见 tools/itembalance.mjs 的注释）：
//   小件 = 属性价值 / 1.00
//   中件 = 属性价值 / 1.02   （合成让 2%，鼓励攒件）
//   大件 = 属性价值 / 1.08   （再白送一件被动，作为"攒够钱"的正反馈）
// 已有 13 件大件的售价保持不变（不动经济），只把属性调到目标效率；
// 新增的 4 件大件落在 2600~3800 档。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { statValue, TIER_EFF, roundTo } from './itembalance.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ── 属性写法简写 ────────────────────────────────────────────────
const S = {
  ad: (v) => ({ ad: v }),
  ap: (v) => ({ ap: v }),
  hp: (v) => ({ hp: v }),
  armor: (v) => ({ armor: v }),
  mr: (v) => ({ mr: v }),
  mana: (v) => ({ mana: v }),
  as: (v) => ({ attackSpeedPct: v }),
  crit: (v) => ({ critChance: v }),
  critDmg: (v) => ({ critDamage: v }),
  ls: (v) => ({ lifesteal: v }),
  apen: (v) => ({ armorPen: v }),
  mpen: (v) => ({ magicPen: v }),
  cdr: (v) => ({ cdr: v }),
  apPct: (v) => ({ apPct: v }),
  ms: (v) => ({ moveSpeed: v }),
};
const mix = (...o) => Object.assign({}, ...o);

// 已有 13 件大件的被动原样保留（被动 id 在 44-data-4.js 的 ql() 里注册，不能改名）
const P = {
  execute: {
    id: 'execute_bonus',
    name: '收割',
    desc: '对生命低于 50% 的敌人，伤害 +15%(对建筑无效)。',
    value: 0.15,
    value2: 0.5,
  },
  onhit: { id: 'onhit_magic', name: '附带法伤', desc: '普攻额外造成 60 点法术伤害(对建筑无效)。', value: 60 },
  slow: { id: 'spell_slow', name: '技能减速', desc: '技能造成伤害时使目标减速 20%，持续 1 秒。', value: 0.2, value2: 1 },
  cripple: { id: 'cripple_aura', name: '减攻速', desc: '用普攻打你的敌人攻速 −20%，持续 2 秒。', value: 0.2, value2: 2 },
  shield: { id: 'spell_shield', name: '保命盾', desc: '生命低于 35% 时获得 600(+每级 60) 护盾，持续 4 秒，冷却 60 秒。', value: 600, value2: 60 },
  regen: { id: 'regen_ooc', name: '脱战回血', desc: '脱离战斗 5 秒后，每秒回复 2% 最大生命。', value: 0.02 },
  thorns: { id: 'thorns', name: '反伤', desc: '被普攻打中时，对攻击者造成该次伤害 18% 的法术伤害。', value: 0.18 },
};

// ── 装备表 ──────────────────────────────────────────────────────
// tier 1 = 小件(150-850)  2 = 中件(900-1450)  3 = 大件(2200-3800)
// from = 合成路径；不写 cost 的按模型自动定价
const ITEMS = [
  // ══ 小件 · 物理 ══
  { id: 'iron_sword', name: '铁剑', brief: '最基础的物攻件', category: 'attack', tier: 1, color: '#c8ccd4', stats: S.ad(20) },
  { id: 'iron_blade', name: '玄铁重剑', brief: '物攻更高的基础件', category: 'attack', tier: 1, color: '#9aa4b2', stats: S.ad(42) },
  { id: 'hunting_bow', name: '猎弓', brief: '一点点攻速', category: 'attack', tier: 1, color: '#c9a86a', stats: S.as(0.12) },
  { id: 'horn_bow', name: '角弓', brief: '攻速件，合成疾风弩', category: 'attack', tier: 1, color: '#b08d52', stats: S.as(0.22) },
  { id: 'short_dagger', name: '短匕', brief: '一点点暴击率', category: 'attack', tier: 1, color: '#b8bcc4', stats: S.crit(0.1) },
  { id: 'blood_jade', name: '血玉', brief: '普攻回血的基础件', category: 'attack', tier: 1, color: '#d8433f', stats: S.ls(0.07) },
  { id: 'armor_piercer', name: '破甲锥', brief: '一点点护甲穿透', category: 'attack', tier: 1, color: '#8fa6bb', stats: S.apen(0.1) },

  // ══ 小件 · 法术 ══
  { id: 'apprentice_staff', name: '学徒法杖', brief: '最基础的法强件', category: 'magic', tier: 1, color: '#7f8cff', stats: S.ap(22) },
  { id: 'jade_slip', name: '玉简', brief: '法强更高的基础件', category: 'magic', tier: 1, color: '#9ad0c8', stats: S.ap(44) },
  { id: 'mana_crystal', name: '蓝晶石', brief: '撑蓝量', category: 'magic', tier: 1, color: '#5b9bff', stats: S.mana(320) },
  { id: 'curse_charm', name: '咒符', brief: '一点点法术穿透', category: 'magic', tier: 1, color: '#a86bd8', stats: S.mpen(0.1) },
  { id: 'hourglass', name: '漏刻', brief: '一点点冷却缩减', category: 'magic', tier: 1, color: '#7ec8e3', stats: S.cdr(0.06) },

  // ══ 小件 · 防御 ══
  { id: 'cloth_armor', name: '布甲', brief: '最基础的护甲', category: 'defense', tier: 1, color: '#b9a07a', stats: S.armor(36) },
  { id: 'chain_mail', name: '锁子甲', brief: '护甲件，合成龟甲盾', category: 'defense', tier: 1, color: '#8d99a8', stats: S.armor(80) },
  { id: 'wood_shield', name: '木盾', brief: '一点点生命', category: 'defense', tier: 1, color: '#a8794f', stats: S.hp(260) },
  { id: 'leather_vest', name: '皮甲', brief: '生命件，合成护心镜', category: 'defense', tier: 1, color: '#a06a44', stats: S.hp(430) },
  { id: 'heart_mirror', name: '护心镜', brief: '大块生命，合成大件', category: 'defense', tier: 1, color: '#d9a441', stats: S.hp(720) },
  { id: 'ward_cloak', name: '抗魔披风', brief: '最基础的魔抗', category: 'defense', tier: 1, color: '#7f9ad8', stats: S.mr(40) },
  { id: 'rune_cloak', name: '灵纹披风', brief: '魔抗件，合成玄冰护符', category: 'defense', tier: 1, color: '#6f8fd0', stats: S.mr(90) },

  // ══ 鞋 ══
  { id: 'boots', name: '移速草鞋', brief: '跑得更快的基础鞋', category: 'boots', tier: 1, color: '#a8794f', stats: S.ms(0.5) },
  { id: 'boots_guard', name: '护甲铁靴', brief: '跑得快，还更抗物理伤害', category: 'boots', tier: 2, cost: 710, color: '#8d99a8', stats: mix(S.ms(0.6), S.armor(110)), from: ['boots', 'cloth_armor'] },
  { id: 'boots_arcane', name: '减冷却布靴', brief: '跑得快，技能冷却更短', category: 'boots', tier: 2, cost: 710, color: '#7f8cff', stats: mix(S.ms(0.6), S.cdr(0.15)), from: ['boots', 'hourglass'] },
  { id: 'boots_fury', name: '攻速皮靴', brief: '跑得快，普攻出手更快', category: 'boots', tier: 2, cost: 710, color: '#56c7a0', stats: mix(S.ms(0.6), S.as(0.25)), from: ['boots', 'hunting_bow'] },

  // ══ 中件 · 物理 ══
  { id: 'azure_blade', name: '青锋剑', brief: '物攻中件，合成斩马剑', category: 'attack', tier: 2, color: '#6fa8d8', stats: S.ad(68), from: ['iron_sword', 'iron_blade'] },
  { id: 'war_halberd', name: '破军长戟', brief: '物攻 + 护甲穿透', category: 'attack', tier: 2, color: '#9fb4c9', stats: mix(S.ad(45), S.apen(0.18)), from: ['iron_blade', 'armor_piercer'] },
  { id: 'wind_crossbow', name: '疾风弩', brief: '攻速 + 暴击', category: 'attack', tier: 2, color: '#56c7a0', stats: mix(S.ad(15), S.as(0.3), S.crit(0.16)), from: ['horn_bow', 'short_dagger'] },
  { id: 'blood_dagger', name: '饮血短刀', brief: '物攻 + 吸血', category: 'attack', tier: 2, color: '#d8433f', stats: mix(S.ad(30), S.ls(0.15)), from: ['blood_jade', 'iron_sword'] },

  // ══ 中件 · 法术 ══
  { id: 'spell_codex', name: '咒术法典', brief: '法强 + 冷却缩减', category: 'magic', tier: 2, color: '#8b7bff', stats: mix(S.ap(85), S.cdr(0.09)), from: ['jade_slip', 'hourglass'] },
  { id: 'shaman_mask', name: '巫祝面具', brief: '法强 + 生命', category: 'magic', tier: 2, color: '#c07ad8', stats: mix(S.ap(70), S.hp(380)), from: ['jade_slip', 'wood_shield'] },
  { id: 'spell_piercer', name: '破法玉简', brief: '法强 + 法术穿透', category: 'magic', tier: 2, color: '#9a6bd8', stats: mix(S.ap(75), S.mpen(0.16)), from: ['curse_charm', 'jade_slip'] },
  { id: 'star_robe', name: '星纹长袍', brief: '法强 + 蓝量 + 冷却', category: 'magic', tier: 2, color: '#6a86e8', stats: mix(S.ap(60), S.mana(420), S.cdr(0.06)), from: ['mana_crystal', 'cloth_armor'] },

  // ══ 中件 · 防御 ══
  { id: 'iron_bracer', name: '玄铁护腕', brief: '生命 + 护甲', category: 'defense', tier: 2, color: '#98a4b4', stats: mix(S.hp(600), S.armor(70)), from: ['chain_mail', 'wood_shield'] },
  { id: 'turtle_shield', name: '龟甲盾', brief: '大块生命 + 护甲', category: 'defense', tier: 2, color: '#7fa07a', cost: 1060, stats: mix(S.hp(700), S.armor(90)), from: ['chain_mail', 'heart_mirror'] },
  { id: 'frost_amulet', name: '玄冰护符', brief: '生命 + 魔抗', category: 'defense', tier: 2, color: '#7fb8d8', stats: mix(S.hp(650), S.mr(95)), from: ['rune_cloak', 'wood_shield'] },

  // ══ 大件 · 物理 ══
  { id: 'starfall_blade', name: '收割斩马剑', brief: '物攻最高，打残血更疼', category: 'attack', tier: 3, cost: 2100, color: '#ffb44d', stats: mix(S.ad(134), S.cdr(0.1)), passive: P.execute, from: ['azure_blade', 'iron_blade'] },
  { id: 'sunchaser_bow', name: '攻速角弓', brief: '攻速大涨，普攻附带法伤', category: 'attack', tier: 3, cost: 1900, color: '#ffd76a', stats: mix(S.ad(35), S.as(0.5), S.crit(0.3), S.ms(0.5)), passive: P.onhit, from: ['wind_crossbow', 'horn_bow'] },
  { id: 'blood_scythe', name: '吸血环首刀', brief: '普攻造成伤害，自己回血', category: 'attack', tier: 3, cost: 1900, color: '#d8433f', stats: mix(S.ad(86), S.ls(0.25)), from: ['blood_dagger', 'azure_blade'] },
  { id: 'piercing_spear', name: '破甲长戟', brief: '专克高护甲：无视 40% 护甲', category: 'attack', tier: 3, cost: 1950, color: '#9fb4c9', stats: mix(S.ad(98), S.apen(0.4)), from: ['war_halberd', 'azure_blade'] },
  { id: 'phantom_edge', name: '暴击吴钩', brief: '暴击率高，暴击打得更疼', category: 'attack', tier: 3, cost: 2150, color: '#b48cff', stats: mix(S.ad(80), S.crit(0.4), S.critDmg(0.4)), from: ['wind_crossbow', 'short_dagger'] },

  // ══ 大件 · 法术 ══
  { id: 'astral_staff', name: '减冷却法杖', brief: '法强、蓝量、冷却都沾', category: 'magic', tier: 3, cost: 2000, color: '#7f8cff', stats: mix(S.ap(170), S.mana(400), S.cdr(0.15)), from: ['spell_codex', 'mana_crystal'] },
  { id: 'void_crown', name: '法穿玉冠', brief: '专克高魔抗：无视 40% 魔抗', category: 'magic', tier: 3, cost: 2100, color: '#a86bd8', stats: mix(S.ap(180), S.mpen(0.4)), from: ['spell_piercer', 'jade_slip'] },
  { id: 'winter_scepter', name: '减速权杖', brief: '法强 + 生命，技能减速', category: 'magic', tier: 3, cost: 2000, color: '#8fd8ff', stats: mix(S.ap(140), S.hp(900)), passive: P.slow, from: ['shaman_mask', 'heart_mirror'] },
  { id: 'sage_codex', name: '法强竹简', brief: '法强最高，还按比例加法强', category: 'magic', tier: 3, cost: 2300, color: '#c9f6ff', stats: mix(S.ap(220), S.apPct(0.3)), from: ['jade_slip', 'apprentice_staff'] },

  // ══ 大件 · 防御 ══
  { id: 'guardian_plate', name: '护甲重铠', brief: '护甲最高，打你的人变慢', category: 'defense', tier: 3, cost: 1900, color: '#8d99a8', stats: mix(S.hp(1000), S.armor(250)), passive: P.cripple, from: ['turtle_shield', 'chain_mail'] },
  { id: 'starweave_cloak', name: '魔抗狐裘', brief: '低血自动给一层护盾', category: 'defense', tier: 3, cost: 1850, color: '#7f9ad8', stats: mix(S.hp(1000), S.mr(255)), passive: P.shield, from: ['frost_amulet', 'rune_cloak'] },
  { id: 'undying_heart', name: '回血护心镜', brief: '生命最高，脱战回血', category: 'defense', tier: 3, cost: 2000, color: '#ff9a9a', stats: S.hp(2100), passive: P.regen, from: ['heart_mirror', 'leather_vest'] },
  { id: 'thorn_mail', name: '反伤钉盾', brief: '被普攻就反弹伤害', category: 'defense', tier: 3, cost: 1750, color: '#c07a5a', stats: mix(S.hp(900), S.armor(235)), passive: P.thorns, from: ['chain_mail', 'heart_mirror'] },

  // ══ 新增大件（2600-3800）══
  { id: 'heaven_splitter', name: '开天斧', brief: '纯物攻的顶级大件', category: 'attack', tier: 3, color: '#ff8a3c', stats: mix(S.ad(215), S.cdr(0.12)), from: ['azure_blade', 'war_halberd'] },
  { id: 'dragon_scale', name: '龙鳞甲', brief: '双抗与生命都极高', category: 'defense', tier: 3, color: '#5fa88f', stats: mix(S.hp(1800), S.armor(220), S.mr(200)), from: ['turtle_shield', 'frost_amulet'] },
  { id: 'void_staff', name: '太虚法杖', brief: '法强 + 法穿 + 冷却', category: 'magic', tier: 3, color: '#b48cff', stats: mix(S.ap(260), S.mpen(0.3), S.cdr(0.12)), from: ['spell_codex', 'spell_piercer'] },
  { id: 'giant_belt', name: '巨人之力', brief: '一件顶三件的血量', category: 'defense', tier: 3, color: '#d9a441', stats: S.hp(3700), from: ['leather_vest', 'heart_mirror'] },

  // ══ 辅助 ══
  // 主动装备的 active.value 是"这个主动值多少金币"，和属性一样进定价模型，
  // 否则主动等于白送，主动件会全面压过同价位的纯属性件。
  { id: 'sage_stone', name: '贤者之石', brief: '撑血撑魔抗，冷却也短', category: 'support', tier: 2, color: '#7fd8b8', stats: mix(S.hp(600), S.mr(80), S.cdr(0.1)), from: ['rune_cloak', 'hourglass'] },
  { id: 'golden_body', name: '金身护符', brief: '主动：2 秒金身，免疫一切', category: 'support', tier: 3, color: '#ffd76a', stats: mix(S.hp(700), S.armor(90)), from: ['iron_bracer', 'cloth_armor'],
    active: { name: '金身', desc: '2 秒内无法被选中、免疫伤害，也不能行动。', cd: 75, kind: 'stasis', duration: 2, value: 700 } },
  { id: 'teleport_stone', name: '传送符', brief: '主动：引导后传送到远处', category: 'support', tier: 3, color: '#8fd8ff', stats: mix(S.hp(800), S.cdr(0.12)), from: ['wood_shield', 'hourglass'],
    active: { name: '传送', desc: '引导 2.5 秒后传送到指定位置，最多 30 米。受到控制或主动行动会中断。', cd: 90, kind: 'teleport', channel: 2.5, range: 30, value: 650 } },
  { id: 'healing_bell', name: '回春铃', brief: '主动：治疗周围友军', category: 'support', tier: 3, color: '#9df5d2', stats: mix(S.ap(100), S.cdr(0.12), S.hp(300)), from: ['spell_codex', 'wood_shield'],
    active: { name: '回春', desc: '治疗周围 8 米内的友军 220(+施法者 6% 最大生命)。', cd: 60, kind: 'heal', radius: 8, amount: 220, hpRatio: 0.06, value: 550 } },
  { id: 'purify_orb', name: '净心珠', brief: '主动：解控并短暂免控', category: 'support', tier: 3, color: '#c9f6ff', stats: mix(S.hp(900), S.mr(100), S.cdr(0.08)), from: ['frost_amulet', 'cloth_armor'],
    active: { name: '净化', desc: '解除自身所有控制，并在 1.5 秒内免疫控制。', cd: 70, kind: 'cleanse', duration: 1.5, value: 450 } },
];

// ── 定价 ──
const byId = Object.fromEntries(ITEMS.map((it) => [it.id, it]));
for (const it of ITEMS) {
  // 主动也算钱：active.value 是这件主动"值多少金币"，和属性一起进模型
  const v = statValue(it.stats) + (it.active?.value ?? 0);
  if (it.cost === undefined) it.cost = roundTo(v / TIER_EFF[it.tier], 10);
  it.value = v;
  it.eff = v / it.cost;
}

// ── 自检 ──
const problems = [];
for (const it of ITEMS) {
  const lo = it.tier === 1 ? 0.95 : it.tier === 2 ? 0.95 : 1.0;
  const hi = it.tier === 1 ? 1.05 : it.tier === 2 ? 1.08 : 1.14;
  if (it.eff < lo || it.eff > hi) problems.push(`${it.id} 效率 ${(it.eff * 100).toFixed(0)}%（目标 ${lo * 100}-${hi * 100}%）`);
  for (const c of it.from ?? []) {
    if (!byId[c]) problems.push(`${it.id} 的组件 ${c} 不存在`);
    else if (byId[c].cost >= it.cost) problems.push(`${it.id}(${it.cost}) 不比组件 ${c}(${byId[c].cost}) 贵`);
  }
  const sum = (it.from ?? []).reduce((a, c) => a + (byId[c]?.cost ?? 0), 0);
  if (it.from && sum > it.cost) problems.push(`${it.id} 组件总价 ${sum} > 成品 ${it.cost}`);
}
const ids = new Set();
for (const it of ITEMS) {
  if (ids.has(it.id)) problems.push(`重复 id ${it.id}`);
  ids.add(it.id);
}

const emit = process.argv.includes('--emit');
if (!emit) {
  const cats = { 1: '小件', 2: '中件', 3: '大件' };
  for (const t of [1, 2, 3]) {
    const rows = ITEMS.filter((i) => i.tier === t && i.category !== 'boots');
    console.log(`\n── ${cats[t]}（${rows.length} 件）──`);
    console.log('  id'.padEnd(22), '名称'.padEnd(10), '售价'.padStart(6), '价值'.padStart(6), '效率'.padStart(6), ' 合成');
    for (const it of rows.sort((a, b) => a.cost - b.cost)) {
      console.log(
        `  ${it.id.padEnd(20)} ${it.name.padEnd(8)} ${String(it.cost).padStart(6)} ${String(Math.round(it.value)).padStart(6)} ${(it.eff * 100).toFixed(0).padStart(5)}%  ${(it.from ?? []).join('+') || '—'}${it.active ? `  [主动 ${it.active.name}]` : ''}`,
      );
    }
  }
  console.log(`\n共 ${ITEMS.length} 件（含 4 双鞋）`);
  if (problems.length) {
    console.log('\n⚠ 需要处理：');
    for (const p of problems) console.log('  ·', p);
  } else console.log('\n✓ 全部落在目标效率带内，合成路径自洽');
} else {
  if (problems.length) {
    console.error('⚠ 有问题，不生成：\n' + problems.join('\n'));
    process.exit(1);
  }
  const lit = (o, ind) => {
    const pad = ' '.repeat(ind);
    if (Array.isArray(o)) return `[${o.map((v) => JSON.stringify(v)).join(', ')}]`;
    const parts = Object.entries(o).map(([k, v]) => {
      if (Array.isArray(v)) return `${pad}  ${k}: ${lit(v, ind + 2)}`;
      if (v && typeof v === 'object') return `${pad}  ${k}: ${lit(v, ind + 2)}`;
      if (typeof v === 'string') return `${pad}  ${k}: ${JSON.stringify(v)}`;
      return `${pad}  ${k}: ${v}`;
    });
    return `{\n${parts.join(',\n')},\n${pad}}`;
  };
  let out = 'const ln = {\n';
  for (const it of ITEMS) {
    const o = { id: it.id, name: it.name, brief: it.brief, category: it.category, tier: it.tier, cost: it.cost };
    if (it.from) o.from = it.from;
    o.stats = it.stats;
    if (it.passive) o.passive = it.passive;
    if (it.active) o.active = it.active;
    o.color = it.color;
    out += `  ${it.id}: ${lit(o, 2)},\n`;
  }
  out += '};\n';
  fs.writeFileSync(path.join(root, 'tools/_ln.js'), out);
  console.log(`✓ 已生成 tools/_ln.js（${ITEMS.length} 件）`);
}
