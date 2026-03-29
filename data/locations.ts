import { Location } from '../src/types'

export interface LocationConnection {
  targetId: string
  travelTime: number
  requirements?: {
    realm?: string[]
    item?: string
    quest?: string
  }
  danger?: {
    type: string
    probability: number
  }
}

export interface LocationResource {
  type: string
  richness: number
  regeneration: number
  minRealm?: string
  tool?: string
}

export interface LocationDanger {
  type: string
  name: string
  power: number
  probability: number
  rewards?: { item: string; count: number }[]
}

export const locations: Record<string, Location> = {
  starter_village: {
    id: 'starter_village',
    name: '青云村',
    type: 'village',
    description: '一个坐落在山脚下的小村庄，村民多以采药为生。这里是你修仙之路的起点。',
    icon: '🏘️',
    tier: 1,
    connections: ['green_mountain', 'spirit_forest', 'river_bank'],
    resources: [
      { type: 'spirit_grass', richness: 0.5, regeneration: 86400 }
    ],
    npcs: ['village_elder', 'herbalist_wang', 'blacksmith_li'],
    buildings: ['starter_house']
  },
  
  green_mountain: {
    id: 'green_mountain',
    name: '青山',
    type: 'mountain',
    description: '一座灵气充沛的山峰，山腰处有数个天然洞府，常有散修在此修炼。',
    icon: '⛰️',
    tier: 1,
    connections: ['starter_village', 'mountain_cave', 'cloud_peak', 'waterfall'],
    resources: [
      { type: 'spirit_stone_low', richness: 0.3, regeneration: 172800 },
      { type: 'spirit_grass', richness: 0.7, regeneration: 86400 },
      { type: 'iron_ore', richness: 0.4, regeneration: 259200 }
    ],
    dangers: ['wild_beast', 'fallen_cultivator']
  },
  
  mountain_cave: {
    id: 'mountain_cave',
    name: '山腰洞府',
    type: 'cave',
    description: '青山山腰的一处天然洞府，灵气比外界浓郁，适合修炼。',
    icon: '🕳️',
    tier: 1,
    connections: ['green_mountain', 'underground_river'],
    resources: [
      { type: 'spirit_stone_low', richness: 0.5, regeneration: 86400 }
    ],
    buildings: ['cave_dwelling']
  },
  
  cloud_peak: {
    id: 'cloud_peak',
    name: '云顶峰',
    type: 'mountain',
    description: '青山的最高峰，常年云雾缭绕。传说曾有仙人在此羽化登仙。',
    icon: '🏔️',
    tier: 2,
    connections: ['green_mountain', 'secret_realm_entrance'],
    resources: [
      { type: 'spirit_stone_mid', richness: 0.2, regeneration: 259200 },
      { type: 'ginseng_100', richness: 0.1, regeneration: 604800 }
    ],
    dangers: ['spirit_beast', 'array_trap']
  },
  
  spirit_forest: {
    id: 'spirit_forest',
    name: '灵木林',
    type: 'forest',
    description: '一片古老的森林，树木高大挺拔，蕴含灵气。林中常有灵兽出没。',
    icon: '🌲',
    tier: 1,
    connections: ['starter_village', 'forest_depth', 'ancient_ruins', 'herb_valley'],
    resources: [
      { type: 'spirit_wood', richness: 0.8, regeneration: 172800 },
      { type: 'spirit_grass', richness: 0.4, regeneration: 86400 },
      { type: 'wild_fruit', richness: 0.6, regeneration: 43200 }
    ],
    dangers: ['spirit_wolf', 'poisonous_insect']
  },
  
  forest_depth: {
    id: 'forest_depth',
    name: '林深处',
    type: 'forest',
    description: '灵木林深处，光线昏暗，灵气却异常浓郁。据说有妖兽在此筑巢。',
    icon: '🌳',
    tier: 2,
    connections: ['spirit_forest', 'demon_lair'],
    resources: [
      { type: 'spirit_wood', richness: 1.0, regeneration: 259200 },
      { type: 'beast_core_low', richness: 0.3, regeneration: 432000 },
      { type: 'rare_herb', richness: 0.2, regeneration: 345600 }
    ],
    dangers: ['demon_beast', 'lost_soul']
  },
  
  demon_lair: {
    id: 'demon_lair',
    name: '妖兽巢穴',
    type: 'cave',
    description: '一处阴暗的洞穴，散发着浓烈的妖气。这里是妖兽的聚集地。',
    icon: '👹',
    tier: 3,
    connections: ['forest_depth'],
    resources: [
      { type: 'demon_core', richness: 0.5, regeneration: 518400 },
      { type: 'beast_blood', richness: 0.4, regeneration: 259200 }
    ],
    dangers: ['demon_king', 'demon_swarm']
  },
  
  ancient_ruins: {
    id: 'ancient_ruins',
    name: '上古遗迹',
    type: 'ruins',
    description: '一处上古时期遗留的废墟，残垣断壁间隐约可见昔日的辉煌。据说藏有上古传承。',
    icon: '🏛️',
    tier: 3,
    connections: ['spirit_forest', 'ruins_depth'],
    resources: [
      { type: 'artifact_fragment', richness: 0.1, regeneration: 604800 }
    ],
    dangers: ['undead', 'array_spirit', 'trap']
  },
  
  ruins_depth: {
    id: 'ruins_depth',
    name: '遗迹深处',
    type: 'ruins',
    description: '上古遗迹的核心区域，危险与机遇并存。传说有上古大能的传承在此。',
    icon: '⚱️',
    tier: 4,
    connections: ['ancient_ruins'],
    resources: [
      { type: 'ancient_artifact', richness: 0.05, regeneration: 1209600 },
      { type: 'immortal_jade', richness: 0.1, regeneration: 604800 }
    ],
    dangers: ['ancient_guardian', 'curse']
  },
  
  secret_realm_entrance: {
    id: 'secret_realm_entrance',
    name: '秘境入口',
    type: 'secret_realm',
    description: '一处空间裂缝，通往一个上古仙人开辟的小秘境。入口时隐时现，充满危险。',
    icon: '🌀',
    tier: 3,
    connections: ['cloud_peak', 'secret_realm_inner'],
    dangers: ['space_storm', 'guardian_beast']
  },
  
  secret_realm_inner: {
    id: 'secret_realm_inner',
    name: '仙人秘境',
    type: 'secret_realm',
    description: '秘境内部，灵气浓郁到几乎凝成实质。这里保存着上古仙人的传承和宝藏。',
    icon: '✨',
    tier: 4,
    connections: ['secret_realm_entrance', 'immortal_palace'],
    resources: [
      { type: 'spirit_stone_mid', richness: 1.0, regeneration: 86400 },
      { type: 'immortal_herb', richness: 0.3, regeneration: 259200 }
    ],
    dangers: ['array_spirit', 'illusion', 'ancient_guardian']
  },
  
  immortal_palace: {
    id: 'immortal_palace',
    name: '仙宫',
    type: 'secret_realm',
    description: '秘境最深处的一座宫殿，散发着仙光。据说有仙人的传承在此。',
    icon: '🏰',
    tier: 5,
    connections: ['secret_realm_inner'],
    resources: [
      { type: 'immortal_crystal', richness: 0.2, regeneration: 1209600 },
      { type: 'divine_herb', richness: 0.1, regeneration: 2592000 }
    ],
    dangers: ['immortal_guardian', 'divine_tribulation']
  },
  
  river_bank: {
    id: 'river_bank',
    name: '灵河岸边',
    type: 'water',
    description: '一条灵气充沛的河流，河水清澈见底，偶有灵鱼游过。',
    icon: '🌊',
    tier: 1,
    connections: ['starter_village', 'waterfall', 'underground_river'],
    resources: [
      { type: 'spirit_fish', richness: 0.6, regeneration: 86400 },
      { type: 'spirit_water', richness: 0.4, regeneration: 43200 }
    ]
  },
  
  waterfall: {
    id: 'waterfall',
    name: '飞瀑',
    type: 'water',
    description: '一道壮观的瀑布，水流从高处倾泻而下，水雾弥漫。瀑布后有隐秘的洞府。',
    icon: '💦',
    tier: 2,
    connections: ['river_bank', 'green_mountain', 'hidden_cave'],
    resources: [
      { type: 'spirit_water', richness: 0.8, regeneration: 43200 },
      { type: 'water_essence', richness: 0.2, regeneration: 172800 }
    ]
  },
  
  hidden_cave: {
    id: 'hidden_cave',
    name: '瀑布后洞府',
    type: 'cave',
    description: '瀑布后方隐藏的一处洞府，干燥舒适，灵气浓郁。',
    icon: '🪨',
    tier: 2,
    connections: ['waterfall'],
    resources: [
      { type: 'spirit_stone_mid', richness: 0.3, regeneration: 172800 }
    ],
    buildings: ['hidden_dwelling']
  },
  
  underground_river: {
    id: 'underground_river',
    name: '地下暗河',
    type: 'cave',
    description: '一条地下河流，黑暗中闪烁着磷光。据说通向未知的秘境。',
    icon: '🌑',
    tier: 2,
    connections: ['mountain_cave', 'river_bank', 'crystal_cave'],
    resources: [
      { type: 'glow_stone', richness: 0.5, regeneration: 172800 },
      { type: 'underground_fish', richness: 0.3, regeneration: 86400 }
    ],
    dangers: ['underground_beast', 'poison_gas']
  },
  
  crystal_cave: {
    id: 'crystal_cave',
    name: '晶石洞',
    type: 'cave',
    description: '一个布满各种晶石的洞穴，光芒璀璨，美不胜收。',
    icon: '💎',
    tier: 3,
    connections: ['underground_river'],
    resources: [
      { type: 'spirit_crystal', richness: 0.6, regeneration: 259200 },
      { type: 'rare_gem', richness: 0.3, regeneration: 518400 }
    ],
    dangers: ['crystal_golem']
  },
  
  herb_valley: {
    id: 'herb_valley',
    name: '灵草谷',
    type: 'valley',
    description: '一个被群山环绕的山谷，生长着各种珍稀灵草。',
    icon: '🌿',
    tier: 2,
    connections: ['spirit_forest', 'medicine_garden'],
    resources: [
      { type: 'spirit_herb', richness: 0.8, regeneration: 172800 },
      { type: 'rare_herb', richness: 0.4, regeneration: 345600 }
    ]
  },
  
  medicine_garden: {
    id: 'medicine_garden',
    name: '药园',
    type: 'building',
    description: '一处精心打理的药园，种植着各种珍贵药材。',
    icon: '🌱',
    tier: 2,
    connections: ['herb_valley'],
    resources: [
      { type: 'spirit_herb', richness: 1.0, regeneration: 86400 },
      { type: 'ginseng_100', richness: 0.2, regeneration: 259200 }
    ],
    buildings: ['medicine_shed']
  },
  
  sky_city: {
    id: 'sky_city',
    name: '天云城',
    type: 'city',
    description: '修仙界最大的城市之一，各大宗门在此设有分部，坊市繁华，宝物云集。',
    icon: '🏰',
    tier: 2,
    connections: ['green_mountain', 'azure_sect', 'trading_street', 'tavern'],
    npcs: ['city_guard', 'merchant_li', 'auctioneer', 'information_broker'],
    buildings: ['market_stall', 'auction_house', 'teahouse', 'inn']
  },
  
  trading_street: {
    id: 'trading_street',
    name: '坊市',
    type: 'city',
    description: '天云城最繁华的商业街，各种店铺林立，应有尽有。',
    icon: '🏪',
    tier: 2,
    connections: ['sky_city', 'blacksmith_shop', 'alchemy_shop', 'artifact_shop'],
    npcs: ['shop_keeper', 'street_vendor'],
    buildings: ['shop']
  },
  
  blacksmith_shop: {
    id: 'blacksmith_shop',
    name: '铁匠铺',
    type: 'building',
    description: '一家规模不小的铁匠铺，可以打造和修理各种装备。',
    icon: '⚒️',
    tier: 2,
    connections: ['trading_street'],
    npcs: ['master_blacksmith'],
    buildings: ['forge']
  },
  
  alchemy_shop: {
    id: 'alchemy_shop',
    name: '丹药铺',
    type: 'building',
    description: '一家丹药铺，出售各种丹药，也收购灵草。',
    icon: '🧪',
    tier: 2,
    connections: ['trading_street'],
    npcs: ['alchemist'],
    buildings: ['alchemy_room']
  },
  
  artifact_shop: {
    id: 'artifact_shop',
    name: '法器店',
    type: 'building',
    description: '一家专门出售法器的店铺，各种法宝琳琅满目。',
    icon: '🔮',
    tier: 2,
    connections: ['trading_street'],
    npcs: ['artifact_dealer'],
    buildings: ['artifact_storage']
  },
  
  tavern: {
    id: 'tavern',
    name: '醉仙楼',
    type: 'building',
    description: '天云城最有名的酒楼，可以打听到各种消息。',
    icon: '🍺',
    tier: 2,
    connections: ['sky_city'],
    npcs: ['bartender', 'mysterious_guest'],
    buildings: ['inn']
  },
  
  azure_sect: {
    id: 'azure_sect',
    name: '青云宗',
    type: 'sect',
    description: '修仙界著名的正道宗门，以剑道闻名。山门宏伟，灵气充沛。',
    icon: '🏯',
    tier: 3,
    connections: ['sky_city', 'sect_library', 'training_peak', 'sect_entrance'],
    npcs: ['sect_elder', 'mission_deacon', 'hall_master'],
    buildings: ['sect_dwelling', 'training_ground', 'mission_hall']
  },
  
  sect_entrance: {
    id: 'sect_entrance',
    name: '山门',
    type: 'sect',
    description: '青云宗的山门，有弟子守卫，非宗门弟子不得入内。',
    icon: '🚪',
    tier: 2,
    connections: ['azure_sect', 'sky_city'],
    npcs: ['sect_disciple']
  },
  
  sect_library: {
    id: 'sect_library',
    name: '藏经阁',
    type: 'sect',
    description: '青云宗的藏经阁，收藏着无数功法秘籍和修炼心得。',
    icon: '📚',
    tier: 3,
    connections: ['azure_sect'],
    npcs: ['library_keeper'],
    buildings: ['library']
  },
  
  training_peak: {
    id: 'training_peak',
    name: '演武峰',
    type: 'mountain',
    description: '青云宗弟子切磋武艺的地方，设有各种修炼设施。',
    icon: '⚔️',
    tier: 3,
    connections: ['azure_sect', 'sword_pavilion'],
    buildings: ['training_ground', 'sparring_arena']
  },
  
  sword_pavilion: {
    id: 'sword_pavilion',
    name: '剑阁',
    type: 'sect',
    description: '青云宗存放剑器的楼阁，藏有各种名剑。',
    icon: '🗡️',
    tier: 3,
    connections: ['training_peak'],
    npcs: ['sword_keeper'],
    buildings: ['weapon_storage']
  },
  
  desert_entrance: {
    id: 'desert_entrance',
    name: '荒漠边缘',
    type: 'desert',
    description: '一片广袤的荒漠边缘，风沙漫天，据说深处有上古遗迹。',
    icon: '🏜️',
    tier: 3,
    connections: ['sky_city', 'desert_depth', 'oasis'],
    dangers: ['sand_storm', 'desert_beast']
  },
  
  desert_depth: {
    id: 'desert_depth',
    name: '荒漠深处',
    type: 'desert',
    description: '荒漠的深处，几乎看不到任何生命迹象。但传说有宝藏埋藏于此。',
    icon: '☀️',
    tier: 4,
    connections: ['desert_entrance', 'desert_ruins'],
    resources: [
      { type: 'fire_spirit_stone', richness: 0.3, regeneration: 518400 }
    ],
    dangers: ['fire_elemental', 'sand_worm']
  },
  
  desert_ruins: {
    id: 'desert_ruins',
    name: '沙漠遗迹',
    type: 'ruins',
    description: '荒漠深处的一处遗迹，被黄沙掩埋了千年。',
    icon: '🏺',
    tier: 4,
    connections: ['desert_depth'],
    resources: [
      { type: 'ancient_artifact', richness: 0.2, regeneration: 1209600 }
    ],
    dangers: ['mummy', 'curse']
  },
  
  oasis: {
    id: 'oasis',
    name: '绿洲',
    type: 'water',
    description: '荒漠中的一片绿洲，有清澈的泉水和茂盛的植被。',
    icon: '🌴',
    tier: 3,
    connections: ['desert_entrance'],
    resources: [
      { type: 'spirit_water', richness: 0.6, regeneration: 86400 },
      { type: 'desert_herb', richness: 0.4, regeneration: 172800 }
    ]
  }
}

