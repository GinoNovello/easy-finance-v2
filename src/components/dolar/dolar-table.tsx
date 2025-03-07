import { cn } from "@/src/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface Props {
  dolarValues: DolarResponse[];
}

export default async function DolarTable({ dolarValues }: Props) {
  return (
    <div className="flex justify-between w-full h-full gap-4 flex-col">
      <Table className="w-full">
        <TableHeader>
          <h2>Cotización dolar</h2>
          <TableRow>
            <TableHead className="w-1/3 rounded-tl-md">Dolar</TableHead>
            <TableHead className="w-1/3">Compra</TableHead>
            <TableHead className="w-1/3 rounded-tr-md">Venta</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dolarValues.map((dolar, index) => (
            <TableRow key={index} className="even:bg-primary/5">
              <TableCell
                className={cn(
                  "text-gray-300 text-ellipsis",
                  index === dolarValues.length - 1 ? "rounded-bl-md" : "",
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
                  index === dolarValues.length - 1 ? "rounded-br-md" : "",
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
