import TableCard from "../common/TableCard";

const TABS = [
  { key: "active", label: "نشط" },
  { key: "stopped", label: "موقوف" },
  { key: "all", label: "الكل" },
  
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

export default function RecentActivitiesCard({ rows = [] }) {
  const data = rows.map((r) => ({
    id: r.id,

    name: r.fullName,
    phone: r.phoneNumber,
    status: r.isVerified ? "active" : "stopped",
    city: r.cityName ?? "-",
  }));

  return (
    <TableCard
      title="اخر النشاطات"
      rows={data}
      tabs={TABS}
      initialTab="all"
      filterByTab={(row, tab) =>
        tab === "all" ? true : tab === "active" ? row.status === "active" : row.status === "stopped"
      }
      searchKeys={["name", "phone", "city"]}
      columns={[
        { key: "name", header: "الاسم", align: "", cell: (r) => r.name },
        { key: "phone", header: "الهاتف", align: "center", cell: (r) => r.phone },
        { key: "city", header: "المدينة", align: "center", cell: (r) => r.city },
        { key: "status", header: "الحالة", align: "center", cell: (r) => <StatusBadge status={r.status} /> },
        
        
        
      ]}
    />
  );
}
