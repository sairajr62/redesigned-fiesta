import React from "react";
import { useState } from "react";
import axios from "axios";

const weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather();
  };


  const getWeather = async () => {
    if (!city) return;
    try {
      const apikey = `29e69120715cdbbfd7959191b2488dc9`;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`
      );
      setWeather(response.data);
    } catch (err) {
      setError("City Not Found");
      setWeather(null);
    }
  };
  return (
    <>
      <div className="min-h-min h-8 flex flex-col items-center justify-start bg-gray-100 p-2">
        <form onSubmit={handleSubmit}>
          <input
            className="border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Enter City Name"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setError("");
            }}
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg px-4 py-2 transition">Search</button>
        </form>
      
      {error && <p className="text-red-500 font-medium">{error}</p>}
     
      {weather && (
      <div className="bg-white rounded-xl shadow-lg p-6 mt-4 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-2">Weather in <b>{city}</b></h2>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
        <p className="text-gray-500 capitalize mb-4">{weather.weather[0].description}</p>
         <div className="flex justify-center mb-4">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
          </div>
        <p className="font-semibold">🌡 {weather.main.temp} °C</p>
        <p className="font-semibold">💧 {weather.main.humidity}%</p>
        <p className="font-semibold">🌬 {weather.wind.speed} m/s</p>
        <p className="font-semibold">🌤 {weather.clouds.all}% Cloudiness</p>
        </div>
      </div>
      )}
      </div>
    </>
  );
};

export default weather;
