'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useUserStore } from '@/store/userStore';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { LogOut, ShoppingBag, Heart, Package, Settings } from 'lucide-react';
import Link from 'next/link';

export default function AccountPage() {
  const router = useRouter();
  const user = useUserStore((s) => s.user);
  const logout = useUserStore((s) => s.logout);
  const cartCount = useCartStore((s) => s.totalItems());
  const wishlistCount = useWishlistStore((s) => s.items.length);

  useEffect(() => {
    if (!user) router.push('/account/login');
  }, [user, router]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">{user.name.charAt(0)}</span>
          </div>
          <h1 className="text-3xl font-display font-bold">{user.name}</h1>
          <p className="text-off-black/50 mt-1">{user.email}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {[
            { icon: ShoppingBag, label: 'Cart Items', value: cartCount, href: '#', onClick: () => {} },
            { icon: Heart, label: 'Wishlist', value: wishlistCount, href: '/wishlist' },
            { icon: Package, label: 'Orders', value: 0, href: '#' },
            { icon: Settings, label: 'Settings', value: null, href: '#' },
          ].map(item => (
            <Link key={item.label} href={item.href}
              className="bg-white/50 backdrop-blur-sm rounded-2xl p-5 shadow-soft hover:shadow-elevated transition flex items-center gap-4">
              <div className="p-3 bg-off-black/5 rounded-xl">
                <item.icon className="h-5 w-5 text-off-black/60" />
              </div>
              <div>
                <p className="font-medium text-sm">{item.label}</p>
                {item.value !== null && <p className="text-xs text-off-black/50">{item.value} items</p>}
              </div>
            </Link>
          ))}
        </div>

        <button onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-white/50 backdrop-blur-sm text-off-black py-3.5 rounded-full font-medium hover:bg-rose-50 hover:text-rose-600 transition border border-off-black/10">
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </motion.div>
    </div>
  );
}
