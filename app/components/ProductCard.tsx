'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Product } from '@/lib/data';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useUIStore } from '@/store/uiStore';

export default function ProductCard({ product }: { product: Product }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({});
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.isInWishlist(product.id));
  const showToast = useUIStore((s) => s.showToast);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTiltStyle({ transform: `perspective(1000px) rotateX(${y*5}deg) rotateY(${x*5}deg) scale3d(1.02,1.02,1.02)` });
  };

  const handleMouseLeave = () => {
    setTiltStyle({ transform: 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)' });
  };

  const quickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ productId: product.id, name: product.name, image: product.images[0], price: product.price, size: product.sizes[0], color: product.colors[0].name, quantity: 1 });
    showToast(`${product.name} added to cart`);
  };

  return (
    <motion.div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={tiltStyle}
      className="group relative bg-white/40 backdrop-blur-sm rounded-3xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500"
      whileHover={{ y: -8 }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image src={product.images[0]} alt={product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {product.originalPrice && <span className="absolute top-4 left-4 bg-rose-500 text-white text-xs px-3 py-1.5 rounded-full font-semibold">SALE</span>}
          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.id); }}
            className="absolute top-4 right-4 p-2.5 bg-white/80 rounded-full backdrop-blur-sm hover:bg-white transition-all" aria-label="Wishlist">
            <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-off-black'}`} />
          </button>
          <button onClick={quickAdd}
            className="absolute bottom-4 left-4 right-4 bg-off-black/90 backdrop-blur-sm text-white py-3 rounded-2xl text-sm font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2">
            <ShoppingBag className="h-4 w-4" /> Quick Add
          </button>
        </div>
        <div className="p-5">
          <h3 className="text-base font-display font-semibold text-off-black truncate">{product.name}</h3>
          <div className="flex items-center space-x-2 mt-1.5">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} />)}
            </div>
            <span className="text-xs text-off-black/50">({product.reviewCount})</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">${product.price}</span>
              {product.originalPrice && <span className="text-sm text-off-black/40 line-through">${product.originalPrice}</span>}
            </div>
            <div className="flex -space-x-1">
              {product.colors.slice(0, 3).map((c) => <div key={c.hex} className="w-4 h-4 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: c.hex }} title={c.name} />)}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
