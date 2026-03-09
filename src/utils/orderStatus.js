export const ORDER_STATUS = {
  0: { label: "جديد", color: "bg-orange-100 text-orange-600" },
  1: { label: "قيد المراجعة", color: "bg-blue-100 text-blue-600" },
  2: { label: "مقبول", color: "bg-green-100 text-green-700" },
  3: { label: "مكتمل", color: "bg-emerald-100 text-emerald-700" },
  4: { label: "مرفوض", color: "bg-red-100 text-red-600" },
};

export const getOrderStatusMeta = (status) => {
  return (
    ORDER_STATUS[status] || {
      label: "غير معروف",
      color: "bg-gray-100 text-gray-600",
    }
  );
};
