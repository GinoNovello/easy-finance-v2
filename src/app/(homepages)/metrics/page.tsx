import { cookies } from "next/headers";
import googleApi from "../../api/googlesheet";
import { Charts } from "@/src/components/charts/income-bar-chart";
import { InteractiveChart } from "@/src/components/charts/interactive-chart";
import { Suspense } from "react";
import { GoogleSheetResponse } from "@/src/types/googlesheet/types";

function LoadingPosts() {
  const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-linear-to-r before:from-transparent before:via-white/10 before:to-transparent`;
  return (
    <div className="col-span-4 space-y-4 lg:col-span-1 min-h-screen w-full mt-20">
      <div className={`relative rounded-xl bg-red-500 ${shimmer}`} />
      <div className="h-4 w-full rounded-lg bg-red-500" />
      <div className="h-6 w-1/3 rounded-lg bg-red-500" />
      <div className="h-4 w-full rounded-lg bg-red-500" />
      <div className="h-4 w-4/6 rounded-lg bg-red-500" />
    </div>
  );
}
export default async function MetricsPage() {
  const cookie = cookies();
  const sheetUrl = cookie.get("sheetUrl");
  const data: GoogleSheetResponse = await googleApi.transaccion.list(
    sheetUrl?.value || "",
  );

  return (
    <div className="flex flex-col">
      <div>
        <h1 className="text-2xl font-semibold">Metrics</h1>
        <p className="text-gray-500">¡Acá puedes ver las métricas!</p>
      </div>
      <Suspense fallback={<LoadingPosts />}>
        <Charts expensesData={data.expense} incomeData={data.income} />
      </Suspense>
      <Suspense fallback={<LoadingPosts />}>
        <InteractiveChart data={data} />
      </Suspense>
    </div>
  );
}
