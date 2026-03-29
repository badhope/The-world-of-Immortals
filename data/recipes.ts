import { Recipe } from '../src/types'

export const recipes: Record<string, Recipe> = {
  // ========== 炼丹配方 ==========
  pill_spirit_gathering: {
    id: 'pill_spirit_gathering',
    name: '聚气丹',
    type: 'alchemy',
    result: {
      itemId: 'pill_spirit_gathering',
      count: 3
    },
    ingredients: [
      { itemId: 'spirit_grass', count: 5 },
      { itemId: 'spirit_stone_low', count: 10 }
    ],
    requirements: {
      building: 'alchemy_room'
    },
    time: 300,
    successRate: 0.9
  },
  pill_healing: {
    id: 'pill_healing',
    name: '疗伤丹',
    type: 'alchemy',
    result: {
      itemId: 'pill_healing',
      count: 5
    },
    ingredients: [
      { itemId: 'spirit_grass', count: 3 },
      { itemId: 'ginseng_100', count: 1 }
    ],
    requirements: {
      building: 'alchemy_room'
    },
    time: 600,
    successRate: 0.85
  },
  pill_breakthrough: {
    id: 'pill_breakthrough',
    name: '破境丹',
    type: 'alchemy',
    result: {
      itemId: 'pill_breakthrough',
      count: 1
    },
    ingredients: [
      { itemId: 'ginseng_100', count: 5 },
      { itemId: 'beast_core_low', count: 3 },
      { itemId: 'spirit_stone_mid', count: 10 }
    ],
    requirements: {
      building: 'alchemy_room',
      level: 3
    },
    time: 3600,
    successRate: 0.5
  },
  
  // ========== 炼器配方 ==========
  sword_iron: {
    id: 'sword_iron',
    name: '玄铁剑',
    type: 'forging',
    result: {
      itemId: 'sword_iron',
      count: 1
    },
    ingredients: [
      { itemId: 'iron_essence', count: 10 },
      { itemId: 'spirit_stone_low', count: 50 }
    ],
    requirements: {
      building: 'forge'
    },
    time: 1800,
    successRate: 0.8
  },
  sword_spirit: {
    id: 'sword_spirit',
    name: '灵剑·青锋',
    type: 'forging',
    result: {
      itemId: 'sword_spirit',
      count: 1
    },
    ingredients: [
      { itemId: 'iron_essence', count: 50 },
      { itemId: 'beast_core_low', count: 5 },
      { itemId: 'spirit_stone_mid', count: 20 }
    ],
    requirements: {
      building: 'forge',
      level: 3
    },
    time: 7200,
    successRate: 0.3
  },
  robe_disciple: {
    id: 'robe_disciple',
    name: '弟子道袍',
    type: 'forging',
    result: {
      itemId: 'robe_disciple',
      count: 1
    },
    ingredients: [
      { itemId: 'spirit_wood', count: 5 },
      { itemId: 'spirit_stone_low', count: 20 }
    ],
    requirements: {
      building: 'forge'
    },
    time: 900,
    successRate: 0.9
  }
}

export function getRecipe(id: string): Recipe | undefined {
  return recipes[id]
}

export function getRecipesByType(type: string): Recipe[] {
  return Object.values(recipes).filter(recipe => recipe.type === type)
}

export function getAvailableRecipes(unlockedRecipes: string[]): Recipe[] {
  return unlockedRecipes.map(id => recipes[id]).filter(Boolean)
}
