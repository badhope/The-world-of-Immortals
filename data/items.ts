export interface Item {
  id: string
  name: string
  type: ItemType
  rank: ItemRank
  description: string
  history?: string
  effects: ItemEffect[]
  requirements: ItemRequirement
  value: number
  weight: number
  stackable: boolean
  maxStack: number
  durability?: number
  maxDurability?: number
  source: string
  dropRate?: number
}

export type ItemType = 
  | 'pill' | 'herb' | 'material' | 'ore' | 'spirit_stone' 
  | 'equipment' | 'weapon' | 'armor' | 'accessory' | 'artifact'
  | 'book' | 'manual' | 'scroll' | 'map' | 'key'
  | 'consumable' | 'quest' | 'special'

export type ItemRank = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic' | 'divine'

export interface ItemEffect {
  type: 'stat' | 'skill' | 'special' | 'passive'
  target: string
  value: number | string
  duration?: number
  description: string
}

export interface ItemRequirement {
  minRealm?: number
  minStats?: { [key: string]: number }
  requiredClass?: string[]
  requiredMethod?: string[]
}

export interface Equipment extends Item {
  type: 'equipment' | 'weapon' | 'armor' | 'accessory' | 'artifact'
  slot: EquipmentSlot
  stats: EquipmentStats
  setBonus?: SetBonus
  refine: {
    level: number
    maxLevel: number
    bonusPerLevel: EquipmentStats
  }
  socket: {
    max: number
    current: number
    gems: string[]
  }
}

export type EquipmentSlot = 
  | 'weapon' | 'offhand' | 'head' | 'body' | 'hands' 
  | 'legs' | 'feet' | 'necklace' | 'ring1' | 'ring2' 
  | 'bracelet' | 'belt' | 'artifact1' | 'artifact2'

export interface EquipmentStats {
  attack?: number
  defense?: number
  health?: number
  spirit?: number
  speed?: number
  critRate?: number
  critDamage?: number
  special?: { [key: string]: number }
}

export interface SetBonus {
  setName: string
  pieces: number
  bonuses: { pieces: number; effects: ItemEffect[] }[]
}

export interface Pill extends Item {
  type: 'pill'
  pillRank: 'mortal' | 'spirit' | 'earth' | 'heaven' | 'immortal'
  effects: PillEffect[]
  sideEffects?: string[]
  cooldown?: number
  addiction?: number
}

export interface PillEffect {
  type: 'heal' | 'restore' | 'buff' | 'breakthrough' | 'special'
  target: string
  value: number
  duration?: number
  description: string
}

export interface Herb extends Item {
  type: 'herb'
  herbAge: number
  maxAge: number
  properties: string[]
  usage: string[]
  growthConditions: {
    environment: string[]
    time: number
    care: string[]
  }
}

export interface Material extends Item {
  type: 'material' | 'ore'
  materialType: string
  quality: number
  usage: string[]
  processing: {
    method: string
    requirements: string[]
    products: string[]
  }[]
}

export interface Book extends Item {
  type: 'book' | 'manual' | 'scroll'
  contentType: 'method' | 'skill' | 'spell' | 'knowledge' | 'recipe'
  content: string
  comprehension: {
    difficulty: number
    timeRequired: number
    requirements: string[]
  }
}

