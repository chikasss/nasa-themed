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
      <h1 className="text-3xl font-bold mb-4">Near-Earth Objects</h1>
      <p>You can see near-Earth objects based on close approach date.</p>

      {/* Date picker for start date */}
      <div className="mt-3">
      <label className="mb-1 block">Select start date:</label>
      <DatePicker
        selectedDate={selectedStartDate}
        onDateChange={setSelectedStartDate}
        singleDate
      />
      </div>

      {/* Date picker for end date */}
      <div className="mt-3">
      <label className="mb-1 block">Select end date:</label>
      <DatePicker
        selectedDate={selectedEndDate}
        onDateChange={setSelectedEndDate}
        singleDate
      />
      </div>

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
