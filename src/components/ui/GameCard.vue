<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled'
  hoverable?: boolean
  clickable?: boolean
  selected?: boolean
  glow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  hoverable: false,
  clickable: false,
  selected: false,
  glow: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const cardRef = ref<HTMLElement | null>(null)
const isHovered = ref(false)

const cardClass = computed(() => [
  'game-card',
  `game-card--${props.variant}`,
  {
    'game-card--hoverable': props.hoverable,
    'game-card--clickable': props.clickable,
    'game-card--selected': props.selected,
    'game-card--glow': props.glow,
    'game-card--hovered': isHovered.value
  }
])

function handleClick(event: MouseEvent) {
  if (props.clickable) {
    emit('click', event)
  }
}

function handleMouseEnter() {
  if (props.hoverable) {
    isHovered.value = true
  }
}

function handleMouseLeave() {
  isHovered.value = false
}
</script>

<template>
  <div 
    ref="cardRef"
    :class="cardClass"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="card-glow" v-if="glow"></div>
    <div class="card-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.game-card {
  position: relative;
  border-radius: var(--radius-xl);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.card-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(212, 175, 55, 0.08), transparent 70%);
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

.game-card--hovered .card-glow {
  opacity: 1;
}

.card-content {
  position: relative;
  z-index: 1;
}

.game-card--default {
  background: linear-gradient(145deg, var(--color-bg-card), var(--color-bg-secondary));
  border: 1px solid var(--color-border);
}

.game-card--elevated {
  background: linear-gradient(145deg, var(--color-bg-card), var(--color-bg-secondary));
  border: 1px solid var(--color-border);
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.3),
    0 10px 20px rgba(0, 0, 0, 0.2);
}

.game-card--outlined {
  background: transparent;
  border: 1px solid var(--color-border);
}

.game-card--filled {
  background: var(--color-bg-tertiary);
  border: 1px solid transparent;
}

.game-card--hoverable {
  cursor: default;
}

.game-card--hoverable:hover {
  transform: translateY(-2px);
  border-color: var(--color-border-light);
}

.game-card--clickable {
  cursor: pointer;
}

.game-card--clickable:hover {
  transform: translateY(-3px);
  border-color: var(--color-gold-dark);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.game-card--clickable:active {
  transform: translateY(-1px) scale(0.99);
}

.game-card--selected {
  border-color: var(--color-gold);
  box-shadow: 
    0 0 0 1px var(--color-gold),
    0 0 20px rgba(212, 175, 55, 0.2);
}

.game-card--glow {
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.15);
}

.game-card--glow.game-card--hovered {
  box-shadow: 0 0 25px rgba(212, 175, 55, 0.25);
}
</style>