export const items: Item[] = [
  {
    id: 'item_spirit_stone_low',
    name: '下品灵石',
    type: 'spirit_stone',
    rank: 'common',
    description: '最低等级的灵石，灵气稀薄，是炼气期修士的主要货币和修炼资源。',
    effects: [
      { type: 'stat', target: 'spirit', value: 10, description: '恢复10点灵力' }
    ],
    requirements: {},
    value: 1,
    weight: 0.1,
    stackable: true,
    maxStack: 9999,
    source: '灵石矿脉开采',
    dropRate: 0.3
  },
  {
    id: 'item_spirit_stone_mid',
    name: '中品灵石',
    type: 'spirit_stone',
    rank: 'uncommon',
    description: '中等等级的灵石，灵气较为充沛，是筑基期修士的主要货币和修炼资源。',
    effects: [
      { type: 'stat', target: 'spirit', value: 100, description: '恢复100点灵力' }
    ],
    requirements: {},
    value: 100,
    weight: 0.1,
    stackable: true,
    maxStack: 9999,
    source: '灵石矿脉深处开采',
    dropRate: 0.1
  },
  {
    id: 'item_spirit_stone_high',
    name: '上品灵石',
    type: 'spirit_stone',
    rank: 'rare',
    description: '高等等级的灵石，灵气浓郁，是结丹期及以上修士的主要货币和修炼资源。',
    effects: [
      { type: 'stat', target: 'spirit', value: 1000, description: '恢复1000点灵力' }
    ],
    requirements: {},
    value: 10000,
    weight: 0.1,
    stackable: true,
    maxStack: 9999,
    source: '极品灵脉开采',
    dropRate: 0.01
  },
  {
    id: 'item_foundation_pill',
    name: '筑基丹',
    type: 'pill',
    rank: 'rare',
    description: '炼气期修士突破到筑基期的必备丹药。服用后可以大幅提升筑基成功率，是所有炼气期修士梦寐以求的宝物。',
    history: '筑基丹由上古丹道大师创造，是修仙界最重要的丹药之一。据说最初的筑基丹配方来自仙界，后经无数丹道大师改良，才有了如今的版本。',
    effects: [
      { type: 'special', target: 'breakthrough', value: 'foundation', description: '筑基成功率提升30%' },
      { type: 'stat', target: 'spirit', value: 500, duration: 3600, description: '一小时内灵力恢复速度提升' }
    ],
    requirements: { minRealm: 1 },
    value: 10000,
    weight: 0.01,
    stackable: true,
    maxStack: 99,
    source: '丹霞谷炼制',
    dropRate: 0.001
  },
  {
    id: 'item_core_formation_pill',
    name: '结丹丹',
    type: 'pill',
    rank: 'epic',
    description: '筑基期修士突破到结丹期的必备丹药。服用后可以大幅提升结丹成功率，是所有筑基期修士梦寐以求的宝物。',
    history: '结丹丹由上古丹道大师创造，是修仙界最重要的丹药之一。结丹丹的炼制难度极高，只有丹道大师才能炼制。',
    effects: [
      { type: 'special', target: 'breakthrough', value: 'core_formation', description: '结丹成功率提升25%' },
      { type: 'stat', target: 'spirit', value: 2000, duration: 3600, description: '一小时内灵力恢复速度大幅提升' }
    ],
    requirements: { minRealm: 2 },
    value: 100000,
    weight: 0.01,
    stackable: true,
    maxStack: 99,
    source: '丹霞谷炼制',
    dropRate: 0.0001
  },
  {
    id: 'item_nascent_soul_pill',
    name: '凝婴丹',
    type: 'pill',
    rank: 'legendary',
    description: '结丹期修士突破到元婴期的必备丹药。服用后可以大幅提升凝婴成功率，是所有结丹期修士梦寐以求的宝物。',
    history: '凝婴丹由上古丹道大师创造，是修仙界最重要的丹药之一。凝婴丹的炼制难度极高，只有丹道宗师才能炼制。',
    effects: [
      { type: 'special', target: 'breakthrough', value: 'nascent_soul', description: '凝婴成功率提升20%' },
      { type: 'stat', target: 'spirit', value: 5000, duration: 3600, description: '一小时内灵力恢复速度极大提升' }
    ],
    requirements: { minRealm: 3 },
    value: 1000000,
    weight: 0.01,
    stackable: true,
    maxStack: 99,
    source: '丹霞谷炼制',
    dropRate: 0.00001
  },
  {
    id: 'item_healing_pill_low',
    name: '疗伤丹',
    type: 'pill',
    rank: 'common',
    description: '最基础的治疗丹药，可以快速恢复伤势。',
    effects: [
      { type: 'heal', target: 'health', value: 100, description: '恢复100点生命值' }
    ],
    requirements: {},
    value: 50,
    weight: 0.01,
    stackable: true,
    maxStack: 999,
    source: '丹药铺购买',
    dropRate: 0.2
  },
  {
    id: 'item_healing_pill_mid',
    name: '回春丹',
    type: 'pill',
    rank: 'uncommon',
    description: '中等治疗丹药，可以快速恢复较重的伤势。',
    effects: [
      { type: 'heal', target: 'health', value: 500, description: '恢复500点生命值' }
    ],
    requirements: { minRealm: 1 },
    value: 500,
    weight: 0.01,
    stackable: true,
    maxStack: 999,
    source: '丹药铺购买',
    dropRate: 0.1
  },
  {
    id: 'item_healing_pill_high',
    name: '九转还魂丹',
    type: 'pill',
    rank: 'rare',
    description: '高级治疗丹药，可以恢复重伤甚至濒死的伤势。',
    history: '九转还魂丹由上古丹道大师创造，据说可以让人起死回生。当然，这只是传说，但它的治疗效果确实惊人。',
    effects: [
      { type: 'heal', target: 'health', value: 2000, description: '恢复2000点生命值' },
      { type: 'special', target: 'revive', value: 'near_death', description: '濒死状态可救回一命' }
    ],
    requirements: { minRealm: 2 },
    value: 5000,
    weight: 0.01,
    stackable: true,
    maxStack: 99,
    source: '丹霞谷炼制',
    dropRate: 0.01
  },
  {
    id: 'item_spirit_grass_100',
    name: '百年灵草',
    type: 'herb',
    rank: 'uncommon',
    description: '生长了一百年的灵草，蕴含着较为充沛的灵气，是炼制筑基丹的重要材料。',
    effects: [
      { type: 'stat', target: 'spirit', value: 50, description: '直接服用可恢复50点灵力' }
    ],
    requirements: {},
    value: 200,
    weight: 0.1,
    stackable: true,
    maxStack: 999,
    source: '灵药园采集',
    dropRate: 0.1
  },
  {
    id: 'item_spirit_grass_500',
    name: '五百年灵草',
    type: 'herb',
    rank: 'rare',
    description: '生长了五百年的灵草，蕴含着充沛的灵气，是炼制结丹丹的重要材料。',
    effects: [
      { type: 'stat', target: 'spirit', value: 200, description: '直接服用可恢复200点灵力' }
    ],
    requirements: {},
    value: 2000,
    weight: 0.1,
    stackable: true,
    maxStack: 999,
    source: '灵药园深处采集',
    dropRate: 0.02
  },
  {
    id: 'item_spirit_grass_1000',
    name: '千年灵草',
    type: 'herb',
    rank: 'epic',
    description: '生长了一千年的灵草，蕴含着浓郁的灵气，是炼制凝婴丹的重要材料。',
    effects: [
      { type: 'stat', target: 'spirit', value: 1000, description: '直接服用可恢复1000点灵力' }
    ],
    requirements: {},
    value: 20000,
    weight: 0.1,
    stackable: true,
    maxStack: 999,
    source: '秘境采集',
    dropRate: 0.005
  },
  {
    id: 'item_iron_essence',
    name: '玄铁精',
    type: 'material',
    rank: 'uncommon',
    description: '从玄铁矿石中提炼出的精华，是炼制灵器的重要材料。',
    effects: [],
    requirements: {},
    value: 500,
    weight: 1,
    stackable: true,
    maxStack: 999,
    source: '矿脉开采提炼',
    dropRate: 0.05
  },
  {
    id: 'item_star_iron',
    name: '星辰铁',
    type: 'material',
    rank: 'rare',
    description: '从天外陨石中提炼出的珍稀材料，蕴含着星辰之力，是炼制法宝的重要材料。',
    history: '星辰铁来自天外陨石，极其稀有。据说上古时期曾有一场流星雨，带来了大量的星辰铁，但如今已经很难找到了。',
    effects: [],
    requirements: {},
    value: 5000,
    weight: 1,
    stackable: true,
    maxStack: 999,
    source: '陨石提炼',
    dropRate: 0.005
  },
  {
    id: 'item_dragon_bone',
    name: '龙骨',
    type: 'material',
    rank: 'legendary',
    description: '上古真龙的骨骼，蕴含着龙族血脉之力，是炼制仙器的珍贵材料。',
    history: '龙骨来自上古真龙的遗骸，极其稀有。据说上古时期曾有真龙陨落，其骨骼散落在青云大陆各处，但如今已经很难找到了。',
    effects: [],
    requirements: {},
    value: 100000,
    weight: 5,
    stackable: true,
    maxStack: 99,
    source: '上古遗迹',
    dropRate: 0.0001
  },
  {
    id: 'item_qingyun_manual',
    name: '青云诀残卷',
    type: 'manual',
    rank: 'legendary',
    description: '青云仙尊亲笔所写的青云诀残卷，蕴含着云之大道的至理。',
    history: '青云诀残卷是青云仙尊亲笔所写，据说完整版可以直指大道。但完整版已经失传，只剩下残卷流传于世。',
    effects: [
      { type: 'skill', target: 'method_qingyun_jue', value: 'partial', description: '可学习青云诀（残缺版）' }
    ],
    requirements: { minRealm: 1, minStats: { comprehension: 50 } },
    value: 500000,
    weight: 0.1,
    stackable: false,
    maxStack: 1,
    source: '上古遗迹',
    dropRate: 0.00001
  }
]

