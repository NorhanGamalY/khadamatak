import { useState } from "react";
import { Star } from "lucide-react";
import axios from "axios";
import Toast from "../common/Toast";
import { notifyCraftsman } from "../../features/notifications/notificationApi";

export default function ReviewModal({ order, onClose, onSuccess }) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ isOpen: false, type: "success", title: "", message: "" });

  const handleSubmit = async () => {
    if (rating === 0) {
      setError("رجاءً اختر تقييماً");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      await axios.post(
        "https://herafie.runasp.net/api/Review",
        { orderId: Number(order.id), rating: Number(rating), comment: comment || "" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (order.craftsmanId) {
        notifyCraftsman(
          order.craftsmanId,
          "تقييم جديد",
          `قام العميل بتقييمك بـ ${rating} نجوم${comment ? ` — "${comment}"` : ""}`
        );
      }

      setToast({
        isOpen: true,
        type: "success",
        title: "تم إرسال التقييم",
        message: "شكراً! تم إرسال تقييمك بنجاح.",
      });

      setTimeout(() => {
        onSuccess?.();
        onClose?.();
      }, 1500);

    } catch (err) {
      const msg = err?.response?.data || err?.response?.data?.message || "حدث خطأ أثناء إرسال التقييم";
      setError(typeof msg === "string" ? msg : "حدث خطأ أثناء إرسال التقييم");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl" dir="rtl">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">تقييم الحرفي</h2>
            <button onClick={onClose} className="rounded-lg px-3 py-1 text-gray-500 hover:bg-gray-100">✕</button>
          </div>

          <p className="mb-4 text-sm text-gray-500">
            الحرفي: <span className="font-semibold text-gray-800">{order?.craftsmanName}</span>
          </p>

          <div className="mb-4 flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={36}
                className="cursor-pointer transition-colors"
                fill={(hovered || rating) >= star ? "#f97316" : "none"}
                stroke={(hovered || rating) >= star ? "#f97316" : "#d1d5db"}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                onClick={() => setRating(star)}
              />
            ))}
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-sm font-semibold text-gray-700">تعليق (اختياري)</label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="اكتب تعليقك هنا..."
              className="w-full rounded-xl bg-gray-100 p-3 text-right text-sm outline-none focus:ring-2 focus:ring-orange-400 resize-none"
            />
          </div>

          {error && <p className="mb-3 text-sm text-red-500 text-center">{error}</p>}

          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={loading || rating === 0}
              className="flex-1 rounded-xl bg-orange-600 py-3 font-bold text-white hover:bg-orange-700 disabled:opacity-50 transition-colors"
            >
              {loading ? "جاري الإرسال..." : "إرسال التقييم"}
            </button>
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-300 py-3 font-bold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              إلغاء
            </button>
          </div>
        </div>
      </div>

      <Toast
        isOpen={toast.isOpen}
        type={toast.type}
        title={toast.title}
        message={toast.message}
        onClose={() => setToast((t) => ({ ...t, isOpen: false }))}
      />
    </>
  );
}