<template>
  <div v-if="showGuide" class="guide-overlay">
    <div class="guide-highlight" :style="highlightStyle"></div>
    
    <div class="guide-tooltip" :style="tooltipStyle" :class="tooltipPosition">
      <div class="tooltip-header">
        <div class="tooltip-step">
          <span class="step-current">{{ currentStepIndex + 1 }}</span>
          <span class="step-divider">/</span>
          <span class="step-total">{{ steps.length }}</span>
        </div>
        <h3 class="tooltip-title">{{ currentStep.title }}</h3>
        <button class="skip-btn" @click="skipGuide">跳过</button>
      </div>
      
      <div class="tooltip-body">
        <div class="tooltip-icon">{{ currentStep.icon }}</div>
        <p class="tooltip-content">{{ currentStep.content }}</p>
        
        <div v-if="currentStep.tips" class="tooltip-tips">
          <div v-for="(tip, index) in currentStep.tips" :key="index" class="tip-item">
            <span class="tip-bullet">•</span>
            <span class="tip-text">{{ tip }}</span>
          </div>
        </div>
      </div>
      
      <div class="tooltip-footer">
        <button 
          v-if="currentStepIndex > 0" 
          class="guide-btn secondary" 
          @click="prevStep"
        >
          上一步
        </button>
        <div class="footer-spacer"></div>
        <button 
          class="guide-btn primary" 
          @click="nextStep"
        >
          {{ currentStepIndex === steps.length - 1 ? '完成' : '下一步' }}
        </button>
      </div>
      
      <div class="tooltip-progress">
        <div 
          v-for="(step, index) in steps" 
          :key="index" 
          :class="['progress-dot', { active: index === currentStepIndex, completed: index < currentStepIndex }]"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface GuideStep {
  target: string
  title: string
  content: string
  icon: string
  tips?: string[]
  position?: 'top' | 'bottom' | 'left' | 'right'
}

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  close: []
  complete: []
}>()

const showGuide = computed(() => props.show)
const currentStepIndex = ref(0)

const steps: GuideStep[] = [
  {
    target: '.game-title',
    title: '欢迎来到修仙世界！',
    content: '这是你的修仙之旅的起点。在这里，你将体验从凡人到仙人的蜕变过程。',
    icon: '🏔️',
    tips: [
      '游戏采用回合制，每月30回合',
      '合理规划时间，平衡修炼与探索',
      '注意资源管理，灵石和灵气都很重要'
    ],
    position: 'bottom'
  },
  {
    target: '.time-display',
    title: '时间与回合',
    content: '这里显示当前的游戏时间、季节和剩余回合数。回合是游戏的核心资源。',
    icon: '⏰',
    tips: [
      '每回合可以执行一个行动',
      '回合耗尽后将进入下个月',
      '不同季节会影响修炼效率'
    ],
    position: 'bottom'
  },
  {
    target: '.left-panel',
    title: '角色状态',
    content: '左侧面板显示你的角色状态，包括生命、灵气、修为等重要信息。',
    icon: '👤',
    tips: [
      '生命值降为0会导致死亡',
      '灵气用于修炼和施法',
      '修为达到一定程度可以突破境界'
    ],
    position: 'right'
  },
  {
    target: '.map-container',
    title: '世界地图',
    content: '中央是游戏地图，你可以在这里移动角色、探索世界、发现奇遇。',
    icon: '🗺️',
    tips: [
      '使用WASD或方向键移动',
      '点击地图可以快速移动',
      '探索不同区域可以发现资源'
    ],
    position: 'top'
  },
  {
    target: '.action-bar',
    title: '主要操作',
    content: '这里是最常用的操作按钮，包括修炼、探索、炼制、背包和任务。',
    icon: '🎮',
    tips: [
      '修炼可以提升修为',
      '探索可以发现新地点和事件',
      '炼制可以制作丹药和法器',
      '使用快捷键C/X/V/I/Q快速操作'
    ],
    position: 'top'
  },
  {
    target: '.right-panel',
    title: '快捷面板',
    content: '右侧面板提供快捷操作、当前位置信息和事件日志。',
    icon: '⚡',
    tips: [
      '快捷操作消耗回合较少',
      '事件日志记录重要信息',
      '注意查看当前位置的描述'
    ],
    position: 'left'
  }
]

