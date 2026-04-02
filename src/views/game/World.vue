<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/game'
import { GameCard, GameProgress } from '@/components/ui'

const gameStore = useGameStore()

const worldStats = computed(() => ({
  year: gameStore.gameTime?.year || 1,
  month: gameStore.gameTime?.month || 1,
  day: gameStore.gameTime?.day || 1,
  season: getSeason(gameStore.gameTime?.month || 1),
  weather: gameStore.weather || '晴',
  spiritDensity: gameStore.world?.spiritDensity || 1.0
}))

const majorPowers = computed(() => [
  { 
    id: 'qingyun-sect', 
    name: '青云宗', 
    icon: '🏔️', 
    relation: '中立',
    strength: '较强',
    description: '青云山上的大宗门，以剑道闻名'
  },
  { 
    id: 'tianmo-sect', 
    name: '天魔宗', 
    icon: '🌑', 
    relation: '敌对',
    strength: '强大',
    description: '修炼魔功的宗门，行事诡秘'
  },
  { 
    id: 'yaoguang-sect', 
    name: '瑶光宗', 
    icon: '✨', 
    relation: '友好',
    strength: '中等',
    description: '以炼丹闻名的宗门'
  },
  { 
    id: 'imperial-court', 
    name: '仙朝', 
    icon: '👑', 
    relation: '中立',
    strength: '极强',
    description: '统治凡间的仙朝势力'
  }
])

const worldEvents = computed(() => [
  { id: 1, title: '灵脉波动', desc: '近日灵脉有异常波动', impact: 'positive' },
  { id: 2, title: '妖兽出没', desc: '某地出现妖兽踪迹', impact: 'negative' },
  { id: 3, title: '拍卖会', desc: '即将举行大型拍卖会', impact: 'neutral' }
])

function getSeason(month: number): string {
  if (month >= 1 && month <= 3) return '春'
  if (month >= 4 && month <= 6) return '夏'
  if (month >= 7 && month <= 9) return '秋'
  return '冬'
}

function getRelationClass(relation: string): string {
  const classes: Record<string, string> = {
    '友好': 'relation-friendly',
    '中立': 'relation-neutral',
    '敌对': 'relation-hostile'
  }
  return classes[relation] || ''
}

function getImpactClass(impact: string): string {
  const classes: Record<string, string> = {
    'positive': 'impact-positive',
    'negative': 'impact-negative',
    'neutral': 'impact-neutral'
  }
  return classes[impact] || ''
}
</script>

