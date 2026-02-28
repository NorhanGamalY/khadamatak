import CountUp from "react-countup";

function Stat({ value, label }) {
  const str = String(value).trim();
  const hasPlus = str.includes("+");
  const isPercent = str.includes("%");
  const isK = /k/i.test(str);

  const numStr = str.replace(/[^\d.]/g, "");
  const n = numStr ? Number(numStr) : 0;

  return (
    <div className="flex flex-col items-center justify-center min-w-[120px]">
      <div className="text-3xl font-bold mb-5">
        <CountUp
          end={n}
          duration={1.2}
          enableScrollSpy
          scrollSpyOnce
          separator=","
        />
        {isK && "K"}
        {hasPlus && "+"}
        {isPercent && "%"}
      </div>
      <div className="text-lg opacity-90">{label}</div>
    </div>
  );
}
export default function StatsHero() {
  return (
    <section dir="rtl" className="w-full pt-20 my-10">
      <div className="mx-auto w-full max-w-[1200px] px-4">
        <div className="rounded-2xl bg-[#1E1855] text-white px-4 sm:px-6 py-8">
          <div className="flex flex-wrap justify-center lg:justify-between gap-8 text-center">
            <Stat value="10+" label="سنة" />
            <Stat value="50K+" label="عميل" />
            <Stat value="100+" label="قصص" />
            <Stat value="40+" label="جائزة" />
            <Stat value="97%" label="الرضا" />
          </div>
        </div>
      </div>
    </section>
  );
}
