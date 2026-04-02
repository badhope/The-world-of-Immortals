<template>
  <div class="pixel-status-panel">
    <div class="panel-header">
      <div class="player-avatar">🧙</div>
      <div class="player-info">
        <div class="player-name">{{ player.name || '修士' }}</div>
        <div class="player-realm">{{ cultivation.realmName }}</div>
      </div>
    </div>
    
    <div class="stats-section">
      <div class="stat-row">
        <span class="stat-label">❤️ 生命</span>
        <div class="pixel-health-bar">
          <div class="pixel-health-bar-fill" :style="{ width: `${(player.health / player.maxHealth) * 100}%` }"></div>
        </div>
        <span class="stat-value">{{ player.health }}/{{ player.maxHealth }}</span>
      </div>
      
      <div class="stat-row">
        <span class="stat-label">💧 灵气</span>
        <div class="pixel-health-bar">
          <div class="pixel-mana-bar-fill" :style="{ width: `${(player.spiritEnergy / player.maxSpiritEnergy) * 100}%` }"></div>
        </div>
        <span class="stat-value">{{ player.spiritEnergy }}/{{ player.maxSpiritEnergy }}</span>
      </div>
      
      <div class="stat-row">
        <span class="stat-label">⭐ 经验</span>
        <div class="pixel-health-bar">
          <div class="pixel-exp-bar-fill" :style="{ width: `${(cultivation.experience / cultivation.experienceToNext) * 100}%` }"></div>
        </div>
        <span class="stat-value">{{ cultivation.experience }}/{{ cultivation.experienceToNext }}</span>
      </div>
    </div>
    
    <div class="attributes-section">
      <div class="section-title">📊 属性</div>
      <div class="attributes-grid">
        <div class="attribute-item">
          <span class="attr-icon">⚔️</span>
          <span class="attr-name">攻击</span>
          <span class="attr-value">{{ player.attack || 10 }}</span>
        </div>
        <div class="attribute-item">
          <span class="attr-icon">🛡️</span>
          <span class="attr-name">防御</span>
          <span class="attr-value">{{ player.defense || 10 }}</span>
        </div>
        <div class="attribute-item">
          <span class="attr-icon">⚡</span>
          <span class="attr-name">速度</span>
          <span class="attr-value">{{ player.speed || 10 }}</span>
        </div>
        <div class="attribute-item">
          <span class="attr-icon">🎯</span>
          <span class="attr-name">命中</span>
          <span class="attr-value">{{ player.accuracy || 10 }}</span>
        </div>
      </div>
    </div>
    
    <div class="resources-section">
      <div class="section-title">💰 资源</div>
      <div class="resource-list">
        <div class="resource-item">
          <span class="res-icon">💎</span>
          <span class="res-name">灵石</span>
          <span class="res-value">{{ resources.spiritStones }}</span>
        </div>
        <div class="resource-item">
          <span class="res-icon">🌿</span>
          <span class="res-name">材料</span>
          <span class="res-value">{{ resources.materials.length }}</span>
        </div>
        <div class="resource-item">
          <span class="res-icon">💊</span>
          <span class="res-name">丹药</span>
          <span class="res-value">{{ resources.pills.length }}</span>
        </div>
        <div class="resource-item">
          <span class="res-icon">⚔️</span>
          <span class="res-name">法宝</span>
          <span class="res-value">{{ resources.artifacts.length }}</span>
        </div>
      </div>
    </div>
    
    <div class="time-section">
      <div class="section-title">⏰ 时间</div>
      <div class="time-info">
        <div class="time-row">
          <span class="time-label">年份</span>
          <span class="time-value">{{ gameState.year }}年</span>
        </div>
        <div class="time-row">
          <span class="time-label">月份</span>
          <span class="time-value">{{ gameState.month }}月</span>
        </div>
        <div class="time-row">
          <span class="time-label">日期</span>
          <span class="time-value">{{ gameState.day }}日</span>
        </div>
        <div class="time-row">
          <span class="time-label">季节</span>
          <span class="time-value">{{ gameState.season }}</span>
        </div>
        <div class="time-row highlight">
          <span class="time-label">回合</span>
          <span class="time-value">{{ gameState.turnsRemaining }}/{{ gameState.maxTurnsPerMonth }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGameSystemStore } from '@/stores/gameSystem'

