import DeckGL from "@deck.gl/react";
import StaticMap from "react-map-gl";
import maplibregl, { NavigationControl } from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useState } from "react";

const page = () => {
  const [viewState, setViewState] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 1,
  });

        return (
          <div>
          {/* <DeckGL
            style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
            viewState={viewState}
            onViewStateChange={({ viewState }:any) => setViewState(viewState)}
            controller={true}
            layers={[]}
          >
            <StaticMap
              mapLib={maplibregl as any}
              mapStyle="https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json"
              transformRequest={(url, resourceType) => {
                url = url + `?api_key=${import.meta.env.VITE_BASE_MAP_API_KEY}}`;
                return { url, resourceType };
              }}
            />
          </DeckGL> */}
        </div>
        );
};

export default page