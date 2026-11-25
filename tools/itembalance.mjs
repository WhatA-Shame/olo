// 装备属性定价模型
//
// 用法: node tools/itembalance.mjs [--items=tools/_items.json] [--json]
//
// 思路：不凭感觉给装备标价，而是把每个属性折算成"等效生命(EHP)"或"等效普攻 DPS"，
// 在同一个参考站桩点上比较，再统一换算成金币。参考点取「等级 10、0 装备的平均英雄」，
// 因为那是玩家第一次凑齐大件的时刻，也是最需要平衡的时段。
//
// 关键公式（全部来自引擎 src/43-data-3.js，不是另编一套）：
//   物理减伤   600/(600+护甲)
//   攻速       attackSpeed = 基础攻速 × (1 + 攻速加成)   上限 2.5
//   暴击       伤害 × 暴击伤害(基础 2.0)
//   冷却       cdMax = 冷却 × (1 - CDR)                  上限 40%
//   穿透       护甲 × (1 - 穿透)                         上限 80%
//   法强       (基础法强 + 法强) × (1 + 法强%)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ── 参考站桩点（等级 10、裸装，7 个英雄的平均值，由 tools/_ref.mjs 量出来）──
export const REF = {
  hp: 6009,
  armor: 276,
  mr: 128,
  ad: 262,
  attackSpeed: 1.0,
  crit: 0,
  critDamage: 2.0,
  cdr: 0,
  level: 10,
};
const K = 600; // 减伤常数

// ── 边际收益：多 1 点属性带来多少"等效生命"或"等效 DPS" ──
const mit = (def) => K / (K + def);
export function marginal() {
  const ehpPerHp = (K + REF.armor) / K; // 1 生命 = 多少 EHP
  const ehpPerArmor = REF.hp / K; // 1 护甲 = 多少 EHP
  const dmgMult = mit(REF.armor); // 打在参考护甲上的伤害系数
  const dpsPerAd = REF.attackSpeed * dmgMult; // 1 物攻 = 多少 DPS
  const dpsPerAsPct = (REF.ad * dmgMult) / 100; // 1% 攻速
  const dpsPerCritPct = (REF.ad * REF.attackSpeed * (REF.critDamage - 1) * dmgMult) / 100;
  const dpsPerCritDmgPct = (REF.ad * REF.attackSpeed * REF.crit * dmgMult) / 100;
  // 1% 穿透的边际：d/dp [600/(600+A(1-p))]
  const dpsPerPenPct = ((REF.ad * REF.attackSpeed * K * REF.armor) / (K + REF.armor) ** 2) / 100;
  return {
    ehpPerHp,
    ehpPerArmor,
    ehpPerMr: ehpPerArmor,
    dpsPerAd,
    dpsPerAsPct,
    dpsPerCritPct,
    dpsPerCritDmgPct,
    dpsPerPenPct,
  };
}

// ── 金币单价表 ────────────────────────────────────────────────────────────
// 锚点：1 生命 = 1 金币。其余按上面的边际收益折算，再做三处设计修正：
//   · 护甲/魔抗打 6 折：EHP 折算出来 1 甲 = 6.9 生命，但护甲只挡物理、魔抗只挡法术，
//     实际覆盖面大约只有六成，直接照 EHP 定价会让"铁靴"这种小件性价比爆炸（实测 149%）。
//   · 穿透/暴击伤害打折：单独存在时几乎不产生价值（没有对应基础属性就是废的）。
//   · 冷却缩减封顶 40%，越接近上限越不值钱，线性给价已经偏贵，再压一档。
export const PRICE = {
  hp: 1,
  armor: 4.2,
  mr: 3.9,
  ad: 15,
  ap: 9,
  mana: 0.5,
  attackSpeedPct: 1600, // 每 1.0（即每 1% = 16 金）
  critChance: 1600,
  critDamage: 1200,
  lifesteal: 3000,
  armorPen: 1600,
  magicPen: 1600,
  cdr: 2600,
  apPct: 1800,
  moveSpeed: 500,
  // 回血/回蓝按"每秒"给价。英雄基础值是 7~12 血/秒、3~4.2 蓝/秒，
  // 所以 1 点就是可观的续航，不能再按 3 金/8 金这种白菜价算。
  hpRegen: 8,
  manaRegen: 6,
  // 哑铃：把最大生命按比例换成物攻。1 点(100%) 在参考点上就是 REF.hp 点物攻
  hpToAdPct: REF.hp * 15,
  // 护盾效率 / 治疗加成：都是乘在别人的盾/奶上，按"一次典型 600 点"折算后打折
  shieldPower: 900,
  healPower: 700,
};

