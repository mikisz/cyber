export interface ToastProps {
  id: string;
  text: string;
  kind?: 'info' | 'success' | 'error';
}

export function Toast({ text }: ToastProps) {
  return <div className="bg-surface text-primary px-4 py-2 rounded shadow-neon">{text}</div>;
}
