<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()

const player = computed(() => gameStore.player)

const resources = computed(() => [
  { 
    id: 'spirit_stone', 
    icon: '💎', 
    label: '灵石', 
    value: player.value.spiritStones || 0,
    color: 'var(--color-gold)'
  },
  { 
    id: 'gold', 
    icon: '🪙', 
    label: '黄金', 
    value: player.value.gold || 0,
    color: 'var(--color-gold-light)'
  },
  { 
    id: 'contribution', 
    icon: '⭐', 
    label: '贡献', 
    value: player.value.contribution || 0,
    color: 'var(--color-jade)'
  }
])

const timeInfo = computed(() => {
  const time = gameStore.gameTime
  return {
    year: time?.year || 1,
    month: time?.month || 1,
    day: time?.day || 1,
    hour: time?.hour || 6,
    season: getSeason(time?.month || 1),
    weather: gameStore.weather || '晴'
  }
})

function getSeason(month: number): string {
  if (month >= 1 && month <= 3) return '春'
  if (month >= 4 && month <= 6) return '夏'
  if (month >= 7 && month <= 9) return '秋'
  return '冬'
}
</script>

<template>
  <header class="resource-bar">
    <div class="resource-section">
      <div 
        v-for="resource in resources" 
        :key="resource.id"
        class="resource-item"
      >
        <span class="resource-icon">{{ resource.icon }}</span>
        <span class="resource-value" :style="{ color: resource.color }">
          {{ resource.value.toLocaleString() }}
        </span>
      </div>
    </div>

    <div class="time-section">
      <div class="time-display">
        <span class="time-icon">📅</span>
        <span class="time-text">
          第{{ timeInfo.year }}年 {{ timeInfo.month }}月{{ timeInfo.day }}日
        </span>
        <span class="time-hour">{{ timeInfo.hour }}时</span>
      </div>
      <div class="weather-display">
        <span class="season">{{ timeInfo.season }}</span>
        <span class="weather">{{ timeInfo.weather }}</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.resource-bar {
  position: fixed;
  top: 0;
  left: 60px;
  right: 0;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  background: linear-gradient(180deg, var(--color-bg-secondary), transparent);
  border-bottom: 1px solid var(--color-border);
  z-index: 50;
}

.resource-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.resource-item {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.resource-icon {
  font-size: 1rem;
}

.resource-value {
  font-size: var(--font-size-sm);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.time-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.time-display {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.time-icon {
  font-size: 1rem;
}

.time-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.time-hour {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  padding: 0.125rem 0.5rem;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-sm);
}

.weather-display {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.season {
  font-size: var(--font-size-sm);
  color: var(--color-jade);
  padding: 0.125rem 0.5rem;
  background: rgba(64, 160, 128, 0.15);
  border-radius: var(--radius-sm);
}

.weather {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}
</style>
