import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getorder_craftman from "../../api/getorder_craftman";
import Avatar from "../../components/common/Avatar";

const STATUS_LABELS = {
  0: { label: "قيد الانتظار", color: "text-yellow-600" },
  1: { label: "غير مدفوع", color: "text-red-600" },
  2: { label: "مدفوع", color: "text-blue-600" },
  3: { label: "جارٍ التنفيذ", color: "text-orange-500" },
  4: { label: "مكتمل", color: "text-green-600" },
  5: { label: "ملغي", color: "text-gray-500" },
};

function DetailsCraftMan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

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

  const notify = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2500);
  };

  const callApi = async (endpoint) => {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `https://herafie.runasp.net/api/Orders/${id}/${endpoint}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) throw new Error();
  };

  const handleAccept = async () => {
    setActionLoading(true);
    try {
      await callApi("accept");
      setOrderDetails((prev) => ({ ...prev, status: 1 }));
      notify("!تم قبول الطلب بنجاح");
    } catch {
      notify("!فشل قبول الطلب");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    setActionLoading(true);
    try {
      await callApi("reject");
      setOrderDetails((prev) => ({ ...prev, status: 5 }));
      notify("تم رفض الطلب");
    } catch {
      notify("!فشل رفض الطلب");
    } finally {
      setActionLoading(false);
    }
  };

  const handleStart = async () => {
    setActionLoading(true);
    try {
      await callApi("start");
      setOrderDetails((prev) => ({ ...prev, status: 3 }));
      notify("!تم بدء الطلب");
    } catch {
      notify("❌ فشل بدء الطلب");
    } finally {
      setActionLoading(false);
    }
  };

  const handleComplete = async () => {
    setActionLoading(true);
    try {
      await callApi("complete");
      setOrderDetails((prev) => ({ ...prev, status: 4 }));
      notify("!تم إتمام الطلب بنجاح");
    } catch {
      notify("!فشل إتمام الطلب");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading)
    return <p className="text-center mt-10">جاري تحميل الطلب...</p>;
  if (!orderDetails)
    return <p className="text-center mt-10">الطلب غير موجود</p>;

  const date = new Date(orderDetails.scheduledAt);
  const dateLabel = date.toLocaleDateString("ar-EG", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const timeLabel = date.toLocaleTimeString("ar-EG", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const status = orderDetails.status;
  const statusInfo = STATUS_LABELS[status] ?? { label: "غير معروف", color: "text-gray-400" };

  return (
    <div className="p-8 space-y-6 max-w-2xl mx-auto">

      {message && (
        <p className="text-center font-semibold text-green-600 bg-green-50 py-2 rounded-lg">
          {message}
        </p>
      )}

      <div className="flex items-center gap-4">
        <Avatar />
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">{orderDetails.clientName}</h3>
          <p className="text-gray-500 text-sm">عميل</p>
        </div>
        <span className={`mr-auto text-sm font-medium ${statusInfo.color}`}>
          {statusInfo.label}
        </span>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-gray-400 text-sm">نوع الخدمة</p>
        <h3 className="text-md font-medium mt-1">{orderDetails.serviceName}</h3>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-gray-400 text-sm">تفاصيل الطلب</p>
        <p className="mt-1">{orderDetails.description}</p>
      </div>

      <div className="bg-green-100 p-4 rounded-lg flex justify-between items-center">
        <h3 className="font-semibold">السعر المقترح</h3>
        <p className="text-2xl font-bold text-green-700">{orderDetails.amount} جم</p>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 bg-blue-500 text-white py-2 rounded-full text-center text-sm font-medium">
          {dateLabel}
        </div>
        <div className="flex-1 bg-blue-500 text-white py-2 rounded-full text-center text-sm font-medium">
          {timeLabel}
        </div>
      </div>

      <div className="flex gap-3">
        {status === 0 && (
          <>
            <button
              onClick={handleAccept}
              disabled={actionLoading}
              className="flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 disabled:opacity-50 transition"
            >
              قبول الطلب
            </button>
            <button
              onClick={handleReject}
              disabled={actionLoading}
              className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 disabled:opacity-50 transition"
            >
              رفض الطلب
            </button>
          </>
        )}

        {status === 1 && (
          <span className="flex-1 bg-red-100 text-red-600 text-sm font-semibold py-2 rounded-md text-center">
            غير مدفوع
          </span>
        )}

        {status === 2 && (
          <>
            <span className="flex-1 bg-green-100 text-green-600 text-sm font-semibold py-2 rounded-md text-center">
              مدفوع
            </span>
            <button
              onClick={handleStart}
              disabled={actionLoading}
              className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 transition"
            >
              بدء الطلب
            </button>
          </>
        )}

        {status === 4 && (
          <button
            onClick={handleComplete}
            disabled={actionLoading}
            className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition"
          >
            إتمام الطلب
          </button>
        )}

        {(status === 3 || status === 5) && (
          <button
            onClick={() => navigate(-1)}
            className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition"
          >
            رجوع
          </button>
        )}
      </div>
    </div>
  );
}

export default DetailsCraftMan;