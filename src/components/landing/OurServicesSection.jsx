import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getServiceCategories } from "../../api/servicesCategory";
import { Link } from "react-router-dom";

const imageByName = {
  "سباكة": "/home-services/Frame 34.png",
  "كهرباء": "/home-services/Frame 34 (1).png",
  "نجارة": "/home-services/Frame 34 (2).png",
  "صيانة": "/home-services/Frame 34 (3).png",
  "دهانات": "/home-services/Frame 34 (4).png",
  "تكييف": "/home-services/Frame 34 (5).png",
};

const FALLBACK_IMAGE = "/home-services/Frame 34.png";

export default function OurServicesSection() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["serviceCategories"],
    queryFn: getServiceCategories,
  });

  return (
    <section dir="rtl" className="bg-white py-14">
      <div className="mx-auto w-full max-w-[1400px] px-4">
        <div className="text-center">
          <p className="text-2xl font-semibold text-[#1E1855]">خدماتنا</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#1E1855]">
            نقدم مجموعة متكاملة من الخدمات منها
          </h2>
        </div>

        {isLoading && (
          <div className="mt-10 text-center text-[#1E1855] font-semibold">
            جاري تحميل الخدمات...
          </div>
        )}

        {isError && (
          <div className="mt-10 text-center text-red-600 font-semibold">
            حدث خطأ أثناء جلب الخدمات
          </div>
        )}

        {!isLoading && !isError && (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data?.map((item) => (
              <ServiceCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ServiceCard({ item }) {
  const title = item.name;
  const image = imageByName[title] || FALLBACK_IMAGE;

  return (
    <div className="overflow-hidden bg-white">
      <div className="relative w-full aspect-[1]">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="flex items-center justify-between gap-4 bg-white px-4 py-4">
        <div className="text-3xl font-extrabold text-[#1E1855]">{title}</div>

        <Link
          to={`/services?categoryId=${item.id}`}
          className="inline-flex items-center justify-center rounded-lg bg-[#D75B19] px-4 py-3 lg:text-2xl text-lg font-extrabold text-white hover:bg-[#1E1855] transition"
        >
          اطلب الخدمة
        </Link>
      </div>
    </div>
  );
}