import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import StarRating from './StarRating.jsx';
import { currency, estimateEmi } from '../data.js';

const badgeStyles = {
  New: 'bg-pine-600 text-paper',
  Deal: 'bg-brass-500 text-white',
  'Pre Order': 'bg-ink text-paper',
  'Pre Owned': 'bg-cloud text-ink border border-line',
};

export default function ProductCard({ product, className = '' }) {
  const { id, name, img, price, compareAt, rating, reviews, tag } = product;
  const badgeClass = badgeStyles[tag] || 'bg-ink text-paper';

  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.18 }} className={`h-full ${className}`}>
      <Link
        to={`/product/${id}`}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white transition-shadow hover:shadow-card"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-cloud">
          {tag && (
            <span className={`absolute left-2.5 top-2.5 z-10 rounded-md px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${badgeClass}`}>
              {tag}
            </span>
          )}
          <img
            src={img}
            alt={name}
            loading="lazy"
            className=" w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex flex-1 flex-col gap-1.5 p-3.5">
          <p className="text-sm text-ink leading-snug line-clamp-2">{name}</p>
          <StarRating rating={rating} reviews={reviews} />
          <div className="mt-auto pt-1.5">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-semibold text-ink">
                {currency}
                {price.toFixed(2)}
              </span>
              {compareAt && (
                <span className="text-xs text-stone line-through">
                  {currency}
                  {compareAt.toFixed(2)}
                </span>
              )}
            </div>
            <p className="text-[11px] text-stone mt-0.5">
              or {currency}
              {estimateEmi(price)}/mo
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
