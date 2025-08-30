"use client";
import { useState } from "react";



interface Props {
  setCoords: React.Dispatch<React.SetStateAction<{ lat: number; lng: number } | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setNextPage: React.Dispatch<React.SetStateAction<string>>;
}


export const LocationSetter: React.FC<Props> = ({ setCoords, setLoading, setNextPage }) => {
  // Variable for input box
  const [latData, setLatData] = useState<string>("");
  const [lngData, setLngData] = useState<string>("");

  // Function to get the current location by location services
  const autoSetLocation = () => { 
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Change global varible
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

        // Set the input box into valuen now
        setLatData(String(position.coords.latitude));
        setLngData(String(position.coords.longitude));

        // Done loading
        setLoading(false);
      },
      (err) => {
        // Print error
        console.log(err.message);
        setCoords({ 
          lat: 1.4800, 
          lng: 103.6596 
        });

        // Done loading
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
    
  }

  // Function to get input value and set location manually
  const manualSetLocation = () => {
    setCoords({
      lat: Number(latData),
      lng: Number(lngData),
    })
  }

  return (
    <div className="location-setter">
      <div className="location-input-holder">
        <input
          type="number"
          value={latData}
          onChange={(e) => {setLatData(e.target.value);}}
          placeholder="Latitude"
          className="lat-input"
        />
        <input
          type="number"
          value={lngData}
          onChange={(e) => {setLngData(e.target.value);}}        
          placeholder="Longitude"
          className="lat-input" 
        />
      </div>
      <button
        className="location-button manual-button"
        onClick={manualSetLocation}
      >
        Manual Upload Location
      </button>
      <button 
        className="location-button auto-button"
        onClick={autoSetLocation}
      >
        Upload Your Location
      </button>
    </div>
  );
};