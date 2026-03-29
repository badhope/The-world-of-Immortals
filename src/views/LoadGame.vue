<template>
  <div class="load-game-container">
    <div class="load-game-bg">
      <div class="bg-gradient"></div>
      <div class="mountain mountain-1"></div>
      <div class="mountain mountain-2"></div>
      <div class="stars">
        <div v-for="i in 30" :key="i" class="star" :style="getStarStyle(i)"></div>
      </div>
    </div>

    <div class="load-game-content">
      <div class="load-game-card card">
        <div class="card-header">
          <div class="header-decoration">
            <span class="deco-line"></span>
            <span class="deco-icon">📜</span>
            <span class="deco-line"></span>
          </div>
          <h2 class="card-title">读取存档</h2>
          <p class="card-subtitle">继续你的修仙之旅</p>
        </div>

        <div class="saves-list scrollbar-thin" v-if="saves.length > 0">
          <div
            v-for="save in saves"
            :key="save.id"
            class="save-item"
            :class="{ selected: selectedSave?.id === save.id }"
            @click="selectSave(save)"
          >
            <div class="save-icon">
              <span>👤</span>
            </div>
            <div class="save-info">
              <div class="save-name">{{ save.name }}</div>
              <div class="save-meta">
                <span class="meta-item">
                  <span class="meta-icon">⏱️</span>
                  <span>{{ formatPlayTime(save.playTime) }}</span>
                </span>
                <span class="meta-divider">·</span>
                <span class="meta-item">
                  <span class="meta-icon">📅</span>
                  <span>{{ formatDate(save.updatedAt) }}</span>
                </span>
              </div>
            </div>
            <div class="save-actions">
              <button class="btn btn-sm btn-danger" @click.stop="deleteSave(save.id)" title="删除存档">
                🗑️
              </button>
            </div>
          </div>
        </div>

        <div class="no-saves" v-else>
          <div class="empty-icon">📭</div>
          <p class="empty-text">暂无存档</p>
          <p class="empty-hint">开始新游戏来创建你的第一个存档</p>
        </div>

        <div class="actions">
          <button
            class="btn btn-primary load-btn"
            v-if="selectedSave"
            @click="loadSelectedSave"
          >
            <span class="btn-icon">▶️</span>
            <span class="btn-text">加载存档</span>
          </button>
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
import { useGameStore } from '@/stores/game'

interface SaveSlot {
  id: string
  name: string
  createdAt: number
  updatedAt: number
  playTime: number
}

const router = useRouter()
const gameStore = useGameStore()

const saves = ref<SaveSlot[]>([])
const selectedSave = ref<SaveSlot | null>(null)

onMounted(async () => {
  await loadSaves()
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

async function loadSaves() {
  try {
    if (window.electronAPI?.db?.getSaveSlots) {
      saves.value = await window.electronAPI.db.getSaveSlots()
    } else {
      saves.value = []
    }
  } catch (error) {
    console.error('加载存档列表失败:', error)
    saves.value = []
  }
}

function selectSave(save: SaveSlot) {
  selectedSave.value = save
}

async function loadSelectedSave() {
  if (!selectedSave.value) return

  try {
    if (window.electronAPI?.db?.loadSave) {
      const saveData = await window.electronAPI.db.loadSave(selectedSave.value.id)
      gameStore.currentSaveId = selectedSave.value.id
      gameStore.loadGame(saveData)
    } else {
      gameStore.currentSaveId = selectedSave.value.id
    }
    router.push('/game')
  } catch (error) {
    console.error('加载存档失败:', error)
    alert('加载存档失败')
  }
}

async function deleteSave(saveId: string) {
  if (!confirm('确定要删除这个存档吗？此操作不可撤销。')) return

  try {
    if (window.electronAPI?.db?.deleteSave) {
      await window.electronAPI.db.deleteSave(saveId)
    }
    saves.value = saves.value.filter(s => s.id !== saveId)
    if (selectedSave.value?.id === saveId) {
      selectedSave.value = null
    }
  } catch (error) {
    console.error('删除存档失败:', error)
    alert('删除存档失败')
  }
}

function goBack() {
  router.push('/')
}

function formatPlayTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  return `${hours}时${minutes}分`
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleString('zh-CN')
}
</script>

<style scoped>
.load-game-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.load-game-bg {
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

.load-game-content {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.load-game-card {
  width: 100%;
  max-width: 700px;
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

.saves-list {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-right: 0.5rem;
}

.save-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, var(--color-bg-tertiary), var(--color-bg-secondary));
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.save-item:hover {
  background: linear-gradient(135deg, var(--color-bg-hover), var(--color-bg-tertiary));
  border-color: var(--color-gold-dark);
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.2);
}

.save-item.selected {
  border-color: var(--color-gold);
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), var(--color-bg-tertiary));
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
}

.save-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 1.5rem;
}

.save-info {
  flex: 1;
  min-width: 0;
}

.save-name {
  font-family: var(--font-title);
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
}

.save-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.meta-icon {
  font-size: 0.875rem;
}

.meta-divider {
  color: var(--color-border);
}

.save-actions {
  display: flex;
  gap: 0.5rem;
}

.no-saves {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-text {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  margin-bottom: 0.5rem;
}

.empty-hint {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: auto;
}

.load-btn {
  width: 100%;
  padding: 1rem;
  font-size: var(--font-size-lg);
  font-weight: 600;
}

.back-btn {
  width: 100%;
}

@media (max-width: 768px) {
  .load-game-content {
    padding: 1rem;
  }

  .save-item {
    padding: 0.75rem;
  }

  .save-icon {
    width: 40px;
    height: 40px;
    font-size: 1.25rem;
  }

  .save-name {
    font-size: var(--font-size-base);
  }
}
</style>
