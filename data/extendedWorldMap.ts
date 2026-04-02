import { WorldRegion, WorldLocation, RegionConnection } from './worldMap'

export interface ExtendedWorldRegion extends WorldRegion {
  climate?: string
  terrain?: string
  resources?: string[]
  dangers?: string[]
  history?: string
  legends?: string[]
  secretRealms?: string[]
  forbiddenAreas?: string[]
  spiritVeins?: SpiritVeinInfo[]
  teleportationArrays?: TeleportationArrayInfo[]
  majorPowers?: string[]
  population?: number
  cultivationLevel?: string
  specialFeatures?: string[]
}

export interface SpiritVeinInfo {
  id: string
  name: string
  type: SpiritVeinType
  grade: SpiritVeinGrade
  owner?: string
  output: number
  status: string
  history?: string
}

export type SpiritVeinType = 'spirit' | 'fire' | 'water' | 'wood' | 'metal' | 'earth' | 'thunder' | 'wind' | 'ice' | 'dark' | 'light' | 'chaos'
export type SpiritVeinGrade = 'inferior' | 'low' | 'medium' | 'high' | 'superior' | 'supreme' | 'immortal'

export interface TeleportationArrayInfo {
  id: string
  name: string
  type: 'short' | 'medium' | 'long' | 'intercontinental'
  owner?: string
  destinations: string[]
  cost: number
  status: string
  restrictions?: string[]
}

export interface SecretRealm {
  id: string
  name: string
  type: 'inheritance' | 'resource' | 'trial' | 'exploration' | 'dangerous' | 'mysterious'
  grade: 'mortal' | 'spirit' | 'earth' | 'heaven' | 'immortal'
  description: string
  history: string
  location: string
  entranceConditions: string[]
  openingCycle?: string
  lastOpening?: string
  nextOpening?: string
  dangers: string[]
  rewards: string[]
  currentExplorers?: number
  maxExplorers?: number
  timeLimit?: number
  specialRules?: string[]
  legends?: string[]
}

export interface ForbiddenArea {
  id: string
  name: string
  type: 'natural' | 'man_made' | 'ancient' | 'cursed' | 'sealed'
  dangerLevel: number
  description: string
  history: string
  location: string
  dangers: string[]
  forbiddenReason: string
  survivors?: string[]
  secrets?: string[]
  rumors?: string[]
}

export interface AncientRuin {
  id: string
  name: string
  era: string
  type: 'city' | 'palace' | 'temple' | 'tomb' | 'battlefield' | 'sect'
  description: string
  history: string
  location: string
  dangers: string[]
  treasures: string[]
  explorers?: string[]
  status: 'intact' | 'partially_explored' | 'mostly_explored' | 'exhausted'
}

