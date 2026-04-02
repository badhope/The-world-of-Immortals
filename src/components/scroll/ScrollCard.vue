<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  variant?: 'default' | 'light' | 'dark' | 'gold'
  hoverable?: boolean
  clickable?: boolean
  selected?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  hoverable: false,
  clickable: false,
  selected: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const isHovered = ref(false)

const scrollClass = computed(() => [
  'scroll-card',
  `scroll-card--${props.variant}`,
  {
    'scroll-card--hoverable': props.hoverable,
    'scroll-card--clickable': props.clickable,
    'scroll-card--selected': props.selected,
    'scroll-card--hovered': isHovered.value
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
    :class="scrollClass"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="scroll-roll scroll-roll--left"></div>
    <div class="scroll-roll scroll-roll--right"></div>
    <div class="scroll-content">
      <div class="scroll-inner">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.scroll-card {
  position: relative;
  display: inline-flex;
  align-items: stretch;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.scroll-roll {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: calc(100% + 16px);
  border-radius: 12px;
  z-index: 2;
}

.scroll-roll--left {
  left: -12px;
}

.scroll-roll--right {
  right: -12px;
}

.scroll-content {
  position: relative;
  flex: 1;
  padding: 1.5rem 2rem;
  overflow: hidden;
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.2),
    inset 0 0 0 1px rgba(0, 0, 0, 0.05);
}

.scroll-inner {
  position: relative;
  z-index: 1;
}

.scroll-card--default .scroll-roll {
  background: linear-gradient(90deg, var(--color-bg-tertiary), var(--color-border), var(--color-bg-tertiary));
}

.scroll-card--default .scroll-content {
  background: 
    linear-gradient(180deg, rgba(212, 175, 55, 0.05) 0%, transparent 5%, transparent 95%, rgba(212, 175, 55, 0.05) 100%),
    linear-gradient(90deg, var(--color-bg-card) 0%, var(--color-bg-secondary) 100%);
  border-top: 2px solid var(--color-border-accent);
  border-bottom: 2px solid var(--color-border-accent);
}

.scroll-card--gold .scroll-roll {
  background: linear-gradient(90deg, var(--color-gold-dark), var(--color-gold), var(--color-gold-dark));
}

.scroll-card--gold .scroll-content {
  background: 
    linear-gradient(180deg, rgba(212, 175, 55, 0.1) 0%, transparent 5%, transparent 95%, rgba(212, 175, 55, 0.1) 100%),
    linear-gradient(90deg, var(--color-bg-card) 0%, var(--color-bg-secondary) 100%);
  border-top: 2px solid var(--color-gold);
  border-bottom: 2px solid var(--color-gold);
}

.scroll-card--light .scroll-roll {
  background: linear-gradient(90deg, var(--color-bg-hover), var(--color-border-light), var(--color-bg-hover));
}

.scroll-card--light .scroll-content {
  background: 
    linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, transparent 5%, transparent 95%, rgba(255, 255, 255, 0.03) 100%),
    linear-gradient(90deg, var(--color-bg-tertiary) 0%, var(--color-bg-card) 100%);
  border-top: 2px solid var(--color-border);
  border-bottom: 2px solid var(--color-border);
}

.scroll-card--dark .scroll-roll {
  background: linear-gradient(90deg, var(--color-bg-primary), var(--color-border), var(--color-bg-primary));
}

.scroll-card--dark .scroll-content {
  background: 
    linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, transparent 5%, transparent 95%, rgba(0, 0, 0, 0.1) 100%),
    linear-gradient(90deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 100%);
  border-top: 2px solid var(--color-border);
  border-bottom: 2px solid var(--color-border);
}

.scroll-card--hoverable {
  cursor: default;
}

.scroll-card--hoverable:hover {
  transform: translateY(-4px);
}

.scroll-card--hoverable:hover .scroll-roll {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.scroll-card--clickable {
  cursor: pointer;
}

.scroll-card--clickable:hover {
  transform: translateY(-6px) scale(1.02);
}

.scroll-card--clickable:hover .scroll-roll {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.35);
}

.scroll-card--clickable:hover .scroll-content {
  box-shadow: 
    0 8px 20px rgba(0, 0, 0, 0.3),
    0 0 30px rgba(212, 175, 55, 0.1),
    inset 0 0 0 1px rgba(0, 0, 0, 0.05);
}

.scroll-card--clickable:active {
  transform: translateY(-2px) scale(0.99);
}

.scroll-card--selected {
  transform: scale(1.02);
}

.scroll-card--selected .scroll-roll {
  background: linear-gradient(90deg, var(--color-gold-dark), var(--color-gold), var(--color-gold-dark));
}

.scroll-card--selected .scroll-content {
  border-top: 2px solid var(--color-gold);
  border-bottom: 2px solid var(--color-gold);
  box-shadow: 
    0 6px 20px rgba(0, 0, 0, 0.35),
    0 0 40px rgba(212, 175, 55, 0.2),
    inset 0 0 0 1px rgba(0, 0, 0, 0.05);
}

@media (max-width: 768px) {
  .scroll-roll {
    width: 18px;
    height: calc(100% + 12px);
    border-radius: 9px;
  }
  
  .scroll-roll--left {
    left: -9px;
  }
  
  .scroll-roll--right {
    right: -9px;
  }
  
  .scroll-content {
    padding: 1rem 1.5rem;
  }
}
</style>
