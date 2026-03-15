import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InputField from './components/InputField'
import { validateClientStep1 } from '../../features/auth/validation';

export default function ClientRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleBlur = (key) => {
    const v = validateClientStep1({ ...form });
    if (v[key]) {
      setErrors((prev) => ({ ...prev, [key]: v[key] }));
    }
  };

  const handleNext = () => {
    const v = validateClientStep1(form);
    setErrors(v);
    if (Object.keys(v).length === 0) {
      navigate("/client-register2", { state: form });
    }
  };

  const isDisabled = !form.fullName || !form.email || !form.password;

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-[80%] lg:w-[50%] flex flex-wrap gap-0 md:gap-2 bg-white p-6 shadow-2xl">

        <div className="w-[100%] order-2 lg:order-1 md:w-[48%] flex flex-col gap-5">
          <button onClick={() => navigate("/")} className="text-3xl font-bold text-black text-start">
            خد<span className="text-[#d75b19]">ما</span>تك
          </button>
          <h3>إنشاء حساب</h3>

          <p className='text-xs text-gray-500'>ادخل بياناتك الأساسية للتسجيل</p>

          <div className='flex flex-col gap-4 items-center'>
            <InputField inputType="text" title="الاسم بالكامل" id="fullName" fieldPlaceholder="ادخل الاسم.."
              value={form.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              onBlur={() => handleBlur("fullName")}
              error={errors.fullName} />

            <InputField inputType="email" title="البريد الالكتروني" id="email" fieldPlaceholder="ادخل البريد الالكتروني.."
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              error={errors.email} />

            <InputField inputType="password" title="كلمة السر" id="password" fieldPlaceholder="ادخل كلمة السر.."
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              onBlur={() => handleBlur("password")}
              error={errors.password} />

            <button
              onClick={handleNext}
              disabled={isDisabled}
              className="bg-[#1e1855] text-white text-md text-center w-[90%] px-4 py-2 rounded-lg disabled:opacity-50"
            >
              التالي
            </button>

            <p className="text-xs text-gray-500">
              عندك حساب؟{" "}
              <button onClick={() => navigate("/login")} className="text-[#d75b19]">
                سجل دخول
              </button>
            </p>
          </div>
        </div>

        <div className="relative w-[100%] order-1 md:order-2 md:w-[48%]">
          <img src='/reset.png' className='rounded-lg min-h-[400px]' />
          <div className='absolute bottom-5 w-[92%] left-[4%]'>
            <div className='bg-white/70 rounded-lg text-[#1e1855] p-6 pb-8'>
              <p className='text-[14px] text-center font-semibold'>نوصلك بالحرفي الصح</p>
              <span className='text-[11px] text-center pb-8'>أختار نوع الحرفة وحدد طلبك, واحنا نبدأ نجهزلك الحل المناسب</span>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}