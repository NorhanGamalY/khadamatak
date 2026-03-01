import { useEffect, useMemo, useState } from "react";

export default function ServicesSection() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const categoryImages = useMemo(
    () => ({
      "سباكة": "/workers/plumber.png",
      "نجارة": "/workers/najjar.png",
      "كهرباء": "/workers/electric.png",
      "دهانات": "/workers/paint.png",
      "تكييف": "/workers/ac.png",
      "تنظيف": "/workers/cleaning.png",
      "صيانة عامة": "/workers/maintenance.png",
      default: "/workers/default.png",
    }),
    []
  );

  function getServiceImage(service) {
    const cat = service.serviceCategoryName || service.name || "";
    if (cat.includes("سباك") || cat.includes("سباكة")) return categoryImages["سباكة"];
    if (cat.includes("نجار") || cat.includes("نجارة")) return categoryImages["نجارة"];
    if (cat.includes("كهرب") || cat.includes("كهرباء")) return categoryImages["كهرباء"];
    if (cat.includes("دهان") || cat.includes("دهانات")) return categoryImages["دهانات"];
    if (cat.includes("تكييف")) return categoryImages["تكييف"];
    if (cat.includes("تنظيف")) return categoryImages["تنظيف"];
    if (cat.includes("صيانة")) return categoryImages["صيانة عامة"];
    return categoryImages.default;
  }

  useEffect(() => {
    let ignore = false;

    async function fetchServices() {
      try {
        setLoading(true);
        setError("");

        const token =
          localStorage.getItem("token") ||
          localStorage.getItem("accessToken") ||
          sessionStorage.getItem("token");

        if (!token) throw new Error("لا يوجد Token. لازم تسجلي دخول أولاً.");

        const res = await fetch(`${API_BASE}/api/Services`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const txt = await res.text();
          throw new Error(`API Error ${res.status}: ${txt}`);
        }

        const data = await res.json();
        if (!ignore) setServices(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!ignore) setError(e?.message || "صار خطأ");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchServices();
    return () => {
      ignore = true;
    };
  }, [API_BASE]);

  if (loading) {
    return (
      <div className="text-center py-20 font-bold text-xl text-[#1E1855]">
        جاري تحميل الخدمات...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 font-bold text-red-600">{error}</div>
    );
  }

  return (
    <section dir="rtl" className="bg-[#F5F5F5] py-14 sm:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-4">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E1855]">
            الحرفيين والخدمات المتاحة
          </h2>
          <div className="mx-auto mt-5 h-[2px] w-44 sm:w-56 bg-[#C7C3C1]" />
        </div>

        <div className="mt-10 grid grid-cols-1 min-[840px]:grid-cols-2 gap-6">
          {services.map((service) => {
            const imgSrc = service.image || getServiceImage(service);

            return (
              <div
                key={service.id}
                className="rounded-3xl bg-[#E8E9E8] p-6 sm:p-7"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E1855] leading-snug">
                      {service.name}
                    </h3>

                    <p className="mt-2 text-[#1E1855] font-medium">
                      {service.description}
                    </p>

                    <div className="mt-4 text-lg sm:text-xl text-[#1E1855] font-bold">
                      السعر:{" "}
                      <span dir="ltr" className="font-extrabold text-xl">
                        {service.price}
                      </span>{" "}
                      ج م
                    </div>

                    <div className="mt-2 text-[#1E1855]">
                      المدينة: {service.craftsmanCity}
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
                        src={imgSrc}
                        alt={service.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = "/workers/default.png";
                        }}
                      />
                    </div>

                    <div className="mt-3 text-lg sm:text-xl text-[#1E1855] font-extrabold leading-none">
                      {service.craftsmanName}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}