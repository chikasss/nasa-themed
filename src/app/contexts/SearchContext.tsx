"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

interface SearchResult {
  apodResults: any[];
  marsPhotos: any[];
  asteroidData: any[];
}

interface SearchContextProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  results: SearchResult;
  loading: boolean;
  error: string | null;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResult>({ apodResults: [], marsPhotos: [], asteroidData: [] });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!searchQuery) return;

    setLoading(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY;

      // APOD data
      const apodRes = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
      const apodData = await apodRes.json();
      console.log('APOD Data:', apodData);

      const filteredApodData = (apodData.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apodData.explanation.toLowerCase().includes(searchQuery.toLowerCase())) ? [apodData] : [];

      // Mars Rover Photos data
      const marsRes = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=${apiKey}`);
      const marsData = await marsRes.json();
      console.log('Mars Data:', marsData);

      const filteredMarsPhotos = marsData.photos.filter((photo: any) =>
        photo.camera.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.rover.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Asteroids data
      const asteroidRes = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=2024-10-01&end_date=2024-10-07&api_key=${apiKey}`);
      const asteroidData = await asteroidRes.json();

      console.log('Asteroid Data:', asteroidRes);


      const allAsteroids = Object.values(asteroidData.near_earth_objects).flat();
      const filteredAsteroidData = allAsteroids.filter((asteroid: any) =>
        asteroid.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setResults({
        apodResults: filteredApodData,
        marsPhotos: filteredMarsPhotos,
        asteroidData: filteredAsteroidData
      });
    } catch (error) {
      setError('Failed to fetch data.');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, results, loading, error }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
