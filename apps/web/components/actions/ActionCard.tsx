import { ActionDef } from '@cyberidle/game-core';
import { useGameStore } from '../../store/useGameStore';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { formatDuration } from '../../utils/time';

export function ActionCard({ action }: { action: ActionDef }) {
  const start = useGameStore((s) => s.startActionById);
  const stop = useGameStore((s) => s.stopAction);
  const active = useGameStore((s) => s.activeRun?.actionId === action.id);
  return (
    <Card className="flex items-center justify-between">
      <div>
        <h3 className="text-primary">{action.title}</h3>
        <p className="text-secondary text-sm">{formatDuration(action.durationMs)}</p>
      </div>
      {active ? (
        <Button onClick={() => stop()}>Stop</Button>
      ) : (
        <Button onClick={() => start(action.id)}>Start</Button>
      )}
    </Card>
  );
}
