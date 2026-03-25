import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InputField from "./components/InputField";
import SelectField from "./components/SelectField";
import { AREA } from "../../features/area/area";
import { useRegisterCraftsman } from "../../features/auth/mutations";
import { validateCraftsmanStep2 } from "../../features/auth/validation";

    export default function CraftsmanRegister2() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const registerMutation = useRegisterCraftsman();

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

    useEffect(() => {
        if (!state) navigate("/craftsman-register", { replace: true });
    }, [state]);

    if (!state) return null;

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const handleBlur = (field) => {
        const v = validateCraftsmanStep2({ ...form });
        if (v[field]) {
        setErrors((prev) => ({ ...prev, [field]: v[field] }));
        }
    };

    const isDisabled =
        !form.areaId ||
        form.yearsOfExperience === "" ||
        !form.agreeTerms ||
        registerMutation.isPending;

    const onSubmit = () => {
        const validationErrors = validateCraftsmanStep2(form);
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
            navigate("/login", {
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
            <button onClick={() => navigate("/")} className="text-3xl font-bold text-black text-start">
                خد<span className="text-[#d75b19]">ما</span>تك
            </button>
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
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                onBlur={() => handleBlur("phoneNumber")}
                error={errors.phoneNumber}
                disabled={registerMutation.isPending}
                />

                <SelectField
                title="المنطقة"
                id="areaId"
                value={form.areaId}
                onChange={(e) => handleChange("areaId", e.target.value)}
                onBlur={() => handleBlur("areaId")}
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
                onChange={(e) => handleChange("yearsOfExperience", e.target.value)}
                onBlur={() => handleBlur("yearsOfExperience")}
                error={errors.yearsOfExperience}
                disabled={registerMutation.isPending}
                />

                <span className="flex items-center w-full gap-2">
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
                <p className="text-red-500 text-xs w-full">{errors.agreeTerms}</p>
                )}

                {submitError && (
                <p className="text-red-500 text-sm w-full text-center">{submitError}</p>
                )}

                <div className="flex gap-2 w-[90%]">
                <button
                    onClick={() =>
                    navigate("/craftsman-register", {
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
                    disabled={isDisabled}
                    className={`text-md text-center w-1/2 px-4 py-2 rounded-lg
                    ${isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-[#1e1855] text-white"}
                    `}
                    onClick={onSubmit}
                >
                    {registerMutation.isPending ? "جاري التسجيل..." : "تسجيل"}
                </button>
                </div>
            </div>
            </div>

            <div className="relative w-full md:w-[48%]">
            <img src="/craftsmanRegister2.png" className="rounded-lg min-h-[400px]" />
            </div>
        </div>
        </main>
    );
    }