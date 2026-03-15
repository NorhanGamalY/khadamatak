import React, { useState } from "react";
import InputField from "./components/InputField";
import { useNavigate } from "react-router-dom";
import { useResetPassword } from "../../features/auth/password/hooks";
import Toast from "../../components/common/Toast";

export default function ResetPassword() {
  const navigate = useNavigate();
  const resetPasswordMutation = useResetPassword();
  const [serverError, setServerError] = useState("");
  const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [toastData, setToastData] = useState({ isOpen: false, type: "success", title: "", message: "" });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = () => {
    if (!form.newPassword) {
      setErrors({ newPassword: "ادخل كلمة المرور الجديدة" });
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setErrors({ confirmPassword: "كلمة المرور غير متطابقة" });
      return;
    }

    resetPasswordMutation.mutate(
      { newPassword: form.newPassword },
      {
        onSuccess: () => {
          setToastData({
            isOpen: true,
            type: "success",
            title: "تمت العملية بنجاح",
            message: "تم تعيين كلمة المرور بنجاح!"
          });

          setTimeout(() => {
            setToastData({ ...toastData, isOpen: false });
            navigate("/login");
          }, 1500);
        },
        onError: (error) => {
  const data = error?.response?.data;

  let message = "حدث خطأ حاول مرة أخرى";

  if (typeof data === "string") {
    message = data;
  } 
  else if (Array.isArray(data?.errors)) {
    message = data.errors.join(", ");
  } 
  else if (data?.message) {
    message = data.message;
  }

  setServerError(message);
}
      }
    );
  };

  const isDisabled = resetPasswordMutation.isPending || !form.newPassword || !form.confirmPassword;

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-[80%] md:w-[80%] lg:w-[50%] flex flex-wrap gap-0 md:gap-2 bg-white p-6 shadow-2xl">
        <div className="w-[100%] order-2 lg:order-1 md:w-[48%] flex flex-col gap-4">
                    <button onClick={() => navigate("/")} className="text-3xl font-bold text-black text-start">
                        خد<span className="text-[#d75b19]">ما</span>تك
                    </button>
          <p className="text-s text-gray-500">ادخل كلمة السر الجديدة لتحديث حسابك.</p>

          <div className="flex flex-col gap-4 items-center text-white">
            <InputField
              inputType="password"
              title="كلمة المرور الجديدة"
              id="newPassword"
              fieldPlaceholder="ادخل كلمة السر الجديدة.."
              value={form.newPassword}
              onChange={(e) => handleChange("newPassword", e.target.value)}
              error={errors.newPassword}
            />

            <InputField
              inputType="password"
              title="تأكيد كلمة المرور"
              id="confirmPassword"
              fieldPlaceholder="أعد إدخال كلمة السر.."
              value={form.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              error={errors.confirmPassword}
            />

            <button
              onClick={onSubmit}
              disabled={isDisabled}
              className={`text-md text-center w-[90%] px-4 py-2 rounded-lg
                ${isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-[#1e1855]"}`}
            >
              {resetPasswordMutation.isPending ? "جاري إعادة تعيين كلمة المرور..." : "إعادة تعيين كلمة المرور"}
            </button>
          </div>
          {serverError && (
  <p className="text-red-600 text-xs w-full text-center">{serverError}</p>
)}
        </div>

        <div className="relative w-[100%] order-1 md:order-2 md:w-[48%]">
          <img src="/reset.png" className="rounded-lg min-h-[400px]" />
          <div className="absolute bottom-5 w-[92%] left-[4%]">
            <div className="bg-white/70 rounded-lg text-center text-[#1e1855] p-6 pb-8 z-50 min-h-[36%]">
              <p className="text-[14px] text-center font-semibold">خبرة تقدر تعتمد عليها</p>
              <span className="text-[11px] text-center pb-8">
                    بنختار حرفيين بخبرة حقيقية علشان نضمنلك خدمة تريحك.
              </span>
            </div>
          </div>
        </div>
      </div>

      <Toast
        isOpen={toastData.isOpen}
        type={toastData.type}
        title={toastData.title}
        message={toastData.message}
        onClose={() => setToastData({ ...toastData, isOpen: false })}
      />
    </main>
  );
}