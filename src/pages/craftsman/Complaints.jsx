import { useState } from "react";
import { useCreateComplaint } from "../../features/complaints/hooks.js";
import { useLocation, useNavigate } from "react-router-dom";
import Toast from "../../components/common/Toast.jsx";
import { notifyUser, notifyCraftsman, notifyAdmin, NOTIFICATION_MESSAGES } from "../../features/notifications/notificationApi.js";

export default function Complaints() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderService, craftsmanName, orderId, craftsmanId } = location.state || {};

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [description, setDescription] = useState("");

  const { mutate, isPending } = useCreateComplaint();

  const handleSubmit = () => {
    if (!description.trim()) {
      setToastType("error");
      setToastMessage("رجاءً اكتب وصف المشكلة");
      setShowToast(true);
      return;
    }

    const clientUserId = localStorage.getItem("userId");

    mutate(
      {
        orderId: orderId,
        description: description,
        evidenceAttachmentUrl: clientUserId, 
        clientUserId: clientUserId,
      },
      {
        onSuccess: () => {
          setToastType("success");
          setToastMessage("تم ارسال الشكوى بنجاح");
          setShowToast(true);
          setDescription("");

          if (clientUserId) {
            notifyUser(
              clientUserId,
              "تم استلام شكواك",
              "تم استلام شكواك بنجاح وسيتم مراجعتها من قِبل الإدارة قريباً"
            );
          }

          if (craftsmanId) {
            notifyCraftsman(
              craftsmanId,
              NOTIFICATION_MESSAGES.CRAFTSMAN_NEW_COMPLAINT.title,
              NOTIFICATION_MESSAGES.CRAFTSMAN_NEW_COMPLAINT.message
            );
          }

          notifyAdmin(
            NOTIFICATION_MESSAGES.ADMIN_NEW_COMPLAINT.title,
            NOTIFICATION_MESSAGES.ADMIN_NEW_COMPLAINT.message
          );
        },
        onError: () => {
          setToastType("error");
          setToastMessage("حدث خطأ أثناء ارسال الشكوى");
          setShowToast(true);
        },
      }
    );
  };

  return (
    <div className="w-[90%] xl:w-[70%] mx-auto my-20">
      <h1 className="text-2xl font-bold text-center mb-10">تقديم شكوى</h1>

      <div className="space-y-6">
        <div className="flex gap-6 text-lg">
          <p>
            رقم الطلب:{" "}
            <span className="font-semibold text-red-500">{orderId}</span>
          </p>
          <p>
            الخدمة:{" "}
            <span className="font-semibold text-red-500">{orderService}</span>
          </p>
          <p>
            الحرفي:{" "}
            <span className="font-semibold text-red-500">{craftsmanName}</span>
          </p>
        </div>
        <div>
          <label className="block text-right mb-2 font-semibold">
            وصف المشكلة:
          </label>
          <textarea
            rows="4"
            className="w-full p-4 rounded-lg shadow bg-gray-100 text-right"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={isPending || !description.trim()}
            className={`bg-orange-600 hover:bg-orange-700 text-white px-10 py-3 rounded-lg shadow ${
              !description.trim() || isPending
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {isPending ? "جاري الإرسال..." : "ارسال الشكوى"}
          </button>
        </div>
      </div>

      <Toast
        isOpen={showToast}
        type={toastType}
        title={toastType === "success" ? "نجاح" : "خطأ"}
        message={toastMessage}
        onClose={() => {
          setShowToast(false);
          if (toastType === "success") {
            navigate("/Client-Conflicts");
          }
        }}
      />
    </div>
  );
}