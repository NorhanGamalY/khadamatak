import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLogin } from "../../features/auth/mutations";
import { validateLogin } from "../../features/auth/validation";
import { saveToken } from "../../features/auth/authHelpers";
import InputField from "./components/InputField";

export default function CraftsmanLogin() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const loginMutation = useLogin();

  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: true,
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const isDisabled = loginMutation.isPending || !form.email || !form.password;

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    setServerError("");
  };

  const onSubmit = () => {
    const validationErrors = validateLogin(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    loginMutation.mutate(
      { email: form.email, password: form.password },
      {
        onSuccess: (data) => {
          const token = data?.token;
          if (!token) { setServerError("حصل خطأ، حاول تاني"); return; }

          saveToken(token, form.rememberMe);
          navigate("/craftsman", { replace: true }); // ✅ Craftsman دايماً يروح /craftsman
        },
        onError: (err) => {
          const msg =
            err?.response?.data?.message ||
            err?.response?.data?.title ||
            "البريد الإلكتروني أو كلمة السر غلط";
          setServerError(msg);
        },
      }
    );
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-[80%] md:w-[80%] lg:w-[50%] flex flex-wrap gap-0 md:gap-2 bg-white p-6 shadow-2xl">
        <div className="w-[100%] order-2 lg:order-1 md:w-[48%] flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-black">
            خد<span className="text-[#d75b19]">ما</span>تك
          </h1>
          <h3>تسجيل الدخول</h3>
          <p className="text-s text-gray-500">أهلاً بيك مرة ثانية 👋</p>
          <p className="text-xs text-gray-500">سجّل دخولك وأعرض خدمتك بكل سهولة.</p>

          {/* ✅ pending message بعد التسجيل */}
          {state?.pendingMessage && (
            <p className="text-green-600 text-xs w-full bg-green-50 p-2 rounded-lg">
              {state.pendingMessage}
            </p>
          )}

          <div className="flex flex-col gap-4 items-center text-white">
            <InputField inputType="email" title="البريد الالكتروني" id="email"
              fieldPlaceholder="ادخل البريد الالكتروني.." value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              error={errors.email} disabled={loginMutation.isPending} />

            <InputField inputType="password" title="كلمة السر" id="password"
              fieldPlaceholder="ادخل كلمة السر.." value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              error={errors.password} disabled={loginMutation.isPending} />

            <div className="flex items-center justify-start w-full gap-2">
              <input type="checkbox" className="w-5 h-5 accent-indigo-600"
                checked={form.rememberMe}
                onChange={(e) => handleChange("rememberMe", e.target.checked)}
                disabled={loginMutation.isPending} />
              <span className="text-xs text-gray-500">تذكرني دائما</span>
            </div>

            {serverError && <p className="text-red-600 text-xs w-full">{serverError}</p>}

            <button onClick={onSubmit} disabled={isDisabled}
              className={`text-md text-center w-[90%] px-4 py-2 rounded-lg
                ${isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-[#1e1855]"}`}>
              {loginMutation.isPending ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </button>

            <p className="text-xs text-gray-500">
              ليس لديك حساب؟{" "}
              <button onClick={() => navigate("/craftsman-register")} className="text-[#d75b19]">
                سجل الآن
              </button>
            </p>
          </div>
        </div>

        <div className="relative w-[100%] order-1 md:order-2 md:w-[48%]">
          <img src="/clientLogin.png" className="rounded-lg min-h-[400px]" />
          <div className="absolute bottom-5 w-[92%] left-[4%]">
            <div className="bg-white/70 rounded-lg text-center text-[#1e1855] p-6 pb-8 z-50 min-h-[36%]">
              <p className="text-[14px] text-center font-semibold">خدمة سريعة وموثوقة</p>
              <span className="text-[11px] text-center pb-8">
                تواصل مباشر، أسعار واضحة، وتجربة مريحة من أول خطوة لآخرها.
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}