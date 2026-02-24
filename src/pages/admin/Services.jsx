import { IoMdArrowDropdown } from "react-icons/io";
import ActionsCell from "../../components/common/ActionCell";
import TableCard from "../../components/common/TableCard";

const TABS = [
  { key: "active", label: "مفعلة" },
  { key: "stopped", label: "موقوفة" },
  { key: "all", label: "الكل" },
];

const SERVICES_ROWS = [
  { id: 1, name: "سباكة", status: "active", craftsmen: 120, lastUpdate: "اليوم" },
  { id: 2, name: "نجارة", status: "active", craftsmen: 95,  lastUpdate: "أمس" },
  { id: 3, name: "كهرباء", status: "stopped", craftsmen: 60, lastUpdate: "قبل يومين" },
  { id: 4, name: "دهان", status: "active", craftsmen: 85, lastUpdate: "قبل ساعة" },
  { id: 5, name: "تنظيف", status: "active", craftsmen: 70, lastUpdate: "أمس" },
  { id: 6, name: "صيانة", status: "active", craftsmen: 100, lastUpdate: "أمس" },
];

function StatusBadge({ status }) {
  const map = {
    active: { text: "مفعلة", cls: "bg-green-600 text-white" },
    stopped: { text: "موقوفة", cls: "bg-gray-300" },
  };

  const s = map[status] || map.review;

  return (
    <span className={`inline-flex min-w-25 justify-center px-3 py-1 text-sm font-bold shadow-md rounded ${s.cls}`}>
      {s.text}
    </span>
  );
}

export default function Services( { rows = SERVICES_ROWS }) {
  return (
    <div className='min-h-screen flex flex-col gap-4 p-6'>
          <h1 className='text-3xl font-bold'>ادارة الخدمات</h1>
          <TableCard
          title="ادارة الخدمات"
          rows={rows}
          tabs={TABS}
          tabStyle={(key, isActive) => {
    const base = "px-6 py-2 text-sm font-bold transition-colors min-w-[100px] rounded";
    if (isActive) return `${base} bg-indigo-950 text-white shadow-xl`
    if (key === "active") return `${base} bg-green-600 text-white shadow`;
    if (key === "stopped") return `${base} bg-gray-300 shadow`;
    return `${base} bg-white text-gray-700 shadow`;
  }}
          initialTab="all"
          filterByTab={(row, tab) => (tab === "all" ? true : row.status === tab)}
          searchKeys={["name"]}
          Actions={
    <button
      onClick={() => console.log("add service")}
      className="flex items-center gap-2 bg-orange-500 px-4 py-2 text-sm font-bold text-white rounded hover:bg-orange-600"
    >
      اضافة خدمة
      <IoMdArrowDropdown className="text-xl" />
    </button>
  }
          columns={[
            { key: "actions", header: "الاجراءات", align: "center", mobileHidden: true, cell: (r) => (<ActionsCell showCheck={false} row={r} />) },
            { key: "lastUpdate", header: "اخر تحديث", align: "center", cell: (r) => r.lastUpdate },
            { key: "craftsmen", header: "عدد الحرفي", align: "center", cell: (r) => r.craftsmen },
            { key: "status", header: "الحالة", align: "center", mobileHideHeader: true, cell: (r) => <StatusBadge status={r.status} /> },
            { key: "name", header: "الخدمة", align: "right", cell: (r) => r.name },
            { key: "id", header: "", align: "right", cell: (r) => r.id },
          ]}
          selectable={false}

          />
    </div>

   
  );
}






