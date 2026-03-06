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
            .get("https://herafie.runasp.net/api/Complaints/admin/complaints", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                const mappedData = res.data.map((item) => ({
                    id: item.id || item.complaintId,
                    user: item.userName || item.email,
                    craftsman: item.craftsmanName || item.craftsmanEmail,
                    reason: item.complaintReason,
                    status: item.status,
                    color:
                        item.status === "تم الحل"
                            ? "bg-green-600"
                            : item.status === "مغلق"
                                ? "bg-orange-700"
                                : "bg-amber-900/90",
                }));
                setData(mappedData);
            })
            .catch((err) => console.log(err));
    }, []);


    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("الكل");

    const filteredData = data.filter((item) => {
        const text = search.toLowerCase();

        const matchesFilter =
            filter === "الكل" || item.reason === filter;

        const matchesSearch = Object.values(item).some((val) =>
            String(val).toLowerCase().includes(text)
        );

        return matchesFilter && matchesSearch;
    });

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">إدارة النزاعات</h1>
            <div className="bg-white rounded shadow-xl pb-2">

                <h2 className="text-xl font-bold py-4 px-6">إدارة النزاعات</h2>

                {/* filter btn*/}
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
                        <button onClick={() => setFilter("مشاكل فنية")} className="cursor-pointer px-4 py-1 rounded bg-green-600 text-white text-sm">مشاكل فنية</button>
                        <button onClick={() => setFilter("متعلقة بالحرفي")} className="cursor-pointer px-4 py-1 rounded bg-orange-700 text-white text-sm">متعلقة بالحرفي</button>
                        <button onClick={() => setFilter("متعلقة بالدفع")} className="cursor-pointer px-4 py-1 rounded bg-amber-900/70 text-white text-sm text-gray-800">متعلقة بالدفع</button>
                        <button onClick={() => setFilter("متعلقة بالخدمة")} className="cursor-pointer px-4 py-1 rounded bg-gray-400 text-white text-sm">متعلقة بالخدمة</button>
                        <button onClick={() => setFilter("الكل")} className="cursor-pointer px-4 py-1 rounded bg-indigo-900 text-white text-sm shadow-lg">الكل</button>
                    </div>
                </div>

                {/* the table */}
                <div className="m-5 bg-white shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-right border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-800">
                                    <th className="p-4 border-b border-gray-300">سبب الشكوى</th>
                                    <th className="p-4 border-b border-gray-300">اسم الحرفي</th>
                                    <th className="p-4 border-b border-gray-300">رقم الشكوى</th>
                                    <th className="p-4 border-b border-gray-300">المستخدم</th>
                                </tr>
                            </thead>

                            <tbody>

                                {filteredData.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center p-6 text-gray-500">
                                            لا توجد شكاوى
                                        </td>
                                    </tr>
                                ) : (
                                    filteredData.map((item) => {

                                        const statusConfig = {
                                            "تم الحل": { class: "bg-gray-200 text-gray-700 font-bold", icon: null },
                                            "مغلق": { class: "bg-orange-700/50 text-orange-700 font-bold", icon: null },
                                            "قيد المراجعة": { class: "bg-amber-900/40 text-amber-900/60 font-bold", icon: <FaEdit className="text-gray-900 text-sm" /> }

                                        };

                                        const currentStatus = statusConfig[item.status] || { class: "bg-gray-100", icon: null };

                                        return (
                                            <tr key={index} className="border-b border-gray-300 last:border-0 hover:bg-gray-50 transition-colors">
                                                <td className="p-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`px-3 py-1 rounded text-white text-xs ${item.color}`}>
                                                            {item.reason}
                                                        </span>

                                                        <span className={`text-xs rounded px-2 py-1 flex items-center gap-1 ${currentStatus.class}`}>
                                                            {item.status}
                                                            {currentStatus.icon && <span >{currentStatus.icon}</span>}

                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-sm font-bold">{item.craftsman}</td>
                                                <td className="p-4 text-sm font-bold">{item.id}</td>
                                                <td className="p-4 text-sm font-bold">{item.user}</td>
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