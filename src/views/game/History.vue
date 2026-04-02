<script setup lang="ts">
import { computed, ref } from 'vue'
import { useGameStore } from '@/stores/game'
import { GameCard, GameButton } from '@/components/ui'

const gameStore = useGameStore()

const filterType = ref<string>('all')
const sortOrder = ref<'newest' | 'oldest'>('newest')

const eventTypes = [
  { id: 'all', label: '全部', icon: '📋' },
  { id: 'story', label: '剧情', icon: '📜' },
  { id: 'discovery', label: '发现', icon: '✨' },
  { id: 'danger', label: '危险', icon: '⚔️' },
  { id: 'cultivation', label: '修炼', icon: '🧘' },
  { id: 'opportunity', label: '机遇', icon: '🎁' }
]

const filteredEvents = computed(() => {
  let events = [...(gameStore.events || [])]
  
  if (filterType.value !== 'all') {
    events = events.filter(e => e.type === filterType.value)
  }
  
  if (sortOrder.value === 'newest') {
    events.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
  } else {
    events.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0))
  }
  
  return events
})

function getEventIcon(type: string): string {
  const icons: Record<string, string> = {
    story: '📜',
    discovery: '✨',
    danger: '⚔️',
    cultivation: '🧘',
    opportunity: '🎁'
  }
  return icons[type] || '📌'
}

function getEventClass(type: string): string {
  const classes: Record<string, string> = {
    story: 'event--story',
    discovery: 'event--discovery',
    danger: 'event--danger',
    cultivation: 'event--cultivation',
    opportunity: 'event--opportunity'
  }
  return classes[type] || ''
}

function formatTime(timestamp: number): string {
  const date = new Date(timestamp)
  return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`
}

function setFilter(type: string) {
  filterType.value = type
}

function toggleSort() {
  sortOrder.value = sortOrder.value === 'newest' ? 'oldest' : 'newest'
}
</script>

<template>
  <div class="history-view scrollbar-thin">
    <div class="content-area">
      <div class="page-header">
        <h1 class="page-title">📜 历史记录</h1>
        <p class="page-desc">回顾你的修仙历程与重要抉择</p>
      </div>

      <div class="controls-section">
        <div class="filter-tabs">
          <button 
            v-for="type in eventTypes" 
            :key="type.id"
            :class="['filter-tab', { 'filter-tab--active': filterType === type.id }]"
            @click="setFilter(type.id)"
          >
            <span class="filter-icon">{{ type.icon }}</span>
            <span class="filter-label">{{ type.label }}</span>
          </button>
        </div>
        
        <GameButton 
          variant="ghost" 
          size="sm"
          @click="toggleSort"
        >
          {{ sortOrder === 'newest' ? '⬇️ 最新优先' : '⬆️ 最早优先' }}
        </GameButton>
      </div>

      <div class="events-count">
        共 {{ filteredEvents.length }} 条记录
      </div>

      <div class="events-timeline">
        <div 
          v-for="(event, index) in filteredEvents" 
          :key="event.id"
          :class="['timeline-item', getEventClass(event.type)]"
        >
          <div class="timeline-line">
            <div class="timeline-dot"></div>
            <div class="timeline-connector" v-if="index < filteredEvents.length - 1"></div>
          </div>
          
          <GameCard variant="default" class="event-card">
            <div class="event-header">
              <span class="event-icon">{{ getEventIcon(event.type) }}</span>
              <div class="event-meta">
                <span class="event-type">{{ event.type }}</span>
                <span class="event-time" v-if="event.timestamp">
                  {{ formatTime(event.timestamp) }}
                </span>
              </div>
            </div>
            
            <div class="event-body">
              <h4 class="event-title">{{ event.title }}</h4>
              <p class="event-desc">{{ event.description }}</p>
            </div>
            
            <div class="event-choices" v-if="event.choices?.length">
              <div class="choices-label">可选行动：</div>
              <div class="choices-list">
                <span 
                  v-for="(choice, i) in event.choices" 
                  :key="i"
                  class="choice-tag"
                >
                  {{ choice.text }}
                </span>
              </div>
            </div>
          </GameCard>
        </div>
        
        <div v-if="filteredEvents.length === 0" class="empty-state">
          <span class="empty-icon">📭</span>
          <p class="empty-text">暂无历史记录</p>
          <p class="empty-hint">开始你的修仙之旅，创造属于你的传说</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.history-view {
  height: 100%;
  overflow-y: auto;
  padding: 1.5rem;
}

.content-area {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.page-header {
  margin-bottom: 0.5rem;
}

.page-title {
  font-family: var(--font-title);
  font-size: var(--font-size-2xl);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
}

.page-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.controls-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.filter-tabs {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-tab {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.75rem;
  background: var(--color-bg-tertiary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
  cursor: pointer;
  transition: all 0.2s;
}

.filter-tab:hover {
  background: var(--color-bg-hover);
  color: var(--color-text-primary);
}

.filter-tab--active {
  background: rgba(212, 175, 55, 0.15);
  border-color: var(--color-gold-dark);
  color: var(--color-gold);
}

.filter-icon {
  font-size: 0.875rem;
}

.events-count {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  padding-left: 0.25rem;
}

.events-timeline {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.timeline-item {
  display: flex;
  gap: 1rem;
}

.timeline-line {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20px;
  flex-shrink: 0;
}

.timeline-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-border);
  border: 2px solid var(--color-bg-primary);
  z-index: 1;
}

.timeline-connector {
  flex: 1;
  width: 2px;
  background: var(--color-border);
  margin-top: 0.5rem;
}

.event--story .timeline-dot {
  background: var(--color-gold);
}

.event--discovery .timeline-dot {
  background: var(--color-jade);
}

.event--danger .timeline-dot {
  background: var(--color-red);
}

.event--cultivation .timeline-dot {
  background: var(--color-blue);
}

.event--opportunity .timeline-dot {
  background: var(--color-purple);
}

.event-card {
  flex: 1;
  padding: 1rem;
}

.event-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.event-icon {
  font-size: 1.25rem;
}

.event-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.event-type {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.event-time {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  font-variant-numeric: tabular-nums;
}

.event-body {
  margin-bottom: 0.75rem;
}

.event-title {
  font-family: var(--font-title);
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 0.375rem;
}

.event-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.event-choices {
  padding-top: 0.75rem;
  border-top: 1px solid var(--color-border);
}

.choices-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-bottom: 0.5rem;
}

.choices-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.choice-tag {
  padding: 0.25rem 0.5rem;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-text {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  margin-bottom: 0.5rem;
}

.empty-hint {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}
</style>
