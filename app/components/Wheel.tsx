"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import Wheel with no SSR
const Wheel = dynamic(
  () => import("react-custom-roulette").then((mod) => mod.Wheel),
  { ssr: false, loading: () => <p>Loading wheel...</p> }
);

interface Props {
  highlightedRestaurant: string;
  setHighlightedRestaurant: React.Dispatch<React.SetStateAction<string>>;
  restaurants: { lat: number; lng: number; name: string } [] | null;
  setRestaurants: React.Dispatch<React.SetStateAction<{ lat: number; lng: number; name: string } [] | null>>;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}


export const SpinWheel: React.FC<Props> = ({ highlightedRestaurant, setHighlightedRestaurant, restaurants, setRestaurants, setPage }) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [data, setData] = useState<{option: string}[]>([{option: "temp"}]);

  React.useEffect(() => {
      setData(restaurants.map(item => ({ option: item.name })));

  
      // Cleanup on unmount
      return 
    }, [restaurants]);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      setHighlightedRestaurant(null);
    }
  };

  return (
    <div className="wheel">
      <div onClick={handleSpinClick}>
        {data.length > 0 && (
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            onStopSpinning={() => {
              setMustSpin(false);
              setHighlightedRestaurant(data[prizeNumber].option);
            }}
            fontSize={8}
            
          />
          )}
      </div>

      {highlightedRestaurant && 
        <p className="wheel-result">Your faith told you:</p>
      }

      {highlightedRestaurant ? (
        <a className="wheel-result hyperlink" href={`https://www.google.com/maps/search/${highlightedRestaurant.trim()}`} target="_blank" rel="noopener noreferrer">
          Go to "{highlightedRestaurant}"
        </a>
      ) : (
        <p className="wheel-result">
          {mustSpin ? "Asking your faith ..." : "Press the wheel to spin"}
        </p>
      )}

      {highlightedRestaurant && (
        <button className="wheel-remove" onClick={ (e) => {setRestaurants((prev) =>prev.filter((restaurant) => restaurant.name !== highlightedRestaurant));}}>
          Defying your faith? (Remove)
        </button>
      )}

      <button className="back-to-page-two" onClick={() => setPage("page2")}>
        Back
      </button>
    </div>
  );
}