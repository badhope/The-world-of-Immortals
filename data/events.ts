export interface Tribulation {
  id: string
  name: string
  type: TribulationType
  rank: TribulationRank
  description: string
  history?: string
  requirements: TribulationRequirement
  stages: TribulationStage[]
  rewards: TribulationReward[]
  failureConsequences: FailureConsequence[]
  preparation: string[]
  tips: string[]
}

export type TribulationType = 
  | 'breakthrough' | 'heart_demon' | 'elemental' | 'karmic' 
  | 'divine' | 'immortal' | 'chaos' | 'creation'

export type TribulationRank = 
  | 'minor' | 'major' | 'heavenly' | 'divine' | 'immortal' | 'eternal'

export interface TribulationRequirement {
  minRealm: number
  maxRealm?: number
  requiredStats?: { [key: string]: number }
  requiredItems?: string[]
  requiredConditions?: string[]
  cooldown?: number
}

export interface TribulationStage {
  id: string
  name: string
  order: number
  description: string
  duration: number
  challenges: TribulationChallenge[]
  successCondition: string
  failureCondition: string
}

export interface TribulationChallenge {
  id: string
  name: string
  type: 'combat' | 'resistance' | 'puzzle' | 'endurance' | 'choice' | 'illusion'
  description: string
  difficulty: number
  effects: ChallengeEffect[]
  successBonus?: number
  failurePenalty?: number
}

export interface ChallengeEffect {
  type: 'damage' | 'debuff' | 'buff' | 'special'
  target: string
  value: number
  duration?: number
  description: string
}

export interface TribulationReward {
  type: 'stat' | 'skill' | 'item' | 'special'
  target: string
  value: number | string
  description: string
  condition?: string
}

export interface FailureConsequence {
  type: 'death' | 'injury' | 'realm_loss' | 'stat_loss' | 'special'
  severity: 'minor' | 'moderate' | 'severe' | 'critical' | 'fatal'
  description: string
  probability: number
}

export interface WorldEvent {
  id: string
  name: string
  type: WorldEventType
  rank: EventRank
  description: string
  history?: string
  duration: number
  scope: EventScope
  effects: EventEffect[]
  triggers: EventTrigger[]
  consequences: EventConsequence[]
  participants: EventParticipant[]
}

export type WorldEventType = 
  | 'natural_disaster' | 'celestial' | 'demonic' | 'divine' 
  | 'political' | 'economic' | 'social' | 'mystical'

export type EventRank = 'minor' | 'moderate' | 'major' | 'catastrophic' | 'world_changing'

export type EventScope = 'local' | 'regional' | 'continental' | 'world' | 'planar'

export interface EventEffect {
  type: 'environment' | 'economy' | 'politics' | 'cultivation' | 'special'
  target: string
  value: number | string
  duration?: number
  description: string
}

export interface EventTrigger {
  type: 'time' | 'condition' | 'random' | 'player_action' | 'faction_action'
  condition: string
  probability?: number
}

export interface EventConsequence {
  type: string
  description: string
  effects: string[]
}

export interface EventParticipant {
  type: 'player' | 'faction' | 'nation' | 'sect' | 'npc'
  id?: string
  role: string
  rewards?: string[]
  risks?: string[]
}

export interface RandomEvent {
  id: string
  name: string
  type: RandomEventType
  description: string
  probability: number
  conditions: RandomEventCondition[]
  choices: RandomEventChoice[]
  cooldown?: number
}

export type RandomEventType = 
  | 'encounter' | 'discovery' | 'opportunity' | 'danger' 
  | 'mystery' | 'treasure' | 'conflict' | 'social'

export interface RandomEventCondition {
  type: 'location' | 'realm' | 'time' | 'reputation' | 'item' | 'quest'
  value: string | number
  description: string
}

export interface RandomEventChoice {
  id: string
  text: string
  requirements?: string[]
  outcomes: RandomEventOutcome[]
}

export interface RandomEventOutcome {
  type: 'success' | 'failure' | 'special'
  probability: number
  effects: { type: string; value: number | string; description: string }[]
  description: string
}

export interface SeasonalEvent {
  id: string
  name: string
  season: Season
  description: string
  duration: number
  effects: SeasonalEffect[]
  activities: SeasonalActivity[]
  specialRewards: string[]
}

export type Season = 'spring' | 'summer' | 'autumn' | 'winter' | 'special'

export interface SeasonalEffect {
  type: 'cultivation' | 'environment' | 'economy' | 'special'
  value: number
  description: string
}

export interface SeasonalActivity {
  id: string
  name: string
  description: string
  requirements: string[]
  rewards: string[]
  duration: number
}

