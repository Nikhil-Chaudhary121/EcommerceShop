import { footerColumns, brand } from '../data.js';

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-line bg-cloud">
      <div className="container-px py-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
        {footerColumns.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold text-ink mb-3">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-stone hover:text-ink transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container-px py-5 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone">
        <span className="font-display text-base text-ink">{brand.name}</span>
        <div className="flex gap-5">
          <a href="#" className="hover:text-ink">Conditions of use</a>
          <a href="#" className="hover:text-ink">Privacy policy</a>
          <a href="#" className="hover:text-ink">Interest-based ads</a>
        </div>
        <span>© {new Date().getFullYear()} {brand.name}. Demo storefront.</span>
      </div>
    </footer>
  );
}
