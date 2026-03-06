import React, { useEffect, useState } from "react";
import getorder_craftman from "../../api/getorder_craftman";
import Avatar from "../../components/common/Avatar";
import { NavLink } from "react-router-dom";

function NewRequest() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

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

  const handleAccept = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://herafie.runasp.net/api/Orders/${id}/complete`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("فشل قبول الطلب");

      setMessage("تم قبول الطلب بنجاح!");
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.error(error);
      setMessage("فشل قبول الطلب");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  const handleCancel = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://herafie.runasp.net/api/Orders/${id}/cancel`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("فشل مسح الطلب");

      setMessage("تم مسح الطلب");
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.error(error);
      setMessage("فشل مسح الطلب");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">جاري تحميل الطلبات...</p>;
  }

  return (
    <>
      {message && (
        <p className="text-center font-semibold text-green-600 mb-4">
          {message}
        </p>
      )}

      {data.map((item) => {
        const date = new Date(item.scheduledAt);
        return (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm p-4 md:p-6 flex flex-col md:flex-row gap-3 md:gap-2 md:items-center md:justify-between mb-4 hover:shadow-md transition"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center text-center md:text-right">
              <Avatar />
              <h3 className="font-semibold text-gray-800">{item.clientName}</h3>
            </div>

            <div className="flex flex-col justify-center text-center">
              <h3 className="font-semibold">الخدمة</h3>
              <p className="text-gray-400 text-sm">{item.serviceName}</p>
            </div>

            <div className="flex flex-col justify-center text-center">
              <h3 className="font-semibold">السعر</h3>
              <p className="text-green-600 font-medium">{item.amount} جم</p>
            </div>

            <div className="flex flex-col justify-center text-center">
              <h3 className="text-sm font-medium">
                {date.toLocaleDateString("ar-EG")}
              </h3>
              <p className="text-gray-500 text-sm">
                {date.toLocaleTimeString("ar-EG", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <div className="flex flex-col gap-3 w-full md:w-auto">
              <NavLink
                to={`details/${item.id}`}
                className="bg-white border border-gray-300 hover:bg-gray-100 transition text-gray-700 font-medium text-sm px-4 py-2 rounded-md"
              >
                عرض التفاصيل
              </NavLink>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleCancel(item.id)}
                  className="bg-red-100 text-red-600 hover:bg-red-200 transition px-4 py-2 rounded-md"
                >
                  رفض
                </button>

                <button
                  onClick={() => handleAccept(item.id)}
                  className="bg-blue-900 text-white hover:bg-blue-800 transition px-4 py-2 rounded-md"
                >
                  قبول
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default NewRequest;
