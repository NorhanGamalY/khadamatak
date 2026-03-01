export default function AboutHero() {
  return (
    <section dir="rtl" className="w-full pt-20 my-10">
      <div className="mx-auto w-full max-w-[1200px] px-4">
        <h1 className="text-center text-3xl font-bold text-[#1A1A1A] my-14">
          من نحن ؟
        </h1>

        <div className="space-y-20">
          <div className="relative flex flex-col lg:flex-row items-center gap-6">
            <div className="w-full h-100 lg:w-1/2 order-2 lg:order-1">
              <img
                src="about/Frame 1.png"
                alt="حرفي"
                className="w-full h-[350px] lg:h-[400px] rounded-2xl object-cover shadow-sm"
              />
            </div>

            <div className="w-full lg:w-1/2 order-1 lg:order-2 relative">
              <div
                className="
                  bg-white rounded-2xl shadow-2xl
                  p-10 sm:p-16 text-center md:text-right
                  lg:absolute lg:right-[-45px] lg:top-1/2 lg:-translate-y-1/2
                  lg:w-[650px]
                "
              >
                <p className="text-2xl sm:text-3xl  leading-relaxed text-[#1A1A1A]">
                  نحن منصة رقمية تهدف الي ربط المستخدمين بحرفيين معتمدين في
                  مختلف المجالات، مع ضمان الجودة وحماية حقوق جميع الأطراف.
                </p>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col lg:flex-row items-center gap-6">
            <div className="w-full lg:w-1/2 relative">
              <div
                className="
                  bg-white rounded-2xl shadow-2xl
                  p-8 sm:p-10 text-center md:text-right
                  lg:absolute lg:right-0 lg:top-[30px] lg:-translate-y-1/2
                  lg:w-[650px]
                "
              >
                <h2 className="text-3xl lg:text-4xl text-[#1A1A1A] mb-6">
                  لماذا أنشأنا المنصة ؟
                </h2>

                <ul className="space-y-4 text-xl">
                  <li className="flex items-start gap-3">
                    <Check />
                    <span>صعوبة الحصول على حرفي موثوق.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check />
                    <span>عدم وضوح وتفاوت الأسعار.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check />
                    <span>مشاكل الالتزام بالمواعيد.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <img
                src="about/Group 1000011209.png"
                alt="فني"
                className="w-full h-[400px] lg:h-[350px] lg:w-[770px] rounded-2xl object-cover "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Check() {
  return (
    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#F97316] text-white text-sm">
      ✓
    </span>
  );
}
