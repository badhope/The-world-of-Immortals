<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  value: number
  max?: number
  variant?: 'default' | 'health' | 'spirit' | 'exp' | 'custom'
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  animated?: boolean
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  max: 100,
  variant: 'default',
  size: 'md',
  showValue: false,
  animated: false
})

const percentage = computed(() => {
  return Math.min(100, Math.max(0, (props.value / props.max) * 100))
})

const progressClass = computed(() => [
  'game-progress',
  `game-progress--${props.variant}`,
  `game-progress--${props.size}`,
  {
    'game-progress--animated': props.animated
  }
])
</script>

<template>
  <div :class="progressClass">
    <div class="progress-header" v-if="label || showValue">
      <span class="progress-label" v-if="label">{{ label }}</span>
      <span class="progress-value" v-if="showValue">{{ value }} / {{ max }}</span>
    </div>
    <div class="progress-track">
      <div 
        class="progress-fill" 
        :style="{ width: `${percentage}%` }"
      >
        <div class="progress-shine" v-if="animated"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-progress {
  width: 100%;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.progress-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.progress-value {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  font-variant-numeric: tabular-nums;
}

.progress-track {
  width: 100%;
  background: var(--color-bg-tertiary);
  border-radius: 100px;
  overflow: hidden;
}

.game-progress--sm .progress-track {
  height: 4px;
}

.game-progress--md .progress-track {
  height: 6px;
}

.game-progress--lg .progress-track {
  height: 10px;
}

.progress-fill {
  height: 100%;
  border-radius: 100px;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.progress-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  animation: shine 2s infinite;
}

@keyframes shine {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.game-progress--default .progress-fill {
  background: linear-gradient(90deg, var(--color-gold-dark), var(--color-gold));
}

.game-progress--health .progress-fill {
  background: linear-gradient(90deg, var(--color-red-dark), var(--color-red));
}

.game-progress--spirit .progress-fill {
  background: linear-gradient(90deg, var(--color-blue-dark), var(--color-blue));
}

.game-progress--exp .progress-fill {
  background: linear-gradient(90deg, var(--color-purple-dark), var(--color-purple));
}

.game-progress--custom .progress-fill {
  background: linear-gradient(90deg, var(--color-jade-dark), var(--color-jade));
}
</style>
