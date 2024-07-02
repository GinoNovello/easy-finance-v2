const googleApi = {
  transaccion: {
    list: async (name: string): Promise<GoogleSheetResponse[]> => {
      return fetch(name, { next: { revalidate: 6 } })
        .then((response) => response.text())
        .then((text) => {
          return text
            .split("\n")
            .slice(1)
            .map((row) => {
              const [fecha, gasto, tipo] = row.split("\t");

              return {
                fecha,
                gasto: parseFloat(gasto),
                tipo,
              };
            });
        });
    },
  },
};

export default googleApi;
