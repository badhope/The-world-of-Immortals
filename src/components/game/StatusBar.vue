<script setup lang="ts">
import { computed } from 'vue'
import type { PlayerAttributes, AttributeChange } from '@/types/events'

interface Props {
  attributes: PlayerAttributes
  recentChanges?: AttributeChange[]
}

const props = withDefaults(defineProps<Props>(), {
  recentChanges: () => []
})

const primaryAttributes = computed(() => [
  { 
    key: 'health', 
    label: '生命', 
    icon: '❤️', 
    value: props.attributes.health, 
    max: props.attributes.maxHealth,
    color: '#ff4444'
  },
  { 
    key: 'spirit', 
    label: '灵力', 
    icon: '💫', 
    value: props.attributes.spirit, 
    max: props.attributes.maxSpirit,
    color: '#4488ff'
  },
  { 
    key: 'cultivationExp', 
    label: '修为', 
    icon: '⭐', 
    value: props.attributes.cultivationExp, 
    max: 100,
    color: '#ffaa00'
  }
])

const secondaryAttributes = computed(() => [
  { key: 'reputation', label: '声望', icon: '👑', value: props.attributes.reputation },
  { key: 'wealth', label: '财富', icon: '💰', value: props.attributes.wealth },
  { key: 'karma', label: '因果', icon: '☯️', value: props.attributes.karma },
  { key: 'insight', label: '悟性', icon: '👁️', value: props.attributes.insight }
])

const cultivationName = computed(() => {
  const names = ['凡人', '练气期', '筑基期', '金丹期', '元婴期', '化神期', '炼虚期', '合体期', '大乘期', '渡劫期']
  return names[props.attributes.cultivationLevel] || '仙人'
})

function getProgressWidth(value: number, max: number): string {
  return `${Math.min((value / max) * 100, 100)}%`
}

function getChangeClass(key: string): string {
  const change = props.recentChanges.find(c => c.type === key)
  if (!change) return ''
  return change.change > 0 ? 'attribute-increase' : 'attribute-decrease'
}
</script>

<template>
  <div class="status-bar">
    <div class="status-section status-primary">
      <div 
        v-for="attr in primaryAttributes" 
        :key="attr.key"
        :class="['attribute-item', getChangeClass(attr.key)]"
      >
        <div class="attribute-header">
          <span class="attribute-icon">{{ attr.icon }}</span>
          <span class="attribute-label">{{ attr.label }}</span>
        </div>
        <div class="attribute-bar-container">
          <div 
            class="attribute-bar" 
            :style="{ 
              width: getProgressWidth(attr.value, attr.max),
              background: attr.color 
            }"
          ></div>
        </div>
        <span class="attribute-value">{{ attr.value }}/{{ attr.max }}</span>
      </div>
    </div>

    <div class="status-divider"></div>

    <div class="status-section status-secondary">
      <div class="cultivation-display">
        <span class="cultivation-label">境界</span>
        <span class="cultivation-value">{{ cultivationName }}</span>
      </div>
      
      <div class="secondary-grid">
        <div 
          v-for="attr in secondaryAttributes" 
          :key="attr.key"
          :class="['secondary-item', getChangeClass(attr.key)]"
        >
          <span class="secondary-icon">{{ attr.icon }}</span>
          <span class="secondary-value">{{ attr.value }}</span>
        </div>
      </div>
    </div>

    <div class="status-divider"></div>

    <div class="status-section status-virtue">
      <div class="virtue-bar">
        <div class="virtue-labels">
          <span class="virtue-label virtue-label-left">善</span>
          <span class="virtue-label virtue-label-right">恶</span>
        </div>
        <div class="virtue-track">
          <div 
            class="virtue-indicator"
            :style="{ 
              left: `${50 + (props.attributes.demonic - props.attributes.virtue) * 0.5}%` 
            }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.status-bar {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(180deg, var(--color-bg-secondary) 0%, var(--color-bg-primary) 100%);
  border-bottom: 2px solid var(--color-border-accent);
  position: relative;
}

.status-bar::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--color-gold), transparent);
}

.status-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.status-divider {
  width: 1px;
  height: 40px;
  background: var(--color-border);
}

.attribute-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-md);
  transition: all 0.3s;
}

.attribute-header {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.attribute-icon {
  font-size: 1rem;
}

.attribute-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.attribute-bar-container {
  width: 80px;
  height: 8px;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.attribute-bar {
  height: 100%;
  border-radius: var(--radius-sm);
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.attribute-value {
  font-family: var(--font-title);
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  min-width: 60px;
  text-align: right;
}

.attribute-increase {
  animation: increase-flash 0.5s ease-out;
}

.attribute-decrease {
  animation: decrease-flash 0.5s ease-out;
}

@keyframes increase-flash {
  0%, 100% { background: transparent; }
  50% { background: rgba(64, 160, 128, 0.2); }
}

@keyframes decrease-flash {
  0%, 100% { background: transparent; }
  50% { background: rgba(192, 64, 64, 0.2); }
}

.cultivation-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.125rem;
  padding: 0.25rem 0.75rem;
  background: var(--color-bg-tertiary);
  border: 1px solid var(--color-border-accent);
  border-radius: var(--radius-md);
}

.cultivation-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.cultivation-value {
  font-family: var(--font-title);
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-gold);
}

.secondary-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.secondary-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-sm);
}

.secondary-icon {
  font-size: 0.875rem;
}

.secondary-value {
  font-family: var(--font-title);
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}

.virtue-bar {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 120px;
}

.virtue-labels {
  display: flex;
  justify-content: space-between;
}

.virtue-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.virtue-label-left {
  color: var(--color-jade-light);
}

.virtue-label-right {
  color: var(--color-red-light);
}

.virtue-track {
  height: 8px;
  background: linear-gradient(90deg, var(--color-jade) 0%, var(--color-bg-tertiary) 50%, var(--color-red) 100%);
  border-radius: var(--radius-sm);
  position: relative;
}

.virtue-indicator {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background: var(--color-gold);
  border: 2px solid var(--color-bg-primary);
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: left 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (max-width: 1024px) {
  .status-bar {
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .status-divider {
    display: none;
  }
}
</style>