export const extendedRegions: ExtendedWorldRegion[] = [
  {
    id: 'region_central_plains',
    name: '中州平原',
    type: 'plains',
    description: `青云大陆的核心区域，灵气充沛，资源丰富。中州平原是青云大陆最繁华的地区，拥有最多的宗门、世家和凡人国度。

中州平原地势平坦，气候温和，适合修炼和居住。这里聚集了青云大陆最顶尖的势力，是修仙界的中心。`,
    climate: '温带季风气候，四季分明',
    terrain: '平原为主，有少量丘陵',
    resources: ['灵石矿', '灵草', '灵兽', '铁矿', '粮食'],
    dangers: ['散修劫掠', '妖兽袭击', '宗门争斗'],
    history: `中州平原是青云大陆最早开发的地区之一。上古纪元时期，这里就是修仙界的中心。

青云仙尊在中州平原创立了青云宗，从此中州平原成为了青云大陆最繁华的地区。

数千年来，中州平原见证了无数修士的崛起和陨落，是青云大陆历史的缩影。`,
    legends: [
      '传说青云仙尊在中州平原悟道',
      '传说中州平原下埋藏着上古遗迹',
      '传说中州平原的灵脉是上古大能布置的'
    ],
    secretRealms: ['青云秘境', '玄天秘境', '五行秘境'],
    forbiddenAreas: ['死亡谷', '迷雾森林'],
    spiritVeins: [
      {
        id: 'vein_qingyun_main',
        name: '青云主脉',
        type: 'spirit',
        grade: 'supreme',
        owner: '青云宗',
        output: 10000,
        status: '活跃',
        history: '青云仙尊布置的主灵脉，是青云大陆最强大的灵脉之一'
      },
      {
        id: 'vein_xuantian_main',
        name: '玄天主脉',
        type: 'spirit',
        grade: 'superior',
        owner: '玄天宗',
        output: 5000,
        status: '活跃',
        history: '玄天老祖布置的主灵脉'
      }
    ],
    teleportationArrays: [
      {
        id: 'teleport_qingyun_xuantian',
        name: '青云-玄天传送阵',
        type: 'medium',
        owner: '青云宗、玄天宗',
        destinations: ['青云山', '玄天山'],
        cost: 1000,
        status: '正常',
        restrictions: ['需要宗门许可']
      },
      {
        id: 'teleport_central_capital',
        name: '中州都城传送阵',
        type: 'short',
        owner: '大夏王朝',
        destinations: ['夏都', '青云城', '玄天城'],
        cost: 500,
        status: '正常'
      }
    ],
    majorPowers: ['青云宗', '玄天宗', '万剑宗', '丹霞宗', '大夏王朝', '大周王朝'],
    population: 200000000,
    cultivationLevel: '炼气期至化神期',
    specialFeatures: ['灵气充沛', '资源丰富', '势力众多', '交通便利'],
    connections: [
      { targetRegion: 'region_northern_wasteland', type: 'land', travelTime: 30, danger: 'medium', description: '向北穿越北境长城可到达北荒原' },
      { targetRegion: 'region_southern_jungle', type: 'land', travelTime: 20, danger: 'medium', description: '向南穿越山脉可到达南荒丛林' },
      { targetRegion: 'region_western_desert', type: 'land', travelTime: 40, danger: 'high', description: '向西穿越沙漠可到达西域荒漠' },
      { targetRegion: 'region_eastern_sea', type: 'sea', travelTime: 15, danger: 'medium', description: '向东航行可到达东海' }
    ],
    locations: [
      {
        id: 'loc_qingyun_mountain',
        name: '青云山',
        type: 'sect',
        description: '青云宗所在地，青云大陆最顶尖的宗门之一',
        dangerLevel: 1,
        discoveries: ['青云宗', '青云大阵', '青云秘境']
      },
      {
        id: 'loc_xuantian_mountain',
        name: '玄天山',
        type: 'sect',
        description: '玄天宗所在地，青云大陆最顶尖的宗门之一',
        dangerLevel: 2,
        discoveries: ['玄天宗', '玄天大阵', '玄天秘境']
      },
      {
        id: 'loc_wanjian_mountain',
        name: '万剑山',
        type: 'sect',
        description: '万剑宗所在地，青云大陆最顶尖的剑修宗门',
        dangerLevel: 2,
        discoveries: ['万剑宗', '万剑大阵', '万剑秘境']
      },
      {
        id: 'loc_danxia_mountain',
        name: '丹霞山',
        type: 'sect',
        description: '丹霞宗所在地，青云大陆最顶尖的丹道宗门',
        dangerLevel: 2,
        discoveries: ['丹霞宗', '丹霞秘境']
      },
      {
        id: 'loc_xia_capital',
        name: '夏都',
        type: 'city',
        description: '大夏王朝的都城，青云大陆最繁华的凡人城市之一',
        dangerLevel: 1,
        discoveries: ['皇宫', '国子监', '护国大阵']
      }
    ]
  },
  {
    id: 'region_northern_wasteland',
    name: '北荒原',
    type: 'wasteland',
    description: `青云大陆北部的荒凉之地，气候寒冷，妖兽横行。北荒原是妖兽的主要栖息地，也是修士历练的重要场所。

北荒原虽然荒凉，但资源丰富，有大量的灵石矿和灵草。许多散修和宗门弟子都会来此历练。`,
    climate: '寒带气候，常年寒冷',
    terrain: '荒原、冰原、山脉',
    resources: ['灵石矿', '冰灵草', '妖兽材料', '寒铁'],
    dangers: ['妖兽袭击', '极寒天气', '冰风暴', '上古凶兽'],
    history: `北荒原曾是上古战场的所在地，上古纪元时期，这里发生过多次大战。

战争结束后，北荒原逐渐荒凉，成为了妖兽的栖息地。但这里仍然埋藏着许多上古遗迹和宝藏。`,
    legends: [
      '传说北荒原深处有上古龙墓',
      '传说北荒原有上古大能的洞府',
      '传说北荒原的冰层下埋藏着上古战场'
    ],
    secretRealms: ['冰龙秘境', '上古战场秘境'],
    forbiddenAreas: ['极寒禁地', '龙墓禁地'],
    spiritVeins: [
      {
        id: 'vein_northern_ice',
        name: '北荒冰脉',
        type: 'ice',
        grade: 'high',
        owner: '无主',
        output: 3000,
        status: '活跃',
        history: '上古时期形成的冰属性灵脉'
      }
    ],
    teleportationArrays: [
      {
        id: 'teleport_northern_outpost',
        name: '北境要塞传送阵',
        type: 'short',
        owner: '大夏王朝',
        destinations: ['北境要塞', '夏都'],
        cost: 800,
        status: '正常',
        restrictions: ['需要军籍或宗门许可']
      }
    ],
    majorPowers: ['大夏王朝（北境要塞）', '散修联盟'],
    population: 500000,
    cultivationLevel: '炼气期至元婴期',
    specialFeatures: ['妖兽众多', '资源丰富', '上古遗迹', '气候恶劣'],
    connections: [
      { targetRegion: 'region_central_plains', type: 'land', travelTime: 30, danger: 'medium', description: '向南穿越北境长城可到达中州平原' }
    ],
    locations: [
      {
        id: 'loc_northern_fortress',
        name: '北境要塞',
        type: 'fortress',
        description: '大夏王朝在北荒原边境建立的要塞，用于抵御妖兽',
        dangerLevel: 3,
        discoveries: ['要塞', '军营', '防御阵法']
      },
      {
        id: 'loc_ice_valley',
        name: '冰封谷',
        type: 'dangerous',
        description: '北荒原深处的危险地带，常年被冰雪覆盖',
        dangerLevel: 8,
        discoveries: ['冰属性灵草', '冰系妖兽', '上古遗迹']
      }
    ]
  },
  {
    id: 'region_southern_jungle',
    name: '南荒丛林',
    type: 'jungle',
    description: `青云大陆南部的原始丛林，植被茂密，毒虫猛兽众多。南荒丛林是灵草和灵兽的主要产地，也是修士采药的重要场所。

南荒丛林虽然危险，但资源极其丰富，有大量的珍稀灵草和灵兽。许多丹修都会来此采药。`,
    climate: '热带雨林气候，常年炎热潮湿',
    terrain: '丛林、沼泽、山脉',
    resources: ['灵草', '灵兽', '毒虫', '灵木'],
    dangers: ['毒虫', '猛兽', '沼泽', '瘴气', '毒雾'],
    history: `南荒丛林自古就是原始丛林，从未被大规模开发。这里保存着最原始的生态系统。

上古纪元时期，曾有修士尝试开发南荒丛林，但都因危险太大而放弃。`,
    legends: [
      '传说南荒丛林深处有上古药园',
      '传说南荒丛林有神兽栖息',
      '传说南荒丛林的深处有通往仙界的通道'
    ],
    secretRealms: ['药王秘境', '兽王秘境'],
    forbiddenAreas: ['毒雾禁地', '深渊禁地'],
    spiritVeins: [
      {
        id: 'vein_southern_wood',
        name: '南荒木脉',
        type: 'wood',
        grade: 'superior',
        owner: '无主',
        output: 4000,
        status: '活跃',
        history: '上古时期形成的木属性灵脉'
      }
    ],
    teleportationArrays: [],
    majorPowers: ['丹霞宗（采药队）', '御兽宗'],
    population: 100000,
    cultivationLevel: '炼气期至结丹期',
    specialFeatures: ['灵草众多', '灵兽丰富', '毒虫猛兽', '瘴气弥漫'],
    connections: [
      { targetRegion: 'region_central_plains', type: 'land', travelTime: 20, danger: 'medium', description: '向北穿越山脉可到达中州平原' }
    ],
    locations: [
      {
        id: 'loc_herb_valley',
        name: '灵草谷',
        type: 'resource',
        description: '南荒丛林中灵草最丰富的地区',
        dangerLevel: 5,
        discoveries: ['珍稀灵草', '灵兽', '采药修士']
      },
      {
        id: 'loc_poison_swamp',
        name: '毒沼',
        type: 'dangerous',
        description: '南荒丛林深处的毒沼，充满剧毒',
        dangerLevel: 9,
        discoveries: ['剧毒灵草', '毒虫', '毒兽']
      }
    ]
  },
  {
    id: 'region_western_desert',
    name: '西域荒漠',
    type: 'desert',
    description: `青云大陆西部的广阔沙漠，气候炎热，资源匮乏。西域荒漠是青云大陆最荒凉的地区之一，但也有独特的资源。

西域荒漠虽然荒凉，但有大量的火属性灵石和火属性灵草。许多火系修士会来此历练。`,
    climate: '热带沙漠气候，昼夜温差极大',
    terrain: '沙漠、戈壁、绿洲',
    resources: ['火灵石', '火灵草', '沙兽', '风灵石'],
    dangers: ['沙尘暴', '高温', '沙兽', '流沙', '脱水'],
    history: `西域荒漠曾是上古时期的一个强大王朝的所在地，但王朝覆灭后，这里逐渐变成了沙漠。

据说沙漠深处埋藏着那个王朝的遗迹，吸引了许多修士前来探索。`,
    legends: [
      '传说西域荒漠深处有上古王朝的遗迹',
      '传说西域荒漠有火神传承',
      '传说西域荒漠的绿洲是上古大能开辟的'
    ],
    secretRealms: ['火神秘境', '上古王朝秘境'],
    forbiddenAreas: ['流沙禁地', '火海禁地'],
    spiritVeins: [
      {
        id: 'vein_western_fire',
        name: '西域火脉',
        type: 'fire',
        grade: 'superior',
        owner: '无主',
        output: 4000,
        status: '活跃',
        history: '上古时期形成的火属性灵脉'
      }
    ],
    teleportationArrays: [
      {
        id: 'teleport_western_oasis',
        name: '西域绿洲传送阵',
        type: 'short',
        owner: '大周王朝',
        destinations: ['西域绿洲', '周都'],
        cost: 1000,
        status: '正常',
        restrictions: ['需要通行证']
      }
    ],
    majorPowers: ['大周王朝（西域都护府）', '火神宗'],
    population: 300000,
    cultivationLevel: '炼气期至结丹期',
    specialFeatures: ['火属性资源丰富', '上古遗迹', '气候恶劣', '绿洲稀少'],
    connections: [
      { targetRegion: 'region_central_plains', type: 'land', travelTime: 40, danger: 'high', description: '向东穿越沙漠可到达中州平原' }
    ],
    locations: [
      {
        id: 'loc_western_oasis',
        name: '西域绿洲',
        type: 'city',
        description: '西域荒漠中最大的绿洲，大周王朝西域都护府所在地',
        dangerLevel: 2,
        discoveries: ['西域都护府', '市场', '客栈']
      },
      {
        id: 'loc_fire_mountain',
        name: '火焰山',
        type: 'dangerous',
        description: '西域荒漠深处的火山群，火属性灵气极其浓郁',
        dangerLevel: 8,
        discoveries: ['火属性灵石', '火属性灵草', '火系妖兽']
      }
    ]
  },
  {
    id: 'region_eastern_sea',
    name: '东海',
    type: 'sea',
    description: `青云大陆东部的大海，广阔无垠，神秘莫测。东海是海兽的栖息地，也是修士探索的重要场所。

东海虽然危险，但有大量的海兽材料和海底灵矿。许多修士会来此猎杀海兽或探索海底遗迹。`,
    climate: '海洋性气候，常年温和',
    terrain: '海洋、岛屿、海底',
    resources: ['海兽材料', '海底灵矿', '海灵草', '珍珠'],
    dangers: ['海兽', '海啸', '风暴', '漩涡', '迷航'],
    history: `东海自古就是神秘之地，据说海底埋藏着上古时期的遗迹。

上古纪元时期，曾有强大的海族统治东海，但后来神秘消失。`,
    legends: [
      '传说东海深处有上古海族遗迹',
      '传说东海有龙宫',
      '传说东海的尽头是仙界'
    ],
    secretRealms: ['龙宫秘境', '海底遗迹秘境'],
    forbiddenAreas: ['深海禁地', '漩涡禁地'],
    spiritVeins: [
      {
        id: 'vein_eastern_water',
        name: '东海主脉',
        type: 'water',
        grade: 'supreme',
        owner: '无主',
        output: 8000,
        status: '活跃',
        history: '上古时期形成的水属性灵脉'
      }
    ],
    teleportationArrays: [],
    majorPowers: ['东海宗', '海族'],
    population: 50000,
    cultivationLevel: '炼气期至元婴期',
    specialFeatures: ['海兽众多', '海底遗迹', '神秘莫测', '资源丰富'],
    connections: [
      { targetRegion: 'region_central_plains', type: 'sea', travelTime: 15, danger: 'medium', description: '向西航行可到达中州平原' }
    ],
    locations: [
      {
        id: 'loc_eastern_islands',
        name: '东海群岛',
        type: 'islands',
        description: '东海中的岛屿群，东海宗所在地',
        dangerLevel: 4,
        discoveries: ['东海宗', '海兽', '海底灵矿']
      },
      {
        id: 'loc_deep_sea',
        name: '深海区域',
        type: 'dangerous',
        description: '东海深处的危险区域，海兽极其强大',
        dangerLevel: 10,
        discoveries: ['强大海兽', '海底遗迹', '龙宫传说']
      }
    ]
  },
  {
    id: 'region_demon_domain',
    name: '魔域',
    type: 'special',
    description: `青云大陆最神秘的区域，魔修的聚集地。魔域常年被魔气笼罩，是正道修士的禁地。

魔域虽然危险，但有大量的魔道资源。魔修在这里修炼，实力强大。`,
    climate: '阴冷潮湿，常年不见阳光',
    terrain: '山脉、沼泽、深渊',
    resources: ['魔石', '魔草', '魔兽', '血灵石'],
    dangers: ['魔修', '魔兽', '魔气侵蚀', '禁制', '陷阱'],
    history: `魔域是上古时期天魔皇开辟的领地，曾一度威胁整个青云大陆。

上古纪元末期，天魔皇被封印后，魔域逐渐成为了魔修的聚集地。`,
    legends: [
      '传说魔域深处有天魔皇的封印之地',
      '传说魔域有通往魔界的通道',
      '传说魔域有上古魔道传承'
    ],
    secretRealms: ['天魔秘境', '魔道传承秘境'],
    forbiddenAreas: ['封印禁地', '深渊禁地'],
    spiritVeins: [
      {
        id: 'vein_demon_main',
        name: '魔域主脉',
        type: 'dark',
        grade: 'supreme',
        owner: '天魔宗',
        output: 8000,
        status: '活跃',
        history: '天魔皇开辟的魔属性灵脉'
      }
    ],
    teleportationArrays: [],
    majorPowers: ['天魔宗', '血魔宗', '鬼道宗'],
    population: 100000,
    cultivationLevel: '炼气期至化神期',
    specialFeatures: ['魔气浓郁', '魔修聚集', '危险重重', '神秘莫测'],
    connections: [],
    locations: [
      {
        id: 'loc_demon_capital',
        name: '魔城',
        type: 'city',
        description: '魔域的中心城市，天魔宗所在地',
        dangerLevel: 8,
        discoveries: ['天魔宗', '魔道市场', '魔道功法']
      },
      {
        id: 'loc_seal_location',
        name: '封印之地',
        type: 'dangerous',
        description: '天魔皇被封印的地方，极其危险',
        dangerLevel: 10,
        discoveries: ['天魔皇封印', '禁制', '魔气']
      }
    ]
  }
]