export const tribulations: Tribulation[] = [
  {
    id: 'tribulation_foundation',
    name: '筑基天劫',
    type: 'breakthrough',
    rank: 'minor',
    description: '炼气期修士突破到筑基期时必须经历的天劫。这是修士第一次面对天劫，虽然威力不大，但对于刚刚踏入修仙之门的修士来说仍然是一次严峻的考验。',
    history: '筑基天劫是最基础的天劫，据说在上古时期，炼气期修士突破到筑基期并不需要经历天劫。但后来因为天地法则的变化，筑基天劫成为了必经之路。',
    requirements: {
      minRealm: 1,
      maxRealm: 1,
      requiredStats: { spirit: 100, willpower: 50 },
      requiredConditions: ['炼气期十三层圆满', '丹田灵气充盈'],
      cooldown: 86400
    },
    stages: [
      {
        id: 'foundation_stage_1',
        name: '灵气汇聚',
        order: 1,
        description: '天劫开始，天地灵气汇聚，形成灵气漩涡。',
        duration: 60,
        challenges: [
          {
            id: 'foundation_challenge_1',
            name: '灵气冲击',
            type: 'resistance',
            description: '承受灵气冲击，保持心神稳定',
            difficulty: 30,
            effects: [
              { type: 'damage', target: 'spirit', value: 20, description: '精神受到冲击' }
            ],
            successBonus: 10,
            failurePenalty: 20
          }
        ],
        successCondition: '保持心神稳定，成功引导灵气入体',
        failureCondition: '心神失守，灵气反噬'
      },
      {
        id: 'foundation_stage_2',
        name: '天雷洗礼',
        order: 2,
        description: '天劫之雷降临，淬炼肉身。',
        duration: 120,
        challenges: [
          {
            id: 'foundation_challenge_2',
            name: '雷霆淬体',
            type: 'endurance',
            description: '承受天雷洗礼，淬炼肉身',
            difficulty: 50,
            effects: [
              { type: 'damage', target: 'health', value: 50, description: '肉身受到损伤' },
              { type: 'buff', target: 'body', value: 10, duration: 0, description: '肉身得到淬炼' }
            ],
            successBonus: 20,
            failurePenalty: 50
          }
        ],
        successCondition: '成功承受天雷洗礼',
        failureCondition: '肉身崩溃，渡劫失败'
      },
      {
        id: 'foundation_stage_3',
        name: '筑基成功',
        order: 3,
        description: '天劫结束，筑基成功。',
        duration: 30,
        challenges: [
          {
            id: 'foundation_challenge_3',
            name: '稳固根基',
            type: 'resistance',
            description: '稳固新筑的根基',
            difficulty: 40,
            effects: [
              { type: 'special', target: 'foundation', value: 1, description: '筑基成功' }
            ],
            successBonus: 30,
            failurePenalty: 0
          }
        ],
        successCondition: '根基稳固，筑基成功',
        failureCondition: '根基不稳，需要重新筑基'
      }
    ],
    rewards: [
      { type: 'stat', target: 'realm', value: 1, description: '境界提升到筑基期' },
      { type: 'stat', target: 'health', value: 100, description: '生命值上限提升100' },
      { type: 'stat', target: 'spirit', value: 50, description: '灵力上限提升50' },
      { type: 'special', target: 'foundation_quality', value: 'based_on_performance', description: '根据渡劫表现决定筑基品质' }
    ],
    failureConsequences: [
      { type: 'injury', severity: 'moderate', description: '肉身受损，需要休养', probability: 0.5 },
      { type: 'realm_loss', severity: 'minor', description: '修为倒退一层', probability: 0.3 },
      { type: 'death', severity: 'fatal', description: '渡劫失败，身死道消', probability: 0.1 }
    ],
    preparation: [
      '准备筑基丹，可以大幅提升成功率',
      '修炼护体功法，增强肉身强度',
      '准备疗伤丹药，以备不时之需',
      '选择灵气充沛之地渡劫',
      '请高人护法，防止意外'
    ],
    tips: [
      '筑基天劫相对简单，但不可大意',
      '灵气冲击阶段保持心神稳定最为重要',
      '天雷洗礼阶段是提升肉身的好机会',
      '渡劫前确保状态最佳'
    ]
  },
  {
    id: 'tribulation_core_formation',
    name: '结丹天劫',
    type: 'breakthrough',
    rank: 'major',
    description: '筑基期修士突破到结丹期时必须经历的天劫。结丹天劫比筑基天劫强大数倍，需要凝聚金丹，是修士修炼路上的重要关卡。',
    history: '结丹天劫是修士修炼路上的重要关卡。据说在上古时期，结丹天劫的威力比如今强大十倍，许多天才修士都在这一关陨落。',
    requirements: {
      minRealm: 2,
      maxRealm: 2,
      requiredStats: { spirit: 500, willpower: 100 },
      requiredConditions: ['筑基期大圆满', '丹田灵气液化'],
      cooldown: 259200
    },
    stages: [
      {
        id: 'core_stage_1',
        name: '灵液化丹',
        order: 1,
        description: '将丹田中的灵液凝聚成金丹雏形。',
        duration: 180,
        challenges: [
          {
            id: 'core_challenge_1',
            name: '灵液压缩',
            type: 'resistance',
            description: '压缩灵液，形成金丹雏形',
            difficulty: 60,
            effects: [
              { type: 'damage', target: 'spirit', value: 50, description: '精神消耗巨大' }
            ],
            successBonus: 20,
            failurePenalty: 30
          }
        ],
        successCondition: '成功形成金丹雏形',
        failureCondition: '灵液消散，需要重新积累'
      },
      {
        id: 'core_stage_2',
        name: '天劫降临',
        order: 2,
        description: '天劫之雷降临，淬炼金丹。',
        duration: 300,
        challenges: [
          {
            id: 'core_challenge_2',
            name: '九重天雷',
            type: 'endurance',
            description: '承受九重天雷的洗礼',
            difficulty: 80,
            effects: [
              { type: 'damage', target: 'health', value: 100, description: '肉身受到重创' },
              { type: 'damage', target: 'spirit', value: 80, description: '精神受到冲击' }
            ],
            successBonus: 30,
            failurePenalty: 60
          }
        ],
        successCondition: '成功承受九重天雷',
        failureCondition: '金丹破碎，渡劫失败'
      },
      {
        id: 'core_stage_3',
        name: '金丹大成',
        order: 3,
        description: '金丹大成，结丹成功。',
        duration: 60,
        challenges: [
          {
            id: 'core_challenge_3',
            name: '金丹稳固',
            type: 'resistance',
            description: '稳固金丹',
            difficulty: 50,
            effects: [
              { type: 'special', target: 'core', value: 1, description: '结丹成功' }
            ],
            successBonus: 40,
            failurePenalty: 0
          }
        ],
        successCondition: '金丹稳固，结丹成功',
        failureCondition: '金丹不稳，需要重新结丹'
      }
    ],
    rewards: [
      { type: 'stat', target: 'realm', value: 1, description: '境界提升到结丹期' },
      { type: 'stat', target: 'health', value: 500, description: '生命值上限提升500' },
      { type: 'stat', target: 'spirit', value: 200, description: '灵力上限提升200' },
      { type: 'special', target: 'core_quality', value: 'based_on_performance', description: '根据渡劫表现决定金丹品质' },
      { type: 'skill', target: 'flying', value: 'unlock', description: '解锁飞行能力' }
    ],
    failureConsequences: [
      { type: 'injury', severity: 'severe', description: '肉身重创，需要长期休养', probability: 0.4 },
      { type: 'realm_loss', severity: 'moderate', description: '修为倒退到筑基初期', probability: 0.3 },
      { type: 'death', severity: 'fatal', description: '渡劫失败，身死道消', probability: 0.2 }
    ],
    preparation: [
      '准备结丹丹，可以大幅提升成功率',
      '修炼护体功法，增强肉身强度',
      '准备大量疗伤丹药',
      '选择灵气充沛之地渡劫',
      '请结丹期以上的高人护法',
      '确保心境平和，避免心魔入侵'
    ],
    tips: [
      '结丹天劫威力巨大，必须做好充分准备',
      '灵液化丹阶段需要极大的精神力',
      '九重天雷一重比一重强，要合理分配体力',
      '金丹品质决定了未来的修炼潜力'
    ]
  },
  {
    id: 'tribulation_nascent_soul',
    name: '元婴天劫',
    type: 'breakthrough',
    rank: 'heavenly',
    description: '结丹期修士突破到元婴期时必须经历的天劫。元婴天劫是修士修炼路上最危险的天劫之一，只有极少数修士能够成功渡过。',
    history: '元婴天劫是修士修炼路上最危险的天劫之一。据说在上古时期，元婴天劫的威力足以毁灭一座城池，许多大能都在这一关陨落。',
    requirements: {
      minRealm: 3,
      maxRealm: 3,
      requiredStats: { spirit: 2000, willpower: 200 },
      requiredConditions: ['结丹期大圆满', '金丹蕴含元婴雏形'],
      cooldown: 604800
    },
    stages: [
      {
        id: 'nascent_stage_1',
        name: '破丹成婴',
        order: 1,
        description: '打破金丹，孕育元婴。',
        duration: 360,
        challenges: [
          {
            id: 'nascent_challenge_1',
            name: '金丹破碎',
            type: 'resistance',
            description: '主动破碎金丹，孕育元婴',
            difficulty: 90,
            effects: [
              { type: 'damage', target: 'health', value: 200, description: '肉身受到巨大冲击' },
              { type: 'damage', target: 'spirit', value: 150, description: '精神消耗极大' }
            ],
            successBonus: 30,
            failurePenalty: 50
          }
        ],
        successCondition: '成功孕育元婴雏形',
        failureCondition: '金丹破碎但未能孕育元婴'
      },
      {
        id: 'nascent_stage_2',
        name: '心魔劫',
        order: 2,
        description: '心魔入侵，考验道心。',
        duration: 600,
        challenges: [
          {
            id: 'nascent_challenge_2',
            name: '心魔幻境',
            type: 'illusion',
            description: '进入心魔幻境，面对内心深处的恐惧',
            difficulty: 100,
            effects: [
              { type: 'debuff', target: 'mind', value: 50, duration: 600, description: '精神受到干扰' }
            ],
            successBonus: 40,
            failurePenalty: 80
          }
        ],
        successCondition: '战胜心魔，道心稳固',
        failureCondition: '被心魔吞噬，失去自我'
      },
      {
        id: 'nascent_stage_3',
        name: '九九天劫',
        order: 3,
        description: '九九八十一道天雷降临。',
        duration: 900,
        challenges: [
          {
            id: 'nascent_challenge_3',
            name: '天雷洗礼',
            type: 'endurance',
            description: '承受八十一道天雷',
            difficulty: 120,
            effects: [
              { type: 'damage', target: 'health', value: 300, description: '肉身受到毁灭性打击' },
              { type: 'damage', target: 'spirit', value: 200, description: '精神濒临崩溃' }
            ],
            successBonus: 50,
            failurePenalty: 100
          }
        ],
        successCondition: '成功承受八十一道天雷',
        failureCondition: '肉身崩溃，元婴消散'
      },
      {
        id: 'nascent_stage_4',
        name: '元婴大成',
        order: 4,
        description: '元婴大成，获得新生。',
        duration: 120,
        challenges: [
          {
            id: 'nascent_challenge_4',
            name: '元婴稳固',
            type: 'resistance',
            description: '稳固元婴',
            difficulty: 70,
            effects: [
              { type: 'special', target: 'nascent_soul', value: 1, description: '元婴大成' }
            ],
            successBonus: 60,
            failurePenalty: 0
          }
        ],
        successCondition: '元婴稳固，渡劫成功',
        failureCondition: '元婴不稳，需要重新凝练'
      }
    ],
    rewards: [
      { type: 'stat', target: 'realm', value: 1, description: '境界提升到元婴期' },
      { type: 'stat', target: 'health', value: 2000, description: '生命值上限提升2000' },
      { type: 'stat', target: 'spirit', value: 1000, description: '灵力上限提升1000' },
      { type: 'special', target: 'nascent_soul_quality', value: 'based_on_performance', description: '根据渡劫表现决定元婴品质' },
      { type: 'special', target: 'second_life', value: 1, description: '获得第二条生命' },
      { type: 'skill', target: 'divine_sense', value: 'unlock', description: '解锁神识能力' }
    ],
    failureConsequences: [
      { type: 'injury', severity: 'critical', description: '肉身重创，需要数年休养', probability: 0.3 },
      { type: 'realm_loss', severity: 'severe', description: '修为倒退到结丹初期', probability: 0.3 },
      { type: 'death', severity: 'fatal', description: '渡劫失败，身死道消', probability: 0.35 }
    ],
    preparation: [
      '准备凝婴丹，可以大幅提升成功率',
      '修炼护体功法，增强肉身强度',
      '准备大量疗伤丹药和恢复灵力的丹药',
      '选择灵气充沛之地渡劫',
      '请元婴期以上的高人护法',
      '确保心境平和，避免心魔入侵',
      '准备防御法宝，抵挡天雷'
    ],
    tips: [
      '元婴天劫极其危险，成功率不到三成',
      '破丹成婴是最关键的一步，必须小心谨慎',
      '心魔劫是最大的考验，道心不稳者必败',
      '九九天雷威力惊人，需要合理分配体力',
      '渡劫成功后将获得第二条生命'
    ]
  },
  {
    id: 'tribulation_heart_demon',
    name: '心魔劫',
    type: 'heart_demon',
    rank: 'major',
    description: '修士修炼过程中产生的心魔，会在特定时机爆发。心魔劫是修士修炼路上的重大考验，许多修士都因为心魔而陨落。',
    history: '心魔劫是修士修炼过程中不可避免的考验。据说心魔是由修士内心的执念、恐惧、欲望等负面情绪凝聚而成，会在修士最脆弱的时候爆发。',
    requirements: {
      minRealm: 2,
      requiredConditions: ['修炼魔道功法', '杀戮过重', '执念深重', '道心不稳'],
      cooldown: 0
    },
    stages: [
      {
        id: 'heart_demon_stage_1',
        name: '心魔觉醒',
        order: 1,
        description: '心魔觉醒，开始侵蚀心神。',
        duration: 300,
        challenges: [
          {
            id: 'heart_demon_challenge_1',
            name: '心魔入侵',
            type: 'illusion',
            description: '心魔入侵，产生幻觉',
            difficulty: 70,
            effects: [
              { type: 'debuff', target: 'mind', value: 30, duration: 300, description: '精神受到干扰' }
            ],
            successBonus: 20,
            failurePenalty: 40
          }
        ],
        successCondition: '保持清醒，抵抗心魔入侵',
        failureCondition: '被心魔控制，失去理智'
      },
      {
        id: 'heart_demon_stage_2',
        name: '心魔幻境',
        order: 2,
        description: '进入心魔幻境，面对内心深处的恐惧。',
        duration: 600,
        challenges: [
          {
            id: 'heart_demon_challenge_2',
            name: '面对恐惧',
            type: 'illusion',
            description: '面对内心深处的恐惧和执念',
            difficulty: 90,
            effects: [
              { type: 'damage', target: 'spirit', value: 100, description: '精神受到重创' }
            ],
            successBonus: 30,
            failurePenalty: 60
          }
        ],
        successCondition: '战胜恐惧，看破幻境',
        failureCondition: '被恐惧吞噬，心魔壮大'
      },
      {
        id: 'heart_demon_stage_3',
        name: '斩灭心魔',
        order: 3,
        description: '斩灭心魔，道心稳固。',
        duration: 180,
        challenges: [
          {
            id: 'heart_demon_challenge_3',
            name: '斩心魔',
            type: 'combat',
            description: '与心魔进行最终决战',
            difficulty: 100,
            effects: [
              { type: 'special', target: 'heart_demon', value: 0, description: '斩灭心魔' }
            ],
            successBonus: 50,
            failurePenalty: 80
          }
        ],
        successCondition: '斩灭心魔，道心稳固',
        failureCondition: '被心魔反噬，修为尽失'
      }
    ],
    rewards: [
      { type: 'stat', target: 'willpower', value: 50, description: '意志力提升50' },
      { type: 'special', target: 'dao_heart', value: 'strengthened', description: '道心稳固' },
      { type: 'skill', target: 'mental_resistance', value: 'unlock', description: '解锁精神抗性' }
    ],
    failureConsequences: [
      { type: 'realm_loss', severity: 'severe', description: '修为大幅倒退', probability: 0.4 },
      { type: 'special', severity: 'critical', description: '成为堕落修士', probability: 0.3 },
      { type: 'death', severity: 'fatal', description: '心魔反噬，身死道消', probability: 0.2 }
    ],
    preparation: [
      '修炼清心咒，稳定心神',
      '请高人指点，化解执念',
      '准备安神丹药',
      '避免在心神不稳时渡劫'
    ],
    tips: [
      '心魔劫是最难预测的天劫',
      '面对恐惧是战胜心魔的关键',
      '道心越稳固，心魔越弱',
      '斩灭心魔后，道心会更加稳固'
    ]
  }
]

