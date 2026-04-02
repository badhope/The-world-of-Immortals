export interface StoryChapter {
  id: string
  title: string
  description: string
  order: number
  quests: string[]
  unlockCondition?: {
    realm?: number
    completedQuests?: string[]
    items?: string[]
  }
  rewards: {
    exp: number
    items?: { [key: string]: number }
    unlockLocations?: string[]
    unlockFeatures?: string[]
  }
}

export interface MainQuest {
  id: string
  chapterId: string
  title: string
  description: string
  type: 'main' | 'side' | 'hidden'
  objectives: QuestObjective[]
  rewards: QuestReward
  prerequisites?: string[]
  nextQuest?: string
  timeLimit?: number
  failCondition?: string
}

export interface QuestObjective {
  id: string
  description: string
  type: 'collect' | 'kill' | 'explore' | 'talk' | 'craft' | 'cultivate' | 'reach_realm' | 'discover'
  target: string
  required: number
  current: number
  completed: boolean
  hints?: string[]
}

export interface QuestReward {
  exp: number
  spirit?: number
  items?: { [key: string]: number }
  reputation?: { [key: string]: number }
  unlockQuests?: string[]
  unlockLocations?: string[]
}

export const storyChapters: StoryChapter[] = [
  {
    id: 'chapter_1',
    title: '初入仙途',
    description: '你在一个偏僻的小村庄醒来，发现自己拥有了感知灵气的能力。村长告诉你，你是被一位神秘修士救下的。为了寻找真相，你必须踏上修仙之路。',
    order: 1,
    quests: [
      'quest_awakening',
      'quest_first_cultivation',
      'quest_village_help',
      'quest_green_mountain',
      'quest_mysterious_token'
    ],
    rewards: {
      exp: 500,
      items: { spirit_stone_low: 50, basic_cultivation_manual: 1 },
      unlockLocations: ['green_mountain', 'spirit_forest']
    }
  },
  {
    id: 'chapter_2',
    title: '青云之谜',
    description: '在修炼的过程中，你发现青云村隐藏着一个千年的秘密。当年飞升的仙人留下了传承，但需要特定的信物才能开启。村长似乎知道更多，但他欲言又止。',
    order: 2,
    quests: [
      'quest_village_secret',
      'quest_elder_request',
      'quest_forest_exploration',
      'quest_spirit_beast',
      'quest_ancient_cave'
    ],
    unlockCondition: {
      realm: 2,
      completedQuests: ['quest_mysterious_token']
    },
    rewards: {
      exp: 1000,
      items: { spirit_stone_mid: 20, cloud_sword: 1 },
      unlockLocations: ['cloud_peak', 'ancient_ruins']
    }
  },
  {
    id: 'chapter_3',
    title: '宗门风云',
    description: '你的修为引起了附近宗门的注意。青云宗和血煞门都派人来接触你，但他们的目的似乎并不单纯。你需要小心应对，同时寻找自己的道路。',
    order: 3,
    quests: [
      'quest_sect_invitation',
      'quest_qingyun_trial',
      'quest_xuesha_trap',
      'quest_choose_path',
      'quest_sect_war'
    ],
    unlockCondition: {
      realm: 5,
      completedQuests: ['quest_ancient_cave']
    },
    rewards: {
      exp: 2000,
      items: { sect_token: 1, advanced_manual: 1 },
      unlockLocations: ['qingyun_sect', 'xuesha_territory']
    }
  },
  {
    id: 'chapter_4',
    title: '秘境开启',
    description: '传说中的上古秘境即将开启，各大势力都在暗中准备。秘境中藏有飞升仙人的传承，但危险重重。你必须提升实力，才能在秘境中生存。',
    order: 4,
    quests: [
      'quest_secret_realm_prep',
      'quest_realm_key',
      'quest_enter_realm',
      'quest_realm_trial',
      'quest_inheritance'
    ],
    unlockCondition: {
      realm: 8,
      completedQuests: ['quest_sect_war']
    },
    rewards: {
      exp: 5000,
      items: { immortal_token: 1, legendary_artifact: 1 },
      unlockLocations: ['secret_realm', 'immortal_cave']
    }
  },
  {
    id: 'chapter_5',
    title: '飞升之路',
    description: '获得传承后，你终于知道了真相。千年前的仙人并非飞升，而是被天道封印。现在，封印正在松动，你必须做出选择：是追求飞升，还是打破封印？',
    order: 5,
    quests: [
      'quest_truth_revealed',
      'quest_heavenly_tribulation',
      'quest_final_choice',
      'quest_break_seal',
      'quest_ascension'
    ],
    unlockCondition: {
      realm: 12,
      completedQuests: ['quest_inheritance']
    },
    rewards: {
      exp: 10000,
      items: { ascension_token: 1 }
    }
  }
]

