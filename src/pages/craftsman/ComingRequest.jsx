import React, { useEffect, useState } from "react";
import getorder_craftman from "../../api/getorder_craftman";
import Avatar from "../../components/common/Avatar";
import { NavLink } from "react-router-dom";

function ComingRequest() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // تعريف loading

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
      {data.map((order) => (
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

          <div className="flex flex-col justify-center text-center">
            <h3 className="font-semibold">الخدمة</h3>
            <p className="text-gray-400 text-sm">{order.serviceName}</p>
          </div>

          <div className="flex flex-col justify-center text-center">
            <h3 className="font-semibold">السعر</h3>
            <p className="text-green-600 font-medium">{order.amount} جم</p>
          </div>

          <div className="flex flex-col justify-center text-center">
            <h3 className="text-sm font-medium">10/2/2026</h3>
            <p className="text-gray-500 text-sm">02:00 م</p>
          </div>

          <div className="flex flex-col gap-3 w-full md:w-auto">
            <NavLink
              to={`details/${order.id}`}
              className="bg-white border border-gray-300
                         hover:bg-gray-100 transition
                         text-gray-700 font-medium text-sm
                         px-4 py-2 rounded-md w-full md:w-auto"
            >
              عرض التفاصيل
            </NavLink>

            <button
              className="bg-orange-600 text-white
                         hover:bg-orange-700 transition
                         px-4 py-2 rounded-md w-full md:w-auto"
            >
              تم التنفيذ
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default ComingRequest;
