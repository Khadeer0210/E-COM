'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import MagneticButton from './MagneticButton';
import { ArrowRight, Sparkles } from 'lucide-react';

const stats = [
  { value: '250+', label: 'Products' },
  { value: '15K+', label: 'Happy Clients' },
  { value: '45+',  label: 'Countries' },
];

const container: any = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item: any = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden px-4 sm:px-6">

      {/* Decorative floating orbs */}
      {[
        { size: 520, top: '-10%', right: '-5%',  from: 'rgba(168,85,247,0.12)', to: 'rgba(236,72,153,0.08)', delay: 0 },
        { size: 380, bottom: '5%', left: '-8%',  from: 'rgba(59,130,246,0.10)', to: 'rgba(16,185,129,0.07)', delay: 1.5 },
        { size: 260, top: '40%',  right: '12%',  from: 'rgba(251,191,36,0.10)', to: 'rgba(239,68,68,0.07)',  delay: 3 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none gpu"
          style={{
            width: orb.size, height: orb.size,
            top: orb.top, bottom: orb.bottom, left: orb.left, right: orb.right,
            background: `radial-gradient(circle, ${orb.from}, ${orb.to}, transparent 70%)`,
            filter: 'blur(60px)',
          }}
          animate={{ y: [0, -20, 0], scale: [1, 1.06, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: orb.delay }}
        />
      ))}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto w-full z-10"
      >
        {/* Badge */}
        <motion.div variants={item}>
          <span className="inline-flex items-center gap-2 btn-glass text-sm font-medium px-4 py-2 rounded-full mb-8 text-off-black/70">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            New Summer Collection 2026
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={item} className="text-6xl sm:text-7xl lg:text-8xl font-display font-bold leading-none mb-6 max-w-4xl">
          Redefine
          <br />
          <span className="shimmer-text">Your Style</span>
        </motion.h1>

        {/* Subline */}
        <motion.p variants={item} className="text-lg sm:text-xl text-off-black/55 max-w-xl leading-relaxed mb-10">
          Curated luxury fashion for the modern connoisseur.
          Discover pieces that transcend trends and define elegance.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="flex flex-wrap gap-4">
          <MagneticButton href="/products" strength={0.4}
            className="btn-primary inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-base group">
            Shop Collection
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </MagneticButton>
          <MagneticButton href="/about" strength={0.35}
            className="btn-glass inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-base text-off-black/80">
            Our Story
          </MagneticButton>
        </motion.div>

        {/* Stats */}
        <motion.div variants={item} className="mt-16 flex gap-10 sm:gap-16">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-display font-bold">{s.value}</p>
              <p className="text-sm text-off-black/45 mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