export const worldEvents: WorldEvent[] = [
  {
    id: 'event_spirit_storm',
    name: '灵气风暴',
    type: 'natural_disaster',
    rank: 'major',
    description: '天地灵气剧烈波动，形成灵气风暴。灵气风暴会影响大范围的区域，对修士的修炼产生重大影响。',
    history: '灵气风暴是青云大陆常见的自然灾害。据说在上古时期，灵气风暴的威力足以摧毁一座城池。',
    duration: 86400,
    scope: 'regional',
    effects: [
      { type: 'environment', target: 'spirit_density', value: 200, duration: 86400, description: '灵气密度翻倍' },
      { type: 'cultivation', target: 'cultivation_speed', value: 150, duration: 86400, description: '修炼速度提升50%' },
      { type: 'environment', target: 'danger', value: 200, description: '危险程度翻倍' }
    ],
    triggers: [
      { type: 'random', condition: '每季度有5%概率发生', probability: 0.05 }
    ],
    consequences: [
      { type: 'opportunity', description: '修士可以趁机修炼', effects: ['修炼速度提升'] },
      { type: 'danger', description: '灵气风暴可能伤人', effects: ['可能受到伤害'] }
    ],
    participants: [
      { type: 'player', role: '可以利用灵气风暴修炼', rewards: ['修炼速度提升'], risks: ['可能受到伤害'] },
      { type: 'faction', role: '可以组织弟子修炼', rewards: ['弟子修为提升'], risks: ['弟子可能受伤'] }
    ]
  },
  {
    id: 'event_demon_invasion',
    name: '魔道入侵',
    type: 'demonic',
    rank: 'catastrophic',
    description: '魔道势力发动大规模入侵，正道势力奋起抵抗。这是青云大陆最严重的灾难之一。',
    history: '魔道入侵是青云大陆最严重的灾难之一。据说在上古时期，魔道入侵曾导致青云大陆人口减少一半。',
    duration: 2592000,
    scope: 'continental',
    effects: [
      { type: 'politics', target: 'faction_relations', value: 'war', duration: 2592000, description: '正魔两道进入战争状态' },
      { type: 'economy', target: 'trade', value: 50, duration: 2592000, description: '贸易量减少50%' },
      { type: 'environment', target: 'danger', value: 300, description: '危险程度提升三倍' }
    ],
    triggers: [
      { type: 'time', condition: '每千年发生一次', probability: 0.001 },
      { type: 'condition', condition: '魔道势力壮大到一定程度', probability: 0.1 }
    ],
    consequences: [
      { type: 'war', description: '正魔两道全面开战', effects: ['大规模战斗', '城池争夺', '资源抢夺'] },
      { type: 'casualty', description: '大量修士和凡人伤亡', effects: ['人口减少', '经济衰退'] }
    ],
    participants: [
      { type: 'player', role: '可以选择加入正道或魔道', rewards: ['功勋', '资源'], risks: ['死亡', '受伤'] },
      { type: 'faction', role: '参与战争', rewards: ['领土', '资源'], risks: ['损失弟子', '被灭门'] },
      { type: 'nation', role: '提供后勤支持', rewards: ['声望'], risks: ['经济衰退'] }
    ]
  },
  {
    id: 'event_celestial_treasure',
    name: '天材地宝出世',
    type: 'celestial',
    rank: 'major',
    description: '天地间诞生了珍贵的天材地宝，吸引了无数修士前来争夺。',
    history: '天材地宝出世是修仙界的大事。据说每次天材地宝出世，都会引发一场腥风血雨。',
    duration: 604800,
    scope: 'regional',
    effects: [
      { type: 'environment', target: 'spirit_density', value: 150, duration: 604800, description: '灵气密度提升50%' },
      { type: 'cultivation', target: 'opportunity', value: 'treasure', description: '有机会获得天材地宝' }
    ],
    triggers: [
      { type: 'random', condition: '每年有2%概率发生', probability: 0.02 }
    ],
    consequences: [
      { type: 'competition', description: '修士争夺天材地宝', effects: ['战斗', '杀戮'] },
      { type: 'opportunity', description: '幸运者获得天材地宝', effects: ['实力大增'] }
    ],
    participants: [
      { type: 'player', role: '可以参与争夺', rewards: ['天材地宝'], risks: ['受伤', '死亡'] },
      { type: 'faction', role: '组织弟子争夺', rewards: ['天材地宝'], risks: ['损失弟子'] }
    ]
  },
  {
    id: 'event_immortal_realm_opening',
    name: '仙界之门开启',
    type: 'divine',
    rank: 'world_changing',
    description: '传说中的仙界之门开启，化神期修士可以飞升仙界。这是青云大陆最重大的事件之一。',
    history: '仙界之门开启是青云大陆最重大的事件之一。据说每次仙界之门开启，都会有多位化神期修士飞升。',
    duration: 259200,
    scope: 'world',
    effects: [
      { type: 'environment', target: 'spirit_density', value: 300, duration: 259200, description: '灵气密度提升三倍' },
      { type: 'cultivation', target: 'breakthrough_chance', value: 200, duration: 259200, description: '突破成功率翻倍' },
      { type: 'special', target: 'ascension', value: 'available', description: '化神期修士可以飞升' }
    ],
    triggers: [
      { type: 'time', condition: '每万年发生一次', probability: 0.0001 }
    ],
    consequences: [
      { type: 'ascension', description: '化神期修士飞升仙界', effects: ['顶级修士减少'] },
      { type: 'opportunity', description: '修炼环境大幅改善', effects: ['修士修为提升'] }
    ],
    participants: [
      { type: 'player', role: '化神期可以飞升', rewards: ['飞升仙界'], risks: ['渡劫失败'] },
      { type: 'faction', role: '可能失去顶级战力', rewards: ['声望提升'], risks: ['宗门实力下降'] }
    ]
  }
]

