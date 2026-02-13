import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoPerson } from "react-icons/io5";

export default function Navbar() {
  const navItems = [
    { to: "/home", label: "الرئيسية" },
    { to: "/services", label: "الخدمات" },
    { to: "/works", label: "أعمالنا" },
    { to: "/about", label: "من نحن" },
    { to: "/contacts", label: "تواصل معنا" },
  ]
  return (
    <nav className={`fixed top-0 left-0 flex justify-between min-h-[80px] items-center z-50 w-full py-2`} >
      <div className="w-[90%] xl:w-[80%] mx-auto flex justify-between gap-3 items-center text-black" >
        <NavLink to="/" end className="text-[40px] leading-relaxed no-underline font-bold">
          خد<span className="text-[#d75b19]">ما</span>تك
        </NavLink>
        <div className="bg-transparent hidden lg:flex lg:w-[40%] justify-between gap-3 ">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `inline-block no-underline text-[18px] transition ${isActive
                  ? "text-[#d75b19] font-semibold"
                  : "hover:text-[#d75b19]"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <NavLink
          to="/login"
          className="py-1 px-3 flex items-center gap-2 rounded-4xl text-[14px] transition bg-[#d75b19] text-[#FFF] hover:bg-[#1e1855]">
          <IoPerson />
          تسجيل الدخول

        </NavLink>
      </div>

    </nav>
  )
}
