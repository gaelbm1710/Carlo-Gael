import React, { useEffect, useState } from "react";
import { createProyectosLayer } from "../utils/arcgi";

const KPIs = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadKPIData = async () => {
      const proyectosLayer = createProyectosLayer();
      const query = proyectosLayer.createQuery();
      query.outFields = ["UDS_TOT", "UDS_DISP", "F__UD_PROM"];
      query.returnGeometry = false;

      try {
        const response = await proyectosLayer.queryFeatures(query);

        const totalProyectos = response.features.length;
        const totalUnidades = response.features.reduce(
          (sum, feature) => sum + (feature.attributes["UDS_TOT"] || 0),
          0
        );
        const unidadesDisponibles = response.features.reduce(
          (sum, feature) => sum + (feature.attributes["UDS_DISP"] || 0),
          0
        );
        const precioPromedio =
          response.features.reduce(
            (sum, feature) => sum + (feature.attributes["F__UD_PROM"] || 0),
            0
          ) / totalProyectos;

        setData({
          projects: totalProyectos,
          unitsTot: totalUnidades,
          unitsAvailable: unidadesDisponibles,
          avgPrice: precioPromedio.toFixed(2),
        });
      } catch (error) {
        console.error("Error al cargar datos de proyectos:", error);
        setData({
          projects: 0,
          unitsTot: 0,
          unitsAvailable: 0,
          avgPrice: 0,
        });
      }
    };

    loadKPIData();
  }, []);

  if (!data) {
    return <p>Cargando KPIs...</p>;
  }

  return (
    <div className="kpis">
      <h3>Indicadores Clave</h3>
      <ul>
        <li>Proyectos: {data.projects}</li>
        <li>Unidades Totales: {data.unitsTot}</li>
        <li>Unidades Disponibles: {data.unitsAvailable}</li>
        <li>Precio Promedio: ${data.avgPrice}</li>
      </ul>
    </div>
  );
};

export default KPIs;
