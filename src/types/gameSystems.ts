export interface GameResources {
  spiritStones: number
  spiritEnergy: number
  maxSpiritEnergy: number
  spiritEnergyRegen: number
  materials: MaterialItem[]
  pills: PillItem[]
  artifacts: ArtifactItem[]
}

export interface MaterialItem {
  id: string
  name: string
  type: MaterialType
  rarity: Rarity
  quantity: number
  description: string
  icon: string
}

export type MaterialType = 
  | 'herb' 
  | 'ore' 
  | 'beast_material' 
  | 'elemental' 
  | 'special'

export interface PillItem {
  id: string
  name: string
  quality: Quality
  quantity: number
  effects: PillEffect[]
  description: string
  icon: string
}

export type Quality = 'inferior' | 'common' | 'superior' | 'excellent' | 'legendary'

export interface PillEffect {
  type: string
  value: number
  duration?: number
}

export interface ArtifactItem {
  id: string
  name: string
  type: ArtifactType
  rarity: Rarity
  level: number
  effects: ArtifactEffect[]
  description: string
  icon: string
  equipped: boolean
}

export type ArtifactType = 'weapon' | 'armor' | 'accessory' | 'tool'

export interface ArtifactEffect {
  type: string
  value: number
}

export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic'

export interface CultivationSystem {
  realm: RealmInfo
  techniques: Technique[]
  lifespan: number
  maxLifespan: number
  cultivationSpeed: number
  breakthroughChance: number
}

export interface RealmInfo {
  level: number
  name: string
  stage: number
  exp: number
  expToNext: number
  requirements: BreakthroughRequirement[]
}

export interface BreakthroughRequirement {
  type: string
  value: number | string
  description: string
  met: boolean
}

export interface Technique {
  id: string
  name: string
  type: 'main' | 'auxiliary'
  level: number
  maxLevel: number
  exp: number
  expToNext: number
  effects: TechniqueEffect[]
  description: string
  icon: string
}

export interface TechniqueEffect {
  type: string
  value: number
}

export const REALMS = [
  { level: 0, name: '凡人', stages: 1, expPerStage: 100, lifespan: 80 },
  { level: 1, name: '练气期', stages: 9, expPerStage: 500, lifespan: 150 },
  { level: 2, name: '筑基期', stages: 9, expPerStage: 2000, lifespan: 300 },
  { level: 3, name: '金丹期', stages: 9, expPerStage: 10000, lifespan: 500 },
  { level: 4, name: '元婴期', stages: 9, expPerStage: 50000, lifespan: 1000 },
  { level: 5, name: '化神期', stages: 9, expPerStage: 200000, lifespan: 2000 },
  { level: 6, name: '炼虚期', stages: 9, expPerStage: 1000000, lifespan: 5000 },
  { level: 7, name: '合体期', stages: 9, expPerStage: 5000000, lifespan: 10000 },
  { level: 8, name: '大乘期', stages: 9, expPerStage: 20000000, lifespan: 50000 },
  { level: 9, name: '渡劫期', stages: 1, expPerStage: 100000000, lifespan: 100000 }
]

export interface MapLocation {
  id: string
  name: string
  type: LocationType
  region: string
  description: string
  icon: string
  tier: number
  unlocked: boolean
  discovered: boolean
  danger: number
  rewards: LocationReward[]
  events: LocationEvent[]
  connections: string[]
}

export type LocationType = 
  | 'city' 
  | 'village' 
  | 'sect' 
  | 'secret_realm' 
  | 'wilderness' 
  | 'dungeon' 
  | 'market'

export interface LocationReward {
  type: string
  itemId?: string
  itemName?: string
  chance: number
  quantity: number
}

export interface LocationEvent {
  id: string
  name: string
  description: string
  type: 'random' | 'fixed' | 'special'
  probability: number
  requirements?: string[]
}

export interface SectSystem {
  name: string
  level: number
  reputation: number
  buildings: SectBuilding[]
  disciples: Disciple[]
  relations: SectRelation[]
  income: SectIncome
}

export interface SectBuilding {
  id: string
  type: BuildingType
  name: string
  level: number
  workers: number
  efficiency: number
  production?: BuildingProduction
  unlocked: boolean
}

export type BuildingType = 
  | 'alchemy_room' 
  | 'forge' 
  | 'library' 
  | 'spirit_field' 
  | 'medicine_garden'
  | 'training_ground'
  | 'treasury'
  | 'guest_hall'

export interface BuildingProduction {
  resource: string
  baseRate: number
  currentRate: number
  storage: number
  maxStorage: number
}

export interface Disciple {
  id: string
  name: string
  realm: string
  level: number
  loyalty: number
  potential: number
  skills: string[]
  assigned: boolean
  assignment?: string
}

export interface SectRelation {
  sectId: string
  sectName: string
  relation: 'ally' | 'friendly' | 'neutral' | 'hostile' | 'enemy'
  trust: number
}

export interface SectIncome {
  spiritStones: number
  materials: number
  pills: number
}

export interface CraftingSystem {
  alchemyRecipes: AlchemyRecipe[]
  forgingRecipes: ForgingRecipe[]
  alchemyLevel: number
  forgingLevel: number
  alchemyExp: number
  forgingExp: number
}

export interface AlchemyRecipe {
  id: string
  name: string
  tier: number
  materials: RecipeMaterial[]
  result: {
    itemId: string
    itemName: string
    quantity: number
  }
  successRate: number
  requiredLevel: number
  unlocked: boolean
  description: string
  icon: string
}

export interface ForgingRecipe {
  id: string
  name: string
  tier: number
  materials: RecipeMaterial[]
  result: {
    itemId: string
    itemName: string
    type: ArtifactType
  }
  successRate: number
  requiredLevel: number
  unlocked: boolean
  description: string
  icon: string
}

export interface RecipeMaterial {
  materialId: string
  materialName: string
  quantity: number
}

export interface GameState {
  turn: number
  maxTurnsPerMonth: number
  day: number
  month: number
  year: number
  season: '春' | '夏' | '秋' | '冬'
  weather: string
  phase: GamePhase
  turnsRemaining: number
}

export type GamePhase = 
  | 'morning' 
  | 'afternoon' 
  | 'evening' 
  | 'night'

export interface PlayerData {
  name: string
  background: string
  resources: GameResources
  cultivation: CultivationSystem
  location: string
  sect: SectSystem | null
  crafting: CraftingSystem
  quests: Quest[]
  achievements: string[]
}

export interface Quest {
  id: string
  name: string
  description: string
  type: 'main' | 'side' | 'daily'
  objectives: QuestObjective[]
  rewards: QuestReward[]
  status: 'active' | 'completed' | 'failed'
  timeLimit?: number
}

export interface QuestObjective {
  id: string
  description: string
  current: number
  target: number
  completed: boolean
}

export interface QuestReward {
  type: string
  value: number | string
  quantity?: number
}
