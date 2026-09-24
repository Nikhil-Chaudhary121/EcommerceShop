import { iconCategories } from '../data.js';
export default function CategoryIcons() {
  return (
    <section className="container-px py-6">
      <div className="rail flex gap-7 overflow-x-auto pb-2 -mx-1 px-1">
        {iconCategories.map((c) => (
          <a
            key={c.id}
            href="#"
            className="group flex w-[88px] shrink-0 flex-col items-center text-center"
          >
            {/* Icon */}
            <span
              className="
                flex h-[86px] w-[86px]
                items-center justify-center
                overflow-hidden
                rounded-[22px]
                border border-gray-200
                bg-white
                shadow-[0_2px_8px_rgba(0,0,0,0.06)]
                transition-all duration-200
                group-hover:-translate-y-1
                group-hover:shadow-[0_6px_18px_rgba(0,0,0,0.10)]
                group-hover:border-gray-300
              "
            >
              <img
                src={c.img}
                alt={c.name}
                className="
                  h-[72px] w-[72px]
                  object-contain
                  transition-transform duration-200
                  group-hover:scale-105
                "
              />
            </span>

            {/* Name */}
            <span
              className="
                mt-3
                text-[13px]
                leading-tight
                text-gray-700
                transition-colors
                group-hover:text-black
              "
            >
              {c.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}