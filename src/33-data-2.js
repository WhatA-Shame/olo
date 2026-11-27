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
  baton: {
    id: "baton",
    name: "警棍",
    category: "attack",
    tier: 1,
    cost: 300,
    stats: {
      ad: 20,
    },
    color: "#c8ccd4",
  },
  steel_pipe: {
    id: "steel_pipe",
    name: "钢管",
    category: "attack",
    tier: 1,
    cost: 630,
    stats: {
      ad: 42,
    },
    color: "#9aa4b2",
  },
  slingshot: {
    id: "slingshot",
    name: "弹弓",
    category: "attack",
    tier: 1,
    cost: 190,
    stats: {
      attackSpeedPct: 0.12,
    },
    color: "#c9a86a",
  },
  chain_whip: {
    id: "chain_whip",
    name: "铁链",
    category: "attack",
    tier: 1,
    cost: 350,
    stats: {
      attackSpeedPct: 0.22,
    },
    color: "#b08d52",
  },
  knuckle: {
    id: "knuckle",
    name: "指虎",
    category: "attack",
    tier: 1,
    cost: 160,
    stats: {
      critChance: 0.1,
    },
    color: "#b8bcc4",
  },
  red_bull: {
    id: "red_bull",
    name: "红牛",
    category: "attack",
    tier: 1,
    cost: 210,
    stats: {
      lifesteal: 0.07,
    },
    color: "#d8433f",
  },
  steel_nail: {
    id: "steel_nail",
    name: "钢钉",
    category: "attack",
    tier: 1,
    cost: 160,
    stats: {
      armorPen: 0.1,
    },
    color: "#8fa6bb",
  },
  spray_can: {
    id: "spray_can",
    name: "杀虫喷雾",
    category: "magic",
    tier: 1,
    cost: 200,
    stats: {
      ap: 22,
    },
    color: "#7f8cff",
  },
  ddvp: {
    id: "ddvp",
    name: "敌敌畏",
    category: "magic",
    tier: 1,
    cost: 400,
    stats: {
      ap: 44,
    },
    color: "#9ad0c8",
  },
  power_bank: {
    id: "power_bank",
    name: "充电宝",
    category: "magic",
    tier: 1,
    cost: 160,
    stats: {
      mana: 320,
    },
    color: "#5b9bff",
  },
  pepper_spray: {
    id: "pepper_spray",
    name: "防狼喷雾",
    category: "magic",
    tier: 1,
    cost: 160,
    stats: {
      magicPen: 0.1,
    },
    color: "#a86bd8",
  },
  alarm_clock: {
    id: "alarm_clock",
    name: "闹钟",
    category: "magic",
    tier: 1,
    cost: 160,
    stats: {
      cdr: 0.06,
    },
    color: "#7ec8e3",
  },
  padded_coat: {
    id: "padded_coat",
    name: "棉袄",
    category: "defense",
    tier: 1,
    cost: 150,
    stats: {
      armor: 36,
    },
    color: "#b9a07a",
  },
  hard_hat: {
    id: "hard_hat",
    name: "安全帽",
    category: "defense",
    tier: 1,
    cost: 340,
    stats: {
      armor: 80,
    },
    color: "#8d99a8",
  },
  cushion: {
    id: "cushion",
    name: "沙发垫",
    category: "defense",
    tier: 1,
    cost: 260,
    stats: {
      hp: 260,
    },
    color: "#a8794f",
  },
  quilt: {
    id: "quilt",
    name: "棉被",
    category: "defense",
    tier: 1,
    cost: 430,
    stats: {
      hp: 430,
    },
    color: "#a06a44",
  },
  mattress: {
    id: "mattress",
    name: "席梦思",
    category: "defense",
    tier: 1,
    cost: 720,
    stats: {
      hp: 720,
    },
    color: "#d9a441",
  },
  raincoat: {
    id: "raincoat",
    name: "雨衣",
    category: "defense",
    tier: 1,
    cost: 160,
    stats: {
      mr: 40,
    },
    color: "#7f9ad8",
  },
  gas_mask: {
    id: "gas_mask",
    name: "防毒面具",
    category: "defense",
    tier: 1,
    cost: 350,
    stats: {
      mr: 90,
    },
    color: "#6f8fd0",
  },
  milk_powder: {
    id: "milk_powder",
    name: "奶粉罐",
    category: "magic",
    tier: 1,
    cost: 330,
    stats: {
      mana: 260,
      hp: 200,
    },
    color: "#f0d7a0",
  },
  slippers: {
    id: "slippers",
    name: "拖鞋",
    category: "boots",
    tier: 1,
    cost: 250,
    stats: {
      moveSpeed: 0.5,
    },
    color: "#a8794f",
  },
  liberation_shoes: {
    id: "liberation_shoes",
    name: "解放鞋",
    category: "boots",
    tier: 2,
    cost: 710,
    from: ["slippers", "padded_coat"],
    stats: {
      moveSpeed: 0.6,
      armor: 110,
    },
    color: "#8d99a8",
  },
  canvas_shoes: {
    id: "canvas_shoes",
    name: "回力鞋",
    category: "boots",
    tier: 2,
    cost: 710,
    from: ["slippers", "alarm_clock"],
    stats: {
      moveSpeed: 0.6,
      cdr: 0.15,
    },
    color: "#7f8cff",
  },
  running_shoes: {
    id: "running_shoes",
    name: "跑鞋",
    category: "boots",
    tier: 2,
    cost: 710,
    from: ["slippers", "slingshot"],
    stats: {
      moveSpeed: 0.6,
      attackSpeedPct: 0.25,
    },
    color: "#56c7a0",
  },
  police_baton: {
    id: "police_baton",
    name: "伸缩警棍",
    category: "attack",
    tier: 2,
    cost: 1000,
    from: ["baton", "steel_pipe"],
    stats: {
      ad: 68,
    },
    color: "#6fa8d8",
  },
  wrench: {
    id: "wrench",
    name: "大扳手",
    category: "attack",
    tier: 2,
    cost: 940,
    from: ["steel_pipe", "steel_nail"],
    stats: {
      ad: 45,
      armorPen: 0.18,
    },
    color: "#9fb4c9",
  },
  baseball_bat: {
    id: "baseball_bat",
    name: "棒球棍",
    category: "attack",
    tier: 2,
    cost: 940,
    from: ["chain_whip", "knuckle"],
    stats: {
      ad: 15,
      attackSpeedPct: 0.3,
      critChance: 0.16,
    },
    color: "#56c7a0",
  },
  red_bull_pack: {
    id: "red_bull_pack",
    name: "六罐装红牛",
    category: "attack",
    tier: 2,
    cost: 880,
    from: ["red_bull", "baton"],
    stats: {
      ad: 30,
      lifesteal: 0.15,
    },
    color: "#d8433f",
  },
  megaphone: {
    id: "megaphone",
    name: "大喇叭",
    category: "magic",
    tier: 2,
    cost: 980,
    from: ["ddvp", "alarm_clock"],
    stats: {
      ap: 85,
      cdr: 0.09,
    },
    color: "#8b7bff",
  },
  thermos: {
    id: "thermos",
    name: "保温壶",
    category: "magic",
    tier: 2,
    cost: 990,
    from: ["ddvp", "cushion"],
    stats: {
      ap: 70,
      hp: 380,
    },
    color: "#c07ad8",
  },
  firecracker: {
    id: "firecracker",
    name: "二踢脚",
    category: "magic",
    tier: 2,
    cost: 910,
    from: ["pepper_spray", "ddvp"],
    stats: {
      ap: 75,
      magicPen: 0.16,
    },
    color: "#9a6bd8",
  },
  speaker: {
    id: "speaker",
    name: "广场舞音响",
    category: "magic",
    tier: 2,
    cost: 890,
    from: ["power_bank", "padded_coat"],
    stats: {
      ap: 60,
      mana: 420,
      cdr: 0.06,
    },
    color: "#6a86e8",
  },
  iron_door: {
    id: "iron_door",
    name: "防盗门",
    category: "defense",
    tier: 2,
    cost: 880,
    from: ["hard_hat", "cushion"],
    stats: {
      hp: 600,
      armor: 70,
    },
    color: "#98a4b4",
  },
  riot_shield: {
    id: "riot_shield",
    name: "防暴盾牌",
    category: "defense",
    tier: 2,
    cost: 1120,
    from: ["hard_hat", "mattress"],
    stats: {
      hp: 700,
      armor: 90,
    },
    color: "#7fa07a",
  },
  bulletproof_vest: {
    id: "bulletproof_vest",
    name: "防弹衣",
    category: "defense",
    tier: 2,
    cost: 1000,
    from: ["gas_mask", "cushion"],
    stats: {
      hp: 650,
      mr: 95,
    },
    color: "#7fb8d8",
  },
  lunchbox: {
    id: "lunchbox",
    name: "饭盒",
    category: "magic",
    tier: 2,
    cost: 980,
    from: ["power_bank", "cushion"],
    stats: {
      mana: 400,
      hp: 300,
    },
    passive: {
      id: "mana_battery",
      name: "边吃边回",
      desc: "受到伤害的 15% 转化为法力；消耗法力的 20% 转化为生命。",
      value: 0.15,
      value2: 0.2,
      gold: 500,
    },
    color: "#f2b455",
  },
  dumbbell: {
    id: "dumbbell",
    name: "哑铃",
    category: "defense",
    tier: 2,
    cost: 1350,
    from: ["cushion", "steel_pipe"],
    stats: {
      hp: 300,
      hpToAdPct: 0.012,
    },
    color: "#8c93a3",
  },
  first_aid_kit: {
    id: "first_aid_kit",
    name: "急救箱",
    category: "support",
    tier: 2,
    cost: 1030,
    from: ["hard_hat", "cushion"],
    stats: {
      hp: 700,
      shieldPower: 0.25,
      cdr: 0.05,
    },
    color: "#7fd8b8",
  },
  sledgehammer: {
    id: "sledgehammer",
    name: "大铁锤",
    category: "attack",
    tier: 3,
    cost: 2100,
    from: ["police_baton", "steel_pipe"],
    stats: {
      ad: 134,
      cdr: 0.1,
    },
    passive: {
      id: "execute_bonus",
      name: "收割",
      desc: "对生命低于 50% 的敌人，伤害 +15%(对建筑无效)。",
      value: 0.15,
      value2: 0.5,
    },
    color: "#ffb44d",
  },
  nail_gun: {
    id: "nail_gun",
    name: "射钉枪",
    category: "attack",
    tier: 3,
    cost: 1900,
    from: ["baseball_bat", "chain_whip"],
    stats: {
      ad: 35,
      attackSpeedPct: 0.5,
      critChance: 0.3,
      moveSpeed: 0.5,
    },
    passive: {
      id: "onhit_magic",
      name: "附带法伤",
      desc: "普攻额外造成 60 点法术伤害(对建筑无效)。",
      value: 60,
    },
    color: "#ffd76a",
  },
  red_bull_case: {
    id: "red_bull_case",
    name: "红牛整箱",
    category: "attack",
    tier: 3,
    cost: 1900,
    from: ["red_bull_pack", "police_baton"],
    stats: {
      ad: 86,
      lifesteal: 0.25,
    },
    color: "#d8433f",
  },
  pry_bar: {
    id: "pry_bar",
    name: "撬棍",
    category: "attack",
    tier: 3,
    cost: 1950,
    from: ["wrench", "police_baton"],
    stats: {
      ad: 98,
      armorPen: 0.4,
    },
    color: "#9fb4c9",
  },
  brick: {
    id: "brick",
    name: "板砖",
    category: "attack",
    tier: 3,
    cost: 2150,
    from: ["baseball_bat", "knuckle"],
    stats: {
      ad: 80,
      critChance: 0.4,
      critDamage: 0.4,
    },
    color: "#b48cff",
  },
  radio: {
    id: "radio",
    name: "收音机",
    category: "magic",
    tier: 3,
    cost: 2000,
    from: ["megaphone", "power_bank"],
    stats: {
      ap: 170,
      mana: 400,
      cdr: 0.15,
    },
    color: "#7f8cff",
  },
  ddvp_concentrate: {
    id: "ddvp_concentrate",
    name: "浓敌敌畏",
    category: "magic",
    tier: 3,
    cost: 2100,
    from: ["firecracker", "ddvp"],
    stats: {
      ap: 180,
      magicPen: 0.4,
    },
    color: "#a86bd8",
  },
  air_cooler: {
    id: "air_cooler",
    name: "冷风机",
    category: "magic",
    tier: 3,
    cost: 2000,
    from: ["thermos", "mattress"],
    stats: {
      ap: 140,
      hp: 900,
    },
    passive: {
      id: "spell_slow",
      name: "技能减速",
      desc: "技能造成伤害时使目标减速 20%，持续 1 秒。",
      value: 0.2,
      value2: 1,
    },
    color: "#8fd8ff",
  },
  baijiu: {
    id: "baijiu",
    name: "二锅头",
    category: "magic",
    tier: 3,
    cost: 2300,
    from: ["ddvp", "spray_can"],
    stats: {
      ap: 220,
      apPct: 0.3,
    },
    color: "#c9f6ff",
  },
  riot_armor: {
    id: "riot_armor",
    name: "防暴服",
    category: "defense",
    tier: 3,
    cost: 1900,
    from: ["riot_shield", "hard_hat"],
    stats: {
      hp: 1000,
      armor: 250,
    },
    passive: {
      id: "cripple_aura",
      name: "减攻速",
      desc: "用普攻打你的敌人攻速 −20%，持续 2 秒。",
      value: 0.2,
      value2: 2,
    },
    color: "#8d99a8",
  },
  fire_blanket: {
    id: "fire_blanket",
    name: "灭火毯",
    category: "defense",
    tier: 3,
    cost: 1850,
    from: ["bulletproof_vest", "gas_mask"],
    stats: {
      hp: 1000,
      mr: 255,
    },
    passive: {
      id: "spell_shield",
      name: "保命盾",
      desc: "生命低于 35% 时获得 600(+每级 60) 护盾，持续 4 秒，冷却 60 秒。",
      value: 600,
      value2: 60,
    },
    color: "#7f9ad8",
  },
  big_quilt: {
    id: "big_quilt",
    name: "十斤大棉被",
    category: "defense",
    tier: 3,
    cost: 2000,
    from: ["mattress", "quilt"],
    stats: {
      hp: 2100,
    },
    passive: {
      id: "regen_ooc",
      name: "脱战回血",
      desc: "脱离战斗 5 秒后，每秒回复 2% 最大生命。",
      value: 0.02,
    },
    color: "#ff9a9a",
  },
  barbed_fence: {
    id: "barbed_fence",
    name: "铁丝网",
    category: "defense",
    tier: 3,
    cost: 1750,
    from: ["hard_hat", "mattress"],
    stats: {
      hp: 900,
      armor: 235,
    },
    passive: {
      id: "thorns",
      name: "反伤",
      desc: "被普攻打中时，对攻击者造成该次伤害 18% 的法术伤害。",
      value: 0.18,
    },
    color: "#c07a5a",
  },
  demolition_hammer: {
    id: "demolition_hammer",
    name: "拆迁大锤",
    category: "attack",
    tier: 3,
    cost: 3280,
    from: ["police_baton", "wrench"],
    stats: {
      ad: 215,
      cdr: 0.12,
    },
    color: "#ff8a3c",
  },
  concrete_block: {
    id: "concrete_block",
    name: "水泥墩",
    category: "defense",
    tier: 3,
    cost: 3240,
    from: ["riot_shield", "bulletproof_vest"],
    stats: {
      hp: 1800,
      armor: 220,
      mr: 200,
    },
    color: "#5fa88f",
  },
  suona: {
    id: "suona",
    name: "唢呐",
    category: "magic",
    tier: 3,
    cost: 2900,
    from: ["megaphone", "firecracker"],
    stats: {
      ap: 260,
      magicPen: 0.3,
      cdr: 0.12,
    },
    color: "#b48cff",
  },
  gas_tank: {
    id: "gas_tank",
    name: "煤气罐",
    category: "defense",
    tier: 3,
    cost: 3430,
    from: ["quilt", "mattress"],
    stats: {
      hp: 3700,
    },
    color: "#d9a441",
  },
  wild_dog_milk: {
    id: "wild_dog_milk",
    name: "野生狗奶",
    category: "magic",
    tier: 3,
    cost: 2510,
    from: ["lunchbox", "milk_powder"],
    stats: {
      mana: 900,
      hp: 900,
      cdr: 0.1,
    },
    passive: {
      id: "mana_battery",
      name: "野生配方",
      desc: "受到伤害的 25% 转化为法力；消耗法力的 35% 转化为生命。",
      value: 0.25,
      value2: 0.35,
      gold: 1100,
    },
    color: "#f7e3b0",
  },
  herb_jar: {
    id: "herb_jar",
    name: "药酒罐",
    category: "support",
    tier: 2,
    cost: 1150,
    from: ["gas_mask", "alarm_clock"],
    stats: {
      hp: 600,
      mr: 80,
      cdr: 0.1,
    },
    color: "#7fd8b8",
  },
  steel_basin: {
    id: "steel_basin",
    name: "不锈钢大盆",
    category: "support",
    tier: 3,
    cost: 1650,
    from: ["iron_door", "cushion"],
    stats: {
      hp: 700,
      armor: 90,
    },
    active: {
      name: "扣盆",
      desc: "把盆扣在头上一蹲：2 秒内无法被选中、免疫伤害，也不能行动。",
      cd: 75,
      kind: "stasis",
      duration: 2,
      value: 700,
    },
    color: "#ffd76a",
  },
  e_bike: {
    id: "e_bike",
    name: "电动车",
    category: "support",
    tier: 3,
    cost: 1630,
    from: ["cushion", "alarm_clock"],
    stats: {
      hp: 800,
      cdr: 0.12,
    },
    active: {
      name: "骑走",
      desc: "引导 2.5 秒后骑到 30 米内的指定位置。受到控制或主动行动会中断。",
      cd: 90,
      kind: "teleport",
      channel: 2.5,
      range: 30,
      value: 650,
    },
    color: "#8fd8ff",
  },
  big_pot: {
    id: "big_pot",
    name: "大锅菜",
    category: "support",
    tier: 3,
    cost: 1910,
    from: ["megaphone", "cushion"],
    stats: {
      ap: 100,
      cdr: 0.12,
      hp: 300,
    },
    active: {
      name: "开饭",
      desc: "治疗周围 8 米内的友军 220(+施法者 6% 最大生命)。",
      cd: 60,
      kind: "heal",
      radius: 8,
      amount: 220,
      hpRatio: 0.06,
      value: 550,
    },
    color: "#9df5d2",
  },
  huoxiang: {
    id: "huoxiang",
    name: "藿香正气水",
    category: "support",
    tier: 3,
    cost: 1800,
    from: ["bulletproof_vest", "padded_coat"],
    stats: {
      hp: 900,
      mr: 100,
      cdr: 0.08,
    },
    active: {
      name: "灌一瓶",
      desc: "解除自身所有控制，并在 1.5 秒内免疫控制。",
      cd: 70,
      kind: "cleanse",
      duration: 1.5,
      value: 450,
    },
    color: "#c9f6ff",
  },
  fire_hydrant: {
    id: "fire_hydrant",
    name: "消防栓",
    category: "support",
    tier: 3,
    cost: 2310,
    from: ["riot_shield", "iron_door"],
    stats: {
      hp: 1200,
      armor: 200,
      shieldPower: 0.5,
    },
    color: "#ff8a3c",
  },
  ginger_tea: {
    id: "ginger_tea",
    name: "红糖姜茶",
    category: "support",
    tier: 3,
    cost: 2270,
    from: ["thermos", "cushion"],
    stats: {
      ap: 130,
      hp: 1000,
      healPower: 0.4,
    },
    color: "#e0a86a",
  },
  trenbolone: {
    id: "trenbolone",
    name: "群勃龙",
    category: "consumable",
    tier: 1,
    cost: 150,
    stack: 3,
    stats: {},
    active: {
      name: "注射",
      cd: 1,
      kind: "consume",
      desc: "8 秒内物攻 +25、攻速 +15%；立刻损失 10% 当前生命（不会致死）。",
      costHpPct: 0.1,
      buffs: [{
          id: "ad_up",
          value: 25,
          duration: 8,
        }, {
          id: "attack_speed",
          value: 0.15,
          duration: 8,
        }],
    },
    color: "#ff6b5a",
  },
  stanozolol: {
    id: "stanozolol",
    name: "康力龙",
    category: "consumable",
    tier: 1,
    cost: 140,
    stack: 3,
    stats: {},
    active: {
      name: "注射",
      cd: 1,
      kind: "consume",
      desc: "10 秒内护甲 +45，且每秒回复 1% 最大生命。",
      buffs: [{
          id: "armor_up",
          value: 45,
          duration: 10,
        }, {
          id: "hp_regen",
          value: 0.01,
          duration: 10,
        }],
    },
    color: "#ffb44d",
  },
  cigarette: {
    id: "cigarette",
    name: "香烟",
    category: "consumable",
    tier: 1,
    cost: 90,
    stack: 5,
    stats: {},
    active: {
      name: "点一根",
      cd: 1,
      kind: "consume",
      desc: "立刻回复 30% 最大法力；6 秒内法强 +25、移速 −8%。",
      manaPct: 0.3,
      buffs: [{
          id: "ap_up",
          value: 25,
          duration: 6,
        }, {
          id: "slow",
          value: 0.08,
          duration: 6,
        }],
    },
    color: "#d8d2c4",
  },
  betel_nut: {
    id: "betel_nut",
    name: "槟榔干",
    category: "consumable",
    tier: 1,
    cost: 100,
    stack: 5,
    stats: {},
    active: {
      name: "嚼一颗",
      cd: 1,
      kind: "consume",
      desc: "立刻回复 20% 最大生命；8 秒内移速 +12%。",
      healPct: 0.2,
      buffs: [{
          id: "haste",
          value: 0.12,
          duration: 8,
        }],
    },
    color: "#c94f3d",
  },
  fermented_juice: {
    id: "fermented_juice",
    name: "发酵果汁",
    category: "consumable",
    tier: 1,
    cost: 110,
    stack: 5,
    stats: {},
    active: {
      name: "喝一口",
      cd: 1,
      kind: "consume",
      desc: "8 秒内每秒回复 2% 最大生命与 1.2% 最大法力。",
      buffs: [{
          id: "hp_regen",
          value: 0.02,
          duration: 8,
        }, {
          id: "mana_regen",
          value: 0.012,
          duration: 8,
        }],
    },
    color: "#e2a33c",
  },
},
  IB = Object.values(ln),
  Yh = 0.6,
  PB = {
    cooldown: "技能冷却中",
    mana: "法力不足",
    disabled: "当前无法行动",
    no_target: "没有可用目标",
    no_active: "这件装备没有主动",
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
    mushroom_passive: (n) => `菌丝蓄势 ${n.stacks}/6：叠满 7 层时爆开，额外造成最大生命伤害并给自己一层等量护盾。`,
    chijin_ember: () => "下一次普攻变为重斧，并回复自身生命。",
    chijin_blaze: (n) => (n.value > 0 ? `攻速提高 ${Ps(n.value)}。` : "攻速大幅提高。"),
    chijin_spin: () => "斧影持续劈砍周围敌人；期间免疫减速并获得减伤。",
    // 牛魔这两个以前只登记了名字和图标、漏了说明 —— 鼠标移到状态图标上 UB() 取不到函数，
    // 直接抛 "FB[n.id] is not a function" 把整个界面打断。
    niumo_flame: (n) =>
      n.stacks > 1
        ? `磨砂火焰 ${n.stacks} 层：每秒受到 ${Math.round(n.value * n.stacks)} 点魔法伤害。`
        : `磨砂火焰：每秒受到 ${Math.round(n.value)} 点魔法伤害。`,
    niumo_march: () => "烈焰行军：朝选定方向前进并持续喷火，免疫控制，期间无法转向与攻击。",
    niumo_ult: () => "烈焰牛魔：免疫控制，脚下不断留下火焰，普攻引爆火焰层数；期间击杀敌方英雄可刷新持续时间。",
    xingli_mark: (n) => `余音 ${n.stacks}/3：叠满后弦音共振，造成伤害并眩晕。`,
    fengling_gale: (n) => `连射 ${n.stacks}/5：每层提高攻速，满层后移速提高、普攻附带额外伤害。`,
    fengling_crit: () => "下一次普攻必定暴击。",
    yeque_shadow: () => "刚刚得手：一、二技能的冷却已刷新。",
    blind: () => "致盲：普通攻击全部落空。",
    xuesong_dig: () => "铲沙子中：正在反复撬地铲沙，铲子上的沙子越堆越多。",
    xuesong_sand: () => "一铁锹沙子在手：再次施放一技能可将沙子抛出，造成高额伤害与长时间致盲。",
    xuesong_pole: () => "立定撑篙：铲头插地站在铁锹顶端，处于高空不可选中状态，无法移动，为队友提供大片视野；再次施放二技能选落点跳下并给友军套盾。",
    xuesong_scoop: () => "颠勺铁锹：正用铁锹高举一名敌人；再次施放大招将其投掷到指定位置。",
    xuesong_lifted: () => "被铁锹高高举起压制：无法移动、攻击和施放技能。",
    stone_passive: () => "祖传安全帽就绪：下一次普攻附带额外物理伤害。",
    stone_train: () => "练功中：原地锻炼 7 秒每秒叠 1 层，期间击杀小兵野怪 +1 层、杀英雄 +4 层，受伤 +30%。",
    stone_gains: (n) => `练功底子 ×${n.stacks}：永久提升最大生命、护甲和攻击力，死亡后不清空。`,
    stone_tether: () => "抓起来锤：已锁住敌方英雄并大幅提速，被其带着走并可持续普攻；目标阵亡后可二次施放扔尸体。",
    stone_locked: () => "被小肥石死死抱住：减速 50%，你的移动和传送会把小肥石一起带走。",
    stone_corpse: () => "抓起尸体：再次施放二技能可将尸体投掷出去，砸地造成伤害并击飞。",
    scallion_glide: (n) => `飘逸刺头：脱战滑行加速中，当前移速 +${Math.round((n.value || 0) * 100)}%。`,
    scallion_s1_cnt: (n) => `葱锋计数：已普攻 ${n.stacks} 次，满 4 次自动白送一次无前摇葱锋。`,
    scallion_shred: (n) => `护甲破损：已被葱锋拍碎护甲 ${n.stacks} 层，护甲降低 ${Math.round((n.value || 0) * n.stacks * 100)}%。`,
    scallion_boost: () => "葱能爆发：攻速和普攻抽打射程大幅提升。",
    scallion_beam: () => "葱击波：正在喷射绿色葱能激光，无法移动，可通过移动方向缓慢扫射转向；再次按大招可主动提前中断。",
    paperboy_effigy_ready: () => "纸替身在岗：己方防御塔下正游荡着一个纸替身。受致命伤时替身先碎，回血并换位到替身处，引爆大范围内敌人全部晦气。",
    paperboy_effigy_cd: () => "纸替身重扎中：冷却结束后会在最近去过的己方存活防御塔下重新生成替身。",
    paperboy_gloom: (n) => `晦气 ×${n.stacks}：永久附身，只有在爆发后清零或回泉水慢慢消解。引爆时将直接扣除 ${n.stacks}% 最大生命值（血条白色部分）。`,
    paperboy_suona: () => "唢呐齐响：吹响唢呐中，大范围内敌人每秒叠加晦气；护盾被打破会立刻中断。",
    paperboy_crane_guard: () => "纸鹤护体：免疫控制效果并大幅提速。",
    paperboy_bind: (n) =>
      n.value > 0
        ? "扎筋点睛：正用红线绑着一名队友，替其承受 30% 伤害并给打人的敌人自动叠晦气。"
        : "扎筋点睛（自绑）：无免伤，但所有攻击自己的敌人都会按伤害量自动叠加晦气。",
    paperboy_bound: (n) =>
      n.value > 0
        ? "扎筋点睛庇护：受到的 30% 伤害会转给纸札人，攻击你的敌人会被自动叠上晦气。"
        : "扎筋点睛（反噬）：不减伤，但所有打你的人都会按伤害量自动叠加晦气。",
    maggot_digest: () => "消化酝酿：刚吃下消耗品，倒计时结束会伴随响屁在原地拉出一坨小粪污。",
    maggot_aura: (n) => `粪堆加持 ×${n.stacks}：攻速 +${n.stacks * 12}%，普攻多吐碎粑粑；大招伤害按 ${(Math.pow(1.5, n.stacks) * 100).toFixed(0)}% 累乘、蓝耗按 ${(Math.pow(1.8, n.stacks) * 100).toFixed(0)}% 累乘。`,
    maggot_spray: () => "喷吐中：正朝前方持续喷吐散碎粪便，敌人被喷中满 3 秒会在脚下长出一坨小粪污。",
    maggot_coated: (n) => `沾满粪渣：被活蛆喷吐沾染中（${Math.min(100, Math.round((n.stacks / 12) * 100))}%），满 3 秒脚下会生成挡路小粪污。`,
    maggot_vacuum: () => "吸粪机运转：正把大范围内所有粪污猛吸到自己身边合成新大粪污。",
    horseman_momentum: (n) => `助跑蓄势 ${n.stacks}/5 秒：保持移动且别普攻，跑满 5 秒下一次普攻变为带位移与击退的高伤冲锋。`,
    horseman_charge: () => "人马一体就绪：下一次普攻变为长距离冲锋，沿途撞开所有敌人，移速越快伤害越高且无上限。",
    horseman_dashing: () => "强化冲锋中：高速前冲撞开沿途所有敌人。",
    horseman_kick_charge: () => "后腿蹬蓄力中：原地站定不可移动，松手朝瞄准方向猛蹬出去，造成大量物理伤害并眩晕。",
    horseman_neigh_guard: () => "嘶鸣霸体：免疫所有控制效果，横冲直撞不怕被拦。",
    horseman_weak: (n) => `气势受挫：被半马人嘶鸣震慑，造成的所有伤害降低 ${Math.round((n.value || 0.25) * 100)}%。`,
    horseman_trample: (n) => `践踏狂奔：移速爆发提升 +${Math.round((n.value || 0.5) * 100)}%（持续衰减），击杀敌方英雄可立刻刷新大招冷却。`,
    cow_gains: (n) => `深蹲练腿 ×${n.stacks} 层：永久提升物理攻击力、移动速度与冷却缩减。`,
    cow_squat: () => "深蹲中：原地暴力练腿 3 秒，无法移动但可以普攻与施放技能，每秒永久叠加 1 层。",
    cow_exhaust: () => "力竭：练深蹲腿软了，移动速度降低 40%（深蹲层数越高力竭持续越久），开启大招牛气冲天可立刻解除。",
    cow_giant: () => "牛气冲天：体型大幅变大，获得额外生命值与移动速度。",
    cow_stomp_ready: (n) => `连环跺脚：剩余 ${n.stacks} 次，再次按大招可重重跺地，造成圆形范围物理伤害并眩晕敌人。`,
    cow_flykick: () => "飞踢突进：纵身飞踹目标，落地必定造成物理暴击伤害。",
    cow_stride: () => "大长腿跨步：迈开长腿直接跨越薄墙体或人造障碍。",
    monkey_peel_ammo: (n) => `甩蕉皮存量 ×${n.stacks} 层：可连续朝指定地点扔出香蕉皮（场上最多 8 片）。`,
    monkey_eating: () => "啃香蕉：正在大口吃香蕉，吃完回复生命或满血加速，并顺手往轮椅底下丢香蕉皮。",
    monkey_banana_haste: () => "满血吃蕉爆发：获得大幅爆发加速，轮椅踩出火星子。",
    monkey_stick_out: () => "立棍挡路：铁棍已插在地上变粗挡路，持续结束自动收回。",
    monkey_ult: (n) =>
      `铁棍修行：持续期间普攻全变直线穿透击退横扫、攻击距离大幅延长但移速降低 15%${n.stacks > 0 ? `（剩余 ${n.stacks} 棍必定暴击）` : ""}；杀小兵叠 1 层、杀英雄叠 6 层，每层永久加 0.1 码棍长。`,
    monkey_stick_len: (n) => `棍长修行 ×${n.stacks} 层：铁棍已永久增长 ${(n.stacks * 0.1).toFixed(1)} 码，永久提升攻击距离与外观长度。`,
    slime_regen: () => "弹性回血：刚吃下的物理伤害正在持续反弹回复生命。",
    slime_wall_bounce: () => "撞墙弹射：0.5 秒内按二技能可无视冷却瞬发无需蓄力的满额弹球。",
    slime_cling: () => "吸附贴身：紧贴敌人并跟随其移动，免疫一切击退效果，每 0.25 秒造成魔法伤害。",
    slime_ball_charge: () => "弹球蓄力中：原地压紧蓄力，蓄越久冲得越远、越快、伤害越高，松手或再按立刻弹出。",
    slime_ball_dash: () => "弹球冲撞：高速弹射冲撞，撞飞路径上的敌人。",
    slime_puddle: () => "化整为零：不可选取，摊成 4 倍大滩果冻大量回血并持续灼伤踩到的敌人，期间按一技能可把人全都反吸拖走。",
    slime_absorbed: () => "被果冻吸住：被黄色史莱姆反吸进果冻里，强制跟随其移动，无法自主移动或位移。",
    tower_focus: (n) =>
      `塔在打你：塔的伤害越打越疼，现在 +${Ps(Math.min(yr.rampMax, n.stacks * yr.rampPerHit))}。塔下没有小兵就先退出来。`,
  };

