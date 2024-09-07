import React from "react";
import UserProfile from "./UserProfile";
import Icon from "@/Reusable/Icons/Icons";

const Sider = (props) => {
  return (
    <div
      className={`border-r-[1px] border-gray p-[1rem] flex flex-col justify-between ${props.className}`}
    >
      <div className="flex flex-col gap-20 justify-between">
        <UserProfile profile={props.profile} />
        <ul>
          <li className="flex items-center gap-3 text-[#012C51] py-[0.5rem] hover:text-white hover:bg-[#012c51] rounded-md">
            {" "}
            <Icon type="tickets" /> Tickets
          </li>
          <li className="flex items-center gap-3 text-[#012C51] py-[0.5rem] hover:text-white hover:bg-[#012c51] rounded-md">
            <Icon type="log" />
            Activity Log
          </li>
          <li className="flex items-center gap-3 text-[#012C51] py-[0.5rem] hover:text-white hover:bg-[#012c51] rounded-md">
            <Icon type="game" />
            Responsible Gambling
          </li>
          <li className="flex items-center gap-3 text-[#012C51] py-[0.5rem] hover:text-white hover:bg-[#012c51] rounded-md">
            <Icon type="history" />
            Transaction History
          </li>
          <li className="flex items-center gap-3 text-[#012C51] py-[0.5rem] hover:text-white hover:bg-[#012c51] rounded-md">
            <Icon type="tax" />
            Taxing & Forms
          </li>
          <li className="flex items-center gap-3 text-[#ff0000] py-[0.5rem] hover:text-white hover:bg-[#012c51] rounded-md">
            <Icon type="logout" />
            Sign Out
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-4 text-[#012C51]">
        <img
          className=" w-14 h-14 rounded-full object-cover"
          src="https://via.placeholder.com/80"
          alt="Avatar"
        />
        Account Settings
      </div>
    </div>
  );
};

export default Sider;
