import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '../context/CartContext.jsx';
import { currency } from '../data.js';

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
function IconTrash(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-9 0 1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconBag(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M6 8h12l1 13H5L6 8Z" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" strokeLinecap="round" />
    </svg>
  );
}

function EmptyCart() {
  return (
    <div className="container-px py-24 flex flex-col items-center text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cloud text-stone mb-5">
        <IconBag className="w-7 h-7" />
      </span>
      <h1 className="font-display text-2xl text-ink mb-2">Your cart is empty</h1>
      <p className="text-sm text-stone max-w-xs mb-6">
        Items you add will show up here, ready for checkout whenever you are.
      </p>
      <Link to="/" className="btn-primary">Continue shopping</Link>
    </div>
  );
}

export default function Cart() {
  const { items, removeItem, setQty, subtotal, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);

  const shipping = items.length === 0 ? 0 : subtotal > 100 ? 0 : 6.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (placed) {
    return (
      <div className="container-px py-24 flex flex-col items-center text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-pine-50 text-pine-600 mb-5">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h1 className="font-display text-2xl text-ink mb-2">Order placed</h1>
        <p className="text-sm text-stone max-w-xs mb-6">
          This is a demo checkout — no payment was taken. Thanks for trying the store.
        </p>
        <Link to="/" className="btn-primary">Back to home</Link>
      </div>
    );
  }

  if (items.length === 0) return <EmptyCart />;

  return (
    <div className="container-px py-8 lg:py-10">
      <h1 className="font-display text-2xl sm:text-3xl text-ink mb-6">Your cart</h1>
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between border-b border-line pb-3 mb-1">
            <span className="text-sm text-stone">{items.length} item{items.length > 1 ? 's' : ''}</span>
            <button onClick={clearCart} className="text-xs text-stone hover:text-ink underline">
              Clear cart
            </button>
          </div>
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="flex gap-4 py-5 border-b border-line">
                  <Link to={`/product/${item.id}`} className="shrink-0">
                    <img src={'/img/ps5.png'} alt={item.name} className="h-24 w-24 rounded-xl object-cover bg-cloud" />
                  </Link>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-stone mb-0.5">{item.brand}</p>
                      <Link to={`/product/${item.id}`} className="text-sm font-medium text-ink hover:underline line-clamp-2">
                        {item.name}
                      </Link>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="inline-flex items-center rounded-full border border-line">
                        <button
                          onClick={() => setQty(item.id, item.qty - 1)}
                          className="p-2 text-ink hover:text-pine-600"
                          aria-label="Decrease quantity"
                        >
                          <IconMinus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm">{item.qty}</span>
                        <button
                          onClick={() => setQty(item.id, item.qty + 1)}
                          className="p-2 text-ink hover:text-pine-600"
                          aria-label="Increase quantity"
                        >
                          <IconPlus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-display text-base text-ink">
                          {currency}
                          {(item.price * item.qty).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-stone hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <IconTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div>
          <div className="rounded-xl2 border border-line bg-white p-6 sticky top-24">
            <h2 className="font-display text-lg text-ink mb-4">Order summary</h2>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between text-stone">
                <span>Subtotal</span>
                <span className="text-ink">{currency}{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone">
                <span>Shipping</span>
                <span className="text-ink">{shipping === 0 ? 'Free' : `${currency}${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-stone">
                <span>Estimated tax</span>
                <span className="text-ink">{currency}{tax.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between items-baseline border-t border-line mt-4 pt-4 mb-5">
              <span className="text-sm font-medium text-ink">Total</span>
              <span className="font-display text-2xl text-ink">{currency}{total.toFixed(2)}</span>
            </div>
            {subtotal < 100 && (
              <p className="text-xs text-brass-600 bg-brass-50 rounded-lg px-3 py-2 mb-4">
                Add {currency}{(100 - subtotal).toFixed(2)} more for free shipping.
              </p>
            )}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setPlaced(true)}
              className="btn-primary w-full"
            >
              Checkout
            </motion.button>
            <Link to="/" className="block text-center text-xs text-stone hover:text-ink mt-4">
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
