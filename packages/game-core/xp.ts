export function addXP(xp: Record<string, number>, skillId: string, amount: number) {
  return { ...xp, [skillId]: (xp[skillId] || 0) + amount };
}
