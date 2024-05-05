"use client";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import GameTypes from "@/components/GameTypes";
import Contextcard from "@/components/Contests/Contextcard";
import SportsBook from "@/components/SportsBook";


export default function Home() {
  useEffect(() => {
    Aos.init({
      duration: 800,
      once: false,
    });
  }, []);

  return (
    <div>
      {/* <SportsBook /> */}
     
      <div className="bg-white border-t-[2px] flex justify-between">
        <GameTypes
          categories={["Game Category", "Entry Type", "Contest Level"]}
          labels={[
            ["Full Roaster", "Single Game"],
            ["All", "Single Entry", "Multiple Entry"],
            ["All Players", "Beginners", "Experienced"],
          ]}
          initialValues={50}
          onChange={(value) => console.log("Selected value:", value)}
        />

        <div className=" w-full p-5 ">
          <Contextcard type="EPL" title="EPL" />
          <Contextcard type="UFC" title="UFC" />
          <Contextcard type="EPL" title="EPL" />
          <Contextcard type="NBA" title="NBA" />
          <Contextcard type="EPL" title="EPL" />
          <Contextcard type="EPL" title="EPL" />
          <Contextcard type="EPL" title="EPL" />
          <Contextcard type="EPL" title="EPL" />
        </div>
      </div>
    </div>
  );
}
