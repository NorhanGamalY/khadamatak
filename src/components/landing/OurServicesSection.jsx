import { Flame, Star, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getServiceCategories } from "../../api/servicesCategory";

const iconByIndex = [Zap, Flame, Star, Flame, Star, Flame];

const imageByName = {
  سباكة: "/most-requested/Group 20.png",
  كهرباء: "/most-requested/Group 21.png",
  نجارة: "/most-requested/Group 18.png",
  صيانة: "/most-requested/Group 22.png",
  دهانات: "/most-requested/Group 19.png",
  تنظيف: "/most-requested/Group 16.png",
};

const FALLBACK_IMAGE = "/most-requested/Group 16.png";

export default function MostRequestedSection() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["serviceCategories"],
    queryFn: getServiceCategories,
  });

  const dataCards = data?.slice(0, 6) || [];

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

          {isLoading && (
            <div className="mt-10 text-center text-[#1E1855] font-semibold">
              جاري تحميل الخدمات...
            </div>
          )}

          {isError && (
            <div className="mt-10 text-center text-red-600 font-semibold">
              حدث خطأ أثناء جلب الخدمات
            </div>
          )}

          {!isLoading && !isError && (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {dataCards.map((item, index) => (
                <MostRequestedCard
                  key={item.id}
                  item={item}
                  Icon={iconByIndex[index] || Flame}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function MostRequestedCard({ item, Icon }) {
  const navigate = useNavigate();

  const handleClick = () => {
    const params = new URLSearchParams();
    params.append("service", item.name);

    navigate(`/craftman-results?${params.toString()}`);
  };

  const image = imageByName[item.name] || FALLBACK_IMAGE;

  return (
    <div className="bg-white shadow-[0_10px_25px_rgba(0,0,0,0.18)] px-6 py-6 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#1E1855]">
        <img src={image} alt={item.name} className="h-20 w-18 object-contain" />
      </div>

      <h4 className="mt-4 text-lg font-extrabold text-[#1E1855]">
        {item.name}
      </h4>

      <div className="mt-2 flex items-center justify-center gap-2 text-sm font-bold text-[#1E1855]">
        <span>الأكثر طلباً</span>

        <Icon className="h-[14px] w-[14px] fill-[#FF7A1A] text-[#FF7A1A]" />
      </div>

      <button
        type="button"
        onClick={handleClick}
        className="mt-5 h-11 w-full sm:w-55 rounded-xl bg-[#D75B19] text-white text-2xl shadow-[0_8px_16px_rgba(215,91,25,0.25)] hover:bg-[#1E1855] transition"
      >
        أطلب الآن
      </button>
    </div>
  );
}
