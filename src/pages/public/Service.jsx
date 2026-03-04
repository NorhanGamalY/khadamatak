import React, { useState } from "react";
import ServiceCard from "../../components/createService/Card";
import UploadBox from "../../components/createService/UploadImage";
import TextAreaField from "../../components/createService/TextArea";
import OrderSummary from "../../components/createService/OrderSummary";
import DateSelector from "../../components/createService/DataSelector";
import TimeSelector from "../../components/createService/TimeSelector";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
const service = {
    category: "سباكة",
    name: "يوسف النجار",
    experience: 5,
    description: "خدمة كاملة تشمل تأسيس وسباكة حمام كامل",
    rating: 4.8,
    subtitle: "سباك محترف",
  };
  
export default function Service() {
  const [description, setDescription] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const days = [
    { name: "الأحد", date: 8 },
    { name: "الاثنين", date: 9 },
    { name: "الثلاثاء", date: 10 },
  ];

  const times = ["10:00 م", "2:30 م", "4:30 م", "6:00 م"];

  return (
    <div className="min-h-screen m-25 flex flex-col gap-8 max-w-5xl mx-auto ">
      <h2 className="text-2xl text-center font-bold ">
      انشاء طلب الخدمة
    </h2>

      <ServiceCard service={service} />

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

      <div>
        <h3 className="text-lg mb-3 font-medium ">
    صور (اختياري)
    </h3>
        <UploadBox />
      </div>

      <div>
        <h3 className="text-lg mb-3 font-medium ">
    اختيار الموعد
    </h3>
        {/* container with gray background, rounded corners */}
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
          serviceType={service.category}
          time={selectedTime}
          price={100}
        />
      </div>

      <div className="flex justify-center">
        <button className="flex items-center justify-center gap-2 w-full max-w-md bg-blue-900 text-white py-2 rounded-xl text-lg font-semibold">
          متابعة الدفع <MdKeyboardDoubleArrowLeft size={24} />

        </button>
      </div>
    </div>
  );
}
