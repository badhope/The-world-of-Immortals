<template>
  <div class="pixel-map-container" ref="mapContainer" @click="handleMapClick">
    <div class="pixel-map" :style="mapStyle">
      <div class="map-grid">
        <div
          v-for="(tile, index) in mapTiles"
          :key="index"
          :class="['tile', tile.type]"
          :style="getTileStyle(tile)"
        >
          <span v-if="tile.icon" class="tile-icon">{{ tile.icon }}</span>
        </div>
      </div>
      
      <div
        class="player-character"
        :class="{ walking: isWalking }"
        :style="playerStyle"
      >
        <div class="character-sprite">🧙</div>
        <div class="character-name">{{ playerName }}</div>
      </div>
      
      <div
        v-for="npc in npcs"
        :key="npc.id"
        class="npc-character"
        :style="getNpcStyle(npc)"
        @click.stop="interactWithNpc(npc)"
      >
        <div class="character-sprite">{{ npc.sprite }}</div>
        <div class="character-name">{{ npc.name }}</div>
      </div>
      
      <div
        v-for="location in locations"
        :key="location.id"
        class="map-location"
        :style="getLocationStyle(location)"
        @click.stop="enterLocation(location)"
      >
        <div class="location-icon">{{ location.icon }}</div>
        <div class="location-name">{{ location.name }}</div>
      </div>
    </div>
    
    <div class="map-controls">
      <div class="control-hint">点击地图移动 | WASD/方向键移动</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useGameSystemStore } from '@/stores/gameSystem'

interface Tile {
  type: string
  icon?: string
  walkable: boolean
  x: number
  y: number
}

interface Npc {
  id: string
  name: string
  sprite: string
  x: number
  y: number
  dialogue?: string
}

interface Location {
  id: string
  name: string
  icon: string
  x: number
  y: number
  type: string
}

const gameStore = useGameSystemStore()
const mapContainer = ref<HTMLElement | null>(null)

const TILE_SIZE = 32
const MAP_WIDTH = 20
const MAP_HEIGHT = 15

const playerX = ref(10)
const playerY = ref(7)
const targetX = ref(10)
const targetY = ref(7)
const isWalking = ref(false)

const playerName = computed(() => gameStore.playerData.name || '修士')

const mapTiles = ref<Tile[]>([])

const npcs = ref<Npc[]>([
  {
    id: 'elder',
    name: '长老',
    sprite: '👴',
    x: 5,
    y: 3,
    dialogue: '欢迎来到修仙世界，年轻修士！'
  },
  {
    id: 'merchant',
    name: '商人',
    sprite: '🧑‍🌾',
    x: 15,
    y: 10,
    dialogue: '需要购买什么材料吗？'
  },
  {
    id: 'disciple',
    name: '弟子',
    sprite: '🧑',
    x: 8,
    y: 12,
    dialogue: '师兄好！'
  }
])

const locations = ref<Location[]>([
  {
    id: 'sect',
    name: '宗门大殿',
    icon: '🏯',
    x: 10,
    y: 2,
    type: 'building'
  },
  {
    id: 'library',
    name: '藏经阁',
    icon: '📚',
    x: 3,
    y: 5,
    type: 'building'
  },
  {
    id: 'alchemy',
    name: '炼丹房',
    icon: '⚗️',
    x: 17,
    y: 5,
    type: 'building'
  },
  {
    id: 'training',
    name: '练功场',
    icon: '⚔️',
    x: 6,
    y: 10,
    type: 'building'
  },
  {
    id: 'garden',
    name: '灵药园',
    icon: '🌿',
    x: 14,
    y: 12,
    type: 'resource'
  }
])

const mapStyle = computed(() => ({
  width: `${MAP_WIDTH * TILE_SIZE}px`,
  height: `${MAP_HEIGHT * TILE_SIZE}px`
}))

const playerStyle = computed(() => ({
  left: `${playerX.value * TILE_SIZE}px`,
  top: `${playerY.value * TILE_SIZE}px`,
  width: `${TILE_SIZE}px`,
  height: `${TILE_SIZE}px`
}))

