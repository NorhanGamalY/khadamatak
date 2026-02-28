import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MapPin, Edit3, Menu, Search } from "lucide-react";
import profileImg from "../../assets/profile img.svg";


export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);


  const [profile, setProfile] = useState({
    name: "احمد لطفي",
    phone: "0541234567",
    city: "القاهرة",
    image: profileImg,
    services: [
      "تركيب مطابخ",
      "تصنيع الابواب",
      "صيانه وتصليح الاخشاب",
      "ديكورات خشبية",
    ],
  });

  const [tempData, setTempData] = useState(profile);

  const handleSave = () => {
    setProfile(tempData);
    setIsEditing(false);
    toast.success("تم حفظ التعديلات بنجاح", {
      position: "bottom-center",
    });
  };

  const handleCancel = () => {
    setTempData(profile);
    setIsEditing(false);
  };



  return (
    <div dir="rtl" className="min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto py-5  px-4"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-0">
            <div className="bg-[#f7f7f7] p-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-right">
              <img
                src={profile.image}
                alt="worker"
                className="w-28 h-28 object-cover rounded-full shadow-md"
              />
              <div className="flex-1 space-y-3">
                <h2 className="text-2xl font-bold text-indigo-900">
                  {profile.name}
                </h2>
                <div className="flex items-center justify-center md:justify-start gap-2 text-indigo-900">
                  <Phone size={18} />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 text-indigo-900">
                  <MapPin size={18} />
                  <span>{profile.city}</span>
                </div>
              </div>
            </div>
            <div className="bg-[#D75B19] text-white text-center py-3 text-lg font-semibold">
              الخدمات
            </div>
            <div className="p-8 space-y-4 text-indigo-900 text-lg">
              {profile.services.map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 shadow-sm"
                >
                  <span>✓</span>
                  <span>{service}</span>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-col md:flex-row gap-4 p-8 pt-0">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-[#171240] cursor-pointer hover:bg-indigo-900 text-white p-3 rounded-2xl w-full flex items-center justify-center gap-2"
              >
                <Edit3 className="mr-2" size={16} /> تعديل البيانات
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4"
            >
              <h3 className="text-xl font-bold text-center text-indigo-900">
                تعديل البيانات
              </h3>

              <input
                className="w-full border rounded-xl p-2"
                value={tempData.name}
                onChange={(e) =>
                  setTempData({ ...tempData, name: e.target.value })
                }
              />
              <input
                className="w-full border rounded-xl p-2"
                value={tempData.phone}
                onChange={(e) =>
                  setTempData({ ...tempData, phone: e.target.value })
                }
              />
              <input
                className="w-full border rounded-xl p-2"
                value={tempData.city}
                onChange={(e) =>
                  setTempData({ ...tempData, city: e.target.value })
                }
              />

              <input
                type="file"
                accept="image/*"
                className="w-full"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setTempData({ ...tempData, image: reader.result });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />

              <div className="space-y-2">
                {tempData.services.map((service, index) => (
                  <input
                    key={index}
                    className="w-full border rounded-xl p-2"
                    value={service}
                    onChange={(e) => {
                      const updated = [...tempData.services];
                      updated[index] = e.target.value;
                      setTempData({ ...tempData, services: updated });
                    }}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() =>
                  setTempData({
                    ...tempData,
                    services: [...tempData.services, ""],
                  })
                }
                className="text-sm text-indigo-900 underline"
              >
                + اضافة خدمة
              </button>

              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="bg-orange-600 hover:bg-orange-500 text-white rounded-xl w-full"
                >
                  حفظ التعديل
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-300 hover:bg-gray-200 text-black rounded-xl w-full"
                >
                  تجاهل
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer />
    </div>
  );
}
