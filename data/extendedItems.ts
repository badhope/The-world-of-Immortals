import { Item, Equipment, ItemSet, RefinementMaterial } from './items'

export interface ExtendedItem extends Item {
  grade?: ItemGrade
  origin?: string
  history?: string
  usage?: string
  sideEffects?: string[]
  contraindications?: string[]
  storage?: string
  shelfLife?: number
  marketValue?: number
  rarity?: number
}

export type ItemGrade = 'mortal' | 'spirit' | 'earth' | 'heaven' | 'immortal' | 'divine'

export interface ExtendedEquipment extends Equipment {
  grade?: ItemGrade
  origin?: string
  history?: string
  previousOwners?: string[]
  spirit?: EquipmentSpirit
  refinementLevel?: number
  maxRefinement?: number
  refinementMaterials?: string[]
  specialAbilities?: string[]
  growthPotential?: number
  awakeningConditions?: string[]
}

export interface EquipmentSpirit {
  name: string
  personality: string
  abilities: string[]
  cultivation: string
  loyalty: number
}

export interface Pill extends ExtendedItem {
  type: 'pill'
  pillType: 'cultivation' | 'healing' | 'enhancement' | 'detoxification' | 'special' | 'forbidden'
  potency: number
  toxicity: number
  addiction: number
  duration: number
  effects: PillEffect[]
  contraindications: string[]
}

export interface PillEffect {
  name: string
  description: string
  value: number
  duration?: number
}

export interface Material extends ExtendedItem {
  type: 'material'
  materialType: 'ore' | 'herb' | 'beast' | 'spirit' | 'special' | 'forbidden'
  attributes: string[]
  uses: string[]
  rarity: number
  locations: string[]
}

export interface Artifact extends ExtendedEquipment {
  type: 'artifact'
  artifactType: 'weapon' | 'armor' | 'accessory' | 'tool'
  power: number
  durability: number
  specialAbilities: string[]
  refinementMethod: string
}

export interface ImmortalArtifact extends ExtendedEquipment {
  type: 'immortal_artifact'
  artifactType: 'weapon' | 'armor' | 'accessory' | 'tool'
  power: number
  durability: number
  specialAbilities: string[]
  immortalAbilities: string[]
  origin: string
  history: string
  awakeningConditions: string[]
  growthPotential: number
}

export interface SpiritStone extends ExtendedItem {
  type: 'spirit_stone'
  spiritType: 'spirit' | 'fire' | 'water' | 'wood' | 'metal' | 'earth' | 'thunder' | 'wind' | 'ice' | 'dark' | 'light'
  grade: 'inferior' | 'low' | 'medium' | 'high' | 'superior' | 'supreme'
  spiritValue: number
}

