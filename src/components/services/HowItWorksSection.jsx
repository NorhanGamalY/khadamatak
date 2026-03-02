export default function HowItWorksSection() {
  const steps = [
    { text: "يصلك حرفى محترف\nفى الموعد" },
    { text: "حدد موقعك\nوالوقت المناسب" },
    { text: "اختر الخدمه التى\nتحتاجها" },
  ];

  return (
    <section dir="rtl" className="w-full bg-white py-20">
      <div className="mx-auto w-full max-w-[1200px] px-4 ">
        <h2 className="text-center text-[28px] md:text-[36px] font-extrabold text-[#1E1855]">
          كيف يعمل الموقع؟
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3 ">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-sm px-6 py-10 text-center
                         shadow-[0_10px_25px_rgba(0,0,0,0.18)] hover:scale-[1.05] transition"
            >
              <p className="whitespace-pre-line text-[22px] md:text-[28px] font-extrabold leading-snug text-[#1E1855]">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
