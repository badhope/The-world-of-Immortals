import { Monster, MonsterDrop } from './monsters'

export interface ExtendedMonster extends Monster {
  grade?: MonsterGrade
  origin?: string
  history?: string
  habitat?: string
  behavior?: string
  weaknesses?: string[]
  resistances?: string[]
  specialAbilities?: string[]
  evolutionPath?: string[]
  lifespan?: number
  intelligence?: number
  socialStructure?: string
  reproduction?: string
  cultivationMethod?: string
  bloodline?: string
  ancientAncestor?: string
}

export type MonsterGrade = 'mortal' | 'spirit' | 'earth' | 'heaven' | 'immortal' | 'divine'

export interface BossMonster extends ExtendedMonster {
  type: 'boss'
  title: string
  lore: string
  phases?: BossPhase[]
  uniqueDrops: MonsterDrop[]
  respawnTime?: number
  lastDefeated?: string
  defeatCount?: number
}

export interface BossPhase {
  name: string
  healthThreshold: number
  abilities: string[]
  behavior: string
}

export interface AncientBeast extends ExtendedMonster {
  type: 'ancient'
  title: string
  era: string
  lore: string
  status: 'alive' | 'dormant' | 'sealed' | 'legend'
  lastAppearance?: string
  threatLevel: number
  specialDrops: MonsterDrop[]
}

export interface MonsterGroup {
  id: string
  name: string
  type: 'pack' | 'herd' | 'swarm' | 'army'
  leader: string
  members: string[]
  territory: string
  behavior: string
  threat: string
}