<template>
  <div class="world-view scrollbar-thin">
    <div class="content-area">
      <div class="page-header">
        <h1 class="page-title">🌍 世界概览</h1>
        <p class="page-desc">查看整个修仙世界的信息与动态</p>
      </div>

      <div class="overview-grid">
        <GameCard variant="elevated" class="time-card">
          <div class="card-title">天地时令</div>
          <div class="time-display">
            <div class="time-main">
              <span class="time-year">第{{ worldStats.year }}年</span>
              <span class="time-date">{{ worldStats.month }}月{{ worldStats.day }}日</span>
            </div>
            <div class="time-info">
              <span class="season-tag">{{ worldStats.season }}</span>
              <span class="weather-tag">{{ worldStats.weather }}</span>
            </div>
          </div>
          <div class="spirit-info">
            <span class="spirit-label">天地灵气</span>
            <GameProgress 
              :value="worldStats.spiritDensity * 100" 
              :max="200" 
              variant="default" 
              size="md"
              show-value
            />
          </div>
        </GameCard>

        <GameCard variant="elevated" class="player-card">
          <div class="card-title">个人声望</div>
          <div class="fame-display">
            <div class="fame-item">
              <span class="fame-icon">⭐</span>
              <span class="fame-label">名声</span>
              <span class="fame-value">默默无闻</span>
            </div>
            <div class="fame-item">
              <span class="fame-icon">🏆</span>
              <span class="fame-label">成就</span>
              <span class="fame-value">0 / 50</span>
            </div>
            <div class="fame-item">
              <span class="fame-icon">📜</span>
              <span class="fame-label">事件</span>
              <span class="fame-value">{{ gameStore.events?.length || 0 }}</span>
            </div>
          </div>
        </GameCard>
      </div>

      <div class="section-title">主要势力</div>
      <div class="powers-grid">
        <GameCard 
          v-for="power in majorPowers" 
          :key="power.id"
          variant="default"
          hoverable
          class="power-card"
        >
          <div class="power-header">
            <span class="power-icon">{{ power.icon }}</span>
            <div class="power-info">
              <div class="power-name">{{ power.name }}</div>
              <div class="power-strength">实力：{{ power.strength }}</div>
            </div>
            <span class="power-relation" :class="getRelationClass(power.relation)">
              {{ power.relation }}
            </span>
          </div>
          <p class="power-desc">{{ power.description }}</p>
        </GameCard>
      </div>

      <div class="section-title">世界动态</div>
      <div class="events-section">
        <GameCard variant="filled" class="events-card">
          <div class="event-item" 
            v-for="event in worldEvents" 
            :key="event.id"
            :class="getImpactClass(event.impact)"
          >
            <div class="event-indicator"></div>
            <div class="event-content">
              <div class="event-title">{{ event.title }}</div>
              <div class="event-desc">{{ event.desc }}</div>
            </div>
          </div>
        </GameCard>
      </div>

      <div class="section-title">探索统计</div>
      <div class="stats-grid">
        <GameCard variant="filled" class="stat-card">
          <span class="stat-icon">🗺️</span>
          <div class="stat-info">
            <div class="stat-value">1 / 20</div>
            <div class="stat-label">已探索区域</div>
          </div>
        </GameCard>
        
        <GameCard variant="filled" class="stat-card">
          <span class="stat-icon">📖</span>
          <div class="stat-info">
            <div class="stat-value">0 / 100</div>
            <div class="stat-label">已发现秘闻</div>
          </div>
        </GameCard>
        
        <GameCard variant="filled" class="stat-card">
          <span class="stat-icon">⚔️</span>
          <div class="stat-info">
            <div class="stat-value">0</div>
            <div class="stat-label">战斗次数</div>
          </div>
        </GameCard>
        
        <GameCard variant="filled" class="stat-card">
          <span class="stat-icon">💀</span>
          <div class="stat-info">
            <div class="stat-value">0</div>
            <div class="stat-label">击杀妖兽</div>
          </div>
        </GameCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.world-view {
  height: 100%;
  overflow-y: auto;
  padding: 1.5rem;
}

.content-area {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

.overview-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.time-card, .player-card {
  padding: 1.25rem;
}

.card-title {
  font-family: var(--font-title);
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text-accent);
  margin-bottom: 1rem;
}

.time-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.time-main {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.time-year {
  font-family: var(--font-title);
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-gold);
}

.time-date {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.time-info {
  display: flex;
  gap: 0.5rem;
}

.season-tag, .weather-tag {
  padding: 0.375rem 0.75rem;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}

.spirit-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.spirit-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.fame-display {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.fame-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.fame-icon {
  font-size: 1.25rem;
}

.fame-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  flex: 1;
}

.fame-value {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-primary);
}

.section-title {
  font-family: var(--font-title);
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text-accent);
  border-left: 3px solid var(--color-gold);
  padding-left: 0.75rem;
}

.powers-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.power-card {
  padding: 1rem;
}

.power-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.power-icon {
  font-size: 1.75rem;
}

.power-info {
  flex: 1;
}

.power-name {
  font-family: var(--font-title);
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text-primary);
}

.power-strength {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.power-relation {
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
}

.relation-friendly {
  background: rgba(64, 160, 128, 0.2);
  color: var(--color-jade-light);
}

.relation-neutral {
  background: rgba(212, 175, 55, 0.2);
  color: var(--color-gold);
}

.relation-hostile {
  background: rgba(192, 64, 64, 0.2);
  color: var(--color-red-light);
}

.power-desc {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.events-card {
  padding: 1rem;
}

.event-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
}

.event-item:last-child {
  margin-bottom: 0;
}

.event-indicator {
  width: 4px;
  height: 100%;
  min-height: 40px;
  border-radius: 2px;
  background: var(--color-border);
}

.impact-positive .event-indicator {
  background: var(--color-jade);
}

.impact-negative .event-indicator {
  background: var(--color-red);
}

.impact-neutral .event-indicator {
  background: var(--color-gold);
}

.event-content {
  flex: 1;
}

.event-title {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
}

.event-desc {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
}

.stat-card {
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.stat-icon {
  font-size: 2rem;
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-family: var(--font-title);
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text-primary);
}

.stat-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

@media (max-width: 1024px) {
  .overview-grid {
    grid-template-columns: 1fr;
  }
  
  .powers-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