function UB(n) {
  // 说明表是手写的，漏一个 id 不该把整个界面炸掉（牛魔那两个就漏了）。
  // 没写说明就先空着，至少状态名和图标还能正常显示。
  const f = FB[n.id];
  return f ? f(n) : "";
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
    // 派生属性：哑铃、消防栓、红糖姜茶
    ["hpToAdPct", "生命→物攻", (n) => `+${(n * 100).toFixed(1)}%`],
    ["shieldPower", "护盾效率", (n) => `+${Ps(n)}`],
    ["healPower", "治疗加成", (n) => `+${Ps(n)}`],
  ];

function ek(n) {
  const t = [];
  for (const [e, s, i] of tk) {
    const a = n[e];
    // key 要带出去：详情面板按 key 取属性小图标（48-item-icons.js 的 traitIcon）
    a !== void 0 && t.push({ key: e, label: s, value: i(a) });
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
    defense: { name: Br.defense, short: "防身", color: "#9fd6ff" },
    channel: { name: Br.channel, short: "引导", color: "#d5b8ff" },
  },
  u4 = { recommend: "推荐", attack: "攻击", magic: "法术", defense: "防御", support: "辅助", boots: "鞋", consumable: "消耗品" },
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

function Kh(n, t, e = "sf-ico", vb = null) {
  const s = `sfi${(HB++).toString(36)}-`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb ?? `0 0 ${n} ${n}`}" class="${e}" aria-hidden="true" focusable="false">${t.replace(/@/g, s)}</svg>`;
}

