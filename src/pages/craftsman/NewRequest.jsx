import React, { useState } from "react";
import Avatar from "../../components/common/Avatar";
import { NavLink } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { notifyUser, NOTIFICATION_MESSAGES } from "../../features/notifications/notificationApi";

function NewRequest() {
  const { orders, setOrders, loading } = useOutletContext();
  const [message, setMessage] = useState("");

  const data = orders.filter((o) => o.status === 0);

  const notify = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2500);
  };

  const handleAccept = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://herafie.runasp.net/api/Orders/${id}/accept`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error();

      const order = orders.find((o) => o.id === id);
      if (order?.userId) {
        const { title, message: msg } = NOTIFICATION_MESSAGES.ORDER_ACCEPTED;
        notifyUser(order.userId, title, msg);
      }

      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: 1 } : o))
      );
      notify("✅ تم قبول الطلب بنجاح");
    } catch {
      notify("❌ فشل قبول الطلب");
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://herafie.runasp.net/api/Orders/${id}/reject`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error();

      const order = orders.find((o) => o.id === id);
      if (order?.userId) {
        const { title, message: msg } = NOTIFICATION_MESSAGES.ORDER_REJECTED;
        notifyUser(order.userId, title, msg);
      }

      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: 2 } : o))
      );
      notify("تم رفض الطلب");
    } catch {
      notify("❌ فشل رفض الطلب");
    }
  };

  if (loading)
    return <p className="text-center mt-10">جاري تحميل الطلبات...</p>;

  if (data.length === 0)
    return <p className="text-center mt-10 text-gray-400">لا توجد طلبات جديدة</p>;

  return (
    <>
      {message && (
        <p className="text-center text-green-600 mb-4 font-semibold">
          {message}
        </p>
      )}

      {data.map((item) => {
        const date = new Date(item.scheduledAt);
        return (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm p-4 md:p-6 flex flex-col md:flex-row gap-3 md:gap-2 md:items-center md:justify-between mb-4 hover:shadow-md transition"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center text-center md:text-right">
              <Avatar />
              <h3 className="font-semibold text-gray-800">{item.clientName}</h3>
            </div>

            <div className="flex flex-col text-center">
              <h3 className="font-semibold">الخدمة</h3>
              <p className="text-gray-400 text-sm">{item.serviceName}</p>
            </div>

            <div className="flex flex-col text-center">
              <h3 className="font-semibold">السعر</h3>
              <p className="text-green-600 font-medium">{item.amount} جم</p>
            </div>

            <div className="flex flex-col text-center">
              <h3 className="text-sm font-medium">
                {date.toLocaleDateString("ar-EG")}
              </h3>
              <p className="text-gray-500 text-sm">
                {date.toLocaleTimeString("ar-EG", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <div className="flex flex-col gap-3 w-full md:w-auto">
              <NavLink
                to={`/craftsman/requests/details/${item.id}`}
                className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium text-sm px-4 py-2 rounded-md transition text-center"
              >
                عرض التفاصيل
              </NavLink>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleReject(item.id)}
                  className="bg-red-100 text-red-600 hover:bg-red-200 px-4 py-2 rounded-md transition"
                >
                  رفض
                </button>
                <button
                  onClick={() => handleAccept(item.id)}
                  className="bg-blue-900 text-white hover:bg-blue-800 px-4 py-2 rounded-md transition"
                >
                  قبول
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default NewRequest;