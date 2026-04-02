import { Currency, TradeRoute, Market } from './economy'

export interface ExtendedCurrency extends Currency {
  grade?: CurrencyGrade
  origin?: string
  history?: string
  exchangeRate?: number
  usage?: string[]
  rarity?: number
}

export type CurrencyGrade = 'mortal' | 'spirit' | 'earth' | 'heaven' | 'immortal'

export interface AuctionHouse {
  id: string
  name: string
  location: string
  owner: string
  grade: CurrencyGrade
  description: string
  history: string
  rules: string[]
  fees: AuctionFees
  upcomingAuctions: AuctionItem[]
  pastAuctions: string[]
  reputation: number
  specialFeatures: string[]
}

export interface AuctionFees {
  registrationFee: number
  commissionRate: number
  depositRate: number
  minimumBid: number
}

export interface AuctionItem {
  id: string
  name: string
  grade: CurrencyGrade
  description: string
  startingPrice: number
  currentBid: number
  currentBidder?: string
  endTime: string
  seller: string
  anonymous: boolean
}

export interface MerchantGuild {
  id: string
  name: string
  type: 'neutral' | 'sect' | 'nation' | 'family' | 'underground'
  headquarters: string
  branches: string[]
  leader: string
  members: number
  description: string
  history: string
  businesses: string[]
  tradeRoutes: string[]
  reputation: number
  specialServices: string[]
  secrets?: string[]
}

export interface TradingCompany {
  id: string
  name: string
  type: 'legitimate' | 'gray' | 'black'
  headquarters: string
  owner: string
  description: string
  mainBusiness: string[]
  branches: string[]
  reputation: number
  prices: PriceModifier
  specialOffers: SpecialOffer[]
}

export interface PriceModifier {
  buyModifier: number
  sellModifier: number
  rareItemsModifier: number
  bulkDiscount: number
}

export interface SpecialOffer {
  id: string
  name: string
  description: string
  discount: number
  items: string[]
  startTime: string
  endTime: string
  conditions: string[]
}

export interface Bank {
  id: string
  name: string
  location: string
  owner: string
  grade: CurrencyGrade
  description: string
  services: BankService[]
  interestRate: number
  loanRate: number
  maxLoan: number
  reputation: number
}

export interface BankService {
  name: string
  description: string
  fee: number
  conditions: string[]
}

export interface ExtendedMarket extends Market {
  grade?: CurrencyGrade
  owner?: string
  specialties?: string[]
  blackMarket?: boolean
  auctionSchedule?: string
  specialEvents?: string[]
}

