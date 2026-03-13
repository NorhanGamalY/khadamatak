export default function CardHolderInput({ value, onChange, error }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-semibold text-gray-700 text-right">
        اسم حامل البطاقة
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="ادخل الاسم"
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
