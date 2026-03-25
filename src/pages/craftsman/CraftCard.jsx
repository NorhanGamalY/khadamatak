import React from 'react'
import Avatar from './../../components/common/Avatar';
import getorder_craftman from "../../api/getorder_craftman";
import { useEffect, useState } from "react";
import { MdDateRange } from "react-icons/md";
import { TbClockHour5 } from "react-icons/tb";
import { NavLink } from 'react-router-dom';

function CraftCard() {
  const [orderStatus, setOrderStatus] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getorder_craftman();
      setOrderStatus(data);
    };

    fetchOrders();
  }, []);

const filteredOrders = orderStatus.filter((order) => order.status === 0 || order.status === 1);
  return (
    <div>
      {filteredOrders.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">لا يوجد طلبات جديدة</p>
      ) : (
        filteredOrders.map((order) => (
          <div
            key={order.orderId}
            className="bg-white rounded-lg shadow p-4 
                    flex flex-col md:flex-row 
                    gap-4 md:items-center md:justify-between mb-4"
          >
            <div className="flex flex-col justify-center items-center w-30 h-18 mx-auto md:mx-0">
              <Avatar />
              <h3 className="font-bold">{order.clientName}</h3>
            </div>

            <div className="flex flex-col justify-center items-center">
              <h3 className="font-bold">الخدمة</h3>
              <p className="text-gray-500">{order.serviceName}</p>
            </div>

            <div className="flex flex-col justify-center items-center">
              <h3 className="font-bold">السعر</h3>
              <p className="text-gray-500">{order.amount} جم</p>
            </div>

            <div className="flex flex-col justify-center items-center">
              <h3 className="flex items-center gap-1">
                <MdDateRange />
                {new Date(order.scheduledAt).toLocaleDateString("EG")}
              </h3>
              <p className="text-gray-500 flex items-center gap-1">
                <TbClockHour5 />
                {new Date(order.scheduledAt).toLocaleTimeString("EG", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <NavLink
                to={`/craftsman/requests/details/${order.id}`}
                className="bg-white border border-gray-300
                            hover:bg-gray-100 transition
                            text-gray-700 font-medium text-sm
                            px-4 py-2 rounded-md text-center"
              >
                عرض التفاصيل
              </NavLink>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default CraftCard;