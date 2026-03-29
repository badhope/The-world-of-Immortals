<template>
  <div class="inventory-view">
    <div class="inventory-header">
      <div class="header-left">
        <h2 class="view-title">背包</h2>
        <div class="capacity-badge">
          <span class="capacity-icon">🎒</span>
          <span class="capacity-text">{{ inventoryItems.length }} / {{ maxCapacity }}</span>
        </div>
      </div>
      <div class="header-right">
        <button class="btn btn-sm" @click="sortInventory">
          <span>📋</span> 整理
        </button>
      </div>
    </div>
    
    <div class="filter-bar">
      <button 
        v-for="type in itemTypes" 
        :key="type.value"
        class="filter-btn"
        :class="{ active: activeFilter === type.value }"
        @click="activeFilter = type.value"
      >
        <span class="filter-icon">{{ type.icon }}</span>
        <span class="filter-label">{{ type.label }}</span>
      </button>
    </div>
    
    <div class="inventory-content">
      <div class="inventory-grid-section">
        <div class="grid-header">
          <span class="grid-title">物品列表</span>
          <span class="grid-count">{{ filteredItems.length }} 件</span>
        </div>
        
        <div class="inventory-grid">
          <div 
            v-for="invItem in filteredItems" 
            :key="invItem.id"
            class="item-card"
            :class="[getItemRarity(invItem.itemId), { selected: selectedItem?.id === invItem.id }]"
            @click="selectItem(invItem)"
          >
            <div class="item-icon-wrapper">
              <div class="item-icon">{{ getItemIcon(invItem.itemId) }}</div>
              <div class="item-rarity-glow" :class="getItemRarity(invItem.itemId)"></div>
            </div>
            <div class="item-info">
              <div class="item-name">{{ getItemName(invItem.itemId) }}</div>
              <div class="item-type-tag">{{ getItemTypeName(invItem.itemId) }}</div>
            </div>
            <div class="item-count" v-if="invItem.count > 1">
              <span class="count-badge">x{{ invItem.count }}</span>
            </div>
          </div>
          
          <div v-if="filteredItems.length === 0" class="empty-inventory">
            <div class="empty-icon">📦</div>
            <p class="empty-text">背包空空如也</p>
            <p class="empty-hint">去探索世界收集物品吧</p>
          </div>
        </div>
      </div>
      
      <div class="item-details-section" v-if="selectedItem">
        <div class="details-card card">
          <div class="card-header">
            <div class="header-left">
              <div class="item-icon-large">{{ getItemIcon(selectedItem.itemId) }}</div>
              <div class="item-title-info">
                <h3 class="card-title" :class="getItemRarity(selectedItem.itemId)">
                  {{ getItemName(selectedItem.itemId) }}
                </h3>
                <div class="item-meta">
                  <span class="item-type">{{ getItemTypeName(selectedItem.itemId) }}</span>
                  <span class="item-rarity" :class="getItemRarity(selectedItem.itemId)">
                    {{ getRarityLabel(selectedItem.itemId) }}
                  </span>
                </div>
              </div>
            </div>
            <button class="btn-close" @click="selectedItem = null">✕</button>
          </div>
          
          <div class="card-body">
            <p class="item-description">{{ getItemDescription(selectedItem.itemId) }}</p>
            
            <div class="divider"></div>
            
            <div class="item-effects" v-if="getItemEffects(selectedItem.itemId)?.length">
              <h4 class="section-label">✨ 效果</h4>
              <div class="effects-list">
                <div 
                  v-for="(effect, index) in getItemEffects(selectedItem.itemId)" 
                  :key="index"
                  class="effect-item"
                >
                  <span class="effect-icon">{{ getEffectIcon(effect.type) }}</span>
                  <span class="effect-text">
                    {{ getEffectLabel(effect.type) }}: 
                    <span class="effect-value">+{{ effect.value }}</span>
                    <span v-if="effect.duration" class="effect-duration">({{ effect.duration }}秒)</span>
                  </span>
                </div>
              </div>
            </div>
            
            <div class="item-stats" v-if="getItemStats(selectedItem.itemId)">
              <h4 class="section-label">📊 属性</h4>
              <div class="stats-list">
                <div 
                  v-for="(value, stat) in getItemStats(selectedItem.itemId)" 
                  :key="stat"
                  class="stat-item"
                >
                  <span class="stat-name">{{ getStatLabel(stat) }}</span>
                  <span class="stat-value">+{{ value }}</span>
                </div>
              </div>
            </div>
            
            <div class="item-value-section">
              <div class="value-display">
                <span class="value-label">💰 价值</span>
                <span class="value-amount">{{ getItemValue(selectedItem.itemId) }} 灵石</span>
              </div>
            </div>
          </div>
          
          <div class="card-footer">
            <button 
              class="btn btn-primary action-btn" 
              v-if="canUse(selectedItem.itemId)"
              @click="useItem(selectedItem)"
            >
              <span>💊</span> 使用
            </button>
            <button 
              class="btn btn-success action-btn" 
              v-if="canEquip(selectedItem.itemId)"
              @click="equipItem(selectedItem)"
            >
              <span>⚔️</span> 装备
            </button>
            <button class="btn btn-danger action-btn" @click="dropItem(selectedItem)">
              <span>🗑️</span> 丢弃
            </button>
          </div>
        </div>
      </div>
      
      <div class="item-details-section empty-details" v-else>
        <div class="empty-details-card">
          <div class="empty-icon">📋</div>
          <p class="empty-text">选择物品查看详情</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGameStore } from '@/stores/game'
