"use client";

import React from 'react';
import { Space_Mono } from "next/font/google";
import { useSearch } from './contexts/SearchContext';
import SearchBar from './components/SearchBar';

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
              <h2 className="text-2xl font-semibold">APOD Results</h2>
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

            <section>
              <h2 className="text-2xl font-semibold">Mars Photos</h2>
              {results?.marsPhotos?.length > 0 ? (
                results.marsPhotos.map((photo, index) => (
                  <div key={index}>
                    <p>Rover: {photo.rover_name}</p>
                    <p>Camera: {photo.camera_name}</p>
                    <p>Earth Date: {photo.earth_date}</p>
                    <img src={photo.img_src} alt={`Mars Rover Photo taken by ${photo.rover_name}`} />
                  </div>
                ))
              ) : (
                <p>No results found for Mars photos.</p>
              )}
            </section>

            <section>
              <h2 className="text-2xl font-semibold">Asteroids</h2>
              {asteroidDataForDate && asteroidDataForDate.length > 0 ? (
                asteroidDataForDate.map((asteroid, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="text-xl font-semibold">{asteroid.name}</h3>
                    <p>Close Approach Data:</p>
                    <ul className="list-disc pl-5">
                      {asteroid.close_approach_data.map((approach, idx) => (
                        <li key={idx}>
                          <strong>Date:</strong> {approach.date}
                          <br />
                          <strong>Relative Velocity:</strong> {approach.relative_velocity.kilometers_per_hour} km/h
                          <br />
                          <strong>Miss Distance:</strong> {approach.miss_distance.kilometers} km
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
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
