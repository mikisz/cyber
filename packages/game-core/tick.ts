import { GameState } from './types';

let timer: ReturnType<typeof setInterval> | null = null;

export function attachTickLoop(onTick: (now: number) => void) {
  if (timer) return;
  timer = setInterval(() => onTick(Date.now()), 250);
}

export function detachTickLoop() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

export function resumeOffline(state: GameState, _now = Date.now()): GameState {
  // Simplified placeholder
  return state;
}
