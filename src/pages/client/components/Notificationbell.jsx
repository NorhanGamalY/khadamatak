import { useState, useRef, useEffect } from "react";
import { FiBell, FiMessageSquare, FiShoppingBag, FiAlertTriangle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useMarkAsRead } from "../../../features/notifications/hooks";

export default function NotificationBell({ notifications = [] }) {
    const navigate = useNavigate();
    const { mutate: markAsRead } = useMarkAsRead();

  const notificationsPage = () => {
    navigate("/notifications"); 
  };
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const unread = notifications.filter((n) => !n.read).length;

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
        className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition text-gray-700"
        aria-label="الإشعارات"
        >
        <FiBell size={22} />
        {unread > 0 && (
            <span
            className="absolute top-1 right-1 flex items-center justify-center rounded-full text-white font-bold"
            style={{ width: 17, height: 17, fontSize: 10, background: "#d75b19" }}
            >
            {unread > 9 ? "9+" : unread}
            </span>
        )}
        </button>

        {open && (
        <div
            className="absolute left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
            style={{ minWidth: 300, top: "110%" }}
        >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <span className="font-bold text-[15px] text-[#1e1855]">الإشعارات</span>
            {unread > 0 && (
                <span className="text-[12px] text-[#d75b19] font-semibold">{unread} جديد</span>
            )}
            </div>

            <div className="max-h-72 overflow-y-auto">
            {notifications.length === 0 ? (
                <div className="py-8 text-center text-gray-400 text-[14px]">لا توجد إشعارات</div>
            ) : (
                notifications.map((n) => (
                <div
                    key={n.id}
                    onClick={() => {
  if (!n.read) {
    markAsRead(n.id);
  }

  navigate("/notifications");
}}
                    className={`flex gap-3 items-start px-4 py-3 cursor-pointer hover:bg-gray-50 transition border-b border-gray-50 last:border-0 ${!n.read ? "bg-orange-50" : ""}`}
                >
                    <div
                    className="mt-1 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                        width: 36, height: 36,
                        background: !n.read ? "#fff3eb" : "#f3f4f6",
                        color: !n.read ? "#d75b19" : "#6b7280",
                    }}
                    >
                    {n.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-gray-800 leading-snug">{n.title}</p>
                    <p className="text-[12px] text-gray-500 mt-0.5 leading-snug">{n.body.slice(0, 30)}...</p>
                    <p className="text-[11px] text-gray-400 mt-1">{n.time}</p>
                    </div>
                    {!n.read && (
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: "#d75b19" }} />
                    )}
                </div>
                ))
            )}
            </div>

            {notifications.length > 0 && (
            <div className="px-4 py-2 border-t border-gray-100">
                <button
  className="w-full text-center text-[13px] text-[#1e1855] font-semibold hover:text-[#d75b19] transition py-1"
  onClick={notificationsPage}
>
  عرض كل الإشعارات
</button>
            </div>
            )}
            
        </div>
        )}
    </div>
    );
}