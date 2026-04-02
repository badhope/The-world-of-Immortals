<template>
  <div class="pixel-game-container">
    <div class="top-bar">
      <div class="top-left">
        <div class="game-title">
          <span class="title-icon">🏔️</span>
          <span class="title-text">修仙世界</span>
        </div>
      </div>
      
      <div class="top-center">
        <div class="time-display">
          <div class="time-item">
            <span class="time-icon">📅</span>
            <span class="time-value">{{ gameState.year }}年{{ gameState.month }}月{{ gameState.day }}日</span>
          </div>
          <div class="time-divider"></div>
          <div class="time-item">
            <span class="time-icon">🌸</span>
            <span class="time-value">{{ gameState.season }}</span>
          </div>
          <div class="time-divider"></div>
          <div class="time-item highlight">
            <span class="time-icon">⏰</span>
            <span class="time-value">回合 {{ gameState.turnsRemaining }}/{{ gameState.maxTurnsPerMonth }}</span>
          </div>
        </div>
      </div>
      
      <div class="top-right">
        <div class="top-actions">
          <button class="action-btn" @click="showHelp = true" title="帮助 (H)">
            <span class="btn-icon">❓</span>
            <span class="btn-text">帮助</span>
          </button>
          <button class="action-btn" @click="showMenu = true" title="菜单 (ESC)">
            <span class="btn-icon">☰</span>
            <span class="btn-text">菜单</span>
          </button>
        </div>
      </div>
    </div>
    
    <div class="main-game-area">
      <div class="left-panel">
        <PixelStatusPanel />
        
        <div class="quick-stats">
          <div class="stat-card">
            <div class="stat-icon">💎</div>
            <div class="stat-info">
              <div class="stat-label">灵石</div>
              <div class="stat-value">{{ resources.spiritStones }}</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">⭐</div>
            <div class="stat-info">
              <div class="stat-label">修为</div>
              <div class="stat-value">{{ cultivation.experience }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="center-panel">
        <div class="map-wrapper">
          <div class="map-header">
            <h2 class="map-title">
              <span class="title-icon">🗺️</span>
              世界地图
            </h2>
            <div class="map-controls">
              <button class="control-btn" @click="zoomIn" title="放大 (+)">
                <span>🔍+</span>
              </button>
              <button class="control-btn" @click="zoomOut" title="缩小 (-)">
                <span>🔍-</span>
              </button>
              <button class="control-btn" @click="resetView" title="重置 (R)">
                <span>↺</span>
              </button>
            </div>
          </div>
          
          <div class="map-container">
            <PixelMap ref="mapRef" />
          </div>
          
          <div class="map-footer">
            <div class="control-hints">
              <div class="hint-item">
                <span class="hint-key">WASD</span>
                <span class="hint-text">移动</span>
              </div>
              <div class="hint-item">
                <span class="hint-key">点击</span>
                <span class="hint-text">交互</span>
              </div>
              <div class="hint-item">
                <span class="hint-key">E</span>
                <span class="hint-text">进入</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="action-bar">
          <div class="action-buttons">
            <button class="action-button primary" @click="openCultivation" title="修炼 (C)">
              <span class="button-icon">🧘</span>
              <span class="button-text">修炼</span>
              <span class="button-hint">C</span>
            </button>
            <button class="action-button success" @click="openExploration" title="探索 (X)">
              <span class="button-icon">🗺️</span>
              <span class="button-text">探索</span>
              <span class="button-hint">X</span>
            </button>
            <button class="action-button warning" @click="openCrafting" title="炼制 (V)">
              <span class="button-icon">⚗️</span>
              <span class="button-text">炼制</span>
              <span class="button-hint">V</span>
            </button>
            <button class="action-button info" @click="openInventory" title="背包 (I)">
              <span class="button-icon">🎒</span>
              <span class="button-text">背包</span>
              <span class="button-hint">I</span>
            </button>
            <button class="action-button purple" @click="openQuests" title="任务 (Q)">
              <span class="button-icon">📜</span>
              <span class="button-text">任务</span>
              <span class="button-hint">Q</span>
            </button>
          </div>
        </div>
      </div>
      
      <div class="right-panel">
        <div class="panel-section">
          <div class="section-header">
            <span class="header-icon">🎯</span>
            <span class="header-title">当前位置</span>
          </div>
          <div class="location-info">
            <div class="location-name">青云宗</div>
            <div class="location-desc">修仙圣地，灵气充沛</div>
          </div>
        </div>
        
        <div class="panel-section">
          <div class="section-header">
            <span class="header-icon">⚡</span>
            <span class="header-title">快捷操作</span>
          </div>
          <div class="quick-actions">
            <button class="quick-btn" @click="rest" title="休息恢复">
              <span class="btn-icon">😴</span>
              <span class="btn-text">休息</span>
            </button>
            <button class="quick-btn" @click="meditate" title="冥想修炼">
              <span class="btn-icon">🧘</span>
              <span class="btn-text">冥想</span>
            </button>
            <button class="quick-btn" @click="practice" title="练习技能">
              <span class="btn-icon">⚔️</span>
              <span class="btn-text">练习</span>
            </button>
            <button class="quick-btn" @click="study" title="研读典籍">
              <span class="btn-icon">📚</span>
              <span class="btn-text">研读</span>
            </button>
          </div>
        </div>
        
        <div class="panel-section">
          <div class="section-header">
            <span class="header-icon">📋</span>
            <span class="header-title">事件日志</span>
          </div>
          <div class="event-log">
            <div v-for="(log, index) in eventLogs" :key="index" class="log-item" :class="log.type">
              <span class="log-time">{{ log.time }}</span>
              <span class="log-message">{{ log.message }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="showMenu" class="modal-overlay" @click="showMenu = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2 class="modal-title">游戏菜单</h2>
          <button class="close-btn" @click="showMenu = false">✕</button>
        </div>
        <div class="modal-body">
          <div class="menu-grid">
            <button class="menu-item" @click="saveGame">
              <span class="menu-icon">💾</span>
              <span class="menu-text">保存游戏</span>
            </button>
            <button class="menu-item" @click="loadGame">
              <span class="menu-icon">📂</span>
              <span class="menu-text">读取游戏</span>
            </button>
            <button class="menu-item" @click="showSettings = true">
              <span class="menu-icon">⚙️</span>
              <span class="menu-text">游戏设置</span>
            </button>
            <button class="menu-item" @click="goBack">
              <span class="menu-icon">🚪</span>
              <span class="menu-text">返回主页</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="showHelp" class="modal-overlay" @click="showHelp = false">
      <div class="modal-content help-modal" @click.stop>
        <div class="modal-header">
          <h2 class="modal-title">游戏帮助</h2>
          <button class="close-btn" @click="showHelp = false">✕</button>
        </div>
        <div class="modal-body">
          <div class="help-section">
            <h3 class="help-title">🎮 基本操作</h3>
            <div class="help-grid">
              <div class="help-item">
                <span class="help-key">WASD / 方向键</span>
                <span class="help-desc">移动角色</span>
              </div>
              <div class="help-item">
                <span class="help-key">鼠标点击</span>
                <span class="help-desc">移动到目标位置</span>
              </div>
              <div class="help-item">
                <span class="help-key">E</span>
                <span class="help-desc">进入建筑/交互</span>
              </div>
              <div class="help-item">
                <span class="help-key">ESC</span>
                <span class="help-desc">打开菜单</span>
              </div>
            </div>
          </div>
          
          <div class="help-section">
            <h3 class="help-title">⌨️ 快捷键</h3>
            <div class="help-grid">
              <div class="help-item">
                <span class="help-key">C</span>
                <span class="help-desc">打开修炼界面</span>
              </div>
              <div class="help-item">
                <span class="help-key">X</span>
                <span class="help-desc">打开探索界面</span>
              </div>
              <div class="help-item">
                <span class="help-key">V</span>
                <span class="help-desc">打开炼制界面</span>
              </div>
              <div class="help-item">
                <span class="help-key">I</span>
                <span class="help-desc">打开背包</span>
              </div>
              <div class="help-item">
                <span class="help-key">Q</span>
                <span class="help-desc">打开任务</span>
              </div>
              <div class="help-item">
                <span class="help-key">H</span>
                <span class="help-desc">打开帮助</span>
              </div>
            </div>
          </div>
          
          <div class="help-section">
            <h3 class="help-title">💡 游戏提示</h3>
            <ul class="help-tips">
              <li>每回合可以执行一个行动</li>
              <li>每月有30回合，合理规划时间</li>
              <li>修炼需要消耗灵气，注意补充</li>
              <li>探索可以发现隐藏的资源和事件</li>
              <li>与其他修士交流可以获得情报</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="notification.show" class="notification" :class="notification.type">
      <span class="notification-icon">{{ notification.icon }}</span>
      <span class="notification-message">{{ notification.message }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGameSystemStore } from '@/stores/gameSystem'
import PixelMap from '@/components/game/PixelMap.vue'
import PixelStatusPanel from '@/components/game/PixelStatusPanel.vue'

const router = useRouter()
const gameStore = useGameSystemStore()
const mapRef = ref<InstanceType<typeof PixelMap> | null>(null)

const showMenu = ref(false)
const showHelp = ref(false)
const showSettings = ref(false)

const notification = ref({
  show: false,
  type: 'info',
  icon: 'ℹ️',
  message: ''
})

const gameState = computed(() => gameStore.gameState)
const resources = computed(() => gameStore.playerData.resources)
const cultivation = computed(() => gameStore.playerData.cultivation)

const eventLogs = ref([
  { time: '10:30', message: '欢迎来到修仙世界！', type: 'info' },
  { time: '10:31', message: '你的修为提升了', type: 'success' },
  { time: '10:32', message: '发现了一处灵脉', type: 'warning' },
  { time: '10:33', message: '新的一天开始了', type: 'info' }
])

function showNotification(type: string, icon: string, message: string) {
  notification.value = { show: true, type, icon, message }
  setTimeout(() => {
    notification.value.show = false
  }, 3000)
}

function zoomIn() {
  showNotification('info', '🔍', '地图已放大')
}

function zoomOut() {
  showNotification('info', '🔍', '地图已缩小')
}

function resetView() {
  showNotification('info', '↺', '视图已重置')
}

function openCultivation() {
  showNotification('success', '🧘', '打开修炼界面')
}

function openExploration() {
  showNotification('success', '🗺️', '打开探索界面')
}

function openCrafting() {
  showNotification('success', '⚗️', '打开炼制界面')
}

function openInventory() {
  showNotification('success', '🎒', '打开背包')
}

function openQuests() {
  showNotification('success', '📜', '打开任务')
}

function rest() {
  showNotification('info', '😴', '你休息了一会儿，精力恢复了')
}

function meditate() {
  showNotification('info', '🧘', '你进入冥想状态')
}

function practice() {
  showNotification('info', '⚔️', '你开始练习技能')
}

function study() {
  showNotification('info', '📚', '你开始研读典籍')
}

function saveGame() {
  showNotification('success', '💾', '游戏已保存！')
  showMenu.value = false
}

function loadGame() {
  showNotification('info', '📂', '读取游戏功能开发中...')
}

function goBack() {
  router.push('/')
}

function handleKeyDown(event: KeyboardEvent) {
  switch (event.key.toLowerCase()) {
    case 'escape':
      showMenu.value = !showMenu.value
      break
    case 'h':
      showHelp.value = !showHelp.value
      break
    case 'c':
      openCultivation()
      break
    case 'x':
      openExploration()
      break
    case 'v':
      openCrafting()
      break
    case 'i':
      openInventory()
      break
    case 'q':
      openQuests()
      break
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  showNotification('info', '🎮', '欢迎来到修仙世界！按H查看帮助')
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
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
  padding: 1rem 2rem;
  background: linear-gradient(180deg, var(--pixel-color-bg-light) 0%, var(--pixel-color-bg) 100%);
  border-bottom: 4px solid var(--pixel-color-secondary);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  gap: 2rem;
}

.top-left {
  flex: 0 0 auto;
}

.game-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.title-icon {
  font-size: 28px;
  filter: drop-shadow(2px 2px 0 rgba(0, 0, 0, 0.5));
}

.title-text {
  font-family: var(--pixel-font);
  font-size: 16px;
  color: var(--pixel-color-accent);
  text-shadow: 
    2px 2px 0 rgba(0, 0, 0, 0.8),
    0 0 12px rgba(255, 204, 0, 0.5);
  letter-spacing: 2px;
}

.top-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.time-display {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0.5rem 1.5rem;
  background: rgba(0, 0, 0, 0.3);
  border: 3px solid var(--pixel-color-secondary);
  border-radius: 8px;
}

.time-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.time-icon {
  font-size: 16px;
  filter: drop-shadow(1px 1px 0 rgba(0, 0, 0, 0.5));
}

.time-value {
  font-family: var(--pixel-font);
  font-size: 10px;
  color: var(--pixel-color-primary);
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.8);
}

.time-item.highlight {
  background: rgba(255, 204, 0, 0.1);
  padding: 0.25rem 0.75rem;
  border: 2px solid var(--pixel-color-accent);
  border-radius: 4px;
}

.time-item.highlight .time-value {
  color: var(--pixel-color-accent);
}

.time-divider {
  width: 2px;
  height: 16px;
  background: var(--pixel-color-secondary);
}

.top-right {
  flex: 0 0 auto;
}

.top-actions {
  display: flex;
  gap: 0.75rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--pixel-color-bg-dark);
  border: 3px solid var(--pixel-color-secondary);
  color: var(--pixel-color-primary);
  cursor: pointer;
  transition: all 0.2s;
  font-family: var(--pixel-font);
  font-size: 10px;
}

.action-btn:hover {
  background: var(--pixel-color-accent);
  color: var(--pixel-color-bg-dark);
  border-color: var(--pixel-color-highlight);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.action-btn .btn-icon {
  font-size: 16px;
}

.main-game-area {
  flex: 1;
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  overflow: hidden;
}

.left-panel {
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
}

.quick-stats {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, var(--pixel-color-bg-light) 0%, var(--pixel-color-bg) 100%);
  border: 3px solid var(--pixel-color-secondary);
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.3);
}

