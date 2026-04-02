<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGameSystemStore } from '@/stores/gameSystem'
import PlayerPanel from '@/components/game/PlayerPanel.vue'
import MapView from '@/components/game/MapView.vue'
import CultivationView from '@/components/game/CultivationView.vue'
import CraftingView from '@/components/game/CraftingView.vue'

const router = useRouter()
const gameStore = useGameSystemStore()

const currentView = ref<'map' | 'cultivation' | 'crafting' | 'sect'>('map')

const viewNames = {
  map: '🗺️ 探索',
  cultivation: '🧘 修炼',
  crafting: '🔬 炼制',
  sect: '🏯 势力'
}

function goBack() {
  router.push('/')
}
</script>

<template>
  <div class="game-container">
    <div class="top-bar">
      <button class="back-btn" @click="goBack">
        ← 返回
      </button>
      
      <div class="time-info">
        <span class="year">第{{ gameStore.gameState.year }}年</span>
        <span class="month">{{ gameStore.gameState.month }}月</span>
        <span class="day">{{ gameStore.gameState.day }}日</span>
        <span class="season">{{ gameStore.gameState.season }}</span>
        <span class="phase">{{ getPhaseText(gameStore.gameState.phase) }}</span>
      </div>
      
      <div class="turn-info">
        <span class="turn-label">本月剩余回合</span>
        <span class="turn-value">{{ gameStore.gameState.turnsRemaining }}/{{ gameStore.gameState.maxTurnsPerMonth }}</span>
      </div>
    </div>
    
    <div class="main-content">
      <PlayerPanel class="left-panel" />
      
      <div class="center-area">
        <div class="view-tabs">
          <button
            v-for="(name, key) in viewNames"
            :key="key"
            :class="['tab-btn', { 'active': currentView === key }]"
            @click="currentView = key as any"
          >
            {{ name }}
          </button>
        </div>
        
        <div class="view-content">
          <MapView v-if="currentView === 'map'" />
          <CultivationView v-else-if="currentView === 'cultivation'" />
          <CraftingView v-else-if="currentView === 'crafting'" />
          <div v-else class="coming-soon">
            <h2>势力系统</h2>
            <p>即将推出...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
function getPhaseText(phase: string): string {
  const texts: Record<string, string> = {
    morning: '清晨',
    afternoon: '午后',
    evening: '傍晚',
    night: '深夜'
  }
  return texts[phase] || phase
}
</script>

<style scoped>
.game-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--color-bg-primary);
  padding: 2rem;
}

.top-bar {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  background: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border);
}

.back-btn {
  padding: 0.5rem 1rem;
  background: var(--color-bg-tertiary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  font-family: var(--font-title);
  cursor: pointer;
  transition: all 0.3s;
}

.back-btn:hover {
  border-color: var(--color-border-accent);
  color: var(--color-text-primary);
}

.time-info {
  display: flex;
  gap: 1rem;
  font-family: var(--font-title);
  color: var(--color-text-primary);
}

.time-info span {
  padding: 0.25rem 0.75rem;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
}

.year {
  color: var(--color-gold) !important;
  font-weight: 600;
}

.turn-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 1rem;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
}

.turn-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.turn-value {
  font-family: var(--font-title);
  font-size: var(--font-size-base);
  color: var(--color-gold);
  font-weight: 600;
}

.main-content {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.left-panel {
  width: 280px;
  flex-shrink: 0;
  border-right: 1px solid var(--color-border);
  overflow-y: auto;
}

.center-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.view-tabs {
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  background: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border);
}

.tab-btn {
  flex: 1;
  padding: 0.75rem 1.5rem;
  background: var(--color-bg-tertiary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  font-family: var(--font-title);
  font-size: var(--font-size-base);
  cursor: pointer;
  transition: all 0.3s;
}

.tab-btn:hover {
  border-color: var(--color-border-accent);
  color: var(--color-text-primary);
}

.tab-btn.active {
  background: linear-gradient(135deg, var(--color-gold-dark), var(--color-gold));
  border-color: var(--color-gold);
  color: var(--color-bg-primary);
  font-weight: 600;
}

.view-content {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

.coming-soon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--color-text-muted);
}

.coming-soon h2 {
  font-family: var(--font-title);
  font-size: 2rem;
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
}
</style>