export const equipment: Equipment[] = [
  {
    id: 'equip_spirit_sword_low',
    name: '灵剑',
    type: 'weapon',
    rank: 'uncommon',
    description: '最基础的灵剑，蕴含着微弱的灵气，可以增幅法术威力。',
    slot: 'weapon',
    stats: { attack: 50, spirit: 20 },
    effects: [
      { type: 'passive', target: 'spell_damage', value: 10, description: '法术伤害提升10%' }
    ],
    requirements: { minRealm: 1 },
    value: 5000,
    weight: 2,
    stackable: false,
    maxStack: 1,
    durability: 100,
    maxDurability: 100,
    source: '炼器师炼制',
    dropRate: 0.05,
    refine: { level: 0, maxLevel: 10, bonusPerLevel: { attack: 5, spirit: 2 } },
    socket: { max: 1, current: 0, gems: [] }
  },
  {
    id: 'equip_qingyun_sword',
    name: '青云剑',
    type: 'weapon',
    rank: 'rare',
    description: '青云宗的制式灵剑，蕴含着青云之力，是青云宗弟子的标配武器。',
    history: '青云剑由青云宗炼器师炼制，采用青云山的特产材料，蕴含着青云之力。每一把青云剑都经过青云宗长老的加持，品质上乘。',
    slot: 'weapon',
    stats: { attack: 150, spirit: 50, critRate: 5 },
    effects: [
      { type: 'passive', target: 'spell_damage', value: 20, description: '法术伤害提升20%' },
      { type: 'passive', target: 'cloud_damage', value: 30, description: '云系法术伤害提升30%' }
    ],
    requirements: { minRealm: 2, requiredMethod: ['method_qingyun_jue'] },
    value: 50000,
    weight: 2,
    stackable: false,
    maxStack: 1,
    durability: 200,
    maxDurability: 200,
    source: '青云宗',
    dropRate: 0.01,
    refine: { level: 0, maxLevel: 15, bonusPerLevel: { attack: 10, spirit: 5 } },
    socket: { max: 2, current: 0, gems: [] },
    setBonus: {
      setName: '青云套装',
      pieces: 4,
      bonuses: [
        { pieces: 2, effects: [{ type: 'stat', target: 'spirit', value: 50, description: '灵力+50' }] },
        { pieces: 4, effects: [{ type: 'special', target: 'cloud_mastery', value: 50, description: '云系功法修炼速度+50%' }] }
      ]
    }
  },
  {
    id: 'equip_wanjian_sword',
    name: '万剑',
    type: 'weapon',
    rank: 'epic',
    description: '万剑门的镇派之宝，传说中可以分化万千剑影，威力无穷。',
    history: '万剑由万剑真人亲手炼制，采用天外陨铁和千年龙骨，历经百年方才完成。此剑蕴含着万剑真人的剑道感悟，是剑道至宝。',
    slot: 'weapon',
    stats: { attack: 500, critRate: 15, critDamage: 50 },
    effects: [
      { type: 'passive', target: 'sword_damage', value: 50, description: '剑系技能伤害提升50%' },
      { type: 'special', target: 'sword_clone', value: 'active', description: '可分化万千剑影' }
    ],
    requirements: { minRealm: 3, requiredMethod: ['method_wanjian_jue'], minStats: { strength: 100 } },
    value: 500000,
    weight: 3,
    stackable: false,
    maxStack: 1,
    durability: 500,
    maxDurability: 500,
    source: '万剑门',
    dropRate: 0.0001,
    refine: { level: 0, maxLevel: 20, bonusPerLevel: { attack: 25, critRate: 1 } },
    socket: { max: 3, current: 0, gems: [] }
  },
  {
    id: 'equip_spirit_armor_low',
    name: '灵甲',
    type: 'armor',
    rank: 'uncommon',
    description: '最基础的灵甲，蕴含着微弱的灵气，可以提供基础的防护。',
    slot: 'body',
    stats: { defense: 50, health: 100 },
    effects: [
      { type: 'passive', target: 'damage_reduction', value: 5, description: '受到的伤害降低5%' }
    ],
    requirements: { minRealm: 1 },
    value: 3000,
    weight: 5,
    stackable: false,
    maxStack: 1,
    durability: 100,
    maxDurability: 100,
    source: '炼器师炼制',
    dropRate: 0.05,
    refine: { level: 0, maxLevel: 10, bonusPerLevel: { defense: 5, health: 10 } },
    socket: { max: 1, current: 0, gems: [] }
  },
  {
    id: 'equip_qingyun_robe',
    name: '青云道袍',
    type: 'armor',
    rank: 'rare',
    description: '青云宗的制式道袍，蕴含着青云之力，可以提供优秀的防护。',
    history: '青云道袍由青云宗炼器师炼制，采用青云山的特产材料，蕴含着青云之力。每一件青云道袍都经过青云宗长老的加持，品质上乘。',
    slot: 'body',
    stats: { defense: 150, health: 300, spirit: 30 },
    effects: [
      { type: 'passive', target: 'damage_reduction', value: 10, description: '受到的伤害降低10%' },
      { type: 'passive', target: 'spirit_recovery', value: 20, description: '灵力恢复速度提升20%' }
    ],
    requirements: { minRealm: 2, requiredMethod: ['method_qingyun_jue'] },
    value: 30000,
    weight: 3,
    stackable: false,
    maxStack: 1,
    durability: 200,
    maxDurability: 200,
    source: '青云宗',
    dropRate: 0.01,
    refine: { level: 0, maxLevel: 15, bonusPerLevel: { defense: 10, health: 20, spirit: 3 } },
    socket: { max: 2, current: 0, gems: [] },
    setBonus: {
      setName: '青云套装',
      pieces: 4,
      bonuses: [
        { pieces: 2, effects: [{ type: 'stat', target: 'spirit', value: 50, description: '灵力+50' }] },
        { pieces: 4, effects: [{ type: 'special', target: 'cloud_mastery', value: 50, description: '云系功法修炼速度+50%' }] }
      ]
    }
  },
  {
    id: 'equip_spirit_ring',
    name: '灵戒',
    type: 'accessory',
    rank: 'uncommon',
    description: '最基础的灵戒，蕴含着微弱的灵气，可以小幅提升灵力。',
    slot: 'ring1',
    stats: { spirit: 30 },
    effects: [
      { type: 'passive', target: 'spirit_max', value: 30, description: '灵力上限+30' }
    ],
    requirements: { minRealm: 1 },
    value: 2000,
    weight: 0.1,
    stackable: false,
    maxStack: 1,
    durability: 50,
    maxDurability: 50,
    source: '炼器师炼制',
    dropRate: 0.05,
    refine: { level: 0, maxLevel: 10, bonusPerLevel: { spirit: 5 } },
    socket: { max: 1, current: 0, gems: [] }
  },
  {
    id: 'equip_storage_ring_low',
    name: '储物戒',
    type: 'accessory',
    rank: 'common',
    description: '最基础的储物戒，内部空间约为十立方米，是修士必备的物品。',
    slot: 'ring2',
    stats: {},
    effects: [
      { type: 'special', target: 'storage', value: 10, description: '储物空间10立方米' }
    ],
    requirements: {},
    value: 1000,
    weight: 0.1,
    stackable: false,
    maxStack: 1,
    durability: 999,
    maxDurability: 999,
    source: '炼器师炼制',
    dropRate: 0.1,
    refine: { level: 0, maxLevel: 0, bonusPerLevel: {} },
    socket: { max: 0, current: 0, gems: [] }
  },
  {
    id: 'equip_storage_ring_mid',
    name: '乾坤戒',
    type: 'accessory',
    rank: 'rare',
    description: '中等等级的储物戒，内部空间约为一百立方米，是筑基期修士的标配。',
    slot: 'ring2',
    stats: {},
    effects: [
      { type: 'special', target: 'storage', value: 100, description: '储物空间100立方米' }
    ],
    requirements: { minRealm: 2 },
    value: 50000,
    weight: 0.1,
    stackable: false,
    maxStack: 1,
    durability: 999,
    maxDurability: 999,
    source: '炼器师炼制',
    dropRate: 0.01,
    refine: { level: 0, maxLevel: 0, bonusPerLevel: {} },
    socket: { max: 0, current: 0, gems: [] }
  },
  {
    id: 'equip_artifact_qingyun_seal',
    name: '青云印',
    type: 'artifact',
    rank: 'legendary',
    description: '青云宗的镇宗之宝，由青云仙尊亲手炼制，蕴含着青云仙尊的一丝神念。',
    history: '青云印由青云仙尊亲手炼制，是青云宗的镇宗之宝。据说此印蕴含着青云仙尊的一丝神念，可以调动青云山的护山大阵。',
    slot: 'artifact1',
    stats: { attack: 300, defense: 300, spirit: 200 },
    effects: [
      { type: 'special', target: 'formation_control', value: 'qingyun', description: '可控制青云山护山大阵' },
      { type: 'special', target: 'divine_sense', value: 'active', description: '蕴含青云仙尊神念，可激发' }
    ],
    requirements: { minRealm: 4, requiredMethod: ['method_qingyun_jue'] },
    value: 10000000,
    weight: 1,
    stackable: false,
    maxStack: 1,
    durability: 9999,
    maxDurability: 9999,
    source: '青云宗',
    dropRate: 0,
    refine: { level: 0, maxLevel: 30, bonusPerLevel: { attack: 20, defense: 20, spirit: 15 } },
    socket: { max: 5, current: 0, gems: [] }
  }
]

