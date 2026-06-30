'use client';

import { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import CartDrawer from '@/app/components/CartDrawer';
import ToastNotification from '@/app/components/ToastNotification';
import { useUIStore } from '@/store/uiStore';
import { usePathname } from 'next/navigation';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const bgGradient = useUIStore((s) => s.bgGradient);
  const pathname = usePathname();

  useEffect(() => {
    const gradients: Record<string, string> = {
      '/': 'linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)',
      '/products': 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      '/cart': 'linear-gradient(135deg, #fff1eb 0%, #ace0f9 100%)',
      '/checkout': 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
      '/about': 'linear-gradient(135deg, #fdfcfb 0%, #e8d5e0 100%)',
    };
    const newBg = gradients[pathname] || 'linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)';
    useUIStore.getState().setBgGradient(newBg);
  }, [pathname]);

  return (
    <div style={{ background: bgGradient }} className="min-h-screen transition-all duration-1000">
      <Header />
      <AnimatePresence mode="wait">
        <motion.main key={pathname} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="pt-20">
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <CartDrawer />
      <ToastNotification />
    </div>
  );
}
