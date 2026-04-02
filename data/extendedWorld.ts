import { WorldEra, HistoricalEvent, NotableFigure, WorldRegion, WorldLaw, Race, MythicalStory, WorldSecret, HeavenlyDao, Dimension } from './worldLore'

export interface ExtendedWorldLaw extends WorldLaw {
  subLaws?: WorldLaw[]
  cultivationMethods?: string[]
  forbiddenActions?: string[]
  rewards?: string[]
  punishments?: string[]
  history?: string
  currentStatus?: string
}

export interface ExtendedRace extends Race {
  subRaces?: ExtendedRace[]
  bloodlines?: Bloodline[]
  cultivationAptitude?: { [key: string]: number }
  lifespan?: number
  reproductionRate?: number
  territorySize?: number
  majorClans?: string[]
  historicalFigures?: string[]
  sacredTreasures?: string[]
  forbiddenTerritories?: string[]
  alliances?: string[]
  enemies?: string[]
  specialCustoms?: string[]
  religiousBeliefs?: string
  language?: string
  writingSystem?: string
  calendar?: string
  festivals?: string[]
}

export interface Bloodline {
  id: string
  name: string
  type: 'divine' | 'ancient' | 'royal' | 'noble' | 'common' | 'mutated'
  description: string
  origin: string
  abilities: string[]
  awakeningConditions: string[]
  inheritanceRate: number
  currentHolders: number
  purityLevels: { level: string; abilities: string[]; rarity: number }[]
}

export interface DivineBeast {
  id: string
  name: string
  type: 'dragon' | 'phoenix' | 'qilin' | 'kunpeng' | 'white_tiger' | 'black_tortoise' | 'vermilion_bird' | 'azure_dragon' | 'other'
  rank: 'ordinary' | 'spirit' | 'immortal' | 'divine' | 'chaos' | 'origin'
  description: string
  history: string
  abilities: string[]
  innateSkills: string[]
  bloodline: string
  lifespan: number
  reproduction: string
  habitat: string[]
  diet: string
  behavior: string
  relationship: { race: string; relation: string }[]
  currentStatus: 'extinct' | 'endangered' | 'rare' | 'uncommon' | 'common'
  notableMembers: string[]
  sacredTreasures: string[]
  cultivationSpeed: number
  maxRealm: string
}

export interface SpiritVein {
  id: string
  name: string
  type: 'heaven' | 'earth' | 'mystic' | 'yellow' | 'mortal'
  grade: number
  description: string
  location: string
  spiritDensity: number
  area: number
  output: number
  controller: string
  history: string
  resources: string[]
  dangers: string[]
  connectedVeins: string[]
  formation?: string
  status: 'active' | 'dormant' | 'exhausted' | 'sealed'
}

export interface SecretRealm {
  id: string
  name: string
  type: 'natural' | 'artificial' | 'ancient' | 'divine' | 'forbidden'
  rank: 'mortal' | 'spirit' | 'immortal' | 'divine' | 'chaos'
  description: string
  history: string
  location: string
  size: number
  entranceConditions: string[]
  timeFlow: number
  spiritDensity: number
  dangers: string[]
  treasures: string[]
  inheritances: string[]
  guardians: string[]
  openingCycle: number
  lastOpening: number
  nextOpening: number
  currentExplorers: number
  maxExplorers: number
  deathRate: number
}

export interface ForbiddenZone {
  id: string
  name: string
  type: 'natural' | 'ancient_battlefield' | 'seal' | 'curse' | 'unknown'
  dangerLevel: number
  description: string
  history: string
  location: string
  size: number
  dangers: string[]
  forbiddenRules: string[]
  survivors: string[]
  treasures: string[]
  secrets: string[]
  guardian?: string
  entranceRequirements: string[]
  exitConditions: string[]
  timeDistortion: number
  spatialDistortion: number
  rumoredEntities: string[]
}

export interface AncientRuins {
  id: string
  name: string
  type: 'sect' | 'city' | 'tomb' | 'temple' | 'battlefield' | 'palace' | 'cave'
  era: string
  description: string
  history: string
  location: string
  size: number
  originalOwner: string
  destructionReason: string
  remainingTreasures: string[]
  remainingInheritances: string[]
  dangers: string[]
  guardians: string[]
  explorationRecords: ExplorationRecord[]
  currentStatus: 'intact' | 'damaged' | 'ruined' | 'buried' | 'sealed'
}

export interface ExplorationRecord {
  explorer: string
  year: number
  findings: string[]
  casualties: number
  outcome: 'success' | 'partial' | 'failure' | 'disaster'
}

export interface WorldTree {
  id: string
  name: string
  type: 'world' | 'immortal' | 'divine' | 'chaos'
  description: string
  history: string
  location: string
  height: number
  age: number
  abilities: string[]
  fruits: string[]
  leaves: string[]
  roots: string[]
  guardians: string[]
  connectedWorlds: string[]
  spiritDensity: number
  status: 'thriving' | 'declining' | 'dormant' | 'dying'
}

export interface HeavenlyTribulation {
  id: string
  name: string
  type: 'breakthrough' | 'karmic' | 'heavenly' | 'divine' | 'chaos'
  rank: 'minor' | 'major' | 'heavenly' | 'divine' | 'eternal'
  description: string
  triggerConditions: string[]
  phases: TribulationPhase[]
  rewards: string[]
  failureConsequences: string[]
  historicalRecords: TribulationRecord[]
}

export interface TribulationPhase {
  id: string
  name: string
  order: number
  description: string
  duration: number
  challenges: string[]
  successRate: number
}

export interface TribulationRecord {
  cultivator: string
  year: number
  realm: string
  outcome: 'success' | 'failure' | 'death'
  details: string
}

