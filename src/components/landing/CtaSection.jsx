import React from "react";
import { useNavigate } from 'react-router-dom'

export default function CtaSection() {
  const navigate = useNavigate();
  return (
    <section dir="rtl" className="bg-white py-14">
      <div className="mx-auto w-full max-w-[1400px] px-4">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="text-center ">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E1855] leading-relaxed">
              لا تدع مشاكل المنزل تتراكم
            </h3>

            <p className="mt-3 text-lg sm:text-xl font-semibold text-[#1E1855] leading-relaxed">
              اطلب <span className="text-[#A14413] ">الحرفي </span> الآن واستمتع
              براحة البال
            </p>

            <div className="mt-25 flex justify-center lg:justify-center">
              <button onClick={() => navigate("/services")}
                className="inline-flex h-12 w-full max-w-[560px] items-center justify-center rounded-full bg-[#1E1855] px-8 text-base sm:text-lg font-extrabold text-white shadow-[0_12px_22px_rgba(30,24,85,0.25)] transition hover:bg-[#D75B19]"
              >
                اطلب الخدمة
              </button>
            </div>
          </div>
          <div className="relative flex justify-center ">
            <div className="w-full max-w-[400px] overflow-hidden">
              <div className="rounded-2xl relative aspect-[100/99] w-full">
                <img
                  src="/cta/istockphoto-1516511531-1024x1024%201.png"
                  alt="صيانة"
                  className="absolute inset-0 h-full w-full object-cover rounded-2xl"
                />
              </div>

              <div className="relative aspect-[4/3] w-full">
                <img
                  src="/cta/pexels-freestocks-1083931%201.png"
                  alt="طلب الخدمة"
                  className="absolute top-[-30px] inset-0 h-full w-full object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
