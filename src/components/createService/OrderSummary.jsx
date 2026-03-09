export default function OrderSummary({ serviceType, day, time, price }) {
  return (
    <div className="text-md font-semibold text-gray-700 space-y-2">

      <div className="flex gap-2">
        <span>نوع الخدمة:</span>
        <span className="text-orange-500">
          {serviceType || "لم يتم الاختيار"}
        </span>
      </div>

      <div className="flex gap-2">
        <span>اليوم:</span>
        <span className="text-orange-500">
          {day || "لم يتم الاختيار"}
        </span>
      </div>

      <div className="flex gap-2">
        <span>الوقت:</span>
        <span className="text-orange-500">
          {time || "لم يتم الاختيار"}
        </span>
      </div>

      <div className="flex gap-2">
        <span>المبلغ المتوقع:</span>
        <span className="text-orange-500">
          {price ? `${price} ج` : "—"}
        </span>
      </div>

    </div>
  );
}