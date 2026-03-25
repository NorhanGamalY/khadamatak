import React, { useEffect } from "react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiBell } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Avatar from "../../components/common/Avatar";

export default function Header({
  sidebarOpen,
  setSidebarOpen,
  name,
  role,
  activeTitle,
  profilePath,
  search,
  setSearch,
  placeholder,
  data,
  unreadCount = 0,
  notificationsPath,
  src,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => data, []);

  return (
    <div className="bg-[#ECECF2]">
      <nav
        className={`fixed bg-white top-0 left-0 flex justify-between min-h-20 items-center mx-auto ${sidebarOpen ? "w-100 z-0 lg:w-[90%]" : "w-full z-20"}`}
      >
        <Navbar />
      </nav>
      <div className="bg-[#ECECF2] min-h-5 top-20 left-0 right-0"></div>
      <header
        className={`bg-white border-b border-[#e7e7ef] mt-25 left-0 ${sidebarOpen ? "right-40" : "lg:ps-0 right-0"}`}
      >
        <div dir="ltr" className="px-6 lg:pl-6 lg:px-0">
          <div
            className={`bg-white rounded-xl shadow-[0_1px_0_rgba(0,0,0,0.03)] py-2 lg:items-center gap-3 lg:grid flex justify-between lg:grid-cols-5 ${sidebarOpen ? "lg:w-full lg:pl-26 lg:pr-2" : "lg:w-[83%]"} w-full lg:m-auto`}
          >
            <div className="flex items-center gap-2 lg:col-span-1 order-1 lg:order-1">
              <div
                onClick={() => profilePath && navigate(profilePath)}
                className="h-10 w-10 rounded-full bg-[#f59e0b] flex items-center justify-center text-white font-extrabold cursor-pointer transition-colors"
              >
                <Avatar src={src} name={name} />
              </div>
              <div className="leading-tight text-right hidden lg:grid">
                <div className="text-[13px] font-bold">{name}</div>
                <div className="text-[11px] text-[#6b7280]">{role}</div>
              </div>
            </div>

            <div className="lg:col-span-3 lg:order-3 order-2" dir="rtl">
              <div className="relative lg:max-w-130 mx-auto">
                <input
                  placeholder={placeholder}
                  className="w-full h-9 rounded-xl bg-[#f3f3f7] border border-[#e8e8f0] pr-4 pl-10 text-[13px] outline-none focus:ring-2 focus:ring-[#ffd9c2]"
                  onChange={(e) => setSearch && setSearch(e.target.value)}
                  value={search || ""}
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]">
                  <FaSearch />
                </div>
              </div>
            </div>

            <div
              dir="rtl"
              className="flex items-center order-3 lg:order-3 lg:mr-6 gap-3 text-[#6b7280] text-[13px] lg:col-span-1 lg:ml-auto"
            >
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-[#6b7280] hover:text-primary transition-colors"
              >
                <RxHamburgerMenu />
              </button>

              <span className="font-semibold text-primary hidden lg:flex">
                {activeTitle}
              </span>

              {notificationsPath && (
                <button
                  onClick={() => navigate(notificationsPath)}
                  className="relative text-[#6b7280] hover:text-secondary-orange transition-colors"
                >
                  <FiBell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-[#d75b19] text-white text-[9px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-0.5">
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}