export const mainQuests: MainQuest[] = [
  {
    id: 'quest_awakening',
    chapterId: 'chapter_1',
    title: '苏醒',
    description: '你在青云村醒来，发现自己拥有了感知灵气的能力。村长告诉你，你是被一位神秘修士救下的。',
    type: 'main',
    objectives: [
      {
        id: 'obj_talk_elder',
        description: '与村长交谈',
        type: 'talk',
        target: 'village_elder',
        required: 1,
        current: 0,
        completed: false,
        hints: ['村长在村子中央的房屋里']
      },
      {
        id: 'obj_learn_status',
        description: '查看自己的状态',
        type: 'cultivate',
        target: 'check_status',
        required: 1,
        current: 0,
        completed: false
      }
    ],
    rewards: {
      exp: 50,
      spirit: 20
    },
    nextQuest: 'quest_first_cultivation'
  },
  {
    id: 'quest_first_cultivation',
    chapterId: 'chapter_1',
    title: '初次修炼',
    description: '村长传授给你基础的吐纳之术，让你尝试感应天地灵气。',
    type: 'main',
    objectives: [
      {
        id: 'obj_get_skill',
        description: '获得基础吐纳术',
        type: 'talk',
        target: 'village_elder',
        required: 1,
        current: 0,
        completed: false
      },
      {
        id: 'obj_cultivate',
        description: '进行第一次修炼',
        type: 'cultivate',
        target: 'meditate',
        required: 1,
        current: 0,
        completed: false,
        hints: ['可以在洞府中进行修炼']
      },
      {
        id: 'obj_reach_realm',
        description: '达到炼气一层',
        type: 'reach_realm',
        target: '1',
        required: 1,
        current: 0,
        completed: false
      }
    ],
    rewards: {
      exp: 100,
      items: { spirit_stone_low: 10 }
    },
    prerequisites: ['quest_awakening'],
    nextQuest: 'quest_village_help'
  },
  {
    id: 'quest_village_help',
    chapterId: 'chapter_1',
    title: '村庄求助',
    description: '王药师需要一些灵草来炼制丹药，村外的青山上有不少灵草。',
    type: 'main',
    objectives: [
      {
        id: 'obj_talk_herbalist',
        description: '与王药师交谈',
        type: 'talk',
        target: 'herbalist_wang',
        required: 1,
        current: 0,
        completed: false
      },
      {
        id: 'obj_collect_grass',
        description: '收集灵草',
        type: 'collect',
        target: 'spirit_grass',
        required: 5,
        current: 0,
        completed: false,
        hints: ['青山上有灵草可以采集']
      },
      {
        id: 'obj_deliver_grass',
        description: '将灵草交给王药师',
        type: 'talk',
        target: 'herbalist_wang',
        required: 1,
        current: 0,
        completed: false
      }
    ],
    rewards: {
      exp: 80,
      items: { pill_spirit_gathering: 3 },
      reputation: { qingyun_village: 10 }
    },
    prerequisites: ['quest_first_cultivation'],
    nextQuest: 'quest_green_mountain'
  },
  {
    id: 'quest_green_mountain',
    chapterId: 'chapter_1',
    title: '青山探索',
    description: '村长建议你去青山历练，那里灵气充沛，适合修炼。',
    type: 'main',
    objectives: [
      {
        id: 'obj_go_mountain',
        description: '前往青山',
        type: 'explore',
        target: 'green_mountain',
        required: 1,
        current: 0,
        completed: false
      },
      {
        id: 'obj_find_cave',
        description: '发现山腰洞府',
        type: 'discover',
        target: 'mountain_cave',
        required: 1,
        current: 0,
        completed: false,
        hints: ['在青山中探索可能发现洞府']
      },
      {
        id: 'obj_cultivate_cave',
        description: '在洞府中修炼',
        type: 'cultivate',
        target: 'cave_meditate',
        required: 1,
        current: 0,
        completed: false
      }
    ],
    rewards: {
      exp: 150,
      items: { spirit_stone_low: 20 },
      unlockLocations: ['mountain_cave']
    },
    prerequisites: ['quest_village_help'],
    nextQuest: 'quest_mysterious_token'
  },
  {
    id: 'quest_mysterious_token',
    chapterId: 'chapter_1',
    title: '神秘令牌',
    description: '在洞府深处，你发现了一块刻有云纹的神秘令牌，似乎与青云村的秘密有关。',
    type: 'main',
    objectives: [
      {
        id: 'obj_find_token',
        description: '发现神秘令牌',
        type: 'discover',
        target: 'cloud_token',
        required: 1,
        current: 0,
        completed: false,
        hints: ['在洞府深处探索']
      },
      {
        id: 'obj_show_elder',
        description: '向村长展示令牌',
        type: 'talk',
        target: 'village_elder',
        required: 1,
        current: 0,
        completed: false
      },
      {
        id: 'obj_learn_secret',
        description: '了解青云村的秘密',
        type: 'talk',
        target: 'village_elder_secret',
        required: 1,
        current: 0,
        completed: false
      }
    ],
    rewards: {
      exp: 200,
      items: { cloud_token: 1, ancient_map: 1 },
      unlockQuests: ['quest_village_secret']
    },
    prerequisites: ['quest_green_mountain']
  },
  {
    id: 'quest_village_secret',
    chapterId: 'chapter_2',
    title: '村庄秘密',
    description: '村长终于告诉你真相：青云村是千年前一位飞升仙人所建，仙人留下了传承，需要特定的信物才能开启。',
    type: 'main',
    objectives: [
      {
        id: 'obj_listen_story',
        description: '听村长讲述历史',
        type: 'talk',
        target: 'village_elder_history',
        required: 1,
        current: 0,
        completed: false
      },
      {
        id: 'obj_find_pieces',
        description: '寻找传承碎片',
        type: 'collect',
        target: 'inheritance_fragment',
        required: 3,
        current: 0,
        completed: false,
        hints: ['传承碎片可能散落在青山的各个角落']
      }
    ],
    rewards: {
      exp: 300,
      items: { inheritance_key: 1 }
    },
    prerequisites: ['quest_mysterious_token'],
    nextQuest: 'quest_elder_request'
  },
  {
    id: 'quest_elder_request',
    chapterId: 'chapter_2',
    title: '长老的请求',
    description: '村长请求你帮助解决一些村庄的问题，作为回报，他会告诉你更多关于传承的信息。',
    type: 'main',
    objectives: [
      {
        id: 'obj_help_blacksmith',
        description: '帮助铁匠李收集铁矿',
        type: 'collect',
        target: 'iron_ore',
        required: 10,
        current: 0,
        completed: false
      },
      {
        id: 'obj_clear_beasts',
        description: '清除青山上的野兽',
        type: 'kill',
        target: 'wild_beast',
        required: 5,
        current: 0,
        completed: false
      },
      {
        id: 'obj_report_elder',
        description: '向村长汇报',
        type: 'talk',
        target: 'village_elder',
        required: 1,
        current: 0,
        completed: false
      }
    ],
    rewards: {
      exp: 200,
      items: { iron_sword: 1 },
      reputation: { qingyun_village: 20 }
    },
    prerequisites: ['quest_village_secret'],
    nextQuest: 'quest_forest_exploration'
  },
  {
    id: 'quest_forest_exploration',
    chapterId: 'chapter_2',
    title: '灵木林探索',
    description: '村长告诉你，传承的线索可能在灵木林深处。',
    type: 'main',
    objectives: [
      {
        id: 'obj_enter_forest',
        description: '进入灵木林',
        type: 'explore',
        target: 'spirit_forest',
        required: 1,
        current: 0,
        completed: false
      },
      {
        id: 'obj_find_depth',
        description: '探索林深处',
        type: 'discover',
        target: 'forest_depth',
        required: 1,
        current: 0,
        completed: false
      },
      {
        id: 'obj_defeat_guardian',
        description: '击败守护兽',
        type: 'kill',
        target: 'forest_guardian',
        required: 1,
        current: 0,
        completed: false,
        hints: ['林深处有强大的守护兽']
      }
    ],
    rewards: {
      exp: 400,
      items: { spirit_wood: 20, inheritance_fragment: 1 }
    },
    prerequisites: ['quest_elder_request'],
    nextQuest: 'quest_spirit_beast'
  },
  {
    id: 'quest_spirit_beast',
    chapterId: 'chapter_2',
    title: '灵兽契约',
    description: '击败守护兽后，你发现它守护着一枚灵兽蛋。你可以选择孵化它，获得一只灵兽伙伴。',
    type: 'side',
    objectives: [
      {
        id: 'obj_find_egg',
        description: '发现灵兽蛋',
        type: 'discover',
        target: 'spirit_beast_egg',
        required: 1,
        current: 0,
        completed: false
      },
      {
        id: 'obj_hatch_egg',
        description: '孵化灵兽蛋',
        type: 'craft',
        target: 'hatch_egg',
        required: 1,
        current: 0,
        completed: false,
        hints: ['需要灵石和灵草来孵化']
      },
      {
        id: 'obj_bond_beast',
        description: '与灵兽建立契约',
        type: 'cultivate',
        target: 'beast_contract',
        required: 1,
        current: 0,
        completed: false
      }
    ],
    rewards: {
      exp: 300,
      items: { spirit_beast_companion: 1 }
    },
    prerequisites: ['quest_forest_exploration']
  },
  {
    id: 'quest_ancient_cave',
    chapterId: 'chapter_2',
    title: '上古洞府',
    description: '根据传承碎片的指引，你找到了一处上古洞府的入口。',
    type: 'main',
    objectives: [
      {
        id: 'obj_find_cave',
        description: '找到上古洞府',
        type: 'discover',
        target: 'ancient_cave',
        required: 1,
        current: 0,
        completed: false,
        hints: ['在云顶峰附近寻找']
      },
      {
        id: 'obj_solve_puzzle',
        description: '解开洞府阵法',
        type: 'cultivate',
        target: 'array_puzzle',
        required: 1,
        current: 0,
        completed: false,
        hints: ['需要智慧和灵力']
      },
      {
        id: 'obj_get_inheritance',
        description: '获得传承',
        type: 'discover',
        target: 'immortal_inheritance',
        required: 1,
        current: 0,
        completed: false
      }
    ],
    rewards: {
      exp: 800,
      items: { cloud_sword: 1, immortal_technique: 1, inheritance_fragment: 1 }
    },
    prerequisites: ['quest_forest_exploration'],
    nextQuest: 'quest_sect_invitation'
  }
]

