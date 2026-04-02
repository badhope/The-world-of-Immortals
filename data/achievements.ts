export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  category: AchievementCategory
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond'
  requirements: AchievementRequirement[]
  rewards: AchievementReward
  hidden?: boolean
  progress?: number
  maxProgress?: number
}

export type AchievementCategory = 
  | 'cultivation'
  | 'combat'
  | 'exploration'
  | 'collection'
  | 'social'
  | 'story'
  | 'special'

export interface AchievementRequirement {
  type: 'realm' | 'kill' | 'collect' | 'explore' | 'quest' | 'craft' | 'time' | 'special'
  target: string
  required: number
}

export interface AchievementReward {
  exp: number
  title?: string
  items?: { [key: string]: number }
  special?: string
}

export const achievements: Achievement[] = [
  {
    id: 'first_step',
    name: '初入仙途',
    description: '完成第一次修炼',
    icon: '🌟',
    category: 'cultivation',
    tier: 'bronze',
    requirements: [
      { type: 'realm', target: '1', required: 1 }
    ],
    rewards: {
      exp: 50,
      title: '初学者'
    }
  },
  {
    id: 'qi_refining',
    name: '炼气成真',
    description: '达到炼气期',
    icon: '💨',
    category: 'cultivation',
    tier: 'bronze',
    requirements: [
      { type: 'realm', target: '3', required: 1 }
    ],
    rewards: {
      exp: 100,
      items: { spirit_stone_low: 50 }
    }
  },
  {
    id: 'foundation_building',
    name: '筑基成功',
    description: '达到筑基期',
    icon: '🏛️',
    category: 'cultivation',
    tier: 'silver',
    requirements: [
      { type: 'realm', target: '5', required: 1 }
    ],
    rewards: {
      exp: 300,
      items: { spirit_stone_mid: 30 },
      title: '筑基修士'
    }
  },
  {
    id: 'golden_core',
    name: '金丹大成',
    description: '达到金丹期',
    icon: '💫',
    category: 'cultivation',
    tier: 'gold',
    requirements: [
      { type: 'realm', target: '8', required: 1 }
    ],
    rewards: {
      exp: 800,
      items: { golden_core: 1 },
      title: '金丹真人'
    }
  },
  {
    id: 'nascent_soul',
    name: '元婴出窍',
    description: '达到元婴期',
    icon: '👻',
    category: 'cultivation',
    tier: 'platinum',
    requirements: [
      { type: 'realm', target: '12', required: 1 }
    ],
    rewards: {
      exp: 2000,
      items: { nascent_soul_token: 1 },
      title: '元婴老祖'
    }
  },
  {
    id: 'first_blood',
    name: '初战告捷',
    description: '击败第一只妖兽',
    icon: '⚔️',
    category: 'combat',
    tier: 'bronze',
    requirements: [
      { type: 'kill', target: 'any', required: 1 }
    ],
    rewards: {
      exp: 30
    }
  },
  {
    id: 'beast_slayer',
    name: '妖兽猎手',
    description: '击败10只妖兽',
    icon: '🗡️',
    category: 'combat',
    tier: 'bronze',
    requirements: [
      { type: 'kill', target: 'any', required: 10 }
    ],
    rewards: {
      exp: 100,
      items: { beast_core_low: 5 }
    }
  },
  {
    id: 'demon_hunter',
    name: '魔道克星',
    description: '击败50只妖兽',
    icon: '👹',
    category: 'combat',
    tier: 'silver',
    requirements: [
      { type: 'kill', target: 'any', required: 50 }
    ],
    rewards: {
      exp: 500,
      items: { demon_slayer_badge: 1 },
      title: '妖兽克星'
    }
  },
  {
    id: 'demon_king_slayer',
    name: '妖王终结者',
    description: '击败妖王',
    icon: '👑',
    category: 'combat',
    tier: 'gold',
    requirements: [
      { type: 'kill', target: 'demon_king', required: 1 }
    ],
    rewards: {
      exp: 1000,
      items: { demon_king_core: 1 },
      title: '妖王终结者'
    }
  },
  {
    id: 'explorer',
    name: '探索者',
    description: '发现5个新地点',
    icon: '🗺️',
    category: 'exploration',
    tier: 'bronze',
    requirements: [
      { type: 'explore', target: 'any', required: 5 }
    ],
    rewards: {
      exp: 80
    }
  },
  {
    id: 'world_traveler',
    name: '云游四海',
    description: '发现20个新地点',
    icon: '🌍',
    category: 'exploration',
    tier: 'silver',
    requirements: [
      { type: 'explore', target: 'any', required: 20 }
    ],
    rewards: {
      exp: 400,
      items: { travel_boots: 1 },
      title: '云游修士'
    }
  },
  {
    id: 'secret_finder',
    name: '秘境探索者',
    description: '发现所有秘境',
    icon: '🔮',
    category: 'exploration',
    tier: 'platinum',
    requirements: [
      { type: 'explore', target: 'secret_realm', required: 5 }
    ],
    rewards: {
      exp: 1500,
      items: { realm_key: 1 },
      title: '秘境大师'
    }
  },
  {
    id: 'collector',
    name: '收藏家',
    description: '收集100件物品',
    icon: '📦',
    category: 'collection',
    tier: 'bronze',
    requirements: [
      { type: 'collect', target: 'any', required: 100 }
    ],
    rewards: {
      exp: 100,
      items: { storage_bag: 1 }
    }
  },
  {
    id: 'herb_master',
    name: '灵草大师',
    description: '收集50株灵草',
    icon: '🌿',
    category: 'collection',
    tier: 'silver',
    requirements: [
      { type: 'collect', target: 'spirit_grass', required: 50 }
    ],
    rewards: {
      exp: 300,
      items: { herb_satchel: 1 },
      title: '灵草大师'
    }
  },
  {
    id: 'stone_magnate',
    name: '灵石大亨',
    description: '累计获得1000块灵石',
    icon: '💎',
    category: 'collection',
    tier: 'gold',
    requirements: [
      { type: 'collect', target: 'spirit_stone', required: 1000 }
    ],
    rewards: {
      exp: 800,
      items: { spirit_stone_high: 50 },
      title: '灵石大亨'
    }
  },
  {
    id: 'quest_completer',
    name: '任务达人',
    description: '完成10个任务',
    icon: '📋',
    category: 'story',
    tier: 'bronze',
    requirements: [
      { type: 'quest', target: 'any', required: 10 }
    ],
    rewards: {
      exp: 150
    }
  },
  {
    id: 'story_chaser',
    name: '剧情追随者',
    description: '完成所有主线任务',
    icon: '📖',
    category: 'story',
    tier: 'platinum',
    requirements: [
      { type: 'quest', target: 'main', required: 20 }
    ],
    rewards: {
      exp: 3000,
      title: '传承者'
    }
  },
  {
    id: 'inheritance_successor',
    name: '传承继承者',
    description: '获得青云仙人的完整传承',
    icon: '🌟',
    category: 'story',
    tier: 'diamond',
    requirements: [
      { type: 'special', target: 'inheritance_complete', required: 1 }
    ],
    rewards: {
      exp: 5000,
      items: { immortal_token: 1 },
      title: '青云传人',
      special: 'unlock_ascension'
    },
    hidden: true
  },
  {
    id: 'alchemist',
    name: '炼丹师',
    description: '成功炼制10颗丹药',
    icon: '⚗️',
    category: 'special',
    tier: 'bronze',
    requirements: [
      { type: 'craft', target: 'pill', required: 10 }
    ],
    rewards: {
      exp: 100,
      items: { alchemy_furnace_upgrade: 1 }
    }
  },
  {
    id: 'master_alchemist',
    name: '丹道大师',
    description: '成功炼制100颗丹药',
    icon: '🧪',
    category: 'special',
    tier: 'gold',
    requirements: [
      { type: 'craft', target: 'pill', required: 100 }
    ],
    rewards: {
      exp: 800,
      items: { master_alchemy_furnace: 1 },
      title: '丹道大师'
    }
  },
  {
    id: 'blacksmith',
    name: '锻造师',
    description: '成功锻造10件装备',
    icon: '🔨',
    category: 'special',
    tier: 'bronze',
    requirements: [
      { type: 'craft', target: 'weapon', required: 10 }
    ],
    rewards: {
      exp: 100,
      items: { forge_upgrade: 1 }
    }
  },
  {
    id: 'master_blacksmith',
    name: '锻造大师',
    description: '成功锻造50件装备',
    icon: '⚒️',
    category: 'special',
    tier: 'gold',
    requirements: [
      { type: 'craft', target: 'weapon', required: 50 }
    ],
    rewards: {
      exp: 800,
      items: { master_forge: 1 },
      title: '锻造大师'
    }
  },
  {
    id: 'lucky_star',
    name: '幸运之星',
    description: '连续成功10次概率事件',
    icon: '🍀',
    category: 'special',
    tier: 'silver',
    requirements: [
      { type: 'special', target: 'consecutive_success', required: 10 }
    ],
    rewards: {
      exp: 500,
      items: { lucky_charm: 1 },
      title: '幸运儿'
    },
    hidden: true
  },
  {
    id: 'survivor',
    name: '绝处逢生',
    description: '在生命值低于10%时存活10次',
    icon: '💔',
    category: 'special',
    tier: 'silver',
    requirements: [
      { type: 'special', target: 'near_death_survival', required: 10 }
    ],
    rewards: {
      exp: 400,
      items: { survival_talisman: 1 },
      title: '不死之身'
    }
  },
  {
    id: 'speed_cultivator',
    name: '速修天才',
    description: '在10天内达到筑基期',
    icon: '⚡',
    category: 'special',
    tier: 'gold',
    requirements: [
      { type: 'special', target: 'fast_cultivation', required: 1 }
    ],
    rewards: {
      exp: 1000,
      items: { speed_cultivation_manual: 1 },
      title: '修炼天才'
    },
    hidden: true
  },
  {
    id: 'pacifist',
    name: '和平主义者',
    description: '在不击杀任何敌人的情况下达到筑基期',
    icon: '☮️',
    category: 'special',
    tier: 'platinum',
    requirements: [
      { type: 'special', target: 'pacifist_run', required: 1 }
    ],
    rewards: {
      exp: 2000,
      items: { peace_talisman: 1 },
      title: '和平使者'
    },
    hidden: true
  },
  {
    id: 'completionist',
    name: '完美主义者',
    description: '完成所有成就',
    icon: '🏆',
    category: 'special',
    tier: 'diamond',
    requirements: [
      { type: 'special', target: 'all_achievements', required: 1 }
    ],
    rewards: {
      exp: 10000,
      title: '完美修仙者',
      special: 'unlock_true_ending'
    },
    hidden: true
  }
]

export function getAchievementById(id: string): Achievement | undefined {
  return achievements.find(a => a.id === id)
}

export function getAchievementsByCategory(category: AchievementCategory): Achievement[] {
  return achievements.filter(a => a.category === category)
}

export function getAchievementsByTier(tier: string): Achievement[] {
  return achievements.filter(a => a.tier === tier)
}

export function getVisibleAchievements(unlockedIds: string[]): Achievement[] {
  return achievements.filter(a => !a.hidden || unlockedIds.includes(a.id))
}
