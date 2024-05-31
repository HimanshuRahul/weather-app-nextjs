import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { recentSearchesAtom, selectedSearchAtom } from "@/app/atom";
import WeatherIcon from "./WeatherIcon";
import { BiSolidNavigation } from "react-icons/bi";

function RecentSearches() {
  const [recentSearches] = useAtom(recentSearchesAtom);
  const [selectedSearch, setSelectedSearch] = useAtom(selectedSearchAtom);

  useEffect(() => {
    if (recentSearches.length > 0 && !selectedSearch) {
      setSelectedSearch(recentSearches[0]);
    }
  }, [recentSearches, selectedSearch, setSelectedSearch]);

  const handleClick = (search) => {
    setSelectedSearch(search);
  };

  return (
    <div className="w-[750px] p-4 bg-gray-100 rounded-lg shadow-lg -ml-16">
      <h2 className="text-xl font-semibold text-gray-400 m-2 mx-0">
        Recent Searches
      </h2>
      <ul className="mt-2">
        {recentSearches.map((search, index) => (
          <li
            key={index}
            className={`flex justify-between items-center bg-gray-100 p-2 rounded-md mb-2 cursor-pointer ${
              search === selectedSearch
                ? "border border-blue-500 bg-gray-200"
                : ""
            }`}
            onClick={() => handleClick(search)}
          >
            <div className="flex items-center">
              <WeatherIcon
                iconName={search.weatherIcon}
                className="w-20 h-20 mr-2"
              />
              <div>
                <div className="flex gap-2">
                  <span className="block font-bold text-lg">
                    {search.cityName}
                  </span>
                  <span className="my-2">
                    {search === selectedSearch && <BiSolidNavigation />}
                  </span>
                </div>

                <span className="block text-gray-600">{search.time}</span>
              </div>
            </div>

            <span className="text-lg text-gray-400 mr-2 font-medium">
              {Math.floor(search.temperature)}°
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentSearches;
