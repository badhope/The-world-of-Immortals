export interface Monster {
  id: string
  name: string
  type: MonsterType
  rank: MonsterRank
  description: string
  history?: string
  habitat: string[]
  stats: MonsterStats
  abilities: MonsterAbility[]
  drops: MonsterDrop[]
  behavior: MonsterBehavior
  weaknesses: string[]
  resistances: string[]
  exp: number
  dangerLevel: number
}

export type MonsterType = 
  | 'beast' | 'bird' | 'reptile' | 'insect' | 'aquatic' 
  | 'plant' | 'elemental' | 'undead' | 'demon' | 'dragon' 
  | 'divine' | 'ancient' | 'mutated'

export type MonsterRank = 
  | 'ordinary' | 'elite' | 'rare' | 'boss' | 'legendary' 
  | 'mythic' | 'divine' | 'ancient'

export interface MonsterStats {
  health: number
  attack: number
  defense: number
  speed: number
  spirit: number
  critRate: number
  critDamage: number
}

export interface MonsterAbility {
  id: string
  name: string
  type: 'attack' | 'defense' | 'support' | 'passive' | 'ultimate'
  description: string
  damage?: number
  effects?: AbilityEffect[]
  cooldown?: number
  triggerCondition?: string
}

export interface AbilityEffect {
  type: 'damage' | 'heal' | 'buff' | 'debuff' | 'special'
  target: string
  value: number
  duration?: number
  description: string
}

export interface MonsterDrop {
  itemId: string
  itemName: string
  dropRate: number
  minQuantity: number
  maxQuantity: number
  condition?: string
}

export interface MonsterBehavior {
  aggression: 'passive' | 'neutral' | 'aggressive' | 'territorial'
  intelligence: number
  socialBehavior: 'solitary' | 'pack' | 'hive' | 'tribal'
  activityTime: 'diurnal' | 'nocturnal' | 'crepuscular' | 'always'
  specialTriggers?: string[]
}

export interface BeastGroup {
  id: string
  name: string
  description: string
  monsters: string[]
  territory: string
  leader?: string
  behavior: string
}

export interface BossMonster extends Monster {
  rank: 'boss' | 'legendary' | 'mythic' | 'divine' | 'ancient'
  phases: BossPhase[]
  specialMechanics: string[]
  lore: string
  spawnConditions: string[]
  respawnTime: number
}

export interface BossPhase {
  phase: number
  healthThreshold: number
  abilities: string[]
  behavior: string
  specialMechanics: string[]
}

