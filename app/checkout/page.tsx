'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema, CheckoutFormData } from '@/lib/validation';
import { useCartStore } from '@/store/cartStore';
import { formatPrice, generateOrderNumber } from '@/lib/helpers';
import { Truck, Zap, Plane, CheckCircle, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const shippingMethods = [
  { id: 'standard' as const, name: 'Standard', time: '5-7 days', price: 0, icon: Truck },
  { id: 'express' as const, name: 'Express', time: '2-3 days', price: 15, icon: Zap },
  { id: 'overnight' as const, name: 'Overnight', time: 'Next day', price: 35, icon: Plane },
];

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const { register, handleSubmit, watch, formState: { errors } } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { shippingMethod: 'standard' },
  });

  const selectedShipping = watch('shippingMethod');
  const shippingCost = shippingMethods.find(m => m.id === selectedShipping)?.price || 0;
  const total = subtotal + shippingCost;

  const onSubmit = () => {
    const num = generateOrderNumber();
    setOrderNumber(num);
    setOrderComplete(true);
    clearCart();
  };

  if (orderComplete) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 15 }}>
          <CheckCircle className="h-20 w-20 text-emerald-500 mx-auto mb-6" />
        </motion.div>
        <h1 className="text-3xl font-display font-bold mb-3">Order Confirmed!</h1>
        <p className="text-off-black/60 mb-2">Your order number is</p>
        <p className="text-xl font-mono font-bold mb-8">{orderNumber}</p>
        <Link href="/products" className="inline-flex items-center gap-2 bg-off-black text-white px-8 py-4 rounded-full font-medium hover:bg-off-black/90 transition">
          <ShoppingBag className="h-4 w-4" /> Continue Shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-display font-bold mb-4">Your cart is empty</h1>
        <Link href="/products" className="text-sm underline underline-offset-4">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-display font-bold mb-10">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-3 space-y-8">
          {/* Contact */}
          <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-6 shadow-soft space-y-4">
            <h2 className="text-lg font-display font-semibold">Contact</h2>
            <div>
              <input {...register('email')} placeholder="Email" className="w-full bg-white/70 border border-off-black/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-off-black/30 transition" />
              {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-6 shadow-soft space-y-4">
            <h2 className="text-lg font-display font-semibold">Shipping Address</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input {...register('firstName')} placeholder="First Name" className="w-full bg-white/70 border border-off-black/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-off-black/30 transition" />
                {errors.firstName && <p className="text-rose-500 text-xs mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <input {...register('lastName')} placeholder="Last Name" className="w-full bg-white/70 border border-off-black/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-off-black/30 transition" />
                {errors.lastName && <p className="text-rose-500 text-xs mt-1">{errors.lastName.message}</p>}
              </div>
            </div>
            <div>
              <input {...register('address')} placeholder="Address" className="w-full bg-white/70 border border-off-black/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-off-black/30 transition" />
              {errors.address && <p className="text-rose-500 text-xs mt-1">{errors.address.message}</p>}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <input {...register('city')} placeholder="City" className="w-full bg-white/70 border border-off-black/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-off-black/30 transition" />
                {errors.city && <p className="text-rose-500 text-xs mt-1">{errors.city.message}</p>}
              </div>
              <div>
                <input {...register('state')} placeholder="State" className="w-full bg-white/70 border border-off-black/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-off-black/30 transition" />
                {errors.state && <p className="text-rose-500 text-xs mt-1">{errors.state.message}</p>}
              </div>
              <div>
                <input {...register('zip')} placeholder="ZIP" className="w-full bg-white/70 border border-off-black/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-off-black/30 transition" />
                {errors.zip && <p className="text-rose-500 text-xs mt-1">{errors.zip.message}</p>}
              </div>
            </div>
            <div>
              <input {...register('country')} placeholder="Country" defaultValue="United States" className="w-full bg-white/70 border border-off-black/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-off-black/30 transition" />
              {errors.country && <p className="text-rose-500 text-xs mt-1">{errors.country.message}</p>}
            </div>
          </div>

          {/* Shipping Method */}
          <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-6 shadow-soft space-y-4">
            <h2 className="text-lg font-display font-semibold">Shipping Method</h2>
            <div className="space-y-3">
              {shippingMethods.map(m => (
                <label key={m.id} className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition border ${
                  selectedShipping === m.id ? 'border-off-black bg-white/70' : 'border-transparent bg-white/30 hover:bg-white/50'
                }`}>
                  <input {...register('shippingMethod')} type="radio" value={m.id} className="sr-only" />
                  <m.icon className="h-5 w-5 text-off-black/50" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{m.name}</p>
                    <p className="text-xs text-off-black/50">{m.time}</p>
                  </div>
                  <span className="font-semibold text-sm">{m.price === 0 ? 'Free' : `$${m.price}`}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full bg-off-black text-white py-4 rounded-full font-medium hover:bg-off-black/90 transition text-lg">
            Place Order — {formatPrice(total)}
          </button>
        </form>

        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-6 shadow-soft sticky top-24 space-y-6">
            <h2 className="text-lg font-display font-semibold">Order Summary</h2>
            <div className="space-y-4">
              {items.map(item => (
                <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4">
                  <div className="relative w-16 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                    <span className="absolute -top-1 -right-1 bg-off-black text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">{item.quantity}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.name}</p>
                    <p className="text-xs text-off-black/50">{item.size} / {item.color}</p>
                  </div>
                  <p className="font-semibold text-sm">${item.price * item.quantity}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-off-black/10 pt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-off-black/60">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-off-black/60">Shipping</span><span>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span></div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-off-black/10"><span>Total</span><span>{formatPrice(total)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
