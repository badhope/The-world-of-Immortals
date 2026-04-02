<script setup lang="ts">
import { computed } from 'vue'
import { useGameSystemStore } from '@/stores/gameSystem'

const gameStore = useGameSystemStore()

const locations = computed(() => gameStore.mapLocations)
const currentLocation = computed(() => gameStore.currentLocation)

function canExplore(locationId: string): boolean {
  const location = locations.value.find(l => l.id === locationId)
  return location?.unlocked && 
         gameStore.playerData.resources.spiritEnergy >= 20 && 
         gameStore.gameState.turnsRemaining > 0
}

function explore(locationId: string) {
  if (!canExplore(locationId)) {
    if (gameStore.gameState.turnsRemaining <= 0) {
      alert('本月回合已用完，请等待下月！')
    }
    return
  }
  gameStore.exploreLocation(locationId)
}

function getDangerText(danger: number): string {
  if (danger === 0) return '安全'
  if (danger <= 2) return '低危'
  if (danger <= 4) return '中危'
  if (danger <= 6) return '高危'
  return '极危'
}

function getDangerColor(danger: number): string {
  if (danger === 0) return '#4caf50'
  if (danger <= 2) return '#8bc34a'
  if (danger <= 4) return '#ff9800'
  if (danger <= 6) return '#f44336'
  return '#9c27b0'
}
</script>

<template>
  <div class="map-view">
    <div class="map-header">
      <h2>🗺️ 世界地图</h2>
      <p class="current-location">
        当前位置: {{ currentLocation?.name || '未知' }}
      </p>
    </div>
    
    <div class="locations-grid">
      <div
        v-for="location in locations"
        :key="location.id"
        :class="['location-card', { 
          'locked': !location.unlocked,
          'current': location.id === gameStore.playerData.location,
          'discovered': location.discovered
        }]"
      >
        <div class="location-header">
          <span class="location-icon">{{ location.icon }}</span>
          <div class="location-info">
            <h3 class="location-name">{{ location.name }}</h3>
            <span class="location-type">{{ location.type }}</span>
          </div>
          <div 
            class="danger-badge"
            :style="{ backgroundColor: getDangerColor(location.danger) }"
          >
            {{ getDangerText(location.danger) }}
          </div>
        </div>
        
        <p class="location-desc">{{ location.description }}</p>
        
        <div v-if="location.discovered" class="location-details">
          <div class="detail-item">
            <span class="detail-label">区域:</span>
            <span class="detail-value">{{ location.region }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">等级:</span>
            <span class="detail-value">T{{ location.tier }}</span>
          </div>
          
          <div v-if="location.rewards.length > 0" class="rewards-section">
            <span class="rewards-label">可能获得:</span>
            <div class="rewards-list">
              <span 
                v-for="reward in location.rewards" 
                :key="reward.itemId || reward.type"
                class="reward-item"
              >
                {{ reward.itemName || reward.type }} ({{ (reward.chance * 100).toFixed(0) }}%)
              </span>
            </div>
          </div>
        </div>
        
        <div v-else class="undiscovered">
          <span>🔒 未发现</span>
        </div>
        
        <button
          v-if="location.unlocked && location.id !== gameStore.playerData.location"
          class="explore-btn"
          :disabled="!canExplore(location.id)"
          @click="explore(location.id)"
        >
          {{ canExplore(location.id) ? '探索 (消耗20灵气)' : '灵气不足' }}
        </button>
        
        <div v-if="!location.unlocked" class="locked-overlay">
          <span>🔒 需要探索相邻地点</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.map-view {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.map-header {
  margin-bottom: 1.5rem;
}

.map-header h2 {
  font-family: var(--font-title);
  font-size: 1.75rem;
  color: var(--color-gold);
  margin-bottom: 0.5rem;
}

.current-location {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
}

.locations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1rem;
  overflow-y: auto;
}

.location-card {
  background: var(--color-bg-secondary);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  transition: all 0.3s;
  position: relative;
}

.location-card.current {
  border-color: var(--color-gold);
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
}

.location-card.locked {
  opacity: 0.6;
}

.location-header {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.location-icon {
  font-size: 2rem;
}

.location-info {
  flex: 1;
}

.location-name {
  font-family: var(--font-title);
  font-size: var(--font-size-lg);
  color: var(--color-text-primary);
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.location-type {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  padding: 0.125rem 0.5rem;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-sm);
}

.danger-badge {
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  color: white;
  font-weight: 600;
}

.location-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin-bottom: 1rem;
}

.location-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--color-border);
}

.detail-item {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-sm);
}

.detail-label {
  color: var(--color-text-muted);
}

.detail-value {
  color: var(--color-text-primary);
  font-weight: 500;
}

.rewards-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.rewards-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.rewards-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.reward-item {
  font-size: var(--font-size-xs);
  padding: 0.25rem 0.5rem;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
}

.undiscovered {
  padding: 1rem;
  text-align: center;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.explore-btn {
  width: 100%;
  margin-top: 1rem;
  padding: 0.75rem;
  background: linear-gradient(135deg, var(--color-gold-dark), var(--color-gold));
  border: none;
  border-radius: var(--radius-md);
  color: var(--color-bg-primary);
  font-family: var(--font-title);
  font-size: var(--font-size-base);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.explore-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
}

.explore-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.locked-overlay {
  margin-top: 1rem;
  padding: 0.75rem;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
  text-align: center;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}
</style>
