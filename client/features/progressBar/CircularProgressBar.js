import React from "react";

const CircularProgressBar = ({
  percentage,
  strokeWidth,
  trailColor,
  strokeColor,
  textColor,
}) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = percentage / 100;
  const offset = circumference * (1 - progress);

  return (
      <div className="relative w-20 h-20">
        <svg className="w-full h-full">
          <circle
            className="text-gray-900"
            strokeWidth={strokeWidth}
            stroke={trailColor}
            fill="transparent"
            r={radius - strokeWidth / 2}
            cx="50%"
            cy="50%"
          />
          <circle
            className="text-blue-600"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke={strokeColor}
            fill="transparent"
            r={radius - strokeWidth / 2}
            cx="50%"
            cy="50%"
          />
          <text
            className={`text-white text-center ${textColor}`}
            x="50%"
            y="45%"
            dominantBaseline="middle"
            textAnchor="middle"
          >
            {percentage}%
          </text>
        </svg>
      </div>
  );
};

export default CircularProgressBar;
