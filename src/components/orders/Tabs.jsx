const TABS = [
  { key: "all", label: "جميع الطلبات" },
  { key: "pending", label: "قيد الانتظار" },
  { key: "running", label: "جاري التنفيذ" },
  { key: "done", label: "المكتملة" },
  { key: "canceled", label: "الملغاة" },
];

export default function Tabs({ active, onChange }) {
  return (
    <div className="flex gap-2 bg-gray-100 p-2 rounded-xl w-fit">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`px-4 py-2 rounded-lg text-md font-semibold
            ${
              active === tab.key &&
                 "bg-white text-orange-600 shadow"
                
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}