export const extendedCurrencies: ExtendedCurrency[] = [
  {
    id: 'currency_gold',
    name: '黄金',
    grade: 'mortal',
    description: '凡人世界最常用的货币，修士世界中也有一定价值。',
    origin: '凡人世界',
    history: '黄金是凡人世界最常用的货币，在修士世界中也有一定价值。',
    exchangeRate: 0.001,
    usage: ['凡人交易', '基础材料交易'],
    rarity: 1
  },
  {
    id: 'currency_spirit_stone_low',
    name: '下品灵石',
    grade: 'mortal',
    description: '修士世界最基础的货币，蕴含少量灵气。',
    origin: '灵石矿脉',
    history: '下品灵石是修士世界最基础的货币，几乎每个修士都会使用。',
    exchangeRate: 1,
    usage: ['修士交易', '修炼资源'],
    rarity: 2
  },
  {
    id: 'currency_spirit_stone_medium',
    name: '中品灵石',
    grade: 'spirit',
    description: '修士世界常用的货币，蕴含中等灵气。',
    origin: '灵石矿脉',
    history: '中品灵石是修士世界常用的货币，价值是下品灵石的十倍。',
    exchangeRate: 10,
    usage: ['修士交易', '修炼资源', '高级材料'],
    rarity: 3
  },
  {
    id: 'currency_spirit_stone_high',
    name: '上品灵石',
    grade: 'earth',
    description: '修士世界珍贵的货币，蕴含大量灵气。',
    origin: '极品灵脉',
    history: '上品灵石是修士世界珍贵的货币，价值是中品灵石的十倍。',
    exchangeRate: 100,
    usage: ['高级交易', '珍贵资源', '法宝交易'],
    rarity: 5
  },
  {
    id: 'currency_spirit_stone_supreme',
    name: '极品灵石',
    grade: 'heaven',
    description: '修士世界极其珍贵的货币，蕴含极大量灵气。',
    origin: '仙级灵脉',
    history: '极品灵石是修士世界极其珍贵的货币，价值是上品灵石的十倍。',
    exchangeRate: 1000,
    usage: ['顶级交易', '仙器交易', '传承交易'],
    rarity: 7
  },
  {
    id: 'currency_contribution_point',
    name: '贡献点',
    grade: 'spirit',
    description: '宗门内部货币，用于兑换宗门资源。',
    origin: '宗门系统',
    history: '贡献点是宗门内部货币，通过完成任务获得。',
    exchangeRate: 5,
    usage: ['宗门交易', '兑换资源', '兑换功法'],
    rarity: 3
  },
  {
    id: 'currency_merit_point',
    name: '功德点',
    grade: 'earth',
    description: '正道联盟货币，用于兑换珍贵资源。',
    origin: '正道联盟',
    history: '功德点是正道联盟货币，通过斩妖除魔获得。',
    exchangeRate: 50,
    usage: ['正道交易', '兑换资源', '兑换功法'],
    rarity: 5
  },
  {
    id: 'currency_demon_point',
    name: '魔功点',
    grade: 'earth',
    description: '魔道联盟货币，用于兑换珍贵资源。',
    origin: '魔道联盟',
    history: '魔功点是魔道联盟货币，通过完成任务获得。',
    exchangeRate: 50,
    usage: ['魔道交易', '兑换资源', '兑换功法'],
    rarity: 5
  }
]

export const auctionHouses: AuctionHouse[] = [
  {
    id: 'auction_qingyun',
    name: '青云拍卖行',
    location: '青云城',
    owner: '青云宗',
    grade: 'heaven',
    description: '青云大陆最顶级的拍卖行之一，由青云宗经营。',
    history: `青云拍卖行是青云宗经营的顶级拍卖行，每年举办一次大型拍卖会。

青云拍卖行以公平公正著称，是修士交易珍贵物品的首选之地。`,
    rules: [
      '禁止在拍卖行内动手',
      '竞拍成功后必须付款',
      '禁止使用假币',
      '禁止干扰拍卖'
    ],
    fees: {
      registrationFee: 1000,
      commissionRate: 0.05,
      depositRate: 0.1,
      minimumBid: 100
    },
    upcomingAuctions: [],
    pastAuctions: ['千年人参拍卖', '法宝拍卖会', '传承拍卖会'],
    reputation: 100,
    specialFeatures: ['匿名拍卖', '鉴定服务', '保管服务', '借贷服务']
  },
  {
    id: 'auction_xuantian',
    name: '玄天拍卖行',
    location: '玄天城',
    owner: '玄天宗',
    grade: 'heaven',
    description: '青云大陆最顶级的拍卖行之一，由玄天宗经营。',
    history: `玄天拍卖行是玄天宗经营的顶级拍卖行，每年举办一次大型拍卖会。

玄天拍卖行以保密著称，是修士交易敏感物品的首选之地。`,
    rules: [
      '禁止在拍卖行内动手',
      '竞拍成功后必须付款',
      '禁止使用假币',
      '禁止干扰拍卖',
      '禁止泄露卖家信息'
    ],
    fees: {
      registrationFee: 1000,
      commissionRate: 0.05,
      depositRate: 0.1,
      minimumBid: 100
    },
    upcomingAuctions: [],
    pastAuctions: ['上古遗物拍卖', '丹药拍卖会', '功法拍卖会'],
    reputation: 95,
    specialFeatures: ['匿名拍卖', '鉴定服务', '保管服务', '保密服务']
  },
  {
    id: 'auction_black',
    name: '黑市拍卖行',
    location: '中立城',
    owner: '中立联盟',
    grade: 'earth',
    description: '青云大陆最神秘的黑市拍卖行，由中立联盟经营。',
    history: `黑市拍卖行是中立联盟经营的神秘拍卖行，每年举办多次拍卖会。

黑市拍卖行以交易禁忌物品著称，是修士交易敏感物品的首选之地。`,
    rules: [
      '禁止在拍卖行内动手',
      '竞拍成功后必须付款',
      '禁止使用假币',
      '禁止干扰拍卖',
      '禁止泄露任何信息'
    ],
    fees: {
      registrationFee: 500,
      commissionRate: 0.1,
      depositRate: 0.2,
      minimumBid: 50
    },
    upcomingAuctions: [],
    pastAuctions: ['禁忌功法拍卖', '魔道物品拍卖会', '赃物拍卖会'],
    reputation: 80,
    specialFeatures: ['匿名拍卖', '鉴定服务', '保管服务', '禁忌物品交易']
  }
]

