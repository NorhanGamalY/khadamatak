const methods = [
  { id: "ewallet", image: "/credit-cards/credit-card (4).png" },
  { id: "gpay", image: "/credit-cards/credit-card (3).png" },
  { id: "mastercard", image: "/credit-cards/credit-card (2).png" },
  { id: "paypal", image: "/credit-cards/credit-card (1).png" },
  { id: "visa", image: "/credit-cards/credit-card.png" },
];

export default function PaymentMethods({ selectedMethod, onSelectMethod }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-gray-700 text-right">
        طرق الدفع
      </h3>

      <div className="flex flex-wrap justify-start gap-3">
        {methods.map((method) => {
          const isActive = selectedMethod === method.id;

          return (
            <button
              key={method.id}
              type="button"
              onClick={() => onSelectMethod(method.id)}
              className={`border rounded-md transition ${
                isActive
                  ? "border-indigo-700"
                  : "border-gray-300 hover:border-indigo-400"
              }`}
            >
              <img
                src={method.image}
                alt={method.id}
                className="w-20 h-10 block"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
