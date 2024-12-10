import React, { useState } from "react";
import "./WeatherApp.css";
import WeatherElement from "./WeatherElement"; // Reusable Component
import searchIcon from "../Assets/search.png";
import cloudIcon from "../Assets/cloud.png";
import humidityIcon from "../Assets/humidity.png";
import windIcon from "../Assets/wind.png";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({
    temperature: "",
    location: "",
    humidity: "",
    windSpeed: "",
    icon: cloudIcon,
  });
  const [error, setError] = useState("");

  const api_Key = "47739618cd7adff4b6b7003d215f5583";

  const searchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    try {
      setError(""); // Reset error
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_Key}`
      );
      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      setWeatherData({
        temperature: `${Math.round(data.main.temp)} °C`,
        location: data.name,
        humidity: `${data.main.humidity}%`,
        windSpeed: `${data.wind.speed} km/h`,
        icon: cloudIcon, // Dynamic icon logic can be added
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="city-input"
          placeholder="Search for a city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <div className="search-icon" onClick={searchWeather}>
          <img src={searchIcon} alt="Search" />
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {weatherData.location && (
        <>
          <div className="weather-image">
            <img src={weatherData.icon} alt="Weather Icon" />
          </div>
          <div className="weather-temp">{weatherData.temperature}</div>
          <div className="weather-location">{weatherData.location}</div>
          <div className="data-container">
            <WeatherElement
              icon={humidityIcon}
              value={weatherData.humidity}
              label="Humidity"
            />
            <WeatherElement
              icon={windIcon}
              value={weatherData.windSpeed}
              label="Wind Speed"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default WeatherApp;
