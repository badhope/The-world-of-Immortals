export const gameEvents = [
  {
    id: 'event-1',
    title: '山中偶遇',
    description: '你在山路上遇到一位白发老者，他看起来气度不凡，似乎是一位隐世的高人。他向你微笑点头，似乎在等待你的反应。',
    icon: '👴',
    type: 'social',
    choices: [
      {
        id: 'choice-1-1',
        text: '上前请教',
        icon: '🙏',
        effects: [
          { type: 'reputation', value: 10 },
          { type: 'cultivation_exp', value: 20 },
          { type: 'spirit', value: -10 }
        ]
      },
      {
        id: 'choice-1-2',
        text: '绕道而行',
        icon: '🚶',
        effects: [
          { type: 'karma', value: -5 },
          { type: 'time_advance', value: 1 }
        ]
      }
    ]
  },
  {
    id: 'event-2',
    title: '灵兽袭击',
    description: '一只浑身散发着灵气的妖狼从树林中窜出，它的眼中闪烁着凶光，显然已经把你当成了猎物。',
    icon: '🐺',
    type: 'combat',
    choices: [
      {
        id: 'choice-2-1',
        text: '正面迎敌',
        icon: '⚔️',
        effects: [
          { type: 'health', value: -30 },
          { type: 'cultivation_exp', value: 30 },
          { type: 'reputation', value: 5 }
        ],
        successRate: 0.7
      },
      {
        id: 'choice-2-2',
        text: '迅速逃离',
        icon: '🏃',
        effects: [
          { type: 'spirit', value: -20 },
          { type: 'reputation', value: -5 }
        ]
      }
    ]
  },
  {
    id: 'event-3',
    title: '灵药发现',
    description: '在岩石缝隙中，你发现了一株散发着淡淡光芒的灵草。这看起来是一株百年灵芝，价值不菲。',
    icon: '🌿',
    type: 'discovery',
    choices: [
      {
        id: 'choice-3-1',
        text: '小心采摘',
        icon: '✋',
        effects: [
          { type: 'item_add', value: '百年灵芝' },
          { type: 'cultivation_exp', value: 5 }
        ]
      },
      {
        id: 'choice-3-2',
        text: '就地服用',
        icon: '💊',
        effects: [
          { type: 'health', value: 50 },
          { type: 'cultivation_exp', value: 15 }
        ]
      }
    ]
  },
  {
    id: 'event-4',
    title: '修炼感悟',
    description: '夜深人静，你盘膝而坐，运转功法。突然间，你感到体内灵气涌动，似乎即将有所突破。',
    icon: '🧘',
    type: 'cultivation',
    choices: [
      {
        id: 'choice-4-1',
        text: '顺势突破',
        icon: '⬆️',
        effects: [
          { type: 'cultivation_exp', value: 50 },
          { type: 'spirit', value: -50 },
          { type: 'health', value: -20 }
        ],
        successRate: 0.5
      },
      {
        id: 'choice-4-2',
        text: '稳扎稳打',
        icon: '⏸️',
        effects: [
          { type: 'cultivation_exp', value: 20 },
          { type: 'spirit', value: -10 }
        ]
      }
    ]
  },
  {
    id: 'event-5',
    title: '商队路过',
    description: '一队商旅从你身边经过，领头的商人热情地向你打招呼，询问你是否需要购买一些修炼资源。',
    icon: '🛒',
    type: 'opportunity',
    choices: [
      {
        id: 'choice-5-1',
        text: '购买丹药',
        icon: '💊',
        effects: [
          { type: 'wealth', value: -50 },
          { type: 'item_add', value: '疗伤丹' }
        ]
      },
      {
        id: 'choice-5-2',
        text: '婉言谢绝',
        icon: '👋',
        effects: [
          { type: 'time_advance', value: 1 }
        ]
      }
    ]
  },
  {
    id: 'event-6',
    title: '神秘洞府',
    description: '你发现了一处隐蔽的洞府，门口刻着古老的符文。似乎是一位前辈修士留下的遗迹。',
    icon: '🏛️',
    type: 'discovery',
    choices: [
      {
        id: 'choice-6-1',
        text: '进入探索',
        icon: '🚪',
        effects: [
          { type: 'cultivation_exp', value: 40 },
          { type: 'wealth', value: 30 },
          { type: 'health', value: -15 }
        ]
      },
      {
        id: 'choice-6-2',
        text: '标记后离开',
        icon: '📍',
        effects: [
          { type: 'insight', value: 5 },
          { type: 'time_advance', value: 1 }
        ]
      }
    ]
  },
  {
    id: 'event-7',
    title: '宗门招新',
    description: '前方有一群修士正在招收新弟子，他们来自青云宗，是附近颇有名望的修仙门派。',
    icon: '🏯',
    type: 'social',
    choices: [
      {
        id: 'choice-7-1',
        text: '报名加入',
        icon: '📝',
        effects: [
          { type: 'reputation', value: 20 },
          { type: 'wealth', value: 50 },
          { type: 'karma', value: 10 }
        ]
      },
      {
        id: 'choice-7-2',
        text: '独自修炼',
        icon: '🚶',
        effects: [
          { type: 'insight', value: 10 },
          { type: 'cultivation_exp', value: 15 }
        ]
      }
    ]
  },
  {
    id: 'event-8',
    title: '妖兽内丹',
    description: '你在山洞中发现了一颗散发着妖气的内丹，似乎是某只强大妖兽留下的。它蕴含着强大的能量。',
    icon: '💎',
    type: 'discovery',
    choices: [
      {
        id: 'choice-8-1',
        text: '吸收炼化',
        icon: '🌀',
        effects: [
          { type: 'cultivation_exp', value: 60 },
          { type: 'demonic', value: 10 },
          { type: 'health', value: -20 }
        ]
      },
      {
        id: 'choice-8-2',
        text: '出售换钱',
        icon: '💰',
        effects: [
          { type: 'wealth', value: 100 },
          { type: 'virtue', value: 5 }
        ]
      }
    ]
  },
  {
    id: 'event-9',
    title: '天降机缘',
    description: '天空中突然出现一道金光，直直落入你面前的地面。你走近一看，竟是一块天外陨铁！',
    icon: '🌟',
    type: 'opportunity',
    choices: [
      {
        id: 'choice-9-1',
        text: '收入囊中',
        icon: '✨',
        effects: [
          { type: 'item_add', value: '天外陨铁' },
          { type: 'insight', value: 5 }
        ]
      },
      {
        id: 'choice-9-2',
        text: '原地修炼',
        icon: '🧘',
        effects: [
          { type: 'cultivation_exp', value: 30 },
          { type: 'spirit', value: -20 }
        ]
      }
    ]
  },
  {
    id: 'event-10',
    title: '同门求助',
    description: '一位同门师兄弟匆匆赶来，说他遇到了麻烦，需要你的帮助。但看他的表情，似乎有些犹豫。',
    icon: '🤝',
    type: 'social',
    choices: [
      {
        id: 'choice-10-1',
        text: '慷慨相助',
        icon: '💪',
        effects: [
          { type: 'reputation', value: 15 },
          { type: 'karma', value: 10 },
          { type: 'wealth', value: -20 }
        ]
      },
      {
        id: 'choice-10-2',
        text: '婉言拒绝',
        icon: '🙅',
        effects: [
          { type: 'karma', value: -5 },
          { type: 'time_advance', value: 1 }
        ]
      }
    ]
  },
  {
    id: 'event-11',
    title: '心魔入侵',
    description: '修炼时，你突然感到心神不宁，似乎有某种邪恶的力量在侵蚀你的心智。这是心魔！',
    icon: '👿',
    type: 'danger',
    choices: [
      {
        id: 'choice-11-1',
        text: '奋力抵抗',
        icon: '🛡️',
        effects: [
          { type: 'spirit', value: -40 },
          { type: 'willpower', value: 10 },
          { type: 'cultivation_exp', value: 20 }
        ],
        successRate: 0.6
      },
      {
        id: 'choice-11-2',
        text: '寻求帮助',
        icon: '🙏',
        effects: [
          { type: 'wealth', value: -30 },
          { type: 'health', value: 20 }
        ]
      }
    ]
  },
  {
    id: 'event-12',
    title: '秘境开启',
    description: '远处传来一阵轰鸣，一座古老的秘境大门缓缓开启。里面充满了未知的危险和机遇。',
    icon: '🌀',
    type: 'opportunity',
    choices: [
      {
        id: 'choice-12-1',
        text: '勇敢进入',
        icon: '🚀',
        effects: [
          { type: 'cultivation_exp', value: 80 },
          { type: 'health', value: -40 },
          { type: 'wealth', value: 50 }
        ],
        successRate: 0.5
      },
      {
        id: 'choice-12-2',
        text: '在外等待',
        icon: '⏰',
        effects: [
          { type: 'insight', value: 10 },
          { type: 'time_advance', value: 2 }
        ]
      }
    ]
  }
]