export const extendedPills: Pill[] = [
  {
    id: 'pill_qi_gathering_low',
    name: '聚气丹（下品）',
    type: 'pill',
    pillType: 'cultivation',
    grade: 'mortal',
    description: '最基础的修炼丹药，可以帮助炼气期修士聚集灵气，加速修炼。',
    origin: '修仙界常见丹药',
    history: '聚气丹的起源已不可考，据说是上古时期某位丹道大师所创。',
    usage: '口服，每日最多三颗',
    sideEffects: ['过量服用可能导致灵气紊乱'],
    contraindications: ['筑基期以上修士效果减弱'],
    storage: '存放于玉瓶中，置于阴凉干燥处',
    shelfLife: 100,
    marketValue: 100,
    rarity: 1,
    potency: 100,
    toxicity: 0,
    addiction: 0,
    duration: 1,
    effects: [
      { name: '聚集灵气', description: '聚集天地灵气，加速修炼', value: 10 },
      { name: '恢复灵力', description: '恢复少量灵力', value: 5 }
    ]
  },
  {
    id: 'pill_qi_gathering_medium',
    name: '聚气丹（中品）',
    type: 'pill',
    pillType: 'cultivation',
    grade: 'mortal',
    description: '中品聚气丹，效果比下品聚气丹强50%。',
    origin: '修仙界常见丹药',
    history: '聚气丹的起源已不可考，据说是上古时期某位丹道大师所创。',
    usage: '口服，每日最多两颗',
    sideEffects: ['过量服用可能导致灵气紊乱'],
    contraindications: ['筑基期以上修士效果减弱'],
    storage: '存放于玉瓶中，置于阴凉干燥处',
    shelfLife: 100,
    marketValue: 300,
    rarity: 2,
    potency: 150,
    toxicity: 0,
    addiction: 0,
    duration: 1,
    effects: [
      { name: '聚集灵气', description: '聚集天地灵气，加速修炼', value: 15 },
      { name: '恢复灵力', description: '恢复少量灵力', value: 8 }
    ]
  },
  {
    id: 'pill_foundation_medium',
    name: '筑基丹（中品）',
    type: 'pill',
    pillType: 'cultivation',
    grade: 'spirit',
    description: '筑基期修士最重要的丹药，可以帮助炼气期大圆满修士突破到筑基期。',
    origin: '修仙界重要丹药',
    history: '筑基丹的起源已不可考，据说是上古时期某位丹道大师所创。',
    usage: '突破时服用',
    sideEffects: ['突破失败可能导致经脉受损', '有轻微毒性'],
    contraindications: ['炼气期以下修士禁用', '筑基期以上修士无效'],
    storage: '存放于玉瓶中，置于灵气充沛之处',
    shelfLife: 500,
    marketValue: 10000,
    rarity: 5,
    potency: 1000,
    toxicity: 10,
    addiction: 0,
    duration: 1,
    effects: [
      { name: '帮助突破', description: '帮助突破筑基期', value: 30 },
      { name: '强化经脉', description: '强化经脉', value: 20 },
      { name: '凝聚灵气', description: '凝聚灵气', value: 25 }
    ]
  },
  {
    id: 'pill_foundation_high',
    name: '筑基丹（上品）',
    type: 'pill',
    pillType: 'cultivation',
    grade: 'spirit',
    description: '上品筑基丹，效果比中品筑基丹强50%，成功率提升20%。',
    origin: '修仙界重要丹药',
    history: '筑基丹的起源已不可考，据说是上古时期某位丹道大师所创。',
    usage: '突破时服用',
    sideEffects: ['突破失败可能导致经脉受损', '有轻微毒性'],
    contraindications: ['炼气期以下修士禁用', '筑基期以上修士无效'],
    storage: '存放于玉瓶中，置于灵气充沛之处',
    shelfLife: 500,
    marketValue: 30000,
    rarity: 6,
    potency: 1500,
    toxicity: 5,
    addiction: 0,
    duration: 1,
    effects: [
      { name: '帮助突破', description: '帮助突破筑基期', value: 50 },
      { name: '强化经脉', description: '强化经脉', value: 30 },
      { name: '凝聚灵气', description: '凝聚灵气', value: 35 }
    ]
  },
  {
    id: 'pill_golden_core_high',
    name: '结金丹（上品）',
    type: 'pill',
    pillType: 'cultivation',
    grade: 'earth',
    description: '结丹期修士最重要的丹药，可以帮助筑基期大圆满修士突破到结丹期。',
    origin: '修仙界重要丹药',
    history: '结金丹的起源已不可考，据说是上古时期某位丹道大师所创。',
    usage: '突破时服用',
    sideEffects: ['突破失败可能导致金丹碎裂', '有一定毒性'],
    contraindications: ['筑基期以下修士禁用', '结丹期以上修士无效'],
    storage: '存放于玉瓶中，置于灵气充沛之处',
    shelfLife: 1000,
    marketValue: 100000,
    rarity: 7,
    potency: 5000,
    toxicity: 30,
    addiction: 0,
    duration: 1,
    effects: [
      { name: '帮助突破', description: '帮助突破结丹期', value: 30 },
      { name: '凝聚金丹', description: '凝聚金丹', value: 40 },
      { name: '强化经脉', description: '强化经脉', value: 30 }
    ]
  },
  {
    id: 'pill_nascent_soul_supreme',
    name: '凝婴丹（极品）',
    type: 'pill',
    pillType: 'cultivation',
    grade: 'heaven',
    description: '元婴期修士最重要的丹药，可以帮助结丹期大圆满修士突破到元婴期。',
    origin: '修仙界珍贵丹药',
    history: '凝婴丹的起源已不可考，据说是上古时期某位丹道大师所创。',
    usage: '突破时服用',
    sideEffects: ['突破失败可能导致元婴无法凝聚', '有较大毒性'],
    contraindications: ['结丹期以下修士禁用', '元婴期以上修士无效'],
    storage: '存放于玉瓶中，置于灵气充沛之处',
    shelfLife: 2000,
    marketValue: 1000000,
    rarity: 9,
    potency: 20000,
    toxicity: 50,
    addiction: 0,
    duration: 1,
    effects: [
      { name: '帮助突破', description: '帮助突破元婴期', value: 20 },
      { name: '凝聚元婴', description: '凝聚元婴', value: 50 },
      { name: '强化神魂', description: '强化神魂', value: 40 }
    ]
  },
  {
    id: 'pill_healing_low',
    name: '疗伤丹（下品）',
    type: 'pill',
    pillType: 'healing',
    grade: 'mortal',
    description: '最基础的治疗丹药，可以帮助修士快速恢复伤势。',
    origin: '修仙界常见丹药',
    history: '疗伤丹的起源已不可考，据说是上古时期某位丹道大师所创。',
    usage: '受伤时口服',
    sideEffects: ['无'],
    contraindications: ['无'],
    storage: '存放于玉瓶中，置于阴凉干燥处',
    shelfLife: 100,
    marketValue: 50,
    rarity: 1,
    potency: 100,
    toxicity: 0,
    addiction: 0,
    duration: 1,
    effects: [
      { name: '恢复伤势', description: '快速恢复伤势', value: 20 },
      { name: '止血', description: '止血', value: 30 }
    ]
  },
  {
    id: 'pill_healing_high',
    name: '疗伤丹（上品）',
    type: 'pill',
    pillType: 'healing',
    grade: 'spirit',
    description: '上品疗伤丹，效果比下品疗伤丹强100%。',
    origin: '修仙界常见丹药',
    history: '疗伤丹的起源已不可考，据说是上古时期某位丹道大师所创。',
    usage: '受伤时口服',
    sideEffects: ['无'],
    contraindications: ['无'],
    storage: '存放于玉瓶中，置于阴凉干燥处',
    shelfLife: 100,
    marketValue: 200,
    rarity: 3,
    potency: 200,
    toxicity: 0,
    addiction: 0,
    duration: 1,
    effects: [
      { name: '恢复伤势', description: '快速恢复伤势', value: 40 },
      { name: '止血', description: '止血', value: 60 }
    ]
  },
  {
    id: 'pill_spirit_recovery_low',
    name: '回灵丹（下品）',
    type: 'pill',
    pillType: 'enhancement',
    grade: 'mortal',
    description: '最基础的恢复灵力丹药，可以帮助修士快速恢复消耗的灵力。',
    origin: '修仙界常见丹药',
    history: '回灵丹的起源已不可考，据说是上古时期某位丹道大师所创。',
    usage: '灵力消耗后口服',
    sideEffects: ['无'],
    contraindications: ['无'],
    storage: '存放于玉瓶中，置于阴凉干燥处',
    shelfLife: 100,
    marketValue: 80,
    rarity: 1,
    potency: 100,
    toxicity: 0,
    addiction: 0,
    duration: 1,
    effects: [
      { name: '恢复灵力', description: '快速恢复灵力', value: 20 }
    ]
  },
  {
    id: 'pill_detoxification_medium',
    name: '解毒丹（中品）',
    type: 'pill',
    pillType: 'detoxification',
    grade: 'spirit',
    description: '专门用于解毒的丹药，可以解除大部分常见毒素。',
    origin: '修仙界常见丹药',
    history: '解毒丹的起源已不可考，据说是上古时期某位丹道大师所创。',
    usage: '中毒时口服',
    sideEffects: ['无'],
    contraindications: ['对特殊毒素效果有限'],
    storage: '存放于玉瓶中，置于阴凉干燥处',
    shelfLife: 200,
    marketValue: 500,
    rarity: 3,
    potency: 500,
    toxicity: 0,
    addiction: 0,
    duration: 1,
    effects: [
      { name: '解毒', description: '解除常见毒素', value: 50 },
      { name: '净化血液', description: '净化血液', value: 30 }
    ]
  },
  {
    id: 'pill_longevity_supreme',
    name: '延寿丹（极品）',
    type: 'pill',
    pillType: 'special',
    grade: 'heaven',
    description: '可以延长修士寿命的丹药，是修仙界最珍贵的丹药之一。',
    origin: '修仙界珍贵丹药',
    history: '延寿丹的起源已不可考，据说是上古时期某位丹道大师所创。',
    usage: '口服',
    sideEffects: ['无'],
    contraindications: ['一生只能服用一次', '元婴期以下修士禁用'],
    storage: '存放于玉瓶中，置于灵气充沛之处',
    shelfLife: 5000,
    marketValue: 10000000,
    rarity: 10,
    potency: 50000,
    toxicity: 0,
    addiction: 0,
    duration: 1,
    effects: [
      { name: '延长寿命', description: '延长寿命百年', value: 100 },
      { name: '强化生命', description: '强化生命', value: 50 },
      { name: '延缓衰老', description: '延缓衰老', value: 40 }
    ]
  }
]