export const extendedMonsters: ExtendedMonster[] = [
  {
    id: 'monster_spirit_wolf',
    name: '灵狼',
    grade: 'mortal',
    description: '最常见的灵兽之一，群居生活，是修士历练的主要目标。',
    origin: '青云大陆各地',
    history: '灵狼是最常见的灵兽，几乎每个地方都有分布。',
    habitat: '森林、草原、山地',
    behavior: '群居，有首领，领地意识强',
    weaknesses: ['火属性', '雷属性'],
    resistances: ['风属性'],
    specialAbilities: ['群体攻击', '速度提升'],
    evolutionPath: ['灵狼', '风狼', '雷狼', '天狼'],
    lifespan: 50,
    intelligence: 30,
    socialStructure: '狼群，有狼王',
    reproduction: '胎生，每胎3-5只',
    cultivationMethod: '吸收灵气',
    bloodline: '狼族血统',
    level: 5,
    health: 200,
    attack: 30,
    defense: 20,
    speed: 40,
    drops: [
      { itemId: 'material_wolf_fang', name: '狼牙', probability: 0.5 },
      { itemId: 'material_wolf_pelt', name: '狼皮', probability: 0.3 }
    ],
    experience: 50,
    behavior_pattern: '群居'
  },
  {
    id: 'monster_fire_tiger',
    name: '火焰虎',
    grade: 'spirit',
    description: '火属性灵兽，实力强大，是筑基期修士历练的主要目标。',
    origin: '西域荒漠',
    history: '火焰虎是西域荒漠的霸主之一，据说有凤凰血脉。',
    habitat: '火焰山、火山区域',
    behavior: '独居，领地意识极强',
    weaknesses: ['水属性', '冰属性'],
    resistances: ['火属性'],
    specialAbilities: ['火焰攻击', '火焰护盾', '火焰领域'],
    evolutionPath: ['火焰虎', '炎虎', '火神虎', '炎神虎'],
    lifespan: 500,
    intelligence: 50,
    socialStructure: '独居',
    reproduction: '胎生，每胎1-2只',
    cultivationMethod: '吸收火属性灵气',
    bloodline: '凤凰血脉（稀薄）',
    ancientAncestor: '火神虎',
    level: 20,
    health: 2000,
    attack: 200,
    defense: 150,
    speed: 100,
    drops: [
      { itemId: 'material_fire_tiger_fang', name: '火焰虎牙', probability: 0.3 },
      { itemId: 'material_fire_tiger_pelt', name: '火焰虎皮', probability: 0.2 },
      { itemId: 'material_fire_essence', name: '火精', probability: 0.05 }
    ],
    experience: 500,
    behavior_pattern: '独居'
  },
  {
    id: 'monster_ice_serpent',
    name: '冰霜蛇',
    grade: 'spirit',
    description: '冰属性灵兽，实力强大，是筑基期修士历练的主要目标。',
    origin: '北荒原',
    history: '冰霜蛇是北荒原的霸主之一，据说有冰龙血脉。',
    habitat: '冰原、冰洞',
    behavior: '独居，领地意识极强',
    weaknesses: ['火属性', '雷属性'],
    resistances: ['冰属性', '水属性'],
    specialAbilities: ['冰霜攻击', '冰冻', '冰霜领域'],
    evolutionPath: ['冰霜蛇', '冰蟒', '冰龙蛇', '冰龙'],
    lifespan: 500,
    intelligence: 40,
    socialStructure: '独居',
    reproduction: '卵生，每次10-20枚',
    cultivationMethod: '吸收冰属性灵气',
    bloodline: '冰龙血脉（稀薄）',
    ancientAncestor: '冰龙',
    level: 25,
    health: 2500,
    attack: 180,
    defense: 200,
    speed: 80,
    drops: [
      { itemId: 'material_ice_serpent_fang', name: '冰霜蛇牙', probability: 0.3 },
      { itemId: 'material_ice_serpent_scale', name: '冰霜蛇鳞', probability: 0.2 },
      { itemId: 'material_ice_essence', name: '冰精', probability: 0.05 }
    ],
    experience: 600,
    behavior_pattern: '独居'
  },
  {
    id: 'monster_thunder_eagle',
    name: '雷鹰',
    grade: 'spirit',
    description: '雷属性灵兽，飞行速度极快，是筑基期修士历练的主要目标。',
    origin: '中州平原',
    history: '雷鹰是中州平原天空的霸主之一，据说有雷鹏血脉。',
    habitat: '高山、天空',
    behavior: '独居或成对，领地意识强',
    weaknesses: ['土属性', '风属性'],
    resistances: ['雷属性'],
    specialAbilities: ['雷电攻击', '飞行', '雷遁'],
    evolutionPath: ['雷鹰', '雷鹏', '雷神鹰', '雷神鹏'],
    lifespan: 300,
    intelligence: 60,
    socialStructure: '独居或成对',
    reproduction: '卵生，每次2-3枚',
    cultivationMethod: '吸收雷属性灵气',
    bloodline: '雷鹏血脉（稀薄）',
    ancientAncestor: '雷神鹏',
    level: 22,
    health: 1800,
    attack: 250,
    defense: 100,
    speed: 200,
    drops: [
      { itemId: 'material_thunder_eagle_feather', name: '雷鹰羽毛', probability: 0.3 },
      { itemId: 'material_thunder_essence', name: '雷精', probability: 0.05 }
    ],
    experience: 550,
    behavior_pattern: '独居'
  },
  {
    id: 'monster_sea_dragon',
    name: '海龙',
    grade: 'earth',
    description: '海中霸主之一，实力强大，是结丹期修士历练的主要目标。',
    origin: '东海',
    history: '海龙是东海的霸主之一，据说有真龙血脉。',
    habitat: '深海、海底洞穴',
    behavior: '独居，领地意识极强',
    weaknesses: ['雷属性', '火属性'],
    resistances: ['水属性', '冰属性'],
    specialAbilities: ['水龙攻击', '海啸', '水遁', '龙威'],
    evolutionPath: ['海龙', '蛟龙', '真龙'],
    lifespan: 5000,
    intelligence: 80,
    socialStructure: '独居',
    reproduction: '卵生，每次1-2枚',
    cultivationMethod: '吸收水属性灵气',
    bloodline: '真龙血脉（稀薄）',
    ancientAncestor: '真龙',
    level: 50,
    health: 20000,
    attack: 1000,
    defense: 800,
    speed: 500,
    drops: [
      { itemId: 'material_dragon_scale', name: '龙鳞', probability: 0.3 },
      { itemId: 'material_dragon_blood', name: '龙血', probability: 0.1 },
      { itemId: 'material_dragon_essence', name: '龙精', probability: 0.02 }
    ],
    experience: 5000,
    behavior_pattern: '独居'
  },
  {
    id: 'monster_demon_beast',
    name: '魔兽',
    grade: 'spirit',
    description: '被魔气侵蚀的灵兽，实力强大，性情残暴。',
    origin: '魔域',
    history: '魔兽是被魔气侵蚀的灵兽，性情残暴，攻击性极强。',
    habitat: '魔域',
    behavior: '独居或群居，攻击性极强',
    weaknesses: ['雷属性', '光属性', '佛门功法'],
    resistances: ['魔属性', '暗属性'],
    specialAbilities: ['魔气攻击', '魔化', '吞噬'],
    evolutionPath: ['魔兽', '魔将', '魔王'],
    lifespan: 1000,
    intelligence: 30,
    socialStructure: '无固定结构',
    reproduction: '魔气侵蚀',
    cultivationMethod: '吸收魔气',
    bloodline: '魔化血统',
    level: 30,
    health: 5000,
    attack: 400,
    defense: 300,
    speed: 150,
    drops: [
      { itemId: 'material_demon_core', name: '魔核', probability: 0.2 },
      { itemId: 'material_demon_blood', name: '魔血', probability: 0.1 }
    ],
    experience: 800,
    behavior_pattern: '群居'
  }
]

