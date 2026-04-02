export * from './extendedWorld'
export * from './extendedCultivation'
export * from './extendedFactions'
export * from './extendedWorldMap'
export * from './extendedItems'
export * from './extendedMonsters'
export * from './extendedSkills'
export * from './extendedEconomy'
export * from './formations'
export * from './recipes'
export * from './extendedNpcs'

import { extendedRegions, secretRealms, forbiddenAreas, ancientRuins } from './extendedWorldMap'
import { extendedPills, extendedMaterials, extendedArtifacts, immortalArtifacts, spiritStones } from './extendedItems'
import { extendedMonsters, bossMonsters, ancientBeasts, monsterGroups } from './extendedMonsters'
import { cultivationMethods, divinePowers, spells, secretTechniques } from './extendedSkills'
import { extendedCurrencies, auctionHouses, merchantGuilds, tradingCompanies, banks, extendedMarkets, extendedTradeRoutes } from './extendedEconomy'
import { formations, formationFlags, formationEyes } from './formations'
import { pillRecipes, artifactRecipes, formationRecipes, talismanRecipes } from './recipes'
import { historicalFigures, reclusiveExperts, inheritors } from './extendedNpcs'
import { races, divineBeasts, spiritVeins, secretRealmSystem } from './extendedWorld'
import { cultivationRealms, specialPhysiques, specialTalents, cultivationResources } from './extendedCultivation'
import { extendedNations, sects, families, alliances } from './extendedFactions'

export const gameData = {
  world: {
    regions: extendedRegions,
    secretRealms,
    forbiddenAreas,
    ancientRuins
  },
  items: {
    pills: extendedPills,
    materials: extendedMaterials,
    artifacts: extendedArtifacts,
    immortalArtifacts,
    spiritStones
  },
  monsters: {
    common: extendedMonsters,
    bosses: bossMonsters,
    ancient: ancientBeasts,
    groups: monsterGroups
  },
  skills: {
    cultivationMethods,
    divinePowers,
    spells,
    secretTechniques
  },
  economy: {
    currencies: extendedCurrencies,
    auctionHouses,
    merchantGuilds,
    tradingCompanies,
    banks,
    markets: extendedMarkets,
    tradeRoutes: extendedTradeRoutes
  },
  formations: {
    formations,
    flags: formationFlags,
    eyes: formationEyes
  },
  recipes: {
    pills: pillRecipes,
    artifacts: artifactRecipes,
    formations: formationRecipes,
    talismans: talismanRecipes
  },
  npcs: {
    historicalFigures,
    reclusiveExperts,
    inheritors
  },
  races: {
    races,
    divineBeasts,
    spiritVeins,
    secretRealms: secretRealmSystem
  },
  cultivation: {
    realms: cultivationRealms,
    physiques: specialPhysiques,
    talents: specialTalents,
    resources: cultivationResources
  },
  factions: {
    nations: extendedNations,
    sects,
    families,
    alliances
  }
}

export type GameDataType = typeof gameData
