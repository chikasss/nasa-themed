"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

const APODContext = createContext<any>(null);

export const APODProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [apodData, setApodData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAPOD = async () => {
            try {
                const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`);
                if (!response.ok) throw new Error('Failed to fetch APOD');
                const data = await response.json();
                setApodData(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }

        };

        fetchAPOD();
    }, []);

    return (
        <APODContext.Provider value={{ apodData, loading, error }}>
            {children}
        </APODContext.Provider>
    );
};

export const useAPOD = () => {
    return useContext(APODContext);
};