export const merchantGuilds: MerchantGuild[] = [
  {
    id: 'guild_neutral',
    name: '中立商会',
    type: 'neutral',
    headquarters: '中立城',
    branches: ['青云城', '玄天城', '夏都', '周都', '西域绿洲'],
    leader: '商盟盟主',
    members: 10000,
    description: '青云大陆最大的中立商会，在各地都有分部。',
    history: `中立商会是青云大陆最大的中立商会，由多位大商人联合创立。

中立商会以中立著称，不参与任何势力争斗，专注于商业。`,
    businesses: ['材料交易', '丹药交易', '法宝交易', '功法交易', '灵石兑换'],
    tradeRoutes: ['中州-北荒路线', '中州-南荒路线', '中州-西域路线', '中州-东海路线'],
    reputation: 90,
    specialServices: ['鉴定服务', '保管服务', '运输服务', '借贷服务', '情报服务'],
    secrets: ['与各大势力都有联系', '掌握大量情报']
  },
  {
    id: 'guild_qingyun',
    name: '青云商会',
    type: 'sect',
    headquarters: '青云城',
    branches: ['青云山', '中州平原各城'],
    leader: '青云宗长老',
    members: 5000,
    description: '青云宗经营的商会，主要服务于青云宗弟子。',
    history: `青云商会是青云宗经营的商会，主要服务于青云宗弟子。

青云商会以质量著称，所有商品都经过严格鉴定。`,
    businesses: ['材料交易', '丹药交易', '法宝交易', '功法交易'],
    tradeRoutes: ['中州内部路线'],
    reputation: 85,
    specialServices: ['鉴定服务', '保管服务', '运输服务', '贡献点兑换']
  },
  {
    id: 'guild_underground',
    name: '地下商会',
    type: 'underground',
    headquarters: '中立城地下',
    branches: ['各大城市地下'],
    leader: '神秘商人',
    members: 3000,
    description: '青云大陆最神秘的地下商会，交易各种禁忌物品。',
    history: `地下商会是青云大陆最神秘的地下商会，由神秘商人创立。

地下商会以交易禁忌物品著称，是修士交易敏感物品的首选之地。`,
    businesses: ['禁忌物品交易', '赃物交易', '情报交易', '暗杀委托'],
    tradeRoutes: ['地下路线'],
    reputation: 70,
    specialServices: ['匿名交易', '禁忌物品交易', '情报服务', '暗杀服务'],
    secrets: ['与魔道有联系', '掌握大量黑料']
  }
]

