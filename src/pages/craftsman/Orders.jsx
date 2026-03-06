import React, { useEffect, useState } from "react";
import getorder_craftman from "../../api/getorder_craftman";

function Orders() {
  const [newOrders,setNewOrders]=useState([]);
  const [currentOrders,setCurrentOrders]=useState([]);
  const [completedOrders,setCompletedOrders]=useState([]);

  useEffect(()=>{
    const fetchOrders=async()=>{
  const data=await  getorder_craftman()
  const newOrders = data.filter((order) => order.status === 0);
  setNewOrders(newOrders);
  const currentOrders = data.filter((order) => order.status === 3);
  setCurrentOrders(currentOrders);
  const completedOrders = data.filter((order) => order.status === 4);
  setCompletedOrders(completedOrders);

    }
    fetchOrders()
  },[])

  console.log(newOrders,currentOrders,completedOrders);
  const dashboardData = [
    { title: "الطلبات الجديدة",
      count: newOrders.length,
      icon: "./solar_wallet-bold.png"
    },
    { title: "الطلبات الحالية",
      count: currentOrders.length,
      icon: "./ri_checkbox-circle-fill.png"
    },
    { title: "الطلبات المكتملة",
      count: completedOrders.length,
      icon: "./Frame 2147228651.png"
    },
    { title: "الرصيد الحالي",
      count: newOrders.reduce((total, order) => total + order.amount, 0),
      icon: "./Frame 2147228651 (1).png"
    }
  ];

  return (
    <div className="p-4 md:p-10 bg-gray-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardData.map((item, index) => (
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center" key={index}>
            <img
              src={item.icon}
              alt={item.title}
              className="w-12 mb-3"
            />
            <h3 className="text-2xl font-bold">{item.count}</h3>
            <h4 className="text-gray-600">{item.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
