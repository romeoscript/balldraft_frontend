// UserProfile.js
import React from "react";
import CircularProgressBar from "./CircuarProgressBar";

const UserProfile = ({profile}) => {
  return (
    <section className="flex gap-4 items-center flex-shrink-0">
      <div
        className="radial-progress text-primary flex-shrink-0"
        style={{ "--value": "95", "--size": "6rem" }}
        role="progressbar"
      >
        <img
          className=" w-14 h-14 rounded-full object-cover"
          src="https://via.placeholder.com/80"
          alt="Avatar"
        />
      </div>
      <div>
        <h2 className="text-2xl text-black text-[1.14rem] font-medium">
          {profile.full_name}
        </h2>
        <p className="font-[0.9rem]">{profile.email}</p>
        {/* <p className="font-[0.9rem]">Your profile is 75% complete</p> */}
        <p className="text-[1.1rem] text-black">Finish setup {">"}</p>
      </div>
    </section>
  );
};

export default UserProfile;