export const extendedRaces: ExtendedRace[] = [
  {
    id: 'race_human',
    name: '人族',
    type: 'human',
    origin: '女娲娘娘以泥土造人，赋予人类生命和智慧',
    characteristics: ['先天不足', '潜力无限', '智慧超群', '适应力强', '繁殖力强', '创造力强'],
    abilities: ['可修炼任何功法', '可领悟任何大道', '可创造任何神通', '可炼制任何法宝'],
    weaknesses: ['先天体质弱', '寿元短暂', '易受心魔侵扰'],
    history: `人族是女娲娘娘创造的种族，先天不足但潜力无限。在上古时期，人族只是众多种族中弱小的一支，经常受到其他种族的欺凌。

巫妖量劫后，巫族和妖族两败俱伤，人族趁机崛起。三皇五帝带领人族建立了辉煌的文明，成为天地主角。

上古纪元，人族大能创立了完整的修炼体系，人族修士开始涌现。青云仙尊、玄天大帝等都是人族的杰出代表。

中古纪元，人族建立了凡人国度，国运与修仙开始关联。大夏、大商、大周、大秦等王朝相继建立。

近古纪元，人族成为修仙界的主导力量，五大宗门都是人族创立。如今，人族是青云大陆最强大的种族。`,
    notableMembers: ['青云仙尊', '玄天大帝', '万剑真人', '丹霞仙子', '御兽真人', '三皇五帝'],
    relations: [
      { race: '妖族', relation: 'neutral' },
      { race: '灵族', relation: 'ally' },
      { race: '海族', relation: 'neutral' },
      { race: '魔族', relation: 'enemy' },
      { race: '巫族', relation: 'neutral' }
    ],
    population: 10000000000,
    territories: ['中州大陆', '北荒原', '南疆密林', '东海沿岸'],
    specialTraits: ['女娲血脉', '悟性超群', '可修炼任何功法'],
    subRaces: [
      {
        id: 'race_human_mortal',
        name: '凡人',
        type: 'human',
        origin: '普通人族，未踏入修仙之门',
        characteristics: ['无修为', '寿元短暂', '数量众多'],
        abilities: ['繁衍', '劳作', '学习'],
        weaknesses: ['脆弱', '寿短'],
        history: '凡人是人族的主体，数量最多',
        notableMembers: [],
        relations: [],
        population: 9900000000,
        territories: ['凡人国度'],
        specialTraits: []
      },
      {
        id: 'race_human_cultivator',
        name: '修士',
        type: 'human',
        origin: '踏入修仙之门的人族',
        characteristics: ['拥有修为', '寿元延长', '实力强大'],
        abilities: ['施法', '御器', '炼丹', '炼器'],
        weaknesses: ['需要资源', '面临天劫'],
        history: '修士是人族的精英，数量稀少',
        notableMembers: ['青云仙尊', '玄天大帝'],
        relations: [],
        population: 100000000,
        territories: ['宗门', '洞府'],
        specialTraits: ['灵根', '道心']
      }
    ],
    bloodlines: [
      {
        id: 'bloodline_nuwa',
        name: '女娲血脉',
        type: 'divine',
        description: '继承自女娲娘娘的神圣血脉，拥有不可思议的造化之力',
        origin: '女娲娘娘造人时赋予部分人类的血脉',
        abilities: ['造化神通', '生命法则', '因果法则', '补天神通'],
        awakeningConditions: ['达到化神期', '感悟生命法则', '获得女娲认可'],
        inheritanceRate: 0.0001,
        currentHolders: 3,
        purityLevels: [
          { level: '初醒', abilities: ['生命感知'], rarity: 0.5 },
          { level: '觉醒', abilities: ['生命感知', '造化初阶'], rarity: 0.3 },
          { level: '大成', abilities: ['生命感知', '造化初阶', '因果感知'], rarity: 0.15 },
          { level: '圆满', abilities: ['生命法则', '造化神通', '因果法则'], rarity: 0.05 }
        ]
      },
      {
        id: 'bloodline_emperor',
        name: '帝皇血脉',
        type: 'ancient',
        description: '继承自三皇五帝的血脉，拥有统御万民的能力',
        origin: '三皇五帝传承',
        abilities: ['帝王之气', '统御之力', '国运加身', '天命护体'],
        awakeningConditions: ['成为一国之主', '获得国运认可', '达到结丹期'],
        inheritanceRate: 0.001,
        currentHolders: 50,
        purityLevels: [
          { level: '初醒', abilities: ['帝王之气'], rarity: 0.4 },
          { level: '觉醒', abilities: ['帝王之气', '统御之力'], rarity: 0.35 },
          { level: '大成', abilities: ['帝王之气', '统御之力', '国运加身'], rarity: 0.2 },
          { level: '圆满', abilities: ['帝王之气', '统御之力', '国运加身', '天命护体'], rarity: 0.05 }
        ]
      },
      {
        id: 'bloodline_sword',
        name: '剑道血脉',
        type: 'ancient',
        description: '天生亲近剑道，剑术天赋惊人',
        origin: '上古剑修传承',
        abilities: ['剑意天生', '剑心通明', '万剑归宗', '剑道领域'],
        awakeningConditions: ['接触剑道', '感悟剑意', '达到筑基期'],
        inheritanceRate: 0.01,
        currentHolders: 500,
        purityLevels: [
          { level: '初醒', abilities: ['剑意天生'], rarity: 0.5 },
          { level: '觉醒', abilities: ['剑意天生', '剑心通明'], rarity: 0.3 },
          { level: '大成', abilities: ['剑意天生', '剑心通明', '万剑归宗'], rarity: 0.15 },
          { level: '圆满', abilities: ['剑意天生', '剑心通明', '万剑归宗', '剑道领域'], rarity: 0.05 }
        ]
      }
    ],
    cultivationAptitude: {
      '五行功法': 1.0,
      '剑道': 1.2,
      '丹道': 0.8,
      '器道': 0.9,
      '阵道': 1.0,
      '符道': 1.1,
      '魔道': 0.7,
      '佛道': 0.8,
      '妖道': 0.5,
      '巫道': 0.6
    },
    lifespan: 100,
    reproductionRate: 0.03,
    territorySize: 50000000,
    majorClans: ['青云世家', '玄天世家', '万剑世家', '丹霞世家', '御兽世家', '皇族', '王族'],
    historicalFigures: ['三皇五帝', '青云仙尊', '玄天大帝', '万剑真人', '丹霞仙子', '御兽真人'],
    sacredTreasures: ['人皇印', '轩辕剑', '神农鼎', '伏羲琴'],
    forbiddenTerritories: ['人族祖地', '三皇陵', '五帝墓'],
    alliances: ['灵族', '海族'],
    enemies: ['魔族', '天魔'],
    specialCustoms: ['祭祖', '拜师', '宗门大比', '凡人科举'],
    religiousBeliefs: '道教为主，兼有佛教、儒教',
    language: '通用语',
    writingSystem: '汉字',
    calendar: '干支纪年',
    festivals: ['春节', '元宵', '清明', '端午', '中秋', '重阳', '除夕']
  },
  {
    id: 'race_demon',
    name: '妖族',
    type: 'demon',
    origin: '上古时期由妖族天帝帝俊和东皇太一统领，巫妖量劫后衰落',
    characteristics: ['天生强大', '寿元悠久', '化形困难', '血脉传承', '兽性难除'],
    abilities: ['天赋神通', '血脉之力', '化形之术', '妖丹修炼'],
    weaknesses: ['化形劫', '天雷克制', '正道克制'],
    history: `妖族是上古时期最强大的种族之一，由帝俊和东皇太一统领，建立了天庭，统御周天星斗。

巫妖量劫中，妖族与巫族展开决战，最终两败俱伤。帝俊和东皇太一陨落，妖族势力大衰。

中古纪元，妖族退居十万大山，与人类保持和平共处。部分妖族融入人类社会，成为修士的伙伴或坐骑。

近古纪元，妖族逐渐恢复元气，但已无法恢复上古时期的辉煌。如今，妖族是青云大陆的重要势力之一。`,
    notableMembers: ['帝俊', '东皇太一', '妖圣', '妖王'],
    relations: [
      { race: '人族', relation: 'neutral' },
      { race: '巫族', relation: 'enemy' },
      { race: '龙族', relation: 'ally' },
      { race: '凤族', relation: 'ally' }
    ],
    population: 500000000,
    territories: ['十万大山', '东海', '南疆密林', '北荒原'],
    specialTraits: ['妖丹', '化形', '血脉传承'],
    subRaces: [
      {
        id: 'race_demon_beast',
        name: '妖兽',
        type: 'demon',
        origin: '吸收灵气的野兽，未化形',
        characteristics: ['未化形', '智力低下', '数量众多'],
        abilities: ['天赋技能', '妖丹'],
        weaknesses: ['无法修炼人类功法', '智力低'],
        history: '妖兽是妖族的主体，数量最多',
        notableMembers: [],
        relations: [],
        population: 450000000,
        territories: ['十万大山', '各地野外'],
        specialTraits: []
      },
      {
        id: 'race_demon_cultivator',
        name: '妖修',
        type: 'demon',
        origin: '化形的妖族，可修炼人类功法',
        characteristics: ['已化形', '智力高', '实力强'],
        abilities: ['人类功法', '妖族神通', '血脉之力'],
        weaknesses: ['化形劫', '天雷克制'],
        history: '妖修是妖族的精英',
        notableMembers: ['妖圣', '妖王'],
        relations: [],
        population: 50000000,
        territories: ['妖族圣地', '人类城市'],
        specialTraits: ['化形', '人形']
      }
    ],
    bloodlines: [
      {
        id: 'bloodline_demon_emperor',
        name: '妖皇血脉',
        type: 'divine',
        description: '继承自帝俊和东皇太一的血脉，拥有统御妖族的能力',
        origin: '帝俊和东皇太一传承',
        abilities: ['太阳真火', '太阴真水', '周天星斗', '妖皇威压'],
        awakeningConditions: ['达到化神期', '感悟星辰法则', '获得妖皇认可'],
        inheritanceRate: 0.0001,
        currentHolders: 5,
        purityLevels: [
          { level: '初醒', abilities: ['妖皇威压'], rarity: 0.4 },
          { level: '觉醒', abilities: ['妖皇威压', '太阳真火'], rarity: 0.3 },
          { level: '大成', abilities: ['妖皇威压', '太阳真火', '太阴真水'], rarity: 0.2 },
          { level: '圆满', abilities: ['妖皇威压', '太阳真火', '太阴真水', '周天星斗'], rarity: 0.1 }
        ]
      }
    ],
    cultivationAptitude: {
      '妖族功法': 1.5,
      '人类功法': 0.7,
      '剑道': 0.6,
      '丹道': 0.5,
      '器道': 0.5,
      '阵道': 0.6,
      '符道': 0.5
    },
    lifespan: 500,
    reproductionRate: 0.01,
    territorySize: 20000000,
    majorClans: ['金乌族', '玉兔族', '虎族', '狼族', '蛇族', '鹰族'],
    historicalFigures: ['帝俊', '东皇太一', '妖圣', '妖王'],
    sacredTreasures: ['河图洛书', '混沌钟', '东皇钟'],
    forbiddenTerritories: ['妖族祖地', '帝俊墓', '东皇墓'],
    alliances: ['龙族', '凤族'],
    enemies: ['巫族'],
    specialCustoms: ['化形大典', '妖王争霸', '血脉觉醒'],
    religiousBeliefs: '妖皇崇拜',
    language: '妖语',
    writingSystem: '妖文',
    calendar: '妖历',
    festivals: ['妖王节', '化形节', '血脉节']
  },
  {
    id: 'race_dragon',
    name: '龙族',
    type: 'dragon',
    origin: '上古时期由祖龙统领，龙凤大劫后衰落',
    characteristics: ['天生强大', '寿元悠久', '血脉传承', '龙威', '龙鳞'],
    abilities: ['龙息', '龙威', '龙鳞护体', '化龙之术', '水系法术'],
    weaknesses: ['龙凤大劫后遗症', '龙血诱惑'],
    history: `龙族是上古时期最强大的种族之一，由祖龙统领，统治四海。

龙凤大劫中，龙族与凤族、麒麟族展开决战，最终三败俱伤。祖龙陨落，龙族势力大衰。

中古纪元，龙族退居四海，建立了龙宫，与人类保持和平共处。

近古纪元，龙族逐渐恢复元气，但已无法恢复上古时期的辉煌。如今，龙族是东海的主宰，也是修仙界的重要势力之一。`,
    notableMembers: ['祖龙', '龙王', '龙太子'],
    relations: [
      { race: '人族', relation: 'neutral' },
      { race: '妖族', relation: 'ally' },
      { race: '凤族', relation: 'neutral' },
      { race: '麒麟族', relation: 'neutral' }
    ],
    population: 10000000,
    territories: ['东海', '南海', '西海', '北海'],
    specialTraits: ['龙鳞', '龙息', '龙威'],
    subRaces: [
      {
        id: 'race_dragon_true',
        name: '真龙',
        type: 'dragon',
        origin: '拥有纯正龙族血脉的龙',
        characteristics: ['血脉纯正', '实力强大', '数量稀少'],
        abilities: ['龙息', '龙威', '化龙', '龙鳞护体'],
        weaknesses: ['繁殖困难'],
        history: '真龙是龙族的精英',
        notableMembers: ['龙王', '龙太子'],
        relations: [],
        population: 100000,
        territories: ['龙宫'],
        specialTraits: ['真龙血脉']
      },
      {
        id: 'race_dragon_half',
        name: '亚龙',
        type: 'dragon',
        origin: '拥有部分龙族血脉的生物',
        characteristics: ['血脉不纯', '实力中等', '数量较多'],
        abilities: ['部分龙族能力'],
        weaknesses: ['血脉不稳定'],
        history: '亚龙是龙族的主体',
        notableMembers: [],
        relations: [],
        population: 9900000,
        territories: ['四海'],
        specialTraits: ['龙族血脉']
      }
    ],
    bloodlines: [
      {
        id: 'bloodline_ancestor_dragon',
        name: '祖龙血脉',
        type: 'divine',
        description: '继承自祖龙的神圣血脉，拥有开天辟地的力量',
        origin: '祖龙传承',
        abilities: ['龙之法则', '水之法则', '空间法则', '时间法则'],
        awakeningConditions: ['达到化神期', '感悟龙之法则', '获得祖龙认可'],
        inheritanceRate: 0.00001,
        currentHolders: 1,
        purityLevels: [
          { level: '初醒', abilities: ['龙威强化'], rarity: 0.3 },
          { level: '觉醒', abilities: ['龙威强化', '龙息强化'], rarity: 0.3 },
          { level: '大成', abilities: ['龙威强化', '龙息强化', '龙鳞强化'], rarity: 0.25 },
          { level: '圆满', abilities: ['龙之法则', '水之法则', '空间法则'], rarity: 0.15 }
        ]
      }
    ],
    cultivationAptitude: {
      '水系功法': 2.0,
      '空间功法': 1.5,
      '时间功法': 1.0,
      '人类功法': 0.8,
      '剑道': 0.7,
      '丹道': 0.6,
      '器道': 0.8
    },
    lifespan: 10000,
    reproductionRate: 0.001,
    territorySize: 10000000,
    majorClans: ['东海龙族', '南海龙族', '西海龙族', '北海龙族'],
    historicalFigures: ['祖龙', '历代龙王'],
    sacredTreasures: ['龙珠', '龙鳞甲', '龙枪'],
    forbiddenTerritories: ['龙族祖地', '祖龙墓'],
    alliances: ['凤族', '麒麟族'],
    enemies: [],
    specialCustoms: ['化龙大典', '龙王继位', '龙族大比'],
    religiousBeliefs: '祖龙崇拜',
    language: '龙语',
    writingSystem: '龙文',
    calendar: '龙历',
    festivals: ['龙王节', '化龙节', '龙族大比']
  },
  {
    id: 'race_phoenix',
    name: '凤族',
    type: 'phoenix',
    origin: '上古时期由元凤统领，龙凤大劫后衰落',
    characteristics: ['天生强大', '寿元悠久', '涅槃重生', '火焰掌控', '凤羽'],
    abilities: ['涅槃', '凤火', '凤羽护体', '飞行', '火系法术'],
    weaknesses: ['龙凤大劫后遗症', '凤血诱惑'],
    history: `凤族是上古时期最强大的种族之一，由元凤统领，统治不死火山。

龙凤大劫中，凤族与龙族、麒麟族展开决战，最终三败俱伤。元凤陨落，凤族势力大衰。

中古纪元，凤族退居不死火山，与人类保持和平共处。

近古纪元，凤族逐渐恢复元气，但已无法恢复上古时期的辉煌。如今，凤族是不死火山的主宰，也是修仙界的重要势力之一。`,
    notableMembers: ['元凤', '凤凰', '凤王'],
    relations: [
      { race: '人族', relation: 'neutral' },
      { race: '龙族', relation: 'neutral' },
      { race: '麒麟族', relation: 'neutral' }
    ],
    population: 5000000,
    territories: ['不死火山', '南疆密林'],
    specialTraits: ['凤羽', '凤火', '涅槃'],
    subRaces: [
      {
        id: 'race_phoenix_true',
        name: '真凤',
        type: 'phoenix',
        origin: '拥有纯正凤族血脉的凤凰',
        characteristics: ['血脉纯正', '实力强大', '可涅槃'],
        abilities: ['涅槃', '凤火', '凤羽护体'],
        weaknesses: ['繁殖困难'],
        history: '真凤是凤族的精英',
        notableMembers: ['凤王'],
        relations: [],
        population: 10000,
        territories: ['不死火山'],
        specialTraits: ['真凤血脉']
      },
      {
        id: 'race_phoenix_half',
        name: '亚凤',
        type: 'phoenix',
        origin: '拥有部分凤族血脉的生物',
        characteristics: ['血脉不纯', '实力中等', '数量较多'],
        abilities: ['部分凤族能力'],
        weaknesses: ['血脉不稳定', '无法涅槃'],
        history: '亚凤是凤族的主体',
        notableMembers: [],
        relations: [],
        population: 4990000,
        territories: ['不死火山周边'],
        specialTraits: ['凤族血脉']
      }
    ],
    bloodlines: [
      {
        id: 'bloodline_yuanfeng',
        name: '元凤血脉',
        type: 'divine',
        description: '继承自元凤的神圣血脉，拥有涅槃重生的能力',
        origin: '元凤传承',
        abilities: ['涅槃重生', '火之法则', '生命法则', '不死之身'],
        awakeningConditions: ['达到化神期', '感悟火之法则', '获得元凤认可'],
        inheritanceRate: 0.00001,
        currentHolders: 1,
        purityLevels: [
          { level: '初醒', abilities: ['凤火强化'], rarity: 0.3 },
          { level: '觉醒', abilities: ['凤火强化', '凤羽强化'], rarity: 0.3 },
          { level: '大成', abilities: ['凤火强化', '凤羽强化', '涅槃'], rarity: 0.25 },
          { level: '圆满', abilities: ['涅槃重生', '火之法则', '生命法则'], rarity: 0.15 }
        ]
      }
    ],
    cultivationAptitude: {
      '火系功法': 2.0,
      '生命功法': 1.5,
      '人类功法': 0.8,
      '剑道': 0.7,
      '丹道': 0.9,
      '器道': 0.7
    },
    lifespan: 10000,
    reproductionRate: 0.0005,
    territorySize: 5000000,
    majorClans: ['不死火山凤族'],
    historicalFigures: ['元凤', '历代凤王'],
    sacredTreasures: ['凤羽', '凤火珠', '涅槃丹'],
    forbiddenTerritories: ['凤族祖地', '元凤墓'],
    alliances: ['龙族'],
    enemies: [],
    specialCustoms: ['涅槃大典', '凤王继位', '凤族大比'],
    religiousBeliefs: '元凤崇拜',
    language: '凤语',
    writingSystem: '凤文',
    calendar: '凤历',
    festivals: ['凤王节', '涅槃节', '凤族大比']
  },
  {
    id: 'race_spirit',
    name: '灵族',
    type: 'spirit',
    origin: '天地灵气孕育而生的种族，天生亲近灵气',
    characteristics: ['天生亲近灵气', '寿元悠久', '无需修炼', '灵体', '元素亲和'],
    abilities: ['灵气操控', '元素掌控', '灵体化', '灵识感知'],
    weaknesses: ['肉身脆弱', '灵气依赖'],
    history: `灵族是天地灵气孕育而生的种族，天生亲近灵气，无需修炼即可拥有强大的实力。

上古纪元，灵族在第一次天魔大战后崛起，成为修仙界重要势力。灵族天生擅长炼器和阵法，为修仙界做出了巨大贡献。

中古纪元，灵族与人族结盟，共同发展。灵族的炼器和阵法技术传遍修仙界。

近古纪元，灵族仍然是修仙界的重要势力，与五大宗门保持着良好的关系。`,
    notableMembers: ['灵皇', '灵圣', '灵尊'],
    relations: [
      { race: '人族', relation: 'ally' },
      { race: '妖族', relation: 'neutral' },
      { race: '海族', relation: 'neutral' }
    ],
    population: 100000000,
    territories: ['灵族领地', '灵脉汇聚之地'],
    specialTraits: ['灵体', '元素亲和'],
    subRaces: [
      {
        id: 'race_spirit_elemental',
        name: '元素灵',
        type: 'spirit',
        origin: '由单一元素孕育而生',
        characteristics: ['单一元素', '实力强大', '数量稀少'],
        abilities: ['元素掌控', '元素化'],
        weaknesses: ['相克元素'],
        history: '元素灵是灵族的精英',
        notableMembers: [],
        relations: [],
        population: 10000000,
        territories: ['元素圣地'],
        specialTraits: ['元素体']
      },
      {
        id: 'race_spirit_natural',
        name: '自然灵',
        type: 'spirit',
        origin: '由自然灵气孕育而生',
        characteristics: ['自然亲和', '实力中等', '数量较多'],
        abilities: ['自然操控', '治愈'],
        weaknesses: ['污染'],
        history: '自然灵是灵族的主体',
        notableMembers: [],
        relations: [],
        population: 90000000,
        territories: ['森林', '湖泊', '山川'],
        specialTraits: ['自然体']
      }
    ],
    bloodlines: [
      {
        id: 'bloodline_spirit_king',
        name: '灵皇血脉',
        type: 'divine',
        description: '继承自灵皇的神圣血脉，拥有统御灵气的能力',
        origin: '灵皇传承',
        abilities: ['灵气法则', '元素法则', '空间法则', '灵皇威压'],
        awakeningConditions: ['达到化神期', '感悟灵气法则', '获得灵皇认可'],
        inheritanceRate: 0.0001,
        currentHolders: 3,
        purityLevels: [
          { level: '初醒', abilities: ['灵气感知强化'], rarity: 0.3 },
          { level: '觉醒', abilities: ['灵气感知强化', '元素掌控强化'], rarity: 0.3 },
          { level: '大成', abilities: ['灵气感知强化', '元素掌控强化', '灵体强化'], rarity: 0.25 },
          { level: '圆满', abilities: ['灵气法则', '元素法则', '空间法则'], rarity: 0.15 }
        ]
      }
    ],
    cultivationAptitude: {
      '灵系功法': 2.0,
      '元素功法': 1.8,
      '阵道': 2.0,
      '器道': 2.0,
      '丹道': 1.5,
      '剑道': 0.8,
      '人类功法': 0.6
    },
    lifespan: 5000,
    reproductionRate: 0.005,
    territorySize: 10000000,
    majorClans: ['元素灵族', '自然灵族', '空间灵族'],
    historicalFigures: ['灵皇', '灵圣', '灵尊'],
    sacredTreasures: ['灵皇印', '元素珠', '空间石'],
    forbiddenTerritories: ['灵族祖地', '灵皇墓'],
    alliances: ['人族'],
    enemies: [],
    specialCustoms: ['灵气大典', '灵皇继位', '灵族大比'],
    religiousBeliefs: '天地崇拜',
    language: '灵语',
    writingSystem: '灵文',
    calendar: '灵历',
    festivals: ['灵皇节', '元素节', '灵族大比']
  },
  {
    id: 'race_sea',
    name: '海族',
    type: 'aquatic',
    origin: '生活在海洋中的种族，由海皇统领',
    characteristics: ['水生', '寿元悠久', '水系亲和', '深海适应', '声呐感知'],
    abilities: ['水系法术', '深海生存', '声呐感知', '水流操控'],
    weaknesses: ['陆地行动受限', '干旱'],
    history: `海族是生活在海洋中的种族，由海皇统领，统治四海。

上古纪元，海族与龙族关系密切，龙族是海族的守护者。

中古纪元，海族建立了海底城市，发展出独特的海洋文明。

近古纪元，海族与人类保持着贸易往来，是修仙界的重要势力之一。`,
    notableMembers: ['海皇', '海王', '海将'],
    relations: [
      { race: '人族', relation: 'neutral' },
      { race: '龙族', relation: 'ally' },
      { race: '妖族', relation: 'neutral' }
    ],
    population: 200000000,
    territories: ['东海海底', '南海海底', '西海海底', '北海海底'],
    specialTraits: ['水生', '深海适应'],
    subRaces: [
      {
        id: 'race_sea_mermaid',
        name: '人鱼族',
        type: 'aquatic',
        origin: '半人半鱼的种族',
        characteristics: ['美丽', '歌声动人', '水系亲和'],
        abilities: ['歌声魅惑', '水系法术'],
        weaknesses: ['陆地行动受限'],
        history: '人鱼族是海族的精英',
        notableMembers: [],
        relations: [],
        population: 50000000,
        territories: ['珊瑚海'],
        specialTraits: ['人鱼形态']
      },
      {
        id: 'race_sea_kraken',
        name: '海妖族',
        type: 'aquatic',
        origin: '海洋中的强大生物',
        characteristics: ['体型巨大', '实力强大', '数量稀少'],
        abilities: ['海啸', '漩涡', '深海压力'],
        weaknesses: ['陆地无法生存'],
        history: '海妖族是海族的守护者',
        notableMembers: [],
        relations: [],
        population: 1000000,
        territories: ['深海'],
        specialTraits: ['巨大体型']
      }
    ],
    bloodlines: [
      {
        id: 'bloodline_sea_emperor',
        name: '海皇血脉',
        type: 'divine',
        description: '继承自海皇的神圣血脉，拥有统御海洋的能力',
        origin: '海皇传承',
        abilities: ['水之法则', '海洋法则', '生命法则', '海皇威压'],
        awakeningConditions: ['达到化神期', '感悟水之法则', '获得海皇认可'],
        inheritanceRate: 0.0001,
        currentHolders: 1,
        purityLevels: [
          { level: '初醒', abilities: ['水系强化'], rarity: 0.3 },
          { level: '觉醒', abilities: ['水系强化', '深海适应强化'], rarity: 0.3 },
          { level: '大成', abilities: ['水系强化', '深海适应强化', '海洋操控'], rarity: 0.25 },
          { level: '圆满', abilities: ['水之法则', '海洋法则', '生命法则'], rarity: 0.15 }
        ]
      }
    ],
    cultivationAptitude: {
      '水系功法': 2.0,
      '冰系功法': 1.5,
      '人类功法': 0.7,
      '剑道': 0.6,
      '丹道': 0.7,
      '器道': 0.8
    },
    lifespan: 1000,
    reproductionRate: 0.01,
    territorySize: 300000000,
    majorClans: ['人鱼族', '海妖族', '贝壳族', '海蛇族'],
    historicalFigures: ['海皇', '历代海王'],
    sacredTreasures: ['海皇印', '定海神针', '避水珠'],
    forbiddenTerritories: ['海族祖地', '海皇墓'],
    alliances: ['龙族'],
    enemies: [],
    specialCustoms: ['海皇大典', '海王继位', '海族大比'],
    religiousBeliefs: '海神崇拜',
    language: '海语',
    writingSystem: '海文',
    calendar: '海历',
    festivals: ['海皇节', '海神节', '海族大比']
  },
  {
    id: 'race_witch',
    name: '巫族',
    type: 'ancient',
    origin: '继承盘古血脉的种族，由十二祖巫统领',
    characteristics: ['肉身强大', '不修元神', '血脉传承', '巫术', '图腾'],
    abilities: ['巫术', '图腾之力', '肉身强化', '都天神煞大阵'],
    weaknesses: ['无法修炼元神', '无法飞升'],
    history: `巫族是继承盘古血脉的种族，由十二祖巫统领，天生肉身强大，不修元神。

巫妖量劫中，巫族与妖族展开决战，最终两败俱伤。十二祖巫陨落，巫族势力大衰。

中古纪元，巫族退居北荒原，与人类保持距离。

近古纪元，巫族逐渐恢复元气，但已无法恢复上古时期的辉煌。如今，巫族是北荒原的主宰，也是修仙界的神秘势力之一。`,
    notableMembers: ['十二祖巫', '巫王', '巫师'],
    relations: [
      { race: '人族', relation: 'neutral' },
      { race: '妖族', relation: 'enemy' }
    ],
    population: 50000000,
    territories: ['北荒原', '巫族圣地'],
    specialTraits: ['盘古血脉', '巫术', '图腾'],
    subRaces: [
      {
        id: 'race_witch_twelve',
        name: '十二巫族',
        type: 'ancient',
        origin: '十二祖巫的后裔',
        characteristics: ['血脉纯正', '实力强大', '数量稀少'],
        abilities: ['祖巫之力', '都天神煞'],
        weaknesses: ['血脉觉醒困难'],
        history: '十二巫族是巫族的精英',
        notableMembers: [],
        relations: [],
        population: 1000000,
        territories: ['巫族圣地'],
        specialTraits: ['祖巫血脉']
      },
      {
        id: 'race_witch_common',
        name: '普通巫族',
        type: 'ancient',
        origin: '普通巫族',
        characteristics: ['血脉不纯', '实力中等', '数量较多'],
        abilities: ['巫术', '图腾之力'],
        weaknesses: ['无法觉醒祖巫血脉'],
        history: '普通巫族是巫族的主体',
        notableMembers: [],
        relations: [],
        population: 49000000,
        territories: ['北荒原'],
        specialTraits: ['巫族血脉']
      }
    ],
    bloodlines: [
      {
        id: 'bloodline_pangu',
        name: '盘古血脉',
        type: 'divine',
        description: '继承自盘古大神的神圣血脉，拥有开天辟地的力量',
        origin: '盘古大神传承',
        abilities: ['力之法则', '肉身法则', '开天辟地', '身化万物'],
        awakeningConditions: ['达到化神期', '感悟力之法则', '获得盘古认可'],
        inheritanceRate: 0.00001,
        currentHolders: 0,
        purityLevels: [
          { level: '初醒', abilities: ['肉身强化'], rarity: 0.3 },
          { level: '觉醒', abilities: ['肉身强化', '巫术强化'], rarity: 0.3 },
          { level: '大成', abilities: ['肉身强化', '巫术强化', '图腾之力'], rarity: 0.25 },
          { level: '圆满', abilities: ['力之法则', '肉身法则', '开天辟地'], rarity: 0.15 }
        ]
      }
    ],
    cultivationAptitude: {
      '巫术': 2.0,
      '肉身功法': 2.0,
      '图腾术': 2.0,
      '人类功法': 0.3,
      '剑道': 0.5,
      '丹道': 0.4,
      '器道': 0.5
    },
    lifespan: 500,
    reproductionRate: 0.005,
    territorySize: 15000000,
    majorClans: ['十二巫族', '普通巫族'],
    historicalFigures: ['十二祖巫', '历代巫王'],
    sacredTreasures: ['盘古斧碎片', '十二都天旗', '巫族图腾'],
    forbiddenTerritories: ['巫族祖地', '祖巫墓'],
    alliances: [],
    enemies: ['妖族'],
    specialCustoms: ['巫术大典', '巫王继位', '巫族大比', '图腾觉醒'],
    religiousBeliefs: '盘古崇拜',
    language: '巫语',
    writingSystem: '巫文',
    calendar: '巫历',
    festivals: ['盘古节', '祖巫节', '巫族大比']
  },
  {
    id: 'race_demon_magi',
    name: '魔族',
    type: 'demon',
    origin: '域外天魔，从虚空裂缝中入侵',
    characteristics: ['嗜血', '残忍', '力量强大', '魔气', '堕落'],
    abilities: ['魔气操控', '堕落之术', '血祭', '魔化'],
    weaknesses: ['正道克制', '佛光克制', '雷劫克制'],
    history: `魔族是域外天魔，从虚空裂缝中入侵青云大陆。

上古纪元，天魔皇率领域外天魔大军入侵，引发第一次天魔大战。最终被青云仙尊封印。

中古纪元，天魔封印松动，域外天魔再次入侵，引发第二次天魔大战。正魔两道联手抗敌，最终加固封印。

近古纪元，魔族势力潜伏在魔域，伺机而动。`,
    notableMembers: ['天魔皇', '魔将', '魔帅'],
    relations: [
      { race: '人族', relation: 'enemy' },
      { race: '妖族', relation: 'neutral' }
    ],
    population: 100000000,
    territories: ['魔域', '虚空裂缝'],
    specialTraits: ['魔气', '堕落'],
    subRaces: [
      {
        id: 'race_demon_heavenly',
        name: '天魔',
        type: 'demon',
        origin: '域外天魔',
        characteristics: ['实力强大', '智慧高', '数量稀少'],
        abilities: ['天魔功', '堕落之术', '魔域'],
        weaknesses: ['封印'],
        history: '天魔是魔族的精英',
        notableMembers: ['天魔皇'],
        relations: [],
        population: 1000000,
        territories: ['魔域深处'],
        specialTraits: ['天魔血脉']
      },
      {
        id: 'race_demon_common',
        name: '普通魔族',
        type: 'demon',
        origin: '魔气孕育而生',
        characteristics: ['实力中等', '智慧低', '数量众多'],
        abilities: ['魔气操控', '嗜血'],
        weaknesses: ['正道克制'],
        history: '普通魔族是魔族的主体',
        notableMembers: [],
        relations: [],
        population: 99000000,
        territories: ['魔域外围'],
        specialTraits: ['魔气']
      }
    ],
    bloodlines: [
      {
        id: 'bloodline_demon_emperor',
        name: '天魔血脉',
        type: 'divine',
        description: '继承自天魔皇的神圣血脉，拥有统御魔族的能力',
        origin: '天魔皇传承',
        abilities: ['魔之法则', '堕落法则', '虚空法则', '天魔威压'],
        awakeningConditions: ['达到化神期', '感悟魔之法则', '获得天魔皇认可'],
        inheritanceRate: 0.0001,
        currentHolders: 1,
        purityLevels: [
          { level: '初醒', abilities: ['魔气强化'], rarity: 0.3 },
          { level: '觉醒', abilities: ['魔气强化', '堕落之术'], rarity: 0.3 },
          { level: '大成', abilities: ['魔气强化', '堕落之术', '魔域'], rarity: 0.25 },
          { level: '圆满', abilities: ['魔之法则', '堕落法则', '虚空法则'], rarity: 0.15 }
        ]
      }
    ],
    cultivationAptitude: {
      '魔道功法': 2.0,
      '血道功法': 1.8,
      '人类功法': 0.5,
      '剑道': 0.6,
      '丹道': 0.4,
      '器道': 0.5
    },
    lifespan: 1000,
    reproductionRate: 0.02,
    territorySize: 10000000,
    majorClans: ['天魔族', '血魔族', '幽冥族', '万毒族'],
    historicalFigures: ['天魔皇', '历代魔将'],
    sacredTreasures: ['天魔珠', '天魔幡', '堕落之冠'],
    forbiddenTerritories: ['魔族祖地', '天魔皇封印之地'],
    alliances: [],
    enemies: ['人族', '正道'],
    specialCustoms: ['魔化大典', '魔将继位', '魔族大比'],
    religiousBeliefs: '天魔崇拜',
    language: '魔语',
    writingSystem: '魔文',
    calendar: '魔历',
    festivals: ['天魔节', '堕落节', '魔族大比']
  }
]

