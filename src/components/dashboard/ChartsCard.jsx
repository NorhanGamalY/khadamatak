import OrdersBarChart from "./OrdersBarChart";
import ServicesPieChart from "./ServicesBarChart";

export default function ChartsCard() {
  return (
    <section className=" bg-white p-6 shadow-xl ring-1 ring-black/5">
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <div className="">
          <h3 className="mb-3 text-xl font-bold text-right">اكثر الخدمات طلبا</h3>
          <div className="h-70">
            <ServicesPieChart />
          </div>
        </div>
        <div className="">
          <h3 className="mb-3 text-xl font-bold">عدد الطلبات شهريا</h3>
          <div className="h-70">
            <OrdersBarChart />
          </div>
        </div>

        
      </div>
    </section>
  );
}