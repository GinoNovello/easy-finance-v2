import { cn } from "@/src/lib/utils";
import { dolarOficialData, dolarBlueData, dolarMep } from "../api/dolarapi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

export default async function DolarPage() {
  const oficialData: DolarResponse = await dolarOficialData();
  const blueData: DolarResponse = await dolarBlueData();
  const mepData: DolarResponse = await dolarMep();

  const dataArray: DolarResponse[] = [oficialData, blueData, mepData];

  return (
    <div className="flex justify-center items-center h-full w-full p-20 text-green-300">
      <Table className="border border-secondary rounded-lg w-full max-w-4xl text-bold text-gray-200">
        <TableHeader className="text-bold text-black">
          <TableRow>
            <TableHead className="w-1/3 rounded-tl-lg">Dolar</TableHead>
            <TableHead className="w-1/3">Compra</TableHead>
            <TableHead className="w-1/3 rounded-tr-lg">Venta</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataArray.map((dolar, index) => (
            <TableRow key={index} className="even:bg-primary/5">
              <TableCell
                className={cn(
                  "text-gray-800 text-ellipsis",
                  index === dataArray.length - 1 ? "rounded-bl-lg" : "",
                )}
              >
                {dolar.nombre}
              </TableCell>
              <TableCell className="font-bold text-ellipsis">
                ${dolar.compra}
              </TableCell>
              <TableCell
                className={cn(
                  "font-bold text-ellipsis",
                  index === dataArray.length - 1 ? "rounded-br-lg" : "",
                )}
              >
                ${dolar.venta}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
