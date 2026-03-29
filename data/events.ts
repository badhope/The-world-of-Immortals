export interface EventChoice {
  id: string
  text: string
  requirements?: {
    attribute?: { [key: string]: number }
    item?: { [key: string]: number }
    realm?: string
  }
  effects: {
    attribute?: { [key: string]: number }
    item?: { [key: string]: number }
    exp?: number
    health?: number
    spirit?: number
    nextEvent?: string
    unlockLocation?: string
  }
  successRate?: number
  successText?: string
  failText?: string
}

export interface GameEvent {
  id: string
  title: string
  description: string
  icon: string
  type: 'story' | 'discovery' | 'danger' | 'opportunity' | 'cultivation'
  triggerConditions?: {
    location?: string[]
    realm?: string[]
    day?: { min?: number; max?: number }
    random?: number
    hasItem?: string[]
    notHasItem?: string[]
  }
  choices: EventChoice[]
  autoResolve?: boolean
  weight: number
  cooldown?: number
  maxOccurrences?: number
}

export const eventPool: GameEvent[] = [
  {
    id: 'event_spirit_vein',
    title: '发现灵脉',
    description: '你在探索中发现了一处隐蔽的灵脉，灵气浓郁，是修炼的绝佳之地。',
    icon: '✨',
    type: 'discovery',
    triggerConditions: {
      location: ['spirit_mountain', 'ancient_forest', 'mystic_cave'],
      random: 0.15
    },
    choices: [
      {
        id: 'meditate',
        text: '在此修炼',
        effects: {
          exp: 100,
          spirit: 50,
          nextEvent: 'event_spirit_vein_meditate'
        },
        successRate: 0.9,
        successText: '你沉浸在灵脉中修炼，收获颇丰！',
        failText: '灵气过于浓郁，你有些承受不住。'
      },
      {
        id: 'collect',
        text: '采集灵气结晶',
        effects: {
          item: { spirit_crystal: 3 },
          spirit: -20
        },
        successText: '你成功采集到了灵气结晶。'
      },
      {
        id: 'leave',
        text: '默默离开',
        effects: {}
      }
    ],
    weight: 10
  },
  {
    id: 'event_spirit_vein_meditate',
    title: '灵脉修炼',
    description: '你开始吸收灵脉中的灵气，感觉修为在稳步提升...',
    icon: '🧘',
    type: 'cultivation',
    choices: [
      {
        id: 'continue',
        text: '继续修炼',
        effects: {
          exp: 150,
          spirit: 30,
          health: -10
        },
        successText: '你忘我地修炼，忘记了时间的流逝。'
      },
      {
        id: 'stop',
        text: '适可而止',
        effects: {
          exp: 50
        },
        successText: '你收功站起，感觉神清气爽。'
      }
    ],
    weight: 5,
    autoResolve: false
  },
  {
    id: 'event_demon_beast',
    title: '妖兽袭击',
    description: '一只凶猛的妖兽突然出现在你面前，眼中闪烁着嗜血的光芒！',
    icon: '👹',
    type: 'danger',
    triggerConditions: {
      location: ['ancient_forest', 'mystic_cave', 'demon_valley'],
      random: 0.2
    },
    choices: [
      {
        id: 'fight',
        text: '迎战妖兽',
        requirements: {
          attribute: { health: 30 }
        },
        effects: {
          health: -40,
          spirit: -20,
          item: { demon_core: 1 },
          exp: 80
        },
        successRate: 0.6,
        successText: '经过一番激战，你成功击退了妖兽！',
        failText: '妖兽太过强大，你身受重伤逃离。'
      },
      {
        id: 'flee',
        text: '逃跑',
        effects: {
          spirit: -10
        },
        successRate: 0.8,
        successText: '你成功逃离了妖兽的追击。',
        failText: '逃跑时被妖兽抓伤。'
      },
      {
        id: 'bribe',
        text: '投喂灵石',
        requirements: {
          item: { spirit_stone_low: 10 }
        },
        effects: {
          item: { spirit_stone_low: -10 }
        },
        successText: '妖兽接过灵石，满意地离开了。'
      }
    ],
    weight: 15
  },
  {
    id: 'event_herb_garden',
    title: '隐秘药园',
    description: '你发现了一处被遗忘的药园，里面生长着各种珍稀灵草。',
    icon: '🌿',
    type: 'discovery',
    triggerConditions: {
      location: ['ancient_forest', 'spirit_mountain'],
      random: 0.1
    },
    choices: [
      {
        id: 'gather',
        text: '采集灵草',
        effects: {
          item: { spirit_herb: 5, rare_herb: 1 }
        },
        successText: '你小心翼翼地采集了药园中的灵草。'
      },
      {
        id: 'search',
        text: '仔细搜寻',
        effects: {
          item: { rare_herb: 2, ancient_seed: 1 },
          exp: 30
        },
        successRate: 0.5,
        successText: '你在药园深处发现了珍稀的古老种子！',
        failText: '你搜寻了一番，但没发现什么特别的东西。'
      }
    ],
    weight: 8
  },
  {
    id: 'event_wandering_cultivator',
    title: '游方修士',
    description: '一位游方修士出现在你面前，似乎想要与你交流。',
    icon: '🧙',
    type: 'opportunity',
    triggerConditions: {
      random: 0.08
    },
    choices: [
      {
        id: 'exchange',
        text: '交换情报',
        effects: {
          exp: 50,
          item: { map_fragment: 1 }
        },
        successText: '你们交流了一番，获得了一些有用的信息。'
      },
      {
        id: 'trade',
        text: '交易物品',
        requirements: {
          item: { spirit_stone_low: 20 }
        },
        effects: {
          item: { spirit_stone_low: -20, cultivation_manual: 1 }
        },
        successText: '你用灵石换取了一本修炼功法。'
      },
      {
        id: 'challenge',
        text: '切磋武艺',
        effects: {
          exp: 100,
          health: -20
        },
        successRate: 0.5,
        successText: '切磋中你领悟了新的战斗技巧！',
        failText: '对方实力强大，你败下阵来。'
      }
    ],
    weight: 10
  },
  {
    id: 'event_ancient_ruins',
    title: '上古遗迹',
    description: '你发现了一处上古遗迹的入口，里面可能藏有珍贵的传承。',
    icon: '🏛️',
    type: 'discovery',
    triggerConditions: {
      location: ['mystic_cave', 'desert_ruins'],
      realm: ['筑基期', '金丹期', '元婴期'],
      random: 0.05
    },
    choices: [
      {
        id: 'explore',
        text: '深入探索',
        effects: {
          exp: 200,
          item: { ancient_artifact: 1 },
          health: -30,
          nextEvent: 'event_ruins_trial'
        },
        successRate: 0.7,
        successText: '你小心翼翼地进入遗迹，发现了上古传承！',
        failText: '遗迹中的机关太危险，你被迫退出。'
      },
      {
        id: 'search_outside',
        text: '在外围搜寻',
        effects: {
          item: { ancient_coin: 3 },
          exp: 30
        },
        successText: '你在遗迹外围找到了一些古币。'
      }
    ],
    weight: 5
  },
  {
    id: 'event_ruins_trial',
    title: '遗迹试炼',
    description: '遗迹深处有一道试炼之门，需要通过考验才能获得传承。',
    icon: '🚪',
    type: 'story',
    choices: [
      {
        id: 'accept',
        text: '接受试炼',
        effects: {
          exp: 300,
          item: { inheritance_token: 1 },
          health: -50,
          spirit: -30
        },
        successRate: 0.4,
        successText: '你成功通过了试炼，获得了上古传承！',
        failText: '试炼太过艰难，你失败了。'
      },
      {
        id: 'refuse',
        text: '放弃离开',
        effects: {
          exp: 50
        },
        successText: '你明智地选择了放弃，保住了性命。'
      }
    ],
    weight: 3
  },
  {
    id: 'event_spirit_spring',
    title: '灵泉',
    description: '你发现了一眼灵泉，泉水清澈见底，散发着淡淡的灵气。',
    icon: '💧',
    type: 'discovery',
    triggerConditions: {
      location: ['spirit_mountain', 'ancient_forest'],
      random: 0.12
    },
    choices: [
      {
        id: 'drink',
        text: '饮用灵泉',
        effects: {
          health: 50,
          spirit: 50,
          exp: 20
        },
        successText: '灵泉水甘甜无比，你感觉全身舒畅。'
      },
      {
        id: 'collect',
        text: '收集泉水',
        effects: {
          item: { spirit_water: 5 }
        },
        successText: '你用容器收集了一些灵泉水。'
      },
      {
        id: 'bathe',
        text: '沐浴净身',
        effects: {
          health: 30,
          spirit: 30,
          exp: 50
        },
        successText: '你在灵泉中沐浴，洗去了身上的浊气。'
      }
    ],
    weight: 12
  },
  {
    id: 'event_bandit_ambush',
    title: '劫修埋伏',
    description: '一群劫修突然出现，将你团团围住！',
    icon: '⚔️',
    type: 'danger',
    triggerConditions: {
      random: 0.1
    },
    choices: [
      {
        id: 'fight',
        text: '奋力反击',
        effects: {
          health: -50,
          spirit: -30,
          item: { spirit_stone_low: 30, bandit_token: 1 },
          exp: 100
        },
        successRate: 0.5,
        successText: '你击退了劫修，还缴获了他们的财物！',
        failText: '劫修人数众多，你身受重伤逃脱。'
      },
      {
        id: 'surrender',
        text: '交出财物',
        effects: {
          item: { spirit_stone_low: -20 }
        },
        successText: '你交出了一些灵石，劫修满意地离开了。'
      },
      {
        id: 'negotiate',
        text: '谈判',
        requirements: {
          attribute: { realm: 3 }
        },
        effects: {
          exp: 30
        },
        successRate: 0.6,
        successText: '你凭借修为震慑住了劫修，他们不敢造次。',
        failText: '劫修根本不听你的，你被迫交出财物。'
      }
    ],
    weight: 12
  },
  {
    id: 'event_weather_storm',
    title: '灵气风暴',
    description: '天地间突然涌起一股灵气风暴，周围的一切都变得混乱起来！',
    icon: '🌪️',
    type: 'danger',
    triggerConditions: {
      random: 0.05
    },
    choices: [
      {
        id: 'absorb',
        text: '尝试吸收',
        effects: {
          exp: 200,
          spirit: 100,
          health: -40
        },
        successRate: 0.3,
        successText: '你冒险吸收风暴中的灵气，修为大涨！',
        failText: '风暴太过狂暴，你受了重伤。'
      },
      {
        id: 'hide',
        text: '寻找掩体',
        effects: {
          health: -10
        },
        successText: '你躲过了风暴最猛烈的部分。'
      }
    ],
    weight: 5
  },
  {
    id: 'event_treasure_map',
    title: '藏宝图',
    description: '你在地上发现了一张破旧的藏宝图，上面标记着一个神秘地点。',
    icon: '🗺️',
    type: 'opportunity',
    triggerConditions: {
      random: 0.06
    },
    choices: [
      {
        id: 'follow',
        text: '按图寻宝',
        effects: {
          exp: 50,
          nextEvent: 'event_treasure_hunt'
        },
        successText: '你决定按照藏宝图的指引前进。'
      },
      {
        id: 'ignore',
        text: '不予理会',
        effects: {},
        successText: '你把藏宝图收了起来，也许以后有用。'
      }
    ],
    weight: 8
  },
  {
    id: 'event_treasure_hunt',
    title: '寻宝之旅',
    description: '按照藏宝图的指引，你来到了一处隐秘的洞穴入口。',
    icon: '💎',
    type: 'discovery',
    choices: [
      {
        id: 'enter',
        text: '进入洞穴',
        effects: {
          item: { rare_gem: 2, ancient_gold: 50 },
          exp: 100
        },
        successRate: 0.7,
        successText: '你在洞穴深处发现了宝藏！',
        failText: '洞穴中机关重重，你空手而归。'
      },
      {
        id: 'leave',
        text: '放弃寻宝',
        effects: {
          exp: 20
        },
        successText: '你决定不冒险，安全第一。'
      }
    ],
    weight: 5
  },
  {
    id: 'event_cultivation_epiphany',
    title: '顿悟',
    description: '在修炼中，你突然感到心有所悟，似乎触碰到了大道的边缘。',
    icon: '💡',
    type: 'cultivation',
    triggerConditions: {
      random: 0.03
    },
    choices: [
      {
        id: 'meditate',
        text: '静心感悟',
        effects: {
          exp: 300,
          spirit: 50
        },
        successRate: 0.6,
        successText: '你抓住这难得的机缘，修为大进！',
        failText: '感悟稍纵即逝，你没能完全抓住。'
      },
      {
        id: 'record',
        text: '记录感悟',
        effects: {
          item: { insight_note: 1 },
          exp: 100
        },
        successText: '你将感悟记录下来，留待日后参悟。'
      }
    ],
    weight: 3
  },
  {
    id: 'event_mysterious_merchant',
    title: '神秘商人',
    description: '一位蒙面的神秘商人出现在你面前，他的货物似乎非同寻常。',
    icon: '🎭',
    type: 'opportunity',
    triggerConditions: {
      random: 0.05
    },
    choices: [
      {
        id: 'buy_rare',
        text: '购买珍品',
        requirements: {
          item: { spirit_stone_low: 100 }
        },
        effects: {
          item: { spirit_stone_low: -100, rare_artifact: 1 }
        },
        successText: '你买下了一件神秘的古物。'
      },
      {
        id: 'buy_info',
        text: '购买情报',
        requirements: {
          item: { spirit_stone_low: 10 }
        },
        effects: {
          item: { spirit_stone_low: -10 },
          exp: 30,
          unlockLocation: 'secret_valley'
        },
        successText: '商人告诉你一个隐秘地点的位置。'
      },
      {
        id: 'decline',
        text: '婉拒离开',
        effects: {},
        successText: '你礼貌地拒绝了商人。'
      }
    ],
    weight: 6
  },
  {
    id: 'event_spirit_beast_egg',
    title: '灵兽蛋',
    description: '你在隐蔽处发现了一枚灵兽蛋，似乎即将孵化。',
    icon: '🥚',
    type: 'discovery',
    triggerConditions: {
      location: ['ancient_forest', 'spirit_mountain', 'mystic_cave'],
      random: 0.04
    },
    choices: [
      {
        id: 'take',
        text: '带走灵兽蛋',
        effects: {
          item: { spirit_beast_egg: 1 }
        },
        successText: '你小心翼翼地将灵兽蛋收入囊中。'
      },
      {
        id: 'wait',
        text: '等待孵化',
        effects: {
          item: { spirit_beast_companion: 1 },
          exp: 50
        },
        successRate: 0.4,
        successText: '灵兽破壳而出，认你为主！',
        failText: '你等待了很长时间，但灵兽蛋没有反应。'
      }
    ],
    weight: 4
  },
  {
    id: 'event_sect_recruitment',
    title: '宗门招新',
    description: '一个修仙宗门正在招收弟子，你是否要前去一试？',
    icon: '🏯',
    type: 'opportunity',
    triggerConditions: {
      realm: ['凡人', '炼气期', '筑基期'],
      random: 0.08
    },
    choices: [
      {
        id: 'join',
        text: '参加考核',
        effects: {
          exp: 100,
          nextEvent: 'event_sect_trial'
        },
        successText: '你决定参加宗门的考核。'
      },
      {
        id: 'decline',
        text: '不感兴趣',
        effects: {},
        successText: '你决定继续独自修炼。'
      }
    ],
    weight: 8
  },
  {
    id: 'event_sect_trial',
    title: '宗门考核',
    description: '宗门的考核开始了，需要通过三关才能成为正式弟子。',
    icon: '⚔️',
    type: 'story',
    choices: [
      {
        id: 'trial',
        text: '全力以赴',
        effects: {
          exp: 200,
          item: { sect_token: 1 },
          health: -30
        },
        successRate: 0.5,
        successText: '你成功通过考核，成为宗门弟子！',
        failText: '考核太过艰难，你遗憾落选。'
      },
      {
        id: 'give_up',
        text: '中途退出',
        effects: {
          exp: 30
        },
        successText: '你选择退出考核，保全了实力。'
      }
    ],
    weight: 5
  },
  {
    id: 'event_weather_rain',
    title: '灵雨',
    description: '天空降下灵雨，这是天地灵气凝聚而成的雨水，对修炼大有裨益。',
    icon: '🌧️',
    type: 'cultivation',
    triggerConditions: {
      random: 0.08
    },
    choices: [
      {
        id: 'absorb',
        text: '吸收灵雨',
        effects: {
          exp: 80,
          spirit: 40,
          health: 20
        },
        successText: '你沐浴在灵雨中，感觉修为在稳步提升。'
      },
      {
        id: 'collect',
        text: '收集灵雨',
        effects: {
          item: { spirit_water: 3 }
        },
        successText: '你用容器收集了一些灵雨。'
      }
    ],
    weight: 10
  },
  {
    id: 'event_ancient_tree',
    title: '古树之灵',
    description: '一棵巨大的古树出现在你面前，树干上似乎有一张人脸。',
    icon: '🌳',
    type: 'story',
    triggerConditions: {
      location: ['ancient_forest'],
      random: 0.06
    },
    choices: [
      {
        id: 'communicate',
        text: '尝试沟通',
        effects: {
          exp: 150,
          item: { ancient_tree_blessing: 1 }
        },
        successRate: 0.5,
        successText: '古树之灵与你交流，赐予你祝福！',
        failText: '古树之灵对你不感兴趣。'
      },
      {
        id: 'rest',
        text: '在树下休息',
        effects: {
          health: 30,
          spirit: 30,
          exp: 30
        },
        successText: '你在古树下休息，感觉身心舒畅。'
      }
    ],
    weight: 6
  },
  {
    id: 'event_fairy_herb',
    title: '仙草',
    description: '你发现了一株散发着七彩光芒的仙草，这可是传说中的宝物！',
    icon: '🌸',
    type: 'discovery',
    triggerConditions: {
      location: ['spirit_mountain', 'secret_valley'],
      realm: ['筑基期', '金丹期', '元婴期'],
      random: 0.03
    },
    choices: [
      {
        id: 'take',
        text: '采摘仙草',
        effects: {
          item: { fairy_herb: 1 },
          exp: 100
        },
        successRate: 0.7,
        successText: '你成功采摘了仙草！',
        failText: '仙草周围有禁制，你无法采摘。'
      },
      {
        id: 'eat',
        text: '直接服用',
        effects: {
          exp: 500,
          health: 100,
          spirit: 100
        },
        successRate: 0.3,
        successText: '仙草入腹，你的修为暴涨！',
        failText: '仙草药力太强，你差点爆体而亡。'
      }
    ],
    weight: 2
  }
]

