import React from "react";
import { Link } from "react-router-dom";

const services = [
  {
    id: 1,
    title: "سباكة",
    image: "/home-services/Frame 34.png",
    href: "/services",
  },
  {
    id: 2,
    title: "كهرباء",
    image: "/home-services/Frame 34 (1).png",
    href: "/services",
  },
  {
    id: 3,
    title: "نجارة",
    image: "/home-services/Frame 34 (2).png",
    href: "/services",
  },
  {
    id: 4,
    title: "صيانة",
    image: "/home-services/Frame 34 (3).png",
    href: "/services",
  },
  {
    id: 5,
    title: "تكييف",
    image: "/home-services/Frame 34 (5).png",
    href: "/services",
  },
  {
    id: 6,
    title: "دهانات",
    image: "/home-services/Frame 34 (4).png",
    href: "/services",
  },
];

export default function OurServicesSection() {
  return (
    <section dir="rtl" className="bg-white py-14">
      <div className="mx-auto w-full max-w-[1400px] px-4">
        <div className="text-center">
          <p className="text-2xl font-semibold text-[#1E1855]">خدماتنا</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#1E1855]">
            نقدم مجموعة متكاملة من الخدمات منها
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((item) => (
            <ServiceCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ item }) {
  return (
    <div className="overflow-hidden bg-white">
      <div className="relative w-full aspect-[1]">
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="flex items-center justify-between gap-4 bg-white px-4 py-4">
        <div className="text-3xl font-extrabold text-[#1E1855]">
          {item.title}
        </div>
        <Link
          to={`/services/${item.id}`}
          className="inline-flex h-13 w-50 items-center justify-center rounded-lg bg-[#D75B19] px-4 lg:text-2xl text-lg font-extrabold text-white hover:bg-[#1E1855] transition"
        >
          اطلب الخدمة
        </Link>
      </div>
    </div>
  );
}
