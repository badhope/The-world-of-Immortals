import { CultivationRealm, CultivationStage, SpiritualRoot, DaoHeart } from './cultivationSystem'

export interface ExtendedCultivationRealm extends CultivationRealm {
  subRealms?: ExtendedCultivationRealm[]
  specialConditions?: string[]
  cultivationMethods?: string[]
  forbiddenMethods?: string[]
  breakthroughItems?: BreakthroughItem[]
  specialAbilities?: string[]
  daoHeartRequirements?: string[]
  karmaEffects?: string[]
  realmSecrets?: string[]
  historicalFigures?: string[]
  commonBottlenecks?: string[]
  breakthroughTechniques?: string[]
}

export interface BreakthroughItem {
  id: string
  name: string
  type: 'essential' | 'helpful' | 'optional'
  effect: string
  successRateBonus: number
  source: string
  price: number
}

export interface SpecialPhysique {
  id: string
  name: string
  type: 'heavenly' | 'earthly' | 'mystic' | 'divine' | 'chaos' | 'mutated' | 'forbidden'
  rank: number
  description: string
  origin: string
  history: string
  abilities: string[]
  cultivationBonus: { [key: string]: number }
  weaknesses: string[]
  awakeningConditions: string[]
  inheritanceRate: number
  currentHolders: number
  maxRealm: string
  specialFeatures: string[]
  cultivationMethods: string[]
  forbiddenMethods: string[]
  evolutionPath?: PhysiqueEvolution[]
  relatedPhysiques?: string[]
}

export interface PhysiqueEvolution {
  stage: string
  name: string
  requiredRealm: string
  requiredItems: string[]
  abilities: string[]
  description: string
}

export interface SpecialTalent {
  id: string
  name: string
  type: 'combat' | 'cultivation' | 'auxiliary' | 'special' | 'forbidden'
  rank: number
  description: string
  origin: string
  effects: TalentEffect[]
  awakeningConditions: string[]
  inheritanceRate: number
  currentHolders: number
  cultivationBonus?: { [key: string]: number }
  conflicts?: string[]
  synergies?: string[]
}

export interface TalentEffect {
  name: string
  description: string
  value: number | string
  conditions?: string[]
}

export interface ExtendedSpiritualRoot extends SpiritualRoot {
  subRoots?: ExtendedSpiritualRoot[]
  evolutionPath?: RootEvolution[]
  cultivationMethods?: string[]
  forbiddenMethods?: string[]
  specialAbilities?: string[]
  awakeningConditions?: string[]
  historicalHolders?: string[]
}

export interface RootEvolution {
  stage: string
  name: string
  requiredRealm: string
  requiredItems: string[]
  abilities: string[]
  qualityBonus: number
  description: string
}

export interface DaoHeartLevel {
  id: string
  name: string
  level: number
  description: string
  effects: {
    cultivationBonus: number
    tribulationBonus: number
    mentalResistance: number
    karmaReduction: number
    specialEffects: string[]
  }
  requirements: string[]
  breakthroughMethod: string
  historicalHolders: string[]
}

export interface Karma {
  id: string
  name: string
  type: 'good' | 'evil' | 'neutral' | 'heavenly' | 'demonic'
  description: string
  effects: KarmaEffect[]
  accumulation: string
  reduction: string
  consequences: string[]
}

export interface KarmaEffect {
  name: string
  description: string
  value: number
  triggerCondition?: string
}

export interface SoulType {
  id: string
  name: string
  type: 'mortal' | 'spiritual' | 'immortal' | 'divine' | 'chaos' | 'special'
  rank: number
  description: string
  abilities: string[]
  cultivationBonus: { [key: string]: number }
  reincarnationMemory: number
  soulStrength: number
  specialFeatures: string[]
}

export interface Constitution {
  id: string
  name: string
  type: 'mortal' | 'spiritual' | 'immortal' | 'divine' | 'chaos' | 'special'
  rank: number
  description: string
  abilities: string[]
  cultivationBonus: { [key: string]: number }
  bodyStrength: number
  regeneration: number
  specialFeatures: string[]
  weaknesses: string[]
}

