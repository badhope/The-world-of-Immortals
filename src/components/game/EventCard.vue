<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { GameEvent, EventChoice, AttributeChange } from '@/types/events'

interface Props {
  event: GameEvent
  processing?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  processing: false
})

const emit = defineEmits<{
  choice: [choiceId: string]
  skip: []
}>()

const cardRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const dragStartX = ref(0)
const dragOffset = ref(0)
const selectedChoice = ref<'left' | 'right' | null>(null)

const cardStyle = computed(() => ({
  transform: `translateX(${dragOffset.value}px) rotate(${dragOffset.value * 0.05}deg)`,
  opacity: 1 - Math.abs(dragOffset.value) / 300
}))

const leftChoice = computed(() => props.event.choices[0])
const rightChoice = computed(() => props.event.choices[1])

const dragProgress = computed(() => {
  const maxDrag = 150
  return Math.min(Math.abs(dragOffset.value) / maxDrag, 1)
})

const activeSide = computed(() => {
  if (dragOffset.value < -50) return 'left'
  if (dragOffset.value > 50) return 'right'
  return null
})

function handleMouseDown(event: MouseEvent) {
  if (props.processing) return
  isDragging.value = true
  dragStartX.value = event.clientX
  event.preventDefault()
}

function handleMouseMove(event: MouseEvent) {
  if (!isDragging.value) return
  const diff = event.clientX - dragStartX.value
  dragOffset.value = Math.max(-200, Math.min(200, diff))
}

function handleMouseUp() {
  if (!isDragging.value) return
  isDragging.value = false
  
  if (dragOffset.value < -100 && leftChoice.value) {
    selectChoice('left')
  } else if (dragOffset.value > 100 && rightChoice.value) {
    selectChoice('right')
  } else {
    dragOffset.value = 0
  }
}

function handleTouchStart(event: TouchEvent) {
  if (props.processing) return
  isDragging.value = true
  dragStartX.value = event.touches[0].clientX
}

function handleTouchMove(event: TouchEvent) {
  if (!isDragging.value) return
  const diff = event.touches[0].clientX - dragStartX.value
  dragOffset.value = Math.max(-200, Math.min(200, diff))
}

function handleTouchEnd() {
  handleMouseUp()
}

function selectChoice(side: 'left' | 'right') {
  selectedChoice.value = side
  const choice = side === 'left' ? leftChoice.value : rightChoice.value
  if (choice) {
    setTimeout(() => {
      emit('choice', choice.id)
      dragOffset.value = 0
      selectedChoice.value = null
    }, 300)
  }
}

function getEffectIcon(type: string): string {
  const icons: Record<string, string> = {
    health: '❤️',
    spirit: '💫',
    cultivation_exp: '⭐',
    reputation: '👑',
    wealth: '💰',
    karma: '☯️',
    insight: '👁️',
    item_add: '📦',
    item_remove: '🗑️'
  }
  return icons[type] || '✨'
}

function getEffectText(effect: { type: string; value: number | string }): string {
  const value = typeof effect.value === 'number' 
    ? (effect.value > 0 ? `+${effect.value}` : effect.value)
    : effect.value
  return `${getEffectIcon(effect.type)} ${value}`
}

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
})
</script>

