# Verve — Storefront Demo

A clean, responsive e-commerce front end: Home, Product, and Cart pages.
Built with React + Vite, Tailwind CSS, Framer Motion, and GSAP.

## Setup

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Structure

- `src/data.js` — every product, category, banner and footer link. Edit this
  file to reskin the store or plug in your own catalogue/API later.
- `src/context/CartContext.jsx` — cart state, persisted to `localStorage`.
- `src/components/` — Header, Footer, ProductCard, ProductRail, StarRating.
- `src/pages/Home.jsx` — hero (GSAP entrance), quick links, categories,
  promo banners, product rails, newsletter.
- `src/pages/Product.jsx` — gallery, color/qty selectors, add-to-cart,
  related products.
- `src/pages/Cart.jsx` — line items, quantity editing, order summary,
  demo checkout (no real payment).

## Notes

- Product images are placeholder photography from picsum.photos, seeded by
  product name so they stay consistent — swap `images:` arrays in `data.js`
  for real photography.
- Checkout is a UI-only demo: clicking "Checkout" shows a confirmation
  screen and does not process payment.
- Fonts: Fraunces (display/headings) + Inter (body/UI), loaded from Google
  Fonts in `index.html`.
