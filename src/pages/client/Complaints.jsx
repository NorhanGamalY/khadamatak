import { useState } from "react";
import { FaCamera } from "react-icons/fa6";
import { useCreateComplaint } from "../../features/complaints/hooks";
import toast from "react-hot-toast";

export default function Complaints() {

  const order = {
    id: 12,
    service: "كهرباء",
    craftsman: "محمد أحمابرار مثنى راكع الراوي iraq",
  };

  const [description, setDescription] = useState("");
  const { mutate, isPending } = useCreateComplaint();

 const handleSubmit = () => {
  mutate(
    {
      orderId: order.id,
      description: description,
      evidenceAttachmentUrl: "",
    },
    {
      onSuccess: () => {
        toast.success("تم ارسال الشكوى بنجاح");
        setDescription("");
      },
      onError: () => {
        toast.error("حدث خطأ أثناء ارسال الشكوى");
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
        {/* order details */}
      <div className="flex gap-6 text-lg  ">
        <p>رقم الطلب: <span className="font-semibold text-red-500">{order.id}</span></p>
        <p>الخدمة:  <span className="font-semibold text-red-500">{order.service}</span></p>
        <p>الحرفي: <span className="font-semibold text-red-500">{order.craftsman}</span></p>
      </div>

        {/* description */}
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

        {/* upload image */}
        {/* <div>
          <label className="block text-right mb-2 font-semibold">
            رفع صورة (اختياري):
          </label>

          <label className="flex items-center justify-center gap-2 bg-gray-100 p-4 rounded-lg shadow cursor-pointer">
            <FaCamera size={20} />
            <span>إرفاق صور</span>
            <input type="file" className="hidden" />
          </label>
        </div> */}

        {/* submit */}
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-3 rounded-lg shadow"
          >
            {isPending ? "جاري الإرسال..." : "ارسال الشكوى"}
          </button>
        </div>

      </div>
    </div>
  );
}