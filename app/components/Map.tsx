"use client";
import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

interface Props {
  coords: { lat: number; lng: number } | null;
  restaurants: { lat: number; lng: number; name: string } [] | null;
  mounted: boolean;
  highlightedRestaurant: string;
  mapRef: React.RefObject<google.maps.Map | null>;
}

const containerStyle = { width: "100%", height: "100%" };
const LIBRARIES: ("marker" | "places" | "geometry")[] = ["marker"];

export const EmbedMap: React.FC<Props> = ({ coords, restaurants, mounted, highlightedRestaurant, mapRef }) => {
  const markersRef = React.useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const [mapLoaded, setMapLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!mapLoaded || !mounted) return;

    // Remove old markers
    markersRef.current.forEach(marker => (marker.map = null));
    markersRef.current = [];

    // Add new markers
    restaurants.forEach(r => {
      // Highlight the chosen one
      if (r.name.startsWith("[Manual]")) {

      }
      else if (r.name === highlightedRestaurant) {
        const pin = new google.maps.marker.PinElement({
        });
        pin.element.style.transform = "scale(1.4)";
        const marker = new google.maps.marker.AdvancedMarkerElement({
          position: { lat: r.lat, lng: r.lng },
          map: mapRef.current!,
          title: r.name,
          content: pin.element,
          zIndex: 999,
        });
        markersRef.current.push(marker);
      }
      // All other non highlighted
      else {
        const pin = new google.maps.marker.PinElement({
          background: "#4285F4",
          borderColor: "#2265f4",
          glyphColor: "#aaaaaa",
        });
        const marker = new google.maps.marker.AdvancedMarkerElement({
          position: { lat: r.lat, lng: r.lng },
          map: mapRef.current!,
          title: r.name,
          content: pin.element,
        });
        markersRef.current.push(marker);
      }
    });

    // Build for own location
      const pin = new google.maps.marker.PinElement({
        background: "#ffffff",
        borderColor: "#000000",
        glyphColor: "#000000",
        glyph: "𖨆",
      });
      pin.element.style.transform = "scale(1.4)";
      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: { lat: coords.lat, lng: coords.lng },
        map: mapRef.current!,
        title: "You",
        content: pin.element,
      });
      markersRef.current.push(marker);

    // Cleanup on unmount
    return () => {
      markersRef.current.forEach(marker => (marker.map = null));
      markersRef.current = [];
    };
  }, [restaurants, mapLoaded, highlightedRestaurant, coords]);

  if (!coords) return <p>Loading map...</p>;

  if (!mounted) {
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
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} libraries={LIBRARIES}>
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

