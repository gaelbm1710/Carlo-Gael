import React, { useState, useEffect, forwardRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { createProyectosLayer } from "../utils/arcgi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const InventarioChart = forwardRef((props, ref) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Total Unidades",
        data: [],
        borderColor: "#E83D49",
        fill: false,
      },
      {
        label: "Promedio Precio (ABS/MES)",
        data: [],
        borderColor: "#07325D",
        fill: false,
      },
    ],
  });

  useEffect(() => {
    const loadData = async () => {
      const proyectosLayer = createProyectosLayer();
      const query = proyectosLayer.createQuery();
      query.where = "1=1";
      query.outFields = ["UDS_TOT", "ABS_MES"];
      query.returnGeometry = false;

      try {
        const response = await proyectosLayer.queryFeatures(query);

        const labels = [];
        const udsTot = [];
        const absMes = [];

        response.features.forEach((feature, index) => {
          labels.push(`Proyecto ${index + 1}`);
          udsTot.push(feature.attributes["UDS_TOT"]);
          absMes.push(feature.attributes["ABS_MES"]);
        });

        setChartData({
          labels,
          datasets: [
            {
              label: "Total Unidades",
              data: udsTot,
              borderColor: "#E83D49",
              fill: false,
            },
            {
              label: "Promedio Precio (ABS/MES)",
              data: absMes,
              borderColor: "#07325D",
              fill: false,
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

  return (
    <div>
      <h3>Inventario por Precio</h3>
      <Line ref={ref} data={chartData} />
    </div>
  );
});

export default InventarioChart;
