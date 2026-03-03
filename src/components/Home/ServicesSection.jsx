import React, { useMemo, useState } from "react";
import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ENDPOINTS = {
  craftsmen: `${API_BASE_URL}/api/Craftsmen`,
  categories: `${API_BASE_URL}/api/ServiceCategory`,
};

function categoryImageByName(name) {
  const n = (name || "").trim();
  const map = {
    سباكة: "/workers/plumber.png",
    كهرباء: "/workers/electric.png",
    نجارة: "/workers/najjar.png",
    دهانات: "/workers/paint.png",
    "دهان منازل": "/workers/paint.png",
    تكييف: "/workers/ac.png",
    صيانة: "/workers/maintenance.png",
    "تركيب ابواب": "/workers/najjar.png",
  };
  return map[n] || "/workers/worker-default.png";
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

function makePriceRange(categoryId) {
  const base = 100 + (categoryId % 6) * 50;
  return { from: base, to: base + 80 };
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

    if (mode === "top") {
      if (br !== ar) return br - ar;
      if (by !== ay) return by - ay;
      return bv - av;
    }

    if (bv !== av) return bv - av;
    if (by !== ay) return by - ay;
    return br - ar;
  });

  return sorted[0];
}

function filterCraftsmenForCategory(craftsmen) {
  return craftsmen;
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

function useCategories() {
  return useQuery({
    queryKey: ["serviceCategories"],
    queryFn: () => fetchJson(ENDPOINTS.categories),
    staleTime: 60_000,
  });
}

function useCraftsmen() {
  return useQuery({
    queryKey: ["craftsmen"],
    queryFn: () => fetchJson(ENDPOINTS.craftsmen),
    staleTime: 60_000,
  });
}

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState("top");
  const wantedNames = ["سباكة", "كهرباء", "نجارة", "دهانات"];

  const {
    data: categoriesRaw,
    isLoading: catLoading,
    isError: catIsError,
    error: catError,
  } = useCategories();

  const {
    data: craftsmenRaw,
    isLoading: craftsLoading,
    isError: craftsIsError,
    error: craftsError,
  } = useCraftsmen();

  const categories = Array.isArray(categoriesRaw) ? categoriesRaw : [];
  const craftsmen = Array.isArray(craftsmenRaw) ? craftsmenRaw : [];

  const loading = catLoading || craftsLoading;
  const errorMsg =
    (catIsError && (catError?.message || "صار خطأ أثناء جلب التصنيفات")) ||
    (craftsIsError && (craftsError?.message || "صار خطأ أثناء جلب الحرفيين")) ||
    "";

  const cards = useMemo(() => {
    const byName = new Map(
      (categories || []).map((c) => [(c?.name || "").trim(), c])
    );

    const selectedCats = wantedNames
      .map((n) => byName.get(n))
      .filter(Boolean)
      .slice(0, 4);

    return selectedCats.map((cat) => {
      const price = makePriceRange(cat.id);
      const relevantCrafts = filterCraftsmenForCategory(craftsmen, cat);
      const chosen = pickCraftsman(relevantCrafts, activeTab);

      return {
        id: cat.id,
        title: cat.name,
        description: cat.description,
        rating: Number(chosen?.rating || 0),
        priceFrom: price.from,
        priceTo: price.to,
        name: chosen?.fullName || "حرفي غير محدد",
        image: categoryImageByName(cat.name),
        craftsmanId: chosen?.id ?? null,
        yearsOfExperience: chosen?.yearsOfExperience ?? null,
        isVerified: !!chosen?.isVerified,
      };
    });
  }, [categories, craftsmen, activeTab]);

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

        {loading && (
          <div className="mt-10 text-center font-bold text-[#1E1855]">
            جاري تحميل البيانات...
          </div>
        )}

        {!loading && errorMsg && (
          <div className="mt-10 text-center font-bold text-red-600">
            {errorMsg}
            <div className="mt-2 text-sm font-semibold text-[#1E1855] opacity-80">
              Endpoint التصنيفات: {ENDPOINTS.categories}
            </div>
            <div className="mt-1 text-sm font-semibold text-[#1E1855] opacity-80">
              Endpoint الحرفيين: {ENDPOINTS.craftsmen}
            </div>
          </div>
        )}

        {!loading && !errorMsg && (
          <div className="mt-8 grid grid-cols-1 min-[840px]:grid-cols-2 gap-6">
            {cards.map((card) => (
              <ServiceCard
                key={card.id}
                card={card}
                onBook={() => {
                  console.log("Book:", {
                    categoryId: card.id,
                    craftsmanId: card.craftsmanId,
                  });
                }}
              />
            ))}
          </div>
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

function ServiceCard({ card, onBook }) {
  return (
    <div className="rounded-3xl bg-[#E8E9E8] p-6 sm:p-7">
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E1855] leading-snug">
            {card.title}
          </h3>
          {card.description && (
            <div className="mt-2 text-[#1E1855] opacity-80 font-semibold">
              {card.description}
            </div>
          )}

          <div className="mt-3 flex items-center gap-3 text-[#1E1855]">
            <span className="font-extrabold text-xl">
              {Number(card.rating || 0).toFixed(1)}
            </span>
            <StarsRow rating={card.rating} />
          </div>

          <div className="mt-3 text-[#1E1855] font-bold">
            <span className="opacity-80">الحرفي:</span>{" "}
            <span className="font-extrabold">{card.name}</span>
            {card.isVerified ? (
              <span className="ms-2 inline-block rounded-lg bg-white px-2 py-1 text-sm font-extrabold text-[#1E1855]">
                موثّق
              </span>
            ) : null}
          </div>

          {card.yearsOfExperience != null && (
            <div className="mt-2 text-[#1E1855] font-bold opacity-90">
              سنوات الخبرة:{" "}
              <span className="font-extrabold">{card.yearsOfExperience}</span>
            </div>
          )}

          <div className="mt-4 text-lg sm:text-xl text-[#1E1855] font-bold">
            السعر:{" "}
            <span dir="ltr" className="font-extrabold text-xl">
              {card.priceFrom}-{card.priceTo}
            </span>{" "}
            ج م
          </div>

          <button
            type="button"
            onClick={onBook}
            className="mt-5 h-12 px-8 rounded-xl bg-[#d75b19] text-white text-md sm:text-lg font-extrabold hover:bg-[#1E1855] transition"
          >
            احجز الآن
          </button>
        </div>

        <div className="shrink-0 text-center flex flex-col items-center">
          <div
            className="rounded-2xl bg-white overflow-hidden
                       w-[140px] h-[130px]
                       sm:w-[210px] sm:h-[180px]
                       md:w-[270px] md:h-[200px] lg:w-[230px] lg:h-[230px]
                       shadow-[0_8px_20px_rgba(0,0,0,0.08)] mb-6"
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
