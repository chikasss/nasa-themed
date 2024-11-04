// src/app/mars/MarsRoverContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

const MarsRoverContext = createContext<any>(null);

export const MarsRoverProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [roverPhotos, setRoverPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarsRoverPhotos = async () => {
      try {
        const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`);
        if (!response.ok) throw new Error("Failed to fetch Mars Rover photos");
        const data = await response.json();
        setRoverPhotos(data.photos || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMarsRoverPhotos();
  }, []);

  return (
    <MarsRoverContext.Provider value={{ roverPhotos, loading, error }}>
      {children}
    </MarsRoverContext.Provider>
  );
};

export const useMarsRover = () => useContext(MarsRoverContext);
