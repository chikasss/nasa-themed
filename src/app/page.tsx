"use client";

import React from 'react';
import { Space_Mono } from "next/font/google";
import { useSearch } from './contexts/SearchContext';
import SearchBar from './components/SearchBar';
import GridCard from './components/GridCard';

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function Home() {
  const { searchQuery, results, loading, error } = useSearch();

  const asteroidDate = searchQuery;

  const asteroidDataForDate = asteroidDate && results?.asteroidData?.near_earth_objects
    ? results.asteroidData.near_earth_objects[asteroidDate]
    : null;

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center p-8 pb-20 gap-16 sm:p-20">
      <main className="z-20 flex flex-col gap-8 items-center text-white">

        <h1 className="text-4xl sm:text-5xl font-bold">Find Your Universe</h1>
        <p>Search for...</p>
          <ul>
            <li>Any keyword for APOD</li>
            <li>Date for Mars Rover Photos</li>
            <li>Date for Asteroid NeoWs</li>
          </ul>
        <SearchBar />

        {searchQuery && (
          <div className="mt-4 text-lg">
            <p>Searching for: <strong>{searchQuery}</strong></p>
          </div>
        )}

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="flex flex-col gap-8">
            <section>
              <h2 className="text-2xl font-semibold">APOD</h2>
              {results?.apodResults?.length > 0 ? (
                results.apodResults.map((item, index) => (
                  <div key={index} className="flex flex-col items-center mb-4">
                    <p className="mt-2 text-lg font-bold">{item.title || 'No title'}</p>
                    {item.url && (
                      <img src={item.url} alt={item.title} className="w-full max-w-md rounded-lg shadow-md" />
                    )}
                  </div>
                ))
              ) : (
                <p>No results found for APOD.</p>
              )}
            </section>

             {/* Mars Rover Photos Section */}
            <section>
              <h2 className="text-2xl font-semibold">Mars Rover Photos</h2>
              {results?.marsPhotos?.length > 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
               {results.marsPhotos.map((photo) => (
                 <GridCard
                   key={photo.img_src}
                   type="mars"
                   imgUrl={photo.img_src}
                   roverName={photo.rover_name}
                   cameraName={photo.camera_name}
                   earthDate={photo.earth_date}
                 />
               ))}
             </div>
              ) : (
                <p>No results found for Mars photos.</p>
              )}
            </section>

            <section>
              <h2 className="text-2xl font-semibold">Asteroids NeoWs</h2>
              {asteroidDataForDate && asteroidDataForDate.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {asteroidDataForDate.map((asteroid) => (
                    <GridCard
                      key={asteroid.name}
                      type="asteroid"
                      name={asteroid.name}
                      closeApproachDate={asteroid.close_approach_data[0]?.date}
                      diameter={asteroid.estimated_diameter.meters.estimated_diameter_max}
                      missDistance={asteroid.close_approach_data[0]?.miss_distance.kilometers}
                      velocity={asteroid.close_approach_data[0]?.relative_velocity.kilometers_per_hour}
                    />
                  ))}
                </div>
                ) : (
                <p>No asteroids found for the given date.</p>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
