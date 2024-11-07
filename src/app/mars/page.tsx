"use client";

import React, { useState } from 'react';
import { useMarsRover } from './MarsRoverContext';
import DatePicker from '../components/DatePicker';


export default function MarsPage() {
  const { photos, fetchPhotos, loading, error } = useMarsRover();
  const [selectedRover, setSelectedRover] = useState("Curiosity");
  const [selectedCamera, setSelectedCamera] = useState("");
  const [date, setDate] = useState("");

  const cameraOptions = {
    Curiosity: [
      { value: "FHAZ", label: "Front Hazard Avoidance Camera" },
      { value: "RHAZ", label: "Rear Hazard Avoidance Camera" },
      { value: "MAST", label: "Mast Camera" },
      { value: "CHEMCAM", label: "Chemistry and Camera Complex" },
      { value: "MAHLI", label: "Mars Hand Lens Imager" },
      { value: "MARDI", label: "Mars Descent Imager" },
      { value: "NAVCAM", label: "Navigation Camera" },
    ],
    Opportunity: [
      { value: "FHAZ", label: "Front Hazard Avoidance Camera" },
      { value: "RHAZ", label: "Rear Hazard Avoidance Camera" },
      { value: "PANCAM", label: "Panoramic Camera" },
      { value: "MINITES", label: "Miniature Thermal Emission Spectrometer" },
      { value: "NAVCAM", label: "Navigation Camera" },
    ],
    Spirit: [
      { value: "FHAZ", label: "Front Hazard Avoidance Camera" },
      { value: "RHAZ", label: "Rear Hazard Avoidance Camera" },
      { value: "PANCAM", label: "Panoramic Camera" },
      { value: "MINITES", label: "Miniature Thermal Emission Spectrometer" },
      { value: "NAVCAM", label: "Navigation Camera" },
    ],
  };

  const handleRoverChange = (e) => {
    setSelectedRover(e.target.value);
    setSelectedCamera("");
  };

  const handleSearch = () => {
    fetchPhotos(selectedRover, selectedCamera, date, 1);
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-semibold mb-4">Mars Rover Photos</h1>
      <p>You can see photos taken by NASA’s Mars rovers.</p>

      <label className="block mb-2 mt-3">
        Select Rover:
        <select
          value={selectedRover}
          onChange={handleRoverChange}
          className="mt-2 block w-full p-2 border border-gray-300 rounded-md bg-white text-gray-600 focus:outline-none focus:ring focus:ring-blue-500">
          <option value="Curiosity">Curiosity</option>
          <option value="Opportunity">Opportunity</option>
          <option value="Spirit">Spirit</option>
        </select>
      </label>

      <label className="block mb-2">
        Select Camera:
        <select
          value={selectedCamera}
          onChange={(e) => setSelectedCamera(e.target.value)}
          className="mt-2 block w-full p-2 border border-gray-300 rounded-md   bg-white text-gray-600 backdrop:focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="">All</option>
          {cameraOptions[selectedRover]?.map((camera) => (
            <option key={camera.value} value={camera.value}>
              {camera.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-4">
      Select Date:
        <DatePicker selectedDate={date} onDateChange={setDate} />
      </label>

      <button onClick={handleSearch}
             className="px-4 py-2 bg-blue-500  rounded hover:bg-blue-600"
             >Search</button>

      {loading && <p className="text-center mt-5">Loading...</p>}
      {error && <p className="text-center mt-5 text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
      {photos.map((photo) => (
      <div key={photo.id}
       className="relative overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
            <img src={photo.img_src} alt="Mars Rover" className="w-full h-auto" />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 text-center  p-3">
              <p className="text-lg font-semibold">{photo.rover.name}</p>
              <p className="text-sm">{photo.camera.full_name}</p>
              <p className="text-xs">{photo.earth_date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
