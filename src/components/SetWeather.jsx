import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city) return;
    try {
      const apiKey = "29e69120715cdbbfd7959191b2488dc9";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
      console.log(response.data);
      setError("");
    } catch (err) {
      setError("City not found");
      setWeather(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather();
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter City Name"
          />
          <button type="submit">Search</button>
        </form>

        {error && <p>{error}</p>}

        {weather && (
          <div>
            <h2>{weather.name}</h2>
            <p>{weather.weather[0].description}</p>
            <p>🌡 {weather.main.temp} °C</p>
            <p>💧 {weather.main.humidity}%</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Weather;
