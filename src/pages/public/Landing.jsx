import React from "react";
import { FaChevronCircleRight } from "react-icons/fa";

export default function Landing() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* الصورة */}
      <div className="w-full relative overflow-hidden h-[900px]  ">
        <img
          src="/landing.png"
          alt="Landing"
          className="absolute top-1/2 left-1/2 
-translate-x-1/2 -translate-y-1/2 
 object-cover my-20 h-full  "
        />
      </div>

      {/* السكشن */}
      <div className="flex flex-col lg:flex-row justify-around items-center px-4 mt-10 gap-10 "
>
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
          <img src="/landinggg.png" className="w-full h-full object-cover" alt="Frame" />
        </div>

      
      
      </div>
      <div className='flex flex-col items-center mt-5 px-4'>
  <h2 className="text-blue-900 text-2xl font-semibold my-7">خدمتنا</h2>
  <p className='text-blue-900 text-lg my-8 text-center'>نقدم مجموعه متكامله من الخدمات منها</p>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 my-5 justify-items-center">
    
    <div className="w-full max-w-[384px]">
      <img src="/Frame 34 (1).png" alt="نجاره" className="w-full  rounded-lg" />
      <div className='flex justify-between items-center mt-5'>
        <p>نجاره</p>
        <button className="text-white bg-orange-400 hover:bg-warning-strong font-medium rounded-md px-4 py-2 ml-2">اطلب الخدمه</button>
      </div>
    </div>

    <div className="w-full max-w-[384px]">
      <img src="/Frame 34 (2).png" alt="كهربا" className="w-full  rounded-lg" />
      <div className='flex justify-between items-center mt-5'>
        <p>كهربا</p>
        <button className="text-white bg-orange-400 hover:bg-warning-strong font-medium rounded-md px-4 py-2  ml-2">اطلب الخدمه</button>
      </div>
    </div>

    <div className="w-full max-w-[384px]">
      <img src="/Frame 34 (3).png" alt="سباكه" className="w-full  rounded-lg" />
      <div className='flex justify-between items-center mt-5'>
        <p>سباكه</p>
        <button className="text-white bg-orange-400 hover:bg-warning-strong font-medium rounded-md px-4 py-2  ml-2">اطلب الخدمه</button>
      </div>
    </div>


    <div className="w-full max-w-[384px]">
      <img src="/Frame 34 (4).png" alt="نجاره" className="w-full  rounded-lg" />
      <div className='flex justify-between items-center mt-5'>
        <p>نجاره</p>
        <button className="text-white bg-orange-400 hover:bg-warning-strong font-medium rounded-md px-4 py-2 ml-2">اطلب الخدمه</button>
      </div>
    </div>


    <div className="w-full max-w-[384px]">
      <img src="/Frame 34 (5).png" alt="كهربا" className="w-full  rounded-lg" />
      <div className='flex justify-between items-center mt-5'>
        <p>كهربا</p>
        <button className="text-white bg-orange-400 hover:bg-warning-strong font-medium rounded-md px-4 py-2 ml-2">اطلب الخدمه</button>
      </div>
    </div>


    <div className="w-full max-w-[384px]">
      <img src="/Frame 34.png" alt="سباكه" className="w-full  rounded-lg" />
      <div className='flex justify-between items-center mt-5'>
        <p>سباكه</p>
        <button className="text-white bg-orange-400 hover:bg-orange-strong font-medium rounded-md px-4 py-2  ml-2">اطلب الخدمه</button>
      </div>
    </div>

  

    

    

  </div>
</div>
  <div className='client-feedback'>
<div>
<h1>آراء عملائنا</h1>
<p>تجارب حقيقية من مستخدمين وثقوا بخدماتنا</p>
<div className='flex justify-between items-center'>
  <div>
  <div className="icons flex justify-center">
  <i class="fa-solid fa-star" style="color: rgb(255, 212, 59);"></i>
  <i class="fa-solid fa-star" style="color: rgb(255, 212, 59);"></i>
  <i class="fa-solid fa-star" style="color: rgb(255, 212, 59);"></i>
  <i class="fa-solid fa-star" style="color: rgb(255, 212, 59);"></i>
  <i class="fa-solid fa-star" style="color: rgb(255, 212, 59);"></i>
  </div>

  </div>
  <div></div>
  <div></div>
</div>
</div>
<div>

</div>
  </div>
    </div>


    

  );
}
