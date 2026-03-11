import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Toast from "../../components/common/Toast";

const TRANSACTIONS_LIMIT = 7;

function validateField(name, value, balance) {
  switch (name) {
    case "cardNumber":
      if (!value) return "رقم البطاقة مطلوب";
      if (!/^\d+$/.test(value)) return "أرقام فقط";
      if (value.length !== 16) return "يجب أن يكون 16 رقم";
      return "";
    case "expMonth":
      if (!value) return "الشهر مطلوب";
      if (!/^\d+$/.test(value)) return "أرقام فقط";
      if (parseInt(value) < 1 || parseInt(value) > 12) return "شهر غير صحيح (1-12)";
      return "";
    case "expYear":
      if (!value) return "السنة مطلوبة";
      if (!/^\d{4}$/.test(value)) return "4 أرقام";
      if (parseInt(value) < new Date().getFullYear()) return "السنة منتهية";
      return "";
    case "cvc":
      if (!value) return "CVC مطلوب";
      if (!/^\d+$/.test(value)) return "أرقام فقط";
      if (value.length !== 3) return "3 أرقام";
      return "";
    case "amount":
      if (!value) return "المبلغ مطلوب";
      if (parseFloat(value) <= 0) return "المبلغ يجب أن يكون أكبر من صفر";
      if (parseFloat(value) > balance) return "المبلغ أكبر من الرصيد المتاح";
      return "";
    default:
      return "";
  }
}

