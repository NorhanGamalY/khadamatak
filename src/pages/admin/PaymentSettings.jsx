import React, { useState } from 'react'
import { FaPaypal } from "react-icons/fa";
import { FaStripeS } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

export default function PaymentSettings() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("كل يوم الخميس");
    return (
    <>
        <section >
            <div className="bg-white rounded-xl border border-[#E6E6EF] shadow-sm overflow-hidden w-full">
                <div className="py-4 px-4 text-center sm:px-6 pt-5 pb-4">
                <h2 className="text-right font-extrabold text-[16px] text-[#111827]">
                            بوابات الدفع والحسابات
                </h2>
                </div>
            <div className="px-4 sm:px-6 pb-6">
                <div className="bg-[#EFEFF4] rounded-lg px-3 sm:px-4 py-3 mb-3">
                <div className="flex items-center justify-between gap-3">
                    <button className="h-9 px-5 rounded-[10px] bg-white border border-[#E6E6EF] text-[13px] font-semibold text-[#111827] shadow-[0_2px_0_rgba(0,0,0,0.06)]">
                                    اعدادات
                    </button>
                <div className="flex items-center gap-3">
                    <div className="text-right leading-tight">
                        <div className="text-[13px] font-semibold">PayPal</div>
                        <div className="text-[12px] font-bold text-[#16a34a]">
                            مفعل
                        </div>
                        </div>
                    <div className="h-9 w-9 rounded-md flex items-center justify-center overflow-hidden">
                        <FaPaypal />
                    </div>
                </div>
                </div>
                </div>
                <div className="bg-[#EFEFF4] rounded-lg px-3 sm:px-4 py-3 mb-3">
                    <div className="flex items-center justify-between gap-3">
                        <button className="h-9 px-4 rounded-md bg-white border border-[#DADBE6] text-[13px] font-semibold text-[#374151] shadow-[0_1px_0_rgba(0,0,0,0.04)]">
                            إعدادات
                        </button>
            <div className="flex items-center gap-3">
                <div className="text-right leading-tight">
                    <div className="text-[13px] font-semibold">
                        Stripe / البطاقات
                    </div>
                    <div className="text-[12px] font-bold text-[#16a34a]">
                        مفعل (لوضع التجربة)
                    </div>
                    </div>
                <div className="h-9 w-9 rounded-md  flex items-center justify-center">
                    <FaStripeS />
                </div>
            </div>
                </div>
                </div>
            <div className="text-[13px] font-semibold text-[#374151]  text-center pb-2 ">
                            جدول التحويلات التلقائي
            </div>
            <div className="bg-[#EFEFF4] rounded-lg px-3 sm:px-4 py-3 mb-4 relative">
            <div className="flex items-center justify-between">
            <button type="button"
                    onClick={() => setOpen(!open)}
                    className="h-9 w-9 rounded-md bg-white border border-[#D6D7E6] flex items-center justify-center"
                    >
                    <IoMdArrowDropdown />
            </button>
                                <div className="text-[13px] font-semibold text-[#374151]">
                                    {value}
                                </div>
                            </div>
                            {open && (
                                <div className="absolute left-0 mt-2 w-full bg-white border border-[#D6D7E6] rounded-md shadow-md z-10">
                                    {["كل يوم الخميس", "كل يوم", "كل أسبوع", "كل شهر"].map((item) => (
                                        <button
                                            key={item}
                                            onClick={() => {
                                                setValue(item);
                                                setOpen(false);
                                            }}
                                            className="block w-full text-right px-1 py-1 hover:bg-[#F3F4F6] text-[13px]"
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="flex justify-start">
                            <button className="h-11 w-[180px] rounded-md bg-[#0B0F2A] text-white font-extrabold text-[14px] shadow-[0_2px_0_rgba(0,0,0,0.18)]">
                                حفظ التغييرات
                            </button>
                        </div>
            </div>
            </div>
        </section>

        </>
    )
}




