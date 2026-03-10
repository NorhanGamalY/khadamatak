import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "../../components/common/Toast";

function Wallet() {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasWallet, setHasWallet] = useState(true);

  const getWallet = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://herafie.runasp.net/api/Wallet/my-wallet",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setWallet(res.data);
      setHasWallet(true);
    } catch (error) {
      if (error.response?.status === 404) {
        setHasWallet(false);
        setWallet(null);
      }
      console.log("Error fetching wallet:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWallet = async () => {
    try {
      await axios.post(
        "https://herafie.runasp.net/api/Wallet/create",
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("تم إنشاء المحفظة بنجاح");
      getWallet();
    } catch (error) {
      toast.error("فشل في إنشاء المحفظة");
    }
  };

  useEffect(() => {
    getWallet();
  }, []);

  const handleWithdraw = async () => {
    if (!wallet?.balance || wallet.balance <= 0) {
      toast.error("لا يوجد رصيد كافٍ للسحب حالياً");
      return;
    }

    const withdrawData = {
      cardNumber: "1234567890123456",
      expMonth: 12,
      expYear: 2026,
      cvc: "985",
      amount: wallet.balance,
    };

    try {
      await axios.post(
        "https://herafie.runasp.net/api/Wallet/withdraw",
        withdrawData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("تم السحب بنجاح");
      getWallet();
    } catch (error) {
      const errorMsg = error.response?.data?.errorsList?.[0]?.message || "فشل السحب";
      toast.error(errorMsg);
    }
  };

  if (loading) return <div className="text-center mt-20 font-bold text-orange-600">جاري التحميل...</div>;

  return (
    <div className="min-h-screen p-4 bg-gray-50" dir="rtl">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-8 text-center">
          <h1 className="text-3xl font-extrabold mb-10 text-gray-800">إدارة المحفظة</h1>

          {!hasWallet ? (
            /* if user haven't a wallet yet*/
            <div className="py-12 bg-orange-50 rounded-2xl border border-orange-100">
              <p className="mb-8 text-lg text-orange-800 font-medium">
                يبدو أنك لا تملك محفظة
              </p>
              <button
                onClick={handleCreateWallet}
                className="bg-orange-600 text-white font-bold py-4 px-16 rounded-full shadow-lg hover:bg-orange-700 hover:scale-105 transition-all"
              >
                إنشاء محفظة
              </button>
            </div>
          ) : (
            /* if there is a wallet show the data*/
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-orange-600 text-white p-8 rounded-xl shadow-xl ">
                  <h2 className="text-lg mb-2">أرباح هذا الشهر</h2>
                  <p className="text-xl font-black">
                    {wallet?.monthlyEarnings && wallet.monthlyEarnings > 0
                      ? `${wallet.monthlyEarnings} جنيه`
                      : "لا يوجد رصيد"}
                  </p>
                </div>
                <div className="bg-secondary text-white p-8 rounded-xl shadow-xl ">
                  <h2 className="text-lg mb-2">الرصيد الحالي</h2>
                  <p className="text-xl font-black">
                    {wallet?.balance > 0 ? `${wallet.balance} جنيه` : "لا يوجد رصيد"}
                  </p>
                </div>
              </div>

              <div className="m-6">
                <h3 className="text-xl font-bold text-gray-700 text-center">سجل العمليات</h3>
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
                <table className="w-full text-right">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr className="text-secondary">
                      <th className="py-4 px-4 text-center">التاريخ</th>
                      <th className="py-4 px-4 text-center">المبلغ</th>
                      <th className="py-4 px-4 text-center">الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!wallet?.transactions || wallet.transactions.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="py-10 text-center text-gray-400 ">
                          لا توجد عمليات
                        </td>
                      </tr>
                    ) : (
                      wallet.transactions.map((item) => (
                        <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                          <td className="py-4 px-4 text-center text-gray-600 font-medium">
                            {new Date(item.createdAt).toLocaleDateString("ar-EG")}
                          </td>
                          <td className="py-4 px-4 text-center font-bold text-gray-800">
                            {item.amount} ج.م
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                              {item.reason || item.status || "مكتملة"}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-10">
                <button
                  onClick={hasWallet ? handleWithdraw : handleCreateWallet}

                  className="bg-orange-600 text-white font-bold py-4 px-16 rounded-xl shadow-lg "
                >
                  {hasWallet ? "سحب الأرباح" : "إنشاء محفظة"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Wallet;