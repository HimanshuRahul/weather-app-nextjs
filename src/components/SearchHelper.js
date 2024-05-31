import React, { useState, useRef, useEffect } from "react";
import { useAtom } from "jotai";
import { FaLocationCrosshairs } from "react-icons/fa6";
import axios from "axios";
import { DateTime } from "luxon";
import Searchbar from "./Searchbar";
import {
  loadingCityAtom,
  placeAtom,
  recentSearchesAtom,
  selectedSearchAtom,
} from "@/app/atom";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

async function fetchWeatherDetails(cityName) {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
  );
  const { data } = response;

  const timezoneOffset = data.timezone;
  const localTime = DateTime.utc()
    .plus({ seconds: timezoneOffset })
    .toFormat("HH:mm");

  return {
    cityName: data.name,
    weatherIcon: data.weather[0].icon,
    temperature: data.main.temp,
    time: localTime,
  };
}

function SearchHelper() {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [place, setPlace] = useAtom(placeAtom);
  const [_, setLoadingCity] = useAtom(loadingCityAtom);
  const [recentSearches, setRecentSearches] = useAtom(recentSearchesAtom);
  const [, setSelectedSearch] = useAtom(selectedSearchAtom);
  const errorTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
    };
  }, []);

  async function handleInputChange(value) {
    setCity(value);

    if (value.length >= 3) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${API_KEY}`
        );

        const suggestions = response.data.list.map((item) => item.name);
        setSuggestions(suggestions);
        setError("");
        setShowSuggestions(true);
      } catch (error) {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }

  async function handleSuggestionClick(value) {
    setCity(value);
    setShowSuggestions(false);

    try {
      const weatherDetails = await fetchWeatherDetails(value);
      setSelectedSearch(weatherDetails);
    } catch (error) {
      console.error("Error fetching weather details:", error);

      setError("Failed to fetch weather details");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }

  async function handleSubmitSearch(e) {
    e.preventDefault();
    setLoadingCity(true);

    if (suggestions.length === 0) {
      setError("Location not found");
      setLoadingCity(false);

      errorTimeoutRef.current = setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      setError("");
      try {
        const weatherDetails = await fetchWeatherDetails(city);
        setLoadingCity(false);
        setPlace(city);
        setShowSuggestions(false);

        setSelectedSearch(weatherDetails);

        setRecentSearches((prev) => {
          const updatedSearches = [
            weatherDetails,
            ...prev.filter((search) => search.cityName !== city),
          ].slice(0, 4);

          return updatedSearches;
        });
      } catch (error) {
        setLoadingCity(false);
        setError("Failed to fetch weather data");
        errorTimeoutRef.current = setTimeout(() => {
          setError("");
        }, 3000);
      }
    }
  }

  async function handleCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          setLoadingCity(true);
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );
          const timezoneOffset = response.data.timezone;
          const localTime = DateTime.utc()
            .plus({ seconds: timezoneOffset })
            .toFormat("HH:mm");

          const weatherDetails = {
            cityName: response.data.name,
            weatherIcon: response.data.weather[0].icon,
            temperature: response.data.main.temp,
            time: localTime,
          };
          setLoadingCity(false);
          setPlace(response.data.name);

          setSelectedSearch(weatherDetails);
          setRecentSearches((prev) => {
            const updatedSearches = [
              weatherDetails,
              ...prev.filter(
                (search) => search.cityName !== response.data.name
              ),
            ].slice(0, 4);
            return updatedSearches;
          });
        } catch (error) {
          setLoadingCity(false);
          console.error("Error fetching weather details:", error);
          // Handle error if weather details fetching fails
          // For example:
          // setError("Failed to fetch weather details");
          // setTimeout(() => {
          //   setError("");
          // }, 3000); // Clear error after 3 seconds
        }
      });
    }
  }

  return (
    <>
      <nav className="shadom-sm sticky top-0 left-0 z-50 mx-48">
        <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
          <section className="flex gap-2 items-center">
            <FaLocationCrosshairs
              title="Your current location"
              onClick={handleCurrentLocation}
              className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer"
            />
            <div className="relative hidden md:flex">
              <Searchbar
                value={city}
                onSubmit={handleSubmitSearch}
                onChange={(e) => handleInputChange(e.target.value)}
              />
              <SuggestionBox
                {...{
                  showSuggestions,
                  suggestions,
                  handleSuggestionClick,
                  error,
                }}
              />
            </div>
          </section>
        </div>
      </nav>
      <section className="flex max-w-7xl px-3 md:hidden ">
        <div className="relative">
          <Searchbar
            value={city}
            onSubmit={handleSubmitSearch}
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <SuggestionBox
            {...{
              showSuggestions,
              suggestions,
              handleSuggestionClick,
              error,
            }}
          />
        </div>
      </section>
    </>
  );
}

/* eslint-disable react/display-name */
const SuggestionBox = React.forwardRef(
  ({ showSuggestions, suggestions, handleSuggestionClick, error }, ref) => (
    <>
      {((showSuggestions && suggestions.length > 1) || error) && (
        <ul
          ref={ref}
          className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2"
        >
          {error && suggestions.length < 1 && (
            <li className="text-red-500 p-1"> {error}</li>
          )}
          {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={() => handleSuggestionClick(item)}
              className="cursor-pointer p-1 rounded hover:bg-gray-200"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  )
);

export default SearchHelper;