function getTileStyle(tile: Tile) {
  return {
    width: `${TILE_SIZE}px`,
    height: `${TILE_SIZE}px`
  }
}

function getNpcStyle(npc: Npc) {
  return {
    left: `${npc.x * TILE_SIZE}px`,
    top: `${npc.y * TILE_SIZE}px`,
    width: `${TILE_SIZE}px`,
    height: `${TILE_SIZE}px`
  }
}

function getLocationStyle(location: Location) {
  return {
    left: `${location.x * TILE_SIZE}px`,
    top: `${location.y * TILE_SIZE}px`,
    width: `${TILE_SIZE * 2}px`,
    height: `${TILE_SIZE * 2}px`
  }
}

function initializeMap() {
  mapTiles.value = []
  
  for (let y = 0; y < MAP_HEIGHT; y++) {
    for (let x = 0; x < MAP_WIDTH; x++) {
      let type = 'grass'
      let icon = ''
      let walkable = true
      
      if (x === 0 || x === MAP_WIDTH - 1 || y === 0 || y === MAP_HEIGHT - 1) {
        type = 'wall'
        walkable = false
      } else if ((x === 10 && y === 2) || (x === 3 && y === 5) || (x === 17 && y === 5)) {
        type = 'building'
        walkable = false
      } else if (Math.random() < 0.05) {
        type = 'water'
        walkable = false
      } else if (Math.random() < 0.1) {
        type = 'tree'
        icon = '🌲'
        walkable = false
      } else if (Math.random() < 0.05) {
        type = 'flower'
        icon = '🌸'
      } else if (Math.random() < 0.03) {
        type = 'rock'
        icon = '🪨'
        walkable = false
      }
      
      mapTiles.value.push({ type, icon, walkable, x, y })
    }
  }
}

function handleMapClick(event: MouseEvent) {
  if (!mapContainer.value) return
  
  const rect = mapContainer.value.getBoundingClientRect()
  const x = Math.floor((event.clientX - rect.left + mapContainer.value.scrollLeft) / TILE_SIZE)
  const y = Math.floor((event.clientY - rect.top + mapContainer.value.scrollTop) / TILE_SIZE)
  
  movePlayer(x, y)
}

function movePlayer(x: number, y: number) {
  if (x < 0 || x >= MAP_WIDTH || y < 0 || y >= MAP_HEIGHT) return
  
  const tile = mapTiles.value[y * MAP_WIDTH + x]
  if (!tile || !tile.walkable) return
  
  const npcAtPosition = npcs.value.find(npc => npc.x === x && npc.y === y)
  if (npcAtPosition) {
    interactWithNpc(npcAtPosition)
    return
  }
  
  targetX.value = x
  targetY.value = y
  isWalking.value = true
  
  const dx = x - playerX.value
  const dy = y - playerY.value
  
  const stepX = dx === 0 ? 0 : dx > 0 ? 1 : -1
  const stepY = dy === 0 ? 0 : dy > 0 ? 1 : -1
  
  const interval = setInterval(() => {
    if (playerX.value === targetX.value && playerY.value === targetY.value) {
      clearInterval(interval)
      isWalking.value = false
      return
    }
    
    if (playerX.value !== targetX.value) {
      playerX.value += stepX
    }
    if (playerY.value !== targetY.value) {
      playerY.value += stepY
    }
  }, 100)
}

function interactWithNpc(npc: Npc) {
  alert(`${npc.name}: ${npc.dialogue || '你好！'}`)
}

function enterLocation(location: Location) {
  const distance = Math.abs(playerX.value - location.x) + Math.abs(playerY.value - location.y)
  
  if (distance <= 2) {
    alert(`进入 ${location.name}`)
  } else {
    alert(`需要靠近才能进入 ${location.name}`)
  }
}

