'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function PromoBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-off-black via-gray-900 to-off-black p-12 sm:p-20 text-white shadow-elevated"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-xl">
          <span className="inline-flex btn-glass text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full text-rose-300">
            Limited Time Offer
          </span>
          <h2 className="text-4xl sm:text-6xl font-display font-bold mt-6 leading-tight">
            Up to 40% Off
            <br />
            <span className="shimmer-text">Summer Essentials</span>
          </h2>
          <p className="mt-6 text-white/60 leading-relaxed text-base">
            Elevate your summer wardrobe with our exclusive collection. Use code <span className="text-white font-semibold">LUXE40</span> at checkout.
          </p>

          <div className="mt-10">
            <MagneticButton strength={0.3} href="/products" className="inline-block">
              <span className="btn-glass text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:bg-white hover:text-off-black transition-colors duration-300">
                Shop the Sale
                <ArrowRight className="h-4 w-4" />
              </span>
            </MagneticButton>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
