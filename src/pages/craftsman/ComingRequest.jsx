import React, { useState } from "react";
import Avatar from "../../components/common/Avatar";
import { NavLink } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

function ComingRequest() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  const handleStart = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`https://herafie.runasp.net/api/Orders/${id}/start`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(orders.map((o) => (o.id === id ? { ...o, status: 3 } : o)));
      setMessage("تم بدء الطلب");
    } catch (e) {
      console.error(e);
      setMessage("فشل بدء الطلب");
    } finally {
      setTimeout(() => setMessage(""), 2000);
    }
  };

  const handleComplete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`https://herafie.runasp.net/api/Orders/${id}/complete`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(orders.map((o) => (o.id === id ? { ...o, status: 4 } : o)));
      setMessage("تم إتمام الطلب");
    } catch (e) {
      console.error(e);
      setMessage("فشل إتمام الطلب");
    } finally {
      setTimeout(() => setMessage(""), 2000);
    }
  };

  if (loading)
    return <p className="text-center mt-10">جاري تحميل الطلبات...</p>;

  return (
    <>

      {data.filter((order) => order.status === 3).map((order) => (
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
              <p className="text-gray-400 text-sm">{item.serviceName}</p>
            </div>

            <div className="flex flex-col text-center">
              <h3 className="font-semibold">السعر</h3>
              <p className="text-green-600 font-medium">{item.amount} جم</p>
            </div>

          <div className="flex flex-col justify-center items-center text-center md:text-left">
            <h3 className="font-semibold text-sm">
              {new Date(order.scheduledAt).toLocaleDateString("ar-EG")}
            </h3>
            <p className="text-sm">
              {new Date(order.scheduledAt).toLocaleTimeString("ar-EG", {
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
                         px-4 py-2 rounded-md w-full md:w-auto"
            >
              عرض التفاصيل
            </NavLink>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleStart(item.id)}
                  className="bg-blue-500 text-white hover:bg-blue-400 px-4 py-2 rounded-md transition"
                >
                  بدء
                </button>
                <button
                  onClick={() => handleComplete(item.id)}
                  className="bg-green-600 text-white hover:bg-green-500 px-4 py-2 rounded-md transition"
                >
                  انتهاء
                </button>
              </div>
            </div>
          </div>
      ))}
    </>
  ) ;
}

export default ComingRequest;
