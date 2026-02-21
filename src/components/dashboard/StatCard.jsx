export default function StatCard({ title, value, icon, trend }) {
  const isUp = trend?.direction === "up";
  const trendArrow = isUp ? "↑" : "↓";

  return (
    <div className="bg-white p-4 shadow-xl ring-1 ring-black/5">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-3">
            
          <div className="text-3xl font-bold ">{value}</div>
             <div className="text-xl font-semibold ">{title}</div>

          {trend && (
            <div className="text-lg font-medium ">
              {trendArrow} {trend.value}% {trend.label ? `- ${trend.label}` : ""}
            </div>
          )}
        </div>

        <div className="flex h-10 w-10 items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
}