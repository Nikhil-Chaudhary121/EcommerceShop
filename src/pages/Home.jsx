import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import ProductRail from '../components/ProductRail.jsx';
import ConsoleShelf from '../components/ConsoleShelf.jsx';
import CategoryIcons from '../components/CategoryIcons.jsx';
import {
  heroSlide,
  quickLinks,
  categories,
  deliveryBanner,
  utilityCategories,
  recentlyViewedIds,
  topSellerIds,
  pickedForYouIds,
  newArrivalIds,
  getProductsByIds,
} from '../data.js';

function QuickLinkIcon({ name, className }) {
  const paths = {
    user: <><circle cx="12" cy="8" r="3.4" /><path d="M5 20c1.2-3.8 4-5.8 7-5.8s5.8 2 7 5.8" strokeLinecap="round" /></>,
    box: <><path d="M3.5 8.2 12 4l8.5 4.2M3.5 8.2v8.6L12 21l8.5-4.2V8.2M3.5 8.2 12 12l8.5-3.8M12 12v9" strokeLinecap="round" strokeLinejoin="round" /></>,
    headphones: <><path d="M4 14v-2a8 8 0 0 1 16 0v2" strokeLinecap="round" /><rect x="2.7" y="13" width="4" height="6" rx="1.5" /><rect x="17.3" y="13" width="4" height="6" rx="1.5" /></>,
    home: <><path d="M4 11.5 12 4l8 7.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 10v9.5h12V10" strokeLinecap="round" strokeLinejoin="round" /></>,
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      {paths[name]}
    </svg>
  );
}

function ShipIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M3.5 8.2 12 4l8.5 4.2M3.5 8.2v8.6L12 21l8.5-4.2V8.2M3.5 8.2 12 12l8.5-3.8M12 12v9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function TagIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M20 12 12.6 4.6a2 2 0 0 0-1.4-.6H5a1 1 0 0 0-1 1v6.2c0 .5.2 1 .6 1.4L12 20l8-8Z" strokeLinejoin="round" />
      <circle cx="8" cy="8" r="1.4" />
    </svg>
  );
}
function ReturnIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M3 12a9 9 0 1 0 3-6.7" strokeLinecap="round" />
      <path d="M3 4v5h5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Compact banner-height hero — not a full-screen block. */
function Hero() {
  const scope = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-eyebrow', { opacity: 0, y: 10, duration: 0.45 })
        .from('.hero-title', { opacity: 0, y: 16, duration: 0.55 }, '-=0.25')
        .from('.hero-copy', { opacity: 0, y: 12, duration: 0.45 }, '-=0.3')
        .from('.hero-cta', { opacity: 0, y: 8, duration: 0.35 }, '-=0.25')
        .from('.hero-image', { opacity: 0, scale: 0.95, duration: 0.5 }, '-=0.4');
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={scope} className="container-px pt-6 sm:pt-8">
      <div className="grid sm:grid-cols-2 items-center gap-5 sm:gap-8 rounded-xl2 bg-[#333533] text-paper px-6 sm:px-10 py-6 sm:py-8 min-h-[220px] sm:min-h-[260px]">
        <div>
          <p className="hero-eyebrow text-brass-100 text-xs sm:text-sm font-medium mb-2">{heroSlide.eyebrow}</p>
          <h1 className="hero-title font-display text-2xl sm:text-3xl lg:text-4xl leading-[1.1] mb-3">
            {heroSlide.title}
          </h1>
          <p className="hero-copy text-paper/80 text-sm max-w-md mb-5 hidden sm:block">{heroSlide.copy}</p>
          <div className="flex flex-wrap items-center gap-3">
            {/* <a href="#categories" className="hero-cta btn-primary bg-paper text-ink hover:bg-brass-100 !px-5 !py-2.5 text-sm">
              {heroSlide.cta}
            </a> */}  
            <a href="#consoles" className="hero-cta inline-flex items-center gap-2 text-sm text-paper/85 hover:text-paper">
              Or browse consoles &amp; games &rsaquo;
            </a>
          </div>
        </div>
        <div className="hero-image hidden sm:block">
          <img
            src='/img/ps5controller.png'
            alt="Featured product"
            className="w-full h-40 sm:h-48 rounded-xl object-contain"
          />
        </div>
      </div>
    </section>
  );
}

