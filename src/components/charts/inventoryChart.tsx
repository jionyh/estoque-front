import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  scales: {
    y: {
      min: 0,
    },
  },
  plugins: {
    title: {
      display: true,
      text: "Evolução Estoque do item",
    },
    legend: {
      display: false,
    },
    tooltip: {
      displayColors: false,
      callbacks: {
        title: function (context: { label: any }[]) {
          let title = context[0].label;
          return `Data ${title}`;
        },
        label: function (context: TooltipItem<"line" | "bar">) {
          let label = context.dataset.label || "";

          if (label) {
            label += ": ";
          }
          if (context.parsed.y !== null) {
            label += `Quantitdade ${context.parsed.y.toFixed(2)}`;
          }
          return label;
        },
      },
    },
  },
};

type Props = {
  data: {
    date: string | null;
    quantity: number;
  }[];
};

export default function InventoryChart({ data }: Props) {
  const chartData = {
    labels: data.map((i) => i.date),
    datasets: [
      {
        label: "",
        data: data.map((i) => i.quantity),
      },
    ],
  };
  return <Line options={options} data={chartData} />;
}
