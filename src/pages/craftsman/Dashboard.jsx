import React from 'react'
import Orders from './Orders'


export default function Dashboard() {
  return (
    <>
      <Orders />

      <div className="p-4 md:p-10 bg-gray-300">
        <div
          className="flex flex-col md:flex-row 
                justify-between items-start md:items-center 
                gap-2 md:gap-0 mb-4"
        >
          <h4 className="text-lg font-bold">اخر الطلبات الجديدة</h4>

          <h4 className="text-orange-500 cursor-pointer hover:underline">
            عرض الكل
          </h4>
        </div>

        <div
          className="bg-white rounded-lg shadow p-4 
                  flex flex-col md:flex-row 
                  gap-4 md:items-center md:justify-between mb-4"
        >
          <img
            src="/Ellipse 89.png"
            alt="avatar"
            className="w-16 h-16 mx-auto md:mx-0"
          />

          <div className="text-center md:text-right">
            <h3 className="font-bold">عمر سامي</h3>
            <p className="text-gray-500">طلخا والمنصورة</p>
          </div>

          <div className="text-center">
            <h3 className="font-bold">الخدمة</h3>
            <p className="text-gray-400">صيانة التكييف</p>
          </div>

          <div className="text-center">
            <h3 className="font-bold">السعر</h3>
            <p>500.00 جم</p>
          </div>

          <div className="text-center">
            <h3>10/2/2026</h3>
            <p>02:00 م</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button className="bg-gray-200 text-blue-900 px-4 py-2 rounded-md w-full sm:w-auto">
              رفض
            </button>

            <button className="bg-blue-900 text-white px-4 py-2 rounded-md w-full sm:w-auto">
              قبول
            </button>
          </div>
        </div>
        <div
          className="bg-white rounded-lg shadow p-4 
                  flex flex-col md:flex-row 
                  gap-4 md:items-center md:justify-between mb-4"
        >
          <img
            src="/Ellipse 88.png"
            alt="avatar"
            className="w-16 h-16 mx-auto md:mx-0"
          />

          <div className="text-center md:text-right">
            <h3 className="font-bold">عمر سامي</h3>
            <p className="text-gray-500">طلخا والمنصورة</p>
          </div>

          <div className="text-center">
            <h3 className="font-bold">الخدمة</h3>
            <p className="text-gray-400">صيانة التكييف</p>
          </div>

          <div className="text-center">
            <h3 className="font-bold">السعر</h3>
            <p>500.00 جم</p>
          </div>

          <div className="text-center">
            <h3>10/2/2026</h3>
            <p>02:00 م</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button className="bg-gray-200 text-blue-900 px-4 py-2 rounded-md w-full sm:w-auto">
              رفض
            </button>

            <button className="bg-blue-900 text-white px-4 py-2 rounded-md w-full sm:w-auto">
              قبول
            </button>
          </div>
        </div>
        <div
          className="bg-white rounded-lg shadow p-4 
                  flex flex-col md:flex-row 
                  gap-4 md:items-center md:justify-between mb-4"
        >
          <img
            src="/Ellipse 87.png"
            alt="avatar"
            className="w-16 h-16 mx-auto md:mx-0"
          />

          <div className="text-center md:text-right">
            <h3 className="font-bold">عمر سامي</h3>
            <p className="text-gray-500">طلخا والمنصورة</p>
          </div>

          <div className="text-center">
            <h3 className="font-bold">الخدمة</h3>
            <p className="text-gray-400">صيانة التكييف</p>
          </div>

          <div className="text-center">
            <h3 className="font-bold">السعر</h3>
            <p>500.00 جم</p>
          </div>

          <div className="text-center">
            <h3>10/2/2026</h3>
            <p>02:00 م</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button className="bg-gray-200 text-blue-900 px-4 py-2 rounded-md w-full sm:w-auto">
              رفض
            </button>

            <button className="bg-blue-900 text-white px-4 py-2 rounded-md w-full sm:w-auto">
              قبول
            </button>
          </div>
        </div>
      </div>
      <div className="p-4 md:p-8">
        <div className="bg-white rounded-xl shadow-md p-6  mx-auto md:mx-0">
          <h3 className="text-lg md:text-xl font-bold mb-4 ">تذكير سريع</h3>

          <div className="bg-amber-50 rounded-lg p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <img
                src="/Frame 2147228651.png"
                className="w-8 h-8 object-cover"
                alt=""
                srcset=""
              />
              <h4 className="font-semibold text-amber-900">
                موعد صيانه حي الجامعه
              </h4>
            </div>

            <h5 className="text-sm md:text-base text-orange-300">
              باقي 50 دقيقة على الموعد
            </h5>
          </div>
        </div>
      </div>
    </>
  );
}