export const extendedCultivationRealms: ExtendedCultivationRealm[] = [
  {
    id: 'realm_mortal',
    name: '凡人',
    level: 0,
    description: `未踏入修仙之门的普通人，寿命短暂，力量微薄。但即使是凡人，也有踏入仙途的可能，只看是否有那份机缘和毅力。

凡人虽然无法修炼，但可以通过武学锻炼体魄，通过读书明理，通过劳作积累财富。有些凡人虽然没有灵根，但凭借坚韧的意志和过人的智慧，同样可以在修仙界留下自己的印记。

凡人想要踏入修仙之门，必须满足以下条件之一：
1. 拥有灵根，可以感应天地灵气
2. 获得特殊传承，可以绕过灵根限制
3. 服用天材地宝，强行开辟灵根
4. 获得仙人点化，直接踏入仙途`,
    stages: [
      {
        id: 'mortal_1',
        name: '凡人初期',
        level: 0,
        description: '刚刚出生的婴儿，身体虚弱，需要精心照料',
        expRequired: 0,
        benefits: { healthBonus: 0, spiritBonus: 0, statBonus: {} }
      },
      {
        id: 'mortal_2',
        name: '凡人中期',
        level: 1,
        description: '成长中的少年，身体逐渐强壮',
        expRequired: 10,
        benefits: { healthBonus: 5, spiritBonus: 0, statBonus: { strength: 1 } }
      },
      {
        id: 'mortal_3',
        name: '凡人后期',
        level: 2,
        description: '成年凡人，身体达到巅峰',
        expRequired: 50,
        benefits: { healthBonus: 10, spiritBonus: 5, statBonus: { strength: 2, agility: 1 } }
      },
      {
        id: 'mortal_4',
        name: '凡人巅峰',
        level: 3,
        description: '凡人的极限，即将踏入仙途或开始衰老',
        expRequired: 100,
        benefits: { healthBonus: 20, spiritBonus: 10, statBonus: { strength: 3, agility: 2, intelligence: 1 } }
      }
    ],
    requirements: { minExp: 0 },
    benefits: {
      healthMultiplier: 1,
      spiritMultiplier: 1,
      lifespan: 100,
      newAbilities: []
    },
    breakthrough: {
      successRate: 0.1,
      requiredItems: [],
      requiredConditions: ['拥有灵根', '感应灵气', '获得传承'],
      failureConsequences: [],
      specialRequirements: ['服用开灵丹可提升成功率至30%', '在灵气充沛之地可提升成功率']
    },
    specialConditions: [
      '凡人可以学习武学，锻炼体魄',
      '凡人可以读书明理，增长智慧',
      '凡人可以经商积累财富',
      '凡人可以成为修士的仆从或护卫'
    ],
    cultivationMethods: ['凡人武学', '养生功', '吐纳法'],
    forbiddenMethods: ['任何修仙功法'],
    breakthroughItems: [
      {
        id: 'item_kailingdan',
        name: '开灵丹',
        type: 'helpful',
        effect: '提升感应灵气的成功率',
        successRateBonus: 0.2,
        source: '炼丹师',
        price: 1000
      },
      {
        id: 'item_lingshi',
        name: '灵石',
        type: 'optional',
        effect: '辅助感应灵气',
        successRateBonus: 0.05,
        source: '矿脉',
        price: 100
      }
    ],
    specialAbilities: ['无'],
    daoHeartRequirements: ['坚定向道之心'],
    karmaEffects: ['无'],
    realmSecrets: [
      '传说有些凡人虽然没有灵根，但凭借大毅力可以强行踏入仙途',
      '上古时期，有凡人以武入道，开创了武修一脉',
      '有些凡人通过特殊契约，可以获得妖族或灵族的血脉'
    ],
    historicalFigures: ['武祖·张三丰', '医圣·华佗', '书圣·王羲之'],
    commonBottlenecks: ['无法感应灵气', '灵根资质太差', '缺乏引路人'],
    breakthroughTechniques: ['服用开灵丹', '在灵脉之地修炼', '获得仙人点化']
  },
  {
    id: 'realm_qi_refining',
    name: '炼气期',
    level: 1,
    description: `修仙的第一步，通过吸纳天地灵气，淬炼肉身，开辟丹田。炼气期修士可以施展简单的法术，寿元可达一百五十岁。

炼气期是修仙的根基，这一阶段决定了修士未来的成就。炼气期修士需要选择适合自己的功法，打好根基。根基不稳，后患无穷。

炼气期分为十三层，每一层都需要大量灵气积累。炼气期的修炼速度取决于灵根资质、功法品质、灵气浓度和悟性。

炼气期修士的特点：
1. 可以施展简单法术
2. 可以御器飞行（炼气四层以上）
3. 可以使用低阶法器
4. 寿命延长至150岁
5. 身体素质大幅提升`,
    stages: [
      {
        id: 'qi_1',
        name: '炼气一层',
        level: 1,
        description: '感应灵气，开始引气入体。这是踏入仙途的第一步，需要静心感应天地间的灵气波动。',
        expRequired: 100,
        benefits: { healthBonus: 10, spiritBonus: 10, statBonus: { strength: 1 } }
      },
      {
        id: 'qi_2',
        name: '炼气二层',
        level: 2,
        description: '灵气在经脉中流转，身体开始强化。经脉逐渐拓宽，可以容纳更多灵气。',
        expRequired: 200,
        benefits: { healthBonus: 15, spiritBonus: 15, statBonus: { agility: 1 } }
      },
      {
        id: 'qi_3',
        name: '炼气三层',
        level: 3,
        description: '灵气开始凝聚，可以施展简单法术。学会第一个法术是修士的里程碑。',
        expRequired: 400,
        benefits: { healthBonus: 20, spiritBonus: 20, statBonus: { intelligence: 1 } }
      },
      {
        id: 'qi_4',
        name: '炼气四层',
        level: 4,
        description: '法术威力增强，可以御器飞行。御器飞行是炼气期修士的重要标志。',
        expRequired: 800,
        benefits: { healthBonus: 30, spiritBonus: 30, statBonus: { willpower: 1 } }
      },
      {
        id: 'qi_5',
        name: '炼气五层',
        level: 5,
        description: '灵气更加凝实，可以施展中等法术。法术威力大增，可以应对一般妖兽。',
        expRequired: 1500,
        benefits: { healthBonus: 40, spiritBonus: 40, statBonus: { strength: 2 } }
      },
      {
        id: 'qi_6',
        name: '炼气六层',
        level: 6,
        description: '炼气中期，实力大增。可以参加宗门任务，积累资源。',
        expRequired: 3000,
        benefits: { healthBonus: 60, spiritBonus: 60, statBonus: { agility: 2 } }
      },
      {
        id: 'qi_7',
        name: '炼气七层',
        level: 7,
        description: '灵气开始向丹田汇聚。丹田逐渐成形，准备筑基。',
        expRequired: 6000,
        benefits: { healthBonus: 80, spiritBonus: 80, statBonus: { intelligence: 2 } }
      },
      {
        id: 'qi_8',
        name: '炼气八层',
        level: 8,
        description: '丹田开始成形，灵气更加精纯。可以施展高级法术。',
        expRequired: 12000,
        benefits: { healthBonus: 100, spiritBonus: 100, statBonus: { willpower: 2 } }
      },
      {
        id: 'qi_9',
        name: '炼气九层',
        level: 9,
        description: '炼气后期，即将筑基。需要准备筑基丹等资源。',
        expRequired: 24000,
        benefits: { healthBonus: 150, spiritBonus: 150, statBonus: { luck: 1 } }
      },
      {
        id: 'qi_10',
        name: '炼气十层',
        level: 10,
        description: '炼气圆满，准备筑基。普通修士的极限，筑基成功率约30%。',
        expRequired: 48000,
        benefits: { healthBonus: 200, spiritBonus: 200, statBonus: { strength: 3 } }
      },
      {
        id: 'qi_11',
        name: '炼气十一层',
        level: 11,
        description: '极少数天才可以达到的境界。筑基成功率提升至50%。',
        expRequired: 96000,
        benefits: { healthBonus: 300, spiritBonus: 300, statBonus: { agility: 3 } }
      },
      {
        id: 'qi_12',
        name: '炼气十二层',
        level: 12,
        description: '传说中的境界，筑基成功率极高，约70%。',
        expRequired: 192000,
        benefits: { healthBonus: 400, spiritBonus: 400, statBonus: { intelligence: 3 } }
      },
      {
        id: 'qi_13',
        name: '炼气十三层',
        level: 13,
        description: '炼气巅峰，万无一失的筑基。只有绝世天才才能达到。',
        expRequired: 384000,
        benefits: { healthBonus: 500, spiritBonus: 500, statBonus: { willpower: 3 } }
      }
    ],
    requirements: { minExp: 100 },
    benefits: {
      healthMultiplier: 1.5,
      spiritMultiplier: 2,
      lifespan: 150,
      newAbilities: ['基础法术', '御器术', '神识初现']
    },
    breakthrough: {
      successRate: 0.9,
      requiredItems: [],
      requiredConditions: ['感应灵气', '拥有灵根'],
      failureConsequences: ['经脉受损', '灵气反噬']
    },
    specialConditions: [
      '炼气期修士可以使用低阶法器',
      '炼气期修士可以学习基础法术',
      '炼气期修士可以参加宗门任务',
      '炼气期修士可以进入低阶秘境'
    ],
    cultivationMethods: [
      '青云诀', '玄天诀', '五行诀', '阴阳诀', '太极诀',
      '纯阳诀', '玄阴诀', '风雷诀', '水木诀', '金火诀'
    ],
    forbiddenMethods: [
      '血魔功', '噬魂诀', '阴阳采补术', '邪道功法'
    ],
    breakthroughItems: [
      {
        id: 'item_zhujidan',
        name: '筑基丹',
        type: 'essential',
        effect: '筑基必需品，大幅提升成功率',
        successRateBonus: 0.2,
        source: '炼丹师',
        price: 10000
      },
      {
        id: 'item_tiancaidibao',
        name: '天材地宝',
        type: 'helpful',
        effect: '提升筑基成功率',
        successRateBonus: 0.1,
        source: '秘境',
        price: 50000
      }
    ],
    specialAbilities: ['基础法术', '御器术', '神识初现', '灵气感知'],
    daoHeartRequirements: ['坚定道心', '不为外物所动'],
    karmaEffects: ['杀生增加业力', '救人减少业力'],
    realmSecrets: [
      '炼气十三层是凡人修仙传中韩立的修炼体系',
      '炼气期根基决定未来成就',
      '有些天才可以跳过炼气期直接筑基'
    ],
    historicalFigures: ['韩立', '厉飞雨', '墨居仁'],
    commonBottlenecks: ['灵气不足', '功法不适合', '根基不稳', '心魔侵扰'],
    breakthroughTechniques: ['服用筑基丹', '在灵脉之地修炼', '获得高人指点', '使用天材地宝']
  },
  {
    id: 'realm_foundation',
    name: '筑基期',
    level: 2,
    description: `修仙的第二步，将炼气期凝聚的灵气压缩成液态，形成真元。筑基期修士可以施展更强的法术，寿元可达三百岁。

筑基是修仙路上的第一道大坎，许多修士终生止步于此。筑基需要筑基丹辅助，否则成功率极低。筑基成功后，修士才算是真正踏入了修仙之门。

筑基期分为初期、中期、后期和大圆满四个阶段。筑基期修士已经可以称为"仙师"，在凡人眼中是神仙般的存在。

筑基期修士的特点：
1. 真元护体，刀枪不入
2. 可以御剑飞行
3. 神识外放，可以探查周围
4. 可以炼制法器
5. 寿命延长至300岁`,
    stages: [
      {
        id: 'foundation_early',
        name: '筑基初期',
        level: 14,
        description: '刚刚筑基成功，真元初成。需要稳固境界，适应真元。',
        expRequired: 500000,
        benefits: { healthBonus: 600, spiritBonus: 600, statBonus: { strength: 5, agility: 5 } }
      },
      {
        id: 'foundation_mid',
        name: '筑基中期',
        level: 15,
        description: '真元逐渐凝实，实力大增。可以施展更强的法术。',
        expRequired: 1000000,
        benefits: { healthBonus: 800, spiritBonus: 800, statBonus: { intelligence: 5, willpower: 5 } }
      },
      {
        id: 'foundation_late',
        name: '筑基后期',
        level: 16,
        description: '真元精纯，准备结丹。需要积累大量资源。',
        expRequired: 2000000,
        benefits: { healthBonus: 1000, spiritBonus: 1000, statBonus: { strength: 8, agility: 8 } }
      },
      {
        id: 'foundation_perfect',
        name: '筑基大圆满',
        level: 17,
        description: '筑基巅峰，结丹在即。真元已经达到液态极限。',
        expRequired: 4000000,
        benefits: { healthBonus: 1500, spiritBonus: 1500, statBonus: { intelligence: 8, willpower: 8 } }
      }
    ],
    requirements: { minExp: 500000, requiredItems: ['筑基丹'] },
    benefits: {
      healthMultiplier: 3,
      spiritMultiplier: 5,
      lifespan: 300,
      newAbilities: ['真元护体', '御剑飞行', '神识外放', '炼器入门']
    },
    tribulation: {
      id: 'tribulation_foundation',
      name: '筑基天劫',
      description: '筑基时引动的天地异象，需要承受雷劫洗礼',
      difficulty: 1,
      phases: [
        {
          id: 'trib_foundation_1',
          name: '第一道雷劫',
          description: '天降雷霆，淬炼肉身',
          damage: 200,
          duration: 3,
          requirements: { minHealth: 300, minSpirit: 300, minStats: { willpower: 15 } }
        },
        {
          id: 'trib_foundation_2',
          name: '第二道雷劫',
          description: '雷霆更加猛烈，考验意志',
          damage: 350,
          duration: 3,
          requirements: { minHealth: 500, minSpirit: 500, minStats: { willpower: 20 } }
        },
        {
          id: 'trib_foundation_3',
          name: '第三道雷劫',
          description: '最后一道雷劫，成功即可筑基',
          damage: 500,
          duration: 3,
          requirements: { minHealth: 800, minSpirit: 800, minStats: { willpower: 25 } }
        }
      ],
      rewards: {
        expBonus: 100000,
        specialAbility: '雷劫淬体',
        title: '筑基修士'
      }
    },
    breakthrough: {
      successRate: 0.3,
      requiredItems: ['筑基丹'],
      requiredConditions: ['炼气十层以上', '丹田成形', '经脉畅通'],
      failureConsequences: ['境界跌落', '经脉受损', '寿元减少'],
      specialRequirements: ['筑基丹可提升成功率至50%', '天材地宝可提升成功率']
    },
    specialConditions: [
      '筑基期修士可以成为宗门长老',
      '筑基期修士可以收徒',
      '筑基期修士可以进入中阶秘境',
      '筑基期修士可以炼制中阶法器'
    ],
    cultivationMethods: [
      '青云诀', '玄天诀', '五行诀', '阴阳诀', '太极诀',
      '纯阳诀', '玄阴诀', '风雷诀', '水木诀', '金火诀',
      '天魔诀', '血神诀', '鬼道诀'
    ],
    forbiddenMethods: [
      '噬魂诀', '阴阳采补术', '邪道功法'
    ],
    breakthroughItems: [
      {
        id: 'item_jiedandan',
        name: '结丹丹',
        type: 'essential',
        effect: '结丹必需品，大幅提升成功率',
        successRateBonus: 0.2,
        source: '炼丹师',
        price: 100000
      },
      {
        id: 'item_jin dan_yuansui',
        name: '金丹元髓',
        type: 'helpful',
        effect: '提升结丹成功率',
        successRateBonus: 0.15,
        source: '秘境',
        price: 500000
      }
    ],
    specialAbilities: ['真元护体', '御剑飞行', '神识外放', '炼器入门', '炼丹入门'],
    daoHeartRequirements: ['坚定道心', '不为外物所动', '斩断凡尘'],
    karmaEffects: ['杀生增加业力', '救人减少业力', '斩妖除魔减少业力'],
    realmSecrets: [
      '筑基期是修仙路上的第一道大坎',
      '筑基成功后，修士才算是真正踏入修仙之门',
      '有些天才可以跳过筑基期直接结丹'
    ],
    historicalFigures: ['韩立', '南宫婉', '银月'],
    commonBottlenecks: ['真元不足', '根基不稳', '心魔侵扰', '资源匮乏'],
    breakthroughTechniques: ['服用结丹丹', '在灵脉之地修炼', '获得高人指点', '使用天材地宝']
  },
  {
    id: 'realm_core_formation',
    name: '结丹期',
    level: 3,
    description: `修仙的第三步，将真元压缩成固体的金丹。结丹期修士可以施展强大的法术，寿元可达五百岁。

结丹是修仙路上的第二道大坎，比筑基更加困难。结丹需要结丹丹辅助，否则成功率极低。结丹成功后，修士可以称为"真人"，是一方高手。

结丹期分为初期、中期、后期和大圆满四个阶段。金丹的品质决定了修士未来的成就，金丹分为九品，一品最差，九品最好。

结丹期修士的特点：
1. 金丹护体，万法不侵
2. 可以瞬移
3. 神识化形，可以离体而行
4. 可以炼制法宝
5. 寿命延长至500岁`,
    stages: [
      {
        id: 'core_early',
        name: '结丹初期',
        level: 18,
        description: '金丹初成，法力大增。需要稳固金丹，适应新的力量。',
        expRequired: 8000000,
        benefits: { healthBonus: 2000, spiritBonus: 2000, statBonus: { strength: 15, agility: 15, intelligence: 15 } }
      },
      {
        id: 'core_mid',
        name: '结丹中期',
        level: 19,
        description: '金丹逐渐凝实，神通广大。可以施展强大的法术。',
        expRequired: 16000000,
        benefits: { healthBonus: 3000, spiritBonus: 3000, statBonus: { willpower: 15, luck: 5 } }
      },
      {
        id: 'core_late',
        name: '结丹后期',
        level: 20,
        description: '金丹精纯，准备元婴。需要感悟天地法则。',
        expRequired: 32000000,
        benefits: { healthBonus: 4000, spiritBonus: 4000, statBonus: { strength: 20, agility: 20 } }
      },
      {
        id: 'core_perfect',
        name: '结丹大圆满',
        level: 21,
        description: '结丹巅峰，元婴在即。金丹已经达到完美状态。',
        expRequired: 64000000,
        benefits: { healthBonus: 5000, spiritBonus: 5000, statBonus: { intelligence: 20, willpower: 20 } }
      }
    ],
    requirements: { minExp: 8000000, requiredItems: ['结丹丹'] },
    benefits: {
      healthMultiplier: 10,
      spiritMultiplier: 20,
      lifespan: 500,
      newAbilities: ['金丹护体', '神识化形', '瞬移术', '炼器大成', '炼丹入门']
    },
    tribulation: {
      id: 'tribulation_core',
      name: '结丹天劫',
      description: '结丹时引动的天地异象，需要承受更强的雷劫洗礼',
      difficulty: 2,
      phases: [
        {
          id: 'trib_core_1',
          name: '第一道心魔劫',
          description: '心魔入侵，考验道心',
          damage: 500,
          duration: 5,
          requirements: { minHealth: 1500, minSpirit: 1500, minStats: { willpower: 30 } }
        },
        {
          id: 'trib_core_2',
          name: '第二道雷劫',
          description: '九道天雷，淬炼金丹',
          damage: 800,
          duration: 9,
          requirements: { minHealth: 2500, minSpirit: 2500, minStats: { willpower: 40 } }
        },
        {
          id: 'trib_core_3',
          name: '第三道五行劫',
          description: '五行之力考验',
          damage: 1200,
          duration: 5,
          requirements: { minHealth: 4000, minSpirit: 4000, minStats: { willpower: 50 } }
        }
      ],
      rewards: {
        expBonus: 500000,
        specialAbility: '金丹神通',
        title: '金丹真人'
      }
    },
    breakthrough: {
      successRate: 0.2,
      requiredItems: ['结丹丹', '天材地宝'],
      requiredConditions: ['筑基大圆满', '真元液化', '神识强大'],
      failureConsequences: ['金丹碎裂', '境界跌落', '寿元大减'],
      specialRequirements: ['结丹丹可提升成功率至40%', '极品灵地可提升成功率']
    },
    specialConditions: [
      '结丹期修士可以成为宗门核心长老',
      '结丹期修士可以开宗立派',
      '结丹期修士可以进入高阶秘境',
      '结丹期修士可以炼制高阶法宝'
    ],
    cultivationMethods: [
      '青云诀', '玄天诀', '五行诀', '阴阳诀', '太极诀',
      '纯阳诀', '玄阴诀', '风雷诀', '水木诀', '金火诀',
      '天魔诀', '血神诀', '鬼道诀', '佛门功法', '妖族功法'
    ],
    forbiddenMethods: [
      '噬魂诀', '阴阳采补术', '邪道功法'
    ],
    breakthroughItems: [
      {
        id: 'item_huayingdan',
        name: '化婴丹',
        type: 'essential',
        effect: '化婴必需品，大幅提升成功率',
        successRateBonus: 0.15,
        source: '炼丹师',
        price: 1000000
      },
      {
        id: 'item_yuanying_jing',
        name: '元婴精华',
        type: 'helpful',
        effect: '提升化婴成功率',
        successRateBonus: 0.1,
        source: '秘境',
        price: 5000000
      }
    ],
    specialAbilities: ['金丹护体', '神识化形', '瞬移术', '炼器大成', '炼丹入门', '法宝操控'],
    daoHeartRequirements: ['坚定道心', '斩断凡尘', '感悟天地'],
    karmaEffects: ['杀生增加业力', '救人减少业力', '斩妖除魔减少业力', '渡劫增加功德'],
    realmSecrets: [
      '金丹品质决定未来成就',
      '金丹分为九品，一品最差，九品最好',
      '有些天才可以结成极品金丹'
    ],
    historicalFigures: ['韩立', '南宫婉', '银月', '墨大夫'],
    commonBottlenecks: ['金丹不稳', '法则感悟不足', '心魔侵扰', '资源匮乏'],
    breakthroughTechniques: ['服用化婴丹', '在灵脉之地修炼', '获得高人指点', '使用天材地宝', '感悟天地法则']
  },
  {
    id: 'realm_nascent_soul',
    name: '元婴期',
    level: 4,
    description: `修仙的第四步，金丹破碎，孕育元婴。元婴期修士可以施展毁天灭地的法术，寿元可达一千岁。

元婴是修仙路上的第三道大坎，比结丹更加困难。元婴需要化婴丹辅助，否则成功率极低。元婴成功后，修士可以称为"老祖"，是一方霸主。

元婴期分为初期、中期、后期和大圆满四个阶段。元婴是修士的第二条命，即使肉身被毁，元婴也可以夺舍重修。

元婴期修士的特点：
1. 元婴出窍，可以离体而行
2. 瞬息千里，瞬移速度大增
3. 分神化念，可以同时处理多件事
4. 可以炼制仙器雏形
5. 寿命延长至1000岁`,
    stages: [
      {
        id: 'nascent_early',
        name: '元婴初期',
        level: 22,
        description: '元婴初生，神通广大。需要稳固元婴，适应新的力量。',
        expRequired: 128000000,
        benefits: { healthBonus: 8000, spiritBonus: 8000, statBonus: { strength: 30, agility: 30, intelligence: 30 } }
      },
      {
        id: 'nascent_mid',
        name: '元婴中期',
        level: 23,
        description: '元婴成长，法力无边。可以施展强大的神通。',
        expRequired: 256000000,
        benefits: { healthBonus: 12000, spiritBonus: 12000, statBonus: { willpower: 30, luck: 10 } }
      },
      {
        id: 'nascent_late',
        name: '元婴后期',
        level: 24,
        description: '元婴强大，准备化神。需要感悟天地法则。',
        expRequired: 512000000,
        benefits: { healthBonus: 16000, spiritBonus: 16000, statBonus: { strength: 40, agility: 40 } }
      },
      {
        id: 'nascent_perfect',
        name: '元婴大圆满',
        level: 25,
        description: '元婴巅峰，化神在即。元婴已经达到完美状态。',
        expRequired: 1024000000,
        benefits: { healthBonus: 20000, spiritBonus: 20000, statBonus: { intelligence: 40, willpower: 40 } }
      }
    ],
    requirements: { minExp: 128000000, requiredItems: ['化婴丹'] },
    benefits: {
      healthMultiplier: 50,
      spiritMultiplier: 100,
      lifespan: 1000,
      newAbilities: ['元婴出窍', '瞬息千里', '分神化念', '炼器宗师', '炼丹大成']
    },
    tribulation: {
      id: 'tribulation_nascent',
      name: '元婴天劫',
      description: '元婴时引动的天地大劫，九死一生',
      difficulty: 3,
      phases: [
        {
          id: 'trib_nascent_1',
          name: '第一道心魔大劫',
          description: '心魔大举入侵，考验道心',
          damage: 2000,
          duration: 10,
          requirements: { minHealth: 6000, minSpirit: 6000, minStats: { willpower: 60 } }
        },
        {
          id: 'trib_nascent_2',
          name: '第二道九九天雷劫',
          description: '八十一道天雷，淬炼元婴',
          damage: 3000,
          duration: 81,
          requirements: { minHealth: 10000, minSpirit: 10000, minStats: { willpower: 80 } }
        },
        {
          id: 'trib_nascent_3',
          name: '第三道五行大劫',
          description: '五行大劫，考验五行掌控',
          damage: 5000,
          duration: 10,
          requirements: { minHealth: 15000, minSpirit: 15000, minStats: { willpower: 100 } }
        },
        {
          id: 'trib_nascent_4',
          name: '第四道风火大劫',
          description: '罡风神火，淬炼神魂',
          damage: 8000,
          duration: 10,
          requirements: { minHealth: 20000, minSpirit: 20000, minStats: { willpower: 120 } }
        }
      ],
      rewards: {
        expBonus: 2000000,
        specialAbility: '元婴神通',
        title: '元婴老祖'
      }
    },
    breakthrough: {
      successRate: 0.1,
      requiredItems: ['化婴丹', '极品天材地宝'],
      requiredConditions: ['结丹大圆满', '金丹完美', '神识化形'],
      failureConsequences: ['元婴夭折', '金丹破碎', '寿元大减', '可能陨落'],
      specialRequirements: ['化婴丹可提升成功率至25%', '秘境渡劫可提升成功率']
    },
    specialConditions: [
      '元婴期修士可以成为宗门太上长老',
      '元婴期修士可以建立自己的势力',
      '元婴期修士可以进入顶级秘境',
      '元婴期修士可以炼制仙器雏形'
    ],
    cultivationMethods: [
      '青云诀', '玄天诀', '五行诀', '阴阳诀', '太极诀',
      '纯阳诀', '玄阴诀', '风雷诀', '水木诀', '金火诀',
      '天魔诀', '血神诀', '鬼道诀', '佛门功法', '妖族功法',
      '上古传承', '仙界功法'
    ],
    forbiddenMethods: [
      '噬魂诀', '阴阳采补术', '邪道功法'
    ],
    breakthroughItems: [
      {
        id: 'item_huashendan',
        name: '化神丹',
        type: 'essential',
        effect: '化神必需品，大幅提升成功率',
        successRateBonus: 0.1,
        source: '炼丹师',
        price: 10000000
      },
      {
        id: 'item_faze_suipian',
        name: '法则碎片',
        type: 'helpful',
        effect: '提升化神成功率',
        successRateBonus: 0.05,
        source: '秘境',
        price: 50000000
      }
    ],
    specialAbilities: ['元婴出窍', '瞬息千里', '分神化念', '炼器宗师', '炼丹大成', '仙器雏形炼制'],
    daoHeartRequirements: ['坚定道心', '斩断凡尘', '感悟天地', '明悟自我'],
    karmaEffects: ['杀生增加业力', '救人减少业力', '斩妖除魔减少业力', '渡劫增加功德', '传道增加功德'],
    realmSecrets: [
      '元婴是修士的第二条命',
      '元婴可以夺舍重修',
      '有些天才可以孕育出特殊元婴'
    ],
    historicalFigures: ['韩立', '南宫婉', '银月', '墨大夫', '向之礼'],
    commonBottlenecks: ['元婴不稳', '法则感悟不足', '心魔侵扰', '资源匮乏', '天道压制'],
    breakthroughTechniques: ['服用化神丹', '在灵脉之地修炼', '获得高人指点', '使用天材地宝', '感悟天地法则', '斩断因果']
  },
  {
    id: 'realm_spirit_severing',
    name: '化神期',
    level: 5,
    description: `修仙的第五步，元婴与神魂融合，化神出窍。化神期修士可以操控天地法则，寿元可达两千岁。

化神是修仙路上的第四道大坎，比元婴更加困难。化神需要化神丹和法则碎片辅助，否则成功率极低。化神成功后，修士可以称为"大能"，是一方巨擘。

化神期分为初期、中期、后期和大圆满四个阶段。化神期修士已经开始接触法则之力，可以操控天地之力。

化神期修士的特点：
1. 法则掌控，可以操控天地之力
2. 空间穿梭，可以撕裂空间
3. 时间延缓，可以短暂影响时间
4. 分身术，可以分化出分身
5. 寿命延长至2000岁`,
    stages: [
      {
        id: 'spirit_early',
        name: '化神初期',
        level: 26,
        description: '神魂初化，掌控法则。需要稳固境界，适应法则之力。',
        expRequired: 2048000000,
        benefits: { healthBonus: 30000, spiritBonus: 30000, statBonus: { strength: 50, agility: 50, intelligence: 50 } }
      },
      {
        id: 'spirit_mid',
        name: '化神中期',
        level: 27,
        description: '法则掌控加深。可以施展强大的法则神通。',
        expRequired: 4096000000,
        benefits: { healthBonus: 40000, spiritBonus: 40000, statBonus: { willpower: 50, luck: 20 } }
      },
      {
        id: 'spirit_late',
        name: '化神后期',
        level: 28,
        description: '法则大成，准备炼虚。需要融合更多法则。',
        expRequired: 8192000000,
        benefits: { healthBonus: 50000, spiritBonus: 50000, statBonus: { strength: 60, agility: 60 } }
      },
      {
        id: 'spirit_perfect',
        name: '化神大圆满',
        level: 29,
        description: '化神巅峰，炼虚在即。法则已经达到完美状态。',
        expRequired: 16384000000,
        benefits: { healthBonus: 60000, spiritBonus: 60000, statBonus: { intelligence: 60, willpower: 60 } }
      }
    ],
    requirements: { minExp: 2048000000, requiredItems: ['化神丹', '法则碎片'] },
    benefits: {
      healthMultiplier: 200,
      spiritMultiplier: 500,
      lifespan: 2000,
      newAbilities: ['法则掌控', '空间穿梭', '时间延缓', '分身术', '炼丹宗师']
    },
    tribulation: {
      id: 'tribulation_spirit',
      name: '化神天劫',
      description: '化神时引动的天地大劫，九死一生',
      difficulty: 4,
      phases: [
        {
          id: 'trib_spirit_1',
          name: '第一道心魔大劫',
          description: '心魔大举入侵，考验道心',
          damage: 10000,
          duration: 20,
          requirements: { minHealth: 25000, minSpirit: 25000, minStats: { willpower: 150 } }
        },
        {
          id: 'trib_spirit_2',
          name: '第二道法则劫',
          description: '法则反噬，考验掌控',
          damage: 15000,
          duration: 30,
          requirements: { minHealth: 40000, minSpirit: 40000, minStats: { willpower: 200 } }
        },
        {
          id: 'trib_spirit_3',
          name: '第三道天地劫',
          description: '天地大劫，生死一线',
          damage: 25000,
          duration: 50,
          requirements: { minHealth: 55000, minSpirit: 55000, minStats: { willpower: 250 } }
        }
      ],
      rewards: {
        expBonus: 10000000,
        specialAbility: '法则神通',
        title: '化神大能'
      }
    },
    breakthrough: {
      successRate: 0.05,
      requiredItems: ['化神丹', '法则碎片', '仙器碎片'],
      requiredConditions: ['元婴大圆满', '领悟法则', '神魂强大'],
      failureConsequences: ['神魂受损', '法则反噬', '寿元大减', '可能陨落'],
      specialRequirements: ['化神丹可提升成功率至15%', '秘境渡劫可提升成功率']
    },
    specialConditions: [
      '化神期修士可以成为宗门老祖',
      '化神期修士可以建立顶级势力',
      '化神期修士可以进入仙界秘境',
      '化神期修士可以炼制仙器'
    ],
    cultivationMethods: [
      '青云诀', '玄天诀', '五行诀', '阴阳诀', '太极诀',
      '纯阳诀', '玄阴诀', '风雷诀', '水木诀', '金火诀',
      '天魔诀', '血神诀', '鬼道诀', '佛门功法', '妖族功法',
      '上古传承', '仙界功法', '混沌功法'
    ],
    forbiddenMethods: [
      '噬魂诀', '阴阳采补术', '邪道功法'
    ],
    breakthroughItems: [
      {
        id: 'item_lianxudan',
        name: '炼虚丹',
        type: 'essential',
        effect: '炼虚必需品，大幅提升成功率',
        successRateBonus: 0.05,
        source: '炼丹师',
        price: 100000000
      },
      {
        id: 'item_kongjian_jingshi',
        name: '空间晶石',
        type: 'helpful',
        effect: '提升炼虚成功率',
        successRateBonus: 0.03,
        source: '秘境',
        price: 500000000
      }
    ],
    specialAbilities: ['法则掌控', '空间穿梭', '时间延缓', '分身术', '炼丹宗师', '仙器炼制'],
    daoHeartRequirements: ['坚定道心', '斩断凡尘', '感悟天地', '明悟自我', '融合法则'],
    karmaEffects: ['杀生增加业力', '救人减少业力', '斩妖除魔减少业力', '渡劫增加功德', '传道增加功德', '创造减少业力'],
    realmSecrets: [
      '化神期修士已经开始接触法则之力',
      '法则感悟决定了修士未来的成就',
      '有些天才可以领悟多种法则'
    ],
    historicalFigures: ['韩立', '南宫婉', '银月', '向之礼', '车老妖'],
    commonBottlenecks: ['法则感悟不足', '神魂不稳', '心魔侵扰', '资源匮乏', '天道压制'],
    breakthroughTechniques: ['服用炼虚丹', '在灵脉之地修炼', '获得高人指点', '使用天材地宝', '感悟天地法则', '融合法则']
  },
  {
    id: 'realm_void_refining',
    name: '炼虚期',
    level: 6,
    description: `修仙的第六步，将肉身与虚空融合，炼虚合道。炼虚期修士可以操控空间法则，寿元可达五千岁。

炼虚是修仙路上的第五道大坎，比化神更加困难。炼虚需要炼虚丹和空间晶石辅助，否则成功率极低。炼虚成功后，修士可以称为"大能"，是一方巨擘。

炼虚期分为初期、中期、后期和大圆满四个阶段。炼虚期修士已经可以操控空间之力，可以撕裂空间，开辟小世界。

炼虚期修士的特点：
1. 空间掌控，可以撕裂空间
2. 虚空穿梭，可以自由穿梭虚空
3. 开辟空间，可以开辟小世界
4. 创造小世界，可以创造属于自己的空间
5. 寿命延长至5000岁`,
    stages: [
      {
        id: 'void_early',
        name: '炼虚初期',
        level: 30,
        description: '虚空初融，空间掌控。需要稳固境界，适应虚空之力。',
        expRequired: 32768000000,
        benefits: { healthBonus: 80000, spiritBonus: 80000, statBonus: { strength: 80, agility: 80, intelligence: 80 } }
      },
      {
        id: 'void_mid',
        name: '炼虚中期',
        level: 31,
        description: '空间法则大成。可以施展强大的空间神通。',
        expRequired: 65536000000,
        benefits: { healthBonus: 100000, spiritBonus: 100000, statBonus: { willpower: 80, luck: 30 } }
      },
      {
        id: 'void_late',
        name: '炼虚后期',
        level: 32,
        description: '准备合体。需要融合肉身与元婴。',
        expRequired: 131072000000,
        benefits: { healthBonus: 120000, spiritBonus: 120000, statBonus: { strength: 100, agility: 100 } }
      },
      {
        id: 'void_perfect',
        name: '炼虚大圆满',
        level: 33,
        description: '炼虚巅峰，合体在即。空间法则已经达到完美状态。',
        expRequired: 262144000000,
        benefits: { healthBonus: 150000, spiritBonus: 150000, statBonus: { intelligence: 100, willpower: 100 } }
      }
    ],
    requirements: { minExp: 32768000000, requiredItems: ['炼虚丹', '空间晶石'] },
    benefits: {
      healthMultiplier: 500,
      spiritMultiplier: 1000,
      lifespan: 5000,
      newAbilities: ['空间掌控', '虚空穿梭', '开辟空间', '创造小世界']
    },
    tribulation: {
      id: 'tribulation_void',
      name: '炼虚天劫',
      description: '炼虚时引动的天地大劫',
      difficulty: 5,
      phases: [
        {
          id: 'trib_void_1',
          name: '第一道虚空劫',
          description: '虚空崩塌，考验生存',
          damage: 30000,
          duration: 30,
          requirements: { minHealth: 70000, minSpirit: 70000, minStats: { willpower: 300 } }
        },
        {
          id: 'trib_void_2',
          name: '第二道空间劫',
          description: '空间撕裂，考验掌控',
          damage: 50000,
          duration: 50,
          requirements: { minHealth: 100000, minSpirit: 100000, minStats: { willpower: 400 } }
        },
        {
          id: 'trib_void_3',
          name: '第三道混沌劫',
          description: '混沌降临，生死一线',
          damage: 80000,
          duration: 100,
          requirements: { minHealth: 140000, minSpirit: 140000, minStats: { willpower: 500 } }
        }
      ],
      rewards: {
        expBonus: 50000000,
        specialAbility: '虚空神通',
        title: '炼虚大能'
      }
    },
    breakthrough: {
      successRate: 0.03,
      requiredItems: ['炼虚丹', '空间晶石', '仙器'],
      requiredConditions: ['化神大圆满', '空间法则大成', '神魂完美'],
      failureConsequences: ['虚空吞噬', '空间崩溃', '可能陨落'],
      specialRequirements: ['炼虚丹可提升成功率至10%', '秘境渡劫可提升成功率']
    },
    specialConditions: [
      '炼虚期修士可以成为顶级势力老祖',
      '炼虚期修士可以开辟自己的小世界',
      '炼虚期修士可以进入混沌秘境',
      '炼虚期修士可以炼制极品仙器'
    ],
    cultivationMethods: [
      '青云诀', '玄天诀', '五行诀', '阴阳诀', '太极诀',
      '纯阳诀', '玄阴诀', '风雷诀', '水木诀', '金火诀',
      '天魔诀', '血神诀', '鬼道诀', '佛门功法', '妖族功法',
      '上古传承', '仙界功法', '混沌功法', '虚空功法'
    ],
    forbiddenMethods: [
      '噬魂诀', '阴阳采补术', '邪道功法'
    ],
    breakthroughItems: [
      {
        id: 'item_hetidan',
        name: '合体丹',
        type: 'essential',
        effect: '合体必需品，大幅提升成功率',
        successRateBonus: 0.02,
        source: '炼丹师',
        price: 1000000000
      },
      {
        id: 'item_hundun_jinghua',
        name: '混沌精华',
        type: 'helpful',
        effect: '提升合体成功率',
        successRateBonus: 0.01,
        source: '混沌秘境',
        price: 5000000000
      }
    ],
    specialAbilities: ['空间掌控', '虚空穿梭', '开辟空间', '创造小世界', '极品仙器炼制'],
    daoHeartRequirements: ['坚定道心', '斩断凡尘', '感悟天地', '明悟自我', '融合法则', '虚空合一'],
    karmaEffects: ['杀生增加业力', '救人减少业力', '斩妖除魔减少业力', '渡劫增加功德', '传道增加功德', '创造减少业力', '开辟世界增加功德'],
    realmSecrets: [
      '炼虚期修士已经可以操控空间之力',
      '空间感悟决定了修士未来的成就',
      '有些天才可以开辟完整的小世界'
    ],
    historicalFigures: ['韩立', '南宫婉', '银月', '向之礼', '车老妖', '呼老魔'],
    commonBottlenecks: ['空间感悟不足', '虚空不稳', '心魔侵扰', '资源匮乏', '天道压制'],
    breakthroughTechniques: ['服用合体丹', '在混沌之地修炼', '获得高人指点', '使用天材地宝', '感悟空间法则', '融合虚空']
  },
  {
    id: 'realm_body_integration',
    name: '合体期',
    level: 7,
    description: `修仙的第七步，元婴与肉身完美融合，合体归一。合体期修士可以施展毁天灭地的神通，寿元可达一万岁。

合体是修仙路上的第六道大坎，比炼虚更加困难。合体需要合体丹和混沌精华辅助，否则成功率极低。合体成功后，修士可以称为"尊者"，是凡间巅峰。

合体期分为初期、中期、后期和大圆满四个阶段。合体期修士已经肉身与元婴合一，可以施展毁天灭地的神通。

合体期修士的特点：
1. 肉身不朽，肉身已经达到不朽状态
2. 元婴合一，元婴与肉身完美融合
3. 法则大成，可以完全掌控法则
4. 创造法则，可以创造自己的法则
5. 寿命延长至10000岁`,
    stages: [
      {
        id: 'integration_early',
        name: '合体初期',
        level: 34,
        description: '元婴肉身融合。需要稳固境界，适应合一状态。',
        expRequired: 524288000000,
        benefits: { healthBonus: 200000, spiritBonus: 200000, statBonus: { strength: 150, agility: 150, intelligence: 150 } }
      },
      {
        id: 'integration_mid',
        name: '合体中期',
        level: 35,
        description: '融合加深。可以施展强大的合体神通。',
        expRequired: 1048576000000,
        benefits: { healthBonus: 250000, spiritBonus: 250000, statBonus: { willpower: 150, luck: 50 } }
      },
      {
        id: 'integration_late',
        name: '合体后期',
        level: 36,
        description: '准备大乘。需要完善自己的法则。',
        expRequired: 2097152000000,
        benefits: { healthBonus: 300000, spiritBonus: 300000, statBonus: { strength: 200, agility: 200 } }
      },
      {
        id: 'integration_perfect',
        name: '合体大圆满',
        level: 37,
        description: '合体巅峰，大乘在即。法则已经达到完美状态。',
        expRequired: 4194304000000,
        benefits: { healthBonus: 400000, spiritBonus: 400000, statBonus: { intelligence: 200, willpower: 200 } }
      }
    ],
    requirements: { minExp: 524288000000, requiredItems: ['合体丹', '混沌精华'] },
    benefits: {
      healthMultiplier: 1000,
      spiritMultiplier: 2000,
      lifespan: 10000,
      newAbilities: ['肉身不朽', '元婴合一', '法则大成', '创造法则']
    },
    tribulation: {
      id: 'tribulation_integration',
      name: '合体天劫',
      description: '合体时引动的天地大劫',
      difficulty: 6,
      phases: [
        {
          id: 'trib_integration_1',
          name: '第一道融合劫',
          description: '元婴肉身冲突',
          damage: 100000,
          duration: 50,
          requirements: { minHealth: 180000, minSpirit: 180000, minStats: { willpower: 600 } }
        },
        {
          id: 'trib_integration_2',
          name: '第二道法则劫',
          description: '法则冲突',
          damage: 150000,
          duration: 100,
          requirements: { minHealth: 250000, minSpirit: 250000, minStats: { willpower: 800 } }
        },
        {
          id: 'trib_integration_3',
          name: '第三道天地大劫',
          description: '天地排斥',
          damage: 250000,
          duration: 200,
          requirements: { minHealth: 380000, minSpirit: 380000, minStats: { willpower: 1000 } }
        }
      ],
      rewards: {
        expBonus: 200000000,
        specialAbility: '合体神通',
        title: '合体大能'
      }
    },
    breakthrough: {
      successRate: 0.02,
      requiredItems: ['合体丹', '混沌精华', '仙器'],
      requiredConditions: ['炼虚大圆满', '元婴完美', '肉身强大'],
      failureConsequences: ['融合失败', '元婴破碎', '肉身崩溃', '可能陨落'],
      specialRequirements: ['合体丹可提升成功率至8%', '秘境渡劫可提升成功率']
    },
    specialConditions: [
      '合体期修士可以成为顶级势力尊者',
      '合体期修士可以创造自己的法则',
      '合体期修士可以进入仙界遗迹',
      '合体期修士可以炼制神器'
    ],
    cultivationMethods: [
      '青云诀', '玄天诀', '五行诀', '阴阳诀', '太极诀',
      '纯阳诀', '玄阴诀', '风雷诀', '水木诀', '金火诀',
      '天魔诀', '血神诀', '鬼道诀', '佛门功法', '妖族功法',
      '上古传承', '仙界功法', '混沌功法', '虚空功法', '合体功法'
    ],
    forbiddenMethods: [
      '噬魂诀', '阴阳采补术', '邪道功法'
    ],
    breakthroughItems: [
      {
        id: 'item_dachengdan',
        name: '大乘丹',
        type: 'essential',
        effect: '大乘必需品，大幅提升成功率',
        successRateBonus: 0.01,
        source: '炼丹师',
        price: 10000000000
      },
      {
        id: 'item_xianyuan',
        name: '仙缘',
        type: 'helpful',
        effect: '提升大乘成功率',
        successRateBonus: 0.005,
        source: '仙界',
        price: 50000000000
      }
    ],
    specialAbilities: ['肉身不朽', '元婴合一', '法则大成', '创造法则', '神器炼制'],
    daoHeartRequirements: ['坚定道心', '斩断凡尘', '感悟天地', '明悟自我', '融合法则', '虚空合一', '天人合一'],
    karmaEffects: ['杀生增加业力', '救人减少业力', '斩妖除魔减少业力', '渡劫增加功德', '传道增加功德', '创造减少业力', '开辟世界增加功德', '创造法则增加功德'],
    realmSecrets: [
      '合体期修士已经肉身与元婴合一',
      '法则创造决定了修士未来的成就',
      '有些天才可以创造独特的法则'
    ],
    historicalFigures: ['韩立', '南宫婉', '银月', '向之礼', '车老妖', '呼老魔', '万三姑'],
    commonBottlenecks: ['法则创造困难', '肉身元婴冲突', '心魔侵扰', '资源匮乏', '天道压制'],
    breakthroughTechniques: ['服用大乘丹', '在混沌之地修炼', '获得高人指点', '使用天材地宝', '感悟法则', '创造法则']
  },
  {
    id: 'realm_mahayana',
    name: '大乘期',
    level: 8,
    description: `修仙的第八步，法力圆满，准备飞升。大乘期修士已经是凡间最强，寿元可达五万岁。

大乘是修仙路上的第七道大坎，比合体更加困难。大乘需要大乘丹和仙缘辅助，否则成功率极低。大乘成功后，修士可以称为"尊者"，是凡间巅峰。

大乘期分为初期、中期、后期和大圆满四个阶段。大乘期修士已经法力圆满，只差一步便可飞升。

大乘期修士的特点：
1. 法力无边，法力已经达到凡间极限
2. 法则圆满，可以完全掌控法则
3. 预知未来，可以短暂预知未来
4. 创造生命，可以创造简单的生命
5. 寿命延长至50000岁`,
    stages: [
      {
        id: 'mahayana_early',
        name: '大乘初期',
        level: 38,
        description: '法力初满。需要稳固境界，准备渡劫。',
        expRequired: 8388608000000,
        benefits: { healthBonus: 500000, spiritBonus: 500000, statBonus: { strength: 300, agility: 300, intelligence: 300 } }
      },
      {
        id: 'mahayana_mid',
        name: '大乘中期',
        level: 39,
        description: '法力深厚。可以施展强大的大乘神通。',
        expRequired: 16777216000000,
        benefits: { healthBonus: 700000, spiritBonus: 700000, statBonus: { willpower: 300, luck: 100 } }
      },
      {
        id: 'mahayana_late',
        name: '大乘后期',
        level: 40,
        description: '准备渡劫。需要完善自己的道。',
        expRequired: 33554432000000,
        benefits: { healthBonus: 900000, spiritBonus: 900000, statBonus: { strength: 400, agility: 400 } }
      },
      {
        id: 'mahayana_perfect',
        name: '大乘大圆满',
        level: 41,
        description: '大乘巅峰，渡劫在即。道已经达到完美状态。',
        expRequired: 67108864000000,
        benefits: { healthBonus: 1200000, spiritBonus: 1200000, statBonus: { intelligence: 400, willpower: 400 } }
      }
    ],
    requirements: { minExp: 8388608000000, requiredItems: ['大乘丹', '仙缘'] },
    benefits: {
      healthMultiplier: 2000,
      spiritMultiplier: 5000,
      lifespan: 50000,
      newAbilities: ['法力无边', '法则圆满', '预知未来', '创造生命']
    },
    tribulation: {
      id: 'tribulation_mahayana',
      name: '大乘天劫',
      description: '大乘时引动的天地大劫',
      difficulty: 7,
      phases: [
        {
          id: 'trib_mahayana_1',
          name: '第一道心魔大劫',
          description: '心魔终极考验',
          damage: 300000,
          duration: 100,
          requirements: { minHealth: 450000, minSpirit: 450000, minStats: { willpower: 1200 } }
        },
        {
          id: 'trib_mahayana_2',
          name: '第二道法则大劫',
          description: '法则终极考验',
          damage: 500000,
          duration: 200,
          requirements: { minHealth: 650000, minSpirit: 650000, minStats: { willpower: 1500 } }
        },
        {
          id: 'trib_mahayana_3',
          name: '第三道天地大劫',
          description: '天地终极考验',
          damage: 800000,
          duration: 300,
          requirements: { minHealth: 1000000, minSpirit: 1000000, minStats: { willpower: 2000 } }
        }
      ],
      rewards: {
        expBonus: 1000000000,
        specialAbility: '大乘神通',
        title: '大乘尊者'
      }
    },
    breakthrough: {
      successRate: 0.01,
      requiredItems: ['大乘丹', '仙缘', '仙器'],
      requiredConditions: ['合体大圆满', '法则圆满', '功德深厚'],
      failureConsequences: ['渡劫失败', '可能陨落', '转世重修'],
      specialRequirements: ['大乘丹可提升成功率至5%', '秘境渡劫可提升成功率']
    },
    specialConditions: [
      '大乘期修士可以成为顶级势力尊者',
      '大乘期修士可以预知未来',
      '大乘期修士可以进入仙界入口',
      '大乘期修士可以炼制神器'
    ],
    cultivationMethods: [
      '青云诀', '玄天诀', '五行诀', '阴阳诀', '太极诀',
      '纯阳诀', '玄阴诀', '风雷诀', '水木诀', '金火诀',
      '天魔诀', '血神诀', '鬼道诀', '佛门功法', '妖族功法',
      '上古传承', '仙界功法', '混沌功法', '虚空功法', '合体功法', '大乘功法'
    ],
    forbiddenMethods: [
      '噬魂诀', '阴阳采补术', '邪道功法'
    ],
    breakthroughItems: [
      {
        id: 'item_dujiedan',
        name: '渡劫丹',
        type: 'essential',
        effect: '渡劫必需品，大幅提升成功率',
        successRateBonus: 0.005,
        source: '炼丹师',
        price: 100000000000
      },
      {
        id: 'item_xianyuan_2',
        name: '仙缘',
        type: 'helpful',
        effect: '提升渡劫成功率',
        successRateBonus: 0.003,
        source: '仙界',
        price: 500000000000
      }
    ],
    specialAbilities: ['法力无边', '法则圆满', '预知未来', '创造生命', '神器炼制'],
    daoHeartRequirements: ['坚定道心', '斩断凡尘', '感悟天地', '明悟自我', '融合法则', '虚空合一', '天人合一', '道法自然'],
    karmaEffects: ['杀生增加业力', '救人减少业力', '斩妖除魔减少业力', '渡劫增加功德', '传道增加功德', '创造减少业力', '开辟世界增加功德', '创造法则增加功德', '创造生命增加功德'],
    realmSecrets: [
      '大乘期修士已经法力圆满',
      '道法感悟决定了修士能否飞升',
      '有些天才可以创造独特的道'
    ],
    historicalFigures: ['韩立', '南宫婉', '银月', '向之礼', '车老妖', '呼老魔', '万三姑', '蛮胡子'],
    commonBottlenecks: ['道法感悟困难', '功德不足', '心魔侵扰', '资源匮乏', '天道压制'],
    breakthroughTechniques: ['服用渡劫丹', '在仙界入口修炼', '获得仙人指点', '使用天材地宝', '感悟道法', '积累功德']
  },
  {
    id: 'realm_tribulation',
    name: '渡劫期',
    level: 9,
    description: `修仙的最后一步，经历九九重劫，飞升仙界。渡劫期修士已经是凡间的巅峰，只差一步便可成仙。

渡劫是修仙路上的最后一道大坎，也是最难的一关。渡劫需要渡劫丹和仙缘辅助，否则成功率极低。渡劫成功后，修士可以飞升仙界，成为仙人。

渡劫期没有明显的阶段划分，只有渡过天劫与否。渡劫期修士需要经历九九八十一道天劫，每一道都是生死考验。

渡劫期修士的特点：
1. 半仙之体，已经拥有半仙之体
2. 仙力初现，可以施展仙力
3. 预知天机，可以预知天机
4. 寿命延长至100000岁`,
    stages: [
      {
        id: 'tribulation_1',
        name: '渡劫初期',
        level: 42,
        description: '准备渡劫。需要完善自己的道，准备迎接天劫。',
        expRequired: 134217728000000,
        benefits: { healthBonus: 1500000, spiritBonus: 1500000, statBonus: { strength: 500, agility: 500, intelligence: 500 } }
      },
      {
        id: 'tribulation_2',
        name: '渡劫中期',
        level: 43,
        description: '渡劫中。正在经历天劫考验。',
        expRequired: 268435456000000,
        benefits: { healthBonus: 2000000, spiritBonus: 2000000, statBonus: { willpower: 500, luck: 200 } }
      },
      {
        id: 'tribulation_3',
        name: '渡劫后期',
        level: 44,
        description: '即将飞升。天劫即将结束。',
        expRequired: 536870912000000,
        benefits: { healthBonus: 3000000, spiritBonus: 3000000, statBonus: { strength: 600, agility: 600 } }
      }
    ],
    requirements: { minExp: 134217728000000, requiredItems: ['渡劫丹', '仙缘'] },
    benefits: {
      healthMultiplier: 5000,
      spiritMultiplier: 10000,
      lifespan: 100000,
      newAbilities: ['半仙之体', '仙力初现', '预知天机']
    },
    tribulation: {
      id: 'tribulation_final',
      name: '九九重劫',
      description: '飞升前的终极考验，九九八十一道天劫',
      difficulty: 10,
      phases: [
        {
          id: 'trib_final_1',
          name: '第一重劫',
          description: '九道天雷',
          damage: 500000,
          duration: 9,
          requirements: { minHealth: 1400000, minSpirit: 1400000, minStats: { willpower: 2500 } }
        },
        {
          id: 'trib_final_2',
          name: '第二重劫',
          description: '九道心魔',
          damage: 800000,
          duration: 9,
          requirements: { minHealth: 1900000, minSpirit: 1900000, minStats: { willpower: 3000 } }
        }
      ],
      rewards: {
        expBonus: 10000000000,
        specialAbility: '仙人神通',
        title: '飞升仙人'
      }
    },
    breakthrough: {
      successRate: 0.005,
      requiredItems: ['渡劫丹', '仙缘', '仙器'],
      requiredConditions: ['大乘大圆满', '道法圆满', '功德深厚'],
      failureConsequences: ['渡劫失败', '可能陨落', '转世重修'],
      specialRequirements: ['渡劫丹可提升成功率至2%', '仙界入口渡劫可提升成功率']
    },
    specialConditions: [
      '渡劫期修士可以感应仙界',
      '渡劫期修士可以预知天机',
      '渡劫期修士可以进入仙界入口',
      '渡劫期修士可以炼制神器'
    ],
    cultivationMethods: ['任何功法'],
    forbiddenMethods: [],
    breakthroughItems: [],
    specialAbilities: ['半仙之体', '仙力初现', '预知天机', '神器炼制'],
    daoHeartRequirements: ['道法自然', '天人合一'],
    karmaEffects: ['功德决定飞升成败'],
    realmSecrets: ['渡劫成功即可飞升仙界'],
    historicalFigures: ['韩立', '南宫婉'],
    commonBottlenecks: ['功德不足', '天劫太强'],
    breakthroughTechniques: ['积累功德', '完善道法']
  }
]

