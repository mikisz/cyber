export function ProgressBar({ progress }: { progress: number }) {
  const pct = Math.max(0, Math.min(100, progress));
  return (
    <div className="w-full h-2 bg-background rounded">
      <div className="h-2 bg-accent-teal rounded" style={{ width: `${pct}%` }} />
    </div>
  );
}
