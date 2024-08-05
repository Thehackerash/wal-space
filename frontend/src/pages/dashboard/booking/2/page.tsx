import { Map as MapLibreMap, NavigationControl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import React, { useEffect, useState } from "react";

const page = () => {
    const [mapReady, setMapReady] = useState(false);

    useEffect(() => {
      if (!mapReady) return;

      const map = new MapLibreMap({
        container: "central-map",
        center: [0, 0],
        zoom: 0,
        style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
        transformRequest: (url, resourceType) => {
          url = url + `?api_key=${import.meta.env.VITE_BASE_MAP_API_KEY}`;
          return { url, resourceType };
        },
      });

      const nav = new NavigationControl({
        visualizePitch: true,
      });
      map.addControl(nav, "top-left");
    }, [mapReady]);

        return (
          <div
            style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
            ref={() => setMapReady(true)}
            id="central-map"
          />
        );
};

export default page