export const extendedMaterials: Material[] = [
  {
    id: 'material_iron_ore',
    name: '玄铁矿',
    type: 'material',
    materialType: 'ore',
    grade: 'mortal',
    description: '最常见的炼器材料，可以炼制灵器。',
    origin: '青云大陆各地矿脉',
    history: '玄铁矿是最常见的炼器材料，几乎每个矿脉都有产出。',
    attributes: ['坚硬', '导灵'],
    uses: ['炼制灵器', '炼制阵旗'],
    rarity: 1,
    locations: ['中州平原', '北荒原', '西域荒漠'],
    marketValue: 10,
    storage: '存放于干燥处',
    shelfLife: -1
  },
  {
    id: 'material_spirit_iron',
    name: '灵铁矿',
    type: 'material',
    materialType: 'ore',
    grade: 'spirit',
    description: '中品炼器材料，可以炼制上品灵器。',
    origin: '灵气充沛的矿脉',
    history: '灵铁矿比玄铁矿珍贵，只有在灵气充沛的矿脉才能产出。',
    attributes: ['坚硬', '导灵', '灵气亲和'],
    uses: ['炼制上品灵器', '炼制阵旗', '炼制符箓'],
    rarity: 3,
    locations: ['中州平原', '北荒原'],
    marketValue: 100,
    storage: '存放于灵气充沛之处',
    shelfLife: -1
  },
  {
    id: 'material_heavenly_iron',
    name: '天铁矿',
    type: 'material',
    materialType: 'ore',
    grade: 'heaven',
    description: '极品炼器材料，可以炼制法宝。',
    origin: '上古遗迹',
    history: '天铁矿是极其珍贵的炼器材料，只有在上古遗迹中才能找到。',
    attributes: ['极其坚硬', '完美导灵', '灵气亲和', '自我修复'],
    uses: ['炼制法宝', '炼制仙器'],
    rarity: 8,
    locations: ['上古遗迹', '秘境'],
    marketValue: 100000,
    storage: '存放于灵气充沛之处',
    shelfLife: -1
  },
  {
    id: 'material_spirit_herb',
    name: '灵草',
    type: 'material',
    materialType: 'herb',
    grade: 'mortal',
    description: '最常见的炼丹材料，可以炼制基础丹药。',
    origin: '青云大陆各地',
    history: '灵草是最常见的炼丹材料，几乎每个地方都有生长。',
    attributes: ['灵气', '温和'],
    uses: ['炼制基础丹药', '炼制符箓'],
    rarity: 1,
    locations: ['中州平原', '南荒丛林'],
    marketValue: 5,
    storage: '存放于阴凉干燥处',
    shelfLife: 10
  },
  {
    id: 'material_thousand_year_ginseng',
    name: '千年人参',
    type: 'material',
    materialType: 'herb',
    grade: 'spirit',
    description: '珍贵炼丹材料，可以炼制筑基丹等高级丹药。',
    origin: '灵气充沛之地',
    history: '千年人参是极其珍贵的炼丹材料，只有在灵气充沛之地才能生长。',
    attributes: ['灵气浓郁', '生命力', '延寿'],
    uses: ['炼制筑基丹', '炼制延寿丹', '炼制高级丹药'],
    rarity: 5,
    locations: ['中州平原', '南荒丛林'],
    marketValue: 5000,
    storage: '存放于玉盒中，置于灵气充沛之处',
    shelfLife: 100
  },
  {
    id: 'material_ten_thousand_year_ginseng',
    name: '万年人参',
    type: 'material',
    materialType: 'herb',
    grade: 'heaven',
    description: '极品炼丹材料，可以炼制凝婴丹等顶级丹药。',
    origin: '上古遗迹',
    history: '万年人参是极其珍贵的炼丹材料，只有在上古遗迹中才能找到。',
    attributes: ['灵气极其浓郁', '强大生命力', '延寿', '可能诞生灵智'],
    uses: ['炼制凝婴丹', '炼制延寿丹', '炼制顶级丹药'],
    rarity: 9,
    locations: ['上古遗迹', '秘境'],
    marketValue: 500000,
    storage: '存放于玉盒中，置于灵气充沛之处',
    shelfLife: 500
  },
  {
    id: 'material_dragon_blood',
    name: '龙血',
    type: 'material',
    materialType: 'beast',
    grade: 'heaven',
    description: '龙族血液，是极其珍贵的炼丹炼器材料。',
    origin: '龙族',
    history: '龙血是龙族的血液，蕴含强大的龙之力，是极其珍贵的材料。',
    attributes: ['龙之力', '强化', '延寿', '可能觉醒龙族血脉'],
    uses: ['炼制高级丹药', '炼制法宝', '炼制仙器', '血脉觉醒'],
    rarity: 9,
    locations: ['龙族领地', '上古遗迹'],
    marketValue: 1000000,
    storage: '存放于玉瓶中，置于灵气充沛之处',
    shelfLife: 1000
  },
  {
    id: 'material_phoenix_blood',
    name: '凤凰血',
    type: 'material',
    materialType: 'beast',
    grade: 'heaven',
    description: '凤凰血液，是极其珍贵的炼丹炼器材料。',
    origin: '凤凰族',
    history: '凤凰血是凤凰族的血液，蕴含强大的凤凰之力，是极其珍贵的材料。',
    attributes: ['凤凰之力', '强化', '延寿', '可能觉醒凤凰血脉'],
    uses: ['炼制高级丹药', '炼制法宝', '炼制仙器', '血脉觉醒'],
    rarity: 9,
    locations: ['凤凰族领地', '上古遗迹'],
    marketValue: 1000000,
    storage: '存放于玉瓶中，置于灵气充沛之处',
    shelfLife: 1000
  }
]

