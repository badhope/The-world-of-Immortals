<template>
  <div class="crafting-view">
    <div class="crafting-header">
      <h2 class="view-title">合成制作</h2>
      <div class="crafting-info">
        <span class="info-item">🔥 已解锁: {{ unlockedCount }} 配方</span>
      </div>
    </div>
    
    <div class="crafting-tabs">
      <button 
        v-for="tab in craftTabs" 
        :key="tab.value"
        class="tab-btn"
        :class="{ active: activeTab === tab.value }"
        @click="activeTab = tab.value"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        <span class="tab-label">{{ tab.label }}</span>
      </button>
    </div>
    
    <div class="crafting-content">
      <div class="recipes-section">
        <div class="section-header">
          <span class="section-title">配方列表</span>
          <span class="section-count">{{ filteredRecipes.length }} 个</span>
        </div>
        
        <div class="recipes-grid">
          <div 
            v-for="recipe in filteredRecipes" 
            :key="recipe.id"
            class="recipe-card"
            :class="{ 
              selected: selectedRecipe?.id === recipe.id,
              craftable: canCraft(recipe)
            }"
            @click="selectRecipe(recipe)"
          >
            <div class="recipe-icon-wrapper">
              <div class="recipe-icon">{{ getItemIcon(recipe.result.itemId) }}</div>
              <div class="craft-status" :class="canCraft(recipe) ? 'can-craft' : 'cannot-craft'">
                {{ canCraft(recipe) ? '✓' : '✗' }}
              </div>
            </div>
            <div class="recipe-info">
              <div class="recipe-name">{{ recipe.name }}</div>
              <div class="recipe-meta">
                <span class="success-rate">成功率 {{ (recipe.successRate * 100).toFixed(0) }}%</span>
              </div>
            </div>
          </div>
          
          <div v-if="filteredRecipes.length === 0" class="empty-recipes">
            <div class="empty-icon">📜</div>
            <p class="empty-text">暂无配方</p>
            <p class="empty-hint">探索世界解锁更多配方</p>
          </div>
        </div>
      </div>
      
      <div class="recipe-details-section" v-if="selectedRecipe">
        <div class="details-card card">
          <div class="card-header">
            <div class="header-left">
              <div class="recipe-icon-large">{{ getItemIcon(selectedRecipe.result.itemId) }}</div>
              <div class="recipe-title-info">
                <h3 class="card-title">{{ selectedRecipe.name }}</h3>
                <div class="recipe-meta-info">
                  <span class="meta-item">
                    <span class="meta-icon">📊</span>
                    成功率: <span class="meta-value">{{ (selectedRecipe.successRate * 100).toFixed(0) }}%</span>
                  </span>
                  <span class="meta-item">
                    <span class="meta-icon">⏱️</span>
                    耗时: <span class="meta-value">{{ selectedRecipe.time || 1 }} 秒</span>
                  </span>
                </div>
              </div>
            </div>
            <button class="btn-close" @click="selectedRecipe = null">✕</button>
          </div>
          
          <div class="card-body">
            <div class="crafting-flow">
              <div class="flow-section ingredients">
                <h4 class="section-label">📦 所需材料</h4>
                <div class="ingredients-list">
                  <div 
                    v-for="ing in selectedRecipe.ingredients" 
                    :key="ing.itemId"
                    class="ingredient-item"
                    :class="{ sufficient: hasIngredient(ing), insufficient: !hasIngredient(ing) }"
                  >
                    <div class="ing-icon">{{ getItemIcon(ing.itemId) }}</div>
                    <div class="ing-info">
                      <span class="ing-name">{{ getItemName(ing.itemId) }}</span>
                      <span class="ing-count">
                        <span :class="hasIngredient(ing) ? 'text-success' : 'text-danger'">
                          {{ getItemCount(ing.itemId) }}
                        </span>
                        <span class="count-sep">/</span>
                        <span>{{ ing.count }}</span>
                      </span>
                    </div>
                    <div class="ing-status">
                      {{ hasIngredient(ing) ? '✓' : '✗' }}
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="flow-section arrow">
                <div class="craft-arrow">
                  <span class="arrow-icon">→</span>
                  <span class="arrow-text">制作</span>
                </div>
              </div>
              
              <div class="flow-section result">
                <h4 class="section-label">🎁 制作结果</h4>
                <div class="result-item">
                  <div class="result-icon">{{ getItemIcon(selectedRecipe.result.itemId) }}</div>
                  <div class="result-info">
                    <span class="result-name">{{ getItemName(selectedRecipe.result.itemId) }}</span>
                    <span class="result-count">x{{ selectedRecipe.result.count }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="requirements-section" v-if="selectedRecipe.requirements">
              <h4 class="section-label">⚠️ 制作条件</h4>
              <div class="requirements-list">
                <span v-if="selectedRecipe.requirements.building" class="req-tag">
                  🏛️ 需要: {{ selectedRecipe.requirements.building }}
                </span>
                <span v-if="selectedRecipe.requirements.level" class="req-tag">
                  ⭐ 等级: {{ selectedRecipe.requirements.level }}
                </span>
                <span v-if="selectedRecipe.requirements.realm" class="req-tag">
                  🔮 境界: {{ selectedRecipe.requirements.realm }}
                </span>
              </div>
            </div>
          </div>
          
          <div class="card-footer">
            <button 
              class="btn btn-primary craft-btn" 
              :disabled="!canCraft(selectedRecipe) || isCrafting"
              @click="craft"
            >
              <span v-if="isCrafting" class="crafting-animation">🔥</span>
              <span v-else>⚒️</span>
              {{ isCrafting ? '制作中...' : '开始制作' }}
            </button>
          </div>
        </div>
      </div>
      
      <div class="recipe-details-section empty-details" v-else>
        <div class="empty-details-card">
          <div class="empty-icon">⚒️</div>
          <p class="empty-text">选择配方查看详情</p>
        </div>
      </div>
    </div>
    
    <div class="craft-result-modal" v-if="showResult" @click="showResult = false">
      <div class="result-modal-content" @click.stop>
        <div class="result-icon" :class="craftSuccess ? 'success' : 'fail'">
          {{ craftSuccess ? '✨' : '💔' }}
        </div>
        <h3 class="result-title">{{ craftSuccess ? '制作成功!' : '制作失败' }}</h3>
        <p class="result-desc" v-if="craftSuccess">
          获得 {{ getItemName(lastCraftItem) }} x{{ lastCraftCount }}
        </p>
        <p class="result-desc" v-else>
          材料已消耗，请继续努力
        </p>
        <button class="btn btn-primary" @click="showResult = false">确定</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGameStore } from '@/stores/game'
