'use client';

import Link from 'next/link';
import { Heart, Globe, MessageSquareShare, Share2, Mail, ArrowRight } from 'lucide-react';
import { useState } from 'react';

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
    <footer className="bg-off-black text-white/80 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Newsletter Section */}
        <div className="py-16 border-b border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-display font-bold text-white mb-2">Stay in the loop</h3>
            <p className="text-white/50 text-sm max-w-md">
              Subscribe to our newsletter for exclusive drops, early access, and curated style inspiration.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-full px-5 py-3 text-sm outline-none focus:border-white/40 transition placeholder:text-white/30"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-white text-off-black p-2 rounded-full hover:bg-white/90 transition"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            {subscribed && (
              <span className="ml-3 text-emerald-400 text-sm self-center">Subscribed!</span>
            )}
          </form>
        </div>

        {/* Links Grid */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-2.5">
              <li><Link href="/products?category=women" className="text-sm hover:text-white transition">Women</Link></li>
              <li><Link href="/products?category=men" className="text-sm hover:text-white transition">Men</Link></li>
              <li><Link href="/products?category=accessories" className="text-sm hover:text-white transition">Accessories</Link></li>
              <li><Link href="/products" className="text-sm hover:text-white transition">All Products</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li><Link href="/about" className="text-sm hover:text-white transition">About Us</Link></li>
              <li><Link href="/about" className="text-sm hover:text-white transition">Careers</Link></li>
              <li><Link href="/about" className="text-sm hover:text-white transition">Press</Link></li>
              <li><Link href="/about" className="text-sm hover:text-white transition">Sustainability</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-2.5">
              <li><Link href="/about" className="text-sm hover:text-white transition">Contact</Link></li>
              <li><Link href="/about" className="text-sm hover:text-white transition">FAQs</Link></li>
              <li><Link href="/about" className="text-sm hover:text-white transition">Shipping</Link></li>
              <li><Link href="/about" className="text-sm hover:text-white transition">Returns</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Connect</h4>
            <div className="flex space-x-3 mb-6">
              <a href="#" className="p-2.5 bg-white/10 rounded-full hover:bg-white/20 transition" aria-label="Social">
                <Globe className="h-4 w-4" />
              </a>
              <a href="#" className="p-2.5 bg-white/10 rounded-full hover:bg-white/20 transition" aria-label="Share">
                <MessageSquareShare className="h-4 w-4" />
              </a>
              <a href="#" className="p-2.5 bg-white/10 rounded-full hover:bg-white/20 transition" aria-label="Connect">
                <Share2 className="h-4 w-4" />
              </a>
              <a href="#" className="p-2.5 bg-white/10 rounded-full hover:bg-white/20 transition" aria-label="Email">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-display font-bold text-white tracking-wider">LUXE</span>
            <Heart className="h-3 w-3 text-rose-400 fill-rose-400" />
          </div>
          <p className="text-xs text-white/40">© 2026 LUXE. All rights reserved. Crafted with love.</p>
        </div>
      </div>
    </footer>
  );
}
