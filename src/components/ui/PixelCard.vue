<template>
  <div :class="['pixel-card', `pixel-card-${variant}`, { 'pixel-card-hoverable': hoverable }]">
    <div v-if="title || $slots.header" class="card-header">
      <div v-if="icon" class="card-icon">{{ icon }}</div>
      <h3 class="card-title">{{ title }}</h3>
      <slot name="header" />
    </div>
    
    <div class="card-body">
      <slot />
    </div>
    
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  icon?: string
  variant?: 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'purple' | 'orange'
  hoverable?: boolean
}

withDefaults(defineProps<Props>(), {
  title: '',
  icon: '',
  variant: 'default',
  hoverable: false
})
</script>

<style scoped>
.pixel-card {
  background: var(--pixel-color-bg);
  border: 4px solid var(--pixel-color-secondary);
  box-shadow: 
    6px 6px 0 rgba(0, 0, 0, 0.3),
    inset -2px -2px 0 rgba(0, 0, 0, 0.2),
    inset 2px 2px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.pixel-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, 
    var(--pixel-color-accent) 0%, 
    var(--pixel-color-primary) 50%, 
    var(--pixel-color-accent) 100%
  );
}

.pixel-card-hoverable {
  cursor: pointer;
  transition: all 0.2s;
}

.pixel-card-hoverable:hover {
  transform: translate(-2px, -2px);
  box-shadow: 
    8px 8px 0 rgba(0, 0, 0, 0.4),
    inset -2px -2px 0 rgba(0, 0, 0, 0.2),
    inset 2px 2px 0 rgba(255, 255, 255, 0.1);
}

.card-header {
  padding: 16px 20px;
  border-bottom: 4px solid var(--pixel-color-secondary);
  background: linear-gradient(180deg, 
    rgba(255, 255, 255, 0.05) 0%, 
    transparent 100%
  );
  display: flex;
  align-items: center;
  gap: 12px;
}

.card-icon {
  font-size: 24px;
  filter: drop-shadow(2px 2px 0 rgba(0, 0, 0, 0.5));
}

.card-title {
  font-family: var(--pixel-font);
  font-size: 14px;
  color: var(--pixel-color-accent);
  text-shadow: 
    2px 2px 0 rgba(0, 0, 0, 0.8),
    0 0 8px rgba(255, 204, 0, 0.3);
  margin: 0;
  letter-spacing: 1px;
}

.card-body {
  padding: 20px;
  font-family: var(--pixel-font);
  font-size: 10px;
  color: var(--pixel-color-primary);
  line-height: 1.8;
}

.card-footer {
  padding: 12px 20px;
  border-top: 4px solid var(--pixel-color-secondary);
  background: linear-gradient(180deg, 
    transparent 0%, 
    rgba(0, 0, 0, 0.2) 100%
  );
}

.pixel-card-primary {
  border-color: var(--pixel-color-blue);
}

.pixel-card-primary::before {
  background: linear-gradient(90deg, 
    var(--pixel-color-blue-light) 0%, 
    var(--pixel-color-blue) 50%, 
    var(--pixel-color-blue-light) 100%
  );
}

.pixel-card-success {
  border-color: var(--pixel-color-green);
}

.pixel-card-success::before {
  background: linear-gradient(90deg, 
    var(--pixel-color-green-light) 0%, 
    var(--pixel-color-green) 50%, 
    var(--pixel-color-green-light) 100%
  );
}

.pixel-card-danger {
  border-color: var(--pixel-color-red);
}

.pixel-card-danger::before {
  background: linear-gradient(90deg, 
    var(--pixel-color-red-light) 0%, 
    var(--pixel-color-red) 50%, 
    var(--pixel-color-red-light) 100%
  );
}

.pixel-card-warning {
  border-color: var(--pixel-color-yellow-dark);
}

.pixel-card-warning::before {
  background: linear-gradient(90deg, 
    var(--pixel-color-yellow-light) 0%, 
    var(--pixel-color-yellow) 50%, 
    var(--pixel-color-yellow-light) 100%
  );
}

.pixel-card-info {
  border-color: var(--pixel-color-cyan);
}

.pixel-card-info::before {
  background: linear-gradient(90deg, 
    var(--pixel-color-cyan-light) 0%, 
    var(--pixel-color-cyan) 50%, 
    var(--pixel-color-cyan-light) 100%
  );
}

.pixel-card-purple {
  border-color: var(--pixel-color-purple);
}

.pixel-card-purple::before {
  background: linear-gradient(90deg, 
    var(--pixel-color-purple-light) 0%, 
    var(--pixel-color-purple) 50%, 
    var(--pixel-color-purple-light) 100%
  );
}

.pixel-card-orange {
  border-color: var(--pixel-color-orange);
}

.pixel-card-orange::before {
  background: linear-gradient(90deg, 
    var(--pixel-color-orange-light) 0%, 
    var(--pixel-color-orange) 50%, 
    var(--pixel-color-orange-light) 100%
  );
}
</style>
