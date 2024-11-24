import React, { useRef, useState, useEffect } from "react";
import KPIs from "../components/kpis";
import InventarioChart from "../components/Inventario";
import GenderPopulation from "../components/Population";
import ProyectosChart from "../components/Proyectos";
import { Button } from "semantic-ui-react";
import PdfGenerator from "../utils/pdfgenetaror";
import { getMapScreenshot } from "../utils/mapUtils";
import { createProyectosLayer } from "../utils/arcgi";

export function Dashboard() {
  const inventoryRef = useRef(null);
  const populationRef = useRef(null);
  const projectsRef = useRef(null);
  const [kpiData, setKpiData] = useState(null);

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

        setKpiData({
          projects: totalProyectos,
          unitsTot: totalUnidades,
          unitsAvailable: unidadesDisponibles,
          avgPrice: precioPromedio.toFixed(2),
        });
      } catch (error) {
        console.error("Error al cargar datos de KPIs:", error);
        setKpiData({
          projects: 0,
          unitsTot: 0,
          unitsAvailable: 0,
          avgPrice: 0,
        });
      }
    };

    loadKPIData();
  }, []);

  const handleGeneratePdf = async () => {
    const charts = {
      inventoryChart: inventoryRef.current?.toBase64Image(),
      populationChart: populationRef.current?.toBase64Image(),
      projectsChart: projectsRef.current?.toBase64Image(),
    };

    const mapImage = await getMapScreenshot();

    if (kpiData) {
      PdfGenerator(kpiData, charts, mapImage);
    } else {
      console.error("Datos de KPIs no disponibles");
    }
  };

  return (
    <div>
      <div>
        <Button onClick={handleGeneratePdf}>Generar PDF</Button>
        {kpiData && <KPIs data={kpiData} />}
      </div>
      <div>
        <InventarioChart ref={inventoryRef} />
      </div>
      <div>
        <GenderPopulation ref={populationRef} />
      </div>
      <div>
        <ProyectosChart ref={projectsRef} />
      </div>
    </div>
  );
}
