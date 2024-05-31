import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { format, isToday, fromUnixTime } from "date-fns";
import ForecastWeatherDetail from "./ForecastWeatherDetail";
import LoadingSpinner from "./LoadingSpinner";
import { getFilteredData, getUniqueDates } from "@/utils/weatherUtils";
import { cn } from "@/utils/cn";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

const defaultEntry = (date) => ({
  dt: Math.floor(new Date(date).getTime() / 1000),
  main: {
    feels_like: 0,
    temp: 0,
    temp_max: 0,
    temp_min: 0,
    pressure: 0,
    humidity: 0,
  },
  weather: [
    {
      description: "No data",
      icon: "01d",
    },
  ],
  visibility: 10000,
  wind: {
    speed: 0,
  },
  dt_txt: new Date(date).toISOString(),
});

const DaysForecast = ({ cityName, days = 3, compact = false, className }) => {
  const { isLoading, error, data, refetch } = useQuery(
    ["forecastData", cityName],
    async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&cnt=56&units=metric`
      );
      return data;
    },
    { enabled: !!cityName }
  );

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error fetching data</div>;

  const filteredData = getFilteredData(data?.list);
  const uniqueDates = getUniqueDates(filteredData);

  const forecastEntries = uniqueDates
    .map((date) => {
      return (
        filteredData.find((entry) => {
          const entryDate = new Date(entry.dt * 1000)
            .toISOString()
            .split("T")[0];
          return entryDate === date;
        }) || defaultEntry(date)
      );
    })
    .slice(0, days);

  return (
    <section className={cn("flex flex-col", className)}>
      <div className="flex flex-col gap-4">
        <p className="uppercase text-sm font-bold text-gray-400  px-4 -mb-2">
          {days}-DAYS FORECAST
        </p>
        {forecastEntries.map((d, i) => (
          <ForecastWeatherDetail
            key={i}
            description={d.weather[0].description}
            weatherIcon={d.weather[0].icon}
            day={
              isToday(new Date(d.dt_txt))
                ? "Today"
                : format(new Date(d.dt_txt), "EEE")
            }
            feels_like={Math.round(d.main.feels_like)}
            temp={Math.round(d.main.temp)}
            temp_max={Math.round(d.main.temp_max)}
            temp_min={Math.round(d.main.temp_min)}
            airPressure={`${d.main.pressure} hPa`}
            humidity={`${d.main.humidity}%`}
            sunrise={format(fromUnixTime(data.city.sunrise), "H:mm")}
            sunset={format(fromUnixTime(data.city.sunset), "H:mm")}
            visibility={`${d.visibility}m`}
            windSpeed={`${d.wind ? (d.wind.speed * 3.6).toFixed(2) : "0"} km/h`}
            compact={compact}
          />
        ))}
      </div>
    </section>
  );
};

export default DaysForecast;
