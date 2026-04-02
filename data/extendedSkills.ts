import { Skill, SkillType } from './skills'

export interface ExtendedSkill extends Skill {
  grade?: SkillGrade
  origin?: string
  history?: string
  creator?: string
  inheritance?: string
  prerequisites?: string[]
  sideEffects?: string[]
  contraindications?: string[]
  cultivationMethod?: string
  breakthroughConditions?: string[]
  masteryLevels?: MasteryLevel[]
  hiddenAbilities?: string[]
  forbidden?: boolean
  lost?: boolean
}

export type SkillGrade = 'mortal' | 'spirit' | 'earth' | 'heaven' | 'immortal' | 'divine'

export interface MasteryLevel {
  name: string
  description: string
  requirements: string[]
  bonuses: string[]
}

export interface CultivationMethod extends ExtendedSkill {
  type: 'cultivation_method'
  methodType: 'internal' | 'external' | 'special' | 'dual' | 'forbidden'
  attributes: string[]
  stages: CultivationStage[]
  specialFeatures: string[]
  compatibleSkills: string[]
  incompatibleSkills: string[]
}

export interface CultivationStage {
  name: string
  description: string
  requirements: string[]
  effects: string[]
  breakthroughConditions: string[]
}

export interface DivinePower extends ExtendedSkill {
  type: 'divine_power'
  powerType: 'innate' | 'acquired' | 'inherited' | 'enlightened'
  activationConditions: string[]
  cooldown: number
  consumption: string
  effects: string[]
  evolutionPath?: string[]
}

export interface Spell extends ExtendedSkill {
  type: 'spell'
  spellType: 'attack' | 'defense' | 'support' | 'utility' | 'summon' | 'curse'
  element: string
  castingTime: number
  range: number
  duration: number
  consumption: string
  effects: string[]
  variations?: string[]
}

export interface SecretTechnique extends ExtendedSkill {
  type: 'secret_technique'
  techniqueType: 'escape' | 'hidden' | 'killing' | 'survival' | 'special'
  activationConditions: string[]
  consumption: string
  effects: string[]
  sideEffects: string[]
  masteryBonus: string[]
}

