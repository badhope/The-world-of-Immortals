export interface Formation {
  id: string
  name: string
  type: 'attack' | 'defense' | 'trap' | 'support' | 'transport' | 'concealment' | 'gathering' | 'sealing' | 'killing' | 'heavenly'
  rank: FormationRank
  description: string
  history: string
  effects: FormationEffect[]
  requirements: FormationRequirement
  components: FormationComponent[]
  activation: FormationActivation
  maintenance: FormationMaintenance
  weaknesses: string[]
  variations: FormationVariation[]
  creator?: string
  currentUsers: string[]
}

export type FormationRank = 'mortal' | 'spirit' | 'earth' | 'heaven' | 'immortal' | 'divine' | 'chaos'

export interface FormationEffect {
  name: string
  description: string
  power: number
  range: number
  duration: number
  targets?: string[]
  conditions?: string[]
}

export interface FormationRequirement {
  minRealm: string
  minFormationLevel: number
  requiredKnowledge: string[]
  requiredItems: string[]
  requiredLocation?: string
  requiredTime?: string
  requiredPeople?: number
}

export interface FormationComponent {
  type: 'flag' | 'stone' | 'crystal' | 'talisman' | 'weapon' | 'material' | 'living'
  name: string
  quantity: number
  quality: string
  position: string
  function: string
}

export interface FormationActivation {
  method: string
  timeRequired: number
  spiritCost: number
  incantation?: string
  handSeals?: string[]
  specialConditions?: string[]
}

export interface FormationMaintenance {
  spiritCostPerHour: number
  maxDuration: number
  degradationRate: number
  repairMethod: string
}

export interface FormationVariation {
  name: string
  description: string
  differences: string[]
  powerModifier: number
}

export interface FormationFlag {
  id: string
  name: string
  rank: FormationRank
  description: string
  material: string
  effects: string[]
  durability: number
  spiritCapacity: number
  compatibleFormations: string[]
  craftingRequirements: CraftingRequirement
}

export interface CraftingRequirement {
  materials: string[]
  minRealm: string
  timeRequired: number
  successRate: number
}

export interface FormationEye {
  id: string
  name: string
  type: 'primary' | 'secondary' | 'auxiliary'
  description: string
  function: string
  power: number
  durability: number
  compatibleFormations: string[]
}

export interface FormationMaster {
  id: string
  name: string
  cultivation: string
  formationLevel: number
  specializations: string[]
  createdFormations: string[]
  knownFormations: string[]
  achievements: string[]
  history: string
}

