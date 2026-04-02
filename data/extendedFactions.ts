import { Nation, Faction, GovernmentInfo, TerritoryInfo, MilitaryInfo, EconomyInfo, CultureInfo, RelationInfo, LeadershipInfo, MemberInfo, InfluenceInfo, FactionRelation } from './factions'

export interface ExtendedNation extends Nation {
  dynasties?: DynastyInfo[]
  royalFamily?: RoyalFamilyInfo
  cultivationTradition?: string
  secretForces?: string[]
  hiddenMasters?: string[]
  nationalTreasures?: string[]
  guardianBeasts?: string[]
  specialResources?: string[]
  historicalEvents?: string[]
  internalConflicts?: string[]
  externalThreats?: string[]
}

export interface DynastyInfo {
  name: string
  founder: string
  foundingYear: number
  fallYear?: number
  duration: number
  majorAchievements: string[]
  downfallReason?: string
  notableEmperors: string[]
}

export interface RoyalFamilyInfo {
  name: string
  ancestor: string
  bloodline: string
  currentPatriarch: string
  members: number
  cultivationLevel: string
  specialAbilities: string[]
  secrets: string[]
  internalFactions: string[]
}

export interface ExtendedFaction extends Faction {
  subFactions?: ExtendedFaction[]
  cultivationMethods?: string[]
  secretTechniques?: string[]
  forbiddenTechniques?: string[]
  guardianBeasts?: string[]
  sacredTreasures?: string[]
  ancestralLand?: string
  founder?: string
  foundingYear?: number
  goldenAge?: string
  declineReason?: string
  currentCrisis?: string[]
  hiddenAgenda?: string[]
  internalFactions?: InternalFaction[]
  externalAlliances?: string[]
  secretEnemies?: string[]
  historicalFigures?: string[]
  legendaryArtifacts?: string[]
  forbiddenAreas?: string[]
  uniqueResources?: string[]
  specialRules?: string[]
  initiationRitual?: string
  advancementRequirements?: string[]
  expulsionReasons?: string[]
}

export interface InternalFaction {
  name: string
  leader: string
  ideology: string
  members: number
  influence: number
  goals: string[]
  conflicts: string[]
}

export interface Sect {
  id: string
  name: string
  type: 'orthodox' | 'unorthodox' | 'neutral' | 'demonic' | 'hidden' | 'ancient'
  rank: 'first_tier' | 'second_tier' | 'third_tier' | 'fourth_tier' | 'fifth_tier' | 'legendary'
  description: string
  history: string
  location: string
  territory: string[]
  leadership: SectLeadership
  members: SectMembers
  cultivationMethods: string[]
  secretTechniques: string[]
  forbiddenTechniques: string[]
  resources: SectResources
  relations: FactionRelation[]
  specialFeatures: string[]
  secrets: string[]
  guardianBeasts: string[]
  sacredTreasures: string[]
  ancestralLand: string
  foundingAncestor: string
  foundingYear: number
  goldenAge: string
  declineReason?: string
  currentCrisis?: string[]
  internalFactions: InternalFaction[]
  hiddenAgenda?: string[]
}

export interface SectLeadership {
  sectMaster: string
  sectMasterCultivation: string
  elders: ElderInfo[]
  grandElders: ElderInfo[]
  protectorElders: ElderInfo[]
  guestElders: ElderInfo[]
  succession: string
  sectRules: string[]
}

export interface ElderInfo {
  name: string
  cultivation: string
  responsibility: string
  faction?: string
  secrets?: string[]
}

export interface SectMembers {
  totalMembers: number
  innerDisciples: number
  outerDisciples: number
  coreDisciples: number
  trueDisciples: number
  legacyDisciples: number
  elders: number
  retiredElders: number
  servants: number
  recruitment: string
  requirements: string[]
  benefits: string[]
}

export interface SectResources {
  spiritVeins: string[]
  mines: string[]
  herbGardens: string[]
  beastFarms: string[]
  secretRealms: string[]
  annualIncome: number
  treasury: string[]
}

export interface Family {
  id: string
  name: string
  type: 'cultivation' | 'mortal' | 'royal' | 'merchant' | 'hidden' | 'ancient'
  rank: 'first_tier' | 'second_tier' | 'third_tier' | 'fourth_tier' | 'fifth_tier' | 'legendary'
  description: string
  history: string
  location: string
  territory: string[]
  leadership: FamilyLeadership
  members: FamilyMembers
  bloodline: BloodlineInfo
  resources: FamilyResources
  relations: FactionRelation[]
  specialFeatures: string[]
  secrets: string[]
  guardianBeasts: string[]
  sacredTreasures: string[]
  ancestralLand: string
  foundingAncestor: string
  foundingYear: number
  goldenAge: string
  declineReason?: string
  currentCrisis?: string[]
  internalFactions: InternalFaction[]
}

export interface FamilyLeadership {
  patriarch: string
  patriarchCultivation: string
  elders: ElderInfo[]
  matriarch?: string
  succession: string
  familyRules: string[]
}

export interface FamilyMembers {
  totalMembers: number
  directLine: number
  branchLines: number
  servants: number
  marriedIn: number
  cultivationDistribution: { [key: string]: number }
}

export interface BloodlineInfo {
  name: string
  type: string
  abilities: string[]
  purity: number
  awakeningRate: number
  specialFeatures: string[]
}

export interface FamilyResources {
  properties: string[]
  businesses: string[]
  mines: string[]
  spiritVeins: string[]
  annualIncome: number
  treasury: string[]
}

export interface Alliance {
  id: string
  name: string
  type: 'sect_alliance' | 'family_alliance' | 'nation_alliance' | 'merchant_alliance' | 'cultivation_alliance'
  rank: 'first_tier' | 'second_tier' | 'third_tier' | 'legendary'
  description: string
  history: string
  leadership: AllianceLeadership
  members: AllianceMember[]
  resources: AllianceResources
  relations: FactionRelation[]
  specialFeatures: string[]
  secrets: string[]
  foundingYear: number
  purpose: string
  rules: string[]
}

