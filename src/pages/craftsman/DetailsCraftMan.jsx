import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getorder_craftman from "../../api/getorder_craftman";
import Avatar from "../../components/common/Avatar";

function DetailsCraftMan() {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await getorder_craftman();
        const order = res.find((item) => item.id == id);
        setOrderDetails(order);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <p className="text-center mt-10">جاري تحميل الطلب...</p>;
  if (!orderDetails)
    return <p className="text-center mt-10">الطلب غير موجود</p>;

  return (
    <div className="p-8  space-y-6">
      {/* بيانات العميل */}
      <div className="flex items-center gap-4">
        <Avatar />
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">{orderDetails.clientName}</h3>
          <p className="text-gray-500">عميل</p>
        </div>
      </div>

      {/* نوع الخدمة */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-gray-400 text-sm">نوع الخدمة</p>
        <h3 className="text-md font-medium mt-1">{orderDetails.serviceName}</h3>
      </div>

      {/* تفاصيل الطلب */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-gray-400 text-sm">تفاصيل الطلب</p>
        <p className="mt-1">{orderDetails.description}</p>
      </div>

      {/* السعر المقترح */}
      <div className="bg-green-200 p-4 rounded-lg flex justify-between items-center">
        <h3 className="font-semibold">السعر المقترح</h3>
        <p className="text-2xl font-bold">{orderDetails.amount} جم</p>
      </div>

      {/* التاريخ والوقت */}
      <div className="flex gap-4">
        <button className="flex-1 bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 focus:ring-4 focus:ring-blue-300">
          السبت 15 مارس
        </button>
        <button className="flex-1 bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 focus:ring-4 focus:ring-blue-300">
          3:00-5:00
        </button>
      </div>

      {/* أزرار التحكم */}
      <div className="flex gap-3">
        <button className="flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:ring-4 focus:ring-green-300">
          قبول العرض
        </button>
        <button className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 focus:ring-4 focus:ring-red-300">
          رفض العرض
        </button>
        <button className="flex-1 bg-white-300  py-2 rounded-md  ">
          مراسلة العميل
        </button>
      </div>
    </div>
  );
}

export default DetailsCraftMan;
