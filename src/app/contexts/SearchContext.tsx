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
let marsRes;
let marsData;

const roverNames = ['curiosity', 'perseverance', 'spirit'];
const isRoverName = roverNames.includes(searchQuery.toLowerCase());
let isDate = false;

// Check if valid date format
if (/^\d{4}-\d{2}-\d{2}$/.test(searchQuery)) {
  isDate = true;
}

try {

  if (isRoverName) {

    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 30); // Subtract 30 days

    const endDate = today.toISOString().split('T')[0];
    const startDate = oneWeekAgo.toISOString().split('T')[0];

    marsRes = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${searchQuery.toLowerCase()}/photos?earth_date=${startDate}&api_key=${apiKey}`
    );
  } else if (isDate) {
    marsRes = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${searchQuery}&api_key=${apiKey}`);
  } else {
    marsRes = null;
  }

  if (marsRes) {
    marsData = await marsRes.json();
    console.log('Mars Data:', marsData);

    const filteredMarsPhotos = marsData.photos?.filter((photo: any) =>
      // If we were searching for rover name, show photos from that rover
      (isRoverName && photo.rover.name.toLowerCase() === searchQuery.toLowerCase()) ||
      // If we were searching by date, ensure the photos are from that date
      (isDate && photo.earth_date === searchQuery)
    );

     // Limit to the first 30 photos
     const limitedMarsPhotos = filteredMarsPhotos?.slice(0, 30);

     // Update results with filtered and limited Mars photos
     setResults(prevResults => ({
       ...prevResults,
       marsPhotos: limitedMarsPhotos?.map(photo => ({
         img_src: photo.img_src,
         rover_name: photo.rover.name,
         camera_name: photo.camera.name,
         earth_date: photo.earth_date
       })) || []
     }));
   }
 } catch (error) {
   setError('Failed to fetch Mars photos.');
   console.error('Error fetching Mars photos:', error);
 }


// Asteroids data
const asteroidRes = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=2024-10-01&end_date=2024-10-07&api_key=${apiKey}`);
const asteroidData = await asteroidRes.json();
console.log('Asteroid Data:', asteroidData);

const allAsteroids = Object.values(asteroidData.near_earth_objects).flat();

const filteredAsteroidData = allAsteroids.filter((asteroid: any) => {
  const approachDateMatches = asteroid.close_approach_data?.some((approach: any) => {
    const approachDate = approach.date;
    return approachDate?.includes(searchQuery); // Search by date (e.g., "2024-10-01")
  });

  return approachDateMatches; // Only return asteroids where the close approach date matches
});

setResults(prevResults => ({
  apodResults: prevResults.apodResults, // Keep existing APOD results
  marsPhotos: prevResults.marsPhotos, // Keep existing Mars photos
  asteroidData: filteredAsteroidData.map((asteroid: any) => ({
    name: asteroid.name, // Keep the name of the asteroid
    close_approach_data: asteroid.close_approach_data // Keep the close approach data
  }))
}));

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