export const sideQuests: MainQuest[] = [
  {
    id: 'quest_herb_master',
    chapterId: 'chapter_1',
    title: '药道初探',
    description: '王药师想教你炼丹的基础知识。',
    type: 'side',
    objectives: [
      {
        id: 'obj_learn_alchemy',
        description: '学习炼丹术',
        type: 'talk',
        target: 'herbalist_wang',
        required: 1,
        current: 0,
        completed: false
      },
      {
        id: 'obj_craft_pill',
        description: '炼制聚气丹',
        type: 'craft',
        target: 'pill_spirit_gathering',
        required: 3,
        current: 0,
        completed: false
      }
    ],
    rewards: {
      exp: 100,
      items: { alchemy_furnace: 1, recipe_pill_gathering: 1 }
    }
  },
  {
    id: 'quest_blacksmith_apprentice',
    chapterId: 'chapter_1',
    title: '铁匠学徒',
    description: '铁匠李需要帮手，愿意教你锻造基础。',
    type: 'side',
    objectives: [
      {
        id: 'obj_help_smith',
        description: '帮助铁匠',
        type: 'talk',
        target: 'blacksmith_li',
        required: 1,
        current: 0,
        completed: false
      },
      {
        id: 'obj_collect_ore',
        description: '收集铁矿',
        type: 'collect',
        target: 'iron_ore',
        required: 5,
        current: 0,
        completed: false
      },
      {
        id: 'obj_forge_weapon',
        description: '锻造一把武器',
        type: 'craft',
        target: 'iron_sword',
        required: 1,
        current: 0,
        completed: false
      }
    ],
    rewards: {
      exp: 120,
      items: { forge_hammer: 1, recipe_iron_sword: 1 }
    }
  },
  {
    id: 'quest_lost_traveler',
    chapterId: 'chapter_1',
    title: '迷途旅人',
    description: '在青山上遇到一个迷路的旅人，需要你的帮助。',
    type: 'side',
    objectives: [
      {
        id: 'obj_find_traveler',
        description: '找到旅人',
        type: 'discover',
        target: 'lost_traveler',
        required: 1,
        current: 0,
        completed: false
      },
      {
        id: 'obj_guide_back',
        description: '护送旅人回村',
        type: 'talk',
        target: 'guide_traveler',
        required: 1,
        current: 0,
        completed: false
      }
    ],
    rewards: {
      exp: 80,
      items: { travel_map: 1, spirit_stone_low: 15 }
    }
  },
  {
    id: 'quest_demon_core_hunt',
    chapterId: 'chapter_2',
    title: '妖核狩猎',
    description: '收集妖核可以用来炼制强大的法宝。',
    type: 'side',
    objectives: [
      {
        id: 'obj_kill_demons',
        description: '击杀妖兽',
        type: 'kill',
        target: 'demon_beast',
        required: 10,
        current: 0,
        completed: false
      },
      {
        id: 'obj_collect_cores',
        description: '收集妖核',
        type: 'collect',
        target: 'demon_core',
        required: 5,
        current: 0,
        completed: false
      }
    ],
    rewards: {
      exp: 250,
      items: { demon_core: 5, artifact_fragment: 1 }
    },
    prerequisites: ['quest_forest_exploration']
  },
  {
    id: 'quest_treasure_hunter',
    chapterId: 'chapter_2',
    title: '寻宝猎人',
    description: '在古老的遗迹中寻找宝藏。',
    type: 'side',
    objectives: [
      {
        id: 'obj_find_ruins',
        description: '发现上古遗迹',
        type: 'discover',
        target: 'ancient_ruins',
        required: 1,
        current: 0,
        completed: false
      },
      {
        id: 'obj_explore_ruins',
        description: '探索遗迹',
        type: 'explore',
        target: 'ruins_depth',
        required: 1,
        current: 0,
        completed: false
      },
      {
        id: 'obj_find_treasure',
        description: '找到宝藏',
        type: 'discover',
        target: 'ancient_treasure',
        required: 1,
        current: 0,
        completed: false
      }
    ],
    rewards: {
      exp: 350,
      items: { ancient_gold: 100, rare_gem: 3 }
    },
    prerequisites: ['quest_ancient_cave']
  }
]

