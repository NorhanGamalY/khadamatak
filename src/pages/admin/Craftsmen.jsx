import { FaRegTimesCircle } from 'react-icons/fa';
import TableCard from '../../components/common/TableCard'
import { FiCheckCircle } from 'react-icons/fi';
import { useRecentActivites } from '../../features/dashboard/hooks';
import SplashLoader from '../../components/common/SplashLoader';
import { useApproveCraftsman, useRejectCraftsman } from '../../features/craftmen/hooks';

const TABS = [
  { key: "review", label: "قيد المراجعة" },
  { key: "active", label: "نشط" },
  { key: "all", label: "الكل" },
  
];


function StatusBadge({ status }) {
  const map = {
    active: { text: "نشط", cls: "text-green-600" },
    review: { text: "قيد المراجعة", cls: "text-orange-800" },
  };

  const s = map[status] || map.review;

  return (
    <span className={`inline-flex min-w-25 justify-center px-3 py-1 text-sm font-bold shadow-md bg-white ${s.cls}`}>
      {s.text}
    </span>
  );
}

export default function Craftsmen() {
  const { data, isLoading, isError } = useRecentActivites();
  const approveMutation = useApproveCraftsman();
  const rejectMutation = useRejectCraftsman();

  if (isLoading) return <SplashLoader />;
  if (isError) return <p>حدث خطأ أثناء تحميل البيانات</p>;
  
  const tableData = (data || []).map((r) => ({
  id: r.id,
  name: r.fullName,
  phone: r.phone,
  status: r.isVerified ? "active" : "review", 
  city: r.city ?? "-",
}));

  

  return (
    <div className='min-h-screen flex flex-col gap-4 p-6'>
      <h1 className='text-3xl font-bold'>ادارة الحرفيين</h1>
      <TableCard 
      rows={tableData}
      tabs={TABS}
      initialTab="all"
      filterByTab={(row, tab) => (tab === "all" ? true : row.status === tab)}
      searchKeys={["name", "phone", "city"]}
      columns={[
        { key: "name", header: "الاسم", cell: (r) => r.name },
        { key: "phone", header: "الهاتف", cell: (r) => r.phone },
        { key: "city", header: "المدينة", cell: (r) => r.city },
        { key: "status", header: "الحالة", cell: (r) => <StatusBadge status={r.status} /> },
        { 
  key: "actions",
  header: "الاجراءات",
  cell: (r) => (
    <div className="flex items-center justify-center gap-3 text-xl">
      <FiCheckCircle 
  className="cursor-pointer hover:scale-110 transition"
  onClick={() =>  {
  console.log("clicked approve", r.id);
  approveMutation.mutate(r.id);
}}
/>

<FaRegTimesCircle 
  className="cursor-pointer hover:scale-110 transition"
  onClick={() => rejectMutation.mutate(r.id)}
/>
    </div>
  )
},       
      ]} />
    </div>
  )
}
