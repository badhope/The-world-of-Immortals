export interface Recipe {
  id: string
  name: string
  type: 'pill' | 'artifact' | 'formation' | 'talisman' | 'spirit_food' | 'poison' | 'elixir'
  rank: RecipeRank
  description: string
  history: string
  materials: RecipeMaterial[]
  process: RecipeProcess[]
  result: RecipeResult
  requirements: RecipeRequirement
  successRate: number
  variations: RecipeVariation[]
  creator?: string
  currentUsers: string[]
}

export type RecipeRank = 'mortal' | 'spirit' | 'earth' | 'heaven' | 'immortal' | 'divine'

export interface RecipeMaterial {
  name: string
  quantity: number
  quality: string
  function: string
  substitutes?: string[]
}

export interface RecipeProcess {
  step: number
  description: string
  timeRequired: number
  temperature?: string
  technique?: string
  notes?: string
}

export interface RecipeResult {
  name: string
  quantity: number
  quality: string
  effects: string[]
  duration?: number
  sideEffects?: string[]
}

export interface RecipeRequirement {
  minRealm: string
  minSkillLevel: number
  requiredTools: string[]
  requiredEnvironment?: string
  requiredKnowledge?: string[]
}

export interface RecipeVariation {
  name: string
  description: string
  materialChanges: string[]
  effectChanges: string[]
}

export interface PillRecipe extends Recipe {
  type: 'pill'
  pillType: 'cultivation' | 'healing' | 'enhancement' | 'detoxification' | 'special' | 'forbidden'
  potency: number
  toxicity: number
  addiction: number
  contraindications: string[]
}

export interface ArtifactRecipe extends Recipe {
  type: 'artifact'
  artifactType: 'weapon' | 'armor' | 'accessory' | 'tool' | 'consumable'
  power: number
  durability: number
  specialAbilities: string[]
  refinementMethod: string
}

export interface FormationRecipe extends Recipe {
  type: 'formation'
  formationType: 'attack' | 'defense' | 'trap' | 'support' | 'transport' | 'concealment' | 'gathering' | 'sealing' | 'killing'
  power: number
  range: number
  duration: number
}

export interface TalismanRecipe extends Recipe {
  type: 'talisman'
  talismanType: 'attack' | 'defense' | 'support' | 'special'
  power: number
  uses: number
}

