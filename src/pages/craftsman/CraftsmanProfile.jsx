import React from "react";
import { BsTelephoneFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { IoCheckmark } from "react-icons/io5";

const services = [
  {
    id: 1,
    name: "تركيب مطابخ",
  },
  {
    id: 2,
    name: "تصنيع الابواب",
  },
  {
    id: 3,
    name: "صيانه وتصليح الاخشاب",
  },
  {
    id: 4,
    name: "ديكورات خشبية",
  },
];
const CraftsmanProfile = () => {
  return (
    <div dir="rtl" className="bg-main relative text-primary">
      <main className="mx-auto max-w-7xl grid lg:gap-8 gap-6 lg:px-8 px-4 py-6 lg:py-8">
        <div className="bg-white grid items-center shadow-[0_6px_16px_rgba(17,24,39,0.08)] lg:mx-12 lg:gap-4 gap-2 text-center  lg:py-9 py-6 rounded">
          <div className="grid lg:gap-12 gap-8">
            <div className="flex items-center gap-4 justify-center">
              <div className="order-1 w-28 h-28">
                <img
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  className="w-full h-full rounded-full"
                />
              </div>

              <div className="grid text-secondary font-semibold gap-2.5">
                <h1 className="text-2xl  font-extrabold">محمد لطفي </h1>
                <span className="flex items-center gap-1.5" dir="ltr">
                  <BsTelephoneFill />
                  0541234567
                </span>
                <span className="flex items-center gap-1.5" dir="ltr">
                  <FaLocationDot /> المنصورة
                </span>
              </div>
            </div>
            <div className="grid lg:gap-6 gap-4">
              <div className="bg-secondary-orange text-white text-center font-bold text-2xl py-3">
                <h2>الخدمات</h2>
              </div>
              <div className="px-4 grid lg:gap-4 gap-2">
                {services.map((ser, idx) => (
                  <div
                    key={idx}
                    className="flex items-center font-bold lg:text-xl gap-1 text-secondary"
                  >
                    <IoCheckmark /> <span>{ser.name}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-3 mt-3 lg:mt-6 text-white lg:text-xl">
                <button
                  dir="ltr"
                  className="flex gap-1 items-center bg-secondary  py-3 px-4 lg:px-6 rounded"
                >
                  تعديل البيانات
                  <FiEdit2 className="text-sm" />
                </button>
                <button className="bg-secondary-orange py-3  px-4 lg:px-6 rounded">
                  حفظ
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CraftsmanProfile;
