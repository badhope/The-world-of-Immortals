export interface CultivationMethod {
  id: string
  name: string
  type: 'internal' | 'external' | 'special' | 'secret'
  rank: MethodRank
  description: string
  history: string
  requirements: MethodRequirement
  effects: MethodEffect
  stages: MethodStage[]
  compatibility: string[]
  conflicts: string[]
  source: string
  price: number
}

export type MethodRank = 'mortal' | 'earth' | 'heaven' | 'immortal' | 'divine'

export interface MethodRequirement {
  minRealm: number
  minSpiritualRoot?: string[]
  minStats?: { [key: string]: number }
  requiredItems?: string[]
  requiredMethods?: string[]
  forbiddenMethods?: string[]
}

export interface MethodEffect {
  cultivationSpeed: number
  statBonus: { [key: string]: number }
  specialEffects: string[]
  passiveSkills: string[]
}

export interface MethodStage {
  id: string
  name: string
  level: number
  description: string
  expRequired: number
  effects: {
    statBonus: { [key: string]: number }
    newAbilities: string[]
    cultivationSpeedBonus: number
  }
}

export interface Skill {
  id: string
  name: string
  type: 'attack' | 'defense' | 'support' | 'movement' | 'special' | 'passive'
  element: SkillElement
  rank: MethodRank
  description: string
  requirements: SkillRequirement
  effects: SkillEffect
  cooldown: number
  cost: SkillCost
  mastery: SkillMastery
  source: string
}

export type SkillElement = 'fire' | 'water' | 'wood' | 'metal' | 'earth' | 'lightning' | 'wind' | 'ice' | 'light' | 'dark' | 'void' | 'neutral'

export interface SkillRequirement {
  minRealm: number
  requiredMethod?: string
  requiredStats?: { [key: string]: number }
  requiredSkills?: string[]
}

export interface SkillEffect {
  damage?: number
  healing?: number
  buffs?: BuffEffect[]
  debuffs?: DebuffEffect[]
  special?: string[]
}

export interface BuffEffect {
  name: string
  stat: string
  value: number
  duration: number
  description: string
}

export interface DebuffEffect {
  name: string
  stat: string
  value: number
  duration: number
  description: string
}

export interface SkillCost {
  spirit: number
  health?: number
  items?: string[]
}

export interface SkillMastery {
  levels: MasteryLevel[]
  currentLevel: number
  exp: number
}

export interface MasteryLevel {
  level: number
  name: string
  expRequired: number
  effects: {
    damageBonus?: number
    costReduction?: number
    cooldownReduction?: number
    special?: string
  }
}

export interface Spell {
  id: string
  name: string
  type: 'attack' | 'defense' | 'support' | 'utility' | 'ritual'
  element: SkillElement
  rank: MethodRank
  description: string
  incantation: string
  handSeals: string[]
  requirements: {
    minRealm: number
    requiredMethod?: string
    castingTime: number
    range: number
  }
  effects: SpellEffect
  cost: SkillCost
  cooldown: number
}

export interface SpellEffect {
  damage?: number
  healing?: number
  area?: number
  duration?: number
  special?: string[]
}

export interface DivineAbility {
  id: string
  name: string
  type: 'innate' | 'acquired' | 'bloodline' | 'enlightenment'
  rank: MethodRank
  description: string
  origin: string
  requirements: {
    minRealm: number
    requiredConditions: string[]
  }
  effects: {
    passive: string[]
    active: ActiveAbility[]
  }
  cultivation: {
    stages: DivineAbilityStage[]
    currentStage: number
  }
}

export interface ActiveAbility {
  name: string
  description: string
  cost: SkillCost
  cooldown: number
  effects: string[]
}

export interface DivineAbilityStage {
  level: number
  name: string
  description: string
  expRequired: number
  effects: string[]
}

