"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

const APODContext = createContext<any>(null);

export const APODProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [apodData, setApodData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const fetchAPOD = async (date?: string) => {
        setLoading(true);
        setError(null);

        try {
            const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`;
            const dateParam = date ? `&date=${date}` : '';
            const response = await fetch(`${apiUrl}${dateParam}`);

            if (!response.ok) throw new Error('Please select previous date');
            const data = await response.json();
            setApodData(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAPOD(selectedDate || undefined);
    }, [selectedDate]);

    const handleDateChange = (date: string) => {
        setSelectedDate(date);
    };

    return (
        <APODContext.Provider value={{ apodData, loading, error, selectedDate, onDateChange: handleDateChange }}>
            {children}
        </APODContext.Provider>
    );
};

export const useAPOD = () => {
    return useContext(APODContext);
};
