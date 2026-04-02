export interface WorldEra {
  id: string
  name: string
  startYear: number
  endYear: number
  description: string
  majorEvents: HistoricalEvent[]
  characteristics: string[]
  notableFigures: NotableFigure[]
  cultivationLevel: string
  spiritualDensity: number
  majorChanges: string[]
}

export interface HistoricalEvent {
  id: string
  name: string
  year: number
  description: string
  consequences: string[]
  relatedFigures: string[]
  significance: 'minor' | 'major' | 'epochal' | 'world_shaking' | 'heaven_shaking'
  affectedRegions: string[]
  lastingEffects: string[]
  relatedArtifacts?: string[]
  relatedTechniques?: string[]
}

export interface NotableFigure {
  id: string
  name: string
  title: string
  era: string
  cultivation: string
  achievements: string[]
  legacy: string
  status: 'alive' | 'deceased' | 'ascended' | 'sealed' | 'unknown'
  disciples?: string[]
  artifacts?: string[]
  techniques?: string[]
}

export interface WorldRegion {
  id: string
  name: string
  type: 'continent' | 'ocean' | 'secret_realm' | 'forbidden_zone' | 'void' | 'celestial'
  description: string
  area: number
  climate: string
  spiritDensity: number
  majorPowers: string[]
  notableLocations: string[]
  history: string
  dangers: string[]
  resources: string[]
  population: number
  governance: string
  specialFeatures: string[]
  connectedRegions: string[]
  ancientNames: string[]
}

export interface WorldLaw {
  id: string
  name: string
  description: string
  effects: string[]
  exceptions: string[]
  origin: string
  level: 'mortal' | 'immortal' | 'divine' | 'chaos' | 'origin'
  cultivators: string[]
  dangers: string[]
  relatedTechniques: string[]
}

export interface Race {
  id: string
  name: string
  type: 'human' | 'demon' | 'spirit' | 'dragon' | 'phoenix' | 'ancient' | 'divine' | 'mutated'
  origin: string
  characteristics: string[]
  abilities: string[]
  weaknesses: string[]
  history: string
  notableMembers: string[]
  relations: { race: string; relation: 'ally' | 'enemy' | 'neutral' | 'subordinate' }[]
  population: number
  territories: string[]
  specialTraits: string[]
}

export interface MythicalStory {
  id: string
  name: string
  type: 'creation' | 'war' | 'romance' | 'tragedy' | 'hero' | 'divine'
  description: string
  characters: string[]
  moral: string
  historicalBasis?: string
  relatedLocations: string[]
  relatedArtifacts: string[]
  spreadRegions: string[]
}

export interface WorldSecret {
  id: string
  name: string
  type: 'location' | 'artifact' | 'technique' | 'history' | 'entity'
  description: string
  discoverers: string[]
  currentStatus: string
  dangers: string[]
  rewards: string[]
  requirements: string[]
  relatedQuests: string[]
}

export interface HeavenlyDao {
  id: string
  name: string
  description: string
  manifestations: string[]
  will: string
  enforcers: string[]
  rules: string[]
  loopholes: string[]
  cultivationMethods: string[]
}

export interface Dimension {
  id: string
  name: string
  type: 'mortal' | 'spirit' | 'immortal' | 'divine' | 'void' | 'chaos'
  description: string
  ruler?: string
  inhabitants: string[]
  resources: string[]
  dangers: string[]
  connections: string[]
  laws: string[]
  age: number
}

