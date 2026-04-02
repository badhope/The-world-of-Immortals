<template>
  <div class="pixel-status-panel">
    <div class="panel-header">
      <div class="player-avatar">
        <div class="avatar-frame">
          <span class="avatar-icon">🧙</span>
        </div>
        <div class="level-badge">Lv.{{ cultivationLevel }}</div>
      </div>
      <div class="player-info">
        <div class="player-name">{{ player.name || '修士' }}</div>
        <div class="player-realm">
          <span class="realm-icon">⭐</span>
          <span class="realm-text">{{ cultivation.realmName }}</span>
        </div>
      </div>
    </div>
    
    <div class="stats-section">
      <div class="stat-item">
        <div class="stat-header">
          <span class="stat-icon">❤️</span>
          <span class="stat-label">生命</span>
          <span class="stat-values">{{ player.health }}/{{ player.maxHealth }}</span>
        </div>
        <div class="stat-bar-container">
          <div class="stat-bar health-bar" :style="{ width: `${healthPercent}%` }">
            <div class="bar-shine"></div>
          </div>
        </div>
      </div>
      
      <div class="stat-item">
        <div class="stat-header">
          <span class="stat-icon">💧</span>
          <span class="stat-label">灵气</span>
          <span class="stat-values">{{ player.spiritEnergy }}/{{ player.maxSpiritEnergy }}</span>
        </div>
        <div class="stat-bar-container">
          <div class="stat-bar mana-bar" :style="{ width: `${manaPercent}%` }">
            <div class="bar-shine"></div>
          </div>
        </div>
      </div>
      
      <div class="stat-item">
        <div class="stat-header">
          <span class="stat-icon">⭐</span>
          <span class="stat-label">修为</span>
          <span class="stat-values">{{ cultivation.experience }}/{{ cultivation.experienceToNext }}</span>
        </div>
        <div class="stat-bar-container">
          <div class="stat-bar exp-bar" :style="{ width: `${expPercent}%` }">
            <div class="bar-shine"></div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="attributes-section">
      <div class="section-title">
        <span class="title-icon">📊</span>
        <span class="title-text">属性</span>
      </div>
      <div class="attributes-grid">
        <div class="attribute-item">
          <span class="attr-icon">⚔️</span>
          <span class="attr-label">攻击</span>
          <span class="attr-value">{{ attributes.attack }}</span>
        </div>
        <div class="attribute-item">
          <span class="attr-icon">🛡️</span>
          <span class="attr-label">防御</span>
          <span class="attr-value">{{ attributes.defense }}</span>
        </div>
        <div class="attribute-item">
          <span class="attr-icon">⚡</span>
          <span class="attr-label">速度</span>
          <span class="attr-value">{{ attributes.speed }}</span>
        </div>
        <div class="attribute-item">
          <span class="attr-icon">🎯</span>
          <span class="attr-label">命中</span>
          <span class="attr-value">{{ attributes.accuracy }}</span>
        </div>
      </div>
    </div>
    
    <div class="info-section">
      <div class="info-row">
        <span class="info-icon">🎂</span>
        <span class="info-label">年龄</span>
        <span class="info-value">{{ player.age }}岁</span>
      </div>
      <div class="info-row">
        <span class="info-icon">⏳</span>
        <span class="info-label">寿命</span>
        <span class="info-value">{{ player.lifespan }}年</span>
      </div>
      <div class="info-row">
        <span class="info-icon">💰</span>
        <span class="info-label">灵石</span>
        <span class="info-value highlight">{{ resources.spiritStones }}</span>
      </div>
    </div>
    
    <div class="buffs-section" v-if="buffs.length > 0">
      <div class="section-title">
        <span class="title-icon">✨</span>
        <span class="title-text">状态效果</span>
      </div>
      <div class="buffs-list">
        <div v-for="(buff, index) in buffs" :key="index" class="buff-item" :class="buff.type">
          <span class="buff-icon">{{ buff.icon }}</span>
          <span class="buff-name">{{ buff.name }}</span>
          <span class="buff-duration">{{ buff.duration }}回合</span>
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
const cultivationLevel = computed(() => gameStore.playerData.cultivationLevel)

const attributes = computed(() => ({
  attack: 10 + Math.floor(cultivation.value.experience / 100),
  defense: 8 + Math.floor(cultivation.value.experience / 150),
  speed: 5 + Math.floor(cultivation.value.experience / 200),
  accuracy: 85 + Math.floor(cultivation.value.experience / 300)
}))

const buffs = computed(() => [
  // 示例buff数据
  // { name: '修炼加速', icon: '⚡', type: 'positive', duration: 5 },
  // { name: '中毒', icon: '☠️', type: 'negative', duration: 3 }
])

const healthPercent = computed(() => 
  Math.min(100, (player.value.health / player.value.maxHealth) * 100)
)

const manaPercent = computed(() => 
  Math.min(100, (player.value.spiritEnergy / player.value.maxSpiritEnergy) * 100)
)

const expPercent = computed(() => 
  Math.min(100, (cultivation.value.experience / cultivation.value.experienceToNext) * 100)
)
</script>

<style scoped>
.pixel-status-panel {
  background: linear-gradient(135deg, var(--pixel-color-bg-light) 0%, var(--pixel-color-bg) 100%);
  border: 3px solid var(--pixel-color-secondary);
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.3);
  overflow: hidden;
  transition: all 0.3s ease;
}

