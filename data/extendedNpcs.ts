import { NPC, NPCRelation, NPCSchedule, NPCDialogue, NPCQuest, NPCShop, NPCService } from './enhancedNpcs'

export interface ExtendedNPC extends NPC {
  title?: string
  alias?: string[]
  age?: number
  birthplace?: string
  bloodline?: string
  specialPhysique?: string
  specialTalent?: string
  lifeExperience?: string[]
  majorEvents?: string[]
  hiddenAgenda?: string[]
  secrets?: string[]
  disciples?: string[]
  master?: string
  friends?: string[]
  enemies?: string[]
  loveInterest?: string[]
  family?: FamilyMember[]
  possessions?: string[]
  inheritance?: InheritanceInfo
  legend?: string
  currentStatus?: string
  lastAppearance?: string
  futurePlans?: string[]
}

export interface FamilyMember {
  relation: string
  name: string
  cultivation?: string
  status?: string
}

export interface InheritanceInfo {
  type: 'lineage' | 'opportunity' | 'self_created'
  source: string
  generation?: number
  specialFeatures?: string[]
}

export interface HistoricalFigure {
  id: string
  name: string
  title: string
  era: string
  cultivation: string
  achievements: string[]
  legacy: string
  descendants?: string[]
  artifacts?: string[]
  legends: string[]
  death?: string
  influence: string
}

export interface ReclusiveExpert {
  id: string
  name: string
  title: string
  cultivation: string
  location: string
  specialty: string[]
  personality: string
  background: string
  requirements: string[]
  rewards: string[]
  danger: string
  rumors: string[]
}

export interface Inheritor {
  id: string
  name: string
  title: string
  cultivation: string
  inheritance: string
  location: string
  requirements: string[]
  tests: InheritanceTest[]
  rewards: string[]
  history: string
}

export interface InheritanceTest {
  name: string
  description: string
  difficulty: string
  requirements: string[]
  rewards?: string[]
}

