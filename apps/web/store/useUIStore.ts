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

export const useUIStore = create<UIState>((set) => ({
  toasts: [],
  pushToast: (t) =>
    set((s) => ({ toasts: [...s.toasts, { id: Date.now().toString(), ...t }] })),
  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