.stat-icon {
  font-size: 28px;
  filter: drop-shadow(2px 2px 0 rgba(0, 0, 0, 0.5));
}

.stat-info {
  flex: 1;
}

.stat-label {
  font-family: var(--pixel-font);
  font-size: 8px;
  color: var(--pixel-color-secondary);
  margin-bottom: 0.25rem;
}

.stat-value {
  font-family: var(--pixel-font);
  font-size: 14px;
  color: var(--pixel-color-accent);
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.8);
}

.center-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
}

.map-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, var(--pixel-color-bg-light) 0%, var(--pixel-color-bg) 100%);
  border: 4px solid var(--pixel-color-secondary);
  box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.map-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: rgba(0, 0, 0, 0.2);
  border-bottom: 3px solid var(--pixel-color-secondary);
}

.map-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--pixel-font);
  font-size: 12px;
  color: var(--pixel-color-accent);
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.8);
  margin: 0;
}

.map-controls {
  display: flex;
  gap: 0.5rem;
}

.control-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--pixel-color-bg-dark);
  border: 2px solid var(--pixel-color-secondary);
  color: var(--pixel-color-primary);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}

.control-btn:hover {
  background: var(--pixel-color-accent);
  color: var(--pixel-color-bg-dark);
  border-color: var(--pixel-color-highlight);
}

