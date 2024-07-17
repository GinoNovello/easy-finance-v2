const googleApi = {
  transaccion: {
    list: async (name: string): Promise<GoogleSheetResponse[]> => {
      try {
        const response = await fetch(name, { next: { revalidate: 6 } });
        const text = await response.text();

        // Verifica si el texto está en el formato esperado
        if (!text.includes("\t")) {
          console.error("Data does not seem to be tab-separated.");
          return [];
        }

        const rows = text.trim().split("\n").slice(1);

        const result = rows.map((row): GoogleSheetResponse | null => {
          const columns = row.split("\t");

          if (columns.length < 6) {
            console.error("No tenes las columnas necesarias:", row);
            return null;
          }

          const [fecha, gasto, tipo, , fechaIngr, ingreso, tipoIngr] = columns;
          // console.log(fechaIngr, ingreso, tipoIngr);

          return {
            fecha,
            gasto: parseFloat(gasto),
            tipo,
            fechaIngr,
            ingreso: parseFloat(ingreso),
            tipoIngr,
          };
        });

        // Filtrar filas nulas y retornar
        return result.filter(
          (item): item is GoogleSheetResponse => item !== null,
        );
      } catch (error) {
        console.error("Error fetching data from Google Sheets:", error);
        return [];
      }
    },
  },
};

export default googleApi;
