import React, { useState } from "react";
import InputField from "./components/InputField";
import { useNavigate } from "react-router-dom";
import { useForgetPassword } from "../../features/auth/password/hooks";

export default function ForgetPassword() {
    const forgetPasswordMutation = useForgetPassword();
    const navigate = useNavigate();

  const [form, setForm] = useState({email: ""});
  const [errors, setErrors] = useState({});

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = () => {
  if (!form.email) {
    setErrors({ email: "من فضلك أدخل البريد الإلكتروني" });
    return;
  }

  forgetPasswordMutation.mutate(
    { email: form.email },
    {
       onSuccess: () => {
  localStorage.setItem("resetEmail", form.email);
  navigate("/verify-code");
},
      onError: (error) => {
  const message =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    "حدث خطأ حاول مرة أخرى";

  setErrors({ email: message });
}
    }
  );
};

  const isDisabled = !form.email || forgetPasswordMutation.isPending;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="w-[90%] md:w-[80%] lg:w-[50%] flex flex-wrap gap-2 bg-white p-6 rounded-xl shadow-xl">

        <div className="w-full order-2 lg:order-1 md:w-[48%] flex flex-col gap-4">

          <h1 className="text-3xl font-bold text-black">
            خد<span className="text-[#d75b19]">ما</span>تك
          </h1>

          <h3 className="text-xl font-semibold">
            نسيت كلمة السر؟
          </h3>

          <p className="text-xs text-gray-500">
            من فضلك أدخل بريدك الإلكتروني، وسنرسل لك رابطًا لإعادة تعيين كلمة المرور.
          </p>

          <div className="flex flex-col gap-4">

            <InputField
              inputType="email"
              title="البريد الالكتروني"
              id="email"
              fieldPlaceholder="ادخل البريد الالكتروني..."
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              error={errors.email}
            />

            <button
              onClick={onSubmit}
              disabled={isDisabled}
              className={`w-full py-2 rounded-lg text-white transition
              ${isDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#1e1855] hover:opacity-90"
              }`}
            >
            {forgetPasswordMutation.isPending ? "جاري الإرسال..." : "استمرار"}
            </button>

            <p className="text-xs text-gray-500 text-center">
              تتذكر كلمة السر؟{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-[#d75b19] hover:underline"
              >
                سجل الدخول
              </button>
            </p>

          </div>
        </div>

          <div className="relative w-[100%] order-1 md:order-2 md:w-[48%]">
          <img src="/forgetpassword.png" className="rounded-lg min-h-[400px]" />
          <div className="absolute bottom-5 w-[92%] left-[4%]">
            <div className="bg-white/70 rounded-lg text-center text-[#1e1855] p-6 pb-8 z-50 min-h-[36%]">
              <p className="text-[14px] text-center font-semibold"> كل خدمات بيتك في مكان واحد </p>
              <span className="text-[11px] text-center pb-8">
                    من غير تعب ولا تدوير… خدماتك دايمًا معاك.
              </span>
            </div>
          </div>
        </div>

      </div>

    </main>
  );
}