export const locationDangers: Record<string, LocationDanger[]> = {
  green_mountain: [
    { type: 'wild_beast', name: '山狼', power: 10, probability: 0.1, rewards: [{ item: 'beast_pelt', count: 1 }] },
    { type: 'fallen_cultivator', name: '落魄散修', power: 15, probability: 0.05, rewards: [{ item: 'spirit_stone_low', count: 5 }] }
  ],
  spirit_forest: [
    { type: 'spirit_wolf', name: '灵狼', power: 12, probability: 0.1, rewards: [{ item: 'beast_core_low', count: 1 }] },
    { type: 'poisonous_insect', name: '毒虫', power: 8, probability: 0.15, rewards: [{ item: 'insect_poison', count: 1 }] }
  ],
  forest_depth: [
    { type: 'demon_beast', name: '妖兽', power: 25, probability: 0.15, rewards: [{ item: 'demon_core', count: 1 }] },
    { type: 'lost_soul', name: '游魂', power: 20, probability: 0.1, rewards: [{ item: 'soul_crystal', count: 1 }] }
  ],
  cloud_peak: [
    { type: 'spirit_beast', name: '灵兽', power: 35, probability: 0.1, rewards: [{ item: 'spirit_beast_core', count: 1 }] },
    { type: 'array_trap', name: '阵法陷阱', power: 30, probability: 0.05 }
  ],
  ancient_ruins: [
    { type: 'undead', name: '不死生物', power: 40, probability: 0.15, rewards: [{ item: 'undead_bone', count: 1 }] },
    { type: 'array_spirit', name: '阵灵', power: 50, probability: 0.05, rewards: [{ item: 'array_core', count: 1 }] }
  ],
  demon_lair: [
    { type: 'demon_king', name: '妖王', power: 80, probability: 0.05, rewards: [{ item: 'demon_king_core', count: 1 }] },
    { type: 'demon_swarm', name: '妖兽群', power: 60, probability: 0.15, rewards: [{ item: 'demon_core', count: 3 }] }
  ],
  secret_realm_entrance: [
    { type: 'space_storm', name: '空间风暴', power: 70, probability: 0.1 },
    { type: 'guardian_beast', name: '守护兽', power: 60, probability: 0.1, rewards: [{ item: 'guardian_core', count: 1 }] }
  ],
  secret_realm_inner: [
    { type: 'ancient_guardian', name: '上古守护者', power: 100, probability: 0.1, rewards: [{ item: 'ancient_core', count: 1 }] },
    { type: 'illusion', name: '幻境', power: 50, probability: 0.15 }
  ],
  desert_depth: [
    { type: 'fire_elemental', name: '火元素', power: 55, probability: 0.1, rewards: [{ item: 'fire_essence', count: 1 }] },
    { type: 'sand_worm', name: '沙虫', power: 45, probability: 0.15, rewards: [{ item: 'sand_worm_core', count: 1 }] }
  ]
}

