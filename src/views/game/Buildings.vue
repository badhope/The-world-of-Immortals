<template>
  <div class="buildings-view">
    <div class="buildings-header">
      <h2 class="view-title">洞府</h2>
      <div class="header-actions">
        <span class="building-count">建筑: {{ buildings.length }}</span>
        <button class="btn btn-primary" @click="showBuildMenu = true">
          <span>🏗️</span> 新建建筑
        </button>
      </div>
    </div>
    
    <div class="buildings-content">
      <div class="buildings-grid-section">
        <div class="section-header">
          <span class="section-title">已建造建筑</span>
        </div>
        
        <div class="buildings-grid" v-if="buildings.length > 0">
          <div v-for="building in buildings" :key="building.id" class="building-card card">
            <div class="card-header">
              <div class="building-icon-wrapper">
                <div class="building-icon">{{ getBuildingIcon(building.type) }}</div>
                <div class="level-badge">Lv.{{ building.level }}</div>
              </div>
              <div class="building-info">
                <h3 class="building-name">{{ building.name }}</h3>
                <span class="building-type">{{ getBuildingTypeName(building.type) }}</span>
              </div>
            </div>
            
            <div class="card-body">
              <div class="building-details">
                <div class="detail-row">
                  <span class="detail-icon">📍</span>
                  <span class="detail-label">位置</span>
                  <span class="detail-value">{{ getLocationName(building.locationId) }}</span>
                </div>
                <div class="detail-row" v-if="building.production">
                  <span class="detail-icon">📦</span>
                  <span class="detail-label">产出</span>
                  <span class="detail-value production">
                    {{ building.production.resource }} +{{ building.production.rate }}/天
                  </span>
                </div>
                <div class="detail-row" v-if="building.bonus">
                  <span class="detail-icon">✨</span>
                  <span class="detail-label">加成</span>
                  <span class="detail-value bonus">
                    {{ building.bonus.type }} +{{ (building.bonus.value * 100).toFixed(0) }}%
                  </span>
                </div>
              </div>
            </div>
            
            <div class="card-footer">
              <button class="btn btn-sm" @click="upgradeBuilding(building)" :disabled="!canUpgrade(building)">
                <span>⬆️</span> 升级
              </button>
              <button class="btn btn-sm btn-danger" @click="demolishBuilding(building)">
                <span>🗑️</span> 拆除
              </button>
            </div>
          </div>
        </div>
        
        <div class="no-buildings" v-else>
          <div class="empty-icon">🏛️</div>
          <p class="empty-text">你还没有建造任何建筑</p>
          <p class="empty-hint">点击上方按钮开始建造</p>
        </div>
      </div>
      
      <div class="building-preview-section">
        <div class="preview-card card">
          <div class="card-header">
            <h3 class="card-title">建筑总览</h3>
          </div>
          
          <div class="preview-content">
            <div class="preview-stats">
              <div class="preview-stat">
                <span class="stat-icon">🏠</span>
                <div class="stat-info">
                  <span class="stat-value">{{ buildings.length }}</span>
                  <span class="stat-label">总建筑</span>
                </div>
              </div>
              <div class="preview-stat">
                <span class="stat-icon">📈</span>
                <div class="stat-info">
                  <span class="stat-value">{{ totalProduction }}</span>
                  <span class="stat-label">日产出</span>
                </div>
              </div>
            </div>
            
            <div class="divider"></div>
            
            <div class="production-list" v-if="productions.length > 0">
              <h4 class="section-label">📦 每日产出</h4>
              <div class="production-items">
                <div v-for="prod in productions" :key="prod.resource" class="production-item">
                  <span class="prod-icon">{{ getResourceIcon(prod.resource) }}</span>
                  <span class="prod-name">{{ prod.resource }}</span>
                  <span class="prod-value">+{{ prod.rate }}</span>
                </div>
              </div>
            </div>
            
            <div class="bonus-list" v-if="bonuses.length > 0">
              <h4 class="section-label">✨ 加成效果</h4>
              <div class="bonus-items">
                <div v-for="bonus in bonuses" :key="bonus.type" class="bonus-item">
                  <span class="bonus-icon">{{ getBonusIcon(bonus.type) }}</span>
                  <span class="bonus-name">{{ bonus.type }}</span>
                  <span class="bonus-value">+{{ (bonus.value * 100).toFixed(0) }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="build-menu-overlay" v-if="showBuildMenu" @click="showBuildMenu = false">
      <div class="build-menu card" @click.stop>
        <div class="card-header">
          <h3 class="card-title">选择建筑类型</h3>
          <button class="btn-close" @click="showBuildMenu = false">✕</button>
        </div>
        
        <div class="building-options">
          <div 
            v-for="option in buildingOptions" 
            :key="option.type"
            class="building-option"
            :class="{ disabled: !canBuild(option) }"
            @click="buildBuilding(option)"
          >
            <div class="option-icon">{{ option.icon }}</div>
            <div class="option-info">
              <div class="option-name">{{ option.name }}</div>
              <div class="option-desc">{{ option.description }}</div>
              <div class="option-costs">
                <span 
                  v-for="(cost, key) in option.cost" 
                  :key="key"
                  class="cost-item"
                  :class="{ sufficient: hasResource(key, cost), insufficient: !hasResource(key, cost) }"
                >
                  {{ getResourceIcon(key) }} {{ cost }}
                </span>
              </div>
            </div>
            <div class="option-arrow">→</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="confirm-modal" v-if="showConfirm" @click="showConfirm = false">
      <div class="modal-content" @click.stop>
        <div class="modal-icon">⚠️</div>
        <h3 class="modal-title">确认拆除</h3>
        <p class="modal-desc">确定要拆除 {{ buildingToDemolish?.name }} 吗？拆除后将无法恢复。</p>
        <div class="modal-actions">
          <button class="btn" @click="showConfirm = false">取消</button>
          <button class="btn btn-danger" @click="confirmDemolish">确认拆除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGameStore } from '@/stores/game'
