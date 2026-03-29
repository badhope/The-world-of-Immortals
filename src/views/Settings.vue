<template>
  <div class="settings-container">
    <div class="settings-bg">
      <div class="bg-gradient"></div>
      <div class="mountain mountain-1"></div>
      <div class="mountain mountain-2"></div>
      <div class="stars">
        <div v-for="i in 30" :key="i" class="star" :style="getStarStyle(i)"></div>
      </div>
    </div>

    <div class="settings-content">
      <div class="settings-card card">
        <div class="card-header">
          <div class="header-decoration">
            <span class="deco-line"></span>
            <span class="deco-icon">⚙️</span>
            <span class="deco-line"></span>
          </div>
          <h2 class="card-title">游戏设置</h2>
          <p class="card-subtitle">调整游戏体验</p>
        </div>

        <div class="settings-sections scrollbar-thin">
          <div class="settings-section">
            <div class="section-header">
              <span class="section-icon">🤖</span>
              <h3 class="section-title">AI 设置</h3>
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

          <div class="settings-section">
            <div class="section-header">
              <span class="section-icon">🎮</span>
              <h3 class="section-title">游戏设置</h3>
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

          <div class="settings-section">
            <div class="section-header">
              <span class="section-icon">ℹ️</span>
              <h3 class="section-title">关于</h3>
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

        <div class="actions">
          <button class="btn back-btn" @click="goBack">
            <span class="btn-icon">↩️</span>
            <span class="btn-text">返回</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSettingsStore } from '@/stores/settings'

const router = useRouter()
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

function getStarStyle(index: number) {
  const size = Math.random() * 2 + 1
  const left = Math.random() * 100
  const top = Math.random() * 100
  const delay = Math.random() * 3
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    top: `${top}%`,
    animationDelay: `${delay}s`
  }
}

function updateSettings() {
  settingsStore.updateSettings(localSettings.value)
}

function goBack() {
  router.push('/')
}
</script>

<style scoped>
.settings-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.settings-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0a0a0f 0%, #1a1a25 50%, #0a0a0f 100%);
}

.bg-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at center top, rgba(212, 175, 55, 0.1) 0%, transparent 50%);
}

.mountain {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40%;
  background: linear-gradient(to top, #0a0a0f, transparent);
  clip-path: polygon(0 100%, 50% 20%, 100% 100%);
}

.mountain-1 {
  height: 35%;
  opacity: 0.3;
  background: linear-gradient(to top, #12121a, transparent);
}

.mountain-2 {
  height: 45%;
  opacity: 0.2;
  background: linear-gradient(to top, #1a1a25, transparent);
  clip-path: polygon(0 100%, 30% 30%, 70% 40%, 100% 100%);
}

.stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.star {
  position: absolute;
  background: var(--color-gold);
  border-radius: 50%;
  animation: twinkle 3s ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

.settings-content {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.settings-card {
  width: 100%;
  max-width: 600px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, rgba(21, 21, 31, 0.95), rgba(18, 18, 26, 0.95));
  border: 1px solid var(--color-border-accent);
  box-shadow: 0 0 30px rgba(212, 175, 55, 0.1);
}

.card-header {
  text-align: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.header-decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.deco-line {
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--color-gold), transparent);
}

.deco-icon {
  font-size: 1.5rem;
  color: var(--color-gold);
}

.card-title {
  font-family: var(--font-title);
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-gold);
  margin-bottom: 0.25rem;
}

.card-subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.settings-sections {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-right: 0.5rem;
}

.settings-section {
  padding: 1rem;
  background: linear-gradient(135deg, var(--color-bg-tertiary), var(--color-bg-secondary));
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-border);
}

.section-icon {
  font-size: 1.25rem;
}

.section-title {
  font-family: var(--font-title);
  font-size: var(--font-size-base);
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
  background: var(--color-bg-secondary);
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
  background-color: var(--color-bg-secondary);
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

.about-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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

.actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.back-btn {
  width: 100%;
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