export const specialPhysiques: SpecialPhysique[] = [
  {
    id: 'physique_heavenly_spirit',
    name: '天灵体',
    type: 'heavenly',
    rank: 9,
    description: '天生亲近天地灵气，修炼速度是普通人的十倍。天灵体修士可以轻松感应灵气，无需刻意修炼即可吸收天地灵气。',
    origin: '天生，极为罕见',
    history: '天灵体是天地宠儿，万中无一。历史上拥有天灵体的修士大多成为了一方巨擘。',
    abilities: ['灵气亲和', '修炼加速', '灵气感知', '灵气操控'],
    cultivationBonus: { '所有功法': 2.0, '灵系功法': 3.0 },
    weaknesses: ['灵气过于敏感', '易受灵气波动影响'],
    awakeningConditions: ['天生觉醒', '灵气充沛之地'],
    inheritanceRate: 0.0001,
    currentHolders: 10,
    maxRealm: '仙人',
    specialFeatures: ['天生灵气亲和', '无需引气入体', '修炼速度极快'],
    cultivationMethods: ['任何功法'],
    forbiddenMethods: [],
    evolutionPath: [
      {
        stage: '初醒',
        name: '天灵体·初醒',
        requiredRealm: '炼气期',
        requiredItems: [],
        abilities: ['灵气亲和'],
        description: '天生亲近灵气'
      },
      {
        stage: '觉醒',
        name: '天灵体·觉醒',
        requiredRealm: '结丹期',
        requiredItems: ['天灵石'],
        abilities: ['灵气亲和', '修炼加速'],
        description: '灵气亲和度大增'
      },
      {
        stage: '大成',
        name: '天灵体·大成',
        requiredRealm: '元婴期',
        requiredItems: ['天灵精华'],
        abilities: ['灵气亲和', '修炼加速', '灵气感知'],
        description: '可以感知周围灵气波动'
      },
      {
        stage: '圆满',
        name: '天灵体·圆满',
        requiredRealm: '化神期',
        requiredItems: ['天灵本源'],
        abilities: ['灵气亲和', '修炼加速', '灵气感知', '灵气操控'],
        description: '可以操控灵气'
      }
    ],
    relatedPhysiques: ['地灵体', '玄灵体']
  },
  {
    id: 'physique_yin_yang',
    name: '阴阳体',
    type: 'heavenly',
    rank: 9,
    description: '天生拥有阴阳二气，可以修炼任何阴阳属性功法。阴阳体修士可以同时修炼阴阳两种属性，实力远超同阶。',
    origin: '天生，极为罕见',
    history: '阴阳体是天地间最平衡的体质，万中无一。历史上拥有阴阳体的修士大多成为了一方巨擘。',
    abilities: ['阴阳平衡', '双属性修炼', '阴阳神通', '阴阳领域'],
    cultivationBonus: { '阴阳功法': 3.0, '五行功法': 1.5 },
    weaknesses: ['阴阳失衡', '易走火入魔'],
    awakeningConditions: ['天生觉醒', '阴阳之地'],
    inheritanceRate: 0.0001,
    currentHolders: 5,
    maxRealm: '仙人',
    specialFeatures: ['天生阴阳二气', '双属性修炼', '阴阳平衡'],
    cultivationMethods: ['阴阳诀', '太极诀', '阴阳属性功法'],
    forbiddenMethods: ['单属性功法'],
    relatedPhysiques: ['纯阳体', '纯阴体']
  },
  {
    id: 'physique_pure_yang',
    name: '纯阳体',
    type: 'heavenly',
    rank: 8,
    description: '天生拥有纯阳之气，修炼火属性功法速度极快。纯阳体修士可以施展强大的火系神通。',
    origin: '天生，罕见',
    history: '纯阳体是天地间最阳刚的体质，万中无一。',
    abilities: ['纯阳之气', '火系加成', '阳刚护体', '纯阳神通'],
    cultivationBonus: { '火系功法': 3.0, '阳系功法': 2.5 },
    weaknesses: ['阴气克制', '易阳气过盛'],
    awakeningConditions: ['天生觉醒', '极阳之地'],
    inheritanceRate: 0.001,
    currentHolders: 50,
    maxRealm: '仙人',
    specialFeatures: ['天生纯阳之气', '火系加成', '阳刚护体'],
    cultivationMethods: ['纯阳诀', '火系功法', '阳系功法'],
    forbiddenMethods: ['阴系功法'],
    relatedPhysiques: ['阴阳体', '纯阴体']
  },
  {
    id: 'physique_pure_yin',
    name: '纯阴体',
    type: 'heavenly',
    rank: 8,
    description: '天生拥有纯阴之气，修炼水属性功法速度极快。纯阴体修士可以施展强大的水系神通。',
    origin: '天生，罕见',
    history: '纯阴体是天地间最阴柔的体质，万中无一。',
    abilities: ['纯阴之气', '水系加成', '阴柔护体', '纯阴神通'],
    cultivationBonus: { '水系功法': 3.0, '阴系功法': 2.5 },
    weaknesses: ['阳气克制', '易阴气过盛'],
    awakeningConditions: ['天生觉醒', '极阴之地'],
    inheritanceRate: 0.001,
    currentHolders: 50,
    maxRealm: '仙人',
    specialFeatures: ['天生纯阴之气', '水系加成', '阴柔护体'],
    cultivationMethods: ['纯阴诀', '水系功法', '阴系功法'],
    forbiddenMethods: ['阳系功法'],
    relatedPhysiques: ['阴阳体', '纯阳体']
  },
  {
    id: 'physique_five_elements',
    name: '五行体',
    type: 'heavenly',
    rank: 8,
    description: '天生拥有五行之气，可以修炼任何五行属性功法。五行体修士可以同时修炼五行五种属性。',
    origin: '天生，罕见',
    history: '五行体是天地间最全面的体质，万中无一。',
    abilities: ['五行平衡', '五属性修炼', '五行神通', '五行领域'],
    cultivationBonus: { '五行功法': 2.5, '所有功法': 1.5 },
    weaknesses: ['五行失衡', '修炼复杂'],
    awakeningConditions: ['天生觉醒', '五行之地'],
    inheritanceRate: 0.001,
    currentHolders: 100,
    maxRealm: '仙人',
    specialFeatures: ['天生五行之气', '五属性修炼', '五行平衡'],
    cultivationMethods: ['五行诀', '五行属性功法'],
    forbiddenMethods: [],
    relatedPhysiques: ['天灵体', '地灵体']
  },
  {
    id: 'physique_sword_heart',
    name: '剑心体',
    type: 'mystic',
    rank: 8,
    description: '天生亲近剑道，剑术天赋惊人。剑心体修士可以轻松领悟剑意，剑术威力大增。',
    origin: '天生，罕见',
    history: '剑心体是剑修梦寐以求的体质，万中无一。',
    abilities: ['剑意天生', '剑心通明', '万剑归宗', '剑道领域'],
    cultivationBonus: { '剑道功法': 3.0, '剑系神通': 2.5 },
    weaknesses: ['剑道执念', '易入魔'],
    awakeningConditions: ['天生觉醒', '接触剑道'],
    inheritanceRate: 0.001,
    currentHolders: 200,
    maxRealm: '仙人',
    specialFeatures: ['天生剑意', '剑心通明', '剑术天赋'],
    cultivationMethods: ['剑道功法', '剑系神通'],
    forbiddenMethods: [],
    relatedPhysiques: ['刀心体', '枪心体']
  },
  {
    id: 'physique_buddha',
    name: '佛体',
    type: 'divine',
    rank: 9,
    description: '天生拥有佛性，修炼佛门功法速度极快。佛体修士可以施展强大的佛门神通。',
    origin: '天生，极为罕见',
    history: '佛体是佛门梦寐以求的体质，万中无一。',
    abilities: ['佛光普照', '金身不坏', '佛门神通', '因果感知'],
    cultivationBonus: { '佛门功法': 3.0, '因果功法': 2.0 },
    weaknesses: ['魔道克制', '因果缠身'],
    awakeningConditions: ['天生觉醒', '佛门圣地'],
    inheritanceRate: 0.0001,
    currentHolders: 20,
    maxRealm: '佛祖',
    specialFeatures: ['天生佛性', '金身不坏', '佛光普照'],
    cultivationMethods: ['佛门功法', '因果功法'],
    forbiddenMethods: ['魔道功法'],
    relatedPhysiques: ['魔体', '道体']
  },
  {
    id: 'physique_demon',
    name: '魔体',
    type: 'divine',
    rank: 9,
    description: '天生拥有魔性，修炼魔道功法速度极快。魔体修士可以施展强大的魔道神通。',
    origin: '天生，极为罕见',
    history: '魔体是魔道梦寐以求的体质，万中无一。',
    abilities: ['魔气滔天', '魔道神通', '心魔操控', '吞噬万物'],
    cultivationBonus: { '魔道功法': 3.0, '吞噬功法': 2.0 },
    weaknesses: ['正道克制', '心魔反噬'],
    awakeningConditions: ['天生觉醒', '魔域'],
    inheritanceRate: 0.0001,
    currentHolders: 30,
    maxRealm: '魔祖',
    specialFeatures: ['天生魔性', '魔气滔天', '吞噬万物'],
    cultivationMethods: ['魔道功法', '吞噬功法'],
    forbiddenMethods: ['佛门功法', '正道功法'],
    relatedPhysiques: ['佛体', '道体']
  },
  {
    id: 'physique_chaos',
    name: '混沌体',
    type: 'chaos',
    rank: 10,
    description: '传说中最强大的体质，拥有混沌之气。混沌体修士可以修炼任何功法，无视任何属性限制。',
    origin: '传说，几乎不存在',
    history: '混沌体是传说中最强大的体质，亿万人中难出一人。',
    abilities: ['混沌之气', '万法归一', '混沌神通', '创造法则'],
    cultivationBonus: { '所有功法': 5.0 },
    weaknesses: ['混沌难控', '易走火入魔'],
    awakeningConditions: ['天生觉醒', '混沌之地', '大机缘'],
    inheritanceRate: 0.0000001,
    currentHolders: 1,
    maxRealm: '混沌主宰',
    specialFeatures: ['混沌之气', '万法归一', '创造法则'],
    cultivationMethods: ['任何功法'],
    forbiddenMethods: [],
    relatedPhysiques: []
  },
  {
    id: 'physique_immortal',
    name: '仙体',
    type: 'divine',
    rank: 10,
    description: '天生拥有仙气，修炼速度极快。仙体修士可以施展强大的仙术。',
    origin: '传说，几乎不存在',
    history: '仙体是传说中最接近仙人的体质，亿万人中难出一人。',
    abilities: ['仙气护体', '仙术神通', '长生不老', '天劫减免'],
    cultivationBonus: { '所有功法': 4.0 },
    weaknesses: ['仙气外泄', '天道嫉妒'],
    awakeningConditions: ['天生觉醒', '仙界碎片', '大机缘'],
    inheritanceRate: 0.000001,
    currentHolders: 3,
    maxRealm: '仙人',
    specialFeatures: ['仙气护体', '长生不老', '天劫减免'],
    cultivationMethods: ['任何功法'],
    forbiddenMethods: [],
    relatedPhysiques: []
  }
]

