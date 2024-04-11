"use client"
import { useState } from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";

const Counter = () => {
    return (<div></div>)
}

// TODO connect the counter to the real number of items in the trust claim graph
const FutureCounter = () => {
    const [viewPortEntered, setViewPortEntered] = useState(false);
    return (
     <section >
         <ScrollTrigger
        onEnter={() => setViewPortEntered(true)}
        onExit={() => setViewPortEntered(false)}
      >
        <div className="max-md:flex items-center text-right text-white z-10 rounded-[20px]">
          <aside className=" md:p-[1rem]">
            <h1 className="md:text-3xl text-xl  mb-3 font-bold ">
              +{viewPortEntered && <CountUp end={102} duration={2} />}K
            </h1>
            <p className="md:text-xs text-[10px]">Users</p>
          </aside>
          <aside className=" p-[1rem] md:m-0 my-[0.5rem]">
            <h1 className="md:text-3xl text-xl   mb-3 font-bold">
              +{viewPortEntered && <CountUp end={92} duration={2} />}K
            </h1>
            <p className="md:text-xs text-[10px]">Daily Active Users</p>
          </aside>
          <aside className=" p-[1rem] md:m-0 my-[0.5rem]">
            <h1 className="md:text-3xl text-xl   mb-3 font-bold">
              {viewPortEntered && <CountUp end={80} duration={2} />}K+
            </h1>
            <p className="md:text-xs text-[10px]">New Users/month </p>
          </aside>
        </div>
      </ScrollTrigger>
     </section>
  )
}

export default FutureCounter