const gameStore = useGameSystemStore()

const player = computed(() => gameStore.playerData)
const cultivation = computed(() => gameStore.playerData.cultivation)
const resources = computed(() => gameStore.playerData.resources)
const gameState = computed(() => gameStore.gameState)
</script>

<style scoped>
.pixel-status-panel {
  width: 100%;
  height: 100%;
  background: var(--pixel-color-bg);
  border: var(--pixel-border) var(--pixel-color-secondary);
  box-shadow: var(--pixel-shadow);
  padding: 12px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  background: var(--pixel-color-bg-light);
  border: 2px solid var(--pixel-color-secondary);
}

.player-avatar {
  font-size: 32px;
  filter: drop-shadow(2px 2px 0 rgba(0, 0, 0, 0.8));
}

.player-info {
  flex: 1;
}

.player-name {
  font-family: var(--pixel-font);
  font-size: 12px;
  color: var(--pixel-color-accent);
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.8);
  margin-bottom: 4px;
}

.player-realm {
  font-family: var(--pixel-font);
  font-size: 8px;
  color: var(--pixel-color-secondary);
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.8);
}

.stats-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-label {
  font-family: var(--pixel-font);
  font-size: 8px;
  color: var(--pixel-color-primary);
  min-width: 60px;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.8);
}

.pixel-health-bar {
  flex: 1;
  height: 12px;
  background: var(--pixel-color-bg-dark);
  border: 2px solid var(--pixel-color-secondary);
  position: relative;
  overflow: hidden;
}

.stat-value {
  font-family: var(--pixel-font);
  font-size: 8px;
  color: var(--pixel-color-highlight);
  min-width: 50px;
  text-align: right;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.8);
}

.attributes-section,
.resources-section,
.time-section {
  background: var(--pixel-color-bg-light);
  border: 2px solid var(--pixel-color-secondary);
  padding: 8px;
}

.section-title {
  font-family: var(--pixel-font);
  font-size: 10px;
  color: var(--pixel-color-accent);
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.8);
  margin-bottom: 8px;
  padding-bottom: 4px;
  border-bottom: 2px solid var(--pixel-color-secondary);
}

.attributes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
}

.attribute-item {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  background: var(--pixel-color-bg);
  border: 1px solid var(--pixel-color-secondary);
}

.attr-icon {
  font-size: 12px;
}

.attr-name {
  font-family: var(--pixel-font);
  font-size: 8px;
  color: var(--pixel-color-secondary);
  flex: 1;
}

.attr-value {
  font-family: var(--pixel-font);
  font-size: 8px;
  color: var(--pixel-color-highlight);
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.8);
}

.resource-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.resource-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px;
  background: var(--pixel-color-bg);
  border: 1px solid var(--pixel-color-secondary);
}

.res-icon {
  font-size: 12px;
}

.res-name {
  font-family: var(--pixel-font);
  font-size: 8px;
  color: var(--pixel-color-secondary);
  flex: 1;
}

.res-value {
  font-family: var(--pixel-font);
  font-size: 8px;
  color: var(--pixel-color-highlight);
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.8);
}

.time-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.time-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px;
  background: var(--pixel-color-bg);
  border: 1px solid var(--pixel-color-secondary);
}

.time-row.highlight {
  background: var(--pixel-color-accent);
  border-color: var(--pixel-color-highlight);
}

.time-row.highlight .time-label,
.time-row.highlight .time-value {
  color: var(--pixel-color-bg-dark);
  text-shadow: none;
}

.time-label {
  font-family: var(--pixel-font);
  font-size: 8px;
  color: var(--pixel-color-secondary);
}

.time-value {
  font-family: var(--pixel-font);
  font-size: 8px;
  color: var(--pixel-color-highlight);
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.8);
}
</style>
