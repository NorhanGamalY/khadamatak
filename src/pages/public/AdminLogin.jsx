import React, { useState } from "react";
import InputField from "./components/InputField";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../features/auth/mutations";
import { validateLogin } from "../../features/auth/validation";
import { saveToken } from "../../features/auth/authHelpers";

export default function AdminLogin() {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: true,
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setServerError("");
  };

  const onSubmit = () => {
    const v = validateLogin(form);
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    loginMutation.mutate(
      { email: form.email, password: form.password },
      {
        onSuccess: (data) => {
          const token = data?.token;
          if (!token) { setServerError("حصل خطأ، حاول تاني"); return; }

          saveToken(token, form.rememberMe);
          navigate("/admin", { replace: true }); // ✅ Admin دايماً يروح /admin
        },
        onError: (err) => {
          const msg =
            err?.response?.data?.message ||
            err?.response?.data?.error ||
            "بيانات الدخول غير صحيحة";
          setServerError(msg);
        },
      }
    );
  };

  const isDisabled = loginMutation.isPending || !form.email || !form.password;

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
      <div className="w-[90%] md:w-[450px] bg-white p-8 shadow-2xl rounded-xl flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-black">
            خد<span className="text-[#d75b19]">ما</span>تك
          </h1>
          <h3 className="text-lg font-semibold text-[#1e1855]">لوحة التحكم</h3>
          <p className="text-xs text-gray-500">تسجيل دخول المسؤول</p>
        </div>

        <div className="flex flex-col gap-4">
          <InputField inputType="email" title="البريد الالكتروني" id="email"
            fieldPlaceholder="ادخل البريد الالكتروني.." value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            error={errors.email} disabled={loginMutation.isPending} />

          <InputField inputType="password" title="كلمة السر" id="password"
            fieldPlaceholder="ادخل كلمة السر.." value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            error={errors.password} disabled={loginMutation.isPending} />

          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-5 h-5 accent-indigo-600"
              checked={form.rememberMe}
              onChange={(e) => handleChange("rememberMe", e.target.checked)}
              disabled={loginMutation.isPending} />
            <span className="text-xs text-gray-500">تذكرني دائما</span>
          </div>

          {serverError && <p className="text-red-600 text-xs w-full">{serverError}</p>}

          <button onClick={onSubmit} disabled={isDisabled}
            className={`text-md text-center w-full px-4 py-2 rounded-lg text-white
              ${isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-[#1e1855] hover:bg-[#d75b19] transition"}`}>
            {loginMutation.isPending ? "جاري تسجيل الدخول..." : "دخول"}
          </button>
        </div>
      </div>
    </main>
  );
}