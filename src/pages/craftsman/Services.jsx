import { useEffect, useState } from "react";
import { useSearch } from "../../context/searchContext";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { BiSolidEditAlt } from "react-icons/bi";
import { AnimatePresence } from "framer-motion";
import AddService from "../../components/craftsman/AddService";
import EditService from "../../components/craftsman/EditService";
import { getId, getToken } from "../../features/auth/authHelpers";
import axios from "axios";
import { toast } from "react-toastify";

export default function CraftsmanServices() {
  const { search } = useSearch();
  const token = getToken();
  const id = getId();
  const [isOpen, setIsOpen] = useState(false);
  const [isAddServiceModelOpen, setIsAddServiceModelOpen] = useState(false);
  const [isEditModelOpen, setIsEditModelOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [craftsmanService, setCraftsmanService] = useState({ items: [] });
  const [serviceCategories, setServiceCategories] = useState([]);
  const [serviceData, setServiceData] = useState({});
  const [editServiceData, setEditServiceData] = useState({});
  const [pagination, setPagination] = useState({
    current: 1,
    total: 0,
    pageNumber: 0,
  });
  const [selectedCategory, setSelectedCategory] = useState({
    id: null,
    name: "",
  });

  const [selectedService, setSelectedService] = useState(null);

  const handleGetCraftsman = async () => {
    try {
      const res = await axios.get(
        `https://herafie.runasp.net/api/Services/craftsman/${id}?pageNumber=${pagination.current}&pageSize=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const itemsList = res.data.items;
      setCraftsmanService(itemsList);
      setFilteredData(itemsList);
      setPagination((prev) => ({
        ...prev,
        total: res.data.totalCount,
        pageNumber: res.data.pageNumber,
        pageSize: res.data.pageSize,
      }));
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddService = async (service) => {
    try {
      const payload = {
        craftsmanId: id,
        description: service.description,
        name: service.name,
        price: Number(service.price),
        ServiceCategoryId: selectedCategory.id,
        serviceCategoryName: selectedCategory.name,
      };
      const res = await axios.post(
        "https://herafie.runasp.net/api/Services",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (res.status === 200) {
        await handleGetCraftsman();
        setServiceData({});
        setSelectedCategory({ id: null, name: "" });
        toast.success("تمت الاضافة بنجاح");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditService = (updatedService) => {
    setFilteredData((prev) =>
      prev.map((s) =>
        s.id === selectedService.id ? { ...s, ...updatedService } : s,
      ),
    );
    setIsEditModelOpen(false);
  };

  const handleDelete = (idx) => {
    setFilteredData((prev) => prev.filter((s) => s.id !== idx));
  };

  useEffect(() => {
    async function GetAllCategories() {
      try {
        await axios
          .get("https://herafie.runasp.net/api/ServiceCategory")
          .then((res) => setServiceCategories(res.data));
      } catch (error) {
        console.log(error);
      }
    }
    GetAllCategories();
  }, []);

  useEffect(() => {
    if (craftsmanService?.items) {
      const filtered = craftsmanService?.items.filter((s) =>
        (s.name + " " + s.description)
          .toLowerCase()
          .includes(search.toLowerCase()),
      );
      setFilteredData(filtered);
    }
  }, [search, craftsmanService]);

  useEffect(() => {
    if (id && token) {
      handleGetCraftsman();
    }
  }, [id, token, pagination.current]);

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
          {filteredData.map((s, idx) => (
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
                      {s.name}
                    </div>
                  </div>
                  <div className="text-[12px] text-[#6b7280] mt-1 leading-relaxed">
                    {s.description}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-secondary">
                  <button
                    className="p-1 cursor-pointer"
                    aria-label="edit"
                    name="تعديل"
                    onClick={() => {
                      setSelectedService(s);
                      setEditServiceData({
                        id: s.id,
                        name: s.name,
                        description: s.description,
                        price: s.price,
                        serviceCategoryName: s.serviceCategoryName,
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
                    name="حذف"
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
        <div>
          <Pagination
            current={pagination.current}
            onChange={(page) => setPagination((p) => ({ ...p, current: page }))}
            total={pagination.total}
          />
        </div>
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
            serviceCategories={serviceCategories}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

const Pagination = ({ current, total, onChange }) => {
  const totalPages = Math.ceil(total / 10);
  if (total <= 1) return null;
  return (
    <div className="w-fit m-auto rounded px-10 flex items-center gap-1 justify-center lg:mt-12 mt-6 border border-slate-100 bg-white py-2">
      {Array.from({ length: totalPages }).map((_, i) => {
        const pageNum = i + 1;
        return (
          <button
            key={i}
            onClick={() => onChange(pageNum)}
            className={`${current === pageNum ? "bg-secondary text-white " : " "} text-secondary border border-slate-200 rounded px-2 text-lg`}
          >
            {pageNum}
          </button>
        );
      })}
    </div>
  );
};
