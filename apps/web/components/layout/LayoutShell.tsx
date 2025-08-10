import { ReactNode, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { ActiveActionBar } from '../actions/ActiveActionBar';
import { attachTickLoop, detachTickLoop } from '@cyberidle/game-core';
import { useGameStore } from '../../store/useGameStore';

export function LayoutShell({ children }: { children: ReactNode }) {
  const tick = useGameStore((s) => s.tick);
  useEffect(() => {
    attachTickLoop(tick);
    return () => detachTickLoop();
  }, [tick]);
  return (
    <div className="min-h-screen bg-background text-primary flex">
      <Sidebar />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <BottomNav />
      <ActiveActionBar />
    </div>
  );
}
