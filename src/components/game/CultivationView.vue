<script setup lang="ts">
import { computed, ref } from 'vue'
import { useGameSystemStore } from '@/stores/gameSystem'

const gameStore = useGameSystemStore()

const cultivation = computed(() => gameStore.playerData.cultivation)
const resources = computed(() => gameStore.playerData.resources)
const currentRealm = computed(() => gameStore.currentRealm)
const nextRealm = computed(() => gameStore.nextRealm)

const showBreakthrough = ref(false)

function canCultivate(): boolean {
  return resources.value.spiritEnergy >= 10 && gameStore.gameState.turnsRemaining > 0
}

function cultivate() {
  if (!canCultivate()) return
  const success = gameStore.cultivate()
  if (!success) {
    alert('本月回合已用完，请等待下月！')
  }
}

function canBreakthrough(): boolean {
  const realm = cultivation.value.realm
  const realmInfo = currentRealm.value
  return realmInfo ? realm.stage >= realmInfo.stages : false
}

function attemptBreakthrough() {
  const success = gameStore.attemptBreakthrough()
  showBreakthrough.value = false
  
  if (success) {
    alert('突破成功！境界提升！')
  } else {
    alert('突破失败，修为受损...')
  }
}
</script>

<template>
  <div class="cultivation-view">
    <div class="cultivation-header">
      <h2>🧘 修炼</h2>
      <p class="realm-info">
        当前境界: <span class="realm-name">{{ cultivation.realm.name }}</span>
        第{{ cultivation.realm.stage }}层
      </p>
    </div>
    
    <div class="cultivation-content">
      <div class="main-section">
        <div class="realm-card">
          <div class="realm-header">
            <h3>{{ cultivation.realm.name }}</h3>
            <span class="stage">{{ cultivation.realm.stage }}/{{ currentRealm?.stages || 1 }}层</span>
          </div>
          
          <div class="exp-section">
            <div class="exp-info">
              <span>修为进度</span>
              <span>{{ cultivation.realm.exp }} / {{ cultivation.realm.expToNext }}</span>
            </div>
            <div class="progress-bar large">
              <div 
                class="progress-fill cultivation"
                :style="{ width: `${(cultivation.realm.exp / cultivation.realm.expToNext) * 100}%` }"
              ></div>
            </div>
          </div>
          
          <div class="realm-stats">
            <div class="stat">
              <span class="stat-label">寿命</span>
              <span class="stat-value">{{ cultivation.lifespan }} / {{ cultivation.maxLifespan }}</span>
            </div>
            <div class="stat">
              <span class="stat-label">修炼速度</span>
              <span class="stat-value">{{ (cultivation.cultivationSpeed * 100).toFixed(0) }}%</span>
            </div>
            <div class="stat">
              <span class="stat-label">突破概率</span>
              <span class="stat-value">{{ (cultivation.breakthroughChance * 100).toFixed(0) }}%</span>
            </div>
          </div>
          
          <div class="action-buttons">
            <button
              class="cultivate-btn"
              :disabled="!canCultivate()"
              @click="cultivate"
            >
              {{ canCultivate() ? '修炼 (消耗10灵气)' : (gameStore.gameState.turnsRemaining <= 0 ? '本月回合已用完' : '灵气不足') }}
            </button>
            
            <button
              v-if="canBreakthrough()"
              class="breakthrough-btn"
              @click="showBreakthrough = true"
            >
              尝试突破
            </button>
          </div>
        </div>
        
        <div v-if="nextRealm" class="next-realm-card">
          <h4>下一境界: {{ nextRealm.name }}</h4>
          <div class="next-realm-info">
            <div class="info-item">
              <span class="label">阶段数</span>
              <span class="value">{{ nextRealm.stages }}层</span>
            </div>
            <div class="info-item">
              <span class="label">寿命上限</span>
              <span class="value">{{ nextRealm.lifespan }}年</span>
            </div>
            <div class="info-item">
              <span class="label">每层修为</span>
              <span class="value">{{ nextRealm.expPerStage }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="techniques-section">
        <h3>📜 功法</h3>
        <div class="techniques-list">
          <div
            v-for="tech in cultivation.techniques"
            :key="tech.id"
            class="technique-card"
          >
            <div class="tech-header">
              <span class="tech-icon">{{ tech.icon }}</span>
              <div class="tech-info">
                <h4>{{ tech.name }}</h4>
                <span class="tech-type">{{ tech.type === 'main' ? '主修功法' : '辅修功法' }}</span>
              </div>
              <span class="tech-level">Lv.{{ tech.level }}</span>
            </div>
            
            <p class="tech-desc">{{ tech.description }}</p>
            
            <div class="tech-progress">
              <div class="progress-info">
                <span>熟练度</span>
                <span>{{ tech.exp }} / {{ tech.expToNext }}</span>
              </div>
              <div class="progress-bar">
                <div 
                  class="progress-fill technique"
                  :style="{ width: `${(tech.exp / tech.expToNext) * 100}%` }"
                ></div>
              </div>
            </div>
            
            <div class="tech-effects">
              <div
                v-for="(effect, index) in tech.effects"
                :key="index"
                class="effect-item"
              >
                <span class="effect-type">{{ effect.type }}</span>
                <span class="effect-value">+{{ (effect.value * 100).toFixed(0) }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="showBreakthrough" class="breakthrough-modal" @click="showBreakthrough = false">
      <div class="modal-content" @click.stop>
        <h3>突破 {{ nextRealm?.name }}</h3>
        <p>突破成功率: {{ (cultivation.breakthroughChance * 100).toFixed(0) }}%</p>
        <p>失败将损失部分修为</p>
        <div class="modal-buttons">
          <button class="confirm-btn" @click="attemptBreakthrough">确认突破</button>
          <button class="cancel-btn" @click="showBreakthrough = false">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cultivation-view {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.cultivation-header {
  margin-bottom: 1.5rem;
}

.cultivation-header h2 {
  font-family: var(--font-title);
  font-size: 1.75rem;
  color: var(--color-gold);
  margin-bottom: 0.5rem;
}

.realm-info {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
}

.realm-name {
  color: var(--color-gold);
  font-weight: 600;
}

.cultivation-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  flex: 1;
  overflow-y: auto;
}

.main-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.realm-card {
  background: var(--color-bg-secondary);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
}

.realm-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.realm-header h3 {
  font-family: var(--font-title);
  font-size: 1.5rem;
  color: var(--color-gold);
}

.stage {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
}

.exp-section {
  margin-bottom: 1.5rem;
}

.exp-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.progress-bar {
  height: 8px;
  background: var(--color-bg-primary);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.progress-bar.large {
  height: 12px;
}

.progress-fill {
  height: 100%;
  transition: width 0.3s;
}

.progress-fill.cultivation {
  background: linear-gradient(90deg, var(--color-gold-dark), var(--color-gold));
}

.progress-fill.technique {
  background: linear-gradient(90deg, #9b59b6, #c39bd3);
}

.realm-stats {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.stat {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.stat-value {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  font-weight: 500;
}

.action-buttons {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
}

.cultivate-btn,
.breakthrough-btn {
  flex: 1;
  padding: 0.875rem;
  border: none;
  border-radius: var(--radius-md);
  font-family: var(--font-title);
  font-size: var(--font-size-base);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.cultivate-btn {
  background: linear-gradient(135deg, var(--color-gold-dark), var(--color-gold));
  color: var(--color-bg-primary);
}

.cultivate-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
}

.cultivate-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.breakthrough-btn {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
}

.breakthrough-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
}

.next-realm-card {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
}

.next-realm-card h4 {
  font-family: var(--font-title);
  font-size: var(--font-size-lg);
  color: var(--color-text-primary);
  margin-bottom: 1rem;
}

.next-realm-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-sm);
}

.info-item .label {
  color: var(--color-text-muted);
}

.info-item .value {
  color: var(--color-text-primary);
  font-weight: 500;
}

.techniques-section {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
}

.techniques-section h3 {
  font-family: var(--font-title);
  font-size: var(--font-size-lg);
  color: var(--color-gold);
  margin-bottom: 1rem;
}

.techniques-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.technique-card {
  padding: 1rem;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
}

.tech-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.tech-icon {
  font-size: 1.5rem;
}

.tech-info {
  flex: 1;
}

.tech-info h4 {
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
}

.tech-type {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.tech-level {
  font-size: var(--font-size-sm);
  color: var(--color-gold);
  font-weight: 600;
}

.tech-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: 0.75rem;
}

.tech-progress {
  margin-bottom: 0.75rem;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-bottom: 0.25rem;
}

.tech-effects {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.effect-item {
  padding: 0.25rem 0.5rem;
  background: var(--color-bg-secondary);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
}

.effect-type {
  color: var(--color-text-muted);
  margin-right: 0.25rem;
}

.effect-value {
  color: var(--color-gold);
  font-weight: 600;
}

.breakthrough-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: var(--color-bg-secondary);
  border: 2px solid var(--color-gold);
  border-radius: var(--radius-lg);
  padding: 2rem;
  max-width: 400px;
}

.modal-content h3 {
  font-family: var(--font-title);
  font-size: 1.5rem;
  color: var(--color-gold);
  margin-bottom: 1rem;
}

.modal-content p {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  margin-bottom: 0.5rem;
}

.modal-buttons {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.confirm-btn,
.cancel-btn {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: var(--radius-md);
  font-family: var(--font-title);
  font-size: var(--font-size-base);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.confirm-btn {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
}

.cancel-btn {
  background: var(--color-bg-tertiary);
  color: var(--color-text-secondary);
}
</style>
