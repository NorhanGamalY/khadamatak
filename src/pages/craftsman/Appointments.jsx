import React, { useState } from "react";
import { FaCalendar } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import { TiArrowSortedDown } from "react-icons/ti";

const Appointments = () => {
  const [selectedTime, setSelectedTime] = useState("10:00 ص");

  const timeOptions = [
    "08:00 ص",
    "09:00 ص",
    "10:00 ص",
    "11:00 ص",
    "12:00 م",
    "01:00 م",
    "02:00 م",
  ];
  const days = [
    { id: 2, title: "الاحد", isActive: true },
    { id: 3, title: "الاثنين", isActive: true },
    { id: 4, title: "الثلاثاء", isActive: true },
    { id: 5, title: "الاربعاء", isActive: true },
    { id: 6, title: "الخميس", isActive: true },
    { id: 7, title: "الجمعة", isActive: false },
    { id: 1, title: "السبت", isActive: false },
  ];
  return (
    <div dir="rtl" className="min-h-screen bg-main text-primary relative">
      <main className="mx-auto max-w-7xl px-3 sm:px-4 py-6">
        <div className="grid lg:gap-8 gap-5 mb-4 py-4 rounded px-2">
          <div className="flex flex-col items-start">
            <h2 className="lg:text-3xl text-2xl font-extrabold text-primary">
              إدارة جدول العمل
            </h2>
            <p className="lg:text-lg text-[#6b7280] mt-1">
              قم بتحديد الأيام والساعات المتاحة لاستقبال الطلبات الجديدة
            </p>
          </div>

          <div className="rounded bg-white p-4 grid lg:gap-10 gap-8">
            <div className="grid lg:gap-6 gap-4">
              <Title icon={<FaCalendar />} text="ايام العمل الاسبوعية" />

              <div className="grid gap-3">
                <div className="flex lg:gap-4 gap-2 flex-wrap">
                  {days.map((day) => (
                    <button
                      key={day.id}
                      className={` rounded px-4 py-2 ${day.isActive ? "bg-secondary-orange text-white " : "bg-gray-300 text-black"}`}
                    >
                      {day.title}
                    </button>
                  ))}
                </div>
                <p className="text-[#4C4C4C] lg:text-[16px] text-[12px]">
                  انقر علي اليوم لتفعيله أو الغاء التفعيل
                </p>
              </div>
            </div>

            <div className="grid lg:gap-6 gap-3">
              <Title
                icon={<MdAccessTimeFilled className="text-lg" />}
                text="ساعات العمل اليومية"
              />
              <form
                action=""
                onSubmit={(e) => e.preventDefault()}
                className="lg:flex grid w-full gap-4"
              >
                <TimePicker
                  title="من الساعة"
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                  timeOptions={timeOptions}
                />
                <TimePicker
                  title="الى الساعة"
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                  timeOptions={timeOptions}
                />
              </form>
            </div>
          </div>

          <button className="w-full py-2 text-center text-lg bg-secondary text-white rounded">
            حفظ التغيرات
          </button>
        </div>
      </main>
    </div>
  );
};

export default Appointments;

const Title = ({ icon, text }) => {
  return (
    <div className="flex gap-3 items-center">
      <span className="text-secondary">{icon}</span>
      <h2 className="font-semibold text-xl">{text}</h2>
    </div>
  );
};

const TimePicker = ({ selectedTime, setSelectedTime, timeOptions, title }) => {
  return (
    <div className="flex flex-col items-start gap-2 w-full" dir="rtl">
      <label className="text-primary font-semibold lg:text-lg">{title}</label>

      <div className="flex relative items-center justify-between w-full p-2 py-2 border border-gray-300 rounded bg-white transition-all cursor-pointer shadow-sm">
        <div className="flex items-center gap-3">
          <div className="text-secondary">
            <MdAccessTimeFilled />
          </div>
          <span className="lg:text-lg whitespace-nowrap font-medium text-gray-900 tracking-wide">
            {selectedTime}
          </span>
          <div className="text-secondary absolute left-3 text-lg">
            <TiArrowSortedDown />
          </div>
        </div>

        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          className="lg:absolute lg:inset-0 w-full h-full opacity-0 cursor-pointer appearance-none border border-slate-50"
        >
          {timeOptions.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