export const specialTalents: SpecialTalent[] = [
  {
    id: 'talent_sword_heart',
    name: '剑心通明',
    type: 'combat',
    rank: 9,
    description: '天生剑心，剑术天赋惊人。可以轻松领悟剑意，剑术威力大增。',
    origin: '天生，罕见',
    effects: [
      { name: '剑术加成', description: '剑术威力提升', value: 50, conditions: ['使用剑类武器'] },
      { name: '剑意领悟', description: '剑意领悟速度提升', value: 100, conditions: ['修炼剑道功法'] }
    ],
    awakeningConditions: ['天生觉醒', '接触剑道'],
    inheritanceRate: 0.001,
    currentHolders: 200,
    cultivationBonus: { '剑道功法': 1.5 },
    conflicts: ['刀心通明', '枪心通明'],
    synergies: ['剑道血脉', '剑灵体']
  },
  {
    id: 'talent_pill_master',
    name: '丹道天才',
    type: 'cultivation',
    rank: 8,
    description: '天生丹道天赋，炼丹成功率极高。可以炼制高品质丹药。',
    origin: '天生，罕见',
    effects: [
      { name: '炼丹加成', description: '炼丹成功率提升', value: 30 },
      { name: '丹药品质', description: '丹药品质提升', value: 20 }
    ],
    awakeningConditions: ['天生觉醒', '接触丹道'],
    inheritanceRate: 0.001,
    currentHolders: 500,
    cultivationBonus: { '丹道功法': 1.5 },
    synergies: ['火灵体', '丹道传承']
  },
  {
    id: 'talent_tool_master',
    name: '器道天才',
    type: 'cultivation',
    rank: 8,
    description: '天生器道天赋，炼器成功率极高。可以炼制高品质法器。',
    origin: '天生，罕见',
    effects: [
      { name: '炼器加成', description: '炼器成功率提升', value: 30 },
      { name: '法器品质', description: '法器品质提升', value: 20 }
    ],
    awakeningConditions: ['天生觉醒', '接触器道'],
    inheritanceRate: 0.001,
    currentHolders: 500,
    cultivationBonus: { '器道功法': 1.5 },
    synergies: ['火灵体', '器道传承']
  },
  {
    id: 'talent_formation_master',
    name: '阵道天才',
    type: 'cultivation',
    rank: 8,
    description: '天生阵道天赋，布阵成功率极高。可以布置强大的阵法。',
    origin: '天生，罕见',
    effects: [
      { name: '布阵加成', description: '布阵成功率提升', value: 30 },
      { name: '阵法威力', description: '阵法威力提升', value: 20 }
    ],
    awakeningConditions: ['天生觉醒', '接触阵道'],
    inheritanceRate: 0.001,
    currentHolders: 500,
    cultivationBonus: { '阵道功法': 1.5 },
    synergies: ['五行体', '阵道传承']
  },
  {
    id: 'talent_combat_instinct',
    name: '战斗本能',
    type: 'combat',
    rank: 8,
    description: '天生战斗本能，战斗中可以预判敌人动作。',
    origin: '天生，罕见',
    effects: [
      { name: '闪避加成', description: '闪避率提升', value: 20 },
      { name: '暴击加成', description: '暴击率提升', value: 15 }
    ],
    awakeningConditions: ['天生觉醒', '经历战斗'],
    inheritanceRate: 0.001,
    currentHolders: 1000,
    synergies: ['战斗血脉', '武道天赋']
  },
  {
    id: 'talent_spirit_perception',
    name: '神识过人',
    type: 'auxiliary',
    rank: 8,
    description: '天生神识强大，感知范围极广。',
    origin: '天生，罕见',
    effects: [
      { name: '感知范围', description: '感知范围提升', value: 100 },
      { name: '神识强度', description: '神识强度提升', value: 50 }
    ],
    awakeningConditions: ['天生觉醒', '修炼神识功法'],
    inheritanceRate: 0.001,
    currentHolders: 500,
    synergies: ['天灵体', '神识传承']
  },
  {
    id: 'talent_lucky',
    name: '天命之子',
    type: 'special',
    rank: 10,
    description: '天生运气极好，机缘不断。',
    origin: '传说，几乎不存在',
    effects: [
      { name: '机缘加成', description: '遇到机缘的概率提升', value: 100 },
      { name: '危险规避', description: '遇到危险的概率降低', value: 50 }
    ],
    awakeningConditions: ['天生觉醒', '大机缘'],
    inheritanceRate: 0.0000001,
    currentHolders: 1,
    synergies: ['天灵体', '仙体']
  },
  {
    id: 'talent_insight',
    name: '悟性超群',
    type: 'cultivation',
    rank: 9,
    description: '天生悟性极高，可以快速领悟功法和法则。',
    origin: '天生，罕见',
    effects: [
      { name: '功法领悟', description: '功法领悟速度提升', value: 50 },
      { name: '法则领悟', description: '法则领悟速度提升', value: 30 }
    ],
    awakeningConditions: ['天生觉醒', '修炼高深功法'],
    inheritanceRate: 0.0001,
    currentHolders: 100,
    cultivationBonus: { '所有功法': 1.3 },
    synergies: ['天灵体', '道体']
  },
  {
    id: 'talent_willpower',
    name: '意志坚定',
    type: 'auxiliary',
    rank: 8,
    description: '天生意志坚定，不易受心魔侵扰。',
    origin: '天生，常见',
    effects: [
      { name: '心魔抵抗', description: '心魔抵抗提升', value: 50 },
      { name: '渡劫加成', description: '渡劫成功率提升', value: 10 }
    ],
    awakeningConditions: ['天生觉醒', '经历磨难'],
    inheritanceRate: 0.01,
    currentHolders: 10000,
    synergies: ['道心坚定', '佛体']
  },
  {
    id: 'talent_memory',
    name: '过目不忘',
    type: 'auxiliary',
    rank: 7,
    description: '天生记忆力极强，可以记住所有看过的东西。',
    origin: '天生，常见',
    effects: [
      { name: '记忆加成', description: '记忆效率提升', value: 100 },
      { name: '功法记忆', description: '功法记忆速度提升', value: 50 }
    ],
    awakeningConditions: ['天生觉醒'],
    inheritanceRate: 0.01,
    currentHolders: 5000,
    synergies: ['悟性超群', '神识过人']
  }
]

