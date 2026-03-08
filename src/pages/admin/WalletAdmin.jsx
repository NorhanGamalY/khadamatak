import React, { useEffect, useState } from "react";
import axios from "axios";

function WalletAdmin() {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

// Container data & Table

  const getWallet = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://herafie.runasp.net/api/Wallet/my-wallet",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setWallet(res.data);
    } catch (error) {
      console.log(error);
      setWallet(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWallet();
  }, []);

//   handel btn to Withdraw

  const handleWithdraw = async () => {
    if (!wallet || wallet.balance <= 0) {
      alert("لا يوجد رصيد للسحب");
      return;
    }

    try {
      await axios.post(
        "https://herafie.runasp.net/api/Wallet/withdraw",
        {
          cardNumber: "1234567890123456", 
          expMonth: 12,
          expYear: 2100,
          cvc: "985",
          amount: wallet.balance,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("تم سحب الأرباح بنجاح!");
      getWallet();
    } catch (error) {
      console.log(error.response?.data);
      alert("فشل السحب: " + error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen p-4" dir="rtl">
      <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-lg border border-gray-100">
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold m-8">المحفظة</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-orange-600 text-white p-5 rounded-md shadow-lg">
              <h2 className="text-xl mb-2">ارباح هذا الشهر</h2>
              <p className="text-2xl font-bold">
                {loading ? "جاري التحميل..." : wallet?.monthlyEarnings ?? 0} جنيه
              </p>
            </div>

            <div className="bg-secondary text-white p-6 rounded-md shadow-lg">
              <h2 className="text-xl mb-2">الرصيد الحالي</h2>
              <p className="text-2xl font-bold">
                {loading ? "جاري تحميل الرصيد..." : wallet?.balance ?? 0} جنيه
              </p>
            </div>
          </div>

          <h3 className="text-xl font-bold">سجل العمليات</h3>
          <div className="overflow-x-auto mt-10">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="text-secondary border-b border-t border-gray-200">
                  <th className="py-3 text-center">التاريخ</th>
                  <th className="py-3 text-center">المبلغ</th>
                  <th className="py-3 text-center">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="5" className="py-6 text-center text-gray-500">
                      جاري تحميل البيانات...
                    </td>
                  </tr>
                )}

                {!loading && (!wallet?.transactions || wallet.transactions.length === 0) && (
                  <tr>
                    <td colSpan="5" className="py-6 text-center text-gray-500">
                      لا توجد عمليات في المحفظة
                    </td>
                  </tr>
                )}

                {!loading &&
                  wallet?.transactions?.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-200 text-secondary font-bold"
                    >
                      <td className="py-4 text-center">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 text-center">{item.amount} جنيه</td>
                      <td className="py-4 text-center">{item.status}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10">
            <button
              onClick={handleWithdraw}
              className="bg-orange-600 text-white font-bold py-4 px-12 rounded-lg shadow-lg hover:scale-105 transition"
            >
              سحب الارباح
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WalletAdmin;