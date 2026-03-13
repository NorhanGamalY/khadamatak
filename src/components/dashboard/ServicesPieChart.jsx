import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ServicesPieChart({craftsmen}) {
const serviceCounts = {};

  craftsmen.forEach((c) => {
    c.services.forEach((service) => {
      const name = service.serviceCategoreyName;
      serviceCounts[name] = (serviceCounts[name] || 0) + 1;
    });
  });

  const labels = Object.keys(serviceCounts);
  const dataValues = Object.values(serviceCounts);

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
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