export const extendedSpiritualRoots: ExtendedSpiritualRoot[] = [
  {
    id: 'root_heavenly',
    name: '天灵根',
    type: 'heavenly',
    elements: ['单一属性'],
    quality: 100,
    description: '最顶级的灵根，修炼速度是普通人的十倍。天灵根修士可以轻松感应灵气，修炼速度极快。',
    cultivationSpeed: 10,
    specialAbilities: ['灵气亲和', '修炼加速'],
    rarity: 0.0001,
    cultivationMethods: ['任何功法'],
    forbiddenMethods: [],
    awakeningConditions: ['天生觉醒'],
    historicalHolders: ['青云仙尊', '玄天老祖'],
    evolutionPath: [
      {
        stage: '初醒',
        name: '天灵根·初醒',
        requiredRealm: '炼气期',
        requiredItems: [],
        abilities: ['灵气亲和'],
        qualityBonus: 0,
        description: '天生亲近灵气'
      },
      {
        stage: '觉醒',
        name: '天灵根·觉醒',
        requiredRealm: '结丹期',
        requiredItems: ['天灵石'],
        abilities: ['灵气亲和', '修炼加速'],
        qualityBonus: 10,
        description: '修炼速度大增'
      },
      {
        stage: '大成',
        name: '天灵根·大成',
        requiredRealm: '元婴期',
        requiredItems: ['天灵精华'],
        abilities: ['灵气亲和', '修炼加速', '灵气感知'],
        qualityBonus: 20,
        description: '可以感知灵气波动'
      },
      {
        stage: '圆满',
        name: '天灵根·圆满',
        requiredRealm: '化神期',
        requiredItems: ['天灵本源'],
        abilities: ['灵气亲和', '修炼加速', '灵气感知', '灵气操控'],
        qualityBonus: 30,
        description: '可以操控灵气'
      }
    ]
  },
  {
    id: 'root_true',
    name: '真灵根',
    type: 'true',
    elements: ['两到三种属性'],
    quality: 70,
    description: '高级灵根，修炼速度是普通人的五倍。真灵根修士修炼速度较快。',
    cultivationSpeed: 5,
    specialAbilities: ['修炼加速'],
    rarity: 0.001,
    cultivationMethods: ['对应属性功法'],
    forbiddenMethods: ['相克属性功法'],
    awakeningConditions: ['天生觉醒'],
    historicalHolders: ['万剑真人', '丹霞仙子']
  },
  {
    id: 'root_false',
    name: '伪灵根',
    type: 'false',
    elements: ['四到五种属性'],
    quality: 40,
    description: '普通灵根，修炼速度是普通人的两倍。伪灵根修士修炼速度一般。',
    cultivationSpeed: 2,
    specialAbilities: [],
    rarity: 0.1,
    cultivationMethods: ['对应属性功法'],
    forbiddenMethods: ['相克属性功法'],
    awakeningConditions: ['天生觉醒'],
    historicalHolders: ['普通修士']
  },
  {
    id: 'root_mutated',
    name: '变异灵根',
    type: 'mutated',
    elements: ['变异属性'],
    quality: 80,
    description: '变异灵根，修炼速度取决于变异属性。变异灵根修士可以修炼特殊功法。',
    cultivationSpeed: 6,
    specialAbilities: ['变异属性加成'],
    rarity: 0.0001,
    cultivationMethods: ['变异属性功法'],
    forbiddenMethods: ['普通属性功法'],
    awakeningConditions: ['天生觉醒', '特殊环境'],
    historicalHolders: ['变异修士']
  },
  {
    id: 'root_five_elements',
    name: '五行灵根',
    type: 'false',
    elements: ['金', '木', '水', '火', '土'],
    quality: 30,
    description: '五行灵根，修炼速度最慢。但五行灵根修士可以修炼五行功法，后劲十足。',
    cultivationSpeed: 1,
    specialAbilities: ['五行平衡'],
    rarity: 0.3,
    cultivationMethods: ['五行功法'],
    forbiddenMethods: [],
    awakeningConditions: ['天生觉醒'],
    historicalHolders: ['五行修士'],
    evolutionPath: [
      {
        stage: '初醒',
        name: '五行灵根·初醒',
        requiredRealm: '炼气期',
        requiredItems: [],
        abilities: ['五行平衡'],
        qualityBonus: 0,
        description: '五行平衡'
      },
      {
        stage: '觉醒',
        name: '五行灵根·觉醒',
        requiredRealm: '结丹期',
        requiredItems: ['五行石'],
        abilities: ['五行平衡', '五行加成'],
        qualityBonus: 10,
        description: '五行功法加成'
      }
    ]
  }
]

