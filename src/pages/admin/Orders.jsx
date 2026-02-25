import { useState } from "react";
import Tabs from "../../components/orders/Tabs";
import { Card } from "../../components/orders/Card";
import { BsFilterRight } from "react-icons/bs";
import { IoFilter } from "react-icons/io5";

const orders = [
  {
    id: 1,
    name: "عمر سامي",
    avatar: "",
    city: "طلخا، المنصورة",
    service: "صيانة تكييف",
    date: "10/02/2026",
    time: "02:00 م",
    price: 500,
    status: "pending",
    statusLabel: "قيد الانتظار",
  },
  {
    id: 2,
    name: "عمر سامي",
    avatar: "",
    city: "طلخا، المنصورة",
    service: "نجارة",
    date: "10/02/2026",
    time: "02:00 م",
    price: 500,
    status: "running",
    statusLabel: "جار التنفيذ",
  },
  {
    id: 3,
    name: "عمر سامي",
    avatar: "",
    city: "طلخا، المنصورة",
    service: "سباكة",
    date: "10/02/2026",
    time: "02:00 م",
    price: 500,
    status: "done",
    statusLabel: "مكتمل",
  },
  {
    id: 4,
    name: "عمر سامي",
    avatar: "",
    city: "طلخا، المنصورة",
    service: "كهرباء",
    date: "10/02/2026",
    time: "02:00 م",
    price: 500,
    status: "canceled",
    statusLabel: "ملغي",
  },
];

export default function Orders() {
  
  const [tab, setTab] = useState("all");
  const filteredOrders = orders.filter(order => {
  if (tab === "all") return true;
  return order.status === tab;
});

  return (
    <div className='min-h-screen flex flex-col gap-2 p-6'>
      <div className="flex items-center justify-between bg-white shadow-sm border border-gray-100 px-4 py-3">
        <Tabs active={tab} onChange={setTab} />
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border-gray-200 bg-gray-50 shadow ">
         <IoFilter size={18}/>
          تصفية النتائج
        </button>
      </div>
      <div className="mt-4 space-y-3">
  {filteredOrders.map(order => (
    <Card key={order.id} order={order} />
  ))}
</div>
    
    </div>
  )
}
