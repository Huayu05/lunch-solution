"use client";
import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

interface Props {
  coords: { lat: number; lng: number } | null;
  restaurants: { lat: number; lng: number; name: string } [] | null;
  mounted: boolean;
}

const containerStyle = { width: "100%", height: "100%" };

export const EmbedMap: React.FC<Props> = ({ coords, restaurants, mounted }) => {
  const mapRef = React.useRef<google.maps.Map | null>(null);
  const markersRef = React.useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const [mapLoaded, setMapLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!mapLoaded || !restaurants) return;

    // Remove old markers
    markersRef.current.forEach(marker => (marker.map = null));
    markersRef.current = [];

    // Add new markers
    restaurants.forEach(r => {
      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: { lat: r.lat, lng: r.lng },
        map: mapRef.current!,
        title: r.name,
      });
      markersRef.current.push(marker);
    });

    console.log("Restaurants updated:", restaurants);

    // Cleanup on unmount
    return () => {
      markersRef.current.forEach(marker => (marker.map = null));
      markersRef.current = [];
    };
  }, [restaurants, mapLoaded]);

  if (!coords) return <p>Loading map...</p>;

  if (!mapLoaded) {
    return (
      <iframe
        className="map-iframe"
        src={`https://www.google.com/maps?q=${coords.lat},${coords.lng}&hl=en&z=15&output=embed`}
        allowFullScreen
        loading="lazy"
      >
      </iframe>
    );
  }
  else {
    return <div className="map-iframe">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} libraries={["marker"]}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={coords}
          zoom={15}
          options={{
            clickableIcons: false,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
            zoomControl: true,
            mapId: "fcf62e3e7bc22c9baec4c5c4"
          }}
          onLoad={map => {
            mapRef.current = map;
            setMapLoaded(true);
          }}
        >
        </GoogleMap>
      </LoadScript>
    </div>
  }
};

