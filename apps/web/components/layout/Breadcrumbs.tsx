import Link from 'next/link';

interface Segment { name: string; href?: string }

export function Breadcrumbs({ segments }: { segments: Segment[] }) {
  return (
    <nav className="text-sm text-secondary flex space-x-1">
      {segments.map((seg, idx) => (
        <span key={idx}>
          {seg.href ? <Link href={seg.href}>{seg.name}</Link> : seg.name}
          {idx < segments.length - 1 && <span className="mx-1">›</span>}
        </span>
      ))}
    </nav>
  );
}
