import { Item } from '../types'

export const items: Record<string, Item> = {
  // ========== 材料 ==========
  spirit_stone_low: {
    id: 'spirit_stone_low',
    name: '下品灵石',
    type: 'material',
    rarity: 'common',
    description: '蕴含微弱灵气的矿石，是修仙界最基础的货币和资源。',
    icon: '💎',
    stackable: true,
    maxStack: 999,
    value: 1,
    tags: ['currency', 'resource']
  },
  spirit_stone_mid: {
    id: 'spirit_stone_mid',
    name: '中品灵石',
    type: 'material',
    rarity: 'uncommon',
    description: '蕴含中等灵气的矿石，一块相当于百块下品灵石。',
    icon: '💠',
    stackable: true,
    maxStack: 999,
    value: 100,
    tags: ['currency', 'resource']
  },
  spirit_grass: {
    id: 'spirit_grass',
    name: '灵草',
    type: 'material',
    rarity: 'common',
    description: '生长在灵气充沛之地的普通草药，可用于炼制基础丹药。',
    icon: '🌿',
    stackable: true,
    maxStack: 99,
    value: 5,
    tags: ['herb', 'ingredient']
  },
  ginseng_100: {
    id: 'ginseng_100',
    name: '百年人参',
    type: 'material',
    rarity: 'rare',
    description: '吸收百年天地精华的人参，炼丹的上佳材料。',
    icon: '🌱',
    stackable: true,
    maxStack: 10,
    value: 500,
    tags: ['herb', 'ingredient', 'precious']
  },
  iron_essence: {
    id: 'iron_essence',
    name: '玄铁精',
    type: 'material',
    rarity: 'uncommon',
    description: '经过提炼的玄铁，炼器的常用材料。',
    icon: '⚙️',
    stackable: true,
    maxStack: 99,
    value: 50,
    tags: ['metal', 'ingredient']
  },
  spirit_wood: {
    id: 'spirit_wood',
    name: '灵木',
    type: 'material',
    rarity: 'common',
    description: '蕴含灵气的木材，可用于炼器和建筑。',
    icon: '🪵',
    stackable: true,
    maxStack: 99,
    value: 10,
    tags: ['wood', 'ingredient']
  },
  beast_core_low: {
    id: 'beast_core_low',
    name: '妖兽内丹（低阶）',
    type: 'material',
    rarity: 'uncommon',
    description: '低阶妖兽体内凝结的内丹，蕴含少量妖力。',
    icon: '🔮',
    stackable: true,
    maxStack: 50,
    value: 200,
    tags: ['beast', 'ingredient']
  },
  
  // ========== 丹药 ==========
  pill_spirit_gathering: {
    id: 'pill_spirit_gathering',
    name: '聚气丹',
    type: 'consumable',
    rarity: 'common',
    description: '能够加速灵气吸收的基础丹药。',
    icon: '💊',
    stackable: true,
    maxStack: 99,
    value: 50,
    effects: [
      { type: 'spirit_regen', value: 10, duration: 3600 }
    ],
    tags: ['pill', 'cultivation']
  },
  pill_healing: {
    id: 'pill_healing',
    name: '疗伤丹',
    type: 'consumable',
    rarity: 'common',
    description: '能够快速恢复伤势的丹药。',
    icon: '💊',
    stackable: true,
    maxStack: 99,
    value: 30,
    effects: [
      { type: 'heal', value: 50 }
    ],
    tags: ['pill', 'healing']
  },
  pill_breakthrough: {
    id: 'pill_breakthrough',
    name: '破境丹',
    type: 'consumable',
    rarity: 'rare',
    description: '能够增加突破成功率的珍贵丹药。',
    icon: '🌟',
    stackable: true,
    maxStack: 10,
    value: 5000,
    effects: [
      { type: 'breakthrough_chance', value: 20 }
    ],
    tags: ['pill', 'cultivation', 'precious']
  },
  
  // ========== 装备 ==========
  sword_iron: {
    id: 'sword_iron',
    name: '玄铁剑',
    type: 'equipment',
    rarity: 'common',
    description: '由玄铁锻造的普通法剑，勉强能够传导灵力。',
    icon: '⚔️',
    stackable: false,
    maxStack: 1,
    value: 100,
    effects: [
      { type: 'attack', value: 10 },
      { type: 'spirit_conduct', value: 5 }
    ],
    tags: ['weapon', 'sword']
  },
  sword_spirit: {
    id: 'sword_spirit',
    name: '灵剑·青锋',
    type: 'equipment',
    rarity: 'rare',
    description: '蕴含剑灵的上品法剑，与主人心意相通。',
    icon: '🗡️',
    stackable: false,
    maxStack: 1,
    value: 10000,
    effects: [
      { type: 'attack', value: 50 },
      { type: 'spirit_conduct', value: 30 },
      { type: 'sword_intent', value: 10 }
    ],
    tags: ['weapon', 'sword', 'spirit']
  },
  robe_disciple: {
    id: 'robe_disciple',
    name: '弟子道袍',
    type: 'equipment',
    rarity: 'common',
    description: '宗门弟子的标准服饰，有微弱的防护作用。',
    icon: '👘',
    stackable: false,
    maxStack: 1,
    value: 50,
    effects: [
      { type: 'defense', value: 5 }
    ],
    tags: ['armor', 'robe']
  },
  
  // ========== 功法 ==========
  skill_basic_cultivation: {
    id: 'skill_basic_cultivation',
    name: '基础吐纳术',
    type: 'skill_book',
    rarity: 'common',
    description: '修仙入门的基础功法，教导如何感应和吸收天地灵气。',
    icon: '📜',
    stackable: false,
    maxStack: 1,
    value: 100,
    tags: ['skill', 'cultivation', 'basic']
  },
  skill_sword_basic: {
    id: 'skill_sword_basic',
    name: '基础剑法',
    type: 'skill_book',
    rarity: 'common',
    description: '剑修入门的基础剑法，包含三式基础剑招。',
    icon: '📜',
    stackable: false,
    maxStack: 1,
    value: 200,
    tags: ['skill', 'combat', 'sword']
  },
  
  // ========== 法宝 ==========
  artifact_flying_sword: {
    id: 'artifact_flying_sword',
    name: '飞剑·青云',
    type: 'artifact',
    rarity: 'epic',
    description: '可以御剑飞行的法宝，是剑修的标志性法器。',
    icon: '⚡',
    stackable: false,
    maxStack: 1,
    value: 50000,
    effects: [
      { type: 'flight', value: 1 },
      { type: 'attack', value: 100 },
      { type: 'speed', value: 50 }
    ],
    tags: ['artifact', 'weapon', 'flying']
  }
}

export function getItem(id: string): Item | undefined {
  return items[id]
}

export function getItemsByType(type: string): Item[] {
  return Object.values(items).filter(item => item.type === type)
}

export function getItemsByTag(tag: string): Item[] {
  return Object.values(items).filter(item => item.tags?.includes(tag))
}