export const pillRecipes: PillRecipe[] = [
  {
    id: 'recipe_pill_qi_gathering',
    name: '聚气丹',
    type: 'pill',
    pillType: 'cultivation',
    rank: 'mortal',
    description: `最基础的修炼丹药，可以帮助炼气期修士聚集灵气，加速修炼。聚气丹是修仙界最常见的丹药之一，几乎所有丹修都会炼制。

聚气丹效果温和，适合初入修行的修士使用。虽然效果不如高级丹药，但胜在材料易得，炼制简单。`,
    history: `聚气丹的起源已不可考，据说是上古时期某位丹道大师所创。经过数千年的发展，聚气丹已经成为修仙界最普及的丹药之一。

聚气丹的配方经过无数次改良，现在的配方已经非常成熟，成功率极高。`,
    materials: [
      { name: '聚灵草', quantity: 1, quality: '下品', function: '聚集灵气', substitutes: ['灵草'] },
      { name: '灵泉水', quantity: 10, quality: '下品', function: '调和药性', substitutes: ['清水'] },
      { name: '甘草', quantity: 1, quality: '凡品', function: '中和药性' }
    ],
    process: [
      { step: 1, description: '将聚灵草洗净，切成小块', timeRequired: 5, technique: '切药' },
      { step: 2, description: '将聚灵草放入丹炉，加入灵泉水', timeRequired: 2, technique: '投料' },
      { step: 3, description: '以文火加热，保持温度在100度', timeRequired: 30, temperature: '100度', technique: '控温' },
      { step: 4, description: '加入甘草，继续加热', timeRequired: 15, temperature: '100度', technique: '投料' },
      { step: 5, description: '以武火收丹，凝聚丹药', timeRequired: 5, temperature: '200度', technique: '收丹' },
      { step: 6, description: '取出丹药，晾干', timeRequired: 60, technique: '晾干' }
    ],
    result: {
      name: '聚气丹',
      quantity: 1,
      quality: '下品',
      effects: ['聚集灵气', '加速修炼'],
      duration: 1
    },
    requirements: {
      minRealm: '炼气期',
      minSkillLevel: 1,
      requiredTools: ['丹炉', '丹火'],
      requiredKnowledge: ['基础丹道']
    },
    successRate: 0.9,
    variations: [
      {
        name: '中品聚气丹',
        description: '使用中品材料炼制的聚气丹',
        materialChanges: ['聚灵草品质提升为中品'],
        effectChanges: ['效果提升50%']
      },
      {
        name: '上品聚气丹',
        description: '使用上品材料炼制的聚气丹',
        materialChanges: ['聚灵草品质提升为上品'],
        effectChanges: ['效果提升100%']
      }
    ],
    currentUsers: ['所有丹修'],
    potency: 100,
    toxicity: 0,
    addiction: 0,
    contraindications: ['筑基期以上修士效果减弱']
  },
  {
    id: 'recipe_pill_foundation',
    name: '筑基丹',
    type: 'pill',
    pillType: 'cultivation',
    rank: 'spirit',
    description: `筑基期修士最重要的丹药，可以帮助炼气期大圆满修士突破到筑基期。筑基丹是修仙界最重要的丹药之一，价值极高。

筑基丹效果强大，但炼制难度也较高。需要多种珍贵材料，且炼制过程复杂。`,
    history: `筑基丹的起源已不可考，据说是上古时期某位丹道大师所创。经过数千年的发展，筑基丹已经成为修仙界最重要的丹药之一。

筑基丹的配方经过无数次改良，现在的配方已经非常成熟，但成功率仍然不高。`,
    materials: [
      { name: '筑基草', quantity: 1, quality: '中品', function: '筑基主药', substitutes: ['天灵草'] },
      { name: '灵泉水', quantity: 100, quality: '中品', function: '调和药性' },
      { name: '千年人参', quantity: 1, quality: '中品', function: '增强药效' },
      { name: '天灵果', quantity: 1, quality: '中品', function: '凝聚灵气' },
      { name: '龙血草', quantity: 1, quality: '下品', function: '强化经脉' }
    ],
    process: [
      { step: 1, description: '将筑基草、千年人参、天灵果、龙血草分别处理', timeRequired: 30, technique: '处理药材' },
      { step: 2, description: '将灵泉水注入丹炉，加热至沸腾', timeRequired: 10, temperature: '100度', technique: '加热' },
      { step: 3, description: '加入筑基草，以文火炼化', timeRequired: 60, temperature: '150度', technique: '炼化' },
      { step: 4, description: '加入千年人参，继续炼化', timeRequired: 60, temperature: '150度', technique: '炼化' },
      { step: 5, description: '加入天灵果，继续炼化', timeRequired: 60, temperature: '150度', technique: '炼化' },
      { step: 6, description: '加入龙血草，继续炼化', timeRequired: 60, temperature: '150度', technique: '炼化' },
      { step: 7, description: '以武火收丹，凝聚丹药', timeRequired: 30, temperature: '300度', technique: '收丹' },
      { step: 8, description: '取出丹药，晾干', timeRequired: 120, technique: '晾干' }
    ],
    result: {
      name: '筑基丹',
      quantity: 1,
      quality: '中品',
      effects: ['帮助突破筑基期', '强化经脉', '凝聚灵气'],
      duration: 1
    },
    requirements: {
      minRealm: '筑基期',
      minSkillLevel: 5,
      requiredTools: ['丹炉', '丹火'],
      requiredKnowledge: ['中级丹道', '筑基丹方'],
      requiredEnvironment: '灵气充沛之地'
    },
    successRate: 0.5,
    variations: [
      {
        name: '上品筑基丹',
        description: '使用上品材料炼制的筑基丹',
        materialChanges: ['所有材料品质提升为上品'],
        effectChanges: ['效果提升50%', '成功率提升20%']
      },
      {
        name: '极品筑基丹',
        description: '使用极品材料炼制的筑基丹',
        materialChanges: ['所有材料品质提升为极品'],
        effectChanges: ['效果提升100%', '成功率提升40%']
      }
    ],
    currentUsers: ['所有丹修', '所有宗门'],
    potency: 1000,
    toxicity: 10,
    addiction: 0,
    contraindications: ['炼气期以下修士禁用', '筑基期以上修士无效']
  },
  {
    id: 'recipe_pill_golden_core',
    name: '结金丹',
    type: 'pill',
    pillType: 'cultivation',
    rank: 'earth',
    description: `结丹期修士最重要的丹药，可以帮助筑基期大圆满修士突破到结丹期。结金丹是修仙界最重要的丹药之一，价值极高。

结金丹效果强大，但炼制难度极高。需要多种珍贵材料，且炼制过程极其复杂。`,
    history: `结金丹的起源已不可考，据说是上古时期某位丹道大师所创。经过数千年的发展，结金丹已经成为修仙界最重要的丹药之一。`,
    materials: [
      { name: '结金草', quantity: 1, quality: '上品', function: '结金主药' },
      { name: '千年灵芝', quantity: 1, quality: '上品', function: '增强药效' },
      { name: '龙血果', quantity: 1, quality: '上品', function: '强化经脉' },
      { name: '凤凰血', quantity: 10, quality: '上品', function: '凝聚金丹' },
      { name: '天雷果', quantity: 1, quality: '中品', function: '淬炼金丹' }
    ],
    process: [
      { step: 1, description: '将所有药材分别处理', timeRequired: 60, technique: '处理药材' },
      { step: 2, description: '将灵泉水注入丹炉，加热至沸腾', timeRequired: 20, temperature: '100度', technique: '加热' },
      { step: 3, description: '加入结金草，以文火炼化', timeRequired: 120, temperature: '200度', technique: '炼化' },
      { step: 4, description: '加入千年灵芝，继续炼化', timeRequired: 120, temperature: '200度', technique: '炼化' },
      { step: 5, description: '加入龙血果，继续炼化', timeRequired: 120, temperature: '200度', technique: '炼化' },
      { step: 6, description: '加入凤凰血，继续炼化', timeRequired: 120, temperature: '200度', technique: '炼化' },
      { step: 7, description: '加入天雷果，继续炼化', timeRequired: 120, temperature: '200度', technique: '炼化' },
      { step: 8, description: '以武火收丹，凝聚丹药', timeRequired: 60, temperature: '500度', technique: '收丹' },
      { step: 9, description: '取出丹药，晾干', timeRequired: 240, technique: '晾干' }
    ],
    result: {
      name: '结金丹',
      quantity: 1,
      quality: '上品',
      effects: ['帮助突破结丹期', '凝聚金丹', '强化经脉'],
      duration: 1
    },
    requirements: {
      minRealm: '结丹期',
      minSkillLevel: 7,
      requiredTools: ['丹炉', '丹火'],
      requiredKnowledge: ['高级丹道', '结金丹方'],
      requiredEnvironment: '灵气充沛之地'
    },
    successRate: 0.3,
    variations: [
      {
        name: '极品结金丹',
        description: '使用极品材料炼制的结金丹',
        materialChanges: ['所有材料品质提升为极品'],
        effectChanges: ['效果提升50%', '成功率提升30%']
      }
    ],
    currentUsers: ['高级丹修', '大宗门'],
    potency: 5000,
    toxicity: 30,
    addiction: 0,
    contraindications: ['筑基期以下修士禁用', '结丹期以上修士无效']
  },
  {
    id: 'recipe_pill_nascent_soul',
    name: '凝婴丹',
    type: 'pill',
    pillType: 'cultivation',
    rank: 'heaven',
    description: `元婴期修士最重要的丹药，可以帮助结丹期大圆满修士突破到元婴期。凝婴丹是修仙界最重要的丹药之一，价值极高。

凝婴丹效果强大，但炼制难度极高。需要多种极其珍贵的材料，且炼制过程极其复杂。`,
    history: `凝婴丹的起源已不可考，据说是上古时期某位丹道大师所创。经过数千年的发展，凝婴丹已经成为修仙界最重要的丹药之一。`,
    materials: [
      { name: '凝婴草', quantity: 1, quality: '极品', function: '凝婴主药' },
      { name: '万年人参', quantity: 1, quality: '极品', function: '增强药效' },
      { name: '龙髓', quantity: 10, quality: '极品', function: '凝聚元婴' },
      { name: '凤凰髓', quantity: 10, quality: '极品', function: '凝聚元婴' },
      { name: '天劫雷液', quantity: 1, quality: '极品', function: '淬炼元婴' }
    ],
    process: [
      { step: 1, description: '将所有药材分别处理', timeRequired: 120, technique: '处理药材' },
      { step: 2, description: '将灵泉水注入丹炉，加热至沸腾', timeRequired: 30, temperature: '100度', technique: '加热' },
      { step: 3, description: '加入凝婴草，以文火炼化', timeRequired: 240, temperature: '300度', technique: '炼化' },
      { step: 4, description: '加入万年人参，继续炼化', timeRequired: 240, temperature: '300度', technique: '炼化' },
      { step: 5, description: '加入龙髓，继续炼化', timeRequired: 240, temperature: '300度', technique: '炼化' },
      { step: 6, description: '加入凤凰髓，继续炼化', timeRequired: 240, temperature: '300度', technique: '炼化' },
      { step: 7, description: '加入天劫雷液，继续炼化', timeRequired: 240, temperature: '300度', technique: '炼化' },
      { step: 8, description: '以武火收丹，凝聚丹药', timeRequired: 120, temperature: '800度', technique: '收丹' },
      { step: 9, description: '取出丹药，晾干', timeRequired: 480, technique: '晾干' }
    ],
    result: {
      name: '凝婴丹',
      quantity: 1,
      quality: '极品',
      effects: ['帮助突破元婴期', '凝聚元婴', '强化神魂'],
      duration: 1
    },
    requirements: {
      minRealm: '元婴期',
      minSkillLevel: 9,
      requiredTools: ['丹炉', '丹火'],
      requiredKnowledge: ['大师级丹道', '凝婴丹方'],
      requiredEnvironment: '灵气充沛之地'
    },
    successRate: 0.2,
    variations: [],
    currentUsers: ['丹道大师', '顶尖宗门'],
    potency: 20000,
    toxicity: 50,
    addiction: 0,
    contraindications: ['结丹期以下修士禁用', '元婴期以上修士无效']
  },
  {
    id: 'recipe_pill_healing',
    name: '疗伤丹',
    type: 'pill',
    pillType: 'healing',
    rank: 'mortal',
    description: `最基础的治疗丹药，可以帮助修士快速恢复伤势。疗伤丹是修仙界最常见的丹药之一，几乎所有丹修都会炼制。

疗伤丹效果温和，适合各种伤势使用。`,
    history: `疗伤丹的起源已不可考，据说是上古时期某位丹道大师所创。经过数千年的发展，疗伤丹已经成为修仙界最普及的丹药之一。`,
    materials: [
      { name: '疗伤草', quantity: 1, quality: '下品', function: '治疗主药', substitutes: ['灵草'] },
      { name: '灵泉水', quantity: 10, quality: '下品', function: '调和药性' },
      { name: '白芍', quantity: 1, quality: '凡品', function: '止血' }
    ],
    process: [
      { step: 1, description: '将疗伤草、白芍分别处理', timeRequired: 5, technique: '处理药材' },
      { step: 2, description: '将灵泉水注入丹炉，加热', timeRequired: 10, temperature: '100度', technique: '加热' },
      { step: 3, description: '加入疗伤草，炼化', timeRequired: 30, temperature: '150度', technique: '炼化' },
      { step: 4, description: '加入白芍，继续炼化', timeRequired: 15, temperature: '150度', technique: '炼化' },
      { step: 5, description: '收丹', timeRequired: 5, temperature: '200度', technique: '收丹' },
      { step: 6, description: '取出丹药，晾干', timeRequired: 60, technique: '晾干' }
    ],
    result: {
      name: '疗伤丹',
      quantity: 1,
      quality: '下品',
      effects: ['快速恢复伤势', '止血'],
      duration: 1
    },
    requirements: {
      minRealm: '炼气期',
      minSkillLevel: 1,
      requiredTools: ['丹炉', '丹火'],
      requiredKnowledge: ['基础丹道']
    },
    successRate: 0.9,
    variations: [
      {
        name: '中品疗伤丹',
        description: '使用中品材料炼制的疗伤丹',
        materialChanges: ['疗伤草品质提升为中品'],
        effectChanges: ['效果提升50%']
      },
      {
        name: '上品疗伤丹',
        description: '使用上品材料炼制的疗伤丹',
        materialChanges: ['疗伤草品质提升为上品'],
        effectChanges: ['效果提升100%']
      }
    ],
    currentUsers: ['所有丹修'],
    potency: 100,
    toxicity: 0,
    addiction: 0,
    contraindications: []
  },
  {
    id: 'recipe_pill_spirit_recovery',
    name: '回灵丹',
    type: 'pill',
    pillType: 'enhancement',
    rank: 'mortal',
    description: `最基础的恢复灵力丹药，可以帮助修士快速恢复消耗的灵力。回灵丹是修仙界最常见的丹药之一，几乎所有丹修都会炼制。

回灵丹效果温和，适合各种情况使用。`,
    history: `回灵丹的起源已不可考，据说是上古时期某位丹道大师所创。经过数千年的发展，回灵丹已经成为修仙界最普及的丹药之一。`,
    materials: [
      { name: '回灵草', quantity: 1, quality: '下品', function: '恢复灵力主药' },
      { name: '灵泉水', quantity: 10, quality: '下品', function: '调和药性' },
      { name: '甘草', quantity: 1, quality: '凡品', function: '中和药性' }
    ],
    process: [
      { step: 1, description: '将回灵草、甘草分别处理', timeRequired: 5, technique: '处理药材' },
      { step: 2, description: '将灵泉水注入丹炉，加热', timeRequired: 10, temperature: '100度', technique: '加热' },
      { step: 3, description: '加入回灵草，炼化', timeRequired: 30, temperature: '150度', technique: '炼化' },
      { step: 4, description: '加入甘草，继续炼化', timeRequired: 15, temperature: '150度', technique: '炼化' },
      { step: 5, description: '收丹', timeRequired: 5, temperature: '200度', technique: '收丹' },
      { step: 6, description: '取出丹药，晾干', timeRequired: 60, technique: '晾干' }
    ],
    result: {
      name: '回灵丹',
      quantity: 1,
      quality: '下品',
      effects: ['快速恢复灵力'],
      duration: 1
    },
    requirements: {
      minRealm: '炼气期',
      minSkillLevel: 1,
      requiredTools: ['丹炉', '丹火'],
      requiredKnowledge: ['基础丹道']
    },
    successRate: 0.9,
    variations: [
      {
        name: '中品回灵丹',
        description: '使用中品材料炼制的回灵丹',
        materialChanges: ['回灵草品质提升为中品'],
        effectChanges: ['效果提升50%']
      },
      {
        name: '上品回灵丹',
        description: '使用上品材料炼制的回灵丹',
        materialChanges: ['回灵草品质提升为上品'],
        effectChanges: ['效果提升100%']
      }
    ],
    currentUsers: ['所有丹修'],
    potency: 100,
    toxicity: 0,
    addiction: 0,
    contraindications: []
  },
  {
    id: 'recipe_pill_detoxification',
    name: '解毒丹',
    type: 'pill',
    pillType: 'detoxification',
    rank: 'spirit',
    description: `专门用于解毒的丹药，可以解除大部分常见毒素。解毒丹是修仙界最常见的丹药之一，几乎所有丹修都会炼制。

解毒丹效果强大，但对特殊毒素效果有限。`,
    history: `解毒丹的起源已不可考，据说是上古时期某位丹道大师所创。经过数千年的发展，解毒丹已经成为修仙界最普及的丹药之一。`,
    materials: [
      { name: '解毒草', quantity: 1, quality: '中品', function: '解毒主药' },
      { name: '灵泉水', quantity: 50, quality: '中品', function: '调和药性' },
      { name: '雄黄', quantity: 1, quality: '凡品', function: '增强解毒效果' },
      { name: '甘草', quantity: 1, quality: '凡品', function: '中和药性' }
    ],
    process: [
      { step: 1, description: '将解毒草、雄黄、甘草分别处理', timeRequired: 10, technique: '处理药材' },
      { step: 2, description: '将灵泉水注入丹炉，加热', timeRequired: 15, temperature: '100度', technique: '加热' },
      { step: 3, description: '加入解毒草，炼化', timeRequired: 45, temperature: '150度', technique: '炼化' },
      { step: 4, description: '加入雄黄，继续炼化', timeRequired: 30, temperature: '150度', technique: '炼化' },
      { step: 5, description: '加入甘草，继续炼化', timeRequired: 15, temperature: '150度', technique: '炼化' },
      { step: 6, description: '收丹', timeRequired: 10, temperature: '200度', technique: '收丹' },
      { step: 7, description: '取出丹药，晾干', timeRequired: 90, technique: '晾干' }
    ],
    result: {
      name: '解毒丹',
      quantity: 1,
      quality: '中品',
      effects: ['解除常见毒素', '净化血液'],
      duration: 1
    },
    requirements: {
      minRealm: '炼气期',
      minSkillLevel: 3,
      requiredTools: ['丹炉', '丹火'],
      requiredKnowledge: ['基础丹道', '毒理学']
    },
    successRate: 0.8,
    variations: [
      {
        name: '上品解毒丹',
        description: '使用上品材料炼制的解毒丹',
        materialChanges: ['解毒草品质提升为上品'],
        effectChanges: ['效果提升50%', '可以解除更多毒素']
      }
    ],
    currentUsers: ['所有丹修'],
    potency: 500,
    toxicity: 0,
    addiction: 0,
    contraindications: ['对特殊毒素效果有限']
  },
  {
    id: 'recipe_pill_longevity',
    name: '延寿丹',
    type: 'pill',
    pillType: 'special',
    rank: 'heaven',
    description: `可以延长修士寿命的丹药，是修仙界最珍贵的丹药之一。延寿丹效果强大，但炼制难度极高。

延寿丹可以延长修士寿命百年以上，是所有修士梦寐以求的丹药。`,
    history: `延寿丹的起源已不可考，据说是上古时期某位丹道大师所创。经过数千年的发展，延寿丹已经成为修仙界最珍贵的丹药之一。`,
    materials: [
      { name: '延寿草', quantity: 1, quality: '极品', function: '延寿主药' },
      { name: '万年人参', quantity: 1, quality: '极品', function: '增强药效' },
      { name: '龙血', quantity: 100, quality: '极品', function: '强化生命' },
      { name: '凤凰血', quantity: 100, quality: '极品', function: '强化生命' },
      { name: '天寿果', quantity: 1, quality: '极品', function: '延长寿命' }
    ],
    process: [
      { step: 1, description: '将所有药材分别处理', timeRequired: 120, technique: '处理药材' },
      { step: 2, description: '将灵泉水注入丹炉，加热', timeRequired: 30, temperature: '100度', technique: '加热' },
      { step: 3, description: '加入延寿草，炼化', timeRequired: 240, temperature: '300度', technique: '炼化' },
      { step: 4, description: '加入万年人参，继续炼化', timeRequired: 240, temperature: '300度', technique: '炼化' },
      { step: 5, description: '加入龙血，继续炼化', timeRequired: 240, temperature: '300度', technique: '炼化' },
      { step: 6, description: '加入凤凰血，继续炼化', timeRequired: 240, temperature: '300度', technique: '炼化' },
      { step: 7, description: '加入天寿果，继续炼化', timeRequired: 240, temperature: '300度', technique: '炼化' },
      { step: 8, description: '收丹', timeRequired: 120, temperature: '800度', technique: '收丹' },
      { step: 9, description: '取出丹药，晾干', timeRequired: 480, technique: '晾干' }
    ],
    result: {
      name: '延寿丹',
      quantity: 1,
      quality: '极品',
      effects: ['延长寿命百年', '强化生命', '延缓衰老'],
      duration: 1
    },
    requirements: {
      minRealm: '元婴期',
      minSkillLevel: 10,
      requiredTools: ['丹炉', '丹火'],
      requiredKnowledge: ['大师级丹道', '延寿丹方', '生命之道'],
      requiredEnvironment: '灵气充沛之地'
    },
    successRate: 0.1,
    variations: [],
    currentUsers: ['丹道大师', '顶尖宗门'],
    potency: 50000,
    toxicity: 0,
    addiction: 0,
    contraindications: ['一生只能服用一次', '元婴期以下修士禁用']
  }
]

