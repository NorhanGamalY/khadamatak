const tabs = [
  { key: "all", label: "كل الطلبات" },
  { key: "new", label: "الطلبات الجديدة" },
  { key: "inProgress", label: "الطلبات الجارية" },
  { key: "completed", label: "الطلبات المنتهية" },
];

const OrdersTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-wrap gap-3 rounded-2xl bg-white p-3 shadow-sm">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;

        return (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-[#2E236C] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default OrdersTabs;
