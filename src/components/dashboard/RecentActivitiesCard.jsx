import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";

const TABS = [
  { key: "all", label: "الكل" },
  { key: "stopped", label: "موقوف" },
  { key: "active", label: "نشط" },
];

const MOCK_ROWS = [
  { id: 1, name: "جنى الأشرف", phone: "0795621348", city: "عمان", status: "active" },
  { id: 2, name: "طارق الأحمد", phone: "0778932140", city: "الزرقاء", status: "stopped" },
  { id: 3, name: "سارة قاسم", phone: "0783321145", city: "العقبة", status: "active" },
  { id: 4, name: "مؤيد سمير", phone: "0771239087", city: "اربد", status: "active" },
];

function StatusBadge({ status }) {
  const isActive = status === "active";

  return (
    <span
      className={[
        "inline-flex min-w-18 justify-center px-3 py-1 text-sm font-bold shadow-md",
        isActive
          ? " bg-white text-green-600"
          : " bg-white text-red-600",
      ].join(" ")}
    >
      {isActive ? "نشط" : "موقوف"}
    </span>
  );
}

export default function RecentActivitiesCard({ rows = MOCK_ROWS }) {
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(() => new Set());

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return rows.filter((r) => {
      const byTab =
        tab === "all" ? true : tab === "active" ? r.status === "active" : r.status === "stopped";

      const byQuery = !q
        ? true
        : [r.name, r.phone, r.city].some((v) => String(v).toLowerCase().includes(q));

      return byTab && byQuery;
    });
  }, [rows, tab, query]);

  const allChecked = filtered.length > 0 && filtered.every((r) => selected.has(r.id));

  const toggleAll = () => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allChecked) {
        filtered.forEach((r) => next.delete(r.id));
      } else {
        filtered.forEach((r) => next.add(r.id));
      }
      return next;
    });
  };

  const toggleOne = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const tabBtnClass = (key) =>
    {
      const base = " px-6 py-2 text-sm font-bold transition"
      if (key === tab) return `${base} bg-indigo-950 text-white shadow-xl`;
      if (key === 'active') return `${base} bg-white text-green-600 shadow`;
      if (key === 'stopped') return `${base} bg-white text-red-600 shadow`;
      return `${base} bg-white text-slate-700 shadow`;
    };

  return (
    <section className=" bg-white p-4 shadow-xl ring-1 ring-black/5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-xl font-bold">اخر النشاطات</h3>
      </div>

      {/* Tabs */}
      <div className="mt-4 flex justify-between gap-4">
        <div className="relative w-full sm:w-[320px]">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="بحث..."
            className="w-full rounded-full bg-gray-200 py-2 pl-4 pr-10 text-md outline-none focus:ring-2 focus:ring-gray-300 placeholder-gray-700"
          />
          <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700" size={18} />
        </div>
        <div className="flex items-center gap-3">
            <button
          onClick={() => setTab("active")}
          className={[
            tabBtnClass("active"),
            tab === "active" ? "" : "text-green-600",
          ].join(" ")}
        >
          نشط
        </button>
        <button
          onClick={() => setTab("stopped")}
          className={[
            tabBtnClass("stopped"),
            tab === "stopped" ? "" : "text-red-600",
          ].join(" ")}
        >
          موقوف
        </button>
            <button onClick={() => setTab("all")} className={tabBtnClass("all")}>
          الكل
        </button>
        
        
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-hidden border border-gray-200 shadow-md">
        <table className="w-full text-end">
          <thead>
            <tr className="text-sm font-bold">
              <th className="px-4 py-3 text-center">الحالة</th>
              <th className="px-4 py-3 text-center ">المدينة</th>
              <th className="px-4 py-3 text-center ">الهاتف</th>
              <th className="px-4 py-3">الاسم</th>
              <th className="w-10 px-3 py-3 ">
                <input type="checkbox" checked={allChecked} onChange={toggleAll} />
              </th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((row) => (
              <tr key={row.id} className="border-t border-slate-200 text-sm font-bold">
                <td className="px-4 py-3 text-center">
                  <StatusBadge status={row.status} />
                </td>
                <td className="px-4 py-3 text-center">{row.city}</td>
                <td className="px-4 py-3 text-center">{row.phone}</td>
                <td className="px-4 py-3 ">{row.name}</td>
                <td className="px-3 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={selected.has(row.id)}
                    onChange={() => toggleOne(row.id)}
                  />
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-500">
                  لا توجد نتائج
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}