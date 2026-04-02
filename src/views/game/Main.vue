<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'
import { ScrollCard, SealButton } from '@/components/scroll'

const router = useRouter()
const gameStore = useGameStore()

const currentLocation = computed(() => {
  const locations: Record<string, { name: string; icon: string; description: string; resources?: { type: string; abundance: number }[] }> = {
    'qingyun-mountain': { 
      name: '青云山', 
      icon: '⛰️', 
      description: '青云宗所在之地，灵气充裕，山势险峻，云雾缭绕。此处常有修士往来，也有不少灵兽出没。',
      resources: [
        { type: 'herb', abundance: 0.7 },
        { type: 'ore', abundance: 0.5 },
        { type: 'spirit_stone', abundance: 0.3 }
      ]
    },
    'default': { 
      name: '未知之地', 
      icon: '❓', 
      description: '一片神秘的区域，充满了未知的危险与机遇...',
      resources: []
    }
  }
  return locations[gameStore.player.location] || locations['default']
})

const isGathering = ref(false)
const isMeditating = ref(false)

const mainActions = [
  { id: 'explore', icon: '🗺️', title: '探索', desc: '前往新地点' },
  { id: 'cultivation', icon: '🧘', title: '修炼', desc: '提升境界' },
  { id: 'inventory', icon: '🎒', title: '背包', desc: '物品装备' },
  { id: 'crafting', icon: '⚗️', title: '炼制', desc: '炼丹炼器' },
  { id: 'buildings', icon: '🏛️', title: '洞府', desc: '建设居所' },
  { id: 'world', icon: '🌍', title: '世界', desc: '查看世界' }
]

const quickActions = [
  { id: 'gather', icon: '🌿', title: '采集', variant: 'primary' as const },
  { id: 'meditate', icon: '✨', title: '冥想', variant: 'default' as const },
  { id: 'rest', icon: '💤', title: '休息', variant: 'default' as const },
  { id: 'observe', icon: '👁️', title: '观察', variant: 'default' as const }
]

function handleAction(actionId: string) {
  switch (actionId) {
    case 'explore':
      router.push('/game/explore')
      break
    case 'cultivation':
      router.push('/game/cultivation')
      break
    case 'inventory':
      router.push('/game/inventory')
      break
    case 'crafting':
      router.push('/game/crafting')
      break
    case 'buildings':
      router.push('/game/buildings')
      break
    case 'world':
      router.push('/game/world')
      break
    case 'gather':
      gather()
      break
    case 'meditate':
      meditate()
      break
    case 'rest':
      rest()
      break
    case 'observe':
      observe()
      break
  }
}

