import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { 
  PlayerData, 
  GameState, 
  GameResources,
  CultivationSystem,
  MapLocation,
  SectSystem,
  CraftingSystem
} from '@/types/gameSystems'
import { REALMS } from '@/types/gameSystems'

export const useGameSystemStore = defineStore('gameSystem', () => {
  const gameState = ref<GameState>({
    turn: 1,
    maxTurnsPerMonth: 30,
    turnsRemaining: 30,
    day: 1,
    month: 1,
    year: 1,
    season: '春',
    weather: '晴朗',
    phase: 'morning'
  })

  const playerData = ref<PlayerData>({
    name: '',
    background: '',
    resources: {
      spiritStones: 1000,
      spiritEnergy: 100,
      maxSpiritEnergy: 100,
      spiritEnergyRegen: 10,
      materials: [],
      pills: [],
      artifacts: []
    },
    cultivation: {
      realm: {
        level: 0,
        name: '凡人',
        stage: 1,
        exp: 0,
        expToNext: 100,
        requirements: []
      },
      techniques: [],
      lifespan: 80,
      maxLifespan: 80,
      cultivationSpeed: 1.0,
      breakthroughChance: 0.5
    },
    location: 'starter_village',
    sect: null,
    crafting: {
      alchemyRecipes: [],
      forgingRecipes: [],
      alchemyLevel: 1,
      forgingLevel: 1,
      alchemyExp: 0,
      forgingExp: 0
    },
    quests: [],
    achievements: []
  })

  const mapLocations = ref<MapLocation[]>([
    {
      id: 'starter_village',
      name: '青云村',
      type: 'village',
      region: '青云山脉',
      description: '一个宁静的小村庄，是许多修士的起点。',
      icon: '🏘️',
      tier: 1,
      unlocked: true,
      discovered: true,
      danger: 0,
      rewards: [],
      events: [],
      connections: ['azure_mountain', 'spirit_forest']
    },
    {
      id: 'azure_mountain',
      name: '青云山',
      type: 'wilderness',
      region: '青云山脉',
      description: '青云宗的所在地，山上灵气充沛。',
      icon: '⛰️',
      tier: 2,
      unlocked: false,
      discovered: false,
      danger: 2,
      rewards: [
        { type: 'material', itemId: 'spirit_grass', itemName: '灵草', chance: 0.5, quantity: 3 },
        { type: 'material', itemId: 'spirit_stone_low', itemName: '下品灵石', chance: 0.3, quantity: 5 }
      ],
      events: [],
      connections: ['starter_village', 'azure_sect']
    },
    {
      id: 'azure_sect',
      name: '青云宗',
      type: 'sect',
      region: '青云山脉',
      description: '青云山脉最大的修仙宗门，历史悠久。',
      icon: '🏯',
      tier: 3,
      unlocked: false,
      discovered: false,
      danger: 0,
      rewards: [],
      events: [],
      connections: ['azure_mountain']
    },
    {
      id: 'spirit_forest',
      name: '灵兽森林',
      type: 'wilderness',
      region: '青云山脉',
      description: '森林深处栖息着各种灵兽，危机与机遇并存。',
      icon: '🌲',
      tier: 2,
      unlocked: false,
      discovered: false,
      danger: 3,
      rewards: [
        { type: 'material', itemId: 'beast_core', itemName: '妖兽内丹', chance: 0.2, quantity: 1 },
        { type: 'material', itemId: 'spirit_herb', itemName: '百年灵草', chance: 0.4, quantity: 2 }
      ],
      events: [],
      connections: ['starter_village', 'secret_cave']
    },
    {
      id: 'secret_cave',
      name: '隐秘洞府',
      type: 'secret_realm',
      region: '青云山脉',
      description: '一位前辈修士留下的洞府，据说藏有宝物。',
      icon: '🕳️',
      tier: 4,
      unlocked: false,
      discovered: false,
      danger: 5,
      rewards: [
        { type: 'artifact', itemId: 'basic_sword', itemName: '精钢剑', chance: 0.3, quantity: 1 },
        { type: 'technique', itemId: 'basic_sword_art', itemName: '基础剑法', chance: 0.2, quantity: 1 }
      ],
      events: [],
      connections: ['spirit_forest']
    }
  ])

  const currentRealm = computed(() => {
    return REALMS.find(r => r.level === playerData.value.cultivation.realm.level)
  })

  const nextRealm = computed(() => {
    return REALMS.find(r => r.level === playerData.value.cultivation.realm.level + 1)
  })

  const currentLocation = computed(() => {
    return mapLocations.value.find(l => l.id === playerData.value.location)
  })

  function initNewGame(name: string, background: string) {
    playerData.value.name = name
    playerData.value.background = background
    
    if (background === 'disciple') {
      playerData.value.resources.spiritStones = 2000
      playerData.value.cultivation.realm = {
        level: 1,
        name: '练气期',
        stage: 1,
        exp: 0,
        expToNext: 500,
        requirements: []
      }
      playerData.value.cultivation.lifespan = 150
      playerData.value.cultivation.maxLifespan = 150
    } else if (background === 'merchant') {
      playerData.value.resources.spiritStones = 5000
      playerData.value.resources.materials = [
        {
          id: 'mat_1',
          name: '灵草',
          type: 'herb',
          rarity: 'common',
          quantity: 20,
          description: '常见的灵草，可用于炼丹。',
          icon: '🌿'
        }
      ]
    } else if (background === 'orphan') {
      playerData.value.cultivation.cultivationSpeed = 1.5
      playerData.value.cultivation.breakthroughChance = 0.7
    }
    
    playerData.value.cultivation.techniques = [
      {
        id: 'tech_basic',
        name: '基础吐纳术',
        type: 'main',
        level: 1,
        maxLevel: 10,
        exp: 0,
        expToNext: 100,
        effects: [
          { type: 'cultivation_speed', value: 1.0 }
        ],
        description: '最基础的修炼功法，适合初学者。',
        icon: '🧘'
      }
    ]
    
    playerData.value.crafting.alchemyRecipes = [
      {
        id: 'recipe_pill_healing',
        name: '疗伤丹',
        tier: 1,
        materials: [
          { materialId: 'spirit_grass', materialName: '灵草', quantity: 3 }
        ],
        result: {
          itemId: 'pill_healing',
          itemName: '疗伤丹',
          quantity: 1
        },
        successRate: 0.8,
        requiredLevel: 1,
        unlocked: true,
        description: '恢复少量生命值。',
        icon: '💊'
      }
    ]
  }

  function advanceTurn() {
    if (gameState.value.turnsRemaining <= 0) return false
    
    gameState.value.turn++
    gameState.value.turnsRemaining--
    gameState.value.phase = getNextPhase(gameState.value.phase)
    
    if (gameState.value.phase === 'morning') {
      gameState.value.day++
      regenerateSpiritEnergy()
      
      if (gameState.value.day > 30) {
        gameState.value.day = 1
        gameState.value.month++
        gameState.value.turnsRemaining = gameState.value.maxTurnsPerMonth
        updateSeason()
        
        if (gameState.value.month > 12) {
          gameState.value.month = 1
          gameState.value.year++
          playerData.value.cultivation.lifespan--
        }
      }
    }
    
    return true
  }

  function getNextPhase(current: string): any {
    const phases = ['morning', 'afternoon', 'evening', 'night']
    const index = phases.indexOf(current)
    return phases[(index + 1) % phases.length]
  }

  function regenerateSpiritEnergy() {
    const regen = playerData.value.resources.spiritEnergyRegen
    playerData.value.resources.spiritEnergy = Math.min(
      playerData.value.resources.maxSpiritEnergy,
      playerData.value.resources.spiritEnergy + regen
    )
  }

  function updateSeason() {
    const seasons = ['春', '夏', '秋', '冬']
    const month = gameState.value.month
    if (month >= 1 && month <= 3) gameState.value.season = '春'
    else if (month >= 4 && month <= 6) gameState.value.season = '夏'
    else if (month >= 7 && month <= 9) gameState.value.season = '秋'
    else gameState.value.season = '冬'
  }

  function cultivate() {
    if (playerData.value.resources.spiritEnergy < 10) return false
    if (gameState.value.turnsRemaining <= 0) return false
    
    playerData.value.resources.spiritEnergy -= 10
    const expGain = 20 * playerData.value.cultivation.cultivationSpeed
    playerData.value.cultivation.realm.exp += expGain
    
    if (playerData.value.cultivation.realm.exp >= playerData.value.cultivation.realm.expToNext) {
      advanceStage()
    }
    
    advanceTurn()
    return true
  }

  function advanceStage() {
    const realm = playerData.value.cultivation.realm
    const realmInfo = REALMS.find(r => r.level === realm.level)
    
    if (!realmInfo) return
    
    if (realm.stage < realmInfo.stages) {
      realm.stage++
      realm.exp = 0
      realm.expToNext = realmInfo.expPerStage
    } else {
      attemptBreakthrough()
    }
  }

  function attemptBreakthrough() {
    const chance = playerData.value.cultivation.breakthroughChance
    const success = Math.random() < chance
    
    if (success) {
      const currentLevel = playerData.value.cultivation.realm.level
      const nextRealmInfo = REALMS.find(r => r.level === currentLevel + 1)
      
      if (nextRealmInfo) {
        playerData.value.cultivation.realm.level++
        playerData.value.cultivation.realm.name = nextRealmInfo.name
        playerData.value.cultivation.realm.stage = 1
        playerData.value.cultivation.realm.exp = 0
        playerData.value.cultivation.realm.expToNext = nextRealmInfo.expPerStage
        playerData.value.cultivation.maxLifespan = nextRealmInfo.lifespan
        playerData.value.cultivation.lifespan = nextRealmInfo.lifespan
      }
    }
    
    return success
  }

  function exploreLocation(locationId: string) {
    const location = mapLocations.value.find(l => l.id === locationId)
    if (!location || !location.unlocked) return false
    
    if (playerData.value.resources.spiritEnergy < 20) return false
    if (gameState.value.turnsRemaining <= 0) return false
    
    playerData.value.resources.spiritEnergy -= 20
    playerData.value.location = locationId
    
    if (!location.discovered) {
      location.discovered = true
      unlockConnections(locationId)
    }
    
    collectRewards(location)
    advanceTurn()
    return true
  }

  function unlockConnections(locationId: string) {
    const location = mapLocations.value.find(l => l.id === locationId)
    if (!location) return
    
    location.connections.forEach(connId => {
      const conn = mapLocations.value.find(l => l.id === connId)
      if (conn && !conn.unlocked) {
        conn.unlocked = true
      }
    })
  }

  function collectRewards(location: MapLocation) {
    location.rewards.forEach(reward => {
      if (Math.random() < reward.chance) {
        if (reward.type === 'material') {
          addMaterial(reward.itemId!, reward.itemName!, reward.quantity)
        } else if (reward.type === 'spirit_stone') {
          playerData.value.resources.spiritStones += reward.quantity
        }
      }
    })
  }

  function addMaterial(id: string, name: string, quantity: number) {
    const existing = playerData.value.resources.materials.find(m => m.id === id)
    if (existing) {
      existing.quantity += quantity
    } else {
      playerData.value.resources.materials.push({
        id,
        name,
        type: 'herb',
        rarity: 'common',
        quantity,
        description: '',
        icon: '🌿'
      })
    }
  }

  function craftPill(recipeId: string) {
    const recipe = playerData.value.crafting.alchemyRecipes.find(r => r.id === recipeId)
    if (!recipe || !recipe.unlocked) return false
    
    if (playerData.value.crafting.alchemyLevel < recipe.requiredLevel) return false
    if (gameState.value.turnsRemaining <= 0) return false
    
    for (const mat of recipe.materials) {
      const has = playerData.value.resources.materials.find(m => m.id === mat.materialId)
      if (!has || has.quantity < mat.quantity) return false
    }
    
    for (const mat of recipe.materials) {
      const material = playerData.value.resources.materials.find(m => m.id === mat.materialId)
      if (material) {
        material.quantity -= mat.quantity
        if (material.quantity <= 0) {
          const index = playerData.value.resources.materials.indexOf(material)
          playerData.value.resources.materials.splice(index, 1)
        }
      }
    }
    
    const success = Math.random() < recipe.successRate
    
    if (success) {
      const existing = playerData.value.resources.pills.find(p => p.id === recipe.result.itemId)
      if (existing) {
        existing.quantity += recipe.result.quantity
      } else {
        playerData.value.resources.pills.push({
          id: recipe.result.itemId,
          name: recipe.result.itemName,
          quality: 'common',
          quantity: recipe.result.quantity,
          effects: [{ type: 'heal', value: 30 }],
          description: '',
          icon: '💊'
        })
      }
      
      playerData.value.crafting.alchemyExp += 10
      if (playerData.value.crafting.alchemyExp >= playerData.value.crafting.alchemyLevel * 100) {
        playerData.value.crafting.alchemyLevel++
        playerData.value.crafting.alchemyExp = 0
      }
    }
    
    advanceTurn()
    return success
  }

  function usePill(pillId: string) {
    const pill = playerData.value.resources.pills.find(p => p.id === pillId)
    if (!pill || pill.quantity <= 0) return false
    
    pill.quantity--
    if (pill.quantity <= 0) {
      const index = playerData.value.resources.pills.indexOf(pill)
      playerData.value.resources.pills.splice(index, 1)
    }
    
    pill.effects.forEach(effect => {
      if (effect.type === 'heal') {
        playerData.value.cultivation.lifespan = Math.min(
          playerData.value.cultivation.maxLifespan,
          playerData.value.cultivation.lifespan + effect.value
        )
      }
    })
    
    return true
  }

  return {
    gameState,
    playerData,
    mapLocations,
    currentRealm,
    nextRealm,
    currentLocation,
    initNewGame,
    advanceTurn,
    cultivate,
    exploreLocation,
    craftPill,
    usePill
  }
})
