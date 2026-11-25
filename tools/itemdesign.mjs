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
// 被动默认不计价（被动就是买大件的理由）；中件上的被动要写 passive.gold 显式折价，
// 否则按模型算出来的效率会低到自检直接拦下来。主动一律计价（active.value）。
//
// 主题：**现代市井**。不用刀剑弓甲那套西幻/古装装备皮——警棍、钢管、板砖、敌敌畏、
// 棉被、防暴盾牌、红牛、大喇叭、唢呐……名字一眼就知道是什么，玩起来才有生活气。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { itemValue, TIER_EFF, roundTo } from './itembalance.mjs';

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
  hpRegen: (v) => ({ hpRegen: v }),
  manaRegen: (v) => ({ manaRegen: v }),
  // 哑铃：最大生命的百分比换成物攻（引擎在 43-data-3.js 的 _o() 里算）
  hpToAd: (v) => ({ hpToAdPct: v }),
  // 护盾效率：给别人/自己套盾时按比例放大（Wn() 里乘）
  shield: (v) => ({ shieldPower: v }),
  // 治疗加成：奶人的时候按比例放大（xS() 里乘）
  heal: (v) => ({ healPower: v }),
};
const mix = (...o) => Object.assign({}, ...o);

// ── 被动 ────────────────────────────────────────────────────────
// 被动 id 在 44-data-4.js 的 ql() 里注册，**不能改名**。
// value / value2 是效果参数（不是金币）；要参与定价的中件被动另写 gold。
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
  // 饭盒/野生狗奶：挨打回蓝，耗蓝回血。中件也带被动，所以要显式折价。
  battery: {
    id: 'mana_battery',
    name: '边吃边回',
    desc: '受到伤害的 15% 转化为法力；消耗法力的 20% 转化为生命。',
    value: 0.15,
    value2: 0.2,
    gold: 500,
  },
  batteryBig: {
    id: 'mana_battery',
    name: '野生配方',
    desc: '受到伤害的 25% 转化为法力；消耗法力的 35% 转化为生命。',
    value: 0.25,
    value2: 0.35,
    gold: 1100,
  },
};

