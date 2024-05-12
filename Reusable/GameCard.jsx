import React from "react";

const GameCard = ({ homeTeam, awayTeam, homeScore, awayScore, time }) => {
  return (
    <div className="rounded-xl shadow-md inline-block mb-10 shadow-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <span className="text-sm">{homeTeam}</span>
        <div className="flex gap-2 items-center">
          <span className="text-sm">{homeScore}</span>
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L7 7L13 1H1Z"
              fill="#808080"
              stroke="#808080"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="flex items-center justify-between mb-5">
        <span className="text-sm">{awayTeam}</span>
        <div className="flex gap-2 items-center">
          <span className="text-sm">{awayScore}</span>
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L7 7L13 1H1Z"
              fill="#808080"
              stroke="#808080"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <p className="text-sm  text-center">{time}</p>
    </div>
  );
};

export default GameCard;
