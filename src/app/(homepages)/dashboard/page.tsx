import { DataTable } from "@/src/components/dashboard/data-table";
import Dolar from "@/src/components/dolar";
import { cookies } from "next/headers";
import googleApi from "../../api/googlesheet";
import { columns } from "@/src/components/dashboard/columns";

export default async function DashboardPage({ searchParams }: NextSSRParams) {
  const cookie = cookies();

  const sheetUrl = cookie.get("sheetUrl");
  const sheetName = cookie.get("sheetName");
  const data = sheetUrl ? await googleApi.transaccion.list(sheetUrl.value) : [];

  return (
    <>
      <h1 className="text-3xl font-semibold text-red-800">
        {sheetName?.value}
      </h1>
      <div className="container mx-auto py-10 gap-10 flex flex-col justify-center">
        <DataTable columns={columns} data={data} />
        <Dolar searchParams={searchParams} />
      </div>
    </>
  );
}