'use client';

interface ForecastCardProps {
  date: string;
  tempMax: number;
  tempMin: number;
  weatherCode: number;
  precipProb?: number;
  isCelsius: boolean;
}

const getWeatherIcon = (code: number): string => {
  const iconMap: { [key: number]: string } = {
    0: '☀️',
    1: '🌤️',
    2: '⛅',
    3: '☁️',
    45: '🌫️',
    48: '🌫️',
    51: '🌦️',
    53: '🌦️',
    55: '🌧️',
    61: '🌧️',
    63: '🌧️',
    65: '⛈️',
    71: '🌨️',
    73: '❄️',
    75: '❄️',
    77: '❄️',
    80: '🌦️',
    81: '🌧️',
    82: '⛈️',
    85: '🌨️',
    86: '❄️',
    95: '⛈️',
    96: '⛈️',
    99: '⛈️',
  };
  
  return iconMap[code] || '🌡️';
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  } else {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }
};

export default function ForecastCard({
  date,
  tempMax,
  tempMin,
  weatherCode,
  precipProb,
  isCelsius,
}: ForecastCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all hover:scale-105 hover:shadow-xl">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="text-blue-100 font-semibold">{formatDate(date)}</div>
          {typeof precipProb === 'number' && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-200 bg-blue-500/10 border border-blue-400/30 rounded-full px-2 py-0.5">
              <span className="w-2 h-2 rounded-full bg-blue-400" /> {Math.round(precipProb)}%
            </span>
          )}
        </div>
        <div className="text-5xl mb-4">{getWeatherIcon(weatherCode)}</div>
        <div className="flex justify-center items-center gap-3">
          <div className="text-white">
            <div className="text-2xl font-bold">{Math.round(tempMax)}°</div>
            <div className="text-xs text-blue-200">High</div>
          </div>
          <div className="text-blue-200 text-xl">/</div>
          <div className="text-blue-200">
            <div className="text-2xl font-semibold">{Math.round(tempMin)}°</div>
            <div className="text-xs">Low</div>
          </div>
        </div>
      </div>
    </div>
  );
}