export const pills: Pill[] = [
  {
    id: 'pill_foundation',
    name: '筑基丹',
    type: 'pill',
    pillRank: 'earth',
    rank: 'rare',
    description: '炼气期修士突破到筑基期的必备丹药。',
    effects: [
      { type: 'breakthrough', target: 'foundation', value: 30, description: '筑基成功率提升30%' }
    ],
    sideEffects: ['可能产生丹毒', '连续服用效果递减'],
    cooldown: 86400,
    addiction: 5,
    history: '筑基丹由上古丹道大师创造，是修仙界最重要的丹药之一。',
    requirements: { minRealm: 1 },
    value: 10000,
    weight: 0.01,
    stackable: true,
    maxStack: 99,
    source: '丹霞谷炼制',
    dropRate: 0.001
  },
  {
    id: 'pill_core_formation',
    name: '结丹丹',
    type: 'pill',
    pillRank: 'heaven',
    rank: 'epic',
    description: '筑基期修士突破到结丹期的必备丹药。',
    effects: [
      { type: 'breakthrough', target: 'core_formation', value: 25, description: '结丹成功率提升25%' }
    ],
    sideEffects: ['可能产生丹毒', '连续服用效果递减', '可能引发心魔'],
    cooldown: 259200,
    addiction: 10,
    history: '结丹丹由上古丹道大师创造，炼制难度极高。',
    requirements: { minRealm: 2 },
    value: 100000,
    weight: 0.01,
    stackable: true,
    maxStack: 99,
    source: '丹霞谷炼制',
    dropRate: 0.0001
  },
  {
    id: 'pill_nascent_soul',
    name: '凝婴丹',
    type: 'pill',
    pillRank: 'heaven',
    rank: 'legendary',
    description: '结丹期修士突破到元婴期的必备丹药。',
    effects: [
      { type: 'breakthrough', target: 'nascent_soul', value: 20, description: '凝婴成功率提升20%' }
    ],
    sideEffects: ['可能产生丹毒', '连续服用效果递减', '可能引发心魔', '失败可能导致修为倒退'],
    cooldown: 604800,
    addiction: 15,
    history: '凝婴丹由上古丹道大师创造，炼制难度极高。',
    requirements: { minRealm: 3 },
    value: 1000000,
    weight: 0.01,
    stackable: true,
    maxStack: 99,
    source: '丹霞谷炼制',
    dropRate: 0.00001
  },
  {
    id: 'pill_healing_low',
    name: '疗伤丹',
    type: 'pill',
    pillRank: 'mortal',
    rank: 'common',
    description: '最基础的治疗丹药。',
    effects: [
      { type: 'heal', target: 'health', value: 100, description: '恢复100点生命值' }
    ],
    requirements: {},
    value: 50,
    weight: 0.01,
    stackable: true,
    maxStack: 999,
    source: '丹药铺购买',
    dropRate: 0.2
  },
  {
    id: 'pill_spirit_recovery',
    name: '回灵丹',
    type: 'pill',
    pillRank: 'mortal',
    rank: 'common',
    description: '可以快速恢复灵力的丹药。',
    effects: [
      { type: 'restore', target: 'spirit', value: 100, description: '恢复100点灵力' }
    ],
    requirements: {},
    value: 100,
    weight: 0.01,
    stackable: true,
    maxStack: 999,
    source: '丹药铺购买',
    dropRate: 0.15
  }
]

