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
      onError: () => {
        setErrors({ email: "حدث خطأ حاول مرة أخرى" });
      },
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

        <div className="relative w-full order-1 md:order-2 md:w-[48%]">

          <img
            src="/clientLogin.png"
            className="rounded-lg min-h-[400px] object-cover"
          />

        </div>

      </div>

    </main>
  );
}