export const travelTimes: Record<string, number> = {
  'starter_village-green_mountain': 2,
  'starter_village-spirit_forest': 2,
  'starter_village-river_bank': 1,
  'green_mountain-mountain_cave': 1,
  'green_mountain-cloud_peak': 3,
  'green_mountain-waterfall': 2,
  'cloud_peak-secret_realm_entrance': 5,
  'spirit_forest-forest_depth': 3,
  'spirit_forest-ancient_ruins': 4,
  'spirit_forest-herb_valley': 2,
  'forest_depth-demon_lair': 4,
  'ancient_ruins-ruins_depth': 3,
  'secret_realm_entrance-secret_realm_inner': 4,
  'secret_realm_inner-immortal_palace': 3,
  'river_bank-waterfall': 2,
  'river_bank-underground_river': 3,
  'waterfall-hidden_cave': 1,
  'mountain_cave-underground_river': 2,
  'underground_river-crystal_cave': 3,
  'herb_valley-medicine_garden': 1,
  'sky_city-azure_sect': 3,
  'sky_city-trading_street': 1,
  'sky_city-tavern': 1,
  'trading_street-blacksmith_shop': 1,
  'trading_street-alchemy_shop': 1,
  'trading_street-artifact_shop': 1,
  'azure_sect-sect_library': 1,
  'azure_sect-training_peak': 1,
  'azure_sect-sect_entrance': 1,
  'training_peak-sword_pavilion': 1,
  'sky_city-desert_entrance': 5,
  'desert_entrance-desert_depth': 4,
  'desert_entrance-oasis': 2,
  'desert_depth-desert_ruins': 3
}

