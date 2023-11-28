"use client";

import { useEffect, useState } from "react";

const SeasonsPicker = ({ setDataForm }) => {
  const seasons = ["Spring", "Summer", "Autumn", "Winter"];
  const [selectedSeason, setSelectedSeason] = useState(null);

  const handleSeasonClick = (season) => {
    setSelectedSeason(season);
  };

  useEffect(()=>{
    setDataForm((oldValue)=>{
      return {
        ...oldValue,
        season: selectedSeason
      }
    })
  },[selectedSeason])

  return (
    <div className="p-4">
      <p className="mb-2">Select one season:</p>
      <div className="flex">
        {seasons.map((season) => (
          <span
            key={season}
            onClick={() => handleSeasonClick(season)}
            className={`mr-2 px-4 py-2 rounded cursor-pointer ${
              selectedSeason === season ? "bg-blue-200" : "bg-white"
            }`}
          >
            {season}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SeasonsPicker;