export const monsters: Monster[] = [
  {
    id: 'monster_spirit_wolf',
    name: '灵狼',
    type: 'beast',
    rank: 'ordinary',
    description: '吸收了灵气的狼，比普通狼更加凶猛。灵狼通常成群出没，是炼气期修士最常见的猎物。',
    history: '灵狼是青云大陆最常见的妖兽之一。据说在上古时期，灵狼只是普通的狼，但因为长期生活在灵气充沛的环境中，逐渐进化成了灵狼。',
    habitat: ['region_central_plains', 'region_northern_wasteland', 'region_southern_jungle'],
    stats: {
      health: 200,
      attack: 30,
      defense: 15,
      speed: 40,
      spirit: 20,
      critRate: 5,
      critDamage: 50
    },
    abilities: [
      {
        id: 'ability_bite',
        name: '撕咬',
        type: 'attack',
        description: '用锋利的牙齿撕咬敌人',
        damage: 30,
        cooldown: 2
      },
      {
        id: 'ability_howl',
        name: '嚎叫',
        type: 'support',
        description: '发出嚎叫，召唤同伴',
        effects: [
          { type: 'special', target: 'self', value: 0, description: '召唤1-3只灵狼' }
        ],
        cooldown: 30,
        triggerCondition: '生命值低于50%'
      }
    ],
    drops: [
      { itemId: 'item_spirit_wolf_fang', itemName: '灵狼獠牙', dropRate: 0.3, minQuantity: 1, maxQuantity: 2 },
      { itemId: 'item_spirit_wolf_pelt', itemName: '灵狼皮毛', dropRate: 0.2, minQuantity: 1, maxQuantity: 1 },
      { itemId: 'item_spirit_stone_low', itemName: '下品灵石', dropRate: 0.1, minQuantity: 1, maxQuantity: 3 }
    ],
    behavior: {
      aggression: 'aggressive',
      intelligence: 30,
      socialBehavior: 'pack',
      activityTime: 'nocturnal'
    },
    weaknesses: ['火', '雷'],
    resistances: ['风'],
    exp: 50,
    dangerLevel: 1
  },
  {
    id: 'monster_iron_beak_eagle',
    name: '铁喙鹰',
    type: 'bird',
    rank: 'ordinary',
    description: '拥有钢铁般坚硬喙部的猛禽，飞行速度极快，攻击力惊人。',
    history: '铁喙鹰是青云大陆最常见的飞行妖兽之一。据说铁喙鹰的喙比钢铁还要坚硬，可以轻易啄穿岩石。',
    habitat: ['region_central_plains', 'region_northern_wasteland', 'region_qingyun_mountain'],
    stats: {
      health: 150,
      attack: 40,
      defense: 10,
      speed: 60,
      spirit: 25,
      critRate: 10,
      critDamage: 100
    },
    abilities: [
      {
        id: 'ability_dive',
        name: '俯冲攻击',
        type: 'attack',
        description: '从高空俯冲攻击敌人',
        damage: 50,
        cooldown: 5
      },
      {
        id: 'ability_wind_blade',
        name: '风刃',
        type: 'attack',
        description: '挥动翅膀发出风刃',
        damage: 25,
        cooldown: 3
      }
    ],
    drops: [
      { itemId: 'item_iron_beak', itemName: '铁喙', dropRate: 0.2, minQuantity: 1, maxQuantity: 1 },
      { itemId: 'item_eagle_feather', itemName: '鹰羽', dropRate: 0.3, minQuantity: 1, maxQuantity: 3 },
      { itemId: 'item_spirit_stone_low', itemName: '下品灵石', dropRate: 0.1, minQuantity: 1, maxQuantity: 2 }
    ],
    behavior: {
      aggression: 'territorial',
      intelligence: 40,
      socialBehavior: 'solitary',
      activityTime: 'diurnal'
    },
    weaknesses: ['雷', '冰'],
    resistances: ['风'],
    exp: 60,
    dangerLevel: 1
  },
  {
    id: 'monster_spirit_python',
    name: '灵蟒',
    type: 'reptile',
    rank: 'elite',
    description: '巨大的蟒蛇，吸收了灵气后体型更加庞大，力量惊人。灵蟒可以缠绕敌人，使其窒息。',
    history: '灵蟒是青云大陆最常见的爬行类妖兽之一。据说灵蟒可以活数百年，体型可以长到数十丈长。',
    habitat: ['region_southern_jungle', 'region_eastern_sea'],
    stats: {
      health: 500,
      attack: 50,
      defense: 30,
      speed: 25,
      spirit: 35,
      critRate: 5,
      critDamage: 50
    },
    abilities: [
      {
        id: 'ability_constrict',
        name: '缠绕',
        type: 'attack',
        description: '用巨大的身体缠绕敌人',
        damage: 40,
        effects: [
          { type: 'debuff', target: 'enemy', value: 50, duration: 3, description: '移动速度降低50%' }
        ],
        cooldown: 5
      },
      {
        id: 'ability_venom',
        name: '毒液',
        type: 'attack',
        description: '喷射毒液',
        damage: 30,
        effects: [
          { type: 'debuff', target: 'enemy', value: 10, duration: 5, description: '每秒受到10点毒伤害' }
        ],
        cooldown: 10
      }
    ],
    drops: [
      { itemId: 'item_python_skin', itemName: '灵蟒皮', dropRate: 0.3, minQuantity: 1, maxQuantity: 2 },
      { itemId: 'item_python_gall', itemName: '灵蟒胆', dropRate: 0.1, minQuantity: 1, maxQuantity: 1 },
      { itemId: 'item_spirit_stone_low', itemName: '下品灵石', dropRate: 0.2, minQuantity: 2, maxQuantity: 5 }
    ],
    behavior: {
      aggression: 'aggressive',
      intelligence: 35,
      socialBehavior: 'solitary',
      activityTime: 'nocturnal'
    },
    weaknesses: ['火', '冰'],
    resistances: ['水', '毒'],
    exp: 150,
    dangerLevel: 2
  },
  {
    id: 'monster_corrupted_cultivator',
    name: '堕落修士',
    type: 'demon',
    rank: 'elite',
    description: '走火入魔或被魔道功法侵蚀的修士，失去了理智，只知道杀戮。堕落修士保留了生前的部分修为，非常危险。',
    history: '堕落修士是修仙界的悲剧。他们或是因为走火入魔，或是因为修炼魔道功法，最终失去了理智，成为了只知道杀戮的怪物。',
    habitat: ['region_demon_domain', 'region_northern_wasteland'],
    stats: {
      health: 400,
      attack: 60,
      defense: 25,
      speed: 35,
      spirit: 80,
      critRate: 10,
      critDamage: 100
    },
    abilities: [
      {
        id: 'ability_dark_strike',
        name: '暗影一击',
        type: 'attack',
        description: '凝聚黑暗之力攻击敌人',
        damage: 60,
        cooldown: 3
      },
      {
        id: 'ability_blood_sacrifice',
        name: '血祭',
        type: 'attack',
        description: '以自身血液为代价发动强力攻击',
        damage: 100,
        effects: [
          { type: 'damage', target: 'self', value: 50, description: '自身受到50点伤害' }
        ],
        cooldown: 10
      }
    ],
    drops: [
      { itemId: 'item_corrupted_core', itemName: '堕落核心', dropRate: 0.1, minQuantity: 1, maxQuantity: 1 },
      { itemId: 'item_spirit_stone_low', itemName: '下品灵石', dropRate: 0.3, minQuantity: 3, maxQuantity: 10 },
      { itemId: 'item_spirit_stone_mid', itemName: '中品灵石', dropRate: 0.05, minQuantity: 1, maxQuantity: 2 }
    ],
    behavior: {
      aggression: 'aggressive',
      intelligence: 50,
      socialBehavior: 'solitary',
      activityTime: 'always'
    },
    weaknesses: ['光', '雷'],
    resistances: ['暗', '毒'],
    exp: 200,
    dangerLevel: 3
  },
  {
    id: 'monster_flame_tiger',
    name: '烈焰虎',
    type: 'beast',
    rank: 'elite',
    description: '浑身燃烧着火焰的猛虎，是火属性妖兽中的强者。烈焰虎的火焰可以融化岩石，非常危险。',
    history: '烈焰虎是火属性妖兽中的强者。据说烈焰虎是由上古火神的后裔，拥有操控火焰的能力。',
    habitat: ['region_western_desert', 'region_volcanic'],
    stats: {
      health: 600,
      attack: 70,
      defense: 35,
      speed: 45,
      spirit: 50,
      critRate: 15,
      critDamage: 150
    },
    abilities: [
      {
        id: 'ability_flame_breath',
        name: '烈焰吐息',
        type: 'attack',
        description: '喷出烈焰攻击敌人',
        damage: 80,
        effects: [
          { type: 'debuff', target: 'enemy', value: 15, duration: 3, description: '每秒受到15点火焰伤害' }
        ],
        cooldown: 5
      },
      {
        id: 'ability_flame_armor',
        name: '烈焰护甲',
        type: 'defense',
        description: '在身体周围形成火焰护甲',
        effects: [
          { type: 'buff', target: 'self', value: 30, duration: 10, description: '防御提升30点' },
          { type: 'special', target: 'attacker', value: 20, description: '攻击者受到20点火焰伤害' }
        ],
        cooldown: 20
      }
    ],
    drops: [
      { itemId: 'item_flame_tiger_fang', itemName: '烈焰虎獠牙', dropRate: 0.2, minQuantity: 1, maxQuantity: 2 },
      { itemId: 'item_flame_tiger_pelt', itemName: '烈焰虎皮', dropRate: 0.15, minQuantity: 1, maxQuantity: 1 },
      { itemId: 'item_fire_essence', itemName: '火精', dropRate: 0.05, minQuantity: 1, maxQuantity: 1 },
      { itemId: 'item_spirit_stone_mid', itemName: '中品灵石', dropRate: 0.1, minQuantity: 1, maxQuantity: 3 }
    ],
    behavior: {
      aggression: 'territorial',
      intelligence: 45,
      socialBehavior: 'solitary',
      activityTime: 'diurnal'
    },
    weaknesses: ['水', '冰'],
    resistances: ['火'],
    exp: 300,
    dangerLevel: 3
  },
  {
    id: 'monster_ice_serpent',
    name: '寒冰蛇',
    type: 'reptile',
    rank: 'elite',
    description: '生活在极寒之地的蛇类妖兽，浑身散发着寒气。寒冰蛇的攻击可以冻结敌人，非常危险。',
    history: '寒冰蛇是冰属性妖兽中的强者。据说寒冰蛇是由上古冰神的后裔，拥有操控寒冰的能力。',
    habitat: ['region_northern_wasteland', 'region_frozen_sea'],
    stats: {
      health: 450,
      attack: 55,
      defense: 40,
      speed: 30,
      spirit: 60,
      critRate: 10,
      critDamage: 100
    },
    abilities: [
      {
        id: 'ability_ice_breath',
        name: '寒冰吐息',
        type: 'attack',
        description: '喷出寒气攻击敌人',
        damage: 60,
        effects: [
          { type: 'debuff', target: 'enemy', value: 30, duration: 3, description: '移动速度降低30%' },
          { type: 'special', target: 'enemy', value: 10, description: '有10%几率冻结敌人' }
        ],
        cooldown: 5
      },
      {
        id: 'ability_ice_armor',
        name: '寒冰护甲',
        type: 'defense',
        description: '在身体周围形成寒冰护甲',
        effects: [
          { type: 'buff', target: 'self', value: 50, duration: 10, description: '防御提升50点' }
        ],
        cooldown: 15
      }
    ],
    drops: [
      { itemId: 'item_ice_serpent_fang', itemName: '寒冰蛇獠牙', dropRate: 0.2, minQuantity: 1, maxQuantity: 2 },
      { itemId: 'item_ice_essence', itemName: '冰精', dropRate: 0.05, minQuantity: 1, maxQuantity: 1 },
      { itemId: 'item_spirit_stone_mid', itemName: '中品灵石', dropRate: 0.1, minQuantity: 1, maxQuantity: 3 }
    ],
    behavior: {
      aggression: 'aggressive',
      intelligence: 40,
      socialBehavior: 'solitary',
      activityTime: 'always'
    },
    weaknesses: ['火', '雷'],
    resistances: ['冰', '水'],
    exp: 250,
    dangerLevel: 3
  },
  {
    id: 'monster_thunder_eagle',
    name: '雷鹰',
    type: 'bird',
    rank: 'rare',
    description: '拥有雷电之力的猛禽，飞行速度极快，攻击带有雷电效果。雷鹰是筑基期修士的常见猎物。',
    history: '雷鹰是雷属性妖兽中的强者。据说雷鹰是由上古雷神的后裔，拥有操控雷电的能力。',
    habitat: ['region_qingyun_mountain', 'region_northern_wasteland'],
    stats: {
      health: 800,
      attack: 90,
      defense: 40,
      speed: 80,
      spirit: 100,
      critRate: 20,
      critDamage: 200
    },
    abilities: [
      {
        id: 'ability_thunder_strike',
        name: '雷霆一击',
        type: 'attack',
        description: '召唤雷电攻击敌人',
        damage: 120,
        effects: [
          { type: 'debuff', target: 'enemy', value: 20, duration: 2, description: '麻痹2秒' }
        ],
        cooldown: 8
      },
      {
        id: 'ability_thunder_storm',
        name: '雷暴',
        type: 'ultimate',
        description: '召唤雷暴攻击范围内的所有敌人',
        damage: 80,
        effects: [
          { type: 'special', target: 'area', value: 50, description: '范围伤害' }
        ],
        cooldown: 30
      }
    ],
    drops: [
      { itemId: 'item_thunder_feather', itemName: '雷羽', dropRate: 0.3, minQuantity: 1, maxQuantity: 3 },
      { itemId: 'item_thunder_essence', itemName: '雷精', dropRate: 0.1, minQuantity: 1, maxQuantity: 1 },
      { itemId: 'item_spirit_stone_mid', itemName: '中品灵石', dropRate: 0.2, minQuantity: 2, maxQuantity: 5 }
    ],
    behavior: {
      aggression: 'territorial',
      intelligence: 60,
      socialBehavior: 'solitary',
      activityTime: 'diurnal'
    },
    weaknesses: ['土'],
    resistances: ['雷', '风'],
    exp: 500,
    dangerLevel: 4
  },
  {
    id: 'monster_blood_demon_beast',
    name: '血魔兽',
    type: 'demon',
    rank: 'rare',
    description: '由血魔宗培育的妖兽，浑身散发着血腥气息。血魔兽拥有强大的恢复能力，非常难以杀死。',
    history: '血魔兽是血魔宗培育的特殊妖兽。据说血魔宗用禁术将妖兽与血魔功法融合，创造出了这种可怕的生物。',
    habitat: ['region_demon_domain'],
    stats: {
      health: 1000,
      attack: 80,
      defense: 50,
      speed: 50,
      spirit: 120,
      critRate: 15,
      critDamage: 150
    },
    abilities: [
      {
        id: 'ability_blood_frenzy',
        name: '血之狂暴',
        type: 'attack',
        description: '进入狂暴状态，攻击力大幅提升',
        effects: [
          { type: 'buff', target: 'self', value: 50, duration: 10, description: '攻击力提升50%' },
          { type: 'debuff', target: 'self', value: 10, duration: 10, description: '每秒损失10点生命值' }
        ],
        cooldown: 20
      },
      {
        id: 'ability_blood_drain',
        name: '吸血',
        type: 'attack',
        description: '吸取敌人的血液恢复自身',
        damage: 60,
        effects: [
          { type: 'heal', target: 'self', value: 30, description: '恢复30点生命值' }
        ],
        cooldown: 5
      },
      {
        id: 'ability_regeneration',
        name: '再生',
        type: 'passive',
        description: '快速恢复生命值',
        effects: [
          { type: 'heal', target: 'self', value: 20, description: '每秒恢复20点生命值' }
        ],
        triggerCondition: '被动'
      }
    ],
    drops: [
      { itemId: 'item_blood_essence', itemName: '血精', dropRate: 0.2, minQuantity: 1, maxQuantity: 2 },
      { itemId: 'item_blood_demon_core', itemName: '血魔核心', dropRate: 0.05, minQuantity: 1, maxQuantity: 1 },
      { itemId: 'item_spirit_stone_mid', itemName: '中品灵石', dropRate: 0.3, minQuantity: 3, maxQuantity: 8 }
    ],
    behavior: {
      aggression: 'aggressive',
      intelligence: 55,
      socialBehavior: 'pack',
      activityTime: 'always'
    },
    weaknesses: ['光', '火'],
    resistances: ['暗', '毒'],
    exp: 600,
    dangerLevel: 4
  },
  {
    id: 'monster_azure_dragon',
    name: '青龙',
    type: 'dragon',
    rank: 'legendary',
    description: '上古神兽青龙的后裔，拥有强大的龙族血脉。青龙是青云大陆最强大的妖兽之一，只有元婴期以上的修士才能与之抗衡。',
    history: '青龙是上古四神兽之一，据说在上古时期曾守护着青云大陆。如今的青龙虽然不如上古时期强大，但仍然是顶级的妖兽。',
    habitat: ['region_qingyun_mountain', 'region_eastern_sea'],
    stats: {
      health: 5000,
      attack: 200,
      defense: 150,
      speed: 100,
      spirit: 300,
      critRate: 25,
      critDamage: 300
    },
    abilities: [
      {
        id: 'ability_dragon_breath',
        name: '龙息',
        type: 'attack',
        description: '喷出龙息攻击敌人',
        damage: 300,
        effects: [
          { type: 'special', target: 'area', value: 100, description: '范围伤害' }
        ],
        cooldown: 10
      },
      {
        id: 'ability_dragon_roar',
        name: '龙吟',
        type: 'support',
        description: '发出龙吟，震慑敌人',
        effects: [
          { type: 'debuff', target: 'enemy', value: 50, duration: 5, description: '所有属性降低50%' }
        ],
        cooldown: 30
      },
      {
        id: 'ability_dragon_scales',
        name: '龙鳞护体',
        type: 'passive',
        description: '龙鳞提供强大的防护',
        effects: [
          { type: 'buff', target: 'self', value: 50, description: '受到的伤害降低50%' }
        ],
        triggerCondition: '被动'
      }
    ],
    drops: [
      { itemId: 'item_dragon_scale', itemName: '龙鳞', dropRate: 0.5, minQuantity: 1, maxQuantity: 3 },
      { itemId: 'item_dragon_blood', itemName: '龙血', dropRate: 0.3, minQuantity: 1, maxQuantity: 2 },
      { itemId: 'item_dragon_core', itemName: '龙核', dropRate: 0.1, minQuantity: 1, maxQuantity: 1 },
      { itemId: 'item_spirit_stone_high', itemName: '上品灵石', dropRate: 0.5, minQuantity: 5, maxQuantity: 20 }
    ],
    behavior: {
      aggression: 'territorial',
      intelligence: 90,
      socialBehavior: 'solitary',
      activityTime: 'always'
    },
    weaknesses: [],
    resistances: ['火', '水', '风', '雷'],
    exp: 5000,
    dangerLevel: 8
  },
  {
    id: 'monster_white_tiger',
    name: '白虎',
    type: 'beast',
    rank: 'legendary',
    description: '上古神兽白虎的后裔，拥有强大的杀伐之力。白虎是青云大陆最强大的妖兽之一，只有元婴期以上的修士才能与之抗衡。',
    history: '白虎是上古四神兽之一，据说在上古时期曾守护着青云大陆。如今的白虎虽然不如上古时期强大，但仍然是顶级的妖兽。',
    habitat: ['region_western_desert', 'region_northern_wasteland'],
    stats: {
      health: 4500,
      attack: 250,
      defense: 120,
      speed: 120,
      spirit: 250,
      critRate: 35,
      critDamage: 400
    },
    abilities: [
      {
        id: 'ability_tiger_roar',
        name: '虎啸',
        type: 'attack',
        description: '发出虎啸，震慑敌人',
        damage: 200,
        effects: [
          { type: 'debuff', target: 'enemy', value: 30, duration: 5, description: '防御降低30%' }
        ],
        cooldown: 15
      },
      {
        id: 'ability_killing_intent',
        name: '杀意',
        type: 'passive',
        description: '散发杀意，削弱敌人',
        effects: [
          { type: 'debuff', target: 'enemy', value: 20, description: '敌人所有属性降低20%' }
        ],
        triggerCondition: '被动'
      }
    ],
    drops: [
      { itemId: 'item_tiger_fang', itemName: '白虎獠牙', dropRate: 0.5, minQuantity: 1, maxQuantity: 3 },
      { itemId: 'item_tiger_blood', itemName: '白虎血', dropRate: 0.3, minQuantity: 1, maxQuantity: 2 },
      { itemId: 'item_tiger_core', itemName: '白虎核心', dropRate: 0.1, minQuantity: 1, maxQuantity: 1 },
      { itemId: 'item_spirit_stone_high', itemName: '上品灵石', dropRate: 0.5, minQuantity: 5, maxQuantity: 20 }
    ],
    behavior: {
      aggression: 'aggressive',
      intelligence: 85,
      socialBehavior: 'solitary',
      activityTime: 'always'
    },
    weaknesses: [],
    resistances: ['金', '风'],
    exp: 4500,
    dangerLevel: 8
  }
]

