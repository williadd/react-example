import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [systemInfo, setSystemInfo] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sysRes, weatherRes] = await Promise.all([
          fetch('/api/system-info'),
          fetch('/api/weather')
        ]);
        
        if (sysRes.ok) {
          setSystemInfo(await sysRes.json());
        }
        if (weatherRes.ok) {
          setWeather(await weatherRes.json());
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
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
      <div className="home-container">
        <div className="loading-card">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="summary-grid">
        <Link to="/system" className="summary-card system-summary">
          <h3>🖥️ System Info</h3>
          {systemInfo ? (
            <div className="summary-content">
              <p className="highlight">{systemInfo.hostname}</p>
              <p>{systemInfo.platform} • {systemInfo.architecture}</p>
              <p>CPU: {systemInfo.cpu_percent}% • RAM: {systemInfo.memory_used_percent}%</p>
            </div>
          ) : (
            <p>Unable to load</p>
          )}
          <span className="view-more">View Details →</span>
        </Link>

        <Link to="/weather" className="summary-card weather-summary">
          <h3>🌤️ Weather</h3>
          {weather ? (
            <div className="summary-content">
              <p className="highlight">
                <span className="emoji">{getWeatherEmoji(weather.condition)}</span>
                {weather.temperature_f}°F
              </p>
              <p>{weather.condition}</p>
              <p>Precipitation: {weather.precipitation_percent}%</p>
            </div>
          ) : (
            <p>Unable to load</p>
          )}
          <span className="view-more">View Details →</span>
        </Link>
      </div>
    </div>
  );
}

export default Home;
