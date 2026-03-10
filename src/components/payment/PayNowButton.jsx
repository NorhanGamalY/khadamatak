export default function PayNowButton({ onClick, loading, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full rounded-xl bg-[#251c74] py-3 text-lg font-bold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? "جاري الدفع..." : "ادفع الآن"}
    </button>
  );
}