export const bossMonsters: BossMonster[] = [
  {
    id: 'boss_demon_lord',
    name: '魔尊·血煞',
    type: 'demon',
    rank: 'mythic',
    description: '上古魔道巨擘，曾经统领魔道势力与正道大战。如今虽然被封印，但其分身仍然拥有恐怖的力量。',
    history: '血煞魔尊是上古时期魔道势力的领袖，曾与青云仙尊大战。最终被青云仙尊封印，但据说每隔千年就会苏醒一次。',
    habitat: ['region_demon_domain'],
    stats: {
      health: 100000,
      attack: 500,
      defense: 300,
      speed: 150,
      spirit: 800,
      critRate: 30,
      critDamage: 500
    },
    abilities: [
      {
        id: 'ability_blood_sea',
        name: '血海',
        type: 'ultimate',
        description: '召唤血海淹没一切',
        damage: 1000,
        effects: [
          { type: 'special', target: 'area', value: 500, description: '大范围伤害' },
          { type: 'debuff', target: 'enemy', value: 50, duration: 10, description: '所有属性降低50%' }
        ],
        cooldown: 60
      },
      {
        id: 'ability_demon_form',
        name: '魔化',
        type: 'support',
        description: '进入魔化状态',
        effects: [
          { type: 'buff', target: 'self', value: 100, duration: 30, description: '所有属性提升100%' }
        ],
        cooldown: 120
      }
    ],
    drops: [
      { itemId: 'item_demon_lord_core', itemName: '魔尊核心', dropRate: 1, minQuantity: 1, maxQuantity: 1 },
      { itemId: 'item_blood_demon_manual', itemName: '血魔功真本', dropRate: 0.5, minQuantity: 1, maxQuantity: 1 },
      { itemId: 'item_immortal_stone', itemName: '仙石', dropRate: 0.3, minQuantity: 1, maxQuantity: 5 }
    ],
    behavior: {
      aggression: 'aggressive',
      intelligence: 100,
      socialBehavior: 'solitary',
      activityTime: 'always'
    },
    weaknesses: ['光'],
    resistances: ['暗', '毒', '血'],
    exp: 100000,
    dangerLevel: 10,
    phases: [
      {
        phase: 1,
        healthThreshold: 100,
        abilities: ['ability_blood_sea', 'ability_demon_form'],
        behavior: '正常战斗',
        specialMechanics: []
      },
      {
        phase: 2,
        healthThreshold: 50,
        abilities: ['ability_blood_sea', 'ability_demon_form', 'ability_blood_clone'],
        behavior: '召唤分身',
        specialMechanics: ['召唤血煞分身']
      },
      {
        phase: 3,
        healthThreshold: 20,
        abilities: ['ability_blood_sea', 'ability_demon_form', 'ability_blood_clone', 'ability_final_blow'],
        behavior: '狂暴状态',
        specialMechanics: ['攻击力提升200%', '防御力降低50%']
      }
    ],
    specialMechanics: ['血海领域', '魔化变身', '分身召唤'],
    lore: '血煞魔尊是上古时期魔道势力的领袖，曾与青云仙尊大战三天三夜，最终被青云仙尊以自身为代价封印。',
    spawnConditions: ['魔域封印松动', '血月之夜', '需要5名元婴期修士共同触发'],
    respawnTime: 2592000
  },
  {
    id: 'boss_ancient_dragon',
    name: '上古真龙',
    type: 'dragon',
    rank: 'ancient',
    description: '上古时期存活至今的真龙，拥有无与伦比的力量。据说上古真龙的实力堪比化神期修士。',
    history: '上古真龙是上古时期存活至今的少数真龙之一。据说它见证了青云大陆的诞生，拥有无尽的智慧和力量。',
    habitat: ['region_dragon_valley'],
    stats: {
      health: 200000,
      attack: 800,
      defense: 500,
      speed: 200,
      spirit: 1000,
      critRate: 40,
      critDamage: 600
    },
    abilities: [
      {
        id: 'ability_dragon_breath_ancient',
        name: '上古龙息',
        type: 'ultimate',
        description: '喷出上古龙息',
        damage: 2000,
        effects: [
          { type: 'special', target: 'area', value: 1000, description: '超大范围伤害' }
        ],
        cooldown: 30
      },
      {
        id: 'ability_dragon_domain',
        name: '龙域',
        type: 'support',
        description: '展开龙域',
        effects: [
          { type: 'buff', target: 'self', value: 200, duration: 60, description: '所有属性提升200%' },
          { type: 'debuff', target: 'enemy', value: 50, duration: 60, description: '所有属性降低50%' }
        ],
        cooldown: 180
      }
    ],
    drops: [
      { itemId: 'item_ancient_dragon_scale', itemName: '上古龙鳞', dropRate: 1, minQuantity: 1, maxQuantity: 5 },
      { itemId: 'item_ancient_dragon_blood', itemName: '上古龙血', dropRate: 0.8, minQuantity: 1, maxQuantity: 3 },
      { itemId: 'item_ancient_dragon_core', itemName: '上古龙核', dropRate: 0.3, minQuantity: 1, maxQuantity: 1 },
      { itemId: 'item_immortal_stone', itemName: '仙石', dropRate: 1, minQuantity: 10, maxQuantity: 50 }
    ],
    behavior: {
      aggression: 'territorial',
      intelligence: 100,
      socialBehavior: 'solitary',
      activityTime: 'always'
    },
    weaknesses: [],
    resistances: ['火', '水', '风', '雷', '冰', '土'],
    exp: 500000,
    dangerLevel: 12,
    phases: [
      {
        phase: 1,
        healthThreshold: 100,
        abilities: ['ability_dragon_breath_ancient'],
        behavior: '正常战斗',
        specialMechanics: []
      },
      {
        phase: 2,
        healthThreshold: 70,
        abilities: ['ability_dragon_breath_ancient', 'ability_dragon_domain'],
        behavior: '展开龙域',
        specialMechanics: ['龙域展开']
      },
      {
        phase: 3,
        healthThreshold: 30,
        abilities: ['ability_dragon_breath_ancient', 'ability_dragon_domain', 'ability_dragon_rage'],
        behavior: '龙之愤怒',
        specialMechanics: ['攻击力提升300%', '进入狂暴状态']
      }
    ],
    specialMechanics: ['龙域', '龙之愤怒', '上古之力'],
    lore: '上古真龙是上古时期存活至今的少数真龙之一，见证了青云大陆的诞生与变迁。',
    spawnConditions: ['龙谷深处', '需要龙族信物', '需要化神期修士才能进入'],
    respawnTime: 7776000
  }
]

