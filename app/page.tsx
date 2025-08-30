"use client";

import React from "react";
import './global.css'
import { EmbedMap, LocationSetter, RestaurantList } from "./components";

export default function Home() {
  // Paging variable
  const [page, setPage] = React.useState("page1");
  const setPage1 = () => { setPage("page1"); };
  const setPage2 = () => { setPage("page2"); };
  const setPage3 = () => { setPage("page3"); };

  // Coordinates variable (Initialize at TBI)
  const [coords, setCoords] = React.useState<{lat: number; lng: number} | null>({
    lat: 1.4800, 
    lng: 103.6596
  });

  // Restaurants list variable
  const [restaurants, setRestaurants] = React.useState<{ lat: number; lng: number; name: string }[] | null>([]);
  async function fetchRestaurants(lat: number, lng: number) {
    let url = `/api/nearby?lat=${lat}&lng=${lng}`;
    let res = await fetch(url);
    let data = await res.json();

    if (data.next_page_token) {
      await new Promise(r => setTimeout(r, 2000));
      res = await fetch(`/api/nearby?pagetoken=${data.next_page_token}&lat=${lat}&lng=${lng}`);
      const data2 = await res.json();
      data.results = [...data.results, ...data2.results];
    }
    
    const formatted = data.results.map((r: any) => ({
      lat: r.geometry.location.lat,
      lng: r.geometry.location.lng,
      name: r.name
    }));

    setRestaurants(formatted);
  }

  // Loading variable
  const [loading, setLoading] = React.useState<boolean>(false);

  // Initial rendering checking use
  const [mounted, setMounted] = React.useState(false);

  return (
    <div className="root-bg">
      {/* Location panel : Setup location for searching */}
      <div className={ `location-panel ${ page=="page1" ? "active" : "inactive" }` }>
        <div className="left-inner-panel">
          <h1 className="title">
            Lunch Solution
          </h1>
          <h1 className="subtitle">
            A simple web to solve question: <br/>
            " Ehh, what we eat later ? "
          </h1>
          <LocationSetter setCoords={ setCoords } setLoading={ setLoading } setNextPage={ setPage2 }/>
          <div className="align-center">
            <button className="to-page-two-button" onClick={ (e) => { 
              setPage2(); 
              fetchRestaurants(coords.lat, coords.lng);
              setMounted(true)
            }}>
              Search Nearby Restaurants ➥
            </button>
          </div>
        </div>
      </div>

      {/* Map panel : For map related */}
      <div className="map-panel">
        <div className={ `map-wrapper ${ mounted ? (page === "page2" ? "slide-out" : "slide-in") : "" }` }>
          <EmbedMap coords={ coords } restaurants={ restaurants } />
        </div>
      </div>

      {/* Restaurant Panem : For restaurants search results */}
      { page=="page2" && (
        <div className="restaurant-panel">
          <button className="to-page-one-button" onClick={ (e) => {
            setPage1();
            setRestaurants([]);
            setRestaurants([{ lat:coords.lat, lng:coords.lng, name: "" }]);
          }}>
            Back
          </button>
          <RestaurantList restaurants={ restaurants }/>
        </div>
      ) }


      {/* Loading Animation */}
      { loading && (
        <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity bg-white ${ loading ? "opacity-50 pointer-events-none" : "opacity-100" }`}>
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-700 font-medium">Loading...</p>
        </div>
      ) }
    </div>
  );
}

