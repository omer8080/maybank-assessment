import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapDisplay = ({ prediction, defaultPosition }) => {
  // eslint-disable-next-line no-unused-vars
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = prediction ? { lat: prediction.lat, lng: prediction.lng } : defaultPosition;

  return (
    <LoadScript googleMapsApiKey="GOOGLE_MAP_API_KEY" style={{ marginTop: "50px" }}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
      >
        {(prediction || defaultPosition) && (
          <Marker position={prediction ? { lat: prediction.lat, lng: prediction.lng } : defaultPosition} />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapDisplay;
