import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import esriConfig from "@arcgis/core/config";

// Configurar la clave de acceso
esriConfig.apiKey = process.env.apiKey;

// URLS
export const MUNICIPIOS_URL =
  "https://services6.arcgis.com/cdylwBTTDF2F9FTY/ArcGIS/rest/services/BCS/FeatureServer";
export const PROYECTOS_URL =
  "https://services6.arcgis.com/cdylwBTTDF2F9FTY/ArcGIS/rest/services/CAPA_PROYECTOS/FeatureServer";

// Municipios
export const createMunicipiosLayer = () => {
  return new FeatureLayer({
    url: MUNICIPIOS_URL,
    title: "Municipios",
    outFields: ["*"],
    visible: true,
  });
};

// Proyectos
export const createProyectosLayer = () => {
  return new FeatureLayer({
    url: PROYECTOS_URL,
    title: "Proyectos",
    outFields: ["*"],
    visible: true,
  });
};

export const toggleLayerVisibility = (layer, visible) => {
  if (layer) {
    layer.visible = visible;
  } else {
    console.error("Capa no inicializada");
  }
};
