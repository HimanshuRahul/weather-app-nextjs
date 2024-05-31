import Image from "next/image";
import React from "react";
import { cn } from "@/utils/cn";

function WeatherIcon({ className, iconName }) {
  const heightMatch = className?.match(/h-(\d+)/);
  const widthMatch = className?.match(/w-(\d+)/);
  const height = heightMatch ? parseInt(heightMatch[1], 10) * 4 : 80;
  const width = widthMatch ? parseInt(widthMatch[1], 10) * 4 : 80;

  return (
    <div className={cn("relative h-20 w-20", className)}>
      <Image
        width={width}
        height={height}
        alt="weather-icon"
        className="absolute w-full h-full filter brightness-100 contrast-75"
        src={`https://openweathermap.org/img/wn/${iconName}@4x.png`}
      />
    </div>
  );
}

export default WeatherIcon;
