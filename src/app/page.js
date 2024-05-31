"use client";

import { useQuery } from "react-query";
import axios from "axios";
import Container from "@/components/Container";
import WeatherIcon from "@/components/WeatherIcon";
import WeatherDetails from "@/components/WeatherDetails";
import { convertWindSpeed } from "@/utils/convertWindSpeed";
import DaysForecast from "@/components/DaysForecast";
import { loadingCityAtom, placeAtom } from "./atom";
import { useAtom } from "jotai";
import { useEffect } from "react";
import WeatherSkeleton from "@/components/WeatherSkeleton";
import CurrentLocation from "@/components/CurrentLocation";
import LoadingSpinner from "@/components/LoadingSpinner";

import CityForecast from "@/components/CityForecast";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

export default function Home() {
  const [place, setPlace] = useAtom(placeAtom);
  const [loadingCity, setLoadingCity] = useAtom(loadingCityAtom);

  const { isLoading, error, data, refetch } = useQuery("repoData", async () => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${API_KEY}&cnt=56&units=metric`
    );
    return data;
  });

  useEffect(() => {
    refetch();
  }, [place, refetch]);

  const firstData = data?.list[0];

  if (isLoading || loadingCity) return <LoadingSpinner />;

  return (
    <div className="flex gap-4 h-full">
      {loadingCity ? (
        <WeatherSkeleton />
      ) : (
        <>
          <main className="px-3 max-w-7xl mx-auto ml-12 -mr-96 flex flex-col">
            <section className="space-y-4 space-x-4">
              <div className="space-y-2">
                <CurrentLocation searchQuery={place} />
              </div>

              <div className="flex gap-4 w-3/5">
                <Container className=" gap-10 px-6 items-center overflow-hidden py-6">
                  <p className="capitalize text-center ">
                    <CityForecast cityName={place} intervals={5} />
                  </p>
                  <WeatherIcon iconName={firstData?.weather[0].icon ?? ""} />
                </Container>
              </div>
              <Container className=" flex flex-col justify-between px-6 gap-4 w-3/5 overflow-x-auto py-6">
                <div className="flex justify-between uppercase text-sm font-bold text-gray-400">
                  <p>Air Conditions</p>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-xs font-semibold">
                    See more
                  </button>
                </div>
                <WeatherDetails
                  visability={`${firstData?.visibility} m` ?? 10000}
                  airPressure={`${firstData?.main.pressure} hPa`}
                  humidity={`${firstData?.main.humidity}%`}
                  windSpeed={convertWindSpeed(firstData?.wind.speed ?? 1.64)}
                />
              </Container>
            </section>
          </main>

          {/* 6 days forecast */}

          <section className="flex flex-col -ml-20 -my-4">
            <Container className="flex flex-col gap-1 py-4">
              <DaysForecast cityName={place} days={6} />
            </Container>
          </section>
        </>
      )}
    </div>
  );
}