export const randomEvents: RandomEvent[] = [
  {
    id: 'random_hermit_encounter',
    name: '隐世高人',
    type: 'encounter',
    description: '你遇到了一位隐世高人，他似乎有话要对你说。',
    probability: 0.01,
    conditions: [
      { type: 'location', value: 'region_qingyun_mountain', description: '在青云山区域' }
    ],
    choices: [
      {
        id: 'choice_greet',
        text: '上前问候',
        outcomes: [
          {
            type: 'success',
            probability: 0.6,
            effects: [
              { type: 'exp', value: 500, description: '获得修炼指点' },
              { type: 'reputation', value: 10, description: '获得好感' }
            ],
            description: '高人指点你修炼之道，你受益匪浅。'
          },
          {
            type: 'failure',
            probability: 0.4,
            effects: [
              { type: 'reputation', value: -5, description: '被嫌弃' }
            ],
            description: '高人似乎不想被打扰，转身离去。'
          }
        ]
      },
      {
        id: 'choice_ignore',
        text: '假装没看见',
        outcomes: [
          {
            type: 'success',
            probability: 1,
            effects: [],
            description: '你继续赶路，没有发生什么特别的事。'
          }
        ]
      }
    ]
  },
  {
    id: 'random_treasure_discovery',
    name: '意外发现',
    type: 'discovery',
    description: '你在探索时发现了一个隐秘的洞穴，似乎有宝物的气息。',
    probability: 0.005,
    conditions: [
      { type: 'realm', value: 2, description: '筑基期以上' }
    ],
    choices: [
      {
        id: 'choice_explore',
        text: '进入洞穴探索',
        requirements: ['勇气'],
        outcomes: [
          {
            type: 'success',
            probability: 0.5,
            effects: [
              { type: 'item', value: 'random_treasure', description: '获得宝物' },
              { type: 'exp', value: 1000, description: '获得经验' }
            ],
            description: '你在洞穴深处发现了宝物！'
          },
          {
            type: 'failure',
            probability: 0.3,
            effects: [
              { type: 'damage', value: 50, description: '触发陷阱受伤' }
            ],
            description: '洞穴中有陷阱，你受伤了。'
          },
          {
            type: 'special',
            probability: 0.2,
            effects: [
              { type: 'monster', value: 'elite', description: '遇到守护妖兽' }
            ],
            description: '洞穴中有强大的妖兽守护！'
          }
        ]
      },
      {
        id: 'choice_leave',
        text: '离开这里',
        outcomes: [
          {
            type: 'success',
            probability: 1,
            effects: [],
            description: '你决定不冒险，继续你的旅程。'
          }
        ]
      }
    ]
  },
  {
    id: 'random_robbery',
    name: '拦路抢劫',
    type: 'danger',
    description: '一群散修拦住了你的去路，要求你交出财物。',
    probability: 0.02,
    conditions: [
      { type: 'location', value: 'wilderness', description: '在野外' }
    ],
    choices: [
      {
        id: 'choice_fight',
        text: '与他们战斗',
        outcomes: [
          {
            type: 'success',
            probability: 0.6,
            effects: [
              { type: 'item', value: 'robber_loot', description: '获得战利品' },
              { type: 'exp', value: 200, description: '获得战斗经验' }
            ],
            description: '你击败了这群劫匪，获得了战利品。'
          },
          {
            type: 'failure',
            probability: 0.4,
            effects: [
              { type: 'item_loss', value: 'random', description: '损失财物' },
              { type: 'damage', value: 30, description: '受伤' }
            ],
            description: '你被击败了，损失了一些财物。'
          }
        ]
      },
      {
        id: 'choice_pay',
        text: '交出财物',
        outcomes: [
          {
            type: 'success',
            probability: 1,
            effects: [
              { type: 'item_loss', value: 'small', description: '损失少量财物' }
            ],
            description: '你交出了一些财物，劫匪放你离开了。'
          }
        ]
      },
      {
        id: 'choice_negotiate',
        text: '尝试谈判',
        requirements: ['口才'],
        outcomes: [
          {
            type: 'success',
            probability: 0.4,
            effects: [],
            description: '你成功说服了劫匪，他们放你离开了。'
          },
          {
            type: 'failure',
            probability: 0.6,
            effects: [
              { type: 'item_loss', value: 'medium', description: '损失财物' }
            ],
            description: '谈判失败，你不得不交出更多财物。'
          }
        ]
      }
    ]
  }
]

