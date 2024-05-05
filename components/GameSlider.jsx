import React, { useState } from "react";
import GameCard from "@/Reusable/GameCard";

const GameSlider = ({ games }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? games.length - 4 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === games.length - 4 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative">
      <div className="flex gap-5 overflow-x-scroll">
        {games.slice(currentIndex, currentIndex + 4).map((game, index) => (
          <GameCard key={index} {...game} />
        ))}
      </div>
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2"
        onClick={handlePrev}
      >
        Prev
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default GameSlider;
