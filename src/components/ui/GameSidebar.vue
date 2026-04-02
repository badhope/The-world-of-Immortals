<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'

const route = useRoute()
const router = useRouter()
const gameStore = useGameStore()

const isExpanded = ref(false)
const isPinned = ref(false)

const navigationItems = [
  { id: 'main', icon: '🏠', label: '主界面', path: '/game' },
  { id: 'explore', icon: '🗺️', label: '探索', path: '/game/explore' },
  { id: 'cultivation', icon: '🧘', label: '修炼', path: '/game/cultivation' },
  { id: 'inventory', icon: '🎒', label: '背包', path: '/game/inventory' },
  { id: 'crafting', icon: '⚗️', label: '炼制', path: '/game/crafting' },
  { id: 'buildings', icon: '🏛️', label: '洞府', path: '/game/buildings' },
  { id: 'world', icon: '🌍', label: '世界', path: '/game/world' },
  { id: 'achievements', icon: '🏆', label: '成就', path: '/game/achievements' },
  { id: 'history', icon: '📜', label: '历史', path: '/game/history' },
  { id: 'settings', icon: '⚙️', label: '设置', path: '/game/settings' }
]

const player = computed(() => gameStore.player)

const sidebarClass = computed(() => [
  'game-sidebar',
  {
    'game-sidebar--expanded': isExpanded.value || isPinned.value,
    'game-sidebar--pinned': isPinned.value
  }
])

function isActive(path: string): boolean {
  if (path === '/game') {
    return route.path === '/game'
  }
  return route.path.startsWith(path)
}

function navigate(path: string) {
  router.push(path)
}

function togglePin() {
  isPinned.value = !isPinned.value
}

function handleMouseEnter() {
  if (!isPinned.value) {
    isExpanded.value = true
  }
}

function handleMouseLeave() {
  if (!isPinned.value) {
    isExpanded.value = false
  }
}

function getCultivationName(level: number): string {
  const names = ['凡人', '炼气期', '筑基期', '结丹期', '元婴期', '化神期', '渡劫期', '大乘期']
  return names[Math.min(level, names.length - 1)] || '大乘期'
}
</script>

<template>
  <aside 
    :class="sidebarClass"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="sidebar-content">
      <div class="player-status">
        <div class="player-avatar">
          <span class="avatar-icon">👤</span>
        </div>
        <div class="player-info" v-if="isExpanded || isPinned">
          <div class="player-name">{{ player.name || '无名修士' }}</div>
          <div class="player-cultivation">{{ getCultivationName(player.cultivationLevel) }}</div>
          <div class="player-bars">
            <GameProgress 
              :value="player.health" 
              :max="player.maxHealth" 
              variant="health" 
              size="sm"
            />
            <GameProgress 
              :value="player.spirit" 
              :max="player.maxSpirit" 
              variant="spirit" 
              size="sm"
            />
          </div>
        </div>
      </div>

      <div class="navigation">
        <button
          v-for="item in navigationItems"
          :key="item.id"
          :class="['nav-item', { 'nav-item--active': isActive(item.path) }]"
          @click="navigate(item.path)"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-label" v-if="isExpanded || isPinned">{{ item.label }}</span>
        </button>
      </div>

      <div class="sidebar-footer">
        <button 
          class="pin-button"
          @click="togglePin"
          :class="{ 'pin-button--active': isPinned }"
        >
          <span class="pin-icon">{{ isPinned ? '📌' : '📍' }}</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.game-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 60px;
  background: linear-gradient(180deg, var(--color-bg-secondary), var(--color-bg-primary));
  border-right: 1px solid var(--color-border);
  z-index: 100;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.game-sidebar--expanded {
  width: 200px;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0.75rem;
}

.player-status {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: linear-gradient(135deg, var(--color-bg-tertiary), var(--color-bg-secondary));
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  margin-bottom: 1rem;
}

.player-avatar {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-gold-dark), var(--color-gold));
  border-radius: var(--radius-lg);
  flex-shrink: 0;
}

.avatar-icon {
  font-size: 1.25rem;
}

.player-info {
  flex: 1;
  min-width: 0;
}

.player-name {
  font-family: var(--font-title);
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.player-cultivation {
  font-size: var(--font-size-xs);
  color: var(--color-gold);
  margin-bottom: 0.5rem;
}

.player-bars {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.navigation {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius-lg);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
  text-align: left;
}

.nav-item:hover {
  background: var(--color-bg-tertiary);
  color: var(--color-text-primary);
}

.nav-item--active {
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0.05));
  border-color: var(--color-gold-dark);
  color: var(--color-gold);
}

.nav-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.nav-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-footer {
  padding-top: 0.75rem;
  border-top: 1px solid var(--color-border);
}

.pin-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.5rem;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all 0.2s;
}

.pin-button:hover {
  background: var(--color-bg-tertiary);
  color: var(--color-text-primary);
}

.pin-button--active {
  background: rgba(212, 175, 55, 0.15);
  border-color: var(--color-gold-dark);
  color: var(--color-gold);
}

.pin-icon {
  font-size: 1rem;
}
</style>