export const secretRealms: SecretRealm[] = [
  {
    id: 'secret_qingyun',
    name: '青云秘境',
    type: 'inheritance',
    grade: 'heaven',
    description: `青云仙尊留下的传承秘境，是青云大陆最神秘的秘境之一。青云秘境中蕴含着青云仙尊的传承，只有最有天赋的弟子才能获得。

青云秘境分为三层：外层、中层、内层。每一层都有不同的考验和奖励。`,
    history: `青云秘境由青云仙尊于上古纪元创立，用于选拔青云传承者。

数千年来，只有十人获得青云传承，成为青云仙尊的真正传人。`,
    location: '青云山深处',
    entranceConditions: [
      '拥有青云血脉或天灵体',
      '修炼云系功法',
      '获得青云宗宗主认可',
      '通过青云测试'
    ],
    openingCycle: '随时可进入',
    dangers: ['云雾阵', '云海阵', '青云阵', '心魔'],
    rewards: ['青云传承', '青云剑', '云海珠', '青云印', '青云仙尊指点'],
    maxExplorers: 1,
    specialRules: ['只有一人可获得传承', '失败者会被传送出秘境'],
    legends: [
      '传说青云仙尊在秘境中留下了飞升的秘密',
      '传说秘境深处有通往仙界的通道'
    ]
  },
  {
    id: 'secret_wanjian',
    name: '万剑秘境',
    type: 'inheritance',
    grade: 'heaven',
    description: `万剑真人留下的传承秘境，是青云大陆最神秘的剑道秘境之一。万剑秘境中蕴含着万剑真人的剑道传承，只有最有剑道天赋的弟子才能获得。

万剑秘境分为三层：剑气层、剑阵层、剑心层。每一层都有不同的考验和奖励。`,
    history: `万剑秘境由万剑真人于中古纪元创立，用于选拔剑道传人。

数千年来，只有八人获得万剑传承，成为万剑真人的真正传人。`,
    location: '万剑山深处',
    entranceConditions: [
      '拥有剑道天赋',
      '修炼剑道功法',
      '获得万剑宗宗主认可',
      '通过万剑测试'
    ],
    openingCycle: '随时可进入',
    dangers: ['剑气阵', '剑阵', '剑心测试', '心魔'],
    rewards: ['万剑传承', '万剑', '剑心珠', '万剑真人指点'],
    maxExplorers: 1,
    specialRules: ['只有一人可获得传承', '失败者会被传送出秘境'],
    legends: [
      '传说万剑真人在秘境中留下了剑道的终极奥秘',
      '传说秘境深处有上古剑仙的遗迹'
    ]
  },
  {
    id: 'secret_danxia',
    name: '丹霞秘境',
    type: 'inheritance',
    grade: 'earth',
    description: `丹霞仙子留下的传承秘境，是青云大陆最神秘的丹道秘境之一。丹霞秘境中蕴含着丹霞仙子的丹道传承，只有最有丹道天赋的弟子才能获得。

丹霞秘境分为三层：丹火层、丹道层、丹心层。每一层都有不同的考验和奖励。`,
    history: `丹霞秘境由丹霞仙子于中古纪元创立，用于选拔丹道传人。

数千年来，只有六人获得丹霞传承，成为丹霞仙子的真正传人。`,
    location: '丹霞山深处',
    entranceConditions: [
      '拥有丹道天赋',
      '修炼丹道功法',
      '获得丹霞宗宗主认可',
      '通过丹霞测试'
    ],
    openingCycle: '随时可进入',
    dangers: ['丹火阵', '丹道测试', '丹心测试', '心魔'],
    rewards: ['丹霞传承', '丹霞鼎', '丹火珠', '丹霞仙子指点'],
    maxExplorers: 1,
    specialRules: ['只有一人可获得传承', '失败者会被传送出秘境'],
    legends: [
      '传说丹霞仙子在秘境中留下了失传的丹方',
      '传说秘境深处有上古丹道大师的遗迹'
    ]
  },
  {
    id: 'secret_tianmo',
    name: '天魔秘境',
    type: 'inheritance',
    grade: 'heaven',
    description: `天魔皇留下的传承秘境，是魔道最神秘的秘境之一。天魔秘境中蕴含着天魔皇的魔道传承，只有最有魔道天赋的弟子才能获得。

天魔秘境分为三层：魔气层、魔道层、魔心层。每一层都有不同的考验和奖励。`,
    history: `天魔秘境由天魔皇于上古纪元创立，用于选拔魔道传人。

数千年来，只有五人获得天魔传承，成为天魔皇的真正传人。`,
    location: '魔域深处',
    entranceConditions: [
      '拥有魔道天赋',
      '修炼魔道功法',
      '获得天魔宗宗主认可',
      '通过天魔测试'
    ],
    openingCycle: '随时可进入',
    dangers: ['魔气侵蚀', '魔道测试', '魔心测试', '心魔'],
    rewards: ['天魔传承', '天魔剑', '魔心珠', '天魔皇指点'],
    maxExplorers: 1,
    specialRules: ['只有一人可获得传承', '失败者会被传送出秘境'],
    legends: [
      '传说天魔皇在秘境中留下了突破封印的方法',
      '传说秘境深处有通往魔界的通道'
    ]
  },
  {
    id: 'secret_ancient_battlefield',
    name: '上古战场秘境',
    type: 'exploration',
    grade: 'earth',
    description: `上古时期大战留下的战场遗迹，是青云大陆最危险的秘境之一。上古战场秘境中埋藏着无数上古修士的遗物和宝藏，但也有无数危险。

上古战场秘境极其广阔，分为多个区域，每个区域都有不同的危险和奖励。`,
    history: `上古战场秘境是上古纪元时期正魔大战的遗址。那场大战持续了数百年，无数修士陨落于此。

大战结束后，这里被神秘力量封印，成为了一个秘境。`,
    location: '北荒原深处',
    entranceConditions: [
      '修为达到筑基期',
      '组队进入（至少三人）',
      '支付入场费'
    ],
    openingCycle: '每十年开放一次',
    lastOpening: '五年前',
    nextOpening: '五年后',
    dangers: ['上古怨灵', '禁制', '陷阱', '上古妖兽', '空间裂缝'],
    rewards: ['上古法宝', '上古丹药', '上古功法', '灵石矿', '天材地宝'],
    currentExplorers: 0,
    maxExplorers: 100,
    timeLimit: 30,
    specialRules: ['最多停留三十天', '禁止同门相残', '发现宝物归发现者所有'],
    legends: [
      '传说上古战场深处有上古大能的洞府',
      '传说上古战场埋藏着仙器碎片'
    ]
  },
  {
    id: 'secret_herb_garden',
    name: '药王秘境',
    type: 'resource',
    grade: 'earth',
    description: `上古药王留下的药园秘境，是青云大陆灵草最丰富的秘境之一。药王秘境中生长着无数珍稀灵草，是丹修的天堂。

药王秘境极其广阔，分为多个药园，每个药园都有不同的灵草。`,
    history: `药王秘境由上古药王于上古纪元创立，用于培育珍稀灵草。

药王飞升后，药王秘境成为了修士采药的重要场所。`,
    location: '南荒丛林深处',
    entranceConditions: [
      '修为达到炼气期',
      '拥有采药工具',
      '支付入场费'
    ],
    openingCycle: '每五年开放一次',
    lastOpening: '三年前',
    nextOpening: '两年后',
    dangers: ['毒虫', '灵兽', '迷阵', '毒雾'],
    rewards: ['珍稀灵草', '灵药种子', '药王传承碎片'],
    currentExplorers: 0,
    maxExplorers: 50,
    timeLimit: 7,
    specialRules: ['最多停留七天', '禁止破坏药园', '采摘量有限制'],
    legends: [
      '传说药王秘境深处有药王传承',
      '传说药王秘境有长生不老药'
    ]
  }
]

