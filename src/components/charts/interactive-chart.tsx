"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/src/components/ui/chart";

const chartConfig = {
  monto: {
    label: "Monto",
  },
  income: {
    label: "Ingresos",
    color: "hsl(var(--chart-1))",
  },
  expense: {
    label: "Gastos",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

interface Props {
  data: any[];
}

export function InteractiveChart({ data }: Props) {
  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>("income");

  const expensesData = data.map(({ fecha, gasto, tipo }) => ({
    fecha,
    gasto,
    tipo,
  }));
  const incomeData = data.map(({ fechaIngr, ingreso, tipoIngr }) => ({
    fechaIngr,
    ingreso,
    tipoIngr,
  }));

  //   const total = React.useMemo(
  //     () => ({
  //       desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
  //       mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
  //     }),
  //     [],
  //   );

  const total = {
    income: incomeData.reduce((acc, curr) => acc + curr.ingreso, 0),
    expense: expensesData.reduce((acc, curr) => acc + curr.gasto, 0),
  };

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>
            Últimas transacciones de ingresos y gastos
          </CardDescription>
        </div>
        <div className="flex">
          {["income", "expense"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                type="button"
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={activeChart === "income" ? incomeData : expensesData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={activeChart === "income" ? "fechaIngr" : "fecha"}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const [day, month, year] = value.split("/");

                const [dayInt, monthInt, yearInt] = [
                  parseInt(day),
                  parseInt(month) - 1,
                  parseInt(year),
                ];
                const date = new Date(yearInt, monthInt, dayInt);

                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
              //   tickFormatter={(value) => {
              //     console.log(value);
              //     const valueFiltered = value.split;
              //     const date = new Date(valueFiltered);
              //     console.log(date);

              //     return date.toLocaleDateString("en-US", {
              //       month: "short",
              //       day: "numeric",
              //    });
              //    }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[250px]"
                  nameKey="monto"
                  labelFormatter={(value) => {
                    const [day, month, year] = value.split("/");
                    const [dayInt, monthInt, yearInt] = [
                      parseInt(day),
                      parseInt(month) - 1,
                      parseInt(year),
                    ];
                    const date = new Date(yearInt, monthInt, dayInt);

                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar
              dataKey={activeChart === "income" ? "ingreso" : "gasto"}
              fill={`var(--color-${activeChart})`}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