export const bossMonsters: BossMonster[] = [
  {
    id: 'boss_wolf_king',
    name: '狼王',
    type: 'boss',
    title: '灵狼之王',
    grade: 'spirit',
    description: '灵狼群的首领，实力远超普通灵狼，是炼气期修士的重大挑战。',
    lore: `狼王是灵狼群的首领，统领着数百只灵狼。狼王拥有更高的智慧和实力，是灵狼进化的顶点。

据说狼王有万分之一的概率进化为天狼，成为真正的妖王。`,
    origin: '青云大陆各地',
    history: '狼王是灵狼群自然产生的首领，每代狼王都是最强的灵狼。',
    habitat: '森林、草原、山地',
    behavior: '统领狼群，领地意识极强',
    weaknesses: ['火属性', '雷属性'],
    resistances: ['风属性'],
    specialAbilities: ['狼嚎召唤', '群体增益', '风刃攻击', '速度爆发'],
    phases: [
      {
        name: '正常阶段',
        healthThreshold: 100,
        abilities: ['狼嚎召唤', '风刃攻击'],
        behavior: '正常攻击，召唤狼群'
      },
      {
        name: '狂暴阶段',
        healthThreshold: 30,
        abilities: ['狼嚎召唤', '风刃攻击', '速度爆发', '群体增益'],
        behavior: '攻击力提升，速度提升，召唤更多狼群'
      }
    ],
    uniqueDrops: [
      { itemId: 'material_wolf_king_fang', name: '狼王之牙', probability: 0.5 },
      { itemId: 'material_wolf_king_pelt', name: '狼王之皮', probability: 0.3 },
      { itemId: 'material_wolf_king_core', name: '狼王内丹', probability: 0.1 }
    ],
    respawnTime: 7,
    defeatCount: 0,
    level: 15,
    health: 5000,
    attack: 100,
    defense: 80,
    speed: 150,
    drops: [],
    experience: 2000,
    behavior_pattern: '群居'
  },
  {
    id: 'boss_fire_tiger_king',
    name: '炎虎王',
    type: 'boss',
    title: '火焰霸主',
    grade: 'earth',
    description: '火焰虎的首领，实力远超普通火焰虎，是筑基期修士的重大挑战。',
    lore: `炎虎王是火焰虎的首领，统领着火焰山区域的所有火焰虎。炎虎王拥有更高的智慧和实力，是火焰虎进化的顶点。

据说炎虎王有万分之一的概率进化为炎神虎，成为真正的妖王。`,
    origin: '西域荒漠',
    history: '炎虎王是火焰虎自然产生的首领，每代炎虎王都是最强的火焰虎。',
    habitat: '火焰山',
    behavior: '独居，领地意识极强',
    weaknesses: ['水属性', '冰属性'],
    resistances: ['火属性'],
    specialAbilities: ['火焰风暴', '火焰领域', '炎虎咆哮', '火焰护盾'],
    phases: [
      {
        name: '正常阶段',
        healthThreshold: 100,
        abilities: ['火焰攻击', '火焰护盾'],
        behavior: '正常攻击，使用火焰护盾'
      },
      {
        name: '炎怒阶段',
        healthThreshold: 50,
        abilities: ['火焰风暴', '火焰领域', '炎虎咆哮'],
        behavior: '攻击力大幅提升，使用火焰领域'
      },
      {
        name: '绝境阶段',
        healthThreshold: 20,
        abilities: ['火焰风暴', '火焰领域', '炎虎咆哮', '自爆'],
        behavior: '攻击力极高，可能自爆'
      }
    ],
    uniqueDrops: [
      { itemId: 'material_fire_tiger_king_fang', name: '炎虎王之牙', probability: 0.5 },
      { itemId: 'material_fire_tiger_king_pelt', name: '炎虎王之皮', probability: 0.3 },
      { itemId: 'material_fire_tiger_king_core', name: '炎虎王内丹', probability: 0.1 },
      { itemId: 'material_fire_essence_high', name: '火精（上品）', probability: 0.05 }
    ],
    respawnTime: 30,
    defeatCount: 0,
    level: 40,
    health: 30000,
    attack: 500,
    defense: 400,
    speed: 200,
    drops: [],
    experience: 10000,
    behavior_pattern: '独居'
  },
  {
    id: 'boss_sea_dragon_king',
    name: '海龙王',
    type: 'boss',
    title: '东海霸主',
    grade: 'heaven',
    description: '东海的霸主，实力极其强大，是结丹期修士的重大挑战。',
    lore: `海龙王是东海的霸主，统领着东海的所有海兽。海龙王拥有更高的智慧和实力，是真龙血脉的继承者。

据说海龙王有万分之一的概率进化为真龙，成为真正的龙族。`,
    origin: '东海',
    history: '海龙王是东海自然产生的霸主，每代海龙王都是最强的海龙。',
    habitat: '深海龙宫',
    behavior: '独居，领地意识极强',
    weaknesses: ['雷属性', '火属性'],
    resistances: ['水属性', '冰属性'],
    specialAbilities: ['龙威', '海啸', '水龙攻击', '龙息', '龙鳞护体'],
    phases: [
      {
        name: '正常阶段',
        healthThreshold: 100,
        abilities: ['水龙攻击', '龙鳞护体'],
        behavior: '正常攻击，使用龙鳞护体'
      },
      {
        name: '龙怒阶段',
        healthThreshold: 50,
        abilities: ['龙威', '海啸', '水龙攻击', '龙息'],
        behavior: '攻击力大幅提升，使用龙威'
      },
      {
        name: '真龙觉醒阶段',
        healthThreshold: 20,
        abilities: ['龙威', '海啸', '水龙攻击', '龙息', '真龙形态'],
        behavior: '攻击力极高，可能觉醒真龙血脉'
      }
    ],
    uniqueDrops: [
      { itemId: 'material_dragon_king_scale', name: '龙王之鳞', probability: 0.5 },
      { itemId: 'material_dragon_king_blood', name: '龙王之血', probability: 0.3 },
      { itemId: 'material_dragon_king_core', name: '龙王内丹', probability: 0.1 },
      { itemId: 'material_dragon_essence_high', name: '龙精（上品）', probability: 0.05 }
    ],
    respawnTime: 90,
    defeatCount: 0,
    level: 70,
    health: 100000,
    attack: 2000,
    defense: 1500,
    speed: 800,
    drops: [],
    experience: 50000,
    behavior_pattern: '独居'
  },
  {
    id: 'boss_demon_king',
    name: '魔王',
    type: 'boss',
    title: '魔域之主',
    grade: 'heaven',
    description: '魔域的霸主，实力极其强大，是元婴期修士的重大挑战。',
    lore: `魔王是魔域的霸主，统领着魔域的所有魔兽和魔修。魔王拥有更高的智慧和实力，是天魔皇血脉的继承者。

据说魔王有万分之一的概率觉醒天魔皇血脉，成为真正的魔皇。`,
    origin: '魔域',
    history: '魔王是魔域自然产生的霸主，每代魔王都是最强的魔修。',
    habitat: '魔城',
    behavior: '独居，统领魔域',
    weaknesses: ['雷属性', '光属性', '佛门功法'],
    resistances: ['魔属性', '暗属性'],
    specialAbilities: ['魔威', '魔气风暴', '吞噬', '魔化', '魔域领域'],
    phases: [
      {
        name: '正常阶段',
        healthThreshold: 100,
        abilities: ['魔气攻击', '魔化'],
        behavior: '正常攻击，使用魔化'
      },
      {
        name: '魔怒阶段',
        healthThreshold: 50,
        abilities: ['魔威', '魔气风暴', '吞噬', '魔域领域'],
        behavior: '攻击力大幅提升，使用魔域领域'
      },
      {
        name: '天魔觉醒阶段',
        healthThreshold: 20,
        abilities: ['魔威', '魔气风暴', '吞噬', '魔域领域', '天魔形态'],
        behavior: '攻击力极高，可能觉醒天魔血脉'
      }
    ],
    uniqueDrops: [
      { itemId: 'material_demon_king_core', name: '魔王内丹', probability: 0.5 },
      { itemId: 'material_demon_king_blood', name: '魔王之血', probability: 0.3 },
      { itemId: 'material_demon_essence_high', name: '魔精（上品）', probability: 0.1 }
    ],
    respawnTime: 180,
    defeatCount: 0,
    level: 80,
    health: 200000,
    attack: 3000,
    defense: 2000,
    speed: 500,
    drops: [],
    experience: 100000,
    behavior_pattern: '独居'
  }
]

