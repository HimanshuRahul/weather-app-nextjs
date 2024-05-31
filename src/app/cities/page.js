"use client";

import React from "react";
import RecentSearches from "@/components/RecentSearches";
import { useAtom } from "jotai";
import { selectedSearchAtom } from "@/app/atom";
import CurrentLocation from "@/components/CurrentLocation";
import CityForecast from "@/components/CityForecast";
import DaysForecast from "@/components/DaysForecast";
import Container from "@/components/Container";

function CitiesPage() {
  const [selectedSearch] = useAtom(selectedSearchAtom);

  return (
    <div className="flex justify-center items-start p-2 gap-4 ml-14">
      <RecentSearches />

      <hr></hr>

      {selectedSearch ? (
        <>
          <div className="w-1/3 px-4  bg-gray-100 rounded-lg shadow-lg max-h-[85vh] overflow-hidden">
            <CurrentLocation searchQuery={selectedSearch.cityName} />
            <div className="mt-1">
              <h3 className="text-md text-gray-400 font-semibold mb-2 ml-3">
                Today's Forecast
              </h3>
              <CityForecast
                cityName={selectedSearch.cityName}
                className="px-2 "
              />
            </div>
            <hr></hr>

            <div className="mt-4 flex flex-col gap-4 ">
              <DaysForecast
                cityName={selectedSearch.cityName}
                className="px-2 mb-6"
                compact={true}
              />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default CitiesPage;
