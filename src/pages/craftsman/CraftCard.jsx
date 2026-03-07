import React from 'react'
import Avatar from './../../components/common/Avatar';
import getorder_craftman from "../../api/getorder_craftman";
import { useEffect, useState } from "react";

import { MdDateRange } from "react-icons/md";
import { TbClockHour5 } from "react-icons/tb";


function CraftCard() {
  const [orderStatus, setOrderStatus] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getorder_craftman();
      setOrderStatus(data);
    };

    fetchOrders();
  }, []);
  return (

    <div>
      {orderStatus.filter((order) => order.status === 0).map((order)  => (
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
            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md w-full sm:w-auto">
              قبول
            </button>
            <button className="bg-blue-800 text-white px-4 py-2 rounded-md w-full sm:w-auto">
              رفض
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CraftCard