.pixel-status-panel:hover {
  box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.4);
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.2);
  border-bottom: 3px solid var(--pixel-color-secondary);
}

.player-avatar {
  position: relative;
}

.avatar-frame {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--pixel-color-bg) 0%, var(--pixel-color-bg-dark) 100%);
  border: 4px solid var(--pixel-color-accent);
  box-shadow: 
    inset 0 0 8px rgba(255, 204, 0, 0.3),
    0 4px 8px rgba(0, 0, 0, 0.3);
}

.avatar-icon {
  font-size: 36px;
  filter: drop-shadow(2px 2px 0 rgba(0, 0, 0, 0.5));
}

.level-badge {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(180deg, var(--pixel-color-accent) 0%, var(--pixel-color-yellow-dark) 100%);
  color: var(--pixel-color-bg-dark);
  font-family: var(--pixel-font);
  font-size: 8px;
  padding: 0.125rem 0.5rem;
  border: 2px solid var(--pixel-color-yellow-dark);
  white-space: nowrap;
}

.player-info {
  flex: 1;
}

.player-name {
  font-family: var(--pixel-font);
  font-size: 14px;
  color: var(--pixel-color-primary);
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.8);
  margin-bottom: 0.5rem;
}

.player-realm {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.realm-icon {
  font-size: 12px;
  filter: drop-shadow(1px 1px 0 rgba(0, 0, 0, 0.5));
}

.realm-text {
  font-family: var(--pixel-font);
  font-size: 10px;
  color: var(--pixel-color-accent);
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.8);
}

.stats-section {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-header {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.stat-icon {
  font-size: 16px;
  filter: drop-shadow(1px 1px 0 rgba(0, 0, 0, 0.5));
}

.stat-label {
  font-family: var(--pixel-font);
  font-size: 9px;
  color: var(--pixel-color-secondary);
  letter-spacing: 0.5px;
}

.stat-values {
  margin-left: auto;
  font-family: var(--pixel-font);
  font-size: 9px;
  color: var(--pixel-color-primary);
  font-weight: bold;
}

.stat-bar-container {
  height: 14px;
  background: rgba(0, 0, 0, 0.4);
  border: 2px solid var(--pixel-color-secondary);
  overflow: hidden;
  position: relative;
  border-radius: 2px;
}

.stat-bar {
  height: 100%;
  position: relative;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.health-bar {
  background: linear-gradient(180deg, #ff6b6b 0%, #ee5a5a 50%, #c92a2a 100%);
}

.mana-bar {
  background: linear-gradient(180deg, #74c0fc 0%, #4dabf7 50%, #1c7ed6 100%);
}

.exp-bar {
  background: linear-gradient(180deg, #ffd43b 0%, #fab005 50%, #e67700 100%);
}

.bar-shine {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, transparent 100%);
}

.attributes-section {
  padding: 1rem 1.25rem;
  background: rgba(0, 0, 0, 0.1);
  border-top: 2px solid var(--pixel-color-secondary);
  border-bottom: 2px solid var(--pixel-color-secondary);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin-bottom: 1rem;
}

.title-icon {
  font-size: 14px;
  filter: drop-shadow(1px 1px 0 rgba(0, 0, 0, 0.5));
}

.title-text {
  font-family: var(--pixel-font);
  font-size: 11px;
  color: var(--pixel-color-accent);
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.8);
  letter-spacing: 1px;
}

.attributes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.attribute-item {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.2);
  border: 2px solid var(--pixel-color-secondary);
  transition: all 0.2s;
}

.attribute-item:hover {
  background: rgba(0, 0, 0, 0.3);
  border-color: var(--pixel-color-accent);
  transform: translateY(-1px);
}

.attr-icon {
  font-size: 14px;
  filter: drop-shadow(1px 1px 0 rgba(0, 0, 0, 0.5));
}

.attr-label {
  font-family: var(--pixel-font);
  font-size: 9px;
  color: var(--pixel-color-secondary);
  flex: 1;
}

.attr-value {
  font-family: var(--pixel-font);
  font-size: 11px;
  color: var(--pixel-color-accent);
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.8);
  font-weight: bold;
}

.info-section {
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.25rem 0;
}

.info-icon {
  font-size: 14px;
  filter: drop-shadow(1px 1px 0 rgba(0, 0, 0, 0.5));
}

.info-label {
  font-family: var(--pixel-font);
  font-size: 9px;
  color: var(--pixel-color-secondary);
  flex: 1;
}

.info-value {
  font-family: var(--pixel-font);
  font-size: 11px;
  color: var(--pixel-color-primary);
}

.info-value.highlight {
  color: var(--pixel-color-accent);
  font-weight: bold;
}

.buffs-section {
  padding: 0.75rem 1rem;
  background: rgba(0, 0, 0, 0.1);
  border-top: 2px solid var(--pixel-color-secondary);
}

.buffs-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.buff-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.2);
  border: 2px solid var(--pixel-color-secondary);
}

.buff-item.positive {
  border-color: var(--pixel-color-green);
}

.buff-item.negative {
  border-color: var(--pixel-color-red);
}

.buff-icon {
  font-size: 14px;
  filter: drop-shadow(1px 1px 0 rgba(0, 0, 0, 0.5));
}

.buff-name {
  font-family: var(--pixel-font);
  font-size: 8px;
  color: var(--pixel-color-primary);
  flex: 1;
}

.buff-duration {
  font-family: var(--pixel-font);
  font-size: 8px;
  color: var(--pixel-color-secondary);
}
</style>