export const artifactRecipes: ArtifactRecipe[] = [
  {
    id: 'recipe_artifact_spirit_sword',
    name: '灵剑',
    type: 'artifact',
    artifactType: 'weapon',
    rank: 'spirit',
    description: `最基础的灵剑，是修士最常用的武器之一。灵剑可以注入灵力，威力远超凡剑。

灵剑是修士必备的武器之一，几乎所有器修都会炼制。`,
    history: `灵剑的起源已不可考，据说是上古时期某位器道大师所创。经过数千年的发展，灵剑已经成为修仙界最普及的武器之一。`,
    materials: [
      { name: '玄铁', quantity: 10, quality: '中品', function: '剑身主材' },
      { name: '灵石', quantity: 5, quality: '中品', function: '注入灵力' },
      { name: '天蚕丝', quantity: 1, quality: '下品', function: '剑柄' }
    ],
    process: [
      { step: 1, description: '将玄铁熔化', timeRequired: 60, temperature: '1500度', technique: '熔炼' },
      { step: 2, description: '锻造成剑形', timeRequired: 120, temperature: '1000度', technique: '锻造' },
      { step: 3, description: '淬火', timeRequired: 30, technique: '淬火' },
      { step: 4, description: '注入灵石灵力', timeRequired: 60, technique: '注灵' },
      { step: 5, description: '安装剑柄', timeRequired: 30, technique: '组装' },
      { step: 6, description: '打磨抛光', timeRequired: 60, technique: '打磨' }
    ],
    result: {
      name: '灵剑',
      quantity: 1,
      quality: '中品',
      effects: ['注入灵力', '剑气攻击', '御剑飞行']
    },
    requirements: {
      minRealm: '筑基期',
      minSkillLevel: 3,
      requiredTools: ['炼器炉', '锻造锤', '淬火池'],
      requiredKnowledge: ['基础器道']
    },
    successRate: 0.7,
    variations: [
      {
        name: '上品灵剑',
        description: '使用上品材料炼制的灵剑',
        materialChanges: ['玄铁品质提升为上品', '灵石品质提升为上品'],
        effectChanges: ['威力提升50%']
      }
    ],
    currentUsers: ['所有器修'],
    power: 500,
    durability: 1000,
    specialAbilities: ['剑气攻击', '御剑飞行'],
    refinementMethod: '灵力注入'
  },
  {
    id: 'recipe_artifact_spirit_armor',
    name: '灵甲',
    type: 'artifact',
    artifactType: 'armor',
    rank: 'spirit',
    description: `最基础的灵甲，是修士最常用的防具之一。灵甲可以抵御攻击，保护修士安全。

灵甲是修士必备的防具之一，几乎所有器修都会炼制。`,
    history: `灵甲的起源已不可考，据说是上古时期某位器道大师所创。经过数千年的发展，灵甲已经成为修仙界最普及的防具之一。`,
    materials: [
      { name: '玄铁', quantity: 20, quality: '中品', function: '甲身主材' },
      { name: '灵石', quantity: 10, quality: '中品', function: '注入灵力' },
      { name: '天蚕丝', quantity: 5, quality: '下品', function: '连接' }
    ],
    process: [
      { step: 1, description: '将玄铁熔化', timeRequired: 120, temperature: '1500度', technique: '熔炼' },
      { step: 2, description: '锻造成甲片', timeRequired: 240, temperature: '1000度', technique: '锻造' },
      { step: 3, description: '淬火', timeRequired: 60, technique: '淬火' },
      { step: 4, description: '注入灵石灵力', timeRequired: 120, technique: '注灵' },
      { step: 5, description: '用天蚕丝连接甲片', timeRequired: 60, technique: '组装' },
      { step: 6, description: '打磨抛光', timeRequired: 60, technique: '打磨' }
    ],
    result: {
      name: '灵甲',
      quantity: 1,
      quality: '中品',
      effects: ['抵御攻击', '灵力护盾']
    },
    requirements: {
      minRealm: '筑基期',
      minSkillLevel: 3,
      requiredTools: ['炼器炉', '锻造锤', '淬火池'],
      requiredKnowledge: ['基础器道']
    },
    successRate: 0.7,
    variations: [
      {
        name: '上品灵甲',
        description: '使用上品材料炼制的灵甲',
        materialChanges: ['玄铁品质提升为上品', '灵石品质提升为上品'],
        effectChanges: ['防御力提升50%']
      }
    ],
    currentUsers: ['所有器修'],
    power: 400,
    durability: 1500,
    specialAbilities: ['灵力护盾'],
    refinementMethod: '灵力注入'
  },
  {
    id: 'recipe_artifact_flying_sword',
    name: '飞剑',
    type: 'artifact',
    artifactType: 'weapon',
    rank: 'earth',
    description: `可以御剑飞行的灵剑，是修士最重要的武器之一。飞剑威力强大，可以远程攻击敌人。

飞剑是筑基期以上修士必备的武器之一。`,
    history: `飞剑的起源已不可考，据说是上古时期某位器道大师所创。经过数千年的发展，飞剑已经成为修仙界最重要的武器之一。`,
    materials: [
      { name: '玄铁', quantity: 20, quality: '上品', function: '剑身主材' },
      { name: '灵石', quantity: 10, quality: '上品', function: '注入灵力' },
      { name: '飞行石', quantity: 1, quality: '上品', function: '赋予飞行能力' },
      { name: '天蚕丝', quantity: 1, quality: '中品', function: '剑柄' }
    ],
    process: [
      { step: 1, description: '将玄铁熔化', timeRequired: 120, temperature: '2000度', technique: '熔炼' },
      { step: 2, description: '锻造成剑形', timeRequired: 240, temperature: '1500度', technique: '锻造' },
      { step: 3, description: '淬火', timeRequired: 60, technique: '淬火' },
      { step: 4, description: '注入飞行石', timeRequired: 120, technique: '注灵' },
      { step: 5, description: '注入灵石灵力', timeRequired: 120, technique: '注灵' },
      { step: 6, description: '安装剑柄', timeRequired: 30, technique: '组装' },
      { step: 7, description: '打磨抛光', timeRequired: 120, technique: '打磨' }
    ],
    result: {
      name: '飞剑',
      quantity: 1,
      quality: '上品',
      effects: ['御剑飞行', '远程攻击', '剑气攻击']
    },
    requirements: {
      minRealm: '筑基期',
      minSkillLevel: 5,
      requiredTools: ['炼器炉', '锻造锤', '淬火池'],
      requiredKnowledge: ['中级器道', '飞行之道']
    },
    successRate: 0.5,
    variations: [
      {
        name: '极品飞剑',
        description: '使用极品材料炼制的飞剑',
        materialChanges: ['所有材料品质提升为极品'],
        effectChanges: ['威力提升100%', '飞行速度提升50%']
      }
    ],
    currentUsers: ['所有器修', '所有筑基期以上修士'],
    power: 2000,
    durability: 3000,
    specialAbilities: ['御剑飞行', '远程攻击', '剑气攻击'],
    refinementMethod: '灵力注入'
  },
  {
    id: 'recipe_artifact_magic_treasure',
    name: '法宝',
    type: 'artifact',
    artifactType: 'weapon',
    rank: 'heaven',
    description: `结丹期以上修士才能使用的法宝，威力巨大。法宝可以收入体内温养，威力会随着时间增长。

法宝是结丹期以上修士最重要的武器之一。`,
    history: `法宝的起源已不可考，据说是上古时期某位器道大师所创。经过数千年的发展，法宝已经成为修仙界最重要的武器之一。`,
    materials: [
      { name: '天铁', quantity: 50, quality: '极品', function: '法宝主材' },
      { name: '灵石', quantity: 100, quality: '极品', function: '注入灵力' },
      { name: '天材地宝', quantity: 1, quality: '极品', function: '赋予特殊能力' },
      { name: '器灵', quantity: 1, quality: '极品', function: '赋予器灵' }
    ],
    process: [
      { step: 1, description: '将天铁熔化', timeRequired: 240, temperature: '3000度', technique: '熔炼' },
      { step: 2, description: '锻造成形', timeRequired: 480, temperature: '2000度', technique: '锻造' },
      { step: 3, description: '淬火', timeRequired: 120, technique: '淬火' },
      { step: 4, description: '注入天材地宝', timeRequired: 240, technique: '注灵' },
      { step: 5, description: '注入器灵', timeRequired: 240, technique: '注灵' },
      { step: 6, description: '注入灵石灵力', timeRequired: 480, technique: '注灵' },
      { step: 7, description: '打磨抛光', timeRequired: 240, technique: '打磨' },
      { step: 8, description: '认主', timeRequired: 60, technique: '认主' }
    ],
    result: {
      name: '法宝',
      quantity: 1,
      quality: '极品',
      effects: ['收入体内', '威力巨大', '特殊能力']
    },
    requirements: {
      minRealm: '结丹期',
      minSkillLevel: 8,
      requiredTools: ['炼器炉', '锻造锤', '淬火池'],
      requiredKnowledge: ['高级器道', '法宝炼制'],
      requiredEnvironment: '灵气充沛之地'
    },
    successRate: 0.3,
    variations: [],
    currentUsers: ['高级器修', '结丹期以上修士'],
    power: 10000,
    durability: 10000,
    specialAbilities: ['收入体内', '特殊能力', '器灵辅助'],
    refinementMethod: '体内温养'
  }
]

