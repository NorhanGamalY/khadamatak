import React from "react";
import { FaChevronCircleRight } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import '../Landing.css'
export default function Landing() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="w-full relative overflow-hidden h-[900px] hero ">
        <div className="hero-bo">
          <h1>هل تبحث عن حرفي موثوق ؟</h1>
          <p>
            موقع خدماتك يوفر لك أفضل الحرفيين في منطقتك بسرعة وأسعار مناسبة.
          </p>
          <div className=" flex items-center justify-center">
            <button className="bg-orange-400 hover:bg-orange-500 text-white font-medium rounded-md my-5">
              اطلب حرفي الآن
            </button>
          </div>
        </div>
      </div>

      {/* السكشن */}
      <div className="flex flex-col lg:flex-row justify-around items-center px-4 mt-10 gap-10 ">
        {/* العمود الأول */}
        <div className="w-[320px] bg-gray-400 rounded-3 p-5">
          <h1 className="text-2xl font-bold mb-4">لماذا تختار خدمتك ؟</h1>

          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <FaChevronCircleRight />
              <p>حرفيون مختارون بعناية</p>
            </li>

            <li className="flex items-center gap-2">
              <FaChevronCircleRight />
              <p>سرعة في التوصيل وتنفيذ الخدمة</p>
            </li>

            <li className="flex items-center gap-2">
              <FaChevronCircleRight />
              <p>أسعار واضحة دون أي مفاجآت</p>
            </li>

            <li className="flex items-center gap-2">
              <FaChevronCircleRight />
              <p>تقييمات حقيقية من العملاء</p>
            </li>
          </ul>
        </div>

        <div className="w-[490px] h-full">
          <img
            src="/landinggg.png"
            className="w-full h-full object-cover"
            alt="Frame"
          />
        </div>
      </div>
      <div className="flex flex-col items-center mt-5 px-4">
        <h2 className="text-blue-900 text-2xl font-semibold my-7">خدمتنا</h2>
        <p className="text-blue-900 text-lg my-8 text-center">
          نقدم مجموعه متكامله من الخدمات منها
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 my-5 justify-items-center">
          <div className="w-full max-w-[384px]">
            <img
              src="/Frame 34 (1).png"
              alt="نجاره"
              className="w-full  rounded-lg"
            />
            <div className="flex justify-between items-center mt-5 flex-col md:flex-row ">
              <p>نجاره</p>
              <button className="text-white bg-orange-400 hover:bg-warning-strong font-medium rounded-md px-4 py-2 ml-2">
                اطلب الخدمه
              </button>
            </div>
          </div>

          <div className="w-full max-w-[384px]">
            <img
              src="/Frame 34 (2).png"
              alt="كهربا"
              className="w-full  rounded-lg"
            />
            <div className="flex flex-col md:flex-row  justify-between items-center mt-5">
              <p>كهربا</p>
              <button className="text-white bg-orange-400 hover:bg-warning-strong font-medium rounded-md px-4 py-2  ml-2">
                اطلب الخدمه
              </button>
            </div>
          </div>

          <div className="w-full max-w-[384px]">
            <img
              src="/Frame 34 (3).png"
              alt="سباكه"
              className="w-full  rounded-lg"
            />
            <div className="flex flex-col md:flex-row  justify-between items-center mt-5">
              <p>سباكه</p>
              <button className="text-white bg-orange-400 hover:bg-warning-strong font-medium rounded-md px-4 py-2  ml-2">
                اطلب الخدمه
              </button>
            </div>
          </div>

          <div className="w-full max-w-[384px]">
            <img
              src="/Frame 34 (4).png"
              alt="نجاره"
              className="w-full  rounded-lg"
            />
            <div className="flex  flex-col md:flex-row justify-between items-center mt-5">
              <p>نجاره</p>
              <button className="text-white bg-orange-400 hover:bg-warning-strong font-medium rounded-md px-4 py-2 ml-2">
                اطلب الخدمه
              </button>
            </div>
          </div>

          <div className="w-full max-w-[384px]">
            <img
              src="/Frame 34 (5).png"
              alt="كهربا"
              className="w-full  rounded-lg"
            />
            <div className="flex flex-col md:flex-row  justify-between items-center mt-5">
              <p>كهربا</p>
              <button className="text-white bg-orange-400 hover:bg-warning-strong font-medium rounded-md px-4 py-2 ml-2">
                اطلب الخدمه
              </button>
            </div>
          </div>

          <div className="w-full max-w-[384px]">
            <img
              src="/Frame 34.png"
              alt="سباكه"
              className="w-full  rounded-lg"
            />
            <div className="flex flex-col md:flex-row  justify-between items-center mt-5">
              <p>سباكه</p>
              <button className="text-white bg-orange-400 hover:bg-orange-strong font-medium rounded-md px-4 py-2  ml-2">
                اطلب الخدمه
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="client-feedback max-w-[1300px] mx-auto mt-10 rounded-xl shadow-lg p-6  ">
        <div className="flex flex-col justify-center items-center mt-10">
          <h1 className="text-center text-2xl font-semibold">آراء عملائنا</h1>
          <p className="text-center my-10 text-gray-600">
            تجارب حقيقية من مستخدمين وثقوا بخدماتنا
          </p>
        </div>

        <div className="flex flex-col  md:flex-row justify-center items-start gap-6">
          <div className="bg-white rounded-xl shadow-md p-4 text-center ">
            <div className="icons flex justify-center gap-1 mb-2">
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
            </div>
            <h4 className="font-semibold mb-1">
              "خدمة سريعة وتعامل محترم، أنصح بها"
            </h4>
            <p className="text-sm text-gray-500">—أحمد.خ—</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 text-center ">
            <div className="icons flex justify-center gap-1 mb-2">
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
            </div>
            <h4 className="font-semibold mb-1">
              "الحرفي كان محترفا والسعر مناسب"
            </h4>
            <p className="text-sm text-gray-500">—علي.ع—</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 text-center ">
            <div className="icons flex justify-center gap-1 mb-2">
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
            </div>
            <h4 className="font-semibold mb-1">
              "سرعة في العمل وضمان على الخدمة"
            </h4>
            <p className="text-sm ">—سارة.أ—</p>
          </div>
        </div>
      </div>
      <div className="quality max-w-[1300px] mx-auto mt-10 rounded-xl shadow-lg p-6">
        <h1 className="text-center text-2xl font-semibold">ضمان جودتنا</h1>
        <p className="text-center my-5 text-gray-600">
          نضمن الأمان + الموثوقية
        </p>
        <div className="flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="flex flex-col justify-center items-center gap-3">
            <img src="/check 1.png" alt="" />
            <h1 className="font-bold">مراجعه دقيقه</h1>
            <p>نراجع جميع الحرفيين بدقه قبل اعتمادهم علي المنصه</p>
          </div>
          <div className=" flex flex-col justify-center items-center gap-3">
            <img src="/optimizing 1.png" alt="" />
            <h1 className="font-bold">دعم فني متواصل</h1>
            <p>فريق دعمجاهز لمساعدتك علي مدار الساعه</p>
          </div>
          <div className=" flex flex-col justify-center items-center gap-3">
            <img src="/branding 1.png" alt="" />
            <h1 className="font-bold">ضمان الخدمه</h1>
            <p>نضمن لك جودة الخدمة أو استرجاع حقك</p>
          </div>
        </div>
      </div>
    </div>
  );
}
