export interface Item {
  id: string
  name: string
  type: ItemType
  rarity: Rarity
  description: string
  icon: string
  stackable: boolean
  maxStack: number
  value: number
  effects?: ItemEffect[]
  tags?: string[]
}

export type ItemType = 
  | 'material' 
  | 'consumable' 
  | 'equipment' 
  | 'skill_book' 
  | 'artifact'
  | 'recipe'

export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic'

export interface ItemEffect {
  type: string
  value: number
  duration?: number
}

export interface Recipe {
  id: string
  name: string
  type: 'alchemy' | 'forging' | 'talisman' | 'formation'
  result: {
    itemId: string
    count: number
  }
  ingredients: RecipeIngredient[]
  requirements?: {
    level?: number
    building?: string
    skills?: string[]
  }
  time: number
  successRate: number
}

export interface RecipeIngredient {
  itemId: string
  count: number
}

export interface Location {
  id: string
  name: string
  type: LocationType
  description: string
  icon: string
  tier: number
  connections: string[]
  resources?: LocationResource[]
  dangers?: string[]
  npcs?: string[]
  buildings?: string[]
  events?: LocationEvent[]
}

export type LocationType = 
  | 'city'
  | 'village'
  | 'mountain'
  | 'forest'
  | 'cave'
  | 'ruins'
  | 'secret_realm'
  | 'sect'
  | 'market'

export interface LocationResource {
  type: string
  richness: number
  regeneration: number
}

export interface LocationEvent {
  id: string
  probability: number
  conditions?: string[]
}

export interface NPC {
  id: string
  name: string
  title: string
  realm: string
  faction?: string
  personality: string[]
  dialogues: NPCDialogue[]
  services?: NPCService[]
  quests?: string[]
}

export interface NPCDialogue {
  id: string
  condition?: string
  lines: string[]
  responses?: DialogueResponse[]
}

export interface DialogueResponse {
  text: string
  nextId?: string
  effect?: string
}

export interface NPCService {
  type: 'shop' | 'craft' | 'teach' | 'heal' | 'quest'
  data: any
}

export interface Player {
  name: string
  realm: PlayerRealm
  stats: PlayerStats
  skills: PlayerSkill[]
  inventory: InventoryItem[]
  equipment: Equipment
  location: string
  spirit: number
  maxSpirit: number
  health: number
  maxHealth: number
  karma: number
  reputation: Record<string, number>
  wealth?: number
  insight?: number
  virtue?: number
  demonic?: number
  cultivationLevel?: number
}

export interface PlayerRealm {
  level: number
  name: string
  exp: number
  expToNext: number
}

export interface PlayerStats {
  strength: number
  agility: number
  intelligence: number
  willpower: number
  luck: number
}

export interface PlayerSkill {
  id: string
  level: number
  exp: number
}

export interface InventoryItem {
  id: string
  itemId: string
  count: number
  data?: any
}

export interface Equipment {
  weapon?: string
  armor?: string
  accessory?: string[]
  artifact?: string[]
}

export interface Building {
  id: string
  type: BuildingType
  name: string
  locationId: string
  level: number
  workers: number
  production?: BuildingProduction
}

export type BuildingType = 
  | 'cave_dwelling'
  | 'alchemy_room'
  | 'forge'
  | 'spirit_field'
  | 'library'
  | 'market'
  | 'training_ground'

export interface BuildingProduction {
  resource: string
  rate: number
  storage: number
}

export interface WorldState {
  seed: number
  day: number
  season: string
  weather: string
  globalEvents: WorldEvent[]
  discoveredLocations: string[]
  unlockedRecipes: string[]
}

export interface WorldEvent {
  id: string
  name: string
  description: string
  startTime: number
  duration: number
  effects: any
}

export interface GameEvent {
  id: string
  title: string
  description: string
  type: 'random' | 'story' | 'discovery' | 'danger'
  choices: EventChoice[]
  timestamp: number
}

export interface EventChoice {
  text: string
  requirements?: any
  effects?: any
  nextEventId?: string
}