function dn(n, t, e) {
  // 背景那团发光圆要留在投影外面：它本来只是"让物件从底色里浮起来"的一层柔光，
  // 一起进 filter 的话会被 feDropShadow 再糊一次，特写下能看见一圈脏雾。
  const gw = (e.match(/<circle[^>]*url\(#@gw\)[^>]*\/>/) || [""])[0],
    bd = gw ? e.replace(gw, "") : e;
  return Kh(
    64,
    `<defs>${Vo("bg", 32, 27, 48, [
      [0, n[0]],
      [0.5, n[1]],
      [1, n[2]],
    ])}${Vo("vg", 32, 32, 46, [
      [0.62, "#000", 0],
      [1, "#000", 0.44],
    ])}${fn("gl", 0, 0, 0, 30, [
      [0, "#fff", 0.22],
      [1, "#fff", 0],
    ])}<filter id="@ds" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="2" stdDeviation="1" flood-color="#04070e" flood-opacity=".62"/></filter>${Vo("fs", 32, 54, 19, [
      [0, "#04070e", 0.46],
      [0.55, "#04070e", 0.16],
      [1, "#04070e", 0],
    ])}${t}</defs><rect width="64" height="64" fill="url(#@bg)"/><ellipse cx="32" cy="54" rx="19" ry="5" fill="url(#@fs)"/>${gw}<g filter="url(#@ds)">${bd}</g><rect width="64" height="64" fill="url(#@vg)"/><path d="M0 0H64V19Q32 31 0 19Z" fill="url(#@gl)"/>`,
    "sf-ico",
    "4 4 56 56",
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
    red: "#b8442c",
    deep: "#4a2317",
    dark: "#241a15",
    iron: "#4a4447",
    steel: "#c9ced6",
    edge: "#fff4e2",
    gold: "#c8a05a",
    goldL: "#f0d79b",
    glow: "#ff8a3c",
    hot: "#ffd9a0",
    wood: "#6b4a2e",
    heal: "#6fe3a1",
    skull: "#cfc4b2",
    horn: "#e8dfcc",
    muzzle: "#8d7b68",
    crack: "#ffb066",
    speed: "#ffcf8f",
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

// 牛魔：牛头人 + 十字巨剑 + 火焰。图标母题是「牛头 / 火 / 剑」，
// 被动和三个技能各取一个组合，跟牛伟那套斧头图标区分开。
const niumoPal = {
    red: "#c0331c",
    deep: "#4a1a10",
    dark: "#241110",
    iron: "#4a4447",
    steel: "#d8d2c8",
    edge: "#fff2df",
    gold: "#e0a04a",
    goldL: "#ffd28a",
    glow: "#ff5a1f",
    hot: "#ffb066",
    wood: "#5c3a24",
  },
  niumoBlade = fn("swd", -7, 0, 7, 0, [
    [0, niumoPal.iron],
    [0.45, "#8d9299"],
    [0.82, niumoPal.steel],
    [1, niumoPal.edge],
  ]);

// 十字巨剑：细长剑身 + 横格 + 柄，默认朝上
function niumoSword(n) {
  return (
    `<g transform="${n}">` +
    `<path d="M0 -30L4.6 -23V4H-4.6V-23Z" fill="url(#@swd)" stroke="${xe}" stroke-width="1.3" stroke-linejoin="round"/>` +
    `<path d="M0 -26V2" stroke="${niumoPal.hot}" stroke-width="1.6" stroke-linecap="round"/>` +
    `<path d="M-13.5 4H13.5V10.5H-13.5Z" fill="${niumoPal.gold}" stroke="${xe}" stroke-width="1.1" stroke-linejoin="round"/>` +
    `<path d="M-3.6 10.5H3.6V21H-3.6Z" fill="${niumoPal.wood}" stroke="${xe}" stroke-width="1"/>` +
    `<path d="M0 21L-3.4 26.5H3.4Z" fill="${niumoPal.gold}" stroke="${xe}" stroke-width="1" stroke-linejoin="round"/>` +
    `</g>`
  );
}

const niumoIcons = {
    passive: () =>
      dn(
        Rs("niumo"),
        je("g", niumoPal.glow) + je("gh", niumoPal.hot, 0.9) + niumoBlade,
        We("g", 32, 38, 22) +
          `<path d="M32 4Q38 10 36 15Q40 13 41 9Q46 17 38 23Q34 26 32 23Q26 26 22 22Q17 16 21 10Q23 15 27 15Q25 9 32 4Z" fill="${niumoPal.hot}" stroke="${xe}" stroke-width="1.300" stroke-linejoin="round"/>` +
          `<path d="M18 27Q7 23 5 13Q13 19 21 22Z" fill="${niumoPal.gold}" stroke="${xe}" stroke-width="1.400" stroke-linejoin="round"/><path d="M46 27Q57 23 59 13Q51 19 43 22Z" fill="${niumoPal.gold}" stroke="${xe}" stroke-width="1.400" stroke-linejoin="round"/>` +
          `<path d="M32 23Q45 23 47 37Q48 49 38 55H26Q16 49 17 37Q19 23 32 23Z" fill="${niumoPal.steel}" stroke="${xe}" stroke-width="1.600" stroke-linejoin="round"/>` +
          `<path d="M25 44Q32 40.500 39 44Q39 52.500 32 54Q25 52.500 25 44Z" fill="${niumoPal.wood}" stroke="${xe}" stroke-width="1.300" stroke-linejoin="round"/>` +
          `<ellipse cx="28.500" cy="47.500" rx="1.700" ry="2.300" fill="${xe}"/><ellipse cx="35.500" cy="47.500" rx="1.700" ry="2.300" fill="${xe}"/>` +
          `<path d="M22.500 35L28.500 37.500M41.500 35L35.500 37.500" stroke="${xe}" stroke-width="2.200" stroke-linecap="round"/>` +
          `<path d="${hn(47.500, 18, 3.4)}" fill="${niumoPal.edge}"/>`,
      ),
    s1: () =>
      dn(
        Rs("niumo"),
        je("g", niumoPal.glow) +
          niumoBlade +
          fn("fire", 0, 0, 62, 0, [
            [0, niumoPal.deep, 0],
            [0.4, niumoPal.glow, 0.9],
            [1, niumoPal.hot],
          ]),
        We("g", 30, 32, 24) +
          `<path d="M2 47Q16 40 32 45Q48 50 62 40" fill="none" stroke="url(#@fire)" stroke-width="7.500" stroke-linecap="round" opacity=".85"/><path d="M2 47Q16 40 32 45Q48 50 62 40" fill="none" stroke="${niumoPal.hot}" stroke-width="2.400" stroke-linecap="round"/>` +
          niumoSword("translate(32 31) rotate(36) scale(1.020)") +
          b1(51, 21, 2, niumoPal.gold),
      ),
    s2: () =>
      dn(
        Rs("niumo"),
        je("g", niumoPal.glow) +
          niumoBlade +
          fn("jet", 0, 0, 62, 0, [
            [0, niumoPal.glow, 0.95],
            [1, niumoPal.hot, 0],
          ]),
        We("g", 26, 32, 22) +
          `<path d="M24 21Q46 26 63 32Q46 38 24 43Z" fill="url(#@jet)" opacity=".9"/><path d="M27 27Q46 29 58 32" fill="none" stroke="${niumoPal.hot}" stroke-width="2" stroke-linecap="round"/>` +
          `<path d="M9 19Q21 15 27 24Q31 33 24 41Q16 47 9 43Q3 32 9 19Z" fill="${niumoPal.steel}" stroke="${xe}" stroke-width="1.500" stroke-linejoin="round"/>` +
          `<path d="M11 19Q8 9 15 5Q15 14 19 18Z" fill="${niumoPal.gold}" stroke="${xe}" stroke-width="1.200" stroke-linejoin="round"/>` +
          `<path d="M8 30L16 32" stroke="${xe}" stroke-width="2.200" stroke-linecap="round"/>` +
          b1(48, 48, 2, niumoPal.gold),
      ),
    ult: () =>
      dn(
        Rs("niumo", !0),
        je("g", niumoPal.glow, 1) +
          niumoBlade +
          fn("ring", 0, 0, 0, 34, [
            [0, niumoPal.hot, 0],
            [1, niumoPal.glow, 0.9],
          ]),
        We("g", 32, 32, 30) +
          `<circle cx="32" cy="32" r="26" fill="none" stroke="url(#@ring)" stroke-width="2.200" stroke-dasharray="7 4" opacity=".8"/>` +
          `<path d="M32 5Q38 11 36 16Q40 14 41 10Q46 18 38 24Q34 27 32 24Q26 27 22 23Q17 17 21 11Q23 16 27 16Q25 9 32 5Z" fill="${niumoPal.hot}" stroke="${xe}" stroke-width="1.200" stroke-linejoin="round"/>` +
          `<path d="M32 24Q44 24 46 36Q47 47 38 54H26Q17 47 18 36Q20 24 32 24Z" fill="${niumoPal.steel}" stroke="${xe}" stroke-width="1.500" stroke-linejoin="round"/>` +
          `<path d="M26 44Q32 41 38 44Q38 52 32 53.500Q26 52 26 44Z" fill="${niumoPal.wood}" stroke="${xe}" stroke-width="1.200" stroke-linejoin="round"/>` +
          `<path d="M23 36L29 38.500M41 36L35 38.500" stroke="${xe}" stroke-width="2.200" stroke-linecap="round"/>` +
          b1(23, 19, 2, niumoPal.gold),
      ),
  };

// 牛伟：牛头人巨斧战士。图标统一走「牛头 + 斧」两个母题，
// 被动/冲撞用牛头骨，横扫/旋风用斧刃轨迹。
const GB = {
    passive: () =>
      dn(
        Rs("chijin"),
        je("g", pn.glow) + je("gh", pn.heal, 0.9) + Bp,
        We("g", 32, 34, 23) +
          `<path d="M18 21Q7 17 5 5Q13 12 21 15Z" fill="${pn.horn}" stroke="${xe}" stroke-width="1.400" stroke-linejoin="round"/><path d="M46 21Q57 17 59 5Q51 12 43 15Z" fill="${pn.horn}" stroke="${xe}" stroke-width="1.400" stroke-linejoin="round"/>` +
          `<path d="M32 13Q45 13 47 29Q48 42 38 50H26Q16 42 17 29Q19 13 32 13Z" fill="${pn.skull}" stroke="${xe}" stroke-width="1.600" stroke-linejoin="round"/>` +
          `<path d="M25 38Q32 34.500 39 38Q39 48 32 49.500Q25 48 25 38Z" fill="${pn.muzzle}" stroke="${xe}" stroke-width="1.300" stroke-linejoin="round"/>` +
          `<ellipse cx="28.500" cy="42" rx="1.700" ry="2.300" fill="${xe}"/><ellipse cx="35.500" cy="42" rx="1.700" ry="2.300" fill="${xe}"/>` +
          `<path d="M22.500 30L28.500 32.500M41.500 30L35.500 32.500" stroke="${xe}" stroke-width="2.200" stroke-linecap="round"/>` +
          `<path d="M45.400 40H50.600V45.400H56V50.600H50.600V56H45.400V50.600H40V45.400H45.400Z" fill="#effff5" stroke="#12603a" stroke-width="1.400" stroke-linejoin="round"/><path d="M47 41.800H49V47H54.200" fill="none" stroke="${pn.heal}" stroke-width="1.300" stroke-linecap="round" stroke-linejoin="round"/>` +
          `<path d="${hn(47.5, 13, 3.4)}" fill="${pn.edge}"/>`,
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
        We("g", 26, 30, 23) +
          `<path d="M58 28A26 26 0 0 0 8 32L21 35A23 23 0 0 1 58 28Z" fill="url(#@sw)"/><path d="M45 14A26 26 0 0 0 8 32" fill="none" stroke="${pn.edge}" stroke-width="1.700" stroke-linecap="round"/>` +
          `<path d="M6 53L14 49L19 54L26 48L32 53" fill="none" stroke="${pn.crack}" stroke-width="1.700" stroke-linecap="round" stroke-linejoin="round"/>` +
          Hp("translate(21 31) rotate(8) matrix(0 .8 .8 0 0 0)", 0) +
          b1(38.5, 55, 2, pn.gold),
      ),
    s2: () =>
      dn(
        Rs("chijin"),
        je("g", pn.glow) + Bp,
        '<g transform="rotate(-8 32 32)">' +
          We("g", 40, 31, 21) +
          `<path d="M1 17H19M-1 27H13M3 39H17" fill="none" stroke="${pn.speed}" stroke-width="2.800" stroke-linecap="round"/>` +
          `<path d="M27 17Q24 7 31 3Q31 11 35 16Z" fill="${pn.horn}" stroke="${xe}" stroke-width="1.300" stroke-linejoin="round"/><path d="M41 17Q45 6 54 3Q48 12 47 18Z" fill="${pn.horn}" stroke="${xe}" stroke-width="1.300" stroke-linejoin="round"/>` +
          `<path d="M25 20Q38 14 47 23Q54 31 48 41Q42 50 30 49Q20 46 19 35Q19 25 25 20Z" fill="${pn.skull}" stroke="${xe}" stroke-width="1.500" stroke-linejoin="round"/>` +
          `<path d="M45 33Q54 33 55 39.500Q54 46 45 46Z" fill="${pn.muzzle}" stroke="${xe}" stroke-width="1.200" stroke-linejoin="round"/>` +
          `<ellipse cx="50" cy="37" rx="1.500" ry="2" fill="${xe}"/>` +
          `<path d="M31 28L40 30.500" stroke="${xe}" stroke-width="2.200" stroke-linecap="round"/>` +
          `<path d="${hn(50, 22, 4)}" fill="#fffdf2"/>` +
          "</g>" +
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
          `<circle cx="32" cy="32" r="26.500" fill="none" stroke="${pn.hot}" stroke-width="1.100" stroke-dasharray="9 5" opacity=".65"/><g>${n}${t}</g><g transform="rotate(180 32 32)">${n}${t}</g>` +
          `<circle cx="32" cy="32" r="12" fill="${pn.dark}" fill-opacity=".72" stroke="${pn.gold}" stroke-width="1"/>` +
          `<path d="M25.500 27Q20 24 19 16.500Q25 21 29 23.500Z" fill="${pn.horn}" stroke="${xe}" stroke-width="1"/><path d="M38.500 27Q44 24 45 16.500Q39 21 35 23.500Z" fill="${pn.horn}" stroke="${xe}" stroke-width="1"/>` +
          `<path d="M32 24.500Q39 24.500 39.500 32Q39 38.500 32 39.500Q25 38.500 24.500 32Q25 24.500 32 24.500Z" fill="${pn.skull}" stroke="${xe}" stroke-width="1.200" stroke-linejoin="round"/>` +
          `<path d="M29 34H35" stroke="${xe}" stroke-width="1.400" stroke-linecap="round"/>` +
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
  mB = {
    passive: () =>
      dn(
        Rs("mushroom"),
        je("g", "#c4a2ff"),
        `<ellipse cx="32" cy="55" rx="17" ry="4.5" fill="none" stroke="#c4b5fd" stroke-width="1.4" opacity=".55"/><path d="M23 53V38Q23 31 32 31Q41 31 41 38V53Q32 57 23 53Z" fill="#f3e7d0" stroke="#070b16" stroke-width="1.6" stroke-linejoin="round"/><path d="M11 35Q13 15 32 15Q51 15 53 35Q42 30 32 30Q22 30 11 35Z" fill="#7c3aed" stroke="#070b16" stroke-width="1.6" stroke-linejoin="round"/><circle cx="24" cy="24" r="2.7" fill="#f7efdd"/><circle cx="38" cy="22" r="2.1" fill="#f7efdd"/><circle cx="27" cy="43" r="1.7" fill="#2b1b3f"/><circle cx="37" cy="43" r="1.7" fill="#2b1b3f"/><path d="M28.5 48Q32 50 35.5 48" fill="none" stroke="#6b1d2a" stroke-width="1.5" stroke-linecap="round"/><path d="M47 44q4.5 2 5.5 6M17 44q-4.5 2-5.5 6" fill="none" stroke="#c4b5fd" stroke-width="1.4" stroke-linecap="round"/>`,
      ),
    s1: () =>
      dn(
        Rs("mushroom", !0),
        je("g", "#c4a2ff", 1),
        `<circle cx="32" cy="32" r="19" fill="#7c3aed" stroke="#070b16" stroke-width="1.8"/><path d="M13 30Q22 21 32 21Q42 21 51 30Q42 26 32 26Q22 26 13 30Z" fill="#a78bfa" opacity=".92"/><circle cx="26" cy="30" r="2.1" fill="#f3e7d0"/><circle cx="38" cy="37" r="1.7" fill="#f3e7d0"/><path d="M52 17q8 7 4 15M56 40q-2 8-9 11M12 47q-6-7-4-15" fill="none" stroke="#c4a2ff" stroke-width="2.2" stroke-linecap="round" opacity=".85"/>`,
      ),
    s2: () =>
      dn(
        Rs("mushroom"),
        je("g", "#c4a2ff"),
        `<path d="M8 41Q10 24 26 24Q42 24 44 41Q34 36 26 36Q18 36 8 41Z" fill="#7c3aed" stroke="#070b16" stroke-width="1.6" stroke-linejoin="round"/><path d="M17 41V51Q17 56 26 56Q35 56 35 51V41" fill="#f3e7d0" stroke="#070b16" stroke-width="1.5" stroke-linejoin="round"/><g fill="#c4b5fd"><circle cx="44" cy="30" r="2.3"/><circle cx="50" cy="25" r="1.6"/><circle cx="50" cy="36" r="1.9"/><circle cx="56" cy="31" r="2.5"/><circle cx="45" cy="43" r="1.5"/><circle cx="52" cy="45" r="2"/></g>`,
      ),
    ult: () =>
      dn(
        Rs("mushroom", !0),
        je("g", "#c4a2ff", 1),
        `<ellipse cx="32" cy="55" rx="19" ry="4.5" fill="none" stroke="#c4b5fd" stroke-width="1.5" stroke-dasharray="5 3"/><path d="M26 21v10M32 21v15M38 21v10" stroke="#c4a2ff" stroke-width="2.1" stroke-linecap="round" opacity=".8"/><path d="M18 20Q19 7 32 7Q45 7 46 20Q39 16 32 16Q25 16 18 20Z" fill="#7c3aed" stroke="#070b16" stroke-width="1.6" stroke-linejoin="round"/><circle cx="27" cy="14" r="2.2" fill="#f7efdd"/><circle cx="38" cy="13" r="1.6" fill="#f7efdd"/><path d="M32 40l-7 8h4v6h6v-6h4z" fill="#f3e7d0" stroke="#070b16" stroke-width="1.4" stroke-linejoin="round"/>`,
      ),
  },
  xB = {
    passive: () =>
      dn(
        Rs("xuesong"),
        je("g", "#7ee8c0") +
          fn("shv", 0, -20, 0, 20, [
            [0, "#eef5f2"],
            [0.55, "#aebbc2"],
            [1, "#4f626a"],
          ]),
        We("g", 36, 30, 22) +
          `<path d="M12 52L54 14A34 34 0 0 1 58 46Z" fill="#7ee8c0" fill-opacity=".22" stroke="#d9a24b" stroke-width="1.6" stroke-dasharray="4 3"/>` +
          `<g transform="translate(31 32) rotate(-40)"><path d="M-24 0H6" stroke="${xe}" stroke-width="5.2" stroke-linecap="round"/><path d="M-24 0H6" stroke="#855a34" stroke-width="2.8" stroke-linecap="round"/><rect x="4" y="-3.2" width="5" height="6.4" rx="1.2" fill="#d9a24b" stroke="${xe}" stroke-width="1"/><path d="M8 -10.5L23 -8.5Q27 0 23 8.5L8 10.5Z" fill="url(#@shv)" stroke="${xe}" stroke-width="1.5" stroke-linejoin="round"/><path d="M11 0H21" stroke="#d9a24b" stroke-width="1.4" stroke-linecap="round"/></g>` +
          `<path d="${hn(49, 17, 4.5, 0.16)}" fill="#fff6d6"/>`,
      ),
    s1: () =>
      dn(
        Rs("xuesong"),
        je("g", "#d9a24b") +
          fn("sd", 0, 36, 0, 58, [
            [0, "#e8c47a"],
            [1, "#6f5328"],
          ]),
        We("g", 32, 42, 22) +
          `<ellipse cx="32" cy="49" rx="22" ry="7.5" fill="#1b140c" stroke="#d9a24b" stroke-width="2"/><ellipse cx="32" cy="49" rx="14" ry="4.2" fill="none" stroke="#8c6d3b" stroke-width="1.3" stroke-dasharray="4 3"/>` +
          `<g fill="url(#@sd)" stroke="${xe}" stroke-width="1"><circle cx="24" cy="24" r="3.4"/><circle cx="34" cy="17" r="4.2"/><circle cx="44" cy="25" r="3.2"/><circle cx="32" cy="28" r="2.6"/><circle cx="19" cy="34" r="2.5"/></g>` +
          `<g transform="translate(42 37) rotate(132)"><path d="M-16 0H6" stroke="${xe}" stroke-width="4.4" stroke-linecap="round"/><path d="M-16 0H6" stroke="#855a34" stroke-width="2.3" stroke-linecap="round"/><path d="M6 -8L19 -6Q22 0 19 6L6 8Z" fill="#c7d4da" stroke="${xe}" stroke-width="1.3" stroke-linejoin="round"/></g>`,
      ),
    s2: () =>
      dn(
        Rs("xuesong"),
        je("g", "#7ee8c0", 0.95),
        We("g", 32, 22, 24) +
          `<ellipse cx="32" cy="54" rx="21" ry="5.5" fill="none" stroke="#7ee8c0" stroke-width="1.8" stroke-dasharray="5 3" opacity=".85"/>` +
          `<path d="M32 54V24" stroke="${xe}" stroke-width="5.2" stroke-linecap="round"/><path d="M32 54V24" stroke="#855a34" stroke-width="2.8" stroke-linecap="round"/><path d="M26 53L32 58L38 53L36 45H28Z" fill="#c7d4da" stroke="${xe}" stroke-width="1.3" stroke-linejoin="round"/>` +
          `<path d="M12 20Q32 6 52 20Q32 34 12 20Z" fill="#17443b" fill-opacity=".85" stroke="#7ee8c0" stroke-width="2" stroke-linejoin="round"/><circle cx="32" cy="20" r="6.2" fill="#7ee8c0" stroke="${xe}" stroke-width="1.2"/><circle cx="32" cy="20" r="2.5" fill="#0d2a25"/>`,
      ),
    ult: () =>
      dn(
        Rs("xuesong", !0),
        je("g", "#ffd27a", 1),
        We("g", 32, 28, 26) +
          `<path d="M12 46Q32 10 54 24" fill="none" stroke="#ffd27a" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="4 3"/><path d="M49 18L57 24.5L47.5 27.5Z" fill="#ffd27a"/>` +
          `<g transform="translate(27 42) rotate(-22)"><path d="M-20 0H8" stroke="${xe}" stroke-width="5.2" stroke-linecap="round"/><path d="M-20 0H8" stroke="#855a34" stroke-width="2.8" stroke-linecap="round"/><path d="M7 -10L24 -7.5Q28 0 24 7.5L7 10Z" fill="#dce6ea" stroke="${xe}" stroke-width="1.5" stroke-linejoin="round"/></g>` +
          `<circle cx="40" cy="22" r="5.5" fill="#ff9f68" stroke="${xe}" stroke-width="1.4"/><path d="M33 32Q40 27 47 32" fill="none" stroke="#ff9f68" stroke-width="3.2" stroke-linecap="round"/>` +
          `<path d="${hn(40, 14, 4, 0.16)}" fill="#fff6d6"/>`,
      ),
  },
  stB = {
    passive: () =>
      dn(
        Rs("stone"),
        je("g", "#ffcf66"),
        We("g", 32, 32, 24) +
          `<path d="M14 38Q14 14 32 14Q50 14 50 38Z" fill="#e8b93c" stroke="${xe}" stroke-width="2" stroke-linejoin="round"/>` +
          `<path d="M29 14H35V35H29Z" fill="#ffd977" stroke="${xe}" stroke-width="1.2"/>` +
          `<path d="M10 38H54Q55 43 49 44H15Q9 43 10 38Z" fill="#c79524" stroke="${xe}" stroke-width="1.8" stroke-linejoin="round"/>` +
          `<path d="${hn(44, 22, 4.5, 0.16)}" fill="#fff8d6"/>`,
      ),
    s1: () =>
      dn(
        Rs("stone"),
        je("g", "#e8b93c"),
        We("g", 32, 34, 24) +
          `<ellipse cx="32" cy="50" rx="20" ry="6" fill="none" stroke="#ffcf66" stroke-width="1.8" stroke-dasharray="4 3"/>` +
          `<path d="M16 32H48" stroke="${xe}" stroke-width="6.5" stroke-linecap="round"/><path d="M16 32H48" stroke="#c8c2b8" stroke-width="3.2" stroke-linecap="round"/>` +
          `<rect x="11" y="21" width="8" height="22" rx="2.5" fill="#7c776e" stroke="${xe}" stroke-width="1.6"/>` +
          `<rect x="45" y="21" width="8" height="22" rx="2.5" fill="#7c776e" stroke="${xe}" stroke-width="1.6"/>` +
          `<path d="M32 11L37 19H34V25H30V19H27Z" fill="#ffcf66" stroke="${xe}" stroke-width="1.2" stroke-linejoin="round"/>`,
      ),
    s2: () =>
      dn(
        Rs("stone"),
        je("g", "#ffcf66"),
        We("g", 32, 30, 24) +
          `<path d="M12 46Q30 12 52 24" fill="none" stroke="#ffcf66" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="4 3"/><path d="M47 18L55 24.5L46 27.5Z" fill="#ffcf66"/>` +
          `<circle cx="24" cy="36" r="11" fill="#8b857a" stroke="${xe}" stroke-width="1.8"/>` +
          `<path d="M19 33L29 39M29 33L19 39" stroke="#e8b93c" stroke-width="2.2" stroke-linecap="round"/>` +
          `<circle cx="44" cy="34" r="6.5" fill="#d97757" stroke="${xe}" stroke-width="1.5"/>`,
      ),
    ult: () =>
      dn(
        Rs("stone", !0),
        je("g", "#ffcf66", 1),
        We("g", 32, 30, 26) +
          `<ellipse cx="32" cy="51" rx="22" ry="6.5" fill="#2d2722" stroke="#ffcf66" stroke-width="2"/>` +
          `<path d="M22 14Q32 6 42 14L46 32Q32 41 18 32Z" fill="#8e887d" stroke="${xe}" stroke-width="1.8" stroke-linejoin="round"/>` +
          `<path d="M24 14Q32 9 40 14L38 19H26Z" fill="#e8b93c" stroke="${xe}" stroke-width="1.2"/>` +
          `<path d="M32 37V48M25 43L32 50L39 43" fill="none" stroke="#ffcf66" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`,
      ),
  },
  scB = {
    passive: () =>
      dn(
        Rs("scallion"),
        je("g", "#6bff78"),
        We("g", 32, 32, 24) +
          `<path d="M16 44Q24 22 46 14Q34 26 42 30Q30 34 38 42Q24 40 16 44Z" fill="#6bff78" stroke="${xe}" stroke-width="1.8" stroke-linejoin="round"/>` +
          `<path d="M12 49H44M16 54H38" stroke="#eef7e6" stroke-width="2.4" stroke-linecap="round"/>`,
      ),
    s1: () =>
      dn(
        Rs("scallion"),
        je("g", "#a6f052"),
        We("g", 32, 32, 24) +
          `<path d="M12 48L44 16L52 24L20 52Z" fill="#2ea843" stroke="${xe}" stroke-width="1.8" stroke-linejoin="round"/>` +
          `<path d="M18 42L44 16" stroke="#c8ff8c" stroke-width="3" stroke-linecap="round"/>` +
          `<path d="M40 34L52 46M52 34L40 46" stroke="#ffcf66" stroke-width="2.4" stroke-linecap="round"/>`,
      ),
    s2: () =>
      dn(
        Rs("scallion"),
        je("g", "#6bff78"),
        We("g", 32, 32, 25) +
          `<circle cx="32" cy="32" r="18" fill="none" stroke="#a6f052" stroke-width="2.2" stroke-dasharray="5 3"/>` +
          `<path d="M32 10V54M10 32H54" stroke="#6bff78" stroke-width="2.2" stroke-linecap="round"/>` +
          `<path d="M32 18L39 32L32 46L25 32Z" fill="#eef7e6" stroke="${xe}" stroke-width="1.6" stroke-linejoin="round"/>`,
      ),
    ult: () =>
      dn(
        Rs("scallion", !0),
        je("g", "#6bff78", 1),
        We("g", 32, 32, 26) +
          `<path d="M10 38L54 18V38L10 46Z" fill="#2ea843" stroke="${xe}" stroke-width="1.8" stroke-linejoin="round"/>` +
          `<path d="M12 41L54 25V32L12 43Z" fill="#dcff9e"/>` +
          `<circle cx="15" cy="41" r="7" fill="#eef7e6" stroke="#2ea843" stroke-width="2"/>`,
      ),
  },
  pbB = {
    passive: () =>
      dn(
        Rs("paperboy"),
        je("g", "#c9f7ff"),
        We("g", 32, 32, 24) +
          `<circle cx="32" cy="18" r="8" fill="#eef6fc" stroke="${xe}" stroke-width="1.8"/>` +
          `<path d="M18 52L24 28H40L46 52H36L32 41L28 52Z" fill="#dceaf5" stroke="${xe}" stroke-width="1.8" stroke-linejoin="round"/>` +
          `<path d="M29 20H35" stroke="#e84a5f" stroke-width="2.2" stroke-linecap="round"/>` +
          `<path d="M22 36L42 28M24 44L40 38" stroke="#e84a5f" stroke-width="1.6" stroke-dasharray="3 2"/>`,
      ),
    s1: () =>
      dn(
        Rs("paperboy"),
        je("g", "#e84a5f"),
        We("g", 32, 32, 24) +
          `<path d="M12 46L36 26L48 14L52 28L38 34L16 50Z" fill="#f0c85c" stroke="${xe}" stroke-width="1.8" stroke-linejoin="round"/>` +
          `<ellipse cx="48" cy="21" rx="4.5" ry="9" transform="rotate(-32 48 21)" fill="#e84a5f" stroke="${xe}" stroke-width="1.6"/>` +
          `<path d="M18 18Q28 12 36 16M14 26Q22 22 28 24" fill="none" stroke="#c9f7ff" stroke-width="2.2" stroke-linecap="round"/>`,
      ),
    s2: () =>
      dn(
        Rs("paperboy"),
        je("g", "#c9f7ff"),
        We("g", 32, 32, 24) +
          `<path d="M10 38L30 28L22 14L40 24L54 16L42 36L48 50L30 38Z" fill="#f5fbff" stroke="${xe}" stroke-width="1.8" stroke-linejoin="round"/>` +
          `<path d="M30 28L42 36M22 14L30 38" stroke="#8fb8d6" stroke-width="1.4"/>` +
          `<circle cx="48" cy="20" r="2.2" fill="#e84a5f"/>`,
      ),
    ult: () =>
      dn(
        Rs("paperboy", !0),
        je("g", "#e84a5f", 1),
        We("g", 32, 32, 25) +
          `<circle cx="18" cy="38" r="8" fill="#dceaf5" stroke="${xe}" stroke-width="1.8"/>` +
          `<circle cx="46" cy="26" r="8" fill="#c9f7ff" stroke="${xe}" stroke-width="1.8"/>` +
          `<path d="M25 35Q32 24 39 29" fill="none" stroke="#e84a5f" stroke-width="3.2" stroke-linecap="round"/>` +
          `<circle cx="46" cy="26" r="2.6" fill="#e84a5f"/>`,
      ),
  },
  mgB = {
    passive: () =>
      dn(
        Rs("maggot"),
        je("g", "#b8e04b"),
        We("g", 32, 32, 24) +
          `<path d="M16 48C16 38 48 38 48 48Z" fill="#7a5226" stroke="${xe}" stroke-width="1.8" stroke-linejoin="round"/>` +
          `<path d="M21 39C21 31 43 31 43 39Z" fill="#946430" stroke="${xe}" stroke-width="1.8" stroke-linejoin="round"/>` +
          `<path d="M27 31C27 25 37 25 37 31Z" fill="#f5c842" stroke="${xe}" stroke-width="1.6" stroke-linejoin="round"/>` +
          `<path d="M24 20Q28 14 24 10M34 18Q38 12 34 8M42 22Q46 16 42 12" fill="none" stroke="#b8e04b" stroke-width="2.2" stroke-linecap="round"/>`,
      ),
    s1: () =>
      dn(
        Rs("maggot"),
        je("g", "#b8e04b"),
        We("g", 32, 32, 24) +
          `<path d="M10 34L48 16L52 48Z" fill="#7a5226" fill-opacity="0.72" stroke="${xe}" stroke-width="1.8" stroke-linejoin="round"/>` +
          `<circle cx="30" cy="32" r="4" fill="#b8e04b" stroke="${xe}" stroke-width="1.4"/>` +
          `<circle cx="42" cy="24" r="3.5" fill="#946430" stroke="${xe}" stroke-width="1.4"/>` +
          `<circle cx="44" cy="39" r="4.2" fill="#f5c842" stroke="${xe}" stroke-width="1.4"/>`,
      ),
    s2: () =>
      dn(
        Rs("maggot"),
        je("g", "#f5c842"),
        We("g", 32, 32, 24) +
          `<circle cx="32" cy="32" r="18" fill="none" stroke="#f5c842" stroke-width="2.6" stroke-dasharray="6 4"/>` +
          `<circle cx="32" cy="32" r="10" fill="#f5c842" stroke="${xe}" stroke-width="1.8"/>` +
          `<path d="M12 18L24 26M52 18L40 26M12 46L24 38M52 46L40 38" stroke="#b8e04b" stroke-width="2.4" stroke-linecap="round"/>`,
      ),
    ult: () =>
      dn(
        Rs("maggot", !0),
        je("g", "#f5c842", 1),
        We("g", 32, 32, 25) +
          `<path d="M12 46Q26 10 46 26" fill="none" stroke="#b8e04b" stroke-width="3" stroke-linecap="round"/>` +
          `<circle cx="46" cy="30" r="10" fill="#7a5226" stroke="${xe}" stroke-width="1.8"/>` +
          `<path d="M40 30C40 24 52 24 52 30Z" fill="#f5c842"/>` +
          `<path d="M36 46H54" stroke="#f5c842" stroke-width="2.8" stroke-linecap="round"/>`,
      ),
  },
  hmB = {
    passive: () =>
      dn(
        Rs("horseman"),
        je("g", "#ffae3d"),
        We("g", 32, 32, 24) +
          `<path d="M10 40H26M14 31H30M10 22H24" stroke="#ffe08a" stroke-width="2.8" stroke-linecap="round"/>` +
          `<path d="M26 24L48 20L52 36L36 46L24 38Z" fill="#c46c2d" stroke="${xe}" stroke-width="1.8" stroke-linejoin="round"/>` +
          `<path d="M42 20L54 28L46 38" fill="none" stroke="#ffe08a" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`,
      ),
    s1: () =>
      dn(
        Rs("horseman"),
        je("g", "#ffae3d"),
        We("g", 32, 32, 24) +
          `<path d="M14 44L34 26L46 30L30 48Z" fill="#c46c2d" stroke="${xe}" stroke-width="1.8" stroke-linejoin="round"/>` +
          `<path d="M36 24L48 16L52 26L42 32Z" fill="#4f2a14" stroke="${xe}" stroke-width="1.8" stroke-linejoin="round"/>` +
          `<path d="M44 12L54 10M50 20L58 18M48 30L56 34" stroke="#ffe08a" stroke-width="2.6" stroke-linecap="round"/>`,
      ),
    s2: () =>
      dn(
        Rs("horseman"),
        je("g", "#ffe08a"),
        We("g", 32, 32, 24) +
          `<circle cx="32" cy="32" r="9" fill="#c46c2d" stroke="${xe}" stroke-width="1.8"/>` +
          `<circle cx="32" cy="32" r="16" fill="none" stroke="#ffae3d" stroke-width="2.6" stroke-dasharray="6 4"/>` +
          `<circle cx="32" cy="32" r="23" fill="none" stroke="#ffe08a" stroke-width="2" stroke-dasharray="5 5" opacity=".85"/>`,
      ),
    ult: () =>
      dn(
        Rs("horseman", !0),
        je("g", "#ffae3d", 1),
        We("g", 32, 32, 25) +
          `<path d="M12 46L26 20L36 32L52 14" fill="none" stroke="#ffe08a" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>` +
          `<path d="M42 14H52V24" fill="none" stroke="#ffe08a" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>` +
          `<path d="M14 48H50" stroke="#ffae3d" stroke-width="2.8" stroke-linecap="round"/>`,
      ),
  },
  cwB = {
    passive: () =>
      dn(
        Rs("cow"),
        je("g", "#ff9b38"),
        We("g", 32, 32, 24) +
          `<rect x="24" y="34" width="16" height="16" rx="2" fill="#4d2712" stroke="${xe}" stroke-width="1.8"/>` +
          `<path d="M12 46L26 18L44 26L52 44" fill="none" stroke="#ffdf78" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>` +
          `<ellipse cx="52" cy="46" rx="6" ry="3.5" fill="#b85c28" stroke="${xe}" stroke-width="1.6"/>`,
      ),
    s1: () =>
      dn(
        Rs("cow"),
        je("g", "#ff9b38"),
        We("g", 32, 32, 24) +
          `<path d="M18 22H46" stroke="#ffdf78" stroke-width="3.6" stroke-linecap="round"/>` +
          `<rect x="12" y="16" width="6" height="12" rx="2" fill="#b85c28" stroke="${xe}" stroke-width="1.6"/>` +
          `<rect x="46" y="16" width="6" height="12" rx="2" fill="#b85c28" stroke="${xe}" stroke-width="1.6"/>` +
          `<path d="M24 28L18 42L24 50M40 28L46 42L40 50" fill="none" stroke="#ffdf78" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>`,
      ),
    s2: () =>
      dn(
        Rs("cow"),
        je("g", "#ffdf78"),
        We("g", 32, 32, 24) +
          `<path d="M10 38L36 26L46 32L20 46Z" fill="#b85c28" stroke="${xe}" stroke-width="1.8" stroke-linejoin="round"/>` +
          `<path d="M38 22L54 18L56 32L44 36Z" fill="#4d2712" stroke="${xe}" stroke-width="1.8" stroke-linejoin="round"/>` +
          `<path d="M10 24H24M14 18H28" stroke="#ffdf78" stroke-width="2.6" stroke-linecap="round"/>`,
      ),
    ult: () =>
      dn(
        Rs("cow", !0),
        je("g", "#ff9b38", 1),
        We("g", 32, 32, 25) +
          `<path d="M26 12H38V34L44 40H20L26 34Z" fill="#b85c28" stroke="${xe}" stroke-width="1.8" stroke-linejoin="round"/>` +
          `<path d="M10 46L22 42L32 50L42 42L54 46" fill="none" stroke="#ffdf78" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>` +
          `<path d="M16 52H48" stroke="#ff9b38" stroke-width="2.6" stroke-linecap="round"/>`,
      ),
  },
  mkB = {
    passive: () =>
      dn(
        Rs("monkey"),
        je("g", "#ffe042"),
        We("g", 32, 32, 24) +
          `<path d="M32 16C26 24 18 32 14 44C21 43 26 39 30 34C32 41 37 47 46 48C42 38 38 30 35 22C42 26 48 31 52 38C50 28 43 20 35 16Z" fill="#ffe042" stroke="${xe}" stroke-width="1.8" stroke-linejoin="round"/>` +
          `<rect x="29" y="12" width="6" height="6" rx="2" fill="#5c3614" stroke="${xe}" stroke-width="1.4"/>`,
      ),
    s1: () =>
      dn(
        Rs("monkey"),
        je("g", "#ffe042"),
        We("g", 32, 32, 24) +
          `<path d="M12 46Q22 24 38 22" fill="none" stroke="#ffae24" stroke-width="2.6" stroke-dasharray="4 3" stroke-linecap="round"/>` +
          `<path d="M38 14C34 22 28 28 24 36C31 35 35 32 39 28C41 34 45 39 52 40C49 32 45 25 42 18Z" fill="#ffe042" stroke="${xe}" stroke-width="1.8" stroke-linejoin="round"/>` +
          `<circle cx="48" cy="18" r="3" fill="#fff2a6"/>`,
      ),
    s2: () =>
      dn(
        Rs("monkey"),
        je("g", "#ffae24"),
        We("g", 32, 32, 24) +
          `<rect x="26" y="10" width="12" height="36" rx="4" fill="#b8281c" stroke="${xe}" stroke-width="1.8"/>` +
          `<rect x="24" y="10" width="16" height="7" rx="2" fill="#ffd23f" stroke="${xe}" stroke-width="1.6"/>` +
          `<rect x="24" y="39" width="16" height="7" rx="2" fill="#ffd23f" stroke="${xe}" stroke-width="1.6"/>` +
          `<path d="M12 48L22 44L32 52L42 44L52 48" fill="none" stroke="#ffe042" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
      ),
    ult: () =>
      dn(
        Rs("monkey", !0),
        je("g", "#ffe042", 1),
        We("g", 32, 32, 25) +
          `<path d="M10 46L52 14" stroke="#b8281c" stroke-width="8" stroke-linecap="round"/>` +
          `<path d="M10 46L52 14" stroke="#ffe042" stroke-width="3" stroke-linecap="round"/>` +
          `<path d="M14 26Q32 18 50 32" fill="none" stroke="#fff2a6" stroke-width="3.2" stroke-linecap="round"/>` +
          `<path d="M16 50Q34 38 54 44" fill="none" stroke="#ffae24" stroke-width="2.6" stroke-linecap="round"/>`,
      ),
  },
  slB = {
    passive: () =>
      dn(
        Rs("slime"),
        je("g", "#ffe842"),
        We("g", 32, 32, 24) +
          `<path d="M16 44C14 30 22 18 32 18C42 18 50 30 48 44C42 48 22 48 16 44Z" fill="#ffd92e" stroke="${xe}" stroke-width="1.8"/>` +
          `<path d="M24 26Q28 22 33 24" fill="none" stroke="#fffce0" stroke-width="2.6" stroke-linecap="round"/>` +
          `<path d="M10 30L18 30M13 24L20 27M54 30L46 30M51 24L44 27" stroke="#fff38a" stroke-width="2.4" stroke-linecap="round"/>`,
      ),
    s1: () =>
      dn(
        Rs("slime"),
        je("g", "#ffe842"),
        We("g", 32, 32, 24) +
          `<circle cx="32" cy="34" r="14" fill="#ffd92e" stroke="${xe}" stroke-width="1.8"/>` +
          `<circle cx="32" cy="34" r="6" fill="#ff9e1c" stroke="${xe}" stroke-width="1.4"/>` +
          `<path d="M12 16L22 24M52 16L42 24M12 50L22 42M52 50L42 42" stroke="#fff38a" stroke-width="2.6" stroke-linecap="round"/>`,
      ),
    s2: () =>
      dn(
        Rs("slime"),
        je("g", "#ffc624"),
        We("g", 32, 32, 24) +
          `<path d="M10 46Q22 34 30 30" fill="none" stroke="#fff38a" stroke-width="3.2" stroke-linecap="round"/>` +
          `<path d="M12 36Q22 28 28 26" fill="none" stroke="#ffae24" stroke-width="2.4" stroke-linecap="round"/>` +
          `<circle cx="39" cy="25" r="13" fill="#ffd92e" stroke="${xe}" stroke-width="1.8"/>` +
          `<ellipse cx="35" cy="20" rx="4.5" ry="2.6" transform="rotate(-24 35 20)" fill="#ffffff" opacity=".88"/>`,
      ),
    ult: () =>
      dn(
        Rs("slime", !0),
        je("g", "#ffe842", 1),
        We("g", 32, 32, 25) +
          `<ellipse cx="32" cy="40" rx="23" ry="11" fill="#ffd92e" stroke="${xe}" stroke-width="1.8"/>` +
          `<ellipse cx="32" cy="38" rx="15" ry="6" fill="#fff066" opacity=".85"/>` +
          `<circle cx="20" cy="30" r="3.5" fill="#fff8a8" stroke="${xe}" stroke-width="1.2"/>` +
          `<circle cx="42" cy="27" r="4.2" fill="#fff8a8" stroke="${xe}" stroke-width="1.2"/>` +
          `<circle cx="32" cy="22" r="2.8" fill="#ffffff"/>`,
      ),
  },
  XB = { panyue: $B, chijin: GB, xingli: VB, fengling: jB, yeque: qB, mushroom: mB, niumo: niumoIcons, xuesong: xB, stone: stB, scallion: scB, paperboy: pbB, maggot: mgB, horseman: hmB, cow: cwB, monkey: mkB, slime: slB };

function Ia(n, t) {
  return XB[n][t]();
}

// 离线烘焙技能图标用（tools/heroart.mjs）：把某个英雄某个槽位的图标取成 SVG 字符串。
// 和 __sfPortrait 一样，只是给导出工具留的口子，运行时用不到。
globalThis.__sfIcon = (n, t) => Ia(n, t);

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
