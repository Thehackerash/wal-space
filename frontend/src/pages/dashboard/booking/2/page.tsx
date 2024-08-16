import "bootstrap/dist/css/bootstrap.min.css";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input,
  Navbar,
  NavbarBrand
} from "reactstrap";

import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as tt from "@tomtom-international/web-sdk-maps";
import * as ttServices from "@tomtom-international/web-sdk-services";

const MAX_ZOOM = 17;

const Page = () => {
  const mapElement = useRef(null);
  const [mapLongitude, setMapLongitude] = useState(78.163641);
  const [mapLatitude, setMapLatitude] = useState(27.2504854);
  const [destinationLongitude, setDestinationLongitude] = useState(78.047);
  const [destinationLatitude, setDestinationLatitude] = useState(27.175);
  const [mapZoom, setMapZoom] = useState(13);
  const [map, setMap] = useState<any>(null);
  const [mapReady, setMapReady] = useState(false); // Track if the map is ready
  const markerRef = useRef<tt.Marker | null>(null);
  const routeRef = useRef<any>(null);

  const increaseZoom = () => {
    if (mapZoom < MAX_ZOOM) {
      setMapZoom(mapZoom + 1);
    }
  };

  const decreaseZoom = () => {
    if (mapZoom > 1) {
      setMapZoom(mapZoom - 1);
    }
  };

  const updateMap = () => {
    if (map) {
      map.setCenter([parseFloat(mapLongitude), parseFloat(mapLatitude)]);
      map.setZoom(mapZoom);
      if (markerRef.current) {
        markerRef.current.setLngLat([mapLongitude, mapLatitude]);
      }
    }
  };

  const drawRoute = (geoJson: any) => {
    if (map && mapReady) { // Check if map is ready
      console.log("drawing route");
      if (map.getLayer("route")) {
        map.getSource("route").setData(geoJson);
      } else {
        map.addLayer({
          id: "route",
          type: "line",
          source: {
            type: "geojson",
            data: geoJson,
          },
          paint: {
            "line-color": "#4a90e2",
            "line-width": 6,
          },
        });
      }
    } else {
      console.log("map not found or not ready");
    }
  };

  const calculateRoute = async () => {
    try {
      console.log("calculating route");
      const response = await ttServices.services.calculateRoute({
        key: "RfJj3m7PSpmEtNUjvnMfB6199cBz2bKX",
        locations: `${mapLongitude},${mapLatitude}:${destinationLongitude},${destinationLatitude}`,
        travelMode: 'truck', // Optional, based on your needs
      });
      // Convert the response to GeoJSON directly
      const geojson = response.toGeoJson();
      console.log("Route GeoJSON:", geojson);

      console.log("coordinates: ", geojson.features[0].geometry);
      drawRoute(geojson);
    } catch (error) {
      console.error("Error calculating the route: ", error);
    }
  };

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        console.log("route calculating");
        if (mapReady) { // Ensure the map is ready before calculating the route
          await calculateRoute();
          console.log("route calculated");
        }
      } catch (error) {
        console.error("Error during route calculation: ", error);
      }
    };

    fetchRoute();
  }, [mapReady, mapLongitude, mapLatitude, destinationLongitude, destinationLatitude]);

  useEffect(() => {
    let mapInstance = tt.map({
      key: "RfJj3m7PSpmEtNUjvnMfB6199cBz2bKX",
      container: mapElement.current,
      center: [mapLongitude, mapLatitude],
      zoom: mapZoom
    });

    markerRef.current = new tt.Marker().setLngLat([mapLongitude, mapLatitude]).addTo(mapInstance);

    setMap(mapInstance);
    setMapReady(true); // Set map as ready when it is initialized

    return () => {
      setMapReady(false); // Reset map ready state on cleanup
      mapInstance.remove();
    };
  }, []);

  return (
    <div className="App">
      <Navbar dark={true} style={{ backgroundColor: "#4287f5" }}>
        <NavbarBrand>Location to Destination</NavbarBrand>
      </Navbar>
      <Container className="mapContainer">
        <Row>
          <Col xs="4">
            <h4>Map Controls</h4>
            <FormGroup>
              <Label for="longitude">Source Longitude</Label>
              <Input
                type="text"
                name="longitude"
                value={mapLongitude}
                onChange={(e) => setMapLongitude(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="latitude">Source Latitude</Label>
              <Input
                type="text"
                name="latitude"
                value={mapLatitude}
                onChange={(e) => setMapLatitude(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="longitude">Destination Longitude</Label>
              <Input
                type="text"
                name="destinationLongitude"
                value={destinationLongitude}
                onChange={(e) => setDestinationLongitude(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="latitude">Destination Latitude</Label>
              <Input
                type="text"
                name="destinationLatitude"
                value={destinationLatitude}
                onChange={(e) => setDestinationLatitude(e.target.value)}
              />
            </FormGroup>
            <Col xs="12">
              <Row>Zoom</Row>
              <Row>
                <Button outline color="primary" onClick={decreaseZoom}>
                  -
                </Button>
                <div className="mapZoomDisplay">{mapZoom}</div>
                <Button outline color="primary" onClick={increaseZoom}>
                  +
                </Button>
              </Row>
            </Col>
            <Col xs="12">
              <Row className="updateButton">
                <Button color="primary" onClick={updateMap}>
                  Update Map
                </Button>
              </Row>
            </Col>
          </Col>
          <Col xs="8">
            <div ref={mapElement} className="mapDiv" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Page;
