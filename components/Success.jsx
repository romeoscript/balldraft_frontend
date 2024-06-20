import React from "react";
import emojipoper from "@/public/images/ emoji _partypopper.svg";
import Link from "next/link";

const Success = () => {
  return (
    <div className="flex items-center justify-center flex-col text-center my-[2rem]">
      <img src={emojipoper.src} alt="" />
      <div className="my-[1rem]">
        <p className="text-2xl font-bold">Welcome Onboard</p>
        <p>You’ve successfully created a BallDraft account</p>
      </div>
      <Link href={'/Auth/login'} className="w-[90%]">
        <button className="bg-gray-500  text-white w-[90%] m-auto my-[1rem] block text-grey-600 hover:bg-gray-700 hover:text-white text-left py-2 px-4 rounded-full flex items-center justify-center w-64">
          Explore now
        </button>
      </Link>
    </div>
  );
};
export default Success;
