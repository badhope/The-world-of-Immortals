<template>
  <div class="explore-view">
    <div class="explore-header">
      <h2 class="view-title">世界探索</h2>
      <p class="view-desc">选择目的地，开始你的修仙之旅</p>
    </div>
    
    <div class="current-section card">
      <div class="current-header">
        <span class="current-icon">{{ currentLocation?.icon || '❓' }}</span>
        <div class="current-info">
          <div class="current-label">当前所在</div>
          <div class="current-name">{{ currentLocation?.name || '未知之地' }}</div>
        </div>
      </div>
      <div class="current-actions">
        <button class="btn btn-sm" @click="gatherResource" :disabled="isGathering">
          {{ isGathering ? '采集中...' : '🌿 采集' }}
        </button>
        <button class="btn btn-sm" @click="exploreArea" :disabled="isExploring">
          {{ isExploring ? '探索中...' : '🔍 探索' }}
        </button>
        <button class="btn btn-sm" @click="meditateHere" :disabled="isMeditating">
          {{ isMeditating ? '冥想中...' : '✨ 冥想' }}
        </button>
      </div>
    </div>
    
    <div class="destinations-section">
      <div class="section-header">
        <h3 class="section-title">可前往之地</h3>
      </div>
      <div class="locations-grid">
        <div 
          v-for="loc in connectedLocations" 
          :key="loc.id"
          class="location-card"
          :class="{ 
            discovered: isDiscovered(loc.id), 
            selected: selectedLocation?.id === loc.id 
          }"
          @click="selectLocation(loc)"
        >
          <div class="loc-icon">{{ loc.icon }}</div>
          <div class="loc-info">
            <div class="loc-name">{{ loc.name }}</div>
            <div class="loc-meta">
              <span class="loc-type">{{ getLocationTypeLabel(loc.type) }}</span>
              <span class="loc-tier">{{ '⭐'.repeat(loc.tier) }}</span>
            </div>
          </div>
          <div v-if="!isDiscovered(loc.id)" class="undiscovered-mask">
            <span>?</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="location-detail card" v-if="selectedLocation">
      <div class="detail-header">
        <span class="detail-icon">{{ selectedLocation.icon }}</span>
        <div class="detail-title-section">
          <h3 class="detail-title">{{ selectedLocation.name }}</h3>
          <span class="detail-type">{{ getLocationTypeLabel(selectedLocation.type) }}</span>
        </div>
      </div>
      
      <p class="detail-desc">{{ selectedLocation.description }}</p>
      
      <div class="detail-info" v-if="selectedLocation.resources?.length">
        <div class="info-label">此地资源</div>
        <div class="info-tags">
          <span v-for="res in selectedLocation.resources" :key="res.type" class="tag resource">
            {{ getResourceLabel(res.type) }}
          </span>
        </div>
      </div>
      
      <div class="detail-info" v-if="getLocationDangers(selectedLocation.id).length">
        <div class="info-label">潜在危险</div>
        <div class="info-tags">
          <span v-for="danger in getLocationDangers(selectedLocation.id)" :key="danger.name" class="tag danger">
            ⚠️ {{ danger.name }}
          </span>
        </div>
      </div>
      
      <button class="btn btn-primary travel-btn" @click="confirmTravel" :disabled="isTraveling">
        {{ isTraveling ? '移动中...' : '前往此地' }}
      </button>
    </div>
    
    <div class="event-modal" v-if="currentEvent">
      <div class="event-content card">
        <div class="event-header">
          <span class="event-icon">{{ getEventIcon(currentEvent.type) }}</span>
          <h3 class="event-title">{{ currentEvent.title }}</h3>
        </div>
        <p class="event-desc">{{ currentEvent.description }}</p>
        
        <div class="event-choices">
          <button 
            v-for="choice in currentEvent.choices" 
            :key="choice.id"
            class="btn choice-btn"
            :disabled="!isChoiceAvailable(choice) || isResolving"
            @click="makeChoice(choice)"
          >
            <span class="choice-text">{{ choice.text }}</span>
            <span class="choice-rate" v-if="choice.successRate && choice.successRate < 1">
              {{ (choice.successRate * 100).toFixed(0) }}%
            </span>
          </button>
        </div>
      </div>
    </div>
    
    <div class="result-modal" v-if="lastResult">
      <div class="result-content card" :class="{ success: lastResult.success, fail: !lastResult.success }">
        <div class="result-icon">{{ lastResult.success ? '✅' : '❌' }}</div>
        <h3 class="result-title">{{ lastResult.success ? '成功' : '失败' }}</h3>
        <p class="result-message">{{ lastResult.message }}</p>
        <div class="result-effects" v-if="lastResult.effects">
          <span v-if="lastResult.effects.exp" class="effect exp">经验 +{{ lastResult.effects.exp }}</span>
          <span v-if="lastResult.effects.health" class="effect health">
            生命 {{ lastResult.effects.health > 0 ? '+' : '' }}{{ lastResult.effects.health }}
          </span>
          <span v-if="lastResult.effects.spirit" class="effect spirit">
            灵力 {{ lastResult.effects.spirit > 0 ? '+' : '' }}{{ lastResult.effects.spirit }}
          </span>
        </div>
        <button class="btn" @click="closeResult">确定</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useGameStore } from '@/stores/game'
