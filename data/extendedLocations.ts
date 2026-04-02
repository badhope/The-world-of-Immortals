import { Location } from '../src/types'

export interface LocationEvent {
  id: string
  name: string
  description: string
  probability: number
  conditions?: {
    time?: string[]
    weather?: string[]
    realm?: number
  }
}

export interface LocationSecret {
  id: string
  name: string
  description: string
  discoveryMethod: 'explore' | 'item' | 'quest' | 'random'
  requiredItem?: string
  requiredQuest?: string
  rewards: {
    items?: { [key: string]: number }
    exp?: number
    unlockLocation?: string
  }
}

export const extendedLocations: Record<string, Location> = {
  starter_village: {
    id: 'starter_village',
    name: '青云村',
    type: 'village',
    description: '一个坐落在山脚下的小村庄，村民多以采药为生。这里是你修仙之路的起点。村中有村长、药师和铁匠，可以为你提供基础的帮助。',
    icon: '🏘️',
    tier: 1,
    connections: ['green_mountain', 'spirit_forest', 'river_bank'],
    resources: [
      { type: 'spirit_grass', richness: 0.5, regeneration: 86400 }
    ],
    npcs: ['village_elder', 'herbalist_wang', 'blacksmith_li'],
    buildings: ['starter_house', 'village_well', 'herb_garden']
  },
  
  green_mountain: {
    id: 'green_mountain',
    name: '青山',
    type: 'mountain',
    description: '一座灵气充沛的山峰，山腰处有数个天然洞府，常有散修在此修炼。山中灵草丰富，但也有野兽出没。传说这里是千年前青云仙人修炼之地。',
    icon: '⛰️',
    tier: 1,
    connections: ['starter_village', 'mountain_cave', 'cloud_peak', 'waterfall', 'herb_valley'],
    resources: [
      { type: 'spirit_stone_low', richness: 0.3, regeneration: 172800 },
      { type: 'spirit_grass', richness: 0.7, regeneration: 86400 },
      { type: 'iron_ore', richness: 0.4, regeneration: 259200 },
      { type: 'wild_fruit', richness: 0.5, regeneration: 43200 }
    ],
    dangers: ['wild_beast', 'fallen_cultivator'],
    events: [
      {
        id: 'mountain_fog',
        name: '山雾迷踪',
        description: '浓雾笼罩山间，能见度极低。',
        probability: 0.2,
        conditions: { time: ['清晨', '傍晚'] }
      }
    ]
  },
  
  mountain_cave: {
    id: 'mountain_cave',
    name: '山腰洞府',
    type: 'cave',
    description: '青山山腰的一处天然洞府，灵气比外界浓郁，适合修炼。洞府深处似乎隐藏着什么秘密...',
    icon: '🕳️',
    tier: 1,
    connections: ['green_mountain', 'underground_river', 'hidden_chamber'],
    resources: [
      { type: 'spirit_stone_low', richness: 0.5, regeneration: 86400 },
      { type: 'crystal', richness: 0.2, regeneration: 432000 }
    ],
    buildings: ['cave_dwelling'],
    events: [
      {
        id: 'cave_echo',
        name: '洞中回响',
        description: '洞中传来奇怪的回响，似乎有人在低语。',
        probability: 0.15
      }
    ]
  },
  
  hidden_chamber: {
    id: 'hidden_chamber',
    name: '隐秘石室',
    type: 'cave',
    description: '洞府深处的一间隐秘石室，墙壁上刻满了古老的符文。这里似乎与青云仙人的传承有关...',
    icon: '🔮',
    tier: 2,
    connections: ['mountain_cave'],
    resources: [
      { type: 'inheritance_fragment', richness: 0.1, regeneration: 604800 }
    ],
    events: [
      {
        id: 'ancient_inscription',
        name: '古老铭文',
        description: '石壁上的符文开始发光，似乎在传达某种信息。',
        probability: 0.3
      }
    ]
  },
  
  cloud_peak: {
    id: 'cloud_peak',
    name: '云顶峰',
    type: 'mountain',
    description: '青山的最高峰，常年云雾缭绕。传说曾有仙人在此羽化登仙。山顶灵气极其浓郁，是修炼的绝佳之地，但也有强大的灵兽守护。',
    icon: '🏔️',
    tier: 2,
    connections: ['green_mountain', 'secret_realm_entrance', 'immortal_platform'],
    resources: [
      { type: 'spirit_stone_mid', richness: 0.2, regeneration: 259200 },
      { type: 'ginseng_100', richness: 0.1, regeneration: 604800 },
      { type: 'cloud_essence', richness: 0.05, regeneration: 864000 }
    ],
    dangers: ['spirit_beast', 'array_trap', 'cloud_demon'],
    events: [
      {
        id: 'cloud_surge',
        name: '云海翻涌',
        description: '山顶的云海突然翻涌，灵气浓度急剧上升。',
        probability: 0.1,
        conditions: { time: ['清晨', '傍晚'] }
      }
    ]
  },
  
  immortal_platform: {
    id: 'immortal_platform',
    name: '飞升台',
    type: 'ruins',
    description: '云顶峰上的一处古老平台，据说是青云仙人飞升之地。平台上的阵法依然在运转，散发着淡淡的光芒。',
    icon: '✨',
    tier: 3,
    connections: ['cloud_peak'],
    resources: [
      { type: 'ascension_essence', richness: 0.01, regeneration: 2592000 }
    ],
    events: [
      {
        id: 'immortal_echo',
        name: '仙人余音',
        description: '虚空中传来仙人的声音，似乎在讲述大道的真谛。',
        probability: 0.05
      }
    ]
  },
  
  spirit_forest: {
    id: 'spirit_forest',
    name: '灵木林',
    type: 'forest',
    description: '一片古老的森林，树木高大挺拔，蕴含灵气。林中常有灵兽出没，深处更是危险重重。但传说林中藏有传承碎片...',
    icon: '🌲',
    tier: 1,
    connections: ['starter_village', 'forest_depth', 'ancient_ruins', 'herb_valley', 'fairy_pool'],
    resources: [
      { type: 'spirit_wood', richness: 0.8, regeneration: 172800 },
      { type: 'spirit_grass', richness: 0.4, regeneration: 86400 },
      { type: 'wild_fruit', richness: 0.6, regeneration: 43200 },
      { type: 'beast_core_low', richness: 0.1, regeneration: 259200 }
    ],
    dangers: ['spirit_wolf', 'poisonous_insect', 'tree_demon'],
    events: [
      {
        id: 'forest_whisper',
        name: '林中低语',
        description: '树林中传来神秘的低语声，似乎在指引方向。',
        probability: 0.15
      }
    ]
  },
  
  forest_depth: {
    id: 'forest_depth',
    name: '林深处',
    type: 'forest',
    description: '灵木林深处，光线昏暗，灵气却异常浓郁。据说有妖兽在此筑巢，还有森林之灵守护着传承碎片。',
    icon: '🌳',
    tier: 2,
    connections: ['spirit_forest', 'demon_lair', 'spirit_grove'],
    resources: [
      { type: 'spirit_wood', richness: 1.0, regeneration: 259200 },
      { type: 'beast_core_low', richness: 0.3, regeneration: 432000 },
      { type: 'rare_herb', richness: 0.2, regeneration: 345600 },
      { type: 'inheritance_fragment', richness: 0.05, regeneration: 604800 }
    ],
    dangers: ['demon_beast', 'lost_soul', 'forest_guardian'],
    npcs: ['forest_spirit']
  },
  
  spirit_grove: {
    id: 'spirit_grove',
    name: '灵木圣域',
    type: 'forest',
    description: '森林深处的一片神圣区域，古老的灵木散发着柔和的光芒。这里是森林之灵的居所，也是传承碎片的守护之地。',
    icon: '🌿',
    tier: 3,
    connections: ['forest_depth'],
    resources: [
      { type: 'spirit_heart_wood', richness: 0.1, regeneration: 864000 },
      { type: 'life_essence', richness: 0.05, regeneration: 1296000 }
    ],
    npcs: ['forest_spirit']
  },
  
  demon_lair: {
    id: 'demon_lair',
    name: '妖兽巢穴',
    type: 'cave',
    description: '一处阴暗的洞穴，散发着浓烈的妖气。这里是妖兽的聚集地，深处据说有妖王存在。',
    icon: '👹',
    tier: 3,
    connections: ['forest_depth', 'demon_king_chamber'],
    resources: [
      { type: 'demon_core', richness: 0.5, regeneration: 518400 },
      { type: 'beast_blood', richness: 0.4, regeneration: 259200 },
      { type: 'demon_crystal', richness: 0.2, regeneration: 604800 }
    ],
    dangers: ['demon_king', 'demon_swarm', 'demon_elder']
  },
  
  demon_king_chamber: {
    id: 'demon_king_chamber',
    name: '妖王殿',
    type: 'cave',
    description: '妖兽巢穴的最深处，妖王盘踞之地。击败妖王可以获得丰厚的奖励，但风险极高。',
    icon: '👑',
    tier: 4,
    connections: ['demon_lair'],
    resources: [
      { type: 'demon_king_core', richness: 0.1, regeneration: 2592000 },
      { type: 'demon_treasure', richness: 0.2, regeneration: 1296000 }
    ],
    dangers: ['demon_king']
  },
  
  ancient_ruins: {
    id: 'ancient_ruins',
    name: '上古遗迹',
    type: 'ruins',
    description: '一处上古时期遗留的废墟，残垣断壁间隐约可见昔日的辉煌。据说藏有上古传承，但机关重重，危险异常。',
    icon: '🏛️',
    tier: 3,
    connections: ['spirit_forest', 'ruins_depth', 'treasure_vault'],
    resources: [
      { type: 'artifact_fragment', richness: 0.1, regeneration: 604800 },
      { type: 'ancient_coin', richness: 0.3, regeneration: 259200 }
    ],
    dangers: ['ancient_guardian', 'trap_array', 'cursed_spirit'],
    events: [
      {
        id: 'ruins_awakening',
        name: '遗迹觉醒',
        description: '遗迹中的阵法突然启动，古老的机关开始运转。',
        probability: 0.1
      }
    ]
  },
  
  ruins_depth: {
    id: 'ruins_depth',
    name: '遗迹深处',
    type: 'ruins',
    description: '上古遗迹的内部，保存着完整的建筑和阵法。这里藏有上古修士的传承，但守护者也更加强大。',
    icon: '🗿',
    tier: 4,
    connections: ['ancient_ruins', 'inheritance_hall'],
    resources: [
      { type: 'ancient_artifact', richness: 0.05, regeneration: 1296000 },
      { type: 'inheritance_fragment', richness: 0.1, regeneration: 604800 }
    ],
    dangers: ['ancient_spirit', 'array_guardian']
  },
  
  inheritance_hall: {
    id: 'inheritance_hall',
    name: '传承大殿',
    type: 'ruins',
    description: '遗迹最深处的大殿，保存着上古修士的完整传承。但要通过考验才能获得...',
    icon: '🌟',
    tier: 5,
    connections: ['ruins_depth'],
    resources: [
      { type: 'complete_inheritance', richness: 0.01, regeneration: 2592000 }
    ]
  },
  
  herb_valley: {
    id: 'herb_valley',
    name: '灵药谷',
    type: 'forest',
    description: '一个被群山环绕的山谷，生长着各种珍稀灵草。谷中灵气浓郁，是炼丹师的圣地。',
    icon: '🌸',
    tier: 2,
    connections: ['green_mountain', 'spirit_forest', 'valley_depth'],
    resources: [
      { type: 'spirit_grass', richness: 1.0, regeneration: 86400 },
      { type: 'rare_herb', richness: 0.5, regeneration: 172800 },
      { type: 'ginseng_100', richness: 0.2, regeneration: 432000 },
      { type: 'spirit_flower', richness: 0.3, regeneration: 259200 }
    ],
    dangers: ['poisonous_plant', 'valley_guardian'],
    events: [
      {
        id: 'herb_bloom',
        name: '灵草盛开',
        description: '谷中的灵草同时盛开，灵气浓度达到顶峰。',
        probability: 0.15,
        conditions: { time: ['清晨'] }
      }
    ]
  },
  
  valley_depth: {
    id: 'valley_depth',
    name: '谷底秘境',
    type: 'secret_realm',
    description: '灵药谷的深处，一个隐藏的秘境。这里生长着传说中的仙草，但守护者也极其强大。',
    icon: '🌺',
    tier: 3,
    connections: ['herb_valley'],
    resources: [
      { type: 'immortal_herb', richness: 0.1, regeneration: 864000 },
      { type: 'ginseng_1000', richness: 0.05, regeneration: 1296000 }
    ],
    dangers: ['immortal_guardian']
  },
  
  waterfall: {
    id: 'waterfall',
    name: '飞瀑',
    type: 'mountain',
    description: '青山中的一处壮观瀑布，水流从百丈高崖倾泻而下。瀑布后方似乎有洞穴...',
    icon: '💧',
    tier: 1,
    connections: ['green_mountain', 'waterfall_cave'],
    resources: [
      { type: 'spirit_water', richness: 0.6, regeneration: 86400 }
    ],
    events: [
      {
        id: 'waterfall_rainbow',
        name: '瀑布彩虹',
        description: '阳光穿过水雾，形成美丽的彩虹，灵气变得格外纯净。',
        probability: 0.2,
        conditions: { time: ['上午', '中午'] }
      }
    ]
  },
  
  waterfall_cave: {
    id: 'waterfall_cave',
    name: '水帘洞',
    type: 'cave',
    description: '瀑布后方隐藏的洞穴，干燥而神秘。洞壁上刻有古老的修炼心法。',
    icon: '🌊',
    tier: 2,
    connections: ['waterfall', 'underground_lake'],
    resources: [
      { type: 'cultivation_manual', richness: 0.1, regeneration: 604800 }
    ],
    buildings: ['water_cave_dwelling']
  },
  
  underground_lake: {
    id: 'underground_lake',
    name: '地下湖',
    type: 'cave',
    description: '洞穴深处的地下湖泊，湖水清澈见底，散发着淡淡的灵光。湖中似乎有某种生物...',
    icon: '🌙',
    tier: 3,
    connections: ['waterfall_cave', 'underground_river'],
    resources: [
      { type: 'spirit_pearl', richness: 0.1, regeneration: 864000 },
      { type: 'lake_spirit_essence', richness: 0.05, regeneration: 1296000 }
    ],
    dangers: ['lake_spirit']
  },
  
  underground_river: {
    id: 'underground_river',
    name: '地下暗河',
    type: 'cave',
    description: '一条流淌在地下的暗河，河水冰冷刺骨，却蕴含着特殊的灵气。',
    icon: '🌀',
    tier: 2,
    connections: ['mountain_cave', 'underground_lake', 'crystal_cave'],
    resources: [
      { type: 'cold_spirit_water', richness: 0.4, regeneration: 172800 }
    ],
    dangers: ['underground_creature']
  },
  
  crystal_cave: {
    id: 'crystal_cave',
    name: '水晶洞',
    type: 'cave',
    description: '一个由水晶构成的洞穴，光芒四射，美轮美奂。水晶中蕴含着纯净的灵气。',
    icon: '💎',
    tier: 3,
    connections: ['underground_river'],
    resources: [
      { type: 'spirit_crystal', richness: 0.5, regeneration: 432000 },
      { type: 'pure_crystal', richness: 0.2, regeneration: 864000 }
    ]
  },
  
  secret_realm_entrance: {
    id: 'secret_realm_entrance',
    name: '秘境入口',
    type: 'secret_realm',
    description: '云顶峰上的一处隐秘入口，通向传说中的青云秘境。入口被强大的阵法封印，需要传承之钥才能开启。',
    icon: '🚪',
    tier: 4,
    connections: ['cloud_peak', 'qingyun_secret_realm'],
    events: [
      {
        id: 'seal_fluctuation',
        name: '封印波动',
        description: '秘境入口的封印出现波动，似乎即将开启。',
        probability: 0.05
      }
    ]
  },
  
  qingyun_secret_realm: {
    id: 'qingyun_secret_realm',
    name: '青云秘境',
    type: 'secret_realm',
    description: '青云仙人创造的独立空间，藏有完整的传承。秘境中灵气浓郁，但也有强大的守护者和危险的试炼。',
    icon: '🌈',
    tier: 5,
    connections: ['secret_realm_entrance', 'trial_ground', 'inheritance_platform'],
    resources: [
      { type: 'immortal_stone', richness: 0.3, regeneration: 864000 },
      { type: 'ascension_essence', richness: 0.1, regeneration: 1296000 }
    ],
    dangers: ['realm_guardian', 'trial_array']
  },
  
  trial_ground: {
    id: 'trial_ground',
    name: '试炼之地',
    type: 'secret_realm',
    description: '秘境中的试炼场所，需要通过心性、悟性、意志三重考验才能获得传承。',
    icon: '⚔️',
    tier: 5,
    connections: ['qingyun_secret_realm']
  },
  
  inheritance_platform: {
    id: 'inheritance_platform',
    name: '传承之台',
    type: 'secret_realm',
    description: '秘境的核心区域，青云仙人的传承就藏在这里。通过所有试炼后，才能登上传承之台。',
    icon: '🌟',
    tier: 5,
    connections: ['qingyun_secret_realm']
  },
  
  river_bank: {
    id: 'river_bank',
    name: '清河岸',
    type: 'village',
    description: '流经青云村的清河岸边，河水清澈，鱼虾丰富。河边常有村民洗衣打水。',
    icon: '🌊',
    tier: 1,
    connections: ['starter_village', 'riverside_cave'],
    resources: [
      { type: 'river_fish', richness: 0.7, regeneration: 43200 },
      { type: 'river_stone', richness: 0.5, regeneration: 86400 }
    ]
  },
  
  riverside_cave: {
    id: 'riverside_cave',
    name: '河畔洞府',
    type: 'cave',
    description: '河岸边的一处隐蔽洞府，入口被藤蔓遮盖。洞中似乎有人居住过的痕迹...',
    icon: '🕳️',
    tier: 1,
    connections: ['river_bank'],
    buildings: ['riverside_dwelling']
  },
  
  fairy_pool: {
    id: 'fairy_pool',
    name: '仙女池',
    type: 'forest',
    description: '灵木林中的一处清澈池塘，传说曾有仙女在此沐浴。池水具有神奇的治愈效果。',
    icon: '🧚',
    tier: 2,
    connections: ['spirit_forest'],
    resources: [
      { type: 'fairy_water', richness: 0.3, regeneration: 172800 }
    ],
    events: [
      {
        id: 'fairy_appearance',
        name: '仙女现身',
        description: '池中出现仙女的虚影，似乎在传授修炼心得。',
        probability: 0.05,
        conditions: { time: ['夜晚', '深夜'] }
      }
    ]
  },
  
  treasure_vault: {
    id: 'treasure_vault',
    name: '宝库',
    type: 'ruins',
    description: '上古遗迹中隐藏的宝库，藏有大量珍贵的宝物。但宝库有强大的守护阵法...',
    icon: '💰',
    tier: 4,
    connections: ['ancient_ruins'],
    resources: [
      { type: 'ancient_gold', richness: 0.5, regeneration: 604800 },
      { type: 'rare_gem', richness: 0.3, regeneration: 864000 },
      { type: 'artifact', richness: 0.1, regeneration: 1296000 }
    ],
    dangers: ['vault_guardian']
  }
}

