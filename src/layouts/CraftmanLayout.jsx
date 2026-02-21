import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Header from "../components/common/Header";

export default function CraftsmanLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeLabel, setActiveLabel] = useState("لوحة التحكم");
  const navItems = [
    { label: "لوحة المعلومات", to: "/craftsman" },
    { label: "ادارة الطلبات", to: "/craftsman/requests" },
    { label: "جدول المواعيد", to: "/craftsman/appointments" },
    { label: "قائمة الخدمات", to: "/craftsman/services" },
    { label: "المحفظة", to: "/craftsman/wallet" },
    { label: "الرسائل", to: "/craftsman/messages" },
    { label: "الاعدادات", to: "/craftsman/settings" },
  ];
  return (
    <div className="flex flex-col lg:flex-row min-h-screen text-black">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`
        w-64 flex flex-col justify-between border-r border-white/5 bg-[#1e1855] ps-6 py-8
        fixed lg:fixed top-0 right-0 h-full z-50
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        <div>
          <nav className="space-y-4 mt-8 pt-8">
            {navItems.map((item) => (
              <NavItem
                key={item.to}
                label={item.label}
                to={item.to}
                onClick={() =>
                  window.innerWidth < 1024 && setSidebarOpen(false)
                }
                setActiveLabel={setActiveLabel}
              />
            ))}
          </nav>
        </div>
        <div></div>
      </aside>

      <main
        className={`
       flex-1 transition-all duration-300
        ${sidebarOpen ? "lg:mr-64" : "lg:mr-0"}
      `}
      >
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          name={"يوسف النجار"}
          role={"سباك محترف"}
          activeTitle={activeLabel}
          profilePath={"/craftsman/profile"}
        />
        <Outlet />
      </main>
    </div>
  );
}
const NavItem = ({ label, to, onClick, setActiveLabel }) => (
  <NavLink
    to={to}
    end={to === "/craftsman"}
    className={({ isActive }) => {
      if (isActive) {
        setActiveLabel(label);
      }
      return `flex items-center justify-between px-4 py-2.5 rounded-lg cursor-pointer transition-colors ${
        isActive
          ? "bg-[#d75b19] text-white text-[20px]"
          : "text-[#8A8A8A] text-[16px] hover:bg-white/5 hover:text-white"
      }`;
    }}
  >
    <span className="font-medium">{label}</span>
  </NavLink>
);