import { 
  locations, 
  getConnectedLocations, 
  getTravelTime,
  rollDanger,
  calculateGatherResult,
  locationDangers,
  LocationDanger
} from '../../../data/locations'
import { 
  getAvailableEvents, 
  rollEvent,
  GameEvent,
  EventChoice
} from '../../../data/events'
import type { Location } from '@/types'

interface EventResult {
  success: boolean
  message: string
  effects?: {
    exp?: number
    health?: number
    spirit?: number
    items?: { id: string; count: number }[]
  }
}

const gameStore = useGameStore()

const currentLocation = computed(() => locations[gameStore.player.location])
const connectedLocations = computed(() => getConnectedLocations(gameStore.player.location))
const selectedLocation = ref<Location | null>(null)
const isTraveling = ref(false)
const isGathering = ref(false)
const isExploring = ref(false)
const isMeditating = ref(false)
const isResolving = ref(false)

const currentEvent = ref<GameEvent | null>(null)
const lastResult = ref<EventResult | null>(null)

onMounted(() => {
  checkRandomEvent()
})

function isDiscovered(locationId: string): boolean {
  return gameStore.world.discoveredLocations.includes(locationId)
}

function getLocationTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    city: '城池',
    village: '村庄',
    mountain: '山脉',
    forest: '森林',
    cave: '洞府',
    ruins: '遗迹',
    secret_realm: '秘境',
    sect: '宗门',
    market: '坊市'
  }
  return labels[type] || type
}

function getResourceLabel(type: string): string {
  const labels: Record<string, string> = {
    spirit_grass: '灵草',
    spirit_stone: '灵石',
    iron_ore: '铁矿',
    rare_herb: '珍稀草药',
    beast_material: '妖兽材料',
    spirit_wood: '灵木'
  }
  return labels[type] || type
}

function getEventIcon(type: string): string {
  const icons: Record<string, string> = {
    story: '📜',
    discovery: '✨',
    danger: '⚔️',
    opportunity: '🎁',
    cultivation: '🧘'
  }
  return icons[type] || '📌'
}

function getLocationDangers(locationId: string): LocationDanger[] {
  return locationDangers[locationId] || []
}

function selectLocation(loc: Location) {
  selectedLocation.value = loc
}

async function confirmTravel() {
  if (!selectedLocation.value || isTraveling.value) return
  
  isTraveling.value = true
  const targetLocation = selectedLocation.value
  const travelTime = getTravelTime(gameStore.player.location, targetLocation.id)
  
  for (let i = 0; i < travelTime; i++) {
    gameStore.advanceTime()
  }
  
  gameStore.moveTo(targetLocation.id)
  
  const danger = rollDanger(targetLocation.id)
  if (danger) {
    await handleDanger(danger)
  } else {
    gameStore.addEvent({
      id: `travel_${Date.now()}`,
      title: '抵达目的地',
      description: `你安全来到了${targetLocation.name}`,
      type: 'story',
      choices: [],
      timestamp: Date.now()
    })
    
    checkRandomEvent()
  }
  
  selectedLocation.value = null
  isTraveling.value = false
}

async function handleDanger(danger: LocationDanger) {
  const playerPower = gameStore.playerPower
  const success = playerPower > danger.power * 0.8 && Math.random() < playerPower / (danger.power * 1.5)
  
  if (success) {
    const rewards = danger.rewards || []
    for (const reward of rewards) {
      gameStore.addItem(reward.item, reward.count)
    }
    gameStore.addExp(danger.power)
    
    lastResult.value = {
      success: true,
      message: `你成功击退了${danger.name}！`,
      effects: {
        exp: danger.power,
        items: rewards.map(r => ({ id: r.item, count: r.count }))
      }
    }
  } else {
    const damage = Math.floor(danger.power * 0.5)
    gameStore.modifyHealth(-damage)
    
    lastResult.value = {
      success: false,
      message: `你被${danger.name}击败，受了${damage}点伤害`,
      effects: { health: -damage }
    }
  }
}

