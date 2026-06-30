import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => {
        const existing = state.items.find(
          i => i.productId === item.productId && i.size === item.size && i.color === item.color
        );
        if (existing) {
          return {
            items: state.items.map(i =>
              i.productId === item.productId && i.size === item.size && i.color === item.color
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          };
        }
        return { items: [...state.items, item] };
      }),
      removeItem: (productId, size, color) => set((state) => ({
        items: state.items.filter(
          i => !(i.productId === productId && i.size === size && i.color === color)
        ),
      })),
      updateQuantity: (productId, size, color, quantity) => set((state) => ({
        items: state.items.map(i =>
          i.productId === productId && i.size === size && i.color === color
            ? { ...i, quantity }
            : i
        ),
      })),
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
      subtotal: () => get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    { name: 'luxe-cart-storage' }
  )
);