import { items } from '../../../data/items'
import type { InventoryItem, Item } from '@/types'

const gameStore = useGameStore()

const maxCapacity = 100
const activeFilter = ref<string>('all')
const selectedItem = ref<InventoryItem | null>(null)

const inventoryItems = computed(() => gameStore.inventoryItems)

const itemTypes = [
  { value: 'all', label: '全部', icon: '📦' },
  { value: 'material', label: '材料', icon: '🌿' },
  { value: 'consumable', label: '丹药', icon: '💊' },
  { value: 'equipment', label: '装备', icon: '⚔️' },
  { value: 'skill_book', label: '功法', icon: '📜' },
  { value: 'artifact', label: '法宝', icon: '🔮' }
]

const filteredItems = computed(() => {
  if (activeFilter.value === 'all') return inventoryItems.value
  
  return inventoryItems.value.filter(inv => {
    const item = items[inv.itemId]
    return item?.type === activeFilter.value
  })
})

function getItem(itemId: string): Item | undefined {
  return items[itemId]
}

function getItemName(itemId: string): string {
  return getItem(itemId)?.name || '未知物品'
}

function getItemIcon(itemId: string): string {
  return getItem(itemId)?.icon || '❓'
}

function getItemDescription(itemId: string): string {
  return getItem(itemId)?.description || '一件神秘的物品...'
}

function getItemRarity(itemId: string): string {
  const rarity = getItem(itemId)?.rarity || 'common'
  return `rarity-${rarity}`
}

function getRarityLabel(itemId: string): string {
  const rarity = getItem(itemId)?.rarity || 'common'
  const labels: Record<string, string> = {
    common: '普通',
    uncommon: '优秀',
    rare: '稀有',
    epic: '史诗',
    legendary: '传说',
    mythic: '神话'
  }
  return labels[rarity] || '普通'
}

function getItemTypeName(itemId: string): string {
  const type = getItem(itemId)?.type
  const typeLabels: Record<string, string> = {
    material: '材料',
    consumable: '丹药',
    equipment: '装备',
    skill_book: '功法',
    artifact: '法宝',
    recipe: '配方'
  }
  return typeLabels[type || ''] || type || '物品'
}

function getItemEffects(itemId: string) {
  return getItem(itemId)?.effects
}

function getItemStats(itemId: string) {
  return getItem(itemId)?.stats
}

function getItemValue(itemId: string): number {
  return getItem(itemId)?.value || 0
}

function getEffectIcon(type: string): string {
  const icons: Record<string, string> = {
    heal: '❤️',
    spirit_regen: '✨',
    exp_boost: '⭐',
    stat_boost: '📈'
  }
  return icons[type] || '✨'
}

function getEffectLabel(type: string): string {
  const labels: Record<string, string> = {
    heal: '恢复生命',
    spirit_regen: '恢复灵力',
    exp_boost: '经验加成',
    stat_boost: '属性提升'
  }
  return labels[type] || type
}

