export interface CultivationRealm {
  id: string
  name: string
  level: number
  description: string
  stages: CultivationStage[]
  requirements: {
    minExp: number
    requiredItems?: string[]
    requiredStats?: { [key: string]: number }
  }
  benefits: {
    healthMultiplier: number
    spiritMultiplier: number
    lifespan: number
    newAbilities: string[]
  }
  tribulation?: TribulationInfo
  breakthrough: BreakthroughInfo
}

export interface CultivationStage {
  id: string
  name: string
  level: number
  description: string
  expRequired: number
  benefits: {
    healthBonus: number
    spiritBonus: number
    statBonus: { [key: string]: number }
  }
}

export interface TribulationInfo {
  id: string
  name: string
  description: string
  difficulty: number
  phases: TribulationPhase[]
  rewards: {
    expBonus: number
    specialAbility?: string
    title?: string
  }
}

export interface TribulationPhase {
  id: string
  name: string
  description: string
  damage: number
  duration: number
  requirements: {
    minHealth: number
    minSpirit: number
    minStats: { [key: string]: number }
  }
}

export interface BreakthroughInfo {
  successRate: number
  requiredItems: string[]
  requiredConditions: string[]
  failureConsequences: string[]
  specialRequirements?: string[]
}

export interface SpiritualRoot {
  id: string
  name: string
  type: 'heavenly' | 'true' | 'false' | 'mutated'
  elements: string[]
  quality: number
  description: string
  cultivationSpeed: number
  specialAbilities: string[]
  rarity: number
}

export interface DaoHeart {
  id: string
  name: string
  type: string
  description: string
  effects: {
    cultivationBonus: number
    tribulationBonus: number
    mentalResistance: number
    specialEffects: string[]
  }
  requirements: string[]
}

