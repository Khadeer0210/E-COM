'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { fetchProducts } from '@/lib/api';
import { Product } from '@/lib/data';
import ProductGrid from '@/app/components/ProductGrid';
import Filters from '@/app/components/Filters';
import LoadingSkeleton from '@/app/components/LoadingSkeleton';
import { useFilterStore } from '@/store/filterStore';

function ProductsContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || undefined;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const filters = useFilterStore();

  useEffect(() => {
    setLoading(true);
    fetchProducts({ category, sort: filters.sort }).then((data) => {
      let filtered = data.data.filter(p => {
        if (filters.priceRange[0] > 0 && p.price < filters.priceRange[0]) return false;
        if (filters.priceRange[1] < 2000 && p.price > filters.priceRange[1]) return false;
        if (filters.sizes.length > 0 && !p.sizes.some(s => filters.sizes.includes(s))) return false;
        if (filters.colors.length > 0 && !p.colors.some(c => filters.colors.includes(c.name))) return false;
        return true;
      });
      setProducts(filtered);
      setLoading(false);
    });
  }, [category, filters.sort, filters.priceRange, filters.sizes, filters.colors]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-display font-bold mb-2">
        {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Products'}
      </motion.h1>
      <p className="text-off-black/50 mb-10">{products.length} products</p>
      <div className="flex flex-col lg:flex-row gap-8">
        <Filters />
        <div className="flex-1">
          {loading ? <LoadingSkeleton /> : <ProductGrid products={products} />}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 sm:px-6 py-12"><LoadingSkeleton /></div>}>
      <ProductsContent />
    </Suspense>
  );
}