export const worldHistory = {
  name: '青云大陆',
  fullName: '青云仙域·三千大世界之一',
  age: 129600,
  currentYear: 8472,
  
  cosmology: {
    description: `青云大陆是三千大世界之一，位于仙界的边缘地带。整个宇宙分为多个层次：

【混沌虚空】
宇宙的最外层，无边无际，充满混沌之气。只有达到圣人境界的存在才能在混沌虚空中生存。混沌虚空中漂浮着无数世界，三千大世界只是其中最强大的三千个。

【三千大世界】
由开天神斧开辟的三千个大世界，每个大世界都是一个完整的宇宙，拥有独立的法则和天道。青云大陆所在的世界便是其中之一，名为"青云仙域"。三千大世界之间有虚空通道相连，但只有大能才能穿越。

【亿万小世界】
依附于大世界存在的无数小世界，灵气稀薄，法则不完整。凡人世界便是小世界的一种，修士达到一定境界后可以飞升到大世界。

【仙界】
位于三千大世界之上的至高存在，是仙人的居所。仙界灵气浓郁，法则完整，是所有修士向往的终极目的地。但仙界入口已被封闭万年，无人能够飞升。

【神界】
传说中位于仙界之上的神秘存在，只有超越仙人的存在才能进入。神界的存在与否一直是个谜，只有上古典籍中有零星记载。`,
    
    dimensions: [
      {
        id: 'dim_mortal',
        name: '凡人界',
        type: 'mortal',
        description: '凡人居住的世界，灵气稀薄，法则不完整。修士达到筑基期后可以感应到大世界的存在。',
        inhabitants: ['凡人', '低阶妖兽', '散修'],
        resources: ['基础灵石', '普通灵草', '凡铁'],
        dangers: ['天灾', '妖兽', '战乱'],
        connections: ['青云大陆'],
        laws: ['基本物理法则', '弱化的灵气法则'],
        age: 50000
      },
      {
        id: 'dim_qingyun',
        name: '青云仙域',
        type: 'immortal',
        description: '青云大陆所在的大世界，灵气充沛，法则完整。是三千大世界之一，实力排名中等。',
        ruler: '青云仙尊（失踪）',
        inhabitants: ['修士', '妖族', '灵族', '海族'],
        resources: ['灵石', '灵草', '灵矿', '仙材'],
        dangers: ['天劫', '妖兽', '禁地', '魔修'],
        connections: ['凡人界', '其他大世界', '仙界（封闭）'],
        laws: ['完整天道法则', '因果法则', '轮回法则'],
        age: 129600
      },
      {
        id: 'dim_immortal',
        name: '仙界',
        type: 'immortal',
        description: '仙人的居所，灵气浓郁，法则完整。万年前入口封闭，无人能够飞升。',
        ruler: '仙帝',
        inhabitants: ['仙人', '仙兽', '神兽'],
        resources: ['仙石', '仙草', '仙矿', '神材'],
        dangers: ['仙劫', '仙兽', '禁地'],
        connections: ['三千大世界（封闭）', '神界'],
        laws: ['仙道法则', '天道法则'],
        age: 1000000
      },
      {
        id: 'dim_void',
        name: '虚空',
        type: 'void',
        description: '世界之间的虚空，充满虚空风暴和虚空兽。只有大能才能在其中穿行。',
        inhabitants: ['虚空兽', '虚空行者', '流放者'],
        resources: ['虚空石', '虚空晶', '空间碎片'],
        dangers: ['虚空风暴', '虚空兽', '空间裂缝', '时间乱流'],
        connections: ['所有世界'],
        laws: ['虚空法则', '时间法则', '空间法则'],
        age: 129600
      },
      {
        id: 'dim_chaos',
        name: '混沌',
        type: 'chaos',
        description: '宇宙诞生前的混沌状态，只有圣人才能在其中生存。混沌中孕育着无数可能。',
        inhabitants: ['混沌魔神（已陨落）', '混沌兽'],
        resources: ['混沌之气', '混沌本源', '先天至宝'],
        dangers: ['混沌风暴', '混沌兽', '法则崩溃'],
        connections: ['所有维度'],
        laws: ['混沌法则', '本源法则'],
        age: -129600
      }
    ]
  },
  
  creation: {
    description: `天地初开，混沌未分。虚空之中，有一混沌珠孕育亿万年，终于在某一日轰然炸裂，清气上升为天，浊气下沉为地，天地始分。

混沌珠碎裂后，化作三件至宝：造化玉碟、混沌青莲、开天神斧。造化玉碟承载天道法则，混沌青莲孕育万物生灵，开天神斧开辟三千大世界。

【开天辟地】
盘古大神手持开天神斧，劈开混沌，开辟三千大世界。开天之时，三千大道法则显化，三千混沌魔神阻拦，盘古大神以一己之力斩杀三千魔神，但自身也因消耗过大而陨落。

盘古陨落后，其身躯化作天地万物：左眼为日，右眼为月，头发为星辰，血液为江河，肌肉为大地，骨骼为矿脉，皮肤为草木，气息为风云，声音为雷霆，精魂为人类。

【三清诞生】
盘古元神一分为三，化作三清：元始天尊、灵宝天尊、道德天尊。三清继承了盘古的意志，成为天地间最强大的存在之一。

【女娲造人】
女娲娘娘以泥土造人，赋予人类生命和智慧。人类虽然先天不足，但拥有无限的潜力，可以修炼成仙，甚至超越仙人。

【巫妖量劫】
巫族与妖族为争夺天地气运展开大战，最终两败俱伤。十二祖巫陨落，妖族天帝帝俊和东皇太一也相继陨落。巫妖量劫后，人族成为天地主角。`,
    
    treasures: [
      {
        id: 'creation_jade',
        name: '造化玉碟',
        description: '承载三千大道法则的至宝，记录着天地间一切法则的运转规律。拥有造化玉碟，便可推演天地万物，预知过去未来。',
        status: '失落',
        lastSeen: '上古纪元末期',
        fragments: ['造化碎片·天', '造化碎片·地', '造化碎片·人', '造化碎片·道'],
        abilities: ['推演天机', '创造法则', '逆转因果', '预知未来'],
        currentLocation: '未知'
      },
      {
        id: 'chaos_lotus',
        name: '混沌青莲',
        description: '孕育万物生灵的至宝，拥有无穷造化之力。混沌青莲开花结果，孕育了无数先天神魔。',
        status: '分化',
        fragments: ['净世青莲叶', '混沌莲子', '青莲根茎', '青莲花瓣', '青莲莲蓬'],
        abilities: ['创造生命', '治愈万物', '提升资质', '净化因果'],
        currentLocation: '分散于各处'
      },
      {
        id: 'heaven_opener',
        name: '开天神斧',
        description: '开天辟地的至宝，拥有斩破一切的力量。开天后碎裂为三件先天至宝。',
        status: '破碎',
        fragments: ['盘古幡', '太极图', '混沌钟'],
        abilities: ['开辟世界', '斩破虚空', '毁灭一切', '重定地水火风'],
        currentLocation: '三件碎片分别由三清持有'
      },
      {
        id: 'jade_good_fortune',
        name: '鸿蒙紫气',
        description: '天地初开时产生的七道鸿蒙紫气，每一道都代表着成圣的机缘。鸿钧道祖获得三道，分给三清各一道，女娲一道，接引准提各一道。',
        status: '已分配',
        holders: ['鸿钧', '老子', '元始', '通天', '女娲', '接引', '准提'],
        abilities: ['成圣机缘', '参悟大道', '超脱天道'],
        currentLocation: '已融入各圣人元神'
      }
    ],

    firstBeings: [
      {
        id: 'being_pangu',
        name: '盘古',
        title: '开天辟地之祖',
        description: '混沌中诞生的第一位生灵，手持开天神斧开辟三千大世界。开天后陨落，身躯化作天地万物。',
        status: 'deceased',
        legacy: '三清继承其元神，巫族继承其血脉',
        abilities: ['开天辟地', '力之大道', '身化万物']
      },
      {
        id: 'being_hongjun',
        name: '鸿钧',
        title: '道祖',
        description: '混沌中诞生的生灵，获得造化玉碟，参悟三千大道，成为天地间第一位圣人。创立紫霄宫，收三清、女娲、接引、准提为徒。',
        status: 'ascended',
        legacy: '道统传承，紫霄宫',
        abilities: ['天道法则', '造化神通', '因果推演']
      },
      {
        id: 'being_three_pures',
        name: '三清',
        title: '盘古元神所化',
        description: '盘古元神一分为三，化作元始天尊、灵宝天尊、道德天尊。三清各得鸿蒙紫气，皆成圣人。',
        status: 'ascended',
        members: ['元始天尊', '灵宝天尊', '道德天尊'],
        legacy: '阐教、截教、人教'
      },
      {
        id: 'being_nuwa',
        name: '女娲',
        title: '造人圣母',
        description: '混沌中诞生的生灵，以泥土造人，赋予人类生命和智慧。后炼石补天，功德成圣。',
        status: 'ascended',
        legacy: '人族圣母，妖族共主',
        abilities: ['造化神通', '生命法则', '因果法则']
      }
    ]
  },
  
  eras: [
    {
      id: 'era_chaos',
      name: '混沌纪',
      startYear: -129600,
      endYear: -100000,
      description: `天地未开之前的混沌时期，只有混沌之气和混沌生灵存在。这一纪元的生灵被称为混沌魔神，他们拥有不可思议的力量，但也因混沌未分而无法真正修炼。

混沌纪是宇宙的孕育期，混沌珠在其中孕育亿万年。三千大道法则在混沌中逐渐成型，三千混沌魔神也相继诞生。每一位混沌魔神都代表着一条大道法则，他们天生强大，但彼此之间争斗不休。

混沌纪末期，盘古大神从混沌珠中诞生，手持开天神斧，开始开天辟地。这一举动引发了混沌魔神的围攻，盘古大神以一己之力斩杀三千魔神，最终成功开辟三千大世界。`,
      majorEvents: [
        {
          id: 'event_chaos_birth',
          name: '混沌初生',
          year: -129600,
          description: '混沌珠在虚空中孕育而生，开始吸收混沌之气。混沌珠是宇宙的本源，孕育着无限可能。',
          consequences: ['混沌魔神开始出现', '三千大道法则开始孕育', '宇宙进入孕育期'],
          relatedFigures: ['混沌珠'],
          significance: 'epochal',
          affectedRegions: ['混沌'],
          lastingEffects: ['奠定了宇宙的基础结构', '三千大道法则开始成型']
        },
        {
          id: 'event_magic_gods',
          name: '魔神诞生',
          year: -120000,
          description: '三千混沌魔神相继诞生，每一位都代表着一条大道法则。时辰老祖代表时间法则，乾坤老祖代表空间法则，阴阳老祖代表阴阳法则，五行老祖代表五行法则。',
          consequences: ['混沌中开始有了秩序', '魔神之间开始争斗', '大道法则开始显化'],
          relatedFigures: ['时辰老祖', '乾坤老祖', '阴阳老祖', '五行老祖', '命运老祖', '因果老祖', '毁灭老祖', '造化老祖'],
          significance: 'epochal',
          affectedRegions: ['混沌'],
          lastingEffects: ['三千大道法则有了载体', '为后来的开天辟地埋下伏笔']
        },
        {
          id: 'event_pangu_birth',
          name: '盘古诞生',
          year: -110000,
          description: '盘古大神从混沌珠中诞生，手持开天神斧。盘古是混沌中诞生的最强者，代表着"力"之大道。',
          consequences: ['混沌魔神感到威胁', '开天辟地的序幕拉开', '混沌珠开始震动'],
          relatedFigures: ['盘古', '混沌珠', '开天神斧'],
          significance: 'epochal',
          affectedRegions: ['混沌'],
          lastingEffects: ['盘古成为开天辟地之祖', '力之大道开始显化']
        },
        {
          id: 'event_chaos_war',
          name: '混沌大战',
          year: -105000,
          description: '盘古大神开始开天辟地，三千混沌魔神联手阻拦。盘古以一己之力大战三千魔神，最终斩杀所有魔神，但自身也消耗了大部分力量。',
          consequences: ['三千魔神陨落', '盘古重伤', '混沌开始分化', '清浊二气开始分离'],
          relatedFigures: ['盘古', '三千魔神'],
          significance: 'heaven_shaking',
          affectedRegions: ['混沌'],
          lastingEffects: ['三千魔神的残魂化为后来的先天神魔', '魔神的精血化为后来的巫族']
        }
      ],
      characteristics: ['混沌未分', '魔神横行', '法则初生', '无生老死', '时间混乱', '空间扭曲'],
      notableFigures: [
        {
          id: 'figure_pangu_chaos',
          name: '盘古',
          title: '开天辟地之祖',
          era: 'era_chaos',
          cultivation: '力之大道·圣人之上',
          achievements: ['开辟三千大世界', '斩杀三千混沌魔神', '身化天地万物'],
          legacy: '三清继承其元神，巫族继承其血脉',
          status: 'deceased'
        },
        {
          id: 'figure_hongjun_chaos',
          name: '鸿钧',
          title: '道祖',
          era: 'era_chaos',
          cultivation: '天道法则·圣人',
          achievements: ['获得造化玉碟', '参悟三千大道', '成为第一位圣人'],
          legacy: '道统传承，紫霄宫',
          status: 'ascended'
        }
      ],
      cultivationLevel: '无修炼体系，混沌魔神天生强大',
      spiritualDensity: 0,
      majorChanges: ['混沌珠诞生', '三千魔神诞生', '盘古诞生', '开天辟地']
    },
    {
      id: 'era_primordial',
      name: '太古纪',
      startYear: -100000,
      endYear: -50000,
      description: `开天辟地后的第一个纪元，天地初分，灵气充沛。这一时期，先天神魔统治世界，他们天生强大，拥有不可思议的神通。太古纪是修仙者口中的黄金时代，但也是最危险的时期。

太古纪初期，盘古陨落后，其身躯化作天地万物。三清继承盘古元神，女娲造人，巫族和妖族相继崛起。这一时期，天地间诞生了无数强大的存在，他们被称为先天神魔。

太古纪中期，龙凤麒麟三族争霸，引发龙凤大劫。三族大战导致天地破碎，生灵涂炭。最终三族两败俱伤，退出了历史舞台。

太古纪后期，巫妖两族崛起，为争夺天地主宰权展开决战。巫妖大战持续万年，最终两族双双陨落，人族趁机崛起。`,
      majorEvents: [
        {
          id: 'event_heaven_opening',
          name: '开天辟地',
          year: -100000,
          description: '盘古大神手持开天神斧，劈开混沌，开辟三千大世界。开天后，盘古力竭而亡，身躯化作天地万物。',
          consequences: ['混沌珠碎裂', '三千大世界诞生', '盘古陨落', '三清诞生', '巫族诞生', '妖族诞生'],
          relatedFigures: ['盘古', '元始天尊', '灵宝天尊', '道德天尊'],
          significance: 'heaven_shaking',
          affectedRegions: ['所有世界'],
          lastingEffects: ['天地法则确立', '修炼体系开始萌芽', '先天神魔诞生'],
          relatedArtifacts: ['盘古幡', '太极图', '混沌钟']
        },
        {
          id: 'event_dragon_phoenix',
          name: '龙凤大劫',
          year: -95000,
          description: `龙族与凤族为争夺天地气运展开大战，麒麟族趁机崛起。三族大战持续万年，最终两败俱伤。

龙族祖龙率领龙族，凤族元凤率领凤族，麒麟族始麒麟率领麒麟族，三族在东海展开决战。大战导致东海破碎，无数生灵陨落。

最终，祖龙、元凤、始麒麟三败俱伤，各自陨落。龙族退居四海，凤族退居不死火山，麒麟族几乎灭绝。`,
          consequences: ['龙凤二族衰落', '麒麟族几乎灭绝', '天地气运重新分配', '东海破碎'],
          relatedFigures: ['祖龙', '元凤', '始麒麟'],
          significance: 'epochal',
          affectedRegions: ['东海', '四海', '不死火山'],
          lastingEffects: ['龙凤麒麟三族退出争霸', '为巫妖崛起创造条件'],
          relatedArtifacts: ['祖龙珠', '元凤翎', '麒麟印']
        },
        {
          id: 'event_witch_demon',
          name: '巫妖大战',
          year: -80000,
          description: `巫族与妖族为争夺天地主宰权展开决战，持续万年。

巫族由十二祖巫领导，继承盘古血脉，天生肉身强大，不修元神。妖族由帝俊、东皇太一领导，建立天庭，统御周天星斗。

巫妖大战分为三个阶段：
第一阶段，巫族攻入天庭，妖族损失惨重。
第二阶段，妖族反击，巫族节节败退。
第三阶段，十二祖巫施展都天神煞大阵，帝俊、东皇太一施展周天星斗大阵，两败俱伤。

最终，十二祖巫陨落，帝俊、东皇太一也相继陨落。巫妖两族几乎灭绝，人族趁机崛起。`,
          consequences: ['巫妖二族几乎灭绝', '人族崛起', '天庭建立', '地府建立', '圣人开始干预'],
          relatedFigures: ['十二祖巫', '帝俊', '东皇太一', '女娲', '后土'],
          significance: 'heaven_shaking',
          affectedRegions: ['整个青云大陆', '天庭', '地府'],
          lastingEffects: ['人族成为天地主角', '修炼体系开始完善', '天庭地府建立'],
          relatedArtifacts: ['都天神煞旗', '混沌钟', '河图洛书', '东皇钟']
        },
        {
          id: 'event_human_rise',
          name: '人族崛起',
          year: -75000,
          description: '女娲造人后，人族在圣人庇护下开始繁衍壮大。巫妖大战后，人族趁机崛起，成为天地主角。',
          consequences: ['人族成为天地主角', '修仙之道开始传播', '各大势力开始拉拢人族', '人族国家建立'],
          relatedFigures: ['女娲', '伏羲', '神农', '轩辕', '三皇五帝'],
          significance: 'epochal',
          affectedRegions: ['中州大陆', '整个人族聚居区'],
          lastingEffects: ['人族成为修炼主流', '人族文明开始发展'],
          relatedTechniques: ['人族基础修炼法', '三皇传承']
        },
        {
          id: 'event_saints_birth',
          name: '圣人出世',
          year: -70000,
          description: '七位圣人证得混元道果，成为天地间最强大的存在。圣人之下，皆为蝼蚁。',
          consequences: ['圣人时代开启', '天地规则被重新定义', '各大教派建立', '封神量劫埋下伏笔'],
          relatedFigures: ['鸿钧', '老子', '元始', '通天', '女娲', '接引', '准提'],
          significance: 'heaven_shaking',
          affectedRegions: ['整个宇宙'],
          lastingEffects: ['圣人统治时代开始', '各大教派建立', '修炼体系完善']
        },
        {
          id: 'event_prehistoric_war',
          name: '上古神魔大战',
          year: -65000,
          description: '先天神魔之间的大战，持续万年。无数先天神魔陨落，天地破碎。',
          consequences: ['先天神魔几乎灭绝', '天地破碎', '无数秘境形成', '上古遗迹留存'],
          relatedFigures: ['无数先天神魔'],
          significance: 'major',
          affectedRegions: ['整个青云大陆'],
          lastingEffects: ['先天神魔时代结束', '后天神魔开始崛起']
        }
      ],
      characteristics: ['灵气充沛', '神魔并存', '圣人治世', '大劫频发', '先天至宝现世', '神兽遍地'],
      notableFigures: [
        {
          id: 'figure_twelve_witches',
          name: '十二祖巫',
          title: '盘古血脉继承者',
          era: 'era_primordial',
          cultivation: '祖巫境·圣人之下最强',
          achievements: ['建立巫族', '大战妖族', '施展都天神煞大阵'],
          legacy: '巫族血脉传承',
          status: 'deceased',
          disciples: ['巫族十二部']
        },
        {
          id: 'figure_dijun',
          name: '帝俊',
          title: '妖族天帝',
          era: 'era_primordial',
          cultivation: '妖皇境·圣人之下',
          achievements: ['建立天庭', '统御妖族', '大战巫族'],
          legacy: '妖族传承',
          status: 'deceased',
          artifacts: ['河图洛书', '混沌钟']
        },
        {
          id: 'figure_donghuang',
          name: '东皇太一',
          title: '妖族东皇',
          era: 'era_primordial',
          cultivation: '妖皇境·圣人之下',
          achievements: ['辅佐帝俊', '大战巫族', '施展周天星斗大阵'],
          legacy: '妖族传承',
          status: 'deceased',
          artifacts: ['东皇钟']
        },
        {
          id: 'figure_nuwa_primordial',
          name: '女娲',
          title: '造人圣母',
          era: 'era_primordial',
          cultivation: '混元大罗金仙·圣人',
          achievements: ['造人', '补天', '功德成圣'],
          legacy: '人族圣母，妖族共主',
          status: 'ascended',
          artifacts: ['山河社稷图', '红绣球']
        },
        {
          id: 'figure_three_emperors',
          name: '三皇',
          title: '人族始祖',
          era: 'era_primordial',
          cultivation: '人皇境·圣人之下',
          achievements: ['伏羲创八卦', '神农尝百草', '轩辕统一人族'],
          legacy: '人族传承',
          status: 'ascended',
          members: ['伏羲', '神农', '轩辕']
        }
      ],
      cultivationLevel: '先天神魔天生强大，后天修炼体系萌芽',
      spiritualDensity: 10,
      majorChanges: ['开天辟地', '龙凤大劫', '巫妖大战', '人族崛起', '圣人出世']
    },
    {
      id: 'era_ancient',
      name: '上古纪',
      startYear: -50000,
      endYear: -10000,
      description: `圣人隐退后的纪元，修仙文明开始繁荣发展。这一时期，无数大能涌现，各种修炼体系逐渐成型。上古纪是修仙史上最辉煌的时期，留下了无数传说和遗迹。

上古纪初期，人族开始建立修炼体系。太上老君、元始天尊、通天教主三位圣人分别创立人教、阐教、截教，传授修炼之法。修炼体系逐渐完善，境界划分逐渐统一。

上古纪中期，各大宗门开始建立。青云子创立青云宗，玄天老祖创立玄天宗，万剑真人创立万剑门，丹霞仙子创立丹霞谷。这些宗门成为修仙界的中流砥柱。

上古纪后期，域外天魔入侵，引发第一次天魔大战。无数大能陨落，上古文明遭到破坏。最终，青云仙尊以自身为代价封印了天魔皇，但青云仙尊也因此陨落。`,
      majorEvents: [
        {
          id: 'event_immortal_way',
          name: '仙道初成',
          year: -48000,
          description: '人族大能总结前人经验，创立了完整的修仙体系。太上老君著《道德经》，元始天尊著《元始天尊说生天得道真经》，通天教主著《上清灵宝大法》。',
          consequences: ['修仙成为主流', '各种功法开始流传', '境界划分逐渐统一', '宗门开始建立'],
          relatedFigures: ['太上老君', '元始天尊', '通天教主'],
          significance: 'epochal',
          affectedRegions: ['整个青云大陆'],
          lastingEffects: ['修炼体系确立', '境界划分统一'],
          relatedTechniques: ['道德经', '元始经', '上清经']
        },
        {
          id: 'event_sect_founding',
          name: '宗门建立',
          year: -45000,
          description: `各大宗门开始建立，修仙界进入宗门时代。

青云子于青云山创立青云宗，修炼青云诀，成为青云大陆第一大宗门。
玄天老祖于玄天山创立玄天宗，修炼玄天诀，以玄妙著称。
万剑真人于万剑峰创立万剑门，修炼万剑诀，以剑道著称。
丹霞仙子于丹霞谷创立丹霞谷，修炼丹霞诀，以丹道著称。
御兽真人于御兽山创立御兽山，修炼御兽诀，以御兽著称。

五大宗门成为修仙界的主导力量，延续至今。`,
          consequences: ['修仙资源被瓜分', '宗门争斗开始', '散修生存艰难', '修炼传承系统化'],
          relatedFigures: ['青云子', '玄天老祖', '万剑真人', '丹霞仙子', '御兽真人'],
          significance: 'major',
          affectedRegions: ['中州大陆', '青云山', '玄天山', '万剑峰', '丹霞谷', '御兽山'],
          lastingEffects: ['宗门体系确立', '五大宗门延续至今'],
          relatedArtifacts: ['青云令', '玄天印', '万剑', '丹霞炉', '御兽令']
        },
        {
          id: 'event_demon_invasion',
          name: '域外天魔入侵',
          year: -30000,
          description: `域外天魔入侵青云大陆，引发第一次天魔大战。

天魔皇率领域外天魔大军，从虚空裂缝中涌入青云大陆。天魔大军所过之处，生灵涂炭，无数宗门覆灭。

青云仙尊联合各大宗门，组成正道联盟，抵抗天魔大军。大战持续百年，无数大能陨落。

最终，青云仙尊以自身为代价，施展青云封印大阵，将天魔皇封印于魔域深处。但青云仙尊也因此陨落，青云宗从此衰落。`,
          consequences: ['无数修士陨落', '上古文明遭到破坏', '天魔封印建立', '青云仙尊陨落', '青云宗衰落'],
          relatedFigures: ['天魔皇', '青云仙尊', '玄天大帝', '万魔老祖'],
          significance: 'heaven_shaking',
          affectedRegions: ['整个青云大陆', '魔域'],
          lastingEffects: ['天魔封印持续至今', '青云传承分散', '无数遗迹留存'],
          relatedArtifacts: ['青云封印大阵', '天魔珠']
        },
        {
          id: 'event_spirit_race',
          name: '灵族崛起',
          year: -25000,
          description: '灵族在第一次天魔大战后崛起，成为修仙界重要势力。灵族天生亲近灵气，擅长炼器和阵法。',
          consequences: ['灵族与人族结盟', '灵石矿脉被发现', '灵器炼制技术进步', '阵法体系完善'],
          relatedFigures: ['灵皇', '灵圣', '灵尊'],
          significance: 'major',
          affectedRegions: ['灵族领地', '中州大陆'],
          lastingEffects: ['灵族成为修仙界重要势力', '炼器阵法技术进步']
        },
        {
          id: 'event_ancient_war',
          name: '上古大战',
          year: -15000,
          description: `各大势力为争夺上古遗迹爆发大战，持续三千年。

第一次天魔大战后，无数上古遗迹现世，蕴含着珍贵的传承和宝物。各大势力为争夺这些遗迹，爆发了持续三千年的大战。

大战导致无数宗门覆灭，上古传承断绝，修仙界元气大伤。最终，五大宗门联合，建立了新的秩序。`,
          consequences: ['无数宗门覆灭', '上古传承断绝', '修仙界元气大伤', '新秩序建立'],
          relatedFigures: ['青云仙尊', '玄天大帝', '万魔老祖', '五大宗门掌门'],
          significance: 'epochal',
          affectedRegions: ['整个青云大陆'],
          lastingEffects: ['上古传承断绝', '新秩序建立', '无数遗迹留存']
        },
        {
          id: 'event_qingyun_fall',
          name: '青云陨落',
          year: -12000,
          description: `青云仙尊为封印域外天魔，献祭自身，陨落于青云山。

青云仙尊是上古纪最强大的修士之一，修炼青云诀至大成，拥有圣人之下最强的实力。在第一次天魔大战中，青云仙尊以自身为代价，施展青云封印大阵，将天魔皇封印。

青云仙尊陨落后，其传承分散于各处。青云令作为传承的钥匙，失踪万年。青云宗从此衰落，但仍然是五大宗门之一。`,
          consequences: ['青云宗衰落', '青云传承分散', '青云令现世', '天魔封印建立'],
          relatedFigures: ['青云仙尊', '天魔皇', '青云七子'],
          significance: 'epochal',
          affectedRegions: ['青云山', '魔域'],
          lastingEffects: ['青云传承成为传说', '天魔封印持续至今'],
          relatedArtifacts: ['青云令', '青云剑', '青云诀真本']
        },
        {
          id: 'event_artifact_birth',
          name: '仙器出世',
          year: -11000,
          description: '多件仙器相继出世，引发修仙界震动。仙器是超越法宝的存在，拥有不可思议的力量。',
          consequences: ['修士实力大增', '争夺仙器的大战爆发', '仙器传承开始流传'],
          relatedFigures: ['各大势力'],
          significance: 'major',
          affectedRegions: ['整个青云大陆'],
          lastingEffects: ['仙器成为争夺焦点', '仙器传承流传至今']
        }
      ],
      characteristics: ['宗门林立', '仙道繁荣', '大能辈出', '遗迹众多', '仙器现世', '传承丰富'],
      notableFigures: [
        {
          id: 'figure_qingyun_xianzun',
          name: '青云仙尊',
          title: '上古第一人',
          era: 'era_ancient',
          cultivation: '大乘期圆满·半步仙人',
          achievements: ['创立青云宗', '封印天魔皇', '创造青云诀', '炼制青云剑'],
          legacy: '青云传承',
          status: 'deceased',
          disciples: ['青云七子'],
          artifacts: ['青云剑', '青云令', '青云诀真本'],
          techniques: ['青云诀', '青云剑诀', '云海神通']
        },
        {
          id: 'figure_xuantian_dadi',
          name: '玄天大帝',
          title: '玄天宗创始人',
          era: 'era_ancient',
          cultivation: '大乘期圆满·半步仙人',
          achievements: ['创立玄天宗', '创造玄天诀', '炼制玄天印'],
          legacy: '玄天传承',
          status: 'deceased',
          artifacts: ['玄天印'],
          techniques: ['玄天诀', '玄天剑诀', '玄妙神通']
        },
        {
          id: 'figure_wanjian_zhenren',
          name: '万剑真人',
          title: '剑道第一人',
          era: 'era_ancient',
          cultivation: '大乘期圆满·半步仙人',
          achievements: ['创立万剑门', '创造万剑诀', '炼制万剑'],
          legacy: '万剑传承',
          status: 'deceased',
          artifacts: ['万剑'],
          techniques: ['万剑诀', '万剑归宗', '剑意领域']
        },
        {
          id: 'figure_danxia_xianzi',
          name: '丹霞仙子',
          title: '丹道第一人',
          era: 'era_ancient',
          cultivation: '大乘期圆满·半步仙人',
          achievements: ['创立丹霞谷', '创造丹霞诀', '炼制丹霞炉', '著《丹经》'],
          legacy: '丹道传承',
          status: 'deceased',
          artifacts: ['丹霞炉'],
          techniques: ['丹霞诀', '丹火神通']
        },
        {
          id: 'figure_yushou_zhenren',
          name: '御兽真人',
          title: '御兽第一人',
          era: 'era_ancient',
          cultivation: '大乘期圆满·半步仙人',
          achievements: ['创立御兽山', '创造御兽诀', '炼制御兽令'],
          legacy: '御兽传承',
          status: 'deceased',
          artifacts: ['御兽令'],
          techniques: ['御兽诀', '万兽神通']
        },
        {
          id: 'figure_tianmo_huang',
          name: '天魔皇',
          title: '域外天魔之主',
          era: 'era_ancient',
          cultivation: '魔帝境·半步圣人',
          achievements: ['率领天魔大军入侵', '与青云仙尊大战'],
          legacy: '天魔传承',
          status: 'sealed',
          artifacts: ['天魔珠', '天魔幡'],
          techniques: ['天魔功', '天魔神通']
        }
      ],
      cultivationLevel: '修炼体系完善，境界划分统一',
      spiritualDensity: 5,
      majorChanges: ['仙道体系确立', '宗门建立', '天魔入侵', '上古大战', '青云陨落']
    },
    {
      id: 'era_medieval',
      name: '中古纪',
      startYear: -10000,
      endYear: -1000,
      description: `上古大战后的恢复期，修仙文明开始重建。这一时期，新的势力崛起，旧的传承逐渐被遗忘。中古纪是修仙界的过渡时期，既有上古的余晖，也有新时代的萌芽。

中古纪初期，修仙界百废待兴。无数宗门在上古大战中覆灭，幸存的宗门开始重建。五大宗门联合，建立了新的秩序。

中古纪中期，魔道势力崛起。血魔老祖创立血魔宗，幽冥教主创立幽冥教，万毒仙姑创立万毒门。正魔两道开始对立。

中古纪后期，凡人国度建立。修士开始介入凡俗事务，国运与修仙开始关联。大夏王朝、大周王朝、大秦王朝相继建立。`,
      majorEvents: [
        {
          id: 'event_rebuild',
          name: '百废待兴',
          year: -9500,
          description: '上古大战后，修仙界开始重建，新的秩序逐渐形成。',
          consequences: ['新宗门建立', '资源重新分配', '修仙界逐渐恢复', '五大宗门联盟'],
          relatedFigures: ['重建者联盟', '五大宗门掌门'],
          significance: 'major',
          affectedRegions: ['整个青云大陆'],
          lastingEffects: ['新秩序建立', '五大宗门联盟']
        },
        {
          id: 'event_five_sects',
          name: '五大宗门',
          year: -8000,
          description: '五大宗门崛起，成为修仙界的主导力量。青云宗、玄天宗、万剑门、丹霞谷、御兽山并称五大宗门。',
          consequences: ['修仙界秩序稳定', '散修地位下降', '资源垄断加剧', '宗门争斗减少'],
          relatedFigures: ['五大宗门掌门'],
          significance: 'major',
          affectedRegions: ['中州大陆'],
          lastingEffects: ['五大宗门体系延续至今']
        },
        {
          id: 'event_demon_sect',
          name: '魔道兴起',
          year: -6000,
          description: `魔道修士开始崛起，与正道势力分庭抗礼。

血魔老祖创立血魔宗，修炼血魔功，以血为祭，威力惊人。
幽冥教主创立幽冥教，修炼幽冥功，操控亡魂，阴森恐怖。
万毒仙姑创立万毒门，修炼万毒功，以毒攻敌，防不胜防。

魔道势力的崛起，打破了正道一统的局面，形成了正魔对立的格局。`,
          consequences: ['正魔对立形成', '修仙界再次动荡', '新的平衡建立', '魔道传承流传'],
          relatedFigures: ['血魔老祖', '幽冥教主', '万毒仙姑'],
          significance: 'major',
          affectedRegions: ['魔域', '整个青云大陆'],
          lastingEffects: ['正魔对立延续至今'],
          relatedTechniques: ['血魔功', '幽冥功', '万毒功']
        },
        {
          id: 'event_second_invasion',
          name: '第二次天魔入侵',
          year: -4000,
          description: '天魔封印松动，域外天魔再次入侵。正魔两道联手抗敌，最终加固封印。',
          consequences: ['正魔联手抗敌', '封印加固', '修仙界再次元气大伤', '天魔传承流传'],
          relatedFigures: ['天魔将', '正魔联盟', '封印守护者'],
          significance: 'epochal',
          affectedRegions: ['魔域', '青云山'],
          lastingEffects: ['封印加固', '正魔关系缓和']
        },
        {
          id: 'event_nations',
          name: '凡人国度',
          year: -2500,
          description: `凡人国度开始建立，修士开始介入凡俗事务。

大夏王朝建立，延续千年，后为大商所灭。
大商王朝建立，延续六百年，后为大周所灭。
大周王朝建立，延续八百年，分封诸侯，后分裂为春秋战国。
大秦王朝统一六国，建立大一统王朝，延续至今。

凡人国度与修仙界的关系复杂，既有合作也有冲突。修士在凡人国度中享有特权，但也受到一定的约束。`,
          consequences: ['修仙者成为凡人眼中的仙', '国运与修仙开始关联', '新的资源获取方式出现', '凡人修士增多'],
          relatedFigures: ['大夏王', '大商王', '大周王', '大秦王'],
          significance: 'major',
          affectedRegions: ['中州大陆', '凡人国度'],
          lastingEffects: ['凡人国度与修仙界关系确立']
        },
        {
          id: 'event_treasure_emerge',
          name: '宝物涌现',
          year: -2000,
          description: '上古遗迹频繁现世，大量宝物流入修仙界。散修崛起，宗门控制力下降。',
          consequences: ['散修崛起', '宗门控制力下降', '新的势力出现', '争夺宝物的冲突增多'],
          relatedFigures: ['各路探险者', '遗迹守护者'],
          significance: 'major',
          affectedRegions: ['整个青云大陆'],
          lastingEffects: ['散修地位提升', '宗门控制力下降']
        }
      ],
      characteristics: ['秩序重建', '新势力崛起', '正魔对立', '凡人国度', '宗门垄断', '散修崛起'],
      notableFigures: [
        {
          id: 'figure_xuemo_laozu',
          name: '血魔老祖',
          title: '血魔宗创始人',
          era: 'era_medieval',
          cultivation: '大乘期·魔道巅峰',
          achievements: ['创立血魔宗', '创造血魔功', '与正道对抗'],
          legacy: '血魔传承',
          status: 'deceased',
          techniques: ['血魔功', '血海神通', '血祭大法']
        },
        {
          id: 'figure_youming_jiaozhu',
          name: '幽冥教主',
          title: '幽冥教创始人',
          era: 'era_medieval',
          cultivation: '大乘期·魔道巅峰',
          achievements: ['创立幽冥教', '创造幽冥功', '操控亡魂'],
          legacy: '幽冥传承',
          status: 'deceased',
          techniques: ['幽冥功', '亡魂操控', '幽冥领域']
        },
        {
          id: 'figure_wandu_xiangu',
          name: '万毒仙姑',
          title: '万毒门创始人',
          era: 'era_medieval',
          cultivation: '大乘期·魔道巅峰',
          achievements: ['创立万毒门', '创造万毒功', '炼制万毒'],
          legacy: '万毒传承',
          status: 'deceased',
          techniques: ['万毒功', '毒蛊之术', '万毒领域']
        }
      ],
      cultivationLevel: '修炼体系成熟，正魔分立',
      spiritualDensity: 3,
      majorChanges: ['秩序重建', '魔道兴起', '天魔入侵', '凡人国度建立']
    },
    {
      id: 'era_recent',
      name: '近古纪',
      startYear: -1000,
      endYear: 0,
      description: `距离现在最近的古代时期，许多传说和遗迹都来自这个时代。近古纪的修仙界相对稳定，但暗流涌动，为后来的变局埋下了伏笔。

近古纪初期，青云令现世，引发修仙界震动。无数势力争夺青云令，但最终不知所踪。

近古纪中期，正魔两道爆发大规模冲突，持续百年。双方损失惨重，许多宗门覆灭。

近古纪后期，天地异象频发，灵气开始稀薄。修士们发现，飞升之路似乎已经断绝。`,
      majorEvents: [
        {
          id: 'event_qingyun_token',
          name: '青云令现世',
          year: -800,
          description: '失踪万年的青云令突然现世，引发修仙界震动。青云令是青云传承的钥匙，据说可以开启青云仙尊的传承秘境。',
          consequences: ['无数势力争夺', '青云宗地位动摇', '新的传承线索出现', '修仙界动荡'],
          relatedFigures: ['青云宗', '各路势力'],
          significance: 'major',
          affectedRegions: ['整个青云大陆'],
          lastingEffects: ['青云传承成为焦点', '青云令再次失踪']
        },
        {
          id: 'event_demon_sect_war',
          name: '正魔大战',
          year: -500,
          description: '正魔两道爆发大规模冲突，持续百年。双方损失惨重，许多宗门覆灭。',
          consequences: ['双方损失惨重', '许多宗门覆灭', '新的平衡建立', '正魔关系恶化'],
          relatedFigures: ['正道联盟', '魔道联盟'],
          significance: 'epochal',
          affectedRegions: ['整个青云大陆'],
          lastingEffects: ['正魔关系持续紧张']
        },
        {
          id: 'event_treasure_appear',
          name: '宝物出世',
          year: -300,
          description: '上古遗迹频繁现世，大量宝物流入修仙界。散修崛起，宗门控制力下降。',
          consequences: ['散修崛起', '宗门控制力下降', '新的势力出现', '争夺宝物的冲突增多'],
          relatedFigures: ['各路探险者', '遗迹守护者'],
          significance: 'major',
          affectedRegions: ['整个青云大陆'],
          lastingEffects: ['散修地位提升']
        },
        {
          id: 'event_calamity',
          name: '天地大劫',
          year: -100,
          description: '天地间出现异象，灵气开始稀薄。修士们发现，飞升之路似乎已经断绝。',
          consequences: ['修炼难度增加', '飞升者减少', '修仙界开始恐慌', '新的修炼方式出现'],
          relatedFigures: ['天道', '各大势力'],
          significance: 'epochal',
          affectedRegions: ['整个青云大陆'],
          lastingEffects: ['灵气持续稀薄', '飞升之路断绝']
        }
      ],
      characteristics: ['相对稳定', '暗流涌动', '遗迹现世', '灵气稀薄', '飞升断绝', '传承分散'],
      notableFigures: [
        {
          id: 'figure_recent_heroes',
          name: '近古英杰',
          title: '近古纪杰出修士',
          era: 'era_recent',
          cultivation: '各不相同',
          achievements: ['争夺青云令', '正魔大战', '探索遗迹'],
          legacy: '近古传承',
          status: 'mixed'
        }
      ],
      cultivationLevel: '修炼体系成熟，但灵气稀薄',
      spiritualDensity: 2,
      majorChanges: ['青云令现世', '正魔大战', '天地大劫']
    },
    {
      id: 'era_current',
      name: '当世纪',
      startYear: 0,
      endYear: 8472,
      description: `当前的纪元，修仙界正处于变革的前夜。天地灵气持续稀薄，但新的机缘也在不断出现。青云令的传说再次流传，预示着新的变局即将到来。

当世纪初期，天地大劫过后，新的纪元开始。修仙界重新洗牌，新的规则建立。

当世纪中期，许多古老宗门因资源匮乏而衰落，散修数量增加。新的修炼方式开始出现，与传统仙道分庭抗礼。

当世纪后期，青云令将再次现世的传闻开始流传。修仙界开始躁动，各势力暗中布局，新的争夺即将开始。`,
      majorEvents: [
        {
          id: 'event_current_start',
          name: '新纪元开启',
          year: 0,
          description: '天地大劫过后，新的纪元开始。修仙界重新洗牌，新的规则建立。',
          consequences: ['修仙界重新洗牌', '新的规则建立', '飞升之路断绝', '灵气持续稀薄'],
          relatedFigures: ['幸存者', '新势力'],
          significance: 'epochal',
          affectedRegions: ['整个青云大陆'],
          lastingEffects: ['新纪元开始']
        },
        {
          id: 'event_sect_decline',
          name: '宗门衰落',
          year: 2000,
          description: '许多古老宗门因资源匮乏而衰落，散修数量增加。',
          consequences: ['散修数量增加', '宗门控制力下降', '新的修炼方式出现', '资源争夺加剧'],
          relatedFigures: ['衰落宗门', '新兴势力'],
          significance: 'major',
          affectedRegions: ['整个青云大陆'],
          lastingEffects: ['宗门体系动摇']
        },
        {
          id: 'event_new_way',
          name: '新道兴起',
          year: 4000,
          description: '新的修炼方式开始出现，与传统仙道分庭抗礼。',
          consequences: ['修炼体系多元化', '传统宗门受到冲击', '新的势力崛起', '修炼界分化'],
          relatedFigures: ['新道修士', '传统宗门'],
          significance: 'major',
          affectedRegions: ['整个青云大陆'],
          lastingEffects: ['修炼体系多元化']
        },
        {
          id: 'event_token_rumor',
          name: '令牌传闻',
          year: 8000,
          description: '青云令将再次现世的传闻开始流传。修仙界开始躁动，各势力暗中布局。',
          consequences: ['修仙界开始躁动', '各势力暗中布局', '新的争夺即将开始', '青云宗地位提升'],
          relatedFigures: ['青云宗', '各路势力'],
          significance: 'major',
          affectedRegions: ['整个青云大陆'],
          lastingEffects: ['修仙界动荡']
        },
        {
          id: 'event_player_start',
          name: '传承开启',
          year: 8472,
          description: '玩家在青云村醒来，开始修仙之旅。新的传承者出现，青云令之谜即将揭开。',
          consequences: ['新的传承者出现', '青云令之谜即将揭开', '修仙界将迎来巨变'],
          relatedFigures: ['玩家', '青云仙尊传承'],
          significance: 'epochal',
          affectedRegions: ['青云村', '青云山'],
          lastingEffects: ['新的传说开始']
        }
      ],
      characteristics: ['灵气稀薄', '变革前夜', '机缘涌现', '传承现世', '宗门衰落', '散修崛起'],
      notableFigures: [
        {
          id: 'figure_current_masters',
          name: '当世大能',
          title: '当世纪杰出修士',
          era: 'era_current',
          cultivation: '各不相同',
          achievements: ['维持修仙界秩序', '探索新的修炼方式', '争夺传承'],
          legacy: '当世传承',
          status: 'alive'
        }
      ],
      cultivationLevel: '修炼体系成熟但灵气稀薄，新道兴起',
      spiritualDensity: 1.5,
      majorChanges: ['新纪元开启', '宗门衰落', '新道兴起', '传承现世']
    }
  ]
}

