export interface Currency {
  id: string
  name: string
  type: 'spirit_stone' | 'mortal' | 'special' | 'ancient'
  description: string
  value: number
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic'
  exchangeRate: { [key: string]: number }
  usage: string[]
  origin: string
}

export interface TradeRoute {
  id: string
  name: string
  from: string
  to: string
  type: 'land' | 'water' | 'air' | 'portal'
  distance: number
  travelTime: number
  dangerLevel: number
  goods: TradeGood[]
  taxes: number
  requirements: {
    realm?: number
    items?: string[]
    reputation?: { [key: string]: number }
  }
}

export interface TradeGood {
  id: string
  name: string
  type: 'herb' | 'mineral' | 'material' | 'pill' | 'equipment' | 'artifact' | 'information' | 'service'
  basePrice: number
  priceRange: { min: number; max: number }
  weight: number
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic'
  demand: number
  supply: number
  priceFluctuation: number
  seasonalEffect: { [key: string]: number }
  regions: { [key: string]: { production: number; consumption: number } }
}

export interface Market {
  id: string
  name: string
  location: string
  type: 'local' | 'regional' | 'intercontinental' | 'black'
  description: string
  goods: string[]
  services: string[]
  taxes: number
  reputation: number
  specialFeatures: string[]
  openingHours: string
  requirements: {
    realm?: number
    reputation?: { [key: string]: number }
    items?: string[]
  }
}

export interface AuctionHouse {
  id: string
  name: string
  location: string
  description: string
  auctionFrequency: number
  commission: number
  minimumBid: number
  specialRules: string[]
  upcomingAuctions: AuctionItem[]
}

export interface AuctionItem {
  id: string
  name: string
  description: string
  startingPrice: number
  estimatedValue: number
  seller: string
  category: string
  rarity: string
}

export const currencies: Currency[] = [
  {
    id: 'currency_spirit_stone_low',
    name: '下品灵石',
    type: 'spirit_stone',
    description: '最低等级的灵石，灵气稀薄，是炼气期修士的主要货币。一块下品灵石大约含有十年份的灵气。',
    value: 1,
    rarity: 'common',
    exchangeRate: {
      'currency_spirit_stone_mid': 0.01,
      'currency_gold': 100,
      'currency_silver': 1000
    },
    usage: ['炼气期修炼', '购买基础丹药', '支付低级服务费用'],
    origin: '灵石矿脉开采'
  },
  {
    id: 'currency_spirit_stone_mid',
    name: '中品灵石',
    type: 'spirit_stone',
    description: '中等等级的灵石，灵气较为充沛，是筑基期修士的主要货币。一块中品灵石相当于一百块下品灵石。',
    value: 100,
    rarity: 'uncommon',
    exchangeRate: {
      'currency_spirit_stone_low': 100,
      'currency_spirit_stone_high': 0.01,
      'currency_gold': 10000
    },
    usage: ['筑基期修炼', '购买中级丹药', '支付中级服务费用', '购买筑基丹'],
    origin: '灵石矿脉深处开采或下品灵石压缩'
  },
  {
    id: 'currency_spirit_stone_high',
    name: '上品灵石',
    type: 'spirit_stone',
    description: '高等等级的灵石，灵气浓郁，是结丹期及以上修士的主要货币。一块上品灵石相当于一百块中品灵石。',
    value: 10000,
    rarity: 'rare',
    exchangeRate: {
      'currency_spirit_stone_mid': 100,
      'currency_spirit_stone_supreme': 0.01,
      'currency_gold': 1000000
    },
    usage: ['结丹期修炼', '购买高级丹药', '支付高级服务费用', '购买结丹丹', '布置阵法'],
    origin: '极品灵脉开采或中品灵石压缩'
  },
  {
    id: 'currency_spirit_stone_supreme',
    name: '极品灵石',
    type: 'spirit_stone',
    description: '最高等级的灵石，灵气极其浓郁，是元婴期及以上修士的主要货币。一块极品灵石相当于一百块上品灵石。',
    value: 1000000,
    rarity: 'epic',
    exchangeRate: {
      'currency_spirit_stone_high': 100,
      'currency_immortal_stone': 0.01
    },
    usage: ['元婴期修炼', '购买顶级丹药', '支付顶级服务费用', '布置大阵', '炼制法宝'],
    origin: '仙脉开采或上品灵石压缩'
  },
  {
    id: 'currency_immortal_stone',
    name: '仙石',
    type: 'spirit_stone',
    description: '蕴含仙气的灵石，是化神期及以上修士的主要货币。仙石极其稀有，只有仙界和极少数秘境才有产出。',
    value: 100000000,
    rarity: 'legendary',
    exchangeRate: {
      'currency_spirit_stone_supreme': 100
    },
    usage: ['化神期修炼', '购买仙丹', '炼制仙器', '布置仙阵'],
    origin: '仙界或上古秘境'
  },
  {
    id: 'currency_gold',
    name: '黄金',
    type: 'mortal',
    description: '凡人世界的主要货币，修士之间很少使用，但在凡人国度中是通用货币。',
    value: 0.01,
    rarity: 'common',
    exchangeRate: {
      'currency_spirit_stone_low': 0.01,
      'currency_silver': 10
    },
    usage: ['凡人交易', '购买凡人物品', '在凡人国度中使用'],
    origin: '金矿开采'
  },
  {
    id: 'currency_silver',
    name: '白银',
    type: 'mortal',
    description: '凡人世界的次要货币，价值约为黄金的十分之一。',
    value: 0.001,
    rarity: 'common',
    exchangeRate: {
      'currency_gold': 0.1,
      'currency_copper': 100
    },
    usage: ['凡人交易', '购买凡人物品'],
    origin: '银矿开采'
  },
  {
    id: 'currency_copper',
    name: '铜钱',
    type: 'mortal',
    description: '凡人世界的最小货币单位，用于日常小额交易。',
    value: 0.00001,
    rarity: 'common',
    exchangeRate: {
      'currency_silver': 0.01
    },
    usage: ['凡人小额交易'],
    origin: '铜矿开采'
  },
  {
    id: 'currency_contribution_point',
    name: '贡献点',
    type: 'special',
    description: '宗门内部的特殊货币，用于兑换宗门资源。不同宗门的贡献点不能通用。',
    value: 10,
    rarity: 'uncommon',
    exchangeRate: {},
    usage: ['兑换宗门功法', '兑换宗门丹药', '兑换宗门装备', '使用宗门设施'],
    origin: '完成宗门任务获得'
  },
  {
    id: 'currency_merit_point',
    name: '功德点',
    type: 'special',
    description: '正道联盟的特殊货币，用于兑换正道资源。只有正道修士才能获得。',
    value: 100,
    rarity: 'rare',
    exchangeRate: {},
    usage: ['兑换正道资源', '进入正道秘境', '获得正道庇护'],
    origin: '完成正道任务获得'
  },
  {
    id: 'currency_karma_point',
    name: '因果点',
    type: 'special',
    description: '天地法则产生的特殊货币，用于抵消因果或增加功德。',
    value: 1000,
    rarity: 'epic',
    exchangeRate: {},
    usage: ['抵消因果', '增加功德', '渡劫时降低难度'],
    origin: '行善积德获得'
  },
  {
    id: 'currency_ancient_jade',
    name: '上古玉简',
    type: 'ancient',
    description: '上古时期流传下来的特殊货币，蕴含上古修士的传承信息。',
    value: 10000,
    rarity: 'legendary',
    exchangeRate: {},
    usage: ['兑换上古传承', '进入上古秘境', '解封上古禁制'],
    origin: '上古遗迹中发现'
  }
]

