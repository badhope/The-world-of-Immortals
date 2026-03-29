<template>
  <div class="cultivation-view">
    <div class="cultivation-header">
      <h2 class="view-title">修炼</h2>
      <div class="cultivation-info">
        <span class="info-item">🔮 修为: {{ gameStore.player.realm.exp }}</span>
      </div>
    </div>
    
    <div class="cultivation-content">
      <div class="realm-section card">
        <div class="card-header">
          <h3 class="card-title">当前境界</h3>
        </div>
        
        <div class="realm-display">
          <div class="realm-icon-wrapper">
            <div class="realm-icon">{{ getRealmIcon() }}</div>
            <div class="realm-glow"></div>
          </div>
          <div class="realm-info">
            <div class="realm-name">{{ gameStore.player.realm.name }}</div>
            <div class="realm-level">第 {{ gameStore.player.realm.level }} 阶</div>
          </div>
        </div>
        
        <div class="exp-section">
          <div class="exp-header">
            <span class="exp-label">修为进度</span>
            <span class="exp-text">
              {{ gameStore.player.realm.exp }} / {{ gameStore.nextRealm?.expRequired || '∞' }}
            </span>
          </div>
          <div class="exp-bar-container">
            <div class="exp-bar">
              <div class="exp-fill" :style="{ width: expPercent + '%' }"></div>
              <div class="exp-glow"></div>
            </div>
          </div>
        </div>
        
        <div class="next-realm" v-if="gameStore.nextRealm">
          <div class="next-realm-header">
            <span class="next-icon">⬆️</span>
            <span class="next-label">下一境界</span>
          </div>
          <div class="next-realm-name">{{ gameStore.nextRealm.name }}</div>
          <p class="next-realm-desc">{{ getRealmDescription(gameStore.nextRealm.level) }}</p>
        </div>
      </div>
      
      <div class="main-content">
        <div class="cultivation-actions card">
          <div class="card-header">
            <h3 class="card-title">修炼方式</h3>
          </div>
          
          <div class="action-list">
            <div class="action-item" @click="meditate">
              <div class="action-icon">🧘</div>
              <div class="action-info">
                <div class="action-name">冥想感悟</div>
                <div class="action-desc">静心冥想，感悟天地之道</div>
                <div class="action-effect">
                  <span class="effect-icon">✨</span>
                  <span class="effect-text">+10~30 经验</span>
                </div>
              </div>
              <div class="action-arrow">→</div>
            </div>
            
            <div class="action-item" @click="absorbSpirit" :class="{ disabled: gameStore.player.spirit < 20 }">
              <div class="action-icon">✨</div>
              <div class="action-info">
                <div class="action-name">吸收灵气</div>
                <div class="action-desc">吸收周围灵气强化自身</div>
                <div class="action-effect">
                  <span class="effect-icon">⭐</span>
                  <span class="effect-text">+20~50 经验</span>
                  <span class="effect-cost">消耗 20 灵力</span>
                </div>
              </div>
              <div class="action-arrow">→</div>
            </div>
            
            <div class="action-item" @click="useSpiritStone" :class="{ disabled: !hasSpiritStones }">
              <div class="action-icon">💎</div>
              <div class="action-info">
                <div class="action-name">炼化灵石</div>
                <div class="action-desc">炼化灵石快速提升修为</div>
                <div class="action-effect">
                  <span class="effect-icon">🌟</span>
                  <span class="effect-text">+50~100 经验</span>
                  <span class="effect-cost">消耗 1 灵石</span>
                </div>
              </div>
              <div class="action-arrow">→</div>
            </div>
            
            <div class="action-item breakthrough" :class="{ disabled: !canBreakthrough }" @click="attemptBreakthrough">
              <div class="action-icon">🌟</div>
              <div class="action-info">
                <div class="action-name">尝试突破</div>
                <div class="action-desc">冲击下一境界</div>
                <div class="action-effect" :class="canBreakthrough ? 'ready' : 'not-ready'">
                  {{ canBreakthrough ? '✓ 可以尝试突破' : '✗ 经验不足' }}
                </div>
              </div>
              <div class="action-arrow">→</div>
            </div>
          </div>
        </div>
        
        <div class="stats-section card">
          <div class="card-header">
            <h3 class="card-title">属性</h3>
          </div>
          
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-icon">💪</div>
              <div class="stat-info">
                <span class="stat-name">力量</span>
                <span class="stat-value">{{ gameStore.player.stats.strength }}</span>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">🏃</div>
              <div class="stat-info">
                <span class="stat-name">敏捷</span>
                <span class="stat-value">{{ gameStore.player.stats.agility }}</span>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">🧠</div>
              <div class="stat-info">
                <span class="stat-name">智力</span>
                <span class="stat-value">{{ gameStore.player.stats.intelligence }}</span>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">🎯</div>
              <div class="stat-info">
                <span class="stat-name">意志</span>
                <span class="stat-value">{{ gameStore.player.stats.willpower }}</span>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">🍀</div>
              <div class="stat-info">
                <span class="stat-name">幸运</span>
                <span class="stat-value">{{ gameStore.player.stats.luck }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="cultivation-log card">
        <div class="card-header">
          <h3 class="card-title">修炼记录</h3>
          <button class="btn btn-sm" @click="clearLogs" v-if="cultivationLogs.length > 0">
            清空
          </button>
        </div>
        <div class="log-list scrollbar-thin">
          <div v-for="log in cultivationLogs" :key="log.id" class="log-item">
            <span class="log-time">{{ formatTime(log.timestamp) }}</span>
            <span class="log-message">{{ log.message }}</span>
          </div>
          <div v-if="cultivationLogs.length === 0" class="no-logs">
            <div class="empty-icon">📜</div>
            <p>开始你的修炼之旅吧</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="breakthrough-modal" v-if="showBreakthrough" @click="showBreakthrough = false">
      <div class="modal-content" @click.stop>
        <div class="modal-icon" :class="breakthroughSuccess ? 'success' : 'fail'">
          {{ breakthroughSuccess ? '🌟' : '💔' }}
        </div>
        <h3 class="modal-title">{{ breakthroughSuccess ? '突破成功!' : '突破失败' }}</h3>
        <p class="modal-desc" v-if="breakthroughSuccess">
          恭喜你突破到 {{ gameStore.player.realm.name }}!
        </p>
        <p class="modal-desc" v-else>
          突破失败，继续努力修炼
        </p>
        <button class="btn btn-primary" @click="showBreakthrough = false">确定</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGameStore } from '@/stores/game'
