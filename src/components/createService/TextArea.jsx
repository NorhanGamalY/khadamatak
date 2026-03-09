export default function TextAreaField({ value, onChange, placeholder }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-gray-200 rounded-xl p-4 outline-none resize-none min-h-30"
    />
  );
}