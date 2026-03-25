import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MapPin, Edit3 } from "lucide-react";
import Avatar from "../../components/common/Avatar";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

export default function Profile() {
  const token = localStorage.getItem("token");
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({ services: [] });
  const [tempData, setTempData] = useState({ services: [{ name: "" }] });
  const [imageFile, setImageFile] = useState(null);
  const { setSearch, setPlaceholder } = useOutletContext();

  const handleCancel = () => {
    setTempData(profile);
    setImageFile(null);
    setIsEditing(false);
  };

  const handleGetData = async () => {
    const res = await axios.get(`https://herafie.runasp.net/api/Craftsmen/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProfile(res.data);
    setTempData(res.data);
  };

  const handleEdit = async () => {
    try {
      const cleanServices = tempData?.services.map((ser) => {
        const obj = {
          name: ser.name,
          description: ser.description,
          price: ser.price,
        };
        if (ser.id && ser.id !== 0) obj.id = ser.id;
        return obj;
      });

      const formData = new FormData();
      formData.append("FullName", tempData.fullName || "");
      formData.append("PhoneNumber", tempData.phoneNumber || "");
      formData.append("Bio", tempData.bio || "");
      formData.append("YearsOfExperience", Number(tempData.yearsOfExperience) || 0);

      if (imageFile) {
        formData.append("ProfilePicture", imageFile);
      }

      cleanServices.forEach((ser, i) => {
        formData.append(`Services[${i}][name]`, ser.name || "");
        formData.append(`Services[${i}][description]`, ser.description || "");
        formData.append(`Services[${i}][price]`, ser.price || 0);
        if (ser.id) formData.append(`Services[${i}][id]`, ser.id);
      });

      const res = await axios.put(
        "https://herafie.runasp.net/api/Craftsmen/me",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200 || res.status === 204) {
        await handleGetData();
        toast.success("تم تعديل بياناتك");
        setIsEditing(false);
        setImageFile(null);
      }
    } catch (error) {
      console.error("تفاصيل الخطأ:", error.response?.data);
      toast.error("حدث خطأ أثناء التعديل");
    }
  };

  useEffect(() => {
    if (token) handleGetData();
  }, [token]);

  useEffect(() => {
    setPlaceholder(" الملف الشخصي ...");
    setSearch("");
  }, []);
  return (
    <>
      <div dir="rtl" className="min-h-screen bg-main">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto py-5 px-4"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-0">
              <div className="bg-white p-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-right">
                <Avatar
                  src={profile.profilePicture || ""}
                  name={profile.fullName}
                  size={80}
                />
                <div className="flex-1 space-y-3">
                  <h2 className="text-2xl font-bold text-indigo-900">
                    {profile.fullName}
                  </h2>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-indigo-900">
                    <Phone size={18} />
                    <span>{profile.phoneNumber}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-indigo-900">
                    <MapPin size={18} />
                    <span>{profile.bio}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#D75B19] text-white text-center py-3 text-lg font-semibold">
                الخدمات
              </div>

              <div className="p-8 space-y-4 text-indigo-900 text-lg">
                {profile?.services?.length > 0 &&
                  profile?.services?.map((service, i) => {
                    if (service.name.length > 0) {
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 shadow-sm"
                        >
                          <span>✓</span>
                          <span>{service.name}</span>
                        </motion.div>
                      );
                    } else {
                      return null;
                    }
                  })}
              </div>

              <div className="flex flex-col md:flex-row gap-4 p-8 pt-0">
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-[#171240] cursor-pointer hover:bg-indigo-900 text-white p-3 rounded-2xl w-full flex items-center justify-center gap-2"
                >
                  <p className="flex items-center justify-center">
                    <Edit3 className="mr-2" size={16} /> تعديل البيانات
                  </p>
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
                  placeholder="اسم الحرفي"
                  value={tempData.fullName || ""}
                  onChange={(e) =>
                    setTempData({ ...tempData, fullName: e.target.value })
                  }
                />
                <input
                  className="w-full border rounded-xl p-2"
                  value={tempData.phoneNumber || ""}
                  onChange={(e) =>
                    setTempData({ ...tempData, phoneNumber: e.target.value })
                  }
                  placeholder="01012345678"
                />
                <input
                  className="w-full border rounded-xl p-2"
                  value={tempData.bio || ""}
                  onChange={(e) =>
                    setTempData({ ...tempData, bio: e.target.value })
                  }
                  placeholder="كهربائي"
                />

                <div className="space-y-1">
                  <label className="text-sm text-gray-600 block">
                    صورة الملف الشخصي
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full text-sm text-gray-500
                      file:ml-3 file:py-2 file:px-4
                      file:rounded-xl file:border-0
                      file:text-sm file:font-semibold
                      file:bg-orange-50 file:text-orange-600
                      hover:file:bg-orange-100 cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) setImageFile(file);
                    }}
                  />
                  {imageFile && (
                    <p className="text-xs text-green-600">
                      ✓ تم اختيار: {imageFile.name}
                    </p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleEdit}
                    className="bg-orange-600 py-2 hover:bg-orange-500 text-white rounded-xl w-full"
                  >
                    حفظ التعديل
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-300 py-2 hover:bg-gray-200 text-black rounded-xl w-full"
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
    </>
  );
}