'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/lib/data';

export default function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl sm:text-5xl font-display font-bold">What Our Clients Say</h2>
        <p className="mt-4 text-off-black/50 text-base">Real experiences from our valued community.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-3xl p-8 shadow-soft card-hover hover:border-white/40 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <Quote className="h-10 w-10 text-rose-300 mb-6 opacity-80" />
              <p className="text-off-black/70 text-sm leading-relaxed mb-6 font-medium">
                &ldquo;{t.text}&rdquo;
              </p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-off-black/5">
              <p className="font-bold text-sm text-off-black/80">{t.name}</p>
              <div className="flex text-amber-400 gap-0.5">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
