import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { 
  Achievement, 
  AchievementCategory,
  achievements, 
  getAchievementById,
  getAchievementsByCategory,
  getVisibleAchievements 
} from '../../data/achievements'

export interface UnlockedAchievement extends Achievement {
  unlockedAt: number
}

export interface AchievementStats {
  total: number
  unlocked: number
  byCategory: { [key in AchievementCategory]?: { total: number; unlocked: number } }
  byTier: { [key: string]: { total: number; unlocked: number } }
  points: number
}

const TIER_POINTS: { [key: string]: number } = {
  bronze: 10,
  silver: 25,
  gold: 50,
  platinum: 100,
  diamond: 200
}

export const useAchievementStore = defineStore('achievement', () => {
  const unlockedAchievements = ref<UnlockedAchievement[]>([])
  const progress = ref<{ [key: string]: number }>({})
  
  const stats = computed<AchievementStats>(() => {
    const unlockedIds = unlockedAchievements.value.map(a => a.id)
    const points = unlockedAchievements.value.reduce((sum, a) => {
      return sum + (TIER_POINTS[a.tier] || 0)
    }, 0)
    
    const byCategory: { [key in AchievementCategory]?: { total: number; unlocked: number } } = {}
    const byTier: { [key: string]: { total: number; unlocked: number } } = {}
    
    const categories: AchievementCategory[] = ['cultivation', 'combat', 'exploration', 'collection', 'social', 'story', 'special']
    categories.forEach(cat => {
      const catAchievements = achievements.filter(a => a.category === cat)
      byCategory[cat] = {
        total: catAchievements.length,
        unlocked: catAchievements.filter(a => unlockedIds.includes(a.id)).length
      }
    })
    
    const tiers = ['bronze', 'silver', 'gold', 'platinum', 'diamond']
    tiers.forEach(tier => {
      const tierAchievements = achievements.filter(a => a.tier === tier)
      byTier[tier] = {
        total: tierAchievements.length,
        unlocked: tierAchievements.filter(a => unlockedIds.includes(a.id)).length
      }
    })
    
    return {
      total: achievements.length,
      unlocked: unlockedAchievements.value.length,
      byCategory,
      byTier,
      points
    }
  })
  
  const visibleAchievements = computed(() => {
    const unlockedIds = unlockedAchievements.value.map(a => a.id)
    return getVisibleAchievements(unlockedIds)
  })
  
  function unlockAchievement(achievementId: string): boolean {
    const achievement = getAchievementById(achievementId)
    if (!achievement) return false
    
    if (unlockedAchievements.value.some(a => a.id === achievementId)) return false
    
    const unlocked: UnlockedAchievement = {
      ...achievement,
      unlockedAt: Date.now()
    }
    
    unlockedAchievements.value.push(unlocked)
    
    return true
  }
  
  function updateProgress(achievementId: string, currentProgress: number): void {
    progress.value[achievementId] = currentProgress
    
    const achievement = getAchievementById(achievementId)
    if (!achievement) return
    
    if (achievement.maxProgress && currentProgress >= achievement.maxProgress) {
      unlockAchievement(achievementId)
    }
  }
  
  function checkAchievementProgress(type: string, target: string, value: number): void {
    achievements.forEach(achievement => {
      if (unlockedAchievements.value.some(a => a.id === achievement.id)) return
      
      const relevantReq = achievement.requirements.find(
        req => req.type === type && (req.target === target || req.target === 'any')
      )
      
      if (relevantReq) {
        const currentProgress = progress.value[achievement.id] || 0
        const newProgress = currentProgress + value
        
        updateProgress(achievement.id, newProgress)
        
        if (newProgress >= relevantReq.required) {
          unlockAchievement(achievement.id)
        }
      }
    })
  }
  
  function onRealmReached(realmLevel: number): void {
    achievements.forEach(achievement => {
      if (unlockedAchievements.value.some(a => a.id === achievement.id)) return
      
      const realmReq = achievement.requirements.find(req => req.type === 'realm')
      if (realmReq) {
        const requiredLevel = parseInt(realmReq.target)
        if (realmLevel >= requiredLevel) {
          unlockAchievement(achievement.id)
        }
      }
    })
  }
  
  function onEnemyKilled(enemyType: string): void {
    checkAchievementProgress('kill', 'any', 1)
    checkAchievementProgress('kill', enemyType, 1)
  }
  
  function onItemCollected(itemType: string, count: number = 1): void {
    checkAchievementProgress('collect', 'any', count)
    checkAchievementProgress('collect', itemType, count)
  }
  
  function onLocationDiscovered(locationType: string): void {
    checkAchievementProgress('explore', 'any', 1)
    checkAchievementProgress('explore', locationType, 1)
  }
  
  function onQuestCompleted(questType: string): void {
    checkAchievementProgress('quest', 'any', 1)
    checkAchievementProgress('quest', questType, 1)
  }
  
  function onItemCrafted(craftType: string): void {
    checkAchievementProgress('craft', craftType, 1)
  }
  
  function onSpecialEvent(eventType: string): void {
    checkAchievementProgress('special', eventType, 1)
  }
  
  function hasAchievement(achievementId: string): boolean {
    return unlockedAchievements.value.some(a => a.id === achievementId)
  }
  
  function getAchievementProgress(achievementId: string): { current: number; required: number } | null {
    const achievement = getAchievementById(achievementId)
    if (!achievement) return null
    
    const current = progress.value[achievementId] || 0
    const required = achievement.requirements[0]?.required || 0
    
    return { current, required }
  }
  
  function getUnlockedAchievementsByCategory(category: AchievementCategory): UnlockedAchievement[] {
    return unlockedAchievements.value.filter(a => a.category === category)
  }
  
  function getRecentAchievements(count: number = 5): UnlockedAchievement[] {
    return [...unlockedAchievements.value]
      .sort((a, b) => b.unlockedAt - a.unlockedAt)
      .slice(0, count)
  }
  
  function getAchievementCompletionPercentage(): number {
    return (unlockedAchievements.value.length / achievements.length) * 100
  }
  
  function getTitles(): string[] {
    return unlockedAchievements.value
      .filter(a => a.rewards.title)
      .map(a => a.rewards.title as string)
  }
  
  function loadAchievementData(data: {
    unlockedAchievements: UnlockedAchievement[]
    progress: { [key: string]: number }
  }): void {
    unlockedAchievements.value = data.unlockedAchievements || []
    progress.value = data.progress || {}
  }
  
  function getAchievementSaveData() {
    return {
      unlockedAchievements: unlockedAchievements.value,
      progress: progress.value
    }
  }
  
  return {
    unlockedAchievements,
    progress,
    stats,
    visibleAchievements,
    unlockAchievement,
    updateProgress,
    checkAchievementProgress,
    onRealmReached,
    onEnemyKilled,
    onItemCollected,
    onLocationDiscovered,
    onQuestCompleted,
    onItemCrafted,
    onSpecialEvent,
    hasAchievement,
    getAchievementProgress,
    getUnlockedAchievementsByCategory,
    getRecentAchievements,
    getAchievementCompletionPercentage,
    getTitles,
    loadAchievementData,
    getAchievementSaveData
  }
})
