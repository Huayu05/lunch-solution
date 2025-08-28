"use client";
import { useState } from "react";



interface Props {
  coords: {lat: number; lng: number} | null;
  setCoords: React.Dispatch<React.SetStateAction<{ lat: number; lng: number } | null>>;
}


export const LocationSetter: React.FC<Props> = ({coords, setCoords}) => {
  const [latData, setLatData] = useState<number>(coords.lat);
  const [lngData, setLngData] = useState<number>(coords.lng);

  // Function to get the current location by location services
  const autoSetLocation = () => { 
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

        // Set the input box into valuen now
        setLatData(position.coords.latitude)
        setLngData(position.coords.longitude)
      },
      (err) => {
        console.log(err.message);
        setCoords({lat: 1.4800, lng: 103.6596});
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    )

    
  }

  // Function to get input value and set location manually
  const manualSetLocation = () => {
    setCoords({
      lat: Number(latData),
      lng: Number(lngData),
    })
  }

  return (
    <div className="space-x-2 space-y-2">
      <button 
        className="mt-6 w-full sm:w-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={autoSetLocation}
      >
        Search Your Location
      </button>
      <button
        className="mt-6 w-full sm:w-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={manualSetLocation}
      >
        Manual Upload Longtitude & Latitude
      </button>
      <br/>
      <input
        type="number"
        value={latData}
        onChange={(e) => {setLatData(Number(parseFloat(e.target.value)));}}
        placeholder="Latitude"
        className="border px-2 py-1 rounded mr-2"
      />
      <input
        type="number"
        value={lngData}
        onChange={(e) => {setLngData(Number(parseFloat(e.target.value)));}}        
        placeholder="Longitude"
        className="border px-2 py-1 rounded mr-2"
      />
    </div>
  );
};