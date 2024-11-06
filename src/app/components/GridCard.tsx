import React from "react";

interface GridCardProps {
  name: string;
  closeApproachDate: string;
  diameter: number;
  missDistance: number | string;
  velocity: number;
}

const GridCard: React.FC<GridCardProps> = ({
  name,
  closeApproachDate,
  diameter,
  missDistance,
  velocity,
}) => {
  return (
    <div className="border rounded-lg shadow p-4">
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="text-white-600">Close Approach Date: {closeApproachDate}</p>
      <p className="text-white-600">Diameter: {Number(diameter).toFixed(2)} meters</p>
      <p className="text-white-600">Miss Distance: {Number(missDistance).toFixed(2)} km</p>
      <p className="text-white-600">Velocity: {Number(velocity).toFixed(2)} km/h</p>
    </div>
  );
};

export default GridCard;
