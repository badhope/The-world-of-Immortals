<template>
  <div class="main-view">
    <div class="welcome-section card">
      <div class="welcome-header">
        <span class="welcome-icon">{{ currentLocation?.icon || '🏠' }}</span>
        <div class="welcome-text">
          <h2 class="welcome-title">{{ currentLocation?.name || '未知之地' }}</h2>
          <p class="welcome-desc">{{ currentLocation?.description || '一片神秘的区域...' }}</p>
        </div>
      </div>
    </div>
    
    <div class="action-grid">
      <div class="action-card" @click="goExplore">
        <div class="card-glow"></div>
        <div class="action-icon">🗺️</div>
        <div class="action-content">
          <div class="action-title">探索世界</div>
          <div class="action-desc">前往新地点，发现奇遇</div>
        </div>
      </div>
      
      <div class="action-card" @click="goInventory">
        <div class="card-glow"></div>
        <div class="action-icon">🎒</div>
        <div class="action-content">
          <div class="action-title">背包</div>
          <div class="action-desc">查看物品与装备</div>
        </div>
      </div>
      
      <div class="action-card" @click="goCrafting">
        <div class="card-glow"></div>
        <div class="action-icon">⚗️</div>
        <div class="action-content">
          <div class="action-title">炼制</div>
          <div class="action-desc">炼丹炼器，提升实力</div>
        </div>
      </div>
      
      <div class="action-card" @click="goBuildings">
        <div class="card-glow"></div>
        <div class="action-icon">🏛️</div>
        <div class="action-content">
          <div class="action-title">洞府</div>
          <div class="action-desc">建设修炼之所</div>
        </div>
      </div>
      
      <div class="action-card" @click="goCultivation">
        <div class="card-glow"></div>
        <div class="action-icon">🧘</div>
        <div class="action-content">
          <div class="action-title">修炼</div>
          <div class="action-desc">提升境界，突破瓶颈</div>
        </div>
      </div>
      
      <div class="action-card" @click="rest">
        <div class="card-glow"></div>
        <div class="action-icon">💤</div>
        <div class="action-content">
          <div class="action-title">休息</div>
          <div class="action-desc">恢复生命与灵力</div>
        </div>
      </div>
    </div>
    
    <div class="quick-actions card">
      <div class="card-header">
        <h3 class="card-title">快速行动</h3>
      </div>
      <div class="quick-buttons">
        <button 
          class="btn btn-primary" 
          @click="gather" 
          :disabled="isGathering"
        >
          <span v-if="isGathering">采集中...</span>
          <span v-else>🌿 采集资源</span>
        </button>
        <button 
          class="btn" 
          @click="meditate" 
          :disabled="isMeditating"
        >
          <span v-if="isMeditating">冥想中...</span>
          <span v-else>✨ 冥想感悟</span>
        </button>
      </div>
    </div>
    
    <div class="player-overview card" v-if="currentLocation?.resources?.length">
      <div class="card-header">
        <h3 class="card-title">此地资源</h3>
      </div>
      <div class="resource-list">
        <div 
          v-for="resource in currentLocation.resources" 
          :key="resource.type" 
          class="resource-item"
        >
          <span class="resource-icon">{{ getResourceIcon(resource.type) }}</span>
          <span class="resource-name">{{ getResourceName(resource.type) }}</span>
          <span class="resource-abundance">{{ getAbundanceText(resource.abundance) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'
import { locations } from '../../../data/locations'
import { items } from '../../../data/items'

const router = useRouter()
const gameStore = useGameStore()

const currentLocation = computed(() => locations[gameStore.player.location])
const isGathering = ref(false)
const isMeditating = ref(false)

function goExplore() {
  router.push('/game/explore')
}

function goInventory() {
  router.push('/game/inventory')
}

function goCrafting() {
  router.push('/game/crafting')
}

function goBuildings() {
  router.push('/game/buildings')
}

function goCultivation() {
  router.push('/game/cultivation')
}

function rest() {
  gameStore.player.health = gameStore.player.maxHealth
  gameStore.player.spirit = gameStore.player.maxSpirit
  gameStore.advanceTime()
  
  gameStore.addEvent({
    id: `rest_${Date.now()}`,
    title: '休息',
    description: '你休息了一天，恢复了全部生命和灵力',
    type: 'story',
    choices: [],
    timestamp: Date.now()
  })
}

async function gather() {
  if (isGathering.value) return
  
  const location = currentLocation.value
  if (!location?.resources?.length) {
    gameStore.addEvent({
      id: `gather_fail_${Date.now()}`,
      title: '采集失败',
      description: '这里没有可采集的资源',
      type: 'story',
      choices: [],
      timestamp: Date.now()
    })
    return
  }
  
  isGathering.value = true
  
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const resource = location.resources[Math.floor(Math.random() * location.resources.length)]
  const gatherCount = Math.floor(Math.random() * 3) + 1
  
  const item = Object.values(items).find(i => i.id === resource.type || i.tags?.includes(resource.type))
  
  if (item) {
    gameStore.addItem(item.id, gatherCount)
    gameStore.addEvent({
      id: `gather_${Date.now()}`,
      title: '采集成功',
      description: `你采集到了 ${item.name} x${gatherCount}`,
      type: 'discovery',
      choices: [],
      timestamp: Date.now()
    })
  } else {
    gameStore.addItem('spirit_stone_low', gatherCount)
    gameStore.addEvent({
      id: `gather_${Date.now()}`,
      title: '采集成功',
      description: `你采集到了 下品灵石 x${gatherCount}`,
      type: 'discovery',
      choices: [],
      timestamp: Date.now()
    })
  }
  
  isGathering.value = false
}

async function meditate() {
  if (isMeditating.value) return
  
  isMeditating.value = true
  
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  const expGain = Math.floor(Math.random() * 20) + 10
  gameStore.addExp(expGain)
  
  gameStore.addEvent({
    id: `meditate_${Date.now()}`,
    title: '冥想感悟',
    description: `你进入冥想状态，获得了 ${expGain} 点修炼经验`,
    type: 'cultivation',
    choices: [],
    timestamp: Date.now()
  })
  
  isMeditating.value = false
}

function getResourceIcon(type: string): string {
  const icons: Record<string, string> = {
    herb: '🌿',
    ore: '💎',
    wood: '🪵',
    stone: '🪨',
    water: '💧',
    spirit_stone: '✨'
  }
  return icons[type] || '📦'
}

function getResourceName(type: string): string {
  const names: Record<string, string> = {
    herb: '灵草',
    ore: '矿石',
    wood: '灵木',
    stone: '灵石',
    water: '灵泉',
    spirit_stone: '灵石矿'
  }
  return names[type] || type
}

function getAbundanceText(abundance: number): string {
  if (abundance >= 0.8) return '丰富'
  if (abundance >= 0.5) return '一般'
  return '稀少'
}
</script>

<style scoped>
.main-view {
  padding: 1.5rem;
  overflow-y: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.welcome-section {
  padding: 1.25rem;
}

.welcome-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.welcome-icon {
  font-size: 2.5rem;
}

.welcome-text {
  flex: 1;
}

.welcome-title {
  font-family: var(--font-title);
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
}

.welcome-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.action-card {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.25rem 1rem;
  background: linear-gradient(135deg, var(--color-bg-card), var(--color-bg-secondary));
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: all var(--transition-normal);
  overflow: hidden;
}

.card-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(212, 175, 55, 0.1), transparent 70%);
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.action-card:hover {
  transform: translateY(-3px);
  border-color: var(--color-gold-dark);
  box-shadow: var(--shadow-glow);
}

.action-card:hover .card-glow {
  opacity: 1;
}

.action-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
  z-index: 1;
}

.action-content {
  text-align: center;
  z-index: 1;
}

.action-title {
  font-family: var(--font-title);
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
}

.action-desc {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.quick-actions {
  padding: 1rem;
}

.quick-actions .card-header {
  margin-bottom: 0.75rem;
}

.quick-actions .card-title {
  font-size: var(--font-size-base);
}

.quick-buttons {
  display: flex;
  gap: 0.75rem;
}

.quick-buttons .btn {
  flex: 1;
  padding: 0.625rem 1rem;
}

.player-overview {
  padding: 1rem;
}

.player-overview .card-header {
  margin-bottom: 0.75rem;
}

.player-overview .card-title {
  font-size: var(--font-size-base);
}

.resource-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.resource-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  background-color: var(--color-bg-tertiary);
  border-radius: var(--radius-sm);
}

.resource-icon {
  font-size: 1rem;
}

.resource-name {
  flex: 1;
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}

.resource-abundance {
  font-size: var(--font-size-xs);
  color: var(--color-gold);
}
</style>
