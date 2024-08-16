import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useRef } from "react";
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
import axios from "axios";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as tt from "@tomtom-international/web-sdk-maps";
import * as ttServices from "@tomtom-international/web-sdk-services";

const MAX_ZOOM = 17;
const API_KEY = "RfJj3m7PSpmEtNUjvnMfB6199cBz2bKX"; // Your actual API key

const Page = () => {
  const mapElement = useRef(null);
  const [sourceAddress, setSourceAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
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
    if (map && mapReady) {
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
    }
  };

  const calculateRoute = async () => {
    try {
      const response = await ttServices.services.calculateRoute({
        key: API_KEY,
        locations: `${mapLongitude},${mapLatitude}:${destinationLongitude},${destinationLatitude}`,
        travelMode: "truck", // Optional, based on your needs
      });
      const geojson = response.toGeoJson();
      drawRoute(geojson);
    } catch (error) {
      console.error("Error calculating the route: ", error);
    }
  };

  const convertAddressToCoordinates = async (address: string) => {
    try {
      const response = await axios.get(
        `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(address)}.json?key=${API_KEY}`
      );
      const { lat, lon } = response.data.results[0].position;
      return { latitude: lat, longitude: lon };
    } catch (error) {
      console.error("Error converting address to coordinates:", error);
      return null;
    }
  };

  const handleUpdateCoordinates = async () => {
    const sourceCoords = await convertAddressToCoordinates(sourceAddress);
    const destinationCoords = await convertAddressToCoordinates(destinationAddress);

    if (sourceCoords && destinationCoords) {
      setMapLongitude(sourceCoords.longitude);
      setMapLatitude(sourceCoords.latitude);
      setDestinationLongitude(destinationCoords.longitude);
      setDestinationLatitude(destinationCoords.latitude);
      updateMap();
      calculateRoute(); // Recalculate the route with new coordinates
    }
  };

  useEffect(() => {
    let mapInstance = tt.map({
      key: API_KEY,
      container: mapElement.current,
      center: [mapLongitude, mapLatitude],
      zoom: mapZoom,
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
              <Label for="sourceAddress">Source Address</Label>
              <Input
                type="text"
                name="sourceAddress"
                value={sourceAddress}
                onChange={(e) => setSourceAddress(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="destinationAddress">Destination Address</Label>
              <Input
                type="text"
                name="destinationAddress"
                value={destinationAddress}
                onChange={(e) => setDestinationAddress(e.target.value)}
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
                <Button color="primary" onClick={handleUpdateCoordinates}>
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
