<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'
import EventCard from '@/components/game/EventCard.vue'
import StatusBar from '@/components/game/StatusBar.vue'
import type { GameEvent, PlayerAttributes, AttributeChange } from '@/types/events'
import { gameEvents } from '../../../data/gameEvents'

const router = useRouter()
const gameStore = useGameStore()

const currentEvent = ref<GameEvent | null>(null)
const isProcessing = ref(false)
const recentChanges = ref<AttributeChange[]>([])
const eventHistory = ref<string[]>([])

const playerAttributes = computed<PlayerAttributes>(() => ({
  health: gameStore.player.health,
  maxHealth: gameStore.player.maxHealth,
  spirit: gameStore.player.spirit,
  maxSpirit: gameStore.player.maxSpirit,
  cultivationExp: gameStore.player.realm?.exp || 0,
  cultivationLevel: gameStore.player.cultivationLevel || gameStore.player.realm?.level || 0,
  reputation: Object.values(gameStore.player.reputation || {}).reduce((a, b) => a + b, 0) || 50,
  wealth: gameStore.player.wealth || 100,
  karma: gameStore.player.karma || 0,
  insight: gameStore.player.insight || 10,
  virtue: gameStore.player.virtue || 50,
  demonic: gameStore.player.demonic || 0
}))

function getRandomEvent(): GameEvent {
  const availableEvents = gameEvents.filter(e => !eventHistory.value.includes(e.id))
  
  if (availableEvents.length === 0) {
    eventHistory.value = []
    return gameEvents[Math.floor(Math.random() * gameEvents.length)]
  }
  
  return availableEvents[Math.floor(Math.random() * availableEvents.length)]
}

function loadNextEvent() {
  currentEvent.value = getRandomEvent()
  recentChanges.value = []
}

async function handleChoice(choiceId: string) {
  if (!currentEvent.value || isProcessing.value) return
  
  isProcessing.value = true
  const choice = currentEvent.value.choices.find(c => c.id === choiceId)
  
  if (!choice) {
    isProcessing.value = false
    return
  }
  
  eventHistory.value.push(currentEvent.value.id)
  
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const changes: AttributeChange[] = []
  
  for (const effect of choice.effects) {
    const change = applyEffect(effect)
    if (change) {
      changes.push(change)
    }
  }
  
  recentChanges.value = changes
  
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  isProcessing.value = false
  loadNextEvent()
}

function applyEffect(effect: { type: string; value: number | string }): AttributeChange | null {
  const oldValue: Record<string, number> = {
    health: gameStore.player.health,
    spirit: gameStore.player.spirit,
    cultivationExp: gameStore.player.realm?.exp || 0,
    reputation: gameStore.player.reputation || 50,
    wealth: gameStore.player.wealth || 100,
    karma: gameStore.player.karma || 0,
    insight: gameStore.player.insight || 10
  }
  
  switch (effect.type) {
    case 'health':
      gameStore.player.health = Math.max(0, Math.min(
        gameStore.player.maxHealth,
        gameStore.player.health + (effect.value as number)
      ))
      break
    case 'spirit':
      gameStore.player.spirit = Math.max(0, Math.min(
        gameStore.player.maxSpirit,
        gameStore.player.spirit + (effect.value as number)
      ))
      break
    case 'cultivation_exp':
      gameStore.addExp(effect.value as number)
      break
    case 'reputation':
      gameStore.player.reputation = (gameStore.player.reputation || 50) + (effect.value as number)
      break
    case 'wealth':
      gameStore.player.wealth = (gameStore.player.wealth || 100) + (effect.value as number)
      break
    case 'karma':
      gameStore.player.karma = (gameStore.player.karma || 0) + (effect.value as number)
      break
    case 'insight':
      gameStore.player.insight = (gameStore.player.insight || 10) + (effect.value as number)
      break
    case 'time_advance':
      gameStore.advanceTime()
      break
  }
  
  const key = effect.type as keyof typeof oldValue
  if (key in oldValue) {
    return {
      type: key,
      oldValue: oldValue[key],
      newValue: gameStore.player[key as keyof typeof gameStore.player] as number || oldValue[key],
      change: effect.value as number
    }
  }
  
  return null
}

function goBack() {
  router.push('/')
}

onMounted(() => {
  loadNextEvent()
})
</script>

<template>
  <div class="reigns-game-layout">
    <div class="top-bar">
      <button class="back-btn" @click="goBack" title="返回主菜单">
        <span>← 返回</span>
      </button>
      
      <div class="player-name">
        {{ gameStore.player.name || '无名修士' }}
      </div>
      
      <div class="time-display">
        <span class="time-text">第{{ gameStore.world.day }}天</span>
      </div>
    </div>
    
    <StatusBar :attributes="playerAttributes" :recent-changes="recentChanges" />
    
    <main class="game-main">
      <div v-if="currentEvent" class="event-container">
        <EventCard 
          :event="currentEvent"
          :processing="isProcessing"
          @choice="handleChoice"
        />
      </div>
      
      <div v-else class="loading-container">
        <div class="loading-text">正在生成事件...</div>
      </div>
    </main>
    
    <div class="bottom-bar">
      <div class="hint-text">
        <span class="hint-icon">💡</span>
        <span>滑动卡片或点击左右按钮做出选择</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reigns-game-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: 
    radial-gradient(ellipse at 20% 20%, rgba(212, 175, 55, 0.03) 0%, transparent 40%),
    radial-gradient(ellipse at 80% 80%, rgba(64, 160, 128, 0.02) 0%, transparent 40%),
    radial-gradient(ellipse at 50% 50%, rgba(128, 96, 192, 0.01) 0%, transparent 60%),
    var(--color-bg-primary);
  position: relative;
  overflow: hidden;
}

.reigns-game-layout::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.015;
  pointer-events: none;
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  background: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border);
}

.back-btn {
  padding: 0.5rem 1rem;
  background: var(--color-bg-tertiary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.3s;
}

.back-btn:hover {
  border-color: var(--color-gold);
  color: var(--color-gold);
}

.player-name {
  font-family: var(--font-title);
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-gold);
}

.time-display {
  padding: 0.5rem 1rem;
  background: var(--color-bg-tertiary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.time-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.game-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.event-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-text {
  font-family: var(--font-title);
  font-size: var(--font-size-xl);
  color: var(--color-text-muted);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.bottom-bar {
  padding: 1rem;
  background: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: center;
}

.hint-text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.hint-icon {
  font-size: 1rem;
}
</style>
