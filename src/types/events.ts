export interface GameEvent {
  id: string
  title: string
  description: string
  icon?: string
  type: EventType
  choices: EventChoice[]
  tags?: string[]
  weight?: number
  conditions?: EventCondition[]
  timestamp?: number
}

export type EventType = 
  | 'story'
  | 'cultivation'
  | 'combat'
  | 'exploration'
  | 'social'
  | 'discovery'
  | 'danger'
  | 'opportunity'
  | 'random'

export interface EventChoice {
  id: string
  text: string
  icon?: string
  effects: EventEffect[]
  requirements?: EventRequirement[]
  successRate?: number
  nextEventId?: string
  aiGenerated?: boolean
}

export interface EventEffect {
  type: EffectType
  value: number | string
  probability?: number
}

export type EffectType = 
  | 'health'
  | 'spirit'
  | 'cultivation_exp'
  | 'reputation'
  | 'wealth'
  | 'karma'
  | 'insight'
  | 'item_add'
  | 'item_remove'
  | 'location_unlock'
  | 'skill_learn'
  | 'event_trigger'
  | 'time_advance'
  | 'attribute_change'

export interface EventRequirement {
  type: RequirementType
  value: number | string
  operator?: 'gte' | 'lte' | 'eq' | 'neq'
}

export type RequirementType = 
  | 'health'
  | 'spirit'
  | 'cultivation_level'
  | 'reputation'
  | 'wealth'
  | 'karma'
  | 'has_item'
  | 'has_skill'
  | 'location'
  | 'time'

export interface EventCondition {
  type: ConditionType
  value: number | string | boolean
}

export type ConditionType = 
  | 'min_cultivation'
  | 'max_cultivation'
  | 'location'
  | 'has_item'
  | 'time_of_day'
  | 'season'
  | 'weather'
  | 'random_chance'

export interface PlayerAttributes {
  health: number
  maxHealth: number
  spirit: number
  maxSpirit: number
  cultivationExp: number
  cultivationLevel: number
  reputation: number
  wealth: number
  karma: number
  insight: number
  virtue: number
  demonic: number
}

export interface AttributeChange {
  type: keyof PlayerAttributes | EffectType
  oldValue: number
  newValue: number
  change: number
}

export interface EventResult {
  eventId: string
  choiceId: string
  success: boolean
  effects: AttributeChange[]
  nextEventId?: string
  message?: string
}

export interface EventHistory {
  eventId: string
  choiceId: string
  timestamp: number
  effects: AttributeChange[]
}
