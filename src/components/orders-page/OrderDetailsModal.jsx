import { formatCurrency, formatDateTime } from "../../utils/formatters";
import OrderStatusBadge from "./OrderStatusBadge";

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  const { date, time } = formatDateTime(order.scheduledAt);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">تفاصيل الطلب</h2>
          <button
            onClick={onClose}
            className="rounded-lg px-3 py-1 text-gray-500 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-gray-500">اسم الخدمة</p>
            <p className="font-semibold text-gray-800">{order.serviceName}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">الحالة</p>
            <div className="mt-1">
              <OrderStatusBadge status={order.status} />
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">اسم العميل</p>
            <p className="font-semibold text-gray-800">{order.clientName}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">اسم الحرفي</p>
            <p className="font-semibold text-gray-800">{order.craftsmanName}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">التاريخ</p>
            <p className="font-semibold text-gray-800">{date}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">الوقت</p>
            <p className="font-semibold text-gray-800">{time}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">السعر</p>
            <p className="font-semibold text-gray-800">
              {formatCurrency(order.amount)}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">رقم الطلب</p>
            <p className="font-semibold text-gray-800">{order.id}</p>
          </div>
        </div>

        <div className="mt-5">
          <p className="text-sm text-gray-500">الوصف</p>
          <p className="mt-1 rounded-xl bg-gray-50 p-3 text-gray-800">
            {order.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