function handleKeyDown(event: KeyboardEvent) {
  let newX = playerX.value
  let newY = playerY.value
  
  switch (event.key.toLowerCase()) {
    case 'w':
    case 'arrowup':
      newY--
      break
    case 's':
    case 'arrowdown':
      newY++
      break
    case 'a':
    case 'arrowleft':
      newX--
      break
    case 'd':
    case 'arrowright':
      newX++
      break
    default:
      return
  }
  
  event.preventDefault()
  movePlayer(newX, newY)
}

onMounted(() => {
  initializeMap()
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.pixel-map-container {
  width: 100%;
  height: 100%;
  background: var(--pixel-color-bg-dark);
  border: var(--pixel-border) var(--pixel-color-secondary);
  box-shadow: var(--pixel-shadow);
  overflow: hidden;
  position: relative;
}

.pixel-map {
  position: relative;
  background: var(--pixel-color-bg);
  margin: auto;
}

.map-grid {
  display: grid;
  grid-template-columns: repeat(20, 32px);
  grid-template-rows: repeat(15, 32px);
  gap: 0;
}

.tile {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.tile.grass {
  background: linear-gradient(135deg, #38b764 0%, #257953 100%);
}

.tile.water {
  background: linear-gradient(135deg, #41a6f6 0%, #3b5dc9 100%);
  animation: water-flow 2s ease-in-out infinite;
}

@keyframes water-flow {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}

.tile.wall {
  background: linear-gradient(135deg, #5a5a5a 0%, #3a3a3a 100%);
  border: 2px solid #2a2a2a;
}

.tile.tree {
  background: linear-gradient(135deg, #38b764 0%, #257953 100%);
}

.tile.flower {
  background: linear-gradient(135deg, #38b764 0%, #257953 100%);
}

.tile.rock {
  background: linear-gradient(135deg, #5a5a5a 0%, #3a3a3a 100%);
}

.tile.building {
  background: linear-gradient(135deg, #8b5cb3 0%, #5e3a7a 100%);
}

.tile-icon {
  font-size: 20px;
  filter: drop-shadow(2px 2px 0 rgba(0, 0, 0, 0.5));
}

.player-character {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
  transition: left 0.1s steps(2), top 0.1s steps(2);
  cursor: pointer;
}

.character-sprite {
  font-size: 24px;
  filter: drop-shadow(2px 2px 0 rgba(0, 0, 0, 0.8));
}

.character-name {
  position: absolute;
  bottom: -18px;
  font-family: var(--pixel-font);
  font-size: 8px;
  color: var(--pixel-color-highlight);
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.8);
  white-space: nowrap;
  background: rgba(0, 0, 0, 0.6);
  padding: 2px 4px;
  border-radius: 2px;
}

.player-character.walking .character-sprite {
  animation: pixel-walk 0.3s steps(2) infinite;
}

.npc-character {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 90;
  cursor: pointer;
  animation: pixel-idle 2s ease-in-out infinite;
}

.npc-character:hover {
  transform: scale(1.1);
}

.map-location {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 80;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.3);
  border: 2px solid var(--pixel-color-accent);
  border-radius: 4px;
  transition: all 0.2s;
}

.map-location:hover {
  transform: scale(1.1);
  border-color: var(--pixel-color-highlight);
  box-shadow: 0 0 16px var(--pixel-color-accent);
}

.location-icon {
  font-size: 32px;
  filter: drop-shadow(2px 2px 0 rgba(0, 0, 0, 0.8));
}

.location-name {
  font-family: var(--pixel-font);
  font-size: 8px;
  color: var(--pixel-color-highlight);
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.8);
  background: rgba(0, 0, 0, 0.8);
  padding: 2px 4px;
  border-radius: 2px;
  white-space: nowrap;
}

.map-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  padding: 8px;
  border-top: 2px solid var(--pixel-color-secondary);
}

.control-hint {
  font-family: var(--pixel-font);
  font-size: 8px;
  color: var(--pixel-color-accent);
  text-align: center;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.8);
}
</style>