export const daoHeartLevels: DaoHeartLevel[] = [
  {
    id: 'dao_heart_1',
    name: '初入道心',
    level: 1,
    description: '刚刚踏入修仙之门，道心初成。',
    effects: {
      cultivationBonus: 0.05,
      tribulationBonus: 0.02,
      mentalResistance: 10,
      karmaReduction: 0,
      specialEffects: []
    },
    requirements: ['踏入修仙之门'],
    breakthroughMethod: '修炼功法，感悟天地',
    historicalHolders: ['普通修士']
  },
  {
    id: 'dao_heart_2',
    name: '坚定道心',
    level: 2,
    description: '道心坚定，不易受外物影响。',
    effects: {
      cultivationBonus: 0.1,
      tribulationBonus: 0.05,
      mentalResistance: 20,
      karmaReduction: 0.01,
      specialEffects: ['心魔抵抗+10%']
    },
    requirements: ['筑基期', '经历磨难'],
    breakthroughMethod: '经历磨难，坚定意志',
    historicalHolders: ['筑基修士']
  },
  {
    id: 'dao_heart_3',
    name: '明悟道心',
    level: 3,
    description: '明悟自己的道，道心更加坚定。',
    effects: {
      cultivationBonus: 0.15,
      tribulationBonus: 0.1,
      mentalResistance: 30,
      karmaReduction: 0.02,
      specialEffects: ['心魔抵抗+20%', '道法领悟+10%']
    },
    requirements: ['结丹期', '明悟自己的道'],
    breakthroughMethod: '感悟天地，明悟自我',
    historicalHolders: ['结丹修士']
  },
  {
    id: 'dao_heart_4',
    name: '无漏道心',
    level: 4,
    description: '道心无漏，心魔难侵。',
    effects: {
      cultivationBonus: 0.2,
      tribulationBonus: 0.15,
      mentalResistance: 50,
      karmaReduction: 0.05,
      specialEffects: ['心魔抵抗+30%', '道法领悟+20%', '因果减免']
    },
    requirements: ['元婴期', '斩断凡尘'],
    breakthroughMethod: '斩断凡尘，无漏无缺',
    historicalHolders: ['元婴修士']
  },
  {
    id: 'dao_heart_5',
    name: '圆满道心',
    level: 5,
    description: '道心圆满，与道合一。',
    effects: {
      cultivationBonus: 0.3,
      tribulationBonus: 0.2,
      mentalResistance: 70,
      karmaReduction: 0.1,
      specialEffects: ['心魔免疫', '道法领悟+30%', '因果减免', '天劫减免']
    },
    requirements: ['化神期', '融合法则'],
    breakthroughMethod: '融合法则，与道合一',
    historicalHolders: ['化神修士']
  },
  {
    id: 'dao_heart_6',
    name: '不灭道心',
    level: 6,
    description: '道心不灭，即使肉身毁灭，道心依然存在。',
    effects: {
      cultivationBonus: 0.5,
      tribulationBonus: 0.3,
      mentalResistance: 90,
      karmaReduction: 0.2,
      specialEffects: ['心魔免疫', '道法领悟+50%', '因果减免', '天劫减免', '道心不灭']
    },
    requirements: ['炼虚期', '虚空合一'],
    breakthroughMethod: '虚空合一，道心不灭',
    historicalHolders: ['炼虚修士']
  },
  {
    id: 'dao_heart_7',
    name: '天人合一',
    level: 7,
    description: '道心与天地合一，可以借用天地之力。',
    effects: {
      cultivationBonus: 1.0,
      tribulationBonus: 0.5,
      mentalResistance: 100,
      karmaReduction: 0.3,
      specialEffects: ['心魔免疫', '道法领悟+100%', '因果减免', '天劫减免', '道心不灭', '天人合一']
    },
    requirements: ['合体期', '天人合一'],
    breakthroughMethod: '天人合一，道法自然',
    historicalHolders: ['合体修士']
  },
  {
    id: 'dao_heart_8',
    name: '道法自然',
    level: 8,
    description: '道心达到最高境界，道法自然，无为而无不为。',
    effects: {
      cultivationBonus: 2.0,
      tribulationBonus: 1.0,
      mentalResistance: 100,
      karmaReduction: 0.5,
      specialEffects: ['心魔免疫', '道法领悟+200%', '因果减免', '天劫减免', '道心不灭', '天人合一', '道法自然']
    },
    requirements: ['大乘期', '道法自然'],
    breakthroughMethod: '道法自然，无为而无不为',
    historicalHolders: ['大乘修士', '韩立']
  }
]

