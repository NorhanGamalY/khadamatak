import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function TableCard({
  title = "",
  rows = [],
  tabs = [],
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
  const [selected, setSelected] = useState(() => new Set());

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

  const allChecked =
    selectable && filtered.length > 0 && filtered.every((r) => selected.has(getRowId(r)));

  const toggleAll = () => {
    if (!selectable) return;

    setSelected((prev) => {
      const next = new Set(prev);
      if (allChecked) filtered.forEach((r) => next.delete(getRowId(r)));
      else filtered.forEach((r) => next.add(getRowId(r)));
      return next;
    });
  };

  const toggleOne = (row) => {
    if (!selectable) return;

    const id = getRowId(row);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const tabBtnClass = (key) => {
    const base = "px-6 py-2 text-sm font-bold transition-colors min-w-[100px]";
    if (key === tab) return `${base} bg-indigo-950 text-white shadow-xl`;
    if (key === "active") return `${base} bg-white text-green-600 shadow`;
    if (key === "stopped") return `${base} bg-white text-red-600 shadow`;
    if (key === "review") return `${base} bg-white text-orange-800 shadow`;
    return `${base} bg-white text-gray-700 shadow`;
  };

  return (
    <section className="bg-white p-6 shadow-xl ring-1 ring-black/5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-xl font-bold text-right">{title}</h3>
      </div>

      

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-[320px]">
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

      <div className="mt-4 overflow-x-auto border border-gray-200 shadow-md">
        <table className=" w-full text-end">
          <thead>
            <tr className="text-sm font-bold">
              {columns.map((c) => (
                <th
                  key={c.key}
                  className={[
                    "px-4 py-3",
                    c.align === "center" ? "text-center" : "text-end",
                  ].join(" ")}
                >
                  {c.header}
                </th>
              ))}

              {selectable && (
                <th className="w-10 px-3 py-3 text-center">
                  <input type="checkbox" checked={allChecked} onChange={toggleAll} />
                </th>
              )}
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
                      c.align === "center" ? "text-center" : "text-end",
                    ].join(" ")}
                  >
                    {c.cell(row)}
                  </td>
                ))}

                {selectable && (
                  <td className="px-3 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={selected.has(getRowId(row))}
                      onChange={() => toggleOne(row)}
                    />
                  </td>
                )}
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
    </section>
  );
}