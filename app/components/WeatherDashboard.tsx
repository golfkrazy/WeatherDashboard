'use client';

import { useState, useEffect } from 'react';
import LoadingGears from './LoadingGears';
import CurrentWeather from './CurrentWeather';
import ForecastCard from './ForecastCard';

interface WeatherData {
  current: {
    temperature: number;
    apparentTemperature: number;
    weatherCode: number;
    windSpeed: number;
    humidity: number;
  };
  daily: {
    time: string[];
    temperatureMax: number[];
    temperatureMin: number[];
    weatherCode: number[];
    sunrise: string[];
    sunset: string[];
    precipProb: number[];
  };
}

export default function WeatherDashboard() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [location, setLocation] = useState({ lat: 40.7128, lon: -74.0060, city: 'New York' });
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }));
    };
    
    updateTime();
    
    const timer = setInterval(updateTime, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const cities = [
    { name: 'New York', lat: 40.7128, lon: -74.0060 },
    { name: 'Los Angeles', lat: 34.0522, lon: -118.2437 },
    { name: 'Chicago', lat: 41.8781, lon: -87.6298 },
    { name: 'Houston', lat: 29.7604, lon: -95.3698 },
    { name: 'Miami', lat: 25.7617, lon: -80.1918 },
    { name: 'San Francisco', lat: 37.7749, lon: -122.4194 },
    { name: 'Seattle', lat: 47.6062, lon: -122.3321 },
    { name: 'Boston', lat: 42.3601, lon: -71.0589 },
    { name: 'London', lat: 51.5074, lon: -0.1278 },
    { name: 'Paris', lat: 48.8566, lon: 2.3522 },
    { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
    { name: 'Sydney', lat: -33.8688, lon: 151.2093 },
    { name: 'Dubai', lat: 25.2048, lon: 55.2708 },
    { name: 'Singapore', lat: 1.3521, lon: 103.8198 },
    { name: 'Toronto', lat: 43.6532, lon: -79.3832 },
  ]; 

  useEffect(() => {
    fetchWeather(true);
  }, [location]);

  const fetchWeather = async (isRefetch: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max&temperature_unit=${isCelsius ? 'celsius' : 'fahrenheit'}&timezone=auto`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      
      const data = await response.json();
      
      setWeather({
        current: {
          temperature: data.current.temperature_2m,
          apparentTemperature: data.current.apparent_temperature,
          weatherCode: data.current.weather_code,
          windSpeed: data.current.wind_speed_10m,
          humidity: data.current.relative_humidity_2m,
        },
        daily: {
          time: data.daily.time,
          temperatureMax: data.daily.temperature_2m_max,
          temperatureMin: data.daily.temperature_2m_min,
          weatherCode: data.daily.weather_code,
          sunrise: data.daily.sunrise,
          sunset: data.daily.sunset,
          precipProb: data.daily.precipitation_probability_max,
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
      if (initialLoad && !isRefetch) {
        setInitialLoad(false);
      }
    }
  };

  const toggleUnit = () => {
    setIsCelsius((prev) => !prev);
    setTimeout(() => fetchWeather(true), 0);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = cities.find(city => city.name === e.target.value);
    if (selectedCity) {
      setLocation({
        lat: selectedCity.lat,
        lon: selectedCity.lon,
        city: selectedCity.name,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black flex items-center justify-center">
        <LoadingGears />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">{error}</p>
          <button
            onClick={() => fetchWeather()}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black py-8 px-4 sm:px-6 lg:px-8 relative">
      {/* Current Time Display */}
      <div className="fixed top-4 left-4 z-50">
        <div className="bg-black/40 backdrop-blur-md text-white font-mono text-sm sm:text-base px-3 py-2 rounded-lg border border-white/10 shadow-lg">
          <div className="font-semibold text-blue-300">Local Time</div>
          <div className="text-xl font-bold">{currentTime}</div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto">
        {loading && !initialLoad && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Weather Dashboard
          </h1>
          <div className="flex flex-col items-center gap-4">
            <p className="text-white text-3xl sm:text-4xl font-bold drop-shadow-lg">{location.city}</p>
            <select
              value={location.city}
              onChange={handleCityChange}
              className="bg-white/20 backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-full border-2 border-white/30 hover:bg-white/30 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50 text-lg"
            >
              {cities.map((city) => (
                <option key={city.name} value={city.name} className="bg-blue-600 text-white">
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Temperature Unit Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-1 flex gap-1">
            <button
              onClick={() => !isCelsius && toggleUnit()}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                isCelsius
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              °C
            </button>
            <button
              onClick={() => isCelsius && toggleUnit()}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                !isCelsius
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              °F
            </button>
          </div>
        </div>

        {/* Current Weather */}
        {weather && (
          <CurrentWeather
            temperature={weather.current.temperature}
            feelsLike={weather.current.apparentTemperature}
            weatherCode={weather.current.weatherCode}
            windSpeed={weather.current.windSpeed}
            humidity={weather.current.humidity}
            sunrise={weather.daily.sunrise[0]}
            sunset={weather.daily.sunset[0]}
            precipProbToday={weather.daily.precipProb[0]}
            isCelsius={isCelsius}
          />
        )}

        {/* 5-Day Forecast */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-4 text-center sm:text-left">
            5-Day Forecast
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {weather?.daily.time.slice(0, 5).map((date, index) => (
              <ForecastCard
                key={date}
                date={date}
                tempMax={weather.daily.temperatureMax[index]}
                tempMin={weather.daily.temperatureMin[index]}
                weatherCode={weather.daily.weatherCode[index]}
                precipProb={weather.daily.precipProb[index]}
                isCelsius={isCelsius}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}