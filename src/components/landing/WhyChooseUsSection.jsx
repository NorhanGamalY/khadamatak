import { Check } from "lucide-react";

const points = [
  "حرفيون مختارون بعناية.",
  "سرعة في الوصول وتنفيذ الخدمة.",
  "أسعار واضحة دون أي مفاجآت.",
  "تقييمات حقيقية من العملاء.",
];

export default function WhyChooseUsSection() {
  return (
    <section dir="rtl" className="bg-white py-14">
      <div className="mx-auto w-full max-w-[1400px] px-4">
        <div className="flex flex-col items-center justify-between gap-10 lg:flex-row">
          <div className="w-full lg:w-[48%] flex justify-center">
            <div className="w-full max-w-[520px] rounded-2xl bg-[#E9E8EE] px-5 py-8 shadow-[0_16px_40px_rgba(0,0,0,0.12)] text-center flex flex-col items-center">
              <h3 className="text-2xl sm:text-4xl font-extrabold text-[#1D1F1C]">
                لماذا تختار خدماتك ؟
              </h3>
              <ul className="mt-6 space-y-4">
                {points.map((text, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-[#2B2B2B]"
                  >
                    <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D75B19]">
                      <Check className="h-4 w-4 text-white" />
                    </span>

                    <span className="text-sm sm:text-base font-semibold leading-relaxed">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full lg:w-[45%] flex justify-center">
            <div className="w-full max-w-[560px] overflow-hidden rounded-2xl">
              <img
                src="Frame 2147228542.png"
                alt="لماذا تختار خدماتك"
                className="w-full object-cover h-[320px] sm:h-[420px] lg:h-[650px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
