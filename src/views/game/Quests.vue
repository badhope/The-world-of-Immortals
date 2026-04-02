<template>
  <div class="quests-view">
    <div class="quests-header">
      <h2 class="view-title">任务日志</h2>
      <div class="chapter-info">
        <span class="chapter-label">当前章节</span>
        <span class="chapter-name">{{ currentChapterName }}</span>
      </div>
    </div>

    <div class="quests-tabs">
      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'active' }"
        @click="activeTab = 'active'"
      >
        进行中 ({{ questStore.activeQuests.length }})
      </button>
      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'available' }"
        @click="activeTab = 'available'"
      >
        可接取 ({{ availableQuests.length }})
      </button>
      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'completed' }"
        @click="activeTab = 'completed'"
      >
        已完成 ({{ questStore.completedQuests.length }})
      </button>
    </div>

    <div class="quests-content scrollbar-thin">
      <div v-if="activeTab === 'active'" class="quest-list">
        <div 
          v-for="quest in questStore.activeQuests" 
          :key="quest.id"
          class="quest-card card"
          :class="quest.type"
        >
          <div class="quest-header">
            <div class="quest-type-badge" :class="quest.type">
              {{ getQuestTypeLabel(quest.type) }}
            </div>
            <h3 class="quest-title">{{ quest.title }}</h3>
          </div>
          
          <p class="quest-description">{{ quest.description }}</p>
          
          <div class="objectives-section">
            <div class="section-title">任务目标</div>
            <div class="objectives-list">
              <div 
                v-for="obj in quest.objectives" 
                :key="obj.id"
                class="objective-item"
                :class="{ completed: obj.completed }"
              >
                <span class="objective-icon">{{ obj.completed ? '✓' : '○' }}</span>
                <span class="objective-text">{{ obj.description }}</span>
                <span class="objective-progress">{{ obj.current }}/{{ obj.required }}</span>
              </div>
            </div>
          </div>
          
          <div class="rewards-section">
            <div class="section-title">奖励</div>
            <div class="rewards-list">
              <div class="reward-item">
                <span class="reward-icon">⭐</span>
                <span class="reward-value">{{ quest.rewards.exp }} 经验</span>
              </div>
              <div v-if="quest.rewards.items" class="reward-item">
                <span class="reward-icon">🎁</span>
                <span class="reward-value">{{ Object.keys(quest.rewards.items).length }} 物品</span>
              </div>
            </div>
          </div>
          
          <div class="quest-actions">
            <button class="btn btn-sm btn-danger" @click="abandonQuest(quest.id)">
              放弃任务
            </button>
          </div>
        </div>
        
        <div v-if="questStore.activeQuests.length === 0" class="empty-state">
          <div class="empty-icon">📋</div>
          <p class="empty-text">暂无进行中的任务</p>
        </div>
      </div>

      <div v-if="activeTab === 'available'" class="quest-list">
        <div 
          v-for="quest in availableQuests" 
          :key="quest.id"
          class="quest-card card"
          :class="quest.type"
        >
          <div class="quest-header">
            <div class="quest-type-badge" :class="quest.type">
              {{ getQuestTypeLabel(quest.type) }}
            </div>
            <h3 class="quest-title">{{ quest.title }}</h3>
          </div>
          
          <p class="quest-description">{{ quest.description }}</p>
          
          <div class="rewards-section">
            <div class="section-title">奖励</div>
            <div class="rewards-list">
              <div class="reward-item">
                <span class="reward-icon">⭐</span>
                <span class="reward-value">{{ quest.rewards.exp }} 经验</span>
              </div>
            </div>
          </div>
          
          <div class="quest-actions">
            <button class="btn btn-primary btn-sm" @click="acceptQuest(quest.id)">
              接受任务
            </button>
          </div>
        </div>
        
        <div v-if="availableQuests.length === 0" class="empty-state">
          <div class="empty-icon">🎉</div>
          <p class="empty-text">暂无可接取的任务</p>
          <p class="empty-hint">提升修为或完成当前任务来解锁更多任务</p>
        </div>
      </div>

      <div v-if="activeTab === 'completed'" class="quest-list">
        <div 
          v-for="quest in completedQuestsList" 
          :key="quest.id"
          class="quest-card card completed"
        >
          <div class="quest-header">
            <div class="quest-type-badge completed">已完成</div>
            <h3 class="quest-title">{{ getQuestTitle(quest.id) }}</h3>
          </div>
          
          <div class="completion-info">
            <span class="completion-time">
              完成于 {{ formatDate(quest.completedAt) }}
            </span>
          </div>
          
          <div class="rewards-section">
            <div class="section-title">已获得奖励</div>
            <div class="rewards-list">
              <div class="reward-item">
                <span class="reward-icon">⭐</span>
                <span class="reward-value">{{ quest.rewards.exp }} 经验</span>
              </div>
              <div v-if="quest.rewards.items" class="reward-item">
                <span class="reward-icon">🎁</span>
                <span class="reward-value">{{ Object.keys(quest.rewards.items).length }} 物品</span>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="questStore.completedQuests.length === 0" class="empty-state">
          <div class="empty-icon">📝</div>
          <p class="empty-text">暂无已完成的任务</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuestStore } from '@/stores/quest'