export const hiddenQuests: MainQuest[] = [
  {
    id: 'quest_hidden_immortal',
    chapterId: 'chapter_1',
    title: '隐世仙人',
    description: '传说中有一位隐世的仙人，偶尔会在青山出没。',
    type: 'hidden',
    objectives: [
      {
        id: 'obj_find_immortal',
        description: '偶遇仙人',
        type: 'discover',
        target: 'hidden_immortal',
        required: 1,
        current: 0,
        completed: false,
        hints: ['在特定的时间和地点可能出现']
      },
      {
        id: 'obj_pass_test',
        description: '通过仙人的考验',
        type: 'cultivate',
        target: 'immortal_test',
        required: 1,
        current: 0,
        completed: false
      }
    ],
    rewards: {
      exp: 500,
      items: { immortal_guidance: 1, spirit_root: 1 }
    }
  },
  {
    id: 'quest_demon_pact',
    chapterId: 'chapter_2',
    title: '魔道契约',
    description: '在妖兽巢穴深处，你发现了一个被封印的魔修灵魂。',
    type: 'hidden',
    objectives: [
      {
        id: 'obj_find_demon_soul',
        description: '发现魔修灵魂',
        type: 'discover',
        target: 'demon_soul',
        required: 1,
        current: 0,
        completed: false
      },
      {
        id: 'obj_make_choice',
        description: '做出选择',
        type: 'talk',
        target: 'demon_choice',
        required: 1,
        current: 0,
        completed: false
      }
    ],
    rewards: {
      exp: 400,
      items: { demon_technique: 1 },
      reputation: { righteous_sect: -50, demonic_sect: 30 }
    },
    prerequisites: ['quest_demon_core_hunt']
  }
]

