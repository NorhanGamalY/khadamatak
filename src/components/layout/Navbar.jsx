import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { IoClose, IoPerson } from "react-icons/io5";
import { HiMenuAlt3 } from 'react-icons/hi';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [
    { to: "/home", label: "الرئيسية" },
    { to: "/services", label: "الخدمات" },
    { to: "/works", label: "أعمالنا" },
    { to: "/about", label: "من نحن" },
    { to: "/contacts", label: "تواصل معنا" },
  ]
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const closeMenu = () => {
    setIsMenuOpen(false);
  }

  return (
      <div className="w-[90%] xl:w-[80%] mx-auto flex justify-between gap-3 items-center text-black" >
        <NavLink to="/" end className="text-[40px] order-2 lg:order-1 leading-relaxed no-underline font-bold">
          خد<span className="text-[#d75b19]">ما</span>تك
        </NavLink>
        <div className="bg-transparent order-2  hidden lg:flex lg:w-[40%] justify-between gap-3 ">
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
        className="hidden order-3 lg:flex py-1 px-3 items-center gap-2 rounded-4xl text-[14px] transition bg-[#d75b19] text-[#FFF] hover:bg-[#1e1855]"
          >
          <IoPerson />
          تسجيل الدخول
        </NavLink>
              
        <button
        onClick={toggleMenu}
        className="lg:hidden order-1 text-[30px] z-50 text-black transition hover:text-[#d75b19]"
        aria-label="Toggle menu"
        >
        {isMenuOpen ? <IoClose /> : <HiMenuAlt3 />}
        </button>
      <div
        className={`fixed top-0 right-0 h-screen w-[75%] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-40 lg:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >        <div className="flex flex-col gap-6 p-8 mt-20">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeMenu}
              className={({ isActive }) =>
                `block no-underline text-[20px] transition py-2 border-b border-gray-200 ${
                  isActive
                    ? "text-[#d75b19] font-semibold"
                    : "text-black hover:text-[#d75b19]"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          
        <NavLink
            to="/login"
            onClick={closeMenu}
            className="py-3 px-4 flex items-center justify-center gap-2 rounded-lg text-[16px] transition bg-[#d75b19] text-[#FFF] hover:bg-[#1e1855] mt-4"
          >
            <IoPerson />
            تسجيل الدخول
          </NavLink>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={closeMenu}
        ></div>
      )}
    </div>
  )
}
