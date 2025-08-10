import { ActionDef, GameState, ActionRun } from './types';

export function startAction(state: GameState, action: ActionDef, now = Date.now()): GameState {
  if (state.energy < action.cost.energy) {
    throw new Error('not_enough_energy');
  }
  const activeRun: ActionRun = {
    actionId: action.id,
    startedAt: now,
    durationMs: action.durationMs
  };
  return {
    ...state,
    energy: state.energy - action.cost.energy,
    activeRun
  };
}

export function stopAction(state: GameState): GameState {
  return { ...state, activeRun: null };
}

export function isActionRunning(state: GameState, actionId?: string): boolean {
  if (!state.activeRun) return false;
  return actionId ? state.activeRun.actionId === actionId : true;
}
