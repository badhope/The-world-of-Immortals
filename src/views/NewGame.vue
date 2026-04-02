<template>
  <div class="pixel-new-game">
    <div class="background-effects">
      <div class="pixel-grid-bg"></div>
      <div class="floating-symbols">
        <div v-for="i in 15" :key="i" class="symbol" :style="getSymbolStyle(i)">
          {{ getRandomSymbol() }}
        </div>
      </div>
    </div>
    
    <div class="new-game-content">
      <div class="header-section">
        <PixelButton variant="secondary" size="small" icon="⬅️" @click="goBack">
          返回
        </PixelButton>
        <div class="title-container">
          <h1 class="page-title pixel-title">创建角色</h1>
          <div class="step-indicator">
            <div :class="['step', { active: currentStep >= 1, completed: currentStep > 1 }]">
              <div class="step-number">1</div>
              <div class="step-label">角色信息</div>
            </div>
            <div class="step-line" :class="{ active: currentStep >= 2 }"></div>
            <div :class="['step', { active: currentStep >= 2, completed: currentStep > 2 }]">
              <div class="step-number">2</div>
              <div class="step-label">选择出身</div>
            </div>
            <div class="step-line" :class="{ active: currentStep >= 3 }"></div>
            <div :class="['step', { active: currentStep >= 3 }]">
              <div class="step-number">3</div>
              <div class="step-label">属性分配</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="main-content">
        <transition name="slide-fade" mode="out-in">
          <div v-if="currentStep === 1" key="step1" class="step-content">
            <PixelCard variant="primary" class="step-card">
              <template #header>
                <span class="card-icon">👤</span>
                <span>角色信息</span>
              </template>
              
              <div class="form-section">
                <div class="form-group">
                  <label class="form-label">角色名称</label>
                  <input 
                    v-model="character.name" 
                    type="text" 
                    class="pixel-input"
                    placeholder="请输入角色名称"
                    maxlength="10"
                  >
                </div>
                
                <div class="form-group">
                  <label class="form-label">性别</label>
                  <div class="gender-options">
                    <div 
                      :class="['gender-option', { selected: character.gender === 'male' }]"
                      @click="character.gender = 'male'"
                    >
                      <span class="gender-icon">👨</span>
                      <span class="gender-text">男</span>
                    </div>
                    <div 
                      :class="['gender-option', { selected: character.gender === 'female' }]"
                      @click="character.gender = 'female'"
                    >
                      <span class="gender-icon">👩</span>
                      <span class="gender-text">女</span>
                    </div>
                  </div>
                </div>
                
                <div class="form-group">
                  <label class="form-label">角色头像</label>
                  <div class="avatar-options">
                    <div 
                      v-for="avatar in avatarOptions" 
                      :key="avatar"
                      :class="['avatar-option', { selected: character.avatar === avatar }]"
                      @click="character.avatar = avatar"
                    >
                      {{ avatar }}
                    </div>
                  </div>
                </div>
              </div>
            </PixelCard>
          </div>
          
          <div v-else-if="currentStep === 2" key="step2" class="step-content">
            <PixelCard variant="success" class="step-card">
              <template #header>
                <span class="card-icon">🎯</span>
                <span>选择出身</span>
              </template>
              
              <div class="origin-grid">
                <div 
                  v-for="origin in originOptions" 
                  :key="origin.id"
                  :class="['origin-card', { selected: character.origin === origin.id }]"
                  @click="selectOrigin(origin.id)"
                >
                  <div class="origin-icon">{{ origin.icon }}</div>
                  <div class="origin-name">{{ origin.name }}</div>
                  <div class="origin-desc">{{ origin.description }}</div>
                  <div class="origin-bonus">
                    <span v-for="(bonus, index) in origin.bonuses" :key="index" class="bonus-tag">
                      {{ bonus }}
                    </span>
                  </div>
                </div>
              </div>
            </PixelCard>
          </div>
          
          <div v-else-if="currentStep === 3" key="step3" class="step-content">
            <PixelCard variant="warning" class="step-card">
              <template #header>
                <span class="card-icon">✨</span>
                <span>属性分配</span>
              </template>
              
              <div class="attributes-section">
                <div class="points-remaining">
                  剩余点数: <span class="points-value">{{ remainingPoints }}</span>
                </div>
                
                <div class="attribute-list">
                  <div v-for="attr in attributes" :key="attr.id" class="attribute-item">
                    <div class="attr-header">
                      <span class="attr-icon">{{ attr.icon }}</span>
                      <span class="attr-name">{{ attr.name }}</span>
                      <span class="attr-value">{{ character.attributes[attr.id] }}</span>
                    </div>
                    <div class="attr-controls">
                      <PixelButton 
                        variant="danger" 
                        size="small" 
                        @click="decreaseAttribute(attr.id)"
                        :disabled="character.attributes[attr.id] <= 1"
                      >
                        -
                      </PixelButton>
                      <div class="attr-bar">
                        <div 
                          class="attr-bar-fill" 
                          :style="{ width: `${(character.attributes[attr.id] / 10) * 100}%` }"
                        ></div>
                      </div>
                      <PixelButton 
                        variant="success" 
                        size="small" 
                        @click="increaseAttribute(attr.id)"
                        :disabled="remainingPoints <= 0"
                      >
                        +
                      </PixelButton>
                    </div>
                  </div>
                </div>
              </div>
            </PixelCard>
          </div>
        </transition>
      </div>
      
      <div class="footer-section">
        <div class="navigation-buttons">
          <PixelButton 
            v-if="currentStep > 1"
            variant="secondary" 
            size="large" 
            icon="⬅️"
            @click="prevStep"
          >
            上一步
          </PixelButton>
          
          <PixelButton 
            v-if="currentStep < 3"
            variant="primary" 
            size="large" 
            icon="➡️"
            @click="nextStep"
          >
            下一步
          </PixelButton>
          
          <PixelButton 
            v-if="currentStep === 3"
            variant="success" 
            size="large" 
            icon="⚔️"
            @click="startGame"
          >
            开始冒险
          </PixelButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import PixelButton from '@/components/ui/PixelButton.vue'
