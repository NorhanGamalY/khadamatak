import Orders from "./Orders";
import CraftCard from "./CraftCard";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function Dashboard() {
  const { setPlaceholder, setSearch } = useOutletContext();
  useEffect(() => {
    setPlaceholder("لوحة المعلومات");
    setSearch("");
  }, []);

  return (
    <>
      <Orders />
      <div className="bg-gray-100 w-full mlg:in-h-screen">
        <main className="mx-auto max-w-7xl lg:px-8 px-4 py-6 lg:py-8">
          <div
            className="flex flex-col md:flex-row 
                justify-between items-start md:items-center 
                gap-2 md:gap-0 mb-8"
          >
            <h4 className="text-lg font-bold">اخر الطلبات الجديدة</h4>

            <h4 className="text-orange-500 cursor-pointer hover:underline">
              عرض الكل
            </h4>
          </div>
          <CraftCard />

          <div className="bg-white p-4 ">
            <h3 className="text-2xl my-4">تزكير سريع</h3>
            <div className="bg-amber-100 rounded-lg p-4 flex flex-col gap-2 shadow-md">
              <h3 className="text-lg font-semibold text-amber-900 text-2xl">
                موعد الصيانة
              </h3>
              <p className="text-amber-700 text-sm">بقي 50 دقيقة على الموعد</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
