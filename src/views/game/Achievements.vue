<template>
  <div class="achievements-view">
    <div class="achievements-header">
      <h2 class="view-title">成就殿堂</h2>
      <div class="stats-overview">
        <div class="stat-item">
          <span class="stat-value">{{ achievementStore.stats.unlocked }}</span>
          <span class="stat-label">/{{ achievementStore.stats.total }}</span>
        </div>
        <div class="progress-bar">
          <div 
            class="progress-fill" 
            :style="{ width: completionPercentage + '%' }"
          ></div>
        </div>
        <div class="points-display">
          <span class="points-icon">🏆</span>
          <span class="points-value">{{ achievementStore.stats.points }}</span>
          <span class="points-label">成就点数</span>
        </div>
      </div>
    </div>

    <div class="achievements-tabs">
      <button 
        class="tab-btn" 
        :class="{ active: activeCategory === 'all' }"
        @click="activeCategory = 'all'"
      >
        全部
      </button>
      <button 
        v-for="cat in categories" 
        :key="cat.id"
        class="tab-btn" 
        :class="{ active: activeCategory === cat.id }"
        @click="activeCategory = cat.id"
      >
        {{ cat.icon }} {{ cat.name }}
        <span class="count">{{ getCategoryProgress(cat.id) }}</span>
      </button>
    </div>

    <div class="achievements-content scrollbar-thin">
      <div class="achievements-grid">
        <div 
          v-for="achievement in filteredAchievements" 
          :key="achievement.id"
          class="achievement-card"
          :class="[achievement.tier, { unlocked: isUnlocked(achievement.id) }]"
        >
          <div class="achievement-icon">{{ achievement.icon }}</div>
          
          <div class="achievement-info">
            <div class="achievement-header">
              <h3 class="achievement-name">{{ achievement.name }}</h3>
              <div class="tier-badge" :class="achievement.tier">
                {{ getTierLabel(achievement.tier) }}
              </div>
            </div>
            
            <p class="achievement-description">{{ achievement.description }}</p>
            
            <div v-if="!isUnlocked(achievement.id) && achievementProgress(achievement.id)" class="progress-section">
              <div class="progress-bar-small">
                <div 
                  class="progress-fill" 
                  :style="{ 
                    width: (achievementProgress(achievement.id)!.current / achievementProgress(achievement.id)!.required * 100) + '%' 
                  }"
                ></div>
              </div>
              <span class="progress-text">
                {{ achievementProgress(achievement.id)!.current }} / {{ achievementProgress(achievement.id)!.required }}
              </span>
            </div>
            
            <div class="rewards-section">
              <div class="reward-item">
                <span class="reward-icon">⭐</span>
                <span class="reward-value">{{ achievement.rewards.exp }} 经验</span>
              </div>
              <div v-if="achievement.rewards.title" class="reward-item">
                <span class="reward-icon">👑</span>
                <span class="reward-value">称号: {{ achievement.rewards.title }}</span>
              </div>
              <div v-if="achievement.rewards.items" class="reward-item">
                <span class="reward-icon">🎁</span>
                <span class="reward-value">{{ Object.keys(achievement.rewards.items).length }} 物品</span>
              </div>
            </div>
          </div>
          
          <div v-if="isUnlocked(achievement.id)" class="unlocked-badge">
            <span class="check-icon">✓</span>
          </div>
        </div>
      </div>
      
      <div v-if="filteredAchievements.length === 0" class="empty-state">
        <div class="empty-icon">🏆</div>
        <p class="empty-text">暂无成就</p>
      </div>
    </div>

    <div class="recent-section" v-if="recentAchievements.length > 0">
      <h3 class="section-title">最近解锁</h3>
      <div class="recent-list">
        <div 
          v-for="achievement in recentAchievements" 
          :key="achievement.id"
          class="recent-item"
        >
          <span class="recent-icon">{{ achievement.icon }}</span>
          <span class="recent-name">{{ achievement.name }}</span>
          <span class="recent-time">{{ formatTime(achievement.unlockedAt) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAchievementStore } from '@/stores/achievement'
import { AchievementCategory } from '../../../data/achievements'

const achievementStore = useAchievementStore()

const activeCategory = ref<'all' | AchievementCategory>('all')

const categories = [
  { id: 'cultivation', name: '修炼', icon: '🧘' },
  { id: 'combat', name: '战斗', icon: '⚔️' },
  { id: 'exploration', name: '探索', icon: '🗺️' },
  { id: 'collection', name: '收集', icon: '📦' },
  { id: 'story', name: '剧情', icon: '📖' },
  { id: 'special', name: '特殊', icon: '⭐' }
]

const completionPercentage = computed(() => {
  return achievementStore.getAchievementCompletionPercentage()
})

const filteredAchievements = computed(() => {
  if (activeCategory.value === 'all') {
    return achievementStore.visibleAchievements
  }
  return achievementStore.visibleAchievements.filter(a => a.category === activeCategory.value)
})

const recentAchievements = computed(() => {
  return achievementStore.getRecentAchievements(5)
})

function getCategoryProgress(categoryId: string): string {
  const stats = achievementStore.stats.byCategory[categoryId as AchievementCategory]
  if (!stats) return '0/0'
  return `${stats.unlocked}/${stats.total}`
}

function getTierLabel(tier: string): string {
  const labels: { [key: string]: string } = {
    bronze: '铜',
    silver: '银',
    gold: '金',
    platinum: '铂',
    diamond: '钻'
  }
  return labels[tier] || tier
}

function isUnlocked(achievementId: string): boolean {
  return achievementStore.hasAchievement(achievementId)
}

function achievementProgress(achievementId: string) {
  return achievementStore.getAchievementProgress(achievementId)
}

function formatTime(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp
  
  if (diff < 60000) return '刚刚'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`
  return `${Math.floor(diff / 86400000)}天前`
}
</script>

<style scoped>
.achievements-view {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.achievements-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.view-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--color-gold);
  margin-bottom: 1rem;
}

.stats-overview {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-item {
  display: flex;
  align-items: baseline;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-gold);
}

.stat-label {
  font-size: 1rem;
  color: var(--color-text-muted);
}

.progress-bar {
  flex: 1;
  height: 0.5rem;
  background: var(--color-bg-secondary);
  border-radius: 0.25rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-gold), var(--color-accent));
  transition: width 0.3s;
}

.points-display {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--color-bg-secondary);
  border-radius: 0.5rem;
}

.points-icon {
  font-size: 1.25rem;
}

.points-value {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-gold);
}

.points-label {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.achievements-tabs {
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
  overflow-x: auto;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 0.25rem;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
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

.count {
  font-size: 0.75rem;
  opacity: 0.8;
}

.achievements-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 1.5rem;
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.achievement-card {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  position: relative;
  transition: all 0.2s;
}

.achievement-card:hover {
  border-color: var(--color-gold);
}

.achievement-card.unlocked {
  background: linear-gradient(135deg, var(--color-bg-secondary), rgba(212, 175, 55, 0.1));
  border-color: var(--color-gold);
}

.achievement-icon {
  font-size: 2.5rem;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
  border-radius: 0.5rem;
  flex-shrink: 0;
}

.achievement-card.bronze .achievement-icon {
  border: 2px solid #cd7f32;
}

.achievement-card.silver .achievement-icon {
  border: 2px solid #c0c0c0;
}

.achievement-card.gold .achievement-icon {
  border: 2px solid var(--color-gold);
}

.achievement-card.platinum .achievement-icon {
  border: 2px solid #e5e4e2;
}

.achievement-card.diamond .achievement-icon {
  border: 2px solid #b9f2ff;
}

.achievement-info {
  flex: 1;
  min-width: 0;
}

.achievement-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.achievement-name {
  font-size: 1rem;
  color: var(--color-text);
}

.tier-badge {
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: uppercase;
}

.tier-badge.bronze {
  background: #cd7f32;
  color: white;
}

.tier-badge.silver {
  background: #c0c0c0;
  color: #333;
}

.tier-badge.gold {
  background: var(--color-gold);
  color: var(--color-bg);
}

.tier-badge.platinum {
  background: #e5e4e2;
  color: #333;
}

.tier-badge.diamond {
  background: linear-gradient(135deg, #b9f2ff, #00bfff);
  color: white;
}

.achievement-description {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.progress-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.progress-bar-small {
  flex: 1;
  height: 0.25rem;
  background: var(--color-bg);
  border-radius: 0.125rem;
  overflow: hidden;
}

.progress-text {
  font-size: 0.625rem;
  color: var(--color-text-muted);
  white-space: nowrap;
}

.rewards-section {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.reward-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: var(--color-text);
}

.unlocked-badge {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  background: var(--color-success);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.check-icon {
  color: white;
  font-size: 0.875rem;
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
}

.recent-section {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--color-border);
}

.section-title {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin-bottom: 0.75rem;
}

.recent-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.recent-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  background: var(--color-bg-secondary);
  border-radius: 0.25rem;
}

.recent-icon {
  font-size: 1.25rem;
}

.recent-name {
  flex: 1;
  font-size: 0.875rem;
  color: var(--color-text);
}

.recent-time {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}
</style>
