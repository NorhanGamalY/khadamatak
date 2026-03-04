import React from "react";

function Orders() {
  return (
    <div className="p-4 md:p-10 bg-gray-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center">
          <img
            src="./solar_wallet-bold.png"
            alt="wallet"
            className="w-12 mb-3"
          />
          <h3 className="text-2xl font-bold">20</h3>
          <h4 className="text-gray-600">الطلبات الجديدة</h4>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center">
          <img
            src="./ri_checkbox-circle-fill.png"
            alt="current orders"
            className="w-12 mb-3"
          />
          <h3 className="text-2xl font-bold">3</h3>
          <h4 className="text-gray-600">الطلبات الحالية</h4>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center">
          <img
            src="./Frame 2147228651.png"
            alt="completed orders"
            className="w-12 mb-3"
          />
          <h3 className="text-2xl font-bold">130</h3>
          <h4 className="text-gray-600">الطلبات المكتملة</h4>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center">
          <img
            src="./Frame 2147228651 (1).png"
            alt="balance"
            className="w-12 mb-3"
          />
          <h3 className="text-2xl font-bold">10,000 ج.م</h3>
          <h4 className="text-gray-600">الرصيد الحالي</h4>
        </div>
      </div>
    </div>
  );
}

export default Orders;
