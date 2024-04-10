import React, { useCallback, useEffect, useState } from "react";
import { AutoComplete } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaceData } from "../actions/placeActions";
import MapDisplay from "./MapDisplay";
import { Col, Row } from "antd";

const SearchInput = () => {
  const [query, setQuery] = useState("");
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const dispatch = useDispatch();
  const predictions = useSelector((state) => state?.placeData);

  useEffect(() => {
    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting current position:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleSearch = (value) => {
    setQuery(value);
    dispatch(fetchPlaceData(value));
  };

  const handleSelect = useCallback(async (value, option) => {
    const selected = predictions.find(
      (prediction) => prediction.place_id === option.key
    );
    setSelectedPrediction(selected);
    const proxyUrl = "/api/api/api/place/details/json?";
    const apiUrl = `place_id=${selected.place_id}&key=GOOGLE_MAP_API_KEY`;
    const placeDetailsResponse = await fetch(
      proxyUrl + apiUrl
    );
    const placeDetailsData = await placeDetailsResponse.json();
    const { lat, lng } = placeDetailsData?.result?.geometry?.location;
    setSelectedPrediction({ ...selected, lat, lng });
  }, [predictions]);

  return (
    <div>
      <Row style={{"marginTop":"15px"}}>
        <Col span={8}></Col>
        <Col span={8}>
          <AutoComplete
            style={{ width: 600 }}
            value={query}
            onChange={handleSearch}
            onSelect={handleSelect}
            placeholder="Search for places"
            options={predictions?.map((prediction) => ({
              value: prediction.description,
              key: prediction.place_id,
            }))}
          />
        </Col>
        <Col span={8}></Col>
      </Row>
      <Row style={{"marginTop":"50px"}}>
        <Col span={2}></Col>
        <Col span={20}>
          <MapDisplay prediction={selectedPrediction} defaultPosition={currentLocation} />
        </Col>
        <Col span={2}></Col>
      </Row>
    </div>
  );
};

export default SearchInput;
