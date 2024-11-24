import React, { useEffect, useRef } from "react";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";

const MapComponent = ({ municipiosLayer, proyectosLayer }) => {
  const mapDiv = useRef(null);

  useEffect(() => {
    const map = new Map({
      basemap: "streets",
    });

    const view = new MapView({
      container: mapDiv.current,
      map: map,
      center: [-110.0, 25.0],
      zoom: 7,
    });

    if (municipiosLayer && proyectosLayer) {
      map.addMany([municipiosLayer, proyectosLayer]);
    }

    return () => {
      view.destroy();
    };
  }, [municipiosLayer, proyectosLayer]);

  return <div className="map-container" ref={mapDiv}></div>;
};

export default MapComponent;
