export function formatDuration(ms: number): string {
  const sec = Math.floor(ms / 1000);
  return `${sec}s`;
}
