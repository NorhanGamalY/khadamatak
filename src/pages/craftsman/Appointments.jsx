import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCalendar } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import { TiArrowSortedDown } from "react-icons/ti";
import { getId, getToken } from "../../features/auth/authHelpers";
import Toast from "../../components/common/Toast"; 

const availableTimeOptions = {
  start: ["08:00 ص", "10:00 ص", "12:00 م", "02:00 م", "04:00 م"],
  end: ["09:00 ص", "11:00 ص", "07:00 م", "08:00 م", "10:00 م"],
};

const initialDays = [
  { id: 0, title: "الاحد" },
  { id: 1, title: "الاثنين" },
  { id: 2, title: "الثلاثاء" },
  { id: 3, title: "الاربعاء" },
  { id: 4, title: "الخميس" },
  { id: 5, title: "الجمعة" },
  { id: 6, title: "السبت" },
];

const Appointments = () => {
  const token = getToken();
  const craftsmanId = getId();

  const [schedule, setSchedule] = useState(
    initialDays.map((day) => ({
      ...day,
      isActive: false,
      startTime: "08:00 ص",
      endTime: "09:00 ص",
      existsInDB: false,
    }))
  );

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });

  const formatTimeForAPI = (timeStr) => {
    const [time, period] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (period === "م" && hours < 12) hours += 12;
    if (period === "ص" && hours === 12) hours = 0;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
  };

  const convertAPITimeToDisplay = (timeStr) => {
    if (!timeStr) return "08:00 ص";
    const [hoursStr, minutes] = timeStr.split(":");
    let hours = parseInt(hoursStr, 10);
    const period = hours >= 12 ? "م" : "ص";
    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12;
    return `${String(hours).padStart(2, "0")}:${minutes} ${period}`;
  };

  const GetAvailableDays = async () => {
    try {
      const res = await axios.get(
        `https://herafie.runasp.net/api/CraftsmanAvailability/${craftsmanId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const savedData = res.data;
      setSchedule((prev) =>
        prev.map((day) => {
          const match = savedData.find((item) => item.day === day.id);
          if (match) {
            return {
              ...day,
              isActive: match.isAvailable,
              startTime: convertAPITimeToDisplay(match.startTime),
              endTime: convertAPITimeToDisplay(match.endTime),
              existsInDB: true,
            };
          }
          return { ...day, existsInDB: false };
        })
      );
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  const toggleDay = (id) => {
    setSchedule((prev) =>
      prev.map((day) =>
        day.id === id ? { ...day, isActive: !day.isActive } : day
      )
    );
  };

  const updateDayTime = (id, field, value) => {
    setSchedule((prev) =>
      prev.map((day) => (day.id === id ? { ...day, [field]: value } : day))
    );
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const toPost = schedule.filter((d) => !d.existsInDB && d.isActive);
      const toPut = schedule.filter((d) => d.existsInDB);
      const requests = [];

      // PUT → أيام موجودة في الـ DB
      if (toPut.length > 0) {
        const putPayload = toPut.map((day) => ({
          craftsmanId: Number(craftsmanId),
          day: day.id,
          startTime: formatTimeForAPI(day.startTime),
          endTime: formatTimeForAPI(day.endTime),
          isAvailable: day.isActive,
        }));
        requests.push(
          axios.put(
            `https://herafie.runasp.net/api/CraftsmanAvailability`,
            putPayload,
            { headers: { Authorization: `Bearer ${token}` } }
          )
        );
      }

      await Promise.all(requests);

      for (const day of toPost) {
        try {
          await axios.post(
            `https://herafie.runasp.net/api/CraftsmanAvailability`,
            {
              day: day.id,
              startTime: formatTimeForAPI(day.startTime),
              endTime: formatTimeForAPI(day.endTime),
              isAvailable: day.isActive,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } catch (postError) {
          if (postError.response?.status === 400) {
            await axios.put(
              `https://herafie.runasp.net/api/CraftsmanAvailability`,
              [
                {
                  craftsmanId: Number(craftsmanId),
                  day: day.id,
                  startTime: formatTimeForAPI(day.startTime),
                  endTime: formatTimeForAPI(day.endTime),
                  isAvailable: day.isActive,
                },
              ],
              { headers: { Authorization: `Bearer ${token}` } }
            );
          } else {
            throw postError;
          }
        }
      }

      await GetAvailableDays();
      setToast({
        isOpen: true,
        type: "success",
        title: "تم الحفظ!",
        message: "تم حفظ جدول المواعيد بنجاح",
      });
    } catch (error) {
      console.error("Save error:", error);
      setToast({
        isOpen: true,
        type: "error",
        title: "حدث خطأ!",
        message: "فشل حفظ الجدول، حاول مرة أخرى",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && craftsmanId) GetAvailableDays();
  }, [token, craftsmanId]);

  return (
    <div dir="rtl" className="min-h-screen bg-main text-primary">
      <Toast
        isOpen={toast.isOpen}
        type={toast.type}
        title={toast.title}
        message={toast.message}
        onClose={() => setToast((prev) => ({ ...prev, isOpen: false }))}
        actionLabel="حسناً"
      />

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
            {/* أيام الأسبوع */}
            <div className="grid lg:gap-6 gap-4">
              <Title icon={<FaCalendar />} text="ايام العمل الاسبوعية" />
              <div className="grid gap-3">
                <div className="flex lg:gap-4 gap-2 flex-wrap">
                  {schedule.map((day) => (
                    <button
                      key={day.id}
                      onClick={() => toggleDay(day.id)}
                      className={`rounded px-4 py-2 ${
                        day.isActive
                          ? "bg-secondary-orange text-white"
                          : "bg-gray-300 text-black"
                      }`}
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
              {schedule.filter((d) => d.isActive).length === 0 ? (
                <p className="text-gray-400 text-sm">
                  اختر يوم أولاً لتحديد مواعيده
                </p>
              ) : (
                <div className="grid gap-4">
                  {schedule
                    .filter((d) => d.isActive)
                    .map((day) => (
                      <div
                        key={day.id}
                        className="border rounded p-3 grid gap-3"
                      >
                        <h3 className="font-semibold text-secondary-orange">
                          {day.title}
                        </h3>
                        <div className="lg:flex grid w-full gap-4">
                          <TimePicker
                            title="من الساعة"
                            selectedTime={day.startTime}
                            setSelectedTime={(val) =>
                              updateDayTime(day.id, "startTime", val)
                            }
                            timeOptions={availableTimeOptions.start}
                          />
                          <TimePicker
                            title="الى الساعة"
                            selectedTime={day.endTime}
                            setSelectedTime={(val) =>
                              updateDayTime(day.id, "endTime", val)
                            }
                            timeOptions={availableTimeOptions.end}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full py-2 text-center text-lg bg-secondary text-white rounded disabled:opacity-60"
          >
            {loading ? "جاري الحفظ..." : "حفظ التغيرات"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Appointments;

const Title = ({ icon, text }) => (
  <div className="flex gap-3 items-center">
    <span className="text-secondary">{icon}</span>
    <h2 className="font-semibold text-xl">{text}</h2>
  </div>
);

const TimePicker = ({ selectedTime, setSelectedTime, timeOptions, title }) => (
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
        className="lg:absolute lg:inset-0 w-full h-full opacity-0 cursor-pointer appearance-none"
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
