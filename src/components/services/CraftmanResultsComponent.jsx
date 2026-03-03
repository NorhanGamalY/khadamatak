import React, { useMemo, useState } from "react";
import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const DEFAULT_AVATAR = "";

export default function CraftsmanResultsSection() {
  const [governorate, setGovernorate] = useState("");
  const [sortBy, setSortBy] = useState("topRated");

  const imageByName = useMemo(
    () => ({
      1: "/workers/najjar.png",
      2: "/workers/paint.png",
      3: "/workers/Frame 2147228572.png",
    }),
    [],
  );

  function getCraftsmanImage(fullName) {
    return imageByName[fullName] || DEFAULT_AVATAR;
  }

  function onViewProfile(item) {
    console.log("View profile:", item);
  }

  const { data, isLoading } = useQuery({
    queryKey: ["craftsmen"],
    queryFn: async () => {
      const res = await fetch("https://herafie.runasp.net/api/Craftsmen");
      if (!res.ok) throw new Error("Failed to fetch craftsmen");
      return res.json();
    },
  });

  const list = Array.isArray(data) ? data : data?.data || [];

  const governorates = useMemo(() => {
    const set = new Set(list.map((x) => x?.governorate).filter(Boolean));
    return Array.from(set);
  }, [list]);

  const results = useMemo(() => {
    let next = [...list];

    if (governorate) {
      next = next.filter((x) => String(x?.governorate || "") === governorate);
    }

    if (sortBy === "topRated") {
      next.sort((a, b) => Number(b?.rating || 0) - Number(a?.rating || 0));
    } else if (sortBy === "newest") {
      next.sort((a, b) => Number(b?.id || 0) - Number(a?.id || 0));
    }

    return next;
  }, [list, governorate, sortBy]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <section dir="rtl" className="w-full mt-25 py-14">
      <div className="mx-auto w-full max-w-[1100px] px-4">
        <h2 className="text-center text-[28px] sm:text-[34px] font-extrabold text-black">
          نتائج الحرفيين
        </h2>

        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-center">
          <button
            type="button"
            className="w-full md:w-[260px] h-[52px] bg-[#D75B19] text-white text-[18px] font-extrabold shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition hover:bg-[#1E1855] active:scale-[0.98]"
          >
            اعرض النتائج
          </button>

          <div className="w-full md:w-[260px]">
            <select
              value={governorate}
              onChange={(e) => setGovernorate(e.target.value)}
              className="w-full h-[52px] border border-[#E5E5E5] bg-white px-4 text-[#1E1855] font-extrabold shadow-[0_8px_20px_rgba(0,0,0,0.10)] focus:outline-none"
            >
              <option value="">اختر المحافظه</option>
              {governorates.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full md:w-[260px]">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full h-[52px] border border-[#E5E5E5] bg-white px-4 text-[#1E1855] font-extrabold shadow-[0_8px_20px_rgba(0,0,0,0.10)] focus:outline-none"
            >
              <option value="topRated">الاعلى تقييم</option>
            </select>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          {results.length === 0 ? (
            <div className="text-center text-[#6B6B6B] font-bold py-10">
              لا توجد نتائج مطابقة للفلاتر الحالية
            </div>
          ) : (
            results
              .slice(0, 3)
              .map((item) => (
                <CraftsmanCard
                  key={item.id}
                  item={item}
                  onViewProfile={onViewProfile}
                  getCraftsmanImage={getCraftsmanImage}
                />
              ))
          )}
        </div>
      </div>
    </section>
  );
}

function Stars({ rating }) {
  const r = Number(rating || 0);
  const full = Math.floor(r);
  const frac = r - full;
  const hasHalf = frac >= 0.5;

  return (
    <div className="flex items-center gap-2">
      <span className="text-[#1E1855] font-bold">{r.toFixed(1)}</span>
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => {
          const idx = i + 1;
          const isFull = idx <= full;
          const isHalf = idx === full + 1 && hasHalf;

          if (isHalf) {
            return (
              <span key={i} className="relative inline-flex h-5 w-5">
                <Star className="h-5 w-5 text-[#F3C6AE]" fill="currentColor" />
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: "50%" }}
                >
                  <Star
                    className="h-5 w-5 text-[#D75B19]"
                    fill="currentColor"
                  />
                </span>
              </span>
            );
          }

          return (
            <Star
              key={i}
              className={
                isFull ? "h-5 w-5 text-[#D75B19]" : "h-5 w-5 text-[#F3C6AE]"
              }
              fill="currentColor"
            />
          );
        })}
      </div>
    </div>
  );
}

function CraftsmanCard({ item, onViewProfile, getCraftsmanImage }) {
  return (
    <div className="bg-white border border-[#EAEAEA] shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-6 p-4 sm:p-6">
        <div className="order-2 md:order-1 flex-1 text-right md:mx-6">
          <h3 className="text-[22px] sm:text-[26px] font-extrabold text-[#1E1855]">
            {item.fullName}
          </h3>

          <div className="mt-2">
            <Stars rating={item.rating} />
          </div>

          <p className="mt-3 text-[16px] sm:text-[18px] font-extrabold text-[#1E1855]">
            {item.bio}
          </p>

          <div className="mt-5 flex md:block">
            <button
              type="button"
              onClick={() => onViewProfile(item)}
              className="w-full md:w-auto inline-flex items-center justify-center rounded-md bg-[#D75B19] px-10 py-3 text-[16px] font-extrabold text-white transition hover:bg-[#1E1855] active:scale-[0.98]"
            >
              عرض الملف
            </button>
          </div>
        </div>

        <div className="order-1 md:order-2 shrink-0">
          <div className="w-full md:w-[370px] rounded-xl overflow-hidden bg-[#F3F3F3] aspect-[16/10] sm:aspect-[16/9] md:aspect-auto md:h-[280px]">
            <img
              src={getCraftsmanImage(item.id)}
              alt={item.fullName}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = DEFAULT_AVATAR;
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
