import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import PaymentMethods from "../../components/payment/PaymentMethods";
import PaymentSummaryCard from "../../components/payment/PaymentSummaryCard";
import PaymentForm from "../../components/payment/PaymentForm";
import PayNowButton from "../../components/payment/PayNowButton";
import { useSendNotification } from "../../features/notifications/hooks";

export default function PaymentPage() {
  const { mutateAsync: sendNotificationMutation } = useSendNotification();

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

  console.log("order stringified:", JSON.stringify(order, null, 2));
  console.log("craftsman stringified:", JSON.stringify(craftsman, null, 2));

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
      paymentMethod: selectedMethod,
      stripeToken: "tok_visa",
    };
  }

  async function sendPaymentSuccessNotifications() {
    const orderId = order?.id || order?.orderId;
    const serviceName = selectedService?.name || order?.serviceName || "الخدمة";

    const clientUserId = "35803856-163e-4312-b74c-c06d0fdbbcef";

    await sendNotificationMutation({
      userId: clientUserId,
      title: "تم الدفع بنجاح",
      message: `تم دفع الطلب رقم ${orderId} الخاص بخدمة ${serviceName} بنجاح.`,
    });
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

      try {
        await sendPaymentSuccessNotifications();
      } catch (notificationError) {
        console.error("Notification error:", notificationError);
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
    try {
      await sendPaymentSuccessNotifications();
    } catch (notificationError) {
      console.error("Notification error:", notificationError);
    }
  }

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-5 text-center">
          <p className="mb-4 font-semibold text-red-600">
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
    <div className="mt-25 min-h-screen px-4 py-10">
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
              <p>طريقة الدفع: {selectedMethod}</p>
              <p>الإجمالي: {total.toFixed(2)} جنيه</p>
            </div>

            <PayNowButton
              onClick={handlePayNow}
              loading={loading}
              disabled={loading}
            />
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
