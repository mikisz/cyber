import { ActionDef, DropTableEntry, GameState } from './types';

export function rollDropTable(entries: DropTableEntry[]): Record<string, number> {
  if (!entries.length) return {};
  const total = entries.reduce((sum, e) => sum + e.weight, 0);
  const roll = Math.random() * total;
  let acc = 0;
  for (const e of entries) {
    acc += e.weight;
    if (roll <= acc) {
      const qty = e.qtyMin + Math.floor(Math.random() * (e.qtyMax - e.qtyMin + 1));
      return { [e.itemId]: qty };
    }
  }
  return {};
}

export function grantRewards(state: GameState, action: ActionDef, dropTables: Record<string, DropTableEntry[]>): GameState {
  const rewards = action.rewards;
  const inventory = { ...state.inventory };
  if (rewards.dropTableId) {
    const drops = rollDropTable(dropTables[rewards.dropTableId] || []);
    for (const [itemId, qty] of Object.entries(drops)) {
      inventory[itemId] = (inventory[itemId] || 0) + qty;
    }
  }
  return { ...state, inventory };
}
