import { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { LuPenLine } from "react-icons/lu";
import { CiLock } from "react-icons/ci";

export default function GenreralSettings() {

  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState("English");
  const langRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (!langRef.current) return;
      if (!langRef.current.contains(e.target)) setLangOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div dir="rtl" className=" bg-[#ECECF2] text-[#111827]">
      <main className="mx-auto px-3 sm:px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr,320px] gap-6 items-start">
          <section className="md:col-start-1">
            <div className="bg-white rounded-xl border border-[#E6E6EF] shadow-sm overflow-hidden">
              <div className="px-4 sm:px-6 pt-5 pb-4">
                <div className="text-right font-extrabold text-[16px] text-[#111827]">
                  الإعدادات العامة للنظام
                </div>
              </div>
              <div className="px-4 sm:px-6 pb-6 space-y-4">
                <div>
                  <div className="text-right text-[12px] font-semibold text-[#374151] mb-2">
                    اسم المنصة
                  </div>
                  <div className="bg-[#EFEFF4] rounded-lg px-3 py-2 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      className="shrink-0 h-9 w-9 rounded-md bg-white border border-[#E6E6EF]
                                flex items-center justify-center shadow-[0_2px_0_rgba(0,0,0,0.06)]"
                      aria-label="edit"
                    >
                    <LuPenLine />
                    </button>
                    <input
                      defaultValue="خدماتك"
                      className="flex-1 bg-transparent outline-none text-[13px] text-[#111827] text-right"
                    />
                  </div>
                </div>
                <div>
                  <div className="text-right text-[12px] font-semibold text-[#374151] mb-2">
                    لغة النظام الافتراضية
                  </div>
                  <div ref={langRef} className="bg-[#EFEFF4] rounded-lg px-3 py-2 relative">
                    <div className="flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setLangOpen((v) => !v)}
                        className="shrink-0 h-9 w-9 rounded-md bg-white border border-[#E6E6EF]
                                  flex items-center justify-center shadow-[0_2px_0_rgba(0,0,0,0.06)]"
                        aria-label="open language"
                      >
                        <IoMdArrowDropdown />
                      </button>
                      <div className="flex-1 text-right text-[13px] font-semibold text-[#111827]">
                        {lang}
                      </div>
                    </div>
                    {langOpen && (
                      <div className="absolute left-0 mt-2 w-full bg-white border border-[#E6E6EF] rounded-md shadow z-10 overflow-hidden">
                        {["Arabic", "English"].map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => {
                              setLang(item);
                              setLangOpen(false);
                            }}
                            className="block w-full text-right px-4 py-2 hover:bg-[#F3F4F6] text-[13px]"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="bg-[#EFEFF4] rounded-lg px-3 py-3 flex items-center justify-between gap-3">
                  <label className="shrink-0 relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-[#d7d9e6] peer-checked:bg-[#0B0F2A] rounded-full peer transition relative">
                      <span className="absolute top-0.5 right-0.5 h-5 w-5 bg-white rounded-full transition peer-checked:translate-x-[-20px]" />
                    </div>
                  </label>
                  <div className="flex-1 text-right">
                    <div className="text-[13px] font-bold text-[#111827]">تفعيل الإشعارات</div>
                    <div className="text-[11px] text-[#9ca3af] mt-1">
                      إرسال التنبيهات فورياً عند الطلبات الجديدة
                    </div>
                  </div>
                  <span className="shrink-0 text-[#9ca3af]">
                    <CiLock />
                  </span>
                </div>
                <div className="bg-[#EFEFF4] rounded-lg px-3 py-3 flex items-center justify-between gap-3">
                  <label className="shrink-0 relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-[#d7d9e6] peer-checked:bg-[#0B0F2A] rounded-full peer transition relative">
                      <span className="absolute top-0.5 right-0.5 h-5 w-5 bg-white rounded-full transition peer-checked:translate-x-[-20px]" />
                    </div>
                  </label>
                  <div className="flex-1 text-right">
                    <div className="text-[13px] font-bold text-[#111827]">وضع الصيانة</div>
                    <div className="text-[11px] text-[#9ca3af] mt-1">
                      إيقاف استقبال الطلبات مؤقتاً
                    </div>
                  </div>
                <span className="shrink-0 text-[#9ca3af]">
                  <CiLock />
                </span>
                </div>
                <div className="pt-2 flex justify-start">
                <button className="h-10 w-[200px] rounded-md bg-[#0B0F2A] text-white font-extrabold text-[13px] shadow-[0_2px_0_rgba(0,0,0,0.18)]">
                    حفظ التغييرات
                </button>
                </div>
                </div>
            </div>
        </section>
        </div>
        </main>
    </div>
  );
}