import React from "react";
import Icon from "@/Reusable/Icons/Icons";
import gift from '@/public/images/giftbox.png'


const RewardBannerTwo = () => {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-center justify-center w-[100%] sm:h-[300px] rounded-xl overflow-hidden">
      <div className="flex flex-row w-full sm:w-[70%] h-full py-10 px-4 bg-[#2B4565] bg-line-bg bg-no-repeat bg-cover bg-center">
        <div className="">
          <h2 className="text-xl text-white font-medium">Earn Reward</h2>
          <p className="mt-[1rem] text-white leading-[2.5]">
            Refer a friend to Balldraft and earn a bonus of <span className="text-[#F9D848]">$15</span>. For every
            friend you refer who registers for Balldraft, you’ll receive a <span className="text-[#F9D848]">$15 </span>
             bonus
          </p>
          <button className="text-white px-4 py-[0.7rem] border-[1px] border-white rounded-full mt-[1rem] flex flex-row">
            View full details <Icon type="arrowslant"  />
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center w-full sm:w-[30%] h-full bg-[#E6F4FF] ">
            <img src={gift.src} alt="" className="object-cover object-center"/>
      </div>
    </div>
  );
};

export default RewardBannerTwo;
