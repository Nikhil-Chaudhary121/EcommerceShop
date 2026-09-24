import { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import StarRating from '../components/StarRating.jsx';
import ProductRail from '../components/ProductRail.jsx';
import { useCart } from '../context/CartContext.jsx';
import { getProductById, allProducts, currency } from '../data.js';

function IconCheck(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconMinus(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M5 12h14" strokeLinecap="round" />
    </svg>
  );
}
function IconPlus(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const { addItem } = useCart();

  const [activeImage, setActiveImage] = useState(0);
  const [color, setColor] = useState(0);
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const galleryRef = useRef(null);

  useEffect(() => {
    setActiveImage(0);
    setColor(0);
    setQty(1);
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!product) return;
    const ctx = gsap.context(() => {
      gsap.from('.pdp-fade', {
        opacity: 0,
        y: 14,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
      });
    }, galleryRef);
    return () => ctx.revert();
  }, [product]);

  if (!product) {
    return (
      <div className="container-px py-24 text-center">
        <p className="font-display text-2xl mb-3">We couldn't find that product</p>
        <Link to="/" className="text-pine-600 underline">Back to home</Link>
      </div>
    );
  }

  const sameCategory = allProducts.filter((p) => p.category === product.category && p.id !== product.id);
  const backfill = allProducts.filter((p) => p.category !== product.category && p.id !== product.id);
  const related = [...sameCategory, ...backfill].slice(0, 8);

  const handleAdd = () => {
    addItem(product, qty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div ref={galleryRef}>
      <div className="container-px py-6 text-xs text-stone flex items-center gap-1.5 pdp-fade">
        <Link to="/" className="hover:text-ink">Home</Link>
        <span>/</span>
        <span className="capitalize">{product.category}</span>
        <span>/</span>
        <span className="text-ink truncate max-w-[160px] sm:max-w-none">{product.name}</span>
      </div>

      <div className="container-px grid lg:grid-cols-2 gap-10 pb-14">
        {/* Gallery */}
        <div className="pdp-fade">
          <div className="rounded-xl2 bg-cloud border border-line overflow-hidden aspect-square">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={product.img}
                alt={product.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="h-full w-full object-cover"
              />
            </AnimatePresence>
          </div>
          <div className="flex gap-3 mt-4">
            {product.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActiveImage(i)}
                className={`h-16 w-16 sm:h-20 sm:w-20 rounded-xl overflow-hidden border-2 transition-colors ${
                  activeImage === i ? 'border-ink' : 'border-line hover:border-ink/40'
                }`}
              >
                <img src={product.img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="pdp-fade">
          <p className="text-xs uppercase tracking-wide text-stone mb-2">{product.brand}</p>
          <h1 className="font-display text-2xl sm:text-3xl text-ink mb-3 leading-snug">{product.name}</h1>
          <div className="flex items-center gap-3 mb-5">
            <StarRating rating={product.rating} reviews={product.reviews} size="md" />
            <span className="text-xs text-stone">·</span>
            <span className="text-xs text-pine-600">{product.stock > 0 ? 'In stock' : 'Out of stock'}</span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="font-display text-3xl text-ink">
              {currency}
              {product.price.toFixed(2)}
            </span>
            {product.compareAt && (
              <span className="text-base text-stone line-through">
                {currency}
                {product.compareAt.toFixed(2)}
              </span>
            )}
            {product.compareAt && (
              <span className="text-sm font-medium text-brass-600">
                Save {Math.round((1 - product.price / product.compareAt) * 100)}%
              </span>
            )}
          </div>

          <p className="text-sm text-stone leading-relaxed mb-6 max-w-md">{product.short}</p>

          {product.colors?.length > 1 && (
            <div className="mb-6">
              <p className="text-sm text-ink mb-2">Color</p>
              <div className="flex gap-2">
                {product.colors.map((c, i) => (
                  <button
                    key={c}
                    onClick={() => setColor(i)}
                    aria-label={`Color ${i + 1}`}
                    className={`h-8 w-8 rounded-full border-2 transition-transform ${
                      color === i ? 'border-ink scale-110' : 'border-line'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mb-7">
            <p className="text-sm text-ink mb-2">Quantity</p>
            <div className="inline-flex items-center rounded-full border border-line">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="p-2.5 text-ink hover:text-pine-600"
                aria-label="Decrease quantity"
              >
                <IconMinus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center text-sm font-medium">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                className="p-2.5 text-ink hover:text-pine-600"
                aria-label="Increase quantity"
              >
                <IconPlus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAdd}
              className="btn-primary w-full sm:w-auto relative overflow-hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                {justAdded ? (
                  <motion.span
                    key="added"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="flex items-center gap-2"
                  >
                    <IconCheck className="w-4 h-4" /> Added to cart
                  </motion.span>
                ) : (
                  <motion.span key="add" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                    Add to cart
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            <button
              onClick={() => {
                addItem(product, qty);
                navigate('/cart');
              }}
              className="btn-secondary w-full sm:w-auto"
            >
              Buy now
            </button>
          </div>

          <div className="mt-10 border-t border-line pt-6">
            <h2 className="text-sm font-semibold text-ink mb-3">Product details</h2>
            <p className="text-sm text-stone leading-relaxed mb-5 max-w-md">{product.description}</p>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-3 max-w-md">
              {product.specs.map((s) => (
                <div key={s.label} className="text-sm">
                  <dt className="text-stone">{s.label}</dt>
                  <dd className="text-ink font-medium">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <ProductRail title="You may also like" products={related} />
    </div>
  );
}
