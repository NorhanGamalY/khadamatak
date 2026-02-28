import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function OrdersBarChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [
      {
        label: "Orders",
        data: [28, 19, 25, 36, 21, 16, 15, 20, 27],
        borderWidth: 0,
        borderRadius: 8,
        backgroundColor: [
          '#2f80ed',
          '#16a085',
          '#27ae60',
          '#2ecc71',
          '#f1c40f',
          '#f39c12',
          '#e67e22',
          '#9b59b6',
          '#d1d5db'
        ],
        maxBarThickness: 28,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
      title: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { maxRotation: 0, color: '#6b7280', display: false },
        stacked: false,
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: 50,
        grid: { color: "rgba(0,0,0,0.06)" },
        ticks: { color: '#6b7280', stepSize: 10 },
      },
    },
  };

  return <Bar data={data} options={options} />;
}