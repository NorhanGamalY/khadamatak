import React, { useMemo, useState } from "react";
import ServiceCard from "../../components/createService/Card";
import UploadBox from "../../components/createService/UploadImage";
import TextAreaField from "../../components/createService/TextArea";
import OrderSummary from "../../components/createService/OrderSummary";
import DateSelector from "../../components/createService/DataSelector";
import TimeSelector from "../../components/createService/TimeSelector";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import ServiceDropdown from "../../components/createService/serviceDropdown";
import { useCreateOrder } from "../../features/order/hooks";
import toast, { Toaster } from "react-hot-toast";

export default function Service() {
  const [description, setDescription] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const { state } = useLocation();
  const { craftsman } = state || {};
  console.log("here", craftsman);
  const dayNames = [
    "الأحد",
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];

  const days =
    craftsman?.availabilities?.map((a) => ({
      name: dayNames[a.day],
      date: a.day,
    })) || [];

  const [selectedDay, setSelectedDay] = useState(() => days[0] || null);

  function formatTime(hour) {
    const suffix = hour >= 12 ? "PM" : "AM";
    const h = hour % 12 || 12;
    return `${h}:00 ${suffix}`;
  }

  const times = useMemo(() => {
    if (!selectedDay) return [];

    const availability = craftsman.availabilities.find(
      (a) => a.day === selectedDay.date,
    );

    if (!availability) return [];

    const start = parseInt(availability.from.split(":")[0]);
    const end = parseInt(availability.to.split(":")[0]);

    const result = [];

    for (let i = start; i < end; i++) {
      result.push(formatTime(i));
    }

    return result;
  }, [selectedDay, craftsman]);

  function buildScheduleDate() {
    if (!selectedDay || !selectedTime) return null;

    const today = new Date();
    let dayOffset = selectedDay.date - today.getDay();
    if (dayOffset < 0) dayOffset += 7;
    const scheduledDate = new Date(today);
    scheduledDate.setDate(today.getDate() + dayOffset);

    let [hour] = selectedTime.split(/[: ]/);
    hour = parseInt(hour);
    if (selectedTime.includes("PM") && hour !== 12) hour += 12;
    if (selectedTime.includes("AM") && hour === 12) hour = 0;

    scheduledDate.setHours(hour, 0, 0, 0);

    return scheduledDate.toISOString();
  }

  const { mutate: createOrder, isPending } = useCreateOrder();
  const navigat = useNavigate();

  function handleCreateOrder() {
    const scheduledAt = buildScheduleDate();

    const payload = {
      craftsmanId: craftsman.id,
      serviceId: selectedService.id,
      description,
      scheduledAt,
    };
    console.log("Payload before sending:", payload);

    createOrder(payload, {
      onSuccess: (data) => {
        
        toast.success("تم إنشاء الطلب بنجاح!", {
          icon: "✅",
          style: {
            borderRadius: "12px",
            background: "#f0fdf4",
            color: "#166534",
            border: "1px solid #bbf7d0",
            fontWeight: "600",
          },
        });

        setTimeout(() => {
          navigat("/payment", {
            state: {
              order: data,
              craftsman,
              selectedService,
            },
          });
        }, 1200);
      },
      onError: (err) => {
        const errors = err?.response?.data?.errorsList;
        if (errors && errors.length > 0) {
          setErrorMessage(errors[0].message);
        } else {
          setErrorMessage(
            err?.response?.data?.message || "حدث خطأ، حاول مرة أخرى",
          );
        }
      },
    });
  }

  return (
    <div className="min-h-screen m-25 flex flex-col gap-8 max-w-5xl mx-auto ">
      <Toaster position="top-center" />
      <h2 className="text-2xl text-center font-bold ">انشاء طلب الخدمة</h2>

      <ServiceCard craftsman={craftsman} />

      <div>
        <h3 className="text-lg mb-3 font-medium ">تفاصيل المشكلة</h3>
        <TextAreaField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="اوصف لنا المشكلة ببساطة لمساعدة الفني لتجهيز الأدوات المناسبة"
        />
      </div>

      <ServiceDropdown
        services={craftsman?.services || []}
        selectedService={selectedService}
        setSelectedService={setSelectedService}
      />

      <div>
        <h3 className="text-lg mb-3 font-medium ">اختيار الموعد</h3>
        <div className="bg-gray-200 rounded-xl p-4 flex flex-col items-center gap-2">
          <DateSelector
            days={days}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />

          <TimeSelector
            times={times}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg mb-3 font-medium ">ملخص الطلب</h3>
        <OrderSummary
          serviceType={selectedService?.name}
          day={selectedDay?.name}
          time={selectedTime}
          price={selectedService?.price}
        />
      </div>

      <div className="flex flex-col items-center gap-2">
        {errorMessage && (
          <p className="text-red-500 text-center text-sm font-medium">
            {errorMessage}
          </p>
        )}
        <button
          onClick={handleCreateOrder}
          disabled={
            isPending ||
            !selectedService ||
            !selectedDay ||
            !selectedTime ||
            !description.trim()
          }
          className="flex items-center justify-center gap-2 w-full max-w-md bg-blue-900 text-white py-2 rounded-xl text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          متابعة الدفع <MdKeyboardDoubleArrowLeft size={24} />
        </button>
      </div>
    </div>
  );
}
