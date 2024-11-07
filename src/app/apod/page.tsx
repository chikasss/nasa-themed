"use client";

import React from 'react';
import { useAPOD } from './APODContext';
import DatePicker from '../components/DatePicker';

const APODPage: React.FC = () => {
  const { apodData, loading, error, selectedDate, onDateChange } = useAPOD();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="apod-content text-white z-20 relative p-7">
      <h1 className="text-4xl font-bold mb-3">Astronomy Picture of the Day</h1>
      <p className='text-base mb-2'>Pick the day you want to see previous APOD</p>
      <DatePicker selectedDate={selectedDate} onDateChange={onDateChange} />

      <h2 className="text-2xl mt-4">{apodData?.title}</h2>
      <img src={apodData?.url} alt={apodData?.title} className="mt-4 rounded" />
      <p className="mt-5">{apodData?.explanation}</p>
    </div>
  );
};

export default APODPage;
