import React, { useState } from "react";

export default function AcceptCraftman({ orderId, token }) {
  const [successMessage, setSuccessMessage] = useState("");

  const handleAccept = async () => {
    try {
      const res = await fetch(
        `https://herafie.runasp.net/api/Orders/${orderId}/complete`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("فشل قبول الطلب");

      // عرض رسالة النجاح
      setSuccessMessage("تم الموافقة على الطلب بنجاح!");

      // اختفاء الرسالة بعد ثانيتين
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    } catch (error) {
      console.error("فشل قبول الطلب", error);
      setSuccessMessage("فشل قبول الطلب، حاول مرة أخرى");
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        onClick={handleAccept}
      >
        قبول العرض
      </button>

      {/* الرسالة تظهر تحت الزر مباشرة */}
      {successMessage && (
        <p className="text-green-600 font-semibold">{successMessage}</p>
      )}
    </div>
  );
}
