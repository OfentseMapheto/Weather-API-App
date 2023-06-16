import React, { useState } from 'react';
import axios from 'axios';
import { FaTemperatureLow, FaTint, FaWind } from 'react-icons/fa';
import Sunny from "./picture_folder/Sunny.jpeg";
import Partly_Cloudy from "./picture_folder/Partly_Cloudy.jpeg";
import Cloudy from "./picture_folder/Cloudy.jpeg";
import Light_Rain from "./picture_folder/Light_Rain.jpeg";
import './App.css';


function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);

  const handleSearch = () => {
    axios.get(`/weather?city=${city}`)
      .then(response => {
        setWeatherData(response.data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const convertTemperature = (temperature) => {
    if (isCelsius) {
      return temperature;
    } else {
      return (temperature * 9) / 5 + 32;
    }
  };

  const getWeatherIcon = (conditionCode) => {
    const iconMap = {
      1000: <FaTemperatureLow />,
      1003: <FaTint />,
      1087: <FaWind />,
    };

    return iconMap[conditionCode] || null;
  };

  const getWeatherPicture = (temperature) => {
    if (temperature >= 30) {
      return <img src={Sunny} alt="Sunny" />;
    } else if (temperature >= 20) {
      return <img src={Cloudy} alt="Cloudy" />;
    } else if (temperature >= 10) {
      return <img src={Light_Rain} alt="Light_Rain" />;
    } else {
      return <img src={Partly_Cloudy} alt="Partly_Cloudy" />;
    }
  };

  return (
    <div className='main'>
      <h1>Weather App</h1>
      <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter your location" />
      <button onClick={handleSearch}>Search</button>

      {weatherData ? (
        <div>
          <p>Location: {city}</p>
          <div>
            {getWeatherPicture(weatherData.temperature)}
            <p>
              {getWeatherIcon(weatherData.conditionCode)}
              Temperature: {convertTemperature(weatherData.temperature)}{' '}
              {isCelsius ? '°C' : '°F'}
            </p>
            <p>
              {getWeatherIcon(weatherData.conditionCode)}
              Humidity: {weatherData.humidity}%
            </p>
            <p>
              {getWeatherIcon(weatherData.conditionCode)}
              Wind Speed: {weatherData.windSpeed} kph
            </p>
            <button onClick={toggleTemperatureUnit}>Toggle Temperature Unit</button>
          </div>
        </div>
      ) : (
        <p>No weather data available</p>
      )}
    </div>
  );
}
export default App;