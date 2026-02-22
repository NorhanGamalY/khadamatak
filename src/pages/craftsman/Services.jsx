import { useEffect, useState } from "react";
import { useSearch } from "../../context/searchContext";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { BiSolidEditAlt } from "react-icons/bi";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { CgClose } from "react-icons/cg";
import { PiMoneyWavyLight } from "react-icons/pi";
import { FaFileLines } from "react-icons/fa6";
const services = [
  {
    id: 1,
    title: "تركيب سخان كهربائي",
    desc: "فك القديم وتركيب الجديد مع فحص الكهرباء.",
    price: "500 ج.م",
  },
  {
    id: 2,
    title: "تأسيس سباكة الحمام",
    desc: "تمديد المواسير وتركيب المحابس (بدون تكسير).",
    price: "500 ج.م",
  },
  {
    id: 3,
    title: "صيانة مكيف سبليت",
    desc: "غسيل الوحدة الداخلية والخارجية وفحص الفريون.",
    price: "500 ج.م",
  },
];

export default function CraftsmanServices() {
  const { search } = useSearch();

  const [filteredData, setFilteredData] = useState([]);
  const [isEditModelOpen, setIsEditModelOpen] = useState(false);
  const [isAddServiceModelOpen, setIsAddServiceModelOpen] = useState(false);
  const [serviceData, setServiceData] = useState({
    title: "",
    desc: "",
    price: "",
  });
  const [editServiceData, setEditServiceData] = useState({
    title: "",
    desc: "",
    price: "",
  });

  const [selectedService, setSelectedService] = useState(null);

  const filtered = services.filter((s) =>
    (s.title + " " + s.desc).toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = (idx) => {
    setFilteredData((prev) => prev.filter((s) => s.id !== idx));
  };

  const handleAddService = (service) => {
    const newService = {
      id: Date.now(),
      ...service,
    };
    setServiceData({
      title: service.title,
      desc: service.desc,
      price: service.price,
    });
    setFilteredData((prev) => [newService, ...prev]);
    setServiceData({
      title: "",
      desc: "",
      price: "",
    });
    setIsAddServiceModelOpen(false);
  };

  const handleEditService = (updatedService) => {
    setFilteredData((prev) =>
      prev.map((s) =>
        s.id === selectedService.id ? { ...s, ...updatedService } : s,
      ),
    );
    setIsEditModelOpen(false);
  };

  useEffect(() => {
    setFilteredData(filtered);
  }, [search]);

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#ECECF2] text-[#111827] relative"
    >
      <main className="mx-auto max-w-7xl px-3 sm:px-4 py-6">
        <div className="bg-[#EFEFF4] rounded-2xl p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4 mb-4 bg-white py-4 rounded px-2">
            <div className="text-right">
              <h2 className="text-[20px] font-extrabold text-[#111827]">
                قائمة الخدمات
              </h2>
              <p className="text-[12px] text-[#6b7280] mt-1">
                يمكنك إضافة وتعديل الخدمات التي تظهر لعملائك في التطبيق.
              </p>
            </div>
            <button
              onClick={() => setIsAddServiceModelOpen(!isAddServiceModelOpen)}
              className="lg:h-10 px-4 rounded-lg bg-[#0B0F2A] text-white font-bold text-[13px] inline-flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <span className="lg:text-[18px] leading-none">+</span>
              إضافة خدمة جديدة
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredData.length > 0 &&
              filteredData.map((s, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-[0_6px_16px_rgba(17,24,39,0.08)] px-4 py-3 border border-[#ECECF2] py-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="text-right">
                      <div className="flex items-center gap-4">
                        <div className="bg-[#E9E8EE] text-[#1E1855] w-8 h-8 flex items-center justify-center rounded text-2xl">
                          <MdOutlineMiscellaneousServices className="-rotate-90" />
                        </div>

                        <div className="text-[14px] font-extrabold text-[#111827]">
                          {s.title}
                        </div>
                      </div>
                      <div className="text-[12px] text-[#6b7280] mt-1 leading-relaxed">
                        {s.desc}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[#1E1855]">
                      <button
                        className="p-1 cursor-pointer"
                        aria-label="edit"
                        title="تعديل"
                        onClick={() => {
                          setSelectedService(s);
                          setEditServiceData({
                            title: s.title,
                            desc: s.desc,
                            price: s.price,
                          });
                          setIsEditModelOpen(!isEditModelOpen);
                        }}
                      >
                        <BiSolidEditAlt className="text-xl" />
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="p-1 cursor-pointer"
                        aria-label="delete"
                        title="حذف"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-[12px] font-extrabold text-[#D75B19]">
                      {s.price}
                    </div>
                    <div className="text-[11px] text-[#6b7280]">سعر الخدمة</div>
                  </div>
                </div>
              ))}
          </div>

          {filteredData.length === 0 && (
            <div className="text-center text-[13px] text-[#6b7280] py-10">
              لا توجد نتائج مطابقة.
            </div>
          )}
        </div>
      </main>
      <AnimatePresence initial={false}>
        {isEditModelOpen && (
          <EditModel
            setIsEditModelOpen={setIsEditModelOpen}
            isEditModelOpen={isEditModelOpen}
            handleEditService={handleEditService}
            editServiceData={editServiceData}
            setEditServiceData={setEditServiceData}
          />
        )}
      </AnimatePresence>
      <AnimatePresence initial={false}>
        {isAddServiceModelOpen && (
          <AddNewService
            setIsAddServiceModelOpen={setIsAddServiceModelOpen}
            isAddServiceModelOpen={isAddServiceModelOpen}
            serviceData={serviceData}
            setServiceData={setServiceData}
            handleAddService={handleAddService}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

const EditModel = ({
  setIsEditModelOpen,
  handleEditService,
  editServiceData,
  setEditServiceData,
}) => {
  return (
    <motion.div
      className="absolute inset-0 bg-black/50 flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 40 }}
        transition={{ duration: 0.25 }}
        className="bg-[#f3f3f7] lg:w-1/2 w-11/12 h-fit mt-6 rounded mx-auto lg:p-6 py-4 p-3 shadow-xl relative"
      >
        <button
          className="absolute lg:left-5 left-3 lg:top-7 top-5 cursor-pointer"
          onClick={() => setIsEditModelOpen(false)}
        >
          <CgClose />
        </button>
        <form
          action=""
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleEditService(editServiceData);
          }}
        >
          <h1 className="lg:text-3xl text-2xl text-[#1E1855] font-semibold">
            تعديل الخدمة
          </h1>

          <div className="grid gap-2">
            <label htmlFor="title">اسم الخدمة </label>
            <div className="flex items-center gap-2 border border-[#BABABA] py-2 px-2 rounded mt-1 bg-white placeholder:text-[#A3A3A3]">
              <MdOutlineMiscellaneousServices className="-rotate-90 text-lg text-[#A3A3A3] " />
              <input
                type="text"
                placeholder="صيانة عامة"
                value={editServiceData.title}
                onChange={(e) =>
                  setEditServiceData({
                    ...editServiceData,
                    title: e.target.value,
                  })
                }
                className="w-full"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <label htmlFor="title">سعر الخدمة </label>
            <div className="flex items-center gap-2 border border-[#BABABA] py-2 px-2 rounded mt-1 bg-white placeholder:text-[#A3A3A3]">
              <PiMoneyWavyLight className="text-lg text-[#A3A3A3]" />
              <input
                type="text"
                placeholder="500ج.م"
                value={editServiceData.price}
                onChange={(e) =>
                  setEditServiceData({
                    ...editServiceData,
                    price: e.target.value,
                  })
                }
                className="w-full"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <label htmlFor="title">وصف الخدمة </label>
            <div className="flex gap-2 border border-[#BABABA] py-2 px-2 rounded mt-1 bg-white placeholder:text-[#A3A3A3]">
              <FaFileLines className="text-lg text-[#A3A3A3]" />
              <textarea
                rows={4}
                placeholder="اكتب وصفا مختصرا للخدمة"
                className="w-full"
                value={editServiceData.desc}
                onChange={(e) =>
                  setEditServiceData({
                    ...editServiceData,
                    desc: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="flex gap-3 m-auto">
            <button
              type="submit"
              className="bg-[#1E1855] text-white px-4 py-2 rounded cursor-pointer"
            >
              save changes
            </button>
            <button
              className="bg-[#D75B19] text-white px-4 py-2 rounded cursor-pointer"
              onClick={() => setIsEditModelOpen(false)}
            >
              cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

const AddNewService = ({
  serviceData,
  setServiceData,
  handleAddService,
  setIsAddServiceModelOpen,
}) => {
  return (
    <motion.div
      className="absolute inset-0 bg-black/50 flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 40 }}
        transition={{ duration: 0.25 }}
        className="bg-[#f3f3f7] lg:w-1/2 w-11/12 h-fit mt-6 rounded mx-auto lg:p-6 py-4 p-3 shadow-xl relative"
      >
        <button
          className="absolute lg:left-5 left-3 lg:top-7 top-5 cursor-pointer"
          onClick={() => setIsAddServiceModelOpen(false)}
        >
          <CgClose />
        </button>
        <form
          action=""
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddService(serviceData);
          }}
        >
          <h1 className="lg:text-3xl text-2xl text-[#1E1855] font-semibold">
            إضافة خدمة جديدة
          </h1>

          <div className="grid gap-2">
            <label htmlFor="title">اسم الخدمة </label>
            <div className="flex items-center gap-2 border border-[#BABABA] py-2 px-2 rounded mt-1 bg-white placeholder:text-[#A3A3A3]">
              <MdOutlineMiscellaneousServices className="-rotate-90 text-lg text-[#A3A3A3] " />
              <input
                type="text"
                placeholder="صيانة عامة"
                value={serviceData.title || ""}
                onChange={(e) =>
                  setServiceData({ ...serviceData, title: e.target.value })
                }
                className="w-full"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <label htmlFor="title">سعر الخدمة </label>
            <div className="flex items-center gap-2 border border-[#BABABA] py-2 px-2 rounded mt-1 bg-white placeholder:text-[#A3A3A3]">
              <PiMoneyWavyLight className="text-lg text-[#A3A3A3]" />
              <input
                type="text"
                placeholder="500ج.م"
                value={serviceData.price || ""}
                onChange={(e) =>
                  setServiceData({ ...serviceData, price: e.target.value })
                }
                className="w-full"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <label htmlFor="title">وصف الخدمة </label>
            <div className="flex gap-2 border border-[#BABABA] py-2 px-2 rounded mt-1 bg-white placeholder:text-[#A3A3A3]">
              <FaFileLines className="text-lg text-[#A3A3A3]" />
              <textarea
                rows={4}
                placeholder="اكتب وصفا مختصرا للخدمة"
                className="w-full"
                value={serviceData.desc || ""}
                onChange={(e) =>
                  setServiceData({ ...serviceData, desc: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-[#1E1855] w-full text-white px-4 py-2 rounded cursor-pointer"
            >
              حفظ الخدمة
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};
