import OrderCard from "./OrderCard";

const OrdersList = ({ orders, onViewDetails }) => {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} onViewDetails={onViewDetails} />
      ))}
    </div>
  );
};

export default OrdersList;