import { useGameStore } from '@/stores/game'
import { getQuestById, storyChapters } from '../../../data/storyline'

const questStore = useQuestStore()
const gameStore = useGameStore()

const activeTab = ref<'active' | 'available' | 'completed'>('active')

const currentChapterName = computed(() => {
  const chapterIndex = questStore.currentChapter - 1
  const chapter = storyChapters[chapterIndex]
  return chapter?.title || '未知章节'
})

const availableQuests = computed(() => {
  return questStore.getAvailableQuestsForPlayer(gameStore.player.realm.level)
})

const completedQuestsList = computed(() => {
  return questStore.completedQuests
})

function getQuestTypeLabel(type: string): string {
  const labels: { [key: string]: string } = {
    main: '主线',
    side: '支线',
    hidden: '隐藏'
  }
  return labels[type] || type
}

function getQuestTitle(questId: string): string {
  const quest = getQuestById(questId)
  return quest?.title || '未知任务'
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleString('zh-CN')
}

function acceptQuest(questId: string) {
  if (questStore.acceptQuest(questId)) {
    activeTab.value = 'active'
  }
}

function abandonQuest(questId: string) {
  if (confirm('确定要放弃这个任务吗？')) {
    questStore.abandonQuest(questId)
  }
}
</script>

<style scoped>
.quests-view {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.quests-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.view-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--color-gold);
}

.chapter-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.chapter-label {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.chapter-name {
  font-size: 0.875rem;
  color: var(--color-text);
}

.quests-tabs {
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.tab-btn {
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 0.25rem;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn:hover {
  border-color: var(--color-gold);
  color: var(--color-text);
}

.tab-btn.active {
  background: var(--color-gold);
  border-color: var(--color-gold);
  color: var(--color-bg);
}

.quests-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 1.5rem;
}

.quest-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.quest-card {
  padding: 1rem;
  border-left: 3px solid var(--color-border);
}

.quest-card.main {
  border-left-color: var(--color-gold);
}

.quest-card.side {
  border-left-color: var(--color-accent);
}

.quest-card.hidden {
  border-left-color: #9b59b6;
}

.quest-card.completed {
  opacity: 0.7;
  border-left-color: var(--color-success);
}

.quest-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.quest-type-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.quest-type-badge.main {
  background: var(--color-gold);
  color: var(--color-bg);
}

.quest-type-badge.side {
  background: var(--color-accent);
  color: white;
}

.quest-type-badge.hidden {
  background: #9b59b6;
  color: white;
}

.quest-type-badge.completed {
  background: var(--color-success);
  color: white;
}

.quest-title {
  font-size: 1rem;
  color: var(--color-text);
}

.quest-description {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin-bottom: 1rem;
  line-height: 1.5;
}

.objectives-section,
.rewards-section {
  margin-bottom: 1rem;
}

.section-title {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.objectives-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.objective-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--color-text);
}

.objective-item.completed {
  color: var(--color-success);
  text-decoration: line-through;
}

.objective-icon {
  width: 1rem;
  text-align: center;
}

.objective-text {
  flex: 1;
}

.objective-progress {
  color: var(--color-text-muted);
  font-size: 0.75rem;
}

.rewards-list {
  display: flex;
  gap: 1rem;
}

.reward-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: var(--color-text);
}

.reward-icon {
  font-size: 0.875rem;
}

.quest-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--color-border);
}

.completion-info {
  margin-bottom: 1rem;
}

.completion-time {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.empty-text {
  font-size: 1rem;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.empty-hint {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}
</style>
