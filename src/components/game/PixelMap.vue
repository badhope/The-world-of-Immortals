<template>
  <div class="pixel-map-container" ref="mapContainer" @click="handleMapClick" @mousemove="handleMouseMove">
    <div class="pixel-map" :style="mapStyle">
      <div class="map-grid">
        <div
          v-for="(tile, index) in mapTiles"
          :key="index"
          :class="['tile', tile.type, { 'tile-hover': hoveredTile && hoveredTile.x === tile.x && hoveredTile.y === tile.y }]"
          :style="getTileStyle(tile)"
          @mouseenter="hoveredTile = tile"
          @mouseleave="hoveredTile = null"
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
        <div class="player-indicator"></div>
      </div>
      
      <div
        v-for="npc in npcs"
        :key="npc.id"
        class="npc-character"
        :class="{ 'npc-nearby': isNpcNearby(npc) }"
        :style="getNpcStyle(npc)"
        @click.stop="interactWithNpc(npc)"
        @mouseenter="hoveredNpc = npc"
        @mouseleave="hoveredNpc = null"
      >
        <div class="character-sprite">{{ npc.sprite }}</div>
        <div class="character-name">{{ npc.name }}</div>
        <div v-if="isNpcNearby(npc)" class="npc-interaction-hint">
          <span class="hint-key">E</span>
          <span class="hint-action">交互</span>
        </div>
        <div v-if="hoveredNpc === npc" class="npc-tooltip">
          <div class="tooltip-name">{{ npc.name }}</div>
          <div class="tooltip-hint">{{ isNpcNearby(npc) ? '按E或点击交互' : '靠近后交互' }}</div>
        </div>
      </div>
      
      <div
        v-for="location in locations"
        :key="location.id"
        class="map-location"
        :class="{ 'location-nearby': isLocationNearby(location) }"
        :style="getLocationStyle(location)"
        @click.stop="enterLocation(location)"
        @mouseenter="hoveredLocation = location"
        @mouseleave="hoveredLocation = null"
      >
        <div class="location-icon">{{ location.icon }}</div>
        <div class="location-name">{{ location.name }}</div>
        <div v-if="isLocationNearby(location)" class="location-interaction-hint">
          <span class="hint-key">E</span>
          <span class="hint-action">进入</span>
        </div>
        <div v-if="hoveredLocation === location" class="location-tooltip">
          <div class="tooltip-title">{{ location.name }}</div>
          <div class="tooltip-type">{{ getLocationTypeText(location.type) }}</div>
          <div class="tooltip-hint">{{ isLocationNearby(location) ? '按E或点击进入' : '需要靠近' }}</div>
        </div>
      </div>
      
      <div v-if="showPath" class="path-indicator">
        <div
          v-for="(point, index) in pathPoints"
          :key="index"
          class="path-point"
          :style="{ left: `${point.x * TILE_SIZE}px`, top: `${point.y * TILE_SIZE}px` }"
        ></div>
      </div>
    </div>
    
    <div class="map-controls">
      <div class="control-row">
        <div class="control-hint">
          <span class="hint-icon">🖱️</span>
          <span class="hint-text">点击移动</span>
        </div>
        <div class="control-hint">
          <span class="hint-icon">⌨️</span>
          <span class="hint-text">WASD移动</span>
        </div>
        <div class="control-hint">
          <span class="hint-icon">E</span>
          <span class="hint-text">进入建筑</span>
        </div>
      </div>
    </div>
    
    <div v-if="hoveredTile" class="tile-info">
      <div class="info-icon">{{ getTileIcon(hoveredTile.type) }}</div>
      <div class="info-text">{{ getTileName(hoveredTile.type) }}</div>
      <div v-if="!hoveredTile.walkable" class="info-warning">不可通行</div>
    </div>
    
    <transition name="fade">
      <div v-if="showInteractionDialog" class="interaction-dialog" @click.stop>
        <div class="dialog-header">
          <div class="dialog-icon">{{ currentInteraction?.sprite }}</div>
          <div class="dialog-title">{{ currentInteraction?.name }}</div>
          <button class="dialog-close" @click="closeInteractionDialog">✕</button>
        </div>
        <div class="dialog-body">
          <p class="dialog-text">{{ currentInteraction?.dialogue }}</p>
        </div>
        <div class="dialog-footer">
          <button class="dialog-btn" @click="closeInteractionDialog">确定</button>
        </div>
      </div>
    </transition>
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

