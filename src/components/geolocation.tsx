"use client";

import { useEffect } from "react";

export function GeoInfoComponent() {
  useEffect(() => {
    // Realiza una solicitud para obtener los datos de geo desde las cabeceras
    fetch(window.location.href)
      .then((response) => {
        console.log("Geo Country:", response.headers.get("X-Geo-Country"));
        console.log("Geo Region:", response.headers.get("X-Geo-Region"));
        console.log("Geo City:", response.headers.get("X-Geo-City"));
      })
      .catch((error) => console.error("Error fetching geo info:", error));
  }, []);

  return <div className="bg-black w-22">dadadada</div>;
}

export default GeoInfoComponent;