import { recipes, getRecipesByType } from '../../../data/recipes'
import { items } from '../../../data/items'
import type { Recipe, RecipeIngredient } from '@/types'

const gameStore = useGameStore()

const activeTab = ref<string>('alchemy')
const selectedRecipe = ref<Recipe | null>(null)
const isCrafting = ref(false)
const showResult = ref(false)
const craftSuccess = ref(false)
const lastCraftItem = ref('')
const lastCraftCount = ref(0)

const craftTabs = [
  { value: 'alchemy', label: '炼丹', icon: '💊' },
  { value: 'forging', label: '炼器', icon: '⚔️' },
  { value: 'talisman', label: '符箓', icon: '📜' },
  { value: 'formation', label: '阵法', icon: '🔮' }
]

const filteredRecipes = computed(() => {
  const typeRecipes = getRecipesByType(activeTab.value)
  return typeRecipes.filter(r => gameStore.world.unlockedRecipes.includes(r.id))
})

const unlockedCount = computed(() => gameStore.world.unlockedRecipes.length)

function getItem(itemId: string) {
  return items[itemId]
}

function getItemName(itemId: string): string {
  return getItem(itemId)?.name || '未知'
}

function getItemIcon(itemId: string): string {
  return getItem(itemId)?.icon || '❓'
}

function getItemCount(itemId: string): number {
  return gameStore.getItemCount(itemId)
}

function hasIngredient(ing: RecipeIngredient): boolean {
  return getItemCount(ing.itemId) >= ing.count
}

function canCraft(recipe: Recipe): boolean {
  return recipe.ingredients.every(ing => hasIngredient(ing))
}

function selectRecipe(recipe: Recipe) {
  selectedRecipe.value = recipe
}

async function craft() {
  if (!selectedRecipe.value || !canCraft(selectedRecipe.value) || isCrafting.value) return
  
  isCrafting.value = true
  
  for (const ing of selectedRecipe.value.ingredients) {
    gameStore.removeItem(ing.itemId, ing.count)
  }
  
  await new Promise(resolve => setTimeout(resolve, (selectedRecipe.value!.time || 1) * 1000))
  
  const success = Math.random() < selectedRecipe.value!.successRate
  
  if (success) {
    gameStore.addItem(selectedRecipe.value!.result.itemId, selectedRecipe.value!.result.count)
    
    gameStore.addEvent({
      id: `craft_${Date.now()}`,
      title: '制作成功',
      description: `你成功制作了${getItemName(selectedRecipe.value!.result.itemId)} x${selectedRecipe.value!.result.count}`,
      type: 'story',
      choices: [],
      timestamp: Date.now()
    })
    
    lastCraftItem.value = selectedRecipe.value!.result.itemId
    lastCraftCount.value = selectedRecipe.value!.result.count
  } else {
    gameStore.addEvent({
      id: `craft_${Date.now()}`,
      title: '制作失败',
      description: '制作失败，材料已消耗',
      type: 'danger',
      choices: [],
      timestamp: Date.now()
    })
  }
  
  craftSuccess.value = success
  showResult.value = true
  isCrafting.value = false
}
</script>

