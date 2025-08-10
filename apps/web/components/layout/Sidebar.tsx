import Link from 'next/link';

const items = ['Map', 'Inventory', 'Implants', 'Factions', 'Contracts', 'Shop', 'Bank', 'Settings'];

export function Sidebar() {
  return (
    <aside className="hidden md:block w-48 bg-surface p-4 space-y-2">
      {items.map((name) => (
        <Link key={name} href="/" className="block text-primary hover:text-accent-teal">
          {name}
        </Link>
      ))}
    </aside>
  );
}
