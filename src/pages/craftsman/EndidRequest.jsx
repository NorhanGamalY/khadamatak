import React, { useEffect, useState } from "react";
import getorder_craftman from "../../api/getorder_craftman";
import Avatar from "../../components/common/Avatar";
import { NavLink } from 'react-router-dom';

export default function EndedRequest() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRequest() {
      try {
        const res = await getorder_craftman();
        setData(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchRequest();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">جاري تحميل الطلبات...</p>;
  }

  return (
    <>
      {data.filter((order) => order.status === 4).map((order) => (
        <div
          key={order.id}
          className="bg-white rounded-xl shadow-sm p-4 md:p-6
                    flex flex-col md:flex-row gap-4 md:gap-2
                    md:items-center md:justify-between
                    mb-4 hover:shadow-md transition"
        >
          <Avatar />

          <div className="flex flex-col justify-center items-center text-center md:text-left">
            <h3 className="font-semibold text-lg">{order.clientName}</h3>
            <p className="text-gray-500 text-sm">
              {order.address || "غير محدد"}
            </p>
          </div>

          <div className="flex flex-col justify-center items-center text-center md:text-left">
            <h3 className="font-semibold text-sm">الخدمة</h3>
            <p className="text-gray-400 text-sm">{order.serviceName}</p>
          </div>

          <div className="flex flex-col justify-center items-center text-center md:text-left">
            <h3 className="font-semibold text-sm">السعر</h3>
            <p className="text-sm">{order.amount} جم</p>
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

          <div className="flex flex-col justify-center items-center gap-2">
            <NavLink                 
            to={`/craftsman/requests/details/${order.id}`}
            className="bg-white border border-gray-300 hover:bg-gray-100 transition text-blue-400 font-medium text-sm px-4 py-2 rounded-md w-full md:w-auto">
              عرض التفاصيل
            </NavLink>

            <button className="bg-blue-900 text-white px-4 py-2 rounded-md w-full md:w-auto">
              مكتمل
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