export const tradeGoods: TradeGood[] = [
  {
    id: 'good_spirit_grass',
    name: '灵草',
    type: 'herb',
    basePrice: 10,
    priceRange: { min: 5, max: 50 },
    weight: 0.1,
    rarity: 'common',
    demand: 80,
    supply: 70,
    priceFluctuation: 0.2,
    seasonalEffect: { '春': 1.2, '夏': 1.0, '秋': 0.8, '冬': 0.6 },
    regions: {
      'region_central_plains': { production: 100, consumption: 80 },
      'region_southern_jungle': { production: 150, consumption: 50 },
      'region_eastern_sea': { production: 50, consumption: 100 }
    }
  },
  {
    id: 'good_spirit_stone_ore',
    name: '灵石原矿',
    type: 'mineral',
    basePrice: 5,
    priceRange: { min: 3, max: 10 },
    weight: 1,
    rarity: 'common',
    demand: 90,
    supply: 60,
    priceFluctuation: 0.15,
    seasonalEffect: {},
    regions: {
      'region_central_plains': { production: 100, consumption: 120 },
      'region_northern_wasteland': { production: 80, consumption: 30 },
      'region_qingyun_mountain': { production: 50, consumption: 50 }
    }
  },
  {
    id: 'good_iron_essence',
    name: '玄铁精',
    type: 'mineral',
    basePrice: 100,
    priceRange: { min: 80, max: 200 },
    weight: 0.5,
    rarity: 'uncommon',
    demand: 70,
    supply: 50,
    priceFluctuation: 0.25,
    seasonalEffect: {},
    regions: {
      'region_central_plains': { production: 60, consumption: 80 },
      'region_northern_wasteland': { production: 100, consumption: 20 }
    }
  },
  {
    id: 'good_foundation_pill',
    name: '筑基丹',
    type: 'pill',
    basePrice: 10000,
    priceRange: { min: 8000, max: 15000 },
    weight: 0.01,
    rarity: 'rare',
    demand: 100,
    supply: 20,
    priceFluctuation: 0.3,
    seasonalEffect: {},
    regions: {
      'region_central_plains': { production: 30, consumption: 100 },
      'region_qingyun_mountain': { production: 50, consumption: 30 }
    }
  },
  {
    id: 'good_core_formation_pill',
    name: '结丹丹',
    type: 'pill',
    basePrice: 100000,
    priceRange: { min: 80000, max: 200000 },
    weight: 0.01,
    rarity: 'epic',
    demand: 100,
    supply: 5,
    priceFluctuation: 0.4,
    seasonalEffect: {},
    regions: {
      'region_central_plains': { production: 10, consumption: 50 },
      'region_qingyun_mountain': { production: 20, consumption: 10 }
    }
  },
  {
    id: 'good_spirit_sword',
    name: '灵剑',
    type: 'equipment',
    basePrice: 5000,
    priceRange: { min: 3000, max: 10000 },
    weight: 2,
    rarity: 'uncommon',
    demand: 60,
    supply: 40,
    priceFluctuation: 0.2,
    seasonalEffect: {},
    regions: {
      'region_central_plains': { production: 50, consumption: 60 },
      'region_qingyun_mountain': { production: 80, consumption: 20 }
    }
  },
  {
    id: 'good_magic_treasure',
    name: '法宝',
    type: 'artifact',
    basePrice: 1000000,
    priceRange: { min: 500000, max: 5000000 },
    weight: 1,
    rarity: 'legendary',
    demand: 80,
    supply: 5,
    priceFluctuation: 0.5,
    seasonalEffect: {},
    regions: {
      'region_central_plains': { production: 5, consumption: 30 },
      'region_qingyun_mountain': { production: 10, consumption: 5 }
    }
  },
  {
    id: 'good_intelligence',
    name: '情报',
    type: 'information',
    basePrice: 1000,
    priceRange: { min: 100, max: 100000 },
    weight: 0,
    rarity: 'rare',
    demand: 90,
    supply: 30,
    priceFluctuation: 0.6,
    seasonalEffect: {},
    regions: {
      'region_central_plains': { production: 50, consumption: 100 },
      'region_eastern_sea': { production: 30, consumption: 50 }
    }
  }
]

