import { GoogleSheetResponse } from "@/src/types/googlesheet/types";

const googleApi = {
  transaccion: {
    list: async (name: string): Promise<GoogleSheetResponse> => {
      try {
        const response = await fetch(name, { next: { revalidate: 6 } });
        const text = await response.text();

        const rows = text.trim().split("\n").slice(1);

        const expense = rows
          .map((row): ExpenseData => {
            const columns = row.split("\t");

            const [fecha, gasto, tipo] = columns;

            return {
              fecha,
              gasto: parseFloat(gasto),
              tipo,
            };
          })
          .filter((item) => !isNaN(item.gasto));
        const income = rows
          .map((row): IncomeData => {
            const columns = row.split("\t");
            const [fechaIngr, ingreso, tipoIngr] = columns.slice(4, 7);

            return {
              fechaIngr,
              ingreso: parseFloat(ingreso),
              tipoIngr,
            };
          })
          .filter((item) => !isNaN(item.ingreso));
        return {
          expense,
          income,
        };
      } catch (error) {
        console.error("Error fetching data from Google Sheets:", error);
        return { expense: [], income: [] };
      }
    },
  },
};

export default googleApi;
