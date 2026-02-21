import { useEffect, useState } from "react";
import { useSearch } from "../../context/searchContext";
import { BsTrash } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { BiSolidEditAlt } from "react-icons/bi";

export default function CraftsmanServices() {
  const [filteredData, setFilteredData] = useState([]);
  const { search } = useSearch();

  const services = [
    {
      id: 1,
      title: "تركيب سخان كهربائي",
      desc: "فك القديم وتركيب الجديد مع فحص الكهرباء.",
      price: "500 ج.م",
    },
    {
      id: 2,
      title: "تأسيس سباكة الحمام",
      desc: "تمديد المواسير وتركيب المحابس (بدون تكسير).",
      price: "500 ج.م",
    },
    {
      id: 3,
      title: "صيانة مكيف سبليت",
      desc: "غسيل الوحدة الداخلية والخارجية وفحص الفريون.",
      price: "500 ج.م",
    },
  ];
  const filtered = services.filter((s) =>
    (s.title + " " + s.desc).toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    setFilteredData(filtered);
  }, [search]);

  const handleDelete = (idx) => {
    setFilteredData((prev) => prev.filter((s) => s.id !== idx));
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#ECECF2] text-[#111827]">
      <main className="mx-auto max-w-7xl px-3 sm:px-4 py-6">
        <div className="bg-[#EFEFF4] rounded-2xl p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4 mb-4 bg-white py-4 rounded px-2">
            <div className="text-right">
              <h2 className="text-[20px] font-extrabold text-[#111827]">
                قائمة الخدمات
              </h2>
              <p className="text-[12px] text-[#6b7280] mt-1">
                يمكنك إضافة وتعديل الخدمات التي تظهر لعملائك في التطبيق.
              </p>
            </div>

            <button className="h-10 px-4 rounded-lg bg-[#0B0F2A] text-white font-bold text-[13px] inline-flex items-center gap-2 shadow-sm">
              <span className="text-[18px] leading-none">+</span>
              إضافة خدمة جديدة
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredData.map((s, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-[0_6px_16px_rgba(17,24,39,0.08)] px-4 py-3 border border-[#ECECF2] py-4"
              >
                <div className="flex justify-between items-start">
                  <div className="text-right">
                    <div className="flex items-center gap-4">
                      <div className="bg-[#E9E8EE] text-[#1E1855] w-8 h-8 flex items-center justify-center rounded text-2xl">
                        <MdOutlineMiscellaneousServices className="-rotate-90" />
                      </div>

                      <div className="text-[14px] font-extrabold text-[#111827]">
                        {s.title}
                      </div>
                    </div>
                    <div className="text-[12px] text-[#6b7280] mt-1 leading-relaxed">
                      {s.desc}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[#1E1855]">
                    <button className="p-1" aria-label="edit" title="تعديل">
                      <BiSolidEditAlt className="text-xl" />
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="p-1 cursor-pointer"
                      aria-label="delete"
                      title="حذف"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-[12px] font-extrabold text-[#D75B19]">
                    {s.price}
                  </div>
                  <div className="text-[11px] text-[#6b7280]">سعر الخدمة</div>
                </div>
              </div>
            ))}
          </div>

          {filteredData.length === 0 && (
            <div className="text-center text-[13px] text-[#6b7280] py-10">
              لا توجد نتائج مطابقة.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
