import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import PaymentMethods from "../../components/payment/PaymentMethods";
import PaymentSummaryCard from "../../components/payment/PaymentSummaryCard";
import PaymentForm from "../../components/payment/PaymentForm";
import PayNowButton from "../../components/payment/PayNowButton";

export default function PaymentPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const order = state?.order;
  const craftsman = state?.craftsman;
  const selectedService = state?.selectedService;

  const [selectedMethod, setSelectedMethod] = useState("visa");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    cardHolder: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const [errors, setErrors] = useState({});

  const servicePrice = useMemo(() => {
    return selectedService?.price || order?.orderAmount || order?.amount || 0;
  }, [selectedService, order]);

  const fees = 20;
  const total = Number(servicePrice) + Number(fees);

  function validateForm() {
    const newErrors = {};

    if (!formData.cardHolder.trim()) {
      newErrors.cardHolder = "اسم حامل البطاقة مطلوب";
    }

    const cleanedCardNumber = formData.cardNumber.replace(/\s/g, "");
    if (!cleanedCardNumber) {
      newErrors.cardNumber = "رقم البطاقة مطلوب";
    } else if (cleanedCardNumber.length !== 16) {
      newErrors.cardNumber = "رقم البطاقة يجب أن يكون 16 رقم";
    }

    if (!formData.expiry) {
      newErrors.expiry = "تاريخ الانتهاء مطلوب";
    } else {
      const [month, year] = formData.expiry.split("/");
      const monthNum = Number(month);

      if (!month || !year || month.length !== 2 || year.length !== 2) {
        newErrors.expiry = "صيغة الانتهاء يجب أن تكون MM/YY";
      } else if (monthNum < 1 || monthNum > 12) {
        newErrors.expiry = "الشهر غير صالح";
      }
    }

    if (!formData.cvc) {
      newErrors.cvc = "رمز CVC مطلوب";
    } else if (formData.cvc.length !== 3) {
      newErrors.cvc = "رمز CVC يجب أن يكون 3 أرقام";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function buildPaymentPayload() {
    const [expMonth, expYear] = formData.expiry.split("/");

    return {
      cardNumber: formData.cardNumber.replace(/\s/g, ""),
      cvc: formData.cvc,
      expMonth: Number(expMonth),
      expYear: Number(`20${expYear}`),
      orderId: order?.id || order?.orderId,
      stripeToken: "tok_visa",
    };
  }

  async function handlePayNow() {
    
    if (!order?.id && !order?.orderId) {
      toast.error("لا يوجد طلب صالح للدفع");
      return;
    }

    if (!validateForm()) return;

    try {
      setLoading(true);

      const payload = buildPaymentPayload();

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/Payments/pay-card`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "فشل الدفع");
      }

      toast.success(data?.paymentMessage || "تم الدفع بنجاح");

      setTimeout(() => {
        navigate("/home", {
          state: {
            payment: data,
            order,
            craftsman,
          },
        });
      }, 1200);
    } catch (error) {
      toast.error(error.message || "حدث خطأ أثناء الدفع");
    } finally {
      setLoading(false);
    }
  }
  async function sendCraftsmanNotification() {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("لا يوجد توكن");
    }

    const notificationPayload = {
      userId: craftsman?.userId || craftsman?.id,
      title: "تم دفع الطلب",
      message: "تم دفع الطلب الخاص بك من قبل العميل",
    };

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/Notification/send`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(notificationPayload),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      const backendMessage =
        data?.errorsList?.[0]?.message || data?.message || "فشل إرسال الإشعار";
      throw new Error(backendMessage);
    }

    return data;
  }

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-5 text-center">
          <p className="mb-4 text-red-600 font-semibold">
            لا توجد بيانات طلب للدفع
          </p>
          <button
            onClick={() => navigate("/home")}
            className="rounded-lg bg-indigo-700 px-5 py-2 text-white"
          >
            الرجوع
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-25 px-4 py-10">
      <Toaster position="top-center" />

      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-md md:p-8">
        <div className="mb-8">
          <h1 className="text-center text-2xl font-bold text-gray-800">
            الدفع
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_280px]">
          <div className="flex flex-col gap-6">
            <PaymentMethods
              selectedMethod={selectedMethod}
              onSelectMethod={setSelectedMethod}
            />

            <PaymentForm
              formData={formData}
              setFormData={setFormData}
              errors={errors}
            />

            <div className="rounded-xl bg-gray-50 p-4 text-right text-sm text-gray-600">
              <p>رقم الطلب: {order?.id || order?.orderId}</p>
              <p>
                الخدمة: {selectedService?.name || order?.serviceName || "-"}
              </p>
              <p>الإجمالي: {total.toFixed(2)} جنيه</p>
            </div>

            <PayNowButton
              onClick={handlePayNow}
              loading={loading}
              disabled={selectedMethod !== "visa"}
            />

            {selectedMethod !== "visa" && (
              <p className="text-center text-sm text-amber-600">
                حاليًا الربط الفعلي متاح فقط لطريقة Visa
              </p>
            )}
          </div>

          <div>
            <PaymentSummaryCard
              servicePrice={servicePrice}
              fees={fees}
              title="ملخص الدفع"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
