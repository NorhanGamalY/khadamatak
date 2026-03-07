import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Cancelcraftman() {
  const [message, setMessage] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const cancelOrder = async () => {
      try {
        const res = await fetch(
          `https://herafie.runasp.net/api/Orders/${id}/cancel`,
          {
            method: "PUT", // عادة الإلغاء يحتاج PUT أو POST حسب API
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!res.ok) throw new Error("فشل إلغاء الطلب");

        const data = await res.json();
        console.log(data); // لو تحبي تشوفي التفاصيل
        setMessage("تم إلغاء الطلب بنجاح!");

        // اختفاء الرسالة بعد ثانيتين
        setTimeout(() => setMessage(""), 2000);
      } catch (error) {
        console.error(error);
        setMessage("فشل إلغاء الطلب، حاول مرة أخرى");
        setTimeout(() => setMessage(""), 2000);
      }
    };

    cancelOrder();
  }, [id]);

  return (
    <div className="p-4">
      {message && (
        <p
          className={`font-semibold ${
            message.includes("نجاح") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default Cancelcraftman;
