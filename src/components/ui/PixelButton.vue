<template>
  <button 
    :class="['pixel-btn', `pixel-btn-${variant}`, `pixel-btn-${size}`, { 'pixel-btn-disabled': disabled }]"
    :disabled="disabled"
    @click="handleClick"
  >
    <span v-if="icon" class="btn-icon">{{ icon }}</span>
    <span class="btn-text"><slot /></span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'purple' | 'orange'
  size?: 'small' | 'medium' | 'large'
  icon?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  icon: '',
  disabled: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

function handleClick(event: MouseEvent) {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style scoped>
.pixel-btn {
  font-family: var(--pixel-font);
  border: 4px solid;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.1s;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 
    4px 4px 0 rgba(0, 0, 0, 0.3),
    inset -2px -2px 0 rgba(0, 0, 0, 0.2),
    inset 2px 2px 0 rgba(255, 255, 255, 0.2);
}

.pixel-btn:active:not(.pixel-btn-disabled) {
  transform: translate(2px, 2px);
  box-shadow: 
    2px 2px 0 rgba(0, 0, 0, 0.3),
    inset -2px -2px 0 rgba(0, 0, 0, 0.2),
    inset 2px 2px 0 rgba(255, 255, 255, 0.2);
}

.pixel-btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pixel-btn-small {
  font-size: 8px;
  padding: 6px 12px;
}

.pixel-btn-medium {
  font-size: 10px;
  padding: 10px 20px;
}

.pixel-btn-large {
  font-size: 12px;
  padding: 14px 28px;
}

.btn-icon {
  font-size: 1.2em;
}

.btn-text {
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
}

.pixel-btn-primary {
  background: linear-gradient(180deg, #4a90e2 0%, #357abd 50%, #2563a8 100%);
  border-color: #1e4f7a;
  color: #fff;
}

.pixel-btn-primary:hover:not(.pixel-btn-disabled) {
  background: linear-gradient(180deg, #5da0f2 0%, #4a90e2 50%, #357abd 100%);
  border-color: #2563a8;
}

.pixel-btn-secondary {
  background: linear-gradient(180deg, #6c757d 0%, #5a6268 50%, #4a5054 100%);
  border-color: #343a40;
  color: #fff;
}

.pixel-btn-secondary:hover:not(.pixel-btn-disabled) {
  background: linear-gradient(180deg, #7c8590 0%, #6c757d 50%, #5a6268 100%);
  border-color: #4a5054;
}

.pixel-btn-success {
  background: linear-gradient(180deg, #5dde8f 0%, #38b764 50%, #257953 100%);
  border-color: #1a5c3a;
  color: #fff;
}

.pixel-btn-success:hover:not(.pixel-btn-disabled) {
  background: linear-gradient(180deg, #6dee9f 0%, #5dde8f 50%, #38b764 100%);
  border-color: #257953;
}

.pixel-btn-danger {
  background: linear-gradient(180deg, #e06a7f 0%, #b13e53 50%, #732b3a 100%);
  border-color: #4a1c26;
  color: #fff;
}

.pixel-btn-danger:hover:not(.pixel-btn-disabled) {
  background: linear-gradient(180deg, #f07a8f 0%, #e06a7f 50%, #b13e53 100%);
  border-color: #732b3a;
}

.pixel-btn-warning {
  background: linear-gradient(180deg, #fff59b 0%, #fee761 50%, #c9a227 100%);
  border-color: #8a6f1a;
  color: #1a1c2c;
}

.pixel-btn-warning:hover:not(.pixel-btn-disabled) {
  background: linear-gradient(180deg, #ffffab 0%, #fff59b 50%, #fee761 100%);
  border-color: #c9a227;
}

.pixel-btn-info {
  background: linear-gradient(180deg, #7dc4f8 0%, #41a6f6 50%, #2b6eb0 100%);
  border-color: #1d4d7a;
  color: #fff;
}

.pixel-btn-info:hover:not(.pixel-btn-disabled) {
  background: linear-gradient(180deg, #8dd4ff 0%, #7dc4f8 50%, #41a6f6 100%);
  border-color: #2b6eb0;
}

.pixel-btn-purple {
  background: linear-gradient(180deg, #b48ad7 0%, #8b5cb3 50%, #5e3a7a 100%);
  border-color: #3d2550;
  color: #fff;
}

.pixel-btn-purple:hover:not(.pixel-btn-disabled) {
  background: linear-gradient(180deg, #c49ae7 0%, #b48ad7 50%, #8b5cb3 100%);
  border-color: #5e3a7a;
}

.pixel-btn-orange {
  background: linear-gradient(180deg, #fba36a 0%, #f77622 50%, #b54d15 100%);
  border-color: #7a340e;
  color: #fff;
}

.pixel-btn-orange:hover:not(.pixel-btn-disabled) {
  background: linear-gradient(180deg, #fcb37a 0%, #fba36a 50%, #f77622 100%);
  border-color: #b54d15;
}
</style>