export const cultivationMethods: CultivationMethod[] = [
  {
    id: 'method_qingyun_jue',
    name: '青云诀',
    type: 'internal',
    rank: 'heaven',
    description: '青云宗的镇派功法，由青云仙尊亲创。此功法以云气为根基，修炼出的真元如云海般浩瀚，攻守兼备，是青云大陆最顶尖的功法之一。',
    history: `青云诀由青云仙尊于上古纪元创立。传说青云仙尊在观云海变幻时顿悟，领悟了云之大道，从而创造了这门功法。

青云诀创立后，一直是青云宗的镇派之宝，只有宗主和核心弟子才能修炼。上古纪元末期，青云仙尊在与天魔皇的大战中，曾以青云诀施展出惊天动地的神通，最终封印了天魔皇。

中古纪元时期，青云诀经过历代宗主的完善，变得更加精妙。近古纪元以来，青云诀仍然是青云大陆最顶尖的功法之一。`,
    requirements: {
      minRealm: 1,
      minSpiritualRoot: ['天灵根', '地灵根', '风灵根', '水灵根'],
      minStats: { comprehension: 50, willpower: 40 }
    },
    effects: {
      cultivationSpeed: 1.5,
      statBonus: { spirit: 20, speed: 15, defense: 10 },
      specialEffects: ['云气护体', '云海领域', '云遁术'],
      passiveSkills: ['云气感知', '云雾隐匿']
    },
    stages: [
      {
        id: 'qingyun_1',
        name: '云气初生',
        level: 1,
        description: '初步感应云气，将其引入体内',
        expRequired: 1000,
        effects: {
          statBonus: { spirit: 5 },
          newAbilities: ['云气护体'],
          cultivationSpeedBonus: 0.1
        }
      },
      {
        id: 'qingyun_2',
        name: '云海初成',
        level: 2,
        description: '体内云气汇聚成海',
        expRequired: 5000,
        effects: {
          statBonus: { spirit: 10, speed: 5 },
          newAbilities: ['云遁术'],
          cultivationSpeedBonus: 0.2
        }
      },
      {
        id: 'qingyun_3',
        name: '云雾缭绕',
        level: 3,
        description: '云气外放，形成云雾',
        expRequired: 20000,
        effects: {
          statBonus: { spirit: 15, speed: 10, defense: 5 },
          newAbilities: ['云雾隐匿'],
          cultivationSpeedBonus: 0.3
        }
      },
      {
        id: 'qingyun_4',
        name: '云海领域',
        level: 4,
        description: '形成云海领域',
        expRequired: 100000,
        effects: {
          statBonus: { spirit: 20, speed: 15, defense: 10 },
          newAbilities: ['云海领域'],
          cultivationSpeedBonus: 0.5
        }
      },
      {
        id: 'qingyun_5',
        name: '云道大成',
        level: 5,
        description: '领悟云之大道',
        expRequired: 500000,
        effects: {
          statBonus: { spirit: 30, speed: 20, defense: 15 },
          newAbilities: ['云化万物'],
          cultivationSpeedBonus: 1.0
        }
      }
    ],
    compatibility: ['青云剑诀', '云海神通', '云遁术'],
    conflicts: ['血魔功', '焚天诀'],
    source: '青云宗',
    price: 100000
  },
  {
    id: 'method_xuantian_jue',
    name: '玄天诀',
    type: 'internal',
    rank: 'heaven',
    description: '玄天宗的镇派功法，以玄妙著称。此功法修炼出的真元玄妙莫测，可以模拟各种属性，是一门极其灵活的功法。',
    history: `玄天诀由玄天老祖于中古纪元创立。玄天老祖原本是一名散修，后因获得上古传承而实力大增，最终创立了玄天宗。

玄天诀的特点是玄妙莫测，可以模拟各种属性的真元，使得修炼者可以学习各种属性的功法和法术。这门功法一经问世，就引起了轰动。

中古纪元后期，玄天诀经过历代宗主的完善，变得更加精妙。近古纪元以来，玄天诀仍然是青云大陆最顶尖的功法之一。`,
    requirements: {
      minRealm: 1,
      minSpiritualRoot: ['天灵根', '地灵根', '玄灵根'],
      minStats: { comprehension: 60, willpower: 30 }
    },
    effects: {
      cultivationSpeed: 1.3,
      statBonus: { spirit: 15, comprehension: 20 },
      specialEffects: ['玄妙真元', '属性模拟', '功法兼容'],
      passiveSkills: ['玄气感知', '功法洞察']
    },
    stages: [
      {
        id: 'xuantian_1',
        name: '玄气初生',
        level: 1,
        description: '初步感应玄气，将其引入体内',
        expRequired: 1000,
        effects: {
          statBonus: { spirit: 5, comprehension: 5 },
          newAbilities: ['玄妙真元'],
          cultivationSpeedBonus: 0.1
        }
      },
      {
        id: 'xuantian_2',
        name: '玄气化形',
        level: 2,
        description: '玄气可以化形',
        expRequired: 5000,
        effects: {
          statBonus: { spirit: 10, comprehension: 10 },
          newAbilities: ['属性模拟'],
          cultivationSpeedBonus: 0.2
        }
      },
      {
        id: 'xuantian_3',
        name: '玄妙入微',
        level: 3,
        description: '玄气玄妙入微',
        expRequired: 20000,
        effects: {
          statBonus: { spirit: 15, comprehension: 15 },
          newAbilities: ['功法兼容'],
          cultivationSpeedBonus: 0.3
        }
      },
      {
        id: 'xuantian_4',
        name: '玄天领域',
        level: 4,
        description: '形成玄天领域',
        expRequired: 100000,
        effects: {
          statBonus: { spirit: 20, comprehension: 20 },
          newAbilities: ['玄天领域'],
          cultivationSpeedBonus: 0.5
        }
      },
      {
        id: 'xuantian_5',
        name: '玄道大成',
        level: 5,
        description: '领悟玄之大道',
        expRequired: 500000,
        effects: {
          statBonus: { spirit: 30, comprehension: 30 },
          newAbilities: ['玄化万物'],
          cultivationSpeedBonus: 1.0
        }
      }
    ],
    compatibility: ['所有功法'],
    conflicts: [],
    source: '玄天宗',
    price: 100000
  },
  {
    id: 'method_wanjian_jue',
    name: '万剑诀',
    type: 'internal',
    rank: 'heaven',
    description: '万剑门的镇派功法，以剑道著称。此功法修炼出的真元如剑般锋利，攻击力极强，是青云大陆攻击力最强的功法之一。',
    history: `万剑诀由万剑真人于中古纪元创立。万剑真人是一位剑道天才，一生痴迷于剑道，最终创造了这门功法。

万剑诀的特点是攻击力极强，修炼出的真元如剑般锋利，可以轻易斩断各种防御。这门功法一经问世，就成为了剑道修士的首选。

中古纪元后期，万剑诀经过历代宗主的完善，变得更加精妙。近古纪元以来，万剑诀仍然是青云大陆攻击力最强的功法之一。`,
    requirements: {
      minRealm: 1,
      minSpiritualRoot: ['天灵根', '地灵根', '金灵根'],
      minStats: { comprehension: 40, willpower: 50, strength: 30 }
    },
    effects: {
      cultivationSpeed: 1.2,
      statBonus: { attack: 30, speed: 10 },
      specialEffects: ['剑气护体', '万剑归宗', '剑意领域'],
      passiveSkills: ['剑气感知', '剑意威压']
    },
    stages: [
      {
        id: 'wanjian_1',
        name: '剑气初生',
        level: 1,
        description: '初步凝聚剑气',
        expRequired: 1000,
        effects: {
          statBonus: { attack: 10 },
          newAbilities: ['剑气护体'],
          cultivationSpeedBonus: 0.1
        }
      },
      {
        id: 'wanjian_2',
        name: '剑气化形',
        level: 2,
        description: '剑气可以化形',
        expRequired: 5000,
        effects: {
          statBonus: { attack: 20, speed: 5 },
          newAbilities: ['御剑术'],
          cultivationSpeedBonus: 0.2
        }
      },
      {
        id: 'wanjian_3',
        name: '剑意初成',
        level: 3,
        description: '初步领悟剑意',
        expRequired: 20000,
        effects: {
          statBonus: { attack: 30, speed: 10 },
          newAbilities: ['剑意威压'],
          cultivationSpeedBonus: 0.3
        }
      },
      {
        id: 'wanjian_4',
        name: '万剑归宗',
        level: 4,
        description: '可以控制万剑',
        expRequired: 100000,
        effects: {
          statBonus: { attack: 40, speed: 15 },
          newAbilities: ['万剑归宗'],
          cultivationSpeedBonus: 0.5
        }
      },
      {
        id: 'wanjian_5',
        name: '剑道大成',
        level: 5,
        description: '领悟剑之大道',
        expRequired: 500000,
        effects: {
          statBonus: { attack: 50, speed: 20 },
          newAbilities: ['剑意领域'],
          cultivationSpeedBonus: 1.0
        }
      }
    ],
    compatibility: ['青云剑诀', '御剑术', '剑阵'],
    conflicts: ['血魔功', '柔水诀'],
    source: '万剑门',
    price: 100000
  },
  {
    id: 'method_danxia_jue',
    name: '丹霞诀',
    type: 'internal',
    rank: 'heaven',
    description: '丹霞谷的镇派功法，以丹道著称。此功法修炼出的真元温和醇厚，最适合炼丹，是青云大陆丹道修士的首选功法。',
    history: `丹霞诀由丹霞仙子于中古纪元创立。丹霞仙子是一位丹道天才，一生痴迷于丹道，最终创造了这门功法。

丹霞诀的特点是真元温和醇厚，最适合炼丹。修炼此功法的修士，炼丹成功率比其他修士高出许多。这门功法一经问世，就成为了丹道修士的首选。

中古纪元后期，丹霞诀经过历代宗主的完善，变得更加精妙。近古纪元以来，丹霞诀仍然是青云大陆丹道修士的首选功法。`,
    requirements: {
      minRealm: 1,
      minSpiritualRoot: ['天灵根', '地灵根', '火灵根', '木灵根'],
      minStats: { comprehension: 50, spirit: 40 }
    },
    effects: {
      cultivationSpeed: 1.2,
      statBonus: { spirit: 20, alchemy: 30 },
      specialEffects: ['丹火护体', '丹道加成', '药力吸收'],
      passiveSkills: ['药香感知', '丹气护体']
    },
    stages: [
      {
        id: 'danxia_1',
        name: '丹气初生',
        level: 1,
        description: '初步凝聚丹气',
        expRequired: 1000,
        effects: {
          statBonus: { spirit: 5, alchemy: 10 },
          newAbilities: ['丹火护体'],
          cultivationSpeedBonus: 0.1
        }
      },
      {
        id: 'danxia_2',
        name: '丹火初成',
        level: 2,
        description: '初步凝聚丹火',
        expRequired: 5000,
        effects: {
          statBonus: { spirit: 10, alchemy: 15 },
          newAbilities: ['丹道加成'],
          cultivationSpeedBonus: 0.2
        }
      },
      {
        id: 'danxia_3',
        name: '丹霞缭绕',
        level: 3,
        description: '丹霞缭绕周身',
        expRequired: 20000,
        effects: {
          statBonus: { spirit: 15, alchemy: 20 },
          newAbilities: ['药力吸收'],
          cultivationSpeedBonus: 0.3
        }
      },
      {
        id: 'danxia_4',
        name: '丹道大成',
        level: 4,
        description: '丹道大成',
        expRequired: 100000,
        effects: {
          statBonus: { spirit: 20, alchemy: 30 },
          newAbilities: ['丹霞领域'],
          cultivationSpeedBonus: 0.5
        }
      },
      {
        id: 'danxia_5',
        name: '丹仙之道',
        level: 5,
        description: '领悟丹之大道',
        expRequired: 500000,
        effects: {
          statBonus: { spirit: 30, alchemy: 50 },
          newAbilities: ['丹化万物'],
          cultivationSpeedBonus: 1.0
        }
      }
    ],
    compatibility: ['炼丹术', '丹火术', '药道'],
    conflicts: ['血魔功', '寒冰诀'],
    source: '丹霞谷',
    price: 100000
  },
  {
    id: 'method_blood_demon',
    name: '血魔功',
    type: 'internal',
    rank: 'heaven',
    description: '血魔宗的镇派功法，以血道著称。此功法修炼出的真元血腥邪恶，攻击力极强，但修炼者容易走火入魔。',
    history: `血魔功由血魔老祖于中古纪元创立。血魔老祖是一位血道天才，一生痴迷于血道，最终创造了这门功法。

血魔功的特点是攻击力极强，修炼者可以通过吸收他人的精血来提升自己的实力。但这门功法邪恶无比，修炼者容易走火入魔，失去理智。

中古纪元后期，血魔功成为了魔道修士的首选功法。近古纪元以来，血魔功仍然是青云大陆最邪恶的功法之一。`,
    requirements: {
      minRealm: 1,
      minSpiritualRoot: ['天灵根', '地灵根', '血灵根'],
      minStats: { willpower: 60, spirit: 30 }
    },
    effects: {
      cultivationSpeed: 2.0,
      statBonus: { attack: 40, health: 30 },
      specialEffects: ['血气护体', '血魔化身', '血道领域'],
      passiveSkills: ['血气感知', '血气吸收']
    },
    stages: [
      {
        id: 'blood_demon_1',
        name: '血气初生',
        level: 1,
        description: '初步凝聚血气',
        expRequired: 1000,
        effects: {
          statBonus: { attack: 15, health: 10 },
          newAbilities: ['血气护体'],
          cultivationSpeedBonus: 0.2
        }
      },
      {
        id: 'blood_demon_2',
        name: '血气化形',
        level: 2,
        description: '血气可以化形',
        expRequired: 5000,
        effects: {
          statBonus: { attack: 25, health: 20 },
          newAbilities: ['血气吸收'],
          cultivationSpeedBonus: 0.4
        }
      },
      {
        id: 'blood_demon_3',
        name: '血魔初成',
        level: 3,
        description: '初步凝聚血魔',
        expRequired: 20000,
        effects: {
          statBonus: { attack: 35, health: 30 },
          newAbilities: ['血魔化身'],
          cultivationSpeedBonus: 0.6
        }
      },
      {
        id: 'blood_demon_4',
        name: '血道领域',
        level: 4,
        description: '形成血道领域',
        expRequired: 100000,
        effects: {
          statBonus: { attack: 50, health: 40 },
          newAbilities: ['血道领域'],
          cultivationSpeedBonus: 0.8
        }
      },
      {
        id: 'blood_demon_5',
        name: '血魔大成',
        level: 5,
        description: '领悟血之大道',
        expRequired: 500000,
        effects: {
          statBonus: { attack: 70, health: 60 },
          newAbilities: ['血化万物'],
          cultivationSpeedBonus: 1.5
        }
      }
    ],
    compatibility: ['血道功法', '魔道功法'],
    conflicts: ['青云诀', '丹霞诀', '所有正道功法'],
    source: '血魔宗',
    price: 0
  },
  {
    id: 'method_foundation_basic',
    name: '基础引气诀',
    type: 'internal',
    rank: 'mortal',
    description: '最基础的引气功法，适合刚刚踏入修仙之门的修士。此功法修炼速度较慢，但胜在安全稳定，不会走火入魔。',
    history: `基础引气诀是青云大陆最普及的功法，几乎所有修士都是从这门功法开始修炼的。这门功法虽然简单，但却是修仙的根基。

基础引气诀的来源已不可考，据说是在上古纪元由一位散修创造的。这门功法经过无数修士的完善，变得更加适合初学者。`,
    requirements: {
      minRealm: 0,
      minSpiritualRoot: ['所有灵根']
    },
    effects: {
      cultivationSpeed: 0.8,
      statBonus: { spirit: 5 },
      specialEffects: ['稳定修炼'],
      passiveSkills: ['灵气感知']
    },
    stages: [
      {
        id: 'basic_1',
        name: '引气入体',
        level: 1,
        description: '初步引气入体',
        expRequired: 500,
        effects: {
          statBonus: { spirit: 2 },
          newAbilities: ['灵气感知'],
          cultivationSpeedBonus: 0.05
        }
      },
      {
        id: 'basic_2',
        name: '气行经脉',
        level: 2,
        description: '灵气在经脉中运行',
        expRequired: 2000,
        effects: {
          statBonus: { spirit: 5 },
          newAbilities: [],
          cultivationSpeedBonus: 0.1
        }
      },
      {
        id: 'basic_3',
        name: '气聚丹田',
        level: 3,
        description: '灵气汇聚于丹田',
        expRequired: 5000,
        effects: {
          statBonus: { spirit: 8 },
          newAbilities: [],
          cultivationSpeedBonus: 0.15
        }
      }
    ],
    compatibility: ['所有功法'],
    conflicts: [],
    source: '通用',
    price: 100
  }
]

