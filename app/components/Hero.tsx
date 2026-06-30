'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-rose-200/30 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
            <Sparkles className="h-4 w-4 text-rose-500" />
            <span className="text-sm font-medium text-off-black/70">New Summer Collection 2026</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-display font-bold text-off-black leading-[0.95] tracking-tight">
            Redefine
            <br />
            <span className="bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Your Style
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-off-black/60 max-w-lg leading-relaxed">
            Curated luxury fashion for the modern connoisseur. Discover pieces that transcend trends and define elegance.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4">
            <Link href="/products"
              className="group inline-flex items-center gap-2 bg-off-black text-white px-8 py-4 rounded-full font-medium hover:bg-off-black/90 transition-all hover:gap-3">
              Shop Collection
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/about"
              className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm text-off-black px-8 py-4 rounded-full font-medium hover:bg-white/70 transition border border-off-black/10">
              Our Story
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="mt-16 flex gap-12">
            {[{ label: 'Products', value: '250+' }, { label: 'Happy Clients', value: '15K+' }, { label: 'Countries', value: '45+' }].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl sm:text-3xl font-bold font-display">{stat.value}</p>
                <p className="text-sm text-off-black/50 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
