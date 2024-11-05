
"use client";

import React, { createContext, useContext, useState } from 'react';

interface MarsRoverContextProps {
  photos: any[];
  loading: boolean;
  error: string | null;
  fetchPhotos: (rover: string, camera: string, date: string) => void;
}

//set default for MarsRoverContext
const MarsRoverContext = createContext<MarsRoverContextProps>({
  photos: [],
  loading: false,
  error: null,
  fetchPhotos: () => {},
});

export const MarsRoverProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPhotos = async (rover: string, camera: string, date: string, page: number = 1) => {
    setLoading(true);
    setError(null);

    try {
      const cameraParam = camera ? `&camera=${camera}` : '';
      const dateParam = date ? `&earth_date=${date}` : '';
      const pageParam = `&page=${page}`;

      const apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY || "DEMO_KEY";

      const response = await fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?api_key=${apiKey}${dateParam}${cameraParam}${pageParam}`
      );
      if (!response.ok) throw new Error("Failed to fetch Mars Rover photos");

      const data = await response.json();

      console.log("Fetched photos:", data.photos);

      if (data.photos.length === 0) {
        setError("No photos available for the selected combination.");
      } else {
      setPhotos(data.photos);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MarsRoverContext.Provider value={{ photos, loading, error, fetchPhotos }}>
      {children}
    </MarsRoverContext.Provider>
  );
};

export const useMarsRover = () => useContext(MarsRoverContext);
