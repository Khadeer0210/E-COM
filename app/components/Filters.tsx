'use client';

import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import { useFilterStore } from '@/store/filterStore';
import { useState } from 'react';

const sortOptions = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest' },
];

const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const colorOptions = [
  { name: 'Black', hex: '#0A0A0A' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Navy', hex: '#000080' },
  { name: 'Brown', hex: '#8B4513' },
  { name: 'Rose', hex: '#FF69B4' },
  { name: 'Gold', hex: '#FFD700' },
];

export default function Filters() {
  const [open, setOpen] = useState(false);
  const filters = useFilterStore();

  return (
    <>
      {/* Mobile toggle */}
      <button onClick={() => setOpen(!open)} className="lg:hidden flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2.5 rounded-full text-sm font-medium mb-4">
        <SlidersHorizontal className="h-4 w-4" /> Filters
      </button>

      <motion.aside initial={false} animate={{ height: open ? 'auto' : undefined }}
        className={`w-full lg:w-64 flex-shrink-0 ${open ? 'block' : 'hidden lg:block'}`}>
        <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-6 shadow-soft space-y-8 sticky top-24">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold text-lg">Filters</h3>
            <button onClick={() => filters.resetFilters()} className="text-xs text-off-black/50 hover:text-off-black transition">Clear All</button>
          </div>

          {/* Sort */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Sort By</h4>
            <select value={filters.sort} onChange={(e) => filters.setSort(e.target.value)}
              className="w-full bg-white/70 border border-off-black/10 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-off-black/30 transition">
              {sortOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Price Range</h4>
            <div className="flex items-center gap-3">
              <input type="number" value={filters.priceRange[0]} onChange={(e) => filters.setPriceRange([+e.target.value, filters.priceRange[1]])}
                className="w-full bg-white/70 border border-off-black/10 rounded-xl px-3 py-2 text-sm outline-none" placeholder="Min" />
              <span className="text-off-black/30">—</span>
              <input type="number" value={filters.priceRange[1]} onChange={(e) => filters.setPriceRange([filters.priceRange[0], +e.target.value])}
                className="w-full bg-white/70 border border-off-black/10 rounded-xl px-3 py-2 text-sm outline-none" placeholder="Max" />
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Size</h4>
            <div className="flex flex-wrap gap-2">
              {sizeOptions.map(size => (
                <button key={size} onClick={() => filters.toggleSize(size)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    filters.sizes.includes(size) ? 'bg-off-black text-white' : 'bg-white/70 text-off-black/70 hover:bg-white'
                  }`}>
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Color</h4>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map(color => (
                <button key={color.name} onClick={() => filters.toggleColor(color.name)}
                  className={`w-8 h-8 rounded-full border-2 transition ${
                    filters.colors.includes(color.name) ? 'border-off-black scale-110' : 'border-transparent hover:border-off-black/30'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name} />
              ))}
            </div>
          </div>

          {/* Active filters */}
          {(filters.sizes.length > 0 || filters.colors.length > 0) && (
            <div className="flex flex-wrap gap-2">
              {filters.sizes.map(s => (
                <span key={s} className="inline-flex items-center gap-1 bg-off-black/10 text-xs px-2.5 py-1 rounded-full">
                  {s} <X className="h-3 w-3 cursor-pointer" onClick={() => filters.toggleSize(s)} />
                </span>
              ))}
              {filters.colors.map(c => (
                <span key={c} className="inline-flex items-center gap-1 bg-off-black/10 text-xs px-2.5 py-1 rounded-full">
                  {c} <X className="h-3 w-3 cursor-pointer" onClick={() => filters.toggleColor(c)} />
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.aside>
    </>
  );
}
