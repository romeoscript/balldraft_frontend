import React, { useState } from "react";

const Players = () => {
  const [activeButton, setActiveButton] = useState("All");

  // Define a function to handle button clicks
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div>
      <div className="flex">
        <button
          className={`px-[1.5rem] py-[0.3rem] rounded-full m-1 ${
            activeButton === "All" ? "bg-gray-500  text-white" : "border-[2px]"
          }`}
          onClick={() => handleButtonClick("All")}
        >
          All
        </button>
        <button
          className={`px-[1.5rem] py-[0.3rem] rounded-full m-1 ${
            activeButton === "QB" ?"bg-gray-500  text-white" : "border-[2px]"
          }`}
          onClick={() => handleButtonClick("QB")}
        >
          QB
        </button>
        <button
          className={`px-[1.5rem] py-[0.3rem] rounded-full m-1 ${
            activeButton === "RB" ? "bg-gray-500  text-white" : "border-[2px]"
          }`}
          onClick={() => handleButtonClick("RB")}
        >
          RB
        </button>
        <button
          className={`px-[1.5rem] py-[0.3rem] rounded-full m-1 ${
            activeButton === "WR" ? "bg-gray-500  text-white" : "border-[2px]"
          }`}
          onClick={() => handleButtonClick("WR")}
        >
          WR
        </button>
        <button
          className={`px-[1.5rem] py-[0.3rem] rounded-full m-1 ${
            activeButton === "TE" ? "bg-gray-500  text-white" : "border-[2px]"
          }`}
          onClick={() => handleButtonClick("TE")}
        >
          TE
        </button>
        <button
          className={`px-[1.5rem] py-[0.3rem] rounded-full m-1 ${
            activeButton === "FLEX" ? "bg-gray-500  text-white" : "border-[2px]"
          }`}
          onClick={() => handleButtonClick("FLEX")}
        >
          FLEX
        </button>
        <button
          className={`px-[1.5rem] py-[0.3rem] rounded-full m-1 ${
            activeButton === "DEF" ? "bg-gray-500 text-white" : "border-[2px]"
          }`}
          onClick={() => handleButtonClick("DEF")}
        >
          DEF
        </button>
      </div>

      <div>
        {/* Display the contents based on the active button */}
        {activeButton === "All" && (
          <div>
            Content for All
            Display whatever content you want for All
          </div>
        )}
        {activeButton === "QB" && (
          <div>
            Content for QB
            Display whatever content you want for QB
          </div>
        )}
        {activeButton === "RB" && (
          <div>
            Content for RB
            Display whatever content you want for RB
          </div>
        )}
        {activeButton === "WR" && (
          <div>
            Content for WR
            Display whatever content you want for WR
          </div>
        )}
        {activeButton === "TE" && (
          <div>
            Content for TE
            Display whatever content you want for TE
          </div>
        )}
        {activeButton === "FLEX" && (
          <div>
            Content for FLEX
            Display whatever content you want for FLEX
          </div>
        )}
        {activeButton === "DEF" && (
          <div>
            Content for DEF
            Display whatever content you want for DEF
          </div>
        )}
      </div>
    </div>
  );
};

export default Players;