// ── 装备表 ──────────────────────────────────────────────────────
// tier 1 = 小件  2 = 中件  3 = 大件
// from = 合成路径；不写 cost 的按模型自动定价
const ITEMS = [
  // ══ 小件 · 物理 ══
  { id: 'baton', name: '警棍', brief: '最基础的物攻件', category: 'attack', tier: 1, color: '#c8ccd4', stats: S.ad(20) },
  { id: 'steel_pipe', name: '钢管', brief: '物攻更高的基础件', category: 'attack', tier: 1, color: '#9aa4b2', stats: S.ad(42) },
  { id: 'slingshot', name: '弹弓', brief: '一点点攻速', category: 'attack', tier: 1, color: '#c9a86a', stats: S.as(0.12) },
  { id: 'chain_whip', name: '铁链', brief: '攻速件，合成棒球棍', category: 'attack', tier: 1, color: '#b08d52', stats: S.as(0.22) },
  { id: 'knuckle', name: '指虎', brief: '一点点暴击率', category: 'attack', tier: 1, color: '#b8bcc4', stats: S.crit(0.1) },
  { id: 'red_bull', name: '红牛', brief: '普攻回血的基础件', category: 'attack', tier: 1, color: '#d8433f', stats: S.ls(0.07) },
  { id: 'steel_nail', name: '钢钉', brief: '一点点护甲穿透', category: 'attack', tier: 1, color: '#8fa6bb', stats: S.apen(0.1) },

  // ══ 小件 · 法术 ══
  { id: 'spray_can', name: '杀虫喷雾', brief: '最基础的法强件', category: 'magic', tier: 1, color: '#7f8cff', stats: S.ap(22) },
  { id: 'ddvp', name: '敌敌畏', brief: '法强更高的基础件', category: 'magic', tier: 1, color: '#9ad0c8', stats: S.ap(44) },
  { id: 'power_bank', name: '充电宝', brief: '撑蓝量', category: 'magic', tier: 1, color: '#5b9bff', stats: S.mana(320) },
  { id: 'pepper_spray', name: '防狼喷雾', brief: '一点点法术穿透', category: 'magic', tier: 1, color: '#a86bd8', stats: S.mpen(0.1) },
  { id: 'alarm_clock', name: '闹钟', brief: '一点点冷却缩减', category: 'magic', tier: 1, color: '#7ec8e3', stats: S.cdr(0.06) },

  // ══ 小件 · 防御 ══
  { id: 'padded_coat', name: '棉袄', brief: '最基础的护甲', category: 'defense', tier: 1, color: '#b9a07a', stats: S.armor(36) },
  { id: 'hard_hat', name: '安全帽', brief: '护甲件，合成防暴盾牌', category: 'defense', tier: 1, color: '#8d99a8', stats: S.armor(80) },
  { id: 'cushion', name: '沙发垫', brief: '一点点生命', category: 'defense', tier: 1, color: '#a8794f', stats: S.hp(260) },
  { id: 'quilt', name: '棉被', brief: '生命件，合成大棉被', category: 'defense', tier: 1, color: '#a06a44', stats: S.hp(430) },
  { id: 'mattress', name: '席梦思', brief: '大块生命，合成大件', category: 'defense', tier: 1, color: '#d9a441', stats: S.hp(720) },
  { id: 'raincoat', name: '雨衣', brief: '最基础的魔抗', category: 'defense', tier: 1, color: '#7f9ad8', stats: S.mr(40) },
  { id: 'gas_mask', name: '防毒面具', brief: '魔抗件，合成防弹衣', category: 'defense', tier: 1, color: '#6f8fd0', stats: S.mr(90) },

  // ══ 小件 · 蓝量（饭盒那条线的组件）══
  { id: 'milk_powder', name: '奶粉罐', brief: '撑蓝撑血，合成野生狗奶', category: 'magic', tier: 1, color: '#f0d7a0', stats: mix(S.mana(260), S.hp(200)) },

  // ══ 鞋 ══
  { id: 'slippers', name: '拖鞋', brief: '跑得更快的基础鞋', category: 'boots', tier: 1, color: '#a8794f', stats: S.ms(0.5) },
  { id: 'liberation_shoes', name: '解放鞋', brief: '跑得快，还更抗物理伤害', category: 'boots', tier: 2, cost: 710, color: '#8d99a8', stats: mix(S.ms(0.6), S.armor(110)), from: ['slippers', 'padded_coat'] },
  { id: 'canvas_shoes', name: '回力鞋', brief: '跑得快，技能冷却更短', category: 'boots', tier: 2, cost: 710, color: '#7f8cff', stats: mix(S.ms(0.6), S.cdr(0.15)), from: ['slippers', 'alarm_clock'] },
  { id: 'running_shoes', name: '跑鞋', brief: '跑得快，普攻出手更快', category: 'boots', tier: 2, cost: 710, color: '#56c7a0', stats: mix(S.ms(0.6), S.as(0.25)), from: ['slippers', 'slingshot'] },

  // ══ 中件 · 物理 ══
  { id: 'police_baton', name: '伸缩警棍', brief: '物攻中件，合成大铁锤', category: 'attack', tier: 2, color: '#6fa8d8', stats: S.ad(68), from: ['baton', 'steel_pipe'] },
  { id: 'wrench', name: '大扳手', brief: '物攻 + 护甲穿透', category: 'attack', tier: 2, color: '#9fb4c9', stats: mix(S.ad(45), S.apen(0.18)), from: ['steel_pipe', 'steel_nail'] },
  { id: 'baseball_bat', name: '棒球棍', brief: '攻速 + 暴击', category: 'attack', tier: 2, color: '#56c7a0', stats: mix(S.ad(15), S.as(0.3), S.crit(0.16)), from: ['chain_whip', 'knuckle'] },
  { id: 'red_bull_pack', name: '六罐装红牛', brief: '物攻 + 吸血', category: 'attack', tier: 2, color: '#d8433f', stats: mix(S.ad(30), S.ls(0.15)), from: ['red_bull', 'baton'] },

  // ══ 中件 · 法术 ══
  { id: 'megaphone', name: '大喇叭', brief: '法强 + 冷却缩减', category: 'magic', tier: 2, color: '#8b7bff', stats: mix(S.ap(85), S.cdr(0.09)), from: ['ddvp', 'alarm_clock'] },
  { id: 'thermos', name: '保温壶', brief: '法强 + 生命', category: 'magic', tier: 2, color: '#c07ad8', stats: mix(S.ap(70), S.hp(380)), from: ['ddvp', 'cushion'] },
  { id: 'firecracker', name: '二踢脚', brief: '法强 + 法术穿透', category: 'magic', tier: 2, color: '#9a6bd8', stats: mix(S.ap(75), S.mpen(0.16)), from: ['pepper_spray', 'ddvp'] },
  { id: 'speaker', name: '广场舞音响', brief: '法强 + 蓝量 + 冷却', category: 'magic', tier: 2, color: '#6a86e8', stats: mix(S.ap(60), S.mana(420), S.cdr(0.06)), from: ['power_bank', 'padded_coat'] },

  // ══ 中件 · 防御 ══
  { id: 'iron_door', name: '防盗门', brief: '生命 + 护甲', category: 'defense', tier: 2, color: '#98a4b4', stats: mix(S.hp(600), S.armor(70)), from: ['hard_hat', 'cushion'] },
  { id: 'riot_shield', name: '防暴盾牌', brief: '大块生命 + 护甲', category: 'defense', tier: 2, color: '#7fa07a', cost: 1120, stats: mix(S.hp(700), S.armor(90)), from: ['hard_hat', 'mattress'] },
  { id: 'bulletproof_vest', name: '防弹衣', brief: '生命 + 魔抗', category: 'defense', tier: 2, color: '#7fb8d8', stats: mix(S.hp(650), S.mr(95)), from: ['gas_mask', 'cushion'] },

  // ══ 中件 · 蓝量 / 生命联动 / 辅助 ══
  // 饭盒：挨打回蓝、耗蓝回血。中件带被动，passive.gold 折 500 金进定价。
  { id: 'lunchbox', name: '饭盒', brief: '挨打回蓝，耗蓝回血', category: 'magic', tier: 2, color: '#f2b455', stats: mix(S.mana(400), S.hp(300)), passive: P.battery, from: ['power_bank', 'cushion'] },
  // 哑铃：把最大生命按比例换成物攻，血越厚打得越疼
  { id: 'dumbbell', name: '哑铃', brief: '按最大生命加物攻', category: 'defense', tier: 2, color: '#8c93a3', stats: mix(S.hp(300), S.hpToAd(0.012)), from: ['cushion', 'steel_pipe'] },
  { id: 'first_aid_kit', name: '急救箱', brief: '护盾更厚，冷却也短', category: 'support', tier: 2, color: '#7fd8b8', stats: mix(S.hp(700), S.shield(0.25), S.cdr(0.05)), from: ['hard_hat', 'cushion'] },

  // ══ 大件 · 物理 ══
  { id: 'sledgehammer', name: '大铁锤', brief: '物攻最高，打残血更疼', category: 'attack', tier: 3, cost: 2100, color: '#ffb44d', stats: mix(S.ad(134), S.cdr(0.1)), passive: P.execute, from: ['police_baton', 'steel_pipe'] },
  { id: 'nail_gun', name: '射钉枪', brief: '攻速大涨，普攻附带法伤', category: 'attack', tier: 3, cost: 1900, color: '#ffd76a', stats: mix(S.ad(35), S.as(0.5), S.crit(0.3), S.ms(0.5)), passive: P.onhit, from: ['baseball_bat', 'chain_whip'] },
  { id: 'red_bull_case', name: '红牛整箱', brief: '普攻造成伤害，自己回血', category: 'attack', tier: 3, cost: 1900, color: '#d8433f', stats: mix(S.ad(86), S.ls(0.25)), from: ['red_bull_pack', 'police_baton'] },
  { id: 'pry_bar', name: '撬棍', brief: '专克高护甲：无视 40% 护甲', category: 'attack', tier: 3, cost: 1950, color: '#9fb4c9', stats: mix(S.ad(98), S.apen(0.4)), from: ['wrench', 'police_baton'] },
  { id: 'brick', name: '板砖', brief: '暴击率高，暴击打得更疼', category: 'attack', tier: 3, cost: 2150, color: '#b48cff', stats: mix(S.ad(80), S.crit(0.4), S.critDmg(0.4)), from: ['baseball_bat', 'knuckle'] },

  // ══ 大件 · 法术 ══
  { id: 'radio', name: '收音机', brief: '法强、蓝量、冷却都沾', category: 'magic', tier: 3, cost: 2000, color: '#7f8cff', stats: mix(S.ap(170), S.mana(400), S.cdr(0.15)), from: ['megaphone', 'power_bank'] },
  { id: 'ddvp_concentrate', name: '浓敌敌畏', brief: '专克高魔抗：无视 40% 魔抗', category: 'magic', tier: 3, cost: 2100, color: '#a86bd8', stats: mix(S.ap(180), S.mpen(0.4)), from: ['firecracker', 'ddvp'] },
  { id: 'air_cooler', name: '冷风机', brief: '法强 + 生命，技能减速', category: 'magic', tier: 3, cost: 2000, color: '#8fd8ff', stats: mix(S.ap(140), S.hp(900)), passive: P.slow, from: ['thermos', 'mattress'] },
  { id: 'baijiu', name: '二锅头', brief: '法强最高，还按比例加法强', category: 'magic', tier: 3, cost: 2300, color: '#c9f6ff', stats: mix(S.ap(220), S.apPct(0.3)), from: ['ddvp', 'spray_can'] },

  // ══ 大件 · 防御 ══
  { id: 'riot_armor', name: '防暴服', brief: '护甲最高，打你的人变慢', category: 'defense', tier: 3, cost: 1900, color: '#8d99a8', stats: mix(S.hp(1000), S.armor(250)), passive: P.cripple, from: ['riot_shield', 'hard_hat'] },
  { id: 'fire_blanket', name: '灭火毯', brief: '低血自动给一层护盾', category: 'defense', tier: 3, cost: 1850, color: '#7f9ad8', stats: mix(S.hp(1000), S.mr(255)), passive: P.shield, from: ['bulletproof_vest', 'gas_mask'] },
  { id: 'big_quilt', name: '十斤大棉被', brief: '生命最高，脱战回血', category: 'defense', tier: 3, cost: 2000, color: '#ff9a9a', stats: S.hp(2100), passive: P.regen, from: ['mattress', 'quilt'] },
  { id: 'barbed_fence', name: '铁丝网', brief: '被普攻就反弹伤害', category: 'defense', tier: 3, cost: 1750, color: '#c07a5a', stats: mix(S.hp(900), S.armor(235)), passive: P.thorns, from: ['hard_hat', 'mattress'] },

  // ══ 大件 · 顶级（纯属性，没有被动）══
  { id: 'demolition_hammer', name: '拆迁大锤', brief: '纯物攻的顶级大件', category: 'attack', tier: 3, color: '#ff8a3c', stats: mix(S.ad(215), S.cdr(0.12)), from: ['police_baton', 'wrench'] },
  { id: 'concrete_block', name: '水泥墩', brief: '双抗与生命都极高', category: 'defense', tier: 3, color: '#5fa88f', stats: mix(S.hp(1800), S.armor(220), S.mr(200)), from: ['riot_shield', 'bulletproof_vest'] },
  { id: 'suona', name: '唢呐', brief: '法强 + 法穿 + 冷却', category: 'magic', tier: 3, color: '#b48cff', stats: mix(S.ap(260), S.mpen(0.3), S.cdr(0.12)), from: ['megaphone', 'firecracker'] },
  { id: 'gas_tank', name: '煤气罐', brief: '一件顶三件的血量', category: 'defense', tier: 3, color: '#d9a441', stats: S.hp(3700), from: ['quilt', 'mattress'] },
  // 野生狗奶：饭盒 + 奶粉罐。同一个被动 id，数值更大（换装流不会同时吃到两份）
  { id: 'wild_dog_milk', name: '野生狗奶', brief: '挨打回蓝、耗蓝回血，量都更大', category: 'magic', tier: 3, color: '#f7e3b0', stats: mix(S.mana(900), S.hp(900), S.cdr(0.1)), passive: P.batteryBig, from: ['lunchbox', 'milk_powder'] },

  // ══ 辅助 ══
  // 主动装备的 active.value 是"这个主动值多少金币"，和属性一样进定价模型，
  // 否则主动等于白送，主动件会全面压过同价位的纯属性件。
  { id: 'herb_jar', name: '药酒罐', brief: '撑血撑魔抗，冷却也短', category: 'support', tier: 2, color: '#7fd8b8', stats: mix(S.hp(600), S.mr(80), S.cdr(0.1)), from: ['gas_mask', 'alarm_clock'] },
  { id: 'steel_basin', name: '不锈钢大盆', brief: '主动：扣盆蹲下，2 秒无敌', category: 'support', tier: 3, color: '#ffd76a', stats: mix(S.hp(700), S.armor(90)), from: ['iron_door', 'cushion'],
    active: { name: '扣盆', desc: '把盆扣在头上一蹲：2 秒内无法被选中、免疫伤害，也不能行动。', cd: 75, kind: 'stasis', duration: 2, value: 700 } },
  { id: 'e_bike', name: '电动车', brief: '主动：引导后骑到远处', category: 'support', tier: 3, color: '#8fd8ff', stats: mix(S.hp(800), S.cdr(0.12)), from: ['cushion', 'alarm_clock'],
    active: { name: '骑走', desc: '引导 2.5 秒后骑到 30 米内的指定位置。受到控制或主动行动会中断。', cd: 90, kind: 'teleport', channel: 2.5, range: 30, value: 650 } },
  { id: 'big_pot', name: '大锅菜', brief: '主动：给周围友军盛一碗', category: 'support', tier: 3, color: '#9df5d2', stats: mix(S.ap(100), S.cdr(0.12), S.hp(300)), from: ['megaphone', 'cushion'],
    active: { name: '开饭', desc: '治疗周围 8 米内的友军 220(+施法者 6% 最大生命)。', cd: 60, kind: 'heal', radius: 8, amount: 220, hpRatio: 0.06, value: 550 } },
  { id: 'huoxiang', name: '藿香正气水', brief: '主动：解控并短暂免控', category: 'support', tier: 3, color: '#c9f6ff', stats: mix(S.hp(900), S.mr(100), S.cdr(0.08)), from: ['bulletproof_vest', 'padded_coat'],
    active: { name: '灌一瓶', desc: '解除自身所有控制，并在 1.5 秒内免疫控制。', cd: 70, kind: 'cleanse', duration: 1.5, value: 450 } },
  // 护盾效率 / 治疗加成
  { id: 'fire_hydrant', name: '消防栓', brief: '护盾厚一大截，护甲也高', category: 'support', tier: 3, color: '#ff8a3c', stats: mix(S.hp(1200), S.armor(200), S.shield(0.5)), from: ['riot_shield', 'iron_door'] },
  { id: 'ginger_tea', name: '红糖姜茶', brief: '奶人更足，法强生命都沾', category: 'support', tier: 3, color: '#e0a86a', stats: mix(S.ap(130), S.hp(1000), S.heal(0.4)), from: ['thermos', 'cushion'] },
];

// ── 定价 ──
const byId = Object.fromEntries(ITEMS.map((it) => [it.id, it]));
for (const it of ITEMS) {
  // 主动算钱；中件被动写了 passive.gold 也算钱；大件被动不计价（买大件的理由）
  const v = itemValue(it);
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
    console.log('  id'.padEnd(24), '名称'.padEnd(14), '售价'.padStart(6), '价值'.padStart(6), '效率'.padStart(6), ' 合成');
    for (const it of rows.sort((a, b) => a.cost - b.cost)) {
      console.log(
        `  ${it.id.padEnd(22)} ${it.name.padEnd(12)} ${String(it.cost).padStart(6)} ${String(Math.round(it.value)).padStart(6)} ${(it.eff * 100).toFixed(0).padStart(5)}%  ${(it.from ?? []).join('+') || '—'}${it.active ? `  [主动 ${it.active.name}]` : ''}${it.passive ? `  [被动 ${it.passive.name}]` : ''}`,
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
