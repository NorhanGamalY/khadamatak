import { useEffect, useMemo, useState } from "react";
import { getClientOrders } from "../api/orders.api";
import { getCraftsman } from "../api/craftsman.api";

export const useClientOrders = () => {
  const [orders, setOrders] = useState([]);
  const [craftsmen, setCraftsmen] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const ordersData = await getClientOrders();
      setOrders(Array.isArray(ordersData) ? ordersData : []);

      try {
        const craftsmenData = await getCraftsman();
        setCraftsmen(Array.isArray(craftsmenData) ? craftsmenData : []);
      } catch (craftsmanError) {
        console.error("Craftsman API error:", craftsmanError);
        setCraftsmen([]);
      }
    } catch (err) {
      console.error("Orders API error:", err);
      setError(err?.response?.data?.message || "صار خطأ أثناء جلب الطلبات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const craftsmenMap = useMemo(() => {
    if (!Array.isArray(craftsmen)) return {};

    return craftsmen.reduce((acc, craftsman) => {
      acc[craftsman.id] = craftsman;
      return acc;
    }, {});
  }, [craftsmen]);

  const enrichedOrders = useMemo(() => {
    if (!Array.isArray(orders)) return [];

    return orders.map((order) => ({
      ...order,
      craftsman: craftsmenMap[order.craftsmanId] || null,
    }));
  }, [orders, craftsmenMap]);

  const filteredOrders = useMemo(() => {
    if (activeTab === "all") return enrichedOrders;

    if (activeTab === "new") {
      return enrichedOrders.filter(
        (order) => order.status === 0 || order.status === 1
      );
    }

    if (activeTab === "inProgress") {
      return enrichedOrders.filter((order) => order.status === 2);
    }

    if (activeTab === "completed") {
      return enrichedOrders.filter(
        (order) => order.status === 3 || order.status === 4
      );
    }

    return enrichedOrders;
  }, [enrichedOrders, activeTab]);

  return {
    orders: enrichedOrders,
    filteredOrders,
    activeTab,
    setActiveTab,
    loading,
    error,
    refetch: fetchData,
  };
};