import { useEffect, useMemo, useState } from "react";
import { Star } from "lucide-react";

const API_URL = "https://herafie.runasp.net/api/Craftsmen";

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("فشل في تحميل التقييمات");
        }

        const craftsmen = await response.json();

        // نجمع كل الريفيوز من كل الحرفيين
        const allReviews = craftsmen.flatMap((craftsman) =>
          (craftsman.reviews || [])
            .filter((review) => review.rating >= 3)
            .map((review) => ({
              id: `${craftsman.id}-${review.id}`,
              quote: review.comment,
              name: review.clientName,
              rating: review.rating,
              craftsmanName: craftsman.fullName,
              createdAt: review.createdAt,
            })),
        );

        // ترتيب من الأحدث للأقدم
        allReviews.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );

        setReviews(allReviews);
      } catch (err) {
        setError(err.message || "حدث خطأ أثناء تحميل التقييمات");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const hasReviews = useMemo(() => reviews.length > 0, [reviews]);

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

          {loading ? (
            <div className="mt-10 text-center text-[#6C6C6C]">
              جاري تحميل التقييمات...
            </div>
          ) : error ? (
            <div className="mt-10 text-center text-red-500">{error}</div>
          ) : !hasReviews ? (
            <div className="mt-10 text-center text-[#6C6C6C]">
              لا توجد تقييمات متاحة حالياً
            </div>
          ) : (
            <div className="mt-10">
              <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="w-full shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc((100%-48px)/3)]"
                  >
                    <TestimonialCard item={review} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ item }) {
  return (
    <div className="bg-white shadow-[0_10px_25px_rgba(0,0,0,0.18)] rounded-2xl px-6 py-10 sm:py-12 text-center flex flex-col items-center justify-between min-h-[280px] h-full">
      <div className="flex items-center justify-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10"
            fill={index < Math.round(item.rating) ? "#F6B51E" : "transparent"}
            stroke="#F6B51E"
          />
        ))}
      </div>

      <p className="mt-6 text-[#1E1855] font-extrabold text-base sm:text-lg leading-relaxed max-w-[280px] sm:max-w-none">
        &quot;{item.quote}&quot;
      </p>

      <div className="mt-6 space-y-1">
        <div className="text-[#1E1855] font-semibold">— {item.name} —</div>

        {item.craftsmanName && (
          <div className="text-sm text-[#6C6C6C]">
            على الحرفي: {item.craftsmanName}
          </div>
        )}
      </div>
    </div>
  );
}
