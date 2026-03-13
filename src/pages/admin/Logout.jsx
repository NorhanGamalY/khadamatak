import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();

    const handleConfirmLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const handleCancel = () => {
        navigate("/admin/settings");
    };

    return (
        <div className="flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md text-center">
                <h2 className="text-right text-xl font-bold mb-4">تسجيل الخروج</h2>
                
                <p className="text-gray-500 mb-8 leading-relaxed">
                    إذا قمت بتسجيل الخروج ستفقد كل البيانات الخاصة بالمنصة
                </p>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={handleCancel}
                        className="w-full bg-[#1e1b4b] text-white py-3 rounded-lg font-bold text-[16px] hover:bg-opacity-90 transition-all"
                    >
                        رجوع
                    </button>

                    <button
                        onClick={handleConfirmLogout}
                        className="w-full border border-red-200 text-[#ef4444] py-3 rounded-lg font-bold text-[16px] hover:bg-red-50 transition-all"
                    >
                        تسجيل الخروج
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Logout;