export const skills: Skill[] = [
  {
    id: 'skill_qingyun_sword',
    name: '青云剑法',
    type: 'attack',
    element: 'neutral',
    rank: 'heaven',
    description: '青云宗的镇派剑法，由青云仙尊亲创。此剑法以云气为根基，剑招变幻莫测，攻守兼备。',
    requirements: {
      minRealm: 1,
      requiredMethod: 'method_qingyun_jue',
      requiredStats: { strength: 20, speed: 20 }
    },
    effects: {
      damage: 100,
      buffs: [{ name: '云气护体', stat: 'defense', value: 20, duration: 3, description: '云气护体，提升防御' }],
      special: ['云剑斩', '云海剑阵', '青云一剑']
    },
    cooldown: 5,
    cost: { spirit: 50 },
    mastery: {
      levels: [
        { level: 1, name: '初窥门径', expRequired: 1000, effects: { damageBonus: 0 } },
        { level: 2, name: '登堂入室', expRequired: 5000, effects: { damageBonus: 10 } },
        { level: 3, name: '炉火纯青', expRequired: 20000, effects: { damageBonus: 20, costReduction: 10 } },
        { level: 4, name: '登峰造极', expRequired: 100000, effects: { damageBonus: 30, costReduction: 20, cooldownReduction: 1 } },
        { level: 5, name: '返璞归真', expRequired: 500000, effects: { damageBonus: 50, costReduction: 30, cooldownReduction: 2, special: '剑意自生' } }
      ],
      currentLevel: 1,
      exp: 0
    },
    source: '青云宗'
  },
  {
    id: 'skill_cloud_escape',
    name: '云遁术',
    type: 'movement',
    element: 'wind',
    rank: 'earth',
    description: '青云宗的独门遁术，可以化身为云，瞬间移动到远处。',
    requirements: {
      minRealm: 2,
      requiredMethod: 'method_qingyun_jue',
      requiredStats: { speed: 30 }
    },
    effects: {
      special: ['瞬间移动', '云雾隐匿']
    },
    cooldown: 30,
    cost: { spirit: 100 },
    mastery: {
      levels: [
        { level: 1, name: '初窥门径', expRequired: 1000, effects: { cooldownReduction: 0 } },
        { level: 2, name: '登堂入室', expRequired: 5000, effects: { cooldownReduction: 5 } },
        { level: 3, name: '炉火纯青', expRequired: 20000, effects: { cooldownReduction: 10, costReduction: 20 } },
        { level: 4, name: '登峰造极', expRequired: 100000, effects: { cooldownReduction: 15, costReduction: 30, special: '可带人遁走' } },
        { level: 5, name: '返璞归真', expRequired: 500000, effects: { cooldownReduction: 20, costReduction: 50, special: '云遁千里' } }
      ],
      currentLevel: 1,
      exp: 0
    },
    source: '青云宗'
  },
  {
    id: 'skill_fireball',
    name: '火球术',
    type: 'attack',
    element: 'fire',
    rank: 'mortal',
    description: '最基础的火系法术，凝聚火焰形成火球攻击敌人。',
    requirements: {
      minRealm: 1,
      requiredStats: { spirit: 10 }
    },
    effects: {
      damage: 30,
      debuffs: [{ name: '灼烧', stat: 'health', value: 5, duration: 3, description: '持续灼烧伤害' }]
    },
    cooldown: 2,
    cost: { spirit: 20 },
    mastery: {
      levels: [
        { level: 1, name: '初窥门径', expRequired: 100, effects: { damageBonus: 0 } },
        { level: 2, name: '登堂入室', expRequired: 500, effects: { damageBonus: 10 } },
        { level: 3, name: '炉火纯青', expRequired: 2000, effects: { damageBonus: 20, costReduction: 10 } },
        { level: 4, name: '登峰造极', expRequired: 10000, effects: { damageBonus: 30, costReduction: 20, special: '火球连发' } },
        { level: 5, name: '返璞归真', expRequired: 50000, effects: { damageBonus: 50, costReduction: 30, special: '火海术' } }
      ],
      currentLevel: 1,
      exp: 0
    },
    source: '通用'
  },
  {
    id: 'skill_ice_shield',
    name: '冰盾术',
    type: 'defense',
    element: 'ice',
    rank: 'mortal',
    description: '凝聚寒气形成冰盾，抵挡敌人的攻击。',
    requirements: {
      minRealm: 1,
      requiredStats: { spirit: 10 }
    },
    effects: {
      buffs: [{ name: '冰盾', stat: 'defense', value: 50, duration: 5, description: '冰盾护体，大幅提升防御' }]
    },
    cooldown: 10,
    cost: { spirit: 30 },
    mastery: {
      levels: [
        { level: 1, name: '初窥门径', expRequired: 100, effects: {} },
        { level: 2, name: '登堂入室', expRequired: 500, effects: { cooldownReduction: 2 } },
        { level: 3, name: '炉火纯青', expRequired: 2000, effects: { cooldownReduction: 3, costReduction: 10 } },
        { level: 4, name: '登峰造极', expRequired: 10000, effects: { cooldownReduction: 4, costReduction: 20, special: '冰盾反伤' } },
        { level: 5, name: '返璞归真', expRequired: 50000, effects: { cooldownReduction: 5, costReduction: 30, special: '冰甲术' } }
      ],
      currentLevel: 1,
      exp: 0
    },
    source: '通用'
  },
  {
    id: 'skill_blood_sword',
    name: '血剑术',
    type: 'attack',
    element: 'dark',
    rank: 'earth',
    description: '血魔宗的独门剑法，以精血为引，威力巨大但会消耗自身精血。',
    requirements: {
      minRealm: 2,
      requiredMethod: 'method_blood_demon',
      requiredStats: { strength: 30, spirit: 20 }
    },
    effects: {
      damage: 200,
      debuffs: [{ name: '血咒', stat: 'health', value: 10, duration: 5, description: '持续流失精血' }],
      special: ['吸血效果']
    },
    cooldown: 8,
    cost: { spirit: 80, health: 50 },
    mastery: {
      levels: [
        { level: 1, name: '初窥门径', expRequired: 1000, effects: { damageBonus: 0 } },
        { level: 2, name: '登堂入室', expRequired: 5000, effects: { damageBonus: 15 } },
        { level: 3, name: '炉火纯青', expRequired: 20000, effects: { damageBonus: 30, costReduction: 10 } },
        { level: 4, name: '登峰造极', expRequired: 100000, effects: { damageBonus: 50, costReduction: 20, special: '血剑分身' } },
        { level: 5, name: '返璞归真', expRequired: 500000, effects: { damageBonus: 80, costReduction: 30, special: '血海剑阵' } }
      ],
      currentLevel: 1,
      exp: 0
    },
    source: '血魔宗'
  }
]

