<template>
  <div class="game-container">
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="player-avatar">
          <span class="avatar-icon">仙</span>
        </div>
        <div class="player-info">
          <div class="player-name">{{ gameStore.player.name }}</div>
          <div class="player-realm">{{ gameStore.player.realm.name }}</div>
        </div>
      </div>
      
      <div class="player-stats">
        <div class="stat-item">
          <div class="stat-header">
            <span class="stat-label">生命</span>
            <span class="stat-value">{{ gameStore.player.health }}/{{ gameStore.player.maxHealth }}</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill health" :style="{ width: healthPercent + '%' }"></div>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-header">
            <span class="stat-label">灵力</span>
            <span class="stat-value">{{ gameStore.player.spirit }}/{{ gameStore.player.maxSpirit }}</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill spirit" :style="{ width: spiritPercent + '%' }"></div>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-header">
            <span class="stat-label">修为</span>
            <span class="stat-value">{{ gameStore.player.realm.exp }}/{{ nextRealmExp }}</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill exp" :style="{ width: expPercent + '%' }"></div>
          </div>
        </div>
      </div>
      
      <nav class="nav-menu">
        <router-link to="/game" class="nav-item" exact-active-class="active">
          <span class="nav-icon">🏠</span>
          <span class="nav-text">主界面</span>
        </router-link>
        <router-link to="/game/explore" class="nav-item" active-class="active">
          <span class="nav-icon">🗺️</span>
          <span class="nav-text">探索</span>
        </router-link>
        <router-link to="/game/inventory" class="nav-item" active-class="active">
          <span class="nav-icon">🎒</span>
          <span class="nav-text">背包</span>
        </router-link>
        <router-link to="/game/crafting" class="nav-item" active-class="active">
          <span class="nav-icon">⚗️</span>
          <span class="nav-text">炼制</span>
        </router-link>
        <router-link to="/game/buildings" class="nav-item" active-class="active">
          <span class="nav-icon">🏛️</span>
          <span class="nav-text">洞府</span>
        </router-link>
        <router-link to="/game/cultivation" class="nav-item" active-class="active">
          <span class="nav-icon">🧘</span>
          <span class="nav-text">修炼</span>
        </router-link>
      </nav>
      
      <div class="sidebar-footer">
        <div class="world-time">
          <div class="time-row">
            <span class="time-label">第</span>
            <span class="time-value">{{ gameStore.world.day }}</span>
            <span class="time-label">日</span>
          </div>
          <div class="time-detail">{{ gameStore.world.timeOfDay }} · {{ gameStore.world.season }}</div>
        </div>
        <div class="action-buttons">
          <button class="btn btn-sm" @click="saveGame" title="保存游戏">
            💾 存档
          </button>
          <router-link to="/game/settings" class="btn btn-sm" title="设置">
            ⚙️ 设置
          </router-link>
        </div>
      </div>
    </aside>
    
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <aside class="info-panel">
      <div class="location-card">
        <div class="location-header">
          <span class="location-icon">{{ currentLocation?.icon || '❓' }}</span>
          <div class="location-info">
            <div class="location-name">{{ currentLocation?.name || '未知之地' }}</div>
            <div class="location-type">{{ getLocationType(currentLocation?.type) }}</div>
          </div>
        </div>
        <p class="location-desc">{{ currentLocation?.description || '一片神秘的区域...' }}</p>
      </div>
      
      <div class="world-status card">
        <div class="card-header">
          <h4 class="card-title">天地气象</h4>
        </div>
        <div class="status-grid">
          <div class="status-item">
            <span class="status-icon">🌤️</span>
            <span class="status-text">{{ gameStore.world.weather }}</span>
          </div>
          <div class="status-item">
            <span class="status-icon">✨</span>
            <span class="status-text" :class="spiritDensityClass">灵气 {{ spiritDensityDisplay }}</span>
          </div>
          <div class="status-item" v-if="gameStore.world.moonPhase === '满月'">
            <span class="status-icon">🌕</span>
            <span class="status-text">满月当空</span>
          </div>
        </div>
      </div>
      
      <div class="events-log card">
        <div class="card-header">
          <h4 class="card-title">近期事件</h4>
        </div>
        <div class="events-list scrollbar-thin">
          <div 
            v-for="event in recentEvents" 
            :key="event.id" 
            class="event-item"
            :class="event.type"
          >
            <div class="event-icon">{{ getEventIcon(event.type) }}</div>
            <div class="event-content">
              <div class="event-title">{{ event.title }}</div>
              <div class="event-desc">{{ event.description }}</div>
            </div>
          </div>
          <div v-if="recentEvents.length === 0" class="no-events">
            暂无事件记录
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/game'
import { locations } from '../../data/locations'

const gameStore = useGameStore()

const currentLocation = computed(() => locations[gameStore.player.location])

const healthPercent = computed(() => {
  return (gameStore.player.health / gameStore.player.maxHealth) * 100
})

const spiritPercent = computed(() => {
  return (gameStore.player.spirit / gameStore.player.maxSpirit) * 100
})

const expPercent = computed(() => {
  const next = gameStore.nextRealm
  if (!next) return 100
  return Math.min(100, (gameStore.player.realm.exp / next.expRequired) * 100)
})

const nextRealmExp = computed(() => {
  const next = gameStore.nextRealm
  return next ? next.expRequired : '已至巅峰'
})