export const divineBeasts: DivineBeast[] = [
  {
    id: 'beast_azure_dragon',
    name: '青龙',
    type: 'azure_dragon',
    rank: 'divine',
    description: '四象神兽之一，东方之神，掌管木之法则。青龙身长万丈，鳞甲如翡翠，双目如日月，呼风唤雨，腾云驾雾。',
    history: `青龙是四象神兽之一，在上古时期就已经存在。传说青龙是由祖龙的精血化形而成，拥有部分祖龙的能力。

上古纪元，青龙曾经帮助人族抵抗天魔入侵，立下赫赫战功。后来青龙隐居于东海深处，不再出世。

中古纪元，青龙偶尔现身，帮助有缘人。据说青云仙尊曾经得到青龙的指点，领悟了云之大道。

近古纪元，青龙再也没有出现过，但传说它仍然在东海深处沉睡。`,
    abilities: ['木之法则', '风之法则', '雷之法则', '云雨操控', '龙威', '龙息'],
    innateSkills: ['青龙之息', '风雷双翼', '木系神通', '云雨大法'],
    bloodline: '祖龙血脉',
    lifespan: 1000000,
    reproduction: '万年一产卵，孵化需千年',
    habitat: ['东海深处', '青龙秘境', '灵木圣地'],
    diet: '天地灵气，千年灵木',
    behavior: '高傲，不轻易出手，喜欢帮助有缘人',
    relationship: [
      { race: '龙族', relation: '同源' },
      { race: '人族', relation: '友善' },
      { race: '妖族', relation: '中立' }
    ],
    currentStatus: 'rare',
    notableMembers: ['青龙老祖'],
    sacredTreasures: ['青龙珠', '青龙鳞甲', '木神珠'],
    cultivationSpeed: 10,
    maxRealm: '圣人'
  },
  {
    id: 'beast_white_tiger',
    name: '白虎',
    type: 'white_tiger',
    rank: 'divine',
    description: '四象神兽之一，西方之神，掌管金之法则。白虎身长千丈，毛色如雪，双目如金灯，杀气冲天，庚金之气凝聚。',
    history: `白虎是四象神兽之一，在上古时期就已经存在。传说白虎是由天地庚金之气化形而成，拥有无与伦比的杀伐之力。

上古纪元，白虎曾经帮助万剑真人领悟剑道，后来隐居于西荒。

中古纪元，白虎偶尔现身，帮助有缘人。据说万剑真人曾经得到白虎的指点，领悟了剑道至理。

近古纪元，白虎再也没有出现过，但传说它仍然在西荒沉睡。`,
    abilities: ['金之法则', '杀伐法则', '庚金之气', '虎威', '虎啸'],
    innateSkills: ['白虎杀伐', '庚金神光', '金系神通', '杀伐领域'],
    bloodline: '天地庚金',
    lifespan: 1000000,
    reproduction: '万年一产卵，孵化需千年',
    habitat: ['西荒', '白虎秘境', '金矿圣地'],
    diet: '天地灵气，千年金矿',
    behavior: '凶猛，杀伐果断，喜欢帮助剑修',
    relationship: [
      { race: '人族', relation: '友善' },
      { race: '妖族', relation: '中立' }
    ],
    currentStatus: 'rare',
    notableMembers: ['白虎老祖'],
    sacredTreasures: ['白虎珠', '白虎爪', '杀伐剑'],
    cultivationSpeed: 10,
    maxRealm: '圣人'
  },
  {
    id: 'beast_vermilion_bird',
    name: '朱雀',
    type: 'vermilion_bird',
    rank: 'divine',
    description: '四象神兽之一，南方之神，掌管火之法则。朱雀身长千丈，羽翼如火，双目如红宝石，南明离火环绕，焚天煮海。',
    history: `朱雀是四象神兽之一，在上古时期就已经存在。传说朱雀是由元凤的精血化形而成，拥有部分元凤的能力。

上古纪元，朱雀曾经帮助丹霞仙子领悟丹道，后来隐居于南疆。

中古纪元，朱雀偶尔现身，帮助有缘人。据说丹霞仙子曾经得到朱雀的指点，领悟了丹道至理。

近古纪元，朱雀再也没有出现过，但传说它仍然在南疆沉睡。`,
    abilities: ['火之法则', '南明离火', '涅槃重生', '凤威', '凤火'],
    innateSkills: ['朱雀之火', '南明离火', '火系神通', '涅槃大法'],
    bloodline: '元凤血脉',
    lifespan: 1000000,
    reproduction: '万年一产卵，孵化需千年',
    habitat: ['南疆', '朱雀秘境', '火山圣地'],
    diet: '天地灵气，千年火焰',
    behavior: '高傲，不轻易出手，喜欢帮助火修',
    relationship: [
      { race: '凤族', relation: '同源' },
      { race: '人族', relation: '友善' },
      { race: '妖族', relation: '中立' }
    ],
    currentStatus: 'rare',
    notableMembers: ['朱雀老祖'],
    sacredTreasures: ['朱雀珠', '朱雀羽', '离火珠'],
    cultivationSpeed: 10,
    maxRealm: '圣人'
  },
  {
    id: 'beast_black_tortoise',
    name: '玄武',
    type: 'black_tortoise',
    rank: 'divine',
    description: '四象神兽之一，北方之神，掌管水之法则。玄武身长千丈，龟蛇合体，背甲如黑玉，双目如深渊，冥水环绕，防御无双。',
    history: `玄武是四象神兽之一，在上古时期就已经存在。传说玄武是由天地冥水之气化形而成，拥有无与伦比的防御之力。

上古纪元，玄武曾经帮助人族抵抗天魔入侵，立下赫赫战功。后来玄武隐居于北海深处。

中古纪元，玄武偶尔现身，帮助有缘人。据说有修士曾经得到玄武的指点，领悟了防御之道。

近古纪元，玄武再也没有出现过，但传说它仍然在北海深处沉睡。`,
    abilities: ['水之法则', '冰之法则', '防御法则', '冥水', '龟甲防御'],
    innateSkills: ['玄武之盾', '冥水神光', '水系神通', '防御领域'],
    bloodline: '天地冥水',
    lifespan: 1000000,
    reproduction: '万年一产卵，孵化需千年',
    habitat: ['北海', '玄武秘境', '冰原圣地'],
    diet: '天地灵气，千年寒冰',
    behavior: '沉稳，不轻易出手，喜欢帮助防御型修士',
    relationship: [
      { race: '海族', relation: '友善' },
      { race: '人族', relation: '友善' },
      { race: '妖族', relation: '中立' }
    ],
    currentStatus: 'rare',
    notableMembers: ['玄武老祖'],
    sacredTreasures: ['玄武珠', '玄武甲', '冥水珠'],
    cultivationSpeed: 10,
    maxRealm: '圣人'
  },
  {
    id: 'beast_qilin',
    name: '麒麟',
    type: 'qilin',
    rank: 'divine',
    description: '瑞兽之王，天地祥瑞的象征。麒麟身长百丈，龙首鹿身牛尾马蹄，浑身鳞甲，五彩祥云环绕，行走踏地生花。',
    history: `麒麟是瑞兽之王，在上古时期就已经存在。传说麒麟是由天地祥瑞之气化形而成，拥有不可思议的造化之力。

上古纪元，麒麟族曾经是天地间最强大的种族之一，与龙族、凤族并称三大神兽种族。龙凤大劫中，麒麟族几乎灭绝，只有少数麒麟存活。

中古纪元，麒麟偶尔现身，带来祥瑞。据说有修士曾经得到麒麟的指点，领悟了造化之道。

近古纪元，麒麟再也没有出现过，但传说它仍然在某处沉睡。`,
    abilities: ['造化法则', '祥瑞之力', '五行法则', '仁德之力', '踏地生花'],
    innateSkills: ['麒麟之瑞', '造化神光', '五行神通', '祥瑞领域'],
    bloodline: '天地祥瑞',
    lifespan: 1000000,
    reproduction: '万年一产卵，孵化需千年',
    habitat: ['麒麟秘境', '祥瑞之地', '灵脉汇聚之地'],
    diet: '天地灵气，祥瑞之气',
    behavior: '仁慈，不轻易出手，喜欢帮助有德之人',
    relationship: [
      { race: '人族', relation: '友善' },
      { race: '妖族', relation: '中立' }
    ],
    currentStatus: 'endangered',
    notableMembers: ['麒麟老祖'],
    sacredTreasures: ['麒麟珠', '麒麟角', '造化珠'],
    cultivationSpeed: 10,
    maxRealm: '圣人'
  },
  {
    id: 'beast_kunpeng',
    name: '鲲鹏',
    type: 'kunpeng',
    rank: 'divine',
    description: '上古神兽，可化鲲化鹏，扶摇直上九万里。鲲鹏体型巨大，鲲形态如巨鲸，鹏形态如大鹏，速度无双，空间法则掌控者。',
    history: `鲲鹏是上古神兽，在上古时期就已经存在。传说鲲鹏是由混沌之气化形而成，拥有不可思议的速度和空间之力。

上古纪元，鲲鹏曾经帮助人族抵抗天魔入侵，立下赫赫战功。后来鲲鹏隐居于北海深处。

中古纪元，鲲鹏偶尔现身，帮助有缘人。据说有修士曾经得到鲲鹏的指点，领悟了空间之道。

近古纪元，鲲鹏再也没有出现过，但传说它仍然在北海深处沉睡。`,
    abilities: ['空间法则', '速度法则', '风之法则', '水之法则', '扶摇直上'],
    innateSkills: ['鲲鹏之变', '空间穿梭', '风系神通', '水系神通'],
    bloodline: '混沌之气',
    lifespan: 1000000,
    reproduction: '万年一产卵，孵化需千年',
    habitat: ['北海', '鲲鹏秘境', '空间裂缝'],
    diet: '天地灵气，空间碎片',
    behavior: '自由，不轻易出手，喜欢帮助空间修士',
    relationship: [
      { race: '人族', relation: '友善' },
      { race: '妖族', relation: '中立' }
    ],
    currentStatus: 'rare',
    notableMembers: ['鲲鹏老祖'],
    sacredTreasures: ['鲲鹏珠', '鲲鹏羽', '空间珠'],
    cultivationSpeed: 10,
    maxRealm: '圣人'
  }
]

