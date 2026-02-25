import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "سرعة في العمل وضمان على الخدمة .",
    name: "سارة",
    rating: 5,
  },
  {
    id: 2,
    quote: "الحرفي كان محترفاً والسعر مناسب .",
    name: "علي",
    rating: 5,
  },
  {
    id: 3,
    quote: "خدمة سريعة وتعامل محترم، أنصح بها !",
    name: "أحمد",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section dir="rtl" className="bg-white py-14">
      <div className="mx-auto w-full max-w-[1400px] px-4">
        <div className="rounded-2xl bg-white shadow-[0_14px_35px_rgba(0,0,0,0.12)] px-6 py-10 sm:px-8 md:px-10">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1855]">
              آراء عملائنا
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#6C6C6C]">
              تجارب حقيقية من مستخدمين وثقوا بخدماتنا
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <TestimonialCard item={t} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ item }) {
  return (
    <div className=" bg-white shadow-[0_10px_25px_rgba(0,0,0,0.18)] px-6 py-10 sm:py-12 text-center flex flex-col items-center justify-between min-h-[260px]">
      <div className="flex items-center justify-center gap-1">
        <Star
          className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10"
          fill="#F6B51E"
          stroke="#F6B51E"
        />
        <Star
          className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10"
          fill="#F6B51E"
          stroke="#F6B51E"
        />
        <Star
          className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10"
          fill="#F6B51E"
          stroke="#F6B51E"
        />
        <Star
          className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10"
          fill="#F6B51E"
          stroke="#F6B51E"
        />
        <Star
          className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10"
          fill="#F6B51E"
          stroke="#F6B51E"
        />
      </div>

      <p className="mt-6 text-[#1E1855] font-extrabold text-base sm:text-lg leading-relaxed max-w-[280px] sm:max-w-none">
        &quot;{item.quote}&quot;
      </p>

      <div className="mt-6 text-[#1E1855] font-semibold">— {item.name}.—</div>
    </div>
  );
}
