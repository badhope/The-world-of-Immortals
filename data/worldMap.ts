import { Location } from '../src/types'

export interface WorldMap {
  id: string
  name: string
  description: string
  regions: MapRegion[]
  connections: MapConnection[]
}

export interface MapRegion {
  id: string
  name: string
  type: 'continent' | 'ocean' | 'mountain' | 'forest' | 'desert' | 'plains' | 'swamp' | 'tundra' | 'volcanic' | 'secret_realm'
  description: string
  coordinates: { x: number; y: number }
  size: { width: number; height: number }
  climate: string
  terrain: string[]
  spiritDensity: number
  dangerLevel: number
  locations: string[]
  connections: string[]
  resources: MapResource[]
  dangers: MapDanger[]
  npcs: string[]
  monsters: string[]
  hiddenAreas: HiddenArea[]
}

export interface MapConnection {
  id: string
  from: string
  to: string
  type: 'land' | 'water' | 'air' | 'portal' | 'secret'
  travelTime: number
  requirements?: {
    realm?: number
    items?: string[]
    quests?: string[]
    reputation?: { [key: string]: number }
  }
  dangers?: string[]
}

export interface MapResource {
  id: string
  name: string
  type: 'herb' | 'mineral' | 'material' | 'spirit_stone' | 'special'
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic'
  respawnTime: number
  quantity: number
  requiredSkill?: string
  dangerLevel: number
}

export interface MapDanger {
  id: string
  name: string
  type: 'monster' | 'environment' | 'trap' | 'curse' | 'formation'
  description: string
  dangerLevel: number
  effects: string[]
}

export interface HiddenArea {
  id: string
  name: string
  description: string
  discoveryMethod: 'exploration' | 'item' | 'quest' | 'random' | 'time' | 'realm'
  requirements: {
    exploration?: number
    item?: string
    quest?: string
    time?: { start: number; end: number }
    realm?: number
    luck?: number
  }
  rewards: {
    exp: number
    items?: { [key: string]: number }
    unlockLocation?: string
  }
}

export const worldMaps: WorldMap[] = [
  {
    id: 'map_main',
    name: '青云大陆全图',
    description: '青云大陆的完整地图，包含了所有已知和未知的区域',
    regions: [],
    connections: []
  }
]

