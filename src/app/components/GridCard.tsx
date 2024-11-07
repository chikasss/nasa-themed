import React from "react";

interface GridCardProps {
  type: "asteroid" | "mars";
  name?: string;
  closeApproachDate?: string;
  diameter?: number;
  missDistance?: number | string;
  velocity?: number;
  imgUrl?: string;
  roverName?: string;
  cameraName?: string;
  earthDate?: string;
}

const GridCard: React.FC<GridCardProps> = (props) => {
  return (
    <div className="border  border-gray-300 rounded-lg shadow p-4">
      {props.type === "asteroid" ? (
        <>
          <h2 className="text-lg font-bold">{props.name}</h2>
          <p className="text-white-600">Close Approach Date: {props.closeApproachDate}</p>
          <p className="text-white-600">Diameter: {Number(props.diameter).toFixed(2)} meters</p>
          <p className="text-white-600">Miss Distance: {Number(props.missDistance).toFixed(2)} km</p>
          <p className="text-white-600">Velocity: {Number(props.velocity).toFixed(2)} km/h</p>
        </>
      ) : (
        <>
          <img src={props.imgUrl} alt="Mars Rover" className="w-full h-auto rounded-lg" />
          <div className="mt-2 text-center">
            <p className="text-lg font-semibold">{props.roverName}</p>
            <p className="text-sm">{props.cameraName}</p>
            <p className="text-xs">{props.earthDate}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default GridCard;
