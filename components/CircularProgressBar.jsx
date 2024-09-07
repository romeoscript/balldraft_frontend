import { useEffect, useState } from "react";

const CircularProgressBar = ({contestTime}) => {
  const [progress, setProgress] = useState(0);
  const [timeleft, setTimeLeft] = useState('00:00:00')
  const [percentageCovered, setPercentageCovered] = useState(100)

  // useEffect(() => {
  //   const futureDate = new Date(contestTime);
  //   const startDate = new Date();
  //   const totalTime = futureDate - startDate;
    
  //   const calculateTimeLeft = () => {
  //     const now = new Date();

  //     const timeDiff = futureDate - now;

  //     if (timeDiff <= 0) {
  //       setTimeLeft('00:00:00');
  //       return;
  //     }

  //     const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  //     const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  //     const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  //     const formattedTime = 
  //       String(hours).padStart(2, '0') + ':' + 
  //       String(minutes).padStart(2, '0') + ':' + 
  //       String(seconds).padStart(2, '0');

  //     const percentageRemaining = (timeDiff / totalTime) * 100;
  //     setTimeLeft(formattedTime);
  //     setPercentageCovered(Math.ceil(100-percentageRemaining))
  //   };

  //   // calculateTimeLeft();

  //   // Set interval to update time left every 10 seconds
  //   const intervalId = setInterval(calculateTimeLeft, 1000);

  //   return () => clearInterval(intervalId);
  // }, [contestTime]);



  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (progress < percentageCovered) {
  //       setProgress((prevProgress) => prevProgress + 1);
  //     } else {
  //       clearInterval(interval);
  //     }
  //   }, 30);

  //   return () => clearInterval(interval);
  // }, [percentageCovered, progress]);

  return (
    <div className="relative w-32 h-32 hidden sm:block">
      <svg
        className="absolute top-0 left-0 transform -rotate-90"
        viewBox="-5 -5 40 40"
      >
        <circle
          className=""
          strokeWidth="4"
          fill="transparent"
          r="15.91549430918954"
          cx="15"
          cy="15"
          stroke="#0F93FC" // Set stroke color here
          strokeDasharray={`${
            (progress / 100) * (2 * Math.PI * 15.91549430918954)
          }, 100`}
        />
      </svg>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center border rounded-full">
        {/* <span className="text-3xl font-bold">{progress}%</span> */}
        <div className="flex flex-col justify-center gap-2 items-center">
          <span className="text-[1rem] font-bold">{timeleft}</span>
          <span className="text-[0.7rem]">Left</span>
        </div>
      </div>
    </div>
  );
};

export default CircularProgressBar;
