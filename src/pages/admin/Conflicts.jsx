import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const statusMap = {
    4: "جديد ",
    1: "قيد المراجعة",
    2: "تم الحل",
    3: "مغلق",
};

const statusConfig = {
    "تم الحل": { class: "bg-gray-200 text-gray-700 font-bold" },
    "مغلق": { class: "bg-orange-700/50 text-orange-700 font-bold" },
    "قيد المراجعة": { class: "bg-amber-900/40 text-amber-900/60 font-bold" },
    "جديد ": { class: "bg-blue-100 text-blue-700 font-bold" },
};

export default function Conflicts() {
    const [conflicts, setConflicts] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("الكل");
    const navigate = useNavigate();

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
            filter === "الكل" || statusLabel.trim() === filter.trim();

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
                                    <th className="p-4 border-b border-gray-300"></th>
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
                                        const statusLabel = statusMap[item.status] ?? "جديد";
                                        const currentStatus = statusConfig[statusLabel] || { class: "bg-gray-100" };

                                        return (
                                            <tr key={item.id} className="border-b border-gray-300 last:border-0 hover:bg-gray-50 transition-colors text-right">
                                                <td className="p-4">
                                                    <button
                                                        onClick={() => navigate(`/admin/conflicts/${item.id}`)}
                                                        className="px-3 py-1 rounded bg-indigo-900 text-white text-xs font-bold hover:bg-indigo-700 transition-colors"
                                                    >
                                                        عرض التفاصيل
                                                    </button>
                                                </td>
                                                <td className="p-4">
                                                    <span className={`text-xs rounded px-2 py-1 inline-flex items-center gap-1 ${currentStatus.class}`}>
                                                        {statusLabel}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-sm font-bold">{item.order?.craftsmanName}</td>
                                                <td className="p-4">
                                                    <span className="px-3 py-1">
                                                        {item.description}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-sm font-bold">{item.id}</td>
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