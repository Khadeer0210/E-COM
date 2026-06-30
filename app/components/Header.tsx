'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Heart, User, Menu, X, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useUIStore } from '@/store/uiStore';
import { useUserStore } from '@/store/userStore';
import { searchProducts } from '@/lib/api';
import { Product } from '@/lib/data';
import Image from 'next/image';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItemsCount = useCartStore((s) => s.totalItems());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const openCart = useUIStore((s) => s.openCart);
  const user = useUserStore((s) => s.user);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.length > 1) {
        const results = await searchProducts(searchQuery);
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'glass shadow-soft py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <motion.span
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            className="text-3xl font-display font-bold text-off-black tracking-wider"
          >
            LUXE
          </motion.span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <div className="relative group">
            <button className="flex items-center text-sm font-medium text-off-black/80 hover:text-off-black transition-colors">
              Shop <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-44 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 glass rounded-2xl p-2 shadow-elevated">
              <Link href="/products?category=women" className="block px-4 py-2.5 rounded-lg hover:bg-white/30 transition text-sm font-medium">
                Women
              </Link>
              <Link href="/products?category=men" className="block px-4 py-2.5 rounded-lg hover:bg-white/30 transition text-sm font-medium">
                Men
              </Link>
              <Link href="/products?category=accessories" className="block px-4 py-2.5 rounded-lg hover:bg-white/30 transition text-sm font-medium">
                Accessories
              </Link>
            </div>
          </div>
          <Link href="/products" className="text-sm font-medium text-off-black/80 hover:text-off-black transition-colors">
            All Products
          </Link>
          <Link href="/about" className="text-sm font-medium text-off-black/80 hover:text-off-black transition-colors">
            About
          </Link>
        </nav>

        {/* Right section */}
        <div className="flex items-center space-x-3">
          {/* Search */}
          <div ref={searchRef} className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full hover:bg-black/5 transition"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -5 }}
                  className="absolute right-0 top-12 w-72 sm:w-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-elevated p-4"
                >
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-b border-off-black/20 py-2 text-sm outline-none placeholder:text-off-black/40"
                    autoFocus
                  />
                  {searchResults.length > 0 && (
                    <div className="mt-3 max-h-60 overflow-auto space-y-1">
                      {searchResults.map(product => (
                        <Link
                          key={product.id}
                          href={`/products/${product.id}`}
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center space-x-3 p-2 rounded-xl hover:bg-black/5 transition"
                        >
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                            <Image src={product.images[0]} fill alt={product.name} className="object-cover" sizes="40px" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">{product.name}</p>
                            <p className="text-xs text-off-black/60">${product.price}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                  {searchQuery.length > 1 && searchResults.length === 0 && (
                    <p className="mt-3 text-sm text-off-black/50 text-center">No results found</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Wishlist */}
          <Link href="/wishlist" className="relative p-2 rounded-full hover:bg-black/5 transition" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-semibold"
              >
                {wishlistCount}
              </motion.span>
            )}
          </Link>

          {/* Cart */}
          <button onClick={openCart} className="relative p-2 rounded-full hover:bg-black/5 transition" aria-label="Shopping cart">
            <ShoppingBag className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <motion.span
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-off-black text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-semibold"
              >
                {cartItemsCount}
              </motion.span>
            )}
          </button>

          {/* User */}
          <Link href={user ? "/account" : "/account/login"} className="p-2 rounded-full hover:bg-black/5 transition" aria-label="Account">
            <User className="h-5 w-5" />
          </Link>

          {/* Mobile menu toggle */}
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-white/20"
          >
            <div className="px-6 py-4 space-y-3">
              <Link href="/products?category=women" onClick={() => setMobileMenuOpen(false)} className="block text-lg font-medium py-1">Women</Link>
              <Link href="/products?category=men" onClick={() => setMobileMenuOpen(false)} className="block text-lg font-medium py-1">Men</Link>
              <Link href="/products?category=accessories" onClick={() => setMobileMenuOpen(false)} className="block text-lg font-medium py-1">Accessories</Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block text-lg font-medium py-1">About</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