export function getLocation(id: string): Location | undefined {
  return locations[id]
}

export function getConnectedLocations(locationId: string): Location[] {
  const location = locations[locationId]
  if (!location) return []
  return location.connections
    .map(id => locations[id])
    .filter(Boolean)
}

export function getTravelTime(fromId: string, toId: string): number {
  const key1 = `${fromId}-${toId}`
  const key2 = `${toId}-${fromId}`
  return travelTimes[key1] || travelTimes[key2] || 1
}

export function getLocationsByTier(tier: number): Location[] {
  return Object.values(locations).filter(loc => loc.tier === tier)
}

export function getLocationsByType(type: string): Location[] {
  return Object.values(locations).filter(loc => loc.type === type)
}

export function getLocationDangers(locationId: string): LocationDanger[] {
  return locationDangers[locationId] || []
}

export function canTravelTo(
  fromId: string, 
  toId: string, 
  playerRealm: string,
  playerInventory: Record<string, number>,
  completedQuests: string[]
): { canTravel: boolean; reason?: string } {
  const fromLocation = locations[fromId]
  const toLocation = locations[toId]
  
  if (!fromLocation || !toLocation) {
    return { canTravel: false, reason: '未知地点' }
  }
  
  if (!fromLocation.connections.includes(toId)) {
    return { canTravel: false, reason: '无法直接到达' }
  }
  
  const tierDiff = toLocation.tier - fromLocation.tier
  if (tierDiff > 1) {
    return { canTravel: false, reason: '需要先探索附近的区域' }
  }
  
  return { canTravel: true }
}

