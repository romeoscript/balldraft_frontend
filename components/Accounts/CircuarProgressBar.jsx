// CircularProgressBar.js
import React from 'react';

const CircularProgressBar = ({ percentage, imageUrl }) => {
    const radius = 25;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center h-32 w-32">
            <svg className="relative h-full w-full">
                <circle
                    className="text-gray-300"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="32"
                    cy="32"
                />
                <circle
                    className="text-blue-500"
                    strokeWidth="4"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="32"
                />
            </svg>
            <img
                className="absolute w-20 h-20 rounded-full object-cover"
                src={imageUrl}
                alt="Avatar"
            />
            <text
                className="absolute text-blue-500 text-xs"
                x="50%"
                y="75%"
                dominantBaseline="middle"
                textAnchor="middle"
            >
                {percentage}%
            </text>
        </div>
    );
};

export default CircularProgressBar;
