import { useState } from "react";
import { FaCamera } from "react-icons/fa6";
import { useCreateComplaint } from "../../features/complaints/hooks";
import Toast from "../../components/common/Toast";

export default function Complaints() {
const [showToast, setShowToast] = useState(false);
const [toastMessage, setToastMessage] = useState("");
const [toastType, setToastType] = useState("success");

  const order = {
    id: 12,
    service: "كهرباء",
    craftsman: "محمد أحمابرار مثنى راكع الراوي iraq",
  };

  const [description, setDescription] = useState("");
  const { mutate, isPending } = useCreateComplaint();

 const handleSubmit = () => {
  if (!description.trim()) {
    setToastType("error");
    setToastMessage("رجاءً اكتب وصف المشكلة");
    setShowToast(true);
    return;
  }

  mutate(
    {
      orderId: order.id,
      description: description,
      evidenceAttachmentUrl: "",
    },
    {
      onSuccess: () => {
        setToastType("success");
        setToastMessage("تم ارسال الشكوى بنجاح");
        setShowToast(true);
        setDescription("");
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

      <h1 className="text-2xl font-bold text-center mb-10">
        تقديم شكوى
      </h1>

      

      <div className="space-y-6">
      <div className="flex gap-6 text-lg  ">
        <p>رقم الطلب: <span className="font-semibold text-red-500">{order.id}</span></p>
        <p>الخدمة:  <span className="font-semibold text-red-500">{order.service}</span></p>
        <p>الحرفي: <span className="font-semibold text-red-500">{order.craftsman}</span></p>
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
  className={`bg-orange-600 hover:bg-orange-700 text-white px-10 py-3 rounded-lg shadow ${(!description.trim() || isPending) ? 'opacity-50 cursor-not-allowed' : ''}`}
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
  actionLabel="تمام"
  onClose={() => setShowToast(false)}
/>
    </div>
  );
}