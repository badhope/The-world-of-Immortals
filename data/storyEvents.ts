import { GameEvent } from './events'

export const storyEvents: GameEvent[] = [
  {
    id: 'story_awakening_dream',
    title: '觉醒之梦',
    description: '你从昏迷中醒来，脑海中还残留着模糊的记忆：一道金光从天而降，一位白衣修士将你救起，然后一切归于黑暗...',
    icon: '💭',
    type: 'story',
    triggerConditions: {
      day: { min: 1, max: 1 }
    },
    choices: [
      {
        id: 'recall',
        text: '努力回忆',
        effects: {
          exp: 20,
          nextEvent: 'story_memory_fragment'
        },
        successText: '你努力回想，脑海中闪过一些画面...'
      },
      {
        id: 'ignore',
        text: '不再多想',
        effects: {
          spirit: 10
        },
        successText: '你决定不再纠结过去，专注于当下。'
      }
    ],
    weight: 100,
    autoResolve: false
  },
  {
    id: 'story_memory_fragment',
    title: '记忆碎片',
    description: '你隐约记得那位白衣修士在你耳边低语："青云之下，传承等待有缘人..."随后将一块令牌放入你手中。',
    icon: '🔮',
    type: 'story',
    choices: [
      {
        id: 'check_pocket',
        text: '检查随身物品',
        effects: {
          item: { mysterious_token: 1 },
          exp: 30
        },
        successText: '你在怀中发现了一块刻有云纹的神秘令牌！'
      },
      {
        id: 'ask_villagers',
        text: '询问村民',
        effects: {
          exp: 10,
          nextEvent: 'story_villager_rumor'
        },
        successText: '你决定向村民打听消息。'
      }
    ],
    weight: 100,
    autoResolve: false
  },
  {
    id: 'story_villager_rumor',
    title: '村民的传言',
    description: '一位村民告诉你："你是三天前被村长从青山上带回来的，据说当时你浑身散发着微弱的灵光..."',
    icon: '🗣️',
    type: 'story',
    choices: [
      {
        id: 'thank',
        text: '感谢村民',
        effects: {
          reputation: { qingyun_village: 5 }
        },
        successText: '你向村民道谢，决定去找村长。'
      }
    ],
    weight: 100,
    autoResolve: true
  },
  {
    id: 'story_elder_revelation',
    title: '村长的秘密',
    description: '村长看着你手中的令牌，神色复杂："这是...青云令！传说中仙人的信物。年轻人，你的来历恐怕不简单..."',
    icon: '👴',
    type: 'story',
    triggerConditions: {
      hasItem: ['mysterious_token']
    },
    choices: [
      {
        id: 'ask_more',
        text: '追问详情',
        effects: {
          exp: 50,
          nextEvent: 'story_immortal_legend'
        },
        successText: '村长叹了口气，开始讲述千年前的往事...'
      },
      {
        id: 'stay_silent',
        text: '保持沉默',
        effects: {
          exp: 20
        },
        successText: '你决定暂时不追问，等待合适的时机。'
      }
    ],
    weight: 50
  },
  {
    id: 'story_immortal_legend',
    title: '仙人传说',
    description: '"千年前，一位名为青云的仙人在此修炼百年，最终飞升成仙。他留下了传承，但需要特定的信物才能开启。你手中的令牌，正是开启传承的钥匙之一。"',
    icon: '📖',
    type: 'story',
    choices: [
      {
        id: 'ask_inheritance',
        text: '询问传承内容',
        effects: {
          exp: 80,
          nextEvent: 'story_inheritance_hint'
        },
        successText: '村长继续说道...'
      },
      {
        id: 'ask_other_keys',
        text: '询问其他钥匙',
        effects: {
          exp: 60,
          item: { ancient_map: 1 }
        },
        successText: '村长给了你一张古旧的地图，上面标记着几个神秘地点。'
      }
    ],
    weight: 50,
    autoResolve: false
  },
  {
    id: 'story_inheritance_hint',
    title: '传承线索',
    description: '"传承藏在青山的深处，但有三道封印守护。你需要找到三块传承碎片才能解开封印。第一块碎片，就在你发现令牌的那个洞府中..."',
    icon: '🗝️',
    type: 'story',
    choices: [
      {
        id: 'accept_quest',
        text: '接受寻找传承的任务',
        effects: {
          exp: 100,
          item: { inheritance_key: 1 }
        },
        successText: '你决定踏上寻找传承之路！'
      }
    ],
    weight: 50,
    autoResolve: true
  },
  {
    id: 'story_first_fragment',
    title: '第一块碎片',
    description: '在洞府的深处，你发现了一块散发着微光的碎片。当你触碰它时，一股信息涌入脑海："传承之路，始于足下..."',
    icon: '💎',
    type: 'story',
    triggerConditions: {
      location: ['mountain_cave'],
      hasItem: ['inheritance_key']
    },
    choices: [
      {
        id: 'absorb',
        text: '吸收碎片能量',
        effects: {
          exp: 150,
          item: { inheritance_fragment: 1 },
          spirit: 30
        },
        successText: '你吸收了碎片中的能量，感觉修为有所提升。'
      },
      {
        id: 'keep',
        text: '保留碎片',
        effects: {
          item: { inheritance_fragment: 1 }
        },
        successText: '你将碎片小心收好，留待日后研究。'
      }
    ],
    weight: 30
  },
  {
    id: 'story_forest_guardian',
    title: '森林守护者',
    description: '在灵木林深处，你遇到了一只巨大的灵兽。它开口说话："凡人，你身上有传承的气息。若想通过，需回答我的问题。"',
    icon: '🦁',
    type: 'story',
    triggerConditions: {
      location: ['forest_depth'],
      hasItem: ['inheritance_fragment']
    },
    choices: [
      {
        id: 'accept_challenge',
        text: '接受挑战',
        effects: {
          nextEvent: 'story_guardian_riddle'
        },
        successText: '你点头表示同意。'
      },
      {
        id: 'fight',
        text: '直接战斗',
        requirements: {
          attribute: { strength: 20 }
        },
        effects: {
          health: -40,
          exp: 200,
          item: { inheritance_fragment: 1 }
        },
        successRate: 0.4,
        successText: '你击败了守护兽，获得了它守护的碎片！',
        failText: '守护兽太过强大，你被迫撤退。'
      }
    ],
    weight: 20
  },
  {
    id: 'story_guardian_riddle',
    title: '守护者的谜题',
    description: '"听好了：无形无影，却能改变万物；无形无质，却能承载大道。这是什么？"',
    icon: '❓',
    type: 'story',
    choices: [
      {
        id: 'answer_wind',
        text: '风',
        effects: {
          health: -20
        },
        successRate: 0.3,
        successText: '守护兽摇头："错误。"',
        failText: '守护兽摇头："错误。"'
      },
      {
        id: 'answer_thought',
        text: '意念',
        effects: {
          exp: 100,
          item: { inheritance_fragment: 1 }
        },
        successText: '守护兽点头："不错，你有些悟性。这块碎片归你了。"'
      },
      {
        id: 'answer_spirit',
        text: '灵气',
        effects: {
          exp: 50
        },
        successRate: 0.5,
        successText: '守护兽沉思片刻："接近了，但还不够准确。"',
        failText: '守护兽摇头："不完全正确。"'
      }
    ],
    weight: 100,
    autoResolve: false
  },
  {
    id: 'story_sect_messenger',
    title: '宗门使者',
    description: '一位身着青袍的修士出现在村口："青云宗感应到此地有传承气息波动，特派我来调查。年轻人，你身上有我们感兴趣的东西..."',
    icon: '🧙',
    type: 'story',
    triggerConditions: {
      hasItem: ['inheritance_fragment'],
      day: { min: 10 }
    },
    choices: [
      {
        id: 'cooperate',
        text: '表示合作意愿',
        effects: {
          exp: 50,
          nextEvent: 'story_sect_invitation'
        },
        successText: '使者露出微笑："明智的选择。"'
      },
      {
        id: 'refuse',
        text: '拒绝合作',
        effects: {
          reputation: { qingyun_sect: -20 }
        },
        successText: '使者冷哼一声："你会后悔的。"说完便离开了。'
      },
      {
        id: 'pretend',
        text: '假装不知情',
        effects: {
          exp: 30
        },
        successRate: 0.6,
        successText: '使者看了你一眼，似乎有些怀疑，但没有多说什么。',
        failText: '使者冷笑："别装了，我能感应到传承碎片的气息。"'
      }
    ],
    weight: 15
  },
  {
    id: 'story_sect_invitation',
    title: '宗门邀请',
    description: '"青云宗愿意邀请你成为外门弟子，并提供修炼资源。作为交换，你需要将传承碎片交给宗门研究。"',
    icon: '🏛️',
    type: 'story',
    choices: [
      {
        id: 'accept',
        text: '接受邀请',
        effects: {
          exp: 100,
          item: { sect_token_qingyun: 1, spirit_stone_mid: 20 },
          reputation: { qingyun_sect: 30 }
        },
        successText: '你成为了青云宗的外门弟子。'
      },
      {
        id: 'negotiate',
        text: '谈判条件',
        requirements: {
          attribute: { intelligence: 15 }
        },
        effects: {
          exp: 80,
          item: { sect_token_qingyun: 1, spirit_stone_mid: 30 },
          reputation: { qingyun_sect: 20 }
        },
        successText: '经过谈判，你获得了更好的待遇。'
      },
      {
        id: 'decline',
        text: '婉拒邀请',
        effects: {
          reputation: { qingyun_sect: -10 }
        },
        successText: '你决定暂时不加入任何宗门。'
      }
    ],
    weight: 100,
    autoResolve: false
  },
  {
    id: 'story_blood_sect_ambush',
    title: '血煞门伏击',
    description: '在前往青山的路上，一群黑衣人突然出现："交出传承碎片，饶你不死！"',
    icon: '⚔️',
    type: 'story',
    triggerConditions: {
      hasItem: ['inheritance_fragment'],
      day: { min: 15 }
    },
    choices: [
      {
        id: 'fight',
        text: '奋力反击',
        requirements: {
          attribute: { strength: 25 }
        },
        effects: {
          health: -30,
          spirit: -20,
          exp: 150,
          item: { blood_sect_token: 1 }
        },
        successRate: 0.6,
        successText: '你击退了血煞门的人，还缴获了他们的信物！',
        failText: '血煞门的人实力强大，你身受重伤逃脱。'
      },
      {
        id: 'flee',
        text: '逃跑',
        effects: {
          spirit: -15
        },
        successRate: 0.7,
        successText: '你成功逃脱了伏击。',
        failText: '逃跑时被击伤，但你还是逃脱了。'
      },
      {
        id: 'surrender',
        text: '交出碎片',
        effects: {
          item: { inheritance_fragment: -1 }
        },
        successText: '你交出了一块碎片，血煞门的人满意地离开了。'
      }
    ],
    weight: 15
  },
  {
    id: 'story_final_fragment',
    title: '最后的碎片',
    description: '在云顶峰的绝壁上，你发现了一个隐蔽的洞口。洞内散发着浓郁的灵气，第三块传承碎片就在其中！',
    icon: '🏔️',
    type: 'story',
    triggerConditions: {
      location: ['cloud_peak'],
      hasItem: ['inheritance_fragment', 'inheritance_fragment', 'inheritance_fragment']
    },
    choices: [
      {
        id: 'enter',
        text: '进入洞穴',
        effects: {
          nextEvent: 'story_inheritance_trial'
        },
        successText: '你深吸一口气，踏入洞穴。'
      }
    ],
    weight: 10
  },
  {
    id: 'story_inheritance_trial',
    title: '传承试炼',
    description: '洞穴深处，一道虚影浮现："吾乃青云，留下传承以待有缘人。若想获得传承，需通过三道考验：心性、悟性、意志。"',
    icon: '👤',
    type: 'story',
    choices: [
      {
        id: 'accept_trial',
        text: '接受试炼',
        effects: {
          nextEvent: 'story_trial_mind'
        },
        successText: '你点头表示准备就绪。'
      },
      {
        id: 'ask_questions',
        text: '询问更多',
        effects: {
          exp: 50
        },
        successText: '虚影耐心地回答了你的问题。'
      }
    ],
    weight: 100,
    autoResolve: false
  },
  {
    id: 'story_trial_mind',
    title: '心性考验',
    description: '第一道考验：幻境中，你看到了无数诱惑——权力、财富、长生...你需要保持本心不被迷惑。',
    icon: '🧠',
    type: 'story',
    choices: [
      {
        id: 'resist',
        text: '坚守本心',
        requirements: {
          attribute: { willpower: 20 }
        },
        effects: {
          exp: 200,
          spirit: 50
        },
        successRate: 0.7,
        successText: '你成功抵御了所有诱惑，心性更加坚定！',
        failText: '你差点迷失在幻境中，但最终还是挣脱了。'
      },
      {
        id: 'observe',
        text: '静观其变',
        effects: {
          exp: 100,
          spirit: 30
        },
        successText: '你冷静观察幻境，最终看破了虚妄。'
      }
    ],
    weight: 100,
    autoResolve: false
  },
  {
    id: 'story_inheritance_complete',
    title: '传承获得',
    description: '三道考验全部通过，青云仙人的虚影露出欣慰的笑容："不错，你有资格获得我的传承。记住，修仙之路，心性为先..."',
    icon: '🌟',
    type: 'story',
    choices: [
      {
        id: 'receive',
        text: '接受传承',
        effects: {
          exp: 500,
          item: { cloud_sword: 1, immortal_technique: 1, ascension_token: 1 },
          spirit: 100
        },
        successText: '传承之力涌入你的身体，你的修为大进！'
      }
    ],
    weight: 100,
    autoResolve: true
  }
]

