"use client";

import React from "react";
import './global.css'
import {EmbedMap, LocationSetter} from "./components";

export default function Home() {
  // Coordinates variable (Initialize at TBI)
  const [coords, setCoords] = React.useState<{ lat: number; lng: number } | null>({
    lat: 1.4800,
    lng: 103.6596
  });

  return (
    <div className="w-full max-w-screen-lg m-4 p-4 font-sans mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        Don't Ask Me What to Eat <br />
        Ask Your Faith <br />
        🍜 
      </h1>
      <EmbedMap coords={coords}/>
      <LocationSetter coords={coords} setCoords={setCoords}/>
    </div>
  );
}
