<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useGameStore } from '@/stores/game'

interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'danger' | 'story'
  title: string
  message: string
  timestamp: number
}

const gameStore = useGameStore()
const notifications = ref<Notification[]>([])
const maxNotifications = 5

const visibleNotifications = computed(() => {
  return notifications.value.slice(-maxNotifications)
})

function addNotification(notification: Notification) {
  notifications.value.push(notification)
  
  setTimeout(() => {
    removeNotification(notification.id)
  }, 5000)
}

function removeNotification(id: string) {
  const index = notifications.value.findIndex(n => n.id === id)
  if (index > -1) {
    notifications.value.splice(index, 1)
  }
}

function getNotificationIcon(type: string): string {
  const icons: Record<string, string> = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    danger: '❌',
    story: '📖'
  }
  return icons[type] || 'ℹ️'
}

function getNotificationClass(type: string): string {
  return `notification--${type}`
}

let unsubscribe: (() => void) | null = null

onMounted(() => {
  unsubscribe = gameStore.$onAction(({ name, args }) => {
    if (name === 'addEvent') {
      const event = args[0]
      addNotification({
        id: event.id || `notification-${Date.now()}`,
        type: event.type === 'danger' ? 'danger' : 
              event.type === 'discovery' ? 'success' : 
              event.type === 'cultivation' ? 'info' : 'story',
        title: event.title,
        message: event.description,
        timestamp: event.timestamp || Date.now()
      })
    }
  })
})

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe()
  }
})
</script>

<template>
  <div class="notification-container">
    <TransitionGroup name="notification">
      <div 
        v-for="notification in visibleNotifications" 
        :key="notification.id"
        :class="['notification', getNotificationClass(notification.type)]"
        @click="removeNotification(notification.id)"
      >
        <div class="notification-icon">
          {{ getNotificationIcon(notification.type) }}
        </div>
        <div class="notification-content">
          <div class="notification-title">{{ notification.title }}</div>
          <div class="notification-message">{{ notification.message }}</div>
        </div>
        <button class="notification-close">×</button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.notification-container {
  position: fixed;
  top: 60px;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 200;
  pointer-events: none;
}

.notification {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, var(--color-bg-card), var(--color-bg-secondary));
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  min-width: 280px;
  max-width: 400px;
  pointer-events: auto;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.notification:hover {
  transform: translateX(-4px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.5);
}

.notification--info {
  border-left: 3px solid var(--color-blue);
}

.notification--success {
  border-left: 3px solid var(--color-jade);
}

.notification--warning {
  border-left: 3px solid var(--color-gold);
}

.notification--danger {
  border-left: 3px solid var(--color-red);
}

.notification--story {
  border-left: 3px solid var(--color-purple);
}

.notification-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.notification-content {
  flex: 1;
  min-width: 0;
}

.notification-title {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
}

.notification-message {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.notification-close {
  background: transparent;
  border: none;
  color: var(--color-text-muted);
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  opacity: 0.5;
  transition: opacity 0.2s;
}

.notification-close:hover {
  opacity: 1;
}

.notification-enter-active {
  animation: slideIn 0.3s ease-out;
}

.notification-leave-active {
  animation: slideOut 0.3s ease-in;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideOut {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}
</style>
