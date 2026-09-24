import ProductCard from './ProductCard.jsx';

export default function ProductRail({ title, products, viewAllLabel = 'View all' }) {
  if (!products?.length) return null;
  return (
    <section className="container-px py-10">
      <div className="flex items-end justify-between mb-5">
        <h2 className="section-heading">{title}</h2>
        <a href="#" className="text-sm text-stone hover:text-ink transition-colors hidden sm:inline">
          {viewAllLabel} &rsaquo;
        </a>
      </div>
      <div className="rail flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} className="w-[160px] sm:w-[200px] shrink-0 snap-start" />
        ))}
      </div>
    </section>
  );
}
