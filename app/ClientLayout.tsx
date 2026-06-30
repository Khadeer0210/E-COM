'use client';

import { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import CartDrawer from '@/app/components/CartDrawer';
import ToastNotification from '@/app/components/ToastNotification';
import { useUIStore } from '@/store/uiStore';
import { usePathname } from 'next/navigation';

// Dynamically import cursor so it never SSRs
const RainbowCursor = dynamic(() => import('@/app/components/RainbowCursor'), { ssr: false });

const PAGE_GRADIENTS: Record<string, string> = {
  '/':          'linear-gradient(145deg, #fafafa 0%, #f4f4f6 50%, #eaeaea 100%)',
  '/products':  'linear-gradient(145deg, #f8f9fa 0%, #f1f3f5 50%, #e9ecef 100%)',
  '/cart':      'linear-gradient(145deg, #fafafa 0%, #f3f3f3 50%, #e8e8e8 100%)',
  '/checkout':  'linear-gradient(145deg, #fafafa 0%, #f4f4f7 50%, #e5e7eb 100%)',
  '/about':     'linear-gradient(145deg, #fafafa 0%, #f5f6f8 50%, #e9ebef 100%)',
  '/wishlist':  'linear-gradient(145deg, #fafafa 0%, #f2f4f7 50%, #e5e8eb 100%)',
  '/account':   'linear-gradient(145deg, #fafafa 0%, #f4f4f5 50%, #e4e4e7 100%)',
};

const pageVariants = {
  initial: { opacity: 0, y: 18, scale: 0.985 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] as any } },
  exit:    { opacity: 0, y: -12, scale: 0.99, transition: { duration: 0.22, ease: [0.4, 0, 1, 1] as any } },
};

export default function ClientLayout({ children }: { children: ReactNode }) {
  const bgGradient = useUIStore((s) => s.bgGradient);
  const pathname = usePathname();

  useEffect(() => {
    // Match longest prefix
    const match = Object.keys(PAGE_GRADIENTS)
      .filter(k => pathname.startsWith(k))
      .sort((a, b) => b.length - a.length)[0];
    useUIStore.getState().setBgGradient(PAGE_GRADIENTS[match] || PAGE_GRADIENTS['/']);
  }, [pathname]);

  return (
    <>
      {/* Full-page background that smoothly cross-fades between pages */}
      <motion.div
        key={bgGradient}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
        className="fixed inset-0 -z-10 gpu"
        style={{ background: bgGradient }}
      />

      {/* Rainbow oil-spill cursor */}
      <RainbowCursor />

      <div className="min-h-screen">
        <Header />
        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            key={pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="pt-20 gpu"
          >
            {children}
          </motion.main>
        </AnimatePresence>
        <Footer />
        <CartDrawer />
        <ToastNotification />
      </div>
    </>
  );
}