<template>
  <div class="event-card-container">
    <div 
      v-if="leftChoice"
      :class="['choice-side', 'choice-left', { 
        'choice-active': activeSide === 'left',
        'choice-selected': selectedChoice === 'left'
      }]"
      @click="selectChoice('left')"
    >
      <div class="choice-content">
        <div class="choice-icon">{{ leftChoice.icon || '←' }}</div>
        <div class="choice-text">{{ leftChoice.text }}</div>
        <div class="choice-effects">
          <span 
            v-for="(effect, idx) in leftChoice.effects.slice(0, 3)" 
            :key="idx"
            :class="['effect-tag', { 'effect-positive': typeof effect.value === 'number' && effect.value > 0 }]"
          >
            {{ getEffectText(effect) }}
          </span>
        </div>
      </div>
    </div>

    <div 
      ref="cardRef"
      :class="['event-card', { 'card-dragging': isDragging, 'card-processing': processing }]"
      :style="cardStyle"
      @mousedown="handleMouseDown"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <div class="card-inner">
        <div class="event-header">
          <span v-if="event.icon" class="event-icon">{{ event.icon }}</span>
          <h2 class="event-title">{{ event.title }}</h2>
        </div>
        
        <div class="event-body">
          <p class="event-description">{{ event.description }}</p>
        </div>

        <div class="event-footer">
          <span class="event-type-tag">{{ event.type }}</span>
          <span class="swipe-hint">← 滑动选择 →</span>
        </div>
      </div>
    </div>

    <div 
      v-if="rightChoice"
      :class="['choice-side', 'choice-right', { 
        'choice-active': activeSide === 'right',
        'choice-selected': selectedChoice === 'right'
      }]"
      @click="selectChoice('right')"
    >
      <div class="choice-content">
        <div class="choice-icon">{{ rightChoice.icon || '→' }}</div>
        <div class="choice-text">{{ rightChoice.text }}</div>
        <div class="choice-effects">
          <span 
            v-for="(effect, idx) in rightChoice.effects.slice(0, 3)" 
            :key="idx"
            :class="['effect-tag', { 'effect-positive': typeof effect.value === 'number' && effect.value > 0 }]"
          >
            {{ getEffectText(effect) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.event-card-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  height: 100%;
  padding: 2rem;
  perspective: 1000px;
}

.choice-side {
  flex-shrink: 0;
  width: 200px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  opacity: 0.6;
}

.choice-side:hover {
  opacity: 0.9;
  transform: scale(1.05);
}

.choice-active {
  opacity: 1;
  transform: scale(1.1);
}

.choice-selected {
  opacity: 1;
  transform: scale(1.2);
}

.choice-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--color-bg-secondary);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-xl);
  text-align: center;
  transition: all 0.3s;
}

.choice-active .choice-content {
  border-color: var(--color-gold);
  box-shadow: 0 0 30px rgba(212, 175, 55, 0.3);
}

.choice-icon {
  font-size: 2.5rem;
}

.choice-text {
  font-family: var(--font-title);
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1.4;
}

.choice-effects {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.effect-tag {
  font-size: var(--font-size-sm);
  color: var(--color-red-light);
  padding: 0.25rem 0.5rem;
  background: rgba(192, 64, 64, 0.1);
  border-radius: var(--radius-sm);
}

.effect-positive {
  color: var(--color-jade-light);
  background: rgba(64, 160, 128, 0.1);
}

.event-card {
  flex-shrink: 0;
  width: 400px;
  height: 500px;
  background: 
    linear-gradient(180deg, rgba(212, 175, 55, 0.05) 0%, transparent 10%, transparent 90%, rgba(212, 175, 55, 0.05) 100%),
    linear-gradient(90deg, var(--color-bg-card) 0%, var(--color-bg-secondary) 100%);
  border: 3px solid var(--color-border-accent);
  border-radius: var(--radius-xl);
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(212, 175, 55, 0.1);
  cursor: grab;
  user-select: none;
  transition: box-shadow 0.3s;
  position: relative;
  overflow: hidden;
}

.event-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.event-card:hover {
  box-shadow: 
    0 15px 50px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(212, 175, 55, 0.2);
}

.card-dragging {
  cursor: grabbing;
}

.card-processing {
  pointer-events: none;
  opacity: 0.7;
}

.card-inner {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
}

.event-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.event-icon {
  font-size: 4rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

.event-title {
  font-family: var(--font-title);
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-gold);
  text-align: center;
  line-height: 1.3;
}

.event-body {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.event-description {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  text-align: center;
  line-height: 1.8;
}

.event-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px dashed var(--color-border-accent);
}

.event-type-tag {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  padding: 0.25rem 0.75rem;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.swipe-hint {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  opacity: 0.6;
}

@media (max-width: 1200px) {
  .event-card-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .choice-side {
    width: 100%;
    height: auto;
  }
  
  .choice-content {
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
  }
  
  .event-card {
    width: 100%;
    max-width: 500px;
    height: 400px;
  }
}
</style>
