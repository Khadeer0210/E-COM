'use client';

import { brandNames } from '@/lib/data';

export default function BrandMarquee() {
  return (
    <section className="py-16 overflow-hidden border-t border-off-black/5">
      <p className="text-center text-xs uppercase tracking-[0.3em] text-off-black/30 mb-8 font-medium">Trusted by the world&apos;s finest</p>
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...brandNames, ...brandNames].map((brand, i) => (
            <span key={i} className="mx-12 text-2xl sm:text-3xl font-display font-bold text-off-black/10 hover:text-off-black/30 transition-colors duration-300 cursor-default select-none">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