export const extendedNpcs: ExtendedNPC[] = [
  {
    id: 'npc_qingyun_ancestor',
    name: '青云仙尊',
    title: '青云宗开山祖师',
    alias: ['云尊', '青云真人', '云中仙'],
    age: 5000,
    birthplace: '青云山',
    bloodline: '青云血脉',
    specialPhysique: '天灵体',
    specialTalent: '云之大道',
    description: `青云宗的开山祖师，上古时期最伟大的修士之一。青云仙尊以云之大道闻名于世，创立了青云宗和青云大阵。

青云仙尊一生传奇，从一名普通凡人成长为渡劫期大能。他创立的青云宗至今仍是青云大陆最顶尖的宗门之一。

上古纪元末期，青云仙尊联合多位大能封印了天魔皇，为青云大陆带来了数千年的和平。`,
    lifeExperience: [
      '出生于青云山脚下的凡人村落',
      '十六岁时觉醒天灵体，开始修炼',
      '三十岁时突破筑基期，拜入玄天宗',
      '百岁时突破结丹期，离开玄天宗云游',
      '三百岁时突破元婴期，领悟云之大道',
      '五百岁时突破化神期，创立青云宗',
      '千岁时突破炼虚期，布置青云大阵',
      '三千岁时突破渡劫期，封印天魔皇',
      '五千岁时飞升仙界'
    ],
    majorEvents: [
      '创立青云宗',
      '布置青云大阵',
      '封印天魔皇',
      '培养数名化神期弟子',
      '留下青云传承'
    ],
    hiddenAgenda: ['寻找飞升之路', '保护青云大陆'],
    secrets: ['天魔皇封印的秘密', '青云传承的真正含义', '仙界的真相'],
    disciples: ['云霄真人', '云中子', '云霞仙子', '云风真人', '云雷真人'],
    master: '玄天老祖',
    friends: ['玄天老祖', '万剑真人', '丹霞仙子', '五行真人'],
    enemies: ['天魔皇', '魔道势力'],
    family: [
      { relation: '父亲', name: '李青云', status: '凡人，已故' },
      { relation: '母亲', name: '王氏', status: '凡人，已故' }
    ],
    possessions: ['青云剑', '云海珠', '青云印', '云纹鼎'],
    inheritance: {
      type: 'self_created',
      source: '云之大道',
      generation: 1,
      specialFeatures: ['云系功法', '青云血脉', '青云大阵']
    },
    legend: `青云仙尊的传说流传千古。据说他出生时，青云山上空出现祥云，因此得名"青云"。

他一生追求云之大道，最终领悟了"云化万物"的至高境界。他的青云诀可以模拟各种属性的真元，是一门极其玄妙的功法。

封印天魔皇后，青云仙尊在青云山闭关千年，最终飞升仙界。临走前，他留下了青云传承，等待有缘人继承。`,
    currentStatus: '已飞升仙界',
    lastAppearance: '上古纪元末期',
    futurePlans: ['等待青云传承者', '关注青云大陆'],
    cultivation: '渡劫期',
    faction: '青云宗',
    location: '青云山',
    role: '开山祖师',
    personality: ['慈祥', '睿智', '淡泊名利', '护短'],
    dialogues: [],
    quests: [],
    relations: [
      { target: 'sect_qingyun', type: 'founder', description: '创立青云宗' },
      { target: 'npc_tianmo_emperor', type: 'enemy', description: '封印天魔皇' }
    ],
    schedule: [],
    shop: undefined,
    services: []
  },
  {
    id: 'npc_yunxiao',
    name: '云霄真人',
    title: '青云宗现任宗主',
    alias: ['云宗主', '霄真人'],
    age: 800,
    birthplace: '青云城',
    bloodline: '青云血脉',
    specialPhysique: '天灵体',
    specialTalent: '剑道',
    description: `青云宗现任宗主，青云仙尊的第五代传人。云霄真人以化神期大圆满的修为，统领青云宗数百年。

云霄真人性格沉稳，处事公正，深受青云宗弟子爱戴。他继承了青云仙尊的云之大道，修炼出了极高的境界。

近年来，云霄真人一直在寻找青云传承者，希望将青云仙尊的真正传承延续下去。`,
    lifeExperience: [
      '出生于青云城青云世家',
      '十岁时拜入青云宗',
      '五十岁时突破筑基期',
      '百岁时突破结丹期',
      '两百岁时突破元婴期',
      '四百岁时突破化神期',
      '五百岁时成为青云宗宗主'
    ],
    majorEvents: [
      '成为青云宗宗主',
      '抵御魔道入侵',
      '培养数名元婴期弟子',
      '寻找青云传承者'
    ],
    hiddenAgenda: ['寻找青云传承者', '准备突破炼虚期'],
    secrets: ['青云传承的秘密', '天魔皇封印的松动'],
    disciples: ['云中子', '云霞仙子', '云风真人', '云雷真人'],
    master: '青云老祖',
    friends: ['玄天真人', '万剑真人', '丹霞真人'],
    enemies: ['天魔子', '魔道势力'],
    family: [
      { relation: '父亲', name: '云天', cultivation: '元婴期', status: '已故' },
      { relation: '母亲', name: '云霞', cultivation: '结丹期', status: '已故' }
    ],
    possessions: ['青云剑', '云海珠', '青云印'],
    cultivation: '化神期大圆满',
    faction: '青云宗',
    location: '青云山',
    role: '宗主',
    personality: ['沉稳', '公正', '护短', '睿智'],
    dialogues: [],
    quests: [],
    relations: [
      { target: 'sect_qingyun', type: 'leader', description: '青云宗宗主' }
    ],
    schedule: [],
    shop: undefined,
    services: []
  },
  {
    id: 'npc_tianmo_emperor',
    name: '天魔皇',
    title: '魔道至尊',
    alias: ['魔皇', '天魔', '魔尊'],
    age: 5000,
    birthplace: '魔域',
    bloodline: '天魔血脉',
    specialPhysique: '天魔体',
    specialTalent: '吞噬之道',
    description: `上古时期最强大的魔修，天魔宗的开山祖师。天魔皇以吞噬之道闻名于世，曾一度威胁整个青云大陆。

上古纪元末期，天魔皇率领魔道大军进攻青云大陆，最终被青云仙尊等人封印。

数千年来，天魔皇一直被封印在魔域深处，但封印正在逐渐松动。`,
    lifeExperience: [
      '出生于魔域深处',
      '少年时觉醒天魔体',
      '青年时统一魔域',
      '中年时创立天魔宗',
      '壮年时突破渡劫期',
      '上古纪元末期进攻青云大陆',
      '被青云仙尊等人封印'
    ],
    majorEvents: [
      '创立天魔宗',
      '统一魔域',
      '进攻青云大陆',
      '被封印'
    ],
    hiddenAgenda: ['突破封印', '复仇青云仙尊', '统治青云大陆'],
    secrets: ['封印的弱点', '天魔传承的真正含义'],
    disciples: ['天魔子', '魔心真人', '魔影真人'],
    master: '无',
    friends: [],
    enemies: ['青云仙尊', '正道势力'],
    family: [],
    possessions: ['天魔剑', '魔心珠', '天魔印'],
    inheritance: {
      type: 'self_created',
      source: '吞噬之道',
      generation: 1,
      specialFeatures: ['魔道功法', '天魔血脉', '吞噬能力']
    },
    legend: `天魔皇的传说充满恐怖。据说他出生时，魔域深处天昏地暗，魔气滔天。

他一生追求吞噬之道，最终领悟了"吞噬万物"的至高境界。他的天魔诀可以吞噬一切，是一门极其恐怖的功法。

被封印前，天魔皇曾扬言："我必将归来，届时青云大陆将臣服于我脚下。"`,
    currentStatus: '被封印',
    lastAppearance: '上古纪元末期',
    futurePlans: ['突破封印', '复仇', '统治青云大陆'],
    cultivation: '渡劫期',
    faction: '天魔宗',
    location: '魔域深处',
    role: '开山祖师',
    personality: ['残忍', '狡诈', '野心勃勃', '冷酷'],
    dialogues: [],
    quests: [],
    relations: [
      { target: 'sect_demon', type: 'founder', description: '创立天魔宗' },
      { target: 'npc_qingyun_ancestor', type: 'enemy', description: '被封印' }
    ],
    schedule: [],
    shop: undefined,
    services: []
  },
  {
    id: 'npc_tianmozi',
    name: '天魔子',
    title: '天魔宗现任宗主',
    alias: ['魔子', '天魔真人'],
    age: 600,
    birthplace: '魔域',
    bloodline: '天魔血脉',
    specialPhysique: '魔体',
    specialTalent: '魔道',
    description: `天魔宗现任宗主，天魔皇的第三代传人。天魔子以化神期的修为，统领天魔宗，时刻准备解封天魔皇。

天魔子性格阴沉，行事狠辣，是正道势力的大敌。他继承了天魔皇的吞噬之道，实力强大。

近年来，天魔子一直在寻找解封天魔皇的方法，同时积蓄力量，准备再次进攻正道。`,
    lifeExperience: [
      '出生于魔域',
      '少年时拜入天魔宗',
      '青年时突破筑基期',
      '中年时突破结丹期',
      '壮年时突破元婴期',
      '老年时突破化神期',
      '成为天魔宗宗主'
    ],
    majorEvents: [
      '成为天魔宗宗主',
      '多次进攻正道',
      '寻找解封天魔皇的方法'
    ],
    hiddenAgenda: ['解封天魔皇', '消灭正道'],
    secrets: ['封印的弱点', '解封方法'],
    disciples: ['魔心真人', '魔影真人'],
    master: '天魔老祖',
    friends: [],
    enemies: ['云霄真人', '正道势力'],
    family: [],
    possessions: ['天魔剑', '魔心珠'],
    cultivation: '化神初期',
    faction: '天魔宗',
    location: '魔域',
    role: '宗主',
    personality: ['阴沉', '狠辣', '野心勃勃', '狡诈'],
    dialogues: [],
    quests: [],
    relations: [
      { target: 'sect_demon', type: 'leader', description: '天魔宗宗主' }
    ],
    schedule: [],
    shop: undefined,
    services: []
  }
]