const hoveredTile = ref<Tile | null>(null)
const hoveredNpc = ref<Npc | null>(null)
const hoveredLocation = ref<Location | null>(null)
const showPath = ref(false)
const pathPoints = ref<{x: number, y: number}[]>([])

const showInteractionDialog = ref(false)
const currentInteraction = ref<Npc | null>(null)

const playerName = computed(() => gameStore.playerData.name || '修士')

const mapTiles = ref<Tile[]>([])

let moveInterval: number | null = null

const npcs = ref<Npc[]>([
  {
    id: 'elder',
    name: '长老',
    sprite: '👴',
    x: 5,
    y: 3,
    dialogue: '欢迎来到修仙世界，年轻修士！记住，修炼之路漫长而艰辛，需要持之以恒。'
  },
  {
    id: 'merchant',
    name: '商人',
    sprite: '🧑‍🌾',
    x: 15,
    y: 10,
    dialogue: '需要购买什么材料吗？我有各种珍稀的灵草和矿石。'
  },
  {
    id: 'disciple',
    name: '弟子',
    sprite: '🧑',
    x: 8,
    y: 12,
    dialogue: '师兄好！最近修炼进展如何？'
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
  transform: `translate(${playerX.value * TILE_SIZE}px, ${playerY.value * TILE_SIZE}px)`,
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

function getTileIcon(type: string): string {
  const icons: Record<string, string> = {
    grass: '🌿',
    water: '💧',
    wall: '🧱',
    tree: '🌲',
    flower: '🌸',
    rock: '🪨',
    building: '🏛️'
  }
  return icons[type] || '❓'
}

function getTileName(type: string): string {
  const names: Record<string, string> = {
    grass: '草地',
    water: '水域',
    wall: '墙壁',
    tree: '树木',
    flower: '花朵',
    rock: '岩石',
    building: '建筑'
  }
  return names[type] || '未知'
}

function getLocationTypeText(type: string): string {
  const types: Record<string, string> = {
    building: '建筑',
    resource: '资源点',
    dungeon: '副本'
  }
  return types[type] || '地点'
}

function isNpcNearby(npc: Npc): boolean {
  const distance = Math.abs(playerX.value - npc.x) + Math.abs(playerY.value - npc.y)
  return distance <= 1
}

function isLocationNearby(location: Location): boolean {
  const distance = Math.abs(playerX.value - location.x) + Math.abs(playerY.value - location.y)
  return distance <= 2
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

function handleMouseMove(event: MouseEvent) {
  if (!mapContainer.value) return
  
  const rect = mapContainer.value.getBoundingClientRect()
  const x = Math.floor((event.clientX - rect.left + mapContainer.value.scrollLeft) / TILE_SIZE)
  const y = Math.floor((event.clientY - rect.top + mapContainer.value.scrollTop) / TILE_SIZE)
  
  if (x >= 0 && x < MAP_WIDTH && y >= 0 && y < MAP_HEIGHT) {
    const tile = mapTiles.value[y * MAP_WIDTH + x]
    if (tile && tile.walkable) {
      showPathIndicator(x, y)
    } else {
      showPath.value = false
    }
  }
}

function showPathIndicator(targetXPos: number, targetYPos: number) {
  const points: {x: number, y: number}[] = []
  let x = playerX.value
  let y = playerY.value
  
  const dx = targetXPos - x
  const dy = targetYPos - y
  
  const stepX = dx === 0 ? 0 : dx > 0 ? 1 : -1
  const stepY = dy === 0 ? 0 : dy > 0 ? 1 : -1
  
  while (x !== targetXPos || y !== targetYPos) {
    if (x !== targetXPos) x += stepX
    else if (y !== targetYPos) y += stepY
    
    const tile = mapTiles.value[y * MAP_WIDTH + x]
    if (tile && tile.walkable) {
      points.push({ x, y })
    }
  }
  
  pathPoints.value = points
  showPath.value = true
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
  
  if (moveInterval) {
    clearInterval(moveInterval)
    moveInterval = null
  }
  
  targetX.value = x
  targetY.value = y
  isWalking.value = true
  showPath.value = false
  
  const dx = x - playerX.value
  const dy = y - playerY.value
  
  const stepX = dx === 0 ? 0 : dx > 0 ? 1 : -1
  const stepY = dy === 0 ? 0 : dy > 0 ? 1 : -1
  
  moveInterval = window.setInterval(() => {
    if (playerX.value === targetX.value && playerY.value === targetY.value) {
      if (moveInterval) {
        clearInterval(moveInterval)
        moveInterval = null
      }
      isWalking.value = false
      return
    }
    
    if (playerX.value !== targetX.value) {
      playerX.value += stepX
    }
    if (playerY.value !== targetY.value) {
      playerY.value += stepY
    }
  }, 120)
}

function interactWithNpc(npc: Npc) {
  currentInteraction.value = npc
  showInteractionDialog.value = true
}

function closeInteractionDialog() {
  showInteractionDialog.value = false
  currentInteraction.value = null
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
    case 'e':
      const nearbyNpc = npcs.value.find(npc => isNpcNearby(npc))
      if (nearbyNpc) {
        interactWithNpc(nearbyNpc)
        return
      }
      
      const nearbyLocation = locations.value.find(loc => isLocationNearby(loc))
      if (nearbyLocation) {
        enterLocation(nearbyLocation)
        return
      }
      return
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
  if (moveInterval) {
    clearInterval(moveInterval)
    moveInterval = null
  }
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
  transition: all 0.2s;
}

.tile.tile-hover {
  filter: brightness(1.3);
  transform: scale(1.05);
  z-index: 10;
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
  transition: transform 0.12s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  will-change: transform;
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

.player-indicator {
  position: absolute;
  top: -8px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid var(--pixel-color-accent);
  animation: bounce 1s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
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
  transition: transform 0.2s ease;
  will-change: transform, filter;
}

.npc-character:hover {
  transform: scale(1.1);
  z-index: 95;
}

.npc-character.npc-nearby {
  animation: npc-highlight 1.5s ease-in-out infinite;
}

@keyframes npc-highlight {
  0%, 100% { 
    filter: drop-shadow(0 0 4px rgba(255, 204, 0, 0.6));
  }
  50% { 
    filter: drop-shadow(0 0 8px rgba(255, 204, 0, 1));
  }
}

.npc-interaction-hint {
  position: absolute;
  top: -24px;
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(0, 0, 0, 0.9);
  border: 2px solid var(--pixel-color-accent);
  padding: 2px 8px;
  border-radius: 4px;
  animation: hint-bounce 1s ease-in-out infinite;
}

@keyframes hint-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

.hint-key {
  font-family: var(--pixel-font);
  font-size: 10px;
  font-weight: bold;
  color: var(--pixel-color-accent);
  background: rgba(255, 204, 0, 0.2);
  padding: 2px 6px;
  border-radius: 2px;
}

.hint-action {
  font-family: var(--pixel-font);
  font-size: 8px;
  color: var(--pixel-color-primary);
}

.npc-tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  border: 2px solid var(--pixel-color-accent);
  padding: 0.5rem;
  white-space: nowrap;
  z-index: 200;
  pointer-events: none;
}

.tooltip-name {
  font-family: var(--pixel-font);
  font-size: 10px;
  color: var(--pixel-color-accent);
  margin-bottom: 0.25rem;
}

.tooltip-hint {
  font-family: var(--pixel-font);
  font-size: 8px;
  color: var(--pixel-color-secondary);
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
  z-index: 85;
}

.map-location.location-nearby {
  animation: location-highlight 1.5s ease-in-out infinite;
}

@keyframes location-highlight {
  0%, 100% { 
    border-color: var(--pixel-color-accent);
    box-shadow: 0 0 8px rgba(255, 204, 0, 0.4);
  }
  50% { 
    border-color: var(--pixel-color-highlight);
    box-shadow: 0 0 16px rgba(255, 204, 0, 0.8);
  }
}

.location-interaction-hint {
  position: absolute;
  top: -28px;
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(0, 0, 0, 0.9);
  border: 2px solid var(--pixel-color-accent);
  padding: 2px 8px;
  border-radius: 4px;
  animation: hint-bounce 1s ease-in-out infinite;
  z-index: 10;
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

.location-tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  border: 2px solid var(--pixel-color-accent);
  padding: 0.5rem;
  white-space: nowrap;
  z-index: 200;
  pointer-events: none;
}

.tooltip-title {
  font-family: var(--pixel-font);
  font-size: 10px;
  color: var(--pixel-color-accent);
  margin-bottom: 0.25rem;
}

.tooltip-type {
  font-family: var(--pixel-font);
  font-size: 8px;
  color: var(--pixel-color-green);
  margin-bottom: 0.25rem;
}

.path-indicator {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 70;
}

.path-point {
  position: absolute;
  width: 32px;
  height: 32px;
  background: rgba(255, 204, 0, 0.3);
  border: 2px dashed var(--pixel-color-accent);
  animation: path-pulse 1s ease-in-out infinite;
}

@keyframes path-pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
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

.control-row {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.control-hint {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.hint-icon {
  font-size: 12px;
}

.hint-text {
  font-family: var(--pixel-font);
  font-size: 8px;
  color: var(--pixel-color-accent);
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.8);
}

.tile-info {
  position: absolute;
  top: 8px;
  left: 8px;
  background: rgba(0, 0, 0, 0.9);
  border: 2px solid var(--pixel-color-secondary);
  padding: 0.5rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 150;
}

.info-icon {
  font-size: 16px;
}

.info-text {
  font-family: var(--pixel-font);
  font-size: 10px;
  color: var(--pixel-color-primary);
}

.info-warning {
  font-family: var(--pixel-font);
  font-size: 8px;
  color: var(--pixel-color-red);
  background: rgba(255, 0, 0, 0.2);
  padding: 0.125rem 0.375rem;
  border: 1px solid var(--pixel-color-red);
}

.interaction-dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(135deg, var(--pixel-color-bg-light) 0%, var(--pixel-color-bg) 100%);
  border: 4px solid var(--pixel-color-accent);
  box-shadow: 
    0 0 0 4px var(--pixel-color-bg-dark),
    8px 8px 0 rgba(0, 0, 0, 0.5);
  min-width: 300px;
  max-width: 400px;
  z-index: 300;
}

.dialog-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-bottom: 3px solid var(--pixel-color-secondary);
}

.dialog-icon {
  font-size: 24px;
  filter: drop-shadow(2px 2px 0 rgba(0, 0, 0, 0.5));
}

.dialog-title {
  flex: 1;
  font-family: var(--pixel-font);
  font-size: 12px;
  color: var(--pixel-color-accent);
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.8);
}

.dialog-close {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--pixel-color-bg-dark);
  border: 2px solid var(--pixel-color-secondary);
  color: var(--pixel-color-primary);
  cursor: pointer;
  font-size: 12px;
}

.dialog-close:hover {
  background: var(--pixel-color-red);
  border-color: var(--pixel-color-red-light);
}

.dialog-body {
  padding: 1.5rem;
}

.dialog-text {
  font-family: var(--pixel-font);
  font-size: 10px;
  color: var(--pixel-color-primary);
  line-height: 1.8;
  margin: 0;
}

.dialog-footer {
  display: flex;
  justify-content: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-top: 3px solid var(--pixel-color-secondary);
}

.dialog-btn {
  font-family: var(--pixel-font);
  font-size: 10px;
  padding: 0.5rem 2rem;
  background: linear-gradient(180deg, #f4f4f4 0%, #d4d4d4 50%, #a4a4a4 100%);
  border: 3px solid var(--pixel-color-accent);
  color: var(--pixel-color-bg-dark);
  cursor: pointer;
  transition: all 0.2s;
}

.dialog-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes pixel-walk {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
}

@keyframes pixel-idle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
}
</style>