const currentStep = computed(() => steps[currentStepIndex.value])

const highlightStyle = computed(() => {
  const target = document.querySelector(currentStep.value.target)
  if (!target) return {}
  
  const rect = target.getBoundingClientRect()
  return {
    left: `${rect.left - 8}px`,
    top: `${rect.top - 8}px`,
    width: `${rect.width + 16}px`,
    height: `${rect.height + 16}px`
  }
})

const tooltipPosition = computed(() => currentStep.value.position || 'bottom')

const tooltipStyle = computed(() => {
  const target = document.querySelector(currentStep.value.target)
  if (!target) return {}
  
  const rect = target.getBoundingClientRect()
  const position = currentStep.value.position || 'bottom'
  
  const styles: Record<string, string> = {}
  
  switch (position) {
    case 'top':
      styles.left = `${rect.left + rect.width / 2}px`
      styles.top = `${rect.top - 16}px`
      styles.transform = 'translate(-50%, -100%)'
      break
    case 'bottom':
      styles.left = `${rect.left + rect.width / 2}px`
      styles.top = `${rect.bottom + 16}px`
      styles.transform = 'translate(-50%, 0)'
      break
    case 'left':
      styles.left = `${rect.left - 16}px`
      styles.top = `${rect.top + rect.height / 2}px`
      styles.transform = 'translate(-100%, -50%)'
      break
    case 'right':
      styles.left = `${rect.right + 16}px`
      styles.top = `${rect.top + rect.height / 2}px`
      styles.transform = 'translate(0, -50%)'
      break
  }
  
  return styles
})

function nextStep() {
  if (currentStepIndex.value < steps.length - 1) {
    currentStepIndex.value++
  } else {
    completeGuide()
  }
}

function prevStep() {
  if (currentStepIndex.value > 0) {
    currentStepIndex.value--
  }
}

function skipGuide() {
  emit('close')
}

function completeGuide() {
  emit('complete')
  emit('close')
}

onMounted(() => {
  if (showGuide.value) {
    document.body.style.overflow = 'hidden'
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
.guide-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  pointer-events: none;
}

.guide-highlight {
  position: absolute;
  background: transparent;
  border: 4px solid var(--pixel-color-accent);
  box-shadow: 
    0 0 0 9999px rgba(0, 0, 0, 0.7),
    0 0 20px rgba(255, 204, 0, 0.5);
  pointer-events: auto;
  animation: pulse 2s ease-in-out infinite;
  z-index: 10000;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 
      0 0 0 9999px rgba(0, 0, 0, 0.7),
      0 0 20px rgba(255, 204, 0, 0.5);
  }
  50% {
    box-shadow: 
      0 0 0 9999px rgba(0, 0, 0, 0.7),
      0 0 40px rgba(255, 204, 0, 0.8);
  }
}

.guide-tooltip {
  position: absolute;
  background: linear-gradient(135deg, var(--pixel-color-bg-light) 0%, var(--pixel-color-bg) 100%);
  border: 4px solid var(--pixel-color-accent);
  box-shadow: 
    0 0 0 4px var(--pixel-color-bg-dark),
    8px 8px 0 rgba(0, 0, 0, 0.5);
  max-width: 400px;
  min-width: 300px;
  pointer-events: auto;
  z-index: 10001;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

.guide-tooltip.top {
  animation-name: fadeInTop;
}

@keyframes fadeInTop {
  from {
    opacity: 0;
    transform: translate(-50%, -100%) translateY(10px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -100%) translateY(0);
  }
}

.guide-tooltip.bottom {
  animation-name: fadeInBottom;
}

@keyframes fadeInBottom {
  from {
    opacity: 0;
    transform: translate(-50%, 0) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0) translateY(0);
  }
}

.guide-tooltip.left {
  animation-name: fadeInLeft;
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translate(-100%, -50%) translateX(10px);
  }
  to {
    opacity: 1;
    transform: translate(-100%, -50%) translateX(0);
  }
}

