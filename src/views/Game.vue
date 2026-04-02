<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'

const router = useRouter()
const gameStore = useGameStore()

const cultivationName = computed(() => {
  const names = ['凡人', '练气期', '筑基期', '金丹期', '元婴期', '化神期', '炼虚期', '合体期', '大乘期', '渡劫期']
  return names[gameStore.player.cultivationLevel] || '仙人'
})

function goBack() {
  router.push('/')
}
</script>

<template>
  <div class="game-layout">
    <router-view />
  </div>
</template>

<style scoped>
.game-layout {
  width: 100%;
  height: 100%;
  background: var(--color-bg-primary);
  position: relative;
  overflow: hidden;
}

.game-layout::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.015;
  pointer-events: none;
}
</style>