export const formations: Formation[] = [
  {
    id: 'formation_qingyun',
    name: '青云大阵',
    type: 'defense',
    rank: 'heaven',
    description: `青云宗的护宗大阵，由青云仙尊亲自布置。此阵以云气为根基，可以抵御化神期以下修士的攻击，是青云大陆最强大的防御阵法之一。

青云大阵分为三层：外层云雾阵、中层云海阵、内层青云阵。每一层都有不同的功能，可以层层抵御敌人的攻击。

青云大阵的阵眼位于青云山主峰，需要青云宗历代宗主注入灵力维持。一旦阵法启动，可以抵御数十名元婴期修士的同时攻击。`,
    history: `青云大阵由青云仙尊于上古纪元创立。青云仙尊在创立青云宗后，为了保护宗门，耗费百年时间布置了这座大阵。

上古纪元末期，天魔皇率领魔道大军进攻青云宗，青云大阵成功抵御了魔道大军的攻击，为青云仙尊封印天魔皇争取了时间。

中古纪元时期，青云大阵经过历代宗主的完善，变得更加强大。近古纪元以来，青云大阵仍然是青云大陆最强大的防御阵法之一。`,
    effects: [
      {
        name: '云雾护罩',
        description: '形成云雾护罩，抵御攻击',
        power: 10000,
        range: 5000,
        duration: -1,
        targets: ['青云宗范围内']
      },
      {
        name: '云海领域',
        description: '形成云海领域，削弱敌人',
        power: 5000,
        range: 3000,
        duration: -1,
        targets: ['入侵者']
      },
      {
        name: '青云神雷',
        description: '召唤青云神雷攻击敌人',
        power: 8000,
        range: 5000,
        duration: 1,
        targets: ['入侵者']
      }
    ],
    requirements: {
      minRealm: '结丹期',
      minFormationLevel: 8,
      requiredKnowledge: ['青云诀', '云之大道', '阵法精通'],
      requiredItems: ['青云阵旗×108', '青云阵眼×1', '云灵石×1000'],
      requiredLocation: '青云山',
      requiredPeople: 12
    },
    components: [
      { type: 'flag', name: '青云阵旗', quantity: 108, quality: '上品', position: '外层×36，中层×36，内层×36', function: '引导云气' },
      { type: 'crystal', name: '青云阵眼', quantity: 1, quality: '极品', position: '主峰', function: '阵法核心' },
      { type: 'stone', name: '云灵石', quantity: 1000, quality: '中品', position: '遍布阵法', function: '提供灵力' }
    ],
    activation: {
      method: '宗主主持，十二长老协助',
      timeRequired: 60,
      spiritCost: 10000,
      incantation: '青云护宗，云海无边，起！',
      handSeals: ['青云印', '云海印', '护宗印'],
      specialConditions: ['需要宗主亲自主持', '需要十二名元婴期以上长老协助']
    },
    maintenance: {
      spiritCostPerHour: 1000,
      maxDuration: -1,
      degradationRate: 0.01,
      repairMethod: '注入灵力修复'
    },
    weaknesses: ['阵眼被破坏', '灵力供应中断', '同时遭受超过十名化神期修士攻击'],
    variations: [
      {
        name: '青云小阵',
        description: '简化版的青云大阵',
        differences: ['阵旗数量减少', '威力降低', '不需要长老协助'],
        powerModifier: 0.3
      }
    ],
    creator: '青云仙尊',
    currentUsers: ['青云宗']
  },
  {
    id: 'formation_wanjian',
    name: '万剑大阵',
    type: 'attack',
    rank: 'heaven',
    description: `万剑宗的镇宗大阵，由万剑真人亲自布置。此阵以剑意为核心，可以召唤万剑攻击敌人，是青云大陆最强大的攻击阵法之一。

万剑大阵分为三层：外层剑气阵、中层剑阵、内层万剑归宗阵。每一层都有不同的攻击方式，可以层层削弱敌人的防御。

万剑大阵的阵眼位于万剑山主峰，需要万剑宗历代宗主注入剑意维持。一旦阵法启动，可以同时发射数万道剑气攻击敌人。`,
    history: `万剑大阵由万剑真人于中古纪元创立。万剑真人在创立万剑宗后，为了保护宗门，耗费五十年时间布置了这座大阵。

中古纪元后期，魔道大军进攻万剑宗，万剑大阵成功击退了魔道大军，展现了强大的攻击力。

近古纪元以来，万剑大阵仍然是青云大陆最强大的攻击阵法之一。`,
    effects: [
      {
        name: '剑气攻击',
        description: '发射剑气攻击敌人',
        power: 8000,
        range: 3000,
        duration: 1,
        targets: ['入侵者']
      },
      {
        name: '剑阵压制',
        description: '形成剑阵压制敌人',
        power: 5000,
        range: 2000,
        duration: 10,
        targets: ['入侵者']
      },
      {
        name: '万剑归宗',
        description: '召唤万剑同时攻击',
        power: 15000,
        range: 5000,
        duration: 1,
        targets: ['入侵者']
      }
    ],
    requirements: {
      minRealm: '结丹期',
      minFormationLevel: 8,
      requiredKnowledge: ['万剑诀', '剑道', '阵法精通'],
      requiredItems: ['万剑阵旗×72', '万剑阵眼×1', '剑灵石×500'],
      requiredLocation: '万剑山',
      requiredPeople: 7
    },
    components: [
      { type: 'flag', name: '万剑阵旗', quantity: 72, quality: '上品', position: '外层×24，中层×24，内层×24', function: '引导剑气' },
      { type: 'weapon', name: '万剑阵眼', quantity: 1, quality: '极品', position: '主峰', function: '阵法核心' },
      { type: 'stone', name: '剑灵石', quantity: 500, quality: '中品', position: '遍布阵法', function: '提供剑意' }
    ],
    activation: {
      method: '宗主主持，七长老协助',
      timeRequired: 30,
      spiritCost: 8000,
      incantation: '万剑归宗，剑气如虹，起！',
      handSeals: ['万剑印', '剑阵印', '归宗印'],
      specialConditions: ['需要宗主亲自主持', '需要七名元婴期以上长老协助']
    },
    maintenance: {
      spiritCostPerHour: 800,
      maxDuration: -1,
      degradationRate: 0.01,
      repairMethod: '注入剑意修复'
    },
    weaknesses: ['阵眼被破坏', '剑意供应中断', '同时遭受超过五名化神期修士攻击'],
    variations: [
      {
        name: '万剑小阵',
        description: '简化版的万剑大阵',
        differences: ['阵旗数量减少', '威力降低', '不需要长老协助'],
        powerModifier: 0.3
      }
    ],
    creator: '万剑真人',
    currentUsers: ['万剑宗']
  },
  {
    id: 'formation_five_elements',
    name: '五行大阵',
    type: 'support',
    rank: 'heaven',
    description: `五行宗的镇宗大阵，以五行之力为核心。此阵可以调动五行之力，攻守兼备，是青云大陆最全面的阵法之一。

五行大阵分为五层：金层、木层、水层、火层、土层。每一层都有不同的功能，可以根据需要切换。`,
    history: `五行大阵由五行真人于中古纪元创立。五行真人在领悟五行之道后，耗费八十年时间布置了这座大阵。

中古纪元后期，五行大阵曾多次抵御魔道进攻，展现了强大的全面性。`,
    effects: [
      {
        name: '金之锐',
        description: '金属性攻击',
        power: 6000,
        range: 2000,
        duration: 5,
        targets: ['敌人']
      },
      {
        name: '木之生',
        description: '木属性治疗',
        power: 4000,
        range: 2000,
        duration: 10,
        targets: ['友方']
      },
      {
        name: '水之柔',
        description: '水属性防御',
        power: 5000,
        range: 2000,
        duration: 10,
        targets: ['友方']
      },
      {
        name: '火之烈',
        description: '火属性攻击',
        power: 7000,
        range: 2000,
        duration: 5,
        targets: ['敌人']
      },
      {
        name: '土之厚',
        description: '土属性防御',
        power: 6000,
        range: 2000,
        duration: 10,
        targets: ['友方']
      }
    ],
    requirements: {
      minRealm: '结丹期',
      minFormationLevel: 7,
      requiredKnowledge: ['五行诀', '五行之道', '阵法精通'],
      requiredItems: ['五行阵旗×60', '五行阵眼×5', '五行灵石×500'],
      requiredPeople: 5
    },
    components: [
      { type: 'flag', name: '五行阵旗', quantity: 60, quality: '上品', position: '金×12，木×12，水×12，火×12，土×12', function: '引导五行之力' },
      { type: 'crystal', name: '五行阵眼', quantity: 5, quality: '极品', position: '五行方位', function: '阵法核心' },
      { type: 'stone', name: '五行灵石', quantity: 500, quality: '中品', position: '遍布阵法', function: '提供灵力' }
    ],
    activation: {
      method: '五名结丹期以上修士主持',
      timeRequired: 45,
      spiritCost: 6000,
      incantation: '五行轮转，生生不息，起！',
      handSeals: ['五行印', '轮转印', '生生印']
    },
    maintenance: {
      spiritCostPerHour: 600,
      maxDuration: -1,
      degradationRate: 0.01,
      repairMethod: '注入五行之力修复'
    },
    weaknesses: ['五行失衡', '阵眼被破坏', '同时遭受超过三名化神期修士攻击'],
    variations: [],
    creator: '五行真人',
    currentUsers: ['五行宗']
  },
  {
    id: 'formation_yinyang',
    name: '阴阳大阵',
    type: 'sealing',
    rank: 'heaven',
    description: `阴阳宗的镇宗大阵，以阴阳之力为核心。此阵可以封印敌人，是青云大陆最强大的封印阵法之一。

阴阳大阵分为两层：阳层和阴层。阳层主攻击，阴层主封印。`,
    history: `阴阳大阵由阴阳真人于中古纪元创立。阴阳真人在领悟阴阳之道后，耗费百年时间布置了这座大阵。

上古纪元末期，阴阳大阵曾协助青云仙尊封印天魔皇。`,
    effects: [
      {
        name: '阳之烈',
        description: '阳属性攻击',
        power: 8000,
        range: 2000,
        duration: 5,
        targets: ['敌人']
      },
      {
        name: '阴之封',
        description: '阴属性封印',
        power: 10000,
        range: 1000,
        duration: -1,
        targets: ['敌人']
      }
    ],
    requirements: {
      minRealm: '元婴期',
      minFormationLevel: 9,
      requiredKnowledge: ['阴阳诀', '阴阳之道', '阵法精通'],
      requiredItems: ['阴阳阵旗×36', '阴阳阵眼×2', '阴阳灵石×300'],
      requiredPeople: 2
    },
    components: [
      { type: 'flag', name: '阴阳阵旗', quantity: 36, quality: '极品', position: '阳×18，阴×18', function: '引导阴阳之力' },
      { type: 'crystal', name: '阴阳阵眼', quantity: 2, quality: '极品', position: '阴阳方位', function: '阵法核心' },
      { type: 'stone', name: '阴阳灵石', quantity: 300, quality: '上品', position: '遍布阵法', function: '提供灵力' }
    ],
    activation: {
      method: '两名元婴期以上修士主持',
      timeRequired: 120,
      spiritCost: 15000,
      incantation: '阴阳轮转，天地封印，起！',
      handSeals: ['阴阳印', '轮转印', '封印印']
    },
    maintenance: {
      spiritCostPerHour: 1500,
      maxDuration: -1,
      degradationRate: 0.005,
      repairMethod: '注入阴阳之力修复'
    },
    weaknesses: ['阴阳失衡', '阵眼被破坏', '被封印者实力超过化神期'],
    variations: [],
    creator: '阴阳真人',
    currentUsers: ['阴阳宗', '青云宗']
  },
  {
    id: 'formation_demon_seal',
    name: '天魔封印阵',
    type: 'sealing',
    rank: 'immortal',
    description: `封印天魔皇的终极阵法，由青云仙尊联合多位上古大能共同布置。此阵以天地之力为核心，可以封印渡劫期以下的存在。

天魔封印阵是青云大陆最强大的封印阵法，封印了天魔皇数千年。`,
    history: `天魔封印阵由青云仙尊联合玄天老祖、万剑真人、丹霞仙子等多位上古大能于上古纪元末期共同布置。

上古纪元末期，天魔皇率领魔道大军进攻青云大陆，青云仙尊等人与天魔皇展开决战。最终，青云仙尊以天魔封印阵封印了天魔皇。

近古纪元以来，天魔封印阵的封印开始松动，需要定期加固。`,
    effects: [
      {
        name: '天地封印',
        description: '封印目标',
        power: 100000,
        range: 100,
        duration: -1,
        targets: ['天魔皇']
      },
      {
        name: '灵力压制',
        description: '压制被封印者的灵力',
        power: 50000,
        range: 100,
        duration: -1,
        targets: ['被封印者']
      }
    ],
    requirements: {
      minRealm: '化神期',
      minFormationLevel: 10,
      requiredKnowledge: ['青云诀', '阴阳之道', '五行之道', '封印之道'],
      requiredItems: ['封印阵旗×365', '封印阵眼×1', '天材地宝×10'],
      requiredLocation: '封印之地',
      requiredPeople: 12
    },
    components: [
      { type: 'flag', name: '封印阵旗', quantity: 365, quality: '极品', position: '周天方位', function: '引导天地之力' },
      { type: 'crystal', name: '封印阵眼', quantity: 1, quality: '仙器', position: '封印中心', function: '阵法核心' },
      { type: 'material', name: '天材地宝', quantity: 10, quality: '极品', position: '阵法关键点', function: '增强封印' }
    ],
    activation: {
      method: '十二名化神期以上修士主持',
      timeRequired: 365,
      spiritCost: 1000000,
      incantation: '天地为笼，万法为锁，封！',
      handSeals: ['天地印', '万法印', '封魔印'],
      specialConditions: ['需要十二名化神期以上修士', '需要持续注入灵力一年']
    },
    maintenance: {
      spiritCostPerHour: 10000,
      maxDuration: -1,
      degradationRate: 0.001,
      repairMethod: '注入天地之力修复'
    },
    weaknesses: ['封印松动', '被封印者从内部突破', '同时遭受多名渡劫期修士攻击'],
    variations: [],
    creator: '青云仙尊',
    currentUsers: ['青云宗', '正道联盟']
  },
  {
    id: 'formation_spirit_gathering',
    name: '聚灵大阵',
    type: 'gathering',
    rank: 'earth',
    description: `最常见的聚灵阵法，可以聚集天地灵气，提高修炼效率。聚灵大阵分为小、中、大三种规模，效果依次增强。

聚灵大阵是修士最常用的阵法之一，几乎所有宗门和世家都有布置。`,
    history: `聚灵大阵的起源已不可考，据说是上古时期某位阵法大师所创。经过数千年的发展，聚灵大阵已经成为修仙界最普及的阵法之一。`,
    effects: [
      {
        name: '灵气聚集',
        description: '聚集天地灵气',
        power: 100,
        range: 100,
        duration: -1,
        targets: ['阵法范围内']
      }
    ],
    requirements: {
      minRealm: '炼气期',
      minFormationLevel: 1,
      requiredKnowledge: ['基础阵法'],
      requiredItems: ['聚灵阵旗×12', '聚灵石×10']
    },
    components: [
      { type: 'flag', name: '聚灵阵旗', quantity: 12, quality: '下品', position: '十二方位', function: '引导灵气' },
      { type: 'stone', name: '聚灵石', quantity: 10, quality: '下品', position: '阵法中心', function: '聚集灵气' }
    ],
    activation: {
      method: '注入灵力激活',
      timeRequired: 1,
      spiritCost: 100,
      incantation: '聚灵！'
    },
    maintenance: {
      spiritCostPerHour: 10,
      maxDuration: -1,
      degradationRate: 0.1,
      repairMethod: '更换聚灵石'
    },
    weaknesses: ['聚灵石耗尽', '灵气稀薄之地效果减弱'],
    variations: [
      {
        name: '聚灵小阵',
        description: '小型聚灵阵',
        differences: ['范围小', '效果弱'],
        powerModifier: 0.5
      },
      {
        name: '聚灵中阵',
        description: '中型聚灵阵',
        differences: ['范围中等', '效果中等'],
        powerModifier: 1.0
      },
      {
        name: '聚灵大阵',
        description: '大型聚灵阵',
        differences: ['范围大', '效果强'],
        powerModifier: 2.0
      }
    ],
    currentUsers: ['所有宗门', '所有世家']
  },
  {
    id: 'formation_concealment',
    name: '隐匿大阵',
    type: 'concealment',
    rank: 'earth',
    description: `最常见的隐匿阵法，可以隐藏阵法范围内的一切，防止被外人发现。隐匿大阵分为小、中、大三种规模，效果依次增强。

隐匿大阵是修士最常用的阵法之一，几乎所有需要隐藏的地方都有布置。`,
    history: `隐匿大阵的起源已不可考，据说是上古时期某位隐修者所创。经过数千年的发展，隐匿大阵已经成为修仙界最普及的阵法之一。`,
    effects: [
      {
        name: '隐匿',
        description: '隐藏阵法范围内的一切',
        power: 500,
        range: 100,
        duration: -1,
        targets: ['阵法范围内']
      }
    ],
    requirements: {
      minRealm: '炼气期',
      minFormationLevel: 2,
      requiredKnowledge: ['基础阵法', '隐匿之道'],
      requiredItems: ['隐匿阵旗×8', '隐匿石×5']
    },
    components: [
      { type: 'flag', name: '隐匿阵旗', quantity: 8, quality: '中品', position: '八方方位', function: '引导隐匿之力' },
      { type: 'stone', name: '隐匿石', quantity: 5, quality: '中品', position: '阵法中心', function: '提供隐匿之力' }
    ],
    activation: {
      method: '注入灵力激活',
      timeRequired: 1,
      spiritCost: 200,
      incantation: '隐！'
    },
    maintenance: {
      spiritCostPerHour: 20,
      maxDuration: -1,
      degradationRate: 0.05,
      repairMethod: '更换隐匿石'
    },
    weaknesses: ['隐匿石耗尽', '化神期以上修士可以看穿'],
    variations: [],
    currentUsers: ['所有宗门', '所有世家', '散修']
  },
  {
    id: 'formation_transport',
    name: '传送大阵',
    type: 'transport',
    rank: 'heaven',
    description: `可以远距离传送的阵法，是青云大陆最重要的交通方式之一。传送大阵分为短距离、中距离、长距离三种，消耗依次增加。

传送大阵需要两个或以上的传送阵才能使用，且需要在目的地也有传送阵。`,
    history: `传送大阵由上古时期的阵法大师所创，据说是模仿仙界的传送阵而创。经过数千年的发展，传送大阵已经成为青云大陆最重要的交通方式之一。`,
    effects: [
      {
        name: '传送',
        description: '传送目标到目的地',
        power: 1000,
        range: 100000,
        duration: 1,
        targets: ['阵法范围内的人或物']
      }
    ],
    requirements: {
      minRealm: '结丹期',
      minFormationLevel: 6,
      requiredKnowledge: ['空间之道', '阵法精通'],
      requiredItems: ['传送阵旗×12', '空间晶石×10', '传送阵眼×2']
    },
    components: [
      { type: 'flag', name: '传送阵旗', quantity: 12, quality: '上品', position: '十二方位', function: '引导空间之力' },
      { type: 'crystal', name: '空间晶石', quantity: 10, quality: '上品', position: '阵法中心', function: '提供空间之力' },
      { type: 'crystal', name: '传送阵眼', quantity: 2, quality: '极品', position: '起点和终点', function: '连接两点' }
    ],
    activation: {
      method: '注入灵力激活',
      timeRequired: 5,
      spiritCost: 5000,
      incantation: '传送！',
      specialConditions: ['目的地需要有传送阵']
    },
    maintenance: {
      spiritCostPerHour: 0,
      maxDuration: 0,
      degradationRate: 0.01,
      repairMethod: '更换空间晶石'
    },
    weaknesses: ['空间晶石耗尽', '目的地传送阵被破坏', '空间封锁'],
    variations: [
      {
        name: '短距离传送阵',
        description: '短距离传送',
        differences: ['范围小', '消耗少'],
        powerModifier: 0.5
      },
      {
        name: '中距离传送阵',
        description: '中距离传送',
        differences: ['范围中等', '消耗中等'],
        powerModifier: 1.0
      },
      {
        name: '长距离传送阵',
        description: '长距离传送',
        differences: ['范围大', '消耗大'],
        powerModifier: 2.0
      }
    ],
    currentUsers: ['所有大宗门', '所有大国']
  },
  {
    id: 'formation_killing',
    name: '杀阵',
    type: 'killing',
    rank: 'heaven',
    description: `专门用于杀敌的阵法，威力巨大。杀阵分为多种类型，有剑杀阵、雷杀阵、火杀阵等。

杀阵通常用于保护重要地方或埋伏敌人。`,
    history: `杀阵的起源已不可考，据说是上古时期某位战将所创。经过数千年的发展，杀阵已经成为修仙界最危险的阵法之一。`,
    effects: [
      {
        name: '杀戮',
        description: '杀死阵法范围内的敌人',
        power: 5000,
        range: 500,
        duration: 10,
        targets: ['敌人']
      }
    ],
    requirements: {
      minRealm: '筑基期',
      minFormationLevel: 4,
      requiredKnowledge: ['杀戮之道', '阵法精通'],
      requiredItems: ['杀阵旗×36', '杀戮石×10']
    },
    components: [
      { type: 'flag', name: '杀阵旗', quantity: 36, quality: '中品', position: '三十六方位', function: '引导杀戮之力' },
      { type: 'stone', name: '杀戮石', quantity: 10, quality: '中品', position: '阵法中心', function: '提供杀戮之力' }
    ],
    activation: {
      method: '注入灵力激活',
      timeRequired: 3,
      spiritCost: 1000,
      incantation: '杀！'
    },
    maintenance: {
      spiritCostPerHour: 500,
      maxDuration: 24,
      degradationRate: 0.1,
      repairMethod: '更换杀戮石'
    },
    weaknesses: ['杀戮石耗尽', '敌人实力超过阵法威力'],
    variations: [
      {
        name: '剑杀阵',
        description: '以剑气杀敌',
        differences: ['剑气攻击'],
        powerModifier: 1.0
      },
      {
        name: '雷杀阵',
        description: '以雷电杀敌',
        differences: ['雷电攻击'],
        powerModifier: 1.2
      },
      {
        name: '火杀阵',
        description: '以火焰杀敌',
        differences: ['火焰攻击'],
        powerModifier: 1.0
      }
    ],
    currentUsers: ['所有宗门', '所有世家']
  },
  {
    id: 'formation_trap',
    name: '困阵',
    type: 'trap',
    rank: 'earth',
    description: `专门用于困住敌人的阵法，可以让敌人无法逃脱。困阵分为多种类型，有迷踪阵、幻阵、禁空阵等。

困阵通常用于保护重要地方或埋伏敌人。`,
    history: `困阵的起源已不可考，据说是上古时期某位智者所创。经过数千年的发展，困阵已经成为修仙界最常用的阵法之一。`,
    effects: [
      {
        name: '困敌',
        description: '困住阵法范围内的敌人',
        power: 2000,
        range: 500,
        duration: -1,
        targets: ['敌人']
      }
    ],
    requirements: {
      minRealm: '筑基期',
      minFormationLevel: 3,
      requiredKnowledge: ['困敌之道', '阵法精通'],
      requiredItems: ['困阵旗×24', '困敌石×5']
    },
    components: [
      { type: 'flag', name: '困阵旗', quantity: 24, quality: '中品', position: '二十四方位', function: '引导困敌之力' },
      { type: 'stone', name: '困敌石', quantity: 5, quality: '中品', position: '阵法中心', function: '提供困敌之力' }
    ],
    activation: {
      method: '注入灵力激活',
      timeRequired: 2,
      spiritCost: 500,
      incantation: '困！'
    },
    maintenance: {
      spiritCostPerHour: 100,
      maxDuration: -1,
      degradationRate: 0.05,
      repairMethod: '更换困敌石'
    },
    weaknesses: ['困敌石耗尽', '敌人实力超过阵法威力'],
    variations: [
      {
        name: '迷踪阵',
        description: '让敌人迷失方向',
        differences: ['迷踪效果'],
        powerModifier: 0.8
      },
      {
        name: '幻阵',
        description: '让敌人陷入幻境',
        differences: ['幻境效果'],
        powerModifier: 1.0
      },
      {
        name: '禁空阵',
        description: '禁止飞行',
        differences: ['禁空效果'],
        powerModifier: 0.5
      }
    ],
    currentUsers: ['所有宗门', '所有世家']
  }
]

