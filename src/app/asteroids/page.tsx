"use client";

import React, { useContext, useEffect, useState } from 'react';
import DatePicker from '../components/DatePicker';
import GridCard from '../components/GridCard';
import { AsteroidsProvider, AsteroidsContext } from './AsteroidsContext';
import Layout from '../components/Layout';

const AsteroidsPage: React.FC = () => {
  const { asteroids, selectedStartDate, setSelectedStartDate, selectedEndDate, setSelectedEndDate, fetchAsteroids } = useContext(AsteroidsContext);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  const handleDateChange = (startDate: string | null, endDate: string | null) => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const differenceInDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

      if (differenceInDays > 7) {
        setWarningMessage("The date range cannot exceed 7 days. Please select an end date within 7 days of the start date.");
        return false;
      } else {
        setWarningMessage(null); // Clear the warning if range is valid
      }
    }
    return true;
  };

  const handleStartDateChange = (date: string | null) => {
    if (handleDateChange(date, selectedEndDate)) {
      setSelectedStartDate(date);
    }
  };

  const handleEndDateChange = (date: string | null) => {
    if (handleDateChange(selectedStartDate, date)) {
      setSelectedEndDate(date);
    }
  };

  useEffect(() => {
    if (selectedStartDate && selectedEndDate && !warningMessage) {
      fetchAsteroids(selectedStartDate, selectedEndDate);
    }
  }, [selectedStartDate, selectedEndDate, fetchAsteroids, warningMessage]);

  return (
    <Layout>
      <div className="container mx-auto p-3">
        <h1 className="text-3xl font-bold mb-4">Near-Earth Objects</h1>
        <p>You can see near-Earth objects based on close approach date.</p>

        {/* Date picker for start date */}
        <div className="mt-3">
          <label className="mb-1 block">Select start date:</label>
          <DatePicker
            selectedDate={selectedStartDate}
            onDateChange={handleStartDateChange}
            singleDate
          />
        </div>

        {/* Date picker for end date */}
        <div className="mt-3">
          <label className="mb-1 block">Select end date:</label>
          <DatePicker
            selectedDate={selectedEndDate}
            onDateChange={handleEndDateChange}
            singleDate
          />
        </div>

        {/* Warning message for date range */}
        {warningMessage && (
          <p className="text-red-500 mt-2">{warningMessage}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {asteroids.map((asteroid) => (
            <GridCard
              key={asteroid.id}
              type="asteroid"
              name={asteroid.name}
              closeApproachDate={asteroid.close_approach_date}
              diameter={asteroid.diameter}
              missDistance={asteroid.miss_distance}
              velocity={asteroid.velocity}
            />
          ))}
        </div>
      </div>
     </Layout>
    );
  };

  // Wrap the AsteroidsPage component with the AsteroidsProvider
  const WrappedAsteroidsPage: React.FC = () => (
    <AsteroidsProvider>
      <AsteroidsPage />
    </AsteroidsProvider>
  );

export default WrappedAsteroidsPage;
