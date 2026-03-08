import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronUp } from "lucide-react";

const DEFAULT_SERVICE_IMAGE = "/services/Frame 2147228587 (2).png";

const serviceImageByName = {
  تكييف: "/services/Frame 2147228587 (8).png",
  نجارة: "/services/Frame 2147228587 (2).png",
  "تأسيس كهرباء للمنول": "/services/Frame 2147228587 (3).png",
  كهرباء: "/services/Frame 2147228587 (3).png",
  سباكة: "/services/Frame 2147228587 (4).png",
  صيانة: "/services/Frame 2147228587 (5).png",
  تنظيف: "/services/Frame 2147228587 (6).png",
  دهانات: "/services/Frame 2147228587 (7).png",
};

function getServiceImage(name) {
  return serviceImageByName[name] || DEFAULT_SERVICE_IMAGE;
}

export default function ServicesHero() {
  const [showAll, setShowAll] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await fetch("https://herafie.runasp.net/api/ServiceCategory");
      if (!res.ok) throw new Error("فشل تحميل الخدمات");
      return res.json();
    },
  });

  const list = Array.isArray(data) ? data : data?.data || [];

  const firstRow = list.slice(0, 4);
  const secondRow = list.slice(4, 7);
  const hiddenCards = list.slice(7);
  const hasMore = hiddenCards.length > 0;

  function toggleServices() {
    setShowAll((prev) => !prev);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-500">جارٍ تحميل الخدمات...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-red-600">حصل خطأ أثناء تحميل الخدمات</p>
      </div>
    );
  }

  return (
    <section dir="rtl" className="relative w-full bg-white pt-24 pb-20 mt-20">
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
          {firstRow.map((item) => (
            <ServiceCard key={item.id ?? item.name} item={item} />
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {secondRow.map((item) => (
            <ServiceCard key={item.id ?? item.name} item={item} />
          ))}
        </div>

        {showAll && hiddenCards.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {hiddenCards.map((item) => (
              <ServiceCard key={item.id ?? item.name} item={item} />
            ))}
          </div>
        )}

        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={toggleServices}
              aria-label={showAll ? "إخفاء باقي الخدمات" : "إظهار باقي الخدمات"}
              title={showAll ? "إخفاء باقي الخدمات" : "إظهار باقي الخدمات"}
              className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#D9D9D9] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.10)] transition hover:border-[#d75b19] hover:shadow-[0_14px_40px_rgba(0,0,0,0.14)] active:scale-[0.98]"
            >
              {showAll ? (
                <ChevronUp className="h-7 w-7 text-[#1E1855] transition group-hover:text-[#d75b19]" />
              ) : (
                <ChevronDown className="h-7 w-7 text-[#1E1855] animate-bounce group-hover:text-[#d75b19]" />
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function ServiceCard({ item }) {
  const navigate = useNavigate();
  const title = item?.name || "";
  const imgSrc = getServiceImage(title);

  return (
    <div className="group overflow-hidden bg-white transition hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
      <div className="relative h-[240px] w-full overflow-hidden">
        <img
          src={imgSrc}
          alt={title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = DEFAULT_SERVICE_IMAGE;
          }}
        />
      </div>

      <div className="px-4 pb-4 pt-3 text-center">
        <h3 className="text-[18px] font-extrabold text-[#1E1855]">{title}</h3>

        <div className="mx-auto mt-4 h-[2px] w-50 bg-[#D9D9D9]" />

        <p className="mt-2 min-h-[40px] text-[12px] leading-relaxed text-[#6B6B6B]">
          {item?.description || ""}
        </p>

        <button
          type="button"
          onClick={() =>
            navigate("/craftman-results", { state: { serviceName: title } })
          }
          className="mt-2 inline-flex items-center justify-center rounded-md bg-[#d75b19] px-5 py-3 text-[12px] font-bold text-white transition hover:bg-[#1E1855] active:scale-[0.98]"
        >
          اختر الخدمة
        </button>
      </div>
    </div>
  );
}