export const soulTypes: SoulType[] = [
  {
    id: 'soul_mortal',
    name: '凡人魂',
    type: 'mortal',
    rank: 1,
    description: '普通凡人的灵魂，转世后无记忆。',
    abilities: [],
    cultivationBonus: {},
    reincarnationMemory: 0,
    soulStrength: 10,
    specialFeatures: []
  },
  {
    id: 'soul_spiritual',
    name: '灵魂',
    type: 'spiritual',
    rank: 3,
    description: '修士的灵魂，转世后保留部分记忆。',
    abilities: ['神识初现'],
    cultivationBonus: { '神识功法': 1.2 },
    reincarnationMemory: 10,
    soulStrength: 50,
    specialFeatures: ['神识初现']
  },
  {
    id: 'soul_immortal',
    name: '仙魂',
    type: 'immortal',
    rank: 7,
    description: '仙人的灵魂，转世后保留大部分记忆。',
    abilities: ['神识化形', '灵魂出窍', '夺舍重修'],
    cultivationBonus: { '神识功法': 2.0, '灵魂功法': 1.5 },
    reincarnationMemory: 50,
    soulStrength: 500,
    specialFeatures: ['神识化形', '灵魂出窍', '夺舍重修']
  },
  {
    id: 'soul_divine',
    name: '神魂',
    type: 'divine',
    rank: 9,
    description: '神明的灵魂，转世后保留完整记忆。',
    abilities: ['神识化形', '灵魂出窍', '夺舍重修', '分神化念'],
    cultivationBonus: { '神识功法': 3.0, '灵魂功法': 2.0 },
    reincarnationMemory: 80,
    soulStrength: 2000,
    specialFeatures: ['神识化形', '灵魂出窍', '夺舍重修', '分神化念']
  },
  {
    id: 'soul_chaos',
    name: '混沌魂',
    type: 'chaos',
    rank: 10,
    description: '传说中最强大的灵魂，可以创造灵魂。',
    abilities: ['神识化形', '灵魂出窍', '夺舍重修', '分神化念', '创造灵魂'],
    cultivationBonus: { '所有功法': 2.0 },
    reincarnationMemory: 100,
    soulStrength: 10000,
    specialFeatures: ['神识化形', '灵魂出窍', '夺舍重修', '分神化念', '创造灵魂']
  }
]

