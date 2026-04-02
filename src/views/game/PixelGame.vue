<template>
  <div class="pixel-game-container">
    <div class="top-bar pixel-panel">
      <div class="game-title pixel-title">修仙世界</div>
      <div class="top-info">
        <span class="info-item">{{ gameState.year }}年{{ gameState.month }}月{{ gameState.day }}日</span>
        <span class="info-item">{{ gameState.season }}</span>
        <span class="info-item highlight">回合: {{ gameState.turnsRemaining }}/{{ gameState.maxTurnsPerMonth }}</span>
      </div>
      <div class="top-actions">
        <button class="pixel-button" @click="showMenu = !showMenu">菜单</button>
        <button class="pixel-button" @click="goBack">返回</button>
      </div>
    </div>
    
    <div class="main-game-area">
      <div class="left-panel">
        <PixelStatusPanel />
      </div>
      
      <div class="center-panel">
        <div class="map-container">
          <PixelMap />
        </div>
        
        <div class="action-bar pixel-panel">
          <div class="action-buttons">
            <button class="pixel-button" @click="openCultivation">🧘 修炼</button>
            <button class="pixel-button" @click="openExploration">🗺️ 探索</button>
            <button class="pixel-button" @click="openCrafting">⚗️ 炼制</button>
            <button class="pixel-button" @click="openInventory">🎒 背包</button>
            <button class="pixel-button" @click="openQuests">📜 任务</button>
          </div>
        </div>
      </div>
      
      <div class="right-panel">
        <div class="mini-map pixel-panel">
          <div class="panel-title">小地图</div>
          <div class="mini-map-content">
            <div class="mini-map-grid">
              <div v-for="i in 25" :key="i" class="mini-tile"></div>
            </div>
          </div>
        </div>
        
        <div class="quick-actions pixel-panel">
          <div class="panel-title">快捷操作</div>
          <div class="quick-buttons">
            <button class="pixel-button small">休息</button>
            <button class="pixel-button small">冥想</button>
            <button class="pixel-button small">炼丹</button>
            <button class="pixel-button small">锻造</button>
          </div>
        </div>
        
        <div class="event-log pixel-panel">
          <div class="panel-title">事件日志</div>
          <div class="log-content">
            <div v-for="(log, index) in eventLogs" :key="index" class="log-item">
              {{ log }}
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="showMenu" class="game-menu-overlay" @click="showMenu = false">
      <div class="game-menu pixel-panel" @click.stop>
        <div class="menu-title pixel-title">游戏菜单</div>
        <div class="menu-buttons">
          <button class="pixel-button" @click="saveGame">保存游戏</button>
          <button class="pixel-button" @click="loadGame">读取游戏</button>
          <button class="pixel-button" @click="showSettings = true">游戏设置</button>
          <button class="pixel-button" @click="goBack">返回主页</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGameSystemStore } from '@/stores/gameSystem'
import PixelMap from '@/components/game/PixelMap.vue'
import PixelStatusPanel from '@/components/game/PixelStatusPanel.vue'

const router = useRouter()
const gameStore = useGameSystemStore()

const showMenu = ref(false)
const showSettings = ref(false)

const gameState = computed(() => gameStore.gameState)

const eventLogs = ref([
  '[系统] 欢迎来到修仙世界！',
  '[修炼] 你的修为提升了',
  '[探索] 发现了一处灵脉',
  '[系统] 新的一天开始了'
])

function goBack() {
  router.push('/')
}

function saveGame() {
  alert('游戏已保存！')
  showMenu.value = false
}

function loadGame() {
  alert('读取游戏功能开发中...')
}

function openCultivation() {
  alert('修炼功能开发中...')
}

function openExploration() {
  alert('探索功能开发中...')
}

function openCrafting() {
  alert('炼制功能开发中...')
}

function openInventory() {
  alert('背包功能开发中...')
}

function openQuests() {
  alert('任务功能开发中...')
}
</script>

<style scoped>
@import '@/styles/pixel.css';

.pixel-game-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--pixel-color-bg);
  overflow: hidden;
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  background: var(--pixel-color-bg-light);
  border-bottom: var(--pixel-border) var(--pixel-color-secondary);
  box-shadow: 0 4px 0 rgba(0, 0, 0, 0.3);
  z-index: 100;
}

.game-title {
  font-size: 16px;
  letter-spacing: 2px;
}

.top-info {
  display: flex;
  gap: 20px;
  align-items: center;
}

.info-item {
  font-family: var(--pixel-font);
  font-size: 10px;
  color: var(--pixel-color-primary);
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.8);
}

.info-item.highlight {
  color: var(--pixel-color-accent);
  background: rgba(255, 204, 0, 0.1);
  padding: 4px 8px;
  border: 2px solid var(--pixel-color-accent);
}

.top-actions {
  display: flex;
  gap: 8px;
}

.main-game-area {
  flex: 1;
  display: flex;
  gap: 0;
  overflow: hidden;
}

.left-panel {
  width: 280px;
  background: var(--pixel-color-bg-dark);
  border-right: var(--pixel-border) var(--pixel-color-secondary);
  overflow-y: auto;
}

.center-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.map-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: var(--pixel-color-bg);
  overflow: auto;
}

.action-bar {
  padding: 12px;
  background: var(--pixel-color-bg-light);
  border-top: var(--pixel-border) var(--pixel-color-secondary);
}

.action-buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}

.right-panel {
  width: 250px;
  background: var(--pixel-color-bg-dark);
  border-left: var(--pixel-border) var(--pixel-color-secondary);
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow-y: auto;
}

.mini-map {
  padding: 12px;
  border-bottom: var(--pixel-border) var(--pixel-color-secondary);
}

.panel-title {
  font-family: var(--pixel-font);
  font-size: 10px;
  color: var(--pixel-color-accent);
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.8);
  margin-bottom: 8px;
  padding-bottom: 4px;
  border-bottom: 2px solid var(--pixel-color-secondary);
}

.mini-map-content {
  background: var(--pixel-color-bg);
  border: 2px solid var(--pixel-color-secondary);
  padding: 8px;
}

.mini-map-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2px;
}

.mini-tile {
  aspect-ratio: 1;
  background: var(--pixel-color-green-dark);
  border: 1px solid var(--pixel-color-secondary);
}

.mini-tile:nth-child(7) {
  background: var(--pixel-color-accent);
}

.quick-actions {
  padding: 12px;
  border-bottom: var(--pixel-border) var(--pixel-color-secondary);
}

.quick-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
}

.pixel-button.small {
  font-size: 8px;
  padding: 6px 8px;
}

.event-log {
  flex: 1;
  padding: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.log-content {
  flex: 1;
  background: var(--pixel-color-bg);
  border: 2px solid var(--pixel-color-secondary);
  padding: 8px;
  overflow-y: auto;
  font-family: var(--pixel-font);
  font-size: 8px;
  color: var(--pixel-color-primary);
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.8);
}

.log-item {
  padding: 4px 0;
  border-bottom: 1px solid var(--pixel-color-bg-light);
}

.game-menu-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.game-menu {
  background: var(--pixel-color-bg);
  border: var(--pixel-border) var(--pixel-color-accent);
  box-shadow: 
    0 0 0 4px var(--pixel-color-bg-dark),
    8px 8px 0 rgba(0, 0, 0, 0.5);
  padding: 24px;
  min-width: 300px;
}

.menu-title {
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 4px solid var(--pixel-color-secondary);
}

.menu-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.menu-buttons .pixel-button {
  width: 100%;
}
</style>
