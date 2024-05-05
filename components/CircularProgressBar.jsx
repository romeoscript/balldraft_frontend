import { useEffect, useState } from "react";

const CircularProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 70) {
        setProgress((prevProgress) => prevProgress + 1);
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <div className="relative w-32 h-32">
      <svg
        className="absolute top-0 left-0 transform -rotate-90"
        viewBox="0 0 36 36"
      >
        <circle
          className=""
          strokeWidth="4"
          fill="transparent"
          r="15.91549430918954"
          cx="18"
          cy="18"
          stroke="#0F93FC" // Set stroke color here
          strokeDasharray={`${
            (progress / 100) * (2 * Math.PI * 15.91549430918954)
          }, 100`}
        />
      </svg>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center border rounded-full">
        {/* <span className="text-3xl font-bold">{progress}%</span> */}
        <div className="flex flex-col justify-center gap-2 items-center">
          <span className="text-md font-bold">09:49:00</span>
          <span className="text-sm">Left</span>
        </div>
      </div>
    </div>
  );
};

export default CircularProgressBar;
