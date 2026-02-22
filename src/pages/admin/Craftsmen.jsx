import ActionsCell from '../../components/common/ActionCell';
import TableCard from '../../components/common/TableCard'

const TABS = [
  { key: "review", label: "قيد المراجعة" },
  { key: "active", label: "نشط" },
  { key: "stopped", label: "موقوف" },
  { key: "all", label: "الكل" },
  
];

const MOCK_ROWS = [
  { id: 1, name: "جنى الأشرف", phone: "0795621348", city: "عمان", status: "active" },
  { id: 2, name: "طارق الأحمد", phone: "0778932140", city: "الزرقاء", status: "stopped" },
  { id: 3, name: "سارة قاسم", phone: "0783321145", city: "العقبة", status: "review" },
  { id: 4, name: "مؤيد سمير", phone: "0771239087", city: "اربد", status: "active" },
];

function StatusBadge({ status }) {
  const map = {
    active: { text: "نشط", cls: "text-green-600" },
    stopped: { text: "موقوف", cls: "text-red-600" },
    review: { text: "قيد المراجعة", cls: "text-orange-800" },
  };

  const s = map[status] || map.review;

  return (
    <span className={`inline-flex min-w-25 justify-center px-3 py-1 text-sm font-bold shadow-md bg-white ${s.cls}`}>
      {s.text}
    </span>
  );
}

export default function Craftsmen({rows = MOCK_ROWS }) {
  return (
    <div className='min-h-screen flex flex-col gap-4 p-6'>
      <h1 className='text-3xl font-bold'>ادارة الحرفيين</h1>
      <TableCard 
     title="ادارة الحرفيين"
      rows={rows}
      tabs={TABS}
      initialTab="all"
      filterByTab={(row, tab) => (tab === "all" ? true : row.status === tab)}
      searchKeys={["name", "phone", "city"]}
      columns={[
        { key: "actions", header: "الاجراءات", align: "center", cell: (r) => (<ActionsCell row={r} />) },
        { key: "status", header: "الحالة", align: "center", cell: (r) => <StatusBadge status={r.status} /> },
        { key: "city", header: "المدينة", align: "center", cell: (r) => r.city },
        { key: "phone", header: "الهاتف", align: "center", cell: (r) => r.phone },
        { key: "name", header: "الاسم", align: "right", cell: (r) => r.name },
      ]} />
    </div>
  )
}