export const forbiddenAreas: ForbiddenArea[] = [
  {
    id: 'forbidden_seal_location',
    name: '封印禁地',
    type: 'sealed',
    dangerLevel: 10,
    description: `天魔皇被封印的地方，是青云大陆最危险的禁地之一。封印禁地常年被魔气笼罩，有无数禁制和陷阱。

封印禁地是天魔宗的圣地，也是正道修士的禁地。`,
    history: `封印禁地是上古纪元时期青云仙尊等人封印天魔皇的地方。

数千年来，无数修士试图进入封印禁地，但大多有去无回。`,
    location: '魔域深处',
    dangers: ['天魔皇的魔气', '禁制', '陷阱', '魔修', '空间裂缝'],
    forbiddenReason: '封印天魔皇的地方，极其危险',
    survivors: ['青云仙尊', '玄天老祖', '万剑真人', '丹霞仙子'],
    secrets: ['天魔皇封印的秘密', '解封方法', '天魔传承'],
    rumors: [
      '传说封印正在松动',
      '传说天魔皇即将苏醒',
      '传说封印禁地有通往魔界的通道'
    ]
  },
  {
    id: 'forbidden_deep_sea',
    name: '深海禁地',
    type: 'natural',
    dangerLevel: 10,
    description: `东海深处的危险区域，是青云大陆最神秘的禁地之一。深海禁地常年被迷雾笼罩，有无数强大海兽。

深海禁地是海族的领地，也是人类修士的禁地。`,
    history: `深海禁地自古就是神秘之地，据说上古时期曾有强大的海族统治这里。

数千年来，无数修士试图探索深海禁地，但大多有去无回。`,
    location: '东海深处',
    dangers: ['强大海兽', '水压', '漩涡', '迷雾', '海族'],
    forbiddenReason: '海族的领地，极其危险',
    survivors: ['东海宗开山祖师'],
    secrets: ['龙宫的秘密', '海族传承', '通往仙界的通道'],
    rumors: [
      '传说深海禁地有龙宫',
      '传说深海禁地有上古海神传承',
      '传说深海禁地的尽头是仙界'
    ]
  },
  {
    id: 'forbidden_ice_valley',
    name: '极寒禁地',
    type: 'natural',
    dangerLevel: 9,
    description: `北荒原深处的极寒之地，是青云大陆最寒冷的禁地之一。极寒禁地常年被冰雪覆盖，温度极低。

极寒禁地有无数冰系妖兽和冰系禁制，是修士的禁地。`,
    history: `极寒禁地自古就是极寒之地，据说上古时期曾有冰龙栖息于此。

数千年来，无数修士试图探索极寒禁地，但大多被冻死。`,
    location: '北荒原深处',
    dangers: ['极寒', '冰系妖兽', '冰系禁制', '冰风暴', '冰龙传说'],
    forbiddenReason: '极寒之地，温度极低',
    survivors: ['冰心真人'],
    secrets: ['冰龙传承', '冰系至宝', '上古冰神遗迹'],
    rumors: [
      '传说极寒禁地有冰龙',
      '传说极寒禁地有冰神传承',
      '传说极寒禁地的深处有通往冰界的通道'
    ]
  },
  {
    id: 'forbidden_fire_sea',
    name: '火海禁地',
    type: 'natural',
    dangerLevel: 9,
    description: `西域荒漠深处的火山群，是青云大陆最炎热的禁地之一。火海禁地常年被火焰笼罩，温度极高。

火海禁地有无数火系妖兽和火系禁制，是修士的禁地。`,
    history: `火海禁地自古就是极热之地，据说上古时期曾有火凤凰栖息于此。

数千年来，无数修士试图探索火海禁地，但大多被烧死。`,
    location: '西域荒漠深处',
    dangers: ['极热', '火系妖兽', '火系禁制', '岩浆', '火凤凰传说'],
    forbiddenReason: '极热之地，温度极高',
    survivors: ['火心真人'],
    secrets: ['火凤凰传承', '火系至宝', '上古火神遗迹'],
    rumors: [
      '传说火海禁地有火凤凰',
      '传说火海禁地有火神传承',
      '传说火海禁地的深处有通往火界的通道'
    ]
  },
  {
    id: 'forbidden_poison_swamp',
    name: '毒雾禁地',
    type: 'natural',
    dangerLevel: 9,
    description: `南荒丛林深处的毒沼，是青云大陆最毒的禁地之一。毒雾禁地常年被毒雾笼罩，毒气极其浓郁。

毒雾禁地有无数毒虫和毒兽，是修士的禁地。`,
    history: `毒雾禁地自古就是剧毒之地，据说上古时期曾有毒龙栖息于此。

数千年来，无数修士试图探索毒雾禁地，但大多中毒而死。`,
    location: '南荒丛林深处',
    dangers: ['剧毒', '毒虫', '毒兽', '毒雾', '毒龙传说'],
    forbiddenReason: '剧毒之地，毒气极其浓郁',
    survivors: ['毒心真人'],
    secrets: ['毒龙传承', '毒系至宝', '上古毒神遗迹'],
    rumors: [
      '传说毒雾禁地有毒龙',
      '传说毒雾禁地有毒神传承',
      '传说毒雾禁地的深处有通往毒界的通道'
    ]
  }
]