export interface AllianceLeadership {
  allianceMaster: string
  viceMasters: string[]
  council: string[]
  decisionMaking: string
}

export interface AllianceMember {
  name: string
  type: string
  contribution: number
  benefits: string[]
  obligations: string[]
}

export interface AllianceResources {
  sharedTerritories: string[]
  sharedResources: string[]
  jointVentures: string[]
  annualContribution: number
}

export const extendedNations: ExtendedNation[] = [
  {
    id: 'nation_daxia',
    name: '大夏王朝',
    type: 'mortal_kingdom',
    description: `青云大陆最古老的凡人王朝之一，历史悠久，文化灿烂。大夏王朝虽然以凡人为主，但皇室拥有修士血脉，与各大宗门关系密切。王朝境内灵气充沛，是修士与凡人共存的典范。

大夏王朝建立于上古纪元末期，由夏氏先祖夏禹创立。传说夏禹曾得到上古大能的指点，学会了治理水患的方法，因此被推举为王。

王朝建立后，夏氏一族与青云宗建立了深厚的友谊，历代皇帝都会送子弟入青云宗修行。这种关系使得大夏王朝在凡人国度中地位超然。`,
    history: `大夏王朝建立于上古纪元末期，由夏氏先祖夏禹创立。传说夏禹曾得到上古大能的指点，学会了治理水患的方法，因此被推举为王。

王朝建立后，夏氏一族与青云宗建立了深厚的友谊，历代皇帝都会送子弟入青云宗修行。这种关系使得大夏王朝在凡人国度中地位超然。

中古纪元时期，大夏王朝曾经历过一次亡国危机，但在青云宗的帮助下成功复国。此后，大夏王朝更加重视与修仙界的关系，成为了凡人与修士沟通的桥梁。

近古纪元以来，大夏王朝逐渐衰落，但仍然保持着强大的影响力。现任皇帝夏明德是一位有为之君，正在努力振兴王朝。`,
    government: {
      type: '君主制',
      ruler: '夏明德',
      rulingFamily: '夏氏皇族',
      officials: [
        { title: '丞相', name: '李文正', responsibility: '处理朝政', cultivation: '筑基初期' },
        { title: '大将军', name: '赵铁山', responsibility: '统领军队', cultivation: '筑基中期' },
        { title: '国师', name: '玄机子', responsibility: '修仙事务', cultivation: '结丹初期' },
        { title: '户部尚书', name: '王守正', responsibility: '财政税收', cultivation: '炼气十层' },
        { title: '礼部尚书', name: '周文华', responsibility: '外交礼仪', cultivation: '炼气九层' }
      ],
      laws: [
        '修士不得随意伤害凡人',
        '凡人不得擅闯修仙禁地',
        '宗门争斗不得波及凡人城池',
        '皇室拥有修士血脉，享有特殊地位',
        '凡人犯罪由凡人律法处置，修士犯罪由宗门处置'
      ]
    },
    territory: {
      regions: ['region_central_plains'],
      cities: ['夏都', '青云城', '玄天城', '丹霞城', '万剑城'],
      area: 500000,
      borders: [
        { with: 'nation_dazhou', type: 'open', description: '与大周王朝关系友好，边境开放贸易' },
        { with: 'nation_daqin', type: 'contested', description: '与大秦王朝存在领土争议' },
        { with: 'region_northern_wasteland', type: 'fortified', description: '与北荒原接壤，建有长城防御妖兽' }
      ]
    },
    population: 50000000,
    military: {
      totalStrength: 500000,
      cultivators: 5000,
      mortalSoldiers: 495000,
      eliteUnits: ['御林军', '神机营', '龙骑军', '修士卫队'],
      defenses: ['夏都城墙', '北境长城', '护国大阵', '灵炮阵地']
    },
    economy: {
      currency: '夏币',
      mainIndustries: ['农业', '手工业', '矿业', '贸易'],
      tradePartners: ['nation_dazhou', 'nation_daqin', 'sect_qingyun', 'sect_xuantian'],
      resources: ['粮食', '铁矿', '丝绸', '瓷器', '灵石矿'],
      taxRate: 0.1
    },
    culture: {
      mainBelief: '道教与儒家并存',
      festivals: ['春节', '元宵节', '清明节', '端午节', '中秋节', '重阳节', '祭祖大典'],
      customs: ['尊师重道', '孝道为先', '科举取士', '宗族制度'],
      education: '设有国子监和各级书院，凡人可科举入仕'
    },
    relations: [
      { target: 'sect_qingyun', type: 'ally', description: '世代交好，皇室子弟可入宗门修行', history: '自王朝建立以来就是盟友' },
      { target: 'nation_dazhou', type: 'ally', description: '联姻关系，边境开放', history: '近百年建立的联盟' },
      { target: 'nation_daqin', type: 'enemy', description: '领土争端，时有冲突', history: '千年前因边界问题结怨' },
      { target: 'sect_demon', type: 'enemy', description: '正邪对立，水火不容', history: '魔修多次入侵王朝' }
    ],
    specialFeatures: ['皇室修士血脉', '与青云宗的特殊关系', '北境长城', '护国大阵', '科举制度'],
    dynasties: [
      {
        name: '夏朝',
        founder: '夏禹',
        foundingYear: -3000,
        duration: 500,
        majorAchievements: ['治理水患', '建立王朝', '与青云宗结盟'],
        notableEmperors: ['夏禹', '夏启', '夏桀']
      },
      {
        name: '复夏王朝',
        founder: '夏复国',
        foundingYear: -2000,
        duration: 1000,
        majorAchievements: ['复国成功', '建立科举制度', '修建北境长城'],
        notableEmperors: ['夏复国', '夏明德']
      }
    ],
    royalFamily: {
      name: '夏氏皇族',
      ancestor: '夏禹',
      bloodline: '帝皇血脉',
      currentPatriarch: '夏明德',
      members: 500,
      cultivationLevel: '筑基期至结丹期',
      specialAbilities: ['帝王之气', '国运加身', '天命护体'],
      secrets: ['祖传秘宝', '皇室密库', '先祖传承'],
      internalFactions: ['太子党', '皇子党', '保守派', '改革派']
    },
    cultivationTradition: '皇室子弟自幼修炼，成年后送入青云宗深造',
    secretForces: ['暗卫', '锦衣卫', '修士卫队', '影杀组'],
    hiddenMasters: ['皇室老祖', '护国真人', '隐世太傅'],
    nationalTreasures: ['人皇印', '夏禹剑', '护国大阵', '传国玉玺'],
    guardianBeasts: ['护国神龙', '镇国白虎', '祥瑞麒麟'],
    specialResources: ['皇室灵田', '御用药园', '禁地矿脉'],
    historicalEvents: ['夏禹治水', '复国之战', '北境大捷', '科举创立'],
    internalConflicts: ['太子之争', '改革派与保守派之争'],
    externalThreats: ['大秦入侵', '妖兽潮', '魔修渗透']
  },
  {
    id: 'nation_dazhou',
    name: '大周王朝',
    type: 'mortal_kingdom',
    description: `青云大陆最强大的凡人王朝，国力鼎盛，疆域辽阔。大周王朝以武立国，军队强大，与各大宗门保持着微妙的平衡关系。

大周王朝建立于中古纪元中期，由周氏先祖周武王创立。周武王原本是一名散修，后因机缘巧合获得了上古传承，实力大增。`,
    history: `大周王朝建立于中古纪元中期，由周氏先祖周武王创立。周武王原本是一名散修，后因机缘巧合获得了上古传承，实力大增。

周武王凭借强大的实力，统一了中州平原的大部分地区，建立了大周王朝。王朝建立后，周武王制定了"以武立国，以法治国"的方针，使得大周王朝迅速强大。

中古纪元后期，大周王朝曾与魔道势力发生大规模战争，最终在各大宗门的帮助下取得胜利。这场战争使得大周王朝与正道宗门建立了深厚的友谊。

近古纪元以来，大周王朝逐渐成为青云大陆最强大的凡人王朝，但其与修仙界的关系也变得更加复杂。`,
    government: {
      type: '君主制',
      ruler: '周天威',
      rulingFamily: '周氏皇族',
      officials: [
        { title: '丞相', name: '张居正', responsibility: '处理朝政', cultivation: '筑基后期' },
        { title: '大将军', name: '霍去病', responsibility: '统领军队', cultivation: '结丹初期' },
        { title: '国师', name: '天机子', responsibility: '修仙事务', cultivation: '结丹中期' }
      ],
      laws: [
        '修士不得随意干涉凡人事务',
        '凡人犯罪一律按律法处置',
        '宗门不得在王朝境内私自收徒',
        '皇室拥有最高裁决权',
        '军队独立于宗门体系之外'
      ]
    },
    territory: {
      regions: ['region_central_plains', 'region_western_desert'],
      cities: ['周都', '天威城', '武安城', '边境要塞', '西域都护府'],
      area: 800000,
      borders: [
        { with: 'nation_daxia', type: 'open', description: '联姻关系，边境开放' },
        { with: 'nation_daqin', type: 'fortified', description: '敌对关系，边境重兵把守' }
      ]
    },
    population: 80000000,
    military: {
      totalStrength: 1000000,
      cultivators: 10000,
      mortalSoldiers: 990000,
      eliteUnits: ['天威军', '武安军', '铁骑军', '修士军团'],
      defenses: ['周都城墙', '边境要塞群', '护国大阵', '天雷阵']
    },
    economy: {
      currency: '周币',
      mainIndustries: ['农业', '军事工业', '矿业', '贸易'],
      tradePartners: ['nation_daxia', 'sect_wanjian', 'sect_danxia'],
      resources: ['粮食', '铁矿', '兵器', '战马', '灵石矿'],
      taxRate: 0.15
    },
    culture: {
      mainBelief: '武道与法家思想',
      festivals: ['春节', '武道大会', '祭天大典', '军演节', '丰收节'],
      customs: ['尚武精神', '军功爵制', '法治社会', '科举武举并行'],
      education: '设有武学院和文学院，文武并重'
    },
    relations: [
      { target: 'nation_daxia', type: 'ally', description: '联姻关系', history: '百年联盟' },
      { target: 'nation_daqin', type: 'enemy', description: '敌对关系', history: '领土争端' }
    ],
    specialFeatures: ['强大的军队', '武道传统', '独立于宗门的军事体系', '边境要塞群'],
    royalFamily: {
      name: '周氏皇族',
      ancestor: '周武王',
      bloodline: '武道血脉',
      currentPatriarch: '周天威',
      members: 800,
      cultivationLevel: '筑基期至结丹期',
      specialAbilities: ['武道天赋', '战意护体', '军魂加身'],
      secrets: ['武道传承', '兵法秘典', '上古战器'],
      internalFactions: ['主战派', '主和派', '中立派']
    },
    cultivationTradition: '皇室子弟以武入道，强调实战',
    secretForces: '影卫',
    hiddenMasters: ['皇室老祖', '护国战神', '隐世将军'],
    nationalTreasures: ['周武剑', '天威印', '护国大阵', '兵符'],
    guardianBeasts: ['战龙', '铁甲兽', '天鹰'],
    specialResources: ['军马场', '兵器坊', '战甲矿'],
    historicalEvents: ['周武王建国', '魔道大战', '西域征服', '武道大会创立'],
    internalConflicts: ['主战派与主和派之争', '皇位继承之争'],
    externalThreats: ['大秦入侵', '西域叛乱', '妖兽潮']
  }
]

