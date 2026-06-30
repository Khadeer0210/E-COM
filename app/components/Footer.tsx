'use client';

import Link from 'next/link';
import { Heart, Globe, MessageSquareShare, Share2, Mail, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import MagneticButton from './MagneticButton';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-off-black text-white/70 mt-32 relative overflow-hidden">
      {/* Subtle bottom gradients */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-rose-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Newsletter Section */}
        <div className="py-20 border-b border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h3 className="text-3xl font-display font-bold text-white mb-2">Stay in the loop</h3>
            <p className="text-white/40 text-sm max-w-md">
              Subscribe to our newsletter for exclusive drops, early access, and style inspiration.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto items-center">
            <div className="relative flex-1 md:w-80">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-sm outline-none focus:border-white/30 transition placeholder:text-white/20"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-off-black p-2.5 rounded-full hover:bg-white/95 transition duration-300"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            {subscribed && (
              <span className="ml-4 text-emerald-400 text-sm font-semibold">Subscribed!</span>
            )}
          </form>
        </div>

        {/* Links Grid */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/products?category=women" className="hover:text-white transition">Women</Link></li>
              <li><Link href="/products?category=men" className="hover:text-white transition">Men</Link></li>
              <li><Link href="/products?category=accessories" className="hover:text-white transition">Accessories</Link></li>
              <li><Link href="/products" className="hover:text-white transition">All Products</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/about" className="hover:text-white transition">Careers</Link></li>
              <li><Link href="/about" className="hover:text-white transition">Press</Link></li>
              <li><Link href="/about" className="hover:text-white transition">Sustainability</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Support</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-white transition">Contact</Link></li>
              <li><Link href="/about" className="hover:text-white transition">FAQs</Link></li>
              <li><Link href="/about" className="hover:text-white transition">Shipping</Link></li>
              <li><Link href="/about" className="hover:text-white transition">Returns</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Connect</h4>
            <div className="flex space-x-3 mb-6">
              {[
                { icon: Globe, label: 'Social' },
                { icon: MessageSquareShare, label: 'Share' },
                { icon: Share2, label: 'Connect' },
                { icon: Mail, label: 'Email' }
              ].map((item, idx) => (
                <MagneticButton key={idx} strength={0.3} className="inline-block">
                  <span className="p-3 bg-white/5 rounded-full hover:bg-white/15 transition border border-white/5 flex items-center justify-center">
                    <item.icon className="h-4.5 w-4.5 text-white/80" />
                  </span>
                </MagneticButton>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-display font-bold text-white tracking-widest">LUXE</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
          </div>
          <p className="text-xs text-white/40">© 2026 LUXE. All rights reserved. Crafted with love.</p>
        </div>
      </div>
    </footer>
  );
}
