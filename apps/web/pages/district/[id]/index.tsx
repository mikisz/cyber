import Link from 'next/link';
import { useRouter } from 'next/router';
import districts from '@cyberidle/content/districts.json';

export default function DistrictHome() {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const district = districts.find((d) => d.id === id);
  if (!district) return <div>Unknown district</div>;
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl">{district.name}</h1>
      <ul className="space-y-2">
        {district.modules.map((m) => (
          <li key={m}>
            {m === 'hacking' ? (
              <Link href={`/district/${district.id}/${m}`} className="text-accent-teal capitalize">
                {m}
              </Link>
            ) : (
              <span className="text-secondary capitalize">{m} (coming soon)</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