export const mapRegions: MapRegion[] = [
  {
    id: 'region_central_plains',
    name: '中州平原',
    type: 'plains',
    description: '青云大陆的核心区域，地势平坦，灵气充沛。这里是修仙文明最发达的地区，无数宗门林立，凡人国度众多。中州平原是所有修士向往的圣地，也是竞争最激烈的地区。',
    coordinates: { x: 0, y: 0 },
    size: { width: 3000, height: 2000 },
    climate: '四季分明，温和宜人',
    terrain: ['平原', '丘陵', '河流', '湖泊'],
    spiritDensity: 1.5,
    dangerLevel: 2,
    locations: [
      'loc_qingyun_mountain',
      'loc_xuantian_city',
      'loc_wanjian_peak',
      'loc_danxia_valley',
      'loc_yushou_plain',
      'loc_spirit_stone_mine',
      'loc_ancient_battlefield',
      'loc_immortal_tomb'
    ],
    connections: ['region_northern_wasteland', 'region_southern_jungle', 'region_eastern_sea', 'region_western_desert'],
    resources: [
      {
        id: 'res_spirit_stone_central',
        name: '灵石矿脉',
        type: 'spirit_stone',
        rarity: 'common',
        respawnTime: 86400,
        quantity: 1000,
        dangerLevel: 1
      },
      {
        id: 'res_spirit_grass_central',
        name: '灵草园',
        type: 'herb',
        rarity: 'uncommon',
        respawnTime: 172800,
        quantity: 500,
        dangerLevel: 2
      },
      {
        id: 'res_iron_essence',
        name: '玄铁矿',
        type: 'mineral',
        rarity: 'uncommon',
        respawnTime: 259200,
        quantity: 300,
        dangerLevel: 2
      }
    ],
    dangers: [
      {
        id: 'danger_bandit',
        name: '散修劫掠者',
        type: 'monster',
        description: '在中州平原游荡的散修劫掠者，专门抢劫落单的修士',
        dangerLevel: 2,
        effects: ['可能被抢劫', '可能被追杀']
      },
      {
        id: 'danger_formation',
        name: '上古禁制',
        type: 'formation',
        description: '上古时期留下的禁制大阵，误入者九死一生',
        dangerLevel: 4,
        effects: ['被困', '受伤', '可能死亡']
      }
    ],
    npcs: ['village_elder', 'herbalist_wang', 'blacksmith_li', 'merchant_zhang', 'sect_messenger'],
    monsters: ['spirit_wolf', 'iron_beak_eagle', 'spirit_python', 'corrupted_cultivator'],
    hiddenAreas: [
      {
        id: 'hidden_central_cave',
        name: '隐秘洞府',
        description: '一位上古修士留下的隐秘洞府，藏有珍贵传承',
        discoveryMethod: 'exploration',
        requirements: { exploration: 100 },
        rewards: { exp: 5000, items: { ancient_manual: 1, spirit_stone_mid: 50 } }
      }
    ]
  },
  {
    id: 'region_qingyun_mountain',
    name: '青云山脉',
    type: 'mountain',
    description: '青云大陆最著名的山脉，因青云仙尊而得名。山脉绵延万里，主峰直插云霄。这里是青云宗的所在地，也是无数修士向往的圣地。山脉深处隐藏着青云仙尊的传承秘境。',
    coordinates: { x: 100, y: -50 },
    size: { width: 800, height: 600 },
    climate: '高山气候，四季分明',
    terrain: ['山峰', '峡谷', '瀑布', '洞穴', '云海'],
    spiritDensity: 3.0,
    dangerLevel: 4,
    locations: [
      'loc_qingyun_sect',
      'loc_qingyun_peak',
      'loc_cloud_sea',
      'loc_dragon_pool',
      'loc_immortal_platform',
      'loc_hidden_chamber',
      'loc_spirit_vein'
    ],
    connections: ['region_central_plains', 'region_northern_wasteland'],
    resources: [
      {
        id: 'res_cloud_spirit_grass',
        name: '云灵草',
        type: 'herb',
        rarity: 'rare',
        respawnTime: 604800,
        quantity: 100,
        requiredSkill: 'herbalism_advanced',
        dangerLevel: 3
      },
      {
        id: 'res_spirit_crystal',
        name: '灵晶',
        type: 'mineral',
        rarity: 'epic',
        respawnTime: 1209600,
        quantity: 50,
        dangerLevel: 5
      },
      {
        id: 'res_immortal_ore',
        name: '仙铁矿',
        type: 'mineral',
        rarity: 'legendary',
        respawnTime: 2592000,
        quantity: 20,
        dangerLevel: 6
      }
    ],
    dangers: [
      {
        id: 'danger_cloud_beast',
        name: '云兽',
        type: 'monster',
        description: '生活在云海中的神秘妖兽，实力强大',
        dangerLevel: 4,
        effects: ['被攻击', '可能被击落']
      },
      {
        id: 'danger_qingyun_formation',
        name: '青云大阵',
        type: 'formation',
        description: '青云宗的护山大阵，非本门弟子闯入会被攻击',
        dangerLevel: 5,
        effects: ['被困', '被攻击', '可能死亡']
      }
    ],
    npcs: ['qingyun_elder', 'qingyun_disciple', 'mountain_guardian', 'hermit_cultivator'],
    monsters: ['cloud_beast', 'spirit_eagle', 'mountain_dragon', 'ancient_guardian'],
    hiddenAreas: [
      {
        id: 'hidden_qingyun_inheritance',
        name: '青云传承秘境',
        description: '青云仙尊留下的传承秘境，藏有完整传承',
        discoveryMethod: 'item',
        requirements: { item: 'qingyun_token' },
        rewards: { exp: 100000, items: { qingyun_inheritance: 1, immortal_artifact: 1 }, unlockLocation: 'loc_inheritance_realm' }
      }
    ]
  },
  {
    id: 'region_northern_wasteland',
    name: '北荒原',
    type: 'tundra',
    description: '位于青云大陆北部的广袤荒原，气候严寒，生存环境极其恶劣。这里是妖兽的乐园，也是散修和亡命之徒的聚集地。北荒原虽然荒凉，却蕴藏着丰富的资源和上古遗迹。',
    coordinates: { x: 0, y: 1500 },
    size: { width: 4000, height: 3000 },
    climate: '终年严寒，风雪交加',
    terrain: ['冰原', '雪山', '冻土', '冰川', '极光区'],
    spiritDensity: 0.8,
    dangerLevel: 5,
    locations: [
      'loc_ice_valley',
      'loc_snow_plateau',
      'loc_northern_ancient_city',
      'loc_extreme_cold_abyss',
      'loc_witch_relic',
      'loc_dragon_tomb'
    ],
    connections: ['region_central_plains', 'region_qingyun_mountain'],
    resources: [
      {
        id: 'res_ice_spirit_grass',
        name: '冰灵草',
        type: 'herb',
        rarity: 'rare',
        respawnTime: 604800,
        quantity: 200,
        requiredSkill: 'herbalism_cold',
        dangerLevel: 4
      },
      {
        id: 'res_frost_crystal',
        name: '寒晶',
        type: 'mineral',
        rarity: 'epic',
        respawnTime: 1209600,
        quantity: 100,
        dangerLevel: 5
      },
      {
        id: 'res_witch_blood',
        name: '巫族血脉',
        type: 'special',
        rarity: 'legendary',
        respawnTime: 2592000,
        quantity: 10,
        dangerLevel: 7
      }
    ],
    dangers: [
      {
        id: 'danger_blizzard',
        name: '极寒暴风雪',
        type: 'environment',
        description: '北荒原特有的极寒暴风雪，可以在短时间内冻死修士',
        dangerLevel: 4,
        effects: ['持续伤害', '移动速度降低', '视野受限']
      },
      {
        id: 'danger_ice_beast',
        name: '冰原妖兽',
        type: 'monster',
        description: '生活在北荒原的强大妖兽，实力恐怖',
        dangerLevel: 5,
        effects: ['被攻击', '可能被冻住']
      }
    ],
    npcs: ['northern_hunter', 'ice_hermit', 'witch_descendant', 'exiled_cultivator'],
    monsters: ['frost_wolf', 'ice_wyrm', 'snow_demon', 'ancient_witch_spirit'],
    hiddenAreas: [
      {
        id: 'hidden_witch_temple',
        name: '巫族神殿',
        description: '上古巫族留下的神殿，藏有巫族传承',
        discoveryMethod: 'realm',
        requirements: { realm: 15, exploration: 200 },
        rewards: { exp: 50000, items: { witch_inheritance: 1, witch_blood: 1 } }
      }
    ]
  },
  {
    id: 'region_southern_jungle',
    name: '南疆密林',
    type: 'forest',
    description: '位于青云大陆南部的原始森林，毒虫猛兽遍布，瘴气弥漫。这里是苗疆蛊术的发源地，也是无数毒修和蛊修的圣地。南疆密林深处隐藏着上古时期的秘密。',
    coordinates: { x: 0, y: -1500 },
    size: { width: 3500, height: 2500 },
    climate: '湿热多雨，瘴气弥漫',
    terrain: ['密林', '沼泽', '河流', '瀑布', '溶洞'],
    spiritDensity: 1.2,
    dangerLevel: 5,
    locations: [
      'loc_ten_thousand_poison_valley',
      'loc_gu_god_mountain',
      'loc_miao_ancient_city',
      'loc_miasma_sea',
      'loc_demon_seal',
      'loc_spirit_well'
    ],
    connections: ['region_central_plains', 'region_eastern_sea'],
    resources: [
      {
        id: 'res_poison_grass',
        name: '毒草',
        type: 'herb',
        rarity: 'uncommon',
        respawnTime: 259200,
        quantity: 500,
        requiredSkill: 'herbalism_poison',
        dangerLevel: 3
      },
      {
        id: 'res_gu_egg',
        name: '蛊虫卵',
        type: 'special',
        rarity: 'rare',
        respawnTime: 604800,
        quantity: 100,
        requiredSkill: 'gu_art',
        dangerLevel: 4
      },
      {
        id: 'res_demon_heart',
        name: '妖族之心',
        type: 'special',
        rarity: 'legendary',
        respawnTime: 2592000,
        quantity: 10,
        dangerLevel: 7
      }
    ],
    dangers: [
      {
        id: 'danger_miasma',
        name: '剧毒瘴气',
        type: 'environment',
        description: '南疆密林特有的剧毒瘴气，吸入后会中毒',
        dangerLevel: 4,
        effects: ['持续中毒', '灵力流失', '可能死亡']
      },
      {
        id: 'danger_gu_worm',
        name: '蛊虫群',
        type: 'monster',
        description: '南疆密林中的蛊虫群，数量庞大，难以对付',
        dangerLevel: 5,
        effects: ['被攻击', '被寄生', '可能死亡']
      }
    ],
    npcs: ['miao_elder', 'gu_master', 'poison_doctor', 'jungle_hunter'],
    monsters: ['poison_python', 'giant_spider', 'swamp_beast', 'ancient_demon'],
    hiddenAreas: [
      {
        id: 'hidden_demon_seal',
        name: '妖族封印',
        description: '上古时期封印妖族大能的地方',
        discoveryMethod: 'quest',
        requirements: { quest: 'quest_demon_seal', realm: 20 },
        rewards: { exp: 100000, items: { demon_essence: 1, demon_artifact: 1 } }
      }
    ]
  },
  {
    id: 'region_eastern_sea',
    name: '东海群岛',
    type: 'ocean',
    description: '位于青云大陆东部的无尽海域，由无数岛屿组成。这里是海族的领地，也是水属性修士的圣地。东海深处隐藏着上古龙族的遗迹。',
    coordinates: { x: 2500, y: 0 },
    size: { width: 5000, height: 4000 },
    climate: '海洋性气候，多风暴',
    terrain: ['海域', '岛屿', '珊瑚礁', '深海', '海底洞府'],
    spiritDensity: 1.0,
    dangerLevel: 4,
    locations: [
      'loc_dragon_palace',
      'loc_penglai_island',
      'loc_yingzhou_island',
      'loc_endless_abyss',
      'loc_sea_monster_den',
      'loc_underwater_relic'
    ],
    connections: ['region_central_plains', 'region_southern_jungle'],
    resources: [
      {
        id: 'res_sea_spirit_grass',
        name: '海灵草',
        type: 'herb',
        rarity: 'uncommon',
        respawnTime: 259200,
        quantity: 300,
        requiredSkill: 'herbalism_water',
        dangerLevel: 3
      },
      {
        id: 'res_dragon_scale',
        name: '龙鳞',
        type: 'material',
        rarity: 'epic',
        respawnTime: 1209600,
        quantity: 50,
        dangerLevel: 6
      },
      {
        id: 'res_sea_essence',
        name: '海神精华',
        type: 'special',
        rarity: 'legendary',
        respawnTime: 2592000,
        quantity: 10,
        dangerLevel: 7
      }
    ],
    dangers: [
      {
        id: 'danger_storm',
        name: '海上风暴',
        type: 'environment',
        description: '东海特有的海上风暴，可以掀翻船只',
        dangerLevel: 3,
        effects: ['船只损坏', '迷失方向', '可能溺水']
      },
      {
        id: 'danger_sea_monster',
        name: '海兽',
        type: 'monster',
        description: '东海中的强大海兽，实力恐怖',
        dangerLevel: 5,
        effects: ['被攻击', '船只损坏', '可能死亡']
      }
    ],
    npcs: ['sea_elder', 'dragon_prince', 'island_hermit', 'fisherman_chief'],
    monsters: ['giant_octopus', 'sea_serpent', 'kraken', 'dragon_guardian'],
    hiddenAreas: [
      {
        id: 'hidden_dragon_tomb',
        name: '龙族墓地',
        description: '上古龙族的墓地，藏有龙族传承',
        discoveryMethod: 'item',
        requirements: { item: 'dragon_key', realm: 18 },
        rewards: { exp: 80000, items: { dragon_inheritance: 1, dragon_essence: 1 } }
      }
    ]
  },
  {
    id: 'region_western_desert',
    name: '西域荒漠',
    type: 'desert',
    description: '位于青云大陆西部的广袤荒漠，黄沙漫天，生存环境极其恶劣。这里是佛修的圣地，也是无数苦行僧的修行之地。西域荒漠深处隐藏着上古佛门的秘密。',
    coordinates: { x: -2500, y: 0 },
    size: { width: 4000, height: 3000 },
    climate: '干旱少雨，昼夜温差极大',
    terrain: ['沙漠', '戈壁', '绿洲', '古城', '佛塔'],
    spiritDensity: 0.7,
    dangerLevel: 4,
    locations: [
      'loc_leiyin_temple',
      'loc_buddha_mountain',
      'loc_quicksand_river',
      'loc_desert_ancient_city',
      'loc_buddha_relic',
      'loc_sand_demon_den'
    ],
    connections: ['region_central_plains', 'region_demon_domain'],
    resources: [
      {
        id: 'res_desert_spirit_grass',
        name: '沙灵草',
        type: 'herb',
        rarity: 'uncommon',
        respawnTime: 259200,
        quantity: 200,
        requiredSkill: 'herbalism_desert',
        dangerLevel: 3
      },
      {
        id: 'res_buddha_relic',
        name: '佛骨舍利',
        type: 'special',
        rarity: 'legendary',
        respawnTime: 2592000,
        quantity: 10,
        dangerLevel: 6
      },
      {
        id: 'res_sand_crystal',
        name: '沙晶',
        type: 'mineral',
        rarity: 'rare',
        respawnTime: 604800,
        quantity: 100,
        dangerLevel: 4
      }
    ],
    dangers: [
      {
        id: 'danger_sandstorm',
        name: '沙暴',
        type: 'environment',
        description: '西域荒漠特有的沙暴，可以掩埋一切',
        dangerLevel: 4,
        effects: ['迷失方向', '持续伤害', '可能被掩埋']
      },
      {
        id: 'danger_sand_demon',
        name: '沙魔',
        type: 'monster',
        description: '西域荒漠中的沙魔，实力强大',
        dangerLevel: 5,
        effects: ['被攻击', '可能被吞噬']
      }
    ],
    npcs: ['buddhist_monk', 'desert_guide', 'ruins_guardian', 'exiled_prince'],
    monsters: ['sand_worm', 'desert_scorpion', 'sand_demon', 'mummy_guardian'],
    hiddenAreas: [
      {
        id: 'hidden_buddha_realm',
        name: '佛门秘境',
        description: '上古佛门留下的秘境，藏有佛门传承',
        discoveryMethod: 'quest',
        requirements: { quest: 'quest_buddha_enlightenment', realm: 20 },
        rewards: { exp: 100000, items: { buddha_inheritance: 1, buddha_relic: 1 } }
      }
    ]
  },
  {
    id: 'region_demon_domain',
    name: '魔域',
    type: 'volcanic',
    description: '位于青云大陆边缘的神秘区域，被强大的禁制与外界隔绝。这里是魔修的圣地，也是正道修士的禁地。魔域深处隐藏着上古魔族的秘密。',
    coordinates: { x: -3500, y: 500 },
    size: { width: 2000, height: 1500 },
    climate: '阴暗潮湿，魔气弥漫',
    terrain: ['火山', '熔岩', '血池', '幽冥', '魔殿'],
    spiritDensity: -0.5,
    dangerLevel: 7,
    locations: [
      'loc_blood_pool',
      'loc_nether_abyss',
      'loc_ten_thousand_poison_mountain',
      'loc_soul_refining_valley',
      'loc_demon_king_palace',
      'loc_seal_ground'
    ],
    connections: ['region_western_desert'],
    resources: [
      {
        id: 'res_demon_grass',
        name: '魔灵草',
        type: 'herb',
        rarity: 'rare',
        respawnTime: 604800,
        quantity: 200,
        requiredSkill: 'herbalism_demon',
        dangerLevel: 5
      },
      {
        id: 'res_demon_crystal',
        name: '魔晶',
        type: 'mineral',
        rarity: 'epic',
        respawnTime: 1209600,
        quantity: 100,
        dangerLevel: 6
      },
      {
        id: 'res_demon_heart',
        name: '魔心',
        type: 'special',
        rarity: 'mythic',
        respawnTime: 5184000,
        quantity: 5,
        dangerLevel: 8
      }
    ],
    dangers: [
      {
        id: 'danger_demon_qi',
        name: '魔气侵蚀',
        type: 'curse',
        description: '魔域特有的魔气，会侵蚀修士的心智',
        dangerLevel: 5,
        effects: ['心智下降', '可能走火入魔', '可能堕落']
      },
      {
        id: 'danger_demon_lord',
        name: '魔修强者',
        type: 'monster',
        description: '魔域中的魔修强者，实力恐怖',
        dangerLevel: 7,
        effects: ['被追杀', '可能被炼化']
      }
    ],
    npcs: ['demon_elder', 'blood_cultivator', 'soul_master', 'demon_princess'],
    monsters: ['blood_demon', 'shadow_beast', 'soul_eater', 'demon_king'],
    hiddenAreas: [
      {
        id: 'hidden_demon_seal',
        name: '天魔封印',
        description: '封印上古天魔皇的地方',
        discoveryMethod: 'realm',
        requirements: { realm: 25, exploration: 500 },
        rewards: { exp: 200000, items: { demon_king_core: 1, immortal_artifact: 1 } }
      }
    ]
  },
  {
    id: 'region_forbidden_abyss',
    name: '禁地深渊',
    type: 'secret_realm',
    description: '位于青云大陆中央的神秘禁地，据说是上古天魔被封印的地方。这里灵气与魔气交织，形成极其危险的环境。禁地深渊是所有修士的禁地，只有最强大的存在才敢靠近。',
    coordinates: { x: 0, y: 0 },
    size: { width: 500, height: 500 },
    climate: '混沌不明，时空扭曲',
    terrain: ['深渊', '裂隙', '时空乱流', '封印大阵', '混沌'],
    spiritDensity: 0,
    dangerLevel: 10,
    locations: [
      'loc_seal_entrance',
      'loc_chaos_rift',
      'loc_time_space_turbulence',
      'loc_seal_formation',
      'loc_demon_king_seal'
    ],
    connections: [],
    resources: [
      {
        id: 'res_chaos_essence',
        name: '混沌精华',
        type: 'special',
        rarity: 'mythic',
        respawnTime: 7776000,
        quantity: 10,
        dangerLevel: 9
      },
      {
        id: 'res_demon_essence',
        name: '天魔精华',
        type: 'special',
        rarity: 'mythic',
        respawnTime: 5184000,
        quantity: 5,
        dangerLevel: 10
      }
    ],
    dangers: [
      {
        id: 'danger_time_space',
        name: '时空乱流',
        type: 'environment',
        description: '禁地深渊特有的时空乱流，可以撕裂一切',
        dangerLevel: 8,
        effects: ['被撕裂', '可能穿越时空', '可能死亡']
      },
      {
        id: 'danger_demon_remnant',
        name: '天魔残魂',
        type: 'monster',
        description: '上古天魔皇的残魂，实力恐怖',
        dangerLevel: 10,
        effects: ['被攻击', '可能被附身', '可能死亡']
      }
    ],
    npcs: ['seal_guardian', 'ancient_spirit', 'demon_remnant'],
    monsters: ['chaos_beast', 'demon_remnant', 'void_creature', 'ancient_horror'],
    hiddenAreas: [
      {
        id: 'hidden_seal_core',
        name: '封印核心',
        description: '天魔皇封印的核心，藏有惊天秘密',
        discoveryMethod: 'item',
        requirements: { item: 'seal_key', realm: 30 },
        rewards: { exp: 1000000, items: { chaos_essence: 1, immortal_artifact: 3 } }
      }
    ]
  }
]

