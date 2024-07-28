"use client";
import React, { useState } from "react";
import Sport from "@/public/images/Sport.svg";
import GameCard from "@/Reusable/GameCard";
import CircularProgressBar from "@/components/CircularProgressBar";
import Players from "@/components/Players";
import ContestTables from "@/components/Contests/ContestTables";
import { useParams } from "next/navigation";
import { useFetchDataPlans } from "@/Hooks/useFetch";

const Page = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4); // Increased visible cards to 4
  const  {id} = useParams();
  const { data: cards } = useFetchDataPlans(apiUrl)
  const apiUrl = `https://api.balldraft.com/get-fixture/${id}`;


  const handlePrevious = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNext = () => {
    if (startIndex < cards.length - visibleCards) {
      setStartIndex(startIndex + 1);
    }
  };

  return (
    <div className="p-[5px] sm:p-[1.5rem]">
      <div className="flex items-center justify-between w-full mb-10">
        <div>
          <div className="flex items-center gap-5 mb-5">
            <span className="font-bold text-lg">NBA Friday Baller </span>
            <img src="/images/Sport.svg" alt="Sport Icon" />
          </div>
          <div className="flex flex-col items-start sm:items-center md:flex-row gap-3 md:gap-10">
            <div className="flex gap-3 whitespace-nowrap text-[14px]">
              <button className="bg-[#FF6D00] rounded-full whitespace-nowrap text-white px-5 tracking-tight py-3">
                $15,000 - $3K To 1st
              </button>
              <button className="text-gray-700 tracking-tight">8:30 PM | Today</button>
            </div>
            <div className="flex gap-4 items-center tracking-tight text-[12px] sm:text-[15px]">
              <div className="flex gap-2">
                <p className="w-[25px] sm:w-[30px] text-[E6EAEE] text-[10px] sm:text-[11px] flex justify-center items-center font-[700] h-[25px] sm:h-[30px] rounded-[50%] bg-[#E6EAEE]">G</p>
                <button className="text-gray-700 ">Guaranteed Prize Pool</button>
              </div>
              <div className="flex gap-2">
                <p className="w-[25px] sm:w-[30px] text-[#ff0000] text-[10px] sm:text-[11px] flex justify-center items-center font-[700] h-[25px] sm:h-[30px] rounded-[50%] bg-[#ffe6e6]">M</p>
                <button className="text-gray-700">Multi-Entry (50 max)</button>
              </div>
            </div>
          </div>
        </div>
        <div className='lg:hidden'>
          <CircularProgressBar size={10}/>
        </div>
        <div className='lg:flex hidden'>
          <CircularProgressBar/>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 relative overflow-hidden  items-center ">
       <div className="flex gap-2 relative overflow-hidden  items-center ">
        <div className="rounded-xl flex items-center  mb-10 sm:p-5">
            <span className="font-semibold sm:mr-10 hidden">8 games</span>
            <button
              onClick={handlePrevious}
              className="p-3 rounded-lg bg-[#f1f0f0]"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_152_12752)">
                  <path
                    d="M15 6L9 12L15 18"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_152_12752">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>

          <div className="hidden sm:flex  transition-transform duration-300 gap-5 ease-in-out transform">
            {cards
              .slice(startIndex, startIndex + visibleCards)
              .map((card, index) => (
                <GameCard
                  key={index}
                  homeTeam={card.homeTeam}
                  awayTeam={card.awayTeam}
                  homeScore={card.homeScore}
                  awayScore={card.awayScore}
                  time={card.time}
                />
              ))}
          </div>

          <div className="flex sm:hidden transition-transform duration-300 gap-5 ease-in-out transform">
            {cards
              .slice(startIndex, startIndex + 2)
              .map((card, index) => (
                <GameCard
                  key={index}
                  homeTeam={card.homeTeam}
                  awayTeam={card.awayTeam}
                  homeScore={card.homeScore}
                  awayScore={card.awayScore}
                  time={card.time}
                />
              ))}
          </div>

          <div className="rounded-xl flex gap-2 items-center mb-10 p-5">
            <button
              onClick={handleNext}
              className="p-3 rounded-lg relative bg-[#f1f0f0]"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative top-[0.2rem] left-[40%]"
              >
                <path
                  d="M1 1L7 7L1 13"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className=" flex   items-center mb-10 px-5">
          <div className="flex flex-col gap-3 p-5 justify-center items-center">
            <span className="text-[#808080] text-[0.7rem]">ENTRIES</span>{" "}
            <span className="font-semibold text-md">405/2,300</span>
          </div>
          <div className="flex flex-col gap-3 p-5  border-x-[#808080] border-x-[1px]  justify-center items-center">
            <span className="text-[#808080] text-[0.7rem]">ENTRY FEE</span>{" "}
            <span className="font-semibold text-md">$20.00</span>
          </div>
          <div className="flex flex-col gap-3 p-5  justify-center items-center">
            <span className="text-[#808080] text-[0.7rem]">PRIZE POOL</span>{" "}
            <span className="font-semibold text-md">$50,000.00</span>
          </div>
        </div>
      </div>

       <ContestTables card={cards} />
    </div>
  );
};

export default Page;
