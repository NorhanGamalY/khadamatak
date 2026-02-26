import { Star } from "lucide-react";
const servicesCards = [
  {
    id: 1,
    title: "دهان منازل",
    rating: 4.6,
    priceFrom: 100,
    priceTo: 180,
    name: "خالد فوزي",
    image: "/workers/paint.png",
    tag: "top",
  },
  {
    id: 2,
    title: "نجار محترف",
    rating: 4.7,
    priceFrom: 250,
    priceTo: 400,
    name: "أحمد لطفي",
    image: "/workers/najjar.png",
    tag: "recommended",
  },
  {
    id: 3,
    title: "أعمال سباكة",
    rating: 4.8,
    priceFrom: 200,
    priceTo: 300,
    name: "محمد السيد",
    image: "/workers/plumber.png",
    tag: "recommended",
  },
  {
    id: 4,
    title: "أعمال كهرباء",
    rating: 4.9,
    priceFrom: 150,
    priceTo: 250,
    name: "يوسف حمدي",
    image: "/workers/electric.png",
    tag: "top",
  },
];

export default function ServicesSection() {
  return (
    <section dir="rtl" className="bg-[#F5F5F5] py-14 sm:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-4">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E1855]">
            الحرفيين والخدمات المتاحة
          </h2>
          <div className="mx-auto mt-5 h-[2px] w-44 sm:w-56 bg-[#C7C3C1]" />
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-6">
          <TabButton active icon>
            الأعلى تقييم
          </TabButton>

          <TabButton>الخدمات الموصى بها لك</TabButton>
        </div>

        <div className="mt-8 grid grid-cols-1 min-[840px]:grid-cols-2 gap-6">
          {servicesCards.map((card) => (
            <ServiceCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TabButton({ children, active = false, icon = false }) {
  return (
    <button
      type="button"
      className={[
        "h-14 w-full sm:w-[360px] rounded-xl bg-white px-6",
        "ring-1 ring-[#EAEAEA] shadow-[0_10px_22px_rgba(0,0,0,0.08)]",
        "flex items-center justify-center",
        active ? "text-[#1E1855]" : "text-[#1E1855]",
      ].join(" ")}
    >
      <span className="flex items-center gap-2 font-extrabold text-lg">
        {children}
        {icon && <Star className="h-5 w-5 fill-[#d75b19] text-[#d75b19]" />}
      </span>
    </button>
  );
}

function ServiceCard({ card }) {
  return (
    <div className="rounded-3xl bg-[#E8E9E8] p-6 sm:p-7">
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E1855] leading-snug">
            {card.title}
          </h3>

          <div className="mt-3 flex items-center gap-3 text-[#1E1855]">
            <span className="font-extrabold text-xl">{card.rating}</span>

            <div className="flex items-center gap-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-[#d75b19] text-[#d75b19]"
                />
              ))}
            </div>
          </div>

          <div className="mt-4 text-lg sm:text-xl text-[#1E1855] font-bold">
            السعر:{" "}
            <span dir="ltr" className="font-extrabold text-xl">
              {card.priceFrom}-{card.priceTo}
            </span>{" "}
            ج م
          </div>

          <button
            type="button"
            className="mt-5 h-12 px-8 rounded-xl bg-[#d75b19] text-white text-md sm:text-lg font-extrabold
                       hover:bg-[#1E1855] transition"
          >
            احجز الآن
          </button>
        </div>

        <div className="shrink-0 text-center flex flex-col items-center">
          <div
            className="rounded-2xl bg-white overflow-hidden
                       w-[160px] h-[130px]
                       sm:w-[190px] sm:h-[150px]
                       lg:w-[210px] lg:h-[165px]
                       shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="mt-3 text-lg sm:text-xl text-[#1E1855] font-extrabold leading-none">
            {card.name}
          </div>
        </div>
      </div>
    </div>
  );
}
