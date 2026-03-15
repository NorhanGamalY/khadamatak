import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./components/InputField";
import { validateCraftsmanStep1 } from "../../features/auth/validation";

export default function CraftsmanRegestier() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    const handleNext = () => {
        const validationErrors = validateCraftsmanStep1(form);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        navigate("/craftsman-register-2", { state: form });
    };

    const isDisabled = !form.fullName || !form.email || !form.password;

    return (
        <main className="min-h-screen flex items-center justify-center">
            <div className="w-[80%] md:w-[80%] lg:w-[50%] flex flex-wrap gap-5 bg-white p-6 shadow-2xl">
                <div className="w-full md:w-[48%] flex flex-col gap-5">
                    <button onClick={() => navigate("/")} className="text-3xl font-bold text-black text-start">
                        خد<span className="text-[#d75b19]">ما</span>تك
                    </button>

                    <h3>تسجيل حرفي</h3>
                    <p className="text-xs text-gray-500">
                        انضم إلينا وابدأ في تقديم خدماتك والوصول إلى عدد أكبر من العملاء.
                    </p>

                    <div className="flex flex-col gap-4 items-center">
                        <InputField
                            inputType="text"
                            title="الاسم بالكامل"
                            id="fullName"
                            fieldPlaceholder="ادخل الاسم.."
                            value={form.fullName}
                            onChange={(e) => handleChange("fullName", e.target.value)}
                            error={errors.fullName}
                        />

                        <InputField
                            inputType="email"
                            title="البريد الالكتروني"
                            id="email"
                            fieldPlaceholder="ادخل البريد الالكتروني.."
                            value={form.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            error={errors.email}
                        />

                        <InputField
                            inputType="password"
                            title="كلمة السر"
                            id="password"
                            fieldPlaceholder="ادخل كلمة السر.."
                            value={form.password}
                            onChange={(e) => handleChange("password", e.target.value)}
                            error={errors.password}
                        />

                        <button
                            disabled={isDisabled}
                            className={`text-md text-center w-[90%] px-4 py-2 rounded-lg
                ${isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-[#1e1855] text-white"}
                `}
                            onClick={handleNext}
                        >
                            متابعة
                        </button>

                        <p className="text-xs text-gray-500">
                            عندك حساب؟{" "}
                            <button
                                onClick={() => navigate("/login")}
                                className="text-[#d75b19]"
                            >
                                سجل دخول
                            </button>
                        </p>
                    </div>
                </div>

                <div className="w-full md:w-[48%]">
                    <img
                        src="/craftsmanRegestier1.png"
                        className="rounded-lg min-h-[400px]"
                    />
                </div>
            </div>
        </main>
    );
}