export function rollDanger(locationId: string): LocationDanger | null {
  const dangers = getLocationDangers(locationId)
  if (dangers.length === 0) return null
  
  for (const danger of dangers) {
    if (Math.random() < danger.probability) {
      return danger
    }
  }
  
  return null
}

export function calculateGatherResult(
  locationId: string, 
  resourceType: string,
  playerLuck: number
): { success: boolean; amount: number } {
  const location = locations[locationId]
  if (!location || !location.resources) {
    return { success: false, amount: 0 }
  }
  
  const resource = location.resources.find(r => r.type === resourceType)
  if (!resource) {
    return { success: false, amount: 0 }
  }
  
  const baseSuccess = 0.5 + resource.richness * 0.3
  const luckBonus = playerLuck * 0.01
  const success = Math.random() < baseSuccess + luckBonus
  
  if (!success) {
    return { success: false, amount: 0 }
  }
  
  const baseAmount = Math.floor(resource.richness * 3) + 1
  const bonusAmount = Math.floor(Math.random() * playerLuck * 0.1)
  
  return { success: true, amount: baseAmount + bonusAmount }
}

export function getExplorationRewards(
  locationId: string,
  playerRealm: string
): { exp: number; discoveries: string[] } {
  const location = locations[locationId]
  if (!location) {
    return { exp: 0, discoveries: [] }
  }
  
  const baseExp = location.tier * 20
  const discoveries: string[] = []
  
  if (location.resources && Math.random() < 0.3) {
    const resource = location.resources[Math.floor(Math.random() * location.resources.length)]
    discoveries.push(resource.type)
  }
  
  if (location.dangers && Math.random() < 0.2) {
    discoveries.push('danger_encounter')
  }
  
  return { exp: baseExp, discoveries }
}
