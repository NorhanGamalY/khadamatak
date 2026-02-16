import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

export default function Settings() {
    const navItems = [
    { label: "إعدادات عامة", to: "/admin/settings" },
    { label: "إعدادات الدفع", to: "payment" },
    { label: "العمولة والرسوم", to: "services" },
    ];

    return (
        <div dir="ltr" className="min-h-screen bg-[#ECECF2] text-[#111827]">
            <main className="mx-auto  px-3 sm:px-4 py-6"> 
                <div className="flex flex-wrap justify-between items-start items-start">
                    <aside className="order-1 lg:order-2 w-[100%] lg:w-[35%]">
                    <div className="text-right mb-3">
                            <h1 className="text-[22px] font-extrabold text-[#111827]">
                                إعدادات المنصة
                            </h1>
                            <p className="text-[12px] text-[#6b7280] mt-1">
                                تحكم في إعدادات النظام، العمولات، وبوابات الدفع
                            </p>
                        </div>
                        <div className="space-y-2">
                            {navItems.map((item) => (
                                <NavItem key={item.to} label={item.label} to={item.to} />
                            ))}
                            <button className="w-full flex items-center justify-end gap-2 py-2 text-[14px] font-bold text-[#ef4444]">
                                <span>تسجيل خروج</span>
                                <span className="text-[#ef4444]">
                                <FiLogOut />
                                </span>
                            </button>
                        </div>
                    </aside>
                    <main className="order-1 lg:order-1 w-[100%] lg:w-[50%]">
                    <Outlet />
                    </main>
                </div>
            </main>
        </div>
    );
}

    const NavItem = ({ label, to }) => (
        <NavLink
            to={to}
            end={to === "/admin/settings"}
            className={({ isActive }) =>
            `w-full h-11 rounded-md font-extrabold text-[14px] flex items-center justify-center gap-2 shadow-sm ${isActive
            ? "bg-[#d75b19] text-white text-[20px]"
            : "text-[#8A8A8A] text-[16px] hover:bg-white/5 hover:text-white"
            }`}>
            <span className="font-medium">{label}</span>
        </NavLink>
        );