export const cultivationMethods: CultivationMethod[] = [
  {
    id: 'method_qingyun',
    name: '青云诀',
    type: 'cultivation_method',
    methodType: 'internal',
    grade: 'immortal',
    description: '青云仙尊创立的顶级修炼功法，蕴含云之大道，是青云大陆最顶级的修炼功法之一。',
    origin: '青云仙尊创立',
    history: `青云诀是青云仙尊于上古纪元创立的顶级修炼功法。青云仙尊凭借此功法，成为青云大陆最强大的修士之一。

青云诀蕴含云之大道，修炼者可以操控云气，拥有强大的攻击和防御能力。`,
    creator: '青云仙尊',
    inheritance: '青云传承',
    prerequisites: ['天灵体或青云血脉', '云属性亲和'],
    attributes: ['云', '风', '水'],
    stages: [
      {
        name: '云气初生',
        description: '初步感悟云气，能够操控少量云气',
        requirements: ['炼气期', '感悟云气'],
        effects: ['云气操控', '云遁术'],
        breakthroughConditions: ['感悟云之真意']
      },
      {
        name: '云海初成',
        description: '体内形成云海，云气大幅增加',
        requirements: ['筑基期', '云气初生'],
        effects: ['云海领域', '云气攻击增强'],
        breakthroughConditions: ['云海凝实']
      },
      {
        name: '云心通明',
        description: '心与云合，云随心动',
        requirements: ['结丹期', '云海初成'],
        effects: ['云心感知', '云遁术增强'],
        breakthroughConditions: ['云心合一']
      },
      {
        name: '云化万物',
        description: '云可化万物，万物皆可化云',
        requirements: ['元婴期', '云心通明'],
        effects: ['云化万物', '云之领域'],
        breakthroughConditions: ['领悟云之大道']
      },
      {
        name: '青云九变',
        description: '青云诀最高境界，九变九化',
        requirements: ['化神期', '云化万物'],
        effects: ['青云九变', '云之大道'],
        breakthroughConditions: ['飞升']
      }
    ],
    specialFeatures: ['云遁术', '云海领域', '云化万物', '青云九变'],
    compatibleSkills: ['云系法术', '风系法术', '水系法术'],
    incompatibleSkills: ['火系功法', '土系功法'],
    masteryLevels: [
      {
        name: '入门',
        description: '初步掌握青云诀',
        requirements: ['修炼一年', '感悟云气'],
        bonuses: ['云气操控']
      },
      {
        name: '小成',
        description: '初步领悟云之真意',
        requirements: ['修炼十年', '云海初成'],
        bonuses: ['云遁术', '云海领域']
      },
      {
        name: '大成',
        description: '领悟云之大道',
        requirements: ['修炼百年', '云化万物'],
        bonuses: ['云化万物', '云之领域']
      },
      {
        name: '圆满',
        description: '青云诀最高境界',
        requirements: ['修炼千年', '青云九变'],
        bonuses: ['青云九变', '云之大道']
      }
    ],
    forbidden: false,
    lost: false
  },
  {
    id: 'method_tianmo',
    name: '天魔功',
    type: 'cultivation_method',
    methodType: 'forbidden',
    grade: 'immortal',
    description: '天魔皇创立的顶级魔道功法，蕴含吞噬之道，是魔道最顶级的修炼功法之一。',
    origin: '天魔皇创立',
    history: `天魔功是天魔皇于上古纪元创立的顶级魔道功法。天魔皇凭借此功法，成为青云大陆最强大的魔修。

天魔功蕴含吞噬之道，修炼者可以吞噬万物，拥有强大的攻击和恢复能力。`,
    creator: '天魔皇',
    inheritance: '天魔传承',
    prerequisites: ['魔道天赋', '心性坚定'],
    sideEffects: ['可能被魔气侵蚀', '心性可能改变'],
    contraindications: ['心性不坚定者禁修', '正道功法冲突'],
    attributes: ['魔', '暗', '吞噬'],
    stages: [
      {
        name: '魔气初生',
        description: '初步感悟魔气，能够操控少量魔气',
        requirements: ['炼气期', '感悟魔气'],
        effects: ['魔气操控', '魔化'],
        breakthroughConditions: ['感悟魔之真意']
      },
      {
        name: '魔海初成',
        description: '体内形成魔海，魔气大幅增加',
        requirements: ['筑基期', '魔气初生'],
        effects: ['魔海领域', '魔气攻击增强'],
        breakthroughConditions: ['魔海凝实']
      },
      {
        name: '魔心通明',
        description: '心与魔合，魔随心动',
        requirements: ['结丹期', '魔海初成'],
        effects: ['魔心感知', '魔化增强'],
        breakthroughConditions: ['魔心合一']
      },
      {
        name: '吞噬万物',
        description: '可吞噬万物，万物皆可化为魔气',
        requirements: ['元婴期', '魔心通明'],
        effects: ['吞噬万物', '魔之领域'],
        breakthroughConditions: ['领悟吞噬之道']
      },
      {
        name: '天魔九变',
        description: '天魔功最高境界，九变九化',
        requirements: ['化神期', '吞噬万物'],
        effects: ['天魔九变', '吞噬之道'],
        breakthroughConditions: ['飞升']
      }
    ],
    specialFeatures: ['魔化', '吞噬', '魔之领域', '天魔九变'],
    compatibleSkills: ['魔道功法', '暗系功法'],
    incompatibleSkills: ['正道功法', '佛门功法'],
    masteryLevels: [
      {
        name: '入门',
        description: '初步掌握天魔功',
        requirements: ['修炼一年', '感悟魔气'],
        bonuses: ['魔气操控', '魔化']
      },
      {
        name: '小成',
        description: '初步领悟魔之真意',
        requirements: ['修炼十年', '魔海初成'],
        bonuses: ['魔海领域', '吞噬']
      },
      {
        name: '大成',
        description: '领悟吞噬之道',
        requirements: ['修炼百年', '吞噬万物'],
        bonuses: ['吞噬万物', '魔之领域']
      },
      {
        name: '圆满',
        description: '天魔功最高境界',
        requirements: ['修炼千年', '天魔九变'],
        bonuses: ['天魔九变', '吞噬之道']
      }
    ],
    forbidden: true,
    lost: false
  },
  {
    id: 'method_wanjian',
    name: '万剑诀',
    type: 'cultivation_method',
    methodType: 'internal',
    grade: 'immortal',
    description: '万剑真人创立的顶级剑道功法，蕴含剑道，是青云大陆最顶级的剑道功法之一。',
    origin: '万剑真人创立',
    history: `万剑诀是万剑真人于中古纪元创立的顶级剑道功法。万剑真人凭借此功法，成为青云大陆最强大的剑修。

万剑诀蕴含剑道，修炼者可以操控剑气，拥有强大的攻击能力。`,
    creator: '万剑真人',
    inheritance: '万剑传承',
    prerequisites: ['剑道天赋', '剑心'],
    attributes: ['剑', '金', '杀'],
    stages: [
      {
        name: '剑气初生',
        description: '初步感悟剑气，能够发出剑气',
        requirements: ['炼气期', '感悟剑气'],
        effects: ['剑气攻击', '御剑术'],
        breakthroughConditions: ['感悟剑之真意']
      },
      {
        name: '剑心初成',
        description: '剑心初成，剑随心动',
        requirements: ['筑基期', '剑气初生'],
        effects: ['剑心感知', '剑气攻击增强'],
        breakthroughConditions: ['剑心凝实']
      },
      {
        name: '万剑归宗',
        description: '可操控万剑，万剑归一',
        requirements: ['结丹期', '剑心初成'],
        effects: ['万剑归宗', '剑之领域'],
        breakthroughConditions: ['领悟剑道']
      },
      {
        name: '剑心通明',
        description: '剑心通明，无剑胜有剑',
        requirements: ['元婴期', '万剑归宗'],
        effects: ['剑心通明', '无剑之境'],
        breakthroughConditions: ['剑心合一']
      },
      {
        name: '剑道大成',
        description: '万剑诀最高境界，剑道大成',
        requirements: ['化神期', '剑心通明'],
        effects: ['剑道大成', '剑之大道'],
        breakthroughConditions: ['飞升']
      }
    ],
    specialFeatures: ['御剑术', '万剑归宗', '剑心通明', '剑之领域'],
    compatibleSkills: ['剑道功法', '金系功法'],
    incompatibleSkills: ['柔系功法'],
    masteryLevels: [
      {
        name: '入门',
        description: '初步掌握万剑诀',
        requirements: ['修炼一年', '感悟剑气'],
        bonuses: ['剑气攻击', '御剑术']
      },
      {
        name: '小成',
        description: '初步领悟剑之真意',
        requirements: ['修炼十年', '剑心初成'],
        bonuses: ['剑心感知', '万剑归宗']
      },
      {
        name: '大成',
        description: '领悟剑道',
        requirements: ['修炼百年', '剑心通明'],
        bonuses: ['剑心通明', '剑之领域']
      },
      {
        name: '圆满',
        description: '万剑诀最高境界',
        requirements: ['修炼千年', '剑道大成'],
        bonuses: ['剑道大成', '剑之大道']
      }
    ],
    forbidden: false,
    lost: false
  },
  {
    id: 'method_danxia',
    name: '丹霞诀',
    type: 'cultivation_method',
    methodType: 'special',
    grade: 'heaven',
    description: '丹霞仙子创立的顶级丹道功法，蕴含丹道，是青云大陆最顶级的丹道功法之一。',
    origin: '丹霞仙子创立',
    history: `丹霞诀是丹霞仙子于中古纪元创立的顶级丹道功法。丹霞仙子凭借此功法，成为青云大陆最强大的丹修。

丹霞诀蕴含丹道，修炼者可以炼制顶级丹药，拥有强大的辅助能力。`,
    creator: '丹霞仙子',
    inheritance: '丹霞传承',
    prerequisites: ['丹道天赋', '火属性亲和'],
    attributes: ['火', '木', '丹'],
    stages: [
      {
        name: '丹火初生',
        description: '初步感悟丹火，能够操控丹火',
        requirements: ['炼气期', '感悟丹火'],
        effects: ['丹火操控', '基础炼丹'],
        breakthroughConditions: ['感悟丹之真意']
      },
      {
        name: '丹心初成',
        description: '丹心初成，炼丹成功率提升',
        requirements: ['筑基期', '丹火初生'],
        effects: ['丹心感知', '炼丹增强'],
        breakthroughConditions: ['丹心凝实']
      },
      {
        name: '丹道小成',
        description: '丹道小成，可炼制高级丹药',
        requirements: ['结丹期', '丹心初成'],
        effects: ['丹道小成', '丹之领域'],
        breakthroughConditions: ['领悟丹道']
      },
      {
        name: '丹心通明',
        description: '丹心通明，炼丹成功率极高',
        requirements: ['元婴期', '丹道小成'],
        effects: ['丹心通明', '丹道大成'],
        breakthroughConditions: ['丹心合一']
      },
      {
        name: '丹道大成',
        description: '丹霞诀最高境界，丹道大成',
        requirements: ['化神期', '丹心通明'],
        effects: ['丹道大成', '丹之大道'],
        breakthroughConditions: ['飞升']
      }
    ],
    specialFeatures: ['丹火', '炼丹增强', '丹之领域', '丹道大成'],
    compatibleSkills: ['火系功法', '木系功法', '丹道功法'],
    incompatibleSkills: ['水系功法'],
    masteryLevels: [
      {
        name: '入门',
        description: '初步掌握丹霞诀',
        requirements: ['修炼一年', '感悟丹火'],
        bonuses: ['丹火操控', '基础炼丹']
      },
      {
        name: '小成',
        description: '初步领悟丹之真意',
        requirements: ['修炼十年', '丹心初成'],
        bonuses: ['丹心感知', '炼丹增强']
      },
      {
        name: '大成',
        description: '领悟丹道',
        requirements: ['修炼百年', '丹心通明'],
        bonuses: ['丹心通明', '丹之领域']
      },
      {
        name: '圆满',
        description: '丹霞诀最高境界',
        requirements: ['修炼千年', '丹道大成'],
        bonuses: ['丹道大成', '丹之大道']
      }
    ],
    forbidden: false,
    lost: false
  }
]