import { locations } from '../../../data/locations'
import type { Building, BuildingType } from '@/types'

const gameStore = useGameStore()

const showBuildMenu = ref(false)
const showConfirm = ref(false)
const buildingToDemolish = ref<Building | null>(null)

const buildings = computed(() => gameStore.buildings)

const buildingOptions = [
  {
    type: 'cave_dwelling' as BuildingType,
    name: '洞府',
    icon: '🕳️',
    description: '修炼之所，可提升修炼速度',
    cost: { spirit_stone_low: 500 },
    bonus: { type: '修炼速度', value: 0.1 }
  },
  {
    type: 'alchemy_room' as BuildingType,
    name: '炼丹房',
    icon: '🔥',
    description: '炼制丹药的场所',
    cost: { spirit_stone_low: 1000, spirit_wood: 50 },
    bonus: { type: '炼丹成功率', value: 0.15 }
  },
  {
    type: 'forge' as BuildingType,
    name: '炼器阁',
    icon: '⚒️',
    description: '锻造装备的场所',
    cost: { spirit_stone_low: 1000, iron_essence: 50 },
    bonus: { type: '炼器成功率', value: 0.15 }
  },
  {
    type: 'spirit_field' as BuildingType,
    name: '灵田',
    icon: '🌾',
    description: '种植灵草，定期收获',
    cost: { spirit_stone_low: 300 },
    production: { resource: '灵草', rate: 5 }
  },
  {
    type: 'library' as BuildingType,
    name: '藏书阁',
    icon: '📚',
    description: '研习功法，提升悟性',
    cost: { spirit_stone_low: 2000, spirit_wood: 100 },
    bonus: { type: '悟性', value: 0.1 }
  },
  {
    type: 'training_ground' as BuildingType,
    name: '演武场',
    icon: '⚔️',
    description: '切磋武艺，提升战斗技巧',
    cost: { spirit_stone_low: 800, iron_essence: 30 },
    bonus: { type: '战斗经验', value: 0.2 }
  }
]

const totalProduction = computed(() => {
  return buildings.value.reduce((sum, b) => sum + (b.production?.rate || 0), 0)
})

const productions = computed(() => {
  const prodMap = new Map<string, number>()
  buildings.value.forEach(b => {
    if (b.production) {
      const current = prodMap.get(b.production.resource) || 0
      prodMap.set(b.production.resource, current + b.production.rate)
    }
  })
  return Array.from(prodMap.entries()).map(([resource, rate]) => ({ resource, rate }))
})

