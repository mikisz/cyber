import Link from 'next/link';
import { useGameStore } from '../../store/useGameStore';
import { ProgressBar } from '../ui/ProgressBar';

export function ActiveActionBar() {
  const run = useGameStore((s) => s.activeRun);
  const getAction = useGameStore((s) => s.getActionById);
  if (!run) return null;
  const action = getAction(run.actionId);
  const progress = ((Date.now() - run.startedAt) / run.durationMs) * 100;
  if (!action) return null;
  return (
    <Link
      href={`/district/${action.districtId}/${action.type}`}
      className="fixed bottom-12 left-0 right-0 md:static md:mt-auto bg-surface p-2"
    >
      <div className="text-sm mb-1">{action.title}</div>
      <ProgressBar progress={progress} />
    </Link>
  );
}
