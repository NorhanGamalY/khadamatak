import { useState } from "react";

export default function Services() {
  const [query, setQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const services = [
    {
      title: "تركيب سخان كهربائي",
      desc: "فك القديم وتركيب الجديد مع فحص الكهرباء.",
      price: "500 ج.م",
    },
    {
      title: "تأسيس سباكة الحمام",
      desc: "تمديد المواسير وتركيب المحابس (بدون تكسير).",
      price: "500 ج.م",
    },
    {
      title: "صيانة مكيف سبليت",
      desc: "غسيل الوحدة الداخلية والخارجية وفحص الفريون.",
      price: "500 ج.م",
    },
  ];

  const filtered = services.filter((s) =>
    (s.title + " " + s.desc).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div dir="rtl" className="min-h-screen bg-[#ECECF2] text-[#111827]">

      <main className="mx-auto max-w-[1200px] px-3 sm:px-4 py-6">
        <div className="bg-[#EFEFF4] rounded-2xl p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4 mb-4">
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
            {filtered.map((s, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-[0_6px_16px_rgba(17,24,39,0.08)] px-4 py-3 border border-[#ECECF2]"
              >
                <div className="flex items-center justify-start gap-3 text-[#0B0F2A]">
                  <button className="p-1" aria-label="delete" title="حذف">
                    <TrashMiniIcon />
                  </button>
                  <button className="p-1" aria-label="edit" title="تعديل">
                    <EditMiniIcon />
                  </button>
                  <button className="p-1" aria-label="settings" title="إعدادات">
                    <GearMiniIcon />
                  </button>
                </div>

                <div className="mt-2 text-right">
                  <div className="text-[14px] font-extrabold text-[#111827]">
                    {s.title}
                  </div>
                  <div className="text-[12px] text-[#6b7280] mt-1 leading-relaxed">
                    {s.desc}
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

          {filtered.length === 0 && (
            <div className="text-center text-[13px] text-[#6b7280] py-10">
              لا توجد نتائج مطابقة.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

/* ---------------- Icons ---------------- */

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2Z" fill="#111827" />
      <path
        d="M18 16V11a6 6 0 1 0-12 0v5l-2 2h16l-2-2Z"
        stroke="#111827"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="#111827"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
        stroke="#9ca3af"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TrashMiniIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 7h12M10 7V5h4v2M8 7l1 14h6l1-14"
        stroke="#0B0F2A"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EditMiniIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 20h9"
        stroke="#0B0F2A"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path
        d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5Z"
        stroke="#0B0F2A"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GearMiniIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 15.3a3.3 3.3 0 1 0 0-6.6 3.3 3.3 0 0 0 0 6.6Z"
        stroke="#0B0F2A"
        strokeWidth="1.6"
      />
      <path
        d="M19 13.2v-2.4l-1.7-.6-.7-1.6.9-1.5-1.7-1.7-1.5.9-1.6-.7-.6-1.7h-2.4l-.6 1.7-1.6.7-1.5-.9-1.7 1.7.9 1.5-.7 1.6-1.7.6v2.4l1.7.6.7 1.6-.9 1.5 1.7 1.7 1.5-.9 1.6.7.6 1.7h2.4l.6-1.7 1.6-.7 1.5.9 1.7-1.7-.9-1.5.7-1.6 1.7-.6Z"
        stroke="#0B0F2A"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}
