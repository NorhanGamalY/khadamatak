import React, {useMemo, useState } from "react";
import ServiceCard from "../../components/createService/Card";
import UploadBox from "../../components/createService/UploadImage";
import TextAreaField from "../../components/createService/TextArea";
import OrderSummary from "../../components/createService/OrderSummary";
import DateSelector from "../../components/createService/DataSelector";
import TimeSelector from "../../components/createService/TimeSelector";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useLocation} from "react-router-dom";
import ServiceDropdown from "../../components/createService/serviceDropdown";
import { useCreateOrder } from "../../features/order/hooks";

  
export default function Service() {
  const [description, setDescription] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

const { state } = useLocation();
const {craftsman }= state || {};
console.log("here"  , craftsman);
  const dayNames = [
  "الأحد",
  "الاثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];

const days = craftsman?.availabilities?.map((a) => ({
  name: dayNames[a.day],
  date: a.day
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
    (a) => a.day === selectedDay.date
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
  const dayOffset = selectedDay.date - today.getDay(); 
  const scheduledDate = new Date(today);
  scheduledDate.setDate(today.getDate() + dayOffset);

  let [hour] = selectedTime.split(/[: ]/);
  hour = parseInt(hour);
  if (selectedTime.includes("PM") && hour !== 12) hour += 12;
  if (selectedTime.includes("AM") && hour === 12) hour = 0;

  scheduledDate.setHours(hour, 0, 0, 0);

  return scheduledDate.toISOString();
}

const { mutate: createOrder} = useCreateOrder();


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
      console.log("order created", data);
    },
    onError: (err) => {
      console.log("error", err);
    },
  });
}



  return (
    <div className="min-h-screen m-25 flex flex-col gap-8 max-w-5xl mx-auto ">
      <h2 className="text-2xl text-center font-bold ">
      انشاء طلب الخدمة
    </h2>

      <ServiceCard craftsman={craftsman} />

       <div>
        <h3 className="text-lg mb-3 font-medium ">
     تفاصيل المشكلة
    </h3>
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
        <h3 className="text-lg mb-3 font-medium ">
    اختيار الموعد
    </h3>
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
        <h3 className="text-lg mb-3 font-medium ">
    ملخص الطلب
    </h3>
        <OrderSummary
  serviceType={selectedService?.name}
  day={selectedDay?.name}
  time={selectedTime}
  price={selectedService?.price}
/>
      </div>

      <div className="flex justify-center">
        <button
  onClick={handleCreateOrder}
  className="flex items-center justify-center gap-2 w-full max-w-md bg-blue-900 text-white py-2 rounded-xl text-lg font-semibold"
>
  متابعة الدفع <MdKeyboardDoubleArrowLeft size={24} />
</button>
      </div>
    </div>
  );
}


