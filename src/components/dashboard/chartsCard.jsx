import { useCraftsmen } from "../../features/dashboard/hooks";
import SplashLoader from "../common/SplashLoader";
import OrdersBarChart from "./OrdersBarChart";
import ServicesPieChart from "./ServicesPieChart";

export default function ChartsCard() {
  const { data: craftsmen=[], isLoading, error } = useCraftsmen();

  if (isLoading) {
    return (
      <div className="min-h-70 flex items-center justify-center">       
        <SplashLoader/>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-500"> فشل تحميل البيانات. </div>;
  }

  return (
    <section className=" bg-white p-6 shadow-xl ring-1 ring-black/5">
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <div className="">
          <h3 className="mb-3 text-xl font-bold text-right">اكثر الخدمات طلبا</h3>
          <div className="h-70">
            <ServicesPieChart craftsmen={craftsmen} />
          </div>
        </div>
        <div className="">
          <h3 className="mb-3 text-xl font-bold">عدد الطلبات شهريا</h3>
          <div className="h-70">
            <OrdersBarChart craftsmen={craftsmen} />
          </div>
        </div>

        
      </div>
    </section>
  );
}