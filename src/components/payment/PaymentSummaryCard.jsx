export default function PaymentSummaryCard({
  servicePrice = 0,
  fees = 20,
  title = "ملخص الدفع",
}) {
  const total = Number(servicePrice) + Number(fees);

  return (
    <div className="w-full rounded-2xl bg-[#DDDCE6] p-6 shadow-sm">
      <h3 className="mb-5 text-center text-lg font-bold text-[#4e3c78]">
        {title}
      </h3>

      <div className="space-y-4 text-right">
        <div className="flex items-center justify-between text-gray-700">
          <span>{Number(servicePrice).toFixed(2)} جنيه</span>
          <span>سعر الخدمة</span>
        </div>

        <div className="flex items-center justify-between text-gray-700">
          <span>{Number(fees).toFixed(2)} جنيه</span>
          <span>رسوم إضافية</span>
        </div>

        <div className="border-t border-gray-300 pt-4">
          <div className="flex items-center justify-between font-bold text-[#ea580c]">
            <span>{total.toFixed(2)} جنيه</span>
            <span>الإجمالي</span>
          </div>
        </div>
      </div>
    </div>
  );
}
