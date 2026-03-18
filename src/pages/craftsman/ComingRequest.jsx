import React, { useState } from "react";
import Avatar from "../../components/common/Avatar";
import { NavLink } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { notifyUser, NOTIFICATION_MESSAGES } from "../../features/notifications/notificationApi";

function ComingRequest() {
  const { orders, setOrders, loading } = useOutletContext();
  const [message, setMessage] = useState("");

  const data = orders.filter((o) => o.status === 1 || o.status === 3);

  const notify = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2500);
  };

  const handleStart = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://herafie.runasp.net/api/Orders/${id}/start`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error();
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: 3 } : o))
      );
      notify("✅ تم بدء الطلب");
    } catch {
      notify("❌ فشل بدء الطلب");
    }
  };

  const handleComplete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://herafie.runasp.net/api/Orders/${id}/complete`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error();

      const order = orders.find((o) => o.id === id);
      if (order?.userId) {
        const { title, message: msg } = NOTIFICATION_MESSAGES.ORDER_COMPLETED;
        notifyUser(order.userId, title, msg);
      }

      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: 4 } : o))
      );
      notify("✅ تم إتمام الطلب بنجاح");
    } catch {
      notify("❌ فشل إتمام الطلب");
    }
  };

  if (loading)
    return <p className="text-center mt-10">جاري تحميل الطلبات...</p>;

  if (data.length === 0)
    return <p className="text-center mt-10 text-gray-400">لا توجد طلبات جارية</p>;

  return (
    <>
      {message && (
        <p className="text-center text-green-600 mb-4 font-semibold">
          {message}
        </p>
      )}

      {data.map((order) => {
        const date = new Date(order.scheduledAt);
        return (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-sm p-4 md:p-6
                        flex flex-col md:flex-row gap-4 md:gap-2
                        md:items-center md:justify-between
                        mb-4 hover:shadow-md transition"
          >
            <div className="flex justify-start items-center gap-4">
              <Avatar />
              <h3 className="font-semibold text-gray-800">{order.clientName}</h3>
            </div>

            <div className="flex flex-col text-center">
              <h3 className="font-semibold">الخدمة</h3>
              <p className="text-gray-400 text-sm">{order.serviceName}</p>
            </div>

            <div className="flex flex-col text-center">
              <h3 className="font-semibold">السعر</h3>
              <p className="text-green-600 font-medium">{order.amount} جم</p>
            </div>

            <div className="flex flex-col justify-center items-center text-center">
              <h3 className="font-semibold text-sm">
                {date.toLocaleDateString("ar-EG")}
              </h3>
              <p className="text-sm text-gray-500">
                {date.toLocaleTimeString("ar-EG", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <div className="flex flex-col gap-3 w-full md:w-auto">
              <NavLink
                to={`/craftsman/requests/details/${order.id}`}
                className="bg-white border border-gray-300
                            hover:bg-gray-100 transition
                            text-gray-700 font-medium text-sm
                            px-4 py-2 rounded-md text-center"
              >
                عرض التفاصيل
              </NavLink>

              <div className="flex flex-col sm:flex-row gap-3">
                {order.status === 1 && (
                  <button
                    onClick={() => handleStart(order.id)}
                    className="bg-blue-500 text-white hover:bg-blue-400 px-4 py-2 rounded-md transition"
                  >
                    بدء
                  </button>
                )}
                {order.status === 3 && (
                  <button
                    onClick={() => handleComplete(order.id)}
                    className="bg-green-600 text-white hover:bg-green-500 px-4 py-2 rounded-md transition"
                  >
                    انتهاء
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ComingRequest;