export const detailedLocations: Record<string, Location> = {
  loc_qingyun_mountain: {
    id: 'loc_qingyun_mountain',
    name: '青云山',
    type: 'mountain',
    description: '青云山脉的主峰，也是青云宗的所在地。山峰直插云霄，常年云雾缭绕。传说青云仙尊曾在此修炼，留下了无数传说。',
    icon: '🏔️',
    tier: 3,
    connections: ['loc_qingyun_sect', 'loc_cloud_sea', 'loc_dragon_pool'],
    resources: [
      { type: 'cloud_spirit_grass', richness: 0.8, regeneration: 604800 },
      { type: 'spirit_crystal', richness: 0.5, regeneration: 1209600 }
    ],
    npcs: ['qingyun_elder', 'qingyun_disciple'],
    buildings: ['qingyun_sect_entrance', 'cloud_pavilion', 'spirit_gathering_platform']
  },
  loc_qingyun_sect: {
    id: 'loc_qingyun_sect',
    name: '青云宗',
    type: 'sect',
    description: '青云大陆最古老的宗门之一，由青云仙尊创立。宗门内高手如云，是正道的中流砥柱。',
    icon: '🏛️',
    tier: 5,
    connections: ['loc_qingyun_mountain', 'loc_qingyun_peak', 'loc_spirit_vein'],
    resources: [],
    npcs: ['sect_master_qingyun', 'qingyun_elder', 'qingyun_disciple'],
    buildings: ['main_hall', 'scripture_pavilion', 'pill_hall', 'weapon_hall', 'disciple_quarters']
  },
  loc_xuantian_city: {
    id: 'loc_xuantian_city',
    name: '玄天城',
    type: 'city',
    description: '中州最大的修仙城市，也是玄天宗的所在地。城中修士云集，贸易繁荣，是修仙界的商业中心。',
    icon: '🏰',
    tier: 4,
    connections: ['loc_central_plains', 'loc_market', 'loc_auction_house'],
    resources: [],
    npcs: ['city_lord', 'merchant_zhang', 'auction_master', 'inn_keeper'],
    buildings: ['city_gates', 'market', 'auction_house', 'inn', 'teahouse', 'alchemy_shop', 'weapon_shop']
  },
  loc_ten_thousand_poison_valley: {
    id: 'loc_ten_thousand_poison_valley',
    name: '万毒谷',
    type: 'cave',
    description: '南疆密林中最危险的区域之一，毒气弥漫，毒虫遍地。这里是毒修的天堂，也是其他修士的噩梦。',
    icon: '☠️',
    tier: 6,
    connections: ['loc_southern_jungle', 'loc_gu_god_mountain'],
    resources: [
      { type: 'poison_grass', richness: 0.9, regeneration: 259200 },
      { type: 'gu_egg', richness: 0.3, regeneration: 604800 }
    ],
    npcs: ['poison_master', 'gu_expert'],
    buildings: ['poison_lab', 'gu_refining_chamber']
  },
  loc_dragon_palace: {
    id: 'loc_dragon_palace',
    name: '东海龙宫',
    type: 'secret_realm',
    description: '上古龙族留下的宫殿，位于东海深处。传说中藏有龙族的传承和宝藏。',
    icon: '🐉',
    tier: 8,
    connections: ['loc_eastern_sea', 'loc_dragon_tomb'],
    resources: [
      { type: 'dragon_scale', richness: 0.4, regeneration: 1209600 },
      { type: 'sea_essence', richness: 0.2, regeneration: 2592000 }
    ],
    npcs: ['dragon_guardian', 'sea_elder'],
    buildings: ['dragon_throne', 'treasure_vault', 'inheritance_hall']
  },
  loc_demon_king_palace: {
    id: 'loc_demon_king_palace',
    name: '魔王殿',
    type: 'ruins',
    description: '魔域的核心区域，上古魔王的宫殿。这里魔气最浓，危险也最大。',
    icon: '👹',
    tier: 9,
    connections: ['loc_demon_domain', 'loc_seal_ground'],
    resources: [
      { type: 'demon_crystal', richness: 0.6, regeneration: 1209600 },
      { type: 'demon_heart', richness: 0.1, regeneration: 5184000 }
    ],
    npcs: ['demon_king_remnant', 'demon_guardian'],
    buildings: ['demon_throne', 'blood_pool', 'soul_refining_chamber']
  }
}

