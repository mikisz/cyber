export interface Rewards {
  xp?: Record<string, number>;
  dropTableId?: string;
}

export interface Requirement {
  type: string;
  skill?: string;
  level?: number;
}

export interface ActionDef {
  id: string;
  districtId: string;
  type: string;
  title: string;
  durationMs: number;
  cost: { energy: number };
  requirements: Requirement[];
  rewards: Rewards;
  meta?: Record<string, any>;
}

export interface ActionRun {
  actionId: string;
  startedAt: number;
  durationMs: number;
}

export interface DropTableEntry {
  itemId: string;
  weight: number;
  qtyMin: number;
  qtyMax: number;
}

export interface GameState {
  energy: number;
  inventory: Record<string, number>;
  activeRun: ActionRun | null;
}
