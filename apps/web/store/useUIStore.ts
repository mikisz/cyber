import { create } from 'zustand';

export interface ToastItem {
  id: string;
  text: string;
  kind?: 'info' | 'success' | 'error';
}

interface UIState {
  toasts: ToastItem[];
  pushToast: (t: Omit<ToastItem, 'id'>) => void;
  removeToast: (id: string) => void;
}

const timers = new Map<string, ReturnType<typeof setTimeout>>();

export const useUIStore = create<UIState>((set) => ({
  toasts: [],
  pushToast: (t) => {
    const id = crypto.randomUUID();
    const timeout = setTimeout(() => {
      timers.delete(id);
      set((s) => ({ toasts: s.toasts.filter((toast) => toast.id !== id) }));
    }, 3000);
    timers.set(id, timeout);
    set((s) => ({ toasts: [...s.toasts, { id, ...t }] }));
  },
  removeToast: (id) => {
    const timeout = timers.get(id);
    if (timeout) {
      clearTimeout(timeout);
      timers.delete(id);
    }
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
  }
}));
