import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '../context/CartContext.jsx';
import { nav, brand } from '../data.js';

function IconSearch(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}
function IconCart(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <circle cx="9" cy="21" r="1.4" />
      <circle cx="18" cy="21" r="1.4" />
      <path d="M2.5 3h2.2l2.4 12.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21.5 7H6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconMenu(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}
function IconClose(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur border-b border-line">
      <div className="container-px flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden -ml-1 p-2 text-ink"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <IconClose className="w-5 h-5" /> : <IconMenu className="w-5 h-5" />}
          </button>
          <Link to="/" className="font-display text-2xl tracking-tight text-ink">
            {brand.name}
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-ink/80">
          {nav.links.map((l) => (
            <a key={l} href="#" className="hover:text-ink transition-colors">
              {l}
            </a>
          ))}
        </nav>

        <div className="hidden sm:flex flex-1 max-w-md">
          <div className="flex w-full items-center rounded-full border border-line bg-cloud px-4 py-2.5 focus-within:border-ink/30 transition-colors">
            <IconSearch className="w-4 h-4 text-stone shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, brands and more"
              className="w-full bg-transparent px-3 text-sm outline-none placeholder:text-stone"
            />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="sm:hidden p-2 text-ink" aria-label="Search">
            <IconSearch className="w-5 h-5" />
          </button>
          <Link to="/cart" className="relative p-2 text-ink" aria-label="Cart">
            <IconCart className="w-5 h-5" />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                  className="absolute -top-0.5 -right-0.5 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-brass-500 px-1 text-[10px] font-semibold text-white"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-line bg-paper"
          >
            <div className="container-px py-4 flex flex-col gap-1">
              <div className="flex items-center rounded-full border border-line bg-cloud px-4 py-2.5 mb-2">
                <IconSearch className="w-4 h-4 text-stone shrink-0" />
                <input
                  placeholder="Search products"
                  className="w-full bg-transparent px-3 text-sm outline-none placeholder:text-stone"
                />
              </div>
              {nav.links.map((l) => (
                <a key={l} href="#" className="py-2.5 text-sm text-ink/80 border-b border-line/70 last:border-0">
                  {l}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
