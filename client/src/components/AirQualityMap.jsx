import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapWrapper = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: 24px;
  padding: 32px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  height: 480px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.textMain};
  font-weight: 700;
  margin-bottom: 24px;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const MapInner = styled.div`
  flex: 1;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  
  .leaflet-container {
    height: 100%;
    width: 100%;
    background: #0f172a;
    font-family: ${({ theme }) => theme.fonts.main};
  }

  .leaflet-popup-content-wrapper {
    background: rgba(15, 23, 42, 0.95);
    color: #f8fafc;
    border: 1px solid #334155;
    backdrop-filter: blur(8px);
    border-radius: 12px;
  }
  
  .leaflet-popup-tip {
    background: rgba(15, 23, 42, 0.95);
    border-top: 1px solid #334155;
    border-left: 1px solid #334155;
  }
`;

// Helper component to recenter map when selected city changes
function MapRecenter({ center }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 11, { duration: 1.5 });
  }, [center, map]);
  return null;
}

export default function AirQualityMap({ airData, citiesData }) {
  // Try to use true coordinates from OpenAQ or fallback to some defaults.
  // Note: OpenAQ data returns coordinates: { latitude, longitude }
  const [center, setCenter] = useState([51.505, -0.09]); // Default London
  
  useEffect(() => {
    if (airData?.coordinates) {
      setCenter([airData.coordinates.latitude, airData.coordinates.longitude]);
    } else if (airData?.data && airData.data.coordinates) {
      setCenter([airData.data.coordinates.latitude, airData.data.coordinates.longitude]);
    }
  }, [airData]);

  // If we had coordinates for all cities from the compare API, we could map them.
  // Let's create mock markers for visually demonstrating the map if real aren't available.
  const aqi = airData?.aqi || airData?.data?.aqi;
  const pm25 = airData?.readings?.pm25 || airData?.data?.pm25 || 0;
  
  const markerColor = aqi?.color || "#34d399";

  return (
    <MapWrapper>
      <Title><span>🗺️</span> Air Quality Heatmap</Title>
      <MapInner>
        <MapContainer center={center} zoom={11} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          />
          <MapRecenter center={center} />
          <CircleMarker
            center={center}
            radius={pm25 > 50 ? 40 : pm25 > 25 ? 30 : 20}
            pathOptions={{ 
              fillColor: markerColor, 
              color: markerColor, 
              weight: 2, 
              opacity: 0.8, 
              fillOpacity: 0.4 
            }}
          >
            <Popup>
              <div style={{ padding: '4px' }}>
                <strong style={{ display: 'block', fontSize: '14px', marginBottom: '8px' }}>
                  {airData?.city ? airData.city.toUpperCase() : "Location"}
                </strong>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: markerColor }}></span>
                  <span>AQI: {aqi?.value || "N/A"} ({aqi?.label || "Unknown"})</span>
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>PM2.5: {pm25} μg/m³</div>
              </div>
            </Popup>
          </CircleMarker>
        </MapContainer>
      </MapInner>
    </MapWrapper>
  );
}