const spiritDensityDisplay = computed(() => {
  const density = gameStore.world.spiritDensity
  return `${(density * 100).toFixed(0)}%`
})

const spiritDensityClass = computed(() => {
  const density = gameStore.world.spiritDensity
  if (density >= 1.3) return 'text-success'
  if (density <= 0.8) return 'text-danger'
  return ''
})

const recentEvents = computed(() => gameStore.events.slice(0, 10))

function getLocationType(type?: string): string {
  const types: Record<string, string> = {
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
  return type ? types[type] || type : '未知'
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

async function saveGame() {
  if (!gameStore.currentSaveId) return
  
  try {
    await window.electronAPI.db.saveGame(gameStore.currentSaveId, gameStore.getSaveData())
    gameStore.addEvent({
      id: `save_${Date.now()}`,
      title: '存档成功',
      description: '游戏进度已保存',
      type: 'story',
      choices: [],
      timestamp: Date.now()
    })
  } catch (error) {
    console.error('保存失败:', error)
  }
}
</script>

<style scoped>
.game-container {
  width: 100%;
  height: 100%;
  display: flex;
  background: 
    radial-gradient(ellipse at top, rgba(212, 175, 55, 0.03) 0%, transparent 50%),
    radial-gradient(ellipse at bottom, rgba(192, 64, 64, 0.02) 0%, transparent 50%),
    var(--color-bg-primary);
}

.sidebar {
  width: 200px;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, var(--color-bg-secondary), var(--color-bg-primary));
  border-right: 1px solid var(--color-border);
  padding: 1rem 0.75rem;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), transparent);
  border: 1px solid var(--color-border-accent);
  border-radius: var(--radius-lg);
}

.player-avatar {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-gold-dark), var(--color-gold));
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-glow);
}

.avatar-icon {
  font-family: var(--font-title);
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-bg-primary);
}

.player-info {
  flex: 1;
}

.player-name {
  font-family: var(--font-title);
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text-primary);
}

.player-realm {
  font-size: var(--font-size-xs);
  color: var(--color-gold);
}

.player-stats {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0 0.25rem;
  margin-bottom: 1.5rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.stat-value {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.875rem;
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: all var(--transition-fast);
  font-size: var(--font-size-sm);
  border: 1px solid transparent;
}

.nav-item:hover {
  background-color: var(--color-bg-tertiary);
  color: var(--color-text-primary);
}

.nav-item.active {
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0.05));
  border-color: var(--color-gold-dark);
  color: var(--color-gold);
}

.nav-icon {
  font-size: 1.125rem;
}

.nav-text {
  font-family: var(--font-title);
  font-weight: 500;
}

.sidebar-footer {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.world-time {
  text-align: center;
  padding: 0.5rem;
  background-color: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
}

.time-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
}

.time-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.time-value {
  font-family: var(--font-title);
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-gold);
}

.time-detail {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin-top: 0.25rem;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-buttons .btn {
  flex: 1;
  font-size: var(--font-size-xs);
  padding: 0.375rem 0.5rem;
}

.main-content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.info-panel {
  width: 240px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem 0.75rem;
  background: linear-gradient(180deg, var(--color-bg-secondary), var(--color-bg-primary));
  border-left: 1px solid var(--color-border);
  overflow-y: auto;
}

.location-card {
  padding: 0.875rem;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.08), transparent);
  border: 1px solid var(--color-border-accent);
  border-radius: var(--radius-lg);
}

.location-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.location-icon {
  font-size: 1.75rem;
}

.location-info {
  flex: 1;
}

.location-name {
  font-family: var(--font-title);
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text-primary);
}

.location-type {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.location-desc {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.world-status {
  padding: 0.75rem;
}

.world-status .card-header {
  margin-bottom: 0.5rem;
  padding-bottom: 0.375rem;
}

.world-status .card-title {
  font-size: var(--font-size-sm);
}

.status-grid {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.5rem;
  background-color: var(--color-bg-tertiary);
  border-radius: var(--radius-sm);
}

.status-icon {
  font-size: 0.875rem;
}

.status-text {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.text-success {
  color: var(--color-success);
}

.text-danger {
  color: var(--color-danger);
}

.events-log {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 0.75rem;
}

.events-log .card-header {
  margin-bottom: 0.5rem;
  padding-bottom: 0.375rem;
}

.events-log .card-title {
  font-size: var(--font-size-sm);
}

.events-list {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.event-item {
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  background-color: var(--color-bg-tertiary);
  border-radius: var(--radius-sm);
  border-left: 2px solid var(--color-border);
}

.event-item.story {
  border-left-color: var(--color-gold);
}

.event-item.discovery {
  border-left-color: var(--color-jade);
}

.event-item.danger {
  border-left-color: var(--color-red);
}

.event-item.opportunity {
  border-left-color: var(--color-purple);
}

.event-item.cultivation {
  border-left-color: var(--color-blue);
}

.event-icon {
  font-size: 0.875rem;
}

.event-content {
  flex: 1;
  min-width: 0;
}

.event-title {
  font-size: var(--font-size-xs);
  font-weight: 500;
  color: var(--color-text-primary);
  margin-bottom: 0.125rem;
}

.event-desc {
  font-size: 0.65rem;
  color: var(--color-text-muted);
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.no-events {
  text-align: center;
  color: var(--color-text-muted);
  padding: 1.5rem 0;
  font-size: var(--font-size-xs);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
