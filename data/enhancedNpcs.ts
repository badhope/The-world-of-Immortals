import { NPC } from '../src/types'

export interface DialogueCondition {
  type: 'has_item' | 'has_reputation' | 'completed_quest' | 'realm_level' | 'time' | 'location'
  value: any
}

export interface DialogueEffect {
  type: 'give_item' | 'take_item' | 'give_exp' | 'give_quest' | 'complete_quest' | 'unlock_location' | 'change_reputation' | 'trigger_event'
  value: any
}

export interface EnhancedDialogueResponse {
  text: string
  nextId?: string
  condition?: DialogueCondition
  effects?: DialogueEffect[]
}

export const enhancedNpcs: Record<string, NPC> = {
  village_elder: {
    id: 'village_elder',
    name: '村长',
    title: '青云村村长',
    realm: '凡人',
    personality: ['慈祥', '博学', '神秘'],
    dialogues: [
      {
        id: 'greeting',
        lines: [
          '年轻人，你终于醒了。你在山中被发现时，身上散发着微弱的灵气波动。',
          '这个村子虽小，却与修仙界有着不解之缘。你若想踏上修仙之路，我可以指点你一二。'
        ],
        responses: [
          { text: '请前辈指点', nextId: 'guide' },
          { text: '我想了解更多关于这个村子的事', nextId: 'village_history' },
          { text: '告辞', nextId: 'bye' }
        ]
      },
      {
        id: 'guide',
        lines: [
          '修仙之路，始于感应天地灵气。你可以先去村外的青山，那里灵气较为充沛。',
          '这是基础吐纳术，你拿去研习。记住，修炼贵在坚持。'
        ],
        responses: [
          { text: '多谢前辈！', nextId: 'guide_end' }
        ]
      },
      {
        id: 'guide_end',
        lines: ['去吧，年轻人。记住，修仙之路，心性为先。']
      },
      {
        id: 'village_history',
        lines: [
          '这个村子名为青云村，据说是千年前一位飞升仙人所建。',
          '那位仙人在此修炼百年，留下了不少机缘。只是至今无人能寻得。',
          '村后的青山，便是当年仙人修炼之地。'
        ],
        responses: [
          { text: '我想了解更多', nextId: 'immortal_story' },
          { text: '告辞', nextId: 'bye' }
        ]
      },
      {
        id: 'immortal_story',
        lines: [
          '千年前，一位名为青云的仙人在此修炼。他本是凡人，却凭借惊人的悟性和毅力，最终飞升成仙。',
          '飞升前，他在青山深处留下了传承，等待有缘人。但千年来，无人能通过传承的考验。',
          '传说需要特定的信物才能开启传承之地...'
        ],
        responses: [
          { text: '什么样的信物？', nextId: 'token_hint' },
          { text: '告辞', nextId: 'bye' }
        ]
      },
      {
        id: 'token_hint',
        lines: [
          '据说是一块刻有云纹的令牌，名为青云令。但千年来无人见过...',
          '年轻人，你为何对此如此感兴趣？'
        ],
        responses: [
          { text: '我似乎...有些特殊的感应', nextId: 'special_connection' },
          { text: '只是好奇而已', nextId: 'bye' }
        ]
      },
      {
        id: 'special_connection',
        lines: [
          '（村长神色复杂地看着你）你...难道就是那个人？',
          '不，不可能...但你的气息确实有些不同寻常。',
          '算了，也许是我多心了。你去青山历练吧，那里或许有你需要的东西。'
        ]
      },
      {
        id: 'show_token',
        condition: 'has_item:mysterious_token',
        lines: [
          '（村长看到令牌，瞳孔骤缩）这...这是青云令！',
          '你...你从哪里得到的？难道你就是传承等待的有缘人？',
          '年轻人，你的来历恐怕不简单...'
        ],
        responses: [
          { text: '我也不清楚，醒来时就在身边', nextId: 'token_origin' },
          { text: '请告诉我传承的秘密', nextId: 'inheritance_secret' }
        ]
      },
      {
        id: 'token_origin',
        lines: [
          '看来是天意。这块令牌会选择主人，既然它选择了你，说明你有资格继承青云仙人的传承。',
          '但传承之路充满危险，你需要做好心理准备。'
        ],
        responses: [
          { text: '我愿意接受挑战', nextId: 'accept_destiny' },
          { text: '我需要时间考虑', nextId: 'bye' }
        ]
      },
      {
        id: 'inheritance_secret',
        lines: [
          '传承藏在青山的深处，有三道封印守护。',
          '你需要找到三块传承碎片才能解开封印。',
          '第一块碎片，就在你发现令牌的那个洞府中。另外两块，需要你自己去寻找。'
        ],
        responses: [
          { text: '我明白了', nextId: 'quest_start' }
        ]
      },
      {
        id: 'accept_destiny',
        lines: [
          '好！既然你已决定，我就告诉你传承的秘密。',
          '传承藏在青山的深处，有三道封印守护。你需要找到三块传承碎片才能解开封印。',
          '这是传承之钥，可以感应碎片的位置。去吧，年轻人！'
        ]
      },
      {
        id: 'quest_start',
        lines: [
          '去吧，年轻人。青山深处有你需要的答案。',
          '记住，传承不仅仅是力量，更是一份责任。'
        ]
      },
      {
        id: 'bye',
        lines: ['去吧，年轻人。记住，修仙之路，心性为先。']
      }
    ],
    quests: ['first_cultivation', 'collect_spirit_grass', 'village_help']
  },
  
  herbalist_wang: {
    id: 'herbalist_wang',
    name: '王药师',
    title: '采药人',
    realm: '炼气一层',
    personality: ['热情', '贪财', '技艺精湛'],
    dialogues: [
      {
        id: 'greeting',
        lines: [
          '哟，新来的小友？我王药师在这青云村采药三十年，什么灵草没见过？',
          '你要是有灵草，尽管拿来，我高价收购！'
        ],
        responses: [
          { text: '出售灵草', nextId: 'trade' },
          { text: '学习炼丹', nextId: 'learn_alchemy' },
          { text: '询问灵草知识', nextId: 'herb_knowledge' },
          { text: '告辞', nextId: 'bye' }
        ]
      },
      {
        id: 'trade',
        lines: [
          '灵草五块灵石一株，百年人参五百灵石，童叟无欺！',
          '你有什么要卖的？'
        ]
      },
      {
        id: 'learn_alchemy',
        lines: [
          '想学炼丹？可以可以，不过得先交学费。',
          '一百灵石，我教你最基础的聚气丹配方。'
        ],
        responses: [
          { text: '支付一百灵石学习', nextId: 'pay_learn' },
          { text: '太贵了，算了', nextId: 'bye' }
        ]
      },
      {
        id: 'pay_learn',
        lines: [
          '好！聚气丹是最基础的丹药，能帮助修炼者恢复灵力。',
          '配方是：灵草x3，灵石x5，放入丹炉炼制一炷香时间。',
          '记住，火候很重要！太大会烧毁药材，太小则无法成丹。'
        ]
      },
      {
        id: 'herb_knowledge',
        lines: [
          '灵草是最常见的修炼材料，能用来炼丹、制符、布阵。',
          '青山上有不少灵草，但要注意，有些地方有野兽出没。',
          '如果你想采集珍稀灵草，需要去更深的地方，比如灵木林。'
        ],
        responses: [
          { text: '谢谢指点', nextId: 'bye' }
        ]
      },
      {
        id: 'bye',
        lines: ['慢走慢走，有灵草记得来找我！']
      }
    ],
    services: [
      {
        type: 'shop',
        data: {
          buys: ['spirit_grass', 'ginseng_100', 'rare_herb'],
          sells: ['pill_healing', 'pill_spirit_gathering', 'pill_cultivation']
        }
      }
    ]
  },
  
  blacksmith_li: {
    id: 'blacksmith_li',
    name: '铁匠李',
    title: '村庄铁匠',
    realm: '凡人',
    personality: ['豪爽', '直率', '技艺精湛'],
    dialogues: [
      {
        id: 'greeting',
        lines: [
          '哈哈，新面孔！我是铁匠李，这村子里的兵器都是我打的！',
          '你需要什么？买兵器还是修兵器？'
        ],
        responses: [
          { text: '购买兵器', nextId: 'buy_weapon' },
          { text: '学习锻造', nextId: 'learn_forge' },
          { text: '询问铁矿', nextId: 'ask_ore' },
          { text: '告辞', nextId: 'bye' }
        ]
      },
      {
        id: 'buy_weapon',
        lines: [
          '我这里有铁剑、铁刀、铁枪，都是上好的货色！',
          '铁剑五十灵石，铁刀六十灵石，铁枪八十灵石。'
        ]
      },
      {
        id: 'learn_forge',
        lines: [
          '想学锻造？好！我正缺个帮手。',
          '你先帮我收集一些铁矿，我就教你基础的锻造术。',
          '青山上有铁矿，你去采集十块回来。'
        ],
        responses: [
          { text: '好的，我去收集', nextId: 'forge_quest' },
          { text: '以后再说', nextId: 'bye' }
        ]
      },
      {
        id: 'forge_quest',
        lines: [
          '去吧，记住，铁矿一般在山洞或者山壁附近。',
          '采集时小心野兽！'
        ]
      },
      {
        id: 'ask_ore',
        lines: [
          '铁矿是锻造的基础材料，青山上有不少。',
          '不过要小心，有些矿洞里有野兽或者更危险的东西。',
          '如果你能找到稀有矿石，比如玄铁，我可以给你打造更好的兵器！'
        ]
      },
      {
        id: 'bye',
        lines: ['有空常来！']
      }
    ],
    services: [
      {
        type: 'shop',
        data: {
          sells: ['iron_sword', 'iron_knife', 'iron_spear']
        }
      },
      {
        type: 'craft',
        data: {
          canCraft: ['iron_sword', 'iron_knife', 'iron_spear', 'spirit_sword']
        }
      }
    ]
  },
  
  mysterious_stranger: {
    id: 'mysterious_stranger',
    name: '神秘旅人',
    title: '游方修士',
    realm: '筑基期',
    personality: ['神秘', '博学', '友善'],
    dialogues: [
      {
        id: 'greeting',
        condition: 'random:0.1',
        lines: [
          '（一位蒙面旅人突然出现在你面前）',
          '年轻人，你身上有传承的气息...你是被选中的人吗？'
        ],
        responses: [
          { text: '你是谁？', nextId: 'identity' },
          { text: '什么传承？', nextId: 'ask_inheritance' },
          { text: '告辞', nextId: 'bye' }
        ]
      },
      {
        id: 'identity',
        lines: [
          '我只是一个游方修士，追寻着青云仙人的足迹。',
          '千年前，我曾有幸见过仙人一面，他预言会有传承者出现。',
          '看来，那个传承者就是你。'
        ],
        responses: [
          { text: '请告诉我更多', nextId: 'more_info' },
          { text: '我需要做什么？', nextId: 'guidance' }
        ]
      },
      {
        id: 'ask_inheritance',
        lines: [
          '青云仙人的传承，蕴含着飞升的秘密。',
          '但传承之路充满危险，你需要足够的实力才能通过考验。',
          '提升修为，收集传承碎片，这是你现在的任务。'
        ]
      },
      {
        id: 'more_info',
        lines: [
          '青云仙人本是凡人，却凭借惊人的悟性创造了独特的修炼之法。',
          '他的传承不仅仅是功法，更包含着对大道的理解。',
          '但记住，力量本身没有善恶，关键在于使用它的人。'
        ]
      },
      {
        id: 'guidance',
        lines: [
          '首先，提升你的修为。传承的考验需要足够的实力才能通过。',
          '其次，寻找传承碎片。它们散落在青山的各个角落。',
          '最后，保持本心。传承会考验你的心性，不要迷失在力量中。'
        ],
        responses: [
          { text: '谢谢指点', nextId: 'bye' }
        ]
      },
      {
        id: 'bye',
        lines: [
          '我们还会再见面的，传承者。',
          '（旅人化作一道流光消失）'
        ]
      }
    ]
  },
  
  sect_messenger_qingyun: {
    id: 'sect_messenger_qingyun',
    name: '青云宗使者',
    title: '青云宗外门执事',
    realm: '筑基后期',
    personality: ['傲慢', '精明', '野心勃勃'],
    dialogues: [
      {
        id: 'greeting',
        condition: 'realm:3',
        lines: [
          '（一位身着青袍的修士出现在村口）',
          '青云宗感应到此地有传承气息波动，特派我来调查。',
          '年轻人，你身上有我们感兴趣的东西...'
        ],
        responses: [
          { text: '你是谁？', nextId: 'identity' },
          { text: '我对你们没兴趣', nextId: 'refuse' },
          { text: '请说', nextId: 'listen' }
        ]
      },
      {
        id: 'identity',
        lines: [
          '我是青云宗外门执事，奉命来寻找传承者。',
          '青云宗愿意提供庇护和资源，帮助你完成传承。',
          '作为交换，你需要将传承的一部分分享给宗门。'
        ],
        responses: [
          { text: '我需要考虑', nextId: 'consider' },
          { text: '我拒绝', nextId: 'refuse' }
        ]
      },
      {
        id: 'listen',
        lines: [
          '明智的选择。青云宗是方圆千里内最大的宗门，拥有丰富的修炼资源。',
          '加入我们，你将获得丹药、功法、法宝，甚至可以进入秘境修炼。',
          '作为交换，你需要将传承的一部分分享给宗门研究。'
        ],
        responses: [
          { text: '我愿意加入', nextId: 'join' },
          { text: '我需要考虑', nextId: 'consider' }
        ]
      },
      {
        id: 'join',
        lines: [
          '很好！这是青云宗外门弟子的信物。',
          '去青云山，将信物交给外门长老，他会安排你的住处和修炼资源。',
          '记住，你现在代表青云宗，不要给我们丢脸。'
        ]
      },
      {
        id: 'consider',
        lines: [
          '我可以给你三天时间考虑。',
          '但记住，血煞门也在寻找传承者，他们的手段可不会这么温和。',
          '三天后，我会再来。'
        ]
      },
      {
        id: 'refuse',
        lines: [
          '（使者冷哼一声）',
          '你会后悔的。传承不是那么容易获得的，没有宗门的庇护，你会寸步难行。',
          '（使者转身离去）'
        ]
      }
    ]
  },
  
  blood_sect_assassin: {
    id: 'blood_sect_assassin',
    name: '血煞门杀手',
    title: '血煞门弟子',
    realm: '筑基中期',
    personality: ['残忍', '贪婪', '狡诈'],
    dialogues: [
      {
        id: 'ambush',
        condition: 'random:0.05',
        lines: [
          '（一群黑衣人突然出现，将你团团围住）',
          '交出传承碎片，饶你不死！',
          '否则，我们会让你生不如死！'
        ],
        responses: [
          { text: '你们是谁？', nextId: 'identity' },
          { text: '我没有什么碎片', nextId: 'deny' },
          { text: '想要就来拿！', nextId: 'fight' }
        ]
      },
      {
        id: 'identity',
        lines: [
          '我们是血煞门，专门猎杀传承者，夺取传承！',
          '你已经收集了传承碎片，别想抵赖！',
          '最后一次机会，交出来！'
        ],
        responses: [
          { text: '给你们', nextId: 'surrender' },
          { text: '做梦！', nextId: 'fight' }
        ]
      },
      {
        id: 'deny',
        lines: [
          '哼，别装了！我们能感应到传承碎片的气息！',
          '交出来，或者死！'
        ],
        responses: [
          { text: '好，我给你们', nextId: 'surrender' },
          { text: '休想！', nextId: 'fight' }
        ]
      },
      {
        id: 'surrender',
        lines: [
          '（你交出了一块传承碎片）',
          '算你识相！这次放过你，但下次见面，可就没这么简单了！',
          '（黑衣人带着碎片离去）'
        ]
      },
      {
        id: 'fight',
        lines: [
          '找死！',
          '（黑衣人一拥而上）'
        ]
      }
    ]
  },
  
  forest_spirit: {
    id: 'forest_spirit',
    name: '森林之灵',
    title: '灵木林守护者',
    realm: '金丹期',
    personality: ['古老', '智慧', '神秘'],
    dialogues: [
      {
        id: 'greeting',
        condition: 'location:forest_depth',
        lines: [
          '（一个由光点组成的身影出现在你面前）',
          '凡人，你身上有传承的气息...你是被选中的人吗？'
        ],
        responses: [
          { text: '你是谁？', nextId: 'identity' },
          { text: '请帮我通过森林', nextId: 'help' }
        ]
      },
      {
        id: 'identity',
        lines: [
          '我是这片森林的守护之灵，已存在千年。',
          '青云仙人飞升前，将我留在这里，守护传承碎片。',
          '你若想获得碎片，需要回答我的问题。'
        ],
        responses: [
          { text: '请出题', nextId: 'riddle' }
        ]
      },
      {
        id: 'riddle',
        lines: [
          '听好了：无形无影，却能改变万物；无形无质，却能承载大道。这是什么？'
        ],
        responses: [
          { text: '风', nextId: 'wrong' },
          { text: '意念', nextId: 'correct' },
          { text: '灵气', nextId: 'partial' }
        ]
      },
      {
        id: 'correct',
        lines: [
          '不错，你有些悟性。',
          '意念无形，却能影响万物；意念无质，却能承载大道。',
          '这块传承碎片归你了。去吧，传承者。'
        ]
      },
      {
        id: 'wrong',
        lines: [
          '错误。再想想，答案与心有关。'
        ],
        responses: [
          { text: '意念', nextId: 'correct' },
          { text: '我放弃', nextId: 'give_up' }
        ]
      },
      {
        id: 'partial',
        lines: [
          '接近了，但还不够准确。',
          '灵气有形，而答案是无形的。'
        ],
        responses: [
          { text: '意念', nextId: 'correct' },
          { text: '我放弃', nextId: 'give_up' }
        ]
      },
      {
        id: 'give_up',
        lines: [
          '可惜，你还没有准备好接受传承。',
          '去吧，等你悟性足够时再来。'
        ]
      },
      {
        id: 'help',
        lines: [
          '我可以指引你穿过森林，但你需要付出代价。',
          '给我十块灵石，我就为你开辟一条安全的道路。'
        ],
        responses: [
          { text: '给你灵石', nextId: 'pay' },
          { text: '我自己走', nextId: 'bye' }
        ]
      },
      {
        id: 'pay',
        lines: [
          '很好。跟着光点走，它们会指引你到安全的地方。',
          '记住，森林深处有强大的妖兽，小心行事。'
        ]
      },
      {
        id: 'bye',
        lines: [
          '去吧，传承者。我们还会再见面的。'
        ]
      }
    ]
  }
}

export function getNpcById(id: string): NPC | undefined {
  return enhancedNpcs[id]
}

export function getNpcsByLocation(locationId: string): NPC[] {
  const locationNpcMap: Record<string, string[]> = {
    'starter_village': ['village_elder', 'herbalist_wang', 'blacksmith_li'],
    'green_mountain': ['mysterious_stranger'],
    'spirit_forest': ['forest_spirit'],
    'forest_depth': ['forest_spirit']
  }
  
  const npcIds = locationNpcMap[locationId] || []
  return npcIds.map(id => enhancedNpcs[id]).filter(Boolean)
}

export function getRandomEventNpc(): NPC | undefined {
  const eventNpcs = ['mysterious_stranger', 'sect_messenger_qingyun', 'blood_sect_assassin']
  const randomId = eventNpcs[Math.floor(Math.random() * eventNpcs.length)]
  return enhancedNpcs[randomId]
}
