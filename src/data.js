export const RESOURCES = {
  food: { id: 'food', name: 'Food', tier: 0, type: 'consumable', category: 'food', baseCapacity: 300, perStorage: 200, seasonalKeys: ['farmingSpeed', 'farmingYield'] },
  wood: { id: 'wood', name: 'Wood', tier: 0, type: 'raw', category: 'resources', baseCapacity: 100, perStorage: 200, seasonalKeys: ['workSpeed', 'workYield'] },
  plank: { id: 'plank', name: 'Planks', tier: 1, type: 'processed', category: 'resources', baseCapacity: 0, perStorage: 0, seasonalKeys: ['workSpeed', 'workYield'] },
  scrap: { id: 'scrap', name: 'Scrap', tier: 0, type: 'raw', category: 'resources', baseCapacity: 100, perStorage: 200, seasonalKeys: ['workSpeed'] },
  metal: { id: 'metal', name: 'Metal Bars', tier: 1, type: 'processed', category: 'resources', baseCapacity: 0, perStorage: 0, seasonalKeys: ['smeltingSpeed', 'smeltingYield'] },
  water: { id: 'water', name: 'Water', tier: 0, type: 'consumable', category: 'food', baseCapacity: 100, perStorage: 200, seasonalKeys: ['workSpeed', 'seasonRain'] }
};

export const BUILDINGS = {
  potatoField: { id: 'potatoField', name: 'Potato Field', category: 'food', cost: { scrap: 0, wood: 20, plank: 0, metal: 0 }, cycleTimeSec: 8, harvestAmount: 3, outputResource: 'food', outputValue: 1, seasonSpeedKey: 'farmingSpeed', seasonYieldKey: 'farmingYield', startsWithCount: 1 },
  cornField: { id: 'cornField', name: 'Corn Field', category: 'food', cost: { scrap: 0, wood: 30, plank: 0, metal: 0 }, cycleTimeSec: 5, harvestAmount: 1, outputResource: 'food', outputValue: 2, seasonSpeedKey: 'farmingSpeed', seasonYieldKey: 'farmingYield', startsWithCount: 0 },
  ricePaddy: { id: 'ricePaddy', name: 'Rice Paddy', category: 'food', cost: { scrap: 0, wood: 15, plank: 0, metal: 0 }, cycleTimeSec: 3, harvestAmount: 1, outputResource: 'food', outputValue: 1, seasonSpeedKey: 'farmingSpeed', seasonYieldKey: 'farmingYield', startsWithCount: 0 },

  loggingCamp: { id: 'loggingCamp', name: 'Logging Camp', category: 'resources', cost: { scrap: 50, wood: 0, plank: 0, metal: 0 }, cycleTimeSec: 6, harvestAmount: 1, outputResource: 'wood', outputValue: 1, seasonSpeedKey: 'workSpeed', seasonYieldKey: 'workYield', startsWithCount: 1 },
  sawmill: { id: 'sawmill', name: 'Sawmill', category: 'resources', cost: { scrap: 30, wood: 40, plank: 10, metal: 0 }, cycleTimeSec: 4, harvestAmount: 1, outputResource: 'plank', outputValue: 1, seasonSpeedKey: 'workSpeed', seasonYieldKey: 'workYield', startsWithCount: 0 },
  scrapYard: { id: 'scrapYard', name: 'Scrap Yard', category: 'resources', cost: { scrap: 0, wood: 0, plank: 0, metal: 0 }, cycleTimeSec: 7, harvestAmount: 1, outputResource: 'scrap', outputValue: 1, seasonSpeedKey: 'workSpeed', seasonYieldKey: 'workYield', startsWithCount: 0 },
  smelter: { id: 'smelter', name: 'Smelter', category: 'industry', cost: { scrap: 100, wood: 50, plank: 20, metal: 0 }, cycleTimeSec: 10, harvestAmount: 1, outputResource: 'metal', outputValue: 1, seasonSpeedKey: 'smeltingSpeed', seasonYieldKey: 'smeltingYield', startsWithCount: 0 },

  granary: { id: 'granary', name: 'Granary', category: 'storage', cost: { scrap: 20, wood: 60, plank: 10, metal: 0 }, addsCapacity: { food: 200 }, startsWithCount: 0 },
  warehouse: { id: 'warehouse', name: 'Warehouse', category: 'storage', cost: { scrap: 30, wood: 80, plank: 20, metal: 0 }, addsCapacity: { wood: 200, scrap: 200 }, startsWithCount: 0 }
};

export const SEASONS = {
  spring: { farmingSpeed: 1.1, farmingYield: 1.1, workSpeed: 1, workYield: 1, smeltingSpeed: 1, smeltingYield: 1, seasonRain: 1.2 },
  summer: { farmingSpeed: 1, farmingYield: 1, workSpeed: 1, workYield: 1, smeltingSpeed: 1, smeltingYield: 1, seasonRain: 1 },
  autumn: { farmingSpeed: 0.9, farmingYield: 1, workSpeed: 1, workYield: 1.1, smeltingSpeed: 1, smeltingYield: 1, seasonRain: 0.8 },
  winter: { farmingSpeed: 0.7, farmingYield: 0.8, workSpeed: 0.9, workYield: 0.9, smeltingSpeed: 1, smeltingYield: 1, seasonRain: 0.5 }
};