export const beastGroups: BeastGroup[] = [
  {
    id: 'group_spirit_wolf_pack',
    name: '灵狼群',
    description: '一群灵狼，由一只灵狼王统领。',
    monsters: ['monster_spirit_wolf', 'monster_spirit_wolf', 'monster_spirit_wolf', 'monster_spirit_wolf_alpha'],
    territory: 'region_central_plains',
    leader: 'monster_spirit_wolf_alpha',
    behavior: '群体行动，遇到危险时会召唤同伴'
  },
  {
    id: 'group_blood_demon_squad',
    name: '血魔小队',
    description: '血魔宗培育的血魔兽小队，由血魔宗弟子控制。',
    monsters: ['monster_blood_demon_beast', 'monster_blood_demon_beast', 'monster_corrupted_cultivator'],
    territory: 'region_demon_domain',
    behavior: '由堕落修士控制，协同作战'
  }
]

export function getMonsterById(id: string): Monster | undefined {
  return monsters.find(m => m.id === id) || bossMonsters.find(b => b.id === id)
}

export function getBossById(id: string): BossMonster | undefined {
  return bossMonsters.find(b => b.id === id)
}

export function getMonstersByType(type: MonsterType): Monster[] {
  return monsters.filter(m => m.type === type)
}

export function getMonstersByRank(rank: MonsterRank): Monster[] {
  return monsters.filter(m => m.rank === rank)
}

