"use client";
import React from "react";

interface Props {
  restaurants: { lat: number; lng: number; name: string } [] | null;
  setRestaurants: React.Dispatch<React.SetStateAction<{ lat: number; lng: number; name: string } [] | null>>;
  setHighlightedRestaurant: React.Dispatch<React.SetStateAction<string>>;
  mapRef: React.RefObject<google.maps.Map | null>;
}

export const RestaurantList: React.FC<Props> = ({ restaurants, setRestaurants, setHighlightedRestaurant, mapRef }) => {
  // Pan the map to selected location
  const moveMapTo = (coords: { lat: number; lng: number }, name) => {
    if (name.startsWith("[Manual]")) {
      setHighlightedRestaurant("")
      return
    }
    else if (mapRef.current) {
      mapRef.current.setZoom(15);
      mapRef.current.panTo(coords);
    }
    setHighlightedRestaurant(name);
  };

  return (
    <div className={restaurants.length === 0 ? "no-restaurant-list" : "restaurant-list"}>
      {restaurants.length != 0 && restaurants.map((r, i) => (
        <div key={i} className={`restaurant-div ${i%2==0 ? "restaurant-div-even" : "restaurant-div-odd"}`} onClick={() => {moveMapTo({lat: r.lat, lng: r.lng}, r.name);}}>
          <h1 key={i} className="restaurant-name">{r.name}</h1>
          <button className="remove-button" onClick={ (e) => {setRestaurants((prev) =>prev.filter((restaurant) => restaurant.name !== r.name));}}>( Remove )</button>
        </div>
      ))}

      {restaurants.length === 0 && (
        <h1 className="no-restaurant-text">No Restaurants Found!</h1>
      )}
    </div>
  )
}

