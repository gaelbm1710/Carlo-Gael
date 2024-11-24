import React, { useState } from "react";
import { toggleLayerVisibility } from "../utils/arcgi";

const TOC = ({ municipiosLayer, proyectosLayer }) => {
  const [visibility, setVisibility] = useState({
    municipios: true,
    proyectos: true,
  });

  const toggleLayer = (layerKey) => {
    const layer = layerKey === "municipios" ? municipiosLayer : proyectosLayer;

    if (!layer) {
      console.error(`La capa ${layerKey} no está inicializada.`);
      return;
    }

    toggleLayerVisibility(layer, !visibility[layerKey]);
    setVisibility({ ...visibility, [layerKey]: !visibility[layerKey] });
  };

  return (
    <div className="toc">
      <h3>Capas</h3>
      <div>
        <label>
          <input
            type="checkbox"
            checked={visibility.municipios}
            onChange={() => toggleLayer("municipios")}
          />
          Municipios
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={visibility.proyectos}
            onChange={() => toggleLayer("proyectos")}
          />
          Proyectos
        </label>
      </div>
    </div>
  );
};

export default TOC;
