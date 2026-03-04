export default function OrderSummary({ serviceType, time, price }) {
  return (
    <div className="text-md font-semibold text-gray-700 space-y-2">
      <div className="flex gap-2">
        <span>نوع الخدمة:</span>
        <span className="text-orange-500">{serviceType}</span>
      </div>

      <div className="flex gap-2 ">
        <span>الموعد:</span>
        <span className="text-orange-500">{time}</span>
      </div>

      <div className="flex gap-2">
        <span>المبلغ المتوقع:</span>
        <span className="text-orange-500">{price} ج</span>
      </div>
    </div>
  );
}