export default function ServicesHero() {
  const servicesData = [
    {
      title: "تكييف",
      desc: "تركيب وصيانة وتنظيف أجهزة التكييف",
      img: "/services/Frame 2147228587 (8).png",
    },
    {
      title: "نجارة",
      desc: "تصليح الأثاث والأبواب والأعمال الخشبية",
      img: "/services/Frame 2147228587 (2).png",
    },
    {
      title: "كهرباء",
      desc: "تركيب وصيانة التمديدات والأعطال الكهربائية",
      img: "/services/Frame 2147228587 (3).png",
    },
    {
      title: "سباكة",
      desc: "إصلاح التسريبات وصيانة الأدوات الصحية",
      img: "/services/Frame 2147228587 (4).png",
    },
    {
      title: "صيانة عامة",
      desc: "إصلاحات منزلية سريعة لمختلف الأعمال",
      img: "/services/Frame 2147228587 (5).png",
    },
    {
      title: "تنظيف",
      desc: "خدمات تنظيف شاملة للمنازل والمكاتب",
      img: "/services/Frame 2147228587 (6).png",
    },
    {
      title: "دهانات",
      desc: "دهانات داخلية وخارجية وتشطيبات احترافية",
      img: "/services/Frame 2147228587 (7).png",
    },
  ];

  const firstRow = servicesData.slice(0, 4);
  const secondRow = servicesData.slice(4);

  return (
    <section dir="rtl" className="w-full bg-white pt-24 pb-20 mt-20">
      <div className="mx-auto w-full max-w-[1400px] px-4">
        <div className="text-center">
          <h1 className="text-[28px] md:text-[32px] font-extrabold text-[#1E1855]">
            الخدمات
          </h1>

          <div className="mx-auto mt-4 h-[2px] w-80 bg-[#D9D9D9]" />

          <p className="mx-auto mt-6 max-w-[820px] text-[20px] md:text-[26px] leading-relaxed font-extrabold text-[#1E1855]">
            اختر نوع الخدمه التى تحتاجها
            <br className="hidden md:block" />
            وسنوصلك فى الحصول على الحرفى المناسب
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {firstRow.map((item, idx) => (
            <ServiceCard key={idx} item={item} />
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {secondRow.map((item, idx) => (
            <ServiceCard key={idx} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ item }) {
  return (
    <div className="group overflow-hidden bg-white transition hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
      <div className="relative h-[240px] w-full overflow-hidden">
        <img
          src={item.img}
          alt={item.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>

      <div className="px-4 pb-4 pt-3 text-center">
        <h3 className="text-[18px] font-extrabold text-[#1E1855]">
          {item.title}
        </h3>

        <div className="mx-auto mt-4 h-[2px] w-50 bg-[#D9D9D9]" />

        <p className="mt-2 min-h-[40px] text-[12px] leading-relaxed text-[#6B6B6B]">
          {item.desc}
        </p>

        <button
          type="button"
          className="mt-3 inline-flex items-center justify-center rounded-md bg-[#d75b19] px-4 py-2 text-[12px] font-bold text-white transition hover:bg-[#1E1855] active:scale-[0.98]"
        >
          اختر الخدمة
        </button>
      </div>
    </div>
  );
}
