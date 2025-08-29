"use client";

import React from "react";
import './global.css'
import {EmbedMap, LocationSetter} from "./components";

export default function Home() {
  // Coordinates variable (Initialize at TBI)
  const [coords, setCoords] = React.useState<{lat: number; lng: number} | null>({
    lat: 1.4800, 
    lng: 103.6596
  });

  // Loading variable
  const [loading, setLoading] = React.useState<boolean>(false);

  return (
    <div className="root-bg">
      <div className="left-panel">
        <h1 className="title">
          Lunch Solution
        </h1>
        <h1 className="subtitle">
          A simple web to solve question: <br/>
          " Ehh, what we eat later ? "
        </h1>
        <LocationSetter coords={coords} setCoords={setCoords} setLoading={setLoading}/>
      </div>

      {/* Right side 40% panel */}
      <div className="right-panel">
        <div className="map-wrapper">
          <EmbedMap coords={coords} />
        </div>
      </div>

      {/* Loading Animation */}
      {loading && (
        <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity bg-white ${loading ? "opacity-50 pointer-events-none" : "opacity-100"}`}>
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-700 font-medium">Loading...</p>
        </div>
      )}
    </div>
  );
}