export const extendedSects: Sect[] = [
  {
    id: 'sect_qingyun',
    name: '青云宗',
    type: 'orthodox',
    rank: 'first_tier',
    description: `青云大陆最顶尖的正道宗门之一，由青云仙尊于上古纪元创立。青云宗以云之大道为根基，修炼出的真元如云海般浩瀚，攻守兼备。

青云宗位于青云山，占地千里，拥有多条极品灵脉。宗门内弟子数万，是青云大陆最大的宗门之一。

青云宗与皇室关系密切，历代皇帝都会送子弟入青云宗修行。青云宗也是正道联盟的盟主，在修仙界地位超然。`,
    history: `青云宗由青云仙尊于上古纪元创立。传说青云仙尊在观云海变幻时顿悟，领悟了云之大道，从而创造了青云诀。

青云宗创立后，一直是青云大陆最顶尖的宗门之一。上古纪元末期，青云仙尊在与天魔皇的大战中，曾以青云诀施展出惊天动地的神通，最终封印了天魔皇。

中古纪元时期，青云宗经过历代宗主的完善，变得更加强大。近古纪元以来，青云宗仍然是青云大陆最顶尖的宗门之一。`,
    location: '青云山',
    territory: ['青云山', '青云城', '青云矿脉', '青云药园', '青云秘境'],
    leadership: {
      sectMaster: '云霄真人',
      sectMasterCultivation: '化神期大圆满',
      elders: [
        { name: '云中子', cultivation: '化神初期', responsibility: '传功长老' },
        { name: '云霞仙子', cultivation: '元婴后期', responsibility: '执法长老' },
        { name: '云风真人', cultivation: '元婴中期', responsibility: '资源长老' },
        { name: '云雷真人', cultivation: '元婴中期', responsibility: '外务长老' }
      ],
      grandElders: [
        { name: '青云老祖', cultivation: '炼虚期', responsibility: '太上长老', secrets: ['闭关修炼', '准备渡劫'] }
      ],
      protectorElders: [
        { name: '云龙真人', cultivation: '元婴后期', responsibility: '护法长老' }
      ],
      guestElders: [
        { name: '玄机子', cultivation: '结丹后期', responsibility: '客卿长老' }
      ],
      succession: '宗主传位需经太上长老和长老会同意，优先选择真传弟子',
      sectRules: [
        '不得欺凌弱小',
        '不得残害同门',
        '不得勾结魔道',
        '不得泄露宗门机密',
        '违者逐出宗门，严重者处死'
      ]
    },
    members: {
      totalMembers: 50000,
      innerDisciples: 10000,
      outerDisciples: 35000,
      coreDisciples: 1000,
      trueDisciples: 100,
      legacyDisciples: 10,
      elders: 50,
      retiredElders: 20,
      servants: 5000,
      recruitment: '每三年招收一次外门弟子，内门弟子从外门选拔',
      requirements: ['灵根资质', '品行端正', '年龄不超过十六岁'],
      benefits: ['修炼资源', '功法传承', '护道机会', '宗门庇护']
    },
    cultivationMethods: ['青云诀', '云海神通', '云遁术', '云雾隐匿'],
    secretTechniques: ['青云九变', '云海领域', '云化万物'],
    forbiddenTechniques: ['云消散·自爆'],
    resources: {
      spiritVeins: ['青云主脉', '青云支脉×5'],
      mines: ['灵石矿×3', '铁矿×2', '玄铁矿×1'],
      herbGardens: ['青云药园', '灵草园', '珍稀药园'],
      beastFarms: ['灵兽园', '坐骑场'],
      secretRealms: ['青云秘境', '云海秘境'],
      annualIncome: 100000000,
      treasury: ['青云剑', '云海珠', '青云印', '云纹鼎']
    },
    relations: [
      { target: 'sect_xuantian', type: 'ally', description: '正道联盟成员' },
      { target: 'sect_wanjian', type: 'ally', description: '正道联盟成员' },
      { target: 'sect_danxia', type: 'ally', description: '正道联盟成员' },
      { target: 'sect_demon', type: 'enemy', description: '正邪对立' },
      { target: 'nation_daxia', type: 'ally', description: '世代交好' }
    ],
    specialFeatures: ['云之大道', '与皇室关系密切', '正道盟主', '青云秘境'],
    secrets: ['青云仙尊传承', '封印天魔皇的秘密', '青云山下的上古遗迹'],
    guardianBeasts: ['青云龙', '云翼兽'],
    sacredTreasures: ['青云剑', '云海珠', '青云印'],
    ancestralLand: '青云祖地',
    foundingAncestor: '青云仙尊',
    foundingYear: -5000,
    goldenAge: '上古纪元',
    declineReason: '仙界封闭，无法飞升',
    currentCrisis: ['魔道崛起', '资源紧张', '天才弟子流失'],
    internalFactions: [
      {
        name: '保守派',
        leader: '云中子',
        ideology: '维持现状，稳健发展',
        members: 30,
        influence: 40,
        goals: ['保持传统', '稳定发展'],
        conflicts: ['与改革派理念不合']
      },
      {
        name: '改革派',
        leader: '云风真人',
        ideology: '改革创新，积极进取',
        members: 20,
        influence: 30,
        goals: ['扩大影响力', '培养天才'],
        conflicts: ['与保守派理念不合']
      }
    ],
    hiddenAgenda: ['寻找飞升之路', '解封天魔皇的秘密']
  },
  {
    id: 'sect_xuantian',
    name: '玄天宗',
    type: 'orthodox',
    rank: 'first_tier',
    description: `青云大陆最顶尖的正道宗门之一，以玄妙著称。玄天宗修炼出的真元玄妙莫测，可以模拟各种属性，是一门极其灵活的功法。

玄天宗位于玄天山，占地八百里，拥有多条上品灵脉。宗门内弟子三万，是青云大陆重要的宗门之一。`,
    history: `玄天宗由玄天老祖于中古纪元创立。玄天老祖原本是一名散修，后因获得上古传承而实力大增，最终创立了玄天宗。

玄天宗的特点是玄妙莫测，可以模拟各种属性的真元，使得修炼者可以学习各种属性的功法和法术。这门功法一经问世，就引起了轰动。

中古纪元后期，玄天宗经过历代宗主的完善，变得更加精妙。近古纪元以来，玄天宗仍然是青云大陆最顶尖的宗门之一。`,
    location: '玄天山',
    territory: ['玄天山', '玄天城', '玄天矿脉', '玄天药园'],
    leadership: {
      sectMaster: '玄天真人',
      sectMasterCultivation: '化神中期',
      elders: [
        { name: '玄机子', cultivation: '元婴后期', responsibility: '传功长老' },
        { name: '玄明子', cultivation: '元婴中期', responsibility: '执法长老' }
      ],
      grandElders: [],
      protectorElders: [],
      guestElders: [],
      succession: '宗主传位需经长老会同意',
      sectRules: [
        '不得欺凌弱小',
        '不得残害同门',
        '不得勾结魔道'
      ]
    },
    members: {
      totalMembers: 30000,
      innerDisciples: 6000,
      outerDisciples: 21000,
      coreDisciples: 500,
      trueDisciples: 50,
      legacyDisciples: 5,
      elders: 30,
      retiredElders: 10,
      servants: 3000,
      recruitment: '每三年招收一次外门弟子',
      requirements: ['灵根资质', '品行端正'],
      benefits: ['修炼资源', '功法传承']
    },
    cultivationMethods: ['玄天诀', '玄妙真元', '属性模拟'],
    secretTechniques: ['玄天九变', '万法归一'],
    forbiddenTechniques: [],
    resources: {
      spiritVeins: ['玄天主脉', '玄天支脉×3'],
      mines: ['灵石矿×2', '玄铁矿×1'],
      herbGardens: ['玄天药园'],
      beastFarms: ['灵兽园'],
      secretRealms: ['玄天秘境'],
      annualIncome: 50000000,
      treasury: ['玄天剑', '玄天印']
    },
    relations: [
      { target: 'sect_qingyun', type: 'ally', description: '正道联盟成员' },
      { target: 'sect_demon', type: 'enemy', description: '正邪对立' }
    ],
    specialFeatures: ['玄妙真元', '属性模拟', '功法兼容'],
    secrets: ['上古传承的秘密', '玄天老祖的遗物'],
    guardianBeasts: ['玄天兽'],
    sacredTreasures: ['玄天剑', '玄天印'],
    ancestralLand: '玄天祖地',
    foundingAncestor: '玄天老祖',
    foundingYear: -3000,
    goldenAge: '中古纪元',
    internalFactions: []
  },
  {
    id: 'sect_wanjian',
    name: '万剑宗',
    type: 'orthodox',
    rank: 'first_tier',
    description: `青云大陆最顶尖的剑修宗门，以剑道著称。万剑宗弟子人人修炼剑道，剑术威力惊人。

万剑宗位于万剑山，占地六百里，拥有多条灵脉。宗门内弟子两万，是青云大陆剑修的圣地。`,
    history: `万剑宗由万剑真人于中古纪元创立。万剑真人原本是一名散修，后因领悟剑道而实力大增，最终创立了万剑宗。

万剑宗的特点是专修剑道，弟子人人用剑，剑术威力惊人。万剑宗的剑阵更是名震青云大陆。`,
    location: '万剑山',
    territory: ['万剑山', '万剑城', '万剑矿脉'],
    leadership: {
      sectMaster: '万剑真人',
      sectMasterCultivation: '化神初期',
      elders: [
        { name: '剑心真人', cultivation: '元婴后期', responsibility: '传功长老' },
        { name: '剑影真人', cultivation: '元婴中期', responsibility: '执法长老' }
      ],
      grandElders: [],
      protectorElders: [],
      guestElders: [],
      succession: '宗主传位需经长老会同意',
      sectRules: [
        '剑道为尊',
        '不得欺凌弱小',
        '不得残害同门'
      ]
    },
    members: {
      totalMembers: 20000,
      innerDisciples: 4000,
      outerDisciples: 14000,
      coreDisciples: 300,
      trueDisciples: 30,
      legacyDisciples: 3,
      elders: 20,
      retiredElders: 5,
      servants: 2000,
      recruitment: '每三年招收一次外门弟子',
      requirements: ['剑道天赋', '品行端正'],
      benefits: ['剑道传承', '剑器资源']
    },
    cultivationMethods: ['万剑诀', '剑心通明', '万剑归宗'],
    secretTechniques: ['万剑阵', '剑道领域'],
    forbiddenTechniques: [],
    resources: {
      spiritVeins: ['万剑主脉'],
      mines: ['灵石矿×2', '玄铁矿×2'],
      herbGardens: ['万剑药园'],
      beastFarms: [],
      secretRealms: ['万剑秘境'],
      annualIncome: 30000000,
      treasury: ['万剑', '剑心珠']
    },
    relations: [
      { target: 'sect_qingyun', type: 'ally', description: '正道联盟成员' },
      { target: 'sect_demon', type: 'enemy', description: '正邪对立' }
    ],
    specialFeatures: ['剑道专修', '万剑阵', '剑修圣地'],
    secrets: ['万剑真人的剑道传承', '万剑山的剑意'],
    guardianBeasts: ['剑灵兽'],
    sacredTreasures: ['万剑', '剑心珠'],
    ancestralLand: '万剑祖地',
    foundingAncestor: '万剑真人',
    foundingYear: -2500,
    goldenAge: '中古纪元',
    internalFactions: []
  },
  {
    id: 'sect_danxia',
    name: '丹霞宗',
    type: 'orthodox',
    rank: 'first_tier',
    description: `青云大陆最顶尖的丹道宗门，以炼丹著称。丹霞宗弟子人人精通炼丹，是青云大陆丹药的主要供应者。

丹霞宗位于丹霞山，占地四百里，拥有多条火属性灵脉。宗门内弟子一万五千，是青云大陆丹修的圣地。`,
    history: `丹霞宗由丹霞仙子于中古纪元创立。丹霞仙子原本是一名散修，后因精通炼丹而闻名，最终创立了丹霞宗。

丹霞宗的特点是专修丹道，弟子人人炼丹，丹药品质极高。丹霞宗的丹药在青云大陆供不应求。`,
    location: '丹霞山',
    territory: ['丹霞山', '丹霞城', '丹霞矿脉', '丹霞药园'],
    leadership: {
      sectMaster: '丹霞真人',
      sectMasterCultivation: '元婴后期',
      elders: [
        { name: '丹心真人', cultivation: '元婴中期', responsibility: '传功长老' },
        { name: '丹火真人', cultivation: '元婴初期', responsibility: '执法长老' }
      ],
      grandElders: [],
      protectorElders: [],
      guestElders: [],
      succession: '宗主传位需经长老会同意',
      sectRules: [
        '丹道为尊',
        '不得炼制毒丹',
        '不得残害同门'
      ]
    },
    members: {
      totalMembers: 15000,
      innerDisciples: 3000,
      outerDisciples: 10000,
      coreDisciples: 200,
      trueDisciples: 20,
      legacyDisciples: 2,
      elders: 15,
      retiredElders: 5,
      servants: 1500,
      recruitment: '每三年招收一次外门弟子',
      requirements: ['丹道天赋', '品行端正'],
      benefits: ['丹道传承', '丹药资源']
    },
    cultivationMethods: ['丹霞诀', '丹火真元', '丹道心经'],
    secretTechniques: ['丹火神通', '丹道领域'],
    forbiddenTechniques: [],
    resources: {
      spiritVeins: ['丹霞主脉'],
      mines: ['灵石矿×2', '火灵矿×1'],
      herbGardens: ['丹霞药园', '珍稀药园', '灵草园'],
      beastFarms: [],
      secretRealms: ['丹霞秘境'],
      annualIncome: 80000000,
      treasury: ['丹霞鼎', '丹火珠']
    },
    relations: [
      { target: 'sect_qingyun', type: 'ally', description: '正道联盟成员' },
      { target: 'sect_demon', type: 'enemy', description: '正邪对立' }
    ],
    specialFeatures: ['丹道专修', '丹药供应', '丹修圣地'],
    secrets: ['丹霞仙子的丹道传承', '丹霞山的丹火'],
    guardianBeasts: ['丹火兽'],
    sacredTreasures: ['丹霞鼎', '丹火珠'],
    ancestralLand: '丹霞祖地',
    foundingAncestor: '丹霞仙子',
    foundingYear: -2000,
    goldenAge: '中古纪元',
    internalFactions: []
  },
  {
    id: 'sect_yushou',
    name: '御兽宗',
    type: 'orthodox',
    rank: 'second_tier',
    description: `青云大陆最顶尖的御兽宗门，以御兽著称。御兽宗弟子人人精通御兽，是青云大陆灵兽的主要供应者。

御兽宗位于御兽山，占地六百里，拥有多条灵脉。宗门内弟子一万，是青云大陆御兽修士的圣地。`,
    history: `御兽宗由御兽真人于中古纪元创立。御兽真人原本是一名散修，后因精通御兽而闻名，最终创立了御兽宗。

御兽宗的特点是专修御兽，弟子人人御兽，战斗力极强。御兽宗的灵兽在青云大陆供不应求。`,
    location: '御兽山',
    territory: ['御兽山', '御兽城', '御兽矿脉', '御兽园'],
    leadership: {
      sectMaster: '御兽真人',
      sectMasterCultivation: '元婴中期',
      elders: [
        { name: '兽心真人', cultivation: '元婴初期', responsibility: '传功长老' }
      ],
      grandElders: [],
      protectorElders: [],
      guestElders: [],
      succession: '宗主传位需经长老会同意',
      sectRules: [
        '御兽为尊',
        '不得残害灵兽',
        '不得残害同门'
      ]
    },
    members: {
      totalMembers: 10000,
      innerDisciples: 2000,
      outerDisciples: 7000,
      coreDisciples: 100,
      trueDisciples: 10,
      legacyDisciples: 1,
      elders: 10,
      retiredElders: 3,
      servants: 1000,
      recruitment: '每三年招收一次外门弟子',
      requirements: ['御兽天赋', '品行端正'],
      benefits: ['御兽传承', '灵兽资源']
    },
    cultivationMethods: ['御兽诀', '兽魂真元', '御兽心经'],
    secretTechniques: ['御兽神通', '兽魂领域'],
    forbiddenTechniques: [],
    resources: {
      spiritVeins: ['御兽主脉'],
      mines: ['灵石矿×1'],
      herbGardens: ['御兽药园'],
      beastFarms: ['灵兽园', '坐骑场', '珍兽园'],
      secretRealms: ['御兽秘境'],
      annualIncome: 40000000,
      treasury: ['御兽印', '兽魂珠']
    },
    relations: [
      { target: 'sect_qingyun', type: 'ally', description: '正道联盟成员' },
      { target: 'sect_demon', type: 'enemy', description: '正邪对立' }
    ],
    specialFeatures: ['御兽专修', '灵兽供应', '御兽圣地'],
    secrets: ['御兽真人的御兽传承', '御兽山的兽魂'],
    guardianBeasts: ['御兽神龙'],
    sacredTreasures: ['御兽印', '兽魂珠'],
    ancestralLand: '御兽祖地',
    foundingAncestor: '御兽真人',
    foundingYear: -1500,
    goldenAge: '中古纪元',
    internalFactions: []
  },
  {
    id: 'sect_demon',
    name: '天魔宗',
    type: 'demonic',
    rank: 'first_tier',
    description: `青云大陆最强大的魔道宗门，以魔道著称。天魔宗弟子修炼魔道功法，实力强大但行事狠辣。

天魔宗位于魔域深处，占地不详，拥有多条魔气灵脉。宗门内弟子五万，是青云大陆魔修的圣地。`,
    history: `天魔宗由天魔皇于上古纪元创立。天魔皇是上古时期最强大的魔修，曾与青云仙尊大战，最终被封印。

天魔宗的特点是修炼魔道功法，实力强大但行事狠辣。天魔宗与正道宗门势不两立。`,
    location: '魔域',
    territory: ['魔域', '魔城', '魔矿脉'],
    leadership: {
      sectMaster: '天魔子',
      sectMasterCultivation: '化神初期',
      elders: [
        { name: '魔心真人', cultivation: '元婴后期', responsibility: '传功长老' },
        { name: '魔影真人', cultivation: '元婴中期', responsibility: '执法长老' }
      ],
      grandElders: [],
      protectorElders: [],
      guestElders: [],
      succession: '强者至上',
      sectRules: [
        '实力为尊',
        '不得背叛宗门',
        '弱肉强食'
      ]
    },
    members: {
      totalMembers: 50000,
      innerDisciples: 10000,
      outerDisciples: 35000,
      coreDisciples: 500,
      trueDisciples: 50,
      legacyDisciples: 5,
      elders: 50,
      retiredElders: 20,
      servants: 5000,
      recruitment: '随时招收弟子',
      requirements: ['魔道资质', '心狠手辣'],
      benefits: ['魔道传承', '魔器资源']
    },
    cultivationMethods: ['天魔诀', '魔心真元', '魔道心经'],
    secretTechniques: ['天魔神通', '魔道领域', '吞噬万物'],
    forbiddenTechniques: ['血祭大法', '噬魂大法'],
    resources: {
      spiritVeins: ['魔域主脉'],
      mines: ['魔石矿×3', '血灵矿×1'],
      herbGardens: ['魔药园'],
      beastFarms: ['魔兽园'],
      secretRealms: ['魔域秘境'],
      annualIncome: 80000000,
      treasury: ['天魔剑', '魔心珠']
    },
    relations: [
      { target: 'sect_qingyun', type: 'enemy', description: '正邪对立' },
      { target: 'sect_xuantian', type: 'enemy', description: '正邪对立' },
      { target: 'sect_wanjian', type: 'enemy', description: '正邪对立' },
      { target: 'sect_danxia', type: 'enemy', description: '正邪对立' }
    ],
    specialFeatures: ['魔道专修', '实力至上', '魔修圣地'],
    secrets: ['天魔皇的封印', '天魔传承'],
    guardianBeasts: ['天魔兽'],
    sacredTreasures: ['天魔剑', '魔心珠'],
    ancestralLand: '魔域深处',
    foundingAncestor: '天魔皇',
    foundingYear: -5000,
    goldenAge: '上古纪元',
    currentCrisis: ['天魔皇封印松动', '正道围剿'],
    internalFactions: [
      {
        name: '激进派',
        leader: '魔心真人',
        ideology: '主动出击，消灭正道',
        members: 30,
        influence: 50,
        goals: ['解封天魔皇', '消灭正道'],
        conflicts: ['与保守派理念不合']
      },
      {
        name: '保守派',
        leader: '魔影真人',
        ideology: '积蓄力量，等待时机',
        members: 20,
        influence: 30,
        goals: ['保存实力', '等待天魔皇解封'],
        conflicts: ['与激进派理念不合']
      }
    ],
    hiddenAgenda: ['解封天魔皇', '消灭正道宗门']
  }
]

