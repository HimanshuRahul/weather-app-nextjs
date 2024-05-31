import React from "react";
import Container from "./Container";
import WeatherIcon from "./WeatherIcon";

function ForecastWeatherDetail(props) {
  const {
    weatherIcon = "02d",
    day = "Tuesday",
    temp_min,
    temp_max,
    description = "sunny",
    compact,
  } = props;
  return (
    <Container className={`w-[400px] ${compact ? "" : "py-4"}`}>
      <section className="flex items-center px-1 w-full">
        <div className="flex-shrink-0 w-1/4 text-left ml-8">
          <p className="capitalize text-xs font-semibold text-gray-400">
            {day}
          </p>
        </div>

        <div className="flex-1 flex items-center justify-center gap-2">
          <WeatherIcon iconName={weatherIcon} className="h-12 w-12" />
          <p className="capitalize text-xs font-semibold text-black">
            {description}
          </p>
        </div>

        <div className="flex-shrink-0 w-1/4 flex items-center justify-end mr-4">
          <p className="text-xs font-semibold text-black">{temp_max}</p>
          <p className="text-xs font-semibold text-gray-400">/{temp_min}</p>
        </div>
      </section>
    </Container>
  );
}

export default ForecastWeatherDetail;