const bonuses = computed(() => {
  const bonusMap = new Map<string, number>()
  buildings.value.forEach(b => {
    if (b.bonus) {
      const current = bonusMap.get(b.bonus.type) || 0
      bonusMap.set(b.bonus.type, current + b.bonus.value)
    }
  })
  return Array.from(bonusMap.entries()).map(([type, value]) => ({ type, value }))
})

function getBuildingIcon(type: BuildingType): string {
  const option = buildingOptions.find(o => o.type === type)
  return option?.icon || '🏛️'
}

function getBuildingTypeName(type: BuildingType): string {
  const option = buildingOptions.find(o => o.type === type)
  return option?.name || type
}

function getLocationName(locationId: string): string {
  return locations[locationId]?.name || '未知'
}

function getResourceIcon(resource: string): string {
  const icons: Record<string, string> = {
    spirit_stone_low: '💎',
    spirit_wood: '🪵',
    iron_essence: '⚙️',
    spirit_grass: '🌿',
    灵草: '🌿'
  }
  return icons[resource] || '📦'
}

function getBonusIcon(type: string): string {
  const icons: Record<string, string> = {
    '修炼速度': '🧘',
    '炼丹成功率': '💊',
    '炼器成功率': '⚒️',
    '悟性': '🧠',
    '战斗经验': '⚔️'
  }
  return icons[type] || '✨'
}

function hasResource(key: string, amount: number): boolean {
  return gameStore.getItemCount(key) >= amount
}

function canBuild(option: typeof buildingOptions[0]): boolean {
  for (const [itemId, count] of Object.entries(option.cost)) {
    if (gameStore.getItemCount(itemId) < count) return false
  }
  return true
}

function canUpgrade(building: Building): boolean {
  const upgradeCost = 500 * building.level
  return gameStore.getItemCount('spirit_stone_low') >= upgradeCost
}

function buildBuilding(option: typeof buildingOptions[0]) {
  if (!canBuild(option)) return
  
  for (const [itemId, count] of Object.entries(option.cost)) {
    gameStore.removeItem(itemId, count)
  }
  
  const newBuilding: Building = {
    id: `building_${Date.now()}`,
    type: option.type,
    name: option.name,
    locationId: gameStore.player.location,
    level: 1,
    workers: 0,
    production: option.production as any,
    bonus: option.bonus as any
  }
  
  gameStore.addBuilding(newBuilding)
  
  gameStore.addEvent({
    id: `build_${Date.now()}`,
    title: '建筑完成',
    description: `你建造了一座${option.name}`,
    type: 'story',
    choices: [],
    timestamp: Date.now()
  })
  
  showBuildMenu.value = false
}

function upgradeBuilding(building: Building) {
  if (!canUpgrade(building)) return
  
  const upgradeCost = 500 * building.level
  gameStore.removeItem('spirit_stone_low', upgradeCost)
  
  building.level++
  if (building.production) {
    building.production.rate = Math.floor(building.production.rate * 1.5)
  }
  if (building.bonus) {
    building.bonus.value = building.bonus.value * 1.2
  }
  
  gameStore.addEvent({
    id: `upgrade_${Date.now()}`,
    title: '建筑升级',
    description: `${building.name} 升级到 ${building.level} 级`,
    type: 'story',
    choices: [],
    timestamp: Date.now()
  })
}

function demolishBuilding(building: Building) {
  buildingToDemolish.value = building
  showConfirm.value = true
}

function confirmDemolish() {
  if (!buildingToDemolish.value) return
  
  gameStore.removeBuilding(buildingToDemolish.value.id)
  
  gameStore.addEvent({
    id: `demolish_${Date.now()}`,
    title: '建筑拆除',
    description: `你拆除了${buildingToDemolish.value.name}`,
    type: 'story',
    choices: [],
    timestamp: Date.now()
  })
  
  showConfirm.value = false
  buildingToDemolish.value = null
}
</script>

<style scoped>
.buildings-view {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem;
}