export const historicalFigures: HistoricalFigure[] = [
  {
    id: 'historical_qingyun',
    name: '青云仙尊',
    title: '青云宗开山祖师',
    era: '上古纪元',
    cultivation: '渡劫期',
    achievements: [
      '创立青云宗',
      '布置青云大阵',
      '封印天魔皇',
      '领悟云之大道',
      '培养数名化神期弟子'
    ],
    legacy: '青云宗、青云传承、青云大阵',
    descendants: ['云霄真人', '青云世家'],
    artifacts: ['青云剑', '云海珠', '青云印', '云纹鼎'],
    legends: [
      '出生时青云山上空出现祥云',
      '从凡人成长为渡劫期大能',
      '封印天魔皇后飞升仙界',
      '留下青云传承等待有缘人'
    ],
    death: '飞升仙界',
    influence: '青云宗至今仍是青云大陆最顶尖的宗门之一'
  },
  {
    id: 'historical_tianmo',
    name: '天魔皇',
    title: '魔道至尊',
    era: '上古纪元',
    cultivation: '渡劫期',
    achievements: [
      '创立天魔宗',
      '统一魔域',
      '领悟吞噬之道',
      '培养数名化神期弟子'
    ],
    legacy: '天魔宗、天魔传承',
    descendants: ['天魔子', '天魔宗弟子'],
    artifacts: ['天魔剑', '魔心珠', '天魔印'],
    legends: [
      '出生时魔域天昏地暗',
      '统一魔域各部',
      '进攻青云大陆',
      '被封印前扬言必将归来'
    ],
    death: '被封印',
    influence: '天魔宗至今仍是青云大陆最强大的魔道势力'
  },
  {
    id: 'historical_wanjian',
    name: '万剑真人',
    title: '剑道至尊',
    era: '中古纪元',
    cultivation: '化神期大圆满',
    achievements: [
      '创立万剑宗',
      '领悟剑道',
      '布置万剑大阵',
      '培养数名元婴期弟子'
    ],
    legacy: '万剑宗、剑道传承',
    descendants: ['万剑真人', '万剑世家'],
    artifacts: ['万剑', '剑心珠'],
    legends: [
      '少年时领悟剑意',
      '中年时创立万剑宗',
      '万剑归宗的传说'
    ],
    death: '寿终正寝',
    influence: '万剑宗至今仍是青云大陆最顶尖的剑修宗门'
  },
  {
    id: 'historical_danxia',
    name: '丹霞仙子',
    title: '丹道至尊',
    era: '中古纪元',
    cultivation: '元婴期大圆满',
    achievements: [
      '创立丹霞宗',
      '领悟丹道',
      '创制多种丹方',
      '培养数名结丹期弟子'
    ],
    legacy: '丹霞宗、丹道传承',
    descendants: ['丹霞真人', '丹霞世家'],
    artifacts: ['丹霞鼎', '丹火珠'],
    legends: [
      '少女时领悟丹道',
      '中年时创立丹霞宗',
      '丹道无双的传说'
    ],
    death: '寿终正寝',
    influence: '丹霞宗至今仍是青云大陆最顶尖的丹道宗门'
  },
  {
    id: 'historical_xuantian',
    name: '玄天老祖',
    title: '玄妙至尊',
    era: '中古纪元',
    cultivation: '化神期',
    achievements: [
      '创立玄天宗',
      '领悟玄妙之道',
      '布置玄天大阵',
      '培养数名元婴期弟子'
    ],
    legacy: '玄天宗、玄妙传承',
    descendants: ['玄天真人', '玄天世家'],
    artifacts: ['玄天剑', '玄天印'],
    legends: [
      '获得上古传承',
      '领悟玄妙之道',
      '玄妙莫测的传说'
    ],
    death: '寿终正寝',
    influence: '玄天宗至今仍是青云大陆最顶尖的宗门之一'
  },
  {
    id: 'historical_five_elements',
    name: '五行真人',
    title: '五行至尊',
    era: '中古纪元',
    cultivation: '化神期',
    achievements: [
      '创立五行宗',
      '领悟五行之道',
      '布置五行大阵',
      '培养数名元婴期弟子'
    ],
    legacy: '五行宗、五行传承',
    descendants: ['五行真人', '五行世家'],
    artifacts: ['五行珠', '五行印'],
    legends: [
      '领悟五行之道',
      '五行轮转的传说'
    ],
    death: '寿终正寝',
    influence: '五行宗至今仍是青云大陆重要的宗门之一'
  }
]