export const herbs: Herb[] = [
  {
    id: 'herb_spirit_grass',
    name: '灵草',
    type: 'herb',
    rank: 'common',
    description: '最基础的灵草，蕴含着微弱的灵气。',
    herbAge: 10,
    maxAge: 100,
    properties: ['恢复灵力', '炼丹材料'],
    usage: ['直接服用', '炼丹', '炼器'],
    growthConditions: {
      environment: ['灵气充沛之地', '阴凉处'],
      time: 365,
      care: ['每日浇水', '每月施肥']
    },
    effects: [
      { type: 'stat', target: 'spirit', value: 10, description: '恢复10点灵力' }
    ],
    requirements: {},
    value: 10,
    weight: 0.1,
    stackable: true,
    maxStack: 999,
    source: '灵药园采集',
    dropRate: 0.3
  },
  {
    id: 'herb_ginseng_100',
    name: '百年人参',
    type: 'herb',
    rank: 'uncommon',
    description: '生长了一百年的人参，蕴含着充沛的灵气。',
    herbAge: 100,
    maxAge: 500,
    properties: ['大补元气', '炼丹材料', '突破辅助'],
    usage: ['直接服用', '炼丹', '泡酒'],
    growthConditions: {
      environment: ['深山老林', '灵气充沛之地'],
      time: 3650,
      care: ['自然生长']
    },
    effects: [
      { type: 'stat', target: 'health', value: 200, description: '恢复200点生命值' },
      { type: 'stat', target: 'spirit', value: 100, description: '恢复100点灵力' }
    ],
    requirements: {},
    value: 500,
    weight: 0.2,
    stackable: true,
    maxStack: 999,
    source: '深山采集',
    dropRate: 0.05
  },
  {
    id: 'herb_ginseng_1000',
    name: '千年人参',
    type: 'herb',
    rank: 'rare',
    description: '生长了一千年的人参，蕴含着浓郁的灵气，据说已经产生了灵智。',
    herbAge: 1000,
    maxAge: 5000,
    properties: ['起死回生', '炼丹材料', '突破辅助', '可能产生灵智'],
    usage: ['直接服用', '炼丹', '泡酒', '培养'],
    growthConditions: {
      environment: ['上古灵脉', '秘境'],
      time: 36500,
      care: ['自然生长', '吸收灵气']
    },
    effects: [
      { type: 'stat', target: 'health', value: 1000, description: '恢复1000点生命值' },
      { type: 'stat', target: 'spirit', value: 500, description: '恢复500点灵力' },
      { type: 'special', target: 'breakthrough_help', value: 10, description: '突破成功率提升10%' }
    ],
    requirements: {},
    value: 10000,
    weight: 0.3,
    stackable: true,
    maxStack: 99,
    source: '秘境采集',
    dropRate: 0.005
  }
]

