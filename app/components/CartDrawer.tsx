'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { formatPrice } from '@/lib/helpers';

export default function CartDrawer() {
  const isOpen = useUIStore((s) => s.isCartOpen);
  const closeCart = useUIStore((s) => s.closeCart);
  const { items, removeItem, updateQuantity } = useCartStore();
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black z-40" onClick={closeCart} />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-2xl font-display font-semibold">Shopping Bag</h2>
              <button onClick={closeCart} className="p-2 hover:bg-gray-100 rounded-full transition"><X className="h-6 w-6" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="text-center mt-20">
                  <p className="text-off-black/60 mb-4">Your bag is empty</p>
                  <Link href="/products" onClick={closeCart} className="text-sm font-medium underline underline-offset-4 hover:text-off-black/80">Continue Shopping</Link>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div key={`${item.productId}-${item.size}-${item.color}`} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                    className="flex space-x-4">
                    <div className="relative w-20 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{item.name}</h4>
                      <p className="text-xs text-off-black/50 mt-0.5">{item.size} / {item.color}</p>
                      <p className="font-bold text-sm mt-1">${item.price}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button onClick={() => updateQuantity(item.productId, item.size, item.color, Math.max(1, item.quantity - 1))}
                          className="p-1 rounded-full hover:bg-gray-100 transition"><Minus className="h-3.5 w-3.5" /></button>
                        <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                          className="p-1 rounded-full hover:bg-gray-100 transition"><Plus className="h-3.5 w-3.5" /></button>
                      </div>
                    </div>
                    <button onClick={() => removeItem(item.productId, item.size, item.color)} className="p-2 self-start hover:bg-gray-100 rounded-full transition">
                      <Trash2 className="h-4 w-4 text-off-black/40" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>
            {items.length > 0 && (
              <div className="border-t border-gray-100 p-6 space-y-4">
                <div className="flex justify-between text-lg">
                  <span className="text-off-black/70">Subtotal</span>
                  <span className="font-bold">{formatPrice(subtotal)}</span>
                </div>
                <Link href="/checkout" onClick={closeCart}
                  className="block w-full bg-off-black text-white py-4 rounded-full text-center font-medium hover:bg-off-black/90 transition">
                  Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