// 只给"属性"定价。被动默认不计价（被动就是买大件的理由），
// 但中件也开始带被动了（饭盒、哑铃），那种要写 `passive.gold` 显式折价，
// 否则按模型算出来的效率会低得离谱、自检直接拦下来。
export function statValue(stats) {
  let v = 0;
  for (const k in stats) {
    const p = PRICE[k];
    if (p === undefined) throw new Error(`没有给属性 ${k} 定价`);
    v += stats[k] * p;
  }
  return v;
}

// 一件装备的"可定价价值"：属性 + 主动 + 显式折价的被动
export function itemValue(item) {
  return statValue(item.stats) + (item.active?.value ?? 0) + (item.passive?.gold ?? 0);
}

export const roundTo = (v, step = 50) => Math.max(step, Math.round(v / step) * step);

// ── 档位目标效率 ──
// 小件 = 100%（组件必须不亏不赚，否则玩家会被迫跳过它们）
// 中件 = 102%（合成略有让利）
// 大件 = 108%（再叠一件被动，作为"攒够钱"的正反馈）
export const TIER_EFF = { 1: 1.0, 2: 1.02, 3: 1.08 };

export function efficiency(item) {
  // 被动默认不计价（被动就是买大件的理由）；主动要计价，否则主动件等于白送一次技能；
  // 中件上的被动写了 passive.gold 才算钱
  return itemValue(item) / item.cost;
}

// 从源码里把 ln 装备表读出来（ln 是多变量声明链的第一项，收尾是 `}`）
export function readLn() {
  const src = fs.readFileSync(path.join(root, 'src/33-data-2.js'), 'utf8');
  const i = src.indexOf('const ln = {');
  if (i < 0) throw new Error('找不到 const ln = {');
  let d = 0,
    j = i + 10,
    inStr = 0,
    q = '';
  for (; j < src.length; j++) {
    const c = src[j];
    if (inStr) {
      if (c === '\\') {
        j++;
        continue;
      }
      if (c === q) inStr = 0;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') {
      inStr = 1;
      q = c;
      continue;
    }
    if (c === '{') d++;
    else if (c === '}') {
      d--;
      if (d === 0) {
        j++;
        break;
      }
    }
  }
  return new Function(`return (${src.slice(i + 11, j)});`)();
}

function main() {
  const argv = process.argv.slice(2);
  const file = (argv.find((a) => a.startsWith('--items=')) || '').split('=')[1];
  const items = file ? JSON.parse(fs.readFileSync(file, 'utf8')) : readLn();
  const m = marginal();

  if (!argv.includes('--json')) {
    console.log('参考站桩点（等级 10 裸装平均）:', JSON.stringify(REF));
    console.log('边际收益:');
    console.log(`  1 生命  = ${m.ehpPerHp.toFixed(2)} EHP`);
    console.log(`  1 护甲  = ${m.ehpPerArmor.toFixed(2)} EHP   → 与生命等价价 ${(m.ehpPerArmor / m.ehpPerHp).toFixed(2)} 金`);
    console.log(`  1 物攻  = ${m.dpsPerAd.toFixed(3)} DPS`);
    console.log(`  1% 攻速 = ${m.dpsPerAsPct.toFixed(3)} DPS`);
    console.log(`  1% 暴击 = ${m.dpsPerCritPct.toFixed(3)} DPS`);
    console.log(`  1% 穿透 = ${m.dpsPerPenPct.toFixed(3)} DPS`);
    console.log('');
    console.log('装备效率（属性价值 / 售价，被动价值未计入）:');
    console.log('  id'.padEnd(20), '售价'.padStart(6), '属性价值'.padStart(9), '效率'.padStart(7));
    const rows = Object.values(items).map((it) => ({
      id: it.id,
      cost: it.cost,
      value: statValue(it.stats),
      eff: statValue(it.stats) / it.cost,
      hasPassive: !!it.passive,
    }));
    rows.sort((a, b) => a.eff - b.eff);
    for (const r of rows) {
      const bar = '█'.repeat(Math.max(0, Math.round((r.eff - 0.5) * 40)));
      console.log(
        `  ${r.id.padEnd(18)} ${String(r.cost).padStart(6)} ${String(Math.round(r.value)).padStart(9)} ${(r.eff * 100).toFixed(0).padStart(5)}% ${bar}${r.hasPassive ? ' (有被动)' : ''}`,
      );
    }
    const effs = rows.map((r) => r.eff);
    const avg = effs.reduce((a, b) => a + b, 0) / effs.length;
    console.log('');
    console.log(`  中位 ${(effs.sort((a, b) => a - b)[Math.floor(effs.length / 2)] * 100).toFixed(0)}%  平均 ${(avg * 100).toFixed(0)}%`);
  } else {
    console.log(JSON.stringify(Object.values(items).map((it) => ({ ...it, value: statValue(it.stats), eff: efficiency(it) })), null, 2));
  }
}

if (process.argv[1] && process.argv[1].endsWith('itembalance.mjs')) main();