export const worldRegions: WorldRegion[] = [
  {
    id: 'region_central',
    name: '中州大陆',
    type: 'continent',
    description: `青云大陆的核心区域，也是修仙文明最发达的地区。这里宗门林立，灵脉众多，是无数修士向往的圣地。中州大陆地势平坦，气候温和，灵气密度是其他地区的数倍。

中州大陆是五大宗门的所在地，也是凡人国度最密集的区域。这里汇聚了修仙界最顶尖的资源、最强大的势力、最丰富的传承。

中州大陆分为九大州：青云州、玄天州、万剑州、丹霞州、御兽州、天元州、星辰州、灵州、凡州。每个州都有其独特的特点和势力分布。`,
    area: 5000000,
    climate: '四季分明，温和宜人',
    spiritDensity: 1.5,
    majorPowers: ['青云宗', '玄天宗', '万剑门', '丹霞谷', '御兽山'],
    notableLocations: ['青云山', '玄天城', '万剑峰', '丹霞山脉', '御兽平原', '天元城', '星辰海', '灵族领地', '凡人国度'],
    history: '自上古以来便是修仙界的中心，见证了无数大能的崛起与陨落',
    dangers: ['宗门争斗', '散修劫掠', '上古遗迹中的禁制', '妖兽入侵', '魔修渗透'],
    resources: ['灵石矿脉', '灵草园', '灵兽栖息地', '上古传承', '仙材', '灵矿'],
    population: 1000000000,
    governance: '五大宗门联盟主导，凡人国度自治',
    specialFeatures: ['灵气最充沛', '资源最丰富', '势力最集中', '传承最完整'],
    connectedRegions: ['北荒原', '南疆密林', '东海群岛', '西域荒漠'],
    ancientNames: ['中土', '神州', '仙域核心']
  },
  {
    id: 'region_northern',
    name: '北荒原',
    type: 'continent',
    description: `位于青云大陆北部的广袤荒原，气候严寒，生存环境恶劣。这里是妖兽的乐园，也是散修和亡命之徒的聚集地。北荒原虽然荒凉，却蕴藏着丰富的资源和上古遗迹。

北荒原分为三大区域：冰封区、雪域区、极寒区。冰封区终年冰封，是冰属性妖兽的栖息地；雪域区风雪交加，是雪域宗的领地；极寒区是北荒原最危险的区域，只有大能才能进入。

北荒原深处隐藏着巫族的遗迹，据说有巫族传承留存。但巫族遗迹周围有强大的禁制，只有拥有巫族血脉的人才能进入。`,
    area: 8000000,
    climate: '终年严寒，风雪交加',
    spiritDensity: 0.8,
    majorPowers: ['北荒联盟', '冰原宗', '雪域门', '巫族残部'],
    notableLocations: ['冰封谷', '雪域高原', '北荒古城', '极寒深渊', '巫族神殿', '冰龙巢穴', '极光之地'],
    history: '上古时期是巫族的领地，巫族陨落后成为妖兽和散修的天下',
    dangers: ['高阶妖兽', '极端天气', '上古巫族禁制', '散修劫掠者', '冰封魔物', '极寒风暴'],
    resources: ['冰属性灵材', '妖兽材料', '巫族传承', '极寒灵矿', '冰晶', '雪莲'],
    population: 100000000,
    governance: '北荒联盟主导，散修自治',
    specialFeatures: ['冰属性资源丰富', '巫族遗迹众多', '妖兽强大', '散修聚集'],
    connectedRegions: ['中州大陆', '青云山脉'],
    ancientNames: ['北冥', '寒荒', '巫域']
  },
  {
    id: 'region_southern',
    name: '南疆密林',
    type: 'continent',
    description: `位于青云大陆南部的原始森林，毒虫猛兽遍布，瘴气弥漫。这里是苗疆蛊术的发源地，也是无数毒修和蛊修的圣地。南疆密林深处隐藏着上古时期的秘密。

南疆密林分为五大区域：万毒谷、蛊神山、苗疆古城、瘴海、妖族封印。万毒谷是毒修的圣地，蛊神山是蛊修的圣地，苗疆古城是苗疆人的聚居地，瘴海是南疆最危险的区域，妖族封印是上古时期封印妖族大能的地方。

南疆密林中生活着苗疆人，他们擅长蛊术和毒术，与外界交流较少。苗疆人有自己的语言和文化，不服从凡人国度的管辖。`,
    area: 6000000,
    climate: '湿热多雨，瘴气弥漫',
    spiritDensity: 1.2,
    majorPowers: ['五毒教', '苗疆蛊宗', '南疆联盟', '苗疆部落'],
    notableLocations: ['万毒谷', '蛊神山', '苗疆古城', '瘴海', '妖族封印', '毒龙潭', '蛊虫园'],
    history: '上古时期是妖族的重要领地，妖族陨落后成为蛊修和毒修的天下',
    dangers: ['剧毒生物', '瘴气', '蛊虫', '上古妖族禁制', '毒雾', '蛊虫群'],
    resources: ['毒草', '蛊虫', '妖族传承', '毒属性灵矿', '蛊材', '毒液'],
    population: 80000000,
    governance: '苗疆部落自治，蛊宗毒教主导',
    specialFeatures: ['毒属性资源丰富', '蛊术传承完整', '妖族遗迹众多', '瘴气弥漫'],
    connectedRegions: ['中州大陆', '东海群岛'],
    ancientNames: ['南蛮', '毒域', '妖林']
  },
  {
    id: 'region_eastern',
    name: '东海群岛',
    type: 'ocean',
    description: `位于青云大陆东部的无尽海域，由无数岛屿组成。这里是海族的领地，也是水属性修士的圣地。东海深处隐藏着上古龙族的遗迹。

东海群岛分为四大区域：外海、内海、深海、龙域。外海是普通海兽的栖息地，内海是海族的聚居地，深海是高阶海兽的领地，龙域是上古龙族的遗迹。

东海群岛中最大的岛屿是蓬莱仙岛，传说是上古仙人的居所。蓬莱仙岛上有仙气缭绕，是修士向往的圣地。但蓬莱仙岛周围有强大的禁制，只有机缘深厚的人才能进入。`,
    area: 10000000,
    climate: '海洋性气候，多风暴',
    spiritDensity: 1.0,
    majorPowers: ['东海龙宫', '蓬莱仙岛', '瀛洲宗', '海族联盟'],
    notableLocations: ['龙宫遗址', '蓬莱仙岛', '瀛洲岛', '无尽海渊', '海兽巢穴', '珊瑚林', '海底遗迹'],
    history: '上古时期是龙族的领地，龙族陨落后成为海族和散修的天下',
    dangers: ['海兽', '风暴', '龙族禁制', '深海压力', '海妖', '漩涡'],
    resources: ['海中灵材', '龙族传承', '深海灵矿', '海兽材料', '珍珠', '珊瑚'],
    population: 50000000,
    governance: '海族联盟主导，龙宫遗族自治',
    specialFeatures: ['水属性资源丰富', '龙族遗迹众多', '海族势力强大', '仙岛神秘'],
    connectedRegions: ['中州大陆', '南疆密林'],
    ancientNames: ['东海', '龙域', '仙海']
  },
  {
    id: 'region_western',
    name: '西域荒漠',
    type: 'continent',
    description: `位于青云大陆西部的广袤荒漠，黄沙漫天，生存环境极其恶劣。这里是佛修的圣地，也是无数苦行僧的修行之地。西域荒漠深处隐藏着上古佛门的秘密。

西域荒漠分为三大区域：流沙区、佛光区、禁区。流沙区是普通荒漠，有流沙河穿过；佛光区是大雷音寺的领地，佛光普照；禁区是西域最危险的区域，有上古佛门禁制。

西域荒漠中生活着佛修，他们修炼佛法，追求涅槃。佛修与道修不同，他们不追求长生，而是追求超脱轮回。佛修的实力不容小觑，大雷音寺的主持是大乘期圆满的高手。`,
    area: 7000000,
    climate: '干旱少雨，昼夜温差极大',
    spiritDensity: 0.7,
    majorPowers: ['大雷音寺', '西域佛国', '苦行宗', '沙漠联盟'],
    notableLocations: ['雷音寺', '佛光山', '流沙河', '荒漠古城', '佛门遗迹', '沙暴区', '绿洲'],
    history: '上古时期是佛门的领地，佛门陨落后成为佛修的天下',
    dangers: ['沙暴', '佛门禁制', '荒漠妖兽', '流沙陷阱', '佛光灼烧', '心魔'],
    resources: ['佛门传承', '荒漠灵材', '沙属性灵矿', '上古佛器', '舍利', '佛珠'],
    population: 60000000,
    governance: '大雷音寺主导，佛国自治',
    specialFeatures: ['佛门传承完整', '荒漠资源独特', '佛修聚集', '心魔考验'],
    connectedRegions: ['中州大陆', '魔域'],
    ancientNames: ['西天', '佛域', '沙海']
  },
  {
    id: 'region_demon',
    name: '魔域',
    type: 'continent',
    description: `位于青云大陆边缘的神秘区域，被强大的禁制与外界隔绝。这里是魔修的圣地，也是正道修士的禁地。魔域深处隐藏着上古魔族的秘密。

魔域分为五大区域：血池、幽冥深渊、万毒山、炼魂谷、天魔封印。血池是血魔宗的领地，幽冥深渊是幽冥教的领地，万毒山是万毒门的领地，炼魂谷是炼魂宗的领地，天魔封印是封印天魔皇的地方。

魔域中的灵气被魔气污染，不适合正道修士修炼。但魔修可以在魔域中如鱼得水，修炼速度极快。魔域中的资源也很独特，有许多正道没有的魔道材料。`,
    area: 4000000,
    climate: '阴暗潮湿，魔气弥漫',
    spiritDensity: -0.5,
    majorPowers: ['血魔宗', '幽冥教', '万毒门', '炼魂宗', '天魔遗族'],
    notableLocations: ['血池', '幽冥深渊', '万毒山', '炼魂谷', '天魔封印', '魔殿', '魔矿'],
    history: '上古时期是魔族的领地，魔族陨落后成为魔修的天下',
    dangers: ['魔气侵蚀', '魔修追杀', '上古魔族禁制', '心魔', '魔兽', '血煞'],
    resources: ['魔道传承', '魔属性灵材', '魔器材料', '灵魂之力', '魔晶', '血精'],
    population: 30000000,
    governance: '四大魔宗联盟主导',
    specialFeatures: ['魔气浓郁', '魔道传承完整', '魔修聚集', '天魔封印'],
    connectedRegions: ['西域荒漠', '中州大陆'],
    ancientNames: ['魔界', '血域', '幽冥']
  },
  {
    id: 'region_qingyun_mountain',
    name: '青云山脉',
    type: 'continent',
    description: `青云大陆最著名的山脉，因青云仙尊而得名。山脉绵延万里，主峰直插云霄。这里是青云宗的所在地，也是无数修士向往的圣地。山脉深处隐藏着青云仙尊的传承秘境。

青云山脉分为三大区域：外围、内围、核心区。外围是青云宗弟子的修炼地，内围是青云宗长老的闭关地，核心区是青云仙尊的传承秘境。

青云山脉中有青云大阵守护，非青云宗弟子闯入会被攻击。但据说有隐秘的通道可以进入，只是需要机缘。`,
    area: 800000,
    climate: '高山气候，四季分明',
    spiritDensity: 3.0,
    majorPowers: ['青云宗'],
    notableLocations: ['青云宗', '青云峰', '云海', '龙潭', '仙台', '隐秘洞府', '灵脉'],
    history: '青云仙尊陨落之地，也是青云宗的创立之地',
    dangers: ['云兽', '青云大阵', '上古禁制', '高阶妖兽', '灵气风暴'],
    resources: ['云属性灵材', '灵晶', '仙铁矿', '青云传承', '云灵草', '仙气'],
    population: 500000,
    governance: '青云宗完全控制',
    specialFeatures: ['灵气最浓郁', '青云传承所在地', '青云宗总部', '仙尊遗迹'],
    connectedRegions: ['中州大陆', '北荒原'],
    ancientNames: ['青云仙境', '仙尊山', '云海山']
  },
  {
    id: 'region_secret_realms',
    name: '秘境空间',
    type: 'secret_realm',
    description: `散布在青云大陆各处的独立空间，由上古大能开辟。这些秘境中蕴含着珍贵的传承和资源，但同时也充满了危险。

秘境分为不同等级：凡级秘境、灵级秘境、仙级秘境、神级秘境。凡级秘境适合炼气期修士探索，灵级秘境适合筑基期和结丹期修士探索，仙级秘境适合元婴期及以上修士探索，神级秘境只有大能才能进入。

秘境的开启时间各不相同，有的常年开放，有的定期开启，有的需要特定条件才能开启。秘境中的时间流速与外界不同，有的快，有的慢。`,
    area: 0,
    climate: '各不相同',
    spiritDensity: 5.0,
    majorPowers: ['无固定势力'],
    notableLocations: ['青云传承秘境', '龙族秘境', '巫族秘境', '妖族秘境', '佛门秘境', '魔道秘境', '上古战场秘境'],
    history: '由上古大能开辟，蕴含着珍贵的传承',
    dangers: ['禁制', '妖兽', '心魔', '空间裂缝', '时间乱流', '传承守护者'],
    resources: ['上古传承', '仙材', '仙器', '仙丹', '神材', '神器