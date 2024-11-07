"use client";

import React, { createContext, useCallback, useState } from 'react';

interface Asteroid {
  id: string;
  name: string;
  close_approach_date: string;
  diameter: number;
  miss_distance: number;
  velocity: number;
}

interface AsteroidsContextProps {
  asteroids: Asteroid[];
  fetchAsteroids: (startDate: string, endDate: string) => Promise<void>;
  selectedStartDate: string | null;
  setSelectedStartDate: (date: string | null) => void;
  selectedEndDate: string | null;
  setSelectedEndDate: (date: string | null) => void;
}

export const AsteroidsContext = createContext<AsteroidsContextProps | undefined>(undefined);

export const AsteroidsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  const [selectedStartDate, setSelectedStartDate] = useState<string | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);

  const fetchAsteroids = useCallback(async (startDate: string, endDate: string) => {
    console.log(`Fetching asteroids from ${startDate} to ${endDate}`);
    try {
      const response = await fetch(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`
      );
      const data = await response.json();

      const fetchedAsteroids = Object.values(data.near_earth_objects).flat().map((obj: any) => ({
        id: obj.id,
        name: obj.name,
        close_approach_date: obj.close_approach_data[0].close_approach_date,
        diameter: obj.estimated_diameter.meters.estimated_diameter_max, // Diameter in meters
        miss_distance: obj.close_approach_data[0].miss_distance.kilometers, // Miss distance in kilometers
        velocity: obj.close_approach_data[0].relative_velocity.kilometers_per_hour, // Velocity in kilometers per hour
      }));

      setAsteroids(fetchedAsteroids);
    } catch (error) {
      console.error("Error fetching asteroids:", error);
    }
  }, []);

  return (
    <AsteroidsContext.Provider value={{ asteroids, fetchAsteroids, selectedStartDate, setSelectedStartDate, selectedEndDate, setSelectedEndDate }}>
      {children}
    </AsteroidsContext.Provider>
  );
};
