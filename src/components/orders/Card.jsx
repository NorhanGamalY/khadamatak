import { FaLocationDot } from "react-icons/fa6";
import Avatar from "../common/Avatar";
import { FaCalendar } from "react-icons/fa";
import { IoTime } from "react-icons/io5";

const statusStyles = (status) => {
  switch (status) {
    case "pending":
      return "bg-purple-100 text-purple-700";
    case "running":
      return "bg-orange-100 text-orange-600";
    case "done":
      return "bg-green-100 text-green-700";
    case "canceled":
    default:
      return "bg-gray-200 text-gray-600";
  }
};

export function Card({ order }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-4 py-3">
      <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-4 md:gap-6 w-full">
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Avatar src={order.avatar} name={order.name} size={50} />
          <div className="flex flex-col gap-3">
            <p className="text-md font-semibold ">{order.name}</p>
            <p className="text-sm text-gray-500 inline-flex items-center gap-1 justify-end">
              <FaLocationDot />
              {order.city}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full md:w-auto">
          <p className="text-sm text-gray-400">الخدمة</p>
          <p className="font-semibold">{order.service}</p>
        </div>

        <div className="flex flex-col gap-3 w-full md:w-auto">
          <p className="font-semibold  inline-flex items-center gap-2">
            <FaCalendar className="text-gray-400" />
            {order.date}
          </p>
          <p className="font-semibold  inline-flex items-center gap-2">
            <IoTime className="text-gray-400" />
            {order.time}
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full md:w-auto">
          <p className="text-sm text-gray-400">السعر</p>
          <p className=" text-green-800">{order.price} ج.م</p>
        </div>

        <div className="w-full md:w-auto">
          <span
            className={[
              "inline-flex items-center justify-center",
              "px-4 py-2 rounded",
              "text-sm font-bold",
              "min-w-25",
              "w-full md:w-auto",
              statusStyles(order.status),
            ].join(" ")}
          >
            {order.statusLabel}
          </span>
        </div>

      </div>
    </div>
  );
}