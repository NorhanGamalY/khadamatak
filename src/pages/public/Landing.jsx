import React from "react";
import { FaChevronCircleRight } from "react-icons/fa";

export default function Landing() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* الصورة */}
      <div className="w-full relative overflow-hidden h-[900px]  ">
        <img
          src="/landing.png"
          alt="Landing"
          className="absolute top-1/2 left-1/2 
-translate-x-1/2 -translate-y-1/2 
 object-cover my-20 h-full  "
        />
      </div>

      {/* السكشن */}
      <div className="flex flex-col lg:flex-row justify-around items-center px-4 mt-10 gap-10 "
>
        {/* العمود الأول */}
        <div className="w-[320px] bg-gray-400 rounded-3 p-5">
          <h1 className="text-2xl font-bold mb-4">لماذا تختار خدمتك ؟</h1>

          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <FaChevronCircleRight />
              <p>حرفيون مختارون بعناية</p>
            </li>

            <li className="flex items-center gap-2">
              <FaChevronCircleRight />
              <p>سرعة في التوصيل وتنفيذ الخدمة</p>
            </li>

            <li className="flex items-center gap-2">
              <FaChevronCircleRight />
              <p>أسعار واضحة دون أي مفاجآت</p>
            </li>

            <li className="flex items-center gap-2">
              <FaChevronCircleRight />
              <p>تقييمات حقيقية من العملاء</p>
            </li>
          </ul>
        </div>


        <div className="w-[490px] h-full">
          <img src="/landinggg.png" className="w-full h-full object-cover" alt="Frame" />
        </div>

      
      
      </div>
    </div>
  );
}