export const spells: Spell[] = [
  {
    id: 'spell_thunder_strike',
    name: '雷击术',
    type: 'attack',
    element: 'lightning',
    rank: 'earth',
    description: '召唤天雷攻击敌人，威力巨大。',
    incantation: '九天玄雷，听吾号令，降！',
    handSeals: ['雷印', '天印', '降印'],
    requirements: {
      minRealm: 3,
      requiredMethod: 'method_qingyun_jue',
      castingTime: 5,
      range: 100
    },
    effects: {
      damage: 300,
      area: 10,
      special: ['麻痹效果', '破防效果']
    },
    cost: { spirit: 200 },
    cooldown: 60
  },
  {
    id: 'spell_healing_light',
    name: '治愈之光',
    type: 'support',
    element: 'light',
    rank: 'mortal',
    description: '凝聚光芒治愈伤势。',
    incantation: '天地灵光，汇聚吾身，愈！',
    handSeals: ['光印', '愈印'],
    requirements: {
      minRealm: 1,
      castingTime: 3,
      range: 10
    },
    effects: {
      healing: 50,
      duration: 5
    },
    cost: { spirit: 50 },
    cooldown: 30
  },
  {
    id: 'spell_fire_rain',
    name: '火雨术',
    type: 'attack',
    element: 'fire',
    rank: 'heaven',
    description: '召唤漫天火雨攻击大范围敌人。',
    incantation: '炎阳之火，化雨而降，焚！',
    handSeals: ['火印', '天印', '雨印', '焚印'],
    requirements: {
      minRealm: 4,
      requiredMethod: 'method_danxia_jue',
      castingTime: 10,
      range: 500
    },
    effects: {
      damage: 500,
      area: 100,
      duration: 10,
      special: ['持续伤害', '范围燃烧']
    },
    cost: { spirit: 500 },
    cooldown: 300
  },
  {
    id: 'spell_ice_seal',
    name: '冰封术',
    type: 'attack',
    element: 'ice',
    rank: 'earth',
    description: '以寒气封印敌人。',
    incantation: '玄冰之力，封！',
    handSeals: ['冰印', '封印'],
    requirements: {
      minRealm: 3,
      castingTime: 5,
      range: 50
    },
    effects: {
      damage: 100,
      duration: 10,
      special: ['冻结效果', '减速效果']
    },
    cost: { spirit: 150 },
    cooldown: 120
  }
]

