import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCalendar } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import { TiArrowSortedDown } from "react-icons/ti";
import { getId, getToken } from "../../features/auth/authHelpers";
import { toast } from "react-toastify";

const Appointments = () => {
  const token = getToken();
  const id = getId();
  const [existingSchedule, setExistingSchedule] = useState([]);
  const [selectedTimeIsStart, setSelectedTimeIsStart] = useState("08:00 ص");
  const [selectedTimeIsEnd, setSelectedTimeIsEnd] = useState("02:00 م");

  const [days, setDays] = useState([
    { id: 0, title: "الاحد", isActive: false },
    { id: 1, title: "الاثنين", isActive: false },
    { id: 2, title: "الثلاثاء", isActive: false },
    { id: 3, title: "الاربعاء", isActive: false },
    { id: 4, title: "الخميس", isActive: false },
    { id: 5, title: "الجمعة", isActive: false },
    { id: 6, title: "السبت", isActive: false },
  ]);

  const availableTime = {
    start: ["08:00 ص", "10:00 ص", "12:00 م", "02:00 م", "04:00 م"],
    end: ["09:00 ص", "11:00 ص", "07:00 م", "08:00 م", "10:00 م"],
  };
  const toggleDay = (id) => {
    setDays((prevDays) =>
      prevDays.map((day) =>
        day.id === id ? { ...day, isActive: !day.isActive } : day,
      ),
    );
  };
  const formatTimeForAPI = (timeStr) => {
    let [time, period] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");
    let hoursInt = parseInt(hours, 10);
    if (period === "م" && hoursInt < 12) hoursInt += 12;
    if (period === "ص" && hoursInt === 12) hoursInt = 0;
    return `${String(hoursInt).padStart(2, "0")}:${minutes}:00`;
  };
  const GetAvailableDays = async () => {
    try {
      const res = await axios.get(
        `https://herafie.runasp.net/api/CraftsmanAvailability/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const savedData = res.data;
      setExistingSchedule(res.data);
      if (savedData && savedData.length > 0) {
        setDays((prev) =>
          prev.map((day) => {
            const match = savedData.find((item) => item.id === id.id);
            return { ...day, isActive: match ? match.isAvailable : false };
          }),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    try {
      const requests = days.map((dayState) => {
        const alreadyInDB = existingSchedule.find((s) => s.day === dayState.id);

        const payload = {
          day: dayState.id,
          startTime: formatTimeForAPI(selectedTimeIsStart),
          endTime: formatTimeForAPI(selectedTimeIsEnd),
          isAvailable: dayState.isActive,
        };

        if (alreadyInDB) {
          return axios.put(
            `https://herafie.runasp.net/api/CraftsmanAvailability`,
            payload,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
        } else if (dayState.isActive) {
          return axios.post(
            `https://herafie.runasp.net/api/CraftsmanAvailability`,
            payload,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
        }
      });

      await Promise.all(requests);
      GetAvailableDays();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (token) GetAvailableDays();
  }, [token, id]);
  return (
    <div dir="rtl" className="min-h-screen bg-main text-primary">
      <main className="mx-auto max-w-7xl lg:px-8 px-4 py-6 lg:py-8">
        <div className="grid lg:gap-8 gap-5">
          <div className="flex flex-col items-start">
            <h2 className="lg:text-3xl text-2xl font-extrabold">
              إدارة جدول العمل
            </h2>
            <p className="lg:text-lg text-[#6b7280] mt-1 text-sm">
              قم بتحديد الأيام والساعات المتاحة لاستقبال الطلبات الجديدة
            </p>
          </div>

          <div className="rounded bg-white p-4 grid lg:gap-10 gap-8">
            <div className="grid lg:gap-6 gap-4">
              <Title icon={<FaCalendar />} text="ايام العمل الاسبوعية" />

              <div className="grid gap-3">
                <div className="flex lg:gap-4 gap-2 flex-wrap">
                  {days.map((day, idx) => (
                    <button
                      key={idx}
                      onClick={() => toggleDay(day.id)}
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
                  selectedTime={selectedTimeIsStart}
                  setSelectedTime={setSelectedTimeIsStart}
                  timeOptions={availableTime.start}
                  isStart
                />
                <TimePicker
                  title="الى الساعة"
                  selectedTime={selectedTimeIsEnd}
                  setSelectedTime={setSelectedTimeIsEnd}
                  timeOptions={availableTime.end}
                />
              </form>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full py-2 text-center text-lg bg-secondary text-white rounded"
          >
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
          onChange={(e) => {
            setSelectedTime(e.target.value);
          }}
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