export const formationFlags: FormationFlag[] = [
  {
    id: 'flag_qingyun',
    name: '青云阵旗',
    rank: 'heaven',
    description: '青云宗特制的阵旗，用于布置青云大阵。由青云仙尊亲自设计，蕴含云之大道。',
    material: '青云木、云灵石、天蚕丝',
    effects: ['引导云气', '增强云系阵法', '云雾护体'],
    durability: 10000,
    spiritCapacity: 5000,
    compatibleFormations: ['青云大阵', '青云小阵', '云雾阵'],
    craftingRequirements: {
      materials: ['青云木×1', '云灵石×1', '天蚕丝×1'],
      minRealm: '结丹期',
      timeRequired: 30,
      successRate: 0.5
    }
  },
  {
    id: 'flag_wanjian',
    name: '万剑阵旗',
    rank: 'heaven',
    description: '万剑宗特制的阵旗，用于布置万剑大阵。由万剑真人亲自设计，蕴含剑道之力。',
    material: '剑木、剑灵石、天蚕丝',
    effects: ['引导剑气', '增强剑系阵法', '剑气护体'],
    durability: 10000,
    spiritCapacity: 5000,
    compatibleFormations: ['万剑大阵', '万剑小阵', '剑阵'],
    craftingRequirements: {
      materials: ['剑木×1', '剑灵石×1', '天蚕丝×1'],
      minRealm: '结丹期',
      timeRequired: 30,
      successRate: 0.5
    }
  },
  {
    id: 'flag_five_elements',
    name: '五行阵旗',
    rank: 'earth',
    description: '五行宗特制的阵旗，用于布置五行大阵。蕴含五行之力。',
    material: '五行木、五行灵石、天蚕丝',
    effects: ['引导五行之力', '增强五行阵法', '五行护体'],
    durability: 5000,
    spiritCapacity: 3000,
    compatibleFormations: ['五行大阵', '五行小阵', '聚灵阵'],
    craftingRequirements: {
      materials: ['五行木×1', '五行灵石×1', '天蚕丝×1'],
      minRealm: '筑基期',
      timeRequired: 20,
      successRate: 0.6
    }
  },
  {
    id: 'flag_yinyang',
    name: '阴阳阵旗',
    rank: 'heaven',
    description: '阴阳宗特制的阵旗，用于布置阴阳大阵。蕴含阴阳之力。',
    material: '阴阳木、阴阳灵石、天蚕丝',
    effects: ['引导阴阳之力', '增强阴阳阵法', '阴阳护体'],
    durability: 8000,
    spiritCapacity: 4000,
    compatibleFormations: ['阴阳大阵', '封印阵', '传送阵'],
    craftingRequirements: {
      materials: ['阴阳木×1', '阴阳灵石×1', '天蚕丝×1'],
      minRealm: '结丹期',
      timeRequired: 25,
      successRate: 0.5
    }
  },
  {
    id: 'flag_spirit_gathering',
    name: '聚灵阵旗',
    rank: 'mortal',
    description: '最常见的聚灵阵旗，用于布置聚灵大阵。',
    material: '灵木、灵石、蚕丝',
    effects: ['引导灵气', '增强聚灵阵'],
    durability: 1000,
    spiritCapacity: 500,
    compatibleFormations: ['聚灵大阵', '聚灵小阵'],
    craftingRequirements: {
      materials: ['灵木×1', '灵石×1', '蚕丝×1'],
      minRealm: '炼气期',
      timeRequired: 5,
      successRate: 0.8
    }
  },
  {
    id: 'flag_concealment',
    name: '隐匿阵旗',
    rank: 'earth',
    description: '最常见的隐匿阵旗，用于布置隐匿大阵。',
    material: '隐木、隐匿石、蚕丝',
    effects: ['引导隐匿之力', '增强隐匿阵'],
    durability: 2000,
    spiritCapacity: 1000,
    compatibleFormations: ['隐匿大阵', '隐匿小阵'],
    craftingRequirements: {
      materials: ['隐木×1', '隐匿石×1', '蚕丝×1'],
      minRealm: '炼气期',
      timeRequired: 10,
      successRate: 0.7
    }
  },
  {
    id: 'flag_transport',
    name: '传送阵旗',
    rank: 'heaven',
    description: '传送阵专用的阵旗，用于布置传送大阵。',
    material: '空间木、空间晶石、天蚕丝',
    effects: ['引导空间之力', '增强传送阵'],
    durability: 5000,
    spiritCapacity: 3000,
    compatibleFormations: ['传送大阵', '传送小阵'],
    craftingRequirements: {
      materials: ['空间木×1', '空间晶石×1', '天蚕丝×1'],
      minRealm: '结丹期',
      timeRequired: 30,
      successRate: 0.4
    }
  },
  {
    id: 'flag_killing',
    name: '杀阵旗',
    rank: 'earth',
    description: '杀阵专用的阵旗，用于布置杀阵。',
    material: '杀木、杀戮石、蚕丝',
    effects: ['引导杀戮之力', '增强杀阵'],
    durability: 3000,
    spiritCapacity: 2000,
    compatibleFormations: ['杀阵', '剑杀阵', '雷杀阵', '火杀阵'],
    craftingRequirements: {
      materials: ['杀木×1', '杀戮石×1', '蚕丝×1'],
      minRealm: '筑基期',
      timeRequired: 15,
      successRate: 0.6
    }
  },
  {
    id: 'flag_trap',
    name: '困阵旗',
    rank: 'earth',
    description: '困阵专用的阵旗，用于布置困阵。',
    material: '困木、困敌石、蚕丝',
    effects: ['引导困敌之力', '增强困阵'],
    durability: 3000,
    spiritCapacity: 2000,
    compatibleFormations: ['困阵', '迷踪阵', '幻阵', '禁空阵'],
    craftingRequirements: {
      materials: ['困木×1', '困敌石×1', '蚕丝×1'],
      minRealm: '筑基期',
      timeRequired: 15,
      successRate: 0.6
    }
  }
]