export const seasonalEvents: SeasonalEvent[] = [
  {
    id: 'seasonal_spring_festival',
    name: '春节庆典',
    season: 'spring',
    description: '一年一度的春节庆典，各大宗门和王朝都会举办庆祝活动。',
    duration: 604800,
    effects: [
      { type: 'cultivation', value: 120, description: '修炼速度提升20%' },
      { type: 'economy', value: 150, description: '贸易繁荣' }
    ],
    activities: [
      {
        id: 'activity_temple_fair',
        name: '逛庙会',
        description: '参加庙会，购买年货',
        requirements: [],
        rewards: ['特殊物品', '节日礼物'],
        duration: 3600
      },
      {
        id: 'activity_fireworks',
        name: '放烟花',
        description: '观看烟花表演',
        requirements: [],
        rewards: ['节日气氛', '少量经验'],
        duration: 1800
      }
    ],
    specialRewards: ['节日限定物品', '春节红包']
  },
  {
    id: 'seasonal_summer_solstice',
    name: '夏至祭典',
    season: 'summer',
    description: '夏至时节，天地阳气最盛，是修炼火属性功法的最佳时机。',
    duration: 259200,
    effects: [
      { type: 'cultivation', value: 150, description: '火属性功法修炼速度提升50%' },
      { type: 'environment', value: 120, description: '阳气充沛' }
    ],
    activities: [
      {
        id: 'activity_sun_meditation',
        name: '采阳修炼',
        description: '在正午时分吸收太阳精华',
        requirements: ['火属性功法'],
        rewards: ['修为提升', '火属性感悟'],
        duration: 7200
      }
    ],
    specialRewards: ['太阳精华', '火属性宝物']
  },
  {
    id: 'seasonal_autumn_harvest',
    name: '秋收祭',
    season: 'autumn',
    description: '秋收时节，各大灵药园开始收获，市场上灵药供应充足。',
    duration: 432000,
    effects: [
      { type: 'economy', value: 80, description: '灵药价格下降20%' },
      { type: 'cultivation', value: 110, description: '丹道修炼速度提升10%' }
    ],
    activities: [
      {
        id: 'activity_harvest',
        name: '参与收获',
        description: '帮助灵药园收获灵药',
        requirements: ['丹道基础'],
        rewards: ['灵药', '丹道经验'],
        duration: 14400
      }
    ],
    specialRewards: ['稀有灵药', '丹方']
  },
  {
    id: 'seasonal_winter_solstice',
    name: '冬至祭典',
    season: 'winter',
    description: '冬至时节，天地阴气最盛，是修炼冰属性功法的最佳时机。',
    duration: 259200,
    effects: [
      { type: 'cultivation', value: 150, description: '冰属性功法修炼速度提升50%' },
      { type: 'environment', value: 120, description: '阴气充沛' }
    ],
    activities: [
      {
        id: 'activity_moon_meditation',
        name: '采阴修炼',
        description: '在子夜时分吸收月亮精华',
        requirements: ['冰属性功法'],
        rewards: ['修为提升', '冰属性感悟'],
        duration: 7200
      }
    ],
    specialRewards: ['月亮精华', '冰属性宝物']
  }
]

