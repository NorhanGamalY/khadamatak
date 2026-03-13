function OverlayBanner({ bgImage, accent, text }) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl h-[90px] sm:h-[110px] md:h-[120px]">
      <img
        src={bgImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <p className="text-center text-white text-xl md:text-2xl font-medium">
          <span className="text-[#F97316] font-bold">{accent} :</span>{" "}
          <span className="text-sm md:text-lg">{text}</span>
        </p>
      </div>
    </div>
  );
}

export default function VisionMissionBanners() {
  return (
    <section dir="rtl" className="w-full my-10">
      <div className="mx-auto w-full max-w-[1200px] px-4">
        <div className="space-y-5">
          <OverlayBanner
            bgImage="about/Frame 2147228580.png"
            accent="الرؤية"
            text="أن تكون المنصة الأولى للخدمات المنزلية"
          />
          <OverlayBanner
            bgImage="about/Frame 2147228581.png"
            accent="الرسالة"
            text="تسهيل طلب الخدمات بجودة مضمونة"
          />
        </div>
      </div>
    </section>
  );
}