export const extendedFamilies: Family[] = [
  {
    id: 'family_qingyun',
    name: '青云世家',
    type: 'cultivation',
    rank: 'first_tier',
    description: '青云大陆最顶尖的修仙世家之一，与青云宗关系密切。青云世家历代都有天才弟子加入青云宗，是青云宗的重要人才来源。',
    history: '青云世家由青云仙尊的后人创立，世代修炼青云诀，与青云宗关系密切。',
    location: '青云城',
    territory: ['青云府', '青云矿脉', '青云药园'],
    leadership: {
      patriarch: '青云子',
      patriarchCultivation: '元婴中期',
      elders: [
        { name: '青云长老', cultivation: '元婴初期', responsibility: '族务长老' }
      ],
      succession: '嫡长子继承',
      familyRules: [
        '不得背叛家族',
        '不得泄露家族机密',
        '族人以修炼为重'
      ]
    },
    members: {
      totalMembers: 5000,
      directLine: 500,
      branchLines: 4500,
      servants: 1000,
      marriedIn: 200,
      cultivationDistribution: {
        '凡人': 3000,
        '炼气期': 1500,
        '筑基期': 400,
        '结丹期': 90,
        '元婴期': 10
      }
    },
    bloodline: {
      name: '青云血脉',
      type: 'ancient',
      abilities: ['云气亲和', '修炼加速'],
      purity: 60,
      awakeningRate: 0.1,
      specialFeatures: ['云系功法加成']
    },
    resources: {
      properties: ['青云府', '青云别院×5'],
      businesses: ['青云商会', '青云丹坊', '青云器坊'],
      mines: ['灵石矿×1', '玄铁矿×1'],
      spiritVeins: ['青云支脉'],
      annualIncome: 20000000,
      treasury: ['青云剑', '青云珠']
    },
    relations: [
      { target: 'sect_qingyun', type: 'ally', description: '世代交好' },
      { target: 'family_xuantian', type: 'rival', description: '竞争关系' }
    ],
    specialFeatures: ['青云血脉', '与青云宗关系密切', '云系功法传承'],
    secrets: ['青云仙尊的遗物', '青云血脉的秘密'],
    guardianBeasts: ['青云兽'],
    sacredTreasures: ['青云剑', '青云珠'],
    ancestralLand: '青云祖地',
    foundingAncestor: '青云后人',
    foundingYear: -4500,
    goldenAge: '上古纪元',
    internalFactions: []
  },
  {
    id: 'family_xuantian',
    name: '玄天世家',
    type: 'cultivation',
    rank: 'first_tier',
    description: '青云大陆最顶尖的修仙世家之一，与玄天宗关系密切。玄天世家历代都有天才弟子加入玄天宗，是玄天宗的重要人才来源。',
    history: '玄天世家由玄天老祖的后人创立，世代修炼玄天诀，与玄天宗关系密切。',
    location: '玄天城',
    territory: ['玄天府', '玄天矿脉', '玄天药园'],
    leadership: {
      patriarch: '玄天子',
      patriarchCultivation: '元婴初期',
      elders: [
        { name: '玄天长老', cultivation: '结丹后期', responsibility: '族务长老' }
      ],
      succession: '嫡长子继承',
      familyRules: [
        '不得背叛家族',
        '不得泄露家族机密'
      ]
    },
    members: {
      totalMembers: 4000,
      directLine: 400,
      branchLines: 3600,
      servants: 800,
      marriedIn: 150,
      cultivationDistribution: {
        '凡人': 2500,
        '炼气期': 1200,
        '筑基期': 300,
        '结丹期': 70,
        '元婴期': 8
      }
    },
    bloodline: {
      name: '玄天血脉',
      type: 'ancient',
      abilities: ['玄妙真元', '功法兼容'],
      purity: 50,
      awakeningRate: 0.08,
      specialFeatures: ['功法兼容性高']
    },
    resources: {
      properties: ['玄天府', '玄天别院×3'],
      businesses: ['玄天商会', '玄天丹坊'],
      mines: ['灵石矿×1'],
      spiritVeins: ['玄天支脉'],
      annualIncome: 15000000,
      treasury: ['玄天剑', '玄天珠']
    },
    relations: [
      { target: 'sect_xuantian', type: 'ally', description: '世代交好' },
      { target: 'family_qingyun', type: 'rival', description: '竞争关系' }
    ],
    specialFeatures: ['玄天血脉', '与玄天宗关系密切', '功法兼容'],
    secrets: ['玄天老祖的遗物', '玄天血脉的秘密'],
    guardianBeasts: ['玄天兽'],
    sacredTreasures: ['玄天剑', '玄天珠'],
    ancestralLand: '玄天祖地',
    foundingAncestor: '玄天后人',
    foundingYear: -2800,
    goldenAge: '中古纪元',
    internalFactions: []
  }
]

