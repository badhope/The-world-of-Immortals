<script setup lang="ts">
import { computed } from 'vue'
import { useGameSystemStore } from '@/stores/gameSystem'

const gameStore = useGameSystemStore()

const crafting = computed(() => gameStore.playerData.crafting)
const resources = computed(() => gameStore.playerData.resources)

const activeTab = computed(() => 'alchemy')

function canCraft(recipeId: string): boolean {
  const recipe = crafting.value.alchemyRecipes.find(r => r.id === recipeId)
  if (!recipe || !recipe.unlocked) return false
  if (crafting.value.alchemyLevel < recipe.requiredLevel) return false
  if (gameStore.gameState.turnsRemaining <= 0) return false
  
  for (const mat of recipe.materials) {
    const has = resources.value.materials.find(m => m.id === mat.materialId)
    if (!has || has.quantity < mat.quantity) return false
  }
  
  return true
}

function getMaterialCount(materialId: string): number {
  const mat = resources.value.materials.find(m => m.id === materialId)
  return mat ? mat.quantity : 0
}

function craft(recipeId: string) {
  if (!canCraft(recipeId)) {
    if (gameStore.gameState.turnsRemaining <= 0) {
      alert('本月回合已用完，请等待下月！')
    }
    return
  }
  
  const success = gameStore.craftPill(recipeId)
  if (success) {
    alert('炼制成功！')
  } else {
    alert('炼制失败，材料已消耗...')
  }
}

function usePill(pillId: string) {
  gameStore.usePill(pillId)
}
</script>

