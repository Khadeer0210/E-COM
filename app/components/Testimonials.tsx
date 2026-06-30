'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/lib/data';

export default function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-display font-bold">What Our Clients Say</h2>
        <p className="mt-3 text-off-black/50">Real experiences from our valued community.</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((t, i) => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="bg-white/50 backdrop-blur-sm rounded-3xl p-6 shadow-soft hover:shadow-elevated transition-shadow duration-500">
            <Quote className="h-8 w-8 text-rose-300 mb-4" />
            <p className="text-off-black/70 text-sm leading-relaxed mb-4">{t.text}</p>
            <div className="flex items-center justify-between">
              <p className="font-semibold text-sm">{t.name}</p>
              <div className="flex text-amber-400">
                {[...Array(t.rating)].map((_, j) => <Star key={j} className="h-3.5 w-3.5 fill-current" />)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
