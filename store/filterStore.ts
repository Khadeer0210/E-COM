import { create } from 'zustand';

interface FilterState {
  priceRange: [number, number];
  colors: string[];
  sizes: string[];
  rating: number | null;
  sort: string;
  setPriceRange: (range: [number, number]) => void;
  toggleColor: (color: string) => void;
  toggleSize: (size: string) => void;
  setRating: (rating: number | null) => void;
  setSort: (sort: string) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  priceRange: [0, 2000],
  colors: [],
  sizes: [],
  rating: null,
  sort: 'popularity',
  setPriceRange: (range) => set({ priceRange: range }),
  toggleColor: (color) => set((state) => ({
    colors: state.colors.includes(color)
      ? state.colors.filter(c => c !== color)
      : [...state.colors, color],
  })),
  toggleSize: (size) => set((state) => ({
    sizes: state.sizes.includes(size)
      ? state.sizes.filter(s => s !== size)
      : [...state.sizes, size],
  })),
  setRating: (rating) => set({ rating }),
  setSort: (sort) => set({ sort }),
  resetFilters: () => set({
    priceRange: [0, 2000],
    colors: [],
    sizes: [],
    rating: null,
    sort: 'popularity',
  }),
}));