<template>
  <div class="crafting-view">
    <div class="crafting-header">
      <h2>🔬 炼制</h2>
      <div class="crafting-stats">
        <div class="stat-item">
          <span class="stat-label">炼丹等级</span>
          <span class="stat-value">Lv.{{ crafting.alchemyLevel }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">炼器等级</span>
          <span class="stat-value">Lv.{{ crafting.forgingLevel }}</span>
        </div>
      </div>
    </div>
    
    <div class="crafting-content">
      <div class="recipes-section">
        <h3>💊 丹方</h3>
        <div class="recipes-list">
          <div
            v-for="recipe in crafting.alchemyRecipes"
            :key="recipe.id"
            :class="['recipe-card', { 'locked': !recipe.unlocked }]"
          >
            <div class="recipe-header">
              <span class="recipe-icon">{{ recipe.icon }}</span>
              <div class="recipe-info">
                <h4>{{ recipe.name }}</h4>
                <span class="recipe-tier">T{{ recipe.tier }}</span>
              </div>
              <span class="success-rate">{{ (recipe.successRate * 100).toFixed(0) }}%</span>
            </div>
            
            <p class="recipe-desc">{{ recipe.description }}</p>
            
            <div class="materials-section">
              <span class="materials-label">所需材料:</span>
              <div class="materials-list">
                <div
                  v-for="mat in recipe.materials"
                  :key="mat.materialId"
                  :class="['material-item', { 'insufficient': getMaterialCount(mat.materialId) < mat.quantity }]"
                >
                  <span class="material-name">{{ mat.materialName }}</span>
                  <span class="material-count">
                    {{ getMaterialCount(mat.materialId) }} / {{ mat.quantity }}
                  </span>
                </div>
              </div>
            </div>
            
            <div class="recipe-requirements">
              <span class="req-label">需要等级:</span>
              <span class="req-value">Lv.{{ recipe.requiredLevel }}</span>
              <span v-if="crafting.alchemyLevel < recipe.requiredLevel" class="req-warning">
                (等级不足)
              </span>
            </div>
            
            <button
              class="craft-btn"
              :disabled="!canCraft(recipe.id)"
              @click="craft(recipe.id)"
            >
              {{ canCraft(recipe.id) ? '炼制' : '无法炼制' }}
            </button>
          </div>
        </div>
      </div>
      
      <div class="inventory-section">
        <h3>🎒 背包</h3>
        
        <div class="inventory-category">
          <h4>🌿 材料</h4>
          <div class="items-grid">
            <div
              v-for="material in resources.materials"
              :key="material.id"
              class="item-card"
            >
              <span class="item-icon">{{ material.icon }}</span>
              <div class="item-info">
                <span class="item-name">{{ material.name }}</span>
                <span class="item-quantity">x{{ material.quantity }}</span>
              </div>
            </div>
            <div v-if="resources.materials.length === 0" class="empty-slot">
              暂无材料
            </div>
          </div>
        </div>
        
        <div class="inventory-category">
          <h4>💊 丹药</h4>
          <div class="items-grid">
            <div
              v-for="pill in resources.pills"
              :key="pill.id"
              class="item-card clickable"
              @click="usePill(pill.id)"
            >
              <span class="item-icon">{{ pill.icon }}</span>
              <div class="item-info">
                <span class="item-name">{{ pill.name }}</span>
                <span class="item-quantity">x{{ pill.quantity }}</span>
              </div>
            </div>
            <div v-if="resources.pills.length === 0" class="empty-slot">
              暂无丹药
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.crafting-view {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.crafting-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.crafting-header h2 {
  font-family: var(--font-title);
  font-size: 1.75rem;
  color: var(--color-gold);
}

.crafting-stats {
  display: flex;
  gap: 1.5rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem 1.25rem;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.stat-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-bottom: 0.25rem;
}

.stat-value {
  font-family: var(--font-title);
  font-size: var(--font-size-base);
  color: var(--color-gold);
  font-weight: 600;
}

.crafting-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  flex: 1;
  overflow-y: auto;
}

.recipes-section,
.inventory-section {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
}

.recipes-section h3,
.inventory-section h3 {
  font-family: var(--font-title);
  font-size: var(--font-size-lg);
  color: var(--color-gold);
  margin-bottom: 1rem;
}

.recipes-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.recipe-card {
  padding: 1rem;
  background: var(--color-bg-tertiary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: all 0.3s;
}

.recipe-card.locked {
  opacity: 0.5;
}

.recipe-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.recipe-icon {
  font-size: 1.5rem;
}

.recipe-info {
  flex: 1;
}

.recipe-info h4 {
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
}

.recipe-tier {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.success-rate {
  padding: 0.25rem 0.5rem;
  background: var(--color-gold);
  color: var(--color-bg-primary);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: 600;
}

.recipe-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: 0.75rem;
}

.materials-section {
  margin-bottom: 0.75rem;
}

.materials-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  display: block;
  margin-bottom: 0.5rem;
}

.materials-list {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.material-item {
  display: flex;
  justify-content: space-between;
  padding: 0.375rem 0.5rem;
  background: var(--color-bg-secondary);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
}

.material-item.insufficient {
  background: rgba(231, 76, 60, 0.1);
  border: 1px solid rgba(231, 76, 60, 0.3);
}

.material-name {
  color: var(--color-text-secondary);
}

.material-count {
  color: var(--color-text-primary);
  font-weight: 500;
}

.material-item.insufficient .material-count {
  color: #e74c3c;
}

.recipe-requirements {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-bottom: 0.75rem;
}

.req-value {
  color: var(--color-text-primary);
  font-weight: 500;
  margin-left: 0.25rem;
}

.req-warning {
  color: #e74c3c;
  margin-left: 0.25rem;
}

.craft-btn {
  width: 100%;
  padding: 0.625rem;
  background: linear-gradient(135deg, var(--color-gold-dark), var(--color-gold));
  border: none;
  border-radius: var(--radius-md);
  color: var(--color-bg-primary);
  font-family: var(--font-title);
  font-size: var(--font-size-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.craft-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
}

.craft-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.inventory-category {
  margin-bottom: 1.5rem;
}

.inventory-category:last-child {
  margin-bottom: 0;
}

.inventory-category h4 {
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  margin-bottom: 0.75rem;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.75rem;
}

.item-card {
  padding: 0.75rem;
  background: var(--color-bg-tertiary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s;
}

.item-card.clickable {
  cursor: pointer;
}

.item-card.clickable:hover {
  border-color: var(--color-gold);
  transform: translateY(-2px);
}

.item-icon {
  font-size: 1.25rem;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.item-name {
  font-size: var(--font-size-xs);
  color: var(--color-text-primary);
  margin-bottom: 0.125rem;
}

.item-quantity {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.empty-slot {
  grid-column: 1 / -1;
  padding: 2rem;
  text-align: center;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}
</style>