export const divinePowers: DivinePower[] = [
  {
    id: 'power_sky_spirit_eye',
    name: '天灵眼',
    type: 'divine_power',
    powerType: 'innate',
    grade: 'heaven',
    description: '天灵体特有的神通，可以看破一切虚妄，洞察真实。',
    origin: '天灵体特有',
    history: '天灵眼是天灵体特有的神通，只有天灵体才能觉醒。',
    activationConditions: ['天灵体', '筑基期'],
    cooldown: 0,
    consumption: '少量灵力',
    effects: ['看破幻术', '洞察真实', '发现隐藏', '感知危险'],
    masteryLevels: [
      {
        name: '初醒',
        description: '初步觉醒天灵眼',
        requirements: ['天灵体', '筑基期'],
        bonuses: ['看破低级幻术']
      },
      {
        name: '小成',
        description: '天灵眼小成',
        requirements: ['结丹期'],
        bonuses: ['看破中级幻术', '洞察真实']
      },
      {
        name: '大成',
        description: '天灵眼大成',
        requirements: ['元婴期'],
        bonuses: ['看破高级幻术', '发现隐藏']
      },
      {
        name: '圆满',
        description: '天灵眼圆满',
        requirements: ['化神期'],
        bonuses: ['看破一切幻术', '感知危险']
      }
    ],
    forbidden: false,
    lost: false
  },
  {
    id: 'power_phoenix_rebirth',
    name: '凤凰涅槃',
    type: 'divine_power',
    powerType: 'inherited',
    grade: 'immortal',
    description: '凤凰血脉特有的神通，可以在死亡时涅槃重生。',
    origin: '凤凰血脉特有',
    history: '凤凰涅槃是凤凰血脉特有的神通，只有拥有凤凰血脉才能觉醒。',
    activationConditions: ['凤凰血脉', '结丹期', '死亡时自动触发'],
    cooldown: 100,
    consumption: '全部灵力和生命力',
    effects: ['死亡时涅槃重生', '实力恢复', '寿命延长'],
    evolutionPath: ['涅槃重生', '凤凰真身', '凤凰化身'],
    masteryLevels: [
      {
        name: '初醒',
        description: '初步觉醒凤凰涅槃',
        requirements: ['凤凰血脉', '结丹期'],
        bonuses: ['死亡时涅槃重生一次']
      },
      {
        name: '小成',
        description: '凤凰涅槃小成',
        requirements: ['元婴期'],
        bonuses: ['涅槃重生后实力恢复50%']
      },
      {
        name: '大成',
        description: '凤凰涅槃大成',
        requirements: ['化神期'],
        bonuses: ['涅槃重生后实力恢复100%']
      },
      {
        name: '圆满',
        description: '凤凰涅槃圆满',
        requirements: ['渡劫期'],
        bonuses: ['可主动涅槃，实力提升']
      }
    ],
    forbidden: false,
    lost: false
  },
  {
    id: 'power_dragon_breath',
    name: '龙息',
    type: 'divine_power',
    powerType: 'inherited',
    grade: 'immortal',
    description: '龙族血脉特有的神通，可以发出龙息攻击。',
    origin: '龙族血脉特有',
    history: '龙息是龙族血脉特有的神通，只有拥有龙族血脉才能觉醒。',
    activationConditions: ['龙族血脉', '筑基期'],
    cooldown: 1,
    consumption: '中等灵力',
    effects: ['龙息攻击', '龙威', '龙属性伤害'],
    evolutionPath: ['龙息', '真龙息', '龙神息'],
    masteryLevels: [
      {
        name: '初醒',
        description: '初步觉醒龙息',
        requirements: ['龙族血脉', '筑基期'],
        bonuses: ['龙息攻击']
      },
      {
        name: '小成',
        description: '龙息小成',
        requirements: ['结丹期'],
        bonuses: ['龙息攻击增强', '龙威']
      },
      {
        name: '大成',
        description: '龙息大成',
        requirements: ['元婴期'],
        bonuses: ['真龙息', '龙威增强']
      },
      {
        name: '圆满',
        description: '龙息圆满',
        requirements: ['化神期'],
        bonuses: ['龙神息', '龙之领域']
      }
    ],
    forbidden: false,
    lost: false
  }
]

