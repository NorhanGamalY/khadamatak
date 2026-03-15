import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function SelectRole() {
  const navigate = useNavigate()
  return (
    <main className="min-h-screen flex  items-center justify-center">
      <div className="w-[80%] md:w-[80%] lg:w-[50%] flex flex-wrap gap-0 md:gap-4 bg-white p-6 flex shadow-2xl">
        <div className="w-[100%] order-2 lg:order-1 md:w-[48%]  flex flex-col gap-10">
          <button onClick={() => navigate("/")} className="text-3xl font-bold text-black text-start">خد<span className='text-[#d75b19]'>ما</span>تك</button>
          <p className='text-xs text-gray-500'>خدماتك منصة خدمات منزلية بتسهّل على العملاء طلب الحرفيين في أي وقت. من السباكة للكهرباء والنجارة، بنوفّرلك تجربة حجز سهلة وتواصل مباشر مع حرفيين موثوقين.</p>
          <div className='flex flex-col gap-4 items-center text-white'>
            <button onClick={() => navigate("/craftsman-register")} className='bg-[#1e1855] text-md text-center w-[90%] px-4 py-1 rounded-lg'>تسجيل الدخول كحرفي </button>
            <button onClick={() => navigate("/client-register")} className='bg-[#1e1855] text-md text-center w-[90%] px-4 py-1 rounded-lg'>تسجيل الدخول كعميل </button>

          </div>
        </div>
        <div className="relative w-[100%] order-1 md:order-2 md:w-[48%] ">
          <img src='/login.jpg' className='rounded-lg min-h-[400px]' />
          <div className='absolute bottom-5 w-[92%] left-[4%]'>
            <div className='bg-white/70 rounded-lg text-[#1e1855] p-6 pb-8 z-50 min-h-[36%]'>
              <p className='text-[14px] text-center font-semibold'> أطلب الخدمة اللي محتاجها بسهولة</p>
              <span className='text-[11px] text-center pb-8'>أختار نوع الحرفة وحدد طلبك, واحنا نبدأ نجهزلك الحل المناسب</span>
            </div>
            <div className='z-50 min-h-[20px]'><span className='w-[125px] min-h-[150px] bg-black'>-</span></div>
          </div>
        </div>
      </div>
    </main>
  )
}
