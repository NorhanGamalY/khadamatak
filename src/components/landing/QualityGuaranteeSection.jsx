import React from "react";

const guarantees = [
  {
    id: 1,
    title: "ضمان الخدمة",
    desc: "نضمن لك جودة الخدمة أو استرجاع حقك",
    image: "/quality/branding 1.png",
  },
  {
    id: 2,
    title: "دعم فني متواصل",
    desc: "فريق دعم جاهز لمساعدتك على مدار الساعة",
    image: "/quality/optimizing 1.png",
  },
  {
    id: 3,
    title: "مراجعة دقيقة",
    desc: "نراجع جميع الحرفيين بدقة قبل اعتمادهم على المنصة",
    image: "/quality/check 1.png",
  },
];

export default function QualityGuaranteeSection() {
  return (
    <section dir="rtl" className="bg-white py-14">
      <div className="mx-auto w-full max-w-[1400px] px-4">
        <div className="rounded-2xl bg-white shadow-[0_14px_35px_rgba(0,0,0,0.12)] px-6 py-10 md:px-10">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1855]">
              ضمان جودتنا
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#6C6C6C]">
              نضمن الأمان + الموثوقية
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-6">
            {guarantees.map((g) => (
              <div
                key={g.id}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <GuaranteeCard item={g} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GuaranteeCard({ item }) {
  return (
    <div className=" bg-white shadow-[0_10px_25px_rgba(0,0,0,0.18)] px-6 py-10 text-center">
      <div className="mx-auto mb-5 grid h-16 w-16 place-items-center">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-contain"
          draggable="false"
        />
      </div>

      <h3 className="text-xl font-extrabold text-[#1E1855]">{item.title}</h3>

      <p className="mt-3 mx-10 text-lg leading-relaxed text-[#6C6C6C] font-semibold">
        {item.desc}
      </p>
    </div>
  );
}