export function getChapterById(id: string): StoryChapter | undefined {
  return storyChapters.find(ch => ch.id === id)
}

export function getQuestById(id: string): MainQuest | undefined {
  return [...mainQuests, ...sideQuests, ...hiddenQuests].find(q => q.id === id)
}

export function getChapterQuests(chapterId: string): MainQuest[] {
  return [...mainQuests, ...sideQuests, ...hiddenQuests].filter(q => q.chapterId === chapterId)
}

export function getAvailableQuests(completedQuests: string[], playerRealm: number): MainQuest[] {
  const allQuests = [...mainQuests, ...sideQuests, ...hiddenQuests]
  
  return allQuests.filter(quest => {
    if (completedQuests.includes(quest.id)) return false
    
    if (quest.prerequisites) {
      const hasPrereqs = quest.prerequisites.every(prereq => completedQuests.includes(prereq))
      if (!hasPrereqs) return false
    }
    
    const chapter = getChapterById(quest.chapterId)
    if (chapter?.unlockCondition) {
      if (chapter.unlockCondition.realm && playerRealm < chapter.unlockCondition.realm) {
        return false
      }
      if (chapter.unlockCondition.completedQuests) {
        const hasCompleted = chapter.unlockCondition.completedQuests.every(q => 
          completedQuests.includes(q)
        )
        if (!hasCompleted) return false
      }
    }
    
    return true
  })
}
