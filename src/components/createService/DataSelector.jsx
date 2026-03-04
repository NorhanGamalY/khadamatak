export default function DateSelector({ days, selectedDay, setSelectedDay }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {days.map((day) => (
        <button
          key={day.date}
          onClick={() => setSelectedDay(day)}
          className={`flex flex-col items-center justify-center rounded-xl px-2 py-2 transition-colors duration-150
            ${
              selectedDay?.date === day.date
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-700 border-gray-300"
            }`}
        >
          <span className="text-xs">{day.name}</span>
          <span className="text-sm font-semibold mt-1">{day.date}</span>
        </button>
      ))}
    </div>
  );
}