export const extendedAlliances: Alliance[] = [
  {
    id: 'alliance_orthodox',
    name: '正道联盟',
    type: 'sect_alliance',
    rank: 'legendary',
    description: '青云大陆最强大的正道联盟，由青云宗、玄天宗、万剑宗、丹霞宗、御兽宗等正道宗门组成。正道联盟维护青云大陆的和平，对抗魔道势力。',
    history: '正道联盟由青云仙尊于上古纪元创立，目的是对抗天魔宗。数千年来，正道联盟一直是青云大陆最强大的势力。',
    leadership: {
      allianceMaster: '云霄真人',
      viceMasters: ['玄天真人', '万剑真人', '丹霞真人'],
      council: ['各宗门长老'],
      decisionMaking: '重大决策需经联盟大会表决'
    },
    members: [
      { name: '青云宗', type: 'sect', contribution: 100, benefits: ['盟主地位', '资源优先'], obligations: ['维护联盟', '出兵支援'] },
      { name: '玄天宗', type: 'sect', contribution: 80, benefits: ['资源分配', '联盟庇护'], obligations: ['维护联盟', '出兵支援'] },
      { name: '万剑宗', type: 'sect', contribution: 70, benefits: ['资源分配', '联盟庇护'], obligations: ['维护联盟', '出兵支援'] },
      { name: '丹霞宗', type: 'sect', contribution: 60, benefits: ['资源分配', '联盟庇护'], obligations: ['维护联盟', '出兵支援'] },
      { name: '御兽宗', type: 'sect', contribution: 50, benefits: ['资源分配', '联盟庇护'], obligations: ['维护联盟', '出兵支援'] }
    ],
    resources: {
      sharedTerritories: ['正道联盟总部'],
      sharedResources: ['联盟资源库'],
      jointVentures: ['联盟商会', '联盟丹坊'],
      annualContribution: 500000000
    },
    relations: [
      { target: 'sect_demon', type: 'enemy', description: '正邪对立' },
      { target: 'nation_daxia', type: 'ally', description: '合作关系' }
    ],
    specialFeatures: ['正道盟主', '维护和平', '对抗魔道'],
    secrets: ['联盟秘库', '上古封印'],
    foundingYear: -5000,
    purpose: '对抗魔道，维护和平',
    rules: [
      '不得背叛联盟',
      '不得内斗',
      '共同对抗魔道'
    ]
  },
  {
    id: 'alliance_demonic',
    name: '魔道联盟',
    type: 'sect_alliance',
    rank: 'first_tier',
    description: '青云大陆最强大的魔道联盟，由天魔宗、血魔宗、鬼道宗等魔道宗门组成。魔道联盟与正道联盟势不两立。',
    history: '魔道联盟由天魔皇于上古纪元创立，目的是对抗正道联盟。数千年来，魔道联盟一直是青云大陆最强大的魔道势力。',
    leadership: {
      allianceMaster: '天魔子',
      viceMasters: ['血魔子', '鬼道子'],
      council: ['各宗门长老'],
      decisionMaking: '强者至上'
    },
    members: [
      { name: '天魔宗', type: 'sect', contribution: 100, benefits: ['盟主地位', '资源优先'], obligations: ['维护联盟', '出兵支援'] },
      { name: '血魔宗', type: 'sect', contribution: 70, benefits: ['资源分配', '联盟庇护'], obligations: ['维护联盟', '出兵支援'] },
      { name: '鬼道宗', type: 'sect', contribution: 50, benefits: ['资源分配', '联盟庇护'], obligations: ['维护联盟', '出兵支援'] }
    ],
    resources: {
      sharedTerritories: ['魔道联盟总部'],
      sharedResources: ['联盟资源库'],
      jointVentures: ['联盟商会'],
      annualContribution: 300000000
    },
    relations: [
      { target: 'alliance_orthodox', type: 'enemy', description: '正邪对立' }
    ],
    specialFeatures: ['魔道盟主', '实力至上', '对抗正道'],
    secrets: ['天魔皇封印', '魔道秘库'],
    foundingYear: -5000,
    purpose: '对抗正道，解封天魔皇',
    rules: [
      '实力为尊',
      '不得背叛联盟',
      '共同对抗正道'
    ]
  }
]