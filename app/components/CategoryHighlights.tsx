'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { categories } from '@/lib/data';
import { ArrowUpRight } from 'lucide-react';

export default function CategoryHighlights() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-display font-bold">Shop by Category</h2>
        <p className="mt-3 text-off-black/50 max-w-md mx-auto">Explore our curated collections designed for every occasion and every style.</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <motion.div key={cat.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
            <Link href={`/products?category=${cat.slug}`}
              className="group relative block aspect-[4/5] rounded-3xl overflow-hidden">
              <Image src={cat.image} alt={cat.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width:768px) 100vw,33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between">
                <div>
                  <h3 className="text-white text-2xl font-display font-bold">{cat.name}</h3>
                  <p className="text-white/70 text-sm mt-1">Explore Collection</p>
                </div>
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full group-hover:bg-white/40 transition">
                  <ArrowUpRight className="h-5 w-5 text-white" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
