export const realms = [
  { level: 0, name: '凡人', expRequired: 0, description: '未踏入修仙之路的普通人' },
  { level: 1, name: '炼气一层', expRequired: 100, description: '初感灵气，踏入修仙之门' },
  { level: 2, name: '炼气二层', expRequired: 300, description: '灵气入体，经脉初通' },
  { level: 3, name: '炼气三层', expRequired: 600, description: '灵气运转，身轻体健' },
  { level: 4, name: '炼气四层', expRequired: 1000, description: '灵气充盈，百病不侵' },
  { level: 5, name: '炼气五层', expRequired: 1500, description: '灵气凝实，可御法器' },
  { level: 6, name: '炼气六层', expRequired: 2100, description: '灵气化液，寿元延长' },
  { level: 7, name: '炼气七层', expRequired: 2800, description: '灵气纯厚，法力大增' },
  { level: 8, name: '炼气八层', expRequired: 3600, description: '灵气满溢，即将突破' },
  { level: 9, name: '炼气九层', expRequired: 4500, description: '炼气圆满，筑基在望' },
  { level: 10, name: '筑基初期', expRequired: 10000, description: '筑基成功，寿元三百' },
  { level: 11, name: '筑基中期', expRequired: 20000, description: '根基稳固，法力深厚' },
  { level: 12, name: '筑基后期', expRequired: 40000, description: '筑基圆满，结丹在望' },
  { level: 13, name: '金丹初期', expRequired: 100000, description: '凝结金丹，寿元五百' },
  { level: 14, name: '金丹中期', expRequired: 200000, description: '金丹稳固，神通大增' },
  { level: 15, name: '金丹后期', expRequired: 400000, description: '金丹圆满，元婴在望' },
  { level: 16, name: '元婴初期', expRequired: 1000000, description: '元婴初成，寿元千载' },
  { level: 17, name: '元婴中期', expRequired: 2000000, description: '元婴壮大，可夺舍重生' },
  { level: 18, name: '元婴后期', expRequired: 4000000, description: '元婴圆满，化神在望' },
  { level: 19, name: '化神期', expRequired: 10000000, description: '化神成功，寿元五千' },
  { level: 20, name: '渡劫期', expRequired: 50000000, description: '渡劫飞升，成就真仙' }
]

export function getRealmByLevel(level: number) {
  return realms.find(r => r.level === level) || realms[0]
}

export function getNextRealm(currentLevel: number) {
  return realms.find(r => r.level === currentLevel + 1)
}

export function getExpToNextRealm(currentLevel: number, currentExp: number): number {
  const nextRealm = getNextRealm(currentLevel)
  if (!nextRealm) return 0
  return nextRealm.expRequired - currentExp
}
