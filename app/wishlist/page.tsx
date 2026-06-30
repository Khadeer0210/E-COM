'use client';

import { motion } from 'framer-motion';
import { useWishlistStore } from '@/store/wishlistStore';
import { products } from '@/lib/data';
import ProductCard from '@/app/components/ProductCard';
import { Heart } from 'lucide-react';
import Link from 'next/link';

export default function WishlistPage() {
  const wishlistIds = useWishlistStore((s) => s.items);
  const wishlistProducts = products.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-display font-bold mb-2">Wishlist</motion.h1>
      <p className="text-off-black/50 mb-10">{wishlistProducts.length} saved items</p>

      {wishlistProducts.length === 0 ? (
        <div className="text-center py-20">
          <Heart className="h-16 w-16 text-off-black/10 mx-auto mb-4" />
          <h2 className="text-xl font-display font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-off-black/50 mb-6">Save items you love for later</p>
          <Link href="/products" className="inline-flex bg-off-black text-white px-8 py-3 rounded-full font-medium hover:bg-off-black/90 transition">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
