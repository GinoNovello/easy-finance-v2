"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input-sec";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  FinanceOptions,
  FinanceColumns,
  FinanceData,
} from "@/src/types/googlesheet/types";

type ColumnSort = {
  id: string;
  desc: boolean;
};
type SortingState = ColumnSort[];

interface DataTableProps {
  columns: FinanceColumns;
  data: FinanceData;
}

export function DataTable({ columns, data }: DataTableProps) {
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 6, //default page size
  });
  const [tipoGasto, setTipoGasto] = useState<FinanceOptions>("income");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearch] = useState("");
  const table = useReactTable({
    data: data[tipoGasto] as any[], // Necesario para manejar ambos tipos
    columns: columns[tipoGasto] as ColumnDef<any>[], // Necesario para manejar ambos tipos
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,

    state: {
      pagination,
      sorting,
      globalFilter: search,
    },
  });

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex justify-between items-center w-full">
        <Input
          className="max-w-56 focus-visible:border-gray-400 border-gray-600 focus-visible:border rounded-md bg-secondary"
          id="searchTable"
          placeholder="Buscar en la tabla..."
          onChange={(event) => setSearch(event.currentTarget.value)}
        />
        <div className="text-end flex justify-center items-center gap-2">
          <Button
            variant="default"
            onClick={() => setTipoGasto("expense")}
            data-state={tipoGasto === "expense" && "selected"}
          >
            Gastos
          </Button>
          <Button
            variant="default"
            onClick={() => setTipoGasto("income")}
            data-state={tipoGasto === "income" && "selected"}
          >
            Ingresos
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="dark:even:bg-primary/10 "
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns[tipoGasto].length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center gap-2 py-2 p-2 justify-between">
        <Button
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Atrás
        </Button>
        <Button
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
