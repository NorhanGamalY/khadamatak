import React from "react";
import Avatar from "../../components/common/Avatar";
import { NavLink } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

function EndidRequest() {
  const { orders, loading } = useOutletContext();

  const data = orders.filter((o) => o.status === 5 || o.status === 6);

  if (loading)
    return <p className="text-center mt-10">جاري تحميل الطلبات...</p>;

  if (data.length === 0)
    return <p className="text-center mt-10 text-gray-400">لا توجد طلبات منتهية</p>;

  return (
    <>
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

            <div className="flex flex-col text-center">
              <h3 className="font-semibold text-sm">الحالة</h3>
              <span
                className={`text-sm font-medium ${
                  order.status === 5 ? "text-green-600" : "text-red-500"
                }`}
              >
                {order.status === 5 ? "مكتمل" : "ملغي"}
              </span>
            </div>

            <NavLink
              to={`/craftsman/requests/details/${order.id}`}
              className="bg-white border border-gray-300 hover:bg-gray-100 transition
                      text-gray-700 font-medium text-sm px-4 py-2 rounded-md text-center"
            >
              عرض التفاصيل
            </NavLink>
          </div>
        );
      })}
    </>
  );
}

export default EndidRequest;