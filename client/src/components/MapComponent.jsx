
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

// Default icon or custom icon URL
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41], 
  iconAnchor: [12, 41], 
  popupAnchor: [1, -34], 
});

const MapView = ({ latitude, longitude, onMarkerDragEnd }) => {
  const map = useMap();

  useEffect(() => {
    if (latitude && longitude) {
      map.setView([latitude, longitude], 15);
    }
  }, [latitude, longitude, map]);

  useMapEvents({
    dragend() {
      const { lat, lng } = map.getCenter();
      onMarkerDragEnd(lat, lng);
    }
  });

  return null;
};

const MapLocationPicker = ({ landmark, city, formData, handleChange }) => {
  const [locationText, setLocationText] = useState('Fetching location...');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [dragged, setDragged] = useState(false);


  useEffect(() => {
    setDragged(false); 
  }, [landmark, city]);

  // Fetch geolocation from browser API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          setLocationText(`Live Location`);
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setLocationText("Permission denied. Please enable location access.");
              break;
            case error.POSITION_UNAVAILABLE:
              setLocationText("Location information is unavailable. Please enter your location manually.");
              break;
            case error.TIMEOUT:
              setLocationText("The request to get your location timed out.");
              break;
            default:
              setLocationText("An unknown error occurred.");
              break;
          }
        }
      );
    } else {
      setLocationText('Geolocation is not supported by this browser.');
    }
  }, []);

  // UseEffect to fetch location from landmark and city when they change
  useEffect(() => {
    if (landmark && city && !dragged) { 
      const locationQuery = `${landmark}, ${city}`;
      axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: locationQuery,
          format: 'json',
          limit: 1,
        },
      })
      .then(response => {
        if (response.data.length > 0) {
          const { lat, lon } = response.data[0];
          setLatitude(parseFloat(lat));
          setLongitude(parseFloat(lon));


          setLocationText(`Manual Location`);


          handleChange('latitude', parseFloat(lat));
          handleChange('longitude', parseFloat(lon));
        } else {
          setLocationText('Please wait or try a different Landmark...');
        }
      })
      .catch(error => {
        setLocationText('Network error...');
      });
    }
  }, [landmark, city, handleChange, dragged]);


  const handleMarkerDragEnd = (lat, lng) => {
    setLatitude(lat);
    setLongitude(lng);
    setDragged(true); 
    setLocationText(`Pinpoint Location`);


    handleChange('latitude', lat);
    handleChange('longitude', lng);
  };

  return (
    <div>
      <div className="p-4 bg-white rounded-lg shadow-lg border border-gray-300">
      <h3 className="text-xl font-semibold text-middleGreen mb-4"> { locationText}  </h3>
      <p className="text-gray-700">
        <span className="font-medium">Latitude:</span> {latitude}
      </p>
      <p className="text-gray-700">
        <span className="font-medium">Longitude:</span> {longitude}
      </p>
    </div>
      {latitude && longitude && (
        <MapContainer center={[latitude, longitude]} zoom={15} style={{ height: '400px', width: '100%', marginTop: '20px' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapView latitude={latitude} longitude={longitude} onMarkerDragEnd={handleMarkerDragEnd} />
          <Marker
            position={[latitude, longitude]}
            draggable={true}
            icon={defaultIcon}
            eventHandlers={{
              dragend: (e) => {
                const { lat, lng } = e.target.getLatLng();
                handleMarkerDragEnd(lat, lng);
              }
            }}
          >
            <Popup>
              Location: {locationText}
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default MapLocationPicker;