export const divineAbilities: DivineAbility[] = [
  {
    id: 'divine_qingyun_eye',
    name: '青云神眼',
    type: 'enlightenment',
    rank: 'immortal',
    description: '青云仙尊领悟的神通，可以看穿一切虚妄，洞察天地法则。',
    origin: '青云仙尊在观云海变幻时顿悟，领悟了云之大道，从而获得了青云神眼。',
    requirements: {
      minRealm: 5,
      requiredConditions: ['领悟云之大道', '修炼青云诀至大成']
    },
    effects: {
      passive: ['看穿幻术', '洞察气息', '感知危险'],
      active: [
        {
          name: '天眼通',
          description: '开启天眼，可以看到千里之外的事物',
          cost: { spirit: 1000 },
          cooldown: 3600,
          effects: ['千里视野', '穿透障碍']
        },
        {
          name: '法则洞察',
          description: '洞察天地法则的运转',
          cost: { spirit: 5000 },
          cooldown: 86400,
          effects: ['领悟法则', '发现弱点']
        }
      ]
    },
    cultivation: {
      stages: [
        { level: 1, name: '初开', description: '神眼初开，可以看穿低级幻术', expRequired: 100000, effects: ['看穿低级幻术'] },
        { level: 2, name: '小成', description: '神眼小成，可以洞察气息', expRequired: 500000, effects: ['洞察气息', '感知危险'] },
        { level: 3, name: '大成', description: '神眼大成，可以开启天眼', expRequired: 2000000, effects: ['天眼通'] },
        { level: 4, name: '圆满', description: '神眼圆满，可以洞察法则', expRequired: 10000000, effects: ['法则洞察'] },
        { level: 5, name: '神境', description: '神眼神境，可以看穿因果', expRequired: 50000000, effects: ['看穿因果', '预知未来'] }
      ],
      currentStage: 1
    }
  },
  {
    id: 'divine_sword_heart',
    name: '剑心通明',
    type: 'enlightenment',
    rank: 'immortal',
    description: '万剑真人领悟的神通，剑心通明，可以感知一切剑道变化。',
    origin: '万剑真人在剑冢中顿悟，领悟了剑之大道，从而获得了剑心通明。',
    requirements: {
      minRealm: 5,
      requiredConditions: ['领悟剑之大道', '修炼万剑诀至大成']
    },
    effects: {
      passive: ['剑气感知', '剑意威压', '剑招预判'],
      active: [
        {
          name: '万剑归心',
          description: '控制万剑，形成剑阵',
          cost: { spirit: 2000 },
          cooldown: 1800,
          effects: ['万剑齐发', '剑阵领域']
        },
        {
          name: '剑意化身',
          description: '化身为剑，攻击力大增',
          cost: { spirit: 5000 },
          cooldown: 86400,
          effects: ['攻击力翻倍', '无视防御']
        }
      ]
    },
    cultivation: {
      stages: [
        { level: 1, name: '初悟', description: '剑心初悟，可以感知剑气', expRequired: 100000, effects: ['剑气感知'] },
        { level: 2, name: '小成', description: '剑心小成，可以预判剑招', expRequired: 500000, effects: ['剑招预判', '剑意威压'] },
        { level: 3, name: '大成', description: '剑心大成，可以万剑归心', expRequired: 2000000, effects: ['万剑归心'] },
        { level: 4, name: '圆满', description: '剑心圆满，可以剑意化身', expRequired: 10000000, effects: ['剑意化身'] },
        { level: 5, name: '神境', description: '剑心神境，可以剑化万物', expRequired: 50000000, effects: ['剑化万物', '剑道无敌'] }
      ],
      currentStage: 1
    }
  },
  {
    id: 'divine_blood_body',
    name: '血魔不灭体',
    type: 'bloodline',
    rank: 'immortal',
    description: '血魔老祖领悟的神通，肉身不灭，可以无限重生。',
    origin: '血魔老祖在血池中顿悟，领悟了血之大道，从而获得了血魔不灭体。',
    requirements: {
      minRealm: 5,
      requiredConditions: ['领悟血之大道', '修炼血魔功至大成', '拥有血魔血脉']
    },
    effects: {
      passive: ['肉身强化', '血气护体', '快速恢复'],
      active: [
        {
          name: '血魔重生',
          description: '肉身毁灭后可以重生',
          cost: { spirit: 10000 },
          cooldown: 604800,
          effects: ['肉身重生', '实力恢复']
        },
        {
          name: '血海领域',
          description: '形成血海领域',
          cost: { spirit: 5000 },
          cooldown: 86400,
          effects: ['血海领域', '吞噬敌人']
        }
      ]
    },
    cultivation: {
      stages: [
        { level: 1, name: '初成', description: '血魔体初成，肉身强化', expRequired: 100000, effects: ['肉身强化'] },
        { level: 2, name: '小成', description: '血魔体小成，快速恢复', expRequired: 500000, effects: ['快速恢复', '血气护体'] },
        { level: 3, name: '大成', description: '血魔体大成，可以重生', expRequired: 2000000, effects: ['血魔重生'] },
        { level: 4, name: '圆满', description: '血魔体圆满，可以形成血海', expRequired: 10000000, effects: ['血海领域'] },
        { level: 5, name: '神境', description: '血魔体神境，肉身不灭', expRequired: 50000000, effects: ['肉身不灭', '无限重生'] }
      ],
      currentStage: 1
    }
  }
]