export const reclusiveExperts: ReclusiveExpert[] = [
  {
    id: 'reclusive_cloud_hermit',
    name: '云中隐者',
    title: '云之隐士',
    cultivation: '化神期',
    location: '青云山深处',
    specialty: ['云系功法', '阵法', '炼丹'],
    personality: '淡泊名利，不喜被打扰，但对有缘人颇为照顾',
    background: '原青云宗长老，因追求更高境界而隐居',
    requirements: ['通过云雾阵', '展示云系天赋', '诚意拜访'],
    rewards: ['云系功法指点', '丹药', '阵法知识'],
    danger: '中等，云雾阵困住无数修士',
    rumors: ['有人说他是青云仙尊的私生子', '有人说他已经突破化神期', '有人说他掌握青云传承的秘密']
  },
  {
    id: 'reclusive_sword_hermit',
    name: '剑中隐者',
    title: '剑之隐士',
    cultivation: '元婴期大圆满',
    location: '万剑山深处',
    specialty: ['剑道', '炼器', '符箓'],
    personality: '孤傲，只看重剑道天赋',
    background: '原万剑宗长老，因追求剑道极致而隐居',
    requirements: ['展示剑道天赋', '通过剑阵', '诚意拜访'],
    rewards: ['剑道指点', '剑器', '符箓'],
    danger: '高，剑阵极其危险',
    rumors: ['有人说他领悟了剑意', '有人说他已经突破化神期', '有人说他掌握万剑传承的秘密']
  },
  {
    id: 'reclusive_pill_hermit',
    name: '丹中隐者',
    title: '丹之隐士',
    cultivation: '元婴期',
    location: '丹霞山深处',
    specialty: ['丹道', '医术', '毒术'],
    personality: '和蔼，喜欢有丹道天赋的年轻人',
    background: '原丹霞宗长老，因追求丹道极致而隐居',
    requirements: ['展示丹道天赋', '通过丹火阵', '诚意拜访'],
    rewards: ['丹道指点', '丹药', '丹方'],
    danger: '中等，丹火阵困住无数修士',
    rumors: ['有人说他掌握失传的丹方', '有人说他已经突破元婴期', '有人说他掌握丹霞传承的秘密']
  },
  {
    id: 'reclusive_formation_hermit',
    name: '阵中隐者',
    title: '阵之隐士',
    cultivation: '元婴期',
    location: '青云大陆某处秘境',
    specialty: ['阵法', '符箓', '禁制'],
    personality: '神秘，只看重阵法天赋',
    background: '身份不明，据说是上古阵法大师的后人',
    requirements: ['展示阵法天赋', '通过阵法测试', '诚意拜访'],
    rewards: ['阵法指点', '阵旗', '阵法知识'],
    danger: '高，阵法极其复杂',
    rumors: ['有人说他是上古阵法大师的后人', '有人说他掌握上古阵法传承', '有人说他已经突破元婴期']
  },
  {
    id: 'reclusive_beast_hermit',
    name: '兽中隐者',
    title: '兽之隐士',
    cultivation: '元婴期',
    location: '御兽山深处',
    specialty: ['御兽', '驯兽', '灵兽培育'],
    personality: '热爱灵兽，不喜欢伤害灵兽的人',
    background: '原御兽宗长老，因追求御兽之道而隐居',
    requirements: ['展示御兽天赋', '通过灵兽测试', '诚意拜访'],
    rewards: ['御兽指点', '灵兽', '御兽知识'],
    danger: '中等，灵兽极其危险',
    rumors: ['有人说他掌握上古御兽传承', '有人说他已经突破元婴期', '有人说他养有上古神兽']
  }
]