export function getRegionById(id: string): MapRegion | undefined {
  return mapRegions.find(r => r.id === id)
}

export function getLocationById(id: string): Location | undefined {
  return detailedLocations[id]
}

export function getConnectedRegions(regionId: string): MapRegion[] {
  const region = getRegionById(regionId)
  if (!region) return []
  
  return region.connections
    .map(id => getRegionById(id))
    .filter(Boolean) as MapRegion[]
}

export function getRegionResources(regionId: string): MapResource[] {
  const region = getRegionById(regionId)
  return region?.resources || []
}

export function getRegionDangers(regionId: string): MapDanger[] {
  const region = getRegionById(regionId)
  return region?.dangers || []
}

export function canTravelTo(fromId: string, toId: string, playerData: {
  realm: number
  items: string[]
  completedQuests: string[]
  reputation: { [key: string]: number }
}): { canTravel: boolean; reason?: string } {
  const fromRegion = getRegionById(fromId)
  const toRegion = getRegionById(toId)
  
  if (!fromRegion || !toRegion) {
    return { canTravel: false, reason: '未知区域' }
  }
  
  if (!fromRegion.connections.includes(toId)) {
    return { canTravel: false, reason: '两区域不相邻' }
  }
  
  const connection = mapConnections.find(
    c => (c.from === fromId && c.to === toId) || (c.from === toId && c.to === fromId)
  )
  
  if (connection?.requirements) {
    if (connection.requirements.realm && playerData.realm < connection.requirements.realm) {
      return { canTravel: false, reason: `需要达到更高境界` }
    }
    
    if (connection.requirements.items) {
      const hasItems = connection.requirements.items.every(item => playerData.items.includes(item))
      if (!hasItems) {
        return { canTravel: false, reason: '缺少必要物品' }
      }
    }
    
    if (connection.requirements.quests) {
      const hasCompletedQuests = connection.requirements.quests.every(quest => 
        playerData.completedQuests.includes(quest)
      )
      if (!hasCompletedQuests) {
        return { canTravel: false, reason: '需要完成特定任务' }
      }
    }
  }
  
  return { canTravel: true }
}