export const markets: Market[] = [
  {
    id: 'market_xuantian',
    name: '玄天大市场',
    location: 'loc_xuantian_city',
    type: 'intercontinental',
    description: '青云大陆最大的市场，汇聚了来自各地的商人和修士。这里可以买到几乎所有类型的物品，是修仙界的商业中心。',
    goods: ['good_spirit_grass', 'good_spirit_stone_ore', 'good_iron_essence', 'good_foundation_pill', 'good_spirit_sword'],
    services: ['鉴定', '拍卖', '寄售', '兑换', '运输'],
    taxes: 0.05,
    reputation: 100,
    specialFeatures: ['24小时营业', '有拍卖行', '有鉴定师', '有运输服务'],
    openingHours: '全天',
    requirements: { realm: 1 }
  },
  {
    id: 'market_qingyun',
    name: '青云宗市场',
    location: 'loc_qingyun_sect',
    type: 'regional',
    description: '青云宗内部市场，只对青云宗弟子开放。这里可以买到宗门特供的物品，价格比外界便宜。',
    goods: ['good_spirit_grass', 'good_foundation_pill', 'good_spirit_sword'],
    services: ['鉴定', '兑换'],
    taxes: 0,
    reputation: 80,
    specialFeatures: ['宗门特供', '价格优惠', '有传承兑换'],
    openingHours: '辰时至酉时',
    requirements: { reputation: { 'faction_qingyun_sect': 100 } }
  },
  {
    id: 'market_black',
    name: '黑市',
    location: 'loc_xuantian_city',
    type: 'black',
    description: '隐藏在玄天城地下的黑市，出售各种见不得光的物品。这里可以买到禁药、魔器、情报等，但价格昂贵且风险极高。',
    goods: ['good_foundation_pill', 'good_core_formation_pill', 'good_intelligence'],
    services: ['匿名交易', '暗杀委托', '情报购买'],
    taxes: 0.1,
    reputation: 50,
    specialFeatures: ['匿名交易', '出售禁物', '高风险高回报'],
    openingHours: '子时至寅时',
    requirements: { realm: 5, items: ['black_market_token'] }
  }
]

