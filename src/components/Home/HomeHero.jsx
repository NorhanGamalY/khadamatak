import React from "react";

export default function HomeHero() {
  return (
    <section dir="rtl" className="w-full bg-[#F5F5F5] pt-20">
      <div className="mx-auto w-full max-w-[1400px] px-4">
        <div className="relative h-[calc(100vh-80px)] w-full overflow-hidden">
          <img
            src="/landing1.png"
            alt="hero"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="pointer-events-none absolute inset-0 top-[-200px] z-10 flex items-center justify-center px-4 mb-15">
            <div className="w-full max-w-[750px] rounded-2xl bg-white/60 backdrop-blur-sm p-6 sm:p-8 md:p-10 text-center shadow-xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black leading-snug">
                هنا يوجد حرفيون موثوقين
              </h1>

              <p className="mt-4 sm:mt-5 text-base sm:text-lg leading-relaxed text-[#3C3C3C]">
                موقع خدماتك يوفر لك أفضل الحرفيين
                <br className="hidden sm:block" />
                في منطقتك بسرعة وأسعار مناسبة.
              </p>
            </div>
          </div>

          <div className="absolute left-1/2 bottom-8 z-20 -translate-x-1/2 w-full max-w-[640px] px-4">
            <div className="rounded-2xl bg-white px-6 sm:px-10 py-6 shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="text-right">
                  <label className="block text-sm text-gray-600 font-bold mb-2">
                    نوع الخدمة
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#808080]"
                    placeholder="اكتب نوع خدمتك"
                  />
                </div>

                <div className="text-right">
                  <label className="block text-sm text-gray-600 font-bold mb-2">
                    المحافظة
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#808080]"
                    placeholder="اكتب محافظتك"
                  />
                </div>
              </div>

              <button
                type="button"
                className="mt-6 w-full rounded-xl bg-[#d75b19] py-3 text-white font-bold hover:bg-[#1E1855] transition"
              >
                بحث
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
