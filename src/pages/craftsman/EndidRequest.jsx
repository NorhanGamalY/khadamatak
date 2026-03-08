import React from "react";
import Avatar from "../../components/common/Avatar";
import { NavLink } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

function EndidRequest() {
  const { orders, loading } = useOutletContext();
  const data = orders.filter((o) => o.status === 4);

  if (loading)
    return <p className="text-center mt-10">جاري تحميل الطلبات...</p>;

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

          <div className="flex flex-col text-center">
            <h3 className="font-semibold">الخدمة</h3>
            <p className="text-gray-400 text-sm">{order.serviceName}</p>
          </div>

          <div className="flex flex-col text-center">
            <h3 className="font-semibold">السعر</h3>
            <p className="text-green-600 font-medium">{order.amount} جم</p>
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <NavLink
              to={`/craftsman/requests/details/${order.id}`}
              className="bg-white border border-gray-300 hover:bg-gray-100 transition text-blue-400 font-medium text-sm px-4 py-2 rounded-md w-full md:w-auto"
            >
              عرض التفاصيل
            </NavLink>

            <div className="flex flex-col gap-3 w-full md:w-auto">
              <NavLink
                to={`/craftsman/requests/details/${item.id}`}

                className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium text-sm px-4 py-2 rounded-md transition"
              >
                عرض التفاصيل
              </NavLink>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default EndidRequest;
