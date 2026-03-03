import React from "react";

export default function SelectField({
    title,
    id,
    value,
    onChange,
    options = [],
    placeholder = "اختر...",
    error,
    disabled = false,
}) {
    return (
    <div className="flex flex-col gap-2 w-full text-black">
    <label htmlFor={id} className="text-black">
        {title}
    </label>

    <select
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full border rounded-xl p-2 outline-none focus:ring-2 focus:ring-[#1e1855]
            ${error ? "border-red-500 focus:ring-red-300" : "border-[#e8e8f0]"}
            ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
        `}
    >
        <option value="">{placeholder}</option>
        {options.map((op) => (
        <option key={op.id} value={op.id}>
            {op.name}
        </option>
        ))}
    </select>

        {error ? <p className="text-red-600 text-xs">{error}</p> : null}
    </div>
    );
}