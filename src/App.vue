<template>
  <div class="app-container" :class="themeClass">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useSettingsStore } from './stores/settings'

const settingsStore = useSettingsStore()

const themeClass = computed(() => `theme-${settingsStore.gameSettings.theme}`)

onMounted(() => {
  settingsStore.loadFromStorage()
})
</script>

<style scoped>
.app-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
