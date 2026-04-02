export interface Nation {
  id: string
  name: string
  type: 'mortal_kingdom' | 'immortal_kingdom' | 'alliance' | 'empire' | 'republic'
  description: string
  history: string
  government: GovernmentInfo
  territory: TerritoryInfo
  population: number
  military: MilitaryInfo
  economy: EconomyInfo
  culture: CultureInfo
  relations: RelationInfo[]
  specialFeatures: string[]
}

export interface GovernmentInfo {
  type: string
  ruler: string
  rulingFamily?: string
  officials: OfficialInfo[]
  laws: string[]
}

export interface OfficialInfo {
  title: string
  name: string
  responsibility: string
  cultivation?: string
}

export interface TerritoryInfo {
  regions: string[]
  cities: string[]
  area: number
  borders: BorderInfo[]
}

export interface BorderInfo {
  with: string
  type: 'open' | 'closed' | 'contested' | 'fortified'
  description: string
}

export interface MilitaryInfo {
  totalStrength: number
  cultivators: number
  mortalSoldiers: number
  eliteUnits: string[]
  defenses: string[]
}

export interface EconomyInfo {
  currency: string
  mainIndustries: string[]
  tradePartners: string[]
  resources: string[]
  taxRate: number
}

export interface CultureInfo {
  mainBelief: string
  festivals: string[]
  customs: string[]
  education: string
}

export interface RelationInfo {
  target: string
  type: 'ally' | 'enemy' | 'neutral' | 'vassal' | 'suzerain' | 'trade_partner'
  description: string
  history: string
}

export interface Faction {
  id: string
  name: string
  type: 'sect' | 'family' | 'guild' | 'alliance' | 'cult' | 'government' | 'merchant'
  description: string
  history: string
  leadership: LeadershipInfo
  members: MemberInfo
  territory: string[]
  resources: string[]
  influence: InfluenceInfo
  relations: FactionRelation[]
  specialAbilities: string[]
  secrets: string[]
}

export interface LeadershipInfo {
  leader: string
  leaderCultivation: string
  elders: { name: string; cultivation: string; responsibility: string }[]
  succession: string
}

export interface MemberInfo {
  totalMembers: number
  cultivatorMembers: number
  mortalMembers: number
  recruitment: string
  requirements: string[]
}

export interface InfluenceInfo {
  political: number
  economic: number
  military: number
  cultural: number
  regions: string[]
}

export interface FactionRelation {
  target: string
  type: 'ally' | 'enemy' | 'neutral' | 'vassal' | 'rival' | 'cooperative'
  description: string
}

