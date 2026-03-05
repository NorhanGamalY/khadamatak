
import Orders from "./Orders";
import CraftCard from "./CraftCard";


export default function Dashboard() {



  return (
    <>
      <Orders />
      <div className="bg-gray-300 p-5">
        <div className="flex justify-between my-5 mx-5 ">
          <h2 className="text-2xl">أخر الطلبات الجديدة</h2>
          <p className="text-orange-500 text-xl">عرض الكل</p>
        </div>

      <CraftCard/>
    
        <div className="bg-white p-4 ">
          <h3 className="text-2xl my-4">تزكير سريع</h3>
          <div className="bg-amber-100 rounded-lg p-4 flex flex-col gap-2 shadow-md">
            <h3 className="text-lg font-semibold text-amber-900 text-2xl">
              موعد الصيانة
            </h3>
            <p className="text-amber-700 text-sm">بقي 50 دقيقة على الموعد</p>
          </div>
        </div>
      </div>
    </>
  );
}
