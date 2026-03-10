import { getOrderStatusMeta } from "../../utils/orderStatus";

const statusStyles = {
  0: "bg-[#FFF1E8] text-[#3B82F6]",
  1: "bg-[#EEF4FF] text-[#3B82F6]",
  2: "bg-[#EAF8EE] text-[#E15B64]",
  3: "bg-[#EAF8EE] text-[#F07C2B]",
  4: "bg-[#EAF8EE] text-[#4E9F62]",
  5: "bg-[#FDECEC] text-[#E15B64]",
};

const OrderStatusBadge = ({ status }) => {
  const meta = getOrderStatusMeta(status);

  return (
    <span
      className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
        statusStyles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {meta.label}
    </span>
  );
};

export default OrderStatusBadge;