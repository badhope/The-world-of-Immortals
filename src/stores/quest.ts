import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { 
  MainQuest, 
  QuestObjective, 
  getQuestById, 
  getAvailableQuests,
  getChapterById,
  storyChapters 
} from '../../data/storyline'

export interface ActiveQuest extends MainQuest {
  startTime: number
  objectives: QuestObjective[]
}

export interface CompletedQuest {
  id: string
  completedAt: number
  rewards: {
    exp: number
    items?: { [key: string]: number }
  }
}

export interface QuestProgress {
  totalQuests: number
  completedQuests: number
  mainQuestsCompleted: number
  sideQuestsCompleted: number
  hiddenQuestsFound: number
  currentChapter: number
}

export const useQuestStore = defineStore('quest', () => {
  const activeQuests = ref<ActiveQuest[]>([])
  const completedQuests = ref<CompletedQuest[]>([])
  const failedQuests = ref<string[]>([])
  const discoveredHiddenQuests = ref<string[]>([])
  
  const currentChapter = computed(() => {
    const completed = completedQuests.value.map(q => q.id)
    
    for (let i = storyChapters.length - 1; i >= 0; i--) {
      const chapter = storyChapters[i]
      const chapterQuests = chapter.quests
      const completedInChapter = chapterQuests.filter(q => completed.includes(q))
      
      if (completedInChapter.length > 0) {
        return i + 1
      }
    }
    
    return 1
  })
  
  const questProgress = computed<QuestProgress>(() => {
    const allMainQuests = storyChapters.reduce((sum, ch) => sum + ch.quests.length, 0)
    
    return {
      totalQuests: allMainQuests,
      completedQuests: completedQuests.value.length,
      mainQuestsCompleted: completedQuests.value.filter(q => {
        const quest = getQuestById(q.id)
        return quest?.type === 'main'
      }).length,
      sideQuestsCompleted: completedQuests.value.filter(q => {
        const quest = getQuestById(q.id)
        return quest?.type === 'side'
      }).length,
      hiddenQuestsFound: discoveredHiddenQuests.value.length,
      currentChapter: currentChapter.value
    }
  })
  
  function acceptQuest(questId: string): boolean {
    const quest = getQuestById(questId)
    if (!quest) return false
    
    if (activeQuests.value.some(q => q.id === questId)) return false
    if (completedQuests.value.some(q => q.id === questId)) return false
    
    const activeQuest: ActiveQuest = {
      ...quest,
      startTime: Date.now(),
      objectives: quest.objectives.map(obj => ({ ...obj, current: 0, completed: false }))
    }
    
    activeQuests.value.push(activeQuest)
    
    return true
  }
  
  function updateObjective(questId: string, objectiveId: string, progress: number): boolean {
    const questIndex = activeQuests.value.findIndex(q => q.id === questId)
    if (questIndex === -1) return false
    
    const quest = activeQuests.value[questIndex]
    const objIndex = quest.objectives.findIndex(o => o.id === objectiveId)
    if (objIndex === -1) return false
    
    const objective = quest.objectives[objIndex]
    objective.current = Math.min(objective.current + progress, objective.required)
    
    if (objective.current >= objective.required) {
      objective.completed = true
    }
    
    const allCompleted = quest.objectives.every(o => o.completed)
    if (allCompleted) {
      completeQuest(questId)
    }
    
    return true
  }
  
  function setObjectiveComplete(questId: string, objectiveId: string): boolean {
    const questIndex = activeQuests.value.findIndex(q => q.id === questId)
    if (questIndex === -1) return false
    
    const quest = activeQuests.value[questIndex]
    const objIndex = quest.objectives.findIndex(o => o.id === objectiveId)
    if (objIndex === -1) return false
    
    quest.objectives[objIndex].current = quest.objectives[objIndex].required
    quest.objectives[objIndex].completed = true
    
    const allCompleted = quest.objectives.every(o => o.completed)
    if (allCompleted) {
      completeQuest(questId)
    }
    
    return true
  }
  
  function completeQuest(questId: string): boolean {
    const questIndex = activeQuests.value.findIndex(q => q.id === questId)
    if (questIndex === -1) return false
    
    const quest = activeQuests.value[questIndex]
    
    const completedQuest: CompletedQuest = {
      id: questId,
      completedAt: Date.now(),
      rewards: {
        exp: quest.rewards.exp,
        items: quest.rewards.items
      }
    }
    
    completedQuests.value.push(completedQuest)
    activeQuests.value.splice(questIndex, 1)
    
    if (quest.type === 'hidden') {
      discoveredHiddenQuests.value.push(questId)
    }
    
    if (quest.nextQuest) {
      const nextQuest = getQuestById(quest.nextQuest)
      if (nextQuest) {
        acceptQuest(quest.nextQuest)
      }
    }
    
    return true
  }
  
  function failQuest(questId: string): boolean {
    const questIndex = activeQuests.value.findIndex(q => q.id === questId)
    if (questIndex === -1) return false
    
    failedQuests.value.push(questId)
    activeQuests.value.splice(questIndex, 1)
    
    return true
  }
  
  function abandonQuest(questId: string): boolean {
    const questIndex = activeQuests.value.findIndex(q => q.id === questId)
    if (questIndex === -1) return false
    
    activeQuests.value.splice(questIndex, 1)
    
    return true
  }
  
  function getActiveQuest(questId: string): ActiveQuest | undefined {
    return activeQuests.value.find(q => q.id === questId)
  }
  
  function hasActiveQuest(questId: string): boolean {
    return activeQuests.value.some(q => q.id === questId)
  }
  
  function hasCompletedQuest(questId: string): boolean {
    return completedQuests.value.some(q => q.id === questId)
  }
  
  function getAvailableQuestsForPlayer(playerRealm: number): MainQuest[] {
    const completed = completedQuests.value.map(q => q.id)
    const active = activeQuests.value.map(q => q.id)
    
    return getAvailableQuests(completed, playerRealm).filter(q => !active.includes(q.id))
  }
  
  function checkObjectiveProgress(type: string, target: string, amount: number = 1): void {
    activeQuests.value.forEach(quest => {
      quest.objectives.forEach(obj => {
        if (obj.type === type && obj.target === target && !obj.completed) {
          updateObjective(quest.id, obj.id, amount)
        }
      })
    })
  }
  
  function onTalkToNpc(npcId: string): void {
    checkObjectiveProgress('talk', npcId)
  }
  
  function onCollectItem(itemId: string, count: number = 1): void {
    checkObjectiveProgress('collect', itemId, count)
  }
  
  function onKillEnemy(enemyId: string, count: number = 1): void {
    checkObjectiveProgress('kill', enemyId, count)
  }
  
  function onExploreLocation(locationId: string): void {
    checkObjectiveProgress('explore', locationId)
    checkObjectiveProgress('discover', locationId)
  }
  
  function onCraftItem(itemId: string): void {
    checkObjectiveProgress('craft', itemId)
  }
  
  function onReachRealm(realmLevel: number): void {
    activeQuests.value.forEach(quest => {
      quest.objectives.forEach(obj => {
        if (obj.type === 'reach_realm' && parseInt(obj.target) <= realmLevel && !obj.completed) {
          setObjectiveComplete(quest.id, obj.id)
        }
      })
    })
  }
  
  function getQuestLog(): {
    active: ActiveQuest[]
    completed: CompletedQuest[]
    available: MainQuest[]
  } {
    return {
      active: activeQuests.value,
      completed: completedQuests.value,
      available: []
    }
  }
  
  function loadQuestData(data: {
    activeQuests: ActiveQuest[]
    completedQuests: CompletedQuest[]
    failedQuests: string[]
    discoveredHiddenQuests: string[]
  }): void {
    activeQuests.value = data.activeQuests || []
    completedQuests.value = data.completedQuests || []
    failedQuests.value = data.failedQuests || []
    discoveredHiddenQuests.value = data.discoveredHiddenQuests || []
  }
  
  function getQuestSaveData() {
    return {
      activeQuests: activeQuests.value,
      completedQuests: completedQuests.value,
      failedQuests: failedQuests.value,
      discoveredHiddenQuests: discoveredHiddenQuests.value
    }
  }
  
  return {
    activeQuests,
    completedQuests,
    failedQuests,
    discoveredHiddenQuests,
    currentChapter,
    questProgress,
    acceptQuest,
    updateObjective,
    setObjectiveComplete,
    completeQuest,
    failQuest,
    abandonQuest,
    getActiveQuest,
    hasActiveQuest,
    hasCompletedQuest,
    getAvailableQuestsForPlayer,
    checkObjectiveProgress,
    onTalkToNpc,
    onCollectItem,
    onKillEnemy,
    onExploreLocation,
    onCraftItem,
    onReachRealm,
    getQuestLog,
    loadQuestData,
    getQuestSaveData
  }
})
