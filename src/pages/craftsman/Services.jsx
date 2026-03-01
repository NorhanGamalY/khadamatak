import { useEffect, useState } from "react";
import { useSearch } from "../../context/searchContext";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { BiSolidEditAlt } from "react-icons/bi";
import { AnimatePresence } from "framer-motion";
import AddService from "../../components/craftsman/AddService";
import EditService from "../../components/craftsman/EditService";

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
    <div dir="rtl" className="min-h-screen bg-main text-primary relative">
      <main className="mx-auto max-w-7xl lg:px-8 px-4 py-6 lg:py-8">
        <div className="flex items-start justify-between gap-4 lg:mb-8 mb-4 bg-white py-4 rounded px-2">
          <div className="text-right">
            <h2 className="lg:text-3xl text-2xl font-extrabold ">
              قائمة الخدمات
            </h2>
            <p className="lg:text-lg text-[#6b7280] mt-1 text-sm">
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
                className="bg-white rounded-xl shadow-[0_6px_16px_rgba(17,24,39,0.08)] px-4 border border-lightGray py-4"
              >
                <div className="flex justify-between items-start">
                  <div className="text-right">
                    <div className="flex items-center gap-4">
                      <div className="bg-[#E9E8EE] text-secondary w-8 h-8 flex items-center justify-center rounded text-2xl">
                        <MdOutlineMiscellaneousServices className="-rotate-90" />
                      </div>

                      <div className="text-[14px] font-extrabold text-primary">
                        {s.title}
                      </div>
                    </div>
                    <div className="text-[12px] text-[#6b7280] mt-1 leading-relaxed">
                      {s.desc}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-secondary">
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
      </main>
      <AnimatePresence initial={false}>
        {isEditModelOpen && (
          <EditService
            setIsEditModelOpen={setIsEditModelOpen}
            isEditModelOpen={isEditModelOpen}
            handleEditService={handleEditService}
            editServiceData={editServiceData}
            setEditServiceData={setEditServiceData}
          />
        )}

        {isAddServiceModelOpen && (
          <AddService
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