.buildings-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, var(--color-bg-card), var(--color-bg-secondary));
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.view-title {
  font-family: var(--font-title);
  font-size: var(--font-size-xl);
  color: var(--color-text-accent);
  margin: 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.building-count {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.buildings-content {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 1rem;
  min-height: 0;
}

.buildings-grid-section {
  display: flex;
  flex-direction: column;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: var(--color-bg-tertiary);
  border-bottom: 1px solid var(--color-border);
}

.section-title {
  font-family: var(--font-title);
  font-size: var(--font-size-base);
  color: var(--color-text-accent);
}

.buildings-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 0.75rem;
  padding: 0.75rem;
  overflow-y: auto;
  align-content: start;
}

.building-card {
  display: flex;
  flex-direction: column;
}

.building-card .card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.building-icon-wrapper {
  position: relative;
}

.building-icon {
  font-size: 2rem;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-bg-tertiary), var(--color-bg-secondary));
  border-radius: var(--radius-md);
}

.level-badge {
  position: absolute;
  bottom: -4px;
  right: -4px;
  padding: 0.125rem 0.375rem;
  background: var(--color-gold);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--color-bg-primary);
}

.building-info {
  flex: 1;
}

.building-name {
  font-family: var(--font-title);
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  margin: 0 0 0.25rem 0;
}

.building-type {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.building-card .card-body {
  padding: 0.75rem 0;
}

.building-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--font-size-sm);
}

.detail-icon {
  font-size: 1rem;
}

.detail-label {
  color: var(--color-text-muted);
  min-width: 40px;
}

.detail-value {
  color: var(--color-text-secondary);
}

.detail-value.production {
  color: var(--color-jade-light);
}

.detail-value.bonus {
  color: var(--color-gold);
}

.building-card .card-footer {
  display: flex;
  gap: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--color-border);
}

.building-card .card-footer .btn {
  flex: 1;
}

.no-buildings {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-text {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  margin-bottom: 0.5rem;
}

.empty-hint {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.building-preview-section {
  display: flex;
  flex-direction: column;
}

.preview-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.preview-content {
  flex: 1;
  overflow-y: auto;
}

.preview-stats {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.preview-stat {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
}

.preview-stat .stat-icon {
  font-size: 1.5rem;
}

.preview-stat .stat-info {
  display: flex;
  flex-direction: column;
}

.preview-stat .stat-value {
  font-size: var(--font-size-xl);
  color: var(--color-gold);
  font-weight: 600;
}

.preview-stat .stat-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.section-label {
  font-family: var(--font-title);
  font-size: var(--font-size-sm);
  color: var(--color-text-accent);
  margin-bottom: 0.75rem;
}

.production-list,
.bonus-list {
  margin-top: 1rem;
}

.production-items,
.bonus-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.production-item,
.bonus-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
}

.prod-icon,
.bonus-icon {
  font-size: 1.25rem;
}

.prod-name,
.bonus-name {
  flex: 1;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.prod-value {
  font-size: var(--font-size-sm);
  color: var(--color-jade-light);
  font-weight: 500;
}

.bonus-value {
  font-size: var(--font-size-sm);
  color: var(--color-gold);
  font-weight: 500;
}

.build-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.build-menu {
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
}

.build-menu .card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-close {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-tertiary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-close:hover {
  background: var(--color-red-dark);
  border-color: var(--color-red);
  color: var(--color-text-primary);
}

.building-options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 0.75rem;
}

.building-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, var(--color-bg-card), var(--color-bg-tertiary));
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.building-option:hover:not(.disabled) {
  transform: translateX(4px);
  border-color: var(--color-gold);
  box-shadow: var(--shadow-glow);
}

.building-option.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.option-icon {
  font-size: 2.5rem;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
}

.option-info {
  flex: 1;
}

.option-name {
  font-family: var(--font-title);
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
}

.option-desc {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-bottom: 0.5rem;
}

.option-costs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.cost-item {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: var(--color-bg-secondary);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
}

.cost-item.sufficient {
  color: var(--color-jade-light);
}

.cost-item.insufficient {
  color: var(--color-red-light);
}

.option-arrow {
  font-size: 1.5rem;
  color: var(--color-text-muted);
}

.confirm-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
}

.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  text-align: center;
  min-width: 280px;
}

.modal-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.modal-title {
  font-family: var(--font-title);
  font-size: var(--font-size-xl);
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
}

.modal-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
}

.modal-actions .btn {
  min-width: 100px;
}

@media (max-width: 900px) {
  .buildings-content {
    grid-template-columns: 1fr;
  }
  
  .building-preview-section {
    order: -1;
  }
}
</style>