export const locationEvents: { [locationId: string]: string[] } = {
  'spirit_mountain': ['event_spirit_vein', 'event_herb_garden', 'event_spirit_spring', 'event_ancient_tree', 'event_fairy_herb'],
  'ancient_forest': ['event_demon_beast', 'event_herb_garden', 'event_spirit_spring', 'event_spirit_beast_egg', 'event_ancient_tree'],
  'mystic_cave': ['event_demon_beast', 'event_ancient_ruins', 'event_spirit_beast_egg'],
  'demon_valley': ['event_demon_beast'],
  'desert_ruins': ['event_ancient_ruins'],
  'secret_valley': ['event_fairy_herb']
}

export const realmEvents: { [realmId: string]: string[] } = {
  '凡人': ['event_sect_recruitment'],
  '炼气期': ['event_sect_recruitment'],
  '筑基期': ['event_ancient_ruins', 'event_fairy_herb'],
  '金丹期': ['event_ancient_ruins', 'event_fairy_herb'],
  '元婴期': ['event_ancient_ruins', 'event_fairy_herb']
}

export function getAvailableEvents(
  location: string, 
  realm: string, 
  day: number,
  inventory: { [itemId: string]: number },
  triggeredEvents: { [eventId: string]: number }
): GameEvent[] {
  return eventPool.filter(event => {
    if (event.triggerConditions) {
      const cond = event.triggerConditions
      
      if (cond.location && !cond.location.includes(location)) {
        return false
      }
      
      if (cond.realm && !cond.realm.includes(realm)) {
        return false
      }
      
      if (cond.day) {
        if (cond.day.min && day < cond.day.min) return false
        if (cond.day.max && day > cond.day.max) return false
      }
      
      if (cond.hasItem) {
        for (const item of cond.hasItem) {
          if (!inventory[item] || inventory[item] <= 0) return false
        }
      }
      
      if (cond.notHasItem) {
        for (const item of cond.notHasItem) {
          if (inventory[item] && inventory[item] > 0) return false
        }
      }
    }
    
    if (event.cooldown && triggeredEvents[event.id]) {
      const lastTriggered = triggeredEvents[event.id]
      if (day - lastTriggered < event.cooldown) return false
    }
    
    if (event.maxOccurrences && triggeredEvents[event.id] >= event.maxOccurrences) {
      return false
    }
    
    return true
  })
}

