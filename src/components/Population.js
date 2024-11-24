import React, { useState, useEffect, forwardRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { createMunicipiosLayer } from "../utils/arcgi";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GenderPopulation = forwardRef((props, ref) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Hombres",
        data: [],
        backgroundColor: "#07325D",
      },
      {
        label: "Mujeres",
        data: [],
        backgroundColor: "#E83D49",
      },
    ],
  });

  useEffect(() => {
    const loadData = async () => {
      const municipiosLayer = createMunicipiosLayer();
      const query = municipiosLayer.createQuery();
      query.outFields = ["NOMGEO", "POB42", "POB84"];
      query.returnGeometry = false;

      try {
        const response = await municipiosLayer.queryFeatures(query);

        const labels = [];
        const malePopulation = [];
        const femalePopulation = [];

        response.features.forEach((feature) => {
          labels.push(feature.attributes["NOMGEO"]);
          malePopulation.push(feature.attributes["POB84"]);
          femalePopulation.push(feature.attributes["POB42"]);
        });

        setChartData({
          labels,
          datasets: [
            {
              label: "Hombres",
              data: malePopulation,
              backgroundColor: "#07325D",
            },
            {
              label: "Mujeres",
              data: femalePopulation,
              backgroundColor: "#E83D49",
            },
          ],
        });
      } catch (error) {
        console.error(
          "Error al cargar los datos de la capa de municipios:",
          error
        );
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <h3>Comparativa Población por Municipio</h3>
      <Bar ref={ref} data={chartData} />
    </div>
  );
});

export default GenderPopulation;
