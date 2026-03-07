export default function TimeSelector({ times, selectedTime, setSelectedTime }) {
  return (
    <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
      {times.map((time) => (
        <button
          key={time}
          onClick={() => setSelectedTime(time)}
          className={`px-4 py-2 rounded-full text-sm border-2 transition-colors duration-150
            ${
              selectedTime === time
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-700 border-gray-300"
            }`}
        >
          {time}
        </button>
      ))}
    </div>
  );
}