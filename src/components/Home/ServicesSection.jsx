import React, { useMemo, useState } from "react";
import { Star, ChevronLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://herafie.runasp.net";

const ENDPOINTS = {
  craftsmen: `${BASE_URL}/api/Craftsmen`,
};

const WANTED_CATEGORIES = ["سباكة", "كهرباء", "نجارة", "دهانات"];

function getCategoryMeta(categoryName) {
  const name = (categoryName || "").trim();

  if (name.includes("سباك")) return { id: 1 };
  if (name.includes("كهرب")) return { id: 2 };
  if (name.includes("نجار") || name.includes("ابواب")) return { id: 3 };
  if (name.includes("دهان")) return { id: 4 };
  if (name.includes("تكييف")) return { id: 5 };
  if (name.includes("صيانة")) return { id: 6 };

  return { id: 0 };
}

function normalizeText(value) {
  return (value || "").trim().toLowerCase();
}

function matchesWantedCategory(categoryName) {
  const name = (categoryName || "").trim();
  return WANTED_CATEGORIES.some((wanted) => {
    if (wanted === "سباكة") return name.includes("سباك");
    if (wanted === "كهرباء") return name.includes("كهرب");
    if (wanted === "نجارة") return name.includes("نجار") || name.includes("ابواب");
    if (wanted === "دهانات") return name.includes("دهان");
    return false;
  });
}

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
    const categoryName = (
      service?.serviceCategoryName ||
      service?.serviceCategoreyName ||
      ""
    ).trim();

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
    .filter((service) => {
      const svcCategory =
        service?.serviceCategoryName || service?.serviceCategoreyName || "";
      return (
        normalizeText(svcCategory) === target && Number(service?.price) > 0
      );
    })
    .map((service) => Number(service.price));

  if (!prices.length) return { from: null, to: null };

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

  const matchedWanted = Array.from(allCategories.values()).filter(
    (categoryName) => matchesWantedCategory(categoryName),
  );

  const remaining = Array.from(allCategories.values()).filter(
    (categoryName) => !matchesWantedCategory(categoryName),
  );

  return [...matchedWanted, ...remaining].slice(0, 4);
}

async function fetchJson(url) {
  const token = localStorage.getItem("token");

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
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
        const relevantCraftsmen = getCraftsmenByCategory(craftsmen, categoryName);
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
          profilePicture: chosen?.profilePicture || null,
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
          <TabButton
            icon
            active={activeTab === "top"}
            onClick={() => setActiveTab("top")}
          >
            الأعلى تقييم
          </TabButton>

          <TabButton
            active={activeTab === "recommended"}
            onClick={() => setActiveTab("recommended")}
          >
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

function TabButton({ children, icon = false, active = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "h-14 w-full sm:w-[360px] rounded-xl px-6",
        "ring-1 shadow-[0_10px_22px_rgba(0,0,0,0.08)]",
        "flex items-center justify-center transition-all duration-200",
        active
          ? "bg-[#1E1855] text-white ring-[#1E1855]"
          : "bg-white text-[#1E1855] ring-[#EAEAEA] hover:ring-[#1E1855]",
      ].join(" ")}
    >
      <span className="flex items-center gap-2 font-extrabold text-lg">
        {children}
        {icon && (
          <Star
            className={`h-5 w-5 ${active ? "fill-white text-white" : "fill-[#d75b19] text-[#d75b19]"}`}
          />
        )}
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
      className="
        bg-[#E8E9E8]
        rounded-3xl
        p-6
        md:mx-15
        lg:mx-0
        shadow-[0_10px_25px_rgba(0,0,0,0.08)]
        transition
        hover:shadow-[0_14px_40px_rgba(0,0,0,0.12)]
        active:scale-[0.99]
        cursor-pointer
      "
    >
      <div className="grid gap-6 items-center lg:grid-cols-[1fr_220px]">
        <div className="flex justify-center lg:order-2">
          <div className="w-full max-w-[300px] lg:max-w-[200px] aspect-square rounded-2xl bg-white overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
            {card.profilePicture ? (
              <img
                src={card.profilePicture}
                alt={card.name}
                className="w-full h-full object-cover transition duration-300 hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextSibling.style.display = "flex";
                }}
              />
            ) : null}
            <div
              className="w-full h-full items-center justify-center bg-gray-100 text-4xl font-bold text-[#1E1855]"
              style={{ display: card.profilePicture ? "none" : "flex" }}
            >
              {(card.name || "؟").charAt(0)}
            </div>
          </div>
        </div>

        <div className="text-center lg:text-right lg:order-1">
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#1E1855]">
            {card.title}
          </h3>

          <div className="mt-2 text-[#1E1855] opacity-80 font-semibold">
            {card.areaName}
            {card.areaName && card.cityName ? " - " : ""}
            {card.cityName}
          </div>

          <div className="mt-3 flex items-center justify-center lg:justify-start gap-3">
            <span className="font-extrabold text-lg">
              {Number(card.rating || 0).toFixed(1)}
            </span>
            <StarsRow rating={card.rating} />
          </div>

          {card.priceFrom !== null && card.priceTo !== null && (
            <div className="mt-4 text-lg text-[#1E1855] font-bold">
              السعر
              <span dir="ltr" className="mx-2 text-sm font-extrabold">
                {card.priceFrom}-{card.priceTo}
              </span>
              ج م
            </div>
          )}

          <div className="mt-3 text-lg font-extrabold text-[#1E1855]">
            {card.name}
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/service-request/", {
                  state: { craftsman: card.craftsmanObj },
                });
                onBook();
              }}
              className="px-6 h-11 rounded-xl bg-[#d75b19] text-white font-bold hover:bg-[#1E1855] transition"
            >
              احجز الآن
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpen();
              }}
              className="px-6 h-11 rounded-xl bg-[#1E1855] text-white font-bold hover:bg-[#d75b19] transition"
            >
              عرض الملف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}