export const extendedArtifacts: Artifact[] = [
  {
    id: 'artifact_spirit_sword_medium',
    name: '灵剑（中品）',
    type: 'artifact',
    artifactType: 'weapon',
    grade: 'spirit',
    description: '最基础的灵剑，是修士最常用的武器之一。',
    origin: '修仙界常见武器',
    history: '灵剑的起源已不可考，据说是上古时期某位器道大师所创。',
    power: 500,
    durability: 1000,
    specialAbilities: ['剑气攻击', '御剑飞行'],
    refinementMethod: '灵力注入',
    refinementLevel: 0,
    maxRefinement: 9,
    refinementMaterials: ['灵铁矿', '灵石'],
    growthPotential: 50,
    slot: 'weapon',
    stats: { attack: 100, speed: 10 },
    requirements: { minLevel: 1, minCultivation: '筑基期' },
    setBonus: undefined,
    value: 5000
  },
  {
    id: 'artifact_flying_sword_high',
    name: '飞剑（上品）',
    type: 'artifact',
    artifactType: 'weapon',
    grade: 'earth',
    description: '可以御剑飞行的灵剑，是修士最重要的武器之一。',
    origin: '修仙界重要武器',
    history: '飞剑的起源已不可考，据说是上古时期某位器道大师所创。',
    power: 2000,
    durability: 3000,
    specialAbilities: ['御剑飞行', '远程攻击', '剑气攻击'],
    refinementMethod: '灵力注入',
    refinementLevel: 0,
    maxRefinement: 12,
    refinementMaterials: ['天铁矿', '飞行石', '灵石'],
    growthPotential: 80,
    slot: 'weapon',
    stats: { attack: 300, speed: 30 },
    requirements: { minLevel: 1, minCultivation: '筑基期' },
    setBonus: undefined,
    value: 50000
  },
  {
    id: 'artifact_magic_treasure_supreme',
    name: '法宝（极品）',
    type: 'artifact',
    artifactType: 'weapon',
    grade: 'heaven',
    description: '结丹期以上修士才能使用的法宝，威力巨大。',
    origin: '修仙界珍贵武器',
    history: '法宝的起源已不可考，据说是上古时期某位器道大师所创。',
    power: 10000,
    durability: 10000,
    specialAbilities: ['收入体内', '特殊能力', '器灵辅助'],
    refinementMethod: '体内温养',
    refinementLevel: 0,
    maxRefinement: 18,
    refinementMaterials: ['天铁矿', '天材地宝', '器灵'],
    growthPotential: 100,
    previousOwners: [],
    slot: 'weapon',
    stats: { attack: 1000, speed: 50, defense: 200 },
    requirements: { minLevel: 1, minCultivation: '结丹期' },
    setBonus: undefined,
    value: 500000
  },
  {
    id: 'artifact_spirit_armor_medium',
    name: '灵甲（中品）',
    type: 'artifact',
    artifactType: 'armor',
    grade: 'spirit',
    description: '最基础的灵甲，是修士最常用的防具之一。',
    origin: '修仙界常见防具',
    history: '灵甲的起源已不可考，据说是上古时期某位器道大师所创。',
    power: 400,
    durability: 1500,
    specialAbilities: ['灵力护盾'],
    refinementMethod: '灵力注入',
    refinementLevel: 0,
    maxRefinement: 9,
    refinementMaterials: ['灵铁矿', '灵石'],
    growthPotential: 50,
    slot: 'armor',
    stats: { defense: 150, health: 500 },
    requirements: { minLevel: 1, minCultivation: '筑基期' },
    setBonus: undefined,
    value: 8000
  }
]

