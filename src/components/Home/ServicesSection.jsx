import React, { useMemo, useState } from "react";
import { Star, ChevronLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ENDPOINTS = {
  craftsmen: `${API_BASE_URL}/api/Craftsmen`,
};

const WANTED_CATEGORIES = ["سباكة", "كهرباء", "نجارة", "دهانات"];

function getCategoryMeta(categoryName) {
  const name = (categoryName || "").trim();

  if (name.includes("سباك")) {
    return { id: 1, image: "/workers/plumber.png" };
  }

  if (name.includes("كهرب")) {
    return { id: 2, image: "/workers/electric.png" };
  }

  if (name.includes("نجار") || name.includes("ابواب")) {
    return { id: 3, image: "/workers/najjar.png" };
  }

  if (name.includes("دهان")) {
    return { id: 4, image: "/workers/paint.png" };
  }

  if (name.includes("تكييف")) {
    return { id: 5, image: "/workers/ac.png" };
  }

  if (name.includes("صيانة")) {
    return { id: 6, image: "/workers/maintenance.png" };
  }

  return { id: 0, image: "/unknown.jpg" };
}
function normalizeText(value) {
  return (value || "").trim().toLowerCase();
}

// function getCategoryMeta(categoryName) {
//   const name = (categoryName || "").trim();
//   const found = CATEGORY_META_BY_NAME[name];

//   if (found) {
//     return found;
//   }

//   return {
//     id: 0,
//     image: "/unknown.jpg",
//   };
// }

function StarsRow({ rating = 0 }) {
  const full = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={[
            "h-5 w-5",
            i < full ? "fill-[#d75b19] text-[#d75b19]" : "text-[#C7C3C1]",
          ].join(" ")}
        />
      ))}
    </div>
  );
}

function pickCraftsman(craftsmen, mode) {
  if (!craftsmen?.length) return null;

  const sorted = [...craftsmen].sort((a, b) => {
    const ar = Number(a?.rating || 0);
    const br = Number(b?.rating || 0);
    const ay = Number(a?.yearsOfExperience || 0);
    const by = Number(b?.yearsOfExperience || 0);
    const av = a?.isVerified ? 1 : 0;
    const bv = b?.isVerified ? 1 : 0;
    const ac = Number(a?.completedOrdersCount || 0);
    const bc = Number(b?.completedOrdersCount || 0);

    if (mode === "top") {
      if (br !== ar) return br - ar;
      if (bc !== ac) return bc - ac;
      if (by !== ay) return by - ay;
      return bv - av;
    }

    if (bv !== av) return bv - av;
    if (bc !== ac) return bc - ac;
    if (by !== ay) return by - ay;
    return br - ar;
  });

  return sorted[0];
}

function getCraftsmanCategories(craftsman) {
  if (!Array.isArray(craftsman?.services)) return [];

  const unique = new Map();

  for (const service of craftsman.services) {
    const categoryName = (service?.serviceCategoreyName || "").trim();
    if (!categoryName) continue;

    const key = normalizeText(categoryName);

    if (!unique.has(key)) {
      unique.set(key, categoryName);
    }
  }

  return Array.from(unique.values());
}

function getCraftsmenByCategory(craftsmen, categoryName) {
  const target = normalizeText(categoryName);

  return craftsmen.filter((craftsman) =>
    getCraftsmanCategories(craftsman).some(
      (name) => normalizeText(name) === target,
    ),
  );
}

function getCategoryPriceRange(craftsmen, categoryName) {
  const target = normalizeText(categoryName);

  const prices = craftsmen
    .flatMap((craftsman) => craftsman?.services || [])
    .filter(
      (service) =>
        normalizeText(service?.serviceCategoreyName) === target &&
        Number(service?.price) > 0,
    )
    .map((service) => Number(service.price));

  if (!prices.length) {
    return { from: null, to: null };
  }

  return {
    from: Math.min(...prices),
    to: Math.max(...prices),
  };
}

