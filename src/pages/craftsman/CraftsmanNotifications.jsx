import React from "react";
import { useMarkAsRead, useNotifications } from "../../features/notifications/hooks";
import { formatTime } from "../../utils/time";
import { FaCheckCircle } from "react-icons/fa";
import SplashLoader from "../../components/common/SplashLoader";

export default function CraftsmanNotifications() {
  const { data: notifications = [], isLoading, error } = useNotifications();
  const { mutate: markAsRead } = useMarkAsRead();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SplashLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        فشل تحميل الإشعارات
      </div>
    );
  }

  return (
    <div className="w-[90%] xl:w-[80%] mx-auto m-20" dir="rtl">
      <h1 className="text-2xl font-bold text-center mb-6">الإشعارات</h1>
      <div className="flex flex-col gap-4">
        {notifications.length === 0 ? (
          <p className="text-center text-gray-400">لا توجد إشعارات حتى الآن.</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`flex gap-4 items-center px-4 py-3 border rounded shadow transition-all ${
                n.isRead ? "border-gray-100 bg-white" : "border-orange-200 bg-orange-50"
              }`}
            >
              <div className="flex-1 min-w-0">
                <p className="bg-secondary-orange text-white inline-block text-sm px-4 py-1 rounded-md">
                  {n.title}
                </p>
                <p className="text-sm text-gray-500 mt-1">{n.message}</p>
                <p className="text-xs text-gray-400 mt-1">{formatTime(n.createdAt)}</p>
              </div>
              {!n.isRead && (
                <FaCheckCircle
                  onClick={() => markAsRead(n.id)}
                  className="text-green-500 text-2xl cursor-pointer flex-shrink-0 hover:text-green-600 transition-colors"
                  title="تحديد كمقروء"
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}