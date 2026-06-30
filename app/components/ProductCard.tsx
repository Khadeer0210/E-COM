'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { Product } from '@/lib/data';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useUIStore } from '@/store/uiStore';
import { formatPrice } from '@/lib/helpers';

export default function ProductCard({ product }: { product: Product }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const addItem    = useCartStore((s) => s.addItem);
  const toggleWish = useWishlistStore((s) => s.toggle);
  const isWished   = useWishlistStore((s) => s.isInWishlist(product.id));
  const showToast  = useUIStore((s) => s.showToast);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientY - rect.top)  / rect.height - 0.5) * 12;
    const y = ((e.clientX - rect.left) / rect.width  - 0.5) * -12;
    setTilt({ x, y });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: product.id,
      name:      product.name,
      image:     product.images[0],
      price:     product.price,
      size:      product.sizes[0],
      color:     product.colors[0].name,
      quantity:  1,
    });
    showToast(`${product.name} added to cart ✓`);
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      style={{
        transform: hovered
          ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.025, 1.025, 1.025)`
          : 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
        transition: 'transform 0.25s ease-out',
        willChange: 'transform',
      }}
    >
      <Link href={`/products/${product.id}`} className="group block">
        {/* Image */}
        <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-white/30">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.featured && (
              <span className="btn-glass text-[11px] font-semibold px-2.5 py-1 rounded-full text-emerald-700">Featured</span>
            )}
            {discount && (
              <span className="bg-rose-500 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">−{discount}%</span>
            )}
          </div>

          {/* Action buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <motion.button
              onClick={(e) => { e.preventDefault(); toggleWish(product.id); }}
              className="p-2.5 btn-glass rounded-full backdrop-blur-sm"
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
            >
              <Heart className={`h-4 w-4 transition-colors ${isWished ? 'fill-rose-500 text-rose-500' : 'text-off-black/70'}`} />
            </motion.button>
            <motion.button
              onClick={handleAddToCart}
              className="p-2.5 btn-glass rounded-full backdrop-blur-sm"
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
            >
              <ShoppingBag className="h-4 w-4 text-off-black/70" />
            </motion.button>
          </div>

          {/* Quick view — bottom slide-up */}
          <motion.div
            className="absolute bottom-3 left-3 right-3"
            initial={{ y: 20, opacity: 0 }}
            animate={hovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={(e) => e.preventDefault()}
              className="w-full btn-glass-dark text-white text-xs font-semibold py-2.5 rounded-2xl flex items-center justify-center gap-2"
            >
              <Eye className="h-3.5 w-3.5" />
              Quick View
            </button>
          </motion.div>
        </div>

        {/* Info */}
        <div className="mt-4 px-1">
          <p className="text-[11px] uppercase tracking-widest text-off-black/40 mb-1">{product.category}</p>
          <h3 className="font-semibold text-sm leading-tight mb-1.5 group-hover:text-off-black transition-colors line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xs text-off-black/35 line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="text-xs text-off-black/50">{product.rating}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
