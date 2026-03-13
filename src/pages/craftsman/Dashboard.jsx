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
        </main>
      </div>
    </>
  );
}