import PixelCard from '@/components/ui/PixelCard.vue'

const router = useRouter()

const currentStep = ref(1)
const remainingPoints = ref(5)

const character = ref({
  name: '',
  gender: 'male',
  avatar: '🧙',
  origin: '',
  attributes: {
    strength: 5,
    agility: 5,
    intelligence: 5,
    constitution: 5,
    charisma: 5
  } as Record<string, number>
})

const avatarOptions = ['🧙', '🧝', '🧛', '🧟', '👨', '👩', '🧑', '👴', '👵']

const originOptions = [
  {
    id: 'noble',
    name: '世家子弟',
    icon: '👑',
    description: '出生于修仙世家，资源丰富',
    bonuses: ['+灵石', '+人脉']
  },
  {
    id: 'commoner',
    name: '平民百姓',
    icon: '🌾',
    description: '普通家庭出身，勤奋努力',
    bonuses: ['+意志', '+机缘']
  },
  {
    id: 'merchant',
    name: '商贾之家',
    icon: '💰',
    description: '商人家庭，精通交易',
    bonuses: ['+财富', '+口才']
  },
  {
    id: 'orphan',
    name: '孤儿流浪',
    icon: '🌙',
    description: '无依无靠，独立坚强',
    bonuses: ['+生存', '+敏捷']
  }
]

const attributes = [
  { id: 'strength', name: '力量', icon: '💪' },
  { id: 'agility', name: '敏捷', icon: '⚡' },
  { id: 'intelligence', name: '智力', icon: '🧠' },
  { id: 'constitution', name: '体质', icon: '❤️' },
  { id: 'charisma', name: '魅力', icon: '✨' }
]

function selectOrigin(originId: string) {
  character.value.origin = originId
}

function increaseAttribute(attrId: string) {
  if (remainingPoints.value > 0) {
    character.value.attributes[attrId]++
    remainingPoints.value--
  }
}

function decreaseAttribute(attrId: string) {
  if (character.value.attributes[attrId] > 1) {
    character.value.attributes[attrId]--
    remainingPoints.value++
  }
}

