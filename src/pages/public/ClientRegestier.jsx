import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InputField from './components/InputField'
import { useRegisterClient } from '../../features/auth/mutations';
import { validateClientRegister } from '../../features/auth/validation';

export default function ClientRegestier() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        agreeTerms: false,
      });
    const [errors, setErrors] = useState({});
    const registerMutation = useRegisterClient();
const handleChange = (key, value) => {
  setForm((prev) => ({ ...prev, [key]: value }));
  setErrors((prev) => ({ ...prev, [key]: undefined }));
};


const onSubmit = () => {
  console.log("SUBMIT FORM:", form);

  const v = validateClientRegister(form);
  console.log("VALIDATION ERRORS:", v);

  setErrors(v);
  if (Object.keys(v).length > 0) {
    console.log("STOPPED بسبب validation");
    return;
  }

  console.log("CALLING MUTATE...");
  registerMutation.mutate(form, {
    onSuccess: (data) => {
      console.log("REGISTER SUCCESS:", data);
      navigate("/login");
    },
  onError: (err) => {
  const msg =
    err?.response?.data?.message ||
    err?.response?.data?.error ||
    "حصل خطأ أثناء التسجيل";
  setErrors((prev) => ({ ...prev, email: msg }));
},
  });
};

  const isDisabled =
  registerMutation.isPending ||
  !form.fullName ||
  !form.email ||
  !form.password ||
  !form.agreeTerms;


  return (
    <main className="min-h-screen flex  items-center justify-center">
      <div className="w-[80%] md:w-[80%] lg:w-[50%] flex flex-wrap gap-0 md:gap-2 bg-white p-6 flex shadow-2xl">
        <div className="w-[100%] order-2 lg:order-1 md:w-[48%]  flex flex-col gap-5">
          <h1 className="text-3xl font-bold text-black">خد<span className='text-[#d75b19]'>ما</span>تك</h1>
          <h3>تسجيل الدخول</h3>
          <p className='text-xs text-gray-500'>سجّل دخولك عشان تقدر تطلب الخدمات وتتابع طلباتك بسهولة.</p>
          <div className='flex flex-col gap-4 items-center text-white'>
            <InputField inputType="text" title="الاسم بالكامل" id="fullName" fieldPlaceholder="ادخل الاسم.."   
            value={form.fullName} onChange={(e) => handleChange("fullName", e.target.value)} error={errors.fullName}/>
            <InputField inputType="email" title="البريد الالكتروني" id="email" fieldPlaceholder="ادخل البريد الالكتروني.." 
            value={form.email} onChange={(e) => handleChange("email", e.target.value)} error={errors.email}/>
            <InputField inputType="password" title="كلمة السر" id="password" fieldPlaceholder="ادخل كلمة السر.." 
            value={form.password} onChange={(e) => handleChange("password", e.target.value)} error={errors.password}/>
            <span className='flex items-center justify-start w-full gap-2'><input type="checkbox" className="w-5 h-5 accent-indigo-600 focus:ring-2 focus:[#1e1855]"   
            checked={form.agreeTerms} onChange={(e) => handleChange("agreeTerms", e.target.checked)} />
            <span className='text-xs text-gray-500'>أوافق علي القواعد والخصوصية والأمان</span>
            </span>
            {errors.agreeTerms ? (
            <p className="text-red-600 text-xs w-full">{errors.agreeTerms}</p>
            ) : null}
            <button
                onClick={onSubmit}
                disabled={isDisabled}
                className="bg-[#1e1855] text-md text-center w-[90%] px-4 py-1 rounded-lg"
            >
                  {registerMutation.isPending ? "جاري التسجيل..." : "تسجيل"}
            </button>
          </div>
        </div>
        <div className="relative w-[100%] order-1 md:order-2 md:w-[48%] ">
          <img src='/clientRegestier.png' className='rounded-lg min-h-[400px]' />
          <div className='absolute bottom-5 w-[92%] left-[4%]'>
            <div className='bg-white/70 rounded-lg text-[#1e1855] p-6 pb-8 z-50 min-h-[36%]'>
              <p className='text-[14px] text-center font-semibold'> نوصلك بالحرفي الصح</p>
              <span className='text-[11px] text-center pb-8'>أختار نوع الحرفة وحدد طلبك, واحنا نبدأ نجهزلك الحل المناسب</span>
            </div>
            <div className='z-50 min-h-[20px]'><span className='w-[125px] min-h-[150px] bg-black'>-</span></div>
          </div>
        </div>
      </div>
    </main>
  )
}
