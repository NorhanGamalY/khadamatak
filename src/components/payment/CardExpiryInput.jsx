function formatExpiry(value) {
  const digits = value.replace(/\D/g, "").slice(0, 4);

  if (digits.length < 3) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
}

export default function CardExpiryInput({ value, onChange, error }) {
  const handleChange = (val) => {
    onChange(formatExpiry(val));
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-semibold text-gray-700 text-right">
        الانتهاء
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="12/25"
        className={`w-full rounded-md border px-4 py-3 text-center outline-none transition ${
          error ? "border-red-400" : "border-gray-300 focus:border-indigo-500"
        }`}
      />

      {error && (
        <span className="text-xs text-red-500 text-right">{error}</span>
      )}
    </div>
  );
}