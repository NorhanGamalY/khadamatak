import OrderCard from "./OrderCard";

const OrdersList = ({ orders, onViewDetails }) => {
  return (
    <div className="space-y-4">
      <p className="bg-yellow-100 text-yellow-800 p-4 rounded-lg">
        يمكنك الدفع عند قبول الطلب لاتمام العملية
      </p>
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} onViewDetails={onViewDetails} />
      ))}
    </div>
  );
};

export default OrdersList;
