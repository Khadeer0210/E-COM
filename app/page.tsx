'use client';

import Hero from '@/app/components/Hero';
import CategoryHighlights from '@/app/components/CategoryHighlights';
import FeaturedProducts from '@/app/components/FeaturedProducts';
import PromoBanner from '@/app/components/PromoBanner';
import Testimonials from '@/app/components/Testimonials';
import BrandMarquee from '@/app/components/BrandMarquee';

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryHighlights />
      <FeaturedProducts />
      <PromoBanner />
      <Testimonials />
      <BrandMarquee />
    </>
  );
}