<style scoped>
.crafting-view {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem;
}

.crafting-header {
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

.crafting-info {
  display: flex;
  gap: 1rem;
}

.info-item {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.crafting-tabs {
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.tab-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--color-bg-tertiary);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.tab-btn:hover {
  background: var(--color-bg-hover);
  color: var(--color-text-primary);
}

.tab-btn.active {
  background: linear-gradient(135deg, var(--color-gold-dark), var(--color-gold));
  border-color: var(--color-gold);
  color: var(--color-bg-primary);
}

.tab-icon {
  font-size: 1.25rem;
}

.crafting-content {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 1rem;
  min-height: 0;
}

.recipes-section {
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

.section-count {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.recipes-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.75rem;
  padding: 0.75rem;
  overflow-y: auto;
  align-content: start;
}

.recipe-card {
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

.recipe-card:hover {
  transform: translateY(-2px);
  border-color: var(--color-gold);
  box-shadow: var(--shadow-glow);
}

.recipe-card.selected {
  border-color: var(--color-gold);
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
}

.recipe-card.craftable {
  border-color: var(--color-jade-dark);
}

.recipe-card.craftable:hover,
.recipe-card.craftable.selected {
  border-color: var(--color-jade);
}

.recipe-icon-wrapper {
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.recipe-icon {
  font-size: 2rem;
}

.craft-status {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 0.7rem;
  font-weight: bold;
}

.craft-status.can-craft {
  background: var(--color-jade);
  color: white;
}

.craft-status.cannot-craft {
  background: var(--color-red-dark);
  color: white;
}

.recipe-info {
  text-align: center;
  margin-top: 0.5rem;
}

.recipe-name {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
}

.recipe-meta {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.empty-recipes {
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

.recipe-details-section {
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

.recipe-icon-large {
  font-size: 2.5rem;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-bg-tertiary), var(--color-bg-secondary));
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.recipe-title-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.card-title {
  margin: 0;
}

.recipe-meta-info {
  display: flex;
  gap: 0.75rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.meta-value {
  color: var(--color-text-primary);
  font-weight: 500;
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

.crafting-flow {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1rem;
  align-items: start;
}

.flow-section {
  display: flex;
  flex-direction: column;
}

.section-label {
  font-family: var(--font-title);
  font-size: var(--font-size-sm);
  color: var(--color-text-accent);
  margin-bottom: 0.75rem;
}

.ingredients-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.ingredient-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  background: var(--color-bg-tertiary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.ingredient-item.sufficient {
  border-color: var(--color-jade-dark);
}

.ingredient-item.insufficient {
  border-color: var(--color-red-dark);
}

.ing-icon {
  font-size: 1.5rem;
}

.ing-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.ing-name {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}

.ing-count {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.count-sep {
  margin: 0 0.25rem;
}

.ing-status {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: bold;
}

.ingredient-item.sufficient .ing-status {
  background: var(--color-jade);
  color: white;
}

.ingredient-item.insufficient .ing-status {
  background: var(--color-red-dark);
  color: white;
}

.flow-section.arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 2rem;
}

.craft-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.arrow-icon {
  font-size: 2rem;
  color: var(--color-gold);
}

.arrow-text {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.result-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.05));
  border: 1px solid var(--color-gold-dark);
  border-radius: var(--radius-lg);
}

.result-icon {
  font-size: 2rem;
}

.result-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.result-name {
  font-size: var(--font-size-base);
  color: var(--color-gold);
  font-weight: 500;
}

.result-count {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.requirements-section {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.requirements-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.req-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem 0.75rem;
  background: var(--color-bg-tertiary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.card-footer {
  padding-top: 0.75rem;
  border-top: 1px solid var(--color-border);
}

.craft-btn {
  width: 100%;
  padding: 0.75rem;
  font-size: var(--font-size-base);
}

.crafting-animation {
  animation: pulse 0.5s ease-in-out infinite;
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

.craft-result-modal {
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

.result-modal-content {
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

.result-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.result-icon.success {
  color: var(--color-gold);
}

.result-icon.fail {
  color: var(--color-red);
}

.result-title {
  font-family: var(--font-title);
  font-size: var(--font-size-xl);
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
}

.result-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
}

@media (max-width: 900px) {
  .crafting-content {
    grid-template-columns: 1fr;
  }
  
  .recipe-details-section {
    order: -1;
  }
  
  .crafting-flow {
    grid-template-columns: 1fr;
  }
  
  .flow-section.arrow {
    padding: 0.5rem 0;
  }
  
  .craft-arrow {
    flex-direction: row;
  }
}
</style>