export const nations: Nation[] = [
  {
    id: 'nation_daxia',
    name: '大夏王朝',
    type: 'mortal_kingdom',
    description: '青云大陆最古老的凡人王朝之一，历史悠久，文化灿烂。大夏王朝虽然以凡人为主，但皇室拥有修士血脉，与各大宗门关系密切。王朝境内灵气充沛，是修士与凡人共存的典范。',
    history: `大夏王朝建立于上古纪元末期，由夏氏先祖夏禹创立。传说夏禹曾得到上古大能的指点，学会了治理水患的方法，因此被推举为王。

王朝建立后，夏氏一族与青云宗建立了深厚的友谊，历代皇帝都会送子弟入青云宗修行。这种关系使得大夏王朝在凡人国度中地位超然。

中古纪元时期，大夏王朝曾经历过一次亡国危机，但在青云宗的帮助下成功复国。此后，大夏王朝更加重视与修仙界的关系，成为了凡人与修士沟通的桥梁。

近古纪元以来，大夏王朝逐渐衰落，但仍然保持着强大的影响力。现任皇帝夏明德是一位有为之君，正在努力振兴王朝。`,
    government: {
      type: '君主制',
      ruler: '夏明德',
      rulingFamily: '夏氏皇族',
      officials: [
        { title: '丞相', name: '李文正', responsibility: '处理朝政', cultivation: '筑基初期' },
        { title: '大将军', name: '赵铁山', responsibility: '统领军队', cultivation: '筑基中期' },
        { title: '国师', name: '玄机子', responsibility: '修仙事务', cultivation: '结丹初期' },
        { title: '户部尚书', name: '王守正', responsibility: '财政税收', cultivation: '炼气十层' },
        { title: '礼部尚书', name: '周文华', responsibility: '外交礼仪', cultivation: '炼气九层' }
      ],
      laws: [
        '修士不得随意伤害凡人',
        '凡人不得擅闯修仙禁地',
        '宗门争斗不得波及凡人城池',
        '皇室拥有修士血脉，享有特殊地位',
        '凡人犯罪由凡人律法处置，修士犯罪由宗门处置'
      ]
    },
    territory: {
      regions: ['region_central_plains'],
      cities: ['夏都', '青云城', '玄天城', '丹霞城', '万剑城'],
      area: 500000,
      borders: [
        { with: 'nation_dazhou', type: 'open', description: '与大周王朝关系友好，边境开放贸易' },
        { with: 'nation_daqin', type: 'contested', description: '与大秦王朝存在领土争议' },
        { with: 'region_northern_wasteland', type: 'fortified', description: '与北荒原接壤，建有长城防御妖兽' }
      ]
    },
    population: 50000000,
    military: {
      totalStrength: 500000,
      cultivators: 5000,
      mortalSoldiers: 495000,
      eliteUnits: ['御林军', '神机营', '龙骑军', '修士卫队'],
      defenses: ['夏都城墙', '北境长城', '护国大阵', '灵炮阵地']
    },
    economy: {
      currency: '夏币',
      mainIndustries: ['农业', '手工业', '矿业', '贸易'],
      tradePartners: ['nation_dazhou', 'nation_daqin', 'sect_qingyun', 'sect_xuantian'],
      resources: ['粮食', '铁矿', '丝绸', '瓷器', '灵石矿'],
      taxRate: 0.1
    },
    culture: {
      mainBelief: '道教与儒家并存',
      festivals: ['春节', '元宵节', '清明节', '端午节', '中秋节', '重阳节', '祭祖大典'],
      customs: ['尊师重道', '孝道为先', '科举取士', '宗族制度'],
      education: '设有国子监和各级书院，凡人可科举入仕'
    },
    relations: [
      { target: 'sect_qingyun', type: 'ally', description: '世代交好，皇室子弟可入宗门修行', history: '自王朝建立以来就是盟友' },
      { target: 'nation_dazhou', type: 'ally', description: '联姻关系，边境开放', history: '近百年建立的联盟' },
      { target: 'nation_daqin', type: 'enemy', description: '领土争端，时有冲突', history: '千年前因边界问题结怨' },
      { target: 'sect_demon', type: 'enemy', description: '正邪对立，水火不容', history: '魔修多次入侵王朝' }
    ],
    specialFeatures: ['皇室修士血脉', '与青云宗的特殊关系', '北境长城', '护国大阵', '科举制度']
  },
  {
    id: 'nation_dazhou',
    name: '大周王朝',
    type: 'mortal_kingdom',
    description: '青云大陆最强大的凡人王朝，国力鼎盛，疆域辽阔。大周王朝以武立国，军队强大，与各大宗门保持着微妙的平衡关系。',
    history: `大周王朝建立于中古纪元中期，由周氏先祖周武王创立。周武王原本是一名散修，后因机缘巧合获得了上古传承，实力大增。

周武王凭借强大的实力，统一了中州平原的大部分地区，建立了大周王朝。王朝建立后，周武王制定了"以武立国，以法治国"的方针，使得大周王朝迅速强大。

中古纪元后期，大周王朝曾与魔道势力发生大规模战争，最终在各大宗门的帮助下取得胜利。这场战争使得大周王朝与正道宗门建立了深厚的友谊。

近古纪元以来，大周王朝逐渐成为青云大陆最强大的凡人王朝，但其与修仙界的关系也变得更加复杂。现任皇帝周天威是一位雄才大略的君主，正在努力平衡凡人与修士的关系。`,
    government: {
      type: '君主制',
      ruler: '周天威',
      rulingFamily: '周氏皇族',
      officials: [
        { title: '丞相', name: '张居正', responsibility: '处理朝政', cultivation: '筑基后期' },
        { title: '大将军', name: '霍去病', responsibility: '统领军队', cultivation: '结丹初期' },
        { title: '国师', name: '天机子', responsibility: '修仙事务', cultivation: '结丹中期' },
        { title: '户部尚书', name: '刘伯温', responsibility: '财政税收', cultivation: '筑基初期' },
        { title: '兵部尚书', name: '孙武', responsibility: '军事战略', cultivation: '筑基中期' }
      ],
      laws: [
        '修士不得随意干涉凡人事务',
        '凡人犯罪一律按律法处置',
        '宗门不得在王朝境内私自收徒',
        '皇室拥有最高裁决权',
        '军队独立于宗门体系之外'
      ]
    },
    territory: {
      regions: ['region_central_plains', 'region_western_desert'],
      cities: ['周都', '天威城', '武安城', '边境要塞', '西域都护府'],
      area: 800000,
      borders: [
        { with: 'nation_daxia', type: 'open', description: '联姻关系，边境开放' },
        { with: 'nation_daqin', type: 'fortified', description: '敌对关系，边境重兵把守' },
        { with: 'region_western_desert', type: 'fortified', description: '防御西域势力' }
      ]
    },
    population: 80000000,
    military: {
      totalStrength: 1000000,
      cultivators: 10000,
      mortalSoldiers: 990000,
      eliteUnits: ['天威军', '武安军', '铁骑军', '修士军团'],
      defenses: ['周都城墙', '边境要塞群', '护国大阵', '天雷阵']
    },
    economy: {
      currency: '周币',
      mainIndustries: ['农业', '军事工业', '矿业', '贸易'],
      tradePartners: ['nation_daxia', 'sect_wanjian', 'sect_danxia'],
      resources: ['粮食', '铁矿', '兵器', '战马', '灵石矿'],
      taxRate: 0.15
    },
    culture: {
      mainBelief: '武道与法家思想',
      festivals: ['春节', '武道大会', '祭天大典', '军演节', '丰收节'],
      customs: ['尚武精神', '军功爵制', '法治社会', '科举武举并行'],
      education: '设有武学院和文学院，文武并重'
    },
    relations: [
      { target: 'nation_daxia', type: 'ally', description: '联姻关系', history: '百年联盟' },
      { target: 'nation_daqin', type: 'enemy', description: '敌对关系', history: '领土争端' },
      { target: 'sect_wanjian', type: 'cooperative', description: '合作关系', history: '军事合作' }
    ],
    specialFeatures: ['强大的军队', '武道传统', '独立于宗门的军事体系', '边境要塞群']
  },
  {
    id: 'nation_daqin',
    name: '大秦王朝',
    type: 'empire',
    description: '青云大陆最神秘的凡人王朝，位于西部荒漠边缘。大秦王朝以法治国，制度严明，与魔道势力有着复杂的关系。',
    history: `大秦王朝建立于中古纪元后期，由秦氏先祖秦始皇创立。秦始皇原本是一名散修，后因获得上古传承而实力大增。

秦始皇凭借强大的实力和严明的法度，统一了西部荒漠边缘的诸多小国，建立了大秦王朝。王朝建立后，秦始皇制定了"以法治国，以刑去刑"的方针，使得大秦王朝秩序井然。

中古纪元末期，大秦王朝曾与魔道势力发生冲突，但最终选择了和解。此后，大秦王朝与魔道势力保持着微妙的关系，既不完全敌对，也不完全合作。

近古纪元以来，大秦王朝逐渐成为青云大陆最神秘的王朝。现任皇帝秦政是一位深不可测的君主，据说已经达到了元婴期的修为。`,
    government: {
      type: '帝制',
      ruler: '秦政',
      rulingFamily: '秦氏皇族',
      officials: [
        { title: '丞相', name: '李斯', responsibility: '处理朝政', cultivation: '结丹初期' },
        { title: '大将军', name: '白起', responsibility: '统领军队', cultivation: '结丹中期' },
        { title: '国师', name: '鬼谷子', responsibility: '修仙事务', cultivation: '元婴初期' },
        { title: '廷尉', name: '商鞅', responsibility: '司法刑律', cultivation: '筑基后期' },
        { title: '太尉', name: '王翦', responsibility: '军事战略', cultivation: '结丹初期' }
      ],
      laws: [
        '法不阿贵，刑不避亲',
        '修士犯法与凡人同罪',
        '严禁私斗，违者重罚',
        '连坐制度，一人犯罪全家受罚',
        '宗门在境内必须遵守王朝法律'
      ]
    },
    territory: {
      regions: ['region_western_desert'],
      cities: ['秦都', '咸阳', '函谷关', '长城要塞', '西域都护府'],
      area: 600000,
      borders: [
        { with: 'nation_daxia', type: 'contested', description: '领土争端' },
        { with: 'nation_dazhou', type: 'fortified', description: '敌对关系' },
        { with: 'region_demon_domain', type: 'closed', description: '与魔域接壤，边境封闭' }
      ]
    },
    population: 40000000,
    military: {
      totalStrength: 800000,
      cultivators: 15000,
      mortalSoldiers: 785000,
      eliteUnits: ['秦锐士', '铁鹰锐士', '修士军团', '暗影卫'],
      defenses: ['秦都城墙', '函谷关', '万里长城', '护国大阵', '魔域封印']
    },
    economy: {
      currency: '秦币',
      mainIndustries: ['军事工业', '矿业', '农业', '畜牧业'],
      tradePartners: ['region_demon_domain', 'sect_blood_demon'],
      resources: ['铁矿', '兵器', '战马', '魔晶', '灵石矿'],
      taxRate: 0.2
    },
    culture: {
      mainBelief: '法家思想',
      festivals: ['春节', '法典颁布日', '军演节', '祭祖大典'],
      customs: ['法治精神', '军功爵制', '连坐制度', '严刑峻法'],
      education: '设有法学校和武学校，重视法治教育'
    },
    relations: [
      { target: 'nation_daxia', type: 'enemy', description: '领土争端', history: '千年恩怨' },
      { target: 'nation_dazhou', type: 'enemy', description: '敌对关系', history: '政治对立' },
      { target: 'region_demon_domain', type: 'neutral', description: '微妙关系', history: '既非敌也非友' }
    ],
    specialFeatures: ['法治国家', '皇帝修为高深', '与魔道的微妙关系', '强大的军事力量', '严密的情报网']
  }
]

