'use client';

interface CurrentWeatherProps {
  temperature: number;
  feelsLike: number;
  weatherCode: number;
  windSpeed: number;
  humidity: number;
  sunrise: string;
  sunset: string;
  precipProbToday: number;
  isCelsius: boolean;
}

const getWeatherDescription = (code: number): { description: string; icon: string } => {
  const weatherMap: { [key: number]: { description: string; icon: string } } = {
    0: { description: 'Clear sky', icon: '☀️' },
    1: { description: 'Mainly clear', icon: '🌤️' },
    2: { description: 'Partly cloudy', icon: '⛅' },
    3: { description: 'Overcast', icon: '☁️' },
    45: { description: 'Foggy', icon: '🌫️' },
    48: { description: 'Foggy', icon: '🌫️' },
    51: { description: 'Light drizzle', icon: '🌦️' },
    53: { description: 'Drizzle', icon: '🌦️' },
    55: { description: 'Heavy drizzle', icon: '🌧️' },
    61: { description: 'Light rain', icon: '🌧️' },
    63: { description: 'Rain', icon: '🌧️' },
    65: { description: 'Heavy rain', icon: '⛈️' },
    71: { description: 'Light snow', icon: '🌨️' },
    73: { description: 'Snow', icon: '❄️' },
    75: { description: 'Heavy snow', icon: '❄️' },
    77: { description: 'Snow grains', icon: '❄️' },
    80: { description: 'Light showers', icon: '🌦️' },
    81: { description: 'Showers', icon: '🌧️' },
    82: { description: 'Heavy showers', icon: '⛈️' },
    85: { description: 'Light snow showers', icon: '🌨️' },
    86: { description: 'Snow showers', icon: '❄️' },
    95: { description: 'Thunderstorm', icon: '⛈️' },
    96: { description: 'Thunderstorm with hail', icon: '⛈️' },
    99: { description: 'Thunderstorm with hail', icon: '⛈️' },
  };
  
  return weatherMap[code] || { description: 'Unknown', icon: '🌡️' };
};

export default function CurrentWeather({
  temperature,
  feelsLike,
  weatherCode,
  windSpeed,
  humidity,
  sunrise,
  sunset,
  precipProbToday,
  isCelsius,
}: CurrentWeatherProps) {
  const weather = getWeatherDescription(weatherCode);
  
  const formatTime = (iso: string) => new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 mb-8 border border-white/20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Temperature and Icon */}
        <div className="flex items-center gap-6">
          <div className="text-8xl">{weather.icon}</div>
          <div>
            <div className="text-6xl font-bold text-white">
              {Math.round(temperature)}°{isCelsius ? 'C' : 'F'}
            </div>
            <div className="text-blue-300 mt-1">Feels like {Math.round(feelsLike)}°{isCelsius ? 'C' : 'F'}</div>
            <div className="text-2xl text-blue-100 mt-2">{weather.description}</div>
          </div>
        </div>
        
        {/* Weather Details */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-white w-full md:w-auto">
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-blue-200 text-sm mb-1">Wind Speed</div>
            <div className="text-2xl font-semibold">{Math.round(windSpeed)} km/h</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-blue-200 text-sm mb-1">Humidity</div>
            <div className="text-2xl font-semibold">{humidity}%</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-blue-200 text-sm mb-1">Sunrise</div>
            <div className="text-2xl font-semibold">{formatTime(sunrise)}</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-blue-200 text-sm mb-1">Sunset</div>
            <div className="text-2xl font-semibold">{formatTime(sunset)}</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm col-span-2 lg:col-span-1">
            <div className="text-blue-200 text-sm mb-1">Precip Chance</div>
            <div className="text-2xl font-semibold">{Math.round(precipProbToday)}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}