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
  incomeData: IncomeData[];
  expensesData: ExpenseData[];
}

export function Charts({ incomeData, expensesData }: Props) {
  const IncomeByType = incomeData.reduce(
    (acc, curr) => {
      const tipoIngr = curr.tipoIngr.trim();
      if (!acc[tipoIngr]) {
        acc[tipoIngr] = { tipoIngr, ingreso: 0 };
      }
      acc[tipoIngr].ingreso += curr.ingreso;
      return acc;
    },
    {} as Record<string, { tipoIngr: string; ingreso: number }>,
  );

  const dataIncome = Object.values(IncomeByType);

  const chartIncomeConfig = {
    ingreso: {
      label: "Ingreso",
      color: "hsl(var(--chart-1))",
    },
    tipoIngr: {
      label: "Tipo",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;

  const ExpensesByType = expensesData.reduce(
    (acc, curr) => {
      const tipo = curr.tipo.trim();
      if (!acc[tipo]) {
        acc[tipo] = { tipo, gasto: 0 };
      }
      acc[tipo].gasto += curr.gasto;
      return acc;
    },
    {} as Record<string, { tipo: string; gasto: number }>,
  );

  console.log(ExpensesByType);

  const dataByExpenses = Object.values(ExpensesByType);

  const chartExpenseConfig = {
    gasto: {
      label: "Gasto",
      color: "hsl(var(--chart-5))",
    },
    tipo: {
      label: "Tipo",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;

  return (
    <div className="flex gap-4">
      <ChartContainer config={chartExpenseConfig} className="flex w-96">
        <BarChart accessibilityLayer data={dataByExpenses}>
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
      <ChartContainer config={chartIncomeConfig} className="flex w-96">
        <BarChart accessibilityLayer data={dataIncome}>
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
