"use client";

import React, { useContext, useEffect } from 'react';
import DatePicker from '../components/DatePicker';
import GridCard from '../components/GridCard';
import { AsteroidsProvider, AsteroidsContext } from './AsteroidsContext';

const AsteroidsPage: React.FC = () => {
  const { asteroids, selectedStartDate, setSelectedStartDate, selectedEndDate, setSelectedEndDate, fetchAsteroids } = useContext(AsteroidsContext);

  // Fetch asteroids whenever the selected date changes
  useEffect(() => {
    if (selectedStartDate && selectedEndDate) {
      fetchAsteroids(selectedStartDate, selectedEndDate); // Pass both dates to the fetch function
    }
  }, [selectedStartDate, selectedEndDate, fetchAsteroids]);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Near-Earth Objects</h1>

      <DatePicker
        selectedDate={selectedStartDate}
        onDateChange={setSelectedStartDate}
        singleDate
      />

      {/* Date picker for end date */}
      <DatePicker
        selectedDate={selectedEndDate}
        onDateChange={setSelectedEndDate}
        singleDate
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {asteroids.map((asteroid) => (
          <GridCard
            key={asteroid.id}
            name={asteroid.name}
            closeApproachDate={asteroid.close_approach_date}
            estimatedDiameter={asteroid.diameter} // Use the diameter from the state
            missDistance={asteroid.miss_distance} // Use the miss distance from the state
            velocity={asteroid.velocity} // Use the velocity from the state
          />
        ))}
      </div>
    </div>
  );
};

// Wrap the AsteroidsPage component with the AsteroidsProvider
const WrappedAsteroidsPage: React.FC = () => (
  <AsteroidsProvider>
    <AsteroidsPage />
  </AsteroidsProvider>
);

export default WrappedAsteroidsPage;
