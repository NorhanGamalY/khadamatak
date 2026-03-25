import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import axios from "axios";
import { getId, getToken } from "../features/auth/authHelpers";
import { useNotifications } from "../features/notifications/hooks";

export default function CraftsmanLayout() {
  const id = getId();
  const token = getToken();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeLabel, setActiveLabel] = useState("لوحة التحكم");
  const [craftsmanData, setCraftsmanData] = useState({});
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const { data: notifications = [] } = useNotifications();
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const navItems = [
    { label: "لوحة المعلومات", to: "/craftsman" },
    { label: "ادارة الطلبات", to: "/craftsman/requests" },
    { label: "جدول المواعيد", to: "/craftsman/appointments" },
    { label: "قائمة الخدمات", to: "/craftsman/services" },
    { label: "تقيماتي", to: "/craftsman/evaluate" },
    { label: "المحفظة", to: "/craftsman/wallet" },
    { label: "الرسائل", to: "/craftsman/messages" },
    { label: "النزاعات", to: "/craftsman/conflicts" },
    { label: "الاشعارات", to: "/craftsman/notifications" },
  ];

  const getCraftsmanName = async () => {
    try {
      const res = await axios.get("https://herafie.runasp.net/api/Craftsmen/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCraftsmanData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id && token) getCraftsmanName();
  }, [id, token]);

  const handleLogout = () => {
    ["token", "role", "userName", "userAvatar"].forEach((key) => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
    setIsLogoutOpen(false);
    navigate("/login");
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen text-black">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <aside className={`
        w-64 flex flex-col justify-between border-r border-white/5 bg-secondary ps-6 py-8
        fixed lg:fixed top-0 right-0 h-full z-50
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "translate-x-full"}
      `}>
        <div>
          <nav className="space-y-4 mt-8 pt-8">
            {navItems.map((item) => (
              <NavItem
                key={item.to}
                label={item.label}
                to={item.to}
                onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                setActiveLabel={setActiveLabel}
                badge={item.to === "/craftsman/notifications" && unreadCount > 0 ? unreadCount : 0}
              />
            ))}
            <button
              onClick={() => setIsLogoutOpen(true)}
              className="w-full flex items-center px-4 py-2.5 rounded-lg text-[#8A8A8A] text-[16px] hover:bg-white/5 hover:text-white transition-colors"
            >
              <span className="font-medium">تسجيل الخروج</span>
            </button>
          </nav>
        </div>
      </aside>

      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "lg:mr-64" : "lg:mr-0"}`}>
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          name={craftsmanData.fullName || "اسم المستخدم"}
          role={craftsmanData.bio || "عن المستخدم"}
          src={craftsmanData.profilePicture}
          activeTitle={activeLabel}
          profilePath="/craftsman/profile"
          search={search}
          setSearch={setSearch}
          placeholder={placeholder}
          notificationsPath="/craftsman/notifications"
          unreadCount={unreadCount}
        />
        <Outlet context={{ setSearch, placeholder, setPlaceholder, search }} />

        {isLogoutOpen && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-8 w-full max-w-sm text-center mx-4 shadow-xl">
              <h2 className="text-[#ef4444] text-xl font-bold mb-2">تسجيل الخروج</h2>
              <p className="text-gray-500 mb-6 text-sm">إذا قمت بتسجيل الخروج ستفقد كل البيانات الخاصة بالمنصة</p>
              <div className="flex flex-col gap-3">
                <button onClick={() => setIsLogoutOpen(false)} className="w-full bg-[#1e1b4b] text-white py-2 rounded-lg font-bold">
                  رجوع
                </button>
                <button onClick={handleLogout} className="w-full border border-red-100 text-[#ef4444] py-2 rounded-lg font-bold hover:bg-red-50">
                  تسجيل الخروج
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const NavItem = ({ label, to, onClick, setActiveLabel, badge }) => (
  <NavLink
    to={to}
    end={to === "/craftsman"}
    onClick={onClick}
    className={({ isActive }) => {
      if (isActive) setActiveLabel(label);
      return `flex items-center justify-between px-4 py-2.5 rounded-lg cursor-pointer transition-colors ${
        isActive ? "bg-[#d75b19] text-white text-[20px]" : "text-[#8A8A8A] text-[16px] hover:bg-white/5 hover:text-white"
      }`;
    }}
  >
    <span className="font-medium">{label}</span>
    {badge > 0 && (
      <span className="bg-[#d75b19] text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 ml-2">
        {badge > 99 ? "99+" : badge}
      </span>
    )}
  </NavLink>
);