.guide-tooltip.right {
  animation-name: fadeInRight;
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translate(0, -50%) translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translate(0, -50%) translateX(0);
  }
}

.tooltip-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: rgba(0, 0, 0, 0.2);
  border-bottom: 3px solid var(--pixel-color-secondary);
}

.tooltip-step {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-family: var(--pixel-font);
  font-size: 10px;
  color: var(--pixel-color-secondary);
}

.step-current {
  color: var(--pixel-color-accent);
  font-size: 12px;
}

.step-divider {
  color: var(--pixel-color-secondary);
}

.step-total {
  color: var(--pixel-color-secondary);
}

.tooltip-title {
  flex: 1;
  font-family: var(--pixel-font);
  font-size: 12px;
  color: var(--pixel-color-accent);
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.8);
  margin: 0;
}

.skip-btn {
  font-family: var(--pixel-font);
  font-size: 8px;
  color: var(--pixel-color-secondary);
  background: transparent;
  border: 2px solid var(--pixel-color-secondary);
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.skip-btn:hover {
  color: var(--pixel-color-bg-dark);
  background: var(--pixel-color-secondary);
}

.tooltip-body {
  padding: 1.5rem;
}

.tooltip-icon {
  font-size: 32px;
  text-align: center;
  margin-bottom: 1rem;
  filter: drop-shadow(2px 2px 0 rgba(0, 0, 0, 0.5));
}

.tooltip-content {
  font-family: var(--pixel-font);
  font-size: 10px;
  color: var(--pixel-color-primary);
  line-height: 1.8;
  margin: 0 0 1rem 0;
  text-align: center;
}

.tooltip-tips {
  background: rgba(0, 0, 0, 0.2);
  border: 2px solid var(--pixel-color-secondary);
  padding: 0.75rem;
  margin-top: 1rem;
}

.tip-item {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.tip-item:last-child {
  margin-bottom: 0;
}

.tip-bullet {
  color: var(--pixel-color-accent);
  font-size: 12px;
}

.tip-text {
  font-family: var(--pixel-font);
  font-size: 8px;
  color: var(--pixel-color-secondary);
  line-height: 1.6;
}

.tooltip-footer {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: rgba(0, 0, 0, 0.2);
  border-top: 3px solid var(--pixel-color-secondary);
}

.footer-spacer {
  flex: 1;
}

.guide-btn {
  font-family: var(--pixel-font);
  font-size: 10px;
  padding: 0.5rem 1rem;
  border: 3px solid var(--pixel-color-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.guide-btn.primary {
  background: linear-gradient(180deg, #f4f4f4 0%, #d4d4d4 50%, #a4a4a4 100%);
  color: var(--pixel-color-bg-dark);
  border-color: var(--pixel-color-accent);
}

.guide-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.guide-btn.secondary {
  background: transparent;
  color: var(--pixel-color-primary);
}

.guide-btn.secondary:hover {
  background: var(--pixel-color-bg-light);
}

.tooltip-progress {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.1);
}

.progress-dot {
  width: 8px;
  height: 8px;
  background: var(--pixel-color-secondary);
  border: 2px solid var(--pixel-color-secondary);
  transition: all 0.3s;
}

.progress-dot.active {
  background: var(--pixel-color-accent);
  border-color: var(--pixel-color-accent);
  transform: scale(1.2);
}

.progress-dot.completed {
  background: var(--pixel-color-green);
  border-color: var(--pixel-color-green);
}
</style>
