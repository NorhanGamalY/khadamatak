import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoClose, IoPerson } from "react-icons/io5";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoLogOutOutline } from "react-icons/io5";
import { FiMessageSquare, FiShoppingBag, FiAlertTriangle,} from "react-icons/fi";
import NotificationBell from "../../pages/client/components/Notificationbell";
import ProfileDropdown from "../../pages/client/components/Profiledropdown";
import { useNotifications } from "../../features/notifications/hooks";
import { formatTime } from "../../utils/time";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../features/auth/authHelpers";

const navItems = [
  { to: "/home", label: "الرئيسية" },
  { to: "/services", label: "الخدمات" },
  { to: "/works", label: "أعمالنا" },
  { to: "/about", label: "من نحن" },
  { to: "/contacts", label: "تواصل معنا" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const isLoggedIn = !!token;
  const role = localStorage.getItem("role") || sessionStorage.getItem("role");
  const isClient = role === "Client";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    ["token", "role", "userName", "userAvatar"].forEach((key) => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
    closeMenu();
    navigate("/select-role");
  };


const { data: notifications = [] } = useNotifications({
  enabled: isLoggedIn && isClient
});

const mappedNotifications = notifications?.map((n) => ({
  id: n.id,
  title: n.title,
  body: n.message,
  time: formatTime(n.createdAt),
  isRead: n.isRead,
  icon: <FiAlertTriangle size={16} />,
}));

  const { data: chatList = [] } = useQuery({
    queryKey: ["chatList"],
    queryFn: async () => {
      const res = await fetch("https://herafie.runasp.net/api/Chat/chat-list", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!res.ok) throw new Error("فشل");
      return res.json();
    },
    enabled: isLoggedIn && isClient,
    refetchInterval: 10000,
  });

  const totalUnreadMessages = chatList.reduce(
    (sum, chat) => sum + (chat.unreadCount || 0),
    0
  );

  return (
    <div className="w-[90%] xl:w-[80%] mx-auto flex justify-between gap-3 items-center text-black">
      <NavLink
        to="/"
        end
        className="text-[40px] order-2 lg:order-1 leading-relaxed no-underline font-bold"
      >
        خد<span className="text-secondary-orange">ما</span>تك
      </NavLink>

      <div className="bg-transparent order-2 hidden lg:flex lg:w-[40%] justify-between gap-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `inline-block no-underline text-[18px] transition ${
                isActive
                  ? "text-secondary-orange font-semibold"
                  : "hover:text-secondary-orange"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      <div className="hidden order-3 lg:flex items-center gap-2">
        {isLoggedIn && isClient ? (
          <>
            <NotificationBell notifications={mappedNotifications} />
          <ProfileDropdown
              onLogout={handleLogout}
              unreadMessages={totalUnreadMessages}
            />          
          </>
        ) : isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-4xl text-[14px] transition bg-secondary text-white hover:bg-secondary-orange py-1 px-3"
          >
            <IoLogOutOutline />
            تسجيل الخروج
          </button>
        ) : (
          <NavLink
            to="/login"
            className="flex items-center gap-2 rounded-4xl text-[14px] transition bg-secondary-orange text-white hover:bg-secondary py-1 px-3"
          >
            <IoPerson />
            تسجيل الدخول
          </NavLink>
        )}
      </div>

      <button
        onClick={toggleMenu}
        className="lg:hidden order-1 text-[30px] z-50 text-black transition hover:text-secondary-bg-secondary-orange"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <IoClose /> : <HiMenuAlt3 />}
      </button>

      <div
        className={`fixed top-0 right-0 h-screen w-[75%] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-40 lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-6 p-8 mt-20">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeMenu}
              className={({ isActive }) =>
                `block no-underline text-[20px] transition py-2 border-b border-gray-200 ${
                  isActive
                    ? "text-secondary-bg-secondary-orange font-semibold"
                    : "text-black hover:text-secondary-bg-secondary-orange"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {isLoggedIn && isClient && (
            <div className="flex flex-col gap-1">
              {[
                {
                  to: "/messages",
                  label: "الرسائل",
                  icon: <FiMessageSquare />,
                  badge: totalUnreadMessages,
                },
                { to: "/orders", label: "الطلبات", icon: <FiShoppingBag /> },
                {
                  to: "/disputes",
                  label: "النزاعات",
                  icon: <FiAlertTriangle />,
                },
              ].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={closeMenu}
                  className="flex items-center gap-3 text-[17px] py-2 text-gray-700 hover:text-secondary-bg-secondary-orange transition"
                >
                  {item.icon}
                  {item.label}
                  {item.badge > 0 && (
                    <span className="bg-[#d75b19] text-white text-[10px] rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-bold px-1">
                      {item.badge > 99 ? "99+" : item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          )}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 py-3 px-4 justify-center rounded-lg text-[16px] mt-4 w-full bg-red-500 text-white hover:bg-red-600 transition"
            >
              <IoLogOutOutline />
              تسجيل الخروج
            </button>
          ) : (
            <NavLink
              to="/login"
              onClick={closeMenu}
              className="flex items-center gap-2 py-3 px-4 justify-center rounded-lg text-[16px] mt-4 bg-secondary-orange text-white hover:bg-secondary transition"
            >
              <IoPerson />
              تسجيل الدخول
            </NavLink>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={closeMenu}
        />
      )}
    </div>
  );
}