function getStatLabel(stat: string): string {
  const labels: Record<string, string> = {
    strength: '力量',
    agility: '敏捷',
    intelligence: '智力',
    willpower: '意志',
    luck: '幸运'
  }
  return labels[stat] || stat
}

function canUse(itemId: string): boolean {
  const item = getItem(itemId)
  return item?.type === 'consumable'
}

function canEquip(itemId: string): boolean {
  const item = getItem(itemId)
  return item?.type === 'equipment' || item?.type === 'artifact'
}

function selectItem(invItem: InventoryItem) {
  selectedItem.value = invItem
}

function sortInventory() {
  gameStore.addEvent({
    id: `sort_${Date.now()}`,
    title: '整理背包',
    description: '你整理了背包中的物品',
    type: 'story',
    choices: [],
    timestamp: Date.now()
  })
}

function useItem(invItem: InventoryItem) {
  const item = getItem(invItem.itemId)
  if (!item?.effects) return
  
  for (const effect of item.effects) {
    if (effect.type === 'heal') {
      gameStore.player.health = Math.min(
        gameStore.player.maxHealth,
        gameStore.player.health + effect.value
      )
    } else if (effect.type === 'spirit_regen') {
      gameStore.player.spirit = Math.min(
        gameStore.player.maxSpirit,
        gameStore.player.spirit + effect.value
      )
    }
  }
  
  gameStore.removeItem(invItem.itemId, 1)
  
  gameStore.addEvent({
    id: `use_${Date.now()}`,
    title: '使用物品',
    description: `你使用了${item.name}`,
    type: 'story',
    choices: [],
    timestamp: Date.now()
  })
  
  if (invItem.count <= 1) {
    selectedItem.value = null
  }
}

function equipItem(invItem: InventoryItem) {
  const item = getItem(invItem.itemId)
  if (!item) return
  
  gameStore.addEvent({
    id: `equip_${Date.now()}`,
    title: '装备物品',
    description: `你装备了${item.name}`,
    type: 'story',
    choices: [],
    timestamp: Date.now()
  })
}

function dropItem(invItem: InventoryItem) {
  const item = getItem(invItem.itemId)
  if (!item) return
  
  if (confirm(`确定要丢弃 ${item.name} x${invItem.count} 吗？`)) {
    gameStore.removeItem(invItem.itemId, invItem.count)
    selectedItem.value = null
    
    gameStore.addEvent({
      id: `drop_${Date.now()}`,
      title: '丢弃物品',
      description: `你丢弃了${item.name}`,
      type: 'story',
      choices: [],
      timestamp: Date.now()
    })
  }
}
</script>

<style scoped>
.inventory-view {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem;
}

.inventory-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, var(--color-bg-card), var(--color-bg-secondary));
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.view-title {
  font-family: var(--font-title);
  font-size: var(--font-size-xl);
  color: var(--color-text-accent);
  margin: 0;
}

