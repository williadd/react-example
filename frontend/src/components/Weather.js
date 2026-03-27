import React, { useState, useEffect } from 'react';
import './Weather.css';

function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/weather');
      if (!response.ok) {
        throw new Error('Failed to fetch weather');
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const getWeatherEmoji = (condition) => {
    const emojis = {
      'Sunny': '☀️',
      'Partly Cloudy': '⛅',
      'Cloudy': '☁️',
      'Overcast': '🌥️',
      'Foggy': '🌫️',
      'Rainy': '🌧️',
      'Stormy': '⛈️',
      'Snowy': '❄️'
    };
    return emojis[condition] || '🌡️';
  };

  if (loading) {
    return (
      <div className="weather-card">
        <div className="loading">Consulting the weather spirits...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-card">
        <div className="error">
          <p>Error: {error}</p>
          <button onClick={fetchWeather}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="weather-card">
      <h2>Weather Forecast</h2>
      <p className="subtitle">(Totally Real Data™)</p>
      
      <div className="weather-main">
        <span className="weather-emoji">{getWeatherEmoji(weather.condition)}</span>
        <div className="temperature">
          <span className="temp-value">{weather.temperature_f}°F</span>
          <span className="temp-celsius">({weather.temperature_c}°C)</span>
        </div>
        <span className="condition">{weather.condition}</span>
      </div>
      
      <div className="weather-grid">
        <div className="weather-item">
          <span className="label">☁️ Cloudiness</span>
          <span className="value">{weather.cloudiness_percent}%</span>
        </div>
        
        <div className="weather-item">
          <span className="label">🌧️ Precipitation</span>
          <span className="value">{weather.precipitation_percent}%</span>
        </div>
        
        <div className="weather-item">
          <span className="label">💧 Humidity</span>
          <span className="value">{weather.humidity_percent}%</span>
        </div>
        
        <div className="weather-item">
          <span className="label">💨 Wind</span>
          <span className="value">{weather.wind_mph} mph</span>
        </div>
      </div>
      
      <div className="timestamp">
        Last updated: {new Date(weather.timestamp).toLocaleString()}
      </div>
      
      <button className="refresh-btn" onClick={fetchWeather}>
        🎲 Get New Forecast
      </button>
    </div>
  );
}

export default Weather;
