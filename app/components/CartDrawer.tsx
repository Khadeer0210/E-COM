'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { formatPrice } from '@/lib/helpers';
import Image from 'next/image';
import Link from 'next/link';
import MagneticButton from './MagneticButton';

const drawerVariants: any = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { type: 'spring', damping: 26, stiffness: 220 } },
  exit: { x: '100%', transition: { type: 'spring', damping: 30, stiffness: 250 } }
};

const overlayVariants: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

export default function CartDrawer() {
  const { isCartOpen, closeCart } = useUIStore();
  const cartItems = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal());

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white/70 backdrop-blur-2xl border-l border-white/20 shadow-elevated z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-off-black/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-off-black" />
                <h2 className="text-xl font-display font-semibold">Your Cart</h2>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-off-black/5 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <ShoppingBag className="h-16 w-16 text-off-black/10 mb-4" />
                  <p className="text-off-black/50 font-medium">Your cart is empty</p>
                  <p className="text-off-black/35 text-sm mt-1">Start adding pieces you love</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={`${item.productId}-${item.size}-${item.color}`}
                    className="flex gap-4 p-3 bg-white/40 rounded-2xl border border-white/20 shadow-soft"
                  >
                    <div className="relative w-20 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-semibold text-sm line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-off-black/50 mt-0.5">
                          {item.size} / {item.color}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        {/* Quantity controls */}
                        <div className="flex items-center bg-white/60 rounded-lg border border-white/40">
                          <button
                            onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                            className="p-1.5 hover:bg-white/80 rounded-l-lg transition"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                            className="p-1.5 hover:bg-white/80 rounded-r-lg transition"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(item.productId, item.size, item.color)}
                          className="text-rose-500 hover:text-rose-600 p-1 rounded-full hover:bg-rose-50 transition"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right flex flex-col justify-between">
                      <span className="font-bold text-sm">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Checkout info */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-off-black/10 bg-white/40 backdrop-blur-md space-y-4">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-off-black/50">Subtotal</span>
                  <span className="text-xl font-bold">{formatPrice(subtotal)}</span>
                </div>
                <p className="text-xs text-off-black/40 text-center">
                  Shipping & taxes calculated at checkout
                </p>

                <div className="w-full flex">
                  <MagneticButton strength={0.2} onClick={closeCart} className="w-full">
                    <Link
                      href="/checkout"
                      className="w-full btn-primary py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-off-black/90 transition text-base"
                    >
                      Proceed to Checkout
                    </Link>
                  </MagneticButton>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
