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

export function IncomeChart({ data }: Props) {
  console.log("data", data);

  const IncomeByType = data.reduce((acc, curr) => {
    const tipoIngr = curr.tipoIngr.trim();
    if (!acc[tipoIngr]) {
      acc[tipoIngr] = { tipoIngr, ingreso: 0 };
    }
    acc[tipoIngr].ingreso += curr.ingreso;
    return acc;
  }, {});

  console.log(IncomeByType);

  const dataFiltered = Object.values(IncomeByType);

  const chartConfig = {
    ingreso: {
      label: "Ingreso",
      color: "hsl(var(--chart-5))",
    },
    tipoIngr: {
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
            dataKey="tipoIngr"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis />
          <ChartLegend content={<ChartLegendContent />} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="ingreso" fill="var(--color-ingreso)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