export const locationSecrets: LocationSecret[] = [
  {
    id: 'secret_hidden_chamber',
    name: '隐秘石室',
    description: '山腰洞府深处的隐秘石室，藏有传承碎片。',
    discoveryMethod: 'explore',
    rewards: {
      items: { inheritance_fragment: 1 },
      exp: 200,
      unlockLocation: 'hidden_chamber'
    }
  },
  {
    id: 'secret_waterfall_cave',
    name: '水帘洞',
    description: '瀑布后方的隐藏洞穴。',
    discoveryMethod: 'explore',
    rewards: {
      items: { cultivation_manual: 1 },
      exp: 100,
      unlockLocation: 'waterfall_cave'
    }
  },
  {
    id: 'secret_spirit_grove',
    name: '灵木圣域',
    description: '森林深处的神圣区域，森林之灵的居所。',
    discoveryMethod: 'quest',
    requiredQuest: 'quest_spirit_beast',
    rewards: {
      items: { inheritance_fragment: 1 },
      exp: 300,
      unlockLocation: 'spirit_grove'
    }
  },
  {
    id: 'secret_inheritance_hall',
    name: '传承大殿',
    description: '遗迹深处的传承大殿。',
    discoveryMethod: 'item',
    requiredItem: 'inheritance_key',
    rewards: {
      items: { complete_inheritance: 1 },
      exp: 1000,
      unlockLocation: 'inheritance_hall'
    }
  },
  {
    id: 'secret_crystal_cave',
    name: '水晶洞',
    description: '地下暗河深处的水晶洞穴。',
    discoveryMethod: 'explore',
    rewards: {
      items: { spirit_crystal: 10 },
      exp: 150,
      unlockLocation: 'crystal_cave'
    }
  },
  {
    id: 'secret_fairy_pool',
    name: '仙女池',
    description: '灵木林中的神秘池塘。',
    discoveryMethod: 'random',
    rewards: {
      items: { fairy_water: 5 },
      exp: 100,
      unlockLocation: 'fairy_pool'
    }
  }
]

export function getLocationById(id: string): Location | undefined {
  return extendedLocations[id]
}

export function getConnectedLocations(locationId: string): Location[] {
  const location = extendedLocations[locationId]
  if (!location) return []
  
  return location.connections
    .map(id => extendedLocations[id])
    .filter(Boolean)
}

export function getLocationsByTier(tier: number): Location[] {
  return Object.values(extendedLocations).filter(loc => loc.tier === tier)
}

export function getLocationResources(locationId: string): string[] {
  const location = extendedLocations[locationId]
  if (!location?.resources) return []
  
  return location.resources.map(r => r.type)
}

export function getLocationDangers(locationId: string): string[] {
  const location = extendedLocations[locationId]
  return location?.dangers || []
}

export function canAccessLocation(locationId: string, playerRealm: number, completedQuests: string[]): boolean {
  const location = extendedLocations[locationId]
  if (!location) return false
  
  if (location.tier > playerRealm + 1) return false
  
  return true
}
