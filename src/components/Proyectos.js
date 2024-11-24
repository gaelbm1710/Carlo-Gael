import React, { useState, useEffect, forwardRef } from "react";
import { Pie } from "react-chartjs-2";
import { createProyectosLayer } from "../utils/arcgi";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ProyectosChart = forwardRef((props, ref) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const proyectosLayer = createProyectosLayer();
      const query = proyectosLayer.createQuery();
      query.outFields = ["UDS_TOT", "UDS_VEND"];
      query.returnGeometry = false;

      try {
        const response = await proyectosLayer.queryFeatures(query);
        let udsTot = 0;
        let udsVen = 0;

        response.features.forEach((feature) => {
          udsTot += feature.attributes["UDS_TOT"] || 0;
          udsVen += feature.attributes["UDS_VEND"] || 0;
        });

        setChartData({
          labels: ["Vendidas", "Disponibles"],
          datasets: [
            {
              data: [udsVen, udsTot - udsVen],
              backgroundColor: ["#E83D49", "#A39667"],
            },
          ],
        });
      } catch (error) {
        console.error(
          "Error al cargar los datos de la capa de proyectos:",
          error
        );
      }
    };

    loadData();
  }, []);

  if (!chartData) {
    return <div>Cargando datos...</div>;
  }

  return (
    <div>
      <h3>Proyectos: Unidades Vendidas vs Disponibles</h3>
      <Pie ref={ref} data={chartData} />
    </div>
  );
});

export default ProyectosChart;
