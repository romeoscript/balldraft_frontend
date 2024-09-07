"use client";
import React, { useEffect } from "react";
import nature from "@/public/images/nature.svg";
import map from "@/public/images/map.svg";
import system from "@/public/images/system.svg";
import { usePathname } from "next/navigation";
import Icon from "@/Reusable/Icons/Icons";
import { useFetchDataPlans } from "@/Hooks/useFetch";

const ProfileBalance = (props) => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const apiUrl = `${url}/profile`;
  const { data: userProfile } = useFetchDataPlans(apiUrl);

  const { leagues } = props;
  const fixtures = leagues?.leagues?.map((league) => league.fixtures).flat();

  const comingUp =
    fixtures?.filter((fixture) => fixture.upcoming == true) || [];

  const live = fixtures?.filter((fixture) => fixture.live == true) || [];
  //   console.log("user profile", userProfile);

  function maskAccountNumber(accountNumber) {
    var suffix = accountNumber?.slice(-4);
    var maskedString = "**** " + suffix;
    return maskedString;
  }

  const accountNumber = userProfile?.account_number || "*******";

  const data = [
    {
      id: 1,
      title: "Coming Up",
      image: nature,
      points: comingUp.length,
    },
    {
      id: 2,
      title: "Live Games",
      image: system,
      points: live.length,
    },
    {
      id: 3,
      title: "Total Points Earned",
      image: map,
      points: 50,
    },
  ];

  const isAccount = usePathname().includes("account");
  return (
    <div className="flex flex-col lg:flex-row gap-4 p-[1rem]">
      <figure
        className={`flex flex-col ${
          isAccount ? "basis-[100%]" : "basis-[40%]"
        } bg-[#F5F5F5] shadow-md text-black p-[1rem] rounded-[20px] relative`}
      >
        <section className="flex flex-col">
          <aside className="flex items-center gap-5 p-[1rem]">
            <div className="avatar">
              <div className="w-4 rounded-full ring ">
                <img src="https://via.placeholder.com/80" />
              </div>
            </div>
            <p> Total Balance</p>
          </aside>
          <aside className="flex flex-wrap gap-3 justify-between p-[1rem]  text-white cursor-pointer">
            <p className="text-2xl text-black font-bold flex-shrink-0">
              ${userProfile?.account_balance || "0"}.00 USD
            </p>
            {isAccount && (
              <div className="flex s-3:hidden gap-3 max-[400px]:gap-2">
                <aside className="flex text-white cursor-pointer">
                  <div className="bg-[#012C51] w-[54px] h-[54px] rounded-full flex gap-2 items-center justify-center">
                    <Icon type="topup" />
                  </div>
                </aside>
                <aside className="flex justify-between text-white cursor-pointer">
                  <div className="bg-[#012C51] rounded-full flex gap-2 w-[54px] h-[54px] items-center justify-center">
                    <Icon type="withdraw" />
                  </div>
                </aside>
              </div>
            )}
            {isAccount ? (
              <aside className="flex items-center flex-wrap gap-8 ">
                <div className="flex-shrink-0">
                  <h2 className="text-[#012C51] text-sm s-2:text-[1.1rem] font-medium">
                    Funds Deposited
                  </h2>
                  <p className="text-[#808080] text-xl s2:text-2xl">
                    $75.000 USD
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <h2 className="text-[#012C51] text-sm s-2:text-[1.1rem] font-medium">
                    Rewards earned
                  </h2>
                  <p className="text-[#808080] text-xl s2:text-2xl">
                    $25.000 USD
                  </p>
                </div>
              </aside>
            ) : (
              <div>
                <div className="bg-[#012C51] p-5 lg:p-[1rem] lg:px-[2rem] rounded-full flex gap-2">
                  <span className="flex">
                    <Icon type="topup" />
                    <span className="hidden lg:flex">Top up</span>
                  </span>
                </div>
                <span className="font-medium lg:hidden flex text-[#012C51]">
                  Top up
                </span>
              </div>
            )}
          </aside>
        </section>

        <aside className="flex flex-row flex-wrap gap-4 justify-between py-[1rem] ">
          {isAccount && (
            <div className="flex max-s-3:hidden">
              <aside className="flex justify-between p-[1rem]  text-white cursor-pointer">
                <div className="bg-[#012C51] p-[1rem] px-[2rem] rounded-full flex gap-2">
                  <Icon type="topup" /> Top up
                </div>
              </aside>
              <aside className="flex justify-between p-[1rem]  text-white cursor-pointer">
                <div className="bg-[#012C51] p-[1rem] px-[2rem] rounded-full flex gap-2">
                  <Icon type="withdraw" /> Withdraw
                </div>
              </aside>
            </div>
          )}

          <div className="flex flex-row justify-between gap-4">
            <div>
              <p className="text-sm max-[360px]:text-[0.7rem]"> last Spent</p>
              <p className="max-[360px]:text-[0.8rem] text-[1rem] sm:text-xl font-bold mt-[1rem]">
                January 4, 2023
              </p>
            </div>
            <div className="border-x-[1px] px-[1rem] border-gray-500">
              <p className="text-sm max-[360px]:text-[0.7rem]"> last Spent</p>
              <p className="max-[360px]:text-[0.8rem] text-[1rem] sm:text-xl font-bold mt-[1rem]">
                January 4, 2023
              </p>
            </div>
            <div>
              <p className="text-sm max-[360px]:text-[0.7rem]">
                Payment Method
              </p>
              <p className="max-[360px]:text-[0.8rem] sm:text-xl font-bold mt-[1rem]">
                {maskAccountNumber(accountNumber)}
              </p>
            </div>
          </div>
        </aside>
      </figure>

      {!isAccount && (
        <figure className="flex items-center justify-around basis-[60%]">
          {data.map((item) => (
            <div key={item.id} className=" text-black p-[1rem] ">
              <aside className=" lg:p-[1rem] flex flex-col justify-center">
                <img src={item.image.src} />
                <p className="text-sm text-gray-500"> {item.title}</p>
                <p className="font-bold ">{item.points}</p>
              </aside>
            </div>
          ))}
        </figure>
      )}
    </div>
  );
};

export default ProfileBalance;
