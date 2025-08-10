import { create } from 'zustand';
import { ActionDef, ActionRun, startAction as coreStart, stopAction as coreStop, grantRewards } from '@cyberidle/game-core';
import actionsData from '@cyberidle/content/actions.json';
import dropTables from '@cyberidle/content/dropTables.json';
import { usePlayerStore } from './usePlayerStore';
import { useUIStore } from './useUIStore';

interface GameSlice {
  actions: ActionDef[];
  activeRun: ActionRun | null;
  energy: number;
  inventory: Record<string, number>;
  startActionById: (id: string) => void;
  stopAction: () => void;
  tick: (now: number) => void;
  getActionById: (id: string) => ActionDef | undefined;
}

export const useGameStore = create<GameSlice>((set, get) => ({
  actions: actionsData as ActionDef[],
  activeRun: null,
  energy: 50,
  inventory: {},
  getActionById: (id) => get().actions.find((a) => a.id === id),
  startActionById: (id) => {
    const action = get().actions.find((a) => a.id === id);
    if (!action) return;
    try {
      set((state) => coreStart(state, action));
    } catch {
      // ignore
    }
  },
  stopAction: () => set((state) => coreStop(state)),
  tick: (now) => {
    const state = get();
    const run = state.activeRun;
    if (!run) return;
    const action = state.actions.find((a) => a.id === run.actionId);
    if (!action) return;
    if (now - run.startedAt >= run.durationMs) {
      let newState = grantRewards(state, action, dropTables as any);
      const xp = action.rewards.xp || {};
      Object.entries(xp).forEach(([skill, amt]) => {
        usePlayerStore.getState().addXP(skill, amt);
        useUIStore.getState().pushToast({ text: `+${amt} XP (${skill})` });
      });
      try {
        set(coreStart(newState, action, now));
      } catch {
        set(coreStop(newState));
      }
    }
  },
}));