export const tradingCompanies: TradingCompany[] = [
  {
    id: 'company_wanbao',
    name: '万宝阁',
    type: 'legitimate',
    headquarters: '中立城',
    owner: '万宝阁阁主',
    description: '青云大陆最大的综合性商号，交易各种物品。',
    mainBusiness: ['材料', '丹药', '法宝', '功法', '灵石'],
    branches: ['青云城', '玄天城', '夏都', '周都', '西域绿洲'],
    reputation: 90,
    prices: {
      buyModifier: 1.1,
      sellModifier: 0.9,
      rareItemsModifier: 1.2,
      bulkDiscount: 0.1
    },
    specialOffers: [
      {
        id: 'offer_newcomer',
        name: '新人优惠',
        description: '首次购物九折优惠',
        discount: 0.1,
        items: ['所有物品'],
        startTime: '永久',
        endTime: '永久',
        conditions: ['首次购物']
      }
    ]
  },
  {
    id: 'company_danxiang',
    name: '丹香阁',
    type: 'legitimate',
    headquarters: '丹霞山',
    owner: '丹霞宗',
    description: '青云大陆最大的丹药商号，交易各种丹药。',
    mainBusiness: ['丹药', '灵草', '丹方'],
    branches: ['青云城', '玄天城', '夏都', '周都'],
    reputation: 95,
    prices: {
      buyModifier: 1.05,
      sellModifier: 0.95,
      rareItemsModifier: 1.1,
      bulkDiscount: 0.15
    },
    specialOffers: [
      {
        id: 'offer_member',
        name: '会员优惠',
        description: '会员购物九五折优惠',
        discount: 0.05,
        items: ['所有丹药'],
        startTime: '永久',
        endTime: '永久',
        conditions: ['成为会员']
      }
    ]
  },
  {
    id: 'company_qibao',
    name: '七宝阁',
    type: 'legitimate',
    headquarters: '玄天城',
    owner: '玄天宗',
    description: '青云大陆最大的法宝商号，交易各种法宝。',
    mainBusiness: ['法宝', '灵器', '材料', '器方'],
    branches: ['青云城', '玄天城', '夏都', '周都'],
    reputation: 90,
    prices: {
      buyModifier: 1.1,
      sellModifier: 0.9,
      rareItemsModifier: 1.2,
      bulkDiscount: 0.1
    },
    specialOffers: []
  },
  {
    id: 'company_heishi',
    name: '黑市',
    type: 'black',
    headquarters: '中立城地下',
    owner: '神秘商人',
    description: '青云大陆最神秘的黑市，交易各种禁忌物品。',
    mainBusiness: ['禁忌物品', '赃物', '情报', '委托'],
    branches: ['各大城市地下'],
    reputation: 60,
    prices: {
      buyModifier: 1.3,
      sellModifier: 0.7,
      rareItemsModifier: 1.5,
      bulkDiscount: 0
    },
    specialOffers: []
  }
]

export const banks: Bank[] = [
  {
    id: 'bank_qianjin',
    name: '千金钱庄',
    location: '中立城',
    owner: '中立联盟',
    grade: 'heaven',
    description: '青云大陆最大的钱庄，提供各种金融服务。',
    services: [
      {
        name: '存款',
        description: '存入灵石，获得利息',
        fee: 0,
        conditions: ['最低存款100灵石']
      },
      {
        name: '贷款',
        description: '借出灵石，支付利息',
        fee: 0,
        conditions: ['需要抵押', '信用良好']
      },
      {
        name: '转账',
        description: '将灵石转给他人',
        fee: 10,
        conditions: ['最低转账100灵石']
      },
      {
        name: '兑换',
        description: '兑换不同货币',
        fee: 5,
        conditions: ['最低兑换100灵石']
      }
    ],
    interestRate: 0.01,
    loanRate: 0.05,
    maxLoan: 100000,
    reputation: 95
  },
  {
    id: 'bank_qingyun',
    name: '青云钱庄',
    location: '青云城',
    owner: '青云宗',
    grade: 'earth',
    description: '青云宗经营的钱庄，主要服务于青云宗弟子。',
    services: [
      {
        name: '存款',
        description: '存入灵石，获得利息',
        fee: 0,
        conditions: ['最低存款100灵石', '青云宗弟子']
      },
      {
        name: '贷款',
        description: '借出灵石，支付利息',
        fee: 0,
        conditions: ['需要抵押', '青云宗弟子']
      },
      {
        name: '贡献点兑换',
        description: '用贡献点兑换灵石',
        fee: 0,
        conditions: ['青云宗弟子']
      }
    ],
    interestRate: 0.015,
    loanRate: 0.03,
    maxLoan: 50000,
    reputation: 90
  }
]