function WithdrawModal({ balance, onClose, onWithdrawResult }) {
  const [form, setForm] = useState({
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvc: "",
    amount: "",
  });
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  const errors = {
    cardNumber: validateField("cardNumber", form.cardNumber, balance),
    expMonth:   validateField("expMonth",   form.expMonth,   balance),
    expYear:    validateField("expYear",    form.expYear,    balance),
    cvc:        validateField("cvc",        form.cvc,        balance),
    amount:     validateField("amount",     form.amount,     balance),
  };

  const hasErrors = Object.values(errors).some(Boolean);
  const allFilled = Object.values(form).every((v) => v !== "");
  const isDisabled = loading;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const inputClass = (name) => {
    const base = "w-full border rounded-xl px-4 py-3 text-gray-800 focus:outline-none transition-colors";
    if (touched[name] && errors[name]) return `${base} border-red-400 bg-red-50 focus:border-red-400`;
    if (touched[name] && !errors[name]) return `${base} border-green-400 focus:border-green-400`;
    return `${base} border-gray-200 focus:border-orange-400`;
  };

  const inputClassSm = (name) => {
    const base = "w-full border rounded-xl px-3 py-3 text-gray-800 focus:outline-none transition-colors text-center";
    if (touched[name] && errors[name]) return `${base} border-red-400 bg-red-50 focus:border-red-400`;
    if (touched[name] && !errors[name]) return `${base} border-green-400 focus:border-green-400`;
    return `${base} border-gray-200 focus:border-orange-400`;
  };

  const handleSubmit = async () => {
    setTouched({ cardNumber: true, expMonth: true, expYear: true, cvc: true, amount: true });

    const currentErrors = {
      cardNumber: validateField("cardNumber", form.cardNumber, balance),
      expMonth:   validateField("expMonth",   form.expMonth,   balance),
      expYear:    validateField("expYear",    form.expYear,    balance),
      cvc:        validateField("cvc",        form.cvc,        balance),
      amount:     validateField("amount",     form.amount,     balance),
    };
    if (Object.values(currentErrors).some(Boolean)) return;

    setLoading(true);
    try {
      const res = await axios.post(
        "https://herafie.runasp.net/api/Wallet/withdraw",
        {
          cardNumber: form.cardNumber,
          expMonth: parseInt(form.expMonth),
          expYear: parseInt(form.expYear),
          cvc: form.cvc,
          amount: parseFloat(form.amount),
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      onWithdrawResult({ success: true, message: res.data?.message || "تم السحب بنجاح" });
    } catch (error) {
      const errorMsg =
        error.response?.data?.errorsList?.[0]?.message ||
        error.response?.data?.message ||
        "فشل السحب، حاول مرة أخرى";
      onWithdrawResult({ success: false, message: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-extrabold text-gray-800">سحب الأرباح</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl font-bold leading-none">✕</button>
        </div>

        <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-6 text-center">
          <p className="text-sm text-gray-500 mb-1">الرصيد المتاح</p>
          <p className="text-3xl font-black text-orange-600">{balance} جنيه</p>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">رقم البطاقة</label>
            <input
              name="cardNumber"
              value={form.cardNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={16}
              placeholder="4242424242424242"
              className={inputClass("cardNumber")}
              dir="ltr"
            />
            {touched.cardNumber && errors.cardNumber && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <span>⚠</span> {errors.cardNumber}
              </p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">الشهر</label>
              <input name="expMonth" value={form.expMonth} onChange={handleChange} onBlur={handleBlur}
                maxLength={2} placeholder="12" className={inputClassSm("expMonth")} />
              {touched.expMonth && errors.expMonth && (
                <p className="text-red-500 text-xs mt-1 text-center leading-tight">{errors.expMonth}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">السنة</label>
              <input name="expYear" value={form.expYear} onChange={handleChange} onBlur={handleBlur}
                maxLength={4} placeholder="2028" className={inputClassSm("expYear")} />
              {touched.expYear && errors.expYear && (
                <p className="text-red-500 text-xs mt-1 text-center leading-tight">{errors.expYear}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">CVC</label>
              <input name="cvc" value={form.cvc} onChange={handleChange} onBlur={handleBlur}
                maxLength={3} placeholder="592" className={inputClassSm("cvc")} />
              {touched.cvc && errors.cvc && (
                <p className="text-red-500 text-xs mt-1 text-center leading-tight">{errors.cvc}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">المبلغ (جنيه)</label>
            <input name="amount" type="number" value={form.amount} onChange={handleChange} onBlur={handleBlur}
              placeholder="أدخل المبلغ" className={inputClass("amount")} />
            {touched.amount && errors.amount && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <span>⚠</span> {errors.amount}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isDisabled}
          className={`w-full mt-6 text-white font-bold py-4 rounded-xl transition-all text-lg flex items-center justify-center gap-2
            ${loading
              ? "bg-orange-300 cursor-not-allowed"
              : "bg-orange-600 hover:bg-orange-700 cursor-pointer shadow-lg"
            }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              جاري السحب...
            </>
          ) : (
            "تأكيد السحب"
          )}
        </button>
      </div>
    </div>
  );
}

function TransactionRow({ item }) {
  const [expanded, setExpanded] = useState(false);
  const isCredit = item.type === "Credit";

  return (
    <>
      <tr
        onClick={() => setExpanded((v) => !v)}
        className="border-b border-gray-50 hover:bg-orange-50 transition cursor-pointer"
      >
        <td className="py-4 px-4 text-center text-gray-600 font-medium">
          {new Date(item.createdAt).toLocaleDateString("ar-EG")}
        </td>
        <td className="py-4 px-4 text-center font-bold">
          <span className={isCredit ? "text-green-600" : "text-red-500"}>
            {isCredit ? "+" : "-"}{item.amount} ج.م
          </span>
        </td>
        <td className="py-4 px-4 text-center">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            item.status === "Completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
          }`}>
            {item.reason || item.status || "مكتملة"}
          </span>
        </td>
        <td className="py-4 px-4 text-center">
          <span className="text-orange-500 text-lg inline-block"
            style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
            ▾
          </span>
        </td>
      </tr>

      {expanded && (
        <tr className="bg-orange-50 border-b border-orange-100">
          <td colSpan={4} className="px-6 py-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm" dir="rtl">
              <div><p className="text-gray-400 text-xs mb-1">رقم المعاملة</p><p className="font-bold text-gray-700">#{item.id}</p></div>
              <div><p className="text-gray-400 text-xs mb-1">النوع</p>
                <p className={`font-bold ${isCredit ? "text-green-600" : "text-red-500"}`}>{isCredit ? "إيداع" : "سحب"}</p>
              </div>
              <div><p className="text-gray-400 text-xs mb-1">المبلغ</p><p className="font-bold text-gray-700">{item.amount} ج.م</p></div>
              <div><p className="text-gray-400 text-xs mb-1">الحالة</p><p className="font-bold text-gray-700">{item.status}</p></div>
              <div><p className="text-gray-400 text-xs mb-1">السبب</p><p className="font-bold text-gray-700">{item.reason || "—"}</p></div>
              {item.orderId && <div><p className="text-gray-400 text-xs mb-1">رقم الطلب</p><p className="font-bold text-gray-700">#{item.orderId}</p></div>}
              {item.orderInfo?.description && <div><p className="text-gray-400 text-xs mb-1">الخدمة</p><p className="font-bold text-gray-700">{item.orderInfo.description}</p></div>}
              {item.reference && <div className="col-span-2"><p className="text-gray-400 text-xs mb-1">المرجع</p><p className="font-bold text-gray-700 text-xs break-all">{item.reference}</p></div>}
              <div><p className="text-gray-400 text-xs mb-1">التاريخ والوقت</p><p className="font-bold text-gray-700">{new Date(item.createdAt).toLocaleString("ar-EG")}</p></div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function Wallet() {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasWallet, setHasWallet] = useState(true);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, type: "success", title: "", message: "" });

  const showToast = ({ type, title, message }) =>
    setToast({ isOpen: true, type, title, message });

  const closeToast = () =>
    setToast((prev) => ({ ...prev, isOpen: false }));

  const getWallet = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://herafie.runasp.net/api/Wallet/my-wallet", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
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
      await axios.post("https://herafie.runasp.net/api/Wallet/create", {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      showToast({ type: "success", title: "تم بنجاح", message: "تم إنشاء المحفظة بنجاح" });
      getWallet();
    } catch (error) {
      showToast({ type: "error", title: "خطأ", message: "فشل في إنشاء المحفظة" });
    }
  };

  const handleWithdrawResult = async ({ success, message }) => {
    setShowWithdrawModal(false);
    if (success) {
      await getWallet();
      showToast({ type: "success", title: "تم السحب بنجاح", message });
    } else {
      showToast({ type: "error", title: "فشل السحب", message });
    }
  };

  useEffect(() => { getWallet(); }, []);

  const monthlyEarnings = useMemo(() => {
    if (!wallet?.transactions) return 0;
    const now = new Date();
    return wallet.transactions
      .filter((tx) => {
        if (tx.type !== "Credit" || tx.status !== "Completed") return false;
        const d = new Date(tx.createdAt);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      })
      .reduce((sum, tx) => sum + tx.amount, 0);
  }, [wallet]);

  const transactions = wallet?.transactions || [];
  const visibleTransactions = showAllTransactions ? transactions : transactions.slice(0, TRANSACTIONS_LIMIT);
  const hasMore = transactions.length > TRANSACTIONS_LIMIT;

  if (loading)
    return <div className="text-center mt-20 font-bold text-orange-600">جاري التحميل...</div>;

  return (
    <div className="min-h-screen p-4 bg-gray-50" dir="rtl">

      <Toast
        isOpen={toast.isOpen}
        type={toast.type}
        title={toast.title}
        message={toast.message}
        onClose={closeToast}
        actionLabel="حسناً"
      />

      {showWithdrawModal && (
        <WithdrawModal
          balance={wallet?.balance || 0}
          onClose={() => setShowWithdrawModal(false)}
          onWithdrawResult={handleWithdrawResult}
        />
      )}

      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-8 text-center">
          <h1 className="text-3xl font-extrabold mb-10 text-gray-800">إدارة المحفظة</h1>

          {!hasWallet ? (
            <div className="py-12 bg-orange-50 rounded-2xl border border-orange-100">
              <p className="mb-8 text-lg text-orange-800 font-medium">يبدو أنك لا تملك محفظة</p>
              <button onClick={handleCreateWallet}
                className="bg-orange-600 text-white font-bold py-4 px-16 rounded-full shadow-lg hover:bg-orange-700 hover:scale-105 transition-all">
                إنشاء محفظة
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-orange-600 text-white p-8 rounded-xl shadow-xl">
                  <h2 className="text-lg mb-2">أرباح هذا الشهر</h2>
                  <p className="text-xl font-black">
                    {monthlyEarnings > 0 ? `${monthlyEarnings} جنيه` : "لا يوجد رصيد"}
                  </p>
                </div>
                <div className="bg-secondary text-white p-8 rounded-xl shadow-xl">
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
                      <th className="py-4 px-4 text-center"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="py-10 text-center text-gray-400">لا توجد عمليات</td>
                      </tr>
                    ) : (
                      visibleTransactions.map((item) => (
                        <TransactionRow key={item.id} item={item} />
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {hasMore && (
                <button
                  onClick={() => {
                    if (showAllTransactions) window.scrollTo({ top: 0, behavior: "smooth" });
                    setShowAllTransactions((v) => !v);
                  }}
                  className="mt-4 flex items-center gap-2 mx-auto text-orange-600 hover:text-orange-700 font-semibold text-sm transition-all"
                >
                  <span style={{ display: "inline-block", transition: "transform 0.3s", transform: showAllTransactions ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
                  {showAllTransactions ? "عرض أقل" : `عرض باقي ${transactions.length - TRANSACTIONS_LIMIT} عملية`}
                </button>
              )}

              <div className="mt-10">
                <button
                  onClick={() => {
                    if (!wallet?.balance || wallet.balance <= 0) {
                      showToast({ type: "error", title: "تنبيه", message: "لا يوجد رصيد كافٍ للسحب حالياً" });
                      return;
                    }
                    setShowWithdrawModal(true);
                  }}
                  className="bg-orange-600 text-white font-bold py-4 px-16 rounded-xl shadow-lg hover:bg-orange-700 transition-all"
                >
                  سحب الأرباح
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