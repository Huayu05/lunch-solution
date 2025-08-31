"use client";
import React from "react";

interface Props {
  restaurants: { lat: number; lng: number; name: string } [] | null;
}

export const RestaurantList: React.FC<Props> = ({ restaurants }) => {
  return (
    <div className="restaurant-list">
      {restaurants.map((r, i) => (
        <h1 key={i} className={`restaurant-name ${i%2==0 ? "restaurant-name-even" : "restaurant-name-odd"}`}>{r.name}</h1>
      ))}
    </div>
  )
}