export const inheritors: Inheritor[] = [
  {
    id: 'inheritance_qingyun',
    name: '青云传承者',
    title: '青云仙尊传人',
    cultivation: '不限',
    inheritance: '青云传承',
    location: '青云山青云秘境',
    requirements: [
      '拥有青云血脉或天灵体',
      '修炼云系功法',
      '通过青云测试',
      '获得青云宗宗主认可'
    ],
    tests: [
      {
        name: '云雾测试',
        description: '在云雾阵中找到正确的道路',
        difficulty: '中等',
        requirements: ['云系天赋', '阵法知识']
      },
      {
        name: '云海测试',
        description: '在云海中领悟云之大道',
        difficulty: '高',
        requirements: ['云系天赋', '悟性']
      },
      {
        name: '青云测试',
        description: '接受青云仙尊的考验',
        difficulty: '极高',
        requirements: ['云系天赋', '悟性', '心性'],
        rewards: ['青云传承', '青云剑', '云海珠']
      }
    ],
    rewards: ['青云传承', '青云剑', '云海珠', '青云印', '青云仙尊指点'],
    history: '青云传承自青云仙尊创立以来，只传给最有天赋的弟子。数千年来，只有十人获得青云传承。'
  },
  {
    id: 'inheritance_wanjian',
    name: '万剑传承者',
    title: '万剑真人传人',
    cultivation: '筑基期以上',
    inheritance: '万剑传承',
    location: '万剑山万剑秘境',
    requirements: [
      '拥有剑道天赋',
      '修炼剑道功法',
      '通过万剑测试',
      '获得万剑宗宗主认可'
    ],
    tests: [
      {
        name: '剑气测试',
        description: '在剑气阵中坚持一定时间',
        difficulty: '中等',
        requirements: ['剑道天赋', '防御能力']
      },
      {
        name: '剑阵测试',
        description: '在剑阵中找到正确的道路',
        difficulty: '高',
        requirements: ['剑道天赋', '阵法知识']
      },
      {
        name: '万剑测试',
        description: '接受万剑真人的考验',
        difficulty: '极高',
        requirements: ['剑道天赋', '悟性', '心性'],
        rewards: ['万剑传承', '万剑', '剑心珠']
      }
    ],
    rewards: ['万剑传承', '万剑', '剑心珠', '万剑真人指点'],
    history: '万剑传承自万剑真人创立以来，只传给最有剑道天赋的弟子。数千年来，只有八人获得万剑传承。'
  },
  {
    id: 'inheritance_danxia',
    name: '丹霞传承者',
    title: '丹霞仙子传人',
    cultivation: '筑基期以上',
    inheritance: '丹霞传承',
    location: '丹霞山丹霞秘境',
    requirements: [
      '拥有丹道天赋',
      '修炼丹道功法',
      '通过丹霞测试',
      '获得丹霞宗宗主认可'
    ],
    tests: [
      {
        name: '丹火测试',
        description: '在丹火中坚持一定时间',
        difficulty: '中等',
        requirements: ['丹道天赋', '防御能力']
      },
      {
        name: '丹道测试',
        description: '炼制指定丹药',
        difficulty: '高',
        requirements: ['丹道天赋', '炼丹能力']
      },
      {
        name: '丹霞测试',
        description: '接受丹霞仙子的考验',
        difficulty: '极高',
        requirements: ['丹道天赋', '悟性', '心性'],
        rewards: ['丹霞传承', '丹霞鼎', '丹火珠']
      }
    ],
    rewards: ['丹霞传承', '丹霞鼎', '丹火珠', '丹霞仙子指点'],
    history: '丹霞传承自丹霞仙子创立以来，只传给最有丹道天赋的弟子。数千年来，只有六人获得丹霞传承。'
  },
  {
    id: 'inheritance_tianmo',
    name: '天魔传承者',
    title: '天魔皇传人',
    cultivation: '结丹期以上',
    inheritance: '天魔传承',
    location: '魔域天魔秘境',
    requirements: [
      '拥有魔道天赋',
      '修炼魔道功法',
      '通过天魔测试',
      '获得天魔宗宗主认可'
    ],
    tests: [
      {
        name: '魔气测试',
        description: '在魔气中坚持一定时间',
        difficulty: '高',
        requirements: ['魔道天赋', '防御能力']
      },
      {
        name: '吞噬测试',
        description: '吞噬指定目标',
        difficulty: '极高',
        requirements: ['魔道天赋', '吞噬能力']
      },
      {
        name: '天魔测试',
        description: '接受天魔皇的考验',
        difficulty: '极高',
        requirements: ['魔道天赋', '悟性', '心性'],
        rewards: ['天魔传承', '天魔剑', '魔心珠']
      }
    ],
    rewards: ['天魔传承', '天魔剑', '魔心珠', '天魔皇指点'],
    history: '天魔传承自天魔皇被封印以来，只传给最有魔道天赋的弟子。数千年来，只有五人获得天魔传承。'
  }
]