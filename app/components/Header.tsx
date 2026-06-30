'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Heart, User, Menu, X, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useUIStore } from '@/store/uiStore';
import { searchProducts } from '@/lib/api';
import { Product } from '@/lib/data';
import { useDebounce } from '@/lib/helpers';
import Image from 'next/image';

const navLinks = [
  {
    label: 'Shop',
    children: [
      { label: 'Women',       href: '/products?category=women' },
      { label: 'Men',         href: '/products?category=men' },
      { label: 'Accessories', href: '/products?category=accessories' },
      { label: 'All Products',href: '/products' },
    ],
  },
  { label: 'All Products', href: '/products' },
  { label: 'About',        href: '/about' },
];

export default function Header() {
  const [scrolled,      setScrolled]     = useState(false);
  const [menuOpen,      setMenuOpen]     = useState(false);
  const [searchOpen,    setSearchOpen]   = useState(false);
  const [searchQuery,   setSearchQuery]  = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [shopOpen,      setShopOpen]     = useState(false);

  const cartCount  = useCartStore((s) => s.totalItems());
  const wishCount  = useWishlistStore((s) => s.items.length);
  const openCart   = useUIStore((s) => s.openCart);

  const debouncedQuery = useDebounce(searchQuery, 320);

  // Scroll detection
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Search
  useEffect(() => {
    if (!debouncedQuery.trim()) { setSearchResults([]); return; }
    searchProducts(debouncedQuery).then((r) => setSearchResults(r.slice(0, 5)));
  }, [debouncedQuery]);

  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setShopOpen(false);
  }, []);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const Badge = ({ n }: { n: number }) => {
    if (!mounted) return null;
    return n > 0 ? (
      <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-bold w-4.5 h-4.5 flex items-center justify-center rounded-full leading-none">
        {n > 9 ? '9+' : n}
      </span>
    ) : null;
  };

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? 'glass border-b border-white/20 shadow-glass'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[70px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-display font-bold text-2xl tracking-tight hover:opacity-80 transition-opacity" onClick={closeAll}>
            LUXE
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="relative group">
                  <button
                    className="flex items-center gap-1 text-sm font-medium text-off-black/70 hover:text-off-black transition-colors"
                    onClick={() => setShopOpen((o) => !o)}
                  >
                    {link.label}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${shopOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {shopOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.97 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-full left-0 mt-2 w-44 glass rounded-2xl shadow-elevated py-2"
                      >
                        {link.children.map((c) => (
                          <Link key={c.href} href={c.href} onClick={closeAll}
                            className="block px-4 py-2.5 text-sm text-off-black/70 hover:text-off-black hover:bg-white/30 transition">
                            {c.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={link.label} href={link.href!} onClick={closeAll}
                  className="text-sm font-medium text-off-black/70 hover:text-off-black transition-colors">
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Icon actions */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <button
              onClick={() => { setSearchOpen((o) => !o); setMenuOpen(false); }}
              className="relative p-2.5 rounded-xl hover:bg-white/30 transition-colors"
            >
              <Search className="h-5 w-5 text-off-black/70" />
            </button>

            {/* Wishlist */}
            <Link href="/wishlist" className="relative p-2.5 rounded-xl hover:bg-white/30 transition-colors hidden sm:block">
              <Heart className="h-5 w-5 text-off-black/70" />
              <Badge n={wishCount} />
            </Link>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-xl hover:bg-white/30 transition-colors"
            >
              <ShoppingBag className="h-5 w-5 text-off-black/70" />
              <Badge n={cartCount} />
            </button>

            {/* Account */}
            <Link href="/account" className="relative p-2.5 rounded-xl hover:bg-white/30 transition-colors hidden sm:block">
              <User className="h-5 w-5 text-off-black/70" />
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden p-2.5 rounded-xl hover:bg-white/30 transition-colors ml-1"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={menuOpen ? 'x' : 'menu'} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                  {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-white/20 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products…"
                  className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-off-black/30 transition placeholder:text-off-black/40"
                />
                {searchResults.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-2 glass rounded-2xl overflow-hidden shadow-elevated">
                    {searchResults.map((p) => (
                      <Link key={p.id} href={`/products/${p.id}`} onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-white/30 transition">
                        <div className="relative w-10 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="40px" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{p.name}</p>
                          <p className="text-xs text-off-black/50">${p.price}</p>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden border-t border-white/20 overflow-hidden glass"
            >
              <nav className="flex flex-col py-4 px-4">
                {[
                  { label: 'Women',       href: '/products?category=women' },
                  { label: 'Men',         href: '/products?category=men' },
                  { label: 'Accessories', href: '/products?category=accessories' },
                  { label: 'All Products',href: '/products' },
                  { label: 'About',       href: '/about' },
                  { label: 'Wishlist',    href: '/wishlist' },
                  { label: 'Account',     href: '/account' },
                ].map((l) => (
                  <Link key={l.href} href={l.href} onClick={closeAll}
                    className="py-3 text-sm font-medium text-off-black/80 hover:text-off-black border-b border-white/15 last:border-0 transition-colors">
                    {l.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Click-away overlay */}
      {(menuOpen || searchOpen || shopOpen) && (
        <div className="fixed inset-0 z-40" onClick={closeAll} />
      )}
    </>
  );
}