export function getMethodById(id: string): CultivationMethod | undefined {
  return cultivationMethods.find(m => m.id === id)
}

export function getSkillById(id: string): Skill | undefined {
  return skills.find(s => s.id === id)
}

export function getSpellById(id: string): Spell | undefined {
  return spells.find(s => s.id === id)
}

export function getDivineAbilityById(id: string): DivineAbility | undefined {
  return divineAbilities.find(d => d.id === id)
}

export function getMethodsByRank(rank: MethodRank): CultivationMethod[] {
  return cultivationMethods.filter(m => m.rank === rank)
}

export function getSkillsByElement(element: SkillElement): Skill[] {
  return skills.filter(s => s.element === element)
}

export function getMethodsBySource(source: string): CultivationMethod[] {
  return cultivationMethods.filter(m => m.source === source)
}

export function canLearnMethod(methodId: string, playerData: {
  realm: number
  spiritualRoot: string
  stats: { [key: string]: number }
  learnedMethods: string[]
}): { canLearn: boolean; reason?: string } {
  const method = getMethodById(methodId)
  if (!method) return { canLearn: false, reason: '功法不存在' }
  
  if (playerData.realm < method.requirements.minRealm) {
    return { canLearn: false, reason: '境界不足' }
  }
  
  if (method.requirements.minSpiritualRoot) {
    if (!method.requirements.minSpiritualRoot.includes(playerData.spiritualRoot) && 
        !method.requirements.minSpiritualRoot.includes('所有灵根')) {
      return { canLearn: false, reason: '灵根不符合要求' }
    }
  }
  
  if (method.requirements.minStats) {
    for (const [stat, required] of Object.entries(method.requirements.minStats)) {
      if ((playerData.stats[stat] || 0) < required) {
        return { canLearn: false, reason: `${stat}不足` }
      }
    }
  }
  
  if (method.requirements.forbiddenMethods) {
    const hasForbidden = method.requirements.forbiddenMethods.some(m => playerData.learnedMethods.includes(m))
    if (hasForbidden) {
      return { canLearn: false, reason: '已学习相冲突的功法' }
    }
  }
  
  return { canLearn: true }
}

