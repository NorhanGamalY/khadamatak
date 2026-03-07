const OrdersLoadingState = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="animate-pulse rounded-2xl bg-white p-5 shadow-sm"
        >
          <div className="mb-4 h-6 w-40 rounded bg-gray-200"></div>
          <div className="mb-3 h-4 w-64 rounded bg-gray-200"></div>
          <div className="mb-3 h-4 w-52 rounded bg-gray-200"></div>
          <div className="h-4 w-32 rounded bg-gray-200"></div>
        </div>
      ))}
    </div>
  );
};

export default OrdersLoadingState;
