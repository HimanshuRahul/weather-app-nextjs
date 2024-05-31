import React, { useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import WeatherIcon from "@/components/WeatherIcon";
import { filterDataStartingFrom6AM } from "@/utils/weatherUtils";
import { format } from "date-fns";
import { cn } from "@/utils/cn";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

const CityForecast = ({ cityName, intervals = 3, className }) => {
  const { data, refetch } = useQuery(
    ["forecastData", cityName],
    async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&cnt=56&units=metric`
      );
      return data;
    },
    { enabled: !!cityName }
  );

  useEffect(() => {
    if (cityName) {
      refetch();
    }
  }, [cityName, refetch]);

  const filteredData = filterDataStartingFrom6AM(data?.list ?? [], intervals);

  return (
    <div
      className={cn(
        "flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3",
        className
      )}
    >
      {filteredData.map((d, index) => (
        <div
          key={index}
          className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
        >
          <p className="whitespace-nowrap text-gray-400">
            {format(new Date(d.dt_txt), "h:mm a")}
          </p>
          <WeatherIcon iconName={d.weather[0].icon} />
          <p className="text-base font-semibold">
            {Math.floor(d?.main.temp ?? 0)}°
          </p>
        </div>
      ))}
    </div>
  );
};

export default CityForecast;
