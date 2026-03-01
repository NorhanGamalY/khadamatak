import React, { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

  async function getOrders() {
    try {
      let response = await fetch("https://herafie.runasp.net/api/orders");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      {orders.map(order => (
        
        <p key={order.date}>{orders.date}</p>
      ))}
    </div>
  );
}

export default Orders;