export const cultivationRealms: CultivationRealm[] = [
  {
    id: 'realm_mortal',
    name: '凡人',
    level: 0,
    description: '未踏入修仙之门的普通人，寿命短暂，力量微薄。但即使是凡人，也有踏入仙途的可能，只看是否有那份机缘和毅力。',
    stages: [
      {
        id: 'mortal_1',
        name: '凡人初期',
        level: 0,
        description: '刚刚开始接触修仙知识的凡人',
        expRequired: 0,
        benefits: { healthBonus: 0, spiritBonus: 0, statBonus: {} }
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
      successRate: 1,
      requiredItems: [],
      requiredConditions: ['拥有灵根', '感应灵气'],
      failureConsequences: []
    }
  },
  {
    id: 'realm_qi_refining',
    name: '炼气期',
    level: 1,
    description: '修仙的第一步，通过吸纳天地灵气，淬炼肉身，开辟丹田。炼气期修士可以施展简单的法术，寿元可达一百五十岁。炼气期分为十三层，每一层都需要大量灵气积累。',
    stages: [
      {
        id: 'qi_1',
        name: '炼气一层',
        level: 1,
        description: '感应灵气，开始引气入体',
        expRequired: 100,
        benefits: { healthBonus: 10, spiritBonus: 10, statBonus: { strength: 1 } }
      },
      {
        id: 'qi_2',
        name: '炼气二层',
        level: 2,
        description: '灵气在经脉中流转，身体开始强化',
        expRequired: 200,
        benefits: { healthBonus: 15, spiritBonus: 15, statBonus: { agility: 1 } }
      },
      {
        id: 'qi_3',
        name: '炼气三层',
        level: 3,
        description: '灵气开始凝聚，可以施展简单法术',
        expRequired: 400,
        benefits: { healthBonus: 20, spiritBonus: 20, statBonus: { intelligence: 1 } }
      },
      {
        id: 'qi_4',
        name: '炼气四层',
        level: 4,
        description: '法术威力增强，可以御器飞行',
        expRequired: 800,
        benefits: { healthBonus: 30, spiritBonus: 30, statBonus: { willpower: 1 } }
      },
      {
        id: 'qi_5',
        name: '炼气五层',
        level: 5,
        description: '灵气更加凝实，可以施展中等法术',
        expRequired: 1500,
        benefits: { healthBonus: 40, spiritBonus: 40, statBonus: { strength: 2 } }
      },
      {
        id: 'qi_6',
        name: '炼气六层',
        level: 6,
        description: '炼气中期，实力大增',
        expRequired: 3000,
        benefits: { healthBonus: 60, spiritBonus: 60, statBonus: { agility: 2 } }
      },
      {
        id: 'qi_7',
        name: '炼气七层',
        level: 7,
        description: '灵气开始向丹田汇聚',
        expRequired: 6000,
        benefits: { healthBonus: 80, spiritBonus: 80, statBonus: { intelligence: 2 } }
      },
      {
        id: 'qi_8',
        name: '炼气八层',
        level: 8,
        description: '丹田开始成形，灵气更加精纯',
        expRequired: 12000,
        benefits: { healthBonus: 100, spiritBonus: 100, statBonus: { willpower: 2 } }
      },
      {
        id: 'qi_9',
        name: '炼气九层',
        level: 9,
        description: '炼气后期，即将筑基',
        expRequired: 24000,
        benefits: { healthBonus: 150, spiritBonus: 150, statBonus: { luck: 1 } }
      },
      {
        id: 'qi_10',
        name: '炼气十层',
        level: 10,
        description: '炼气圆满，准备筑基',
        expRequired: 48000,
        benefits: { healthBonus: 200, spiritBonus: 200, statBonus: { strength: 3 } }
      },
      {
        id: 'qi_11',
        name: '炼气十一层',
        level: 11,
        description: '极少数天才可以达到的境界',
        expRequired: 96000,
        benefits: { healthBonus: 300, spiritBonus: 300, statBonus: { agility: 3 } }
      },
      {
        id: 'qi_12',
        name: '炼气十二层',
        level: 12,
        description: '传说中的境界，筑基成功率极高',
        expRequired: 192000,
        benefits: { healthBonus: 400, spiritBonus: 400, statBonus: { intelligence: 3 } }
      },
      {
        id: 'qi_13',
        name: '炼气十三层',
        level: 13,
        description: '炼气巅峰，万无一失的筑基',
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
    }
  },
  {
    id: 'realm_foundation',
    name: '筑基期',
    level: 2,
    description: '修仙的第二步，将炼气期凝聚的灵气压缩成液态，形成真元。筑基期修士可以施展更强的法术，寿元可达三百岁。筑基期分为初期、中期、后期和大圆满四个阶段。',
    stages: [
      {
        id: 'foundation_early',
        name: '筑基初期',
        level: 14,
        description: '刚刚筑基成功，真元初成',
        expRequired: 500000,
        benefits: { healthBonus: 600, spiritBonus: 600, statBonus: { strength: 5, agility: 5 } }
      },
      {
        id: 'foundation_mid',
        name: '筑基中期',
        level: 15,
        description: '真元逐渐凝实，实力大增',
        expRequired: 1000000,
        benefits: { healthBonus: 800, spiritBonus: 800, statBonus: { intelligence: 5, willpower: 5 } }
      },
      {
        id: 'foundation_late',
        name: '筑基后期',
        level: 16,
        description: '真元精纯，准备结丹',
        expRequired: 2000000,
        benefits: { healthBonus: 1000, spiritBonus: 1000, statBonus: { strength: 8, agility: 8 } }
      },
      {
        id: 'foundation_perfect',
        name: '筑基大圆满',
        level: 17,
        description: '筑基巅峰，结丹在即',
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
    }
  },
  {
    id: 'realm_core_formation',
    name: '结丹期',
    level: 3,
    description: '修仙的第三步，将真元压缩成固体的金丹。结丹期修士可以施展强大的法术，寿元可达五百岁。结丹期分为初期、中期、后期和大圆满四个阶段。',
    stages: [
      {
        id: 'core_early',
        name: '结丹初期',
        level: 18,
        description: '金丹初成，法力大增',
        expRequired: 8000000,
        benefits: { healthBonus: 2000, spiritBonus: 2000, statBonus: { strength: 15, agility: 15, intelligence: 15 } }
      },
      {
        id: 'core_mid',
        name: '结丹中期',
        level: 19,
        description: '金丹逐渐凝实，神通广大',
        expRequired: 16000000,
        benefits: { healthBonus: 3000, spiritBonus: 3000, statBonus: { willpower: 15, luck: 5 } }
      },
      {
        id: 'core_late',
        name: '结丹后期',
        level: 20,
        description: '金丹精纯，准备元婴',
        expRequired: 32000000,
        benefits: { healthBonus: 4000, spiritBonus: 4000, statBonus: { strength: 20, agility: 20 } }
      },
      {
        id: 'core_perfect',
        name: '结丹大圆满',
        level: 21,
        description: '结丹巅峰，元婴在即',
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
    }
  },
  {
    id: 'realm_nascent_soul',
    name: '元婴期',
    level: 4,
    description: '修仙的第四步，金丹破碎，孕育元婴。元婴期修士可以施展毁天灭地的法术，寿元可达一千岁。元婴期分为初期、中期、后期和大圆满四个阶段。',
    stages: [
      {
        id: 'nascent_early',
        name: '元婴初期',
        level: 22,
        description: '元婴初生，神通广大',
        expRequired: 128000000,
        benefits: { healthBonus: 8000, spiritBonus: 8000, statBonus: { strength: 30, agility: 30, intelligence: 30 } }
      },
      {
        id: 'nascent_mid',
        name: '元婴中期',
        level: 23,
        description: '元婴成长，法力无边',
        expRequired: 256000000,
        benefits: { healthBonus: 12000, spiritBonus: 12000, statBonus: { willpower: 30, luck: 10 } }
      },
      {
        id: 'nascent_late',
        name: '元婴后期',
        level: 24,
        description: '元婴强大，准备化神',
        expRequired: 512000000,
        benefits: { healthBonus: 16000, spiritBonus: 16000, statBonus: { strength: 40, agility: 40 } }
      },
      {
        id: 'nascent_perfect',
        name: '元婴大圆满',
        level: 25,
        description: '元婴巅峰，化神在即',
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
    }
  },
  {
    id: 'realm_spirit_severing',
    name: '化神期',
    level: 5,
    description: '修仙的第五步，元婴与神魂融合，化神出窍。化神期修士可以操控天地法则，寿元可达两千岁。化神期分为初期、中期、后期和大圆满四个阶段。',
    stages: [
      {
        id: 'spirit_early',
        name: '化神初期',
        level: 26,
        description: '神魂初化，掌控法则',
        expRequired: 2048000000,
        benefits: { healthBonus: 30000, spiritBonus: 30000, statBonus: { strength: 50, agility: 50, intelligence: 50 } }
      },
      {
        id: 'spirit_mid',
        name: '化神中期',
        level: 27,
        description: '法则掌控加深',
        expRequired: 4096000000,
        benefits: { healthBonus: 40000, spiritBonus: 40000, statBonus: { willpower: 50, luck: 20 } }
      },
      {
        id: 'spirit_late',
        name: '化神后期',
        level: 28,
        description: '法则大成，准备炼虚',
        expRequired: 8192000000,
        benefits: { healthBonus: 50000, spiritBonus: 50000, statBonus: { strength: 60, agility: 60 } }
      },
      {
        id: 'spirit_perfect',
        name: '化神大圆满',
        level: 29,
        description: '化神巅峰，炼虚在即',
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
    }
  },
  {
    id: 'realm_void_refining',
    name: '炼虚期',
    level: 6,
    description: '修仙的第六步，将肉身与虚空融合，炼虚合道。炼虚期修士可以操控空间法则，寿元可达五千岁。炼虚期分为初期、中期、后期和大圆满四个阶段。',
    stages: [
      {
        id: 'void_early',
        name: '炼虚初期',
        level: 30,
        description: '虚空初融，空间掌控',
        expRequired: 32768000000,
        benefits: { healthBonus: 80000, spiritBonus: 80000, statBonus: { strength: 80, agility: 80, intelligence: 80 } }
      },
      {
        id: 'void_mid',
        name: '炼虚中期',
        level: 31,
        description: '空间法则大成',
        expRequired: 65536000000,
        benefits: { healthBonus: 100000, spiritBonus: 100000, statBonus: { willpower: 80, luck: 30 } }
      },
      {
        id: 'void_late',
        name: '炼虚后期',
        level: 32,
        description: '准备合体',
        expRequired: 131072000000,
        benefits: { healthBonus: 120000, spiritBonus: 120000, statBonus: { strength: 100, agility: 100 } }
      },
      {
        id: 'void_perfect',
        name: '炼虚大圆满',
        level: 33,
        description: '炼虚巅峰，合体在即',
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
    }
  },
  {
    id: 'realm_body_integration',
    name: '合体期',
    level: 7,
    description: '修仙的第七步，元婴与肉身完美融合，合体归一。合体期修士可以施展毁天灭地的神通，寿元可达一万岁。合体期分为初期、中期、后期和大圆满四个阶段。',
    stages: [
      {
        id: 'integration_early',
        name: '合体初期',
        level: 34,
        description: '元婴肉身融合',
        expRequired: 524288000000,
        benefits: { healthBonus: 200000, spiritBonus: 200000, statBonus: { strength: 150, agility: 150, intelligence: 150 } }
      },
      {
        id: 'integration_mid',
        name: '合体中期',
        level: 35,
        description: '融合加深',
        expRequired: 1048576000000,
        benefits: { healthBonus: 250000, spiritBonus: 250000, statBonus: { willpower: 150, luck: 50 } }
      },
      {
        id: 'integration_late',
        name: '合体后期',
        level: 36,
        description: '准备大乘',
        expRequired: 2097152000000,
        benefits: { healthBonus: 300000, spiritBonus: 300000, statBonus: { strength: 200, agility: 200 } }
      },
      {
        id: 'integration_perfect',
        name: '合体大圆满',
        level: 37,
        description: '合体巅峰，大乘在即',
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
    }
  },
  {
    id: 'realm_mahayana',
    name: '大乘期',
    level: 8,
    description: '修仙的第八步，法力圆满，准备飞升。大乘期修士已经是凡间最强，寿元可达五万岁。大乘期分为初期、中期、后期和大圆满四个阶段。',
    stages: [
      {
        id: 'mahayana_early',
        name: '大乘初期',
        level: 38,
        description: '法力初满',
        expRequired: 8388608000000,
        benefits: { healthBonus: 500000, spiritBonus: 500000, statBonus: { strength: 300, agility: 300, intelligence: 300 } }
      },
      {
        id: 'mahayana_mid',
        name: '大乘中期',
        level: 39,
        description: '法力深厚',
        expRequired: 16777216000000,
        benefits: { healthBonus: 700000, spiritBonus: 700000, statBonus: { willpower: 300, luck: 100 } }
      },
      {
        id: 'mahayana_late',
        name: '大乘后期',
        level: 40,
        description: '准备渡劫',
        expRequired: 33554432000000,
        benefits: { healthBonus: 900000, spiritBonus: 900000, statBonus: { strength: 400, agility: 400 } }
      },
      {
        id: 'mahayana_perfect',
        name: '大乘大圆满',
        level: 41,
        description: '大乘巅峰，渡劫在即',
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
    }
  },
  {
    id: 'realm_tribulation',
    name: '渡劫期',
    level: 9,
    description: '修仙的最后一步，经历九九重劫，飞升仙界。渡劫期修士已经是凡间的巅峰，只差一步便可成仙。渡劫期没有明显的阶段划分，只有渡过天劫与否。',
    stages: [
      {
        id: 'tribulation_1',
        name: '渡劫初期',
        level: 42,
        description: '准备渡劫',
        expRequired: 134217728000000,
        benefits: { healthBonus: 1500000, spiritBonus: 1500000, statBonus: { strength: 500, agility: 500, intelligence: 500 } }
      },
      {
        id: 'tribulation_2',
        name: '渡劫中期',
        level: 43,
        description: '渡劫中',
        expRequired: 268435456000000,
        benefits: { healthBonus: 2000000, spiritBonus: 2000000, statBonus: { willpower: 500, luck: 200 } }
      },
      {
        id: 'tribulation_3',
        name: '渡劫后期',
        level: 44,
        description: '即将飞升',
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
        },
        {
          id: 'trib_final_3',
          name: '第三重劫',
          description: '九道五行',
          damage: 1200000,
          duration: 9,
          requirements: { minHealth: 2800000, minSpirit: 2800000, minStats: { willpower: 3500 } }
        },
        {
          id: 'trib_final_4',
          name: '第四重劫',
          description: '九道罡风',
          damage: 1800000,
          duration: 9,
          requirements: { minHealth: 4000000, minSpirit: 4000000, minStats: { willpower: 4000 } }
        },
        {
          id: 'trib_final_5',
          name: '第五重劫',
          description: '九道神火',
          damage: 2500000,
          duration: 9,
          requirements: { minHealth: 5500000, minSpirit: 5500000, minStats: { willpower: 4500 } }
        },
        {
          id: 'trib_final_6',
          name: '第六重劫',
          description: '九道虚空',
          damage: 3500000,
          duration: 9,
          requirements: { minHealth: 7500000, minSpirit: 7500000, minStats: { willpower: 5000 } }
        },
        {
          id: 'trib_final_7',
          name: '第七重劫',
          description: '九道混沌',
          damage: 5000000,
          duration: 9,
          requirements: { minHealth: 10000000, minSpirit: 10000000, minStats: { willpower: 6000 } }
        },
        {
          id: 'trib_final_8',
          name: '第八重劫',
          description: '九道因果',
          damage: 7000000,
          duration: 9,
          requirements: { minHealth: 14000000, minSpirit: 14000000, minStats: { willpower: 7000 } }
        },
        {
          id: 'trib_final_9',
          name: '第九重劫',
          description: '九道天道',
          damage: 10000000,
          duration: 9,
          requirements: { minHealth: 20000000, minSpirit: 20000000, minStats: { willpower: 8000 } }
        }
      ],
      rewards: {
        expBonus: 10000000000,
        specialAbility: '仙人之体',
        title: '飞升仙人'
      }
    },
    breakthrough: {
      successRate: 0.005,
      requiredItems: ['渡劫丹', '仙缘', '仙器', '功德金光'],
      requiredConditions: ['大乘大圆满', '功德深厚', '因果了结'],
      failureConsequences: ['渡劫失败', '身死道消', '转世重修'],
      specialRequirements: ['渡劫丹可提升成功率至2%', '秘境渡劫可提升成功率', '功德可提升成功率']
    }
  },
  {
    id: 'realm_true_immortal',
    name: '真仙',
    level: 10,
    description: '飞升仙界后的境界，已经超脱凡尘，成为真正的仙人。真仙拥有无尽的寿元，可以掌控更高层次的法则力量。',
    stages: [
      {
        id: 'immortal_1',
        name: '真仙初期',
        level: 45,
        description: '刚刚飞升的仙人',
        expRequired: 1073741824000000,
        benefits: { healthBonus: 50000000, spiritBonus: 50000000, statBonus: { strength: 1000, agility: 1000, intelligence: 1000, willpower: 1000 } }
      }
    ],
    requirements: { minExp: 1073741824000000 },
    benefits: {
      healthMultiplier: 100000,
      spiritMultiplier: 200000,
      lifespan: -1,
      newAbilities: ['仙力', '仙术', '创造世界', '掌控法则']
    },
    breakthrough: {
      successRate: 0,
      requiredItems: [],
      requiredConditions: ['飞升仙界'],
      failureConsequences: []
    }
  }
]

export const spiritualRoots: SpiritualRoot[] = [
  {
    id: 'root_heavenly_five',
    name: '天灵根（五行）',
    type: 'heavenly',
    elements: ['金', '木', '水', '火', '土'],
    quality: 100,
    description: '拥有五行天灵根的修士，修炼速度是普通修士的百倍，是各大宗门争抢的天才。',
    cultivationSpeed: 100,
    specialAbilities: ['五行法术威力翻倍', '五行功法修炼速度翻倍', '渡劫成功率提升'],
    rarity: 0.0001
  },
  {
    id: 'root_heavenly_four',
    name: '天灵根（四行）',
    type: 'heavenly',
    elements: ['金', '木', '水', '火'],
    quality: 90,
    description: '拥有四行天灵根的修士，修炼速度是普通修士的五十倍。',
    cultivationSpeed: 50,
    specialAbilities: ['四行法术威力翻倍', '四行功法修炼速度翻倍'],
    rarity: 0.001
  },
  {
    id: 'root_heavenly_three',
    name: '天灵根（三行）',
    type: 'heavenly',
    elements: ['金', '木', '水'],
    quality: 80,
    description: '拥有三行天灵根的修士，修炼速度是普通修士的二十倍。',
    cultivationSpeed: 20,
    specialAbilities: ['三行法术威力提升50%', '三行功法修炼速度提升50%'],
    rarity: 0.01
  },
  {
    id: 'root_true_dual',
    name: '真灵根（双行）',
    type: 'true',
    elements: ['金', '木'],
    quality: 60,
    description: '拥有双行真灵根的修士，修炼速度是普通修士的五倍。',
    cultivationSpeed: 5,
    specialAbilities: ['双行法术威力提升30%'],
    rarity: 0.1
  },
  {
    id: 'root_true_single',
    name: '真灵根（单行）',
    type: 'true',
    elements: ['火'],
    quality: 70,
    description: '拥有单行真灵根的修士，修炼速度是普通修士的十倍，是真正的天才。',
    cultivationSpeed: 10,
    specialAbilities: ['单行法术威力翻倍', '单行功法修炼速度翻倍'],
    rarity: 0.05
  },
  {
    id: 'root_false',
    name: '伪灵根',
    type: 'false',
    elements: ['金', '木', '水', '火', '土'],
    quality: 30,
    description: '拥有伪灵根的修士，修炼速度较慢，但仍有修仙的可能。',
    cultivationSpeed: 1,
    specialAbilities: [],
    rarity: 0.5
  },
  {
    id: 'root_mutated_thunder',
    name: '变异灵根（雷）',
    type: 'mutated',
    elements: ['雷'],
    quality: 85,
    description: '拥有雷属性变异灵根的修士，攻击力极强，渡劫成功率更高。',
    cultivationSpeed: 15,
    specialAbilities: ['雷系法术威力翻倍', '渡劫成功率提升20%', '攻击力提升50%'],
    rarity: 0.01
  },
  {
    id: 'root_mutated_ice',
    name: '变异灵根（冰）',
    type: 'mutated',
    elements: ['冰'],
    quality: 85,
    description: '拥有冰属性变异灵根的修士，控制力极强。',
    cultivationSpeed: 15,
    specialAbilities: ['冰系法术威力翻倍', '控制效果提升50%'],
    rarity: 0.01
  },
  {
    id: 'root_mutated_wind',
    name: '变异灵根（风）',
    type: 'mutated',
    elements: ['风'],
    quality: 85,
    description: '拥有风属性变异灵根的修士，速度极快。',
    cultivationSpeed: 15,
    specialAbilities: ['风系法术威力翻倍', '移动速度提升100%'],
    rarity: 0.01
  },
  {
    id: 'root_mutated_dark',
    name: '变异灵根（暗）',
    type: 'mutated',
    elements: ['暗'],
    quality: 85,
    description: '拥有暗属性变异灵根的修士，擅长隐匿和暗杀。',
    cultivationSpeed: 15,
    specialAbilities: ['暗系法术威力翻倍', '隐匿效果提升100%'],
    rarity: 0.01
  },
  {
    id: 'root_mutated_light',
    name: '变异灵根（光）',
    type: 'mutated',
    elements: ['光'],
    quality: 85,
    description: '拥有光属性变异灵根的修士，擅长治疗和净化。',
    cultivationSpeed: 15,
    specialAbilities: ['光系法术威力翻倍', '治疗效果提升100%'],
    rarity: 0.01
  },
  {
    id: 'root_mutated_space',
    name: '变异灵根（空间）',
    type: 'mutated',
    elements: ['空间'],
    quality: 95,
    description: '拥有空间属性变异灵根的修士，极其稀有，擅长空间法术。',
    cultivationSpeed: 20,
    specialAbilities: ['空间法术威力翻倍', '瞬移距离提升100%', '可开辟独立空间'],
    rarity: 0.001
  },
  {
    id: 'root_mutated_time',
    name: '变异灵根（时间）',
    type: 'mutated',
    elements: ['时间'],
    quality: 100,
    description: '拥有时间属性变异灵根的修士，极其稀有，掌控时间法则。',
    cultivationSpeed: 25,
    specialAbilities: ['时间法术威力翻倍', '可短暂延缓时间', '寿元消耗减半'],
    rarity: 0.0001
  }
]

export const daoHearts: DaoHeart[] = [
  {
    id: 'heart_immovable',
    name: '不动道心',
    type: '坚定',
    description: '心如磐石，不为外物所动。拥有此道心的修士，心魔劫难度降低。',
    effects: {
      cultivationBonus: 1.1,
      tribulationBonus: 1.2,
      mentalResistance: 50,
      specialEffects: ['心魔劫伤害降低50%', '心境稳定']
    },
    requirements: ['经历重大变故', '意志坚定']
  },
  {
    id: 'heart_slaughter',
    name: '杀伐道心',
    type: '战斗',
    description: '以杀证道，战力无双。拥有此道心的修士，战斗力极强。',
    effects: {
      cultivationBonus: 1.0,
      tribulationBonus: 0.9,
      mentalResistance: 30,
      specialEffects: ['战斗时攻击力提升30%', '杀敌可获得额外经验']
    },
    requirements: ['经历大量战斗', '杀伐果断']
  },
  {
    id: 'heart_natural',
    name: '自然道心',
    type: '自然',
    description: '顺应自然，无为而治。拥有此道心的修士，修炼速度提升。',
    effects: {
      cultivationBonus: 1.3,
      tribulationBonus: 1.0,
      mentalResistance: 40,
      specialEffects: ['修炼速度提升30%', '更容易领悟自然法则']
    },
    requirements: ['亲近自然', '心境平和']
  },
  {
    id: 'heart_guardian',
    name: '守护道心',
    type: '守护',
    description: '守护之心，坚不可摧。拥有此道心的修士，防御力极强。',
    effects: {
      cultivationBonus: 1.0,
      tribulationBonus: 1.1,
      mentalResistance: 60,
      specialEffects: ['防御力提升50%', '守护他人时战斗力提升']
    },
    requirements: ['有想要守护的人', '责任心强']
  },
  {
    id: 'heart_greedy',
    name: '贪婪道心',
    type: '贪婪',
    description: '贪婪之心，永无止境。拥有此道心的修士，获取资源效率提升。',
    effects: {
      cultivationBonus: 1.2,
      tribulationBonus: 0.8,
      mentalResistance: 20,
      specialEffects: ['资源获取效率提升50%', '更容易获得宝物', '心魔劫难度增加']
    },
    requirements: ['贪婪', '欲望强烈']
  },
  {
    id: 'heart_solitary',
    name: '孤独道心',
    type: '孤独',
    description: '独行之路，不染红尘。拥有此道心的修士，更适合独自修炼。',
    effects: {
      cultivationBonus: 1.2,
      tribulationBonus: 1.0,
      mentalResistance: 45,
      specialEffects: ['独自修炼时效率提升', '不易受他人影响', '社交能力降低']
    },
    requirements: ['性格孤僻', '习惯独处']
  },
  {
    id: 'heart_vengeful',
    name: '复仇道心',
    type: '复仇',
    description: '复仇之火，永不熄灭。拥有此道心的修士，面对仇敌时战力大增。',
    effects: {
      cultivationBonus: 1.1,
      tribulationBonus: 0.9,
      mentalResistance: 35,
      specialEffects: ['面对仇敌时攻击力提升50%', '更容易陷入心魔']
    },
    requirements: ['有深仇大恨', '执念深重']
  },
  {
    id: 'heart_enlightened',
    name: '悟道之心',
    type: '悟道',
    description: '悟性超群，一通百通。拥有此道心的修士，更容易领悟法则。',
    effects: {
      cultivationBonus: 1.0,
      tribulationBonus: 1.0,
      mentalResistance: 50,
      specialEffects: ['领悟法则速度提升100%', '更容易突破瓶颈']
    },
    requirements: ['悟性极高', '经历顿悟']
  }
]

export function getRealmByLevel(level: number): CultivationRealm | undefined {
  for (const realm of cultivationRealms) {
    const stage = realm.stages.find(s => s.level === level)
    if (stage) {
      return { ...realm, stages: [stage] }
    }
  }
  return undefined
}

export function getRealmById(id: string): CultivationRealm | undefined {
  return cultivationRealms.find(r => r.id === id)
}

export function getStageByLevel(level: number): CultivationStage | undefined {
  for (const realm of cultivationRealms) {
    const stage = realm.stages.find(s => s.level === level)
    if (stage) return stage
  }
  return undefined
}

export function getNextRealm(currentLevel: number): CultivationRealm | undefined {
  for (const realm of cultivationRealms) {
    if (realm.stages[0].level > currentLevel) {
      return realm
    }
  }
  return undefined
}

export function getSpiritualRootById(id: string): SpiritualRoot | undefined {
  return spiritualRoots.find(r => r.id === id)
}

export function getRandomSpiritualRoot(): SpiritualRoot {
  const roll = Math.random()
  let cumulative = 0
  
  const sortedRoots = [...spiritualRoots].sort((a, b) => a.rarity - b.rarity)
  
  for (const root of sortedRoots) {
    cumulative += root.rarity
    if (roll <= cumulative) {
      return root
    }
  }
  
  return spiritualRoots.find(r => r.id === 'root_false')!
}

export function getDaoHeartById(id: string): DaoHeart | undefined {
  return daoHearts.find(h => h.id === id)
}

export function calculateBreakthroughSuccess(
  realm: CultivationRealm,
  items: string[],
  conditions: { [key: string]: boolean }
): number {
  let successRate = realm.breakthrough.successRate
  
  for (const itemId of items) {
    if (realm.breakthrough.requiredItems.includes(itemId)) {
      successRate += 0.1
    }
  }
  
  for (const condition of realm.breakthrough.requiredConditions) {
    if (conditions[condition]) {
      successRate += 0.05
    }
  }
  
  return Math.min(successRate, 0.95)
}