async function gatherResource() {
  if (isGathering.value) return
  
  const location = currentLocation.value
  if (!location?.resources?.length) {
    lastResult.value = {
      success: false,
      message: '这里没有可采集的资源',
      effects: {}
    }
    return
  }
  
  isGathering.value = true
  
  const resource = location.resources[Math.floor(Math.random() * location.resources.length)]
  const luck = gameStore.player.stats.luck
  const result = calculateGatherResult(location.id, resource.type, luck)
  
  gameStore.advanceTime()
  
  if (result.success) {
    gameStore.addItem(resource.type, result.amount)
    
    lastResult.value = {
      success: true,
      message: `采集成功！获得 ${getResourceLabel(resource.type)} x${result.amount}`,
      effects: { items: [{ id: resource.type, count: result.amount }] }
    }
    
    checkRandomEvent()
  } else {
    lastResult.value = {
      success: false,
      message: '采集失败，什么也没找到',
      effects: {}
    }
  }
  
  isGathering.value = false
}

async function exploreArea() {
  if (isExploring.value) return
  
  isExploring.value = true
  gameStore.advanceTime()
  
  const location = currentLocation.value
  const expGain = Math.floor(20 * (location?.tier || 1) * gameStore.cultivationBonus)
  gameStore.addExp(expGain)
  
  const danger = rollDanger(location?.id || '')
  if (danger && Math.random() < 0.3) {
    await handleDanger(danger)
  } else {
    checkRandomEvent()
    
    if (!currentEvent.value) {
      lastResult.value = {
        success: true,
        message: `探索完成，获得 ${expGain} 经验`,
        effects: { exp: expGain }
      }
    }
  }
  
  isExploring.value = false
}

async function meditateHere() {
  if (isMeditating.value) return
  
  isMeditating.value = true
  gameStore.advanceTime()
  
  const expGain = Math.floor(30 * gameStore.cultivationBonus)
  const spiritGain = Math.floor(20 * gameStore.world.spiritDensity)
  
  gameStore.addExp(expGain)
  gameStore.modifySpirit(spiritGain)
  
  lastResult.value = {
    success: true,
    message: `冥想结束，获得 ${expGain} 经验，恢复 ${spiritGain} 灵力`,
    effects: { exp: expGain, spirit: spiritGain }
  }
  
  isMeditating.value = false
}

function checkRandomEvent() {
  const inventory = gameStore.inventoryItems.reduce((acc, item) => {
    acc[item.itemId] = item.count
    return acc
  }, {} as Record<string, number>)
  
  const availableEvents = getAvailableEvents(
    gameStore.player.location,
    gameStore.player.realm.name,
    gameStore.world.day,
    inventory,
    gameStore.world.triggeredEvents
  )
  
  const event = rollEvent(availableEvents)
  if (event) {
    currentEvent.value = event
    gameStore.triggerEvent(event.id)
  }
}

function isChoiceAvailable(choice: EventChoice): boolean {
  if (!choice.requirements) return true
  
  const player = gameStore.player
  
  if (choice.requirements.attribute) {
    for (const [attr, value] of Object.entries(choice.requirements.attribute)) {
      if (attr === 'health' && player.health < value) return false
      if (attr === 'spirit' && player.spirit < value) return false
    }
  }
  
  if (choice.requirements.item) {
    for (const [item, count] of Object.entries(choice.requirements.item)) {
      if (gameStore.getItemCount(item) < count) return false
    }
  }
  
  if (choice.requirements.realm) {
    if (!choice.requirements.realm.includes(player.realm.name)) return false
  }
  
  return true
}

