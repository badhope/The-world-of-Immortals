import { NPC } from '../src/types'

export const npcs: Record<string, NPC> = {
  // ========== 新手村 NPC ==========
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
          { text: '多谢前辈！', effect: 'get_skill_basic_cultivation' }
        ]
      },
      {
        id: 'village_history',
        lines: [
          '这个村子名为青云村，据说是千年前一位飞升仙人所建。',
          '那位仙人在此修炼百年，留下了不少机缘。只是至今无人能寻得。',
          '村后的青山，便是当年仙人修炼之地。'
        ]
      },
      {
        id: 'bye',
        lines: ['去吧，年轻人。记住，修仙之路，心性为先。']
      }
    ],
    quests: ['first_cultivation', 'collect_spirit_grass']
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
          { text: '告辞', nextId: 'bye' }
        ]
      },
      {
        id: 'trade',
        lines: ['灵草五块灵石一株，百年人参五百灵石，童叟无欺！']
      },
      {
        id: 'learn_alchemy',
        lines: [
          '想学炼丹？可以可以，不过得先交学费。',
          '一百灵石，我教你最基础的聚气丹配方。'
        ],
        responses: [
          { text: '支付一百灵石学习', effect: 'learn_pill_spirit_gathering' },
          { text: '太贵了，算了', nextId: 'bye' }
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
          buys: ['spirit_grass', 'ginseng_100'],
          sells: ['pill_healing', 'pill_spirit_gathering']
        }
      }
    ]
  },
  
  // ========== 城镇 NPC ==========
  merchant_li: {
    id: 'merchant_li',
    name: '李掌柜',
    title: '天云商会掌柜',
    realm: '炼气五层',
    personality: ['精明', '圆滑', '消息灵通'],
    dialogues: [
      {
        id: 'greeting',
        lines: [
          '这位道友，天云商会欢迎您！',
          '我们这里有各种修炼资源，保证货真价实。'
        ],
        responses: [
          { text: '浏览商品', nextId: 'shop' },
          { text: '打听消息', nextId: 'rumors' },
          { text: '告辞', nextId: 'bye' }
        ]
      },
      {
        id: 'rumors',
        lines: [
          '最近听说云顶峰那边有异象，不少修士都去探查了。',
          '还有，青云宗似乎在招收新弟子，道友若有兴趣不妨去看看。'
        ]
      },
      {
        id: 'bye',
        lines: ['道友慢走，欢迎下次光临！']
      }
    ],
    services: [
      {
        type: 'shop',
        data: {
          sells: ['spirit_stone_mid', 'iron_essence', 'sword_iron', 'robe_disciple']
        }
      }
    ]
  },
  information_broker: {
    id: 'information_broker',
    name: '神秘人',
    title: '情报贩子',
    realm: '未知',
    personality: ['神秘', '贪婪', '无所不知'],
    dialogues: [
      {
        id: 'greeting',
        lines: [
          '......',
          '你想知道什么？每条消息都有它的价格。'
        ]
      }
    ],
    services: [
      {
        type: 'shop',
        data: {
          type: 'information'
        }
      }
    ]
  },
  
  // ========== 宗门 NPC ==========
  sect_elder: {
    id: 'sect_elder',
    name: '青云长老',
    title: '青云宗外门长老',
    realm: '金丹期',
    personality: ['严厉', '公正', '惜才'],
    dialogues: [
      {
        id: 'greeting',
        lines: [
          '你是来拜入我青云宗的？',
          '我宗门规森严，入门需经过考验。你可想好了？'
        ],
        responses: [
          { text: '弟子愿意接受考验', nextId: 'trial' },
          { text: '请问考验是什么？', nextId: 'trial_info' },
          { text: '我再考虑考虑', nextId: 'bye' }
        ]
      },
      {
        id: 'trial_info',
        lines: [
          '入门考验有三：一测资质，二测心性，三测毅力。',
          '资质看你的灵根，心性看你的品性，毅力则需你完成宗门任务。'
        ]
      },
      {
        id: 'trial',
        lines: [
          '好！有胆识！',
          '先去演武峰完成三个宗门任务，再来找我。'
        ],
        effect: 'start_sect_trial'
      },
      {
        id: 'bye',
        lines: ['年轻人，机会稍纵即逝。']
      }
    ],
    quests: ['sect_admission']
  },
  mission_deacon: {
    id: 'mission_deacon',
    name: '任务执事',
    title: '青云宗任务堂执事',
    realm: '筑基期',
    personality: ['务实', '高效', '一丝不苟'],
    dialogues: [
      {
        id: 'greeting',
        lines: [
          '任务堂负责发布和管理宗门任务。',
          '完成任务可获得贡献点，贡献点可兑换修炼资源。'
        ]
      }
    ],
    services: [
      {
        type: 'quest',
        data: {
          type: 'mission_board'
        }
      }
    ]
  },
  library_keeper: {
    id: 'library_keeper',
    name: '守阁老人',
    title: '藏经阁守护者',
    realm: '元婴期',
    personality: ['沉默寡言', '博学', '神秘'],
    dialogues: [
      {
        id: 'greeting',
        lines: [
          '......',
          '借阅功法，需消耗贡献点。'
        ]
      }
    ],
    services: [
      {
        type: 'shop',
        data: {
          type: 'skills',
          currency: 'contribution'
        }
      }
    ]
  }
}

export function getNPC(id: string): NPC | undefined {
  return npcs[id]
}

export function getNPCsByLocation(locationId: string): NPC[] {
  return Object.values(npcs).filter(npc => {
    // 这里需要根据 locations 数据来判断
    // 简化处理，实际应该从 locations 中获取 npcs 列表
    return true
  })
}
