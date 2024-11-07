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
    const apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY;

    try {
      setError(null);

      const fetchAPOD = async () => {
        const apodRes = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
        const apodData = await apodRes.json();
        return apodData.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
               apodData.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ? [apodData] : [];
      };

      const fetchMarsPhotos = async () => {
        const roverNames = ['curiosity', 'perseverance', 'spirit'];
        const isRoverName = roverNames.includes(searchQuery.toLowerCase());
        const isDate = /^\d{4}-\d{2}-\d{2}$/.test(searchQuery);
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30); // 30 days ago
        const endDate = new Date().toISOString().split('T')[0];

        let marsRes = null;
        if (isRoverName) {
          marsRes = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${searchQuery.toLowerCase()}/photos?earth_date=${startDate.toISOString().split('T')[0]}&api_key=${apiKey}`);
        } else if (isDate) {
          marsRes = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${searchQuery}&api_key=${apiKey}`);
        }

        if (marsRes) {
          const marsData = await marsRes.json();
          return marsData.photos?.filter(photo =>
            (isRoverName && photo.rover.name.toLowerCase() === searchQuery.toLowerCase()) ||
            (isDate && photo.earth_date === searchQuery)
          ).slice(0, 30).map((photo: any) => ({
            img_src: photo.img_src, rover_name: photo.rover.name, camera_name: photo.camera.name, earth_date: photo.earth_date
          })) || [];
        }
        return [];
      };

      const fetchAsteroids = async () => {
        const asteroidRes = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=2024-10-01&end_date=2024-10-07&api_key=${apiKey}`);
        const asteroidData = await asteroidRes.json();
        const allAsteroids = Object.values(asteroidData.near_earth_objects).flat();
        return allAsteroids.filter((asteroid: any) =>
          asteroid.close_approach_data?.some((approach: any) =>
            approach.date?.includes(searchQuery)
          )
        ).map((asteroid: any) => ({
          name: asteroid.name,
          close_approach_data: asteroid.close_approach_data
        }));
      };

      // Fetch all data
      const [apodResults, marsPhotos, asteroidData] = await Promise.all([fetchAPOD(), fetchMarsPhotos(), fetchAsteroids()]);
      setResults({ apodResults, marsPhotos, asteroidData });

    } catch (error) {
      if (error instanceof Error && error.message !== error) {
        setError('Failed to fetch data.');
      }
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
