import { useNavigate } from "react-router-dom";

export default function LandingHero() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-[#F5F5F5] pt-20">
      <div className="mx-auto w-full max-w-[1400px] px-4">
        <div className="relative h-[calc(100vh-80px)] w-full overflow-hidden">
          <img
            src="/landing1.png"
            alt="hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="w-full max-w-[560px] rounded-2xl bg-white/60 backdrop-blur-sm px-6 py-7 text-center shadow-[0_18px_60px_rgba(0,0,0,0.22)] md:px-10 md:py-9">
              <h1 className="text-2xl font-extrabold leading-snug text-black md:text-3xl">
                هل تبحث عن حرفي موثوق ؟
              </h1>

              <p className="mt-3 text-sm leading-relaxed text-[#3C3C3C] md:text-base">
                موقع خدماتك يوفر لك أفضل الحرفيين
                <br className="hidden md:block" />
                في منطقتك بسرعة وأسعار مناسبة.
              </p>

              <button
                type="button"
                onClick={() => navigate("/craftman-results")}
                className="cursor-pointer mt-5 h-11 rounded-xl bg-[#D75B19] px-8 text-white text-2xl font-extrabold shadow-[0_10px_20px_rgba(215,91,25,0.28)] hover:bg-[#1E1855] transition"
              >
                اطلب حرفي الآن
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