.map-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  overflow: auto;
}

.map-footer {
  padding: 0.75rem 1.5rem;
  background: rgba(0, 0, 0, 0.2);
  border-top: 3px solid var(--pixel-color-secondary);
}

.control-hints {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.hint-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.hint-key {
  font-family: var(--pixel-font);
  font-size: 8px;
  color: var(--pixel-color-bg-dark);
  background: var(--pixel-color-accent);
  padding: 0.25rem 0.5rem;
  border: 2px solid var(--pixel-color-yellow-dark);
}

.hint-text {
  font-family: var(--pixel-font);
  font-size: 8px;
  color: var(--pixel-color-secondary);
}

.action-bar {
  padding: 1rem;
  background: linear-gradient(180deg, var(--pixel-color-bg) 0%, var(--pixel-color-bg-dark) 100%);
  border: 4px solid var(--pixel-color-secondary);
  box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.3);
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.action-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: var(--pixel-color-bg-light);
  border: 4px solid var(--pixel-color-secondary);
  color: var(--pixel-color-primary);
  cursor: pointer;
  transition: all 0.2s;
  min-width: 100px;
  position: relative;
}

.action-button:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.action-button.primary {
  background: linear-gradient(180deg, #5da0f2 0%, #4a90e2 50%, #357abd 100%);
  border-color: #2563a8;
}

.action-button.success {
  background: linear-gradient(180deg, #6dee9f 0%, #5dde8f 50%, #38b764 100%);
  border-color: #257953;
}

.action-button.warning {
  background: linear-gradient(180deg, #fff59b 0%, #fee761 50%, #c9a227 100%);
  border-color: #8a6f1a;
  color: var(--pixel-color-bg-dark);
}

.action-button.info {
  background: linear-gradient(180deg, #8dd4ff 0%, #7dc4f8 50%, #41a6f6 100%);
  border-color: #2b6eb0;
}

.action-button.purple {
  background: linear-gradient(180deg, #c49ae7 0%, #b48ad7 50%, #8b5cb3 100%);
  border-color: #5e3a7a;
}

.button-icon {
  font-size: 24px;
  filter: drop-shadow(2px 2px 0 rgba(0, 0, 0, 0.5));
}

.button-text {
  font-family: var(--pixel-font);
  font-size: 10px;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.8);
}

.button-hint {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  font-family: var(--pixel-font);
  font-size: 8px;
  color: var(--pixel-color-bg-dark);
  background: var(--pixel-color-accent);
  padding: 0.125rem 0.375rem;
  border: 1px solid var(--pixel-color-yellow-dark);
}

.right-panel {
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
}

.panel-section {
  background: linear-gradient(135deg, var(--pixel-color-bg-light) 0%, var(--pixel-color-bg) 100%);
  border: 3px solid var(--pixel-color-secondary);
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-bottom: 2px solid var(--pixel-color-secondary);
}

.header-icon {
  font-size: 16px;
  filter: drop-shadow(1px 1px 0 rgba(0, 0, 0, 0.5));
}

.header-title {
  font-family: var(--pixel-font);
  font-size: 10px;
  color: var(--pixel-color-accent);
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.8);
}

.location-info {
  padding: 1rem;
}

.location-name {
  font-family: var(--pixel-font);
  font-size: 12px;
  color: var(--pixel-color-primary);
  margin-bottom: 0.5rem;
}

.location-desc {
  font-family: var(--pixel-font);
  font-size: 8px;
  color: var(--pixel-color-secondary);
  line-height: 1.6;
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  padding: 0.75rem;
}

.quick-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem;
  background: var(--pixel-color-bg-dark);
  border: 2px solid var(--pixel-color-secondary);
  color: var(--pixel-color-primary);
  cursor: pointer;
  transition: all 0.2s;
}

.quick-btn:hover {
  background: var(--pixel-color-accent);
  color: var(--pixel-color-bg-dark);
  border-color: var(--pixel-color-highlight);
  transform: scale(1.05);
}

.quick-btn .btn-icon {
  font-size: 20px;
  filter: drop-shadow(1px 1px 0 rgba(0, 0, 0, 0.5));
}

.quick-btn .btn-text {
  font-family: var(--pixel-font);
  font-size: 8px;
}

.event-log {
  max-height: 200px;
  overflow-y: auto;
  padding: 0.75rem;
}

.log-item {
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background: rgba(0, 0, 0, 0.2);
  border-left: 3px solid var(--pixel-color-secondary);
  font-family: var(--pixel-font);
  font-size: 8px;
}

.log-item.info {
  border-left-color: var(--pixel-color-blue);
}

.log-item.success {
  border-left-color: var(--pixel-color-green);
}

.log-item.warning {
  border-left-color: var(--pixel-color-yellow);
}

.log-time {
  color: var(--pixel-color-secondary);
  white-space: nowrap;
}

.log-message {
  color: var(--pixel-color-primary);
  flex: 1;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: linear-gradient(135deg, var(--pixel-color-bg-light) 0%, var(--pixel-color-bg) 100%);
  border: 4px solid var(--pixel-color-accent);
  box-shadow: 
    0 0 0 4px var(--pixel-color-bg-dark),
    8px 8px 0 rgba(0, 0, 0, 0.5);
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.2);
  border-bottom: 3px solid var(--pixel-color-secondary);
}

.modal-title {
  font-family: var(--pixel-font);
  font-size: 14px;
  color: var(--pixel-color-accent);
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.8);
  margin: 0;
}