export const mapConnections: MapConnection[] = [
  {
    id: 'conn_central_qingyun',
    from: 'region_central_plains',
    to: 'region_qingyun_mountain',
    type: 'land',
    travelTime: 3,
    requirements: { realm: 1 }
  },
  {
    id: 'conn_central_northern',
    from: 'region_central_plains',
    to: 'region_northern_wasteland',
    type: 'land',
    travelTime: 10,
    requirements: { realm: 5 }
  },
  {
    id: 'conn_central_southern',
    from: 'region_central_plains',
    to: 'region_southern_jungle',
    type: 'land',
    travelTime: 8,
    requirements: { realm: 3 }
  },
  {
    id: 'conn_central_eastern',
    from: 'region_central_plains',
    to: 'region_eastern_sea',
    type: 'water',
    travelTime: 5,
    requirements: { realm: 2 }
  },
  {
    id: 'conn_central_western',
    from: 'region_central_plains',
    to: 'region_western_desert',
    type: 'land',
    travelTime: 7,
    requirements: { realm: 3 }
  },
  {
    id: 'conn_western_demon',
    from: 'region_western_desert',
    to: 'region_demon_domain',
    type: 'portal',
    travelTime: 1,
    requirements: { realm: 10, items: ['demon_pass'] }
  },
  {
    id: 'conn_qingyun_northern',
    from: 'region_qingyun_mountain',
    to: 'region_northern_wasteland',
    type: 'land',
    travelTime: 5,
    requirements: { realm: 8 }
  },
  {
    id: 'conn_southern_eastern',
    from: 'region_southern_jungle',
    to: 'region_eastern_sea',
    type: 'water',
    travelTime: 4,
    requirements: { realm: 5 }
  }
]