export const constitutions: Constitution[] = [
  {
    id: 'constitution_mortal',
    name: '凡人体',
    type: 'mortal',
    rank: 1,
    description: '普通凡人的体质，无特殊能力。',
    abilities: [],
    cultivationBonus: {},
    bodyStrength: 10,
    regeneration: 1,
    specialFeatures: [],
    weaknesses: []
  },
  {
    id: 'constitution_spiritual',
    name: '灵体',
    type: 'spiritual',
    rank: 3,
    description: '修士的体质，可以吸收灵气。',
    abilities: ['灵气吸收', '体质强化'],
    cultivationBonus: { '所有功法': 1.1 },
    bodyStrength: 50,
    regeneration: 2,
    specialFeatures: ['灵气吸收', '体质强化'],
    weaknesses: []
  },
  {
    id: 'constitution_immortal',
    name: '仙体',
    type: 'immortal',
    rank: 7,
    description: '仙人的体质，肉身不灭。',
    abilities: ['肉身不灭', '仙气护体', '快速恢复'],
    cultivationBonus: { '所有功法': 1.5 },
    bodyStrength: 500,
    regeneration: 10,
    specialFeatures: ['肉身不灭', '仙气护体', '快速恢复'],
    weaknesses: []
  },
  {
    id: 'constitution_divine',
    name: '神体',
    type: 'divine',
    rank: 9,
    description: '神明的体质，肉身永恒。',
    abilities: ['肉身永恒', '神力护体', '瞬间恢复', '不灭金身'],
    cultivationBonus: { '所有功法': 2.0 },
    bodyStrength: 2000,
    regeneration: 100,
    specialFeatures: ['肉身永恒', '神力护体', '瞬间恢复', '不灭金身'],
    weaknesses: []
  },
  {
    id: 'constitution_chaos',
    name: '混沌体',
    type: 'chaos',
    rank: 10,
    description: '传说中最强大的体质，可以创造肉身。',
    abilities: ['肉身永恒', '神力护体', '瞬间恢复', '不灭金身', '创造肉身'],
    cultivationBonus: { '所有功法': 3.0 },
    bodyStrength: 10000,
    regeneration: 1000,
    specialFeatures: ['肉身永恒', '神力护体', '瞬间恢复', '不灭金身', '创造肉身'],
    weaknesses: []
  }
]