export const auctionHouses: AuctionHouse[] = [
  {
    id: 'auction_xuantian',
    name: '玄天拍卖行',
    location: 'loc_xuantian_city',
    description: '青云大陆最大的拍卖行，每季度举办一次大型拍卖会。这里经常出现珍稀物品，吸引了无数大能参与。',
    auctionFrequency: 90,
    commission: 0.1,
    minimumBid: 1000,
    specialRules: ['匿名竞拍', '灵石支付', '禁止武力'],
    upcomingAuctions: [
      {
        id: 'auction_item_1',
        name: '上古筑基丹',
        description: '上古时期流传下来的筑基丹，效果比普通筑基丹强三倍',
        startingPrice: 50000,
        estimatedValue: 100000,
        seller: '匿名',
        category: '丹药',
        rarity: 'epic'
      },
      {
        id: 'auction_item_2',
        name: '青云剑谱残卷',
        description: '青云仙尊亲笔所写的剑谱残卷，蕴含剑道至理',
        startingPrice: 100000,
        estimatedValue: 500000,
        seller: '匿名',
        category: '功法',
        rarity: 'legendary'
      }
    ]
  }
]

export const tradeRoutes: TradeRoute[] = [
  {
    id: 'route_central_eastern',
    name: '中州-东海商路',
    from: 'region_central_plains',
    to: 'region_eastern_sea',
    type: 'water',
    distance: 5000,
    travelTime: 15,
    dangerLevel: 3,
    goods: ['good_spirit_grass', 'good_spirit_stone_ore', 'good_iron_essence'],
    taxes: 0.08,
    requirements: { realm: 2 }
  },
  {
    id: 'route_central_northern',
    name: '中州-北荒商路',
    from: 'region_central_plains',
    to: 'region_northern_wasteland',
    type: 'land',
    distance: 8000,
    travelTime: 30,
    dangerLevel: 5,
    goods: ['good_spirit_grass', 'good_spirit_stone_ore', 'good_foundation_pill'],
    taxes: 0.1,
    requirements: { realm: 5 }
  },
  {
    id: 'route_central_southern',
    name: '中州-南疆商路',
    from: 'region_central_plains',
    to: 'region_southern_jungle',
    type: 'land',
    distance: 6000,
    travelTime: 20,
    dangerLevel: 4,
    goods: ['good_spirit_grass', 'good_iron_essence'],
    taxes: 0.08,
    requirements: { realm: 3 }
  }
]

export function getCurrencyById(id: string): Currency | undefined {
  return currencies.find(c => c.id === id)
}

export function getTradeGoodById(id: string): TradeGood | undefined {
  return tradeGoods.find(g => g.id === id)
}

export function getMarketById(id: string): Market | undefined {
  return markets.find(m => m.id === id)
}

export function getAuctionHouseById(id: string): AuctionHouse | undefined {
  return auctionHouses.find(a => a.id === id)
}

export function convertCurrency(fromId: string, toId: string, amount: number): number {
  const fromCurrency = getCurrencyById(fromId)
  if (!fromCurrency) return 0
  
  const rate = fromCurrency.exchangeRate[toId]
  if (rate === undefined) return 0
  
  return amount * rate
}

export function calculatePrice(goodId: string, regionId: string, season: string): number {
  const good = getTradeGoodById(goodId)
  if (!good) return 0
  
  let price = good.basePrice
  
  const regionData = good.regions[regionId]
  if (regionData) {
    const supplyDemand = regionData.consumption / Math.max(regionData.production, 1)
    price *= supplyDemand
  }
  
  const seasonalEffect = good.seasonalEffect[season]
  if (seasonalEffect) {
    price *= seasonalEffect
  }
  
  const fluctuation = (Math.random() - 0.5) * 2 * good.priceFluctuation
  price *= (1 + fluctuation)
  
  return Math.max(good.priceRange.min, Math.min(good.priceRange.max, Math.round(price)))
}

export function getAvailableGoods(marketId: string): TradeGood[] {
  const market = getMarketById(marketId)
  if (!market) return []
  
  return market.goods.map(g => getTradeGoodById(g)).filter(Boolean) as TradeGood[]
}

export function canAccessMarket(marketId: string, playerData: {
  realm: number
  reputation: { [key: string]: number }
  items: string[]
}): { canAccess: boolean; reason?: string } {
  const market = getMarketById(marketId)
  if (!market) return { canAccess: false, reason: '市场不存在' }
  
  if (market.requirements.realm && playerData.realm < market.requirements.realm) {
    return { canAccess: false, reason: '境界不足' }
  }
  
  if (market.requirements.items) {
    const hasItems = market.requirements.items.every(item => playerData.items.includes(item))
    if (!hasItems) {
      return { canAccess: false, reason: '缺少必要物品' }
    }
  }
  
  if (market.requirements.reputation) {
    for (const [faction, required] of Object.entries(market.requirements.reputation)) {
      if ((playerData.reputation[faction] || 0) < required) {
        return { canAccess: false, reason: '声望不足' }
      }
    }
  }
  
  return { canAccess: true }
}
