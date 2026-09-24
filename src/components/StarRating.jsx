function Star({ fill }) {
  return (
    <svg viewBox="0 0 20 20" className="w-3.5 h-3.5" aria-hidden="true">
      <defs>
        <linearGradient id={`grad-${fill}`}>
          <stop offset={`${fill * 100}%`} stopColor="#BC7E33" />
          <stop offset={`${fill * 100}%`} stopColor="#E7E3DC" />
        </linearGradient>
      </defs>
      <path
        d="M10 1.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9L1.5 7.7l5.9-.8z"
        fill={`url(#grad-${fill})`}
      />
    </svg>
  );
}

export default function StarRating({ rating = 0, reviews, size = 'sm' }) {
  const stars = [0, 1, 2, 3, 4].map((i) => {
    const diff = rating - i;
    return Math.max(0, Math.min(1, diff));
  });
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {stars.map((f, i) => (
          <Star key={i} fill={f} />
        ))}
      </div>
      {reviews !== undefined && (
        <span className={`text-stone ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>({reviews})</span>
      )}
    </div>
  );
}
