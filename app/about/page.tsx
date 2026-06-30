'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, Leaf, Globe, Heart } from 'lucide-react';

const values = [
  { icon: Award, title: 'Uncompromising Quality', desc: 'Every piece is crafted from the finest materials, sourced from renowned mills and ateliers across the globe.' },
  { icon: Leaf, title: 'Sustainable Luxury', desc: 'We believe luxury and sustainability go hand in hand. Our supply chain is transparent and eco-conscious.' },
  { icon: Globe, title: 'Global Artisanship', desc: 'From Italian leather to Japanese silk, we partner with the world\'s most skilled artisans.' },
  { icon: Heart, title: 'Made with Love', desc: 'Each collection is designed with passion and an unwavering attention to every single detail.' },
];

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-20">
        <span className="text-sm uppercase tracking-[0.3em] text-off-black/40 font-medium">Our Story</span>
        <h1 className="text-4xl sm:text-6xl font-display font-bold mt-4 leading-tight">
          Crafting Elegance<br />Since 2020
        </h1>
        <p className="mt-6 text-off-black/60 text-lg leading-relaxed">
          LUXE was born from a simple belief: that exceptional fashion should be accessible, sustainable, and timeless.
          We curate the finest pieces from emerging and established designers worldwide.
        </p>
      </motion.div>

      {/* Image Section */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
        className="relative aspect-[21/9] rounded-4xl overflow-hidden mb-20">
        <Image src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1400" alt="LUXE Atelier"
          fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </motion.div>

      {/* Values */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {values.map((v, i) => (
          <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 shadow-soft text-center">
            <div className="w-14 h-14 bg-gradient-to-br from-rose-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <v.icon className="h-6 w-6 text-rose-500" />
            </div>
            <h3 className="font-display font-semibold mb-2">{v.title}</h3>
            <p className="text-sm text-off-black/60 leading-relaxed">{v.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="text-center bg-gradient-to-r from-off-black via-gray-900 to-off-black rounded-4xl p-12 sm:p-20 text-white">
        <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Join the LUXE Family</h2>
        <p className="text-white/60 max-w-lg mx-auto mb-8">Experience fashion that tells a story. Every piece, every stitch, every detail — crafted for you.</p>
        <a href="/products" className="inline-flex bg-white text-off-black px-10 py-4 rounded-full font-medium hover:bg-white/90 transition">
          Explore Collections
        </a>
      </motion.div>
    </div>
  );
}