export function canLearnSkill(skillId: string, playerData: {
  realm: number
  learnedMethods: string[]
  learnedSkills: string[]
  stats: { [key: string]: number }
}): { canLearn: boolean; reason?: string } {
  const skill = getSkillById(skillId)
  if (!skill) return { canLearn: false, reason: '技能不存在' }
  
  if (playerData.realm < skill.requirements.minRealm) {
    return { canLearn: false, reason: '境界不足' }
  }
  
  if (skill.requirements.requiredMethod && !playerData.learnedMethods.includes(skill.requirements.requiredMethod)) {
    return { canLearn: false, reason: '未学习前置功法' }
  }
  
  if (skill.requirements.requiredSkills) {
    const hasAllSkills = skill.requirements.requiredSkills.every(s => playerData.learnedSkills.includes(s))
    if (!hasAllSkills) {
      return { canLearn: false, reason: '未学习前置技能' }
    }
  }
  
  if (skill.requirements.requiredStats) {
    for (const [stat, required] of Object.entries(skill.requirements.requiredStats)) {
      if ((playerData.stats[stat] || 0) < required) {
        return { canLearn: false, reason: `${stat}不足` }
      }
    }
  }
  
  return { canLearn: true }
}

export function calculateSkillDamage(skillId: string, playerStats: { [key: string]: number }, masteryLevel: number): number {
  const skill = getSkillById(skillId)
  if (!skill || !skill.effects.damage) return 0
  
  let damage = skill.effects.damage
  
  const mastery = skill.mastery.levels.find(l => l.level === masteryLevel)
  if (mastery && mastery.effects.damageBonus) {
    damage *= (1 + mastery.effects.damageBonus / 100)
  }
  
  if (playerStats.attack) {
    damage += playerStats.attack * 0.5
  }
  
  return Math.round(damage)
}

export function calculateSkillCost(skillId: string, masteryLevel: number): SkillCost {
  const skill = getSkillById(skillId)
  if (!skill) return { spirit: 0 }
  
  let cost = { ...skill.cost }
  
  const mastery = skill.mastery.levels.find(l => l.level === masteryLevel)
  if (mastery && mastery.effects.costReduction) {
    cost.spirit = Math.round(cost.spirit * (1 - mastery.effects.costReduction / 100))
  }
  
  return cost
}

export function calculateCooldown(skillId: string, masteryLevel: number): number {
  const skill = getSkillById(skillId)
  if (!skill) return 0
  
  let cooldown = skill.cooldown
  
  const mastery = skill.mastery.levels.find(l => l.level === masteryLevel)
  if (mastery && mastery.effects.cooldownReduction) {
    cooldown -= mastery.effects.cooldownReduction
  }
  
  return Math.max(0, cooldown)
}