export const randomStoryEvents: GameEvent[] = [
  {
    id: 'story_mysterious_voice',
    title: '神秘声音',
    description: '修炼时，你听到一个神秘的声音在你耳边低语："传承之路充满危险，但也蕴含机缘..."',
    icon: '🗣️',
    type: 'story',
    triggerConditions: {
      random: 0.03
    },
    choices: [
      {
        id: 'listen',
        text: '仔细聆听',
        effects: {
          exp: 50,
          spirit: 20
        },
        successText: '声音告诉你一些修炼的心得。'
      },
      {
        id: 'ignore',
        text: '不予理会',
        effects: {
          spirit: 10
        },
        successText: '你专注于修炼，不受干扰。'
      }
    ],
    weight: 5
  },
  {
    id: 'story_ancient_memory',
    title: '远古记忆',
    description: '触碰传承碎片时，一段远古的记忆涌入脑海：千年前的大战、仙人的陨落、传承的封印...',
    icon: '📜',
    type: 'story',
    triggerConditions: {
      hasItem: ['inheritance_fragment'],
      random: 0.05
    },
    choices: [
      {
        id: 'absorb',
        text: '吸收记忆',
        effects: {
          exp: 100,
          spirit: 30
        },
        successText: '你获得了关于传承的更多信息。'
      },
      {
        id: 'resist',
        text: '抵抗记忆',
        effects: {
          health: -10
        },
        successText: '你选择不吸收这些记忆，但受到了一些反噬。'
      }
    ],
    weight: 8
  },
  {
    id: 'story_fated_encounter',
    title: '命定相遇',
    description: '在旅途中，你遇到了一位神秘的老者。他看了你一眼，说道："传承选择了你，但道路需要你自己走。"',
    icon: '👴',
    type: 'story',
    triggerConditions: {
      random: 0.02
    },
    choices: [
      {
        id: 'ask_guidance',
        text: '请求指点',
        effects: {
          exp: 80,
          item: { guidance_token: 1 }
        },
        successText: '老者给了你一块指路令牌。'
      },
      {
        id: 'thank',
        text: '道谢离开',
        effects: {
          exp: 30
        },
        successText: '老者微微点头，消失在人群中。'
      }
    ],
    weight: 3
  }
]

export function getAllStoryEvents(): GameEvent[] {
  return [...storyEvents, ...randomStoryEvents]
}
