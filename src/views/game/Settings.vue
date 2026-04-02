<template>
  <div class="settings-view">
    <div class="settings-header">
      <h2 class="view-title">游戏设置</h2>
      <p class="view-subtitle">调整游戏体验</p>
    </div>

    <div class="settings-content scrollbar-thin">
      <div class="settings-section card">
        <div class="card-header">
          <span class="header-icon">🤖</span>
          <h3 class="card-title">AI 设置</h3>
        </div>

        <div class="setting-item">
          <div class="setting-info">
            <div class="setting-label">启用 AI 增强</div>
            <div class="setting-desc">AI 将生成独特的事件和对话</div>
          </div>
          <div class="setting-control">
            <div class="toggle-switch">
              <input
                type="checkbox"
                id="ai-enabled"
                v-model="localSettings.aiEnabled"
                @change="updateSettings"
              />
              <label for="ai-enabled" class="toggle-label"></label>
            </div>
          </div>
        </div>

        <template v-if="localSettings.aiEnabled">
          <div class="divider"></div>
          
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">AI 提供商</div>
              <div class="setting-desc">选择 AI 服务来源</div>
            </div>
            <div class="setting-control">
              <select v-model="localSettings.aiProvider" class="input select" @change="updateSettings">
                <option value="local">本地模型</option>
                <option value="cloud">云端 API</option>
              </select>
            </div>
          </div>
        </template>
      </div>

      <div class="settings-section card">
        <div class="card-header">
          <span class="header-icon">🎮</span>
          <h3 class="card-title">游戏设置</h3>
        </div>

        <div class="setting-item">
          <div class="setting-info">
            <div class="setting-label">主题</div>
            <div class="setting-desc">选择界面配色方案</div>
          </div>
          <div class="setting-control">
            <select v-model="localSettings.theme" class="input select" @change="updateSettings">
              <option value="dark">深色</option>
              <option value="light">浅色</option>
            </select>
          </div>
        </div>

        <div class="divider"></div>

        <div class="setting-item">
          <div class="setting-info">
            <div class="setting-label">自动保存</div>
            <div class="setting-desc">定期自动保存游戏进度</div>
          </div>
          <div class="setting-control">
            <div class="toggle-switch">
              <input
                type="checkbox"
                id="auto-save"
                v-model="localSettings.autoSave"
                @change="updateSettings"
              />
              <label for="auto-save" class="toggle-label"></label>
            </div>
          </div>
        </div>
      </div>

      <div class="settings-section card">
        <div class="card-header">
          <span class="header-icon">💾</span>
          <h3 class="card-title">存档管理</h3>
        </div>

        <div class="save-actions">
          <button class="btn btn-primary action-btn" @click="saveGame">
            <span class="btn-icon">💾</span>
            <span class="btn-text">保存游戏</span>
          </button>
          <button class="btn btn-danger action-btn" @click="returnToMenu">
            <span class="btn-icon">🚪</span>
            <span class="btn-text">返回主菜单</span>
          </button>
        </div>
      </div>

      <div class="settings-section card">
        <div class="card-header">
          <span class="header-icon">ℹ️</span>
          <h3 class="card-title">关于</h3>
        </div>

        <div class="about-content">
          <div class="about-item">
            <span class="about-label">游戏名称</span>
            <span class="about-value">修仙世界</span>
          </div>
          <div class="about-item">
            <span class="about-label">版本</span>
            <span class="about-value">v0.1.0</span>
          </div>
          <div class="about-item">
            <span class="about-label">描述</span>
            <span class="about-value">一个 AI 增强的修仙模拟游戏</span>
          </div>
          <div class="about-item">
            <span class="about-label">技术栈</span>
            <span class="about-value">Electron + Vue 3 + TypeScript</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'
import { useSettingsStore } from '@/stores/settings'

const router = useRouter()
const gameStore = useGameStore()
const settingsStore = useSettingsStore()

const localSettings = ref({
  aiEnabled: false,
  aiProvider: 'local',
  theme: 'dark',
  autoSave: true
})

onMounted(() => {
  localSettings.value = { ...settingsStore.gameSettings }
})

function updateSettings() {
  settingsStore.updateGameSettings(localSettings.value)
}

async function saveGame() {
  try {
    if (!gameStore.currentSaveId) {
      alert('无法保存：没有活动的游戏存档')
      return
    }
    
    const saveData = gameStore.getSaveData()
    
    if (window.electronAPI?.db?.saveGame) {
      await window.electronAPI.db.saveGame(gameStore.currentSaveId, saveData)
    }
    
    alert('游戏已保存')
  } catch (error) {
    console.error('保存游戏失败:', error)
    alert('保存游戏失败')
  }
}

function returnToMenu() {
  if (confirm('确定要返回主菜单吗？未保存的进度将丢失。')) {
    router.push('/')
  }
}
</script>

<style scoped>
.settings-view {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.settings-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-border);
  text-align: center;
}

.view-title {
  font-family: var(--font-title);
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-gold);
  margin-bottom: 0.25rem;
}

.view-subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.settings-content {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.settings-section {
  background: linear-gradient(135deg, var(--color-bg-card), var(--color-bg-secondary));
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-border);
}

.header-icon {
  font-size: 1.5rem;
}

.card-title {
  font-family: var(--font-title);
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text-accent);
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 0;
}

.setting-info {
  flex: 1;
}

.setting-label {
  font-weight: 500;
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
}

.setting-desc {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.setting-control {
  flex-shrink: 0;
}

.select {
  min-width: 120px;
  padding: 0.5rem 1rem;
  background: var(--color-bg-tertiary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.select:hover {
  border-color: var(--color-gold-dark);
}

.select:focus {
  outline: none;
  border-color: var(--color-gold);
  box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2);
}

.toggle-switch {
  position: relative;
  width: 48px;
  height: 24px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-label {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-bg-tertiary);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  transition: all var(--transition-fast);
}

.toggle-label:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 2px;
  bottom: 2px;
  background-color: var(--color-text-muted);
  border-radius: 50%;
  transition: all var(--transition-fast);
}

.toggle-switch input:checked + .toggle-label {
  background-color: var(--color-gold-dark);
  border-color: var(--color-gold);
}

.toggle-switch input:checked + .toggle-label:before {
  transform: translateX(24px);
  background-color: var(--color-gold);
}

.divider {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-border), transparent);
  margin: 0.5rem 0;
}

.save-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.action-btn {
  width: 100%;
  justify-content: flex-start;
  padding: 1rem;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.about-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--color-border);
}

.about-item:last-child {
  border-bottom: none;
}

.about-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.about-value {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  font-weight: 500;
}

@media (max-width: 768px) {
  .settings-content {
    padding: 1rem;
  }

  .setting-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .setting-control {
    width: 100%;
  }

  .select {
    width: 100%;
  }
}
</style>
