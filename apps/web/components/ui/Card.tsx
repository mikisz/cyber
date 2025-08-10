import { ReactNode } from 'react';

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`bg-surface rounded shadow-neon p-4 ${className}`}>{children}</div>;
}
