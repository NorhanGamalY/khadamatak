import React from "react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import Navbar from "../../components/layout/Navbar";
import Avatar from "../../components/common/Avatar";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/searchContext";

export default function Header({
  sidebarOpen,
  setSidebarOpen,
  name,
  role,
  activeTitle,
  profilePath,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(true);
  const navigate = useNavigate();
  const { search, setSearch } = useSearch();
  return (
    <div className="bg-[#ECECF2]">
      <nav
        className={`fixed bg-white top-0 left-0 flex justify-between min-h-[80px] items-center z-50  mx-auto ${sidebarOpen ? "w-[50%] lg:w-[83%]" : "w-full"}`}
      >
        <Navbar />
      </nav>
      <div className="bg-[#ECECF2] min-h-[20px] top-[80px] left-0 right-0"></div>
      <header
        className={`bg-white border-b border-[#e7e7ef] mt-[100px] left-0 ${sidebarOpen ? "lg:ps-10 right-40" : "lg:ps-0 right-0"}`}
      >
        <div className="mx-auto px-3 sm:px-4">
          <div className="bg-white rounded-xl shadow-[0_1px_0_rgba(0,0,0,0.03)] px-3 sm:px-4 py-2 flex items-center gap-3 flex-row-reverse">
            <div className="flex items-center gap-3]">
              <div className="leading-tight text-right me-3">
                <div className="text-[13px] font-bold">{name}</div>
                <div className="text-[11px] text-[#6b7280]">{role}</div>
              </div>
              <div
                onClick={() => navigate(profilePath)}
                className="h-10 w-10 rounded-full bg-[#f59e0b] flex items-center justify-center text-white font-extrabold cursor-pointer hover:bg-[#f59e0b]/90 transition-colors"
              >
                <Avatar name={name} />
              </div>
            </div>
            <div className="flex-1">
              <div className="relative max-w-[520px] mx-auto">
                <input
                  placeholder="بحث..."
                  className="w-full h-9 rounded-xl bg-[#f3f3f7] border border-[#e8e8f0] pr-4 pl-10 text-[13px] outline-none focus:ring-2 focus:ring-[#ffd9c2]"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]">
                  <FaSearch />
                </div>
              </div>
            </div>
            <div className="lg:flex items-center gap-2 text-[#6b7280] text-[13px] min-w-[140px] justify-end">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-[#6b7280] hover:text-[#111827] transition-colors"
              >
                <RxHamburgerMenu />
              </button>
              <span className="font-semibold text-[#111827]">
                {activeTitle}
              </span>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
