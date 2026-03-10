import { CalendarDays, Clock3, MapPin } from "lucide-react";
import OrderStatusBadge from "./OrderStatusBadge";
import { formatCurrency, formatDateTime } from "../../utils/formatters";
import { getCraftsmanAvatar } from "../../utils/craftmanAvatars";

const OrderCard = ({ order, onViewDetails }) => {
  const { date, time } = formatDateTime(order.scheduledAt);
  const avatarSrc = getCraftsmanAvatar(order);

  const locationText = order.craftsman
    ? `${order.craftsman.areaName}، ${order.craftsman.cityName}`
    : "الموقع غير متوفر";

  const craftsmanName =
    order.craftsman?.fullName?.split(" ").slice(0, 2).join(" ") ||
    order.craftsmanName?.split(" ").slice(0, 2).join(" ") ||
    "حرفي";

  return (
    <div className="rounded-[22px] border border-[#ECEAF3] bg-white px-5 py-4 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3 text-right">
          <img
            src={avatarSrc}
            alt={craftsmanName}
            className="h-14 w-14 rounded-full object-cover ring-2 ring-[#F3F1FA]"
          />

          <div>
            <h3 className="text-lg font-bold text-[#1F1F1F]">
              {craftsmanName}
            </h3>

            <div className="mt-1 flex items-center justify-end gap-1 text-sm text-[#9C9AA5]">
              <MapPin size={14} />
              <span>{locationText}</span>
            </div>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-4 text-right sm:grid-cols-4 lg:max-w-[650px]">
          <div>
            <p className="text-xs text-[#A1A1AA]">الخدمة</p>
            <p className="font-semibold text-[#2B2B2B]">{order.serviceName}</p>
          </div>

          <div>
            <p className="text-xs text-[#A1A1AA]">السعر</p>
            <p className="font-semibold text-[#4E9F62]">
              {formatCurrency(order.amount)}
            </p>
          </div>

          <div className="flex items-center justify-start gap-2">
            <CalendarDays size={16} className="text-[#9A9A9A]" />
            <div>
              <p className="text-xs text-[#A1A1AA]">التاريخ</p>
              <p className="font-semibold text-[#2B2B2B]">{date}</p>
            </div>
          </div>

          <div className="flex items-center justify-start gap-2">
            <Clock3 size={16} className="text-[#9A9A9A]" />
            <div>
              <p className="text-xs text-[#A1A1AA]">الوقت</p>
              <p className="font-semibold text-[#2B2B2B]">{time}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <OrderStatusBadge status={order.status} />

          <button
            onClick={() => onViewDetails(order)}
            className="rounded-xl border border-[#2E236C] px-5 py-2 text-sm font-bold text-[#2E236C] transition hover:bg-[#2E236C] hover:text-white"
          >
            عرض التفاصيل
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;