function nextStep() {
  if (currentStep.value < 3) {
    currentStep.value++
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

function startGame() {
  if (!character.value.name) {
    alert('请输入角色名称！')
    return
  }
  if (!character.value.origin) {
    alert('请选择出身！')
    return
  }
  
  localStorage.setItem('immortalWorldCharacter', JSON.stringify(character.value))
  router.push('/game')
}

function goBack() {
  router.push('/')
}

function getRandomSymbol() {
  const symbols = ['☯', '✦', '☆', '⚡', '🔥', '💧', '🌿', '⚔️', '🛡️', '💎']
  return symbols[Math.floor(Math.random() * symbols.length)]
}

function getSymbolStyle(index: number) {
  const x = Math.random() * 100
  const y = Math.random() * 100
  const delay = Math.random() * 10
  const duration = 10 + Math.random() * 10
  
  return {
    left: `${x}%`,
    top: `${y}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  }
}
</script>

<style scoped>
.pixel-new-game {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--pixel-color-bg);
  position: relative;
  overflow: hidden;
  padding: 2rem;
}

.background-effects {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.pixel-grid-bg {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 32px 32px;
}

.floating-symbols {
  position: absolute;
  inset: 0;
}

.symbol {
  position: absolute;
  font-size: 24px;
  opacity: 0.1;
  animation: floatSymbol 15s ease-in-out infinite;
}

@keyframes floatSymbol {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.1;
  }
  50% {
    transform: translateY(-50px) rotate(180deg);
    opacity: 0.3;
  }
}

.new-game-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
}

.header-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.title-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.page-title {
  font-size: 28px;
  text-shadow: 
    4px 4px 0 rgba(0, 0, 0, 0.8),
    0 0 20px rgba(255, 204, 0, 0.5);
  letter-spacing: 3px;
}

.step-indicator {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.step-number {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--pixel-font);
  font-size: 16px;
  font-weight: bold;
  background: var(--pixel-color-bg-light);
  border: 4px solid var(--pixel-color-secondary);
  color: var(--pixel-color-secondary);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.step-label {
  font-family: var(--pixel-font);
  font-size: 10px;
  color: var(--pixel-color-secondary);
  text-align: center;
  opacity: 0.7;
  transition: all 0.3s;
}

.step.active .step-number {
  background: var(--pixel-color-accent);
  border-color: var(--pixel-color-highlight);
  color: var(--pixel-color-bg-dark);
  box-shadow: 0 0 16px rgba(255, 204, 0, 0.6);
  transform: scale(1.1);
}

.step.active .step-label {
  color: var(--pixel-color-accent);
  opacity: 1;
  font-weight: bold;
}

.step.completed .step-number {
  background: var(--pixel-color-green);
  border-color: var(--pixel-color-green);
  color: var(--pixel-color-bg-dark);
}

.step.completed .step-label {
  color: var(--pixel-color-green);
  opacity: 1;
}

.step-line {
  width: 60px;
  height: 4px;
  background: var(--pixel-color-secondary);
  transition: all 0.3s;
}

.step-line.active {
  background: linear-gradient(90deg, var(--pixel-color-green) 0%, var(--pixel-color-accent) 100%);
}

.main-content {
  flex: 1;
  overflow-y: auto;
}

.step-content {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.step-card {
  width: 100%;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-family: var(--pixel-font);
  font-size: 10px;
  color: var(--pixel-color-accent);
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.8);
}

.pixel-input {
  font-family: var(--pixel-font);
  font-size: 12px;
  padding: 12px 16px;
  background: var(--pixel-color-bg-dark);
  border: 4px solid var(--pixel-color-secondary);
  color: var(--pixel-color-primary);
  outline: none;
  transition: all 0.2s;
}

.pixel-input:focus {
  border-color: var(--pixel-color-accent);
  box-shadow: 0 0 12px rgba(255, 204, 0, 0.3);
}

.pixel-input::placeholder {
  color: var(--pixel-color-secondary);
}

.gender-options {
  display: flex;
  gap: 1rem;
}

.gender-option {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: var(--pixel-color-bg-dark);
  border: 4px solid var(--pixel-color-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.gender-option:hover {
  border-color: var(--pixel-color-accent);
}

.gender-option.selected {
  background: rgba(255, 204, 0, 0.1);
  border-color: var(--pixel-color-accent);
  box-shadow: 0 0 12px rgba(255, 204, 0, 0.3);
}

.gender-icon {
  font-size: 32px;
  filter: drop-shadow(2px 2px 0 rgba(0, 0, 0, 0.5));
}

.gender-text {
  font-family: var(--pixel-font);
  font-size: 10px;
  color: var(--pixel-color-primary);
}

.avatar-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
  gap: 0.5rem;
}

.avatar-option {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  background: var(--pixel-color-bg-dark);
  border: 4px solid var(--pixel-color-secondary);
  cursor: pointer;
  transition: all 0.2s;
  filter: grayscale(0.5);
}

.avatar-option:hover {
  border-color: var(--pixel-color-accent);
  filter: grayscale(0);
}

.avatar-option.selected {
  background: rgba(255, 204, 0, 0.1);
  border-color: var(--pixel-color-accent);
  filter: grayscale(0);
  box-shadow: 0 0 12px rgba(255, 204, 0, 0.3);
}

.origin-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.origin-card {
  padding: 1rem;
  background: var(--pixel-color-bg-dark);
  border: 4px solid var(--pixel-color-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.origin-card:hover {
  border-color: var(--pixel-color-accent);
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.3);
}

.origin-card.selected {
  background: rgba(255, 204, 0, 0.1);
  border-color: var(--pixel-color-accent);
  box-shadow: 
    0 0 12px rgba(255, 204, 0, 0.3),
    4px 4px 0 rgba(0, 0, 0, 0.3);
}

.origin-icon {
  font-size: 40px;
  text-align: center;
  margin-bottom: 0.5rem;
  filter: drop-shadow(2px 2px 0 rgba(0, 0, 0, 0.5));
}

.origin-name {
  font-family: var(--pixel-font);
  font-size: 12px;
  color: var(--pixel-color-accent);
  text-align: center;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.8);
}

.origin-desc {
  font-family: var(--pixel-font);
  font-size: 8px;
  color: var(--pixel-color-primary);
  text-align: center;
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.origin-bonus {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  justify-content: center;
}

.bonus-tag {
  font-family: var(--pixel-font);
  font-size: 8px;
  color: var(--pixel-color-bg-dark);
  background: var(--pixel-color-green);
  padding: 2px 8px;
  border: 2px solid var(--pixel-color-green-dark);
}

.attributes-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.points-remaining {
  font-family: var(--pixel-font);
  font-size: 12px;
  color: var(--pixel-color-accent);
  text-align: center;
  padding: 0.5rem;
  background: rgba(255, 204, 0, 0.1);
  border: 2px solid var(--pixel-color-accent);
}

.points-value {
  font-size: 16px;
  text-shadow: 0 0 8px rgba(255, 204, 0, 0.5);
}

.attribute-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.attribute-item {
  padding: 0.75rem;
  background: var(--pixel-color-bg-dark);
  border: 2px solid var(--pixel-color-secondary);
}

.attr-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.attr-icon {
  font-size: 20px;
  filter: drop-shadow(2px 2px 0 rgba(0, 0, 0, 0.5));
}

.attr-name {
  font-family: var(--pixel-font);
  font-size: 10px;
  color: var(--pixel-color-primary);
  flex: 1;
}

.attr-value {
  font-family: var(--pixel-font);
  font-size: 14px;
  color: var(--pixel-color-accent);
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.8);
}

.attr-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.attr-bar {
  flex: 1;
  height: 12px;
  background: var(--pixel-color-bg);
  border: 2px solid var(--pixel-color-secondary);
  position: relative;
  overflow: hidden;
}

.attr-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, 
    var(--pixel-color-green-dark) 0%, 
    var(--pixel-color-green) 50%, 
    var(--pixel-color-green-light) 100%
  );
  transition: width 0.3s;
}

.footer-section {
  display: flex;
  justify-content: center;
}

.navigation-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

@media (max-width: 768px) {
  .pixel-new-game {
    padding: 1rem;
  }
  
  .header-section {
    flex-direction: column;
    align-items: stretch;
  }
  
  .page-title {
    font-size: 20px;
    text-align: center;
  }
  
  .step-indicator {
    justify-content: center;
  }
  
  .origin-grid {
    grid-template-columns: 1fr;
  }
  
  .avatar-options {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .navigation-buttons {
    flex-direction: column;
  }
}
</style>
