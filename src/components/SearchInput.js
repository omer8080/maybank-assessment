// SearchInput.js

import React, { useState } from "react";
import { AutoComplete } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaceData } from "../actions/placeActions";
import MapDisplay from "./MapDisplay";
import { Col, Row } from "antd";

const SearchInput = () => {
  const [query, setQuery] = useState("");
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const dispatch = useDispatch();
  const predictions = useSelector((state) => state?.placeData);

  const handleSearch = (value) => {
    setQuery(value);
    dispatch(fetchPlaceData(value));
  };

  const handleSelect = async (value, option) => {
    const selected = predictions.find(
      (prediction) => prediction.place_id === option.key
    );
    setSelectedPrediction(selected);
    const proxyUrl = "https://api.allorigins.win/get?url=";
    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${selected.place_id}&key=GOOGLE_MAP_API_KEY`;
    const placeDetailsResponse = await fetch(
      proxyUrl + encodeURIComponent(apiUrl)
    );
    const placeDetailsData = await placeDetailsResponse.json();
    const jsonData = JSON.parse(placeDetailsData.contents);
    const { lat, lng } = jsonData?.result?.geometry?.location;
    setSelectedPrediction({ ...selected, lat, lng });
  };

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
          <MapDisplay prediction={selectedPrediction} />
        </Col>
        <Col span={2}></Col>
      </Row>
    </div>
  );
};

export default SearchInput;