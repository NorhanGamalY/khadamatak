function QualityCard({ iconSrc, title }) {
  return (
    <div className="group w-full rounded-2xl bg-white border border-black/5 px-6 py-10 flex flex-col items-center justify-center gap-4 shadow-[0_10px_25px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
      <div className="relative">
        <img
          src={iconSrc}
          alt=""
          className="h-11 w-11 object-contain transition duration-500 group-hover:scale-110 group-hover:rotate-6"
        />
      </div>

      <p className="text-base sm:text-lg font-semibold text-[#1A1A1A] transition duration-300 group-hover:text-[#F97316]">
        {title}
      </p>

      <span className="h-[3px] w-0 rounded-full bg-[#F97316] transition-all duration-500 group-hover:w-16" />

      <div className="absolute inset-0 rounded-2xl bg-[#F97316]/0 group-hover:bg-[#F97316]/[0.03] transition duration-500 pointer-events-none" />
    </div>
  );
}

export default function QualityAssuranceSection() {
  const items = [
    { iconSrc: "about/icons/quality-2.png", title: "مراجعة الحرفيين" },
    { iconSrc: "about/icons/quality-1.png", title: "نظام تقييم شفاف" },
    { iconSrc: "about/icons/quality-3.png", title: "إشراف إداري كامل" },
  ];

  return (
    <section dir="rtl" className="w-full py-10">
      <div className="mx-auto w-full max-w-[1200px] px-4">
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-8">
          كيف نضمن الجودة ؟
        </h2>

        <div className="flex flex-col sm:flex-row gap-6">
          {items.map((it, idx) => (
            <div key={idx} className="flex-1">
              <QualityCard iconSrc={it.iconSrc} title={it.title} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