export const materials: Material[] = [
  {
    id: 'material_iron',
    name: '玄铁',
    type: 'material',
    materialType: 'metal',
    quality: 50,
    rank: 'common',
    description: '最基础的炼器材料，可以炼制低级灵器。',
    usage: ['炼器', '建筑'],
    processing: [
      {
        method: '提炼',
        requirements: ['炼器炉', '炼器术入门'],
        products: ['玄铁精']
      }
    ],
    effects: [],
    requirements: {},
    value: 100,
    weight: 1,
    stackable: true,
    maxStack: 999,
    source: '矿脉开采',
    dropRate: 0.2
  },
  {
    id: 'material_star_iron',
    name: '星辰铁',
    type: 'material',
    materialType: 'metal',
    quality: 90,
    rank: 'rare',
    description: '来自天外陨石的珍稀材料，蕴含着星辰之力。',
    usage: ['炼器', '阵法'],
    processing: [
      {
        method: '提炼',
        requirements: ['高级炼器炉', '炼器术精通'],
        products: ['星辰精华']
      }
    ],
    effects: [],
    requirements: {},
    value: 5000,
    weight: 1,
    stackable: true,
    maxStack: 999,
    source: '陨石提炼',
    dropRate: 0.005
  },
  {
    id: 'material_dragon_bone',
    name: '龙骨',
    type: 'material',
    materialType: 'bone',
    quality: 100,
    rank: 'legendary',
    description: '上古真龙的骨骼，蕴含着龙族血脉之力。',
    usage: ['炼器', '炼丹', '阵法'],
    processing: [
      {
        method: '提炼',
        requirements: ['仙级炼器炉', '炼器术大师'],
        products: ['龙骨精华', '龙血']
      }
    ],
    effects: [],
    requirements: {},
    value: 100000,
    weight: 5,
    stackable: true,
    maxStack: 99,
    source: '上古遗迹',
    dropRate: 0.0001
  }
]

