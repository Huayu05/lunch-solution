"use client";
import { useState, useEffect } from "react";

const CurrentLocationMap: React.FC = () => {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    );
  }, []);

  if (!coords) return <p>Loading map...</p>;

  return (
    <iframe
      className="w-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] border-0 rounded-lg"
      src={`https://www.google.com/maps?q=${coords.lat},${coords.lng}&hl=en&z=15&output=embed`}
      allowFullScreen
      loading="lazy"
    ></iframe>
  );
};

export default CurrentLocationMap;