function rest() {
  const healthBefore = gameStore.player.health
  const spiritBefore = gameStore.player.spirit
  
  gameStore.player.health = gameStore.player.maxHealth
  gameStore.player.spirit = gameStore.player.maxSpirit
  gameStore.advanceTime()
  
  gameStore.addEvent({
    id: `rest_${Date.now()}`,
    title: '休息',
    description: `生命 +${gameStore.player.maxHealth - healthBefore}，灵力 +${gameStore.player.maxSpirit - spiritBefore}`,
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
  
  const resourceNames: Record<string, string> = {
    herb: '灵草',
    ore: '矿石',
    spirit_stone: '下品灵石'
  }
  
  gameStore.addEvent({
    id: `gather_${Date.now()}`,
    title: '采集成功',
    description: `获得 ${resourceNames[resource.type] || resource.type} x${gatherCount}`,
    type: 'discovery',
    choices: [],
    timestamp: Date.now()
  })
  
  isGathering.value = false
}

async function meditate() {
  if (isMeditating.value) return
  
  isMeditating.value = true
  
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  const expGain = Math.floor(Math.random() * 20) + 10
  gameStore.addExp(expGain)
  
  gameStore.addEvent({
    id: `meditate_${Date.now()}`,
    title: '冥想感悟',
    description: `修为 +${expGain}`,
    type: 'cultivation',
    choices: [],
    timestamp: Date.now()
  })
  
  isMeditating.value = false
}

function observe() {
  const observations = [
    '你注意到远处有一道灵光闪过',
    '空气中弥漫着淡淡的药香',
    '地面上有一些奇怪的脚印',
    '你感受到附近有灵气波动',
    '隐约听到远处传来兽吼'
  ]
  
  const observation = observations[Math.floor(Math.random() * observations.length)]
  
  gameStore.addEvent({
    id: `observe_${Date.now()}`,
    title: '观察四周',
    description: observation,
    type: 'story',
    choices: [],
    timestamp: Date.now()
  })
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
  if (abundance >= 0.7) return '丰富'
  if (abundance >= 0.4) return '一般'
  return '稀少'
}
</script>

<template>
  <div class="scroll-main-view">
    <div class="content-area">
      <div class="top-section">
        <ScrollCard variant="gold" class="location-card">
          <div class="location-header">
            <span class="location-icon">{{ currentLocation.icon }}</span>
            <div class="location-info">
              <h2 class="location-title">{{ currentLocation.name }}</h2>
              <p class="location-desc">{{ currentLocation.description }}</p>
            </div>
          </div>
          
          <div v-if="currentLocation.resources?.length" class="location-resources">
            <div class="resources-label">此地资源</div>
            <div class="resources-tags">
              <span 
                v-for="resource in currentLocation.resources" 
                :key="resource.type"
                class="resource-tag"
              >
                <span class="tag-icon">{{ getResourceIcon(resource.type) }}</span>
                <span class="tag-name">{{ getResourceName(resource.type) }}</span>
                <span class="tag-abundance" :class="{
                  'abundance-high': resource.abundance >= 0.7,
                  'abundance-medium': resource.abundance >= 0.4 && resource.abundance < 0.7,
                  'abundance-low': resource.abundance < 0.4
                }">{{ getAbundanceText(resource.abundance) }}</span>
              </span>
            </div>
          </div>
        </ScrollCard>
      </div>

      <div class="middle-section">
        <div class="section-header">
          <h3 class="section-title">主要行动</h3>
        </div>
        
        <div class="actions-grid">
          <div 
            v-for="action in mainActions" 
            :key="action.id"
            class="action-item"
            @click="handleAction(action.id)"
          >
            <SealButton size="lg" variant="default">
              {{ action.title }}
            </SealButton>
            <div class="action-label">{{ action.desc }}</div>
          </div>
        </div>
      </div>

      <div class="bottom-section">
        <div class="section-header">
          <h3 class="section-title">快速行动</h3>
        </div>
        
        <div class="quick-actions">
          <div 
            v-for="action in quickActions" 
            :key="action.id"
            class="quick-item"
            @click="handleAction(action.id)"
          >
            <SealButton 
              size="md" 
              :variant="action.variant"
              :loading="isGathering && action.id === 'gather' || isMeditating && action.id === 'meditate'"
              :disabled="isGathering && action.id === 'gather' || isMeditating && action.id === 'meditate'"
            >
              {{ action.title }}
            </SealButton>
          </div>
        </div>
      </div>

      <div class="status-section">
        <ScrollCard variant="light" class="status-card">
          <div class="status-grid">
            <div class="status-item">
              <span class="status-icon">❤️</span>
              <div class="status-info">
                <div class="status-label">生命</div>
                <div class="status-value">{{ gameStore.player.health }}/{{ gameStore.player.maxHealth }}</div>
              </div>
            </div>
            
            <div class="status-divider"></div>
            
            <div class="status-item">
              <span class="status-icon">💫</span>
              <div class="status-info">
                <div class="status-label">灵力</div>
                <div class="status-value">{{ gameStore.player.spirit }}/{{ gameStore.player.maxSpirit }}</div>
              </div>
            </div>
            
            <div class="status-divider"></div>
            
            <div class="status-item">
              <span class="status-icon">⭐</span>
              <div class="status-info">
                <div class="status-label">修为</div>
                <div class="status-value">{{ gameStore.player.realm?.exp || 0 }}</div>
              </div>
            </div>
          </div>
        </ScrollCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scroll-main-view {
  height: 100%;
  overflow-y: auto;
  padding: 1.5rem;
}

.content-area {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.top-section {
  margin-bottom: 0.5rem;
}

.location-card {
  width: 100%;
}

.location-header {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.location-icon {
  font-size: 4rem;
  flex-shrink: 0;
}

.location-info {
  flex: 1;
}

.location-title {
  font-family: var(--font-title);
  font-size: var(--font-size-2xl);
  font-weight: 600;
  color: var(--color-gold);
  margin-bottom: 0.75rem;
}

.location-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.8;
}

.location-resources {
  padding-top: 1rem;
  border-top: 1px dashed var(--color-border-accent);
}

.resources-label {
  font-family: var(--font-title);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin-bottom: 0.75rem;
}

.resources-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.resource-tag {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.875rem;
  background: var(--color-bg-tertiary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.tag-icon {
  font-size: 1rem;
}

.tag-name {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}

.tag-abundance {
  font-size: var(--font-size-xs);
  padding: 0.125rem 0.5rem;
  border-radius: var(--radius-sm);
}

.abundance-high {
  background: rgba(64, 160, 128, 0.2);
  color: var(--color-jade-light);
}

.abundance-medium {
  background: rgba(212, 175, 55, 0.2);
  color: var(--color-gold);
}

.abundance-low {
  background: rgba(192, 64, 64, 0.2);
  color: var(--color-red-light);
}

.section-header {
  margin-bottom: 1rem;
  text-align: center;
}

.section-title {
  font-family: var(--font-title);
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text-accent);
  display: inline-block;
  padding: 0 2rem;
  position: relative;
}

.section-title::before,
.section-title::after {
  content: '—';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-border-accent);
}

.section-title::before {
  left: 0;
}

.section-title::after {
  right: 0;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  justify-items: center;
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.action-label {
  font-family: var(--font-title);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  text-align: center;
}

.quick-actions {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.quick-item {
  cursor: pointer;
}

.status-card {
  width: 100%;
}

.status-grid {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
}

.status-icon {
  font-size: 1.75rem;
}

.status-info {
  text-align: center;
}

.status-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-bottom: 0.25rem;
}

.status-value {
  font-family: var(--font-title);
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text-primary);
}

.status-divider {
  width: 1px;
  height: 40px;
  background: var(--color-border);
}

@media (max-width: 1024px) {
  .actions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .actions-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .quick-actions {
    gap: 1rem;
  }
  
  .status-grid {
    flex-direction: column;
    gap: 1rem;
  }
  
  .status-divider {
    display: none;
  }
}
</style>