export const spiritVeins: SpiritVein[] = [
  {
    id: 'vein_qingyun_main',
    name: '青云主脉',
    type: 'heaven',
    grade: 1,
    description: '青云山脉的主灵脉，是青云大陆最强大的灵脉之一。灵气浓郁如雾，常年云雾缭绕，是修炼的绝佳之地。',
    location: '青云山脉主峰',
    spiritDensity: 10,
    area: 1000,
    output: 100000,
    controller: '青云宗',
    history: `青云主脉是上古时期青云仙尊发现的。青云仙尊在此建立青云宗，利用灵脉的灵气修炼，最终成为上古第一人。

青云主脉经过万年的开采，仍然灵气充沛。据说青云主脉连接着地底深处的仙脉，源源不断地提供灵气。`,
    resources: ['极品灵石', '仙材', '灵草', '灵矿'],
    dangers: ['灵兽', '禁制', '阵法'],
    connectedVeins: ['青云支脉一', '青云支脉二', '青云支脉三'],
    formation: '青云聚灵大阵',
    status: 'active'
  },
  {
    id: 'vein_xuantian_main',
    name: '玄天主脉',
    type: 'heaven',
    grade: 1,
    description: '玄天山脉的主灵脉，是青云大陆最强大的灵脉之一。灵气玄妙，蕴含天地至理，是领悟大道的绝佳之地。',
    location: '玄天山脉主峰',
    spiritDensity: 9,
    area: 800,
    output: 80000,
    controller: '玄天宗',
    history: `玄天主脉是上古时期玄天老祖发现的。玄天老祖在此建立玄天宗，利用灵脉的灵气修炼，最终成为上古大能。

玄天主脉的灵气玄妙，可以帮助修士领悟大道。据说玄天老祖就是在此领悟了玄妙之道。`,
    resources: ['极品灵石', '玄铁矿', '玄妙灵草'],
    dangers: ['灵兽', '禁制', '阵法'],
    connectedVeins: ['玄天支脉一', '玄天支脉二'],
    formation: '玄天聚灵大阵',
    status: 'active'
  },
  {
    id: 'vein_wanjian_main',
    name: '万剑主脉',
    type: 'heaven',
    grade: 2,
    description: '万剑峰的主灵脉，灵气中蕴含剑意，是剑修的修炼圣地。',
    location: '万剑峰',
    spiritDensity: 8,
    area: 500,
    output: 50000,
    controller: '万剑门',
    history: `万剑主脉是上古时期万剑真人发现的。万剑真人在此建立万剑门，利用灵脉的剑意修炼，最终成为剑道第一人。

万剑主脉的灵气中蕴含剑意，可以帮助剑修领悟剑道。据说万剑真人就是在此领悟了万剑归宗。`,
    resources: ['上品灵石', '剑意石', '剑灵草'],
    dangers: ['剑灵', '剑阵', '剑气'],
    connectedVeins: ['万剑支脉一', '万剑支脉二'],
    formation: '万剑聚灵大阵',
    status: 'active'
  },
  {
    id: 'vein_danxia_main',
    name: '丹霞主脉',
    type: 'heaven',
    grade: 2,
    description: '丹霞谷的主灵脉，灵气中蕴含火之精华，是丹修的修炼圣地。',
    location: '丹霞谷',
    spiritDensity: 8,
    area: 600,
    output: 60000,
    controller: '丹霞谷',
    history: `丹霞主脉是上古时期丹霞仙子发现的。丹霞仙子在此建立丹霞谷，利用灵脉的火之精华炼丹，最终成为丹道第一人。

丹霞主脉的灵气中蕴含火之精华，可以帮助丹修炼制更好的丹药。据说丹霞仙子就是在此炼制出了无数神丹。`,
    resources: ['上品灵石', '火精', '灵草'],
    dangers: ['火灵', '火阵', '地火'],
    connectedVeins: ['丹霞支脉一', '丹霞支脉二'],
    formation: '丹霞聚灵大阵',
    status: 'active'
  },
  {
    id: 'vein_yushou_main',
    name: '御兽主脉',
    type: 'heaven',
    grade: 2,
    description: '御兽山的主灵脉，灵气中蕴含生命之力，是御兽修士的修炼圣地。',
    location: '御兽山',
    spiritDensity: 7,
    area: 700,
    output: 70000,
    controller: '御兽山',
    history: `御兽主脉是上古时期御兽真人发现的。御兽真人在此建立御兽山，利用灵脉的生命之力培育灵兽，最终成为御兽第一人。

御兽主脉的灵气中蕴含生命之力，可以帮助灵兽成长。据说御兽真人就是在此培育出了无数强大的灵兽。`,
    resources: ['上品灵石', '生命精华', '灵草'],
    dangers: ['灵兽', '兽阵', '生命禁制'],
    connectedVeins: ['御兽支脉一', '御兽支脉二'],
    formation: '御兽聚灵大阵',
    status: 'active'
  },
  {
    id: 'vein_dragon_palace',
    name: '龙宫灵脉',
    type: 'heaven',
    grade: 1,
    description: '东海龙宫的灵脉，是海底最强大的灵脉之一。灵气中蕴含水之精华，是水修的修炼圣地。',
    location: '东海龙宫',
    spiritDensity: 9,
    area: 2000,
    output: 150000,
    controller: '龙族',
    history: `龙宫灵脉是上古时期祖龙发现的。祖龙在此建立龙宫，利用灵脉的水之精华修炼，最终成为龙族始祖。

龙宫灵脉的灵气中蕴含水之精华，可以帮助水修修炼。据说历代龙王都是在此修炼成仙。`,
    resources: ['极品灵石', '水精', '海灵草'],
    dangers: ['海兽', '水阵', '龙威'],
    connectedVeins: ['东海支脉一', '东海支脉二', '东海支脉三'],
    formation: '龙宫聚灵大阵',
    status: 'active'
  },
  {
    id: 'vein_phoenix_volcano',
    name: '不死火山灵脉',
    type: 'heaven',
    grade: 1,
    description: '不死火山的灵脉，是凤族的修炼圣地。灵气中蕴含火之精华和生命之力，是火修和生命修士的修炼圣地。',
    location: '不死火山',
    spiritDensity: 9,
    area: 1500,
    output: 120000,
    controller: '凤族',
    history: `不死火山灵脉是上古时期元凤发现的。元凤在此建立凤族圣地，利用灵脉的火之精华和生命之力修炼，最终成为凤族始祖。

不死火山灵脉的灵气中蕴含火之精华和生命之力，可以帮助火修和生命修士修炼。据说历代凤王都是在此涅槃重生。`,
    resources: ['极品灵石', '火精', '涅槃草'],
    dangers: ['火灵', '火阵', '凤威'],
    connectedVeins: ['不死火山支脉一', '不死火山支脉二'],
    formation: '凤族聚灵大阵',
    status: 'active'
  },
  {
    id: 'vein_witch_sacred',
    name: '巫族圣脉',
    type: 'heaven',
    grade: 2,
    description: '巫族圣地的灵脉，是巫族的修炼圣地。灵气中蕴含盘古血脉之力，是巫族修士的修炼圣地。',
    location: '北荒原巫族圣地',
    spiritDensity: 8,
    area: 1000,
    output: 80000,
    controller: '巫族',
    history: `巫族圣脉是上古时期十二祖巫发现的。十二祖巫在此建立巫族圣地，利用灵脉的盘古血脉之力修炼，最终成为巫族始祖。

巫族圣脉的灵气中蕴含盘古血脉之力，可以帮助巫族修士修炼。据说历代巫王都是在此觉醒祖巫血脉。`,
    resources: ['上品灵石', '盘古血石', '巫草'],
    dangers: ['巫兽', '巫阵', '祖巫威压'],
    connectedVeins: ['巫族支脉一', '巫族支脉二'],
    formation: '巫族聚灵大阵',
    status: 'active'
  }
]

