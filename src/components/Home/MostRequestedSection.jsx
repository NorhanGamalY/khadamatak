import { Flame, Star, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mostRequested = [
  {
    id: 1,
    title: "تنظيف منازل",
    metaType: "الأكثر طلباً",
    metaValue: null,
    icon: Zap,
    image: "/most-requested/Group 16.png",
  },
  {
    id: 2,
    title: "سباكة",
    metaType: "طلب",
    metaValue: 1200,
    icon: Flame,
    image: "/most-requested/Group 20.png",
  },
  {
    id: 3,
    title: "صيانة تكييف",
    metaType: "طلب",
    metaValue: 950,
    icon: Star,
    image: "/most-requested/Group 22.png",
  },
  {
    id: 4,
    title: "كهرباء",
    metaType: "طلب",
    metaValue: 800,
    icon: Flame,
    image: "/most-requested/Group 21.png",
  },
  {
    id: 5,
    title: "دهان",
    metaType: "تقييم",
    metaValue: 4.9,
    icon: Star,
    image: "/most-requested/Group 19.png",
  },
  {
    id: 6,
    title: "نجارة",
    metaType: "تقييم",
    metaValue: 4.8,
    icon: Flame,
    image: "/most-requested/Group 18.png",
  },
];

export default function MostRequestedSection() {
  return (
    <section className="bg-[#F5F5F5] py-12" dir="rtl">
      <div className="mx-auto w-full max-w-[1400px] px-4">
        <div className="rounded-[22px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] px-6 py-10 md:px-10">
          <div className="text-center">
            <h3 className="text-4xl font-extrabold text-[#1E1855]">
              أكثر الخدمات طلباً
            </h3>
            <p className="mt-2 text-sm md:text-base text-[#6C6C6C]">
              اختر الخدمة الأكثر طلباً واحصل على أفضل الحرفيين
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mostRequested.map((item) => (
              <MostRequestedCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MostRequestedCard({ item }) {
  const Icon = item.icon;
  const navigate = useNavigate();

  return (
    <div className=" bg-white shadow-[0_10px_25px_rgba(0,0,0,0.18)] px-6 py-6 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#1E1855] ">
        <img
          src={item.image}
          alt={item.title}
          className="h-20 w-18 object-contain"
        />
      </div>

      <h4 className="mt-4 text-lg font-extrabold text-[#1E1855]">
        {item.title}
      </h4>

      <div className="mt-2 flex items-center justify-center gap-2 text-sm font-bold text-[#1E1855]">
        {item.metaValue ? (
          <span>
            {item.metaValue} {item.metaType}
          </span>
        ) : (
          <span>{item.metaType}</span>
        )}
        <Icon className="h-[14px] w-[14px] fill-[#FF7A1A] text-[#FF7A1A]" />
      </div>

      <button
        type="button"
        onClick={() =>
          navigate("/craftman-results", { state: { serviceName: item.title } })
        }
        className="mt-5 h-11 w-full sm:w-55 rounded-xl bg-[#D75B19] text-white text-2xl shadow-[0_8px_16px_rgba(215,91,25,0.25)] hover:bg-[#1E1855] transition"
      >
        أطلب الآن
      </button>
    </div>
  );
}
