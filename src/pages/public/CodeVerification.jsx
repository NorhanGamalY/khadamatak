import React, { useState } from "react";
import InputField from "./components/InputField";
import { useNavigate } from "react-router-dom";
import { useVerifyCode } from "../../features/auth/password/hooks";

export default function CodeVerification() {
  const verifyCodeMutation = useVerifyCode();
  const navigate = useNavigate();
  const [form, setForm] = useState({code: ""});

  const [errors, setErrors] = useState({});

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = () => {
  if (!form.code) {
    setErrors({ code: "ادخل الكود" });
    return;
  }

  verifyCodeMutation.mutate(
    { code: form.code },
    {
      onSuccess: () => {
        navigate("/reset-password");
      },
      onError: () => {
        setErrors({ code: "الكود غير صحيح" });
      },
    }
  );
};

  const isDisabled = !form.code || verifyCodeMutation.isPending;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="w-[90%] md:w-[80%] lg:w-[50%] flex flex-wrap gap-2 bg-white p-6 rounded-xl shadow-xl">

        <div className="w-full order-2 lg:order-1 md:w-[48%] flex flex-col gap-4">

          <h1 className="text-3xl font-bold text-black">
            خد<span className="text-[#d75b19]">ما</span>تك
          </h1>

          <h3 className="text-xl font-semibold">
           تحقق من الكود
          </h3>

          <p className="text-xs text-gray-500">
           من فضلك ادخل الكود الذي أرسل علي بريدك الالكتروني
          </p>

          <div className="flex flex-col gap-4">

            <InputField
  inputType="text"
  title="الكود"
  id="code"
  fieldPlaceholder="ادخل الكود..."
  value={form.code}
  onChange={(e) => handleChange("code", e.target.value)}
  error={errors.code}
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
                {verifyCodeMutation.isPending ? "جاري التحقق..." : "تحقق"}
            </button>

            <p className="text-xs text-gray-500 text-center">
             الكود لم يرسل؟{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-[#d75b19] hover:underline"
              >
                اعاده ارسال الكود
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