function QuickLinks() {
  return (
    <section className="container-px mt-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {quickLinks.map((q) => (
          <Link
            key={q.label}
            to={q.to}
            className="flex items-center gap-3 rounded-xl2 border border-line bg-white p-4 hover:border-ink/20 hover:shadow-card transition-all"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cloud text-pine-600">
              <QuickLinkIcon name={q.icon} className="w-5 h-5" />
            </span>
            <span className="min-w-0">
              <p className="text-sm font-medium text-ink truncate">{q.label}</p>
              <p className="text-xs text-stone truncate">{q.sub}</p>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function CategoryGrid() {
  return (
    <section id="categories" className="container-px py-10">
      <div className="flex items-end justify-between mb-5">
        <h2 className="section-heading">Shop by category</h2>
        <a href="#" className="text-sm text-stone hover:text-ink hidden sm:inline">All departments &rsaquo;</a>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {categories.map((c) => (
          <a
            key={c.id}
            href="#"
            className="group flex items-center gap-3 rounded-xl2 border border-line bg-white p-3.5 hover:shadow-card transition-shadow"
          >
            <div className="h-14 w-14 rounded-xl bg-cloud overflow-hidden shrink-0">
              <img
                src={c.img}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p className="text-sm text-ink leading-snug">{c.name}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

/** Text-only trio of service points — replaces the old two-image promo strip. */
function ServiceStrip() {
  const items = [
    { icon: ShipIcon, title: 'Fast worldwide shipping', copy: 'Delivered to over 100 countries, tracked door to door.' },
    { icon: TagIcon, title: 'Daily deals', copy: 'New markdowns across every department, updated daily.' },
    { icon: ReturnIcon, title: '30-day returns', copy: 'Change your mind within 30 days for a full refund.' },
  ];
  return (
    <section className="container-px py-4">
      <div className="grid sm:grid-cols-3 gap-4">
        {items.map((it) => (
          <div key={it.title} className="flex items-start gap-3 rounded-xl2 border border-line bg-white p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brass-50 text-brass-600">
              <it.icon className="w-5 h-5" />
            </span>
            <div>
              <p className="text-sm font-medium text-ink">{it.title}</p>
              <p className="text-xs text-stone mt-0.5">{it.copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function UtilityCategories() {
  return (
    <section className="container-px py-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {utilityCategories.map((u) => (
          <a key={u.name} href="#" className="flex items-center gap-3 rounded-xl2 border border-line bg-white p-3.5 hover:shadow-card transition-shadow">
            <div className="h-11 w-11 rounded-lg bg-cloud overflow-hidden shrink-0">
              <img src={u.img} alt="" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="text-sm text-ink leading-tight">{u.name}</p>
              <p className="text-xs text-stone">Big Sale 30%</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/** Single, slim strip — no photography, just the offer. */
function DeliveryStrip() {
  return (
    <section className="container-px py-6">
      <div className="rounded-xl2 bg-cloud border border-line px-6 sm:px-10 py-7 sm:py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl sm:text-2xl text-ink mb-1">{deliveryBanner.title}</h2>
          <p className="text-sm text-stone max-w-md">{deliveryBanner.copy}</p>
        </div>
        <a href="#" className="btn-secondary shrink-0">{deliveryBanner.cta}</a>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  return (
    <section className="container-px py-10">
      <div className="rounded-xl2 bg-ink text-paper px-6 sm:px-10 py-9 sm:py-11 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl mb-2">Subscribe to the news</h2>
          <p className="text-sm text-paper/70 max-w-sm">
            Be the first to know about drops, restocks and members-only pricing. No spam, ever.
          </p>
        </div>
        {sent ? (
          <p className="text-sm text-brass-100 shrink-0">You're on the list — thank you.</p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSent(true);
            }}
            className="p-2 flex md:flex-row flex-col gap-2 w-fit max-w-sm shrink-0"
          >
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="flex-1 md:mb-0 mb-5 w-full rounded-full bg-white/10 border border-white/20 px-4 py-2.5 text-sm outline-none placeholder:text-paper/50 focus:border-white/50"
            />
            <button type="submit" className="rounded-full bg-brass-500 hover:bg-brass-600 transition-colors px-5 py-2.5 text-sm font-medium shrink-0">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default function Home() {
  const recentlyViewed = getProductsByIds(recentlyViewedIds);
  const topSellers = getProductsByIds(topSellerIds);
  const pickedForYou = getProductsByIds(pickedForYouIds);
  const newArrivals = getProductsByIds(newArrivalIds);

  return (
    <div>
      <CategoryIcons />
      <Hero />
      {/* <QuickLinks /> */}
      <ProductRail title="New arrivals" products={newArrivals} />
      <ConsoleShelf />
      <CategoryGrid />
      <ServiceStrip />
      <ProductRail title="Recently viewed" products={recentlyViewed} />
      <ProductRail title="Top sellers" products={topSellers} />
      <DeliveryStrip />
      <ProductRail title="Picked for you" products={pickedForYou} />
      <UtilityCategories />
      <Newsletter />
    </div>
  );
}