.close-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--pixel-color-bg-dark);
  border: 2px solid var(--pixel-color-secondary);
  color: var(--pixel-color-primary);
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s;
}

.close-btn:hover {
  background: var(--pixel-color-red);
  border-color: var(--pixel-color-red-light);
}

.modal-body {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem;
  background: var(--pixel-color-bg-dark);
  border: 3px solid var(--pixel-color-secondary);
  color: var(--pixel-color-primary);
  cursor: pointer;
  transition: all 0.2s;
}

.menu-item:hover {
  background: var(--pixel-color-accent);
  color: var(--pixel-color-bg-dark);
  border-color: var(--pixel-color-highlight);
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.3);
}

.menu-icon {
  font-size: 32px;
  filter: drop-shadow(2px 2px 0 rgba(0, 0, 0, 0.5));
}

.menu-text {
  font-family: var(--pixel-font);
  font-size: 10px;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.8);
}

.help-modal {
  max-width: 700px;
}

.help-section {
  margin-bottom: 2rem;
}

.help-title {
  font-family: var(--pixel-font);
  font-size: 12px;
  color: var(--pixel-color-accent);
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.8);
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--pixel-color-secondary);
}

.help-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.help-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.2);
  border: 2px solid var(--pixel-color-secondary);
}

.help-key {
  font-family: var(--pixel-font);
  font-size: 8px;
  color: var(--pixel-color-bg-dark);
  background: var(--pixel-color-accent);
  padding: 0.375rem 0.75rem;
  border: 2px solid var(--pixel-color-yellow-dark);
  white-space: nowrap;
}

