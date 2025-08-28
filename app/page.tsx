"use client";

import React from "react";
import './global.css'
import CurrentMap from "./components/CurrentLocationMap";'./components/CurrentMap'

export default function Home() {
  return (
    <div className="w-full max-w-screen-lg p-4 font-sans mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">🍜 Nearby Eats</h1>
      <CurrentMap />
      <button className="mt-6 w-full sm:w-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Search Nearby
      </button>
    </div>
  );
}