export const ancientRuins: AncientRuin[] = [
  {
    id: 'ruin_ancient_dynasty',
    name: '上古王朝遗迹',
    era: '上古纪元',
    type: 'city',
    description: `上古时期一个强大王朝的遗迹，是青云大陆最神秘的上古遗迹之一。上古王朝遗迹埋藏着无数宝藏，但也有无数危险。

上古王朝遗迹极其广阔，分为多个区域，每个区域都有不同的危险和宝藏。`,
    history: `上古王朝是上古纪元时期的一个强大王朝，据说其国力甚至超过现在的大夏王朝和大周王朝。

但上古纪元末期，上古王朝在天魔皇的进攻中覆灭，只留下了这座遗迹。`,
    location: '西域荒漠深处',
    dangers: ['上古禁制', '上古妖兽', '陷阱', '空间裂缝', '怨灵'],
    treasures: ['上古法宝', '上古丹药', '上古功法', '灵石矿', '天材地宝'],
    explorers: ['青云宗探险队', '玄天宗探险队', '散修联盟'],
    status: 'partially_explored'
  },
  {
    id: 'ruin_ancient_sect',
    name: '上古宗门遗迹',
    era: '上古纪元',
    type: 'sect',
    description: `上古时期一个强大宗门的遗迹，是青云大陆最神秘的上古遗迹之一。上古宗门遗迹埋藏着无数宝藏，但也有无数危险。

上古宗门遗迹极其广阔，分为多个区域，每个区域都有不同的危险和宝藏。`,
    history: `上古宗门是上古纪元时期的一个强大宗门，据说其实力甚至超过现在的青云宗。

但上古纪元末期，上古宗门在天魔皇的进攻中覆灭，只留下了这座遗迹。`,
    location: '北荒原深处',
    dangers: ['上古禁制', '上古妖兽', '陷阱', '空间裂缝', '怨灵'],
    treasures: ['上古法宝', '上古丹药', '上古功法', '灵石矿', '天材地宝'],
    explorers: ['青云宗探险队', '万剑宗探险队'],
    status: 'partially_explored'
  },
  {
    id: 'ruin_ancient_battlefield',
    name: '上古战场遗迹',
    era: '上古纪元',
    type: 'battlefield',
    description: `上古时期正魔大战的战场遗迹，是青云大陆最广阔的上古遗迹之一。上古战场遗迹埋藏着无数修士的遗物，但也有无数危险。

上古战场遗迹极其广阔，分为多个区域，每个区域都有不同的危险和遗物。`,
    history: `上古战场是上古纪元时期正魔大战的遗址。那场大战持续了数百年，无数修士陨落于此。

大战结束后，这里成为了修士探索的重要场所。`,
    location: '北荒原深处',
    dangers: ['上古怨灵', '禁制', '陷阱', '上古妖兽', '空间裂缝'],
    treasures: ['上古法宝', '上古丹药', '上古功法', '灵石矿', '天材地宝'],
    explorers: ['青云宗探险队', '玄天宗探险队', '天魔宗探险队'],
    status: 'partially_explored'
  }
]