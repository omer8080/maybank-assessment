// MapDisplay.js

import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapDisplay = ({ prediction }) => {
  // eslint-disable-next-line no-unused-vars
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const defaultCenter = {
    lat: -3.745,
    lng: -38.523,
  };

  const center = prediction ? { lat: prediction.lat, lng: prediction.lng } : defaultCenter;

  return (
    <LoadScript googleMapsApiKey="GOOGLE_MAP_API_KEY" style={{ marginTop: "50px" }}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
      >
        {prediction && (
          <Marker position={{ lat: prediction.lat, lng: prediction.lng }} />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapDisplay;