export const extendedMarkets: ExtendedMarket[] = [
  {
    id: 'market_qingyun_city',
    name: '青云城市场',
    location: '青云城',
    type: 'permanent',
    grade: 'earth',
    owner: '青云宗',
    description: '青云城最大的市场，交易各种物品。',
    specialties: ['青云特产', '云系材料', '云系丹药'],
    goods: ['材料', '丹药', '法宝', '功法'],
    prices: { buy: 1.1, sell: 0.9 },
    auctionSchedule: '每月初一',
    specialEvents: ['青云拍卖会', '云系材料展销会']
  },
  {
    id: 'market_xuantian_city',
    name: '玄天城市场',
    location: '玄天城',
    type: 'permanent',
    grade: 'earth',
    owner: '玄天宗',
    description: '玄天城最大的市场，交易各种物品。',
    specialties: ['玄天特产', '玄系材料', '玄系丹药'],
    goods: ['材料', '丹药', '法宝', '功法'],
    prices: { buy: 1.1, sell: 0.9 },
    auctionSchedule: '每月十五',
    specialEvents: ['玄天拍卖会', '玄系材料展销会']
  },
  {
    id: 'market_black',
    name: '黑市',
    location: '中立城地下',
    type: 'permanent',
    grade: 'spirit',
    owner: '地下商会',
    description: '青云大陆最神秘的黑市，交易各种禁忌物品。',
    specialties: ['禁忌物品', '赃物', '情报'],
    goods: ['禁忌物品', '赃物', '情报', '委托'],
    prices: { buy: 1.3, sell: 0.7 },
    blackMarket: true,
    specialEvents: ['禁忌物品拍卖会']
  },
  {
    id: 'market_wandering',
    name: '流动市场',
    location: '各地',
    type: 'temporary',
    grade: 'mortal',
    description: '流动市场，在各地巡回开放。',
    specialties: ['各地特产'],
    goods: ['材料', '丹药', '法宝', '功法'],
    prices: { buy: 1.2, sell: 0.8 },
    specialEvents: ['巡回拍卖会']
  }
]

export const extendedTradeRoutes: TradeRoute[] = [
  {
    id: 'route_central_north',
    name: '中州-北荒路线',
    start: '中州平原',
    end: '北荒原',
    distance: 5000,
    danger: 'medium',
    goods: ['灵石', '灵草', '妖兽材料'],
    travelTime: 30,
    description: '连接中州平原和北荒原的主要贸易路线。'
  },
  {
    id: 'route_central_south',
    name: '中州-南荒路线',
    start: '中州平原',
    end: '南荒丛林',
    distance: 3000,
    danger: 'medium',
    goods: ['灵石', '灵草', '灵兽材料'],
    travelTime: 20,
    description: '连接中州平原和南荒丛林的主要贸易路线。'
  },
  {
    id: 'route_central_west',
    name: '中州-西域路线',
    start: '中州平原',
    end: '西域荒漠',
    distance: 8000,
    danger: 'high',
    goods: ['灵石', '火灵石', '沙兽材料'],
    travelTime: 40,
    description: '连接中州平原和西域荒漠的主要贸易路线。'
  },
  {
    id: 'route_central_east',
    name: '中州-东海路线',
    start: '中州平原',
    end: '东海',
    distance: 2000,
    danger: 'medium',
    goods: ['灵石', '海兽材料', '珍珠'],
    travelTime: 15,
    description: '连接中州平原和东海的主要贸易路线。'
  },
  {
    id: 'route_underground',
    name: '地下贸易路线',
    start: '中立城',
    end: '各大城市',
    distance: 10000,
    danger: 'low',
    goods: ['禁忌物品', '赃物', '情报'],
    travelTime: 10,
    description: '地下商会的秘密贸易路线。'
  }
]