async function makeChoice(choice: EventChoice) {
  if (!currentEvent.value || isResolving.value) return
  
  isResolving.value = true
  
  const success = choice.successRate ? Math.random() < choice.successRate : true
  const effects = choice.effects
  
  if (success && effects) {
    if (effects.exp) gameStore.addExp(effects.exp)
    if (effects.health) gameStore.modifyHealth(effects.health)
    if (effects.spirit) gameStore.modifySpirit(effects.spirit)
    
    if (effects.item) {
      for (const [itemId, count] of Object.entries(effects.item)) {
        if (count > 0) {
          gameStore.addItem(itemId, count)
        } else {
          gameStore.removeItem(itemId, -count)
        }
      }
    }
    
    if (effects.unlockLocation) {
      gameStore.moveTo(effects.unlockLocation)
    }
  } else if (!success && effects) {
    if (effects.health) gameStore.modifyHealth(-Math.abs(effects.health) || -10)
  }
  
  lastResult.value = {
    success,
    message: success ? (choice.successText || '成功！') : (choice.failText || '失败...'),
    effects: success ? {
      exp: effects?.exp,
      health: effects?.health,
      spirit: effects?.spirit
    } : { health: -10 }
  }
  
  currentEvent.value = null
  isResolving.value = false
}

function closeResult() {
  lastResult.value = null
}
</script>

<style scoped>
.explore-view {
  padding: 1.5rem;
  overflow-y: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.explore-header {
  margin-bottom: 0.5rem;
}

.view-title {
  font-family: var(--font-title);
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
}

.view-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.current-section {
  padding: 1rem;
}

.current-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.current-icon {
  font-size: 2rem;
}

.current-info {
  flex: 1;
}

.current-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-bottom: 0.125rem;
}

.current-name {
  font-family: var(--font-title);
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-gold);
}

.current-actions {
  display: flex;
  gap: 0.5rem;
}

.current-actions .btn {
  flex: 1;
}

.destinations-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.section-header {
  margin-bottom: 0.75rem;
}

.section-title {
  font-family: var(--font-title);
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text-primary);
}

.locations-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  overflow-y: auto;
}

.location-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem;
  background: linear-gradient(135deg, var(--color-bg-card), var(--color-bg-secondary));
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.location-card:hover {
  border-color: var(--color-gold-dark);
  transform: translateY(-2px);
}

.location-card.selected {
  border-color: var(--color-gold);
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), var(--color-bg-secondary));
}

.loc-icon {
  font-size: 1.5rem;
}

.loc-info {
  flex: 1;
}

.loc-name {
  font-family: var(--font-title);
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
}

.loc-meta {
  display: flex;
  gap: 0.5rem;
  font-size: var(--font-size-xs);
}

.loc-type {
  color: var(--color-text-muted);
}

.loc-tier {
  color: var(--color-gold);
}

.undiscovered-mask {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(10, 10, 15, 0.85);
  border-radius: var(--radius-lg);
  font-size: 1.5rem;
  color: var(--color-text-muted);
}

.location-detail {
  padding: 1rem;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.detail-icon {
  font-size: 2rem;
}

.detail-title-section {
  flex: 1;
}

.detail-title {
  font-family: var(--font-title);
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 0.125rem;
}

.detail-type {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.detail-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.detail-info {
  margin-bottom: 0.75rem;
}

.info-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-bottom: 0.375rem;
}

.info-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.tag {
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
}

.tag.resource {
  background-color: rgba(74, 222, 128, 0.15);
  color: var(--color-jade);
}

.tag.danger {
  background-color: rgba(239, 68, 68, 0.15);
  color: var(--color-red);
}

.travel-btn {
  width: 100%;
  margin-top: 0.5rem;
}

.event-modal,
.result-modal {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(10, 10, 15, 0.9);
  z-index: 100;
}

.event-content,
.result-content {
  max-width: 400px;
  width: 90%;
  padding: 1.5rem;
}

.event-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.event-icon {
  font-size: 2rem;
}

.event-title {
  font-family: var(--font-title);
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text-primary);
}

.event-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.event-choices {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.choice-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
}

.choice-text {
  flex: 1;
}

.choice-rate {
  font-size: var(--font-size-xs);
  color: var(--color-gold);
}

.result-content {
  text-align: center;
}

.result-icon {
  font-size: 3rem;
  margin-bottom: 0.75rem;
}

.result-title {
  font-family: var(--font-title);
  font-size: var(--font-size-xl);
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.result-content.success .result-title {
  color: var(--color-success);
}

.result-content.fail .result-title {
  color: var(--color-danger);
}

.result-message {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
}

.result-effects {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.effect {
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
}

.effect.exp {
  background-color: rgba(212, 175, 55, 0.15);
  color: var(--color-gold);
}

.effect.health {
  background-color: rgba(239, 68, 68, 0.15);
  color: var(--color-red);
}

.effect.spirit {
  background-color: rgba(96, 165, 250, 0.15);
  color: var(--color-blue);
}
</style>