export const immortalArtifacts: ImmortalArtifact[] = [
  {
    id: 'immortal_qingyun_sword',
    name: '青云剑',
    type: 'immortal_artifact',
    artifactType: 'weapon',
    grade: 'immortal',
    description: '青云仙尊的本命法宝，蕴含云之大道，威力无穷。',
    origin: '青云仙尊炼制',
    history: `青云剑是青云仙尊的本命法宝，蕴含云之大道。青云仙尊曾用此剑封印天魔皇。

青云仙尊飞升后，青云剑成为青云宗的镇宗之宝，只有青云传承者才能使用。`,
    power: 100000,
    durability: 100000,
    specialAbilities: ['云气攻击', '云海领域', '云遁术', '云化万物'],
    immortalAbilities: ['云之大道', '天地云海', '青云九变'],
    awakeningConditions: ['获得青云传承', '领悟云之大道', '青云仙尊认可'],
    growthPotential: 1000,
    previousOwners: ['青云仙尊', '青云传承者'],
    spirit: {
      name: '云灵',
      personality: '淡泊、睿智、护主',
      abilities: ['云气感知', '云道指点', '自动护主'],
      cultivation: '化神期',
      loyalty: 100
    },
    refinementLevel: 100,
    maxRefinement: 100,
    refinementMaterials: ['天材地宝', '云之本源'],
    slot: 'weapon',
    stats: { attack: 10000, speed: 500, defense: 2000 },
    requirements: { minLevel: 1, minCultivation: '元婴期', special: '青云传承者' },
    setBonus: undefined,
    value: 100000000
  },
  {
    id: 'immortal_tianmo_sword',
    name: '天魔剑',
    type: 'immortal_artifact',
    artifactType: 'weapon',
    grade: 'immortal',
    description: '天魔皇的本命法宝，蕴含吞噬之道，威力无穷。',
    origin: '天魔皇炼制',
    history: `天魔剑是天魔皇的本命法宝，蕴含吞噬之道。天魔皇曾用此剑威胁整个青云大陆。

天魔皇被封印后，天魔剑成为天魔宗的镇宗之宝，只有天魔传承者才能使用。`,
    power: 100000,
    durability: 100000,
    specialAbilities: ['魔气攻击', '吞噬领域', '魔遁术', '吞噬万物'],
    immortalAbilities: ['吞噬之道', '天地魔海', '天魔九变'],
    awakeningConditions: ['获得天魔传承', '领悟吞噬之道', '天魔皇认可'],
    growthPotential: 1000,
    previousOwners: ['天魔皇', '天魔传承者'],
    spirit: {
      name: '魔灵',
      personality: '残忍、狡诈、护主',
      abilities: ['魔气感知', '魔道指点', '自动护主'],
      cultivation: '化神期',
      loyalty: 100
    },
    refinementLevel: 100,
    maxRefinement: 100,
    refinementMaterials: ['天材地宝', '魔之本源'],
    slot: 'weapon',
    stats: { attack: 10000, speed: 500, defense: 2000 },
    requirements: { minLevel: 1, minCultivation: '元婴期', special: '天魔传承者' },
    setBonus: undefined,
    value: 100000000
  },
  {
    id: 'immortal_wanjian_sword',
    name: '万剑',
    type: 'immortal_artifact',
    artifactType: 'weapon',
    grade: 'immortal',
    description: '万剑真人的本命法宝，蕴含剑道，威力无穷。',
    origin: '万剑真人炼制',
    history: `万剑是万剑真人的本命法宝，蕴含剑道。万剑真人曾用此剑击败无数强敌。

万剑真人飞升后，万剑成为万剑宗的镇宗之宝，只有万剑传承者才能使用。`,
    power: 80000,
    durability: 80000,
    specialAbilities: ['剑气攻击', '万剑归宗', '剑遁术', '剑道领域'],
    immortalAbilities: ['剑道', '万剑领域', '剑心通明'],
    awakeningConditions: ['获得万剑传承', '领悟剑道', '万剑真人认可'],
    growthPotential: 800,
    previousOwners: ['万剑真人', '万剑传承者'],
    spirit: {
      name: '剑灵',
      personality: '孤傲、正直、护主',
      abilities: ['剑气感知', '剑道指点', '自动护主'],
      cultivation: '化神期',
      loyalty: 100
    },
    refinementLevel: 100,
    maxRefinement: 100,
    refinementMaterials: ['天材地宝', '剑之本源'],
    slot: 'weapon',
    stats: { attack: 8000, speed: 400, defense: 1500 },
    requirements: { minLevel: 1, minCultivation: '元婴期', special: '万剑传承者' },
    setBonus: undefined,
    value: 80000000
  }
]