.capacity-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  background: var(--color-bg-tertiary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.capacity-icon {
  font-size: 1rem;
}

.capacity-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.filter-bar {
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow-x: auto;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--color-bg-tertiary);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.filter-btn:hover {
  background: var(--color-bg-hover);
  color: var(--color-text-primary);
}

.filter-btn.active {
  background: linear-gradient(135deg, var(--color-gold-dark), var(--color-gold));
  border-color: var(--color-gold);
  color: var(--color-bg-primary);
}

.filter-icon {
  font-size: 1rem;
}

.inventory-content {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 1rem;
  min-height: 0;
}

.inventory-grid-section {
  display: flex;
  flex-direction: column;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.grid-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: var(--color-bg-tertiary);
  border-bottom: 1px solid var(--color-border);
}

.grid-title {
  font-family: var(--font-title);
  font-size: var(--font-size-base);
  color: var(--color-text-accent);
}

.grid-count {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.inventory-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 0.75rem;
  padding: 0.75rem;
  overflow-y: auto;
  align-content: start;
}

.item-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem;
  background: linear-gradient(135deg, var(--color-bg-card), var(--color-bg-tertiary));
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.item-card:hover {
  transform: translateY(-2px);
  border-color: var(--color-gold);
  box-shadow: var(--shadow-glow);
}

.item-card.selected {
  border-color: var(--color-gold);
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
}

.item-icon-wrapper {
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-icon {
  font-size: 2rem;
  z-index: 1;
}

.item-rarity-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  opacity: 0.3;
  filter: blur(8px);
}

.item-rarity-glow.rarity-common { background: #888; }
.item-rarity-glow.rarity-uncommon { background: #40a060; }
.item-rarity-glow.rarity-rare { background: #4080c0; }
.item-rarity-glow.rarity-epic { background: #8060c0; }
.item-rarity-glow.rarity-legendary { background: #d4af37; }
.item-rarity-glow.rarity-mythic { background: #c04040; }

.item-info {
  text-align: center;
  margin-top: 0.5rem;
}

.item-name {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
}

.item-type-tag {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.item-count {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}

.count-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  padding: 0.125rem 0.375rem;
  background: var(--color-gold);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--color-bg-primary);
}

.empty-inventory {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
}

.empty-icon {
  font-size: 3rem;
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

.item-details-section {
  display: flex;
  flex-direction: column;
}

.details-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
}

.header-left {
  display: flex;
  gap: 0.75rem;
}

.item-icon-large {
  font-size: 2.5rem;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
}

.item-title-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.card-title {
  margin: 0;
}

.card-title.rarity-common { color: var(--color-text-secondary); }
.card-title.rarity-uncommon { color: #60c080; }
.card-title.rarity-rare { color: #60a0e0; }
.card-title.rarity-epic { color: #a080e0; }
.card-title.rarity-legendary { color: var(--color-gold); }
.card-title.rarity-mythic { color: #e06060; }

.item-meta {
  display: flex;
  gap: 0.5rem;
}

.item-type {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.item-rarity {
  font-size: var(--font-size-xs);
  padding: 0.125rem 0.375rem;
  border-radius: var(--radius-sm);
}

.item-rarity.rarity-common { 
  background: rgba(136, 136, 136, 0.2); 
  color: #aaa; 
}
.item-rarity.rarity-uncommon { 
  background: rgba(64, 160, 96, 0.2); 
  color: #60c080; 
}
.item-rarity.rarity-rare { 
  background: rgba(64, 128, 192, 0.2); 
  color: #60a0e0; 
}
.item-rarity.rarity-epic { 
  background: rgba(128, 96, 192, 0.2); 
  color: #a080e0; 
}
.item-rarity.rarity-legendary { 
  background: rgba(212, 175, 55, 0.2); 
  color: var(--color-gold); 
}
.item-rarity.rarity-mythic { 
  background: rgba(192, 64, 64, 0.2); 
  color: #e06060; 
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

.card-body {
  flex: 1;
  overflow-y: auto;
  padding: 0.75rem 0;
}

.item-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 0.75rem;
}

.section-label {
  font-family: var(--font-title);
  font-size: var(--font-size-sm);
  color: var(--color-text-accent);
  margin-bottom: 0.5rem;
}

.effects-list,
.stats-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.effect-item,
.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
}

.effect-icon {
  font-size: 1rem;
}

.effect-text,
.stat-name {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.effect-value,
.stat-value {
  color: var(--color-jade-light);
  font-weight: 500;
}

.effect-duration {
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
}

.item-value-section {
  margin-top: 0.75rem;
}

.value-display {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.05));
  border: 1px solid var(--color-gold-dark);
  border-radius: var(--radius-md);
}

.value-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.value-amount {
  font-size: var(--font-size-base);
  color: var(--color-gold);
  font-weight: 600;
}

.card-footer {
  display: flex;
  gap: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--color-border);
}

.action-btn {
  flex: 1;
}

.empty-details {
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-details-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: var(--color-bg-secondary);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-lg);
  text-align: center;
  width: 100%;
  height: 100%;
}

.empty-details-card .empty-icon {
  font-size: 2.5rem;
  opacity: 0.3;
  margin-bottom: 0.75rem;
}

.empty-details-card .empty-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

@media (max-width: 900px) {
  .inventory-content {
    grid-template-columns: 1fr;
  }
  
  .item-details-section {
    order: -1;
  }
}
</style>