import { realms } from '../../../data/realms'

const gameStore = useGameStore()

const cultivationLogs = ref<{ id: string; timestamp: number; message: string }[]>([])
const showBreakthrough = ref(false)
const breakthroughSuccess = ref(false)

const expPercent = computed(() => {
  const next = gameStore.nextRealm
  if (!next) return 100
  return Math.min(100, (gameStore.player.realm.exp / next.expRequired) * 100)
})

const canBreakthrough = computed(() => {
  const next = gameStore.nextRealm
  if (!next) return false
  return gameStore.player.realm.exp >= next.expRequired
})

const hasSpiritStones = computed(() => {
  return gameStore.getItemCount('spirit_stone_low') > 0
})

function getRealmIcon(): string {
  const level = gameStore.player.realm.level
  if (level === 0) return '👤'
  if (level < 10) return '🌟'
  if (level < 13) return '💫'
  if (level < 16) return '⭐'
  if (level < 19) return '✨'
  return '🌟'
}

function getRealmDescription(level: number): string {
  const realm = realms.find(r => r.level === level)
  return realm?.description || ''
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString('zh-CN')
}

function addLog(message: string) {
  cultivationLogs.value.unshift({
    id: `log_${Date.now()}`,
    timestamp: Date.now(),
    message
  })
  if (cultivationLogs.value.length > 50) {
    cultivationLogs.value.pop()
  }
}

function clearLogs() {
  cultivationLogs.value = []
}

function meditate() {
  const expGain = Math.floor(Math.random() * 20) + 10
  gameStore.addExp(expGain)
  addLog(`冥想感悟，获得 ${expGain} 点经验`)
}

function absorbSpirit() {
  if (gameStore.player.spirit < 20) {
    addLog('灵力不足，无法吸收灵气')
    return
  }
  
  gameStore.player.spirit -= 20
  const expGain = Math.floor(Math.random() * 30) + 20
  gameStore.addExp(expGain)
  addLog(`吸收灵气，获得 ${expGain} 点经验`)
}

function useSpiritStone() {
  if (!hasSpiritStones.value) {
    addLog('没有灵石可炼化')
    return
  }
  
  gameStore.removeItem('spirit_stone_low', 1)
  const expGain = Math.floor(Math.random() * 50) + 50
  gameStore.addExp(expGain)
  addLog(`炼化灵石，获得 ${expGain} 点经验`)
}

function attemptBreakthrough() {
  if (!canBreakthrough.value) return
  
  const success = Math.random() < 0.7
  
  if (success) {
    gameStore.breakthrough()
    addLog(`突破成功！进入 ${gameStore.player.realm.name}`)
  } else {
    gameStore.player.realm.exp = Math.floor(gameStore.player.realm.exp * 0.8)
    addLog('突破失败，损失部分修为')
  }
  
  breakthroughSuccess.value = success
  showBreakthrough.value = true
}
</script>