export function rollEvent(events: GameEvent[]): GameEvent | null {
  if (events.length === 0) return null
  
  const totalWeight = events.reduce((sum, e) => sum + e.weight, 0)
  let random = Math.random() * totalWeight
  
  for (const event of events) {
    random -= event.weight
    if (random <= 0) {
      if (event.triggerConditions?.random) {
        if (Math.random() > event.triggerConditions.random) {
          continue
        }
      }
      return event
    }
  }
  
  return null
}

export function resolveChoice(
  event: GameEvent, 
  choiceId: string, 
  playerStats: { health: number; spirit: number; realm: number },
  inventory: { [itemId: string]: number }
): { success: boolean; effects: EventChoice['effects']; message: string } {
  const choice = event.choices.find(c => c.id === choiceId)
  if (!choice) {
    return { success: false, effects: {}, message: '无效的选择' }
  }
  
  if (choice.requirements) {
    if (choice.requirements.attribute) {
      for (const [attr, value] of Object.entries(choice.requirements.attribute)) {
        if (attr === 'health' && playerStats.health < value) {
          return { success: false, effects: {}, message: '生命值不足' }
        }
        if (attr === 'spirit' && playerStats.spirit < value) {
          return { success: false, effects: {}, message: '灵力不足' }
        }
        if (attr === 'realm' && playerStats.realm < value) {
          return { success: false, effects: {}, message: '境界不足' }
        }
      }
    }
    
    if (choice.requirements.item) {
      for (const [item, count] of Object.entries(choice.requirements.item)) {
        if (!inventory[item] || inventory[item] < count) {
          return { success: false, effects: {}, message: '物品不足' }
        }
      }
    }
  }
  
  const successRate = choice.successRate ?? 1
  const success = Math.random() < successRate
  
  const message = success 
    ? (choice.successText || '行动成功') 
    : (choice.failText || '行动失败')
  
  return { success, effects: choice.effects, message }
}
