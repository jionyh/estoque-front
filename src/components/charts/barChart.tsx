"use client";

import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Remédio A",
    total: 7,
  },
  {
    name: "Papel Sulfite A4",
    total: 20,
  },
  {
    name: "Remedio 3",
    total: 7,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={280} height={200} data={data} barSize={20}>
        <XAxis
          padding={{ left: 0 }}
          dataKey="name"
          stroke="#888888"
          fontSize={10}
          tickLine={false}
          axisLine={false}
          angle={-35} // Define o ângulo de inclinação como -45 graus
          textAnchor="middle" // Ancoragem do texto no final
          tickFormatter={(value: string) => `${value.substring(0, 8)}`}
        />
        <YAxis
          padding={{ bottom: 10 }}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