<style scoped>
.cultivation-view {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem;
}

.cultivation-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, var(--color-bg-card), var(--color-bg-secondary));
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.view-title {
  font-family: var(--font-title);
  font-size: var(--font-size-xl);
  color: var(--color-text-accent);
  margin: 0;
}

.cultivation-info {
  display: flex;
  gap: 1rem;
}

.info-item {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.cultivation-content {
  flex: 1;
  display: grid;
  grid-template-columns: 280px 1fr 280px;
  gap: 1rem;
  min-height: 0;
}

.realm-section {
  display: flex;
  flex-direction: column;
}

.realm-display {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.05));
  border: 1px solid var(--color-gold-dark);
  border-radius: var(--radius-lg);
  margin-bottom: 1rem;
}

.realm-icon-wrapper {
  position: relative;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.realm-icon {
  font-size: 2.5rem;
  z-index: 1;
}

.realm-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 56px;
  height: 56px;
  background: var(--color-gold);
  border-radius: 50%;
  opacity: 0.3;
  filter: blur(12px);
  animation: pulse 2s ease-in-out infinite;
}

.realm-info {
  flex: 1;
}

.realm-name {
  font-family: var(--font-title);
  font-size: var(--font-size-lg);
  color: var(--color-gold);
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.realm-level {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.exp-section {
  margin-bottom: 1rem;
}

.exp-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.exp-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.exp-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}

.exp-bar-container {
  position: relative;
}

.exp-bar {
  height: 8px;
  background: var(--color-bg-tertiary);
  border-radius: 4px;
  overflow: hidden;
}

.exp-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-purple-dark), var(--color-purple));
  transition: width var(--transition-base);
  border-radius: 4px;
}

.exp-glow {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.next-realm {
  padding: 0.75rem;
  background: var(--color-bg-tertiary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.next-realm-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.next-icon {
  font-size: 1rem;
}

.next-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.next-realm-name {
  font-family: var(--font-title);
  font-size: var(--font-size-base);
  color: var(--color-text-accent);
  margin-bottom: 0.25rem;
}

.next-realm-desc {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  line-height: 1.4;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 0;
}

.cultivation-actions {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.action-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  overflow-y: auto;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: linear-gradient(135deg, var(--color-bg-card), var(--color-bg-tertiary));
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.action-item:hover:not(.disabled) {
  transform: translateX(4px);
  border-color: var(--color-gold);
  box-shadow: var(--shadow-glow);
}

.action-item.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-item.breakthrough {
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0.05));
  border-color: var(--color-gold-dark);
}

.action-item.breakthrough:hover:not(.disabled) {
  border-color: var(--color-gold);
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
}

.action-icon {
  font-size: 2rem;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-secondary);
  border-radius: var(--radius-md);
}

.action-info {
  flex: 1;
}

.action-name {
  font-family: var(--font-title);
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
}

.action-desc {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-bottom: 0.25rem;
}

.action-effect {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--font-size-xs);
}

.effect-icon {
  font-size: 0.875rem;
}

.effect-text {
  color: var(--color-jade-light);
}

.effect-cost {
  color: var(--color-red-light);
}

.action-effect.ready {
  color: var(--color-jade-light);
}

.action-effect.not-ready {
  color: var(--color-red-light);
}

.action-arrow {
  font-size: 1.5rem;
  color: var(--color-text-muted);
}

.stats-section {
  flex-shrink: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 0.75rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
}

.stat-icon {
  font-size: 1.25rem;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-name {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.stat-value {
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  font-weight: 600;
}

.cultivation-log {
  display: flex;
  flex-direction: column;
  max-height: 100%;
}

.log-list {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.log-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.5rem;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
}

.log-time {
  color: var(--color-text-muted);
}

.log-message {
  color: var(--color-text-secondary);
}

.no-logs {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--color-text-muted);
}

.no-logs .empty-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  opacity: 0.5;
}

.breakthrough-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  text-align: center;
  min-width: 280px;
}

.modal-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.modal-icon.success {
  color: var(--color-gold);
}

.modal-icon.fail {
  color: var(--color-red);
}

.modal-title {
  font-family: var(--font-title);
  font-size: var(--font-size-xl);
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
}

.modal-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
}

@media (max-width: 1200px) {
  .cultivation-content {
    grid-template-columns: 1fr;
  }
  
  .realm-section {
    order: -2;
  }
  
  .cultivation-log {
    order: -1;
    max-height: 200px;
  }
}
</style>
