import create from 'zustand';

interface PlayerState {
  xp: Record<string, number>;
  addXP: (skillId: string, amount: number) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  xp: {},
  addXP: (skillId, amount) =>
    set((s) => ({ xp: { ...s.xp, [skillId]: (s.xp[skillId] || 0) + amount } })),
}));
