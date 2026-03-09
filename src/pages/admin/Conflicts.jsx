import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { FaEdit } from "react-icons/fa";


export default function Conflicts() {

    // const defaultData = [
    //     { id: "#060", user: "سارة كريم", craftsman: "جنى الأشرف", reason: "متعلقة بالخدمة", status: "تم الحل", color: "bg-gray-400" },
    //     { id: "#045", user: "أحمد سامي", craftsman: "طارق الأحمد", reason: "متعلقة بالحرفي", status: "مغلق", color: "bg-orange-700" },
    //     { id: "#234", user: "منال ابراهيم", craftsman: "سارة قاسم", reason: "متعلقة بالدفع", status: "قيد المراجعة", color: "bg-amber-900/90" },
    //     { id: "#160", user: "ليلى حسون", craftsman: "مهند سمير", reason: "مشاكل فنية", status: "تم الحل", color: "bg-green-600" },
    // ];q

    const [data, setData] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios
            .get("https://herafie.runasp.net/api/Complaints/admin", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setConflicts(res.data.data); 
            })
            .catch((err) => console.log(err));
    }, []);

    const filteredData = conflicts?.filter((item) => {
        const statusLabel = statusMap[item.status] ?? "غير معروف";
        const text = search.toLowerCase();

        const matchesFilter =
            filter === "الكل" || statusLabel === filter;

        const matchesSearch =
            String(item.id).includes(text) ||
            (item.description ?? "").toLowerCase().includes(text) ||
            (item.order?.clientName ?? "").toLowerCase().includes(text) ||
            (item.order?.craftsmanName ?? "").toLowerCase().includes(text);

        return matchesFilter && matchesSearch;
    });

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">إدارة النزاعات</h1>
            <div className="bg-white rounded shadow-xl pb-2">

                <h2 className="text-xl font-bold py-4 px-6">إدارة النزاعات</h2>

                <div className="lg:flex items-center lg:justify-between p-4">
                    <div className="relative w-full md:w-64">
                        <input
                            type="search"
                            placeholder="بحث ..."
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pr-10 pl-4 py-2 bg-gray-100 rounded-full border-none outline-none"
                        />
                        <Search className="absolute right-3 top-2.5 text-gray-600 w-5 h-5" />
                    </div>
                    <div className="flex flex-wrap gap-2 bg-white mt-5 lg:mt-0">
                        <button onClick={() => setFilter("تم الحل")} className="cursor-pointer px-4 py-1 rounded bg-green-600 text-white text-sm">تم الحل</button>
                        <button onClick={() => setFilter("مغلق")} className="cursor-pointer px-4 py-1 rounded bg-orange-700 text-white text-sm">مغلق</button>
                        <button onClick={() => setFilter("قيد المراجعة")} className="cursor-pointer px-4 py-1 rounded bg-amber-900/70 text-white text-sm">قيد المراجعة</button>
                        <button onClick={() => setFilter("الكل")} className="cursor-pointer px-4 py-1 rounded bg-indigo-900 text-white text-sm shadow-lg">الكل</button>
                    </div>
                </div>

                <div className="m-5 bg-white shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-right border-collapse" dir="ltr">
                            <thead>
            <tr className="bg-gray-50 text-gray-800 text-right">
                <th className="p-4 border-b border-gray-300">الإجراء</th>
                <th className="p-4 border-b border-gray-300">الحالة</th>
                <th className="p-4 border-b border-gray-300">اسم الحرفي</th>
                <th className="p-4 border-b border-gray-300">سبب الشكوى</th>
                <th className="p-4 border-b border-gray-300">رقم الشكوى</th>
                <th className="p-4 border-b border-gray-300">المستخدم</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredData.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center p-6 text-gray-500">
                                            لا توجد شكاوى
                                        </td>
                                    </tr>
                                ) : (
                                    filteredData.map((item) => {
                                        const statusLabel = statusMap[item.status] ?? "غير معروف";
                                        const currentStatus = statusConfig[statusLabel] || { class: "bg-gray-100", icon: null };

    return (
        <tr key={item.id} className="border-b border-gray-300 last:border-0 hover:bg-gray-50 transition-colors text-right">
            <td className="p-4">
                    {item.status === 0 && (
                        <button className="px-3 py-1 rounded bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors">
                            بدأ المراجعة
                        </button>
                    )}
                    {item.status === 1 && (
                        <button className="px-3 py-1 rounded bg-green-600 text-white text-xs font-bold hover:bg-green-700 transition-colors">
                            حل النزاع 
                        </button>
                    )}
                    {(item.status !== 0 && item.status !== 1) && (
                        <button className="px-3 py-1 rounded bg-gray-500 text-white text-xs font-bold hover:bg-gray-700 transition-colors">
                            عرض التفاصيل
                        </button>
                    )}
                    </td>
            <td className="p-4">
                <span className={`text-xs rounded px-2 py-1 inline-flex items-center gap-1 ${currentStatus.class}`}>
                    {statusLabel}
                    {currentStatus.icon && <span>{currentStatus.icon}</span>}
                </span>
            </td>
            <td className="p-4 text-sm font-bold">{item.order?.craftsmanName}</td>
                <td className="p-4">
                    <span className="px-3 py-1">
                        {item.description}
                    </span>
            </td>
            <td className="p-4 text-sm  font-bold">{item.id}</td>
            <td className="p-4 text-sm font-bold">{item.order?.clientName}</td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
