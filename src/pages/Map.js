import React, { useEffect, useState } from "react";
import MapComponent from "../components/Map";
import TOC from "../components/Toc";
import { createMunicipiosLayer, createProyectosLayer } from "../utils/arcgi";

export function Map() {
  const [municipiosLayer, setMunicipiosLayer] = useState(null);
  const [proyectosLayer, setProyectosLayer] = useState(null);

  useEffect(() => {
    // Inicializar capas
    const municipios = createMunicipiosLayer();
    const proyectos = createProyectosLayer();

    setMunicipiosLayer(municipios);
    setProyectosLayer(proyectos);
  }, []);

  return (
    <div className="map-container">
      <div className="toc-container">
        <TOC
          municipiosLayer={municipiosLayer}
          proyectosLayer={proyectosLayer}
        />
      </div>
      <div className="map-view">
        <MapComponent
          municipiosLayer={municipiosLayer}
          proyectosLayer={proyectosLayer}
        />
      </div>
    </div>
  );
}