export const formationRecipes: FormationRecipe[] = [
  {
    id: 'recipe_formation_spirit_gathering',
    name: '聚灵阵',
    type: 'formation',
    formationType: 'gathering',
    rank: 'mortal',
    description: `最基础的聚灵阵，可以聚集天地灵气，提高修炼效率。聚灵阵是修士最常用的阵法之一。

聚灵阵是所有阵法的基础，几乎所有阵法师都会布置。`,
    history: `聚灵阵的起源已不可考，据说是上古时期某位阵法大师所创。经过数千年的发展，聚灵阵已经成为修仙界最普及的阵法之一。`,
    materials: [
      { name: '聚灵阵旗', quantity: 12, quality: '下品', function: '引导灵气' },
      { name: '聚灵石', quantity: 10, quality: '下品', function: '聚集灵气' }
    ],
    process: [
      { step: 1, description: '选择合适的位置', timeRequired: 10, technique: '选址' },
      { step: 2, description: '在十二方位插入聚灵阵旗', timeRequired: 30, technique: '布阵' },
      { step: 3, description: '在阵法中心放置聚灵石', timeRequired: 10, technique: '布阵' },
      { step: 4, description: '注入灵力激活阵法', timeRequired: 5, technique: '激活' }
    ],
    result: {
      name: '聚灵阵',
      quantity: 1,
      quality: '下品',
      effects: ['聚集灵气', '提高修炼效率']
    },
    requirements: {
      minRealm: '炼气期',
      minSkillLevel: 1,
      requiredTools: [],
      requiredKnowledge: ['基础阵法']
    },
    successRate: 0.9,
    variations: [
      {
        name: '聚灵中阵',
        description: '中型聚灵阵',
        materialChanges: ['聚灵阵旗数量增加', '聚灵石数量增加'],
        effectChanges: ['范围增大', '效果增强']
      },
      {
        name: '聚灵大阵',
        description: '大型聚灵阵',
        materialChanges: ['聚灵阵旗数量大幅增加', '聚灵石数量大幅增加'],
        effectChanges: ['范围大幅增大', '效果大幅增强']
      }
    ],
    currentUsers: ['所有阵法师'],
    power: 100,
    range: 100,
    duration: -1
  },
  {
    id: 'recipe_formation_concealment',
    name: '隐匿阵',
    type: 'formation',
    formationType: 'concealment',
    rank: 'earth',
    description: `可以隐藏目标的阵法，是修士最常用的阵法之一。隐匿阵可以隐藏洞府、宝物等。

隐匿阵是所有阵法的基础之一，几乎所有阵法师都会布置。`,
    history: `隐匿阵的起源已不可考，据说是上古时期某位阵法大师所创。经过数千年的发展，隐匿阵已经成为修仙界最普及的阵法之一。`,
    materials: [
      { name: '隐匿阵旗', quantity: 8, quality: '中品', function: '引导隐匿之力' },
      { name: '隐匿石', quantity: 5, quality: '中品', function: '提供隐匿之力' }
    ],
    process: [
      { step: 1, description: '选择合适的位置', timeRequired: 10, technique: '选址' },
      { step: 2, description: '在八方方位插入隐匿阵旗', timeRequired: 20, technique: '布阵' },
      { step: 3, description: '在阵法中心放置隐匿石', timeRequired: 10, technique: '布阵' },
      { step: 4, description: '注入灵力激活阵法', timeRequired: 5, technique: '激活' }
    ],
    result: {
      name: '隐匿阵',
      quantity: 1,
      quality: '中品',
      effects: ['隐藏目标', '防止被发现']
    },
    requirements: {
      minRealm: '炼气期',
      minSkillLevel: 2,
      requiredTools: [],
      requiredKnowledge: ['基础阵法', '隐匿之道']
    },
    successRate: 0.8,
    variations: [],
    currentUsers: ['所有阵法师'],
    power: 500,
    range: 100,
    duration: -1
  },
  {
    id: 'recipe_formation_trap',
    name: '困阵',
    type: 'formation',
    formationType: 'trap',
    rank: 'earth',
    description: `可以困住敌人的阵法，是修士最常用的阵法之一。困阵可以困住敌人，为修士争取时间。

困阵是所有阵法的基础之一，几乎所有阵法师都会布置。`,
    history: `困阵的起源已不可考，据说是上古时期某位阵法大师所创。经过数千年的发展，困阵已经成为修仙界最普及的阵法之一。`,
    materials: [
      { name: '困阵旗', quantity: 24, quality: '中品', function: '引导困敌之力' },
      { name: '困敌石', quantity: 5, quality: '中品', function: '提供困敌之力' }
    ],
    process: [
      { step: 1, description: '选择合适的位置', timeRequired: 10, technique: '选址' },
      { step: 2, description: '在二十四方位插入困阵旗', timeRequired: 60, technique: '布阵' },
      { step: 3, description: '在阵法中心放置困敌石', timeRequired: 10, technique: '布阵' },
      { step: 4, description: '注入灵力激活阵法', timeRequired: 10, technique: '激活' }
    ],
    result: {
      name: '困阵',
      quantity: 1,
      quality: '中品',
      effects: ['困住敌人', '防止逃脱']
    },
    requirements: {
      minRealm: '筑基期',
      minSkillLevel: 3,
      requiredTools: [],
      requiredKnowledge: ['基础阵法', '困敌之道']
    },
    successRate: 0.7,
    variations: [
      {
        name: '迷踪阵',
        description: '让敌人迷失方向',
        materialChanges: ['困阵旗替换为迷踪阵旗'],
        effectChanges: ['迷踪效果']
      },
      {
        name: '幻阵',
        description: '让敌人陷入幻境',
        materialChanges: ['困阵旗替换为幻阵旗'],
        effectChanges: ['幻境效果']
      }
    ],
    currentUsers: ['所有阵法师'],
    power: 2000,
    range: 500,
    duration: -1
  }
]

