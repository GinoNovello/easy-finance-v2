"use client";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";

export const columns = {
  income: [
    {
      accessorKey: "fechaIngr",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Fecha
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const fechaStr = row.getValue("fechaIngr");

        if (typeof fechaStr === "string") {
          return <div className="text-left font-medium">{fechaStr}</div>;
        }

        return <div className="text-left font-medium">Invalid date</div>;
      },
    },
    {
      accessorKey: "tipoIngr",
      header: ({ column }) => {
        return (
          <div className="text-center justify-center flex items-center">
            <Button
              className="justify-center"
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Tipo
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const type = row.original;
        return (
          <div className=" font-medium text-center justify-center flex items-center">
            {type.tipoIngr}
          </div>
        );
      },
    },
    {
      accessorKey: "ingreso",
      header: ({ column }) => {
        return (
          <div className="text-right justify-end items-center flex">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Ingreso
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const gasto = parseFloat(row.getValue("ingreso"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(gasto);
        return (
          <div className="text-right justify-end items-center flex font-medium">
            {formatted}
          </div>
        );
      },
    },
    {
      header: () => <div className="text-center">Actions</div>,
      id: "actions",
      cell: ({ row }) => {
        const payment = row.original;

        return (
          <div className="flex items-center justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                className="flex items-center justify-center"
              >
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() =>
                    navigator.clipboard.writeText(payment.ingreso.toString())
                  }
                >
                  Copiar el ingreso
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => alert("Editar ingreso")}>
                  Editar ingreso
                </DropdownMenuItem>
                <DropdownMenuItem>View payment details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ] as ColumnDef<IncomeData>[],
  expense: [
    {
      accessorKey: "fecha",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Fecha
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const fechaStr = row.getValue("fecha");

        if (typeof fechaStr === "string") {
          return <div className="text-left font-medium">{fechaStr}</div>;
        }

        return <div className="text-left font-medium">Invalid date</div>;
      },
    },
    {
      accessorKey: "tipo",
      header: ({ column }) => {
        return (
          <div className="text-center justify-center flex items-center">
            <Button
              className="justify-center"
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Tipo
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const type = row.original;
        return (
          <div className=" font-medium text-center justify-center flex items-center">
            {type.tipo}
          </div>
        );
      },
    },
    {
      accessorKey: "gasto",
      header: ({ column }) => {
        return (
          <div className="text-right justify-end items-center flex">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Gasto
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const gasto = parseFloat(row.getValue("gasto")); // toDo: Hacer que el row.original en todos los casos de tipo row
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(gasto);
        // sortingFns: myCustomSortingFn(row, row, "gasto");
        return (
          <div className="text-right justify-end items-center flex font-medium">
            {formatted}
          </div>
        );
      },
    },
    {
      header: () => <div className="text-center">Actions</div>,
      id: "actions",
      cell: ({ row }) => {
        const payment = row.original;

        return (
          <div className="flex items-center justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                className="flex items-center justify-center"
              >
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() =>
                    navigator.clipboard.writeText(payment.gasto.toString())
                  }
                >
                  Copiar el gasto
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => alert("Editar gasto")}>
                  Editar gasto
                </DropdownMenuItem>
                <DropdownMenuItem>View payment details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ] as ColumnDef<ExpenseData>[],
};