function getDisplayCategories(craftsmen) {
  const allCategories = new Map();

  for (const craftsman of craftsmen) {
    for (const categoryName of getCraftsmanCategories(craftsman)) {
      const key = normalizeText(categoryName);
      if (!allCategories.has(key)) {
        allCategories.set(key, categoryName);
      }
    }
  }

  const matchedWanted = WANTED_CATEGORIES.filter((wanted) =>
    allCategories.has(normalizeText(wanted)),
  );

  const remaining = Array.from(allCategories.values()).filter(
    (categoryName) =>
      !matchedWanted.some(
        (wanted) => normalizeText(wanted) === normalizeText(categoryName),
      ),
  );

  return [...matchedWanted, ...remaining].slice(0, 4);
}

async function fetchJson(url) {
  const res = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  const text = await res.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const msg =
      typeof data === "string"
        ? data
        : data?.message || data?.error || `Request failed: ${res.status}`;
    throw new Error(msg);
  }

  return data;
}

function useCraftsmen() {
  return useQuery({
    queryKey: ["craftsmen"],
    queryFn: () => fetchJson(ENDPOINTS.craftsmen),
    staleTime: 60_000,
  });
}

export default function ServicesSection() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("top");

  const { data: craftsmenRaw, isLoading, isError, error } = useCraftsmen();

  const craftsmen = Array.isArray(craftsmenRaw) ? craftsmenRaw : [];

  const cards = useMemo(() => {
    const categoryNames = getDisplayCategories(craftsmen);

    return categoryNames
      .map((categoryName, index) => {
        const relevantCraftsmen = getCraftsmenByCategory(
          craftsmen,
          categoryName,
        );
        const chosen = pickCraftsman(relevantCraftsmen, activeTab);
        const price = getCategoryPriceRange(relevantCraftsmen, categoryName);

        if (!chosen) return null;

        const categoryMeta = getCategoryMeta(categoryName);

        return {
          id: `${categoryMeta.id || normalizeText(categoryName)}-${index}`,
          categoryId: categoryMeta.id,
          categoryName,
          title: categoryName,
          rating: Number(chosen?.rating || 0),
          priceFrom: price.from,
          priceTo: price.to,
          name: chosen?.fullName || "حرفي غير محدد",
          image: categoryMeta.image,
          craftsmanId: chosen?.id ?? null,
          yearsOfExperience: chosen?.yearsOfExperience ?? null,
          isVerified: !!chosen?.isVerified,
          craftsmanObj: chosen,
          cityName: chosen?.cityName || "",
          areaName: chosen?.areaName || "",
          completedOrdersCount: Number(chosen?.completedOrdersCount || 0),
        };
      })
      .filter(Boolean);
  }, [craftsmen, activeTab]);

  const errorMsg = isError && (error?.message || "صار خطأ أثناء جلب الحرفيين");

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
          <TabButton icon onClick={() => setActiveTab("top")}>
            الأعلى تقييم
          </TabButton>

          <TabButton onClick={() => setActiveTab("recommended")}>
            الخدمات الموصى بها لك
          </TabButton>
        </div>

        {isLoading && (
          <div className="mt-10 text-center font-bold text-[#1E1855]">
            جاري تحميل البيانات...
          </div>
        )}

        {!isLoading && errorMsg && (
          <div className="mt-10 text-center font-bold text-red-600">
            {errorMsg}
          </div>
        )}

        {!isLoading && !errorMsg && (
          <>
            <div className="mt-8 grid grid-cols-1 min-[840px]:grid-cols-2 gap-6">
              {cards.map((card) => (
                <ServiceCard
                  key={card.id}
                  card={card}
                  onOpen={() => navigate(`/services/${card.craftsmanId}`)}
                  onBook={() => {
                    console.log("Book:", {
                      craftsmanId: card.craftsmanId,
                      categoryId: card.categoryId,
                      categoryName: card.categoryName,
                    });
                  }}
                />
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => navigate("/services")}
                className={[
                  "group inline-flex items-center gap-2",
                  "px-7 h-12 rounded-xl",
                  "bg-white text-[#1E1855] font-extrabold text-lg",
                  "ring-1 ring-[#EAEAEA] shadow-[0_10px_22px_rgba(0,0,0,0.08)]",
                  "transition-all duration-300",
                  "hover:bg-[#1E1855] hover:text-white hover:shadow-[0_14px_30px_rgba(0,0,0,0.15)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d75b19]/60",
                ].join(" ")}
              >
                اكتشف خدمات أكثر
                <ChevronLeft className="h-5 w-5 animate-nudge-left group-hover:animate-none group-hover:-translate-x-2 transition-transform duration-300" />
                <style>{`
                  @keyframes nudgeLeft {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(-8px); }
                  }
                  .animate-nudge-left {
                    animation: nudgeLeft 1.2s ease-in-out infinite;
                  }
                `}</style>
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function TabButton({ children, icon = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "h-14 w-full sm:w-[360px] rounded-xl bg-white px-6",
        "ring-1 ring-[#EAEAEA] shadow-[0_10px_22px_rgba(0,0,0,0.08)]",
        "flex items-center justify-center",
        "text-[#1E1855]",
      ].join(" ")}
    >
      <span className="flex items-center gap-2 font-extrabold text-lg">
        {children}
        {icon && <Star className="h-5 w-5 fill-[#d75b19] text-[#d75b19]" />}
      </span>
    </button>
  );
}


function ServiceCard({ card, onBook, onOpen }) {
  const navigate = useNavigate();

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpen();
      }}
      className={[
        "rounded-3xl bg-[#E8E9E8] p-6 sm:p-7 cursor-pointer",
        "transition hover:shadow-[0_12px_34px_rgba(0,0,0,0.12)] active:scale-[0.99]",
        "outline-none focus-visible:ring-2 focus-visible:ring-[#d75b19]/60",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1 mt-10 mr-5">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E1855] leading-snug">
            {card.title}
          </h3>

          <div className="mt-2 text-[#1E1855] opacity-80 font-semibold">
            {card.areaName}
            {card.areaName && card.cityName ? " - " : ""}
            {card.cityName}
          </div>

          <div className="mt-3 flex items-center gap-3 text-[#1E1855]">
            <span className="font-extrabold text-xl">
              {Number(card.rating || 0).toFixed(1)}
            </span>
            <StarsRow rating={card.rating} />
          </div>

          {card.priceFrom !== null && card.priceTo !== null && (
            <div className="mt-4 text-lg sm:text-xl text-[#1E1855] font-bold">
              السعر:{" "}
              <span dir="ltr" className="font-extrabold text-xl">
                {card.priceFrom}-{card.priceTo}
              </span>{" "}
              ج م
            </div>
          )}

          <div className="flex items-center gap-4 mt-5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/service-request/", {
                  state: { craftsman: card.craftsmanObj },
                });
                onBook();
              }}
              className="h-12 px-6 rounded-xl bg-[#d75b19] text-white text-sm sm:text-base font-extrabold hover:bg-[#1E1855] transition whitespace-nowrap"
            >
              احجز الآن
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpen();
              }}
              className="h-12 px-6 rounded-xl bg-[#1E1855] text-white text-sm sm:text-base font-extrabold hover:bg-[#d75b19] transition whitespace-nowrap"
            >
              عرض الملف
            </button>
          </div>
        </div>

        <div className="shrink-0 text-center flex flex-col items-center">
          <div
            className="rounded-2xl bg-white overflow-hidden
                       w-[140px] h-[130px]
                       sm:w-[210px] sm:h-[180px]
                       md:w-[200px] md:h-[200px] lg:w-[230px] lg:h-[230px]
                       shadow-[0_8px_20px_rgba(0,0,0,0.08)] mb-4"
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = "/unknown.jpg";
              }}
            />
          </div>

          <div className="text-lg sm:text-xl text-[#1E1855] font-extrabold leading-none">
            {card.name}
          </div>
        </div>
      </div>
    </div>
  );
}
