import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function TableCard({
  title = "",
  rows = [],
  tabs = [],
  tabStyle, 
  initialTab = "all",
  filterByTab, 
  searchPlaceholder = "بحث...",
  searchKeys = [], 
  selectable = true,
  getRowId = (row) => row.id,
  columns = [],
  Actions = null,
}) {
  const [tab, setTab] = useState(initialTab);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return rows.filter((r) => {
      const byTab = filterByTab ? filterByTab(r, tab) : true;

      const byQuery = !q
        ? true
        : searchKeys.some((k) => String(r?.[k] ?? "").toLowerCase().includes(q));

      return byTab && byQuery;
    });
  }, [rows, tab, query, filterByTab, searchKeys]);

  


  

   const defaultTabStyle = (key) => {
    const base =
      "px-6 py-2 text-sm font-bold transition-colors min-w-[100px]";
    const isActive = key === tab;

    if (isActive) return `${base} bg-indigo-950 text-white shadow-xl`;
    if (key === "active") return `${base} bg-white text-green-600 shadow`;
    if (key === "stopped") return `${base} bg-white text-red-600 shadow`;
    if (key === "review") return `${base} bg-white text-orange-800 shadow`;
    return `${base} bg-white text-gray-700 shadow`;
  };

  const tabBtnClass = (key) => {
    const isActive = key === tab;
    return tabStyle ? tabStyle(key, isActive) : defaultTabStyle(key);
  };

  return (
    <section className="bg-white p-6 shadow-xl ring-1 ring-black/5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-xl font-bold text-right">{title}</h3>
      </div>

      

      <div className="mt-4 flex flex-col items-center gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-[320px]">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-full bg-gray-200 py-2 pl-4 pr-10 text-md outline-none focus:ring-2 focus:ring-gray-300 placeholder-gray-700"
          />
          <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700" size={18} />
        </div>
        
         <div className="flex flex-wrap items-center gap-3">
          {Actions}
    {tabs?.length ? (
      tabs.map((t) => (
        <button key={t.key} onClick={() => setTab(t.key)} className={tabBtnClass(t.key)}>
          {t.label}
        </button>
      ))
    ) : null}
  </div>
        
      </div>

      <div className="hidden md:block mt-4 overflow-x-auto border border-gray-200 shadow-md">
        <table className=" w-full text-center">
          <thead>
            <tr className="text-sm font-bold">
              {columns.map((c) => (
                <th
                  key={c.key}
                  className={[
                    "px-4 py-3",
                  ].join(" ")}
                >
                  {c.header}
                </th>
              ))}

            
            </tr>
          </thead>

          <tbody>
            {filtered.map((row) => (
              <tr key={getRowId(row)} className="border-t border-slate-200 text-sm font-bold">
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={[
                      "px-4 py-3",
                    ].join(" ")}
                  >
                    {c.cell(row)}
                  </td>
                ))}
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="px-4 py-8 text-center text-sm text-slate-500"
                >
                  لا توجد نتائج
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid gap-3 md:hidden">
  {filtered.map((row) => (
    <div
      key={getRowId(row)}
      className="border border-gray-200 bg-white p-4 shadow-sm"
    >
      <div className="space-y-3">
        {columns.map((c) => (
          <div key={c.key} className="flex items-start justify-between gap-4">
            <span className="text-xs font-semibold text-gray-600">
              {c.header}
            </span>
            <span className="text-sm font-bold text-gray-900 text-left">
              {c.cell(row)}
            </span>
          </div>
        ))}
      </div>

      
    </div>
  ))}

  {filtered.length === 0 && (
    <div className="rounded-xl border border-gray-200 bg-white p-6 text-center text-sm text-slate-500">
      لا توجد نتائج
    </div>
  )}
</div>
    </section>
  );
}