export function getMonstersByHabitat(regionId: string): Monster[] {
  return monsters.filter(m => m.habitat.includes(regionId))
}

export function getMonstersByDangerLevel(minLevel: number, maxLevel: number): Monster[] {
  return monsters.filter(m => m.dangerLevel >= minLevel && m.dangerLevel <= maxLevel)
}

export function calculateMonsterStats(monsterId: string, levelModifier: number = 1): MonsterStats {
  const monster = getMonsterById(monsterId)
  if (!monster) return { health: 0, attack: 0, defense: 0, speed: 0, spirit: 0, critRate: 0, critDamage: 0 }
  
  return {
    health: Math.round(monster.stats.health * levelModifier),
    attack: Math.round(monster.stats.attack * levelModifier),
    defense: Math.round(monster.stats.defense * levelModifier),
    speed: Math.round(monster.stats.speed * levelModifier),
    spirit: Math.round(monster.stats.spirit * levelModifier),
    critRate: monster.stats.critRate,
    critDamage: monster.stats.critDamage
  }
}

export function generateDrops(monsterId: string, luckBonus: number = 0): { itemId: string; quantity: number }[] {
  const monster = getMonsterById(monsterId)
  if (!monster) return []
  
  const drops: { itemId: string; quantity: number }[] = []
  
  for (const drop of monster.drops) {
    const adjustedDropRate = Math.min(1, drop.dropRate + luckBonus)
    if (Math.random() < adjustedDropRate) {
      const quantity = Math.floor(Math.random() * (drop.maxQuantity - drop.minQuantity + 1)) + drop.minQuantity
      drops.push({ itemId: drop.itemId, quantity })
    }
  }
  
  return drops
}

export function calculateExp(monsterId: string, levelDifference: number = 0): number {
  const monster = getMonsterById(monsterId)
  if (!monster) return 0
  
  let exp = monster.exp
  
  if (levelDifference > 0) {
    exp *= Math.pow(0.8, levelDifference)
  } else if (levelDifference < 0) {
    exp *= Math.pow(1.2, Math.abs(levelDifference))
  }
  
  return Math.round(exp)
}

export function getBossPhase(bossId: string, currentHealthPercent: number): BossPhase | undefined {
  const boss = getBossById(bossId)
  if (!boss) return undefined
  
  for (let i = boss.phases.length - 1; i >= 0; i--) {
    if (currentHealthPercent <= boss.phases[i].healthThreshold) {
      return boss.phases[i]
    }
  }
  
  return boss.phases[0]
}

export function canSpawnBoss(bossId: string, conditions: {
  time: number
  location: string
  playerCount: number
  playerRealm: number
}): { canSpawn: boolean; reason?: string } {
  const boss = getBossById(bossId)
  if (!boss) return { canSpawn: false, reason: 'Boss不存在' }
  
  if (!boss.habitat.includes(conditions.location)) {
    return { canSpawn: false, reason: '地点不正确' }
  }
  
  return { canSpawn: true }
}
