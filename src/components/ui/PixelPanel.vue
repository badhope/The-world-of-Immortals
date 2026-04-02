<template>
  <div :class="['pixel-panel', `pixel-panel-${variant}`, `pixel-panel-${size}`]">
    <div v-if="title" class="panel-title">
      <span v-if="icon" class="panel-icon">{{ icon }}</span>
      {{ title }}
    </div>
    <div class="panel-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  icon?: string
  variant?: 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'purple' | 'orange'
  size?: 'small' | 'medium' | 'large'
}

withDefaults(defineProps<Props>(), {
  title: '',
  icon: '',
  variant: 'default',
  size: 'medium'
})
</script>

<style scoped>
.pixel-panel {
  background: linear-gradient(180deg, 
    var(--pixel-color-bg-light) 0%, 
    var(--pixel-color-bg) 100%
  );
  border: 4px solid var(--pixel-color-secondary);
  box-shadow: 
    inset 0 0 0 4px var(--pixel-color-bg-dark),
    4px 4px 0 rgba(0, 0, 0, 0.3);
  position: relative;
}

.pixel-panel::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    repeating-linear-gradient(
      0deg,
      transparent 0px,
      transparent 2px,
      rgba(0, 0, 0, 0.03) 2px,
      rgba(0, 0, 0, 0.03) 4px
    );
  pointer-events: none;
}

.panel-title {
  font-family: var(--pixel-font);
  font-size: 12px;
  color: var(--pixel-color-accent);
  text-shadow: 
    2px 2px 0 rgba(0, 0, 0, 0.8),
    0 0 8px rgba(255, 204, 0, 0.3);
  padding: 12px 16px;
  border-bottom: 4px solid var(--pixel-color-secondary);
  background: linear-gradient(180deg, 
    rgba(255, 255, 255, 0.05) 0%, 
    transparent 100%
  );
  display: flex;
  align-items: center;
  gap: 8px;
  letter-spacing: 1px;
}

.panel-icon {
  font-size: 16px;
  filter: drop-shadow(2px 2px 0 rgba(0, 0, 0, 0.5));
}

.panel-content {
  position: relative;
  z-index: 1;
}

.pixel-panel-small .panel-content {
  padding: 12px;
}

.pixel-panel-medium .panel-content {
  padding: 16px;
}

.pixel-panel-large .panel-content {
  padding: 24px;
}

.pixel-panel-primary {
  border-color: var(--pixel-color-blue);
}

.pixel-panel-primary .panel-title {
  color: var(--pixel-color-blue-light);
  text-shadow: 
    2px 2px 0 rgba(0, 0, 0, 0.8),
    0 0 8px rgba(65, 166, 246, 0.3);
}

.pixel-panel-success {
  border-color: var(--pixel-color-green);
}

.pixel-panel-success .panel-title {
  color: var(--pixel-color-green-light);
  text-shadow: 
    2px 2px 0 rgba(0, 0, 0, 0.8),
    0 0 8px rgba(93, 222, 143, 0.3);
}

.pixel-panel-danger {
  border-color: var(--pixel-color-red);
}

.pixel-panel-danger .panel-title {
  color: var(--pixel-color-red-light);
  text-shadow: 
    2px 2px 0 rgba(0, 0, 0, 0.8),
    0 0 8px rgba(224, 106, 127, 0.3);
}

.pixel-panel-warning {
  border-color: var(--pixel-color-yellow-dark);
}

.pixel-panel-warning .panel-title {
  color: var(--pixel-color-yellow);
  text-shadow: 
    2px 2px 0 rgba(0, 0, 0, 0.8),
    0 0 8px rgba(254, 231, 97, 0.3);
}

.pixel-panel-info {
  border-color: var(--pixel-color-cyan);
}

.pixel-panel-info .panel-title {
  color: var(--pixel-color-cyan-light);
  text-shadow: 
    2px 2px 0 rgba(0, 0, 0, 0.8),
    0 0 8px rgba(125, 196, 248, 0.3);
}

.pixel-panel-purple {
  border-color: var(--pixel-color-purple);
}

.pixel-panel-purple .panel-title {
  color: var(--pixel-color-purple-light);
  text-shadow: 
    2px 2px 0 rgba(0, 0, 0, 0.8),
    0 0 8px rgba(180, 138, 215, 0.3);
}

.pixel-panel-orange {
  border-color: var(--pixel-color-orange);
}

.pixel-panel-orange .panel-title {
  color: var(--pixel-color-orange-light);
  text-shadow: 
    2px 2px 0 rgba(0, 0, 0, 0.8),
    0 0 8px rgba(251, 163, 106, 0.3);
}
</style>
