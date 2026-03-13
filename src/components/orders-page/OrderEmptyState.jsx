const OrdersEmptyState = () => {
  return (
    <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
      <h3 className="text-lg font-bold text-gray-700">لا يوجد طلبات</h3>
      <p className="mt-2 text-sm text-gray-500">
        ما في طلبات ضمن هذا القسم حالياً
      </p>
    </div>
  );
};

export default OrdersEmptyState;