export const books: Book[] = [
  {
    id: 'book_qingyun_jue',
    name: '青云诀',
    type: 'manual',
    contentType: 'method',
    content: 'method_qingyun_jue',
    rank: 'legendary',
    description: '青云宗的镇派功法，由青云仙尊亲创。',
    comprehension: {
      difficulty: 80,
      timeRequired: 365,
      requirements: ['悟性50以上', '风或水灵根']
    },
    effects: [
      { type: 'skill', target: 'method_qingyun_jue', value: 'complete', description: '可学习青云诀（完整版）' }
    ],
    requirements: { minRealm: 1, minStats: { comprehension: 50 } },
    value: 1000000,
    weight: 0.5,
    stackable: false,
    maxStack: 1,
    source: '青云宗',
    dropRate: 0
  },
  {
    id: 'book_basic_alchemy',
    name: '丹道入门',
    type: 'book',
    contentType: 'knowledge',
    content: 'alchemy_basic',
    rank: 'common',
    description: '丹道入门书籍，介绍了基础的丹道知识。',
    comprehension: {
      difficulty: 20,
      timeRequired: 30,
      requirements: ['识字']
    },
    effects: [
      { type: 'skill', target: 'alchemy_basic', value: 'unlock', description: '解锁丹道技能' }
    ],
    requirements: {},
    value: 500,
    weight: 0.3,
    stackable: false,
    maxStack: 1,
    source: '书店购买',
    dropRate: 0.1
  }
]

