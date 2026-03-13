import React from 'react';
import { BadgeCheck, CircleOff } from 'lucide-react';

const Toast = ({ isOpen, type = 'success', title, message, onClose, actionLabel = 'OK' }) => {
    if (!isOpen) return null;

    const isSuccess = type === 'success';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all scale-100 animate-in zoom-in-95 duration-300">
                <div className={`p-6 text-center ${isSuccess ? 'bg-[#E0F2F1]' : 'bg-red-50'}`}>
                    <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-sm ${isSuccess ? 'bg-white text-[]' : 'bg-white text-red-500'}`}>
                        {isSuccess ?
                            <BadgeCheck className="w-10 h-10"/> :
                            <CircleOff className="w-10 h-10" />
                        }
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${isSuccess ? 'text-[#1E0290]' : 'text-red-700'}`}>
                        {title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        {message}
                    </p>
                </div>
                <div className="p-4 bg-white border-t border-gray-100">
                    <button
                        onClick={onClose}
                        className={`w-full py-3 rounded-xl font-bold text-white shadow-lg transform transition-all hover:-translate-y-0.5 active:scale-95 duration-200
                            ${isSuccess
                                ? 'bg-[#1E1855] hover:bg-[##1E1080] shadow-[#1E1855]/20'
                                : 'bg-red-500 hover:bg-red-600 shadow-red-500/20'
                            }
                        `}
                    >
                        {actionLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Toast;