export const spells: Spell[] = [
  {
    id: 'spell_fireball',
    name: '火球术',
    type: 'spell',
    spellType: 'attack',
    element: '火',
    grade: 'mortal',
    description: '最基础的火系法术，可以发出火球攻击敌人。',
    origin: '修仙界常见法术',
    history: '火球术是最基础的火系法术，几乎每个火系修士都会。',
    castingTime: 1,
    range: 50,
    duration: 0,
    consumption: '少量灵力',
    effects: ['火球攻击', '燃烧伤害'],
    masteryLevels: [
      {
        name: '入门',
        description: '初步掌握火球术',
        requirements: ['炼气期'],
        bonuses: ['发出小型火球']
      },
      {
        name: '小成',
        description: '火球术小成',
        requirements: ['筑基期'],
        bonuses: ['发出中型火球', '燃烧伤害增强']
      },
      {
        name: '大成',
        description: '火球术大成',
        requirements: ['结丹期'],
        bonuses: ['发出大型火球', '爆炸伤害']
      },
      {
        name: '圆满',
        description: '火球术圆满',
        requirements: ['元婴期'],
        bonuses: ['发出巨型火球', '范围伤害']
      }
    ],
    variations: ['连珠火球', '爆裂火球', '追踪火球'],
    forbidden: false,
    lost: false
  },
  {
    id: 'spell_ice_shield',
    name: '冰盾术',
    type: 'spell',
    spellType: 'defense',
    element: '冰',
    grade: 'mortal',
    description: '最基础的冰系防御法术，可以形成冰盾防御攻击。',
    origin: '修仙界常见法术',
    history: '冰盾术是最基础的冰系防御法术，几乎每个冰系修士都会。',
    castingTime: 1,
    range: 0,
    duration: 60,
    consumption: '少量灵力',
    effects: ['冰盾防御', '冰冻攻击者'],
    masteryLevels: [
      {
        name: '入门',
        description: '初步掌握冰盾术',
        requirements: ['炼气期'],
        bonuses: ['形成小型冰盾']
      },
      {
        name: '小成',
        description: '冰盾术小成',
        requirements: ['筑基期'],
        bonuses: ['形成中型冰盾', '防御增强']
      },
      {
        name: '大成',
        description: '冰盾术大成',
        requirements: ['结丹期'],
        bonuses: ['形成大型冰盾', '冰冻攻击者']
      },
      {
        name: '圆满',
        description: '冰盾术圆满',
        requirements: ['元婴期'],
        bonuses: ['形成巨型冰盾', '反弹攻击']
      }
    ],
    variations: ['冰墙', '冰甲', '冰域'],
    forbidden: false,
    lost: false
  },
  {
    id: 'spell_thunder_strike',
    name: '雷霆术',
    type: 'spell',
    spellType: 'attack',
    element: '雷',
    grade: 'spirit',
    description: '中阶雷系攻击法术，可以召唤雷霆攻击敌人。',
    origin: '修仙界常见法术',
    history: '雷霆术是中阶雷系攻击法术，威力强大。',
    castingTime: 2,
    range: 100,
    duration: 0,
    consumption: '中等灵力',
    effects: ['雷霆攻击', '麻痹效果', '穿透防御'],
    masteryLevels: [
      {
        name: '入门',
        description: '初步掌握雷霆术',
        requirements: ['筑基期'],
        bonuses: ['召唤小型雷霆']
      },
      {
        name: '小成',
        description: '雷霆术小成',
        requirements: ['结丹期'],
        bonuses: ['召唤中型雷霆', '麻痹效果']
      },
      {
        name: '大成',
        description: '雷霆术大成',
        requirements: ['元婴期'],
        bonuses: ['召唤大型雷霆', '穿透防御']
      },
      {
        name: '圆满',
        description: '雷霆术圆满',
        requirements: ['化神期'],
        bonuses: ['召唤天雷', '范围攻击']
      }
    ],
    variations: ['雷霆万钧', '天雷术', '雷暴术'],
    forbidden: false,
    lost: false
  },
  {
    id: 'spell_sword_flight',
    name: '御剑术',
    type: 'spell',
    spellType: 'utility',
    element: '金',
    grade: 'spirit',
    description: '剑修必备法术，可以御剑飞行。',
    origin: '修仙界常见法术',
    history: '御剑术是剑修必备法术，可以御剑飞行。',
    castingTime: 1,
    range: 0,
    duration: -1,
    consumption: '持续消耗灵力',
    effects: ['御剑飞行', '速度提升'],
    masteryLevels: [
      {
        name: '入门',
        description: '初步掌握御剑术',
        requirements: ['筑基期', '拥有灵剑'],
        bonuses: ['御剑飞行', '速度一般']
      },
      {
        name: '小成',
        description: '御剑术小成',
        requirements: ['结丹期'],
        bonuses: ['速度提升', '灵力消耗减少']
      },
      {
        name: '大成',
        description: '御剑术大成',
        requirements: ['元婴期'],
        bonuses: ['速度大幅提升', '可载人飞行']
      },
      {
        name: '圆满',
        description: '御剑术圆满',
        requirements: ['化神期'],
        bonuses: ['瞬移', '御剑攻击']
      }
    ],
    variations: ['御剑杀敌', '万剑归宗', '剑遁术'],
    forbidden: false,
    lost: false
  }
]

