import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InputField from "./components/InputField";
import SelectField from "./components/SelectField";
import { AREA } from "../../features/area/area";
import { useRegisterCraftsman } from "../../features/auth/mutations";
import { validateCraftsmanRegister } from "../../features/auth/validation";

export default function Craftsmanregestier2() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const registerMutation = useRegisterCraftsman();

  // ✅ الـ useState لازم يكون قبل أي return — مش بعده
  const [form, setForm] = useState({
    fullName: state?.fullName || "",
    email: state?.email || "",
    password: state?.password || "",
    phoneNumber: "",
    areaId: "",
    yearsOfExperience: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  // ✅ لو مفيش state روح للخطوة الأولى
  useEffect(() => {
    if (!state) navigate("/craftsman-register", { replace: true });
  }, [state]);

  if (!state) return null;

  const isDisabled =
    !form.areaId ||
    form.yearsOfExperience === "" ||
    !form.agreeTerms ||
    registerMutation.isPending;

  const onSubmit = () => {
    const validationErrors = validateCraftsmanRegister(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitError("");

    const payload = {
      fullName: form.fullName,
      email: form.email,
      password: form.password,
      phoneNumber: form.phoneNumber,
      areaId: Number(form.areaId),
      yearsOfExperience: Number(form.yearsOfExperience),
      agreeTerms: form.agreeTerms,
    };

    registerMutation.mutate(payload, {
      onSuccess: (data) => {
        navigate("/craftsman-login", {
          state: { pendingMessage: data?.message },
        });
      },
      onError: (err) => {
        const msg =
          err?.response?.data?.message ||
          err?.response?.data?.title ||
          "حصل خطأ، حاول تاني";
        setSubmitError(msg);
      },
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-[80%] md:w-[80%] lg:w-[50%] flex flex-wrap bg-white p-6 shadow-2xl">
        <div className="w-full md:w-[48%] flex flex-col gap-5">
          <h1 className="text-3xl font-bold text-black">
            خد<span className="text-[#d75b19]">ما</span>تك
          </h1>

          <h3>تسجيل حرفي</h3>
          <p className="text-xs text-gray-500">
            أنشئ حسابك كحرفي لعرض خدماتك واستقبال طلبات العملاء في منطقتك بسهولة
          </p>

          <div className="flex flex-col gap-4 items-center">
            <InputField
              inputType="tel"
              title="رقم الموبايل"
              id="phoneNumber"
              fieldPlaceholder="مثال: 01012345678"
              value={form.phoneNumber}
              onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
              error={errors.phoneNumber}
              disabled={registerMutation.isPending}
            />

            <SelectField
              title="المنطقة"
              id="areaId"
              value={form.areaId}
              onChange={(e) => setForm({ ...form, areaId: e.target.value })}
              options={AREA}
              placeholder="اختر منطقتك.."
              error={errors.areaId}
              disabled={registerMutation.isPending}
            />

            <InputField
              inputType="number"
              title="سنين الخبرة"
              id="yearsOfExperience"
              fieldPlaceholder="ادخل سنين الخبرة.."
              value={form.yearsOfExperience}
              onChange={(e) =>
                setForm({ ...form, yearsOfExperience: e.target.value })
              }
              error={errors.yearsOfExperience}
              disabled={registerMutation.isPending}
            />

            <span className="flex items-center w-full gap-2">
              <input
                type="checkbox"
                className="w-5 h-5 accent-indigo-600"
                checked={form.agreeTerms}
                onChange={(e) =>
                  setForm({ ...form, agreeTerms: e.target.checked })
                }
                disabled={registerMutation.isPending}
              />
              <span className="text-xs text-gray-500">
                أوافق علي القواعد والخصوصية والأمان
              </span>
            </span>
            {errors.agreeTerms && (
              <p className="text-red-500 text-xs w-full">{errors.agreeTerms}</p>
            )}

            {submitError && (
              <p className="text-red-500 text-sm w-full text-center">{submitError}</p>
            )}

            <button
              disabled={isDisabled}
              className={`text-md text-center w-[90%] px-4 py-2 rounded-lg
                ${isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-[#1e1855] text-white"}
              `}
              onClick={onSubmit}
            >
              {registerMutation.isPending ? "جاري التسجيل..." : "تسجيل"}
            </button>
          </div>
        </div>

        <div className="relative w-full md:w-[48%]">
          <img
            src="/craftsmanRegister2.png"
            className="rounded-lg min-h-[400px]"
          />
        </div>
      </div>
    </main>
  );
}