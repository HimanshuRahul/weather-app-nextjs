"use client";

import React from "react";
import { useQuery } from "react-query";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { loadingCityAtom } from "@/app/atom";
import WeatherIcon from "./WeatherIcon";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

function CurrentLocation({ searchQuery }) {
  const [loadingCity, setLoadingCity] = useAtom(loadingCityAtom);
  const { isLoading, error, data, refetch } = useQuery(
    ["repoData", searchQuery],
    async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchQuery}&appid=${API_KEY}&cnt=56&units=metric`
      );
      return data;
    },
    { enabled: !!searchQuery }
  );

  useEffect(() => {
    if (searchQuery) {
      refetch();
    }
  }, [searchQuery, refetch]);

  const firstData = data?.list[0];
  const icon = firstData?.weather[0]?.icon || "01d";

  const location = data?.city.name;

  return (
    <div>
      <div className="flex justify-between w-3/5 p-4 px-16 ">
        <div className="flex flex-col px-4">
          <div>
            <p className="text-slate-900/90 text-2xl font-bold mb-16">
              {location}
            </p>
            <span className="text-5xl font-bold">
              {Math.floor(firstData?.main?.temp ?? 38)}°
            </span>
          </div>
          <p className="text-xs space-x-1 whitespace-nowrap">
            <span>Feels like</span>
            <span>{Math.floor(firstData?.main?.feels_like ?? 38)}°</span>
          </p>
        </div>
        <div className="flex -my-4">
          <WeatherIcon className="h-48 w-48" iconName={icon} />
        </div>
      </div>
    </div>
  );
}

export default CurrentLocation;