export const secretTechniques: SecretTechnique[] = [
  {
    id: 'technique_blood_escape',
    name: '血遁术',
    type: 'secret_technique',
    techniqueType: 'escape',
    grade: 'earth',
    description: '消耗精血瞬间逃离的秘术，是修士保命的重要手段。',
    origin: '修仙界常见秘术',
    history: '血遁术是修仙界常见的保命秘术，但代价较大。',
    activationConditions: ['消耗精血', '灵力充足'],
    consumption: '精血和灵力',
    effects: ['瞬间逃离', '速度提升十倍'],
    sideEffects: ['精血损失', '修为下降', '寿命减少'],
    masteryBonus: ['精血消耗减少', '速度提升更多'],
    masteryLevels: [
      {
        name: '入门',
        description: '初步掌握血遁术',
        requirements: ['筑基期'],
        bonuses: ['瞬间逃离百里']
      },
      {
        name: '小成',
        description: '血遁术小成',
        requirements: ['结丹期'],
        bonuses: ['瞬间逃离千里', '精血消耗减少']
      },
      {
        name: '大成',
        description: '血遁术大成',
        requirements: ['元婴期'],
        bonuses: ['瞬间逃离万里', '精血消耗大幅减少']
      },
      {
        name: '圆满',
        description: '血遁术圆满',
        requirements: ['化神期'],
        bonuses: ['瞬间逃离十万', '几乎无代价']
      }
    ],
    forbidden: false,
    lost: false
  },
  {
    id: 'technique_hidden_breath',
    name: '敛息术',
    type: 'secret_technique',
    techniqueType: 'hidden',
    grade: 'mortal',
    description: '隐藏气息的秘术，是修士潜行的重要手段。',
    origin: '修仙界常见秘术',
    history: '敛息术是修仙界常见的潜行秘术。',
    activationConditions: ['灵力充足'],
    consumption: '持续消耗灵力',
    effects: ['隐藏气息', '降低存在感'],
    sideEffects: ['无法攻击', '无法使用法术'],
    masteryBonus: ['隐藏效果增强', '灵力消耗减少'],
    masteryLevels: [
      {
        name: '入门',
        description: '初步掌握敛息术',
        requirements: ['炼气期'],
        bonuses: ['隐藏气息', '降低存在感']
      },
      {
        name: '小成',
        description: '敛息术小成',
        requirements: ['筑基期'],
        bonuses: ['隐藏效果增强', '可短暂攻击']
      },
      {
        name: '大成',
        description: '敛息术大成',
        requirements: ['结丹期'],
        bonuses: ['完全隐藏', '可使用部分法术']
      },
      {
        name: '圆满',
        description: '敛息术圆满',
        requirements: ['元婴期'],
        bonuses: ['神不知鬼不觉', '可攻击']
      }
    ],
    forbidden: false,
    lost: false
  },
  {
    id: 'technique_soul_search',
    name: '搜魂术',
    type: 'secret_technique',
    techniqueType: 'special',
    grade: 'heaven',
    description: '搜索他人记忆的秘术，是修士获取情报的重要手段。',
    origin: '修仙界禁忌秘术',
    history: '搜魂术是修仙界禁忌秘术，使用后会损阴德。',
    activationConditions: ['对方无法反抗', '灵力充足'],
    consumption: '大量灵力',
    effects: ['搜索记忆', '获取情报'],
    sideEffects: ['损阴德', '可能反噬', '对方可能死亡'],
    masteryBonus: ['搜索效果增强', '反噬减少'],
    masteryLevels: [
      {
        name: '入门',
        description: '初步掌握搜魂术',
        requirements: ['结丹期'],
        bonuses: ['搜索近期记忆']
      },
      {
        name: '小成',
        description: '搜魂术小成',
        requirements: ['元婴期'],
        bonuses: ['搜索全部记忆', '反噬减少']
      },
      {
        name: '大成',
        description: '搜魂术大成',
        requirements: ['化神期'],
        bonuses: ['搜索深层记忆', '几乎无反噬']
      },
      {
        name: '圆满',
        description: '搜魂术圆满',
        requirements: ['渡劫期'],
        bonuses: ['搜索一切记忆', '无反噬']
      }
    ],
    forbidden: true,
    lost: false
  }
]