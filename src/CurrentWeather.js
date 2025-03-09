import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Header from "./Header";
import Forecast from "./Forecast";

export default function CurrentWeather({ city: initialCity }) {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(initialCity || "London");

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  function fetchWeather(city) {
    if (!city) return;
    const apiKey = "10tc88b5de8d7eoa39c8f2ea84faadb2";
    const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data;
        setWeather({
          city: data.city,
          date: formatDate(new Date(data.time * 1000)),
          weatherCondition: data.condition.description,
          humidity: `${data.temperature.humidity}%`,
          wind: `${data.wind.speed} km/h`,
          temperature: Math.round(data.temperature.current),
          icon: data.condition.icon_url,
        });
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }

  function formatDate(date) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${days[date.getDay()]} ${hours}:${minutes}`;
  }

  function handleSearch(event) {
    event.preventDefault();
    const inputCity = event.target.elements.cityInput.value.trim();
    if (inputCity && inputCity !== city) {
      setCity(inputCity);
    }
  }

  return (
    <main>
      <Header onSearch={setCity} />
      <br />
      {weather ? (
        <div className="weather-app-data">
          <div>
            <h1 className="weather-app-city">{weather.city}</h1>
            <p className="weather-app-details">
              Last updated: <span>{weather.date}</span>,{" "}
              <span>{weather.weatherCondition}</span>
              <br />
              Humidity: <strong>{weather.humidity}</strong>, Wind:{" "}
              <strong>{weather.wind}</strong>
            </p>
          </div>

          <div className="weather-app-temperature-container">
            <img
              src={weather.icon}
              alt={weather.weatherCondition}
              className="weather-app-icon"
            />
            <div className="weather-app-temperature">{weather.temperature}</div>
            <div className="weather-app-unit">°C</div>
          </div>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
      <Forecast />
    </main>
  );
}
