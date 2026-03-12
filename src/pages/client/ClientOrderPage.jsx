import { useState } from "react";
import OrdersPageHeader from "../../components/orders-page/OrdersPageHeader";
import OrdersTabs from "../../components/orders-page/OrdersTabs";
import OrdersList from "../../components/orders-page/OrderList";
import OrdersEmptyState from "../../components/orders-page/OrderEmptyState";
import OrdersLoadingState from "../../components/orders-page/OrderLoadingState";
import OrderDetailsModal from "../../components/orders-page/OrderDetailsModal";
import ReviewModal from "../../components/orders-page/ReviewModal";
import { useClientOrders } from "../../hooks/useClientOrders";

const ClientOrdersPage = () => {
  const { filteredOrders, activeTab, setActiveTab, loading, error } =
    useClientOrders();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [reviewOrder, setReviewOrder] = useState(null);

  return (
    <div className="min-h-screen p-4 md:p-6 mt-25" dir="rtl">
      <div className="mx-auto max-w-6xl space-y-6">
        <OrdersPageHeader />

        <OrdersTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {loading ? (
          <OrdersLoadingState />
        ) : error ? (
          <div className="rounded-2xl bg-red-50 p-4 text-red-600 shadow-sm">
            {error}
          </div>
        ) : filteredOrders.length === 0 ? (
          <OrdersEmptyState />
        ) : (
          <OrdersList
            orders={filteredOrders}
            onViewDetails={setSelectedOrder}
          />
        )}
      </div>

      <OrderDetailsModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onOpenReview={(order) => setReviewOrder(order)}
      />

      {reviewOrder && (
        <ReviewModal
          order={reviewOrder}
          onClose={() => setReviewOrder(null)}
          onSuccess={() => setReviewOrder(null)}
        />
      )}
    </div>
  );
};

export default ClientOrdersPage;