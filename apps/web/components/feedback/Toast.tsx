export interface ToastProps {
  id: string;
  text: string;
  kind?: 'info' | 'success' | 'error';
}

/**
 * Toast message component.
 * Available kinds: `info`, `success`, `error`.
 */
export function Toast({ text, kind = 'info' }: ToastProps) {
  const kindClass =
    kind === 'success'
      ? 'bg-green-600 text-white'
      : kind === 'error'
        ? 'bg-red-600 text-white'
        : 'bg-surface text-primary';
  return <div className={`${kindClass} px-4 py-2 rounded shadow-neon`}>{text}</div>;
}
