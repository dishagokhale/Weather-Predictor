import React from 'react';
import { SunIcon, CloudIcon, RainIcon } from '@heroicons/react/solid';

const iconMap = {
  "Sunny": <SunIcon className="h-16 w-16 text-yellow-500" />,
  "Mostly cloudy w/ t-storms": <RainIcon className="h-16 w-16 text-blue-500" />,
  "Mostly cloudy": <CloudIcon className="h-16 w-16 text-gray-500" />,
  // Add more mappings for different weather conditions
};

export const WeatherCard = ({ weather }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">{weather.city}</h2>
      <div className="flex items-center">
        {iconMap[weather.icon]}
        <div className="ml-4">
          <div className="text-4xl font-bold">{weather.temperature.Maximum.Value}°{weather.temperature.Maximum.Unit}</div>
          <div className="text-xl">{weather.condition}</div>
        </div>
      </div>
    </div>
  );
};