export function getTribulationById(id: string): Tribulation | undefined {
  return tribulations.find(t => t.id === id)
}

export function getTribulationsByType(type: TribulationType): Tribulation[] {
  return tribulations.filter(t => t.type === type)
}

export function getTribulationsByRank(rank: TribulationRank): Tribulation[] {
  return tribulations.filter(t => t.rank === rank)
}

export function getWorldEventById(id: string): WorldEvent | undefined {
  return worldEvents.find(e => e.id === id)
}

export function getWorldEventsByType(type: WorldEventType): WorldEvent[] {
  return worldEvents.filter(e => e.type === type)
}

export function getRandomEventById(id: string): RandomEvent | undefined {
  return randomEvents.find(e => e.id === id)
}

export function getSeasonalEventById(id: string): SeasonalEvent | undefined {
  return seasonalEvents.find(e => e.id === id)
}

export function getSeasonalEventsBySeason(season: Season): SeasonalEvent[] {
  return seasonalEvents.filter(e => e.season === season)
}

export function canTriggerTribulation(tribulationId: string, playerData: {
  realm: number
  stats: { [key: string]: number }
  conditions: string[]
  lastTribulationTime: number
}): { canTrigger: boolean; reason?: string } {
  const tribulation = getTribulationById(tribulationId)
  if (!tribulation) return { canTrigger: false, reason: '天劫不存在' }
  
  if (playerData.realm < tribulation.requirements.minRealm) {
    return { canTrigger: false, reason: '境界不足' }
  }
  
  if (tribulation.requirements.maxRealm && playerData.realm > tribulation.requirements.maxRealm) {
    return { canTrigger: false, reason: '境界过高' }
  }
  
  if (tribulation.requirements.requiredStats) {
    for (const [stat, required] of Object.entries(tribulation.requirements.requiredStats)) {
      if ((playerData.stats[stat] || 0) < required) {
        return { canTrigger: false, reason: `${stat}不足` }
      }
    }
  }
  
  if (tribulation.requirements.requiredConditions) {
    const hasAllConditions = tribulation.requirements.requiredConditions.every(c => playerData.conditions.includes(c))
    if (!hasAllConditions) {
      return { canTrigger: false, reason: '未满足所有条件' }
    }
  }
  
  if (tribulation.requirements.cooldown) {
    const currentTime = Date.now()
    if (currentTime - playerData.lastTribulationTime < tribulation.requirements.cooldown * 1000) {
      return { canTrigger: false, reason: '冷却时间未到' }
    }
  }
  
  return { canTrigger: true }
}

