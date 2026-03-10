function formatCardNumber(value) {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

export default function CardNumberInput({ value, onChange, error }) {
  const handleChange = (val) => {
    onChange(formatCardNumber(val));
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-semibold text-gray-700 text-right">
        رقم البطاقة
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="ادخل الرقم"
        className={`w-full rounded-md border px-4 py-3 text-right outline-none transition ${
          error ? "border-red-400" : "border-gray-300 focus:border-indigo-500"
        }`}
      />

      {error && (
        <span className="text-xs text-red-500 text-right">{error}</span>
      )}
    </div>
  );
}