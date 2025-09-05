"use client";

import React from "react";
import './global.css'
import { EmbedMap, LocationSetter, RestaurantList, SpinWheel } from "./components";

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


  //// Restaurants list variable 
  const [restaurants, setRestaurants] = React.useState<{ lat: number; lng: number; name: string }[] | null>([]);
  // Restaurant details fetch function
  async function fetchRestaurants(lat: number, lng: number) {
    let url = `/api/nearby?lat=${lat}&lng=${lng}`;
    let res = await fetch(url);
    let data = await res.json();

    setLoading(true);

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
    setLoading(false);
  }


  // Map reference
  const mapRef = React.useRef<google.maps.Map | null>(null);
  // Highlighted restaurant variable
  const [highlightedRestaurant, setHighlightedRestaurant] = React.useState<string>("You");
  // New restaurant input box variable
  const [restaurantInput, setRestaurantInput] = React.useState<string>("");
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
          <EmbedMap coords={ coords } restaurants={ restaurants } mounted={ mounted } highlightedRestaurant={ highlightedRestaurant } mapRef={mapRef}/>
        </div>
      </div>

      {/* Restaurant Panel : For restaurants search results */}
      <div className={ `restaurant-panel ${ page==="page2" ? "active" : "inactive" }` }>
        <div className="input-button-holder">
          <input 
            className="add-restaurant-input" 
            placeholder="Enter restaurant name to add"
            value={ restaurantInput }
            onChange={(e) => {setRestaurantInput(e.target.value);}}
          >
          </input>
          <button className="add-restaurant-button" onClick={ (e) => {
            setRestaurantInput("");
            if (restaurantInput.trim() != "") {
              setRestaurants([{ lat: 0, lng:0, name:"[Manual] "+restaurantInput}, ...restaurants])
            }
          }}>
            Add
          </button>
          <button className="to-page-one-button" onClick={ (e) => {
            setPage1();
            setRestaurants([]);
          }}>
            Back
          </button>
        </div>
        <div className="to-page-three-div">
          <button className="to-page-three-button" onClick={ (e) => {
            setPage3();
            setHighlightedRestaurant(null)
          }}>
            Can't Choose?
          </button>
        </div>          
        <RestaurantList restaurants={ restaurants } setRestaurants={setRestaurants} setHighlightedRestaurant={ setHighlightedRestaurant } mapRef={mapRef}/>
      </div>

      {/* Wheel Panel : For restaurants search results */}
      <div className={ `wheel-panel ${ page==="page3" ? "active" : "inactive" }` }>
        <SpinWheel highlightedRestaurant={ highlightedRestaurant} setHighlightedRestaurant={setHighlightedRestaurant} restaurants={restaurants} setRestaurants={setRestaurants} setPage={setPage}></SpinWheel>
        {/*<iframe className="wheel-iframe" src={`https://www.spinitwheel.com/embed.html?entries=${"Option 1,Option 2,Option 3,Option 4,Option 5"}`} width="60%" height="100%" scrolling="no"></iframe>*/}
      </div>


      {/* Loading Animation */}
      { loading && (
        <div className={`overlay  ${ loading ? "loading" : "" }`}>
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-700 font-medium">Loading...</p>
        </div>
      ) }
    </div>
  );
}

