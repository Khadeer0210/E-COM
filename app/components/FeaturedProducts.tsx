'use client';

import { motion } from 'framer-motion';
import { products } from '@/lib/data';
import ProductCard from './ProductCard';

export default function FeaturedProducts() {
  const featured = products.filter(p => p.featured);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold">Featured Pieces</h2>
          <p className="mt-3 text-off-black/50">Hand-picked selections from our latest collection.</p>
        </div>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
