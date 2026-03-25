import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { GiStoneCrafting } from "react-icons/gi";
import axios from "axios";
import { getId, getToken } from "../../features/auth/authHelpers";
import SplashLoader from "../../components/common/SplashLoader";
import { useOutletContext } from "react-router-dom";

const statusMap = {
  0: { label: "جديد", color: "text-blue-600 bg-blue-50 border-blue-200" },
  1: { label: "قيد المراجعة", color: "text-yellow-600 bg-yellow-50 border-yellow-200" },
  2: { label: "مقبول", color: "text-green-600 bg-green-50 border-green-200" },
  3: { label: "مرفوض", color: "text-red-600 bg-red-50 border-red-200" },
};

const ConflictsCraftsman = () => {
  const { setSearch, setPlaceholder } = useOutletContext();

  const token = getToken();
  const id = getId();
  const [clientData, setClientData] = useState([]);
  const [isActive, setIsActive] = useState({
    open: true,
    pending: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const filteredData = clientData.filter((item) =>
    isActive.open ? [0, 1].includes(item.status) : [2, 3].includes(item.status)
  );

  const getAllOrders = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://herafie.runasp.net/api/Complaints/issued-craftsman`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setClientData(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id && token) getAllOrders();
  }, []);

  useEffect(() => {
    setPlaceholder("النزاعات  ...");
    setSearch("");
  }, []);

  return (
    <div dir="rtl" className="min-h-screen bg-main text-primary">
      <main className="mx-auto max-w-7xl lg:px-8 px-4 py-6 lg:py-8">
        <div className="grid lg:gap-8 gap-5">
          <div className="flex items-center justify-center font-bold shadow-[0_6px_16px_rgba(17,24,39,0.08)] bg-white py-4 gap-4 lg:px-12 px-4 rounded m-auto lg:w-8/12">
            <button
              onClick={() => setIsActive({ open: true, pending: false })}
              className={`lg:px-4 lg:py-2 text-sm p-2 ${isActive.open ? "text-white bg-secondary-orange" : "text-secondary bg-slate-200"} rounded`}
            >
              نزاعات مفتوحة
            </button>
            <button
              onClick={() => setIsActive({ open: false, pending: true })}
              className={`lg:px-4 lg:py-2 text-sm p-2 ${isActive.pending ? "text-white bg-secondary-orange" : "text-secondary bg-slate-200"} rounded`}
            >
              نزاعات معلقة
            </button>
          </div>

          <div className="lg:w-8/12 lg:m-auto grid lg:gap-6 gap-3">
            {isLoading ? (
              <div className="flex items-center justify-center">
                <SplashLoader />
              </div>
            ) : (
              <>
                {filteredData.length > 0 ? (
                  filteredData.map((item, idx) => (
                    <ConflictItem data={item} key={idx} />
                  ))
                ) : (
                  <p className="font-extrabold text-xl text-center flex items-center justify-center min-h-[100px] text-secondary-orange">
                    لا توجد نزاعات
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConflictsCraftsman;

const ConflictItem = ({ data }) => {
  const token = getToken();
  const [isOpen, setIsOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  const fetchOrderDetails = async () => {
    if (orderDetails) {
      setIsOpen((prev) => !prev);
      return;
    }
    try {
      setIsLoadingDetails(true);
      const orderId = data.orderId ? data.orderId : data.serviceId;
      const res = await axios.get(
        `https://herafie.runasp.net/api/Orders/${orderId}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setOrderDetails(res.data);
      setIsOpen(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const statusInfo = statusMap[data.status] || {
    label: "غير معروف",
    color: "text-gray-600 bg-gray-50 border-gray-200",
  };

  return (
    <div className="rounded shadow-[0_6px_16px_rgba(17,24,39,0.08)] lg:px-4 lg:py-6 p-2 border border-slate-300">
      <div className="border border-slate-50 bg-white rounded px-4 py-6">
        <div className="grid gap-4">

          <div className="flex items-center justify-between lg:text-lg">
            <div className="flex items-center gap-2">
              <GiStoneCrafting className="text-secondary-orange" />
              <p className="flex gap-1 text-secondary font-bold">
                رقم الطلب :
                <span>{data.orderId ? data.orderId : data.serviceId}</span>
              </p>
            </div>
            {data.orderStatus && (
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full border ${statusInfo.color}`}
              >
                {statusInfo.label}
              </span>
            )}
          </div>

          <div className="grid gap-2 lg:gap-3 lg:mr-4 font-semibold text-secondary lg:text-[16px] text-sm">
            <div className="flex lg:items-center items-start gap-1 bg-main py-2 lg:w-fit lg:pl-6 pl-1 rounded">
              <GoDotFill className="text-secondary-orange shrink-0" />
              <span className="font-bold">سبب الشكوى :</span>
              <span>{data.description}</span>
            </div>
            

            {data.adminResolutionNotes && (
              <div className="border border-orange-200 bg-orange-50 rounded-lg p-3 grid gap-1">
                <p className="font-bold text-secondary-orange text-sm">
                  🔔 قرار الإدارة :
                </p>
                <p className="text-secondary text-sm font-semibold leading-relaxed">
                  {data.adminResolutionNotes}
                </p>
              </div>
            )}

            <div className="lg:mt-2 mt-1 w-full">
              <button
                onClick={fetchOrderDetails}
                disabled={isLoadingDetails}
                className="py-2 w-full text-white text-center rounded bg-secondary-orange hover:bg-orange-500 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                {isLoadingDetails ? (
                  <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4 inline-block" />
                ) : (
                  <>
                    <span>{isOpen ? "إخفاء تفاصيل الطلب" : "عرض تفاصيل الطلب"}</span>
                    <span
                      className={`transition-transform duration-300 inline-block ${isOpen ? "rotate-180" : "rotate-0"}`}
                    >
                      ▼
                    </span>
                  </>
                )}
              </button>
            </div>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isOpen ? "max-h-[600px] opacity-100 mt-1" : "max-h-0 opacity-0"
              }`}
            >
              {orderDetails && (
                <div className="bg-main rounded-lg p-4 grid gap-3 border border-slate-200">
                  <p className="font-bold text-secondary-orange text-base border-b border-slate-200 pb-2">
                    تفاصيل الطلب
                  </p>

                  <div className="grid gap-2 lg:text-[15px] text-sm text-secondary font-semibold">
                    <div className="flex gap-2 items-center">
                      <GoDotFill className="text-secondary-orange shrink-0" />
                      <span className="font-bold">اسم العميل :</span>
                      <span>{orderDetails.clientName}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <GoDotFill className="text-secondary-orange shrink-0" />
                      <span className="font-bold">الخدمة :</span>
                      <span>{orderDetails.serviceName}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <GoDotFill className="text-secondary-orange shrink-0" />
                      <span className="font-bold">المبلغ :</span>
                      <span>{orderDetails.amount} ج.م</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <GoDotFill className="text-secondary-orange shrink-0" />
                      <span className="font-bold">الموعد المجدول :</span>
                      <span>
                        {new Date(orderDetails.scheduledAt).toLocaleString("ar-EG")}
                      </span>
                    </div>
                    <div className="flex gap-2 items-start">
                      <GoDotFill className="text-secondary-orange shrink-0 mt-1" />
                      <span className="font-bold">وصف الطلب :</span>
                      <span>{orderDetails.description}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};