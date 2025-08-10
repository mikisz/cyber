import Link from 'next/link';
import districts from '@cyberidle/content/districts.json';

export default function MapPage() {
  return (
    <div className="p-4 space-y-4">
      {districts.map((d) => (
        <div key={d.id} className="bg-surface p-4 rounded shadow-neon">
          <h2 className="text-lg mb-2">{d.name}</h2>
          <Link href={`/district/${d.id}`} className="text-accent-teal">
            Enter
          </Link>
        </div>
      ))}
    </div>
  );
}
