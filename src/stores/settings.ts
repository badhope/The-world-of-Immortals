import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface AIConfig {
  enabled: boolean
  provider: 'cloud' | 'local'
  cloud: {
    apiKey: string
    baseUrl: string
    model: string
  }
  local: {
    baseUrl: string
    model: string
  }
}

export const useSettingsStore = defineStore('settings', () => {
  const aiConfig = ref<AIConfig>({
    enabled: false,
    provider: 'local',
    cloud: {
      apiKey: '',
      baseUrl: 'https://api.openai.com/v1',
      model: 'gpt-4o-mini'
    },
    local: {
      baseUrl: 'http://localhost:11434',
      model: 'qwen2.5:7b'
    }
  })
  
  const gameSettings = ref({
    autoSave: true,
    autoSaveInterval: 300000,
    soundEnabled: true,
    musicVolume: 0.5,
    sfxVolume: 0.7,
    textSize: 'medium',
    theme: 'dark'
  })
  
  function updateAIConfig(config: Partial<AIConfig>) {
    aiConfig.value = { ...aiConfig.value, ...config }
  }
  
  function updateGameSettings(settings: Partial<typeof gameSettings.value>) {
    gameSettings.value = { ...gameSettings.value, ...settings }
  }
  
  function loadFromStorage() {
    try {
      const saved = localStorage.getItem('immortal_world_settings')
      if (saved) {
        const data = JSON.parse(saved)
        if (data.aiConfig) aiConfig.value = { ...aiConfig.value, ...data.aiConfig }
        if (data.gameSettings) gameSettings.value = { ...gameSettings.value, ...data.gameSettings }
      }
    } catch (e) {
      console.error('Failed to load settings:', e)
    }
  }
  
  function saveToStorage() {
    try {
      localStorage.setItem('immortal_world_settings', JSON.stringify({
        aiConfig: aiConfig.value,
        gameSettings: gameSettings.value
      }))
    } catch (e) {
      console.error('Failed to save settings:', e)
    }
  }
  
  return {
    aiConfig,
    gameSettings,
    updateAIConfig,
    updateGameSettings,
    loadFromStorage,
    saveToStorage
  }
})
