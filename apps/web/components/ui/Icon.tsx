export function Icon({ name, className = '' }: { name: string; className?: string }) {
  return <span className={`inline-block w-4 h-4 bg-accent-teal ${className}`} />;
}
