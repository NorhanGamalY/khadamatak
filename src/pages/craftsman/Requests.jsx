import { NavLink, Outlet, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import getorder_craftman from "../../api/getorder_craftman";
export default function Requests() {
  const activeStyle = "text-orange-600 border-b-2 border-orange-600";
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setSearch, setPlaceholder, search } = useOutletContext();
  const [filteredOrder, setFilteredOrder] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await getorder_craftman();
        setOrders(res);
        setFilteredOrder(res || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
    setPlaceholder("ادار الطلبات ...");
    setSearch("");
  }, []);

  useEffect(() => {
    if (!search || search.trim() === "") {
      setFilteredOrder(orders);
      return;
    }
    const filtered = orders?.filter((order) =>
      (
        order.name ||
        order.clientName + " " + order.serviceName ||
        order.description
      )
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
    setFilteredOrder(filtered);
  }, [search, orders]);

  return (
    <div className="bg-gray-100 w-full min-h-screen">
      <main className="mx-auto max-w-7xl lg:px-8 px-4 py-6 lg:py-8">
        <div className="bg-white p-6 rounded-md">
          <div className="flex justify-between">
            <div className="flex gap-4">
              <NavLink
                to="new"
                className={({ isActive }) =>
                  `px-4 py-2 ${isActive ? activeStyle : ""}`
                }
              >
                الطلبات الجديدة
              </NavLink>

              <NavLink
                to="coming"
                className={({ isActive }) =>
                  `px-4 py-2 ${isActive ? activeStyle : ""}`
                }
              >
                الطلبات الجارية
              </NavLink>

              <NavLink
                to="ended"
                className={({ isActive }) =>
                  `px-4 py-2 ${isActive ? activeStyle : ""}`
                }
              >
                الطلبات المنتهية
              </NavLink>
            </div>

            <div className="flex justify-center md:justify-start">
              <button
                className="bg-white border border-gray-300 
               hover:bg-gray-100 transition 
               text-gray-700 font-medium px-4 py-2 rounded-md
               flex flex-col md:flex-row items-center md:items-center gap-2"
              >
                <span>تصفية النتائج</span>
                <img
                  src="/mage_filter-fill.png"
                  alt="فلتر"
                  className="w-5 h-5 object-contain cursor-pointer hover:scale-110 transition-transform"
                />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Outlet context={{ orders: filteredOrder, setOrders, loading }} />
        </div>
      </main>
    </div>
  );
}