export const factions: Faction[] = [
  {
    id: 'faction_qingyun_sect',
    name: '青云宗',
    type: 'sect',
    description: '青云大陆最古老、最强大的正道宗门之一，由青云仙尊创立。青云宗以剑道著称，门下弟子剑术高超，是正道的中流砥柱。',
    history: `青云宗由青云仙尊于上古纪元创立，是青云大陆最古老的宗门之一。青云仙尊是一位惊才绝艳的大能，曾与天魔皇大战，最终以自身为代价封印了天魔皇。

青云宗创立后，一直是正道的领袖，培养了无数优秀的修士。上古纪元末期，青云宗曾遭遇魔道势力的围攻，损失惨重，但最终在各大宗门的帮助下渡过难关。

中古纪元时期，青云宗逐渐恢复元气，重新成为正道领袖。中古纪元后期，青云宗参与了对魔道的战争，为正道的胜利做出了巨大贡献。

近古纪元以来，青云宗一直保持着正道领袖的地位。现任宗主青云子是一位元婴后期的大能，正在努力维护正道的利益。`,
    leadership: {
      leader: '青云子',
      leaderCultivation: '元婴后期',
      elders: [
        { name: '玄机长老', cultivation: '元婴中期', responsibility: '内门事务' },
        { name: '剑痴长老', cultivation: '元婴初期', responsibility: '剑道传承' },
        { name: '丹青长老', cultivation: '结丹大圆满', responsibility: '丹道传承' },
        { name: '执法长老', cultivation: '元婴初期', responsibility: '宗门执法' }
      ],
      succession: '由宗主指定继承人，经长老会认可'
    },
    members: {
      totalMembers: 5000,
      cultivatorMembers: 5000,
      mortalMembers: 0,
      recruitment: '每十年招收一次弟子',
      requirements: ['拥有灵根', '品行端正', '通过入门测试']
    },
    territory: ['region_qingyun_mountain', 'region_central_plains'],
    resources: ['灵石矿脉', '灵药园', '剑谱秘库', '丹药房', '炼器室'],
    influence: {
      political: 90,
      economic: 80,
      military: 95,
      cultural: 85,
      regions: ['region_central_plains', 'region_northern_wasteland']
    },
    relations: [
      { target: 'faction_xuantian_sect', type: 'ally', description: '世代交好' },
      { target: 'faction_wanjian_sect', type: 'cooperative', description: '剑道交流' },
      { target: 'faction_blood_demon_sect', type: 'enemy', description: '正邪对立' },
      { target: 'nation_daxia', type: 'ally', description: '皇室关系' }
    ],
    specialAbilities: ['青云剑诀', '云海神通', '青云大阵', '传承秘境'],
    secrets: ['青云仙尊传承', '天魔封印位置', '上古秘辛']
  },
  {
    id: 'faction_xuantian_sect',
    name: '玄天宗',
    type: 'sect',
    description: '青云大陆最富有的宗门，以商业和丹道著称。玄天宗掌握着青云大陆最大的商业网络，是修仙界的经济中心。',
    history: `玄天宗由玄天老祖于中古纪元创立，最初只是一个商业联盟。玄天老祖是一位商业天才，通过贸易积累了大量财富，最终建立了玄天宗。

玄天宗创立后，迅速成为青云大陆最富有的宗门。中古纪元后期，玄天宗开始涉足丹道，培养了大量丹道大师，成为丹道圣地。

近古纪元以来，玄天宗一直保持着经济领袖的地位。现任宗主玄天子是一位结丹大圆满的修士，虽然修为不是最高，但商业头脑无人能及。`,
    leadership: {
      leader: '玄天子',
      leaderCultivation: '结丹大圆满',
      elders: [
        { name: '财神长老', cultivation: '结丹后期', responsibility: '商业事务' },
        { name: '丹圣长老', cultivation: '元婴初期', responsibility: '丹道传承' },
        { name: '执法长老', cultivation: '结丹中期', responsibility: '宗门执法' },
        { name: '外交长老', cultivation: '结丹初期', responsibility: '对外关系' }
      ],
      succession: '由长老会选举产生'
    },
    members: {
      totalMembers: 8000,
      cultivatorMembers: 3000,
      mortalMembers: 5000,
      recruitment: '随时招收有商业天赋的弟子',
      requirements: ['拥有灵根或商业天赋', '通过入门测试']
    },
    territory: ['region_central_plains', 'region_eastern_sea'],
    resources: ['商业网络', '丹药房', '拍卖行', '灵石储备', '情报网'],
    influence: {
      political: 85,
      economic: 100,
      military: 60,
      cultural: 70,
      regions: ['region_central_plains', 'region_eastern_sea', 'region_southern_jungle']
    },
    relations: [
      { target: 'faction_qingyun_sect', type: 'ally', description: '世代交好' },
      { target: 'faction_danxia_valley', type: 'cooperative', description: '丹道合作' },
      { target: 'faction_blood_demon_sect', type: 'neutral', description: '商业往来' }
    ],
    specialAbilities: ['商业网络', '丹道传承', '拍卖系统', '情报网'],
    secrets: ['商业机密', '丹方秘库', '客户名单']
  },
  {
    id: 'faction_wanjian_sect',
    name: '万剑门',
    type: 'sect',
    description: '青云大陆剑道第一宗门，以剑道著称。万剑门弟子剑术高超，战斗力极强，是正道的武力担当。',
    history: `万剑门由万剑真人于中古纪元创立，最初只是一个剑道流派。万剑真人是一位剑道天才，创造了无数剑法，最终建立了万剑门。

万剑门创立后，迅速成为青云大陆剑道第一宗门。中古纪元后期，万剑门参与了对魔道的战争，以强大的战斗力闻名。

近古纪元以来，万剑门一直保持着剑道领袖的地位。现任宗主万剑子是一位元婴中期的大能，剑术已经达到了出神入化的境界。`,
    leadership: {
      leader: '万剑子',
      leaderCultivation: '元婴中期',
      elders: [
        { name: '剑圣长老', cultivation: '元婴初期', responsibility: '剑道传承' },
        { name: '剑魔长老', cultivation: '结丹大圆满', responsibility: '战斗训练' },
        { name: '执法长老', cultivation: '结丹后期', responsibility: '宗门执法' }
      ],
      succession: '通过剑道比试产生'
    },
    members: {
      totalMembers: 3000,
      cultivatorMembers: 3000,
      mortalMembers: 0,
      recruitment: '每五年招收一次弟子',
      requirements: ['拥有剑道天赋', '通过剑道测试']
    },
    territory: ['region_central_plains'],
    resources: ['剑谱秘库', '剑冢', '炼剑室', '演武场'],
    influence: {
      political: 70,
      economic: 50,
      military: 100,
      cultural: 60,
      regions: ['region_central_plains']
    },
    relations: [
      { target: 'faction_qingyun_sect', type: 'cooperative', description: '剑道交流' },
      { target: 'faction_blood_demon_sect', type: 'enemy', description: '正邪对立' }
    ],
    specialAbilities: ['万剑归宗', '剑意领域', '剑阵', '剑冢传承'],
    secrets: ['剑道至高秘法', '上古剑仙传承']
  },
  {
    id: 'faction_danxia_valley',
    name: '丹霞谷',
    type: 'sect',
    description: '青云大陆丹道第一宗门，以丹道著称。丹霞谷掌握着青云大陆最先进的丹道技术，是丹道圣地。',
    history: `丹霞谷由丹霞仙子于中古纪元创立，最初只是一个丹道流派。丹霞仙子是一位丹道天才，创造了无数丹方，最终建立了丹霞谷。

丹霞谷创立后，迅速成为青云大陆丹道第一宗门。中古纪元后期，丹霞谷培养了大量丹道大师，为修仙界做出了巨大贡献。

近古纪元以来，丹霞谷一直保持着丹道领袖的地位。现任宗主丹霞子是一位元婴初期的大能，丹道造诣已经达到了炉火纯青的境界。`,
    leadership: {
      leader: '丹霞子',
      leaderCultivation: '元婴初期',
      elders: [
        { name: '丹圣长老', cultivation: '结丹大圆满', responsibility: '丹道传承' },
        { name: '药圣长老', cultivation: '结丹后期', responsibility: '药园管理' },
        { name: '执法长老', cultivation: '结丹中期', responsibility: '宗门执法' }
      ],
      succession: '通过丹道比试产生'
    },
    members: {
      totalMembers: 2000,
      cultivatorMembers: 2000,
      mortalMembers: 0,
      recruitment: '每三年招收一次弟子',
      requirements: ['拥有丹道天赋', '通过丹道测试']
    },
    territory: ['region_central_plains'],
    resources: ['丹方秘库', '药园', '炼丹房', '灵药山'],
    influence: {
      political: 60,
      economic: 90,
      military: 40,
      cultural: 80,
      regions: ['region_central_plains']
    },
    relations: [
      { target: 'faction_qingyun_sect', type: 'ally', description: '世代交好' },
      { target: 'faction_xuantian_sect', type: 'cooperative', description: '丹道合作' }
    ],
    specialAbilities: ['丹道传承', '灵药培育', '丹阵', '药园秘境'],
    secrets: ['上古丹方', '仙丹秘法', '药园传承']
  },
  {
    id: 'faction_blood_demon_sect',
    name: '血魔宗',
    type: 'sect',
    description: '青云大陆最强大的魔道宗门，以血道著称。血魔宗修炼血道功法，实力强大，是正道的大敌。',
    history: `血魔宗由血魔老祖于中古纪元创立，最初只是一个邪道流派。血魔老祖是一位血道天才，创造了无数血道功法，最终建立了血魔宗。

血魔宗创立后，迅速成为青云大陆最强大的魔道宗门。中古纪元后期，血魔宗曾与正道发生大规模战争，最终被击退。

近古纪元以来，血魔宗一直保持着魔道领袖的地位。现任宗主血魔子是一位元婴后期的大能，血道造诣已经达到了登峰造极的境界。`,
    leadership: {
      leader: '血魔子',
      leaderCultivation: '元婴后期',
      elders: [
        { name: '血影长老', cultivation: '元婴初期', responsibility: '血道传承' },
        { name: '血煞长老', cultivation: '结丹大圆满', responsibility: '战斗训练' },
        { name: '执法长老', cultivation: '结丹后期', responsibility: '宗门执法' }
      ],
      succession: '通过血道比试产生'
    },
    members: {
      totalMembers: 4000,
      cultivatorMembers: 4000,
      mortalMembers: 0,
      recruitment: '随时招收有魔道天赋的弟子',
      requirements: ['拥有魔道天赋', '通过血道测试']
    },
    territory: ['region_demon_domain'],
    resources: ['血池', '魔器库', '血道秘库', '魔药园'],
    influence: {
      political: 30,
      economic: 40,
      military: 90,
      cultural: 20,
      regions: ['region_demon_domain']
    },
    relations: [
      { target: 'faction_qingyun_sect', type: 'enemy', description: '正邪对立' },
      { target: 'faction_wanjian_sect', type: 'enemy', description: '正邪对立' },
      { target: 'nation_daqin', type: 'neutral', description: '微妙关系' }
    ],
    specialAbilities: ['血道功法', '血魔化身', '血阵', '魔器炼制'],
    secrets: ['血魔传承', '魔道秘法', '上古魔族遗迹']
  },
  {
    id: 'faction_li_family',
    name: '李氏家族',
    type: 'family',
    description: '青云大陆最强大的修仙家族之一，拥有悠久的历史和深厚的底蕴。李氏家族以炼器著称，掌握着青云大陆最先进的炼器技术。',
    history: `李氏家族的历史可以追溯到上古纪元，据说是上古大能李耳的后裔。李耳是一位炼器天才，创造了无数神器，为家族留下了深厚的底蕴。

中古纪元时期，李氏家族逐渐崛起，成为青云大陆最强大的修仙家族之一。中古纪元后期，李氏家族参与了对抗魔道的战争，为正道的胜利做出了贡献。

近古纪元以来，李氏家族一直保持着家族领袖的地位。现任家主李天工是一位结丹大圆满的修士，炼器造诣已经达到了出神入化的境界。`,
    leadership: {
      leader: '李天工',
      leaderCultivation: '结丹大圆满',
      elders: [
        { name: '李天机', cultivation: '结丹后期', responsibility: '家族事务' },
        { name: '李天火', cultivation: '结丹中期', responsibility: '炼器传承' },
        { name: '李天水', cultivation: '结丹初期', responsibility: '对外关系' }
      ],
      succession: '由家族长老会选举产生'
    },
    members: {
      totalMembers: 500,
      cultivatorMembers: 200,
      mortalMembers: 300,
      recruitment: '只招收家族成员',
      requirements: ['李氏血脉', '通过家族测试']
    },
    territory: ['region_central_plains'],
    resources: ['炼器室', '矿脉', '器谱秘库', '家族产业'],
    influence: {
      political: 60,
      economic: 80,
      military: 50,
      cultural: 70,
      regions: ['region_central_plains']
    },
    relations: [
      { target: 'faction_qingyun_sect', type: 'cooperative', description: '炼器合作' },
      { target: 'faction_xuantian_sect', type: 'cooperative', description: '商业合作' }
    ],
    specialAbilities: ['炼器传承', '家族秘法', '血脉之力'],
    secrets: ['上古神器', '家族传承', '血脉秘密']
  },
  {
    id: 'faction_merchants_guild',
    name: '商盟',
    type: 'guild',
    description: '青云大陆最大的商业联盟，由各大商人和家族组成。商盟掌握着青云大陆最大的商业网络，是修仙界的经济命脉。',
    history: `商盟由各大商人和家族于中古纪元创立，最初只是一个商业联盟。随着时间推移，商盟逐渐发展壮大，成为青云大陆最大的商业组织。

中古纪元后期，商盟开始涉足修仙事务，为各大宗门提供资源。近古纪元以来，商盟一直保持着商业领袖的地位，掌握着青云大陆的经济命脉。`,
    leadership: {
      leader: '金万两',
      leaderCultivation: '结丹初期',
      elders: [
        { name: '银千两', cultivation: '筑基后期', responsibility: '商业事务' },
        { name: '铜百两', cultivation: '筑基中期', responsibility: '情报收集' },
        { name: '铁十两', cultivation: '筑基初期', responsibility: '安全保卫' }
      ],
      succession: '由盟主指定继承人'
    },
    members: {
      totalMembers: 10000,
      cultivatorMembers: 1000,
      mortalMembers: 9000,
      recruitment: '随时招收有商业天赋的成员',
      requirements: ['缴纳会费', '通过商业测试']
    },
    territory: ['region_central_plains', 'region_eastern_sea', 'region_southern_jungle'],
    resources: ['商业网络', '拍卖行', '情报网', '仓库'],
    influence: {
      political: 50,
      economic: 100,
      military: 30,
      cultural: 40,
      regions: ['region_central_plains', 'region_eastern_sea', 'region_southern_jungle']
    },
    relations: [
      { target: 'faction_xuantian_sect', type: 'cooperative', description: '商业合作' },
      { target: 'faction_blood_demon_sect', type: 'neutral', description: '商业往来' }
    ],
    specialAbilities: ['商业网络', '拍卖系统', '情报网', '物流系统'],
    secrets: ['商业机密', '客户名单', '财富秘密']
  }
]