export const spiritStones: SpiritStone[] = [
  {
    id: 'spirit_stone_inferior',
    name: '下品灵石',
    type: 'spirit_stone',
    spiritType: 'spirit',
    grade: 'inferior',
    description: '最基础的灵石，蕴含少量灵气。',
    origin: '青云大陆各地矿脉',
    history: '下品灵石是最常见的灵石，几乎每个矿脉都有产出。',
    spiritValue: 1,
    marketValue: 1,
    rarity: 1,
    storage: '存放于玉盒中',
    shelfLife: -1
  },
  {
    id: 'spirit_stone_low',
    name: '中品灵石',
    type: 'spirit_stone',
    spiritType: 'spirit',
    grade: 'low',
    description: '中品灵石，蕴含中等灵气。',
    origin: '灵气充沛的矿脉',
    history: '中品灵石比下品灵石珍贵，只有在灵气充沛的矿脉才能产出。',
    spiritValue: 10,
    marketValue: 10,
    rarity: 2,
    storage: '存放于玉盒中',
    shelfLife: -1
  },
  {
    id: 'spirit_stone_medium',
    name: '上品灵石',
    type: 'spirit_stone',
    spiritType: 'spirit',
    grade: 'medium',
    description: '上品灵石，蕴含大量灵气。',
    origin: '极品灵脉',
    history: '上品灵石比中品灵石珍贵，只有在极品灵脉才能产出。',
    spiritValue: 100,
    marketValue: 100,
    rarity: 4,
    storage: '存放于玉盒中',
    shelfLife: -1
  },
  {
    id: 'spirit_stone_high',
    name: '极品灵石',
    type: 'spirit_stone',
    spiritType: 'spirit',
    grade: 'high',
    description: '极品灵石，蕴含极其大量灵气。',
    origin: '仙级灵脉',
    history: '极品灵石极其珍贵，只有在仙级灵脉才能产出。',
    spiritValue: 1000,
    marketValue: 1000,
    rarity: 6,
    storage: '存放于玉盒中',
    shelfLife: -1
  },
  {
    id: 'spirit_stone_fire',
    name: '火灵石',
    type: 'spirit_stone',
    spiritType: 'fire',
    grade: 'medium',
    description: '火属性灵石，蕴含火属性灵气。',
    origin: '火属性灵脉',
    history: '火灵石是火系修士必备的修炼资源。',
    spiritValue: 150,
    marketValue: 150,
    rarity: 5,
    storage: '存放于玉盒中',
    shelfLife: -1
  },
  {
    id: 'spirit_stone_water',
    name: '水灵石',
    type: 'spirit_stone',
    spiritType: 'water',
    grade: 'medium',
    description: '水属性灵石，蕴含水属性灵气。',
    origin: '水属性灵脉',
    history: '水灵石是水系修士必备的修炼资源。',
    spiritValue: 150,
    marketValue: 150,
    rarity: 5,
    storage: '存放于玉盒中',
    shelfLife: -1
  }
]