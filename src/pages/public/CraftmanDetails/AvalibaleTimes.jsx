import React, { useState } from 'react'
import { GoDotFill } from "react-icons/go";

const dayNames = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

function AvalibaleTimes({ availabilities, prices }) {
            const priceInfo = prices ? {
            range: `${Math.min(...prices)} - ${Math.max(...prices)} جنية`,
        } : null;
    const daysAvailability = dayNames.map((name, index) => {
        const Works = availabilities?.find(a => a.day === index);
        return {
            name,
            available: Works ? true : false,
            from: Works?.from,
            to: Works?.to
        };
    });
    return (
        <>
            <div className="bg-white p-4 rounded-xl border border-gray-50 shadow-sm">
                <h3 className="font-bold mb-3">المواعيد المتاحة</h3>
                <div className="flex flex-wrap justify-center gap-2">
                    {daysAvailability.map((day, x) => (
                        <span key={x} className={`... ${day.available ? "bg-[#38BD0E] px-2 rounded-lg " : "bg-[#BD0E0E] px-2 rounded-lg"}`}>
                            {day.name}
                        </span>
                    ))}
                </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-50 shadow-sm">
                <h3 className="font-bold mb-2">السعر التقريبي:</h3>
                <p className="text-[#D75B19] font-bold text-xl ps-5">{priceInfo?.range}</p>
                <p className="text-sm mt-2 flex items-center">

                    <span><GoDotFill className="text-2xl text-gray-400"
                    /></span>يتم تحديد السعر بعد المعاينة</p>
            </div>
        </>
    );
}


export default AvalibaleTimes
