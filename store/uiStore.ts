import { create } from 'zustand';

interface UIStore {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toastMessage: string | null;
  showToast: (message: string) => void;
  hideToast: () => void;
  bgGradient: string;
  setBgGradient: (gradient: string) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isCartOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toastMessage: null,
  showToast: (message) => {
    set({ toastMessage: message });
    setTimeout(() => set({ toastMessage: null }), 3000);
  },
  hideToast: () => set({ toastMessage: null }),
  bgGradient: 'linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)',
  setBgGradient: (gradient) => set({ bgGradient: gradient }),
}));
