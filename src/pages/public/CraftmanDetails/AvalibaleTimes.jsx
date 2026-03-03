import React, { useState } from 'react'
import { GoDotFill } from "react-icons/go";

const days = [
    { name: "السبت", available: false },
    { name: "الأحد", available: true },
    { name: "الأثنين", available: true },
    { name: "الثلاثاء", available: false },
    { name: "الأربعاء", available: true },
    { name: "الخميس", available: true },
    { name: "الجمعة", available: false },
];

const priceInfo = {
    range: "300 - 900 جنية",
    note: "يتم تحديد السعر بعد المعاينة",
};

function AvalibaleTimes() {
    // const [active, setActive] = useState(false);
    // const handelClick = () => {
    //     setActive(!active);
    // }
    return (
        <>

            <div className="bg-white p-4 rounded-xl border border-gray-50 shadow-sm">
                <h3 className="font-bold mb-3">المواعيد المتاحة</h3>
                <div className="flex flex-wrap justify-center gap-2">
                    {days.map((day, idx) => (
                        <span
                            key={idx}
                            className={`px-2 py-1 rounded text-sm font-semibold ${day.available ? "bg-[#38BD0E]" : "bg-[#BD0E0E]"
                                }`}
                        >
                            {day.name}
                        </span>
                    ))}
                </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-50 shadow-sm">
                <h3 className="font-bold mb-2">السعر التقريبي:</h3>
                <p className="text-[#D75B19] font-bold text-xl ps-5">{priceInfo.range}</p>
                <p className="text-sm mt-2 flex items-center">

                    <span><GoDotFill className="text-2xl text-gray-400"
                    /></span>{priceInfo.note}</p>
            </div>
        </>
    );
}


export default AvalibaleTimes
