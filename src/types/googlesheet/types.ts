import { ColumnDef } from "@tanstack/react-table";

export interface ExpenseData {
  fecha: string;
  gasto: number;
  tipo: string;
}

export interface IncomeData {
  fechaIngr: string;
  ingreso: number;
  tipoIngr: string;
}

export interface GoogleSheetResponse {
  expense: ExpenseData[];
  income: IncomeData[];
}

export type FinanceOptions = "expense" | "income";

export interface FinanceColumns {
  income: ColumnDef<IncomeData>[];
  expense: ColumnDef<ExpenseData>[];
}

export interface FinanceData {
  income: IncomeData[];
  expense: ExpenseData[];
}