export function getItemById(id: string): Item | undefined {
  return items.find(i => i.id === id) || 
         equipment.find(e => e.id === id) ||
         pills.find(p => p.id === id) ||
         herbs.find(h => h.id === id) ||
         materials.find(m => m.id === id) ||
         books.find(b => b.id === id)
}

export function getEquipmentById(id: string): Equipment | undefined {
  return equipment.find(e => e.id === id)
}

export function getPillById(id: string): Pill | undefined {
  return pills.find(p => p.id === id)
}

export function getHerbById(id: string): Herb | undefined {
  return herbs.find(h => h.id === id)
}

export function getMaterialById(id: string): Material | undefined {
  return materials.find(m => m.id === id)
}

export function getBookById(id: string): Book | undefined {
  return books.find(b => b.id === id)
}

export function getItemsByType(type: ItemType): Item[] {
  return items.filter(i => i.type === type)
}

export function getEquipmentBySlot(slot: EquipmentSlot): Equipment[] {
  return equipment.filter(e => e.slot === slot)
}

export function getItemsByRank(rank: ItemRank): Item[] {
  return items.filter(i => i.rank === rank)
}

export function canUseItem(itemId: string, playerData: {
  realm: number
  stats: { [key: string]: number }
  learnedMethods: string[]
}): { canUse: boolean; reason?: string } {
  const item = getItemById(itemId)
  if (!item) return { canUse: false, reason: '物品不存在' }
  
  if (item.requirements.minRealm && playerData.realm < item.requirements.minRealm) {
    return { canUse: false, reason: '境界不足' }
  }
  
  if (item.requirements.minStats) {
    for (const [stat, required] of Object.entries(item.requirements.minStats)) {
      if ((playerData.stats[stat] || 0) < required) {
        return { canUse: false, reason: `${stat}不足` }
      }
    }
  }
  
  if (item.requirements.requiredMethod) {
    const hasMethod = item.requirements.requiredMethod.some(m => playerData.learnedMethods.includes(m))
    if (!hasMethod) {
      return { canUse: false, reason: '未学习所需功法' }
    }
  }
  
  return { canUse: true }
}

export function canEquipItem(itemId: string, playerData: {
  realm: number
  stats: { [key: string]: number }
  learnedMethods: string[]
  equippedSlots: EquipmentSlot[]
}): { canEquip: boolean; reason?: string } {
  const equip = getEquipmentById(itemId)
  if (!equip) return { canEquip: false, reason: '不是装备' }
  
  if (equip.requirements.minRealm && playerData.realm < equip.requirements.minRealm) {
    return { canEquip: false, reason: '境界不足' }
  }
  
  if (equip.requirements.minStats) {
    for (const [stat, required] of Object.entries(equip.requirements.minStats)) {
      if ((playerData.stats[stat] || 0) < required) {
        return { canEquip: false, reason: `${stat}不足` }
      }
    }
  }
  
  if (equip.requirements.requiredMethod) {
    const hasMethod = equip.requirements.requiredMethod.some(m => playerData.learnedMethods.includes(m))
    if (!hasMethod) {
      return { canEquip: false, reason: '未学习所需功法' }
    }
  }
  
  if (playerData.equippedSlots.includes(equip.slot)) {
    return { canEquip: false, reason: '该装备槽已被占用' }
  }
  
  return { canEquip: true }
}

export function calculateEquipmentStats(equipId: string, refineLevel: number): EquipmentStats {
  const equip = getEquipmentById(equipId)
  if (!equip) return {}
  
  const stats = { ...equip.stats }
  
  if (refineLevel > 0) {
    for (const [stat, bonus] of Object.entries(equip.refine.bonusPerLevel)) {
      if (stats[stat as keyof EquipmentStats] !== undefined) {
        (stats as any)[stat] = (stats[stat as keyof EquipmentStats] || 0) + bonus * refineLevel
      }
    }
  }
  
  return stats
}

export function calculateSetValue(equipIds: string[]): { setName?: string; activeBonuses: ItemEffect[] } {
  const equippedSets: { [key: string]: number } = {}
  const activeBonuses: ItemEffect[] = []
  
  for (const id of equipIds) {
    const equip = getEquipmentById(id)
    if (equip?.setBonus) {
      equippedSets[equip.setBonus.setName] = (equippedSets[equip.setBonus.setName] || 0) + 1
    }
  }
  
  for (const [setName, count] of Object.entries(equipIds)) {
    const equip = getEquipmentById(count)
    if (equip?.setBonus) {
      for (const bonus of equip.setBonus.bonuses) {
        if (equippedSets[setName] >= bonus.pieces) {
          activeBonuses.push(...bonus.effects)
        }
      }
    }
  }
  
  return { setName: Object.keys(equippedSets)[0], activeBonuses }
}
