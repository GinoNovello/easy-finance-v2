const BASE_URL = "https://dolarapi.com/v1/dolares";
const DYNAMIC_DOLAR = "dolarapi.com/v1/cotizaciones/usd";

export const dynamicDolarData = async (country: string) => {
  const res = await fetch(`https://${country}.${DYNAMIC_DOLAR}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Error al traer los datos");
  }
  const data = await res.json();
  return data;
};

export const dolarOficialData = async (): Promise<DolarResponse> => {
  const res = await fetch(`${BASE_URL}/oficial`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error("Error al traer los datos");
  }
  const data = await res.json();
  return data;
};

export const dolarBlueData = async (): Promise<DolarResponse> => {
  const res = await fetch(`${BASE_URL}/blue`, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error("Error al traer los datos");
  }
  const data = await res.json();
  return data;
};

export const dolarMep = async (): Promise<DolarResponse> => {
  const res = await fetch(`${BASE_URL}/contadoconliqui`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error("Error al traer los datos");
  }
  const data = await res.json();
  return data;
};
