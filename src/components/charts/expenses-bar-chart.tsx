"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../ui/chart";

interface Props {
  data: any[];
}

export function ExpensesChart({ data }: Props) {
  console.log("data", data);

  const ExpensesByType = data.reduce((acc, curr) => {
    const tipo = curr.tipo.trim();
    if (!acc[tipo]) {
      acc[tipo] = { tipo, gasto: 0 };
    }
    acc[tipo].gasto += curr.gasto;
    return acc;
  }, {});

  console.log(ExpensesByType);

  const dataFiltered = Object.values(ExpensesByType);

  const chartConfig = {
    gasto: {
      label: "Gasto",
      color: "hsl(var(--chart-5))",
    },
    tipo: {
      label: "Tipo",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;

  console.log("dataFiltered", dataFiltered);

  return (
    <div className="flex flex-col">
      <ChartContainer config={chartConfig} className="flex w-96">
        <BarChart accessibilityLayer data={dataFiltered}>
          <XAxis
            dataKey="tipo"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis />
          <ChartLegend content={<ChartLegendContent />} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="gasto" fill="var(--color-gasto)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