export function getTravelTime(fromId: string, toId: string): number {
  const connection = mapConnections.find(
    c => (c.from === fromId && c.to === toId) || (c.from === toId && c.to === fromId)
  )
  return connection?.travelTime || 1
}

export function discoverHiddenArea(regionId: string, playerData: {
  exploration: number
  items: string[]
  completedQuests: string[]
  realm: number
  luck: number
}): HiddenArea | null {
  const region = getRegionById(regionId)
  if (!region) return null
  
  for (const hidden of region.hiddenAreas) {
    if (hidden.discoveryMethod === 'exploration') {
      if (hidden.requirements.exploration && playerData.exploration >= hidden.requirements.exploration) {
        if (Math.random() < 0.1) return hidden
      }
    } else if (hidden.discoveryMethod === 'item') {
      if (hidden.requirements.item && playerData.items.includes(hidden.requirements.item)) {
        return hidden
      }
    } else if (hidden.discoveryMethod === 'quest') {
      if (hidden.requirements.quest && playerData.completedQuests.includes(hidden.requirements.quest)) {
        return hidden
      }
    } else if (hidden.discoveryMethod === 'realm') {
      if (hidden.requirements.realm && playerData.realm >= hidden.requirements.realm) {
        if (Math.random() < 0.05) return hidden
      }
    } else if (hidden.discoveryMethod === 'random') {
      if (Math.random() < 0.01 * (playerData.luck / 10)) {
        return hidden
      }
    }
  }
  
  return null
}
