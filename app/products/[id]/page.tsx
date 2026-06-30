'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star, Minus, Plus, ArrowLeft, Truck, RotateCcw, Shield } from 'lucide-react';
import { fetchProductById } from '@/lib/api';
import { Product, products } from '@/lib/data';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useUIStore } from '@/store/uiStore';
import ProductCard from '@/app/components/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => product ? s.isInWishlist(product.id) : false);
  const showToast = useUIStore((s) => s.showToast);

  useEffect(() => {
    if (params.id) {
      fetchProductById(params.id as string).then((p) => {
        setProduct(p);
        if (p) { setSelectedSize(p.sizes[0]); setSelectedColor(p.colors[0].name); }
        setLoading(false);
      });
    }
  }, [params.id]);

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="aspect-square bg-gray-200/50 rounded-3xl animate-pulse" />
        <div className="space-y-4">
          <div className="h-8 bg-gray-200/50 rounded-full w-3/4 animate-pulse" />
          <div className="h-4 bg-gray-200/50 rounded-full w-1/2 animate-pulse" />
          <div className="h-6 bg-gray-200/50 rounded-full w-1/4 animate-pulse" />
        </div>
      </div>
    </div>
  );

  if (!product) return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
      <h1 className="text-3xl font-display font-bold mb-4">Product Not Found</h1>
      <Link href="/products" className="text-sm underline underline-offset-4">Back to Products</Link>
    </div>
  );

  const handleAddToCart = () => {
    addItem({ productId: product.id, name: product.name, image: product.images[0], price: product.price, size: selectedSize, color: selectedColor, quantity });
    showToast(`${product.name} added to cart`);
  };

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Link href="/products" className="inline-flex items-center gap-2 text-sm text-off-black/60 hover:text-off-black mb-8 transition">
        <ArrowLeft className="h-4 w-4" /> Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-white/30">
            <Image src={product.images[selectedImage]} alt={product.name} fill className="object-cover" sizes="(max-width:1024px) 100vw,50vw" priority />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3 mt-4">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden transition-all ${selectedImage === i ? 'ring-2 ring-off-black ring-offset-2' : 'opacity-60 hover:opacity-100'}`}>
                  <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Details */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div>
            <p className="text-sm text-off-black/50 uppercase tracking-wider mb-2">{product.category}</p>
            <h1 className="text-3xl sm:text-4xl font-display font-bold">{product.name}</h1>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} />)}
              </div>
              <span className="text-sm text-off-black/50">{product.rating} ({product.reviewCount} reviews)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold">${product.price}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-off-black/40 line-through">${product.originalPrice}</span>
                <span className="text-sm bg-rose-100 text-rose-600 px-2.5 py-1 rounded-full font-medium">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              </>
            )}
          </div>

          <p className="text-off-black/60 leading-relaxed">{product.description}</p>

          {/* Color */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Color: <span className="font-normal text-off-black/60">{selectedColor}</span></h4>
            <div className="flex gap-3">
              {product.colors.map(c => (
                <button key={c.hex} onClick={() => setSelectedColor(c.name)}
                  className={`w-10 h-10 rounded-full transition-all ${selectedColor === c.name ? 'ring-2 ring-off-black ring-offset-2 scale-110' : 'hover:scale-105'}`}
                  style={{ backgroundColor: c.hex }} title={c.name} />
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Size</h4>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(s => (
                <button key={s} onClick={() => setSelectedSize(s)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition ${
                    selectedSize === s ? 'bg-off-black text-white' : 'bg-white/60 text-off-black hover:bg-white/90'
                  }`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-white/60 rounded-xl">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-white/80 rounded-l-xl transition"><Minus className="h-4 w-4" /></button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-white/80 rounded-r-xl transition"><Plus className="h-4 w-4" /></button>
            </div>
            <button onClick={handleAddToCart}
              className="flex-1 bg-off-black text-white py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-off-black/90 transition">
              <ShoppingBag className="h-5 w-5" /> Add to Cart
            </button>
            <button onClick={() => toggleWishlist(product.id)}
              className={`p-4 rounded-full transition ${isWishlisted ? 'bg-rose-50 text-rose-500' : 'bg-white/60 hover:bg-white/90'}`}>
              <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Info badges */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-off-black/10">
            {[{ icon: Truck, text: 'Free Shipping' }, { icon: RotateCcw, text: '30-Day Returns' }, { icon: Shield, text: 'Secure Payment' }].map(({ icon: Icon, text }) => (
              <div key={text} className="flex flex-col items-center text-center gap-2 p-3">
                <Icon className="h-5 w-5 text-off-black/40" />
                <span className="text-xs text-off-black/50">{text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Reviews */}
      {product.reviews.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-display font-bold mb-8">Customer Reviews</h2>
          <div className="space-y-4">
            {product.reviews.map(r => (
              <div key={r.id} className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-soft">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-sm">{r.user}</p>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? 'fill-current' : 'text-gray-300'}`} />)}
                  </div>
                </div>
                <p className="text-off-black/60 text-sm">{r.comment}</p>
                <p className="text-xs text-off-black/30 mt-2">{r.date}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-display font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
