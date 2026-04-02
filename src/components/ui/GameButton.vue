<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'primary' | 'danger' | 'success' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  disabled: false,
  loading: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClass = computed(() => [
  'game-button',
  `game-button--${props.variant}`,
  `game-button--${props.size}`,
  {
    'game-button--loading': props.loading,
    'game-button--disabled': props.disabled
  }
])

function handleClick(event: MouseEvent) {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <button 
    :class="buttonClass" 
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="button-spinner"></span>
    <span v-else-if="icon" class="button-icon">{{ icon }}</span>
    <span class="button-content">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.game-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: var(--font-body);
  font-weight: 500;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: var(--radius-lg);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.game-button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.2s;
}

.game-button:hover::before {
  opacity: 1;
}

.game-button:active {
  transform: scale(0.97);
}

.game-button--sm {
  padding: 0.375rem 0.75rem;
  font-size: var(--font-size-xs);
}

.game-button--md {
  padding: 0.5rem 1rem;
  font-size: var(--font-size-sm);
}

.game-button--lg {
  padding: 0.75rem 1.5rem;
  font-size: var(--font-size-base);
}

.game-button--default {
  background: linear-gradient(135deg, var(--color-bg-tertiary), var(--color-bg-secondary));
  border-color: var(--color-border);
  color: var(--color-text-primary);
}

.game-button--default:hover:not(.game-button--disabled) {
  border-color: var(--color-gold-dark);
  box-shadow: 0 0 12px rgba(212, 175, 55, 0.2);
}

.game-button--primary {
  background: linear-gradient(135deg, var(--color-gold-dark), var(--color-gold));
  border-color: var(--color-gold);
  color: var(--color-bg-primary);
}

.game-button--primary:hover:not(.game-button--disabled) {
  background: linear-gradient(135deg, var(--color-gold), var(--color-gold-light));
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
}

.game-button--danger {
  background: linear-gradient(135deg, var(--color-red-dark), var(--color-red));
  border-color: var(--color-red);
  color: var(--color-text-primary);
}

.game-button--danger:hover:not(.game-button--disabled) {
  background: linear-gradient(135deg, var(--color-red), var(--color-red-light));
  box-shadow: 0 0 15px rgba(192, 64, 64, 0.4);
}

.game-button--success {
  background: linear-gradient(135deg, var(--color-jade-dark), var(--color-jade));
  border-color: var(--color-jade);
  color: var(--color-text-primary);
}

.game-button--success:hover:not(.game-button--disabled) {
  background: linear-gradient(135deg, var(--color-jade), var(--color-jade-light));
  box-shadow: 0 0 15px rgba(64, 160, 128, 0.4);
}

.game-button--ghost {
  background: transparent;
  border-color: var(--color-border);
  color: var(--color-text-secondary);
}

.game-button--ghost:hover:not(.game-button--disabled) {
  background: var(--color-bg-tertiary);
  border-color: var(--color-text-muted);
  color: var(--color-text-primary);
}

.game-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.game-button--loading {
  cursor: wait;
}

.button-spinner {
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.button-icon {
  font-size: 1.1em;
}

.button-content {
  position: relative;
  z-index: 1;
}
</style>
