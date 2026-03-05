export default function ServiceDropdown({
  services = [],
  selectedService,
  setSelectedService
}) {
  return (
    <select
      value={selectedService?.id || ""}
      onChange={(e) => {
        const service = services.find(
          (s) => s.id === Number(e.target.value)
        );
        setSelectedService(service);
      }}
      className="w-full bg-white border border-gray-300 rounded-xl p-3"
    >
      <option value="">اختر الخدمة</option>

      {services.map((service) => (
        <option key={service.id} value={service.id}>
          {service.name} - {service.price} ج
        </option>
      ))}
    </select>
  );
}