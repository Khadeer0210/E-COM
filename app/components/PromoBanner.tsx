'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function PromoBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
        className="relative overflow-hidden rounded-4xl bg-gradient-to-r from-off-black via-gray-900 to-off-black p-12 sm:p-16 text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-lg">
          <span className="text-rose-400 text-sm font-semibold uppercase tracking-wider">Limited Time Offer</span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold mt-4 leading-tight">
            Up to 40% Off
            <br />Summer Essentials
          </h2>
          <p className="mt-4 text-white/60 leading-relaxed">
            Elevate your summer wardrobe with our exclusive collection. Use code <span className="text-white font-semibold">LUXE40</span> at checkout.
          </p>
          <Link href="/products"
            className="mt-8 inline-flex items-center gap-2 bg-white text-off-black px-8 py-4 rounded-full font-medium hover:bg-white/90 transition group">
            Shop the Sale
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
