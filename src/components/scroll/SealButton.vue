<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'primary' | 'danger' | 'success' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  loading?: boolean
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

const sealClass = computed(() => [
  'seal-button',
  `seal-button--${props.variant}`,
  `seal-button--${props.size}`,
  {
    'seal-button--loading': props.loading,
    'seal-button--disabled': props.disabled
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
    :class="sealClass" 
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="seal-spinner"></span>
    <span class="seal-content">
      <span class="seal-text">
        <slot />
      </span>
    </span>
  </button>
</template>

<style scoped>
.seal-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-title);
  font-weight: 700;
  cursor: pointer;
  border: none;
  outline: none;
  background: transparent;
  padding: 0;
  overflow: visible;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.seal-button:active {
  transform: scale(0.95);
}

.seal-button::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle, transparent 40%, rgba(212, 175, 55, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

.seal-button:hover::before {
  opacity: 1;
}

.seal-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.3s;
}

.seal-text {
  text-align: center;
  line-height: 1.1;
  letter-spacing: 0.05em;
}

.seal-button--sm .seal-content {
  width: 60px;
  height: 60px;
  font-size: var(--font-size-sm);
}

.seal-button--md .seal-content {
  width: 80px;
  height: 80px;
  font-size: var(--font-size-base);
}

.seal-button--lg .seal-content {
  width: 100px;
  height: 100px;
  font-size: var(--font-size-lg);
}

.seal-button--xl .seal-content {
  width: 120px;
  height: 120px;
  font-size: var(--font-size-xl);
}

.seal-button--default .seal-content {
  background: linear-gradient(135deg, var(--color-bg-card) 0%, var(--color-bg-secondary) 100%);
  border: 3px solid var(--color-border-accent);
  color: var(--color-text-primary);
}

.seal-button--default:hover:not(.seal-button--disabled) .seal-content {
  border-color: var(--color-gold);
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.4),
    0 0 20px rgba(212, 175, 55, 0.2);
}

.seal-button--primary .seal-content {
  background: linear-gradient(135deg, var(--color-gold-dark) 0%, var(--color-gold) 100%);
  border: 3px solid var(--color-gold);
  color: var(--color-bg-primary);
}

.seal-button--primary:hover:not(.seal-button--disabled) .seal-content {
  background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-light) 100%);
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(212, 175, 55, 0.4);
}

.seal-button--danger .seal-content {
  background: linear-gradient(135deg, var(--color-red-dark) 0%, var(--color-red) 100%);
  border: 3px solid var(--color-red);
  color: var(--color-text-primary);
}

.seal-button--danger:hover:not(.seal-button--disabled) .seal-content {
  background: linear-gradient(135deg, var(--color-red) 0%, var(--color-red-light) 100%);
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(192, 64, 64, 0.3);
}

.seal-button--success .seal-content {
  background: linear-gradient(135deg, var(--color-jade-dark) 0%, var(--color-jade) 100%);
  border: 3px solid var(--color-jade);
  color: var(--color-text-primary);
}

.seal-button--success:hover:not(.seal-button--disabled) .seal-content {
  background: linear-gradient(135deg, var(--color-jade) 0%, var(--color-jade-light) 100%);
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(64, 160, 128, 0.3);
}

.seal-button--ghost .seal-content {
  background: transparent;
  border: 3px solid var(--color-border);
  color: var(--color-text-secondary);
}

.seal-button--ghost:hover:not(.seal-button--disabled) .seal-content {
  border-color: var(--color-text-muted);
  color: var(--color-text-primary);
}

.seal-button--disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}

.seal-button--loading {
  cursor: wait;
}

.seal-spinner {
  position: absolute;
  width: 24px;
  height: 24px;
  border: 3px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  z-index: 2;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
