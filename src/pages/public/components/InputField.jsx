import React from "react";

export default function InputField({
  title,
  fieldPlaceholder,
  id,
  inputType,
  value,
  onChange,
  error,
  disabled = false,
}) {
  return (
    <div className="flex flex-col gap-2 w-full text-black">
      <label htmlFor={id} className="text-black">
        {title}
      </label>

      <input
        id={id}
        type={inputType}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={fieldPlaceholder}
        className={`w-full placeholder-gray-500 border rounded-xl p-2 outline-none focus:ring-2 focus:ring-[#1e1855] placeholder-opacity-50
          ${error ? "border-red-500 focus:ring-red-300" : "border-[#e8e8f0]"}
          ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
        `}
      />

      {error ? <p className="text-red-600 text-xs">{error}</p> : null}
    </div>
  );
}
