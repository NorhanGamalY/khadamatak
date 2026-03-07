import React from "react";
import { useNotifications } from "../../features/notifications/hooks";
import { formatTime } from "../../utils/time";
import { FaCheckCircle } from "react-icons/fa";

export default function Notifications() {
  const { data: notifications = [] } = useNotifications();

  return (
    <div className="w-[90%] xl:w-[80%] mx-auto m-20">
      <h1 className="text-2xl font-bold text-center mb-6">الإشعارات</h1>
      <div className="flex flex-col gap-4">
        {notifications.length === 0 ? (
          <p>لا توجد إشعارات حتى الآن.</p>
        ) : (
          notifications.map((n) => (
          <div key={n.id} className="flex gap-4 items-center px-4 py-3 border border-gray-100 rounded shadow">
             <button className="bg-secondary-orange text-white text-lg px-4 py-1 rounded-md hover:bg-[#bf4f16]">
              فتح الطلب
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-md font-semibold text-gray-800">{n.title}</p>
              <p className="text-sm text-gray-500 mt-1">{n.message}</p>
              <p className="text-xs text-gray-400 mt-1">{formatTime(n.createdAt)}</p>
            </div>
           {!n.isRead && (
    <FaCheckCircle className="text-green-500 text-2xl" />
  )}

          </div>
        ))
        )}
      </div>
    </div>
  );
}