export const secretRealms: SecretRealm[] = [
  {
    id: 'realm_qingyun_inheritance',
    name: '青云传承秘境',
    type: 'ancient',
    rank: 'immortal',
    description: '青云仙尊留下的传承秘境，藏有青云诀真本和青云剑。只有拥有青云令的人才能进入。',
    history: `青云传承秘境是青云仙尊在上古纪元建立的。青云仙尊预感到自己即将陨落，便将毕生传承封印在此秘境中。

近古纪元，青云令曾经现世，有修士进入秘境获得了部分传承。但青云诀真本和青云剑仍然在秘境深处。`,
    location: '青云山脉深处',
    size: 10000,
    entranceConditions: ['拥有青云令', '达到结丹期', '通过青云试炼'],
    timeFlow: 0.1,
    spiritDensity: 20,
    dangers: ['青云禁制', '青云剑灵', '心魔试炼'],
    treasures: ['青云诀真本', '青云剑', '青云仙尊遗物'],
    inheritances: ['青云诀完整传承', '青云剑诀', '云海神通'],
    guardians: ['青云剑灵', '青云守护者'],
    openingCycle: 0,
    lastOpening: 1000,
    nextOpening: 0,
    currentExplorers: 0,
    maxExplorers: 1,
    deathRate: 0.3
  },
  {
    id: 'realm_dragon_tomb',
    name: '龙族墓地',
    type: 'ancient',
    rank: 'immortal',
    description: '上古龙族的墓地，藏有龙族传承和龙族宝物。只有拥有龙族血脉的人才能进入。',
    history: `龙族墓地是上古时期龙族建立的。龙凤大劫后，无数龙族陨落，被埋葬于此。

中古纪元，有龙族后裔进入墓地，获得了龙族传承。但墓地深处仍然有更强大的传承。`,
    location: '