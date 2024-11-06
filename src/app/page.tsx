
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
              {results.apodResults.length > 0 ? (
                results.apodResults.map((item, index) => (
                  <p key={index}>{item.title || 'No title'}</p>
                ))
              ) : (
                <p>No results found for APOD.</p>
              )}
            </section>

            <section>
              <h2 className="text-2xl font-semibold">Mars Photos</h2>
              {results.marsPhotos.length > 0 ? (
                results.marsPhotos.map((photo, index) => (
                  <img key={index} src={photo.img_src} alt="Mars Rover Photo" />
                ))
              ) : (
                <p>No results found for Mars photos.</p>
              )}
            </section>

            <section>
              <h2 className="text-2xl font-semibold">Asteroids</h2>
              {results.asteroidData.length > 0 ? (
                results.asteroidData.map((asteroid, index) => (
                  <p key={index}>{asteroid.name}</p>
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
