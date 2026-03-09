import React, { useState } from "react";
import { OTPInput } from "input-otp";
import { useNavigate } from "react-router-dom";
import { useVerifyCode, useForgetPassword } from "../../features/auth/password/hooks";

export default function CodeVerification() { 
  const verifyCodeMutation = useVerifyCode();
  const forgetPasswordMutation = useForgetPassword(); 
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const email = localStorage.getItem("resetEmail");

  const onSubmit = () => {
    if (!code || code.length < 5) {
      setError("ادخل الكود كاملاً");
      return;
    }

    verifyCodeMutation.mutate(
      { code },
      {
        onSuccess: () => navigate("/reset-password"),
        onError: () => setError("الكود غير صحيح"),
      }
    );
  };

  const handleResend = () => {
    forgetPasswordMutation.mutate(
      { email }, 
      {
        onSuccess: () => setMessage("تم إرسال الكود مرة أخرى بنجاح"),
        onError: () => setError("حدث خطأ أثناء إرسال الكود"),
      }
    );
  };

  const isDisabled = code.length < 5 || verifyCodeMutation.isPending;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-[90%] md:w-[80%] lg:w-[50%] flex flex-wrap gap-2 bg-white p-6 rounded-xl shadow-xl">

        <div className="w-full order-2 lg:order-1 md:w-[48%] flex flex-col gap-4">

          <h1 className="text-3xl font-bold text-black">
            خد<span className="text-[#d75b19]">ما</span>تك
          </h1>
          <h3 className="text-xl font-semibold">تحقق من الكود</h3>
          <p className="text-xs text-gray-500">
            من فضلك ادخل الكود الذي أرسل علي بريدك الالكتروني
          </p>

          <div className="flex flex-col gap-4">

            <div className="flex flex-col gap-2">
              <OTPInput
                maxLength={5}
                value={code}
                onChange={(val) => {
                  setCode(val);
                  setError("");
                  setMessage("");
                }}
                render={({ slots }) => (
                  <div className="flex justify-center gap-1" dir="ltr">
                    {slots.map((slot, idx) => (
                      <div
                        key={idx}
                        className={`w-10 h-12 flex items-center justify-center border-2 rounded-lg text-lg font-semibold transition
                          ${slot.isActive
                            ? "border-gray-500 "
                            : error
                            ? "border-red-400"
                            : "border-gray-300"
                          }`}
                      >
                        {slot.char ?? <span className="text-gray-300">-</span>}
                      </div>
                    ))}
                  </div>
                )}
              />
              {error && <p className="text-xs text-red-500 text-center">{error}</p>}
              {message && <p className="text-xs text-green-600 text-center">{message}</p>}
            </div>

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
                onClick={handleResend}
                className="text-[#d75b19] hover:underline"
              >
                اعاده ارسال الكود
              </button>
            </p>

          </div>
        </div>

        <div className="relative w-full order-1 md:order-2 md:w-[48%]">
          <img src="/clientLogin.png" className="rounded-lg min-h-[400px] object-cover" />
        </div>

      </div>
    </main>
  );
}