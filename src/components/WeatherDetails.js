import React from "react";
import { LuEye, LuSunrise, LuSunset } from "react-icons/lu";
import { FiDroplet } from "react-icons/fi";
import { MdAir } from "react-icons/md";
import { ImMeter } from "react-icons/im";

function WeatherDetails(props) {
  const {
    visability = "25km",
    humidity = "61%",
    windSpeed = "7 km/h",
    airPressure = "1012 hPa",
  } = props;
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-4">
        <SingleWeatherDetail
          icon={<LuEye />}
          information="Visability"
          value={visability}
        />
        <SingleWeatherDetail
          icon={<FiDroplet />}
          information="Humidity"
          value={humidity}
        />
      </div>

      <div className="flex flex-col gap-4 mr-48">
        <SingleWeatherDetail
          icon={<MdAir />}
          information="Wind speed"
          value={windSpeed}
        />
        <SingleWeatherDetail
          icon={<ImMeter />}
          information="Air Pressure"
          value={airPressure}
        />
      </div>
    </div>
  );
}

function SingleWeatherDetail(props) {
  return (
    <div className="flex  gap-2 items-center text-xs font-semibold text-black/80">
      <div className="flex gap-4">
        <div className="text-3xl text-gray-400">{props.icon}</div>
      </div>
      <div className="flex flex-col">
        <p className="whitespace-nowrap text-gray-400">{props.information}</p>
        <p className="text-black/80 text-xl font-bold">{props.value}</p>
      </div>
    </div>
  );
}

export default WeatherDetails;
