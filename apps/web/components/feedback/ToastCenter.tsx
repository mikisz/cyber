import { useUIStore } from '../../store/useUIStore';
import { Toast } from './Toast';

export function ToastCenter() {
  const toasts = useUIStore((s) => s.toasts);
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 space-y-2 z-50">
      {toasts.map((t) => (
        <Toast key={t.id} {...t} />
      ))}
    </div>
  );
}
