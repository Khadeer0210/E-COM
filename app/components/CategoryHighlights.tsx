'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { categories } from '@/lib/data';
import { ArrowUpRight } from 'lucide-react';

export default function CategoryHighlights() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl sm:text-5xl font-display font-bold">Shop by Category</h2>
        <p className="mt-4 text-off-black/50 max-w-md mx-auto text-base">
          Explore our curated collections designed for every occasion and style.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="group relative block aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-soft card-hover"
          >
            <Link href={`/products?category=${cat.slug}`} className="absolute inset-0">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                sizes="(max-width:768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between">
                <div>
                  <h3 className="text-white text-3xl font-display font-bold">{cat.name}</h3>
                  <p className="text-white/70 text-sm mt-1.5 font-medium">Explore Collection</p>
                </div>
                <div className="p-3.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 group-hover:bg-white group-hover:text-off-black transition-all duration-300">
                  <ArrowUpRight className="h-5 w-5 text-white group-hover:text-off-black transition-colors" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
