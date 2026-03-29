<template>
  <div class="new-game-container">
    <div class="new-game-bg">
      <div class="bg-gradient"></div>
      <div class="mountain mountain-1"></div>
      <div class="mountain mountain-2"></div>
      <div class="stars">
        <div v-for="i in 30" :key="i" class="star" :style="getStarStyle(i)"></div>
      </div>
    </div>

    <div class="new-game-content">
      <div class="new-game-card card">
        <div class="card-header">
          <div class="header-decoration">
            <span class="deco-line"></span>
            <span class="deco-icon">☯</span>
            <span class="deco-line"></span>
          </div>
          <h2 class="card-title">创建角色</h2>
          <p class="card-subtitle">踏入修仙之路</p>
        </div>

        <div class="form-content">
          <div class="form-section">
            <div class="form-group">
              <label class="form-label">
                <span class="label-icon">👤</span>
                <span class="label-text">道号</span>
              </label>
              <input
                v-model="playerName"
                class="input"
                placeholder="请输入你的道号"
                maxlength="12"
              />
              <p class="form-hint">道号将在修仙界中代表你的身份</p>
            </div>

            <div class="form-group">
              <label class="form-label">
                <span class="label-icon">🌍</span>
                <span class="label-text">世界种子</span>
                <span class="label-optional">（可选）</span>
              </label>
              <input
                v-model="worldSeed"
                class="input"
                placeholder="留空则随机生成"
                type="number"
              />
              <p class="form-hint">相同种子会生成相同的世界布局</p>
            </div>
          </div>

          <div class="preview-section">
            <div class="section-header">
              <span class="section-icon">📊</span>
              <h3 class="section-title">初始属性</h3>
            </div>
            <div class="stats-preview">
              <div class="stat-item">
                <div class="stat-icon">💪</div>
                <div class="stat-info">
                  <span class="stat-name">力量</span>
                  <span class="stat-value">10</span>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-icon">🏃</div>
                <div class="stat-info">
                  <span class="stat-name">敏捷</span>
                  <span class="stat-value">10</span>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-icon">🧠</div>
                <div class="stat-info">
                  <span class="stat-name">智力</span>
                  <span class="stat-value">10</span>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-icon">🎯</div>
                <div class="stat-info">
                  <span class="stat-name">意志</span>
                  <span class="stat-value">10</span>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-icon">🍀</div>
                <div class="stat-info">
                  <span class="stat-name">幸运</span>
                  <span class="stat-value">10</span>
                </div>
              </div>
            </div>
          </div>

          <div class="starting-items">
            <div class="section-header">
              <span class="section-icon">🎁</span>
              <h3 class="section-title">初始物品</h3>
            </div>
            <div class="items-list">
              <div class="item-preview">
                <div class="item-icon">💎</div>
                <div class="item-info">
                  <span class="item-name">下品灵石</span>
                  <span class="item-count">x100</span>
                </div>
              </div>
              <div class="item-preview">
                <div class="item-icon">🌿</div>
                <div class="item-info">
                  <span class="item-name">灵草</span>
                  <span class="item-count">x10</span>
                </div>
              </div>
              <div class="item-preview">
                <div class="item-icon">📜</div>
                <div class="item-info">
                  <span class="item-name">基础功法</span>
                  <span class="item-count">x1</span>
                </div>
              </div>
            </div>
          </div>

          <div class="actions">
            <button class="btn btn-primary start-btn" :disabled="!playerName.trim()" @click="startGame">
              <span class="btn-icon">🌟</span>
              <span class="btn-text">踏入修仙之路</span>
            </button>
            <button class="btn back-btn" @click="goBack">
              <span class="btn-icon">↩️</span>
              <span class="btn-text">返回</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'

const router = useRouter()
const gameStore = useGameStore()

const playerName = ref('')
const worldSeed = ref<number | undefined>()

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

function goBack() {
  router.push('/')
}

async function startGame() {
  if (!playerName.value.trim()) return

  try {
    let saveId = 'temp-save-' + Date.now()
    
    if (window.electronAPI?.db?.createSave) {
      saveId = await window.electronAPI.db.createSave(`${playerName.value}的存档`)
    }
    
    gameStore.currentSaveId = saveId
    gameStore.initNewGame(playerName.value.trim(), worldSeed.value)

    router.push('/game')
  } catch (error) {
    console.error('创建存档失败:', error)
    alert('创建存档失败，请重试')
  }
}
</script>

<style scoped>
.new-game-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.new-game-bg {
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

.new-game-content {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.new-game-card {
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
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
  animation: rotate 10s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
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

.form-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  color: var(--color-text-secondary);
}

.label-icon {
  font-size: 1rem;
}

.label-text {
  font-family: var(--font-title);
}

.label-optional {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.form-hint {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-top: 0.25rem;
}

.preview-section,
.starting-items {
  padding: 1rem;
  background: linear-gradient(135deg, var(--color-bg-tertiary), var(--color-bg-secondary));
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
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

.stats-preview {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.75rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 0.5rem;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.stat-item:hover {
  border-color: var(--color-gold-dark);
  box-shadow: 0 0 10px rgba(212, 175, 55, 0.2);
}

.stat-icon {
  font-size: 1.25rem;
}

.stat-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.stat-name {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.stat-value {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-gold);
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.item-preview {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.item-preview:hover {
  border-color: var(--color-jade-dark);
  background: var(--color-bg-hover);
}

.item-icon {
  font-size: 1.5rem;
}

.item-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
}

.item-name {
  font-weight: 500;
  color: var(--color-text-primary);
}

.item-count {
  font-size: var(--font-size-sm);
  color: var(--color-jade);
  font-weight: 600;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.start-btn {
  width: 100%;
  padding: 1rem;
  font-size: var(--font-size-lg);
  font-weight: 600;
}

.back-btn {
  width: 100%;
}

@media (max-width: 768px) {
  .new-game-content {
    padding: 1rem;
  }

  .stats-preview {
    grid-template-columns: repeat(3, 1fr);
  }

  .stat-item:nth-child(4),
  .stat-item:nth-child(5) {
    grid-column: span 1;
  }
}
</style>
