"use client"
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Balance from "@/components/Balance";
import SportsBook from "@/components/SportsBook";
import MoreContext from "@/components/Contests/MoreContextTabs";
import ContextSwiper from "@/components/Contests/contextswiper";


export default function Home() {
  useEffect(() => { 
    Aos.init({
      duration: 800,
          once: false,
    });
  }, [])
  return (
    <div className="bg-white">
      <Balance />
      <SportsBook />
      <ContextSwiper />
      <MoreContext />
    </div>
  );
}
