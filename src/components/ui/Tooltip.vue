<template>
  <div class="tooltip-wrapper" @mouseenter="show" @mouseleave="hide">
    <slot></slot>
    <transition name="tooltip">
      <div
        v-if="visible"
        :class="['tooltip-content', position, theme]"
        :style="tooltipStyle"
      >
        <div v-if="title" class="tooltip-title">{{ title }}</div>
        <div v-if="content" class="tooltip-text">{{ content }}</div>
        <div v-if="hints && hints.length > 0" class="tooltip-hints">
          <div v-for="(hint, index) in hints" :key="index" class="hint-item">
            <span class="hint-icon">•</span>
            <span class="hint-text">{{ hint }}</span>
          </div>
        </div>
        <div class="tooltip-arrow"></div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  title?: string
  content?: string
  hints?: string[]
  position?: 'top' | 'bottom' | 'left' | 'right'
  theme?: 'default' | 'info' | 'success' | 'warning' | 'error'
  delay?: number
}>()

const visible = ref(false)
let timeout: number | null = null

const position = computed(() => props.position || 'top')
const theme = computed(() => props.theme || 'default')
const delay = computed(() => props.delay || 200)

const tooltipStyle = computed(() => {
  return {}
})

function show() {
  timeout = window.setTimeout(() => {
    visible.value = true
  }, delay.value)
}

function hide() {
  if (timeout) {
    clearTimeout(timeout)
    timeout = null
  }
  visible.value = false
}
</script>

<style scoped>
.tooltip-wrapper {
  position: relative;
  display: inline-block;
}

.tooltip-content {
  position: absolute;
  z-index: 2500;
  padding: 0.875rem 1.125rem;
  background: linear-gradient(135deg, var(--pixel-color-bg-light) 0%, var(--pixel-color-bg) 100%);
  border: 3px solid var(--pixel-color-secondary);
  box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.4);
  min-width: 180px;
  max-width: 320px;
  pointer-events: none;
}

.tooltip-content.default {
  border-color: var(--pixel-color-secondary);
}

.tooltip-content.info {
  border-color: var(--pixel-color-blue);
  background: linear-gradient(135deg, rgba(65, 166, 246, 0.1) 0%, var(--pixel-color-bg) 100%);
}

.tooltip-content.success {
  border-color: var(--pixel-color-green);
  background: linear-gradient(135deg, rgba(56, 183, 100, 0.1) 0%, var(--pixel-color-bg) 100%);
}

.tooltip-content.warning {
  border-color: var(--pixel-color-yellow);
  background: linear-gradient(135deg, rgba(255, 212, 59, 0.1) 0%, var(--pixel-color-bg) 100%);
}

.tooltip-content.error {
  border-color: var(--pixel-color-red);
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, var(--pixel-color-bg) 100%);
}

.tooltip-content.top {
  bottom: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%);
}

.tooltip-content.bottom {
  top: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%);
}

.tooltip-content.left {
  right: calc(100% + 12px);
  top: 50%;
  transform: translateY(-50%);
}

.tooltip-content.right {
  left: calc(100% + 12px);
  top: 50%;
  transform: translateY(-50%);
}

.tooltip-title {
  font-family: var(--pixel-font);
  font-size: 11px;
  color: var(--pixel-color-accent);
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.8);
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.tooltip-text {
  font-family: var(--pixel-font);
  font-size: 10px;
  color: var(--pixel-color-primary);
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.8);
  line-height: 1.6;
}

.tooltip-hints {
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 2px solid var(--pixel-color-secondary);
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.hint-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.hint-icon {
  color: var(--pixel-color-accent);
  font-size: 12px;
  line-height: 1;
}

.hint-text {
  font-family: var(--pixel-font);
  font-size: 9px;
  color: var(--pixel-color-secondary);
  line-height: 1.4;
}

.tooltip-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border: 6px solid transparent;
}

.tooltip-content.top .tooltip-arrow {
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  border-top-color: var(--pixel-color-secondary);
}

.tooltip-content.bottom .tooltip-arrow {
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  border-bottom-color: var(--pixel-color-secondary);
}

.tooltip-content.left .tooltip-arrow {
  right: -12px;
  top: 50%;
  transform: translateY(-50%);
  border-left-color: var(--pixel-color-secondary);
}

.tooltip-content.right .tooltip-arrow {
  left: -12px;
  top: 50%;
  transform: translateY(-50%);
  border-right-color: var(--pixel-color-secondary);
}

.tooltip-enter-active,
.tooltip-leave-active {
  transition: all 0.2s ease;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transform: translateX(-50%) scale(0.9);
}

.tooltip-content.left.tooltip-enter-from,
.tooltip-content.left.tooltip-leave-to,
.tooltip-content.right.tooltip-enter-from,
.tooltip-content.right.tooltip-leave-to {
  transform: translateY(-50%) scale(0.9);
}
</style>