.help-desc {
  font-family: var(--pixel-font);
  font-size: 8px;
  color: var(--pixel-color-primary);
}

.help-tips {
  list-style: none;
  padding: 0;
  margin: 0;
}

.help-tips li {
  font-family: var(--pixel-font);
  font-size: 8px;
  color: var(--pixel-color-primary);
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.help-tips li::before {
  content: '•';
  position: absolute;
  left: 0.5rem;
  color: var(--pixel-color-accent);
}

.notification {
  position: fixed;
  top: 2rem;
  right: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: var(--pixel-color-bg-light);
  border: 3px solid var(--pixel-color-secondary);
  box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.3);
  z-index: 2000;
  animation: slideInRight 0.3s ease-out;
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.notification.info {
  border-color: var(--pixel-color-blue);
}

.notification.success {
  border-color: var(--pixel-color-green);
}

.notification.warning {
  border-color: var(--pixel-color-yellow);
}

.notification.error {
  border-color: var(--pixel-color-red);
}

.notification-icon {
  font-size: 20px;
  filter: drop-shadow(1px 1px 0 rgba(0, 0, 0, 0.5));
}

.notification-message {
  font-family: var(--pixel-font);
  font-size: 10px;
  color: var(--pixel-color-primary);
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.8);
}

@media (max-width: 1200px) {
  .main-game-area {
    flex-direction: column;
  }
  
  .left-panel,
  .right-panel {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .panel-section {
    flex: 1;
    min-width: 250px;
  }
}

@media (max-width: 768px) {
  .top-bar {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .time-display {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .action-button {
    width: 100%;
  }
}
</style>