export function calculateTribulationSuccess(tribulationId: string, playerData: {
  stats: { [key: string]: number }
  items: string[]
  preparation: number
}): number {
  const tribulation = getTribulationById(tribulationId)
  if (!tribulation) return 0
  
  let baseSuccessRate = 50
  
  for (const stage of tribulation.stages) {
    for (const challenge of stage.challenges) {
      const playerStat = playerData.stats.willpower || 50
      const difficultyFactor = (100 - challenge.difficulty) / 100
      baseSuccessRate += (playerStat / 100) * difficultyFactor * 20
    }
  }
  
  baseSuccessRate += playerData.preparation * 5
  
  if (tribulation.requirements.requiredItems) {
    const hasItems = tribulation.requirements.requiredItems.some(item => playerData.items.includes(item))
    if (hasItems) {
      baseSuccessRate += 20
    }
  }
  
  return Math.min(95, Math.max(5, baseSuccessRate))
}

export function generateRandomEvent(location: string, realm: number): RandomEvent | undefined {
  const eligibleEvents = randomEvents.filter(event => {
    for (const condition of event.conditions) {
      if (condition.type === 'location' && condition.value !== location) return false
      if (condition.type === 'realm' && realm < (condition.value as number)) return false
    }
    return Math.random() < event.probability
  })
  
  return eligibleEvents[Math.floor(Math.random() * eligibleEvents.length)]
}

export function processEventChoice(eventId: string, choiceId: string, playerData: {
  stats: { [key: string]: number }
  items: string[]
  skills: string[]
}): RandomEventOutcome {
  const event = getRandomEventById(eventId)
  if (!event) {
    return {
      type: 'failure',
      probability: 1,
      effects: [],
      description: '事件不存在'
    }
  }
  
  const choice = event.choices.find(c => c.id === choiceId)
  if (!choice) {
    return {
      type: 'failure',
      probability: 1,
      effects: [],
      description: '选项不存在'
    }
  }
  
  if (choice.requirements) {
    const hasRequirements = choice.requirements.every(req => {
      if (req === '勇气') return (playerData.stats.courage || 0) >= 50
      if (req === '口才') return (playerData.stats.charisma || 0) >= 50
      return true
    })
    if (!hasRequirements) {
      return {
        type: 'failure',
        probability: 1,
        effects: [],
        description: '不满足选项要求'
      }
    }
  }
  
  const roll = Math.random() * 100
  let cumulative = 0
  for (const outcome of choice.outcomes) {
    cumulative += outcome.probability * 100
    if (roll < cumulative) {
      return outcome
    }
  }
  
  return choice.outcomes[choice.outcomes.length - 1]
}