export const formationEyes: FormationEye[] = [
  {
    id: 'eye_qingyun',
    name: '青云阵眼',
    type: 'primary',
    description: '青云大阵的核心阵眼，由青云仙尊亲自炼制。',
    function: '控制整个青云大阵',
    power: 100000,
    durability: 100000,
    compatibleFormations: ['青云大阵']
  },
  {
    id: 'eye_wanjian',
    name: '万剑阵眼',
    type: 'primary',
    description: '万剑大阵的核心阵眼，由万剑真人亲自炼制。',
    function: '控制整个万剑大阵',
    power: 80000,
    durability: 80000,
    compatibleFormations: ['万剑大阵']
  },
  {
    id: 'eye_five_elements',
    name: '五行阵眼',
    type: 'primary',
    description: '五行大阵的核心阵眼，蕴含五行之力。',
    function: '控制整个五行大阵',
    power: 50000,
    durability: 50000,
    compatibleFormations: ['五行大阵']
  },
  {
    id: 'eye_yinyang',
    name: '阴阳阵眼',
    type: 'primary',
    description: '阴阳大阵的核心阵眼，蕴含阴阳之力。',
    function: '控制整个阴阳大阵',
    power: 60000,
    durability: 60000,
    compatibleFormations: ['阴阳大阵', '封印阵']
  },
  {
    id: 'eye_demon_seal',
    name: '封印阵眼',
    type: 'primary',
    description: '天魔封印阵的核心阵眼，蕴含天地之力。',
    function: '控制整个天魔封印阵',
    power: 1000000,
    durability: 1000000,
    compatibleFormations: ['天魔封印阵']
  },
  {
    id: 'eye_transport',
    name: '传送阵眼',
    type: 'primary',
    description: '传送大阵的核心阵眼，蕴含空间之力。',
    function: '控制整个传送大阵',
    power: 30000,
    durability: 30000,
    compatibleFormations: ['传送大阵']
  },
  {
    id: 'eye_spirit_gathering',
    name: '聚灵阵眼',
    type: 'secondary',
    description: '聚灵大阵的核心阵眼，蕴含聚灵之力。',
    function: '聚集灵气',
    power: 5000,
    durability: 5000,
    compatibleFormations: ['聚灵大阵']
  },
  {
    id: 'eye_concealment',
    name: '隐匿阵眼',
    type: 'secondary',
    description: '隐匿大阵的核心阵眼，蕴含隐匿之力。',
    function: '隐藏目标',
    power: 8000,
    durability: 8000,
    compatibleFormations: ['隐匿大阵']
  }
]

