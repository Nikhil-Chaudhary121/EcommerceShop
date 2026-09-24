import { useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard.jsx';
import { consolePlatforms, getConsoleProductsByPlatform } from '../data.js';

export default function ConsoleShelf() {
  const [platform, setPlatform] = useState('All');
  const list = getConsoleProductsByPlatform(platform);

  return (
    <section id="consoles" className="container-px py-10 scroll-mt-32">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
        <div>
          <h2 className="section-heading">Consoles & games</h2>
          <p className="text-sm text-stone mt-1">Sony, Nintendo and Xbox hardware, controllers and discs.</p>
        </div>
        <div className="flex gap-2 overflow-x-auto rail -mx-1 px-1">
          {consolePlatforms.map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium border transition-colors ${
                platform === p
                  ? 'bg-ink text-paper border-ink'
                  : 'bg-white text-ink/70 border-line hover:border-ink/40'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        key={platform}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
      >
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </motion.div>
    </section>
  );
}
