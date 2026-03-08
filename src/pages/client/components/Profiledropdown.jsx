import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { FiMessageSquare, FiShoppingBag, FiAlertTriangle, FiChevronDown } from "react-icons/fi";
import Avatar from "../../../components/common/Avatar";

const menuItems = [
  { icon: <FiMessageSquare size={17} />, label: "الرسائل", to: "/chat" },
  { icon: <FiShoppingBag size={17} />, label: "الطلبات", to: "/orders" },
  { icon: <FiAlertTriangle size={17} />, label: "النزاعات", to: "/disputes" },
];

export default function ProfileDropdown({ onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-gray-100 transition"
        aria-label="الملف الشخصي"
      >
        <Avatar size={36} />
        <FiChevronDown
          size={15}
          className="text-gray-500 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {open && (
        <div
          className="absolute left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
          style={{ minWidth: 210, top: "110%" }}
        >
          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item) => (
              <button
                key={item.to}
                onClick={() => { navigate(item.to); setOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 text-[14px] text-gray-700 hover:bg-orange-50 hover:text-[#d75b19] transition text-right"
              >
                <span className="text-gray-400">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Logout */}
          <div className="border-t border-gray-100 py-2">
            <button
              onClick={() => { onLogout(); setOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-3 text-[14px] text-red-500 hover:bg-red-50 transition text-right"
            >
              <IoLogOutOutline size={17} />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}