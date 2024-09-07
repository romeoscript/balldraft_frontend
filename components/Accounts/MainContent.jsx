import React from "react";
import Balance from "../Balance";
import TransactionTable from "./TransactionTable";
import Referal from "./referal";
import RewardBanner from "./RewardBanner";
import RewardBannerTwo from "../RewardBannerTwo";
import ProfileBalance from "../ProfileBalance";

const MainContent = (props) => {
  return (
    <div className="w-full">
      {/* <Balance /> */}
      <ProfileBalance profile={props.profile}/>
      <figure className="w-full flex flex-col">
        <RewardBannerTwo />
        {/* <RewardBanner /> */}
        <Referal />
        <div className="flex text-black items-center justify-between p-[1rem] w-full">
          <h2 className="text-2xl">Recent Transactions </h2> <p>See all</p>
        </div>

        <TransactionTable />
      </figure>
    </div>
  );
};

export default MainContent;
