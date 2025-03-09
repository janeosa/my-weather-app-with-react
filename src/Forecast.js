import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

export default function WeatherApp({ city: initialCity }) {
  const [city, setCity] = useState(initialCity || "London");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    searchCity(city);
  }, [city]);

  function searchCity(city) {
    const apiKey = "10tc88b5de8d7eoa39c8f2ea84faadb2";
    const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(refreshWeather);
  }

  function refreshWeather(response) {
    const data = response.data;
    setWeather({
      temperature: Math.round(data.temperature.current),
      city: data.city,
      description: data.condition.description,
      humidity: data.temperature.humidity,
      wind: data.wind.speed,
      icon: data.condition.icon_url,
      time: formatDate(new Date(data.time * 1000)),
    });

    getForecast(data.city);
  }

  function formatDate(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return `${days[date.getDay()]} ${hours}:${minutes}`;
  }

  function getForecast(city) {
    const apiKey = "10tc88b5de8d7eoa39c8f2ea84faadb2";
    const apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then((response) => {
      setForecast(response.data.daily.slice(0, 5));
    });
  }

  function handleSearch(city) {
    setCity(city);
  }

  function formatDay(timestamp) {
    const date = new Date(timestamp * 1000);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  }

  return (
    <div>
      {forecast.length > 0 && (
        <div className="weather-forecast">
          {forecast.map((day, index) => (
            <div className="weather-forecast-date" key={index}>
              <div>{formatDay(day.time)}</div>
              <img
                src={day.condition.icon_url}
                alt={day.condition.description}
                className="forecast-icon"
              />
              <div>
                <strong>{Math.round(day.temperature.maximum)}°</strong> /{" "}
                {Math.round(day.temperature.minimum)}°
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
