import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { GiStoneCrafting } from "react-icons/gi";
import axios from "axios";
import { getId, getToken } from "../../features/auth/authHelpers";
import SplashLoader from "../../components/common/SplashLoader";
import { useOutletContext } from "react-router-dom";

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

  const getAllOrders = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://herafie.runasp.net/api/Complaints/my`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setClientData(res.data);
      setIsActive({ pending: false, open: true });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id && token && isActive.open) getAllOrders();
  }, [isActive.open]);

  useEffect(() => {
    setPlaceholder("النزاعات  ...");
    setSearch("");
  }, []);

  return (
    <div dir="rtl" className="min-h-screen bg-main text-primary">
      <main className="mx-auto max-w-7xl lg:px-8 px-4 py-6 lg:py-8">
        <div className="grid lg:gap-8 gap-5">
          <div className="flex  items-center justify-center font-bold shadow-[0_6px_16px_rgba(17,24,39,0.08)] bg-white py-4 gap-4 lg:px-12 px-4 rounded m-auto lg:w-8/12 ">
            <button
              onClick={() => setIsActive({ open: true, pending: false })}
              className={`lg:px-4 lg:py-2 text-sm p-2 ${isActive.open ? "text-white bg-secondary-orange " : "text-secondary bg-slate-200"} rounded`}
            >
              نزاعات مفتوحة
            </button>
            <button
              onClick={() => setIsActive({ open: false, pending: true })}
              className={`lg:px-4 lg:py-2 text-sm p-2 ${isActive.pending ? "text-white bg-secondary-orange " : "text-secondary bg-slate-200"} rounded`}
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
                {clientData.length > 0 && isActive.open ? (
                  clientData.map((item, idx) => (
                    <ConflictItem data={item} key={idx} />
                  ))
                ) : (
                  <p className=" font-extrabold text-xl text-center flex items-center justify-center min-h-[100px] text-secondary-orange">
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
  return (
    <div className=" rounded shadow-[0_6px_16px_rgba(17,24,39,0.08)] lg:px-4 lg:py-6 p-2 border border-slate-300">
      <div className="border border-slate-50 bg-white rounded px-4 py-6">
        <div className="grid gap-4">
          <div className="flex items-center gap-2 lg:text-lg">
            <GiStoneCrafting className="text-secondary-orange" />

            <p className="flex gap-1 text-secondary font-bold">
              رقم الطلب :
              <span> {data.orderId ? data.orderId : data.serviceId}</span>
            </p>
          </div>
          <div className="grid gap-2 lg:gap-4 lg:mr-4 font-semibold text-secondary lg:text-[16px] text-sm">
            <div className="flex  lg:items-center items-start gap-1">
              <GoDotFill className="text-secondary-orange" />
              <span className="font-bold"> الاسم :</span>
              <span> {data.clientName}</span>
            </div>
            <div className="flex  lg:items-center items-start gap-1">
              <GoDotFill className="text-secondary-orange" />
              <span className="font-bold"> الخدمة المطلوبة :</span>
              <span>{data.serviceName}</span>
            </div>
            <div className="flex  lg:items-center items-start gap-1 bg-main py-2 lg:w-fit lg:pl-6 pl-1">
              <GoDotFill className="text-secondary-orange" />
              <span className="font-bold">سبب الشكوى :</span>
              <span>{data.description}</span>
            </div>
            <div className="lg:mt-6 mt-3 w-full">
              <button className="py-2 w-full text-white text-center rounded bg-secondary-orange hover:bg-orange-500 transition-opacity duration-300 ">
                عرض التفاصيل
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
