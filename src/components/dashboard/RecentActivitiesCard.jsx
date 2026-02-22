import TableCard from "../common/TableCard";

const TABS = [
  { key: "active", label: "نشط" },
  { key: "stopped", label: "موقوف" },
  { key: "all", label: "الكل" },
  
  
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
        "inline-flex min-w-18 justify-center px-3 py-1 text-sm font-bold shadow-md bg-white",
        isActive ? "text-green-600" : "text-red-600",
      ].join(" ")}
    >
      {isActive ? "نشط" : "موقوف"}
    </span>
  );
}

export default function RecentActivitiesCard({ rows = MOCK_ROWS }) {
  return (
    <TableCard
      title="اخر النشاطات"
      rows={rows}
      tabs={TABS}
      initialTab="all"
      filterByTab={(row, tab) =>
        tab === "all" ? true : tab === "active" ? row.status === "active" : row.status === "stopped"
      }
      searchKeys={["name", "phone", "city"]}
      columns={[
        { key: "status", header: "الحالة", align: "center", cell: (r) => <StatusBadge status={r.status} /> },
        { key: "city", header: "المدينة", align: "center", cell: (r) => r.city },
        { key: "phone", header: "الهاتف", align: "center", cell: (r) => r.phone },
        { key: "name", header: "الاسم", align: "", cell: (r) => r.name },
      ]}
    />
  );
}