import Link from 'next/link';

export function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface flex justify-around p-2">
      <Link href="/inventory" className="text-primary">Inv</Link>
      <Link href="/logs" className="text-primary">Logs</Link>
      <Link href="/active" className="text-primary">Active</Link>
      <Link href="/menu" className="text-primary">Menu</Link>
    </nav>
  );
}