export const formationMasters: FormationMaster[] = [
  {
    id: 'master_qingyun',
    name: '青云仙尊',
    cultivation: '渡劫期',
    formationLevel: 10,
    specializations: ['云系阵法', '防御阵法', '封印阵法'],
    createdFormations: ['青云大阵', '天魔封印阵'],
    knownFormations: ['青云大阵', '天魔封印阵', '五行大阵', '阴阳大阵', '传送大阵'],
    achievements: ['创立青云大阵', '封印天魔皇', '布置天魔封印阵'],
    history: '青云仙尊是上古时期最伟大的阵法大师之一，创立了青云大阵和天魔封印阵。'
  },
  {
    id: 'master_wanjian',
    name: '万剑真人',
    cultivation: '化神期',
    formationLevel: 9,
    specializations: ['剑系阵法', '攻击阵法'],
    createdFormations: ['万剑大阵'],
    knownFormations: ['万剑大阵', '剑杀阵', '困阵'],
    achievements: ['创立万剑大阵'],
    history: '万剑真人是中古时期最伟大的剑系阵法大师，创立了万剑大阵。'
  },
  {
    id: 'master_five_elements',
    name: '五行真人',
    cultivation: '化神期',
    formationLevel: 8,
    specializations: ['五行阵法', '辅助阵法'],
    createdFormations: ['五行大阵'],
    knownFormations: ['五行大阵', '聚灵阵', '困阵'],
    achievements: ['创立五行大阵'],
    history: '五行真人是中古时期最伟大的五行阵法大师，创立了五行大阵。'
  },
  {
    id: 'master_yinyang',
    name: '阴阳真人',
    cultivation: '化神期',
    formationLevel: 9,
    specializations: ['阴阳阵法', '封印阵法'],
    createdFormations: ['阴阳大阵'],
    knownFormations: ['阴阳大阵', '封印阵', '传送阵'],
    achievements: ['创立阴阳大阵', '协助封印天魔皇'],
    history: '阴阳真人是中古时期最伟大的阴阳阵法大师，创立了阴阳大阵。'
  }
]