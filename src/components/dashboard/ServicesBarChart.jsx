import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ServicesPieChart() {
  const data = {
    labels: ["خدمة 1", "خدمة 2", "خدمة 3", "خدمة 4", "خدمة 5"],
    datasets: [
      {
        data: [28, 24, 19, 19, 28],
        borderWidth: 2,
        backgroundColor: ['#4f46e5', '#ef4444', '#f59e0b', '#06b6d4', '#10b981'],
        borderColor: '#ffffff',
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { boxWidth: 12, boxHeight: 12, color: '#4b5563' },
      },
    },
  };

  return <Pie data={data} options={options} />;
}