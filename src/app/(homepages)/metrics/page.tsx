// import { ExpensesChart } from "@/src/components/charts/expenses-bar-chart";
import { cookies } from "next/headers";
import googleApi from "../../api/googlesheet";
import { Charts } from "@/src/components/charts/income-bar-chart";
import { InteractiveChart } from "@/src/components/charts/interactive-chart";
export default async function MetricsPage() {
  const cookie = cookies();
  const sheetUrl = cookie.get("sheetUrl");
  const data = sheetUrl ? await googleApi.transaccion.list(sheetUrl.value) : [];
  console.log(data);

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

  console.log(expensesData, incomeData);

  return (
    <div className="flex flex-col">
      <div>
        <h1 className="text-2xl font-semibold">Metrics</h1>
        <p className="text-gray-500">Here you can see your metrics</p>
      </div>
      <Charts expensesData={expensesData} incomeData={incomeData} />
      <InteractiveChart data={data} />
    </div>
  );
}