export function getNationById(id: string): Nation | undefined {
  return nations.find(n => n.id === id)
}

export function getFactionById(id: string): Faction | undefined {
  return factions.find(f => f.id === id)
}

export function getNationsByRegion(regionId: string): Nation[] {
  return nations.filter(n => n.territory.regions.includes(regionId))
}

export function getFactionsByRegion(regionId: string): Faction[] {
  return factions.filter(f => f.territory.includes(regionId))
}

export function getNationRelations(nationId: string): RelationInfo[] {
  const nation = getNationById(nationId)
  return nation?.relations || []
}

export function getFactionRelations(factionId: string): FactionRelation[] {
  const faction = getFactionById(factionId)
  return faction?.relations || []
}

export function isAllied(entity1Id: string, entity2Id: string): boolean {
  const nation = getNationById(entity1Id)
  if (nation) {
    const relation = nation.relations.find(r => r.target === entity2Id)
    return relation?.type === 'ally'
  }
  
  const faction = getFactionById(entity1Id)
  if (faction) {
    const relation = faction.relations.find(r => r.target === entity2Id)
    return relation?.type === 'ally'
  }
  
  return false
}

export function isEnemy(entity1Id: string, entity2Id: string): boolean {
  const nation = getNationById(entity1Id)
  if (nation) {
    const relation = nation.relations.find(r => r.target === entity2Id)
    return relation?.type === 'enemy'
  }
  
  const faction = getFactionById(entity1Id)
  if (faction) {
    const relation = faction.relations.find(r => r.target === entity2Id)
    return relation?.type === 'enemy'
  }
  
  return false
}
