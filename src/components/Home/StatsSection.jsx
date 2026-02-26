import { useEffect, useMemo, useRef, useState } from "react";

function Counter({ end, duration = 1800, suffix = "" }) {
  const [count, setCount] = useState(0);
  const elRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;

          const startTime = performance.now();
          const start = 0;
          const diff = end - start;

          const tick = (now) => {
            const t = Math.min(1, (now - startTime) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            const value = Math.floor(start + diff * eased);

            setCount(value);

            if (t < 1) requestAnimationFrame(tick);
            else setCount(end);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.45 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [end, duration]);

  return (
    <span ref={elRef}>
      {suffix} {count}
    </span>
  );
}

export default function StatsSection() {
  const assets = useMemo(
    () => ({
      iconArtisan: "/stats/material-symbols_engineering-outline.png",
      iconServices: "/stats/hugeicons_setting-done-01.png",
      iconHappy: "/stats/fa7-regular_smile.png",
      cardBg: "/stats/Mask shape.png",
    }),
    [],
  );

  const stats = useMemo(
    () => [
      {
        id: 1,
        number: 1100,
        suffix: "",
        label: "عملاء راضين",
        icon: assets.iconHappy,
        alt: "عملاء",
      },
      {
        id: 2,
        number: 1200,
        suffix: "",
        label: "خدمات منفذة",
        icon: assets.iconServices,
        alt: "خدمات",
      },
      {
        id: 3,
        number: 1000,
        suffix: "+",
        label: "حرف مسجل لدينا",
        icon: assets.iconArtisan,
        alt: "حرف",
      },
    ],
    [assets],
  );

  return (
    <section className="relative py-20 bg-[#F5F5F5] overflow-hidden" dir="rtl">
      <div className="pointer-events-none absolute -right-[220px] -top-[40px] h-[520px] w-[520px] rounded-full bg-[#F3CCB8] blur-[80px]" />
      <div className="pointer-events-none absolute -left-[240px] -bottom-[170px] h-[560px] w-[560px] rounded-full bg-[#F3CCB8] blur-[80px]" />

      <div className="mx-auto w-full max-w-7xl px-6">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-[#C56A2D] mb-12">
          إنجازاتنا في أرقام
        </h2>

        <div className="relative overflow-hidden rounded-2xl py-6 md:py-8 bg-linear-to-r from-[#1E1B4B] to-[#2B2A6E] shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
          <img
            src={assets.cardBg}
            alt=""
            className="pointer-events-none hidden lg:block absolute inset-0 lg:left-0.5 lg:top-0.5 h-full w-full object-cover opacity-40"
          />

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 px-12 md:px-16 py-16 md:py-20 text-center min-h-[260px] md:min-h-[320px]">
            {stats.map((item) => (
              <div key={item.id} className="flex flex-col items-center">
                <div className="mb-5 flex h-14 w-14 items-center justify-center">
                  <img
                    src={item.icon}
                    alt={item.alt}
                    className="h-11 w-11 object-contain"
                    draggable="false"
                  />
                </div>

                <div className="text-4xl md:text-5xl font-extrabold text-[#F08A2E] leading-none">
                  <Counter end={item.number} suffix={item.suffix} />
                </div>

                <div className="mt-4 h-[2px] w-14 rounded-full bg-[#F3CCB8]" />

                <p className="mt-4 text-sm md:text-base text-white/85">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
