<script setup lang="ts">
import { computed } from 'vue'
import { useGameSystemStore } from '@/stores/gameSystem'

const gameStore = useGameSystemStore()

const playerInfo = computed(() => gameStore.playerData)
const cultivation = computed(() => gameStore.playerData.cultivation)
const resources = computed(() => gameStore.playerData.resources)
</script>

<template>
  <div class="player-panel">
    <div class="panel-section">
      <h3 class="section-title">👤 修士信息</h3>
      <div class="info-grid">
        <div class="info-item">
          <span class="label">道号</span>
          <span class="value">{{ playerInfo.name || '无名修士' }}</span>
        </div>
        <div class="info-item">
          <span class="label">境界</span>
          <span class="value realm">{{ cultivation.realm.name }}</span>
        </div>
        <div class="info-item">
          <span class="label">阶段</span>
          <span class="value">{{ cultivation.realm.stage }}层</span>
        </div>
        <div class="info-item">
          <span class="label">寿命</span>
          <span class="value">{{ cultivation.lifespan }}/{{ cultivation.maxLifespan }}</span>
        </div>
      </div>
      
      <div class="exp-bar">
        <div class="exp-label">
          <span>修为</span>
          <span>{{ cultivation.realm.exp }}/{{ cultivation.realm.expToNext }}</span>
        </div>
        <div class="progress-bar">
          <div 
            class="progress-fill cultivation"
            :style="{ width: `${(cultivation.realm.exp / cultivation.realm.expToNext) * 100}%` }"
          ></div>
        </div>
      </div>
    </div>
    
    <div class="panel-section">
      <h3 class="section-title">💎 资源</h3>
      <div class="resource-list">
        <div class="resource-item">
          <span class="resource-icon">💎</span>
          <span class="resource-name">灵石</span>
          <span class="resource-value">{{ resources.spiritStones }}</span>
        </div>
        
        <div class="resource-item">
          <span class="resource-icon">✨</span>
          <span class="resource-name">灵气</span>
          <span class="resource-value">{{ resources.spiritEnergy }}/{{ resources.maxSpiritEnergy }}</span>
        </div>
        
        <div class="progress-bar small">
          <div 
            class="progress-fill spirit"
            :style="{ width: `${(resources.spiritEnergy / resources.maxSpiritEnergy) * 100}%` }"
          ></div>
        </div>
        
        <div class="resource-item">
          <span class="resource-icon">🌿</span>
          <span class="resource-name">材料</span>
          <span class="resource-value">{{ resources.materials.length }}种</span>
        </div>
        
        <div class="resource-item">
          <span class="resource-icon">💊</span>
          <span class="resource-name">丹药</span>
          <span class="resource-value">{{ resources.pills.length }}种</span>
        </div>
        
        <div class="resource-item">
          <span class="resource-icon">⚔️</span>
          <span class="resource-name">法宝</span>
          <span class="resource-value">{{ resources.artifacts.length }}件</span>
        </div>
      </div>
    </div>
    
    <div class="panel-section">
      <h3 class="section-title">📜 功法</h3>
      <div class="technique-list">
        <div 
          v-for="tech in cultivation.techniques"
          :key="tech.id"
          class="technique-item"
        >
          <div class="tech-header">
            <span class="tech-icon">{{ tech.icon }}</span>
            <span class="tech-name">{{ tech.name }}</span>
            <span class="tech-type">{{ tech.type === 'main' ? '主修' : '辅修' }}</span>
          </div>
          <div class="tech-level">
            Lv.{{ tech.level }}/{{ tech.maxLevel }}
          </div>
          <div class="progress-bar small">
            <div 
              class="progress-fill technique"
              :style="{ width: `${(tech.exp / tech.expToNext) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="panel-section">
      <h3 class="section-title">📊 属性</h3>
      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-label">修炼速度</span>
          <span class="stat-value">{{ (cultivation.cultivationSpeed * 100).toFixed(0) }}%</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">突破概率</span>
          <span class="stat-value">{{ (cultivation.breakthroughChance * 100).toFixed(0) }}%</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">灵气回复</span>
          <span class="stat-value">{{ resources.spiritEnergyRegen }}/天</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.player-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: var(--color-bg-secondary);
}

.panel-section {
  background: var(--color-bg-tertiary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1rem;
}

.section-title {
  font-family: var(--font-title);
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-gold);
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-border);
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.375rem 0;
}

.info-item .label {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.info-item .value {
  font-family: var(--font-title);
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  font-weight: 500;
}

.info-item .value.realm {
  color: var(--color-gold);
  font-weight: 600;
}

.exp-bar {
  margin-top: 0.75rem;
}

.exp-label {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-bottom: 0.25rem;
}

.progress-bar {
  height: 8px;
  background: var(--color-bg-primary);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.progress-bar.small {
  height: 4px;
}

.progress-fill {
  height: 100%;
  transition: width 0.3s;
}

.progress-fill.cultivation {
  background: linear-gradient(90deg, var(--color-gold-dark), var(--color-gold));
}

.progress-fill.spirit {
  background: linear-gradient(90deg, #4a9eff, #7bb8ff);
}

.progress-fill.technique {
  background: linear-gradient(90deg, #9b59b6, #c39bd3);
}

.resource-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.resource-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0;
}

.resource-icon {
  font-size: 1rem;
}

.resource-name {
  flex: 1;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.resource-value {
  font-family: var(--font-title);
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  font-weight: 500;
}

.technique-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.technique-item {
  padding: 0.5rem;
  background: var(--color-bg-secondary);
  border-radius: var(--radius-md);
}

.tech-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.tech-icon {
  font-size: 1rem;
}

.tech-name {
  flex: 1;
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  font-weight: 500;
}

.tech-type {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  padding: 0.125rem 0.375rem;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-sm);
}

.tech-level {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-bottom: 0.25rem;
}

.stats-grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.375rem 0;
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.stat-value {
  font-family: var(--font-title);
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  font-weight: 500;
}
</style>
