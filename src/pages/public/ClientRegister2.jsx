import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import InputField from "./components/InputField";
import { useRegisterClient } from "../../features/auth/mutations";
import { validateClientStep2 } from "../../features/auth/validation";
import governorates from "../../utils/governorates";

    export default function ClientRegister2() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const registerMutation = useRegisterClient();

    const [form, setForm] = useState({
        fullName: state?.fullName || "",
        email: state?.email || "",
        password: state?.password || "",
        phoneNumber: "",
        address: "",
        agreeTerms: false,
    });

    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState("");

    useEffect(() => {
        if (!state) navigate("/client-register", { replace: true });
    }, [state]);

    if (!state) return null;

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

    const handleBlur = (key) => {
        const v = validateClientStep2({ ...form });
        if (v[key]) {
        setErrors((prev) => ({ ...prev, [key]: v[key] }));
        }
    };

    const isDisabled =
        registerMutation.isPending || !form.phoneNumber || !form.address || !form.agreeTerms;

    const onSubmit = () => {
        const v = validateClientStep2(form);
        setErrors(v);
        if (Object.keys(v).length > 0) return;

        setSubmitError("");
        registerMutation.mutate(form, {
        onSuccess: () => navigate("/login"),
        onError: (err) => {
            const msg =
            err?.response?.data?.message ||
            err?.response?.data?.error ||
            "حصل خطأ أثناء التسجيل";
            setSubmitError(msg);
        },
        });
    };

    return (
        <main className="min-h-screen flex items-center justify-center">
        <div className="w-[80%] lg:w-[50%] flex flex-wrap gap-0 md:gap-2 bg-white p-6 shadow-2xl">

            <div className="w-[100%] order-2 lg:order-1 md:w-[48%] flex flex-col gap-5">
            <button onClick={() => navigate("/")} className="text-3xl font-bold text-black text-start">
                خد<span className="text-[#d75b19]">ما</span>تك
            </button>
            <h3>إنشاء حساب</h3>
            <p className="text-xs text-gray-500">ادخل بيانات التواصل والموقع</p>

            <div className="flex flex-col gap-4 items-center">
                <InputField
                inputType="tel"
                title="رقم الهاتف"
                id="phoneNumber"
                fieldPlaceholder="مثال: 01012345678"
                value={form.phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                onBlur={() => handleBlur("phoneNumber")}
                error={errors.phoneNumber}
                disabled={registerMutation.isPending}
                />

                <div className="flex flex-col gap-1 w-full">
                <label htmlFor="address" className="text-sm text-gray-700 font-medium">
                    المحافظة
                </label>
                <select
                    id="address"
                    value={form.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    onBlur={() => handleBlur("address")}
                    disabled={registerMutation.isPending}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e1855]"
                >
                    <option value="">اختار المحافظة...</option>
                    {governorates.map((gov) => (
                    <option key={gov.id} value={gov.name}>
                        {gov.name}
                    </option>
                    ))}
                </select>
                {errors.address && (
                    <p className="text-red-600 text-xs">{errors.address}</p>
                )}
                </div>

                <span className="flex items-center justify-start w-full gap-2">
                <input
                    type="checkbox"
                    className="w-5 h-5 accent-indigo-600"
                    checked={form.agreeTerms}
                    onChange={(e) => handleChange("agreeTerms", e.target.checked)}
                    disabled={registerMutation.isPending}
                />
                <span className="text-xs text-gray-500">
                    أوافق علي القواعد والخصوصية والأمان
                </span>
                </span>
                {errors.agreeTerms && (
                <p className="text-red-600 text-xs w-full">{errors.agreeTerms}</p>
                )}
                {submitError && (
                <p className="text-red-500 text-sm w-full text-center">{submitError}</p>
                )}

                <div className="flex gap-2 w-[90%]">
                <button
                    onClick={() =>
                    navigate("/client-register", {
                        state: {
                        fullName: form.fullName,
                        email: form.email,
                        password: form.password,
                        },
                    })
                    }
                    className="border border-[#1e1855] text-[#1e1855] text-md text-center w-1/2 px-4 py-2 rounded-lg"
                >
                    رجوع
                </button>
                <button
                    onClick={onSubmit}
                    disabled={isDisabled}
                    className="bg-[#1e1855] text-white text-md text-center w-1/2 px-4 py-2 rounded-lg disabled:opacity-50"
                >
                    {registerMutation.isPending ? "جاري التسجيل..." : "تسجيل"}
                </button>
                </div>
            </div>
            </div>

            <div className="relative w-[100%] order-1 md:order-2 md:w-[48%]">
            <img src="/clientRegestier.png" className="rounded-lg min-h-[400px]" />
            <div className="absolute bottom-5 w-[92%] left-[4%]">
                <div className="bg-white/70 rounded-lg text-[#1e1855] p-6 pb-8">
                <p className="text-[14px] text-center font-semibold">نوصلك بالحرفي الصح</p>
                <span className="text-[11px] text-center pb-8">
                    أختار نوع الحرفة وحدد طلبك, واحنا نبدأ نجهزلك الحل المناسب
                </span>
                </div>
            </div>
            </div>

        </div>
        </main>
    );
    }