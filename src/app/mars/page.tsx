// src/app/mars/page.tsx
"use client";

import React from 'react';
import { useMarsRover } from './MarsRoverContext';

export default function Mars() {
  const { roverPhotos, loading, error } = useMarsRover();

  return (
    <div className="text-white p-8 z-20">
      <h1 className="text-3xl font-bold mb-4">Mars Rover Photos</h1>
      <p className="mb-8">Explore stunning images captured by Mars Rovers.</p>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roverPhotos.slice(0, 9).map((photo: any) => (
          <div key={photo.id} className="mb-4">
            <img src={photo.img_src} alt={`Mars Rover photo ${photo.id}`} className="rounded w-full" />
            <p className="mt-2 font-semibold">Taken by: {photo.rover.name}</p>
            <p>Camera: {photo.camera.full_name}</p>
            <p>Date: {photo.earth_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