export const talismanRecipes: TalismanRecipe[] = [
  {
    id: 'recipe_talisman_fireball',
    name: '火球符',
    type: 'talisman',
    talismanType: 'attack',
    rank: 'mortal',
    description: `最基础的攻击符箓，可以发射火球攻击敌人。火球符是修士最常用的符箓之一。

火球符威力不大，但胜在制作简单，使用方便。`,
    history: `火球符的起源已不可考，据说是上古时期某位符箓大师所创。经过数千年的发展，火球符已经成为修仙界最普及的符箓之一。`,
    materials: [
      { name: '符纸', quantity: 1, quality: '下品', function: '符箓载体' },
      { name: '朱砂', quantity: 1, quality: '下品', function: '绘制符文' },
      { name: '火灵石粉末', quantity: 1, quality: '下品', function: '赋予火属性' }
    ],
    process: [
      { step: 1, description: '准备符纸', timeRequired: 1, technique: '准备' },
      { step: 2, description: '用朱砂绘制火球符文', timeRequired: 5, technique: '绘制' },
      { step: 3, description: '撒上火灵石粉末', timeRequired: 1, technique: '注灵' },
      { step: 4, description: '注入灵力激活', timeRequired: 1, technique: '激活' }
    ],
    result: {
      name: '火球符',
      quantity: 1,
      quality: '下品',
      effects: ['发射火球']
    },
    requirements: {
      minRealm: '炼气期',
      minSkillLevel: 1,
      requiredTools: ['符笔'],
      requiredKnowledge: ['基础符箓']
    },
    successRate: 0.9,
    variations: [
      {
        name: '中品火球符',
        description: '使用中品材料制作的火球符',
        materialChanges: ['所有材料品质提升为中品'],
        effectChanges: ['威力提升50%']
      }
    ],
    currentUsers: ['所有符箓师'],
    power: 100,
    uses: 1
  },
  {
    id: 'recipe_talisman_shield',
    name: '护身符',
    type: 'talisman',
    talismanType: 'defense',
    rank: 'mortal',
    description: `最基础的防御符箓，可以形成护盾保护修士。护身符是修士最常用的符箓之一。

护身符防御力不强，但胜在制作简单，使用方便。`,
    history: `护身符的起源已不可考，据说是上古时期某位符箓大师所创。经过数千年的发展，护身符已经成为修仙界最普及的符箓之一。`,
    materials: [
      { name: '符纸', quantity: 1, quality: '下品', function: '符箓载体' },
      { name: '朱砂', quantity: 1, quality: '下品', function: '绘制符文' },
      { name: '土灵石粉末', quantity: 1, quality: '下品', function: '赋予土属性' }
    ],
    process: [
      { step: 1, description: '准备符纸', timeRequired: 1, technique: '准备' },
      { step: 2, description: '用朱砂绘制护身符文', timeRequired: 5, technique: '绘制' },
      { step: 3, description: '撒上土灵石粉末', timeRequired: 1, technique: '注灵' },
      { step: 4, description: '注入灵力激活', timeRequired: 1, technique: '激活' }
    ],
    result: {
      name: '护身符',
      quantity: 1,
      quality: '下品',
      effects: ['形成护盾']
    },
    requirements: {
      minRealm: '炼气期',
      minSkillLevel: 1,
      requiredTools: ['符笔'],
      requiredKnowledge: ['基础符箓']
    },
    successRate: 0.9,
    variations: [
      {
        name: '中品护身符',
        description: '使用中品材料制作的护身符',
        materialChanges: ['所有材料品质提升为中品'],
        effectChanges: ['防御力提升50%']
      }
    ],
    currentUsers: ['所有符箓师'],
    power: 80,
    uses: 1
  },
  {
    id: 'recipe_talisman_lightning',
    name: '雷击符',
    type: 'talisman',
    talismanType: 'attack',
    rank: 'spirit',
    description: `中级攻击符箓，可以召唤雷电攻击敌人。雷击符威力强大，是筑基期修士常用的符箓。

雷击符威力较大，但制作难度也较高。`,
    history: `雷击符的起源已不可考，据说是上古时期某位符箓大师所创。经过数千年的发展，雷击符已经成为修仙界重要的符箓之一。`,
    materials: [
      { name: '符纸', quantity: 1, quality: '中品', function: '符箓载体' },
      { name: '朱砂', quantity: 1, quality: '中品', function: '绘制符文' },
      { name: '雷灵石粉末', quantity: 1, quality: '中品', function: '赋予雷属性' }
    ],
    process: [
      { step: 1, description: '准备符纸', timeRequired: 1, technique: '准备' },
      { step: 2, description: '用朱砂绘制雷击符文', timeRequired: 10, technique: '绘制' },
      { step: 3, description: '撒上雷灵石粉末', timeRequired: 1, technique: '注灵' },
      { step: 4, description: '注入灵力激活', timeRequired: 2, technique: '激活' }
    ],
    result: {
      name: '雷击符',
      quantity: 1,
      quality: '中品',
      effects: ['召唤雷电攻击']
    },
    requirements: {
      minRealm: '筑基期',
      minSkillLevel: 3,
      requiredTools: ['符笔'],
      requiredKnowledge: ['中级符箓', '雷道']
    },
    successRate: 0.7,
    variations: [
      {
        name: '上品雷击符',
        description: '使用上品材料制作的雷击符',
        materialChanges: ['所有材料品质提升为上品'],
        effectChanges: ['威力提升100%']
      }
    ],
    currentUsers: ['所有符箓师', '筑基期以上修士'],
    power: 500,
    uses: 1
  }
]

export const allRecipes: Recipe[] = [
  ...pillRecipes,
  ...artifactRecipes,
  ...formationRecipes,
  ...talismanRecipes
]