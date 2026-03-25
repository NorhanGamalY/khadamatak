import { CalendarDays, Clock3, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import OrderStatusBadge from "./OrderStatusBadge";
import { formatCurrency, formatDateTime } from "../../utils/formatters";
import Avatar from "../common/Avatar";
import axios from "axios";

const OrderCard = ({ order, onViewDetails }) => {
  const navigate = useNavigate();
  const { date, time } = formatDateTime(order.scheduledAt);
  const [craftsmanData, setCraftsmanData] = useState(null);

  useEffect(() => {
    const fetchCraftsman = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://herafie.runasp.net/api/Craftsmen", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const found = res.data.find((c) => c.id === order.craftsmanId);
        if (found) setCraftsmanData(found);
      } catch (err) {
        console.error("فشل جلب بيانات الحرفي", err);
      }
    };

    if (order.craftsmanId) fetchCraftsman();
  }, [order.craftsmanId]);

  const locationText = craftsmanData
    ? `${craftsmanData.areaName}، ${craftsmanData.cityName}`
    : order.craftsman
    ? `${order.craftsman.areaName}، ${order.craftsman.cityName}`
    : "الموقع غير متوفر";

  const craftsmanName =
    craftsmanData?.fullName?.split(" ").slice(0, 2).join(" ") ||
    order.craftsman?.fullName?.split(" ").slice(0, 2).join(" ") ||
    order.craftsmanName?.split(" ").slice(0, 2).join(" ") ||
    "حرفي";

  return (
    <div className="rounded-[22px] border border-[#ECEAF3] bg-white px-5 py-4 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3 text-right">

          <Avatar
            src={craftsmanData?.profilePicture || ""}
            name={craftsmanName}
            size={48}
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
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={() => onViewDetails(order)}
              className="rounded-xl border border-[#2E236C] px-5 py-2 text-sm font-bold text-[#2E236C] transition hover:bg-[#2E236C] hover:text-white"
            >
              عرض التفاصيل
            </button>
            {order.status === 1 && (
              <button
                onClick={() =>
                  navigate("/payment", {
                    state: { order },
                  })
                }
                className="rounded-xl bg-[#2E236C] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#1a1340]"
              >
                ادفع الآن
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;