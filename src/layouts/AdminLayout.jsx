import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';

export default function AdminLayout() {
  const navItems = [
    { label: "لوحة التحكم", to: "/admin" },
    { label: "الحرفيين", to: "/admin/craftsmen" },
    { label: "قائمة الخدمات", to: "/admin/services" },
    { label: "الطلبات", to: "/admin/requests" },
    { label: "التقارير", to: "/admin/reports" },
    { label: "الاعدادات", to: "/admin/settings" },
  ];
  return (
    <div className="flex flex-col lg:flex-row min-h-screen text-black">
      <aside className="w-64 xl:flex lg:flex-col justify-between items-between border-r border-white/5 bg-[#1e1855] ps-6 py-8 hidden">
        <div>
          <nav className="space-y-4 mt-8 pt-8">
            {navItems.map((item) => (
              <NavItem key={item.to} label={item.label} to={item.to} />
            ))}
          </nav>
        </div>
        <div>
        </div>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}
const NavItem = ({ label, to }) => (
  <NavLink
    to={to}
    end={to === "/admin"}
    className={({ isActive }) =>
      `flex items-center justify-between px-4 py-2.5 rounded-lg cursor-pointer transition-colors ${isActive
        ? "bg-[#d75b19] text-white text-[20px]"
        : "text-[#8A8A8A] text-[16px] hover:bg-white/5 hover:text-white"
      }`}>
    <span className="font-medium">{label}</span>
  </NavLink>
);
