import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Player, WorldState, InventoryItem, Building, GameEvent } from '@/types'
import { getRealmByLevel, getNextRealm } from '../../data/realms'

export interface ExtendedWorldState extends WorldState {
  timeOfDay: '清晨' | '上午' | '中午' | '下午' | '傍晚' | '夜晚' | '深夜'
  moonPhase: '新月' | '峨眉月' | '上弦月' | '盈凸月' | '满月' | '亏凸月' | '下弦月' | '残月'
  spiritDensity: number
  specialEvents: string[]
  triggeredEvents: Record<string, number>
}

export const useGameStore = defineStore('game', () => {
  const isLoaded = ref(false)
  const currentSaveId = ref<string | null>(null)
  
  const player = ref<Player>({
    name: '',
    realm: { level: 0, name: '凡人', exp: 0, expToNext: 100 },
    stats: { strength: 10, agility: 10, intelligence: 10, willpower: 10, luck: 10 },
    skills: [],
    inventory: [],
    equipment: {},
    location: 'starter_village',
    spirit: 100,
    maxSpirit: 100,
    health: 100,
    maxHealth: 100,
    karma: 0,
    reputation: {}
  })
  
  const world = ref<ExtendedWorldState>({
    seed: 0,
    day: 1,
    season: '春',
    weather: '晴朗',
    timeOfDay: '清晨',
    moonPhase: '新月',
    spiritDensity: 1.0,
    specialEvents: [],
    triggeredEvents: {},
    globalEvents: [],
    discoveredLocations: ['starter_village'],
    unlockedRecipes: ['pill_spirit_gathering', 'sword_iron']
  })
  
  const buildings = ref<Building[]>([])
  const events = ref<GameEvent[]>([])
  const aiEnabled = ref(false)
  
  const currentRealm = computed(() => getRealmByLevel(player.value.realm.level))
  const nextRealm = computed(() => getNextRealm(player.value.realm.level))
  const currentLocationId = computed(() => player.value.location)
  const inventoryItems = computed(() => player.value.inventory)
  
  const playerPower = computed(() => {
    const realmMultiplier = player.value.realm.level + 1
    return (player.value.health + player.value.spirit) * realmMultiplier * 0.1
  })
  
  const cultivationBonus = computed(() => {
    let bonus = 1.0
    
    if (world.value.timeOfDay === '夜晚') bonus *= 1.2
    if (world.value.timeOfDay === '深夜') bonus *= 1.4
    if (world.value.timeOfDay === '清晨') bonus *= 1.1
    
    if (world.value.moonPhase === '满月') bonus *= 1.5
    if (world.value.moonPhase === '新月') bonus *= 0.8
    
    if (world.value.weather === '雷暴') bonus *= 1.3
    if (world.value.weather === '大雾') bonus *= 1.2
    
    bonus *= world.value.spiritDensity
    
    if (world.value.specialEvents.includes('full_moon_surge')) bonus *= 1.5
    if (world.value.specialEvents.includes('spirit_storm')) bonus *= 2.0
    
    return bonus
  })
  
  function initNewGame(name: string, seed?: number) {
    player.value.name = name
    player.value.realm = { level: 0, name: '凡人', exp: 0, expToNext: 100 }
    player.value.stats = { strength: 10, agility: 10, intelligence: 10, willpower: 10, luck: 10 }
    player.value.skills = []
    player.value.inventory = [
      { id: 'item_1', itemId: 'spirit_stone_low', count: 100 },
      { id: 'item_2', itemId: 'spirit_grass', count: 10 }
    ]
    player.value.equipment = {}
    player.value.location = 'starter_village'
    player.value.spirit = 100
    player.value.maxSpirit = 100
    player.value.health = 100
    player.value.maxHealth = 100
    player.value.karma = 0
    player.value.reputation = {}
    
    world.value = {
      seed: seed ?? Date.now(),
      day: 1,
      season: '春',
      weather: '晴朗',
      timeOfDay: '清晨',
      moonPhase: '新月',
      spiritDensity: 1.0,
      specialEvents: [],
      triggeredEvents: {},
      globalEvents: [],
      discoveredLocations: ['starter_village'],
      unlockedRecipes: ['pill_spirit_gathering', 'sword_iron']
    }
    
    buildings.value = []
    events.value = []
    isLoaded.value = true
  }
  
  function loadGame(saveData: any) {
    if (saveData.player) {
      player.value = { ...player.value, ...saveData.player }
    }
    if (saveData.world) {
      world.value = { ...world.value, ...saveData.world }
    }
    if (saveData.buildings) {
      buildings.value = saveData.buildings
    }
    if (saveData.events) {
      events.value = saveData.events
    }
    isLoaded.value = true
  }
  
  function getSaveData() {
    return {
      player: player.value,
      world: world.value,
      buildings: buildings.value,
      events: events.value
    }
  }
  
  function addItem(itemId: string, count: number = 1) {
    const existing = player.value.inventory.find(i => i.itemId === itemId)
    if (existing) {
      existing.count += count
    } else {
      player.value.inventory.push({
        id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        itemId,
        count
      })
    }
  }
  
  function removeItem(itemId: string, count: number = 1): boolean {
    const index = player.value.inventory.findIndex(i => i.itemId === itemId)
    if (index === -1) return false
    
    const item = player.value.inventory[index]
    if (item.count < count) return false
    
    item.count -= count
    if (item.count <= 0) {
      player.value.inventory.splice(index, 1)
    }
    return true
  }
  
  function hasItem(itemId: string, count: number = 1): boolean {
    const item = player.value.inventory.find(i => i.itemId === itemId)
    return item ? item.count >= count : false
  }
  
  function getItemCount(itemId: string): number {
    const item = player.value.inventory.find(i => i.itemId === itemId)
    return item ? item.count : 0
  }
  
  function moveTo(locationId: string) {
    player.value.location = locationId
    if (!world.value.discoveredLocations.includes(locationId)) {
      world.value.discoveredLocations.push(locationId)
    }
  }
  
  function addExp(amount: number) {
    const bonusAmount = Math.floor(amount * cultivationBonus.value)
    player.value.realm.exp += bonusAmount
    
    while (nextRealm.value && player.value.realm.exp >= nextRealm.value.expRequired) {
      player.value.realm.level++
      player.value.realm.name = nextRealm.value.name
      player.value.maxSpirit += 50
      player.value.maxHealth += 20
      player.value.spirit = player.value.maxSpirit
      player.value.health = player.value.maxHealth
      
      addEvent({
        id: `event_${Date.now()}`,
        title: '境界突破',
        description: `恭喜！你成功突破到了${player.value.realm.name}！`,
        type: 'story',
        choices: [],
        timestamp: Date.now()
      })
    }
  }
  
  function addBuilding(building: Building) {
    buildings.value.push(building)
  }
  
  function removeBuilding(buildingId: string) {
    const index = buildings.value.findIndex(b => b.id === buildingId)
    if (index !== -1) {
      buildings.value.splice(index, 1)
    }
  }
  
  function addEvent(event: GameEvent) {
    events.value.unshift(event)
    if (events.value.length > 100) {
      events.value.pop()
    }
  }
  
  function advanceTime() {
    const timeOrder = ['清晨', '上午', '中午', '下午', '傍晚', '夜晚', '深夜'] as const
    const currentIndex = timeOrder.indexOf(world.value.timeOfDay as any)
    
    if (currentIndex === timeOrder.length - 1) {
      world.value.timeOfDay = '清晨'
      world.value.day++
      updateDailyState()
    } else {
      world.value.timeOfDay = timeOrder[currentIndex + 1] as any
    }
    
    updateSpiritDensity()
  }
  
  function updateDailyState() {
    if (world.value.day % 30 === 0) {
      const seasons = ['春', '夏', '秋', '冬'] as const
      const seasonIndex = seasons.indexOf(world.value.season as any)
      world.value.season = seasons[(seasonIndex + 1) % 4]
    }
    
    updateMoonPhase()
    rollWeather()
    clearDailySpecialEvents()
  }
  
  function updateMoonPhase() {
    const phases = ['新月', '峨眉月', '上弦月', '盈凸月', '满月', '亏凸月', '下弦月', '残月'] as const
    const phaseIndex = Math.floor((world.value.day % 30) / 3.75)
    world.value.moonPhase = phases[phaseIndex]
  }
  
  function rollWeather() {
    const season = world.value.season
    const weatherOptions: Record<string, string[]> = {
      '春': ['晴朗', '多云', '小雨', '大雨'],
      '夏': ['晴朗', '多云', '雷暴', '大雨'],
      '秋': ['晴朗', '多云', '小雨', '大雾'],
      '冬': ['晴朗', '多云', '小雪', '暴雪']
    }
    
    const options = weatherOptions[season] || ['晴朗', '多云']
    const weights = [40, 30, 20, 10]
    
    let random = Math.random() * 100
    for (let i = 0; i < options.length; i++) {
      random -= weights[i] || 10
      if (random <= 0) {
        world.value.weather = options[i] as any
        break
      }
    }
  }
  
  function updateSpiritDensity() {
    let density = 1.0
    
    if (world.value.weather === '雷暴') density *= 1.5
    if (world.value.weather === '大雨') density *= 1.2
    if (world.value.weather === '暴雪') density *= 0.8
    if (world.value.weather === '大雾') density *= 1.3
    
    if (world.value.moonPhase === '满月') density *= 1.5
    if (world.value.moonPhase === '新月') density *= 0.8
    
    if (world.value.season === '春') density *= 1.2
    if (world.value.season === '冬') density *= 0.9
    
    if (world.value.timeOfDay === '夜晚') density *= 1.3
    if (world.value.timeOfDay === '深夜') density *= 1.5
    if (world.value.timeOfDay === '中午') density *= 0.9
    
    world.value.spiritDensity = Math.round(density * 100) / 100
  }
  
  function clearDailySpecialEvents() {
    world.value.specialEvents = []
  }
  
  function addSpecialEvent(eventId: string) {
    if (!world.value.specialEvents.includes(eventId)) {
      world.value.specialEvents.push(eventId)
    }
  }
  
  function triggerEvent(eventId: string) {
    world.value.triggeredEvents[eventId] = world.value.day
  }
  
  function setAIEnabled(enabled: boolean) {
    aiEnabled.value = enabled
  }
  
  function modifyHealth(amount: number) {
    player.value.health = Math.max(0, Math.min(player.value.maxHealth, player.value.health + amount))
  }
  
  function modifySpirit(amount: number) {
    player.value.spirit = Math.max(0, Math.min(player.value.maxSpirit, player.value.spirit + amount))
  }
  
  return {
    isLoaded,
    currentSaveId,
    player,
    world,
    buildings,
    events,
    aiEnabled,
    currentRealm,
    nextRealm,
    currentLocationId,
    inventoryItems,
    playerPower,
    cultivationBonus,
    initNewGame,
    loadGame,
    getSaveData,
    addItem,
    removeItem,
    hasItem,
    getItemCount,
    moveTo,
    addExp,
    addBuilding,
    removeBuilding,
    addEvent,
    advanceTime,
    setAIEnabled,
    modifyHealth,
    modifySpirit,
    addSpecialEvent,
    triggerEvent
  }
})