export const ancientBeasts: AncientBeast[] = [
  {
    id: 'ancient_ice_dragon',
    name: '冰龙',
    type: 'ancient',
    title: '上古冰龙',
    era: '上古纪元',
    grade: 'immortal',
    description: '上古时期的冰龙，实力极其强大，是青云大陆最古老的存在之一。',
    lore: `冰龙是上古时期的神兽，拥有真龙血脉，实力极其强大。冰龙曾与天魔皇大战，最终两败俱伤。

冰龙现在处于沉睡状态，据说在北荒原深处的极寒禁地中沉睡。`,
    origin: '上古纪元',
    history: '冰龙是上古时期的神兽，曾与天魔皇大战，最终两败俱伤后沉睡。',
    habitat: '极寒禁地',
    behavior: '沉睡中',
    weaknesses: ['火属性（极强）', '雷属性'],
    resistances: ['冰属性', '水属性'],
    specialAbilities: ['冰龙息', '冰封天地', '龙威', '真龙形态'],
    status: 'dormant',
    lastAppearance: '上古纪元',
    threatLevel: 10,
    specialDrops: [
      { itemId: 'material_ice_dragon_scale', name: '冰龙之鳞', probability: 0.1 },
      { itemId: 'material_ice_dragon_blood', name: '冰龙之血', probability: 0.05 },
      { itemId: 'material_ice_dragon_core', name: '冰龙内丹', probability: 0.01 }
    ],
    level: 100,
    health: 1000000,
    attack: 10000,
    defense: 8000,
    speed: 2000,
    drops: [],
    experience: 1000000,
    behavior_pattern: '独居'
  },
  {
    id: 'ancient_fire_phoenix',
    name: '火凤凰',
    type: 'ancient',
    title: '上古火凤凰',
    era: '上古纪元',
    grade: 'immortal',
    description: '上古时期的火凤凰，实力极其强大，是青云大陆最古老的存在之一。',
    lore: `火凤凰是上古时期的神兽，拥有凤凰血脉，实力极其强大。火凤凰曾与天魔皇大战，最终两败俱伤。

火凤凰现在处于沉睡状态，据说在西域荒漠深处的火海禁地中沉睡。`,
    origin: '上古纪元',
    history: '火凤凰是上古时期的神兽，曾与天魔皇大战，最终两败俱伤后沉睡。',
    habitat: '火海禁地',
    behavior: '沉睡中',
    weaknesses: ['水属性（极强）', '冰属性'],
    resistances: ['火属性'],
    specialAbilities: ['凤凰火', '涅槃', '凤凰形态', '火焰领域'],
    status: 'dormant',
    lastAppearance: '上古纪元',
    threatLevel: 10,
    specialDrops: [
      { itemId: 'material_phoenix_feather', name: '凤凰羽毛', probability: 0.1 },
      { itemId: 'material_phoenix_blood', name: '凤凰之血', probability: 0.05 },
      { itemId: 'material_phoenix_core', name: '凤凰内丹', probability: 0.01 }
    ],
    level: 100,
    health: 1000000,
    attack: 10000,
    defense: 8000,
    speed: 2000,
    drops: [],
    experience: 1000000,
    behavior_pattern: '独居'
  },
  {
    id: 'ancient_thunder_peng',
    name: '雷鹏',
    type: 'ancient',
    title: '上古雷鹏',
    era: '上古纪元',
    grade: 'immortal',
    description: '上古时期的雷鹏，实力极其强大，是青云大陆最古老的存在之一。',
    lore: `雷鹏是上古时期的神兽，拥有鹏族血脉，实力极其强大。雷鹏曾与天魔皇大战，最终两败俱伤。

雷鹏现在处于沉睡状态，据说在中州平原深处的雷域中沉睡。`,
    origin: '上古纪元',
    history: '雷鹏是上古时期的神兽，曾与天魔皇大战，最终两败俱伤后沉睡。',
    habitat: '雷域',
    behavior: '沉睡中',
    weaknesses: ['土属性', '风属性'],
    resistances: ['雷属性'],
    specialAbilities: ['雷霆万钧', '风雷双翼', '鹏形态', '雷域领域'],
    status: 'dormant',
    lastAppearance: '上古纪元',
    threatLevel: 10,
    specialDrops: [
      { itemId: 'material_peng_feather', name: '鹏羽', probability: 0.1 },
      { itemId: 'material_peng_blood', name: '鹏血', probability: 0.05 },
      { itemId: 'material_peng_core', name: '鹏内丹', probability: 0.01 }
    ],
    level: 100,
    health: 1000000,
    attack: 10000,
    defense: 8000,
    speed: 3000,
    drops: [],
    experience: 1000000,
    behavior_pattern: '独居'
  },
  {
    id: 'ancient_true_dragon',
    name: '真龙',
    type: 'ancient',
    title: '上古真龙',
    era: '上古纪元',
    grade: 'divine',
    description: '上古时期的真龙，实力极其强大，是青云大陆最强的存在之一。',
    lore: `真龙是上古时期的神兽，拥有最纯正的真龙血脉，实力极其强大。真龙曾与天魔皇大战，最终将其封印。

真龙现在处于沉睡状态，据说在东海深处的龙宫中沉睡。`,
    origin: '上古纪元',
    history: '真龙是上古时期的神兽，曾与天魔皇大战，最终将其封印后沉睡。',
    habitat: '龙宫',
    behavior: '沉睡中',
    weaknesses: ['无'],
    resistances: ['全属性'],
    specialAbilities: ['龙息', '龙威', '真龙形态', '龙域领域', '龙神之力'],
    status: 'dormant',
    lastAppearance: '上古纪元',
    threatLevel: 10,
    specialDrops: [
      { itemId: 'material_true_dragon_scale', name: '真龙之鳞', probability: 0.05 },
      { itemId: 'material_true_dragon_blood', name: '真龙之血', probability: 0.02 },
      { itemId: 'material_true_dragon_core', name: '真龙内丹', probability: 0.005 }
    ],
    level: 120,
    health: 5000000,
    attack: 50000,
    defense: 30000,
    speed: 5000,
    drops: [],
    experience: 10000000,
    behavior_pattern: '独居'
  }
]

export const monsterGroups: MonsterGroup[] = [
  {
    id: 'group_wolf_pack',
    name: '灵狼群',
    type: 'pack',
    leader: 'boss_wolf_king',
    members: ['monster_spirit_wolf'],
    territory: '中州平原森林',
    behavior: '群体狩猎，有狼王指挥',
    threat: '对炼气期修士有威胁'
  },
  {
    id: 'group_fire_tiger_territory',
    name: '火焰虎领地',
    type: 'herd',
    leader: 'boss_fire_tiger_king',
    members: ['monster_fire_tiger'],
    territory: '火焰山',
    behavior: '各自狩猎，有炎虎王统领',
    threat: '对筑基期修士有威胁'
  },
  {
    id: 'group_demon_army',
    name: '魔兽军团',
    type: 'army',
    leader: 'boss_demon_king',
    members: ['monster_demon_beast'],
    territory: '魔域',
    behavior: '有组织攻击，有魔王指挥',
    threat: '对元婴期修士有威胁'
  }
]